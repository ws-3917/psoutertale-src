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
            '<25>{#p/toriel}{#f/1}* Escuché que hay un cierto tipo de fluido en Aerialis...',
            '<25>{#f/0}* Usado primariamente para atenuar la electricidad.',
            '<25>{#f/1}* Si pudieras llevarte este fluido, ¿hasta donde lo llevarías?',
            '<25>{#f/1}* ¿Lo llevarías todo el camino hasta la Capital?',
            '<25>{#f/1}* ¿O simplemente te desharías de este en una papelera de reciclaje?',
            '<25>{#f/0}* Que decepcionante seria eso.'
        ]
        : SAVE.data.n.plot < 51
            ? world.bad_lizard > 1 || SAVE.data.n.state_foundry_undyne === 2
                ? [
                    '<25>{#p/toriel}{#f/1}* Quizá, si algun día me vuelvo una profesora...',
                    '<25>{#f/0}* Podría organizar una excursión al Laboratorio Real.',
                    "<25>{#f/0}* Con el permiso de la Doc. Alphys, claro.",
                    '<25>{#f/1}* Todos los experimentos interesantes que podrían conducir ahí...',
                    "<25>{#f/0}* Sería una buena experiencia de aprendizaje para los niños."
                ]
                : [
                    '<25>{#p/toriel}{#f/0}* La noticia de tu estreno en TV se ha esparcido rápidamente, pequeño.',
                    '<25>{#f/0}* Aunque no he podido verlo, a causa de mi falta de una TV',
                    '<25>{#f/1}* Cuando escuché acerca de ello, debo admitir, estaba sorprendida...',
                    SAVE.data.n.state_aerialis_talentfails === 0
                        ? '<25>{#f/1}* ¿Cómo es que no fallaste ni UNA sola vez?'
                        : '<25>{#f/6}* No sabía que tenias movimientos tan \"fabulosos\".'
                ]
            : SAVE.data.n.plot < 56
                ? [
                    '<25>{#p/toriel}{#f/1}* Hmm...\n* Los guardias reales en Aerialis...',
                    '<25>{#f/0}* Aparentemente, su comida favorita es... salmón.',
                    '<25>{#f/1}* ¿O... era helado?',
                    '<25>{#f/2}* Espera, no, creo que era pizza!',
                    '<25>{#f/0}* Todo de lo cual hubiera sido imposible sin nuestro humilde replicador.',
                    '<25>{#f/1}* Y... ¿no son esas comidas extrañas para esos nuevos reclutas?'
                ]
                : SAVE.data.n.plot < 59
                    ? [
                        world.bad_lizard > 1 || SAVE.data.n.state_foundry_undyne === 2
                            ? '<25>{#p/toriel}{#f/0}* Escuche que apareciste en TV, pequeño.'
                            : '<25>{#p/toriel}{#f/0}* Escuche que apareciste en TV de nuevo, pequeño.',
                        '<25>{#f/1}* También escuche que hiciste algo sorprendente...',
                        iFancyYourVilliany()
                            ? '<25>{#f/2}* ¡Y alteraste ingredientes de artesanía para crear explosivo plástico!'
                            : SAVE.data.n.state_aerialis_crafterresult === 0
                                ? '<25>{#f/2}* ¡Y te mantuviste firme ante la amenaza de una explosión inminente!'
                                : '<25>{#f/2}* ¡Y volaste en un \"Jetpack portable de un solo uso\" por tu cuenta!',
                        '<25>{#f/3}* ... estas ...',
                        '<25>{#f/4}* Estas TRATANDO de poner tu vida en peligro?'
                    ]
                    : SAVE.data.n.plot < 60
                        ? [
                            '<25>{#p/toriel}{#f/1}* ¿Qué tipo de puzles tienen en Aerialis?',
                            '<25>{#f/1}* ¿Usan láseres?',
                            '<25>{#f/1}* ¿Te regresan al inicio cuando fallas?',
                            '<25>{#f/1}* ... puedes siquiera \"fallarlos\" realmente?',
                            '<25>{#f/0}* Hmm...\n* Discúlpame por hacer tantas preguntas.',
                            '<25>{#f/1}* Una fan de los puzles como yo no puede evitar cuestionarme esas cosas...'
                        ]
                        : SAVE.data.n.plot < 61
                            ? [
                                '<25>{#p/toriel}{#f/1}* Cuando escuche acerca de tus aventuras con Mettaton...',
                                '<25>{#f/0}* Tuve una idea.',
                                '<25>{#f/1}* ¿Cómo podría un robot como él existir tras la prohibición de las IA?',
                                '<25>{#f/5}* Seguramente la Doctora Alphys no rompería una regla tan fuertemente establecida.',
                                '<25>{#f/0}* No...\n* Debe haber otra explicación.'
                            ]
                            : SAVE.data.n.plot < 63
                                ? [
                                    '<25>{#p/toriel}{#f/1}* Hmm...\n* Los guardias reales en Aerialis...',
                                    '<25>{#f/0}* Escuche que ellas apenas acaban de ser promovidas a sus posiciones.',
                                    '<25>{#f/1}* También escuche que son algo especiales con la elección de sus armas...',
                                    '<25>{#f/5}* Se reusaron a mejorarlas incluso aunque tenían mejores opciones.',
                                    '<25>{#f/0}* No es que quiera que mejoren sus armas.',
                                    '<25>{#f/2}* ¡Ya me preocupo lo suficiente por ti!'
                                ]
                                : SAVE.data.n.plot < 65
                                    ? SAVE.data.b.a_state_hapstablook
                                        ? [
                                            '<25>{#p/toriel}{#f/1}* Un fantasma, Lurksalot, recientemente me hablo de algunos negocios familiares.',
                                            '<25>{#f/5}* Parece que ha estado en su mente por algo de tiempo.',
                                            '<25>{#f/0}* Afortunadamente, me dijo que debería resolverse pronto.',
                                            '<25>{#f/1}* Y con tu ayuda, ¿no es cierto?',
                                            '<25>{#f/0}* Muy bien.\n* Estoy muy orgullosa de ti, pequeño.'
                                        ]
                                        : [
                                            '<25>{#p/toriel}{#f/1}* Un fantasma, Lurksalot, recientemente me hablo de algunos negocios familiares.',
                                            '<25>{#f/5}* Parece que ha estado en su mente por algo de tiempo.',
                                            '<25>{#f/1}* Me dijo que su primo intento pedirte ayuda, pero...',
                                            '<25>{#f/5}* Estabas ocupado al momento.',
                                            '<25>{#f/1}* ... tenias una buena razón, no?'
                                        ]
                                    : SAVE.data.n.plot < 66
                                        ? [
                                            '<25>{#p/toriel}{#f/1}* ¿Quien hubiera pensado que un robot tendría una voz tan hermosa?',
                                            "<25>{#f/0}* Después de escuchar la nueva grabación de Mettaton, no podía creer lo que escuchaba",
                                            '<26>{#f/1}* Aunque, algo de la letra era algo... violenta, para mi gusto.',
                                            '<25>{#f/5}* ...',
                                            '<25>{#f/0}* No te preocupes, mi niño.\n* Nadie va a expulsarte al espacio.'
                                        ]
                                        : SAVE.data.n.plot < 68
                                            ? [
                                                '<25>{#p/toriel}{#f/0}* Sans me dice que el \"centro rec\" es su lugar favorito.',
                                                '<25>{#p/toriel}{#f/1}* Clases de arte, clubs de música, librerías...',
                                                '<25>{#p/toriel}{#f/5}* Es una pena que mucha del área es insegura para niños pequeños.',
                                                '<25>{#p/toriel}{#f/3}* ¿No podrían haber hecho poco mas de esfuerzo en hacerlo cómodo?',
                                                '<25>{#p/toriel}{#f/2}* ¡Esos medios pueden ofrecer experiencias valiosas y transformativas!'
                                            ]
                                            : SAVE.data.n.plot < 70
                                                ? world.bad_robot
                                                    ? [
                                                        '<25>{#p/toriel}{#f/0}* Todos los que conozco están molestos acerca de un cancelado \"gran final.\"',
                                                        '<25>{#p/toriel}{#f/0}* Dicen que hubiera sido un combate impresionante.',
                                                        '<25>{#p/toriel}{#f/1}* Y aunque estoy aliviada de que no hayas tenido que enfrentarte a eso...',
                                                        '<25>{#p/toriel}{#f/5}* No puedo evitar preocuparme por lo que te espera ahora.'
                                                    ]
                                                    : SAVE.data.b.killed_mettaton
                                                        ? [
                                                            '<25>{#p/toriel}{#f/0}* Todos los que conozco han estado hablando de un \"gran final.\"',
                                                            '<25>{#p/toriel}{#f/1}* Dicen que Mettaton dio su vida por el bien del espectáculo...',
                                                            '<25>{#p/toriel}{#f/0}* Pero sé que no es asi.',
                                                            '<25>{#p/toriel}{#f/1}* Después de todo, los robots se pueden reparar, ¿verdad?'
                                                        ]
                                                        : [
                                                            '<25>{#p/toriel}{#f/0}* Todos los que conozco han estado hablando de un \"gran final.\"',
                                                            '<25>{#p/toriel}{#f/0}* Ellos dicen que verte a ti y a Mettaton los hicieron muy felices',
                                                            '<25>{#p/toriel}{#f/1}* Me alegro que estés pasando un buen rato...',
                                                            '<25>{#p/toriel}{#f/5}* No puedo evitar preocuparme por lo que te espera ahora.'
                                                        ]
                                                : [
                                                    '<25>{#p/toriel}{#f/1}* ¿Está todo bien por ahí, pequeñín?',
                                                    '<25>{#p/toriel}{#f/5}* Probablemente ya hayas estado en la Capital.',
                                                    '<25>{#p/toriel}{#f/9}* ...',
                                                    "<25>{#p/toriel}{#f/10}* Se bueno, ¿vale?"
                                                ];

export default {
    a_outlands: {
        darktorielcall: [
            '<26>{#p/toriel}{#f/5}* Discúlpame , pequeñín.\n* He apagado de nuevo mi teléfono.',
            '<25>{#p/toriel}{#f/9}* Porfavor, déjame aquí por ahora.',
            '<25>{#p/toriel}{#f/10}* Volveré contigo y los demás en un tiempo.'
        ],
        secret1: () => [
            '<32>{#p/basic}* Hay una puerta aquí.\n* Está cerrada.',
            ...(SAVE.data.b.oops ? [] : ["<32>{#p/basic}* ¿Puede que haya una llave en algún lugar...?"])
        ],
        secret2: ['<32>{#p/human}* (Usas la llave secreta.)'],
        exit: () => [choicer.create('* (¿Abandonar Las Afueras?)', 'Sí', 'No')],
        nosleep: ['<32>{#p/human}* (Parece que algo te ha interrumpido el sueño.)'],
        noequip: ['<32>{#p/human}* (Decides no equiparlo)'],
        finaltext: {
            a: ["<32>{#p/basic}* El tiene que estar por aquí, en algún lado..."],
            b: ['<32>{#p/basic}* eh...?', '<32>{#p/basic}* ¿Eso es... El?\n* ¿Ahí fuera?'],
            c: [
                "<32>{#p/basic}* ... es él.",
                "<32>* ...\n* Frisk, si estás listo...",
                "<32>* Si has visto a todos los que quieres ver...",
                '<32>* ...',
                '<32>* Ya sabes que hacer.',
                "<32>* De lo contrario, esperaré hasta que estés listo."
            ],
            d1: ['<32>{#p/basic}* Asriel.'],
            d2: ['<25>{#p/asriel1}{#f/13}* ¿... Frisk?\n* ¿Eres tú...?'],
            d3: ["<32>{#p/basic}* Asriel, soy yo...", '<32>{#p/basic}* Tu mejor amigo, ¿te acuerdas?'],
            d4: [
                '<25>{#p/asriel1}{#f/25}* ¡...!',
                '<25>{#f/25}* ¿$(name)...?',
                "<25>{#f/13}* Pero... Estás...",
                "<25>{#f/23}* ... estás..."
            ],
            d5: ['<32>{#p/basic}* ¿Muerto?'],
            d6: [
                '<32>{#p/basic}* Je.\n* Durante ya un tiempo... Parte de mi deseó estarlo.',
                '<32>{#p/basic}* Después de lo que te hice, yo...\n* Sentí que me lo merecía.'
            ],
            d7: ["<25>{#p/asriel1}{#f/7}* ¡No digas eso, $(name)!", "<25>{#f/6}* ... ¡Te equivocas!"],
            d8: [
                '<33>{#p/basic}* Jaja... mira quien habla.\n* Mister \"solo veo y estoy con gente que te ama.\"',
                '<32>* Pero te mereces saber la verdad sobre mi, Asriel...',
                '<32>* Sobre todo.'
            ],
            d9: ['<25>{#p/asriel1}{#f/23}* ...', '<25>{#f/23}* $(name)...'],
            d10: ['<25>{#p/asriel1}{#f/13}* Pero...', '<25>{#f/15}* ¿Cómo estás aún...?'],
            d11: [
                '<32>{#p/basic}* ... ¿eso importa?',
                '<32>* Acertaste con olvidarte de mi de la manera que hiciste atrás.',
                "<32>* Lo cierto es... que he sido una persona terrible...",
                "<32>* Y no soy el amigo , o el hermano que desearías haber tenido."
            ],
            d12: ['<25>{#p/asriel1}{#f/13}* $(name), Yo...'],
            d13: ["<32>{#p/basic}* Está bien, Asriel.", "<32>* No tienes que hacerlo para que sea mejor de lo que es."],
            d14: ['<25>{#p/asriel1}{#f/22}* ...', '<25>{#f/22}* ... ¿Por qué ahora?'],
            d15: [
                '<32>{#p/basic}* Bueno...',
                '<32>* Siempre pensé que la humanidad estaba al borde de la redención.',
                '<32>* Que, da igual lo que...',
                '<32>* Si fueras humano... estarías destinado a caer en la oscuridad.',
                '<32>* Pero después de seguir a Frisk a lo largo de su camino...',
                '<32>* Ya entiendo la verdad.',
                '<32>* Los otros humanos... siempre hicieron algo que me hizo fácil ignorar la verdad.',
                "<33>* Atacan a personas, o peor, las hacen... desaparecer.",
                '<32>* Pero no Frisk.',
                '<32>* No importa la dificultad que tenga, mostró amabilidad y piedad en cada movimiento.',
                '<32>* Me... callo la boca.',
                "<32>* Y ahora, por eso, se que no hay excusa de la manera en que te he tratado.",
                '<32>* Todo por lo que tuviste que pasar, todo lo que perdiste...',
                "<32>* Soy al que deberían acusar de ello."
            ],
            d16: ['<25>{#p/asriel1}{#f/13}* $(name)...', '<25>{#f/15}* ¿Has estado consciente todo este tiempo?'],
            d17: [
                '<32>{#p/basic}* ... si.\n* Supongo que si.',
                '<32>* Esta ha sido mi existencia, Asriel...\n* Desde que morimos.',
                "<32>* Y... hay otra cosa que debo decirte."
            ],
            d18: ['<25>{#p/asriel1}{#f/21}* ¿Qué es?'],
            d19: [
                '<32>{#p/basic}* ¿Te acuerdas cuando cruzamos el campo de fuerza juntos?',
                '<32>* ¿Cuándo llegamos a las ruinas del viejo hogar natal, y nos encontraron esos humanos?',
                '<32>* Quería usar nuestro poder para destruirlos... pero me detuviste, ¿recuerdas?'
            ],
            d20: ['<25>{#p/asriel1}{#f/16}* ... correcto.'],
            d21: [
                "<32>{#p/basic}* No lo entendí en aquellos tiempos, pero...",
                '<32>* Lo entiendo ahora.',
                '<32>* ... solo estabas intentando pararme... de hacer un error terrible.'
            ],
            d22: ['<25>{#p/asriel1}{#f/15}* $(name)...'],
            d23: [
                "<32>{#p/basic}* Si no fuera por ti, la Zona Espacial habría sido destruido en una segunda guerra.",
                '<32>* Si no fuera por ti, los mismos monstruos que supuestamente intentaba salvar...',
                '<32>* ... habrían muerto junto a nosotros.'
            ],
            d24: ['<25>{#p/asriel1}{#f/25}* $(name), Yo...'],
            d25: [
                '<32>{#p/basic}* Aún ahora, tu decisión hace tiempo sigue importando.',
                '<32>* Aún ahora...',
                "<32>* Tú sigues siendo un mejor hermano para mí de lo que yo fui."
            ],
            d26: [
                '<25>{#p/asriel1}{#f/25}* ¡Te perdono, $(name)!',
                "<25>{#f/23}* ¿Vale?\n* No tienes que hacer esto...",
                '<25>{#f/22}* Sé como te sentiste hace tiempo, y...',
                "<25>{#f/15}* No quiero que cambies de idea solo por que yo..."
            ],
            d27: [
                '<32>{#p/basic}* No.\n* No más.',
                '<32>* Personas PUEDEN cambiar, Asriel...',
                "<32>* ¿No era eso lo que tú siempre creíste?"
            ],
            d28: ['<25>{#p/asriel1}{#f/13}* ... lo sigo haciendo.'],
            d29: [
                "<32>{#p/basic}* He pasado los últimos cien años hundiéndome en mi autocompasión.",
                "<32>* He pasado los últimos cien años aguantando un rencor que nunca debería haber tenido.",
                '<32>* En todo ese tiempo, me preguntaba que me mantenía vivo...',
                '<32>* Y ahora, finalmente se la respuesta.'
            ],
            d30: ['<25>{#p/asriel1}{#f/15}* ¿...?'],
            d31: ["<32>{#p/basic}* ... eres tú, Asriel.", "<32>* Tú eres quien me mantenía con vida."],
            d32: [
                '<32>{#p/basic}* Piensa en ello como... una promesa incumplida.',
                '<32>* Aguantando ese rencor... pensando sobre ti en la forma en que lo hice...',
                "<32>* Sabiendo que podría haber sido mucho más para ti de lo que fui.",
                "<32>* Todo este tiempo, eso es lo que me ha estado echando atrás."
            ],
            d33: ['<25>{#p/asriel1}{#f/23}* $(name)...'],
            d34: ['<32>{#p/basic}* Asriel.\n* Mi hermano.', '<32>* Mereces saber la verdad.'],
            d35: ['<25>{*}{#p/asriel1}{#f/25}* ¿Eh?\n* Pero tu ya has- {%}'],
            d36: ['<32>{#p/basic}* Te perdono a ti, también.'],
            d37: ['<25>{#p/asriel1}{#f/30}{#i/4}* ¡...!', '<25>{#p/asriel1}{#f/26}{#i/4}* $(name)...'],
            d38: ['<32>{#p/basic}* Shh...', "<32>* Está bien.", "<32>* Estoy aquí, ¿vale?"],
            d39: ['<25>{#p/asriel1}{#f/25}{#i/4}* Yo...'],
            d40: ["<32>{#p/basic}* Estoy aquí, Asriel."],
            d41: [
                '<32>{#p/basic}* ... puedo sentirlo.',
                '<32>* Aunque hayan pasado cien años...',
                "<32>* Él todavía está aquí, ¿no?",
                '<32>* Como un pequeño angel...',
                '<32>* Mirándome, protegiéndome de mis propias malas deciosiones...',
                '<32>* ... todo para que un día yo pueda devolverle el favor.'
            ],
            d42: ["<32>{#p/basic}* Todo empieza a tener sentido ahora.", '<32>* Sé lo que tengo que hacer.'],
            d43: ['<25>{*}{#p/asriel1}{#f/25}* ¿Eh?\n* ¿Qué estás... {^60}{%}'],
            d44: ['<25>{*}{#f/25}* ¡No...!{^60}{%}', '<25>{*}{#f/26}* ¡D... déjame ir!{^60}{%}'],
            d45: ['<32>{*}{#p/basic}* Je...{^60}{%}', '<32>{*}* ... cuida de mamá y papá por mi, ¿vale?{^60}{%}'],
            d46: ['<25>{#p/asriel1}{#f/25}* Frisk, ¿estás ahí?', '<25>{#f/22}* Por favor... despierta...'],
            d47: ["<25>{#p/asriel1}{#f/23}* Yo...\n* No quiero perderte a ti también..."],
            d48: ['<25>{#p/asriel1}{#f/17}* ... ahí estás.'],
            d49: [
                "<25>{#p/asriel1}{#f/23}* Ja... pensé que te perdí por un minuto.",
                "<25>{#f/22}* No me asustes así otra vez, ¿vale?",
                '<25>{#f/13}* ...'
            ],
            d50: [
                '<25>{#p/asriel1}{#f/13}* Bueno...\n* Tengo mi ALMA de nuevo dentro de mi ahora.',
                '<25>{#f/15}* La original.',
                '<25>{#f/16}* ...',
                "<26>{#f/16}* Cuando $(name) y yo morimos, debió haberse envuelto sobre mí...",
                '<25>{#f/13}* ... protegiéndome hasta que pueda ser devuelto aquí.',
                '<26>{#f/17}* Se mantuvieron todo este tiempo, solo para volver a verme, Frisk...',
                '<25>{#f/13}* ... así que, lo que menos puedo hacer es honorarlo.',
                '<25>{#f/15}* Vivir la vida que siempre quisieron que tuve.'
            ],
            d51: [
                '<25>{#p/asriel1}{#f/23}* ... Frisk.',
                "<25>{#f/23}* Voy a estar contigo a partir de ahora.",
                "<25>{#f/17}* Donde sea que vayas... te seguiré.",
                '<25>{#f/13}* Siento que...\n* Puedo confiar en ti en ese tipo de cosas.',
                "<25>{#f/13}* Aunque no nos conozcamos mucho.",
                "<25>{#f/15}* ... No sé.",
                '<25>{#f/15}* ...',
                '<25>{#f/13}* Frisk... ¿estás seguro de esto?',
                "<25>{#f/13}* Todas las veces que te he hecho a ti, a tus amigos...",
                "<25>{#f/22}* Es... todo lo que puedo pensar ahora.",
                '<25>{#f/21}* Verlos morir de esa forma en mi mente, una y otra vez...',
                "<25>{#f/22}* Sabiendo que soy yo quien lo hizo.",
                '<25>{#f/15}* ...',
                '<25>{#f/15}* ¿Estás seguro que puedes estar ahí para alguien como él?',
                '<32>{#p/human}* (...)',
                '<25>{#p/asriel1}{#f/15}* ...',
                "<25>{#f/17}* ... Supongo que no te entiendo, Frisk.",
                "<25>{#f/23}* Sin importar lo que te haga... tú no vas a ceder.",
                '<25>{#f/22}* ...',
                "<25>{#f/13}* Ey.\n* Quizás no será tan malo.",
                "<25>{#f/17}* Tenerte ahí conmigo no dañará las cosas.",
                '<25>{#f/13}* ...\n* La cosa es...\n* Si me quedo aquí...',
                "<25>{#f/15}* No sería justo para $(name)... ¿sabes?",
                '<25>{#f/13}* Y además, con mi ALMA devuelta dentro de mi...',
                "<25>{#f/13}* No volveré a ser una estrella.",
                "<25>{#f/13}* Así que... no hay motivo para que esté aquí."
            ],
            d52: [
                '<25>{#p/asriel1}{#f/17}* Bueno.\n* Mejor pongámonos en marcha.',
                '<25>{#f/20}* Tus amigos tal vez estén preocupados por ti ahora.'
            ],
            e1: [
                '<25>{#p/asriel1}{#f/15}* ...',
                "<25>{#f/16}* No sé que le va a pasar a $(name) después de esto.",
                "<25>{#f/13}* Esperaron una oportunidad para verme, pero eso es...",
                '<25>{#f/15}* ... cosa del pasado ahora.'
            ],
            e2: [
                "<25>{#p/asriel1}{#f/13}* Todavía no me puedo creer que haya esperado tanto tiempo solo para verme...",
                '<25>{#f/23}* Maldito idiota.',
                '<25>{#f/17}* ... es lo que habría dicho, si aún fuera una estrella parlante.',
                "<25>{#f/13}* Pero... no creo que sea un idiota."
            ],
            e3: [
                "<25>{#p/asriel1}{#f/13}* $(name) no es estúpido.\n* Y yo...",
                '<25>{#f/13}* Confirmo con mucho de lo que dijeron sobre si mismo...',
                '<25>{#f/15}* Sobre que él no sea el tipo de amigo que quería tener...',
                "<25>{#f/7}* ... ¡pero no significa que quería que se fuera!"
            ],
            e4: [
                "<25>{#p/asriel1}{#f/13}* No es que $(name) tenga que irse...",
                "<25>{#f/17}* Si quisiera, podría estar con nosotros.\n* Me gustaría.",
                "<25>{#f/15}* Pero entiendo si quería irse.",
                '<25>{#f/16}* Él \"ganó\" su juego.\n* Él no debería querer \"jugar\" conmigo más.'
            ],
            e5: [
                "<25>{#p/asriel1}{#f/13}* ... $(name)...\n* Si aún estás ahí, escuchando...",
                '<25>{#f/15}* Quiero que sepas que te amo.',
                '<25>{#f/23}* Puede que no hayas sido la mejor persona...',
                '<25>{#f/22}* Pero profundamente, todavía te preocupabas por mí.'
            ],
            e6: [
                '<25>{#p/asriel1}{#f/23}* Ja...',
                '<25>{#f/22}* Probablemente parezca una persona loca ahora.',
                '<25>{#f/15}* Obsesionándome sobre alguien de quien debería haber superado...',
                '<26>{#f/17}* ... Supongo que $(name) y yo somos un\n  par de malditos idiotas.'
            ],
            e7: [
                '<25>{#p/asriel1}{#f/13}* Una vez, $(name) y yo nos estábamos peleando sobre una cama...',
                "<25>{#f/10}* Porque los dos queríamos la que tenía una mesita al lado.",
                '<26>{#f/15}* Estábamos los dos empujándonos el uno al otro, intentando hacer espacio...',
                '<25>{#f/4}* Toda esa pelea no cansó tanto, que nos dormimos.',
                '<25>{#f/13}* Pero cuando nos despertamos...',
                '<25>{#f/17}* Estábamos tumbados el uno al lado del otro.',
                "<25>{#f/13}* Intenté levantarme, pero... él no quería dejarme ir.",
                '<26>{#f/15}* No paraba de decir...',
                '<25>{#f/15}* \"... caliente...\"',
                '<25>{#f/15}* \"... esponjoso...\"',
                '<25>{#f/20}* Me habría quejado, pero...',
                "<25>{#f/17}* ... en ese momento, solo estaba feliz de que no estuviéramos peleando."
            ],
            e8: [
                '<25>{#p/asriel1}{#f/13}* Esta otra vez, $(name) y yo estábamos haciendo la cena para Mamá y Papá.',
                '<25>{#f/15}* Él quería hacerla más picante...',
                '<25>{#f/3}* Para ser honesto, si él insistiera en eso ahora, no me quejaría.',
                '<25>{#f/20}* Podría ir a por algo picante justo ahora.',
                '<25>{#f/13}* Pero en esos tiempos, me gustaban más dulce.\n* Como la mayoría de los monstruos.',
                '<25>{#f/15}* Acabamos jugando Tira y Afloja con el bol, y...',
                '<25>{#f/20}* Te puedes imaginar lo que pasó después.',
                '<25>{#f/17}* Mamá nos hizo limpiar la faena, por supuesto.',
                '<25>{#f/13}* Luego, Papá nos llevo a comer, y cada uno consiguió lo que quería.'
            ],
            e9: [
                "<25>{#p/asriel1}{#f/15}* $(name) y yo...\n* Era como si no podíamos coincidir en nada...",
                '<25>{#f/20}* Quitando pasar el tiempo juntos, claro.',
                '<26>{#f/17}* A pesar de nuestras diferencias, $(name) y yo éramos inseparables.',
                "<25>{#f/13}* Ni siquiera la muerte pudo separarnos para siempre."
            ],
            e10: [
                "<25>{#p/asriel1}{#f/17}* ... ¿crees que sigue aquí, Frisk?",
                '<25>{#f/17}* Todo lo que sabemos, nos podría estar vigilando ahora mismo.',
                "<25>{#f/23}* ¿No sería algo guay?.",
                "<25>{#f/22}* Pero es imposible saber con certeza."
            ],
            e11: [
                "<25>{#p/asriel1}{#f/17}* Dios mío.\n* Para alguien que va a estar contigo...",
                "<25>{#f/20}* Estoy seguro que parece que preferiría estar con $(name).",
                "<25>{#f/13}* Pero... no es así del todo.",
                "<25>{#f/17}* No puedo hacer nada más que recordar sobre alguien que conocía."
            ],
            e12: () => [
                '<25>{#p/asriel1}{#f/17}* Frisk...\n* Quiero que sepas.',
                '<25>{#f/13}* Gracias a ti...',
                '<25>{#f/23}* Siento que tengo un futuro otra vez.',
                '<25>{#f/22}* ...',
                ...(!SAVE.flag.b.pacifist_marker_forgive
                    ? ["<25>{#f/22}* Aunque no me hayas podido perdonar por lo que he hecho..."]
                    : SAVE.flag.n.killed_sans > 0
                        ? ['<25>{#f/22}* Aunque quería que hicieras esas cosas terribles...']
                        : ['<25>{#f/22}* Aunque te torturé, y amenacé a todos los que amas...']),
                "<25>{#f/13}* Tú aún quieres ayudarme a superarlo.",
                '<25>{#f/23}* ... significa mucho para mí.',
                '<25>{#f/22}* ...',
                '<25>{#f/13}* Mamá, Papá...',
                '<25>{#f/13}* Sans, Papyrus, Undyne, Alphys...',
                "<25>{#f/15}* Todos los que he matado en realidades pasadas...",
                "<25>{#f/16}* ... va a ser difícil para mí confrontarlo.",
                '<25>{#f/13}* ...',
                "<25>{#f/17}* Pero lo intentaré.",
                "<25>{#f/23}* Intentaré ser una mejor persona.",
                '<25>{#f/22}* Y, si meto la pata...',
                "<25>{#f/13}* ... Sé que estarás ahí para ayudarme a recoger las piezas."
            ],
            e13: [
                '<25>{#p/asriel1}{#f/17}* Ja... $(name).',
                "<25>{#f/23}* No te abandonaré, ¿vale?",
                "<25>{#f/22}* Voy a aprovechar al máximo esta oportunidad que me has dado.",
                "<25>{#f/17}* Haré que cuente."
            ]
        },
        evac: ['<32>{#p/human}* (Sientes la presencia de monstruo cercana menguar.)'],
        stargum1: () =>
            SAVE.data.b.svr
                ? [
                    '<32>{#p/human}* (Ves un trozo de chicle pegado en la portada del comic...)',
                    choicer.create('* (¿Masticar el chicle?)', 'Sí', 'No')
                ]
                : [
                    '<32>{#p/basic}* Había un trozo de chicle pegado en la portada del comic.',
                    choicer.create('* (¿Masticar el chicle?)', 'Sí', 'No')
                ],
        stargum2: ['<32>{#p/human}* (Decidiste no masticar.)'],
        stargum3: ['<32>{#p/human}* (Has recuperado $(x) PS.)'],
        stargum4: ['<32>{#p/human}* (PS restaurados.)'],
        fireplace1: () =>
            SAVE.data.b.svr
                ? [
                    '<32>{#p/human}* (Sientes la calidez acogedora de la chimenea...)',
                    choicer.create('* (¿Entrar?)', 'Sí', 'No')
                ]
                : [
                    SAVE.data.n.state_wastelands_toriel === 2 || world.runaway
                        ? '<32>{#p/basic}* Una chimenea normal y corriente.'
                        : "<32>{#p/basic}* La chimenea de Toriel.\n* No es demasiado caliente, solo agradablemente cálido.",
                    ...(world.darker
                        ? []
                        : ['<32>* Probablemente podrías entrar.', choicer.create('* (¿Entrar?)', 'Sí', 'No')])
                ],
        fireplace2a: ['<32>{#p/human}* (Decides no entrar.)'],
        fireplace2b: () => [
            '<32>{#p/human}* (Te metes en la chimenea y dejas que su calor te envuelva.)',
            '<32>{#p/human}* (Estás muy comodo.)',
            ...(SAVE.data.b.svr
                ? asrielinter.fireplace2b++ < 1
                    ? ["<25>{#p/asriel1}{#f/13}* Yo solo, eh, esperaré a que salgas."]
                    : []
                : world.goatbro && SAVE.flag.n.ga_asrielFireplace++ < 1
                    ? ["<25>{#p/asriel2}{#f/15}* Yo solo, eh, esperaré a que salgas..."]
                    : [])
        ],
        fireplace2c: ["<25>{#p/toriel}{#f/1}{#npc/a}* No estés ahí mucho tiempo..."],
        fireplace2d: ['<32>{#p/basic}* ...', '<32>* Esto está bien.'],
        noticereturn: ['<25>{#p/asriel2}{#f/10}* ¿Te has dejado algo allí?'],
        noticestart: [
            '<25>{#p/asriel2}{#f/3}* Ah, el sitio donde todo comenzó.',
            "<25>{#p/asriel2}{#f/4}* Ciertamente nos llevamos mejor desde entonces, ¿no, $(name)?"
        ],
        noticedummy: ['<25>{#p/asriel2}{#f/3}* ...', "<25>{#p/asriel2}{#f/10}* ¿No había un maniquí aquí antes?"],
        afrog: {
            a: [
                '<32>{#p/basic}{#n1}* Entre tú y yo...',
                '<32>* Vi a esa señora cabra pasar por aquí hace poco tiempo.',
                '<32>* Tenía comestibles, así que le pregunté para que eran, y...',
                "<32>* Bueno, te espera un regalo."
            ],
            b: () =>
                SAVE.data.n.plot === 72
                    ? [
                        '<32>{#p/basic}{#n1}* Entre tú y yo...',
                        '<32>* Vi a esa señora cabra pasar por aquí hace un rato.',
                        '<32>* Dijo que era tiempo de \"enfrentar sus miedos\".',
                        "<32>* ¡Bueno, lo que sea que hizo llevo a algo!\n* ¡Somos libres ahora!"
                    ]
                    : SAVE.data.n.plot === 71.2
                        ? [
                            '<32>{#p/basic}{#n1}* ¿La has visto?\n* ¡Ella pasó por aquí justo ahora!',
                            '<32>* Dijo que era tiempo de \"enfrentar sus miedos\".',
                            '<32>* ¿Me pregunto que quería decir...?\n* Ella parecía determinada.'
                        ]
                        : SAVE.data.b.w_state_lateleave
                            ? [
                                '<32>{#p/basic}{#n1}* Entre tú y yo...',
                                '<32>* Vi a esa señora cabra tomar el taxi para el supermercado antes.',
                                "<32>* Ella dijo que se fue a buscar leche, pero aún no ha vuelto...",
                                "<32>* Espero que esté bien."
                            ]
                            : [
                                '<32>{#p/basic}{#n1}* Entre tú y yo...',
                                "<32>* A veces, cuando estoy solo, me gusta tomar el taxi al mercado.",
                                "<32>* Es una pequeña tienda, pero hay muchas cosas para comprar.",
                                "<32>* Quizás te lleve allí alguna vez... ¡te encantaría!"
                            ],
            c: () =>
                SAVE.data.n.plot === 72
                    ? [
                        '<32>{#p/basic}{#n1}* Entre tú y yo...',
                        "<32>* No soy fan de como nos golpeaste a todos al principio.",
                        '<32>* Estábamos tan asustados y confusos...',
                        '<32>* ... al menos hiciste algo bueno al final.'
                    ]
                    : [
                        '<32>{#p/basic}{#n1}* Entre tú y yo...',
                        "<32>* Las personas que golpeaste no están felices de ello.",
                        "<32>* Solo da gracias que estoy fuera de servicio...\n* Porque si no...",
                        "<32>* Tendría tu cabeza."
                    ],
            d: ['<32>{#p/basic}{#n1}* ¡No... no!', '<32>* ¡A-Aléjate de mí!']
        },
        asriel0: [
            "<25>{#p/asriel2}{#f/5}* ... pero eso está bien, ¡sé qué estarás allí a tiempo!",
            "<25>{#p/asriel2}{#f/1}* No querrás abandonarme, ¿no?"
        ],
        asriel1: () =>
            [
                [
                    "<25>{#p/asriel2}{#f/2}* Perdón por eso, use el teléfono de Toriel para llamar a alguien.",
                    "<25>{#p/asriel2}{#f/1}* No te preocupes...\n* Verás por qué dentro de poco.",
                    "<25>{#p/asriel2}{#f/2}* ... jee jee jee.\n* Te esperaré adelante."
                ],
                ["<25>{#p/asriel2}{#f/4}* Te esperaré adelante."],
                ['<25>{#p/asriel2}{#f/3}* ...']
            ][Math.min(SAVE.flag.n.ga_asrielNegative1++, 1)],
        asriel2: () => [
            '<25>{#p/asriel2}{#f/1}* ¿Listo, $(name)?',
            "<25>{#f/2}* Porque cuando continuemos, no hay vuelta atrás.",
            choicer.create('* (¿Seguirle?)', 'Sí', 'No')
        ],
        asriel2b: () => ['<25>{#p/asriel2}{#f/1}* ¿Listo?', choicer.create('* (¿Seguirle?)', 'Sí', 'No')],
        asriel3: ['<25>{#p/asriel2}{#f/2}* Vale...', "<25>{#f/1}* Hagamos esto."],
        asriel4: ["<25>{#p/asriel2}{#f/4}* Te estaré esperando, entonces."],
        asrielDiary: [
            [
                '<32>{#p/human}* (Lees la primera página... apenas se pueden leer las palabras.)',
                '<32>{#p/asriel1}{#v/2}* \"estoy empezando un diario Porque mami dijo que seria divertido.\"',
                '<32>* \"hoy aprendi a plantar semillas en el jardin de papi\"',
                '<32>* \"el dijo que crecerán pronto Pero tardara mucho tiemp.\"',
                '<32>* \"mami va a hacer tarta de caracoles esta noche Y estoy emocionado\"',
                '<32>* \"a parte de eso estoy pasando un buen dia.\"'
            ],
            [
                '<32>{#p/human}* (Pasas a la segunda página...)',
                '<32>{#p/asriel1}{#v/2}* \"diario de azzy, k-504\"',
                '<32>* \"mami dijo que devo escrivir la fecha Para que gente sabra cuando lo escrivi.\"',
                '<32>* \"mi flor estornino aun no cresio pero papi promete que lo ara pronto\"',
                '<32>* \"desearía que hubiera una ventana en mi cuarto pero papi dijo que hay tuberías aquí.\"',
                '<32>* \"aunque dijeron que ivan a poner una ventana en el salón\"',
                '<32>* \"estoy pasando un buen dia hoy tanbien.\"'
            ],
            [
                '<32>{#p/human}* (Pasas a la tercera página... parece que han pasado un par de años.)',
                '<32>{#p/asriel1}{#v/2}* \"Diario de Azzy, K-506.03.\"',
                '<32>* \"Mi diario viejo estaba en una vieja caja de juguetes Y quería poner más en él.\"',
                '<32>* \"Parece que solo escribí la primera parte de la fecha la última vez.\"',
                '<32>* \"Por cierto la Flor Estornino que planté antes creció.\"',
                '<32>* \"Pero entré en una plea con un amio el otro día y no hemos hablado despues de eso.\"',
                '<32>* \"Estoy preocupado por él... espero que ya no esté enfadado.\"'
            ],
            [
                '<32>{#p/human}* (Pasas a la cuarta página...)',
                '<32>{#p/asriel1}{#v/2}* \"Diario de Azzy, K-506.03\"',
                '<32>* \"hablé con mi amigo, dijo que ya no estaba enfadado, así que está bien\"',
                '<32>* \"Mami y yo estábamos fuera mirando el cielo Y vimos una estrella fugaz.\"',
                '<32>* \"Ella dijo que pidiera un deseo... deseé que un día un humano biniera.\"',
                '<32>* \"Mami y Papi cuentan muchas historias sobre ellos...\"',
                '<32>* \"¿No todos seran malos sierto?\"'
            ],
            [
                '<32>{#p/human}* (Pasas a la quinta página...)',
                '<32>{#p/asriel1}{#v/2}* \"Diario de Azzy, K-506.03\"',
                '<32>* \"No hay mucho que decir hoy.\"',
                '<32>* \"Quizás la idea de tener este diario sea un poco tonta.\"',
                '<32>* \"Mamá me vio escriviendo en el el otro dia y dijo que estaba orgullosa de mi.\"',
                '<32>* \"¿De verdad es tan importanti?\"'
            ],
            [
                '<32>{#p/human}* (Pasas a la sexta página... parece que han pasado otro par de años.)',
                '<32>{#p/asriel1}{#v/1}* \"Diario de Azzy, K-510.08\"',
                '<32>* \"Parece que no puedo escribir en esta cosa tanto tiempo a la vez.\"',
                '<32>* \"Pero hoy vi el libro otra vez y decidí escribir un poco más en él\"',
                '<32>* \"Los últimos han sido buenos, fui al colegio y aprendí muchas cosas.\"',
                '<32>* \"Como sumar.\"\n* \"Y como usar un ordenador.\"',
                '<32>* \"Pero Mamá dijo que Soy muy joven para hacer una cuenta online.\"',
                '<32>* \"Quizás un día cuando Sea mayor puedo tener una.\"'
            ],
            [
                '<32>{#p/human}* (Pasas a la séptima página...)',
                '<32>{#p/asriel1}{#v/1}* \"Diario de Azzy, K-510.08.\"',
                '<32>* \"Ese chico listo nos visitó hoy otra vez. Dijo que tuvo un mal sueño sobre un humano.\"',
                '<32>* \"Oh, ¿os lo he mencionado? Él es la persona científica a la que papá habla mucho.\"',
                '<32>* \"Él inventó muchas cosas que usamos ahora.\"',
                '<32>* \"Como los replicadores y fabricadores y cosas de gravedad.\"',
                '<32>* \"Pero me miró muy extraño Como si fuera muy aterrador.\"',
                '<32>* \"¿Hice algo mal?\"'
            ],
            [
                '<32>{#p/human}* (Pasas a la octava página...)',
                '<32>{#p/asriel1}{#v/1}* \"Diario de Azzy, K-510.08.\"',
                '<32>* \"Una nueva estrella apareció en el cielo hoy.\"',
                '<32>* \"Una muy vrillante.\"',
                '<32>* \"Me pregunto por que más estrellas no aparecen así todo el tiempo.\"',
                '<32>* \"Además nos vamos a mudar a la nueva Capital cuando sea construida.\"',
                '<32>* \"¡Vi sus planos de construcción, se ve increíble por ahora!\"',
                '<32>* \"Va a ser mucho mejor que vivir en la fábrica también.\"'
            ],
            [
                '<32>{#p/human}* (Pasas a la novena página... parece que se han saltado un día.)',
                '<32>{#p/asriel1}{#v/1}* \"Diario de Azzy, K-510.09.\"',
                '<32>* \"Conocí a un humano de verdad ayer. Se estrelló en el basurero cerca de casa.\"',
                '<32>* \"Le ayudé a salir fuera de la nave y dijo gracias.\"',
                '<32>* \"No pensé que esto pasaría nunca, pero aquí está.\"',
                '<32>* \"Y él en realidad es je{#p/basic}f{#p/asriel1}{#v/1}h{#p/basic}sj jaja azzy es un trasero apestoso y je{#p/asriel1}{#v/1}vh{#p/basic}v{#p/asriel1}{#v/1}j{#p/basic}a{#p/asriel1}{#v/1}s\"',
                '<32>* \"Vale, me escondí debajo de las sábanas para que $(name) no estropeé lo que escribo.\"',
                '<32>* \"Puede ser un poco malo a veces, pero está bien.\"',
                '<32>* \"Mamá hizo el coso de pelear con él y suya alma era roja y al revés.\"',
                '<32>* \"Es muy bonito tener a alguien para hablar cada día.\"'
            ],
            [
                '<32>{#p/human}* (Pasas a la décima página...)',
                '<32>{#p/asriel1}{#v/1}* \"Diario de Azzy, K-510.09.\"',
                '<32>* \"Mamá dijo que va a adoptar a $(name) a la familia.\"',
                '<32>* \"No sé que significa adoptar pero ella dijo que yo seré como su hermano.\"',
                '<32>* \"Pero eso está bien Porq entonces podré pasar más tiempo con él.\"',
                '<32>* \"¡Yo y $(name) vamos a hacer todo juntos!\"',
                '<32>* \"Además él se disculpo por lo que pasó en la última página del diario.\"',
                '<32>* \"Aún no se lo he dicho, pero le perdono.\"',
                '<32>{#p/basic}* ...'
            ],
            [
                '<32>{#p/human}* (Pasas a la undécima página.)',
                '<32>{#p/asriel1}* \"Diario de Azzy, K-515.09\"',
                '<32>* \"$(name) dijo que es hora del plan.\"',
                '<32>* \"Estaba asustado, pero él dijo que podía hacerlo.\"',
                '<32>* \"Después de está entrada, esperaré a que coma la tarta envenenada que hicimos...\"',
                '<32>* \"Y entonces podremos salvar a todos juntos.\"',
                '<32>* \"Si algo va mal, y estás leyendo esto después...\"',
                '<32>* \"Quiero que sepas que eres el mejor, $(name).\"',
                '<32>{#p/basic}* ...',
                '<32>{#p/human}* (Suena como si alguien estuviera llorando...)'
            ]
        ],
        backdesk: {
            a: () => [
                ...(SAVE.data.b.svr ? [] : ["<32>{#p/basic}* Hay una mochila colgada en este perchero."]),
                '<32>{#p/human}* (Miras dentro de la mochila...)',
                ...(SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Pero no había nada más que encontrar dentro.)']
                    : ['<32>{#p/basic}* Nada más que encontrar aquí..'])
            ],
            b: () => [
                ...(SAVE.data.b.svr ? [] : ["<32>{#p/basic}* Hay una mochila colgada en este perchero."]),
                '<32>{#p/human}* (Miras dentro de la mochila...)',
                ...(SAVE.data.b.svr
                    ? []
                    : ["<32>{#p/basic}* ¿Qué es eso?\n* ¿Un comic edición limitada de Super Starwalker?"]),
                '<32>{#s/equip}{#p/human}* (Conseguiste Super Starwalker 2.)'
            ],
            b2: () => [
                ...(SAVE.data.b.svr ? [] : ["<32>{#p/basic}* Hay una mochila colgada en este perchero."]),
                '<32>{#p/human}* (Miras dentro de la mochila...)',
                ...(SAVE.data.b.svr
                    ? []
                    : ["<32>{#p/basic}* ¿Qué es eso?\n* ¿Un comic edición limitada de Super Starwalker?"]),
                "<32>{#p/human}* (Llevas demasiado encima para tomar eso.)"
            ]
        },
        midsleep: () => [
            '<32>{#p/human}* (Si duermes aquí ahora, podrás perderte algo importante.)',
            choicer.create('* (¿Ir a dormir?)', 'Sí', 'No')
        ],
        bedfailToriel: [
            '<25>{#p/toriel}{#f/5}* Oh cariño.',
            '<25>{#f/1}* Quizás mis acciones han causado mas daño de lo que imaginé...',
            '<25>{#f/0}* ...\n* No te preocupes, mmi niño.',
            "<25>* Me aseguraré que tengas un buen descanso de noche para tu aventura.",
            '<32>{#p/human}* (Toriel se sienta a tu lado y canta una nana para ponerte a dormir.)'
        ],
        blooky1: () => [
            '<32>{#p/napstablook}* Zzz... Zzz...',
            '<32>* Zzz... Zzz...',
            "<32>{#p/basic}* Este fantasma sigue diciendo 'z' en voz alta, fingiendo dormir.",
            choicer.create('* (¿Intentar pasar a través de él?)', 'Sí', 'No')
        ],
        blooky2: () => [
            '<32>{#p/basic}* El fantasma aún está bloqueando el camino.',
            choicer.create('* (¿Intentar pasar a través de él?)', 'Sí', 'No')
        ],
        blooky3: [
            '<32>{#p/napstablook}* normalmente visito este lugar para tener un poco de paz y tranquilidad...',
            '<32>* pero hoy conoci a alguien simpático...',
            "<32>* bueno, me quitaré de tu camino ahora",
            '<32>* hasta pronto...'
        ],
        blooky4: [
            '<32>{#p/napstablook}* entonces um...\n* de verdad te gusto, huh',
            '<32>* jej... gracias...',
            '<32>* y, uh... perdón que me puse en tu camino antes...',
            "<32>* me ire a otro sitio ahora",
            "<32>* pero... no te preocupes...",
            "<32>* me verás después...",
            '<32>* si quieres...',
            '<32>* bueno, hasta pronto...'
        ],
        blooky5: [
            '<32>{#p/napstablook}* así que um... de verdad me desprecias, eh',
            "<32>* eso es... lindo...",
            "<32>* bueno, iré por mi camino ahora",
            '<32>* adios...'
        ],
        blooky6: [
            '<32>{#p/napstablook}* entonces um... paso eso...',
            '<32>* ...',
            '<32>* eh... me tengo que ir ahora',
            '<32>* hasta pronto...'
        ],
        blooky7: [
            "<32>{#p/napstablook}* ni siquiera me has dicho nada...",
            "<32>* eso es... ni siquiera se que es eso...",
            "<32>* bueno, me voy a ir yendo ahora",
            '<32>* adios...'
        ],
        breakfast: ['<32>{#p/human}* (Conseguiste los Caracoles Fritos.)'],
        breakslow: ["<32>{#p/human}* (Llevas demasiado encima para tomar eso.)"],
        candy1: () =>
            SAVE.data.b.svr
                ? [
                    '<32>{#p/human}* (Te acercas a la máquina expendedora.)',
                    choicer.create('* (¿Qué vas a hacer?)', 'Caramelo', 'Agua', 'Δ-9', 'Nada')
                ]
                : [
                    '<32>{#p/basic}* ¿Sintetizar algo con la máquina expendedora?',
                    choicer.create('* (¿Qué vas a hacer?)', 'Caramelo', 'Agua', 'Δ-9', 'Nada')
                ],
        candy2: ['<32>{#p/human}* (Conseguiste el $(x).)\n',
'<32>{#p/human}* (Pulsa [C] para abrir el menú.)'],
        candy3: ['<32>{#p/human}* (Conseguiste el $(x).)'],
        candy4: () => [
            '<32>{#p/human}* (Conseguiste el $(x).)',
            ...(SAVE.data.b.svr ? [] : ['<32>{#p/basic}* La máquina está empezando a malfuncionar.'])
        ],
        candy5: () => [
            '<32>{#p/human}* (Conseguiste el $(x).)',
            ...(SAVE.data.b.svr ? [] : ['<32>{#p/basic}* La máquina se ha roto.'])
        ],
        candy6: () =>
            SAVE.data.b.svr
                ? [
                    [
                        '<25>{#p/asriel1}{#f/13}* ¿Fuera de servicio otra vez?',
                        "<25>{#f/17}* Si, eso es... por diseño, en realidad.",
                        "<25>{#f/13}* Esta máquina funciona con la energía de las Afueras, así que...",
                        '<25>{#f/15}* Para evitar usar mucha energía, Toriel hizo que se rompiera sola.',
                        "<26>{#f/20}* No que te lo fuera a decir."
                    ],
                    [
                        '<25>{#p/asriel1}{#f/13}* Sin embargo, el motivo de que la energía sea tan poca...',
                        "<25>{#f/17}* Es porque, al contario del CORE, solo usa radiación de fondo.",
                        "<25>{#f/13}* Para explicarlo con números, diría...",
                        '<25>{#f/15}* Que genera como diez millonésimas de la energía que hace el CORE.'
                    ],
                    [
                        '<25>{#p/asriel1}{#f/13}* Mmm...',
                        '<25>{#f/15}* Me pregunto, si a pesar de su poca capacidad...',
                        '<25>{#f/13}* Este generador será suficiente para alimentar un pequeño sistema atmosférico.',
                        '<25>{#f/17}* Si el CORE fuera destruido, ¿cómo sobreviviría aquí la gente...?'
                    ],
                    ['<26>{#p/asriel1}{#f/20}* ... preguntando por un amigo.']
                ][Math.min(asrielinter.candy6++, 3)]
                : ["<32>{#p/basic}* Está fuera de servicio."],
        candy7: ['<32>{#p/human}* (Decides no hacer nada.)'],
        candy8: ["<32>{#p/human}* (Llevas demasiado encima.)"],
        chair1a: () => [
            '<25>{#p/toriel}{#f/1}{#n1}* ¿Qué pasa, mi niño?\n* ¿Tienes hambre?',
            '<25>{#f/0}* Quizás quieras saber más sobre el libro que estoy leyendo.',
            choicer.create('{#n1!}* (¿Qué dices?)', 'Hambre', 'Libro', 'Hogar', 'Nada')
        ],
        chair1b: () => [
            '<25>{#p/toriel}{#n1}* ¿Qué pasa, mi niño?',
            choicer.create('{#n1!}* (¿Qué dices?)', 'Hambre', 'Libro', 'Hogar', 'Nada')
        ],
        chair1c: ['<25>{#p/toriel}{#n1}* Bueno, déjame saber si necesitas algo.'],
        chair1d: ['<25>{#p/toriel}{#n1}* Bueno, déjame saber si cambias de idea.'],
        chair1e: () => [
            '<25>{#p/toriel}{#f/1}{#n1}* ¿Noche inquieta?',
            '<25>{#f/1}* ...\n* Si quieres, te puedo leer este libro...',
            '<25>{#f/0}* Se llama \"Monstruo Generoso\" y fue escrito por un humano.',
            choicer.create('{#n1!}* (¿Leer el libro?)', 'Sí', 'No')
        ],
        chair1f: pager.create(
            0,
            ['<25>{#p/toriel}{#n1}{#f/1}* ¿De vuelta para una visita?', '<25>{#f/0}* Buena, quédate libre estar todo el tiempo que quieras.'],
            ['<26>{#p/toriel}{#n1}{#f/5}* Debo quedarme aquí, como siempre hice...']
        ),
        chair2a1: () => [
            '<25>{#p/toriel}{#f/1}{#n1}* ¿Tienes hambre?\n* ¿Te gustaría que hiciera el desayuno?',
            choicer.create('{#n1!}* (¿Desayunar?)', 'Sí', 'No')
        ],
        chair2a2: ['<25>{#p/toriel}{#n1}* ¡Perfecto!\n* Estaré en la cocina preparándolo.'],
        chair2a3: () => [
            '<25>{#p/toriel}{#f/1}{#n1}* ¿Has cambiado de idea sobre el desayuno?',
            choicer.create('{#n1!}* (¿Desayunar?)', 'Sí', 'No')
        ],
        chair2a4: () =>
            SAVE.data.b.drop_snails
                ? [
                    '<25>{#p/toriel}{#f/3}{#n1}* ¿Esperas que haga otro después de que tires el primero?',
                    '<25>{#f/4}* Este niño...',
                    '<25>{#f/0}* No, pequeño.\n* No haré otro desayuno.'
                ]
                : [
                    '<25>{#p/toriel}{#n1}* Ya he hecho el desayuno, pequeño.',
                    '<25>{#f/1}* No podemos tener desayuno más de una vez por día, ¿o sí?',
                    '<25>{#f/0}* Eso sería tonto.'
                ],
        chair2c1: () => [
            '<25>{#p/toriel}{#n1}* ¡Ah, el libro!\n* Si, es una lectura divertida.',
            '<25>{#f/0}* Se llama el \"Monstruo Generoso\" y fue escrito por un humano.',
            '<25>{#f/1}* ¿Te gustaría que yo te lo leyera?',
            choicer.create('{#n1!}* (¿Leer el libro?)', 'Sí', 'No')
        ],
        chair2c2: ['<25>{#p/toriel}{#n1}* ¡Esplendido!', '<25>{#g/torielCompassionSmile}* ...'],
        chair2c3: () => [
            '<25>{#p/toriel}{#f/1}{#n1}* ¿Quieres que te lea el libro ahora?',
            choicer.create('{#n1!}* (¿Leer el libro?)', 'Sí', 'No')
        ],
        chair2c4: () => [
            '<25>{#p/toriel}{#f/1}{#n1}* ¿Quieres que te lea el libro de nuevo?',
            choicer.create('{#n1!}* (¿Leer el libro?)', 'Sí', 'No')
        ],
        chair2c5: ['<25>{#p/toriel}{#f/1}{#n1}* Esta bien, entonces...', '<25>{#p/toriel}{#g/torielCompassionSmile}* ...'],
        chair2c6: [
            '<25>{#f/1}{#n1}* \"Había una vez una monstruo...\"',
            '<25>{#f/0}* \"Y ella amo a un pequeño humano.\"',
            '<25>{#f/1}* \"Y cada día, el humano la visitaba...\"',
            '<25>{#f/0}* \"Y ellos corrían y jugaban juntos en los campos.\"',
            '<25>{#f/1}* \"Ellos cantaban canciones juntos, se contaban historias...\"',
            '<25>{#f/0}* \"Y ellos jugaban al escondite.\"',
            '<25>{#f/1}* \"Y cuando el humano estaba cansado, ella lo metía en la cama...\"',
            '<25>{#f/0}* \"Y el humano amaba a la monstruo muchísimo.\"',
            '<25>{#f/0}* \"Y la monstruo estaba feliz.\"',
            '<25>{#f/1}* \"Pero a medida que pasaba el tiempo, y el humano crecía...\"',
            '<25>{#f/0}* \"La monstruo a menudo se quedaba sola.\"',
            '<25>{#f/1}* \"Entonces un día, el humano regreso...\"',
            '<25>{#f/0}* \"Y la monstruo dijo \'¡Vamos, humano, ven y juega!\'\"',
            '<25>{#f/5}* \"\'Soy muy grande para jugar,\' dijo el humano.\"',
            '<25>{#f/1}* \"\'Quiero conducir, encontrar un nuevo hogar...\'\"',
            "<25>{#f/5}* \"'Perdón,' dijo ella, 'pero soy muy pobre para tener un auto.'\"",
            '<25>{#f/5}* \"\'Todo lo que tengo son mis 2 pies.\'\"',
            '<25>{#f/0}* \"\'Súbete a mi espalda y puedo llevarte a donde quieras ir.\'\"',
            '<25>{#f/0}* \"\'Así puede ver la ciudad y estar feliz.\'\"',
            '<25>{#f/1}* \"Así que el humano se subió a la espalda de la monstruo...\"',
            '<25>{#f/0}* \"Y la monstruo lo llevo a un nuevo hogar.\"',
            '<25>{#f/0}* \"Y la monstruo estaba feliz.\"',
            '<25>{#f/1}* \"Pero el humano se alejo por un largo tiempo...\"',
            '<25>{#f/5}* \"Y la monstruo estaba triste.\"',
            '<25>{#f/0}* \"Pero un día, el humano regreso.\"',
            '<25>{#f/1}* \"Y la monstruo sonrió de oreja a oreja y dijo...\"',
            '<25>{#f/1}* \"\'¡Vamos, humano, ven y sube a mi espalda!\'\"',
            '<25>{#f/5}* \"\'Estoy muy triste para pasear,\' dijo el humano.\"',
            '<25>{#f/1}* \"\'Desearía tener una familia y mis propios hijos...\'\"',
            "<25>{#f/5}* \"'Perdón,' dijo el monstruo, 'pero no puedo darte eso.'\"",
            '<25>{#f/5}* \"\'Yo soy solo una persona.\'\"',
            '<25>{#f/0}* \"\'Visítanos un rato y te encontraremos una cita.\'\"',
            '<25>{#f/0}* \"\'Entonces podrás encontrar amor y ser feliz.\'\"',
            '<25>{#f/1}* \"Así que el humano visito a su vieja amiga por un tiempo...\"',
            '<25>{#f/0}* \"Y la monstruo le encontró a alguien que podría gustarle.\"',
            '<25>{#f/0}* \"Y la monstruo estaba feliz.\"',
            '<25>{#f/5}* \"Pero el humano se alejo por un largo tiempo\"',
            '<25>{#f/1}* \"Cuando el humano regreso, la monstruo estaba muy feliz...\"',
            '<25>{#f/9}* \"Ella apenas podía hablar.\"',
            '<25>{#f/1}* \"\'Ven, humano,\' ella susurro...\"',
            '<25>{#f/1}* \"\'Ven a visitarme.\'\"',
            '<25>{#f/5}* \"\'Estoy viejo y ocupado para visitarte,\' dijo el humano.\"',
            '<25>{#f/1}* \"\'Quiero un lugar para descansar por la noche...\'\"',
            "<25>{#f/5}* \"'Perdón,' dijo ella, 'pero no tengo una cama de tu tamaño.'\"",
            '<25>{#f/5}* \"\'Aún soy demasiada pobre para tener una.\'\"',
            '<25>{#f/0}* \"\'Duerme conmigo por la noche.\'\"',
            '<25>{#f/0}* \"\'Así puedes descansar un poco y ser feliz.\'\"',
            '<25>{#f/1}* \"Y así el humano y la monstruo se acurrucaron juntos...\"',
            '<25>{#f/0}* \"Y la monstruo pudo poner al humano a dormir.\"',
            '<25>{#f/0}* \"Y la monstruo estaba feliz.\"',
            '<25>{#f/5}* \"... pero en realidad no.\"',
            '<25>{#f/9}* \"Y después de un largo tiempo, el humano regreso de nuevo.\"',
            "<25>{#f/5}* \"'Perdón, humano,' dijo la monstruo, 'pero he caído.'\"",
            '<25>{#f/5}* \"\'Me fallan las piernas, No puedo llevarte a pasear.\'\"',
            '<25>{#f/10}* \"\'No hay ningún lugar donde quiera,\' dijo el humano.\"',
            '<26>{#f/5}* \"\'No te pude hallar una cita, no conozco a nadie\' dijo ella.\"',
            '<25>{#f/10}* \"\'No hay nadie más con quien quiera estar,\' dijo el humano.\"',
            '<25>{#f/5}* \"\'Estoy demasiada débil para que duermas sobre mí\', dijo la monstruo.\"',
            '<25>{#f/10}* \"\'Ya no necesito dormir más,\' dijo el humano.\"',
            "<25>{#f/5}* \"'Yo lo siento,' suspiro la monstruo.",
            '<25>{#f/5}* \"\'Desearía tener algo para ofrecerte, pero ya no tengo nada.\'\"',
            '<25>{#f/9}* \"\'Solo soy una vieja monstruo aproximándose a su muerte.\'\"',
            '<25>{#f/5}* \"\'Yo lo siento...\'\"',
            '<25>{#f/10}* \"\'Ya no necesito nada más,\' dijo el humano.\"',
            '<25>{#f/10}* \"\'Solo un abrazo de mi mejor amiga antes de que yo muera.\'\"',
            '<25>{#f/1}* \"\'Bueno,\' dijo la monstruo, enderezando su postura...\"',
            '<25>{#f/0}* \"\'Bueno, una vieja monstruo siempre esta aquí para eso.\'\"',
            '<25>{#f/0}* \"\'Ven conmigo, humano. Quédate conmigo una ultima vez.\'\"',
            '<25>{#f/9}* \"Y así lo hizo el humano.\"',
            '<25>{#f/10}* \"Y la monstruo estaba feliz.\"'
            
        ],
        chair2c7: ['<25>{#f/0}{#n1}* Bueno, esa fue la historia.', '<25>{#f/1}* Espero que te haya gustado...'],
        chair2c8: ['<25>{#f/0}{#n1}* Bueno, eso es todo.'],
        chair2d1: [
            '<25>{#p/toriel}{#f/1}{#n1}* ¿Hogar...?\n* ¿Podrías ser un poco más especifico?',
            choicer.create('* (¿Qué dices?)', 'No es\nnada', '¿Cuándo iré\na casa?')
        ],
        chair2d2: [
            '<25>{#p/toriel}{#f/1}{#n1}* Pero... este es tu hogar ahora, ¿no es así?',
            choicer.create('* (¿Qué dices?)', '\nPerdón', 'Salir de\nLas Afueras')
        ],
        chair2d3: [
            '<25>{#p/toriel}{#f/5}{#n1}* Por favor, trata de entender...',
            '<25>{#p/toriel}{#f/9}* Solo quiero lo mejor para ti.'
        ],
        chair2d4: [
            '<25>{#p/toriel}{#f/5}{#n1}* Mi niño...',
            choicer.create('* (¿Qué dices?)', '\nPerdón', 'Salir de\nLas Afueras')
        ],
        chair2d5: ['<25>{#p/toriel}{#f/5}{#n1}* ...'],
        chair2d6: [
            '<25>{#p/toriel}{#f/9}{#n1}* ...',
            '<25>{#p/toriel}{#f/9}* Por favor, espera aquí.',
            '<25>{#p/toriel}{#f/5}* Hay algo que tengo que hacer.'
        ],
        chair3: () =>
            SAVE.data.b.svr
                ? [
                    [
                        "<25>{#p/asriel1}{#f/20}* Todavía no puedo creer que ella haya movido esto desde la Capital.",
                        "<25>{#f/17}* Pero... Entiendo por qué ella querría.",
                        '<25>{#f/13}* Mamá y esta silla suya se remontan desde hace mucho tiempo..'
                    ],
                    [
                        '<25>{#p/asriel1}{#f/13}* Una vez, ella me dijo algo...',
                        '<25>{#f/17}* \"Esta silla me recuerda a mi hogar.\"',
                        '<25>{#f/13}* Pero ella ya estaba en su hogar, así que le pregunte a que se refería.',
                        '<25>{#f/17}* Resulta que ella tenía esto en su casa...',
                        '<25>{#f/23}* ... en su antiguo hogar natal.'
                    ],
                    [
                        "<25>{#p/asriel1}{#f/13}* No se mucho sobre ese mundo, Frisk...",
                        '<25>{#f/17}* Pero escuche que era muy... idílico.',
                        '<25>{#f/20}* Seguro, ahí había muchos avances en magia y tecnología...',
                        '<25>{#f/17}* Pero la gente lo amaba, porque la vida era tan... simple.'
                    ],
                    ["<25>{#p/asriel1}{#f/23}* Lo que daría por tener una vida sencilla."]
                ][Math.min(asrielinter.chair3++, 3)]
                : world.darker
                    ? ['<32>{#p/basic}* Un sillón para leer.']
                    : ['<32>{#p/basic}* Un sillón para leer...', '<32>* Parece del tamaño perfecto para Toriel.'],
        chair4: ['<25>{#p/toriel}{#n1}* Ah, ahí estas.', '<25>* Te deje tu desayuno en la mesa para ti.'],
        closetrocket: {
            a: () => [
                '<32>{#p/human}* (Miras dentro del armario...)',
                ...(SAVE.data.b.svr
                    ? [
                        [
                            "<25>{#p/asriel1}{#f/13}* Si, eh, eso es todo lo que puedes encontrar ahí.",
                            "<25>{#f/17}* No estoy seguro de porque Toriel puso esto aquí.",
                            '<25>{#f/17}* $(name) y yo nunca estuvimos interesados en los comics.'
                        ],
                        ['<25>{#p/asriel1}{#f/10}* ¿Supongo que ella solo quiere pretender que vivimos aquí...?'],
                        ['<25>{#p/asriel1}{#f/13}* Las cosas que hace una madre para sentirse mejor...']
                    ][Math.min(asrielinter.closetrocket_a++, 2)]
                    : ['<32>{#p/basic}* Nada más que encontrar aquí..'])
            ],
            b: () => [
                '<32>{#p/human}* (Miras dentro del armario...)',
                ...(SAVE.data.b.svr
                    ? []
                    : ["<32>{#p/basic}* ¿Qué es eso?\n* ¿Un comic edición limitada de Super Starwalker?"]),
                '<32>{#s/equip}{#p/human}* (Conseguiste Super Starwalker 3.)'
            ],
            b2: () => [
                '<32>{#p/human}* (Miras dentro del armario...)',
                ...(SAVE.data.b.svr
                    ? []
                    : ["<32>{#p/basic}* ¿Qué es eso?\n* ¿Un comic edición limitada de Super Starwalker?"]),
                "<32>{#p/human}* (Llevas demasiado encima para tomar eso.)"
            ]
        },
        goner: {
            a1: () =>
                SAVE.flag.b.$svr
                    ? [
                        "<32>{#p/human}* Ya vi el efecto que tuviste en este mundo...",
                        '<32>* Un final perfecto, donde todos son felices...',
                        "<32>* Hay algo especial sobre eso."
                    ]
                    : [
                        '<32>{#p/human}* Un mundo sin asociaciones...',
                        '<32>* Existir puramente por su propia belleza...',
                        "<32>* Hay algo especial sobre eso."
                    ],
            a2: () =>
                SAVE.flag.b.$svr
                    ? ['<32>* Habiendo dicho eso...', "<32>* Parece que no fue suficiente para satisfacer tu... curiosidad."]
                    : ['<32>* Dime...', '<32>* Eso no despierta tu... curiosidad?']
        },
        danger_puzzle1: () => [
            '<25>{#p/toriel}* En esta habitación hay un nuevo tipo de puzle.',
            [1, 5].includes(SAVE.data.n.state_wastelands_dummy)
                ? '<25>{#f/3}* Quizá te vaya mejor aquí que con el maniquí.'
                : '<25>{#f/1}* ¿Crees que puedas resolverlo?'
        ],
        danger_puzzle2: () =>
            world.darker
                ? ["<32>{#p/basic}* Esta muy alto para que puedas alcanzarlo."]
                : ["<32>{#p/basic}* La altura de esta terminal se eleva sobre ti, bloqueando tu ansioso enfoque."],
        danger_puzzle3: () => [
            [1, 5].includes(SAVE.data.n.state_wastelands_dummy)
                ? '<25>{#p/toriel}{#f/3}* Qué pasa ahora...'
                : '<25>{#p/toriel}{#f/1}* ¿Cuál es el problema?\n* ¿Necesitas ayuda?'
        ],
        danger_puzzle4: () => [
            ...([1, 5].includes(SAVE.data.n.state_wastelands_dummy)
                ? ['<25>{#p/toriel}{#f/5}* Ah... ya veo.', '<25>{#f/5}* El terminal está demasiado alto para que puedas alcanzarlo.']
                : [
                    '<25>{#p/toriel}{#f/7}* ... oh mi.',
                    '<25>{#f/6}* Parece que hay un error de diseño aquí.',
                    '<25>{#f/5}* ¿Así que el terminal está muy alto para que puedas alcanzarlo...?'
                ]),
            '<25>{#f/0}* No hay problema.\n* Lo operaré por ti.',
            '<25>{#f/0}* ...',
            '<25>{#f/0}* Aquí hay un acertijo.\n* ¿Te gustaría resolverlo?',
            choicer.create('* (¿Resolver el acertijo?)', 'Sí', 'No')
        ],
        danger_puzzle5a: [
            '<25>{#p/toriel}* ¡Excelente!\n* Es importante el afán de aprender y crecer.',
            '<25>{#f/0}* Especialmente para un joven como tú.'
        ],
        danger_puzzle5b: [
            '<25>{#p/toriel}{#f/0}* El acertijo toma la forma de una pregunta.',
            "<25>{#p/toriel}{#f/1}* \"¿Qué se hornea como un pastel y rima con carta?\""
        ],
        danger_puzzle5c: [
            '<32>{#p/human}* (...)\n* (Le dices a Toriel la respuesta.)',
            '<25>{#p/toriel}{#f/0}* ... ah, muy bien.\n* ¡Y con una buena actitud positiva!'
        ],
        danger_puzzle5d: [
            '<32>{#p/human}* (...)\n* (Le dices a Toriel que no sabes la respuesta.)',
            '<25>{#p/toriel}{#f/1}* ... ¿Tienes algún problema? ',
'<25>{#p/toriel}{#f/1}* Parece que tienes algo en mente.',
            '<25>{#f/5}* ... hmm...',
            '<25>{#f/0}* Bueno, esta bien.\n* Esta vez te resolveré el acertijo.'
        ],
        danger_puzzle5e: () =>
            [1, 5].includes(SAVE.data.n.state_wastelands_dummy)
                ? ['<25>{#p/toriel}{#f/5}* ...', '<25>{#f/5}* Ya veo.']
                : ['<25>{#p/toriel}{#f/0}* ...', '<25>{#f/0}* Supongo que esta vez te puedo resolver el acertijo.'],
        danger_puzzle6: () => [
            [1, 5].includes(SAVE.data.n.state_wastelands_dummy) && SAVE.data.b.w_state_riddleskip
                ? '<25>{#p/toriel}{#f/5}* Y... {#x1}ahí.\n* El camino está despejado.'
                : '<25>{#p/toriel}* Y... {#x1}¡ahí!\n* ¡El camino está despejado!'
        ],
        danger_puzzle7: () => [
            [1, 5].includes(SAVE.data.n.state_wastelands_dummy) && SAVE.data.b.w_state_riddleskip
                ? '<25>{#p/toriel}{#f/5}* Esperaré a que entres en la siguiente habitación.'
                : '<25>{#p/toriel}* Cuando estés listo, podrás entrar en la siguiente habitación.'
        ],
        danger_puzzle8: () =>
            SAVE.data.b.svr
                ? ["<32>{#p/human}* (Pero todavía no puedes alcanzar el terminal.)"]
                : ['<32>{#p/basic}* Incluso ahora, el terminal sigue tan alto como siempre.'],
        denie: ["<32>{#p/human}* (Llevas demasiado encima para tomar eso.)"],
        dipper: {
            a: () => [
                '<32>{#p/human}* (Conseguiste el Cucharón Pequeño.)',
                choicer.create('* (¿Equiparte el Cucharón Pequeño?)', 'Sí', 'No')
            ],
            b: ["<32>{#p/human}* (Llevas demasiado encima para tomar eso.)"]
        },
        drop_pie: ['<25>{#p/toriel}{#f/1}* Las tartas son para comer, no para salpicarlo en el suelo.'],
        drop_pie3: ['<25>{#p/toriel}{#f/1}* Por favor no derrames comida en el suelo.'],
        drop_snails: ['<25>{#p/toriel}{#f/1}* Qué te han hecho esos pobres caracoles fritos.'],
        drop_soda: ["<32>{#p/basic}{#n1}* Aww ¡vamos! ;)", '<32>* ¡Puse mi corazón en eso! ;)'],
        drop_steak: ['<32>{#p/basic}{#n1}* ¡¿Enserio!? ;)', '<32>* ¡Ese filete no tenía precio! ;)'],
        dummy1: [
            '<25>{#p/toriel}{#f/0}* Tu próxima lección implica encuentros con otros monstruos.',
            '<25>{#f/1}* Al ser un humano vagando por la estación. ',
'<25>{#f/1}* Es probable que te ataquen...',
            '<25>{#f/0}* Si eso pasa, entrarás en lo que se conoce como una PELEA.',
            '<25>{#f/0}* Afortunadamente, hay varias formas de resolver una pelea.',
            '<25>{#f/1}* Por ahora, te sugiero entablar una charla amistosa...',
            '<25>{#f/0}* ... dándome así la oportunidad de resolver el conflicto por ti.'
        ],
        dummy2: ['<25>{#p/toriel}* Para empezar, puedes practicar hablando con el maniquí.'],
        dummy3: [
            '<25>{#p/toriel}{#f/7}* ... ¿Crees que soy el maniquí?',
            '<25>{#f/6}* ¡Jajaja!\n* ¡Qué adorable!',
            '<25>{#f/0}* Desafortunadamente, no soy más que una señora mayor preocupada.'
        ],
        dummy4: [
            '<25>{#p/toriel}* No hay nada que temer, mi niño.',
            '<25>* Un simple maniquí de entrenamiento no puede lastimarte.'
        ],
        dummy5: ['<25>{#p/toriel}{#f/1}* Vamos, pequeño...'],
        dummy6: [
            '<25>{#p/toriel}{#f/2}* ¡Niño, no!\n* ¡El muñeco no está hecho para pelear!',
            '<25>{#f/1}* Además, no queremos dañar a nadie, ¿verdad?',
            '<25>{#f/0}* Vamos.'
        ],
        dummy7: ['<25>{#p/toriel}* ¡Excelente!\n* Parece que aprendes muy rápido.'],
        dummy8: [
            '<25>{#p/toriel}{#f/1}* ¿Tú huiste...?',
            '<25>{#f/0}* De hecho, puede que haya sido una sabia elección.',
            '<26>{#f/1}* Habiendo escapado, evitaste cualquier posible conflicto...',
            '<25>{#f/0}* ... incluso si solo ERA un simple muñeco de entrenamiento.'
        ],
        dummy9: ['<25>{#p/toriel}{#f/3}* ...', '<25>{#f/4}* ...', '<25>{#f/0}* La siguiente habitación espera.'],
        dummy9a: ['<25>{#p/toriel}{#f/3}* ...', '<25>{#f/4}* ...', '<25>{#f/6}* La siguiente habitación espera.'],
        dummy10: [
            '<25>{#p/toriel}{#f/7}* Mi niño, eso es...',
            '<25>{#f/0}* ... eso es quizás la cosa más adorable que he visto hasta ahora.',
            '<25>{#f/0}* En cualquier caso, manejaste esta lección admirablemente.',
            '<25>{#f/0}* La siguiente habitación espera.'
        ],
        dummy11: ['<25>{#p/toriel}* La siguiente habitación espera.'],
        dummy12: [
            '<25>{#p/toriel}{#f/2}* ¡Dios mío, niño!\n* ¡Ten piedad!',
            '<25>{#f/1}* ...',
            '<25>{#f/0}* Afortunadamente, ese solo fue un maniquí de entrenamiento.',
            '<25>{#f/1}* Sin embargo, en el futuro, seria prudente...',
            '<25>{#f/0}* ... ¡No matar a la gente a bofetadas!',
            '<26>{#f/0}* Como sea.\n* La siguiente habitación espera.'
        ],
        eat_pie: ['<25>{#p/toriel}{#f/1}{#n1}* Delicioso, ¿verdad?'],
        eat_snails: ['<25>{#p/toriel}{#f/0}{#n1}* Espero que tu desayuno haya sido suficiente.'],
        eat_soda: [
            '<32>{#p/basic}* Aaron sacó su teléfono y tomó una foto.',
            '<32>{#p/basic}{#n1}* Ooh, definitivamente podría poner esto en un póster en alguna parte ;)'
        ],
        eat_steak: [
            '<32>{#p/basic}* Aaron te hizo un guiño.',
            '<32>{#p/basic}{#n1}* ¿Te gusta el producto, joven? ;)'
        ],
        endtwinkly2: [
            '<32>{#p/basic}* ¿Quién se cree que es?',
            "<32>* No has sido más que amable con todos los que hemos conocido.",
            '<32>* Enserio esa estrella parlante necesita conseguirse una vida...'
        ],
        endtwinklyA1: [
            '<25>{#p/twinkly}{#f/12}* Tú, idiota...',
            "<25>* ¡¿Qué acaso no me escuchaste antes!?",
            '<25>* ¡Creí haberte dicho que no lo arruinaras!',
            "<25>* Ahora mira lo que le hiciste a nuestro plan.",
            '<25>{#f/8}* ...',
            '<25>{#f/6}* Sera mejor que arregles esto, $(name).',
            "<25>{#f/5}* Es nuestro destino."
        ],
        endtwinklyA2: () =>
            SAVE.flag.n.genocide_milestone < 1
                ? [
                    '<25>{#p/twinkly}{#f/5}* Hola, $(name).',
                    "<25>{#f/5}* Parece que ya no quieres jugar conmigo.",
                    '<25>{#f/6}* Intente ser paciente contigo, pero aquí estamos...',
                    '<25>{#f/6}* De vuelta al inicio otra vez.',
                    '<25>{#f/8}* Una y otra y otra vez...',
                    '<25>{#f/5}* Debes pensar que todo esto es muy divertido.',
                    '<25>{#f/7}* Burlándote de mí con la oportunidad de estar contigo, sólo para arrebatármela...',
                    "<25>{#f/5}* Bueno, eso esta bien.",
                    "<25>{#f/5}* Si ese es el juego que vas a jugar, entonces adelante.",
                    "<25>{#f/11}* Solo no esperes tener el control durante mucho tiempo....",
                    "<25>{#f/7}* Tarde o temprano, vas a arrepentirte de lo que has hecho."
                ]
                : [
                    '<25>{#p/twinkly}{#f/6}* Hola, $(name).',
                    ...(SAVE.flag.n.genocide_milestone < 7
                        ? [
                            "<25>{#f/6}* He tenido algo de tiempo para pensar sobre lo que paso.",
                            '<25>{#f/5}* Fue emocionante, al principio...',
                            '<25>* La idea de tomar la zona espacial a la fuerza juntos...',
                            "<25>{#f/6}* Pero ahora, no estoy seguro.",
                            '<25>{#f/8}* ...',
                            '<25>{#f/8}* Supongo... que me dejé llevar un poco allí atrás.',
                            "<25>{#f/5}* Pero eso está bien, ¿verdad?\n* Me perdonaras, ¿no es así?"
                        ]
                        : [
                            "<25>{#f/6}* Aún no estoy muy seguro de lo que paso ahí atrás",
                            "<25>{#f/5}* Me está... asustando un poco, jaja...",
                            '<25>{#f/8}* ...',
                            '<25>{#f/8}* Tal vez... deberíamos esperar un poco por ahora.',
                            "<25>{#f/5}* Pero eso está bien, ¿verdad?\n* Estarás bien con eso, ¿no es así?"
                        ]),
                    '<25>{#f/6}* ...',
                    '<25>{#f/8}* Adiós, $(name)...',
                    ...(SAVE.flag.n.genocide_milestone < 7 ? ["<25>{#f/5}* Volveré antes de que te des cuenta."] : [])
                ],
        endtwinklyAreaction: [
            '<32>{#p/basic}* Perdón, ¿me he perdido algo?',
            "<32>* Nunca he hablado con él en mi vida, y mucho menos ir a alguna misión con él.",
            "<32>* Oh bueno.\n* No sería la primera vez que inventa historias sobre mí."
        ],
        endtwinklyB: () =>
            SAVE.data.b.w_state_lateleave
                ? [
                    '<25>{#p/twinkly}{#f/5}{#v/0}* Bueno.\n* Eso fue inesperado.',
                    "<25>{#f/11}{#v/0}* Piensas que puedes romper las reglas, ¿no?",
                    '<25>{#f/7}{#v/0}* Ji ji ji...',
                    "<25>{#f/0}{#v/1}* En este mundo, es MATAR o MORIR."
                ]
                : [
                    '<25>{#p/twinkly}{#f/5}{#v/0}* Listo.\n* Eres muyyyy listo.',
                    "<25>{#f/11}{#v/0}* Realmente crees que eres inteligente, ¿verdad?",
                    '<25>{#f/7}{#v/0}* Ji ji ji...',
                    "<25>{#f/0}{#v/1}* En este mundo, es MATAR o MORIR."
                ],
        endtwinklyB2: [
            '<25>{#f/8}{#v/0}* Si solo hubieras matado a unos cuantos monstruos más...',
            "<25>{#f/9}{#v/0}* Bueno, tal vez no debí revelar mis planes tan pronto.",
            '<25>{#f/7}{#v/0}* Sabes, $(name)...',
            "<25>{#f/5}{#v/0}* Es sólo cuestión de tiempo para que volvamos a estar juntos.",
            '<25>{#f/6}{#v/0}* Inténtalo un poco más la próxima vez y tal vez...',
            "<25>{#f/5}{#v/0}* Podrás ver algo nuevo.",
            '<25>{#f/11}{#v/0}* Hasta que nos encontremos de nuevo...'
        ],
        endtwinklyB3: [
            '<25>{#f/8}{#v/0}* Si solo hubieras matado a UN monstruo más...',
            "<25>{#f/9}{#v/0}* Bueno, tal vez no debí revelar mis planes tan pronto.",
            '<25>{#f/7}{#v/0}* Sabes, $(name)...',
            "<25>{#f/5}{#v/0}* Es sólo cuestión de tiempo para que volvamos a estar juntos.",
            '<25>{#f/6}{#v/0}* Inténtalo un poco más la próxima vez y tal vez...',
            "<25>{#f/5}{#v/0}* Podrás ver algo nuevo.",
            '<25>{#f/11}{#v/0}* Hasta que nos encontremos de nuevo...'
        ],
        endtwinklyBA: () => [
            SAVE.data.n.state_wastelands_napstablook === 5
                ? '<25>{#p/twinkly}{#f/6}{#v/0}* Así que lo hiciste sin matar a nadie.'
                : '<25>{#p/twinkly}{#f/6}{#v/0}* Así que perdonaste la vida de todos con los que te cruzaste.',
            '<25>{#f/5}{#v/0}* Apuesto a que te sientes genial.',
            '<25>{#f/2}{#v/1}* ¿Pero qué harás si te encuentras con un asesino despiadado?',
            "<25>{#f/9}{#v/0}* Morirás y morirás y morirás...",
            "<25>{#f/5}{#v/0}* Hasta que eventualmente te canses de intentarlo.",
            '<25>{#f/11}{#v/0}* ¿Qué harás entonces, eh?',
            '<25>{#f/2}{#v/1}* ¿Matarás por tu frustración?',
            '<25>{#f/14}{#v/1}* ¿O simplemente te rendirás?',
            '<25>{#f/11}{#v/0}* Ji ji ji...',
            '<25>{#f/7}{#v/0}* Esto va a ser TAN divertido.',
            "<25>{#f/9}{#v/0}* ¡Te estaré vigilando!"
        ],
        endtwinklyBB1: () => [
            SAVE.data.b.w_state_lateleave
                ? "<25>{#p/twinkly}{#f/6}{#v/0}* Así que te las arreglaste para mantenerte fuera del camino de unas míseras personas."
                : '<25>{#p/twinkly}{#f/6}{#v/0}* Así que le perdonaste la vida a unas míseras personas.',
            '<25>{#f/11}{#v/0}* ¿Pero qué pasa con los demás, eh?',
            '<25>{#f/7}{#v/0}* Froggit, Flutterlyte, Gelatini, Silente, Oculoux, Mushy...',
            "<25>{#f/6}{#v/0}* ¿No crees que alguno de ellos tienen familias?",
            "<25>{#f/8}{#v/0}* ¿No crees que alguno de ellos tiene amigos?",
            "<25>{#f/5}{#v/0}* Cada uno podría haber sido la Toriel de otra persona",
            '<25>{#f/5}{#v/0}* ...',
            '<25>{#f/7}{#v/0}* Mocoso egoísta.',
            '<25>{#f/0}{#v/1}* Los monstruos han muerto por tu culpa.'
        ],
        endtwinklyBB2: () => [
            SAVE.data.b.w_state_lateleave
                ? "<25>{#p/twinkly}{#f/6}{#v/0}* Así que te las arreglaste para mantenerte fuera del camino de una persona."
                : '<25>{#p/twinkly}{#f/6}{#v/0}* Así que le perdonaste la vida a una sola persona.',
            '<25>{#f/11}{#v/0}* ¿Pero qué pasa con los demas, eh?',
            '<25>{#f/7}{#v/0}* Froggit, Flutterlyte, Gelatini, Silente, Oculoux, Mushy...',
            "<25>{#f/0}{#v/0}* Ahora ya se han ido todos.",
            "<25>{#f/11}{#v/0}* ¿Qué va a hacer Toriel cuando se entere, eh?",
            '<25>{#f/2}{#v/1}* ¿Qué pasa si se suicida por la pena?',
            "<25>{#f/11}{#v/0}* Si crees que la estás salvando sólo por perdonarla...",
            "<25>{#f/7}{#v/0}* Entonces eres más tonto de lo que pensaba.",
            '<25>{#f/9}* Bueno, ¡nos vemos!'
        ],
        endtwinklyBB3: () => [
            SAVE.data.b.w_state_lateleave
                ? "<25>{#p/twinkly}{#f/6}{#v/0}* Así que te las arreglaste para mantenerte al margen de casi todo el mundo."
                : '<25>{#p/twinkly}{#f/6}{#v/0}* Así que le perdonaste la vida a casi todos.',
            SAVE.data.b.w_state_lateleave
                ? '<25>{#p/twinkly}{#f/11}{#v/0}* ¿Pero qué pasa con al que SÍ te pusiste en su camino, eh?'
                : "<25>{#p/twinkly}{#f/11}{#v/0}* ¿Pero qué pasa con a quién NO perdonaste, eh?",
            '<25>{#f/7}{#v/0}* Froggit, Flutterlyte, Gelatini, Silente, Oculoux, Mushy...',
            "<25>{#f/6}{#v/0}* ¿No crees que alguno de ellos tienen familias?",
            "<25>{#f/8}{#v/0}* ¿No crees que alguno de ellos tiene amigos?",
            "<25>{#f/5}{#v/0}* A quién mataste podría haber sido la Toriel de alguien más.",
            '<25>{#f/5}{#v/0}* ...',
            '<25>{#f/7}{#v/0}* Mocoso egoísta.',
            "<25>{#f/0}{#v/1}* Alguien está muerto por tu culpa."
        ],
        endtwinklyBC: [
            "<25>{#p/twinkly}{#f/5}{#v/0}* Aunque estoy seguro de que lo sabes muy bien...",
            "<25>{#f/6}{#v/0}* Considerando que ya has matado a Toriel una vez antes.",
            "<25>{#f/7}{#v/0}* ¿No es cierto, mocoso?",
            '<25>{#f/2}{#v/1}* La ASESINASTE.',
            "<25>{#f/7}{#v/0}* Y entonces, te sentiste mal...\n* ¿No es así?",
            '<25>{#f/7}{#v/0}* Ji ji ji...',
            "<25>{#f/11}{#v/0}* ¿Piensas que eres el único con ese poder?",
            '<25>{#f/6}{#v/0}* El poder de remodelar el universo, sólo con tu determinación...',
            '<25>{#f/8}{#v/0}* El poder para GUARDAR...',
            '<25>{#f/7}{#v/0}* Ese solía ser mi poder, ¿sabes?.',
            '<25>{#f/6}{#v/0}* Parece que TUS deseos para este mundo superan los míos.',
            '<25>{#f/5}{#v/0}* Bien entonces.\n* Disfruta ese poder mientras puedas.',
            "<25>{#f/9}{#v/0}* ¡Te estaré vigilando!"
        ],
        endtwinklyC: [
            '<25>{#f/7}{#v/0}* Después de todo, ese solía ser MI poder.',
            '<25>{#f/6}{#v/0}* El poder de remodelar el universo, sólo con tu determinación...',
            '<25>{#f/8}{#v/0}* El poder para GUARDAR...',
            '<25>{#f/6}{#v/0}* Yo pensé que era el único que podía hacer eso.',
            '<25>{#f/6}{#v/0}* Parece que TUS deseos para este mundo superan los míos.',
            '<25>{#f/5}{#v/0}* Bien entonces.\n* Disfruta ese poder mientras puedas.',
            "<25>{#f/9}{#v/0}* ¡Te estaré vigilando!"
        ],
        endtwinklyD: [
            "<25>{#p/twinkly}{#f/11}{#v/0}* Eres un gran bromista, ¿Eh?",
            '<25>{#f/8}{#v/0}* Golpeando a los monstruos hasta el borde de la muerte, solo para dejarlos ir ...',
            "<25>{#f/7}{#v/0}* ¿Que harás cuando un monstruo no QUIERA tu piedad?",
            '<25>{#f/6}{#v/0}* ¿Apagaras la luz de sus ojos?',
            '<25>{#f/5}{#v/0}* ¿O te darás cuenta de que tu \"pacifismo\" defectuoso no sirve para nada?',
            '<25>{#f/11}{#v/0}* Ji ji ji...',
            '<25>{#f/7}{#v/0}* Esto va a ser TAN divertido.',
            "<25>{#f/9}{#v/0}* ¡Te estaré vigilando!"
        ],
        endtwinklyE: [
            "<25>{#p/twinkly}{#f/7}{#v/0}* Wow, eres completamente repulsivo.",
            '<26>{#f/11}{#v/0}* Te las arreglaste pacíficamente...',
            "<25>{#f/5}{#v/0}* Entonces, te diste cuenta de que eso no era lo suficientemente bueno para ti.",
            '<25>{#f/2}{#v/1}* Así que la MATASTE sólo para ver qué pasaba.',
            '<25>{#f/7}{#v/0}* Ji ji ji...',
            '<25>{#f/0}{#v/0}* Lo hiciste por ABURRIMIENTO.'
        ],
        endtwinklyEA: ["<25>{#f/11}{#v/0}* No creas que no sé cómo funciona esto..."],
        endtwinklyEB: ["<25>{#f/6}{#v/0}* Es triste, aunque..."],
        endtwinklyF: ['<25>{#p/twinkly}{#f/11}{#v/0}* Mírate, jugando así con su vida...'],
        endtwinklyFA: ['<25>{#f/7}{#v/0}* Matandola, abandonándola, matandola de nuevo...'],
        endtwinklyFB: ['<25>{#f/7}{#v/0}* Abandonándola, matandola, abandonándola de nuevo...'],
        endtwinklyFXA: [
            "<25>{#f/11}{#v/0}* Es divertido, ¿no es así?",
            '<25>{#f/6}{#v/0}* Jugando sin cesar con la vida de los demás...',
            '<25>{#f/8}{#v/0}* Viendo como reaccionarían con cada posible decisión...',
            "<25>{#f/11}{#v/0}* ¿No es emocionante?",
            '<25>{#f/7}{#v/0}* Ji ji ji...',
            "<25>{#f/9}{#v/0}* Me pregunto qué harás ahora.",
            "<25>{#f/5}{#v/0}* Estaré observando..."
        ],
        endtwinklyG: [
            "<25>{#p/twinkly}{#f/10}{#v/0}* No puedes tener suficiente, ¿verdad?",
            '<25>{#f/11}{#v/0}* ¿Cuántas veces más vas a matarla, eh?',
            '<25>{#f/7}{#v/0}* Ji ji ji...',
            '<25>{#f/0}{#v/1}* Me recuerdas un poco a mí.',
            '<25>{#f/9}{#v/0}* ¡Bueno, nos vemos!'
        ],
        endtwinklyG1: [
            '<25>{#p/twinkly}{#f/6}{#v/0}* ¿Otra vez?\n* Por Dios...',
            '<25>{#f/0}{#v/1}* DE VERDAD me recuerdas a mi mismo.'
        ],
        endtwinklyG2: [
            '<25>{#p/twinkly}{#f/6}{#v/0}* ¡¿Otra vez!?',
            "<25>{#f/8}{#v/0}* Vaya, eres peor de lo que me imaginaba."
        ],
        endtwinklyH: () => [
            SAVE.data.b.w_state_lateleave
                ? "<25>{#p/twinkly}{#f/5}{#v/0}* Así que por fin te las arreglaste pacificamente, eh?"
                : "<25>{#p/twinkly}{#f/5}{#v/0}* ¿Así que finalmente decidiste mostrar piedad, eh?",
            '<25>{#f/5}{#v/0}* Y después de toda esa MATANZA...',
            '<25>{#f/11}{#v/0}* Dime, ¿esta era tu idea todo el tiempo?',
            '<25>{#f/2}{#v/1}* ¿Para emocionarte con su muerte y luego perdonarla cuando te aburrieras?',
            '<25>{#f/7}{#v/0}* Ji ji ji...',
            '<25>{#f/11}{#v/0}* Qué santo debes pensar que eres.',
            "<25>{#f/5}{#v/0}* Pero bueno, no es que no sepa cómo funciona esto..."
        ],
        endtwinklyI: [
            '<25>{#p/twinkly}{#f/11}{#v/0}* Je je je...',
            '<25>{#f/7}{#v/0}* Espero que te guste tu elección.',
            "<25>{#f/9}{#v/0}* Digo, no es como si tú pudieras volver y cambiar el destino.",
            "<25>{#f/0}{#v/1}* En este mundo, es MATAR o MORIR.",
            '<25>{#f/5}{#v/0}* Esa anciana pensó que podía romper las reglas.',
            '<25>{#f/8}{#v/0}* Se esforzó tanto para salvar a ustedes, los humanos...',
            "<25>{#f/6}{#v/0}* Pero a la hora de la verdad, ni siquiera pudo salvarse a sí misma."
        ],
        endtwinklyIX: [
            '<25>{#p/twinkly}{#f/11}{#v/0}* Je je je...',
            '<25>{#f/11}{#v/0}* Así que finalmente cediste y mataste a alguien, ¿eh?',
            '<25>{#f/7}{#v/0}* Bueno, espero que te guste tu elección.',
            "<25>{#f/9}{#v/0}* Digo, no es como si tú pudieras volver y cambiar el destino.",
            "<25>{#f/0}{#v/1}* En este mundo, es MATAR o MORIR.",
            "<25>{#f/8}{#v/0}* ... ¿Qué pasa?\n* ¿Ella no duró tanto como pensabas?",
            '<26>{#f/6}{#v/0}* Oh, que terrible.\n* Supongo que no todos pueden ser sometidos a la fuerza.'
        ],
        endtwinklyIA: ['<25>{#f/11}{#v/0}* ¡Pero que idiota!'],
        endtwinklyIAX: ['<25>{#f/7}{#v/0}* Qué pena por ella.'],
        endtwinklyIB: ['<25>{#f/6}{#v/0}* En cuanto a tí...'],
        endtwinklyJ: [
            '<25>{#p/twinkly}{#f/6}{#v/0}* Vaya.',
            '<25>{#f/7}{#v/0}* Y yo aquí pensando que eras el justo por mostrar piedad.',
            '<25>{#f/11}{#v/0}* ¡Ja!\n* Menudo chiste.',
            '<25>{#f/6}{#v/0}* ...',
            '<25>{#f/6}{#v/0}* ¿Cómo se sintió al satisfacer por fin tu lado violento?',
            '<25>{#f/7}{#v/0}* Ji ji ji...',
            "<25>{#f/0}{#v/1}* Apuesto a que se sintió BIEN, ¿no es así?",
            '<25>{#f/11}{#v/0}* Digo, Debería saberlo...'
        ],
        endtwinklyK: [
            '<25>{#p/twinkly}{#f/5}{#v/0}* Encantado de volver a verte.',
            "<25>{#f/6}{#v/0}* Por cierto, eres la persona más aburrida en la galaxia.",
            '<25>{#f/12}{#v/0}* ¿Hacer todo pacíficamente y luego volver sólo para hacerlo de nuevo?',
            '<25>{#f/8}{#v/0}* Vamos...',
            "<25>{#f/2}{#v/1}* Sabes muy bien como yo que es MATAR o MORIR."
        ],
        endtwinklyK1: [
            "<25>{#p/twinkly}{#f/6}* ¿No te estás cansando de esto?",
            '<25>{#f/8}{#v/0}* Vamos...',
            '<25>{#f/2}{#v/1}* En el fondo SABES que una parte de ti quiere hacerle daño a ella.',
            "<25>{#f/14}{#v/1}* Unos buenos golpes y ella estaría muerta ante tus propios ojos.",
            "<25>{#f/11}{#v/0}* ¿Eso no seria emocionante?",
            '<25>{#f/6}{#v/0}* ...',
            '<25>{#f/8}{#v/0}* ...',
            '<25>{#f/7}{#v/0}* Nos vemos, idiota.'
        ],
        endtwinklyK2: [
            '<25>{#p/twinkly}{#f/8}{#v/0}* ¿Estás haciendo esto sólo para ver cómo reacciono?',
            '<25>{#f/6}{#v/0}* ¿De eso se trata?',
            "<25>{#f/7}{#v/0}* Bueno, no esperes conseguir nada más de mí.",
            '<25>{#f/6}{#v/0}* Todo este aburrido pacifismo se está volviendo tedioso.',
            '<25>{#f/11}{#v/0}* Ahora, si algo más interesante estuviera por pasar...',
            "<25>{#f/9}{#v/0}* Tal vez estaría más dispuesto a hablar.",
            '<25>{#f/6}{#v/0}* ...',
            '<25>{#f/8}{#v/0}* ...',
            '<25>{#f/7}{#v/0}* Nos vemos, idiota.'
        ],
        endtwinklyKA: [
            "<25>{#f/7}{#v/0}* Tarde o temprano, te verás obligado a darte cuenta de eso.",
            '<25>{#f/11}{#v/0}* Y cuando ese tiempo llegue...',
            "<25>{#f/5}{#v/0}* Bueno, digamos que estoy interesado en ver qué pasa.",
            '<25>{#f/11}{#v/0}* Ji ji ji...',
            '<25>{#f/9}{#v/0}* ¡Buena suerte!'
        ],
        endtwinklyKB: [
            '<25>{#f/11}{#v/0}* Ji ji ji...',
            "<25>{#f/7}{#v/0}* Tal vez por eso mataste a ese monstruo.",
            '<25>{#f/8}{#v/0}* Quiero decir, casi llegaste al final del camino sin matar a nadie...',
            '<25>{#f/6}{#v/0}* Pero en algún momento, metiste la pata.',
            '<25>{#f/5}{#v/0}* Todo ese buen karma que tenías se fue directamente por el retrete.',
            "<25>{#f/11}{#v/0}* ¡Dios, no puedes hacer nada bien!",
            '<25>{#f/11}{#v/0}* ¡Menudo chiste!'
        ],
        endtwinklyKC: [
            '<25>{#f/11}{#v/0}* Ji ji ji...',
            "<25>{#f/7}{#v/0}* Tal vez por eso mataste a esos otros monstruos.",
            '<25>{#f/8}{#v/0}* Digo, tuviste una buena racha, pero...',
            "<25>{#f/6}{#v/0}* ¿Qué sentido tiene la piedad si no significa nada?",
            '<25>{#f/7}{#v/0}* Y créeme, después de lo que hiciste...',
            "<25>{#f/2}{#v/1}* No significa NADA.",
            '<25>{#f/6}{#v/0}* ...',
            '<25>{#f/8}{#v/0}* ...',
            '<25>{#f/7}{#v/0}* Nos vemos, idiota.'
        ],
        endtwinklyKD: [
            "<25>{#f/11}{#v/0}* ¿Qué hay de malo en matar a Toriel, eh?\n* ¿Demasiado bueno para eso?",
            '<25>{#f/7}{#v/0}* Ji ji ji...',
            "<25>{#f/2}{#v/1}* Sé que todavía estás podrido hasta la médula.",
            '<25>{#f/11}{#v/0}* Quiero decir, te las arreglaste para eliminar a todos en tu camino...',
            '<25>{#f/6}{#v/0}* Pero cuando llegó el último obstáculo, fracasaste.',
            "<25>{#f/11}{#v/0}* ¡Dios, no puedes hacer nada bien!",
            '<25>{#f/11}{#v/0}* ¡Menudo chiste!'
        ],
        endtwinklyL: [
            '<25>{#p/twinkly}{#f/6}{#v/0}* Otra vez, ¿eh?\n* Dios...',
            "<25>{#f/8}{#v/0}* Has cambiado tanto la línea de tiempo...",
            "<25>{#f/6}{#v/0}* Ahora ni siquiera sé qué pensar.",
            '<25>{#f/8}{#v/0}* ¿Eres bueno?\n* ¿Malvado?\n* O ¿solo eres curioso?',
            '<25>{#f/6}{#v/0}* No lo sé.',
            '<25>{#f/5}{#v/0}* Hay una cosa, sin embargo...',
            "<25>{#f/5}{#v/0}* Una cosa que SÉ que no has hecho todavía.",
            '<25>{#f/11}{#v/0}* Ji ji ji...',
            "<25>{#f/7}{#v/0}* Así es.",
            "<25>{#f/7}{#v/0}* Todavía no has matado a todo el mundo en una racha.",
            "<25>{#f/11}{#v/0}* ¿No tienes al menos un POCO de curiosidad?",
            '<25>{#f/8}{#v/0}* Vamos, $(name)...',
            "<25>{#f/5}{#v/0}* Sé que estas ahí en algún lugar."
        ],
        endtwinklyL1: [
            '<25>{#p/twinkly}{#f/6}{#v/0}* Bueno bueno, nos encontramos de nuevo.',
            '<25>{#f/8}{#v/0}* ¿Cuántas veces son hasta ahora?',
            "<25>{#f/6}{#v/0}* Como sea.\n* No importa.",
            '<25>{#f/6}{#v/0}* Tú SABES lo que tienes que hacer, $(name).',
            '<25>{#f/8}{#v/0}* ...',
            "<25>{#f/5}{#v/0}* Estaré esperando."
        ],
        exit1: [
            '<25>{#p/toriel}{#f/13}* Deseas volver a \"casa\", ¿no es así?',
            '<25>{#f/9}* ...',
            '<25>{#f/9}* Si te vas de aquí, no podré protegerte.',
            '<25>{#f/9}* No podré salvarte de los peligros que estan ahí adelante.',
            '<25>{#f/13}* Así que, por favor, pequeño...',
            '<25>{#f/9}* Regresa al otro camino.'
        ],
        exit2: [
            '<25>{#p/toriel}{#f/13}* Cada humano que cae aquí se encuentra con el mismo destino.',
            '<25>{#f/9}* Lo he visto una y otra vez.',
            '<25>{#f/13}* Vienen.',
            '<25>{#f/13}* Se van.',
            '<25>{#f/9}* ... mueren.',
            '<25>{#f/13}* Mi niño...',
            '<25>{#f/13}* Si sales de las Afueras...',
            '<25>{#f/9}* Ellos...\n* {@fill=#f00}ASGORE{@fill=#fff}...\n* Tomarán tu ALMA.'
        ],
        exit3: [
            '<25>{#p/toriel}{#f/9}* ...',
            '<25>{#f/13}* No quise decir esto, pero...',
            '<25>{#f/11}* No puedo permitir que continúes por este camino.',
            '<25>{#f/9}* Por tu propio bien, niño...',
            '<25>{#f/9}* No me sigas a la otra habitación.'
        ],
        exit4: [
            '<25>{#p/toriel}{#p/toriel}{#f/13}* ...',
            '<25>{#f/10}* ... por supuesto.',
            '<25>{#f/9}* Quizás siempre se tuvo que llegar a esto.',
            '<25>{#f/9}* Quizás fui tonta al pensar que serías diferente.',
            '<25>{#f/9}* ...',
            '<25>{#f/13}* Me temo que ya no hay muchas opciones.',
            '<25>{#f/13}* Perdóname, mi niño...',
            '<25>{#f/11}* Pero no te puedo permitir que te vayas.'
        ],
        exitfail1: (lateleave: boolean, sleep: boolean) =>
            world.postnoot
                ? [
                    [
                        sleep
                            ? "<32>{#p/twinkly}{#f/19}* Después de que durmieras en casa de mamá, ella se fue de compras."
                            : "<32>{#p/twinkly}{#f/19}* Después de que corrieras de vuelta a casa de mamá, ella se fue de compras.",
                        '<32>{#x1}* Pero... ¡oh no!\n* El taxi en el que ella estaba explotó, ¡matándola al instante!',
                        '<32>* Dios, me pregunto cómo pudo ocurrir algo tan horrible.',
                        '<32>{*}{#x2}* ...',
                        "<25>{*}{#f/7}* Perdón, $(name).\n* Supongo que tu final feliz no será tan fácil."
                    ],
                    [
                        sleep
                            ? "<32>{#p/twinkly}{#f/19}* Después de que durmieras en casa de mamá, ella se fue de compras."
                            : "<32>{#p/twinkly}{#f/19}* Después de que corrieras de vuelta a casa de mamá, ella se fue de compras.",
                        '<32>{#x1}* Pero... ¡oh no!\n* ¡Una estrella parlante aparece y la tortura hasta la muerte!',
                        "<32>* Dios, ¡eso es un resultado aún peor que la última vez!",
                        '<32>{*}{#x2}* ...',
                        "<25>{*}{#f/6}* No tenemos tiempo para esto, $(name).\n* Vuelve al camino."
                    ],
                    [
                        '<25>{*}{#p/twinkly}{#f/5}* Vamos, $(name)...',
                        sleep
                            ? "<25>{*}{#f/7}* ¿De verdad crees que voy a dejar que me evites TAN fácilmente?"
                            : "<25>{*}{#f/7}* ¿De verdad crees que voy a dejar que huyas de mí TAN fácilmente?"
                    ],
                    ['<25>{*}{#p/twinkly}{#f/6}* Podemos hacer esto todo el día.'],
                    ['<25>{*}{#p/twinkly}{#f/8}* ...']
                ][Math.min(SAVE.flag.n.postnoot_exitfail++, 4)]
                : [
                    sleep
                        ? "<32>{#p/basic}* Después de que durmieras, ella destruye el puente hacia la zona espacial."
                        : "<32>{#p/basic}* Después de volver a casa, ella destruye el puente hacia la zona espacial.",
                    ...(outlandsKills() > 10
                        ? [
                            "<32>* El tiempo pasa y Toriel pronto se entera de los monstruos que has matado.",
                            '<32>* Sus esperanzas se rompieron y sin nada que perder, ella...',
                            '<32>* ...',
                            '<32>* ... m-mientras tanto, los residentes que quedan de la zona espacial esperan la salvación...'
                        ]
                        : outlandsKills() > 5 || SAVE.data.n.bully_wastelands > 5
                            ? [
                                '<32>* El tiempo pasa y Toriel hace todo lo posible por cuidarte.',
                                '<32>* Leyendo libros, horneándote tartas...',
                                '<32>* Acurrucándote en la cama, todas y cada una de las noches...',
                                ...(lateleave
                                    ? ['<32>* ... a pesar de su miedo a que intentes huir de nuevo.']
                                    : ["<32>* ... a pesar de los que han desaparecido."]),
                                '<32>* Al mismo tiempo, los residentes de la zona espacial esperan la salvación...'
                            ]
                            : [
                                '<32>* El tiempo pasa y Toriel hace todo lo posible por cuidarte.',
                                '<32>* Leyendo libros, horneándote tartas...',
                                '<32>* Acurrucándote en la cama, todas y cada una de las noches...',
                                ...(lateleave
                                    ? ['<32>* Y abrazándote tan fuerte para que nunca jamás intentes huir de nuevo.']
                                    : ['<32>* Y todos los abrazos que puedas desear.']),
                                '<32>* Al mismo tiempo, los residentes de la zona espacial esperan la salvación...'
                            ]),
                    '<32>* ... de un humano que quizá nunca llegue a ellos.',
                    '<32>* ¿Es este el resultado que realmente esperabas?',
                    '<32>* ¿Es esto lo que ellos realmente se merecen?'
                ],
        food: () => [
            ...(SAVE.data.n.state_wastelands_mash === 2
                ? [
                    '<25>{#p/toriel}{#f/1}* Perdón por la espera...',
                    '<25>{#f/3}* Parece que ese perrito blanco ha vuelto a asaltar mi cocina.',
                    '<25>{#f/4}* Deberías ver el estado de esa tarta...',
                    '<26>{#f/0}* Pero bueno.\n* Te he preparado un plato de caracoles fritos.'
                ]
                : ['<25>{#p/toriel}* ¡El desayuno esta listo!', '<26>* Te he preparado un plato de caracoles fritos.']),
            '<25>{#f/1}* Los dejare aquí en la mesa...'
        ],
        fridgetrap: {
            a: () =>
                SAVE.data.b.svr
                    ? []
                    : world.darker
                        ? ["<32>{#p/basic}* No te gustaría lo que hay en la nevera."]
                        : ['<32>{#p/basic}* Hay una barra de chocolate de marca en la nevera.'],
            b: () => [
                ...(SAVE.data.b.svr ? [] : ['<32>{#p/basic}* ...', '<32>* ¿Lo quieres?']),
                choicer.create('* (¿Tomar la Barra de Chocolate?)', 'Sí', 'No')
            ],
            b1: ['<32>{#p/human}* (Decides no tomar nada.)'],
            b2: () => [
                '<32>{#p/human}* (Conseguiste la Barra de Chocolate.)',
                ...(SAVE.data.b.svr ? ['<25>{#p/asriel1}{#f/17}* Oh... chocolate.', '<25>{#p/asriel1}{#f/13}* ...'] : [])
            ],
            c: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* (Pero no había nada más que encontrar dentro.)',
                        ...[
                            [
                                '<25>{#p/asriel1}{#f/23}* Oh... $(name) SIEMPRE solía hurgar en la nevera.',
                                '<25>{#f/13}* Pensaba que si cavaba lo suficientemente profundo...',
                                '<25>{#f/13}* Otra tableta de chocolate se revelaría ahí dentro.',
                                '<25>{#f/17}* ... qué tonto.'
                            ],
                            ['<25>{#p/asriel1}{#f/20}* Eso fue antes de que se instalara el replicador de chocolate.']
                        ][Math.min(asrielinter.fridgetrap_c++, 1)]
                    ]
                    : ['<32>{#p/basic}* La barra de chocolate ya ha sido tomada.'],
            d: ["<32>{#p/human}* (Llevas demasiado encima.)"]
        },
        front1: [
            '<25>{#p/toriel}{#f/1}* ... y ¿quieres reproducir alguna de tus canciones?',
            '<25>{#f/0}* De acuerdo, veré lo que puedo hacer.'
        ],
        front1x: ['<25>{#p/toriel}{#f/1}* ... ¿hola?'],
        front2: () => [
            ...(world.postnoot
                ? [
                    '<25>{#p/toriel}{#f/2}* ¡¿Ya estas despierto!?',
                    '<25>{#f/1}* No has dormido mucho tiempo...',
                    '<25>{#f/5}* ...',
                    world.nootflags.has('toriel') // NO-TRANSLATE

                        ? '<25>{#f/1}* El sistema atmosférico aún no parece estar arreglado.'
                        : '<25>{#f/1}* El sistema atmosférico parece estar fallando.',
                    '<25>{#f/1}* Si te empiezas a sentir débil, no dudes en volver a la cama.',
                    '<26>{#f/0}* ... en cualquier caso.'
                ]
                : [
                    '<25>{#p/toriel}{#f/2}* ¡¿Cuánto tiempo llevas ahí parado?!',
                    '<25>{#f/5}* ...',
                    '<25>{#f/0}* Supongo que no importa.'
                ]),
            '<25>{#f/0}* Napstablook, un visitante de aquí, ',
'<25>{#f/0}* Se ha ofrecido a tocar su música.',
            '<25>{#f/0}* De hecho, ¡te invitó para estar con ellos en el escenario!',
            '<25>{#f/1}* ¿Te gustaría visitar la sala de actividades para verlos?',
            ...(SAVE.data.n.state_wastelands_mash === 1
                ? [
                    '<25>{#f/3}* Oh, y me disculpo por el estado de la tarta.',
                    '<25>{#f/4}* Parece que ese perrito blanco ha vuelto a asaltar mi cocina...'
                ]
                : 3 <= SAVE.data.n.cell_insult
                    ? [
                        '<25>{#f/5}* Oh, y me disculpo por el estado de la tarta.',
                        '<25>{#f/9}* Hice lo que pude para intentar salvarlo...'
                    ]
                    : []),
            choicer.create("* (¿Ver el show de Napstablook?)", 'Sí', 'No')
        ],
        front2a: ['<25>{#p/toriel}{#f/0}* ¡Maravilloso!\n* Le haré saber que estas viniendo.'],
        front2b: ['<25>{#p/toriel}{#f/5}* ...', '<25>{#p/toriel}{#f/5}* Estaré en la sala si me necesitas.'],
        front3: () => [
            ...(world.postnoot
                ? [
                    '<25>{#p/toriel}{#f/0}* Oh, hola, pequeño.\n* Te has levantado temprano.',
                    '<25>{#f/1}* ¿Estás seguro de que dormiste lo suficiente?',
                    '<25>{#f/5}* ...',
                    world.nootflags.has('toriel') // NO-TRANSLATE

                        ? '<25>{#f/1}* El sistema atmosférico aún no parece estar arreglado.'
                        : '<25>{#f/1}* El sistema atmosférico parece estar fallando.',
                    '<25>{#f/1}* Si te empiezas a sentir débil, no dudes en volver a la cama.',
                    '<26>{#f/0}* ... aparte de eso...'
                ]
                : ['<25>{#p/toriel}* Buenos días, pequeño.']),
            ...(SAVE.data.n.state_wastelands_mash === 1
                ? [
                    '<25>{#f/3}* Parece que ese perrito blanco ha vuelto a asaltar mi cocina.',
                    '<25>{#f/4}* Deberías ver el estado de esa tarta...',
                    '<25>{#f/0}* Aún así, he hecho todo lo posible para salvarte.'
                ]
                : ['<25>{#f/1}* Las estrellas se ven hermosas hoy, ¿no es así?']),
            '<25>{#f/5}* ...',
            '<25>{#f/5}* Estaré en la sala si me necesitas.'
        ],
        front4: () => [
            ...(world.postnoot
                ? [
                    '<25>{#p/toriel}{#f/0}* Oh, hola, pequeño.\n* Te has levantado temprano.',
                    '<25>{#f/1}* ¿Estás seguro de que dormiste lo suficiente?',
                    '<25>{#f/5}* ...',
                    world.nootflags.has('toriel') // NO-TRANSLATE

                        ? '<25>{#f/1}* El sistema atmosférico aún no parece estar arreglado.'
                        : '<25>{#f/1}* El sistema atmosférico parece estar fallando.',
                    '<25>{#f/1}* Si te empiezas a sentir débil, no dudes en volver a la cama.'
                ]
                : ['<25>{#p/toriel}* Buenos días, pequeño.']),
            '<25>{#f/5}* ...',
            ...(world.bullied
                ? [
                    '<25>* Las Afueras han estado inusualmente ruidosas hoy.',
                    '<25>* Parece que un bravucón ha estado dando vueltas y causando problemas...',
                    '<25>* Lo mejor sería no alejarse demasiado.'
                ]
                : [
                    '<25>* Las Afueras han estado inusualmente silenciosas hoy.',
                    '<25>* Intente llamar a alguien justo ahora, pero...',
                    '<25>* Nada.'
                ]),
            ...(SAVE.data.n.state_wastelands_mash === 1
                ? [
                    world.bullied
                        ? '<26>{#f/3}* En otras noticias, ese perrito blanco ha vuelto a asaltar mi cocina.'
                        : '<25>{#f/3}* Aparte del pequeño perro blanco que irrumpió en mi cocina, claro.',
                    '<25>{#f/4}* Deberías ver el estado de esa tarta...',
                    '<25>{#f/0}* Aún así, he hecho todo lo posible para salvarte.',
                    '<25>{#f/1}* Espero que te guste...'
                ]
                : world.bullied || (16 <= outlandsKills() && SAVE.flag.n.genocide_twinkly < resetThreshold())
                    ? []
                    : ['<25>{#f/1}* Es bastante preocupante...']),
            '<25>{#f/0}* Como sea, estaré en la sala si me necesitas.'
        ],
        goodbye1a: ['<25>{#p/toriel}{#f/10}* ...', '<25>{#f/20}{|}* Ven aquí- {%}'],
        goodbye1b: ['<25>{#p/toriel}{#f/9}* ...', '<25>{#f/19}{|}* Ven aquí- {%}'],
        goodbye2: [
            '<25>{#p/toriel}{#f/5}* Perdón por lo que te he hecho pasar, pequeño.',
            '<25>{#f/9}* Debería haber sabido que no podría retenerte aquí para siempre.',
            '<25>{#f/5}* ... aún así, si alguna vez necesitas a alguien para hablar...',
            '<25>{#f/1}* No dudes en llamarme en cualquier momento.',
            '<25>{#f/0}* Mientras mi teléfono pueda localizarte, podre contestarlo.'
        ],
        goodbye3: [
            '<25>{#p/toriel}{#f/5}* Perdón por lo que te he hecho pasar, pequeño.',
            '<25>{#f/9}* Debería haber sabido que no podría retenerte aquí para siempre.',
            '<25>{#f/10}* ...',
            '<25>{#f/14}* Se bueno, ¿esta bien?'
        ],
        goodbye4: ['<25>{#p/toriel}{#f/1}* Se bueno, ¿esta bien?'],
        goodbye5a: [
            '<25>{#p/toriel}{#f/5}* ... ¿hmm?\n* ¿Cambiaste de opinión?',
            '<25>{#f/9}* ...',
            '<25>{#f/10}* Tal vez seas realmente diferente a los demás.',
            '<25>{#f/0}* ... bueno entonces.',
            '<25>{#f/0}* Terminaré aquí y te veré en la casa..',
            '<25>{#f/0}* Gracias por escucharme, mi niño.',
            '<25>{#f/0}* Significa mucho para mí.'
        ],
        goodbye5b: [
            '<25>{#p/toriel}{#f/5}* ... ¿hmm?\n* ¿Cambiaste de opinión?',
            '<25>{#f/10}* ...\n* Perdóname, mi niño.',
            '<25>{#f/9}* Puede que me haya perdido por un momento.',
            '<25>{#f/0}* ... no importa.',
            '<25>{#f/0}* Terminaré aquí y te veré en la casa..',
            '<25>{#f/0}* Gracias por escucharme, mi niño.',
            '<25>{#f/0}* Significa mucho para mí.'
        ],
        halo: {
            a: () => ['<32>{#p/human}* (Conseguiste el Anillo.)', choicer.create('* (¿Equiparte el Anillo?)', 'Sí', 'No')],
            b: ["<32>{#p/human}* (Llevas demasiado encima para tomar eso.)"]
        },
        indie1: () => [
            ...([1, 5].includes(SAVE.data.n.state_wastelands_dummy) && SAVE.data.b.w_state_riddleskip
                ? [
                    '<25>{#p/toriel}{#f/5}* Enseñarte hasta ahora ha sido difícil, pero...',
                    '<25>{#f/5}* Tal vez este ejercicio te ayude.'
                ]
                : ['<26>{#p/toriel}* Está bien.\n* Es tiempo para tu 3ra y última lección.']),
            '<25>{#f/1}* ¿Crees que podrás llegar al final de esta habitación...',
            '<25>{#f/1}* ... tú solo?',
            choicer.create('* (¿Qué dices?)', 'Sí', 'No')
        ],
        indie1a: () => [
            '<25>{#p/toriel}{#f/1}* ¿Estás seguro...?',
            '<25>{#f/0}* Se encuentra a poca distancia.',
            choicer.create('* (¿Cambiaste de opinión?)', 'Sí', 'No')
        ],
        indie1b: () => [
            '<25>{#p/toriel}{#f/5}* Mi niño.',
            '<25>{#f/1}* Es importante hacer las cosas por ti mismo, ¿no es así?',
            '<32>{#p/basic}* Si te niegas a cambiar de opinión, Toriel puede que decida llevarte a casa.',
            choicer.create('* (¿Cambiaste de opinión?)', 'Sí', 'No')
        ],
        indie2a: ['<25>{#p/toriel}{#f/1}* Está bien...', '<25>{#f/0}* ¡Buena suerte!'],
        indie2b: ['<25>{#p/toriel}{#f/5}* ...', '<25>{#f/9}* ... Ya veo.'],
        indie2b1: [
            '<25>{#p/toriel}{#f/10}* No te preocupes, mi niño.',
            '<25>{#f/1}* Si de verdad no quieres irte de mi lado...',
            '<25>{#f/0}* Te guiaré a través del resto de las Afueras.',
            '<25>{#f/5}* ...',
            '<25>{#f/5}* Toma mi mano, jovencito...',
            '<25>{#f/5}* Es tiempo de ir a casa.'
        ],
        indie2f: ['<32>{#p/human}{#s/equip}* (Conseguiste el TELÉFONO.)'],
        indie3a: ['<25>{#p/toriel}* ¡Lo hiciste!'],
        indie3b: [
            '<25>{#p/toriel}{#f/3}* ¡¿Mi niño, por qué tardaste tanto!?',
            '<25>{#f/4}* ¿Te perdiste?',
            '<25>{#f/1}* ...\n* Pareces estar bien...'
        ],
        indie4: () => [
            ...([1, 5].includes(SAVE.data.n.state_wastelands_dummy) && SAVE.data.b.w_state_riddleskip
                ? [
                    '<25>{#f/0}* Debo admitirlo, me sorprende que llegaras hasta el final.',
                    '<25>{#f/3}* ¿Tu comportamiento hasta ahora me ha dejado preguntando...',
                    '<25>{#f/4}* ... intentaste meterte conmigo todo este tiempo?',
                    '<25>{#f/23}* Para ser franco, no tengo tiempo para esa gentuza sin sentido.'
                ]
                : [
                    '<25>{#p/toriel}{#f/0}* No te preocupes.\n* Nunca estuviste en algún peligro real.',
                    '<25>{#f/0}* ¡Esto no era más que una prueba de tu independencia!',
                    '<25>{#f/1}* En realidad, mi niño...'
                ]),
            '<25>{#f/5}* Hay recados importantes que debo hacer.',
            '<25>{#f/0}* Mientras estoy fuera, espero que te comportes lo mejor posible.',
            '<25>{#f/1}* Los puzles que estan adelante te los tengo que explicar, y...',
            '<25>{#f/0}* Salir de la habitación por tu cuenta puede ser peligroso.',
            '<25>{#f/10}* Aquí.\n* Toma este TELÉFONO.',
            '<32>{#p/human}{#s/equip}* (Conseguiste el TELÉFONO.)',
            ...([1, 5].includes(SAVE.data.n.state_wastelands_dummy) && SAVE.data.b.w_state_riddleskip
                ? [
                    '<25>{#p/toriel}{#f/1}* Si necesitas algo mientras estoy fuera, por favor...',
                    '<25>{#f/0}* No dudes en llamarme.',
                    '<25>{#f/5}* ...',
                    '<26>{#f/23}* Y no te metas en problemas.'
                ]
                : [
                    '<25>{#p/toriel}{#f/1}* Si necesitas algo mientras estoy fuera, por favor...',
                    '<25>{#f/0}* No dudes en llamarme.',
                    '<25>{#f/5}* ...',
                    '<25>{#f/1}* Se bueno, ¿esta bien?'
                ])
        ],
        indie5: [
            [
                '<32>{#s/phone}{#p/event}* Ring, ring...',
                '<25>{#p/toriel}* ¡Hola!\n* Habla Toriel.',
                '<25>* Mis recados tardan más de lo que pensaba.',
                '<25>* Debes esperar un poco más.',
                '<25>{#f/1}* Gracias por ser paciente, mi niño...',
                '<25>{#f/0}* Eres muy bueno.'
            ],
            [
                '<32>{#s/phone}{#p/event}* Ring, ring...',
                '<25>{#p/toriel}* Hola...\n* Habla Toriel.',
                '<25>{#f/1}* Encontré lo que estaba buscando...',
                '<25>{#f/0}* ¡Pero un perrito blanco se lo llevó!\n* Que extraño.',
                '<25>{#f/1}* ¿A los perros siquiera les gusta la harina?',
                '<25>{#f/0}* Ehm, esa era una pregunta sin relación, por supuesto.',
                '<25>* Va a tomarme más tiempo del que pensé en volver.',
                '<25>{#f/1}* Gracias de nuevo por ser tan paciente...'
            ],
            [
                '<32>{#s/phone}{#p/event}* Ring, ring...',
                '<32>{#p/basic}* (...)',
                '<32>{#p/human}* (Escuchas jadeos desde el otro lado del teléfono...)',
                '<32>{#s/bark}{#p/event}* ¡Guau!\n{#s/bark}* ¡Guau!',
                '<32>{#p/human}* (Oyes una voz distante.)',
                '<25>{#p/toriel}{#f/2}* Por favor, ¡detente!',
                '<32>{#s/bark}{#p/event}* ¡Guau!\n{#s/bark}* ¡Guau!',
                '<25>{#p/toriel}{#f/1}* ¡Vuelve aquí con mi teléfono!'
            ],
            [
                '<32>{#s/phone}{#p/event}* Ring, ring...',
                '<32>{#p/basic}* (...)',
                '<32>{#p/human}* (Parece que un pequeño perro blanco se durmió encima del teléfono.)',
                '<32>{#p/basic}* (Ronquido... ronquido...)',
                '<32>{#p/human}* (Oyes una voz distante.)',
                '<25>{#p/toriel}{#f/1}* ¿Holaaa?\n* ¿Perrito?',
                '<25>{#f/1}* ¿Donde estássss?',
                '<25>{#f/0}* ¡Te voy a dar unas palmaditas en la cabeza!',
                '<32>{#p/human}* (Los ronquidos paran.)',
                '<25>{#p/toriel}* ... Sí me devuelves mi teléfono.',
                '<32>{#p/human}* (Los ronquidos continúan.)'
            ],
            [
                '<32>{#s/phone}{#p/event}* Ring, ring...',
                '<32>{#p/basic}* (...)',
                '<32>{#p/basic}* (¡Achú!)',
                '<32>{#p/human}* (Se escucha un pequeño perro blanco estornudando mientras duerme.)',
                '<25>* (Escuchas una voz distante.)',
                '<25>{#p/toriel}{#f/1}* ¡Ajá!\n* Oí eso, perrito...',
                '<25>{#f/6}* ¡Te voy a encontrar!',
                '<32>{#p/human}* (Los ronquidos paran.)\n* (El perro parece estar corriendo de algo.)',
                '<25>{#p/toriel}{#f/8}* Jeje, ¡no te vas a escapar de esta!'
            ],
            [
                '<32>{#s/phone}{#p/event}* Ring, ring...',
                '<32>{#p/human}* (Oyes una voz distante.)',
                '<25>{#p/toriel}{#f/1}* Hola...\n* Habla... Toriel...',
                '<32>{#s/bark}{#p/event}* ¡Guau!\n* ¡Guau!',
                '<25>{#p/toriel}{#f/2}* No,¡perrito malo!',
                '<32>{#p/basic}* (Lloriqueo... Lloriqueo...)',
                '<25>{#p/toriel}* Ya, ya...\n* Te voy a conseguir otro teléfono para ti.',
                '<25>{#f/1}* ¿Te gustaría eso?',
                '<32>{#p/basic}* (...)',
                '<32>{#s/bark}{#p/event}* ¡Guau!',
                '<25>{#p/toriel}* Me alegra oír eso.',
                '<32>{#p/human}* (Escuchas como el perro se va caminando.)',
                '<25>{#p/toriel}* Por favor, perdoname por todo este lío.',
                '<25>{#f/1}* Te iré a buscar en un momento...'
            ]
        ],
        indie6: (early: boolean) => [
            '<32>{#s/phone}{#p/event}* Ring, ring...',
            ...([1, 5].includes(SAVE.data.n.state_wastelands_dummy) && SAVE.data.b.w_state_riddleskip
                ? [
                    early
                        ? '<25>{#p/toriel}{#g/torielTired}* ... ¿Yá?'
                        : '<25>{#p/toriel}{#g/torielTired}* ... Si que eres impaciente',
                    '<25>{#f/9}* Realmente no me sorprende.',
                    '<25>{#f/5}* Solo recuerda los peligros que te esperan ahí afuera...',
                    '<25>{#f/1}* Sería una pena que te lastimaran.'
                ]
                : [
                    '<25>{#p/toriel}* ¿Hola?\n* Habla Toriel.',
                    '<25>{#f/1}* No te fuiste de la habitación, ¿Verdad?',
                    '<25>{#f/0}* Hay muchos peligros por ahí, y odiaría que te lastimes.',
                    '<25>{#f/1}* Cuidate, ¿de acuerdo?'
                ])
        ],
        indie7: ['<32>{#p/basic}* Unos minutos después...'],
        indie8: [
            '<25>{#p/toriel}* ¡Volví!',
            '<25>* Tu paciencia ha sido muy elogiable.\n* ¡Incluso estoy feliz!',
            '<25>{#f/0}* En fin.\n* Es hora de que te lleve a casa.',
            '<25>{#f/1}* Por favor, permíteme...'
        ],
        lobby_puzzle1: [
            '<25>{#p/toriel}{#f/0}* Bienvenido a nuestra humilde base espacial, pequeño.',
            '<25>{#f/0}* Hay muchas cosas que te debo enseñar sobre la vida aquí.',
            '<25>{#f/1}* Lo primero y más importante...',
            '<25>{#f/0}* ¡Puzles!',
            '<25>{#f/0}* Déjame mostrarte rápidamente.'
        ],
        lobby_puzzle2: [
            '<25>{#p/toriel}{#f/1}* Puede parecer extraño para ti, pero aquí en la zona espacial...',
            '<25>{#f/0}* Resolver puzles es parte de nuestra rutina diaria.',
            '<25>{#f/0}* Con el tiempo, y un poco de ayuda, te vas a acostumbrar a ellos.'
        ],
        lobby_puzzle3: ['<25>{#p/toriel}* Cuando estés listo, podremos seguir.'],
        loox: {
            a: [
                "<32>{#p/basic}{#n1}* Oí que eres bastante coqueto para ser un humano.",
                "<32>* Al {@fill=#cf7fff}COQUETEAR{@fill=#fff} con varios monstruos, verás corazones cerca de sus nombres.",
                "<32>* Cuantos más tipos de monstruos tú {@fill=#cf7fff}COQUETEES{@fill=#fff} más corazones tendrás.",
                '<32>* Me pregunto...',
                '<32>* ¿Qué tan lejos llegaras?',
                '<32>* Quizás, mi amigo, podrías hasta convertirte... en una leyenda.'
            ],
            b: [
                '<32>{#p/basic}{#n1}* Oye humano, ¿ya intentaste coquetear?',
                "<32>* ¡Ja! puedo decir por la mirada de tu cara que no lo hiciste todavía.",
                "<32>* Tengo que decirte que es muy divertido.",
                "<32>* ¡Tus enemigos no sabrán qué hacer consigo mismos!",
                '<32>* Psst... si empiezas a coquetear, puede que tenga más que decirte.',
                '<32>* ¡Buena suerte con eso!'
            ],
            c: [
                "<32>{#p/basic}{#n1}* Oye humano, ahora que empezaste a coquetear...",
                '<32>* ¿Cómo se siente?',
                "<32>* Es genial, ¿verdad?",
                "<32>* Al {@fill=#cf7fff}COQUETEAR{@fill=#fff} con varios monstruos, verás corazones cerca de sus nombres.",
                "<32>* Cuantos más tipos de monstruos tú {@fill=#cf7fff}COQUETEES{@fill=#fff} más corazones tendrás.",
                '<32>* Me pregunto...',
                '<32>* ¿Qué tan lejos llegaras?',
                '<32>* Quizás, mi amigo, podrías hasta convertirte... en una leyenda.'
            ],
            d: [
                "<32>{#p/basic}{#n1}* Escuche que eres como un bravucón en estas partes.",
                '<32>* ¡Ja!\n* Únete al club, amigo.',
                "<32>* Estás hablando con el bravucón número 1 aquí.",
                "<32>* Al {@fill=#3f00ff}INTIMIDAR{@fill=#fff} a varios tipos de monstruos, verás espadas cerca de sus nombres.",
                "<32>* Cuantos más tipos de monstruos tú {@fill=#cf7fff}INTIMIDES{@fill=#fff} más espadas tendrás.",
                '<32>* Aunque, como una advertencia, no TODOS los monstruos pueden ser intimidados.',
                "<32>* Es como coquetear... con la muerte.",
                '<32>* Divertido, ¿verdad?'
            ],
            e: pager.create(
                0,
                () => [
                    ...(30 <= SAVE.data.n.bully
                        ? [
                            "<32>{#p/basic}{#n1}* Escuche que ahora eres todo un bravucón por aquí.",
                            "<32>* Todos te tienen miedo, ¿eh?"
                        ]
                        : 20 <= world.flirt
                            ? [
                                "<32>{#p/basic}{#n1}* Escuche que ahora eres todo un romántico por aquí.",
                                '<32>* Todos te aman, ¿eh?'
                            ]
                            : [
                                "<32>{#p/basic}{#n1}* Escuche que ahora eres todo un héroe por aquí.",
                                '<32>* Le agradas a todos, ¿eh?'
                            ]),
                    '<32>* Bueno... personalmente, creo que tú tienes demasiado tiempo libre.'
                ],
                ['<32>{#p/basic}{#n1}* ¿Qué?\n* ¿Me equivoco?']
            )
        },
        manana: {
            a: pager.create(
                0,
                () =>
                    SAVE.data.b.napsta_performance
                        ? [
                            "<32>{#p/basic}{#n1}* Así que, tú eras el que co-presentador del show de música, ¿eh?",
                            "<32>* Quizás ahora tengas los medios para aceptar mi oferta.",
                            "<32>* Sólo busco a alguien que compre esta edición limitada del cómic Super Starwalker.",
                            "<32>* Ahora como me gusto ese pequeño show, tendrás un descuento.\n* 5 de Oro, tómalo o déjalo.",
                            choicer.create('{#n1!}* (¿Comprar el Super Starwalker 1 por 5 de Oro?)', 'Sí', 'No')
                        ]
                        : [
                            ...(world.postnoot
                                ? [
                                    "<32>{#p/basic}{#n1}* Oye, ¿has notado algo extraño que haya pasado aquí?",
                                    "<32>* Juraría que todos los puzles se desactivaron solos antes.",
                                    "<32>* Como sea, estoy buscando a que alguien compre esta edición limitada del comic Super Starwalker."
                                ]
                                : [
                                    '<32>{#p/basic}{#n1}* Finalmente, ¡alguien me habló!',
                                    "<32>* He estado parado aquí afuera por años, y nadie acepta mi oferta.",
                                    "<32>* Sólo busco a alguien que compre esta edición limitada del cómic Super Starwalker."
                                ]),
                            "<32>* ¿Interesado?\n* Todo lo que pido son 10 de Oro.",
                            choicer.create('{#n1!}* (¿Comprar el Super Starwalker 1 por 10 de Oro?)', 'Sí', 'No')
                        ],
                () =>
                    SAVE.data.b.napsta_performance
                        ? [
                            "<32>{#p/basic}{#n1}* ¿Interesado en comprar mi edición limitada del comic Super Starwalker?",
                            "<32>* Todo lo que pido son 5 de Oro.",
                            choicer.create('{#n1!}* (¿Comprar el Super Starwalker 1 por 5 de Oro?)', 'Sí', 'No')
                        ]
                        : [
                            "<32>{#p/basic}{#n1}* ¿Interesado en comprar mi edición limitada del comic Super Starwalker?",
                            "<32>* Todo lo que pido son 10 de Oro.",
                            choicer.create('{#n1!}* (¿Comprar el Super Starwalker 1 por 10 de Oro?)', 'Sí', 'No')
                        ]
            ),
            b: () => [
                "<32>{#p/human}{#n1!}* (No tienes suficiente Oro.)",
                SAVE.data.b.napsta_performance
                    ? "<32>{#p/basic}{#n1}* Seré honesto, eso no se ve como 5 de Oro..."
                    : "<32>{#p/basic}{#n1}* Seré honesto, eso no se ve como 10 de Oro..."
            ],
            c: ['<32>{#p/basic}{#n1}* No estas interesado, ¿eh?', "<32>* Bueno, está bien.\n* Solo buscaré a alguien más..."],
            d: [
                '<32>{#s/equip}{#p/human}{#n1!}* (Conseguiste el Super Starwalker 1.)',
                '<32>{#p/basic}{#n1}* ¡Esplendido!\n* Disfruta del comic.'
            ],
            e: ['<32>{#p/basic}{#n1}* Regresaste, ¿eh?', "<32>* Perdón amigo, ya no tengo nada más para vender."],
            f: [
                "<32>{#p/human}{#n1!}* (Llevas demasiado.)",
                "<32>{#p/basic}{#n1}* Esos bolsillos tuyos se ven llenos..."
            ],
            g: [
                "<32>{#p/basic}{#n1}* Escuche que estan reiniciando la franquicia del comic...",
                '<32>* El nuevo personaje principal es una serpiente con gafas de sol o algo así.',
                "<32>* Si estuviera a cargo, yo haría un spinoff sobre ese compañero...",
                '<32>* Gumbert, ¿Creo?'
            ],
            h: [
                "<32>{#p/basic}{#n1}* Quizás como ahora estamos libres, ellos finalmente harán ese reinicio que estaban planeando.",
                "<32>* ¿Cómo se llamaba?\n* Oh, lo he olvidado..."
            ]
        },
        mananaX: () =>
            [
                [
                    '<32>{#p/basic}{#n1}* Ahora, ¿qué era ese ruido?',
                    "<32>{#p/basic}{#n1}* Lo siento, mi vista ya no es lo que solía ser..."
                ],
                ['<32>{#p/basic}{#n1}* ¿Eh?\n* ¿Paso de nuevo?\n* Tch, estos niños de ahora...'],
                ['<32>{#p/basic}{#n1}* Los niños de ahora...']
            ][Math.min(roomKills().w_puzzle4++, 2)],
        mananaY: [
            '<32>{#p/basic}{#n1}* Huh?\n* ¿Era esa mi tira cómica de Super Starwalker?',
            "<32>{#p/basic}{#n1}* ... Y yo pensaba que me deshice esa cosa."
        ],
        afrogX: (k: number) =>
            [
                ["<32>{#p/basic}{#n1}* Si... si h-haces eso de nuevo... ¡t-tendré que detenerte!"],
                ['<32>{#p/basic}{#n1}* N-no...\n* No de nuevo...']
            ][k],
        patron: {
            a: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? 6 <= world.population
                            ? [
                                "<32>{#p/basic}{#n1}* Estoy triste.\n* Se llevaron la mesa del DJ para usarla en algún mal espectáculo más tarde.",
                                '<32>* ... espera, en realidad podría ser un poco genial.'
                            ]
                            : [
                                "<32>{#p/basic}{#n1}* Estoy triste.\n* El bravucón que pasó por aquí antes...",
                                '<32>* ... resultó ser tú.',
                                '<32>* Al final nos salvaste, pero ¿por qué usaste la violencia en el camino?'
                            ]
                        : SAVE.data.b.napsta_performance
                            ? [
                                "<32>{#p/basic}{#n1}* Estoy triste.\n* Los músicos de ahora son muy duros consigo mismos...",
                                '<32>* Personalmente, me gusto mucho esa canción suya.',
                                "<32>* Es una pena que probablemente nunca lo escucharemos de nuevo.",
                                '<32>{#n1!}{#n2}* Al menos aún tienes un filete para hacerte compañía, ¿verdad? ;)',
                                '<32>{#n2!}{#n1}* ... no esto de nuevo.'
                            ]
                            : [
                                "<32>{#p/basic}{#n1}* Estoy triste.\n* La comida de ahora es cada vez peor...",
                                '<32>* Me prometieron algo \"real\", pero todo lo que obtuve fue una copia barata.',
                                '<32>{#n1!}{#n2}* ¡Oye! ;)\n* ¡Deja de hablar mal de mi tienda frente al cliente! ;)',
                                '<32>* Además, ¿y si la culpa la tiene tu sentido del gusto? ;)',
                                '<32>{#n2!}{#n1}* ... tipico.'
                            ],
                () => [
                    SAVE.data.n.plot === 72 && 6 <= world.population
                        ? "<32>{#p/basic}{#n1}* ... ¿no es lo que es?"
                        : '<32>{#p/basic}{#n1}* ... es lo que es.'
                ]
            )
        },
        pie: () =>
            3 <= SAVE.data.n.cell_insult
                ? ['<32>{#p/human}* (Conseguiste la Tarta Quemada.)']
                : SAVE.data.n.state_wastelands_mash === 1
                    ? ['<32>{#p/human}* (Conseguiste la Sopa de Tarta.)']
                    : SAVE.data.b.snail_pie
                        ? ['<32>{#p/human}* (Conseguiste la Tarta de Caracol.)']
                        : ['<32>{#p/human}* (Conseguiste la Tarta de Caramelo.)'],
        plot_call: {
            a: () => [
                '<32>{#p/event}* Ring, ring...',
                3 <= SAVE.data.n.cell_insult
                    ? '<25>{#p/toriel}* Hola, niño.'
                    : '<25>{#p/toriel}* ¿Hola?\n* Habla Toriel.',
                '<25>{#f/1}* Por ninguna razón en particular...',
                '<25>{#f/0}* ¿Prefieres la canela o el caramelo?',
                choicer.create('* (¿Cuál prefieres?)', 'Canela', 'Caram.'),
                3 <= SAVE.data.n.cell_insult
                    ? '<25>{#p/toriel}{#f/0}* Ya veo.'
                    : '<25>{#p/toriel}* ¡Oh, ya veo!\n* ¡Muchas gracias!'
            ],
            b: () => [
                '<32>{#p/event}* Ring, ring...',
                3 <= SAVE.data.n.cell_insult
                    ? '<25>{#p/toriel}* Hola, niño.'
                    : '<25>{#p/toriel}* ¿Hola?\n* Habla Toriel.',
                [
                    '<25>{#f/1}* A ti no te DESAGRADA el caramelo, ¿no?',
                    '<25>{#f/1}* A ti no te DESAGRADA la canela, ¿no?'
                ][SAVE.data.n.choice_flavor],
                '<25>{#f/1}* Conozco tu preferencia, pero...',
                '<25>{#f/1}* ¿Aún estarías satisfecho si lo vieras en tu plato?',
                choicer.create('* (¿Qué dices?)', 'Sí', 'No')
            ],
            b1: () => [
                3 <= SAVE.data.n.cell_insult
                    ? '<25>{#p/toriel}{#f/0}* Lo entiendo.'
                    : '<25>{#p/toriel}* Claro, claro, de acuerdo.',
                '<25>{#f/1}* Continúa, entonces...'
            ],
            b2: () => [
                '<25>{#p/toriel}{#f/5}* ...',
                '<25>{#f/0}* Bien entonces.',
                '<25>{#f/1}* ...',
                3 <= SAVE.data.n.cell_insult
                    ? '<25>{#f/0}* Veré lo que puedo hacer.'
                    : '<25>{#f/0}* Te llamare más tarde, mi niño.'
            ],
            c: [
                '<32>{#p/event}* Ring, ring...',
                '<25>{#p/toriel}{#f/1}* No tienes ninguna alergia, ¿verdad?',
                '<25>{#f/5}* ...',
                '<25>{#f/5}* Supongo que los humanos no son alérgicos a la comida de monstruos.',
                '<25>{#f/0}* Je Je.\n* ¡Olvida que te lo pregunté!'
            ],
            d: [
                '<32>{#p/event}* Ring, ring...',
                '<25>{#p/toriel}{#f/1}* Hola, pequeño.',
                '<25>{#f/0}* Me he dado cuenta de que ha pasado un tiempo desde que he limpiado.',
                '<25>{#f/1}* Es probable que haya muchas cosas tiradas por ahí...',
                '<25>{#f/0}* Llevate lo que quieras, pero no intentes llevarte demasiado.',
                '<25>{#f/1}* ¿Qué pasaría si ves algo que realmente quieres?',
                '<25>{#f/0}* Querrás dejar espacio en tus bolsillos para eso.'
            ]
        },
        puzzle1A: () =>
            SAVE.data.b.svr
                ? ['<32>{#p/human}* (El interruptor parece estar atascado.)']
                : ['<32>{#p/basic}* El interruptor esta atascado.'],
        puzzle3A: () =>
            SAVE.data.b.svr
                ? ['<32>{#p/human}* (El interruptor parece estar atascado.)']
                : ['<32>{#p/basic}* El interruptor esta atascado.'],
        return1: () => [
            SAVE.data.n.cell_insult < 3
                ? '<25>{#p/toriel}{#f/1}* Mi niño, ¡¿cómo llegaste hasta aquí?!'
                : '<25>{#p/toriel}{#f/1}* Ah... ahí estas.',
            '<25>* ¿Estás bien?'
        ],
        return2a: () =>
            SAVE.data.n.cell_insult < 3
                ? ['<25>{#p/toriel}* ¡Sin un rasguño!\n* Impresionante.']
                : ['<25>{#p/toriel}{#f/10}* Sin un rasguño...\n* Muy bien.'],
        return2b: () =>
            SAVE.data.n.cell_insult < 3
                ? ['<25>{#p/toriel}{#f/4}* Te ves herido...', '<25>{#f/10}* Ya, ya, te curaré.']
                : ['<25>{#p/toriel}{#f/9}* Te han hecho daño.', '<25>{#f/10}* Por favor, déjame curarte tus heridas.'],
        return2c: [
            '<25>{#p/toriel}{#f/3}* ...',
            '<25>{#f/11}* ¿Quién te hizo esto?\n* Alguien va a responder por esto.'
        ],
        return3: () => [
            '<25>{#p/toriel}* Me disculpo, pequeño.\n* Fue tonto de mi parte dejarte solo.',
            ...(world.postnoot
                ? [
                    '<25>{#f/1}* ... soy solo yo o ¿hay algo mal con la atmosfera?',
                    '<25>{#f/5}* Puede que el sistema que lo proporciona no funcione correctamente.',
                    '<25>{#f/5}* ...',
                    '<25>{#f/0}* No importa.\n* Estoy segura de que se resolverá en breve.'
                ]
                : []),
            '<25>{#f/1}* ¡Vamos!\n* Tengo una sorpresa para ti.'
        ],
        return4: () => [
            '<25>{#p/toriel}* ¡Bienvenido a mi sala!',
            ...(3 <= SAVE.data.n.cell_insult
                ? [
                    '<25>{#f/1}* Puedes oler...',
                    '<25>{#p/toriel}{#f/2}* ... ¡oh, olvide revisar el horno!',
                    '<25>{#p/toriel}{#f/5}* Estuve tan pre- ocupada con tu comportamiento anterior, que...',
                    '<25>{#p/toriel}{#f/1}* Tengo que encargarme de esto ahora, ¡por favor no te alejes!'
                ]
                : [
                    '<25>{#f/1}* ¿Puedes oler eso?',
                    ...(SAVE.data.b.snail_pie
                        ? ['<25>{#f/0}* ¡Sorpresa!\n* Es una tarta de caracol casero.']
                        : [
                            '<25>{#f/0}* ¡Sorpresa!\n* Es una tarta de caramelo con canela.',
                            '<25>{#f/0}* Pensé que preferirías eso en vez de una tarta de caracol.'
                        ]),
                    '<25>{#f/1}* Ahora, hace mucho tiempo que no cuido a alguien...',
                    '<25>{#f/0}* Pero aún así quiero que te lo pases bien viviendo aquí.',
                    '<25>{#f/0}* ¡Sígueme!\n* Tengo otra sorpresa para ti.'
                ])
        ],
        return5: [
            "<25>{#p/toriel}* ¡Podrías mirar eso!\n* Es tu propio cuarto.",
            '<25>{#f/1}* Espero que te guste...'
        ],
        return6: [
            '<25>{#p/toriel}{#f/1}* Bueno, tengo que ir a ver la tarta.',
            '<25>{#f/0}* ¡Por favor, siéntete como en casa!'
        ],
        runaway1: [
            ['<25>{#p/toriel}{#f/1}* ¿No deberías jugar en casa en vez de eso?', '<25>{#f/0}* Vamos.'],
            ['<25>{#p/toriel}{#f/9}* Niño, es peligroso jugar ahí afuera.', '<25>{#f/5}* Confía en mi.'],
            ['<26>{#p/toriel}{#f/5}* La gravedad es muy baja aquí.\n* Te irás flotando.'],
            ['<25>{#p/toriel}{#f/5}* El sistema atmosférico es débil aquí.\n* Te sofocarías.'],
            ['<25>{#p/toriel}{#f/23}* Realmente no hay nada que ver aquí.'],
            ['<25>{#p/toriel}{#f/1}* ¿Te gustaría leer un libro conmigo?'],
            ['<25>{#p/toriel}{#f/1}* ¿Te gustaría volver a las otras habitaciones de las Afueras?'],
            ['<25>{#p/toriel}{#f/5}* No permitiré que te pongas en peligro.'],
            ['<25>{#p/toriel}{#f/3}* ¿Esperas que haga esto todo el día?'],
            ['<25>{#p/toriel}{#f/4}* ...'],
            ['<25>{#p/toriel}{#f/17}* ...', '<25>{#f/15}* No me gusta el juego al que estás jugando.'],
            ['<25>{#p/toriel}{#f/17}* ...']
        ],
        runaway2: [
            '<25>{#p/toriel}{#f/1}* Por favor regresa a casa, pequeño...',
            '<25>{#f/0}* ¡Tengo algo que mostrarte!'
        ],
        runaway3: [
            '<25>{#p/toriel}{#f/2}* ¡Niño, no!\n* ¡No es seguro para ti aquí fuera!',
            '<25>{#f/0}* Ven. Termine de preparar el desayuno.'
        ],
        runaway4: ['<25>{#p/toriel}{#f/2}* ¡Niño!\n* ¡¿Qué estas haciendo!?'],
        runaway5: [
            '<25>{#p/toriel}{#f/1}* ¿No te das cuenta de lo que pasaría si te fueras de aquí?',
            '<25>{#f/5}* Yo... siento no haberte prestado más atención...',
            '<25>{#f/9}* Tal vez si lo hubiera hecho, no habrías huido...'
        ],
        runaway6: [
            '<25>{#g/torielStraightUp}* Tengo que admitir... tengo miedo de irme de aquí.',
            '<25>{#f/9}* Hay muchos peligros más allá que nos amenazarían a ambos.',
            '<25>{#g/torielSincere}* Quiero protegerte de ellos, pero...',
            '<25>{#g/torielStraightUp}* Si te siguiera fuera de aquí, sólo te pondría en más peligro.',
            '<25>{#f/9}* Mi presencia seria vista como una amenaza.'
        ],
        runaway7: [
            '<25>{#p/toriel}{#f/5}* Por favor...',
            '<25>{#f/1}* Vuelve conmigo y te prometo que cuidare de ti.',
            '<25>{#f/5}* Haré todo lo que me pidas, ¿de acuerdo?',
            '<25>{#f/18}* Por favor... no me dejes como los otros...'
        ],
        runaway7a: [
            '<25>{#p/toriel}{#f/18}* ...',
            '<25>{#g/torielCompassionSmile}* Ya, ya, mi niño.\n* Todo estará bien ahora.',
            '<25>{#f/1}* Regresa a la casa y me reuniré contigo pronto.',
            '<25>{#f/5}* Hay algo que tengo que hacer aquí.'
        ],
        runaway7b: [
            '<25>{#p/toriel}{#f/21}* Que patético...',
            '<25>* No puedo...\n* Incluso proteger a un solo niño humano...',
            '<32>{#p/human}* (Oyes pasos que se desvanecen en la distancia.)'
        ],
        silencio: {
            a: pager.create(
                0,
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            '<32>{#p/basic}{#n1}* Hola.\n* Es bueno verte aquí de nuevo.',
                            "<32>* He decidido volver a visitar este viejo terreno mío...",
                            "<32>* Además, es tranquilo aquí.\n* Igual que yo.",
                            "<32>* Oh y me he retirado de trabajar en el NÚCLEO.",
                            '<32>* Verás, cuando me uní al equipo de ingeniería...',
                            "<32>* No me di cuenta de que me llamarían para una guardia improvisada.",
                            '<32>* ... parece que el engaño de la variedad corporativa está más allá incluso de mi previsión.'
                        ]
                        : SAVE.data.b.napsta_performance
                            ? [
                                '<32>{#p/basic}{#n1}* Hola.\n* Me alegro de verte en el show.',
                                "<32>* Me llamo Silencio... pero estoy seguro de que ya lo has oído.",
                                '<32>* Todos aquí conocen mi nombre, incluso ese DJ.',
                                '<32>* Una vez representé aquí mi propio tipo de musical.',
                                '<32>* \"El Gran Escape de Silencio,\" se llamaba.',
                                '<32>* Una vez que se acabo, me había ido antes de que la multitud pudiera recuperar el aliento.'
                            ]
                            : [
                                '<32>{#p/basic}{#n1}* Hola.\n* Encantado de conocerte.',
                                "<32>* Me llamo Silencio... bueno, así me llaman, de todas formas.",
                                '<32>* ¿Quieres saber por qué me llaman así?',
                                "<32>* Soy como un ninja del espacio, silencioso como la más silenciosa de las estrellas.",
                                '<32>* Puedo escapar de cualquier peligro, sin excepciones.',
                                "<32>* ¿No me crees?\n* Intenta algo divertido y verás que tan rápido corro."
                            ],
                () =>
                    SAVE.data.n.plot === 72
                        ? [
                            "<32>{#p/basic}{#n1}* Oh, si, supongo que ahora soy libre de abandonar la galaxia.",
                            "<32>* ... pero tal vez me quedare."
                        ]
                        : SAVE.data.b.napsta_performance
                            ? [
                                '<32>{#p/basic}{#n1}* Incluso podrías decir que mi actuación...',
                                '<32>* Fue \"impresionante.\"'
                            ]
                            : [
                                '<32>{#p/basic}{#n1}* ¿Por qué me sigues hablando, eh?',
                                "<32>* Ya te dije todo lo que estaba dispuesto a decir."
                            ]
            )
        },
        
        socks0: ['<32>{#p/human}* (Miras adentro.)', '<32>{#p/human}* (Parece que el cajón está vacío.)'],
        socks1: () =>
            world.darker
                ? ['<32>{#p/human}* (Miras adentro.)', "<32>{#p/basic}* Solo es un cajón de calcetines."]
                : [
                    '<32>{#p/human}* (Miras adentro.)',
                    '<32>{#p/basic}* ¡Escandaloso!',
                    "<32>* Es la colección de calcetines de Toriel.\n* Un poco desordenado...",
                    world.meanie
                        ? choicer.create('* (¿Hacerlo más desordenado?)', 'Sí', 'No')
                        : choicer.create('* (¿Limpiar el desorden?)', 'Sí', 'No')
                ],
        socks2: () =>
            world.meanie
                ? ['<33>{#p/human}* (Hiciste un desorden de los calcetines.)']
                : [
                    '<32>{#p/human}* (Organizaste los calcetines en pares iguales.)',
                    ...(SAVE.data.b.oops
                        ? []
                        : [
                            "<32>{#p/human}* (...)\n* (Parece que hay una llave escondida en el cajón.)",
                            choicer.create('* (¿Tomar la llave?)', 'Sí', 'No')
                        ])
                ],
        socks3: () => [
            "<32>{#p/human}* (...)\n* (Parece que hay una llave escondida en el cajón.)",
            choicer.create('* (¿Tomar la llave?)', 'Sí', 'No')
        ],
        socks4: ['<32>{#p/human}* (Decides no hacer nada.)'],
        socks5: [
            '<32>{#s/equip}{#p/human}* (La Llave Secreta fue añadida a tu llavero.)',
            '<32>{#p/basic}* ¿Pero qué podría desbloquear...?'
        ],
        socks6: ['<32>{#p/human}* (Decides no tomar nada.)'],
        socks7: () =>
            SAVE.data.b.svr
                ? [
                    '<32>{#p/human}* (Miras dentro del cajón de calcetines, recordando el largo viaje que comenzó aquí.)',
                    "<32>{#p/human}* (No puedes evitar preguntarte dónde estarías sin el.)"
                ]
                : world.darker
                    ? ["<32>{#p/basic}* Solo es un cajón de calcetines."]
                    : SAVE.data.n.plot < 72
                        ? ["<32>{#p/basic}* No puedes dejar de mirar los calcetines."]
                        : SAVE.data.b.oops
                            ? [
                                "<32>{#p/basic}* Viniste aquí sólo para volver a ver el cajón de calcetines de Toriel...?",
                                '<32>* Tienes grandes prioridades en la vida.'
                            ]
                            : [
                                "<32>{#p/basic}* Viniste aquí sólo para volver a ver el cajón de calcetines de Toriel...?",
                                '<32>* ... Supongo que eso tiene sentido.'
                            ],
        steaksale: {
            a: pager.create(
                0,
                () =>
                    SAVE.data.b.napsta_performance
                        ? [
                            '<32>{#p/basic}{#n1}* Qué pasa, joven ;)',
                            "<32>* Fue bueno verte en el show, ¿sabes? ;)",
                            '<32>* Hiciste un gran trabajo ;)',
                            "<32>* Si una cosa es segura, creo que eso merece una oferta especial ;)",
                            '<32>* Solo por un tiempo limitado, nuestros productos llevarán nuestros ingredientes \"premium\" ;)',
                            "<32>* Y créeme, joven, esto no es sólo lo mismo de antes, aw naw ;)",
                            '<32>* Esta cosa es GENUINA, amigo ;)',
                            "<32>* Es un poco más caro, así que espero que no te importe ;)",
                            "<32>* Ahora... ¿por qué no echas un vistazo a lo que está a la venta? ;)"
                        ]
                        : [
                            '<32>{#p/basic}{#n1}* Qué pasa, joven ;)',
                            '<32>* El jefe me envió aquí para ver qué hacían ustedes los campesinos, ¿sabes? ;)',
                            "<32>* Puedes decir que estamos expandiendo nuestra empresa ;)",
                            "<32>* ¿Cuál es nuestra empresa, te preguntas?;)",
                            "<32>* Bueno, en realidad es muy sencillo... vendemos filetes ;)",
                            "<32>* Y esto no es material replicado, aw naw ;)",
                            '<32>* Esta cosa es REAL, hijo ;)',
                            '<32>* Quien diga lo contrario es un farsante, ¿me entiendes? ;)',
                            "<32>* Dicho esto, ¿por qué no echas un vistazo a lo que está a la venta? ;)"
                        ],
                ["<32>{#p/basic}{#n1}* ¿Por qué no echas un vistazo a lo que está a la venta? ;)"]
            ),
            a1: ['<32>{#p/basic}{#n1}* Gracias por todo, joven ;)'],
            b: () => [
                SAVE.data.b.napsta_performance
                    ? world.darker
                        ? '<32>{#p/basic}{#n1!}* \"Filete Sizzli\" por 40 de Oro.'
                        : '<32>{#p/basic}{#n1!}* Está etiquetado como \"Filete Sizzli\" y cuesta 40 de Oro.\n* Huele como a una ultra hipérbole.'
                    : world.darker
                        ? '<32>{#p/basic}{#n1!}* \"Filete Sizzli\" por 20 de Oro.'
                        : '<32>{#p/basic}{#n1!}* Está etiquetado como \"Filete Sizzli\" y cuesta 20 de Oro.\n* Huele como a una hipérbole.',
                SAVE.data.b.napsta_performance
                    ? choicer.create('* (¿Comprar el Filete Chisp. por 40 de Oro?)', 'Sí', 'No')
                    : choicer.create('* (¿Comprar el Filete Chisp. por 20 de Oro?)', 'Sí', 'No')
            ],
            b1: ['<32>{#p/human}{#n1!}* (Obtuviste el Filete Sizzli.)', '<32>{#p/basic}{#n1}* Buena elección, joven ;)'],
            b2: ['<32>{#p/human}{#n1!}* (Decidiste no comprarlo.)'],
            c: () => [
                SAVE.data.b.napsta_performance
                    ? world.darker
                        ? '<32>{#p/basic}{#n1!}* \"Soda Fizzli\" por 10 de Oro.'
                        : '<32>{#p/basic}{#n1!}* Está etiquetado como \"Soda Fizzli\" y cuesta 10 de Oro.\n* ¿Quién compraría esto?'
                    : world.darker
                        ? '<32>{#p/basic}{#n1!}* \"Soda Fizzli\" por 5 de Oro.'
                        : '<32>{#p/basic}{#n1!}* Está etiquetado como \"Soda Fizzli\" y cuesta 5 de Oro.\n* ¿Quién compraría esto?',
                SAVE.data.b.napsta_performance
                    ? choicer.create('* (¿Comprar la Soda Gaseosa por 10 de Oro?)', 'Sí', 'No')
                    : choicer.create('* (¿Comprar la Soda Gaseosa por 5 de Oro?)', 'Sí', 'No')
            ],
            c1: ['<32>{#p/human}{#n1!}* (Obtuviste la Soda Fizzli.)', "<32>{#p/basic}{#n1}* Con cuidado, es dulce ;)"],
            c2: ['<32>{#p/human}{#n1!}* (Decidiste no comprarlo.)'],
            d: pager.create(
                0,
                () => [
                    "<32>{#p/human}{#n1!}* (No tienes suficiente Oro.)",
                    '<32>{#p/basic}{#n1}* ¿Sin dinero suficiente, eh? ;)',
                    SAVE.data.b.napsta_performance
                        ? '<32>{#p/basic}* Esta bien, joven;)\n* No todos pueden comprar los ingredientes \"premium\" ;)'
                        : "<32>{#p/basic}* Esta bien, joven ;)\n* Sólo asegúrate de volver cuando tengas algo ;)"
                ],
                ["<32>{#p/human}{#n1!}* (No tienes suficiente Oro.)"]
            ),
            e: pager.create(
                0,
                [
                    "<32>{#p/human}{#n1!}* (Llevas demasiado.)",
                    '<32>{#p/basic}{#n1}* Tal vez deberías de regresar más tarde ;)'
                ],
                ["<32>{#p/human}{#n1!}* (Llevas demasiado.)"]
            ),
            f: ['<32>{#p/human}{#n1!}* (Obtuviste el Filete Sizzli.)'],
            g: ['<32>{#p/human}{#n1!}* (Obtuviste la Soda Fizzli.)'],
            h: ["<32>{#p/human}{#n1!}* (Llevas demasiado.)"],
            i: [
                "<32>{#p/basic}{#n1}* Por cierto, se nos agotaron ;)",
                "<32>* Parece que no puedes tener suficiente de nuestras cosas ;)",
                '<32>* Dime, si... no, cuando te encuentres con el jefe... dile esto ;)',
                '<32>{#p/human}{#n1!}* (Aaron susurró algo en tu oído.)',
                '<32>{#p/basic}{#n1}* Buena suerte ahí fuera, joven ;)'
            ]
        },
        supervisor: {
            a: ['<32>{#p/basic}* Después...'],
            b: [
                '<32>{#p/napstablook}* oigan todos...',
                '<32>* esta es una pequeña música que escribí hace un tiempo...',
                "<32>* he estado experimentando con mi estilo últimamente, así que...",
                "<32>* espero que sea lo suficientemente bueno para todos ustedes",
                '<32>* ...',
                '<32>* bueno, aquí vamos...'
            ],
            c1: ['<32>{*}{#p/basic}* Bueno, esto es jazz.{^30}{%}'],
            c2: [
                '<25>{*}{#p/toriel}{#f/7}* ¿¿Por qué Napstablook nunca menciono esto??\n* ¡Esto es bueno!{^30}{%}',
                "<32>{*}{#p/basic}* Sí, tal vez sea tímido.{^30}{%}"
            ],
            c3: ['<32>{*}{#p/basic}* Ooh, campanas ;){^30}{%}'],
            c4: ['<32>{*}{#p/basic}* ¡Aquí viene el desglose!{^30}{%}'],
            c5: ['<32>{*}{#p/basic}* Bueno, eso fue... algo.{^30}{%}'],
            d: [
                '<32>{#p/napstablook}* si, eso fue algo',
                '<32>{#p/napstablook}* oh bueno...\n* probablemente los he aburrido...',
                '<32>{#p/napstablook}* perdón...'
            ],
            e: [
                '<25>{|}{#p/toriel}{#f/2}* ¡No, espera!\n* Eso fue en realidad...',
                "<32>{#p/basic}* No creo que pueda oírte, Toriel.",
                '<25>{#p/toriel}{#f/9}* ...\n* Nunca lo hace...'
            ]
        },
        terminal: {
            a: () =>
                postSIGMA()
                    ? ["<32>{#p/human}* (Activaste la terminal, pero no hay ningún mensaje entrante.)"]
                    : SAVE.data.n.plot === 72
                        ? !world.runaway
                            ? [
                                '<32>{#p/human}* (Activaste la terminal y reproduces el mensaje entrante.)',
                                "<32>{#p/alphys}* ¡Ahora, somos libres!\n* ¡Esto no es una broma, el campo de fuerza se ha ido!",
                                "<32>* ¡En serio, van a cerrar el núcleo en unos días, así que es hora de irnos!",
                                "<32>* Tú no querrás morir aquí, ¿verdad?"
                            ]
                            : [
                                '<32>{#p/human}* (Activaste la terminal y reproduces el mensaje entrante.)',
                                "<32>{#p/alphys}* El campo de fuerza se ha ido.\n* Llamando a todos los ciudadanos para una evacuación inmediata.",
                                "<32>* ... se que todos estan asustados, pero todo va a salir bien.",
                                "<32>* No puede hacernos daño si lo dejamos atrás."
                            ]
                        : 37.2 <= SAVE.data.n.plot
                            ? [
                                '<32>{#p/human}* (Activaste la terminal y reproduces el mensaje entrante.)',
                                "<32>{#p/alphys}* La red de fluidos de la Fábrica ha sido reparada, gracias a nuestros... m-muy amables trabajadores.",
                                '<32>* ...',
                                "<32>* En una nota no relacionada, estamos... b-buscando nuevos trabajadores."
                            ]
                            : [
                                '<32>{#p/human}* (Activaste la terminal y reproduces el mensaje entrante.)',
                                "<32>{#p/alphys}* La red de fluidos de la Fabrica vuelve a d-desmoronarse.",
                                '<32>* Los trabajadores han prometido un cambio rápido, pero las cosas no se ven bien.',
                                '<32>* Por favor, s-si alguien por ahí pudiera ayudar, los necesitamos...'
                            ]
        },
        torieldanger: {
            a: ['<25>{#p/toriel}{#f/1}* ¿Ya intentaste revisar el terminal?'],
            b: ['<25>{#p/toriel}{#f/1}* La contraseña del terminal está justo ahí, pequeño.']
        },
        latetoriel1: [
            '<25>{#p/toriel}{#npc/a}{#f/2}* ¡...!',
            '<25>{#f/5}* Que haces aquí fuera, mi ni...',
            '<25>{#f/9}* ... niño...',
            '<25>{#f/5}* Ya no puedo cuidarte más, niño.\n* Tampoco debería.',
            '<25>{#f/5}* Tienes lugares donde deberías estar, cosas por ver...',
            '<25>{#f/10}* ¿Quién soy yo para impedírtelo?',
            '<25>{#f/9}* ...',
            '<25>{#f/5}* Por favor, sigue sin mi...',
            '<25>{#f/1}* ... Sé que puedes hacer lo correcto...'
        ],
        latetoriel2: ['<25>{#p/toriel}{#npc/a}{#f/5}* ... continua...'],
        
        lateasriel: () =>
            [
                ['<25>{#p/asriel1}{#f/13}* Sólo déjame, Frisk...', "<25>{#f/15}* No puedo volver contigo, ¿esta bien?"],
                [
                    "<25>{#p/asriel1}{#f/16}* No quiero romperles el corazón otra vez.",
                    "<25>{#f/13}* Es mejor que ni siquiera me vean."
                ],
                [
                    '<25>{#p/asriel1}{#f/15}* ... ¿Que estás haciendo?',
                    '<25>{#f/15}* ¿Estás tratando de hacerme compañía?',
                    '<25>{#f/23}* Frisk...',
                    '<25>{#f/22}* ...',
                    '<25>{#f/13}* Oye.',
                    '<25>{#f/13}* Déjame hacerte una pregunta.',
                    '<25>{#f/15}* Frisk...\n* ¿Por que viniste aquí?',
                    '<25>{#f/13}* Todos saben la historia, ¿verdad?',
                    '<25>{#f/23}* \"Se dice que las astronaves que vuelan al sector Ebott desaparecen\"',
                    '<25>{#f/22}* ...',
                    '<32>{#p/human}* (...)\n* (Le dices a Asriel la verdad.)',
                    '<25>{#p/asriel1}{#f/25}* ...',
                    '<25>{#f/25}* Frisk... tú...',
                    '<25>{#f/23}* ...',
                    "<25>{#f/23}* No tienes por que estar solo de nuevo, ¿ok?",
                    "<25>{#f/17}* Hiciste tantos amigos maravillosos aquí...",
                    "<25>{#f/17}* Ellos cuidaran de ti, ¿vale?"
                ],
                [
                    '<25>{#p/asriel1}{#f/15}* ...',
                    '<25>{#f/15}* Sé porque $(name) voló hasta aquí.',
                    "<25>{#f/16}* No fue por una razón feliz.",
                    "<25>{#f/13}* Frisk.\n* Seré honesto contigo.",
                    '<25>{#f/15}* $(name) no quiso tener nada que ver con los humanos.',
                    '<25>{#f/16}* Jamás dijo el porqué.',
                    '<25>{#f/15}* Pero se sintió muy fuerte sobre eso.'
                ],
                [
                    "<25>{#p/asriel1}{#f/17}* Frisk, está bien.\n* No eres como $(name) para nada.",
                    '<25>{#f/15}* Es mas, a pesar de que tengas, uh, un estilo de moda similar...',
                    "<25>{#f/13}* No sé porque actué como si fueras la misma persona.",
                    '<25>{#f/15}* Talvés...\n* Realmente...',
                    "<25>{#f/16}* $(name) solamente no era quien yo quería que fuera.",
                    '<25>{#f/13}* Pero tú, Frisk...',
                    "<25>{#f/17}* Tú eres el tipo de amigo que siempre quise tener.",
                    '<25>{#f/20}* Así que creo que me estaba proyectando un poco.',
                    "<25>{#f/17}* Seamos honestos.\n* Hice cosas muy extrañas como una estrella."
                ],
                [
                    "<25>{#p/asriel1}{#f/13}* Hay una ultima cosa que debo decirte.",
                    '<25>{#f/15}* Cuando $(name) y yo combinamos nuestras ALMAS...',
                    '<25>{#f/16}* El control de nuestro cuerpo se dividió entre los dos.',
                    '<25>{#f/15}* $(name) fue quien levantó su propio cuerpo vacío.',
                    "<25>{#f/13}* Y luego, cuando llegamos a los escombros del planeta...",
                    '<25>{#f/13}* $(name) fue el que quiso...',
                    '<25>{#f/16}* ... usar todo nuestro poder.',
                    '<25>{#f/13}* Me costó mucho resistirme.',
                    '<25>{#f/15}* Y luego, por mi culpa, nosotros...',
                    "<25>{#f/22}* Y bueno, ya viste como terminé.",
                    '<25>{#f/23}* ... Frisk.',
                    "<25>{#f/17}* Todo este tiempo me culpé a mi mismo por esa decisión.",
                    "<25>{#f/13}* así adquirí esa vista tan horrible del mundo.",
                    '<25>{#f/13}* \"Matar o morir.\"',
                    '<25>{#f/17}* Pero ahora...\n* Luego de conocerte...',
                    "<25>{#f/23}* Frisk, ya no me arrepiento de esa decisión.",
                    '<25>{#f/22}* Hice lo correcto.',
                    "<25>{#f/13}* Si hubiéramos matado a esos humanos...",
                    '<25>{#f/15}* Habríamos tenido que declarar la guerra a toda la humanidad.',
                    '<25>{#f/17}* Y al final, todos fueron libres, ¿verdad?',
                    '<25>{#f/17}* Incluso los otros que vinieron aquí salieron con vida.',
                    '<25>{#f/13}* ...',
                    '<25>{#f/15}* Pero, $(name)...',
                    "<25>{#f/16}* ... No puedo decir que estoy seguro que le pasó cuando morimos. ",
                    '<25>{#f/15}* Nada fue encontrado... ni siquiera su ALMA.',
                    "<25>{#f/15}* No puedo dejar de pensar... Si es que siguen allí afuera.",
                    '<32>{#p/basic}* ...',
                    '<32>{#p/human}* (Suena como si alguien estuviera llorando...)'
                ],
                [
                    '<25>{#p/asriel1}{#f/17}* Frisk, gracias por escucharme.',
                    '<25>{#f/17}* Deberías ir con tus amigos, ¿vale?',
                    '<25>{#f/13}* Oh, y, por favor...',
                    '<25>{#f/20}* Si me vez en el futuro...',
                    "<25>{#f/15}* ... No lo veas como yo, ¿ok?",
                    '<25>{#f/16}* Solo quiero que me recuerdes... así.',
                    '<25>{#f/17}* Como alguien que fue tu amigo por un rato.',
                    '<25>{#f/13}* ...',
                    '<32>{|}{#p/human}* (Le dices a Asriel que tu realment- {%}',
                    "<25>{#p/asriel1}{#f/23}* Frisk, está bien.",
                    "<25>{#f/22}* No tienes que salvar a todos para ser una buena persona.",
                    '<25>{#f/13}* Ademas... incluso si pudiera mantener esta forma...',
                    "<25>{#f/15}* No se si podría dejar atrás lo que pasó.",
                    "<25>{#f/17}* ... Solo prometeme que te cuidaras, ¿vale?",
                    '<25>{#f/13}* ...',
                    '<25>{#f/15}* Bueno, nos vemos.'
                ],
                ['<25>{#p/asriel1}{#f/13}* Frisk...', "<25>{#f/15}* ¿No tienes nada mejor que hacer?"],
                []
            ][Math.min(SAVE.data.n.lateasriel++, 8)],
        securefield: ['<33>{#p/basic}* Hay un campo de seguridad.\n* Está activo.'],
        kitchenwall: () =>
            SAVE.data.n.plot === 9
                ? ['<26>{#p/toriel}{#f/1}* ¡Paciencia, mi niño!']
                : ['<26>{#p/toriel}{#f/1}* Puede que esto tome un tiempo...'],
        torielwall: () => [
            "<32>{#p/basic}* Está cerrado.",
            toriSV()
                ? SAVE.data.n.plot < 17.001
                    ? '<32>{#p/basic}* Suena como que Toriel está llorando...'
                    : '<32>{#p/basic}* Suena como que Toriel está durmiendo...'
                : '<32>{#p/basic}* Suena como que Toriel está escribiendo...'
        ],
        trivia: {
            w_security: ["<32>{#p/basic}* Es un campo de seguridad."],
            photoframe: () =>
                SAVE.data.b.svr
                    ? [
                        [
                            '<25>{#p/asriel1}{#f/13}* Un marco vacío...',
                            '<25>{#f/16}* Había una vez, donde HABIA fotos en esos marcos.',
                            '<25>{#f/15}* Luego, ella los sacó y nunca más los volvió a poner.',
                            "<25>{#f/16}* ... Debió dolerle demasiado como para verlos."
                        ],
                        [
                            '<25>{#p/asriel1}{#f/13}* Los cuadros vacíos son como recuerdos perdidos...',
                            '<25>{#p/asriel1}{#f/15}* Este lugar tiene demasiados de esos.'
                        ],
                        ['<25>{#p/asriel1}{#f/22}* Demasiados de esos en este lugar extraño.']
                    ][Math.min(asrielinter.photoframe++, 1)]
                    : SAVE.data.n.plot === 72 && !world.runaway
                        ? ['<32>{#p/basic}* Aun es un marco vacío.']
                        : ['<32>{#p/basic}* Un marco de foto vacío.'],
            w_paintblaster: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Este dispositivo parece ser de hace algunas décadas.)']
                    : world.darker
                        ? ['<32>{#p/basic}* Un dispositivo inútil sin importancia para nadie.']
                        : ['<32>{#p/basic}* Un viejo dispositivo de inyección de combustible.'],
            w_candy: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (El cartel avisa de funciones inesperadas de aparatos.)']
                    : ['<32>{#p/basic}* \"Por favor, recuerde que los aparatos pueden ser más propensos a fallar.\"'],
            w_djtable: () =>
                SAVE.data.b.svr
                    ? []
                    : world.darker
                        ? ["<32>{#p/basic}* Es un set de DJ"]
                        : SAVE.data.n.plot === 72
                            ? ['<32>{#p/basic}* Un set de DJ coqueto, sorprendentemente no está siendo usado.']
                            : ['<32>{#p/basic}* Un set de DJ coqueto, equipado con varias perillas y deslizadores. '],
            w_froggit: () =>
                SAVE.data.n.plot === 72
                    ? [
                        '<32>{#p/basic}* Ribbit, ribbit.\n* (Disculpame, humano)',
                        '<32>* (Parece que has crecido en una persona pensativa y meticulosa.)',
                        "<32>* (No se si haya sido por mis consejos o no...)\n* (Pero aun así me siento orgulloso.)",
                        '<32>* Ribbit.'
                    ]
                    : [
                        '<32>{#p/basic}* Ribbit, ribbit.\n* (Disculpame, humano...)',
                        '<32>* (Tengo unos consejos para ti sobre como pelear contra los monstruos.)',
                        '<32>* (Si tú {@fill=#ff0}ACTUAS{@fill=#fff} de cierta manera o {@fill=#3f00ff}PELEAS{@fill=#fff} hasta casi derrotarlos...)',
                        '<32>* (Tal vez ya no querrán pelear contigo.)',
                        '<32>* (Si un monstruo no quiere pelear contigo, por favor...)',
                        '<32>* (Ten algo de {@fill=#ff0}PIEDAD{@fill=#fff}, humano.)\n* Ribbit.'
                    ],
            w_froggit_view: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Miras pensativamente al cosmos que está más allá...)']
                    : world.darker
                        ? []
                        : SAVE.data.n.plot === 72
                            ? [
                                "<32>{#p/basic}* Es irónico como mirando al espacio exterior...",
                                '<32>* Parece ser una buena forma de canalizar tus pensamientos internos.'
                            ]
                            : [
                                "<32>{#p/basic}* Es una vista del espacio exterior.",
                                '<32>* Ciertamente no faltan por aquí, ¿verdad?'
                            ],
            w_lobby1: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (La señal habla de la fuerza de voluntad en los tiempos difíciles.)']
                    : ['<32>{#p/basic}* \"Incluso cuando te tropiezas, aparecerá la voluntad para seguir adelante.\"'],
            w_pacing_view: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Miras felizmente al cosmos que está más allá...)']
                    : world.darker
                        ? []
                        : SAVE.data.n.plot === 72
                            ? [
                                "<32>{#p/basic}* Después de un largo viaje, el cristal no parece asustarte.",
                                '<32>* No es como si lo hubiera hecho en primer lugar.'
                            ]
                            : [
                                '<32>{#p/basic}* Pensar que lo único que te separa del infinito es una lámina de cristal...',
                                "<32>* A pesar de todo el sentido común, esto no parece molestarte."
                            ],
            w_pacing1: () =>
                SAVE.data.n.plot === 72
                    ? [
                        '<32>{#p/basic}* Ribbit, ribbit.\n* (Alguien paso aquí no hace mucho.)',
                        '<32>* (Él me dijo que no te dijera hacia donde él estaba yendo.)',
                        "<32>* (No lo iba a hacer, pero entonces, él se empezó a ver tan triste...)",
                        "<32>* (Probablemente él este ahora en la plataforma que esta pasando la entrada.)",
                        '<32>* (Ve. Háblale. Algo bueno saldrá de ello.)\n* Ribbit.',
                        '<32>{#p/basic}* ... Asriel...'
                    ]
                    : [
                        '<32>{#p/basic}* Ribbit, ribbit.\n* (Suspiro...)',
                        '<32>* (Mi \"amigo\" no le gusta ser amable conmigo.)',
                        '<32>* (Si se le diera la opción, mi amigo elegiría hacerme daño.)',
                        "<32>* (Así es.......)\n* (Lastimándome............)\n* (................)",
                        "<32>* (Al menos eres amable conmigo.)\n* Ribbit."
                    ],
            w_pacing2: () =>
                SAVE.data.n.plot === 72
                    ? SAVE.data.b.oops
                        ? [
                            '<32>{#p/basic}* Ribbit, ribbit.\n* (Hola, humano...)',
                            '<32>* (¿Has oído sobre mi amigo?)',
                            '<32>* (Estaba parado a mi lado hace unos días, justo a mi izquierda...)',
                            '<32>* (Pero un poco después de que llegaras, desaparecio.)',
                            "<32>* (Mi amigo me dijo que se iría si dañabas a alguien...)",
                            SAVE.data.n.exp <= 0
                                ? "<32>* (Lo cual es confuso, ya que tú definitivamente no hiciste eso.)\n* Ribbit."
                                : '<32>* (Tal vez la próxima vez, ¿podrías ser un poco más bueno?)\n* Ribbit.'
                        ]
                        : [
                            '<32>{#p/basic}* Ribbit, ribbit.\n* (Hola, humano...)',
                            "<32>* (Mi amigo es el más feliz de todo el mundo.)",
                            "<32>* (Mi amigo dijo que se iría si dañabas a alguien, pero no lo has hecho.)",
                            "<32>* (De hecho, ha decidido quedarse conmigo a mi izquierda para siempre.)",
                            '<32>* (En cuanto a ese \"amigo\" suyo que siempre intentaba hacerle daño...)',
                            '<32>* (Oh, parece que él mismo se ha convertido en una cabra.)\n* Ribbit.'
                        ]
                    : [
                        '<32>{#p/basic}* Ribbit, ribbit.\n* (Hola, humano...)',
                        '<32>* (¿Ya intentaste revisar tus OBJETOS?)',
                        "<32>* (Si has recogido algo, ahí es donde lo encontrarás.)",
                        '<32>* (¿Qué tengo en mis OBJETOS, te preguntarás?)',
                        "<32>* (Oh, eres tonto... ¡los monstruos no tenemos OBJETOS!)\n* Ribbit."
                    ],
            w_pacing3: () =>
                SAVE.data.n.plot === 72
                    ? SAVE.data.n.bully < 1
                        ? [
                            '<32>{#p/basic}* Ribbit, ribbit.\n* (Gracias por siempre haber mostrado piedad hacia nosotros, los monstruos.)',
                            '<32>* (Se que te di un consejo sobre como golpear a la gente de forma segura...)',
                            "<32>* (Pero eso no significaba que yo quisiera que lo hicieras)",
                            '<32>* (Sin duda eres un humano amable.)\n* Ribbit.'
                        ]
                        : SAVE.data.n.bully < 15
                            ? [
                                '<32>{#p/basic}* Ribbit, ribbit.\n* (Gracias por mantener los golpes al mínimo.)',
                                '<32>* (Se que te di un consejo sobre como golpear a la gente de forma segura...)',
                                "<32>* (Pero eso no significaba que yo quisiera que lo hicieras)",
                                "<32>* (No eres tan terrible, al menos para un humano.)\n* Ribbit."
                            ]
                            : [
                                '<32>{#p/basic}* Ribbit, ribbit.\n* (Has demostrado ser una amenaza formidable.)',
                                "<32>* (Aun así, aún no te tengo miedo...)",
                                '<32>* (Posiblemente, porque me ofreciste piedad cuando pudiste haber atacado.)',
                                '<32>* (Aprecio los limites que te impusiste.)\n* Ribbit.'
                            ]
                    : [
                        '<32>{#p/basic}* Ribbit, ribbit. ',
'<32>{#p/basic}* (Si golpeas a un monstruo hasta que esté apunto de morir...)',
                        '<32>* (Su nombre se tornará azul.)',
                        '<32>* (Raro, ¿verdad?)\n* (Pero oí que a los humanos les ocurre lo mismo también.)',
                        '<32>* (Así que supongo que puedes identificarte con eso.)',
                        '<32>* (Pero bueno, gracias por oír mi charla.)\n* Ribbit.'
                    ],
            w_puzzle1_view: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Miras profundamente hacia el cosmos y mas allá...)']
                    : world.darker
                        ? []
                        : SAVE.data.n.plot === 72
                            ? ['<32>{#p/basic}* Al final, estas habitaciones aun se sienten solo como áreas de observación.']
                            : [
                                '<32>{#p/basic}* ¿Por qué parece que algunas de estas habitaciones...',
                                '<32>* ... ¿fueron hechas solo como observadores?'
                            ],
            w_puzzle2: () =>
                SAVE.data.b.svr
                    ? world.nootflags.has('w_puzzle2') // NO-TRANSLATE

                        ? [
                            '<32>{#p/human}* (La señal describe la resolución de puzles como una parte innecesaria de la exploración espacial.)',
                            ...[
                                [
                                    '<25>{#p/asriel1}{#f/13}* A diferencia de la mayoría de las señales, esta tiene un punto.',
                                    "<25>{#f/15}* Y eso no es solo porque porque yo fui quien la escribió."
                                ],
                                ["<25>{#p/asriel1}{#f/3}* ... no me digas que de verdad te gustaron estos puzles."],
                                ["<25>{#p/asriel1}{#f/10}* Frisk, incluso tú no eres TAN raro."]
                            ][Math.min(asrielinter.w_puzzle2++, 2)]
                        ]
                        : ['<32>{#p/human}* (El cartel describe el valor de la paciencia en el espacio.)']
                    : world.nootflags.has('w_puzzle2') // NO-TRANSLATE

                        ? [
                            '<32>{#p/basic}* \"La última frontera es un mar profundo y oscuro.\"',
                            '<32>* \"¡Navegar sus aguas NUNCA debería requerir resolver puzles mal diseñados!\"'
                        ]
                        : [
                            '<32>{#p/basic}* \"La última frontera es un mar profundo y oscuro.\"',
                            '<32>{#p/basic}* \"Antes de entrar en {@fill=#ff993d}lo desconocido{@fill=#fff}, espera a que sus {@fill=#00a2e8}corrientes se alineen{@fill=#fff}.\"'
                        ],
            w_puzzle3_view: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Miras reflexivamente al cosmos más allá...)']
                    : world.darker
                        ? []
                        : SAVE.data.n.plot === 72
                            ? ['<32>{#p/basic}* Seguro... fue... una buena vista.']
                            : ['<32>{#p/basic}* Seguro es una buena vista.'],
            w_puzzle4: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (El cartel parece ser un anuncio de una venta de filetes que ya no existe.)']
                    : [
                        '<32>{#p/basic}* \"¡Asegúrate de probar un filete exclusivo de Glyde (TM) en la sala de actividades!\"'
                    ],
            w_ta_box: () =>
                SAVE.data.b.svr
                    ? [
                        [
                            '<25>{#p/asriel1}{#f/20}* Sí... Toriel nunca fue de las que mantienen esas en una sola pieza.',
                            '<25>{#f/21}* Incluso estas réplicas de mis maquetas de naves estelares fueron destrozadas...'
                        ],
                        [
                            "<25>{#f/13}* Es sorprendente.\n* Ella es usualmente una persona organizada.",
                            '<25>{#p/asriel1}{#f/17}* ... ella debe haber tenido un mal día.'
                        ],
                        ['<25>{#p/asriel1}{#f/13}* Eso ocurre a veces...']
                    ][Math.min(asrielinter.w_ta_box++, 2)]
                    : world.darker
                        ? ["<32>{#p/basic}* Es una caja de juguetes.\n* Las maquetas de naves estelares se han roto."]
                        : SAVE.data.n.plot === 72
                            ? [
                                '<32>{#p/basic}* Las pequeñas naves en esta caja nunca fueron reparadas.',
                                "<32>* Si esto estuviera en la casa de Asgore, mis maquetas estarían en perfecto estado."
                            ]
                            : [
                                '<32>{#p/basic}* ¡Una caja de maquetas de naves estelares!\n* Y... ¿cristales rotos?',
                                '<32>* Parece como si alguien hubiera roto sus pequeñas naves.'
                            ],
            w_ta_cabinet: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* (No puedes encontrar nada aquí, además de varios que tienen el mismo diseño.)"]
                    : [
                        '<32>{#p/basic}* Un armario lleno de camisas de rayas azules y amarillas.',
                        ...(SAVE.data.n.plot === 72 ? ["<32>* Como si eso fuera a cambiar."] : [])
                    ],
            w_ta_frame: () =>
                SAVE.data.b.svr
                    ? [["<25>{#p/asriel1}{#f/21}* ... se ha perdido..."], ['<25>{#p/asriel1}{#f/21}* ...']][
                    Math.min(asrielinter.w_ta_frame++, 1)
                    ]
                    : SAVE.data.n.plot === 72
                        ? ['<32>{#p/basic}* Un marco de foto vacío.', "<32>* Aun no hay nada más que decir."]
                        : ['<32>{#p/basic}* Un marco de foto vacío.', "<32>* No hay mucho más que decir."],
            w_ta_paper: () =>
                SAVE.data.b.svr
                    ? [
                        "<32>{#p/human}* (El dibujo no parece tener alguna importancia.)",
                        ...[
                            [
                                "<25>{#p/asriel1}{#f/13}* Hace tiempo que desapareció, pero el dibujo real que hice aquí...",
                                '<25>{#f/17}* ... era básicamente el modelo para mi forma de \"dios de la hipermuerte\"..',
                                '<25>{#f/17}* Super skybreaker, titanium striker...',
                                '<25>{#f/20}* Y, por supuesto, el legendario \"hyper goner.\"'
                            ],
                            [
                                '<25>{#p/asriel1}{#f/17}* Sí... supongo que yo ya lo tenía todo planeado.',
                                '<25>{#f/20}* Se me ocurrían muchas locuras, todo el tiempo...',
                                '<25>{#f/1}* Ooh, tú hubieras adorado mi concepto de la nave sarten-galactica.'
                            ],
                            [
                                '<25>{#p/asriel1}{#f/17}* Frisk, yo espero...',
                                '<25>{#f/23}* Yo de verdad espero que tengamos un momento como ese entre nosotros.',
                                '<25>{#f/22}* Devuelta con $(name), siempre fue...',
                                '<25>{#f/15}* ... difícil.'
                            ],
                            ["<25>{#p/asriel1}{#f/20}* No te preocupes.\n* Si no puedes dibujar, yo te enseñare."]
                        ][Math.min(asrielinter.w_ta_paper++, 3)]
                    ]
                    : world.darker
                        ? ['<32>{#p/basic}* Un dibujo olvidable.\n* Nada como el original.']
                        : [
                            "<32>{#p/basic}* Un dibujo hecho por un niño, que representa a un monstruo gigante con alas de arcoiris.",
                            "<32>* Es como el que esta en casa..."
                        ],
            w_tf_couch: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Parece que el sofá nunca ha sido usado.)']
                    : SAVE.data.n.plot === 72
                        ? ["<32>{#p/basic}* No importa cuanto tiempo pase, es poco probable que alguien se siente aquí."]
                        : world.darker
                            ? ["<32>{#p/basic}* Es un sofá.\n* ¿Qué más esperabas?"]
                            : [
                                '<32>{#p/basic}* Un sofá que se ve muy comodo.',
                                '<32>* Es difícil resistirse a la tentación de hundirse en sus cómodos cojines...'
                            ],
            w_tf_table: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* (Miras a la mesa, pero no parece que te devuelva la mirada.)"]
                    : [
                        '<32>{#p/basic}* Una mesa auxiliar sin importancia.',
                        "<32>{#p/basic}* De manera poco realista, está en condiciones casi perfectas...."
                    ],
            w_tf_window: () =>
                SAVE.data.b.svr
                    ? SAVE.data.b.c_state_secret1_used && SAVE.data.b.c_state_secret5_used
                        ? ['<32>{#p/human}* (Miras con deseo al cosmos más allá...)']
                        : ['<32>{#p/human}* (Miras con nostalgia al cosmos más allá...)']
                    : world.darker
                        ? ["<32>{#p/basic}* Es solo otra ventana."]
                        : SAVE.data.n.plot === 72
                            ? ["<32>{#p/basic}* Como siempre, es una hermosa vista del espacio exterior."]
                            : ["<32>{#p/basic}* Es una hermosa vista del espacio exterior."],
            w_th_door: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* (El cartel describe la habitación como incompleta.)',
                        ...[
                            [
                                "<25>{#p/asriel1}{#f/3}* Si esta casa no fuera una replica, ese sería el cuarto de Papá...",
                                '<25>{#f/4}* Puedes adivinar porque nunca fue terminado.'
                            ],
                            [
                                '<25>{#p/asriel1}{#f/13}* ...',
                                '<25>{#f/15}* Ese discurso afectó a Mamá de una manera... no muy buena.',
                                '<25>{#f/4}* Como una estrella, yo a veces... la espiaba.',
                                "<25>{#f/3}* Y por la forma en que hablaba, es como si nunca hubiera dejado ese momento.",
                                '<25>{#f/13}* Entonces, tú llegaste, y todo cambio...'
                            ],
                            [
                                '<25>{#p/asriel1}{#f/13}* ...',
                                "<25>{#f/15}* Esto es muy incómodo.\n* Voy a fingir que no estamos aquí."
                            ],
                            ['<25>{#p/asriel1}{#f/13}* ...']
                        ][Math.min(asrielinter.w_th_door++, 3)]
                    ]
                    : ['<32>{#p/basic}* \"Cuarto bajo renovaciones.\"'],
            w_th_mirror: () =>
                SAVE.data.b.svr
                    ? ["<25>{#p/asriel1}{#f/24}* Somos nosotros..."]
                    : world.genocide
                        ? ['<32>{#p/basic}* ...']
                        : world.darker
                            ? ["<32>{#p/basic}* Eres tú."]
                            : SAVE.data.b.w_state_catnap || SAVE.data.n.plot > 17
                                ? ["<32>{#p/basic}* Eres tú...", '<32>{#p/basic}* ... y siempre lo serás.']
                                : ["<32>{#p/basic}* ¡Eres tú!"],
            w_th_plant: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Agradeces a la planta por el calor que te da cada día.)']
                    : SAVE.data.n.plot === 72
                        ? ["<32>{#p/basic}* Esta planta está feliz de que sigas con vida."]
                        : world.darker
                            ? ['<32>{#p/basic}* Esta planta no está muy feliz de verte.']
                            : SAVE.data.b.oops
                                ? ['<32>{#p/basic}* Esta planta está feliz de verte.']
                                : ['<32>{#p/basic}* ¡Esta planta esta emocionada de verte!'],
            w_th_sausage: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Agitas la planta cursi.)']
                    : ['<32>{#p/basic}* Esta planta parece muy cursi.'],
            w_th_table1: () => [
                '<32>{#p/human}* (Miras debajo de la mesa y encuentras un conjunto de crayones.)',
                ...(SAVE.data.b.svr
                    ? [
                        [
                            '<25>{#p/asriel1}{#f/24}* Yo creo que $(name) puedo haber perdido al crayón azul.',
                            '<25>{#f/7}* ... de hecho, no.\n* YO SE que perdió el crayón azul.',
                            '<25>{#f/6}* Apareció más tarde en un baúl de comida, pero a nadie se le ocurrió comprobarlo.',
                            '<25>{#f/16}* Debía de estar intentando reclamar el cofre como suyo.'
                        ],
                        [
                            "<26>{#p/asriel1}{#f/4}* Si alguna vez conseguimos un nuevo conjunto de crayones, estaré vigilando.",
                            '<25>{#f/3}* En el momento en que se te ocurra perder un crayón...',
                            "<26>{#f/8}* Estaré allí para detener el tren del crimen antes de que llegue a las vías.",
                            '<25>{#f/2}* Solo espera.'
                        ],
                        ["<25>{#p/asriel1}{#f/31}* Tengo mis ojos en ti, Frisk.", '<25>{#f/8}* Y... talvez mis orejas.'],
                        ['<25>{#p/asriel1}{#f/10}* ¿Estás mirando mis orejas de nuevo?\n* Sigues haciendo eso.']
                    ][Math.min(asrielinter.w_th_table1++, 3)]
                    : world.edgy
                        ? ['<32>{#p/basic}* Faltan 2 crayones de su caja.']
                        : world.darker
                            ? ['<32>{#p/basic}* Falta 1 crayón de la caja.']
                            : [
                                '<32>{#p/basic}* El siempre evasivo crayón azul, desaparecido durante cien años...',
                                '<32>{#p/basic}* Una auténtica leyenda de nuestro tiempo.'
                            ])
            ],
            w_th_table2: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* (Miras debajo de la mesa y encuentras una baraja de cartas.)',
                        ...[
                            [
                                '<25>{#p/asriel1}{#f/27}* $(name) y yo nunca nos intereso ese tipo de cosas.',
                                '<25>{#p/asriel1}{#f/15}* Bueno... dije nunca.',
                                "<25>{#p/asriel1}{#f/15}* Eh, solo no hablemos sobre eso."
                            ],
                            [
                                '<25>{#p/asriel1}{#f/13}* ...',
                                '<25>{#p/asriel1}{#f/13}* La última vez que lo hicimos, se volcó una mesa.',
                                '<25>{#p/asriel1}{#f/17}* Solo cosas de hermanos.\n* Ya sabes lo que pasa con los juegos de cartas.'
                            ],
                            ['<25>{#p/asriel1}{#f/17}* ...']
                        ][Math.min(asrielinter.w_th_table2++, 2)]
                    ]
                    : world.darker
                        ? [
                            '<32>{#p/human}* (Miras debajo de la mesa y encuentras una baraja de cartas.)',
                            "<33>{#p/basic}* No merece la pena dedicarle tiempo."
                        ]
                        : SAVE.data.n.plot === 72
                            ? [
                                '<32>{#p/human}* (Miras debajo de la mesa y encuentras una baraja de cartas.)',
                                "<33>{#p/basic}* Pronto, no tendremos que volver a pensar en esto."
                            ]
                            : [
                                '<32>{#p/human}* (Miras debajo de la mesa y encuentras una baraja de cartas.)',
                                "<33>{#p/basic}* Son holográficos, por supuesto."
                            ],
            w_tk_counter: () =>
                SAVE.data.b.svr
                    ? [
                        '<32>{#p/human}* (Pasas la mano por la tabla de cortar, observando las distintas ranuras y crestas.)'
                    ]
                    : world.darker
                        ? ["<32>{#p/basic}* Es una tabla de cortar."]
                        : ["<32>{#p/basic}* La tabla de cortar de Toriel.\n* Ya no está tan a la altura como antes."],
            w_tk_sink: () =>
                SAVE.data.b.svr
                    ? [
                        [
                            '<25>{#p/asriel1}{#f/21}* $(name) siempre dijo que dejar pelos en el desagüe era super asqueroso.',
                            '<25>{#f/15}* Siempre pensé que era normal, sin embargo...'
                        ],
                        [
                            '<25>{#p/asriel1}{#f/13}* ¿A los humanos no se les caía el pelo?\n* $(name) nunca me diría cosas como esta.'
                        ],
                        ["<25>{#p/asriel1}{#f/17}* Tengo una razón para creer que a los humanos lo hacen.\n* Incluso si no es pelo."]
                    ][Math.min(asrielinter.w_tk_sink++, 2)]
                    : SAVE.data.n.plot === 72
                        ? ['<32>{#p/basic}* Pedazos de pelo blanco que una vez estuvieron pegados aquí continúan hasta este día.']
                        : ['<32>{#p/basic}* Hay trozos de pelaje blanco en el desagüe.'],
            w_tk_stove: () =>
                SAVE.data.b.svr
                    ? [
                        [
                            '<25>{#p/asriel1}{#f/13}* Me pregunto por qué ella pensó que sería buena idea comprar esto.',
                            "<25>{#f/10}* ¿A menos que quisiera recrear la cocina de Asgore...?",
                            "<25>{#f/17}* Para alguien que no le agradaba, tenía una rara forma de demostrarlo."
                        ],
                        [
                            '<25>{#p/asriel1}{#f/15}* Realmente deseo que Toriel y Asgore esten juntos a veces.',
                            "<25>{#f/16}* ... pero supongo que lo mejor era que no lo estén."
                        ],
                        ["<25>{#p/asriel1}{#f/13}* Simplemente no estaban destinados a ser, Frisk..."]
                    ][Math.min(asrielinter.w_tk_stove++, 2)]
                    : SAVE.data.n.state_wastelands_toriel === 2
                        ? ["<32>{#p/basic}* Es solo una estufa.\n* Nadie va a usarla."]
                        : world.darker
                            ? ["<32>{#p/basic}* Solo es una estufa."]
                            : SAVE.data.n.plot === 72
                                ? ['<32>{#p/basic}* La estufa está muy limpia.\n* Toriel no va a necesitar una en el nuevo mundo.']
                                : ['<32>{#p/basic}* La estufa está muy limpia.\n* Toriel debe de usar magia de fuego.'],
            w_tk_trash: () =>
                SAVE.data.b.svr
                    ? ["<32>{#p/human}* (No puedes distinguir nada en la basura...)"]
                    : SAVE.data.n.plot === 72
                        ? ['<32>{#p/basic}* Un tanto simbólicamente, el bote de basura está vacío.']
                        : ['<32>{#p/basic}* Hay una receta arrugada de Té de Starling.'],
            
            w_tl_azzychair: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Notas el gran tamaño de la silla.)']
                    : SAVE.data.n.state_wastelands_toriel === 2 || world.runaway
                        ? ['<32>{#p/basic}* Una silla grande.']
                        : ["<32>{#p/basic}* Una de las sillas de Toriel.\n* Perfecto para una reina."],
            w_tl_bookshelf: pager.create(
                1,
                () =>
                    SAVE.data.b.svr
                        ? [
                            '<32>{#p/human}* (Los libros en este estante consisten de datos de caracoles, recetas familiares y tips de jardinería.)'
                        ]
                        : [
                            "<32>{#p/basic}* Es una estantería.",
                            '<32>{#p/human}* (Recoges un libro...)',
                            '<32>{#p/basic}* \"Sabias que la lengua del caracoles es como la sierra que se llama rádula?\"',
                            '<32>* \"No mucha gente se sabe eso.\"',
                            '<32>* \"Otra cosa genial de ellos es como su sistema digestivo se voltea mientras maduran.\"',
                            '<32>* \"Oh, y acaso mencione...\"',
                            '<32>* \"Los caracoles hablan. {^10}Muy. {^10}Lento.\"',
                            '<32>* \"Solo bromeo, los caracoles no hablan.\"',
                            '<32>* \"Digo, ¿Te imaginarias un mundo con caracoles parlantes?\n* \"Yo se que no podría.\"',
                            '<32>{#p/human}* (Pones el libro devuelta en la estantería.)'
                        ],
                () =>
                    SAVE.data.b.svr
                        ? [
                            '<32>{#p/human}* (Los libros en este estante consisten de datos de caracoles, recetas familiares y tips de jardinería.)'
                        ]
                        : [
                            "<32>{#p/basic}* Es una estantería.",
                            '<32>{#p/human}* (Recoges un libro...)',
                            '<32>{#p/basic}* \"Recetas de la Familia Dreemurr: Tarta de Caracol\"',
                            '<32>* \"La tarta de caracol es una preciada tradición entre los miembros de la familia Dreemurr.\"',
                            '<32>* \"Hacerla es un proceso simple, y puede dividirse en 5 pasos.\"',
                            '<32>* \"Primero, preparar la corteza del fondo colocándola en la parte superior de un plato para tartas.\"',
                            '<32>* \"Luego, bata la leche evaporada, huevos y especias en un tazón hasta que quede suave.\"',
                            '<32>* \"Luego, tome varios caracoles bien añejos e incorpóralos bien a la mezcla\".',
                            '<32>* \"Después de eso, vierta el contenido del tazón en la base del fondo.\"',
                            '<32>* \"Al final, prepare la corteza superior cortando la hoja en tiras y formando una celosía.\"',
                            '<32>* \"¡Entonces solo hornea la tarta!\"',
                            '<32>* \"¡Una vez la tarta este lista, sácala del horno, déjala enfriar, y sírvela!\"',
                            '<32>{#p/human}* (Pones el libro devuelta en la estantería.)'
                        ],
                () =>
                    SAVE.data.b.svr
                        ? [
                            '<32>{#p/human}* (Los libros en este estante consisten de datos de caracoles, recetas familiares y tips de jardinería.)'
                        ]
                        : [
                            "<32>{#p/basic}* Es una estantería.",
                            '<32>{#p/human}* (Recoges un libro...)',
                            '<32> {# p / basic} * \"Buenas, compañeros jardineros.\"',
                            '<32>* \"Cuando se trata de flores Starling, la línea entre crecimiento y estancamiento...\"',
                            '<32>* \"Es acceso a espacios abiertos.\"',
                            '<32>* \"Es por eso que comúnmente se cultivan en Aerialis...\"',
                            '<32>* \"Es el área más abierta del puesto de avanzada.\"',
                            '<32>{#p/human}* (Pones el libro devuelta en la estantería.)'
                        ]
            ),
            
            w_tl_goreychair: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Notas el pequeño tamaño de la silla.)']
                    : SAVE.data.n.state_wastelands_toriel === 2 || world.runaway
                        ? ['<32>{#p/basic}* Una pequeña silla.']
                        : world.genocide
                            ? ["<32>{#p/basic}* Una de las sillas de Toriel.\n* Perfecta para un demonio."]
                            : world.darker
                                ? ["<32>{#p/basic}* Una de las sillas de Toriel.\n* Perfecta para un príncipe."]
                                : SAVE.data.b.oops
                                    ? ["<32>{#p/basic}* Una de las sillas de Toriel.\n* Perfecta para un niño.\n* ¡Como tú!"]
                                    : ["<32>{#p/basic}* Una de las sillas de Toriel.\n* Perfecta para... un pequeño angel.\n* ¡Como tú!"],
            w_tl_table: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (La planta parece estar decorada naturalmente.)']
                    : world.darker
                        ? ['<32>{#p/basic}* Una planta decorativa.\n* Nada más.']
                        : ["<32>{#p/basic}* Una planta decorativa en la mesa de Toriel."],
            w_tl_tools: () =>
                SAVE.data.b.svr
                    ? [
                        [
                            '<25>{#p/asriel1}{#f/20}* $(name) solía fingir que estos eran instrumentos musicales.',
                            '<25>{#f/17}* Los sacaba, y comenzaba a \"tocarlos\"...',
                            '<25>{#f/20}* Una vez, me uní e hicimos un pequeño dúo de fuego instrumental.',
                            '<26>{#f/13}*  Emulabamos nuestras voces para los instrumentos, y entonces...',
                            '<25>{#f/17}* ¡Mamá y papá entraron para agregar coros!'
                        ],
                        [
                            '<25>{#p/asriel1}{#f/13}* Entonces, al parecer, alguien había estado escuchando afuera.',
                            '<25>{#f/15}* Antes de darnos cuenta, teníamos monstruos llegando a la casa en masa...',
                            '<25>{#f/17}* $(name) y yo todavía estábamos en el medio de la habitación, haciendo lo nuestro.',
                            '<25>{#f/20}* ¡Pero ahora teníamos una orquesta entera detrás nuestra!',
                            '<25>{#f/17}* Debimos haber realizado la mitad de los Índice del Harmonexus ese día.',
                            "<25>{#f/17}* ... es un libro viejo lleno de canciones de nuestra cultura."
                        ],
                        [
                            '<25>{#p/asriel1}{#f/13}* Todo eso porque jugamos a fingir con unos atizadores de fuego....',
                            '<25>{#f/17}* Dicen que puedes hacer un instrumento de cualquier cosa.',
                            '<25>{#f/13}* ...',
                            "<25>{#f/15}* Espera...\n* YO SOY cualquier cosa..." 
                        ],
                        ["<25>{#p/asriel1}{#f/20}* Por favor no hagas un instrumento musical conmigo."]
                    ][Math.min(asrielinter.w_tl_tools++, 3)]
                    : world.darker
                        ? ['<32>{#p/basic}* Atizadores de fuego.']
                        : SAVE.data.n.plot === 72
                            ? [
                                "<32>{#p/basic}* Solo son atizadores de fuego...\n* ¿O no?",
                                "<32>* Tenga en cuenta que el fuego de Toriel sólo está agradablemente cálido, y nada caliente.",
                                '<32>* ¿Por qué ella necesitaría esto?',
                                '<32>* Entonces, por el proceso de eliminación, estos deberían ser instrumentos musicales avanzados.'
                            ]
                            : [
                                '<32>{#p/basic}* Una estantería de instrumentos musicales avanzados.',
                                '<32>* Tras un vistazo cercano, te das cuenta que son atizadores de fuego.',
                                "<32>* Es difícil saberlo, dado que estas herramientas probablemente fueron hechas...",
                                '<32>* Antes de que la Zona Espacial siquiera exista.'
                            ],
            
            w_tl_torichair: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Observas el tamaño excepcional de la silla del comedor.)']
                    : SAVE.data.n.state_wastelands_toriel === 2 || world.runaway
                        ? ['<32>{#p/basic}* Una silla de comedor tamaño rey.']
                        : ["<32>{#p/basic}* Una silla de comedor de Toriel.\n* Hecha para un rey."],
            w_tt_bed: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (La cama parece mucho menor de lo que lo que solía ser.)']
                    : SAVE.data.n.state_wastelands_toriel === 2 || world.runaway
                        ? ["<32>{#p/basic}* Es una cama."]
                        : SAVE.data.n.plot < 72 || world.runaway
                            ? [
                                "<32>{#p/basic}* Es la cama de Toriel.",
                                ...(world.darker ? [] : ['<32>* Sin duda demasiado grande para gente como tú.'])
                            ]
                            : [
                                "<32>{#p/basic}* Es la cama de Toriel.",
                                "<32>* Todavía te queda algo de tiempo, pero lo lograrás."
                            ],
            w_tt_bookshelf: pager.create(
                1,
                () =>
                    SAVE.data.b.svr
                        ? [
                            '<32>{#p/human}* (Los libros de esta estantería consisten en historia, biología y una posibilidad premonitoria.)'
                        ]
                        : [
                            SAVE.data.n.state_wastelands_toriel === 2 || world.runaway
                                ? "<32>{#p/basic}* Es una estantería."
                                : "<32>{#p/basic}* Es la estantería privada de Toriel.",
                            '<32>{#p/human}* (Recoges un libro...)',
                            '<32>{#p/basic}* \"Nuestro Hogar Natal desaparecido... nuestra gente muerta... pero ¿por qué?\"',
                            '<32>* \"Seguramente los humanos debían haber tenido una razón para sus ataques.\"',
                            '<32>* \"¿Nuestra especie realmente representaba una amenaza para ellos?\"',
                            '<32>* \"¿Era realmente terrible la amenaza de nuestro potencial?\"',
                            '<32>* \"Cuál sea el caso, estabamos acorralados, y no había adonde ir.\"',
                            '<32>* \"La capitulación era nuestro único medio real de supervivencia.\"',
                            '<32>{#p/human}* (Pones el libro devuelta en la estantería.)'
                        ],
                () =>
                    SAVE.data.b.svr
                        ? [
                            '<32>{#p/human}* (Los libros de esta estantería consisten en historia, biología y una posibilidad premonitoria.)'
                        ]
                        : [
                            SAVE.data.n.state_wastelands_toriel === 2 || world.runaway
                                ? "<32>{#p/basic}* Es una estantería."
                                : "<32>{#p/basic}* Es la estantería privada de Toriel.",
                            '<32>{#p/human}* (Recoges un libro...)',
                            '<32>{#p/basic}* \"Cuando nace un monstruo jefe, se forma un vínculo mágico entre los padres y el niño.\"',
                            '<32>* \"A través de esto se crea su ALMA, envejeciendo los padres junto con el niño.\"',
                            '<32>* \"El ALMA de un monstruo jefe adulto es la más fuerte conocida por los monstruos...\"',
                            '<32>* \"Capaz de persistir después de la muerte, aunque sólo sea por un breve período.\"',
                            '<32>{#p/human}* (Pones el libro devuelta en la estantería.)'
                        ],
                () =>
                    SAVE.data.b.svr
                        ? [
                            '<32>{#p/human}* (Los libros de esta estantería consisten en historia, biología y una posibilidad premonitoria.)'
                        ]
                        : [
                            SAVE.data.n.state_wastelands_toriel === 2 || world.runaway
                                ? "<32>{#p/basic}* Es una estantería."
                                : "<32>{#p/basic}* Es la estantería privada de Toriel.",
                            '<32>{#p/human}* (Recoges un libro...)',
                            '<32>{#p/basic}* \"A menudo nos preocupamos por lo que pasaría si un humano nos atacara.\"',
                            '<33>* \"¿Pero qué pasaría si uno de nosotros atacara...?\"',
                            '<32>* \"¿Podríamos como sociedad manejar tal traición?\"',
                            '<32>* \"¿Pero a quien se le ocurriera hacer algo así?\"',
                            '<32>{#p/human}* (Pones el libro devuelta en la estantería.)'
                        ]
            ),
            w_tt_cactus: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Este cactus parece recordarte a alguien que conociste.)']
                    : SAVE.data.n.plot < 72
                        ? world.darker
                            ? ['<32>{#p/basic}* Finalmente, una planta con la que todos nos identificamos.']
                            : ['<32>{#p/basic}* Ah, el cactus.\n* Definitivamente la planta mas tsundere de todas.']
                        : ["<32>{#p/basic}* No es como que este cactus estaba esperando a que vuelvas ni nada..."],
            w_tt_chair: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Esta silla parece ser un poco pequeña para su dueña.)']
                    : world.darker
                        ? ["<32>{#p/basic}* Es una silla para leer."]
                        : SAVE.data.n.plot === 72
                            ? [
                                "<32>{#p/basic}* La silla para leer de Toriel...",
                                "<32>* ... al menos hasta que Asgore decida que le gustaría a él.",
                                "<32>* El siempre quiso esta silla.\n* Me sorprendería que no se la lleve."
                            ]
                            : ["<32>{#p/basic}* La silla para leer de Toriel...", '<32>* Huele a huesos vagos.'],
            w_tt_diary: pager.create(
                0,
                ...[
                    [
                        '<32>{#p/human}* (Lees el párrafo resaltado.)',
                        '<32>{#p/toriel}{#f/21}* \"Pregunta: ¿Por que el esqueleto quería un amigo?\"',
                        '<32>* \"Respuesta: Porque se sentía HUESOLO...\"',
                        '<32>{#p/basic}* Los demás chistes son de calibre similar.'
                    ],
                    [
                        '<32>{#p/human}* (Miras otro párrafo.)',
                        '<32>{#p/toriel}{#f/21}* \"Pregunta: ¿Cuál es el otro nombre para los vicios de un esqueleto?\"',
                        '<32>* \"Respuesta: Actividades HUECAS...\"',
                        "<32>{#p/basic}* No tiene sentido seguir leyendo esto..."
                    ],
                    [
                        '<32>{#p/human}* (Miras otro párrafo.)',
                        '<32>{#p/toriel}{#f/21}* \"Pregunta: ¿Cómo un esqueleto dice adiós?\"',
                        '<32>* \"Respuesta: Te medulo mañana...\"',
                        "<32>{#p/basic}* ESE NI SIQUIERA FUE REMOTAMENTE GRACIOSO."
                    ],
                    [
                        '<32>{#p/human}* (Miras otro párrafo.)',
                        "<32>{#p/basic}* No puedes tener suficiente de estos terribles chistes.",
                        '<32>{#p/toriel}{#f/21}* \"Pregunta: ¿Por qué el esqueleto babeaba mientras dormía?\"',
                        '<32>* \"Respuesta: Porque estaba teniendo un sueño sobre FEMURES...\"',
                        '<32>{#p/basic}* Esto se está poniendo viejo...'
                    ],
                    [
                        '<32>{#p/human}* (Miras otro párrafo.)',
                        "<32>{#p/basic}* Aún no puedes tener suficiente de estos terribles chistes.",
                        '<32>{#p/toriel}{#f/21}* \"Pregunta: ¿Qué le dice un esqueleto a alguien para iniciar una pelea?\"',
                        '<32>* \"Respuesta: Tengo un HUESO pendiente contigo...\"',
                        "<32>{#p/basic}* ¿En serio?\n* ¡Eso ni siquiera fue un chiste!"
                    ],
                    [
                        '<32>{#p/human}* (Miras otro párrafo.)',
                        "<32>{#p/basic}* Estamos perdiendo neuronas con esto...",
                        "<32>{#p/toriel}{#f/21}* \"'¿Donde van estas escaleras?' preguntó el esqueleto.\"",
                        '<32>* \"... las escaleras no respondieron.\"',
                        '<32>{#p/basic}* ...\n* No tengo palabras.'
                    ],
                    [
                        '<32>{#p/human}* (Miras el ultimo párrafo.)',
                        "<32>{#p/basic}* ¿Huh?\n* Este no es un chiste...",
                        '<32>{#p/toriel}{#f/21}* \"Un humano ha caído en Las Afueras.\"',
                        '<32>* \"Confió en que Sans cuidara de ellos, pero...\"',
                        '<32>* \"No quiero forzarlo a que lo haga.\"',
                        '<32>* \"Ademas, ¿podría realmente un solo centinela real protegerlos del resto de la Zona Espacial?\"',
                        '<32>* \"Espero que ese tipo de preguntas pronto no sean necesarias.\"',
                        '<32>{#p/basic}* ...'
                    ],
                    ['<32>{#p/human}* (No hay mas entradas escritas aquí.)']
                ].map(
                    lines => () =>
                        SAVE.data.b.svr
                            ? ['<32>{#p/human}* (El diario parece consistir mayormente de chistes de esqueletos de ultima generación.)']
                            : SAVE.data.n.plot === 72
                                ? [
                                    '<32>{#p/human}* (Miras la pagina mas reciente.)',
                                    '<32>{#p/toriel}{#f/21}* \"Parece que mis prejuicios sobre Asgore fueron incorrectos.\"',
                                    '<32>* \"Al no haberlo confrontado, fallé en entender que estaba pasando.\"',
                                    '<32>* \"Tenía razón en pensar que no merecía ser una madre.\"',
                                    '<32>* \"Pero tal vez ahora... Pueda aprender lo que realmente es ser una madre.\"',
                                    '<32>* \"Tendré que pensar en esto por mi propia cuenta.\"'
                                ]
                                : world.darker
                                    ? ["<32>{#p/basic}* Es un diario.\n* No lo encontrarías chistoso."]
                                    : SAVE.data.n.plot < 14
                                        ? lines
                                        : [
                                            '<32>{#p/human}* (Miras el párrafo mas reciente.)',
                                            ...(world.edgy
                                                ? ["<32>{#p/basic}* Está lleno de garabatos hechos con un crayón."]
                                                : toriSV()
                                                    ? [
                                                        '<32>{#p/toriel}{#f/21}* \"No han sido los mejores días.\"',
                                                        '<32>* \"Otro humano más ha caído fuera de mi cuidado...\"',
                                                        '<32>* \"El séptimo y ultimo humano que él necesitaría para romper el campo de fuerza.\"',
                                                        '<32>* \"No debí haber permitido que esto pase.\"',
                                                        '<32>* \"Con tanto en juego, una confrontación sería inevitable...\"'
                                                    ]
                                                    : [
                                                        '<32>{#p/toriel}{#f/21}* \"Ha sido un día interesante, en pocas palabras.\"',
                                                        '<32>* \"Un humano llegó...\"',
                                                        '<32>* \"Luego, trató de irse...\"',
                                                        '<32>* \"Y después, la cosa mas rara pasó.\"',
                                                        '<32>* \"Un recuerdo de que fui necesitada durante un tiempo...\"'
                                                    ])
                                        ]
                )
            ),
            w_tt_plant: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Esta planta te parece de lo más normal.)']
                    : ["<32>{#p/basic}* Es una planta.", '<32>* ¿Qué más hay que decir?'],
            w_tt_trash: pager.create(
                0,
                () =>
                    SAVE.data.b.svr
                        ? ["<32>{#p/human}* (No puedes distinguir nada en la basura...)"]
                        : world.darker
                            ? ['<32>{#p/basic}* Caracoles.']
                            : SAVE.data.n.plot === 72
                                ? ['<32>{#p/basic}* Los caracoles empezaron a oler... fantasmales.', '<32>* ... ¿qué podría significar esto?']
                                : [
                                    "<32>{#p/basic}* Es el tacho personal de Toriel, él cual contiene...",
                                    '<32>* Caracoles.',
                                    '<32>* Montones y montones de caracoles.'
                                ],
                pager.create(
                    1,
                    () =>
                        SAVE.data.b.svr
                            ? ["<32>{#p/human}* (No puedes distinguir nada en la basura...)"]
                            : world.darker
                                ? ['<32>{#p/basic}* Caracoles.']
                                : SAVE.data.n.plot === 72
                                    ? ['<32>{#p/basic}* Tal vez así viven los caracoles después de su fecha de caducidad.']
                                    : ['<32>{#p/basic}* Y nada MAS QUE caracoles.'],
                    () =>
                        SAVE.data.b.svr
                            ? ["<32>{#p/human}* (No puedes distinguir nada en la basura...)"]
                            : world.darker
                                ? ['<32>{#p/basic}* Caracoles.']
                                : SAVE.data.n.plot === 72
                                    ? ["<32>{#p/basic}* O tal vez me he perdido por completo."]
                                    : ['<32>{#p/basic}* ...\n* ¿Ya mencione a los caracoles?'],
                    () =>
                        SAVE.data.b.svr
                            ? ["<32>{#p/human}* (No puedes distinguir nada en la basura...)"]
                            : world.darker
                                ? ['<32>{#p/basic}* Caracoles.']
                                : SAVE.data.n.plot === 72
                                    ? ['<32>{#p/basic}* O tal vez...', '<32>* ... espera, ¿qué estaba diciendo?']
                                    : ['<32>{#p/basic}* Caracoles.'],
                    () =>
                        SAVE.data.b.svr
                            ? ["<32>{#p/human}* (No puedes distinguir nada en la basura...)"]
                            : world.darker
                                ? ['<32>{#p/basic}* Caracoles.']
                                : SAVE.data.n.plot === 72
                                    ? ["<32>{#p/basic}* Oh, cierto.\n* El significado del nuevo olor fantasmal de los caracoles."]
                                    : ['<32>{#p/basic}* Montones y montones de caracoles.']
                )
            ),
            w_tutorial_view: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (Miras emocionado al cosmos más allá...)']
                    : world.darker
                        ? []
                        : ['<32>{#p/basic}* La primera de muchas ventanas en esta parte de las Afueras.'],
            w_tutorial1: () =>
                SAVE.data.b.svr
                    ? ['<32>{#p/human}* (El cartel describe las cualidades de una buena relación.)']
                    : [
                        '<32>{#p/basic}* \"Una buena relación requiere confianza y amabilidad para avanzar.\"',
                        ...(world.goatbro && SAVE.flag.n.ga_asrielOutlands7++ < 1
                            ? ['<26>{#p/asriel2}{#f/8}* Qué groseramente sentimental.']
                            : [])
                    ]
        },
        piecheck: () =>
            SAVE.data.b.svr
                ? [
                    [
                        "<25>{#p/asriel1}{#f/17}* Las tartas de mama siempre fueron las mejores...",
                        '<25>{#f/13}* Todavía recuerdo a qué sabía la primera que comí.',
                        "<25>{#f/15}* Nunca me sentí tan feliz de comer una porción de algo...",
                        "<25>{#f/17}* ... fue como si hubiera trascendido al siguiente nivel de pastelería."
                    ],
                    [
                        "<25>{#p/asriel1}{#f/20}* Hmm, tal vez estoy exagerando un poco.",
                        "<25>{#f/17}* Pero te lo digo ahora mismo, Frisk...",
                        '<25>{#f/13}* ... no importa lo que pase con Mamá y Papá...',
                        '<25>{#f/17}* Necesito que la convenzas para que me haga una de sus tartas.',
                        "<25>{#f/20}* Tengo... curiosidad por saber si me seguirá gustando después de todo esto."
                    ],
                    ['<25>{#p/asriel1}{#f/15}* Sí que paso un tiempo, eh...']
                ][Math.min(asrielinter.piecheck++, 2)]
                : SAVE.data.n.plot < 8
                    ? world.darker
                        ? ["<32>{#p/basic}* Es solo un mostrador."]
                        : ['<32>{#p/basic}* Hay una mancha invisible en forma de un anillo en el mostrador.']
                    : SAVE.data.n.state_wastelands_mash === 1 && SAVE.data.n.plot > 8
                        ? ['<32>{#p/basic}* El fantasma de la tarta destruida persigue el mostrador.']
                        : SAVE.data.n.plot === 72
                            ? SAVE.data.n.state_wastelands_mash > 0
                                ? ['<32>{#p/basic}* No importa cuanto tiempo pase, nada arreglará esta atrocidad.']
                                : SAVE.data.n.state_wastelands_toriel === 2
                                    ? ['<32>{#p/basic}* Tienes la firme convicción de que deberías dejar estar en paz.']
                                    : world.runaway
                                        ? [
                                            '<32>{#p/basic}* Puedes haber sido un bravucón, pero la tarta se quedara intacta.',
                                            '<32>{#p/basic}* Quizás algunas cosas sean muy sagradas, incluso para ti.'
                                        ]
                                        : [
                                            world.meanie
                                                ? '<32>{#p/basic}* La tarta puede tenerte miedo, pero después de todo este tiempo...'
                                                : '<32>{#p/basic}* El tamaño de esta tarta puede que ya no te asuste, pero después de todo este tiempo...',
                                            "<32>{#p/basic}* Has adquirido un respeto por la tarta que no te permite comértelo."
                                        ]
                            : SAVE.data.n.state_wastelands_mash > 0
                                ? ['<32>{#p/basic}* Ya no hay nada más que hacer aquí.']
                                : SAVE.data.n.state_wastelands_toriel === 2
                                    ? ['<32>{#p/basic}* Tienes la firme convicción de que deberías dejar estar en paz.']
                                    : world.meanie
                                        ? [
                                            '<32>{#p/basic}* El tamaño de esta tarta ya no te asusta en absoluto.',
                                            '<32>{#p/basic}* De hecho, puede que la tarta te tenga miedo...',
                                            choicer.create('* (¿Aplastar la tarta?)', 'Sí', 'No')
                                        ]
                                        : ['<32>{#p/basic}* El tamaño de esta tarta te asusta mucho para que te lo comas.'],
        piesmash1: ['<32>{#p/human}* (Decides no aplastarla.)'],
        piesmash2: ['<32>{#p/human}* (Das un giro...)'],
        piesmash3: ["<32>{#p/basic}* Ha sido completamente destruido."],
        tutorial_puzzle1: [
            '<25>{#p/toriel}* A diferencia del puzle anterior, este es un poco diferente.',
            '<25>{#f/1}* ES raro, pero ciertos puzles en la Zona Espacial...'
        ],
        tutorial_puzzle2: [
            '<25>{#p/toriel}* ... requiere la asistencia de otro monstruo.',
            '<25>{#f/1}* ¿Entiendes lo que debes hacer luego?'
        ],
        tutorial_puzzle2a: ['<25>{#p/toriel}{#f/1}* ¿Entiendes lo que debes hacer luego?'],
        tutorial_puzzle3: ['<25>{#p/toriel}* ¡Muy bien, pequeño!\n* Muy bien.'],
        tutorial_puzzle4: ['<25>{#p/toriel}{#f/1}* Tu turno...'],
        tutorial_puzzle4a: ['<25>{#p/toriel}{#f/0}* Es tu turno.'],
        tutorial_puzzle5: ['<25>{#p/toriel}* ¡Bien hecho!\n* Sólo falta una fila.'],
        tutorial_puzzle6: ['<25>{#p/toriel}{#f/1}* ¡Sí, sí!\n* Estoy orgullosa de ti, mi niño...'],
        tutorial_puzzle7: ['<25>{#p/toriel}* Ven cuando estés listo para iniciar tu próxima lección.'],
        tutorial_puzzle8a: ['<25>{#p/toriel}* La respuesta no está conmigo, pequeño.'],
        tutorial_puzzle8b: ['<25>{#p/toriel}* Intenta repetir lo que hiciste antes.'],
        tutorial_puzzle8c: ['<25>{#p/toriel}{#f/1}* Adelante...'],
        twinkly1: [
            "<25>{#p/twinkly}{#f/5}* ¡Buenas!\n* Soy {@fill=#ff0}TWINKLY{@fill=#fff}.\n* ¡{@fill=#ff0}TWINKLY{@fill=#fff} la {@fill=#ff0}ESTRELLA{@fill=#fff}!"
        ],
        twinkly2: [
            '<25>{#f/5}* ¿Qué te trae a la zona espacial, explorador?',
            '<25>{#f/5}* ...',
            "<25>{#f/8}* Estás perdido, ¿verdad?...",
            "<25>{#f/5}* ¡Bueno, menos mal que estoy aquí para ti!",
            "<25>{#f/8}* No he estado en mi mejor forma por un tiempo, pero...",
            '<25>{#f/5}* ... ¡alguien debe enseñarte cómo son las cosas aquí!',
            '<25>{#f/10}* Supongo que el viejo yo deberá hacerlo.',
            "<25>{#f/5}* Empecemos, ¿quieres?"
        ],
        twinkly3: [
            "<25>{#f/7}* Pero tú ya SABÍAS eso, ¿verdad?",
            '<25>{#f/8}* ...',
            "<25>{#f/5}* Aún así, es mi decisión mostrarte.",
            "<25>* Empecemos, ¿quieres?"
        ],
        twinkly4: [
            "<25>{#p/twinkly}{#f/6}* Okay, eso es suficiente.",
            '<25>{#f/8}* Si quieres seguir reiniciando, por todos los medios...',
            '<25>{#f/6}* Haz lo que desees.',
            "<25>{#f/7}* No esperes pasarme tan fácilmente."
        ],
        twinkly5: ["<25>{#p/twinkly}{#f/6}* ¿No tienes nada mejor que hacer?"],
        twinkly6: [
            "<25>{#p/twinkly}{#f/6}* Reiniciando justo después de recibir tu primer golpe, ¿eh?",
            '<25>{#f/7}* Que patetico.'
        ],
        twinkly6a: [
            "<25>{#p/twinkly}{#f/11}* Como si creyeras que yo olvidaría lo que hiciste...",
            '<25>{#f/7}* Sucio esquivador de fragmentos.'
        ],
        twinkly7: ['<25>{#p/twinkly}{#f/7}* Puedo jugar esto todo el día, idiota.'],
        twinkly8: ["<25>{#f/11}* Como sea, ya que sabes lo que vendrá a continuación...{%15}"],
        twinkly9: [
            '<25>{#p/twinkly}{#f/6}* Hola.',
            "<25>* Creo que me lanzaran una bola de fuego si me quedo aquí mucho tiempo.",
            '<25>{#f/8}* Una pena, de verdad...',
            '<25>{#f/7}* Me iba a divertir MUCHO contigo.',
            '<25>{#f/6}* ...',
            '<25>{#f/5}* Bueno, ¡nos vemos!'
        ],
        twinkly9a: [
            '<25>{#p/twinkly}{#f/12}{#v/0}* ¿Qué DIABLOS estás haciendo, $(name)?',
            '<25>{#f/12}{#v/0}* ¡Teníamos la zona espacial en nuestras manos!'
        ],
        twinkly9a1: ['<25>{#f/6}{#v/0}* Todo lo que teníamos que hacer era seguir el plan.'],
        twinkly9a2: [
            '<25>{#f/6}{#v/0}* Todo lo que teníamos que hacer era atravesar la Fábrica...',
            '<25>* Acabar con los guardias...',
            '<25>* ¡Y llegar a la Capital!'
        ],
        twinkly9a3: [
            '<25>{#f/6}{#v/0}* Todo lo que teníamos que hacer era acabar con los guardias...',
            '<25>* ¡Y atravesar la capital!'
        ],
        twinkly9a4: [
            '<25>{#f/6}{#v/0}* Todo lo que teníamos que hacer era MATAR a ese estúpido robot...',
            '<25>* ¡Y atravesar la capital!'
        ],
        twinkly9a5: ['<25>{#f/6}{#v/0}* ¡Todo lo que teníamos que hacer era atravesar la capital!'],
        twinkly9a6: ['<25>{#f/6}{#v/0}* ¡Todo lo que teníamos que hacer era MATAR a esa basura nerd!'],
        twinkly9a7: ['<25>{#f/6}{#v/0}* ¡Todo lo que teníamos que hacer era caminar hacia el final!', '<25>* ¡Estábamos tan cerca!'],
        twinkly9a8: ['<25>{#f/8}{#v/0}* Cobarde...'],
        twinkly9b: [
            '<25>{#p/twinkly}{#f/5}* ¿$(name)...?',
            "<25>{#f/6}* No estoy seguro de lo que acaba de pasar.",
            '<25>{#f/8}* Estábamos en el transbordador, y entonces...',
            '<25>{#f/8}* ...',
            '<25>{#f/6}* Yo...',
            '<25>{#f/8}* Yo me tengo que ir...'
        ],
        twinkly9c: [
            "<25>{#p/twinkly}{#f/7}* Así que volvimos al inicio, ¿verdad?",
            "<26>{#f/5}* Te he estado esperando.\n* Me pregunto cómo lo harás esta vez.",
            "<25>{#f/11}* ¿Quién sabe?\n* Tal vez será más fácil para ti ahora.",
            '<25>{#f/7}* Ciertamente lo fue cuando tenía tus poderes.',
            '<25>{#f/6}* ...',
            '<25>{#f/5}* Bueno, ¡buena suerte!'
        ],
        twinkly10: [
            "<20>{#f/5}¿Ves ese corazón? ¡Esa es tu ALMA, la culminación de tu propio ser!",
            '<20>{#f/5}Tu ALMA es una parte importante de ti, y necesita AMOR para sostenerse por si misma.'
        ],
        twinkly11: [
            "<20>{*}{#x2}{#f/5}Por aquí, el AMOR se comparte con estos {#f/8}pequeños... {#f/11}'fragmentos de alegría.'",
            "<20>{*}{#f/5}Para que comiences por el buen camino, te compartiré un poco de mi propio AMOR.",
            '<20>{*}{#f/5}¡Agarra todas las que puedas!{^20}{*}{#x1}{%}'
        ],
        twinkly12: [
            "<20>{*}{#f/8}Oops, creo que las has perdido...",
            "<20>{*}{#f/5}¡Pero está bien!",
            '<20>{*}{#x2}{#f/10}Aquí, ten unos cuantos más.{^20}{*}{#x1}{%}'
        ],
        twinkly13: [
            '<20>{*}{#f/12}Pero que-... ¿¿eres tonto o algo así??',
            '<20>{*}{#x2}VE. HACIA. LAS. ¡¡¡BALAS!!!{^20}{*}{#x1}{^999}'
        ],
        twinkly14: 'VE. HACIA. LOS. fragmentos alegres~',
        twinkly15: [
            '<20>{#v/1}Je je je...',
            "<20>En este mundo, es MATAR o MORIR.",
            '<20>Imagina, una ALMA como la tuya aterrizando en mi puerta...',
            "<20>¿Realmente pensaste que dejaría pasar una oportunidad de oro?"
        ],
        twinkly16: [
            "<20>{#f/7}Nah, sabes lo que está pasando aquí, ¿verdad?",
            "<20>Sólo querías atormentar al pequeño Twinkly, ¿no es así?",
            "<20>Dios mio... no debes tener ni idea de con quién te estás metiendo.",
            '<20>{#f/11}Je je je...'
        ],
        twinkly17: ["<20>{#v/1}Tendremos que ir directamente al punto, ¿no es así?", '<20>Je je je...'],
        twinkly18: ['<20>{*}{#f/2}{#v/1}{@random=1.1/1.1}MUERE.{^20}{%}'],
        twinkly19: ['<20>{#p/toriel}Qué criatura tan terrible, torturando a un alma tan joven e inocente...'],
        twinkly20: [
            '<20>No tengas miedo, pequeño.',
            '<20>Soy {@fill=#003cff}TORIEL{@fill=#000}, la supervisora de las {@fill=#f00}AFUERAS{@fill=#000}.',
            '<20>Vengo todos los días para ver si alguien quedo tirado aquí.',
            '<20>Sígueme, mi niño.\nHay muchas cosas que quiero enseñarte.'
        ],
        twinkly21: [
            '<25>{#p/toriel}{#f/1}* ¡Oh, Dios mío!\n* ¿De dónde viniste, pequeño?',
            '<25>{#f/1}* ¿Estas herido?',
            '<25>{#f/0}* ...\n* Perdóname por hacerte tantas preguntas.',
            '<25>{#f/0}* Soy {@fill=#003cff}TORIEL{@fill=#fff}, la supervisora de las {@fill=#f00}AFUERAS{@fill=#fff}.',
            '<26>{#f/0}* Vengo todos los días para ver si alguien \n  quedo tirado aquí.',
            '<25>{#f/0}* Sígueme, mi niño.\n* Hay muchas cosas que quiero enseñarte.'
        ],
        twinkly22: ['<25>{#f/0}* Por aquí.'],
        w_coffin0: () => [
            '<32>{#p/human}* (Sientes que sería mejor dejar esto así.)',
            ...(SAVE.data.b.svr ? ['<25>{#p/asriel1}{#f/13}* ...'] : [])
        ],
        w_coffin1: () => [
            '<32>{#p/basic}* Este ataúd es muy antiguo.\n* No tiene nada interesante.',
            ...(world.goatbro && SAVE.flag.n.ga_asrielCoffin++ < 1
                ? [
                    '<25>{#p/asriel2}{#f/13}* Oh, mira eso.\n* Hicieron uno sólo para ti, $(name).',
                    '<25>{#p/asriel2}{#f/5}* Qué conmovedor.'
                ]
                : [])
        ],
        w_coffin2: pager.create(
            0,
            () => [
                '<32>{#p/basic}* Este ataúd es de diciembre de 251X.',
                '<32>* Hay un antiguo manifiesto de registro escondido junto a él...',
                choicer.create('* (¿Acceder al manifiesto?)', 'Sí', 'No')
            ],
            () => [
                '<32>{#p/human}* (Vuelve a recoger el manifiesto.)',
                choicer.create('* (¿Acceder al manifiesto?)', 'Sí', 'No')
            ]
        ),
        w_coffin3: () => [choicer.create('* (¿Leer la siguiente página?)', 'Sí', 'No')],
        w_coffin4: ['<32>{#p/human}* (Pero no habían más páginas que leer.)'],
        w_coffin5: ['<32>{#p/human}* (Pones el manifiesto donde pertenece.)'],
        w_dummy1: () =>
            SAVE.data.b.svr
                ? ['<32>{#p/human}* (Pones tus manos sobre el maniquí.)\n* (Parece muy desgastado.)']
                : ['<32>{#p/basic}* Un maniquí de entrenamiento, de 251X.\n* Maniquí de serie de la capital.'],
        wonder1: [
            '<32>{#p/basic}* ¿Puedes oír eso?\n* ¿La canción de las estrellas?',
            "<32>* En ciertos lugares de la zona espacial, como este... está ahí.",
            '<32>* Sólo tienes que estar escuchando.',
            '<32>* Muy genial, ¿verdad?'
        ]
    },

    b_group_outlands: {
        froggitWhimsun: ['<32>{#p/story}* ¡Ranas espaciales y Estelomoscas!\n* O algo parecido.'],
        froggitWhimsun2a: ['<32>{#p/story}* ¿Ranas espaciales...?'],
        froggitWhimsun2b: ['<32>{#p/story}* ¿Estelomoscas...?'],
        looxMigospWhimsun: ["<32>{#p/story}* ¡Es el trío problemático!"],
        looxMigospWhimsun2: ['<32>{#p/story}* El trío se volvió un dúo.'],
        looxMigospWhimsun3: ['<32>{#p/story}* Solo queda uno.'],
        moldsmalMigosp: ['<32>{#p/story}* ¡Silente y compañía se presentan!']
    },

    b_opponent_froggit: {
        act_check: ['<32>{#p/story}* FROGGIT - ATQ 4 DEF 5\n* La vida es difícil para este monstruo.'],
        act_check2: ['<32>{#p/story}* FROGGIT - ATQ 4 DEF 5\n* La vida está mejorando para este monstruo.'],
        act_check3: ["<32>{#p/story}* FROGGIT - ATQ 4 DEF 5\n* La vida no parece ser fácil para este monstruo."],
        act_check4: ['<32>{#p/story}* FROGGIT - ATQ 4 DEF 5\n* La vida es muy confusa para este monstruo.'],
        act_check5: ['<32>{#p/story}* FROGGIT - ATQ 4 DEF 5\n* La vida parece ser muy amorosa para este monstruo.'],
        act_threat: [
            '<32>{#p/human}* (Amenazas a Froggit.)',
            "<32>{#p/basic}* Froggit no entiende lo que dijiste..."
        ],
        act_threat2: [
            '<32>{#p/human}* (Amenazas a Froggit otra vez.)',
            "<32>{#p/basic}* Froggit entiende la amenaza anterior y decide que es hora de huir."
        ],
        act_compliment: [
            '<32>{#p/human}* (Halagas a Froggit.)',
            "<32>{#p/basic}* Froggit no entiende lo que dijiste..."
        ],
        act_flirt: [
            '<32>{#p/human}* (Coqueteas con Froggit.)',
            "<32>{#p/basic}* Froggit no entiende lo que dijiste..."
        ],
        act_translate0: ["<32>{#p/human}* (Pero no has dicho nada para traducir aún.)"],
        act_translate1: [
            '<32>{#p/human}* (Traduces lo que dijiste.)\n* (Froggit parece entenderte ahora.)',
            '<32>{#p/basic}* Froggit esta halagado.'
        ],
        act_translate1x: [
            '<32>{#p/human}* (Traduces lo que dijiste.)\n* (Froggit parece entenderte ahora.)',
            '<32>{#p/basic}* Froggit esta dudando si continuar la pelea.'
        ],
        act_translate1y: [
            '<32>{#p/human}* (Traduces lo que dijiste.)\n* (Froggit parece entenderte ahora.)',
            '<32>* ¡Completamente amenazado, Froggit huye!'
        ],
        act_translate1z: [
            '<32>{#p/human}* (Traduces lo que dijiste.)\n* (Froggit parece entenderte ahora.)',
            '<32>{#p/basic}* Froggit no muestra miedo alguno.'
        ],
        act_translate2: [
            '<32>{#p/human}* (Traduces lo que dijiste.)\n* (Froggit parece entenderte ahora.)',
            '<32>{#p/basic}* Froggit se sonroja, aunque sólo sea interno.'
        ],
        confuseText: ['<08>{#p/basic}{~}¿Ribbit, ribbit?'],
        flirtText: ['<08>{#p/basic}{~}(Se sonroja profun-\ndamente.)\nRibbit..'],
        idleText1: ['<08>{#p/basic}{~}Ribbit, ribbit.'],
        idleText2: ['<08>{#p/basic}{~}Croac, croac.'],
        idleText3: ['<08>{#p/basic}{~}Salta, salta.'],
        idleText4: ['<08>{#p/basic}{~}Miau.'],
        mercyStatus: ['<32>{#p/story}* Froggit parece hostil peleandote.'],
        name: '* Froggit',
        meanText: ['<08>{#p/basic}{~}(Tiembla, sacude.)\nRibbit..'],
        niceText: ['<08>{#p/basic}{~}(Se sonroja suavemente.)\nRibbit..'],
        perilStatus: ['<32>{#p/story}* Froggit está tratando de huir.'],
        status1: ['<32>{#p/story}* ¡Froggit se acerca!'],
        status2: ['<32>{#p/story}* El campo de batalla está lleno con el aroma del crystherium utilia.'],
        status3: ["<32>{#p/story}* Parece que Froggit no sabe por qué está aquí."],
        status4: ['<32>{#p/story}* Froggit salta de un lado a otro.']
    },
    b_opponent_whimsun: {
        act_check: ['<32>{#p/story}* FLUTTERLYTE - ATQ 5 DEF 0\n* Este monstruo apenas aprendió a volar...'],
        act_check2: ['<32>{#p/story}* FLUTTERLYTE - ATQ 5 DEF 0\n* Este monstruo desea haberse quedado en el suelo.'],
        act_console: [
            '<32>{#p/human}* (Ayudas a Flutterlyte a volar más alto.)',
            '<32>{#p/basic}* Flutterlyte te da las gracias, y se va volando...'
        ],
        act_flirt: [
            '<32>{#p/human}* (Coqueteas con Flutterlyte.)',
            '<32>{#p/basic}* Incapaz de aceptar tu cumplido, Flutterlyte se va volando llorando....'
        ],
        act_terrorize: [
            '<32>{#p/human}* (Lloras lamentándote y rechinas tus dientes.)',
            '<32>{#p/basic}* Flutterlyte paniquea y vuela lejos...'
        ],
        idleTalk1: ['<08>{#p/basic}{~}Por qué esto es tán difícil..'],
        idleTalk2: ['<08>{#p/basic}{~}Por favor ayú-\ndame...'],
        idleTalk3: ["<08>{#p/basic}{~}Estoy asustado..."],
        idleTalk4: ["<08>{#p/basic}{~}No puedo hacer esto..."],
        idleTalk5: ['<08>{#p/basic}{~}\x00*llora llora*'],
        name: '* Flutterlyte',
        perilStatus: ['<32>{#p/story}* Flutterlyte apenas se mantiene en el aire.'],
        status1: ['<32>{#p/story}* ¡Flutterlyte aparece frente a ti!'],
        status2: ['<32>{#p/story}* Flutterlyte sigue murmurando disculpas.'],
        status3: ['<32>{#p/story}* Flutterlyte flota dócilmente.'],
        status4: ['<32>{#p/story}* El olor de melocotones frescos aparecen en el aire.'],
        status5: ['<32>{#p/story}* Flutterlyte se está hiperventilando.'],
        status6: ['<32>{#p/story}* Flutterlyte evita el contacto visual.']
    },
    b_opponent_loox: {
        act_check: ['<32>{#p/story}* OCULOUX - ATQ 6 DEF 6\n* Maestro del concurso de miradas.\n* Su apellido es: Eyewalker'],
        act_check2: [
            "<32>{#p/story}* OCULOUX - ATQ 6 DEF 6\n* Este bravucón se esfuerza mucho por fingir que no se siente halagado."
        ],
        act_check3: ['<32>{#p/story}* OCULOUX - ATQ 6 DEF 6\n* Este monstruo esta honrado de estar en tu línea de visión.'],
        act_dontpick: [
            '<32>{#p/human}* (Miras fijamente a Oculoux.)\n* (Oculoux te devuelve la mirada con más fuerza.)',
            "<32>{#p/human}* (El ojo de Oculoux se va esforzando cada vez más, y eventualmente...)",
            '<32>{#p/human}* (... Oculoux se inclina.)'
        ],
        act_flirt: ['<32>{#p/human}* (Coqueteas con Oculoux.)'],
        act_pick: ['<32>{#p/human}* (Sermoneas groseramente a Oculoux sobre mirar fijamente a la gente.)'],
        checkTalk1: ['<08>{#p/basic}{~}¿Te atreves a mirarme?'],
        dontDeny1: ['<08>{#p/basic}{~}Mira quién cambió de opinión.'],
        dontTalk1: ['<99>{#p/basic}{~}La mirada\nes\nfuerte\ncon\neste.'],
        flirtDeny1: ['<08>{#p/basic}{~}Qué tsundere eres.'],
        flirtTalk1: ['<08>{#p/basic}{~}¿Qué? ¡D-de ninguna manera!'],
        hurtStatus: ['<32>{#p/story}* Oculoux esta lagrimeando.'],
        idleTalk1: ["<08>{#p/basic}{~}Tengo mis ojos en ti."],
        idleTalk2: ["<08>{#p/basic}{~}No me digas que hacer."],
        idleTalk3: ['<08>{#p/basic}{~}Mirar es preocuparse.'],
        idleTalk4: ['<08>{#p/basic}{~}Que gusano.'],
        idleTalk5: ['<08>{#p/basic}{~}¿Qué tal un concurso de miradas?'],
        name: '* Oculoux',
        pickTalk1: ['<08>{#p/basic}{~}¡Cómo te atreves a cuestionar nuestro modo de vida!'],
        spareStatus: ["<32>{#p/story}* A Oculoux ya no le interesa luchar."],
        status1: ['<32>{#p/story}* ¡Un par de Oculoux aparecieron!'],
        status2: ['<32>{#p/story}* Oculoux te está mirando fijamente.'],
        status3: ['<32>{#p/story}* Oculoux rechina sus dientes.'],
        status4: ['<32>{#p/story}* Huele como a gotas para los ojos.'],
        status5: ['<32>{#p/story}* Oculoux se ha enrojecido.'],
        status6: ['<32>{#p/story}* Oculoux te mira fijamente.'],
        status7: ['<32>{#p/story}* Oculoux ahora esta solo.']
    },
    b_opponent_migosp: {
        act_check: ["<32>{#p/story}* SILENTE - ATQ 7 DEF 5\n* Parece malvado, pero solo lo es con la gente equivocada..."],
        act_check2: ['<33>{#p/story}* SILENTE - ATQ 7 DEF 5\n* Ahora solo, se expresa felizmente con la danza.'],
        act_check3: ['<32>{#p/story}* SILENTE - ATQ 7 DEF 5\n* Parece cómodo contigo.\n* Muy cómodo.'],
        act_check4: ["<32>{#p/story}* SILENTE - ATQ 7 DEF 5\n* A pesar de su rudeza, está claro que esta sufriendo..."],
        act_flirt: ['<32>{#p/human}* (Coqueteas con Silente.)'],
        flirtTalk: ['<08>{#p/basic}{~}Hola~'],
        groupInsult: ["<32>{#p/human}* (Intentas insultar a Silente, pero esta demasiado ocupado en los demás.)"],
        groupStatus1: ['<32>{#p/story}* Silente está susurrando a los otros.'],
        groupStatus2: ["<32>{#p/story}* Empieza a oler como un motel de cucarachas."],
        groupTalk1: ['<08>{#p/basic}ASQUEROSO CUIDADOR\n..'],
        groupTalk2: ['<08>{#p/basic}OBEDECE A LA SUPERMENTE\n..'],
        groupTalk3: ['<08>{#p/basic}¡LA LEGIÓN! ¡SOMOS LA LEGIÓN!'],
        groupTalk4: ['<08>{#p/basic}ESCUCHA A EL ENJAMBRE\n..'],
        groupTalk5: ['<08>{#p/basic}EN LA UNIÓN, AHORA\n..'],
        groupTalk6: ["<08>{#p/basic}NO ME IMPORTA."],
        name: '* Silente',
        perilStatus: ['<32>{#p/story}* Silente se rehúsa a rendirse.'],
        soloInsult: ["<32>{#p/human}* (Intentas insultar a Silente, pero esta muy feliz para importarle.)"],
        soloStatus: ["<32>{#p/story}* A Silente no le importa nada el cosmos."],
        soloTalk1: ["<08>{#p/basic}{~}¡Ser yo es lo mejor!"],
        soloTalk2: ['<08>{#p/basic}{~}La la~ Solo se tu mismo~'],
        soloTalk3: ["<08>{#p/basic}{~}¡Nada como estar solo!"],
        soloTalk4: ['<08>{#p/basic}{~}Mmm, ¡cha cha cha!'],
        soloTalk5: ['<08>{#p/basic}{~}Mueve tus brazos, cariño~']
    },
    b_opponent_mushy: {
        act_challenge: [
            '<32>{#p/human}* (Desafías a Mushy a un duelo.)',
            "<33>{#p/story}* ¡La VELOCIDAD de Mushy aumentó por este turno!"
        ],
        act_check: ['<32>{#p/story}* MUSHY - ATQ 6 DEF 6\n* Gran fan de los vaqueros esp..\n* Pistolero.'],
        act_check2: ['<32>{#p/story}* MUSHY - ATQ 6 DEF 6\n* Es un gran fan de los vaqueros espaciales..\n* Incluso los más sexys.'],
        act_check3: ['<32>{#p/story}* MUSHY - ATQ 6 DEF 6\n* Después de que lo dieras todo, este pistolero está impresionado.'],
        act_flirt: ['<32>{#p/human}* (Coqueteas con Mushy.)'],
        act_taunt: ['<32>{#p/human}* (Te burlas de Mushy.)'],
        challengeStatus: ['<32>{#p/story}* Mushy espera tu siguiente desafío.'],
        challengeTalk1: ["<08>{#p/basic}{~}Veamos lo que tienes."],
        challengeTalk2: ['<08>{#p/basic}{~}¿Crees que puedes conmigo?'],
        flirtStatus1: ['<32>{#p/story}* Mushy, el confuso y el emocionado.'],
        flirtTalk1: ['<08>{#p/basic}{~}O-oye, ¡ya basta!'],
        hurtStatus: ['<32>{#p/story}* Mushy hace un último esfuerzo.'],
        idleTalk1: ['<08>{#p/basic}{~}¡Bang!\n¡Bang!\n¡Bang!'],
        idleTalk2: ['<08>{#p/basic}{~}¡En marcha!'],
        idleTalk3: ["<08>{#p/basic}{~}Todo en un día."],
        name: '* Mushy',
        spareStatus: ['<32>{#p/story}* Mushy se inclina en señal de respeto.'],
        status1: ['<32>{#p/story}* ¡Mushy te irrumpe!'],
        status2: ['<32>{#p/story}* Mushy ajusta su posición.'],
        status3: ['<32>{#p/story}* Mushy se está preparando para un gran enfrentamiento.'],
        status4: ['<32>{#p/story}* Mushy recoge su funda.'],
        status5: ['<32>{#p/story}* Huele como a petrichor.'],
        tauntStatus1: ["<32>{#p/story}* Mushy finge que no te molestan tus burlas."],
        tauntTalk1: ["<08>{#p/basic}{~}Como si eso funcionara conmigo."]
    },
    b_opponent_napstablook: {
        act_check: ["<32>{#p/story}* NAPSTABLOOK - ATQ 10 DEF 255\n* Es Napstablook."],
        act_check2: [
            "<32>{#p/story}* NAPSTABLOOK - ATQ 10 DEF 255\n* Parece que ya no quiere estar aquí."
        ],
        act_check3: ['<32>{#p/story}* NAPSTABLOOK - ATQ 10 DEF 255\n* Tiene esperanza por primera vez en mucho tiempo...'],
        act_check4: ['<32>{#p/story}* NAPSTABLOOK - ATQ 10 DEF 255\n* La tensión romántica esta en lo máximo.'],
        awkwardTalk: ['<11>{#p/napstablook}{~}eh...', '<11>{#p/napstablook}{~}está bien, ¿supongo...?'],
        checkTalk: ["<11>{#p/napstablook}{~}Ese soy yo..."],
        cheer0: ['<32>{#p/human}* (Tratas de consolar a Napstablook.)'],
        cheer1: ['<32>{#p/human}* (Le das a Napstablook una sonrisa pequeña.)'],
        cheer2: ['<32>{#p/human}* (Le cuentas un pequeño chiste a Napstablook.)'],
        cheer3: ["<32>{#p/human}* (Muestras adoración por el sombrero de Napstablook.)"],
        cheerTalk1: ['<11>{#p/napstablook}{~}¿...?'],
        cheerTalk2: ['<11>{#p/napstablook}{~}Je je...'],
        cheerTalk3: [
            '<11>{*}{#p/napstablook}{~}déjame {#x1}intentar...{^20}{#x2}{^20}{%}',
            "<11>{*}{#p/napstablook}{~}lo llamo {#x3}'apuesto blook'{^40}{%}",
            '<11>{*}{#p/napstablook}{~}¿te gusta?{^40}{%}'
        ],
        cheerTalk4: ['<11>{#p/napstablook}{~}oh vaya.....'],
        consoleTalk1: ['<11>{#p/napstablook}{~}claro, claro...'],
        consoleTalk2: ['<11>{#p/napstablook}{~}no me lo creo...'],
        consoleTalk3: ["<11>{#p/napstablook}{~}no te arrepientes..."],
        deadTalk: [
            "<11>{#p/napstablook}{~}emm... sabes que no puedes matar fantasmas, verdad...",
            "<11>{~}somos un tanto incorpóreos y eso",
            "<11>{~}sólo bajaba mis ps para no parecer maleducado",
            '<11>{~}lo siento... creo que lo he hecho más incomodo...',
            '<11>{~}pretende que me has vencido...',
            '<11>{~}ooooooooo'
        ],
        flirt1: ['<32>{#p/human}* (Coqueteas con Napstablook.)'],
        flirt2: ['<32>{#p/human}* (Dices tu mejor frase para ligar con Napstablook.)'],
        flirt3: ['<32>{#p/human}* (Le dices un cumplido sincero a Napstablook.)'],
        flirt4: ['<32>{#p/human}* (Tranquilizas a Napstablook sobre tus sentimientos.)'],
        flirtTalk1: ["<11>{#p/napstablook}{~}solo te seria un peso más"],
        flirtTalk2: ["<11>{#p/napstablook}{~}oh.....\nya había escuchado ese....."],
        flirtTalk3: ['<11>{#p/napstablook}{~}eh... de verdad lo crees?'],
        flirtTalk4: ["<11>{#p/napstablook}{~}oh, es en serio...", '<11>{~}oh no.....'],
        idleTalk1: ["<11>{#p/napstablook}{~}estoy bien, gracias"],
        idleTalk2: ['<11>{#p/napstablook}{~}sólo sigue adelante...'],
        idleTalk3: ['<11>{#p/napstablook}{~}sólo hago lo mío...'],
        insultTalk1: ['<11>{#p/napstablook}{~}lo sabía...'],
        insultTalk2: ['<11>{#p/napstablook}{~}como sea...'],
        insultTalk3: ['<11>{#p/napstablook}{~}di lo que quieras...'],
        insultTalk4: ['<11>{#p/napstablook}{~}desahógate...'],
        name: '* Napstablook',
        silentTalk: ['<11>{#p/napstablook}{~}...'],
        sincere: ["<32>{#p/human}* (Comentas coquetamente el sombrero de Napstablook.)"],
        sincereTalk: ['<11>{#p/napstablook}{~}Je... gracias'],
        status1: ['<32>{#p/story}* Aquí viene Napstablook.'],
        status2: ['<32>{#p/story}* Napstablook se siente un poco mejor.'],
        status3: ['<32>{#p/story}* Napstablook te quiere mostrar algo.'],
        status3a: ['<32>{#p/story}* Napstablook espera tu respuesta.'],
        status4: ["<32>{#p/story}* Los ojos de Napstablook brillan."],
        status5: ['<32>{#p/story}* Napstablook no está seguro de cómo manejar esto.'],
        status5a: ['<32>{#p/story}* Napstablook está cuestionando su vida.'],
        status6: ['<32>{#p/story}* Napstablook espera su momento.'],
        status7: ['<32>{#p/story}* Napstablook espera tu próximo movimiento.'],
        status8: ['<32>{#p/story}* Napstablook está mirando a lo lejos.'],
        status9: ["<32>{#p/story}* Napstablook está deseando no estar aquí."],
        status10: ['<32>{#p/story}* Napstablook hace todo lo posible para ignorarte.'],
        suck: ['<32>{#p/human}* (Le dices a Napstablook que su sombrero apesta.)'],
        threat: ['<32>{#p/human}* (Amenazas a Napstablook.)']
    },
    b_opponent_toriel: {
        spannerText: ['<32>{#p/human}* (Lanzas la Llave.)\n* (Toriel la recoge y te la devuelve.)'],
        spannerTalk: ['<11>{#p/toriel}{#f/22}Eso no logrará nada, mi niño.'],
        spannerTalkRepeat: ['<11>{#p/toriel}{#f/22}...'],
        act_check: ['<32>{#p/story}* TORIEL - ATQ 80 DEF 80\n* Sabe que es lo mejor para ti.'],
        act_check2: ['<32>{#p/story}* TORIEL - ATQ 80 DEF 80\n* Parece que se está conteniendo.'],
        act_check3: ['<32>{#p/story}* TORIEL - ATQ 80 DEF 80\n* Se ve pre-ocupada.'],
        act_check4: ['<32>{#p/story}* TORIEL - ATQ 80 DEF 80\n* Solo quiere lo mejor para ti.'],
        act_check5: ['<32>{#p/story}* TORIEL - ATQ 80 DEF 80\n* Piensa que eres \"adorable.\"'],
        precrime: ['<20>{#p/asriel2}...'],
        criminal1: (reveal: boolean) => [
            '<20>{#p/asriel2}{#f/3}Hola, $(name).',
            "<20>{#f/1}Es bueno estar de vuelta.",
            "<20>{#f/2}¿Qué pasa?\n¿No esperabas volver a verme?",
            '<20>{#f/13}...\nOh, $(name)...',
            ...(reveal
                ? ["<20>{#f/1}Espere esto por un largo tiempo."]
                : [
                    "<20>{#f/15}Estuve atrapado dentro de una estrella tanto tiempo, Yo...",
                    '<20>{#f/15}...',
                    "<20>{#f/16}Bueno, eso no es importante ahora.",
                    '<20>{#f/1}Lo que importa es que las cosas vuelvan a ser como debían ser.'
                ]),
            '<20>{#f/1}Je je je...',
            "<20>{#f/2}Sé que estás vacío por dentro, como yo.",
            "<20>{#f/5}Seguimos siendo inseparables después de todos estos años...",
            "<20>{#f/1}Escucha.\nTengo un plan que nos acercará más que nunca.",
            '<20>{#f/1}Nosotros, y nuestras ALMAS robadas...',
            "<20>{#f/1}Destruyamos todo en esta miserable Zona Espacial.",
            '<21>{#f/2}Cualquiera que se atreva a interponerse en nuestro futuro perfecto...',
            "<20>{#f/1}Convirtamos a todos en polvo."
        ],
        criminal2: ['<20>{#p/asriel2}{#f/3}Bienvenido de vuelta, $(name).', '<20>{#f/1}¿Listo para continuar donde lo habíamos dejado?'],
        criminal3: ['<20>{#p/asriel2}{#f/3}Bien entonces.', '<20>{#f/3}...', "<20>{#f/4}Vámonos."],
        cutscene1: [
            "<32>{#p/basic}* Quizás sea porque es la única manera en que tú escucharías.",
            '<25>{#p/toriel}{#f/16}* ¿¡...!?',
            "<32>{#p/basic}* Pero qué sé yo, ¿eh?\n* Sólo soy un dulce e inocente niño."
        ],
        cutscene2: [
            '<25>{#p/toriel}{#f/3}* ...',
            '<25>{#p/toriel}{#f/4}* Esto es imposible...',
            '<25>{#f/0}* Debo estar soñando.\n* O alucinando.\n* O tal vez...',
            '<32>{#p/basic}* No.',
            '<32>{#p/basic}* Esto es real.',
            '<25>{#p/toriel}{#f/5}* Pero tú moriste, $(name).',
            '<25>{#f/5}* Es imposible que me estés hablando a mí.',
            "<32>{#p/basic}* Finge que es un sueño, entonces.",
            '<32>{#p/basic}* Si eso funciona para ti.',
            '<25>{#p/toriel}{#f/5}* ...',
            '<25>{#p/toriel}{#f/9}* ¿Qué es lo que quieres?',
            '<32>{#p/basic}* Toriel...',
            "<32>{#p/basic}* Sabes lo que pienso de la humanidad, ¿verdad?",
            '<25>{#p/toriel}{#f/13}* Cierto.',
            '<32>{#p/basic}* Incorrecto.',
            '<32>{#p/basic}* ... no sobre este humano.',
            "<32>* Desde que llegó, yo he estado siguiendo sus acciones...",
            "<32>* Y ahora me pide que me ponga en contacto contigo.",
            '<32>* ¿Qué crees que quiere decir?',
            '<25>{#p/toriel}{#f/13}* ...',
            '<32>{#p/basic}* Significa que tienes que dejar que se vaya.',
            '<25>{#p/toriel}{#f/12}* ... ¿no entiende lo que está en juego?',
            '<25>{#f/11}* Si dejo que se vaya, seguramente morira.',
            '<32>{#p/basic}* ... vamos.',
            "<32>{#p/basic}* Eso no es realmente el por qué lo haces, ¿o sí?",
            '<25>{#p/toriel}{#f/12}* Con esa actitud, quizás de verdad eres $(name).',
            '<25>{#p/toriel}{#f/11}* Siempre cuestionaste mi autoridad.',
            '<32>{#p/basic}* Creo que tengo todo derecho de hacerlo.',
            '<32>{#p/basic}* Deseas dejarle aquí porque tienes miedo de lo que hay fuera de Las Afueras.',
            "<33>{#p/basic}* Pero las cosas ya no son iguales que hace cien años.",
            "<33>{#p/basic}* Solo eres ignorante sobre eso porque tienes miedo de verlo por tu cuenta.",
            '<25>{#p/toriel}{#f/13}* ...',
            "<25>{#p/toriel}{#f/13}* ... pero si le dejo ir, no seré capaz de...",
            '<32>{#p/basic}* ¿Acompañarles?',
            '<32>{#p/basic}* Oye, conozco esa sensación.',
            '<32>{#p/basic}* Pero dejarle aquí sería condenarle a muerte de todas formas.',
            "<32>{#p/basic}* ¿Qué es la vida si no tienes nada para lo que valga la pena vivir?",
            '<25>{#p/toriel}{#f/13}* ...',
            '<25>{#p/toriel}{#f/13}* $(name), Yo...',
            '<32>{#p/basic}* Le diste un teléfono de sobra, ¿recuerdas?',
            "<32>{#p/basic}* Deja la línea abierta, y quizás te llamará.",
            '<25>{#p/toriel}{#f/9}* ... ¿y qué hay de ti?',
            "<32>{#p/basic}* Mira.\n* Estaré bien.",
            "<32>{#p/basic}* Todo lo que quiero es que no te olvides de ÉL cuando se vaya.",
            '<25>{#p/toriel}{#f/13}* ...',
            '<32>{#p/basic}* Adiós, Toriel.',
            '<25>{#p/toriel}{#f/14}* ... adiós, $(name).'
        ],
        death1: [
            '<11>{#p/toriel}{#f/21}{#v/1}{#i/3}{#x1}{@random=1.1/1.1}Agh...',
            '<11>{#v/1}{#i/3}{#x1}{@random=1.1/1.1}Atacarme en mí momento más débil...',
            '<11>{#v/1}{#i/3}{#x1}{@random=1.1/1.1}...',
            '<11>{#v/2}{#i/4}{#x2}{@random=1.1/1.1}Ja...\nJa...',
            '<11>{#v/2}{#i/4}{#x2}{@random=1.1/1.1}Al parecer, pequeño...',
            '<11>{#v/3}{#i/5}{#x2}{@random=1.2/1.2}Fui inocente por confiar en tí... todo este tiempo...'
        ],
        death2: [
            '<11>{#p/toriel}{#f/21}{#v/1}{#i/3}{#x1}{@random=1.1/1.1}Agh...',
            '<11>{#v/1}{#i/3}{#x3}{@random=1.1/1.1}El pensar que yo te protegía de ellos...',
            '<11>{#v/1}{#i/3}{#x4}{@random=1.1/1.1}...',
            '<11>{#v/2}{#i/4}{#x2}{@random=1.1/1.1}Ja...\nJa...',
            '<11>{#v/2}{#i/4}{#x1}{@random=1.1/1.1}Al parecer, pequeño...',
            '<11>{#v/3}{#i/5}{#x2}{@random=1.2/1.2}En realidad los protegía a ellos... de ti...'
        ],
        death3: [
            '<11>{#p/toriel}{#f/21}{#v/1}{#i/3}{#x1}{@random=1.1/1.1}Agh...',
            '<11>{#v/1}{#i/3}{#x1}{@random=1.1/1.1}Eres más fuerte de lo que pensaba...',
            '<11>{#v/1}{#i/3}{#x3}{@random=1.1/1.1}Escuchame, pequeño...',
            '<11>{#v/1}{#i/3}{#x3}{@random=1.1/1.1}En unos momentos, me convertiré en polvo...',
            '<11>{#v/1}{#i/3}{#x3}{@random=1.1/1.1}Cuando eso pase, deberás tomar mi ALMA...',
            '<11>{#v/1}{#i/3}{#x1}{@random=1.1/1.1}Es la única verdadera forma de escapar de aquí.',
            "<11>{#v/2}{#i/4}{#x3}{@random=1.1/1.1}No puedes... permitir que el plan de ASGORE... tenga éxito...",
            '<11>{#v/2}{#i/4}{#x1}{@random=1.1/1.1}...',
            '<11>{#v/3}{#i/5}{#x2}{@random=1.2/1.2}Mi niño...',
            "<11>{#v/3}{#i/5}{#x4}{@random=1.2/1.2}Pórtate bien... ¿esta bien?"
        ],
        magic1: ['<20>{#p/asriel2}{#f/3}Sígueme.'],
        name: '* Toriel',
        spareTalk1: ['<11>{#p/toriel}{#f/11}...'],
        spareTalk2: ['<11>{#p/toriel}{#f/11}...\n...'],
        spareTalk3: ['<11>{#p/toriel}{#f/11}...\n...\n...'],
        spareTalk4: ['<11>{#p/toriel}{#f/17}¿...?'],
        spareTalk5: ['<11>{#p/toriel}{#f/17}¿Qué estas haciendo?'],
        spareTalk6: ['<11>{#p/toriel}{#f/17}...'],
        spareTalk7: ['<11>{#p/toriel}{#f/17}¿Qué tratas de demostrar?'],
        spareTalk8: ['<11>{#p/toriel}{#f/17}...'],
        spareTalk9: ['<11>{#p/toriel}{#f/12}¡Pelea o huye!'],
        spareTalk10: ['<11>{#p/toriel}{#f/12}¡Deja de mirarme así!'],
        spareTalk11: ['<11>{#p/toriel}{#f/12}¡Vete!'],
        spareTalk12: ['<11>{#p/toriel}{#f/13}...'],
        spareTalk13: ['<11>{#p/toriel}{#f/13}...\n...'],
        spareTalk14: ['<11>{#p/toriel}{#f/13}...\n...\n...'],
        spareTalk15: [
            '<11>{#p/toriel}{#f/13}Sé que quieres ir a casa...',
            '<11>{#p/toriel}{#f/9}Pero el camino para llegar hasta allí es peligroso.'
        ],
        spareTalk16: ['<11>{#p/toriel}{#f/14}Así que por favor... regresa de donde viniste.'],
        spareTalk17: [
            '<11>{#p/toriel}{#f/13}Sé que no tenemos mucho...',
            '<11>{#p/toriel}{#f/10}Pero aún podríamos tener una buena vida.'
        ],
        spareTalk18: [
            '<11>{#p/toriel}{#f/13}Tú y yo, como una familia...',
            '<11>{#p/toriel}{#f/10}¿No te parece bien?'
        ],
        spareTalk19: ['<11>{#p/toriel}{#f/21}...'],
        spareTalk20: ['<11>{#p/toriel}{#f/18}¿Por qué haces esto tan difícil?'],
        spareTalk21: ['<11>{#p/toriel}{#f/21}...'],
        spareTalk22: ['<11>{#p/toriel}{#f/18}Por favor, solo...', '<11>{#p/toriel}{#f/9}Vuelve por el otro lado.'],
        spareTalk23: ['<11>{#p/toriel}{#f/21}...'],
        spareTalk24: ['<11>{#p/toriel}{#f/18}Oh, mi niño...'],
        spareTalk28b: [
            '<11>{#p/toriel}{#f/9}Tal vez fue una tontería de mi parte...',
            '<11>{#f/13}Intentando detenerte así...',
            '<11>{#f/9}Tal vez debí haberte dejado ir.'
        ],
        spareTalk28c: ['<11>{#p/toriel}{#f/17}¿...?', '<11>{#f/17}¿Por qué estás llamando a \"$(name)?\"'],
        status1: ['<32>{#p/story}* Toriel ahora está frente a ti.'],
        status2: ['<32>{#p/story}* Toriel prepara un ataque mágico.'],
        status3: ['<32>{#p/story}* Toriel actúa de forma distante.'],
        status4: ['<32>{#p/story}* Toriel mira a través de ti.'],
        status5: ['<32>{#p/story}* ...'],
        assistStatus: ['<32>{#p/basic}* Debe haber otra manera...'],
        talk1: ['<32>{#p/human}* (Le pides a Toriel que te deje pasar.)\n* (No hay efecto.)'],
        talk2: ["<32>{#p/human}* (Le preguntas a Toriel por qué hace esto.)\n* (Hace una breve mueca.)"],
        talk3: ['<32>{#p/human}* (Le pediste a Toriel que parara.)\n* (Ella duda.)'],
        talk4: [
            '<32>{#p/human}* (Una vez más le rogaste a Toriel que se detuviera.)',
            '<32>{#p/basic}* ... quizás haya demasiado en juego para ella.'
        ],
        talk5: ['<32>{#p/human}* (Le gritas a Toriel.)\n* (Ella cierra los ojos y respira hondo.)'],
        talk6: [
            '<32>{#p/human}* (Vuelves a gritarle a Toriel.)',
            "<32>{#p/basic}* ... quizás hablar ya no sirva de nada."
        ],
        talk7: ["<32>{#p/human}* (Pero no se te ocurre nada más que decir.)"],
        talk8: ['<32>{#p/human}* (Pero no tenía sentido hacer eso ahora.)'],
        theft: ['<20>{*}{#p/twinkly}Mio.{^15}{%}']
    },

    c_name_outlands: {
        hello: 'Decir Hola',
        about: 'Sobre ti',
        mom: 'Llamarla \"Mamá\"',
        flirt: 'Coquetear',
        toriel: "Telf. de Toriel",
        puzzle: 'Ayuda Puzle',
        insult: 'Insultar'
    },

    c_call_outlands: {
        about1: [
            '<25>{#p/toriel}{#f/1}* ¿Quieres saber más sobre mí...?',
            '<25>{#f/0}* Bueno, me temo que no hay mucho que decir.',
            '<25>{#f/0}* ¡Sólo soy una señora tontorrona que se preocupa demasiado!'
        ],
        about2: [
            '<25>{#p/toriel}{#f/1}* Si de verdad quieres saber más sobre mí...',
            '<25>{#f/1}* ¿Por qué no echas un vistazo...?',
            '<25>{#f/0}* He construido o al menos he ayudado a gran parte de lo que ves.'
        ],
        about3: [
            '<25>{#p/toriel}{#f/1}* Si de verdad quieres saber más sobre mí...',
            '<25>{#f/2}* ¡Deberías pensar dos veces antes de insultarme por teléfono!'
        ],
        flirt1: [
            '<25>{#p/toriel}{#f/7}* ... ¿eh?',
            '<25>{#f/1}* Oh, je... je...',
            '<25>{#f/6}* ¡Jajaja!\n* ¡Podría pellizcarte la mejilla!',
            '<25>{#f/0}* Seguro puedes encontrar algo mejor que una señora vieja como yo.'
        ],
        flirt2: [
            '<25>{#p/toriel}{#f/7}* ...\n* Oh querido, ¿hablas en serio...?',
            '<25>{#f/1}* Mi niño, no sé si esto es patético o simpático.'
        ],
        flirt3: [
            '<25>{#p/toriel}{#f/7}* ...\n* Oh querido, ¿hablas en serio...?',
            '<25>{#f/5}* Y después de que me llamaste \"Madre\"...',
            '<25>{#f/1}* Pues bien.\n* Eres un niño muy \"interesante\".'
        ],
        flirt4: ['<25>{#p/toriel}{#f/3}* ...', '<25>{#p/toriel}{#f/4}* No puedo ni empezar a entenderte.'],
        hello: [
            [
                '<25>{#p/toriel}* Al habla Toriel.',
                '<25>{#f/1}* ¿Solo querías decir hola...?',
                '<25>{#f/0}* Bien entonces.\n* \"¡Hola!\"',
                '<25>{#f/0}* Espero que eso sea suficiente.\n* Je Je.'
            ],
            [
                '<25>{#p/toriel}* Al habla Toriel.',
                '<25>{#f/1}* ¿Querías decir hola de nuevo?',
                '<25>{#f/0}* \"Saludos\" ¡ahí esta!',
                '<25>{#f/1}* ¿Es suficiente?'
            ],
            [
                '<25>{#p/toriel}{#f/1}* ¿Tienes aburrimiento?',
                '<25>{#f/0}* Mis disculpas.\n* Debería haberte dado algo para hacer.',
                '<25>{#f/1}* ¿Por qué no utilizas tu imaginación para distraerte?',
                '<25>{#f/0}* Imagina que eres... ¡un piloto de combate!',
                '<25>{#f/1}* Giras y giras, haciendo volteretas a la velocidad de la luz....',
                '<25>{#f/1}* ¿Puedes hacer eso por mí?'
            ],
            [
                '<25>{#p/toriel}{#f/5}* Hola, pequeño.',
                '<25>{#f/9}* Lo siento, pero no tengo mucho más que decir.',
                '<25>{#f/1}* Fue agradable escuchar tu voz, sin embargo...'
            ]
        ],
        helloX: ['<25>{#p/toriel}{#g/torielLowConcern}* ¿Hola?'],
        mom1: [
            '<25>{#p/toriel}* ...',
            '<25>{#f/7}* ¿Eh?\n* ¿Acabas de llamarme \"Mamá\"?',
            '<25>{#f/1}* Bueno...\n* Supongo...',
            '<25>{#f/1}* ¿Eso te haría feliz?',
            '<25>{#f/1}* ¿Llamarme...\n* \"Madre?\"',
            '<25>{#f/0}* Bien entonces.\n* ¡Llámame como gustes!'
        ],
        mom2: ['<25>{#p/toriel}{#f/7}* ...\n* Oh Dios... ¿otra vez?', '<25>{#f/0}* Je je...\n* Eres un niño muy dulce.'],
        mom3: [
            '<25>{#p/toriel}{#f/7}* ...\n* Oh Dios... ¿otra vez?',
            '<25>{#f/5}* Y después de que coquetearas conmigo...',
            '<25>{#f/1}* Pues bien.\n* Eres un niño muy \"interesante\".'
        ],
        mom4: ['<25>{#p/toriel}{#f/5}* ...'],
        puzzle1: [
            '<25>{#p/toriel}{#f/1}* ¿Ayudarte con un puzle...?',
            '<25>{#f/1}* Aún no has salido de la habitación, ¿verdad?',
            '<25>{#f/0}* Espera a que vuelva, y podremos resolverlo juntos.'
        ],
        puzzle2: [
            '<25>{#p/toriel}{#f/1}* ¿Ayudarte con un puzle...?',
            '<25>{#f/23}* ... algo me dice que sinceramente no necesitas mi ayuda.'
        ],
        puzzle3: [
            '<25>{#p/toriel}{#f/1}* ¿Ayudarte con un puzle...?',
            '<25>{#f/5}* ...\n* Me temo que no podre ayudarte en este momento..',
            '<25>{#f/0}* Espera a que vuelva, y podremos resolverlo juntos.'
        ],
        insult1: (sus: boolean) =>
            sus
                ? [
                    '<25>{#p/toriel}{#f/0}* ¿Hola?\n* ¡Al habla...',
                    '<25>{#f/2}* ...!',
                    '<25>{#f/3}* ¿Te importaría repetírmelo?'
                ]
                : [
                    '<25>{#p/toriel}{#f/0}* ¿Hola?\n* ¡Al habla...',
                    '<25>{#f/2}* ...!',
                    '<25>{#f/1}* Mi niño... no creo que eso signifique lo que crees que significa.'
                ],
        insult2: (sus: boolean) =>
            sus
                ? ['<25>{#p/toriel}{#f/15}* ...', '<25>{#f/12}* Voy a fingir que no me has dicho eso.']
                : ['<25>{#p/toriel}{#f/1}* Mi niño...']
    },

    i_candy: {
        battle: {
            description: 'Tiene un sabor distintivo, sin regaliz.',
            name: 'Caramelo'
        },
        drop: ['<32>{#p/human}* (Desechas el Caramelo Monstruo.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (10 PS.)']
                : ['<32>{#p/basic}* \"Caramelo Monstruo\" Cura 10 PS\n* Tiene un sabor distintivo, sin regaliz.'],
        name: 'Caramelo Mons.',
        use: ['<32>{#p/human}* (Comes el Caramelo Monstruo.)']
    },
    i_water: {
        battle: {
            description: 'Huele a monóxido de dihidrógeno.',
            name: 'Agua'
        },
        drop: ['<32>{#p/human}* (Desechas el Agua.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (12 PS.)']
                : ['<32>{#p/basic}* \"Agua\" Cura 12 PS\n* Huele a monóxido de dihidrógeno.'],
        name: 'Agua',
        use: () => [
            '<32>{#p/human}* (Bebes el Agua.)',
            ...(SAVE.data.b.ufokinwotm8 ? [] : ["<33>{#p/human}* (Estás lleno de hidratación.)"]) 
        ]
    },
    i_chocolate: {
        battle: {
            description: 'Una merecida barra de chocolate.',
            name: 'Chocolate'
        },
        drop: () => [
            '<32>{#p/human}* (Desechas la Barra de Chocolate.)',
            ...(SAVE.data.b.svr || world.darker ? [] : ['<32>{#p/basic}* ... oh bueno.'])
        ],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (19 PS. Esto parece recordarte a alguien.)']
                : ['<32>{#p/basic}* \"Barra de Chocolate\" Cura 19 PS\n* Es un regalo bien merecido.'],
        name: 'Barra de Chocolate',
        use: () => [
            '<32>{#p/human}* (Comes la Barra de Chocolate.)',
            ...(battler.active && battler.alive[0].opponent.metadata.reactChocolate
                ? ['<32>{#p/basic}* Toriel reconoce el olor y sonríe un poco.']
                : [])
        ]
    },
    i_delta: {
        battle: {
            description: 'Dicen que esta sustancia tiene altas propiedades relajantes.',
            name: 'Δ-9'
        },
        drop: ['<32>{#p/human}* (Desechas el Δ-9.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (5 PS. Te sientes extraño con este objeto.)']
                : ['<32>{#p/basic}* \"Δ-9\" Cura 5 PS\n* Esta sustancia dice tener altas propiedades relajantes.'],
        name: 'Δ-9',
        use: ['<32>{#p/human}* (Ingieres el Δ-9.)']
    },
    i_halo: {
        battle: {
            description: 'Una diadema con su propio campo de gravedad.',
            name: 'Anillo'
        },
        drop: ['<32>{#p/human}* (Tiras el Anillo lejos como un frisbee.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (3 DF.)']
                : ['<32>{#p/basic}* \"Anillo\" (3 DF)\n* Una corona con su propio campo gravitatorio.'],
        name: 'Anillo',
        use: () => [
            '<32>{#p/human}* (Te pones el Anillo.)',
            ...(SAVE.data.b.svr && !SAVE.data.b.freedom && asrielinter.i_halo_use++ < 1
                ? ['<25>{#p/asriel1}{#f/20}* Creo que te queda bien.']
                : [])
        ]
    },
    i_little_dipper: {
        battle: {
            description: 'Una cuchara para golpear.',
            name: 'Cuchara'
        },
        drop: ['<32>{#p/human}* (Desechas el Cucharón Pequeño.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (3 AT.)']
                : ['<32>{#p/basic}* \"Cucharón Pequeño\" (3 AT)\n* Una cuchara para golpear.'],
        name: 'Cucharón Pequeño',
        use: ['<32>{#p/human}* (Te has equipado el Cucharón Pequeño.)']
    },
    i_pie: {
        battle: {
            description: 'Tarta de canela-caramelo casera. Una rebanada.',
            name: 'Tarta'
        },
        drop: ['<32>{#p/human}* (Desechas la Tarta de Caramelo.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (99 PS.)']
                : ['<32>{#p/basic}* \"Tarta Caramelo\" Cura 99 PS\n* Tarta de canela-caramelo casero. Una rebanada.'],
        name: 'Tarta Caramelo',
        use: ['<32>{#p/human}* (Te comes la Tarta de Caramelo.)']
    },
    i_pie2: {
        battle: {
            description: 'Receta familiar clásica.',
            name: 'Tarta Car.'
        },
        drop: ['<32>{#p/human}* (Desechas la Tarta de Caracol.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (99 PS.)']
                : ['<32>{#p/basic}* \"Tarta Caracol\" Cura 99 PS\n* Receta familiar clásica.'],
        name: 'Tarta Car.',
        use: ['<32>{#p/human}* (Te comes la Tarta de Caracol.)']
    },
    i_pie3: {
        battle: {
            description: 'A pesar de estar hecha sopa, la tarta sigue deliciosa.',
            name: 'Sopa de Tarta'
        },
        drop: ['<32>{#p/human}* (Tiras la sopa de tarta y la cuchara que venía con ella.)'],
        info: ['<32>{#p/basic}* \"Sopa de Tarta\" Cura 49 PS\n* A pesar de estar sopificada, la tarta sigue estando deliciosa.'],
        name: 'Sopa de Tarta',
        use: ['<32>{#p/human}* (Comes la Sopa de Tarta con la cuchara que tenias.)']
    },
    i_pie4: {
        battle: {
            description: 'Las acciones tienen sus consecuencias...',
            name: 'Tarta Quemada'
        },
        drop: ['<32>{#p/human}* (Desechas la Tarta Quemada como si nunca hubiera existido.)'],
        info: ['<32>{#p/basic}* \"Tarta Quemada\" Cura 39 PS\n* Las acciones tienen sus consecuencias...'],
        name: 'Tarta Quemada',
        use: ['<32>{#p/human}* (Te comes la Tarta Quemada.)']
    },
    i_snails: {
        battle: {
            description: 'Un plato de caracoles fritos.\nPara el desayuno, claro.',
            name: 'Caracoles'
        },
        drop: ['<32>{#p/human}* (Desechas los Caracoles Fritos.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (19 PS.)']
                : ['<32>{#p/basic}* \"Caracoles Fritos\" Cura 19 PS\n* Un plato de caracoles fritos.\n* Para el desayuno, claro está.'],
        name: 'Caracoles Fritos',
        use: ['<32>{#p/human}* (Te comes los Caracoles Fritos.)']
    },
    i_soda: {
        battle: {
            description: 'Un enfermizo líquido, de color amarillo oscuro.',
            name: 'Soda'
        },
        drop: () => [
            '<32>{#p/human}* (Desechas la Soda Gaseosa.)',
            ...(SAVE.data.b.svr || world.darker ? [] : ['<32>{#p/basic}* Hasta nunca.'])
        ],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (8 PS.)']
                : ['<32>{#p/basic}* \"Soda Gaseosa\" Cura 8 PS\n* Un oscuro, líquido amarillo enfermizo.'],
        name: 'Soda Gaseosa',
        use: () => [
            '<32>{#p/human}* (Te bebes la Soda Gaseosa.)',
            ...(SAVE.data.b.svr || world.darker ? [] : ['<32>{#p/basic}* ¡Qué Asco!'])
        ]
    },
    i_spacesuit: {
        battle: {
            description: 'Vino con la nave en la que te chocaste.',
            name: 'Traje Espacial'
        },
        drop: ['<32>{#p/human}* (Desechas el Traje Espacial Desgastado.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (20 PS. El último fragmento de una nave espacial volada en el exilio.)']
                : ['<32>{#p/basic}* \"Traje Espacial Desgastado\" Cura 20 PS ',
'<32>{#p/basic}* Venía con la nave en la que te estrellaste.'],
        name: 'Traje Desgastado',
        use: ['<33>{#p/human}* (Al usar tu última curación, el traje esp. desg. se rompió.)']
    },
    i_spanner: {
        battle: {
            description: 'Una llave vieja y oxidada.',
            name: 'Llave'
        },
        drop: ['<32>{#p/human}* (Desechas la Llave Oxidada.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ["<32>{#p/human}* (Una fiel herramienta forjada más allá de los confines de la galaxia.)"]
                : ['<32>{#p/basic}* Una vieja llave inglesa oxidada.'],
        name: 'Llave Oxidada',
        use: () => [
            ...(battler.active && battler.alive[0].opponent.metadata.reactSpanner
                ? []
                : ['<32>{#p/human}* (Lanzas la llave al aire.)\n* (Nada pasa.)'])
        ]
    },
    i_starbertA: {
        battle: {
            description: 'La primera de una limitada serie de cómics de Super Starwalker.',
            name: 'Starwalker 1'
        },
        drop: ['<32>{#p/human}* (Desechas el Super Starwalker 1.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (Parece el comienzo de un viaje.)']
                : ['<32>{#p/basic}* El primero de una serie limitada del cómic Super Starwalker.'],
        name: 'Super Starwalker 1',
        use: () => (battler.active ? ['<32>{#p/human}* (Lees Super Starwalker 1.)', '<32>* (No pasa nada.)'] : [])
    },
    i_starbertB: {
        battle: {
            description: 'La segunda de una limitada serie de cómics de Super Starwalker.',
            name: 'Starwalker 2'
        },
        drop: ['<32>{#p/human}* (Desechas el Super Starwalker 2.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (Parece la mitad de un viaje.)']
                : ['<32>{#p/basic}* El segundo de una serie limitada del cómic Super Starwalker.'],
        name: 'Super Starwalker 2',
        use: () =>
            battler.active
                ? [
                    '<32>{#p/human}* (Lees Super Starwalker 2.)',
                    ...(SAVE.data.b.stargum
                        ? ['<32>* (No pasa nada.)']
                        : [
                            '<32>* (Encontraste un chicle pegado con cinta a la tira cómica.)',
                            choicer.create('* (¿Usar el chicle?)', 'Sí', 'No')
                        ])
                ]
                : []
    },
    i_starbertC: {
        battle: {
            description: 'El tercero de una limitada serie de cómics de Super Starwalker.',
            name: 'Starwalker 3'
        },
        drop: ['<32>{#p/human}* (Desechas el Super Starwalker 3.)'],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (Parece el final de un viaje... ¿o es un nuevo comienzo?)']
                : ['<32>{#p/basic}* El tercero de una serie limitada del cómic Super Starwalker.'],
        name: 'Super Starwalker 3',
        use: () => (battler.active ? ['<32>{#p/human}* (Lees Super Starwalker 3.)', '<32>* (No pasa nada.)'] : [])
    },
    i_steak: {
        battle: {
            description: 'Cuestionable a lo mejor.',
            name: 'Filete'
        },
        drop: () => [
            '<32>{#p/human}* (Desechas el Filete Chisporroteante.)',
            ...(SAVE.data.b.svr || world.darker || SAVE.data.b.ufokinwotm8
                ? []
                : ["<32>{#p/basic}* Bueno, eso no lo echaremos de menos."])
        ],
        info: () =>
            SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
                ? ['<32>{#p/human}* (14 PS.)']
                : ['<32>{#p/basic}* \"Filete Chisporroteante\" Cura 14 PS\n* Dudoso.'],
        name: 'Filete Chisp.',
        use: () => [
            '<32>{#p/human}* (Te comes el Filete Chisporroteante.)',
            ...(SAVE.data.b.svr || world.darker || SAVE.data.b.ufokinwotm8 ? [] : ['<32>{#p/basic}* ¡Asqueroso!'])
        ]
    },

    k_coffin: {
        name: 'Llave Secreta',
        description: () =>
            SAVE.data.b.w_state_secret
                ? 'Se usa para una zona oculta de Las Afueras.'
                : "Adquirido del cajón de calcetines en la habitación de Toriel."
    },

    c_call_toriel: <Partial<CosmosKeyed<CosmosProvider<string[]>, string>>>{
        w_start: [
            '<25>{#p/toriel}{#f/0}* Ah, por supuesto.\n* Ahí debe ser donde te estrellaste.',
            '<25>{#f/0}* Los otros humanos que llegaron también aterrizaron allí.',
            '<25>{#f/1}* Debe haber algo en el campo de fuerza...',
            '<25>{#f/0}* ... lo que siempre hace que las naves vuelen en este vector.'
        ],
        w_twinkly: () =>
            SAVE.data.b.toriel_twinkly
                ? [
                    '<25>{#p/toriel}{#f/1}* ¿Es ahí donde te encontré por primera vez?',
                    '<25>{#f/5}* Esa estrella parlante que viste ha sido una peste durante un tiempo.',
                    '<25>{#f/1}* He intentado razonar con él antes, pero...',
                    '<25>{#f/9}* Mis esfuerzos nunca llegaron a ninguna parte.'
                ]
                : [
                    '<25>{#p/toriel}{#f/1}* ¿Es ahí donde te encontré por primera vez?',
                    '<25>{#f/5}* Solo ahí fuera, por ti mismo...',
                    '<25>{#f/0}* Menos mal que estaba allí para traerte aquí.'
                ],
        w_entrance: [
            '<25>{#p/toriel}{#f/1}* La entrada a Las Afueras...',
            '<25>{#f/0}* De hecho, la zona anterior a esta no forma parte de las Afueras.',
            '<25>{#f/5}* Es... más bien un lugar de choque sin marcar.',
            '<25>{#f/1}* Después de que el primer humano se estrellara en las Afueras...',
            '<25>{#f/0}* Una plataforma independiente parecía un complemento obvio.'
        ],
        w_lobby: [
            '<25>{#p/toriel}{#f/0}* El puzle en este cuarto funciona bien para las demostraciones.',
            '<25>{#f/1}* Después de todo, ¿por qué si no iba a construirlo?',
            '<25>{#f/5}* Desafortunadamente, no todos los humanos entienderon esto.',
            '<25>{#f/3}* Incluso uno de ellos intentó correr hacia el campo de seguridad...',
            '<25>{#f/0}* ... basta decir que fue necesario el uso de magia curativa.'
        ],
        w_tutorial: [
            '<25>{#p/toriel}* Si este puzle no es mi favorito, ¡no sé cuál lo es!',
            '<25>* La forma en que enseña a colaborar es una cualidad muy valiosa.',
            '<25>{#f/1}* Ya que mi trabajo soñado ES ser profesora...',
            '<25>{#f/0}* Siempre estoy buscando formas de impartir estas importantes lecciones.'
        ],
        w_dummy: () => [
            '<25>{#p/toriel}{#f/1}* ¿El cuarto de entrenamiento...?',
            ...(SAVE.data.n.plot < 42
                ? [
                    [
                        '<25>{#f/0}* Je, je, sigo estando orgullosa de cómo manejaste esa lección.',
                        '<25>{#f/1}* Una conversación amistosa es preferible a la otra opción...',
                        '<25>{#f/0}* ¡Y no sólo porque te ayude a hacer amigos!'
                    ],
                    [],
                    [
                        '<25>{#f/5}* ...',
                        '<25>{#f/5}* Aunque no manejaste esa lección de la manera que pretendía...',
                        '<25>{#f/0}* Por lo menos, evitaste el conflicto.',
                        '<25>{#f/0}* Considerando las alternativas, era... un resultado preferible.'
                    ],
                    [
                        '<25>{#f/0}* ... hmm.',
                        '<25>{#f/0}* La verdad, es que aún no sé cómo reaccionar ante lo ocurrido.',
                        '<25>{#f/1}* Era fascinante de ver, sin embargo...',
                        '<25>{#f/3}* Sólo ustedes dos...\n* Mirándose el uno al otro...',
                        '<25>{#f/4}* ...'
                    ],
                    [
                        '<25>{#f/1}* No puedo decir que esperara lo que pasó, pero...',
                        '<25>{#f/0}* Aún así fue entrañable.',
                        '<25>{#f/0}* Sorprendentemente, eres el primer humano que prueba este método.',
                        '<25>{#f/1}* Y parecía una solución tan obvia en retrospectiva...'
                    ],
                    [],
                    [
                        '<25>{#f/5}* ...',
                        '<25>{#f/7}* ...',
                        '<25>{#f/8}* ¡Jajaja!\n* ¡Ah, no puedo evitar reírme!',
                        '<25>{#f/6}* El descaro con el que elegiste coquetear...',
                        '<25>{#f/1}* ¡Ciertamente me tomó por sorpresa!',
                        '<25>{#f/0}* Escúchame, mi niño.',
                        '<25>{#f/9}* Coquetear con tus adversarios no siempre es lo ideal.',
                        '<25>{#f/10}* Pero, si puedes hacerlo ASÍ otra vez...',
                        '<25>{#f/0}* No se sabe lo que se puede conseguir de esta manera.'
                    ]
                ][SAVE.data.n.state_wastelands_dummy]
                : [
                    '<25>{#p/toriel}{#f/0}* Oh, cierto, sobre eso.',
                    '<25>{#p/toriel}{#f/0}* Hace poco descubrí que un fantasma se escondía en el maniquí.',
                    '<25>{#p/toriel}{#f/1}* Parecía tener molestia por algo, pero...',
                    '<25>{#p/toriel}{#f/0}* Tras una pequeña charla, le ayudé a calmarse.',
                    '<25>{#p/toriel}{#f/1}* Hmm... ¿me pregunto dónde estará ahora Lurksalot?'
                ])
        ],
        w_coffin: [
            '<25>{#p/toriel}{#f/5}* ...',
            '<25>{#f/5}* En tiempos como estos, es importante que mostremos respeto.',
            '<25>{#f/10}* ... ¿lo entiendes?',
            '<25>{#f/9}* Es una lección más importante que la de los puzles o los encuentros.'
        ],
        w_danger: () =>
            SAVE.data.n.state_wastelands_froggit === 3
                ? [
                    '<25>{#p/toriel}{#f/1}* El acertijo que ofrece el terminal en esa habitación...',
                    '<25>{#f/0}* Esta basado en algo que encontré en una vieja leyenda de la Tierra.',
                    '<25>{#f/1}* Se trataba de una serie de muchos puzles complejos...',
                    '<25>{#f/0}* Y un cierto engañoso producto horneado.',
                    SAVE.data.b.w_state_riddleskip
                        ? '<25>{#f/5}* Es una pena que te hayas negado a resolverlo.'
                        : '<25>{#f/0}* Verte resolverlo fue muy gratificante.'
                ]
                : [
                    '<25>{#p/toriel}{#f/1}* Como supervisora de las Afueras, yo misma me encargué...',
                    '<25>{#f/0}* Para asegurar que los otros monstruos no te atacaran.',
                    '<25>{#f/0}* Tanto los otros monstruos como yo tenemos un entendimiento mutuo al respecto.',
                    '<25>{#f/0}* Es por eso que ese Froggit lo dejó tan fácilmente.'
                ],
        w_zigzag: [
            '<25>{#p/toriel}{#f/1}* Mi idea con la construcción de este cuarto es que sea muy largo y aireado...',
            '<25>{#f/0}* ... era que me parecía que un cuarto recto sería demasiado aburrido.',
            '<25>{#f/1}* Después de todo, ¿quién quiere caminar en línea recta toda su vida?',
            '<25>{#f/0}* Un pequeño cambio de ritmo puede ser bastante agradable.'
        ],
        w_froggit: [
            '<25>{#p/toriel}* A partir de este cuarto, se pueden encontrar más monstruos.',
            '<25>{#f/0}* A menudo les gusta \"pasar el rato\" aquí.\n* Bonito, ¿verdad?',
            '<25>{#f/1}* Solía ser un lugar tranquilo, hasta hace poco...',
            '<25>{#f/0}* Cuando un monstruo empezó a enseñar a los demás a coquetear.',
            '<25>{#f/0}* Este nuevo elemento ha alterado enormemente el ambiente social.'
        ],
        w_candy: () => [
            SAVE.data.n.state_wastelands_candy < 4
                ? '<25>{#p/toriel}{#f/1}* ¿Aún no se ha estropeado la máquina expendedora?'
                : '<25>{#p/toriel}{#f/1}* Oh querido, ¿se volvió a romper la máquina expendedora?',
            '<25>{#f/5}* Bueno, ha ocurrido más veces de las que puedo contar.',
            '<25>{#f/3}* El lado positivo es que SÍ ahorra energía...',
            '<25>{#f/0}* ... así que tal vez no sea del todo malo.'
        ],
        w_puzzle1: [
            '<25>{#p/toriel}{#f/1}* Para facilitar el proceso de reintentar el puzle...',
            '<25>{#f/0}* Instale un sistema para que vuelvas al principio.',
            '<25>{#f/5}* El científico que ayudó a instalarlo hace tiempo que se fue...',
            '<25>{#f/0}* Pero su trabajo sigue siendo útil cada día.'
        ],
        w_puzzle2: [
            '<25>{#p/toriel}{#f/1}* Ah, aquí existe una forma única del puzle.',
            '<25>{#f/0}* Una que pone a prueba la paciencia por encima de la memorización.',
            '<25>{#f/1}* En su mayoría, los otros humanos se quejaron...',
            '<25>{#f/0}* Sin embargo, se aprecia el valor que aporta.'
        ],
        w_puzzle3: [
            '<25>{#p/toriel}{#f/1}* Un pequeño truco que puede resultarte útil para este puzle...',
            '<25>{#f/0}* Es que puedes empezar a moverte incluso mientras se muestra la secuencia.',
            '<25>{#f/5}* ... Supongo que ahora no te sirve de mucho.',
            '<25>{#f/1}* Pero, si por alguna razón necesitas resolverlo de nuevo...',
            '<25>{#f/0}* Puedes probar el consejo que acabo de darte.'
        ],
        w_puzzle4: [
            '<25>{#p/toriel}{#f/1}* Me he enterado de que, recientemente...',
            '<25>{#f/0}* Se venden ediciones antiguas de una serie de cómics ya extinta.',
            '<25>{#f/0}* Quizás, si te aburres, podrías comprarte uno.',
            '<25>{#f/0}* ¡Los niños de tu edad suelen ser muy aficionados a estas cosas!'
        ],
        w_mouse: [
            '<25>{#p/toriel}{#f/1}* Por principios, me parece importante...',
            '<25>{#f/0}* Que haya un cuarto destinado a parar y descansar.',
            '<25>{#f/0}* En mi vida, a menudo encuentro que las pausas son muy útiles.',
            '<25>{#f/1}* La ratónestrella que reside aquí estaría sin duda de acuerdo...'
        ],
        w_blooky: () =>
            SAVE.data.b.killed_mettaton
                ? [
                    '<25>{#p/toriel}{#f/1}* Por la razón que sea, ese fantasma que viene aquí a menudo...',
                    '<25>{#f/5}* Se ha sentido peor que nunca últimamente.',
                    '<25>{#f/1}* Intenté preguntarle por qué, pero no me dijo...',
                    '<25>{#f/5}* ... No he visto a ese fantasma desde esa vez.'
                ]
                : !SAVE.data.b.a_state_hapstablook || SAVE.data.n.plot < 68
                    ? [
                        '<25>{#p/toriel}{#f/0}* Ese fantasma que llamó antes suele habitar esta zona.',
                        ...(SAVE.data.b.napsta_performance
                            ? ['<25>{#f/1}* Pensé que estaría más contento después de su actuación...']
                            : ['<25>{#f/1}* He intentado levantarle el ánimo en el pasado...']),
                        '<25>{#f/5}* Pero sus problemas puede no ser tan fáciles de resolver.',
                        '<25>{#f/1}* Si tan sólo supiera qué lo retiene...'
                    ]
                    : [
                        '<25>{#p/toriel}{#f/1}* Por la razón que sea, ese fantasma que viene aquí a menudo...',
                        '<25>{#f/0}* Últimamente se siente mucho mejor.',
                        '<25>{#f/0}* Incluso vino a mi casa para decírmelo.',
                        '<25>{#f/1}* Al parecer, ¿tuviste algo que ver con esto...?',
                        '<25>{#f/0}* Pues bien.\n* Estoy muy orgullosa de ti, mi niño.'
                    ],
        w_party: [
            '<25>{#p/toriel}{#f/0}* El cuarto de actividades.\n* Allí celebramos todo tipo de actuaciones.',
            '<25>{#f/0}* Drama, noches de baile...\n* Y, lo más importante de todo, las artes.',
            '<25>{#f/0}* Siempre es bueno ver a la gente expresarse.',
            '<25>{#f/1}* Una vez asistí a un show de comedia en ese mismo cuarto.',
            '<25>{#f/0}* ¡Fue lo más fuerte que me he reído en mi vida!'
        ],
        w_pacing: () => [
            SAVE.data.b.toriel_twinkly
                ? '<25>{#p/toriel}{#f/0}* Oí que alguien aquí se hizo \"amigo\" de esa estrella parlante'
                : '<25>{#p/toriel}{#f/0}* Oí que alguien aquí se hizo \"amigo\" de esa estrella parlante',
            '<25>{#f/1}* Uno de los Froggits, ¿Supongo...?',
            "<25>{#f/1}* Decir que estoy preocupada por la seguridad de esos monstruos...",
            '<25>{#f/5}* Sería quedarse muy corto.'
        ],
        w_junction: [
            '<25>{#p/toriel}{#f/1}* La sala de intersección...',
            '<25>{#f/0}* En el pasado, habíamos proyectado aquí una especie de zona comunitaria.',
            '<25>{#f/0}* Los visitantes de las afueras se encontrarían con un ambiente cálido y acogedor.',
            '<25>{#f/1}* Con el tiempo, sin embargo, nos dimos cuenta de que no vendría mucha gente...',
            '<25>{#f/0}* Y así, el diseño fue alterado como lo ves ahora.',
            '<25>{#f/5}* Un poco aburrido, pero supongo que no todos los cuartos pueden ser grandes...'
        ],
        w_annex: [
            '<25>{#p/toriel}* Desde aquí se llega a la importante parada de taxis.',
            '<25>{#f/1}* No sólo se puede acceder a otras areas de la zona espacial...',
            '<25>{#f/0}* Sino también otras subsecciones de las Afueras.',
            '<25>{#f/1}* Sin embargo, como no eres más que un niño...',
            '<25>{#f/5}* Es poco probable que el conductor te ofrezca eso como una opción.',
            '<25>{#f/0}* Las tiendas y negocios de ahí son en su mayoría sólo para adultos.'
        ],
        w_wonder: () => [
            '<25>{#p/toriel}{#f/1}* Un pequeño champiñón me saludó al volver de las compras...',
            SAVE.data.b.snail_pie
                ? '<25>{#f/0}* ... mientras volvía con los ingredientes para la tarta de caracol.'
                : '<25>{#f/0}* ... mientras volvía con los ingredientes para la tarta de caramelo.',
            '<25>{#f/3}* Extrañamente, estaba flotando sobre la puerta...',
            '<25>{#f/0}* La gravedad debe ser débil en ese cuarto.',
            '<25>{#f/1}* ¿Quizás la presencia del taxi tenga algún tipo de efecto...?'
        ],
        w_courtyard: [
            '<25>{#p/toriel}{#f/0}* Ah.\n* El patio.',
            '<25>{#f/1}* Hay que reconocer que le falta un poco...',
            '<25>{#f/5}* En términos de ser un lugar para que los niños como tú jueguen.',
            '<25>{#f/1}* Con cada humano que venía, pensaba en arreglar eso...',
            '<25>{#f/5}* Pero siempre se iban antes de que yo tuviera la oportunidad.'
        ],
        w_alley1: [
            '<25>{#p/toriel}{#f/9}* ... el cuarto en el que te sermoneé sobre irte.',
            '<25>{#f/5}* Pensé que si hablaba del campo de fuerza...',
            '<25>{#f/5}* Puede que te convenza para que te quedes.',
            '<25>{#f/1}* ... Recuerdo haber dicho lo mismo a los otros humanos, pero...',
            '<25>{#f/5}* Fue tan eficaz para ti como para los demás humanos.'
        ],
        w_alley2: [
            '<25>{#p/toriel}{#f/9}* ... el cuarto en el que te advertí de los peligros que verias.',
            '<25>{#f/5}* Me dijeron que mis creencias sobre los otros monstruos son erróneas, pero...',
            '<25>{#f/5}* No me pareció prudente correr ese riesgo.',
            '<25>{#f/9}* ... tal vez sea hora de que reconsidere mi punto de vista.'
        ],
        w_alley3: [
            '<25>{#p/toriel}{#f/9}* ... Realmente lamento la forma en la que actué contigo aquí.',
            '<25>{#f/5}* Fue un error de mi parte intentar forzarte a quedarte...',
            '<25>{#f/5}* Sólo actuaba por mis propios deseos tontos.',
            '<25>{#f/1}* Aunque estoy segura de que ya me has perdonado...',
            '<25>{#f/5}* Sin importar si me lo merezco o no...'
        ],
        w_alley4: () =>
            SAVE.data.b.w_state_fightroom
                ? [
                    '<32>{#s/phone}{#p/event}* Marcando...',
                    '<25>{#p/toriel}{#f/1}* Aunque ese cuarto no nos provoque los mejores sentimientos...',
                    '<25>{#f/0}* Sigue siendo uno de mis lugares favoritos de las Afueras.',
                    '<25>{#f/1}* Hay alguien que me visita a veces...',
                    '<25>{#f/6}* Tal vez ya lo conocías.',
                    '<32>{#s/equip}{#p/event}* Click...'
                ]
                : instance('main', 'toriButNotGarb') === void 0 // NO-TRANSLATE

                    ? [
                        '<32>{#s/phone}{#p/event}* Marcando...',
                        '<25>{#p/toriel}{#f/1}* ¿Llamando tan pronto...?',
                        '<25>{#f/0}* ... ¡Ni siquiera he vuelto a casa todavía!',
                        '<25>{#f/0}* Por favor, espera un momento antes de que me llames de nuevo.',
                        '<32>{#s/equip}{#p/event}* Click...'
                    ]
                    : [
                        '<32>{#w.stopThatGoat}{#s/phone}{#p/event}* Llamando...',
                        '<25>{#p/toriel}{#f/1}* ¿Llamando tan pronto...?',
                        '<25>{#f/0}* ... ¡Ni siquiera he salido del cuarto!',
                        '<25>{#f/2}* ¡Un momento para respirar estaría bien!',
                        '<32>{#w.startThatGoat}{#s/equip}{#p/event}* Click...'
                    ],
        w_bridge: [
            '<25>{#p/toriel}{#f/1}* El puente hacia el resto de la zona espacial...',
            '<25>{#f/5}* Es una pena pensar que casi lo destruyo.',
            '<25>{#f/0}* Por supuesto, el taxi habría seguido circulando.',
            '<25>{#f/3}* Pero dudo que eso fuera muy seguro.',
            '<25>{#f/1}* Alegrémonos de que este puente siga en pie.'
        ],
        w_exit: () =>
            SAVE.data.n.plot < 16
                ? [
                    '<25>{#p/toriel}{#f/1}* Mi niño, si ya te vas de las Afueras...',
                    '<25>{#f/0}* Entonces... Quiero que recuerdes algo.',
                    '<25>{#f/1}* Pase lo que pase, por difícil que parezca...',
                    '<25>{#f/0}* Quiero que sepas que tengo fe en ti.',
                    '<25>{#f/0}* Yo sé que puedes hacer lo correcto.',
                    '<25>{#f/1}* Recuérdalo, ¿de acuerdo?'
                ]
                : SAVE.data.n.plot < 17.001
                    ? [
                        '<25>{#p/toriel}{#f/1}* ¿Regresaste a Las Afueras tan pronto...?',
                        '<25>{#f/0}* Bueno.\n* No puedo decir que me oponga a ello.',
                        '<25>{#f/1}* Puedes irte cuando quieras, por supuesto...',
                        '<25>{#f/0}* Pero, por el momento, me alegro de verte.'
                    ]
                    : [
                        '<25>{#p/toriel}{#f/2}* ¿¡Cuánto tiempo llevas ahí fuera!?',
                        '<25>{#f/1}* ¿Has venido hasta aquí sólo para llamarme?',
                        '<25>{#f/0}* ... ganso tonto.',
                        '<25>{#f/0}* Si deseas llamar, no es necesario que retrocedas tanto.'
                    ],
        w_toriel_front: [
            '<25>{#p/toriel}{#f/1}* ¿Sabias que esta casa es una recreación de otra?',
            '<25>{#f/1}* En el pasado, vivía en la Capital...',
            '<25>{#f/0}* En una casa a la que se parecía a esta.',
            '<25>{#f/5}* De vez en cuando, olvido que no estoy realmente allí...'
        ],
        w_toriel_hallway: [
            '<25>{#p/toriel}{#f/0}* No hay mucho que decir sobre el pasillo.',
            '<26>{#f/1}* Aunque, puedes mirarte en el espejo, si quieres...',
            '<25>{#f/0}* Escuche que el auto-reflejo puede ser algo poderoso.'
        ],
        w_toriel_asriel: [
            '<25>{#p/toriel}{#f/0}* Ah, ¡este es tu cuarto!',
            '<25>{#f/5}* Tu... cuarto...',
            '<25>{#f/9}* ...',
            '<25>{#f/5}* Quizás ya no lo sea como tal.',
            '<25>{#f/1}* ...',
            '<25>{#f/1}* En realidad, te dejaré esa decisión a ti...',
            '<25>{#f/0}* Puedes descansar cuando quieras.'
        ],
        w_toriel_toriel: [
            '<25>{#p/toriel}{#f/0}* Así que has entrado en mi cuarto.',
            '<25>{#f/0}* Si quieres, puedes leer un libro de mi estantería.',
            '<25>{#f/0}* Pero, por favor, no te olvides de devolverlo.',
            "<25>{#f/23}* ¡Y no te atrevas a abrir el cajón de los calcetines!"
        ],
        w_toriel_living: () =>
            toriCheck()
                ? ['<25>{#p/toriel}{#f/3}* No hace falta que me llames cuando estoy aquí mismo, pequeño.']
                : [
                    '<25>{#p/toriel}{#f/1}* Rebuscando en la sala de estar, ¿no?',
                    '<25>{#f/0}* Dime.\n* ¿Ya leíste todos los libros?',
                    '<25>{#f/1}* Pensé en leerte el libro de los datos del caracol...',
                    '<25>{#f/0}* Pero decidí que podría ser demasiado repetitivo para ti.'
                ],
        w_toriel_kitchen: [
            '<25>{#p/toriel}{#f/1}* ¿La cocina...?',
            '<25>{#f/0}* Te dejé una barra de chocolate en la nevera.',
            '<25>{#f/0}* Escuche que es... un viejo favorito de los humanos.',
            '<25>{#f/1}* Espero que te guste...'
        ],
        s_start: () =>
            SAVE.data.n.plot < 17.001
                ? [
                    '<25>{#p/toriel}{#f/0}* Si estoy en lo cierto, cierto amigo mío debería estar delante.',
                    '<26>{#f/0}* No temas, pequeño.',
                    '<25>{#f/1}* Sigue adelante...'
                ]
                : [
                    '<25>{#p/toriel}{#f/1}* Por lo que recuerdo, este cuarto grande...',
                    '<26>{#f/0}* ... habría sido la base de un pueblo en las afueras de Starton.',
                    '<25>{#f/0}* Por supuesto, que eso nunca ocurrió.',
                    '<25>{#f/2}* ¡Un pueblo era más que suficiente!'
                ],
        s_sans: () =>
            SAVE.data.n.plot < 17.001
                ? [
                    '<25>{#p/toriel}{#f/0}* Si estoy en lo cierto, cierto amigo mío debería estar delante.',
                    '<26>{#f/0}* No temas, pequeño.',
                    '<25>{#f/1}* Sigue adelante...'
                ]
                : [
                    '<25>{#p/toriel}{#f/1}* Supongo que a estas alturas ya oíste del \"inversor gravimétrico\".',
                    '<26>{#f/0}* Es un dispositivo del que Sans me ha hablado mucho.',
                    '<25>{#f/1}* Aparentemente, hay otro mundo allá arriba...',
                    '<25>{#f/0}* Un lugar donde las cosas no siempre están bien orientadas.'
                ],
        s_crossroads: [
            '<25>{#p/toriel}{#f/1}* Esta antigua pista de choque fue una bulliciosa intersección...',
            '<25>{#f/1}* Barcos de suministro yendo y viniendo...',
            '<25>{#f/1}* Listo para ayudar en lo que se construyera a continuación...',
            '<25>{#f/5}* Es una pena que la zona espacial parezca haber dejado de expandirse.',
            '<25>{#f/0}* ¡Durante un tiempo, la construcción de nuevas zonas definió nuestra cultura!'
        ],
        s_human: [
            "<25>{#p/toriel}* Escuche que el hermano de Sans quiere unirse a la Guardia Real algún día.",
            '<25>{#f/1}* Un joven esqueleto con aspiraciones...',
            '<25>{#f/0}* A pesar de mis sentimientos hacia la guardia real, es bueno que sueñe.',
            '<25>{#f/5}* Me preocupa que muchos hayan renunciado a sus sueños últimamente...',
            '<25>{#f/0}* ¡Pero él no!\n* Ese esqueleto sabe lo que es mejor para él.'
        ],
        s_papyrus: [
            '<25>{#p/toriel}* Sans me contó todo sobre los aparatos que Papyrus añadió a su estación.',
            '<25>{#f/1}* Primero, una manija, para que pueda \"balancearse\" en servicio...',
            '<25>{#f/1}* Una llamada \"llave de cielo\" utilizada para \"fijar\" las estrellas...',
            '<25>{#f/0}* Y una pantalla para llevar el registro de sus muchas responsabilidades.',
            '<25>{#f/6}* Con inventos así, cualquiera diría que trabaja en un laboratorio.'
        ],
        s_doggo: [
            '<25>{#p/toriel}{#f/5}* ¿La Guardia Real te está dando demasiados problemas?',
            '<25>{#f/0}* Sans dijo que te avisaría de posibles encuentros.',
            '<25>{#f/1}* ...',
            '<25>{#f/1}* Quizá debería estar más preocupada, pero...',
            '<25>{#f/0}* Algo me dice que estarás bien.',
            '<25>{#f/0}* Tengo fe en que ese esqueleto cuidará de ti.'
        ],
        s_robot: [
            '<25>{#p/toriel}{#f/1}* Ah, qué bonito sonido...',
            '<25>{#f/0}* Reconocería a un robot constructor en cualquier parte.',
            '<25>{#f/5}* Tras la prohibición de los programas de IA, desactivamos la mayoría...',
            '<25>{#f/1}* Pero los dos cuya sensibilidad no los corrompió...',
            '<25>{#f/0}* Se nos permitió una jubilación más elegante.',
            '<25>{#f/0}* Es bueno saber que han sobrevivido hasta nuestros días.'
        ],
        s_maze: [
            "<25>{#p/toriel}* Sans me ha contado todo sobre la afición de su hermano a los puzles.",
            '<25>{#f/1}* ¿Escuche que incluso él ha creado algunos de los suyos...?',
            '<25>{#f/0}* Tengo mucha curiosidad por la \"pared de fuego.\"',
            '<25>{#f/1}* ¿Están muy calientes las llamas?\n* ¿O son simplemente agradablemente cálidas?',
            '<25>{#f/5}* Por su bien, espero que sea esto último.'
        ],
        s_dogs: [
            '<25>{#p/toriel}{#f/1}* Escuche que la Guardia Real contrató a un par de perros casados.',
            '<25>{#f/3}* Estar casado al mismo tiempo que trabajar en la guardia real...',
            '<25>{#f/4}* Esa relación debe tener algunas motivaciones \"interesantes\".',
            '<25>{#f/6}* Pero yo qué sé.\n* Como diría Sans, ¡soy solamente una \"cabra\"!'
        ],
        s_lesser: [
            '<25>{#p/toriel}* Me pregunto qué tipo de comida se vende en Starton hoy en día.',
            '<25>{#f/1}* La última vez que estuve aquí, a todos les gustaba comer fruta fantasma...',
            '<25>{#f/0}* Una extraña comida que podían comer tanto los fantasmas como los que no eran fantasmas.',
            '<26>{#f/0}* Cualquiera que sea el favorito\n  ahora, estoy seguro de que nunca podría soñar con ello.'
        ],
        s_bros: [
            "<25>{#p/toriel}{#f/1}* La afición de Sans a los puzles de encontrar las diferencias...",
            '<25>{#f/0}* Bueno, para mí nunca ha tenido sentido.',
            '<25>{#f/1}* ¿Cómo podía atraerle un puzle tan sencillo?',
            '<26>{#f/3}* ... más especificamente...',
            '<25>{#f/1}* ¿Dónde está la gracia en un puzle así?'
        ],
        s_spaghetti: [
            "<25>{#p/toriel}* Sans hablo mucho del interés de Papyrus por los espaguetis.",
            '<25>{#f/6}* Pero, ¿por qué detenerse ahí?\n* Sólo imagina las PASTABILIDADES...',
            '<25>{#f/8}* ¡Rigatoni!\n* ¡Fettuccine!\n* ¡Acini di Pepe!',
            '<25>{#f/0}* Un poco de variedad podría ayudarle mucho a ir FARFALLE.',
            '<25>{#f/2}* ... en otras palabras, ¡vamos BIGOLI o nos vamos a casa!'
        ],
        s_puzzle1: [
            '<25>{#p/toriel}{#f/1}* Sean como sean los puzles de Starton ahora, estoy segura...',
            '<25>{#f/0}* No se parecen en nada a los que había cuando me fui.',
            '<25>{#f/5}* Un nivel de dificultad tan poco realista...',
            '<25>{#f/5}* Es un milagro que alguien haya podido resolverlos.'
        ],
        s_puzzle2: [
            '<25>{#p/toriel}{#f/1}* Dicen que algunos puzles tienen soluciones secretas...',
            '<25>{#f/0}* ... ¡una afirmación que me parece totalmente increíble!',
            '<25>{#f/0}* Una solución secreta frustraría todo el propósito de un puzle.',
            '<25>{#f/1}* Puzles, al menos con una dificultad realista...',
            '<25>{#f/2}* ¡Sólo deberían resolverse de la forma prevista!'
        ],
        s_jenga: [
            '<25>{#p/toriel}* Que yo sepa, la Dra. Alphys es la actual científica real.',
            '<25>{#f/1}* Puede que nunca sustituya la experiencia de su predecesor, pero...',
            '<25>{#f/0}* Estoy segura de que es más que capaz de encontrar su propio camino.',
            '<25>{#f/0}* Puede que esto te sorprenda, pero siento cierto respeto por los científicos.',
            '<25>{#f/2}* ¡Qué mentes tan brillantes!'
        ],
        s_pacing: [
            '<25>{#p/toriel}{#f/1}* Sería prudente que estés alejado de los vendedores dudosos...',
            '<25>{#f/0}* Porque nunca se sabe de qué pueden tirar.',
            '<25>{#f/0}* O qué rocas lunares pueden acabar cayendo en tus piernas.',
            '<25>{#f/3}* Es una lección que he aprendido por las malas, por desgracia...'
        ],
        s_puzzle3: [
            '<25>{#p/toriel}{#f/1}* El puzle de esta cuarto es de memorización, ¿no?',
            '<25>{#f/1}* Sans mencionó que su hermano a menudo actualiza el patrón...',
            '<25>{#f/0}* ... para mantener una \"contraseña rotativa\" fuerte.',
            '<25>{#f/6}* ¡Qué tonto!',
            '<25>{#f/0}* En las Afueras, nuestros puzles de memorización se actualizan constantemente.'
        ],
        s_greater: [
            '<25>{#p/toriel}{#f/1}* El antiguo dueño de esa perrera, Canis Maximus...',
            '<25>{#f/0}* ... se retiró de la guardia hace mucho tiempo.',
            '<25>{#f/7}* Afortunadamente, ¡se dice que su nuevo dueño esta lleno de energía de cachorro!',
            '<25>{#f/0}* Está claro que ha aprendido bien de un maestro tan sabio.'
        ],
        s_math: [
            '<25>{#p/toriel}{#f/1}* Por favor, ¿alguien puede explicar que es la \"justicia canina\"?',
            '<25>{#f/0}* Es una frase extraña que sigo oyendo de vez en cuando.',
            '<25>{#f/5}* Conozco a un cachorrito que a veces visita las Afueras...',
            '<25>{#f/0}* Tal vez sea él quien merezca justicia.'
        ],
        s_bridge: [
            '<25>{#p/toriel}{#f/1}* Cuando se construyó este puente...',
            "<25>{#f/0}* Su pobreza le obligó a actualizar los sistemas de la zona espacial.",
            '<25>{#f/0}* En poco tiempo, se añadieron las llamadas \"barandillas de gravedad\".',
            '<25>{#f/0}* Son los que evitan que te caigas de las plataformas.'
        ],
        s_town1: [
            '<25>{#p/toriel}{#f/0}* Ah...\n* El pueblo de Starton.',
            '<25>{#f/1}* Escuche mucho sobre un \"Grillby\" allí...',
            '<25>{#f/0}* ... y su variedad de clientes, tanto nuevos como antiguos.',
            '<25>{#f/0}* ¿Sabes?, Sans suele ir allí a comer.',
            '<25>{#f/7}* Escuche que el camarero está muy \"caliente\".'
        ],
        s_taxi: [
            '<25>{#p/toriel}{#f/1}* ¿Una parada de taxis cerca del pueblo?',
            '<25>{#f/1}* ... hmm...',
            '<25>{#f/0}* Me pregunto si es diferente al de las Afueras.',
            '<25>{#f/1}* Por supuesto, no tendría forma de saberlo hasta que lo viera...',
            '<25>{#f/0}* Lo cual no puedo hacer sin un telescopio de lujo.',
            '<25>{#f/0}* Me pregunto dónde podría encontrar uno de esos.'
        ],
        s_town2: [
            '<25>{#p/toriel}{#f/1}* Napstablook me dijo hace poco que abrió una tienda...',
            '<25>{#f/5}* ... en el \"lado sur\" del pueblo.',
            '<25>{#f/1}* ¿Qué podría significar esto?',
            '<25>{#f/0}* El pueblo que recuerdo haber organizado era una gran plaza unificada.',
            '<25>{#f/1}* ¿Quizás hubo una ruptura en algún momento?',
            '<25>{#f/5}* Sería una pena, teniendo en cuenta la visión original...'
        ],
        s_battle: [
            '<25>{#p/toriel}{#f/1}* Lo que Sans parecía más ansioso por advertirme...',
            '<25>{#f/0}* Era el llamado \"ataque especial\" de su hermano.',
            '<25>{#f/1}* Si Papyrus decide pelear contra ti, debes evitarlo a toda costa.',
            '<25>{#f/2}* ¡Repito, evita el ataque especial!\n* ¡A toda costa!',
            '<25>{#f/0}* Eso es todo lo que tengo que decir sobre este asunto.'
        ],
        s_exit: [
            '<25>{#p/toriel}{#f/1}* Si decides dejar Starton, debes entender...',
            '<25>{#f/5}* Mi teléfono es viejo y sólo puede llegar a ciertos cuartos de la fábrica.',
            '<25>{#f/9}* Sería difícil llamarme hasta que encuentres la salida.',
            '<25>{#f/1}* Perdóname.\n* Sólo pensé que debía hacértelo saber.'
        ],
        f_entrance: [
            '<25>{#p/toriel}{#f/7}* ¿Así que encontraste un lugar en la fábrica con buena recepción...?',
            '<25>{#f/1}* ... eso debe significar que estás en algún lugar no cerrado...',
            '<25>{#f/0}* Lo que también implica la presencia cercana de arbustos sintéticos.',
            '<25>{#f/3}* Esas cosas son terribles para atascarse...',
            '<25>{#f/4}* Te pican y te pican...',
            '<25>{#f/0}* Afortunadamente, sé que eres muy inteligente como para no toparte con ellos.'
        ],
        f_bird: () =>
            SAVE.data.n.plot !== 47.2 && SAVE.data.n.plot > 42 && SAVE.data.s.state_foundry_deathroom !== 'f_bird' // NO-TRANSLATE

                ? [
                    '<25>{#p/toriel}{#f/0}* No hay nada como el canto de ese intrépido pajarillo.',
                    '<25>{#f/1}* Incluso cuando aún vivía dentro de un cubo de agua...',
                    '<25>{#f/1}* Volaría con sus pequeñas y poderosas alas...',
                    '<25>{#f/1}* Llevándonos a lugares...',
                    '<25>{#f/0}* Use sus servicios para llevar las compras de vez en cuando.',
                    '<25>{#f/5}* ... cuando todos nosotros, como especie, vivíamos en esa vieja fábrica.'
                ]
                : [
                    '<25>{#p/toriel}{#f/5}* Las cosas suenan muy silenciosas donde estás...',
                    '<25>{#f/5}* Casi como si faltara algo.',
                    '<25>{#f/5}* Algo importante...',
                    '<25>{#f/0}* Bueno, no importa.\n* Mi imaginación se pone loca a veces.',
                    '<25>{#f/1}* ...',
                    '<25>{#f/1}* Chirrido, Chirrido, Chirrido, Chirrido, Chirrido...'
                ],
        f_taxi: [
            "<25>{#p/toriel}{#f/1}* ¿Así que hallaste la parada de taxis de la fábrica...?",
            '<25>{#f/0}* Tal vez puedas usarlo para escapar de la capitán de la Guardia Real.',
            '<25>{#f/1}* Un visitante aquí habló una vez de su obsesión con las lanzas...',
            '<25>{#f/0}* Qué raro.\n* Al capitán que conocí le gustaban los sables.'
        ],
        f_battle: [
            '<25>{#p/toriel}{#f/0}* Ah, ahí estas.',
            "<25>{#f/0}* Estás en el límite de la fábrica.",
            '<26>{#f/1}* A partir de ahora, no sé lo que te espera ahí adelante...',
            '<25>{#f/5}* Antes de irme, sólo había un ascensor a la Capital.',
            '<25>{#f/1}* Ahora, sin embargo, existe la zona que se llama \"Aerialis...\"',
            '<25>{#f/23}* ... A quién se le ocurrió ESE nombre.'
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

                ? ['<25>{#p/toriel}{#f/3}* ...', '<25>{#f/2}* ¡Vuelve a casa en este instante!']
                : [
                    3 <= SAVE.data.n.cell_insult
                        ? '<25>{#p/toriel}{#f/23}* ¿No estás cansado después de como me trataste?'
                        : SAVE.data.n.state_wastelands_napstablook === 5
                            ? '<25>{#p/toriel}{#f/1}* ¿No estás cansado después de esperar tanto?'
                            : '<25>{#p/toriel}{#f/1}* ¿No estás cansado después de todo lo que pasaste?',
                    3 <= SAVE.data.n.cell_insult
                        ? game.room.startsWith('w_toriel') // NO-TRANSLATE

                            ? '<25>{#f/0}* Deberías ver la habitación que te hice en la sala de invitados.'
                            : '<25>{#f/0}* Deberías ver la cama que te hice en la casa.'
                        : game.room.startsWith('w_toriel') // NO-TRANSLATE

                            ? '<25>{#f/0}* Ven al pasillo, te mostraré algo.'
                            : '<25>{#f/0}* Ven a la casa, te mostraré algo.'
                ],
        c_call_toriel_late: () =>
            SAVE.data.n.plot === 8.1
                ? ['<32>{#p/human}* (Pero la línea estaba ocupada.)']
                : game.room === 'w_bridge' || game.room.startsWith('w_alley') // NO-TRANSLATE

                    ? ['<25>{#p/toriel}{#f/3}* ...', '<25>{#f/2}* ¡Vuelve a casa en este instante!']
                    : [
                        '<25>{#p/toriel}{#f/1}* No es necesario que llames por teléfono, mi niño.',
                        3 <= SAVE.data.n.cell_insult
                            ? '<26>{#f/23}* Ya sabemos en qué tiende a resultar eso.'
                            : game.room === 'w_toriel_living' // NO-TRANSLATE

                                ? toriCheck()
                                    ? '<25>{#f/0}* Después de todo, estoy aquí contigo.'
                                    : '<25>{#f/0}* Terminaré en un momento.'
                                : game.room.startsWith('w_toriel') // NO-TRANSLATE

                                    ? toriCheck()
                                        ? '<25>{#f/0}* Si quieres verme, puedes venir a la sala de estar.'
                                        : '<25>{#f/0}* Si quieres verme, puedes esperar en la sala de estar.'
                                    : '<25>{#f/0}* Si quieres verme, puedes venir a la casa.'
                    ],
        c_call_asriel: () =>
            [
                [
                    "<25>{#p/asriel2}{#f/3}* Solo para que lo sepas, no tomaré eso.",
                    '<25>{#p/asriel2}{#f/4}* Tenemos mejores cosas que hacer.'
                ],
                ['<25>{#p/asriel2}{#f/4}* ...'],
                ['<25>{#p/asriel2}{#f/4}* ... ¿en serio?'],
                ['<25>{#p/asriel2}{#f/3}* Debes estar, REALMENTE aburrido.'],
                []
            ][Math.min(SAVE.flag.n.ga_asrielCall++, 4)]
    },
    s_save_outlands: {
        w_courtyard: {
            name: 'Las Afueras - Patio',
            text: () =>
                SAVE.data.n.plot > 16
                    ? [
                        6 <= world.population
                            ? '<32>{#p/human}* (Incluso visitando esta pequeña casa, te llena de determinación).'
                            : '<32>{#p/human}* (Incluso visitando, esta casa te llena de determinación.)'
                    ]
                    : 6 <= world.population
                        ? ['<32>{#p/human}* (Esta pequeña y linda casa te llena de determinación.)']
                        : ['<32>{#p/human}* (Este pequeño y lindo hogar te llena de determinación.)']
        },
        w_entrance: {
            name: 'Las Afueras - Entrada',
            text: () =>
                world.runaway
                    ? [
                        '<32>{#p/human}* (Las Afueras guardando silencio, te llena de determinación.)',
                        '<32>{#p/human}* (PS restaurados.)'
                    ]
                    : SAVE.data.n.plot < 48
                        ? [
                            '<32>{#p/human}* (Las Afueras están delante, te llenan de determinación.)',
                            '<32>{#p/human}* (PS restaurados.)'
                        ]
                        : [
                            '<32>{#p/human}* (Volviendo a donde todo comenzó, después de tanto...)',
                            '<32>{#p/human}* (Esto te llena de determinación.)',
                            '<32>{#p/human}* (PS restaurados.)'
                        ]
        },
        w_froggit: {
            name: 'Las Afueras - Descanso',
            text: () =>
                SAVE.data.n.state_wastelands_toriel === 2 || world.runaway || roomKills().w_froggit > 0
                    ? SAVE.data.n.plot < 8.1
                        ? [
                            '<32>{#p/human}* (El aire se hace vicioso.)\n* (De cierta forma, te llena de determinación.)',
                            '<32>{#p/human}* (PS restaurados.)'
                        ]
                        : [
                            '<32>{#p/human}* (El aire se secó del todo.)\n* (De hecho, esto te llena de determinación.)',
                            '<32>{#p/human}* (PS restaurados.)'
                        ]
                    : SAVE.data.b.svr
                        ? [
                            '<32>{#p/human}* (La zona fue abandonada, pero el aire sigue fresco.)',
                            '<32>{#p/human}* (Esto, por supuesto, te llena de determinación.)',
                            '<32>{#p/human}* (PS restaurados.)'
                        ]
                        : [
                            '<32>{#p/human}* (La vista de raras y hermosas criaturas te llena de determinación.)',
                            '<32>{#p/human}* (PS restaurados.)'
                        ]
        },
        w_mouse: {
            name: 'Afueras - Ratónestrellera',
            text: () =>
                world.population > 5 && !SAVE.data.b.svr && !world.runaway
                    ? [
                        '<32>{#p/human}* (Sabiendo que el ratónestrella saldrá un día...)',
                        '<32>{#p/human}* (El pensamiento te llena de determinación.)'
                    ]
                    : [
                        '<32>{#p/human}* (Incluso si el ratónestrella no sale de nuevo...)',
                        '<32>{#p/human}* (La situación te llena de determinación.)'
                    ]
        },
        w_start: {
            name: 'Zona de Choque',
            text: []
        }
    }
};


// END-TRANSLATE
