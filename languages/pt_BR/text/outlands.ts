import { asrielinter } from '../../../code/common';
import { toriCheck, toriSV } from '../../../code/outlands/extras';
import { game } from '../../../code/systems/core';
import {
    battler,
    choicer,
    iFancyYourVilliany,
    instance,
    outlandsKills,
    pager,
    postSIGMA,
    resetThreshold,
    roomKills,
    world
} from '../../../code/systems/framework';
import { SAVE } from '../../../code/systems/save';
import { CosmosKeyed, CosmosProvider } from '../../../code/systems/storyteller';

// START-TRANSLATE

const toriel_aerialis = () =>
    SAVE.data.n.plot < 49
        ? [
            '<25>{#p/toriel}{#f/1}* Eu ouvi sobre algum tinha de fluido que tem em Aerialis...',
            '<25>{#f/0}* Usado primeiramente para amortecer a eletricidade.',
            '<25>{#f/1}* Se você achar esse fluido, o quão longe você conseguirá levá-lo?',
            '<25>{#f/1}* Você o levaria até o fim da Cidadela?',
            '<25>{#f/1}* Ou você simplesmente o jogaria fora em um lixo reciclável?',
            '<25>{#f/0}* Isso deixaria qualquer um desapontado.'
        ]
        : SAVE.data.n.plot < 51
            ? world.bad_lizard > 1 || SAVE.data.n.state_foundry_undyne === 2
                ? [
                    '<25>{#p/toriel}{#f/1}* Talvez, se eu me tornar professora...',
                    '<25>{#f/0}* Eu poderia liderar uma excursão para o Laboratório Real.',
                    "<25>{#f/0}* Com a permissão da Dr. Alphys, é claro.",
                    '<25>{#f/1}* Todos os incríveis experimentos que eles devem conduzir lá...',
                    "<25>{#f/0}* Vai ser uma grande experiência de aprendizado para as crianças."
                ]
                : [
                    '<25>{#p/toriel}{#f/0}* Sua presença na TV se espalhou rapidamente, pequeno!',
                    '<25>{#f/0}* Mesmo que eu não tenha visto, já que minha TV está com problemas.',
                    '<25>{#f/1}* Quando escutei sobre isso, entretanto, fiquei muito surpresa...',
                    SAVE.data.n.state_aerialis_talentfails === 0
                        ? '<25>{#f/2}* Como é que você não errou UMA vez sequer?'
                        : '<25>{#f/6}* Eu não sabia que você tinhas movimentos tão \"fabulosos\".'
                ]
            : SAVE.data.n.plot < 56
                ? [
                    '<25>{#p/toriel}{#f/1}* Hmm...\n* Os guardas Reais em Aerialis...',
                    '<25>{#f/0}* Aparentemente, a comida favorita deles é... Salmão.',
                    '<25>{#f/1}* Ou... seria sorvete?',
                    '<25>{#f/2}* Na verdade, não, acho que era pizza!',
                    '<25>{#f/0}* Tudo o que seria impossível sem o humilde replicador.',
                    '<25>{#f/1}* E... essas comidas não são meio estranhas para recrutas novos?'
                ]
                : SAVE.data.n.plot < 59
                    ? [
                        world.bad_lizard > 1 || SAVE.data.n.state_foundry_undyne === 2
                            ? '<25>{#p/toriel}{#f/0}* Eu ouvi que você apareceu na TV, pequenino.'
                            : '<25>{#p/toriel}{#f/0}* Eu ouvi sobre sua aparição na TV de novo, pequeno.',
                        '<25>{#f/1}* Também ouvi que você fez algo assustador...',
                        iFancyYourVilliany()
                            ? '<25>{#f/2}* E alterou os ingredientes da receita por plástico explosivo?'
                            : SAVE.data.n.state_aerialis_crafterresult === 0
                                ? '<25>{#f/2}* Tendo que se proteger de uma grande explosão eminente!'
                                : '<25>{#f/2}* E voando com \"um jetpack de uso único\" sozinho!',
                        '<25>{#f/3}* ... você...',
                        '<25>{#f/4}* Você está tentando colocar-se em perigo?'
                    ]
                    : SAVE.data.n.plot < 60
                        ? [
                            '<25>{#p/toriel}{#f/1}* Que tipo de quebra-cabeças existem em Aerialis?',
                            '<25>{#f/1}* Eles são a base de laser?',
                            '<25>{#f/1}* Eles te trazem de volta ao começo quando você falha?',
                            '<25>{#f/1}* ... Eles deixam claro que você \"falhou\"?',
                            '<25>{#f/0}* Hmm...\n* Me desculpe, acho que estou perguntando demais.',
                            '<25>{#f/1}* Uma fã de enigmas como eu não se aguenta e pergunta coisas assim.'
                        ]
                        : SAVE.data.n.plot < 61
                            ? [
                                '<25>{#p/toriel}{#f/1}* Quando ouvi sobre seus casos com Mettaton...',
                                '<25>{#f/0}* Eu acabei pensando.',
                                '<25>{#f/1}* Como um robô igual ele pode existir após o banimento dos programas IA?',
                                '<25>{#f/5}* A Dr.Alphys não quebraria uma regra tão importante.',
                                '<25>{#f/0}* Não...\n* Deve haver outra explicação.'
                            ]
                            : SAVE.data.n.plot < 63
                                ? [
                                    '<25>{#p/toriel}{#f/1}* Hmm...\n* Os guardas Reais em Aerialis...',
                                    '<25>{#f/0}* Eu ouvi falar que eles foram promovidos a pouco tempo para está posição.',
                                    '<25>{#f/1}* Também ouvi que eles são bem interessantes em suas escolhas de armas...',
                                    '<25>{#f/5}* Recusando-se a aprimora-las mesmo com opções melhores.',
                                    '<25>{#f/0}* Não que eu queria que eles façam isso, é claro.',
                                    '<25>{#f/2}* Eu me procuro demais com você!'
                                ]
                                : SAVE.data.n.plot < 65
                                    ? SAVE.data.b.a_state_hapstablook
                                        ? [
                                            '<25>{#p/toriel}{#f/1}* Um fantasma, Lurksalot, falou recentemente de alguns negócios da família.',
                                            '<25>{#f/5}* Parece que isso estava na mente deles faz algum tempo.',
                                            '<25>{#f/0}* Felizmente, eles disseram que isso deve ser resolvido em breve.',
                                            '<25>{#f/1}* E com nada menos que sua ajuda?',
                                            '<25>{#f/0}* Bem.\n* Eu estou orgulhosa de ti, pequeno.'
                                        ]
                                        : [
                                            '<25>{#p/toriel}{#f/1}* Um fantasma, Lurksalot, falou recentemente de alguns negócios da família.',
                                            '<25>{#f/5}* Parece que isso estava na mente deles faz algum tempo.',
                                            '<25>{#f/1}* Eles disseram que o primo deles tentou pedir sua ajuda, mas...',
                                            '<25>{#f/5}* Você estava muito ocupado no momento.',
                                            '<25>{#f/1}* ... você tinha uma boa razão, não tinha?'
                                        ]
                                    : SAVE.data.n.plot < 66
                                        ? [
                                            '<25>{#p/toriel}{#f/1}* Quem poderia imaginar um robô com uma voz tão linda?',
                                            "<25>{#f/0}* Ao ouvir o novo álbum do Mettaton, eu nem consegui acreditar nos meus ouvidos.",
                                            '<26>{#f/1}* Mesmo que, algumas das letras tenham um toque... violento demais pra mim.',
                                            '<25>{#f/5}* ...',
                                            '<25>{#f/0}* Não se preocupe, minha criança.\n* Ninguém vai te lançar no espaço.'
                                        ]
                                        : SAVE.data.n.plot < 68
                                            ? [
                                                '<25>{#p/toriel}{#f/0}* Sans me contou que o \"rec center\" é seu local favorito.',
                                                '<25>{#p/toriel}{#f/1}* Aulas de arte, clube de música, livrarias...',
                                                '<25>{#p/toriel}{#f/5}* É triste que uma área tão recheada, seja insegura para crianças.',
                                                '<25>{#p/toriel}{#f/3}* Eles não poderia trabalhar um pouco mais na acomodação?',
                                                '<25>{#p/toriel}{#f/2}* Esses mediums podem oferecer experiências transformadoras valiosas!'
                                            ]
                                            : SAVE.data.n.plot < 70
                                                ? world.bad_robot
                                                    ? [
                                                        '<25>{#p/toriel}{#f/0}* Todos que eu conheço estão tristes sobre um tal de cancelamento do \"grand finale.\"',
                                                        '<25>{#p/toriel}{#f/0}* Eles disseram que seria uma luta.',
                                                        '<25>{#p/toriel}{#f/1}* Já eu, estou muito feliz que você não precisou lutar tão perigosamente....',
                                                        '<25>{#p/toriel}{#f/5}* Me pergunto o que te espera a frente, agora.'
                                                    ]
                                                    : SAVE.data.b.killed_mettaton
                                                        ? [
                                                            '<25>{#p/toriel}{#f/0}* Todos que eu conheço tem falado sobre um \"grand finale.\"',
                                                            '<25>{#p/toriel}{#f/1}* Eles dizem que Mettaton deu sua vida pelo bem do entretenimento...',
                                                            '<25>{#p/toriel}{#f/0}* Mas eu sei bem.',
                                                            '<25>{#p/toriel}{#f/1}* Até porque, robôs podem ser concertados, certo?'
                                                        ]
                                                        : [
                                                            '<25>{#p/toriel}{#f/0}* Todos que eu conheço tem falado sobre um \"grand finale.\"',
                                                            '<25>{#p/toriel}{#f/0}* Eles disseram que te assistir lutar contra Mettaton os fez realmente feliz.',
                                                            '<25>{#p/toriel}{#f/1}* Eu estou contente que você tenha tido um momento incrível.',
                                                            '<25>{#p/toriel}{#f/5}* Me pergunto o que te espera a frente, agora.'
                                                        ]
                                                : [
                                                    '<25>{#p/toriel}{#f/1}* Está tudo bem contigo, meu pequeno?',
                                                    '<25>{#p/toriel}{#f/5}* Você provavelmente está na Cidadela agora.',
                                                    '<25>{#p/toriel}{#f/9}* ...',
                                                    "<25>{#p/toriel}{#f/10}* Seja bom, tudo bem?"
                                                ];

export default {
    a_outlands: {
        darktorielcall: [
            '<26>{#p/toriel}{#f/5}* Me desculpe, pequeno.\n* Eu desliguei meu telefone, mais uma vez.',
            '<25>{#p/toriel}{#f/9}* Por favor, deixe-me aqui por enquanto.',
            '<25>{#p/toriel}{#f/10}* Eu irei voltar até os outros neste meio tempo.'
        ],
        secret1: () => [
            '<32>{#p/basic}* Tem uma porta aqui.\n* Está fechada.',
            ...(SAVE.data.b.oops ? [] : ["<32>{#p/basic}* Talvez, tenha uma chave por aí...?"])
        ],
        secret2: ['<32>{#p/human}* (Você usa a chave secreta.)'],
        exit: () => [choicer.create('* (Sair das Outlands?)', 'Sim', 'Não')],
        nosleep: ['<32>{#p/human}* (Alguma coisa parece ter interrompido seu sono.)'],
        noequip: ['<32>{#p/human}* (Você decide não usar.)'],
        finaltext: {
            a: ["<32>{#p/basic}* Ele deve estar aqui em algum lugar..."],
            b: ['<32>{#p/basic}* Huh...?', '<32>{#p/basic}* Aquele ali... é ele?\n* Bem alí?'],
            c: [
                "<32>{#p/basic}* ... é ele.",
                "<32>* ...\n* Frisk, se você estiver pronto...",
                "<32>* Se você já viu todo mundo que queria...",
                '<32>* ...',
                '<32>* Você sabe o que fazer.',
                "<32>* Caso não, eu vou esperar até você estar."
            ],
            d1: ['<32>{#p/basic}* Asriel.'],
            d2: ['<25>{#p/asriel1}{#f/13}* ... Frisk?\n* É você aí...?'],
            d3: ["<32>{#p/basic}* Asriel, sou eu...", '<32>{#p/basic}* Seu melhor amigo, lembra?'],
            d4: [
                '<25>{#p/asriel1}{#f/25}* ...!',
                '<25>{#f/25}* $(name)...?',
                "<25>{#f/13}* Mas... você esta...",
                "<25>{#f/23}* ... você esta..."
            ],
            d5: ['<32>{#p/basic}* Morto?'],
            d6: [
                '<32>{#p/basic}* Heh.\n* Por muito tempo... parte de mim desejou estar.',
                '<32>{#p/basic}* Depois do que eu fiz a você...\n* Eu senti que merecia.'
            ],
            d7: ["<25>{#p/asriel1}{#f/7}* Não diga isso, $(name)!", "<25>{#f/6}* ... você tá errado!"],
            d8: [
                '<33>{#p/basic}* Haha... olha quem fala.\n* Senhorio \"só vai lá e fique com as pessoas que te amam.\"',
                '<32>* Mas você merece saber a verdade sobre mim, Asriel...',
                '<32>* Sobre tudo.'
            ],
            d9: ['<25>{#p/asriel1}{#f/23}* ...', '<25>{#f/23}* $(name)...'],
            d10: ['<25>{#p/asriel1}{#f/13}* Mas...', '<25>{#f/15}* Como você ainda...'],
            d11: [
                '<32>{#p/basic}* ... Isto importa?',
                '<32>* Você estava certo em me esquecer a muito tempo atrás.',
                "<32>* A verdade é, que eu fui uma pessoa terrível...",
                "<32>* E eu não sou o amigo ou primo que você desejava ter."
            ],
            d12: ['<25>{#p/asriel1}{#f/13}* $(name), Eu...'],
            d13: ["<32>{#p/basic}* Está tudo bem, Asriel.", "<32>* Você não precisa fazer isso para ser melhor do que é."],
            d14: ['<25>{#p/asriel1}{#f/22}* ...', '<25>{#f/22}* ... Porque agora?'],
            d15: [
                '<32>{#p/basic}* Bem...',
                '<32>* Sempre pensei que a humanidade estava além da redenção.',
                '<32>* Assim, não importa o que...',
                '<32>* Se você fosse humano... você estaria condenado a cair em escuridão.',
                '<32>* Mas após seguir Frisk em sua jornada...',
                '<32>* Eu entendi a verdade.',
                '<32>* Os outros humanos... sempre fizeram algo que tornava fácil ignorar a verdade.',
                "<33>* Eles atacaram, ou pior, fizeram pessoas... desaparecer.",
                '<32>* Mas Frisk não.',
                '<32>* Não importava o que acontecia, eles mostraram bondade e piedade toda vez.',
                '<32>* Ele... provou que eu estava errado.',
                "<32>* E agora, por causa disso, eu sei que não existe motivo para o que, eu havia feito com você.",
                '<32>* Tudo que você passou, tudo que você perdeu...',
                "<32>* Eu sou o único culpado por isso."
            ],
            d16: ['<25>{#p/asriel1}{#f/13}* $(name)...', '<25>{#f/15}* Você esteve consciente esse tempo todo?'],
            d17: [
                '<32>{#p/basic}* ... Sim.\n* Eu acho que sim.',
                '<32>* Essa tem sido minha existência, Asriel...\n* Desde a nossa morte.',
                "<32>* E... existe algo a mais que eu deveria te contar."
            ],
            d18: ['<25>{#p/asriel1}{#f/21}* O que é?'],
            d19: [
                '<32>{#p/basic}* Você se lembra quando nós cruzamos o escudo de força?',
                '<32>* Quando nós chegamos as ruínas do antigo mundo e aqueles humanos nos encontraram?',
                '<32>* Eu queria usar nosso poder para destruir eles... mas você me impediu, lembra?'
            ],
            d20: ['<25>{#p/asriel1}{#f/16}* ... Claro.'],
            d21: [
                "<32>{#p/basic}* Eu não entendi naquele momento, mas...",
                '<32>* Agora eu entendo.',
                '<32>* ... você só estava tentando me impedir... de cometer um erro terrível.'
            ],
            d22: ['<25>{#p/asriel1}{#f/15}* $(name)...'],
            d23: [
                "<32>{#p/basic}* Se não fosse por você, o Outpost teria sido destruído em uma segunda guerra.",
                '<32>* Se não fosse por você, os mesmos monstros que eu estava supostamente tentando salvar...',
                '<32>* ... teriam morrido pouco após a gente.'
            ],
            d24: ['<25>{#p/asriel1}{#f/25}* $(name), eu...'],
            d25: [
                '<32>{#p/basic}* Mesmo agora, aquelas suas escolhas ainda importam.',
                '<32>* Mesmo agora...',
                "<32>* Você é um amigo pra mim, melhor do que eu jamais fui."
            ],
            d26: [
                '<25>{#p/asriel1}{#f/25}* Eu te perdôo, $(name)!',
                "<25>{#f/23} Certo?\n* Você não precisa fazer isso...",
                '<25>{#f/22}* Eu sei o quão forte você se sentia naquela época, e...',
                "<25>{#f/15}* Eu não gostaria que você mudasse de ideia só porque eu..."
            ],
            d27: [
                '<32>{#p/basic}* Não.\n* Não mais.',
                '<32>* Pessoas PODEM mudar, Asriel...',
                "<32>* Não é isso que você sempre acreditou?"
            ],
            d28: ['<25>{#p/asriel1}{#f/13}* ... Ainda acredito.'],
            d29: [
                "<32>{#p/basic}* Passei os últimos cem anos sujando na autopiedade.",
                "<32>* Passei os últimos cem anos guardando um rancor que nunca deveria ter tido.",
                '<32>* Depois de todo aquele tempo, eu me perguntei o que me mantia vivo...',
                '<32>* E agora, eu finalmente tenho a resposta.'
            ],
            d30: ['<25>{#p/asriel1}{#f/15}* ...?'],
            d31: ["<32>{#p/basic}* ... é você, Asriel.", "<32>* Você é exatamente o que tem me mantido vivo."],
            d32: [
                '<32>{#p/basic}* Pense sobre, tipo... uma promessa não completa.',
                '<32>* Segurando aquele rancor... pensando sobre você da forma que eu fiz...',
                "<32>* Sabendo que eu poderia ter sido bem mais pra você do que eu fui.",
                "<32>* Todo este tempo, isso é o que tem me mantido acordado."
            ],
            d33: ['<25>{#p/asriel1}{#f/23}* $(name)...'],
            d34: ['<32>{#p/basic}* Asriel.\n* Meu irmão.', '<32>* Você merece saber a verdade.'],
            d35: ['<25>{*}{#p/asriel1}{#f/25}* Hã?\n* Mas você já- {%}'],
            d36: ['<32>{#p/basic}* Eu te perdôo, também.'],
            d37: ['<25>{#p/asriel1}{#f/30}{#i/4}* ...!', '<25>{#p/asriel1}{#f/26}{#i/4}* $(name)...'],
            d38: ['<32>{#p/basic}* Shh...', "<32>* Tá tudo bem.", "<32>* Eu estou contigo, tudo bem?"],
            d39: ['<25>{#p/asriel1}{#f/25}{#i/4}* Eu...'],
            d40: ["<32>{#p/basic}* Eu estou contigo, Asriel."],
            d41: [
                '<32>{#p/basic}* ... Eu posso sentir.',
                '<32>* Mesmo após centenas de anos terem passado...',
                "<32>* Ele ainda está aí, não é?",
                '<32>* Como um pequeno anjo...',
                '<32>* Cuidando de mim, protegendo-me de minhas próprias más escolhas...',
                '<32>* ... tudo para que um dia eu possa devolver o favor.'
            ],
            d42: ["<32>{#p/basic}* Tudo esta começando a fazer sentido agora.", '<32>* Eu sei o que preciso fazer.'],
            d43: ['<25>{*}{#p/asriel1}{#f/25}* Hã?\n*O que você está... {^60}{%}'],
            d44: ['<25>{*}{#f/25}* Não...!{^60}{%}', '<25>{*}{#f/26}* Me... me deixa ir!{^60}{%}'],
            d45: ['<32>{*}{#p/basic}* Heh...{^60}{%}', '<32>{*}* Toma conta da mamãe e do papai por mim, tudo bem?{^60}{%}'],
            d46: ['<25>{#p/asriel1}{#f/25}* Frisk, você está aí?', '<25>{#f/22}* Por favor... acorda...'],
            d47: ["<25>{#p/asriel1}{#f/23}* Eu...\n* Eu não quero te perder também...."],
            d48: ['<25>{#p/asriel1}{#f/17}* ... Aí está você.'],
            d49: [
                "<25>{#p/asriel1}{#f/23}* Ha... Eu por um momento pensei ter perdido você.",
                "<25>{#f/22}* Não me assusta desse jeito de novo, tá?",
                '<25>{#f/13}* ...'
            ],
            d50: [
                '<25>{#p/asriel1}{#f/13}* Bem...\n* Eu tenho minha ALMA dentro de mim novamente.',
                '<25>{#f/15}* Minha verdadeira e original alma.',
                '<25>{#f/16}* ...',
                "<26>{#f/16}* Quando $(name) e eu morremos, ele deve ter unido-se ao meu redor...",
                '<25>{#f/13}* ...me mantendo seguro até me trazer de volta aqui.',
                '<26>{#f/17}* Ele se segurou este tempo todo, apenas com a esperança de me ver de novo, Frisk...',
                '<25>{#f/13}* ... então, o mínimo que posso fazer é honrar isso.',
                '<25>{#f/15}* Viver a vida que ele sempre quis que eu tivesse.'
            ],
            d51: [
                '<25>{#p/asriel1}{#f/23}* ... Frisk.',
                "<25>{#f/23}* Eu estarei ao seu lado de agora em diante.",
                "<25>{#f/17}* Aonde você for... eu irei te seguir.",
                '<25>{#f/13}* Eu sinto como...\n* Eu sei que posso confiar em você com esse tipo de coisa.',
                "<25>{#f/13}* Mesmo que não saibamos muito um sobre o outro.",
                "<25>{#f/15}* ... Eu não sei.",
                '<25>{#f/15}* ...',
                '<25>{#f/13}* Frisk... você tem certeza disso?',
                "<25>{#f/13}* Todas as vezes que eu te feri, feri seus amigos...",
                "<25>{#f/22}* É... Eu nem consigo pensar sobre isso agora.",
                '<25>{#f/21}* Vê-los morrer desta forma na minha mente, de novo e de novo...',
                "<25>{#f/22}* Sabendo que fui eu quem fiz isso.",
                '<25>{#f/15}* ...',
                '<25>{#f/15}* Você tem certeza que deseja alguém assim do seu lado?',
                '<32>{#p/human}* (...)',
                '<25>{#p/asriel1}{#f/15}* ...',
                "<25>{#f/17}* ... Eu acho que eu simplesmente não te entendo, Frisk.",
                "<25>{#f/23}* Não importa o que eu fiz contigo... você só não liga.",
                '<25>{#f/22}* ...',
                "<25>{#f/13}* Hey.\n* Talvez isso não vá ser tão ruim.",
                "<25>{#f/17}* Ter você lá comigo definitivamente não vai prejudicar as coisas.",
                '<25>{#f/13}* ...\n* A questão é ...\n* Se eu ficasse aqui agora...',
                "<25>{#f/15}* Não seria correto com $(name)... entende?",
                '<25>{#f/13}* E além do mais, com minha ALMA de volta ao meu corpo...',
                "<25>{#f/13}* Eu não irei voltar a ser uma estrela.",
                "<25>{#f/13}* Então... não a ponto em ficar parado aqui."
            ],
            d52: [
                '<25>{#p/asriel1}{#f/17}* Melhor ir indo.',
                '<25>{#f/20}* Seus amigos provavelmente estão super preocupados com você.'
            ],
            e1: [
                '<25>{#p/asriel1}{#f/15}* ...',
                "<25>{#f/16}* Eu não sei o que vai acontecer com $(name) depois disso.",
                "<25>{#f/13}* Ele fez isso tudo por uma chance de me ver, mas isso...",
                '<25>{#f/15}* ... no passado agora.'
            ],
            e2: [
                "<25>{#p/asriel1}{#f/13}* Eu nem consigo acreditar que ele fez isso tudo só pra me ver...",
                '<25>{#f/23}* Teimoso idiota.',
                '<25>{#f/17}* ... É o que eu diria, se ainda fosse uma estrela.',
                "<25>{#f/13}* Mas... eu não acho que ele seja idiota."
            ],
            e3: [
                "<25>{#p/asriel1}{#f/13}* $(name) não é estúpido.\n* Eu...",
                '<25>{#f/13}* Eu concordo com muito do que foi dito...',
                '<25>{#f/15}* Sobre ele não ser o tipo de amigo que eu desejava ter...',
                "<25>{#f/7}* ... mas isso não significa que eu desejava que ele se fosse!"
            ],
            e4: [
                "<25>{#p/asriel1}{#f/13}* Não é como se $(name) tivesse que ir...",
                "<25>{#f/17}* Se ele quisesse, poderia ficar com a gente.\n* Eu gostaria disso.",
                "<25>{#f/15}* Mas eu entendo ele querer ir.",
                '<25>{#f/16}* Ele \"venceu\" o jogo.\n* Ele não deveria mais querer \"brincar\" comigo'
            ],
            e5: [
                "<25>{#p/asriel1}{#f/13}* ... $(name)...\n* Se você ainda está por aí, escutando...",
                '<25>{#f/15}* Eu quero que você saiba que eu te amo.',
                '<25>{#f/23}* Você pode não ter sido a melhor pessoa...',
                '<25>{#f/22}* Mas, no fundo, você ainda se importava comigo.'
            ],
            e6: [
                '<25>{#p/asriel1}{#f/23}* Ha...',
                '<25>{#f/22}* Eu devo estar parecendo um louco agora.',
                '<25>{#f/15}* Obcecado por alguém que eu já deveria ter movido para frente...',
                '<26>{#f/17}* ... Eu acho que $ (name) e eu realmente somos apenas um \n  par de idiotas.'
            ],
            e7: [
                '<25>{#p/asriel1}{#f/13}* Uma vez, eu e $(name) estávamos lutando por uma cama...',
                "<25>{#f/10}* Porque nós dois queríamos aquele com a mesa de cabeceira ao lado.",
                '<26>{#f/15}* Nós estávamos nos empurrando de um lado pro outro, tentando ganhar espaço...',
                '<25>{#f/4}* Nós lutamos tanto que acabamos nos cansando e caímos no sono.',
                '<25>{#f/13}* Mas quando acordamos...',
                '<25>{#f/17}* Estávamos deitados um do lado do outro.',
                "<25>{#f/13}* Eu tentei levantar, mas... ele me abraçou.",
                '<26>{#f/15}* Ele continuava dizendo...',
                '<25>{#f/15}* \"... quentinho...\"',
                '<25>{#f/15}* \"... fofo...\"',
                '<25>{#f/20}* Eu teria me sentido desconfortável, mas...',
                "<25>{#f/17}* ... naquele ponto, eu só estava feliz por não estarmos lutando."
            ],
            e8: [
                '<25>{#p/asriel1}{#f/13}* Outra vez, $(name) e eu estávamos fazendo o jantar para mamãe e papai',
                '<25>{#f/15}* Ele queria que a comida fosse mais picante...',
                '<25>{#f/3}* Pra ser sincero, se ele insistisse naquilo agora, eu não teria reclamado.',
                '<25>{#f/20}* Eu poderia fazer uma comida picante agora.',
                '<25>{#f/13}* Mas, antes eu era mais um garoto das comidas suaves. Maior parte dos monstros eram.',
                '<25>{#f/15}* Acabamos brincando de cabo de guerra com a tigela e...',
                '<25>{#f/20}* Você deve imaginar como isso acabou.',
                '<25>{#f/17}* Mamãe fez a gente limpar a bagunça, obviamente.',
                '<25>{#f/13}* Então papai nos levou pra comer fora e nós comemos o que queríamos.'
            ],
            e9: [
                "<25>{#p/asriel1}{#f/15}* $(name) e eu...\n* Não é como se não tivéssemos um acordo com nada...",
                '<25>{#f/20}* Tirando passar muito tempo junto.',
                '<26>{#f/17}* Apesar de nossas diferenças, $(name) e eu realmente éramos inseparáveis.',
                "<25>{#f/13}* Nem mesmo a morte conseguiu nos separar para sempre."
            ],
            e10: [
                "<25>{#p/asriel1}{#f/17}* ... você acha que ele ainda está aí, Frisk?",
                '<25>{#f/17}* Com tudo isso que aconteceu, ele pode estar nos assistindo agora.',
                "<25>{#f/23}* Isso não seria alguma coisa.",
                "<25>{#f/22}* Mas é impossível saber de certeza."
            ],
            e11: [
                "<25>{#p/asriel1}{#f/17}* Senhor. Pra alguém que vai estar contigo...",
                "<25>{#f/20}* Eu tenho certeza que estou parecendo que queria estar com o $(name).",
                "<25>{#f/13}* Mas... não é verdade.",
                "<25>{#f/17}* Eu simplesmente não posso deixar de relembrar alguém que eu conhecia."
            ],
            e12: () => [
                '<25>{#p/asriel1}{#f/17}* Frisk...\n* Eu quero que você saiba.',
                '<25>{#f/13}* Graças a você...',
                '<25>{#f/23}* Eu sinto que tenho um futuro de novo.',
                '<25>{#f/22}* ...',
                ...(!SAVE.flag.b.pacifist_marker_forgive
                    ? ["<25>{#f/22}* Mesmo que você não pudesse me perdoar pelo que eu fiz..."]
                    : SAVE.flag.n.killed_sans > 0
                        ? ['<25>{#f/22}* Mesmo que eu quisesse que você tivesse feito todas aquelas coisas horríveis...']
                        : ['<25>{#f/22}* Mesmo sabendo que eu te torturei, e ameacei a vida de todos que você ama...']),
                "<25>{#f/13}* Você ainda assim está me ajudando a superar tudo isso.",
                '<25>{#f/23}* ... Significa muito pra mim.',
                '<25>{#f/22}* ...',
                '<25>{#f/13}* Mãe, Pai...',
                '<25>{#f/13}* Sans, Papyrus, Undyne, Alphys...',
                "<25>{#f/15}* Todos que eu matei nos inúmeros passados...",
                "<25>{#f/16}* ... vai ser bem difícil pra mim olhar diretamente em seus olhos.",
                '<25>{#f/13}* ...',
                "<25>{#f/17}* Mas eu vou tentar.",
                "<25>{#f/23}* Eu vou tentar se uma pessoa melhor.",
                '<25>{#f/22}* E, se eu ferrar tudo em algum momento...',
                "<25>{#f/13}* ... Eu sei que você vai estar aqui pra me ajudar."
            ],
            e13: [
                '<25>{#p/asriel1}{#f/17}* Ha... $(name).',
                "<25>{#f/23}* Eu não vou te decepcionar, beleza?",
                "<25>{#f/22}* Eu vou fazer o melhor que puder nesta chance que você está me dando.",
                "<25>{#f/17}* Eu vou fazer essa chance contar."
            ]
        },
        evac: ['<32>{#p/human}* (Você sente a presença dos monstros próximos sumindo.)'],
        stargum1: () =>
            SAVE.data.b.svr
                ? [
                    '<32>{#p/human}* (Você viu um pedaço de chiclete colado na história em quadrinhos...)',
                    choicer.create('* (Comer o chiclete?)', 'Sim', 'Não')
                ]
                : [
                    '<32>{#p/basic}* Tinha um pedaço de chiclete grudado na história em quadrinhos.',
                    choicer.create('* (Comer o chiclete?)', 'Sim', 'Não')
                ],
        stargum2: ['<32>{#p/human}* (Você decide não comer o chiclete.)'],
        stargum3: ['<32>{#p/human}* (Você recuperou $(x) HP.)'],
        stargum4: ['<32>{#p/human}* (HP totalmente restaurado.)'],
        fireplace1: () =>
            SAVE.data.b.svr
                ? [
                    '<32>{#p/human}* (Você sente o calor da fogueira te convidando...)',
                    choicer.create('* (Entrar para esquentar?)', 'Sim', 'Não')
                ]
                : [
                    SAVE.data.n.state_wastelands_toriel === 2 || world.runaway
                        ? '<32>{#p/basic}* Uma fogueira ordinária.'
                        : "<32>{#p/basic}* Fogueira da Toriel.\n* Não é tão quente, apenas o suficiente pra aconchegar.",
                    ...(world.darker
                        ? []
                        : ['<32>* Você provavelmente poderia entrar aí.', choicer.create('* (Entrar para esquentar?)', 'Sim', 'Não')])
                ],
        fireplace2a: ['<32>{#p/human}* (Você decide não entrar.)'],
        fireplace2b: () => [
            '<32>{#p/human}* (Você entra na fogueira e deixa seu calor aconchegar sua alma.)',
            '<32>{#p/human}* (Você está muito confortável.)',
            ...(SAVE.data.b.svr
                ? asrielinter.fireplace2b++ < 1
                    ? ["<25>{#p/asriel1}{#f/13}* Eu só vou, uh, esperar você sair."]
                    : []
                : world.goatbro && SAVE.flag.n.ga_asrielFireplace++ < 1
                    ? ["<25>{#p/asriel2}{#f/15}* Vou apenas, uh, esperar você sair..."]
                    : [])
        ],
        fireplace2c: ["<25>{#p/toriel}{#f/1}{#npc/a}* Não fique aí por tanto tempo..."],
        fireplace2d: ['<32>{#p/basic}* ...', '<32>* Isso é legal.'],
        noticereturn: ['<25>{#p/asriel2}{#f/10}* Esqueceu alguma coisa aqui?'],
        noticestart: [
            '<25>{#p/asriel2}{#f/3}* Ah, o lugar onde tudo começou.',
            "<25>{#p/asriel2}{#f/4}* Nós temos nos dado muito bem desde então, não é, $(name)?"
        ],
        noticedummy: ['<25>{#p/asriel2}{#f/3}* ...', "<25>{#p/asriel2}{#f/10}* Não tinha um boneco aqui antes...?"],
        afrog: {
            a: [
                '<32>{#p/basic}{#n1}* Só entre eu e você...',
                '<32>* Eu vi aquela senhora cabra passando por aqui mais cedo.',
                '<32>* Ela tinha um monte de compras, então eu perguntei pra que elas eram e...',
                "<32>* Bem, acho bom preparar o estômago."
            ],
            b: () =>
                SAVE.data.n.plot === 72
                    ? [
                        '<32>{#p/basic}{#n1}* Só entre eu e você...',
                        '<32>* Eu vi aquela senhora cabra passando aqui mais cedo.',
                        '<32>* Ela disse que era hora de \"confrontar seus medos.\"',
                        "<32>* Bem, seja lá o que ela fez, levou a alguma coisa!\n* Estamos livres!"
                    ]
                    : SAVE.data.n.plot === 71.2
                        ? [
                            '<32>{#p/basic}{#n1}* Você viu ela?\n* Ela passou por aqui, tipo, agora!',
                            '<32>* Ela disse que era hora de \"confrontar seus medos.\"',
                            '<32>* Eu me pergunto o que ela deveria estar dizendo...?\n* Ela parecia determinada'
                        ]
                        : SAVE.data.b.w_state_lateleave
                            ? [
                                '<32>{#p/basic}{#n1}* Só entre eu e você...',
                                '<32>* Eu vi aquela senhora cabra pegando o táxi para o supermercado mais cedo.',
                                "<32>* Ela disse que estava indo comprar leite, mas não voltou até agora...",
                                "<32>* Tomara que ela esteja bem."
                            ]
                            : [
                                '<32>{#p/basic}{#n1}* Só entre eu e você...',
                                "<32>* Algumas vezes, quando estou sozinho, eu gosto de pedir o táxi pra ir no supermercado.",
                                "<32>* É um mercadinho bem pequeno, mas tem muita coisa pra comprar.",
                                "<32>* Talvez eu te leve lá alguma hora... você iria amar!"
                            ],
            c: () =>
                SAVE.data.n.plot === 72
                    ? [
                        '<32>{#p/basic}{#n1}* Só entre eu e você...',
                        "<32>* Eu não gostei muito de como você nos espancou no começo.",
                        '<32>* Estávamos todos com medo e confusos...',
                        '<32>* ... pelo menos você fez algo bom no final.'
                    ]
                    : [
                        '<32>{#p/basic}{#n1}* Só entre eu e você...',
                        "<32>* As pessoas que você tem espancado não estão muitos felizes.",
                        "<32>* Eu só estou feliz que não sou de lutar...\n* Caso contrário...",
                        "<32>* Eu teria sua cabeça."
                    ],
            d: ['<32>{#p/basic}{#n1}* Não... não!', '<32>* Sai de perto de m-mim!']
        },
        asriel0: [
            "<25>{#p/asriel2}{#f/5}* ... mas tá tudo bem, eu sei que você vai estar lá a tempo!",
            "<25>{#p/asriel2}{#f/1}* Você não gostaria de me decepcionar, né?"
        ],
        asriel1: () =>
            [
                [
                    "<25>{#p/asriel2}{#f/2}* Desculpa, eu tive que usar o telefone da Toriel pra fazer uma ligação.",
                    "<25>{#p/asriel2}{#f/1}* Não se preocupe...\n* Você vai descobrir o motivo logo, logo...",
                    "<25>{#p/asriel2}{#f/2}* ... hee hee hee.\n* Vou estar te esperando logo acima."
                ],
                ["<25>{#p/asriel2}{#f/4}* Vou estar te esperando logo acima."],
                ['<25>{#p/asriel2}{#f/3}* ...']
            ][Math.min(SAVE.flag.n.ga_asrielNegative1++, 1)],
        asriel2: () => [
            '<25>{#p/asriel2}{#f/1}* Pronto, $(name)?',
            "<25>{#f/2}* Assim que sairmos, não terá volta.",
            choicer.create('* (Seguir ele?)', 'Sim', 'Não')
        ],
        asriel2b: () => ['<25>{#p/asriel2}{#f/1}* Pronto?', choicer.create('* (Seguir ele?)', 'Sim', 'Não')],
        asriel3: ['<25>{#p/asriel2}{#f/2}* Okay...', "<25>{#f/1}* Aí vamos nós!"],
        asriel4: ["<25>{#p/asriel2}{#f/4}* Ficarei aqui esperando, então."],
        asrielDiary: [
            [
                '<32>{#p/human}* (Você abre a primeira página... você mal consegue entender as palavras.)',
                '<32>{#p/asriel1}{#v/2}* \"Estou começndo um diáio porque a mamãe disse que selia divertido.\"',
                '<32>* \"Hoje eu aprendu como colocar sementis no jardim do papae\"',
                '<32>* \"ele diz que elas vão crecer em brevve, mas vai demorau muito.\"',
                '<32>* \"mamãe vai fazer uma torta de caracau hoje à nuite e estou muito amimado\"',
                '<32>* \"Além disso, estou tendo um bom dia.\"'
            ],
            [
                '<32>{#p/human}* (Você vira para a segunda página...)',
                '<32>{#p/asriel1}{#v/2}* \"azzys diário, k-504\"',
                '<32>* \"Mamãe disse que eu devria escrever a data, assim as pesoas sabem quando eu escrevo.\"',
                '<32>* \"Minha flor estrelada ainda não começou a crescer, mas o papae prometeu que logo comecarra\"',
                '<32>* \"Eu gostaria que houvesse uma janela no meu quarto, mas papai disse que há plumagem aqui.\"',
                '<32>* \"Eles diseram que vai coloca uma janela na sala de presença\"',
                '<32>* \"Eu esto tendo um bom dia tabem.\"'
            ],
            [
                '<32>{#p/human}* (Você vira para a terceira para.. alguns anos se passaram.)',
                '<32>{#p/asriel1}{#v/2}* \"Azzys Diário, K-506.03.\"',
                '<32>* \"Meu antigo diário estava em uma caixa de brinquedos, então resolvi pegá-lo e escrever.\"',
                '<32>* \"Parece que eu só escrevi a primeira parte da data na última vez.\"',
                '<32>* \"Aliás, aquela flor estrelada que eu plantei antes, cresceu.\"',
                '<32>* \"Mas eu lutei com um amigu outro dia, não conversamos desde então.\"',
                '<32>* \"Eu tô bem preocupado... espero que ele não esteja com raiva.\"'
            ],
            [
                '<32>{#p/human}* (Você vira para a quarta página...)',
                '<32>{#p/asriel1}{#v/2}* \"Azzys Diário, K-506.03\"',
                '<32>* \"Eu conversei com meu amigu, ele disse que não tá mais com raiva, então tá tudo bem.\"',
                '<32>* \"Mamãe e eu estávamos assistindo o céu ontem, e vimos uma estrela cadente.\"',
                '<32>* \"Ela me disse pra fazer um pedido... eu desegei que um dia um humano virá.\"',
                '<32>* \"Mamãe e Papai contam tantas histórias sobre eles...\"',
                '<32>* \"Eles não podem ser todos ruins, né?\"'
            ],
            [
                '<32>{#p/human}* (Você vira para a quinta página...)',
                '<32>{#p/asriel1}{#v/2}* \"Azzys Diário, K-506.03\"',
                '<32>* \"Não tem muito a ser dito hoje.\"',
                '<32>* \"Talvez essa ideia de diário foi boba.\"',
                '<32>* \"Mãe me viu escrevendo outro dia e tinha um olhar de orgulho em seu rosto.\"',
                '<32>* \"Será se é inportante assim?\"'
            ],
            [
                '<32>{#p/human}* (Você vira para a sexta página... parece que mais alguns anos se passaram.)',
                '<32>{#p/asriel1}{#v/1}* \"Azzy\'s Diário, K-510.08\"',
                '<32>* \"Eu acho que não posso escrever muito de uma vez.\"',
                '<32>* \"Mas eu vi o livro de novo e decidi que gostaria de escrever mais.\"',
                '<32>* \"Os últimos anos foram incríveis, eu fui pra escola e aprendi muitas coisas.\"',
                '<32>* \"Como todo o sistema da tabuada.\"\n* \"E como usar computadores.\"',
                '<32>* \"Minha mãe disse que sou muito novo pra ter uma conta online.\"',
                '<32>* \"Talvez algum dia, quando mais velho, eu possa ter uma.\"'
            ],
            [
                '<32>{#p/human}* (Você vira para a sétima página...)',
                '<32>{#p/asriel1}{#v/1}* \"Azzy\'s Diário, K-510.08.\"',
                '<32>* \"Eu cara bem inteligente nos visitou hoje. Ele disse que teve um sonho ruim sobre um humano.\"',
                '<32>* \"Eu já escrevi ele aqui? Bem, ele é o cientista real.\"',
                '<32>* \"Ele inventou um monte de coisas das quais usamos hoje. Meu pai ama falar dele.\"',
                '<32>* \"Como os replicadores e fabricantes e as coisas de placas de gravidade.\"',
                '<32>* \"Ele me olhou com um medo, como se eu fosse assustador.\"',
                '<32>* \"Eu fiz algo errado?\"'
            ],
            [
                '<32>{#p/human}* (Você vira para a oitava página...)',
                '<32>{#p/asriel1}{#v/1}* \"Azzy\'s Diário, K-510.08.\"',
                '<32>* \"Uma nova estrela apareceu no céu hoje.\"',
                '<32>* \"Uma bem estrelada.\"',
                '<32>* \"Me pergunto porque mais estrelas assim não aparecem com frequência.\"',
                '<32>* \"E nós vamos nos mudar para a cidadela quando estiver pronta.\"',
                '<32>* \"Eu dei uma olhada em parte das construções, parece lindo!\"',
                '<32>* \"Vai ser bem melhor que viver na factory.\"'
            ],
            [
                '<32>{#p/human}* (Você vira para a nona página... parece que um dia se passou.)',
                '<32>{#p/asriel1}{#v/1}* \"Azzy\'s Diário, K-510.09.\"',
                '<32>* \"Eu conheci um humano de verdade ontem. Ele bateu sua nave no lixão perto da nossa casa.\"',
                '<32>* \"Eu os ajudei a sair dos destroços e ele me agradeceu.\"',
                '<32>* \"Eu não imaginei que isso aconteceria de verdade, mas aqui esta ele.\"',
                '<32>* \"E o humano é um menino{#p/basic}f{#p/asriel1}{#v/1}h{#p/basic}sj haha azzy é um bundão ele{#p/asriel1}{#v/1}vh{#p/basic}v{#p/asriel1}{#v/1}j{#p/basic}a{#p/asriel1}{#v/1}s\"',
                '<32>* \"Certo, eu estou tendo que me esconder de baixo dos cobertores para o $(name) não acabar com minha escrita.\"',
                '<32>* \"Ele é meio grosso as vezes, mas tudo bem.\"',
                '<32>* \"Mãe fez aquela coisa de entrar em batalha com ele e o seu coração era vermelho de cabeça pra baixo.\"',
                '<32>* \"É bem legal ter alguém pra conversar.\"'
            ],
            [
                '<32>{#p/human}* (Você vira para a décima pagina...)',
                '<32>{#p/asriel1}{#v/1}* \"Azzy\'s Diário, K-510.09.\"',
                '<32>* \"Mãe disse que vai adotar $(name).\"',
                '<32>* \"Eu nem sei o que adotar significa, mas mãe disse que ele vai ser tipo meu irmão.\"',
                '<32>* \"Eu gostei bastante, pois agora posso passar mais tempo com ele.\"',
                '<32>* \"Eu e $(name) vamos fazer tudo juntos!\"',
                '<32>* \"Ele disse que sente muito pelo que fez na outra página.\"',
                '<32>* \"Eu ainda não respondi, mas eu perdoei ele.\"',
                '<32>{#p/basic}* ...'
            ],
            [
                '<32>{#p/human}* (Você vira para a décima primeira página.)',
                '<32>{#p/asriel1}* \"Asriel\'s Diário, K-515.09\"',
                '<32>* \"$(name) disse que é hora para o plano.\"',
                '<32>* \"Eu estava com medo, mas ele disse que eu vou conseguir.\"',
                '<32>* \"Depois de escrever aqui, eu vou esperar ele comer a torta envenenada que eu fiz...\"',
                '<32>* \"Então poderemos salvar todo mundo. Juntos.\"',
                '<32>* \"Se algo der errado e você estiver lendo isso depois...\"',
                '<32>* \"Eu só quero que você saiba, que você é o melhor, $(name).\"',
                '<32>{#p/basic}* ...',
                '<32>{#p/human}* (Parece que tem alguém chorando...)'
            ]
        ],
        backdesk: {
            a: () => [
                ...(SAVE.data.b.svr ? [] : ["<32>{#p/basic}* Há uma mochila pendurada neste cabide."]),
                '<32>{#p/human}* (Você olha dentro da mochila...)',
                ...(SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Mas não havia nada dentro para ser coletado.)']
                    : ['<32>{#p/basic}* Nada aqui.'])
            ],
            b: () => [
                ...(SAVE.data.b.svr ? [] : ["<32>{#p/basic}* Há uma mochila pendurada neste cabide."]),
                '<32>{#p/human}* (Você olha dentro da mochila...)',
                ...(SAVE.data.b.svr
                    ? []
                    : ["<32>{#p/basic}* O que é isso?\n* Uma edição limitada do quadrinho do Super Starwalker?"]),
                '<32>{#s/equip}{#p/human}* (Você pegou o Super Starwalker 2.)'
            ],
            b2: () => [
                ...(SAVE.data.b.svr ? [] : ["<32>{#p/basic}* Há uma mochila pendurada neste cabide."]),
                '<32>{#p/human}* (Você olha dentro da mochila...)',
                ...(SAVE.data.b.svr
                    ? []
                    : ["<32>{#p/basic}* O que é isso?\n* Uma edição limitada do quadrinho do Super Starwalker?"]),
                "<32>{#p/human}* (Você está carregando muito pra levar isso.)"
            ]
        },
        midsleep: () => [
            '<32>{#p/human}* (Se você dormir agora, talvez você perca algo importante.)',
            choicer.create('* (Ir dormir?)', 'Sim', 'Não')
        ],
        bedfailToriel: [
            '<25>{#p/toriel}{#f/5}* Oh querido.',
            '<25>{#f/1}* Talvez minhas ações tenham causado mais danos do que eu imaginava...',
            '<25>{#f/0}* ...\n* Não se preocupe, minha criança.',
            "<25>* Eu farei questão de te dar uma boa noite de sono para o resto da sua jornada.",
            '<32>{#p/human}* (Toriel se senta próxima de você e começa a cantar uma canção de ninar pra te ver dormir.)'
        ],
        blooky1: () => [
            '<32>{#p/napstablook}* Zzz... Zzz...',
            '<32>* Zzz... Zzz...',
            "<32>{#p/basic}* Esse fantasma continua falando 'z' em voz alta, pretendendo dormir.",
            choicer.create('* (Tentar passar por cima?)', 'Sim', 'Não')
        ],
        blooky2: () => [
            '<32>{#p/basic}* O fantasma ainda está bloqueando o caminho.',
            choicer.create('* (Tentar passar por cima?)', 'Sim', 'Não')
        ],
        blooky3: [
            '<32>{#p/napstablook}* normalmente eu visito esse lugar pra ter paz e quietude...',
            '<32>* mas hoje eu conheci alguém legal...',
            "<32>* bem, eu vou sair do seu caminho agora.",
            '<32>* até...'
        ],
        blooky4: [
            '<32>{#p/napstablook}* então hm...\n* você me curte bastante, huh',
            '<32>* heh... valeu...',
            '<32>* e, uh... desculpa por ter entrado no seu caminho antes...',
            "<32>* eu vou pra outro lugar agora",
            "<32>* mas... não se preocupe...",
            "<32>* você vai me ver de novo, mais tarde...",
            '<32>* se você quiser...',
            '<32>* bem, até...'
        ],
        blooky5: [
            '<32>{#p/napstablook}* então hm... você realmente me odeia, huh',
            "<32>* isso é... legal...",
            "<32>* bem, acho que eu vou indo então",
            '<32>* tchau...'
        ],
        blooky6: [
            '<32>{#p/napstablook}* então hm... aquilo aconteceu...',
            '<32>* ...',
            '<32>* uh... eu tenho que ir',
            '<32>* até...'
        ],
        blooky7: [
            "<32>{#p/napstablook}* você nem disse nada pra mim...",
            "<32>* isso... eu nem sei o que foi isso...",
            "<32>* certo, eu vou indo agora",
            '<32>* tchau...'
        ],
        breakfast: ['<32>{#p/human}* (Você pegou as lesmas fritas.)'],
        breakslow: ["<32>{#p/human}* (Você está carregando muito pra levar isso.)"],
        candy1: () =>
            SAVE.data.b.svr
                ? [
                    '<32>{#p/human}* (Você se aproximou da máquina de venda.)',
                    choicer.create('* (O que você vai querer?)', 'Doce', 'Água', 'Δ-9', 'Nada')
                ]
                : [
                    '<32>{#p/basic}* Sintetizar algo com a máquina de venda?',
                    choicer.create('* (O que você vai querer?)', 'Doce', 'Água', 'Δ-9', 'Nada')
                ],
        candy2: ['<32>{#p/human}* (Você pegou $(x).)\n* (Pressione [C] para abrir o menu.)'],
        candy3: ['<32>{#p/human}* (Você pegou $(x).)'],
        candy4: () => [
            '<32>{#p/human}* (Você pegou $(x).)',
            ...(SAVE.data.b.svr ? [] : ['<32>{#p/basic}* A máquina parece estar bugando.'])
        ],
        candy5: () => [
            '<32>{#p/human}* (Você pegou $(x).)',
            ...(SAVE.data.b.svr ? [] : ['<32>{#p/basic}* A máquina quebrou.'])
        ],
        candy6: () =>
            SAVE.data.b.svr
                ? [
                    [
                        '<25>{#p/asriel1}{#f/13}* Fora de serviço, de novo?',
                        "<25>{#f/17}* É, isso é... parte do design na verdade.",
                        "<25>{#f/13}* Esta máquina funciona com a própria fonte de alimentação das Outlands, então...",
                        '<25>{#f/15}* Pra evitar usar tanta energia, Toriel fez com ela se quebrasse sozinha.',
                        "<26>{#f/20}* Não que ela te contaria."
                    ],
                    [
                        '<25>{#p/asriel1}{#f/13}* O motivo da energia aqui ser tão pouca é que...',
                        "<25>{#f/17}* Ao contrário do CORE, ela usa apenas radiação de fundo.",
                        "<25>{#f/13}* Se colocássemos isso em números, eu diria...",
                        '<25>{#f/15}* Que aqui é gerado apenas 10% de poder em comparação ao que o CORE produz.'
                    ],
                    [
                        '<25>{#p/asriel1}{#f/13}* Hmm...',
                        '<25>{#f/15}* Eu me pergunto se, mesmo com essa pequena capacidade...',
                        '<25>{#f/13}* Esse gerador seria o suficiente para dar energia a um pequeno sistema atmosférico.',
                        '<25>{#f/17}* Se o CORE fosse destruído, pessoas poderiam viver aqui...?'
                    ],
                    ['<26>{#p/asriel1}{#f/20}* ... perguntando pra um amigo.']
                ][Math.min(asrielinter.candy6++, 3)]
                : ["<32>{#p/basic}* Não está funcionando."],
        candy7: ['<32>{#p/human}* (Você decide não fazer nada.)'],
        candy8: ["<32>{#p/human}* (Você está carregando muito.)"],
        chair1a: () => [
            '<25>{#p/toriel}{#f/1}{#n1}* O que foi, minha criança?\n* Você está com fome?',
            '<25>{#f/0}* Talvez você queira saber mais sobre o livro que estou lendo.',
            choicer.create('{#n1!}* (O que você acha?)', 'Fome', 'Livro', 'Ir embora', 'Nada')
        ],
        chair1b: () => [
            '<25>{#p/toriel}{#n1}* O que foi, minha criança?',
            choicer.create('{#n1!}* (O que você acha?)', 'Fome', 'Livro', 'Ir embora', 'Nada')
        ],
        chair1c: ['<25>{#p/toriel}{#n1}* Me diga caso você precise de algo.'],
        chair1d: ['<25>{#p/toriel}{#n1}* Bem, me diga se você mudar de ideia.'],
        chair1e: () => [
            '<25>{#p/toriel}{#f/1}{#n1}* Noite agitada?',
            '<25>{#f/1}* ...\n* Se você quiser, eu posso ler este livro para você...',
            '<25>{#f/0}* É chamado \"O monstro Generoso\" e foi escrito por um humano.',
            choicer.create('{#n1!}* (Ler o livro?)', 'Sim', 'Não')
        ],
        chair1f: pager.create(
            0,
            ['<25>{#p/toriel}{#n1}{#f/1}* Voltou para uma visita?', '<25>{#f/0}* Sinta-se livra para ficar o quanto você quiser.'],
            ['<26>{#p/toriel}{#n1}{#f/5}* Eu ficarei por aqui, como sempre...']
        ),
        chair2a1: () => [
            '<25>{#p/toriel}{#f/1}{#n1}* Você está com fome?\n* Quer que eu te faça um café da manhã?',
            choicer.create('{#n1!}* (Comer café da manhã?)', 'Sim', 'Não')
        ],
        chair2a2: ['<25>{#p/toriel}{#n1}* Fantástico!\n* Estarei na cozinha preparando.'],
        chair2a3: () => [
            '<25>{#p/toriel}{#f/1}{#n1}* Você mudou sua ideia sobre o café da manhã?',
            choicer.create('{#n1!}* (Comer café da manhã?)', 'Sim', 'Não')
        ],
        chair2a4: () =>
            SAVE.data.b.drop_snails
                ? [
                    '<25>{#p/toriel}{#f/3}{#n1}* Você queria que eu fizesse outro logo após você finalizar o primeiro?',
                    '<25>{#f/4}* Essa criança...',
                    '<25>{#f/0}* Não, pequeno.\n* Não irei preparar outro café da manhã agora.'
                ]
                : [
                    '<25>{#p/toriel}{#n1}* Eu já servi o café da manhã, pequeno.',
                    '<25>{#f/1}* Não podemos ter mais de um café da manhã por dia, certo?',
                    '<25>{#f/0}* Isso seria gula.'
                ],
        chair2c1: () => [
            '<25>{#p/toriel}{#n1}* Ah, o livro!\n* É uma leitura bem divertida.',
            '<25>{#f/0}* É chamado \"O Monstro Generoso\" e foi escrito por um humano.',
            '<25>{#f/1}* Você gostaria que eu lê-se ele para você?',
            choicer.create('{#n1!}* (Ler o livro?)', 'Sim', 'Não')
        ],
        chair2c2: ['<25>{#p/toriel}{#n1}* Esplêndido!', '<25>{#g/torielCompassionSmile}* ...'],
        chair2c3: () => [
            '<25>{#p/toriel}{#f/1}{#n1}* Você quer que eu leia o livro agora?',
            choicer.create('{#n1!}* (Ler o livro?)', 'Sim', 'Não')
        ],
        chair2c4: () => [
            '<25>{#p/toriel}{#f/1}{#n1}* Você quer que eu leia o livro novamente?',
            choicer.create('{#n1!}* (Ler o livro?)', 'Sim', 'Não')
        ],
        chair2c5: ['<25>{#p/toriel}{#f/1}{#n1}* Tudo bem...', '<25>{#p/toriel}{#g/torielCompassionSmile}* ...'],
        chair2c6: [
            '<25>{#f/1}{#n1}* \"Uma vez, havia um monstro...\"',
            '<25>{#f/0}* \"E ela amava o pequeno humano.\"',
            '<25>{#f/1}* \"E todo dia, o humano viria visitar...\"',
            '<25>{#f/0}* \"E iria correr e brincar juntos nos campos.\"',
            '<25>{#f/1}* \"Iriam cantar músicas juntos, contar histórias um para o outro...\"',
            '<25>{#f/0}* \"Brincar de esconde-esconde.\"',
            '<25>{#f/1}* \"E quando o humano ficasse cansado, ela o levaria para a cama...\"',
            '<25>{#f/0}* \"E o humano amava o monstro muito mesmo.\"',
            '<25>{#f/0}* \"E o monstro estava feliz.\"',
            '<25>{#f/1}* \"Mas conforme o tempo passou e o humano foi crescendo...\"',
            '<25>{#f/0}* \"O monstro foi ficando sozinho.\"',
            '<25>{#f/1}* \"Então um dia, o humano voltou...\"',
            '<25>{#f/0}* \"E o monstro disse \'Venha, humano, venha brincar\'\"',
            '<25>{#f/5}* \"\'Eu sou muito grande para brincar\', disse o humano.\"',
            '<25>{#f/1}* \"\'Eu quero dirigir, encontrar uma nova casa...\'\"',
            "<25>{#f/5}* \"'Desculpa,' disse o monstro, 'eu sou muito pobre para ter um carro.'\"",
            '<25>{#f/5}* \"\'Tudo que eu tenho são meus dois pés.\'\"',
            '<25>{#f/0}* \"\'Suba nas minhas costas, eu posso te levar aonde você precisar.\'\"',
            '<25>{#f/0}* \"\'Então você pode ver a cidade e ser feliz.\'\"',
            '<25>{#f/1}* \"E assim o humano subiu nas costas do monstro...\"',
            '<25>{#f/0}* \"E o monstro os levou para um novo lugar.\"',
            '<25>{#f/0}* \"E o monstro estava feliz.\"',
            '<25>{#f/1}* \"Mas o humano ficou longe tempo demais...\"',
            '<25>{#f/5}* \"E o monstro estava triste.\"',
            '<25>{#f/0}* \"Então um dia, o humano voltou.\"',
            '<25>{#f/1}* \"E o monstro sorriu de orelha a orelha e disse...\"',
            '<25>{#f/1}* \"\'Venha, humano, venha subir em minhas costas!\'\"',
            '<25>{#f/5}* \"\'Eu estou muito triste para subir,\' disse o humano.\"',
            '<25>{#f/1}* \"\'Eu queria ter uma família e crianças das quais pudesse cuidar...\'\"',
            "<25>{#f/5}* \"'Desculpa,' disse o monstro, 'mas eu não posso te dar isso.'\"",
            '<25>{#f/5}* \"\'Eu sou apenas uma pessoa.\'\"',
            '<25>{#f/0}* \"\'Venha me ver mais vezes e eu posso te encontrar uma parceira.\'\"',
            '<25>{#f/0}* \"\'Assim você pode encontrar o amor e a felicidade.\'\"',
            '<25>{#f/1}* \"E assim o humano visitou sua amiga por um tempo...\"',
            '<25>{#f/0}* \"E o monstro encontrou alguém que ele gostasse.\"',
            '<25>{#f/0}* \"E o monstro estava feliz.\"',
            '<25>{#f/5}* \"E o humano sumiu novamente por muito tempo.\"',
            '<25>{#f/1}* \"Quando o humano retornou, o monstro estava tão feliz...\"',
            '<25>{#f/9}* \"Ela mal conseguia falar.\"',
            '<25>{#f/1}* \"\'Venha, humano,\' ela disse...\"',
            '<25>{#f/1}* \"\'Venha e faça uma visita.\'\"',
            '<25>{#f/5}* \"\'Eu estou muito velho e ocupado para visitar,\" disse o humano.\"',
            '<25>{#f/1}* \"\'Eu preciso de um lugar para descansar pela noite...\'\"',
            "<25>{#f/5}* \"'Desculpa,' disse o monstro, 'mas eu não tenho uma cama do seu tamanho.'\"",
            '<25>{#f/5}* \"\'Eu nem tenho dinheiro para comprar uma.\'\"',
            '<25>{#f/0}* \"\'Durma comigo pela noite.\'\"',
            '<25>{#f/0}* \"\'Assim você pode descansar e ser feliz.\'\"',
            '<25>{#f/1}* \"Então o humano e o monstro deitaram-se juntos...\"',
            '<25>{#f/0}* \"E o monstro conseguiu trazer paz e sono ao humano.\"',
            '<25>{#f/0}* \"E o monstro estava feliz.\"',
            '<25>{#f/5}* \"... mas não totalmente.\"',
            '<25>{#f/9}* \"E após um longo tempo, o humano voltou novamente.\"',
            "<25>{#f/5}* \"'Me desculpa, humano,' disse o monstro, 'mas eu estou velha.'\"",
            '<25>{#f/5}* \"\'Minhas pernas estão fracas, eu não posso te levar a lugar algum.\'\"',
            '<25>{#f/10}* \"\'Não existe outro lugar que eu queira estar,\' disse o humano.\"',
            '<26>{#f/5}* \"\'Eu não posso te encontrar um amor, eu não conheço mais ninguém\' disse o monstro.\"',
            '<25>{#f/10}* \"\'Não existe mais ninguém com quem eu queira estar,\' disse o humano.\"',
            '<25>{#f/5}* \"\'Eu estou muito doente para você dormir comigo\', disse o monstro.\"',
            '<25>{#f/10}* \"\'Eu não preciso mais de descanso,\' disse o humano.\"',
            "<25>{#f/5}* \"'Desculpe-me,' disse o monstro com um chorinho.",
            '<25>{#f/5}* \"\'Eu queria ter algo a oferecer, mas eu não tenho nada.\'\"',
            '<25>{#f/9}* \"\'Eu sou apenas uma velha monstro aproximando-se da morte.\'\"',
            '<25>{#f/5}* \"\'Desculpe-me...\'\"',
            '<25>{#f/10}* \"\'Eu não preciso de muito agora,\' disse o humano.\"',
            '<25>{#f/10}* \"\'Apenas um abraço do meu melhor amigo antes de morrer.\'\"',
            '<25>{#f/1}* \"\'Bem,\' disse o monstro, ajustando a postura...\"',
            '<25>{#f/0}* \"\'Bem, um monstro de idade está sempre aqui para isso.\'\"',
            '<25>{#f/0}* \"\'Venha, humano, venha a mim. Fique comigo uma última vez.\'\"',
            '<25>{#f/9}* \"E assim fez o humano.\"',
            '<25>{#f/10}* \"E o monstro estava feliz.\"'
            
        ],
        chair2c7: ['<25>{#f/0}{#n1}* Está foi a história.', '<25>{#f/1}* Espero que você tenha gostado...'],
        chair2c8: ['<25>{#f/0}{#n1}* Bem, isso é tudo.'],
        chair2d1: [
            '<25>{#p/toriel}{#f/1}{#n1}* Casa...?\n* Poderia ser mais específico?',
            choicer.create('* (O que você diz?)', 'Esquece', 'Quando eu posso\nir pra casa?')
        ],
        chair2d2: [
            '<25>{#p/toriel}{#f/1}{#n1}* Mas... essa é sua casa agora, não?',
            choicer.create('* (O que você diz?)', '\nDesculpa', 'Como sair\ndas Outlands')
        ],
        chair2d3: [
            '<25>{#p/toriel}{#f/5}{#n1}* Por favor, entenda...',
            '<25>{#p/toriel}{#f/9}* Eu só quero o melhor pra você.'
        ],
        chair2d4: [
            '<25>{#p/toriel}{#f/5}{#n1}* Minha criança...',
            choicer.create('* (O que você diz?)', '\nDesculpa', 'Como sair\ndas Outlands')
        ],
        chair2d5: ['<25>{#p/toriel}{#f/5}{#n1}* ...'],
        chair2d6: [
            '<25>{#p/toriel}{#f/9}{#n1}* ...',
            '<25>{#p/toriel}{#f/9}* Por favor, espere aqui.',
            '<25>{#p/toriel}{#f/5}* Existe algo que eu preciso fazer.'
        ],
        chair3: () =>
            SAVE.data.b.svr
                ? [
                    [
                        "<25>{#p/asriel1}{#f/20}* Ainda não consigo acreditar que ela moveu tudo isso da Cidadela.",
                        "<25>{#f/17}* Mas... Eu entendo o motivo dela fazer.",
                        '<25>{#f/13}* Mãe e sua cadeira foram bem longe...'
                    ],
                    [
                        '<25>{#p/asriel1}{#f/13}* Uma vez, ela me disse uma coisa...',
                        '<25>{#f/17}* \"Essa cadeira me lembra de casa.\"',
                        '<25>{#f/13}* Mas ela já estava em casa, então eu perguntei o que ela queria dizer.',
                        '<25>{#f/17}* Acontece que ela tinha isso aqui na casa dela...',
                        '<25>{#f/23}* ... no antigo mundo.'
                    ],
                    [
                        "<25>{#p/asriel1}{#f/13}* Eu não sei muito sobre aquele mundo, Frisk...",
                        '<25>{#f/17}* Mas ouvi dizer que era muito... idílico.',
                        '<25>{#f/20}* Claro, houveram muitos avanços na magia e tecnologia...',
                        '<25>{#f/17}* Mas as pessoas amaram, porque a vida estava tão mais... simples.'
                    ],
                    ["<25>{#p/asriel1}{#f/23}* O que eu não daria para ter uma vida mais simples."]
                ][Math.min(asrielinter.chair3++, 3)]
                : world.darker
                    ? ['<32>{#p/basic}* Uma cadeira de leitura.']
                    : ['<32>{#p/basic}* Uma confortável cadeira de leitura...', '<32>* Parece o tamanho correto para Toriel.'],
        chair4: ['<25>{#p/toriel}{#n1}* Ah, aí esta você.', '<25>* Eu deixei o seu café da manhã na mesa.'],
        closetrocket: {
            a: () => [
                '<32>{#p/human}* (Você olha dentro do baú...)',
                ...(SAVE.data.b.svr
                    ? [
                        [
                            "<25>{#p/asriel1}{#f/13}* É, uh, isso é basicamente tudo que você vai encontrar lá.",
                            "<25>{#f/17}* Não tenho certeza do motivo da Toriel colocar isso lá.",
                            '<25>{#f/17}* $(name) e eu nunca fomos muito interessados em quadrinhos.'
                        ],
                        ['<25>{#p/asriel1}{#f/10}* Acho que ela só queria fingir que estávamos morando aqui...?'],
                        ['<25>{#p/asriel1}{#f/13}* A coisas que uma mãe faz para se sentir melhor...']
                    ][Math.min(asrielinter.closetrocket_a++, 2)]
                    : ['<32>{#p/basic}* Nada aqui.'])
            ],
            b: () => [
                '<32>{#p/human}* (Você olha dentro do baú...)',
                ...(SAVE.data.b.svr
                    ? []
                    : ["<32>{#p/basic}* O que é isso?\n* Uma edição limitada do quadrinho do Super Starwalker?"]),
                '<32>{#s/equip}{#p/human}* (Você pegou o Super Starwalker 3.)'
            ],
            b2: () => [
                '<32>{#p/human}* (Você olha dentro do baú...)',
                ...(SAVE.data.b.svr
                    ? []
                    : ["<32>{#p/basic}* O que é isso?\n* Uma edição limitada do quadrinho do Super Starwalker?"]),
                "<32>{#p/human}* (Você está carregando muito pra levar isso.)"
            ]
        },
        goner: {
            a1: () =>
                SAVE.flag.b.$svr
                    ? [
                        "<32>{#p/human}* Eu vi o efeito que você teve neste mundo...",
                        '<32>* Um fim perfeito, onde todos acabam sendo felizes...',
                        "<32>* A algo especial em relação a isso."
                    ]
                    : [
                        '<32>{#p/human}* Um mundo não limitado por associação...',
                        '<32>* Existindo puramente pelo bem de sua própria beleza...',
                        "<32>* A algo especial em relação a isso."
                    ],
            a2: () =>
                SAVE.flag.b.$svr
                    ? ['<32>* Com isso sendo dito...', "<32>* Parece que não foi o suficiente para satisfazer sua... curiosidade."]
                    : ['<32>* Me diz...', '<32>* Isso não ativa a chama, da sua... curiosidade?']
        },
        danger_puzzle1: () => [
            '<25>{#p/toriel}* Nesta sala existe um novo tipo de quebra-cabeça.',
            [1, 5].includes(SAVE.data.n.state_wastelands_dummy)
                ? '<25>{#f/3}* Talvez você se saia melhor aqui do que com o boneco.'
                : '<25>{#f/1}* Você acha que pode resolvê-lo?'
        ],
        danger_puzzle2: () =>
            world.darker
                ? ["<32>{#p/basic}* É muito alto para você alcançar."]
                : ["<32>{#p/basic}* A altura impressionante deste terminal é mais alta que você, bloqueando sua visão."],
        danger_puzzle3: () => [
            [1, 5].includes(SAVE.data.n.state_wastelands_dummy)
                ? '<25>{#p/toriel}{#f/3}* O que foi agora...'
                : '<25>{#p/toriel}{#f/1}* Qual o problema?\n* Você precisa de ajuda?'
        ],
        danger_puzzle4: () => [
            ...([1, 5].includes(SAVE.data.n.state_wastelands_dummy)
                ? ['<25>{#p/toriel}{#f/5}* Ah... estou vendo.', '<25>{#f/5}* O terminal é muito alto para você alcançar.']
                : [
                    '<25>{#p/toriel}{#f/7}* ... oh.',
                    '<25>{#f/6}* Parece que houve um erro de design aqui.',
                    '<25>{#f/1}* Então o terminal é alto demais pra você alcançar...?'
                ]),
            '<25>{#f/0}* Não importa.\n* Eu vou operar para você.',
            '<25>{#f/0}* ...',
            '<25>{#f/0}* Tem uma rima para ser resolvida aqui.\n* Você gostaria de tentar?',
            choicer.create('* (Resolver a rima?)', 'Sim', 'Não')
        ],
        danger_puzzle5a: [
            '<25>{#p/toriel}* Excelente!\n* A importância de tentar e chegar ao aprendizado.',
            '<25>{#f/0}* Principalmente para almas jovens como a sua.'
        ],
        danger_puzzle5b: [
            '<25>{#p/toriel}{#f/0}* A rima toma a forma de uma pergunta.',
            "<25>{#p/toriel}{#f/1}* \"Água mole, pedra dura, o que acontece quando se bate em excesso?\""
        ],
        danger_puzzle5c: [
            '<32>{#p/human}* (...)\n* (Você diz a Toriel sua resposta.)',
            '<25>{#p/toriel}{#f/0}* ... ah, muito bom.\n* E com uma atitude tão positiva!'
        ],
        danger_puzzle5d: [
            '<32>{#p/human}* (...)\n* (Você diz a Toriel que não sabe a resposta.)',
            '<25>{#p/toriel}{#f/1}* ... a algo de errado?\n* Você parece ter algo em sua mente.',
            '<25>{#f/5}* ... hmm...',
            '<25>{#f/0}* Tudo bem, então.\n* Eu resolvo a rima para você dessa vez.'
        ],
        danger_puzzle5e: () =>
            [1, 5].includes(SAVE.data.n.state_wastelands_dummy)
                ? ['<25>{#p/toriel}{#f/5}* ...', '<25>{#f/5}* Eu entendo.']
                : ['<25>{#p/toriel}{#f/0}* ...', '<25>{#f/0}* Eu suponho que possa resolver a rima para ti, dessa vez.'],
        danger_puzzle6: () => [
            [1, 5].includes(SAVE.data.n.state_wastelands_dummy) && SAVE.data.b.w_state_riddleskip
                ? '<25>{#p/toriel}{#f/5}* E... {#x1}pronto.\n* O caminho foi liberado.'
                : '<25>{#p/toriel}* E... {#x1}pronto!\n* O caminho está livre!'
        ],
        danger_puzzle7: () => [
            [1, 5].includes(SAVE.data.n.state_wastelands_dummy) && SAVE.data.b.w_state_riddleskip
                ? '<25>{#p/toriel}{#f/5}* Eu vou esperar por você para irmos até a próxima sala.'
                : '<25>{#p/toriel}* Quando estiver pronto, venha para a próxima sala.'
        ],
        danger_puzzle8: () =>
            SAVE.data.b.svr
                ? ["<32>{#p/human}* (Mas você não conseguiu alcançar o terminal.)"]
                : ['<32>{#p/basic}* Mesmo agora, o terminal continua alto como sempre.'],
        denie: ["<32>{#p/human}* (Você está carregando muito pra levar isso.)"],
        dipper: {
            a: () => [
                '<32>{#p/human}* (Você pegou a Ursa Menor.)',
                choicer.create('* (Equipar a Ursa Menor?)', 'Sim', 'Não')
            ],
            b: ["<32>{#p/human}* (Você está carregando muito pra levar isso.)"]
        },
        drop_pie: ['<25>{#p/toriel}{#f/1}* Tortas são feitas para comer, não serem jogadas no chão.'],
        drop_pie3: ['<25>{#p/toriel}{#f/1}* Por favor, não jogue comida no chão.'],
        drop_snails: ['<25>{#p/toriel}{#f/1}* O que essas pobres lesmas fritas fizeram para você.'],
        drop_soda: ["<32>{#p/basic}{#n1}* Aww qual foi! ;)", '<32>* Eu coloquei meu coração nisso! ;)'],
        drop_steak: ['<32>{#p/basic}{#n1}* Sério!? ;)', '<32>* Aquele bife não tinha preço! ;)'],
        dummy1: [
            '<25>{#p/toriel}{#f/0}* Sua próxima lição envolve encontros com outros monstros.',
            '<25>{#f/1}* Como um humano andando pelo Outpost, é muito provável que você seja atacado...',
            '<25>{#f/0}* Se isso acontecer, você vai entrar naquilo que é conhecido como uma LUTA.',
            '<25>{#f/0}* Felizmente, existem muitas formas de se sair de uma.',
            '<25>{#f/1}* Por agora, eu recomendo que você tente fazer uma conversa agradável...',
            '<25>{#f/0}* ... Para que assim, eu possa resolver o conflito para ti.'
        ],
        dummy2: ['<25>{#p/toriel}* Para começar, você deve conversar com esse boneco.'],
        dummy3: [
            '<25>{#p/toriel}{#f/7}* ... você acha que eu sou o boneco?',
            '<25>{#f/6}* Hahaha!\n* Adorável!',
            '<25>{#f/0}* Infelizmente, eu sou apenas uma velha senhora cansada.'
        ],
        dummy4: [
            '<25>{#p/toriel}* Não tem nada a temer, minha criança.',
            '<25>* Um boneco de treino não pode te ferir.'
        ],
        dummy5: ['<25>{#p/toriel}{#f/1}* Vá lá, pequeno...'],
        dummy6: [
            '<25>{#p/toriel}{#f/2}* Pequeno, não!\n* O boneco não foi feito pra lutar!',
            '<25>{#f/1}* Aliás, não queremos ferir ninguém, queremos?',
            '<25>{#f/0}* Venha.'
        ],
        dummy7: ['<25>{#p/toriel}* Excelente!\n* Você parece ser um rápido aprendiz.'],
        dummy8: [
            '<25>{#p/toriel}{#f/1}* Você fugiu...?',
            '<25>{#f/0}* Sinceramente, essa foi uma escolha inteligente.',
            '<26>{#f/1}* Ao fugir, você evitou qualquer conflito...',
            '<25>{#f/0}* ... mesmo que isso seja APENAS um simples boneco de treinamento.'
        ],
        dummy9: ['<25>{#p/toriel}{#f/3}* ...', '<25>{#f/4}* ...', '<25>{#f/0}* A próxima sala espera.'],
        dummy9a: ['<25>{#p/toriel}{#f/3}* ...', '<25>{#f/4}* ...', '<25>{#f/6}* A próxima sala.'],
        dummy10: [
            '<25>{#p/toriel}{#f/7}* Minha criança, isso é...',
            '<25>{#f/0}* ... é a coisa mais fofa que eu vi hoje.',
            '<25>{#f/0}* De qualquer forma, você conseguiu lidar perfeitamente com essa lição.',
            '<25>{#f/0}* A próxima sala espera.'
        ],
        dummy11: ['<25>{#p/toriel}* A próxima sala aguarda.'],
        dummy12: [
            '<25>{#p/toriel}{#f/2}* Meu senhor, criança!\n* Tenha piedade!',
            '<25>{#f/1}* ...',
            '<25>{#f/0}* Ainda bem... que era apenas um boneco de treino.',
            '<25>{#f/1}* No futuro, porém, seria sábio...',
            '<25>{#f/0}* ... não espancar as pessoas até a quase morte!',
            '<26>{#f/0}* De toda forma.\n* A próxima sala está lá.'
        ],
        eat_pie: ['<25>{#p/toriel}{#f/1}{#n1}* Gostoso, não é?'],
        eat_snails: ['<25>{#p/toriel}{#f/0}{#n1}* Espero que seu café da manhã tenha sido preenchedor.'],
        eat_soda: [
            '<32>{#p/basic}* Aaron puxa seu celular e tira uma fotona.',
            '<32>{#p/basic}{#n1}* Ooh, eu definitivamente poderia colocar isso em um poster ;)'
        ],
        eat_steak: [
            '<32>{#p/basic}* Aaron te olhou e lançou em você uma piscadela.',
            '<32>{#p/basic}{#n1}* Você gosta do produto, moça? ;)'
        ],
        endtwinkly2: [
            '<32>{#p/basic}* Quem ele pensa que é?',
            "<32>* Você tem sido nada além de bondoso com todos que nós conhecemos.",
            '<32>* Aquela estrela falante realmente precisa achar uma vida...'
        ],
        endtwinklyA1: [
            '<25>{#p/twinkly}{#f/12}* Seu idiota...',
            "<25>* Você não me ouviu antes!?",
            '<25>* Eu lembro de ter dito exatamente para você não ferrar tudo!',
            "<25>* Agora olha o que você fez com nosso plano.",
            '<25>{#f/8}* ...',
            '<25>{#f/6}* É melhor você arrumar isso, $(name).',
            "<25>{#f/5}* É nosso destino."
        ],
        endtwinklyA2: () =>
            SAVE.flag.n.genocide_milestone < 1
                ? [
                    '<25>{#p/twinkly}{#f/5}* Olá, $(name).',
                    "<25>{#f/5}* Parece que você não quer mais brincar comigo.",
                    '<25>{#f/6}* Eu tentei ter paciência com você, mas aqui estamos...',
                    '<25>{#f/6}* De volta ao começo novamente.',
                    '<25>{#f/8}* De novo e de novo...',
                    '<25>{#f/5}* Você deve pensar que isso tudo é super engraçado.',
                    '<25>{#f/7}* Me trazendo a chance de estar contigo, só para me tirar logo em seguida...',
                    "<25>{#f/5}* Bem, por mim beleza.",
                    "<25>{#f/5}* Se esse é o joguinho que você quer jogar, então vá em frente.",
                    "<25>{#f/11}* Só não espere estar no controle por tanto tempo...",
                    "<25>{#f/7}* Cedo ou tarde, você vai se arrepender do que fez."
                ]
                : [
                    '<25>{#p/twinkly}{#f/6}* Olá, $(name).',
                    ...(SAVE.flag.n.genocide_milestone < 7
                        ? [
                            "<25>{#f/6}* Eu tomei um tempo para pensar sobre o que aconteceu.",
                            '<25>{#f/5}* Foi emocionante, no começo...',
                            '<25>* A ideia de tomar o Outpost à força juntos...',
                            "<25>{#f/6}* Mas agora, eu não tenho certeza.",
                            '<25>{#f/8}* ...',
                            '<25>{#f/8}* Eu acho... que eu fui basicamente carregado.',
                            "<25>{#f/5}* Mas tá tudo bem, certo?\n* Você vai me perdoar, né?"
                        ]
                        : [
                            "<25>{#f/6}* Eu ainda não tenho certeza do que aconteceu lá atrás...",
                            "<25>{#f/5}* Tá... meio que me assustando, haha...",
                            '<25>{#f/8}* ...',
                            '<25>{#f/8}* Talvez... devêssemos deixar as coisas como estão por enquanto.',
                            "<25>{#f/5}* Mas tá tudo bem, certo?\n* Você vai ficar bem, não vai?"
                        ]),
                    '<25>{#f/6}* ...',
                    '<25>{#f/8}* Adeus, $(name)...',
                    ...(SAVE.flag.n.genocide_milestone < 7 ? ["<25>{#f/5}* Eu vou voltar antes de você perceber."] : [])
                ],
        endtwinklyAreaction: [
            '<32>{#p/basic}* Desculpa, eu perdi alguma coisa?',
            "<32>* Eu nunca falei com ele na minha vida, ou fui deixado sozinho em uma missão com ele.",
            "<32>* Ah, bem.\n* Não seria a primeira vez que ele inventaria histórias sobre mim."
        ],
        endtwinklyB: () =>
            SAVE.data.b.w_state_lateleave
                ? [
                    '<25>{#p/twinkly}{#f/5}{#v/0}* Bem.\n* Isso foi inesperado.',
                    "<25>{#f/11}{#v/0}* Você pensa que pode quebrar as regras, né não?",
                    '<25>{#f/7}{#v/0}* Hee hee hee...',
                    "<25>{#f/0}{#v/1}* Neste mundo, é MATAR ou MORRER."
                ]
                : [
                    '<25>{#p/twinkly}{#f/5}{#v/0}* Inteligente.\n* Beeeeeem inteligente.',
                    "<25>{#f/11}{#v/0}* Você se acha bem inteligente, né não?",
                    '<25>{#f/7}{#v/0}* Hee hee hee...',
                    "<25>{#f/0}{#v/1}* Neste mundo, é MATAR ou MORRER."
                ],
        endtwinklyB2: [
            '<25>{#f/8}{#v/0}* Se você tivesse matado só mais alguns monstros...',
            "<25>{#f/9}{#v/0}* Não, eu não deveria revelar meus planos tão cedo.",
            '<25>{#f/7}{#v/0}* Sabe de uma coisa, $(name)...',
            "<25>{#f/5}{#v/0}* É apenas uma questão de tempo até estarmos juntos novamente.",
            '<25>{#f/6}{#v/0}* Tente ir um pouco mais adiante da próxima vez e talvez...',
            "<25>{#f/5}{#v/0}* Você consiga algo novo.",
            '<25>{#f/11}{#v/0}* Até a próxima...'
        ],
        endtwinklyB3: [
            '<25>{#f/8}{#v/0}* Se você tivesse matado só mais um monstro...',
            "<25>{#f/9}{#v/0}* Não, eu não deveria revelar meus planos tão cedo.",
            '<25>{#f/7}{#v/0}* Sabe de uma coisa, $(name)...',
            "<25>{#f/5}{#v/0}* É apenas uma questão de tempo até estarmos juntos novamente.",
            '<25>{#f/6}{#v/0}* Tente ir um pouco mais adiante da próxima vez e talvez...',
            "<25>{#f/5}{#v/0}* Você consiga algo novo.",
            '<25>{#f/11}{#v/0}* Até a próxima...'
        ],
        endtwinklyBA: () => [
            SAVE.data.n.state_wastelands_napstablook === 5
                ? '<25>{#p/twinkly}{#f/6}{#v/0}* Então você passou tudo isso sem matar ninguém.'
                : '<25>{#p/twinkly}{#f/6}{#v/0}* Então você poupou a vida de todos os quais cruzaram seu caminho.',
            '<25>{#f/5}{#v/0}* Aposto que você está se sentindo muito bem.',
            '<25>{#f/2}{#v/1}* Mas o que você faria se batesse de frente com um assassino em série?',
            "<25>{#f/9}{#v/0}* Você iria morrer, e morrer, morrer, morrer...",
            "<25>{#f/5}{#v/0}* Até eventualmente se cansar de tentar.",
            '<25>{#f/11}{#v/0}* Então, o que fará em seguida?',
            '<25>{#f/2}{#v/1}* Você o mataria por frustração?',
            '<25>{#f/14}{#v/1}* Ou você só DESISTIRIA?',
            '<25>{#f/11}{#v/0}* Hee hee hee...',
            '<25>{#f/7}{#v/0}* Isso vai ser muito divertido.',
            "<25>{#f/9}{#v/0}* Estarei assistindo!"
        ],
        endtwinklyBB1: () => [
            SAVE.data.b.w_state_lateleave
                ? "<25>{#p/twinkly}{#f/6}{#v/0}* Então você conseguiu ficar fora do caminho de algumas pessoas miseráveis."
                : '<25>{#p/twinkly}{#f/6}{#v/0}* Então você poupou a vida de alguns miseráveis.',
            '<25>{#f/11}{#v/0}* Mas e os outros, huh?',
            '<25>{#f/7}{#v/0}* Froggit, Flutterlyte, Gelatini, Silente, Oculoux, Mushy...',
            "<25>{#f/6}{#v/0}* Cê não acha que cada uns deles tinham famílias?",
            "<25>{#f/8}{#v/0}* Cê não acha que cada um deles tinham amigos?",
            "<25>{#f/5}{#v/0}* Cada um deles era a provável Toriel de outras pessoas.",
            '<25>{#f/5}{#v/0}* ...',
            '<25>{#f/7}{#v/0}* Egoísta de merda.',
            '<25>{#f/0}{#v/1}* Monstros estão mortos por sua causa.'
        ],
        endtwinklyBB2: () => [
            SAVE.data.b.w_state_lateleave
                ? "<25>{#p/twinkly}{#f/6}{#v/0}* Então você fora do caminho de uma única pessoa."
                : '<25>{#p/twinkly}{#f/6}{#v/0}* Então você poupou a vida de uma única pessoa.',
            '<25>{#f/11}{#v/0}* Mas e quanto aos outros, huh?',
            '<25>{#f/7}{#v/0}* Froggit, Flutterlyte, Gelatini, Silente, Oculoux, Mushy...',
            "<25>{#f/0}{#v/0}* Eles todos se foram, agora.",
            "<25>{#f/11}{#v/0}* O que será que a Toriel vai fazer quando ficar sabendo?",
            '<25>{#f/2}{#v/1}* E se ela acabar se SUICIDANDO por puro desgosto?',
            "<25>{#f/11}{#v/0}* Se você pensa que salvou a vida dela só por poupa-lo...",
            "<25>{#f/7}{#v/0}* Então você é mais idiota do que eu pensava.",
            '<25>{#f/9}* Bem, te vejo por aí!'
        ],
        endtwinklyBB3: () => [
            SAVE.data.b.w_state_lateleave
                ? "<25>{#p/twinkly}{#f/6}{#v/0}* Então você conseguiu ficar fora do caminho de quase todas as pessoas."
                : '<25>{#p/twinkly}{#f/6}{#v/0}* Então você poupou a vida de quase todos que cruzaram seu caminho.',
            SAVE.data.b.w_state_lateleave
                ? '<25>{#p/twinkly}{#f/11}{#v/0}* Mas e aquele o qual você enfrentou, hein?'
                : "<25>{#p/twinkly}{#f/11}{#v/0}* Mas e aquele no qual você NÃO teve piedade, hein?",
            '<25>{#f/7}{#v/0}* Froggit, Flutterlyte, Gelatini, Silente, Oculoux, Mushy...',
            "<25>{#f/6}{#v/0}* Cê não acha que cada uns deles tinham famílias?",
            "<25>{#f/8}{#v/0}* Cê não acha que cada um deles tinham amigos?",
            "<25>{#f/5}{#v/0}* Aquele que você matou provavelmente era a Toriel de outra pessoa.",
            '<25>{#f/5}{#v/0}* ...',
            '<25>{#f/7}{#v/0}* Egoísta de merda.',
            "<25>{#f/0}{#v/1}* Alguém está morto por sua causa."
        ],
        endtwinklyBC: [
            "<25>{#p/twinkly}{#f/5}{#v/0}* Mas eu sei que você está bem ciente disto...",
            "<25>{#f/6}{#v/0}* Considerando que você já matou a Toriel antes.",
            "<25>{#f/7}{#v/0}* Não é mesmo, seu merda?",
            '<25>{#f/2}{#v/1}* Você ASSASSINOU ela.',
            "<25>{#f/7}{#v/0}* Então você se sentiu mal...\n* Não é verdade?",
            '<25>{#f/7}{#v/0}* Hee hee hee...',
            "<25>{#f/11}{#v/0}* Você pensa que é o único com aquele poder?",
            '<25>{#f/6}{#v/0}* O poder de refazer o universo usando puramente sua determinação...',
            '<25>{#f/8}{#v/0}* O poder de SALVAR...',
            '<25>{#f/7}{#v/0}* Este foi um dia MEU poder, também.',
            '<25>{#f/6}{#v/0}* Parece que SUA força neste mundo é MAIOR que a minha.',
            '<25>{#f/5}{#v/0}* hehehe.\n* Aproveite este poder enquanto você pode.',
            "<25>{#f/9}{#v/0}* Estarei assistindo!"
        ],
        endtwinklyC: [
            '<25>{#f/7}{#v/0}* Até porque, este era MEU poder.',
            '<25>{#f/6}{#v/0}* O poder de refazer o universo usando puramente sua determinação...',
            '<25>{#f/8}{#v/0}* O poder de SALVAR...',
            '<25>{#f/6}{#v/0}* Eu pensava que era o único capaz de fazer isso.',
            '<25>{#f/6}{#v/0}* Parece que SUA força neste mundo é MAIOR que a minha.',
            '<25>{#f/5}{#v/0}* hehehe.\n* Aproveite este poder enquanto você pode.',
            "<25>{#f/9}{#v/0}* Estarei assistindo!"
        ],
        endtwinklyD: [
            "<25>{#p/twinkly}{#f/11}{#v/0}* Você é um provocador e tanto, hein?",
            '<25>{#f/8}{#v/0}* Batendo nos monstros até eles quase morrerem, só para então deixá-los ir...',
            "<25>{#f/7}{#v/0}* O que você fará se um monstro não quiser sua piedade?",
            '<25>{#f/6}{#v/0}* Você irá apagar a luz que passa por aqueles olhos?',
            '<25>{#f/5}{#v/0}* Ou você vai entender que a sua tal \"piedade\" é uma mentira?',
            '<25>{#f/11}{#v/0}* Hee hee hee...',
            '<25>{#f/7}{#v/0}* Isso vai ser muito divertido.',
            "<25>{#f/9}{#v/0}* Estarei assistindo!"
        ],
        endtwinklyE: [
            "<25>{#p/twinkly}{#f/7}{#v/0}* Wow, você é muito repulsivo.",
            '<26>{#f/11}{#v/0}* Você sobreviveu pacificamente...',
            "<25>{#f/5}{#v/0}* Então, você percebeu que aquilo não era bom o suficiente para ti.",
            '<25>{#f/2}{#v/1}* Então você a MATOU só pra ver o que iria acontecer.',
            '<25>{#f/7}{#v/0}* Hee hee hee...',
            '<25>{#f/0}{#v/0}* Você fez isso só por simples TÉDIO.'
        ],
        endtwinklyEA: ["<25>{#f/11}{#v/0}* Não pense que eu não sei como isso funciona..."],
        endtwinklyEB: ["<25>{#f/6}{#v/0}* É triste, claro..."],
        endtwinklyF: ['<25>{#p/twinkly}{#f/11}{#v/0}* Olha pra você, brincando com ela como se fosse brinquedo...'],
        endtwinklyFA: ['<25>{#f/7}{#v/0}* Matando-a, deixando ela ir, matando de novo...'],
        endtwinklyFB: ['<25>{#f/7}{#v/0}* Matando-a, deixando ela ir, matando de novo...'],
        endtwinklyFXA: [
            "<25>{#f/11}{#v/0}* É divertido, certo?",
            '<25>{#f/6}{#v/0}* Brincadeira sem fim com a vida dos outros...',
            '<25>{#f/8}{#v/0}* Reagindo a como eles agem a cada decisão possível...',
            "<25>{#f/11}{#v/0}* Não é gratificante?",
            '<25>{#f/7}{#v/0}* Hee hee hee...',
            "<25>{#f/9}{#v/0}* Me pergunto o que você fará em seguida.",
            "<25>{#f/5}{#v/0}* Eu estarei assistindo..."
        ],
        endtwinklyG: [
            "<25>{#p/twinkly}{#f/10}{#v/0}* Você nunca está satisfeito, né~",
            '<25>{#f/11}{#v/0}* Quantas vezes mais você vai matar ela, hein?',
            '<25>{#f/7}{#v/0}* Hee hee hee...',
            '<25>{#f/0}{#v/1}* Você meio que me lembra de mim mesmo.',
            '<25>{#f/9}{#v/0}* Te vejo por aí!'
        ],
        endtwinklyG1: [
            '<25>{#p/twinkly}{#f/6}{#v/0}* De novo?\n* Cara...',
            '<25>{#f/0}{#v/1}* Você REALMENTE é meu reflexo.'
        ],
        endtwinklyG2: [
            '<25>{#p/twinkly}{#f/6}{#v/0}* DE NOVO!?',
            "<25>{#f/8}{#v/0}* Wow, você é pior do que eu pensava."
        ],
        endtwinklyH: () => [
            SAVE.data.b.w_state_lateleave
                ? "<25>{#p/twinkly}{#f/5}{#v/0}* Finalmente você se saiu pacificamente, huh?"
                : "<25>{#p/twinkly}{#f/5}{#v/0}* Então você finalmente decidiu demonstrar piedade, huh?",
            '<25>{#f/5}{#v/0}* Depois de toda aquela MATANÇA...',
            '<25>{#f/11}{#v/0}* Me diz, qual era sua ideia afinal?',
            '<25>{#f/2}{#v/1}* Era matar ela inúmeras vezes e depois poupar quando ficasse entediado?',
            '<25>{#f/7}{#v/0}* Hee hee hee...',
            '<25>{#f/11}{#v/0}* Nossa, que santo que você pensar ser.',
            "<25>{#f/5}{#v/0}* Mas ei, não é como se eu não soubesse como isso funciona..."
        ],
        endtwinklyI: [
            '<25>{#p/twinkly}{#f/11}{#v/0}* Hee hee hee...',
            '<25>{#f/7}{#v/0}* Espero que você goste da sua escolha.',
            "<25>{#f/9}{#v/0}* Até porque, não é como se você pudesse voltar atrás e mudar o que aconteceu.",
            "<25>{#f/0}{#v/1}* Neste mundo, é MATAR ou MORRER.",
            '<25>{#f/5}{#v/0}* Aquela velha senhora pensou que poderia quebrar as regras.',
            '<25>{#f/8}{#v/0}* Ela tentou tento salvar os humanos...',
            "<25>{#f/6}{#v/0}* Mas quando chegou a vez dela, a mesma acabou nem conseguindo se salvar."
        ],
        endtwinklyIX: [
            '<25>{#p/twinkly}{#f/11}{#v/0}* Hee hee hee...',
            '<25>{#f/11}{#v/0}* Então você finalmente cedeu e matou alguém, huh?',
            '<25>{#f/7}{#v/0}* Bem, espero que você goste da sua escolha.',
            "<25>{#f/9}{#v/0}* Até porque, não é como se você pudesse voltar atrás e mudar o que aconteceu.",
            "<25>{#f/0}{#v/1}* Neste mundo, é MATAR ou MORRER.",
            "<25>{#f/8}{#v/0}* ... Que foi?\n* Ela não durou o tanto que você esperava?",
            '<26>{#f/6}{#v/0}* Nossa, que tristeza.\n* Acho que nem todo mundo pode ser espancado até a submissão.'
        ],
        endtwinklyIA: ['<25>{#f/11}{#v/0}* Que idiota!'],
        endtwinklyIAX: ['<25>{#f/7}{#v/0}* Que triste para ela.'],
        endtwinklyIB: ['<25>{#f/6}{#v/0}* Já para você...'],
        endtwinklyJ: [
            '<25>{#p/twinkly}{#f/6}{#v/0}* Wow.',
            '<25>{#f/7}{#v/0}* E aqui eu pensei que você era o justo por mostrar misericórdia.',
            '<25>{#f/11}{#v/0}* Hah!\n* Que piada!',
            '<25>{#f/6}{#v/0}* ...',
            '<25>{#f/6}{#v/0}* Como é a sensação de alimentar seu lado violento?',
            '<25>{#f/7}{#v/0}* Hee hee hee...',
            "<25>{#f/0}{#v/1}* Eu aposto que foi PRAZEROSO, não foi?",
            '<25>{#f/11}{#v/0}* Olha, eu saberia...'
        ],
        endtwinklyK: [
            '<25>{#p/twinkly}{#f/5}{#v/0}* Bom te ver de novo.',
            "<25>{#f/6}{#v/0}* Aliás, você é a pessoa mais entediante da galáxia.",
            '<25>{#f/12}{#v/0}* Se saindo pacificamente, então voltando atrás só pra fazer a mesma coisa?',
            '<25>{#f/8}{#v/0}* Qual foi...',
            "<25>{#f/2}{#v/1}* Você sabe tão bem quanto eu que é MATAR ou SER MORTO."
        ],
        endtwinklyK1: [
            "<25>{#p/twinkly}{#f/6}* Você não tá ficando entediado?",
            '<25>{#f/8}{#v/0}* Qual foi...',
            '<25>{#f/2}{#v/1}* Você sabe que lá no fundo, parte de você quer machucar ela.',
            "<25>{#f/14}{#v/1}* Só bater algumas vezes, e ela estará morta em um piscar de olhos.",
            "<25>{#f/11}{#v/0}* Isso não seria excitante?",
            '<25>{#f/6}{#v/0}* ...',
            '<25>{#f/8}{#v/0}* ...',
            '<25>{#f/7}{#v/0}* Até logo, idiota.'
        ],
        endtwinklyK2: [
            '<25>{#p/twinkly}{#f/8}{#v/0}* Você tá fazendo isso só pra ver como eu vou reagir?',
            '<25>{#f/6}{#v/0}* É sobre isso?',
            "<25>{#f/7}{#v/0}* Tá bom, não espere retirar mais nada de mim.",
            '<25>{#f/6}{#v/0}* Todo esse pacifismo entediante está ficando enjoativo.',
            '<25>{#f/11}{#v/0}* Agora, se algo mais interessante acabar acontecendo...',
            "<25>{#f/9}{#v/0}* Talvez eu esteja mais afim de conversar.",
            '<25>{#f/6}{#v/0}* ...',
            '<25>{#f/8}{#v/0}* ...',
            '<25>{#f/7}{#v/0}* Até logo, idiota.'
        ],
        endtwinklyKA: [
            "<25>{#f/7}{#v/0}* Cedo ou tarde, você será forçado a entender isso.",
            '<25>{#f/11}{#v/0}* E quando esse tempo chegar...',
            "<25>{#f/5}{#v/0}* Vamos dizer que eu estarei interessado no que vai acontecer.",
            '<25>{#f/11}{#v/0}* Hee hee hee...',
            '<25>{#f/9}{#v/0}* Boa sorte!'
        ],
        endtwinklyKB: [
            '<25>{#f/11}{#v/0}* Hee hee hee...',
            "<25>{#f/7}{#v/0}* Talvez seja por isso que você matou aquele único monstro.",
            '<25>{#f/8}{#v/0}* Quer dizer, você passou quase todo o caminho sem matar ninguém...',
            '<25>{#f/6}{#v/0}* Mas em algum lugar no meio do caminho, você ferrou tudo.',
            '<25>{#f/5}{#v/0}* Todo aquele bom carma que você tinha foi direto para o vaso sanitário.',
            "<25>{#f/11}{#v/0}* Senhor, você não consegue fazer nada direito!",
            '<25>{#f/11}{#v/0}* Que piada!'
        ],
        endtwinklyKC: [
            '<25>{#f/11}{#v/0}* Hee hee hee...',
            "<25>{#f/7}{#v/0}* Talvez seja por isso que você matou aqueles monstros.",
            '<25>{#f/8}{#v/0}* Quer dizer, você teve uma boa caminhada, mas...',
            "<25>{#f/6}{#v/0}* Qual o ponto da piedade se isso não significa nada?",
            '<25>{#f/7}{#v/0}* E acredite em mim, depois do que você fez...',
            "<25>{#f/2}{#v/1}* Não significa JACK.",
            '<25>{#f/6}{#v/0}* ...',
            '<25>{#f/8}{#v/0}* ...',
            '<25>{#f/7}{#v/0}* Até logo, idiota.'
        ],
        endtwinklyKD: [
            "<25>{#f/11}{#v/0}* O que tem de errado em matar Toriel, huh?\n* Bom demais pra isso?",
            '<25>{#f/7}{#v/0}* Hee hee hee...',
            "<25>{#f/2}{#v/1}* Eu sei que você ainda está podre até o âmago.",
            '<25>{#f/11}{#v/0}* Quer dizer, você conseguiu retirar todo mundo do seu caminho...',
            '<25>{#f/6}{#v/0}* Mas quando se veio para o final do caminho, você falhou.',
            "<25>{#f/11}{#v/0}* Senhor, você não consegue fazer nada direito!",
            '<25>{#f/11}{#v/0}* Que piada!'
        ],
        endtwinklyL: [
            '<25>{#p/twinkly}{#f/6}{#v/0}* De volta, huh?\n* Senhor...',
            "<25>{#f/8}{#v/0}* Você mudou tanto a linha do tempo...",
            "<25>{#f/6}{#v/0}* Que eu nem sei mais o que pensar.",
            '<25>{#f/8}{#v/0}* Você é bom?\n* Mau?\n* Só curioso?',
            '<25>{#f/6}{#v/0}* Nem sei.',
            '<25>{#f/5}{#v/0}* Deve ter uma coisa, então...',
            "<25>{#f/5}{#v/0}* Uma coisa que EU SEI que você ainda não fez.",
            '<25>{#f/11}{#v/0}* Hee hee hee...',
            "<25>{#f/7}{#v/0}* Exatamente.",
            "<25>{#f/7}{#v/0}* Você não matou todos aqui em apenas uma caminhada.",
            "<25>{#f/11}{#v/0}* Você não está pelo menos UM POUCO curioso?",
            '<25>{#f/8}{#v/0}* Vamos lá, $(name)...',
            "<25>{#f/5}{#v/0}* Eu sei que você esta aí em algum lugar."
        ],
        endtwinklyL1: [
            '<25>{#p/twinkly}{#f/6}{#v/0}* Hora hora, nos encontramos de novo.',
            '<25>{#f/8}{#v/0}* Já pensou em contar quantas vezes?',
            "<25>{#f/6}{#v/0}* Tanto faz.\n* Não importa.",
            '<25>{#f/6}{#v/0}* Você SABE o que precisa fazer, $(name).',
            '<25>{#f/8}{#v/0}* ...',
            "<25>{#f/5}{#v/0}* Eu estarei esperando."
        ],
        exit1: [
            '<25>{#p/toriel}{#f/13}* Você deseja voltar para \"casa\", não é?',
            '<25>{#f/9}* ...',
            '<25>{#f/9}* Se você sair daqui, eu não serei capaz de te ajudar.',
            '<25>{#f/9}* Eu não serei capaz de te salvar dos perigos que estão adiante.',
            '<25>{#f/13}* Então, por favor, pequeno...',
            '<25>{#f/9}* Volte de onde veio.'
        ],
        exit2: [
            '<25>{#p/toriel}{#f/13}* Todos os humanos que vem aqui encontram o mesmo destino.',
            '<25>{#f/9}* Eu vi isso se repetir de novo e de novo.',
            '<25>{#f/13}* Eles vem.',
            '<25>{#f/13}* Eles vão.',
            '<25>{#f/9}* ... eles morrem.',
            '<25>{#f/13}* Minha criança...',
            '<25>{#f/13}* Se você sair das Outlands...',
            '<25>{#f/9}* Ele...\n* {@fill=#f00}ASGORE{@fill=#fff}...\n* Tomará a sua ALMA.'
        ],
        exit3: [
            '<25>{#p/toriel}{#f/9}* ...',
            '<25>{#f/13}* Eu não queria dizer isso, mas...',
            '<25>{#f/11}* Eu não posso permitir que você continue por este caminho.',
            '<25>{#f/9}* Por sua própria segurança, criança...',
            '<25>{#f/9}* Não me siga para a próxima sala.'
        ],
        exit4: [
            '<25>{#p/toriel}{#p/toriel}{#f/13}* ...',
            '<25>{#f/10}* ... Claro.',
            '<25>{#f/9}* Talvez estivesse predestinado a isso.',
            '<25>{#f/9}* Talvez eu tenha sido tola de pensar que você seria diferente.',
            '<25>{#f/9}* ...',
            '<25>{#f/13}* Mas existe apenas uma escolha.',
            '<25>{#f/13}* Desculpe-me, minha criança...',
            '<25>{#f/11}* Eu não poderei te deixar ir.'
        ],
        exitfail1: (lateleave: boolean, sleep: boolean) =>
            world.postnoot
                ? [
                    [
                        sleep
                            ? "<32>{#p/twinkly}{#f/19}* Após você dormir na casa da mamãe, ela saiu pra comprar comida."
                            : "<32>{#p/twinkly}{#f/19}* Após você voltar para a casa da mamãe, ela saiu para comprar comida.",
                        '<32>{#x1}* Mas... oh não!\n* O táxi em que ela estava explodiu, matando-a instantaneamente!',
                        '<32>* Senhor, eu me pergunto como algo tão azarado poderia acontecer.',
                        '<32>{*}{#x2}* ...',
                        "<25>{*}{#f/7}* Mals, $(name).\n* Acho que seu final feliz não será tão fácil."
                    ],
                    [
                        sleep
                            ? "<32>{#p/twinkly}{#f/19}* Após você dormir na casa da mamãe, ela saiu pra comprar comida."
                            : "<32>{#p/twinkly}{#f/19}* Após você voltar para a casa da mamãe, ela saiu para comprar comida.",
                        '<32>{#x1}* Mas... oh não!\n* Uma estrela falante apareceu e a torturou até a morte!',
                        "<32>* Senhor, isso foi ainda pior que o último final!",
                        '<32>{*}{#x2}* ...',
                        "<25>{*}{#f/6}* Nós não temos tempo para isso, $(name).\n* Volte para a luta."
                    ],
                    [
                        '<25>{*}{#p/twinkly}{#f/5}* Qual foi, $(name)...',
                        sleep
                            ? "<25>{*}{#f/7}* Você realmente pensa que eu vou te deixar fugir de mim TÃO facilmente?"
                            : "<25>{*}{#f/7}* Você realmente pensa que eu vou te deixar fugir de mim TÃO facilmente?"
                    ],
                    ['<25>{*}{#p/twinkly}{#f/6}* Podemos fazer isso o dia inteiro.'],
                    ['<25>{*}{#p/twinkly}{#f/8}* ...']
                ][Math.min(SAVE.flag.n.postnoot_exitfail++, 4)]
                : [
                    sleep
                        ? "<32>{#p/basic}* Após você dormir na casa de Toriel, ela destrói a ponto para o Outpost."
                        : "<32>{#p/basic}* Após você voltar para a casa de Toriel, ela destrói a ponte para o Outpost.",
                    ...(outlandsKills() > 10
                        ? [
                            "<32>* Tempo se passa, e Toriel descobre sobre os monstros que você matou.",
                            '<32>* Suas esperanças quebradas, e com nada a perder, ela...',
                            '<32>* ...',
                            '<32>* ... enquanto isso, os residentes restantes do Outpost esperam salvação...'
                        ]
                        : outlandsKills() > 5 || SAVE.data.n.bully_wastelands > 5
                            ? [
                                '<32>* Tempo passa e Toriel faz de tudo para cuidar bem de você.',
                                '<32>* Lendo livros, fazendo tortas...',
                                '<32>* Te colocando para dormir, todas as noites...',
                                ...(lateleave
                                    ? ['<32>* ... mesmo com o medo dela de você acabar querendo fugir.']
                                    : ["<32>* ... mesmo com aqueles que desapareceram."]),
                                '<32>* Com isso, os residentes do Outpost esperam a salvação...'
                            ]
                            : [
                                '<32>* Tempo passa e Toriel faz de tudo para cuidar bem de você.',
                                '<32>* Lendo livros, fazendo tortas...',
                                '<32>* Te colocando para dormir, todas as noites...',
                                ...(lateleave
                                    ? ['<32>* E te abraça tão carinhosamente que você jamais gostaria de fugir novamente.']
                                    : ['<32>* E todos os abraços que você sempre desejou.']),
                                '<32>* Com isso, os residentes do Outpost esperam a salvação...'
                            ]),
                    '<32>* ... de um humano que talvez nunca venha.',
                    '<32>* Este é realmente o final que você desejava?',
                    '<32>* Isto é realmente o que eles desejavam?'
                ],
        food: () => [
            ...(SAVE.data.n.state_wastelands_mash === 2
                ? [
                    '<25>{#p/toriel}{#f/1}* Desculpe pela demora...',
                    '<25>{#f/3}* Parece que um pequeno cachorro branco roubou a minha cozinha novamente.',
                    '<25>{#f/4}* Você tinha que ver o estado daquela torta.',
                    '<26>{#f/0}* Mas de toda forma.\n* Eu preparei um prato de lesmas fritas para você.'
                ]
                : ['<25>{#p/toriel}* Café da manhã está pronto!', '<26>* Eu preparei um prato de lesmas fritas para você.']),
            '<25>{#f/1}* Eu as deixei alí na mesa...'
        ],
        fridgetrap: {
            a: () =>
                SAVE.data.b.svr
                    ? []
                    : world.darker
                        ? ["<32>{#p/basic}* Você não gostaria do que tem na geladeira."]
                        : ['<32>{#p/basic}* Tem uma barra de chocolate de marca no freezer.'],
            b: () => [
                ...(SAVE.data.b.svr ? [] : ['<32>{#p/basic}* ...', '<32>* Você quer?']),
                choicer.create('* (Pegar a barra de chocolate?)', 'Sim', 'Não')
            ],
            b1: ['<32>{#p/human}* (Você decide não pegar.)'],
            b2: () => [
                '<32>{#p/human}* (Você pegou a barra de chocolate.)',
                ...(SAVE.data.b.svr ? ['<25>{#p/asriel1}{#f/17}* Ah... chocolate.', '<25>{#p/asriel1}{#f/13}* ...'] : [])
            ],
            c: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* (Mas não havia nada dentro para ser coletado.)',
                        ...[
                            [
                                '<25>{#p/asriel1}{#f/23}* Oh... $(name) SEMPRE bisbilhotando na geladeira.',
                                '<25>{#f/13}* Ele pensava, que se procurasse bem o suficiente...',
                                '<25>{#f/13}* Outra barra de chocolate iria simplesmente aparecer aí dentro.',
                                '<25>{#f/17}* ... que fofo.'
                            ],
                            ['<25>{#p/asriel1}{#f/20}* Isso foi antes do replicador de chocolate ser instalado.']
                        ][Math.min(asrielinter.fridgetrap_c++, 1)]
                    ]
                    : ['<32>{#p/basic}* A barra de chocolate já foi tomada.'],
            d: ["<32>{#p/human}* (Você está carregando muito.)"]
        },
        front1: [
            '<25>{#p/toriel}{#f/1}* ... e você quer tocar um dos seus sons?',
            '<25>{#f/0}* Certo, vou ver o que posso fazer.'
        ],
        front1x: ['<25>{#p/toriel}{#f/1}* ... alô?'],
        front2: () => [
            ...(world.postnoot
                ? [
                    '<25>{#p/toriel}{#f/2}* Já está de pé!?',
                    '<25>{#f/1}* Você não dormiu por muito tempo...',
                    '<25>{#f/5}* ...',
                    world.nootflags.has('toriel') // NO-TRANSLATE

                        ? '<25>{#f/1}* O sistema atmosférico parece ainda não ter sido concertado.'
                        : '<25>{#f/1}* O sistema atmosférico para estar com mal funcionamento.',
                    '<25>{#f/1}* Se você se sentir fraco, não hesite em voltar para a cama.',
                    '<26>{#f/0}* ... no mais.'
                ]
                : [
                    '<25>{#p/toriel}{#f/2}* Por quanto tempo você está parado aí!?',
                    '<25>{#f/5}* ...',
                    '<25>{#f/0}* Eu suponho que não importe.'
                ]),
            '<25>{#f/0}* Napstablook, um visitante, ofereceu-se para tocar música.',
            '<25>{#f/0}* E ele te convidou especificamente para estar no palco com ele!',
            '<25>{#f/1}* Você gostaria de visitar a sala de atividades para vê-lo?',
            ...(SAVE.data.n.state_wastelands_mash === 1
                ? [
                    '<25>{#f/3}* Oh, e, eu peço desculpas pelo estado da torta.',
                    '<25>{#f/4}* Parece que um pequeno cachorro branco invadiu minha cozinha de novo...'
                ]
                : 3 <= SAVE.data.n.cell_insult
                    ? [
                        '<25>{#f/5}* Oh, e, eu peço desculpas pelo estado da torta.',
                        '<25>{#f/9}* Eu tentei meu melhor para salva-la.'
                    ]
                    : []),
            choicer.create("* (Ver o show do Napstablook?)", 'Sim', 'Não')
        ],
        front2a: ['<25>{#p/toriel}{#f/0}* Maravilhoso!\n* Eu vou contar para ele que você vai.'],
        front2b: ['<25>{#p/toriel}{#f/5}* ...', '<25>{#p/toriel}{#f/5}* Eu estarei na sala se você precisar de mim.'],
        front3: () => [
            ...(world.postnoot
                ? [
                    '<25>{#p/toriel}{#f/0}* Oh, olá, pequeno.\n* Você acordou cedo.',
                    '<25>{#f/1}* Você tem certeza que dormiu o suficiente?',
                    '<25>{#f/5}* ...',
                    world.nootflags.has('toriel') // NO-TRANSLATE

                        ? '<25>{#f/1}* O sistema atmosférico parece ainda não ter sido concertado.'
                        : '<25>{#f/1}* O sistema atmosférico para estar com mal funcionamento.',
                    '<25>{#f/1}* Se você se sentir fraco, não hesite em voltar para a cama.',
                    '<26>{#f/0}* ... além disso...'
                ]
                : ['<25>{#p/toriel}* Bom dia, pequeno.']),
            ...(SAVE.data.n.state_wastelands_mash === 1
                ? [
                    '<25>{#f/3}* Parece que um pequeno cachorro branco roubou a minha cozinha novamente.',
                    '<25>{#f/4}* Você tinha que ver o estado daquela torta.',
                    '<25>{#f/0}* Ainda assim, eu fiz meu melhor para salva-la.'
                ]
                : ['<25>{#f/1}* As estrelas estão lindas hoje, não é mesmo?']),
            '<25>{#f/5}* ...',
            '<25>{#f/5}* Estarei na sala de estar se você precisar de mim.'
        ],
        front4: () => [
            ...(world.postnoot
                ? [
                    '<25>{#p/toriel}{#f/0}* Oh, olá, pequeno.\n* Você acordou cedo.',
                    '<25>{#f/1}* Você tem certeza que dormiu o suficiente?',
                    '<25>{#f/5}* ...',
                    world.nootflags.has('toriel') // NO-TRANSLATE

                        ? '<25>{#f/1}* O sistema atmosférico parece ainda não ter sido concertado.'
                        : '<25>{#f/1}* O sistema atmosférico para estar com mal funcionamento.',
                    '<25>{#f/1}* Se você se sentir fraco, não hesite em voltar para a cama.'
                ]
                : ['<25>{#p/toriel}* Bom dia, pequeno.']),
            '<25>{#f/5}* ...',
            ...(world.bullied
                ? [
                    '<25>* As Outlands estão excepcionalmente barulhentas hoje.',
                    '<25>* Parece que um bully tem causado medo ao redor...',
                    '<25>* É melhor não sair para tão longe.'
                ]
                : [
                    '<25>* As Outlands estão muito silenciosas hoje.',
                    '<25>* Eu tentei ligar para alguém hoje, mas...',
                    '<25>* Nada.'
                ]),
            ...(SAVE.data.n.state_wastelands_mash === 1
                ? [
                    world.bullied
                        ? '<26>{#f/3}* E outras novidades, um pequeno cachorro branco atacou minha cozinha de novo.'
                        : '<25>{#f/3}* Além do cachorrinho branco invadindo minha cozinha, é claro.',
                    '<25>{#f/4}* Você tinha que ver o estado daquela torta.',
                    '<25>{#f/0}* Ainda assim, eu fiz meu melhor para salva-la.',
                    '<25>{#f/1}* Espero que você goste...'
                ]
                : world.bullied || (16 <= outlandsKills() && SAVE.flag.n.genocide_twinkly < resetThreshold())
                    ? []
                    : ['<25>{#f/1}* É bem preocupante...']),
            '<25>{#f/0}* De toda forma, eu estarei na sala de estar se você precisar de mim.'
        ],
        goodbye1a: ['<25>{#p/toriel}{#f/10}* ...', '<25>{#f/20}{|}* Vem aqui- {%}'],
        goodbye1b: ['<25>{#p/toriel}{#f/9}* ...', '<25>{#f/19}{|}* Vem aqui- {%}'],
        goodbye2: [
            '<25>{#p/toriel}{#f/5}* Eu sinto muito pelo que tenho feito você passar, meu pequeno.',
            '<25>{#f/9}* Eu deveria saber que não posso te manter aqui para sempre.',
            '<25>{#f/5}* ... mas, se você precisar de alguém para conversar...',
            '<25>{#f/1}* Sinta-se livre para me ligar sempre que quiser.',
            '<25>{#f/0}* Com tanto que meu celular consiga alcançar, eu irei atender.'
        ],
        goodbye3: [
            '<25>{#p/toriel}{#f/5}* Eu sinto muito pelo que tenho feito você passar, meu pequeno.',
            '<25>{#f/9}* Eu deveria saber que não posso te manter aqui para sempre.',
            '<25>{#f/10}* ...',
            '<25>{#f/14}* Seja bom, tudo bem?'
        ],
        goodbye4: ['<25>{#p/toriel}{#f/1}* Seja bom, tudo bem?'],
        goodbye5a: [
            '<25>{#p/toriel}{#f/5}* ... hmm?\n* Você mudou de ideia?',
            '<25>{#f/9}* ...',
            '<25>{#f/10}* Talvez você realmente seja diferente dos outros.',
            '<25>{#f/0}* ... que bom.',
            '<25>{#f/0}* Eu vou terminar aqui e te encontro novamente em casa.',
            '<25>{#f/0}* Obrigado por me ouvir, minha criança.',
            '<25>{#f/0}* Significa muito para mim.'
        ],
        goodbye5b: [
            '<25>{#p/toriel}{#f/5}* ... hmm?\n* Você mudou de ideia?',
            '<25>{#f/10}* ...\n* Me desculpe, minha criança.',
            '<25>{#f/9}* Eu perdi minha sanidade por um momento.',
            '<25>{#f/0}* ... não se preocupe.',
            '<25>{#f/0}* Eu vou terminar aqui e te encontro novamente em casa.',
            '<25>{#f/0}* Obrigado por me ouvir, minha criança.',
            '<25>{#f/0}* Significa muito para mim.'
        ],
        halo: {
            a: () => ['<32>{#p/human}* (Você pegou o Halo.)', choicer.create('* (Equipar o Halo?)', 'Sim', 'Não')],
            b: ["<32>{#p/human}* (Você está carregando muito pra levar isso.)"]
        },
        indie1: () => [
            ...([1, 5].includes(SAVE.data.n.state_wastelands_dummy) && SAVE.data.b.w_state_riddleskip
                ? [
                    '<25>{#p/toriel}{#f/5}* Te ensinar até o momento tem sido difícil, mas...',
                    '<25>{#f/5}* Talvez esse vídeo vá ajudar.'
                ]
                : ['<26>{#p/toriel}* Certo.\n* É hora da sua terceira e última lição.']),
            '<25>{#f/1}* Você acha que consegue chegar ao final desta sala...',
            '<25>{#f/1}* ... por conta própria?',
            choicer.create('* (O que você diz?)', 'Sim', 'Não')
        ],
        indie1a: () => [
            '<25>{#p/toriel}{#f/1}* Você tem certeza...?',
            '<25>{#f/0}* É apenas uma pequena distância.',
            choicer.create('* (Mudar de ideia?)', 'Sim', 'Não')
        ],
        indie1b: () => [
            '<25>{#p/toriel}{#f/5}* Minha criança.',
            '<25>{#f/1}* É importante fazer coisas por conta própria, não é?',
            '<32>{#p/basic}* Se você recusar-se a mudar de ideia, Toriel te levará para casa.',
            choicer.create('* (Mudar de ideia?)', 'Sim', 'Não')
        ],
        indie2a: ['<25>{#p/toriel}{#f/1}* Tudo bem...', '<25>{#f/0}* Boa sorte!'],
        indie2b: ['<25>{#p/toriel}{#f/5}* ...', '<25>{#f/9}* ... Eu entendo.'],
        indie2b1: [
            '<25>{#p/toriel}{#f/10}* Não tenha medo, minha criança.',
            '<25>{#f/1}* Se você realmente não quer sair do meu lado...',
            '<25>{#f/0}* Eu irei te levar pelas salas restantes das Outlands.',
            '<25>{#f/5}* ...',
            '<25>{#f/5}* Pegue minha mão, pequeno...',
            '<25>{#f/5}* É hora de ir para casa.'
        ],
        indie2f: ['<32>{#p/human}{#s/equip}* (Você pegou o celular.)'],
        indie3a: ['<25>{#p/toriel}* Você conseguiu!'],
        indie3b: [
            '<25>{#p/toriel}{#f/3}* Minha criança, por qual motivo você demorou tanto!?',
            '<25>{#f/4}* Você se perdeu?',
            '<25>{#f/1}* ...\n* Você parece bem...'
        ],
        indie4: () => [
            ...([1, 5].includes(SAVE.data.n.state_wastelands_dummy) && SAVE.data.b.w_state_riddleskip
                ? [
                    '<25>{#f/0}* Eu devo admitir, estou surpresa que você tenha vindo até o fim.',
                    '<25>{#f/3}* Seu comportamento até o momento que me feito questionar...',
                    '<25>{#f/4}* ... você tem tentando brincar com minha cara esse tempo todo?',
                    '<25>{#f/23}* Para ser franco, não tenho tempo para uma tamanha inutilidade.'
                ]
                : [
                    '<25>{#p/toriel}{#f/0}* Não se preocupe.\n* Você nunca esteve em perigo de verdade.',
                    '<25>{#f/0}* Este foi meramente um teste da sua independência.',
                    '<25>{#f/1}* Na verdade, minha criança...'
                ]),
            '<25>{#f/5}* Tem coisas das quais eu preciso resolver.',
            '<25>{#f/0}* Enquanto eu estou fora, espero que você se comportar bem.',
            '<25>{#f/1}* Existem desafios a frente que necessitam ser explicados...',
            '<25>{#f/0}* Sair por aí sozinho te trará perigos.',
            '<25>{#f/10}* Aqui.\n* Pegue esse celular.',
            '<32>{#p/human}{#s/equip}* (Você pegou o celular.)',
            ...([1, 5].includes(SAVE.data.n.state_wastelands_dummy) && SAVE.data.b.w_state_riddleskip
                ? [
                    '<25>{#p/toriel}{#f/1}* Se você precisar de qualquer coisa enquanto estou fora, por favor...',
                    '<25>{#f/0}* Não hesite em ligar-me.',
                    '<25>{#f/5}* ...',
                    '<26>{#f/23}* E fique longe de confusão.'
                ]
                : [
                    '<25>{#p/toriel}{#f/1}* Se você precisar de qualquer coisa enquanto estou fora, por favor...',
                    '<25>{#f/0}* Não hesite em ligar-me.',
                    '<25>{#f/5}* ...',
                    '<25>{#f/1}* Seja bom, tudo bem?'
                ])
        ],
        indie5: [
            [
                '<32>{#s/phone}{#p/event}* Ring, ring...',
                '<25>{#p/toriel}* Olá!\n* Aqui é a Toriel.',
                '<25>* Meus afazeres estão demorando mais do que eu pensava.',
                '<25>* Preciso de você espere um pouco mais.',
                '<25>{#f/1}* Obrigado pela paciência, minha criança...',
                '<25>{#f/0}* Você é muito bom.'
            ],
            [
                '<32>{#s/phone}{#p/event}* Ring, ring...',
                '<25>{#p/toriel}* Olá...\n* Aqui é a Toriel.',
                '<25>{#f/1}* Eu encontrei o que estava procurando...',
                '<25>{#f/0}* Mas um pequeno cachorrinho branco pegou!\n* Que coisa.',
                '<25>{#f/1}* Os cães gostam de farinha?',
                '<25>{#f/0}* Err, essa é uma pergunta desnecessária, claro.',
                '<25>* Vai demorar um pouco mais para meu retorno.',
                '<25>{#f/1}* Obrigado novamente por ser tão paciente...'
            ],
            [
                '<32>{#s/phone}{#p/event}* Ring, ring...',
                '<32>{#p/basic}* (...)',
                '<32>{#p/human}* (Você ouve uma respiração ofegante pesada do outro lado da linha.)',
                '<32>{#s/bark}{#p/event}* Bark!\n{#s/bark}* Bark!',
                '<32>{#p/human}* (Você escuta uma voz na distância.)',
                '<25>{#p/toriel}{#f/2}* Pare, por favor!',
                '<32>{#s/bark}{#p/event}* Bark!\n{#s/bark}* Bark!',
                '<25>{#p/toriel}{#f/1}* Volte aqui com meu telefone!'
            ],
            [
                '<32>{#s/phone}{#p/event}* Ring, ring...',
                '<32>{#p/basic}* (...)',
                '<32>{#p/human}* (Parece que um pequeno, cachorro branco está dormindo no telefone.)',
                '<32>{#p/basic}* (Ronco... ronco...)',
                '<32>{#p/human}* (Você escuta uma voz na distância.)',
                '<25>{#p/toriel}{#f/1}* Oláááá?\n* Pequeno cachorro...?',
                '<25>{#f/1}* Onde está vooocê?',
                '<25>{#f/0}* Eu vou lhe dar um belo cafuné na cabeça!',
                '<32>{#p/human}* (O ronco para.)',
                '<25>{#p/toriel}* ... se você trazer meu celular.',
                '<32>{#p/human}* (O cachorro levanta.)'
            ],
            [
                '<32>{#s/phone}{#p/event}* Ring, ring...',
                '<32>{#p/basic}* (...)',
                '<32>{#p/basic}* (Achoo!)',
                '<32>{#p/human}* (Parece que o cachorrinho voltou a dormir em cima do telefone.)',
                '<25>* (Você escuta uma voz na distância.)',
                '<25>{#p/toriel}{#f/1}* Aha!\n* Eu escutei aquilo, seu pequeno cachorrinho branco...',
                '<25>{#f/6}* Agora eu vou te encontrar!',
                '<32>{#p/human}* (O ronco para.)\n* (O cachorro parece estar correndo atrás de algo.)',
                '<25>{#p/toriel}{#f/8}* Hee hee, não tem escapatória!'
            ],
            [
                '<32>{#s/phone}{#p/event}* Ring, ring...',
                '<32>{#p/human}* (Você escuta uma voz na distância.)',
                '<25>{#p/toriel}{#f/1}* Olá...\n* Aqui é... Toriel...',
                '<32>{#s/bark}{#p/event}* Bark!\n* Bark!',
                '<25>{#p/toriel}{#f/2}* Não, cachorro malvado!',
                '<32>{#p/basic}* (Choraminga... choraminga...)',
                '­<25>{#p/toriel}* Pronto, pronto...\n* Eu vou encontrar outro celular pra você.',
                '<25>{#f/1}* Tudo bem?',
                '<32>{#p/basic}* (...)',
                '<32>{#s/bark}{#p/event}* Bark!',
                '<25>{#p/toriel}* Feliz em ouvir.',
                '<32>{#p/human}* (É possível ouvir o cachorro se distanciando.)',
                '<25>{#p/toriel}* Por favor, me desculpe por toda essa bagunça.',
                '<25>{#f/1}* Eu estarei aí para te buscar logo, logo...'
            ]
        ],
        indie6: (early: boolean) => [
            '<32>{#s/phone}{#p/event}* Ring, ring...',
            ...([1, 5].includes(SAVE.data.n.state_wastelands_dummy) && SAVE.data.b.w_state_riddleskip
                ? [
                    early
                        ? '<25>{#p/toriel}{#g/torielTired}* ... já?'
                        : '<25>{#p/toriel}{#g/torielTired}* ... sem paciência?',
                    '<25>{#f/9}* Eu não deveria me surpreender.',
                    '<25>{#f/5}* Apenas lembre-se que a muitos perigos pela frente...',
                    '<25>{#f/1}* Seria uma pena ver você ferido.'
                ]
                : [
                    '<25>{#p/toriel}* Olá?\n* Aqui é a Toriel.',
                    '<25>{#f/1}* Você não saiu da sala, saiu?',
                    '<25>{#f/0}* Existem muitos perigos a frente, eu não quero ver você se machucar.',
                    '<25>{#f/1}* Tome cuidado, tudo bem?'
                ])
        ],
        indie7: ['<32>{#p/basic}* Alguns minutos depois...'],
        indie8: [
            '<25>{#p/toriel}* Eu voltei!',
            '<25>* Sua paciência até agora tem sido louvável.\n* Até eu estou impressionada!',
            '<25>{#f/0}* De toda forma.\n* É hora de te levar para casa.',
            '<25>{#f/1}* Por favor, permita-me.'
        ],
        lobby_puzzle1: [
            '<25>{#p/toriel}{#f/0}* Seja bem vindo ao nosso lindo Outpost, pequeno.',
            '<25>{#f/0}* Existem muitas lições das quais eu desejo te ensinar.',
            '<25>{#f/1}* Primeiro e mais importante...',
            '<25>{#f/0}* Quebra-cabeças!',
            '<25>{#f/0}* Deixe me demonstrar esse pequeno exemplo.'
        ],
        lobby_puzzle2: [
            '<25>{#p/toriel}{#f/1}* Pode parecer estranho para ti agora, mas engenhocas assim são muito comuns no Outpost...',
            '<25>{#f/0}* Resolver quebra-cabeça faz parte da nossa rotina diária.',
            '<25>{#f/0}* Com um tempo, e um pouco de guia, você vai acostumar-se com eles.'
        ],
        lobby_puzzle3: ['<25>{#p/toriel}* Quando você estiver pronto, prosseguiremos.'],
        loox: {
            a: [
                "<32>{#p/basic}{#n1}* Eu escutei que você é bem flertador para um humano.",
                "<32>* Quando você {@fill=#cf7fff}FLERTA{@fill=#fff} com diferentes tipos de monstros, você verá corações próximos a seus nomes.",
                "<32>* Quanto mais monstros você {@fill=#cf7fff}FLERTA{@fill=#fff}, mais corações você vai ter.",
                '<32>* Me pergunto...',
                '<32>* O quão longe você pode chegar?',
                '<32>* Talvez, meu amigo, você possa se tornar... uma lenda.'
            ],
            b: [
                '<32>{#p/basic}{#n1}* Ei humano, você já tentou flertar?',
                "<32>* Ha!\n* Eu consigo ver pela expressão no seu rosto que você ainda não tentou.",
                "<32>* Eu vou te dizer, é muito divertido.",
                "<32>* Os inimigos nem vão saber onde enfiar o rosto!",
                '<32>* Psst... se você começar a flertar, talvez eu tenha mais para te contar.',
                '<32>* Boa sorte com isso!'
            ],
            c: [
                "<32>{#p/basic}{#n1}* Ei humano, agora que você começou a flertar...",
                '<32>* Como é o sentimento?',
                "<32>* É bem legal, né?",
                "<32>* Quando você {@fill=#cf7fff}FLERTA{@fill=#fff} com diferentes tipos de monstros, você verá corações próximos a seus nomes.",
                "<32>* Quanto mais monstros você {@fill=#cf7fff}FLERTA{@fill=#fff}, mais corações você vai ter.",
                '<32>* Me pergunto...',
                '<32>* O quão longe você pode chegar?',
                '<32>* Talvez, meu amigo, você possa se tornar... uma lenda.'
            ],
            d: [
                "<32>{#p/basic}{#n1}* Eu escutei que você é algum tipo de Bully por estas partes.",
                '<32>* Ha!\n* Seja bem vindo ao clube, bacana.',
                "<32>* Você está falando com o bully número um da área.",
                "<32>* Como um {@fill=#3f00ff}BULLY{@fill=#fff} em diferentes tipos de monstros, você vai ver uma espada ao lado de seus nomes.",
                "<32>* Quanto mais monstros você faz {@fill=#3f00ff}BULLY{@fill=#fff}, mais espadas você terá.",
                '<32>* Porém, só para você saber, nem todos os monstros podem ser amedrontados.',
                "<32>* É como flertar... mas com a morte.",
                '<32>* Legal, certo?'
            ],
            e: pager.create(
                0,
                () => [
                    ...(30 <= SAVE.data.n.bully
                        ? [
                            "<32>{#p/basic}{#n1}* Eu escutei que você tem sido um belo bully nesta área.",
                            "<32>* Todo mundo está com medo de você, hein?"
                        ]
                        : 20 <= world.flirt
                            ? [
                                "<32>{#p/basic}{#n1}* Escutei que você é o tipo romântico por aqui.",
                                '<32>* Todo mundo te ama, hein?'
                            ]
                            : [
                                "<32>{#p/basic}{#n1}* Eu escutei que você é tipo um herói por essas áreas.",
                                '<32>* Todo mundo gosta de você, hein?'
                            ]),
                    '<32>* Olha... pessoalmente, eu acho que você tem muito tempo livre.'
                ],
                ['<32>{#p/basic}{#n1}* O que?\n* Vai dizer que estou errado?']
            )
        },
        manana: {
            a: pager.create(
                0,
                () =>
                    SAVE.data.b.napsta_performance
                        ? [
                            "<32>{#p/basic}{#n1}* Então, você foi o co-host do show de música, né?",
                            "<32>* Talvez agora você tenha os modos para aceitar minha oferta.",
                            "<32>* Eu apenas estou procurando por alguém que queira comprar este quadrinho limitado do Super Starwalker.",
                            "<32>* Eu gostei daquele show, então você tem um desconto.\n* 5G, pegar ou largar.",
                            choicer.create('{#n1!}* (Comprar o Super Starwalker 1 por 5G?)', 'Sim', 'Não')
                        ]
                        : [
                            ...(world.postnoot
                                ? [
                                    "<32>{#p/basic}{#n1}* Ei, você percebeu que tem algo estranho acontecendo por aí?",
                                    "<32>* Eu poderia jurar que os quebra-cabeças foram desativados sozinhos mais cedo.",
                                    "<32>* Bem, eu estou procurando algum comprador para esta edição limitada do Super Starwalker."
                                ]
                                : [
                                    '<32>{#p/basic}{#n1}* Finalmente, alguém falou comigo!',
                                    "<32>* Eu estou parado aqui faz anos e ninguém aceitou minha oferta.",
                                    "<32>* Eu apenas estou procurando por alguém que queira comprar este quadrinho limitado do Super Starwalker."
                                ]),
                            "<32>* Interessado?\n* Tudo que eu peço são 10G.",
                            choicer.create('{#n1!}* (Comprar o Super Starwalker 1 por 10G?)', 'Sim', 'Não')
                        ],
                () =>
                    SAVE.data.b.napsta_performance
                        ? [
                            "<32>{#p/basic}{#n1}* Interessado em comprar minha edição limitada do Super Starwalker?",
                            "<32>* Tudo que eu peço são 5G.",
                            choicer.create('{#n1!}* (Comprar o Super Starwalker 1 por 5G?)', 'Sim', 'Não')
                        ]
                        : [
                            "<32>{#p/basic}{#n1}* Interessado em comprar minha edição limitada do Super Starwalker?",
                            "<32>* Tudo que eu peço são 10G.",
                            choicer.create('{#n1!}* (Comprar o Super Starwalker 1 por 10G?)', 'Sim', 'Não')
                        ]
            ),
            b: () => [
                "<32>{#p/human}{#n1!}* (Você não tem G suficiente.)",
                SAVE.data.b.napsta_performance
                    ? "<32>{#p/basic}{#n1}* Eu vou ser sincero, isso não parece 5G..."
                    : "<32>{#p/basic}{#n1}* Eu vou ser sincero, isso não parece 10G..."
            ],
            c: ['<32>{#p/basic}{#n1}* Sem interesse, huh?', "<32>* Tá tudo bem.\n* Eu vou só encontrar outro comprador."],
            d: [
                '<32>{#s/equip}{#p/human}{#n1!}* (Você obteve Super Starwalker 1.)',
                '<32>{#p/basic}{#n1}* Incrível!\n* Faça proveito do quadrinho.'
            ],
            e: ['<32>{#p/basic}{#n1}* Voltou, huh?', "<32>* Desculpa, eu não tenho mais nada para vender."],
            f: [
                "<32>{#p/human}{#n1!}* (Você está carregando muito.)",
                "<32>{#p/basic}{#n1}* Esses seus bolsos parecem meio cheios..."
            ],
            g: [
                "<32>{#p/basic}{#n1}* Eu ouvi dizer que eles estão refazendo a franquia das comics...",
                '<32>* O personagem principal é alguma cobra com óculos de sol ou algo do tipo.',
                "<32>* Se eu estivesse no comando, provavelmente faria um spinoff...",
                '<32>* Do Gumbert, provavelmente?'
            ],
            h: [
                "<32>{#p/basic}{#n1}* Talvez agora que estamos todos livres, eles vão chegar a fazer aquele tal reinício na história.",
                "<32>* Como era chamado?\n* Ah, nesse ponto eu já esqueci..."
            ]
        },
        mananaX: () =>
            [
                [
                    '<32>{#p/basic}{#n1}* Agora, o que era AQUELA raquete?',
                    "<32>{#p/basic}{#n1}* Er, desculpa, meus olhos não são mais o que eram antes..."
                ],
                ['<32>{#p/basic}{#n1}* Huh?\n* Aconteceu de novo?\n* Tch, crianças esses dias...'],
                ['<32>{#p/basic}{#n1}* Crianças esses dias...']
            ][Math.min(roomKills().w_puzzle4++, 2)],
        mananaY: [
            '<32>{#p/basic}{#n1}* Huh?\n* Esse é meu quadrinho do Super Starwalker?',
            "<32>{#p/basic}{#n1}* ... e eu aqui pensando que tinha me livrado disso."
        ],
        afrogX: (k: number) =>
            [
                ["<32>{#p/basic}{#n1}* Se... se você fizer aquilo de novo... eu vou-vou ser obrigado a te parar!"],
                ['<32>{#p/basic}{#n1}* N-não...\n* Não de-de novo...']
            ][k],
        patron: {
            a: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? 6 <= world.population
                            ? [
                                "<32>{#p/basic}{#n1}* Eu estou triste.\n* Eles pegaram a mesa do DJ para usar em outro show mais tarde.",
                                '<32>* ... Huh, talvez isso vá ser da hora.'
                            ]
                            : [
                                "<32>{#p/basic}{#n1}* Eu estou triste.\n* O bully que passou aqui mais cedo...",
                                '<32>* ... era você.',
                                '<32>* Você nos salvou no fim, mas porque tanta violência durante o caminho?'
                            ]
                        : SAVE.data.b.napsta_performance
                            ? [
                                "<32>{#p/basic}{#n1}* Eu estou triste.\n* Os músicos hoje em dia se cobram demais.",
                                '<32>* Pessoalmente, eu amo os tons usados hoje em dia.',
                                "<32>* É triste que provavelmente não teremos mais a oportunidade de ouvir aqui.",
                                '<32>{#n1!}{#n2}* Pelo menos você ainda tem bife para lhe fazer companhia, certo? ;)',
                                '<32>{#n2!}{#n1}* ... não isso de novo.'
                            ]
                            : [
                                "<32>{#p/basic}{#n1}* Eu estou triste.\n* A comida hoje em dia tá cada vez pior...",
                                '<32>* Me foi prometido algo de \"verdade\", mas eu só ganhei uma cópia barata.',
                                '<32>{#n1!}{#n2}* Hey! ;)\n* Para de falar mal dos meus produtos na frente dos clientes! ;)',
                                '<32>* Aliás, e se o seu gosto para comida for muito exigente ;)',
                                '<32>{#n2!}{#n1}* ... típico.'
                            ],
                () => [
                    SAVE.data.n.plot === 72 && 6 <= world.population
                        ? "<32>{#p/basic}{#n1}* ... Não é basicamente o que é?"
                        : '<32>{#p/basic}{#n1}* ... é basicamente o que é.'
                ]
            )
        },
        pie: () =>
            3 <= SAVE.data.n.cell_insult
                ? ['<32>{#p/human}* (Você pegou a Torta Queimada.)']
                : SAVE.data.n.state_wastelands_mash === 1
                    ? ['<32>{#p/human}* (Você pegou a Sopa de Torta.)']
                    : SAVE.data.b.snail_pie
                        ? ['<32>{#p/human}* (Você pegou a Torta de Lesma.']
                        : ['<32>{#p/human}* (Você pegou a Torta de Caramelo.)'],
        plot_call: {
            a: () => [
                '<32>{#p/event}* Ring, ring...',
                3 <= SAVE.data.n.cell_insult
                    ? '<25>{#p/toriel}* Olá, criança.'
                    : '<25>{#p/toriel}* Olá?\n* Aqui é a Toriel.',
                '<25>{#f/1}* Sem razão em particular...',
                '<25>{#f/0}* Você prefere canela ou caramelo?',
                choicer.create('* (Qual você prefere?)', 'Canela', 'Caramelo'),
                3 <= SAVE.data.n.cell_insult
                    ? '<25>{#p/toriel}{#f/0}* Certo.'
                    : '<25>{#p/toriel}* Oh, certo!\n* Muito obrigado!'
            ],
            b: () => [
                '<32>{#p/event}* Ring, ring...',
                3 <= SAVE.data.n.cell_insult
                    ? '<25>{#p/toriel}* Olá, criança.'
                    : '<25>{#p/toriel}* Olá?\n* Aqui é a Toriel.',
                [
                    '<25>{#f/1}* Você não desgosta de caramelo, certo?',
                    '<25>{#f/1}* Você não desgosta de canela, certo?'
                ][SAVE.data.n.choice_flavor],
                '<25>{#f/1}* Eu sei sua preferência, mas...',
                '<25>{#f/1}* Você ficaria satisfeito se encontrasse isso no seu prato?',
                choicer.create('* (O que você diz?)', 'Sim', 'Não')
            ],
            b1: () => [
                3 <= SAVE.data.n.cell_insult
                    ? '<25>{#p/toriel}{#f/0}* Entendo.'
                    : '<25>{#p/toriel}* Claro, claro, é óbvio.',
                '<25>{#f/1}* Cuide-se.'
            ],
            b2: () => [
                '<25>{#p/toriel}{#f/5}* ...',
                '<25>{#f/0}* Bem então.',
                '<25>{#f/1}* ...',
                3 <= SAVE.data.n.cell_insult
                    ? '<25>{#f/0}* Eu vou ver o que posso fazer.'
                    : '<25>{#f/0}* Eu irei te ligar mais tarde, minha criança.'
            ],
            c: [
                '<32>{#p/event}* Ring, ring...',
                '<25>{#p/toriel}{#f/1}* Você não tem alergias, tem?',
                '<25>{#f/5}* ...',
                '<25>{#f/5}* Suponho que humanos nem possam ter alergia a comida de monstro.',
                '<25>{#f/0}* Hee hee.\n* Esqueça que eu perguntei!'
            ],
            d: [
                '<32>{#p/event}* Ring, ring...',
                '<25>{#p/toriel}{#f/1}* Olá, pequeno.',
                '<25>{#f/0}* Eu percebi a pouco que faz tempo desde que eu limpei aqui.',
                '<25>{#f/1}* Provavelmente a várias coisas espalhadas por aí...',
                '<25>{#f/0}* Você pode pegar as que gostar, mas não carregue muito.',
                '<25>{#f/1}* Vai que você acaba encontrando algo que realmente gosta?',
                '<25>{#f/0}* Você vai querer ter espaço nos bolsos para levar.'
            ]
        },
        puzzle1A: () =>
            SAVE.data.b.svr
                ? ['<32>{#p/human}* (A alavanca parece estar presa.)']
                : ['<32>{#p/basic}* A alavanca está emperrada.'],
        puzzle3A: () =>
            SAVE.data.b.svr
                ? ['<32>{#p/human}* (A alavanca parece estar presa.)']
                : ['<32>{#p/basic}* A alavanca está emperrada.'],
        return1: () => [
            SAVE.data.n.cell_insult < 3
                ? '<25>{#p/toriel}{#f/1}* Minha criança, como você chegou aqui!?'
                : '<25>{#p/toriel}{#f/1}* Ah... aí esta você.',
            '<25>* Você está bem?'
        ],
        return2a: () =>
            SAVE.data.n.cell_insult < 3
                ? ['<25>{#p/toriel}* Nem um arranhão!\n* Impressionante.']
                : ['<25>{#p/toriel}{#f/10}* Nem um arranhão...\n* Que ótimo.'],
        return2b: () =>
            SAVE.data.n.cell_insult < 3
                ? ['<25>{#p/toriel}{#f/4}* Você parece ferido...', '<25>{#f/10}* Aqui, aqui, eu te curo.']
                : ['<25>{#p/toriel}{#f/9}* Você se machucou.', '<25>{#f/10}* Por favor, deixa-me curar suas feridas.'],
        return2c: [
            '<25>{#p/toriel}{#f/3}* ...',
            '<25>{#f/11}* Quem fez isso contigo?\n* Alguém vai responder por essas ações.'
        ],
        return3: () => [
            '<25>{#p/toriel}* Me desculpe, jovenzinho.\n* Foi tolo da minha parte te deixar sozinho.',
            ...(world.postnoot
                ? [
                    '<25>{#f/1}* ... é só eu, ou parece que tem algo de errado na atmosfera?',
                    '<25>{#f/5}* Talvez o sistema que provê gravidade está com mal funcionamento.',
                    '<25>{#f/5}* ...',
                    '<25>{#f/0}* Não a preocupação.\n* Tenho certeza que será resolvido logo.'
                ]
                : []),
            '<25>{#f/1}* Venha!\n* Eu tenho uma surpresa para você.'
        ],
        return4: () => [
            '<25>{#p/toriel}* Seja bem vindo ao meu lar!',
            ...(3 <= SAVE.data.n.cell_insult
                ? [
                    '<25>{#f/1}* Consegue sentir...',
                    '<25>{#p/toriel}{#f/2}* ... oh, esqueci de verificar o forno!',
                    '<25>{#p/toriel}{#f/5}* Eu estive tão ocupada com seus comportamentos anteriores...',
                    '<25>{#p/toriel}{#f/1}* Eu preciso cuidar disso agora, por favor, não saia daí!'
                ]
                : [
                    '<25>{#f/1}* Consegue sentir?',
                    ...(SAVE.data.b.snail_pie
                        ? ['<25>{#f/0}* Surpresa!\n* É uma torta de lesma caseira.']
                        : [
                            '<25>{#f/0}* Surpresa!\n* É uma torta de canela com caramelo.',
                            '<25>{#f/0}* Eu pensei que você iria preferir isso invés da torta de lesma para hoje a noite.'
                        ]),
                    '<25>{#f/1}* Agora, faz tempo desde que eu cuidei de alguém...',
                    '<25>{#f/0}* Mas eu ainda desejo que você tenha um ótimo tempo vivendo aqui.',
                    '<25>{#f/0}* Siga-me!\n* Eu tenho outra surpresa para você.'
                ])
        ],
        return5: [
            "<25>{#p/toriel}* Olha só!\n* Um quarto apenas para você.",
            '<25>{#f/1}* Espero que você goste...'
        ],
        return6: [
            '<25>{#p/toriel}{#f/1}* Bem, eu preciso ir olhar a torta.',
            '<25>{#f/0}* Por favor, sinta-se em casa.'
        ],
        runaway1: [
            ['<25>{#p/toriel}{#f/1}* Não seria melhor brincar em casa?', '<25>{#f/0}* Venha.'],
            ['<25>{#p/toriel}{#f/9}* Minha criança, é perigoso brincar aqui fora.', '<25>{#f/5}* Confie em mim.'],
            ['<26>{#p/toriel}{#f/5}* A gravidade aqui é baixa, você voaria para longe.'],
            ['<25>{#p/toriel}{#f/5}* O sistema atmosférico é fraco aqui.\n* Você vai sufocar.'],
            ['<25>{#p/toriel}{#f/23}* Não tem nada para você ver aqui.'],
            ['<25>{#p/toriel}{#f/1}* Você gostaria de ler um livro comigo?'],
            ['<25>{#p/toriel}{#f/1}* Porque você não dá uma olhada nas outras salas das Outlands?'],
            ['<25>{#p/toriel}{#f/5}* Não vou permitir que você se coloque em perigo.'],
            ['<25>{#p/toriel}{#f/3}* Você quer que eu faça isso o dia inteiro?'],
            ['<25>{#p/toriel}{#f/4}* ...'],
            ['<25>{#p/toriel}{#f/17}* ...', '<25>{#f/15}* Eu não estou gostando desse joguinho.'],
            ['<25>{#p/toriel}{#f/17}* ...']
        ],
        runaway2: [
            '<25>{#p/toriel}{#f/1}* Por favor, volte para casa, pequeno...',
            '<25>{#f/0}* Eu tenho algo para te mostrar!'
        ],
        runaway3: [
            '<25>{#p/toriel}{#f/2}* Criança, não!\n* Não é seguro ficar aqui!',
            '<25>{#f/0}* Venha. Eu terminei de fazer o café da manhã.'
        ],
        runaway4: ['<25>{#p/toriel}{#f/2}* Criança!\n* O que você está fazendo!'],
        runaway5: [
            '<25>{#p/toriel}{#f/1}* Você não entende o que aconteceria se você saísse daqui?',
            '<25>{#f/5}* Eu... eu peço desculpas por não ter prestado tanta atenção em você...',
            '<25>{#f/9}* Se eu tivesse, talvez você não tivesse fugido...'
        ],
        runaway6: [
            '<25>{#g/torielStraightUp}* Devo admitir... Tenho medo de sair daqui eu mesma.',
            '<25>{#f/9}* A muitas perigos a frente que colocariam nós dois em perigo.',
            '<25>{#g/torielSincere}* Eu quero te proteger deles, mas...',
            '<25>{#g/torielStraightUp}* Se eu te seguir para fora daqui, eu te colocaria em ainda mais perigo.',
            '<25>{#f/9}* Minha presença seria vista como ameaça.'
        ],
        runaway7: [
            '<25>{#p/toriel}{#f/5}* Por favor...',
            '<25>{#f/1}* Volte comigo e eu prometo que cuidarei de você.',
            '<25>{#f/5}* Eu farei tudo que você pedir, tudo bem?',
            '<25>{#f/18}* Por favor... não me deixe como as outras...'
        ],
        runaway7a: [
            '<25>{#p/toriel}{#f/18}* ...',
            '<25>{#g/torielCompassionSmile}* Aqui, aqui, minha criança.\n* Tudo ficará bem.',
            '<25>{#f/1}* Volte para casa e eu vou me juntar a você logo.',
            '<25>{#f/5}* Existe algo que eu preciso fazer aqui.'
        ],
        runaway7b: [
            '<25>{#p/toriel}{#f/21}* Patético...',
            '<25>* Eu não consigo...\n* Nem mesmo proteger uma única criança humana...',
            '<32>{#p/human}* (Você escuta passos caminhando para a distância.)'
        ],
        silencio: {
            a: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            '<32>{#p/basic}{#n1}* Olá.\n* É bom ver você de novo.',
                            "<32>* Decidi revisitar este meu antigo reduto...",
                            "<32>* É bem quieto aqui.\n* Igual eu.",
                            "<32>* Ah é, e eu deixei de trabalhar no CORE.",
                            '<32>* Sabe, quando eu entrei no time de engenheiros...',
                            "<32>* Eu não sabia que seria chamado para o serviço de guarda improvisado.",
                            '<32>* ... Parece que o engano da variedade corporativa está além da minha previsão.'
                        ]
                        : SAVE.data.b.napsta_performance
                            ? [
                                '<32>{#p/basic}{#n1}* Opa, eai.\n* Foi legal te ver no show.',
                                "<32>* Meu nome é Silencio... mas eu tenho certeza que você já ouviu falar de mim.",
                                '<32>* Todo mundo ao redor sabe meu nome, até mesmo aquele DJ.',
                                '<32>* Uma vez eu fiz minha própria performance musical aqui.',
                                '\"<32>* \"Silencio, A Grande Fuga,\" é como é chamado.',
                                '<32>* Quando o show acabou, eu sumi antes mesmo da plateia conseguir soltar a respiração.'
                            ]
                            : [
                                '<32>{#p/basic}{#n1}* Opa, olá.\n* Prazer em te conhecer.',
                                "<32>* Meu nome é Silencio... bem, pelo menos é assim que me chamam.",
                                '<32>* Quer saber o motivo?',
                                "<32>* Eu sou basicamente um ninja do espaço, mais silencioso do que as estrelas mais silenciosas.",
                                '<32>* Eu consigo fugir de qualquer perigo, sem exceção.',
                                "<32>* Não acredita em mim?\n* Tente alguma gracinha e veja o quão rápido eu fujo."
                            ],
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#n1}* Ah, sim, acho que agora estou livre para sair da galáxia.",
                            "<32>* ... mas talvez eu fique por aí."
                        ]
                        : SAVE.data.b.napsta_performance
                            ? [
                                '<32>{#p/basic}{#n1}* Você pode até dizer, essa minha performance...',
                                '<32>* Foi de \"tirar o fôlego.\"'
                            ]
                            : [
                                '<32>{#p/basic}{#n1}* Tá conversando comigo ainda pra quê?',
                                "<32>* Eu já disse tudo que tinha pra dizer."
                            ]
            )
        },
        
        socks0: ['<32>{#p/human}* (Você olha dentro.)', '<32>{#p/human}* (Parece que a gaveta esta vazia.)'],
        socks1: () =>
            world.darker
                ? ['<32>{#p/human}* (Você olha dentro.)', "<32>{#p/basic}* É só uma gaveta de meias."]
                : [
                    '<32>{#p/human}* (Você olha dentro.)',
                    '<32>{#p/basic}* Escandalosa!',
                    "<32>* É a coleção de meias da Toriel.\n* Um pouco bagunçada...",
                    world.meanie
                        ? choicer.create('* (Bagunçar ainda mais?)', 'Sim', 'Não')
                        : choicer.create('* (Limpar a bagunça?)', 'Sim', 'Não')
                ],
        socks2: () =>
            world.meanie
                ? ['<33>{#p/human}* (Você faz uma bagunça com as meias.)']
                : [
                    '<32>{#p/human}* (Você organiza as meias em pares iguais.)',
                    ...(SAVE.data.b.oops
                        ? []
                        : [
                            "<32>{#p/human}* (...)\n* (Parece que tem uma chave escondida na gaveta.)",
                            choicer.create('* (Pegar a chave?)', 'Sim', 'Não')
                        ])
                ],
        socks3: () => [
            "<32>{#p/human}* (...)\n* (Parece que tem uma chave escondida na gaveta.)",
            choicer.create('* (Pegar a chave?)', 'Sim', 'Não')
        ],
        socks4: ['<32>{#p/human}* (Você decide não fazer nada.)'],
        socks5: [
            '<32>{#s/equip}{#p/human}* (A chave secreta foi adicionada ao seu chaveiro.)',
            '<32>{#p/basic}* Mas o que isso poderia destrancar...?'
        ],
        socks6: ['<32>{#p/human}* (Você decide não pegar.)'],
        socks7: () =>
            SAVE.data.b.svr
                ? [
                    '<32>{#p/human}* (Você olha para a gaveta de meia, relembrando a longa jornada iniciada aqui.)',
                    "<32>{#p/human}* (Você não consegue pensar em nada além de como estaria aqui sem isso.)"
                ]
                : world.darker
                    ? ["<32>{#p/basic}* É só uma gaveta de meias."]
                    : SAVE.data.n.plot < 72
                        ? ["<32>{#p/basic}* Você não consegue parar de olhar para as meias."]
                        : SAVE.data.b.oops
                            ? [
                                "<32>{#p/basic}* Você veio esse caminho todo só para revisitar a gaveta de meias da Toriel?",
                                '<32>* Você tem altas prioridades na vida.'
                            ]
                            : [
                                "<32>{#p/basic}* Você veio esse caminho todo só para revisitar a gaveta de meias da Toriel?",
                                '<32>* ... acho que faz sentido.'
                            ],
        steaksale: {
            a: pager.create(
                0,
                () =>
                    SAVE.data.b.napsta_performance
                        ? [
                            '<32>{#p/basic}{#n1}* Salve, doçura ;)',
                            "<32>* Foi bem louco te ver no show, sabe? ;)",
                            '<32>* Você fez um belo trabalho ficando parado ;)',
                            "<32>* Isso com certeza chama uma oferta especial ;)",
                            '<32>* Por tempo limitado apenas, nossos produtos terão ingredientes \"premium\" ;)',
                            "<32>* E confia em mim, doçura, isso não é aquela parada velha de antes, ah naou ;)",
                            '<32>* A parada é GENUÍNA, saca ;)',
                            "<32>* É um pouco mais caro, espero que cê não ligue ;)",
                            "<32>* Agora... Por que você não dá uma olhadela nos produtos? ;)"
                        ]
                        : [
                            '<32>{#p/basic}{#n1}* Salve, doçura ;)',
                            '<32>* O chefe me mandou aqui para ver o que vocês, espreitadelas, estão fazendo, sabe? ;)',
                            "<32>* Podesse dizer que estamos expandindo os negócios ;)",
                            "<32>* Quais são nossos negócios, você pergunta? ;)",
                            "<32>* Bem, na verdade é simples... nós vendemos bife ;)",
                            "<32>* E essa não é aquela porqueira replicada, ah naou ;)",
                            '<32>* Aqui a parada é real, meu ;)',
                            '<32>* Qualquer pessoa que disser o contrário é um mané! Sacou? ;)',
                            "<32>* Com isso dito, que tal você dar uma olhadela nos produtos? ;)"
                        ],
                ["<32>{#p/basic}{#n1}* Porque você não dá uma olhadela no que temos pra vender?"]
            ),
            a1: ['<32>{#p/basic}{#n1}* Obrigado por tudo, doçura ;)'],
            b: () => [
                SAVE.data.b.napsta_performance
                    ? world.darker
                        ? '<32>{#p/basic}{#n1!}* \"Bife Sizzli\" por 40G.'
                        : '<32>{#p/basic}{#n1!}* Está rotulado como \"Bife Sizzli\" e custa 40G.\n* Cheira a hipercalórico.'
                    : world.darker
                        ? '<32>{#p/basic}{#n1!}* \"Bife Sizzli\" por 20G.'
                        : '<32>{#p/basic}{#n1!}* Está rotulado \"Bife Sizzli\" e custa 20G.\n* Cheira a hipercalórico.',
                SAVE.data.b.napsta_performance
                    ? choicer.create('* (Comprar o Bife Sizzli por 40G?)', 'Sim', 'Não')
                    : choicer.create('* (Comprar o Bife Sizzli por 20G?)', 'Sim', 'Não')
            ],
            b1: ['<32>{#p/human}{#n1!}* Você pegou o Bife Sizzli.)', '<32>{#p/basic}{#n1}* Escolha sabida, doçura ;)'],
            b2: ['<32>{#p/human}{#n1!}* (Você decide não comprar.)'],
            c: () => [
                SAVE.data.b.napsta_performance
                    ? world.darker
                        ? '<32>{#p/basic}{#n1!}* \"Refri Fizzli\" por 10G.'
                        : '<32>{#p/basic}{#n1!}* Está rotulado \"Refri Fizzli\" e custa 10G.\n* Você compraria ISSO?'
                    : world.darker
                        ? '<32>{#p/basic}{#n1!}* \"Refri Fizzli\" por 5G.'
                        : '<32>{#p/basic}{#n1!}* Está rotulado como \"Refri Fizzli\" e custa 5G.\n* Quem compraria isso?',
                SAVE.data.b.napsta_performance
                    ? choicer.create('* (Comprar o Refri Fizzli por 10G?)', 'Sim', 'Não')
                    : choicer.create('* (Comprar o Refri Fizzli por 5G?)', 'Sim', 'Não')
            ],
            c1: ['<32>{#p/human}{#n1!}* (Você comprou o Refri Fizzli.)', "<32>{#p/basic}{#n1}* Cuidado, é bem doce ;)"],
            c2: ['<32>{#p/human}{#n1!}* (Você decide não comprar.)'],
            d: pager.create(
                0,
                () => [
                    "<32>{#p/human}{#n1!}* (Você não tem G suficiente.)",
                    '<32>{#p/basic}{#n1}* Sem dinheiro, huh? ;)',
                    SAVE.data.b.napsta_performance
                        ? '<32>{#p/basic}* Tá tudo bem, doçura ;)\n* Nem todo mundo pode comprar os ingredientes \"premium\" ;)'
                        : "<32>{#p/basic}* Tá tudo bem, doçura ;)\n* Só tenha certeza de voltar quando tiver um pouco ;)"
                ],
                ["<32>{#p/human}{#n1!}* (Você não tem G suficiente.)"]
            ),
            e: pager.create(
                0,
                [
                    "<32>{#p/human}{#n1!}* (Você está carregando muito.)",
                    '<32>{#p/basic}{#n1}* Volte mais tarde ;)'
                ],
                ["<32>{#p/human}{#n1!}* (Você está carregando muito.)"]
            ),
            f: ['<32>{#p/human}{#n1!}* Você pegou o Bife Sizzli.)'],
            g: ['<32>{#p/human}{#n1!}* (Você comprou o Refri Fizzli.)'],
            h: ["<32>{#p/human}{#n1!}* (Você está carregando muito.)"],
            i: [
                "<32>{#p/basic}{#n1}* Aliás, estamos fora de estoque ;)",
                "<32>* Parece que você não se cansa de nossas coisas ;)",
                '<32>* Aí, se- não, quando você encontrar o chefão... fala pra ele isso ;)',
                '<32>{#p/human}{#n1!}* (Aaron te conta algo no ouvido.)',
                '<32>{#p/basic}{#n1}* Boa sorte lá fore, doçura ;)'
            ]
        },
        supervisor: {
            a: ['<32>{#p/basic}* Até mais...'],
            b: [
                '<32>{#p/napstablook}* olá todo mundo...',
                '<32>* este é um tom que eu escrevi faz um tempo...',
                "<32>* eu vim fazendo experimentos com meu estilo, então...",
                "<32>* felizmente, espero que seja bom o suficiente para vocês",
                '<32>* ...',
                '<32>* bem, vamos lá...'
            ],
            c1: ['<32>{*}{#p/basic}* Nossa, isso está no tom.{^30}{%}'],
            c2: [
                '<25>{*}{#p/toriel}{#f/7}* Porque o Napstablook nunca mencionou isso?\n* Isso é ótimo!{^30}{%}',
                "<32>{*}{#p/basic}* Pois é, talvez ele só seja tímido.{^30}{%}"
            ],
            c3: ['<32>{*}{#p/basic}* Ooh, bells ;){^30}{%}'],
            c4: ['<32>{*}{#p/basic}* Aí vem o ápice!{^30}{%}'],
            c5: ['<32>{*}{#p/basic}* Bem, isso foi... alguma coisa.{^30}{%}'],
            d: [
                '<32>{#p/napstablook}* sim, foi alguma coisa',
                '<32>{#p/napstablook}* oh tá...\n* Eu provavelmente entediei vocês...',
                '<32>{#p/napstablook}* desculpa...'
            ],
            e: [
                '<25>{|}{#p/toriel}{#f/2}* Não, espera!\n* Isso foi...',
                "<32>{#p/basic}* Eu acho que ele não pode mais te ouvir, Toriel.",
                '<25>{#p/toriel}{#f/9}* ...\n* Eles nunca escutam...'
            ]
        },
        terminal: {
            a: () =>
                postSIGMA()
                    ? ["<32>{#p/human}* (Você ativa o terminal, mas não tem mensagem alguma.)"]
                    : SAVE.data.n.plot === 72
                        ? !world.runaway
                            ? [
                                '<32>{#p/human}* (Você ativa o terminal e da play na mensagem.)',
                                "<32>{#p/alphys}* Estamos livre, pessoal!\n* Isso não é nem uma piada, o escudo de força caiu!",
                                "<32>* Sério, o CORE vai ser desligado em alguns dias, é hora de ir!",
                                "<32>* Você não quer morrer aqui, quer?"
                            ]
                            : [
                                '<32>{#p/human}* (Você ativa o terminal e da play na mensagem.)',
                                "<32>{#p/alphys}* O escudo de força caiu.\n* Chamando todos os cidadãos para evacuação imediata.",
                                "<32>* ... Eu sei que você está com medo, mas vai ficar tudo bem.",
                                "<32>* Ele não pode nos ferir se o deixarmos para trás."
                            ]
                        : 37.2 <= SAVE.data.n.plot
                            ? [
                                '<32>{#p/human}* (Você ativa o terminal e da play na mensagem.)',
                                "<32>{#p/alphys}* A rede de fluidos da Foundry foi reparada, graças aos nossos... t-trabalhadores muito gentis.",
                                '<32>* ...',
                                "<32>* Uma nota não relacionada, nós... e-estamos procurando novos trabalhadores."
                            ]
                            : [
                                '<32>{#p/human}* (Você ativa o terminal e da play na mensagem.)',
                                "<32>{#p/alphys}* Os fluidos da rede de cabos da Foundry estão c-caindo novamente.",
                                '<32>* Os trabalhadores prometeram que logo vão concertar, mas nada está parecendo bom.',
                                '<32>* Por favor, se-se qualquer um puder ajudar, precisamos de você...'
                            ]
        },
        torieldanger: {
            a: ['<25>{#p/toriel}{#f/1}* Você já tentou checar o terminal?'],
            b: ['<25>{#p/toriel}{#f/1}* A senha do terminal está logo ali, pequeno.']
        },
        latetoriel1: [
            '<25>{#p/toriel}{#npc/a}{#f/2}* ...!',
            '<25>{#f/5}* O que você está fazendo aqui longe, minha...',
            '<25>{#f/9}* ... criança...',
            '<25>{#f/5}* Não posso mais cuidar de você, criança.\n* Nem deveria.',
            '<25>{#f/5}* Você tem lugares para estar, coisas para ver...',
            '<25>{#f/10}* Quem sou eu para te impedir do seu destino?',
            '<25>{#f/9}* ...',
            '<25>{#f/5}* Por favor, cuide-se sem mim...',
            '<25>{#f/1}* ... eu sei que você fará a coisa certa...'
        ],
        latetoriel2: ['<25>{#p/toriel}{#npc/a}{#f/5}* ... Vá...'],
        
        lateasriel: () =>
            [
                ['<25>{#p/asriel1}{#f/13}* Só me deixe, Frisk...', "<25>{#f/15}* Eu não posso voltar contigo, tá bom?"],
                [
                    "<25>{#p/asriel1}{#f/16}* Eu não quero ferir os corações deles novamente.",
                    "<25>{#f/13}* É melhor se eles não me virem de jeito algum."
                ],
                [
                    '<25>{#p/asriel1}{#f/15}* ... o que você está fazendo?',
                    '<25>{#f/15}* Você está tentando me fazer companhia?',
                    '<25>{#f/23}* Frisk...',
                    '<25>{#f/22}* ...',
                    '<25>{#f/13}* Hey.',
                    '<25>{#f/13}* Deixa-me te perguntar uma coisa.',
                    '<25>{#f/15}* Frisk...\n* Porque você veio aqui?',
                    '<25>{#f/13}* Todo mundo sabe a história, certo...?',
                    '<25>{#f/23}* \"Naves espaciais que voam para Ebott tendem a desaparecer.\"',
                    '<25>{#f/22}* ...',
                    '<32>{#p/human}* (...)\n* (Você conta a Asriel a verdade.)',
                    '<25>{#p/asriel1}{#f/25}* ...',
                    '<25>{#f/25}* Frisk... você...',
                    '<25>{#f/23}* ...',
                    "<25>{#f/23}* Você não tem que estar sozinho mais, tudo bem?",
                    "<25>{#f/17}* Você fez tantos amigos maravilhosos aqui...",
                    "<25>{#f/17}* Eles estarão lá por você, tudo bem?"
                ],
                [
                    '<25>{#p/asriel1}{#f/15}* ...',
                    '<25>{#f/15}* Eu sei o motivo de $(name) voar para cá.',
                    "<25>{#f/16}* Não foi por uma situação tão boa.",
                    "<25>{#f/13}* Frisk.\n* Eu vou ser sincero contigo.",
                    '<25>{#f/15}* $(name) não queria nada com a humanidade.',
                    '<25>{#f/16}* Ele nunca me disse o porquê.',
                    '<25>{#f/15}* Mas ele se sentia muito mal em relação a isso.'
                ],
                [
                    "<25>{#p/asriel1}{#f/17}* Frisk, está tudo bem.\n* Você não é igual ao $(name) em nenhuma forma.",
                    '<25>{#f/15}* Eu só acho que vocês tem um gosto muito similar para uh... moda.',
                    "<25>{#f/13}* Eu nem sei o motivo de ter agido como se vocês fossem a mesma pessoa.",
                    '<25>{#f/15}* Talvez...\n* A verdade seja que...',
                    "<25>{#f/16}* $(name) só não foi a pessoa que eu quisesse que ele fosse.",
                    '<25>{#f/13}* Enquanto, Frisk...',
                    "<25>{#f/17}* Você foi o amigo que eu sempre quis ter.",
                    '<25>{#f/20}* Então eu estava projetando um pouco.',
                    "<25>{#f/17}* Sejamos sinceros.\n* Eu fiz coisas muito estranhas como uma estrela."
                ],
                [
                    "<25>{#p/asriel1}{#f/13}* Existe uma última coisa que eu sinto que deveria te contar.",
                    '<25>{#f/15}* Quando $(name) e eu combinamos nossas ALMAS...',
                    '<25>{#f/16}* O controle sobre meu corpo na verdade foi dividido entre nós dois.',
                    '<25>{#f/15}* Ele foi quem pegou o próprio corpo morto no espaço.',
                    "<25>{#f/13}* E então, fomos até os restos do planeta...",
                    '<25>{#f/13}* Foi ele quem quis...',
                    '<25>{#f/16}* ... usar todo aquele poder.',
                    '<25>{#f/13}* Eu tive que lutar internamente para resistir.',
                    '<25>{#f/15}* E então, por minha causa, nós...',
                    "<25>{#f/22}* Bem, foi por isso que eu acabei como acabei.",
                    '<25>{#f/23}* ... Frisk.',
                    "<25>{#f/17}* Esse tempo todo eu me culpei por aquela decisão.",
                    "<25>{#f/13}* Foi por isso que eu adotei essa visão tão terrível do mundo.",
                    '<25>{#f/13}* \"Matar ou Morrer.\"',
                    '<25>{#f/17}* Mas agora...\n* Após te conhecer...',
                    "<25>{#f/23}* Frisk, eu não me arrependo mais daquela decisão.",
                    '<25>{#f/22}* Eu fiz a coisa certa.',
                    "<25>{#f/13}* Se tivéssemos matado aqueles humanos...",
                    '<25>{#f/15}* Nós teríamos declarado guerra contra toda a humanidade.',
                    '<25>{#f/17}* E no fim, todos nós estamos livres, certo?',
                    '<25>{#f/17}* Mesmo os outros que vieram aqui conseguiram sair vivos.',
                    '<25>{#f/13}* ...',
                    '<25>{#f/15}* Mas, $(name)...',
                    "<25>{#f/16}* ... não sei dizer ao certo o que aconteceu com eles após morrermos.",
                    '<25>{#f/15}* Nada foi encontrado... nem mesmo a ALMA.',
                    "<25>{#f/15}* Então... eu me pergunto se ele ainda esta por aí... em algum lugar.",
                    '<32>{#p/basic}* ...',
                    '<32>{#p/human}* (Parece que tem alguém chorando...)'
                ],
                [
                    '<25>{#p/asriel1}{#f/17}* Frisk, obrigado por me escutar.',
                    '<25>{#f/17}* Você realmente deveria ir agora para os seus amigos, tudo bem?',
                    '<25>{#f/13}* Ah, e, por favor...',
                    '<25>{#f/20}* No futuro, se vocês, uh, me ver...',
                    "<25>{#f/15}* ... não pensa naquilo como eu, tudo bem?",
                    '<25>{#f/16}* Eu quero que você se lembre de mim... dessa forma.',
                    '<25>{#f/17}* Alguém que foi seu amigo por um tempinho.',
                    '<25>{#f/13}* ...',
                    '<32>{|}{#p/human}* (Você diz a Asriel que você- {%}',
                    "<25>{#p/asriel1}{#f/23}* Frisk, tá tudo bem.",
                    "<25>{#f/22}* Você não precisa salvar todo mundo para ser uma boa pessoa.",
                    '<25>{#f/13}* E mesmo assim... mesmo se eu conseguisse ficar nessa forma...',
                    "<25>{#f/15}* Eu não sei se poderia deixar o passado para trás.",
                    "<25>{#f/17}* ... só me prometa que você vai cuidar de si mesmo, tudo bem?",
                    '<25>{#f/13}* ...',
                    '<25>{#f/15}* Bem, te vejo por aí.'
                ],
                ['<25>{#p/asriel1}{#f/13}* Frisk...', "<25>{#f/15}* Você tem coisas melhores para fazer, não tem?"],
                []
            ][Math.min(SAVE.data.n.lateasriel++, 8)],
        securefield: ['<33>{#p/basic}* Tem um escudo de segurança aqui.\n* Está ativo.'],
        trivia: {
            w_security: ["<32>{#p/basic}* É um escudo de força."],
            photoframe: () =>
                SAVE.data.b.svr
                    ? [
                        [
                            '<25>{#p/asriel1}{#f/13}* Um porta retratos vazio...',
                            '<25>{#f/16}* A muito tempo, haviam fotos nestes porta retratos.',
                            '<25>{#f/15}* Então, ela as tirou e nunca mais pois de volta.',
                            "<25>{#f/16}* ... deve doer muito olhar para elas."
                        ],
                        [
                            '<25>{#p/asriel1}{#f/13}* Porta retratos vazios são como memórias perdidas...',
                            '<25>{#p/asriel1}{#f/15}* Este lugar tem muitas delas.'
                        ],
                        ['<25>{#p/asriel1}{#f/22}* Muitas delas neste lugar estranho.']
                    ][Math.min(asrielinter.photoframe++, 1)]
                    : SAVE.data.n.plot === 72 && !world.runaway
                        ? ['<32>{#p/basic}* Ainda um porta retrato vazio.']
                        : ['<32>{#p/basic}* Um porta retrato vazio.'],
            w_paintblaster: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Esse aparelho parece estar algumas décadas atrasado.)']
                    : world.darker
                        ? ['<32>{#p/basic}* Um aparelho inútil de pouca importância.']
                        : ['<32>{#p/basic}* Um antigo dispositivo de injeção de combustível.'],
            w_candy: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (O sinal avisa sobre mal funcionamento inesperado.)']
                    : ['<32>{#p/basic}* \"Observe que os aparelhos podem ser mais propensos a mau funcionamento do que parecem.\"'],
            w_djtable: () =>
                SAVE.data.b.svr
                    ? []
                    : world.darker
                        ? ["<32>{#p/basic}* É um set de DJ."]
                        : SAVE.data.n.plot === 72
                            ? ['<32>{#p/basic}* Um set de DJ estiloso, que surpreendentemente não está em uso.']
                            : ['<32>{#p/basic}* Um set de DJ estiloso, equipado com botões e controles deslizantes em abundância.'],
            w_froggit: () =>
                SAVE.data.n.plot === 72
                    ? [
                        '<32>{#p/basic}* Ribbit, ribbit.\n* (Com licença, humano.)',
                        '<32>* (Parece que você se tornou uma pessoa atenciosa e conscienciosa.)',
                        "<32>* (Tenha isso vindo do meu conselho ou não...)\n* (Eu estou orgulhoso.)",
                        '<32>* Ribbit.'
                    ]
                    : [
                        '<32>{#p/basic}* Ribbit, ribbit.\n* (Com licença, humano...)',
                        '<32>* (Eu tenho alguns conselhos para você sobre lutar com monstros.)',
                        '<32>* (Se você {@fill=#ff0}AGIR{@fill=#fff} de certo modo ou {@fill=#3f00ff}LUTAR{@fill=#fff} até quase derrota-los...)',
                        '<32>* (Eles talvez não queiram mais lutar com você.)',
                        '<32>* (Se um monstro não quiser mais lutar com você, por favor...)',
                        '<32>* (Tenha {@fill=#ff0}PIEDADE{@fill=#fff}, humano.)\n* Ribbit.'
                    ],
            w_froggit_view: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você olha fortemente para o cosmos no além...)']
                    : world.darker
                        ? []
                        : SAVE.data.n.plot === 72
                            ? [
                                "<32>{#p/basic}* É irônico como olhar para o espaço sideral...",
                                '<32>* Tende a ser uma ótima forma de organizar seus pensamentos profundos.'
                            ]
                            : [
                                "<32>{#p/basic}* É uma vista do espaço sideral.",
                                '<32>* Certamente não faltam por aqui, não é?'
                            ],
            w_kitchenwall: () =>
                SAVE.data.n.plot === 9
                    ? ['<26>{#p/toriel}{#f/1}* Paciência, minha criança!']
                    : ['<26>{#p/toriel}{#f/1}* Isso talvez tome um tempo...'],
            w_lobby1: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/humano}* (O sinal fala da força de vontade em tempos de angústia.)']
                    : ['<32>{#p/basic}* \"Mesmo quando você tropeça, a vontade de seguir em frente aparece.\"'],
            w_pacing_view: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você olha com felicidade para o cosmos no além...)']
                    : world.darker
                        ? []
                        : SAVE.data.n.plot === 72
                            ? [
                                "<32>{#p/basic}* Após uma longa jornada, o vidro não parece te assustar.",
                                '<32>* Não que tenha assustado em algum momento.'
                            ]
                            : [
                                '<32>{#p/basic}* <32>{#p/basic}* Pensar que a única coisa entre você e a vastidão infinita é uma folha de vidro...',
                                "<32>* Mesmo com todo o senso comum, isso não parece te incomodar."
                            ],
            w_pacing1: () =>
                SAVE.data.n.plot === 72
                    ? [
                        '<32>{#p/basic}* Ribbit, ribbit.\n* (Alguém passou aqui não muito tempo atrás.)',
                        '<32>* (Ele pediu pra não te contar onde estava indo.)',
                        "<32>* (Eu não iria mesmo, mas ele parecia tão triste...)",
                        "<32>* (Ele provavelmente está na plataforma depois da entrada.)",
                        '<32>* (Vá. Fale com ele. Alguma coisa boa virá disso.)\n* Ribbit.',
                        '<32>{#p/basic}* ... Asriel...'
                    ]
                    : [
                        '<32>{#p/basic}* Ribbit, ribbit.\n* (Chorinho...)',
                        '<32>* (Meu \"amigo\" não gosta muito de ser legal comigo.)',
                        '<32>* (Se eu desse a opção, ele até mesmo me machucaria.)',
                        "<32>* (Tudo certo.......)\n* (Me machucar............)\n* (................)",
                        "<32>* (Pelo menos você é legal comigo.)\n* Ribbit."
                    ],
            w_pacing2: () =>
                SAVE.data.n.plot === 72
                    ? SAVE.data.b.oops
                        ? [
                            '<32>{#p/basic}* Ribbit, ribbit.\n* (Olá, humano...)',
                            '<32>* (Você ouviu falar do meu amigo?)',
                            '<32>* (Ele estava por aqui a alguns dias atrás, na minha esquerda...)',
                            '<32>* (Mas depois de você aparecer, ele sumiu.)',
                            "<32>* (Ele disse que fugiria se você ferisse alguém...)",
                            SAVE.data.n.exp <= 0
                                ? "<32>* (O que é confuso, já que você com certeza não fez isso.)\n* Ribbit."
                                : '<32>* (Talvez da próxima vez você deva tentar ser mais legal?)\n* Ribbit.'
                        ]
                        : [
                            '<32>{#p/basic}* Ribbit, ribbit.\n* (Olá, humano...)',
                            "<32>* (Meu amigo está mais feliz do que nunca.)",
                            "<32>* (Ele disse que fugiria se você machucasse alguém, mas você não o fez.)",
                            "<32>* (Na verdade, ele decidiu estar ao meu lado para sempre.)",
                            '<32>* (Quanto aquele \"amigo\" dele que sempre tentou machucá-lo...)',
                            '<32>* (Oh, parece que ele se transformou em uma cabra.)\n* Ribbit.'
                        ]
                    : [
                        '<32>{#p/basic}* Ribbit, ribbit.\n* (Olá, humano...)',
                        '<32>* (Você já tentou olhar seus ITEMS?)',
                        "<32>* (Se você pegou alguma coisa, é aí que você a encontrará.)",
                        '<32>* (O que eu tenho nos meus ITEMS, você pergunta?)',
                        "<32>* (Oh, você é bobo... monstros não tem ITEMS!)\n* Ribbit."
                    ],
            w_pacing3: () =>
                SAVE.data.n.plot === 72
                    ? SAVE.data.n.bully < 1
                        ? [
                            '<32>{#p/basic}* Ribbit, ribbit.\n* (Obrigado por sempre mostrar piedade aos monstros.)',
                            '<32>* (Eu sei que te ensinei a como bater nas pessoas com segurança...)',
                            "<32>* (Mas isso não significa que eu quisesse que você fizesse isso.)",
                            '<32>* (Você é uma boa pessoa.)\n* Ribbit.'
                        ]
                        : SAVE.data.n.bully < 15
                            ? [
                                '<32>{#p/basic}* Ribbit, ribbit.\n* (Obrigado por tentar manter as surras no mínimo.)',
                                '<32>* (Eu sei que te ensinei a como bater nas pessoas com segurança...)',
                                "<32>* (Mas isso não significa que eu quisesse que você fizesse isso.)",
                                "<32>* (Você não é terrível, para um humano ao menos.)\n* Ribbit."
                            ]
                            : [
                                '<32>{#p/basic}* Ribbit, ribbit.\n* (Então você provou ter sido uma ameaça formidável.)',
                                "<32>* (Mesmo assim, eu ainda não tenho medo de você...)",
                                '<32>* (Talvez no fim, você tenha oferecido piedade quando poderia ter me atacado.)',
                                '<32>* (Eu aprecio a contenção que você demonstrou.)\n* Ribbit.'
                            ]
                    : [
                        "<32>{#p/basic}* Ribbit, ribbit.\n* (Se você espancar um monstro até a quase morte...)",
                        '<32>* (Seu nome vai se tornar azul.)',
                        '<32>* (Estranho, né?)\n* (Mas eu ouvi dizer que os humanos ficam azuis quando são espancados também.)',
                        '<32>* (Então eu suponho que você entenda o que eu digo.)',
                        '<32>* (Bem, obrigado por escutar os pensamentos da minha mente.)\n* Ribbit.'
                    ],
            w_puzzle1_view: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você olha profundamente para o cosmos no além...)']
                    : world.darker
                        ? []
                        : SAVE.data.n.plot === 72
                            ? ['<32>{#p/basic}* No final, esses quartos ainda parecem nada mais do que áreas de observação.']
                            : [
                                '<32>{#p/basic}* Porque será que parece que essas salas...',
                                '<32>* ... são feitas apenas para serem observadas?'
                            ],
            w_puzzle2: () =>
                SAVE.data.b.svr
                    ? world.nootflags.has('w_puzzle2') // NO-TRANSLATE

                        ? [
                            '<32>{#p/human}* (O sinal descreve que resolver quebra-cabeça é uma parte desnecessária na exploração espacial.)',
                            ...[
                                [
                                    '<25>{#p/asriel1}{#f/13}* Diferente de muitos sinais, este aqui tem um ponto.',
                                    "<25>{#f/15}* E isso claramente não é pelo fato de eu tê-lo escrito."
                                ],
                                ["<25>{#p/asriel1}{#f/3}* ... não me fala que você realmente gostou dessas quebra-cabeças."],
                                ["<25>{#p/asriel1}{#f/10}* Frisk, mesmo você não é tão esquisitão."]
                            ][Math.min(asrielinter.w_puzzle2++, 2)]
                        ]
                        : ['<32>{#p/human}* (O sinal descreve o valor da paciência no espaço.)']
                    : world.nootflags.has('w_puzzle2') // NO-TRANSLATE

                        ? [
                            '<32>{#p/basic}* \"A fronteira final é um mar negro fundo.\"',
                            '<32>* \"Navegar é águas jamais DEVERIA requerer resolver enigmas de desing mal feito!\"'
                        ]
                        : [
                            '<32>{#p/basic}* \"A fronteira final é um mar negro fundo.\"',
                            '<32>{#p/basic}* \"Antes de carregar no {@fill=#ff993d}grande desconhecido{@fill=#fff}, você deve esperar que suas {@fill=#00a2e8}correntes se alinhem{@fill=#fff}.\"'
                        ],
            w_puzzle3_view: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você olha reflexivo para o cosmos no além...)']
                    : world.darker
                        ? []
                        : SAVE.data.n.plot === 72
                            ? ['<32>{#p/basic}* Com certeza... era... uma bela vista.']
                            : ['<32>{#p/basic}* Com certeza é uma bela vista.'],
            w_puzzle4: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (O sinal parece ser uma propaganda para uma venda de bifes.)']
                    : [
                        '<32>{#p/basic}* \"Certifique-se de pegar uma fatia do Glyde\'s Signature Steak (TM) na sala de atividades!\"'
                    ],
            w_ta_box: () =>
                SAVE.data.b.svr
                    ? [
                        [
                            '<25>{#p/asriel1}{#f/20}* Sim... Toriel nunca foi uma de deixar isso em um pedaço.',
                            '<25>{#f/21}* Mesmo esses meus modelos de réplica da nave espacial foram esmagados...'
                        ],
                        [
                            "<25>{#f/13}* É surpreendente.\n* Ela normalmente é uma pessoa super organizada.",
                            '<25>{#p/asriel1}{#f/17}* ... ela deve ter tido um dia ruim.'
                        ],
                        ['<25>{#p/asriel1}{#f/13}* Acontece...']
                    ][Math.min(asrielinter.w_ta_box++, 2)]
                    : world.darker
                        ? ["<32>{#p/basic}* É uma caixa de brinquedo.\n* O modelo de nave espacial foi quebrado em pedaços."]
                        : SAVE.data.n.plot === 72
                            ? [
                                '<32>{#p/basic}* As pequenas naves na caixa nunca foram reparadas.',
                                "<32>* Se essa fosse a casa do Asgore, tudo estaria no formato perfeito."
                            ]
                            : [
                                '<32>{#p/basic}* Uma caixa com modelos de nave espacial!\n* E... vidro quebrado?',
                                '<32>* Parece que alguém quebrou suas pequenas naves.'
                            ],
            w_ta_cabinet: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* (Você não consegue encontrar nada aqui a não ser vários do mesmo modelo de roupa.)"]
                    : [
                        '<32>{#p/basic}* Um gabinete cheio de camisetas com listras azuis e amarelas.',
                        ...(SAVE.data.n.plot === 72 ? ["<32>* Como se isso nunca fosse mudar."] : [])
                    ],
            w_ta_frame: () =>
                SAVE.data.b.svr
                    ? [["<25>{#p/asriel1}{#f/21}* ... está faltando..."], ['<25>{#p/asriel1}{#f/21}* ...']][
                    Math.min(asrielinter.w_ta_frame++, 1)
                    ]
                    : SAVE.data.n.plot === 72
                        ? ['<32>{#p/basic}* Um porta retrato vazio.', "<32>* Não há muito mais para dizer."]
                        : ['<32>{#p/basic}* Um porta retrato vazio.', "<32>* Não tem muito mais o que dizer."],
            w_ta_paper: () =>
                SAVE.data.b.svr
                    ? [
                        "<32>{#p/human}* (O desenho não parece ser nada importante.)",
                        ...[
                            [
                                "<25>{#p/asriel1}{#f/13}* Já está acabado a muito agora, mas o verdadeiro desenho eu fiz aqui...",
                                '<25>{#f/17}* ... foi basicamente um blueprint da minha forma como \"deus da hipermorte\".',
                                '<25>{#f/17}* Super skybreaker, titanium striker...',
                                '<25>{#f/20}* E agora, é claro o lendário \"hyper goner.\"'
                            ],
                            [
                                '<25>{#p/asriel1}{#f/17}* É... eu acho que já tinha tudo planejado.',
                                '<25>{#f/20}* Eu vinha com muitas ideias malucas, o tempo todo...',
                                '<25>{#f/1}* Ooh, você teria adorado meu conceito de nave estelar pan-galáctica.'
                            ],
                            [
                                '<25>{#p/asriel1}{#f/17}* Frisk, eu espero...',
                                '<25>{#f/23}* Eu realmente espero que a gente consiga ter um momento assim entre nós.',
                                '<25>{#f/22}* Lá atrás com $(name), isso sempre foi...',
                                '<25>{#f/15}* ... difícil.'
                            ],
                            ["<25>{#p/asriel1}{#f/20}* Não se preocupe.\n* Se você não souber, eu vou te ensinar."]
                        ][Math.min(asrielinter.w_ta_paper++, 3)]
                    ]
                    : world.darker
                        ? ['<32>{#p/basic}* Um desenho esquecível.\n* Nada parecido com o original.']
                        : [
                            "<32>{#p/basic}* Um desenho de criança, desviando de um monstro com azas de arco-íris.",
                            "<32>* É exatamente igual aquele em casa..."
                        ],
            w_tf_couch: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (O sofá parece nunca ter sido usado.)']
                    : SAVE.data.n.plot === 72
                        ? ["<32>{#p/basic}* Não importa quanto tempo passe, parece que ninguém jamais vai sentar aqui."]
                        : world.darker
                            ? ["<32>{#p/basic}* É um sofá.\n* O que mais você esperava?"]
                            : [
                                '<32>{#p/basic}* Um sofá de aparência confortável.',
                                '<32>* A tentação de afundar em suas almofadas deliciosas é difícil de resistir.'
                            ],
            w_tf_table: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* (Você olha para o final da mesa, mas nada parece olhar de volta.)"]
                    : [
                        '<32>{#p/basic}* Um fim de mesa irresistível.',
                        "<32>{#p/basic}* É bem irreal, está na beira da perfeição me termos de condição."
                    ],
            w_tf_window: () =>
                SAVE.data.b.svr
                    ? SAVE.data.b.c_state_secret1_used && SAVE.data.b.c_state_secret5_used
                        ? ['<32>{#p/human}* (Você olha com desejo para o cosmos no além...)']
                        : ['<32>{#p/human}* (Você melancolicamente para o cosmos além...)']
                    : world.darker
                        ? ["<32>{#p/basic}* É só outra janela."]
                        : SAVE.data.n.plot === 72
                            ? ["<32>{#p/basic}* Como sempre, é uma linda vista do espaço sideral."]
                            : ["<32>{#p/basic}* É uma linda vista do espaço sideral."],
            w_th_door: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* (O sinal descreve a sala como incompleta.)',
                        ...[
                            [
                                "<25>{#p/asriel1}{#f/3}* Se essa casa não fosse uma réplica, esse seria o quarto do papai.",
                                '<25>{#f/4}* Você consegue imaginar porque nunca foi finalizado.'
                            ],
                            [
                                '<25>{#p/asriel1}{#f/13}* ...',
                                '<25>{#f/15}* Aquela fala afetou a mamãe... não de um jeito bom.',
                                '<25>{#f/4}* Como uma estrela, as vezes... eu espiava ela.',
                                "<25>{#f/3}* E o jeito que ela falava, parecia nunca ter abandonado aquele momento.",
                                '<25>{#f/13}* Então você apareceu e tudo mudou...'
                            ],
                            [
                                '<25>{#p/asriel1}{#f/13}* ...',
                                "<25>{#f/15}* Isso é muito estranho.\n* Eu vou pretender que não estamos aqui."
                            ],
                            ['<25>{#p/asriel1}{#f/13}* ...']
                        ][Math.min(asrielinter.w_th_door++, 3)]
                    ]
                    : ['<32>{#p/basic}* \"Quarto em reforma.\"'],
            w_th_mirror: () =>
                SAVE.data.b.svr
                    ? ["<25>{#p/asriel1}{#f/24}* Somos nós..."]
                    : world.genocide
                        ? ['<32>{#p/basic}* ...']
                        : world.darker
                            ? ["<32>{#p/basic}* É você."]
                            : SAVE.data.b.w_state_catnap || SAVE.data.n.plot > 17
                                ? ["<32>{#p/basic}* É você...", '<32>{#p/basic}* ... e sempre será.']
                                : ["<32>{#p/basic}* É você!"],
            w_th_plant: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você agradece a planta pelo ar que ela te fornece todos os dias.)']
                    : SAVE.data.n.plot === 72
                        ? ["<32>{#p/basic}* Essa planta está feliz que você está vivo."]
                        : world.darker
                            ? ['<32>{#p/basic}* Essa planta não parece feliz em te ver.']
                            : SAVE.data.b.oops
                                ? ['<32>{#p/basic}* Essa planta está feliz em te ver.']
                                : ['<32>{#p/basic}* Esta planta está em êxtase ao vê-lo!'],
            w_th_sausage: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você sussurra a planta.)']
                    : ['<32>{#p/basic}* Esta planta parece bastante brega.'],
            w_th_table1: () => [
                '<32>{#p/human}* (Você olha de baixo da mesa e encontra um conjunto de giz de cera.)',
                ...(SAVE.data.b.svr
                    ? [
                        [
                            '<25>{#p/asriel1}{#f/24}* Eu acho que $(name) deve ter perdido o giz azul.',
                            '<25>{#f/7}* ... na verdade não.\n* EU TENHO CERTEZA que ele perdeu.',
                            '<25>{#f/6}* No fim estava em uma caixa de comidas, mas ninguém pensou em olhar lá.',
                            '<25>{#f/16}* Ele deve ter nomeado que a caixa era dele.'
                        ],
                        [
                            "<26>{#p/asriel1}{#f/4}* Se algum dia conseguirmos um novo conjunto de giz de cera, estarei vigiando ele.",
                            '<25>{#f/3}* O momento que você sequer pensar em perder um giz...',
                            "<26>{#f/8}* Eu estarei lá para impedir esta onda de crimes antes mesmo de começar.",
                            '<25>{#f/2}* Fique esperto.'
                        ],
                        ["<25>{#p/asriel1}{#f/31}* Estou de olho em você, Frisk.", '<25>{#f/8}* E... talvez os ouvidos.'],
                        ['<25>{#p/asriel1}{#f/10}* Você está olhando meus ouvidos de novo?\n* Continue fazendo isso.']
                    ][Math.min(asrielinter.w_th_table1++, 3)]
                    : world.edgy
                        ? ['<32>{#p/basic}* Dois giz estão faltando na coleção.']
                        : world.darker
                            ? ['<32>{#p/basic}* Um giz está faltando na coleção.']
                            : [
                                '<32>{#p/basic}* O super evasivo giz azul, perdido por anos...',
                                '<32>{#p/basic}* Uma verdadeira lenda do nosso tempo.'
                            ])
            ],
            w_th_table2: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* (Você olha em baixo da mensa e encontra um conjunto de cartas.)',
                        ...[
                            [
                                '<25>{#p/asriel1}{#f/27}* $(name) e eu nunca fomos muito desse tipo de coisa.',
                                '<25>{#p/asriel1}{#f/15}* Bem... Eu disse nunca.',
                                "<25>{#p/asriel1}{#f/15}* Uh, vamos só não falar sobre isso."
                            ],
                            [
                                '<25>{#p/asriel1}{#f/13}* ...',
                                '<25>{#p/asriel1}{#f/13}* A última vez que fizemos isso, uma mesa saiu voando.',
                                '<25>{#p/asriel1}{#f/17}* Só coisa de irmão.\n* Você sabe como funciona essa coisa de jogos de carta.'
                            ],
                            ['<25>{#p/asriel1}{#f/17}* ...']
                        ][Math.min(asrielinter.w_th_table2++, 2)]
                    ]
                    : world.darker
                        ? [
                            '<32>{#p/human}* (Você olha em baixo da mensa e encontra um conjunto de cartas.)',
                            "<33>{#p/basic}* Não vale a pena o tempo."
                        ]
                        : SAVE.data.n.plot === 72
                            ? [
                                '<32>{#p/human}* (Você olha em baixo da mensa e encontra um conjunto de cartas.)',
                                "<33>{#p/basic}* Em pouco tempo, não vamos mais precisar pensar nisso de novo."
                            ]
                            : [
                                '<32>{#p/human}* (Você olha em baixo da mensa e encontra um conjunto de cartas.)',
                                "<33>{#p/basic}* São holográficos, claro."
                            ],
            w_tk_counter: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* (Você passa a mão pela tábua de cortar, observando as várias ranhuras e sulcos.)'
                    ]
                    : world.darker
                        ? ["<32>{#p/basic}* É uma taba de cortar."]
                        : ["<32>{#p/basic}* Tábua de corte da Toriel.\n* Não é tão utilizada quanto costumava ser."],
            w_tk_sink: () =>
                SAVE.data.b.svr
                    ? [
                        [
                            '<25>{#p/asriel1}{#f/21}* $(name) sempre disse que deixar pelo no ralo era nojento.',
                            '<25>{#f/15}* Eu sempre pensei que fosse normal, pra ser sincero...'
                        ],
                        [
                            '<25>{#p/asriel1}{#f/13}* Humanos nunca penteiam os pelos?\n* $(name) nunca me contava essas coisas.'
                        ],
                        ["<25>{#p/asriel1}{#f/17}* Eu acho que os humanos penteiam.\n* Mesmo que não sejam os pelos."]
                    ][Math.min(asrielinter.w_tk_sink++, 2)]
                    : SAVE.data.n.plot === 72
                        ? ['<32>{#p/basic}* Restos de pelo branco um dia presos aqui ainda estão presos até hoje.']
                        : ['<32>{#p/basic}* A pequenas bolas de pelo branco paradas no ralo.'],
            w_tk_stove: () =>
                SAVE.data.b.svr
                    ? [
                        [
                            '<25>{#p/asriel1}{#f/13}* Eu sempre me perguntei o motivo dela achar que comprar isso seria boa ideia.',
                            "<25>{#f/10}* A não ser, que ela quisesse recriar a cozinha do Asgore...?",
                            "<25>{#f/17}* Pra alguém que parou de gostar dele, ela era muito ruim em demonstrar isso."
                        ],
                        [
                            '<25>{#p/asriel1}{#f/15}* Muitas vezes eu desejei que Toriel e Asgore ficassem juntos de novo.',
                            "<25>{#f/16}* ... mas eu acho que foi para o melhor que isso não tenha acontecido."
                        ],
                        ["<25>{#p/asriel1}{#f/13}* Só não era para acontecer, Frisk..."]
                    ][Math.min(asrielinter.w_tk_stove++, 2)]
                    : SAVE.data.n.state_wastelands_toriel === 2
                        ? ["<32>{#p/basic}* É só um fogão.\n* Ninguém vai usar."]
                        : world.darker
                            ? ["<32>{#p/basic}* É só um fogão."]
                            : SAVE.data.n.plot === 72
                                ? ['<32>{#p/basic}* O fogão está bem limpo.\n* Toriel provavelmente não vão precisar de um no novo mundo.']
                                : ['<32>{#p/basic}* O fogão está bem limpo.\n* Toriel deve usar magia de fogo invés dele.'],
            w_tk_trash: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* (Você não sabe o que está no lixo...)"]
                    : SAVE.data.n.plot === 72
                        ? ['<32>{#p/basic}* Bem simbólico, a lixeira tem estado vazia.']
                        : ['<32>{#p/basic}* Tem uma receita aqui para o Chá Estrelado'],
            
            w_tl_azzychair: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você nota o tamanho bastante grande da cadeira de jantar.)']
                    : SAVE.data.n.state_wastelands_toriel === 2 || world.runaway
                        ? ['<32>{#p/basic}* Uma cadeira de jantar grande.']
                        : ["<32>{#p/basic}* Uma das cadeiras de jantar da Toriel.\n* Para uma rainha."],
            w_tl_bookshelf: pager.create(
                1,
                () =>
                    SAVE.data.b.svr
                        ? [
                            '<32>{#p/human}* (O livro nesta bancada consiste em fatos sobre lesmas, receitas de família e dicas para jardinagem.)'
                        ]
                        : [
                            "<32>{#p/basic}* É uma bancada.",
                            '<32>{#p/human}* (Você escolhe um livro...)',
                            '<32>{#p/basic}* \"Você sabia que os caracóis têm uma língua parecida com uma motosserra chamada rádula?\"',
                            '<32>* \"Poucos sabem sobre esse fato.\"',
                            '<32>* \"Outro fato interessante sobre é como seu sistema digestivo troca enquanto eles crescem.\"',
                            '<32>* \"Oh, e eu já mencionei...\"',
                            '<32>* \"Lesmas falam. {^10}Realmente. {^10}Devagar.\"',
                            '<32>* \"Brincadeira, lesmas não falam.\"',
                            '<32>* \"Quer dizer, imagina um mundo onde as lesmas pudessem falar?\"',
                            '<32>{#p/human}* (Você coloca o livro de volta.)'
                        ],
                () =>
                    SAVE.data.b.svr
                        ? [
                            '<32>{#p/human}* (O livro nesta bancada consiste em fatos sobre lesmas, receitas de família e dicas para jardinagem.)'
                        ]
                        : [
                            "<32>{#p/basic}* É uma bancada.",
                            '<32>{#p/human}* (Você escolhe um livro...)',
                            '<32>{#p/basic}* \"Receitas da Família Dreemurr: Torta de Lesma\"',
                            '<32>* \"Torta de Lesma é uma receita tradicional dos membros da Família Dreemurr.\"',
                            '<32>* \"Fazê-la é um processo simples, e pode ser feita com cinco passos.\"',
                            '<32>* \"Primeiro, prepare a crosta inferior colocando-a em cima de uma forma de torta.\"',
                            '<32>* \"Em seguida, bata o leite em pó, os ovos e os temperos em uma tigela até ficar homogêneo.\"',
                            '<32>* \"Então, pegue lesmas de idade e jogue-as na mistura.\"',
                            '<32>* \"Depois disso, ponha os ingredientes na forma.\"',
                            '<32>* \"Por último, prepare a crosta superior cortando a folha em tiras e formando uma treliça.\"',
                            '<32>* \"Então asse a torta!\"',
                            '<32>* \"Uma vez que a torta estiver pronta, deixe a gelar, retire da forma e sirva!\"',
                            '<32>{#p/human}* (Você coloca o livro de volta.)'
                        ],
                () =>
                    SAVE.data.b.svr
                        ? [
                            '<32>{#p/human}* (O livro nesta bancada consiste em fatos sobre lesmas, receitas de família e dicas para jardinagem.)'
                        ]
                        : [
                            "<32>{#p/basic}* É uma bancada.",
                            '<32>{#p/human}* (Você escolhe um livro...)',
                            '<32>{#p/basic}* \"Olá, amigos jardineiros.\"',
                            '<32>* \"Quando tratamos de Flores Estreladas, a uma linha entre crescimento e estagnação...\"',
                            '<32>* \"É preciso acesso ao espaço aberto.\"',
                            '<32>* \"Por isso que elas normalmente crescem em Aerialis...\"',
                            '<32>* \"É a área mais aberta do Outpost.\"',
                            '<32>{#p/human}* (Você coloca o livro de volta.)'
                        ]
            ),
            
            w_tl_goreychair: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você percebe o tamanho pequeno dessa cadeira de jantar.)']
                    : SAVE.data.n.state_wastelands_toriel === 2 || world.runaway
                        ? ['<32>{#p/basic}* Uma cadeira de jantar pequena.']
                        : world.genocide
                            ? ["<32>{#p/basic}* Uma das cadeiras de jantar da Toriel.\n* Cabe um menino."]
                            : world.darker
                                ? ["<32>{#p/basic}* Uma das cadeiras de jantar da Toriel.\n* Cabe um príncipe."]
                                : SAVE.data.b.oops
                                    ? ["<32>{#p/basic}* Uma das cadeiras de jantar da Toriel.\n* Cabe uma criança.\n* Como você!"]
                                    : ["<32>{#p/basic}* Uma das cadeiras de jantar da Toriel.\n* Cabe um... lindo anjo.\n* Como você!"],
            w_tl_table: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (As plantas parecem ser decorativas da natureza.)']
                    : world.darker
                        ? ['<32>{#p/basic}* Uma planta decorativa.\n* Nada mais.']
                        : ["<32>{#p/basic}* Uma planta decorativa na mesa de jantar da Toriel."],
            w_tl_tools: () =>
                SAVE.data.b.svr
                    ? [
                        [
                            '<25>{#p/asriel1}{#f/20}* $(name) gostava de pretender que esses eram instrumentos músicas.',
                            '<25>{#f/17}* Ele coloca para fora e começava a \"toca-los\"',
                            '<25>{#f/20}* Assim que eu me juntei, fizemos um pequeno instrumental juntos.',
                            '<26>{#f/13}* Nós começamos a usar nossas vozes para emular os instrumentos, e então...',
                            '<25>{#f/17}* Mãe e pai chegaram e começaram a adicionar vocais!'
                        ],
                        [
                            '<25>{#p/asriel1}{#f/13}* Acabou que alguém estava ouvindo do lado de fora.',
                            '<25>{#f/15}* Antes mesmo de notarmos tinham monstros entrando na casa...',
                            '<25>{#f/17}* $(name) e eu estávamos no meio da sala, fazendo nossa música.',
                            '<25>{#f/20}* Mas agora nós tínhamos uma orquestra inteira atrás da gente!',
                            '<25>{#f/17}* <25>{#f/17}* Devemos ter realizado metade do Índice Harmonexus naquele dia.',
                            "<25>{#f/17}* ... é um livro antigo cheio de sons da nossa cultura."
                        ],
                        [
                            '<25>{#p/asriel1}{#f/13}* Tudo isso porque brincamos de faz de conta com alguns atiçadores de fogo...',
                            '<25>{#f/17}* Dizem que você pode fazer um instrumento com qualquer coisa.',
                            '<25>{#f/13}* ...',
                            "<25>{#f/15}* Pera aí...\n* EU sou qualquer coisa..." 
                        ],
                        ["<25>{#p/asriel1}{#f/20}* Por favor não faça um instrumento musical de mim."]
                    ][Math.min(asrielinter.w_tl_tools++, 3)]
                    : world.darker
                        ? ['<32>{#p/basic}* Atiçadores de fogo.']
                        : SAVE.data.n.plot === 72
                            ? [
                                "<32>{#p/basic}* Eles são apenas atiçadores de fogo...\n* Ou são?",
                                "<32>* Considere que o fogo da Toriel é o único confortável, não quente o suficiente.",
                                '<32>* Pra quê ela precisa disso?',
                                '<32>* Bem, pelo processo de eliminação, estes devem ser instrumentos músicas avançados.'
                            ]
                            : [
                                '<32>{#p/basic}* Um rack de instrumentos musicais avançados.',
                                '<32>* Se uma olhada de perto, você percebe que estes são de fato atiçadores de fogo.',
                                "<32>* É difícil dizer, já que essas ferramentas eram meio que feitas...",
                                '<32>* Antes mesmo do Outpost ser construído.'
                            ],
            
            w_tl_torichair: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você nota o tamanho excepcional da cadeira de jantar.)']
                    : SAVE.data.n.state_wastelands_toriel === 2 || world.runaway
                        ? ['<32>{#p/basic}* Uma cadeira de rei para jantar.']
                        : ["<32>{#p/basic}* Uma das cadeiras de jantar da Toriel.\n* Cabe um rei."],
            w_toriel_toriel: () => [
                "<32>{#p/basic}* Está trancado.",
                toriSV()
                    ? SAVE.data.n.plot < 17.001
                        ? '<32>{#p/basic}* Parece que a Toriel está chorando...'
                        : '<32>{#p/basic}* Parece que a Toriel está dormindo...'
                    : '<32>{#p/basic}* Parece que a Toriel está escrevendo...'
            ],
            w_tt_bed: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (A cama parece ser bem menor do que costumava parecer.)']
                    : SAVE.data.n.state_wastelands_toriel === 2 || world.runaway
                        ? ["<32>{#p/basic}* É uma cama."]
                        : SAVE.data.n.plot < 72 || world.runaway
                            ? [
                                "<32>{#p/basic}* É a cama da Toriel.",
                                ...(world.darker ? [] : ['<32>* Certamente grande demais para você.'])
                            ]
                            : [
                                "<32>{#p/basic}* É a cama da Toriel.",
                                "<32>* Você ainda tem um tempo para ir, mas você vai crescer com isso."
                            ],
            w_tt_bookshelf: pager.create(
                1,
                () =>
                    SAVE.data.b.svr
                        ? [
                            '<32>{#p/human}* (O livro na bancada consiste em história, biologia e uma gama de possibilidades.)'
                        ]
                        : [
                            SAVE.data.n.state_wastelands_toriel === 2 || world.runaway
                                ? "<32>{#p/basic}* É uma bancada."
                                : "<32>{#p/basic}* É a bancada de livros da Toriel.",
                            '<32>{#p/human}* (Você escolhe um livro...)',
                            '<32>{#p/basic}* \"Nosso mundo destruído... nosso povo morto... porquê?\"',
                            '<32>* \"Claramente, os humanos devem ter um motivo para seus ataques.\"',
                            '<32>* \"Nosso povo era uma real ameaça para eles?\"',
                            '<32>* \"A ameaça de nosso potencial trouxe tanto medo?\"',
                            '<32>* \"Seja lá qual for o caso, nós fomos cercados e não havia onde ir.\"',
                            '<32>* \"Evacuar era nossa única forma de sobreviver.\"',
                            '<32>{#p/human}* (Você coloca o livro de volta.)'
                        ],
                () =>
                    SAVE.data.b.svr
                        ? [
                            '<32>{#p/human}* (O livro na bancada consiste em história, biologia e uma gama de possibilidades.)'
                        ]
                        : [
                            SAVE.data.n.state_wastelands_toriel === 2 || world.runaway
                                ? "<32>{#p/basic}* É uma bancada."
                                : "<32>{#p/basic}* É a bancada de livros da Toriel.",
                            '<32>{#p/human}* (Você escolhe um livro...)',
                            '<32>{#p/basic}* \"Quando um Boss monstro nasce, uma ligação mágica é formada entre os pais e a criança.\"',
                            '<32>* \"Através disso, sua ALMA é criada, envelhecendo os pais junto com a criança.\"',
                            '<32>* \"A ALMA de um boss monstro totalmente crescido é a mais forte da sociedade monstro...\"',
                            '<32>* \"Ela é capaz de persistir após a morte, por apenas uma fração de minuto.\"',
                            '<32>{#p/human}* (Você coloca o livro de volta.)'
                        ],
                () =>
                    SAVE.data.b.svr
                        ? [
                            '<32>{#p/human}* (O livro na bancada consiste em história, biologia e uma gama de possibilidades.)'
                        ]
                        : [
                            SAVE.data.n.state_wastelands_toriel === 2 || world.runaway
                                ? "<32>{#p/basic}* É uma bancada."
                                : "<32>{#p/basic}* É a bancada de livros da Toriel.",
                            '<32>{#p/human}* (Você escolhe um livro...)',
                            '<32>{#p/basic}* \"Nós estávamos preocupados sobre o que aconteceria se os humanos nos atacassem.\"',
                            '<33>* \"Mas é se um de nós atacasse ao invés disso...?\"',
                            '<32>* \"Seríamos capazes de suportar tamanho traição?\"',
                            '<32>* \"Mas quem seria capaz de fazer tal coisa?\"',
                            '<32>{#p/human}* (Você coloca o livro de volta.)'
                        ]
            ),
            w_tt_cactus: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Esse cacto te lembra de alguém que você já conheceu.)']
                    : SAVE.data.n.plot < 72
                        ? world.darker
                            ? ['<32>{#p/basic}* Finalmente, uma planta de casa que todos conhecemos.']
                            : ['<32>{#p/basic}* Ah, o cacto.\n* A planta mais tsundere de todas.']
                        : ["<32>{#p/basic}* Não é como se o cacto estivesse esperando você voltar nem nada do tipo..."],
            w_tt_chair: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Está pequeno cadeira parece pequena demais para seu dono.)']
                    : world.darker
                        ? ["<32>{#p/basic}* É uma cadeira de leitura."]
                        : SAVE.data.n.plot === 72
                            ? [
                                "<32>{#p/basic}* Cadeira da Toriel dedicada a leitura...",
                                "<32>* ... pelo menos até o Asgore decidir tomar para ele.",
                                "<32>* Ele sempre gostou dessa cadeira.\n* Eu ficaria surpreso se ele não a tomasse para si."
                            ]
                            : ["<32>{#p/basic}* Cadeira da Toriel dedicada a leitura.", '<32>* Cheira a ossos preguiçosos.'],
            w_tt_diary: pager.create(
                0,
                ...[
                    [
                        '<32>{#p/human}* (Você olha para o parágrafo circulado.)',
                        '<32>{#p/toriel}{#f/21}* \"Pergunta: Por que o esqueleto queria um amigo?\"',
                        '<32>* \"Resposta: Porque ele estava soossinho...\"',
                        '<32>{#p/basic}* As piadas do mesmo calibre continuam.'
                    ],
                    [
                        '<32>{#p/human}* (Você olha outro parágrafo.)',
                        '<32>{#p/toriel}{#f/21}* \"Pergunta: Qual outro nome para os vícios de um esqueleto?\"',
                        '<32>* \"Resposta: Hernia de disco...\"',
                        "<32>{#p/basic}* Não faz sentido continuar lendo."
                    ],
                    [
                        '<32>{#p/human}* (Você olha outro parágrafo.)',
                        '<32>{#p/toriel}{#f/21}* \"Pergunta: Como um esqueleto diz adeus?\"',
                        '<32>* \"Resposta: Vou dar no pé...\"',
                        "<32>{#p/basic}* Essa aí nem foi MINIMAMENTE engraçada."
                    ],
                    [
                        '<32>{#p/human}* (Você olha outro parágrafo.)',
                        "<32>{#p/basic}* Ninguém aguenta muito esse tipo de piada.",
                        '<32>{#p/toriel}{#f/21}* \"Pergunta: Por que o esqueleto baba durante o sono?\"',
                        '<32>* \"Answer: Porque ele está tendo um sonho a flor da pele...\"',
                        '<32>{#p/basic}* Que as divindades tenham piedade...'
                    ],
                    [
                        '<32>{#p/human}* (Você olha outro parágrafo.)',
                        "<32>{#p/basic}* Você continua lendo as piadas ruins.",
                        '<32>{#p/toriel}{#f/21}* \"Pergunta: O que o esqueleto diz ao começar uma batalha?\"',
                        '<32>* \"Pergunta: Vamos resolver essa palhaossada...\"',
                        "<32>{#p/basic}* Sério?"
                    ],
                    [
                        '<32>{#p/human}* (Você olha outro parágrafo.)',
                        "<32>{#p/basic}* Estamos perdendo células cerebrais aqui...",
                        "<32>{#p/toriel}{#f/21}* \"'O que tem lá em cima?' pergunta o esqueleto.\"",
                        '<32>* \"... O teto não respondeu.\"',
                        '<32>{#p/basic}* ...\n* Nem sei o que dizer.'
                    ],
                    [
                        '<32>{#p/human}* (Você olha o parágrafo final.)',
                        "<32>{#p/basic}* Huh?\n* Este não é uma piada...",
                        '<32>{#p/toriel}{#f/21}* \"Um humano apareceu nas Outlands hoje.\"',
                        '<32>* \"Eu confio que o Sans cuidará dele, mas...\"',
                        '<32>* \"Eu preferiria não força-lo a tal obrigação.\"',
                        '<32>* \"É mesmo assim, um único guarda real proteger o humano do restante do Outpost?\"',
                        '<32>* \"Com esperança essas perguntas serão inúteis daqui um tempo.\"',
                        '<32>{#p/basic}* ...'
                    ],
                    ['<32>{#p/human}* (Não tem nada escrito aqui.)']
                ].map(
                    lines => () =>
                        SAVE.data.b.svr
                            ? ['<32>{#p/human}* (O diário parece consistir basicamente das piadas de esqueleto do mais alto calibre.)']
                            : SAVE.data.n.plot === 72
                                ? [
                                    '<32>{#p/human}* (Você olha a página mais recente.)',
                                    '<32>{#p/toriel}{#f/21}* \"Parece que meus preconceitos em relação a Asgore estavam incorretos.\"',
                                    '<32>* \"Ao falhar em confronta-lo, eu também falhei em entender o que estava acontecendo.\"',
                                    '<32>* \"Eu estava certa em pensar que não mereço ser uma mãe.\"',
                                    '<32>* \"Mas talvez agora... eu consiga aprender o que ser mãe significa de verdade.\"',
                                    '<32>* \"Eu vou precisar pensar sobre isso sozinha.\"'
                                ]
                                : world.darker
                                    ? ["<32>{#p/basic}* É um diário.\n* Você não acharia engraçado."]
                                    : SAVE.data.n.plot < 14
                                        ? lines
                                        : [
                                            '<32>{#p/human}* (Você olha para o parágrafo mais recente.)',
                                            ...(world.edgy
                                                ? ["<32>{#p/basic}* Foi rabiscado com um giz de cera."]
                                                : toriSV()
                                                    ? [
                                                        '<32>{#p/toriel}{#f/21}* \"Não tem sido o melhor dos dias.\"',
                                                        '<32>* \"Ainda assim, outro humano caiu em meus braços...\"',
                                                        '<32>* \"O sétimo e último humano que ele precisa para quebrar a barreira.\"',
                                                        '<32>* \"Eu não deveria deixar isso acontecer.\"',
                                                        '<32>* \"Com as apostas tão altas neste, um confronto pode ser inevitável...\"'
                                                    ]
                                                    : [
                                                        '<32>{#p/toriel}{#f/21}* \"Tem sido um dia interessante, para dizer o menos.\"',
                                                        '<32>* \"Um humano apareceu...\"',
                                                        '<32>* \"Então, tentou fugir...\"',
                                                        '<32>* \"E então, a coisa mais estranha aconteceu.\"',
                                                        '<32>* \"Uma lembrança da qual eu necessitei por muito tempo...\"'
                                                    ])
                                        ]
                )
            ),
            w_tt_plant: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Esta planta de casa parece extremamente normal.)']
                    : ["<32>{#p/basic}* É uma planta de casa.", '<32>* O que tem mais para se dizer?'],
            w_tt_trash: pager.create(
                0,
                () =>
                    SAVE.data.b.svr
                        ? ["<32>{#p/human}* (Você não sabe o que está no lixo...)"]
                        : world.darker
                            ? ['<32>{#p/basic}* Lesmas.']
                            : SAVE.data.n.plot === 72
                                ? ['<32>{#p/basic}* As lesmas estão começando a cheirar... fantasmagóricas.', '<32>* ... o que isso poderia dizer?']
                                : [
                                    "<32>{#p/basic}* É a lixeira da Toriel, contendo...",
                                    '<32>* Lesmas.',
                                    '<32>* Camadas e camadas de lesmas.'
                                ],
                pager.create(
                    1,
                    () =>
                        SAVE.data.b.svr
                            ? ["<32>{#p/human}* (Você não sabe o que está no lixo...)"]
                            : world.darker
                                ? ['<32>{#p/basic}* Lesmas.']
                                : SAVE.data.n.plot === 72
                                    ? ['<32>{#p/basic}* Talvez seja assim que elas fiquem após seus dias expirarem.']
                                    : ['<32>{#p/basic}* E nada ALÉM de lesmas.'],
                    () =>
                        SAVE.data.b.svr
                            ? ["<32>{#p/human}* (Você não sabe o que está no lixo...)"]
                            : world.darker
                                ? ['<32>{#p/basic}* Lesmas.']
                                : SAVE.data.n.plot === 72
                                    ? ["<32>{#p/basic}* Ou talvez eu tenha ido e perdido completamente o sentido."]
                                    : ['<32>{#p/basic}* ...\n* Já mencionei as lesmas?'],
                    () =>
                        SAVE.data.b.svr
                            ? ["<32>{#p/human}* (Você não sabe o que está no lixo...)"]
                            : world.darker
                                ? ['<32>{#p/basic}* Lesmas.']
                                : SAVE.data.n.plot === 72
                                    ? ['<32>{#p/basic}* Ou talvez...', '<32>* ... pera, o que eu estava dizendo?']
                                    : ['<32>{#p/basic}* Lesmas.'],
                    () =>
                        SAVE.data.b.svr
                            ? ["<32>{#p/human}* (Você não sabe o que está no lixo...)"]
                            : world.darker
                                ? ['<32>{#p/basic}* Lesmas.']
                                : SAVE.data.n.plot === 72
                                    ? ["<32>{#p/basic}* Oh, certo.\n* O achado sobre o novo cheiro fantasmagórico das lesmas."]
                                    : ['<32>{#p/basic}* Camadas e camadas de lesmas.']
                )
            ),
            w_tutorial_view: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Você olha com animação para o cosmos além...)']
                    : world.darker
                        ? []
                        : ['<32>{#p/basic}* A primeira de muitas janelas que fazem parte das Outlands.'],
            w_tutorial1: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (O sinal descreve as qualidades de um bom relacionamento.)']
                    : [
                        '<32>{#p/basic}* \"Um bom relacionamento querer confiança e bondade para continuar andando.\"',
                        ...(world.goatbro && SAVE.flag.n.ga_asrielOutlands7++ < 1
                            ? ['<26>{#p/asriel2}{#f/8}* Tão nojento de sentimental.']
                            : [])
                    ]
        },
        piecheck: () =>
            SAVE.data.b.svr
                ? [
                    [
                        "<25>{#p/asriel1}{#f/17}* As tortas da mamãe sempre foram as melhores...",
                        '<25>{#f/13}* Eu ainda me lembro do sabor da primeira que eu comi.',
                        "<25>{#f/15}* Eu nunca me senti tão feliz após morder alguma coisa...",
                        "<25>{#f/17}* ... é como se tivesse transcendendo a outro nível de confeitaria."
                    ],
                    [
                        "<25>{#p/asriel1}{#f/20}* Er, talvez eu esteja sendo muito propagandista.",
                        "<25>{#f/17}* Mas eu estou te dizendo, Frisk...",
                        '<25>{#f/13}* ... não importa o que aconteça com a mãe e o pai...',
                        '<25>{#f/17}* Você PRECISA que ela faça uma daquelas tortas para mim.',
                        "<25>{#f/20}* Eu... me pergunto se ainda gostaria delas tanto quanto antes, depois de tudo."
                    ],
                    ['<25>{#p/asriel1}{#f/15}* Com certeza faz muito tempo...']
                ][Math.min(asrielinter.piecheck++, 2)]
                : SAVE.data.n.plot < 8
                    ? world.darker
                        ? ["<32>{#p/basic}* É apenas uma bancada."]
                        : ['<32>{#p/basic}* Há uma mancha em forma de anel quase invisível na bancada.']
                    : SAVE.data.n.state_wastelands_mash === 1 && SAVE.data.n.plot > 8
                        ? ['<32>{#p/basic}* O fantasma da torta uma vez a esmagou \"assombradamente\" na bancada.']
                        : SAVE.data.n.plot === 72
                            ? SAVE.data.n.state_wastelands_mash > 0
                                ? ['<32>{#p/basic}* Não muito tempo após poderá arrumar essa atrocidade.']
                                : SAVE.data.n.state_wastelands_toriel === 2
                                    ? ['<32>{#p/basic}* Você sente com força que deveria deixar isso de lado.']
                                    : world.runaway
                                        ? [
                                            '<32>{#p/basic}* Você pode ter sido um bully, mas deixou a torta intacta.',
                                            '<32>{#p/basic}* Talvez algumas coisas são assustadoras demais, até pra você.'
                                        ]
                                        : [
                                            world.meanie
                                                ? '<32>{#p/basic}* A torta pode ter sido intimidada por você, mas após todo esse tempo...'
                                                : '<32>{#p/basic}* O tamanho da torta pode não mais te intimidar, mas após todo esse tempo...',
                                            "<32>{#p/basic}* Você ganhou um sentimento de respeito pela torta que não permite consumi-la."
                                        ]
                            : SAVE.data.n.state_wastelands_mash > 0
                                ? ['<32>{#p/basic}* Não tem mais nada para ser feito aqui.']
                                : SAVE.data.n.state_wastelands_toriel === 2
                                    ? ['<32>{#p/basic}* Você sente com força que deveria deixar isso de lado.']
                                    : world.meanie
                                        ? [
                                            '<32>{#p/basic}* O tamanho da torta não te intimida de forma alguma.',
                                            '<32>{#p/basic}* Na verdade, ela deve estar intimidada por você...',
                                            choicer.create('* (Esmagar a torta?)', 'Sim', 'Não')
                                        ]
                                        : ['<32>{#p/basic}* O tamanho da torta te intimida demais para come-la.'],
        piesmash1: ['<32>{#p/human}* (Você decide não esmaga-la.)'],
        piesmash2: ['<32>{#p/human}* (Você dá um balanço...)'],
        piesmash3: ["<32>{#p/basic}* Foi totalmente destruído."],
        tutorial_puzzle1: [
            '<25>{#p/toriel}* Diferente dos desafios anteriores, este é um pouco diferente.',
            '<25>{#f/1}* É BEM raro, mas alguns quebra-cabeças no Outpost...'
        ],
        tutorial_puzzle2: [
            '<25>{#p/toriel}* ... precisam da assistência de outra mãe.',
            '<25>{#f/1}* Você entende o que precisa fazer agora?'
        ],
        tutorial_puzzle2a: ['<25>{#p/toriel}{#f/1}* Você entende o que deve fazer agora?'],
        tutorial_puzzle3: ['<25>{#p/toriel}* Muito bem, pequeno!\n* Muito bem.'],
        tutorial_puzzle4: ['<25>{#p/toriel}{#f/1}* Sua vez...'],
        tutorial_puzzle4a: ['<25>{#p/toriel}{#f/0}* É sua vez.'],
        tutorial_puzzle5: ['<25>{#p/toriel}* Muito bem!\n* Apenas mais uma vez.'],
        tutorial_puzzle6: ['<25>{#p/toriel}{#f/1}* Sim!\n* Estou muito orgulhosa de você, minha criança...'],
        tutorial_puzzle7: ['<25>{#p/toriel}* Venha comigo quando estiver pronto para começar sua próxima lição.'],
        tutorial_puzzle8a: ['<25>{#p/toriel}* A resposta não está comigo, pequeno.'],
        tutorial_puzzle8b: ['<25>{#p/toriel}* Tente repetir o que você fez antes.'],
        tutorial_puzzle8c: ['<25>{#p/toriel}{#f/1}* Vá lá...'],
        twinkly1: [
            "<25>{#p/twinkly}{#f/5}* Olá!\n* Eu sou {@fill = #ff0}TWINKLY {@fill = #fff}.\n* {@fill=#ff0}TWINKLY{@fill=#fff} a {@fill=#ff0}ESTRELA{@fill=#fff}"
        ],
        twinkly2: [
            '<25>{#f/5}* O que te trás ao Outpost, amigo viajante?',
            '<25>{#f/5}* ...',
            "<25>{#f/8}* Você está perdido, não está?",
            "<25>{#f/5}* Bem, coisa boa que eu estou aqui para você!",
            "<25>{#f/8}* Eu não tenho estado no meu melhor formato, mas...",
            '<25>{#f/5}* ... alguém precisa te ensinar como as coisas funcionam por aqui!',
            '<25>{#f/10}* Acho que o bom e velho eu terei que fazer isso.',
            "<25>{#f/5}* Vamos começar, que tal?"
        ],
        twinkly3: [
            "<25>{#f/7}* Mas você já sabe disso, né não?",
            '<25>{#f/8}* ...',
            "<25>{#f/5}* Ainda assim, sou eu quem devo te mostrar como a banda toca.",
            "<25>* Vamos começar, que tal?"
        ],
        twinkly4: [
            "<25>{#p/twinkly}{#f/6}* Okay, chega.",
            '<25>{#f/8}* Se você quer continuar resetando, de todas as formas...',
            '<25>{#f/6}* Faça o que quiser.',
            "<25>{#f/7}* Só não espere passar de mim tão facilmente."
        ],
        twinkly5: ["<25>{#p/twinkly}{#f/6}* Você não tem nada melhor pra fazer?"],
        twinkly6: [
            "<25>{#p/twinkly}{#f/6}* Resetando logo após tomar um dano, né?",
            '<25>{#f/7}* Que patético.'
        ],
        twinkly6a: [
            "<25>{#p/twinkly}{#f/11}* Como se eu fosse esquecer o que você fez...",
            '<25>{#f/7}* Seu desviador imundo.'
        ],
        twinkly7: ['<25>{#p/twinkly}{#f/7}* Eu posso brincar desse joguinho o dia inteiro, idiota.'],
        twinkly8: ["<25>{#f/11}* E já que você sabe exatamente o que vem em seguida...{%15}"],
        twinkly9: [
            '<25>{#p/twinkly}{#f/6}* Olá.',
            "<25>* Parece que eu vou tomar uma bola de fogo se vacilar por tempo demais.",
            '<25>{#f/8}* Uma tristeza, sério...',
            '<25>{#f/7}* Eu iria me divertir muito com você.',
            '<25>{#f/6}* ...',
            '<25>{#f/5}* Até logo!'
        ],
        twinkly9a: [
            '<25>{#p/twinkly}{#f/12}{#v/0}* Mas que infernos você tá fazendo, $(name)?',
            '<25>{#f/12}{#v/0}* Tínhamos o Outpost à nossa mercê'
        ],
        twinkly9a1: ['<25>{#f/6}{#v/0}* Tudo que precisávamos fazer era seguir o plano.'],
        twinkly9a2: [
            '<25>{#f/6}{#v/0}* Tudo que precisávamos fazer ela passar pela Foundry...',
            '<25>* Acabar com os guardas...',
            '<25>* E chegar a Cidadela!'
        ],
        twinkly9a3: [
            '<25>{#f/6}{#v/0}* Tudo que precisávamos fazer era finalizar com os guardas...',
            '<25>* E chegar a Cidadela!'
        ],
        twinkly9a4: [
            '<25>{#f/6}{#v/0}* Tudo que precisávamos fazer era MATAR aquele robô de merda...',
            '<25>* E chegar a Cidadela!'
        ],
        twinkly9a5: ['<25>{#f/6}{#v/0}* Tudo que precisávamos fazer era passar pela Cidadela!'],
        twinkly9a6: ['<25>{#f/6}{#v/0}* Tudo que precisávamos fazer era MATAR aquele pedaço de lixo nerd!'],
        twinkly9a7: ['<25>{#f/6}{#v/0}* Tudo que precisávamos fazer era andar até o fim!', '<25>* Estávamos tão perto!'],
        twinkly9a8: ['<25>{#f/8}{#v/0}* Coward...'],
        twinkly9b: [
            '<25>{#p/twinkly}{#f/5}* $(name)...?',
            "<25>{#f/6}* I'm not really sure what just happened.",
            '<25>{#f/8}* We were on the shuttle, and then...',
            '<25>{#f/8}* ...',
            '<25>{#f/6}* I...',
            '<25>{#f/8}* I have to go...'
        ],
        twinkly9c: [
            "<25>{#p/twinkly}{#f/7}* So, we're back at the beginning, are we?",
            "<26>{#f/5}* I've been expecting you.\n* I wonder how you'll do this time around.",
            "<25>{#f/11}* Who knows?\n* Maybe it'll be easier for you now.",
            '<25>{#f/7}* It certainly was when I had your powers.',
            '<25>{#f/6}* ...',
            '<25>{#f/5}* Well, good luck!'
        ],
        twinkly10: [
            "<20>{#f/5}See that heart? That's your SOUL, the very culmination of your being!",
            '<20>{#f/5}Your SOUL is an important part of you, and needs LOVE to sustain itself.'
        ],
        twinkly11: [
            "<20>{*}{#x2}{#f/5}Out here, LOVE is shared through... {#f/8}little white... {#f/11}'happiness shards.'",
            "<20>{*}{#f/5}To get you started on the right path, I'll share some of my own LOVE.",
            '<20>{*}{#f/5}Try to get as many as you can!{^20}{*}{#x1}{%}'
        ],
        twinkly12: [
            "<20>{*}{#f/8}Whoops, I think you might've missed them...",
            "<20>{*}{#f/5}But that's okay!",
            '<20>{*}{#x2}{#f/10}Here, have some more.{^20}{*}{#x1}{%}'
        ],
        twinkly13: [
            '<20>{*}{#f/12}What the-... are you braindead or something??',
            '<20>{*}{#x2}RUN. INTO. THE. BULLETS!!!{^20}{*}{#x1}{^999}'
        ],
        twinkly14: 'RUN. INTO. THE. happiness shards~',
        twinkly15: [
            '<20>{#v/1}Hee hee hee...',
            "<20>In this world, it's KILL or BE killed.",
            '<20>Imagine, a SOUL like yours crash-landing on my doorstep...',
            "<20>Did you really think I'd pass up such a golden opportunity?"
        ],
        twinkly16: [
            "<20>{#f/7}Nah, you know what's going on here, don'tcha?",
            "<20>You just wanted to torment little old Twinkly, didn'tcha?",
            "<20>Golly... you must have no idea who you're messing with.",
            '<20>{#f/11}Hee hee hee...'
        ],
        twinkly17: ["<20>{#v/1}We'll just have to cut straight to the point, won't we?", '<20>Hee hee hee...'],
        twinkly18: ['<20>{*}{#f/2}{#v/1}{@random=1.1/1.1}DIE.{^20}{%}'],
        twinkly19: ['<20>{#p/toriel}What a terrible creature, torturing such a poor, innocent youth...'],
        twinkly20: [
            '<20>Have no fear, little one.',
            '<20>I am {@fill=#003cff}TORIEL{@fill=#000}, overseer of the {@fill=#f00}OUTLANDS{@fill=#000}.',
            '<20>I come by every day to check for those who have been stranded here.',
            '<20>Follow me, child.\nThere is much I intend to teach you.'
        ],
        twinkly21: [
            '<25>{#p/toriel}{#f/1}* Oh my!\n* Where did you come from, little one?',
            '<25>{#f/1}* Are you injured?',
            '<25>{#f/0}* ...\n* Forgive me for asking so many questions.',
            '<25>{#f/0}* I am {@fill=#003cff}TORIEL{@fill=#fff}, overseer of the {@fill=#f00}OUTLANDS{@fill=#fff}.',
            '<26>{#f/0}* I come by every day to check for those who\n  have been stranded here.',
            '<25>{#f/0}* Follow me, child.\n* There is much I intend to teach you.'
        ],
        twinkly22: ['<25>{#f/0}* This way.'],
        w_coffin0: () => [
            '<32>{#p/human}* (You feel it would be best to leave this be.)',
            ...(SAVE.data.b.svr ? ['<25>{#p/asriel1}{#f/13}* ...'] : [])
        ],
        w_coffin1: () => [
            '<32>{#p/basic}* This coffin is very old.\n* There is nothing remarkable about it.',
            ...(world.goatbro && SAVE.flag.n.ga_asrielCoffin++ < 1
                ? [
                    '<25>{#p/asriel2}{#f/13}* Oh, look at that.\n* They made one just for you, $(name).',
                    '<25>{#p/asriel2}{#f/5}* How touching.'
                ]
                : [])
        ],
        w_coffin2: pager.create(
            0,
            () => [
                '<32>{#p/basic}* This coffin dates back to December 251X.',
                '<32>* There is an old record-keeping manifest stashed next to it...',
                choicer.create('* (Access the manifest?)', 'Sim', 'Não')
            ],
            () => [
                '<32>{#p/human}* (You once again pick up the manifest.)',
                choicer.create('* (Access the manifest?)', 'Sim', 'Não')
            ]
        ),
        w_coffin3: () => [choicer.create('* (Read the next page?)', 'Sim', 'Não')],
        w_coffin4: ['<32>{#p/human}* (But there were no further pages to be read.)'],
        w_coffin5: ['<32>{#p/human}* (You put the manifest back where it belongs.)'],
        w_dummy1: () =>
            SAVE.data.b.svr
                ? ['<32>{#p/human}* (You place your hands on the dummy.)\n* (It seems very worn out.)']
                : ['<32>{#p/basic}* A training dummy, circa 251X.\n* CITADEL standard-issue.'],
        wonder1: [
            '<32>{#p/basic}* Can you hear it?\n* The song of the stars?',
            "<32>* At certain places on the outpost, like this one... it's there.",
            '<32>* You just have to be listening for it.',
            '<32>* Pretty cool, right?'
        ]
    },

    b_group_outlands: {
        froggitWhimsun: ['<32>{#p/story}* Space frogs and Starflies!\n* Or something of the like.'],
        froggitWhimsun2a: ['<32>{#p/story}* Space frogs...?'],
        froggitWhimsun2b: ['<32>{#p/story}* Starflies...?'],
        looxMigospWhimsun: ["<32>{#p/story}* It's the troublesome trio!"],
        looxMigospWhimsun2: ['<32>{#p/story}* The trio has become a duo.'],
        looxMigospWhimsun3: ['<32>{#p/story}* Only one remains.'],
        moldsmalMigosp: ['<32>{#p/story}* Silente and company present themselves!']
    },

    b_opponent_froggit: {
        act_check: ['<32>{#p/story}* FROGGIT - ATK 4 DEF 5\n* Life is difficult for this monster.'],
        act_check2: ['<32>{#p/story}* FROGGIT - ATK 4 DEF 5\n* Life is getting better for this monster.'],
        act_check3: ["<32>{#p/story}* FROGGIT - ATK 4 DEF 5\n* Life just doesn't seem to get easier for this monster."],
        act_check4: ['<32>{#p/story}* FROGGIT - ATK 4 DEF 5\n* Life is very confusing for this monster.'],
        act_check5: ['<32>{#p/story}* FROGGIT - ATK 4 DEF 5\n* Life seems to be very lovely for this monster.'],
        act_threat: [
            '<32>{#p/human}* (You threaten Froggit.)',
            "<32>{#p/basic}* Froggit doesn't understand what you said..."
        ],
        act_threat2: [
            '<32>{#p/human}* (You threaten Froggit again.)',
            "<32>{#p/basic}* Froggit recalls the previous threat and decides it's time to run away."
        ],
        act_compliment: [
            '<32>{#p/human}* (You compliment Froggit.)',
            "<32>{#p/basic}* Froggit doesn't understand what you said..."
        ],
        act_flirt: [
            '<32>{#p/human}* (You flirt with Froggit.)',
            "<32>{#p/basic}* Froggit doesn't understand what you said..."
        ],
        act_translate0: ["<32>{#p/human}* (But you haven't said anything to translate yet.)"],
        act_translate1: [
            '<32>{#p/human}* (You translate what you said.)\n* (Froggit seems to understand you now.)',
            '<32>{#p/basic}* Froggit is flattered.'
        ],
        act_translate1x: [
            '<32>{#p/human}* (You translate what you said.)\n* (Froggit seems to understand you now.)',
            '<32>{#p/basic}* Froggit is hesitant to continue this battle.'
        ],
        act_translate1y: [
            '<32>{#p/human}* (You translate what you said.)\n* (Froggit seems to understand you now.)',
            '<32>* Thoroughly threatened, Froggit runs away!'
        ],
        act_translate1z: [
            '<32>{#p/human}* (You translate what you said.)\n* (Froggit seems to understand you now.)',
            '<32>{#p/basic}* Froggit shows no sign of fear.'
        ],
        act_translate2: [
            '<32>{#p/human}* (You translate what you said.)\n* (Froggit seems to understand you now.)',
            '<32>{#p/basic}* Froggit is blushing, if only on the inside.'
        ],
        confuseText: ['<08>{#p/basic}{~}Ribbit, ribbit?'],
        flirtText: ['<08>{#p/basic}{~}(Blushes deeply.)\nRibbit..'],
        idleText1: ['<08>{#p/basic}{~}Ribbit, ribbit.'],
        idleText2: ['<08>{#p/basic}{~}Croak, croak.'],
        idleText3: ['<08>{#p/basic}{~}Hop, hop.'],
        idleText4: ['<08>{#p/basic}{~}Meow.'],
        mercyStatus: ['<32>{#p/story}* Froggit seems reluctant to fight you.'],
        name: '* Froggit',
        meanText: ['<08>{#p/basic}{~}(Shiver, shake.)\nRibbit..'],
        niceText: ['<08>{#p/basic}{~}(Blushes softly.)\nRibbit..'],
        perilStatus: ['<32>{#p/story}* Froggit is trying to run away.'],
        status1: ['<32>{#p/story}* Froggit hops near!'],
        status2: ['<32>{#p/story}* The battlefield is filled with the smell of crystherium utilia.'],
        status3: ["<32>{#p/story}* Froggit doesn't seem to know why it's here."],
        status4: ['<32>{#p/story}* Froggit hops to and fro.']
    },
    b_opponent_whimsun: {
        act_check: ['<32>{#p/story}* FLUTTERLYTE - ATK 5 DEF 0\n* This monster has only just learned how to fly...'],
        act_check2: ['<32>{#p/story}* FLUTTERLYTE - ATK 5 DEF 0\n* This monster wishes it had stayed on the ground.'],
        act_console: [
            '<32>{#p/human}* (You help Flutterlyte fly higher into the air.)',
            '<32>{#p/basic}* Flutterlyte thanks you, and flies away...'
        ],
        act_flirt: [
            '<32>{#p/human}* (You flirt with Flutterlyte.)',
            '<32>{#p/basic}* Unable to handle your compliment, Flutterlyte bursts into tears and flies away...'
        ],
        act_terrorize: [
            '<32>{#p/human}* (You weep and wail and gnash your teeth.)',
            '<32>{#p/basic}* Flutterlyte panicks and flies away...'
        ],
        idleTalk1: ['<08>{#p/basic}{~}Why is this so hard..'],
        idleTalk2: ['<08>{#p/basic}{~}Please help me..'],
        idleTalk3: ["<08>{#p/basic}{~}I'm scared.."],
        idleTalk4: ["<08>{#p/basic}{~}I can't do this.."],
        idleTalk5: ['<08>{#p/basic}{~}\x00*sniff sniff*'],
        name: '* Flutterlyte',
        perilStatus: ['<32>{#p/story}* Flutterlyte is barely keeping itself in the air.'],
        status1: ['<32>{#p/story}* Flutterlyte comes forth!'],
        status2: ['<32>{#p/story}* Flutterlyte continues to mutter apologies.'],
        status3: ['<32>{#p/story}* Flutterlyte hovers meekly.'],
        status4: ['<32>{#p/story}* The smell of fresh peaches permeates the air.'],
        status5: ['<32>{#p/story}* Flutterlyte is hyperventilating.'],
        status6: ['<32>{#p/story}* Flutterlyte avoids eye contact.']
    },
    b_opponent_loox: {
        act_check: ['<32>{#p/story}* OCULOUX - ATK 6 DEF 6\n* Staring contest master.\n* Family name: Eyewalker'],
        act_check2: [
            "<32>{#p/story}* OCULOUX - ATK 6 DEF 6\n* This bully is trying very hard to pretend it's not flattered."
        ],
        act_check3: ['<32>{#p/story}* OCULOUX - ATK 6 DEF 6\n* This monster is honored to be in your line of sight.'],
        act_dontpick: [
            '<32>{#p/human}* (You stare at Oculoux.)\n* (Oculoux stares back harder.)',
            "<32>{#p/human}* (Oculoux's eye becomes increasingly strained, and eventually...)",
            '<32>{#p/human}* (... Oculoux bows.)'
        ],
        act_flirt: ['<32>{#p/human}* (You flirt with Oculoux.)'],
        act_pick: ['<32>{#p/human}* (You rudely lecture Oculoux about staring at people.)'],
        checkTalk1: ['<08>{#p/basic}{~}Do you dare to stare?'],
        dontDeny1: ['<08>{#p/basic}{~}Look who changed their mind.'],
        dontTalk1: ['<99>{#p/basic}{~}The gaze\nis\nstrong\nwith\nthis one.'],
        flirtDeny1: ['<08>{#p/basic}{~}How tsundere of you.'],
        flirtTalk1: ['<08>{#p/basic}{~}What? N-no way!'],
        hurtStatus: ['<32>{#p/story}* Oculoux is watering.'],
        idleTalk1: ["<08>{#p/basic}{~}I've got my eye on you."],
        idleTalk2: ["<08>{#p/basic}{~}Don't tell me what to do."],
        idleTalk3: ['<08>{#p/basic}{~}Staring is caring.'],
        idleTalk4: ['<08>{#p/basic}{~}What an eyesore.'],
        idleTalk5: ['<08>{#p/basic}{~}How about a staring contest?'],
        name: '* Oculoux',
        pickTalk1: ['<08>{#p/basic}{~}How dare you question our way of life!'],
        spareStatus: ["<32>{#p/story}* Oculoux doesn't care about fighting anymore."],
        status1: ['<32>{#p/story}* A pair of Oculoux walked in!'],
        status2: ['<32>{#p/story}* Oculoux is staring right through you.'],
        status3: ['<32>{#p/story}* Oculoux gnashes its teeth.'],
        status4: ['<32>{#p/story}* Smells like eyedrops.'],
        status5: ['<32>{#p/story}* Oculoux has gone bloodshot.'],
        status6: ['<32>{#p/story}* Oculoux is gazing at you.'],
        status7: ['<32>{#p/story}* Oculoux is now alone.']
    },
    b_opponent_migosp: {
        act_check: ["<32>{#p/story}* SILENTE - ATK 7 DEF 5\n* It seems evil, but it's just with the wrong crowd..."],
        act_check2: ['<33>{#p/story}* SILENTE - ATK 7 DEF 5\n* Now alone, it joyfully expresses itself through dance.'],
        act_check3: ['<32>{#p/story}* SILENTE - ATK 7 DEF 5\n* It seems comfortable with you.\n* VERY comfortable.'],
        act_check4: ["<32>{#p/story}* SILENTE - ATK 7 DEF 5\n* Despite its tough act, it's clearly in pain..."],
        act_flirt: ['<32>{#p/human}* (You flirt with Silente.)'],
        flirtTalk: ['<08>{#p/basic}{~}Hiya~'],
        groupInsult: ["<32>{#p/human}* (You try insulting Silente, but it's too focused on the others.)"],
        groupStatus1: ['<32>{#p/story}* Silente is whispering to the others.'],
        groupStatus2: ["<32>{#p/story}* It's starting to smell like a roach motel."],
        groupTalk1: ['<08>{#p/basic}FILTHY SINGLE MINDER\n..'],
        groupTalk2: ['<08>{#p/basic}OBEY THE OVERMIND\n..'],
        groupTalk3: ['<08>{#p/basic}LEGION! WE ARE LEGION!'],
        groupTalk4: ['<08>{#p/basic}HEED THE SWARM\n..'],
        groupTalk5: ['<08>{#p/basic}IN UNISON, NOW\n..'],
        groupTalk6: ["<08>{#p/basic}I DON'T CARE."],
        name: '* Silente',
        perilStatus: ['<32>{#p/story}* Silente refuses to give up.'],
        soloInsult: ["<32>{#p/human}* (You try insulting Silente, but it's too happy to care.)"],
        soloStatus: ["<32>{#p/story}* Silente doesn't have a care in the cosmos."],
        soloTalk1: ["<08>{#p/basic}{~}Bein' me is the best!"],
        soloTalk2: ['<08>{#p/basic}{~}La la~ Just be your- self~'],
        soloTalk3: ["<08>{#p/basic}{~}Nothin' like alone time!"],
        soloTalk4: ['<08>{#p/basic}{~}Mmm, cha cha cha!'],
        soloTalk5: ['<08>{#p/basic}{~}Swing your arms, baby~']
    },
    b_opponent_mushy: {
        act_challenge: [
            '<32>{#p/human}* (You challenge Mushy to a duel.)',
            "<33>{#p/story}* Mushy's SPEED up for this turn!"
        ],
        act_check: ['<32>{#p/story}* MUSHY - ATK 6 DEF 6\n* Huge fan of space cowboys.\n* Gunslinger.'],
        act_check2: ['<32>{#p/story}* MUSHY - ATK 6 DEF 6\n* Huge fan of space cowboys.\n* Even the sexy ones.'],
        act_check3: ['<32>{#p/story}* MUSHY - ATK 6 DEF 6\n* After giving it your all, this gunslinger is impressed.'],
        act_flirt: ['<32>{#p/human}* (You flirt with Mushy.)'],
        act_taunt: ['<32>{#p/human}* (You taunt Mushy.)'],
        challengeStatus: ['<32>{#p/story}* Mushy awaits your next challenge.'],
        challengeTalk1: ["<08>{#p/basic}{~}Let's see what you got."],
        challengeTalk2: ['<08>{#p/basic}{~}Think you can take me?'],
        flirtStatus1: ['<32>{#p/story}* Mushy, the confused and the aroused.'],
        flirtTalk1: ['<08>{#p/basic}{~}H-hey, knock it off!'],
        hurtStatus: ['<32>{#p/story}* Mushy makes a last stand.'],
        idleTalk1: ['<08>{#p/basic}{~}Bang!\nBang!\nBang!'],
        idleTalk2: ['<08>{#p/basic}{~}Saddle up!'],
        idleTalk3: ["<08>{#p/basic}{~}All in a day's."],
        name: '* Mushy',
        spareStatus: ['<32>{#p/story}* Mushy bows out of respect.'],
        status1: ['<32>{#p/story}* Mushy stormed in!'],
        status2: ['<32>{#p/story}* Mushy adjusts their stance.'],
        status3: ['<32>{#p/story}* Mushy is preparing for a grand standoff.'],
        status4: ['<32>{#p/story}* Mushy reaches for their holster.'],
        status5: ['<32>{#p/story}* Smells like petrichor.'],
        tauntStatus1: ["<32>{#p/story}* Mushy pretends they aren't bothered by your taunts."],
        tauntTalk1: ["<08>{#p/basic}{~}As if that'll work on me."]
    },
    b_opponent_napstablook: {
        act_check: ["<32>{#p/story}* NAPSTABLOOK - ATK 10 DEF 255\n* It's Napstablook."],
        act_check2: [
            "<32>{#p/story}* NAPSTABLOOK - ATK 10 DEF 255\n* It doesn't seem like they want to be here anymore."
        ],
        act_check3: ['<32>{#p/story}* NAPSTABLOOK - ATK 10 DEF 255\n* Hopeful, for the first time in a while...'],
        act_check4: ['<32>{#p/story}* NAPSTABLOOK - ATK 10 DEF 255\n* The romantic tension is at an all-time high.'],
        awkwardTalk: ['<11>{#p/napstablook}{~}uh...', '<11>{#p/napstablook}{~}okay, i guess...?'],
        checkTalk: ["<11>{#p/napstablook}{~}that's me..."],
        cheer0: ['<32>{#p/human}* (You try to console Napstablook.)'],
        cheer1: ['<32>{#p/human}* (You give Napstablook a patient smile.)'],
        cheer2: ['<32>{#p/human}* (You tell Napstablook a little joke.)'],
        cheer3: ["<32>{#p/human}* (You show adoration for Napstablook's top hat.)"],
        cheerTalk1: ['<11>{#p/napstablook}{~}...?'],
        cheerTalk2: ['<11>{#p/napstablook}{~}heh heh...'],
        cheerTalk3: [
            '<11>{*}{#p/napstablook}{~}let me {#x1}try...{^20}{#x2}{^20}{%}',
            "<11>{*}{#p/napstablook}{~}i call it {#x3}'dapper blook'{^40}{%}",
            '<11>{*}{#p/napstablook}{~}do you like it?{^40}{%}'
        ],
        cheerTalk4: ['<11>{#p/napstablook}{~}oh gee.....'],
        consoleTalk1: ['<11>{#p/napstablook}{~}yeah, yeah...'],
        consoleTalk2: ['<11>{#p/napstablook}{~}not buying it...'],
        consoleTalk3: ["<11>{#p/napstablook}{~}you're not sorry..."],
        deadTalk: [
            "<11>{#p/napstablook}{~}umm... you do know you can't kill ghosts, right...",
            "<11>{~}we're sorta incorporeal and all",
            "<11>{~}i was just lowering my hp because i didn't want to be rude",
            '<11>{~}sorry... i just made this more awkward...',
            '<11>{~}pretend you beat me...',
            '<11>{~}ooooooooo'
        ],
        flirt1: ['<32>{#p/human}* (You flirt with Napstablook.)'],
        flirt2: ['<32>{#p/human}* (You try your best pickup line on Napstablook.)'],
        flirt3: ['<32>{#p/human}* (You give Napstablook a heartfelt compliment.)'],
        flirt4: ['<32>{#p/human}* (You reassure Napstablook of your feelings towards them.)'],
        flirtTalk1: ["<11>{#p/napstablook}{~}i'd just weigh you down"],
        flirtTalk2: ["<11>{#p/napstablook}{~}oh.....\ni've heard that one....."],
        flirtTalk3: ['<11>{#p/napstablook}{~}uh... you really think so?'],
        flirtTalk4: ["<11>{#p/napstablook}{~}oh, you're serious...", '<11>{~}oh no.....'],
        idleTalk1: ["<11>{#p/napstablook}{~}i'm fine, thanks"],
        idleTalk2: ['<11>{#p/napstablook}{~}just pluggin along...'],
        idleTalk3: ['<11>{#p/napstablook}{~}just doing my thing...'],
        insultTalk1: ['<11>{#p/napstablook}{~}i knew it...'],
        insultTalk2: ['<11>{#p/napstablook}{~}whatever...'],
        insultTalk3: ['<11>{#p/napstablook}{~}say what you will...'],
        insultTalk4: ['<11>{#p/napstablook}{~}let it all out...'],
        name: '* Napstablook',
        silentTalk: ['<11>{#p/napstablook}{~}...'],
        sincere: ["<32>{#p/human}* (You flirtatiously comment on Napstablook's top hat.)"],
        sincereTalk: ['<11>{#p/napstablook}{~}heh... thanks'],
        status1: ['<32>{#p/story}* Here comes Napstablook.'],
        status2: ['<32>{#p/story}* Napstablook looks just a little better.'],
        status3: ['<32>{#p/story}* Napstablook wants to show you something.'],
        status3a: ['<32>{#p/story}* Napstablook awaits your reply.'],
        status4: ["<32>{#p/story}* Napstablook's eyes are glistening."],
        status5: ['<32>{#p/story}* Napstablook is clearly not sure how to handle this.'],
        status5a: ['<32>{#p/story}* Napstablook is questioning their very being.'],
        status6: ['<32>{#p/story}* Napstablook is biding their time.'],
        status7: ['<32>{#p/story}* Napstablook is waiting for your next move.'],
        status8: ['<32>{#p/story}* Napstablook is staring off into the distance.'],
        status9: ["<32>{#p/story}* Napstablook is wishing they weren't here."],
        status10: ['<32>{#p/story}* Napstablook is trying their best to ignore you.'],
        suck: ['<32>{#p/human}* (You tell Napstablook their hat sucks bad.)'],
        threat: ['<32>{#p/human}* (You threaten Napstablook.)']
    },
    b_opponent_toriel: {
        spannerText: ['<32>{#p/human}* (You throw the spanner.)\n* (Toriel picks it up and returns it to you.)'],
        spannerTalk: ['<11>{#p/toriel}{#f/22}That will accomplish nothing, my child.'],
        spannerTalkRepeat: ['<11>{#p/toriel}{#f/22}...'],
        act_check: ['<32>{#p/story}* TORIEL - ATK 80 DEF 80\n* Knows best for you.'],
        act_check2: ['<32>{#p/story}* TORIEL - ATK 80 DEF 80\n* Seems to be holding back.'],
        act_check3: ['<32>{#p/story}* TORIEL - ATK 80 DEF 80\n* Looks pre-occupied.'],
        act_check4: ['<32>{#p/story}* TORIEL - ATK 80 DEF 80\n* Just wants the best for you.'],
        act_check5: ['<32>{#p/story}* TORIEL - ATK 80 DEF 80\n* Thinks you are \"adorable.\"'],
        precrime: ['<20>{#p/asriel2}...'],
        criminal1: (reveal: boolean) => [
            '<20>{#p/asriel2}{#f/3}Howdy, $(name).',
            "<20>{#f/1}It's good to be back.",
            "<20>{#f/2}What's that?\nYou didn't expect to see me again?",
            '<20>{#f/13}...\nOh, $(name)...',
            ...(reveal
                ? ["<20>{#f/1}I've been waiting for this for a long time."]
                : [
                    "<20>{#f/15}I've been trapped inside a star for so long, I...",
                    '<20>{#f/15}...',
                    "<20>{#f/16}Well, that's not important now.",
                    '<20>{#f/1}What matters is that things are back to how they should be.'
                ]),
            '<20>{#f/1}Hee hee hee...',
            "<20>{#f/2}I know you're empty inside, just like me.",
            "<20>{#f/5}We're still inseparable after all these years...",
            "<20>{#f/1}Listen.\nI have a plan that'll bring us closer than ever.",
            '<20>{#f/1}With me, you, and our stolen SOULs...',
            "<20>{#f/1}Let's destroy everything on this wretched outpost.",
            '<21>{#f/2}Anyone who dares to stand in the way of our perfect future...',
            "<20>{#f/1}Let's turn 'em all to dust."
        ],
        criminal2: ['<20>{#p/asriel2}{#f/3}Welcome back, $(name).', '<20>{#f/1}Ready to pick up where we last left off?'],
        criminal3: ['<20>{#p/asriel2}{#f/3}Well then.', '<20>{#f/3}...', "<20>{#f/4}Let's just get going."],
        cutscene1: [
            "<32>{#p/basic}* Maybe because I'm the only one you'll listen to.",
            '<25>{#p/toriel}{#f/16}* ...!?',
            "<32>{#p/basic}* But what do I know, huh?\n* I'm just a sweet, innocent little child."
        ],
        cutscene2: [
            '<25>{#p/toriel}{#f/3}* ...',
            '<25>{#p/toriel}{#f/4}* This is impossible...',
            '<25>{#f/0}* I must be dreaming.\n* Or hallucinating.\n* Or maybe...',
            '<32>{#p/basic}* No.',
            '<32>{#p/basic}* This is real.',
            '<25>{#p/toriel}{#f/5}* But you died, $(name).',
            '<25>{#f/5}* You cannot possibly be speaking to me.',
            "<32>{#p/basic}* Pretend it's a dream, then.",
            '<32>{#p/basic}* If that works for you.',
            '<25>{#p/toriel}{#f/5}* ...',
            '<25>{#p/toriel}{#f/9}* What do you want?',
            '<32>{#p/basic}* Toriel...',
            "<32>{#p/basic}* You know how I feel about humanity, don't you?",
            '<25>{#p/toriel}{#f/13}* Right.',
            '<32>{#p/basic}* Wrong.',
            '<32>{#p/basic}* ... not about this human.',
            "<32>* Ever since they got here, I've been following them...",
            "<32>* And now they're asking me to reach out to you.",
            '<32>* What do you think that means?',
            '<25>{#p/toriel}{#f/13}* ...',
            '<32>{#p/basic}* It means you have to let them go.',
            '<25>{#p/toriel}{#f/12}* ... do you not understand what is at stake?',
            '<25>{#f/11}* If I let them go, they will surely die.',
            '<32>{#p/basic}* ... come on.',
            "<32>{#p/basic}* That's not really why you're doing this, is it?",
            '<25>{#p/toriel}{#f/12}* With that attitude, perhaps you really are $(name).',
            '<25>{#p/toriel}{#f/11}* You always did question my authority.',
            '<32>{#p/basic}* I think I have every right to.',
            '<32>{#p/basic}* You wish to keep them here because you are afraid of what lies beyond the Outlands.',
            "<33>{#p/basic}* But things aren't the same as they were a hundred years ago.",
            "<33>{#p/basic}* You're only ignorant about it because you're too afraid to go see for yourself.",
            '<25>{#p/toriel}{#f/13}* ...',
            "<25>{#p/toriel}{#f/13}* ... but if I let them go, I won't be able to...",
            '<32>{#p/basic}* Be there for them?',
            '<32>{#p/basic}* Hey, I know the feeling.',
            '<32>{#p/basic}* But keeping them here would be dooming them to death anyway.',
            "<32>{#p/basic}* What's a life if it doesn't get to do anything worth living for?",
            '<25>{#p/toriel}{#f/13}* ...',
            '<25>{#p/toriel}{#f/13}* $(name), I...',
            '<32>{#p/basic}* You gave them a spare cell phone, remember?',
            "<32>{#p/basic}* Keep the line open, and maybe they'll give you a call.",
            '<25>{#p/toriel}{#f/9}* ... and what about you?',
            "<32>{#p/basic}* Look.\n* I'll be alright.",
            "<32>{#p/basic}* All I ask is that you don't forget about THEM after they're gone.",
            '<25>{#p/toriel}{#f/13}* ...',
            '<32>{#p/basic}* Goodbye, Toriel.',
            '<25>{#p/toriel}{#f/14}* ... goodbye, $(name).'
        ],
        death1: [
            '<11>{#p/toriel}{#f/21}{#v/1}{#i/3}{#x1}{@random=1.1/1.1}Urgh...',
            '<11>{#v/1}{#i/3}{#x1}{@random=1.1/1.1}To strike me down at my weakest moment...',
            '<11>{#v/1}{#i/3}{#x1}{@random=1.1/1.1}...',
            '<11>{#v/2}{#i/4}{#x2}{@random=1.1/1.1}Ha...\nHa...',
            '<11>{#v/2}{#i/4}{#x2}{@random=1.1/1.1}It seems, young one...',
            '<11>{#v/3}{#i/5}{#x2}{@random=1.2/1.2}I was a fool for trusting you... all along...'
        ],
        death2: [
            '<11>{#p/toriel}{#f/21}{#v/1}{#i/3}{#x1}{@random=1.1/1.1}Urgh...',
            '<11>{#v/1}{#i/3}{#x3}{@random=1.1/1.1}To think I was protecting you from them...',
            '<11>{#v/1}{#i/3}{#x4}{@random=1.1/1.1}...',
            '<11>{#v/2}{#i/4}{#x2}{@random=1.1/1.1}Ha...\nHa...',
            '<11>{#v/2}{#i/4}{#x1}{@random=1.1/1.1}It seems, young one...',
            '<11>{#v/3}{#i/5}{#x2}{@random=1.2/1.2}I was actually protecting them... from you...'
        ],
        death3: [
            '<11>{#p/toriel}{#f/21}{#v/1}{#i/3}{#x1}{@random=1.1/1.1}Urgh...',
            '<11>{#v/1}{#i/3}{#x1}{@random=1.1/1.1}You are stronger than I thought...',
            '<11>{#v/1}{#i/3}{#x3}{@random=1.1/1.1}Listen to me, young one...',
            '<11>{#v/1}{#i/3}{#x3}{@random=1.1/1.1}In a few moments, I will turn to dust...',
            '<11>{#v/1}{#i/3}{#x3}{@random=1.1/1.1}When that happens, you must take my SOUL...',
            '<11>{#v/1}{#i/3}{#x1}{@random=1.1/1.1}It is the only real way you can escape this place.',
            "<11>{#v/2}{#i/4}{#x3}{@random=1.1/1.1}You cannot... allow ASGORE's plan to... succeed...",
            '<11>{#v/2}{#i/4}{#x1}{@random=1.1/1.1}...',
            '<11>{#v/3}{#i/5}{#x2}{@random=1.2/1.2}My child...',
            "<11>{#v/3}{#i/5}{#x4}{@random=1.2/1.2}Be good... won't you?"
        ],
        magic1: ['<20>{#p/asriel2}{#f/3}Follow me.'],
        name: '* Toriel',
        spareTalk1: ['<11>{#p/toriel}{#f/11}...'],
        spareTalk2: ['<11>{#p/toriel}{#f/11}...\n...'],
        spareTalk3: ['<11>{#p/toriel}{#f/11}...\n...\n...'],
        spareTalk4: ['<11>{#p/toriel}{#f/17}...?'],
        spareTalk5: ['<11>{#p/toriel}{#f/17}What are you doing?'],
        spareTalk6: ['<11>{#p/toriel}{#f/17}...'],
        spareTalk7: ['<11>{#p/toriel}{#f/17}What are you trying to prove?'],
        spareTalk8: ['<11>{#p/toriel}{#f/17}...'],
        spareTalk9: ['<11>{#p/toriel}{#f/12}Fight me or leave!'],
        spareTalk10: ['<11>{#p/toriel}{#f/12}Stop looking at me that way!'],
        spareTalk11: ['<11>{#p/toriel}{#f/12}Go away!'],
        spareTalk12: ['<11>{#p/toriel}{#f/13}...'],
        spareTalk13: ['<11>{#p/toriel}{#f/13}...\n...'],
        spareTalk14: ['<11>{#p/toriel}{#f/13}...\n...\n...'],
        spareTalk15: [
            '<11>{#p/toriel}{#f/13}I know you want to go home...',
            '<11>{#p/toriel}{#f/9}But the path to get there would be dangerous.'
        ],
        spareTalk16: ['<11>{#p/toriel}{#f/14}So please... go back the other way.'],
        spareTalk17: [
            '<11>{#p/toriel}{#f/13}I know we do not have much...',
            '<11>{#p/toriel}{#f/10}But we can still have a good life.'
        ],
        spareTalk18: [
            '<11>{#p/toriel}{#f/13}You and I, like a family...',
            '<11>{#p/toriel}{#f/10}Does that not sound good?'
        ],
        spareTalk19: ['<11>{#p/toriel}{#f/21}...'],
        spareTalk20: ['<11>{#p/toriel}{#f/18}Why are you making this so difficult?'],
        spareTalk21: ['<11>{#p/toriel}{#f/21}...'],
        spareTalk22: ['<11>{#p/toriel}{#f/18}Please, just...', '<11>{#p/toriel}{#f/9}Go back the other way.'],
        spareTalk23: ['<11>{#p/toriel}{#f/21}...'],
        spareTalk24: ['<11>{#p/toriel}{#f/18}Oh, child...'],
        spareTalk28b: [
            '<11>{#p/toriel}{#f/9}Maybe it was foolish of me...',
            '<11>{#f/13}Trying to stop you like this...',
            '<11>{#f/9}Maybe I should have just let you go.'
        ],
        spareTalk28c: ['<11>{#p/toriel}{#f/17}...?', '<11>{#f/17}Why are you calling out for \"$(name)?\"'],
        status1: ['<32>{#p/story}* Toriel now stands before you.'],
        status2: ['<32>{#p/story}* Toriel prepares a magical attack.'],
        status3: ['<32>{#p/story}* Toriel is acting aloof.'],
        status4: ['<32>{#p/story}* Toriel is looking through you.'],
        status5: ['<32>{#p/story}* ...'],
        assistStatus: ['<32>{#p/basic}* There must be another way...'],
        talk1: ['<32>{#p/human}* (You ask Toriel to let you through.)\n* (No effect.)'],
        talk2: ["<32>{#p/human}* (You ask Toriel why she's really doing this.)\n* (She winces briefly.)"],
        talk3: ['<32>{#p/human}* (You begged Toriel to stop.)\n* (She hesitates.)'],
        talk4: [
            '<32>{#p/human}* (You once again begged Toriel to stop.)',
            '<32>{#p/basic}* ... perhaps there is too much at stake for her.'
        ],
        talk5: ['<32>{#p/human}* (You yell at Toriel.)\n* (She closes her eyes and takes a deep breath.)'],
        talk6: [
            '<32>{#p/human}* (You once again yell at Toriel.)',
            "<32>{#p/basic}* ... perhaps talking won't do anymore good."
        ],
        talk7: ["<32>{#p/human}* (But you couldn't think of anything else to say.)"],
        talk8: ['<32>{#p/human}* (But there was no sense in doing that now.)'],
        theft: ['<20>{*}{#p/twinkly}Mine.{^15}{%}']
    },

    c_name_outlands: {
        hello: 'Say Hello',
        about: 'About Yourself',
        mom: 'Call Her \"Mom\"',
        flirt: 'Flirt',
        toriel: "Toriel's Phone",
        puzzle: 'Puzzle Help',
        insult: 'Insult'
    },

    c_call_outlands: {
        about1: [
            '<25>{#p/toriel}{#f/1}* You want to know more about me...?',
            '<25>{#f/0}* Well, I am afraid there is not much to say.',
            '<25>{#f/0}* I am but a silly old lady who worries too often!'
        ],
        about2: [
            '<25>{#p/toriel}{#f/1}* If you really want to know more about me...',
            '<25>{#f/1}* Why not take a look around...?',
            '<25>{#f/0}* I have built or at least helped to build much of what you see.'
        ],
        about3: [
            '<25>{#p/toriel}{#f/1}* If you really want to know more about me...',
            '<25>{#f/2}* You should think twice about insulting me over the phone!'
        ],
        flirt1: [
            '<25>{#p/toriel}{#f/7}* ... huh?',
            '<25>{#f/1}* Oh, heh... heh...',
            '<25>{#f/6}* Hahaha!\n* I could pinch your cheek!',
            '<25>{#f/0}* You can certainly find better than an old woman like me.'
        ],
        flirt2: [
            '<25>{#p/toriel}{#f/7}* ...\n* Oh dear, are you serious...?',
            '<25>{#f/1}* My child, I do not know if this is pathetic or endearing.'
        ],
        flirt3: [
            '<25>{#p/toriel}{#f/7}* ...\n* Oh dear, are you serious...?',
            '<25>{#f/5}* And after you called me \"Mother...\"',
            '<25>{#f/1}* Well then.\n* You are a very \"interesting\" child.'
        ],
        flirt4: ['<25>{#p/toriel}{#f/3}* ...', '<25>{#p/toriel}{#f/4}* I cannot begin to understand you.'],
        hello: [
            [
                '<25>{#p/toriel}* This is Toriel.',
                '<25>{#f/1}* You only wanted to say hello...?',
                '<25>{#f/0}* Well then.\n* \"Hello!\"',
                '<25>{#f/0}* I hope that suffices.\n* Hee hee.'
            ],
            [
                '<25>{#p/toriel}* This is Toriel.',
                '<25>{#f/1}* You wanted to say hello again?',
                '<25>{#f/0}* \"Salutations\" it is!',
                '<25>{#f/1}* Is that enough?'
            ],
            [
                '<25>{#p/toriel}{#f/1}* Are you bored?',
                '<25>{#f/0}* My apologies.\n* I should have given you something to do.',
                '<25>{#f/1}* Why not use your imagination to distract yourself?',
                '<25>{#f/0}* Pretend you are... a fighter pilot!',
                '<25>{#f/1}* Twisting and twirling, doing barrel rolls at light speed...',
                '<25>{#f/1}* Can you do that for me?'
            ],
            [
                '<25>{#p/toriel}{#f/5}* Hello, small one.',
                '<25>{#f/9}* I am sorry, but I do not have much else to say.',
                '<25>{#f/1}* It was nice to hear your voice, though...'
            ]
        ],
        helloX: ['<25>{#p/toriel}{#g/torielLowConcern}* Hello?'],
        mom1: [
            '<25>{#p/toriel}* ...',
            '<25>{#f/7}* Huh?\n* Did you just call me \"Mom?\"',
            '<25>{#f/1}* Well...\n* I suppose...',
            '<25>{#f/1}* Would that make you happy?',
            '<25>{#f/1}* To call me...\n* \"Mother?\"',
            '<25>{#f/0}* Well then.\n* Call me whatever you like!'
        ],
        mom2: ['<25>{#p/toriel}{#f/7}* ...\n* Oh my... again?', '<25>{#f/0}* Hee hee...\n* You are a very sweet child.'],
        mom3: [
            '<25>{#p/toriel}{#f/7}* ...\n* Oh my... again?',
            '<25>{#f/5}* And after you flirted with me...',
            '<25>{#f/1}* Well then.\n* You are a very \"interesting\" child.'
        ],
        mom4: ['<25>{#p/toriel}{#f/5}* ...'],
        puzzle1: [
            '<25>{#p/toriel}{#f/1}* Help with a puzzle...?',
            '<25>{#f/1}* You have not left the room yet, have you?',
            '<25>{#f/0}* Wait for me to return, and we can solve it together.'
        ],
        puzzle2: [
            '<25>{#p/toriel}{#f/1}* Help with a puzzle...?',
            '<25>{#f/23}* ... something tells me you do not sincerely need my help.'
        ],
        puzzle3: [
            '<25>{#p/toriel}{#f/1}* Help with a puzzle...?',
            '<25>{#f/5}* ...\n* I am afraid I cannot help you at this time.',
            '<25>{#f/0}* Wait for me to return, and we can solve it together.'
        ],
        insult1: (sus: boolean) =>
            sus
                ? [
                    '<25>{#p/toriel}{#f/0}* Hello?\n* This is...',
                    '<25>{#f/2}* ...!',
                    '<25>{#f/3}* Would you mind repeating that for me?'
                ]
                : [
                    '<25>{#p/toriel}{#f/0}* Hello?\n* This is...',
                    '<25>{#f/2}* ...!',
                    '<25>{#f/1}* My child... I do not think that means what you think it means.'
                ],
        insult2: (sus: boolean) =>
            sus
                ? ['<25>{#p/toriel}{#f/15}* ...', '<25>{#f/12}* I am going to pretend you did not just say that to me.']
                : ['<25>{#p/toriel}{#f/1}* My child...']
    },

    i_candy: {
        battle: {
            description: 'Has a distinct, non-licorice flavor.',
            name: 'Doce'
        },
        drop: ['<32>{#p/human}* (You throw away the Monster Candy.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (10 HP.)']
                : ['<32>{#p/basic}* \"Monster Candy\" Heals 10 HP\n* Has a distinct, non-licorice flavor.'],
        name: 'Monster Candy',
        use: ['<32>{#p/human}* (You eat the Monster Candy.)']
    },
    i_water: {
        battle: {
            description: 'Smells like Dihydrogen Monoxide.',
            name: 'Água'
        },
        drop: ['<32>{#p/human}* (You throw away the Water.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (12 HP.)']
                : ['<32>{#p/basic}* \"Water\" Heals 12 HP\n* Smells like Di-Hydrogen Monoxide.'],
        name: 'Água',
        use: () => [
            '<32>{#p/human}* (You drink the Water.)',
            ...(SAVE.data.b.ufokinwotm8 ? [] : ["<33>{#p/human}* (You're filled with hydration.)"]) 
        ]
    },
    i_chocolate: {
        battle: {
            description: 'A well-deserved chocolate bar.',
            name: 'Chocolate'
        },
        drop: () => [
            '<32>{#p/human}* (You throw away the Chocolate Bar.)',
            ...(SAVE.data.b.svr || world.darker ? [] : ['<32>{#p/basic}* ... oh well.'])
        ],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (19 HP. This item seems to remind you of someone.)']
                : ['<32>{#p/basic}* \"Chocolate Bar\" Heals 19 HP\n* It\'s a well-deserved treat.'],
        name: 'Chocolate Bar',
        use: () => [
            '<32>{#p/human}* (You eat the Chocolate Bar.)',
            ...(battler.active && battler.alive[0].opponent.metadata.reactChocolate
                ? ['<32>{#p/basic}* Toriel recognizes the scent, and smiles a little.']
                : [])
        ]
    },
    i_delta: {
        battle: {
            description: 'This substance is said to have highly relaxing properties.',
            name: 'Δ-9'
        },
        drop: ['<32>{#p/human}* (You throw away the Δ-9.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (5 HP. You feel strangely about this item.)']
                : ['<32>{#p/basic}* \"Δ-9\" Heals 5 HP\n* This substance is said to have highly relaxing properties.'],
        name: 'Δ-9',
        use: ['<32>{#p/human}* (You ingest the Δ-9.)']
    },
    i_halo: {
        battle: {
            description: 'A headband with its own gravity field.',
            name: 'Halo'
        },
        drop: ['<32>{#p/human}* (You fling the Halo away like a frisbee.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (3 DF.)']
                : ['<32>{#p/basic}* \"Halo\" (3 DF)\n* A headband with its own gravity field.'],
        name: 'Halo',
        use: () => [
            '<32>{#p/human}* (You don the Halo.)',
            ...(SAVE.data.b.svr && !SAVE.data.b.freedom && asrielinter.i_halo_use++ < 1
                ? ['<25>{#p/asriel1}{#f/20}* I think it suits you.']
                : [])
        ]
    },
    i_little_dipper: {
        battle: {
            description: 'A whacking spoon.',
            name: 'Dipper'
        },
        drop: ['<32>{#p/human}* (You throw away the Little Dipper.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (3 AT.)']
                : ['<32>{#p/basic}* \"Little Dipper\" (3 AT)\n* A whacking spoon.'],
        name: 'Little Dipper',
        use: ['<32>{#p/human}* (You equip the Little Dipper.)']
    },
    i_pie: {
        battle: {
            description: 'Homemade butterscotch-cinnamon pie, one slice.',
            name: 'Pie'
        },
        drop: ['<32>{#p/human}* (You throw away the Butterscotch Pie.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (99 HP.)']
                : ['<32>{#p/basic}* \"Butterscotch Pie\" Heals 99 HP\n* Homemade butterscotch-cinnamon pie, one slice.'],
        name: 'Butterscotch Pie',
        use: ['<32>{#p/human}* (You eat the Butterscotch Pie.)']
    },
    i_pie2: {
        battle: {
            description: 'Classic family recipe.',
            name: 'Snail Pie'
        },
        drop: ['<32>{#p/human}* (You throw away the Snail Pie.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (99 HP.)']
                : ['<32>{#p/basic}* \"Snail Pie\" Heals 99 HP\n* Classic family recipe.'],
        name: 'Snail Pie',
        use: ['<32>{#p/human}* (You eat the Snail Pie.)']
    },
    i_pie3: {
        battle: {
            description: 'Despite being soup-ified, the pie remains delicious.',
            name: 'Pie Soup'
        },
        drop: ['<32>{#p/human}* (You dump the Pie Soup and the spoon that came with it.)'],
        info: ['<32>{#p/basic}* \"Pie Soup\" Heals 49 HP\n* Despite being soup-ified, the pie remains delicious.'],
        name: 'Pie Soup',
        use: ['<32>{#p/human}* (You consume the Pie Soup with the provided spoon.)']
    },
    i_pie4: {
        battle: {
            description: 'Actions do have their consequences...',
            name: 'Burnt Pie'
        },
        drop: ['<32>{#p/human}* (You toss the Burnt Pie to the side like it never existed.)'],
        info: ['<32>{#p/basic}* \"Burnt Pie\" Heals 39 HP\n* Actions do have their consequences...'],
        name: 'Burnt Pie',
        use: ['<32>{#p/human}* (You eat the Burnt Pie.)']
    },
    i_snails: {
        battle: {
            description: 'A plate of fried snails.\nFor breakfast, of course.',
            name: 'Snails'
        },
        drop: ['<32>{#p/human}* (You throw away the Fried Snails.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (19 HP.)']
                : ['<32>{#p/basic}* \"Fried Snails\" Heals 19 HP\n* A plate of fried snails.\n* For breakfast, of course.'],
        name: 'Fried Snails',
        use: ['<32>{#p/human}* (You eat the Fried Snails.)']
    },
    i_soda: {
        battle: {
            description: 'A sickly, dark yellow liquid.',
            name: 'Soda'
        },
        drop: () => [
            '<32>{#p/human}* (You throw away the Fizzli Soda.)',
            ...(SAVE.data.b.svr || world.darker ? [] : ['<32>{#p/basic}* Good riddance.'])
        ],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (8 HP.)']
                : ['<32>{#p/basic}* \"Fizzli Soda\" Heals 8 HP\n* A dark, sickly yellow liquid.'],
        name: 'Fizzli Soda',
        use: () => [
            '<32>{#p/human}* (You drink the Fizzli Soda.)',
            ...(SAVE.data.b.svr || world.darker ? [] : ['<32>{#p/basic}* Yuck!'])
        ]
    },
    i_spacesuit: {
        battle: {
            description: 'It came with the craft you crash-landed in.',
            name: 'Spacesuit'
        },
        drop: ['<32>{#p/human}* (You throw away the Worn Spacesuit.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (20 HP. The last remaining fragment of a spacecraft flown in exile.)']
                : ['<32>{#p/basic}* \"Worn Spacesuit\" Heals 20 HP\n* It came with the craft you crash-landed in.'],
        name: 'Worn Spacesuit',
        use: ['<33>{#p/human}* (After using its last heal-pak, the Worn Spacesuit fell apart.)']
    },
    i_spanner: {
        battle: {
            description: 'A rusty old wrench.',
            name: 'Spanner'
        },
        drop: ['<32>{#p/human}* (You throw away the Rusty Spanner.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ["<32>{#p/human}* (A trusty tool forged from beyond the galaxy's edge.)"]
                : ['<32>{#p/basic}* A rusty old wrench.'],
        name: 'Rusty Spanner',
        use: () => [
            ...(battler.active && battler.alive[0].opponent.metadata.reactSpanner
                ? []
                : ['<32>{#p/human}* (You toss the spanner into the air.)\n* (Nothing happens.)'])
        ]
    },
    i_starbertA: {
        battle: {
            description: 'The first of a limited run of Super Starwalker comics.',
            name: 'Starwalker 1'
        },
        drop: ['<32>{#p/human}* (You throw away Super Starwalker 1.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (It seems like the beginning of a journey.)']
                : ['<32>{#p/basic}* The first of a limited run of Super Starwalker comics.'],
        name: 'Super Starwalker 1',
        use: () => (battler.active ? ['<32>{#p/human}* (You read Super Starwalker 1.)', '<32>* (Nothing happens.)'] : [])
    },
    i_starbertB: {
        battle: {
            description: 'The second of a limited run of Super Starwalker comics.',
            name: 'Starwalker 2'
        },
        drop: ['<32>{#p/human}* (You throw away Super Starwalker 2.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (It seems like the middle of a journey.)']
                : ['<32>{#p/basic}* The second of a limited run of Super Starwalker comics.'],
        name: 'Super Starwalker 2',
        use: () =>
            battler.active
                ? [
                    '<32>{#p/human}* (You read Super Starwalker 2.)',
                    ...(SAVE.data.b.stargum
                        ? ['<32>* (Nothing happens.)']
                        : [
                            '<32>* (You found a piece of gum taped to the comic strip.)',
                            choicer.create('* (Use the gum?)', 'Sim', 'Não')
                        ])
                ]
                : []
    },
    i_starbertC: {
        battle: {
            description: 'The third of a limited run of Super Starwalker comics.',
            name: 'Starwalker 3'
        },
        drop: ['<32>{#p/human}* (You throw away Super Starwalker 3.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (It seems like the end of a journey... or is it a new beginning?)']
                : ['<32>{#p/basic}* The third of a limited run of Super Starwalker comics.'],
        name: 'Super Starwalker 3',
        use: () => (battler.active ? ['<32>{#p/human}* (You read Super Starwalker 3.)', '<32>* (Nothing happens.)'] : [])
    },
    i_steak: {
        battle: {
            description: 'Questionable at best.',
            name: 'Steak'
        },
        drop: () => [
            '<32>{#p/human}* (You throw away the Sizzli Steak.)',
            ...(SAVE.data.b.svr || world.darker || SAVE.data.b.ufokinwotm8
                ? []
                : ["<32>{#p/basic}* Well, that won't be missed."])
        ],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (14 HP.)']
                : ['<32>{#p/basic}* \"Sizzli Steak\" Heals 14 HP\n* Questionable.'],
        name: 'Sizzli Steak',
        use: () => [
            '<32>{#p/human}* (You eat the Sizzli Steak.)',
            ...(SAVE.data.b.svr || world.darker || SAVE.data.b.ufokinwotm8 ? [] : ['<32>{#p/basic}* Gross!'])
        ]
    },

    k_coffin: {
        name: 'Secret Key',
        description: () =>
            SAVE.data.b.w_state_secret
                ? 'Used to access a hidden room in the Outlands.'
                : "Acquired from the sock drawer in Toriel's room."
    },

    c_call_toriel: <Partial<CosmosKeyed<CosmosProvider<string[]>, string>>>{
        w_start: [
            '<25>{#p/toriel}{#f/0}* Ah, of course.\n* That must be where you crash-landed.',
            '<25>{#f/0}* The other humans who came here landed there, too.',
            '<25>{#f/1}* There must be something about the force field...',
            '<25>{#f/0}* ... which always makes incoming craft fly in on this vector.'
        ],
        w_twinkly: () =>
            SAVE.data.b.toriel_twinkly
                ? [
                    '<25>{#p/toriel}{#f/1}* Is that where I first found you?',
                    '<25>{#f/5}* That talking star who tormented you has been a pest for some time.',
                    '<25>{#f/1}* I have tried to reason with him before, but...',
                    '<25>{#f/9}* My efforts never truly got anywhere.'
                ]
                : [
                    '<25>{#p/toriel}{#f/1}* Is that where I first found you?',
                    '<25>{#f/5}* All alone out there, by yourself...',
                    '<25>{#f/0}* It is a good thing I was there to bring you in.'
                ],
        w_entrance: [
            '<25>{#p/toriel}{#f/1}* The entrance to the Outlands...',
            '<25>{#f/0}* Indeed, the area before this is not actually part of it.',
            '<25>{#f/5}* It is... more of an unmarked crash site.',
            '<25>{#f/1}* After the first human crashed directly INTO the Outlands...',
            '<25>{#f/0}* A separate platform seemed an obvious addition.'
        ],
        w_lobby: [
            '<25>{#p/toriel}{#f/0}* The puzzle in this room works well for demonstrations.',
            '<25>{#f/1}* After all, why else would I build it?',
            '<25>{#f/5}* Unfortunately, not every human understood this.',
            '<25>{#f/3}* One of them even tried running at the security field directly...',
            '<25>{#f/0}* ... suffice it to say, the use of healing magic was required.'
        ],
        w_tutorial: [
            '<25>{#p/toriel}* If this puzzle is not my favorite, I do not know what is!',
            '<25>* The way it teaches collaboration is a most valuable quality.',
            '<25>{#f/1}* Since my dream job IS to become a teacher...',
            '<25>{#f/0}* I am always looking for ways to impart these important lessons.'
        ],
        w_dummy: () => [
            '<25>{#p/toriel}{#f/1}* The training room...?',
            ...(SAVE.data.n.plot < 42
                ? [
                    [
                        '<25>{#f/0}* Hee hee, I am still proud of the way you handled that lesson.',
                        '<25>{#f/1}* A friendly conversation is preferable to the alternative...',
                        '<25>{#f/0}* And not just because it helps you make friends!'
                    ],
                    [],
                    [
                        '<25>{#f/5}* ...',
                        '<25>{#f/5}* Although you did not handle that lesson in the way I intended...',
                        '<25>{#f/0}* At the very least, you avoided the conflict.',
                        '<25>{#f/0}* Considering the alternatives, it was... a preferable outcome.'
                    ],
                    [
                        '<25>{#f/0}* ... hmm.',
                        '<25>{#f/0}* Truthfully, I still do not know how to react to what happened.',
                        '<25>{#f/1}* It was mesmerising to watch, though...',
                        '<25>{#f/3}* Just the two of you...\n* Staring at each other...',
                        '<25>{#f/4}* ...'
                    ],
                    [
                        '<25>{#f/1}* I cannot say I expected what happened, but...',
                        '<25>{#f/0}* It was still endearing nonetheless.',
                        '<25>{#f/0}* Surprisingly, you are the first human to try the approach.',
                        '<25>{#f/1}* And it seemed such an obvious solution in hindsight...'
                    ],
                    [],
                    [
                        '<25>{#f/5}* ...',
                        '<25>{#f/7}* ...',
                        '<25>{#f/8}* Hahaha!\n* Ah, I cannot help but laugh!',
                        '<25>{#f/6}* The shamelessness with which you chose to flirt...',
                        '<25>{#f/1}* Certainly took me by surprise!',
                        '<25>{#f/0}* Listen to me, my child.',
                        '<25>{#f/9}* Flirting with your adversaries may not always be ideal.',
                        '<25>{#f/10}* But, if you can do it like THAT again...',
                        '<25>{#f/0}* There is no telling what you can accomplish this way.'
                    ]
                ][SAVE.data.n.state_wastelands_dummy]
                : [
                    '<25>{#p/toriel}{#f/0}* Oh, right, about that.',
                    '<25>{#p/toriel}{#f/0}* I recently discovered that a ghost was hiding in the dummy.',
                    '<25>{#p/toriel}{#f/1}* They seemed bothered about something, but...',
                    '<25>{#p/toriel}{#f/0}* After a little talk, I helped to calm them down.',
                    '<25>{#p/toriel}{#f/1}* Hmm... I wonder where Lurksalot is now?'
                ])
        ],
        w_coffin: [
            '<25>{#p/toriel}{#f/5}* ...',
            '<25>{#f/5}* In times like this, it is important that we show respect.',
            '<25>{#f/10}* ... do you understand?',
            '<25>{#f/9}* It is a lesson more important than that of puzzles or encounters.'
        ],
        w_danger: () =>
            SAVE.data.n.state_wastelands_froggit === 3
                ? [
                    '<25>{#p/toriel}{#f/1}* The riddle offered by the terminal in that room...',
                    '<25>{#f/0}* Was based on something I found in an old Earth legend.',
                    '<25>{#f/1}* It involved a series of many intricate puzzles...',
                    '<25>{#f/0}* And a certain deceptive baked good.',
                    SAVE.data.b.w_state_riddleskip
                        ? '<25>{#f/5}* It is a shame you refused to solve it.'
                        : '<25>{#f/0}* Seeing you solve it was quite gratifying.'
                ]
                : [
                    '<25>{#p/toriel}{#f/1}* As overseer of the Outlands, I took it upon myself...',
                    '<25>{#f/0}* To ensure the other monsters did not attack you.',
                    '<25>{#f/0}* Both they and I have a mutual understanding about this.',
                    '<25>{#f/0}* That is why the Froggit left so readily.'
                ],
        w_zigzag: [
            '<25>{#p/toriel}{#f/1}* My idea with building this room to be so long and windy...',
            '<25>{#f/0}* ... was that I felt a straight room would be too boring.',
            '<25>{#f/1}* After all, who wants to walk in a straight line all their life?',
            '<25>{#f/0}* A little change of pace can be quite nice.'
        ],
        w_froggit: [
            '<25>{#p/toriel}* From this room forward, more monsters may be found.',
            '<25>{#f/0}* They often like to \"hang out\" here.\n* Nice, is it not?',
            '<25>{#f/1}* It tended to be a quiet place, until recently...',
            '<25>{#f/0}* When a monster began teaching the others how to flirt.',
            '<25>{#f/0}* This new element has greatly altered the social atmosphere.'
        ],
        w_candy: () => [
            SAVE.data.n.state_wastelands_candy < 4
                ? '<25>{#p/toriel}{#f/1}* The vending machine has yet to break down?'
                : '<25>{#p/toriel}{#f/1}* Oh dear, is the vending machine broken again?',
            '<25>{#f/5}* Well, it has happened more times than I can count.',
            '<25>{#f/3}* On the positive side, it DOES save power...',
            '<25>{#f/0}* ... so perhaps it is not all bad.'
        ],
        w_puzzle1: [
            '<25>{#p/toriel}{#f/1}* To ease the process of retrying the puzzle...',
            '<25>{#f/0}* I installed a system to move you back to the start.',
            '<25>{#f/5}* The scientist who helped to install it is long gone now...',
            '<25>{#f/0}* But his work continues to be of use every day.'
        ],
        w_puzzle2: [
            '<25>{#p/toriel}{#f/1}* Ah, a most unique form of puzzle exists here.',
            '<25>{#f/0}* One that tests patience over memorization.',
            '<25>{#f/1}* For the most part, the other humans complained about it...',
            '<25>{#f/0}* Though, one did appreciate the value it provides.'
        ],
        w_puzzle3: [
            '<25>{#p/toriel}{#f/1}* A little trick you may find helpful for this puzzle...',
            '<25>{#f/0}* Is that you can start moving even as the sequence is shown.',
            '<25>{#f/5}* ... I suppose that is not of much use to you now.',
            '<25>{#f/1}* But, if for some reason you need to solve it again...',
            '<25>{#f/0}* You may try the advice I have just given.'
        ],
        w_puzzle4: [
            '<25>{#p/toriel}{#f/1}* It has come to my attention that, recently...',
            '<25>{#f/0}* Old editions of a now- defunct comic series are being sold.',
            '<25>{#f/0}* Perhaps, if you are bored, you could buy one.',
            '<25>{#f/0}* Children your age tend to be rather fond of these things!'
        ],
        w_mouse: [
            '<25>{#p/toriel}{#f/1}* As a matter of principle, I find it important...',
            '<25>{#f/0}* That there be a room designated for stopping and resting.',
            '<25>{#f/0}* In my own life, I often find breaks to be a useful asset.',
            '<25>{#f/1}* The stærmite who resides here would certainly agree...'
        ],
        w_blooky: () =>
            SAVE.data.b.killed_mettaton
                ? [
                    '<25>{#p/toriel}{#f/1}* For whatever reason, that ghost who often comes here...',
                    '<25>{#f/5}* Has been feeling worse than ever lately.',
                    '<25>{#f/1}* I tried to ask them why, but they would not say...',
                    '<25>{#f/5}* ... I have not seen them since.'
                ]
                : !SAVE.data.b.a_state_hapstablook || SAVE.data.n.plot < 68
                    ? [
                        '<25>{#p/toriel}{#f/0}* That ghost who called earlier often inhabits this area.',
                        ...(SAVE.data.b.napsta_performance
                            ? ['<25>{#f/1}* I thought they would be happier after their performance...']
                            : ['<25>{#f/1}* I have tried to lift their spirits in the past...']),
                        '<25>{#f/5}* But their troubles may not be so easy to resolve.',
                        '<25>{#f/1}* If only I knew what was holding them down...'
                    ]
                    : [
                        '<25>{#p/toriel}{#f/1}* For whatever reason, that ghost who often comes here...',
                        '<25>{#f/0}* Has been feeling a lot better lately.',
                        '<25>{#f/0}* They even came to my house to tell me so themselves.',
                        '<25>{#f/1}* Apparently you had something to do with this...?',
                        '<25>{#f/0}* Well then.\n* I am very proud of you, my child.'
                    ],
        w_party: [
            '<25>{#p/toriel}{#f/0}* The activities room.\n* We host all kinds of performances there.',
            '<25>{#f/0}* Drama, dance nights...\n* And, most important of all, the arts.',
            '<25>{#f/0}* It is always good to see people expressing themselves.',
            '<25>{#f/1}* I once attended a comedy show in that very room.',
            '<25>{#f/0}* It was the hardest I have ever laughed in my life!'
        ],
        w_pacing: () => [
            SAVE.data.b.toriel_twinkly
                ? '<25>{#p/toriel}{#f/0}* I heard someone here made a \"friend\" with that talking star.'
                : '<25>{#p/toriel}{#f/0}* I heard someone here made a \"friend\" with a talking star.',
            '<25>{#f/1}* One of the Froggits, I presume...?',
            "<25>{#f/1}* To say I am worried for that monsters' safety...",
            '<25>{#f/5}* Would be quite the understatement.'
        ],
        w_junction: [
            '<25>{#p/toriel}{#f/1}* The junction room...',
            '<25>{#f/0}* In the past, we had planned a community area of sorts here.',
            '<25>{#f/0}* Outlands visitors would be met with a warm, welcoming atmosphere.',
            '<25>{#f/1}* Over time, though, we realized not many people would come...',
            '<25>{#f/0}* And so, the design was altered into what you see today.',
            '<25>{#f/5}* A little boring, but I suppose not every room can be grand...'
        ],
        w_annex: [
            '<25>{#p/toriel}* From here, the all- important taxi stop can be reached.',
            '<25>{#f/1}* Not only are other areas of the outpost accessible...',
            '<25>{#f/0}* But other subsections of the Outlands are, too.',
            '<25>{#f/1}* Seeing as you are but a small child, however...',
            '<25>{#f/5}* It is unlikely the driver would offer that as an option to you.',
            '<25>{#f/0}* The shops and business there are mostly just for grown-ups.'
        ],
        w_wonder: () => [
            '<25>{#p/toriel}{#f/1}* A little mushroom greeted me on my way back from shopping...',
            SAVE.data.b.snail_pie
                ? '<25>{#f/0}* ... as I returned with ingredients for that snail pie.'
                : '<25>{#f/0}* ... as I returned with ingredients for that butterscotch pie.',
            '<25>{#f/3}* Strangely, it was floating above the doorway...',
            '<25>{#f/0}* The gravity must be weak in that room.',
            '<25>{#f/1}* Perhaps the presence of the taxi has some kind of effect...?'
        ],
        w_courtyard: [
            '<25>{#p/toriel}{#f/0}* Ah.\n* The courtyard.',
            '<25>{#f/1}* Admittedly, it is a little lacking...',
            '<25>{#f/5}* In terms of being a place for children like you to play.',
            '<25>{#f/1}* With every human who came, I thought of fixing that...',
            '<25>{#f/5}* But they always left before I had the chance.'
        ],
        w_alley1: [
            '<25>{#p/toriel}{#f/9}* ... the room in which I lectured you about leaving.',
            '<25>{#f/5}* I thought, if I spoke of the force field...',
            '<25>{#f/5}* I might convince you to stay.',
            '<25>{#f/1}* ... I remember telling the other humans the same, but...',
            '<25>{#f/5}* It was as effective for you as it was for them.'
        ],
        w_alley2: [
            '<25>{#p/toriel}{#f/9}* ... the room in which I warned you of the dangers ahead.',
            '<25>{#f/5}* I have been told my beliefs about them are misguided, but...',
            '<25>{#f/5}* I felt it unwise to take that chance.',
            '<25>{#f/9}* ... perhaps it is time I re-considered my viewpoint.'
        ],
        w_alley3: [
            '<25>{#p/toriel}{#f/9}* ... I truly regret the way I acted towards you here.',
            '<25>{#f/5}* It was wrong of me to attempt to force you to stay...',
            '<25>{#f/5}* Merely acting on my own silly desires.',
            '<25>{#f/1}* I am sure you have already forgiven me, though...',
            '<25>{#f/5}* Regardless of whether or not I deserve it...'
        ],
        w_alley4: () =>
            SAVE.data.b.w_state_fightroom
                ? [
                    '<32>{#s/phone}{#p/event}* Dialing...',
                    '<25>{#p/toriel}{#f/1}* Although that room may not evoke the best of feelings for us...',
                    '<25>{#f/0}* It is still one of my favorite places in the Outlands.',
                    '<25>{#f/1}* There is a certain someone who visits sometimes...',
                    '<25>{#f/6}* Perhaps you are already aware of him.',
                    '<32>{#s/equip}{#p/event}* Click...'
                ]
                : instance('main', 'toriButNotGarb') === void 0 // NO-TRANSLATE

                    ? [
                        '<32>{#s/phone}{#p/event}* Dialing...',
                        '<25>{#p/toriel}{#f/1}* Calling so soon...?',
                        '<25>{#f/0}* ... I have not even gotten back to the house yet!',
                        '<25>{#f/0}* Please, wait a moment before calling again.',
                        '<32>{#s/equip}{#p/event}* Click...'
                    ]
                    : [
                        '<32>{#w.stopThatGoat}{#s/phone}{#p/event}* Dialing...',
                        '<25>{#p/toriel}{#f/1}* Calling so soon...?',
                        '<25>{#f/0}* ... I have not even left the room yet!',
                        '<25>{#f/2}* A moment to breathe would be nice!',
                        '<32>{#w.startThatGoat}{#s/equip}{#p/event}* Click...'
                    ],
        w_bridge: [
            '<25>{#p/toriel}{#f/1}* The bridge to the rest of the outpost...',
            '<25>{#f/5}* It is a shame to think I almost destroyed it.',
            '<25>{#f/0}* Of course, the taxi still would have been around.',
            '<25>{#f/3}* But I doubt that would have been very reliable.',
            '<25>{#f/1}* Let us be glad this bridge is still in place.'
        ],
        w_exit: () =>
            SAVE.data.n.plot < 16
                ? [
                    '<25>{#p/toriel}{#f/1}* My child, if you are leaving the Outlands...',
                    '<25>{#f/0}* Then... I want you to remember something.',
                    '<25>{#f/1}* Whatever happens, no matter how difficult it may seem...',
                    '<25>{#f/0}* I want you to know that I have faith in you.',
                    '<25>{#f/0}* That I know you can do the right thing.',
                    '<25>{#f/1}* Remember that, alright?'
                ]
                : SAVE.data.n.plot < 17.001
                    ? [
                        '<25>{#p/toriel}{#f/1}* Returning to the Outlands so soon...?',
                        '<25>{#f/0}* Well.\n* I cannot say I am opposed to that.',
                        '<25>{#f/1}* You may leave at any time, of course...',
                        '<25>{#f/0}* But, for the moment, it is nice to see you.'
                    ]
                    : [
                        '<25>{#p/toriel}{#f/2}* How long have you been standing out there!?',
                        '<25>{#f/1}* Did you come back all this way just to call me?',
                        '<25>{#f/0}* ... silly goose.',
                        '<25>{#f/0}* If you would like to call, there is no need to go back this far.'
                    ],
        w_toriel_front: [
            '<25>{#p/toriel}{#f/1}* Did you know that this house is a re-creation of another?',
            '<25>{#f/1}* In the past, I lived in the Citadel...',
            '<25>{#f/0}* In a house that this one was made to resemble.',
            '<25>{#f/5}* Once in a while, I forget that I am not really there...'
        ],
        w_toriel_hallway: [
            '<25>{#p/toriel}{#f/0}* There is not much to say about the hallway.',
            '<26>{#f/1}* Though, you can take a look in the mirror, if you like...',
            '<25>{#f/0}* I hear self-reflection can be a powerful thing.'
        ],
        w_toriel_asriel: [
            '<25>{#p/toriel}{#f/0}* Ah, it is your room!',
            '<25>{#f/5}* Your... room...',
            '<25>{#f/9}* ...',
            '<25>{#f/5}* Perhaps it is no longer as such.',
            '<25>{#f/1}* ...',
            '<25>{#f/1}* Actually, I will leave that decision to you...',
            '<25>{#f/0}* You may still rest any time you like.'
        ],
        w_toriel_toriel: [
            '<25>{#p/toriel}{#f/0}* So you have stumbled into my room.',
            '<25>{#f/0}* If you like, you may read a book from my bookshelf.',
            '<25>{#f/0}* But, please, do not forget to put it back.',
            "<25>{#f/23}* And don't you dare open that sock drawer!"
        ],
        w_toriel_living: () =>
            toriCheck()
                ? ['<25>{#p/toriel}{#f/3}* There is no need to call me when I am right here, little one.']
                : [
                    '<25>{#p/toriel}{#f/1}* Rummaging around in the living room, are we?',
                    '<25>{#f/0}* Say.\n* Have you read all of the books yet?',
                    '<25>{#f/1}* I thought about reading you the snail fact book...',
                    '<25>{#f/0}* But I decided it might be a little too repetitive for you.'
                ],
        w_toriel_kitchen: [
            '<25>{#p/toriel}{#f/1}* The kitchen...?',
            '<25>{#f/0}* I left a chocolate bar in the fridge for you.',
            '<25>{#f/0}* I hear it is... an old favorite of humans.',
            '<25>{#f/1}* Espero que você goste...'
        ],
        s_start: () =>
            SAVE.data.n.plot < 17.001
                ? [
                    '<25>{#p/toriel}{#f/0}* If I am right, a certain friend of mine should be up ahead.',
                    '<26>{#f/0}* Do not fear, little one.',
                    '<25>{#f/1}* Keep going...'
                ]
                : [
                    '<25>{#p/toriel}{#f/1}* From what I recall, this long room...',
                    '<26>{#f/0}* ... would have been the basis for a town on the outskirts of Starton.',
                    '<25>{#f/0}* Of course, that never came to pass.',
                    '<25>{#f/2}* One town was more than enough!'
                ],
        s_sans: () =>
            SAVE.data.n.plot < 17.001
                ? [
                    '<25>{#p/toriel}{#f/0}* If I am right, a certain friend of mine should be up ahead.',
                    '<26>{#f/0}* Do not fear, little one.',
                    '<25>{#f/1}* Keep going...'
                ]
                : [
                    '<25>{#p/toriel}{#f/1}* I presume by now you have heard of the \"gravometric inverter?\"',
                    '<26>{#f/0}* It is a device Sans has told me all about.',
                    '<25>{#f/1}* Apparently, there is another world up there...',
                    '<25>{#f/0}* A place where things do not always face the right way up.'
                ],
        s_crossroads: [
            '<25>{#p/toriel}{#f/1}* This old landing pad was once a bustling intersection...',
            '<25>{#f/1}* Supply ships coming and going...',
            '<25>{#f/1}* Ready to aid in whatever was being built next...',
            '<25>{#f/5}* It is a shame the outpost seems to have stopped expanding.',
            '<25>{#f/0}* For a while, building new areas defined our culture!'
        ],
        s_human: [
            "<25>{#p/toriel}* I heard Sans's brother wants to join the Royal Guard someday.",
            '<25>{#f/1}* Such an aspirational young skeleton...',
            '<25>{#f/0}* Despite my feelings about the guard, it is good for him to dream.',
            '<25>{#f/5}* I worry that too many have given up on their dreams lately...',
            '<25>{#f/0}* But not him!\n* That skeleton knows what is best for him.'
        ],
        s_papyrus: [
            '<25>{#p/toriel}* Sans told me all about the gadgets Papyrus added to his station.',
            '<25>{#f/1}* First, a handle, so he can \"swing\" into duty...',
            '<25>{#f/1}* A so-called \"sky wrench\" used to get a \"fix\" on the stars...',
            '<25>{#f/0}* And a screen attachment to keep track of his many responsibilities.',
            '<25>{#f/6}* With inventions like these, you would think he works at a lab.'
        ],
        s_doggo: [
            '<25>{#p/toriel}{#f/5}* Is the Royal Guard giving you too much trouble?',
            '<25>{#f/0}* Sans did say he would warn you of potential encounters.',
            '<25>{#f/1}* ...',
            '<25>{#f/1}* Perhaps I should be more worried, but...',
            '<25>{#f/0}* Something tells me you will be alright.',
            '<25>{#f/0}* I have faith in that skeleton to look out for you.'
        ],
        s_robot: [
            '<25>{#p/toriel}{#f/1}* Ah, what a lovely sound...',
            '<25>{#f/0}* I would recognize a builder bot anywhere.',
            '<25>{#f/5}* After the ban on AI programs, we had most of them disabled...',
            '<25>{#f/1}* But the two whose sentience did not corrupt them...',
            '<25>{#f/0}* Were allowed a more graceful retirement.',
            '<25>{#f/0}* It is nice to know that they have survived to this day.'
        ],
        s_maze: [
            "<25>{#p/toriel}* Sans has told me all about his brother's fondness for puzzles.",
            '<25>{#f/1}* I hear he has even created some of his own...?',
            '<25>{#f/0}* I am most curious about the \"wall of fire.\"',
            '<25>{#f/1}* Are the flames hot?\n* Or are they merely pleasantly warm?',
            '<25>{#f/5}* For your sake, I would hope it is the latter.'
        ],
        s_dogs: [
            '<25>{#p/toriel}{#f/1}* I hear the Royal Guard employs a pair of married dogs.',
            '<25>{#f/3}* To be married at the same time as being a royal guard...',
            '<25>{#f/4}* That relationship must have some \"interesting\" motivations.',
            '<25>{#f/6}* But what do I know.\n* As Sans would say, I am merely a \"goat!\"'
        ],
        s_lesser: [
            '<25>{#p/toriel}* I wonder what kind of food is sold in Starton these days.',
            '<25>{#f/1}* When I was last here, everyone loved to eat ghost fruit...',
            '<25>{#f/0}* A strange food which could be eaten both by ghosts and non-ghosts.',
            '<26>{#f/0}* Whatever the favorite\n  is now, I am sure I could never dream of it.'
        ],
        s_bros: [
            "<25>{#p/toriel}{#f/1}* Sans's fondness for spot-the-difference puzzles...",
            '<25>{#f/0}* Well, it has never really made sense to me.',
            '<25>{#f/1}* How could such a simple puzzle be appealing to him?',
            '<26>{#f/3}* ... more specifically...',
            '<25>{#f/1}* Where is the humor in such a puzzle?'
        ],
        s_spaghetti: [
            "<25>{#p/toriel}* Sans has often spoken of Papyrus's interest in spaghetti dishes.",
            '<25>{#f/6}* But why stop there?\n* Just imagine the PASTABILITIES...',
            '<25>{#f/8}* Rigatoni!\n* Fettuccine!\n* Acini di Pepe!',
            '<25>{#f/0}* Some variety could really help him go FARFALLE.',
            '<25>{#f/2}* ... in other words, go BIGOLI or go home!'
        ],
        s_puzzle1: [
            '<25>{#p/toriel}{#f/1}* Whatever the puzzles in Starton are like now, I am sure...',
            '<25>{#f/0}* They are nothing like the ones that were here when I left.',
            '<25>{#f/5}* A level of difficulty so unrealistic...',
            '<25>{#f/5}* It is a wonder anyone could solve them at all.'
        ],
        s_puzzle2: [
            '<25>{#p/toriel}{#f/1}* They say some puzzles have secret solutions...',
            '<25>{#f/0}* ... a statement I find utterly unbelievable!',
            '<25>{#f/0}* A secret solution would defeat the whole purpose of a puzzle.',
            '<25>{#f/1}* Puzzles, at least ones with realistic difficulty...',
            '<25>{#f/2}* Should be solved the intended way only!'
        ],
        s_jenga: [
            '<25>{#p/toriel}* To my knowledge, Dr. Alphys is the current royal scientist.',
            '<25>{#f/1}* She may never replace the experience of her predecessor, but...',
            '<25>{#f/0}* I am sure she is more than capable of finding her own path forward.',
            '<25>{#f/0}* This may surprise you, but I have a certain respect for scientists.',
            '<25>{#f/2}* Such brilliant minds!'
        ],
        s_pacing: [
            '<25>{#p/toriel}{#f/1}* You would be wise to steer clear of dubious salesfolk...',
            '<25>{#f/0}* For you never know what strings they may pull.',
            '<25>{#f/0}* Or what moon rocks may end up falling into your lap.',
            '<25>{#f/3}* It is a lesson I have learned the hard way, unfortunately...'
        ],
        s_puzzle3: [
            '<25>{#p/toriel}{#f/1}* The puzzle in this room is one of memorization, is it not?',
            '<25>{#f/1}* Sans mentioned that his brother often updates the pattern...',
            '<25>{#f/0}* ... to maintain a strong \"rotating password.\"',
            '<25>{#f/6}* How silly!',
            '<25>{#f/0}* In the Outlands, our memorization puzzles update on-demand.'
        ],
        s_greater: [
            '<25>{#p/toriel}{#f/1}* The old owner of that doghouse, Canis Maximus...',
            '<25>{#f/0}* ... retired from the guard a long while ago.',
            '<25>{#f/7}* Fortunately, its new owner is said to be a bundle of puppy energy!',
            '<25>{#f/0}* Clearly, it has learned well from such a wise master.'
        ],
        s_math: [
            '<25>{#p/toriel}{#f/1}* Please, can somebody explain \"dog justice?\"',
            '<25>{#f/0}* It is an odd phrase I continue to hear every so often.',
            '<25>{#f/5}* I do know of one little puppy that visits the Outlands sometimes...',
            '<25>{#f/0}* Perhaps that is who is deserving of justice.'
        ],
        s_bridge: [
            '<25>{#p/toriel}{#f/1}* When this bridge was first constructed...',
            "<25>{#f/0}* Its precarious nature prompted an upgrade to the outpost's systems.",
            '<25>{#f/0}* In short time, the aptly-named \"gravity guardrails\" were added.',
            '<25>{#f/0}* These are what prevent you from falling off the platforms.'
        ],
        s_town1: [
            '<25>{#p/toriel}{#f/0}* Ah...\n* The town of Starton.',
            '<25>{#f/1}* I have heard much about a \"Grillby\'s\" there...',
            '<25>{#f/0}* ... and its diverse array of patrons both new and old.',
            '<25>{#f/0}* Sans often goes there to eat, you see.',
            '<25>{#f/7}* I hear the bartender is quite \"hot.\"'
        ],
        s_taxi: [
            '<25>{#p/toriel}{#f/1}* A taxi stop near town?',
            '<25>{#f/1}* ... hmm...',
            '<25>{#f/0}* I wonder if it is any different from the one in the Outlands.',
            '<25>{#f/1}* Of course, I would have no way of knowing until I saw it...',
            '<25>{#f/0}* Which I have no way of doing without a fancy telescope.',
            '<25>{#f/0}* I wonder where I could find one of those.'
        ],
        s_town2: [
            '<25>{#p/toriel}{#f/1}* Napstablook recently told me they opened a shop...',
            '<25>{#f/5}* ... on the \"south side\" of town.',
            '<25>{#f/1}* What could this mean?',
            '<25>{#f/0}* The town I remember organizing was a large, unified square.',
            '<25>{#f/1}* Perhaps there was a split at some point?',
            '<25>{#f/5}* That would be a shame, considering the original vision...'
        ],
        s_battle: [
            '<25>{#p/toriel}{#f/1}* The thing Sans seemed most eager to warn me about...',
            '<25>{#f/0}* Was his brother\'s so- called \"special attack.\"',
            '<25>{#f/1}* If Papyrus chooses to spar with you, you must avoid it at all costs.',
            '<25>{#f/2}* I repeat, avoid the special attack!\n* At all costs!',
            '<25>{#f/0}* That is all I have to say on this matter.'
        ],
        s_exit: [
            '<25>{#p/toriel}{#f/1}* If you ever decide to leave Starton, you must understand...',
            '<25>{#f/5}* My phone is old, and can only reach certain rooms in the factory.',
            '<25>{#f/9}* It would be difficult to call me until you find your way out.',
            '<25>{#f/1}* Forgive me.\n* I just thought that I should let you know.'
        ],
        f_entrance: [
            '<25>{#p/toriel}{#f/7}* So you found a place in the factory with good reception...?',
            '<25>{#f/1}* ... that must mean you are somewhere unenclosed...',
            '<25>{#f/0}* Which also implies the nearby presence of synth-bushes.',
            '<25>{#f/3}* Those things are terrible to get stuck in...',
            '<25>{#f/4}* Getting you all itchy and scratchy...',
            '<25>{#f/0}* Fortunately, I know you are smart enough not to run into them.'
        ],
        f_bird: () =>
            SAVE.data.n.plot !== 47.2 && SAVE.data.n.plot > 42 && SAVE.data.s.state_foundry_deathroom !== 'f_bird' // NO-TRANSLATE

                ? [
                    '<25>{#p/toriel}{#f/0}* There truly is nothing like the chirp of that fearless little bird.',
                    '<25>{#f/1}* Even when it still lived within a bucket of water...',
                    '<25>{#f/1}* It would fly its mighty little wings...',
                    '<25>{#f/1}* Taking us places...',
                    '<25>{#f/0}* I used its services to carry groceries often.',
                    '<25>{#f/5}* ... back when we as a species all lived in that old factory.'
                ]
                : [
                    '<25>{#p/toriel}{#f/5}* Things sound awfully silent where you are...',
                    '<25>{#f/5}* Almost like there is something missing.',
                    '<25>{#f/5}* Something important...',
                    '<25>{#f/0}* Well, no matter.\n* My imagination does run wild sometimes.',
                    '<25>{#f/1}* ...',
                    '<25>{#f/1}* Chirp, chirp, chirp, chirp, chirp...'
                ],
        f_taxi: [
            "<25>{#p/toriel}{#f/1}* So you found the factory's taxi stop...?",
            '<25>{#f/0}* Perhaps you could use it to escape that Royal Guard captain.',
            '<25>{#f/1}* A visitor here once spoke of her obsession with spears...',
            '<25>{#f/0}* How odd.\n* The captain I knew was into sabers.'
        ],
        f_battle: [
            '<25>{#p/toriel}{#f/0}* Ah, there you are.',
            "<25>{#f/0}* You're at the edge of the factory there.",
            '<26>{#f/1}* From this point forward, I do not know what lies ahead of you...',
            '<25>{#f/5}* Before I left, there was only an elevator to the Citadel.',
            '<25>{#f/1}* Now, however, exists the area called \"Aerialis...\"',
            '<25>{#f/23}* ... I wonder who came up with THAT name.'
        ],
        f_exit: toriel_aerialis,
        a_start: toriel_aerialis,
        a_path1: toriel_aerialis,
        a_path2: toriel_aerialis,
        a_path3: toriel_aerialis,
        a_rg1: toriel_aerialis,
        a_path4: toriel_aerialis,
        a_barricade1: toriel_aerialis,
        a_puzzle1: toriel_aerialis,
        a_mettaton1: toriel_aerialis,
        a_elevator1: toriel_aerialis,
        a_elevator2: toriel_aerialis,
        a_sans: toriel_aerialis,
        a_pacing: toriel_aerialis,
        a_prepuzzle: toriel_aerialis,
        a_puzzle2: toriel_aerialis,
        a_mettaton2: toriel_aerialis,
        a_rg2: toriel_aerialis,
        a_barricade2: toriel_aerialis,
        a_split: toriel_aerialis,
        a_offshoot1: toriel_aerialis,
        a_elevator3: toriel_aerialis,
        a_elevator4: toriel_aerialis,
        a_auditorium: toriel_aerialis,
        a_aftershow: toriel_aerialis,
        a_hub1: toriel_aerialis,
        a_hub2: toriel_aerialis,
        a_lookout: toriel_aerialis,
        a_hub3: toriel_aerialis,
        a_plaza: toriel_aerialis,
        a_elevator5: toriel_aerialis,
        a_hub4: toriel_aerialis,
        a_sleeping1: toriel_aerialis,
        a_hub5: toriel_aerialis
    },
    c_call_toriel_extra: <CosmosKeyed<CosmosProvider<string[]>, string>>{
        c_call_toriel_early: () =>
            game.room === 'w_bridge' || game.room.startsWith('w_alley') // NO-TRANSLATE

                ? ['<25>{#p/toriel}{#f/3}* ...', '<25>{#f/2}* Come back to the house this instant!']
                : [
                    3 <= SAVE.data.n.cell_insult
                        ? '<25>{#p/toriel}{#f/23}* Are you not exhausted after how you behaved towards me?'
                        : SAVE.data.n.state_wastelands_napstablook === 5
                            ? '<25>{#p/toriel}{#f/1}* Are you not exhausted after waiting so long?'
                            : '<25>{#p/toriel}{#f/1}* Are you not exhausted after all you have been through?',
                    3 <= SAVE.data.n.cell_insult
                        ? game.room.startsWith('w_toriel') // NO-TRANSLATE

                            ? '<25>{#f/0}* Perhaps you should see the bed I made for you in the guest room.'
                            : '<25>{#f/0}* Perhaps you should see the bed I made for you at the house.'
                        : game.room.startsWith('w_toriel') // NO-TRANSLATE

                            ? '<25>{#f/0}* Come to the hallway, and I will show you something.'
                            : '<25>{#f/0}* Come to the house, and I will show you something.'
                ],
        c_call_toriel_late: () =>
            SAVE.data.n.plot === 8.1
                ? ['<32>{#p/human}* (But the line was busy.)']
                : game.room === 'w_bridge' || game.room.startsWith('w_alley') // NO-TRANSLATE

                    ? ['<25>{#p/toriel}{#f/3}* ...', '<25>{#f/2}* Come back to the house this instant!']
                    : [
                        '<25>{#p/toriel}{#f/1}* There is no need to call me over the phone, my child.',
                        3 <= SAVE.data.n.cell_insult
                            ? '<26>{#f/23}* We already know what that tends to result in.'
                            : game.room === 'w_toriel_living' // NO-TRANSLATE

                                ? toriCheck()
                                    ? '<25>{#f/0}* After all, I am here in the room with you.'
                                    : '<25>{#f/0}* I will be done in just a moment.'
                                : game.room.startsWith('w_toriel') // NO-TRANSLATE

                                    ? toriCheck()
                                        ? '<25>{#f/0}* If you want to see me, you can come to the living room.'
                                        : '<25>{#f/0}* If you want to see me, you can wait in the living room.'
                                    : '<25>{#f/0}* If you want to see me, you can come to the house.'
                    ],
        c_call_asriel: () =>
            [
                [
                    "<25>{#p/asriel2}{#f/3}* Just so you know, I'm not picking that up.",
                    '<25>{#p/asriel2}{#f/4}* We have better things to do.'
                ],
                ['<25>{#p/asriel2}{#f/4}* ...'],
                ['<25>{#p/asriel2}{#f/4}* ... seriously?'],
                ['<25>{#p/asriel2}{#f/3}* You must be really, REALLY bored.'],
                []
            ][Math.min(SAVE.flag.n.ga_asrielCall++, 4)]
    },
    s_save_outlands: {
        w_courtyard: {
            name: 'Outlands - Courtyard',
            text: () =>
                SAVE.data.n.plot > 16
                    ? [
                        6 <= world.population
                            ? '<32>{#p/human}* (Even when visiting, this little home fills you with determination.)'
                            : '<32>{#p/human}* (Even when visiting, this house fills you with determination.)'
                    ]
                    : 6 <= world.population
                        ? ['<32>{#p/human}* (This cute little home fills you with determination.)']
                        : ['<32>{#p/human}* (A house amidst the metallic walls fills you with determination.)']
        },
        w_entrance: {
            name: 'Outlands - Entrance',
            text: () =>
                world.runaway
                    ? [
                        '<32>{#p/human}* (The industrious Outlands falls silent, filling you with determination.)',
                        '<32>{#p/human}* (HP totalmente restaurado.)'
                    ]
                    : SAVE.data.n.plot < 48
                        ? [
                            '<32>{#p/human}* (The industrious Outlands lies ahead, filling you with determination.)',
                            '<32>{#p/human}* (HP totalmente restaurado.)'
                        ]
                        : [
                            '<32>{#p/human}* (Returning to where it all began, after so long...)',
                            '<32>{#p/human}* (This fills you with determination.)',
                            '<32>{#p/human}* (HP totalmente restaurado.)'
                        ]
        },
        w_froggit: {
            name: 'Outlands - Rest Area',
            text: () =>
                SAVE.data.n.state_wastelands_toriel === 2 || world.runaway || roomKills().w_froggit > 0
                    ? SAVE.data.n.plot < 8.1
                        ? [
                            '<32>{#p/human}* (The air grows stale.)\n* (Somehow, this fills you with determination.)',
                            '<32>{#p/human}* (HP totalmente restaurado.)'
                        ]
                        : [
                            '<32>{#p/human}* (The air has fully dried up.)\n* (Indeed, this fills you with determination.)',
                            '<32>{#p/human}* (HP totalmente restaurado.)'
                        ]
                    : SAVE.data.b.svr
                        ? [
                            '<32>{#p/human}* (The area has been vacated, but the air remains fresh.)',
                            '<32>{#p/human}* (This, of course, fills you with determination.)',
                            '<32>{#p/human}* (HP totalmente restaurado.)'
                        ]
                        : [
                            '<32>{#p/human}* (The sight of weird and wonderful creatures fills you with determination.)',
                            '<32>{#p/human}* (HP totalmente restaurado.)'
                        ]
        },
        w_mouse: {
            name: 'Outlands - Stærmite Hole',
            text: () =>
                world.population > 5 && !SAVE.data.b.svr && !world.runaway
                    ? [
                        '<32>{#p/human}* (Knowing that the stærmite will one day emerge...)',
                        '<32>{#p/human}* (The thought fills you with determinætion.)'
                    ]
                    : [
                        '<32>{#p/human}* (Even if the stærmite may never emerge again...)',
                        '<32>{#p/human}* (The situation fills you with determinætion.)'
                    ]
        },
        w_start: {
            name: 'Crash Site',
            text: []
        }
    }
};


// END-TRANSLATE
