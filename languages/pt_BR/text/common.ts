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
                            addB(['<25>{#p/toriel}{#f/9}* Junto com morte da membro do esquadrão de ELITE Doge.']);
                        } else if (droyalguards) {
                            addB(['<25>{#p/toriel}{#f/9}* Junto com a morte das suas novas recrutas, 03 e 04.']);
                        } else if (dmadjick) {
                            addB(['<25>{#p/toriel}{#f/9}* Junto com morte do membro do esquadrão de ELITE Cozmo.']);
                        } else if (dknightknight) {
                            addB(['<25>{#p/toriel}{#f/9}* Junto com a morte do membro do esquadrão de ELITE Terrestria.']);
                        } else if (mdeaths > 9) {
                            addB(['<25>{#p/toriel}{#f/9}* Junto com a morte de tantos outros monstros.']);
                        } else if (mdeaths > 2) {
                            addB(['<25>{#p/toriel}{#f/9}* Junto com a morte de outros monstros.']);
                        } else {
                            addB(['<25>{#p/toriel}{#f/9}* Junto com a morte de outro monstro.']);
                        }
                        if (dmettaton) {
                            addB([
                                '<25>{#p/toriel}{#f/1}* Eu acreditei que ele poderia simplesmente ser reparado...',
                                '<25>{#p/toriel}{#f/1}* E que todo mundo estava errado.',
                                '<25>{#p/toriel}{#f/5}* Mas não era o caso, e eu estava errada de pensar o contrário.'
                            ]);
                        } else {
                            addB([
                                '<25>{#p/toriel}{#f/5}* Entretanto, Eu tenho apenas minha própria covardia para culpar.',
                                '<25>{#p/toriel}{#f/1}* Se eu tivesse a coragem te der enfrentado meus medos mais cedo...'
                            ]);
                            if (hkills === 0) {
                                addB([
                                    '<25>{#p/toriel}{#f/5}* Eu poderia ter ido contigo e te levado para a direção correta.'
                                ]);
                            } else {
                                addB([
                                    '<25>{#p/toriel}{#f/5}* Eu poderia ter ido contigo e encorajado um caminho mais pacífico.'
                                ]);
                            }
                        }
                        addB([
                            '<26>{#p/toriel}{#f/9}* Alas, não a mais nada que possa ser feito.',
                            '<25>{#p/toriel}{#f/5}* Como rainha, eu não tive tempo de pensar em tais situações.',
                            "<25>{#p/toriel}{#f/9}* A segurança dos humanos estava em jogo, e eu não os perderia novamente.",
                            '<25>{#p/toriel}{#f/10}* Minha primeira ação como rainha seria aumentar sua proteção.'
                        ]);
                        if (royals < 2) {
                            addB([
                                '<26>{#p/toriel}{#f/5}* Admiro, será difícil, dado a perda da Guarda Real.'
                            ]);
                        } else {
                            addB([
                                '<25>{#p/toriel}{#f/5}* É certo que eu estava sem prática em lidar com esse tipo de assunto.'
                            ]);
                        }
                        addB([
                            '<25>{#p/toriel}{#f/1}* Mas com a ajuda de um velho amigo, Gerson, e seus contatos...',
                            '<25>{#p/toriel}{#f/1}* Eu fui capaz de arranjar o mínimo de segurança aqui na Cidadela.',
                            '<25>{#p/toriel}{#f/0}* Não é muito, mas os humanos e seus segredos estão seguros agora.',
                            '<25>{#p/toriel}{#f/1}* ...',
                            '<25>{#p/toriel}{#f/1}* Desde então, a vida tem sido a de sempre...'
                        ]);
                        if (royals < 2) {
                            addB(['<25>{#p/toriel}{#f/5}* Tirando a perda do rei, e de toda a Guarda Real...']);
                        } else {
                            addB(['<25>{#p/toriel}{#f/5}* Tirando a perda do rei, e da atual capitã da Guarda Real...']);
                        }
                        addB([
                            '<25>{#p/toriel}{#f/1}* Pessoas ainda tem esperança em suas liberdades.',
                            '<25>{#p/toriel}{#f/5}* Com esperança... eu entregarei isso a eles.',
                            '<25>{#p/toriel}{#f/9}* ...',
                            '<25>{#p/toriel}{#f/9}* De certa forma, eu entendo o que ASGORE deve ter passado.',
                            '<25>{#p/toriel}{#f/10}* O peso de tais exigências ultrajantes sendo feitas a mim...',
                            '<25>{#p/toriel}{#f/9}* ... mudou quem eu sou como pessoa.',
                            '<25>{#p/toriel}{#f/5}* Hoje mais cedo.'
                        ]);
                        if (dpapyrus) {
                            addB([
                                '<25>{#p/toriel}{#f/5}* Quando Sans veio falar sobre seu irmão, eu...',
                                '<25>{#p/toriel}{#f/9}* Eu rejeitei a oferta para ser deixada sozinha.',
                                '<25>{#p/toriel}{#f/1}* Ele balançou a cabeça, e saiu como se nada estivesse errado...',
                                '<25>{#p/toriel}{#f/5}* Eu sabia que ele deveria estar desapontado.'
                            ]);
                        } else {
                            addB([
                                '<25>{#p/toriel}{#f/5}* Quando Papyrus veio falar sobre a Undyne, eu...',
                                '<25>{#p/toriel}{#f/9}* Eu rejeitei a oferta para ser deixada sozinha.',
                                '<25>{#p/toriel}{#f/1}* Ele tentou agir como se nada estivesse errado...',
                                '<25>{#p/toriel}{#f/5}* Mas eu sabia que ele provavelmente estava triste.'
                            ]);
                        }
                        addB([
                            '<25>{#p/toriel}{#f/9}* ... eu senti culpa, mas com toda pressão sobre minhas costas...',
                            '<25>{#p/toriel}{#f/5}* Eu não me vi na energia para discutir tal tópico.',
                            '<25>{#p/toriel}{#f/5}* ...',
                            '<25>{#p/toriel}{#f/1}* Ainda assim.\n* Eu não desisti de nosso futuro.',
                            '<25>{#p/toriel}{#f/1}* Não importa o que acontecer comigo, ou com o que eu represento...',
                            '<25>{#p/toriel}{#f/0}* Pelo menos a raça monstro será livre um dia.',
                            '<25>{#p/toriel}{#f/1}* Isso é o que importa agora, correto?',
                            '<25>{#p/toriel}{#f/1}* ...',
                            '<25>{#p/toriel}{#f/5}* ...',
                            '<25>{#p/toriel}{#f/9}* ... eu suponho... que agora seja uma boa hora para terminar a ligação.',
                            '<25>{#p/toriel}{#f/9}* Não a muito mais que eu tenha para dizer.',
                            '<25>{#p/toriel}{#f/5}* ...',
                            '<25>{#p/toriel}{#f/5}* Adeus, pequeno.',
                            '<32>{#s/equip}{#p/event}* Click...'
                        ]);
                    }
                } else if (royals === 5 && !ddoggo && !dlesserdog && !ddogs && !dgreatdog && !ddoge) {
                    k = 'light_dog'; // NO-TRANSLATE

                    m = music.dogsong;
                    
                    addA([
                        '<32>{#s/phone}{#p/event}* Ring, ring...',
                        '<32>{#s/bark}{#p/event}* Bark!\n{#s/bark}* Bark!',
                        '<32>{#p/basic}* (E ainda, a muito para ser dito!)\n* (Muito pelo que se animar!)',
                        '<32>{#s/bark}{#p/event}* Bark!',
                        "<32>{#p/basic}* (Você não gostaria de saber mais!?)"
                    ]);
                    addB([
                        '<32>{#s/bark}{#p/event}* Bark!\n{#s/bark}* Bark!\n{#s/bark}* Bark!',
                        '<32>{#p/basic}* (Quando você fugiu, o rei não foi encontrado em lugar algum!)',
                        '<32>{#p/basic}* (Todos confusos!)\n* (Alphys, sem capacidade para tomar o trono!)',
                        '<32>{#s/bark}{#p/event}* Bark!\n{#s/bark}* Bark!\n{#s/bark}* Bark!',
                        '<32>{#p/basic}* (Mas ela falou com a Guarda Real.)\n* (E a Guarda chegou a um acordo!)',
                        '<32>{#p/basic}* (Doge voltou a batalha, mas dessa vez como rainha do Outpost!)',
                        '<32>{#s/bark}{#p/event}* Bark!\n{#s/bark}* Bark!\n{#s/bark}* Bark!',
                        '<32>{#p/basic}* (Foi ótimo ver os outros cachorros concordarem!)',
                        '<32>{#p/basic}* (Um sentimento de orgulho como nenhum outro!)',
                        '<32>{#p/basic}* (É claro, a antiga mestre os ensinou tudo que eles sabem.)',
                        '<32>{#s/bark}{#p/event}* Bark!\n{#s/bark}* Bark!',
                        '<32>{#p/basic}* (No fim, eles formaram um conselho entre os cachorros, para que as decisões fossem tomadas.)',
                        '<32>{#p/basic}* (Todos ganham guloseimas e ossinhos por seu trabalho duro!)',
                        "<32>{#p/basic}* Huh?\n* Quem está aí?\n* Eu vi alguém se mexendo!?",
                        '<32>{#s/bark}{#p/event}* Bark!',
                        "<32>{#p/basic}* Oh, é só você.",
                        '<32>{#p/basic}* ...',
                        '<32>{#p/basic}* Pera, com quem você tá falando!?',
                        '<32>{#s/bark}{#p/event}* Bark!\n{#s/bark}* Bark!',
                        '<32>{#p/basic}* (Doggo quer falar contigo.)\n* (Boa sorte!)',
                        '<32>{#p/basic}* Me dá isso aqui!',
                        "<32>{#p/basic}* ...\n* Então é você, huh?"
                    ]);
                    if (
                        SAVE.data.n.state_starton_doggo === 0 &&
                        SAVE.data.n.state_starton_lesserdog === 0 &&
                        SAVE.data.n.state_starton_dogs === 0 &&
                        SAVE.data.n.state_starton_greatdog === 0
                    ) {
                        if (SAVE.data.n.state_foundry_doge === 2) {
                            addB([
                                "<32>{#p/basic}* Você é aquele que pensou que seria super divertido acariciar todos nós!",
                                "<32>{#p/basic}* Não que... eu esteja reclamando.",
                                "<32>{#p/basic}* Mas... argh!\n* Eu nem pude te ver!",
                                '<32>{#p/basic}* Aquilo foi injusto!'
                            ]);
                        } else {
                            addB([
                                "<32>{#p/basic}* Você é aquele que pensou que seria super divertido acariciar todos nós!",
                                "<32>{#p/basic}* Exceto pela Doge.\n* Ela é bem difícil de se deixar levar.",
                                "<32>{#p/basic}* Mas... argh!\n* Eu nem pude te ver!",
                                '<32>{#p/basic}* Me pergunto qual seria o segredo dela...'
                            ]);
                        }
                    } else if (
                        SAVE.data.n.state_starton_doggo === 1 &&
                        SAVE.data.n.state_starton_lesserdog === 1 &&
                        SAVE.data.n.state_starton_dogs === 1 &&
                        SAVE.data.n.state_starton_greatdog === 1
                    ) {
                        addB([
                            "<32>{#p/basic}* Você é aquele que pensou que poderia passar de todos nós apenas lançando uma chave.",
                            '<32>{#p/basic}* Quer dizer, eu sei, funcionou.',
                            '<32>{#p/basic}* Mas foi bem irritante quando eu descobri!',
                            '<32>{#p/basic}* Talvez...',
                            '<32>{#p/basic}* ... poderíamos brincar novamente alguma hora?',
                            "<32>{#p/basic}* Não, não, esqueçe que eu disse isso.\n* Eu não deveria me entregar tanto às minhas fantasias."
                        ]);
                    } else if (
                        SAVE.data.n.state_starton_doggo === 3 &&
                        SAVE.data.n.state_starton_lesserdog === 3 &&
                        SAVE.data.n.state_starton_dogs === 3
                    ) {
                        if (SAVE.data.n.state_starton_greatdog === 3) {
                            addB([
                                "<32>{#p/basic}* Você é aquele tentou dar uma surra em todos nós!",
                                '<32>{#p/basic}* Você até mesmo desapontou Major Canis...',
                                "<32>{#p/basic}* O que tem de errado contigo!?\n* Você é tão mau!",
                                "<32>{#p/basic}* ... isso é o que os outros diriam."
                            ]);
                        } else {
                            addB([
                                "<32>{#p/basic}* Você é aquele tentou dar uma surra em todos nós!",
                                '<32>{#p/basic}* Pelo menos você deixou o Major Canis feliz.',
                                "<32>{#p/basic}* Então, talvez você não seja tão ruim?",
                                "<32>{#p/basic}* ... para ser honesto, eu não me importei..."
                            ]);
                        }
                    } else if (SAVE.data.n.state_starton_doggo === 0) {
                        addB([
                            "<32>{#p/basic}* Você é aquele que me acariciou quando eu nem pude ver!",
                            '<32>{#p/basic}* Eu aposto que você achou aquilo muito divertido.',
                            '<32>{#p/basic}* Eu aposto que eu parecia bem fofo.',
                            "<32>{#p/basic}* ... não, espera, eu não quis dizer isso!"
                        ]);
                    } else if (SAVE.data.n.state_starton_doggo === 1) {
                        addB([
                            "<32>{#p/basic}* Foi você quem brincou de buscar comigo, certo?",
                            "<32>{#p/basic}* Wow!\n* Eu amaria fazer aquilo de novo alguma hora.",
                            "<32>{#p/basic}* Mas... isso é só uma fantasia."
                        ]);
                    } else {
                        addB([
                            "<32>{#p/basic}* Você é aquele que tentou me dar uma surra!",
                            '<32>{#p/basic}* Aquilo foi bem rude.\n* E maldoso.',
                            "<32>{#p/basic}* Eu definitivamente não gostei.",
                            '<32>{#p/basic}* ...'
                        ]);
                    }
                    addB([
                        '<32>{#p/basic}* De toda forma!\n* Você ouviu falar dos humanos que nós libertamos!?',
                        "<32>{#p/basic}* Eles estavam dormindo em algum tipo de arquivo esquisito.\n* É bem acima do meu nível de graduação.",
                        '<32>{#p/basic}* Tudo que eu sei, e que agora eu preciso cuidar de um humano!',
                        "<32>{#p/basic}* Foi ideia da Doge.\n* Cada um de nós ganhou um.",
                        "<32>{#p/basic}* Eles são como pets???",
                        "<32>{#p/basic}* Não se preocupe, não tratamos eles mau.\n* Estão sobre nossa proteção!",
                        '<32>{#p/basic}* O que é estranho... já que a gente tava tentando matar eles antes ou coisa do tipo.'
                    ]);
                    if (royals < 6 || mdeaths > 9) {
                        addB([
                            '<32>{#p/basic}* Bem, era meio que nossa obrigação.',
                            '<32>{#p/basic}* Pessoas realmente parecem ODIAR humanos hoje em dia.'
                        ]);
                    } else {
                        addB(['<32>{#p/basic}* Mas os tempos mudaram!\n* E nós também devemos!']);
                    }
                    addB([
                        '<32>{#p/basic}* Ei, ESPERA!\n* Meu humano está vindo pra cá AGORA MESMO!!',
                        '<32>{#p/human}{#v/3}{@fill=#003cff}* Mestre Doggo!\n* Mestre Doggo!\n* Você tem que vir e ver!',
                        '<32>{#p/basic}* O que é agora.',
                        "<32>{#p/human}{#v/3}{@fill=#003cff}* Você vai perder a grande abertura.",
                        '<32>{#p/basic}* Acho que é melhor eu ir ver o que é isso...',
                        '<32>{#p/basic}* ...',
                        '<32>{#s/bark}{#p/event}* Bark!\n{#s/bark}* Bark!\n{#s/bark}* Bark!',
                        "<32>{#p/basic}* Eu entendi, OK!? \n* Estou quase lá!",
                        '<32>{#p/basic}* ...',
                        '<32>{#p/basic}* Mas que...\n* O QUE É ISSO!?',
                        "<32>{#p/basic}* ISSO NÃO FAZIA PARTE DO HORIZONTE DA CIDADE ANTES!!",
                        "<32>{#p/human}{#v/3}{@fill=#003cff}* É o seu novo santuário para cães!\n* Exatamente como você queria!",
                        "<32>{#p/basic}* Está em... constante movimento...",
                        '<32>{#p/basic}* OLHA SÓ PRA ISSO!',
                        '<32>{#s/bark}{#p/event}* Bark!\n{#s/bark}* Bark!\n{#s/bark}* Bark!'
                    ]);
                    if (30 <= SAVE.data.n.bully) {
                        addB([
                            '<32>{#p/basic}* (Santuários, bons para a paz!)\n* (Ajudam a aliviar o medo de ser atacado por humanos!)',
                            '<32>{#p/basic}* (Uma lembrança da estabilidade que o novo regime trás, para cachorros ou outros!'
                        ]);
                    } else {
                        addB([
                            '<32>{#p/basic}* (Santuários, bons para a paz!)\n* (Incentivam o bom comportamento em todos os cidadãos!)',
                            '<32>{#p/basic}* (Uma lembrança do amor que você receberá por ser bom, cachorro ou outro!)'
                        ]);
                    }
                    addB([
                        '<32>{#p/basic}* Sim, sim, eu sei.\n* Parece ótimo... parece como eu.',
                        '<32>{#p/basic}* ... obrigado.',
                        '<32>{#s/bark}{#p/event}* Bark!\n{#s/bark}* Bark!',
                        "<32>{#p/basic}* (E esse é o último!)\n* (Todos os cães do conselho têm santuários agora!)",
                        '<32>{#p/basic}* PERFEITO!!\n* Posso voltar a minha ligação agora?',
                        '<32>{#s/bark}{#p/event}* Bark!',
                        "<32>{#p/human}{#v/3}{@fill=#003cff}* Eu vou ter que mostrar aos outros!",
                        '<32>{#p/basic}* EI!\n* Antes de você ir...',
                        "<32>{#p/basic}* Eu não teria visto a tempo sem você.\n* Tenha um biscoito.",
                        '<32>{#p/human}{#v/3}{@fill=#003cff}* Mestre Doggo...!',
                        "<32>{#p/basic}* Vai lá, conte aos seus amigos.\n* MAS NÃO COMPARTILHE!",
                        '<32>{#p/basic}* ...',
                        '<32>{#p/basic}* Então, por aqui, todo mundo entende como as coisas funcionam.',
                        '<32>{#p/basic}* Você visita o santuário, faz um serviço no trabalho, e é bom em casa também.',
                        "<32>{#p/basic}* E talvez, se você for muito bom, você ganha uma recompensa!",
                        "<32>{#p/basic}* É perfeito.\n* Ninguém quebra as regras.",
                        '<32>{#p/basic}* Tirando aqueles vendedores de loja no rec center.',
                        "<32>{#p/basic}* ELES SÃO PREGUIÇOSOS E DESORGANIZADOS!",
                        '<32>{#p/basic}* Mas eles vendem tralhas legais, então a gente deixa passar.',
                        '<32>{#p/basic}* Pera aí.\n* A gente tá deixando mais alguém passar nas regras??',
                        '<32>{#p/basic}* O QUE A SOCIEDADE SE TORNOU!',
                        '<32>{#s/bark}{#p/event}* Bark!\n{#s/bark}* Bark!\n{#s/bark}* Bark!'
                    ]);
                    if (!dmuffet) {
                        addB([
                            '<32>{#p/basic}* (Doggo, novo trabalho pra você.)\n* (A rainha aranha está fazendo confusão mais uma vez.)',
                            '<32>{#p/basic}* (É necessário puni-la!)',
                            "<32>{#p/basic}* ... ugh.\n* Eu não gosto de disciplinar pessoas.",
                            '<32>{#s/bark}{#p/event}* Bark!',
                            '<32>{#p/basic}* (Sem disciplina, a sociedade dos cachorros perde seu balanço!)',
                            "<32>{#p/basic}* Eu acho.\n* Não poderia alguém tirando eu fazer isso?",
                            '<32>{#s/bark}{#p/event}* Bark!\n{#s/bark}* Bark!',
                            "<32>{#p/basic}* (Todos os cães do conselho devem praticar disciplina.)\n* (É a sua vez!)"
                        ]);
                    } else if (!dpapyrus) {
                        addB([
                            '<32>{#p/basic}* (Doggo, novo trabalho pra você!)\n* (Esqueleto grande, merecendo gratificação bônus!)',
                            '<32>{#p/basic}* (Ofereça uma para eles!)',
                            '<32>{#p/basic}* ... ugh.\n* Eu juro que damos merecimento bonus para ele todos os dias.',
                            '<32>{#s/bark}{#p/event}* Bark!',
                            '<32>{#p/basic}* (Grande esqueleto da ótimos exemplos!)',
                            "<32>{#p/basic}* Neste ritmo ele estará no conselho canino por conta própria.",
                            '<32>{#s/bark}{#p/event}* Bark!\n{#s/bark}* Bark!',
                            '<32>{#p/basic}* (Estamos considerando a possibilidade.)\n* (Agora cumpra seu dever!)'
                        ]);
                    } else {
                        addB([
                            '<32>{#p/basic}* (Doggo, novo trabalho para você!)\n* (Os suprimentos de ração para cães estão acabando.)',
                            '<32>{#p/basic}* (Você pode ajudar a recolocar?)',
                            '<32>{#p/basic}* ... ugh.\n* Por que eu fico com todo trabalho duro por aqui?',
                            '<32>{#s/bark}{#p/event}* Bark!',
                            "<32>{#p/basic}* (Doggo, o único cachorro que não reclama de fazer trabalho duro.)",
                            '<32>{#p/basic}* Mentira.\n* Doge ama fazer trabalho duro bem mais do que eu.',
                            '<32>{#s/bark}{#p/event}* Bark!\n{#s/bark}* Bark!',
                            '<32>{#p/basic}* (Doge não pode fazer esse tipo de trabalho.)\n* (Doge é a rainha.)'
                        ]);
                    }
                    addB([
                        '<32>{#p/basic}* OK.\n* Beleza.',
                        "<32>{#p/basic}* Bem, eu acho que vou ter que acabar nosso papo por aqui.",
                        '<32>{#p/basic}* Divirta-se aí fora, seja lá onde você estiver.',
                        "<32>{#p/basic}* ... eu daria o telefone de volta para o cachorro irritante, mas a duraria tempo demais.",
                        '<32>{#p/basic}* QUEM CONVERSA POR TANTO TEMPO SEM FICAR CANSADO!?',
                        '<32>{#s/bark}{#p/event}* Bark!\n{#s/bark}* Bark!\n{#s/bark}* Bark!',
                        '<32>{#p/basic}* Tá bom, estou indo!\n* Para de me apressar!',
                        '<32>{#s/equip}{#p/event}* Click...'
                    ]);
                } else if (!dmuffet) {
                    k = 'light_muffet'; // NO-TRANSLATE

                    m = music.spiderboss;
                    
                    addA([
                        '<32>{#s/phone}{#p/event}* Ring, ring...',
                        '<32>{#p/basic}{#s/spiderLaugh}* Oh, olá querido~',
                        '<32>{#p/basic}* Você está bem?',
                        "<32>{#p/basic}* Oh, estou brincando~\n* Não é como se eu me importasse com você~",
                        "<32>{#p/basic}* Eu só quero que você saiba de toda a diversão que está perdendo!"
                    ]);
                    addB([
                        '<32>{#p/basic}{#s/spiderLaugh}* Então, após você partir do Outpost...',
                        '<32>{#p/basic}* Por linha de sucessão, Alphys deveria entrar em controle como rainha~',
                        "<32>{#p/basic}* Mas você vê, querido, ela não achava que conseguiria!"
                    ]);
                    if (dmettaton) {
                        addB(["<32>{#p/basic}* Não a culpa de forma alguma. Ela deixou sua estrela da TV de estimação morrer tão tragicamente!"]);
                    } else {
                        addB([
                            "<32>{#p/basic}* Não a culpo de forma alguma. Sem o grande Asgore para segurar suas mãos, ela é inútil!"
                        ]);
                    }
                    if (royals < 2) {
                        addB([
                            "<32>{#p/basic}* Seria tão triste não ter ninguém para tomar o poder, você não acha?",
                            '<32>{#p/basic}* Para a sorte dele, eu estava mais do que feliz em tomar o poder~',
                            '<32>{#p/basic}* Ahuhuhu~\n* Ela me rejeitou no começo, mas após um pouco de \"persuasão...\"',
                            '<32>{#p/basic}* Ela foi meio que obrigada a me dar as mãos do Outpost!'
                        ]);
                    } else {
                        addB([
                            '<32>{#p/basic}* Ela fez um conselho com a guarda real para contratar alguém, mas...',
                            "<32>{#p/basic}* Sem a capitã, eles caíram em desordem!\n* Eles precisavam de direção~",
                            '<32>{#p/basic}* Ahuhuhu~\n* Felizmente, eu estava mais do que pronta para entregá-los isso!',
                            '<32>{#p/basic}* Desde então, o Outpost é todo meu.'
                        ]);
                    }
                    if (30 <= SAVE.data.n.bully) {
                        if (hkills > 9) {
                            addB([
                                '<33>{#p/basic}* Com sua matança e espancamento, as pessoas temeram e se tornaram obedientes~'
                            ]);
                        } else {
                            addB(['<32>{#p/basic}* Com seu ato de bullinar, as pessoas se tornaram medrosas e obedientes~']);
                        }
                        addB([
                            '<32>{#p/basic}* Como se estivessem apenas implorando por uma líder forte e assertiva para ocupar seu lugar de direito!',
                            "<32>{#p/basic}* É tão incrível como as coisas funcionaram do jeito que deviam.",
                            '<32>{#p/basic}* Por isso, querido, eu devo te agradecer~',
                            '<25>{#p/alphys}{#f/21}* Ah, que foi?\n* Você pensa que pode culpa-los por TUDO?'
                        ]);
                    } else {
                        addB([
                            "<32>{#p/basic}* Oh, querido...\n* É uma pena que você não está aqui para ver isso~",
                            '<32>{#p/basic}* Não apenas as pessoas fazem o que eu quero, na hora que eu quero...',
                            '<32>{#p/basic}* Mas alguns deles até fazem isso de bom grado!',
                            '<32>{#p/basic}* Maior parte deles ainda choram e reclamam como bebês, é claro.',
                            '<25>{#p/alphys}{#f/21}* Bom CARAMBA, eu me pergunto o motivo.'
                        ]);
                    }
                    addB([
                        "<32>{#p/basic}{#s/spiderLaugh}* Oh, Alphys querida~\n* Eu não te pedi para limpar o fluido de internet hoje?",
                        "<32>{#p/basic}* Ele ficou tão sujo após todos esses anos...",
                        "<32>{#p/basic}* Se você não limpar, então que vai?"
                    ]);
                    if (royals < 2) {
                        addB([
                            "<25>{#p/alphys}{#f/22}* NÃO SEI, TALVEZ ALGUÉM QUE ESTEJA REALMENTE QUALIFICADO!?",
                            "<32>{#p/basic}{#s/spiderLaugh}* Oh, você é uma praga, não é~",
                            "<32>{#p/basic}* Mas... ahuhuhu~\n* Você sabe o que acontece com pragas, não é mesmo?",
                            '<25>{#p/alphys}{#f/2}* ... n-não, por favor, eu...',
                            "<25>{#p/alphys}{#f/3}* E-eu vou lá fazer!\n* Fique aí assistindo, eu vou lá agora!",
                            '<32>{#p/basic}{#s/spiderLaugh}* Tarde demais, Alphys-querida~',
                            '<32>{#p/basic}* Aranhas, levem ela daqui!',
                            '<32>{#p/basic}* Parece que ela precisa de mais um tempo na Zona da Aurora~',
                            "<25>{#p/alphys}{#f/22}* Não, POR FAVOR!!\n* Eu faço qualquer coisa!!",
                            '<32>{#p/basic}{#s/spiderLaugh}* Te vejo do outro lado~'
                        ]);
                    } else {
                        addB([
                            "<26>{#p/alphys}{#f/24}* Talvez você gostaria de tentar.",
                            "<32>{#p/basic}{#s/spiderLaugh}* Ah, mas você sabe que isso nunca vai acontecer~",
                            "<32>{#p/basic}* E... ahuhuhu~\n* Falar desse jeito é o que te põe em perigo, querida~",
                            '<25>{#p/alphys}{#f/27}* Ah, e é mesmo?',
                            "<25>{#p/alphys}{#f/28}* Eheh...\n* Talvez você estará em perigo logo, logo.",
                            '<32>{#p/basic}{#s/spiderLaugh}* Chega de papo, Alphys-querida~\n* Eu sei a exata punição que você merece!',
                            '<32>{#p/basic}* Aranhas, levem ela daqui!',
                            '<32>{#p/basic}* Parece que ela precisa de mais um tempo na Zona da Aurora~',
                            '<25>{#p/alphys}{#f/29}* Aproveite seus últimos momentos de glória.',
                            "<32>{#p/basic}{#s/spiderLaugh}* Como se eu fosse cair pra isso~"
                        ]);
                    }
                    addB([
                        '<32>{#p/basic}* ...',
                        '<32>{#p/basic}* Ahuhuhu~\n* Pobre Alphys, sempre se metendo em confusão~',
                        "<32>{#p/basic}* É bom que temos a Zora da Aurora para mantê-la em bom comportamento!",
                        '<32>{#p/basic}* Com o poder do arquivo, podemos enviar um monstro para um mundo virtual~',
                        '<32>{#p/basic}* Melhor de tudo, nós controlamos como o tempo passa lá~',
                        '<32>{#p/basic}* Dias, meses, anos...',
                        '<32>{#p/basic}* Tudo passando em um piscar de olhos!',
                        '<32>{#p/basic}* Nós aranhas AMAMOS fazê-los sofrer por muito tempo quando eles se comportam mau!'
                    ]);
                    if (dmettaton) {
                        addB([
                            '<32>{#p/napstablook}* desculpa interromper...',
                            "<32>{#p/napstablook}* eu só vim te deixar saber que eu fiz o que você pediu...",
                            '<32>{#p/basic}{#s/spiderLaugh}* Ahuhuhu~\n* Muito bom, meu fantasminha espião~',
                            '<32>{#p/basic}* Você achou e identificou cada alvo da minha lista?',
                            '<32>{#p/napstablook}* é claro......\n* eu escrevi suas localizações da melhor forma que consegui',
                            "<32>{#p/basic}{#s/spiderLaugh}* Oh, maravilhoso!\n* Você é realmente um ótimo espião leal, não é mesmo~",
                            '<32>{#p/napstablook}* .........',
                            '<32>{#p/napstablook}* eu acho.........',
                            "<32>{#p/napstablook}* só seria legal... se eu soubesse o que você vai fazer com essas pessoas.........",
                            "<32>{#p/basic}{#s/spiderLaugh}* O pobre coisinha~\n* Não se preocupe com isso!",
                            '<32>{#p/basic}* Te garanto, cada um vai receber o que merece~',
                            '<32>{#p/napstablook}* ...',
                            "<32>{#p/napstablook}* eu gostaria de ir descansar agora, foi um longo dia",
                            '<32>{#p/basic}{#s/spiderLaugh}* É claro, meu fantasminha-camarada~',
                            '<32>{#p/basic}* Só tenha certeza de aparecer na hora certa amanhã~'
                        ]);
                        if (royals < 2) {
                            addB([
                                '<32>{#p/napstablook}* ...',
                                '<32>{#p/napstablook}* farei isso',
                                "<32>{#p/basic}{#s/spiderLaugh}* ... Como você pode ver, não há nenhum cidadão vivo que possa se esconder dos meus leais espiões!"
                            ]);
                        } else {
                            addB(['<32>{#p/napstablook}* ...', "<32>{#p/napstablook}* é agora ou nunca, alphys!"]);
                        }
                    } else {
                        addB([
                            '<32>{#p/mettaton}* VOCÊ JÁ TERMINOU DE SE GABAR DE SUAS REALIZAÇÕES?',
                            "<32>{#p/mettaton}* EU ESTOU AQUI, COMO REQUERIDO.",
                            "<32>{#p/basic}{#s/spiderLaugh}* Ahuhuhu~\n* O robô que eu desejava ver!",
                            '<32>{#p/basic}* Então, você diria que o público está gostando da nova programação de TV?',
                            '<32>{#p/mettaton}* AS CLASSIFICAÇÕES SÃO TERRÍVEIS.\n* NINGUÉM TÁ GOSTANDO.',
                            '<32>{#p/basic}{#s/spiderLaugh}* Ah, maravilha!\n* Música para meus ouvidos~',
                            '<32>{#p/mettaton}* SABE...'
                        ]);
                        if (iFancyYourVilliany()) {
                            addB(['<32>{#p/mettaton}* AS PESSOAS QUEREM VILÕES, E ALGUÉM PARA LUTAR CONTRA.']);
                        } else {
                            addB(['<32>{#p/mettaton}* PESSOAS QUEREM VARIEDADE E FAMOSOS CONVIDADOS.']);
                        }
                        addB([
                            "<32>{#p/mettaton}* NÃO O LIXO ABSOLUTO -VOCÊ ESTÁ- EMPURRANDO TODO MUNDO.",
                            "<32>{#p/basic}{#s/spiderLaugh}* O ponto não é dar as pessoas o que elas querem...",
                            "<32>{#p/basic}* É lavar a mente delas até elas não conseguirem mais me recusar~",
                            '<32>{#p/mettaton}* ... UGH, POSSO IR AGORA?'
                        ]);
                        if (dpapyrus) {
                            addB([
                                "<32>{#p/mettaton}* EU ESTOU EXAUSTO O SUFICIENTE.",
                                '<32>{#p/basic}{#s/spiderLaugh}* Mas é claro, minha preciosidade~',
                                "<32>{#p/basic}* Só lembre-se o por que de você estar fazendo isso para mim~"
                            ]);
                        } else {
                            addB([
                                '<32>{#p/mettaton}* PAPYRUS AINDA ESTÁ LÁ FORA ESPERANDO POR MIM.',
                                '<32>{#p/basic}{#s/spiderLaugh}* Ele está?',
                                "<33>{#p/mettaton}* NÓS ESTAMOS TENTANDO UM NOVO SHOW DE TV.\n* UM SHOW SOBRE TORTA DE ARANHA.",
                                '<32>{#p/basic}{#s/spiderLaugh}* Torta de aranha, você diz~',
                                '<32>{#p/basic}* Hmm...',
                                "<32>{#p/basic}* Bem, com tanto a audiência não consiga aguentar!"
                            ]);
                        }
                        if (royals < 2) {
                            addB([
                                '<32>{#p/mettaton}* ...',
                                '<32>{#p/mettaton}* ADEUS.',
                                '<32>{#p/basic}{#s/spiderLaugh}* ... como você pode ver, eu também tenho controle total do entretenimento aqui, também!'
                            ]);
                        } else {
                            addB(['<32>{#p/mettaton}* ...', "<32>{#p/mettaton}* AGORA, ALPHYS!\n* É SUA CHANCE!"]);
                        }
                    }
                    if (royals < 2) {
                        addB([
                            "<32>{#p/basic}* Não é apenas maravilhoso?",
                            "<32>{#p/basic}* Ahuhuhu~\n* Eu queria tanto saber como você se sairia aqui~",
                            '<32>{#p/basic}* Os outros humanos tem se saído muito bem!',
                            '<32>{#p/basic}* Mesmo eles estando traumatizados após saírem dos arquivos...',
                            "<32>{#p/basic}* Eles se tornaram meus mais leais serventes!",
                            '<32>{#p/basic}* Oh, querido~\n* Você deve estar tão sozinho sem direção na vida~',
                            "<32>{#p/basic}* Se acabar tornando-se entediante, você é sempre bem-vindo de volta!",
                            "<32>{#p/basic}* Mas por agora~\n* Me despeço aqui~",
                            '<32>{#p/basic}* Por outro lado~',
                            '<32>{#s/equip}{#p/event}* Click...'
                        ]);
                    } else {
                        addB([
                            '<32>{#p/basic}* Ahuhuhu~\n* O que você está- hngh!',
                            '<25>{#p/alphys}{#f/28}* Hora, hora...\n* Olha o que temos aqui.',
                            '<32>{#p/basic}{#s/spiderLaugh}* Não, me solta...!',
                            "<32>{#p/basic}* Vocês, guardas reais... v-vocês são todos iguais!",
                            "<32>{#p/basic}* Vocês precisam de uma líder de verdade, que os dirá o que é certo e errado!",
                            "<25>{#p/alphys}{#f/29}* Nem precisa dizer.\n* Eles ME escolheram como líder agora.",
                            '<32>{#p/basic}{#s/spiderLaugh}* Mas... como?',
                            '<32>{#p/basic}* Eu te coloquei em custódia, as aranhas te colocaram em custódia~',
                            "<32>{#p/basic}* E você...\n* Era pra você ser fraca!",
                            "<32>{#p/basic}* Você não deveria conseguir comandar a Guarda Real~",
                            "<25>{#p/alphys}{#f/17}* Sabe, eu aprendi muitas coisas desde você tomou o Outpost.",
                            "<25>{#p/alphys}{#f/5}* Tudo que você fez para tornar nossas vidas miseráveis...",
                            '<25>{#p/alphys}{#f/16}* Sobreviver a isso só me fez mais determinada a parar você!',
                            "<25>{#p/alphys}{#f/7}* Senhor, eu sempre quis dizer isso...",
                            "<32>{#p/basic}{#s/spiderLaugh}* Não... não!\n* Você não pode fazer isso comigo!",
                            '<25>{#p/alphys}{#f/27}* Guardas...?',
                            '<32>{#p/basic}{#s/spiderLaugh}* Não~\n* Por favor!',
                            "<25>{#p/alphys}{#f/29}* Vamos ver como ELA se sai na Zona da Aurora.",
                            '<25>{#p/alphys}{#f/27}* ...',
                            "<25>{#p/alphys}{#f/27}* Huh... o que é isso?",
                            '<25>{#p/alphys}{#f/27}* Ela tava... conversando com alguém nessa coisa?',
                            '<25>{#p/alphys}{#f/17}* Estranho.',
                            '<32>{#s/equip}{#p/event}* Click...'
                        ]);
                    }
                } else if (!dpapyrus) {
                    k = 'light_papyrus'; // NO-TRANSLATE

                    m = music.papyrus;
                    
                    addA([
                        '<32>{#s/phone}{#p/event}* Ring, ring...',
                        '<18>{#p/papyrus}{#f/4}ESSA COISA PELO MENOS FUNCIONA?',
                        '<18>{#p/papyrus}{#f/0}OH! OH!\n* EU ENTREI NO EMAIL DE VOZ!',
                        '<18>{#p/papyrus}{#f/6}AGORA SEI PORQUE PARECIA CONFUSO!',
                        '<18>{#p/papyrus}{#f/5}OLÁ HUMANO!\nEU TENHO... MUITO O QUE FALAR.'
                    ]);
                    addB([
                        '<18>{#p/papyrus}{#f/4}ENTÃO... EU MEIO QUE TORNEI O REI.',
                        "<18>{#p/papyrus}{#f/6}ESPERE!!\nNÃO DESLIGUE!!",
                        "<18>{#p/papyrus}{#f/5}NÃO É TÃO LOUCO QUANTO PARECE...",
                        "<18>{#p/papyrus}{#f/0}UH, EU VOU COMEÇAR DO INÍCIO.",
                        '<18>{#p/papyrus}{#f/5}ENTÃO, APÓS VOCÊ IR...',
                        "<18>{#p/papyrus}{#f/5}TODA A LIDERANÇA DO OUTPOST CAIU.",
                        "<18>{#p/papyrus}{#f/6}ALPHYS, QUE SUPOSTAMENTE DEVERIA SUBSTITUIR ASGORE...",
                        "<18>{#p/papyrus}{#f/5}NÃO SENTIU VONTADE ALGUMA DE SE TORNAR RAINHA.",
                        "<18>{#p/papyrus}{#f/5}E DESDE QUE UNDYNE AINDA NÃO REAPARECEU...",
                        '<18>{#p/papyrus}{#f/4}ALPHYS TEVE DE FAZER UMA REUNIÃO PARA ENCONTRAR UM NOVO LÍDER.'
                    ]);
                    if (royals < 2) {
                        addB([
                            '<18>{#p/papyrus}{#f/4}INFELIZMENTE, TODA A GUARDA REAL SE FOI.',
                            '<18>{#p/papyrus}{#f/5}ENTÃO... A REUNIÃO NUNCA ACONTECEU.'
                        ]);
                    } else {
                        addB([
                            '<18>{#p/papyrus}{#f/4}A GUARDA REAL ARGUMENTOU, E ARGUMENTOU MAIS UM POUCO...',
                            "<18>{#p/papyrus}{#f/5}MAS NINGUÉM CONCORDOU EM QUEM SERIA O MELHOR."
                        ]);
                    }
                    addB([
                        '<18>{#p/papyrus}{#f/6}DEPOIS DISSO ALPHYS MEIO QUE... SUMIU.',
                        '<18>{#p/papyrus}{#f/6}DEIXOU A GENTE SEM NINGUÉM PARA COLOCAR NO CONTROLE.',
                        '<18>{#p/papyrus}{#f/5}E POR UM TEMPO...',
                        '<18>{#p/papyrus}{#f/6}AS COISAS FICARAM... SURPREENDENTEMENTE CALMAS!',
                        "<18>{#p/papyrus}{#f/0}MAS EU SABIA QUE NÃO IRIA DURAR MUITO.",
                        '<18>{#p/papyrus}{#f/4}ENTÃO, EVENTUALMENTE...',
                        '<18>{#p/papyrus}{#f/9}EU TOMEI CONTROLE COM MINHAS PRÓPRIAS MÃOS!',
                        '<18>{#p/papyrus}{#f/5}VOCÊ PODE ADIVINHAR COMO ACABEI ME TORNANDO O REI.',
                        '<18>{#p/papyrus}{#f/0}MAS EI!\nAS COISAS TEM IDO BEM!',
                        "<18>{#p/papyrus}{#f/0}EU ESTABELECI ALGUMAS POLÍTICAS PARA AJUDAR A FAZER AMIGOS.",
                        '<18>{#p/papyrus}{#f/4}NÃO APENAS -MEUS- AMIGOS...',
                        "<18>{#p/papyrus}{#f/0}MAS AMIGOS DE TODO MUNDO, TAMBÉM!",
                        '<18>{#p/papyrus}{#f/9}COMO RESULTADO, A MORAL DO OUTPOST SUBIU MUITO!',
                        '<19>{#p/papyrus}{#f/4}E UMA VEZ QUE NOSSO PODER DA AMIZADE CHEGAR AO MÁXIMO...',
                        "<18>{#p/papyrus}{#f/9}EU SEREI CAPAZ DE LIBERTAR OS HUMANOS!",
                        '<18>{#p/papyrus}{#f/0}COM ESPERANÇA DE APENAS UM PEQUENO DISTURBIO. ',
                        "<25>{#p/sans}{#f/0}* heh.\n* isso seria legal.",
                        '<25>{#p/sans}{#f/3}* Pessoas tem se segurado em suas raivas por muito tempo.',
                        "<18>{#p/papyrus}{#f/0}OH, OLÁ SANS!\nESTOU FELIZ EM VÊ-LO POR AQUI.",
                        '<25>{#p/sans}{#f/0}* na verdade, eu acabei de sair do trabalho.',
                        "<25>{#p/sans}{#f/3}* hoje é feriado.",
                        '<18>{#p/papyrus}{#f/4}UM FERIADO, EH?',
                        '<18>{#p/papyrus}{#f/5}(CHORINHO...)',
                        "<18>{#p/papyrus}{#f/5}DESDE QUE VOCÊ COMEÇOU A TRABALHAR NO GRILLBY",
                        "<18>{#p/papyrus}{#f/4}ELES TEM TE DADO MAIS DESSAS COISAS.",
                        "<25>{#p/sans}{#f/3}* nah, fica tranquilo.\n* você vai gostar disso...",
                        '<25>{#p/sans}{#f/2}* é o novo \"dia de convivência\" semestral.',
                        '<18>{#p/papyrus}{#f/1}OH!!! CERTO!!!\nEU ESQUECI TOTALMENTE QUE FIZ ISSO!!!',
                        '<18>{#p/papyrus}{#f/0}O DIA EM QUE TODOS OS NOSSOS INIMIGOS DEVEM SE TORNAR AMIGOS.',
                        '<18>{#p/papyrus}{#f/4}ENTÃO, VOCÊ FEZ ALGUM \"ANIMIGO\" HOJE???',
                        '<25>{#p/sans}{#f/0}* hmm...',
                        "<25>{#p/sans}{#f/3}* é preciso ter inimigos pra fazer isso.",
                        '<18>{#p/papyrus}{#f/5}BEM... UH...',
                        '<18>{#p/papyrus}{#f/6}VOCÊ PODE APENAS MELHORAR UMA AMIZADE EXISTENTE, ENTÃO!',
                        '<25>{#p/sans}{#f/2}* olha, todas as minhas amizades já são ótimas o suficiente.',
                        "<25>{#p/sans}{#f/3}* ... acho que esse não é um feriado pra mim.",
                        "<18>{#p/papyrus}{#f/0}OH.\nTÁ TUDO BEM.",
                        '<18>{#p/papyrus}{#f/9}\"DIA DOS NOVOS COLEGAS\" ESTÁ CHEGANDO!',
                        '<25>{#p/sans}{#f/0}* deixa eu adivinhar... o dia em que você faz AINDA mais amigos?',
                        '<18>{#p/papyrus}{#f/0}NYEH HEH HEH!\nÉ CLARO!',
                        '<25>{#p/sans}{#f/0}* vou estar a espera desse dia, então.',
                        '<25>{#p/sans}{#f/3}* ...',
                        "<25>{#p/sans}{#f/3}* sabe, cara... quando você saiu do outpost...",
                        "<25>{#p/sans}{#f/0}* as coisas não foram tão bem como estão agora.",
                        '<25>{#p/sans}{#f/3}* pessoas culpavam umas as outras pelo que aconteceu aqui...',
                        '<25>{#p/sans}{#f/3}* pelo que você fez com elas...',
                        '<25>{#p/sans}{#f/0}* mas, com um tempo, meu irmão fez todos virarem as páginas.'
                    ]);
                    if (royals < 2) {
                        addB([
                            '<25>{#p/sans}{#f/3}* poxa, mesmo com a queda da guarda real...',
                            '<25>{#p/sans}{#f/0}* ele ainda fez o melhor que pôde.',
                            "<18>{#p/papyrus}{#f/0}ISSO!! EU ESTOU MUITO FELIZ COM O QUE FIZ.",
                            '<18>{#p/papyrus}{#f/9}O OUTPOST NUNCA ESTEVE MELHOR!'
                        ]);
                    } else {
                        addB([
                            '<25>{#p/sans}{#f/2}* pois é, até a guarda real melhorou.',
                            '<18>{#p/papyrus}{#f/0}SIM!! EM VEZ DE SE PROTEGER CONTRA OS HUMANOS...',
                            '<18>{#p/papyrus}{#f/9}ELES PROTEGEM NÓS MONSTROS DO RANCOR E DO VITRÍOLO!'
                        ]);
                    }
                    addB([
                        '<18>{#p/papyrus}{#f/5}...',
                        '<18>{#p/papyrus}{#f/5}SEJA LÁ O QUE VOCÊ FEZ, HUMANO...',
                        '<18>{#p/papyrus}{#f/0}SÓ SAIBA QUE AS COISAS ACABARAM BEM.',
                        '<18>{#p/papyrus}{#f/6}E QUE EU TE PERDÔO!!!'
                    ]);
                    if (
                        world.edgy ||
                        (world.population_area('s') <= 0 && !world.bullied_area('s')) // NO-TRANSLATE

                    ) {
                        addB(['<18>{#p/papyrus}{#f/5}PORQUE, MESMO QUE TENHAMOS COMEÇADOS COM UM INÍCIO BRUTAL...']);
                    } else if (SAVE.data.n.plot_date < 1.1) {
                        if (SAVE.data.b.flirt_papyrus) {
                            addB(['<18>{#p/papyrus}{#f/5}MESMO QUE NÓS NUNCA TENHAMOS SAÍDO...']);
                        } else {
                            addB(['<18>{#p/papyrus}{#f/5}MESMO QUE NÓS NUNCA TENHAMOS DADO UM ROLÊ...']);
                        }
                    } else {
                        addB(["<18>{#p/papyrus}{#f/5}MESMO QUE NÓS NUNCA TENHAMOS SAÍDO COM A UNDYNE..."]);
                    }
                    addB([
                        "<18>{#p/papyrus}{#f/0}EU AINDA ESTAREI FELIZ EM TE CHAMAR DE AMIGO.",
                        "<25>{#p/sans}{#f/2}* aw, isso é fofo.",
                        "<25>{#p/sans}{#f/3}* é triste não podermos ouvir a reação dele.",
                        "<18>{#p/papyrus}{#f/7}SIM, BEM, AINDA VALE A PENA DIZER!!",
                        '<18>{#p/papyrus}{#f/0}O IMPORTANTE É QUE ELE OUVIU!',
                        '<25>{#p/sans}{#f/0}* heh.\n* se cuida aí fora.',
                        "<25>{#p/sans}{#f/2}* porque pelo menos uma pessoa está torcendo por ti.",
                        "<18>{#p/papyrus}{#f/0}... ESSE SOU EU!!!",
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
                        '<25>{#p/sans}{#f/0}* depois que você fugiu, o rei foi evaporado pelo ar.',
                        '<25>{#p/sans}{#f/3}* por?\n* ninguém sabe.',
                        '<25>{#p/sans}{#f/2}* ... talvez ele só tenha ido tirar férias.',
                        '<25>{#p/sans}{#f/0}* de toda forma, era para a alphys substituir ele.',
                        "<25>{#p/sans}{#f/3}* mas ela não se considerou preparada para tal trabalho."
                    ]);
                    if (royals < 2) {
                        addB([
                            '<25>{#p/sans}{#f/0}* ela pensou em colocar um guarda real em seu lugar...',
                            '<25>{#p/sans}{#f/0}* mas esses caras sumiram também.',
                            '<25>{#p/sans}{#f/3}* por?\n* difícil dizer.',
                            '<25>{#p/sans}{#f/2}* ... talvez eles só cansaram de seus trabalhos.'
                        ]);
                    } else {
                        addB([
                            '<25>{#p/sans}{#f/0}* ela pensou em colocar um guarda real em seu lugar...',
                            "<25>{#p/sans}{#f/0}* mas com a partida da capitã, eles não conseguiam se decidir.",
                            '<25>{#p/sans}{#f/3}* por?\n* difícil dizer.',
                            "<25>{#p/sans}{#f/2}* ... talvez undyne simplesmente não pudesse mais ser incomodada."
                        ]);
                    }
                    addB([
                        '<25>{#p/sans}{#f/0}* depois disso, alphys fugiu da cidadela e nos deixou sem liderança.',
                        "<25>{#p/sans}{#f/3}* você pode pensar que a verdadeira rainha voltaria, ou...",
                        '<25>{#p/sans}{#f/3}* que talvez alguém mais capacitado tomaria o poder.',
                        '<25>{#p/sans}{#f/0}* Mas, nada dessas coisas aconteceu.',
                        '<25>{#p/sans}{#f/3}* porquê?\n* me conta você.',
                        '<25>{#p/sans}{#f/2}* ... talvez toda a liderança lá fora tenha desistido.',
                        "<25>{#p/sans}{#f/0}* por fim, eu percebi que deveria fazer alguma coisa.",
                        '<25>{#p/sans}{#f/0}* então eu tomei a liderança por asgore e alphys.',
                        "<25>{#p/sans}{#f/3}* não tem sido fácil com todos os problemas de liderança...",
                        "<25>{#p/sans}{#f/3}* sem mencionar manter o segredo da existência dos humanos.",
                        '<25>{#p/sans}{#f/0}* mas depois que implementei minha política pró-preguiçosos...',
                        '<25>{#p/sans}{#f/2}* as pessoas parecem estar mais relaxadas.'
                    ]);
                    if (30 <= SAVE.data.n.bully) {
                        addB(['<25>{#p/sans}{#f/3}* muito longe de como eles estavam com medo de serem espancados antes.']);
                    } else {
                        addB(['<26>{#p/sans}{#f/3}* bem longe de como eles estavam sobre o sumiço de asgore e undyne.']);
                    }
                    addB([
                        '<25>{#p/sans}{#f/0}* elas por elas, as coisas tem ido muito bem.',
                        '<25>{#p/sans}{#f/0}* os humanos estão seguros e salvos, os cidadãos ainda tem esperança...',
                        "<25>{#p/sans}{#f/3}* então qual seria o caso?",
                        '<25>{#p/sans}{#f/0}* por que tudo parece ter perdido... esperança?',
                        "<25>{#p/sans}{#f/3}* bem, pra ser honesto, acho que vai de cada um.",
                        '<25>{#p/sans}{#f/3}* ...',
                        "<25>{*}{#x0}{#p/darksans}{#f/1}{#i/5}* ... talvez você só seja um maldito assassino de irmãos."
                    ]);
                }
            } else {
                k = 'light_generic'; // NO-TRANSLATE

                
                addA([
                    '<32>{#s/phone}{#p/event}* Ring, ring...',
                    '<25>{#p/alphys}{#f/8}* Oi...',
                    '<25>{#p/alphys}{#f/6}* Tem alguém aí?',
                    "<25>{#p/alphys}{#f/10}* Espero que não seja problema...",
                    '<25>{#p/alphys}{#f/5}* Eu só queria que você soubesse como as coisas tem ido por aqui.'
                ]);
                addB([
                    '<25>{#p/alphys}{#f/20}* Então... após você fugir, o rei meio que... d-desapareceu.',
                    "<25>{#p/alphys}{#f/14}* Quando eu contei a notícia... isso feriu a moral das pessoas.",
                    '<25>{#p/alphys}{#f/10}* Tecnicamente, como cientista real, eu deveria tomar o lugar dele, mas...',
                    "<25>{#p/alphys}{#f/11}* Eu realmente não senti que seria a melhor opção para o trabalho.",
                    '<26>{#p/alphys}{#f/5}* Então eu acabei conversando com alguns dos Guardas Reais e...',
                    '<25>{#p/alphys}{#f/6}* Nós concordamos que Terrestria seria a melhor nomeação como rainha.',
                    '<25>{#p/alphys}{#f/15}* Sua primeira ação foi meio controversa... ',
                    '<25>{#p/alphys}{#f/17}* Cortando a Guarda Real ao meio e tirando parte de suas políticas.'
                ]);
                if (SAVE.data.b.undyne_respecc) {
                    addB([
                        "<25>{#p/alphys}{#f/26}* Undyne não ficou nada feliz no começo, mas...",
                        '<25>{#p/alphys}{#f/8}* Ela acabou entendendo no fim.',
                        '<25>{#p/alphys}{#f/27}* Aparentemente ela pensa que nem todos os humanos... sejam maus?',
                        '<25>{#p/alphys}{#f/27}* ...',
                        "<25>{#p/undyne}{#f/17}* Tá de brincadeira?\n* É CLARO que eles não são todos maus!",
                        '<25>{#p/alphys}{#f/10}* U-Undyne!?',
                        '<25>{#p/undyne}{#f/1}* Aquele último humano provou lutar COM honra.',
                        '<25>{#p/undyne}{#f/1}* Que ele PODE mostrar respeito aos oponentes em batalha.',
                        "<25>{#p/undyne}{#f/16}* ... é uma boa coisa também, porque...",
                        '<25>{#p/undyne}{#f/14}* Eu dúvido que a Guarda Real vai expandir tão cedo.',
                        '<25>{#p/undyne}{#f/1}* Especialmente após a verdadeira rainha retornar e...',
                        '<25>{#p/undyne}{#f/1}* ... dar a nova seu total apoio.'
                    ]);
                } else if (2.1 <= SAVE.data.n.plot_date) {
                    addB([
                        "<25>{#p/alphys}{#f/26}* Undyne não ficou nada feliz no começo, mas...",
                        '<25>{#p/alphys}{#f/8}* Ela acabou entendendo no fim.',
                        '<25>{#p/alphys}{#f/27}* Aparentemente ela pensa que nem todos os humanos... sejam maus?',
                        '<25>{#p/alphys}{#f/27}* ...',
                        "<25>{#p/undyne}{#f/17}* Tá de brincadeira?\n* É CLARO que eles não são todos maus!",
                        '<25>{#p/alphys}{#f/10}* U-Undyne!?',
                        '<25>{#p/undyne}{#f/14}* Aquele último humano provou que de fato sua bondade PODE ser... bem, boa.',
                        '<25>{#p/undyne}{#f/1}* Que ele pode demonstrar piedade aos seus oponentes em batalha.',
                        "<25>{#p/undyne}{#f/16}* ... é uma boa coisa também, porque...",
                        '<25>{#p/undyne}{#f/14}* Eu dúvido que a Guarda Real vai expandir tão cedo.',
                        '<25>{#p/undyne}{#f/1}* Especialmente após a verdadeira rainha retornar e...',
                        '<25>{#p/undyne}{#f/1}* ... dar a nova seu total apoio.'
                    ]);
                } else {
                    addB([
                        "<25>{#p/alphys}{#f/19}* Undyne... não ficou contente com isso de forma alguma.",
                        '<25>{#p/alphys}{#f/19}* Ela ainda te culpa pelo que aconteceu com o rei, então...',
                        "<25>{#p/alphys}{#f/20}* É... compreensível o motivo da raiva.",
                        '<25>{#p/alphys}{#f/20}* ...',
                        "<25>{#p/undyne}{#f/16}* É, uma política estúpida se você me perguntar.",
                        '<25>{#p/alphys}{#f/10}* U-Undyne!?',
                        "<25>{#p/undyne}{#f/17}* Não importa o quão legais sejam alguns humanos, NÃO PODEMOS ABAIXAR A GUARDA!",
                        '<25>{#p/undyne}{#f/9}* ... mas poucos concordariam comigo.',
                        "<25>{#p/undyne}{#f/16}* Com a volta da verdadeira rainha e seu apoio a nova...",
                        '<25>{#p/undyne}{#f/9}* Eu duvido que a Guarda Real voltará a ser forte como um dia foi.'
                    ]);
                }
                addB([
                    '<25>{#p/alphys}{#f/5}* ...\n* Sobre a verdadeira rainha.',
                    '<26>{#p/alphys}{#f/5}* Pelo tempo que ela voltou, as coisas estão basicamente normais...',
                    '<25>{#p/alphys}{#f/21}* Até ela decidir revelar a verdade sobre os humanos.',
                    '<25>{#p/alphys}{#f/21}* Tipo... LOGO após ela descobrir por conta.'
                ]);
                if (30 <= SAVE.data.n.bully) {
                    addB([
                        "<25>{#p/alphys}{#f/20}* ... eheh...\n* As pessoas não reagiram bem de começo.",
                        '<25>{#p/alphys}{#f/13}* Elas estavam mais assustadas que tudo...',
                        '<25>{#p/alphys}{#f/26}* Um humano espancando todo mundo não ajudou no caso.',
                        '<25>{#p/alphys}{#f/20}* Felizmente, com o tempo, Terrestria foi capaz de acalmar todo mundo.',
                        '<25>{#p/alphys}{#f/20}* ... os lembrando que ninguém morreu.',
                        "<25>{#p/alphys}{#f/18}* Estou feliz que tenha funcionado.\n* Eu teria causado um tumulto dizendo isso.",
                        '<25>{#p/alphys}{#f/8}* Mas... é, boa parte das pessoas estão positivas em relação a humanidade agora.'
                    ]);
                } else {
                    addB([
                        "<25>{#p/alphys}{#f/15}* ... felizmente, isso NÃO causou uma revolta em massa...",
                        '<25>{#p/alphys}{#f/17}* Mas, ser super conhecida deve tê-la ajudado a se sair bem.',
                        '<25>{#p/alphys}{#f/8}* De fato, as pessoas estão mais positivas em relação a humanidade agora.'
                    ]);
                }
                addB(["<25>{#p/alphys}{#f/8}* Então isso já é algo.", '<26>{#p/undyne}{#f/16}* Heh, nem me fala...']);
                if (SAVE.data.b.undyne_respecc || 2.1 <= SAVE.data.n.plot_date) {
                    addB([
                        "<25>{#p/undyne}{#f/10}* É uma realidade estranha na qual vivemos...",
                        '<25>{#p/undyne}{#f/1}* Aliás, você mencionou todas as novas escolas sendo construídas?',
                        "<25>{#p/alphys}{#f/10}* Uh... claro.\n* Eu totalmente... esqueci."
                    ]);
                } else {
                    addB([
                        "<25>{#p/undyne}{#f/10}* Eu só queria que isso não significasse reduzir a Guarda Real.",
                        '<25>{#p/undyne}{#f/1}* Mas... ei, pelo menos as novas escolas são bem legais.',
                        "<25>{#p/alphys}{#f/10}* Ah é!\n* Eu esqueci que você é uma professora agora!"
                    ]);
                }
                addB([
                    "<25>{#p/alphys}{#f/6}* Eheh...\n* O sistema de educação está indo bem, também.",
                    '<25>{#p/alphys}{#f/1}* Sofisticado dizer que o preço para construir institutos nunca esteve tão baixo!',
                    "<25>{#p/alphys}{#f/8}* A tantos estudantes aprendendo todo tipo de coisa.",
                    '<18>{#p/papyrus}{#f/0}... EI PESSOAL!\nEU ACABEI DE VOLTAR DA ESCOLA DE MATEMÁTICA!!',
                    '<18>{#p/papyrus}{#f/4}QUEM IMAGINARIA QUE DESCOBRIR SOBRE O ESPAÇO TEMPO SERIA TÃO COMPLICADO...',
                    '<25>{#p/alphys}{#f/10}* ... sim, Papyrus teve uma aula sobre teoria do campo de dobra.',
                    '<18>{#p/papyrus}{#f/6}O QUÊ?? VOCÊ ESTÁ SE REFERINDO A MIM NA TERCEIRA PESSOA??',
                    '<25>{#p/alphys}{#f/17}* ... e uma aula de redação, pelo que parece.',
                    "<25>{#p/undyne}{#f/12}* Isso ainda existe??",
                    '<18>{#p/papyrus}{#f/4}... ESPERA...',
                    '<18>{#p/papyrus}{#f/7}COM QUEM VOCÊ ESTÁ FALANDO PELO TELEFONE!?',
                    "<25>{#p/undyne}{#f/1}* É o humano.",
                    '<18>{#p/papyrus}{#f/0}OH!! OH!!\nDEIXA EU FALAR COM ELE!!',
                    '<25>{#p/undyne}{#f/14}* Pelo que vejo.\n* Eu tenho que ir dar aula de novo.',
                    '<25>{#p/undyne}{#f/17}* Eles têm tudo dificuldade com o exercício de \"autodefesa mágica.\"',
                    '<18>{#p/papyrus}{#f/0}... OLÁ HUMANO!!\nCOMO -VOCÊ- ESTEVE!?',
                    '<18>{#p/papyrus}{#f/0}...',
                    "<18>{#p/papyrus}{#f/5}EU ACHO QUE VOCÊ NÃO PODE RESPONDER.",
                    "<18>{#p/papyrus}{#f/6}MAS ESPERO QUE ESTEJA BEM!!"
                ]);
                if (SAVE.data.n.plot_date < 1.1) {
                    addB(["<18>{#p/papyrus}{#f/0}EU ESTIVE PENSANDO EM VOCÊ DESDE NOSSO ÉPICO SHOWDOWN."]);
                } else if (SAVE.data.b.flirt_papyrus) {
                    addB(["<18>{#p/papyrus}{#f/0}EU ESTIVE PENSANDO EM VOCÊ DESDE O NOSSO ENCONTRO."]);
                } else {
                    addB(["<18>{#p/papyrus}{#f/0}EU ESTIVE PENSANDO EM VOCÊ DESDE O NOSSO ROLÊ."]);
                }
                addB([
                    '<18>{#p/papyrus}{#f/5}EU CONTEI A TODOS SOBRE VOCÊ NA MINHA SALA, E...',
                    "<18>{#p/papyrus}{#f/5}... TODOS ELES DESEJAM QUE VOCÊ VOLTE ALGUM DIA."
                ]);
                if (SAVE.data.b.f_state_kidd_betray) {
                    addB([
                        '<18>{#p/papyrus}{#f/4}... QUASE TODOS.',
                        '<18>{#p/papyrus}{#f/5}UM DOS COLEGAS DE CLASSE QUE SENTA COMIGO DISSE QUE VOCÊ...',
                        '<18>{#p/papyrus}{#f/5}... UH, TRAIU ELE OU COISA TIPO.',
                        '<18>{#p/papyrus}{#f/6}MAS ESCUTA!\nSE ALGUM DIA VOCÊ VOLTAR...',
                        "<18>{#p/papyrus}{#f/0}EU IREI AJUDAR VOCÊS DOIS A CONCILIAR NOVAMENTE!!"
                    ]);
                } else {
                    addB([
                        '<18>{#p/papyrus}{#f/0}UM DELES ATÉ DESEJOU IR COM VOCÊ!!',
                        "<18>{#p/papyrus}{#f/5}É UM COLEGA DE CLASSE QUE SENTA PERTO DE MIM, NA VERDADE.",
                        '<18>{#p/papyrus}{#f/6}ELE DISSE QUE TE DEVE A VIDA!!',
                        '<18>{#p/papyrus}{#f/4}...UM HERÓI, NÉ?\nSE VOCÊ ALGUM DIA VOLTAR...',
                        "<18>{#p/papyrus}{#f/0}EU TEREI CERTEZA DE CONVIDÁ-LO PARA SUA FESTA DE BOAS VINDAS."
                    ]);
                }
                addB([
                    '<18>{#p/papyrus}{#f/9}VOCÊ TEM MINHA PROMESSA PESSOAL DE PAPYRUS! (TM)',
                    "<25>{#p/alphys}{#f/27}* ... ei, essa não é uma das falas do Mettaton?",
                    '<18>{#p/papyrus}{#f/4}NO PASSADO, TALVEZ... MAS AGORA.',
                    "<18>{#p/papyrus}{#f/5}APARENTEMENTE, ELE ESTÁ ABANDONANDO COMPLETAMENTE SEU FORMATO ANTIGO...",
                    '<18>{#p/papyrus}{#f/4}PARA COMEÇAR O \"UNIVERSO CINEMÁTICO DA MTT.\"',
                    '<25>{#p/alphys}{#f/17}* Eu ouvi um rumor sobre isso.'
                ]);
                if (iFancyYourVilliany()) {
                    addB([
                        '<25>{#p/alphys}{#f/21}* Eles dizem que ele está sobrando a aposta na coisa de \"vilão\".',
                        "<18>{#p/papyrus}{#f/4}... COMO SE ISSO NÃO FOSSE UM TIRO NAS COSTAS.",
                        '<25>{#p/alphys}{#f/22}* EU SEI!?!?'
                    ]);
                    if (30 <= SAVE.data.n.bully) {
                        addB([
                            "<25>{#p/alphys}{#f/10}* Pessoas não vão querer lembrar do que o humano foi.",
                            '<25>{#p/alphys}{#f/26}* ... sem ofensa.'
                        ]);
                    } else {
                        addB([
                            "<25>{#p/alphys}{#f/10}* Pessoas nem odeiam humanos mais, então...",
                            "<25>{#p/alphys}{#f/3}* Não vejo muito ponto nisso."
                        ]);
                    }
                } else {
                    addB([
                        '<25>{#p/alphys}{#f/21}* Eles dizem que ele está sobrando a aposta no coisa de \"robô assassino.\"',
                        "<18>{#p/papyrus}{#f/4}COMO SE ISSO NÃO FOSSE UM TIRO NAS COSTAS.",
                        '<25>{#p/alphys}{#f/22}* EU SEI!?!?'
                    ]);
                    if (30 <= SAVE.data.n.bully) {
                        addB([
                            "<25>{#p/alphys}{#f/10}* Pessoas não querem uma lembrança da violência humana.",
                            '<25>{#p/alphys}{#f/26}* ... sem ofensa.'
                        ]);
                    } else {
                        addB([
                            '<25>{#p/alphys}{#f/10}* Pessoas só querem ser positivas hoje em dia, então...',
                            "<25>{#p/alphys}{#f/3}* Não vejo muito ponto nisso."
                        ]);
                    }
                }
                addB([
                    "<18>{#p/papyrus}{#f/5}É... TODO MUNDO SÓ QUER TER ESPERANÇA.",
                    '<18>{#p/papyrus}{#f/6}... INCLUINDO MEU IRMÃO!',
                    '<18>{#p/papyrus}{#f/0}APÓS A REDUÇÃO DA GUARDA REAL...',
                    '<18>{#p/papyrus}{#f/0}ELE SAIU PARA COMEÇAR NEGÓCIOS COM A BRATTY E CATTY.',
                    '<18>{#p/papyrus}{#f/4}UM NEGÓCIO SOBRE LIXO DE SEGUNDA MÃO.',
                    "<18>{#p/papyrus}{#f/5}EU NÃO POSSO DIZER QUE APROVO, MAS PELO MENOS ELE ESTÁ FELIZ.",
                    "<25>{#p/sans}{#f/0}* claro que estou feliz.\n* vender lixo é basicamente meu segundo mandamento.",
                    '<18>{#p/papyrus}{#f/7}SANS!! PARE DE APARECER ASSIM DO NADA!!',
                    '<25>{#p/sans}{#f/2}* heh.\n* então, como você tá, carinha?',
                    "<25>{#p/sans}{#f/0}* Eu espero que meus esforços para te avisar e proteger não foram em vão.",
                    '<18>{#p/papyrus}{#f/9}EU SABIA!\nVOCÊ ERA UM RATO INFILTRADO O TEMPO TODO!',
                    '<25>{#p/sans}{#f/0}* sim.\n* eu realmente me infiltrei na guarda real.',
                    "<25>{#p/sans}{#f/3}* mas eu gosto de pensar que fiz uma influência positiva.",
                    '<25>{#p/sans}{#f/2}* depois de tudo, foi minha ideia colocar a terrestria no poder.',
                    '<18>{#p/papyrus}{#f/1}O QUE!?\nSUA IDEIA!?',
                    '<18>{#p/papyrus}{#f/5}UAU...',
                    "<25>{#p/sans}{#f/3}* ... mas isso está tudo no passado agora.",
                    "<25>{#p/sans}{#f/0}* pelo forma que eu vejo, estou feliz que as coisas não acabaram pior.",
                    "<25>{#p/alphys}{#f/17}* Eu estou um pouco surpresa que você não voltou a trabalhar no laboratório.",
                    "<25>{#p/alphys}{#f/5}* Sabe, como você disse que faria ao sair da guarda real.",
                    '<25>{#p/sans}{#f/3}* bem, pra ser sincero, eu preciso de um descanso após toda aquela parada.',
                    '<25>{#p/sans}{#f/2}* mas ei, pelo menos o papyrus tá fazendo um trabalho excelente, certo?',
                    '<25>{#p/alphys}{#f/6}* Eheh.\n* É, ele está.',
                    '<18>{#p/papyrus}{#f/0}EU TENTO MEU MELHOR!!',
                    "<25>{#p/alphys}{#f/20}* ... mas, tem essa coisa na minha mente.",
                    '<25>{#p/sans}{#f/0}* o que é?',
                    '<25>{#p/alphys}{#f/27}* bem, de acordo com os telescópios...',
                    '<25>{#p/alphys}{#f/27}* Algo estranho aconteceu com as estrelas a pouco tempo.',
                    '<18>{#p/papyrus}{#f/6}ESTRANHA!? \nCOMO UMA ESTRELA PODE SER ESTRANHA!?',
                    "<25>{#p/alphys}{#f/15}* Bem, okay, não foi exatamente a ESTRELA que estava estranha.",
                    '<26>{#p/alphys}{#f/23}* E sim a forma como se moveu.',
                    "<25>{#p/alphys}{#f/20}* Ou... não moveu?",
                    '<25>{#p/alphys}{#f/20}* Era mais como... uma espécie de salto.\n* Uma mudança repentina.',
                    '<25>{#p/alphys}{#f/26}* Como se o tempo fora do campo de força apenas se... avançou alguns anos.',
                    "<25>{#p/sans}{#f/0}* Você tem certeza que essas análises não tem nenhuma contra indicação?",
                    '<25>{#p/alphys}{#f/20}* Bem, eu olhei, duplo olhei, triplo olhei...',
                    '<18>{#p/papyrus}{#f/6}MAS VOCÊ QUADRUPLO OLHOU!?',
                    '<25>{#p/alphys}{#f/21}* Claro que sim.',
                    "<25>{#p/alphys}{#f/5}* Mas não mudou o resultado.",
                    '<25>{#p/sans}{#f/3}* huh.\n* que estranho.',
                    "<25>{#p/sans}{#f/0}* eu diria que vale uma olhada mais detalhada.",
                    '<25>{#p/alphys}{#f/20}* Concordo.',
                    "<25>{#p/sans}{#f/3}* whoops.\n* a gravação está quase no limite.\n",
                    '<25>{#p/alphys}{#f/17}* ... oh.\n* bom acho melhor irmos então.',
                    "<25>{#p/alphys}{#f/6}* bem, eu... eu espero que você esteja bem aí fora.",
                    '<25>{#p/alphys}{#f/5}* Se nós conseguimos encontrar a felicidade aqui então... você também consegue.',
                    "<25>{#p/alphys}{#f/10}* Até porque, você tem o universo inteiro pra explorar!",
                    '<18>{#p/papyrus}{#f/0}BELAS PALAVRAS, ALPHYS.\nBELAS PALAVRAS.',
                    '<25>{#p/sans}{#f/2}* heh.\n* se cuida, beleza?',
                    '<18>{#p/papyrus}{#f/9}É!!\nATÉ A PRÓXIMA!!',
                    '<25>{#p/alphys}{#f/8}* ... até.',
                    '<32>{#s/equip}{#p/event}* Click...'
                ]);
            }
            return { a, b, d, k, m };
        },
        neutral2: [
            '<32>{#s/phone}{#p/event}* Ring, ring...',
            '<25>{#p/asgore}{#f/1}* ...',
            '<25>{#p/asgore}{#f/1}* Olá, pequeno.',
            '<25>{#p/asgore}{#f/1}* Eu não sei se essa mensagem te alcançará, ou se você está vivo.',
            '<25>{#p/asgore}{#f/2}* Eu não posso confirmar se o protocolo de autodestruição foi desligado.',
            '<25>{#p/asgore}{#f/4}* Entretanto, se foi...',
            '<25>{#p/asgore}{#f/25}* Então eu estou feliz por ter salvo sua vida.',
            "<25>{#p/asgore}{#f/7}* Eu não acredito que você tenha total culpa pelas ações de Asriel.",
            '<25>{#p/asgore}{#f/5}* Papyrus, Muffet e muitas outros os quais você demonstrou piedade...',
            '<25>{#p/asgore}{#f/6}* Podem todos ser testemunhas da sua tentativa de mudança.',
            '<25>{#p/asgore}{#f/21}* Tem até mesmo alguém comigo que amaria dizer algumas palavras.',
            '<25>{#p/kidd}{#f/7}* Cara, é você!?',
            '<25>{#p/kidd}{#f/2}* Eu, uh, meio que esqueci seu nome...',
            '<25>{#p/asgore}{#f/6}* Vamos, conte-me o que você me disse.',
            '<25>{#p/kidd}{#f/6}* Certo, certo.',
            "<25>{#p/kidd}{#f/4}* Então, você sabe...",
            '<25>{#p/kidd}{#f/4}* Mesmo após tudo que o Asriel fez...',
            '<25>{#p/kidd}{#f/3}* Eu te achei uma criança muita legal.',
            "<25>{#p/kidd}{#f/13}* Se em algum momento eu te ver novamente, nós TOTALMENTE deveríamos dar uma volta!",
            "<25>{#p/kidd}{#f/6}* E, talvez...\n* Enquanto estamos nisso...",
            '<25>{#p/kidd}{#f/5}* Nós podemos ajudar um ao outro a deixar para trás o que aconteceu.',
            '<25>{#p/asgore}{#f/6}* Hmm... isso parece bem legal!',
            '<25>{#p/asgore}{#f/5}* Vocês passaram por muita coisa juntos, então faz sentido fazer isso.',
            "<25>{#p/kidd}{#f/4}* É bem paia que ele teve que ir embora, huh?",
            '<25>{#p/asgore}{#f/1}* ... acho que sim.',
            "<25>{#p/kidd}{#f/3}* bem, ele é legal, então tenha certeza que ficará bem.",
            "<25>{#p/kidd}{#f/1}* você vai ficar bem, não vai!?",
            '<25>{#p/asgore}{#f/20}* ...',
            '<18>{#p/papyrus}{#f/7}O QUE!?\nELE FOI CHAMADO PARA CONVERSAR ANTES DE MIM!?',
            '<18>{#p/papyrus}{#f/4}... ISSO É TOTALMENTE INJUSTO.',
            '<25>{#p/kidd}{#f/14}* YOOOO PAPYRUS!!!',
            '<25>{#p/kidd}{#f/1}* Você quer o telefone, homem esqueleto?',
            "<25>{#p/kidd}{#f/2}* Asgore vai me levar de volta para sua casa agora.",
            "<18>{#p/papyrus}{#f/0}É CLARO QUE QUERO!\nEU TENHO MUITAS COISAS IMPORTANTES PARA DIZER.",
            "<25>{#p/kidd}{#f/1}* Legal, é todo seu!\n* Te vejo depois, cara!",
            '<25>{#p/asgore}{#f/6}* ... Eu retorno após deixar a Criança Monstro em casa.',
            '<18>{#p/papyrus}{#f/0}POIS BEM!\nVAMOS CONVERSAR ENQUANTO ISSO, HUMANO!',
            '<18>{#p/papyrus}{#f/5}OU, UH, EU FALO.\nVOCÊ SÓ MEIO QUE... ESCUTA.',
            "<18>{#p/papyrus}{#f/6}MAS ISSO NÃO É O QUE IMPORTA!",
            '<18>{#p/papyrus}{#f/0}EU SÓ QUERIA DIZER, QUE VOCÊ FEZ UM ÓTIMO TRABALHO.',
            '<18>{#p/papyrus}{#f/5}NÃO MACHUCANDO TODAS AQUELAS PESSOAS.',
            '<18>{#p/papyrus}{#f/4}SEM DÚVIDAS \"ASRIEL\" DIFICULTOU AS COISAS...',
            '<18>{#p/papyrus}{#f/5}E... EU SEI QUE VOCÊ FEZ COISAS DAS QUAIS SE ARREPENDE...',
            "<18>{#p/papyrus}{#f/0}MAS EU DIGO QUE VOCÊ NÃO DEVERIA SE SENTIR TÃO MAU!",
            '<18>{#p/papyrus}{#f/9}VOCÊ FEZ O MELHOR QUE PÔDE!',
            "<18>{#p/papyrus}{#f/6}ISSO DEVE CONTAR COMO ALGUMA COISA, CERTO?",
            '<18>{#p/papyrus}{#f/6}...',
            "<18>{#p/papyrus}{#f/5}VERDADE SEJA DITA... NÃO TEM SIDO FÁCIL PARA NÓS.",
            "<18>{#p/papyrus}{#f/5}APÓS A DESTRUIÇÃO DO CORE SER REVERTIDA...",
            '<18>{#p/papyrus}{#f/5}EU CONVERSEI COM AQUELES QUE AJUDARAM A REVERTER.',
            '<18>{#p/papyrus}{#f/6}...\nMUFFET BASICAMENTE SÓ ME IGNOROU.',
            '<18>{#p/papyrus}{#f/6}OS TRABALHADORES ESTAVAM ACABADOS POR DEIXAREM ISSO CHEGAR TÃO LONGE.',
            '<18>{#p/papyrus}{#f/5}E AQUELE BONECO...',
            '<18>{#p/papyrus}{#f/5}... PERDEU ALGUÉM MUITO IMPORTANTE PRA ELE.',
            '<18>{#p/papyrus}{#f/5}UM FANTASMA QUE SE FUNDIU AO CORE PARA ESTABILIZAR O MESMO.',
            '<18>{#p/papyrus}{#f/6}MESMO QUE AQUELE FANTASMA ESTEJA TECNICAMENTE VIVO...',
            "<18>{#p/papyrus}{#f/5}EXISTIR EM TAIS CIRCUNSTÂNCIAS NÃO É O IDEAL.",
            "<18>{#p/papyrus}{#f/3}ELES BASICAMENTE... NUNCA MAIS VÃO SE FALAR.",
            '<18>{#p/papyrus}{#f/6}EU TENTEI CONSOLAR O BONECO, MAS...',
            '<18>{#p/papyrus}{#f/5}TUDO QUE ELE FEZ FOI ENCARAR A GRANDE MAQUINA.',
            '<18>{#p/papyrus}{#f/5}...',
            "<18>{#p/papyrus}{#f/6}A-AINDA ASSIM, EU SEI QUE ELE CONSEGUIRÁ PASSAR POR ISSO!",
            '<18>{#p/papyrus}{#f/0}EU CONFIO NELE!',
            '<18>{#p/papyrus}{#f/0}ASSIM COMO EU CONFIO EM VOCÊ!',
            '<18>{#p/papyrus}{#f/5}EU ACREDITO EM TODO MUNDO...',
            '<18>{#p/papyrus}{#f/4}COM EXCEÇÃO DO SEU AMIGO INFORTUNADO.',
            '<18>{#p/papyrus}{#f/0}ELE PERDEU O DIREITO DE TER MINHA ESPERANÇA.',
            '<25>{#p/asgore}{#f/6}* Alas, eu retornei.',
            '<18>{#p/papyrus}{#f/0}BEM VINDO DE VOLTA!',
            '<25>{#p/asgore}{#f/7}* Acredito que você tenha dito tudo que queria?',
            "<18>{#p/papyrus}{#f/6}BEM, TEM MUITO MAIS QUE EU GOSTARIA DE DIZER...",
            '<18>{#p/papyrus}{#f/5}MAS A BATERIA DESSA COISA NÃO DURA MUITO.',
            '<25>{#p/asgore}{#f/1}* Eu entendo.',
            "<18>{#p/papyrus}{#f/5}EU VOU... TE DEVOLVER O TELEFONE AGORA.",
            '<25>{#p/asgore}{#f/2}* ...',
            '<25>{#p/asgore}{#f/2}* ele está certo.',
            '<25>{#p/asgore}{#f/1}* A bateria para enviar uma mensagem em tamanha distância...',
            "<25>{#p/asgore}{#f/2}* Demanda muito da energia do CORE.",
            '<25>{#p/asgore}{#f/4}* Sabendo aquele que habita e o regula agora...',
            '<25>{#p/asgore}{#f/2}* Seria correto não abusar da energia mais do que necessário.',
            '<18>{#p/papyrus}{#f/0}É, SIM, ISSO FAZ SENTIDO.',
            '<25>{#p/asgore}{#f/15}* ... entretanto, antes da mensagem ser concluída.',
            '<25>{#p/asgore}{#f/15}* Eu devo lhe incomodar um último aviso.',
            '<25>{#p/asgore}{#f/14}* ...\n* Não siga ele.\n* Não confie nele.',
            '<25>{#p/asgore}{#f/14}* Não acredite em nada que ele te diz.',
            '<25>{#p/asgore}{#f/13}* Não permita que ele faça o que quer, e nem o deixe ferir outras pessoas.',
            '<18>{#p/papyrus}{#f/6}ESTE É PROVAVELMENTE MEU MOMENTO PARA SAIR.\nADEUS!',
            '<25>{#p/asgore}{#f/14}* ... não deixe que ele te coaja a violência por si.',
            '<25>{#p/asgore}{#f/13}* E se você for deixado sem outra opção...',
            '<25>{#p/asgore}{#f/14}* ... não hesite em por um fim na vida dele.',
            '<25>{#p/asgore}{#f/2}* ...',
            '<25>{#p/asgore}{#f/4}* Boa sorte.',
            '<32>{#s/equip}{#p/event}* Click...'
        ],
        lastblook1: [
            () => [
                '<32>{#p/napstablook}* oh...\n* ei frisk......',
                ...(SAVE.data.b.ufokinwotm8
                    ? [
                        '<32>* ...',
                        "<32>* ... huh?\n* o que há com esse olhar?",
                        '<32>* eu estou... no seu caminho?',
                        '<32>* ...',
                        "<32>* oh......\n* eu estou, não estou.........",
                        '<32>* desculpa...',
                        '<32>* força do hábito......',
                        "<32>* eu vou... sair do seu caminho agora...",
                        '<32>* por favor......\n* me perdoe...........'
                    ]
                    : [
                        "<32>* eles ainda estão lá fora construindo a porta da frente, então...",
                        '<32>* sem muito motivo pra ir lá fora, eu acho',
                        ...(SAVE.data.b.c_state_secret4 && !SAVE.data.b.c_state_secret4_used
                            ? [
                                '<32>* ...',
                                '<32>{#p/human}* (Você repete o segredo contado a você por Napstablook no Arquivo Seis.)',
                                '<32>{#p/napstablook}* um truque de mágica...?',
                                '<32>* espera...',
                                '<33>* eu acho que sei o que você quer dizer...\n* me deixa tentar...'
                            ]
                            : [])
                    ])
            ],
            () => [
                ...(SAVE.data.b.c_state_secret4_used
                    ? ["<32>{#p/napstablook}* heh...\n* eu realmente aprecio tudo que você fez, frisk."]
                    : ["<32>{#p/napstablook}* hey...\n* eu realmente aprecio tudo que você fez, frisk."]),
                '<32>* nos dando liberdade e tudo...',
                '<32>* ...',
                "<32>* a verdade é que eu e meus primos pensamos que jamais escapariamos. ",
                "<32>* já fazia tanto tempo desde que o último humano havia aparecido, e...",
                '<32>* considerando o que descobrimos recentemente sobre a humanidade...',
                '<32>* sobre como todos eles deixaram a galáxia natal...',
                "<32>* é um milagre que você tenha caído no outpost."
            ],
            () =>
                SAVE.data.b.a_state_hapstablook
                    ? [
                        '<32>{#p/napstablook}* ah é, sobre meus primos...',
                        "<32>* após toda a coisa do Mettaton, tudo tem ido bem.",
                        "<32>* nós temos conversado e deixado tudo passar, e...",
                        "<32>* ... nós decidimos que vamos reabrir a fazenda de lesmas aqui em eurybia.",
                        "<32>* Mettaton está fazendo a publicidade, enquanto eu e os outros cuidamos dos caracóis.",
                        '<32>* nós até achamos um lugar para ficar após tudo se organizar...',
                        '<32>* uma casa muito gentil nos disse que poderíamos morar lá.',
                        "<32>* aparentemente, é a mesma na qual undyne costumava viver..."
                    ]
                    : [
                        '<32>{#p/napstablook}* ah certo, meus primos.',
                        "<32>* eu não sei se eu deveria te dizer isso, mas...",
                        '<32>* nós meio que descobrimos que o mettaton pode ser nosso primo perdido de muito tempo.',
                        '<32>* eu e os outros tentamos questiona-lo, mas...',
                        "<32>* ... as coisas não foram do jeito que imaginávamos.",
                        '<32>* então, todo mundo começou a se culpar pelo fracasso...',
                        "<32>* eu... não estou muito na vibe de conversar com eles desde então.",
                        '<32>* é... esse foi um típico chato.',
                        '<32>* desculpa...'
                    ],
            () => [
                ...(SAVE.data.b.a_state_hapstablook
                    ? ['<32>{#p/napstablook}* ...', '<32>* falando em família...']
                    : ['<32>{#p/napstablook}* ...', "<32>* ei...\n* mesmo que minha família não esteja tão bem..."]),
                '<32>* aquele humano que eu adotei é... bem legal, heh',
                "<32>* ele disse que eu sou o monstro favorito dele...",
                '<32>* ... sabendo o que eles passaram no arquivo, isso realmente significa alguma coisa.',
                '<32>* e... ele sempre dá um jeito de me fazer sorrir.',
                '<32>* tipo, algumas horas atrás quando as paredes ainda estavam sendo erguidas...',
                '<32>* ele queria ir lá fora ver a construção antes de ser tarde demais.',
                '<32>* quando eu disse que ele podia, ele ficou tão feliz...',
                '<32>* agora finalmente eu entendo porque pessoas gostam de cuidar de crianças.'
            ],
            () => [
                '<33>{#p/napstablook}* eu acho que deveria estar agradecido...',
                '<32>* pelo asgore, eu digo',
                '<32>* ele e alphys forma os que me confiaram em adotar o humano.',
                '<32>* eu... também descobri que o cara peludo que ia para a fazendo o tempo todo era ele.',
                "<32>* ele sempre cuidou tão bem dos caracóis que comprava...",
                '<32>* até mesmo os curando quando os mesmos se feriam antes de morrer por causas naturais.',
                '<32>* para alguém como ele... confiar em algo assim...',
                '<32>* ...',
                "<32>* bem... pelo menos eu sei que ele vai cuidar bem de você.",
                ...(SAVE.data.b.f_state_kidd_betray
                    ? ['<32>* você pode não ter nenhum irmão, mas...']
                    : SAVE.data.b.svr
                        ? ['<32>* junto com seus novos irmãos...']
                        : ['<32>* junto com seus novo irmão...']),
                "<32>* ele fará o melhor para te manter feliz e saudável."
            ],
            () => [
                '<32>{#p/napstablook}* sabe...\n* antes da fazenda de lesmas, e...',
                '<33>* antes do outpost...',
                '<32>* minha vida no planeta natural era quieta o suficiente.',
                '<32>* aquele antigo planeta natal...',
                '<32>* era realmente um lugar especial.',
                '<32>* a maneira como o céu se incendeia todos os dias...',
                '<32>* a forma como todos lá vivam em tamanha paz antes da guerra...',
                "<32>* lá atrás, eu não pensava em nada disso.",
                '<32>* agora... após quase duzentos anos de vida espacial......',
                "<32>* eu percebi que estava dando tudo como certo."
            ],
            () => [
                '<32>{#p/napstablook}* bem, de toda forma.\n* o planeta natal era ótimo e tudo...',
                "<32>* mas o novo tem tamanho potência para si, também.",
                '<32>* assim como minha nova vida na fazenda.',
                '<32>* quando eu estava andando na superfície mais cedo, eu dei uma andada por lá...',
                "<32>* e foi quando eu vi algo interessante acontecer",
                '<32>* as criaturas... começaram a usar magia.',
                "<32>* quando eu mencionei isso para a alphys, ela disse que este planeta não tem magia...",
                '<32>* não de acordo com os scaneios que fizemos quando chegamos pela primeira vez.',
                '<32>* será que nossa chegada a esse mundo...',
                "<32>* ... deu a ele algo que não tinha antes?"
            ],
            () => [
                '<32>{#p/napstablook}* ... heh.',
                "<32>* eu já falei muito, hein?",
                '<32>* aprecio você ter me escutado',
                "<32>* é bem legal da sua parte fazer isso por mim, Frisk.",
                '<32>* só queria que você soubesse disso.'
            ],
            () => [
                '<32>{#p/napstablook}* huh?\n* você ainda quer conversar?',
                '<32>* ...',
                '<32>* oh......',
                '<32>* eu acho que todos os meus tópicos de conversa acabaram',
                "<32>* eu dúvido que eu tenha qualquer coisa mais interessante para dizer, então...",
                '<32>* sinta-se livre para ir agora e fazer qualquer coisa'
            ],
            () => [
                '<32>{#p/napstablook}* ... frisk, uh...',
                "<32>* eu não tenho mais o que conversar",
                '<32>* talvez... se você voltar mais tarde hoje...',
                "<33>* eu já vou ter pensado em alguma coisa..."
            ],
            () => [
                '<32>{#p/napstablook}* ... oh.........',
                "<32>* você ainda.........\n* está aqui.........",
                '<32>* mesmo que eu não tenha mais nada para dizer.........',
                '<32>* bem... eu acho, que se você só quer minha companhia... então...',
                '<32>* Sinta-se livre pra ficar mais um tempinho'
            ],
            () => [
                '<32>{#p/napstablook}* ... hmm...',
                '<32>* na verdade...',
                '<32>* ... você gostaria que eu te contasse uma piada?',
                "<32>* eu não tenho muito senso de humor, mas posso tentar..."
            ],
            () => [
                '<32>{#p/napstablook}* okay...\n* aí vai...',
                '<32>* se um fantasma ficar cansado no meio da estrada, o que ele faz?',
                '<32>* ...',
                '<32>* resposta... ele {@fill=#ff0}naps to block{@fill=#fff}.',
                '<32>* entendeu?\n* napstablook?\n* dorme no bloco?',
                '<32>* é...\n* é melhor em inglês. mas o que é inglês?'
            ],
            () => [
                '<32>{#p/napstablook}* ... você quer que eu conte outra piada?',
                '<32>* hmm... deixa eu pensar...'
            ],
            () => [
                "<32>{#p/napstablook}* okay, que tal...",
                '<32>* Se um fantasma mudasse de sexo para que pudesse ter um filho, como você o chamaria?',
                '<32>* ...',
                '<32>* resposta... um {@fill=#ff0}trans-parente.{@fill=#fff}.',
                '<32>* ... heh.'
            ],
            () => ['<32>{#p/napstablook}* ... você quer que eu conte uma terceira piada?', '<32>* bem... se você insiste...'],
            () => [
                "<32>{#p/napstablook}* okay.\n* se liga.",
                '<32>* se um restaurante contrata um fantasma para testar sua comida, o que isso faz dele?',
                '<32>* ...',
                '<32>* resposta... um {@fill=#ff0}espectro da comida{@fill=#fff}.'
            ],
            () => [
                '<32>{#p/napstablook}* tá bom, tá bom.\n* talvez eu exagerei nessa.',
                '<33>* mas espero que você tenha gostado de toda forma.'
            ],
            () => [
                '<32>{#p/napstablook}* ...',
                '<32>* oh...',
                "<32>* ... eu acho que já não tenho mais nada a dizer.",
                "<32>* você tem escutado tão bem, eu me sinto mau por ficar sem ideias.",
                "<32>* vamos lá, blooky, pensa...",
                '<32>* ... sobre o que você pode conversar...'
            ],
            () => [
                '<32>{#p/napstablook}* espera',
                '<32>* você sabe algo sobre comida fantasma?',
                '<32>* aquela última piada me fez pensar sobre isso.',
                "<32>* você deve estar confuso... não é muito explicado em lugar algum.",
                '<32>* se você quiser, posso te contar sobre...'
            ],
            () => [
                '<32>{#p/napstablook}* ... então, comida fantasma...',
                "<32>* é exatamente como comida de monstro normal, exceto...",
                '<32>* quando eu estou preparando...',
                "<32>* tem um feitiço especial para você usar e fazer ela comestível para fantasmas.",
                "<32>* é isso aí... qualquer comida de monstro pode se tornar comida fantasma."
            ],
            () => [
                '<32>{#p/napstablook}* e como funciona assim...',
                '<32>* certas comidas são mais fáceis de converter que outras.',
                '<32>* tipo... frutas.\n* ou milkshakes.',
                ...(SAVE.data.b.item_blookpie
                    ? ['<32>* mas algo parecido com aquela torta de exoberry que você comprou de mim...']
                    : ['<32>* mas algo parecido com aquela torta de exoberry que eu tinha na minha loja']),
                '<32>* aquilo... precisa de bastante poder mágico.',
                '<32>* quanto mais complicada a comida, mais difícil de converter para comida fantasma.'
            ],
            () => [
                ...(SAVE.data.b.a_state_hapstablook
                    ? ['<32>{#p/napstablook}* teve uma vez que meu... er, mettaton fez bolo de chocolate.']
                    : ['<32>{#p/napstablook}* teve uma vez que meu primo fez bolo de chocolate.']),
                '<32>* recheio de chocolate, cobertura de chocolate... chocolate tudo.',
                "<32>* se eu não soubesse de nada, pensaria que era comida humana de verdade",
                ...(SAVE.data.b.a_state_hapstablook
                    ? [
                        '<32>* de alguma forma, ele transformou tudo aquilo em comida de fantasma...',
                        '<32>* não por uma ocasião especial, só porque ele queria me ver sorrir.'
                    ]
                    : [
                        '<32>* mas de alguma forma, conseguiu transformar tudo aquilo em comida de fantasma...',
                        '<32>* não por uma ocasião especial, só porque ele queria me ver sorrir.'
                    ]),
                '<32>* bem... eu sorri.\n* e nós comemos o bolo junto.',
                '<32>* e eu estava feliz.'
            ],
            () => [
                '<32>{#p/napstablook}* ...',
                "<32>* heh...\n* eu acho que vou pretender dormir por um tempo...",
                '<32>* me ajuda a relaxar depois de um longo dia como este.',
                "<32>* ... pera, está manhã...",
                '<32>* eu acho que vou dormir a noite toda, depois.',
                "<32>* dias e noites...\n* acho que vou gostar disso.",
                '<32>* ...',
                '<32>* bem... obrigado por falar comigo, frisk',
                '<32>* sinta-se à vontade para se deitar ao meu lado... se você gostar...',
                '<32>* ...',
                '<32>* Zzz... Zzz...'
            ],
            () => [
                '<32>{#p/napstablook}* Zzz... Zzz...',
                '<32>* Zzz... Zzz...',
                "<32>{#p/basic}* Este fantasma continua dizendo \"z\" bem alto pretendo estar dormindo.",
                choicer.create('* (Deitar ao lado dele?)', 'Sim', 'Não ')
            ],
            () => ['<32>{#p/basic}* O fantasma ainda está aqui.', choicer.create('* (Deitar ao lado dele?)', 'Sim', 'Não ')]
        ],
        lastblook2: ['<32>{#p/napstablook}* oooooooooooo......', '<32>* isso é bem legal...'],
        lastblook3: [
            '<32>{#p/human}* (...)',
            '<32>* (Você sente... alguma coisa.)',
            '<32>{#p/napstablook}* oh, desculpa... eu deveria explicar isso...',
            '<32>* ...\n* então, uh...',
            '<32>* eu tomei seu corpo...\n* como vassa-lo...',
            '<32>* e agora... nós habitamos o mesmo espaço.........',
            "<32>* eu não sei o por que, mas o último humano que tentou isso... gostou muito...",
            '<32>* então...',
            '<32>* também você também goste...'
        ],
        lastblook4: [
            "<32>{#p/napstablook}* bem, nós podemos ficar assim com tanto que a gente não se mova.",
            '<32>* então...\n* só tente se mover quando quiser parar, eu acho.'
        ],
        lastblook5: [
            '<32>{#p/napstablook}* bem...\n* espero que você tenha gostado...',
            '<32>* ou pelo menos tenha achado interessante...',
            '<32>* ou algo...'
        ],
        view: () => [choicer.create('* (Você está pronto para ir pra fora?)', 'Sim', 'Não ')],
        computer1: () =>
            SAVE.data.b.ufokinwotm8
                ? ["<32>{#p/human}* (Mas você não sente vontade de perder o tempo aqui.)"]
                : ["<32>{#p/basic}* O computador está offline, mas tem um espaço para um chip."],
        computer2: () => [choicer.create('* (Inserir o Chip no Computador?)', 'Sim', 'Não ')],
        computer3: ['<32>{#p/human}* (Você decide não inserir.)'],
        computer4: [
            '<32>{#p/basic}* Ah!\n* Obrigado!\n* Muito obrigado!',
            '<32>* Você realmente tomou conta de mim!\n* Você achou um computador bem longe de hoje eu estou!',
            '<32>* ...',
            '<32>* Eu estabeleci uma conexão entre este computador e meu corpo no outpost.',
            '<32>* ...',
            '<32>* Eu nunca pode imaginar como seria sensação de viver em dois lugares ao mesmo tempo!',
            '<32>* É... incrível...',
            '<32>* Eu jamais irei esquecer desde ato, amigo viajante!'
        ],
        computer5: ['<32>{#p/basic}* Obrigado, amigo viajante.\n* Eu te devo meu futuro.'],
        end1: [
            '<25>{*}{#p/asgore}{#f/6}* Está em uma emergência de programa número um.{^20}{%}',
            '<25>{*}{#p/asgore}{#f/6}* Iniciando protocolo automático de autodestruição.{^20}{%}'
        ],
        end2: [
            '<25>{*}{#p/asgore}{#f/6}* Está em uma emergência de programa número um.{^20}{%}',
            '<25>{*}{#p/asgore}{#f/6}* O protocolo automático de autodestruição foi terminado remotamente.{^20}{%}',
            '<25>{*}{#p/asgore}{#f/6}* Sistemas desligando. {^20}{%}'
        ],
        save1: '<32>{#p/human}{@fill=#f00}* ($(x) left.)',
        save2: '<32>{#p/human}{@fill=#f00}* (Determinação.)',
        frontstop: pager.create(
            0,
            [
                "<32>{#p/basic}* Desculpe, garoto.\n* Ainda estamos aqui construindo o jardim da frente.",
                '<32>* E a porta da frente.',
                "<32>* Se você está procurando pelo Asgore, ele tá lá com a gente.",
                "<32>* Nós estaremos prontos em algumas horas, só sente e relaxe por agora."
            ],
            ['<32>{#p/basic}* Só mais algumas horas, garoto.', '<32>* Então você pode sair.'],
            ['<32>{#p/basic}* Só mais algumas horas.']
        ),
        charatrigger: {
            _frontier1: pager.create(
                0,
                [
                    '<32>{#p/basic}* Então este é seu quarto, huh?',
                    '<32>* Meio estranho...',
                    "<32>* ... mas quem estou enganando, é de você que estamos falando.",
                    "<32>* você dormiria em uma cama de cachorro se fosse a única escolha.",
                    "<32>* E você comeria comida de cachorro.",
                    "<32>* E você gostaria que alguém tentasse acariciá-lo enquanto comia a comida de cachorro."
                ],
                [
                    "<32>{#p/basic}* Eu te ofereceria um biscoito, mas...",
                    "<32>* Mesmo com minha habilidade de aparecer visualmente, eu ainda sou só um fantasma.",
                    "<32>* Eu terei que me atar aos biscoitos caninos fantasmas."
                ],
                [
                    '<32>{#p/basic}* Ah, certo.\n* Minha nova habilidade.',
                    "<32>* Eu tentei me mostrar para o Asriel como antes, mas ele não pude me ver...",
                    '<32>* Então parece que por agora só funciona pra você.',
                    '<32>* Já é melhor do que nada.',
                    '<32>* Pelo menos você pode me enxergar e falar comigo.'
                ],
                ['<32>{#p/basic}* Tipo assim, por exemplo.'],
                ['<32>{#p/basic}* Ou assim.'],
                ['<32>{#p/basic}* Ou até assim!'],
                ['<32>{#p/basic}* ...', '<32>{#p/basic}* Você pode parar agora.'],
                ["<32>{#p/basic}* Tem mais o que fazer no seu quarto do que eu, não tem?"],
                ['<32>{#p/basic}* ...', '<32>{#p/basic}* Talvez não.'],
                ["<32>{#p/basic}* Talvez eu sou tudo que você tem."],
                ['<32>{#p/basic}* Em cada caso...', "<32>{#p/basic}* Nós estaremos aqui por um longo tempo."],
                ['<32>{#p/basic}* Muuuiiitooo tempo.'],
                ['<32>{#p/basic}* MUUUUUUUIIIITOOOO TEMPO.'],
                ['<32>{#p/basic}* Muito, muito, muito, muito tempo mesmo.'],
                ["<32>{#p/basic}* Você não tem nada melhor pra fazer?"],
                []
            ),
            _frontier2: pager.create(
                0,
                [
                    '<32>{#p/basic}* Ah, o humilde corredor.',
                    '<32>* Para Asriel e eu, foi o ponto de partida de inúmeras aventuras...',
                    '<33>* ... correndo destemidamente pelos vários cômodos da casa.',
                    '<32>* Eu sei, certo?\n* Bem aventurado.',
                    '<32>* Infelizmente, tivemos que parar após o espelho ser quebrado em pedaços setecentas vezes.',
                    "<32>* Você não acreditaria nas minhas desculpas...",
                    '<33>* Como quando culpei um colisor de partículas por atirar em um átomo perdido da Terra para o Outpost.',
                    '<33>* E de alguma forma acertou o vidro porque ele \"passou\" pela parede.',
                    "<32>* Sim... essa pode ter sido um exagero."
                ],
                [
                    '<32>{#p/basic}* Mas hoje em dia, corredores são só corredores.',
                    '<32>* E desculpas são só desculpas.',
                    '<32>* Existe uma valiosa lição de vida em algum lugar?\n* Provavelmente.',
                    "<32>* Eu vou dizer, há uma espécie de simbolismo em um fantasma em um corredor...",
                    '<32>* Com toda a coisa de \"entre um lugar e outro\" acontecendo.',
                    '<32>* Na verdade, isso deve se aplicar apenas a fantasmas humanos.',
                    '<32>* Monstros fantasmas não nascem naturalmente...',
                    "<32>* Então, se alguma coisa, ele vai estar no começo da sala do corredor...",
                    '<32>* ... melhor do que ficar no meio disso.'
                ],
                [
                    '<32>{#p/basic}* Desculpa.\n* Foi pela tangente lá.',
                    '<32>* Mas o que você esperava que eu fizesse quando falou comigo em um corredor chato?',
                    '<33>* Corredor chato, tangente chata.\n* Faz sentido, certo?'
                ],
                ["<32>{#p/basic}* Ou talvez não.\n* O que eu sei."],
                ["<32>{#p/basic}* A parte de que eu já não tenha mais nada para falar."],
                ['<32>{#p/basic}* Disso, eu tenho certeza.'],
                ['<32>{#p/basic}* Mas o que você pode fazer?', '<32>{#p/basic}* ... espera, eu sei!\n* Poderíamos ir para uma nova sala!'],
                []
            ),
            _frontier3: pager.create(
                0,
                [
                    "<32>{#p/basic}* Ooh... quarto do Asgore.",
                    '<32>* O grandão com certeza ama diários, né?',
                    "<32>* Mesmo que ele ainda não tenha escrito nada naquela ali, tenho certeza que ele o fará logo, logo.",
                    '<32>* Ler eles sempre foi um prazer pecaminoso meu...'
                ],
                [
                    "<32>{#p/basic}* Que?\n* Todo mundo tem um prazer pecaminoso, não tem?",
                    '<32>* Me pergunto qual o seu...',
                    "<32>* Talvez eu descubra mais tarde."
                ],
                [
                    "<32>{#p/basic}* Só por agora, então, eu vou dar uma volta por aí.",
                    '<32>* Assistindo, esperando...',
                    "<32>* ... pronto para te pegar fazendo algo que você não quer que eu te veja fazendo!"
                ],
                ["<32>{#p/basic}* Tá, eu não vou tão longe."],
                ["<33>{#p/basic}* Não enquanto você estiver acordado."],
                []
            ),
            _frontier4: pager.create(
                0,
                [
                    "<32>{#p/basic}* Eu dei uma olhada lá fora, e eles AINDA estão trabalhando na construção.",
                    '<32>* A parte toda da frente da casa está uma bagunça.',
                    "<32>* E Asgore... AINDA mexendo no chão...",
                    '<32>* ... enquanto os atuais trabalhadora do CORE tomam seu belo, belo tempo construindo a base.',
                    "<32>* Me pergunto como vai se parecer quando estiver pronto...",
                    "<32>* Com fé, já que Asgore está no controle, vai se parecer bem melhor que seu antecessor."
                ],
                [
                    "<32>{#p/basic}* Na verdade, Asgore está apenas no controle do design.",
                    '<32>* Desde o começo da construção ontem, Doge é quem tem dado as ordens.',
                    '<32>* Eu também me esgueirei para fora.',
                    "<32>* Ela é restrita, mas ela sabe o que está fazendo.",
                    '<32>* O que ele perfeito, já que por mais que eu ame Asgore por quem ele é...',
                    '<32>* Ele certamente NÃO é o seu capataz ideal.'
                ],
                [
                    '<33>{#p/basic}* Falando em coisas a serem construídas, eles finalizaram a sacada mais cedo hoje.',
                    '<32>* Criança Monstro e Asriel estão lá fora...\n* ... observando a vista.',
                    "<32>* Eles com certeza fazem muito isso juntos... provavelmente estão te esperando para se juntar.",
                    "<32>* Assim que você tiver olhado tudo ao redor, você poderia ir vê-los.",
                    '<33>* Ou você poderia só voltar para seu quarto.\n* Onde suas botas voadoras te levarem.'
                ],
                [
                    '<32>{#p/basic}* Ah é, sobre as botas...',
                    "<32>* Eu acho que não tem necessidade de tê-las por aqui.",
                    "<32>* Mas... Frisk!\n* Existem lugares neste mundo que você não pode ir sem um par delas.",
                    '<32>* Especialmente a bacia dos pântanos.\n* Toda aquela água turva.',
                    '<32>* Só mantenha isso em mente.'
                ],
                [
                    "<32>{#p/basic}* E não, não dá pra sair nadando por estes tipos de lugares.",
                    '<33>* Apenas alguns deles.\n* E só em bons momentos do dia.'
                ],
                [
                    '<32>{#p/basic}* Te pergunto, monstros entendem qual é a hora do dia?',
                    '<32>* A MAIORIA nasceu no espaço...'
                ],
                ["<32>{#p/basic}* ... talvez essa seja um pergunta para outro momento do dia."],
                []
            ),
            _frontier5: pager.create(
                0,
                [
                    '<32>{#p/basic}* Três pequenas cadeiras na mesa de jantar...',
                    '<32>* Uma pra você, uma pro Asriel e uma para a Criança Monstro.',
                    "<32>* Tá tudo bem, sério.\n* Asgore não saberia que eu estou aqui.",
                    '<32>* Ainda assim...',
                    '<32>* É estranho não ter um lugar aqui.'
                ],
                [
                    "<32>{#p/basic}* Asriel e eu amávamos trocar de cadeira quando mamãe não estava olhando.",
                    "<32>* Mesmo Asgore fazia essa brincadeira as vezes.\n* Ela... nem se impressionava.",
                    '<32>* Mas era tudo uma boa brincadeira.',
                    "<32>* Caramba, ele costumava verificar debaixo da cadeira de Asriel por criaturas espaciais quando se sentava.",
                    "<32>* Nunca esquecerei aquela vez em que Toriel se sentou na cadeira, que trocamos antes...",
                    '<33>* Asgore deu a ela o exato mesmo tratamento e foi GLORIOSO.',
                    '<32>* Todos nós caímos na risada... exceto pela Toriel, que sentou-se desacreditada.',
                    '<32>* Bem.\n* Ela acabou deixando isso de lado mais tarde.'
                ],
                () => [
                    "<32>{#p/basic}* Mas, sim... ela não era muito para a brincadeira que fizemos.",
                    SAVE.data.b.c_state_secret1_used && SAVE.data.b.c_state_secret5_used
                        ? "<32>* E mesmo que ela não seja a mesma que costumava ser..."
                        : "<32>* E mesmo que ela não esteja aqui todo o tempo...",
                    "<32>* É bom que Asriel tenha alguém como você para acalma-lo.",
                    '<32>* Quando ele fica animado, ele REALMENTE fica animado.',
                    '<32>* ...',
                    '<32>* ... ou, costumava, de toda forma.'
                ],
                () => [
                    "<32>{#p/basic}* Acho que injusto pensar sobre ele como a pessoa que um dia foi.",
                    SAVE.flag.n.killed_sans
                        ? '<32>* Com toda essa coisa que ele mencionou sobre tentar te corromper...'
                        : '<32>* Com toda essa coisa que ele mencionou sobre tentar te machucar...',
                    "<32>* Ele provavelmente é uma pessoa muito diferente agora.",
                    '<32>* Não como eu.',
                    '<32>* Eu só espero que ele consiga tirar o melhor do que é agora.',
                    "<32>* E que você estará lá para ele quando ele precisar de você."
                ],
                [
                    "<32>{#p/basic}* Mas eu acho que estou começando a me repetir.",
                    "<32>* Nós temos uma casa, nós temos a luz do sol... então não existe motivos para reclamar!",
                    '<32>* ... ou qualquer coisa assim.'
                ],
                []
            ),
            _frontier6: pager.create(
                0,
                [
                    '<32>{#p/basic}* É claro que eles colocaram um micro-ondas aqui.',
                    '<32>* É claro que fizeram.',
                    "<32>* Sem dúvidas que esse será o primeiro recurso para comidas do Asriel.",
                    '<32>* É, ele é o que chamamos de \"chefe de micro-ondas.\"'
                ],
                [
                    "<32>{#p/basic}* Quer dizer, é bem ruim que tantos ingredientes nossos sejam replicados...",
                    '<32>* Formado com bobagens de conversão de matéria-energia, em vez de cozimento legítimo.',
                    '<32>* Mas pelo menos aquele coisa ainda faz algo palatável.',
                    '<32>* Usar micro-ondas é só...',
                    "<32>* É errado.",
                    "<32>* É tão errado."
                ],
                [
                    "<33>{#p/basic}* Mas essa é só minha opinião.",
                    '<32>* Sinta-se livre em discordar, e te conhecendo, você provavelmente vai...',
                    '<32>* Mas algumas opiniões...',
                    "<32>* Vamos só dizer que algumas opiniões são mais corretas que outras."
                ],
                [
                    '<32>{#p/basic}* Tudo o que podemos esperar é que Eurybia tenha uma seleção melhor de ingredientes frescos.',
                    '<32>* Considerando que Alphys foi escolhida para procurar planetas em primeiro lugar...',
                    "<32>* Você não pode me culpar por estar pelo menos um pouco preocupado."
                ],
                [
                    "<33>{#p/basic}* Se Asriel é um mestre de microondas, Alphys é o deus de todos os microondas.",
                    "<32>* É tudo que eu digo."
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
            choicer.create('* (Do you confirm?)', 'Sim', 'Não ')
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
