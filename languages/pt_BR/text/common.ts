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
                        '<25>{#p/alphys}{#f/10}* Como cientista real, eu deveria tomar o lugar dele, mas...',
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
                        addB(["<25>{#p/alphys}{#f/13}* ... pensei que ela se perderia pela morte da verdadeira rainha..."]);
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
                                '<25>{#p/alphys}{#f/5}* ... monstros não confiam mais em humanos após o que aconteceu.'
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
                        '<25>{#p/alphys}{#f/20}* Então... eu mandei o arquivo para um lugar em Aerialis.',
                        '<25>{#p/alphys}{#f/20}* Em segredo.',
                        '<25>{#p/alphys}{#f/5}* ... Undyne viu a falta de humanos, ou... ALMAS humanas, e...',
                        "<25>{#p/alphys}{#f/10}* Assumiu que elas tinham se perdido, também."
                    ]);
                    if (dtoriel) {
                        addB([
                            '<25>{#p/alphys}{#f/3}* Eu, tentei falar com ela sobre o anúncio em público, mas...',
                            '<25>{#p/alphys}{#f/3}* ... eu não pude fazer nada...!',
                            "<25>{#p/alphys}{#f/30}* Todo mundo pensa que voltamos para o verdadeiro foco agora."
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
                                '<25>{#p/alphys}{#f/27}* Oh, ei Papyrus.\n* O arquivo ainda está funcionando?',
                                '<18>{#p/papyrus}{#f/0}CLARO QUE ESTÁ!',
                                '<18>{#p/papyrus}{#f/9}EU TAMBÉM DEI AOS HUMANOS SEU CHECK DIÁRIO!',
                                '<25>{#p/alphys}{#f/10}* Incrível, obrigada.',
                                "<25>{#p/alphys}{#f/10}* Você quer falar algumas coisas para o humano...?",
                                "<25>{#p/alphys}{#f/5}* Eu estou deixando uma mensagem sobre tudo que aconteceu.",
                                '<18>{#p/papyrus}{#f/0}OH, MAS QUE BOM!',
                                "<18>{#p/papyrus}{#f/0}... OLÁ, HUMANO.\nACREDITO QUE VOCÊ ESTEJA BEM.",
                                "<18>{#p/papyrus}{#f/5}TEM SIDO DIFÍCIL MANTER SEGREDO DE TODO MUNDO...",
                                "<18>{#p/papyrus}{#f/6}ESPECIALMENTE QUANDO TODOS ESTÃO TRISTE!!!",
                                "<18>{#p/papyrus}{#f/5}TODOS PENSANDO QUE NUNCA SERÃO LIVRES...",
                                '<18>{#p/papyrus}{#f/5}PERGUNTANDO SE AINDA TEM FUTURO...',
                                "<18>{#p/papyrus}{#f/0}MAS EI!!\nTUDO FICARÁ BEM!!",
                                "<18>{#p/papyrus}{#f/5}UM DIA, ELES IRÃO DESCOBRIR A VERDADE...",
                                '<18>{#p/papyrus}{#f/0}E A VERDADE OS LIBERTARÁ.',
                                "<25>{#p/alphys}{#f/8}* Papyrus, que tal falar para ele sobre seu trabalho?",
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
                                '<25>{#p/sans}{#f/2}* as pessoas no andar abaixo do nosso queriam que eu fizesse comida.',
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
                                '<26>{#p/sans}{#f/0}* bem, eu deveria ir naquele café da manhã, agora.',
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
                                '<25>{#p/sans}{#f/2}* as pessoas no andar abaixo da gente queriam que eu fizesse comida.',
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
                    '<25>{#p/alphys}{#f/10}* Como cientista real, eu deveria tomar o lugar dele, mas...',
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
                ['<32>{#p/basic}* Não, sério.', "<32>* Não direi mais nada."],
                ['<32>{#p/basic}* ...', '<32>{#p/basic}* Não na cozinha, pelo menos.'],
                []
            ),
            _frontier7: pager.create(
                0,
                [
                    "<32>{#p/basic}* A varanda tá lá fora...",
                    '<32>* Me pergunto se os pássaros estão dizendo algo interessante.',
                    '<33>* Como \"essa é uma bela casa!\"\n* Ou \"o clima está ótimo hoje.\"',
                    "<32>* Talvez eles não gostem da casa OU do clima.\n* Isso seria... bem paia.",
                    "<32>* Talvez eles nem sejam pássaros.\n* Quem sabe o tipo de som que pássaros fazem.",
                    '<32>* Quem sabe se pássaros sequer existem aqui.',
                    "<33>* Pelo que sabemos, o que estamos ouvindo são os gritos dos condenados enterrados nas profundezas do subsolo."
                ],
                [
                    '<32>{#p/basic}* Após os monstros viverem aqui o suficiente, talvez este planeta ganhe algum tipo de magia.',
                    '<32>* Se isso acontecer, os animais seriam afetados, também?',
                    '<32>* Eles começariam a ter consciência?\n* Nos entender?',
                    '<32>* Nós entenderiam os eles?',
                    "<33>* Se o que estamos escutando SÃO realmente os choros dos condenados, então eu não sei se quero isso."
                ],
                [
                    '<32>{#p/basic}* Mas é, planeta com magia.',
                    "<32>* Acho que foi isso que aconteceu em Krios, quando monstros ganharam magia.",
                    '<32>* Isso, ou o planeta já tinha magia e entregou a eles.',
                    "<32>* Nós temos que perguntar a Terrestria sobre esse tipo de coisa.",
                    "<32>* Ela deve saber."
                ],
                [
                    "<32>{#p/basic}* Ei.\n* Não fica tímido sobre ir lá fora, Frisk.",
                    "<32>* Tenho certeza que aqueles dois vão estar felizes em te ver.",
                    '<32>* E se minha análise da posição estiver certa...',
                    '<32>* O planeta também estará.'
                ],
                ["<32>{#p/basic}* Não me cite nisso, no entanto.", "<32>* Eu não sou já um jogador de xadrez."],
                [
                    "<32>{#p/basic}* A jogada mais inteligente que eu já fiz em um tabuleiro foi uma captura dupla nas damas.",
                    '<32>* Depois disso é só queda.'
                ],
                [
                    "<32>{#p/basic}* E se não estivéssemos enterrados em uma selva, poderia ser ladeira abaixo a partir daqui também.",
                    '<32>* Não que eu culpe o Asgore por uma escolher área de risco baixo.',
                    "<32>* Ele tem duas crianças adotadas para pensar sobre agora...",
                    '<32>* Sem mencionar seu próprio filho.'
                ],
                ['<32>{#p/basic}* Viver ao lado das montanhas é legal, mas viver na floresta tem seu charme, também.'],
                []
            ),
            _frontier9: pager.create(
                0,
                [
                    '<32>{#p/basic}* Certo.\n* O banheiro.',
                    '<32>* O banheiro, o banheiro, o banheiro...',
                    '<32>* Banheiro banheiro banheiro banheiro banheiro',
                    '<32>* ...',
                    '<32>* Banheiro.',
                    '<32>* ...',
                    '<32>* BANHEIRO!!!'
                ],
                [
                    '<32>{#p/basic}* Beleza... eu vou admitir.',
                    "<32>* É bem legal que você tenha shampoo extra-fofo.",
                    "<32>* Mesmo que não faça sentido algum um humano ter.",
                    '<32>* Ah não ser... que você esteja virando uma cabra...',
                    '<32>* ... baaah?'
                ],
                [
                    '<32>{#p/basic}* ...',
                    "<32>* Tem uma distinta possibilidade de você não ser o único a usar este banheiro."
                ],
                []
            ),
            _frontier10: pager.create(
                0,
                [
                    "<32>{#p/basic}* Então este é o quarto da Criança Monstro e do Asriel...",
                    "<32>* Eu não tenho muito a dizer.",
                    '<32>* Porém... aquele quadro na parede é bem da hora.',
                    '<32>* O antigo planeta natal...',
                    "<32>* Só que agora, está em tom verdadeiro."
                ],
                [
                    "<32>{#p/basic}* Eu não estou nem um pouco surpreso que ele tenha feito esse quarto bem menor que o seu.",
                    "<32>* Ele conhece monstros muito bem.\n* Se a cama é confortável, que importância tem o tamanho do quarto?",
                    "<32>* Só quem se importa são não monstros."
                ],
                ['<32>{#p/basic}* ...', '<32>* Deve ser por isso que Asriel dormiu em sua cama ontem à noite em vez da dele.'],
                []
            ),
            _void: pager.create(
                0,
                [
                    '<32>{#p/basic}* Pelo que eu consigo dizer...',
                    '<32>* Este quarto pertence a alguém que passa muito tempo fazendo uma coisa em específico.',
                    "<32>* Se eu tivesse esse tipo de tempo livre, eu não tenho ideia do que faria.",
                    "<32>* Eu sei que não gastaria em um projeto tão tedioso e desmoralizantemente grande.",
                    "<32>* Mas eu não sou eles, então eu não sei o que passa naquelas cabeças."
                ],
                []
            )
        },
        balconyX: [
            '<32>{#p/human}* (E, no entanto, apesar da visão à sua frente...)',
            "<32>{#p/human}* (... você não pode aceitar o fato de que existe algo faltando.)"
        ],
        balcony0: ['<25>{#p/kidd}{#f/3}* Oh, eu Frisk...', '<25>{#f/1}* Eu estava preocupado pensando que você não acordaria!'],
        balcony1: () => [
            '<25>{#p/kidd}{#f/3}* ... haha.',
            ...(SAVE.data.b.ufokinwotm8
                ? ["<25>{#f/2}* Eu nem posso acreditar que eu...", '<25>{#f/4}* ... tenho...']
                : [
                    "<25>{#f/2}* Eu nem posso acreditar que realmente tenho uma casa agora.",
                    '<25>{#f/7}* E com o Rei Asgore!?',
                    '<25>{#f/1}* Todas as outras crianças vão querer sair com a gente...',
                    "<25>{#f/1}* Nós vamos fazer festas em casa o TEMPO todo!"
                ])
        ],
        balcony2: () =>
            SAVE.data.b.ufokinwotm8
                ? [
                    '<25>{#p/kidd}{#f/4}* Uh... você está bem?',
                    "<25>{#f/8}* Eu estou meio preocupado contigo, cara...",
                    '<25>{#f/7}* Tem algo errado?'
                ]
                : [
                    '<25>{#p/kidd}{#f/1}* Cara, os livros na libraria eram alguma coisa...',
                    '<25>{#p/kidd}{#f/7}* Mas estar em um planeta de VERDADE!?',
                    "<25>{#f/13}* É BEEEEEMMM mais legal!",
                    '<25>{#f/2}* Imagine se nós tentarmos explorar ele inteiro...',
                    "<25>{#f/1}* Nós nunca JAMAIS veríamos tudo!"
                ],
        balcony3: () =>
            SAVE.data.b.ufokinwotm8
                ? [
                    "<25>{#p/kidd}{#f/4}* (Cara, eu estou realmente ficando preocupado agora.)",
                    '<25>{#f/7}* Frisk, vamos lá...!',
                    '<25>{#f/7}* Você precisa me dizer algo, cara!',
                    "<25>{#f/8}* Eu não fiz nada de errado... fiz?"
                ]
                : ["<25>{#p/kidd}{#f/2}* Você não está animado?", '<25>{#f/1}* Eu e você vamos fazer TUDO juntos!'],
        balcony0a: ['<25>{#p/kidd}{#f/1}* É ASSIM que viver em um planeta se parece?\n* Isso é INCRÍVEL!'],
        balcony1a: [
            '<25>{#p/asriel1}{#f/10}* O que?\n* Um planeta inteiro disso?',
            '<25>{#f/20}* Pfft.\n* Não é nada...',
            "<25>{#f/17}* Só passando pela floresta, tem uma montanha gigante...",
            '<25>{#f/17}* E uma lago logo abaixo.'
        ],
        balcony2a: [
            '<25>{#p/kidd}{#f/2}* Deve ser o lago com aquela gosma vermelha noo...',
            '<25>{#f/1}* Nojenta e muito legal!'
        ],
        balcony3a: ['<25>{#p/asriel1}{#f/1}* ... dúvido você nadar lá.'],
        balcony4a: ['<25>{#p/kidd}{#f/7}* ...', '<25>{#f/13}* Feito.\n* Mas só se você nadar COMIGO!'],
        balcony5a: [
            '<25>{#p/asriel1}{#f/21}* Uh... eu...',
            "<25>{#f/20}* Bem, acho melhor se nós nos atarmos apenas a corridas."
        ],
        balcony6a: ["<25>{#p/kidd}{#f/6}* Você não tá com medo de ficar com a gosma vermelha em cima de você, não é?"],
        balcony7a: [
            '<25>{#p/asriel1}{#f/8}* ... ugh, é claro que não, seu idiota, é só que-',
            '<25>{#p/kidd}{#f/8}* ...',
            "<25>{#p/asriel1}{#f/25}* ... e-espera, eu não q-quis, eu..."
        ],
        balcony8a: ['<25>{#p/kidd}{#f/4}* Asriel...?', '<25>{#p/kidd}{#f/4}* Você está bem?'],
        balcony9a: [
            '<25>{#p/asriel1}{#f/13}* ... eu...',
            "<25>{#f/22}* Eu estou bem.\n* Você não fez nada de errado, tá bom?"
        ],
        balcony10a: [
            "<25>{#p/asriel1}{#f/21}* ... você vai só me perdoar desse jeito, não vai...",
            "<25>{#f/23}* Você é só uma inocente criança monstro.",
            "<25>{#p/kidd}{#f/1}* Esse é meu nome!"
        ],
        balcony11a: [
            '<25>{#p/kidd}{#f/4}* Então, o que você estava falando?',
            '<25>{#p/asriel1}{#f/13}* ...',
            '<25>{#f/13}* ... Existem desertos, mas as corridas seriam feitas nos túbulos.'
        ],
        balcony12a: ['<25>{#p/kidd}{#f/7}* Túbulos??\n* Mas o que??'],
        balcony13a: [
            "<25>{#p/asriel1}{#f/10}* Uh...\n* Você não leu os levantamentos geológicos?",
            "<25>{#p/kidd}{#f/1}* O que é um levantamento geológico?",
            '<25>{#p/asriel1}{#f/15}* ...',
            '<25>{#f/15}* Os túbulos são uma região feita de... uh, tubos.',
            '<26>{#f/17}* Tubos grandes formam penhascos, tubos médios formam colinas e tubos pequenos, bem...',
            "<25>{#f/20}* Eles não fazem muita coisa, eu acho.",
            '<25>{#p/kidd}{#f/1}* Oh!\n* Isso faz sentido!'
        ],
        balcony14a: [
            "<25>{#p/kidd}{#f/1}* Você acha que podem existir outros planetas aí fora como esse?",
            '<25>{#f/2}* Nós vamos explorar eles também?',
            '<25>{#p/asriel1}{#f/10}* Hmm...\n* Sem dúvidas devem ter...'
        ],
        balcony15a: () => [
            '<25>{#p/kidd}{#f/7}* Yo... que tal formarmos um grupo de exploração!\n* Para alcançar as estrelas!',
            '<25>{#p/asriel1}{#f/27}* ... huh.',
            "<25>{#p/kidd}{#f/6}* Nós começamos por este planeta, achando tudo que podemos...",
            "<26>{#p/kidd}{#f/1}* Então partimos para outros mundos e logo faríamos um gigante mapa da galáxia!",
            ...(SAVE.data.b.c_state_secret2_used
                ? ["<26>{#p/kidd}{#f/13}* E nós devíamos totalmente ter um aperto de mão secreto!\n* Igual o Gerson!"]
                : []),
            ...(SAVE.data.b.c_state_secret3_used
                ? [
                    ...(SAVE.data.b.c_state_secret2_used
                        ? ["<25>{#p/asriel1}{#f/13}* Com sorte, nós bateremos de frente com outros raças na galáxia, também."]
                        : ["<25>{#p/asriel1}{#f/13}* Com sorte nós estaremos explorando outras galáxias também."]),
                    "<25>{#f/13}* As viagens por buraco de minhoca da Dr. Alphys irão facilitar este processo.",
                    "<25>{#f/17}* Nós vamos fazer uma exploração pan-galatica."
                ]
                : [
                    '<25>{#p/asriel1}{#f/17}* Woah, uh, calma um pouco carinha...',
                    ...(SAVE.data.b.c_state_secret2_used
                        ? [
                            '<25>{#p/asriel1}{#f/17}* ... Um aperto de mão secreto seria muito legal, mas...',
                            '<25>{#f/13}* ... explorar outro planetas...'
                        ]
                        : []),
                    '<26>{#f/13}* Só demorar tempo o suficiente pra fazer isso só aqui, imagina outros planetas.'
                ])
        ],
        balcony16a: () =>
            SAVE.data.b.c_state_secret3_used
                ? ["<26>{#p/kidd}{#f/14}* Ah, é, verdade. Eu me esqueci disso."]
                : ['<25>{#p/kidd}{#f/3}* Haha, talvez.\n* Mas ainda assim devemos explorar o máximo que der!'],
        balcony17a: [
            '<25>{#p/asriel1}{#f/17}* Só nós, uh?',
            '<25>{#p/kidd}{#f/1}* Total, cara!\n* Só nós três!'
        ],
        balcony18a1: ['<32>{#p/basic}* ... uh, você não quis dizer só \"nós quatro\"?'],
        balcony18a2: ['<25>{#p/asriel1}{#f/25}* ...!', "<25>{#f/25}* $(name)... você..."],
        balcony19a1: ['<32>{#p/basic}* ... espera, você consegue me ouvir agora?'],
        balcony19a2: [
            "<32>{#p/basic}* Eu tentei te alcançar antes... mas não funcionou.",
            '<32>* Me pergunto o que mudou...'
        ],
        balcony20a: ["<25>{#p/kidd}{#f/6}* Haha. Se você é amigo dele, então você é meu amigo."],
        balcony21a: ['<32>{#p/basic}* Espera, VOCÊ pode me escutar?'],
        balcony22a: ["<25>{#p/kidd}{#f/1}* Meio difícil de não, quando você está bem aí, sabe."],
        balcony23a1: ['<32>{#p/basic}* VOCÊ PODE ME VER!?!?'],
        balcony23a2: ['<32>{#p/basic}* Oh... meu senhor...'],
        balcony24a: ["<33>{#p/basic}* Asriel, como você não me percebeu aqui?\n* Eu nem estou escondido!"],
        balcony25a: ['<26>{#p/asriel1}{#f/23}* ... $(name), eu...'],
        balcony26a1: [
            "<32>{#p/basic}* Asriel, tá tudo bem.\n* Você não precisa se lamentar mais por aquilo.",
            '<32>* Se você precisar chorar...',
            '<32>* ... você pode.'
        ],
        balcony26a2: [
            "<32>{#p/basic}* Ter essa ALMA extra dentro de mim deve ter tornado um mais difícil de aparecer visualmente...",
            '<32>* De volta no Outpost, quando eu finalmente consegui fazer isso...',
            '<32>* Essa mesma ALMA foi lançada pouco depois.',
            "<32>* ... eu acho que isso significa que você será visível o tempo todo agora?",
            "<32>* Pra ser sincero, não sei como me sentir em relação a isso."
        ],
        balcony27a: ['<25>{#p/kidd}{#f/7}* Espera, você também é humano!?'],
        balcony28a: [
            '<32>{#p/basic}* Como é?',
            "<33>* Eu sou um FANTASMA humano que quer que seu irmão CABRA seja feliz.\n* Acerte. Caramba."
        ],
        balcony29a: ['<25>{#p/kidd}{#f/14}* ... Asriel é seu irmão!?', '<25>{#p/kidd}{#f/4}* Isso é demais pra absorver...'],
        balcony30a: ["<25>{#p/kidd}{#f/1}* Mas, uh, todo vocês são legais pra caramba, então eu ficarei bem."],
        balcony31a: ["<32>{#p/basic}* Oh, eu SEI que eu sou legal.\n* Eu sou o humano fantasma mais fera desse lado do continente."],
        balcony32a: [
            "<25>{#p/asriel1}{#f/15}* $(name), você é o único humano fantasma desse lado do continente.",
            '<25>{#f/17}* E do planeta.',
            '<25>{#f/20}* E da galáxia.',
            "<25>{#f/13}* E do futuro, já que o Frisk não vai deixar vocês tão cedo.",
            '<25>{#f/15}* E depois de morrer... conhecê-los cem anos depois...',
            '<25>{#f/17}* Etc, etc, etc. Em várias das circunstâncias radicais.'
        ],
        balcony33a: [
            "<32>{#p/basic}* Pfft.\n* Você é engraçado Asriel.",
            "<32>* Ser o único fantasma humano não te exclui o cargo de melhor fantasma humano.",
            '<32>* Um certo esqueleto da hora concordaria.'
        ],
        balcony34a1: [
            '<25>{#p/kidd}{#f/2}* $(name), huh?',
            "<25>{#f/1}* Este é um nome legal.",
            '<25>{#p/kidd}{#f/6}* Meu nome é Criança Monstro.'
        ],
        balcony34a2: ['<25>{#p/asriel1}{#f/15}* ... você acabou de...', '<33>{#p/basic}* Asriel.\n* Ele disse a coisa.'],
        balcony35a1: [
            '<25>{#p/asriel1}{#f/10}* Ele realmente disse...',
            '<25>{#p/kidd}{#f/4}* Que?\n* Eu disse algo de errado...',
            "<33>{#p/basic}* Não, não, tá tudo bem.\n* Você só... nos lembrou de algo.",
            '<25>{#p/kidd}{#f/1}* Oh.\n* Espero que tenha sido algo bom, então.'
        ],
        balcony35a2: ['<25>{#p/asriel1}{#f/23}* ... foi sim.'],
        balcony36a: [
            '<25>{#p/kidd}{#f/3}* Ei... obrigado por estar aqui pessoal.',
            '<25>{#f/1}* Com amigos como vocês, viver aqui será a melhor experiência!'
        ],
        balcony37a: [
            "<33>{#p/basic}* ... heh.\n* Se fossemos apenas amigos, talvez.\n* Mas somos mais que isso.",
            '<25>{#p/kidd}{#f/7}* ...?'
        ],
        balcony38a: ["<25>{#p/asriel1}{#f/17}* Nós somos sua família."],
        balcony39a: [
            '<25>{*}{#p/kidd}{#f/1}* Oh!\n* Oh!\n* Isso significa que podemos- {%}',
            '<25>{*}{#f/1}* comer juntos e contar histórias e fazer bons passeios no parque e- {%}',
            '<25>{*}{#p/asriel1}{#f/20}* Sim, sim, é claro- {%}',
            "<25>{*}{#p/kidd}{#f/1}* Nós podemos dormir na casa um do outro e- {^999}"
        ],
        trivia: {
            bed: (kiddo: boolean) =>
                SAVE.data.b.svr && !player.metadata.voidkey?.room.startsWith('_frontier') // NO-TRANSLATE

                    ? ["<25>{#p/asriel1}{#f/20}* Aquela cama parece não ter sido lavado em três anos..."]
                    : [
                        SAVE.data.b.ufokinwotm8
                            ? '<32>{#p/human}* (Você passa as mãos pelas cobertas da cama e nota o desgaste.)'
                            : '<33>{#p/basic}* Esta cama, embora bem feita, tem sido muito usada.',
                        ...(kiddo ? ['<25>{#p/kidd}{#f/1}* Parece confortável! '] : [])
                    ],
            plushie: (kiddo: boolean) =>
                SAVE.data.b.svr && !player.metadata.voidkey?.room.startsWith('_frontier') // NO-TRANSLATE

                    ? ['<25>{#p/asriel1}{#f/20}* Quem mora aqui deve gostar muito de pelúcias.']
                    : [
                        SAVE.data.b.ufokinwotm8
                            ? '<32>{#p/human}* (Você olha desinteressado para a pelúcia macia.)'
                            : "<32>{#p/basic}* Eu vejo que não sou o único que gosta de coisas mais resistentes.",
                        ...(kiddo ? ['<25>{#p/kidd}{#f/3}* Aw, fofo.'] : [])
                    ],
            computer: (kiddo: boolean) =>
                SAVE.data.b.svr && !player.metadata.voidkey?.room.startsWith('_frontier') // NO-TRANSLATE

                    ? [
                        '<25>{#p/asriel1}{#f/15}* Uma vez eu me dediquei a aprender código...',
                        '<25>{#p/asriel1}{#f/16}* ... seja lá quem escreveu aquela coisa deveria reconsiderar as escolhas de vida.'
                    ]
                    : [
                        SAVE.data.b.ufokinwotm8
                            ? '<32>{#p/human}* (Você pergunta se algo assim seria a resposta da sua insatisfação.)'
                            : '<32>{#p/basic}* Códigos coloridos de texto preenchem a tela com uma fonte mono espaçada.',
                        ...(kiddo ? ['<25>{#p/kidd}{#f/1}* O quão VELHO é essa coisa?'] : [])
                    ],
            flowers: (kiddo: boolean) =>
                SAVE.data.b.svr && !player.metadata.voidkey?.room.startsWith('_frontier') // NO-TRANSLATE

                    ? ['<25>{#p/asriel1}{#f/10}* Huh?\n* Que tipo de flor seria essa?']
                    : [
                        SAVE.data.b.ufokinwotm8
                            ? '<32>{#p/human}* (Você se pergunta de onde essas flores devem ter vindo.)'
                            : '<32>{#p/basic}* Flores, o símbolo universal do sentimentalismo.',
                        ...(kiddo ? ["<25>{#p/kidd}{#f/1}* Eu não acho que já tenha visto ESTE tipo de flores antes..."] : [])
                    ],
            x_window: () =>
                SAVE.data.b.ufokinwotm8
                    ? ["<32>{#p/human}* (Você consegue dizer que será um dia de variedade.)"]
                    : [
                        ...(SAVE.data.b.svr ? ["<32>{#p/human}* (Você consegue dizer que será um dia legal.)"] : []),
                        "<32>{#p/basic}* É o começo de um novo dia."
                    ],
            x_cab: () =>
                SAVE.data.b.ufokinwotm8
                    ? ["<32>{#p/human}* (É uma cabine cheia de roupas das quais você se sente indiferente.)"]
                    : [
                        ...(SAVE.data.b.svr ? ["<32>{#p/human}* (É uma cabine cheia de suas roupas favoritas.)"] : []),
                        '<32>{#p/basic}* Várias roupas podem ser encontradas na cabine.'
                    ],
            x_bed: () =>
                SAVE.data.b.ufokinwotm8
                    ? ["<32>{#p/human}* (É uma cama.)\n* (Você desejava só poder voltar a dormir.)"]
                    : [
                        ...(SAVE.data.b.svr
                            ? ["<32>{#p/human}* (É uma cama confortável.)\n* (Você teve uma ótima noite de sono.)"]
                            : []),
                        "<32>{#p/basic}* É novo, só para você."
                    ],
            x_lamp: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ["<32>{#p/human}* (É uma lâmpada.)\n* (É a altura certa para você alcançá-la.)"]
                    : []),
                ...(SAVE.data.b.ufokinwotm8 ? [] : ["<32>{#p/basic}* É uma ordinária lâmpada pequena."])
            ],
            x_toybox: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (Os brinquedos são menos interessantes que antes.)']
                    : [
                        ...(SAVE.data.b.svr
                            ? ['<32>{#p/human}* (Os brinquedos parecem interessantes pela primeira vez.)']
                            : []),
                        "<32>{#p/basic}* Talvez brinquedos não sejam tão ruins depois de tudo..."
                    ],
            x_wash: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (Você olha para o ralo.)']
                    : [
                        ...(SAVE.data.b.svr
                            ? ['<32>{#p/human}* (Mas suas mãos já estão mais limpas do que conseguem.)']
                            : ['<32>{#p/human}* (Você se pergunta se suas mãos poderiam estar um pouco mais limpas.)']),
                        "<32>{#p/basic}* É uma pia.\n* Não gaste muito tempo pensando nisso."
                    ],
            x_toilet: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (Você ignora a privada.)']
                    : [
                        ...(SAVE.data.b.svr
                            ? ['<32>{#p/human}* (Você levanta a tampa da privada.)\n* (Depois você abaixa ela de novo.)']
                            : []),
                        ...(SAVE.data.b.ufokinwotm8 ? [] : ["<32>{#p/basic}* É uma privada.\n* O que mais seria."])
                    ],
            x_bathrub: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (Você se questiona se um banho quente te faria sentir melhor.)']
                    : [
                        ...(SAVE.data.b.svr ? ['<32>{#p/human}* (Você começa a pensar no seu próximo banho quente.)'] : []),
                        '<32>{#p/basic}* Tudo nesse cômodo é exatamente para o seu tamanho...'
                    ],
            x_mirror: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (Ao olhar para o espelho, você reflete sobre a jornada que te trouxe até aqui.)']
                    : []),
                ...(SAVE.data.b.ufokinwotm8 ? [] : ["<32>{#p/basic}* Não importa o que aconteça, sempre será você."])
            ],
            x_sign1: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (O sinal descreve a adaptação à vida em um novo planeta.)']
                    : []),
                ...(SAVE.data.b.ufokinwotm8
                    ? []
                    : [
                        '<33>{#p/basic}* É um guia de cinco passos sobre como amar à vida ligada ao planeta.\n* Todos eles equivalem a \"divirta-se.\"'
                    ])
            ],
            x_sign2: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (A placa descreve as tarefas que ainda não foram concluídas.)']
                    : []),
                ...(SAVE.data.b.ufokinwotm8
                    ? []
                    : ["<33>{#p/basic}* É uma lista de várias tarefas pendentes para construir uma nova comunidade."])
            ],
            x_plant: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (Você olha para a planta e suspira enquanto ela suspira para você.)']
                    : [
                        ...(SAVE.data.b.svr
                            ? ['<32>{#p/human}* (Você olha para a planta e sorri conforme ela sorri de volta.)']
                            : []),
                        '<32>{#p/basic}* Está planta sempre estará feliz em te ver.'
                    ],
            x_desk: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (Você olha para o diário vazio, desejando poder escrever sua própria história.)']
                    : [
                        ...(SAVE.data.b.svr
                            ? [
                                '<32>{#p/human}* (Você olha para o diário vazio, se questionado das histórias que ainda serão contadas.)'
                            ]
                            : []),
                        "<32>{#p/basic}* É um diário.\n* Está completamente em branco.",
                        "<32>{#p/basic}* A cadeira favorita de escrita do Asgore deve estar no ônibus de transporte."
                    ],
            x_paperwork: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (Você se pergunta se algum desses ítens te pertence.)']
                    : []),
                ...(SAVE.data.b.ufokinwotm8
                    ? []
                    : ['<32>{#p/basic}* Os documentos listam vários itens que ainda não foram pegos.'])
            ],
            x_trash: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ["<32>{#p/human}* (Você não sabe o que tem no lixo...)"]
                    : []),
                ...(SAVE.data.b.ufokinwotm8
                    ? []
                    : ["<32>{#p/basic}* Há uma receita amassada para o Chá Estrelado.\n* Essa não é a lata de lixo dele..."])
            ],
            x_bed_large: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (A cama ainda parece ser grande demais para você.)']
                    : []),
                ...(SAVE.data.b.ufokinwotm8 ? [] : ["<32>{#p/basic}* Será uma cama tamanho rei."])
            ],
            x_cactus: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (Você toca o cactus.)\n* (Ele te toca de volta.)']
                    : [
                        ...(SAVE.data.b.svr
                            ? [
                                '<32>{#p/human}* (Você tova o cacto.)\n* (O cacto está cativado pelo seu senso de afeição.)'
                            ]
                            : []),
                        '<32>{#p/basic}* Então ela finalmente desistiu de seu vício em cactos, eh...?'
                    ],
            x_booktable: () =>
                SAVE.data.b.ufokinwotm8
                    ? ["<32>{#p/human}* (Mas você não estava no clima para ler diários.)"]
                    : [
                        ...(SAVE.data.b.svr
                            ? ['<32>{#p/human}* (O livro contém as entradas de diário do Criança Monstro.)']
                            : ["<32>{#p/basic}* É o diário da Criança Monstro.\n* As páginas estão cobertas por pequenas marcas de mordida."]),
                        '<32>{#p/human}* (Você lê a primeira e única entrada...)',
                        '<32>{#p/kidding}* \"Então Asgore é meu pai agora huh? É estranho, mas tão LEGAL!\"',
                        '<32>{#p/kidding}* \"Asgore disse que eu deveria arranjar umas roupas novas, então talvez eu faça isso.\"',
                        '<32>{#p/kidding}* \"Ele também disse que eu deveria começar a escrever meus pensamentos em um diário.\"',
                        '<32>{#p/kidding}* \"Eu sou muito bom em leitura e escrita, então isso deve ser fácil.\"',
                        '<32>{#p/kidding}* \"E Frisk pode me ajudar se eu fizer algo errado!\"',
                        '<32>{#p/kidding}* \"Frisk se você estiver lendo isso me avise se eu fiz algo errado.\"',
                        '<32>{#p/human}* (Você fecha o diário.)'
                    ],
            x_bed_left: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ["<32>{#p/human}* (Você verifica debaixo das cobertas para ter certeza de que é seguro dormir.)"]
                    : []),
                ...(SAVE.data.b.ufokinwotm8 ? [] : ["<32>{#p/basic}* É a cama do Criança Monstro."])
            ],
            x_knickknacks: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (Você reorganiza as bugigangas para passar o tempo.)\n* (Você espera que ninguém perceba.)']
                    : []),
                ...(SAVE.data.b.ufokinwotm8 ? [] : ["<32>{#p/basic}* É uma prateleira cheia de brinquedos e bugigangas."])
            ],
            x_bed_right: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* (Você acaricia o pelúcia.)\n* (Talvez seja só você, mas ele parece um pouco feliz.)',
                        "<32>{#p/basic}* É a cama de Asriel.\n* Não parece ter sido usada ainda."
                    ]
                    : [],
            x_bookshelf: (() => {
                const pages = pager.create(
                    1,
                    [
                        '<32>{#p/basic}* \"MAPA GEOLÓGICO DE EURYBIA\"\n* \"Criado pela Divisão de Ciência Real (DCR).\"',
                        '<32>* \"Checagens preliminares na superfície revelaram vasta diversidade no ecossistema.\"',
                        '<32>* \"Cada sessão dessa análise será concentrada em tipos específicos de bioma.\"',
                        '<32>* \"A sessões seguidas são.\"',
                        '<32>* \"SESSÃO 001 - Subterrâneo\" \n* \"SESSÃO 002 - Oceano\"\n* \"SESSÃO 003 - Estrutural\"',
                        '<32>* \"SESSÃO 004 - Magnético\"\n* \"SESSÃO 005 - Aérea\"\n* \"SESSÃO 006 - Florestal\"',
                        '<32>* \"SESSÃO 007 - Espiral\"\n* \"SESSÃO 008 - Metálica\"\n* \"SESSÃO 009 - Cristalina\"',
                        "<32>* Senhor, quantas tem?\n* Vamos só parar de ler, aqui."
                    ],
                    [
                        '<32>{#p/basic}* \"Olá, senhores jardineiros.\"',
                        '<32>* \"Quando se fala de flores Estreladas, a linha entre crescimento e estagnação...\"',
                        '<32>* \"É acesso a espaço aberto.\"',
                        '<32>* \"É por isso que elas normalmente crescem em Aerialis...\"',
                        '<32>* \"Por agora, em Eurybia, o melhor lugar para crescimento é desconhecido.\"',
                        '<32>* \"No momento, é recomendado que elas cresçam em órbita.\"',
                        '<32>* \"A estação cinco será implantada na data K-615.12.\"',
                        '<32>* \"Se essa data ainda não tiver chegado, uma nave espacial irá bastar.\"'
                    ],
                    [
                        '<32>{#p/basic}* \"No começo, não havia nada.\"',
                        '<32>* \"Então... o humano apareceu no ar.\"',
                        '<32>* \"O humano e o coelho deram um ao outro um belo abraço...\"',
                        '<32>* \"Mas então...!\"\n* \"O humano e o coelho não podiam mais abraçar.\"',
                        '<32>* \"Chocante!\"\n* \"Suas visões de mundo foram abaladas em seus núcleos.\"',
                        '<32>* \"Depois, após muito tempo passar, o humano começou a trabalhar em uma solução.\"',
                        '<32>* \"Dia após dia, o humano trabalhou incansavelmente, tudo para poder abraçar o coelho novamente.\"',
                        '<32>* \"Eventualmente... o trabalho do humano foi concluído e o coelho estava pronto.\"',
                        '<32>* \"O humano abriu seus braços, esperando que o coelho se aproxime...\"',
                        '<32>* \"Antes dele perceber, o coelho já estava em seus braços!\"',
                        '<32>* \"E assim o humano e o coelho viveram fofamente.\"'
                    ],
                    () =>
                        SAVE.data.b.c_state_secret3_used
                            ? [
                                '<32>{#p/basic}* \"Reportando experimento de buraco de minhoca.\"\n* \"De Dr. Alphys para Asgore\"',
                                '<32>* \"Progresso do buraco de minhoca está indo bem!\"',
                                '<32>* \"Desde que Frisk encaminhou as equações do professor, fiz um progresso constante.\"',
                                '<32>* \"Eu tenho conseguido transportar pequenos objetos entre espaços...\"',
                                '<32>* \"No meu próximo teste, enviarei um scanner conectado e verei o que ele capta.\"',
                                '<32>* \"Buracos de minhoca para viagem de monstros pode estar pronta até K-616.05!\"'
                            ]
                            : [
                                '<32>{#p/basic}* \"Reportagem do experimento de buraco de minhoca.\"\n* \"De Dr. Alphys para Asgore\"',
                                '<32>* \"Progresso no experimento do buraco de minhoca encontrou um obstáculo.\"',
                                '<32>* \"Os cálculos incompletos do professor não foram suficientes para continuar trabalhando.\"',
                                '<32>* \"Eu vou continuar tentando, mas não posso ir tão longe ser por minha vida em risco.\"',
                                '<32>* \"No meu próximo experimento, verei se consigo fazer com que a abertura dure um pouco mais...\"',
                                '<32>* \"Buracos de minhoca para monstros viajarem não chegaram nenhum momento tão cedo.\"'
                            ],
                    [
                        '<32>{#p/basic}* \"Você recebeu um convite para o triunfo da nave de transporte!\"',
                        '<32>* \"Os eventos serão sediados do começo ao fim, incluindo corridas de carros voadores e dança de rave!\"',
                        '<32>* \"Quando chegarmos ao mundo natal, um evento final será sediado na atmosfera!\"',
                        '<32>* \"Está será uma experiência que você não irá querer perder, então levanta e se prepara enquanto pode!\"',
                        '<32>* \"Por favor note que este convite expira assim que chegarmos no planeta natal.\"',
                        '<32>* \"Mal posso esperar pra te ver lá!\"'
                    ],
                    [
                        '<32>{#p/basic}* \"Guia de cuidados com a pele de Toriel, datado de K-614.09.\"',
                        '<32>* \"Ao trocar pelos, deve-se sempre tomar muito cuidado para descartar adequadamente.\"',
                        '<32>* \"A lixeira é uma escolha óbvia, mas minha preferência pessoal é sempre a pia.\"',
                        '<32>* \"Se você troca de pelos com facilidade, considere uma pia com local de descarte.\"',
                        '<32>* \"Em relação a maciez, o lado que você dorme também afeta os resultados.\"',
                        '<32>* \"Se você prefere que sua cabeça ou corpo estejam macios, durma de lado.\"',
                        '<32>* \"Para manter seus braços e pernas macios, durma de lado.\"',
                        '<32>* \"Obrigado queridos leitores.\"\n* \"Por hoje é só.\"'
                    ]
                );
                return () =>
                    SAVE.data.b.ufokinwotm8
                        ? ["<32>{#p/human}* (Mas você não estava afim de ler o livro.)"]
                        : [
                            ...(SAVE.data.b.svr
                                ? [
                                    '<32>{#p/human}* (Os livros nesta estante são capazes de mudar o conteúdo por demanda.)'
                                ]
                                : [
                                    '<32>{#p/basic}* Os livros estão todos em branco, mas são preenchidos com texto do livro de sua escolha.'
                                ]),
                            "<32>{#p/human}* (Você seleciona um livro do painel de controle, e escolhe pega assim que estiver pronto...)",
                            ...pages(),
                            '<32>{#p/human}* (Você coloca o livro de volta.)'
                        ];
            })(),
            x_endtable: () =>
                SAVE.data.b.ufokinwotm8
                    ? [
                        SAVE.data.b.water
                            ? '<32>{#p/human}* (Você observa o fim da mesa, e um copo no fim dela.)\n* (Parece um distúrbio.)'
                            : '<32>{#p/human}* (Você observa o mesa.)\n* (Parece perturbado.)'
                    ]
                    : [
                        ...(SAVE.data.b.svr
                            ? [
                                SAVE.data.b.water
                                    ? '<32>{#p/human}* (Você observa o final da mesa e o copo em cima dela.)\n* (Parece ótimo.)'
                                    : '<32>{#p/human}* (Você observa o final da mesa.)\n* (Parece ótimo.)'
                            ]
                            : []),
                        '<32>{#p/basic}* Enfim...\n* Uma final de mesa notável.',
                        ...(SAVE.data.b.water
                            ? [
                                '<33>{#p/basic}* Ainda tem um copo de fluido de eletro-amortecimento.\n* Um verdadeiro líquido a se confiar.'
                            ]
                            : [])
                    ],
            x_chasgore: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? SAVE.data.b.svr && SAVE.data.b.c_state_secret1_used && SAVE.data.b.c_state_secret5_used
                        ? ['<32>{#p/human}* (A cadeira te assusta estando exatamente onde deve estar.)']
                        : SAVE.data.b.svr || (SAVE.data.b.c_state_secret1_used && SAVE.data.b.c_state_secret5_used)
                            ? ['<32>{#p/human}* (A cadeira te assusta estando bem colocada demais.)']
                            : ['<32>{#p/human}* (A cadeira te assusta estando fora do lugar.)']
                    : []),
                ...(SAVE.data.b.ufokinwotm8
                    ? []
                    : ['<32>{#p/basic}* Uma cadeira de leitura confortável...', "<32>* Não parece do tamanho certo para Asgore."])
            ],
            x_window_left: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (Encarando a janela, você se pergunta o que deu errado para merecer este sentimento.)']
                    : [
                        ...(SAVE.data.b.svr
                            ? [
                                '<32>{#p/human}* (Encarando a janela, você sente nada além de animação pelo futuro a frente.)'
                            ]
                            : []),
                        '<32>{#p/basic}* A janela acentua a atmosfera lá fora.'
                    ],
            x_window_right: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (Olhando pela janela, você se questiona o por que das coisas terem acabado assim.)']
                    : [
                        ...(SAVE.data.b.svr
                            ? [
                                "<32>{#p/human}* (Encarando a janela, você se lembra de quanto tempo esperou para chegar aqui.)"
                            ]
                            : []),
                        '<32>{#p/basic}* A janela melhora a atmosfera interna.'
                    ],
            x_plant_left: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (Você toca a planta suavemente.)\n* (Ela entende sua dor.)']
                    : [
                        ...(SAVE.data.b.svr
                            ? [
                                '<32>{#p/human}* (Você toca a planta suavemente.)\n* (Ela balança e alivia, feliz por te ver aqui.)'
                            ]
                            : []),
                        '<33>{#p/basic}* Uma planta com compaixão.'
                    ],
            x_plant_right: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (Você toca a planta suavemente.)\n* (Ela promete que as coisas irão melhorar para você.)']
                    : [
                        ...(SAVE.data.b.svr
                            ? ['<32>{#p/human}* (Você toca a planta suavemente.)\n* (Ela aprecia o gesto.)']
                            : []),
                        '<32>{#p/basic}* Uma planta otimista.'
                    ],
            x_sign3: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ["<32>{#p/human}* (O sinal não parece conter nada digno de nota.)"]
                    : []),
                ...(SAVE.data.b.ufokinwotm8
                    ? []
                    : [
                        "<32>{#p/basic}* É um foto digital por frame.\n* Tudo que precisa agora são algumas boas memórias com visual."
                    ])
            ],
            x_chair1: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (Você nota o tamanho da mesa de jantar.)']
                    : []),
                ...(SAVE.data.b.ufokinwotm8
                    ? []
                    : SAVE.data.b.svr && SAVE.data.b.c_state_secret1_used && SAVE.data.b.c_state_secret5_used
                        ? ["<32>{#p/basic}* Uma das cadeiras de jantar do Asgore.\n* Para uma mãe."]
                        : SAVE.data.b.svr || (SAVE.data.b.c_state_secret1_used && SAVE.data.b.c_state_secret5_used)
                            ? ["<32>{#p/basic}* Uma das cadeiras de jantar do Asgore.\n* Ainda para uma rainha."]
                            : ["<32>{#p/basic}* Uma das cadeiras de jantar do Asgore.\n* Não parece ser para ninguém."])
            ],
            x_chair2: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (Você nota o pequeno tamanho da cadeira de jantar.)']
                    : []),
                ...(SAVE.data.b.svr
                    ? ["<32>{#p/basic}* Uma das cadeiras de jantar do Asgore.\n* Para um irmão."]
                    : SAVE.data.b.ufokinwotm8
                        ? []
                        : ["<32>{#p/basic}* Uma das cadeiras de jantar do Asgore.\n* Não parece ser para ninguém."])
            ],
            x_chair3: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (Você se pergunta se nesta cadeira ainda cabe um pequeno anjo.)']
                    : [
                        ...(SAVE.data.b.svr
                            ? [
                                '<32>{#p/human}* (Você nota o perfeito tamanho da cadeira de jantar.)',
                                "<32>{#p/basic}* Ela é para você, Frisk."
                            ]
                            : ["<32>{#p/basic}* Uma das cadeiras de jantar do Asgore.\n* Para uma criança."])
                    ],
            x_chair4: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (Você nota o pequeno tamanho da cadeira de jantar.)']
                    : []),
                ...(SAVE.data.b.svr
                    ? ["<32>{#p/basic}* Uma das cadeiras de jantar do Asgore.\n* Para um irmão."]
                    : SAVE.data.b.ufokinwotm8
                        ? []
                        : SAVE.data.b.f_state_kidd_betray
                            ? ["<32>{#p/basic}* Uma das cadeiras de jantar do Asgore.\n* Não parece ser para ninguém."]
                            : ["<32>{#p/basic}* Uma das cadeiras de jantar do Asgore.\n* Para um monstro."])
            ],
            x_chair5: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (Você nota o tamanho excepcional da cadeira de jantar.)']
                    : []),
                ...(SAVE.data.b.svr
                    ? ["<32>{#p/basic}* Uma das cadeiras de jantar do Asgore.\n* Para um pai."]
                    : SAVE.data.b.ufokinwotm8
                        ? []
                        : ["<32>{#p/basic}* Uma das cadeiras de jantar do Asgore.\n* Para um rei."])
            ],
            x_fridge: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (Você coloca sua mão na parte exterior da geladeira.\n* (Ela treme duramente.)']
                    : [
                        ...(SAVE.data.b.svr
                            ? ['<32>{#p/human}* (Você coloca as mãos na parte externa da geladeira.)\n* (Ela ronrona suavemente.)']
                            : []),
                        ...[
                            ['<32>{#p/basic}* Este freezer está praticamente vazio, salvo apenas por um copo de água da Undyne.'],
                            [
                                '<32>{#p/basic}* A geladeira está quase vazia, exceto por uma única garrafa de ponche exoberry da Undyne.'
                            ],
                            [
                                '<32>{#p/basic}* O freezer está praticamente vazio, salvo apenas por uma caneca de chocolate quente da Undyne.',
                                "<32>* ... já está bem fria agora."
                            ],
                            [
                                '<32>{#p/basic}* A geladeira está vazia, salvo por um único copo de chá Estralado da Undyne.',
                                "<32>* ... já está bem fria agora."
                            ]
                        ][SAVE.data.n.undyne_drink]
                    ],
            x_sink: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ["<32>{#p/human}* (Surpreendentemente você não consegue achar nenhum resíduo na pia.)"]
                    : []),
                ...(SAVE.data.b.ufokinwotm8
                    ? []
                    : ['<32>{#p/basic}* Sem pelo, sem cabelo...\n* Incrível, os poderes da tecnologia.'])
            ],
            x_drawer: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (Você abre a gaveta, e acaricia o cachorro dentro dela.)']
                    : [
                        ...(SAVE.data.b.svr ? ['<32>{#p/human}* (Você abre a gaveta e balança as mãos cumprimentado.)'] : []),
                        '<32>{#p/basic}* Aquele cachorro, na gaveta...\n* Melhor não deixar o Papyrus saber sobre isso.'
                    ],
            x_stove: () =>
                SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (Você se pergunta se o fogão vai colocar fogo nesta casa, também.)']
                    : [
                        ...(SAVE.data.b.svr
                            ? ['<32>{#p/human}* (Você se questiona os tipos de delícia que serão feitas aqui.)']
                            : []),
                        "<32>{#p/basic}* É o mesmo modelo do fogão da Undyne...",
                        '<32>* Nós podemos apenas esperar que ele esteja equipado com travas de segurança desta vez.'
                    ],
            x_sign4: () => [
                ...(SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                    ? ['<32>{#p/human}* (O sinal lista instruções para um certa receita.)']
                    : []),
                ...(SAVE.data.b.ufokinwotm8
                    ? []
                    : [
                        '<32>{#p/basic}* Tucca Zunasca, um novo tipo de sopa para um novo tipo de mundo.',
                        '<32>* Em uma panela, doure uma salsicha, adicionando flocos de pimenta picante conforme necessário.',
                        '<32>* Adicione dois Kriatas de caldo básico e leve a panela para ferver.',
                        '<32>* Para melhor resultado adicione fogo mágico. Caso não tenha, chamas oxigenadas servirão.',
                        '<32>* Corte meio quilo de batatas Eurybianas em cubos e coloque-as na panela fervente.',
                        '<32>* Assim que a mistura começar a brilhar, comece a adicionar chantilly e caldo de pássaros.',
                        '<32>* Por enquanto, obtenha o creme da copa da videira gigante. Outras fontes podem ser encontradas mais tarde.',
                        '<32>* Além disso, couve ou kretaada podem ser adicionadas e cozidas em alta intensidade até ficarem macias.',
                        '<32>* Depois de concluída, sua sopa deve estar pronta para a mesa!'
                    ])
            ]
        },
        moniker: [
            ['Destruidor de Corações', 'Destruidor de Corações', 'Destruidor de Corações', 'Corações- destruidor'],
            ['A Criança Amarela', 'Criança Amarela', 'Criança', 'Criança Amarela'],
            ['A Tempestade Chegando', 'Tempestade Chegando', 'Tempestade', 'Tempestade Chegando'],
            ['Super Raivoso', 'Super Raivoso', 'Raivoso', 'Super Raivoso'],
            ['Invasor Espacial', 'Invasor Espacial', 'Invasor', 'Invasor Espacial']
        ] as [string, string, string, string][]
    },

    b_act: {
        kiss: '* Beijo ',
        activate: '* Ativar',
        advice: '* Conselho',
        agree: '* Concordar',
        alphys: '* Alphys',
        analyze: '* Analisar',
        annoy: '* Incomodar',
        appease: '* Apaziguar',
        approach: '* Aproximar',
        asgore: '* Asgore',
        asriel: '* Asriel',
        asrieldreemurr: '§fill=#ff7f7f§§swirl=2/1/1.05§§hue§* Asriel Dreemurr',
        bathe: '* Banho',
        beckon: '* Acenar',
        bedtime: '* Dormir',
        berate: '* Repreender',
        blind: '* Cegar',
        boast: '* Alardear',
        boo: '* Boo',
        boost: '* Impulsionar',
        bow: '* Arco',
        break: '* Quebrar',
        burn: '* Queimar',
        carry: '* Carregar',
        challenge: '* Desafiar',
        charge: '* Avançar',
        check: '* Checar',
        cheer: '* Aclamar',
        clean: '* Limpar',
        cocoa: '* Cocoa',
        comfort: '* Confortar',
        compliment: '* Elogiar',
        compose: '* Compor',
        conclude: '* Concluir',
        console: '* Consolar',
        counter: '* Defesa',
        create: '* Criar',
        criticize: '* Criticar',
        cuddle: '* Acariciar',
        cut: '* Cortar',
        dance: '* Dançar',
        dream: '* Sonho',
        dinnertime: '* Hora da Janta',
        direct: '* Direção',
        disarm: '* Disarmar',
        disown: '* Desonrar',
        diss: '* Diss',
        distance: '* Distancia',
        distract: '* Distrair',
        ditch: '* Trincheira',
        dontpick: '* Não Pegar no Pé',
        encourage: '* Encorajar',
        escort: '* Escolta',
        flash: '* Luz ',
        flirt: '* Flertar',
        grin: '* Sorriso',
        guide: '* Guia',
        handshake: '* Aperto de Mão',
        hangout: '* Dar Volta',
        heckle: '* Incomodar',
        heel: '* Giro',
        highfive: '* Toque de Mão',
        home: '* Casa',
        hope: '* Esperança',
        hug: '* Abraço',
        hum: '* Canto',
        hypothesize: '* Supor',
        ignore: '* Ignorar',
        inquire: '* Perguntar',
        insult: '* Insultar',
        joke: '* Piada',
        agreement: '* Um Acordo',
        call: '* Ligação',
        dinner: '* Jantar',
        judgement: '* Julgamento',
        laugh: '* Rir',
        lecture: '* Leitura',
        leech: '* Sanguessuga',
        lesson: '* Lição',
        mislead: '* Desencaminhar',
        mix: '* Mistura',
        mystify: '* Mistificar',
        notes: '* Notas',
        object: '* Objeto',
        papyrus: '* Papyrus',
        password: '* Senha',
        pat: '* Tapinha',
        pay: '* Pagar',
        perch: '* Poleiro',
        pet: '* Cuidar',
        pick: '* Escolher',
        play: '* Brincar',
        playdead: '* Fingir Morto',
        plead: '* Alegar',
        pluck: '* Depenar',
        poke: '* Cutucar',
        pose: '* Posar',
        praise: '* Louvar',
        promise: '* Promessa',
        punch: '* Bater',
        puzzle: '* Armadilha',
        puzzlehelp: '* Ajuda com Desafio',
        rap: '* Rap',
        reassure: '* Re-tranquilizar',
        release: '* Soltar',
        resniff: '* Re-Cheirar',
        rest: '* Descanso',
        roll: '* Rolar',
        sample: '* Teste',
        sans: '* Sans',
        scream: '* Gritar',
        secret: '* Segredo',
        shout: '* Espernear',
        shove: '* Empurrar',
        siphon: '* Sifão',
        sit: '* Sentar',
        slap: '* Tapa',
        smile: '* Sorriso',
        someoneelse: '* Alguém a mais',
        spark: '* Fagulha',
        stare: '* Encarar',
        steal: '* Roubar',
        storytime: '* História',
        suggest: '* Sugestão',
        talk: '* Conversar',
        taunt: '* Zombar',
        tea: '* Chá',
        telloff: '* Repreenda',
        terrorize: '* Aterrorizar',
        test_a: '* Ligação',
        test_b: '* Prótese',
        test_c: '* Infusão',
        threaten: '* Ameaçar',
        tickle: '* Cócegas',
        topple: '* Derrubar',
        toriel: '* Toriel',
        translate: '* Traduzir',
        travel: '* Viagem',
        trivia: '* Trivia',
        tug: '* Rebocador',
        turn: '* Virar',
        undyne: '* Undyne',
        walk: '* Andar',
        water: '* Água',
        whisper: '* Cochichar',
        whistle: '* Assobiar',
        yell: '* Gritar'
    },

    b_group_common: {
        nobody: () => (!world.genocide && world.bullied ? '* ... mas todos correram.' : '* ... mas ninguém veio.')
    },

    b_opponent_dummy: {
        act_check: ["<32>{#p/story}* DUMMY - ATQ 0 DEF 0\n* Um fantasma dentro da concha, ele espera que você esteja de boa."],
        act_flirt: [
            '<32>{#p/human}* (Você flerta com o boneco.)',
            "<32>{#p/basic}* Foi exatamente como você esperava.",
            '<32>* Toriel está tentando não dar risada.'
        ],
        act_hug: ['<32>{#p/human}* (Você abraça o boneco.)'],
        act_slap: ['<32>{#p/human}* (Você da um tapa no boneco.)'],
        act_talk: [
            '<32>{#p/human}* (Você fala com o boneco.)',
            "<32>{#p/basic}* Ele não parece muito querer conversar.",
            '<32>* Toriel está feliz por você.'
        ],
        bored: ['<32>{#p/basic}* O boneco se cansou de suas travessuras sem sentido.'],
        hugged: ['<32>{#p/basic}* O boneco está corando... de alguma forma.'],
        name: '* Dummy',
        slapped: ['<32>{#p/basic}* De repente...!'],
        status1: ['<32>{#p/story}* Você encontrou o boneco.'],
        status2: ["<32>{#p/story}* O boneco parece estar ficando entediado."],
        status3: ["<32>{#p/story}* O boneco parece ter se perdido no personagem."],
        status4: ["<32>{#p/story}* O boneco parece que vai cair no chão."],
        talk: ['<09>{#p/basic}{#i/20}{~}.....{}']
    },
    b_opponent_maddummy: {
        epiphaNOPE1: ["<11>{#p/basic}{~}{#x3}Ugh, você só está me fazendo PERDER tempo!"],
        epiphaNOPE2: ['<08>{#p/basic}{~}Oh... que estranho.'],
        act_check: () =>
            16 <= SAVE.data.n.kills_wastelands
                ? ["<32>{#p/story}* BONECO FELIZ - ATQ 0 DEF 0\n* Um sonho se torna realidade!"]
                : ['<32>{#p/story}* BONECO IRRITADO - ATQ 30 DEF 255\n* Impenetrável a ataques físicos.'],
        act_flirt: () =>
            16 <= SAVE.data.n.kills_wastelands
                ? [
                    '<32>{#p/human}* (Você flerta com o Boneco Feliz.)',
                    "<32>{#p/basic}* Ele está distraído demais para ouvir."
                ]
                : ['<32>{#p/human}* (Você flerta com o Boneco Irritado.)', "<32>* Foi exatamente como você esperava."],
        act_hug: () =>
            16 <= SAVE.data.n.kills_wastelands
                ? ['<32>{#p/human}* (Você abraça o Boneco Feliz.)']
                : ['<32>{#p/human}* (Você abraça o Boneco Irritado.)'],
        act_slap: () =>
            16 <= SAVE.data.n.kills_wastelands
                ? [
                    '<32>{#p/human}* (Você da um tapa no Boneco Feliz.)',
                    '<32>{#p/basic}* Boneco Feliz aceita a melhor parte disso e sai do seu caminho.'
                ]
                : ['<32>{#p/human}* (Você da um tapa no Boneco Irritado.)'],
        act_talk: () =>
            16 <= SAVE.data.n.kills_wastelands
                ? [
                    '<32>{#p/human}* (Você fala com o Boneco Feliz.)',
                    "<32>{#p/basic}* Ele está distraído demais para ouvir."
                ]
                : [
                    '<32>{#p/human}* (Você fala com o Boneco Irritado.)',
                    "<32>* Ele não parece querer conversar.",
                    '<32>* Ninguém está feliz com tal situação.'
                ],
        boredTalk: [
            '<11>{#p/basic}{~}{#x3}Mas que inferno?',
            '<11>{#p/basic}{~}{#x1}Por que NADA está acon- tecendo?',
            '<11>{#p/basic}{~}{#x4}Eu SOU INVISÍVEL para você ou algo assim?',
            '<11>{#p/basic}{~}{#x4}...',
            "<11>{#p/basic}{~}{#x4}EU NEM POSSO FICAR IRRITADO COM VOCÊ!!!",
            "<11>{#p/basic}{~}{#x4}Você é tão... INANIMADO!",
            '<11>{#p/basic}{~}{#x4}SÓ... GAHH!\nSÓ SOME DE PERTO DE MIM!',
            '<11>{#p/basic}{~}{#x4}VÁ ESCUTAR MÚSICA COM O NAPSTABLOOK OU SEI LÁ!'
        ],
        changeStatus1: ['<32>{#p/story}* Boneco Irritado está espalhando algodão por todo o chão.'],
        changeStatus2: ['<32>{#p/story}* Zumbidos mecânicos enchem a sala.'],
        fightFail: [
            '<11>{#p/basic}{~}{#x1}Tolo.\nTolo!\nTOLO!',
            '<11>{#p/basic}{~}{#x3}Mesmo que você ataque meu corpo...',
            "<11>{#p/basic}{~}{#x4}... você NUNCA irá ME ferir!",
            "<11>{#p/basic}{~}{#x1}Eu ainda sou incorporeo, seu burro!!!"
        ],
        final1: () => [
            "<11>{#p/napstablook}{~}desculpa, eu interrompi vocês, não foi...",
            '<11>{#p/napstablook}{~}assim que eu cheguei, seu amigo saiu correndo...',
            ...(SAVE.data.n.state_wastelands_napstablook === 2
                ? [
                    "<11>{#p/napstablook}{~}oh espera...\nfoi você que me atacou antes...",
                    "<11>{#p/napstablook}{~}uhhh...\nisso é constrangedor.",
                    '<11>{#p/napstablook}{~}desculpa...'
                ]
                : [
                    '<11>{#p/napstablook}{~}oh não... \nvocês pareciam estar se divertindo...',
                    '<11>{#p/napstablook}{~}oh não... \neu só queria dizer oi...',
                    '<11>{#p/napstablook}{~}oh não......\n...........\n...........\n...........\n...........'
                ])
        ],
        gladTalk1: ['<08>{#p/basic}{~}Valeu!'],
        gladTalk2: ['<08>{#p/basic}{~}Obrigado!'],
        gladTalk3: ['<08>{#p/basic}{~}Bom trabalho!'],
        gladTalk4: ['<08>{#p/basic}{~}Bravo!'],
        gladTalk5: ['<08>{#p/basic}{~}OK!'],
        gladTalk6: ['<08>{#p/basic}{~}...'],
        hugTalk1: () =>
            16 <= SAVE.data.n.kills_wastelands
                ? [
                    '<08>{#p/basic}{~}Minha fobia de abraço!',
                    "<08>{#p/basic}{~}Ela se foi!",
                    '<08>{#p/basic}{~}Muito obrigado... humano...',
                    "<08>{#p/basic}{~}Eu nunca me senti tão feliz."
                ]
                : SAVE.data.n.state_wastelands_dummy === 4
                    ? ['<11>{#p/basic}{~}{#x4}Sério isso?']
                    : ['<11>{#p/basic}{~}{#x3}N-não..!\nEu tenho fobia de abraço!'],
        hugTalk2: ['<11>{#p/basic}{~}{#x4}Para com isso!'],
        hugTalk3: ['<11>{#p/basic}{~}{#x2}Para com isso!'],
        hugTalk4: ['<11>{#p/basic}{~}{#x3}...'],
        name: () => (16 <= SAVE.data.n.kills_wastelands ? '* Boneco Feliz' : '* Boneco Irritado'),
        phase2Talk1: ["<11>{#p/basic}{~}{#x1}Eu vou te derrotar e tomar sua ALMA!"],
        phase2Talk2: ["<11>{#p/basic}{~}{#x1}Eu vou usar sua ALMA para quebrar o escudo de força!"],
        phase2Talk3: ['<11>{#p/basic}{~}{#x6}Os outros monstros irão me amar, me referenciar...!'],
        phase2Talk4: ['<11>{#p/basic}{~}{#x4}ENTÃO TUDO QUE EU QUERO SERÁ MEU!'],
        phase2Talk5: ["<11>{#p/basic}{~}{#x3}Huh?\nÉ, eu acho que também irei vingar meu primo."],
        phase2Talk6: ['<11>{#p/basic}{~}{#x5}Se meus outros primos se importar...?'],
        phase2Talk7: ['<11>{#p/basic}{~}{#x4}Dane-se.\nDane-se!\nDANE-SE!'],
        phase2Talk8: ['<11>{#p/basic}{~}{#x1}...'],
        phase3Talk1: ['<11>{#p/basic}{~}{#x1}BOTS BALÍSTICOS!\nMÍSSEIS MÁGICOS!'],
        phase3Talk2: ['<11>{#p/basic}{~}{#x3}BOTS BALÍSTICOS!\nTENTEM DE NOVO!'],
        phase3Talk3: ["<11>{#p/basic}{~}{#x5}BOTS BALÍSTICOS!\nSão uma droga???"],
        phase3Talk4: ['<11>{#p/basic}{~}{#x4}BOTS BALÍSTICOS!\nATAQUE FINAL!'],
        phaseChange1: [
            '<11>{#p/basic}{~}{#x2}OWWWW, seu BOBOS!!',
            '<11>{#p/basic}{~}{#x1}Olhem onde vocês miram seus ataques {@fill=#f00}MÁGICOS{@fill=#000}!',
            '<11>{#p/basic}{~}{#x4}...',
            '<11>{#p/basic}{~}{#x4}Ei!\nVocê!',
            '<11>{#p/basic}{~}{#x3}Esquece que eu disse qualquer coisa sobre {@fill=#f00}MAGIA{@fill=#000}.'
        ],
        phaseChange2a: ['<11>{#p/basic}{~}{#x4}EI GALERA!'],
        phaseChange2b1: [
            '<11>{#p/basic}{~}{#x1}Imbecis.\nImbecis!\nIMBECIS!',
            '<11>{#p/basic}{~}{#x3}Se lembram quando eu disse pra NÃO atirar em mim?',
            '<11>{#p/basic}{~}{#x3}Bem...'
        ],
        phaseChange2b2: ["<11>{#p/basic}{~}{#x4}FRACASSADOS!\nVOCÊS ESTÃO DEMITIDOS!\nVOU SUBSTITUIR TODOS VOCÊS!"],
        phaseChange2c: [
            '<11>{#p/basic}{~}{#x4}Hahaha.\nHahaha!\nHAHAHA!',
            "<11>{#p/basic}{~}{#x3}Agora você verá meu verdadeiro poder...",
            "<11>{#p/basic}{~}{#x6}Depender de gente que não é lixo!"
        ],
        phaseChange3a1: [
            '<11>{#p/basic}{~}{#x3}S... sem chance!',
            '<11>{#p/basic}{~}{#x3}Esses caras são piores que os de antes!'
        ],
        phaseChange3a2: [
            '<11>{#p/basic}{~}{#x1}Que liga.\nQuem liga!\nQUEM LIGA!',
            "<11>{#p/basic}{~}{#x4}EU NÃO PRECISO DE AMIGOS!!"
        ],
        phaseChange3b: ["<11>{#p/basic}{~}{#x6}EU TENHO FACAS!"],
        phaseChange3c1: ["<11>{#p/basic}{~}{#x3}Eu...", '<11>{#p/basic}{~}{#x3}Fiquei sem facas.'],
        phaseChange3c2: [
            "<11>{#p/basic}{~}{#x4}MAS NÃO IMPORTA!!!",
            "<11>{#p/basic}{~}{#x4}EU NÃO POSSO TE FERIR, VOCÊ NÃO PODE ME FERIR!",
            "<11>{#p/basic}{~}{#x1}VOCÊ FICARÁ AQUI LUTANDO COMIGO..."
        ],
        phaseChange3c3: ['<11>{#p/basic}{~}{#x1}Pra sempre.'],
        phaseChange3c4: ['<11>{#p/basic}{~}{#x4}Pra sempre!'],
        phaseChange3c5: ['<11>{#p/basic}{~}{#x6}PRA SEMPRE!!!!'],
        phaseChange3d: ['<11>{*}{#p/basic}{~}{#x6}AHAHAHAHA HAHAHAHAH AHAHAHAHA HAHAHAHAH AHAHAHAHA{%}'],
        phaseChange3e: [
            '<11>{*}{#p/basic}{~}{#x2}Qu...\nMas que droga é essa!?{^20}{%}',
            '<11>{*}{#p/basic}{~}{#x6}Ergh!\nChuva ácida!?{^20}{%}',
            "<11>{*}{#p/basic}{~}{#x4}ESQUECE!\nEu tô fora daqui!!{^20}{%}"
        ],
        randStatus1: ['<32>{#p/story}* Boneco Irritado está procurando a câmara de descompressão mais próxima para te jogar nela.'],
        randStatus2: ['<32>{#p/story}* Boneco Irritado está jogando suas balas para todo lado.'],
        randStatus3: ['<32>{#p/story}* Boneco Irritado olha para um portal e se vira para você com a mesma expressão.'],
        randStatus4: ['<32>{#p/story}* Boneco Irritado está por incrível que pareça, enlouquecendo.'],
        randStatus5: ['<32>{#p/story}* Cheira a uma fábrica têxtil.'],
        gladStatus1: ['<32>{#p/story}* Boneco Feliz está contente de estar aqui.'],
        gladStatus2: ["<32>{#p/story}* Boneco Feliz pensa em todas as maravilhas que ele fará."],
        gladStatus3: ['<32>{#p/story}* Boneco Feliz parece satisfeito.'],
        randTalk1: ['<11>{#p/basic}{~}{#x1}Tolo.\nTolo!\nTOLO!'],
        randTalk2: ['<11>{#p/basic}{~}{#x1}Fútil.\nFútil!\nFÚTIL!'],
        randTalk3: ['<11>{#p/basic}{~}{#x1}Pífio.\nPífio!\nPÍFIO!'],
        randTalk4: ['<11>{#p/basic}{~}{#x1}Fraco.\nFraco!\nFRACO!'],
        slapTalk1: ['<11>{#p/basic}{~}{#x6}Por que seu...!'],
        slapTalk2: ['<11>{#p/basic}{~}{#x4}Você tá de brincadeira??'],
        slapTalk3: ['<11>{#p/basic}{~}{#x2}Qual foi!'],
        slapTalk4: ['<11>{#p/basic}{~}{#x3}...'],
        status1: () =>
            16 <= SAVE.data.n.kills_wastelands
                ? ['<32>{#p/story}* Boneco Feliz te deixa ir.']
                : ['<32>{#p/story}* Boneco Irritado bloqueia o caminho!']
    },
    b_opponent_moldsmal: {
        epiphany: [
            ['<08>{#p/basic}{~}\x00*sons felizes*'],
            () =>
                world.meanie
                    ? ['<08>{#p/basic}{~}Squorch!']
                    : SAVE.data.b.oops && world.flirt > 9
                        ? ['<08>{#p/basic}{~}\x00*manobra erótica*']
                        : SAVE.data.b.oops
                            ? ['<08>{#p/basic}{~}\x00*manobra feliz*']
                            : ['<08>{#p/basic}{~}\x00*balança seus braços*'],
            ['<08>{#p/basic}{~}Balanço final.'],
            ['<08>{#p/basic}{~}\x00*movimento brilhante*']
        ],
        act_check0: ['<32>{#p/asriel2}* Gelatini, o bicho irracional.\n* O que mais posso dizer?'],
        act_check: ['<32>{#p/story}* GELATINI - ATQ 6 DEF 0\n* Esteriótipos: Curvatura atrativa, mas sem cérebro...'],
        act_check2: ["<32>{#p/story}* GELATINI - ATQ 6 DEF 0\n* É ainda mais atrativo nestas temporadas coloridas."],
        act_check3: ['<32>{#p/story}* GELATINI - ATQ 6 DEF 0\n* É exatamente seu tipo.\n* É estéreo.'],
        act_check4: ['<32>{#p/story}* GELATINI - ATQ 6 DEF 0\n* Este super modelo parece já ter passado de seu auge.'],
        act_flirt: [
            '<32>{#p/human}* (Você balança seu quadril.)\n* (Gelatini balança de volta.)',
            '<33>{#p/basic}* Que conversa completa!'
        ],
        act_imitate: [
            '<33>{#p/human}* (Você dá a Gelatini um belo carinho.)\n* (Ele muda de cor...)',
            "<32>{#p/basic}* É a cor feliz do Gelatini!"
        ],
        act_slap: [
            '<32>{#p/human}* (Você dá um tapão no Gelatini.)',
            '<32>{#p/basic}* Gelatini é empurrado, mas permanece imperturbável.'
        ],
        act_slap2: [
            '<32>{#p/human}* (Você dá seu tapa mais poderoso em Gelatini.)',
            '<32>{#p/basic}* Gelatini está balançando todo o corpo!'
        ],
        act_slap3: [
            '<32>{#p/human}* (Você dá seu tapa mais poderoso em Gelatini.)',
            '<32>{#p/basic}* Gelatini foge da cena!'
        ],
        idleTalk1: ['<08>{#p/basic}{~}Blorb..'],
        idleTalk2: ['<08>{#p/basic}{~}Squorch..'],
        idleTalk3: ['<08>{#p/basic}{~}\x00*sons felizes*'],
        name: '* Gelatini',
        perilStatus: () =>
            world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                ? ["<32>{#p/kidding}* Isso não pode ser bom..."]
                : ['<32>{#p/story}* Gelatini começou a amolecer.'],
        sexyChat: ['<08>{#p/basic}{~}\x00*manobra sexy*'],
        status1: () =>
            world.goatbro ? ['<32>{#p/asriel2}* Gelatini ao quadrado.'] : ["<32>{#p/story}* É um par de Gelatini."],
        status2: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Gelatini.']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ["<32>{#p/kidding}* Shh... está pensando!"]
                    : ['<32>{#p/story}* Gelatini balança quietamente.'],
        status3: () =>
            world.goatbro ? ['<32>{#p/asriel2}* Gelatini.'] : ['<32>{#p/story}* Gelatini espera otimista.'],
        status4: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Gelatini.']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ['<32>{#p/kidding}* Um balanço aqui, um balanço alí...']
                    : ['<32>{#p/story}* Gelatini está ruminando.'],
        status5: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Gelatini.']
                : world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                    ? ['<32>{#p/kidding}* Do que será que o Gelatini é feito?']
                    : ['<32>{#p/story}* O cheiro de gelatina de limão permeia.'],
        status6: ['<32>{#p/story}* E então, havia um.'],
        status8: () =>
            world.kiddo && SAVE.data.n.state_foundry_muffet !== 1
                ? ['<32>{#p/kidding}* Apenas nós agora!']
                : ['<32>{#p/story}* Gelatini agora balança sozinho.']
    },
    b_opponent_spacetop: {
        epiphany: [
            ['<08>{#p/basic}{~}Eu posso me comunicar onde quiser.'],
            () =>
                world.meanie
                    ? ['<08>{#p/basic}{~}Aviso de transmissão ampla é bem recebido!']
                    : SAVE.data.b.oops && world.flirt > 9
                        ? ['<08>{#p/basic}{~}Ooh.. eu gosto desse tipo de sinal...']
                        : SAVE.data.b.oops
                            ? ["<08>{#p/basic}{~}Eu estou na sua onda agora!"]
                            : ['<08>{#p/basic}{~}O sinal... está bem em cima de mim...'],
            ["<08>{#p/basic}{~}Eu sou apenas um desperdício de largura de banda..."],
            ["<08>{#p/basic}{~}Eu vou te passar o dinheiro agora mesmo!"]
        ],
        act_check: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Astro Serf, o astronauta que ama atenção. Não se importa com nada além de sua antena.']
                : ["<32>{#p/story}* ASTRO SERF - ATQ 11 DEF 4\n* Este jovem pergunta o por que não é chamado 'Radio Jack.'"],
        act_check2: ['<32>{#p/story}* ASTRO SERF - ATQ 11 DEF 4\n* Este jovem aprecia seu próprio senso de moda.'],
        act_check3: ['<32>{#p/story}* ASTRO SERF - ATQ 11 DEF 4\n* Este jovem está pegando todos os sinais corretos.'],
        act_check4: [
            '<32>{#p/story}* ASTRO SERF - ATQ 11 DEF 4\n* Tentando alcançar um sinal de rádio para chamar por ajuda.'
        ],
        act_compliment: ['<32>{#p/human}* (Você informa ao Astro Serf que ele tem uma ótima antena.)'],
        act_flirt: ['<32>{#p/human}* (Você flerta com o Astro Serf.)'],
        complimentTalk1: ["<08>{#p/basic}{~}DUH!\nQuem NÃO sabe?"],
        complimentTalk2: ['<08>{#p/basic}{~}Invejoso?\nRUIM PRA VOCÊ!'],
        createStatus1: () =>
            world.goatbro
                ? ['<32>{#p/asriel2}* Astro Serf.']
                : ["<32>{#p/story}* Astro Serf está secretamente checando se você olhou sua antena."],
        createStatus2: () =>
            world.goatbro ? ['<32>{#p/asriel2}* Astro Serf.'] : ['<32>{#p/story}* Astro Serf está impressionado.'],
        createTalk1: ["<09>{#p/basic}{~}ALOOOOOO????\nMinha antena tá aqui em cima."],
        createTalk2: ['<08>{#p/basic}{~}O que?\nO que você tá fazendo?'],
        createTalk3: ["<08>{#p/basic}{~}Mas... não pode ser!"],
        createTalk4: ['<08>{#p/basic}{~}Woah...\nComo você fez isso??'],
        createTalk5: ["<08>{#p/basic}{~}Você está... fazendo sua própria antena?"],
        act_create: () =>
            [
                ['<32>{#p/human}* (Você começa a fazer sua própria antena.)', '<32>{#p/basic}* Mas... como?'],
                ['<32>{#p/human}* (Você termina sua antena e coloca na cabeça.)'],
                [
                    '<32>{#p/human}* (Você começa outra antena.)',
                    '<32>{#p/basic}* Sem saber o que fazer, Astro Serf sai correndo.'
                ]
            ][battler.target?.vars.create ?? 0],
        flirtStatus1: ['<32>{#p/story}* Astro Serf não está impressionado pelo seu traje.'],
        flirtStatus2: ['<32>{#p/story}* Astro Serf está em paixão.'],
        flirtTalk1: ['<08>{#p/basic}{~}Sem acordo!\nNão sem uma antena!'],
        flirtTalk2: ['<08>{#p/basic}{~}O q-quê??\nUm...\nEu...\nVocê...'],
        genoStatus: ['<32>{#p/asriel2}* Astro Serf.'],
        hurtStatus: () =>
            world.goatbro ? ['<32>{#p/asriel2}* Praticamente morto.'] : ["<32>{#p/story}* O traje de Astro Serf está solto."],
        idleTalk1: ["<08>{#p/basic}{~}Cadê SUA antena?"],
        idleTalk2: ['<08>{#p/basic}{~}Sua cabeça parece tão... PELADA'],
        idleTalk3: ['<08>{#p/basic}{~}Que antena linda!\n(A minha)'],
        idleTalk4: ["<09>{#p/basic}{~}É um sinal de feedback, não radiação."],
        idleTalk5: ['<08>{#p/basic}{~}Eu só aaaaaamooo minha antena?\nOK?'],
        justiceTalk: ['<08>{#p/basic}{~}O que você fez.'],
        name: '* Astro Serf',
        randStatus1: ['<32>{#p/story}* Astro Serf também quer uma antena para outras partes do corpo.'],
        randStatus2: ['<32>{#p/story}* Astro Serf garante que sua antena ainda está ali.'],
        randStatus3: ['<32>{#p/story}* Astro Serf está pensando sobre um certo artifício de roupa.'],
        randStatus4: ['<32>{#p/story}* Cheira a lítio.'],
        status1: ['<32>{#p/story}* Astro Serf se coloca na visão.'],
        stealTalk1: ['<08>{#p/basic}{~}EU SABIA!!!!\nLADRÃO!!'],
        stealTalk2: ['<08>{#p/basic}{~}AJUDA!!!\nPOLÍCIA DA MODA!!!'],
        act_steal: () =>
            battler.hurt.includes(battler.target!)
                ? [
                    "<33>{#p/human}* (Você rouba a antena do Astro Self.)\n* (Sua roupa toda cai.)",
                    '<33>{#p/basic}* Parece que foi energizado por lítio este tempo todo.'
                ]
                : ["<32>{#p/human}* (Você tenta roubar a antena do Astro Self, mas ele não foi enfraquecido o suficiente.)"]
    },
    b_opponent_space: {
        epiphany: [
            ["<08>{#p/basic}{~}Ok, eu vou me destacar agora."],
            () =>
                world.meanie
                    ? ["<08>{#p/basic}{~}Eu... vou sair do seu caminho."]
                    : SAVE.data.b.oops && world.flirt > 9
                        ? ["<08>{#p/basic}{~} Você está pensando o que eu... oh..."]
                        : SAVE.data.b.oops
                            ? ['<08>{#p/basic}{~}Que nossos cristais possam brilhar como um.']
                            : ['<08>{#p/basic}{~}Cuidado... pode ser pontudo...'],
            ['<08>{#p/basic}{~}Eu mereço a queda...'],
            ["<08>{#p/basic}{~}Aqui está todo o dinheiro que tenho..."]
        ],
        act_check: () =>
            world.goatbro
                ? ["<32>{#p/asriel2}* Lítio.\n* Literalmente isso."]
                : ['<32>{#p/story}* LÍTIO - ATQ 1 DEF 0\n* Sem seu traje espacial...'],
        act_reassure: ['<32>{#p/human}* (Você diz ao lítio que ele ainda parece bonito.)'],
        genoStatus: ['<32>{#p/asriel2}* Lítio.'],
        happyStatus: ["<32>{#p/story}* Lítio não se reconhece mais."],
        happyTalk1: ['<08>{#p/basic}{~}É... eu gosto do meu corpo também.'],
        happyTalk2: ['<08>{#p/basic}{~}Hmm... antenas são para posers.'],
        happyTalk3: ['<08>{#p/basic}{~}Então eu ainda te impressiono?'],
        happyTalk4: ['<08>{#p/basic}{~}Eu queria que você me visse como alguém da hora.'],
        hurtStatus: () =>
            world.goatbro ? ['<32>{#p/asriel2}* Praticamente morto.\n* De novo.'] : ["<32>{#p/story}* Está desintegrando."],
        idleTalk1: ['<08>{#p/basic}{~}Eu...\nEu...'],
        idleTalk2: ['<08>{#p/basic}{~}O que eu posso dizer...'],
        idleTalk3: ["<08>{#p/basic}{~}Qual seria o ponto..."],
        idleTalk4: ['<08>{#p/basic}{~}Tão... sozinho...'],
        name: '* Lítio',
        randStatus1: ['<32>{#p/story}* Não mais o \"Astro Serf\".'],
        randStatus2: ['<32>{#p/story}* Cheira a poder de bateria.']
    },

    b_party_kidd: {
        mkNobody: ['<25>{#p/kidd}{#f/4}* Sou só eu, ou parece meio vazio por aqui....'],
        mkDeath1: [
            '<32>{#p/kidding}* Uh...',
            "<32>* Por que eles sumiram daquele jeito?",
            '<32>* Bem, se estamos atacando eles, talvez eles só ficaram com medo e teletransportaram, haha.'
        ],
        mkDeath2: ['<32>{#p/kidding}* Mais um?', "<32>* Cara, por que eu não tenho um teletransportador da hora!?"],
        mkDeath3: ["<32>{#p/kidding}* E eles se foram..."],
        mkDeath4: ['<32>{#p/kidding}* ...'],
        mkDeath1OW: [
            '<25>{#p/kidd}{#f/4}* Uh...',
            "<25>* Por que eles sumiram desse jeito?",
            '<25>{#f/1}* Bem, estamos atacando eles, então...',
            '<25>* Talvez eles ficaram com medo é teletransportaram para loge, haha.'
        ],
        mkDeath2OW: [
            '<25>{#p/kidd}{#f/4}* Mais um?',
            "<25>{#f/1}* Cara, por que eu não tenho um teletransportador da hora!?"
        ],
        mkDeath3OW: ["<25>{#p/kidd}{#f/4}* E eles se foram..."],
        mkDeath4OW: ['<25>{#p/kidd}{#f/4}* ...'],
        mkBully1: [
            '<32>{#p/kidding}* Uh...',
            '<32>* Eles pareciam assustados...',
            "<32>* Eu espero não termos batido muito neles ou algo assim..."
        ],
        mkBully2: ['<32>{#p/kidding}* Aquele também...!', '<32>* Nós estamos batendo neles com força demais...?'],
        mkBully3: ['<32>{#p/kidding}* ...'],
        mkBully1OW: [
            '<25>{#p/kidd}{#f/4}* Uh...',
            '<25>* Eles pareciam bem assustados...',
            "<25>* Eu espero não termos batido neles com tanta força ou algo assim..."
        ],
        mkBully2OW: ['<25>{#p/kidd}{#f/7}* Aquele também...!', '<25>{#f/4}* Estamos batendo neles com muita força...?'],
        mkBully3OW: ['<25>{#p/kidd}{#f/4}* ...'],
        mkShyrenDeath: ['<25>{#p/kidd}{#f/4}* Ei...', "<25>{#p/kidd}{#f/1}* Onde todos estão indo?"],
        mkMagic1: [
            "<32>{#p/kidding}* Yo... eu não sei fazer nenhuma mágica legal ainda...",
            '<32>{#p/kidding}* mas uh, eu posso curar você!'
        ],
        mkMagic2a: ['<32>{#p/kidding}* Poder de cura!'],
        mkMagic2b: ['<32>{#p/kidding}* Que a saúde esteja com você!'],
        mkMagic2c: ['<32>{#p/kidding}* Tome!'],
        mkNope: ['<32>{#p/kidding}* Só me deixa fora disso...'],
        mkTurn1: ["<32>{#p/kidding}* Ajuda, eu nunca estive em uma batalha antes!\n* O que eu faço!?"],
        mkTurn2: ['<32>{#p/kidding}* Uh... ajuda!'],
        mkTurn3: ["<32>{#p/kidding}* Eu... acho que estou começando a entender isso."],
        mkTurnAct1: ['<32>{#p/kidding}* Oh! Oh!', '<32>* Eu sei como conversar funciona!', '<32>* Olha isso...!'],
        mkWeaken1: ["<32>{#p/kidding}* Você tem certeza...?\n* Não parece muito feliz sobre isso...", '<32>* ...'],
        mkWeaken2: ['<32>{#p/kidding}* Essa é realmente uma boa ideia...?', '<32>* ...'],
        mkWeaken3a: ['<32>{#p/kidding}* Uh...'],
        mkWeaken3b: ['<32>{#p/kidding}* Um...'],
        mkWeaken3c: ['<32>{#p/kidding}* Er...'],
        
        mkTurnActRand1: (opponent: string) =>
            opponent === 'muffet' // NO-TRANSLATE

                ? [
                    ['<32>{#p/story}* Criança Monstro se balança na teia e faz uma careta assustadora.'],
                    ['<32>{#p/story}* Criança Monstro espermeia na teia e grita.'],
                    ['<32>{#p/story}* Criança Monstro da um sorriso maroto.']
                ]
                : opponent === 'shyren' // NO-TRANSLATE

                    ? [
                        ['<32>{#p/story}* Criança Monstro cantou uma melodia assustadora.'],
                        ['<32>{#p/story}* Criança Monstro grita letras de desespero.'],
                        ['<32>{#p/story}* Criança Monstro bate alto com os pés.']
                    ]
                    : opponent === 'woshua' // NO-TRANSLATE

                        ? [
                            ['<32>{#p/story}* Criança Monstro mostra o chão sujo.'],
                            ['<32>{#p/story}* Criança Monstro aponta os canos com vazamento.'],
                            ['<32>{#p/story}* Criança Monstro faz uma cara de nojo.']
                        ]
                        : [
                            ['<32>{#p/story}* Criança Monstro encarou $(x) diretamente no rosto.'],
                            ['<32>{#p/story}* Criança Monstro apontou para $(x) acusadoramente.'],
                            ['<32>{#p/story}* Criança Monstro circulou ao redor de $(x) como um predador.']
                        ],
        
        mkTurnActRand2: (opponent: string) =>
            opponent === 'muffet' // NO-TRANSLATE

                ? [
                    ['<32>{#p/story}* Criança Monstro elogia Muffet na sua escolha de roupas.'],
                    ['<32>{#p/story}* Criança Monstro diz a Muffet que suas comidas são as melhores da sociedade monstro.'],
                    ["<32>{#p/story}* Criança Monstro diz que nenhuma teia é tão forte quanto as da Muffet."]
                ]
                : opponent === 'shyren' // NO-TRANSLATE

                    ? [
                        ['<32>{#p/story}* Criança Monstro canta uma bela melodia.'],
                        ["<32>{#p/story}* Criança Monstro elogia o cabelo da Shyren."],
                        ["<32>{#p/story}* Criança Monstro elogia a voz da Shyren."]
                    ]
                    : opponent === 'woshua' // NO-TRANSLATE

                        ? [
                            ['<32>{#p/story}* Criança Monstro diz que Skrubbington é o monstro mais limpo da aérea.'],
                            ["<32>{#p/story}* Criança Monstro diz apreciar o esforço de Skrubbington para deixar a fábrica limpa."],
                            ["<32>{#p/story}* Criança Monstro nota o compromisso de Skrubbington com a perfeição."]
                        ]
                        : opponent === 'radtile' // NO-TRANSLATE

                            ? [
                                ["<32>{#p/story}* Criança Monstro elogia o espelho do Radtile."],
                                ["<32>{#p/story}* Criança Monstro elogia o boné do Radtile."],
                                ["<32>{#p/story}* Criança Monstro dá uma olhada dupla na aparência do Radtile."]
                            ]
                            : [
                                ['<32>{#p/story}* Criança Monstro se ofereceu para fazer companhia a $(x)'],
                                ["<32>{#p/story* Criança Monstro disse a $(x) que ele estará ali para ajudar caso precise."],
                                ['<32>{#p/story}* Criança Monstro fica no topo de $(x).']
                            ],
        
        mkTurnActRand3: (opponent: string) =>
            opponent === 'muffet' // NO-TRANSLATE

                ? [
                    ['<32>{#p/story}* Criança Monstro tenta perguntar a Muffet sobre o clã de aranhas.'],
                    ['<32>{#p/story}* Criança Monstro tenta perguntar Muffet sobre bolos.'],
                    ['<32>{#p/story}* Criança Monstro tenta perguntar Muffet sobre chá.']
                ]
                : opponent === 'shyren' // NO-TRANSLATE

                    ? [
                        ['<32>{#p/story}* Criança Monstro debate sobre notação musical.'],
                        ['<32>{#p/story}* Criança Monstro fala sobre teoria musical.'],
                        ['<32>{#p/story}* Criança Monstro discute sobre seu gênero de música favorito.']
                    ]
                    : opponent === 'woshua' // NO-TRANSLATE

                        ? [
                            ['<32>{#p/story}* Criança Monstro demonstra poesia sobre a higiene adequada.'],
                            ['<32>{#p/story}* Criança Monstro faz um rap sobre segurança contra riscos.'],
                            ['<32>{#p/story}* Criança Monstro exibiu seu conjunto de canos polido.']
                        ]
                        : opponent === 'radtile' // NO-TRANSLATE

                            ? [
                                ['<32>{#p/story}* Criança Monstro faz uma careta para Radtile.'],
                                ['<32>{#p/story}* Criança Monstro se aproxima e olha o Radtile de perto.'],
                                ['<32>{#p/story}* Criança Monstro age como se fosse uma criatura feroz.']
                            ]
                            : [
                                ['<32>{#p/story}* Criança Monstro se mexeu, imitando $(x).'],
                                ['<32>{#p/story}* Criança Monstro faz uma bananeira, impressionando $(x)'],
                                ['<32>{#p/story}* Criança Monstro gira para os lados, desconcertando $(x)']
                            ],
        
        mkTurnActRand4: (opponent: string) =>
            opponent === 'muffet' // NO-TRANSLATE

                ? [["<32>{#p/story}* Criança Monstro tenta dizer a Muffet que não a ponto em tudo isso!"]]
                : opponent === 'shyren' || opponent === 'radtile' // NO-TRANSLATE

                    ? [['<32>{#p/story}* Criança Monstro afirmou que uma distorção espacial estava se aproximando rapidamente']]
                    : opponent === 'woshua' // NO-TRANSLATE

                        ? [['<32>{#p/story}* Criança Monstro afirma que um agente viral no ar estava a caminho.']]
                        : [['<32>{#p/story}* Criança Monstro avisa que os tubos próximos estavam derramando ácido!']],
        mkTurnActResult0: ['<32>{#p/story}* Nada acontece.'],
        mkTurnActResult1: (opponent: string) =>
            opponent === 'woshua' // NO-TRANSLATE

                ? ["<32>{#p/story}* Skrubbington está enojado!\n* DEFESA de Skrubbington caiu!"]
                : opponent === 'shyren' // NO-TRANSLATE

                    ? ["<32>{#p/story}* Shyren se sentiu desconfortável!\n* A DEFESA de Shyren caiu!"]
                    : opponent === 'radtile' // NO-TRANSLATE

                        ? ["<32>{#p/story}* Radtile se sente desconfortável!\n* DEFESA de Radtile caiu!"]
                        : ["<32>{#p/story}* $(x) se sentiu desconfortável!\n* A DEFESA de $(x) caiu!"],
        mkTurnActResult2: (opponent: string) =>
            opponent === 'woshua' // NO-TRANSLATE

                ? ["<32>{#p/story}* Skrubbington se sentiu lisonjeado!\n* O ATAQUE de Skrubbington caiu!"]
                : opponent === 'shyren' // NO-TRANSLATE

                    ? ["<32>{#p/story}* Shyren se sente lisonjeada!\n* O ATAQUE de Shyren caiu!"]
                    : opponent === 'radtile' // NO-TRANSLATE

                        ? ["<32>{#p/story}* Radtile se sente respeitado!\n* ATAQUE de Radtile caiu!"]
                        : ["<32>{#p/story}* $(x) sente o respeito!\n* O ATAQUE de $(x) caiu!"],
        mkTurnActResult3: (opponent: string, multiple: boolean) =>
            opponent === 'woshua' // NO-TRANSLATE

                ? multiple
                    ? ['<32>{#p/story}* Skrubbington e outros monstros foram distraídos pela Criança Monstro e esqueçam da luta!']
                    : ['<32>{#p/story}* Skrubbington foi distraído pela Criança Monstro e esqueceu o turno!']
                : opponent === 'shyren' // NO-TRANSLATE

                    ? ['<32>{#p/story}* Distraída pela Criança Monstro, Shyren esquece seu turno!']
                    : multiple
                        ? ['<32>{#p/story}* Encantados pela Criança Monstro, $(x) e os outros esqueceram seus turnos!']
                        : opponent === 'radtile' // NO-TRANSLATE

                            ? ['<32>{#p/story}* Encantado pela Criança Monstro, Radtile esqueceu seu turno!']
                            : ['<32>{#p/story}* Pela distração da Criança Monstro, $(x) esqueceu seu turno!'],
        mkTurnActResult4: (opponent: string, multiple: boolean, allowpac: boolean) =>
            opponent === 'woshua' // NO-TRANSLATE

                ? [
                    '<32>{#p/story}* Com medo por sua vida, Skrubbington entra em pânico e foge da batalha!',
                    ...(multiple ? ['<32>{#p/story}* Os outros monstros continuam a lutar.'] : [])
                ]
                : opponent === 'shyren' // NO-TRANSLATE

                    ? allowpac
                        ? ['<32>{#p/story}* Temendo por sua vida, Shyren entra em pânico e foge da luta!']
                        : ['<32>{#p/story}* Encorajada por seu próprio desempenho, Shyren enfrentou a ameaça!']
                    : opponent === 'radtile' // NO-TRANSLATE

                        ? ['<32>{#p/story}* Temendo por sua vida, Radtile entra em pânico e foge da batalha!']
                        : [
                            '<32>{#p/story}* Temendo por sua vida, $(x) entra em pânico e foge da batalha!',
                            ...(multiple ? ['<32>{#p/story}* Os outros monstros continuam a lutar.'] : [])
                        ],
        mkTurnFight1: () => [
            '<32>{#p/kidding}* V... v-você quer que eu lute?\n* Tem certeza?',
            choicer.create('* (Você confirma essa ação?)', 'Sim', 'Não ')
        ],
        mkTurnFight2a: ['<32>{#p/kidding}* Tá... aqui vai nada...'],
        mkTurnFight2b: ['<32>{#p/kidding}* Oh, okay...', "<32>* Eu só vou poupar então!"],
        mkTurnFight3a: ['<32>* Ngh...!'],
        mkTurnFight3b: ['<32>* Hi-yah...!'],
        mkTurnFight3c: ['<32>* Wa-POW!'],
        mkTurnMercy1: ['<32>{#p/kidding}* Poupar?\n* Eu só deixo eles irem?', "<32>{#p/kidding}* Haha, isso é fácil!"],
        mkTurnX: () => [choicer.create('* (O que a Criança Monstro deveria fazer?)', 'Piedade', 'Agir', 'Magia', 'Lutar')]
    },

    c_name_common: {
        keyring: 'Chaveiro',
        hello_asgore: 'Dizer Olá',
        about_asgore: 'Sobre Você',
        dad: 'Chamar ele de \"Pai\"',
        flirt_asgore: 'Flertar',
        insult_asgore: 'Insultar'
    },

    c_call_common: {
        start: '<32>{#s/phone}{#p/event}* Ligando...',
        end: '<32>{#s/equip}{#p/event}* Click...',
        nobody0: ['<32>{#p/human}* (Muita interferência.)'],
        nobody1: ['<32>{#p/human}* (Sem resposta.)'],
        nobody2: ['<32>{#p/basic}* ... mas ninguém veio.'],
        nobody3: ['<32>{#p/human}* (Sem conexão.)'],
        nobody4: [
            '<32>{#p/human}* (Parece o som de um pequeno cachorro branco dormindo no celular.)',
            '<32>{#p/basic}* (Ronco... ronco...)',
            '<32>* (Ronco... ronco...)'
        ],
        nobody4a: [
            '<32>{#p/human}* (Parece o som de um pequeno cachorro branco dormindo no celular.)',
            '<32>{#p/basic}* (Ronco... ronco... ronco...)',
            '<32>* (Ronco... ronco... ronco...)'
        ],
        nobody4f: [
            '<32>{#p/human}* (Parece o som de um pequeno cachorro branco dormindo no celular.)',
            '<32>{#p/basic}* (Ronco...!)',
            '<32>* (Ronco...!)'
        ],
        nobody4m: [
            '<32>{#p/human}* (Parece o som de um pequeno cachorro branco dormindo no celular.)',
            '<32>{#p/basic}* (Ronco...?)',
            '<32>* (Ronco...?)'
        ],
        nobody4i: [
            '<32>{#p/human}* (Parece o som de um pequeno cachorro branco dormindo no celular.)',
            '<32>{#p/basic}* (choramingo.)',
            '<32>* (Lamentação.)'
        ],
        about1: [
            '<25>{#p/asgore}{#f/5}* Sobre minha pessoa?',
            '<25>{#f/7}* ... oh, por onde eu começo?',
            '<25>{#f/6}* A muito para dizer apenas de uma vez.',
            '<25>{#f/6}* Talvez, com o tempo você vai me conhecer muito bem.',
            '<25>{#f/21}* Seria melhor do que te dizer tudo de uma vez.'
        ],
        about2: [
            '<25>{#p/asgore}{#f/5}* Eu você quiser, eu posso te dizer algo sobre mim depois.',
            '<25>{#f/7}* Que tal isso?'
        ],
        flirt1: [
            '<25>{#p/asgore}{#f/20}* ...',
            '<25>{#f/4}* Frisk.',
            '<25>{#f/6}* Certamente há alguém da sua idade.',
            '<25>{#f/5}* Não estou dizendo que não posso obrigar, mas...',
            '<25>{#f/6}* Há um mundo de diferença entre \"pode\" e \"deve.'
        ],
        flirt2: [
            '<25>{#p/asgore}{#f/20}* Frisk.',
            '<25>{#f/20}* Talvez quando você for mais velho, possamos explorar isso mais profundamente.',
            '<25>{#f/6}* Mas não agora.'
        ],
        flirt3: [
            '<25>{#p/asgore}{#f/20}* Frisk.',
            '<25>{#f/6}* Você me chamou de \"Pai\", e então flertou comigo.',
            '<25>{#f/5}* Eu não tenho certeza como reagir a isso.'
        ],
        hello: [
            ['<25>{#p/asgore}{#f/21}* Uma saudação, você diz?', '<25>{#f/7}* Hmm...', '<25>{#f/6}* Eu te darei um \"Howdy!\"'],
            ['<25>{#p/asgore}{#f/5}* Outra saudação?', '<25>{#f/21}* Eu sei...', '<25>{#f/6}* \"Como você faz!\"'],
            [
                '<25>{#p/asgore}{#f/5}* ...',
                '<25>{#f/5}* Nesse ritmo, eu vou ficar sem saudações.',
                '<25>{#f/6}* No entanto, os pássaros do lado de fora podem estar mais dispostos a fazê-lo.',
                '<25>{#f/7}* Por que não tentar com eles?'
            ],
            ['<25>{#p/asgore}{#f/5}* ... olá, pequeno.', '<25>{#f/6}* É sempre ótimo ouvir sua voz.']
        ],
        dad1: [
            '<25>{#p/asgore}{#f/6}* ...',
            '<25>{#f/24}* ...',
            '<25>{#f/21}* Claro.',
            '<25>{#f/6}* Suponho que seja natural que você me chame assim.',
            '<25>{#f/6}* Você tem a permissão para me chamar de \"Pai\" caso queira, Frisk.'
        ],
        dad2: [
            '<25>{#p/asgore}{#f/24}* ...\n* Senhor da graça.',
            '<25>{#f/6}* Você parece muito decidido que eu seja seu pai.',
            '<25>{#f/21}* Felizmente, eu já planejei trabalhar neste posto.'
        ],
        dad3: [
            '<25>{#p/asgore}{#f/24}* ...\n* Senhor da graça.',
            '<25>{#f/6}* Você flertou comigo e depois me chama de \"Pai.\"',
            '<25>{#f/5}* Eu não tenho certeza como reagir a isso.'
        ],
        insult1: () =>
            SAVE.data.b.ufokinwotm8
                ? [
                    '<25>{#p/asgore}{#f/1}* ...',
                    '<25>{#f/1}* Você parece estar com raiva de alguma coisa...',
                    '<25>{#f/6}* Se você quiser, podemos conversar assim que a construção acabar.'
                ]
                : [
                    '<25>{#p/asgore}{#f/8}* ...',
                    '<26>{#f/6}* Ooh.\n* Que maldade de sua parte.',
                    '<25>{#f/21}* Mas não se preocupe...\n* Eu sei bem que você está apenas brincando comigo.'
                ],
        insult2: () =>
            SAVE.data.b.ufokinwotm8
                ? ['<25>{#p/asgore}{#f/1}* ...', '<25>{#p/asgore}{#f/6}* Estarei disponível para conversar com você em breve, ok?']
                : ['<25>{#p/asgore}{#f/21}* Calma, calma.\n* Não há necessidade de ser tão descarado.']
    },

    s_save_common: {
        _cockpit: {
            name: 'Espaço Sideral',
            text: []
        },
        _frontier1: {
            name: 'Seu Quarto',
            text: ["<32>{#p/human}* (Você se enche de determinação.)"]
        },
        _frontier8: {
            name: 'Eurybia',
            text: []
        }
    }
};


// END-TRANSLATE
