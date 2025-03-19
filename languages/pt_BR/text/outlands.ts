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
            choicer.create('* (O que você diz?)', 'Esquece', 'Posso\nir pra casa?')
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
            '<25>{#f/0}* Tem uma rima para ser resolvida aqui. Você gostaria de tentar?',
            choicer.create('* (Resolver a rima?)', 'Sim', 'Não')
        ],
        danger_puzzle5a: [
            '<25>{#p/toriel}* Excelente! A importância de tentar e chegar ao aprendizado.',
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
            '<25>{#f/1}* Como um humano no Outpost, você provavelmente será atacado...',
            '<25>{#f/0}* Se isso acontecer, você vai entrar naquilo conhecido como uma LUTA.',
            '<25>{#f/0}* Felizmente, existem muitas formas de se sair de uma.',
            '<25>{#f/1}* Por agora, eu recomendo que você faça uma conversa agradável...',
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
            '<25>{#f/0}* Enquanto eu estou fora, espero que você se comporte bem.',
            '<25>{#f/1}* Existem desafios a frente que necessitam ser explicados...',
            '<25>{#f/0}* Sair por aí sozinho te trará perigos.',
            '<25>{#f/10}* Aqui.\n* Pegue esse celular.',
            '<32>{#p/human}{#s/equip}* (Você pegou o celular.)',
            ...([1, 5].includes(SAVE.data.n.state_wastelands_dummy) && SAVE.data.b.w_state_riddleskip
                ? [
                    '<25>{#p/toriel}{#f/1}* Se você precisar de qualquer coisa enquanto estou fora...',
                    '<25>{#f/0}* Não hesite em ligar-me.',
                    '<25>{#f/5}* ...',
                    '<26>{#f/23}* E fique longe de confusão.'
                ]
                : [
                    '<25>{#p/toriel}{#f/1}* Se você precisar de qualquer coisa enquanto estou fora...',
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
                '<25>{#p/toriel}* Pronto, pronto...\n* Eu vou encontrar outro celular pra você.',
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
                "<32>* Ha!\n* Eu consigo ver pela sua cara que você ainda não tentou.",
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
                            "<32>* Eu procuro alguém que queira comprar este quadrinho limitado do Super Starwalker.",
                            "<32>* Eu gostei daquele show, então você tem um desconto.\n* 5G, pegar ou largar.",
                            choicer.create('{#n1!}* (Comprar o Super Starwalker 1 por 5G?)', 'Sim', 'Não')
                        ]
                        : [
                            ...(world.postnoot
                                ? [
                                    "<32>{#p/basic}{#n1}* Ei, você percebeu que tem algo estranho acontecendo por aí?",
                                    "<32>* Eu poderia jurar que os quebra-cabeças foram desativados sozinhos.",
                                    "<32>* Bem, eu estou procurando algum comprador para esta edição limitada do Super Starwalker."
                                ]
                                : [
                                    '<32>{#p/basic}{#n1}* Finalmente, alguém falou comigo!',
                                    "<32>* Eu estou parado aqui faz anos e ninguém aceitou minha oferta.",
                                    "<32>* Eu procuro alguém que queira comprar este quadrinho limitado do Super Starwalker."
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
                                '<32>{#n1!}{#n2}* Hey, para de falar mal dos meus produtos na frente dos clientes! ;)',
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
            '<25>{#p/toriel}* Me desculpe, foi tolo da minha parte te deixar sozinho.',
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
                            '<25>{#f/0}* Eu pensei que você iria preferir isso invés da torta de lesma.'
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
                                '<32>* \"Silencio, A Grande Fuga,\" é como é chamado.',
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
                            '<32>* O chefe me mandou aqui para ver o que vocês, lindas, estão fazendo, sabe? ;)',
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
            a: ['<32>{#p/basic}* Mais tarde...'],
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
        kitchenwall: () =>
            SAVE.data.n.plot === 9
                ? ['<26>{#p/toriel}{#f/1}* Paciência, minha criança!']
                : ['<26>{#p/toriel}{#f/1}* Isso talvez tome um tempo...'],
        torielwall: () => [
            "<32>{#p/basic}* Está trancado.",
            toriSV()
                ? SAVE.data.n.plot < 17.001
                    ? '<32>{#p/basic}* Parece que a Toriel está chorando...'
                    : '<32>{#p/basic}* Parece que a Toriel está dormindo...'
                : '<32>{#p/basic}* Parece que a Toriel está escrevendo...'
        ],
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
                            : ['<32>{#p/basic}* Um set de DJ estiloso, equipado com botões e controles deslizantes.'],
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
                        '<32>* (Estranho, né? Mas eu ouvi dizer que os humanos ficam azuis quando são espancados também.)',
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
            '<25>{#p/toriel}* ... precisam da assistência de outro monstro.',
            '<25>{#f/1}* Você entende o que precisa fazer agora?'
        ],
        tutorial_puzzle2a: ['<25>{#p/toriel}{#f/1}* Você entende o que deve fazer agora?'],
        tutorial_puzzle3: ['<25>{#p/toriel}* Muito bem, pequeno!\n* Muito bem.'],
        tutorial_puzzle4: ['<25>{#p/toriel}{#f/1}* Sua vez...'],
        tutorial_puzzle4a: ['<25>{#p/toriel}{#f/0}* É sua vez.'],
        tutorial_puzzle5: ['<25>{#p/toriel}* Muito bem!\n* Apenas mais uma vez.'],
        tutorial_puzzle6: ['<25>{#p/toriel}{#f/1}* Estou muito orgulhosa de você, minha criança...'],
        tutorial_puzzle7: ['<25>{#p/toriel}* Venha comigo quando estiver pronto para sua próxima lição.'],
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
            "<25>{#f/8}* Eu não estou no meu melhor formato, mas...",
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
        twinkly9a8: ['<25>{#f/8}{#v/0}* Covarde...'],
        twinkly9b: [
            '<25>{#p/twinkly}{#f/5}* $(name)...?',
            "<25>{#f/6}* Eu não tenho exata certeza do que acabou de acontecer.",
            '<25>{#f/8}* Nós estávamos na nave e então...',
            '<25>{#f/8}* ...',
            '<25>{#f/6}* Eu...',
            '<25>{#f/8}* Eu tenho que ir...'
        ],
        twinkly9c: [
            "<25>{#p/twinkly}{#f/7}* Então, de volta ao começo estamos?",
            "<26>{#f/5}* Eu estava te esperando.\n* Eu me pergunto como você vai se sair dessa vez.",
            "<25>{#f/11}* Quem sabe?\n* Talvez seja mais fácil dessa vez.",
            '<25>{#f/7}* Certamente foi para mim quando eu tinha seus poderes.',
            '<25>{#f/6}* ...',
            '<25>{#f/5}* Boa sorte!'
        ],
        twinkly10: [
            "<20>{#f/5}Vê esse coração? Essa é sua ALMA, a culminância do seu ser!",
            '<20>{#f/5}Sua ALMA é uma parte importante de você e precisa de LOVE para se sustentar.'
        ],
        twinkly11: [
            "<20>{*}{#x2}{#f/5}Por aqui, o \nLOVE é compartilhado através de... {#f/11}'fragmentos de felicidade.'",
            "<20>{*}{#f/5}Para te colocar no caminho correto, eu vou começar compartilhando parte do meu LOVE contigo.",
            '<20>{*}{#f/5}Tente pegar o máximo que conseguir!{^20}{*}{#x1}{%}'
        ],
        twinkly12: [
            "<20>{*}{#f/8}Ops, eu acho que você os perdeu...",
            "<20>{*}{#f/5}Mas tudo bem!",
            '<20>{*}{#x2}{#f/10}Aqui, pega mais um pouco.{^20}{*}{#x1}{%}'
        ],
        twinkly13: [
            '<20>{*}{#f/12}Mas o que-... você tem demência ou coisa do tipo?',
            '<20>{*}{#x2}CORRA. PARA. AS. BALAS!!!{^20}{*}{#x1}{^999}'
        ],
        twinkly14: 'CORRA. PARA. OS. fragmentos da amizade~',
        twinkly15: [
            '<20>{#v/1}Hee hee hee...',
            "<20>Neste mundo, é MATAR ou MORRER.",
            '<20>Imagine, uma ALMA como a sua aparecendo na minha porta...',
            "<20>Você realmente pensou que eu deixaria passar essa oportunidade?"
        ],
        twinkly16: [
            "<20>{#f/7}Nah, você sabe o que está acontecendo aqui, não sabe?",
            "<20>Você só queria tormentar um pouco seu velho amigo Twinkly, não é?",
            "<20>Senhor... você não deve fazer ideia com quem está mexendo.",
            '<20>{#f/11}Hee hee hee...'
        ],
        twinkly17: ["<20>{#v/1}Que tal só irmos direto ao ponto, não é mesmo?", '<20>Hee hee hee...'],
        twinkly18: ['<20>{*}{#f/2}{#v/1}{@random=1.1/1.1}MORRA.{^20}{%}'],
        twinkly19: ['<20>{#p/toriel}Que criatura terrível, torturando uma pobre e inocente criança...'],
        twinkly20: [
            '<20>Não tenha medo, pequeno.',
            '<20>Eu sou {@fill=#003cff}TORIEL{@fill=#000}, protetora das {@fill=#f00}OUTLANDS{@fill=#000}.',
            '<20>Eu venho aqui todo dia para olhar se alguém pode ter batido a nave.',
            '<20>Siga-me, criança.\nTem muito que eu preciso te ensinar.'
        ],
        twinkly21: [
            '<25>{#p/toriel}{#f/1}* Oh!\n* De onde você veio, pequeno?',
            '<25>{#f/1}* Você está ferido?',
            '<25>{#f/0}* ...\n* Me perdoe por perguntar tantas coisas.',
            '<25>{#f/0}* Eu sou {@fill=#003cff}TORIEL{@fill=#fff}, protetora das {@fill=#f00}OUTLANDS{@fill=#fff}.',
            '<26>{#f/0}* Eu venho aqui todos os dias para ver se alguém não caiu.',
            '<25>{#f/0}* Siga-me, criança.\n* A muito que eu preciso te ensinar.'
        ],
        twinkly22: ['<25>{#f/0}* Por aqui.'],
        w_coffin0: () => [
            '<32>{#p/human}* (Você sente que seria melhor deixar isso assim.)',
            ...(SAVE.data.b.svr ? ['<25>{#p/asriel1}{#f/13}* ...'] : [])
        ],
        w_coffin1: () => [
            '<32>{#p/basic}* Este cofre é bem velho.\n* Não tem nada memorável sobre isso.',
            ...(world.goatbro && SAVE.flag.n.ga_asrielCoffin++ < 1
                ? [
                    '<25>{#p/asriel2}{#f/13}* Oh, olha pra isso.\n* Eles fizeram um só para você, $(name).',
                    '<25>{#p/asriel2}{#f/5}* Que tocante.'
                ]
                : [])
        ],
        w_coffin2: pager.create(
            0,
            () => [
                '<32>{#p/basic}* Este cofre é datado em dezembro de 251X.',
                '<32>* Há um antigo manifesto de manutenção de registros escondido ao lado dele...',
                choicer.create('* (Acessar o manifesto?)', 'Sim', 'Não')
            ],
            () => [
                '<32>{#p/human}* (Você pega o manifesto novamente.)',
                choicer.create('* (Acessar o manifesto?)', 'Sim', 'Não')
            ]
        ),
        w_coffin3: () => [choicer.create('* (Ler a próxima página?)', 'Sim', 'Não')],
        w_coffin4: ['<32>{#p/human}* (Porém não havia mais nada para ler.)'],
        w_coffin5: ['<32>{#p/human}* (Você põe o manifesto de volta a onde ele pertence.)'],
        w_dummy1: () =>
            SAVE.data.b.svr
                ? ['<32>{#p/human}* (Você põe suas mãos no boneco.)\n* (Parece muito desgastado.)']
                : ['<32>{#p/basic}* Um boneco de treino, circa 251X.\n* Edição padrão da CIDADELA.'],
        wonder1: [
            '<32>{#p/basic}* Pode ouvir isso? \n* O som das estrelas?',
            "<32>* Em certos lugares no Outpost, como este aqui... é aqui.",
            '<32>* Você só precisa estar ouvindo.',
            '<32>* Bem legal, certo?'
        ]
    },

    b_group_outlands: {
        froggitWhimsun: ['<32>{#p/story}* Sapos espaciais e Starflies!\n* Ou algo parecido.'],
        froggitWhimsun2a: ['<32>{#p/story}* Sapos espaciais...?'],
        froggitWhimsun2b: ['<32>{#p/story}* Starflies...?'],
        looxMigospWhimsun: ["<32>{#p/story}* É o trio dos problemas!"],
        looxMigospWhimsun2: ['<32>{#p/story}* O trio se tornou um duo.'],
        looxMigospWhimsun3: ['<32>{#p/story}* Só mais um.'],
        moldsmalMigosp: ['<32>{#p/story}* Silente e companhia se apresentam!']
    },

    b_opponent_froggit: {
        act_check: ['<32>{#p/story}* FROGGIT - ATQ 4 DEF 5\n* A vida é difícil para esse monstro.'],
        act_check2: ['<32>{#p/story}* FROGGIT - ATQ 4 DEF 5\n* A vida está ficando melhor para este monstro.'],
        act_check3: ["<32>{#p/story}* FROGGIT - ATQ 4 DEF 5\n* A vida não parece ficar mais fácil para este monstro."],
        act_check4: ['<32>{#p/story}* FROGGIT - ATQ 4 DEF 5\n* A vida é bem confusa para este monstro.'],
        act_check5: ['<32>{#p/story}* FROGGIT - ATQ 4 DEF 5\n* A vida parece ser um amor confuso para este monstro.'],
        act_threat: [
            '<32>{#p/human}* (Você ameaçou Froggit.)',
            "<32>{#p/basic}* Froggit não entendeu o que você disse..."
        ],
        act_threat2: [
            '<32>{#p/human}* (Você ameaçou o Froggit novamente.)',
            "<32>{#p/basic}* Froggit lembrou-se das ameaças passadas e decidiu que é hora de fugir."
        ],
        act_compliment: [
            '<32>{#p/human}* (Você cumprimentou Froggit.)',
            "<32>{#p/basic}* Froggit não entendeu o que você disse..."
        ],
        act_flirt: [
            '<32>{#p/human}* (Você flertou com Froggit.)',
            "<32>{#p/basic}* Froggit não entendeu o que você disse..."
        ],
        act_translate0: ["<32>{#p/human}* (Mas você não disse nada para traduzir isso.)"],
        act_translate1: [
            '<32>{#p/human}* (Você traduziu o que disse.)\n* (Froggit parece entender agora.)',
            '<32>{#p/basic}* Froggit está abismado.'
        ],
        act_translate1x: [
            '<32>{#p/human}* (Você traduziu o que disse.)\n* (Froggit parece entender agora.)',
            '<32>{#p/basic}* Froggit está hesitante em relação a continuar está batalha.'
        ],
        act_translate1y: [
            '<32>{#p/human}* (Você traduziu o que disse.)\n* (Froggit parece entender agora.)',
            '<32>* Sentindo-se ameaçado, Froggit corre da batalha!'
        ],
        act_translate1z: [
            '<32>{#p/human}* (Você traduziu o que disse.)\n* (Froggit parece entender agora.)',
            '<32>{#p/basic}* Froggit não mostra sinais de medo.'
        ],
        act_translate2: [
            '<32>{#p/human}* (Você traduziu o que disse.)\n* (Froggit parece entender agora.)',
            '<32>{#p/basic}* Froggit está corando, mesmo que apenas por dentro.'
        ],
        confuseText: ['<08>{#p/basic}{~}Ribbit, ribbit?'],
        flirtText: ['<08>{#p/basic}{~}(Fica vermelho.)\nRibbit...'],
        idleText1: ['<08>{#p/basic}{~}Ribbit, ribbit.'],
        idleText2: ['<08>{#p/basic}{~}Croak, croak.'],
        idleText3: ['<08>{#p/basic}{~}Hop, hop.'],
        idleText4: ['<08>{#p/basic}{~}Meow.'],
        mercyStatus: ['<32>{#p/story}* Froggit parece relutante sobre lutar com você.'],
        name: '* Froggit',
        meanText: ['<08>{#p/basic}{~}(Arrepio, agitação.)\nRibbit...'],
        niceText: ['<08>{#p/basic}{~}(Cora suavemente.)\nRibbit...'],
        perilStatus: ['<32>{#p/story}* Froggit está tentando fugir.'],
        status1: ['<32>{#p/story}* Froggit pula perto!'],
        status2: ['<32>{#p/story}* O campo de batalha está cheio do cheiro de crystherium utilia.'],
        status3: ["<32>{#p/story}* Froggit parece não enteder o motivo de estar aqui."],
        status4: ['<32>{#p/story}* Froggit pula e gira.']
    },
    b_opponent_whimsun: {
        act_check: ['<32>{#p/story}* FLUTTERLYTE - ATQ 5 DEF 0\n* Este monstro acabou de aprender a voar...'],
        act_check2: ['<32>{#p/story}* FLUTTERLYTE - ATQ 5 DEF 0\n* Este monstro desejava ter ficado no chão.'],
        act_console: [
            '<32>{#p/human}* (Você ajuda Flutterlyte a voar mais alto no ar.)',
            '<32>{#p/basic}* Flutterlyte te agradece, e voa para longe...'
        ],
        act_flirt: [
            '<32>{#p/human}* (Você flerta com Flutterlyte.)',
            '<32>{#p/basic}* Sem capacidade de aguentar seu cumprimento, Flutterlyte se acaba em choro e voa...'
        ],
        act_terrorize: [
            '<32>{#p/human}* (Você chora, lamenta e range os dentes.)',
            '<32>{#p/basic}* Flutterlyte entra em pânico e voa longe...'
        ],
        idleTalk1: ['<08>{#p/basic}{~}Por que isso é tão difícil...'],
        idleTalk2: ['<08>{#p/basic}{~}Por favor me ajude...'],
        idleTalk3: ["<08>{#p/basic}{~}Eu tenho medo..."],
        idleTalk4: ["<08>{#p/basic}{~}Eu não consigo..."],
        idleTalk5: ['<08>{#p/basic}{~}\x00*sniff sniff*'],
        name: '* Flutterlyte',
        perilStatus: ['<32>{#p/story}* Flutterlyte mal consegue se manter no ar.'],
        status1: ['<32>{#p/story}* Flutterlyte aparece!'],
        status2: ['<32>{#p/story}* Flutterlyte continua pedindo desculpas.'],
        status3: ['<32>{#p/story}* Flutterlyte paira mansamente.'],
        status4: ['<32>{#p/story}* O cheiro de pêras frescas permeia pelo ar.'],
        status5: ['<32>{#p/story}* Flutterlyte está hiperventilando.'],
        status6: ['<32>{#p/story}* Flutterlyte evita contato visual.']
    },
    b_opponent_loox: {
        act_check: ['<32>{#p/story}* OCULOUX - ATQ 6 DEF 6\n* Mestre na competição de encarar.\n* Nome de família: Eyewalker'],
        act_check2: [
            "<32>{#p/story}* OCULOUX - ATQ 6 DEF 6\n* Este Bully está tentando muito pretender que não está lisonjeado."
        ],
        act_check3: ['<32>{#p/story}* OCULOUX - ATQ 6 DEF 6\n* Este monstro está honrado por estar no seu campo de vista.'],
        act_dontpick: [
            '<32>{#p/human}* (Você encara Oculoux.)\n* (Oculoux encara com mais precisão.)',
            "<32>{#p/human}* (O olho de Oculoux fica cada vez mais tenso e, eventualmente...)",
            '<32>{#p/human}* (... Oculoux desiste.)'
        ],
        act_flirt: ['<32>{#p/human}* (Você flerta com Oculoux.)'],
        act_pick: ['<32>{#p/human}* (Você rudemente crítica Oculoux por encarar pessoas.)'],
        checkTalk1: ['<08>{#p/basic}{~}Você ousa encarar?'],
        dontDeny1: ['<08>{#p/basic}{~}Olha quem mudou de opinião.'],
        dontTalk1: ['<99>{#p/basic}{~}O olhar\né\nforte\ncom\neste.'],
        flirtDeny1: ['<08>{#p/basic}{~}Que tsundere da sua parte.'],
        flirtTalk1: ['<08>{#p/basic}{~}Que? S-sem chance!'],
        hurtStatus: ['<32>{#p/story}* Oculoux está regando.'],
        idleTalk1: ["<08>{#p/basic}{~}Eu tenho meus olhos em você."],
        idleTalk2: ["<08>{#p/basic}{~}Não me diga o que fazer."],
        idleTalk3: ['<08>{#p/basic}{~}Encarar é cuidar.'],
        idleTalk4: ['<08>{#p/basic}{~}Que monstruosidade.'],
        idleTalk5: ['<08>{#p/basic}{~}Que tal uma competição de encaradas?'],
        name: '* Oculoux',
        pickTalk1: ['<08>{#p/basic}{~}Como você ousa questionar nosso método de vida!'],
        spareStatus: ["<32>{#p/story}* Oculoux não parece mais se importar com a luta."],
        status1: ['<32>{#p/story}* Um par de Oculoux se aproximam!'],
        status2: ['<32>{#p/story}* Oculoux está encarando você diretamente.'],
        status3: ['<32>{#p/story}* Oculoux range os dentes.'],
        status4: ['<32>{#p/story}* Cheira a gotas de lágrimas.'],
        status5: ['<32>{#p/story}* Oculoux ficou vermelho.'],
        status6: ['<32>{#p/story}* Oculoux está olhando para você.'],
        status7: ['<32>{#p/story}* Oculoux está sozinho agora.']
    },
    b_opponent_migosp: {
        act_check: ["<32>{#p/story}* SILENTE - ATQ 7 DEF 5\n* Parece malvado, mas só está com a plateia errada..."],
        act_check2: ['<33>{#p/story}* SILENTE - ATQ 7 DEF 5\n* Agora sozinho, ele expressa seu amor pela dança.'],
        act_check3: ['<32>{#p/story}* SILENTE - ATQ 7 DEF 5\n* Ele parece confortável com você.\n* MUITO confortável.'],
        act_check4: ["<32>{#p/story}* SILENTE - ATQ 7 DEF 5\n* Mesmo parecendo durão, ele claramente está em dor..."],
        act_flirt: ['<32>{#p/human}* (Você flerta com Silente.)'],
        flirtTalk: ['<08>{#p/basic}{~}Hiya~'],
        groupInsult: ["<32>{#p/human}* (Você tenta insultar Silente, mas ele está focado demais nos outros.)"],
        groupStatus1: ['<32>{#p/story}* Silente está sussurrando para os outros.'],
        groupStatus2: ["<32>{#p/story}* Está começando a cheirar a um hotel barato."],
        groupTalk1: ['<08>{#p/basic}MENTE SOLTEIRA IMUNDA\n..'],
        groupTalk2: ['<08>{#p/basic}OBEDEÇA A MENTE MAIOR\n..'],
        groupTalk3: ['<08>{#p/basic}LEGIÃO! NÓS SOMOS A LEGIÃO!'],
        groupTalk4: ['<08>{#p/basic}PRESTE ATENÇÃO AO ENXAME\n..'],
        groupTalk5: ['<08>{#p/basic}EM UNÍSSONO, AGORA \n..'],
        groupTalk6: ["<08>{#p/basic}EU NÃO LIGO."],
        name: '* Silente',
        perilStatus: ['<32>{#p/story}* Silente recusa desistir.'],
        soloInsult: ["<32>{#p/human}* (Você tenta insultar Silente, mas ele tá muito feliz pra ligar.)"],
        soloStatus: ["<32>{#p/story}* Silente não parece se importar no cosmos."],
        soloTalk1: ["<08>{#p/basic}{~}Ser eu é muito legal!"],
        soloTalk2: ['<08>{#p/basic}{~}La la~ Só seja vo- cê~'],
        soloTalk3: ["<08>{#p/basic}{~}Nada como um tempo sozinho!"],
        soloTalk4: ['<08>{#p/basic}{~}Mmm, cha cha cha!'],
        soloTalk5: ['<08>{#p/basic}{~}Balance os braços, bebê~']
    },
    b_opponent_mushy: {
        act_challenge: [
            '<32>{#p/human}* (Você desafia Mushy para um duelo.)',
            "<33>{#p/story}* Mushy aumenta sua VELOCIDADE para este turno!"
        ],
        act_check: ['<32>{#p/story}* MUSHY - ATQ 6 DEF 6\n* Grande fã de cowboys do espaço.\n* Pistoleiro.'],
        act_check2: ['<32>{#p/story}* MUSHY - ATQ 6 DEF 6\n* Grande fã de cowboys do espaço.\n* Até mesmo os fortões.'],
        act_check3: ['<32>{#p/story}* MUSHY - ATQ 6 DEF 6\n* Após dar tudo de si, este pistoleiro está impressionado.'],
        act_flirt: ['<32>{#p/human}* (Você flerta com Mushy.)'],
        act_taunt: ['<32>{#p/human}* (Você zomba de Mushy.)'],
        challengeStatus: ['<32>{#p/story}* Mushy aguarda o próximo desafio.'],
        challengeTalk1: ["<08>{#p/basic}{~}Vamos ver o que você tem."],
        challengeTalk2: ['<08>{#p/basic}{~}Você acha que pode me vencer?'],
        flirtStatus1: ['<32>{#p/story}* Mushy, o confuso e o despertado.'],
        flirtTalk1: ['<08>{#p/basic}{~}H-hey, para com isso!'],
        hurtStatus: ['<32>{#p/story}* Mushy faz um último levante.'],
        idleTalk1: ['<08>{#p/basic}{~}Bang!\nBang!\nBang!'],
        idleTalk2: ['<08>{#p/basic}{~}Segura essa!'],
        idleTalk3: ["<08>{#p/basic}{~}Tudo em dia."],
        name: '* Mushy',
        spareStatus: ['<32>{#p/story}* Mushy se curva em respeito.'],
        status1: ['<32>{#p/story}* Mushy invade!'],
        status2: ['<32>{#p/story}* Mushy ajusta sua postura.'],
        status3: ['<32>{#p/story}* Mushy se prepara para uma grande batalha.'],
        status4: ['<32>{#p/story}* Mushy segura o coldre.'],
        status5: ['<32>{#p/story}* Cheira a pólvora.'],
        tauntStatus1: ["<32>{#p/story}* Mushy pretende não estar aborrecido por suas provocações."],
        tauntTalk1: ["<08>{#p/basic}{~}Como se tudo isso fosse funcionar em mim."]
    },
    b_opponent_napstablook: {
        act_check: ["<32>{#p/story}* NAPSTABLOOK - ATQ 10 DEF 255\n* É o Napstablook."],
        act_check2: [
            "<32>{#p/story}* NAPSTABLOOK - ATQ 10 DEF 255\n* Não parece que ele quer estar aqui por mais tempo."
        ],
        act_check3: ['<32>{#p/story}* NAPSTABLOOK - ATQ 10 DEF 255\n* Com esperança, pela primeira vez em um tempo...'],
        act_check4: ['<32>{#p/story}* NAPSTABLOOK - ATQ 10 DEF 255\n* A tensão romântica está no seu auge.'],
        awkwardTalk: ['<11>{#p/napstablook}{~}uh...', '<11>{#p/napstablook}{~}okay, eu acho...?'],
        checkTalk: ["<11>{#p/napstablook}{~}sou eu..."],
        cheer0: ['<32>{#p/human}* (Você tenta consolar Napstablook.)'],
        cheer1: ['<32>{#p/human}* (Você da a Napstablook um sorriso simpático.)'],
        cheer2: ['<32>{#p/human}* (Você conta para Napstablook uma pequena piada.)'],
        cheer3: ["<32>{#p/human}* (Você demonstra adoração pelo chapéu de Napstablook.)"],
        cheerTalk1: ['<11>{#p/napstablook}{~}...?'],
        cheerTalk2: ['<11>{#p/napstablook}{~}heh heh...'],
        cheerTalk3: [
            '<11>{*}{#p/napstablook}{~}deixe-me {#x1}tentar...{^20}{#x2}{^20}{%}',
            "<11>{*}{#p/napstablook}{~}eu chamo de {#x3}'dapper blook'{^40}{%}",
            '<11>{*}{#p/napstablook}{~}você gostou?{^40}{%}'
        ],
        cheerTalk4: ['<11>{#p/napstablook}{~}oh meu.....'],
        consoleTalk1: ['<11>{#p/napstablook}{~}claro, claro...'],
        consoleTalk2: ['<11>{#p/napstablook}{~}não entendo...'],
        consoleTalk3: ["<11>{#p/napstablook}{~}você não sente muito..."],
        deadTalk: [
            "<11>{#p/napstablook}{~}umm... você sabe que não pode matar fantasmas, certo...?",
            "<11>{~}nós somos meio que incorpóreos e tals",
            "<11>{~}eu estava abaixando minha vida só pra não ser rude",
            '<11>{~}desculpa... eu só fiz disso mais estranho...',
            '<11>{~}vamos pretender que você me venceu...',
            '<11>{~}ooooooooo'
        ],
        flirt1: ['<32>{#p/human}* (Você flerta com Napstablook.)'],
        flirt2: ['<32>{#p/human}* (Você tenta sua melhor fala no Napstablook.)'],
        flirt3: ['<32>{#p/human}* (Você faz um elogio sincero a Napstablook.)'],
        flirt4: ['<32>{#p/human}* (Você tranquiliza Napstablook de seus sentimentos em relação a eles.)'],
        flirtTalk1: ["<11>{#p/napstablook}{~}eu só te faria mal"],
        flirtTalk2: ["<11>{#p/napstablook}{~}oh.....\neu já escutei essa..."],
        flirtTalk3: ['<11>{#p/napstablook}{~}uh... você acha mesmo?'],
        flirtTalk4: ["<11>{#p/napstablook}{~}oh, você está falando sério...", '<11>{~}oh não.....'],
        idleTalk1: ["<11>{#p/napstablook}{~}eu estou bem, obrigado"],
        idleTalk2: ['<11>{#p/napstablook}{~}apenas conectando...'],
        idleTalk3: ['<11>{#p/napstablook}{~}Só fazendo minhas coisas...'],
        insultTalk1: ['<11>{#p/napstablook}{~}eu sabia...'],
        insultTalk2: ['<11>{#p/napstablook}{~}tanto faz...'],
        insultTalk3: ['<11>{#p/napstablook}{~}diga o que quiser...'],
        insultTalk4: ['<11>{#p/napstablook}{~}jogue tudo pra fora...'],
        name: '* Napstablook',
        silentTalk: ['<11>{#p/napstablook}{~}...'],
        sincere: ["<32>{#p/human}* (Você faz um comentário de flerte sobre o chapéu de Napstablook.)"],
        sincereTalk: ['<11>{#p/napstablook}{~}heh... valeu'],
        status1: ['<32>{#p/story}* Aí vem Napstablook.'],
        status2: ['<32>{#p/story}* Napstablook parece um pouco melhor.'],
        status3: ['<32>{#p/story}* Napstablook parece querer te mostrar algo.'],
        status3a: ['<32>{#p/story}* Napstablook espera uma resposta.'],
        status4: ["<32>{#p/story}* Os olhos de Napstablook estão brilhando."],
        status5: ['<32>{#p/story}* Napstablook claramente não sabe lidar com essa situação.'],
        status5a: ['<32>{#p/story}* Napstablook está questionando a si mesmo.'],
        status6: ['<32>{#p/story}* Napstablook está ganhando tempo.'],
        status7: ['<32>{#p/story}* Napstablook espera pelo seu próximo movimento.'],
        status8: ['<32>{#p/story}* Napstablook está olhando para a distância.'],
        status9: ["<32>{#p/story}* Napstablook desejava não estar aqui."],
        status10: ['<32>{#p/story}* Napstablook está tentando de tudo para te ignorar.'],
        suck: ['<32>{#p/human}* (Você fala para Napstablook que o chapéu dele é uma merda.)'],
        threat: ['<32>{#p/human}* (Você ameaça Napstablook.)']
    },
    b_opponent_toriel: {
        spannerText: ['<32>{#p/human}* (Você joga a chave inglesa.)\n* (Toriel pega e devolve para você.)'],
        spannerTalk: ['<11>{#p/toriel}{#f/22}Isso não fará nada, minha criança.'],
        spannerTalkRepeat: ['<11>{#p/toriel}{#f/22}...'],
        act_check: ['<32>{#p/story}* TORIEL - ATQ 80 DEF 80\n* Sabe o melhor pra você.'],
        act_check2: ['<32>{#p/story}* TORIEL - ATQ 80 DEF 80\n* Parece estar se segurando.'],
        act_check3: ['<32>{#p/story}* TORIEL - ATQ 80 DEF 80\n* Parece pré-ocupada.'],
        act_check4: ['<32>{#p/story}* TORIEL - ATQ 80 DEF 80\n* Só quer o melhor pra você.'],
        act_check5: ['<32>{#p/story}* TORIEL - ATQ 80 DEF 80\n* Só quer o melhor pra você.'],
        precrime: ['<20>{#p/asriel2}...'],
        criminal1: (reveal: boolean) => [
            '<20>{#p/asriel2}{#f/3}Olá, $(name).',
            "<20>{#f/1}É bom estar de volta.",
            "<20>{#f/2}O que?\nVocê não esperava me ver novamente?",
            '<20>{#f/13}...\nOh, $(name)...',
            ...(reveal
                ? ["<20>{#f/1}Eu tenho esperado por isso faz muito tempo."]
                : [
                    "<20>{#f/15}Eu estive preso dentro de uma estrela por tanto tempo, eu...",
                    '<20>{#f/15}...',
                    "<20>{#f/16}Bem, isso não importa agora.",
                    '<20>{#f/1}O que importa é que as coisas voltaram a como deveriam ser.'
                ]),
            '<20>{#f/1}Hee hee hee...',
            "<20>{#f/2}Eu sei que você é vazio por dentro, assim como eu.",
            "<20>{#f/5}Ainda somos inseparáveis após todos estes anos...",
            "<20>{#f/1}Escuta.\nEu tenho um plano que vai nos trazer mais próximos que nunca.",
            '<20>{#f/1}Comigo, você, e nossas ALMAS roubadas...',
            "<20>{#f/1}Vamos destruir tudo neste Outpost abandonado.",
            '<21>{#f/2}Qualquer um que tentar ficar no caminho do nosso futuro perfeito...',
            "<20>{#f/1}Vamos transformá-lo em poeira."
        ],
        criminal2: ['<20>{#p/asriel2}{#f/3}Bem-vindo de volta, $(name).', '<20>{#f/1}Pronto para começar de onde paramos?'],
        criminal3: ['<20>{#p/asriel2}{#f/3}Pois bem.', '<20>{#f/3}...', "<20>{#f/4}Só vamos indo logo."],
        cutscene1: [
            "<32>{#p/basic}* Talvez porque eu seja o único que você vai escutar.",
            '<25>{#p/toriel}{#f/16}* ...!?',
            "<32>{#p/basic}* Mas o que eu sei, huh?\n* Eu sou só uma doce e inocente criança."
        ],
        cutscene2: [
            '<25>{#p/toriel}{#f/3}* ...',
            '<25>{#p/toriel}{#f/4}* Isso é impossível...',
            '<25>{#f/0}* Eu devo estar sonhando.\n* Ou alucinando.\n* Ou talvez...',
            '<32>{#p/basic}* Não.',
            '<32>{#p/basic}* Isso é real.',
            '<25>{#p/toriel}{#f/5}* Mas você morreu, $(name).',
            '<25>{#f/5}* Você não pode possivelmente estar falando comigo.',
            "<32>{#p/basic}* Pretenda que é um sonho, então.",
            '<32>{#p/basic}* Se isso funciona pra você.',
            '<25>{#p/toriel}{#f/5}* ...',
            '<25>{#p/toriel}{#f/9}* O que você quer?',
            '<32>{#p/basic}* Toriel...',
            "<32>{#p/basic}* Você sabe com eu me sinto em relação a humanidade, não sabe?",
            '<25>{#p/toriel}{#f/13}* Claro.',
            '<32>{#p/basic}* Errado.',
            '<32>{#p/basic}* ... não é o caso com esse humano.',
            "<32>* Desde que ele chegou aqui, eu estive o seguindo...",
            "<32>* E agora ele está me pedindo para te alcançar.",
            '<32>* O que você acha que isso significa?',
            '<25>{#p/toriel}{#f/13}* ...',
            '<32>{#p/basic}* Significa que você deve deixá-lo ir.',
            '<25>{#p/toriel}{#f/12}* ... você não entende o que está em jogo aqui?',
            '<25>{#f/11}* Seu eu deixá-lo ir, ele com certeza vai morrer.',
            '<32>{#p/basic}* ... não vai.',
            "<32>{#p/basic}* E não é por isso que você está fazendo toda essa briga, ou é?",
            '<25>{#p/toriel}{#f/12}* Com essa atitude, talvez você realmente seja $(name).',
            '<25>{#p/toriel}{#f/11}* Você sempre questionou minha autoridade.',
            '<32>{#p/basic}* Eu acho que tenho todo o direito.',
            '<32>{#p/basic}* Você deseja mantê-lo aqui por medo do que tem depois das Outlands.',
            "<33>{#p/basic}* Mas as coisas não são as mesmas de cem anos atrás.",
            "<33>{#p/basic}* Você só é ignorante e tem medo de ir ver como as coisas estão por conta própria.",
            '<25>{#p/toriel}{#f/13}* ...',
            "<25>{#p/toriel}{#f/13}* ... mas se eu deixar ele ir, eu não serei capaz de...",
            '<32>{#p/basic}* Estar lá por ele?',
            '<32>{#p/basic}* Ei, eu sei o sentimento.',
            '<32>{#p/basic}* Mas prender ele aqui será condená-lo a morte para sempre.',
            "<32>{#p/basic}* Que vida é essa da qual não se pode fazer nada que valha a pena vive-la?",
            '<25>{#p/toriel}{#f/13}* ...',
            '<25>{#p/toriel}{#f/13}* $(name), eu...',
            '<32>{#p/basic}* Você deu pra ele um telefone, lembra?',
            "<32>{#p/basic}* Mantenha a linha aberta, e talvez ele possa te fazer uma ligação.",
            '<25>{#p/toriel}{#f/9}* ... e você?',
            "<32>{#p/basic}* Olha.\n* Eu vou ficar bem.",
            "<32>{#p/basic}* Tudo que eu peço é que você não o esqueça após ir embora.",
            '<25>{#p/toriel}{#f/13}* ...',
            '<32>{#p/basic}* até mais, Toriel.',
            '<25>{#p/toriel}{#f/14}* ... até, $(name).'
        ],
        death1: [
            '<11>{#p/toriel}{#f/21}{#v/1}{#i/3}{#x1}{@random=1.1/1.1}Urgh...',
            '<11>{#v/1}{#i/3}{#x1}{@random=1.1/1.1}Me acertar no meu momento de maior fraqueza...',
            '<11>{#v/1}{#i/3}{#x1}{@random=1.1/1.1}...',
            '<11>{#v/2}{#i/4}{#x2}{@random=1.1/1.1}Ha...\nHa...',
            '<11>{#v/2}{#i/4}{#x2}{@random=1.1/1.1}Parece, pequeno...',
            '<11>{#v/3}{#i/5}{#x2}{@random=1.2/1.2}Que foi um erro acreditar em você... desde o início...'
        ],
        death2: [
            '<11>{#p/toriel}{#f/21}{#v/1}{#i/3}{#x1}{@random=1.1/1.1}Urgh...',
            '<11>{#v/1}{#i/3}{#x3}{@random=1.1/1.1}E pensar que eu estava te protegendo deles...',
            '<11>{#v/1}{#i/3}{#x4}{@random=1.1/1.1}...',
            '<11>{#v/2}{#i/4}{#x2}{@random=1.1/1.1}Ha...\nHa...',
            '<11>{#v/2}{#i/4}{#x1}{@random=1.1/1.1}Parece, pequeno...',
            '<11>{#v/3}{#i/5}{#x2}{@random=1.2/1.2}Que eu estava protegendo eles... de você...'
        ],
        death3: [
            '<11>{#p/toriel}{#f/21}{#v/1}{#i/3}{#x1}{@random=1.1/1.1}Urgh...',
            '<11>{#v/1}{#i/3}{#x1}{@random=1.1/1.1}Você é mais forte do que eu pensava...',
            '<11>{#v/1}{#i/3}{#x3}{@random=1.1/1.1}Me escute, pequeno...',
            '<11>{#v/1}{#i/3}{#x3}{@random=1.1/1.1}Em poucos momentos eu irei me tornar em poeira...',
            '<11>{#v/1}{#i/3}{#x3}{@random=1.1/1.1}Quando isso acontecer, tome a minha ALMA...',
            '<11>{#v/1}{#i/3}{#x1}{@random=1.1/1.1}É a única forma de escapar deste lugar.',
            "<11>{#v/2}{#i/4}{#x3}{@random=1.1/1.1}Você não pode... permitir que o plano de ASGORE... tenha sucesso...",
            '<11>{#v/2}{#i/4}{#x1}{@random=1.1/1.1}...',
            '<11>{#v/3}{#i/5}{#x2}{@random=1.2/1.2} Minha criança...',
            "<11>{#v/3}{#i/5}{#x4}{@random=1.2/1.2}Seja boa... tudo bem?"
        ],
        magic1: ['<20>{#p/asriel2}{#f/3}Me siga.'],
        name: '* Toriel',
        spareTalk1: ['<11>{#p/toriel}{#f/11}...'],
        spareTalk2: ['<11>{#p/toriel}{#f/11}...\n...'],
        spareTalk3: ['<11>{#p/toriel}{#f/11}...\n...\n...'],
        spareTalk4: ['<11>{#p/toriel}{#f/17}...?'],
        spareTalk5: ['<11>{#p/toriel}{#f/17}O que você está fazendo?'],
        spareTalk6: ['<11>{#p/toriel}{#f/17}...'],
        spareTalk7: ['<11>{#p/toriel}{#f/17}O que você está tentando provar?'],
        spareTalk8: ['<11>{#p/toriel}{#f/17}...'],
        spareTalk9: ['<11>{#p/toriel}{#f/12}Lute comigo ou fuja!'],
        spareTalk10: ['<11>{#p/toriel}{#f/12}Pare de me olhar desta forma!'],
        spareTalk11: ['<11>{#p/toriel}{#f/12}Vá embora!'],
        spareTalk12: ['<11>{#p/toriel}{#f/13}...'],
        spareTalk13: ['<11>{#p/toriel}{#f/13}...\n...'],
        spareTalk14: ['<11>{#p/toriel}{#f/13}...\n...\n...'],
        spareTalk15: [
            '<11>{#p/toriel}{#f/13}Eu sei que você deseja ir pra casa...',
            '<11>{#p/toriel}{#f/9}Mas o caminho a frente é muito perigoso.'
        ],
        spareTalk16: ['<11>{#p/toriel}{#f/14}Então por favor... volte para casa.'],
        spareTalk17: [
            '<11>{#p/toriel}{#f/13}Eu sei que não temos muito...',
            '<11>{#p/toriel}{#f/10}Mas nós podemos ter uma boa vida aqui.'
        ],
        spareTalk18: [
            '<11>{#p/toriel}{#f/13}Eu e você, como uma família...',
            '<11>{#p/toriel}{#f/10}Isso não parece bom?'
        ],
        spareTalk19: ['<11>{#p/toriel}{#f/21}...'],
        spareTalk20: ['<11>{#p/toriel}{#f/18}Por que você está tornando isso tão difícil?'],
        spareTalk21: ['<11>{#p/toriel}{#f/21}...'],
        spareTalk22: ['<11>{#p/toriel}{#f/18}Por favor, só...', '<11>{#p/toriel}{#f/9}Volte para dentro.'],
        spareTalk23: ['<11>{#p/toriel}{#f/21}...'],
        spareTalk24: ['<11>{#p/toriel}{#f/18}Oh, criança...'],
        spareTalk28b: [
            '<11>{#p/toriel}{#f/9}Talvez foi tolo da minha parte...',
            '<11>{#f/13}Tentar te parar dessa forma...',
            '<11>{#f/9}Talvez eu devesse ter deixado você ir.'
        ],
        spareTalk28c: ['<11>{#p/toriel}{#f/17}...?', '<11>{#f/17}Por que você está chamando por \"$(name)?\"'],
        status1: ['<32>{#p/story}* Toriel está na sua frente.'],
        status2: ['<32>{#p/story}* Toriel prepara um ataque mágico.'],
        status3: ['<32>{#p/story}* Toriel está agindo de forma indiferente.'],
        status4: ['<32>{#p/story}* Toriel te encara nos olhos.'],
        status5: ['<32>{#p/story}* ...'],
        assistStatus: ['<32>{#p/basic}* Talvez tenha outro caminho...'],
        talk1: ['<32>{#p/human}* (Você pede para Toriel te deixar passar.)\n* (Sem efeito.)'],
        talk2: ["<32>{#p/human}* (Você pergunta a Toriel o porque dela realmente estar fazendo isso.)\n* (Seus olhos brilham.)"],
        talk3: ['<32>{#p/human}* (Você implora para Toriel parar.)\n* (Ela hesita.)'],
        talk4: [
            '<32>{#p/human}* (Você novamente implora para Toriel parar.)',
            '<32>{#p/basic}* ... talvez haja muito em jogo para ela.'
        ],
        talk5: ['<32>{#p/human}* (Você grita com Toriel.)\n* (Ela fecha os olhos e respira fundo.)'],
        talk6: [
            '<32>{#p/human}* (Você grita com Toriel mais uma vez.)',
            "<32>{#p/basic}* ... conversar não fará mais nenhum bem."
        ],
        talk7: ["<32>{#p/human}* (Mas não tinha nada para ser dito.)"],
        talk8: ['<32>{#p/human}* (Mas não havia sentido em fazer isso agora.)'],
        theft: ['<20>{*}{#p/twinkly}Minha.{^15}{%}']
    },

    c_name_outlands: {
        hello: 'Dizer Olá',
        about: 'Sobre Você',
        mom: 'Chamar ela de \"Mãe\"',
        flirt: 'Flertar',
        toriel: "Toriel Telefone",
        puzzle: 'Ajuda Quebra-cabeça',
        insult: 'Insultar'
    },

    c_call_outlands: {
        about1: [
            '<25>{#p/toriel}{#f/1}* Você quer saber mais sobre mim...?',
            '<25>{#f/0}* Bem, eu temo que não a muito o que dizer.',
            '<25>{#f/0}* Eu não sou nada além de uma velha senhora que se preocupa demais!'
        ],
        about2: [
            '<25>{#p/toriel}{#f/1}* Se você realmente quer saber mais sobre mim...',
            '<25>{#f/1}* Que tal dar uma olhada ao redor...?',
            '<25>{#f/0}* Eu construí ou pelo menos ajudei a construir boa parte do que você vê.'
        ],
        about3: [
            '<25>{#p/toriel}{#f/1}* Se você realmente quer saber mais sobre mim...',
            '<25>{#f/2}* Você deveria pensar duas vezes antes de me insultar pelo telefone!'
        ],
        flirt1: [
            '<25>{#p/toriel}{#f/7}* ... huh?',
            '<25>{#f/1}* Oh, heh... heh...',
            '<25>{#f/6}* Hahaha!\n* Eu poderia apertar sua bochecha!',
            '<25>{#f/0}* Você vai encontrar alguém melhor do que essa velha senhora.'
        ],
        flirt2: [
            '<25>{#p/toriel}{#f/7}* ...\n* Oh senhor, você está falando sério...?',
            '<25>{#f/1}* Minha criança, não sei se isso é patético ou cativante.'
        ],
        flirt3: [
            '<25>{#p/toriel}{#f/7}* ...\n* Oh senhor, você está falando sério...?',
            '<25>{#f/5}* E depois de você me chamar de \"Mãe...\"',
            '<25>{#f/1}* Pois bem.\n* Você é uma criança muito \"interessante\".'
        ],
        flirt4: ['<25>{#p/toriel}{#f/3}* ...', '<25>{#p/toriel}{#f/4}* Eu não consigo te entender.'],
        hello: [
            [
                '<25>{#p/toriel}* Aqui é a Toriel.',
                '<25>{#f/1}* Você só queria dizer oi...?',
                '<25>{#f/0}* Pois bem.\n* \"Oi!\"',
                '<25>{#f/0}* Eu espero que seja o suficiente.\n* Hee hee.'
            ],
            [
                '<25>{#p/toriel}* Aqui é a Toriel.',
                '<25>{#f/1}* Você queria dizer oi novamente?',
                '<25>{#f/0}* \"Saudações\" eu diria!',
                '<25>{#f/1}* É o suficiente?'
            ],
            [
                '<25>{#p/toriel}{#f/1}* Você está entediado?',
                '<25>{#f/0}* Mil perdões.\n* Eu deveria ter te dado algo para fazer.',
                '<25>{#f/1}* Por que não usar sua imaginação para distrair-se?',
                '<25>{#f/0}* Pretenda que você é... um piloto lutador!',
                '<25>{#f/1}* Torcendo e girando, fazendo rolos na velocidade da luz...',
                '<25>{#f/1}* Pode fazer isso por mim?'
            ],
            [
                '<25>{#p/toriel}{#f/5}* Olá, pequeno.',
                '<25>{#f/9}* Me desculpe, mas eu não tenho muito mais o que dizer.',
                '<25>{#f/1}* Mas é ótimo ouvir sua voz...'
            ]
        ],
        helloX: ['<25>{#p/toriel}{#g/torielLowConcern}* Alô?'],
        mom1: [
            '<25>{#p/toriel}* ...',
            '<25>{#f/7}* Huh?\n* Você acabou de me chamar de \"Mãe?\"',
            '<25>{#f/1}* Bom...\n* Eu suponho...',
            '<25>{#f/1}* Que isso te fará feliz?',
            '<25>{#f/1}* Me chamar de...\n* \"Mãe?\"',
            '<25>{#f/0}* Tudo bem.\n* Me chame do que quiser!'
        ],
        mom2: ['<25>{#p/toriel}{#f/7}* ...\n* Oh meu... de novo?', '<25>{#f/0}* Hee hee...\n* Você é uma criança muito fofa.'],
        mom3: [
            '<25>{#p/toriel}{#f/7}* ...\n* Oh meu... de novo?',
            '<25>{#f/5}* E depois de ter flertado comigo...',
            '<25>{#f/1}* Pois bem.\n* Você é uma criança muito \"interessante\".'
        ],
        mom4: ['<25>{#p/toriel}{#f/5}* ...'],
        puzzle1: [
            '<25>{#p/toriel}{#f/1}* Ajuda com um quebra-cabeça...?',
            '<25>{#f/1}* Você não saiu da sala, saiu?',
            '<25>{#f/0}* Espere meu retorno e nós resolveremos juntos.'
        ],
        puzzle2: [
            '<25>{#p/toriel}{#f/1}* Ajuda com um quebra-cabeça...?',
            '<25>{#f/23}* ... algo me diz que você não precisa da minha ajuda.'
        ],
        puzzle3: [
            '<25>{#p/toriel}{#f/1}* Ajuda com um quebra-cabeça...?',
            '<25>{#f/5}* ...\n* Infelizmente eu não posso te ajudar agora.',
            '<25>{#f/0}* Espere meu retorno e nós resolveremos juntos.'
        ],
        insult1: (sus: boolean) =>
            sus
                ? [
                    '<25>{#p/toriel}{#f/0}* Olá?\n* Aqui é...',
                    '<25>{#f/2}* ...!',
                    '<25>{#f/3}* Você poderia repetir isso para mim?'
                ]
                : [
                    '<25>{#p/toriel}{#f/0}* Olá?\n* Aqui é...',
                    '<25>{#f/2}* ...!',
                    '<25>{#f/1}* Minha criança... eu não acho que você sabe o que isso significa.'
                ],
        insult2: (sus: boolean) =>
            sus
                ? ['<25>{#p/toriel}{#f/15}* ...', '<25>{#f/12}* Eu vou pretender que você não disse isso pra mim.']
                : ['<25>{#p/toriel}{#f/1}* Minha criança...']
    },

    i_candy: {
        battle: {
            description: 'Tem um sabor distinto, sem alcaçuz.',
            name: 'Doce'
        },
        drop: ['<32>{#p/human}* (Você jogou fora o Doce Monstro.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (10 HP.)']
                : ['<32>{#p/basic}* \"Doce Monstro\" Cura 10 HP\n* Tem um sabor distinto, sem alcaçuz'],
        name: 'Doce Monstro',
        use: ['<32>{#p/human}* (Você come o Doce Monstro.)']
    },
    i_water: {
        battle: {
            description: 'Cheira a Monóxido de Hidrogênio.',
            name: 'Água'
        },
        drop: ['<32>{#p/human}* (Você jogou a água fora.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (12 HP.)']
                : ['<32>{#p/basic}* \"Água\" Cura 12 HP\n* Cheira a Monóxido de Hidrogênio.'],
        name: 'Água',
        use: () => [
            '<32>{#p/human}* (Você bebe a Água.)',
            ...(SAVE.data.b.ufokinwotm8 ? [] : ["<33>{#p/human}* (Você está cheio de hidratação.)"]) 
        ]
    },
    i_chocolate: {
        battle: {
            description: 'Uma totalmente merecida barra de chocolate.',
            name: 'Chocolate'
        },
        drop: () => [
            '<32>{#p/human}* (Você jogou fora a barra de Chocolate.)',
            ...(SAVE.data.b.svr || world.darker ? [] : ['<32>{#p/basic}* ... oh bem.'])
        ],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (19 HP. Este ítem parece te lembrar de alguém.)']
                : ['<32>{#p/basic}* \"Barra de Chocolate\" Cura 19 HP\n* É uma barra de chocolate bem merecida.'],
        name: 'Barra de Chocolate',
        use: () => [
            '<32>{#p/human}* (Você comeu uma Barra Chocolate.)',
            ...(battler.active && battler.alive[0].opponent.metadata.reactChocolate
                ? ['<32>{#p/basic}* Toriel reconhece o cheiro e sorri um pouco.']
                : [])
        ]
    },
    i_delta: {
        battle: {
            description: 'Está substância é dita ter altas propriedades relaxantes.',
            name: 'Δ-9'
        },
        drop: ['<32>{#p/human}* (Você jogou fora Δ-9.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (5 HP. Você se sente estranho em relação a este ítem.)']
                : ['<32>{#p/basic}* \"Δ-9\" Cura 5 HP\n* Está substância é dita ter altas propriedades relaxantes.'],
        name: 'Δ-9',
        use: ['<32>{#p/human}* (Você ingeriu Δ-9.)']
    },
    i_halo: {
        battle: {
            description: 'Uma bandana com seu próprio campo de gravidade',
            name: 'Halo'
        },
        drop: ['<32>{#p/human}* (Você joga o Halo para longe como um frisbee.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (3 DF.)']
                : ['<32>{#p/basic}* \"Halo\" (3 DF)\n* Uma bandana com seu próprio campo de gravidade.'],
        name: 'Halo',
        use: () => [
            '<32>{#p/human}* (Você coloca o Halo.)',
            ...(SAVE.data.b.svr && !SAVE.data.b.freedom && asrielinter.i_halo_use++ < 1
                ? ['<25>{#p/asriel1}{#f/20}* Acho que combina com você.']
                : [])
        ]
    },
    i_little_dipper: {
        battle: {
            description: 'Uma colher amassada.',
            name: 'Concha'
        },
        drop: ['<32>{#p/human}* (Você joga fora a Pequena Concha.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (3 AT.)']
                : ['<32>{#p/basic}* \"Pequena Concha\" (3 AT)\n* Uma colher esmagada.'],
        name: 'Pequena Concha',
        use: ['<32>{#p/human}* (Você equipou a Pequena Concha.)']
    },
    i_pie: {
        battle: {
            description: 'Uma torta de canela com caramelo, um pedaço.',
            name: 'Torta'
        },
        drop: ['<32>{#p/human}* (Você joga fora a Torta de Canela.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (99 HP.)']
                : ['<32>{#p/basic}* \"Torta de Canela\" Cura 99 HP\n* Uma torta de canela com caramelo, um pedaço.'],
        name: 'Torta de Canela',
        use: ['<32>{#p/human}* (Você come a Torta de Canela.)']
    },
    i_pie2: {
        battle: {
            description: 'Receita clássica de família.',
            name: 'Torta de Lesma'
        },
        drop: ['<32>{#p/human}* (Você joga fora a Torta de Lesma.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (99 HP.)']
                : ['<32>{#p/basic}* \"Torta de Lesma\" Cura 99 HP\n* Receita clássica de família.'],
        name: 'Torta de Lesma',
        use: ['<32>{#p/human}* (Você come a Torta de Lesma.)']
    },
    i_pie3: {
        battle: {
            description: 'Apesar de ser sopa, a torta continua deliciosa.',
            name: 'Torta de Sopa'
        },
        drop: ['<32>{#p/human}* (Você joga fora a sopa de torta e a colher que veio com ela.)'],
        info: ['<32>{#p/basic}* \"Torta de Sopa\" Cura 49 HP\n* Apesar de ser sopa, a torta continua deliciosa.'],
        name: 'Torta de Sopa',
        use: ['<32>{#p/human}* (Você consome a Torta de Sopa com a colher que veio junto dela.)']
    },
    i_pie4: {
        battle: {
            description: 'Ações tem suas consequências...',
            name: 'Torta Queimada'
        },
        drop: ['<32>{#p/human}* (Você joga a Torta Queimada para fora como se ela nunca existisse.)'],
        info: ['<32>{#p/basic}* \"Torta Queimada\" Cura 39 HP\n* Ações tem suas consequências...'],
        name: 'Torta Queimada',
        use: ['<32>{#p/human}* (Você come a Torta Queimada.)']
    },
    i_snails: {
        battle: {
            description: 'Um prato de lesmas fritas.\nPara café da manhã.',
            name: 'Lesmas'
        },
        drop: ['<32>{#p/human}* (Você jogou fora as Lesmas Fritas.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (19 HP.)']
                : ['<32>{#p/basic}* \"Lesmas Fritas\" Cura 19 HP\n* Um prato de lesmas fritas.\n* Para café da manhã.'],
        name: 'Lesmas Fritas',
        use: ['<32>{#p/human}* (Você comeu as Lesmas Fritas.)']
    },
    i_soda: {
        battle: {
            description: 'Um estranho, líquido amarelo escuro.',
            name: 'Refri'
        },
        drop: () => [
            '<32>{#p/human}* (Você joga fora o Refri Fizzli.)',
            ...(SAVE.data.b.svr || world.darker ? [] : ['<32>{#p/basic}* Boa viagem.'])
        ],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (8 HP.)']
                : ['<32>{#p/basic}* \"Refri Fizzli\" Cura 8 HP\n* Um estranho, líquido amarelo escuro.'],
        name: 'Refri Fizzli',
        use: () => [
            '<32>{#p/human}* (Você bebeu o Refri Fizzli.)',
            ...(SAVE.data.b.svr || world.darker ? [] : ['<32>{#p/basic}* Yuck!'])
        ]
    },
    i_spacesuit: {
        battle: {
            description: 'Isso veio com a nave que você bateu.',
            name: 'Traje Espacial'
        },
        drop: ['<32>{#p/human}* (Você joga fora o Traje Espacial usado.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (20 HP. O último fragmento restante da nave espacial voou para o exílio.)']
                : ['<32>{#p/basic}* \"Traje Espacial\" Curo 20 HP\n* Isso veio junto com a nave espacial que você bateu.'],
        name: 'Traje Espacial',
        use: ['<33>{#p/human}* (Depois de usar seu último pacote de cura, o Traje Espacial se desfez.)']
    },
    i_spanner: {
        battle: {
            description: 'Uma chave velha e enferrujada.',
            name: 'Chave'
        },
        drop: ['<32>{#p/human}* (Você joga fora a chave enferrujada.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ["<32>{#p/human}* (Uma ferramente confiável forjada nos confins da galáxia.)"]
                : ['<32>{#p/basic}* Uma chave inglesa velha e enferrujada.'],
        name: 'Chave Enferrujada',
        use: () => [
            ...(battler.active && battler.alive[0].opponent.metadata.reactSpanner
                ? []
                : ['<32>{#p/human}* (Você joga a chave inglesa no ar.)\n* (Nada acontece.)'])
        ]
    },
    i_starbertA: {
        battle: {
            description: 'A primeira de uma edição limita dos quadrinhos do Super Starwalker.',
            name: 'Starwalker 1'
        },
        drop: ['<32>{#p/human}* (Você jogou fora o Super Starwalker 1.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (Isso parece o começo de uma jornada.)']
                : ['<32>{#p/basic}* A primeira de uma edição dos quadrinhos do Super Starwalker.'],
        name: 'Super Starwalker 1',
        use: () => (battler.active ? ['<32>{#p/human}* (Você lê o Super Starwalker 1.)', '<32>* (Nada acontece.)'] : [])
    },
    i_starbertB: {
        battle: {
            description: 'O segundo de uma edição limitada dos quadrinhos do Super Starwalker.',
            name: 'Starwalker 2'
        },
        drop: ['<32>{#p/human}* (Você joga fora o Super Starwalker 2.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (Parece o meio de uma jornada.)']
                : ['<32>{#p/basic}* O segundo de uma edição limitada dos quadrinhos do Super Starwalker.'],
        name: 'Super Starwalker 2',
        use: () =>
            battler.active
                ? [
                    '<32>{#p/human}* (Você lê o Super Starwalker 2.)',
                    ...(SAVE.data.b.stargum
                        ? ['<32>* (Nada acontece.)']
                        : [
                            '<32>* (Você encontrou um chiclete colado na história em quadrinhos.)',
                            choicer.create('* (Comer o chiclete?)', 'Sim', 'Não')
                        ])
                ]
                : []
    },
    i_starbertC: {
        battle: {
            description: 'O terceiro de uma edição limitada dos quadrinhos do Super Starwalker.',
            name: 'Starwalker 3'
        },
        drop: ['<32>{#p/human}* (Você jogou fora o Super Starwalker 3.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (Parece o fim de uma jornada... ou seria um novo começo?)']
                : ['<32>{#p/basic}* O terceiro de uma edição limitada dos quadrinhos do Super Starwalker.'],
        name: 'Super Starwalker 3',
        use: () => (battler.active ? ['<32>{#p/human}* (Você lê o Super Starwalker 3.)', '<32>* (Nada acontece.)'] : [])
    },
    i_steak: {
        battle: {
            description: 'Questionável pra dizer o melhor.',
            name: 'Bife'
        },
        drop: () => [
            '<32>{#p/human}* (Você joga fora o Bife Sizzli.)',
            ...(SAVE.data.b.svr || world.darker || SAVE.data.b.ufokinwotm8
                ? []
                : ["<32>{#p/basic}* Bem, não vai fazer falta."])
        ],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (14 HP.)']
                : ['<32>{#p/basic}* \"Bife Sizzli\" Cura 14 HP\n* Questionável.'],
        name: 'Bife Sizzli',
        use: () => [
            '<32>{#p/human}* (Você comeu o Bife Sizzli.)',
            ...(SAVE.data.b.svr || world.darker || SAVE.data.b.ufokinwotm8 ? [] : ['<32>{#p/basic}* Nojento!'])
        ]
    },

    k_coffin: {
        name: 'Chave Secreta',
        description: () =>
            SAVE.data.b.w_state_secret
                ? 'Usada para acessar um quarto escondido nas Outlands.'
                : "Adquirida na gaveta de meias do quarto de Toriel."
    },

    c_call_toriel: <Partial<CosmosKeyed<CosmosProvider<string[]>, string>>>{
        w_start: [
            '<25>{#p/toriel}{#f/0}* Ah, claro.\n* Deve ser onde você acabou batendo.',
            '<25>{#f/0}* Os outros humanos que vieram aqui, também.',
            '<25>{#f/1}* Deve ser um ponto fraco no escudo de força.',
            '<25>{#f/0}* ... que acaba atraindo naves para essa região específica.'
        ],
        w_twinkly: () =>
            SAVE.data.b.toriel_twinkly
                ? [
                    '<25>{#p/toriel}{#f/1}* Foi aqui onde eu te encontrei?',
                    '<25>{#f/5}* Aquela estrela falante que o atormentou tem sido uma praga há algum tempo.',
                    '<25>{#f/1}* Eu já tentei conversar com ele antes, mas...',
                    '<25>{#f/9}* Meus esforços nunca chegaram a lugar nenhum.'
                ]
                : [
                    '<25>{#p/toriel}{#f/1}* Foi aqui onde eu te encontrei?',
                    '<25>{#f/5}* Sozinho lá fora, por si mesmo...',
                    '<25>{#f/0}* É bom que estava lá para te trazer.'
                ],
        w_entrance: [
            '<25>{#p/toriel}{#f/1}* A entrada para as Outlands...',
            '<25>{#f/0}* A área antes dessa, não faz parte disso.',
            '<25>{#f/5}* É... mais um local de acidente não marcado.',
            '<25>{#f/1}* Após o primeiro humano cair nas Outlands...',
            '<25>{#f/0}* Um plataforma separada parecia uma adição óbvia.'
        ],
        w_lobby: [
            '<25>{#p/toriel}{#f/0}* O quebra-cabeça nesta sala funciona perfeitamente como demonstração.',
            '<25>{#f/1}* Até porque, qual seria outro motivo para construí-lo?',
            '<25>{#f/5}* Infelizmente, nem todos os humanos entenderam isso.',
            '<25>{#f/3}* Um deles tentou correr contra o escudo de segurança...',
            '<25>{#f/0}* ... para dizer o mínimo, o uso da minha mágica de cura foi requerida.'
        ],
        w_tutorial: [
            '<25>{#p/toriel}* Se este aqui não é meu favorito, eu não sei qual é!',
            '<25>* A forma na qual ensina como colaboração é uma das maiores qualidades.',
            '<25>{#f/1}* Desde que meu trabalho dos sonhos É se tornar professora...',
            '<25>{#f/0}* Eu sempre procuro formas de demonstrar estas importantes lições.'
        ],
        w_dummy: () => [
            '<25>{#p/toriel}{#f/1}* A sala de treinamento...?',
            ...(SAVE.data.n.plot < 42
                ? [
                    [
                        '<25>{#f/0}* Hee hee, eu estou orgulhosa da forma que você lidou com essa lição.',
                        '<25>{#f/1}* Uma conversa amigável é preferível para está situação...',
                        '<25>{#f/0}* E não só por te ajudar a fazer amigos!'
                    ],
                    [],
                    [
                        '<25>{#f/5}* ...',
                        '<25>{#f/5}* Você não lidou com essa lição da forme que eu esperei...',
                        '<25>{#f/0}* Pelo menos no fim, você evitou o conflito.',
                        '<25>{#f/0}* Considerando as alternativas, essa foi... uma escolha preferível.'
                    ],
                    [
                        '<25>{#f/0}* ... hmm.',
                        '<25>{#f/0}* Verdadeiramente, eu ainda não sei como reagir ao que aconteceu.',
                        '<25>{#f/1}* Foi hipnotizante de assistir, no entanto...',
                        '<25>{#f/3}* Só vocês dois...\n* Se encarando...',
                        '<25>{#f/4}* ...'
                    ],
                    [
                        '<25>{#f/1}* Eu não posso dizer que esperei o que aconteceu, mas...',
                        '<25>{#f/0}* Ainda é cativante, no entanto.',
                        '<25>{#f/0}* Surpreendentemente, você é o primeiro humano a tentar se aproximar.',
                        '<25>{#f/1}* Parecia uma solução tão óbvia...'
                    ],
                    [],
                    [
                        '<25>{#f/5}* ...',
                        '<25>{#f/7}* ...',
                        '<25>{#f/8}* Hahaha!\n* Ah, eu não consigo fazer nada além de rir!',
                        '<25>{#f/6}* A falta de vergonha com que você escolheu flertar...',
                        '<25>{#f/1}* Certamente me pegou de surpresa!',
                        '<25>{#f/0}* Me escute, minha criança.',
                        '<25>{#f/9}* Flertar com seus adversários pode não ser a melhor escolha.',
                        '<25>{#f/10}* Mas, se você conseguir fazer DAQUELA forma novamente...',
                        '<25>{#f/0}* Não há como dizer o que você não pode chegar a um lugar dessa maneira.'
                    ]
                ][SAVE.data.n.state_wastelands_dummy]
                : [
                    '<25>{#p/toriel}{#f/0}* Ah, certo, sobre isso.',
                    '<25>{#p/toriel}{#f/0}* Eu recentemente descobri que um fantasma estava se escondendo no boneco.',
                    '<25>{#p/toriel}{#f/1}* Eles pareciam irritados com alguma coisa, mas...',
                    '<25>{#p/toriel}{#f/0}* Após alguma conversa, eu os ajudei a se acalmar.',
                    '<25>{#p/toriel}{#f/1}* Hmm... me pergunto onde Lurksalot está agora?'
                ])
        ],
        w_coffin: [
            '<25>{#p/toriel}{#f/5}* ...',
            '<25>{#f/5}* Em momentos como esse, é importante saber demonstrar respeito.',
            '<25>{#f/10}* ... você entende?',
            '<25>{#f/9}* É uma lição mais importante do que aprender sobre armadilhas ou lutas.'
        ],
        w_danger: () =>
            SAVE.data.n.state_wastelands_froggit === 3
                ? [
                    '<25>{#p/toriel}{#f/1}* O enigma oferecido pelo terminal nesta sala...',
                    '<25>{#f/0}* Foi baseado em algo que eu encontrei em uma antiga lenda da Terra.',
                    '<25>{#f/1}* Ela envolve uma série de quebras-cabeças intrigantes...',
                    '<25>{#f/0}* E um certo assado enganoso.',
                    SAVE.data.b.w_state_riddleskip
                        ? '<25>{#f/5}* É triste você não querer ter resolvido.'
                        : '<25>{#f/0}* Te ver resolver foi bem gratificante.'
                ]
                : [
                    '<25>{#p/toriel}{#f/1}* Como protetora das Outlands, eu tomei isso para mim mesma...',
                    '<25>{#f/0}* Para ter certeza que os outros monstros não te atacariam.',
                    '<25>{#f/0}* Mas eles e eu temos um entendimento mútuo sobre isso.',
                    '<25>{#f/0}* É por isso que o Froggit partiu tão prontamente.'
                ],
        w_zigzag: [
            '<25>{#p/toriel}{#f/1}* Minha ideia ao construir está sala era que ela fosse longa e com ondas...',
            '<25>{#f/0}* ... eu senti que uma sala reta seria tão entediante.',
            '<25>{#f/1}* Até porque, quem deseja andar em linha reta por toda a vida?',
            '<25>{#f/0}* Uma pequena mudança no passo pode ser bem divertido.'
        ],
        w_froggit: [
            '<25>{#p/toriel}* Dessa sala em diante, mais monstros podem ser encontrados.',
            '<25>{#f/0}* Eles gostam de \"dar uma volta\" por aqui.\n* Legal, não é mesmo?',
            '<25>{#f/1}* Normalmente era um lugar bem quieto, mas recentemente...',
            '<25>{#f/0}* Quando um monstro começou a ensinar os outros como flertar.',
            '<25>{#f/0}* Este novo sentimento começou a mudar a atmosfera social.'
        ],
        w_candy: () => [
            SAVE.data.n.state_wastelands_candy < 4
                ? '<25>{#p/toriel}{#f/1}* A máquina de venda quebrou?'
                : '<25>{#p/toriel}{#f/1}* Oh senhor, a máquina de venda quebrou de novo?',
            '<25>{#f/5}* Bem, já aconteceu mais vezes do que eu consigo contar.',
            '<25>{#f/3}* No lado positivo, ISTO salva bastante energia...',
            '<25>{#f/0}* ... então talvez não seja de todo mal.'
        ],
        w_puzzle1: [
            '<25>{#p/toriel}{#f/1}* Para facilitar o processo de repetição do quebra-cabeça...',
            '<25>{#f/0}* Instalei um sistema para movê-lo de volta ao início.',
            '<25>{#f/5}* O cientista que me ajudou a instalar já se foi a muito tempo...',
            '<25>{#f/0}* Mas seus trabalhos ainda são usados até o dia de hoje.'
        ],
        w_puzzle2: [
            '<25>{#p/toriel}{#f/1}* Ah, a mais única forma de quebra-cabeça que existe aqui.',
            '<25>{#f/0}* Um que testa a paciência acima da memorização.',
            '<25>{#f/1}* Na maior parte, os outros humanos reclamaram sobre...',
            '<25>{#f/0}* Mas, um deles apreciou o valor que ele provê.'
        ],
        w_puzzle3: [
            '<25>{#p/toriel}{#f/1}* Uma pequena dica que pode te ajudar neste quebra-cabeça...',
            '<25>{#f/0}* É que você pode se mexer mesmo enquanto a sequência está sendo apresentada.',
            '<25>{#f/5}* ... Eu suponho que não exista muito utilidade para está informação agora.',
            '<25>{#f/1}* Mas, se por alguma razão você precisar resolver isso de novo...',
            '<25>{#f/0}* Tente o conselho que eu acabei de te dar.'
        ],
        w_puzzle4: [
            '<25>{#p/toriel}{#f/1}* Tem chamado minha atenção que, recentemente...',
            '<25>{#f/0}* Edições antigas de uma série de quadrinhos agora extinta estão sendo vendidas.',
            '<25>{#f/0}* Talvez, se você estiver entediado, pode acabar comprando uma.',
            '<25>{#f/0}* Crianças da sua idade se divertem muito com essas coisas!'
        ],
        w_mouse: [
            '<25>{#p/toriel}{#f/1}* Por uma questão de princípio, acho importante...',
            '<25>{#f/0}* Aqui tem uma sala designada para descanso.',
            '<25>{#f/0}* Em minha própria vida, muitas vezes acho que as pausas são um recurso útil.',
            '<25>{#f/1}* O stærmite que reside aqui certamente concordaria...'
        ],
        w_blooky: () =>
            SAVE.data.b.killed_mettaton
                ? [
                    '<25>{#p/toriel}{#f/1}* Por alguma razão, o fantasma que vem aqui as vezes...',
                    '<25>{#f/5}* Tem se sentido mais triste do que nunca ultimamente.',
                    '<25>{#f/1}* Eu tentei questiona-lo o motivo, mas ele não me disse...',
                    '<25>{#f/5}* ... Eu não o vi desde então.'
                ]
                : !SAVE.data.b.a_state_hapstablook || SAVE.data.n.plot < 68
                    ? [
                        '<25>{#p/toriel}{#f/0}* Aquele fantasma que ligou mais cedo habita essa área com frequência.',
                        ...(SAVE.data.b.napsta_performance
                            ? ['<25>{#f/1}* Eu pensei que ele ficaria feliz após a performance...']
                            : ['<25>{#f/1}* Tentei levantar o ânimo dele no passado...']),
                        '<25>{#f/5}* Mas os seus problemas não devem ser fáceis de se resolver.',
                        '<25>{#f/1}* Se ao menos eu soubesse o que os preocupa...'
                    ]
                    : [
                        '<25>{#p/toriel}{#f/1}* Por alguma razão, o fantasma que vem aqui as vezes...',
                        '<25>{#f/0}* Tem se sentido bem melhor ultimamente.',
                        '<25>{#f/0}* Ele até veio a minha casa contar como estava bem.',
                        '<25>{#f/1}* Aparentemente foi por sua causa...?',
                        '<25>{#f/0}* Que bom.\n* Eu estou muito orgulhosa de ti, minha criança.'
                    ],
        w_party: [
            '<25>{#p/toriel}{#f/0}* A sala de atividades.\n* Nós fazemos todos os tipos de performance aqui.',
            '<25>{#f/0}* Drama, noites de dança, romance...\n* E o mais importante de tudo, as artes.',
            '<25>{#f/0}* É sempre maravilhoso ver as pessoas se expressando.',
            '<25>{#f/1}* Eu uma vez vi um show de comédia naquela mesma sala.',
            '<25>{#f/0}* Nunca ri tanto na minha vida!'
        ],
        w_pacing: () => [
            SAVE.data.b.toriel_twinkly
                ? '<25>{#p/toriel}{#f/0}* Eu ouvi dizer que alguém aí fez \"amizade\" com uma estrela falante.'
                : '<25>{#p/toriel}{#f/0}* Eu ouvi dizer que alguém fez \"amizade\" com uma estrela falante.',
            '<25>{#f/1}* Um dos Froggits, eu presumo...?',
            "<25>{#f/1}* Eu estou bem preocupada com a segurança daquele monstro...",
            '<25>{#f/5}* Mas isso é um eufemismo.'
        ],
        w_junction: [
            '<25>{#p/toriel}{#f/1}* A sala de junção...',
            '<25>{#f/0}* No passado, nós planejemos uma área de comunidades aqui.',
            '<25>{#f/0}* Visitantes das Outlands iriam ser apresentados a fresca e aconchegada atmosfera.',
            '<25>{#f/1}* Depois de um tempo, percebemos que não muitos gostariam de vir aqui...',
            '<25>{#f/0}* Por isso, o design foi alterado para o que você vê hoje.',
            '<25>{#f/5}* Um pouco entediante, mas eu suponho que nem todas as salas podem ser grandes...'
        ],
        w_annex: [
            '<25>{#p/toriel}* Daqui, o todo- importante ponto de táxi pode ser alcançado.',
            '<25>{#f/1}* Não apenas outras áreas do Outpost são acessíveis...',
            '<25>{#f/0}* Mas outras subseções das Outlands também.',
            '<25>{#f/1}* Mas como você é uma criança, entretanto...',
            '<25>{#f/5}* É bem difícil que o taxi te ofereça esta opção.',
            '<25>{#f/0}* O mercado e trabalhos oferecidos lá são mais para adultos.'
        ],
        w_wonder: () => [
            '<25>{#p/toriel}{#f/1}* Um pequeno cogumelo me cumprimentou no caminho de volta para casa...',
            SAVE.data.b.snail_pie
                ? '<25>{#f/0}* ... quando eu retornava com os ingredientes para a torta de lesma.'
                : '<25>{#f/0}* ... quando eu retornava com os ingredientes para a torta de canela.',
            '<25>{#f/3}* Estranhamente, estava voando acima da porta...',
            '<25>{#f/0}* A gravidade deve estar fraca naquela sala.',
            '<25>{#f/1}* Talvez a presença do táxi tenha algum efeito...?'
        ],
        w_courtyard: [
            '<25>{#p/toriel}{#f/0}* Ah.\n* O pátio.',
            '<25>{#f/1}* Admito, é vem vazio...',
            '<25>{#f/5}* Nem mesmo uma criança gostaria de brincar aí.',
            '<25>{#f/1}* Com cada humano que veio, eu pensei em arrumar isso...',
            '<25>{#f/5}* Mas eles sempre se foram antes que eu tivesse a chance.'
        ],
        w_alley1: [
            '<25>{#p/toriel}{#f/9}* ... a sala na qual eu te avisei sobre ir embora.',
            '<25>{#f/5}* Eu pensei, se eu falasse do campo de força...',
            '<25>{#f/5}* Eu talvez te convenceria a ficar.',
            '<25>{#f/1}* ... Eu me lembro de falar para os outros humanos fazerem o mesmo, mas...',
            '<25>{#f/5}* Teve tanto efeito em você como teve para eles.'
        ],
        w_alley2: [
            '<25>{#p/toriel}{#f/9}* ... a sala na qual eu te avisei dos perigos a frente.',
            '<25>{#f/5}* Disseram-me que minhas crenças sobre ele são equivocadas, mas...',
            '<25>{#f/5}* Eu senti como um erro tomar a chance.',
            '<25>{#f/9}* ... talvez seja hora de reconsiderar meu ponto de vista.'
        ],
        w_alley3: [
            '<25>{#p/toriel}{#f/9}* ... Eu realmente me arrependo pela forma da qual te tratei aqui.',
            '<25>{#f/5}* Foi erro de mim tentar te manter a força aqui...',
            '<25>{#f/5}* Meramente agindo sob meus próprios desejos.',
            '<25>{#f/1}* Eu tenho certeza que você já me perdoou...',
            '<25>{#f/5}* Eu merecendo isso ou não...'
        ],
        w_alley4: () =>
            SAVE.data.b.w_state_fightroom
                ? [
                    '<32>{#s/phone}{#p/event}* Discagem...',
                    '<25>{#p/toriel}{#f/1}* Mesmo que essa sala não nos traga os melhores sentimentos...',
                    '<25>{#f/0}* Ainda é um dos meus lugares favoritos nas Outlands.',
                    '<25>{#f/1}* Tem um certo alguém que me visita as vezes...',
                    '<25>{#f/6}* Talvez você já saiba quem ele é.',
                    '<32>{#s/equip}{#p/event}* Click...'
                ]
                : instance('main', 'toriButNotGarb') === void 0 // NO-TRANSLATE

                    ? [
                        '<32>{#s/phone}{#p/event}* Discagem...',
                        '<25>{#p/toriel}{#f/1}* Já me ligando...?',
                        '<25>{#f/0}* ... Eu ainda nem cheguei em casa!',
                        '<25>{#f/0}* Por favor, espere um pouco antes de ligar novamente.',
                        '<32>{#s/equip}{#p/event}* Click...'
                    ]
                    : [
                        '<32>{#w.stopThatGoat}{#s/phone}{#p/event}* Discando...',
                        '<25>{#p/toriel}{#f/1}* Já me ligando...?',
                        '<25>{#f/0}* ... Eu ainda nem saí da sala onde estamos!',
                        '<25>{#f/2}* Um momento para respirar seria ótimo!',
                        '<32>{#w.startThatGoat}{#s/equip}{#p/event}* Click...'
                    ],
        w_bridge: [
            '<25>{#p/toriel}{#f/1}* A ponte para o resto do Outpost...',
            '<25>{#f/5}* É uma lástima pensar que eu quase a destruí.',
            '<25>{#f/0}* É claro, o táxi ainda estaria por aí.',
            '<25>{#f/3}* Mas duvido que isso tenha sido muito acreditável.',
            '<25>{#f/1}* Vamos ficar felizes que a ponte ainda está aí.'
        ],
        w_exit: () =>
            SAVE.data.n.plot < 16
                ? [
                    '<25>{#p/toriel}{#f/1}* Minha criança, se você está saindo das Outlands...',
                    '<25>{#f/0}* Então... eu quero que se lembre de algo.',
                    '<25>{#f/1}* Seja lá o que te acontecer, não importa o quanto pareça difícil...',
                    '<25>{#f/0}* Eu quero que você saiba que eu tenho esperança em você.',
                    '<25>{#f/0}* Eu sei que você fará a coisa certa.',
                    '<25>{#f/1}* Lembre-se disso, tudo bem?'
                ]
                : SAVE.data.n.plot < 17.001
                    ? [
                        '<25>{#p/toriel}{#f/1}* Retornando para as Outlands tão cedo...?',
                        '<25>{#f/0}* Bem.\n* Eu não posso dizer que me oponho a isso.',
                        '<25>{#f/1}* Você pode sair quando quiser, é claro...',
                        '<25>{#f/0}* Mas, por agora, é muito bom te ver.'
                    ]
                    : [
                        '<25>{#p/toriel}{#f/2}* Por quanto tempo você está em pé aí!?',
                        '<25>{#f/1}* Você voltou este caminho todo só para me ligar?',
                        '<25>{#f/0}* ... Bobinho.',
                        '<25>{#f/0}* Se você quiser me ligar, não a necessidade de voltar tão longe.'
                    ],
        w_toriel_front: [
            '<25>{#p/toriel}{#f/1}* Você sabia que essa casa é uma re-criação de outra?',
            '<25>{#f/1}* No passado, eu vivi na Cidadela...',
            '<25>{#f/0}* De onde a cópia dessa casa veio.',
            '<25>{#f/5}* De vez em quando, eu me esqueço que não estou realmente lá...'
        ],
        w_toriel_hallway: [
            '<25>{#p/toriel}{#f/0}* Não há muito o que dizer sobre o corredor.',
            '<26>{#f/1}* Mas, você pode dar uma olhada no espelho, se quiser...',
            '<25>{#f/0}* Eu ouvi dizer que refletir sobre si pode ser algo poderoso.'
        ],
        w_toriel_asriel: [
            '<25>{#p/toriel}{#f/0}* Ah, é seu quarto!',
            '<25>{#f/5}* Seu... quarto...',
            '<25>{#f/9}* ...',
            '<25>{#f/5}* Talvez já não seja mais.',
            '<25>{#f/1}* ...',
            '<25>{#f/1}* Na verdade, eu vou deixar essa decisão para você...',
            '<25>{#f/0}* Você pode descansar sempre que puder.'
        ],
        w_toriel_toriel: [
            '<25>{#p/toriel}{#f/0}* Então você entrou no meu quarto.',
            '<25>{#f/0}* Se você gostar, você pode ler um dos meus livros na prateleira.',
            '<25>{#f/0}* Mas, por favor, não esqueça de colocar de volta.',
            "<25>{#f/23}* E nem ouse abrir essa gaveta de meias."
        ],
        w_toriel_living: () =>
            toriCheck()
                ? ['<25>{#p/toriel}{#f/3}* Não tem necessidade de me ligar quando eu estou bem aqui, pequenino.']
                : [
                    '<25>{#p/toriel}{#f/1}* Dando uma voltinha na sala de estar, estamos?',
                    '<25>{#f/0}* Me diga.\n* Você já leu todos os livros?',
                    '<25>{#f/1}* Eu pensei sobre ler um livro sobre fatos de lesmas para ti...',
                    '<25>{#f/0}* Mas deve ser repetitivo demais para alguém tão jovem.'
                ],
        w_toriel_kitchen: [
            '<25>{#p/toriel}{#f/1}* A cozinha...?',
            '<25>{#f/0}* Eu deixei uma barra de chocolate no freezer para você.',
            '<25>{#f/0}* Eu sei que é... um grande favorito dos humanos.',
            '<25>{#f/1}* Espero que você goste...'
        ],
        s_start: () =>
            SAVE.data.n.plot < 17.001
                ? [
                    '<25>{#p/toriel}{#f/0}* Seu eu estou certa, um amigo meu deve estar logo a frente.',
                    '<26>{#f/0}* Não temas, pequeno.',
                    '<25>{#f/1}* Continue indo...'
                ]
                : [
                    '<25>{#p/toriel}{#f/1}* Do que eu me lembro, esta longa sala...',
                    '<26>{#f/0}* ... teria sido a base para uma cidade nos arredores de Starton.',
                    '<25>{#f/0}* Obviamente, nunca passou disso.',
                    '<25>{#f/2}* Uma cidade é mais que o suficiente!'
                ],
        s_sans: () =>
            SAVE.data.n.plot < 17.001
                ? [
                    '<25>{#p/toriel}{#f/0}* Seu eu estou certa, um amigo meu deve estar logo a frente.',
                    '<26>{#f/0}* Não temas, pequeno.',
                    '<25>{#f/1}* Continue indo...'
                ]
                : [
                    '<25>{#p/toriel}{#f/1}* Eu presumo que agora você já tenha ouvido falar do \"inversor de gravidade?\"',
                    '<26>{#f/0}* É um aparelho do qual Sans me contou.',
                    '<25>{#f/1}* Aparentemente, tem outro mundo lá em cima...',
                    '<25>{#f/0}* Um lugar que as coisas nem sempre olham para a direção correta.'
                ],
        s_crossroads: [
            '<25>{#p/toriel}{#f/1}* Esta antiga plataforma de pouso já foi um cruzamento movimentado...',
            '<25>{#f/1}* Naves de suprimento indo e voltando...',
            '<25>{#f/1}* Prontos para ajudar em seja o que fosse construído em seguida...',
            '<25>{#f/5}* É bem triste que o Outpost parou de expandir.',
            '<25>{#f/0}* Por um tempo, construir novas áreas definiu nossa cultura!'
        ],
        s_human: [
            "<25>{#p/toriel}* Eu ouvi dizer que o irmão de Sans deseja se unir a Guarda Real um dia.",
            '<25>{#f/1}* Que jovem esqueleto inspirador...',
            '<25>{#f/0}* Apesar dos meus sentimentos sobre a guarda, é bom para ele ter sonhos.',
            '<25>{#f/5}* Eu me preocupo que muitos tem desistido de seus sonhos ultimamente...',
            '<25>{#f/0}* Mas não ele!\n* Esse esqueleto sabe o que é melhor para si.'
        ],
        s_papyrus: [
            '<25>{#p/toriel}* Sans me contou sobre todas as gravações e utensílios que o Papyrus adicionou a sua estação.',
            '<25>{#f/1}* Primeiro, uma alça, para que ele possa \"balançar\" para o serviço...',
            '<25>{#f/1}* Uma chamada \"chave inglesa do céu\" usada para obter uma \"correção\" nas estrelas...',
            '<25>{#f/0}* E um tablet para poder anotar cada uma de suas muitas responsabilidades.',
            '<25>{#f/6}* Com invenções como essa, você poderia pensar que ele trabalha no laboratório.'
        ],
        s_doggo: [
            '<25>{#p/toriel}{#f/5}* A Guarda Real está te dando muito trabalho?',
            '<25>{#f/0}* Sans disse que te alertaria de potenciais encontros.',
            '<25>{#f/1}* ...',
            '<25>{#f/1}* Talvez eu devesse estar mais preocupada, porém...',
            '<25>{#f/0}* Algo me diz que você ficará bem.',
            '<25>{#f/0}* Eu tenho fé que aquele esqueleto te protegerá.'
        ],
        s_robot: [
            '<25>{#p/toriel}{#f/1}* Ah, que som amável...',
            '<25>{#f/0}* Eu reconheceria um bot construtor em qualquer lugar.',
            '<25>{#f/5}* Após o banimento das IA, nós tivemos maior parte delas desligadas...',
            '<25>{#f/1}* Mas os dois cuja senciência não os corrompeu...',
            '<25>{#f/0}* Nós os deixamos para um desligamento mais pacífico.',
            '<25>{#f/0}* É legal saber que eles estão sobrevivendo até hoje.'
        ],
        s_maze: [
            "<25>{#p/toriel}* Sans me contou sobre a apreciação do seu irmão por armadilhas.",
            '<25>{#f/1}* Eu ouvi dizer que ele criou algumas ele mesmo...?',
            '<25>{#f/0}* Estou super curiosa sobre a \"Parede de Fogo.\"',
            '<25>{#f/1}* As chamas estão quentes?\n* Ou elas são apenas agradavelmente quentes?',
            '<25>{#f/5}* Pelo seu bem, eu espero que seja o último.'
        ],
        s_dogs: [
            '<25>{#p/toriel}{#f/1}* Eu ouvi que a Guarda Real emprega um par de cachorros casados.',
            '<25>{#f/3}* Ser casado ao mesmo tempo em que está na Guarda Real...',
            '<25>{#f/4}* Esses relacionamento deve ter motivações \"interessantes\".',
            '<25>{#f/6}* Mas do que eu sei.\n* Como diria Sans, eu sou após uma mera \"cabra!\"'
        ],
        s_lesser: [
            '<25>{#p/toriel}* Eu me pergunto que tipo de comida é vendida em Starton nos dias de hoje.',
            '<25>{#f/1}* Quando eu vim aqui pela última vez, todo mundo amava comer fruta fantasma...',
            '<25>{#f/0}* Uma estranha comida que poderia ser experimentada tanto por fantasmas como por não-fantasmas.',
            '<26>{#f/0}* Seja lá qual for a favorita de hoje em dia, eu nem consigo imaginar qual.'
        ],
        s_bros: [
            "<25>{#p/toriel}{#f/1}* O gosto de Sans por quebra-cabeças de detectar as diferenças...",
            '<25>{#f/0}* Nunca fez muito sentido para mim.',
            '<25>{#f/1}* Como algo tão simples poderia apegar ele?',
            '<26>{#f/3}* ... mais especificamente...',
            '<25>{#f/1}* Onde está o humor neste tipo de quebra-cabeça?'
        ],
        s_spaghetti: [
            "<25>{#p/toriel}* Sans fala bastante do interesse de Papyrus por espaguete.",
            '<25>{#f/6}* Mas por que parar aí?\n* Só imagine todas as PASTABILIDADES...',
            '<25>{#f/8}* Rigatoni!\n* Fettuccine!\n* Acini di Pepe!',
            '<25>{#f/0}* Tantas variedades poderiam ajudá-lo a ir mais LONGUINE.',
            '<25>{#f/2}* ... Em outras palavras, trabalhe na massa ou vá para casa!'
        ],
        s_puzzle1: [
            '<25>{#p/toriel}{#f/1}* Seja lá como os quebra-cabeças em Starton se pareçam, eu tenho certeza...',
            '<25>{#f/0}* Eles não são nada parecidos com os que temos aqui quando eu saí.',
            '<25>{#f/5}* Um nível de dificuldade tão irrealista...',
            '<25>{#f/5}* É uma grande conquista caso alguém possa resolver todos eles.'
        ],
        s_puzzle2: [
            '<25>{#p/toriel}{#f/1}* Os mesmo quebra-cabeças tem soluções secretas...',
            '<25>{#f/0}* ... uma declaração que acho totalmente inacreditável!',
            '<25>{#f/0}* Uma solução secreta destrói todo o sentido de um desafios.',
            '<25>{#f/1}* Quebras-cabeças, pelo menos os de dificuldade realista...',
            '<25>{#f/2}* Devem ser resolvidos apenas da forma correta!'
        ],
        s_jenga: [
            '<25>{#p/toriel}* Do meu conhecimento, Dr. Alphys é a atual cientista real.',
            '<25>{#f/1}* Ela provavelmente nunca irá substituir a experiência de seu antecessor, mas...',
            '<25>{#f/0}* Eu tenho certeza que ela é capaz de encontrar o próprio caminho na ciência.',
            '<25>{#f/0}* Isso pode te surpreender, mas eu tenho bastante respeito por cientistas.',
            '<25>{#f/2}* Mentes tão brilhantes!'
        ],
        s_pacing: [
            '<25>{#p/toriel}{#f/1}* Você seria sábio em ficar longe de vendedores duvidosos...',
            '<25>{#f/0}* Nunca se sabe os truques que eles podem colocar na manga.',
            '<25>{#f/0}* Tome cuidado ou pedaços da lua podem cair no seu colo.',
            '<25>{#f/3}* É uma lição que eu aprendi do jeito difícil, infelizmente...'
        ],
        s_puzzle3: [
            '<25>{#p/toriel}{#f/1}* O quebra-cabeça nesta sala é sobre memorização, não é mesmo?',
            '<25>{#f/1}* Sans disse que seu irmão atualiza o padrão de vez em quando...',
            '<25>{#f/0}* ... para manter uma forte \"rotação de senha.\"',
            '<25>{#f/6}* Que interessante!',
            '<25>{#f/0}* Nas Outlands, nossos quebra-cabeças de memorização são atualizados sob demanda.'
        ],
        s_greater: [
            '<25>{#p/toriel}{#f/1}* O antigo dono dessa casa de cachorro, Canis Maximus...',
            '<25>{#f/0}* ... retirou-se da guarda a muito tempo atrás.',
            '<25>{#f/7}* Felizmente, seu novo dono é dito por ser um fofo cheio de energia!',
            '<25>{#f/0}* Claramente ele aprendeu muito com seu mestre ancião.'
        ],
        s_math: [
            '<25>{#p/toriel}{#f/1}* Por favor, alguém pode explicar \"justiça canina?\"',
            '<25>{#f/0}* É uma frase que eu tenho escutado bastante todo momento.',
            '<25>{#f/5}* Eu sei de um cachorrinho que visita as Outlands as vezes...',
            '<25>{#f/0}* Talvez seja ele quem precisa da tal justiça.'
        ],
        s_bridge: [
            '<25>{#p/toriel}{#f/1}* Quando está ponte foi construída...',
            "<25>{#f/0}* Sua natureza precária trouxe grandes atualizações para os sistemas do Outpost.",
            '<25>{#f/0}* Em um pequeno tempo, os então nomeados \"Voa-corpos de gravidade\" foram adicionados.',
            '<25>{#f/0}* Foram construídos para prevenção de qualquer pessoa se acidentar ao cair da plataforma.'
        ],
        s_town1: [
            '<25>{#p/toriel}{#f/0}* Ah...\n* A cidade de Starton.',
            '<25>{#f/1}* Eu ouvi muito falar sobre um tal \"Grillby\" por aí...',
            '<25>{#f/0}* ... e sua gama diversificada de clientes novos e antigos.',
            '<25>{#f/0}* Sans vai lá para comer muitas vezes, sabe?',
            '<25>{#f/7}* E também ouvi dizer que o atendente é bem \"quente.\"'
        ],
        s_taxi: [
            '<25>{#p/toriel}{#f/1}* Uma parada de táxi perto da cidade?',
            '<25>{#f/1}* ... hmm...',
            '<25>{#f/0}* Me pergunto se ele tem alguma diferença do que temos aqui nas Outlands.',
            '<25>{#f/1}* Claro, na tem como eu saber antes de ver...',
            '<25>{#f/0}* O que não tem como eu fazer sem um telescópio extravagante.',
            '<25>{#f/0}* Onde será que dá pra encontrar um desses?'
        ],
        s_town2: [
            '<25>{#p/toriel}{#f/1}* Napstablook recentemente me disse que eles abriram uma loja...',
            '<25>{#f/5}* ... no lado \"sul\" da cidade.',
            '<25>{#f/1}* O que isso poderia significar?',
            '<25>{#f/0}* A cidade que eu lembro organizar era um único e grande quadrado.',
            '<25>{#f/1}* Talvez ela aumentou de tamanho em algum momento?',
            '<25>{#f/5}* Seria uma pena, considerando a visão original...'
        ],
        s_battle: [
            '<25>{#p/toriel}{#f/1}* Uma das coisas das quais Sans mais parecia querer me avisar...',
            '<25>{#f/0}* Era um então chamado \"ataque especial\" do seu irmão.',
            '<25>{#f/1}* Se Papyrus decidir lutar contra você, é preciso evitar isso a todo custo.',
            '<25>{#f/2}* Digo e repito, evite seu ataque especial!\n* A todo custo!',
            '<25>{#f/0}* Isso é tudo que eu tenho para dizer.'
        ],
        s_exit: [
            '<25>{#p/toriel}{#f/1}* Se você decidir deixar Starton, eu devo te avisar sobre algo...',
            '<25>{#f/5}* Meu celular é antigo, é pode apenas acessar algumas partes da fábrica.',
            '<25>{#f/9}* Vai ser difícil me ligar até você sair de lá.',
            '<25>{#f/1}* Me desculpe.\n* Eu apenas senti que você precisava saber.'
        ],
        f_entrance: [
            '<25>{#p/toriel}{#f/7}* Então você achou um lugar na fábrica onde o sinal é bom...?',
            '<25>{#f/1}* ... isso deve significar que de alguma forma você está em um lugar aberto...',
            '<25>{#f/0}* O que também implica a presença próxima de arbustos sintéticos.',
            '<25>{#f/3}* Essas coisas são horríveis de ficar preso...',
            '<25>{#f/4}* Deixando você com coceira e coceira...',
            '<25>{#f/0}* Felizmente, eu sei que você é inteligente o suficiente para não chegar perto delas.'
        ],
        f_bird: () =>
            SAVE.data.n.plot !== 47.2 && SAVE.data.n.plot > 42 && SAVE.data.s.state_foundry_deathroom !== 'f_bird' // NO-TRANSLATE

                ? [
                    '<25>{#p/toriel}{#f/0}* Não existe nada como a força daquele passarinho sem medo.',
                    '<25>{#f/1}* Mesmo quando ele vivia apenas em um balde d\'água...',
                    '<25>{#f/1}* Ele voava com suas pequenas asinhas...',
                    '<25>{#f/1}* Nos levando para os lugares...',
                    '<25>{#f/0}* Eu usava seus serviços para carregar compras no passado.',
                    '<25>{#f/5}* ... quando quase todos nós vivíamos naquela antiga fábrica.'
                ]
                : [
                    '<25>{#p/toriel}{#f/5}* Parece estranhamente silencioso onde você está...',
                    '<25>{#f/5}* Como se tivesse algo faltando.',
                    '<25>{#f/5}* Algo importante...',
                    '<25>{#f/0}* Bem, não importa.\n* Minha imaginação vai longe as vezes.',
                    '<25>{#f/1}* ...',
                    '<25>{#f/1}* Chirp, chirp, chirp, chirp, chirp...'
                ],
        f_taxi: [
            "<25>{#p/toriel}{#f/1}* Então você achou o ponto de táxi na fábrica...?",
            '<25>{#f/0}* Talvez você possa usar isso para escapar da capitã da Guarda Real.',
            '<25>{#f/1}* Um visitante aqui uma vez falou da sua obsessão por lanças...',
            '<25>{#f/0}* Que interessante.\n* O capitão que eu conhecia gostava mais de sabres.'
        ],
        f_battle: [
            '<25>{#p/toriel}{#f/0}* Ah, aí está você.',
            "<25>{#f/0}* Você está na borda da fábrica.",
            '<26>{#f/1}* Desde ponto para frente eu não sei o que te espera...',
            '<25>{#f/5}* Antes de ir embora, havia apenas um elevador direto para a Cidadela.',
            '<25>{#f/1}* Agora, entretanto, existe essa tal área chamada \"Aerialis...\"',
            '<25>{#f/23}* ... Me pergunto quem teve a ideia DESSE nome.'
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

                ? ['<25>{#p/toriel}{#f/3}* ...', '<25>{#f/2}* Volte para casa agora mesmo!']
                : [
                    3 <= SAVE.data.n.cell_insult
                        ? '<25>{#p/toriel}{#f/23}* Você não está exausto de como se comportou comigo?'
                        : SAVE.data.n.state_wastelands_napstablook === 5
                            ? '<25>{#p/toriel}{#f/1}* Você não está exausto de esperar por tanto tempo?'
                            : '<25>{#p/toriel}{#f/1}* Você não está exausto após tudo que passou?',
                    3 <= SAVE.data.n.cell_insult
                        ? game.room.startsWith('w_toriel') // NO-TRANSLATE

                            ? '<25>{#f/0}* Talvez você deva ver a cama que eu fiz para você no quarto de visitas.'
                            : '<25>{#f/0}* Talvez você deva ver a cama que eu fiz para você na casa.'
                        : game.room.startsWith('w_toriel') // NO-TRANSLATE

                            ? '<25>{#f/0}* Venha para o corredor e eu lhe mostrarei uma coisa.'
                            : '<25>{#f/0}* Venha para casa e eu vou te mostrar uma coisa.'
                ],
        c_call_toriel_late: () =>
            SAVE.data.n.plot === 8.1
                ? ['<32>{#p/human}* (Mas a linha está ocupada.)']
                : game.room === 'w_bridge' || game.room.startsWith('w_alley') // NO-TRANSLATE

                    ? ['<25>{#p/toriel}{#f/3}* ...', '<25>{#f/2}* Volte para casa agora mesmo!']
                    : [
                        '<25>{#p/toriel}{#f/1}* Não tem necessidade de me ligar pelo telefone, minha criança.',
                        3 <= SAVE.data.n.cell_insult
                            ? '<26>{#f/23}* Já sabemos em que isso tende a resultar.'
                            : game.room === 'w_toriel_living' // NO-TRANSLATE

                                ? toriCheck()
                                    ? '<25>{#f/0}* Até porque, eu estou aqui com você.'
                                    : '<25>{#f/0}* Eu vou acabar daqui a pouco.'
                                : game.room.startsWith('w_toriel') // NO-TRANSLATE

                                    ? toriCheck()
                                        ? '<25>{#f/0}* Se você quiser me ver, pode vir até a sala de estar.'
                                        : '<25>{#f/0}* Se você quiser me ver, pode esperar na sala de estar.'
                                    : '<25>{#f/0}* Se você quiser me ver, pode vir até em casa.'
                    ],
        c_call_asriel: () =>
            [
                [
                    "<25>{#p/asriel2}{#f/3}* Só pra você saber, eu não vou atender.",
                    '<25>{#p/asriel2}{#f/4}* Temos coisas melhores pra fazer.'
                ],
                ['<25>{#p/asriel2}{#f/4}* ...'],
                ['<25>{#p/asriel2}{#f/4}* ... sério?'],
                ['<25>{#p/asriel2}{#f/3}* Você deve estar muito, MUITO entediado.'],
                []
            ][Math.min(SAVE.flag.n.ga_asrielCall++, 4)]
    },
    s_save_outlands: {
        w_courtyard: {
            name: 'Outlands - Patio',
            text: () =>
                SAVE.data.n.plot > 16
                    ? [
                        6 <= world.population
                            ? '<32>{#p/human}* (Mesmo quando visitando, está pequena casa te enche de determinação.)'
                            : '<32>{#p/human}* (Mesmo quando visitando, está casa te enche de determinação.)'
                    ]
                    : 6 <= world.population
                        ? ['<32>{#p/human}* (Está casa fofinha te enche de determinação.)']
                        : ['<32>{#p/human}* (Uma casa em meio às paredes metálicas o enche de determinação.)']
        },
        w_entrance: {
            name: 'Outlands - Entrada',
            text: () =>
                world.runaway
                    ? [
                        '<32>{#p/human}* (As industriosas Outlands ficam em silêncio, enchendo você de determinação.)',
                        '<32>{#p/human}* (HP totalmente restaurado.)'
                    ]
                    : SAVE.data.n.plot < 48
                        ? [
                            '<32>{#p/human}* (As insdustriosas Outlands estão a frente, enchendo você de determinação.)',
                            '<32>{#p/human}* (HP totalmente restaurado.)'
                        ]
                        : [
                            '<32>{#p/human}* (Retornando onde tudo começou, após tanto tempo...)',
                            '<32>{#p/human}* (Isso te enche de determinação.)',
                            '<32>{#p/human}* (HP totalmente restaurado.)'
                        ]
        },
        w_froggit: {
            name: 'Outlands - Área de Descanso',
            text: () =>
                SAVE.data.n.state_wastelands_toriel === 2 || world.runaway || roomKills().w_froggit > 0
                    ? SAVE.data.n.plot < 8.1
                        ? [
                            '<32>{#p/human}* (O ar se torna viciante.)\n* (De alguma forma, isso te enche de determinação.)',
                            '<32>{#p/human}* (HP totalmente restaurado.)'
                        ]
                        : [
                            '<32>{#p/humano}* (O ar secou completamente.)\n* (Dessa forma, isso o enche de determinação.)',
                            '<32>{#p/human}* (HP totalmente restaurado.)'
                        ]
                    : SAVE.data.b.svr
                        ? [
                            '<32>{#p/human}* (A área parece desocupada, mas o ar continua fresco.)',
                            '<32>{#p/human}* (Isso, é claro, te enche de determinação.)',
                            '<32>{#p/human}* (HP totalmente restaurado.)'
                        ]
                        : [
                            '<32>{#p/human}* (A presença de estranhas e maravilhosas criaturas te enche de determinação.)',
                            '<32>{#p/human}* (HP totalmente restaurado.)'
                        ]
        },
        w_mouse: {
            name: 'Outlands - Buraco Stærmite',
            text: () =>
                world.population > 5 && !SAVE.data.b.svr && !world.runaway
                    ? [
                        '<32>{#p/human}* (Sabendo que o stærmite um dia surgirá...)',
                        '<32>{#p/human}* (O pensamento te enche de determinæção.)'
                    ]
                    : [
                        '<32>{#p/human}* (Mesmo que o stærmite jamais volte a aparecer...)',
                        '<32>{#p/human}* (A situação te enche de determinæção.)'
                    ]
        },
        w_start: {
            name: 'Local do Acidente',
            text: []
        }
    }
};


// END-TRANSLATE
