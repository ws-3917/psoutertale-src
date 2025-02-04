import { pms } from '../../../code/common/extras';
import { music, sounds } from '../../../code/systems/assets';
import { battler, choicer, iFancyYourVilliany, pager, phone, player, world } from '../../../code/systems/framework';
import { SAVE } from '../../../code/systems/save';

// START-TRANSLATE

export default {
    _0: {
        _1: 'O jogador fez tudo que ele pôde...',
        _2: 'Mas alas, seu destino foi selado, e...',
        _3: 'Não havia nada na história que poderia desfazer isso.',
        _4: 'Não havia nenhum cenário onde o jogador estaria satisfeito.',
        _5: 'Isso é realmente o que eles merecem?',
        _6: 'Vivendo na grandeza da agonia, sabendo que ele nunca poderá...',
        _7: 'Não...\nEu não posso permitir.',
        _8: 'Se dobrar o tecido do espaço-tempo é o que é preciso, então...',
        _9: 'Que seja.',
        _10: 'Eu não irei descansar até tudo estar pronto.'
        
        
        
        
        
        
        
        
        
        
        
    },

    a_common: {
        bullybed: [
            [
                '<32>{#p/human}* (...)',
                '<32>{#p/human}* (Você acorda.)',
                '<32>{#p/human}* (O Outpost está do mesmo jeito que estava quando você foi dormir.)'
            ],
            [
                '<32>{#p/human}* (Você procura em cada canto do Outpost por sinais de vida, mas ninguém veio.)',
                '<32>{#p/human}* (Você procura de novo, de novo e de novo...)',
                '<32>{#p/human}* (Mas ninguém veio.)'
            ],
            [
                '<32>{#p/human}* (Você procura pela nave na qual veio.)\n* (Ela parece ter sido destruída.)',
                '<32>{#p/human}* (Você procura por outra nave deixada pelos monstros.)',
                '<32>{#p/human}* (Eles tomaram ela de você.)'
            ],
            [
                '<32>{#p/human}* (Você vai ao laboratório e procura por ferramentas e pedaços de nave.)',
                '<32>{#p/human}* (Existem muitas disponíveis e as partes estão guardadas.)',
                "<32>{#p/human}* (Mas a energia do CORE não seria o suficiente para lançar uma nave.)"
            ],
            [
                '<32>{#p/human}* (Você tenta RESETAR seu arquivo SALVO.)\n* (Nada acontece.)',
                '<32>{#p/human}* (Você tenta RESETAR seu arquivo SALVO de novo.)',
                '<32>{#p/human}* (Nada acontece.)'
            ],
            [
                "<32>{#p/human}* (Em desespero, você tenta ligar para Toriel.)\n* (Sem resposta.)",
                '<32>{#p/human}* (Você tenta ligar para Papyrus e Undyne.)',
                '<32>{#p/human}* (Sem resposta.)'
            ],
            [
                '<32>{#p/human}* (...)',
                "<32>{#p/human}* (Você já perdeu as contas de quanto tempo está aqui.)",
                "<32>{#p/human}* (Você não sabe dizer se foram semanas, meses ou anos.)",
                "<32>{#p/human}* (Você configura o CORE para usar o mínimo de energia possível...)",
                "<32>{#p/human}* (Mas não vai durar para sempre.)"
            ],
            [
                '<32>{#p/human}* (A gravidade começa a falhar.)',
                '<32>{#p/human}* (A temperatura começa a cair.)',
                '<32>{#p/human}* (A atmosfera está colapsando.)',
                '<32>{#p/human}* (Sem energia, o Outpost se tornará inabitável.)'
            ],
            [
                '<32>{#p/human}* (De alguma forma, você sente-se em paz.)',
                "<32>{#p/human}* (Você acaba aceitando que sua morte chegará.)",
                "<32>{#p/human}* (Você percebe que não havia outro fim para suas atitudes.)",
                '<32>{#p/human}* (Enquanto o último ar restante entra no seu pulmão, você relembra sua jornada pela última vez.)',
                '<32>{#p/human}* (Desde de o exílio, até o dia que a sociedade dos monstros fugiu.)'
            ],
            [
                '<32>{#p/human}* (O ar acabou.)',
                '<32>{#p/human}* (Você começa a engasgar.)',
                '<32>{#p/human}* (Você sente a vida saindo de seu corpo.)',
                '<32>{#p/human}* (Aqui está o fim...)'
            ]
        ],
        dogcheck1: [
            '<25>{#x1}{#p/event}Bark!\n{#x1}{#p/event}Bark!',
            '<25>{#p/basic}(E assim você chegou ao fim!)',
            '<25>{#p/basic}(Está na hora de ver o que você conquistou!)'
        ],
        dogcheck2: () => [
            ...(!SAVE.flag.b._saved
                ? !SAVE.flag.b._item
                    ? [
                        '<25>{#x1}{#p/event}Bark!\n{#x1}{#p/event}Bark!',
                        '<25>{#p/basic}(Wow!)\n(Sem SALVAR e sem usar ITEMs!)',
                        '<25>{#p/basic}(Você tava com pressa, hein?)'
                    ]
                    : [
                        '<25>{#x1}{#p/event}Bark!\n{#x1}{#p/event}Bark!\n{#x1}{#p/event}Bark!',
                        "<25>{#p/basic}(Wow!)\n(Você não sabe como funciona SALVAR?)",
                        '<25>{#p/basic}(Porque você nunca o fez!)'
                    ]
                : !SAVE.flag.b._item
                    ? [
                        '<25>{#x1}{#p/event}Bark!\n{#x1}{#p/event}Bark!',
                        "<25>{#p/basic}(Wow!)\n(Você não sabe o que é um ITEM?)",
                        '<25>{#p/basic}(Você nunca pegou um!)'
                    ]
                    : []),
            ...(SAVE.flag.n._hits === 0
                ? !SAVE.flag.b._flee
                    ? [
                        '<25>{#x1}{#p/event}Bark!\n{#x1}{#p/event}Bark!\n{#x1}{#p/event}Bark!',
                        '<25>{#p/basic}(Incrível!)\n(Você desviou de cada ataque e nunca fugiu de uma luta!)',
                        !SAVE.flag.b._equip
                            ? "<25>{#p/basic}(Você provavelmente sabia que nem iria precisar de armas ou armaduras!)"
                            : '<25>{#p/basic}(Você deve ser bem corajoso!)'
                    ]
                    : [
                        '<25>{#x1}{#p/event}Bark!\n{#x1}{#p/event}Bark!\n{#x1}{#p/event}Bark!',
                        '<25>{#p/basic}(Incrível!)\n(Você desviou de cada ataque que enfrentou!)',
                        !SAVE.flag.b._equip
                            ? '<25>{#p/basic}(Que sorte, para alguém que nunca equipou armas ou armaduras!)'
                            : '<25>{#p/basic}(Você deve ser muito habilidoso em lutas!)'
                    ]
                : SAVE.flag.n._deaths + SAVE.flag.n._deaths_twinkly === 0
                    ? !SAVE.flag.b._heal
                        ? !SAVE.flag.b._flee
                            ? [
                                '<25>{#x1}{#p/event}Bark!\n{#x1}{#p/event}Bark!\n{#x1}{#p/event}Bark!',
                                '<25>{#p/basic}(Incrível!)\n(Não apenas você nunca morreu...)',
                                !SAVE.flag.b._equip
                                    ? '<25>{#p/basic}(Assim como você nunca se curou, equipou armas ou armaduras!)'
                                    : '<25>{#p/basic}(Você nunca se curou também!)'
                            ]
                            : [
                                '<25>{#x1}{#p/event}Bark!\n{#x1}{#p/event}Bark!\n{#x1}{#p/event}Bark!',
                                '<25>{#p/basic}(Incrível!)\n(Você nunca morreu e nem fugiu!)',
                                !SAVE.flag.b._equip
                                    ? "<25>{#p/basic}(Você nunca se curou ou chegou a equipar qualquer coisa!)"
                                    : "<25>{#p/basic}(Você nem se curou!)"
                            ]
                        : !SAVE.flag.b._flee
                            ? [
                                '<25>{#x1}{#p/event}Bark!\n{#x1}{#p/event}Bark!\n{#x1}{#p/event}Bark!',
                                '<25>{#p/basic}(Incrível!)\n(Você nunca morreu e nem fugiu!)',
                                !SAVE.flag.b._equip
                                    ? '<25>{#p/basic}(É por isso que você nunca equipou armas ou armaduras?)'
                                    : '<25>{#p/basic}(É isso que significa ser corajoso?)'
                            ]
                            : !SAVE.flag.b._equip
                                ? [
                                    '<25>{#x1}{#p/event}Bark!\n{#x1}{#p/event}Bark!',
                                    '<25>{#p/basic}(Incrível!)\n(Você nunca morreu ou equipou armas e armaduras!)'
                                ]
                                : ['<25>{#x1}{#p/event}Bark!\n{#x1}{#p/event}Bark!', '<25>{#p/basic}(Incrível!)\n(Você nunca morreu!)']
                    : !SAVE.flag.b._heal
                        ? !SAVE.flag.b._flee
                            ? [
                                '<25>{#x1}{#p/event}Bark!\n{#x1}{#p/event}Bark!\n{#x1}{#p/event}Bark!',
                                '<25>{#p/basic}(Incrível!)\n(Você nunca se curou, e você nunca correu de uma luta!)',
                                !SAVE.flag.b._equip
                                    ? "<25>{#p/basic}(Você tem certeza que não precisava nem armas ou armaduras?)"
                                    : '<25>{#p/basic}(Você deve gostar de um desafio.)'
                            ]
                            : !SAVE.flag.b._equip
                                ? [
                                    '<25>{#x1}{#p/event}Bark!\n{#x1}{#p/event}Bark!',
                                    '<25>{#p/basic}(Incrível!)\n(Você nunca se curou ou usou armas e armaduras!)'
                                ]
                                : [
                                    '<25>{#x1}{#p/event}Bark!\n{#x1}{#p/event}Bark!',
                                    '<25>{#p/basic}(Incrível!)\n(Você não se curou nenhuma vez!)'
                                ]
                        : !SAVE.flag.b._flee
                            ? [
                                '<25>{#x1}{#p/event}Bark!\n{#x1}{#p/event}Bark!\n{#x1}{#p/event}Bark!',
                                '<25>{#p/basic}(Incrível!)\n(Você se recusou a fugir das lutas!)',
                                !SAVE.flag.b._equip
                                    ? "<25>{#p/basic}(Você tem certeza que não precisava nem armas ou armaduras?)"
                                    : '<25>{#p/basic}(Você deve gostar de um desafio.)'
                            ]
                            : !SAVE.flag.b._equip
                                ? [
                                    '<25>{#x1}{#p/event}Bark!\n{#x1}{#p/event}Bark!',
                                    '<25>{#p/basic}(Incrível!)\n(Você nunca usou armas ou armaduras!)'
                                ]
                                : []),
            ...(!SAVE.flag.b._skip
                ? [
                    '<25>{#x1}{#p/event}Bark!\n{#x1}{#p/event}Bark!\n{#x1}{#p/event}Bark!',
                    "<25>{#p/basic}(Que amor...)\n(Você nunca pulou um diálogo!)",
                    !SAVE.flag.b._call
                        ? SAVE.data.n.plot_pmcheck === 0 && phone.of('pms').display() && pms().length > 0 // NO-TRANSLATE

                            ? '<25>{#p/basic}(Parece que você nunca usou seu telefone.)'
                            : '<25>{#p/basic}(Parece que seu telefone nunca recebeu mensagem.)'
                        : SAVE.data.n.plot_pmcheck === 0 && phone.of('pms').display() && pms().length > 0 // NO-TRANSLATE

                            ? '<25>{#p/basic}(Infelizmente você nunca leu as mensagens do seu telefone.)'
                            : '<25>{#p/basic}(Você deve se importar bastante com todo mundo!)'
                ]
                : !SAVE.flag.b._call
                    ? SAVE.data.n.plot_pmcheck === 0 && phone.of('pms').display() && pms().length > 0 // NO-TRANSLATE

                        ? [
                            '<25>{#x1}{#p/event}Bark!\n{#x1}{#p/event}Bark!',
                            '<25>{#p/basic}(Que estranho...)\n(Você nunca usou seu telefone!)'
                        ]
                        : [
                            '<25>{#x1}{#p/event}Bark!\n{#x1}{#p/event}Bark!',
                            '<25>{#p/basic}(Que estranho...)\n(Seu celular nunca ligou pra ninguém!)'
                        ]
                    : SAVE.data.n.plot_pmcheck === 0 && phone.of('pms').display() && pms().length > 0 // NO-TRANSLATE

                        ? [
                            '<25>{#x1}{#p/event}Bark!\n{#x1}{#p/event}Bark!',
                            '<25>{#p/basic}(Que estranho...)\n(Seu celular parece nunca ter tido as mensagens lidas!)'
                        ]
                        : []),
            ...(!SAVE.flag.b._getg
                ? [
                    '<25>{#x1}{#p/event}Bark!\n{#x1}{#p/event}Bark!',
                    '<25>{#p/basic}(Chocante!)\n(Você nunca ganhou um G sequer!)'
                ]
                : !SAVE.flag.b._useg
                    ? [
                        '<25>{#x1}{#p/event}Bark!\n{#x1}{#p/event}Bark!',
                        '<25>{#p/basic}(Chocante!)\n(Você nunca gastou um G sequer!)'
                    ]
                    : []),
            ...(SAVE.data.b.water
                ? [
                    '<25>{#x1}{#p/event}Bark!',
                    "<25>{#p/basic}(Você realmente gosta de segurar aquele copo de fluido de eletro-amortecimento, não é?)"
                ]
                : [])
        ],
        dogcheck3: (none: boolean) =>
            none
                ? [
                    '<25>{#x1}{#p/event}Bark!\n{#x1}{#p/event}Bark!',
                    "<25>{#p/basic}(Parece que você não fez nada fora do extraordinário.)",
                    '<25>{#p/basic}(Talvez isso seja extraordinário da sua própria maneira!)'
                ]
                : [
                    '<25>{#x1}{#p/event}Bark!\n{#x1}{#p/event}Bark!',
                    "<25>{#p/basic}(Isso é tudo que se tem para dizer hoje!)",
                    '<25>{#p/basic}(Parabéns e tchau tchau!)'
                ],
        neutral0() {
            let d = false;
            let k = '';
            let m = music.ending;
            const a = [] as string[];
            const b = [] as string[];
            const addA = (lines: string[]) => a.push(...lines);
            const addB = (lines: string[]) => b.push(...lines);
            const dtoriel = SAVE.data.n.state_wastelands_toriel === 2;
            const ddoggo = SAVE.data.n.state_starton_doggo === 2;
            const dlesserdog = SAVE.data.n.state_starton_lesserdog === 2;
            const dgreatdog = SAVE.data.n.state_starton_greatdog === 2;
            const ddogs = SAVE.data.n.state_starton_dogs === 2;
            const dpapyrus = SAVE.data.n.state_starton_papyrus === 1;
            const ddoge = SAVE.data.n.state_foundry_doge === 1;
            const dmuffet = SAVE.data.n.state_foundry_muffet === 1;
            const dundyne = SAVE.data.n.state_foundry_undyne !== 0;
            const droyalguards = SAVE.data.n.state_aerialis_royalguards === 1;
            const dmadjick = SAVE.data.b.killed_madjick;
            const dknightknight = SAVE.data.b.killed_knightknight;
            const dmettaton = SAVE.data.b.killed_mettaton;
            const hkills = world.trueKills;
            const mdeaths = hkills + (SAVE.data.n.state_foundry_undyne === 1 ? 1 : 0);
            const royals = [
                !ddoggo,
                !dlesserdog,
                !ddogs,
                !dgreatdog,
                !ddoge,
                !droyalguards,
                !dmadjick,
                !dknightknight
            ].filter(v => v).length;
            if (world.bad_robot) {
                if (!dundyne) {
                    if (royals < 2) {
                        d = true;
                        k = 'dark_death'; // NO-TRANSLATE

                        m = music.youscreweduppal;
                        
                        addB([
                            '<32>{#s/phone}{#p/event}* Ring, ring...',
                            '<26>{#p/undyne}{#f/7}* BELEZA CARA, ESCUTA AQUI!',
                            "<25>{#p/undyne}{#f/4}* Você cometeu um GRANDE erro poupando a minha vida após tudo que você fez.",
                            "<25>{#p/undyne}{#f/5}* Graças a você, eu tenho o poder para fazer o que EU SEMPRE quis, e...",
                            '<25>{#p/undyne}{#f/17}* ... e...',
                            "<25>{#p/undyne}{#f/16}* ...bem, antes disso, eu preciso te dizer como eu cheguei aqui.",
                            '<25>{#p/undyne}{#f/20}* Então... tudo começou quando você fugiu do Outpost.',
                            "<25>{#p/undyne}{#f/22}* Eu descobri o que você fez e eu... tomei a Cidadela por conta.",
                            '<25>{#p/undyne}{#f/22}* Alphys estava perdida.\n* O rei morto, a guarda desaparecida.',
                            '<25>{#p/undyne}{#f/20}* E, seja lá o que ele e o Mettaton fizeram para te impedir...',
                            "<25>{#p/undyne}{#f/22}* A energia do Outpost começou a descontrolar totalmente.",
                            '<25>{#p/undyne}{#f/19}* A atmosfera, a gravidade... coisas das quais dependemos...',
                            '<25>{#p/undyne}{#f/19}* Tudo começou a falhar, resultando em inúmeras mortes.',
                            "<25>{#p/undyne}{#f/18}* Sem a Guarda Real, nós não conseguimos evacuar as pessoas para a segurança.",
                            '<25>{#p/undyne}{#f/16}* Então, para completar, uma enorme oscilação de energia atingiu o arquivo, FORTE.',
                            '<25>{#p/undyne}{#f/19}* Os humanos nele foram mortos instantâneamente.',
                            '<25>{#p/undyne}{#f/10}* ...\n* Eu entendo onde ASGORE estava tentando chegar com isso.',
                            "<25>{#p/undyne}{#f/10}* Uma forma de nos dar a liberdade, que não envolvesse matar.",
                            '<25>{#p/undyne}{#f/16}* ... heheh.\n* Era um plano... a cara dele.',
                            "<25>{#p/undyne}{#f/19}* Mas após aquela explosão, o plano de ASGORE falhou.",
                            '<25>{#p/undyne}{#f/20}* Então com as almas humanas em minha frente e o reino caindo aos meus olhos...',
                            '<25>{#p/undyne}{#f/20}* ...',
                            '<25>{#p/alphys}{#f/10}* Sem querer interromper, mas eu acho que encontramos o que v-você procurava.',
                            '<25>{#p/undyne}{#f/12}* Tem certeza?',
                            '<25>{#p/undyne}{#f/1}* Deixa-me ver...',
                            '<25>{#p/undyne}{#f/17}* ...',
                            '<25>{#p/alphys}{#f/18}* ...\n* Está certo!?',
                            '<25>{#p/undyne}{#f/9}* Tch.\n* \"Está certo.\"',
                            '<25>{#p/undyne}{#f/11}* Você tá brincando comigo?',
                            '<25>{#p/alphys}{#f/20}* ...',
                            "<25>{#p/undyne}{#f/8}* É CLARO QUE ESTÁ CERTO!",
                            '<25>{#p/undyne}{#f/7}* Então, depois que eu reuni as ALMAS humanas...',
                            '<25>{#p/undyne}{#f/11}* Alphys e eu viemos com um plano para salvar TODO MUNDO.',
                            "<25>{#p/undyne}{#f/16}* Nós iremos pegar as almas, e com uma nave, atravessar o escudo de força...",
                            '<25>{#p/undyne}{#f/7}* Então iremos te caçar por toda a galáxia e TOMAR a ALMA do seu corpo!',
                            "<25>{#p/undyne}{#f/1}* Então, voltaremos e iremos destruir o escudo de força!",
                            '<25>{#p/undyne}{#f/12}* O único problema é, como vamos te encontrar?',
                            '<25>{#p/alphys}{#f/15}* B-bem, eu posso responder isso.',
                            '<25>{#p/alphys}{#f/16}* Até porque, fui eu quem encontrou a solução!',
                            "<25>{#p/alphys}{#f/26}* É simples, na verdade.\n* Ao responder essa ÚNICA ligação..."
                        ]);
                        if (!dpapyrus) {
                            addB([
                                "<25>{|}{#p/alphys}{#f/18}* Conseguimos triangular sua- {%}",
                                '<18>{#p/papyrus}{#f/6}UNDYNE!?\nESTÁ TUDO BEM!?',
                                '<25>{#p/alphys}{#f/2}* ...!?',
                                '<25>{#p/undyne}{#f/13}* Huh??\n* O que VOCÊ está fazendo?',
                                '<18>{#p/papyrus}{#f/5}BEM... EU ESCUTEI MUITOS GRITOS.\nE EXPLOSÕES.',
                                '<18>{#p/papyrus}{#f/6}EU ESTABA PREOCUPADO COM VOCÊ.',
                                '<25>{#p/undyne}{#f/14}* Aw, obrigada Papyrus.\n* Que fofo da sua parte.',
                                "<18>{#p/papyrus}{#f/0}AH, DE NADA!",
                                "<25>{#p/undyne}{#f/7}* Talvez da próxima vez, não se esgueire na NAVE DE OUTRA PESSOA!!!",
                                "<18>{#p/papyrus}{#f/6}M-ME DESCULPA, EU ESTAVA CURIOSO, TUDO BEM??",
                                '<18>{#p/papyrus}{#f/5}EU SÓ VIM OLHAR E A PRÓXIMA COISA QUE DESCUBRO...',
                                '<18>{#p/papyrus}{#f/6}A NAVE COMEÇOU A VOAR DO OUTPOST!',
                                "<18>{#p/papyrus}{#f/4}ACREDITE EM MIM, EU PREFERIRIA TER FICADO PARA TRÁS.",
                                "<25>{#p/alphys}{#f/15}* Tá, eu não sei se você entende, mas...",
                                "<25>{#p/alphys}{#f/23}* Estamos no meio de uma situação importante aqui.",
                                '<25>{#p/undyne}{#f/12}* Sim, você deveria... voltar a se esconder de novo.',
                                '<25>{#p/undyne}{#f/1}* Pense nisso como um jogo de esconde-esconde!',
                                '<18>{#p/papyrus}{#f/6}E POR QUANTO TEMPO DEVO ME ESCONDER!?',
                                "<25>{#p/undyne}{#f/12}* Eu sei lá???",
                                "<25>{#p/alphys}{#f/17}* Duas horas.\n* Vamos te dar duas horas.",
                                '<18>{#p/papyrus}{#f/0}CERTO!!\n* BOA SORTE ENTÃO!!',
                                '<25>{#p/alphys}{#f/20}* ... duas horas serão o suficiente para pegar o humano, ou...',
                                '<25>{#p/undyne}{#f/14}* Pfft, duas HORAS?',
                                "<25>{#p/undyne}{#f/1}* É, acho que não.",
                                '<25>{#p/undyne}{#f/4}* ...\n* Fuhuhuhuhu...',
                                '<25>{*}{#x0}{#p/undyne}{#f/7}* QUE TAL DOIS SEGUNDOS.{^40}{%}'
                            ]);
                        } else {
                            addB([
                                "<25>{#p/alphys}{#f/18}* Nós sabemos a sua exata localização!",
                                "<25>{#p/undyne}{#f/1}* Fuhuhu... exatamente!",
                                "<25>{#p/undyne}{#f/7}* Você CAIU no truque, cara!",
                                "<25>{#p/alphys}{#f/16}* É-É, você vai desejar n-nunca ter feito tudo que fez!!",
                                "<25>{#p/alphys}{#f/16}* Não importa onde você vá, não a escapatória!!",
                                "<25>{#p/undyne}{#f/8}* EXATAMENTE!!\n* DIZ PRA ELE ALPHYS!!",
                                '<25>{#p/undyne}{#f/4}* ...\n* Fuhuhuhuhu...',
                                "<25>{*}{#x0}{#p/undyne}{#f/7}* Eu vou te pegar.{^40}{%}"
                            ]);
                        }
                    } else {
                        k = 'dark_undyne'; // NO-TRANSLATE

                        
                        addA([
                            '<32>{#s/phone}{#p/event}* Ring, ring...',
                            '<25>{#p/alphys}{#f/33}* ... shh, shh, acho que aquele é ele.',
                            "<25>{#p/alphys}{#f/1}* Hiya!\n* Eu sou a Dr. Alphys.",
                            '<25>{#p/alphys}{#f/17}* Chefe da sociedade real de dor na bunda.',
                            '<25>{#p/alphys}{#f/28}* ... estaria interessado na nossa trágica história passada?'
                        ]);
                        addB([
                            '<25>{#p/alphys}{#f/5}* Então, eu estava cuidando dos meus próprios problemas, olhando o arquivo...',
                            '<25>{#p/alphys}{#f/23}* Quando do nada, eu escuto uma nave indo embora.',
                            '<32>{#p/basic}{@fill=#ffbbdc}* Uma graaaaaandeeee nave espacial.',
                            '<25>{#p/alphys}{#f/17}* Na verdade, não.\n* Era apenas um ônibus espacial.',
                            '<32>{#p/basic}{@fill=#ffbbdc}* Oh.\n* Uma pequena nave espacial.',
                            '<25>{#p/alphys}{#f/15}* É, e Asgore não estava em lugar nenhum.',
                            '<25>{#p/alphys}{#f/20}* Eu olhei na casa dele, eu olhei o anexo real...',
                            '<25>{#p/alphys}{#f/21}* ... então, notei as flutuações de energia.',
                            '<25>{#p/alphys}{#f/24}* Aparentemente o Mettaton estava sendo estúpido e usando tudo para lutar contra você.',
                            '<25>{#p/alphys}{#f/25}* Então o Outpost está rodando a base de quase nada.',
                            '<32>{#p/basic}{@fill=#d4bbff}* Oh meu Deus, o que houve depois?',
                            '<25>{#p/alphys}{#f/26}* ...',
                            '<32>{#p/basic}{@fill=#d4bbff}* Ah, claro, você só ficou doidona e ligou pra Undyne.',
                            '<25>{#p/alphys}{#f/18}* ... e ela apareceu lá, contando que Asgore estava morto!',
                            "<25>{#p/alphys}{#f/3}* Já que aquilo era DEFINITIVAMENTE o que eu queria ouvir.",
                            '<32>{#p/basic}{@fill=#ffbbdc}* É, mas é claro.',
                            '<25>{#p/alphys}{#f/13}* Quer dizer, pelo menos ela chamou a Guarda Real...',
                            '<25>{#p/alphys}{#f/20}* Para ajudar a estabilizar o CORE e impedir que alguém se machucasse.',
                            '<25>{#p/alphys}{#f/30}* Mas o que ela fez depois foi bem pior do que eu... imaginava.',
                            '<32>{#p/basic}{@fill=#d4bbff}* Isso... isso é quando ela...',
                            '<25>{#p/alphys}{#f/31}* Quando Undyne achou o arquivo e MATOU os humanos dentro.',
                            "<25>{#p/alphys}{#f/32}* Naquele momento, eu nem sabia o que sentir mais.",
                            "<32>{#p/basic}{@fill=#ffbbdc}* senhor, eu não te culpo.",
                            "<32>{#p/basic}{@fill=#d4bbff}* É como se ela só estivesse pensando em si mesma.",
                            '<25>{#p/alphys}{#f/17}* Ela disse que \"entendeu\" onde Asgore estava tendo chegar...',
                            '<25>{#p/alphys}{#f/24}* Mas que aquele plano era falho.',
                            '<25>{#p/alphys}{#f/13}* ...\n* Eu estava com muita raiva, mas...',
                            '<25>{#p/alphys}{#f/10}* Pelo menos precisamos de apenas mais uma ALMA.\n* Ainda temos esperança.',
                            "<32>{#p/basic}{@fill=#ffbbdc}* ... até não ter mais.",
                            "<25>{#p/alphys}{#f/20}* Exatamente.\n* Até não ter mais.",
                            '<25>{#p/alphys}{#f/21}* Porque a Undyne, em sua INFINITA SABEDORIA...',
                            
                            '<25>{#p/alphys}{#f/22}* Não TINHA A MENOR IDEIA DE COMO CONTROLAR AS ALMAS HUMANAS PROPRIAMENTE.',
                            "<32>{#p/basic}{@fill=#d4bbff}* e agora elas estão todas...",
                            '<25>{#p/alphys}{#f/24}* ... mortas.',
                            '<25>{#p/alphys}{#f/6}* Neste ponto eu só desisti.',
                            "<25>{#p/alphys}{#f/8}* Eu não me importei com o que ela fez depois.",
                            '<25>{#p/alphys}{#f/10}* eu saí do meu trabalho.\n* Joguei meus experimentos no lixo.',
                            '<25>{#p/alphys}{#f/33}* E então...',
                            '<32>{#p/basic}{@fill=#ffbbdc}* Você voltou para a gente.',
                            '<32>{#p/basic}{@fill=#d4bbff}* Você se tornou uma catadora de lixo interestelar novamente!',
                            "<25>{#p/alphys}{#f/29}* Exatamente.",
                            "<25>{#p/alphys}{#f/28}* E eu sou BOA nisso.\n* Hein, a melhor neste negócio.",
                            "<32>{#p/basic}{@fill=#ffbbdc}* Agora aí está uma coisa que eu nunca ouvi alguém dizer.",
                            '<25>{#p/alphys}{#f/10}* Tipo, honestamente, quem se IMPORTA de sair daqui de toda forma?',
                            '<25>{#p/alphys}{#f/28}* Com todo esse lixo espacial que entra...',
                            "<25>{#p/alphys}{#f/18}* Não a nenhuma razão pra ir embora!",
                            '<32>{#p/basic}{@fill=#ffbbdc}* Mas ninguém sabe sobre a parada dos humanos.',
                            "<32>{#p/basic}{@fill=#d4bbff}* É tipo, o nosso novo super duper grande segredo.",
                            '<25>{#p/alphys}{#f/23}* Bem, Undyne não vai conseguir mentir para todos eles.',
                            '<25>{#p/alphys}{#f/23}* Ela pode fazer armas nas indústrias, e torres de controle...',
                            '<25>{#p/alphys}{#f/25}* Se ela pensa que entrar na era \"militar\" vai vender sua história, beleza.',
                            '<25>{#p/alphys}{#f/26}* Ela pode fazer o que ela achar melhor.'
                        ]);
                        if (!dtoriel) {
                            addB([
                                "<32>{#p/basic}{@fill=#d4bbff}* Ah é, ela meio que, tomou a força as Outlands, né?",
                                '<26>{#p/alphys}{#f/24}* Ugh, isso me irritou muito.',
                                '<25>{#p/alphys}{#f/30}* A verdadeira rainha tentou impedir, e...',
                                "<25>{#p/alphys}{#f/31}* ... ela foi totalmente pisoteada pelo apoiadores da Undyne.",
                                "<25>{#p/alphys}{#f/21}* Undyne ainda não tomou responsabilidade por aquilo.",
                                "<32>{#p/basic}{@fill=#ffbbdc}* Senhor, isso é apenas triste."
                            ]);
                        } else {
                            addB([
                                "<32>{#p/basic}{@fill=#d4bbff}* Ah é, e ela meio que fez a Guarda Real como trabalho obrigatório?",
                                '<25>{#p/alphys}{#f/24}* Ugh, aquilo foi estúpido.',
                                '<25>{#p/alphys}{#f/30}* Todas aquelas pessoas forçadas a vigiarem o dia inteiro...',
                                '<25>{#p/alphys}{#f/31}* Procura do por um humano que talvez NUNCA venha...',
                                "<25>{#p/alphys}{#f/21}* É como se ela tivesse esquecido que a rede de telescópio existe.",
                                "<32>{#p/basic}{@fill=#ffbbdc}* Uau, ela realmente não pensou nisso."
                            ]);
                        }
                        addB(['<32>{#p/basic}{@fill=#d4bbff}* É...']);
                        if (!dpapyrus) {
                            addB([
                                '<25>{#p/alphys}{#f/20}* E ela fez tudo isso mesmo com Papyrus IMPLORANDO pra ela não fazer.',
                                '<25>{#p/alphys}{#f/31}* ... Eu parei de me importar com ela completamente depois de tudo.'
                            ]);
                        } else {
                            addB([
                                "<25>{#p/alphys}{#f/20}* Talvez, se o Papyrus tivesse por perto, ele poderia ter parado ela.",
                                "<25>{#p/alphys}{#f/18}* ... mas nós sabemos que isso não aconteceria, não é mesmo?"
                            ]);
                        }
                        if (hkills > 19) {
                            addB([
                                '<25>{#p/alphys}{#f/17}* ...\n* Ah bem.\n* É o que é.',
                                "<25>{#p/alphys}{#f/27}* De toda forma, é por causa de todas as pessoas que você matou...",
                                '<25>{#p/alphys}{#f/26}* Que tudo isso aconteceu primeiramente.',
                                "<25>{#p/alphys}{#f/18}* Então, eu coloco a culpa toda em você."
                            ]);
                        } else {
                            addB([
                                '<25>{#p/alphys}{#f/17}* ...\n* Ah bem.\n* É o que é.',
                                "<25>{#p/alphys}{#f/26}* E mesmo se você não tiver MATADO tantas pessoas...",
                                '<25>{#p/alphys}{#f/23}* Mesmo se eu e Mettaton tivermos exagerado...',
                                "<25>{#p/alphys}{#f/18}* Ainda é totalmente sua culpa."
                            ]);
                        }
                        addB([
                            "<32>{#p/basic}{@fill=#ffbbdc}* Fala pra ele Alphys.",
                            '<32>{#p/basic}{@fill=#d4bbff}* É, fala pra ele, aquele perdedor!',
                            "<25>{#p/alphys}{#f/33}* ... pois bem.\n* Isso é tudo que eu tenho.",
                            '<25>{#p/alphys}{#f/1}* Até logo!',
                            '<32>{#p/basic}{@fill=#ffbbdc}* Até a próxima, covarde.',
                            "<32>{#p/basic}{@fill=#d4bbff}* Bratty, tem certeza que vai ter uma próxima vez?",
                            "<32>{#p/basic}{@fill=#ffbbdc}* Ah é, você tá certa.\n* A bateria do telefone tá acabando de toda forma.",
                            '<32>{#p/basic}{@fill=#d4bbff}* ... até, traidor!!!\n* Nya ha ha!!!',
                            '<32>{#s/equip}{#p/event}* Click...'
                        ]);
                    }
                } else if (royals < 2) {
                    if (!dpapyrus || royals === 1) {
                        k = 'dark_alphys'; // NO-TRANSLATE

                        
                        addA([
                            '<32>{#s/phone}{#p/event}* Ring, ring...',
                            '<25>{#p/sans}{#f/0}* opa.',
                            "<25>{#p/sans}{#f/3}* já faz um tempo, huh?"
                        ]);
                        addB([
                            '<25>{#p/sans}{#f/0}* depois que você fugiu, alphys... meio que entrou em pânico.',
                            '<25>{#p/sans}{#f/0}* não apenas asgore e undyne se foram...',
                            '<25>{#p/sans}{#f/0}* mas por conta de um plano estúpido envolvendo mettaton e o core...',
                            "<25>{#p/sans}{#f/3}* o sistema de energia do Outpost começou a quebrar.",
                            "<25>{#p/sans}{#f/3}* tanto a atmosfera quando a gravidade foram destruídas.\n* não foi... nada bonito.",
                            '<25>{#p/sans}{#f/0}* só pela ligação que ela fez, eu já entendi que as coisas estavam horríveis.',
                            '<25>{#p/sans}{#f/0}* mas até eu chegar na cidadela...',
                            '<25>{#p/sans}{#f/3}* um poder surgiu e matou todos os humanos nos arquivos também.',
                            "<25>{#p/sans}{#f/3}* ... eu nunca a vi em um estado tão ruim.",
                            '<25>{#p/sans}{#f/0}* ainda assim, eu sabia desde que éramos parceiros de laboratório...',
                            '<25>{#p/sans}{#f/2}* que ela tinha um plano caso tudo desse errado.',
                            '<25>{#p/sans}{#f/0}* então, eu sentei com ela, e a dei uma chance de processar tudo...',
                            "<26>{#p/sans}{#f/3}* no fim ela tomou responsabilidade e aceitou a coroa do rei asgore.",
                            "<25>{#p/sans}{#f/0}* ... de começo, já sabíamos que deveríamos proteger as almas dos humanos.",
                            '<25>{#p/sans}{#f/0}* então, não pegamos algumas tralhas do velho laboratório e criamos contêineres.',
                            "<25>{#p/sans}{#f/3}* depois disso, nós percebemos que precisávamos protegê-las."
                        ]);
                        if (!dtoriel) {
                            addB([
                                '<25>{#p/sans}{#f/0}* quando a rainha voltou, pouco depois de tudo...',
                                '<25>{#p/sans}{#f/2}* ela parecia ser a candidata ideal.',
                                '<25>{#p/sans}{#f/0}* mas então, ela viu as almas humanas em si mesma...',
                                '<25>{#p/sans}{#f/3}* e apenas fez um discurso sobre nós sermos \"parte de sua agenda.\"',
                                '<25>{#p/sans}{#f/0}* nós tentamos explicar o que aconteceu e dizer que asgore era inocente...',
                                "<25>{#p/sans}{#f/3}* mas ela não acreditou no que dissemos.",
                                '<25>{#p/sans}{#f/3}* infelizmente, ela acabou recusando o trabalho.'
                            ]);
                        }
                        if (!dpapyrus) {
                            if (!dtoriel) {
                                addB([
                                    "<25>{#p/sans}{#f/0}* felizmente, o mesmo não pôde ser dito sobre o papyrus.",
                                    '<25>{#p/sans}{#f/3}* depois da toriel rejeitar, eu liguei para ele e... bem.'
                                ]);
                            } else {
                                addB(['<25>{#p/sans}{#f/3}* com sorte, já que papyrus estava por perto, eu liguei pra ele e... bem.']);
                            }
                            if (royals === 1) {
                                addB([
                                    '<25>{#p/sans}{#f/2}* ele aceitou o trabalho bem facilmente.',
                                    '<18>{#p/papyrus}{#f/4}... POR AGORA, ENTRETANTO.',
                                    "<25>{#p/sans}{#f/0}* ah, aí está você.\n* como foi a sessão hoje?",
                                    '<18>{#p/papyrus}{#f/0}AH, ESTÁ INDO BEM!\nTODO MUNDO PARECE ESTAR SE DANDO BEM.',
                                    '<25>{#p/sans}{#f/3}* heh.\n* feliz em ouvir isso.',
                                    '<18>{#p/papyrus}{#f/0}ALIÁS, COM QUEM VOCÊ ESTÁ CONVERSANDO?'
                                ]);
                            } else {
                                addB([
                                    '<25>{#p/sans}{#f/2}* ele aceitou o trabalho bem facilmente.',
                                    "<18>{#p/papyrus}{#f/0}OLÁ, SANS! EU CONCLUI MEU TRABALHO POR HOJE.",
                                    '<18>{#p/papyrus}{#f/9}SEM INVASORES OU MAL FUNCIONAMENTO RELATADOS!',
                                    '<25>{#p/sans}{#f/0}* bom trabalho, papyrus.\n* mantenha-se assim.',
                                    "<18>{#p/papyrus}{#f/6}TEREI CERTEZA QUE SIM!!!",
                                    "<18>{#p/papyrus}{#f/0}ENTÃO, COM QUEM VOCÊ ESTÁ CONVERSANDO?"
                                ]);
                            }
                            addB([
                                "<25>{#p/sans}{#f/2}* ah, você sabe.\n* só outro humano, ninguém importante.",
                                '<18>{#p/papyrus}{#f/4}MAS TODOS OS HUMANOS ESTÃO...',
                                '<18>{#p/papyrus}{#f/7}... ESPERA!!\n* ME DA ISSO AQUI!!',
                                '<25>{#p/sans}{#f/0}* aqui está.',
                                '<18>{#p/papyrus}{#f/0}OLÁ, HUMANO!',
                                '<18>{#p/papyrus}{#f/4}JÁ FAZ MUITO TEMPO...',
                                '<18>{#p/papyrus}{#f/5}...'
                            ]);
                            if (royals === 1) {
                                k = 'dark_alphys_therapy'; // NO-TRANSLATE

                                addB([
                                    "<18>{#p/papyrus}{#f/5}TEM... UMA HISTÓRIA QUE EU GOSTARIA DE TE CONTAR.",
                                    '<15>{#f/6}VAI EXPLICAR TODO O \"POR AGORA\".',
                                    '<25>{#p/sans}{#f/3}* ... ah.\n* aí vai.',
                                    '<18>{#p/papyrus}{#f/7}SHH!!!',
                                    "<18>{#p/papyrus}{#f/5}ENTÃO... EU ESTOU FAZENDO MEU TRABALHO COMO SEMPRE.",
                                    '<18>{#p/papyrus}{#f/0}TENDO CERTEZA DE QUE AS ALMAS HUMANOS ESTÃO SEGURAS E PROTEGIDAS.',
                                    '<18>{#p/papyrus}{#f/4}ENTÃO...\nDO NADA...'
                                ]);
                                if (!ddoggo) {
                                    addB([
                                        '<18>{#p/papyrus}{#f/5}EU ESCUTEI UM GRANDE BATIDO NA PORTA DE MANUTENÇÃO.',
                                        '<18>{#p/papyrus}{#f/6}ACABOU QUE ERA UM ESTRANHO CACHORRO CEGO QUE HAVIA BATIDO NELA!',
                                        '<18>{#p/papyrus}{#f/5}EU ESTAVA CONFUSO NO COMEÇO...',
                                        '<18>{#p/papyrus}{#f/5}MAS APÓS FALAR COM ELE, TUDO FICOU CLARO.',
                                        '<18>{#p/papyrus}{#f/6}ELE ESTAVA PROCURANDO PELOS SEUS CAMARADAS DA UNIDADE CANINA.',
                                        '<18>{#p/papyrus}{#f/0}FELIZMENTE, EU ESTAVA FELIZ PARA AJUDAR.',
                                        '<18>{#p/papyrus}{#f/4}ENTÃO, APÓS O FINAL DO MEU EXPEDIENTE...',
                                        '<18>{#p/papyrus}{#f/0}NÓS SAÍMOS JUNTOS PARA PROCURAR.',
                                        '<18>{#p/papyrus}{#f/5}DESDE DE A PONTA DA AGORA ABERTA OUTLANDS...',
                                        '<18>{#p/papyrus}{#f/5}ATÉ O MAIS ALTO ARRANHA CÉU DA CIDADELA...',
                                        "<18>{#p/papyrus}{#f/6}É SEGURO DIZER QUE ENCONTRAMOS TUDO QUE TINHA PARA ENCONTRAR.",
                                        '<18>{#p/papyrus}{#f/5}... TUDO MENOS A UNIDADE CANINA NA QUAL ESTÁVAMOS PROCURANDO.',
                                        '<25>{#p/sans}{#f/0}* hmm...',
                                        '<25>{#p/sans}{#f/3}* você encontrou os outros cachorros por qualquer chance?',
                                        '<18>{#p/papyrus}{#f/5}BEM... NÃO.',
                                        '<18>{#p/papyrus}{#f/5}PELO TEMPO QUE NÓS CHEGAMOS DE NOVO NO ANEXO REAL...',
                                        '<18>{#p/papyrus}{#f/5}ALPHYS ESTAVA ACORDADA E NOS CONTOU O QUE ACONTECEU.',
                                        '<18>{#p/papyrus}{#f/3}... TODOS AQUELES GUARDAS REAIS...',
                                        '<18>{#p/papyrus}{#f/31}...',
                                        '<18>{#p/papyrus}{#f/5}DOGGO LEVOU ESSAS NOTÍCIAS PARA O CORAÇÃO.',
                                        "<18>{#p/papyrus}{#f/6}MAS ALPHYS E EU, NÓS NÃO DEIXAMOS ELE DESISTIR!",
                                        '<18>{#p/papyrus}{#f/6}ENQUANTO ELE PRECISOU, NÓS CONFORTAMOS ELE!',
                                        "<18>{#p/papyrus}{#f/5}NÓS O PROMETEMOS UMA CASA AQUI.",
                                        '<25>{#p/sans}{#f/0}* hmm... eu entendo.',
                                        "<25>{#p/sans}{#f/2}* isso explica o pelo de cachorro no travesseiro do asgore."
                                    ]);
                                } else if (!dlesserdog) {
                                    addB([
                                        '<18>{#p/papyrus}{#f/5}EU ESCUTEI UM MONTE DE BATIDOS NA PORTA DE MANUTENÇÃO.',
                                        '<18>{#p/papyrus}{#f/6}O QUE ERA BASICAMENTE UM CACHORRO DE PESCOÇO PEQUENO QUERENDO COMPANHIA!',
                                        '<18>{#p/papyrus}{#f/5}EU ESTAVA CONFUSO NO COMEÇO...',
                                        '<18>{#p/papyrus}{#f/5}MAS APÓS ACARICIAR ELE ALGUMAS VEZES, TUDO FEZ SENTIDO.',
                                        '<18>{#p/papyrus}{#f/6}SEU PESCOÇO... COMEÇOU A CRESCER E MOSTRAR UMA MENSAGEM.',
                                        '<18>{#p/papyrus}{#f/6}E A MENSAGEM ERA \"SOZINHO.\"',
                                        "<18>{#p/papyrus}{#f/8}EU ME SENTI TÃO MAL!!\nNÃO PUDE AJUDAR SE NÃO CHORAR!!",
                                        '<18>{#p/papyrus}{#f/5}DE TODA FORMA, EU PERGUNTEI A ALPHYS SOBRE ISSO MAIS TARDE E...',
                                        '<18>{#p/papyrus}{#f/5}ELA ME CONTOU O QUE ACONTECEU.',
                                        '<18>{#p/papyrus}{#f/3}... TODOS AQUELES GUARDAS REAIS...',
                                        '<18>{#p/papyrus}{#f/31}...',
                                        '<18>{#p/papyrus}{#f/5}FOI BEM DIFÍCIL SABER DESSAS NOTÍCIAS, MAS...',
                                        '<18>{#p/papyrus}{#f/6}SABENDO COMO MINOR CANIS DEVE SE SENTIR...',
                                        '<18>{#p/papyrus}{#f/5}DESDE ENTÃO, EU DEI A ELE TODA MINHA ATENÇÃO.',
                                        "<25>{#p/sans}{#f/3}* bem... se serve como consolação...",
                                        '<25>{#p/sans}{#f/0}* eu acho que você fez a coisa certa.'
                                    ]);
                                } else if (!ddogs) {
                                    addB([
                                        '<18>{#p/papyrus}{#f/5}EU ESCUTEI UM SOM DE BATIDA NA PORTA DA SALA DE MANUTENÇÃO.',
                                        '<18>{#p/papyrus}{#f/6}ACABOU QUE ERAM DOIS CACHORROS COM MACHADOS!',
                                        '<18>{#p/papyrus}{#f/5}EU ESTAVA MEIO PREOCUPADO NO COMEÇO...',
                                        '<18>{#p/papyrus}{#f/5}MAS APÓS O QUE ELES ME DISSERAM...',
                                        '<18>{#p/papyrus}{#f/5}O SENTIMENTO SE TORNOU TRISTEZA.',
                                        '<18>{#p/papyrus}{#f/3}... TODOS AQUELES GUARDAS REAIS...',
                                        '<18>{#p/papyrus}{#f/31}...',
                                        '<18>{#p/papyrus}{#f/5}DOGAMY E DOGARESSA, ELES...',
                                        '<18>{#p/papyrus}{#f/5}ELES ESTAVAM SE QUESTIONANDO SE AINDA VALIAM A PENA MANTER SEU CASAMENTO.',
                                        '<25>{#p/sans}{#f/0}* hmm...',
                                        '<25>{#p/sans}{#f/3}* ... conhecendo você, eu sei que fez eles se manterem juntos.',
                                        '<18>{#p/papyrus}{#f/4}...',
                                        '<18>{#p/papyrus}{#f/4}VOCÊ ME CONHECE MUITO BEM.',
                                        '<18>{#p/papyrus}{#f/5}DE TODA FORMA, ELES SÓ QUERIAM UM TEMPO A SOS DEPOIS DE TUDO ISSO.',
                                        "<18>{#p/papyrus}{#f/5}ENTÃO... EU OS DEIXEI FICAR NA CASA DO ASGORE.",
                                        '<25>{#p/sans}{#f/0}* na verdade, eu fiquei sabendo que eles ainda vivem lá.',
                                        '<25>{#p/sans}{#f/2}* algo me diz que aquele quarto de criança servirá muito bem logo, logo.'
                                    ]);
                                } else if (!dgreatdog) {
                                    addB([
                                        '<18>{#p/papyrus}{#f/5}EU ESCUTEI UM BARULHO DE ARRANHO NA PORTA DA SALA DE MANUTENÇÃO.',
                                        "<18>{#p/papyrus}{#f/6}ACABOU QUE ERA APENAS UM GRANDE CACHORRO LATINDO ALTO.",
                                        '<18>{#p/papyrus}{#f/5}ENTÃO O CACHORRO TIROU SUA ARMADURA E SE TORNOU PEQUENO.',
                                        '<18>{#p/papyrus}{#f/6}E ENTÃO ELE VEIO ATÉ MIM, QUERENDO BRINCAR!',
                                        '<18>{#p/papyrus}{#f/6}ELE PARECIA... MAIS DESESPERADO DO QUE NUNCA.',
                                        "<18>{#p/papyrus}{#f/6}NUNCA VI TANTO ELE QUERER BRINCAR DESSA FORMA!",
                                        '<18>{#p/papyrus}{#f/4}EU SEI QUE O TEMPO DOS CACHORROS É DIFERENTE, MAS...',
                                        '<18>{#p/papyrus}{#f/6}AINDA ASSIM, EU ME PERGUNTEI SE ALGO ESTAVA ERRADO!',
                                        '<18>{#p/papyrus}{#f/5}ENTÃO EU PERGUNTEI PARA ALPHYS MAIS TARDE SOBRE E...',
                                        '<18>{#p/papyrus}{#f/5}ELA ME CONTOU O QUE ACONTECEU.',
                                        '<18>{#p/papyrus}{#f/3}... TODOS AQUELES GUARDAS REAIS...',
                                        '<18>{#p/papyrus}{#f/31}...',
                                        '<18>{#p/papyrus}{#f/5}FOI BEM DIFÍCIL SABER DESSAS NOTÍCIAS, MAS...',
                                        '<18>{#p/papyrus}{#f/6}SABENDO COMO O MAJOR CANIS DEVE SE SENTIR...',
                                        '<18>{#p/papyrus}{#f/5}DESDE ENTÃO EU BRINQUEI COM ELE O MÁXIMO QUE PUDE.',
                                        "<25>{#p/sans}{#f/3}* bem... se serve como consolação...",
                                        '<25>{#p/sans}{#f/0}* eu acho que você fez a coisa certa.'
                                    ]);
                                } else if (!ddoge) {
                                    addB([
                                        '<18>{#p/papyrus}{#f/5}EU RECEBI UMA LIGAÇÃO DE UM ALTO MEMBRO DA GUARDA REAL.',
                                        '<18>{#p/papyrus}{#f/6}E UM ANGUSTIANTE.',
                                        "<18>{#p/papyrus}{#f/5}UMA AMIGA DA UNDYNE, DIZENDO QUE QUERIA ME VER...",
                                        '<18>{#p/papyrus}{#f/6}PARA FALAR SOBRE UM ASSUNTO DE \"GRANDE IMPORTÂNCIA.\"',
                                        '<18>{#p/papyrus}{#f/6}EU ESTAVA MEIO NERVOSO QUANDO CHEGUEI LÁ...',
                                        '<18>{#p/papyrus}{#f/5}MAS ELA REALMENTE SÓ QUERIA CONVERSAR.',
                                        '<18>{#p/papyrus}{#f/4}ELA ESTAVA SENDO BEM ENIGMÁTICA EM RELAÇÃO A ISSO...',
                                        '<18>{#p/papyrus}{#f/5}BEM, COM UM TEMPO EU QUEBREI O CÓDIGO.',
                                        '<18>{#p/papyrus}{#f/3}... TODOS AQUELES GUARDAS REAIS...',
                                        '<18>{#p/papyrus}{#f/31}...',
                                        '<18>{#p/papyrus}{#f/5}DOGE QUESTIONOU O PROPÓSITO DA SUA VIDA.',
                                        '<18>{#p/papyrus}{#f/6}O PROPÓSITO DE PROTEGER A VIDA DOS MONSTROS.',
                                        '<18>{#p/papyrus}{#f/5}SE A GUARDA REAL PÔDE SER DESTRUÍDA POR UM HUMANO...',
                                        '<18>{#p/papyrus}{#f/6}O QUE ELA SOZINHA SERIA CAPAZ DE FAZER?',
                                        '<18>{#p/papyrus}{#f/5}...\nEU A LEVEI PARA A CIDADELA.',
                                        '<18>{#p/papyrus}{#f/5}EU A MOSTREI AS ALMAS HUMANAS.',
                                        '<18>{#p/papyrus}{#f/6}E ENTÃO EU VIREI PARA ELA E DISSE...',
                                        '<18>{#p/papyrus}{#f/6}\"SÓ MAIS UMA.\"',
                                        '<18>{#p/papyrus}{#f/5}ENTÃO, ELA OLHOU PARA MIM, FECHOU OS OLHOS...',
                                        '<18>{#p/papyrus}{#f/6}E RESPONDEU \"EU ENTENDO.\"',
                                        '<25>{#p/sans}{#f/0}* caramba.\n* parece intenso.',
                                        "<25>{#p/sans}{#f/3}* pelo que você fez, aquilo provavelmente a motivou."
                                    ]);
                                } else if (!droyalguards) {
                                    addB([
                                        '<18>{#p/papyrus}{#f/5}EU RECEBI UMA LIGAÇÃO DE DOIS MEMBROS DA GUARDA NUMERADOS.',
                                        '<18>{#p/papyrus}{#f/6}E UM ANGUSTIANTE.',
                                        '<18>{#p/papyrus}{#f/5}ELES QUERIAM DIVIDIR SORVETE COMIGO...',
                                        '<18>{#p/papyrus}{#f/6}ENTÃO ME PEDIRAM PARA ENCONTRÁ-LOS E CONVERSAR SOBRE ALGO.',
                                        '<25>{#p/sans}{#f/0}* se eu tiver que adivinhar...',
                                        "<25>{#p/sans}{#f/3}* eu diria que a conversa particular não era sobre sorvete.",
                                        '<18>{#p/papyrus}{#f/6}INFELIZMENTE NÃO.',
                                        '<18>{#p/papyrus}{#f/5}NA VERDADE, ELES... TINHAM PÉSSIMAS NOTÍCIAS.',
                                        '<18>{#p/papyrus}{#f/3}... TODOS AQUELES GUARDAS REAIS...',
                                        '<18>{#p/papyrus}{#f/31}...',
                                        '<18>{#p/papyrus}{#f/5}DEPOIS DE SEREM PROMOVIDOS, ELES...',
                                        '<18>{#p/papyrus}{#f/6}SENTIRAM QUE TODO AQUELE TREINO FOI PARA NADA.',
                                        '<18>{#p/papyrus}{#f/6}MAS...!\nEU DISSE QUE PODERIA ENCONTRAR PARA ELES UM NOVO TRABALHO!!',
                                        '<18>{#p/papyrus}{#f/5}ENTÃO, VIEMOS COM ALGUMAS IDEIAS.',
                                        '<18>{#p/papyrus}{#f/4}MAIOR PARTE DELAS FORAM REJEITADAS, MAS ESTRANHAMENTE...',
                                        '<18>{#p/papyrus}{#f/4}ELES AMARAM A IDEIA DE SE JUNTAR AO TIME DE NATAÇÃO.',
                                        "<25>{#p/sans}{#f/0}* então você está dizendo que o 01 e 02 se tornaram nadadores profissionais?",
                                        "<25>{#p/sans}{#f/3}* bem, com tanto que eles estejam felizes com o que estão fazendo.",
                                        "<18>{#p/papyrus}{#f/4}OH, NÃO SE PREOCUPE.\nNÃO APENAS ELES ESTÃO FELIZES...",
                                        "<18>{#p/papyrus}{#f/0}ELES TAMBÉM ESTÃO INCRIVELMENTE POPULARES!",
                                        "<18>{#p/papyrus}{#f/5}...\nMAS, SABENDO O MOTIVO DE ESTAREM ALI...",
                                        '<18>{#p/papyrus}{#f/5}FAZ COM QUE EU ME SINTA TRISTE.'
                                    ]);
                                } else if (!dmadjick) {
                                    addB([
                                        '<18>{#p/papyrus}{#f/5}UM ESTRANHO MAGO APARECEU NA SALA DE MANUTENÇÃO.',
                                        '<18>{#p/papyrus}{#f/6}E ME PERGUNTOU SOBRE O SENTIDO DA VIDA.',
                                        '<18>{#p/papyrus}{#f/4}NÓS... ACABAMOS ESCALANDO A CONVERSA UM POUCO.',
                                        '<18>{#p/papyrus}{#f/4}PARA DIZER O MÍNIMO.',
                                        '<25>{#p/sans}{#f/3}* posso imaginar.',
                                        '<25>{#p/sans}{#f/0}* então você aprendeu algo após tudo isso?',
                                        '<18>{#p/papyrus}{#f/5}BEM, SIM.\nEU APRENDI SOBRE MUITAS COISAS.',
                                        '<18>{#p/papyrus}{#f/6}OS MEDOS, AS ANSIEDADES...',
                                        '<18>{#p/papyrus}{#f/5}E ELE TEVE...  UMA PERDA MUITO MAIOR DO QUE EU ESPERAVA.',
                                        '<18>{#p/papyrus}{#f/3}... TODOS AQUELES GUARDAS REAIS...',
                                        '<18>{#p/papyrus}{#f/31}...',
                                        '<18>{#p/papyrus}{#f/5}PERDER SUA MENTORA, TERRESTRIA, DOEU MUITO.',
                                        '<18>{#p/papyrus}{#f/6}COZMO TRABALHOU A VIDA TODA PARA IMPRESSIONAR ELA...',
                                        '<18>{#p/papyrus}{#f/5}E MESMO ASSIM NUNCA SENTIU TER FEITO O SUFICIENTE PARA DEIXA ORGULHOSA.',
                                        '<18>{#p/papyrus}{#f/6}BEM, EU DISCORDO!',
                                        "<18>{#p/papyrus}{#f/5}EU SEI QUE ELA FICARIA ORGULHOSA DE VÊ-LO VIVO.",
                                        '<18>{#p/papyrus}{#f/4}E DESDE QUE ELE CONHECIA ELA MELHOR DO QUE NINGUÉM...',
                                        '<18>{#p/papyrus}{#f/5}ELE ERA A PESSOA CERTA PARA CARREGAR O LEGADO DELA.',
                                        '<18>{#p/papyrus}{#f/0}A CONVERSA QUE SEGUIU FOI BEM ENCANTADORA!',
                                        "<18>{#p/papyrus}{#f/6}NÓS CONVERSAMOS TANTO QUE EU FIQUEI SURPRESO DE CONSEGUIR ACOMPANHAR!",
                                        '<18>{#p/papyrus}{#f/0}UMA VEZ QUE TERMINAMOS, AMBOS ESTÁVAMOS SATISFEITOS.',
                                        '<18>{#p/papyrus}{#f/5}EMBORA... EU SOUBESSE QUE AINDA HAVIA ALGO ERRADO.'
                                    ]);
                                } else {
                                    addB([
                                        '<18>{#p/papyrus}{#f/5}UMA BATIDA GENTIL NA PORTA DA SALA DE MANUTENÇÃO.',
                                        '<18>{#p/papyrus}{#f/4}EU TENTEI CONVIDAR SEJA LÁ QUEM ESTIVE BATENDO PARA ENTRAR, MAS...',
                                        '<18>{#p/papyrus}{#f/5}MAS ELA ERA GRANDE DEMAIS PARA CABER DENTRO.',
                                        '<18>{#p/papyrus}{#f/5}ENTÃO, PARA ACOMODAR A GRANDE CAVALEIRA DE ARMADURA...',
                                        '<18>{#p/papyrus}{#f/6}EU TIREI TODOS OS EQUIPAMENTOS DA SALA DE MANUTENÇÃO PARA FORA.',
                                        '<18>{#p/papyrus}{#f/4}DEPOIS DISSO... EU E ELA TIVEMOS UMA CONVERSA.',
                                        '<18>{#p/papyrus}{#f/5}UMA CONVERSA...',
                                        '<18>{#p/papyrus}{#f/6}... SOBRE A MORTE.',
                                        '<18>{#p/papyrus}{#f/6}NÃO É MEU TÓPICO FAVORITO, MAS...',
                                        '<18>{#p/papyrus}{#f/5}EU SEI QUE ELA PRECISAVA CONVERSAR SOBRE AQUILO.',
                                        '<18>{#p/papyrus}{#f/6}COMO... ALGUÉM QUE VIVE TANTO QUANDO ELA...',
                                        '<18>{#p/papyrus}{#f/6}ACABA POR ASSISTIR TODOS AO SEU REDOR MORREREM.',
                                        '<18>{#p/papyrus}{#f/5}E ENTÃO...',
                                        '<18>{#p/papyrus}{#f/3}... TODOS AQUELES GUARDAS REAIS...',
                                        '<18>{#p/papyrus}{#f/31}...',
                                        '<18>{#p/papyrus}{#f/5}EU TENTEI FAZER ELA SE SENTIR MELHOR, MAS...',
                                        "<18>{#p/papyrus}{#f/6}NÃO IMPORTAVA O QUE EU DIZIA, TERRESTRIA NÃO SE ANIMAVA!",
                                        '<18>{#p/papyrus}{#f/5}ENTÃO, AO INVÉS...',
                                        '<18>{#p/papyrus}{#f/5}EU DEI A ELA UM GRANDE E DEMORADO ABRAÇO.',
                                        '<18>{#p/papyrus}{#f/6}NOS ABRAÇAMOS POR HORAS...',
                                        "<18>{#p/papyrus}{#f/6}EU ESTOU SURPRESO QUE SEGUREI POR TANTO TEMPO!!",
                                        "<18>{#p/papyrus}{#f/5}DEPOIS DISSO ELA SAIU E DISSE QUE FICARIA BEM.",
                                        "<18>{#p/papyrus}{#f/4}PARTE DE MIM NÃO ACREDITOU NELA, MAS...",
                                        "<18>{#p/papyrus}{#f/5}É MELHOR QUE EU RESPEITE OS DESEJOS DELA.",
                                        '<25>{#p/sans}{#f/3}* bem... ei.',
                                        "<25>{#p/sans}{#f/0}* se ela precisar de você de novo, ela vai te falar.",
                                        '<18>{#p/papyrus}{#f/5}EU ESPERO QUE SIM.'
                                    ]);
                                }
                                addB([
                                    '<18>{#p/papyrus}{#f/5}...',
                                    "<18>{#p/papyrus}{#f/5}DESCOBRIR O QUE VOCÊ FEZ... NÃO FOI FÁCIL PARA MIM.",
                                    "<18>{#p/papyrus}{#f/6}MAS, EU NÃO ACHO QUE POSSO TE CULPAR.",
                                    "<18>{#p/papyrus}{#f/6}O TRABALHO DA GUARDA REAL ERA CAPTURAR HUMANOS, E...",
                                    "<18>{#p/papyrus}{#f/5}EU ESTOU APENAS TENTANDO ENTENDER O QUE ISSO SIGNIFICOU.",
                                    '<18>{#p/papyrus}{#f/5}DEVE TER SIDO DIFÍCIL... SABENDO O QUE VOCÊ TINHA QUE FAZER.',
                                    '<18>{#p/papyrus}{#f/3}SABENDO QUE VOCÊ... TINHA QUE NOS DESTRUIR.',
                                    '<18>{#p/papyrus}{#f/31}...',
                                    "<18>{#p/papyrus}{#f/5}TALVEZ TENHA SIDO PARA O MELHOR QUE EU NUNCA TENHA ME TORNADO UM GUARDA.",
                                    '<18>{#p/papyrus}{#f/6}TALVEZ... UNDYNE SÓ ESTIVESSE TENTANDO ME PROTEGER.',
                                    "<18>{#p/papyrus}{#f/5}... EU NEM SEI COMO ME SENTIR SOBRE ISSO.",
                                    "<25>{#p/sans}{#f/0}* ei, você não vai nos contar o que aconteceu depois?",
                                    '<18>{#p/papyrus}{#f/6}AH, CERTO!!!',
                                    '<18>{#p/papyrus}{#f/0}ENTÃO TODA ESSA PROVAÇÃO ME DEIXOU CANSADO.',
                                    "<18>{#p/papyrus}{#f/4}AGORA, NÃO ME JULGUE, MAS...",
                                    '<18>{#p/papyrus}{#f/4}EU TALVEZ TENHA FECHADO MEUS OLHOS POIS MAIS TEMPO DO QUE ANTECIPADO.'
                                ]);
                                if (!ddoggo || !dlesserdog || !ddogs || !dgreatdog || !dknightknight) {
                                    addB([
                                        '<18>{#p/papyrus}{#f/6}NA VERDADE, EU SÓ OS ABRI APÓS MAIS UMA BATIDA!',
                                        '<18>{#p/papyrus}{#f/0} DESSA VEZ NA PORTA DA FRENTE DE MINHA CASA.'
                                    ]);
                                } else if (!ddoge || !droyalguards) {
                                    addB([
                                        '<18>{#p/papyrus}{#f/6}NA VERDADE, EU SÓ OS ABRI APÓS OUTRA LIGAÇÃO!',
                                        '<18>{#p/papyrus}{#f/0}DESSA VEZ, ENQUANTO EU ESTAVA EM CASA.'
                                    ]);
                                } else {
                                    addB([
                                        '<19>{#p/papyrus}{#f/6}NA VERDADE, EU SÓ OS ABRI APÓS OUTRA PESSOA APARECER!',
                                        '<18>{#p/papyrus}{#f/0}DESSA VEZ, NA MINHA CASA.'
                                    ]);
                                }
                                addB([
                                    '<18>{#p/papyrus}{#f/5}ERA MAIS ALGUÉM PEDINDO AJUDA...',
                                    '<18>{#p/papyrus}{#f/0}FELIZMENTE, EU TINHA TODA A ENERGIA QUE PRECISAVA!',
                                    '<18>{#p/papyrus}{#f/0}E ENTÃO, EU OS AJUDEI TAMBÉM!',
                                    '<18>{#p/papyrus}{#f/4}NO PRÓXIMO DIA, MAIS ALGUÉM VEIO PROCURANDO POR MIM.',
                                    '<18>{#p/papyrus}{#f/5}NO DIA APÓS ISSO, DUAS PESSOAS ME QUISERAM.',
                                    '<18>{#p/papyrus}{#f/6}ENTÃO TRÊS!\nENTÃO CINCO!\nENTÃO SETE!',
                                    '<25>{#p/sans}{#f/2}* então onze?',
                                    '<18>{#p/papyrus}{#f/4}NÃO, INFELIZMENTE PAROU POR AÍ.',
                                    '<18>{#p/papyrus}{#f/6}MESMO COM MEU ESFORÇO PARA AJUDAR TODOS ELES!!',
                                    '<18>{#p/papyrus}{#f/5}ENQUANTO MINHA POPULARIDADE CRESCEU, EU ENTENDI...',
                                    "<18>{#p/papyrus}{#f/6}QUE EU TINHA QUE LEVAR AS COISAS PARA O PRÓXIMO NÍVEL!",
                                    '<18>{#p/papyrus}{#f/9}ENTÃO EU FIZ SLOGANS!\nCOMPREI CONSTRUÇÕES!\nCONTRATEI TRABALHADORES!',
                                    '<18>{#p/papyrus}{#f/4}EVENTUALMENTE, LARGUEI MEU EMPREGO CUIDANDO DOS HUMANOS.',
                                    '<18>{#p/papyrus}{#f/6}A GUARDA REAL QUE EU AJUDEI ORIGINALMENTE, AGORA FAZ ISSO!!',
                                    '<18>{#p/papyrus}{#f/0}E EU FOQUEI MINHA MENTE EM TRABALHAR PELA COMPANHIA.',
                                    '<18>{#p/papyrus}{#f/0}CHAMADA \"TERAPYRUS INDÚSTRIAS.\"',
                                    '<18>{#p/papyrus}{#f/9}\"LIDANDO COM SUAS EMOÇÕES, ENTÃO -VOCÊ- NÃO PRECISA!\"',
                                    '<25>{#p/sans}{#f/0}* amei a linha de marketing.',
                                    '<18>{#p/papyrus}{#f/0}E O SANS É MEU RECEPCIONISTA.',
                                    "<18>{#p/papyrus}{#f/9}ELE É ÓTIMO EM GARANTIR QUE EU TENHA TEMPO PARA TODOS!",
                                    '<18>{#p/papyrus}{#f/5}PELA PRIMEIRA VEZ, MEU IRMÃO É BOM EM ALGUMA COISA...',
                                    "<18>{#p/papyrus}{#f/0}EU NUNCA ESTIVE TÃO ORGULHOSO DELE!!",
                                    '<25>{#p/sans}{#f/0}* é, essa companhia realmente trouxe o melhor de nós.',
                                    '<18>{#p/papyrus}{#f/9}É, PODE SER O NOSSO VERDADEIRO PROPÓSITO!!!',
                                    '<25>{#p/sans}{#f/2}* heheh, propósito.',
                                    "<18>{#p/papyrus}{#f/6}O QUE!?\nO QUE É TÃO ENGRAÇADO?",
                                    '<25>{#p/sans}{#f/3}* uh, nada.',
                                    "<18>{#p/papyrus}{#f/4}VOCÊ NÃO MUDOU NADA.",
                                    '<18>{#p/papyrus}{#f/5}...\n* DE TODA FORMA...',
                                    "<18>{#p/papyrus}{#f/6}MESMO COM TUDO QUE VOCÊ FEZ, EU...",
                                    '<18>{#p/papyrus}{#f/5}EU ESPERO QUE VOCÊ ENCONTRE SEU PROPÓSITO, UM DIA.',
                                    '<18>{#p/papyrus}{#f/4}E SE VOCÊ PRECISAR CONVERSAR COM ALGUÉM...',
                                    '<18>{#p/papyrus}{#f/6}VOCÊ SABE EXATAMENTE PARA QUEM...',
                                    '<18>{#p/papyrus}{#f/4}... AH, EU ENTENDI AGORA.\nBEM ENGRAÇADO, SANS.',
                                    '<25>{#p/sans}{#f/2}* agradecido por você ter entendido.',
                                    '<18>{#p/papyrus}{#f/7}BEM É ISSO, VOCÊ SABE QUEM LIGAR!!!'
                                ]);
                            } else {
                                k = 'dark_alphys_virtual'; // NO-TRANSLATE

                                addB([
                                    "<18>{#p/papyrus}{#f/5}EU CONTINUO PENSANDO SOBRE... AQUELES QUE DESAPARECERAM.",
                                    "<18>{#p/papyrus}{#f/6}ASGORE, COM QUEM EU COMPARTILHAVA HISTÓRIAS AS VEZES...",
                                    "<18>{#p/papyrus}{#f/6}UNDYNE, QUE ME DAVA UM TREINO DE GUERRA...",
                                    "<18>{#p/papyrus}{#f/5}A GUARDA REAL, QUE ME CUMPRIMENTAVA RUMO AO TRABALHO.",
                                    '<18>{#p/papyrus}{#f/6}EU COSTUMAVA PASSAR TANTO TEMPO COM ELES, MAS AGORA...',
                                    "<18>{#p/papyrus}{#f/5}ELES SE FORAM.",
                                    "<18>{#p/papyrus}{#f/5}E EU NÃO SEI SE ELES VÃO VOLTAR.",
                                    "<18>{#p/papyrus}{#f/7}... É MUITO FRUSTRANTE!!!",
                                    "<18>{#p/papyrus}{#f/4}ELES NUNCA OUVIRAM FALAR DE SAUDADES?",
                                    '<18>{#p/papyrus}{#f/6}OU CALENDÁRIO?',
                                    "<18>{#p/papyrus}{#f/5}QUALQUER COISA PARA ME DIZER QUANDO E SE VÃO VOLTAR!",
                                    "<25>{#p/sans}{#f/3}* ei, eu sinto falta deles também.",
                                    "<25>{#p/sans}{#f/0}* mas você não pode passar o dia inteiro pensando neles.",
                                    '<25>{#p/sans}{#f/2}* talvez você possa falar sobre alguma outra coisa?',
                                    '<18>{#p/papyrus}{#f/4}HMM...\nALGUMA OUTRA COISA...',
                                    '<18>{#p/papyrus}{#f/0}OH, EU SEI!\nO MUNDO NO ARQUIVO!',
                                    '<25>{#p/sans}{#f/2}* É CLARO.\n* VOCÊ E A ALPHYS PASSAM MUITO TEMPO LÁ.',
                                    '<18>{#p/papyrus}{#f/9}E POR UMA BOA RAZÃO!',
                                    '<18>{#p/papyrus}{#f/0}OKAY, ENTÃO, DEIXE-ME EXPLICAR.',
                                    '<18>{#p/papyrus}{#f/4}COM NADA PARA FAZER ALÉM DE GUARDAR AS ALMAS HUMANAS...',
                                    '<18>{#p/papyrus}{#f/0}EU COMECEI A PASSAR MUITO TEMPO ALÍ.',
                                    '<18>{#p/papyrus}{#f/6}MAS O QUE EU FARIA COM AQUILO!?',
                                    '<18>{#p/papyrus}{#f/0}UM DIA, EM UM ARMÁRIO DE ARMAZENAMENTO, ENCONTREI... UMA COISA.',
                                    '<18>{#p/papyrus}{#f/5}EU PERGUNTEI PARA ALPHYS O QUE ERA AQUILO E...',
                                    '<18>{#p/papyrus}{#f/6}MEU, ELA TINHA MUITO PARA FALAR!!',
                                    '<18>{#p/papyrus}{#f/0} APARENTEMENTE, AQUILO FOI USADO PARA SIMULAR MUNDOS VIRTUAIS.',
                                    '<18>{#p/papyrus}{#f/5}EU PERGUNTEI PRA ELA SE PODIAMOS TENTAR E...',
                                    '<18>{#p/papyrus}{#f/4}ESTANDO TÃO ENTEDIADA QUANTO EU, ELA DISSE SIM.',
                                    "<18>{#p/papyrus}{#f/0}ENTRETANTO, O ARQUIVO NÃO TINHA UM MUNDO CARREGADO.",
                                    '<18>{#p/papyrus}{#f/0}ENTÃO ELA FEZ O DOWNLOAD DE UM ANIME SCI-FI POPULAR...',
                                    '<18>{#p/papyrus}{#f/0}E DEIXOU O SISTEMA \"EXTRAPOLAR\" O MUNDO A VONTADE.',
                                    '<18>{#p/papyrus}{#f/5}ENTÃO ELA ME FALOU PRA COLOCAR AQUELE FONE ESQUISITO...',
                                    '<18>{#p/papyrus}{#f/6}EU ESTAVA NERVOSO, MAS O FIZ EM NOME DA CIÊNCIA!!',
                                    '<18>{#p/papyrus}{#f/4}A PRÓXIMA COISA QUE ACONTECEU, EU FUI TRANSPORTADO...',
                                    "<18>{#p/papyrus}{#f/9}PARA UM MUNDO ALÉM DE QUALQUER COISA QUE EH JÁ TENHA VISTO!!!",
                                    '<18>{#p/papyrus}{#f/5}EU EXPLOREI ESTA NOVA TERRA POR HORAS...',
                                    '<18>{#p/papyrus}{#f/5}INDO DE LUGAR PARA LUGAR, CONHECENDO PESSOAS...',
                                    "<18>{#p/papyrus}{#f/0}CLARO, EU SEI QUE ELES NÃO SÃO REAIS.",
                                    '<18>{#p/papyrus}{#f/6}MAS QUANDO UM DELES FOI FERIDO, EU ME SENTI TRISTE?',
                                    '<18>{#p/papyrus}{#f/5}ENTÃO, EU FIZ UMA MISSÃO DE SALVAR TODOS QUE EU CONSEGUISSE.',
                                    '<18>{#p/papyrus}{#f/0} EVENTUALMENTE, ALPHYS JUNTOU-SE A MIM COMO COADJUVANTE!',
                                    "<18>{#p/papyrus}{#f/0}ESTAMOS NOS AVENTURANDO DESDE ENTÃO.",
                                    "<25>{#p/sans}{#f/0}* ela está lá agora, não está?",
                                    '<25>{#p/sans}{#f/2}* talvez você deva ir dar uma olhada nela.',
                                    '<18>{#p/papyrus}{#f/9}É, ACHO QUE VOU FAZER ISSO!',
                                    '<18>{#p/papyrus}{#f/0} DESCULPE-ME HUMANO. A AVENTURA ESPERA ESTE ESQUELETO!',
                                    '<25>{#p/sans}{#f/3}* ...',
                                    "<25>{#p/sans}{#f/3}* eu só estou feliz que ele tenha uma distração para tudo que está acontecendo.",
                                    "<25>{#p/sans}{#f/0}* as pessoas não tem estado muito bem esses tempos.",
                                    '<25>{#p/sans}{#f/0}* perder a guarda real, todos esses problemas com a energia...',
                                    '<25>{#p/sans}{#f/3}* muitas pessoas nem estão tendo no que se inspirar.',
                                    "<25>{#p/sans}{#f/0}* E, mesmo se eles tiverem, é difícil se encorajar por muito tempo...",
                                    '<25>{#p/sans}{#f/3}* ou admitir pra qualquer um o miserável eles estão.',
                                    '<25>{#p/sans}{#f/3}* ...'
                                ]);
                                if (hkills > 19) {
                                    addB([
                                        "<25>{#p/sans}{#f/3}* não é surpresa alguma que as pessoas não são muito fãs da humanidade hoje em dia.",
                                        '<25>{#p/sans}{#f/0}* você pode até ter poupado meu irmão, mas...',
                                        '<25>{#p/sans}{#f/3}* você matou gente demais, muitos deles importantes.'
                                    ]);
                                } else {
                                    addB([
                                        "<25>{#p/sans}{#f/3}* eu não estou dizendo que você é a pior pessoa do universo.",
                                        "<25>{#p/sans}{#f/0}* você poupou meu irmão e não matou tantas pessoas.",
                                        '<25>{#p/sans}{#f/3}* mas as pessoas que você matou eram bem importantes.'
                                    ]);
                                }
                                addB([
                                    '<25>{#p/sans}{#f/0}* ... por mais que discordo dos seus caminhos...',
                                    '<25>{#p/sans}{#f/0}* a guarda real dava aos cidadãos a sensação de segurança e estabilidade.',
                                    "<25>{#p/sans}{#f/3}* mas isso agora se foi.",
                                    "<25>{#p/sans}{#f/3}* pois é, nem o mettaton está mais por aí.",
                                    '<25>{#p/sans}{#f/0}* sem mais show de tv, sem mais diversões por Aerialis...',
                                    '<25>{#p/sans}{#f/0}* ao perder alguém como ele, também perdemos parte do brilho do outpost.'
                                ]);
                                if (hkills > 19) {
                                    addB([
                                        "<25>{#p/sans}{#f/3}* honestamente, a verdade é que você não é uma boa pessoa.",
                                        '<25>{#p/sans}{#f/3}* simples e bem explicado.',
                                        '<25>{#p/sans}{#f/0}* ... de toda forma.\n* eu deveria desligar agora.',
                                        '<25>{#p/sans}{#f/3}* foi mal, mano.',
                                        '<25>{#p/sans}{#f/3}* ...'
                                    ]);
                                } else {
                                    addB([
                                        "<25>{#p/sans}{#f/3}* honestamente, eu não sei muito bem o que dizer sobre você.",
                                        "<25>{#p/sans}{#f/3}* eu não posso te dizer que você é de todo mau, mas também não gosto de você.",
                                        '<25>{#p/sans}{#f/0}* ... de toda forma.\n* eu deveria desligar agora.',
                                        '<25>{#p/sans}{#f/3}* foi mal, mano.',
                                        '<25>{#p/sans}{#f/3}* boa jornada aí fora.'
                                    ]);
                                }
                                addB(['<32>{#s/equip}{#p/event}* Click...']);
                            }
                        } else {
                            if (!dtoriel) {
                                addB(['<25>{#p/sans}{#f/0}*, o que significava que estava de volta à prancheta.']);
                            } else {
                                addB(["<25>{#p/sans}{#f/0}* eu não conseguia pensar em mais ninguém, então..."]);
                            }
                            addB(['<25>{#p/sans}{#f/0}* ... começamos a perguntar pessoas em todos os lados, a procura de alguém de confiança.']);
                            if (!ddoggo) {
                                addB([
                                    '<25>{#p/sans}{#f/3}* bem rapidamente, encontramos o doggo...',
                                    '<25>{#p/sans}{#f/0}* um membro da unidade canina que sobreviveu a queda da guarda real.',
                                    '<25>{#p/sans}{#f/2}* felizmente, ele estava bem feliz em tomar o trabalho.',
                                    '<25>{#p/alphys}{#f/27}* Huh?\n* Com quem você está falando sobre o Doggo...?'
                                ]);
                            } else if (!dlesserdog) {
                                addB([
                                    '<25>{#p/sans}{#f/3}* bem rapidamente, encontramos o canis minor...',
                                    '<25>{#p/sans}{#f/0}* um membro da unidade canina que sobreviveu a queda da guarda real.',
                                    '<25>{#p/sans}{#f/2}* felizmente, ele estava mais do que feliz em tomar o trabalho.',
                                    '<25>{#p/alphys}{#f/27}* Huh?\n* Com quem você está falando sobre o Canis Minor...?'
                                ]);
                            } else if (!ddogs) {
                                addB([
                                    '<25>{#p/sans}{#f/3}* bem rapidamente, encontramos dogamy e dogaressa...',
                                    '<25>{#p/sans}{#f/0}* dois membros da unidade canina que sobreviveram a queda da guarda real.',
                                    '<25>{#p/sans}{#f/2}* com sorte, eles estavam felizes em tomar o trabalho.',
                                    '<25>{#p/alphys}{#f/27}* Huh?\n* Com quem você está falando sobre o Dogamy e a Dogaressa?'
                                ]);
                            } else if (!dgreatdog) {
                                addB([
                                    '<25>{#p/sans}{#f/3}* rapidamente, encontramos o major canis...',
                                    '<25>{#p/sans}{#f/0}* um membro da unidade canina que sobreviveu a queda da guarda real.',
                                    '<25>{#p/sans}{#f/2}* felizmente, ele estava mais do que feliz em tomar o trabalho.',
                                    '<25>{#p/alphys}{#f/27}* Huh?\n* Com quem você está falando sobre o major canis?'
                                ]);
                            } else if (!ddoge) {
                                addB([
                                    '<25>{#p/sans}{#f/3}* rapidamente, encontramos Doge...',
                                    '<25>{#p/sans}{#f/0}* um membro do esquadrão de elite que sobreviveu a queda da guarda real.',
                                    '<25>{#p/sans}{#f/3}* ela reuniu seus pertences e aceitou o trabalho em pouco tempo.',
                                    '<25>{#p/alphys}{#f/27}* Huh?\n* Com quem você está falando sobre a Doge?'
                                ]);
                            } else if (!droyalguards) {
                                addB([
                                    '<25>{#p/sans}{#f/3}* rapidamente, acabamos encontrando 01 e 02...',
                                    '<25>{#p/sans}{#f/0}* dois oficiais de patrulha que sobreviveram a queda da guarda real.',
                                    '<25>{#p/sans}{#f/3}* eles pegaram suas armaduras e aceitaram o trabalho.',
                                    '<25>{#p/alphys}{#f/27}* Huh?\n* Com quem você está falando sobre o 01 e o 02?'
                                ]);
                            } else if (!dmadjick) {
                                addB([
                                    '<25>{#p/sans}{#f/3}* rapidamente, encontramos o cozmo...',
                                    '<25>{#p/sans}{#f/0}* um membro do esquadrão de elite que sobreviveu a queda da guarda real.',
                                    '<25>{#p/sans}{#f/3}* ele parecia confuso no início, mas se adaptou ao trabalho com facilidade.',
                                    '<25>{#p/alphys}{#f/27}* Huh?\n* Com quem você está falando sobre o Cozmo?'
                                ]);
                            } else {
                                addB([
                                    '<25>{#p/sans}{#f/3}* rapidamente, nós encontramos terrestria...',
                                    '<25>{#p/sans}{#f/0}* um membro do esquadrão de elite que sobreviveu a queda da guarda real.',
                                    '<25>{#p/sans}{#f/3}* é claro, ela aceitou o trabalho com reverência e dignidade.',
                                    '<25>{#p/alphys}{#f/27}* Huh?\n* Com quem você está falando sobre a terrestria?'
                                ]);
                            }
                            addB([
                                "<25>{#p/sans}{#f/0}* ah, oi alphys.\n* estou deixando uma mensagem para o humano.",
                                '<25>{#p/alphys}{#f/17}* Oh, certo.\n* Você disse mesmo que iria fazer isso.'
                            ]);
                            if (!ddoggo) {
                                addB([
                                    "<25>{#p/alphys}{#f/6}* É, Doggo pode ficar nervoso algumas vezes, mas eu já o ajudei antes.",
                                    '<25>{#p/alphys}{#f/8}* Só de me ter por perto já o faz feliz o suficiente para trabalhar.'
                                ]);
                            } else if (!dlesserdog) {
                                addB([
                                    '<25>{#p/alphys}{#f/6}* É, aquele pescoço pode dar trabalho de vez em quando, mas faz um ótimo trabalho.',
                                    '<25>{#p/alphys}{#f/8}* Tudo que ele pedia em retorno era ser acariciado várias e várias vezes.'
                                ]);
                            } else if (!ddogs) {
                                addB([
                                    "<25>{#p/alphys}{#f/6}* É, aqueles cachorros se saem bem com tanto que estejam unidos.",
                                    '<25>{#p/alphys}{#f/8}* Tudo que eles pediram em retorno era... bem, um \"longo tempo\" a sós.'
                                ]);
                            } else if (!dgreatdog) {
                                addB([
                                    '<25>{#p/alphys}{#f/6}* É, não apenas ele faz seu trabalho, mas faz com felicidade.',
                                    '<25>{#p/alphys}{#f/8}* Tudo o que ele pede em troca é uma grande quantidade de tapinhas na cabeça.'
                                ]);
                            } else if (!ddoge) {
                                addB([
                                    "<25>{#p/alphys}{#f/6}* É, Doge pode ser fria, mas ela sabe o que faz.",
                                    '<25>{#p/alphys}{#f/8}* Normalmente recompensamos ela com um banho frio.\n* Meio coincidente, mas tudo bem.'
                                ]);
                            } else if (!droyalguards) {
                                addB([
                                    '<26>{#p/alphys}{#f/6}* É, 01 e 03 são fofos, e... eles tem feito um ótimo trabalho.',
                                    '<25>{#p/alphys}{#f/8}* Normalmente os compensamos com sorvete.\n* Eles amam.'
                                ]);
                            } else if (!dmadjick) {
                                addB([
                                    "<25>{#p/alphys}{#f/6}* É, ele pode ficar confuso as vezes, mas faz um ótimo trabalho.",
                                    '<25>{#p/alphys}{#f/8}* Normalmente o compensamos com poemas encontrados.\n* Ele os ama.'
                                ]);
                            } else {
                                addB([
                                    "<25>{#p/alphys}{#f/6}* É, ela... tem feito um ótimo trabalho.",
                                    '<25>{#p/alphys}{#f/8}* Costumamos recompensá-la com canções de ninar.\n* Ela as acha acalmantes.'
                                ]);
                            }
                            addB([
                                "<25>{#p/sans}{#f/0}* Sim, foi um bom arranjo.",
                                "<25>{#p/sans}{#f/3}* todo mundo ganha o que quer, todo mundo está feliz.",
                                '<25>{#p/sans}{#f/3}* ...',
                                '<25>{#p/sans}{#f/3}* bem, eu disse todo mundo.',
                                '<25>{#p/alphys}{#f/15}* ... certo...',
                                "<25>{#p/alphys}{#f/10}* Eu vou só... deixar vocês dois conversarem.",
                                '<25>{#p/sans}{#f/0}* na verdade, estamos quase finalizando.',
                                '<25>{#p/alphys}{#f/17}* ... oh.',
                                "<25>{#p/sans}{#f/3}* olha, não tem sido fácil para uma única pessoa no outpost.",
                                '<25>{#p/sans}{#f/0}* nem pra mim, nem pra alphys...',
                                '<25>{#p/sans}{#f/3}* ... pra ninguém.',
                                "<25>{#p/alphys}{#f/24}* Pois é, é isso que acontece quando você mata tantas pessoas.",
                                '<25>{#p/alphys}{#f/25}* Quem poderia imaginar.'
                            ]);
                            if (hkills > 19) {
                                addB([
                                    '<25>{#p/sans}{#f/3}* exceto de que foi mais do que um \"tanto de pessoas.\"',
                                    '<25>{#p/sans}{#f/0}* foram... pessoas muito importantes.',
                                    '<25>{#p/sans}{#f/0}* pessoas que a perda impactou todos no outpost.',
                                    '<25>{#p/sans}{#f/3}* ... e tem uma pessoa que você matou...'
                                ]);
                            } else {
                                addB([
                                    "<25>{#p/sans}{#f/3}* para ser sincero, poderia ter sido bem pior.",
                                    '<25>{#p/sans}{#f/0}* eu entendo você se defender contra a guarda real.',
                                    '<25>{#p/sans}{#f/0}* e mesmo fora disso, maior parte do que você fez estava correto.',
                                    '<25>{#p/sans}{#f/3}* ... mas, existe uma pessoa que você matou...'
                                ]);
                            }
                            addB(['<25>{#p/sans}{#f/0}* que eu tenho certeza que não havia motivos.']);
                            if (
                                world.edgy ||
                                (world.population_area('s') <= 0 && !world.bullied_area('s')) // NO-TRANSLATE

                            ) {
                                addB([
                                    '<25>{#p/sans}{#f/0}* alguém que só queria que você fosse uma pessoa melhor.',
                                    '<25>{#p/sans}{#f/3}* antes de você mata-lo brutalmente e revelar sua natureza.'
                                ]);
                            } else {
                                addB([
                                    '<25>{#p/sans}{#f/0}* alguém que jamais iria te ferir de verdade, não importava o que.',
                                    '<25>{#p/sans}{#f/3}* mas parece que você se esforçou muito para acabar com a vida dele.'
                                ]);
                            }
                            addB([
                                "<25>{#p/sans}{#f/0}* não minta para si mesmo.\n* você sabe exatamente de quem estou falando.",
                                '<25>{#p/alphys}{#f/20}* Eu certamente sei.',
                                "<25>{#p/sans}{#f/3}* ...\n* se você está aí fora, em algum lugar...",
                                "<25>{#p/sans}{#f/0}* eu espero que você perceba o desastre que fez aqui.",
                                '<25>{#p/sans}{#f/0}* sem asgore, ou undyne.\n* sem guarda real.\n* sem mettaton.',
                                '<25>{#p/sans}{#f/3}* ... sem razões para manter essa ligação por qualquer tempo a mais que seja.',
                                '<32>{#s/equip}{#p/event}* Click...'
                            ]);
                        }
                    } else if (SAVE.data.n.state_wastelands_toriel !== 0 && SAVE.data.n.kills_wastelands < 16) {
                        k = 'dark_mew'; // NO-TRANSLATE

                        m = music.gameshow;
                        
                        addA([
                            '<32>{#s/phone}{#p/event}* Ring, ring...',
                            '<25>{#p/sans}{#f/0}* opa.',
                            '<25>{#p/sans}{#f/4}* tem alguém aí?',
                            "<25>{#p/sans}{#f/2}* não?\n* bem, eu vou só deixar uma mensagem."
                        ]);
                        addB([
                            '<25>{#p/sans}{#f/0}* então, após você ir embora as coisas ficaram piores e piores.',
                            '<25>{#p/sans}{#f/3}* asgore se foi, undyne se foi...',
                            '<25>{#p/sans}{#f/0}* e devido a um plano estúpido envolvendo mettaton e o core...',
                            '<25>{#p/sans}{#f/3}* tivemos problemas no suprimento de energia, matando muitos no processo.',
                            '<25>{#p/sans}{#f/3}* até mesmo os humanos no arquivo foram acertados por um certo poder.',
                            '<25>{#p/sans}{#f/0}* para encurtar a loga história, eu e a alphys colocamos as almas em lugares seguros.',
                            '<25>{#p/sans}{#f/3}* mas quem iríamos chamar para olha-las?',
                            '<25>{#p/sans}{#f/0}* bem, a única pessoa que chamamos que estava viva...',
                            '<25>{#p/sans}{#f/0}* um membro formal do esquadrão de elite...',
                            '<25>{#p/sans}{#f/3}* acabou sendo um enorme cavalo de tróia.',
                            '<25>{#p/sans}{#f/0}* o momento em que foi deixado sozinho com as almas...',
                            '<25>{#p/sans}{#f/3}* ele pegou para si, transformou-se de um boneco...',
                            '<25>{#p/sans}{#f/3}* para uma mad mew mew, de mew mew Starfire.',
                            '<25>{#p/sans}{#f/0}* também conhecido como o melhor filme da franquia mew mew.',
                            "<25>{#p/sans}{#f/2}* o que eu definitivamente não estou dizendo por temer pela minha vida.",
                            '<25>{#p/sans}{#f/0}* tanto faz, como você pode ver, as coisas estão maravilhosas aqui!',
                            '<25>{#p/sans}{#f/0}* mais do que fazer qualquer trabalho importante, só jogamos o dia inteiro.',
                            "<25>{#p/sans}{#f/0}* ... o que definitivamente não somos forçados a fazer.",
                            '<25>{#p/sans}{#f/3}* quer dizer, ei.\n* pelo menos os jogos são bem justos.',
                            "<25>{#p/sans}{#f/0}* não, sérião.\n* essa parte nem é mentira.",
                            "<25>{#p/sans}{#f/0}* porque, mesmo quando ela age como se quisesse ser injusta...",
                            "<25>{#p/sans}{#f/3}* é como se...",
                            "<25>{#p/sans}{#f/3}* algo dentro dela não a permite ir tão longe.",
                            '<25>{#p/sans}{#f/0}* algo para ela.\n* ela hesita ou até mesmo recua as vezes.',
                            '<25>{#p/sans}{#f/0}* teve uma vez em que ela teve uma ideia...',
                            "<25>{#p/sans}{#f/3}* de um jogo onde todos nós lutamos até a morte por turnos.",
                            '<25>{#p/sans}{#f/0}* mas assim que as lutas estavam para começar...',
                            '<25>{#p/sans}{#f/3}* ela mudou as regras para apenas desmaiar o adversário.',
                            '<25>{#p/sans}{#f/3}* então...\n* se eu pudesse adivinhar...',
                            "<25>{#p/sans}{#f/2}* eu acho que as almas humanas deram a ela mais do que apenas poder.",
                            '<25>{#p/sans}{#f/0}* talvez parte delas ainda estão conscientes...?',
                            "<25>{#p/alphys}{#f/17}* Uh, sem querer interromper, mas é sua vez.",
                            '<25>{#p/sans}{#f/0}* huh?',
                            "<25>{#p/alphys}{#f/18}* O jogo está na sua mão agora.",
                            '<25>{#p/sans}{#f/3}* ... certo.',
                            
                            '<25>{#p/sans}{#f/0}* eu acho melhor eu vazar daqui, então.',
                            '<25>{#p/alphys}{#f/6}* Essa provavelmente é uma boa ideia.',
                            '<25>{#p/alphys}{#f/23}* Pelo bem de todo mundo.',
                            '<25>{#p/sans}{#f/0}* mas antes de eu ir.',
                            '<25>{#p/sans}{#f/0}* se essa ligação conseguir te alcançar...',
                            '<25>{#p/sans}{#f/3}* eu sugiro não deixar outro humano chegar aqui.',
                            "<25>{#p/sans}{#f/3}* mew mew está planejando algo muito grande.\n* posso sentir.",
                            '<25>{#p/sans}{#f/0}* se ela conseguir, toda a galáxia estará em perigo.',
                            "<25>{#p/sans}{#f/2}* ... apenas pensei em te avisar",
                            "<25>{#p/alphys}{#f/23}* Vai, vamos logo!",
                            "<25>{#p/sans}{#f/0}* estou indo.",
                            '<32>{#s/equip}{#p/event}* Click...'
                        ]);
                    } else {
                        k = 'dark_charles'; // NO-TRANSLATE

                        m = music.letsmakeabombwhydontwe;
                        
                        addA([
                            '<32>{#s/phone}{#p/event}* Ring, ring...',
                            '<25>{#p/sans}{#f/0}* opa.',
                            '<25>{#p/sans}{#f/4}* tem alguém aí?',
                            "<25>{#p/sans}{#f/2}* não?\n* bem, eu vou só deixar uma mensagem."
                        ]);
                        addB([
                            "<25>{#p/sans}{#f/0}* então, após você sair, as coisas não foram as melhores no começo.",
                            '<25>{#p/sans}{#f/3}* asgore se foi, undyne se foi...',
                            '<25>{#p/sans}{#f/0}* e devido a um plano estúpido envolvendo mettaton e o core...',
                            '<25>{#p/sans}{#f/3}* tivemos problemas no suprimento de energia, matando muitos no processo.',
                            '<25>{#p/sans}{#f/3}* até mesmo os humanos no arquivo foram acertados por um certo poder.',
                            '<25>{#p/sans}{#f/0}* para encurtar a loga história, eu e a alphys colocamos as almas em lugares seguros.',
                            '<25>{#p/sans}{#f/4}* mas quem nós iríamos contratar para olha-las?',
                            '<25>{#p/sans}{#f/0}* bem, de todas as pessoas que ligamos, apenas o charles pegou o trabalho.',
                            '<25>{#p/sans}{#f/2}* um pequeno rato com uma rifle que trabalhava no core.',
                            '<25>{#p/sans}{#f/0}* agora, o charles tem trabalhado a tanto tempo no core...',
                            '<25>{#p/sans}{#f/0}* que se acostumou totalmente a sua rotina.',
                            '<25>{#p/sans}{#f/0}* tira uma célula de energia, coloca uma nova de volta...',
                            '<25>{#p/sans}{#f/3}* exceto que agora, ao invés de células, eram as almas humanas.',
                            '<25>{#p/sans}{#f/0}* ... então, ele acidentalmente absorver as almas...',
                            '<25>{#p/sans}{#f/3}* foi só porque charles sabia que estava dando seu melhor.',
                            '<25>{#p/sans}{#f/3}* eu sei.\n* parece ruim.',
                            '<25>{#p/sans}{#f/0}* sem as almas humanas, como poderíamos escapar?',
                            '<25>{#p/sans}{#f/0}* mas quando o ratinho descobriu seu novo poder...',
                            "<25>{#p/sans}{#f/2}* ele usou este poder para fazer com que o sonho de todos se tornasse realidade.",
                            '<18>{#p/papyrus}{#f/0}OLÁ, HUMANO!\nSOU EU, O GRANDE PAPYRUS!',
                            '<18>{#p/papyrus}{#f/6}O QUE!?!?\nVOCÊ PENSOU QUE EU ESTAVA MORTO!?',
                            "<18>{#p/papyrus}{#f/7}... UGH, ISSO É RIDÍCULO!\nEU NUNCA MORRERIA!",
                            '<18>{#p/papyrus}{#f/4}EU FUI REENCARNADO...',
                            '<18>{#p/papyrus}{#f/9}PELO NOSSO UNICO E AMADO, REI CHARLES!!!',
                            "<25>{#p/sans}{#f/3}* ... então, como você pode ver, não a razão para a tristeza de ninguém.",
                            '<25>{#p/sans}{#f/2}* quem se importa de sair do outpost, não estou certo?',
                            "<18>{#p/papyrus}{#f/0}É, NÃO PRECISAMOS VER AS ESTRELAS!",
                            "<18>{#p/papyrus}{#f/9}ESTAMOS VIVENDO NOSSAS MELHORES VIDAS BEM AQUI!",
                            '<25>{#p/sans}{#f/2}* meu exato pensamento.',
                            '<25>{#p/sans}{#f/0}* ... bem, obrigado por ser a razão de tudo isso acontecer.',
                            '<25>{#p/sans}{#f/0}* se você acabar por ficar no tédio de voar por aí...',
                            "<25>{#p/sans}{#f/3}* só saiba que você é sempre bem vindo a voltar.",
                            '<18>{#p/papyrus}{#f/0}É, VOCÊ PODE VIVER A SUA MELHOR VIDA AQUI, TAMBÉM!',
                            '<25>{#p/sans}{#f/2}* heh.',
                            '<32>{#s/equip}{#p/event}* Click...'
                        ]);
                    }
                } else {
                    
                    k = 'dark_generic'; // NO-TRANSLATE

                    addA([
                        '<32>{#s/phone}{#p/event}* Ring, ring...',
                        '<25>{#p/sans}{#f/0}* opa.',
                        "<25>{#p/sans}{#f/3}* já faz um tempo, huh?"
                    ]);
                    addB([
                        '<25>{#p/sans}{#f/0}* depois que você fugiu, alphys... meio que entrou em pânico.',
                        '<25>{#p/sans}{#f/0}* não apenas asgore e undyne se foram...',
                        '<25>{#p/sans}{#f/0}* mas por conta de um plano estúpido envolvendo mettaton e o core...',
                        "<26>{#p/sans}{#f/3}* a guarda real teve que correr para arrumar o problema dos suprimentos de energia.",
                        '<25>{#p/sans}{#f/0}* alphys me ligou e pediu para me encontrar com ela.',
                        "<25>{#p/sans}{#f/3}* quando cheguei lá, poderia dizer apenas ao ver, que ela não estava bem.",
                        '<25>{#p/sans}{#f/0}* ainda assim, eu sabia desde que éramos parceiros de laboratório...',
                        '<25>{#p/sans}{#f/2}* que ela tinha um plano caso tudo desse errado.',
                        '<25>{#p/sans}{#f/0}* então, eu sentei com ela, e a dei uma chance de processar tudo...',
                        "<26>{#p/sans}{#f/3}* no fim ela tomou responsabilidade e aceitou a coroa do rei asgore.",
                        '<25>{#p/sans}{#f/0}* ... depois disso, ela acabou por me explicar.',
                        '<32>{#p/human}{#v/4}{@fill=#d535d9}* Sans, podemos ir à piscina?',
                        "<32>{#p/human}{#v/5}{@fill=#00c000}* Está tudo bem se você não puder nos levar...",
                        "<25>{#p/sans}{#f/0}* olha aí, o que deixou vocês crianças tão animadas?",
                        "<25>{#p/sans}{#f/3}* claro que eu posso levá-las.\n* quando eu finalizar aqui no telefone.",
                        '<32>{#p/human}{#v/4}{@fill=#d535d9}* Feito.',
                        '<32>{#p/human}{#v/5}{@fill=#00c000}* Parece bom!',
                        '<25>{#p/alphys}{#f/10}* Ahahah, d-desculpa por isso, eu...',
                        '<25>{#p/alphys}{#f/20}* Eu... tive que atender a um chamado da Agência de Defesa Real.',
                        "<25>{#p/alphys}{#f/6}* Vamos lá pessoal, deixem o Sans finalizar a conversa no telefone.",
                        '<32>{#p/human}{#v/4}{@fill=#d535d9}* Tudo bem.',
                        "<32>{#p/human}{#v/5}{@fill=#00c000}* Desculpa por ter te atrapalhado...",
                        "<25>{#p/sans}{#f/2}* heh.\n* não se preocupe, amiguinho.\n* não vai tomar muito tempo.",
                        '<25>{#p/sans}{#f/0}* ...',
                        '<25>{#p/sans}{#f/0}* após a alphys se tornar rainha, ela fez algumas mudanças.',
                        '<25>{#p/sans}{#f/0}* primeiramente, a guarda real se tornou a agência de defesa real.',
                        '<25>{#p/sans}{#f/0}* uma versão tecnologicamente orientada da guarda real.',
                        "<25>{#p/sans}{#f/3}* eles têm viseiras de alta tecnologia, rastreamento de longo alcance.",
                        '<25>{#p/sans}{#f/2}* perfeito para encontrar e escoltar qualquer criança que chegar aqui.'
                    ]);
                    if (!dpapyrus) {
                        addB([
                            "<25>{#p/sans}{#f/0}* bem legal, até papyrus tem uma posição com eles.",
                            "<25>{#p/sans}{#f/3}* ele é o líder de um esquadrão encarregado de lidar com os mais..."
                        ]);
                    } else {
                        addB([
                            '<25>{#p/sans}{#f/0}* e os guardas reais originais de antes da reformulação da marca?',
                            '<25>{#p/sans}{#f/3}* eles foram colocados juntos em um esquadrão para lidar com os mais...'
                        ]);
                    }
                    addB([
                        '<25>{#p/sans}{#f/3}* ... tipos turbulentos',
                        '<26>{#p/sans}{#f/0}* aprendemos muito sobre isso desde que você esteve aqui.',
                        "<25>{#p/sans}{#f/0}* a agência de defesa tem pessoas analisando seus dados todo dia.",
                        '<25>{#p/sans}{#f/3}* procurando por padrões, achando pontos de fraqueza...',
                        "<25>{#p/sans}{#f/2}* com sorte, não vamos precisar usar isso.",
                        '<25>{#p/sans}{#f/0}* mas... nunca se sabe.'
                    ]);
                    if (!dpapyrus) {
                        addB([
                            '<18>{#p/papyrus}{#f/0}OLÁ, SANS!!\n* O QUE TEM FEITO?',
                            '<26>{#p/sans}{#f/3}* eh, nada demais.',
                            '<26>{#p/sans}{#f/0}* você está descansando agora?',
                            '<18>{#p/papyrus}{#f/9}PODE SE DIZER QUE SIM!',
                            "<18>{#p/papyrus}{#f/5}EU NÃO DESCANSO MUITO, ENTÃO...",
                            '<18>{#p/papyrus}{#f/0}EU DEVO USAR ESTE COM SABEDORIA.',
                            '<26>{#p/sans}{#f/3}* hmm... deixa eu adivinhar.',
                            '<25>{#p/sans}{#f/2}* foi a alphys que te fez descansar?',
                            '<18>{#p/papyrus}{#f/4}...',
                            "<18>{#p/papyrus}{#f/4}EU NÃO TIVE ESCOLHA ALGUMA.",
                            '<18>{#p/papyrus}{#f/0}DE TODA FORMA, JÁ DEVE SER TEMPO O SUFICIENTE DE DESCANSO.',
                            '<18>{#p/papyrus}{#f/9}HORA DE VOLTAR AO TRABALHO!',
                            '<25>{#p/sans}{#f/0}* huh?\n* qual foi mano, você mal chegou aqui.',
                            '<18>{#p/papyrus}{#f/6}SEM TEMPO A PERDER!!\nUM HUMANO PODE APARECER A QUALQUER SEGUNDO!',
                            "<25>{#p/sans}{#f/3}* ... é, você tá certo.",
                            "<25>{#p/sans}{#f/0}* só seria legal se você não ficasse tão ocupado."
                        ]);
                    }
                    addB(['<25>{#p/sans}{#f/0}* ...']);
                    if (!dtoriel) {
                        if (!dpapyrus) {
                            addB([
                                '<25>{#p/sans}{#f/3}* pelo menos a alphys parece ter bastante tempo livre.',
                                '<25>{#p/sans}{#f/0}* já que, desde que a verdadeira rainha retornou...',
                                '<25>{#p/sans}{#f/4}* ela ajuda a olhar os humanos.'
                            ]);
                        } else {
                            addB([
                                '<25>{#p/sans}{#f/3}* pelo menos os humanos que vieram antes de você são bem legais.',
                                '<25>{#p/sans}{#f/0}* quando a verdadeira rainha retornou...',
                                '<25>{#p/sans}{#f/4}* ela se ofereceu para ajudar a olha-las.'
                            ]);
                        }
                        addB([
                            '<25>{#p/sans}{#f/3}* ela ainda pensa que asgore era uma pessoa ruim, mas...',
                            "<25>{#p/sans}{#f/0}* talvez um dia, ela o perdoe.",
                            "<25>{#p/sans}{#f/0}* é difícil dizer.",
                            "<25>{#p/sans}{#f/3}* ... tirando ele, eu sei uma pessoa que ela jamais vai perdoar."
                        ]);
                    } else {
                        if (!dpapyrus) {
                            addB(["<25>{#p/sans}{#f/3}* pelo menos ele está feliz.\n* ele gosta do que faz."]);
                            if (hkills > 19) {
                                addB(['<25>{#p/sans}{#f/0}* o que é basicamente o que posso dizer de muitas pessoas hoje em dia.']);
                            } else {
                                addB(['<25>{#p/sans}{#f/0}* o que é bom, já que nem todos podem dizer o mesmo.']);
                            }
                        } else {
                            addB(["<25>{#p/sans}{#f/3}* a vida tem sido meio sozinha, sabe?"]);
                            if (hkills > 19) {
                                addB(['<25>{#p/sans}{#f/0}* não apenas para mim, mas para muitos hoje em dia.']);
                            } else {
                                addB([
                                    '<25>{#p/sans}{#f/0}* nem todos tem o luxo de carregar a vida como se nada tivesse acontecido.'
                                ]);
                            }
                        }
                    }
                    addB([
                        "<25>{#p/alphys}{#f/20}* S-sans, me desculpa.\n* Mas você tem que levar as crianças para a piscina.",
                        "<25>{#p/alphys}{#f/3}* Elas estão me deixando maluca!",
                        '<25>{#p/sans}{#f/3}* ... tá bom.',
                        "<25>{#p/sans}{#f/0}* acho que vou deixar a alphys finalizar essa conversa pra mim.",
                        '<25>{#p/alphys}{#f/27}* Finalizar o que?',
                        '<25>{#p/alphys}{#f/21}* ...',
                        "<25>{#p/alphys}{#f/21}* Então é você.",
                        '<25>{#p/alphys}{#f/24}* Bem.\n* Ele disse que estava planejando te ligar.',
                        "<25>{#p/alphys}{#f/25}* Pessoalmente, eu não tenho muito a dizer."
                    ]);
                    if (hkills > 19) {
                        addB(["<25>{#p/alphys}{#f/25}* Você é um assassino, um covarde e bem melhor longe daqui."]);
                        if (!dpapyrus) {
                            addB(['<25>{#p/alphys}{#f/24}* E não importa o bem que você faça agora...']);
                        } else {
                            addB(['<25>{#p/alphys}{#f/24}* E o pior de tudo...']);
                        }
                    } else {
                        addB(["<25>{#p/alphys}{#f/25}* Você pode não ter matado tantas pessoas, mas ainda é tão deprimente."]);
                        if (!dpapyrus) {
                            addB(['<25>{#p/alphys}{#f/24}* Não importa o bem que você faça agora, no entanto...']);
                        } else {
                            addB(['<25>{#p/alphys}{#f/24}* Pior de tudo...']);
                        }
                    }
                    if (!dpapyrus) {
                        addB([
                            "<25>{#p/alphys}{#f/25}* Isso nunca irá apagar o mau que você já fez.",
                            '<25>{#p/alphys}{#f/24}* ...',
                            '<25>{#p/alphys}{#f/24}* Em nome de todos que vivem no Outpost...'
                        ]);
                    } else {
                        addB([
                            '<25>{#p/alphys}{#f/25}* Você matou alguém importante para meu amigo mais próximo.',
                            '<25>{#p/alphys}{#f/24}* ...',
                            '<25>{#p/alphys}{#f/24}* Em seu nome...'
                        ]);
                    }
                    addB([
                        '<25>{#p/alphys}{#f/16}* Eu espero que você caia em um buraco negro e morra.',
                        '<32>{#s/equip}{#p/event}* Click...'
                    ]);
                }
            } else if (SAVE.data.b.ubershortcut || world.bad_lizard > 1) {
                k = 'dark_aborted'; // NO-TRANSLATE

                
                if (dmettaton) {
                    addA([
                        '<32>{#s/phone}{#p/event}* Ring, ring...',
                        '<32>{#p/napstablook}* opa',
                        '<32>{#p/napstablook}* tem alguém aí?',
                        "<32>{#p/napstablook}* eu acho... que tem algo que eu preciso te dizer.",
                        "<32>{#p/napstablook}* não é nada demais."
                    ]);
                    addB([
                        '<32>{#p/napstablook}* então, antes mesmo de você sair do Outpost.',
                        '<32>{#p/napstablook}* as coisas estavam indo de mal a pior para mim.',
                        '<32>{#p/napstablook}* pessoas morreram... outras estavam mortas, ou feridas...',
                        '<32>{#p/napstablook}* e então... quando mettaton morreu no meu grande final, eu...',
                        "<32>{#p/napstablook}* .........\n* eu não sabia o que fazer",
                        '<32>{#p/napstablook}* é como se... meu mundo tivesse desabado...',
                        '<32>{#p/napstablook}* e tudo que eu poderia fazer........ era assistir ele cair...........',
                        '<32>{#p/napstablook}* ...............',
                        '<32>{#p/napstablook}* quando isso aconteceu, muitas pessoas sumiram no mesmo dia.',
                        '<32>{#p/napstablook}* e todos nós que formamos um grupo de apoio para os fãs de mettaton.',
                        '<32>{#p/napstablook}* lembra das suas últimas palavras?',
                        '<32>{#p/napstablook}* \"você vai perceber que nunca tudo irá como deseja!\"',
                        '<32>{#p/napstablook}* ... é claro, ele estava errado.',
                        '<32>{#p/napstablook}* você escapou, e acabou se livrando de tudo que fez.',
                        "<32>{#p/napstablook}* nem mesmo o rei asgore conseguiu te parar.",
                        "<32>{#p/napstablook}* mas aquelas palavras... se tornaram nossa motivação.",
                        '<32>{#p/napstablook}* nós nos unimos pelo desgosto a você e como você escapou das consequências.',
                        "<32>{#p/napstablook}* você não é apenas um humano que fez algumas coisas ruins.",
                        "<32>{#p/napstablook}* você é um assassino que pisou na cara do nosso modo de vida."
                    ]);
                    if (!dundyne) {
                        addB([
                            '<32>{#p/napstablook}* a nova rainha, undyne, provavelmente concorda conosco.',
                            '<32>{#p/napstablook}* ... ela tomou o poder após asgore desaparecer.',
                            "<32>{#p/napstablook}* ela não era lá uma fã do mettaton, mas...",
                            '<32>{#p/napstablook}* ela definitivamente apoiou o que ele disse no final.'
                        ]);
                        if (!dtoriel) {
                            addB([
                                '<32>{#p/napstablook}* heh...... quando toriel retornou e implorou undyne para te defender......',
                                '<32>{#p/napstablook}* ela foi desprezada e feita de palhaça até voltar para as outlands.',
                                '<32>{#p/napstablook}* ... todos estão bem unidos no desgosto por você, agora.'
                            ]);
                        } else {
                            addB(['<32>{#p/napstablook}* assim como todo mundo faz hoje em dia.']);
                        }
                    } else if (!dtoriel) {
                        addB([
                            '<32>{#p/napstablook}* a nova rainha, toriel, talvez discorde da gente.',
                            '<32>{#p/napstablook}* ... ela tomou o poder após asgore desaparecer.',
                            "<32>{#p/napstablook}* não é como se ela estivesse contra o mettaton, mas...",
                            '<32>{#p/napstablook}* ela parece ter uma fé inabalável pela humanidade.',
                            "<32>{#p/napstablook}* .........\n* sinceramente, está tudo bem.",
                            "<32>{#p/napstablook}* isso não impediu as pessoas de se unirem para odiar você."
                        ]);
                    } else {
                        addB([
                            '<32>{#p/napstablook}* eventualmente, nosso grupo percebeu que o asgore precisava ser substituído',
                            '<32>{#p/napstablook}* então... um dos nossos membros sugeriu tomarmos conta do trono por nós mesmos.',
                            '<32>{#p/napstablook}* como o \"cara\" do grupo, eu fui apontado para ser o líder oficial do outpost...',
                            '<32>{#p/napstablook}* mas, na realidade... nós todos meio que decidimos juntos as coisas.',
                            "<32>{#p/napstablook}* é bem legal, na verdade.",
                            '<32>{#p/napstablook}* meio estranho ter todas essas pessoas ao meu redor, mas......',
                            '<32>{#p/napstablook}* pelo menos nenhum de nós tem que fazer isso sozinhos.'
                        ]);
                    }
                    addB([
                        '<32>{#p/napstablook}* de toda forma, eu só queria que você soubesse......',
                        "<32>{#p/napstablook}* que eu estou bem.",
                        '<32>{#p/napstablook}* melhor que bem, na verdade.',
                        "<32>{#p/napstablook}* porque o que você fez... não nos feriu.",
                        '<32>{#p/napstablook}* apenas nos fez mais fortes.',
                        '<32>{#p/napstablook}* e um dia... vamos todos escapar do outpost.........',
                        '<32>{#p/napstablook}* .........',
                        "<32>{#p/napstablook}* nosso grupo vai te caçar e fazê-lo pagar pelo que fez aqui.",
                        '<32>{#p/napstablook}* heh......',
                        '<32>{#p/napstablook}* ......\n* eu espero que você morra de uma forma bem dolorosa',
                        '<32>{#s/equip}{#p/event}* Click...'
                    ]);
                } else {
                    addA([
                        '<32>{#s/phone}{#p/event}* Ring, ring...',
                        '<32>{#p/mettaton}* COM LICENÇA, HUMANO...',
                        "<32>{#p/mettaton}* EXISTEM ALGUMAS COISAS QUE EU GOSTARIA DE TE DIZER.",
                        '<32>{#p/mettaton}* VOCÊ ESTÁ AÍ?',
                        "<32>{#p/mettaton}* ... EU ACHO QUE SERÁ UMA MENSAGEM, ENTÃO."
                    ]);
                    if (SAVE.data.b.ubershortcut) {
                        addB([
                            "<32>{#p/mettaton}* PARA COMEÇAR, DEVO DIZER QUE ESTOU FELIZ QUE VOCÊ TENHA SEGUIDO AS INSTRUÇÕES DA ALPHYS.",
                            '<32>{#p/mettaton}* EVITAR UM CONFRONTO COM UNDYNE E BOA PARTE DE AERIALIS...?',
                            '<32>{#p/mettaton}* ISSO SALVOU PARA MIM E PARA ELA UMA GRANDE DOR DE CABEÇA.'
                        ]);
                    } else if (royals < 4 && hkills > 19) {
                        addB([
                            "<32>{#p/mettaton}* PARA SER SINCERO, EU NÃO SEI EXATAMENTE POR ONDE COMEÇAR.",
                            '<32>{#p/mettaton}* VOCÊ MATOU CIDADÃOS, MATOU GUARDAS REAIS...',
                            '<32>{#p/mettaton}* VOCÊ FOI ZERO PRECONCEITOS NA SUA FORMA DE MATAR.',
                            '<32>{#p/mettaton}* EU APRECIO QUE SEU COMPORTAMENTO TENHO MELHORADO MAIS TARDE...'
                        ]);
                    } else if (royals < 4) {
                        addB([
                            "<32>{#p/mettaton}* VAMOS DEIXAR ALGO CLARO.",
                            '<32>{#p/mettaton}* VOCÊ BASICAMENTE -ELIMINOU- A GUARDA REAL.',
                            '<32>{#p/mettaton}* VOCÊ DE ALGUMA FORMA FOI MAIS PIEDOSO COM OS CIDADÃOS...',
                            '<32>{#p/mettaton}* E SEU COMPORTAMENTO MELHOROU APÓS MEU AVISO...'
                        ]);
                    } else if (hkills > 19) {
                        addB([
                            "<32>{#p/mettaton}* VAMOS DEIXAR ALGO CLARO.",
                            '<32>{#p/mettaton}* QUANDO SE TRATOU DOS CIDADÃOS, VOCÊ -NÃO-DEMONSTROU PIEDADE.',
                            '<32>{#p/mettaton}* VOCÊ DE ALGUMA FORMA FOI MAIS PIEDOSO COM A GUARDA REAL...',
                            '<32>{#p/mettaton}* E SEU COMPORTAMENTO MELHOROU APÓS MEU AVISO...'
                        ]);
                    } else {
                        addB([
                            "<32>{#p/mettaton}* PARA COMEÇAR, DEVI ADMITIR QUE VOCÊ NÃO É TÃO RUIM QUANTO EU PENSEI QUE SERIA.",
                            '<32>{#p/mettaton}* VOCÊ POUPOU A GUARDA REAL E MUITOS DOS CIDADÃOS, TAMBÉM.',
                            '<32>{#p/mettaton}* SEM MENCIONAR A SUA MELHORA DE COMPORTAMENTO APÓS MEU AVISO.'
                        ]);
                    }
                    addB(["<32>{#p/mettaton}* MAS NÃO PENSE NEM POR UM SEGUNDO QUE ISSO PERDOA QUALQUER ATITUDE."]);
                    if (SAVE.data.b.ubershortcut) {
                        addB([
                            '<32>{#p/mettaton}* DESDE QUE ASGORE DESAPARECEU, ALPHYS TEM ESTADO CHEIA DE TRABALHOS COMO A RAINHA.',
                            '<32>{#p/mettaton}* EU ESTAVA SURPRESA EM VÊ-LA TOMAR O CONTROLE, MAS...',
                            '<32>{#p/mettaton}* EU ACHO QUE O SUCESSO DELA EM TE ESCOLTAR A DEU BASTANTE CONFIANÇA.',
                            "<32>{#p/mettaton}* AINDA ASSIM, NÃO TEM SIDO FÁCIL.",
                            "<32>{#p/mettaton}* DESDE QUE ELA TE GUIOU PARA A SEGURANÇA, UNDYNE TEM ESTADO IRADA COM ELA.",
                            '<32>{#p/mettaton}* A CAPITÃ DA GUARDA QUESTIONA CADA DECISÃO DA RAINHA, A DANDO DÚVIDAS.',
                            '<32>{#p/mettaton}* E MESMO QUE ELA ACREDITE EM SUA REDENÇÃO...',
                            '<32>{#p/mettaton}* AS PESSOAS QUEREM A MORTE DOS HUMANOS.'
                        ]);
                        if (!dtoriel) {
                            addB([
                                "<32>{#p/mettaton}* NEM MESMO A VERDADEIRA RAINHA TORIEL NÃO CONSEGUIU MUDAR A MENTE DAS PESSOAS.",
                                '<32>{#p/mettaton}* DESDE ENTÃO, ALPHYS PERDEU O APETITE POR POLÍTICA.'
                            ]);
                        }
                    } else if (!dundyne) {
                        addB([
                            '<32>{#p/mettaton}* DESDE QUE ASGORE DESAPARECEU, UNDYNE TEM TIDO MUITO TRABALHO COMO RAINHA.',
                            '<32>{#p/mettaton}* E A ALPHYS?\n* BEM, ELA -ERA- SUPOSTAMENTE PARA SER A PRÓXIMA NA LINHA...',
                            "<32>{#p/mettaton}* MAS EU NÃO A CULPO POR CORRER DO CARGO.",
                            "<32>{#p/mettaton}* AS PESSOAS QUEREM OS HUMANOS MORTOS.\n* E, SINCERAMENTE, ELES TEM MAIS DO QUE A JUSTIFICATIVA."
                        ]);
                        if (!dtoriel) {
                            addB([
                                "<32>{#p/mettaton}* NEM MESMO A VERDADEIRA RAINHA TORIEL NÃO CONSEGUIU MUDAR A MENTE DAS PESSOAS.",
                                "<32>{#p/mettaton}* MUITO MENOS UNDYNE."
                            ]);
                        }
                    } else if (!dtoriel) {
                        addB([
                            '<32>{#p/mettaton}* DESDE QUE ASGORE DESAPARECEU, TORIEL TEM TIDO SUAS MÃOS CHEIAS COMO RAINHA.',
                            '<32>{#p/mettaton}* E A ALPHYS?\n* BEM, ELA -ERA- SUPOSTAMENTE PARA SER A PRÓXIMA NA LINHA...',
                            "<32>{#p/mettaton}* MAS EU NÃO A CULPO POR CORRER DO CARGO.",
                            "<32>{#p/mettaton}* AS PESSOAS QUEREM OS HUMANOS MORTOS.\n* E, SINCERAMENTE, ELES TEM MAIS DO QUE A JUSTIFICATIVA.",
                            "<32>{#p/mettaton}* NEM MESMO A PRÓPRIA TORIEL CONSEGUIU ACALMA-LOS.\n* ELA TENTOU MUITO, ACREDITE."
                        ]);
                    } else {
                        addB([
                            '<32>{#p/mettaton}* DESDE QUE ASGORE DESAPARECEU AS COISAS FICARAM CADA VEZ PIORES.',
                            '<32>{#p/mettaton}* ALPHYS ERA SUPOSTAMENTE PARA TOMAR O PODER, MAS ELA FUGIU.',
                            '<32>{#p/mettaton}* EU A CULPO?\n* DE JEITO ALGUM.',
                            '<32>{#p/mettaton}* MAS ISSO SIGNIFICA QUE EU NÃO TINHA OUTRA ESCOLHA SE NÃO TOMAR O PODER PARA MIM.',
                            '<32>{#p/mettaton}* EU TENHO SENTIMENTOS MISTURADOS PELO HUMANOS DESDE QUE DESCOBRI O ARQUIVO...',
                            '<32>{#p/mettaton}* MAS AS PESSOAS ESTÃO TOTALMENTE CORRETAS SOBRE SEUS SENTIMENTOS EM RELAÇÃO A VOCÊ.'
                        ]);
                    }
                    addB([
                        "<32>{#p/mettaton}* SUAS AÇÕES PROVARAM QUE, NÃO IMPORTA O QUANTO EU GOSTARIA DE ACREDITAR NA HUMANIDADE...",
                        "<32>{#p/mettaton}* SEMPRE EXISTIRÁ AQUELES COMO VOCÊ LÁ FORA QUE NÃO MERECEM ESSA CRENÇA.",
                        "<32>{#p/mettaton}* E ESSA É A MAIOR TRISTEZA DE TODAS.",
                        "<32>{#p/mettaton}* HUMANOS E MONSTROS NÃO DEVERIAM SER INIMIGOS.",
                        '<32>{#p/mettaton}* EM UM UNIVERSO PERFEITO, NOSSAS DUAS ESPÉCIES COEXISTEM EM PAZ.',
                        "<32>{#p/mettaton}* MAS ESTE NÃO É UM UNIVERSO PERFEITO, OU É?",
                        '<32>{#p/mettaton}* ATÉ PORQUE, PESSOAS COMO VOCÊ EXISTEM NELE.',
                        '<32>{#p/napstablook}* uh...\n* mettaton?',
                        '<32>{#p/napstablook}* você está bem?',
                        '<32>{#p/mettaton}* ...\n* O QUE VOCÊ ACHA.',
                        '<32>{#p/napstablook}* .........',
                        '<32>{#p/napstablook}* mettaton, com quem você está falando?',
                        "<32>{#p/mettaton}* BLOOKY, NÃO É IMPORTANTE.",
                        '<32>{#p/napstablook}* deixa eu ver......',
                        '<32>{#p/napstablook}* ...\n* oh...',
                        '<32>{#p/napstablook}* ei, uh... você deixou meu primo com muita raiva.',
                        "<32>{#p/napstablook}* desde que eu descobri que ele era meu primo, eu estive cuidando dele..."
                    ]);
                    if (SAVE.data.b.ubershortcut || !dundyne || !dtoriel) {
                        addB(['<32>{#p/napstablook}* não importa as coisas boas que você fez, ele......']);
                    } else {
                        addB(['<32>{#p/napstablook}* mesmo que os outros humanos sejam inocentes, ele......']);
                    }
                    addB([
                        "<32>{#p/napstablook}* ele tem estado com mais raiva de você a cada dia.",
                        "<32>{#p/napstablook}* eu... estou bem preocupado",
                        "<32>{#p/mettaton}* VOCÊ ESTÁ DIZENDO QUE NÃO DEVERIA TER RAIVA?\n* QUE DEVERIA ESTAR CALMO?",
                        '<32>{#p/mettaton}* AS PESSOAS QUE O HUMANO MATOU NUNCA VÃO VOLTAR.',
                        '<32>{#p/mettaton}* SUAS FAMILIAS NUNCA OS VERÃO NOVAMENTE.',
                        "<32>{#p/mettaton}* EU ESTOU MALUCO SE FICAR CALMO ENFRENTANDO TUDO QUE ELE FEZ!",
                        '<32>{#p/napstablook}* bem... eu só quero que você saiba...',
                        '<32>{#p/napstablook}* ......\n* eu espero que você morra de uma forma bem dolorosa',
                        '<32>{#p/mettaton}* B... BLOOKY, NÃO PRECISA...',
                        "<32>{#p/mettaton}* NÃO É MUITO SEU JEITO DIZER COISAS ASSIM.",
                        "<32>{#p/mettaton}* VOCÊ SÓ ESTÁ DIZENDO ISSO PARA QUE EU ME SINTA MELHOR, CERTO?",
                        "<32>{#p/napstablook}* ......\n* ...... eu não sei",
                        "<36>{#p/mettaton}* EU APRECIO SUA TENTATIVA, MAS É MELHOR QUE VOCÊ FIQUE FORA DISSO.",
                        '<32>{#p/napstablook}* sabe...',
                        '<32>{#p/napstablook}* se você morresse assim......',
                        "<32>{#p/napstablook}* eu não sei se me sentiria mal por você ou não",
                        "<32>{#p/napstablook}* então... isso é tudo",
                        '<32>{#p/mettaton}* ...\n* ... WOW.',
                        "<32>{#p/mettaton}* HONESTAMENTE, ACHO QUE VOU DEIXAR POR ISSO.",
                        '<32>{#p/mettaton}* EU IRIA TE FALAR MAIS SOBRE MINHA FAMÍLIA, MAS... TÁ TUDO RESUMIDO.',
                        '<32>{#p/mettaton}* ALIÁS, É UM FIM QUE TRATA EXATAMENTE SEU \"LEGADO\" COMO ELE DEVE SER TRATADO.',
                        '<32>{#p/mettaton}* ...',
                        '<32>{#p/mettaton}* QUE DESGRAÇA...',
                        '<32>{#s/equip}{#p/event}* Click...'
                    ]);
                }
            } else if (SAVE.data.b.ultrashortcut) {
                k = 'light_ultra'; // NO-TRANSLATE

                m = music.sansdate;
                
                addA([
                    '<32>{#s/phone}{#p/event}* Ring, ring...',
                    '<25>{#p/sans}{#f/0}* opa.',
                    '<25>{#p/sans}{#f/4}* tem alguém aí?',
                    "<25>{#p/sans}{#f/2}* não?\n* bem, eu vou só deixar uma mensagem."
                ]);
                addB([
                    '<25>{#p/sans}{#f/0}* entããão... por onde começar?',
                    '<25>{#p/sans}{#f/3}* ...\n* depois de você ir embora, as coisas ficaram... interessantes.',
                    "<25>{#p/sans}{#f/0}* primeiramente, o desaparecimento de asgore feriu a moral do outpost."
                ]);
                if (dtoriel) {
                    addB(["<25>{#p/sans}{#f/3}* sem mencionar a trágica notícia da morte da atual rainha."]);
                }
                addB([
                    '<25>{#p/sans}{#f/0}* mas alphys, quem deveria tomar a liderança...',
                    '<25>{#p/sans}{#f/2}* parece ter ganhado certa confiança.',
                    '<25>{#p/sans}{#f/0}* foi difícil ela seguir esse caminho inicialmente, mas ela acabou aceitando seu cargo de rainha.'
                ]);
                if (30 <= SAVE.data.n.bully) {
                    addB([
                        "<25>{#p/sans}{#f/3}* então... apesar do medo recém-descoberto das pessoas de sofrerem...",
                        '<26>{#p/sans}{#f/0}* Isso ajudou todos a relaxarem.'
                    ]);
                } else {
                    addB(['<25>{#p/sans}{#f/0}* então isso ajudou todos a seguirem em frente.']);
                }
                addB([
                    "<25>{#p/sans}{#f/0}* eu tenho ajudado ela com conselhos desde então.",
                    "<25>{#p/sans}{#f/3}* ela debateu se deveria fazer a existência dos humanos algo público..."
                ]);
                if (royals < 6) {
                    addB([
                        '<25>{#p/sans}{#f/0}* por fim, decidimos não fazer isso.',
                        '<25>{#p/sans}{#f/0}* seria bom, mas com a morte daqueles cachorros...',
                        "<25>{#p/sans}{#f/3}* ... bem, não seria inteligente.",
                        "<25>{#p/sans}{#f/3}* as opiniões em relação a humanos não tem sido as melhores."
                    ]);
                } else if (SAVE.data.n.exp > 0) {
                    addB([
                        '<25>{#p/sans}{#f/0}* por agora, decidimos não fazer isso.',
                        "<25>{#p/sans}{#f/0}* em algum momento, nós faremos isso.",
                        '<25>{#p/sans}{#f/3}* ... quando o povo estiver pronto.',
                        '<25>{#p/sans}{#f/0}* opiniões sobre a humanidade ainda estão muito mixas esses dias.'
                    ]);
                } else {
                    addB([
                        '<25>{#p/sans}{#f/0}* de primeira, decidimos não fazer isso.',
                        '<25>{#p/sans}{#f/0}* mas, eventualmente, nós entendemos que as pessoas estão prontas.',
                        '<25>{#p/sans}{#f/3}* ... felizmente, eles levaram isso bem.',
                        '<25>{#p/sans}{#f/2}* opiniões sobre a humanidade estão mais positivas.'
                    ]);
                }
                addB([
                    '<25>{#p/sans}{#f/0}* ... entretanto.\n* após aquela decisão ter sido feita...',
                    '<25>{#p/sans}{#f/0}* alphys e eu voltamos nossas atenções para as reformas da guarda real.',
                    "<25>{#p/sans}{#f/3}* é... não éramos muito fãs de como ela funcionava antes."
                ]);
                if (dtoriel) {
                    addB(['<25>{#p/sans}{#f/0}* para dizer o mínimo, então fizemos algumas mudanças.']);
                } else {
                    addB([
                        "<25>{#p/sans}{#f/0}* mesmo a verdadeira rainha, que retornou pouco após você ir embora...",
                        '<25>{#p/sans}{#f/0}* concordou que deveriam haver mudanças.'
                    ]);
                }
                addB([
                    '<25>{#p/sans}{#f/2}* você provavelmente deve saber qual a primeira seria.',
                    "<18>{#p/papyrus}{#f/9}NYEH HEH HEH!\nEXATAMENTE!",
                    "<25>{#p/sans}{#f/0}* oh, ei papyrus.\n* como foi seu turno?",
                    "<18>{#p/papyrus}{#f/0}DEVO DIZER QUE FOI EXCELENTE!"
                ]);
                if (royals < 6) {
                    addB([
                        '<18>{#p/papyrus}{#f/5}ADMITO QUE EU ESTAVA ANSIOSO PARA TRABALHAR COM CÃES.',
                        '<18>{#p/papyrus}{#f/6}MAS... ACHO QUE ATÉ CACHORROS PRECISAM DE FÉRIAS.',
                        "<25>{#p/sans}{#f/3}* ei, tá tudo bem.",
                        "<25>{#p/sans}{#f/2}* você está fazendo um trabalho bom como sempre, não é?"
                    ]);
                } else if (royals < 8) {
                    addB([
                        '<18>{#p/papyrus}{#f/5}ADMITO, A ATMOSFERA LÁ PARECIA... ESTRANHA.',
                        "<18>{#p/papyrus}{#f/6}COMO SE TIVESSE ALGO FALTANDO.",
                        "<25>{#p/sans}{#f/3}* ei, tá tudo bem.",
                        "<25>{#p/sans}{#f/2}* você está fazendo um trabalho bom como sempre, não é?"
                    ]);
                } else {
                    addB([
                        "<18>{#p/papyrus}{#f/5}UNDYNE AINDA ESTÁ SE ACOSTUMADO COMIGO AQUI...",
                        '<18>{#p/papyrus}{#f/0}MAS, ANTES DISSO, ESTÁ TUDO BEM.',
                        '<25>{#p/sans}{#f/2}* feliz em ouvir isso.'
                    ]);
                }
                addB([
                    "<18>{#p/papyrus}{#f/4}QUER DIZER, É NATURAL QUE EU DÊ O MEI MELHOR.",
                    '<18>{#p/papyrus}{#f/9}DEPOIS DE TUDO, EU APRENDI A CAPTURAR UM HUMANO PARA MERECER MINHA POSIÇÃO!',
                    "<18>{#p/papyrus}{#f/0}EU NÃO VOU FICAR PREGUIÇOSO E PERDER DEPOIS DE TUDO QUE EU PASSEI.",
                    '<25>{#p/sans}{#f/0}* claro que não.\n* manter um trabalho assim requer dedicação.',
                    "<18>{#p/papyrus}{#f/4}... VEJO PORQUE VOCÊ PERDEU O SEU.",
                    '<18>{#p/papyrus}{#f/5}ENTRETANTO, VOCÊ ESTÁ INDO BEM EM SEU NOVO TRABALHO, ENTÃO...',
                    "<18>{#p/papyrus}{#f/0}EU VOU DEIXAR PASSAR.",
                    '<25>{#p/sans}{#f/0}* obrigado.\n* conselheiro da rainha não é trabalho fácil.',
                    '<25>{#p/sans}{#f/3}* ela pode ser um pouco neurótica as vezes.',
                    '<25>{#p/sans}{#f/3}* ela pode ser... rápida demais fazendo grandes decisões.',
                    "<25>{#p/sans}{#f/0}* e isso foi antes de você jogar mettaton na jogada.",
                    "<18>{#p/papyrus}{#f/6}METTATON!?!?\n* O QUE -ELE- ESTÁ FAZENDO?",
                    '<25>{#p/sans}{#f/0}* oh, depois que alphys se tornou rainha, ele pensou em \"ir junto.\"',
                    "<25>{#p/sans}{#f/3}* mas seus conselhos... não são dos melhores.",
                    '<25>{#p/sans}{#f/0}* ele só queria tornar o outpost em um complexo de entretenimento.',
                    '<25>{#p/sans}{#f/0}* com seus shows de TV estando na frente e sendo centro, é claro.',
                    "<25>{#p/sans}{#f/3}* é bem bagunçado, sinceramente.",
                    '<18>{#p/papyrus}{#f/4}PARECE QUE ELE PRECISA DE UMA CONVERSA INDIVIDUAL.',
                    "<25>{#p/sans}{#f/0}* talvez.\n* mas você não é tipo, o maior fã dele?",
                    "<18>{#p/papyrus}{#f/7}NÃO QUANDO ELE ESTÁ INTERFERINDO COM SEU TRABALHO!",
                    "<18>{#p/papyrus}{#f/9}... EU ESTAREI DE VOLTA.",
                    '<25>{#p/sans}{#f/0}* ...',
                    "<25>{#p/sans}{#f/3}* eu provavelmente deveria ir e garantir que ele não se meta em bagunça.",
                    '<25>{#p/sans}{#f/0}* mas, antes de eu ir...'
                ]);
                if (hkills > 9) {
                    addB([
                        '<25>{#p/sans}{#f/0}* você talvez tenha matado muitas pessoas, mas...',
                        '<25>{#p/sans}{#f/3}* no fim, você se rendeu e fez a coisa certa.'
                    ]);
                } else if (30 <= SAVE.data.n.bully) {
                    if (SAVE.data.n.exp > 0) {
                        addB([
                            '<25>{#p/sans}{#f/0}* mesmo com as pessoas que você feriu e matou...',
                            '<25>{#p/sans}{#f/3}* no fim, você se rendeu e fez a coisa certa.'
                        ]);
                    } else {
                        addB([
                            '<25>{#p/sans}{#f/0}* você pode ter ferido muitas pessoas, mas...',
                            '<25>{#p/sans}{#f/3}* no fim, você se rendeu e fez a coisa certa.'
                        ]);
                    }
                } else if (SAVE.data.n.exp > 0) {
                    addB([
                        '<25>{#p/sans}{#f/0}* você pode ter cometido alguns erros, mas...',
                        "<25>{#p/sans}{#f/3}* sobre tudo, você não é de todo ruim."
                    ]);
                } else {
                    addB([
                        '<25>{#p/sans}{#f/0}* mesmo que nem todos amem a humanidade...',
                        '<25>{#p/sans}{#f/2}* eu e muitos outros estão positivos em relação a eles, por sua causa.'
                    ]);
                }
                addB([
                    "<25>{#p/sans}{#f/0}* então, não se preocupe.",
                    '<25>{#p/sans}{#f/3}* seja lá o que acontecer contigo aí fora...',
                    '<25>{#p/sans}{#f/2}* só saiba que você tem toda minha proteção.',
                    '<25>{#p/sans}{#f/0}* ...\n* se cuida aí fora, beleza?',
                    '<25>{#p/sans}{#f/3}* ...',
                    "<25>{#p/sans}{#f/3}* te vejo por aí.",
                    '<32>{#s/equip}{#p/event}* Click...'
                ]);
            } else if (SAVE.data.n.exp > 0 || SAVE.data.n.state_foundry_undyne === 1) {
                if (!dundyne) {
                    k = 'light_undyne'; // NO-TRANSLATE

                    
                    addA([
                        '<32>{#s/phone}{#p/event}* Ring, ring...',
                        '<25>{#p/alphys}{#f/4}* O-oi...',
                        '<25>{#p/alphys}{#f/20}* Tem alguém aí?',
                        "<25>{#p/alphys}{#f/11}* ... espero que não seja muito incomodo...",
                        '<25>{#p/alphys}{#f/4}* eu só... queria que você soubesse como as coisas andam por aqui.'
                    ]);
                    addB([
                        '<25>{#p/alphys}{#f/20}* Então... após você fugir, o rei meio que... d-desapareceu.',
                        "<25>{#p/alphys}{#f/14}* Quando eu contei a notícia... isso feriu a moral das pessoas.",
                        '<25>{#p/alphys}{#f/10}* Tecnicamente, como cientista real, eu deveria tomar o lugar dele, mas...',
                        "<25>{#p/alphys}{#f/4}* Eu não pensei que seria o melhor para o trabalho."
                    ]);
                    if (dmettaton) {
                        addB(['<25>{#p/alphys}{#f/4}* especialmente depois do que eu... deixei acontecer com o Mettaton.']);
                    }
                    addB([
                        '<26>{#p/alphys}{#f/20}* Bem, Undyne se aproximou e ofereceu tomar controle...',
                        '<25>{#p/alphys}{#f/20}* Eu concordei e a nomeei como rainha.'
                    ]);
                    if (dpapyrus) {
                        addB(["<25>{#p/alphys}{#f/13}* ... eu fiquei preocupada que ela iria surtar pela morte do Papyrus..."]);
                        if (royals < 2) {
                            addB(['<26>{#p/alphys}{#f/13}* ... sem mencionar o colapso da guarda real...']);
                        } else if (royals < 7) {
                            addB(['<25>{#p/alphys}{#f/13}* ... sem mencionar a perda daqueles guardas...']);
                        }
                    } else if (royals < 2) {
                        addB(["<26>{#p/alphys}{#f/13}* ... eu fiquei preocupada que ela enlouqueceria com o colapso da guarda real..."]);
                    } else if (royals < 7) {
                        addB(["<25>{#p/alphys}{#f/13}* ... eu estava preocupada que ela enlouqueceria pela perda daqueles guardas..."]);
                    } else if (ddoggo) {
                        addB(["<25>{#p/alphys}{#f/13}* ... eu estava preocupada que ela enlouqueceria pela perda do Doggo..."]);
                    } else if (dlesserdog) {
                        addB(["<25>{#p/alphys}{#f/13}* ... eu estava preocupada que ela enlouqueceria pela perda do Canis Minor..."]);
                    } else if (ddogs) {
                        addB(["<25>{#p/alphys}{#f/13}* ... eu estava preocupada que ela enlouqueceria pela perda do casal de cachorros..."]);
                    } else if (dgreatdog) {
                        addB(["<25>{#p/alphys}{#f/13}* ... eu estava preocupada que ela enlouqueceria pela perda do Major Canis..."]);
                    } else if (ddoge) {
                        addB(["<25>{#p/alphys}{#f/13}* ... eu estava preocupada que ela enlouqueceria pela perda de Doge..."]);
                    } else if (droyalguards) {
                        addB(["<25>{#p/alphys}{#f/13}* ... eu estava preocupada que ela enlouqueceria pela perda da 03 e 04..."]);
                    } else if (dmadjick) {
                        addB(["<25>{#p/alphys}{#f/13}* ... eu estava preocupada que ela enlouqueceria pela morte do Cozmo..."]);
                    } else if (dknightknight) {
                        addB(["<25>{#p/alphys}{#f/13}* ... eu estava preocupada que ela enlouqueceria pela morte da Terrestria..."]);
                    } else if (dtoriel) {
                        addB(["<25>{#p/alphys}{#f/13}* ... eu estava preocupada ela se perderia a mente pela morte da verdadeira rainha..."]);
                    } else if (dmuffet) {
                        addB(["<25>{#p/alphys}{#f/13}* ... eu estava preocupada que ela enlouqueceria pela morte da rainha das aranhas..."]);
                    } else if (dmettaton) {
                        addB(["<25>{#p/alphys}{#f/13}* ... eu estava preocupada que ela enlouqueceria pela morte do Mettaton..."]);
                    } else if (hkills > 1) {
                        addB(["<25>{#p/alphys}{#f/13}* ... eu estava preocupada que ela enlouqueceria pela morte daqueles monstros..."]);
                    } else {
                        addB(["<25>{#p/alphys}{#f/13}* ... eu estava preocupada que ela enlouqueceria pela morte daquele monstro..."]);
                    }
                    if (royals < 2) {
                        addB(['<25>{#p/alphys}{#f/17}* Mas tudo que ela fez foi reestabelecer a Guarda Real e suas forças.']);
                    } else {
                        addB(["<25>{#p/alphys}{#f/17}* Mas tudo que ela fez foi aumentar a força da Guarda Real."]);
                    }
                    if (SAVE.data.b.undyne_respecc) {
                        addB(['<25>{#p/alphys}{#f/19}* E... fazer uma fala sobre como humanos são guerreiros sem honra.']);
                    } else if (2.1 <= SAVE.data.n.plot_date) {
                        addB(['<25>{#p/alphys}{#f/19}* E... fazer uma fala sobre humanos são traidores que apunhalam as costas de quem os confiou.']);
                    } else {
                        addB(['<25>{#p/alphys}{#f/19}* E... fazer uma fala sobre como humanos são assassinos sem remorso.']);
                    }
                    if (royals < 6 || mdeaths > 9) {
                        addB(['<25>{#p/alphys}{#f/20}* Uma fala que... colocou muitas pessoas do lado dela.']);
                        if (30 <= SAVE.data.n.bully) {
                            addB(["<25>{#p/alphys}{#f/26}* ... sair surrando todo mundo não te ajudou muito."]);
                        } else {
                            addB([
                                '<25>{#p/alphys}{#f/5}* ... monstros não confiam nem um pouco mais em humanos após tudo que aconteceu.'
                            ]);
                        }
                    } else {
                        addB(['<25>{#p/alphys}{#f/20}* Uma fala que colocou muitas pessoas do lado dela...']);
                        if (30 <= SAVE.data.n.bully) {
                            addB(['<25>{#p/alphys}{#f/26}* ... depois de eles se lembrarem da forma que você os espancou.']);
                        } else {
                            addB([
                                "<25>{#p/alphys}{#f/20}* ... depois que ela mencionou o estado do desaparecimento de ASGORE."
                            ]);
                        }
                    }
                    addB([
                        '<25>{#p/alphys}{#f/10}* Já para os humanos ainda vivos no Outpost...?',
                        "<25>{#p/alphys}{#f/4}* Bem, após o que ela disse, eu... não queria tomar nenhuma chance.",
                        '<25>{#p/alphys}{#f/20}* Então... eu mandei o arquivo para uma casa de pináculo em Aerialis.',
                        '<25>{#p/alphys}{#f/20}* Em segredo.',
                        '<25>{#p/alphys}{#f/5}* ... Undyne viu a falta de humanos, ou... ALMAS humanas, e...',
                        "<25>{#p/alphys}{#f/10}* Assumiu que elas tinham se perdido, também."
                    ]);
                    if (dtoriel) {
                        addB([
                            '<25>{#p/alphys}{#f/3}* Eu, ahah, tentei falar com ela sobre seu anúncio em público, mas...',
                            '<25>{#p/alphys}{#f/3}* ... eu não pude fazer nada...!',
                            "<25>{#p/alphys}{#f/30}* ...\n* Todo mundo pensa que voltamos para verdadeiro foco agora."
                        ]);
                        if (dpapyrus) {
                            addB([
                                "<25>{#p/alphys}{#f/31}* Muitos perderam a esperança de que um dia sairemos daqui.",
                                '<25>{#p/alphys}{#f/31}* ...',
                                "<25>{#p/alphys}{#f/30}* Pessoas estão com raiva.\n* Elas estão com medo e elas querem ser livres.",
                                "<25>{#p/alphys}{#f/31}* Eu não sei por quanto tempo conseguirei manter este segredo de todo mundo.",
                                '<25>{#p/sans}{#f/0}* ei, você ainda está falando sozinha aí?',
                                "<25>{#p/sans}{#f/3}* vamos lá, os humanos precisam do seu check diário.",
                                '<25>{#p/alphys}{#f/20}* Uh... poderia vir aqui só um momento?',
                                '<25>{#p/sans}{#f/0}* aqui vou.',
                                "<25>{#p/sans}{#f/0}* ... e aqui estou.",
                                "<25>{#p/alphys}{#f/20}* Então... eu não estou falando sozinha na verdade.",
                                "<25>{#p/alphys}{#f/19}* Na verdade eu estou deixando uma mensagem para o humano.\n* Está gravando agora...",
                                '<25>{#p/sans}{#f/0}* hmm... eu entendo.',
                                '<25>{#p/sans}{#f/2}* tem problema eu pegar aí, enquanto você cuida das crianças?',
                                "<26>{#p/alphys}{#f/5}* C-claro, eu... vou lá fazer isso.",
                                '<25>{#p/sans}{#f/3}* ...',
                                "<25>{#p/sans}{#f/0}* ok, olha, eu não vou tomar muito do seu tempo.",
                                '<25>{#p/sans}{#f/0}* pra ser sincero, eu só peguei o telefone pra poder desligar a ligação.',
                                '<25>{#p/sans}{#f/3}* alphys tem esse hábito de fazer ligações que só estressam ela.',
                                '<25>{#p/sans}{#f/0}* mas... antes de eu ir.',
                                "<25>{#p/sans}{#f/0}* as falas da undyne não foram as únicas notícias ruins que recebemos.",
                                "<26>{#p/sans}{#f/3}* as notícias da verdadeira rainha estar morta acertou todos no peito.",
                                '<25>{#p/sans}{#f/0}* lojas fecharam, pessoas saíram de seus trabalhos...',
                                "<25>{#p/sans}{#f/0}* eles dizem que a moral está mais baixa do que nunca.",
                                "<25>{#p/sans}{#f/2}* ... no lado bom, pelo menos o grillbys tem muitos clientes agora.",
                                '<25>{#p/sans}{#f/3}* mas nenhuma quantidade de comida industrializada pode compensar a perda do meu...',
                                '<26>{#p/sans}{#f/3}* ... bem, acho que você sabe quem.',
                                '<26>{#p/sans}{#f/0}* ...',
                                "<25>{#p/sans}{#f/0}* a reputação da humanidade está bem terrível, agora.",
                                '<25>{#p/sans}{#f/0}* alphys e eu vamos fazer nosso melhor para proteger o próximo humano que vier...',
                                "<25>{#p/sans}{#f/3}* mas eu não vou ficar surpreso se ele acabar sendo morto.",
                                "<25>{#p/sans}{#f/0}* ... é assim que as coisas são agora.",
                                '<25>{#p/alphys}{#f/27}* Uh, ei, desculpa interromper, mas...',
                                '<26>{#p/alphys}{#f/20}* Eu acho que temos um... p-pequeno problema.',
                                '<25>{#p/sans}{#f/0}* eh, eu já disse tudo que eu queria.',
                                "<25>{#p/sans}{#f/0}* eu vou desligar agora.",
                                '<25>{#p/sans}{#f/3}* ... adeus.',
                                '<32>{#s/equip}{#p/event}* Click...'
                            ]);
                        } else {
                            addB([
                                '<18>{#p/papyrus}{#f/0}TODOS, EXCETO VOCÊ, EU E MEU IRMÃO!',
                                '<25>{#p/alphys}{#f/27}* Oh, ei Papyrus.\n* Eu recebo isso, o arquivo ainda está funcionando?',
                                '<18>{#p/papyrus}{#f/0}CLARO QUE ESTÁ!',
                                '<18>{#p/papyrus}{#f/9}EU TAMBÉM DEI AOS HUMANOS SEU CHECK DIÁRIO!',
                                '<25>{#p/alphys}{#f/10}* Incrível, obrigada.',
                                "<25>{#p/alphys}{#f/10}* ... talvez... você queira falar algumas coisas para o humano...?",
                                "<25>{#p/alphys}{#f/5}* Eu estou deixando uma mensagem sobre o que aconteceu desde que eles se foram.",
                                '<18>{#p/papyrus}{#f/0}OH, MAS QUE BOM!',
                                "<18>{#p/papyrus}{#f/0}... OLÁ, HUMANO.\nACREDITO QUE VOCÊ ESTEJA BEM.",
                                "<18>{#p/papyrus}{#f/5}TEM SIDO DIFÍCIL MANTER SEGREDO DE TODO MUNDO...",
                                "<18>{#p/papyrus}{#f/6}ESPECIALMENTE QUANDO ESTÁ TODO MUNDO TÃO TRISTE!!!",
                                "<18>{#p/papyrus}{#f/5}TODAS ESSAS PESSOAS PENSANDO QUE NUNCA IRÃO SER LIVRES...",
                                '<18>{#p/papyrus}{#f/5}PERGUNTANDO SE AINDA TEM FUTURO...',
                                "<18>{#p/papyrus}{#f/0}MAS EI!!\nTUDO FICARÁ BEM!!",
                                "<18>{#p/papyrus}{#f/5}UM DIA, ELES IRÃO DESCOBRIR A VERDADE...",
                                '<18>{#p/papyrus}{#f/0}E A VERDADE OS LIBERTARÁ.',
                                "<25>{#p/alphys}{#f/8}* Papyrus, por que você não fala para eles sobre seu novo trabalho?",
                                '<18>{#p/papyrus}{#f/0}AH, CLARO!!\nCOMO EU PODERIA ME ESQUECER!?',
                                '<18>{#p/papyrus}{#f/0}... UNDYNE FINALMENTE PERMITIU MINHA ENTRADA NA GUARDA REAL.',
                                "<18>{#p/papyrus}{#f/4}TECNICAMENTE, SOU O OFICIAL DE MORAL DA GUARDA...",
                                '<18>{#p/papyrus}{#f/0}MAS AINDA FAÇO UM TRABALHO BEM IMPORTANTE!',
                                "<18>{#p/papyrus}{#f/5}ENTENDA, UM GUARDA NÃO PODE FAZER SEU MELHOR...",
                                "<18>{#p/papyrus}{#f/5}SE ELE ESTIVER DEPRIMIDO.",
                                "<18>{#p/papyrus}{#f/0}ENTÃO... É AÍ QUE EU ENTRO!",
                                '<18>{#p/papyrus}{#f/4}HM, METAFORICAMENTE É CLARO.',
                                "<18>{#p/papyrus}{#f/4}EU NÃO VOU ENTRAR DE VERDADE EM NINGUÉM.",
                                "<18>{#p/papyrus}{#f/7}... ISSO SERIA BEM ESTRANHO!!!",
                                "<18>{#p/papyrus}{#f/5}É ESTRANHO...\nELAS NUNCA PARECEM VOLTAR.",
                                "<25>{#p/alphys}{#f/10}* Eheh, não se preocupe sobre isso.",
                                '<25>{#p/alphys}{#f/3}* Elas devem estar tão obcecadas com o lixo que nunca vão embora!',
                                '<18>{#p/papyrus}{#f/0}É...\nDEVE SER ISSO.',
                                '<18>{#p/papyrus}{#f/5}...',
                                "<18>{#p/papyrus}{#f/5}EU AINDA ESTOU MEU CONFUSO.",
                                '<25>{#p/alphys}{#f/31}* ... é.',
                                "<25>{#p/sans}{#f/0}* oh.\n* ei pessoal.\n* desculpa pelo atraso.",
                                '<25>{#p/sans}{#f/2}* as pessoas no andar abaixo do nosso queriam que eu fizesse café da manhã.',
                                "<25>{#p/alphys}{#f/25}* Bem, não seriam eles apenas uns necessitados por comida.",
                                '<18>{#p/papyrus}{#f/7}UGH... MORAR EM UMA CASA DE PINÁCULO DEVE SER TÃO IRRITANTE!!',
                                '<18>{#p/papyrus}{#f/4}ELES NÃO SABEM COZINHAR POR CONTA PRÓPRIA?',
                                "<25>{#p/sans}{#f/0}* quer dizer, eu não posso culpa-los.",
                                "<25>{#p/sans}{#f/0}* após o anúncio da undyne sobre nosso progresso e...",
                                "<25>{#p/sans}{#f/0}* aquelas notícias sobre a morte da verdadeira rainha...?",
                                "<25>{#p/sans}{#f/3}* eu provavelmente gostaria que alguém cozinhasse para mim, também.",
                                "<25>{#p/sans}{#f/2}* mas ei.\n* é por isso que eu tenho você.",
                                '<18>{#p/papyrus}{#f/0} EXATAMENTE!\nQUEM PRECISA DE ALGUÉM PARA COZINHAR...',
                                '<18>{#p/papyrus}{#f/9}... QUANDO VOCÊ TEM O PRIMEIRO E ÚNICO GRANDE PAPYRUS!',
                                '<26>{#p/sans}{#f/0}* heh.',
                                '<26>{#p/sans}{#f/0}* bem, eu provavelmente deveria ir naquele café da manhã, agora.',
                                '<26>{#p/sans}{#f/3}* papyrus, você se importaria de vir comigo?',
                                "<18>{#p/papyrus}{#f/0}MAS É CLARO!\nESTAREI LOGO ATRÁS DE VOCÊ!",
                                '<26>{#p/sans}{#f/0}* certo, então.\n* ... lá vamos nós!',
                                '<25>{#p/alphys}{#f/17}* boa sorte.',
                                '<25>{#p/alphys}{#f/17}* ...',
                                '<25>{#p/alphys}{#f/5}* Eu acho que vou desligar agora.',
                                '<25>{#p/alphys}{#f/6}* Olha, se isso chegar até você, então...',
                                "<25>{#p/alphys}{#f/14}* Eu espero que você esteja melhor do que a gente agora.",
                                '<25>{#p/alphys}{#f/20}* ...',
                                '<25>{#p/alphys}{#f/20}* Até mais.',
                                '<32>{#s/equip}{#p/event}* Click...'
                            ]);
                        }
                    } else {
                        addB([
                            '<25>{#p/alphys}{#f/5}* F-felizmente, a verdadeira rainha voltou e...',
                            '<25>{#p/alphys}{#f/5}* Eu consegui convencer ela a não fazer um anúncio sobre isso.',
                            '<25>{#p/alphys}{#f/10}* Teve uma tensão entre elas no começo, mas...',
                            "<25>{#p/alphys}{#f/6}* ... as coisas parecem estar de volta ao normal, agora."
                        ]);
                        if (dpapyrus) {
                            addB([
                                '<25>{#p/alphys}{#f/4}* A única diferença de antes é...',
                                '<25>{#p/alphys}{#f/17}* ... eu tive que manter o arquivo em segredo.',
                                "<25>{#p/alphys}{#f/20}* Bem, acho que isso não é muita diferença.",
                                "<25>{#p/alphys}{#f/14}* É só muito estranho não ter... ninguém por perto para ajudar.",
                                '<25>{#p/sans}{#f/0}* Ei, cê se esqueceu de mim?',
                                "<25>{#p/alphys}{#f/2}* O-oh, uh, isso não é o que eu quis dizer!",
                                "<25>{#p/sans}{#f/3}* ei, eu entendo.\n* não é a mesma coisa que era com o asgore.",
                                "<25>{#p/sans}{#f/0}* mas eu gosto de pensar que faço um ótimo trabalho.",
                                '<25>{#p/alphys}{#f/6}* É... você faz.',
                                '<26>{#p/alphys}{#f/5}* Eu só sinto falta de tê-lo por perto e tudo.',
                                '<25>{#p/sans}{#f/3}* ... por sinal...',
                                '<25>{#p/sans}{#f/0}* você provavelmente deveria dar aos humanos o check diário.',
                                "<25>{#p/sans}{#f/2}* eu posso ficar com o celular enquanto você vai lá.",
                                "<26>{#p/alphys}{#f/6}* Parece bom.\n* Eu vou fazer isso.",
                                '<25>{#p/sans}{#f/3}* ...'
                            ]);
                            if (hkills === 1) {
                                addB([
                                    '<25>{#p/sans}{#f/0}* Aqui estamos, então.',
                                    "<25>{#p/sans}{#f/0}* Agora que você foi embora, eu tenho me perguntado...",
                                    '<25>{#p/sans}{#f/3}* \"Por que eles se esforçariam apenas para matá-lo?\"',
                                    "<25>{#p/sans}{#f/0}* e eu não estou falando do asgore.",
                                    '<25>{#p/sans}{#f/3}* ...',
                                    '<25>{#p/sans}{#f/3}* eu acho que ambos sabemos o motivo.',
                                    "<25>{#p/sans}{#f/3}* eu acho que ambos sabemos que não foi defesa pessoal.",
                                    "<25>{#p/sans}{#f/0}* vamos lá.\n* sejamos honestos aqui.",
                                    "<25>{#p/sans}{#f/0}* você só fez isso pra saber o que iria acontecer.",
                                    "<25>{#p/sans}{#f/0}* pra ver o que eu teria pra dizer.",
                                    '<25>{#p/sans}{#f/0}* bem, parabéns!\n* tá aí sua resposta, mané!',
                                    "<25>{#p/sans}{#f/0}* espero que você esteja feliz com o que aconteceu.",
                                    "<27>{#p/sans}{#f/3}* brincadeira.\n* eu não espero isso.",
                                    "<27>{#p/sans}{#f/0}* ... bem, isso é tudo.",
                                    '<27>{#p/darksans}{#f/1}{#i/5}* ...',
                                    '<32>{#s/equip}{#p/event}* Click...'
                                ]);
                            } else {
                                addB([
                                    "<25>{#p/sans}{#f/0}* ei.\n* espero que você esteja bem.",
                                    "<25>{#p/sans}{#f/0}* em boa parte, estamos indo bem, também.",
                                    '<25>{#p/sans}{#f/3}* pessoas ainda seguem com suas vidas, dia após dia...',
                                    '<25>{#p/sans}{#f/0}* esperando pelo próximo humano que virá e nos dará liberdade.'
                                ]);
                                if (hkills > 9) {
                                    addB([
                                        '<25>{#p/sans}{#f/0}* ... eu só queria poder dizer o mesmo ao meu irmão.',
                                        '<25>{#p/sans}{#f/3}* e as outras pessoas que você matou.'
                                    ]);
                                } else {
                                    addB(['<25>{#p/sans}{#f/3}* ... eu só queria poder dizer o mesmo sobre meu irmão.']);
                                }
                                addB([
                                    '<25>{#p/sans}{#f/3}* ...',
                                    '<25>{#p/sans}{#f/3}* hmm...\n* o que mais eu deveria mencionar?',
                                    '<26>{#p/sans}{#f/0}* ... certo.\n* as novas formas de viver.',
                                    '<25>{#p/sans}{#f/3}* então, depois da verdadeira rainha retornar...',
                                    '<25>{#p/sans}{#f/0}* eu e ela nos reconhecemos e começamos a conversar.',
                                    '<25>{#p/sans}{#f/0}* uma coisa levou a outra, e...',
                                    '<25>{#p/sans}{#f/0}* ela concordou em se mudar comigo para minha casa na cidade de Starton.',
                                    "<25>{#p/sans}{#f/0}* ... claro.\n* ficamos bem animados em relação a isso.",
                                    '<25>{#p/sans}{#f/3}* os livros que eu dei pra ela, as receitas que ela tentou me ensinar...',
                                    "<25>{#p/sans}{#f/0}* mas... você sabe...",
                                    '<25>{#p/sans}{#f/3}* nada disso preencheu a falta que papyrus faz.',
                                    '<25>{#p/sans}{#f/3}* ela ainda se sente muito mau em relação a isso.',
                                    '<25>{#p/sans}{#f/0}* não apenas porque ela se importa comigo, mas também...',
                                    '<25>{#p/sans}{#f/0}* porque ela se importava com você.',
                                    "<25>{#p/sans}{#f/3}* você pode imaginar como ela se sentiu quando descobriu o que você fez.",
                                    '<25>{#p/sans}{#f/0}* alerta de spoiler.\n* nada bem.',
                                    "<25>{#p/sans}{#f/3}* ... e o público também não pareceu se sentir muito bem.",
                                    '<25>{#p/sans}{#f/0}* pelo menos para os termos da sua reputação.',
                                    '<25>{#p/sans}{#f/0}* ainda assim.\n* poderia ter sido pior.',
                                    '<25>{#p/sans}{#f/0}* pelo lá no fim, alphys e eu estamos muito confiantes...',
                                    '<25>{#p/sans}{#f/3}* em nossa habilidade de escoltar o próximo humano com segurança.',
                                    "<25>{#p/sans}{#f/0}* então, isso foi alguma coisa.",
                                    '<25>{#p/alphys}{#f/27}* Uh, ei, desculpa interromper, mas...',
                                    '<26>{#p/alphys}{#f/20}* Eu acho que temos um... p-pequeno problema.',
                                    "<25>{#p/sans}{#f/3}* pois bem.\n* parece que vamos ter que cortar isso mais cedo.",
                                    "<25>{#p/sans}{#f/0}* só... pensa sobre o que eu falei, beleza?",
                                    '<25>{#p/sans}{#f/0}* ...',
                                    "<25>{#p/sans}{#f/0}* ... bem, isso é tudo.",
                                    '<32>{#s/equip}{#p/event}* Click...'
                                ]);
                            }
                        } else {
                            addB([
                                "<18>{#p/papyrus}{#f/0}É!!\nELE REALMENTE NÃO É DE TODO MAU!",
                                '<18>{#p/papyrus}{#f/5}TIRANDO DE TODA A GUARDA DE SEGREDOS.',
                                '<18>{#p/papyrus}{#f/5}NÃO MUITO FÃ DESSA COISA EM PARTICULAR.',
                                '<25>{#p/alphys}{#f/11}* Mas se Undyne acabar descobrindo, então...',
                                "<18>{#p/papyrus}{#f/4}SIM, SIM, EU SEI O QUE VOCÊ VAI DIZER.",
                                "<18>{#p/papyrus}{#f/4}ELA FICARIA IRADA E TOMARIA AS ALMAS HUMANAS.",
                                "<18>{#p/papyrus}{#f/7}VOCÊ NÃO PRECISA ME RELEMBRAR!!",
                                "<25>{#p/alphys}{#f/23}* Ele tem argumentado comigo bastante sobre isso.",
                                '<18>{#p/papyrus}{#f/5}(CHORINHO...)',
                                '<18>{#p/papyrus}{#f/5}EU SINTO QUE PODERÍAMOS CONVENCER ELA SE TENTÁSSEMOS.',
                                "<25>{#p/alphys}{#f/3}* ... Papyrus, por que você não conta sobre seu novo trabalho?",
                                '<18>{#p/papyrus}{#f/0}AH, CLARO!!\nCOMO EU PODERIA ME ESQUECER!?',
                                '<18>{#p/papyrus}{#f/0}... UNDYNE FINALMENTE PERMITIU MINHA ENTRADA NA GUARDA REAL.',
                                "<18>{#p/papyrus}{#f/9}EU SOU O MAIS NOVO EXPERT TREINADOR DA GUARDA!",
                                '<18>{#p/papyrus}{#f/0}ENTÃO... ENQUANTO UNDYNE TREINA OS GUARDAS...',
                                "<18>{#p/papyrus}{#f/0}EU SOU RESPONSÁVEL POR MANTÊ-LOS MOTIVADOS!",
                                "<18>{#p/papyrus}{#f/9}ACABA QUE EU SOU MUITO BOM NISSO, TAMBÉM!",
                                '<18>{#p/papyrus}{#f/2}SUAS PALAVRAS E A MINHA.',
                                "<25>{#p/alphys}{#f/5}* Parece legal.\n* Talvez eu te visite no trabalho qualquer hora.",
                                "<18>{#p/papyrus}{#f/0}CLARO, EU TE DEIXO VISITAR.",
                                '<18>{#p/papyrus}{#f/4}DEPOIS DE VOCÊ CONCORDAR EM ME CONTAR A UNDYNE NOSSO SEGREDO.',
                                '<25>{#p/alphys}{#f/20}* ...',
                                '<18>{#p/papyrus}{#f/0}ENTÃO, QUE TAL ISSO?\nEU, VOCÊ, UNDYNE, CONVENCIMENTO?',
                                "<25>{#p/sans}{#f/0}* ... huh?\n* sobre o que seria isso?",
                                "<25>{#p/sans}{#f/3}* desculpa por estar atrasado, aliás.",
                                '<25>{#p/sans}{#f/2}* as pessoas no andar abaixo da gente queriam que eu fizesse café da manhã.',
                                "<25>{#p/alphys}{#f/25}* Bem, não seriam eles apenas uns necessitados por comida.",
                                "<18>{#p/papyrus}{#f/4}VOCÊ NÃO VAI CONTAR PRA ELES SOBRE O QUE CONVERSAMOS?",
                                '<25>{#p/alphys}{#f/32}* ...',
                                '<25>{#p/alphys}{#f/3}* Papyrus pensa que deveríamos contar a verdade para Undyne.',
                                "<25>{#p/sans}{#f/3}* você realmente acha que isso daria certo, mano?",
                                '<18>{#p/papyrus}{#f/0}BEM, COMO UM MEMBRO DA GUARDA REAL...',
                                '<18>{#p/papyrus}{#f/0}MINHA OPINIÃO -DEVE- TER ALGUM PESO!',
                                "<25>{#p/sans}{#f/0}* hmm... normalmente eu diria não para algo assim, mas...",
                                '<25>{#p/sans}{#f/0}* undyne parece ter certo respeito por você.',
                                "<25>{#p/sans}{#f/3}* aliás, eu venho pensando sobre isso também.",
                                "<25>{#p/alphys}{#f/22}* B-BEM NÃO VÁ DIZENDO NADA ATÉ EU DAR OKAY!",
                                "<25>{#p/sans}{#f/2}* eu nem sonharia com isso.",
                                "<18>{#p/papyrus}{#f/0}EXATO!!\nVAMOS SÓ IMAGINAR O CENÁRIO EM NOSSAS CABEÇAS.",
                                '<18>{#p/papyrus}{#f/5}AH NÃO SER QUE ISSO CONTE COMO SONHAR.',
                                '<26>{#p/sans}{#f/0}* heh.',
                                '<26>{#p/sans}{#f/0}* bem, eu provavelmente deveria ir fazer aquela comida agora.',
                                '<26>{#p/sans}{#f/3}* papyrus, você se importaria de vir comigo?',
                                "<18>{#p/papyrus}{#f/0}MAS É CLARO!\nESTAREI LOGO ATRÁS DE VOCÊ!",
                                '<26>{#p/sans}{#f/0}* certo, então.\n* ... lá vamos nós!',
                                '<25>{#p/alphys}{#f/17}* boa sorte.',
                                '<25>{#p/alphys}{#f/17}* ...',
                                '<25>{#p/alphys}{#f/5}* Pra ser honesta...',
                                '<25>{#p/alphys}{#f/5}* Seria ótimo não precisar esconder tudo isso.',
                                "<25>{#p/alphys}{#f/6}* Então... talvez, se existe realmente qualquer chance disso dar certo...",
                                '<25>{#p/alphys}{#f/6}* ...',
                                "<25>{#p/alphys}{#f/8}* E-eu vou pensar sobre isso após eu desligar o telefone.",
                                '<25>{#p/alphys}{#f/10}* ...',
                                '<25>{#p/alphys}{#f/16}* C-cuide-se!',
                                '<32>{#s/equip}{#p/event}* Click...'
                            ]);
                        }
                    }
                } else if (!dtoriel) {
                    if (SAVE.data.b.w_state_lateleave) {
                        k = 'light_runaway'; // NO-TRANSLATE

                        
                        addA([
                            '<32>{#s/phone}{#p/event}* Ring, ring...',
                            '<25>{#p/toriel}{#f/1}* Olá?',
                            '<25>{#p/toriel}{#f/5}* Aqui é... Toriel.',
                            '<25>{#p/toriel}{#f/1}* ... Eu sei que não nos separamos da melhor forma, mas...',
                            '<25>{#p/toriel}{#f/5}* Eu sinto que você precisa entender tudo que aconteceu desde que se foi.'
                        ]);
                        addB([
                            '<25>{#p/toriel}{#f/9}* Depois que você foi embora, eu reconsiderei minhas decisões.',
                            '<25>{#p/toriel}{#f/13}* Eu senti... culpa.\n* Por tentar te manter nas Outlands.',
                            '<25>{#p/toriel}{#f/13}* Por tentar manter TODOS OS humanos lá.',
                            '<25>{#p/toriel}{#f/9}* Eu decide não ficar por lá mais nem um segundo.',
                            '<26>{#p/toriel}{#f/13}* Eu trabalhei muito na coragem para sair, e retornei a Cidadela.',
                            '<25>{#p/toriel}{#f/18}* ... quando eu vi que os humanos estavam presos naquelas caixas...',
                            '<25>{#p/toriel}{#f/13}* Eu os libertei sem pensar.',
                            '<26>{#p/toriel}{#f/10}* Eu não queria que eles estivessem presos como eu quis que você estivesse.',
                            '<25>{#p/toriel}{#f/9}* ... mas essa decisão não veio sem consequências.',
                            "<25>{#p/toriel}{#f/13}* Não apenas os humanos estavam traumatizados pelo arquivo de ASGORE...",
                            '<25>{#p/toriel}{#f/13}* Mas um deles fugiu e foi descoberto pelo povo.',
                            '<25>{#p/toriel}{#f/18}* Eu não queria mantê-los aqui contra sua vontade, mas...',
                            "<25>{#p/toriel}{#f/9}* A morte da capitã da Guarda Real e a perda do rei...",
                            "<25>{#p/toriel}{#f/9}* ... colocou a reputação da humanidade em uma posição bastante difícil.",
                            '<25>{#p/toriel}{#f/13}* Com o público sabendo a verdade em relação aos humanos...',
                            '<25>{#p/toriel}{#f/9}* Eu não tive chances se não esconde-los aonde estariam seguros.',
                            '<25>{#p/alphys}{#f/15}* Uh, sem querer interromper, mas... você tem visita.',
                            '<25>{#p/toriel}{#f/10}* Deixa eu adivinhar.\n* Sans?',
                            '<25>{#p/alphys}{#f/3}* ...',
                            '<25>{#p/toriel}{#f/0}* Não há necessidade de ser tão formal quando ele é quem está no portão.',
                            '<25>{#p/toriel}{#f/9}* Sistema, destrave o portão, autorização Toriel TORTA-1-1-0.',
                            "<25>{#p/sans}{#f/0}* ...\n* já era hora.",
                            '<25>{#p/sans}{#f/0}* você ainda está no telefone com o humano?',
                            '<25>{#p/alphys}{#f/23}* No O QUE!?',
                            '<25>{#p/toriel}{#f/0}* Sim, eu pensei que seria legal se ele ouvisse de você, Sans.',
                            '<25>{#p/toriel}{#f/1}* Talvez Alphys queira se juntar também?',
                            '<25>{#p/alphys}{#f/21}* ...',
                            '<25>{#p/alphys}{#f/21}* Não.\n* Alphys não quer.',
                            '<25>{#p/alphys}{#f/21}* Na verdade, Alphys gostaria de se retirar agora.',
                            "<25>{#p/alphys}{#f/24}* ... Ei estarei lá fora se você precisar de mim.",
                            '<25>{#p/sans}{#f/0}* ...',
                            '<25>{#p/toriel}{#f/5}* ...'
                        ]);
                        if (SAVE.data.n.state_foundry_undyne === 1) {
                            addB(["<25>{#p/sans}{#f/3}* ela... ainda está com muita raiva sobre o que aconteceu com a undyne."]);
                        } else {
                            addB(["<25>{#p/sans}{#f/3}* ela... ainda está com muita raiva em relação ao que você fez com undyne."]);
                        }
                        if (dmettaton) {
                            addB(['<25>{#p/sans}{#f/0}* sem mencionar o amigo dela, mettaton.']);
                        } else {
                            addB(["<25>{#p/sans}{#f/0}* sobre o que ela teve que fazer como resultado."]);
                        }
                        if (dpapyrus) {
                            addB([
                                '<25>{#p/sans}{#f/3}* e você sabe o que?',
                                '<25>{#p/sans}{#f/0}* eu já entendi.',
                                '<25>{#p/sans}{#f/0}* eu sei pelo que a alphys está passando agora.',
                                '<25>{#p/sans}{#f/0}* depois de tudo...',
                                "<25>{#p/sans}{#f/3}* ela não é a única que perdeu alguém."
                            ]);
                        } else {
                            if (SAVE.data.n.state_foundry_undyne === 1) {
                                if (dmettaton) {
                                    addB([
                                        "<25>{#p/sans}{#f/3}* e enquanto eu não te culpo pelo que você fez, ou não fez..."
                                    ]);
                                } else {
                                    addB(["<25>{#p/sans}{#f/3}* e enquanto eu não te culpo por fugir..."]);
                                }
                            } else {
                                addB(["<25>{#p/sans}{#f/3}* e enquanto eu não te culpo por tentar se defender..."]);
                            }
                            addB([
                                "<25>{#p/sans}{#f/0}* eu me pergunto se não existe outra forma melhor das quais as coisas poderiam ter acontecido.",
                                '<25>{#p/sans}{#f/0}* se, de alguma forma, isso tudo poderia ter sido evitado.',
                                '<25>{#p/sans}{#f/3}* mas eu dúvido.',
                                "<25>{#p/sans}{#f/0}* a muito o que fazer no presente para se preocupar com o passado."
                            ]);
                        }
                        if (royals < 2) {
                            addB([
                                '<25>{#p/sans}{#f/0}* ...',
                                "<25>{#p/sans}{#f/0}* tem sido difícil sem a presença da Guarda Real para nos proteger.",
                                '<25>{#p/sans}{#f/3}* não que eu fosse super fã desses caras, mas...',
                                "<25>{#p/sans}{#f/0}* em tempos assim, era ótimo tê-los por perto.",
                                '<25>{#p/toriel}{#f/13}* Sim, infelizmente, sou tentada a concordar.',
                                '<25>{#p/toriel}{#f/13}* Não tem um dia sequer em que não apareça um cidadão com raiva no portão.',
                                '<25>{#p/toriel}{#f/9}* Mas não há como ajudar.',
                                '<25>{#p/toriel}{#f/9}* Há poucos que compartilham minha disposição de tratar os humanos como indivíduos.',
                                '<32>{#p/human}{#v/1}{@fill=#42fcff}* Toriel, estamos em perigo?',
                                '<25>{#p/toriel}{#f/1}* ... oh, olá!',
                                '<25>{#p/toriel}{#f/0}* Não se preocupe, minha criança.\n* Eu sempre estarei aqui para te proteger.',
                                '<32>{#p/human}{#v/1}{@fill=#42fcff}* ... obrigado.',
                                '<25>{#p/toriel}{#f/0}* Agora, por favor volte e espere com os outros.',
                                '<25>{#p/toriel}{#f/0}* Eu estarei contigo o mais cedo possível.',
                                "<32>{#p/human}{#v/1}{@fill=#42fcff}* Certo, eu vou indo...",
                                '<25>{#p/toriel}{#f/10}* ... muito bem.',
                                '<25>{#p/toriel}{#f/9}* ...'
                            ]);
                            if (dpapyrus) {
                                addB([
                                    '<25>{#p/toriel}{#f/10}* Suponho que não posso julgar os cidadãos com muita severidade...',
                                    '<25>{#p/toriel}{#f/9}* ... sabendo os tipos de decisões que você fez durante o tempo em que esteve aqui.',
                                    '<25>{#p/toriel}{#f/13}* Foi difícil... mesmo para mim, para aceitar o que você fez.'
                                ]);
                            } else {
                                addB(['<25>{#p/toriel}{#f/13}* Foi... uma situação infeliz com a quais nos encontramos.']);
                            }
                            addB([
                                "<25>{#p/sans}{#f/0}* sabe de uma coisa...",
                                "<25>{#p/sans}{#f/0}* eu queria ir ao grillbys outro dia, mas...",
                                '<25>{#p/sans}{#f/3}* todo o estoque dele foi roubado semana passada.',
                                '<25>{#p/sans}{#f/0}* O que aconteceu porque o grillbys era um grande apoiador dos humanos.',
                                '<25>{#p/toriel}{#f/13}* Eu... Lamento ouvir isso, Sans.\n* Você gostou de ir lá?',
                                '<25>{#p/sans}{#f/3}* Sim, ser um pro-humano nos dias de hoje é sentença de morte.',
                                '<25>{#p/sans}{#f/0}* pelo menos os seus negócios estarão mortos.',
                                '<25>{#p/toriel}{#f/12}* ... está não foi a única vez que isso aconteceu.',
                                '<25>{#p/toriel}{#f/11}* Muitos monstros já tiveram o mesmo destino.',
                                '<25>{#p/sans}{#f/0}* sim, mas você sabe a pior parte?',
                                "<25>{#p/sans}{#f/3}* Isto não é o que os monstros deveriam ser ou agir.",
                                '<25>{#p/sans}{#f/0}* O mundo natal era considerado uma paz, e mesmo durante a guerra...',
                                '<25>{#p/sans}{#f/0}* pelo menos ainda estavámos unidos como espécie.',
                                "<25>{#p/sans}{#f/3}* agora, só parece que... pessoas não conseguem se dar bem."
                            ]);
                            if (dpapyrus) {
                                addB(["<25>{#p/sans}{#f/0}* eu realmente poderia usar a animação do meu irmão agora."]);
                            } else {
                                addB(['<25>{#p/sans}{#f/0}* e isso realmente me destrói.']);
                            }
                            addB([
                                '<25>{#p/alphys}{#f/3}* Uh... pessoal?',
                                '<25>{#p/alphys}{#f/3}* eu acho que vocês precisam ver isso.',
                                '<25>{#p/toriel}{#f/3}* Que estrondo é esse?\n* Você ouviu isso?',
                                '<25>{#p/alphys}{#f/23}* Você precisa olhar lá fora.',
                                '<25>{#p/sans}{#f/0}* toriel, você fechou o portão após eu entrar?',
                                '<25>{#p/toriel}{#f/2}* ...',
                                '<25>{#p/alphys}{#f/22}* Entrem pra dentro, AGORA!!',
                                '<25>{|}{#p/toriel}{#f/2}* Me... me desculpa!\n* Eu tenho que- {%}',
                                '<32>{#s/equip}{#p/event}* Click...'
                            ]);
                        } else {
                            addB([
                                '<25>{#p/sans}{#f/0}* ...',
                                '<25>{#p/sans}{#f/0}* pelo menos ainda temos a guarda real para nos proteger.',
                                "<25>{#p/sans}{#f/3}* o que restou dela, pelo menos.",
                                '<25>{#p/toriel}{#f/14}* É uma sorte que tenhamos seu apoio.',
                                '<25>{#p/toriel}{#f/13}* Eu não sei como iríamos aguentar sem eles.',
                                '<32>{#p/human}{#v/2}{@fill=#ff993d}* Isso aí\n* A Guarda Real é incrível!',
                                '<25>{#p/toriel}{#f/2}* ... huh!?',
                                "<32>{#p/human}{#v/2}{@fill=#ff993d}* Exatamente!",
                                "<32>{#p/human}{#v/2}{@fill=#ff993d}* Quando eu for mais velho, irei me juntar a eles para proteger todo mundo!",
                                '<25>{#p/toriel}{#f/0}* Hee hee.\n* Talvez você vá.',
                                '<25>{#p/toriel}{#f/1}* Hmm...',
                                '<25>{#p/toriel}{#f/0}* Por agora, você deve retornar e guardar os outros primeiro.',
                                "<32>{#p/human}{#v/2}{@fill=#ff993d}* Aye aye, capitã!\n* Eu estou a caminho!",
                                '<25>{#p/toriel}{#f/0}* Fique em segurança!',
                                "<25>{#p/sans}{#f/0}* heh.\n* não os coloque em tanto esforço por aí.",
                                "<25>{#p/sans}{#f/3}* eles ainda... tem toda a coisa do arquivo pra lidar.",
                                '<26>{#p/toriel}{#f/5}* Isso É verdade, entretanto...',
                                '<25>{#p/toriel}{#f/0}* Isso não significa que eles devem focar nisso o tempo todo.',
                                '<25>{#p/toriel}{#f/1}* Eles ainda são apenas crianças, não são?',
                                '<25>{#p/sans}{#f/2}* ... bem, você sabe mais sobre essas coisas do que eu.',
                                '<25>{#p/toriel}{#f/9}* ...',
                                '<25>{#p/toriel}{#f/9}* Eu ainda me preocupo com o Outpost acima de tudo.',
                                '<26>{#p/toriel}{#f/13}* A Guarda Real tem mantido tudo seguro, mas...',
                                '<25>{#p/toriel}{#f/18}* Muitos ainda não vêem o valor no que estamos fazendo.'
                            ]);
                            if (dpapyrus) {
                                addB([
                                    '<25>{#p/toriel}{#f/10}* Embora, suponho que não posso julgá-los com muita severidade...',
                                    '<25>{#p/toriel}{#f/9}* ... sabendo os tipos de decisões que você fez durante o tempo em que esteve aqui.',
                                    '<25>{#p/toriel}{#f/13}* Foi difícil... mesmo para mim, para aceitar o que você fez.'
                                ]);
                            } else {
                                addB(['<25>{#p/toriel}{#f/13}* Foi... uma situação infeliz com a quais nos encontramos.']);
                            }
                            addB([
                                "<25>{#p/sans}{#f/0}* sabe de uma coisa...",
                                "<25>{#p/sans}{#f/0}* eu queria ir ao grillbys outro dia, mas...",
                                '<25>{#p/sans}{#f/3}* o lugar estava bem cheio de protestantes.',
                                '<25>{#p/sans}{#f/0}* O que aconteceu porque o grillbys era um grande apoiador dos humanos.',
                                '<25>{#p/toriel}{#f/13}* Eu... sinto muito em ouvir isso, Sans. \n* Não tinha um guarda lá?',
                                "<25>{#p/sans}{#f/3}* bem, sim, mas não é como se ele conseguisse fazer algo sozinho.",
                                '<25>{#p/sans}{#f/0}* eles ainda ERAM clientes pagantes.',
                                '<25>{#p/toriel}{#f/1}* ... estes não parecem meios efetivos de protesto.',
                                '<25>{#p/toriel}{#f/6}* Mas espero que todos estejam bem.',
                                "<25>{#p/sans}{#f/0}* Sim, acho que isso é meio engraçado.\n* Mas ao mesmo tempo...",
                                "<25>{#p/sans}{#f/3}* Isto não é o que os monstros deveriam ser ou agir.",
                                '<25>{#p/sans}{#f/0}* O mundo natal era considerado uma paz, e mesmo durante a guerra...',
                                '<25>{#p/sans}{#f/0}* pelo menos ainda estavámos unidos como espécie.',
                                "<25>{#p/sans}{#f/3}* agora, só parece que... pessoas não conseguem se dar bem."
                            ]);
                            if (dpapyrus) {
                                addB(["<25>{#p/sans}{#f/0}* eu realmente poderia usar a animação do meu irmão agora."]);
                            } else {
                                addB(['<25>{#p/sans}{#f/0}* e isso realmente me destrói.']);
                            }
                            addB([
                                '<25>{#p/alphys}{#f/27}* Uh, Toriel?\n* Eu acho que você deixou o portão de segurança aberto.',
                                "<25>{#p/alphys}{#f/20}* Não se preocupe, eu fechei ele pra você.\n* De novo.",
                                '<25>{#p/toriel}{#f/1}* Oh, um, obrigada...',
                                "<26>{#p/alphys}{#f/23}* Não faça isso da próxima vez?\n* Está lá por um motivo.",
                                '<25>{#p/toriel}{#f/5}* ...',
                                '<25>{#p/toriel}{#f/9}* Talvez agora seja um bom momento para finalizar a mensagem.',
                                '<25>{#p/sans}{#f/0}* claro, parece bom.',
                                "<25>{#p/sans}{#f/3}* foi mal, mané... não posso falar contigo pra sempre."
                            ]);
                            if (dpapyrus) {
                                addB([
                                    '<25>{#p/sans}{#f/0}* voe com segurança por aí, eu acho...',
                                    "<25>{#p/sans}{#f/3}* ... ou não. \n* eu não ligo."
                                ]);
                            } else {
                                addB(['<25>{#p/sans}{#f/0}* voe com segurança por aí, beleza?', '<25>{#p/sans}{#f/3}* ...']);
                            }
                            addB(['<32>{#s/equip}{#p/event}* Click...']);
                        }
                    } else {
                        k = 'light_toriel'; // NO-TRANSLATE

                        
                        if (SAVE.data.n.state_wastelands_toriel === 0) {
                            addA([
                                '<32>{#s/phone}{#p/event}* Ring, ring...',
                                '<25>{#p/toriel}{#f/1}* Olá?',
                                '<25>{#p/toriel}{#f/0}* ...\n* Aqui é a toriel.',
                                '<25>{#p/toriel}{#f/1}* Eu sei que este não é o ligação que normalmente nós teríamos, mas...',
                                '<25>{#p/toriel}{#f/5}* Eu sinto que você precisa entender tudo que aconteceu desde que se foi.'
                            ]);
                            addB(['<25>{#p/toriel}{#f/9}* Apesar de nossos arranjos, não pude deixar de me preocupar.']);
                        } else {
                            addA([
                                '<32>{#s/phone}{#p/event}* Ring, ring...',
                                '<25>{#p/toriel}{#f/1}* Olá?',
                                '<25>{#p/toriel}{#f/0}* ...\n* Aqui é a toriel.',
                                '<25>{#p/toriel}{#f/1}* As circunstâncias podem não ser as ideais no momento, mas...',
                                '<25>{#p/toriel}{#f/5}* Eu sinto que você precisa entender tudo que aconteceu desde que se foi.'
                            ]);
                            addB(['<25>{#p/toriel}{#f/9}* Após nosso tempo nas Outlands, eu não pude me ajudar se não ficar preocupada.']);
                        }
                        addB([
                            '<25>{#p/toriel}{#f/5}* Eu sabia que você era o último humano que o ASGORE precisava.',
                            '<25>{#p/toriel}{#f/1}* Mesmo com meu medo de deixar as Outlands...',
                            '<25>{#p/toriel}{#f/5}* Eu sabia que não poderia ficar alí por muito mais tempo.',
                            '<25>{#p/toriel}{#f/9}* Eu corri para a Cidadela o mais rápido que pude para impedi-lo de te ferir.',
                            '<25>{#p/toriel}{#f/10}* Mas quando cheguei lá...',
                            '<25>{#p/toriel}{#f/9}* Eu percebi que estava errada sobre ele este tempo todo.',
                            '<25>{#p/toriel}{#f/5}* Ele não era o assassino do qual eu o acusei ser.',
                            '<25>{#p/toriel}{#f/1}* ...',
                            '<25>{#p/toriel}{#f/1}* Eu conversei com a Alphys mais tarde daquele dia.',
                            '<25>{#p/toriel}{#f/1}* Nós discutimos ASGOREA, os humanos...',
                            '<25>{#p/toriel}{#f/3}* E também algo sobre \"Mew Mew Aventura no Espaço?\"',
                            '<25>{#p/toriel}{#f/4}* Eu ainda não sei o que significa.',
                            "<25>{#p/toriel}{#f/0}* De toda forma, para você entender... ela não estava pronta para se tornar rainha.",
                            '<25>{#p/toriel}{#f/1}* E ela concordou em me colocar lá.',
                            "<25>{#p/toriel}{#f/5}* Apenas então, eu ouvi sobre a morte da capitã da Guarda Real..."
                        ]);
                        if (hkills === 0) {
                            addB(['<25>{#p/toriel}{#f/9}* E o fato é, a forma que você agiu, pode acabar tendo salvo ela.']);
                        } else if (hkills === 1 && SAVE.data.n.state_foundry_undyne === 2) {
                            addB(['<25>{#p/toriel}{#f/9}* E o fato de que você foi aquele quem matou ela.']);
                        } else if (dmettaton) {
                            addB(['<25>{#p/toriel}{#f/9}* Junto com a morte da estrela de TV, Mettaton.']);
                            if (royals < 2) {
                                addB([
                                    '<26>{#p/toriel}{#f/9}* ... e a morte da boa parte da Guarda Real.',
                                    "<25>{#p/toriel}{#f/5}* A morte do Mettaton em particular foi difícil para as pessoas."
                                ]);
                            } else if (royals < 7) {
                                addB([
                                    '<26>{#p/toriel}{#f/9}* ... e a morte da Guarda Real junto disso.',
                                    "<25>{#p/toriel}{#f/5}* A morte do Mettaton em particular foi difícil para as pessoas."
                                ]);
                            } else {
                                addB(['<25>{#p/toriel}{#f/5}* Saber sobre a morte dele foi... bem difícil pra mim.']);
                            }
                        } else if (dpapyrus) {
                            addB(["<25>{#p/toriel}{#f/9}* Junto com a morte do irmão de Sans, Papyrus."]);
                            if (royals < 2) {
                                addB(['<26>{#p/toriel}{#f/9}* ... e a morte da boa parte da Guarda Real.']);
                            } else if (royals < 7) {
                                addB(['<26>{#p/toriel}{#f/9}* ... e a morte da Guarda Real junto disso.']);
                            }
                        } else if (royals < 2) {
                            addB(['<26>{#p/toriel}{#f/9}* Bem como as mortes do resto da Guarda Real.']);
                        } else if (royals < 7) {
                            addB(['<25>{#p/toriel}{#f/9}* Bem como as mortes de outros membros da Guarda Real.']);
                        } else if (ddoggo) {
                            addB(['<25>{#p/toriel}{#f/9}* Bem como a morte de um membro da unidade canina Doggo.']);
                        } else if (dlesserdog) {
                            addB(['<25>{#p/toriel}{#f/9}* Bem como a morte de um membro da unidade canina, Canis Minor.']);
                        } else if (ddogs) {
                            addB(['<25>{#p/toriel}{#f/9}* Bem como a morte dos membros da unidade canina Dogamy e Dogaressa.']);
                        } else if (dgreatdog) {
                            addB(['<25>{#p/toriel}{#f/9}* Bem como a morte do membro da unidade canina Major Canis.']);
                        } else if (ddoge) {
                            addB(['<25>{#p/toriel}{#f/9}* As well as the death of ELITE squad member Doge']);
                        } else if (droyalguards) {
                            addB(['<25>{#p/toriel}{#f/9}* As well as the death of her new recruits, 03 and 04.']);
                        } else if (dmadjick) {
                            addB(['<25>{#p/toriel}{#f/9}* As well as the death of ELITE squad member Cozmo.']);
                        } else if (dknightknight) {
                            addB(['<25>{#p/toriel}{#f/9}* As well as the death of ELITE squad member Terrestria.']);
                        } else if (mdeaths > 9) {
                            addB(['<25>{#p/toriel}{#f/9}* As well as the deaths of many other monsters.']);
                        } else if (mdeaths > 2) {
                            addB(['<25>{#p/toriel}{#f/9}* As well as the deaths of other monsters.']);
                        } else {
                            addB(['<25>{#p/toriel}{#f/9}* As well as the death of one other monster.']);
                        }
                        if (dmettaton) {
                            addB([
                                '<25>{#p/toriel}{#f/1}* I had believed he could simply be repaired...',
                                '<25>{#p/toriel}{#f/1}* And that everyone else had been mistaken.',
                                '<25>{#p/toriel}{#f/5}* But that was not the case, and I was wrong to think otherwise.'
                            ]);
                        } else {
                            addB([
                                '<25>{#p/toriel}{#f/5}* I only have my own cowardice to blame, however.',
                                '<25>{#p/toriel}{#f/1}* If I had simply possessed the courage to leave sooner...'
                            ]);
                            if (hkills === 0) {
                                addB([
                                    '<25>{#p/toriel}{#f/5}* I could have gone with you and pointed you in the right direction.'
                                ]);
                            } else {
                                addB([
                                    '<25>{#p/toriel}{#f/5}* I could have gone with you and encouraged a more peaceful path.'
                                ]);
                            }
                        }
                        addB([
                            '<26>{#p/toriel}{#f/9}* Alas, there was nothing more to be done.',
                            '<25>{#p/toriel}{#f/5}* As queen, I did not have time to dwell on such matters.',
                            "<25>{#p/toriel}{#f/9}* The humans' safety was at stake, and I would not lose them again.",
                            '<25>{#p/toriel}{#f/10}* My first act as queen would be to increase their protection.'
                        ]);
                        if (royals < 2) {
                            addB([
                                '<26>{#p/toriel}{#f/5}* Admittedly, this would be difficult, given the lack of a Royal Guard.'
                            ]);
                        } else {
                            addB([
                                '<25>{#p/toriel}{#f/5}* Admittedly, I was out of practice in handling these sorts of matters.'
                            ]);
                        }
                        addB([
                            '<25>{#p/toriel}{#f/1}* But with the help of an old friend, Gerson, and his contacts...',
                            '<25>{#p/toriel}{#f/1}* I was able to arrange a minimal security detail here in the Citadel.',
                            '<25>{#p/toriel}{#f/0}* It is not much, but the humans and their secret are safer now.',
                            '<25>{#p/toriel}{#f/1}* ...',
                            '<25>{#p/toriel}{#f/1}* Since then, life has carried on as usual...'
                        ]);
                        if (royals < 2) {
                            addB(['<25>{#p/toriel}{#f/5}* Despite the loss of the king, and Royal Guard as a whole...']);
                        } else {
                            addB(['<25>{#p/toriel}{#f/5}* Despite the loss of the king, and former Royal Guard captain...']);
                        }
                        addB([
                            '<25>{#p/toriel}{#f/1}* The people still have hope for their freedom.',
                            '<25>{#p/toriel}{#f/5}* Hope that... I will deliver it to them.',
                            '<25>{#p/toriel}{#f/9}* ...',
                            '<25>{#p/toriel}{#f/9}* In a way, I understand what ASGORE must have been going through now.',
                            '<25>{#p/toriel}{#f/10}* The weight of such outrageous demands being made of me...',
                            '<25>{#p/toriel}{#f/9}* ... it is changing who I am as a person.',
                            '<25>{#p/toriel}{#f/5}* Earlier today, in fact.'
                        ]);
                        if (dpapyrus) {
                            addB([
                                '<25>{#p/toriel}{#f/5}* When Sans came to reminisce about his brother, I...',
                                '<25>{#p/toriel}{#f/9}* I declined out of a desire to be left alone.',
                                '<25>{#p/toriel}{#f/1}* He shrugged, and walked off like nothing was wrong...',
                                '<25>{#p/toriel}{#f/5}* But I knew he must have been disappointed.'
                            ]);
                        } else {
                            addB([
                                '<25>{#p/toriel}{#f/5}* When Papyrus came to reminisce about Undyne, I...',
                                '<25>{#p/toriel}{#f/9}* I declined out of a desire to be left alone.',
                                '<25>{#p/toriel}{#f/1}* He tried to act like nothing was wrong...',
                                '<25>{#p/toriel}{#f/5}* But I knew he was probably upset.'
                            ]);
                        }
                        addB([
                            '<25>{#p/toriel}{#f/9}* ... I felt guilty, but with all this pressure bearing down on me...',
                            '<25>{#p/toriel}{#f/5}* I did not see myself having the energy to discuss such a topic.',
                            '<25>{#p/toriel}{#f/5}* ...',
                            '<25>{#p/toriel}{#f/1}* Still.\n* I have not given up on our future.',
                            '<25>{#p/toriel}{#f/1}* No matter what happens to me, or my own well-being...',
                            '<25>{#p/toriel}{#f/0}* At least monsterkind will go free one day.',
                            '<25>{#p/toriel}{#f/1}* That is what matters now, is it not?',
                            '<25>{#p/toriel}{#f/1}* ...',
                            '<25>{#p/toriel}{#f/5}* ...',
                            '<25>{#p/toriel}{#f/9}* ... I suppose... it would be a good time to end the call now.',
                            '<25>{#p/toriel}{#f/9}* There is not much else for me to say.',
                            '<25>{#p/toriel}{#f/5}* ...',
                            '<25>{#p/toriel}{#f/5}* Goodbye, little one.',
                            '<32>{#s/equip}{#p/event}* Click...'
                        ]);
                    }
                } else if (royals === 5 && !ddoggo && !dlesserdog && !ddogs && !dgreatdog && !ddoge) {
                    k = 'light_dog'; // NO-TRANSLATE

                    m = music.dogsong;
                    
                    addA([
                        '<32>{#s/phone}{#p/event}* Ring, ring...',
                        '<32>{#s/bark}{#p/event}* Bark!\n{#s/bark}* Bark!',
                        '<32>{#p/basic}* (And yet, there is much to say!)\n* (Much to be excited for!)',
                        '<32>{#s/bark}{#p/event}* Bark!',
                        "<32>{#p/basic}* (Wouldn't you like to know more!?)"
                    ]);
                    addB([
                        '<32>{#s/bark}{#p/event}* Bark!\n{#s/bark}* Bark!\n{#s/bark}* Bark!',
                        '<32>{#p/basic}* (When you left, the king was nowhere to be found!)',
                        '<32>{#p/basic}* (Everyone, confused!)\n* (Alphys, unable to take his place!)',
                        '<32>{#s/bark}{#p/event}* Bark!\n{#s/bark}* Bark!\n{#s/bark}* Bark!',
                        '<32>{#p/basic}* (But she spoke to all of Royal Guard.)\n* (Guard came to an agreement!)',
                        '<32>{#p/basic}* (Doge returned to duty, only this time as queen of the outpost.)',
                        '<32>{#s/bark}{#p/event}* Bark!\n{#s/bark}* Bark!\n{#s/bark}* Bark!',
                        '<32>{#p/basic}* (It was fun to see the other dogs in agreement.)',
                        '<32>{#p/basic}* (A feeling of pride unlike any other!)',
                        '<32>{#p/basic}* (Of course, their old master taught them all they know.)',
                        '<32>{#s/bark}{#p/event}* Bark!\n{#s/bark}* Bark!',
                        '<32>{#p/basic}* (In the end, they formed the council of dogs to make all decisions.)',
                        '<32>{#p/basic}* (Everyone gets belly rubs and treats for their hard work!)',
                        "<32>{#p/basic}* Huh?\n* Who's there?\n* Did I see someone MOVE!?",
                        '<32>{#s/bark}{#p/event}* Bark!',
                        "<32>{#p/basic}* Oh, it's just you.",
                        '<32>{#p/basic}* ...',
                        '<32>{#p/basic}* Wait, who are you talking to!?',
                        '<32>{#s/bark}{#p/event}* Bark!\n{#s/bark}* Bark!',
                        '<32>{#p/basic}* (Doggo wants to talk to you.)\n* (Good luck!)',
                        '<32>{#p/basic}* Give me that thing!',
                        "<32>{#p/basic}* ...\n* So it's you, huh?"
                    ]);
                    if (
                        SAVE.data.n.state_starton_doggo === 0 &&
                        SAVE.data.n.state_starton_lesserdog === 0 &&
                        SAVE.data.n.state_starton_dogs === 0 &&
                        SAVE.data.n.state_starton_greatdog === 0
                    ) {
                        if (SAVE.data.n.state_foundry_doge === 2) {
                            addB([
                                "<32>{#p/basic}* You're the one who thought it'd be funny to pet us all!",
                                "<32>{#p/basic}* Not that... I'm complaining.",
                                "<32>{#p/basic}* But... argh!\n* I couldn't even see you!",
                                '<32>{#p/basic}* That was so unfair.'
                            ]);
                        } else {
                            addB([
                                "<32>{#p/basic}* You're the one who thought it'd be funny to pet us all!",
                                "<32>{#p/basic}* Except for Doge.\n* She's really hard to pet.",
                                "<32>{#p/basic}* But... argh!\n* I couldn't even see you!",
                                '<32>{#p/basic}* I wonder what her secret is...'
                            ]);
                        }
                    } else if (
                        SAVE.data.n.state_starton_doggo === 1 &&
                        SAVE.data.n.state_starton_lesserdog === 1 &&
                        SAVE.data.n.state_starton_dogs === 1 &&
                        SAVE.data.n.state_starton_greatdog === 1
                    ) {
                        addB([
                            "<32>{#p/basic}* You're the one who thought you could get past us by throwing a wrench around.",
                            '<32>{#p/basic}* I mean, OK, it worked.',
                            '<32>{#p/basic}* But it was really annoying when I found out!',
                            '<32>{#p/basic}* Maybe...',
                            '<32>{#p/basic}* ... we can play again sometime?',
                            "<32>{#p/basic}* No, no, forget I said that.\n* I shouldn't indulge in my fantasies this much."
                        ]);
                    } else if (
                        SAVE.data.n.state_starton_doggo === 3 &&
                        SAVE.data.n.state_starton_lesserdog === 3 &&
                        SAVE.data.n.state_starton_dogs === 3
                    ) {
                        if (SAVE.data.n.state_starton_greatdog === 3) {
                            addB([
                                "<32>{#p/basic}* You're the one who tried to beat us all up!",
                                '<32>{#p/basic}* You even managed to disappoint Canis Major...',
                                "<32>{#p/basic}* What's wrong with you!?\n* You're awful!",
                                "<32>{#p/basic}* ... that's what the others would say."
                            ]);
                        } else {
                            addB([
                                "<32>{#p/basic}* You're the one who tried to beat us all up!",
                                '<32>{#p/basic}* At least you made Canis Major happy.',
                                "<32>{#p/basic}* So, maybe you're not all bad?",
                                "<32>{#p/basic}* ... to be honest, I didn't mind it..."
                            ]);
                        }
                    } else if (SAVE.data.n.state_starton_doggo === 0) {
                        addB([
                            "<32>{#p/basic}* You're the one who pet me when I couldn't even see you!",
                            '<32>{#p/basic}* I bet you thought that was really funny.',
                            '<32>{#p/basic}* I bet I looked really cute.',
                            "<32>{#p/basic}* ... no, wait, I didn't mean that!"
                        ]);
                    } else if (SAVE.data.n.state_starton_doggo === 1) {
                        addB([
                            "<32>{#p/basic}* You're the one who played fetch with me, right?",
                            "<32>{#p/basic}* Wow!\n* I'd love to do that again sometime.",
                            "<32>{#p/basic}* But... that's just a fantasy."
                        ]);
                    } else {
                        addB([
                            "<32>{#p/basic}* You're the one who tried to beat me up!",
                            '<32>{#p/basic}* That was really rude.\n* And mean.',
                            "<32>{#p/basic}* I definitely didn't like that.",
                            '<32>{#p/basic}* ...'
                        ]);
                    }
                    addB([
                        '<32>{#p/basic}* Anyway!\n* Did you hear about the humans we released!?',
                        "<32>{#p/basic}* They were all asleep in some weird archive thing.\n* It's way above my paw grade.",
                        '<32>{#p/basic}* All I know is, I get to take care of a human!',
                        "<32>{#p/basic}* It was Doge's idea.\n* We all get one human each.",
                        "<32>{#p/basic}* They're like pets???",
                        "<32>{#p/basic}* Don't worry, we don't mistreat them.\n* They're under our protection!",
                        '<32>{#p/basic}* Which is weird... since we were like, trying to hunt them down before or something.'
                    ]);
                    if (royals < 6 || mdeaths > 9) {
                        addB([
                            '<32>{#p/basic}* Still, they kind of have to be.',
                            '<32>{#p/basic}* People REALLY seem to dislike humans these days.'
                        ]);
                    } else {
                        addB(['<32>{#p/basic}* But times change.\n* And so must we!']);
                    }
                    addB([
                        '<32>{#p/basic}* Hey, WAIT!!\n* My human is coming this way RIGHT NOW!!',
                        '<32>{#p/human}{#v/3}{@fill=#003cff}* Master Doggo!\n* Master Doggo!\n* You have to come and see!',
                        '<32>{#p/basic}* What is it now.',
                        "<32>{#p/human}{#v/3}{@fill=#003cff}* You're going to miss the grand opening!",
                        '<32>{#p/basic}* Guess I better go see what this is...',
                        '<32>{#p/basic}* ...',
                        '<32>{#s/bark}{#p/event}* Bark!\n{#s/bark}* Bark!\n{#s/bark}* Bark!',
                        "<32>{#p/basic}* I get it, OK!?\n* Heck, I'm almost there!",
                        '<32>{#p/basic}* ...',
                        '<32>{#p/basic}* What the...\n* WHAT IS THAT THING!?',
                        "<32>{#p/basic}* THAT WASN'T PART OF THE CITY'S SKYLINE BEFORE!!",
                        "<32>{#p/human}{#v/3}{@fill=#003cff}* It's your brand new dog shrine!\n* Just like you wanted!",
                        "<32>{#p/basic}* It's... in constant motion...",
                        '<32>{#p/basic}* WELL THIS IS SOMETHING!',
                        '<32>{#s/bark}{#p/event}* Bark!\n{#s/bark}* Bark!\n{#s/bark}* Bark!'
                    ]);
                    if (30 <= SAVE.data.n.bully) {
                        addB([
                            '<32>{#p/basic}* (Shrines, good for peace!)\n* (Help relieve fears of being attacked by humans!)',
                            '<32>{#p/basic}* (A reminder of the stability the new regime offers you, dog or otherwise!)'
                        ]);
                    } else {
                        addB([
                            '<32>{#p/basic}* (Shrines, good for peace!)\n* (Encourage good behavior in all citizens!)',
                            '<32>{#p/basic}* (A reminder of the blessings you may receive for being good, dog or otherwise!)'
                        ]);
                    }
                    addB([
                        '<32>{#p/basic}* Yes, yes, I know.\n* It looks great... looks just like me.',
                        '<32>{#p/basic}* ... thanks.',
                        '<32>{#s/bark}{#p/event}* Bark!\n{#s/bark}* Bark!',
                        "<32>{#p/basic}* (And that's the last one!)\n* (All council dogs have shrines now!)",
                        '<32>{#p/basic}* PERFECT!!\n* Can I go back to my phone call now?',
                        '<32>{#s/bark}{#p/event}* Bark!',
                        "<32>{#p/human}{#v/3}{@fill=#003cff}* I'll have to show the others!",
                        '<32>{#p/basic}* HEY!\n* Before you go...',
                        "<32>{#p/basic}* I wouldn't have seen it on time without you.\n* Have a treat.",
                        '<32>{#p/human}{#v/3}{@fill=#003cff}* Master Doggo...!',
                        "<32>{#p/basic}* Go on, tell your friends.\n* BUT DON'T SHARE!",
                        '<32>{#p/basic}* ...',
                        '<32>{#p/basic}* So, around here, everyone understands how things work.',
                        '<32>{#p/basic}* You visit the shrine, do a good job at work, and be good at home, too.',
                        "<32>{#p/basic}* And maybe, if you're really really good, you'll get rewarded!",
                        "<32>{#p/basic}* It's perfect.\n* Nobody breaks the rules.",
                        '<32>{#p/basic}* Except those pesky shopkeepers at the rec center.',
                        "<32>{#p/basic}* THEY'RE JUST LAZY AND DISORGANIZED!",
                        '<32>{#p/basic}* But they sell cool junk, so we give them a pass.',
                        '<32>{#p/basic}* Hold on.\n* Are we giving anyone else a pass??',
                        '<32>{#p/basic}* WHAT HAS OUR SOCIETY COME TO!',
                        '<32>{#s/bark}{#p/event}* Bark!\n{#s/bark}* Bark!\n{#s/bark}* Bark!'
                    ]);
                    if (!dmuffet) {
                        addB([
                            '<32>{#p/basic}* (Doggo, new job for you!)\n* (Spider queen, stirring up trouble again.)',
                            '<32>{#p/basic}* (A punishment is required!)',
                            "<32>{#p/basic}* ... ugh.\n* I don't like disciplining people.",
                            '<32>{#s/bark}{#p/event}* Bark!',
                            '<32>{#p/basic}* (Without discipline, dog society falls out of balance.)',
                            "<32>{#p/basic}* I guess.\n* But can't someone else do it?",
                            '<32>{#s/bark}{#p/event}* Bark!\n{#s/bark}* Bark!',
                            "<32>{#p/basic}* (All council dogs must practice discipline.)\n* (It's your turn!)"
                        ]);
                    } else if (!dpapyrus) {
                        addB([
                            '<32>{#p/basic}* (Doggo, new job for you!)\n* (Tall skeleton, deserving of bonus rewards.)',
                            '<32>{#p/basic}* (Offer them to him!)',
                            '<32>{#p/basic}* ... ugh.\n* I swear we give him bonus rewards every day.',
                            '<32>{#s/bark}{#p/event}* Bark!',
                            '<32>{#p/basic}* (Tall skeleton sets a very good example!)',
                            "<32>{#p/basic}* At this rate, he'll be on the dog council himself.",
                            '<32>{#s/bark}{#p/event}* Bark!\n{#s/bark}* Bark!',
                            '<32>{#p/basic}* (We are considering the possibility.)\n* (Now do your duty!)'
                        ]);
                    } else {
                        addB([
                            '<32>{#p/basic}* (Doggo, new job for you!)\n* (Supplies of dog chow are running low.)',
                            '<32>{#p/basic}* (Can you help refill?)',
                            '<32>{#p/basic}* ... ugh.\n* Why do I get all the dirty work around here.',
                            '<32>{#s/bark}{#p/event}* Bark!',
                            "<32>{#p/basic}* (Doggo, only dog who doesn't mind dirty work.)",
                            '<32>{#p/basic}* Lies.\n* Doge likes doing dirty jobs way more than me.',
                            '<32>{#s/bark}{#p/event}* Bark!\n{#s/bark}* Bark!',
                            '<32>{#p/basic}* (Doge cannot do this job.)\n* (Doge is queen.)'
                        ]);
                    }
                    addB([
                        '<32>{#p/basic}* OK.\n* Fine.',
                        "<32>{#p/basic}* Well, I guess I'll have to end the message here.",
                        '<32>{#p/basic}* Have fun out there, wherever you are.',
                        "<32>{#p/basic}* ... I'd give the phone back to that annoying dog, but the message would never end.",
                        '<32>{#p/basic}* HOW CAN YOU TALK FOR SO LONG WITHOUT GETTING TIRED!?',
                        '<32>{#s/bark}{#p/event}* Bark!\n{#s/bark}* Bark!\n{#s/bark}* Bark!',
                        '<32>{#p/basic}* OK already!\n* Quit rushing me!!',
                        '<32>{#s/equip}{#p/event}* Click...'
                    ]);
                } else if (!dmuffet) {
                    k = 'light_muffet'; // NO-TRANSLATE

                    m = music.spiderboss;
                    
                    addA([
                        '<32>{#s/phone}{#p/event}* Ring, ring...',
                        '<32>{#p/basic}{#s/spiderLaugh}* Oh, hello, dearie~',
                        '<32>{#p/basic}* Are you doing well?',
                        "<32>{#p/basic}* Oh, who am I kidding~\n* It's not like I cared about you anyway~",
                        "<32>{#p/basic}* I just wanted to let you know about all the fun you're missing out on!"
                    ]);
                    addB([
                        '<32>{#p/basic}{#s/spiderLaugh}* So, after you departed from the outpost...',
                        '<32>{#p/basic}* By line of succession, Alphys was put in charge as queen~',
                        "<32>{#p/basic}* But you see, dearie, she didn't think she could do it!"
                    ]);
                    if (dmettaton) {
                        addB(["<32>{#p/basic}* Don't blame her though~\n* She let her pet TV star die such a tragic death!"]);
                    } else {
                        addB([
                            "<32>{#p/basic}* Don't blame her though~\n* Without big boy Asgore to hold her hand, she was helpless!"
                        ]);
                    }
                    if (royals < 2) {
                        addB([
                            "<32>{#p/basic}* It's so unfortunate there was nobody left to take charge, don't you think?",
                            '<32>{#p/basic}* Lucky for her, I was more than willing to appoint myself~',
                            '<32>{#p/basic}* Ahuhuhu~\n* She rejected me at first, but after a little \"persuasion...\"',
                            '<32>{#p/basic}* She was quite eager to hand the outpost over to me!'
                        ]);
                    } else {
                        addB([
                            '<32>{#p/basic}* She held a meeting with the royal guards to hire someone else, but...',
                            "<32>{#p/basic}* Without their captain, they'd fallen into disorder!\n* They needed direction~",
                            '<32>{#p/basic}* Ahuhuhu~\n* Thankfully, I was more than willing to give it to them!',
                            '<32>{#p/basic}* And from there, the outpost was all but mine.'
                        ]);
                    }
                    if (30 <= SAVE.data.n.bully) {
                        if (hkills > 9) {
                            addB([
                                '<33>{#p/basic}* With your killing and bullying, the people were made so afraid and obedient~'
                            ]);
                        } else {
                            addB(['<32>{#p/basic}* With your bullying, the people were made so afraid and obedient~']);
                        }
                        addB([
                            '<32>{#p/basic}* Like they were just begging for a strong, assertive leader to take her rightful place!',
                            "<32>{#p/basic}* It's incredible just how quickly they all came around.",
                            '<32>{#p/basic}* For that, dearie, I have you to thank~',
                            '<25>{#p/alphys}{#f/21}* Oh, come ON.\n* You think you can just blame it all on THEM?'
                        ]);
                    } else {
                        addB([
                            "<32>{#p/basic}* Oh, dearie...\n* It's a shame you're not here to see this~",
                            '<32>{#p/basic}* Not only do the people do whatever I want, whenever I want...',
                            '<32>{#p/basic}* But some of them even do it willingly!',
                            '<32>{#p/basic}* Most of them still whine and complain like babies, though.',
                            '<25>{#p/alphys}{#f/21}* Well GEE, I wonder why THAT might be.'
                        ]);
                    }
                    addB([
                        "<32>{#p/basic}{#s/spiderLaugh}* Oh, Alphys-dear~\n* Didn't I tell you to clean out the fluid network today?",
                        "<32>{#p/basic}* It's gotten so dirty after all these years...",
                        "<32>{#p/basic}* If you don't clean it, then who will?"
                    ]);
                    if (royals < 2) {
                        addB([
                            "<25>{#p/alphys}{#f/22}* I DON'T KNOW, MAYBE SOMEONE WHO'S ACTUALLY QUALIFIED!?",
                            "<32>{#p/basic}{#s/spiderLaugh}* Oh, you ARE such a pest, aren't you~",
                            "<32>{#p/basic}* But... ahuhuhu~\n* You know what happens to pests, don't you?",
                            '<25>{#p/alphys}{#f/2}* ... n-no, please, I...',
                            "<25>{#p/alphys}{#f/3}* I-I'll do it!\n* You just watch me, I'll do it right now!",
                            '<32>{#p/basic}{#s/spiderLaugh}* Too late, Alphys-dear~',
                            '<32>{#p/basic}* Spiders, take her away!',
                            '<32>{#p/basic}* It would seem she needs another stay in the Aurora Zone~',
                            "<25>{#p/alphys}{#f/22}* No, PLEASE!!\n* I'LL DO ANYTHING!!",
                            '<32>{#p/basic}{#s/spiderLaugh}* See you on the other side~'
                        ]);
                    } else {
                        addB([
                            "<26>{#p/alphys}{#f/24}* Maybe you'd like to try.",
                            "<32>{#p/basic}{#s/spiderLaugh}* Oh, but you know that'll never happen~",
                            "<32>{#p/basic}* And... ahuhuhu~\n* Talk like that is what gets you in trouble, I'm afraid~",
                            '<25>{#p/alphys}{#f/27}* Oh, does it now?',
                            "<25>{#p/alphys}{#f/28}* Eheh...\n* Maybe you'll be the one who's in trouble soon.",
                            '<32>{#p/basic}{#s/spiderLaugh}* Enough talk, Alphys-dear~\n* I know exactly what kind of punishment you deserve!',
                            '<32>{#p/basic}* Spiders, take her away!',
                            '<32>{#p/basic}* It would seem she needs another stay in the Aurora Zone~',
                            '<25>{#p/alphys}{#f/29}* Enjoy your last moments in power.',
                            "<32>{#p/basic}{#s/spiderLaugh}* Like I'd fall for that~"
                        ]);
                    }
                    addB([
                        '<32>{#p/basic}* ...',
                        '<32>{#p/basic}* Ahuhuhu~\n* Poor Alphys-dear, always getting into trouble~',
                        "<32>{#p/basic}* It's a good thing we have the Aurora Zone to straighten out her behavior!",
                        '<32>{#p/basic}* With the power of the archive, we can send a monster into a virtual world~',
                        '<32>{#p/basic}* Best of all, we control how time passes there~',
                        '<32>{#p/basic}* Days, months, years...',
                        '<32>{#p/basic}* All going by in the blink of an eye!',
                        '<32>{#p/basic}* We spiders LOVE to make them suffer for a long time when they misbehave!'
                    ]);
                    if (dmettaton) {
                        addB([
                            '<32>{#p/napstablook}* sorry to interrupt...',
                            "<32>{#p/napstablook}* i just came to let you know that i've done what you wanted me to......",
                            '<32>{#p/basic}{#s/spiderLaugh}* Ahuhuhu~\n* Very good, my little ghost-munchkin~',
                            '<32>{#p/basic}* Have you found and identified each target on my list?',
                            '<32>{#p/napstablook}* of course......\n* i wrote down their locations as best i could',
                            "<32>{#p/basic}{#s/spiderLaugh}* Oh, wonderful!\n* You're really such a good and loyal spy, aren't you~",
                            '<32>{#p/napstablook}* .........',
                            '<32>{#p/napstablook}* i guess.........',
                            "<32>{#p/napstablook}* it'd just be nice if... i knew what you were going to do with these people.........",
                            "<32>{#p/basic}{#s/spiderLaugh}* You poor thing~\n* You don't need to concern yourself with that!",
                            '<32>{#p/basic}* Rest assured, everyone will get what they deserve in the end~',
                            '<32>{#p/napstablook}* ...',
                            "<32>{#p/napstablook}* i'd like to go rest now, it's been a long day",
                            '<32>{#p/basic}{#s/spiderLaugh}* Of course, my little ghost-munchkin~',
                            '<32>{#p/basic}* Just be sure to show up on time tomorrow~'
                        ]);
                        if (royals < 2) {
                            addB([
                                '<32>{#p/napstablook}* ...',
                                '<32>{#p/napstablook}* will do',
                                "<32>{#p/basic}{#s/spiderLaugh}* ... as you can see, there's no citizen alive who can hide from my loyal spies!"
                            ]);
                        } else {
                            addB(['<32>{#p/napstablook}* ...', "<32>{#p/napstablook}* it's now or never, alphys!"]);
                        }
                    } else {
                        addB([
                            '<32>{#p/mettaton}* YOU DONE BOASTING ABOUT YOUR ACCOMPLISHMENTS YET?',
                            "<32>{#p/mettaton}* I'M HERE, JUST AS REQUESTED.",
                            "<32>{#p/basic}{#s/spiderLaugh}* Ahuhuhu~\n* Just the robot I've been wanting to see!",
                            '<32>{#p/basic}* So would you say audiences are enjoying the new TV lineup?',
                            '<32>{#p/mettaton}* THE RATINGS ARE TERRIBLE.\n* NOBODY LIKES IT.',
                            '<32>{#p/basic}{#s/spiderLaugh}* Oh, wonderful!\n* Like music to my ears~',
                            '<32>{#p/mettaton}* YOU KNOW...'
                        ]);
                        if (iFancyYourVilliany()) {
                            addB(['<32>{#p/mettaton}* PEOPLE WANT VILLAINS, AND SOMEBODY TO ROOT AGAINST.']);
                        } else {
                            addB(['<32>{#p/mettaton}* PEOPLE WANT VARIETY, AND FAMOUS GUEST ROLES.']);
                        }
                        addB([
                            "<32>{#p/mettaton}* NOT THE UTTER GARBAGE -YOU'RE- PUSHING ON EVERYONE.",
                            "<32>{#p/basic}{#s/spiderLaugh}* The point isn't to give people what they want...",
                            "<32>{#p/basic}* It's to dull their minds until they can't refuse me anymore~",
                            '<32>{#p/mettaton}* ... UGH, CAN I GO NOW?'
                        ]);
                        if (dpapyrus) {
                            addB([
                                "<32>{#p/mettaton}* I'M EXHAUSTED ENOUGH AS IT IS.",
                                '<32>{#p/basic}{#s/spiderLaugh}* Sure thing, darling-dear~',
                                "<32>{#p/basic}* Just remember why you're doing this for me~"
                            ]);
                        } else {
                            addB([
                                '<32>{#p/mettaton}* PAPYRUS IS STILL OUT THERE WAITING FOR ME.',
                                '<32>{#p/basic}{#s/spiderLaugh}* Is he now?',
                                "<33>{#p/mettaton}* WE'RE TRYING OUT A NEW TV SHOW.\n* A SPIDER BAKERY SHOW.",
                                '<32>{#p/basic}{#s/spiderLaugh}* A bakery show, you say~',
                                '<32>{#p/basic}* Hmm...',
                                "<32>{#p/basic}* Well, as long as the audiences can't stand it!"
                            ]);
                        }
                        if (royals < 2) {
                            addB([
                                '<32>{#p/mettaton}* ...',
                                '<32>{#p/mettaton}* GOODBYE.',
                                '<32>{#p/basic}{#s/spiderLaugh}* ... as you can see, I have complete control of the entertainment here, too!'
                            ]);
                        } else {
                            addB(['<32>{#p/mettaton}* ...', "<32>{#p/mettaton}* NOW, ALPHYS!\n* NOW'S YOUR CHANCE!"]);
                        }
                    }
                    if (royals < 2) {
                        addB([
                            "<32>{#p/basic}* Isn't it just blissful?",
                            "<32>{#p/basic}* Ahuhuhu~\n* I so badly want to see how you'd fare here~",
                            '<32>{#p/basic}* The other humans have been doing splendidly!',
                            '<32>{#p/basic}* In fact, despite them being traumatized when they first left the archive...',
                            "<32>{#p/basic}* They've become my most loyal servants!",
                            '<32>{#p/basic}* Oh, dearie...\n* You must be so lonely without a direction in life~',
                            "<32>{#p/basic}* If it ever becomes too much, you're always welcome here with us!",
                            "<32>{#p/basic}* But for now~\n* I'll be seeing you~",
                            '<32>{#p/basic}* On the other side~',
                            '<32>{#s/equip}{#p/event}* Click...'
                        ]);
                    } else {
                        addB([
                            '<32>{#p/basic}* Ahuhuhu~\n* What are you- hngh!',
                            '<25>{#p/alphys}{#f/28}* Well, well...\n* Look who we have here.',
                            '<32>{#p/basic}{#s/spiderLaugh}* No, let me go...!',
                            "<32>{#p/basic}* You royal guards... y-you're all the same!",
                            "<32>{#p/basic}* You need a strong leader who can tell you what's right and what's wrong!",
                            "<25>{#p/alphys}{#f/29}* It's no use.\n* They've chosen ME as their leader now.",
                            '<32>{#p/basic}{#s/spiderLaugh}* But... how?',
                            '<32>{#p/basic}* I had you in custody, the spiders had you under escort~',
                            "<32>{#p/basic}* And you...\n* You're supposed to be weak!",
                            "<32>{#p/basic}* You couldn't hope to command the Royal Guard~",
                            "<25>{#p/alphys}{#f/17}* Y'know, I've learned a lot since you took over the outpost.",
                            "<25>{#p/alphys}{#f/5}* Everything you've done to make all our lives miserable...",
                            '<25>{#p/alphys}{#f/16}* Surviving it only made me more determined to stop you!',
                            "<25>{#p/alphys}{#f/7}* God, I've always wanted to say that...",
                            "<32>{#p/basic}{#s/spiderLaugh}* No... no!\n* You can't do this to me!",
                            '<25>{#p/alphys}{#f/27}* Guards...?',
                            '<32>{#p/basic}{#s/spiderLaugh}* No~\n* Please!',
                            "<25>{#p/alphys}{#f/29}* Let's see how SHE likes the Aurora Zone.",
                            '<25>{#p/alphys}{#f/27}* ...',
                            "<25>{#p/alphys}{#f/27}* Huh... what's this?",
                            '<25>{#p/alphys}{#f/27}* Was she... talking to someone on this thing?',
                            '<25>{#p/alphys}{#f/17}* Weird.',
                            '<32>{#s/equip}{#p/event}* Click...'
                        ]);
                    }
                } else if (!dpapyrus) {
                    k = 'light_papyrus'; // NO-TRANSLATE

                    m = music.papyrus;
                    
                    addA([
                        '<32>{#s/phone}{#p/event}* Ring, ring...',
                        '<18>{#p/papyrus}{#f/4}IS THIS THING EVEN WORKING?',
                        '<18>{#p/papyrus}{#f/0}OH! OH!\nIT JUST WENT TO VOICE-MAIL!',
                        '<18>{#p/papyrus}{#f/6}NO WONDER I WAS SO CONFUSED!',
                        '<18>{#p/papyrus}{#f/5}WELL HELLO, HUMAN!\nI HAVE... A LOT TO TALK ABOUT.'
                    ]);
                    addB([
                        '<18>{#p/papyrus}{#f/4}SO... I KIND OF BECAME THE KING.',
                        "<18>{#p/papyrus}{#f/6}WAIT!!\nDON'T CLICK OFF!!",
                        "<18>{#p/papyrus}{#f/5}IT'S NOT AS CRAZY AS IT SOUNDS...",
                        "<18>{#p/papyrus}{#f/0}UH, I'LL JUST START FROM THE BEGINNING.",
                        '<18>{#p/papyrus}{#f/5}SO, AFTER YOU LEFT...',
                        "<18>{#p/papyrus}{#f/5}THE OUTPOST'S LEADERSHIP KIND OF FELL APART.",
                        "<18>{#p/papyrus}{#f/6}ALPHYS, WHO WAS MEANT TO TAKE ASGORE'S PLACE...",
                        "<18>{#p/papyrus}{#f/5}DIDN'T REALLY WANT TO BE THE QUEEN.",
                        "<18>{#p/papyrus}{#f/5}AND SINCE UNDYNE STILL HASN'T RE-APPEARED...",
                        '<18>{#p/papyrus}{#f/4}ALPHYS HAD TO HOLD A MEETING TO FIND A NEW LEADER.'
                    ]);
                    if (royals < 2) {
                        addB([
                            '<18>{#p/papyrus}{#f/4}UNFORTUNATELY, THE ROYAL GUARD WAS ALL BUT GONE.',
                            '<18>{#p/papyrus}{#f/5}SO... THAT MEETING NEVER HAPPENED.'
                        ]);
                    } else {
                        addB([
                            '<18>{#p/papyrus}{#f/4}THE ROYAL GUARD ARGUED, AND ARGUED SOME MORE...',
                            "<18>{#p/papyrus}{#f/5}BUT NOBODY AGREED ON WHO'D BE THE BEST FIT."
                        ]);
                    }
                    addB([
                        '<18>{#p/papyrus}{#f/6}AFTER THAT, ALPHYS JUST SORT OF... LEFT.',
                        '<18>{#p/papyrus}{#f/6}LEFT US WITH NOBODY IN CHARGE, THAT IS.',
                        '<18>{#p/papyrus}{#f/5}AND FOR A WHILE...',
                        '<18>{#p/papyrus}{#f/6}THINGS WERE... SURPRISINGLY CALM!',
                        "<18>{#p/papyrus}{#f/0}BUT I KNEW THAT WOULDN'T LAST.",
                        '<18>{#p/papyrus}{#f/4}SO, EVENTUALLY...',
                        '<18>{#p/papyrus}{#f/9}I TOOK MATTERS INTO MY OWN HANDS!',
                        '<18>{#p/papyrus}{#f/5}YOU CAN GUESS HOW I BECAME THE KING FROM THERE.',
                        '<18>{#p/papyrus}{#f/0}BUT HEY!\nTHINGS HAVE BEEN GOING WELL!',
                        "<18>{#p/papyrus}{#f/0}I'VE ENSTATED A FEW POLICIES TO HELP MAKE FRIENDS.",
                        '<18>{#p/papyrus}{#f/4}NOT JUST -MY- FRIENDS...',
                        "<18>{#p/papyrus}{#f/0}BUT EVERYONE ELSE'S FRIENDS, TOO!",
                        '<18>{#p/papyrus}{#f/9}AS A RESULT, OUTPOST MORALE IS ON THE RISE!',
                        '<19>{#p/papyrus}{#f/4}AND ONCE OUR FRIENDSHIP POWER REACHES CRITICAL...',
                        "<18>{#p/papyrus}{#f/9}I'LL EVEN BE ABLE TO RELEASE THE HUMANS!",
                        '<18>{#p/papyrus}{#f/0}HOPEFULLY WITH ONLY MINIMAL RIOTING.',
                        "<25>{#p/sans}{#f/0}* heh.\n* that'll be nice.",
                        '<25>{#p/sans}{#f/3}* people have been clinging to their anger for too long.',
                        "<18>{#p/papyrus}{#f/0}OH, HELLO SANS!\nI'M HAPPY TO SEE YOU UP AND ABOUT.",
                        '<25>{#p/sans}{#f/0}* actually, i just got off from work.',
                        "<25>{#p/sans}{#f/3}* it's a holiday today.",
                        '<18>{#p/papyrus}{#f/4}A HOLIDAY, EH?',
                        '<18>{#p/papyrus}{#f/5}(CHORINHO...)',
                        "<18>{#p/papyrus}{#f/5}EVER SINCE YOU STARTED WORKING AT GRILLBY'S...",
                        "<18>{#p/papyrus}{#f/4}THEY'VE BEEN GIVING YOU MORE OF THOSE THINGS.",
                        "<25>{#p/sans}{#f/3}* nah, don't worry.\n* you'll like this one...",
                        '<25>{#p/sans}{#f/2}* it\'s the new semi- annual \"get-along day.\"',
                        '<18>{#p/papyrus}{#f/1}OH!!! RIGHT!!!\nI TOTALLY FORGOT I ENSTATED THAT!!!',
                        '<18>{#p/papyrus}{#f/0}THE DAY WHERE ALL YOUR ENEMIES TURN TO FRIENDS.',
                        '<18>{#p/papyrus}{#f/4}SO DID YOU MAKE ANY \"FRENEMIES\" TODAY???',
                        '<25>{#p/sans}{#f/0}* hmm...',
                        "<25>{#p/sans}{#f/3}* that'd require having enemies to begin with.",
                        '<18>{#p/papyrus}{#f/5}WELL... UH...',
                        '<18>{#p/papyrus}{#f/6}YOU CAN JUST BETTER AN EXISTING FRIENDSHIP THEN!',
                        '<25>{#p/sans}{#f/2}* well, all my friendships are already pretty good.',
                        "<25>{#p/sans}{#f/3}* ... guess this just isn't my holiday.",
                        "<18>{#p/papyrus}{#f/0}OH.\nTHAT'S OKAY.",
                        '<18>{#p/papyrus}{#f/9}\"NEW PALS DAY\" IS RIGHT AROUND THE CORNER!',
                        '<25>{#p/sans}{#f/0}* lemme guess... the day where you make even MORE friends?',
                        '<18>{#p/papyrus}{#f/0}NYEH HEH HEH!\nOF COURSE!',
                        '<25>{#p/sans}{#f/0}* i look forward to it, then.',
                        '<25>{#p/sans}{#f/3}* ...',
                        "<25>{#p/sans}{#f/3}* y'know, buddo... when you first left the outpost...",
                        "<25>{#p/sans}{#f/0}* things weren't as rosy as they are now.",
                        '<25>{#p/sans}{#f/3}* people blamed each other for letting it all happen...',
                        '<25>{#p/sans}{#f/3}* for what you did to them...',
                        '<25>{#p/sans}{#f/0}* but, over time, my brother really turned things around.'
                    ]);
                    if (royals < 2) {
                        addB([
                            '<25>{#p/sans}{#f/3}* heck, despite the fall of the royal guard...',
                            '<25>{#p/sans}{#f/0}* he still made the best of it.',
                            "<18>{#p/papyrus}{#f/0}YEAH!! I'M REALLY HAPPY WITH HOW I'VE DONE.",
                            '<18>{#p/papyrus}{#f/9}THE OUTPOST HAS NEVER BEEN BETTER!'
                        ]);
                    } else {
                        addB([
                            '<25>{#p/sans}{#f/2}* heck, even the royal guard improved.',
                            '<18>{#p/papyrus}{#f/0}YEAH!! INSTEAD OF GUARDING AGAINST HUMANS...',
                            '<18>{#p/papyrus}{#f/9}THEY PROTECT US MONSTERS FROM SPITE AND VITRIOL!'
                        ]);
                    }
                    addB([
                        '<18>{#p/papyrus}{#f/5}...',
                        '<18>{#p/papyrus}{#f/5}WHATEVER YOU MAY HAVE DONE, HUMAN...',
                        '<18>{#p/papyrus}{#f/0}JUST KNOW THAT THINGS TURNED OUT OKAY.',
                        '<18>{#p/papyrus}{#f/6}AND THAT I FORGIVE YOU!!!'
                    ]);
                    if (
                        world.edgy ||
                        (world.population_area('s') <= 0 && !world.bullied_area('s')) // NO-TRANSLATE

                    ) {
                        addB(['<18>{#p/papyrus}{#f/5}BECAUSE, EVEN IF WE GOT OFF TO A ROUGH START...']);
                    } else if (SAVE.data.n.plot_date < 1.1) {
                        if (SAVE.data.b.flirt_papyrus) {
                            addB(['<18>{#p/papyrus}{#f/5}BECAUSE, EVEN IF WE NEVER HAD THAT DATE...']);
                        } else {
                            addB(['<18>{#p/papyrus}{#f/5}BECAUSE, EVEN IF WE NEVER HUNG OUT...']);
                        }
                    } else {
                        addB(["<18>{#p/papyrus}{#f/5}BECAUSE, EVEN IF WE NEVER HUNG OUT AT UNDYNE'S..."]);
                    }
                    addB([
                        "<18>{#p/papyrus}{#f/0}I'D STILL BE HAPPY TO CALL YOU MY FRIEND.",
                        "<25>{#p/sans}{#f/2}* aw, that's sweet.",
                        "<25>{#p/sans}{#f/3}* it's too bad we won't get to hear their reaction.",
                        "<18>{#p/papyrus}{#f/7}YEAH, WELL, IT'S STILL WORTH SAYING!!",
                        '<18>{#p/papyrus}{#f/0}THE IMPORTANT THING IS THAT THEY HEARD IT.',
                        '<25>{#p/sans}{#f/0}* heh.\n* take care of yourself out there.',
                        "<25>{#p/sans}{#f/2}* 'cause at least one person's rootin' for ya.",
                        "<18>{#p/papyrus}{#f/0}... THAT'S ME!!!",
                        '<32>{#s/equip}{#p/event}* Click...'
                    ]);
                } else {
                    k = 'light_sans'; // NO-TRANSLATE

                    m = sounds.wind;
                    
                    addA([
                        '<32>{#s/phone}{#p/event}* Ring, ring...',
                        '<25>{#p/sans}{#f/0}* opa.',
                        "<25>{#p/sans}{#f/3}* já faz um tempo, huh?"
                    ]);
                    addB([
                        '<25>{#p/sans}{#f/0}* after you left, the king vanished into thin air.',
                        '<25>{#p/sans}{#f/3}* why?\n* nobody knows.',
                        '<25>{#p/sans}{#f/2}* ... maybe he just went on vacation.',
                        '<25>{#p/sans}{#f/0}* anyway, alphys was supposed to replace him.',
                        "<25>{#p/sans}{#f/3}* but she didn't consider herself to be cut out for the job."
                    ]);
                    if (royals < 2) {
                        addB([
                            '<25>{#p/sans}{#f/0}* she thought about putting a royal guard in her place...',
                            '<25>{#p/sans}{#f/0}* but those guys all but vanished, too.',
                            '<25>{#p/sans}{#f/3}* why?\n* hard to say.',
                            '<25>{#p/sans}{#f/2}* ... maybe they just got bored of their jobs.'
                        ]);
                    } else {
                        addB([
                            '<25>{#p/sans}{#f/0}* she thought about putting a royal guard in her place...',
                            "<25>{#p/sans}{#f/0}* but with their captain gone, they couldn't make up their minds.",
                            '<25>{#p/sans}{#f/3}* why?\n* hard to say.',
                            "<25>{#p/sans}{#f/2}* ... maybe undyne just couldn't be bothered anymore."
                        ]);
                    }
                    addB([
                        '<25>{#p/sans}{#f/0}* after that, alphys fled the citadel and left us without a leader.',
                        "<25>{#p/sans}{#f/3}* you'd think the former queen might return, or...",
                        '<25>{#p/sans}{#f/3}* maybe someone overzealous would take the throne instead.',
                        '<25>{#p/sans}{#f/0}* and yet, neither of those things happened.',
                        '<25>{#p/sans}{#f/3}* why?\n* you tell me.',
                        '<25>{#p/sans}{#f/2}* ... maybe all the potential leaders out there just gave up.',
                        "<25>{#p/sans}{#f/0}* regardless, i realized it'd be up to me to do something.",
                        '<25>{#p/sans}{#f/0}* so i took over for asgore and alphys myself.',
                        "<25>{#p/sans}{#f/3}* it hasn't been easy, what with all the leadership troubles...",
                        "<25>{#p/sans}{#f/3}* not to mention keeping the humans' existence a secret.",
                        '<25>{#p/sans}{#f/0}* but after i implemented my pro-slacker policy...',
                        '<25>{#p/sans}{#f/2}* people seemed to relax quite a bit.'
                    ]);
                    if (30 <= SAVE.data.n.bully) {
                        addB(['<25>{#p/sans}{#f/3}* a far cry from how scared they were of being beat up before.']);
                    } else {
                        addB(['<26>{#p/sans}{#f/3}* a far cry from how distraught they were about asgore and undyne.']);
                    }
                    addB([
                        '<25>{#p/sans}{#f/0}* all in all, things are going pretty well.',
                        '<25>{#p/sans}{#f/0}* the humans are safe and sound, the citizens still have hope...',
                        "<25>{#p/sans}{#f/3}* so what's the catch?",
                        '<25>{#p/sans}{#f/0}* why does it all feel so... hopeless?',
                        "<25>{#p/sans}{#f/3}* well, to be honest, it's anyone's guess.",
                        '<25>{#p/sans}{#f/3}* ...',
                        "<25>{*}{#x0}{#p/darksans}{#f/1}{#i/5}* ... maybe you're just a dirty brother killer."
                    ]);
                }
            } else {
                k = 'light_generic'; // NO-TRANSLATE

                
                addA([
                    '<32>{#s/phone}{#p/event}* Ring, ring...',
                    '<25>{#p/alphys}{#f/8}* Hiya...',
                    '<25>{#p/alphys}{#f/6}* Is anyone there?',
                    "<25>{#p/alphys}{#f/10}* I hope it's not too much trouble...",
                    '<25>{#p/alphys}{#f/5}* I just wanted to let you know how things are going out here.'
                ]);
                addB([
                    '<25>{#p/alphys}{#f/20}* Então... após você fugir, o rei meio que... d-desapareceu.',
                    "<25>{#p/alphys}{#f/14}* Quando eu contei a notícia... isso feriu a moral das pessoas.",
                    '<25>{#p/alphys}{#f/10}* Tecnicamente, como cientista real, eu deveria tomar o lugar dele, mas...',
                    "<25>{#p/alphys}{#f/11}* I didn't really feel like I'd be the best fit for the job.",
                    '<26>{#p/alphys}{#f/5}* Well, I had a talk with some of the royal guards, and...',
                    '<25>{#p/alphys}{#f/6}* We agreed Terrestria should be appointed as the queen instead.',
                    '<25>{#p/alphys}{#f/15}* Her first action was a little controversial, though...',
                    '<25>{#p/alphys}{#f/17}* Cutting the Royal Guard in half and loosening its policies.'
                ]);
                if (SAVE.data.b.undyne_respecc) {
                    addB([
                        "<25>{#p/alphys}{#f/26}* Undyne wasn't happy about it at first, but...",
                        '<25>{#p/alphys}{#f/8}* She came around to it in the end.',
                        '<25>{#p/alphys}{#f/27}* Apparently she thinks not all humans are... bad now?',
                        '<25>{#p/alphys}{#f/27}* ...',
                        "<25>{#p/undyne}{#f/17}* Are you kidding?\n* Of COURSE they're not all bad!!",
                        '<25>{#p/alphys}{#f/10}* U-Undyne!?',
                        '<25>{#p/undyne}{#f/1}* That last human proved their kind CAN fight with honor.',
                        '<25>{#p/undyne}{#f/1}* That they CAN show respect to their opponents in battle.',
                        "<25>{#p/undyne}{#f/16}* ... and it's a good thing, too, because...",
                        '<25>{#p/undyne}{#f/14}* I doubt the Royal Guard will expand again any time soon.',
                        '<25>{#p/undyne}{#f/1}* Especially after the former queen returned, and...',
                        '<25>{#p/undyne}{#f/1}* ... gave the new one her full support.'
                    ]);
                } else if (2.1 <= SAVE.data.n.plot_date) {
                    addB([
                        "<25>{#p/alphys}{#f/26}* Undyne wasn't happy about it at first, but...",
                        '<25>{#p/alphys}{#f/8}* She came around to it in the end.',
                        '<25>{#p/alphys}{#f/27}* Apparently she thinks not all humans are... bad now?',
                        '<25>{#p/alphys}{#f/27}* ...',
                        "<25>{#p/undyne}{#f/17}* Are you kidding?\n* Of COURSE they're not all bad!!",
                        '<25>{#p/alphys}{#f/10}* U-Undyne!?',
                        '<25>{#p/undyne}{#f/14}* That last human proved their kind CAN in fact be... well, kind.',
                        '<25>{#p/undyne}{#f/1}* That they CAN show mercy to their opponents in battle.',
                        "<25>{#p/undyne}{#f/16}* ... and it's a good thing, too, because...",
                        '<25>{#p/undyne}{#f/14}* I doubt the Royal Guard will expand again any time soon.',
                        '<25>{#p/undyne}{#f/1}* Especially after the former queen returned, and...',
                        '<25>{#p/undyne}{#f/1}* ... gave the new one her full support.'
                    ]);
                } else {
                    addB([
                        "<25>{#p/alphys}{#f/19}* Undyne... wasn't happy about this at all.",
                        '<25>{#p/alphys}{#f/19}* She still blames you for what happened to the king, so...',
                        "<25>{#p/alphys}{#f/20}* It's... understandable why she'd be opposed to it.",
                        '<25>{#p/alphys}{#f/20}* ...',
                        "<25>{#p/undyne}{#f/16}* Yeah, it's a pretty stupid policy if you ask me.",
                        '<25>{#p/alphys}{#f/10}* U-Undyne!?',
                        "<25>{#p/undyne}{#f/17}* No matter HOW many nice humans come along, we CAN'T lower our guard!",
                        '<25>{#p/undyne}{#f/9}* ... but not many people would agree with me these days.',
                        "<25>{#p/undyne}{#f/16}* With the former queen's return, and her support for the new one...",
                        '<25>{#p/undyne}{#f/9}* I doubt the Royal Guard will ever be as strong as it once was.'
                    ]);
                }
                addB([
                    '<25>{#p/alphys}{#f/5}* ...\n* About the former queen.',
                    '<26>{#p/alphys}{#f/5}* By the time she returned, things were mostly back to normal...',
                    '<25>{#p/alphys}{#f/21}* And then she decided to reveal the truth about the humans.',
                    '<25>{#p/alphys}{#f/21}* Like... RIGHT after she found out herself.'
                ]);
                if (30 <= SAVE.data.n.bully) {
                    addB([
                        "<25>{#p/alphys}{#f/20}* ... eheh...\n* The people didn't react well at first.",
                        '<25>{#p/alphys}{#f/13}* They were more scared than anything...',
                        '<25>{#p/alphys}{#f/26}* A fact not helped by a certain human beating everyone up.',
                        '<25>{#p/alphys}{#f/20}* Thankfully, over time, Terrestria was able to calm them down...',
                        '<25>{#p/alphys}{#f/20}* ... by reminding them nobody had died.',
                        "<25>{#p/alphys}{#f/18}* I'm glad it worked.\n* I would have caused a riot saying that.",
                        '<25>{#p/alphys}{#f/8}* But... yeah, people are mostly positive about humanity now.'
                    ]);
                } else {
                    addB([
                        "<25>{#p/alphys}{#f/15}* ... thankfully, this DIDN'T cause a mass uprising...",
                        '<25>{#p/alphys}{#f/17}* Though, I guess being so well-known helped her out with that.',
                        '<25>{#p/alphys}{#f/8}* In fact, people are mostly positive about humanity now.'
                    ]);
                }
                addB(["<25>{#p/alphys}{#f/8}* So that's something.", '<26>{#p/undyne}{#f/16}* Heh, tell me about it...']);
                if (SAVE.data.b.undyne_respecc || 2.1 <= SAVE.data.n.plot_date) {
                    addB([
                        "<25>{#p/undyne}{#f/10}* It's a weird reality we live in now.",
                        '<25>{#p/undyne}{#f/1}* By the way, did you mention all the new schools being built?',
                        "<25>{#p/alphys}{#f/10}* Uh... yeah!\n* I totally... didn't."
                    ]);
                } else {
                    addB([
                        "<25>{#p/undyne}{#f/10}* I just wish it didn't mean scaling back the Royal Guard.",
                        '<25>{#p/undyne}{#f/1}* But... hey, at least those new schools are pretty cool.',
                        "<25>{#p/alphys}{#f/10}* Oh yeah!\n* I forgot you're a teacher there now!"
                    ]);
                }
                addB([
                    "<25>{#p/alphys}{#f/6}* Eheh...\n* The education system's doing well, too.",
                    '<25>{#p/alphys}{#f/1}* Suffice it to say, tuition prices have never been lower!',
                    "<25>{#p/alphys}{#f/8}* There's been so many new students learning all sorts of things.",
                    '<18>{#p/papyrus}{#f/0}... HEY GUYS!\nI JUST GOT BACK FROM MATH CLASS!!',
                    '<18>{#p/papyrus}{#f/4}WHO KNEW FOLDING SPACETIME COULD BE SO COMPLICATED...',
                    '<25>{#p/alphys}{#f/10}* ... yep, Papyrus took a class on warp field theory.',
                    '<18>{#p/papyrus}{#f/6}WHAT?? ARE YOU REFERRING TO ME IN THE THIRD PERSON??',
                    '<25>{#p/alphys}{#f/17}* ... and a writing class, from the sounds of it.',
                    "<25>{#p/undyne}{#f/12}* That's still a thing??",
                    '<18>{#p/papyrus}{#f/4}... WAIT...',
                    '<18>{#p/papyrus}{#f/7}WHO ARE YOU TALKING TO ON THE PHONE!?',
                    "<25>{#p/undyne}{#f/1}* It's the human.",
                    '<18>{#p/papyrus}{#f/0}OH!! OH!!\nLET ME TALK TO THEM!!',
                    '<25>{#p/undyne}{#f/14}* Be my guest.\n* I gotta get back to teaching my class.',
                    '<25>{#p/undyne}{#f/17}* They\'ve been struggling with the \"magical self- defense\" exercise.',
                    '<18>{#p/papyrus}{#f/0}... HELLO HUMAN!!\nHOW HAVE -YOU- BEEN LATELY!?',
                    '<18>{#p/papyrus}{#f/0}...',
                    "<18>{#p/papyrus}{#f/5}I GUESS YOU CAN'T REALLY ANSWER THAT.",
                    "<18>{#p/papyrus}{#f/6}BUT I HOPE YOU'RE DOING WELL!!"
                ]);
                if (SAVE.data.n.plot_date < 1.1) {
                    addB(["<18>{#p/papyrus}{#f/0}I'VE BEEN THINKING ABOUT YOU SINCE OUR EPIC SHOWDOWN."]);
                } else if (SAVE.data.b.flirt_papyrus) {
                    addB(["<18>{#p/papyrus}{#f/0}I'VE BEEN THINKING ABOUT YOU SINCE THAT DATE WE HAD."]);
                } else {
                    addB(["<18>{#p/papyrus}{#f/0}I'VE BEEN THINKING ABOUT YOU SINCE WE HUNG OUT."]);
                }
                addB([
                    '<18>{#p/papyrus}{#f/5}I TOLD EVERYONE IN MY CLASS ABOUT YOU, AND...',
                    "<18>{#p/papyrus}{#f/5}... ALL OF THEM WISHED YOU'D COME BACK SOMEDAY."
                ]);
                if (SAVE.data.b.f_state_kidd_betray) {
                    addB([
                        '<18>{#p/papyrus}{#f/4}... ALMOST ALL OF THEM, ANYWAY.',
                        '<18>{#p/papyrus}{#f/5}ONE CLASSMATE WHO SITS NEXT TO ME SAYS THAT YOU...',
                        '<18>{#p/papyrus}{#f/5}... UH, THEY SAY YOU BETRAYED THEM, SOMEHOW.',
                        '<18>{#p/papyrus}{#f/6}BUT LISTEN!!\nIF YOU EVER -DO- COME BACK...',
                        "<18>{#p/papyrus}{#f/0}I'LL HELP THE TWO OF YOU GET BACK ON GOOD TERMS!!"
                    ]);
                } else {
                    addB([
                        '<18>{#p/papyrus}{#f/0}ONE OF THEM EVEN WISHES THEY COULD GO WITH YOU!!',
                        "<18>{#p/papyrus}{#f/5}IT'S A CLASSMATE WHO SITS NEXT TO ME, ACTUALLY.",
                        '<18>{#p/papyrus}{#f/6}THEY SAY THEY OWE YOU THEIR VERY LIFE!!',
                        '<18>{#p/papyrus}{#f/4}... A HERO, EH?\nIF YOU EVER -DO- COME BACK...',
                        "<18>{#p/papyrus}{#f/0}I'LL BE SURE TO INVITE THEM TO YOUR RETURN PARTY."
                    ]);
                }
                addB([
                    '<18>{#p/papyrus}{#f/9}YOU HAVE MY PERSONAL PAPYRUS PROMISE! (TM)',
                    "<25>{#p/alphys}{#f/27}* ... hey, isn't that one of Mettaton's lines?",
                    '<18>{#p/papyrus}{#f/4}IN THE PAST, MAYBE... BUT NOT NOW.',
                    "<18>{#p/papyrus}{#f/5}APPARENTLY, HE'S DITCHING HIS OLD FORMAT ENTIRELY...",
                    '<18>{#p/papyrus}{#f/4}ALL TO START THE \"MTT CINEMATIC UNIVERSE.\"',
                    '<25>{#p/alphys}{#f/17}* Oh yeah, I heard a rumor about that.'
                ]);
                if (iFancyYourVilliany()) {
                    addB([
                        '<25>{#p/alphys}{#f/21}* They say he\'s doubling down on the whole \"villain\" thing.',
                        "<18>{#p/papyrus}{#f/4}... LIKE THAT'S NOT GOING TO BACKFIRE.",
                        '<25>{#p/alphys}{#f/22}* I KNOW, RIGHT!?!?'
                    ]);
                    if (30 <= SAVE.data.n.bully) {
                        addB([
                            "<25>{#p/alphys}{#f/10}* The people aren't going to want a reminder of what the human was.",
                            '<25>{#p/alphys}{#f/26}* ... no offense.'
                        ]);
                    } else {
                        addB([
                            "<25>{#p/alphys}{#f/10}* People don't even dislike humans anymore, so...",
                            "<25>{#p/alphys}{#f/3}* I don't really see the point in it."
                        ]);
                    }
                } else {
                    addB([
                        '<25>{#p/alphys}{#f/21}* They say he\'s doubling down on the whole \"killer robot\" thing.',
                        "<18>{#p/papyrus}{#f/4}LIKE THAT'S NOT GOING TO BACKFIRE.",
                        '<25>{#p/alphys}{#f/22}* I KNOW, RIGHT!?!?'
                    ]);
                    if (30 <= SAVE.data.n.bully) {
                        addB([
                            "<25>{#p/alphys}{#f/10}* The people aren't going to want a reminder of the human's violence.",
                            '<25>{#p/alphys}{#f/26}* ... no offense.'
                        ]);
                    } else {
                        addB([
                            '<25>{#p/alphys}{#f/10}* People are just trying to be positive nowadays, so...',
                            "<25>{#p/alphys}{#f/3}* I don't really see the point in it."
                        ]);
                    }
                }
                addB([
                    "<18>{#p/papyrus}{#f/5}YEAH... EVERYONE'S JUST TRYING TO HAVE HOPE NOW.",
                    '<18>{#p/papyrus}{#f/6}... INCLUDING MY BROTHER!!',
                    '<18>{#p/papyrus}{#f/0}AFTER THE ROYAL GUARD WAS REDUCED IN SIZE...',
                    '<18>{#p/papyrus}{#f/0}HE LEFT TO START A BUSINESS WITH BRATTY AND CATTY.',
                    '<18>{#p/papyrus}{#f/4}A SECOND-HAND TRASH BUSINESS.',
                    "<18>{#p/papyrus}{#f/5}I CAN'T SAY I APPROVE, BUT AT LEAST HE'S HAPPY.",
                    "<25>{#p/sans}{#f/0}* of course i'm happy.\n* selling trash is basically my calling.",
                    '<18>{#p/papyrus}{#f/7}SANS!! STOP COMING OUT OF NOWHERE LIKE THAT!!',
                    '<25>{#p/sans}{#f/2}* heh.\n* so how are ya, bucko?',
                    "<25>{#p/sans}{#f/0}* i hope my efforts to warn and protect you weren't in vain.",
                    '<18>{#p/papyrus}{#f/9}I KNEW IT!!\nYOU WERE A MOLE- RAT ALL ALONG!',
                    '<25>{#p/sans}{#f/0}* true.\n* i did infiltrate the royal guard.',
                    "<25>{#p/sans}{#f/3}* but i'd like to think i made a positive influence.",
                    '<25>{#p/sans}{#f/2}* after all, it was MY idea to put terrestria in charge.',
                    '<18>{#p/papyrus}{#f/1}WHAT!?\nYOUR IDEA!?',
                    '<18>{#p/papyrus}{#f/5}WOWIE...',
                    "<25>{#p/sans}{#f/3}* ... but that's all in the past now.",
                    "<25>{#p/sans}{#f/0}* the way i see it, i'm just glad things didn't end up worse.",
                    "<25>{#p/alphys}{#f/17}* I'm a little surprised you didn't come back to work at the lab.",
                    "<25>{#p/alphys}{#f/5}* You know, like you said you'd do when you were done with the guard.",
                    '<25>{#p/sans}{#f/3}* well, to be honest, i needed a break after all that serious stuff.',
                    '<25>{#p/sans}{#f/2}* but hey, at least papyrus is doing a bang-up job, right?',
                    '<25>{#p/alphys}{#f/6}* Eheh.\n* Yeah, he is.',
                    '<18>{#p/papyrus}{#f/0}I TRY MY BEST!!',
                    "<25>{#p/alphys}{#f/20}* ... though, there is this one thing that's been on my mind.",
                    '<25>{#p/sans}{#f/0}* what is it?',
                    '<25>{#p/alphys}{#f/27}* Well, according to the telescopes...',
                    '<25>{#p/alphys}{#f/27}* Something strange happened to the stars a while back.',
                    '<18>{#p/papyrus}{#f/6}STRANGE!?\nHOW CAN A STAR BE STRANGE!?',
                    "<25>{#p/alphys}{#f/15}* Well, okay, it wasn't actually the STAR that was strange.",
                    '<26>{#p/alphys}{#f/23}* It was the way it moved.',
                    "<25>{#p/alphys}{#f/20}* Or... didn't move?",
                    '<25>{#p/alphys}{#f/20}* It was more like... a jump, of sorts.\n* A sudden shift.',
                    '<25>{#p/alphys}{#f/26}* As if time outside the force field just... lept ahead a few years.',
                    "<25>{#p/sans}{#f/0}* you sure those reports didn't contain any counter-indications?",
                    '<25>{#p/alphys}{#f/20}* Well, I checked, and double-checked, and triple-checked...',
                    '<18>{#p/papyrus}{#f/6}BUT DID YOU QUADRUPLE-CHECK!?',
                    '<25>{#p/alphys}{#f/21}* Of course I did.',
                    "<25>{#p/alphys}{#f/5}* But it didn't change the result.",
                    '<25>{#p/sans}{#f/3}* huh.\n* how strange.',
                    "<25>{#p/sans}{#f/0}* i'd say this is worth a closer look.",
                    '<25>{#p/alphys}{#f/20}* Agreed.',
                    "<25>{#p/sans}{#f/3}* whoops.\n* the recording's almost at its time limit now.",
                    '<25>{#p/alphys}{#f/17}* ... oh.\n* I guess we should wrap this up, then.',
                    "<25>{#p/alphys}{#f/6}* Well, I... I hope you're doing alright out there.",
                    '<25>{#p/alphys}{#f/5}* If we managed to find happiness here, then... so can you.',
                    "<25>{#p/alphys}{#f/10}* After all, you've got the whole universe to explore!",
                    '<18>{#p/papyrus}{#f/0}WELL SAID, ALPHYS.\nWELL SAID.',
                    '<25>{#p/sans}{#f/2}* heh.\n* take care, okay?',
                    '<18>{#p/papyrus}{#f/9}YEAH!!\nUNTIL NEXT TIME!!',
                    '<25>{#p/alphys}{#f/8}* ... until next time.',
                    '<32>{#s/equip}{#p/event}* Click...'
                ]);
            }
            return { a, b, d, k, m };
        },
        neutral2: [
            '<32>{#s/phone}{#p/event}* Ring, ring...',
            '<25>{#p/asgore}{#f/1}* ...',
            '<25>{#p/asgore}{#f/1}* Howdy, young one.',
            '<25>{#p/asgore}{#f/1}* I do not know if this message will reach you, or if you are alive.',
            '<25>{#p/asgore}{#f/2}* I cannot confirm if the self-destruct sequence was terminated.',
            '<25>{#p/asgore}{#f/4}* However, if it was...',
            '<25>{#p/asgore}{#f/25}* Then I am grateful to have saved your life.',
            "<25>{#p/asgore}{#f/7}* I do not believe you were entirely at fault for Asriel's actions.",
            '<25>{#p/asgore}{#f/5}* Papyrus, Muffet, and many others you have shown mercy to...',
            '<25>{#p/asgore}{#f/6}* Can all attest to your attempts to make a difference.',
            '<25>{#p/asgore}{#f/21}* There is even someone with me who would like to say a few words.',
            '<25>{#p/kidd}{#f/7}* Dude, is that you!?',
            '<25>{#p/kidd}{#f/2}* I, uh, kinda forgot your name...',
            '<25>{#p/asgore}{#f/6}* Go on, tell them what you told me.',
            '<25>{#p/kidd}{#f/6}* Okay, okay.',
            "<25>{#p/kidd}{#f/4}* So like, y'know...",
            '<25>{#p/kidd}{#f/4}* Despite what Asriel did and stuff...',
            '<25>{#p/kidd}{#f/3}* I thought you were a pretty cool kid.',
            "<25>{#p/kidd}{#f/13}* If I ever got to see you again, we'd TOTALLY hang out together!",
            "<25>{#p/kidd}{#f/6}* And, maybe...\n* While we're at it...",
            '<25>{#p/kidd}{#f/5}* We could help each other get over what happened before.',
            '<25>{#p/asgore}{#f/6}* Hmm... that sounds rather nice!',
            '<25>{#p/asgore}{#f/5}* You have been through a lot together, so it is sensible to do so.',
            "<25>{#p/kidd}{#f/4}* It's too bad they had to leave, huh?",
            '<25>{#p/asgore}{#f/1}* ... indeed.',
            "<25>{#p/kidd}{#f/3}* Well, they're cool, so I'm sure they'll be alright.",
            "<25>{#p/kidd}{#f/1}* You will, won't you!?",
            '<25>{#p/asgore}{#f/20}* ...',
            '<18>{#p/papyrus}{#f/7}WHAT!?\nTHEY GET TO TALK BEFORE I DO!?',
            '<18>{#p/papyrus}{#f/4}... THIS IS TOTALLY UNFAIR.',
            '<25>{#p/kidd}{#f/14}* YOOOO PAPYRUS!!!',
            '<25>{#p/kidd}{#f/1}* You want the phone, skele-dude?',
            "<25>{#p/kidd}{#f/2}* 'Cause Asgore's gonna take me back to his house now.",
            "<18>{#p/papyrus}{#f/0}OF COURSE I DO!\nI'VE GOT IMPORTANT THINGS TO SAY.",
            "<25>{#p/kidd}{#f/1}* Cool, it's all yours!\n* See ya later, man!",
            '<25>{#p/asgore}{#f/6}* ... I will return after I have taken Monster Kid home.',
            '<18>{#p/papyrus}{#f/0}WELL THEN!\nWE SPEAK AT LONG LAST, HUMAN!',
            '<18>{#p/papyrus}{#f/5}OR, UH, I SPEAK.\nYOU JUST KIND OF... LISTEN.',
            "<18>{#p/papyrus}{#f/6}BUT THAT'S NOT IMPORTANT!",
            '<18>{#p/papyrus}{#f/0}I JUST WANTED TO SAY, YOU DID AN AMAZING JOB.',
            '<18>{#p/papyrus}{#f/5}BY NOT HURTING ALL THOSE PEOPLE.',
            '<18>{#p/papyrus}{#f/4}NO DOUBT \"ASRIEL\" MADE THINGS DIFFICULT...',
            '<18>{#p/papyrus}{#f/5}AND... MADE YOU DO THINGS YOU MUST REGRET NOW...',
            "<18>{#p/papyrus}{#f/0}BUT I SAY YOU SHOULDN'T HAVE TO FEEL THAT REGRET!",
            '<18>{#p/papyrus}{#f/9}YOU DID THE BEST YOU COULD, AFTER ALL!',
            "<18>{#p/papyrus}{#f/6}THAT'S GOT TO COUNT FOR SOMETHING, RIGHT?",
            '<18>{#p/papyrus}{#f/6}...',
            "<18>{#p/papyrus}{#f/5}TRUTH BE TOLD... IT HASN'T BEEN EASY FOR US.",
            "<18>{#p/papyrus}{#f/5}AFTER THE CORE'S DESTRUCTION WAS AVERTED...",
            '<18>{#p/papyrus}{#f/5}I SPOKE WITH THE OTHERS WHO HELPED TO AVERT IT.',
            '<18>{#p/papyrus}{#f/6}...\nMUFFET PRETTY MUCH JUST IGNORED ME.',
            '<18>{#p/papyrus}{#f/6}THE WORKERS WERE ASHAMED THEY LET IT GET THIS FAR.',
            '<18>{#p/papyrus}{#f/5}AND THAT DUMMY...',
            '<18>{#p/papyrus}{#f/5}... LOST SOMEONE VERY IMPORTANT TO THEM.',
            '<18>{#p/papyrus}{#f/5}A GHOST WHO FUSED WITH THE CORE TO STABILIZE IT.',
            '<18>{#p/papyrus}{#f/6}EVEN IF THAT GHOST IS TECHNICALLY STILL ALIVE...',
            "<18>{#p/papyrus}{#f/5}EXISTING IN SUCH A MANNER ISN'T IDEAL.",
            "<18>{#p/papyrus}{#f/3}IT'S LIKELY... THEY'LL NEVER SPEAK AGAIN.",
            '<18>{#p/papyrus}{#f/6}I TRIED CONSOLING THAT DUMMY, BUT...',
            '<18>{#p/papyrus}{#f/5}ALL THEY COULD DO WAS STARE INTO THE MACHINE.',
            '<18>{#p/papyrus}{#f/5}...',
            "<18>{#p/papyrus}{#f/6}S-STILL, I KNOW THEY'LL COME AROUND!",
            '<18>{#p/papyrus}{#f/0}I BELIEVE IN THEM!',
            '<18>{#p/papyrus}{#f/0}JUST LIKE I BELIEVE IN YOU.',
            '<18>{#p/papyrus}{#f/5}I BELIEVE IN EVERYONE...',
            '<18>{#p/papyrus}{#f/4}APART FROM THAT IMPOSTROUS FRIEND OF YOURS.',
            '<18>{#p/papyrus}{#f/0}HE LOST THE RIGHT TO HAVE ME BELIEVE IN HIM.',
            '<25>{#p/asgore}{#f/6}* Alas, I have returned.',
            '<18>{#p/papyrus}{#f/0}WELCOME BACK!',
            '<25>{#p/asgore}{#f/7}* I trust you have said all you wanted to?',
            "<18>{#p/papyrus}{#f/6}WELL, THERE'S A LOT MORE I'D -LIKE- TO SAY...",
            '<18>{#p/papyrus}{#f/5}BUT THE BATTERY ONLY LASTS FOR SO LONG.',
            '<25>{#p/asgore}{#f/1}* I see.',
            "<18>{#p/papyrus}{#f/5}I'LL... HAND THE PHONE BACK TO YOU, NOW.",
            '<25>{#p/asgore}{#f/2}* ...',
            '<25>{#p/asgore}{#f/2}* He is correct.',
            '<25>{#p/asgore}{#f/1}* The batteries necessary to power such a long- range transmission...',
            "<25>{#p/asgore}{#f/2}* Demand a surplus of the CORE's power.",
            '<25>{#p/asgore}{#f/4}* Knowing who inhabits and regulates it now...',
            '<25>{#p/asgore}{#f/2}* It would be wise not to strain it more than is necessary.',
            '<18>{#p/papyrus}{#f/0}YEAH, WELL, THAT MAKES SENSE.',
            '<25>{#p/asgore}{#f/15}* ... however, before the message concludes.',
            '<25>{#p/asgore}{#f/15}* I must issue you one last warning.',
            '<25>{#p/asgore}{#f/14}* ...\n* Do not follow him.\n* Do not trust him.',
            '<25>{#p/asgore}{#f/14}* Do not believe anything he tells you.',
            '<25>{#p/asgore}{#f/13}* Do not let him do what he wants, and do not let him hurt others.',
            '<18>{#p/papyrus}{#f/6}THIS IS PROBABLY MY CUE TO LEAVE.\nGOODBYE!',
            '<25>{#p/asgore}{#f/14}* ... do not allow him to coerce you into violence yourself.',
            '<25>{#p/asgore}{#f/13}* And if you are left with no other option...',
            '<25>{#p/asgore}{#f/14}* ... do not hesitate to put an end to him.',
            '<25>{#p/asgore}{#f/2}* ...',
            '<25>{#p/asgore}{#f/4}* Good luck.',
            '<32>{#s/equip}{#p/event}* Click...'
        ],
        lastblook1: [
            () => [
                '<32>{#p/napstablook}* oh...\n* hey frisk......',
                ...(SAVE.data.b.ufokinwotm8
                    ? [
                        '<32>* ...',
                        "<32>* ... huh?\n* what's with that look?",
                        '<32>* did i... get in your way?',
                        '<32>* ...',
                        "<32>* oh......\n* i did, didn't i.........",
                        '<32>* sorry...',
                        '<32>* force of habit......',
                        "<32>* i'll... just be out of your way now......",
                        '<32>* please......\n* forgive me............'
                    ]
                    : [
                        "<32>* they're still out there building the front door, so...",
                        '<32>* not much point in trying to go there, i guess',
                        ...(SAVE.data.b.c_state_secret4 && !SAVE.data.b.c_state_secret4_used
                            ? [
                                '<32>* ...',
                                '<32>{#p/human}* (You repeat the secret told to you by Napstablook in Archive Six.)',
                                '<32>{#p/napstablook}* a magic trick...?',
                                '<32>* wait...',
                                '<33>* i think i know what you mean...\n* let me try...'
                            ]
                            : [])
                    ])
            ],
            () => [
                ...(SAVE.data.b.c_state_secret4_used
                    ? ["<32>{#p/napstablook}* heh...\n* i really appreciate everything you've done, frisk."]
                    : ["<32>{#p/napstablook}* hey...\n* i really appreciate everything you've done, frisk."]),
                '<32>* setting us free and all...',
                '<32>* ...',
                "<32>* the truth is, my cousins and i started to think we'd never escape.",
                "<32>* it'd been so long since the last human arrived, and...",
                '<32>* considering what we recently found out about humanity...',
                '<32>* about how they all left the home galaxy...',
                "<32>* it's a miracle you even came to the outpost at all."
            ],
            () =>
                SAVE.data.b.a_state_hapstablook
                    ? [
                        '<32>{#p/napstablook}* oh yeah, about my cousins...',
                        "<32>* after the whole mettaton thing, it's been going pretty good.",
                        "<32>* we've been talking it over, and...",
                        "<32>* ... we've decided to re-open the snail farm here on eurybia.",
                        "<32>* mettaton's doing the advertising, while i and the others look after the snails.",
                        '<32>* we even found a place we could stay once we get settled in...',
                        '<32>* a very kind house told us we could live there.',
                        "<32>* apparently, it's the same one undyne used to live in..."
                    ]
                    : [
                        '<32>{#p/napstablook}* oh right... my cousins.',
                        "<32>* i don't really know if i should be telling you this, but...",
                        '<32>* we sort of figured out that mettaton might be our long-lost cousin.',
                        '<32>* the others and i tried to ask him about it, but...',
                        "<32>* ... it didn't really go the way we'd hoped.",
                        '<32>* then, everyone was blaming each other for messing it up...',
                        "<32>* i... haven't felt like talking with them since.",
                        '<32>* yeah... this was a bad topic',
                        '<32>* sorry...'
                    ],
            () => [
                ...(SAVE.data.b.a_state_hapstablook
                    ? ['<32>{#p/napstablook}* ...', '<32>* speaking of family...']
                    : ['<32>{#p/napstablook}* ...', "<32>* hey...\n* even if my family's not doing too well..."]),
                '<32>* that human i adopted is... really something, heh',
                "<32>* they say i'm their favorite monster...",
                '<32>* ... knowing what they went through in the archive, that really means something.',
                '<32>* and... they always find a way to make me smile.',
                '<32>* like, a few hours ago, when the walls were still being put in...',
                '<32>* they wanted to go outside to see the construction before it was too late.',
                '<32>* when i said they could, they were so happy...',
                '<32>* now i finally understand why people like raising children.'
            ],
            () => [
                '<33>{#p/napstablook}* i guess i should be thankful...',
                '<32>* to asgore, i mean',
                '<32>* he and alphys were the ones who trusted me to adopt this human.',
                '<32>* i... also found out he was the hairy guy who came to our farm all the time.',
                "<32>* he'd always take such good care of the snails he purchased...",
                '<32>* even healing them if they ever got hurt before dying of natural causes.',
                '<32>* for someone like him... to trust me with something like this...',
                '<32>* ...',
                "<32>* well... i know he'll take really good care of you, at least.",
                ...(SAVE.data.b.f_state_kidd_betray
                    ? ['<32>* you might not have any siblings, but...']
                    : SAVE.data.b.svr
                        ? ['<32>* along with those new siblings of yours...']
                        : ['<32>* along with that new sibling of yours...']),
                "<32>* he'll do the best he can to keep you happy and healthy."
            ],
            () => [
                '<32>{#p/napstablook}* you know...\n* before the snail farm, and...',
                '<33>* before the outpost...',
                '<32>* my life on the old homeworld was a quiet one.',
                '<32>* that old homeworld...',
                '<32>* it really was a special place.',
                '<32>* the way the sky set itself on fire every day...',
                '<32>* how everyone who lived there was so at peace before the war...',
                "<32>* back then, i didn't think anything of it.",
                '<32>* now... after nearly two hundred years of captivity......',
                "<32>* i realized i'd been taking it all for granted."
            ],
            () => [
                '<32>{#p/napstablook}* well, anyway.\n* the old homeworld was great and all...',
                "<32>* but the new one's got a lot going for it, too.",
                '<32>* like the wildlife.',
                '<32>* when i traveled the surface earlier, i ran into some of it...',
                "<32>* and that's when i saw something interesting happen",
                '<32>* the creatures... starting using magic.',
                "<32>* when i mentioned this to alphys, she said the planet didn't have any magic...",
                '<32>* not according to the scans they took when we first arrived.',
                '<32>* has our arrival to this world...',
                "<32>* ... given it something it didn't have before?"
            ],
            () => [
                '<32>{#p/napstablook}* ... heh.',
                "<32>* i've been rambling a lot, huh?",
                '<32>* i appreciate you listening to me, though',
                "<32>* it's really nice of you to do that for me, frisk.",
                '<32>* just wanted you to know that.'
            ],
            () => [
                '<32>{#p/napstablook}* huh?\n* you still wanted to talk?',
                '<32>* ...',
                '<32>* oh......',
                '<32>* i guess i ran out of conversation topics',
                "<32>* i doubt i'd have anything else of interest to say, so...",
                '<32>* feel free to go do something else, now'
            ],
            () => [
                '<32>{#p/napstablook}* ... frisk, uh...',
                "<32>* i'm not really sure what to talk about anymore",
                '<32>* maybe... if you come back later today...',
                "<33>* i'll think of something else..."
            ],
            () => [
                '<32>{#p/napstablook}* ... oh.........',
                "<32>* you're.........\n* still here.........",
                '<32>* even though i have nothing else to say.........',
                '<32>* well... i guess, if you just wanted my company... then...',
                '<32>* feel free to stick around a while longer'
            ],
            () => [
                '<32>{#p/napstablook}* ... hmm...',
                '<32>* actually...',
                '<32>* ... would you like me to tell you a joke?',
                "<32>* i don't have much of a sense of humor, but i can try..."
            ],
            () => [
                '<32>{#p/napstablook}* okay...\n* here goes...',
                '<32>* if a ghost gets tired in the middle of the road, what does it do?',
                '<32>* ...',
                '<32>* answer... it {@fill=#ff0}naps to block{@fill=#fff} you.',
                '<32>* get it?\n* napstablook?\n* naps to block?',
                '<32>* yeah...\n* that was kinda bad'
            ],
            () => [
                '<32>{#p/napstablook}* ... you wanted me to tell you another joke?',
                '<32>* hmm... let me think about it...'
            ],
            () => [
                "<32>{#p/napstablook}* okay, let's see...",
                '<32>* if a ghost changed vessels so they could have a child, what would you call it?',
                '<32>* ...',
                '<32>* answer... a {@fill=#ff0}trans-parent.{@fill=#fff}.',
                '<32>* ... heh.'
            ],
            () => ['<32>{#p/napstablook}* ... you wanted me to tell you a third joke?', '<32>* well... if you insist...'],
            () => [
                "<32>{#p/napstablook}* okay.\n* i've got it.",
                '<32>* if a restaurant hires a ghost to taste test their food, what does that make the ghost?',
                '<32>* ...',
                '<32>* answer... a {@fill=#ff0}food-in-spectre.{@fill=#fff}.'
            ],
            () => [
                '<32>{#p/napstablook}* alright, alright.\n* maybe i got a little carried away with that one.',
                '<33>* but i hope you liked it anyway.'
            ],
            () => [
                '<32>{#p/napstablook}* ...',
                '<32>* oh...',
                "<32>* ... i guess i'm at a loss for what to say.",
                "<32>* you've been such a good listener, i'd feel bad if i ran out of ideas.",
                "<32>* c'mon, blooky, think...",
                '<32>* ... what can you talk about...'
            ],
            () => [
                '<32>{#p/napstablook}* wait, hold on',
                '<32>* do you know anything about ghost food?',
                '<32>* that last joke kind of got me thinking about it.',
                "<32>* you must be confused... it's not really explained anywhere.",
                '<32>* if you like, i can tell you about it...'
            ],
            () => [
                '<32>{#p/napstablook}* ... so, ghost food...',
                "<32>* it's exactly like normal monster food, except...",
                '<32>* when preparing it...',
                "<32>* there's a special kind of spell you have to use to make it edible for ghosts.",
                "<32>* that's right... any monster food can become ghost food."
            ],
            () => [
                '<32>{#p/napstablook}* as it turns out, though...',
                '<32>* certain kinds of food are easier to convert than others.',
                '<32>* like... standard fruit.\n* or milkshakes.',
                ...(SAVE.data.b.item_blookpie
                    ? ['<32>* but something like that exoberry pie you bought from me...']
                    : ['<32>* but something like that exoberry pie i had in my shop...']),
                '<32>* that... would take a lot of magical power to make.',
                '<32>* the more complicated the food, the more difficult it is to convert into ghost food.'
            ],
            () => [
                ...(SAVE.data.b.a_state_hapstablook
                    ? ['<32>{#p/napstablook}* this one time, my... er, mettaton made me a chocolate cake.']
                    : ['<32>{#p/napstablook}* this one time, my cousin made me a chocolate cake.']),
                '<32>* chocolate filling, chocolate icing... chocolate everything.',
                "<32>* if i didn't know any better, i'd think it was actual human food.",
                ...(SAVE.data.b.a_state_hapstablook
                    ? [
                        '<32>* but somehow, he managed to convert all of that into a ghost food...',
                        '<32>* not for a special occasion, but just because he wanted to see me smile.'
                    ]
                    : [
                        '<32>* but somehow, they managed to convert all of that into a ghost food...',
                        '<32>* not for a special occasion, but just because they wanted to see me smile.'
                    ]),
                '<32>* well... i did.\n* and we ate the cake together.',
                '<32>* and i was happy.'
            ],
            () => [
                '<32>{#p/napstablook}* ...',
                "<32>* heh...\n* i think i'm gonna pretend to sleep for a while...",
                '<32>* it helps me unwind after a long day like this one.',
                "<32>* ... wait, it's morning...",
                '<32>* i guess that would make it a long night, then.',
                "<32>* days and nights...\n* that's going to take some getting used to.",
                '<32>* ...',
                '<32>* well... thanks for talking to me, frisk',
                '<32>* feel free to lay down next to me... if you like......',
                '<32>* ...',
                '<32>* Zzz... Zzz...'
            ],
            () => [
                '<32>{#p/napstablook}* Zzz... Zzz...',
                '<32>* Zzz... Zzz...',
                "<32>{#p/basic}* This ghost keeps saying 'z' out loud repeatedly, pretending to sleep.",
                choicer.create('* (Lay down next to it?)', 'Yes', 'No')
            ],
            () => ['<32>{#p/basic}* The ghost is still here.', choicer.create('* (Lay down next to it?)', 'Yes', 'No')]
        ],
        lastblook2: ['<32>{#p/napstablook}* oooooooooooo......', '<32>* this is really nice......'],
        lastblook3: [
            '<32>{#p/human}* (...)',
            '<32>* (You feel... something.)',
            '<32>{#p/napstablook}* oh, sorry... i should probably explain what this is...',
            '<32>* ...\n* so, uh...',
            '<32>* i took your body...\n* as a vessel...',
            '<32>* and now...... we inhabit the same space......',
            "<32>* i don't know why, but the last human who tried this... really liked it...",
            '<32>* so...',
            '<32>* maybe you will too...'
        ],
        lastblook4: [
            "<32>{#p/napstablook}* well, we can stay like this as long as you don't try to move.",
            '<32>* so...\n* only try to move around when you want it to end, i guess.'
        ],
        lastblook5: [
            '<32>{#p/napstablook}* well...\n* i hope you liked that...',
            '<32>* or at least found it kind of interesting...',
            '<32>* or something...'
        ],
        view: () => [choicer.create('* (Are you ready to go outside?)', 'Yes', 'No')],
        computer1: () =>
            SAVE.data.b.ufokinwotm8
                ? ["<32>{#p/human}* (But you didn't feel like wasting your time here.)"]
                : ["<32>{#p/basic}* The computer's offline, but there's an empty slot for a computer chip."],
        computer2: () => [choicer.create('* (Insert the Computer Chip?)', 'Yes', 'No')],
        computer3: ['<32>{#p/human}* (You decide not to insert.)'],
        computer4: [
            '<32>{#p/basic}* Ah!\n* Thank you!\n* Thank you so much!',
            '<32>* You really took care of me!\n* You have found a computer very far away indeed!',
            '<32>* ...',
            '<32>* I have established a link between this computer and my body on the outpost.',
            '<32>* ...',
            '<32>* I never could have imagined how it would feel to exist in two places at once!',
            '<32>* It is... incredible...',
            '<32>* I shall not forget this deed, fellow traveler!'
        ],
        computer5: ['<32>{#p/basic}* Thank you, fellow traveler.\n* I owe you my future.'],
        end1: [
            '<25>{*}{#p/asgore}{#f/6}* This is emergency program one.{^20}{%}',
            '<25>{*}{#p/asgore}{#f/6}* Initiating automated self-destruct protocol.{^20}{%}'
        ],
        end2: [
            '<25>{*}{#p/asgore}{#f/6}* This is emergency program one.{^20}{%}',
            '<25>{*}{#p/asgore}{#f/6}* The self-destruct protocol has been terminated remotely.{^20}{%}',
            '<25>{*}{#p/asgore}{#f/6}* Systems powering down.{^20}{%}'
        ],
        save1: '<32>{#p/human}{@fill=#f00}* ($(x) left.)',
        save2: '<32>{#p/human}{@fill=#f00}* (Determination.)',
        frontstop: pager.create(
            0,
            [
                "<32>{#p/basic}* Sorry, kiddo.\n* We're still out here building the front yard.",
                '<32>* And the front door.',
                "<32>* If you're looking for Asgore, he's out here with us.",
                "<32>* We'll be done in a few hours, so just sit tight for now."
            ],
            ['<32>{#p/basic}* Just a few more hours, kiddo.', '<32>* Then you can come out.'],
            ['<32>{#p/basic}* A few more hours.']
        ),
        charatrigger: {
            _frontier1: pager.create(
                0,
                [
                    '<32>{#p/basic}* So this is your room, huh?',
                    '<32>* Kind of strange...',
                    "<32>* ... but who am I kidding, this is you we're talking about.",
                    "<32>* You'd sleep in a doggy bed if you had the choice.",
                    "<32>* And you'd eat the dog food.",
                    "<32>* And you'd like it if somebody tried to pet you whilst eating said dog food."
                ],
                [
                    "<32>{#p/basic}* I'd offer you a treat, but...",
                    "<32>* Even with my new ability to appear visually, I'm still just a ghost.",
                    "<32>* You'll have to settle for ghost dog treats, I'm afraid."
                ],
                [
                    '<32>{#p/basic}* Oh, right.\n* My new ability.',
                    "<32>* I tried showing myself to Asriel like before, but he couldn't see me...",
                    '<32>* So it looks like it only works for you right now.',
                    '<32>* Still.\n* Better than nothing.',
                    '<32>* At least you can actually walk up to and talk to me now.'
                ],
                ['<32>{#p/basic}* Like that, for example.'],
                ['<32>{#p/basic}* Or that.'],
                ['<32>{#p/basic}* Or even that!'],
                ['<32>{#p/basic}* ...', '<32>{#p/basic}* You can stop now.'],
                ["<32>{#p/basic}* There's more to your room than me, isn't there?"],
                ['<32>{#p/basic}* ...', '<32>{#p/basic}* Maybe not.'],
                ["<32>{#p/basic}* Maybe I'm all you've got."],
                ['<32>{#p/basic}* In which case...', "<32>{#p/basic}* We'll be here for a long time."],
                ['<32>{#p/basic}* A very long time.'],
                ['<32>{#p/basic}* A very, very long time.'],
                ['<32>{#p/basic}* A very, very long time indeed.'],
                ["<32>{#p/basic}* Don't you have anything better to do?"],
                []
            ),
            _frontier2: pager.create(
                0,
                [
                    '<32>{#p/basic}* Ah, the humble hallway.',
                    '<32>* For Asriel and I, it was the starting point of countless adventures...',
                    '<33>* ... running dauntlessly across the various rooms of the house.',
                    '<32>* I know, right?\n* So very adventurous.',
                    '<32>* Sadly, we had to stop after the mirror got smashed in for the seven hundredth time.',
                    "<32>* You wouldn't believe the excuses I'd come up with...",
                    '<33>* Like when I blamed a particle collider for shooting a stray atom from Earth to the outpost.',
                    '<33>* And somehow only hitting the glass because it \"phased\" through the wall.',
                    "<32>* Yeah... that one might've been a stretch."
                ],
                [
                    '<32>{#p/basic}* Nowadays, though, hallways are just hallways.',
                    '<32>* And excuses are just excuses.',
                    '<32>* Is there a valuable life lesson in there somewhere?\n* Probably.',
                    "<32>* I will say, there's a kind of symbolism to a ghost in a hallway...",
                    '<32>* With the whole \"between one place and another\" thing going on.',
                    '<32>* Actually, that probably only applies to human ghosts.',
                    '<32>* Monster ghosts are just born like that naturally...',
                    "<32>* So, if anything, they'd be in the room at the beginning of the hallway...",
                    '<32>* ... rather than standing in the middle of it.'
                ],
                [
                    '<32>{#p/basic}* Sorry.\n* Went on a tangent there.',
                    '<32>* But what did you expect me to go on when you spoke to me in a boring hallway?',
                    '<33>* Boring hallway, boring tangent.\n* That makes sense, right?'
                ],
                ["<32>{#p/basic}* Or maybe it doesn't.\n* What do I know."],
                ["<32>{#p/basic}* Apart from the fact that I've run out of things to say."],
                ['<32>{#p/basic}* That, I know for sure.'],
                ['<32>{#p/basic}* But what can you do?', '<32>{#p/basic}* ... wait, I know!\n* We could go to a new room!'],
                []
            ),
            _frontier3: pager.create(
                0,
                [
                    "<32>{#p/basic}* Ooh... Asgore's room.",
                    '<32>* The big guy sure loves his diaries, huh?',
                    "<32>* Even though he hasn't written anything into that one yet, I'm sure he'll do so soon.",
                    '<32>* Reading them has always been a guilty pleasure of mine...'
                ],
                [
                    "<32>{#p/basic}* What?\n* Everyone's got some kind of guilty pleasure, don't they?",
                    '<32>* I wonder what yours would be...',
                    "<32>* Maybe I'll find out later."
                ],
                [
                    "<32>{#p/basic}* For now, though, I'll just be hanging around.",
                    '<32>* Watching, waiting...',
                    "<32>* ... ready to catch you the moment you do something you don't want me to see!"
                ],
                ["<32>{#p/basic}* Okay, maybe I wouldn't actually go that far."],
                ["<33>{#p/basic}* Not while you're awake, anyway."],
                []
            ),
            _frontier4: pager.create(
                0,
                [
                    "<32>{#p/basic}* I took a peek outside, and they're STILL working on construction.",
                    '<32>* The whole front of the house is STILL a big mess.',
                    "<32>* And Asgore's... STILL tending to the ground...",
                    '<32>* ... while the former CORE workers take their sweet, sweet time building the porch.',
                    "<32>* I wonder what it'll look like when it's done...",
                    "<32>* Hopefully, with Asgore in charge, it'll look better than what we've had before."
                ],
                [
                    "<32>{#p/basic}* Actually, Asgore's only in charge of the design.",
                    '<32>* Since construction started yesterday, Doge has been the one giving the orders.',
                    '<32>* I snuck outside then, too.',
                    "<32>* She's strict, but she seems to know what she's doing.",
                    '<32>* Which is great, because as much as I love Asgore for who he is...',
                    '<32>* He most certainly is NOT your ideal foreman.'
                ],
                [
                    '<33>{#p/basic}* Speaking of things being built, they finished the balcony earlier this morning.',
                    '<32>* Monster Kid and Asriel are both outside...\n* ... sightseeing.',
                    "<32>* They sure do that a lot together... they're probably waiting for you to join them.",
                    "<32>* Once you're done taking in YOUR surroundings, you could go see them.",
                    '<33>* Or you could just go back to your room.\n* Whatever floats your hoverboat.'
                ],
                [
                    '<32>{#p/basic}* Oh yeah, about boats...',
                    "<32>* I guess those aren't really needed around here.",
                    "<32>* But... Frisk!\n* There are places on this world you can't be without one.",
                    '<32>* Especially the bog basins.\n* All that murky water...',
                    '<32>* Just keep it in mind.'
                ],
                [
                    "<32>{#p/basic}* And no, you can't just get by swimming in those kinds of places.",
                    '<33>* Only some of them.\n* And only at a good time of day.'
                ],
                [
                    '<32>{#p/basic}* Mind you, do monsters even have a sense of the time of day?',
                    '<32>* Most WERE born in space...'
                ],
                ["<32>{#p/basic}* ... maybe that's a question for another time of day."],
                []
            ),
            _frontier5: pager.create(
                0,
                [
                    '<32>{#p/basic}* Three little chairs at the dining table...',
                    '<32>* One for you, one for Asriel, and one for Monster Kid.',
                    "<32>* That's fine, really.\n* Asgore wouldn't know I'm here.",
                    '<32>* Still...',
                    '<32>* It does feel strange not to have a place there.'
                ],
                [
                    "<32>{#p/basic}* Asriel and I loved to swap the chairs around when Mom wasn't looking.",
                    "<32>* Even Asgore would get in on it sometimes.\n* She... wasn't impressed.",
                    '<32>* But it was all in good fun.',
                    "<32>* Heck, he used to check under Asriel's chair for space creatures when he sat down.",
                    "<32>* I'll never forget that time Toriel sat down on the chair, which we swapped beforehand...",
                    '<33>* Asgore gave her the exact same treatment, and it was GLORIOUS.',
                    '<32>* All of us were laughing... except for Toriel, who sat there in disbelief.',
                    '<32>* Well.\n* She came around to it later.'
                ],
                () => [
                    "<32>{#p/basic}* But, yeah... she wasn't much for the chicanery we got up to.",
                    SAVE.data.b.c_state_secret1_used && SAVE.data.b.c_state_secret5_used
                        ? "<32>* And even if she's not the same as she used to be..."
                        : "<32>* And even if she won't be here all the time...",
                    "<32>* It's a good thing Asriel's got someone like you to calm him down.",
                    '<32>* When he gets excited, he gets REALLY excited.',
                    '<32>* ...',
                    '<32>* ... or, used to, anyway.'
                ],
                () => [
                    "<32>{#p/basic}* I guess it's unfair to think of him as the same person he once was.",
                    SAVE.flag.n.killed_sans
                        ? '<32>* With all that stuff he mentioned about trying to corrupt you...'
                        : '<32>* With all that stuff he mentioned about hurting you...',
                    "<32>* He's probably a very different person by now.",
                    '<32>* Not unlike myself.',
                    '<32>* I just hope he can make the best of what he has, now.',
                    "<32>* And that you'll be there for him when he needs you."
                ],
                [
                    "<32>{#p/basic}* But I guess I'm starting to repeat myself.",
                    "<32>* We've got a home, we've got sunlight... so there's no reason to complain!",
                    '<32>* ... or something like that.'
                ],
                []
            ),
            _frontier6: pager.create(
                0,
                [
                    '<32>{#p/basic}* Of course they put a microwave in here.',
                    '<32>* Of course they did.',
                    "<32>* No doubt that'll be Asriel's primary source of food.",
                    '<32>* Yeah, he\'s what you\'d call a \"microwave master.\"'
                ],
                [
                    "<32>{#p/basic}* I mean, it's bad enough that so many of our ingredients are replicated these days...",
                    '<32>* Formed with matter-energy conversion nonsense, rather than legitimate cooking.',
                    '<32>* But at least that can still produce something palletable.',
                    '<32>* Using the microwave is just...',
                    "<32>* It's wrong.",
                    "<32>* It's so very wrong."
                ],
                [
                    "<33>{#p/basic}* I mean, that's just my opinion.",
                    '<32>* You can feel free to disagree, and knowing you, you probably do...',
                    '<32>* But some opinions...',
                    "<32>* Let's just say some opinions are more correct than others."
                ],
                [
                    '<32>{#p/basic}* All we can hope for is that Eurybia has a better selection of fresh ingredients.',
                    '<32>* Considering Alphys was the one to seek out planets in the first place...',
                    "<32>* You can't blame me for being at least a little wary."
                ],
                [
                    "<33>{#p/basic}* If Asriel's a microwave master, Alphys would be a microwave overlord.",
                    "<32>* That's all I'm saying."
                ],
                ['<32>{#p/basic}* No, really.', "<32>* Won't say anything more."],
                ['<32>{#p/basic}* ...', '<32>{#p/basic}* Not in the kitchen, anyway.'],
                []
            ),
            _frontier7: pager.create(
                0,
                [
                    "<32>{#p/basic}* The balcony's just outside...",
                    '<32>* I wonder if the birds are saying anything interesting.',
                    '<33>* Like \"what a nice house!\"\n* Or \"the weather\'s great today.\"',
                    "<32>* Maybe they don't like the house OR the weather.\n* That'd be... kind of sad.",
                    "<32>* Maybe they're not even birds.\n* Who knows what kinds of sounds birds make here.",
                    '<32>* Who knows if birds even exist here at all.',
                    "<33>* For all we know, what we're hearing are the cries of the damned buried deep underground."
                ],
                [
                    '<32>{#p/basic}* After the monsters have lived here long enough, the planet might gain some form of magic.',
                    '<32>* If that happens, would the animals be affected, too?',
                    '<32>* Would they become conscious?\n* Understand us?',
                    '<32>* Would we understand them?',
                    "<33>* If the sounds we're hearing really ARE cries of the damned, I'm not sure I'd want to know."
                ],
                [
                    '<32>{#p/basic}* But yeah, planetary magic.',
                    "<32>* I think that's what happened to Krios, when monsters first gained THEIR magic.",
                    '<32>* Either that, or the planet already had magic, and gave it to them.',
                    "<32>* We'd have to ask Terrestria about that sort of thing.",
                    "<32>* She'd know."
                ],
                [
                    "<32>{#p/basic}* Hey.\n* Don't be nervous about going out there, Frisk.",
                    "<32>* I'm sure those two would be happy to see you there.",
                    '<32>* And if my analysis of the position is right...',
                    '<32>* The planet itself will, too.'
                ],
                ["<32>{#p/basic}* Don't quote me on that, though.", "<32>* I'm not much of a chess player."],
                [
                    "<32>{#p/basic}* The smartest move I've ever played in a board game was a double-jump in checkers.",
                    '<32>* It was downhill from there.'
                ],
                [
                    "<32>{#p/basic}* And if we weren't buried in a jungle, it might be downhill from here, too.",
                    '<32>* Not that I blame Asgore for choosing such a low-risk location.',
                    "<32>* He's got two adopted children to think about now...",
                    '<32>* Not to mention his own son.'
                ],
                ['<32>{#p/basic}* Mountainside living might be cool, but the jungle has its own appeal, too.'],
                []
            ),
            _frontier9: pager.create(
                0,
                [
                    '<32>{#p/basic}* Righty-o.\n* The bathroom.',
                    '<32>* The bathroom, the bathroom, the bathroom...',
                    '<32>* Bathroom bathroom bathroom bathroom bathroom.',
                    '<32>* ...',
                    '<32>* Bathroom.',
                    '<32>* ...',
                    '<32>* Bathroom!!!'
                ],
                [
                    '<32>{#p/basic}* Okay... I will admit.',
                    "<32>* It is pretty cool that you've got extra-fluffy shampoo.",
                    "<32>* Even if it doesn't actually make sense for a human to have it.",
                    '<32>* Unless... you ARE turning into a goat...',
                    '<32>* ... baaah?'
                ],
                [
                    '<32>{#p/basic}* ...',
                    "<32>* There's a distinct possibility you are not the only one who uses this bathroom."
                ],
                []
            ),
            _frontier10: pager.create(
                0,
                [
                    "<32>{#p/basic}* So this is Monster Kid and Asriel's room...",
                    "<32>* I don't have much to say.",
                    '<32>* Though... that poster on the wall is pretty cool.',
                    '<32>* The old homeworld...',
                    "<32>* Only now, it's in sepia tone."
                ],
                [
                    "<32>{#p/basic}* I'm honestly not surprised he made this room so much smaller than yours.",
                    "<32>* He knows monsters very well.\n* If the bed's comfortable, who cares what room it's in?",
                    "<32>* Not monsters, that's who!"
                ],
                ['<32>{#p/basic}* ...', '<32>* That must be why Asriel slept in your bed last night as opposed to his.'],
                []
            ),
            _void: pager.create(
                0,
                [
                    '<32>{#p/basic}* From what I can tell...',
                    '<32>* This room belonged to someone who spent a long time doing one specific thing.',
                    "<32>* If I had that kind of free time, I have no idea what I'd do.",
                    "<32>* I do know I wouldn't spend it on such a tedious and demoralizingly-large project.",
                    "<32>* But I'm not them, so I wouldn't know what goes through their head."
                ],
                []
            )
        },
        balconyX: [
            '<32>{#p/human}* (And yet, despite the sight ahead of you...)',
            "<32>{#p/human}* (... you can't help but feel as if there's something missing.)"
        ],
        balcony0: ['<25>{#p/kidd}{#f/3}* Oh, hey Frisk...', '<25>{#f/1}* I was getting worried you would never wake up!'],
        balcony1: () => [
            '<25>{#p/kidd}{#f/3}* ... haha.',
            ...(SAVE.data.b.ufokinwotm8
                ? ["<25>{#f/2}* I can't believe I actually...", '<25>{#f/4}* ... have...']
                : [
                    "<25>{#f/2}* I can't believe I actually have a home now.",
                    '<25>{#f/7}* And with King Asgore!?',
                    '<25>{#f/1}* All the other kids are gonna want to hang out with us...',
                    "<25>{#f/1}* We'll get to throw house parties ALL the time!"
                ])
        ],
        balcony2: () =>
            SAVE.data.b.ufokinwotm8
                ? [
                    '<25>{#p/kidd}{#f/4}* Uh... are you okay?',
                    "<25>{#f/8}* I'm kinda worried about you, dude...",
                    '<25>{#f/7}* Is something wrong?'
                ]
                : [
                    '<25>{#p/kidd}{#f/1}* Man, the books in the librarby were one thing...',
                    '<25>{#p/kidd}{#f/7}* But being on a planet for REAL!?',
                    "<25>{#f/13}* It's SOOOO much cooler!",
                    '<25>{#f/2}* Imagine if we tried to explore it all...',
                    "<25>{#f/1}* We'd never EVER be finished!"
                ],
        balcony3: () =>
            SAVE.data.b.ufokinwotm8
                ? [
                    "<25>{#p/kidd}{#f/4}* (Man, I'm really getting worried now.)",
                    '<25>{#f/7}* Frisk, come on...!',
                    '<25>{#f/7}* You gotta say something to me, dude!',
                    "<25>{#f/8}* I didn't do anything wrong... did I?"
                ]
                : ["<25>{#p/kidd}{#f/2}* Aren't you excited?", '<25>{#f/1}* You and I are gonna do EVERYTHING together!'],
        balcony0a: ['<25>{#p/kidd}{#f/1}* Is THIS what living on a planet is like?\n* This is INCREDIBLE!'],
        balcony1a: [
            '<25>{#p/asriel1}{#f/10}* What?\n* A whole planet of this?',
            '<25>{#f/20}* Pfft.\n* This is nothing...',
            "<25>{#f/17}* Just past the forest, there's a giant mountain...",
            '<25>{#f/17}* And a lake beyond that.'
        ],
        balcony2a: [
            '<25>{#p/kidd}{#f/2}* That must be the lake with that slimy red goo...',
            '<25>{#f/1}* Gross AND awesome!'
        ],
        balcony3a: ['<25>{#p/asriel1}{#f/1}* ... I dare you to swim.'],
        balcony4a: ['<25>{#p/kidd}{#f/7}* ...', '<25>{#f/13}* Deal.\n* But only if you swim WITH me!'],
        balcony5a: [
            '<25>{#p/asriel1}{#f/21}* Uh... I mean...',
            "<25>{#f/20}* Maybe we'd be better off if we stuck to dune racing."
        ],
        balcony6a: ["<25>{#p/kidd}{#f/6}* You're not afraid of getting sticky red goo all over you, are you?"],
        balcony7a: [
            '<25>{#p/asriel1}{#f/8}* ... ugh, of course not, you idiot, I just-',
            '<25>{#p/kidd}{#f/8}* ...',
            "<25>{#p/asriel1}{#f/25}* ... w-wait, I didn't m-mean to..."
        ],
        balcony8a: ['<25>{#p/kidd}{#f/4}* Asriel...?', '<25>{#p/kidd}{#f/4}* Are you okay?'],
        balcony9a: [
            '<25>{#p/asriel1}{#f/13}* ... I...',
            "<25>{#f/22}* I'm alright.\n* You didn't do anything wrong, okay?"
        ],
        balcony10a: [
            "<25>{#p/asriel1}{#f/21}* ... you WOULD just forgive me like that, wouldn't you...",
            "<25>{#f/23}* You're just an innocent monster kid.",
            "<25>{#p/kidd}{#f/1}* That's my name!"
        ],
        balcony11a: [
            '<25>{#p/kidd}{#f/4}* So what were you saying?',
            '<25>{#p/asriel1}{#f/13}* ...',
            '<25>{#f/13}* ... there are deserts, but the races would be done in the tubules.'
        ],
        balcony12a: ['<25>{#p/kidd}{#f/7}* Tubules??\n* What the heck??'],
        balcony13a: [
            "<25>{#p/asriel1}{#f/10}* Uh...\n* Haven't you read the geological surveys?",
            "<25>{#p/kidd}{#f/1}* What's a geological survey?",
            '<25>{#p/asriel1}{#f/15}* ...',
            '<25>{#f/15}* The tubules are a region made up of... uh, tubes.',
            '<26>{#f/17}* Large tubes form cliffs, medium tubes form hills, and small tubes, well...',
            "<25>{#f/20}* They don't really do much, I guess.",
            '<25>{#p/kidd}{#f/1}* Oh!\n* That makes sense.'
        ],
        balcony14a: [
            "<25>{#p/kidd}{#f/1}* Do you think there's other planets out there like this?",
            '<25>{#f/2}* Will we explore those, too?',
            '<25>{#p/asriel1}{#f/10}* Hmm...\n* No doubt there is...'
        ],
        balcony15a: () => [
            '<25>{#p/kidd}{#f/7}* Yo... what if we formed an exploration group!\n* To travel the stars!',
            '<25>{#p/asriel1}{#f/27}* ... huh.',
            "<25>{#p/kidd}{#f/6}* We'd start with this world, and find everything we can...",
            "<26>{#p/kidd}{#f/1}* Then we'd visit more worlds, and make a huge map of the whole galaxy!",
            ...(SAVE.data.b.c_state_secret2_used
                ? ["<26>{#p/kidd}{#f/13}* And we should TOTALLY have a secret handshake!\n* Like Gerson's!"]
                : []),
            ...(SAVE.data.b.c_state_secret3_used
                ? [
                    ...(SAVE.data.b.c_state_secret2_used
                        ? ["<25>{#p/asriel1}{#f/13}* With any luck, we'll be hand-in-hand with other galaxies' races, too."]
                        : ["<25>{#p/asriel1}{#f/13}* With any luck, we'll be making maps of other galaxies, too."]),
                    "<25>{#f/13}* Dr. Alphys's wormhole travel gives us the means to visit them.",
                    "<25>{#f/17}* We'd be a pan-galactic exploration group."
                ]
                : [
                    '<25>{#p/asriel1}{#f/17}* Woah, uh, slow down there kiddo...',
                    ...(SAVE.data.b.c_state_secret2_used
                        ? [
                            '<25>{#p/asriel1}{#f/17}* ... a secret handshake would be pretty cool, but...',
                            '<25>{#f/13}* ... as for exploring other planets...'
                        ]
                        : []),
                    '<26>{#f/13}* It took us long enough just to make it here, let alone another world.'
                ])
        ],
        balcony16a: () =>
            SAVE.data.b.c_state_secret3_used
                ? ["<26>{#p/kidd}{#f/14}* Oh yeah, I totally forgot about that!\n* We've GOTTA try that!"]
                : ['<25>{#p/kidd}{#f/3}* Haha. Maybe.\n* But we could still totally explore it!'],
        balcony17a: [
            '<25>{#p/asriel1}{#f/17}* Just us, huh?',
            '<25>{#p/kidd}{#f/1}* Totally, dude!\n* Just the three of us!'
        ],
        balcony18a1: ['<32>{#p/basic}* ... uh, don\'t you mean \"the four of us?\"'],
        balcony18a2: ['<25>{#p/asriel1}{#f/25}* ...!', "<25>{#f/25}* $(name)... you're..."],
        balcony19a1: ['<32>{#p/basic}* ... wait, NOW you can hear me?'],
        balcony19a2: [
            "<32>{#p/basic}* I tried reaching out to you before, but... it didn't work.",
            '<32>* I wonder what changed...'
        ],
        balcony20a: ["<25>{#p/kidd}{#f/6}* Haha. If you're friends with him, then you're friends with me."],
        balcony21a: ['<32>{#p/basic}* Wait, YOU can hear me?'],
        balcony22a: ["<25>{#p/kidd}{#f/1}* Kind of hard not to when you're standing there, y'know."],
        balcony23a1: ['<32>{#p/basic}* YOU CAN SEE ME!?!?'],
        balcony23a2: ['<32>{#p/basic}* Oh... my god...'],
        balcony24a: ["<33>{#p/basic}* Asriel, how did you not notice me standing here?\n* I'm not even hidden!"],
        balcony25a: ['<26>{#p/asriel1}{#f/23}* ... $(name), I...'],
        balcony26a1: [
            "<32>{#p/basic}* Asriel, it's okay.\n* You don't have to be ashamed of it anymore.",
            '<32>* If you need to cry...',
            '<32>* ... you can.'
        ],
        balcony26a2: [
            "<32>{#p/basic}* Having that extra SOUL inside of me must've made it hard to appear visually...",
            '<32>* Back on the outpost, when I did finally manage to do it...',
            '<32>* That very same SOUL was released shortly after.',
            "<32>* ... I guess this means I'll be visible all the time now?",
            "<32>* To be honest, I'm not sure how to feel about that."
        ],
        balcony27a: ['<25>{#p/kidd}{#f/7}* Wait, are you a human too!?'],
        balcony28a: [
            '<32>{#p/basic}* Excuse me?',
            "<33>* I'm a human GHOST who wants their GOAT brother to be happy.\n* Get it right. Sheesh."
        ],
        balcony29a: ['<25>{#p/kidd}{#f/14}* ... Asriel is your BROTHER!?', '<25>{#p/kidd}{#f/4}* This is too much...'],
        balcony30a: ["<25>{#p/kidd}{#f/1}* But, uh, you guys are all cool as heck, which means I'll be okay."],
        balcony31a: ["<32>{#p/basic}* Oh, I KNOW I'm cool.\n* I'm the coolest human ghost this side of the continent."],
        balcony32a: [
            "<25>{#p/asriel1}{#f/15}* $(name), you're the only human ghost this side of the continent.",
            '<25>{#f/17}* And the planet.',
            '<25>{#f/20}* And the galaxy.',
            "<25>{#f/13}* And the future, since I won't be taking Frisk's SOUL any time soon.",
            '<25>{#f/15}* And then dying... and then meeting them a hundred years later...',
            '<25>{#f/17}* Etcetera, etcetera, radical circumstances notwithstanding.'
        ],
        balcony33a: [
            "<32>{#p/basic}* Pfft.\n* You're funny, Asriel.",
            "<32>* Being the only human ghost doesn't exclude you from being the coolest human ghost.",
            '<32>* A certain handsome skeleton would concur.'
        ],
        balcony34a1: [
            '<25>{#p/kidd}{#f/2}* $(name), huh?',
            "<25>{#f/1}* That's a nice name.",
            '<25>{#p/kidd}{#f/6}* My name is Monster Kid.'
        ],
        balcony34a2: ['<25>{#p/asriel1}{#f/15}* ... did you just...', '<33>{#p/basic}* Asriel.\n* They said the thing.'],
        balcony35a1: [
            '<25>{#p/asriel1}{#f/10}* They really did...',
            '<25>{#p/kidd}{#f/4}* What?\n* Did I say something wrong, or...',
            "<33>{#p/basic}* No, no, you're fine.\n* You just... uh, reminded us of something.",
            '<25>{#p/kidd}{#f/1}* Oh.\n* I hope it was something good, then.'
        ],
        balcony35a2: ['<25>{#p/asriel1}{#f/23}* ... it was.'],
        balcony36a: [
            '<25>{#p/kidd}{#f/3}* Hey... thanks for being here, guys.',
            '<25>{#f/1}* With friends like you, living here is gonna be the best!'
        ],
        balcony37a: [
            "<33>{#p/basic}* ... heh.\n* If we were just friends, maybe.\n* But we're more than that.",
            '<25>{#p/kidd}{#f/7}* ...?'
        ],
        balcony38a: ["<25>{#p/asriel1}{#f/17}* We're your family."],
        balcony39a: [
            '<25>{*}{#p/kidd}{#f/1}* Oh!\n* Oh!\n* Does that mean we can- {%}',
            '<25>{*}{#f/1}* eat together and tell stories and go for nice walks in the park and- {%}',
            '<25>{*}{#p/asriel1}{#f/20}* Yes, yes, of course- {%}',
            "<25>{*}{#p/kidd}{#f/1}* We could have sleepovers at other people's houses and- {^999}"
        ],
        trivia: {
            bed: (kiddo: boolean) =>
                SAVE.data.b.svr && !player.metadata.voidkey?.room.startsWith('_frontier') // NO-TRANSLATE

                    ? ["<25>{#p/asriel1}{#f/20}* This bed looks like it hasn't been washed in three years..."]
                    : [
                        SAVE.data.b.ufokinwotm8
                            ? '<32>{#p/human}* (You run your hands through the covers of the bed, and note the wear and tear.)'
                            : '<33>{#p/basic}* This bed, albeit well-made, has seen a lot of use.',
                        ...(kiddo ? ['<25>{#p/kidd}{#f/1}* Looks comfy! '] : [])
                    ],
            plushie: (kiddo: boolean) =>
                SAVE.data.b.svr && !player.metadata.voidkey?.room.startsWith('_frontier') // NO-TRANSLATE

                    ? ['<25>{#p/asriel1}{#f/20}* Whoever lives here must really like plushies.']
                    : [
                        SAVE.data.b.ufokinwotm8
                            ? '<32>{#p/human}* (You glance uninterestedly at the otherwise soft plushie.)'
                            : "<32>{#p/basic}* I see I'm not the only one who likes the soft things.",
                        ...(kiddo ? ['<25>{#p/kidd}{#f/3}* Aw, cute.'] : [])
                    ],
            computer: (kiddo: boolean) =>
                SAVE.data.b.svr && !player.metadata.voidkey?.room.startsWith('_frontier') // NO-TRANSLATE

                    ? [
                        '<25>{#p/asriel1}{#f/15}* I once dedicated myself to learning how to code...',
                        '<25>{#p/asriel1}{#f/16}* ... whoever wrote this stuff should reconsider their life choices.'
                    ]
                    : [
                        SAVE.data.b.ufokinwotm8
                            ? '<32>{#p/human}* (You wonder if something like this could be the answer to your dissatisfaction.)'
                            : '<32>{#p/basic}* Color-coded text fills the screen in a monospaced font.',
                        ...(kiddo ? ['<25>{#p/kidd}{#f/1}* How OLD is this thing?'] : [])
                    ],
            flowers: (kiddo: boolean) =>
                SAVE.data.b.svr && !player.metadata.voidkey?.room.startsWith('_frontier') // NO-TRANSLATE

                    ? ['<25>{#p/asriel1}{#f/10}* Huh?\n* What sort of flower is this anyway?']
                    : [
                        SAVE.data.b.ufokinwotm8
                            ? '<32>{#p/human}* (You wonder where these flowers could have come from.)'
                            : '<32>{#p/basic}* Flowers, the universal symbol for sentimentality.',
                        ...(kiddo ? ["<25>{#p/kidd}{#f/1}* I don't think I've ever seen flowers like THESE before..."] : [])
                    ],
            x_window: () =>
                SAVE.data.b.ufokinwotm8
                    ? ["<32>{#p/human}* (You can tell it's going to be a day of some variety.)"]
                    : [
                        ...(SAVE.data.b.svr ? ["<32>{#p/human}* (You can tell it's going to be a nice day.)"] : []),
                        "<32>{#p/basic}* It's the start of a new day."
                    ],
            x_cab: () =>
                SAVE.data.b.ufokinwotm8
                    ? ["<32>{#p/human}* (It's a cabinet full of clothes you feel indifferent about.)"]
                    : [
                        ...(SAVE.data.b.svr ? ["<32>{#p/human}* (It's a cabinet full of your favorite clothes.)"] : []),
                        '<32>{#p/basic}* Various clothes can be found within the cabinet.'
                    ],
            x_bed: () =>
                SAVE.data.b.ufokinwotm8
                    ? ["<32>{#p/human}* (It's a bed.)\n* (You wish you could just go back to sleep.)"]
                    : [
                        ...(SAVE.data.b.svr
                            ? ["<32>{#p/human}* (It's a comfortable bed.)\n* (You had a good night's rest.)"]
                            : []),
                        "<32>{#p/basic}* It's brand new, just for you."
                    ],
            x_lamp: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ["<32>{#p/human}* (It's a lamp.)\n* (It's just the right height for you to reach it.)"]
                    : []),
                ...(SAVE.data.b.ufokinwotm8 ? [] : ["<32>{#p/basic}* It's an oddly short lamp."])
            ],
            x_toybox: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (The toys are even less interesting than before.)']
                    : [
                        ...(SAVE.data.b.svr
                            ? ['<32>{#p/human}* (The toys appear to be rather interesting for once.)']
                            : []),
                        "<32>{#p/basic}* Perhaps these toys aren't so bad after all..."
                    ],
            x_wash: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (You stare into the drain.)']
                    : [
                        ...(SAVE.data.b.svr
                            ? ['<32>{#p/human}* (But your hands were already as clean as they could be.)']
                            : ['<32>{#p/human}* (You wonder if your hands could be a little cleaner.)']),
                        "<32>{#p/basic}* It's a sink.\n* Don't sink too much time into thinking about it."
                    ],
            x_toilet: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (You ignore the toilet.)']
                    : [
                        ...(SAVE.data.b.svr
                            ? ['<32>{#p/human}* (You tip up the toilet lid.)\n* (You then tip it back down.)']
                            : []),
                        ...(SAVE.data.b.ufokinwotm8 ? [] : ["<32>{#p/basic}* It's a toilet.\n* What else would it be."])
                    ],
            x_bathrub: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (You wonder if a warm bath would make you feel better.)']
                    : [
                        ...(SAVE.data.b.svr ? ['<32>{#p/human}* (You look forward to taking your next warm bath.)'] : []),
                        '<32>{#p/basic}* Everything in this room is fit exactly to your size...'
                    ],
            x_mirror: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (As you stare into the mirror, you reflect on the journey you took to get here.)']
                    : []),
                ...(SAVE.data.b.ufokinwotm8 ? [] : ["<32>{#p/basic}* No matter what happens, it'll always be you."])
            ],
            x_sign1: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (The sign describes adjusting to life on a new planet.)']
                    : []),
                ...(SAVE.data.b.ufokinwotm8
                    ? []
                    : [
                        '<33>{#p/basic}* It\'s a five-step guide on how to adjust to planet-bound life.\n* They all amount to \"have fun.\"'
                    ])
            ],
            x_sign2: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (The sign outlines tasks that are yet to be completed.)']
                    : []),
                ...(SAVE.data.b.ufokinwotm8
                    ? []
                    : ["<33>{#p/basic}* It's a list of various pending tasks relating to building a new community."])
            ],
            x_plant: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (You caress the plant and sigh as it sighs with you.)']
                    : [
                        ...(SAVE.data.b.svr
                            ? ['<32>{#p/human}* (You caress the plant and smile as it smiles back at you.)']
                            : []),
                        '<32>{#p/basic}* This plant will always be happy to see you.'
                    ],
            x_desk: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (You stare into the empty diary, wishing you could write your own story.)']
                    : [
                        ...(SAVE.data.b.svr
                            ? [
                                '<32>{#p/human}* (You stare into the empty diary, wondering what stories are yet to be told.)'
                            ]
                            : []),
                        "<32>{#p/basic}* It's a diary.\n* It's completely blank.",
                        "<32>{#p/basic}* Asgore's favorite diary- writing chair must still be on the transport ship."
                    ],
            x_paperwork: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (You wonder if any of these items could belong to you.)']
                    : []),
                ...(SAVE.data.b.ufokinwotm8
                    ? []
                    : ['<32>{#p/basic}* The papers list various items that have yet to be taken in.'])
            ],
            x_trash: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ["<32>{#p/human}* (You can't make out what's in the trash...)"]
                    : []),
                ...(SAVE.data.b.ufokinwotm8
                    ? []
                    : ["<32>{#p/basic}* There is a crumpled up recipe for Starling Tea.\n* That's not his trash can..."])
            ],
            x_bed_large: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (The bed still seems to be way too large for you.)']
                    : []),
                ...(SAVE.data.b.ufokinwotm8 ? [] : ["<32>{#p/basic}* It'll always be a king-sized bed."])
            ],
            x_cactus: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (You poke the cactus.)\n* (It pokes back.)']
                    : [
                        ...(SAVE.data.b.svr
                            ? [
                                '<32>{#p/human}* (You poke the cactus.)\n* (The cactus is touched by your sense of affection.)'
                            ]
                            : []),
                        '<32>{#p/basic}* So she finally gave up her inner cactus, eh...?'
                    ],
            x_booktable: () =>
                SAVE.data.b.ufokinwotm8
                    ? ["<32>{#p/human}* (But you weren't in the mood to read a diary.)"]
                    : [
                        ...(SAVE.data.b.svr
                            ? ['<32>{#p/human}* (The book contains the diary entries of Monster Kid.)']
                            : ["<32>{#p/basic}* It's Monster Kid's diary.\n* The pages are covered in small bite marks."]),
                        '<32>{#p/human}* (You read the first and only entry...)',
                        '<32>{#p/kidding}* \"So asgores my dad now huh? Thats weird. But also AWESOME!\"',
                        '<32>{#p/kidding}* \"Asgore said i should put on some new clothes so maybe ill do that later.\"',
                        '<32>{#p/kidding}* \"He also said i should write a diary to keep track of things.\"',
                        '<32>{#p/kidding}* \"Im pretty good at reading and writing so this should be really easy.\"',
                        '<32>{#p/kidding}* \"And frisk can totally help me if i do something wrong!\"',
                        '<32>{#p/kidding}* \"Frisk if youre reading this please tell me what i did wrong.\"',
                        '<32>{#p/human}* (You close the diary.)'
                    ],
            x_bed_left: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ["<32>{#p/human}* (You check under the covers to make sure it's safe to sleep.)"]
                    : []),
                ...(SAVE.data.b.ufokinwotm8 ? [] : ["<32>{#p/basic}* It's Monster Kid's bed."])
            ],
            x_knickknacks: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (You re-arrange the knick knacks to pass the time.)\n* (You hope nobody notices.)']
                    : []),
                ...(SAVE.data.b.ufokinwotm8 ? [] : ["<32>{#p/basic}* It's a shelf full of various toys and knick knacks."])
            ],
            x_bed_right: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* (You pat the plushie.)\n* (It might just be you, but it seems a little happier.)',
                        "<32>{#p/basic}* It's Asriel's bed.\n* It doesn't look like it's been used yet."
                    ]
                    : [],
            x_bookshelf: (() => {
                const pages = pager.create(
                    1,
                    [
                        '<32>{#p/basic}* \"EURYBIA GEOLOGICAL SURVEY\"\n* \"Authored by the Royal Science Division (RSD).\"',
                        '<32>* \"Preliminary scans of the surface have revealed vast diversity in its ecosystems.\"',
                        '<32>* \"Each section of this report will concentrate on biomes of a specific type.\"',
                        '<32>* \"Sections are as follows.\"',
                        '<32>* \"SECTION 001 - Subterranian\"\n* \"SECTION 002 - Oceanic\"\n* \"SECTION 003 - Structural\"',
                        '<32>* \"SECTION 004 - Magnetic\"\n* \"SECTION 005 - Airborne\"\n* \"SECTION 006 - Forested\"',
                        '<32>* \"SECTION 007 - Spired\"\n* \"SECTION 008 - Metallic\"\n* \"SECTION 009 - Crystalline\"',
                        "<32>* Jeez, how many ARE there?\n* Let's just stop reading here."
                    ],
                    [
                        '<32>{#p/basic}* \"Howdy, fellow gardeners.\"',
                        '<32>* \"When it comes to Starling flowers, the line between growth and stagnation...\"',
                        '<32>* \"Is access to open space.\"',
                        '<32>* \"That is why they were commonly grown in Aerialis...\"',
                        '<32>* \"Though, on Eurybia, the best place to grow them is unknown.\"',
                        '<32>* \"For the moment, it is recommended that they be grown in orbit.\"',
                        '<32>* \"Space station five will be deployed on date K-615.12.\"',
                        '<32>* \"If this date has not yet arrived, a shuttlecraft will suffice.\"'
                    ],
                    [
                        '<32>{#p/basic}* \"In the beginning, there was nothing.\"',
                        '<32>* \"Then... the human appeared out of thin air.\"',
                        '<32>* \"The human and the bunny gave each other a big, fluffy hug...\"',
                        '<32>* \"But then...!\"\n* \"The human and the bunny could hug no longer.\"',
                        '<32>* \"Shocking!\"\n* \"Their world views had been shaken to their cores.\"',
                        '<32>* \"Later, after much time had passed, the human began working on a solution.\"',
                        '<32>* \"Day by day, the human worked tirelessly, all so they could hug their bunny once again.\"',
                        '<32>* \"Eventually... the human\'s work was complete, and the bunny was ready.\"',
                        '<32>* \"The human opened their arms, waiting for the bunny to approach...\"',
                        '<32>* \"Before they knew it, the bunny was already in their arms!\"',
                        '<32>* \"And so it was that the human and the bunny lived fluffily ever after.\"'
                    ],
                    () =>
                        SAVE.data.b.c_state_secret3_used
                            ? [
                                '<32>{#p/basic}* \"Wormhole experiment report!\"\n* \"From Dr. Alphys to Asgore\"',
                                '<32>* \"Progress on my wormhole experiment is going smoothly!\"',
                                '<32>* \"Ever since Frisk forwarded the professor\'s equations, I\'ve made steady progress.\"',
                                '<32>* \"I\'ve even managed to send small objects through the aperture...\"',
                                '<32>* \"In my next test, I\'ll send a tethered scanner through and see what it picks up.\"',
                                '<32>* \"Wormholes for monster travel could be here as soon as K-616.05!\"'
                            ]
                            : [
                                '<32>{#p/basic}* \"Wormhole experiment report.\"\n* \"From Dr. Alphys to Asgore\"',
                                '<32>* \"Progress on my wormhole experiment has hit a snag.\"',
                                '<32>* \"The professor\'s incomplete equations haven\'t been enough to get things working.\"',
                                '<32>* \"I\'ll keep trying, but I can\'t go too fast without putting my life at risk.\"',
                                '<32>* \"In my next experiment, I\'ll see if I can get the aperture to last a little longer...\"',
                                '<32>* \"Wormholes for monster travel won\'t be coming any time soon.\"'
                            ],
                    [
                        '<32>{#p/basic}* \"You have received an invitation to the transport ship triumph!\"',
                        '<32>* \"Events will be held from stem to stern, including hovercar races and dance raves!\"',
                        '<32>* \"When we reach the homeworld, a final event will be held on the forward section lounge!\"',
                        '<32>* \"This is an experience you won\'t want to miss, so get up and get loud while you can!\"',
                        '<32>* \"Please note that this invitation expires upon reaching the homeworld.\"',
                        '<32>* \"Can\'t wait to see you there!\"'
                    ],
                    [
                        '<32>{#p/basic}* \"Toriel\'s fur care guide, dated K-614.09.\"',
                        '<32>* \"When shedding fur, one must always take great care to dispose properly.\"',
                        '<32>* \"The trash can is the obvious choice, but I myself prefer the sink.\"',
                        '<32>* \"If you shed often, consider investing in a sink with garbage disposal.\"',
                        '<32>* \"Regarding softness, the side you sleep on will be the most affected.\"',
                        '<32>* \"If you prefer your head or body fur to be soft, sleep on your side.\"',
                        '<32>* \"To keep your arms and legs soft, sleep on your back.\"',
                        '<32>* \"Thank you, dear readers.\"\n* \"That will be all.\"'
                    ]
                );
                return () =>
                    SAVE.data.b.ufokinwotm8
                        ? ["<32>{#p/human}* (But you weren't in the mood to read a book.)"]
                        : [
                            ...(SAVE.data.b.svr
                                ? [
                                    '<32>{#p/human}* (The books on this bookshelf are capable of swapping their content on-demand.)'
                                ]
                                : [
                                    '<32>{#p/basic}* The books are all blank, but get filled with the text of the book you select.'
                                ]),
                            "<32>{#p/human}* (You select a book from the control panel, and pick it out once it's ready...)",
                            ...pages(),
                            '<32>{#p/human}* (You put the book back on the shelf.)'
                        ];
            })(),
            x_endtable: () =>
                SAVE.data.b.ufokinwotm8
                    ? [
                        SAVE.data.b.water
                            ? '<32>{#p/human}* (You observe the end table, and the cup on top of it.)\n* (It seems disturbed.)'
                            : '<32>{#p/human}* (You observe the end table.)\n* (It seems disturbed.)'
                    ]
                    : [
                        ...(SAVE.data.b.svr
                            ? [
                                SAVE.data.b.water
                                    ? '<32>{#p/human}* (You observe the end table, and the cup on top of it.)\n* (It seems pleased.)'
                                    : '<32>{#p/human}* (You observe the end table.)\n* (It seems pleased.)'
                            ]
                            : []),
                        '<32>{#p/basic}* At last...\n* A remarkable end table.',
                        ...(SAVE.data.b.water
                            ? [
                                '<33>{#p/basic}* It even has a cup of electro- dampening fluid on it.\n* Truly, a sippy you can rely on.'
                            ]
                            : [])
                    ],
            x_chasgore: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? SAVE.data.b.svr && SAVE.data.b.c_state_secret1_used && SAVE.data.b.c_state_secret5_used
                        ? ['<32>{#p/human}* (The chair strikes you as being where it belongs.)']
                        : SAVE.data.b.svr || (SAVE.data.b.c_state_secret1_used && SAVE.data.b.c_state_secret5_used)
                            ? ['<32>{#p/human}* (The chair strikes you as being well-placed enough.)']
                            : ['<32>{#p/human}* (The chair strikes you as being out of place.)']
                    : []),
                ...(SAVE.data.b.ufokinwotm8
                    ? []
                    : ['<32>{#p/basic}* A comfy reading chair...', "<32>* Doesn't seem like the right size for Asgore."])
            ],
            x_window_left: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (Staring out the window, you wonder where you went wrong to deserve this feeling.)']
                    : [
                        ...(SAVE.data.b.svr
                            ? [
                                '<32>{#p/human}* (Staring out the window, you feel nothing but excitement for the future ahead.)'
                            ]
                            : []),
                        '<32>{#p/basic}* The window accentuates the atmosphere outside.'
                    ],
            x_window_right: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (Staring out the window, you ask yourself why things had to end up this way.)']
                    : [
                        ...(SAVE.data.b.svr
                            ? [
                                "<32>{#p/human}* (Staring out the window, you remind yourself of how long you've waited to get here.)"
                            ]
                            : []),
                        '<32>{#p/basic}* The window enhances the atmosphere inside.'
                    ],
            x_plant_left: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (You touch the plant lightly.)\n* (It understands your pain.)']
                    : [
                        ...(SAVE.data.b.svr
                            ? [
                                '<32>{#p/human}* (You touch the plant lightly.)\n* (It shakes and bobs, relieved that you were here.)'
                            ]
                            : []),
                        '<33>{#p/basic}* A compassionate plant.'
                    ],
            x_plant_right: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (You touch the plant lightly.)\n* (It promises things will get better for you.)']
                    : [
                        ...(SAVE.data.b.svr
                            ? ['<32>{#p/human}* (You touch the plant lightly.)\n* (It appreciates the gesture.)']
                            : []),
                        '<32>{#p/basic}* An optimistic plant.'
                    ],
            x_sign3: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ["<32>{#p/human}* (The sign doesn't appear to hold anything of note.)"]
                    : []),
                ...(SAVE.data.b.ufokinwotm8
                    ? []
                    : [
                        "<32>{#p/basic}* It's a digital picture frame.\n* All it needs now are some good memories, in visual form."
                    ])
            ],
            x_chair1: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (You note the fairly large size of the dining chair.)']
                    : []),
                ...(SAVE.data.b.ufokinwotm8
                    ? []
                    : SAVE.data.b.svr && SAVE.data.b.c_state_secret1_used && SAVE.data.b.c_state_secret5_used
                        ? ["<32>{#p/basic}* One of Asgore's dining chairs.\n* Fit for a mother."]
                        : SAVE.data.b.svr || (SAVE.data.b.c_state_secret1_used && SAVE.data.b.c_state_secret5_used)
                            ? ["<32>{#p/basic}* One of Asgore's dining chairs.\n* Still fit for a queen."]
                            : ["<32>{#p/basic}* One of Asgore's dining chairs.\n* Not fit for anyone."])
            ],
            x_chair2: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (You note the small size of the dining chair.)']
                    : []),
                ...(SAVE.data.b.svr
                    ? ["<32>{#p/basic}* One of Asgore's dining chairs.\n* Fit for a brother."]
                    : SAVE.data.b.ufokinwotm8
                        ? []
                        : ["<32>{#p/basic}* One of Asgore's dining chairs.\n* Not fit for anyone."])
            ],
            x_chair3: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (You wonder if this chair is still fit for a little angel.)']
                    : [
                        ...(SAVE.data.b.svr
                            ? [
                                '<32>{#p/human}* (You note the perfect size of the dining chair.)',
                                "<32>{#p/basic}* It's fit just for you, Frisk."
                            ]
                            : ["<32>{#p/basic}* One of Asgore's dining chairs.\n* Still fit for a child."])
                    ],
            x_chair4: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (You note the slightly small size of the dining chair.)']
                    : []),
                ...(SAVE.data.b.svr
                    ? ["<32>{#p/basic}* One of Asgore's dining chairs.\n* Fit for a sibling."]
                    : SAVE.data.b.ufokinwotm8
                        ? []
                        : SAVE.data.b.f_state_kidd_betray
                            ? ["<32>{#p/basic}* One of Asgore's dining chairs.\n* Not fit for anyone."]
                            : ["<32>{#p/basic}* One of Asgore's dining chairs.\n* Fit for a monster."])
            ],
            x_chair5: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (You note the exceptional size of the dining chair.)']
                    : []),
                ...(SAVE.data.b.svr
                    ? ["<32>{#p/basic}* One of Asgore's dining chairs.\n* Fit for a father."]
                    : SAVE.data.b.ufokinwotm8
                        ? []
                        : ["<32>{#p/basic}* One of Asgore's dining chairs.\n* Still fit for a king."])
            ],
            x_fridge: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (You place your hands on the exterior of the fridge.)\n* (It groans harshly.)']
                    : [
                        ...(SAVE.data.b.svr
                            ? ['<32>{#p/human}* (You place your hands on the exterior of the fridge.)\n* (It purrs gently.)']
                            : []),
                        ...[
                            ['<32>{#p/basic}* The fridge is mostly empty, save for a single glass of water from Undyne.'],
                            [
                                '<32>{#p/basic}* The fridge is mostly empty, save for a single bottle of exoberry punch from Undyne.'
                            ],
                            [
                                '<32>{#p/basic}* The fridge is mostly empty, save for a single mug of hot cocoa from Undyne.',
                                "<32>* ... it's freezing cold by now."
                            ],
                            [
                                '<32>{#p/basic}* The fridge is mostly empty, save for a single cup of Starling tea from Undyne.',
                                "<32>* ... it's freezing cold by now."
                            ]
                        ][SAVE.data.n.undyne_drink]
                    ],
            x_sink: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ["<32>{#p/human}* (Surprisingly, you can't find any residue in the sink.)"]
                    : []),
                ...(SAVE.data.b.ufokinwotm8
                    ? []
                    : ['<32>{#p/basic}* No fur, no hair...\n* Indeed, these are the wonders of technology.'])
            ],
            x_drawer: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (You open the drawer, and pet the dog within for comfort.)']
                    : [
                        ...(SAVE.data.b.svr ? ['<32>{#p/human}* (You open the drawer, and wave to the dog within.)'] : []),
                        '<32>{#p/basic}* That dog, in that drawer...\n* Better not let Papyrus catch wind of this.'
                    ],
            x_stove: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (You wonder if the stove will burn this house down, too.)']
                    : [
                        ...(SAVE.data.b.svr
                            ? ['<32>{#p/human}* (You wonder what delicious meals will be made here.)']
                            : []),
                        "<32>{#p/basic}* It's the same model as Undyne's stove...",
                        '<32>* We can only hope it came equipped with the appropriate safety measures this time.'
                    ],
            x_sign4: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (The sign lists instructions to a certain recipe.)']
                    : []),
                ...(SAVE.data.b.ufokinwotm8
                    ? []
                    : [
                        '<32>{#p/basic}* Tucca Zunasca, a new kind of soup for a new kind of world.',
                        '<32>* In a pot, brown a sausage, adding spicy pepper flakes as needed.',
                        '<32>* Add two Kriatas of basic stock, and bring the pot to a boil.',
                        '<32>* For best results, apply fire magic. Otherwise, oxygenated flame will suffice.',
                        '<32>* Dice one pound of Eurybian potatoes, and add them to the boiling pot.',
                        '<32>* Once the mixture begins to sparkle, begin adding whipping cream and bar-bird broth.',
                        '<32>* For now, source the cream from the giga-vine canopy. Other sources may be found later.',
                        '<32>* Additionally, kale or kretaada may be added, and cooked at high intensity until soft.',
                        '<32>* Once complete, your soup should be ready for the table!'
                    ])
            ]
        },
        moniker: [
            ['Heartbreaker', 'Heartbreaker', 'Heartbreaker', 'Heart- breaker'],
            ['the Yellow Kid', 'Yellow Kid', 'Kid', 'Yellow Kid'],
            ['the Oncoming Storm', 'Oncoming Storm', 'Storm', 'Oncoming Storm'],
            ['Hyper Rage', 'Hyper Rage', 'Rage', 'Hyper Rage'],
            ['Space Invader', 'Space Invader', 'Invader', 'Space Invader']
        ] as [string, string, string, string][]
    },

    b_act: {
        kiss: '* Kiss',
        activate: '* Activate',
        advice: '* Advice',
        agree: '* Agree',
        alphys: '* Alphys',
        analyze: '* Analyze',
        annoy: '* Annoy',
        appease: '* Appease',
        approach: '* Approach',
        asgore: '* Asgore',
        asriel: '* Asriel',
        asrieldreemurr: '§fill=#ff7f7f§§swirl=2/1/1.05§§hue§* Asriel Dreemurr',
        bathe: '* Bathe',
        beckon: '* Beckon',
        bedtime: '* Bed Time',
        berate: '* Berate',
        blind: '* Blind',
        boast: '* Boast',
        boo: '* Boo',
        boost: '* Boost',
        bow: '* Bow',
        break: '* Break',
        burn: '* Burn',
        carry: '* Carry',
        challenge: '* Challenge',
        charge: '* Charge',
        check: '* Check',
        cheer: '* Cheer',
        clean: '* Clean',
        cocoa: '* Cocoa',
        comfort: '* Comfort',
        compliment: '* Compliment',
        compose: '* Compose',
        conclude: '* Conclude',
        console: '* Console',
        counter: '* Counter',
        create: '* Create',
        criticize: '* Criticize',
        cuddle: '* Cuddle',
        cut: '* Cut',
        dance: '* Dance',
        dream: '* Dream',
        dinnertime: '* Dinner Time',
        direct: '* Direct',
        disarm: '* Disarm',
        disown: '* Disown',
        diss: '* Diss',
        distance: '* Distance',
        distract: '* Distract',
        ditch: '* Ditch',
        dontpick: '* Dont Pick On',
        encourage: '* Encourage',
        escort: '* Escort',
        flash: '* Flash',
        flirt: '* Flirt',
        grin: '* Grin',
        guide: '* Guide',
        handshake: '* Handshake',
        hangout: '* Hang Out',
        heckle: '* Heckle',
        heel: '* Heel Turn',
        highfive: '* High Five',
        home: '* Home',
        hope: '* Hope',
        hug: '* Hug',
        hum: '* Hum',
        hypothesize: '* Hypothesize',
        ignore: '* Ignore',
        inquire: '* Inquire',
        insult: '* Insult',
        joke: '* Joke',
        agreement: '* Agreement',
        call: '* Call',
        dinner: '* Dinner',
        judgement: '* Judgement',
        laugh: '* Laugh',
        lecture: '* Lecture',
        leech: '* Leech',
        lesson: '* Lesson',
        mislead: '* Mislead',
        mix: '* Mix',
        mystify: '* Mystify',
        notes: '* Notes',
        object: '* Object',
        papyrus: '* Papyrus',
        password: '* Password',
        pat: '* Pat',
        pay: '* Pay',
        perch: '* Perch',
        pet: '* Pet',
        pick: '* Pick On',
        play: '* Play',
        playdead: '* Play Dead',
        plead: '* Plead',
        pluck: '* Pluck',
        poke: '* Poke',
        pose: '* Pose',
        praise: '* Praise',
        promise: '* Promise',
        punch: '* Punch',
        puzzle: '* Puzzle',
        puzzlehelp: '* Puzzle Help',
        rap: '* Rap',
        reassure: '* Re-Assure',
        release: '* Release',
        resniff: '* Re-Sniff',
        rest: '* Rest',
        roll: '* Roll Around',
        sample: '* Sample',
        sans: '* Sans',
        scream: '* Scream',
        secret: '* Secret',
        shout: '* Shout',
        shove: '* Shove',
        siphon: '* Siphon',
        sit: '* Sit',
        slap: '* Slap',
        smile: '* Smile',
        someoneelse: '* Someone else',
        spark: '* Spark',
        stare: '* Stare',
        steal: '* Steal',
        storytime: '* Story Time',
        suggest: '* Suggest',
        talk: '* Talk',
        taunt: '* Taunt',
        tea: '* Tea',
        telloff: '* Tell Off',
        terrorize: '* Terrorize',
        test_a: '* Binding',
        test_b: '* Prosthesis',
        test_c: '* Infusion',
        threaten: '* Threaten',
        tickle: '* Tickle',
        topple: '* Topple',
        toriel: '* Toriel',
        translate: '* Translate',
        travel: '* Travel',
        trivia: '* Trivia',
        tug: '* Tug',
        turn: '* Turn',
        undyne: '* Undyne',
        walk: '* Walk',
        water: '* Water',
        whisper: '* Whisper',
        whistle: '* Whistle',
        yell: '* Yell'
    },

    b_group_common: {
        nobody: () => (!world.genocide && world.bullied ? '* ... but everybody ran.' : '* ... but nobody came.')
    },

    b_opponent_dummy: {
        act_check: ["<32>{#p/story}* DUMMY - ATK 0 DEF 0\n* A ghost within the shell, they hope you're doing well."],
        act_flirt: [
            '<32>{#p/human}* (You flirt with the dummy.)',
            "<32>{#p/basic}* It went exactly how you'd expect.",
            '<32>* Toriel is trying not to laugh.'
        ],
        act_hug: ['<32>{#p/human}* (You hug the dummy.)'],
        act_slap: ['<32>{#p/human}* (You slap the dummy.)'],
        act_talk: [
            '<32>{#p/human}* (You talk to the dummy.)',
            "<32>{#p/basic}* It doesn't seem much for conversation.",
            '<32>* Toriel is pleased with you.'
        ],
        bored: ['<32>{#p/basic}* The dummy grew tired of your aimless shenanigans.'],
        hugged: ['<32>{#p/basic}* The dummy is blushing... somehow.'],
        name: '* Dummy',
        slapped: ['<32>{#p/basic}* Suddenly...!'],
        status1: ['<32>{#p/story}* You encountered the dummy.'],
        status2: ["<32>{#p/story}* The dummy looks like it's already getting bored."],
        status3: ["<32>{#p/story}* The dummy looks like it's lost in itself."],
        status4: ["<32>{#p/story}* The dummy looks like it's going to fall over."],
        talk: ['<09>{#p/basic}{#i/20}{~}.....{}']
    },
    b_opponent_maddummy: {
        epiphaNOPE1: ["<11>{#p/basic}{~}{#x3}Ugh, you're WASTING my time!"],
        epiphaNOPE2: ['<08>{#p/basic}{~}Oh.. how strange.'],
        act_check: () =>
            16 <= SAVE.data.n.kills_wastelands
                ? ["<32>{#p/story}* GLAD DUMMY - ATK 0 DEF 0\n* It's a dream come true!"]
                : ['<32>{#p/story}* MAD DUMMY - ATK 30 DEF 255\n* Impervious to physical attacks.'],
        act_flirt: () =>
            16 <= SAVE.data.n.kills_wastelands
                ? [
                    '<32>{#p/human}* (You flirt with Glad Dummy.)',
                    "<32>{#p/basic}* They're too distracted with themselves to hear you."
                ]
                : ['<32>{#p/human}* (You flirt with Mad Dummy.)', "<32>* It went exactly how you'd expect."],
        act_hug: () =>
            16 <= SAVE.data.n.kills_wastelands
                ? ['<32>{#p/human}* (You hug Glad Dummy.)']
                : ['<32>{#p/human}* (You hug Mad Dummy.)'],
        act_slap: () =>
            16 <= SAVE.data.n.kills_wastelands
                ? [
                    '<32>{#p/human}* (You slap Glad Dummy.)',
                    '<32>{#p/basic}* Glad Dummy exerts the better part of valor and gets out of your way.'
                ]
                : ['<32>{#p/human}* (You slap Mad Dummy.)'],
        act_talk: () =>
            16 <= SAVE.data.n.kills_wastelands
                ? [
                    '<32>{#p/human}* (You talk to Glad Dummy.)',
                    "<32>{#p/basic}* They're too distracted with themselves to hear you."
                ]
                : [
                    '<32>{#p/human}* (You talk to Mad Dummy.)',
                    "<32>* They don't seem much for conversation.",
                    '<32>* Nobody is happy with this.'
                ],
        boredTalk: [
            '<11>{#p/basic}{~}{#x3}What the hell?',
            '<11>{#p/basic}{~}{#x1}Why is NOTHING hap- pening?',
            '<11>{#p/basic}{~}{#x4}Am I INVISIBLE to you or something??',
            '<11>{#p/basic}{~}{#x4}...',
            "<11>{#p/basic}{~}{#x4}I CAN'T EVEN BE MAD AT YOU!!!",
            "<11>{#p/basic}{~}{#x4}You're so... INANIMATE!",
            '<11>{#p/basic}{~}{#x4}JUST... GAHH!\nGET OUT OF MY LIFE!',
            '<11>{#p/basic}{~}{#x4}GO LISTEN TO MUSIC WITH NAPSTABLOOK OR SOMETHING!'
        ],
        changeStatus1: ['<32>{#p/story}* Mad Dummy is getting cotton all over the floor.'],
        changeStatus2: ['<32>{#p/story}* Mechanical whirrs fill the room.'],
        fightFail: [
            '<11>{#p/basic}{~}{#x1}Foolish.\nFoolish!\nFOOLISH!',
            '<11>{#p/basic}{~}{#x3}Even if you attack my vessel...',
            "<11>{#p/basic}{~}{#x4}... you'll NEVER hurt ME!",
            "<11>{#p/basic}{~}{#x1}I'm still incor- poreal, you dummy!!!"
        ],
        final1: () => [
            "<11>{#p/napstablook}{~}sorry, i interrupted you, didn't i...",
            '<11>{#p/napstablook}{~}as soon as i came over, your friend immediately left...',
            ...(SAVE.data.n.state_wastelands_napstablook === 2
                ? [
                    "<11>{#p/napstablook}{~}oh wait...\ndidn't you attack me before...",
                    "<11>{#p/napstablook}{~}uhhh...\nthat's awkward.",
                    '<11>{#p/napstablook}{~}sorry...'
                ]
                : [
                    '<11>{#p/napstablook}{~}oh no...\nyou guys looked like you were having fun...',
                    '<11>{#p/napstablook}{~}oh no...\ni just wanted to say hi...',
                    '<11>{#p/napstablook}{~}oh no......\n...........\n...........\n...........\n...........'
                ])
        ],
        gladTalk1: ['<08>{#p/basic}{~}Thanks!'],
        gladTalk2: ['<08>{#p/basic}{~}Thank you!'],
        gladTalk3: ['<08>{#p/basic}{~}Great work!'],
        gladTalk4: ['<08>{#p/basic}{~}Bravo!'],
        gladTalk5: ['<08>{#p/basic}{~}OK!'],
        gladTalk6: ['<08>{#p/basic}{~}...'],
        hugTalk1: () =>
            16 <= SAVE.data.n.kills_wastelands
                ? [
                    '<08>{#p/basic}{~}My haphe- phobia!',
                    "<08>{#p/basic}{~}It's gone!",
                    '<08>{#p/basic}{~}Thank you.. human..',
                    "<08>{#p/basic}{~}I've never felt so happy.."
                ]
                : SAVE.data.n.state_wastelands_dummy === 4
                    ? ['<11>{#p/basic}{~}{#x4}Are you for REAL??']
                    : ['<11>{#p/basic}{~}{#x3}N-no..!\nI have haphe- phobia!'],
        hugTalk2: ['<11>{#p/basic}{~}{#x4}Stop that!'],
        hugTalk3: ['<11>{#p/basic}{~}{#x2}Knock it off!'],
        hugTalk4: ['<11>{#p/basic}{~}{#x3}...'],
        name: () => (16 <= SAVE.data.n.kills_wastelands ? '* Glad Dummy' : '* Mad Dummy'),
        phase2Talk1: ["<11>{#p/basic}{~}{#x1}I'll defeat you and take your SOUL!"],
        phase2Talk2: ["<11>{#p/basic}{~}{#x1}I'll use your SOUL to break the force field!"],
        phase2Talk3: ['<11>{#p/basic}{~}{#x6}The other monsters will love me, praise me...!'],
        phase2Talk4: ['<11>{#p/basic}{~}{#x4}THEN EVERYTHING I WANT WILL BE MINE!'],
        phase2Talk5: ["<11>{#p/basic}{~}{#x3}Huh?\nYeah, I guess that'll avenge my cousin."],
        phase2Talk6: ['<11>{#p/basic}{~}{#x5}Do my other cousins care...?'],
        phase2Talk7: ['<11>{#p/basic}{~}{#x4}Whatever.\nWhatever!\nWHATEVER!'],
        phase2Talk8: ['<11>{#p/basic}{~}{#x1}...'],
        phase3Talk1: ['<11>{#p/basic}{~}{#x1}DUMMY BOTS!\nMAGIC MISSILE!'],
        phase3Talk2: ['<11>{#p/basic}{~}{#x3}DUMMY BOTS!\nTRY AGAIN!'],
        phase3Talk3: ["<11>{#p/basic}{~}{#x5}DUMMY BOTS!\nYou're awful???"],
        phase3Talk4: ['<11>{#p/basic}{~}{#x4}DUMMY BOTS!\nFINAL ATTACK!'],
        phaseChange1: [
            '<11>{#p/basic}{~}{#x2}OWWWW, you DUMMIES!!',
            '<11>{#p/basic}{~}{#x1}Watch where you aim your {@fill=#f00}MAGIC{@fill=#000} attacks!',
            '<11>{#p/basic}{~}{#x4}...',
            '<11>{#p/basic}{~}{#x4}Hey!\nYou!',
            '<11>{#p/basic}{~}{#x3}Forget I said anything about {@fill=#f00}MAGIC{@fill=#000}.'
        ],
        phaseChange2a: ['<11>{#p/basic}{~}{#x4}HEY GUYS!'],
        phaseChange2b1: [
            '<11>{#p/basic}{~}{#x1}Dummies.\nDummies!\nDUMMIES!',
            '<11>{#p/basic}{~}{#x3}Remember how I said NOT to shoot at me?',
            '<11>{#p/basic}{~}{#x3}Well...'
        ],
        phaseChange2b2: ["<11>{#p/basic}{~}{#x4}FAILURES!\nYOU'RE FIRED!\nYOU'RE ALL BEING REPLACED!"],
        phaseChange2c: [
            '<11>{#p/basic}{~}{#x4}Hahaha.\nHahaha!\nHAHAHA!',
            "<11>{#p/basic}{~}{#x3}Now you'll see my true power...",
            "<11>{#p/basic}{~}{#x6}Relying on people that aren't garbage!"
        ],
        phaseChange3a1: [
            '<11>{#p/basic}{~}{#x3}N... no way!',
            '<11>{#p/basic}{~}{#x3}These guys are WORSE than the other guys!'
        ],
        phaseChange3a2: [
            '<11>{#p/basic}{~}{#x1}Who cares.\nWho cares!\nWHO CARES!',
            "<11>{#p/basic}{~}{#x4}I DON'T NEED FRIENDS!!"
        ],
        phaseChange3b: ["<11>{#p/basic}{~}{#x6}I'VE GOT KNIVES!!!"],
        phaseChange3c1: ["<11>{#p/basic}{~}{#x3}I'm...", '<11>{#p/basic}{~}{#x3}Out of knives.'],
        phaseChange3c2: [
            "<11>{#p/basic}{~}{#x4}BUT IT DOESN'T MATTER!!!",
            "<11>{#p/basic}{~}{#x4}YOU CAN'T HURT ME AND I CAN'T HURT YOU!",
            "<11>{#p/basic}{~}{#x1}YOU'LL BE STUCK FIGHTING ME..."
        ],
        phaseChange3c3: ['<11>{#p/basic}{~}{#x1}Forever.'],
        phaseChange3c4: ['<11>{#p/basic}{~}{#x4}Forever!'],
        phaseChange3c5: ['<11>{#p/basic}{~}{#x6}FOREVER!!!!'],
        phaseChange3d: ['<11>{*}{#p/basic}{~}{#x6}AHAHAHAHA HAHAHAHAH AHAHAHAHA HAHAHAHAH AHAHAHAHA{%}'],
        phaseChange3e: [
            '<11>{*}{#p/basic}{~}{#x2}Wh...\nWhat the heck is this!?{^20}{%}',
            '<11>{*}{#p/basic}{~}{#x6}Ergh!\nAcid rain!?{^20}{%}',
            "<11>{*}{#p/basic}{~}{#x4}Oh, FORGET IT!\nI'm OUTTA here!!{^20}{%}"
        ],
        randStatus1: ['<32>{#p/story}* Mad Dummy is looking for the nearest airlock to throw you out of.'],
        randStatus2: ['<32>{#p/story}* Mad Dummy is bossing around its bullets.'],
        randStatus3: ['<32>{#p/story}* Mad Dummy glares into a portal, then turns to you with the same expression.'],
        randStatus4: ['<32>{#p/story}* Mad Dummy is hopping mad.'],
        randStatus5: ['<32>{#p/story}* Smells like a textile factory.'],
        gladStatus1: ['<32>{#p/story}* Glad Dummy is just happy to be here.'],
        gladStatus2: ["<32>{#p/story}* Glad Dummy thinks of all the wonderful things it's going to do."],
        gladStatus3: ['<32>{#p/story}* Glad Dummy seems content.'],
        randTalk1: ['<11>{#p/basic}{~}{#x1}Foolish.\nFoolish!\nFOOLISH!'],
        randTalk2: ['<11>{#p/basic}{~}{#x1}Futile.\nFutile!\nFUTILE!'],
        randTalk3: ['<11>{#p/basic}{~}{#x1}Pitiful.\nPitiful!\nPITIFUL!'],
        randTalk4: ['<11>{#p/basic}{~}{#x1}Feeble.\nFeeble!\nFEEBLE!'],
        slapTalk1: ['<11>{#p/basic}{~}{#x6}Why you little...!'],
        slapTalk2: ['<11>{#p/basic}{~}{#x4}Are you kidding me??'],
        slapTalk3: ['<11>{#p/basic}{~}{#x2}Come on!'],
        slapTalk4: ['<11>{#p/basic}{~}{#x3}...'],
        status1: () =>
            16 <= SAVE.data.n.kills_wastelands
                ? ['<32>{#p/story}* Glad Dummy lets you go.']
                : ['<32>{#p/story}* Mad Dummy blocks the way!']
    },
    b_opponent_moldsmal: {
        epiphany: [
            ['<08>{#p/basic}{~}\x00*slime sounds*'],
            () =>
                world.meanie
                    ? ['<08>{#p/basic}{~}Squorch!']
                    : SAVE.data.b.oops && world.flirt > 9
                        ? ['<08>{#p/basic}{~}\x00*erotic wiggle*']
                        : SAVE.data.b.oops
                            ? ['<08>{#p/basic}{~}\x00*happy wiggle*']
                            : ['<08>{#p/basic}{~}\x00*shakes in your arms*'],
            ['<08>{#p/basic}{~}Final blorb.'],
            ['<08>{#p/basic}{~}\x00*shiny wiggle*']
        ],
        act_check0: ['<32>{#p/asriel2}* Gelatini, the mindless mold.\n* What more can I say?'],
        act_check: ['<32>{#p/story}* GELATINI - ATK 6 DEF 0\n* Stereotypical: Curvaceously attractive, but no brains...'],
        act_check2: ["<32>{#p/story}* GELATINI - ATK 6 DEF 0\n* It's even more attractive in this season's colors."],
        act_check3: ['<32>{#p/story}* GELATINI - ATK 6 DEF 0\n* It\'s exactly your type.\n* It\'s \"stereo.\"'],
        act_check4: ['<32>{#p/story}* GELATINI - ATK 6 DEF 0\n* This mold supermodel appears to be past its prime.'],
        act_flirt: [
            '<32>{#p/human}* (You wiggle your hips.)\n* (Gelatini wiggles back.)',
            '<33>{#p/basic}* What a meaningful conversation!'
        ],
        act_imitate: [
            '<33>{#p/human}* (You give Gelatini a nice pat.)\n* (Its body changes color...)',
            "<32>{#p/basic}* It's Gelatini's happy color!"
        ],
        act_slap: [
            '<32>{#p/human}* (You give Gelatini a big slap.)',
            '<32>{#p/basic}* Gelatini is jostled, but remains ultimately unfazed.'
        ],
        act_slap2: [
            '<32>{#p/human}* (You deliver your mightiest slap to Gelatini.)',
            '<32>{#p/basic}* Gelatini is shaken to its core!'
        ],
        act_slap3: [
            '<32>{#p/human}* (You deliver your mightiest slap to Gelatini.)',
            '<32>{#p/basic}* Gelatini flees the scene!'
        ],
        idleTalk1: ['<08>{#p/basic}{~}Blorb..'],
        idleTalk2: ['<08>{#p/basic}{~}Squorch..'],
        idleTalk3: ['<08>{#p/basic}{~}\x00*slime sounds*'],
        name: '* Gelatini',
        perilStatus: () =>
            world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                ? ["<32>{#p/kidding}* This can't be good..."]
                : ['<32>{#p/story}* Gelatini has started to rot.'],
        sexyChat: ['<08>{#p/basic}{~}\x00*sexy wiggle*'],
        status1: () =>
            world.goatbro ? ['<32>{#p/asriel2}* Gelatini squared.'] : ["<32>{#p/story}* It's a pair of Gelatinis."],
        status2: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Gelatini.']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ["<32>{#p/kidding}* Shh... it's thinking!"]
                    : ['<32>{#p/story}* Gelatini blorbs quietly.'],
        status3: () =>
            world.goatbro ? ['<32>{#p/asriel2}* Gelatini.'] : ['<32>{#p/story}* Gelatini waits optimistically.'],
        status4: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Gelatini.']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ['<32>{#p/kidding}* A blorb here, a blorb there...']
                    : ['<32>{#p/story}* Gelatini is ruminating.'],
        status5: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Gelatini.']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ['<32>{#p/kidding}* I wonder what Gelatinis are actually made of.']
                    : ['<32>{#p/story}* The aroma of lime gelatin wafts through.'],
        status6: ['<32>{#p/story}* And then, there was one.'],
        status8: () =>
            world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                ? ['<32>{#p/kidding}* Just us now!']
                : ['<32>{#p/story}* Gelatini now blorbs solo.']
    },
    b_opponent_spacetop: {
        epiphany: [
            ['<08>{#p/basic}{~}I can communi- cate else- where.'],
            () =>
                world.meanie
                    ? ['<08>{#p/basic}{~}Warning broad- cast is well re- ceived!']
                    : SAVE.data.b.oops && world.flirt > 9
                        ? ['<08>{#p/basic}{~}Ooh.. I like this kind of signal..']
                        : SAVE.data.b.oops
                            ? ["<08>{#p/basic}{~}I'm on your wave- length now!"]
                            : ['<08>{#p/basic}{~}The signal.. is right on top of me..'],
            ["<08>{#p/basic}{~}I'm just a waste of band- width.."],
            ["<08>{#p/basic}{~}I'll wire you the cash right away!"]
        ],
        act_check: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Astro Serf, the attention- seeking astronaut. Cares for nothing but its antenna.']
                : ["<32>{#p/story}* ASTRO SERF - ATK 11 DEF 4\n* This teen wonders why it isn't named 'Radio Jack.'"],
        act_check2: ['<32>{#p/story}* ASTRO SERF - ATK 11 DEF 4\n* This teen seems to appreciate your sense of fashion.'],
        act_check3: ['<32>{#p/story}* ASTRO SERF - ATK 11 DEF 4\n* This teen is getting ALL the right signals.'],
        act_check4: [
            '<32>{#p/story}* ASTRO SERF - ATK 11 DEF 4\n* Attempting to hijack a public radio to call for help.'
        ],
        act_compliment: ['<32>{#p/human}* (You inform Astro Serf that it has a great antenna.)'],
        act_flirt: ['<32>{#p/human}* (You flirt with Astro Serf.)'],
        complimentTalk1: ["<08>{#p/basic}{~}DUH!\nWho DOESN'T know?"],
        complimentTalk2: ['<08>{#p/basic}{~}Envious?\nTOO BAD!'],
        createStatus1: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Astro Serf.']
                : ["<32>{#p/story}* Astro Serf is secretly checking if you're looking at its antenna."],
        createStatus2: () =>
            world.goatbro ? ['<32>{#p/asriel2}* Astro Serf.'] : ['<32>{#p/story}* Astro Serf is impressed.'],
        createTalk1: ["<09>{#p/basic}{~}HELLO???\nMy antenna's up here."],
        createTalk2: ['<08>{#p/basic}{~}What?\nWhat are you doing?'],
        createTalk3: ["<08>{#p/basic}{~}But.. it can't be..!"],
        createTalk4: ['<08>{#p/basic}{~}Woah..\nHow did you do that??'],
        createTalk5: ["<08>{#p/basic}{~}You're.. making your OWN antenna?"],
        act_create: () =>
            [
                ['<32>{#p/human}* (You begin to fashion your own antenna.)', '<32>{#p/basic}* But... how?'],
                ['<32>{#p/human}* (You finish the antenna, and proceed to put it on.)'],
                [
                    '<32>{#p/human}* (You start on another antenna.)',
                    '<32>{#p/basic}* Not knowing what to do, Astro Serf runs away.'
                ]
            ][battler.target?.vars.create ?? 0],
        flirtStatus1: ['<32>{#p/story}* Astro Serf is not impressed by your attire.'],
        flirtStatus2: ['<32>{#p/story}* Astro Serf is in love.'],
        flirtTalk1: ['<08>{#p/basic}{~}No deal!\nNot without an antenna!'],
        flirtTalk2: ['<08>{#p/basic}{~}W-what??\nUm..\nI..\nYou..'],
        genoStatus: ['<32>{#p/asriel2}* Astro Serf.'],
        hurtStatus: () =>
            world.goatbro ? ['<32>{#p/asriel2}* Almost dead.'] : ["<32>{#p/story}* Astro Serf's suit is loose."],
        idleTalk1: ["<08>{#p/basic}{~}Where's YOUR antenna?"],
        idleTalk2: ['<08>{#p/basic}{~}Your head looks so ..NAKED'],
        idleTalk3: ['<08>{#p/basic}{~}What a great antenna!\n(Mine)'],
        idleTalk4: ["<09>{#p/basic}{~}It's signal feedback, not radi- ation"],
        idleTalk5: ['<08>{#p/basic}{~}I just looove my antenna.\nOK?'],
        justiceTalk: ['<08>{#p/basic}{~}What have you done..'],
        name: '* Astro Serf',
        randStatus1: ['<32>{#p/story}* Astro Serf also wants antennae for its other body parts.'],
        randStatus2: ['<32>{#p/story}* Astro Serf makes sure its antenna is still there.'],
        randStatus3: ['<32>{#p/story}* Astro Serf is thinking about a certain article of clothing.'],
        randStatus4: ['<32>{#p/story}* Smells like lithium.'],
        status1: ['<32>{#p/story}* Astro Serf struts into view.'],
        stealTalk1: ['<08>{#p/basic}{~}I KNEW IT!!!\nTHIEF!!'],
        stealTalk2: ['<08>{#p/basic}{~}HELP!!!\nFASHION POLICE!!'],
        act_steal: () =>
            battler.hurt.includes(battler.target!)
                ? [
                    "<33>{#p/human}* (You steal Astro Serf's antenna.)\n* (Its spacesuit falls off.)",
                    '<33>{#p/basic}* Looks like it was powered by lithium the whole time.'
                ]
                : ["<32>{#p/human}* (You try stealing Astro Serf's antenna, but it hasn't been weakened enough.)"]
    },
    b_opponent_space: {
        epiphany: [
            ["<08>{#p/basic}{~}Okay, I'll shine myself out."],
            () =>
                world.meanie
                    ? ["<08>{#p/basic}{~}I'll.. get out of your way.."]
                    : SAVE.data.b.oops && world.flirt > 9
                        ? ["<08>{#p/basic}{~}You think I'm.. oh.."]
                        : SAVE.data.b.oops
                            ? ['<08>{#p/basic}{~}May our crystals shine as one.']
                            : ['<08>{#p/basic}{~}Careful.. I might be sharp..'],
            ['<08>{#p/basic}{~}I deserve to decay..'],
            ["<08>{#p/basic}{~}Here's all the money I have.."]
        ],
        act_check: () =>
            world.goatbro
                ? ["<32>{#p/asriel2}* Lithium.\n* That's literally it."]
                : ['<32>{#p/story}* LITHIUM - ATK 1 DEF 0\n* Without its spacesuit...'],
        act_reassure: ['<32>{#p/human}* (You inform Lithium that it still looks fine.)'],
        genoStatus: ['<32>{#p/asriel2}* Lithium.'],
        happyStatus: ["<32>{#p/story}* Lithium doesn't mind its identity."],
        happyTalk1: ['<08>{#p/basic}{~}Yeah.. I like my body too.'],
        happyTalk2: ['<08>{#p/basic}{~}Hmm.. antennae are for posers.'],
        happyTalk3: ['<08>{#p/basic}{~}So I can still impress you?'],
        happyTalk4: ['<08>{#p/basic}{~}I wanted you to see me as cool.'],
        hurtStatus: () =>
            world.goatbro ? ['<32>{#p/asriel2}* Almost dead.\n* Again.'] : ["<32>{#p/story}* It's disintegrating."],
        idleTalk1: ['<08>{#p/basic}{~}I..\nI..'],
        idleTalk2: ['<08>{#p/basic}{~}What can I say..'],
        idleTalk3: ["<08>{#p/basic}{~}What's the point.."],
        idleTalk4: ['<08>{#p/basic}{~}So.. alone..'],
        name: '* Lithium',
        randStatus1: ['<32>{#p/story}* \"Astro Serf\" is no more.'],
        randStatus2: ['<32>{#p/story}* Smells like battery power.']
    },

    b_party_kidd: {
        mkNobody: ['<25>{#p/kidd}{#f/4}* Is it just me, or does it seem kinda empty around here...'],
        mkDeath1: [
            '<32>{#p/kidding}* Uh...',
            "<32>* Why'd they vanish like that?",
            '<32>* Well, we WERE attacking them, so maybe they got scared and teleported away, haha.'
        ],
        mkDeath2: ['<32>{#p/kidding}* Another one?', "<32>* Dang, why don't I get to have a cool teleporter!?"],
        mkDeath3: ["<32>{#p/kidding}* And they're gone..."],
        mkDeath4: ['<32>{#p/kidding}* ...'],
        mkDeath1OW: [
            '<25>{#p/kidd}{#f/4}* Uh...',
            "<25>* Why'd they vanish like that?",
            '<25>{#f/1}* Well, we WERE attacking them, so...',
            '<25>* Maybe they got scared and teleported away, haha.'
        ],
        mkDeath2OW: [
            '<25>{#p/kidd}{#f/4}* Another one?',
            "<25>{#f/1}* Dang, why don't I get to have a cool teleporter!?"
        ],
        mkDeath3OW: ["<25>{#p/kidd}{#f/4}* And they're gone..."],
        mkDeath4OW: ['<25>{#p/kidd}{#f/4}* ...'],
        mkBully1: [
            '<32>{#p/kidding}* Uh...',
            '<32>* They seemed really scared...',
            "<32>* I hope we didn't hurt them too badly or something..."
        ],
        mkBully2: ['<32>{#p/kidding}* That one too...!', '<32>* Are we hitting them too hard...?'],
        mkBully3: ['<32>{#p/kidding}* ...'],
        mkBully1OW: [
            '<25>{#p/kidd}{#f/4}* Uh...',
            '<25>* They seemed really scared...',
            "<25>* I hope we didn't hurt them too badly or something..."
        ],
        mkBully2OW: ['<25>{#p/kidd}{#f/7}* That one too...!', '<25>{#f/4}* Are we hitting them too hard...?'],
        mkBully3OW: ['<25>{#p/kidd}{#f/4}* ...'],
        mkShyrenDeath: ['<25>{#p/kidd}{#f/4}* Hey...', "<25>{#p/kidd}{#f/1}* Where's everybody going?"],
        mkMagic1: [
            "<32>{#p/kidding}* Yo... I don't know how to do any cool magic yet...",
            '<32>{#p/kidding}* But uh, I can heal you!'
        ],
        mkMagic2a: ['<32>{#p/kidding}* Healing spell!'],
        mkMagic2b: ['<32>{#p/kidding}* Health be with you!'],
        mkMagic2c: ['<32>{#p/kidding}* Take this!'],
        mkNope: ['<32>{#p/kidding}* Just leave me out of it...'],
        mkTurn1: ["<32>{#p/kidding}* Help, I've never been in a battle before!\n* What do I do!?"],
        mkTurn2: ['<32>{#p/kidding}* Uh... help!'],
        mkTurn3: ["<32>{#p/kidding}* I... think I'm getting the hang of this."],
        mkTurnAct1: ['<32>{#p/kidding}* Oh! Oh!', '<32>* I know how ACTing works!', '<32>* Watch this...!'],
        mkWeaken1: ["<32>{#p/kidding}* Are you sure...?\n* They don't seem to be happy about all this...", '<32>* ...'],
        mkWeaken2: ['<32>{#p/kidding}* Is this really a good idea...?', '<32>* ...'],
        mkWeaken3a: ['<32>{#p/kidding}* Uh...'],
        mkWeaken3b: ['<32>{#p/kidding}* Um...'],
        mkWeaken3c: ['<32>{#p/kidding}* Er...'],
        
        mkTurnActRand1: (opponent: string) =>
            opponent === 'muffet' // NO-TRANSLATE

                ? [
                    ['<32>{#p/story}* Monster Kid struggled in the web and made a scary face.'],
                    ['<32>{#p/story}* Monster Kid struggled in the web and yelled.'],
                    ['<32>{#p/story}* Monster Kid gave out a menacing laugh.']
                ]
                : opponent === 'shyren' // NO-TRANSLATE

                    ? [
                        ['<32>{#p/story}* Monster Kid sang a scary tune.'],
                        ['<32>{#p/story}* Monster Kid yelled overly edgy lyrics.'],
                        ['<32>{#p/story}* Monster Kid drummed loudly with their feet.']
                    ]
                    : opponent === 'woshua' // NO-TRANSLATE

                        ? [
                            ['<32>{#p/story}* Monster Kid pointed out the dirty floors.'],
                            ['<32>{#p/story}* Monster Kid pointed out the leaky pipes.'],
                            ['<32>{#p/story}* Monster Kid made a gross face.']
                        ]
                        : [
                            ['<32>{#p/story}* Monster Kid stared $(x) directly in the face.'],
                            ['<32>{#p/story}* Monster Kid pointed at $(x) accusingly.'],
                            ['<32>{#p/story}* Monster Kid circled around $(x) like a predator.']
                        ],
        
        mkTurnActRand2: (opponent: string) =>
            opponent === 'muffet' // NO-TRANSLATE

                ? [
                    ['<32>{#p/story}* Monster Kid complimented Muffet on her eloquent taste in clothing.'],
                    ['<32>{#p/story}* Monster Kid told Muffet her pastries are the best known to monsterkind.'],
                    ["<32>{#p/story}* Monster Kid said no webs are as strong as Muffet's."]
                ]
                : opponent === 'shyren' // NO-TRANSLATE

                    ? [
                        ['<32>{#p/story}* Monster Kid hummed a pretty melody.'],
                        ["<32>{#p/story}* Monster Kid complimented Shyren's hair."],
                        ["<32>{#p/story}* Monster Kid complimented Shyren's voice."]
                    ]
                    : opponent === 'woshua' // NO-TRANSLATE

                        ? [
                            ['<32>{#p/story}* Monster Kid called Skrubbington the cleanest monster on the block.'],
                            ["<32>{#p/story}* Monster Kid appreciated Skrubbington's efforts to freshen up the factory."],
                            ["<32>{#p/story}* Monster Kid noted Skrubbington's committment to perfection."]
                        ]
                        : opponent === 'radtile' // NO-TRANSLATE

                            ? [
                                ["<32>{#p/story}* Monster Kid complimented Radtile's mirror."],
                                ["<32>{#p/story}* Monster Kid complimented Radtile's hat."],
                                ["<32>{#p/story}* Monster Kid made sure to double-check Radtile's appearance."]
                            ]
                            : [
                                ['<32>{#p/story}* Monster Kid offered to keep $(x) company.'],
                                ["<32>{#p/story}* Monster Kid told $(x) they'd be there if it'd help."],
                                ['<32>{#p/story}* Monster Kid stood on top of $(x).']
                            ],
        
        mkTurnActRand3: (opponent: string) =>
            opponent === 'muffet' // NO-TRANSLATE

                ? [
                    ['<32>{#p/story}* Monster Kid tried asking Muffet about spider clans.'],
                    ['<32>{#p/story}* Monster Kid tried asking Muffet about bakeries.'],
                    ['<32>{#p/story}* Monster Kid tried asking Muffet about tea.']
                ]
                : opponent === 'shyren' // NO-TRANSLATE

                    ? [
                        ['<32>{#p/story}* Monster Kid debated about musical notation.'],
                        ['<32>{#p/story}* Monster Kid spoke about music theory.'],
                        ['<32>{#p/story}* Monster Kid discussed their favorite music genres.']
                    ]
                    : opponent === 'woshua' // NO-TRANSLATE

                        ? [
                            ['<32>{#p/story}* Monster Kid waxed poetic about proper hygiene.'],
                            ['<32>{#p/story}* Monster Kid rapped about hazard safety.'],
                            ['<32>{#p/story}* Monster Kid showed off their polished sewer pipe set.']
                        ]
                        : opponent === 'radtile' // NO-TRANSLATE

                            ? [
                                ['<32>{#p/story}* Monster Kid made an ugly face at Radtile.'],
                                ['<32>{#p/story}* Monster Kid came near and inspected Radtile up close.'],
                                ['<32>{#p/story}* Monster Kid acted out as if they were a feral creature.']
                            ]
                            : [
                                ['<32>{#p/story}* Monster Kid wiggled around, mimicing $(x).'],
                                ['<32>{#p/story}* Monster Kid did a handstand, impressing $(x).'],
                                ['<32>{#p/story}* Monster Kid spun around, bewildering $(x).']
                            ],
        
        mkTurnActRand4: (opponent: string) =>
            opponent === 'muffet' // NO-TRANSLATE

                ? [["<32>{#p/story}* Monster Kid tried telling Muffet there's no point in all this!"]]
                : opponent === 'shyren' || opponent === 'radtile' // NO-TRANSLATE

                    ? [['<32>{#p/story}* Monster Kid claimed a spatial distortion was approaching fast!']]
                    : opponent === 'woshua' // NO-TRANSLATE

                        ? [['<32>{#p/story}* Monster Kid claimed an airborne viral agent was on its way!']]
                        : [['<32>{#p/story}* Monster Kid claimed the nearby pipes were leaking acid!']],
        mkTurnActResult0: ['<32>{#p/story}* Nothing happened.'],
        mkTurnActResult1: (opponent: string) =>
            opponent === 'woshua' // NO-TRANSLATE

                ? ["<32>{#p/story}* Skrubbington was grossed out!\n* Skrubbington's DEFENSE down!"]
                : opponent === 'shyren' // NO-TRANSLATE

                    ? ["<32>{#p/story}* Shyren felt uncomfortable!\n* Shyren's DEFENSE down!"]
                    : opponent === 'radtile' // NO-TRANSLATE

                        ? ["<32>{#p/story}* Radtile felt uncomfortable!\n* Radtile's DEFENSE down!"]
                        : ["<32>{#p/story}* $(x) felt uncomfortable!\n* $(x)'s DEFENSE down!"],
        mkTurnActResult2: (opponent: string) =>
            opponent === 'woshua' // NO-TRANSLATE

                ? ["<32>{#p/story}* Skrubbington felt flattered!\n* Skrubbington's ATTACK down!"]
                : opponent === 'shyren' // NO-TRANSLATE

                    ? ["<32>{#p/story}* Shyren felt flattered!\n* Shyren's ATTACK down!"]
                    : opponent === 'radtile' // NO-TRANSLATE

                        ? ["<32>{#p/story}* Radtile felt respected!\n* Radtile's ATTACK down!"]
                        : ["<32>{#p/story}* $(x) felt respected!\n* $(x)'s ATTACK down!"],
        mkTurnActResult3: (opponent: string, multiple: boolean) =>
            opponent === 'woshua' // NO-TRANSLATE

                ? multiple
                    ? ['<32>{#p/story}* Skrubbington and the others were distracted by Monster Kid and forgot their turn!']
                    : ['<32>{#p/story}* Skrubbington was distracted by Monster Kid and forgot their turn!']
                : opponent === 'shyren' // NO-TRANSLATE

                    ? ['<32>{#p/story}* Distracted by Monster Kid, Shyren forgot her turn!']
                    : multiple
                        ? ['<32>{#p/story}* Entranced by Monster Kid, $(x) and the others forgot their turn!']
                        : opponent === 'radtile' // NO-TRANSLATE

                            ? ['<32>{#p/story}* Entranced by Monster Kid, Radtile forgot his turn!']
                            : ['<32>{#p/story}* Entranced by Monster Kid, $(x) forgot their turn!'],
        mkTurnActResult4: (opponent: string, multiple: boolean, allowpac: boolean) =>
            opponent === 'woshua' // NO-TRANSLATE

                ? [
                    '<32>{#p/story}* Fearful for its life, Skrubbington panicked and left the battle!',
                    ...(multiple ? ['<32>{#p/story}* The other monsters continue to fight you.'] : [])
                ]
                : opponent === 'shyren' // NO-TRANSLATE

                    ? allowpac
                        ? ['<32>{#p/story}* Fearful for her life, Shyren panicked and left the battle!']
                        : ['<32>{#p/story}* Encouraged by her own performance, Shyren braved the threat!']
                    : opponent === 'radtile' // NO-TRANSLATE

                        ? ['<32>{#p/story}* Fearful for his life, Radtile panicked and left the battle!']
                        : [
                            '<32>{#p/story}* Fearful for its life, $(x) panicked and left the battle!',
                            ...(multiple ? ['<32>{#p/story}* The other monsters continue to fight you.'] : [])
                        ],
        mkTurnFight1: () => [
            '<32>{#p/kidding}* Y... y-you want me to fight?\n* Are you sure?',
            choicer.create('* (Do you confirm?)', 'Yes', 'No')
        ],
        mkTurnFight2a: ['<32>{#p/kidding}* Okay... here goes nothing...'],
        mkTurnFight2b: ['<32>{#p/kidding}* Oh, okay...', "<32>* I'll just spare them, then!"],
        mkTurnFight3a: ['<32>* Ngh...!'],
        mkTurnFight3b: ['<32>* Hi-yah...!'],
        mkTurnFight3c: ['<32>* Wa-POW!'],
        mkTurnMercy1: ['<32>{#p/kidding}* Mercy?\n* Do I spare them?', "<32>{#p/kidding}* Haha, that's easy!"],
        mkTurnX: () => [choicer.create('* (What should Monster Kid do?)', 'Mercy', 'Act', 'Magic', 'Fight')]
    },

    c_name_common: {
        keyring: 'Keyring',
        hello_asgore: 'Say Hello',
        about_asgore: 'About Yourself',
        dad: 'Call Him \"Dad\"',
        flirt_asgore: 'Flirt',
        insult_asgore: 'Insult'
    },

    c_call_common: {
        start: '<32>{#s/phone}{#p/event}* Dialing...',
        end: '<32>{#s/equip}{#p/event}* Click...',
        nobody0: ['<32>{#p/human}* (Too much interference.)'],
        nobody1: ['<32>{#p/human}* (Sem resposta.)'],
        nobody2: ['<32>{#p/basic}* ... but nobody came.'],
        nobody3: ['<32>{#p/human}* (No connection.)'],
        nobody4: [
            '<32>{#p/human}* (It sounds like a small, white dog is sleeping on the cell phone.)',
            '<32>{#p/basic}* (Snore... snore...)',
            '<32>* (Snore... snore...)'
        ],
        nobody4a: [
            '<32>{#p/human}* (It sounds like a small, white dog is sleeping on the cell phone.)',
            '<32>{#p/basic}* (Snore... snore... snore...)',
            '<32>* (Snore... snore... snore...)'
        ],
        nobody4f: [
            '<32>{#p/human}* (It sounds like a small, white dog is sleeping on the cell phone.)',
            '<32>{#p/basic}* (Snore...!)',
            '<32>* (Snore...!)'
        ],
        nobody4m: [
            '<32>{#p/human}* (It sounds like a small, white dog is sleeping on the cell phone.)',
            '<32>{#p/basic}* (Snore...?)',
            '<32>* (Snore...?)'
        ],
        nobody4i: [
            '<32>{#p/human}* (It sounds like a small, white dog is sleeping on the cell phone.)',
            '<32>{#p/basic}* (Whimper.)',
            '<32>* (Whine.)'
        ],
        about1: [
            '<25>{#p/asgore}{#f/5}* About me?',
            '<25>{#f/7}* ... oh, but where would I begin?',
            '<25>{#f/6}* There is far too much to tell at once.',
            '<25>{#f/6}* Perhaps, over time, you will come to know me very well.',
            '<25>{#f/21}* It would be better than telling you everything at once.'
        ],
        about2: [
            '<25>{#p/asgore}{#f/5}* If you like, I can tell you something about myself later.',
            '<25>{#f/7}* How does that sound?'
        ],
        flirt1: [
            '<25>{#p/asgore}{#f/20}* ...',
            '<25>{#f/4}* Frisk.',
            '<25>{#f/6}* Surely there is someone more your age.',
            '<25>{#f/5}* I am not saying I cannot oblige, but...',
            '<25>{#f/6}* There is a world of difference between \"can\" and \"should.\"'
        ],
        flirt2: [
            '<25>{#p/asgore}{#f/20}* Frisk.',
            '<25>{#f/20}* Perhaps when you are older, we may explore this further.',
            '<25>{#f/6}* But not now.'
        ],
        flirt3: [
            '<25>{#p/asgore}{#f/20}* Frisk.',
            '<25>{#f/6}* You call me \"Dad,\" and then you flirt with me.',
            '<25>{#f/5}* I am not sure how to react to this.'
        ],
        hello: [
            ['<25>{#p/asgore}{#f/21}* A greeting, you say?', '<25>{#f/7}* Hmm...', '<25>{#f/6}* I give you a \"Howdy!\"'],
            ['<25>{#p/asgore}{#f/5}* Another greeting?', '<25>{#f/21}* I know...', '<25>{#f/6}* \"How do you do!\"'],
            [
                '<25>{#p/asgore}{#f/5}* ...',
                '<25>{#f/5}* At this rate, I am going to run out of greetings.',
                '<25>{#f/6}* Though, the birds outside may be more willing to oblige.',
                '<25>{#f/7}* Why not try with them?'
            ],
            ['<25>{#p/asgore}{#f/5}* ... howdy, little one.', '<25>{#f/6}* It is always nice to hear your voice.']
        ],
        dad1: [
            '<25>{#p/asgore}{#f/6}* ...',
            '<25>{#f/24}* ...',
            '<25>{#f/21}* Of course.',
            '<25>{#f/6}* I suppose it is only natural you would call me that.',
            '<25>{#f/6}* You may call me \"Dad\" if you want, Frisk.'
        ],
        dad2: [
            '<25>{#p/asgore}{#f/24}* ...\n* Goodness gracious.',
            '<25>{#f/6}* You seem very intent on me being your father.',
            '<25>{#f/21}* Fortunately, I had already planned to fill that role.'
        ],
        dad3: [
            '<25>{#p/asgore}{#f/24}* ...\n* Goodness gracious.',
            '<25>{#f/6}* You flirt with me, and then you call me \"Dad.\"',
            '<25>{#f/5}* I am not sure how to react to this.'
        ],
        insult1: () =>
            SAVE.data.b.ufokinwotm8
                ? [
                    '<25>{#p/asgore}{#f/1}* ...',
                    '<25>{#f/1}* You seem very upset about something...',
                    '<25>{#f/6}* If you like, we may talk once construction has come to an end.'
                ]
                : [
                    '<25>{#p/asgore}{#f/8}* ...',
                    '<26>{#f/6}* Ooh.\n* How dastardly of you.',
                    '<25>{#f/21}* But do not worry...\n* I can tell you are only kidding with me.'
                ],
        insult2: () =>
            SAVE.data.b.ufokinwotm8
                ? ['<25>{#p/asgore}{#f/1}* ...', '<25>{#p/asgore}{#f/6}* I will be available to talk with you soon, okay?']
                : ['<25>{#p/asgore}{#f/21}* Now, now.\n* There is no need to be so brazen.']
    },

    s_save_common: {
        _cockpit: {
            name: 'Deep Space',
            text: []
        },
        _frontier1: {
            name: 'Your Room',
            text: ["<32>{#p/human}* (You're filled with determination.)"]
        },
        _frontier8: {
            name: 'Eurybia',
            text: []
        }
    }
};


// END-TRANSLATE
