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
   saver,
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
              '<25>{#f/1}* Cuando escuché acerca de ello, demo admitir, estaba sorprendida...',
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
         '<32>{#p/basic}* Hay una puerta aquí.\n* Está cerrada',
         ...(SAVE.data.b.oops ? [] : [ "<32>{#p/basic}* ¿Puede que haya una llave en algún lugar...?" ])
      ],
      secret2: [ '<32>{#p/human}* (Usas la llave secreta.)' ],
      exit: () => [ choicer.create('* (Abandonar las Afueras?)', 'Si', 'No') ],
      nosleep: [ '<32>{#p/human}* (Parece que algo te ha interrumpido el sueño.)' ],
      noequip: [ '<32>{#p/human}* (Decides no equiparlo)' ],
      finaltext: {
         a: [ "<32>{#p/basic}* El tiene que estar por aquí, en algún lado..." ],
         b: [ '<32>{#p/basic}* eh...?', '<32>{#p/basic}* ¿Eso es... El?\n* ¿Ahí fuera?' ],
         c: [
            "<32>{#p/basic}* ... es el.",
            "<32>* ...\n* Frisk, si estas listo...",
            "<32>* Si has visto a todos los que quieres ver...",
            '<32>* ...',
            '<32>* Ya sabes que hacer.',
            "<32>* De lo contrario, esperaré hasta que estés listo."
         ],
         d1: [ '<32>{#p/basic}* Asriel.' ],
         d2: [ '<25>{#p/asriel1}{#f/13}* ¿... Frisk?\n* ¿Eres tu...?' ],
         d3: [ "<32>{#p/basic}* Asriel, soy yo...", '<32>{#p/basic}* Tu mejor amigo, ¿te acuerdas?' ],
         d4: [
            '<25>{#p/asriel1}{#f/25}* ¡...!',
            '<25>{#f/25}* ¿$(name)...?',
            "<25>{#f/13}* Pero... Estas...",
            "<25>{#f/23}* ... estas..."
         ],
         d5: [ '<32>{#p/basic}* ¿Muerto?' ],
         d6: [
            '<32>{#p/basic}* Je.\n* Durante ya un tiempo... Parte de mi deseó estarlo.',
            '<32>{#p/basic}* Después de lo que te hice, yo...\n* Sentí que me lo merecía.'
         ],
         d7: [ "<25>{#p/asriel1}{#f/7}* No digas eso, $(name)!", "<25>{#f/6}* ... Te equivocas!" ],
         d8: [
            '<33>{#p/basic}* Jaja... mira quien habla.\n* Mister \"solo veo y estoy con gente que te ama.\"',
            '<32>* Pero te mereces saber la verdad sobre mi, Asriel...',
            '<32>* Sobre , todo.'
         ],
         d9: [ '<25>{#p/asriel1}{#f/23}* ...', '<25>{#f/23}* $(name)...' ],
         d10: [ '<25>{#p/asriel1}{#f/13}* Pero...', '<25>{#f/15}* Como estas aun...?' ],
         d11: [
            '<32>{#p/basic}* ... eso importa?',
            '<32>* Acertaste con olvidarte de mi de la manera que hiciste atrás.',
            "<32>* Lo cierto es... que he sido una persona terrible...",
            "<32>* Y no soy el amigo , o el hermano que desearías haber tenido."
         ],
         d12: [ '<25>{#p/asriel1}{#f/13}* $(name), Yo...' ],
         d13: [ "<32>{#p/basic}* Esta bien, Asriel.", "<32>* No tienes que hacerlo para que sea mejor de lo que es." ],
         d14: [ '<25>{#p/asriel1}{#f/22}* ...', '<25>{#f/22}* ... Por que ahora?' ],
         d15: [
            '<32>{#p/basic}* Bueno...',
            '<32>* Siempre pensé que la humanidad estaba al borde de la redención.',
            '<32>* Que, da igual lo que...',
            '<32>* Si fueras humano... estarías destinado a caer en la oscuridad.',
            '<32>* Pero después de seguir a Frisk a lo largo de su camino...',
            '<32>* Ya entiendo la verdad.',
            '<32>* Los otros humanos... siempre hicieron algo que me hizo fácil ignorar la verdad.',
            "<33>* Atacan a personas, o peor, las hacen... desaparecer.",
            '<32>*  Pero , Frisk no.',
            '<32>* No importa la dificultad que se le encuentre, mostró amabilidad y piedad en cada movimiento.',
            '<32>* Me... callo la boca.',
            "<32>* Y ahora, por eso, se que no hay excusa de la manera en que te he tratado.",
            '<32>* Todo por lo que tuviste que pasar, todo lo que perdiste...',
            "<32>* Soy al que deberían acusar de ello."
         ],
         d16: [ '<25>{#p/asriel1}{#f/13}* $(name)...', '<25>{#f/15}* Has estado consciente todo este tiempo?' ],
         d17: [
            '<32>{#p/basic}* ... si.\n* Supongo que si.',
            '<32>* Esta ha sido mi existencia, Asriel...\n* Desde que morimos.',
            "<32>* Y... hay otra cosa que debo decirte."
         ],
         d18: [ '<25>{#p/asriel1}{#f/21}* El que?' ],
         d19: [
            '<32>{#p/basic}* ¿Te acuerdas cuando cruzamos el campo de fuerza juntos?',
            '<32>* ¿Cuando llegamos a las ruinas del viejo planeta natal, y nos encontraron esos humanos?',
            '<32>* Quería usar nuestro poder para destruirlos... pero me detuviste, ¿recuerdas?'
         ],
         d20: [ '<25>{#p/asriel1}{#f/16}* ... correcto.' ],
         d21: [
            "<32>{#p/basic}* No lo entendí en aquellos tiempos, pero...",
            '­<32>* Lo entiendo ahora.',
            '<32>* ... solo estabas intentando pararme... de hacer un error terrible.'
         ],
         d22: [ '<25>{#p/asriel1}{#f/15}* $(name)...' ],
         d23: [
            "<32>{#p/basic}* Si no fuera por ti, la estación espacial habría sido destruido en una segunda guerra.",
            '<32>* Si no fuera por ti, los mismos monstruos que supuestamente intentaba salvar...',
            '<32>* ... habrían muerto junto a nosotros.'
         ],
         d24: [ '<25>{#p/asriel1}{#f/25}* $(name), Yo...' ],
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
         d28: [ '<25>{#p/asriel1}{#f/13}* ... lo sigo haciendo.' ],
         d29: [
            "<32>{#p/basic}* He pasado los últimos cien años hundiéndome en mi autocompasión.",
            "<32>* He pasado los últimos cien años aguantando un rencor que nunca debería haber tenido.",
            '<32>* En todo ese tiempo, me preguntaba que me mantenía vivo...',
            '<32>* Y ahora, finalmente se la respuesta.'
         ],
         d30: [ '<25>{#p/asriel1}{#f/15}* ¿...?' ],
         d31: [ "<32>{#p/basic}* ... eres tú, Asriel.", "<32>* Tú eres quien me mantenía con vida." ],
         d32: [
            '<32>{#p/basic}* Piensa en ello como... una promesa incumplida.',
            '<32>* Aguantando ese rencor... pensando sobre ti en la forma en que lo hice...',
            "<32>* Sabiendo que podría haber sido mucho más para ti de lo que fui.",
            "<32>* Todo este tiempo, eso es lo que me ha estado echando atrás."
         ],
         d33: [ '<25>{#p/asriel1}{#f/23}* $(name)...' ],
         d34: [ '<32>{#p/basic}* Asriel.\n* Mi hermano.', '<32>* Deseas saber la verdad.' ],
         d35: [ '<25>{*}{#p/asriel1}{#f/25}* ¿Eh?\n* Pero tu ya has- {%}' ],
         d36: [ '<32>{#p/basic}* Te perdono a ti, también.' ],
         d37: [ '<25>{#p/asriel1}{#f/30}{#i/4}* ¡...!', '<25>{#p/asriel1}{#f/26}{#i/4}* $(name)...' ],
         d38: [ '<32>{#p/basic}* Shh...', "<32>* Está bien.", "<32>* Estoy aquí, ¿vale?" ],
         d39: [ '<25>{#p/asriel1}{#f/25}{#i/4}* Yo...' ],
         d40: [ "<32>{#p/basic}* Estoy aquí, Asriel." ],
         d41: [
            '<32>{#p/basic}* ... puedo sentirlo.',
            '<32>* Aunque hayan pasado cien años...',
            "<32>* Él todavía está aquí, ¿no?",
            '<32>* Como un pequeño angel...',
            '<32>* Mirándome, protegiéndome de mis propias malas deciosiones...',
            '<32>* ... todo para que un día yo pueda devolverle el favor.'
         ],
         d42: [ "<32>{#p/basic}* Todo empieza a tener sentido ahora.", '<32>* Sé lo que tengo que hacer.' ],
         d43: [ '<25>{*}{#p/asriel1}{#f/25}* ¿Eh?\n* ¿Qué estás... {^60}{%}' ],
         d44: [ '<25>{*}{#f/25}* ¡No...!{^60}{%}', '<25>{*}{#f/26}* ¡D... déjame ir!{^60}{%}' ],
         d45: [ '<32>{*}{#p/basic}* Je...{^60}{%}', '<32>{*}* ... cuida de mamá y papá por mi, ¿vale?{^60}{%}' ],
         d46: [ '<25>{#p/asriel1}{#f/25}* Frisk, ¿estás ahí?', '<25>{#f/22}* Por favor... despierta...' ],
         d47: [ "<25>{#p/asriel1}{#f/23}* Yo...\n* No quiero perderte a ti también..." ],
         d48: [ '<25>{#p/asriel1}{#f/17}* ... ahí estás.' ],
         d49: [
            "<25>{#p/asriel1}{#f/23}* Ja... pensé que te perdí por un minuto.",
            "<25>{#f/22}* No me asustes así otra vez, ¿vale?",
            '<25>{#f/13}* ...'
         ],
         d50: [
            '<25>{#p/asriel1}{#f/13}* Bueno...\n* Tengo mi ALMA de nuevo dentro de mi ahora.',
            '<25>{#f/15}* La original.',
            '<25>{#f/16}* ...',
            "<26>{#f/16}* Cuando $(name) y yo morimos, él debería haberse envuelto sobre mí...",
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
            '<25>{#f/13}* ...\n* La cosa es...\n* Si me quedo aquí ahora...',
            "<25>{#f/15}* No sería justo para $(name)... ¿sabes?",
            '<25>{#f/13}* Y además, con mi ALMA devuelta dentro de mi...',
            "<25>{#f/13}* No volveré a ser una estrella.",
            "<25>{#f/13}* Así que... no hay motivo para que esté aquí."
         ],
         d52: [
            '<25>{#p/asriel1}{#f/17}* Bueno.\n* Mejor pongámonos en marcha.',
            '<25>{#f/20}* Tus amigos probablemente esten preocupados por ti ahora.'
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
               ? [ "<25>{#f/22}* Aunque no me hayas podido perdonar por lo que he hecho..." ]
               : SAVE.flag.n.killed_sans > 0
               ? [ '<25>{#f/22}* Aunque quería que hicieras esas cosas terribles...' ]
               : [ '<25>{#f/22}* Aunque te torturé, y amenacé a todos los que amas...' ]),
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
      evac: [ '<32>{#p/human}* (Sientes la presencia de monstruo cercana menguar.)' ],
      stargum1: () =>
         SAVE.data.b.svr
            ? [
                 '<32>{#p/human}* (Ves un trozo de chicle pegado en la portada del comic...)',
                 choicer.create('* (¿Masticar el chicle?)', 'Si', 'No')
              ]
            : [
                 '<32>{#p/basic}* Había un trozo de chicle pegado en la portada del comic.',
                 choicer.create('* (¿Masticar el chicle?)', 'Si', 'No')
              ],
      stargum2: [ '<32>{#p/human}* (Decidiste no masticar.)' ],
      stargum3: [ '<32>{#p/human}* (Has recuperado $(x) PV.)' ],
      stargum4: [ '<32>{#p/human}* (PV restaurados.)' ],
      fireplace1: () =>
         SAVE.data.b.svr
            ? [
                 '<32>{#p/human}* (Sientes la calidez acogedora de la chimenea...)',
                 choicer.create('* (¿Entrar?)', 'Si', 'No')
              ]
            : [
                 SAVE.data.n.state_wastelands_toriel === 2 || world.runaway
                    ? '<32>{#p/basic}* Una chimenea normal y corriente.'
                    : "<32>{#p/basic}* La chimenea de Toriel.\n* No es demasiado caliente, solo agradablemente cálido.",
                 ...(world.darker
                    ? []
                    : [ '<32>* Probablemente podrías entrar.', choicer.create('* (¿Entrar?)', 'Si', 'No') ])
              ],
      fireplace2a: [ '<32>{#p/human}* (Decides no entrar.)' ],
      fireplace2b: () => [
         '<32>{#p/human}* (Te metes en la chimenea y dejas que su calor te envuelva.)',
         '<32>{#p/human}* (Estás muy confortable.)',
         ...(SAVE.data.b.svr
            ? asrielinter.fireplace2b++ < 1
               ? [ "<25>{#p/asriel1}{#f/13}* Yo solo, eh, esperaré a que salgas." ]
               : []
            : world.goatbro && SAVE.flag.n.ga_asrielFireplace++ < 1
            ? [ "<25>{#p/asriel2}{#f/15}* Yo solo, eh, esperaré a que salgas..." ]
            : [])
      ],
      fireplace2c: [ "<25>{#p/toriel}{#f/1}{#npc/a}* No estés ahí mucho tiempo..." ],
      fireplace2d: [ '<32>{#p/basic}* ...', '<32>* Esto está bien.' ],
      noticereturn: [ '<25>{#p/asriel2}{#f/10}* ¿Te has dejado algo allí?' ],
      noticestart: [
         '<25>{#p/asriel2}{#f/3}* Ah, el sitio donde todo comenzó.',
         "<25>{#p/asriel2}{#f/4}* Ciertamente nos llevamos mejor desde entonces, ¿no, $(name)?"
      ],
      noticedummy: [ '<25>{#p/asriel2}{#f/3}* ...', "<25>{#p/asriel2}{#f/10}* ¿No había un maniquí aquí antes?" ],
      afrog: {
         a: [
            '<32>{#p/basic}{#n1}* Entre tú y yo...',
            '<32>* Vi a esa señora cabra pasar por aquí hace poco tiempo.',
            '<32>* Tenía chuches, así que le pregunté para que eran, y...',
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
         d: [ '<32>{#p/basic}{#n1}* ¡No... no!', '<32>* ¡A-Aléjate de mí!' ]
      },
      asriel0: [
         "<25>{#p/asriel2}{#f/5}* ... pero eso esta bien, ¡sé qué estarás allí a tiempo!",
         "<25>{#p/asriel2}{#f/1}* No querrás abandonarme, ¿no?"
      ],
      asriel1: () =>
         [
            [
               "<25>{#p/asriel2}{#f/2}* Perdón por eso, tuve que usar el teléfono de Toriel para llamar a alguien.",
               "<25>{#p/asriel2}{#f/1}* No te preocupes...\n* Verás porque dentro de poco.",
               "<25>{#p/asriel2}{#f/2}* ... jee jee jee.\n* Te esperaré adelante."
            ],
            [ "<25>{#p/asriel2}{#f/4}* Te esperaré adelante." ],
            [ '<25>{#p/asriel2}{#f/3}* ...' ]
         ][Math.min(SAVE.flag.n.ga_asrielNegative1++, 1)],
      asriel2: () => [
         '<25>{#p/asriel2}{#f/1}* ¿Listo, $(name)?',
         "<25>{#f/2}* Porque cuando continuemos, no hay vuelta atrás.",
         choicer.create('* (¿Seguirle?)', 'Si', 'No')
      ],
      asriel2b: () => [ '<25>{#p/asriel2}{#f/1}* ¿Listo?', choicer.create('* (¿Seguirle?)', 'Si', 'No') ],
      asriel3: [ '<25>{#p/asriel2}{#f/2}* Vale...', "<25>{#f/1}* Hagamos esto." ],
      asriel4: [ "<25>{#p/asriel2}{#f/4}* Te estaré esperando, entonces." ],
      asrielDiary: [
         [
            '<32>{#p/human}* (Lees la primera página... apenas se pueden leer las palabras.)',
            '<32>{#p/asriel1}{#v/2}* \"estoy empezando un diario Porq mami dijo que seria divertido.\"',
            '<32>* \"hoy aprendi a plantar semillas en el jardin de papi\"',
            '<32>* \"el dijo que creceran pronto Pero tardara mucho tiemp.\"',
            '<32>* \"mami va a hacer pastel de caracoles de noche Y estoy emosionado\"',
            '<32>* \"a parte de eso estoy pasando un buen dia.\"'
         ],
         [
            '<32>{#p/human}* (Pasas a la segunda página...)',
            '<32>{#p/asriel1}{#v/2}* \"diario de azzy, k-504\"',
            '<32>* \"mami dijo que devo escrivir la fecha Para que gente sabra cuando lo escrivi.\"',
            '<32>* \"mi flor estornino aun no cresio pero papi promete que lo ara pronto\"',
            '<32>* \"me gustaria que hubiera una ventana en mi habitación pero papi dijo que hay tuberias aqui.\"',
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
            '<32>* \"Vale me estoy escondiendo debajo de las sábanas para que $(name) no estropeé lo que escribo.\"',
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
            ...(SAVE.data.b.svr ? [] : [ "<32>{#p/basic}* Hay una mochila colgada en este perchero." ]),
            '<32>{#p/human}* (Miras dentro de la mochila...)',
            ...(SAVE.data.b.svr
               ? [ '<32>{#p/human}* (Pero no había nada más que encontrar dentro.)' ]
               : [ '<32>{#p/basic}* Nada más que encontrar aquí..' ])
         ],
         b: () => [
            ...(SAVE.data.b.svr ? [] : [ "<32>{#p/basic}* Hay una mochila colgada en este perchero." ]),
            '<32>{#p/human}* (Miras dentro de la mochila...)',
            ...(SAVE.data.b.svr
               ? []
               : [ "<32>{#p/basic}* ¿Qué es eso?\n* ¿Un comic edición limitada de Super Starwalker?" ]),
            '<32>{#s/equip}{#p/human}* (Conseguiste Super Starwalker 2.)'
         ],
         b2: () => [
            ...(SAVE.data.b.svr ? [] : [ "<32>{#p/basic}* Hay una mochila colgada en este perchero." ]),
            '<32>{#p/human}* (Miras dentro de la mochila...)',
            ...(SAVE.data.b.svr
               ? []
               : [ "<32>{#p/basic}* ¿Qué es eso?\n* ¿Un comic edición limitada de Super Starwalker?" ]),
            "<32>{#p/human}* (Llevas demasiado encima para tomar eso.)"
         ]
      },
      midsleep: () => [
         '<32>{#p/human}* (Si duermes aquí ahora, podrás perderte algo importante.)',
         choicer.create('* (¿Dormir?)', 'Si', 'No')
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
         choicer.create('* (¿Intentar pasar a través de él?)', 'Si', 'No')
      ],
      blooky2: () => [
         '<32>{#p/basic}* El fantasma aún está bloqueando el camino.',
         choicer.create('* (¿Intentar pasar a través de él?)', 'Si', 'No')
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
         "<32>* bueno, me voy a ir yendo ahora",
         '<32>* adios...'
      ],
      blooky6: [
         '<32>{#p/napstablook}* entoncs um... paso eso...',
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
      breakfast: [ '<32>{#p/human}* (Conseguiste los Caracoles Fritos.)' ],
      breakslow: [ "<32>{#p/human}* (Llevas demasiado encima para tomar eso.)" ],
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
      candy2: [ '<32>{#p/human}* (Conseguiste el $(x).)\n* (Pulsa [C] para abrir el menú.)' ],
      candy3: [ '<32>{#p/human}* (Conseguiste $(x).)' ],
      candy4: () => [
         '<32>{#p/human}* (Conseguiste $(x).)',
         ...(SAVE.data.b.svr ? [] : [ '<32>{#p/basic}* La máquina está empezando a malfuncionar.' ])
      ],
      candy5: () => [
         '<32>{#p/human}* (Conseguiste $(x).)',
         ...(SAVE.data.b.svr ? [] : [ '<32>{#p/basic}* La máquina se ha roto.' ])
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
                 [ '<26>{#p/asriel1}{#f/20}* ... preguntando por un amigo.' ]
              ][Math.min(asrielinter.candy6++, 3)]
            : [ "<32>{#p/basic}* Está fuera de servicio." ],
      candy7: [ '<32>{#p/human}* (Decides no hacer nada.)' ],
      candy8: [ "<32>{#p/human}* (Llevas demasiado encima.)" ],
      chair1a: () => [
         '<25>{#p/toriel}{#f/1}{#n1}* ¿Qué pasa, mi niño?\n* ¿Tienes hambre?',
         '<25>{#f/0}* Quizás te gustaría saber más sobre el libro que estoy leyendo.',
         choicer.create('{#n1!}* (¿Qué dices?)', 'Hambre', 'Libro', 'Hogar', 'Nada')
      ],
      chair1b: () => [
         '<25>{#p/toriel}{#n1}* ¿Qué pasa, mi niño?',
         choicer.create('{#n1!}* (¿Qué dices?)', 'Hambre', 'Libro', 'Hogar', 'Nada')
      ],
      chair1c: [ '<25>{#p/toriel}{#n1}* Bueno, déjame saber si necesitas algo.' ],
      chair1d: [ '<25>{#p/toriel}{#n1}* Bueno, déjame saber si cambias de idea.' ],
      chair1e: () => [
         '<25>{#p/toriel}{#f/1}{#n1}* ¿Noche inquieta?',
         '<25>{#f/1}* ...\n* Si quieres, te puedo leer este libro...',
         '<25>{#f/0}* Se llama \"Monstruo Generoso\" y fue escrito por un humano.',
         choicer.create('{#n1!}* (¿Leer el libro?)', 'Si', 'No')
      ],
      chair1f: pager.create(
         0,
         [ '<25>{#p/toriel}{#n1}{#f/1}* ¿De vuelta para una visita?', '<25>{#f/0}* Buena, quédate libre estar todo el tiempo que quieras.' ],
         [ '<26>{#p/toriel}{#n1}{#f/5}* Debo quedarme aquí, como siempre hice...' ]
      ),
      chair2a1: () => [
         '<25>{#p/toriel}{#f/1}{#n1}* ¿Tienes hambre?\n* ¿Te gustaría que hiciera el desayuno?',
         choicer.create('{#n1!}* (¿Desayunar?)', 'Si', 'No')
      ],
      chair2a2: [ '<25>{#p/toriel}{#n1}* ¡Perfecto!\n* Estaré en la cocina preparándolo.' ],
      chair2a3: () => [
         '<25>{#p/toriel}{#f/1}{#n1}* ¿Has cambiado de idea sobre el desayuno?',
         choicer.create('{#n1!}* (¿Desayunar?)', 'Si', 'No')
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
         choicer.create('{#n1!}* (¿Leer el libro?)', 'Si', 'No')
      ],
      chair2c2: [ '<25>{#p/toriel}{#n1}* ¡Esplendido!', '<25>{#g/torielCompassionSmile}* ...' ],
      chair2c3: () => [
         '<25>{#p/toriel}{#f/1}{#n1}* ¿Quieres que te lea el libro ahora?',
         choicer.create('{#n1!}* (¿Leer el libro?)', 'Si', 'No')
      ],
      chair2c4: () => [
         '<25>{#p/toriel}{#f/1}{#n1}* ¿Quieres que te lea el libro de nuevo?',
         choicer.create('{#n1!}* (¿Leer el libro?)', 'Si', 'No')
      ],
      chair2c5: [ '<25>{#p/toriel}{#f/1}{#n1}* Esta bien, entonces...', '<25>{#p/toriel}{#g/torielCompassionSmile}* ...' ],
      chair2c6: [
         '<25>{#f/1}{#n1}* \"Había una vez una monstruo...\"',
         '<25>{#f/0}* \"Y ella amo a un pequeño humano.\"',
         '<25>{#f/1}* \"Y cada día, el humano la visitaba...\"',
         '<25>{#f/0}* \"Y ellos corrían y jugaban juntos en los campos.\"',
         '<25>{#f/1}* \"Ellos cantaban canciones juntos, se contaban historias...\"',
         '<25>{#f/0}* \"Y ellos jugaban al escondite.\"',
         '<25>{#f/1}* \"Y cuando el humano estaba cansado, ella lo metía en la cama...\"',
         '<25>{#f/0}* \"Y el humano amaba a la monstruo muchísimo.\"',
         '<25>{#f/0}* \"Y la monstruo estaba feliz\"',
         '<25>{#f/1}* \"Pero a medida que pasaba el tiempo, y el humano crecía...\"',
         '<25>{#f/0}* \"La monstruo a menudo se quedaba sola.\"',
         '<25>{#f/1}* \"Entonces un día, el humano regreso...\"',
         '<25>{#f/0}* \"Y la monstruo dijo \'¡Vamos, humano, ven y juega!\'\"',
         '<25>{#f/5}* \"\'Soy muy grande para jugar,\' dijo el humano.\"',
         '<25>{#f/1}* \"\'Quiero conducir, encontrar un nuevo hogar...\'\"',
         "<25>{#f/5}* \"'Perdón,' dijo la monstruo, 'pero soy muy pobre para tener un auto.'\"",
         '<25>{#f/5}* \"\'Todo lo que tengo son mis 2 pies.\'\"',
         '<25>{#f/0}* \"\'Súbete a mi espalda y puedo llevarte a donde quieras ir.\'\"',
         '<25>{#f/0}* \"\'Así puede ver la ciudad y estar feliz.\'\"',
         '<25>{#f/1}* \"Así que el humano se subió a la espalda de la monstruo...\"',
         '<25>{#f/0}* \"Y la monstruo lo llevo a un nuevo hogar.\"',
         '<25>{#f/0}* \"Y la monstruo estaba feliz\"',
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
         '<25>{#f/0}* \"Y la monstruo estaba feliz\"',
         '<25>{#f/5}* \"Pero el humano se alejo por un largo tiempo\"',
         '<25>{#f/1}* \"Cuando el humano regreso, la monstruo estaba muy feliz...\"',
         '<25>{#f/9}* \"Ella apenas podía hablar.\"',
         '<25>{#f/1}* \"\'Ven, humano,\' ella susurro...\"',
         '<25>{#f/1}* \"\'Ven a visitarme.\'\"',
         '<25>{#f/5}* \"\'Estoy demasiado viejo y ocupado para visitarte,\' dijo el humano.\"',
         '<25>{#f/1}* \"\'Quiero un lugar para descansar por la noche...\'\"',
         "<25>{#f/5}* \"'Perdón,' dijo la monstruo, 'pero no tengo una cama de tu tamaño.'\"",
         '<25>{#f/5}* \"\'Aún soy demasiado pobre pata tener una.\'\"',
         '<25>{#f/0}* \"\'Duerme conmigo por la noche.\'\"',
         '<25>{#f/0}* \"\'Así puedes descansar un poco y ser feliz.\'\"',
         '<25>{#f/1}* \"Y así el humano y la monstruo se acurrucaron juntos...\"',
         '<25>{#f/0}* \"Y la monstruo pudo poner al humano a dormir.\"',
         '<25>{#f/0}* \"Y la monstruo estaba feliz\"',
         '<25>{#f/5}* \"... pero en realidad no.\"',
         '<25>{#f/9}* \"Y después de un largo tiempo, el humano regreso de nuevo.\"',
         "<25>{#f/5}* \"'Lo siento mucho, humano,' dijo la monstruo, 'pero he caído.'\"",
         '<25>{#f/5}* \"\'Me fallan las piernas, No puedo llevarte a ninguna parte.\'\"',
         '<25>{#f/10}* \"\'No hay ningún lugar donde quiera,\' dijo el humano.\"',
         '<26>{#f/5}* \"\'No te puedo encontrar una cita, No conozco a nadie\' dijo la monstruo.\"',
         '<25>{#f/10}* \"\'No hay nadie más con quien quiera estar,\' dijo el humano.\"',
         '<25>{#f/5}* \"\'Estoy demasiado débil para que duermas sobre mí\', dijo la monstruo.\"',
         '<25>{#f/10}* \"\'Ya no necesito dormir más,\' dijo el humano.\"',
         "<25>{#f/5}* \"'Yo lo siento,' suspiro la monstruo.",
         '<25>{#f/5}* \"\'Desearía tener algo para ofrecerte, pero ya no tengo nada.\'\"',
         '<25>{#f/9}* \"\'Solo soy una vieja monstruo aproximándose a su muerte.\'\"',
         '<25>{#f/5}* \"\'Yo lo siento...\'\"',
         '<25>{#f/10}* \"\'Ya no necesito nada más,\' dijo el humano.\"',
         '<25>{#f/10}* \"\'Solo un abrazo de mi mejor amiga antes de que yo muera.\'\"',
         '<25>{#f/1}* \"\'Bueno,\' dijo la monstruo, enderezando su postura...\"',
         '<25>{#f/0}* \"\'Bueno, una vieja monstruo siempre esta aquí para eso.\'\"',
         '<25>{#f/0}* \"\'Vamos, humano, ven hacía mi. Quédate conmigo una ultima vez.\'\"',
         '<25>{#f/9}* \"Y así lo hizo el humano.\"',
         '<25>{#f/10}* \"Y la monstruo estaba feliz.\"'
         
      ],
      chair2c7: [ '<25>{#f/0}{#n1}* Bueno, esa fue la historia.', '<25>{#f/1}* Espero que te haya gustado...' ],
      chair2c8: [ '<25>{#f/0}{#n1}* Bueno, eso es todo.' ],
      chair2d1: [
         '<25>{#p/toriel}{#f/1}{#n1}* ¿Hogar...?\n* Podrías ser un poco más especifico?',
         '<99>{#p/human}{#n1!}* (¿Qué dices?){!}\n§shift=48§Never§shift=72§Cuando puedo yo\n§shift=48§mind§shift=80§irme a mi hogar?{#c/0/6/4}'
      ],
      chair2d2: [
         '<25>{#p/toriel}{#f/1}{#n1}* Pero... este es tu hogar ahora, ¿no es así?',
         '<99>{#p/human}{#n1!}* (¿Qué dices?){!}\n§shift=144§Como salir\n§shift=64§Sorry§shift=40§de las Afueras{#c/0/8/2}'
      ],
      chair2d3: [
         '<25>{#p/toriel}{#f/5}{#n1}* Por favor, trata de entender...',
         '<25>{#p/toriel}{#f/9}* Solo quiero lo mejor para ti.'
      ],
      chair2d4: [
         '<25>{#p/toriel}{#f/5}{#n1}* Mi niño...',
         '<99>{#p/human}{#n1!}* (¿Qué dices?){!}\n§shift=144§Como salir\n§shift=64§Sorry§shift=40§de las Afueras{#c/0/8/2}'
      ],
      chair2d5: [ '<25>{#p/toriel}{#f/5}{#n1}* ...' ],
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
                 [ "<25>{#p/asriel1}{#f/23}* Lo que daría por tener una vida sencilla." ]
              ][Math.min(asrielinter.chair3++, 3)]
            : world.darker
            ? [ '<32>{#p/basic}* Una silla para leer.' ]
            : [ '<32>{#p/basic}* Una cómoda silla para leer...', '<32>* Parece del tamaño perfecto para Toriel.' ],
      chair4: [ '<25>{#p/toriel}{#n1}* Ah, ahí estas.', '<25>* Te deje tu desayuno en la mesa para ti.' ],
      closetrocket: {
         a: () => [
            '<32>{#p/human}* (Miras adentro del armario..)',
            ...(SAVE.data.b.svr
               ? [
                    [
                       "<25>{#p/asriel1}{#f/13}* Si, eh, eso es todo lo que puedes encontrar ahí.",
                       "<25>{#f/17}* No estoy seguro de porque Toriel puso esto aquí.",
                       '<25>{#f/17}* $(name) y yo nunca estuvimos interesados en los comics.'
                    ],
                    [ '<25>{#p/asriel1}{#f/10}* ¿Supongo que ella solo quiere pretender que vivimos aquí...?' ],
                    [ '<25>{#p/asriel1}{#f/13}* Las cosas que hace una madre para sentirse mejor...' ]
                 ][Math.min(asrielinter.closetrocket_a++, 2)]
               : [ '<32>{#p/basic}* Nada más que encontrar aquí..' ])
         ],
         b: () => [
            '<32>{#p/human}* (Miras adentro del armario..)',
            ...(SAVE.data.b.svr
               ? []
               : [ "<32>{#p/basic}* ¿Qué es eso?\n* ¿Un comic edición limitada de Super Starwalker?" ]),
            '<32>{#s/equip}{#p/human}* (Conseguiste Super Starwalker 3.)'
         ],
         b2: () => [
            '<32>{#p/human}* (Miras adentro del armario..)',
            ...(SAVE.data.b.svr
               ? []
               : [ "<32>{#p/basic}* ¿Qué es eso?\n* ¿Un comic edición limitada de Super Starwalker?" ]),
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
               ? [ '<32>* Habiendo dicho eso...', "<32>* Parece que no fue suficiente para satisfacer tu... curiosidad." ]
               : [ '<32>* Dime...', '<32>* Eso no despierta tu... curiosidad?' ]
      },
      danger_puzzle1: () => [
         '<25>{#p/toriel}* En esta habitación hay un nuevo tipo de puzzle.',
         [ 1, 5 ].includes(SAVE.data.n.state_wastelands_dummy)
            ? '<25>{#f/3}* Quizá te vaya mejor aquí que con el maniquí.'
            : '<25>{#f/1}* ¿Crees que puedas resolverlo?'
      ],
      danger_puzzle2: () =>
         world.darker
            ? [ "<32>{#p/basic}* Esta muy alto para que puedas alcanzarlo." ]
            : [ "<32>{#p/basic}* La asombrosa altura de esta terminal se eleva sobre ti, bloqueando tu ansiosa aproximación." ],
      danger_puzzle3: () => [
         [ 1, 5 ].includes(SAVE.data.n.state_wastelands_dummy)
            ? '<25>{#p/toriel}{#f/3}* Qué pasa ahora...'
            : '<25>{#p/toriel}{#f/1}* ¿Cuál es el problema?\n* ¿Necesitas ayuda?'
      ],
      danger_puzzle4: () => [
         ...([ 1, 5 ].includes(SAVE.data.n.state_wastelands_dummy)
            ? [ '<25>{#p/toriel}{#f/5}* Ah... ya veo.', '<25>{#f/5}* El terminal está demasiado alto para que puedas alcanzarlo.' ]
            : [
                 '<25>{#p/toriel}{#f/7}* ... oh mi.',
                 '<25>{#f/6}* Parece que hay un error de diseño aquí.',
                 '<25>{#f/5}* ¿Así que el terminal está demasiado alto para que puedas alcanzarlo?'
              ]),
         '<25>{#f/0}* No hay problema.\n* Lo operaré por ti.',
         '<25>{#f/0}* ...',
         '<25>{#f/0}* Aquí hay un acertijo por resolver.\n* ¿Te gustaría resolverlo?',
         choicer.create('* (¿Resolver el acertijo?)', 'Si', 'No')
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
         '<25>{#p/toriel}{#f/0}* ... ah, muy bien.\n* ¡Y con una actitud tan positiva!'
      ],
      danger_puzzle5d: [
         '<32>{#p/human}* (...)\n* (Le dices a Toriel que no sabes la respuesta.)',
         '<25>{#p/toriel}{#f/1}* ... ¿Tienes algún problema?\n* Parece que tienes algo en mente.',
         '<25>{#f/5}* ... hmm...',
         '<25>{#f/0}* Bueno, esta bien.\n* Esta vez te resolveré el acertijo.'
      ],
      danger_puzzle5e: () =>
         [ 1, 5 ].includes(SAVE.data.n.state_wastelands_dummy)
            ? [ '<25>{#p/toriel}{#f/5}* ...', '<25>{#f/5}* Ya veo.' ]
            : [ '<25>{#p/toriel}{#f/0}* ...', '<25>{#f/0}* Supongo que esta vez te puedo resolver el acertijo.' ],
      danger_puzzle6: () => [
         [ 1, 5 ].includes(SAVE.data.n.state_wastelands_dummy) && SAVE.data.b.w_state_riddleskip
            ? '<25>{#p/toriel}{#f/5}* Y... {#x1}ahí.\n* El camino está despejado.'
            : '<25>{#p/toriel}* Y... {#x1}¡ahí!\n* ¡El camino está despejado!'
      ],
      danger_puzzle7: () => [
         [ 1, 5 ].includes(SAVE.data.n.state_wastelands_dummy) && SAVE.data.b.w_state_riddleskip
            ? '<25>{#p/toriel}{#f/5}* Esperaré a que entres en la siguiente habitación.'
            : '<25>{#p/toriel}* Una vez que estés listo, podrás entrar en la siguiente habitación.'
      ],
      danger_puzzle8: () =>
         SAVE.data.b.svr
            ? [ "<32>{#p/human}* (Pero todavía no puedes alcanzar el terminal.)" ]
            : [ '<32>{#p/basic}* Incluso ahora, el terminal sigue tan alto como siempre.' ],
      denie: [ "<32>{#p/human}* (Llevas demasiado encima para tomar eso.)" ],
      dipper: {
         a: () => [
            '<32>{#p/human}* (Conseguiste el Cucharon Pequeño.)',
            choicer.create('* (¿Equiparte el Cucharón Pequeño?)', 'Si', 'No')
         ],
         b: [ "<32>{#p/human}* (Llevas demasiado encima para tomar eso.)" ]
      },
      drop_pie: [ '<25>{#p/toriel}{#f/1}* Las tartas son para comer, no para salpicarlo en el suelo.' ],
      drop_pie3: [ '<25>{#p/toriel}{#f/1}* Por favor no derrames comida en el suelo.' ],
      drop_snails: [ '<25>{#p/toriel}{#f/1}* Qué te han hecho esos pobres caracoles fritos.' ],
      drop_soda: [ "<32>{#p/basic}{#n1}* Aww ¡vamos! ;)", '<32>* ¡Puse mi corazón en eso! ;)' ],
      drop_steak: [ '<32>{#p/basic}{#n1}* ¡¿Enserio!? ;)', '<32>* ¡Ese filete no tenía precio! ;)' ],
      dummy1: [
         '<25>{#p/toriel}{#f/0}* Tu próxima lección implica encuentros con otros monstruos.',
         '<25>{#f/1}* Como eres un humano deambulando por la estación espacial, es probable que te ataquen...',
         '<25>{#f/0}* Si eso pasa, entrarás en lo que se conoce como una PELEA.',
         '<25>{#f/0}* Afortunadamente, hay varias formas de resolver una pelea.',
         '<25>{#f/1}* Por ahora, Te sugiero entablar una conversación amistosa...',
         '<25>{#f/0}* ... dándome así la oportunidad de resolver el conflicto por ti.'
      ],
      dummy2: [ '<25>{#p/toriel}* Para empezar, puedes practicar hablando con el maniquí.' ],
      dummy3: [
         '<25>{#p/toriel}{#f/7}* ... ¿Crees que soy el maniquí?',
         '<25>{#f/6}* ¡Jajaja!\n* ¡Qué adorable!',
         '<25>{#f/0}* Desafortunadamente, no soy más que una señora mayor preocupada.'
      ],
      dummy4: [
         '<25>{#p/toriel}* No hay nada que tener miedo, mi niño.',
         '<25>* Un simple maniquí de entrenamiento no puede lastimarte.'
      ],
      dummy5: [ '<25>{#p/toriel}{#f/1}* Vamos, pequeño...' ],
      dummy6: [
         '<25>{#p/toriel}{#f/2}* ¡Niño, no!\n* ¡El muñeco no esta hecho para pelear!',
         '<25>{#f/1}* Además, no queremos dañar a nadie, ¿verdad?',
         '<25>{#f/0}* Vamos.'
      ],
      dummy7: [ '<25>{#p/toriel}* ¡Excelente!\n* Parece que aprendes muy rápido.' ],
      dummy8: [
         '<25>{#p/toriel}{#f/1}* ¿Tú huiste...?',
         '<25>{#f/0}* De hecho, puede que haya sido una sabia elección.',
         '<26>{#f/1}* Habiendo escapado, evitaste cualquier posible conflicto...',
         '<25>{#f/0}* ... incluso si solo ERA un simple muñeco de entrenamiento.'
      ],
      dummy9: [ '<25>{#p/toriel}{#f/3}* ...', '<25>{#f/4}* ...', '<25>{#f/0}* La siguiente habitación espera.' ],
      dummy9a: [ '<25>{#p/toriel}{#f/3}* ...', '<25>{#f/4}* ...', '<25>{#f/6}* La siguiente habitación espera.' ],
      dummy10: [
         '<25>{#p/toriel}{#f/7}* Mi niño, eso es...',
         '<25>{#f/0}* ... eso es quizás la cosa más adorable que he visto hasta ahora.',
         '<25>{#f/0}* En cualquier caso, manejaste esta lección admirablemente.',
         '<25>{#f/0}* La siguiente habitación espera.'
      ],
      dummy11: [ '<25>{#p/toriel}* La siguiente habitación espera.' ],
      dummy12: [
         '<25>{#p/toriel}{#f/2}* ¡Dios mío, niño!\n* ¡Ten piedad!',
         '<25>{#f/1}* ...',
         '<25>{#f/0}* Afortunadamente, ese solo fue un maniquí de entrenamiento.',
         '<25>{#f/1}* Sin embargo, en el futuro, seria prudente...',
         '<25>{#f/0}* ... ¡No matar a la gente a bofetadas!',
         '<26>{#f/0}* Como sea.\n* La siguiente habitación espera.'
      ],
      eat_pie: [ '<25>{#p/toriel}{#f/1}{#n1}* Delicioso, ¿verdad?' ],
      eat_snails: [ '<25>{#p/toriel}{#f/0}{#n1}* Espero que tu desayuno haya sido suficiente.' ],
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
                         '<25>* La idea de tomar la estación espacial a la fuerza juntos...',
                         "<25>{#f/6}* Pero ahora, no estoy seguro.",
                         '<25>{#f/8}* ...',
                         '<25>{#f/8}* Supongo... que me dejé llevar un poco allí atrás.',
                         "<25>{#f/5}* Pero eso esta bien, ¿verdad?\n* Me perdonaras, ¿no es así?"
                      ]
                    : [
                         "<25>{#f/6}* Aún no estoy muy seguro de lo que paso ahí atrás",
                         "<25>{#f/5}* Me está... asustando un poco, jaja...",
                         '<25>{#f/8}* ...',
                         '<25>{#f/8}* Tal vez... deberíamos esperar un poco por ahora.',
                         "<25>{#f/5}* Pero eso esta bien, ¿verdad?\n* Estarás bien con eso, ¿no es así?"
                      ]),
                 '<25>{#f/6}* ...',
                 '<25>{#f/8}* Adiós, $(name)...',
                 ...(SAVE.flag.n.genocide_milestone < 7 ? [ "<25>{#f/5}* Volveré antes de que te des cuenta." ] : [])
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
      endtwinklyEA: [ "<25>{#f/11}{#v/0}* No creas que no sé cómo funciona esto..." ],
      endtwinklyEB: [ "<25>{#f/6}{#v/0}* It's sad, though..." ],
      endtwinklyF: [ '<25>{#p/twinkly}{#f/11}{#v/0}* Look at you, playing with her life like this...' ],
      endtwinklyFA: [ '<25>{#f/7}{#v/0}* Killing her, leaving her, killing her again...' ],
      endtwinklyFB: [ '<25>{#f/7}{#v/0}* Leaving her, killing her, leaving her again...' ],
      endtwinklyFXA: [
         "<25>{#f/11}{#v/0}* It's fun, isn't it?",
         '<25>{#f/6}{#v/0}* Endlessly toying with the lives of others...',
         '<25>{#f/8}{#v/0}* Watching how they react to every possible decision...',
         "<25>{#f/11}{#v/0}* Isn't it thrilling?",
         '<25>{#f/7}{#v/0}* Ji ji ji...',
         "<25>{#f/9}{#v/0}* I wonder what you'll do next.",
         "<25>{#f/5}{#v/0}* I'll be watching..."
      ],
      endtwinklyG: [
         "<25>{#p/twinkly}{#f/10}{#v/0}* You just can't get enough, can you~",
         '<25>{#f/11}{#v/0}* How many more times will you KILL her, eh?',
         '<25>{#f/7}{#v/0}* Ji ji ji...',
         '<25>{#f/0}{#v/1}* You kinda remind me of myself.',
         '<25>{#f/9}{#v/0}* Well, cya!'
      ],
      endtwinklyG1: [
         '<25>{#p/twinkly}{#f/6}{#v/0}* Again?\n* Golly...',
         '<25>{#f/0}{#v/1}* You REALLY remind me of myself.'
      ],
      endtwinklyG2: [
         '<25>{#p/twinkly}{#f/6}{#v/0}* Again!?',
         "<25>{#f/8}{#v/0}* Wow, you're even worse than I thought."
      ],
      endtwinklyH: () => [
         SAVE.data.b.w_state_lateleave
            ? "<25>{#p/twinkly}{#f/5}{#v/0}* So you've finally gotten by peacefully, huh?"
            : "<25>{#p/twinkly}{#f/5}{#v/0}* So you've finally decided to show mercy, huh?",
         '<25>{#f/5}{#v/0}* And after all that KILLING...',
         '<25>{#f/11}{#v/0}* Say, was this your idea all along?',
         '<25>{#f/2}{#v/1}* To get a rush out of her death, then spare her once you got bored?',
         '<25>{#f/7}{#v/0}* Ji ji ji...',
         '<25>{#f/11}{#v/0}* What a saint you must think you are.',
         "<25>{#f/5}{#v/0}* But hey, it's not as if I don't know how this works..."
      ],
      endtwinklyI: [
         '<25>{#p/twinkly}{#f/11}{#v/0}* Hee hee hee...',
         '<25>{#f/7}{#v/0}* I hope you like your choice.',
         "<25>{#f/9}{#v/0}* I mean, it's not as if you can go back and change fate.",
         "<25>{#f/0}{#v/1}* En este mundo, es MATAR o MORIR.",
         '<25>{#f/5}{#v/0}* That old woman thought she could break the rules.',
         '<25>{#f/8}{#v/0}* She tried so hard to save you humans...',
         "<25>{#f/6}{#v/0}* But when it came down to it, she couldn't even save herself."
      ],
      endtwinklyIX: [
         '<25>{#p/twinkly}{#f/11}{#v/0}* Hee hee hee...',
         '<25>{#f/11}{#v/0}* So you finally caved in and killed someone, huh?',
         '<25>{#f/7}{#v/0}* Well, I hope you like your choice.',
         "<25>{#f/9}{#v/0}* I mean, it's not as if you can go back and change fate.",
         "<25>{#f/0}{#v/1}* En este mundo, es MATAR o MORIR.",
         "<25>{#f/8}{#v/0}* ... what's wrong?\n* Did she not last as long as you thought?",
         '<26>{#f/6}{#v/0}* Oh, how terrible.\n* Guess not everyone can be beat into submission.'
      ],
      endtwinklyIA: [ '<25>{#f/11}{#v/0}* What an idiot!' ],
      endtwinklyIAX: [ '<25>{#f/7}{#v/0}* What a shame for her.' ],
      endtwinklyIB: [ '<25>{#f/6}{#v/0}* As for you...' ],
      endtwinklyJ: [
         '<25>{#p/twinkly}{#f/6}{#v/0}* Wow.',
         '<25>{#f/7}{#v/0}* And here I thought you were the righteous one for showing mercy.',
         '<25>{#f/11}{#v/0}* Hah!\n* What a joke.',
         '<25>{#f/6}{#v/0}* ...',
         '<25>{#f/6}{#v/0}* How did it feel to finally satisfy your violent side?',
         '<25>{#f/7}{#v/0}* Ji ji ji...',
         "<25>{#f/0}{#v/1}* I bet it felt GOOD, didn't it?",
         '<25>{#f/11}{#v/0}* I mean, I should know...'
      ],
      endtwinklyK: [
         '<25>{#p/twinkly}{#f/5}{#v/0}* Nice to see you again.',
         "<25>{#f/6}{#v/0}* By the way, you're the most boring person in the galaxy.",
         '<25>{#f/12}{#v/0}* Getting by peacefully, then going back just to do it again?',
         '<25>{#f/8}{#v/0}* Come on...',
         "<25>{#f/2}{#v/1}* You know as well as I do that it's KILL or BE killed."
      ],
      endtwinklyK1: [
         "<25>{#p/twinkly}{#f/6}* Aren't you getting tired of this?",
         '<25>{#f/8}{#v/0}* Come on...',
         '<25>{#f/2}{#v/1}* You KNOW deep down that part of you wants to hurt her.',
         "<25>{#f/14}{#v/1}* A few good hits, and she'd be dead before your very eyes.",
         "<25>{#f/11}{#v/0}* Wouldn't that be exciting?",
         '<25>{#f/6}{#v/0}* ...',
         '<25>{#f/8}{#v/0}* ...',
         '<25>{#f/7}{#v/0}* See ya, idiot.'
      ],
      endtwinklyK2: [
         '<25>{#p/twinkly}{#f/8}{#v/0}* Are you doing this just to see how I react?',
         '<25>{#f/6}{#v/0}* Is that what this is about?',
         "<25>{#f/7}{#v/0}* Well, don't expect to get anything else outta me.",
         '<25>{#f/6}{#v/0}* All this boring pacifism is getting tiresome.',
         '<25>{#f/11}{#v/0}* Now, if something more interesting were to happen...',
         "<25>{#f/9}{#v/0}* Perhaps I'd be more inclined to talk.",
         '<25>{#f/6}{#v/0}* ...',
         '<25>{#f/8}{#v/0}* ...',
         '<25>{#f/7}{#v/0}* See ya, idiot.'
      ],
      endtwinklyKA: [
         "<25>{#f/7}{#v/0}* Sooner or later, you'll be forced to realize that.",
         '<25>{#f/11}{#v/0}* And when that time comes...',
         "<25>{#f/5}{#v/0}* Well, let's just say I'm interested to see what happens.",
         '<25>{#f/11}{#v/0}* Ji ji ji...',
         '<25>{#f/9}{#v/0}* Good luck!'
      ],
      endtwinklyKB: [
         '<25>{#f/11}{#v/0}* Ji ji ji...',
         "<25>{#f/7}{#v/0}* Maybe that's why you killed that one monster.",
         '<25>{#f/8}{#v/0}* I mean, you went almost the whole way without killing anyone...',
         '<25>{#f/6}{#v/0}* But somewhere along the line, you screwed up.',
         '<25>{#f/5}{#v/0}* All that good karma you had went straight down the toilet.',
         "<25>{#f/11}{#v/0}* Golly, you can't do anything right!",
         '<25>{#f/11}{#v/0}* What a joke!'
      ],
      endtwinklyKC: [
         '<25>{#f/11}{#v/0}* Ji ji ji...',
         "<25>{#f/7}{#v/0}* Maybe that's why you killed those other monsters.",
         '<25>{#f/8}{#v/0}* I mean, you had a good run, but...',
         "<25>{#f/6}{#v/0}* What's the point in mercy if it doesn't mean anything?",
         '<25>{#f/7}{#v/0}* And believe me, after you did what you did...',
         "<25>{#f/2}{#v/1}* It doesn't mean JACK.",
         '<25>{#f/6}{#v/0}* ...',
         '<25>{#f/8}{#v/0}* ...',
         '<25>{#f/7}{#v/0}* See ya, idiot.'
      ],
      endtwinklyKD: [
         "<25>{#f/11}{#v/0}* What's wrong with killing Toriel, huh?\n* Too good for that?",
         '<25>{#f/7}{#v/0}* Ji ji ji...',
         "<25>{#f/2}{#v/1}* I know you're still rotten to the core.",
         '<25>{#f/11}{#v/0}* I mean, you managed to take out everyone in your path...',
         '<25>{#f/6}{#v/0}* But when it came to the final hurdle, you failed.',
         "<25>{#f/11}{#v/0}* Golly, you can't do anything right!",
         '<25>{#f/11}{#v/0}* What a joke!'
      ],
      endtwinklyL: [
         '<25>{#p/twinkly}{#f/6}{#v/0}* Back again, huh?\n* Golly...',
         "<25>{#f/8}{#v/0}* You've changed the timeline around so much...",
         "<25>{#f/6}{#v/0}* I don't even know what to think now.",
         '<25>{#f/8}{#v/0}* Are you good?\n* Evil?\n* Just curious?',
         '<25>{#f/6}{#v/0}* I dunno.',
         '<25>{#f/5}{#v/0}* There is one thing, though...',
         "<25>{#f/5}{#v/0}* One thing I KNOW you haven't done yet.",
         '<25>{#f/11}{#v/0}* Ji ji ji...',
         "<25>{#f/7}{#v/0}* That's right.",
         "<25>{#f/7}{#v/0}* You haven't killed everyone here in one run yet.",
         "<25>{#f/11}{#v/0}* Aren't you at least a LITTLE curious?",
         '<25>{#f/8}{#v/0}* Come on, $(name)...',
         "<25>{#f/5}{#v/0}* I know you're in there somewhere."
      ],
      endtwinklyL1: [
         '<25>{#p/twinkly}{#f/6}{#v/0}* Well well, we meet again.',
         '<25>{#f/8}{#v/0}* How many times is this now?',
         "<25>{#f/6}{#v/0}* Whatever.\n* Doesn't matter.",
         '<25>{#f/6}{#v/0}* You KNOW what you have to do, $(name).',
         '<25>{#f/8}{#v/0}* ...',
         "<25>{#f/5}{#v/0}* I'll be waiting."
      ],
      exit1: [
         '<25>{#p/toriel}{#f/13}* You wish to return \"home,\" do you not?',
         '<25>{#f/9}* ...',
         '<25>{#f/9}* If you leave here, I will not be able to protect you.',
         '<25>{#f/9}* I will not be able to save you from the dangers that lie ahead.',
         '<25>{#f/13}* So, please, little one...',
         '<25>{#f/9}* Go back the other way.'
      ],
      exit2: [
         '<25>{#p/toriel}{#f/13}* Every human that ends up here meets the same fate.',
         '<25>{#f/9}* I have seen it repeat time and time again.',
         '<25>{#f/13}* They come.',
         '<25>{#f/13}* They leave.',
         '<25>{#f/9}* ... they die.',
         '<25>{#f/13}* My child...',
         '<25>{#f/13}* If you leave the Outlands...',
         '<25>{#f/9}* They...\n* {@fill=#f00}ASGORE{@fill=#fff}...\n* Will take your SOUL.'
      ],
      exit3: [
         '<25>{#p/toriel}{#f/9}* ...',
         '<25>{#f/13}* I did not want to say this, but...',
         '<25>{#f/11}* I cannot allow you to continue this way.',
         '<25>{#f/9}* For your own sake, child...',
         '<25>{#f/9}* Do not follow me into the next room.'
      ],
      exit4: [
         '<25>{#p/toriel}{#p/toriel}{#f/13}* ...',
         '<25>{#f/10}* ... of course.',
         '<25>{#f/9}* Perhaps it was always meant to come to this.',
         '<25>{#f/9}* Perhaps I was foolish to think you would be any different.',
         '<25>{#f/9}* ...',
         '<25>{#f/13}* I am afraid there is little choice now.',
         '<25>{#f/13}* Forgive me, my child...',
         '<25>{#f/11}* But I cannot allow you to leave.'
      ],
      exitfail1: (lateleave: boolean, sleep: boolean) =>
         world.postnoot
            ? [
                 [
                    sleep
                       ? "<32>{#p/twinkly}{#f/19}* After you sleep at Mommy's house, she goes out for groceries."
                       : "<32>{#p/twinkly}{#f/19}* After you run back to Mommy's house, she goes out for groceries.",
                    '<32>{#x1}* But... oh no!\n* The taxi she was in exploded, killing her instantly!',
                    '<32>* Golly, I wonder how such an awful thing could have happened.',
                    '<32>{*}{#x2}* ...',
                    "<25>{*}{#f/7}* Sorry, $(name).\n* Guess your happy ending won't be so easy."
                 ],
                 [
                    sleep
                       ? "<32>{#p/twinkly}{#f/19}* After you sleep at Mommy's house, she goes out for groceries."
                       : "<32>{#p/twinkly}{#f/19}* After you run back to Mommy's house, she goes out for groceries.",
                    '<32>{#x1}* But... oh no!\n* A talking star appears and tortures her to death!',
                    "<32>* Golly, that's an even worse outcome than last time!",
                    '<32>{*}{#x2}* ...',
                    "<25>{*}{#f/6}* We don't have time for this, $(name).\n* Get back on track."
                 ],
                 [
                    '<25>{*}{#p/twinkly}{#f/5}* Come on, $(name)...',
                    sleep
                       ? "<25>{*}{#f/7}* Do you really think I'm gonna let you avoid me THAT easily?"
                       : "<25>{*}{#f/7}* Do you really think I'm gonna let you run away from me THAT easily?"
                 ],
                 [ '<25>{*}{#p/twinkly}{#f/6}* We can do this all day.' ],
                 [ '<25>{*}{#p/twinkly}{#f/8}* ...' ]
              ][Math.min(SAVE.flag.n.postnoot_exitfail++, 4)]
            : [
                 sleep
                    ? "<32>{#p/basic}* After you sleep at Toriel's home, she destroys the bridge to the outpost."
                    : "<32>{#p/basic}* After you return to Toriel's home, she destroys the bridge to the outpost.",
                 ...(outlandsKills() > 10
                    ? [
                         "<32>* Time goes by, and Toriel soon finds out about the monsters you've killed.",
                         '<32>* Her hopes shattered, and with nothing left to lose, she...',
                         '<32>* ...',
                         '<32>* ... m-meanwhile, the remaining outpost residents await salvation...'
                      ]
                    : outlandsKills() > 5 || SAVE.data.n.bully_wastelands > 5
                    ? [
                         '<32>* Time goes by, and Toriel does her best to care for you.',
                         '<32>* Reading books, baking pies...',
                         '<32>* Tucking you snugly into bed, each and every night...',
                         ...(lateleave
                            ? [ '<32>* ... despite her fear that you may try to run away again.' ]
                            : [ "<32>* ... despite those who've gone missing." ]),
                         '<32>* All the while, the outpost residents await salvation...'
                      ]
                    : [
                         '<32>* Time goes by, and Toriel does her best to care for you.',
                         '<32>* Reading books, baking pies...',
                         '<32>* Tucking you snugly into bed, each and every night...',
                         ...(lateleave
                            ? [ '<32>* And hugging you so tightly that you never ever try to run away again.' ]
                            : [ '<32>* And all the hugging you could ever hope for.' ]),
                         '<32>* All the while, the outpost residents await salvation...'
                      ]),
                 '<32>* ... from a human that may never reach them.',
                 '<32>* Is this truly the outcome you had hoped for?',
                 '<32>* Is this truly what they deserve?'
              ],
      food: () => [
         ...(SAVE.data.n.state_wastelands_mash === 2
            ? [
                 '<25>{#p/toriel}{#f/1}* Sorry for the wait...',
                 '<25>{#f/3}* It seems that little white dog has raided my kitchen again.',
                 '<25>{#f/4}* You should see the state of that pie...',
                 '<26>{#f/0}* But anyhoo.\n* I have prepared a plate of fried snails for you.'
              ]
            : [ '<25>{#p/toriel}* Breakfast is ready!', '<26>* I have prepared a plate of fried snails for you.' ]),
         '<25>{#f/1}* I will leave them here on the table...'
      ],
      fridgetrap: {
         a: () =>
            SAVE.data.b.svr
               ? []
               : world.darker
               ? [ "<32>{#p/basic}* You wouldn't like what's in the fridge." ]
               : [ '<32>{#p/basic}* There is a brand-name chocolate bar in the fridge.' ],
         b: () => [
            ...(SAVE.data.b.svr ? [] : [ '<32>{#p/basic}* ...', '<32>* Do you want it?' ]),
            choicer.create('* (Take the Chocolate Bar?)', 'Si', 'No')
         ],
         b1: [ '<32>{#p/human}* (You decide not to take anything.)' ],
         b2: () => [
            '<32>{#p/human}* (You got the Chocolate Bar.)',
            ...(SAVE.data.b.svr ? [ '<25>{#p/asriel1}{#f/17}* Ah... chocolate.', '<25>{#p/asriel1}{#f/13}* ...' ] : [])
         ],
         c: () =>
            SAVE.data.b.svr
               ? [
                    '<32>{#p/human}* (Pero no había nada más que encontrar dentro.)',
                    ...[
                       [
                          '<25>{#p/asriel1}{#f/23}* Oh... $(name) ALWAYS used to root around in the fridge.',
                          '<25>{#f/13}* They thought, if they dug deep enough...',
                          '<25>{#f/13}* Another bar of chocolate would reveal itself inside.',
                          '<25>{#f/17}* ... how silly.'
                       ],
                       [ '<25>{#p/asriel1}{#f/20}* That was before the chocolate replicator was installed.' ]
                    ][Math.min(asrielinter.fridgetrap_c++, 1)]
                 ]
               : [ '<32>{#p/basic}* The chocolate bar has already been taken.' ],
         d: [ "<32>{#p/human}* (Llevas demasiado encima.)" ]
      },
      front1: [
         '<25>{#p/toriel}{#f/1}* ... and you want to play one of your songs?',
         '<25>{#f/0}* Alright, I will see what I can do.'
      ],
      front1x: [ '<25>{#p/toriel}{#f/1}* ... hello?' ],
      front2: () => [
         ...(world.postnoot
            ? [
                 '<25>{#p/toriel}{#f/2}* Up already!?',
                 '<25>{#f/1}* You were not asleep for very long...',
                 '<25>{#f/5}* ...',
                 world.nootflags.has('toriel') // NO-TRANSLATE

                    ? '<25>{#f/1}* The atmospheric system still does not seem to be fixed.'
                    : '<25>{#f/1}* The atmospheric system seems to be malfunctioning.',
                 '<25>{#f/1}* If you begin to feel weak, do not hesitate to return to bed.',
                 '<26>{#f/0}* ... anywho.'
              ]
            : [
                 '<25>{#p/toriel}{#f/2}* How long have you been standing there!?',
                 '<25>{#f/5}* ...',
                 '<25>{#f/0}* I suppose it matters not.'
              ]),
         '<25>{#f/0}* Napstablook, a visitor here, has offered to play their music.',
         '<25>{#f/0}* In fact, they invited you specifically to be with them on stage!',
         '<25>{#f/1}* Would you like to visit the activities room to see them?',
         ...(SAVE.data.n.state_wastelands_mash === 1
            ? [
                 '<25>{#f/3}* Oh, and, I apologize about the state of the pie.',
                 '<25>{#f/4}* It seems that little white dog has raided my kitchen again...'
              ]
            : 3 <= SAVE.data.n.cell_insult
            ? [
                 '<25>{#f/5}* Oh, and, I apologize about the state of the pie.',
                 '<25>{#f/9}* I did my best to try and salvage it...'
              ]
            : []),
         choicer.create("* (See Napstablook's show?)", 'Si', 'No')
      ],
      front2a: [ '<25>{#p/toriel}{#f/0}* Wonderful!\n* I will let them know you are coming.' ],
      front2b: [ '<25>{#p/toriel}{#f/5}* ...', '<25>{#p/toriel}{#f/5}* I will be in the living room if you need me.' ],
      front3: () => [
         ...(world.postnoot
            ? [
                 '<25>{#p/toriel}{#f/0}* Oh, hello, little one.\n* You are up early.',
                 '<25>{#f/1}* Are you sure you slept for a long enough time?',
                 '<25>{#f/5}* ...',
                 world.nootflags.has('toriel') // NO-TRANSLATE

                    ? '<25>{#f/1}* The atmospheric system still does not seem to be fixed.'
                    : '<25>{#f/1}* The atmospheric system seems to be malfunctioning.',
                 '<25>{#f/1}* If you begin to feel weak, do not hesitate to return to bed.',
                 '<26>{#f/0}* ... aside from that...'
              ]
            : [ '<25>{#p/toriel}* Good morning, little one.' ]),
         ...(SAVE.data.n.state_wastelands_mash === 1
            ? [
                 '<25>{#f/3}* It seems that little white dog has raided my kitchen again.',
                 '<25>{#f/4}* You should see the state of that pie...',
                 '<25>{#f/0}* Still, I have done my best to salvage it for you.'
              ]
            : [ '<25>{#f/1}* The stars do look pretty today, do they not?' ]),
         '<25>{#f/5}* ...',
         '<25>{#f/5}* I will be in the living room if you need me.'
      ],
      front4: () => [
         ...(world.postnoot
            ? [
                 '<25>{#p/toriel}{#f/0}* Oh, hello, little one.\n* You are up early.',
                 '<25>{#f/1}* Are you sure you slept for a long enough time?',
                 '<25>{#f/5}* ...',
                 world.nootflags.has('toriel') // NO-TRANSLATE

                    ? '<25>{#f/1}* The atmospheric system still does not seem to be fixed.'
                    : '<25>{#f/1}* The atmospheric system seems to be malfunctioning.',
                 '<25>{#f/1}* If you begin to feel weak, do not hesitate to return to bed.'
              ]
            : [ '<25>{#p/toriel}* Good morning, little one.' ]),
         '<25>{#f/5}* ...',
         ...(world.bullied
            ? [
                 '<25>* The Outlands have been unusually noisy today.',
                 '<25>* It seems a bully has been going around and causing trouble...',
                 '<25>* It would be best not to stray too far.'
              ]
            : [
                 '<25>* The Outlands have been unusually silent today.',
                 '<25>* I tried calling someone just now, but...',
                 '<25>* Nothing.'
              ]),
         ...(SAVE.data.n.state_wastelands_mash === 1
            ? [
                 world.bullied
                    ? '<26>{#f/3}* In other news, that little white dog has raided my kitchen again.'
                    : '<25>{#f/3}* Apart from the little white dog raiding my kitchen, that is.',
                 '<25>{#f/4}* You should see the state of that pie...',
                 '<25>{#f/0}* Still, I have done my best to salvage it for you.',
                 '<25>{#f/1}* I hope you like it...'
              ]
            : world.bullied || (16 <= outlandsKills() && SAVE.flag.n.genocide_twinkly < resetThreshold())
            ? []
            : [ '<25>{#f/1}* It is rather worrying...' ]),
         '<25>{#f/0}* Anyhoo, I will be in the living room if you need me.'
      ],
      goodbye1a: [ '<25>{#p/toriel}{#f/10}* ...', '<25>{#f/20}{|}* Come here- {%}' ],
      goodbye1b: [ '<25>{#p/toriel}{#f/9}* ...', '<25>{#f/19}{|}* Come here- {%}' ],
      goodbye2: [
         '<25>{#p/toriel}{#f/5}* I am sorry for what I have put you through, little one.',
         '<25>{#f/9}* I should have known that I could not keep you here forever.',
         '<25>{#f/5}* ... still, if you ever need someone to talk to...',
         '<25>{#f/1}* Feel free to call me at any time.',
         '<25>{#f/0}* As long as my phone can reach you, I will be there to pick up.'
      ],
      goodbye3: [
         '<25>{#p/toriel}{#f/5}* I am sorry for what I have put you through, little one.',
         '<25>{#f/9}* I should have known that I could not keep you here forever.',
         '<25>{#f/10}* ...',
         '<25>{#f/14}* Be good, alright?'
      ],
      goodbye4: [ '<25>{#p/toriel}{#f/1}* Be good, alright?' ],
      goodbye5a: [
         '<25>{#p/toriel}{#f/5}* ... hmm?\n* You changed your mind?',
         '<25>{#f/9}* ...',
         '<25>{#f/10}* Perhaps you really are different from the others.',
         '<25>{#f/0}* ... well then.',
         '<25>{#f/0}* I will finish up here, and meet you back at the house.',
         '<25>{#f/0}* Thank you for listening, my child.',
         '<25>{#f/0}* It means a lot to me.'
      ],
      goodbye5b: [
         '<25>{#p/toriel}{#f/5}* ... hmm?\n* You changed your mind?',
         '<25>{#f/10}* ...\n* Forgive me, my child.',
         '<25>{#f/9}* I might have lost it there for a moment.',
         '<25>{#f/0}* ... no matter.',
         '<25>{#f/0}* I will finish up here, and meet you back at the house.',
         '<25>{#f/0}* Thank you for listening, my child.',
         '<25>{#f/0}* It means a lot to me.'
      ],
      halo: {
         a: () => [ '<32>{#p/human}* (You got the Halo.)', choicer.create('* (Equip the Halo?)', 'Si', 'No') ],
         b: [ "<32>{#p/human}* (Llevas demasiado encima para tomar eso.)" ]
      },
      indie1: () => [
         ...([ 1, 5 ].includes(SAVE.data.n.state_wastelands_dummy) && SAVE.data.b.w_state_riddleskip
            ? [
                 '<25>{#p/toriel}{#f/5}* Teaching you thus far has been difficult, but...',
                 '<25>{#f/5}* Perhaps this exercise will help.'
              ]
            : [ '<26>{#p/toriel}* Alright.\n* It is time for your third and final lesson.' ]),
         '<25>{#f/1}* Do you think you can make it to the end of this room...',
         '<25>{#f/1}* ... all by yourself?',
         choicer.create('* (What do you say?)', 'Si', 'No')
      ],
      indie1a: () => [
         '<25>{#p/toriel}{#f/1}* Are you sure...?',
         '<25>{#f/0}* It is only a short distance away.',
         choicer.create('* (Change your mind?)', 'Si', 'No')
      ],
      indie1b: () => [
         '<25>{#p/toriel}{#f/5}* My child.',
         '<25>{#f/1}* It IS important to do things on your own, is it not?',
         '<32>{#p/basic}* If you refuse to change your mind here, Toriel may decide to take you home.',
         choicer.create('* (Change your mind?)', 'Si', 'No')
      ],
      indie2a: [ '<25>{#p/toriel}{#f/1}* Alright...', '<25>{#f/0}* Good luck!' ],
      indie2b: [ '<25>{#p/toriel}{#f/5}* ...', '<25>{#f/9}* ... I see.' ],
      indie2b1: [
         '<25>{#p/toriel}{#f/10}* Worry not, my child.',
         '<25>{#f/1}* If you truly do not wish to leave my side...',
         '<25>{#f/0}* I will guide you through the remainder of the Outlands.',
         '<25>{#f/5}* ...',
         '<25>{#f/5}* Take my hand, young one...',
         '<25>{#f/5}* It is time to go home.'
      ],
      indie2f: [ '<32>{#p/human}{#s/equip}* (You got the CELL.)' ],
      indie3a: [ '<25>{#p/toriel}* You did it!' ],
      indie3b: [
         '<25>{#p/toriel}{#f/3}* My child, what took you so long!?',
         '<25>{#f/4}* Did you get lost?',
         '<25>{#f/1}* ...\n* You DO seem alright...'
      ],
      indie4: () => [
         ...([ 1, 5 ].includes(SAVE.data.n.state_wastelands_dummy) && SAVE.data.b.w_state_riddleskip
            ? [
                 '<25>{#f/0}* I must admit, I am surprised you made it to the end.',
                 '<25>{#f/3}* Your behavior thus far has left me asking...',
                 '<25>{#f/4}* ... have you been attempting to mess with me this whole time?',
                 '<25>{#f/23}* To be blunt, I do not have time for such pointless riffraff.'
              ]
            : [
                 '<25>{#p/toriel}{#f/0}* Do not worry.\n* You were never in any real danger.',
                 '<25>{#f/0}* This was merely a test of your independence!',
                 '<25>{#f/1}* In truth, my child...'
              ]),
         '<25>{#f/5}* There are important errands I must run.',
         '<25>{#f/0}* While I am away, I expect you to be on your best behavior.',
         '<25>{#f/1}* The puzzles ahead are yet to be explained, and...',
         '<25>{#f/0}* Leaving the room on your own may prove to be dangerous.',
         '<25>{#f/10}* Here.\n* Take this CELL phone.',
         '<32>{#p/human}{#s/equip}* (You got the CELL.)',
         ...([ 1, 5 ].includes(SAVE.data.n.state_wastelands_dummy) && SAVE.data.b.w_state_riddleskip
            ? [
                 '<25>{#p/toriel}{#f/1}* If you need anything while I am away, please...',
                 '<25>{#f/0}* Do not hesitate to call me.',
                 '<25>{#f/5}* ...',
                 '<26>{#f/23}* And stay out of trouble.'
              ]
            : [
                 '<25>{#p/toriel}{#f/1}* If you need anything while I am away, please...',
                 '<25>{#f/0}* Do not hesitate to call me.',
                 '<25>{#f/5}* ...',
                 '<25>{#f/1}* Be good, alright?'
              ])
      ],
      indie5: [
         [
            '<32>{#s/phone}{#p/event}* Ring, ring...',
            '<25>{#p/toriel}* Hello!\n* This is Toriel.',
            '<25>* My errands are taking longer than I thought they would.',
            '<25>* You must wait a little longer.',
            '<25>{#f/1}* Thank you for being patient, my child...',
            '<25>{#f/0}* You are very good.'
         ],
         [
            '<32>{#s/phone}{#p/event}* Ring, ring...',
            '<25>{#p/toriel}* Hello...\n* This is Toriel.',
            '<25>{#f/1}* I found what I was looking for...',
            '<25>{#f/0}* But a small, white puppy snatched it away!\n* How odd.',
            '<25>{#f/1}* Do dogs even like flour?',
            '<25>{#f/0}* Err, that is an unrelated question, of course.',
            '<25>* It will take a little longer for me to return.',
            '<25>{#f/1}* Thank you again for being so patient...'
         ],
         [
            '<32>{#s/phone}{#p/event}* Ring, ring...',
            '<32>{#p/basic}* (...)',
            '<32>{#p/human}* (You hear heavy panting on the other end of the phone.)',
            '<32>{#s/bark}{#p/event}* Bark!\n{#s/bark}* Bark!',
            '<32>{#p/human}* (You hear a distant voice.)',
            '<25>{#p/toriel}{#f/2}* Stop, please!',
            '<32>{#s/bark}{#p/event}* Bark!\n{#s/bark}* Bark!',
            '<25>{#p/toriel}{#f/1}* Come back here with my cell phone!'
         ],
         [
            '<32>{#s/phone}{#p/event}* Ring, ring...',
            '<32>{#p/basic}* (...)',
            '<32>{#p/human}* (It sounds like a small, white dog is sleeping on the phone.)',
            '<32>{#p/basic}* (Snore... snore...)',
            '<32>{#p/human}* (You hear a distant voice.)',
            '<25>{#p/toriel}{#f/1}* Hellooo?\n* Little puppy...?',
            '<25>{#f/1}* Where are youuu?',
            '<25>{#f/0}* I will give you a nice pat on the head!',
            '<32>{#p/human}* (The snoring stops.)',
            '<25>{#p/toriel}* ... if you return with my cell phone.',
            '<32>{#p/human}* (The snoring resumes.)'
         ],
         [
            '<32>{#s/phone}{#p/event}* Ring, ring...',
            '<32>{#p/basic}* (...)',
            '<32>{#p/basic}* (Achoo!)',
            '<32>{#p/human}* (It sounds like a small, white dog sneezing in its sleep.)',
            '<25>* (You hear a distant voice.)',
            '<25>{#p/toriel}{#f/1}* Aha!\n* I heard that, you little white dog...',
            '<25>{#f/6}* Now I am going to find you!',
            '<32>{#p/human}* (The snoring stops.)\n* (The dog now seems to be on the run from something.)',
            '<25>{#p/toriel}{#f/8}* Hee hee, there is no escape!'
         ],
         [
            '<32>{#s/phone}{#p/event}* Ring, ring...',
            '<32>{#p/human}* (You hear a distant voice.)',
            '<25>{#p/toriel}{#f/1}* Hello...\n* This is... Toriel...',
            '<32>{#s/bark}{#p/event}* Bark!\n* Bark!',
            '<25>{#p/toriel}{#f/2}* No, bad puppy!',
            '<32>{#p/basic}* (Whimper... whimper...)',
            '<25>{#p/toriel}* There, there...\n* I will find another cell phone for you.',
            '<25>{#f/1}* Would that be alright?',
            '<32>{#p/basic}* (...)',
            '<32>{#s/bark}{#p/event}* Bark!',
            '<25>{#p/toriel}* Glad to hear it.',
            '<32>{#p/human}* (The dog could be heard walking away.)',
            '<25>{#p/toriel}* Please, forgive me for all of this nonsense.',
            '<25>{#f/1}* I will be back to pick you up shortly...'
         ]
      ],
      indie6: (early: boolean) => [
         '<32>{#s/phone}{#p/event}* Ring, ring...',
         ...([ 1, 5 ].includes(SAVE.data.n.state_wastelands_dummy) && SAVE.data.b.w_state_riddleskip
            ? [
                 early
                    ? '<25>{#p/toriel}{#g/torielTired}* ... already?'
                    : '<25>{#p/toriel}{#g/torielTired}* ... impatient, are we?',
                 '<25>{#f/9}* I really should not be surprised.',
                 '<25>{#f/5}* Just remember the dangers that lie ahead of you out there...',
                 '<25>{#f/1}* It would be a shame if you got hurt.'
              ]
            : [
                 '<25>{#p/toriel}* Hello?\n* This is Toriel.',
                 '<25>{#f/1}* You have not left the room, have you?',
                 '<25>{#f/0}* There are many dangers out there, and I do not want you to get hurt.',
                 '<25>{#f/1}* Take care of yourself, alright?'
              ])
      ],
      indie7: [ '<32>{#p/basic}* A few minutes later...' ],
      indie8: [
         '<25>{#p/toriel}* I have returned!',
         '<25>* Your patience thus far has been commendable.\n* Even I am impressed!',
         '<25>{#f/0}* Anyhoo.\n* It is time I took you home now.',
         '<25>{#f/1}* Please, allow me...'
      ],
      lobby_puzzle1: [
         '<25>{#p/toriel}{#f/0}* Welcome to our humble outpost, innocent one.',
         '<25>{#f/0}* There are many lessons that I must teach you about life here.',
         '<25>{#f/1}* First and foremost...',
         '<25>{#f/0}* Puzzles!',
         '<25>{#f/0}* Allow me to perform this quick demonstration.'
      ],
      lobby_puzzle2: [
         '<25>{#p/toriel}{#f/1}* It may seem strange to you now, but here on the outpost...',
         '<25>{#f/0}* Solving puzzles is a part of our daily routine.',
         '<25>{#f/0}* With time, and a little guidance, you will grow accustomed to them.'
      ],
      lobby_puzzle3: [ '<25>{#p/toriel}* When you are ready, we may proceed.' ],
      loox: {
         a: [
            "<32>{#p/basic}{#n1}* I heard you're quite flirty, for a human.",
            "<32>* As you {@fill=#cf7fff}FLIRT{@fill=#fff} with different kinds of monsters, you'll see hearts next to their names.",
            "<32>* The more types of monsters you {@fill=#cf7fff}FLIRT{@fill=#fff} with, the more hearts you'll have.",
            '<32>* I wonder...',
            '<32>* Just how far can you go?',
            '<32>* Perhaps, my friend, you could even become... a legend.'
         ],
         b: [
            '<32>{#p/basic}{#n1}* Hey human, have you tried flirting yet?',
            "<32>* Ha!\n* I can tell by the look on your face that you haven't yet.",
            "<32>* I gotta tell you, it's tons of fun.",
            "<32>* Your enemies won't know what to do with themselves!",
            '<32>* Psst... if you DO start flirting, I might have more to tell you.',
            '<32>* Good luck with that!'
         ],
         c: [
            "<32>{#p/basic}{#n1}* Hey human, now that you've started flirting...",
            '<32>* How does it feel?',
            "<32>* It's pretty great, right?",
            "<32>* As you {@fill=#cf7fff}FLIRT{@fill=#fff} with different kinds of monsters, you'll see hearts next to their names.",
            "<32>* The more types of monsters you {@fill=#cf7fff}FLIRT{@fill=#fff} with, the more hearts you'll have.",
            '<32>* I wonder...',
            '<32>* Just how far can you go?',
            '<32>* Perhaps, my friend, you could even become... a legend.'
         ],
         d: [
            "<32>{#p/basic}{#n1}* I hear you're somewhat of a bully in these parts.",
            '<32>* Ha!\n* Join the club, pal.',
            "<32>* You're talking to the number one bully around.",
            "<32>* As you {@fill=#3f00ff}BULLY{@fill=#fff} different kinds of monsters, you'll see swords next to their names.",
            "<32>* The more types of monsters you {@fill=#3f00ff}BULLY{@fill=#fff}, the more swords you'll have.",
            '<32>* Though, as a disclaimer, not ALL monsters can be bullied.',
            "<32>* It's like flirting... but with death.",
            '<32>* Fun, right?'
         ],
         e: pager.create(
            0,
            () => [
               ...(30 <= SAVE.data.n.bully
                  ? [
                       "<32>{#p/basic}{#n1}* I heard you're quite the bully around here now.",
                       "<32>* Everyone's afraid of you, huh?"
                    ]
                  : 20 <= world.flirt
                  ? [
                       "<32>{#p/basic}{#n1}* I heard you're quite the romantic around here now.",
                       '<32>* Everyone loves you, huh?'
                    ]
                  : [
                       "<32>{#p/basic}{#n1}* I heard you're quite the hero around here now.",
                       '<32>* Everyone likes you, huh?'
                    ]),
               '<32>* Well... personally, I think you have too much free time.'
            ],
            [ '<32>{#p/basic}{#n1}* What?\n* Am I wrong?' ]
         )
      },
      manana: {
         a: pager.create(
            0,
            () =>
               SAVE.data.b.napsta_performance
                  ? [
                       "<32>{#p/basic}{#n1}* So, you're the one who co-hosted that music show, eh?",
                       "<32>* Maybe now you'll have the means to accept my offer.",
                       "<32>* I'm just lookin' for someone to buy this limited edition Super Starwalker comic strip.",
                       "<32>* Now I liked that little show, so you'll get a discount.\n* 5G, take it or leave it.",
                       choicer.create('{#n1!}* (Buy the Super Starwalker 1 for 5G?)', 'Si', 'No')
                    ]
                  : [
                       ...(world.postnoot
                          ? [
                               "<32>{#p/basic}{#n1}* Hey, have you noticed anything strange goin' on around here?",
                               "<32>* I could'a sworn all the puzzles just de-activated themselves earlier.",
                               "<32>* Anyway, I'm lookin' for a buyer on this limited edition Super Starwalker comic strip."
                            ]
                          : [
                               '<32>{#p/basic}{#n1}* Finally, someone speaks to me!',
                               "<32>* I've been standin' out here for ages, and nobody's takin' my offer.",
                               "<32>* I'm just lookin' for someone to buy this limited edition Super Starwalker comic strip."
                            ]),
                       "<32>* Interested?\n* All I'm askin' for is 10G.",
                       choicer.create('{#n1!}* (Buy the Super Starwalker 1 for 10G?)', 'Si', 'No')
                    ],
            () =>
               SAVE.data.b.napsta_performance
                  ? [
                       "<32>{#p/basic}{#n1}* Interested in buyin' my limited edition Super Starwalker comic strip?",
                       "<32>* All I'm askin' for is 5G.",
                       choicer.create('{#n1!}* (Buy the Super Starwalker 1 for 5G?)', 'Si', 'No')
                    ]
                  : [
                       "<32>{#p/basic}{#n1}* Interested in buyin' my limited edition Super Starwalker comic strip?",
                       "<32>* All I'm askin' for is 10G.",
                       choicer.create('{#n1!}* (Buy the Super Starwalker 1 for 10G?)', 'Si', 'No')
                    ]
         ),
         b: () => [
            "<32>{#p/human}{#n1!}* (You don't have enough G.)",
            SAVE.data.b.napsta_performance
               ? "<32>{#p/basic}{#n1}* I'll be honest, that don't look like 5G..."
               : "<32>{#p/basic}{#n1}* I'll be honest, that don't look like 10G..."
         ],
         c: [ '<32>{#p/basic}{#n1}* Not interested, huh?', "<32>* Well, that's fine.\n* I'll just find someone else..." ],
         d: [
            '<32>{#s/equip}{#p/human}{#n1!}* (You got the Super Starwalker 1.)',
            '<32>{#p/basic}{#n1}* Splendid!\n* Enjoy the comic strip.'
         ],
         e: [ '<32>{#p/basic}{#n1}* Back again, huh?', "<32>* Sorry bud, I've got nothin' left to sell." ],
         f: [
            "<32>{#p/human}{#n1!}* (You're carrying too much.)",
            "<32>{#p/basic}{#n1}* Them pockets of yours are lookin' kinda full..."
         ],
         g: [
            "<32>{#p/basic}{#n1}* I heard they're rebooting the comic franchise...",
            '<32>* The new main character is some snake fella with sunglasses or something.',
            "<32>* If I was in charge, I'd make a spinoff about that sidekick...",
            '<32>* Gumbert, I think?'
         ],
         h: [
            "<32>{#p/basic}{#n1}* Maybe now that we're free, they'll finally make that reboot they were planning.",
            "<32>* What was it called?\n* Oh, I've already forgotten..."
         ]
      },
      mananaX: () =>
         [
            [
               '<32>{#p/basic}{#n1}* Now what was THAT racket?',
               "<32>{#p/basic}{#n1}* Er, sorry, my eyesight's not what it used to be..."
            ],
            [ '<32>{#p/basic}{#n1}* Huh?\n* It happened again?\n* Tch, kids these days...' ],
            [ '<32>{#p/basic}{#n1}* Kids these days...' ]
         ][Math.min(roomKills().w_puzzle4++, 2)],
      afrogX: (k: number) =>
         [
            [ "<32>{#p/basic}{#n1}* If... if you d-do that again... I-I'm gonna have to stop you!" ],
            [ '<32>{#p/basic}{#n1}* N-no...\n* Not again...' ]
         ][k],
      patron: {
         a: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? 6 <= world.population
                     ? [
                          "<32>{#p/basic}{#n1}* I'm sad.\n* They took the DJ table to use for some tacky show later.",
                          '<32>* ... wait, that might actually be kind of cool.'
                       ]
                     : [
                          "<32>{#p/basic}{#n1}* I'm sad.\n* The bully who came through here earlier...",
                          '<32>* ... turned out to be you.',
                          '<32>* You saved us in the end, but why resort to such violence along the way?'
                       ]
                  : SAVE.data.b.napsta_performance
                  ? [
                       "<32>{#p/basic}{#n1}* I'm sad.\n* Musicians these days are way too hard on themselves...",
                       '<32>* Personally, I really liked that tune of theirs.',
                       "<32>* It's a shame we'll probably never get to hear it again.",
                       '<32>{#n1!}{#n2}* At least you still have steak to keep you company, right? ;)',
                       '<32>{#n2!}{#n1}* ... not this again.'
                    ]
                  : [
                       "<32>{#p/basic}{#n1}* I'm sad.\n* The food these days just gets worse and worse...",
                       '<32>* I was promised something \"real,\" but all I got was a cheap copy.',
                       '<32>{#n1!}{#n2}* Hey! ;)\n* Quit bad-mouthing my shop in front of the customers! ;)',
                       '<32>* Besides, what if your sense of taste is to blame ;)',
                       '<32>{#n2!}{#n1}* ... typical.'
                    ],
            () => [
               SAVE.data.n.plot === 72 && 6 <= world.population
                  ? "<32>{#p/basic}{#n1}* ... it isn't what it is?"
                  : '<32>{#p/basic}{#n1}* ... it is what it is.'
            ]
         )
      },
      pie: () =>
         3 <= SAVE.data.n.cell_insult
            ? [ '<32>{#p/human}* (You got the Burnt Pie.)' ]
            : SAVE.data.n.state_wastelands_mash === 1
            ? [ '<32>{#p/human}* (You got the Pie Soup.)' ]
            : SAVE.data.b.snail_pie
            ? [ '<32>{#p/human}* (You got the Snail Pie.)' ]
            : [ '<32>{#p/human}* (You got the Butterscotch Pie.)' ],
      plot_call: {
         a: () => [
            '<32>{#p/event}* Ring, ring...',
            3 <= SAVE.data.n.cell_insult
               ? '<25>{#p/toriel}* Hello, child.'
               : '<25>{#p/toriel}* Hello?\n* This is Toriel.',
            '<25>{#f/1}* For no reason in particular...',
            '<25>{#f/0}* Do you prefer cinnamon, or butterscotch?',
            choicer.create('* (Which do you prefer?)', 'Cinnamon', 'Bscotch'),
            3 <= SAVE.data.n.cell_insult
               ? '<25>{#p/toriel}{#f/0}* I see.'
               : '<25>{#p/toriel}* Oh, I see!\n* Thank you very much!'
         ],
         b: () => [
            '<32>{#p/event}* Ring, ring...',
            3 <= SAVE.data.n.cell_insult
               ? '<25>{#p/toriel}* Hello, child.'
               : '<25>{#p/toriel}* Hello?\n* This is Toriel.',
            [
               '<25>{#f/1}* You do not DISLIKE butterscotch, do you?',
               '<25>{#f/1}* You do not DISLIKE cinnamon, do you?'
            ][SAVE.data.n.choice_flavor],
            '<25>{#f/1}* I know what your preference is, but...',
            '<25>{#f/1}* Would you still be satisfied if it turned up on your plate?',
            choicer.create('* (What do you say?)', 'Si', 'No')
         ],
         b1: () => [
            3 <= SAVE.data.n.cell_insult
               ? '<25>{#p/toriel}{#f/0}* Got it.'
               : '<25>{#p/toriel}* Right, right, of course.',
            '<25>{#f/1}* Carry on, then...'
         ],
         b2: () => [
            '<25>{#p/toriel}{#f/5}* ...',
            '<25>{#f/0}* Well then.',
            '<25>{#f/1}* ...',
            3 <= SAVE.data.n.cell_insult
               ? '<25>{#f/0}* I will see what I can do.'
               : '<25>{#f/0}* I will call you back later, my child.'
         ],
         c: [
            '<32>{#p/event}* Ring, ring...',
            '<25>{#p/toriel}{#f/1}* You do not have any allergies, do you?',
            '<25>{#f/5}* ...',
            '<25>{#f/5}* I suppose humans cannot even be allergic to monster food.',
            '<25>{#f/0}* Hee hee.\n* Forget I asked!'
         ],
         d: [
            '<32>{#p/event}* Ring, ring...',
            '<25>{#p/toriel}{#f/1}* Hello, little one.',
            '<25>{#f/0}* I realize now that it has been a while since I cleaned up.',
            '<25>{#f/1}* There are likely plenty of things strewn about...',
            '<25>{#f/0}* You may pick them up if you like, but do not try to carry too much.',
            '<25>{#f/1}* What if you see something you really want?',
            '<25>{#f/0}* You will want to leave room in your pockets for that.'
         ]
      },
      puzzle1A: () =>
         SAVE.data.b.svr
            ? [ '<32>{#p/human}* (The switch appears to be stuck.)' ]
            : [ '<32>{#p/basic}* The switch is stuck.' ],
      puzzle3A: () =>
         SAVE.data.b.svr
            ? [ '<32>{#p/human}* (The switch appears to be stuck.)' ]
            : [ '<32>{#p/basic}* The switch is stuck.' ],
      return1: () => [
         SAVE.data.n.cell_insult < 3
            ? '<25>{#p/toriel}{#f/1}* My child, how did you get here!?'
            : '<25>{#p/toriel}{#f/1}* Ah... there you are.',
         '<25>* Are you alright?'
      ],
      return2a: () =>
         SAVE.data.n.cell_insult < 3
            ? [ '<25>{#p/toriel}* Not a scratch!\n* Impressive.' ]
            : [ '<25>{#p/toriel}{#f/10}* Not a scratch...\n* Very well.' ],
      return2b: () =>
         SAVE.data.n.cell_insult < 3
            ? [ '<25>{#p/toriel}{#f/4}* You look hurt...', '<25>{#f/10}* There, there, I will heal you.' ]
            : [ '<25>{#p/toriel}{#f/9}* You have been hurt.', '<25>{#f/10}* Please, allow me to heal your injuries.' ],
      return2c: [
         '<25>{#p/toriel}{#f/3}* ...',
         '<25>{#f/11}* Who did this to you?\n* Someone is going to answer for this.'
      ],
      return3: () => [
         '<25>{#p/toriel}* I apologize, young one.\n* It was foolish of me to leave you on your own.',
         ...(world.postnoot
            ? [
                 '<25>{#f/1}* ... is it just me, or is something wrong with the atmosphere?',
                 '<25>{#f/5}* Perhaps the system that provides it is not functioning properly.',
                 '<25>{#f/5}* ...',
                 '<25>{#f/0}* No matter.\n* I am sure it will be resolved shortly.'
              ]
            : []),
         '<25>{#f/1}* Come!\n* I have a surprise for you.'
      ],
      return4: () => [
         '<25>{#p/toriel}* Welcome to my parlor!',
         ...(3 <= SAVE.data.n.cell_insult
            ? [
                 '<25>{#f/1}* Can you smell...',
                 '<25>{#p/toriel}{#f/2}* ... oh, I forgot to check the oven!',
                 '<25>{#p/toriel}{#f/5}* I have been so pre- occupied with your previous behavior, I...',
                 '<25>{#p/toriel}{#f/1}* I must take care of this now, please do not wander off!'
              ]
            : [
                 '<25>{#f/1}* Can you smell that?',
                 ...(SAVE.data.b.snail_pie
                    ? [ '<25>{#f/0}* Surprise!\n* It is a homemade snail pie.' ]
                    : [
                         '<25>{#f/0}* Surprise!\n* It is a butterscotch- cinnamon pie.',
                         '<25>{#f/0}* I thought you might prefer that instead of snail pie for tonight.'
                      ]),
                 '<25>{#f/1}* Now, it has been a long time since I have cared for anyone...',
                 '<25>{#f/0}* But I still want you to have a nice time living here.',
                 '<25>{#f/0}* Follow me!\n* I have another surprise for you.'
              ])
      ],
      return5: [
         "<25>{#p/toriel}* Would you look at that!\n* It's a room of your very own.",
         '<25>{#f/1}* I hope you like it...'
      ],
      return6: [
         '<25>{#p/toriel}{#f/1}* Well, I have to go check on the pie.',
         '<25>{#f/0}* Please, make yourself at home!'
      ],
      runaway1: [
         [ '<25>{#p/toriel}{#f/1}* Should you not play at the house instead?', '<25>{#f/0}* Vamos.' ],
         [ '<25>{#p/toriel}{#f/9}* Child, it is dangerous to play out here.', '<25>{#f/5}* Trust me.' ],
         [ '<26>{#p/toriel}{#f/5}* The gravity is low here.\n* You will float away.' ],
         [ '<25>{#p/toriel}{#f/5}* The atmopsheric system is weak here.\n* You will suffocate.' ],
         [ '<25>{#p/toriel}{#f/23}* There is really nothing for you to see here.' ],
         [ '<25>{#p/toriel}{#f/1}* Would you like to read a book with me?' ],
         [ '<25>{#p/toriel}{#f/1}* Would you like to revisit the other rooms in the Outlands?' ],
         [ '<25>{#p/toriel}{#f/5}* I will not allow you to endanger yourself.' ],
         [ '<25>{#p/toriel}{#f/3}* Do you expect me to do this all day?' ],
         [ '<25>{#p/toriel}{#f/4}* ...' ],
         [ '<25>{#p/toriel}{#f/17}* ...', '<25>{#f/15}* I do not like the game you are playing.' ],
         [ '<25>{#p/toriel}{#f/17}* ...' ]
      ],
      runaway2: [
         '<25>{#p/toriel}{#f/1}* Please come back to the house, little one...',
         '<25>{#f/0}* I have something to show you!'
      ],
      runaway3: [
         '<25>{#p/toriel}{#f/2}* Child, no!\n* It is not safe for you out here!',
         '<25>{#f/0}* Come. I have finished preparing breakfast.'
      ],
      runaway4: [ '<25>{#p/toriel}{#f/2}* Child!\n* What are you doing!?' ],
      runaway5: [
         '<25>{#p/toriel}{#f/1}* Do you not realize what would happen if you left here?',
         '<25>{#f/5}* I... I am sorry I did not pay more attention to you...',
         '<25>{#f/9}* Maybe if I had, you would not have run away...'
      ],
      runaway6: [
         '<25>{#g/torielStraightUp}* I must admit... I am afraid of leaving here myself.',
         '<25>{#f/9}* There are many dangers beyond which would threaten us both.',
         '<25>{#g/torielSincere}* I do want to protect you from them, but...',
         '<25>{#g/torielStraightUp}* If I follow you out of here, I would only put you in further danger.',
         '<25>{#f/9}* My presence would be seen as a threat.'
      ],
      runaway7: [
         '<25>{#p/toriel}{#f/5}* Please...',
         '<25>{#f/1}* Come back with me, and I promise to take care of you.',
         '<25>{#f/5}* I will do anything you ask, alright?',
         '<25>{#f/18}* Please... do not leave me like the others...'
      ],
      runaway7a: [
         '<25>{#p/toriel}{#f/18}* ...',
         '<25>{#g/torielCompassionSmile}* There, there, my child.\n* Everything will be alright now.',
         '<25>{#f/1}* Return to the house, and I will rejoin you soon.',
         '<25>{#f/5}* There is something I have to do here.'
      ],
      runaway7b: [
         '<25>{#p/toriel}{#f/21}* How pathetic...',
         '<25>* I cannot...\n* Even protect a single human child...',
         '<32>{#p/human}* (You hear footsteps fading into the distance.)'
      ],
      silencio: {
         a: pager.create(
            0,
            () =>
               SAVE.data.n.plot === 72
                  ? [
                       '<32>{#p/basic}{#n1}* Hey there.\n* Nice to see you back here.',
                       "<32>* I've decided to revisit this old stomping ground of mine...",
                       "<32>* Besides, it's quiet here.\n* Just like me.",
                       "<32>* Oh, and I've retired from working at the CORE.",
                       '<32>* You see, when I joined the engineering team...',
                       "<32>* I didn't realize I'd be called on for impromptu guard duty.",
                       '<32>* ... it would seem deception of the corporate variety is beyond even my foresight.'
                    ]
                  : SAVE.data.b.napsta_performance
                  ? [
                       '<32>{#p/basic}{#n1}* Hey there.\n* Nice to see you at the show.',
                       "<32>* The name's Silencio... but I'm sure you've heard that by now.",
                       '<32>* Everyone around here knows my name, even that DJ.',
                       '<32>* I once performed my own kind of musical here.',
                       '<32>* \"Silencio\'s Great Escape,\" it was called.',
                       '<32>* Once it was over, I was gone before the crowd could even catch their breath.'
                    ]
                  : [
                       '<32>{#p/basic}{#n1}* Hey there.\n* Nice to meet you.',
                       "<32>* The name's Silencio... well, that's what they call me, anyway.",
                       '<32>* You wanna know why they call me that?',
                       "<32>* I'm like a space ninja, silent as the most silent of stars.",
                       '<32>* I can slip out of any danger, no exceptions.',
                       "<32>* Don't believe me?\n* Try something funny, and you'll see how fast I run."
                    ],
            () =>
               SAVE.data.n.plot === 72
                  ? [
                       "<32>{#p/basic}{#n1}* Oh, yeah, I guess I'm free to leave the galaxy now.",
                       "<32>* ... but maybe I'll stay."
                    ]
                  : SAVE.data.b.napsta_performance
                  ? [
                       '<32>{#p/basic}{#n1}* You might even say, that performance of mine...',
                       '<32>* Was \"breathtaking.\"'
                    ]
                  : [
                       '<32>{#p/basic}{#n1}* What are you still talking to me for, huh?',
                       "<32>* I've already said everything I'm willing to."
                    ]
         )
      },
      
      socks0: [ '<32>{#p/human}* (You peek inside.)', '<32>{#p/human}* (It appears the drawer is empty.)' ],
      socks1: () =>
         world.darker
            ? [ '<32>{#p/human}* (You peek inside.)', "<32>{#p/basic}* It's just a sock drawer." ]
            : [
                 '<32>{#p/human}* (You peek inside.)',
                 '<32>{#p/basic}* Scandalous!',
                 "<32>* It's Toriel's sock collection.\n* A little messy...",
                 world.meanie
                    ? choicer.create('* (Make it messier?)', 'Si', 'No')
                    : choicer.create('* (Clean up the mess?)', 'Si', 'No')
              ],
      socks2: () =>
         world.meanie
            ? [ '<33>{#p/human}* (You make a mess of the socks.)' ]
            : [
                 '<32>{#p/human}* (You organize the socks into matching pairs.)',
                 ...(SAVE.data.b.oops
                    ? []
                    : [
                         "<32>{#p/human}* (...)\n* (It appears there's a key hidden in the drawer.)",
                         choicer.create('* (Take the key?)', 'Si', 'No')
                      ])
              ],
      socks3: () => [
         "<32>{#p/human}* (...)\n* (It appears there's a key hidden in the drawer.)",
         choicer.create('* (Take the key?)', 'Si', 'No')
      ],
      socks4: [ '<32>{#p/human}* (You decide not to do anything.)' ],
      socks5: [
         '<32>{#s/equip}{#p/human}* (The Secret Key was added to your keyring.)',
         '<32>{#p/basic}* But what could it unlock...?'
      ],
      socks6: [ '<32>{#p/human}* (You decide not to take anything.)' ],
      socks7: () =>
         SAVE.data.b.svr
            ? [
                 '<32>{#p/human}* (You stare into the sock drawer, recalling the long journey that started here.)',
                 "<32>{#p/human}* (You can't help but wonder where you'd be without it.)"
              ]
            : world.darker
            ? [ "<32>{#p/basic}* It's just a sock drawer." ]
            : SAVE.data.n.plot < 72
            ? [ "<32>{#p/basic}* You can't stop looking at the socks." ]
            : SAVE.data.b.oops
            ? [
                 "<32>{#p/basic}* You came all this way just to revisit Toriel's sock drawer...?",
                 '<32>* You have great priorities in life.'
              ]
            : [
                 "<32>{#p/basic}* You came all this way just to revisit Toriel's sock drawer...?",
                 '<32>* ... I guess that makes sense.'
              ],
      steaksale: {
         a: pager.create(
            0,
            () =>
               SAVE.data.b.napsta_performance
                  ? [
                       '<32>{#p/basic}{#n1}* Sup, lassy ;)',
                       "<32>* It was good seeyin' ya at the show, ya know? ;)",
                       '<32>* You did a real bang-up job ;)',
                       "<32>* If one thing's for sure, I think that calls for a special offer ;)",
                       '<32>* For a limited time only, our products will be infused with our \"premium\" ingredients ;)',
                       "<32>* And believe me, lassy, this ain't just the same old stuff as before, aw naw ;)",
                       '<32>* This stuff is GENUINE, yo ;)',
                       "<32>* It's a little more expensive, so I hope ya don't mind ;)",
                       "<32>* Now... why don'tcha check out what's for sale? ;)"
                    ]
                  : [
                       '<32>{#p/basic}{#n1}* Sup, lassy ;)',
                       '<32>* The boss man sent me out here to see what you country peeps are up to, ya know? ;)',
                       "<32>* You could say we're expanding our enterprise ;)",
                       "<32>* What's our enterprise, you ask? ;)",
                       "<32>* Well, it's quite simple really... we sell steak ;)",
                       "<32>* And this ain't the replicated stuff, aw naw ;)",
                       '<32>* This stuff is REAL, yo ;)',
                       '<32>* Anyone who says otherwise is a poser, ya feel me? ;)',
                       "<32>* That being said, why don'tcha check out what's for sale? ;)"
                    ],
            [ "<32>{#p/basic}{#n1}* Why don'tcha check out what's for sale? ;)" ]
         ),
         a1: [ '<32>{#p/basic}{#n1}* Thanks for everything, lassy ;)' ],
         b: () => [
            SAVE.data.b.napsta_performance
               ? world.darker
                  ? '<32>{#p/basic}{#n1!}* \"Sizzli Steak\" for 40G.'
                  : '<32>{#p/basic}{#n1!}* It\'s labelled \"Sizzli Steak\" and costs 40G.\n* Smells like ultra-hyperbole.'
               : world.darker
               ? '<32>{#p/basic}{#n1!}* \"Sizzli Steak\" for 20G.'
               : '<32>{#p/basic}{#n1!}* It\'s labelled \"Sizzli Steak\" and costs 20G.\n* Smells like hyperbole.',
            SAVE.data.b.napsta_performance
               ? choicer.create('* (Buy the Sizzli Steak for 40G?)', 'Si', 'No')
               : choicer.create('* (Buy the Sizzli Steak for 20G?)', 'Si', 'No')
         ],
         b1: [ '<32>{#p/human}{#n1!}* (You got the Sizzli Steak.)', '<32>{#p/basic}{#n1}* Slick choice, lassy ;)' ],
         b2: [ '<32>{#p/human}{#n1!}* (You decide not to buy.)' ],
         c: () => [
            SAVE.data.b.napsta_performance
               ? world.darker
                  ? '<32>{#p/basic}{#n1!}* \"Fizzli Soda\" for 10G.'
                  : '<32>{#p/basic}{#n1!}* It\'s labelled \"Fizzli Soda\" and costs 10G.\n* Who would EVER buy this?'
               : world.darker
               ? '<32>{#p/basic}{#n1!}* \"Fizzli Soda\" for 5G.'
               : '<32>{#p/basic}{#n1!}* It\'s labelled \"Fizzli Soda\" and costs 5G.\n* Who would buy this?',
            SAVE.data.b.napsta_performance
               ? choicer.create('* (Buy the Fizzli Soda for 10G?)', 'Si', 'No')
               : choicer.create('* (Buy the Fizzli Soda for 5G?)', 'Si', 'No')
         ],
         c1: [ '<32>{#p/human}{#n1!}* (You got the Fizzli Soda.)', "<32>{#p/basic}{#n1}* Careful, it's sweet ;)" ],
         c2: [ '<32>{#p/human}{#n1!}* (You decide not to buy.)' ],
         d: pager.create(
            0,
            () => [
               "<32>{#p/human}{#n1!}* (You don't have enough G.)",
               '<32>{#p/basic}{#n1}* Not enough money, huh? ;)',
               SAVE.data.b.napsta_performance
                  ? '<32>{#p/basic}* That\'s alright, lassy ;)\n* Not everyone can afford the \"premium\" ingredients ;)'
                  : "<32>{#p/basic}* That's alright, lassy ;)\n* Just be sure to come back when you've got some ;)"
            ],
            [ "<32>{#p/human}{#n1!}* (You don't have enough G.)" ]
         ),
         e: pager.create(
            0,
            [
               "<32>{#p/human}{#n1!}* (You're carrying too much.)",
               '<32>{#p/basic}{#n1}* Maybe you should come back later ;)'
            ],
            [ "<32>{#p/human}{#n1!}* (You're carrying too much.)" ]
         ),
         f: [ '<32>{#p/human}{#n1!}* (You got the Sizzli Steak.)' ],
         g: [ '<32>{#p/human}{#n1!}* (You got the Fizzli Soda.)' ],
         h: [ "<32>{#p/human}{#n1!}* (You're carrying too much.)" ],
         i: [
            "<32>{#p/basic}{#n1}* By the way, we're outta stock ;)",
            "<32>* Seems you can't get enough of our stuff ;)",
            '<32>* Say, if- no, when you meet the boss-man... tell him this ;)',
            '<32>{#p/human}{#n1!}* (Aaron whispered something in your ear.)',
            '<32>{#p/basic}{#n1}* Good luck out there, lassy ;)'
         ]
      },
      supervisor: {
         a: [ '<32>{#p/basic}* Later...' ],
         b: [
            '<32>{#p/napstablook}* hey everyone...',
            '<32>* this is a little tune i wrote a while ago...',
            "<32>* i've been experimenting with my style lately, so...",
            "<32>* hopefully, it's good enough for you all",
            '<32>* ...',
            '<32>* well, here we go...'
         ],
         c1: [ '<32>{*}{#p/basic}* Well, this is jazzy.{^30}{%}' ],
         c2: [
            '<25>{*}{#p/toriel}{#f/7}* Why has Napstablook never mentioned this??\n* This is good!{^30}{%}',
            "<32>{*}{#p/basic}* Yeah, maybe they're just shy.{^30}{%}"
         ],
         c3: [ '<32>{*}{#p/basic}* Ooh, bells ;){^30}{%}' ],
         c4: [ '<32>{*}{#p/basic}* Here comes the breakdown!{^30}{%}' ],
         c5: [ '<32>{*}{#p/basic}* Well, that was... something.{^30}{%}' ],
         d: [
            '<32>{#p/napstablook}* yeah, that was something',
            '<32>{#p/napstablook}* oh well...\n* i probably bored you guys...',
            '<32>{#p/napstablook}* sorry...'
         ],
         e: [
            '<25>{|}{#p/toriel}{#f/2}* No, wait!\n* That was actually...',
            "<32>{#p/basic}* I don't think they can hear you, Toriel.",
            '<25>{#p/toriel}{#f/9}* ...\n* They never do...'
         ]
      },
      terminal: {
         a: () =>
            postSIGMA()
               ? [ "<32>{#p/human}* (You activate the terminal, but there's no incoming message.)" ]
               : SAVE.data.n.plot === 72
               ? !world.runaway
                  ? [
                       '<32>{#p/human}* (You activate the terminal and play the incoming message.)',
                       "<32>{#p/alphys}* We're free, everyone!\n* This isn't a joke, the force field's gone!",
                       "<32>* Seriously, they're shutting down the core in a few days, so it's time to go!",
                       "<32>* You don't want to die here, do you?"
                    ]
                  : [
                       '<32>{#p/human}* (You activate the terminal and play the incoming message.)',
                       "<32>{#p/alphys}* The force field's gone.\n* Calling all citizens for immediate evacuation.",
                       "<32>* ... I know you're all afraid, but it's going to be okay.",
                       "<32>* They can't hurt us if we leave them behind."
                    ]
               : 37.2 <= SAVE.data.n.plot
               ? [
                    '<32>{#p/human}* (You activate the terminal and play the incoming message.)',
                    "<32>{#p/alphys}* The Foundry's fluid network has been repaired, thanks to our... v-very kind workers.",
                    '<32>* ...',
                    "<32>* On an unrelated note, we're... l-looking for new workers."
                 ]
               : [
                    '<32>{#p/human}* (You activate the terminal and play the incoming message.)',
                    "<32>{#p/alphys}* The Foundry's fluid network is f-falling apart again.",
                    '<32>* The workers have promised a short turnaround, but things are looking bleak.',
                    '<32>* Please, i-if anyone out there can help, we need you...'
                 ]
      },
      torieldanger: {
         a: [ '<25>{#p/toriel}{#f/1}* Have you tried checking the terminal?' ],
         b: [ '<25>{#p/toriel}{#f/1}* The password terminal is right over there, little one.' ]
      },
      latetoriel1: [
         '<25>{#p/toriel}{#npc/a}{#f/2}* ...!',
         '<25>{#f/5}* What are you doing out here, my ch...',
         '<25>{#f/9}* ... child...',
         '<25>{#f/5}* I cannot care for you any longer, child.\n* Nor should I.',
         '<25>{#f/5}* You have places to be, things to see...',
         '<25>{#f/10}* Who am I to keep you from that?',
         '<25>{#f/9}* ...',
         '<25>{#f/5}* Please, carry on without me...',
         '<25>{#f/1}* ... I know you can do the right thing...'
      ],
      latetoriel2: [ '<25>{#p/toriel}{#npc/a}{#f/5}* ... go on...' ],
      
      lateasriel: () =>
         [
            [ '<25>{#p/asriel1}{#f/13}* Just leave me, Frisk...', "<25>{#f/15}* I can't come back with you, okay?" ],
            [
               "<25>{#p/asriel1}{#f/16}* I don't want to break their hearts all over again.",
               "<25>{#f/13}* It's better if they never see me at all."
            ],
            [
               '<25>{#p/asriel1}{#f/15}* ... what are you doing?',
               '<25>{#f/15}* Are you trying to keep me company?',
               '<25>{#f/23}* Frisk...',
               '<25>{#f/22}* ...',
               '<25>{#f/13}* Hey.',
               '<25>{#f/13}* Let me ask you a question.',
               '<25>{#f/15}* Frisk...\n* Why did you come here?',
               '<25>{#f/13}* Everyone knows the story, right...?',
               '<25>{#f/23}* \"Spacecraft who fly into the Ebott sector are said to disappear.\"',
               '<25>{#f/22}* ...',
               '<32>{#p/human}* (...)\n* (You tell Asriel the truth.)',
               '<25>{#p/asriel1}{#f/25}* ...',
               '<25>{#f/25}* Frisk... you...',
               '<25>{#f/23}* ...',
               "<25>{#f/23}* You don't have to be alone anymore, okay?",
               "<25>{#f/17}* You've made so many wonderful friends here...",
               "<25>{#f/17}* They'll look out for you, okay?"
            ],
            [
               '<25>{#p/asriel1}{#f/15}* ...',
               '<25>{#f/15}* I know why $(name) flew out here.',
               "<25>{#f/16}* It wasn't for a very happy reason.",
               "<25>{#f/13}* Frisk.\n* I'll be honest with you.",
               '<25>{#f/15}* $(name) wanted nothing to do with humanity.',
               '<25>{#f/16}* Why, they never said.',
               '<25>{#f/15}* But they felt very strongly about that.'
            ],
            [
               "<25>{#p/asriel1}{#f/17}* Frisk, it's okay.\n* You're not like $(name) at all.",
               '<25>{#f/15}* In fact, though you have similar, uh, fashion choices...',
               "<25>{#f/13}* I don't know why I ever acted like you were the same person.",
               '<25>{#f/15}* Maybe...\n* The truth is...',
               "<25>{#f/16}* $(name) just wasn't who I wanted them to be.",
               '<25>{#f/13}* While, Frisk...',
               "<25>{#f/17}* You're the kind of friend I've always wanted to have.",
               '<25>{#f/20}* So maybe I was kind of projecting a little.',
               "<25>{#f/17}* Let's be honest.\n* I did some weird stuff as a star."
            ],
            [
               "<25>{#p/asriel1}{#f/13}* There's one last thing I feel like I should tell you.",
               '<25>{#f/15}* When $(name) and I combined our SOULs together...',
               '<25>{#f/16}* The control over our body was actually split between us.',
               '<25>{#f/15}* They were the one that picked up their own empty body.',
               "<25>{#f/13}* And then, when we made it to the planet's remains...",
               '<25>{#f/13}* They were the one that wanted to...',
               '<25>{#f/16}* ... to use our full power.',
               '<25>{#f/13}* It took everything I had to resist it.',
               '<25>{#f/15}* And then, because of me, we...',
               "<25>{#f/22}* Well, that's why I ended up the way I did.",
               '<25>{#f/23}* ... Frisk.',
               "<25>{#f/17}* This whole time, I've blamed myself for that decision.",
               "<25>{#f/13}* It's why I adopted that horrible view of the world.",
               '<25>{#f/13}* \"Kill or be killed.\"',
               '<25>{#f/17}* But now...\n* After meeting you...',
               "<25>{#f/23}* Frisk, I don't regret that decision anymore.",
               '<25>{#f/22}* I did the right thing.',
               "<25>{#f/13}* If we'd killed those humans...",
               '<25>{#f/15}* We would have had to wage war against all of humanity.',
               '<25>{#f/17}* And in the end, everyone went free, right?',
               '<25>{#f/17}* Even the others who came here made it out alive.',
               '<25>{#f/13}* ...',
               '<25>{#f/15}* But, $(name)...',
               "<25>{#f/16}* ... I can't say for certain what happened to them after we died.",
               '<25>{#f/15}* Nothing was ever found... not even their SOUL.',
               "<25>{#f/15}* So... I can't help but wonder if they're... still out there.",
               '<32>{#p/basic}* ...',
               '<32>{#p/human}* (Suena como si alguien estuviera llorando...)'
            ],
            [
               '<25>{#p/asriel1}{#f/17}* Frisk, thank you for listening to me.',
               '<25>{#f/17}* You should really go be with your friends now, okay?',
               '<25>{#f/13}* Oh, and, please...',
               '<25>{#f/20}* In the future, if you, uh, see me...',
               "<25>{#f/15}* ... don't think of it as me, okay?",
               '<25>{#f/16}* I just want you to remember me like... this.',
               '<25>{#f/17}* Someone that was your friend for a little while.',
               '<25>{#f/13}* ...',
               '<32>{|}{#p/human}* (You tell Asriel you really- {%}',
               "<25>{#p/asriel1}{#f/23}* Frisk, it's okay.",
               "<25>{#f/22}* You don't have to save everyone to be a good person.",
               '<25>{#f/13}* Besides... even if I could keep this form...',
               "<25>{#f/15}* I don't know if I could move on from what happened in the past.",
               "<25>{#f/17}* ... just promise me you'll take care of yourself, alright?",
               '<25>{#f/13}* ...',
               '<25>{#f/15}* Well, see you.'
            ],
            [ '<25>{#p/asriel1}{#f/13}* Frisk...', "<25>{#f/15}* Don't you have anything better to do?" ],
            []
         ][Math.min(SAVE.data.n.lateasriel++, 8)],
      securefield: [ '<33>{#p/basic}* There is a security field here.\n* It is active.' ],
      trivia: {
         w_security: [ "<32>{#p/basic}* It's a security field." ],
         photoframe: () =>
            SAVE.data.b.svr
               ? [
                    [
                       '<25>{#p/asriel1}{#f/13}* An empty photo frame...',
                       '<25>{#f/16}* Once upon a time, there WERE pictures in these frames.',
                       '<25>{#f/15}* Then, she took them out and never put them back.',
                       "<25>{#f/16}* ... must've hurt too much to look at them."
                    ],
                    [
                       '<25>{#p/asriel1}{#f/13}* Empty photo frames are like missing memories...',
                       '<25>{#p/asriel1}{#f/15}* This place has way too many of them.'
                    ],
                    [ '<25>{#p/asriel1}{#f/22}* Too many of these in this strange place.' ]
                 ][Math.min(asrielinter.photoframe++, 1)]
               : SAVE.data.n.plot === 72 && !world.runaway
               ? [ '<32>{#p/basic}* Still an empty photo frame.' ]
               : [ '<32>{#p/basic}* An empty photo frame.' ],
         w_paintblaster: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (This device seems to be a few decades out of date.)' ]
               : world.darker
               ? [ '<32>{#p/basic}* A useless device of little importance to anyone.' ]
               : [ '<32>{#p/basic}* An old fuel injection device.' ],
         w_candy: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The sign warns of unexpected appliance malfunctions.)' ]
               : [ '<32>{#p/basic}* \"Please note that appliances may be more malfunction-prone than they seem.\"' ],
         w_djtable: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (You touch the DJ set.)\n* (It makes an oddly satisfying scratching sound.)' ]
               : world.darker
               ? [ "<32>{#p/basic}* It's a DJ set." ]
               : SAVE.data.n.plot === 72
               ? [ '<32>{#p/basic}* A fancy DJ set, which is surprisingly not in use right now.' ]
               : [ '<32>{#p/basic}* A fancy DJ set, equipped with knobs and sliders galore.' ],
         w_froggit: () =>
            SAVE.data.n.plot === 72
               ? [
                    '<32>{#p/basic}* Ribbit, ribbit.\n* (Excuse me, human.)',
                    '<32>* (You seem like you have grown into a thoughtful and conscientious person.)',
                    "<32>* (Whether that was from my advice or not...)\n* (I'm quite proud.)",
                    '<32>* Ribbit.'
                 ]
               : [
                    '<32>{#p/basic}* Ribbit, ribbit.\n* (Excuse me, human...)',
                    '<32>* (I have some advice for you about battling monsters.)',
                    '<32>* (If you {@fill=#ff0}ACT{@fill=#fff} a certain way or {@fill=#3f00ff}FIGHT{@fill=#fff} until you almost defeat them...)',
                    '<32>* (They might not want to battle you anymore.)',
                    '<32>* (If a monster does not want to fight you, please...)',
                    '<32>* (Use some {@fill=#ff0}MERCY{@fill=#fff}, human.)\n* Ribbit.'
                 ],
         w_froggit_view: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (You stare thoughtfully into the cosmos beyond...)' ]
               : world.darker
               ? []
               : SAVE.data.n.plot === 72
               ? [
                    "<32>{#p/basic}* It's ironic how staring at outer space...",
                    '<32>* Tends to be a great way to channel your inner thoughts.'
                 ]
               : [
                    "<32>{#p/basic}* It's a view of outer space.",
                    '<32>* Certainly no shortage of those around here, is there?'
                 ],
         w_kitchenwall: () =>
            SAVE.data.n.plot === 9
               ? [ '<26>{#p/toriel}{#f/1}* Patience, my child!' ]
               : [ '<26>{#p/toriel}{#f/1}* This may take a while...' ],
         w_lobby1: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The sign speaks of strength of will in times of trouble.)' ]
               : [ '<32>{#p/basic}* \"Even when you stumble, the will to push onward shows through.\"' ],
         w_pacing_view: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (You stare happily into the cosmos beyond...)' ]
               : world.darker
               ? []
               : SAVE.data.n.plot === 72
               ? [
                    "<32>{#p/basic}* After such a long journey, the glass doesn't seem to scare you.",
                    '<32>* Not that it ever did in the first place.'
                 ]
               : [
                    '<32>{#p/basic}* To think the only thing between you and the endless expanse is a sheet of glass...',
                    "<32>* Despite all common sense, this doesn't seem to bother you."
                 ],
         w_pacing1: () =>
            SAVE.data.n.plot === 72
               ? [
                    '<32>{#p/basic}* Ribbit, ribbit.\n* (Someone passed by here not too long ago.)',
                    '<32>* (He told me not to tell you where he was going.)',
                    "<32>* (I wasn't going to, but then, he just seemed so sad...)",
                    "<32>* (He's probably at the platform just past the entrance now.)",
                    '<32>* (Go. Speak to him. Something good will come of it.)\n* Ribbit.',
                    '<32>{#p/basic}* ... Asriel...'
                 ]
               : [
                    '<32>{#p/basic}* Ribbit, ribbit.\n* (Sigh...)',
                    '<32>* (My \"friend\" doesn\'t really like being kind to me.)',
                    '<32>* (If given the option, they choose to hurt me instead.)',
                    "<32>* (That's right.......)\n* (Hurting me............)\n* (................)",
                    "<32>* (At least you're kind to me.)\n* Ribbit."
                 ],
         w_pacing2: () =>
            SAVE.data.n.plot === 72
               ? SAVE.data.b.oops
                  ? [
                       '<32>{#p/basic}* Ribbit, ribbit.\n* (Hello, human...)',
                       '<32>* (Have you heard from my friend?)',
                       '<32>* (They were standing here a few days ago, just to my left...)',
                       '<32>* (But some time after your arrival, they disappeared.)',
                       "<32>* (They did say they'd leave if you hurt anyone...)",
                       SAVE.data.n.exp <= 0
                          ? "<32>* (Which is confusing, since you definitely haven't done that.)\n* Ribbit."
                          : '<32>* (Maybe next time, you could try being a little nicer?)\n* Ribbit.'
                    ]
                  : [
                       '<32>{#p/basic}* Ribbit, ribbit.\n* (Hello, human...)',
                       "<32>* (My friend is the happiest they've ever been.)",
                       "<32>* (They said they'd leave if you hurt anyone, but you haven't.)",
                       "<32>* (In fact, they've decided to stay to my left forever.)",
                       '<32>* (As for that \"friend\" of theirs who always tried to hurt them...)',
                       '<32>* (Oh, he seems to have turned himself into a goat.)\n* Ribbit.'
                    ]
               : [
                    '<32>{#p/basic}* Ribbit, ribbit.\n* (Hello, human...)',
                    '<32>* (Have you ever tried checking your ITEMs?)',
                    "<32>* (If you've picked up anything, that's where you'll find it.)",
                    '<32>* (What do I have in my ITEMs, you ask?)',
                    "<32>* (Oh, you're silly... monsters don't have ITEMs!)\n* Ribbit."
                 ],
         w_pacing3: () =>
            SAVE.data.n.plot === 72
               ? SAVE.data.n.bully < 1
                  ? [
                       '<32>{#p/basic}* Ribbit, ribbit.\n* (Thank you for always showing mercy to us monsters.)',
                       '<32>* (I know I gave you advice on how to beat people up safely...)',
                       "<32>* (But that didn't mean I wanted you to do it.)",
                       '<32>* (You are a kind human indeed.)\n* Ribbit.'
                    ]
                  : SAVE.data.n.bully < 15
                  ? [
                       '<32>{#p/basic}* Ribbit, ribbit.\n* (Thank you for keeping the beatings to a minimum.)',
                       '<32>* (I know I gave you advice on how to beat people up safely...)',
                       "<32>* (But that didn't mean I wanted you to do it.)",
                       "<32>* (You aren't too terrible, at least for a human.)\n* Ribbit."
                    ]
                  : [
                       '<32>{#p/basic}* Ribbit, ribbit.\n* (So you have proven to be a formidable threat.)',
                       "<32>* (Yet, somehow, I'm still not afraid of you...)",
                       '<32>* (Perhaps at the end, you offered mercy when you could have attacked.)',
                       '<32>* (I do appreciate the restraint you have shown.)\n* Ribbit.'
                    ]
               : [
                    "<32>{#p/basic}* Ribbit, ribbit.\n* (If you beat up a monster until it's almost dead...)",
                    '<32>* (Its name will turn blue.)',
                    '<32>* (Weird, right?)\n* (But I heard humans turn blue when they get beat up, too.)',
                    '<32>* (So, I suppose you can relate to that.)',
                    '<32>* (Well, thank you for listening to my head-talk.)\n* Ribbit.'
                 ],
         w_puzzle1_view: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (You stare deeply into the cosmos beyond...)' ]
               : world.darker
               ? []
               : SAVE.data.n.plot === 72
               ? [ '<32>{#p/basic}* In the end, these rooms still feel like nothing more than lookout areas.' ]
               : [
                    '<32>{#p/basic}* Why does it feel like some of these rooms...',
                    '<32>* ... were just made solely to be lookout areas?'
                 ],
         w_puzzle2: () =>
            SAVE.data.b.svr
               ? world.nootflags.has('w_puzzle2') // NO-TRANSLATE

                  ? [
                       '<32>{#p/human}* (The sign describes puzzle- solving as an unnecessary part of space exploration.)',
                       ...[
                          [
                             '<25>{#p/asriel1}{#f/13}* Unlike most signs, this one has a point.',
                             "<25>{#f/15}* And that's not just because I'm the one who wrote it."
                          ],
                          [ "<25>{#p/asriel1}{#f/3}* ... don't tell me you actually enjoyed these puzzles." ],
                          [ "<25>{#p/asriel1}{#f/10}* Frisk, even you're not THAT weird." ]
                       ][Math.min(asrielinter.w_puzzle2++, 2)]
                    ]
                  : [ '<32>{#p/human}* (The sign describes the value of patience in space.)' ]
               : world.nootflags.has('w_puzzle2') // NO-TRANSLATE

               ? [
                    '<32>{#p/basic}* \"The final frontier is a deep dark sea.\"',
                    '<32>* \"Navigating its waters should NEVER require solving badly designed puzzles!\"'
                 ]
               : [
                    '<32>{#p/basic}* \"The final frontier is a deep dark sea.\"',
                    '<32>{#p/basic}* \"Before charging into the {@fill=#ff993d}great unknown{@fill=#fff}, you must wait for its {@fill=#00a2e8}currents to align{@fill=#fff}.\"'
                 ],
         w_puzzle3_view: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (You stare reflectively into the cosmos beyond...)' ]
               : world.darker
               ? []
               : SAVE.data.n.plot === 72
               ? [ '<32>{#p/basic}* It sure... was... a nice view.' ]
               : [ '<32>{#p/basic}* It sure is a nice view.' ],
         w_puzzle4: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The sign appears to be an advertisement for a now- defunct steak sale.)' ]
               : [
                    '<32>{#p/basic}* \"Be sure to catch a slice of Glyde\'s Signature Steak (TM) in the activities room!\"'
                 ],
         w_ta_box: () =>
            SAVE.data.b.svr
               ? [
                    [
                       '<25>{#p/asriel1}{#f/20}* Yeah... Toriel was never one to keep these in one piece.',
                       '<25>{#f/21}* Even these replicas of my model starships got smashed...'
                    ],
                    [
                       "<25>{#f/13}* It's surprising.\n* She's usually such an organized person.",
                       '<25>{#p/asriel1}{#f/17}* ... she must have been having a bad day.'
                    ],
                    [ '<25>{#p/asriel1}{#f/13}* It happens...' ]
                 ][Math.min(asrielinter.w_ta_box++, 2)]
               : world.darker
               ? [ "<32>{#p/basic}* It's a toy box.\n* The model starships have been smashed to pieces." ]
               : SAVE.data.n.plot === 72
               ? [
                    '<32>{#p/basic}* The little ships in this box were never repaired.',
                    "<32>* If this was at Asgore's house, they'd be in perfect shape."
                 ]
               : [
                    '<32>{#p/basic}* A box of model starships!\n* And... shattered glass?',
                    '<32>* Looks like someone broke their little ships.'
                 ],
         w_ta_cabinet: () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (You can't find anything in here besides several of the exact same outfit.)" ]
               : [
                    '<32>{#p/basic}* A cabinet full of blue and yellow striped shirts.',
                    ...(SAVE.data.n.plot === 72 ? [ "<32>* Like that's ever gonna change." ] : [])
                 ],
         w_ta_frame: () =>
            SAVE.data.b.svr
               ? [ [ "<25>{#p/asriel1}{#f/21}* ... it's missing..." ], [ '<25>{#p/asriel1}{#f/21}* ...' ] ][
                    Math.min(asrielinter.w_ta_frame++, 1)
                 ]
               : SAVE.data.n.plot === 72
               ? [ '<32>{#p/basic}* An empty photo frame.', "<32>* There still isn't much else to say." ]
               : [ '<32>{#p/basic}* An empty photo frame.', "<32>* There's not much else to say." ],
         w_ta_paper: () =>
            SAVE.data.b.svr
               ? [
                    "<32>{#p/human}* (The drawing doesn't appear to be anything of importance.)",
                    ...[
                       [
                          "<25>{#p/asriel1}{#f/13}* It's long gone now, but the real drawing I made here...",
                          '<25>{#f/17}* ... was basically the blueprint for my \"god of hyperdeath\" form.',
                          '<25>{#f/17}* Super skybreaker, titanium striker...',
                          '<25>{#f/20}* And, of course, the legendary \"hyper goner.\"'
                       ],
                       [
                          '<25>{#p/asriel1}{#f/17}* Yeah... I guess I had it all planned out.',
                          '<25>{#f/20}* I came up with lots of crazy stuff, all the time...',
                          '<25>{#f/1}* Ooh, you would have ADORED my pan-galactic starship concept.'
                       ],
                       [
                          '<25>{#p/asriel1}{#f/17}* Frisk, I hope...',
                          '<25>{#f/23}* I really hope we can have a moment like that between us.',
                          '<25>{#f/22}* Back with $(name), it was always...',
                          '<25>{#f/15}* ... difficult.'
                       ],
                       [ "<25>{#p/asriel1}{#f/20}* Don't worry.\n* If you can't draw, I'll just teach you." ]
                    ][Math.min(asrielinter.w_ta_paper++, 3)]
                 ]
               : world.darker
               ? [ '<32>{#p/basic}* A forgettable drawing.\n* Nothing like the original.' ]
               : [
                    "<32>{#p/basic}* A children's drawing, depicting a giant monster with rainbow wings.",
                    "<32>* It's just like the one at home..."
                 ],
         w_tf_couch: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The couch appears to have never been used.)' ]
               : SAVE.data.n.plot === 72
               ? [ "<32>{#p/basic}* No matter how much time passes, it's unlikely anyone will ever sit here." ]
               : world.darker
               ? [ "<32>{#p/basic}* It's a couch.\n* What else were you expecting?" ]
               : [
                    '<32>{#p/basic}* A comfortable-looking couch.',
                    '<32>* The temptation to sink into its luscious cushions is hard to resist...'
                 ],
         w_tf_table: () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (You glance at the end table, but it doesn't appear to glance back.)" ]
               : [
                    '<32>{#p/basic}* An unremarkable end table.',
                    "<32>{#p/basic}* Rather unrealistically, it's in near-perfect condition."
                 ],
         w_tf_window: () =>
            SAVE.data.b.svr
               ? SAVE.data.b.c_state_secret1_used && SAVE.data.b.c_state_secret5_used
                  ? [ '<32>{#p/human}* (You stare wishfully into the cosmos beyond...)' ]
                  : [ '<32>{#p/human}* (You stare wistfully into the cosmos beyond...)' ]
               : world.darker
               ? [ "<32>{#p/basic}* It's just another window." ]
               : SAVE.data.n.plot === 72
               ? [ "<32>{#p/basic}* As always, it's a beautiful view of outer space." ]
               : [ "<32>{#p/basic}* It's a beautiful view of outer space." ],
         w_th_door: () =>
            SAVE.data.b.svr
               ? [
                    '<32>{#p/human}* (The sign describes the room within as being incomplete.)',
                    ...[
                       [
                          "<25>{#p/asriel1}{#f/3}* If this house weren't a replica, that would be Dad's room...",
                          '<25>{#f/4}* You can guess why it was never finished.'
                       ],
                       [
                          '<25>{#p/asriel1}{#f/13}* ...',
                          '<25>{#f/15}* That speech affected Mom in a... not good way.',
                          '<25>{#f/4}* As a star, I sometimes... spied on her.',
                          "<25>{#f/3}* And the way she was talking, it's like she never left that moment.",
                          '<25>{#f/13}* Then, you arrived, and everything changed...'
                       ],
                       [
                          '<25>{#p/asriel1}{#f/13}* ...',
                          "<25>{#f/15}* This is too awkward.\n* I'm going to pretend we aren't here."
                       ],
                       [ '<25>{#p/asriel1}{#f/13}* ...' ]
                    ][Math.min(asrielinter.w_th_door++, 3)]
                 ]
               : [ '<32>{#p/basic}* \"Room under renovations.\"' ],
         w_th_mirror: () =>
            SAVE.data.b.svr
               ? [ "<25>{#p/asriel1}{#f/24}* It's us..." ]
               : world.genocide
               ? [ '<32>{#p/basic}* ...' ]
               : world.darker
               ? [ "<32>{#p/basic}* It's you." ]
               : SAVE.data.b.w_state_catnap || SAVE.data.n.plot > 17
               ? [ "<32>{#p/basic}* It's you...", '<32>{#p/basic}* ... and it always will be.' ]
               : [ "<32>{#p/basic}* It's you!" ],
         w_th_plant: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (You thank the plant for the warmth it brings each day.)' ]
               : SAVE.data.n.plot === 72
               ? [ "<32>{#p/basic}* This plant is just happy you're still alive." ]
               : world.darker
               ? [ '<32>{#p/basic}* This plant is not very happy to see you.' ]
               : SAVE.data.b.oops
               ? [ '<32>{#p/basic}* This plant is happy to see you.' ]
               : [ '<32>{#p/basic}* This plant is ecstatic about seeing you!' ],
         w_th_sausage: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (You rustle the corny plant.)' ]
               : [ '<32>{#p/basic}* This plant looks quite corny.' ],
         w_th_table1: () => [
            '<32>{#p/human}* (You look under the table and find a set of crayons.)',
            ...(SAVE.data.b.svr
               ? [
                    [
                       '<25>{#p/asriel1}{#f/24}* I think $(name) might have lost the blue crayon.',
                       '<25>{#f/7}* ... actually, no.\n* I KNOW they lost the blue crayon.',
                       '<25>{#f/6}* It turned up later in a food chest, but nobody thought to check it.',
                       '<25>{#f/16}* They must have been trying to claim the chest as their own.'
                    ],
                    [
                       "<26>{#p/asriel1}{#f/4}* If we ever get a new set of crayons, I'm keeping watch.",
                       '<25>{#f/3}* The moment you even think about losing a crayon...',
                       "<26>{#f/8}* I'll be there to stop that crime train before it even hits the tracks.",
                       '<25>{#f/2}* Just you wait.'
                    ],
                    [ "<25>{#p/asriel1}{#f/31}* I've got my eyes on you, Frisk.", '<25>{#f/8}* And... maybe my ears.' ],
                    [ '<25>{#p/asriel1}{#f/10}* Are you staring at my ears again?\n* You keep doing that.' ]
                 ][Math.min(asrielinter.w_th_table1++, 3)]
               : world.edgy
               ? [ '<32>{#p/basic}* Two crayons are missing from the set.' ]
               : world.darker
               ? [ '<32>{#p/basic}* One crayon is missing from the set.' ]
               : [
                    '<32>{#p/basic}* The ever-evasive blue crayon, missing for a hundred years...',
                    '<32>{#p/basic}* Truly a legend of our time.'
                 ])
         ],
         w_th_table2: () =>
            SAVE.data.b.svr
               ? [
                    '<32>{#p/human}* (You look under the table and find a deck of cards.)',
                    ...[
                       [
                          '<25>{#p/asriel1}{#f/27}* $(name) and I were never really into those kinds of things.',
                          '<25>{#p/asriel1}{#f/15}* Well... I say never.',
                          "<25>{#p/asriel1}{#f/15}* Uh, let's just not talk about it."
                       ],
                       [
                          '<25>{#p/asriel1}{#f/13}* ...',
                          '<25>{#p/asriel1}{#f/13}* The last time we did, a table got flipped over.',
                          '<25>{#p/asriel1}{#f/17}* Just sibling things.\n* You know how it goes with card games.'
                       ],
                       [ '<25>{#p/asriel1}{#f/17}* ...' ]
                    ][Math.min(asrielinter.w_th_table2++, 2)]
                 ]
               : world.darker
               ? [
                    '<32>{#p/human}* (You look under the table and find a deck of cards.)',
                    "<33>{#p/basic}* It's just not worth your time."
                 ]
               : SAVE.data.n.plot === 72
               ? [
                    '<32>{#p/human}* (You look under the table and find a deck of cards.)',
                    "<33>{#p/basic}* Soon enough, we'll never have to think about these again."
                 ]
               : [
                    '<32>{#p/human}* (You look under the table and find a deck of cards.)',
                    "<33>{#p/basic}* They're holographic, of course."
                 ],
         w_tk_counter: () =>
            SAVE.data.b.svr
               ? [
                    '<32>{#p/human}* (You run your hand across the cutting board, noting the various grooves and ridges.)'
                 ]
               : world.darker
               ? [ "<32>{#p/basic}* It's a cutting board." ]
               : [ "<32>{#p/basic}* Toriel's cutting board.\n* It's not as up-to-scratch as it used to be." ],
         w_tk_sink: () =>
            SAVE.data.b.svr
               ? [
                    [
                       '<25>{#p/asriel1}{#f/21}* $(name) always said leaving fur in the drain was super gross.',
                       '<25>{#f/15}* I always thought it was normal, though...'
                    ],
                    [
                       '<25>{#p/asriel1}{#f/13}* Do humans not shed fur?\n* $(name) would never tell me things like this.'
                    ],
                    [ "<25>{#p/asriel1}{#f/17}* I do have reason to believe humans shed.\n* Even if it's not fur." ]
                 ][Math.min(asrielinter.w_tk_sink++, 2)]
               : SAVE.data.n.plot === 72
               ? [ '<32>{#p/basic}* Remnants of the white fur once stuck here still remain to this very day.' ]
               : [ '<32>{#p/basic}* There are clumps of white fur stuck in the drain.' ],
         w_tk_stove: () =>
            SAVE.data.b.svr
               ? [
                    [
                       '<25>{#p/asriel1}{#f/13}* I have to wonder why she thought buying this would be a good idea.',
                       "<25>{#f/10}* Unless she wanted to re-create Asgore's kitchen...?",
                       "<25>{#f/17}* For someone who didn't like him, she had a weird way to show it."
                    ],
                    [
                       '<25>{#p/asriel1}{#f/15}* I really wish Toriel and Asgore stayed together sometimes.',
                       "<25>{#f/16}* ... but I guess it's for the best that they didn't."
                    ],
                    [ "<25>{#p/asriel1}{#f/13}* It just wasn't meant to be, Frisk..." ]
                 ][Math.min(asrielinter.w_tk_stove++, 2)]
               : SAVE.data.n.state_wastelands_toriel === 2
               ? [ "<32>{#p/basic}* It's just a stovetop.\n* No one is going to use it." ]
               : world.darker
               ? [ "<32>{#p/basic}* It's just a stovetop." ]
               : SAVE.data.n.plot === 72
               ? [ '<32>{#p/basic}* The stovetop is very clean.\n* Toriel may not need a new one on the new world.' ]
               : [ '<32>{#p/basic}* The stovetop is very clean.\n* Toriel must use fire magic instead.' ],
         w_tk_trash: () =>
            SAVE.data.b.svr
               ? [ "<32>{#p/human}* (You can't make out what's in the trash...)" ]
               : SAVE.data.n.plot === 72
               ? [ '<32>{#p/basic}* Rather symbolically, the trash can has been emptied.' ]
               : [ '<32>{#p/basic}* There is a crumpled up recipe for Starling Tea.' ],
         
         w_tl_azzychair: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (You note the fairly large size of the dining chair.)' ]
               : SAVE.data.n.state_wastelands_toriel === 2 || world.runaway
               ? [ '<32>{#p/basic}* A larger dining chair.' ]
               : [ "<32>{#p/basic}* One of Toriel's dining chairs.\n* Fit for a queen." ],
         w_tl_bookshelf: pager.create(
            1,
            () =>
               SAVE.data.b.svr
                  ? [
                       '<32>{#p/human}* (The books on this bookshelf consist of snail facts, family recipes, and gardening tips.)'
                    ]
                  : [
                       "<32>{#p/basic}* It's a bookshelf.",
                       '<32>{#p/human}* (You pick out a book...)',
                       '<32>{#p/basic}* \"Did you know that snails have a chainsaw-like tongue called a radula?\"',
                       '<32>* \"Not many folks know about that one.\"',
                       '<32>* \"Another neat thing about \'em is how their digestive systems flip as they mature.\"',
                       '<32>* \"Oh, and did I mention...\"',
                       '<32>* \"Snails Talk. {^10}Really. {^10}Slowly.\"',
                       '<32>* \"Just kiddin\', snails don\'t talk.\"',
                       '<32>* \"I mean, could you imagine a world with talking snails?\"\n* \"I know I couldn\'t.\"',
                       '<32>{#p/human}* (You put the book back on the shelf.)'
                    ],
            () =>
               SAVE.data.b.svr
                  ? [
                       '<32>{#p/human}* (The books on this bookshelf consist of snail facts, family recipes, and gardening tips.)'
                    ]
                  : [
                       "<32>{#p/basic}* It's a bookshelf.",
                       '<32>{#p/human}* (You pick out a book...)',
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
                  ? [
                       '<32>{#p/human}* (The books on this bookshelf consist of snail facts, family recipes, and gardening tips.)'
                    ]
                  : [
                       "<32>{#p/basic}* It's a bookshelf.",
                       '<32>{#p/human}* (You pick out a book...)',
                       '<32>{#p/basic}* \"Howdy, fellow gardeners.\"',
                       '<32>* \"When it comes to Starling flowers, the line between growth and stagnation...\"',
                       '<32>* \"Is access to open space.\"',
                       '<32>* \"That is why they are commonly grown in Aerialis...\"',
                       '<32>* \"It is the most open area of the outpost.\"',
                       '<32>{#p/human}* (You put the book back on the shelf.)'
                    ]
         ),
         
         w_tl_goreychair: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (You note the small size of the dining chair.)' ]
               : SAVE.data.n.state_wastelands_toriel === 2 || world.runaway
               ? [ '<32>{#p/basic}* A smaller dining chair.' ]
               : world.genocide
               ? [ "<32>{#p/basic}* One of Toriel's dining chairs.\n* Fit for a demon." ]
               : world.darker
               ? [ "<32>{#p/basic}* One of Toriel's dining chairs.\n* Fit for a prince." ]
               : SAVE.data.b.oops
               ? [ "<32>{#p/basic}* One of Toriel's dining chairs.\n* Fit for a child.\n* Like you!" ]
               : [ "<32>{#p/basic}* One of Toriel's dining chairs.\n* Fit for... a little angel.\n* Like you!" ],
         w_tl_table: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The plant appears to be decorative in nature.)' ]
               : world.darker
               ? [ '<32>{#p/basic}* A decorative plant.\n* Nothing more.' ]
               : [ "<32>{#p/basic}* A decorative plant on Toriel's dining table." ],
         w_tl_tools: () =>
            SAVE.data.b.svr
               ? [
                    [
                       '<25>{#p/asriel1}{#f/20}* $(name) used to pretend these things were musical instruments.',
                       '<25>{#f/17}* They\'d pull them out, start \"playing\" them...',
                       '<25>{#f/20}* Once, I joined in, and we did a little fire- poker-instrument duet.',
                       '<26>{#f/13}* We started using our voices to emulate the instruments, and then...',
                       '<25>{#f/17}* Mom and Dad walked in to add backing vocals!'
                    ],
                    [
                       '<25>{#p/asriel1}{#f/13}* Then, as it turns out, someone had been listening in outside.',
                       '<25>{#f/15}* Before we knew it, we had monsters coming to the house in droves...',
                       '<25>{#f/17}* $(name) and I were still in the middle of the room, doing our thing.',
                       '<25>{#f/20}* But now we had an entire orchestra behind us!',
                       '<25>{#f/17}* We must have performed half of the Harmonexus Index that day.',
                       "<25>{#f/17}* ... it's an old book full of songs from our culture."
                    ],
                    [
                       '<25>{#p/asriel1}{#f/13}* All that because we played pretend with some fire pokers...',
                       '<25>{#f/17}* They say you can make an instrument out of anything.',
                       '<25>{#f/13}* ...',
                       "<25>{#f/15}* Wait...\n* I'M an anything..." 
                    ],
                    [ "<25>{#p/asriel1}{#f/20}* Please don't make a musical instrument out of me." ]
                 ][Math.min(asrielinter.w_tl_tools++, 3)]
               : world.darker
               ? [ '<32>{#p/basic}* Fire pokers.' ]
               : SAVE.data.n.plot === 72
               ? [
                    "<32>{#p/basic}* They're just fire pokers...\n* Or are they?",
                    "<32>* Consider that Toriel's fire is only pleasantly warm, and not hot at all.",
                    '<32>* Why would she need these?',
                    '<32>* Thus, by the process of elimination, these must be advanced musical instruments.'
                 ]
               : [
                    '<32>{#p/basic}* A rack of advanced musical instruments.',
                    '<32>* Upon closer inspection, you realize these are in fact fire pokers.',
                    "<32>* It's hard to tell, given that these tools were likely made...",
                    '<32>* Before the outpost itself even existed.'
                 ],
         
         w_tl_torichair: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (You note the exceptional size of the dining chair.)' ]
               : SAVE.data.n.state_wastelands_toriel === 2 || world.runaway
               ? [ '<32>{#p/basic}* A king-sized dining chair.' ]
               : [ "<32>{#p/basic}* One of Toriel's dining chairs.\n* Fit for a king." ],
         w_toriel_toriel: () => [
            "<32>{#p/basic}* It's locked.",
            toriSV()
               ? SAVE.data.n.plot < 17.001
                  ? '<32>{#p/basic}* It sounds like Toriel is crying...'
                  : '<32>{#p/basic}* It sounds like Toriel is asleep...'
               : '<32>{#p/basic}* It sounds like Toriel is writing...'
         ],
         w_tt_bed: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The bed seems a lot smaller than it might have used to.)' ]
               : SAVE.data.n.state_wastelands_toriel === 2 || world.runaway
               ? [ "<32>{#p/basic}* It's a bed." ]
               : SAVE.data.n.plot < 72 || world.runaway
               ? [
                    "<32>{#p/basic}* It's Toriel's bed.",
                    ...(world.darker ? [] : [ '<32>* Certainly too big for the likes of you.' ])
                 ]
               : [
                    "<32>{#p/basic}* It's Toriel's bed.",
                    "<32>* You've still got some time to go, but you'll grow into it."
                 ],
         w_tt_bookshelf: pager.create(
            1,
            () =>
               SAVE.data.b.svr
                  ? [
                       '<32>{#p/human}* (The books on this bookshelf consist of history, biology, and a foreboding possibility.)'
                    ]
                  : [
                       SAVE.data.n.state_wastelands_toriel === 2 || world.runaway
                          ? "<32>{#p/basic}* It's a bookshelf."
                          : "<32>{#p/basic}* It's Toriel's private bookshelf.",
                       '<32>{#p/human}* (You pick out a book...)',
                       '<32>{#p/basic}* \"Our homeworld gone... our people dead... but why?\"',
                       '<32>* \"Surely, the humans must\'ve had a reason for their attacks.\"',
                       '<32>* \"Did our kind truly pose a threat to them?\"',
                       '<32>* \"Was the threat of our potential truly that dire?\"',
                       '<32>* \"Whatever the case may be, we were cornered, and there was nowhere else to go.\"',
                       '<32>* \"Capitulation was our only real means of survival.\"',
                       '<32>{#p/human}* (You put the book back on the shelf.)'
                    ],
            () =>
               SAVE.data.b.svr
                  ? [
                       '<32>{#p/human}* (The books on this bookshelf consist of history, biology, and a foreboding possibility.)'
                    ]
                  : [
                       SAVE.data.n.state_wastelands_toriel === 2 || world.runaway
                          ? "<32>{#p/basic}* It's a bookshelf."
                          : "<32>{#p/basic}* It's Toriel's private bookshelf.",
                       '<32>{#p/human}* (You pick out a book...)',
                       '<32>{#p/basic}* \"When a boss monster is born, a magical link forms between the parents and the child.\"',
                       '<32>* \"Through this, their SOUL is created, ageing the parents along with the child.\"',
                       '<32>* \"The SOUL of a fully-grown boss monster is the strongest known to monsterkind...\"',
                       '<32>* \"Able to persist after death, if only for the briefest of periods.\"',
                       '<32>{#p/human}* (You put the book back on the shelf.)'
                    ],
            () =>
               SAVE.data.b.svr
                  ? [
                       '<32>{#p/human}* (The books on this bookshelf consist of history, biology, and a foreboding possibility.)'
                    ]
                  : [
                       SAVE.data.n.state_wastelands_toriel === 2 || world.runaway
                          ? "<32>{#p/basic}* It's a bookshelf."
                          : "<32>{#p/basic}* It's Toriel's private bookshelf.",
                       '<32>{#p/human}* (You pick out a book...)',
                       '<32>{#p/basic}* \"We often worry about what would happen if a human attacked us.\"',
                       '<33>* \"But what if one of our own attacked instead...?\"',
                       '<32>* \"Would we as a society be able to handle such a betrayal?\"',
                       '<32>* \"But who would think to do such a thing?\"',
                       '<32>{#p/human}* (You put the book back on the shelf.)'
                    ]
         ),
         w_tt_cactus: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (This cactus seems to remind you of someone you once knew.)' ]
               : SAVE.data.n.plot < 72
               ? world.darker
                  ? [ '<32>{#p/basic}* Finally, a houseplant we can all relate to.' ]
                  : [ '<32>{#p/basic}* Ah, the cactus.\n* Truly the most tsundere of plants.' ]
               : [ "<32>{#p/basic}* It's not like this cactus was waiting for you to come back or anything..." ],
         w_tt_chair: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (This chair appears to be a little small for the person who owns it.)' ]
               : world.darker
               ? [ "<32>{#p/basic}* It's a reading chair." ]
               : SAVE.data.n.plot === 72
               ? [
                    "<32>{#p/basic}* Toriel's dedicated reading chair...",
                    "<32>* ... at least until Asgore decides he'd like it instead.",
                    "<32>* He's always wanted this chair.\n* I'd be surprised if he didn't take it with him."
                 ]
               : [ "<32>{#p/basic}* Toriel's dedicated reading chair.", '<32>* Smells like lazy bones.' ],
         w_tt_diary: pager.create(
            0,
            ...[
               [
                  '<32>{#p/human}* (You look to the circled paragraph.)',
                  '<32>{#p/toriel}{#f/21}* \"Question: Why did the skeleton want a friend?\"',
                  '<32>* \"Answer: Because he was feeling BONELY...\"',
                  '<32>{#p/basic}* The jokes continue from here at a similar caliber.'
               ],
               [
                  '<32>{#p/human}* (You look to another paragraph.)',
                  '<32>{#p/toriel}{#f/21}* \"Question: What\'s another name for a skeleton\'s vices?\"',
                  '<32>* \"Answer: HOLLOW pursuits...\"',
                  "<32>{#p/basic}* There's no sense in continuing to read these."
               ],
               [
                  '<32>{#p/human}* (You look to another paragraph.)',
                  '<32>{#p/toriel}{#f/21}* \"Question: How does a skeleton say goodbye?\"',
                  '<32>* \"Answer: See you to-MARROW...\"',
                  "<32>{#p/basic}* That one wasn't even REMOTELY funny."
               ],
               [
                  '<32>{#p/human}* (You look to another paragraph.)',
                  "<32>{#p/basic}* You can't get enough of these lame puns.",
                  '<32>{#p/toriel}{#f/21}* \"Question: Why did the skeleton drool in their sleep?\"',
                  '<32>* \"Answer: Because they were having a FEMUR dream...\"',
                  '<32>{#p/basic}* This is getting old...'
               ],
               [
                  '<32>{#p/human}* (You look to another paragraph.)',
                  "<32>{#p/basic}* You still can't get enough of these lame puns.",
                  '<32>{#p/toriel}{#f/21}* \"Question: What does a skeleton say to start a fight?\"',
                  '<32>* \"Answer: I\'ve got a BONE to pick with you...\"',
                  "<32>{#p/basic}* Seriously?\n* That wasn't even a pun!"
               ],
               [
                  '<32>{#p/human}* (You look to another paragraph.)',
                  "<32>{#p/basic}* We're losing brain cells here...",
                  "<32>{#p/toriel}{#f/21}* \"'What's up stairs?' asked the skeleton.\"",
                  '<32>* \"... the stairs did not reply.\"',
                  '<32>{#p/basic}* ...\n* I have no words.'
               ],
               [
                  '<32>{#p/human}* (You look to the final paragraph.)',
                  "<32>{#p/basic}* Huh?\n* This one's not a joke...",
                  '<32>{#p/toriel}{#f/21}* \"A human has arrived in the Outlands today.\"',
                  '<32>* \"I do trust that Sans would look after them, but...\"',
                  '<32>* \"I would rather not force him to do so.\"',
                  '<32>* \"Besides, can one royal sentry really protect them from the rest of the outpost?\"',
                  '<32>* \"Hopefully those kinds of questions will soon be pointless.\"',
                  '<32>{#p/basic}* ...'
               ],
               [ '<32>{#p/human}* (There are no more written entries here.)' ]
            ].map(
               lines => () =>
                  SAVE.data.b.svr
                     ? [ '<32>{#p/human}* (The diary seems to consist primarily of over-the-top skeleton puns.)' ]
                     : SAVE.data.n.plot === 72
                     ? [
                          '<32>{#p/human}* (You look to the newly-written page.)',
                          '<32>{#p/toriel}{#f/21}* \"It seems my preconceptions about Asgore were incorrect.\"',
                          '<32>* \"In failing to confront him, I have failed to understand what was truly going on.\"',
                          '<32>* \"I was right in thinking I did not deserve to be a mother.\"',
                          '<32>* \"But perhaps now... I can learn what being a mother truly means.\"',
                          '<32>* \"I will need to think about this on my own.\"'
                       ]
                     : world.darker
                     ? [ "<32>{#p/basic}* It's a diary.\n* You wouldn't find it funny." ]
                     : SAVE.data.n.plot < 14
                     ? lines
                     : [
                          '<32>{#p/human}* (You look to the most recently written paragraph.)',
                          ...(world.edgy
                             ? [ "<32>{#p/basic}* It's been scribbled out with a crayon." ]
                             : toriSV()
                             ? [
                                  '<32>{#p/toriel}{#f/21}* \"It has not been the best of days.\"',
                                  '<32>* \"Yet another human has fallen out of my care...\"',
                                  '<32>* \"The seventh and final human he\'d need to break the force field.\"',
                                  '<32>* \"I should not have allowed this to happen.\"',
                                  '<32>* \"With the stakes so high, a confrontation may be inevitable...\"'
                               ]
                             : [
                                  '<32>{#p/toriel}{#f/21}* \"It has been an interesting day, to say the least.\"',
                                  '<32>* \"A human arrived...\"',
                                  '<32>* \"Then, tried to leave...\"',
                                  '<32>* \"And then, the strangest thing happened.\"',
                                  '<32>* \"A reminder I have been in need of for some time...\"'
                               ])
                       ]
            )
         ),
         w_tt_plant: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (This houseplant strikes you as exceedingly normal.)' ]
               : [ "<32>{#p/basic}* It's a houseplant.", '<32>* What more is there to say?' ],
         w_tt_trash: pager.create(
            0,
            () =>
               SAVE.data.b.svr
                  ? [ "<32>{#p/human}* (You can't make out what's in the trash...)" ]
                  : world.darker
                  ? [ '<32>{#p/basic}* Snails.' ]
                  : SAVE.data.n.plot === 72
                  ? [ '<32>{#p/basic}* The snails are beginning to smell... ghostly.', '<32>* ... what could this mean?' ]
                  : [
                       "<32>{#p/basic}* It's Toriel's private trash can, containing...",
                       '<32>* Snails.',
                       '<32>* Oodles and oodles of snails.'
                    ],
            pager.create(
               1,
               () =>
                  SAVE.data.b.svr
                     ? [ "<32>{#p/human}* (You can't make out what's in the trash...)" ]
                     : world.darker
                     ? [ '<32>{#p/basic}* Snails.' ]
                     : SAVE.data.n.plot === 72
                     ? [ '<32>{#p/basic}* Maybe this is how snails live past their expiry date.' ]
                     : [ '<32>{#p/basic}* And nothing BUT snails.' ],
               () =>
                  SAVE.data.b.svr
                     ? [ "<32>{#p/human}* (You can't make out what's in the trash...)" ]
                     : world.darker
                     ? [ '<32>{#p/basic}* Snails.' ]
                     : SAVE.data.n.plot === 72
                     ? [ "<32>{#p/basic}* Or maybe I've just gone and lost it completely." ]
                     : [ '<32>{#p/basic}* ...\n* Did I mention the snails?' ],
               () =>
                  SAVE.data.b.svr
                     ? [ "<32>{#p/human}* (You can't make out what's in the trash...)" ]
                     : world.darker
                     ? [ '<32>{#p/basic}* Snails.' ]
                     : SAVE.data.n.plot === 72
                     ? [ '<32>{#p/basic}* Or maybe...', '<32>* ... wait, what was I saying?' ]
                     : [ '<32>{#p/basic}* Snails.' ],
               () =>
                  SAVE.data.b.svr
                     ? [ "<32>{#p/human}* (You can't make out what's in the trash...)" ]
                     : world.darker
                     ? [ '<32>{#p/basic}* Snails.' ]
                     : SAVE.data.n.plot === 72
                     ? [ "<32>{#p/basic}* Oh, right.\n* The meaning of the snails' newfound ghostly scent." ]
                     : [ '<32>{#p/basic}* Oodles and oodles of snails.' ]
            )
         ),
         w_tutorial_view: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (You stare excitedly into the cosmos beyond...)' ]
               : world.darker
               ? []
               : [ '<32>{#p/basic}* The first of many windows in this part of the Outlands.' ],
         w_tutorial1: () =>
            SAVE.data.b.svr
               ? [ '<32>{#p/human}* (The sign describes the qualities of a good relationship.)' ]
               : [
                    '<32>{#p/basic}* \"A good relationship requires trust and kindness to move forward.\"',
                    ...(world.goatbro && SAVE.flag.n.ga_asrielOutlands7++ < 1
                       ? [ '<26>{#p/asriel2}{#f/8}* How grossly sentimental.' ]
                       : [])
                 ]
      },
      piecheck: () =>
         SAVE.data.b.svr
            ? [
                 [
                    "<25>{#p/asriel1}{#f/17}* Mom's pies were always the best...",
                    '<25>{#f/13}* I can still remember what the first one I ever had tasted like.',
                    "<25>{#f/15}* I'd never felt so happy to take a bite of something...",
                    "<25>{#f/17}* ... it was like I'd transcended to the next level of confection."
                 ],
                 [
                    "<25>{#p/asriel1}{#f/20}* Er, maybe I'm overselling it just a little.",
                    "<25>{#f/17}* But I'm telling you right now, Frisk...",
                    '<25>{#f/13}* ... no matter what happens with Mom and Dad...',
                    '<25>{#f/17}* You NEED to have her make one of her pies for me.',
                    "<25>{#f/20}* I'm... kind of curious if I'll still like it after all of this."
                 ],
                 [ '<25>{#p/asriel1}{#f/15}* It sure has been a while, huh...' ]
              ][Math.min(asrielinter.piecheck++, 2)]
            : SAVE.data.n.plot < 8
            ? world.darker
               ? [ "<32>{#p/basic}* It's just a countertop." ]
               : [ '<32>{#p/basic}* There is a nigh-invisible ring-shaped stain on the countertop.' ]
            : SAVE.data.n.state_wastelands_mash === 1 && SAVE.data.n.plot > 8
            ? [ '<32>{#p/basic}* The ghost of a pie once smashed haunts the countertop.' ]
            : SAVE.data.n.plot === 72
            ? SAVE.data.n.state_wastelands_mash > 0
               ? [ '<32>{#p/basic}* No amount of passed time will fix this atrocity.' ]
               : SAVE.data.n.state_wastelands_toriel === 2
               ? [ '<32>{#p/basic}* You feel strongly that you should leave this alone.' ]
               : world.runaway
               ? [
                    '<32>{#p/basic}* You might have been a bully, but the pie remains untouched.',
                    '<32>{#p/basic}* Perhaps some things are too sacred, even for you.'
                 ]
               : [
                    world.meanie
                       ? '<32>{#p/basic}* The pie may be intimidated by you, but after all this time...'
                       : '<32>{#p/basic}* The size of the pie may no longer intimidate you, but after all this time...',
                    "<32>{#p/basic}* You've gained a sense of respect for the pie that does not permit you to eat it."
                 ]
            : SAVE.data.n.state_wastelands_mash > 0
            ? [ '<32>{#p/basic}* There is simply nothing more to be done here.' ]
            : SAVE.data.n.state_wastelands_toriel === 2
            ? [ '<32>{#p/basic}* You feel strongly that you should leave this alone.' ]
            : world.meanie
            ? [
                 '<32>{#p/basic}* The size of the pie does not intimidate you at all.',
                 '<32>{#p/basic}* In fact, it might even be intimidated by you...',
                 choicer.create('* (Smash the pie?)', 'Si', 'No')
              ]
            : [ '<32>{#p/basic}* The size of the pie intimidates you too much to eat it.' ],
      piesmash1: [ '<32>{#p/human}* (You decide not to smash.)' ],
      piesmash2: [ '<32>{#p/human}* (You take a swing...)' ],
      piesmash3: [ "<32>{#p/basic}* It's been utterly destroyed." ],
      tutorial_puzzle1: [
         '<25>{#p/toriel}* Unlike the puzzle beforehand, this one is a little different.',
         '<25>{#f/1}* It IS rare, but certain puzzles on the outpost...'
      ],
      tutorial_puzzle2: [
         '<25>{#p/toriel}* ... require the assistance of another monster.',
         '<25>{#f/1}* Do you understand what you must do next?'
      ],
      tutorial_puzzle2a: [ '<25>{#p/toriel}{#f/1}* Do you understand what you must do next?' ],
      tutorial_puzzle3: [ '<25>{#p/toriel}* Very good, little one!\n* Very good.' ],
      tutorial_puzzle4: [ '<25>{#p/toriel}{#f/1}* Your turn...' ],
      tutorial_puzzle4a: [ '<25>{#p/toriel}{#f/0}* It is your turn.' ],
      tutorial_puzzle5: [ '<25>{#p/toriel}* Well done!\n* Only one row to go.' ],
      tutorial_puzzle6: [ '<25>{#p/toriel}{#f/1}* Yes, yes!\n* I am proud of you, my child...' ],
      tutorial_puzzle7: [ '<25>{#p/toriel}* Come with me when you are ready to begin your next lesson.' ],
      tutorial_puzzle8a: [ '<25>{#p/toriel}* The answer does not lie with me, little one.' ],
      tutorial_puzzle8b: [ '<25>{#p/toriel}* Try repeating what you have done before.' ],
      tutorial_puzzle8c: [ '<25>{#p/toriel}{#f/1}* Go on...' ],
      twinkly1: [
         "<25>{#p/twinkly}{#f/5}* Howdy!\n* I'm {@fill=#ff0}TWINKLY{@fill=#fff}.\n* {@fill=#ff0}TWINKLY{@fill=#fff} the {@fill=#ff0}STAR{@fill=#fff}!"
      ],
      twinkly2: [
         '<25>{#f/5}* What brings you to the outpost, fellow traveler?',
         '<25>{#f/5}* ...',
         "<25>{#f/8}* You're lost, aren't you...",
         "<25>{#f/5}* Well, good thing I'm here for you!",
         "<25>{#f/8}* I haven't been in my top form for a while, but...",
         '<25>{#f/5}* ... someone ought to teach you how things work around here!',
         '<25>{#f/10}* Guess little old me will have to do.',
         "<25>{#f/5}* Let's get started, shall we?"
      ],
      twinkly3: [
         "<25>{#f/7}* But you already KNEW that, didn'tcha?",
         '<25>{#f/8}* ...',
         "<25>{#f/5}* Still, it's up to me to show you the ropes.",
         "<25>* Let's get started, shall we?"
      ],
      twinkly4: [
         "<25>{#p/twinkly}{#f/6}* Okay, that's enough.",
         '<25>{#f/8}* If you wanna keep resetting, then by all means...',
         '<25>{#f/6}* Do as you wish.',
         "<25>{#f/7}* Just don't expect to get past me so easily."
      ],
      twinkly5: [ "<25>{#p/twinkly}{#f/6}* Don't you have anything better to do?" ],
      twinkly6: [
         "<25>{#p/twinkly}{#f/6}* Resetting right after you've taken your first hit, huh?",
         '<25>{#f/7}* How pathetic.'
      ],
      twinkly6a: [
         "<25>{#p/twinkly}{#f/11}* As if you think I'd forget about what you did...",
         '<25>{#f/7}* Filthy shard dodger.'
      ],
      twinkly7: [ '<25>{#p/twinkly}{#f/7}* I can play this game all day, idiot.' ],
      twinkly8: [ "<25>{#f/11}* Either way, since you already know what's coming next...{%15}" ],
      twinkly9: [
         '<25>{#p/twinkly}{#f/6}* Howdy.',
         "<25>* Seems I'll be fireballed if I stick around too long.",
         '<25>{#f/8}* A shame, really...',
         '<25>{#f/7}* I was gonna have SO much fun with you.',
         '<25>{#f/6}* ...',
         '<25>{#f/5}* Well, see ya!'
      ],
      twinkly9a: [
         '<25>{#p/twinkly}{#f/12}{#v/0}* What the HELL are you doing, $(name)?',
         '<25>{#f/12}{#v/0}* We had the outpost at our mercy!'
      ],
      twinkly9a1: [ '<25>{#f/6}{#v/0}* All we had to do was follow the plan.' ],
      twinkly9a2: [
         '<25>{#f/6}{#v/0}* All we had to do was get through the Foundry...',
         '<25>* Finish off the guards...',
         '<25>* And make it to the Citadel!'
      ],
      twinkly9a3: [
         '<25>{#f/6}{#v/0}* All we had to do was finish off the guards...',
         '<25>* And get through the Citadel!'
      ],
      twinkly9a4: [
         '<25>{#f/6}{#v/0}* All we had to do was KILL that stupid robot...',
         '<25>* And get through the Citadel!'
      ],
      twinkly9a5: [ '<25>{#f/6}{#v/0}* All we had to do was get through the Citadel!' ],
      twinkly9a6: [ '<25>{#f/6}{#v/0}* All we had to do was KILL that nerdy trashbag!' ],
      twinkly9a7: [ '<25>{#f/6}{#v/0}* All we had to do was walk to the end!', '<25>* We were so close!' ],
      twinkly9a8: [ '<25>{#f/8}{#v/0}* Coward...' ],
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
      twinkly17: [ "<20>{#v/1}We'll just have to cut straight to the point, won't we?", '<20>Hee hee hee...' ],
      twinkly18: [ '<20>{*}{#f/2}{#v/1}{@random=1.1/1.1}DIE.{^20}{%}' ],
      twinkly19: [ '<20>{#p/toriel}What a terrible creature, torturing such a poor, innocent youth...' ],
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
      twinkly22: [ '<25>{#f/0}* This way.' ],
      w_coffin0: () => [
         '<32>{#p/human}* (You feel it would be best to leave this be.)',
         ...(SAVE.data.b.svr ? [ '<25>{#p/asriel1}{#f/13}* ...' ] : [])
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
            choicer.create('* (Access the manifest?)', 'Si', 'No')
         ],
         () => [
            '<32>{#p/human}* (You once again pick up the manifest.)',
            choicer.create('* (Access the manifest?)', 'Si', 'No')
         ]
      ),
      w_coffin3: () => [ choicer.create('* (Read the next page?)', 'Si', 'No') ],
      w_coffin4: [ '<32>{#p/human}* (But there were no further pages to be read.)' ],
      w_coffin5: [ '<32>{#p/human}* (You put the manifest back where it belongs.)' ],
      w_dummy1: () =>
         SAVE.data.b.svr
            ? [ '<32>{#p/human}* (You place your hands on the dummy.)\n* (It seems very worn out.)' ]
            : [ '<32>{#p/basic}* A training dummy, circa 251X.\n* CITADEL standard-issue.' ],
      wonder1: [
         '<32>{#p/basic}* Can you hear it?\n* The song of the stars?',
         "<32>* At certain places on the outpost, like this one... it's there.",
         '<32>* You just have to be listening for it.',
         '<32>* Pretty cool, right?'
      ]
   },

   b_group_outlands: {
      froggitWhimsun: [ '<32>{#p/story}* Space frogs and Starflies!\n* Or something of the like.' ],
      froggitWhimsun2a: [ '<32>{#p/story}* Space frogs...?' ],
      froggitWhimsun2b: [ '<32>{#p/story}* Starflies...?' ],
      looxMigospWhimsun: [ "<32>{#p/story}* It's the troublesome trio!" ],
      looxMigospWhimsun2: [ '<32>{#p/story}* The trio has become a duo.' ],
      looxMigospWhimsun3: [ '<32>{#p/story}* Only one remains.' ],
      moldsmalMigosp: [ '<32>{#p/story}* Silente and company present themselves!' ]
   },

   b_opponent_froggit: {
      act_check: [ '<32>{#p/story}* FROGGIT - ATK 4 DEF 5\n* Life is difficult for this monster.' ],
      act_check2: [ '<32>{#p/story}* FROGGIT - ATK 4 DEF 5\n* Life is getting better for this monster.' ],
      act_check3: [ "<32>{#p/story}* FROGGIT - ATK 4 DEF 5\n* Life just doesn't seem to get easier for this monster." ],
      act_check4: [ '<32>{#p/story}* FROGGIT - ATK 4 DEF 5\n* Life is very confusing for this monster.' ],
      act_check5: [ '<32>{#p/story}* FROGGIT - ATK 4 DEF 5\n* Life seems to be very lovely for this monster.' ],
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
      act_translate0: [ "<32>{#p/human}* (But you haven't said anything to translate yet.)" ],
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
      confuseText: [ '<08>{#p/basic}{~}Ribbit, ribbit?' ],
      flirtText: [ '<08>{#p/basic}{~}(Blushes deeply.)\nRibbit..' ],
      idleText1: [ '<08>{#p/basic}{~}Ribbit, ribbit.' ],
      idleText2: [ '<08>{#p/basic}{~}Croak, croak.' ],
      idleText3: [ '<08>{#p/basic}{~}Hop, hop.' ],
      idleText4: [ '<08>{#p/basic}{~}Meow.' ],
      mercyStatus: [ '<32>{#p/story}* Froggit seems reluctant to fight you.' ],
      name: '* Froggit',
      meanText: [ '<08>{#p/basic}{~}(Shiver, shake.)\nRibbit..' ],
      niceText: [ '<08>{#p/basic}{~}(Blushes softly.)\nRibbit..' ],
      perilStatus: [ '<32>{#p/story}* Froggit is trying to run away.' ],
      status1: [ '<32>{#p/story}* Froggit hops near!' ],
      status2: [ '<32>{#p/story}* The battlefield is filled with the smell of crystherium utilia.' ],
      status3: [ "<32>{#p/story}* Froggit doesn't seem to know why it's here." ],
      status4: [ '<32>{#p/story}* Froggit hops to and fro.' ]
   },
   b_opponent_whimsun: {
      act_check: [ '<32>{#p/story}* FLUTTERLYTE - ATK 5 DEF 0\n* This monster has only just learned how to fly...' ],
      act_check2: [ '<32>{#p/story}* FLUTTERLYTE - ATK 5 DEF 0\n* This monster wishes it had stayed on the ground.' ],
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
      idleTalk1: [ '<08>{#p/basic}{~}Why is this so hard..' ],
      idleTalk2: [ '<08>{#p/basic}{~}Please help me..' ],
      idleTalk3: [ "<08>{#p/basic}{~}I'm scared.." ],
      idleTalk4: [ "<08>{#p/basic}{~}I can't do this.." ],
      idleTalk5: [ '<08>{#p/basic}{~}\x00*sniff sniff*' ],
      name: '* Flutterlyte',
      perilStatus: [ '<32>{#p/story}* Flutterlyte is barely keeping itself in the air.' ],
      status1: [ '<32>{#p/story}* Flutterlyte comes forth!' ],
      status2: [ '<32>{#p/story}* Flutterlyte continues to mutter apologies.' ],
      status3: [ '<32>{#p/story}* Flutterlyte hovers meekly.' ],
      status4: [ '<32>{#p/story}* The smell of fresh peaches permeates the air.' ],
      status5: [ '<32>{#p/story}* Flutterlyte is hyperventilating.' ],
      status6: [ '<32>{#p/story}* Flutterlyte avoids eye contact.' ]
   },
   b_opponent_loox: {
      act_check: [ '<32>{#p/story}* OCULOUX - ATK 6 DEF 6\n* Staring contest master.\n* Family name: Eyewalker' ],
      act_check2: [
         "<32>{#p/story}* OCULOUX - ATK 6 DEF 6\n* This bully is trying very hard to pretend it's not flattered."
      ],
      act_check3: [ '<32>{#p/story}* OCULOUX - ATK 6 DEF 6\n* This monster is honored to be in your line of sight.' ],
      act_dontpick: [
         '<32>{#p/human}* (You stare at Oculoux.)\n* (Oculoux stares back harder.)',
         "<32>{#p/human}* (Oculoux's eye becomes increasingly strained, and eventually...)",
         '<32>{#p/human}* (... Oculoux bows.)'
      ],
      act_flirt: [ '<32>{#p/human}* (You flirt with Oculoux.)' ],
      act_pick: [ '<32>{#p/human}* (You rudely lecture Oculoux about staring at people.)' ],
      checkTalk1: [ '<08>{#p/basic}{~}Do you dare to stare?' ],
      dontDeny1: [ '<08>{#p/basic}{~}Look who changed their mind.' ],
      dontTalk1: [ '<99>{#p/basic}{~}The gaze\nis\nstrong\nwith\nthis one.' ],
      flirtDeny1: [ '<08>{#p/basic}{~}How tsundere of you.' ],
      flirtTalk1: [ '<08>{#p/basic}{~}What? N-no way!' ],
      hurtStatus: [ '<32>{#p/story}* Oculoux is watering.' ],
      idleTalk1: [ "<08>{#p/basic}{~}I've got my eye on you." ],
      idleTalk2: [ "<08>{#p/basic}{~}Don't tell me what to do." ],
      idleTalk3: [ '<08>{#p/basic}{~}Staring is caring.' ],
      idleTalk4: [ '<08>{#p/basic}{~}What an eyesore.' ],
      idleTalk5: [ '<08>{#p/basic}{~}How about a staring contest?' ],
      name: '* Oculoux',
      pickTalk1: [ '<08>{#p/basic}{~}How dare you question our way of life!' ],
      spareStatus: [ "<32>{#p/story}* Oculoux doesn't care about fighting anymore." ],
      status1: [ '<32>{#p/story}* A pair of Oculoux walked in!' ],
      status2: [ '<32>{#p/story}* Oculoux is staring right through you.' ],
      status3: [ '<32>{#p/story}* Oculoux gnashes its teeth.' ],
      status4: [ '<32>{#p/story}* Smells like eyedrops.' ],
      status5: [ '<32>{#p/story}* Oculoux has gone bloodshot.' ],
      status6: [ '<32>{#p/story}* Oculoux is gazing at you.' ],
      status7: [ '<32>{#p/story}* Oculoux is now alone.' ]
   },
   b_opponent_migosp: {
      act_check: [ "<32>{#p/story}* SILENTE - ATK 7 DEF 5\n* It seems evil, but it's just with the wrong crowd..." ],
      act_check2: [ '<33>{#p/story}* SILENTE - ATK 7 DEF 5\n* Now alone, it joyfully expresses itself through dance.' ],
      act_check3: [ '<32>{#p/story}* SILENTE - ATK 7 DEF 5\n* It seems comfortable with you.\n* VERY comfortable.' ],
      act_check4: [ "<32>{#p/story}* SILENTE - ATK 7 DEF 5\n* Despite its tough act, it's clearly in pain..." ],
      act_flirt: [ '<32>{#p/human}* (You flirt with Silente.)' ],
      flirtTalk: [ '<08>{#p/basic}{~}Hiya~' ],
      groupInsult: [ "<32>{#p/human}* (You try insulting Silente, but it's too focused on the others.)" ],
      groupStatus1: [ '<32>{#p/story}* Silente is whispering to the others.' ],
      groupStatus2: [ "<32>{#p/story}* It's starting to smell like a roach motel." ],
      groupTalk1: [ '<08>{#p/basic}FILTHY SINGLE MINDER\n..' ],
      groupTalk2: [ '<08>{#p/basic}OBEY THE OVERMIND\n..' ],
      groupTalk3: [ '<08>{#p/basic}LEGION! WE ARE LEGION!' ],
      groupTalk4: [ '<08>{#p/basic}HEED THE SWARM\n..' ],
      groupTalk5: [ '<08>{#p/basic}IN UNISON, NOW\n..' ],
      groupTalk6: [ "<08>{#p/basic}I DON'T CARE." ],
      name: '* Silente',
      perilStatus: [ '<32>{#p/story}* Silente refuses to give up.' ],
      soloInsult: [ "<32>{#p/human}* (You try insulting Silente, but it's too happy to care.)" ],
      soloStatus: [ "<32>{#p/story}* Silente doesn't have a care in the cosmos." ],
      soloTalk1: [ "<08>{#p/basic}{~}Bein' me is the best!" ],
      soloTalk2: [ '<08>{#p/basic}{~}La la~ Just be your- self~' ],
      soloTalk3: [ "<08>{#p/basic}{~}Nothin' like alone time!" ],
      soloTalk4: [ '<08>{#p/basic}{~}Mmm, cha cha cha!' ],
      soloTalk5: [ '<08>{#p/basic}{~}Swing your arms, baby~' ]
   },
   b_opponent_mushy: {
      act_challenge: [
         '<32>{#p/human}* (You challenge Mushy to a duel.)',
         "<33>{#p/story}* Mushy's SPEED up for this turn!"
      ],
      act_check: [ '<32>{#p/story}* MUSHY - ATK 6 DEF 6\n* Huge fan of space cowboys.\n* Gunslinger.' ],
      act_check2: [ '<32>{#p/story}* MUSHY - ATK 6 DEF 6\n* Huge fan of space cowboys.\n* Even the sexy ones.' ],
      act_check3: [ '<32>{#p/story}* MUSHY - ATK 6 DEF 6\n* After giving it your all, this gunslinger is impressed.' ],
      act_flirt: [ '<32>{#p/human}* (You flirt with Mushy.)' ],
      act_taunt: [ '<32>{#p/human}* (You taunt Mushy.)' ],
      challengeStatus: [ '<32>{#p/story}* Mushy awaits your next challenge.' ],
      challengeTalk1: [ "<08>{#p/basic}{~}Let's see what you got." ],
      challengeTalk2: [ '<08>{#p/basic}{~}Think you can take me?' ],
      flirtStatus1: [ '<32>{#p/story}* Mushy, the confused and the aroused.' ],
      flirtTalk1: [ '<08>{#p/basic}{~}H-hey, knock it off!' ],
      hurtStatus: [ '<32>{#p/story}* Mushy makes a last stand.' ],
      idleTalk1: [ '<08>{#p/basic}{~}Bang!\nBang!\nBang!' ],
      idleTalk2: [ '<08>{#p/basic}{~}Saddle up!' ],
      idleTalk3: [ "<08>{#p/basic}{~}All in a day's." ],
      name: '* Mushy',
      spareStatus: [ '<32>{#p/story}* Mushy bows out of respect.' ],
      status1: [ '<32>{#p/story}* Mushy stormed in!' ],
      status2: [ '<32>{#p/story}* Mushy adjusts their stance.' ],
      status3: [ '<32>{#p/story}* Mushy is preparing for a grand standoff.' ],
      status4: [ '<32>{#p/story}* Mushy reaches for their holster.' ],
      status5: [ '<32>{#p/story}* Smells like petrichor.' ],
      tauntStatus1: [ "<32>{#p/story}* Mushy pretends they aren't bothered by your taunts." ],
      tauntTalk1: [ "<08>{#p/basic}{~}As if that'll work on me." ]
   },
   b_opponent_napstablook: {
      act_check: [ "<32>{#p/story}* NAPSTABLOOK - ATK 10 DEF 255\n* It's Napstablook." ],
      act_check2: [
         "<32>{#p/story}* NAPSTABLOOK - ATK 10 DEF 255\n* It doesn't seem like they want to be here anymore."
      ],
      act_check3: [ '<32>{#p/story}* NAPSTABLOOK - ATK 10 DEF 255\n* Hopeful, for the first time in a while...' ],
      act_check4: [ '<32>{#p/story}* NAPSTABLOOK - ATK 10 DEF 255\n* The romantic tension is at an all-time high.' ],
      awkwardTalk: [ '<11>{#p/napstablook}{~}uh...', '<11>{#p/napstablook}{~}okay, i guess...?' ],
      checkTalk: [ "<11>{#p/napstablook}{~}that's me..." ],
      cheer0: [ '<32>{#p/human}* (You try to console Napstablook.)' ],
      cheer1: [ '<32>{#p/human}* (You give Napstablook a patient smile.)' ],
      cheer2: [ '<32>{#p/human}* (You tell Napstablook a little joke.)' ],
      cheer3: [ "<32>{#p/human}* (You show adoration for Napstablook's top hat.)" ],
      cheerTalk1: [ '<11>{#p/napstablook}{~}...?' ],
      cheerTalk2: [ '<11>{#p/napstablook}{~}heh heh...' ],
      cheerTalk3: [
         '<11>{*}{#p/napstablook}{~}let me {#x1}try...{^20}{#x2}{^20}{%}',
         "<11>{*}{#p/napstablook}{~}i call it {#x3}'dapper blook'{^40}{%}",
         '<11>{*}{#p/napstablook}{~}do you like it?{^40}{%}'
      ],
      cheerTalk4: [ '<11>{#p/napstablook}{~}oh gee.....' ],
      consoleTalk1: [ '<11>{#p/napstablook}{~}yeah, yeah...' ],
      consoleTalk2: [ '<11>{#p/napstablook}{~}not buying it...' ],
      consoleTalk3: [ "<11>{#p/napstablook}{~}you're not sorry..." ],
      deadTalk: [
         "<11>{#p/napstablook}{~}umm... you do know you can't kill ghosts, right...",
         "<11>{~}we're sorta incorporeal and all",
         "<11>{~}i was just lowering my hp because i didn't want to be rude",
         '<11>{~}sorry... i just made this more awkward...',
         '<11>{~}pretend you beat me...',
         '<11>{~}ooooooooo'
      ],
      flirt1: [ '<32>{#p/human}* (You flirt with Napstablook.)' ],
      flirt2: [ '<32>{#p/human}* (You try your best pickup line on Napstablook.)' ],
      flirt3: [ '<32>{#p/human}* (You give Napstablook a heartfelt compliment.)' ],
      flirt4: [ '<32>{#p/human}* (You reassure Napstablook of your feelings towards them.)' ],
      flirtTalk1: [ "<11>{#p/napstablook}{~}i'd just weigh you down" ],
      flirtTalk2: [ "<11>{#p/napstablook}{~}oh.....\ni've heard that one....." ],
      flirtTalk3: [ '<11>{#p/napstablook}{~}uh... you really think so?' ],
      flirtTalk4: [ "<11>{#p/napstablook}{~}oh, you're serious...", '<11>{~}oh no.....' ],
      idleTalk1: [ "<11>{#p/napstablook}{~}i'm fine, thanks" ],
      idleTalk2: [ '<11>{#p/napstablook}{~}just pluggin along...' ],
      idleTalk3: [ '<11>{#p/napstablook}{~}just doing my thing...' ],
      insultTalk1: [ '<11>{#p/napstablook}{~}i knew it...' ],
      insultTalk2: [ '<11>{#p/napstablook}{~}whatever...' ],
      insultTalk3: [ '<11>{#p/napstablook}{~}say what you will...' ],
      insultTalk4: [ '<11>{#p/napstablook}{~}let it all out...' ],
      name: '* Napstablook',
      silentTalk: [ '<11>{#p/napstablook}{~}...' ],
      sincere: [ "<32>{#p/human}* (You flirtatiously comment on Napstablook's top hat.)" ],
      sincereTalk: [ '<11>{#p/napstablook}{~}heh... thanks' ],
      status1: [ '<32>{#p/story}* Here comes Napstablook.' ],
      status2: [ '<32>{#p/story}* Napstablook looks just a little better.' ],
      status3: [ '<32>{#p/story}* Napstablook wants to show you something.' ],
      status3a: [ '<32>{#p/story}* Napstablook awaits your reply.' ],
      status4: [ "<32>{#p/story}* Napstablook's eyes are glistening." ],
      status5: [ '<32>{#p/story}* Napstablook is clearly not sure how to handle this.' ],
      status5a: [ '<32>{#p/story}* Napstablook is questioning their very being.' ],
      status6: [ '<32>{#p/story}* Napstablook is biding their time.' ],
      status7: [ '<32>{#p/story}* Napstablook is waiting for your next move.' ],
      status8: [ '<32>{#p/story}* Napstablook is staring off into the distance.' ],
      status9: [ "<32>{#p/story}* Napstablook is wishing they weren't here." ],
      status10: [ '<32>{#p/story}* Napstablook is trying their best to ignore you.' ],
      suck: [ '<32>{#p/human}* (You tell Napstablook their hat sucks bad.)' ],
      threat: [ '<32>{#p/human}* (You threaten Napstablook.)' ]
   },
   b_opponent_toriel: {
      spannerText: [ '<32>{#p/human}* (You throw the spanner.)\n* (Toriel picks it up and returns it to you.)' ],
      spannerTalk: [ '<11>{#p/toriel}{#f/22}That will accomplish nothing, my child.' ],
      spannerTalkRepeat: [ '<11>{#p/toriel}{#f/22}...' ],
      act_check: [ '<32>{#p/story}* TORIEL - ATK 80 DEF 80\n* Knows best for you.' ],
      act_check2: [ '<32>{#p/story}* TORIEL - ATK 80 DEF 80\n* Seems to be holding back.' ],
      act_check3: [ '<32>{#p/story}* TORIEL - ATK 80 DEF 80\n* Looks pre-occupied.' ],
      act_check4: [ '<32>{#p/story}* TORIEL - ATK 80 DEF 80\n* Just wants the best for you.' ],
      act_check5: [ '<32>{#p/story}* TORIEL - ATK 80 DEF 80\n* Thinks you are \"adorable.\"' ],
      precrime: [ '<20>{#p/asriel2}...' ],
      criminal1: (reveal: boolean) => [
         '<20>{#p/asriel2}{#f/3}Howdy, $(name).',
         "<20>{#f/1}It's good to be back.",
         "<20>{#f/2}What's that?\nYou didn't expect to see me again?",
         '<20>{#f/13}...\nOh, $(name)...',
         ...(reveal
            ? [ "<20>{#f/1}I've been waiting for this for a long time." ]
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
      criminal2: [ '<20>{#p/asriel2}{#f/3}Welcome back, $(name).', '<20>{#f/1}Ready to pick up where we last left off?' ],
      criminal3: [ '<20>{#p/asriel2}{#f/3}Well then.', '<20>{#f/3}...', "<20>{#f/4}Let's just get going." ],
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
      magic1: [ '<20>{#p/asriel2}{#f/3}Follow me.' ],
      name: '* Toriel',
      spareTalk1: [ '<11>{#p/toriel}{#f/11}...' ],
      spareTalk2: [ '<11>{#p/toriel}{#f/11}...\n...' ],
      spareTalk3: [ '<11>{#p/toriel}{#f/11}...\n...\n...' ],
      spareTalk4: [ '<11>{#p/toriel}{#f/17}...?' ],
      spareTalk5: [ '<11>{#p/toriel}{#f/17}What are you doing?' ],
      spareTalk6: [ '<11>{#p/toriel}{#f/17}...' ],
      spareTalk7: [ '<11>{#p/toriel}{#f/17}What are you trying to prove?' ],
      spareTalk8: [ '<11>{#p/toriel}{#f/17}...' ],
      spareTalk9: [ '<11>{#p/toriel}{#f/12}Fight me or leave!' ],
      spareTalk10: [ '<11>{#p/toriel}{#f/12}Stop looking at me that way!' ],
      spareTalk11: [ '<11>{#p/toriel}{#f/12}Go away!' ],
      spareTalk12: [ '<11>{#p/toriel}{#f/13}...' ],
      spareTalk13: [ '<11>{#p/toriel}{#f/13}...\n...' ],
      spareTalk14: [ '<11>{#p/toriel}{#f/13}...\n...\n...' ],
      spareTalk15: [
         '<11>{#p/toriel}{#f/13}I know you want to go home...',
         '<11>{#p/toriel}{#f/9}But the path to get there would be dangerous.'
      ],
      spareTalk16: [ '<11>{#p/toriel}{#f/14}So please... go back the other way.' ],
      spareTalk17: [
         '<11>{#p/toriel}{#f/13}I know we do not have much...',
         '<11>{#p/toriel}{#f/10}But we can still have a good life.'
      ],
      spareTalk18: [
         '<11>{#p/toriel}{#f/13}You and I, like a family...',
         '<11>{#p/toriel}{#f/10}Does that not sound good?'
      ],
      spareTalk19: [ '<11>{#p/toriel}{#f/21}...' ],
      spareTalk20: [ '<11>{#p/toriel}{#f/18}Why are you making this so difficult?' ],
      spareTalk21: [ '<11>{#p/toriel}{#f/21}...' ],
      spareTalk22: [ '<11>{#p/toriel}{#f/18}Please, just...', '<11>{#p/toriel}{#f/9}Go back the other way.' ],
      spareTalk23: [ '<11>{#p/toriel}{#f/21}...' ],
      spareTalk24: [ '<11>{#p/toriel}{#f/18}Oh, child...' ],
      spareTalk28b: [
         '<11>{#p/toriel}{#f/9}Maybe it was foolish of me...',
         '<11>{#f/13}Trying to stop you like this...',
         '<11>{#f/9}Maybe I should have just let you go.'
      ],
      spareTalk28c: [ '<11>{#p/toriel}{#f/17}...?', '<11>{#f/17}Why are you calling out for \"$(name)?\"' ],
      status1: [ '<32>{#p/story}* Toriel now stands before you.' ],
      status2: [ '<32>{#p/story}* Toriel prepares a magical attack.' ],
      status3: [ '<32>{#p/story}* Toriel is acting aloof.' ],
      status4: [ '<32>{#p/story}* Toriel is looking through you.' ],
      status5: [ '<32>{#p/story}* ...' ],
      assistStatus: [ '<32>{#p/basic}* There must be another way...' ],
      talk1: [ '<32>{#p/human}* (You ask Toriel to let you through.)\n* (No effect.)' ],
      talk2: [ "<32>{#p/human}* (You ask Toriel why she's really doing this.)\n* (She winces briefly.)" ],
      talk3: [ '<32>{#p/human}* (You begged Toriel to stop.)\n* (She hesitates.)' ],
      talk4: [
         '<32>{#p/human}* (You once again begged Toriel to stop.)',
         '<32>{#p/basic}* ... perhaps there is too much at stake for her.'
      ],
      talk5: [ '<32>{#p/human}* (You yell at Toriel.)\n* (She closes her eyes and takes a deep breath.)' ],
      talk6: [
         '<32>{#p/human}* (You once again yell at Toriel.)',
         "<32>{#p/basic}* ... perhaps talking won't do anymore good."
      ],
      talk7: [ "<32>{#p/human}* (But you couldn't think of anything else to say.)" ],
      talk8: [ '<32>{#p/human}* (But there was no sense in doing that now.)' ],
      theft: [ '<20>{*}{#p/twinkly}Mine.{^15}{%}' ]
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
      flirt4: [ '<25>{#p/toriel}{#f/3}* ...', '<25>{#p/toriel}{#f/4}* I cannot begin to understand you.' ],
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
      helloX: [ '<25>{#p/toriel}{#g/torielLowConcern}* Hello?' ],
      mom1: [
         '<25>{#p/toriel}* ...',
         '<25>{#f/7}* Huh?\n* Did you just call me \"Mom?\"',
         '<25>{#f/1}* Well...\n* I suppose...',
         '<25>{#f/1}* Would that make you happy?',
         '<25>{#f/1}* To call me...\n* \"Mother?\"',
         '<25>{#f/0}* Well then.\n* Call me whatever you like!'
      ],
      mom2: [ '<25>{#p/toriel}{#f/7}* ...\n* Oh my... again?', '<25>{#f/0}* Hee hee...\n* You are a very sweet child.' ],
      mom3: [
         '<25>{#p/toriel}{#f/7}* ...\n* Oh my... again?',
         '<25>{#f/5}* And after you flirted with me...',
         '<25>{#f/1}* Well then.\n* You are a very \"interesting\" child.'
      ],
      mom4: [ '<25>{#p/toriel}{#f/5}* ...' ],
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
            ? [ '<25>{#p/toriel}{#f/15}* ...', '<25>{#f/12}* I am going to pretend you did not just say that to me.' ]
            : [ '<25>{#p/toriel}{#f/1}* My child...' ]
   },

   i_candy: {
      battle: {
         description: 'Has a distinct, non-licorice flavor.',
         name: 'Caramelo'
      },
      drop: [ '<32>{#p/human}* (You throw away the Monster Candy.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (10 HP.)' ]
            : [ '<32>{#p/basic}* \"Monster Candy\" Heals 10 HP\n* Has a distinct, non-licorice flavor.' ],
      name: 'Monster Candy',
      use: [ '<32>{#p/human}* (You eat the Monster Candy.)' ]
   },
   i_water: {
      battle: {
         description: 'Smells like Dihydrogen Monoxide.',
         name: 'Agua'
      },
      drop: [ '<32>{#p/human}* (You throw away the Water.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (12 HP.)' ]
            : [ '<32>{#p/basic}* \"Water\" Heals 12 HP\n* Smells like Di-Hydrogen Monoxide.' ],
      name: 'Agua',
      use: () => [
         '<32>{#p/human}* (You drink the Water.)',
         ...(SAVE.data.b.ufokinwotm8 ? [] : [ "<33>{#p/human}* (You're filled with hydration.)" ]) 
      ]
   },
   i_chocolate: {
      battle: {
         description: 'A well-deserved chocolate bar.',
         name: 'Chocolate'
      },
      drop: () => [
         '<32>{#p/human}* (You throw away the Chocolate Bar.)',
         ...(SAVE.data.b.svr || world.darker ? [] : [ '<32>{#p/basic}* ... oh well.' ])
      ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (19 HP. This item seems to remind you of someone.)' ]
            : [ '<32>{#p/basic}* \"Chocolate Bar\" Heals 19 HP\n* It\'s a well-deserved treat.' ],
      name: 'Chocolate Bar',
      use: () => [
         '<32>{#p/human}* (You eat the Chocolate Bar.)',
         ...(battler.active && battler.alive[0].opponent.metadata.reactChocolate
            ? [ '<32>{#p/basic}* Toriel recognizes the scent, and smiles a little.' ]
            : [])
      ]
   },
   i_delta: {
      battle: {
         description: 'This substance is said to have highly relaxing properties.',
         name: 'Δ-9'
      },
      drop: [ '<32>{#p/human}* (You throw away the Δ-9.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (5 HP. You feel strangely about this item.)' ]
            : [ '<32>{#p/basic}* \"Δ-9\" Heals 5 HP\n* This substance is said to have highly relaxing properties.' ],
      name: 'Δ-9',
      use: [ '<32>{#p/human}* (You ingest the Δ-9.)' ]
   },
   i_halo: {
      battle: {
         description: 'A headband with its own gravity field.',
         name: 'Halo'
      },
      drop: [ '<32>{#p/human}* (You fling the Halo away like a frisbee.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (3 DF.)' ]
            : [ '<32>{#p/basic}* \"Halo\" (3 DF)\n* A headband with its own gravity field.' ],
      name: 'Halo',
      use: () => [
         '<32>{#p/human}* (You don the Halo.)',
         ...(SAVE.data.b.svr && !SAVE.data.b.freedom && asrielinter.i_halo_use++ < 1
            ? [ '<25>{#p/asriel1}{#f/20}* I think it suits you.' ]
            : [])
      ]
   },
   i_little_dipper: {
      battle: {
         description: 'A whacking spoon.',
         name: 'Dipper'
      },
      drop: [ '<32>{#p/human}* (You throw away the Little Dipper.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (3 AT.)' ]
            : [ '<32>{#p/basic}* \"Little Dipper\" (3 AT)\n* A whacking spoon.' ],
      name: 'Little Dipper',
      use: [ '<32>{#p/human}* (You equip the Little Dipper.)' ]
   },
   i_pie: {
      battle: {
         description: 'Homemade butterscotch-cinnamon pie, one slice.',
         name: 'Pie'
      },
      drop: [ '<32>{#p/human}* (You throw away the Butterscotch Pie.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (99 HP.)' ]
            : [ '<32>{#p/basic}* \"Butterscotch Pie\" Heals 99 HP\n* Homemade butterscotch-cinnamon pie, one slice.' ],
      name: 'Butterscotch Pie',
      use: [ '<32>{#p/human}* (You eat the Butterscotch Pie.)' ]
   },
   i_pie2: {
      battle: {
         description: 'Classic family recipe.',
         name: 'Snail Pie'
      },
      drop: [ '<32>{#p/human}* (You throw away the Snail Pie.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (99 HP.)' ]
            : [ '<32>{#p/basic}* \"Snail Pie\" Heals 99 HP\n* Classic family recipe.' ],
      name: 'Snail Pie',
      use: [ '<32>{#p/human}* (You eat the Snail Pie.)' ]
   },
   i_pie3: {
      battle: {
         description: 'Despite being soup-ified, the pie remains delicious.',
         name: 'Pie Soup'
      },
      drop: [ '<32>{#p/human}* (You dump the Pie Soup and the spoon that came with it.)' ],
      info: [ '<32>{#p/basic}* \"Pie Soup\" Heals 49 HP\n* Despite being soup-ified, the pie remains delicious.' ],
      name: 'Pie Soup',
      use: [ '<32>{#p/human}* (You consume the Pie Soup with the provided spoon.)' ]
   },
   i_pie4: {
      battle: {
         description: 'Actions do have their consequences...',
         name: 'Burnt Pie'
      },
      drop: [ '<32>{#p/human}* (You toss the Burnt Pie to the side like it never existed.)' ],
      info: [ '<32>{#p/basic}* \"Burnt Pie\" Heals 39 HP\n* Actions do have their consequences...' ],
      name: 'Burnt Pie',
      use: [ '<32>{#p/human}* (You eat the Burnt Pie.)' ]
   },
   i_snails: {
      battle: {
         description: 'A plate of fried snails.\nFor breakfast, of course.',
         name: 'Snails'
      },
      drop: [ '<32>{#p/human}* (You throw away the Fried Snails.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (19 HP.)' ]
            : [ '<32>{#p/basic}* \"Fried Snails\" Heals 19 HP\n* A plate of fried snails.\n* For breakfast, of course.' ],
      name: 'Fried Snails',
      use: [ '<32>{#p/human}* (You eat the Fried Snails.)' ]
   },
   i_soda: {
      battle: {
         description: 'A sickly, dark yellow liquid.',
         name: 'Soda'
      },
      drop: () => [
         '<32>{#p/human}* (You throw away the Fizzli Soda.)',
         ...(SAVE.data.b.svr || world.darker ? [] : [ '<32>{#p/basic}* Good riddance.' ])
      ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (8 HP.)' ]
            : [ '<32>{#p/basic}* \"Fizzli Soda\" Heals 8 HP\n* A dark, sickly yellow liquid.' ],
      name: 'Fizzli Soda',
      use: () => [
         '<32>{#p/human}* (You drink the Fizzli Soda.)',
         ...(SAVE.data.b.svr || world.darker ? [] : [ '<32>{#p/basic}* Yuck!' ])
      ]
   },
   i_spacesuit: {
      battle: {
         description: 'It came with the craft you crash-landed in.',
         name: 'Spacesuit'
      },
      drop: [ '<32>{#p/human}* (You throw away the Worn Spacesuit.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (20 HP. The last remaining fragment of a spacecraft flown in exile.)' ]
            : [ '<32>{#p/basic}* \"Worn Spacesuit\" Heals 20 HP\n* It came with the craft you crash-landed in.' ],
      name: 'Worn Spacesuit',
      use: [ '<33>{#p/human}* (After using its last heal-pak, the Worn Spacesuit fell apart.)' ]
   },
   i_spanner: {
      battle: {
         description: 'A rusty old wrench.',
         name: 'Spanner'
      },
      drop: [ '<32>{#p/human}* (You throw away the Rusty Spanner.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ "<32>{#p/human}* (A trusty tool forged from beyond the galaxy's edge.)" ]
            : [ '<32>{#p/basic}* A rusty old wrench.' ],
      name: 'Rusty Spanner',
      use: () => [
         ...(battler.active && battler.alive[0].opponent.metadata.reactSpanner
            ? []
            : [ '<32>{#p/human}* (You toss the spanner into the air.)\n* (Nothing happens.)' ])
      ]
   },
   i_starbertA: {
      battle: {
         description: 'The first of a limited run of Super Starwalker comics.',
         name: 'Starwalker 1'
      },
      drop: [ '<32>{#p/human}* (You throw away Super Starwalker 1.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (It seems like the beginning of a journey.)' ]
            : [ '<32>{#p/basic}* The first of a limited run of Super Starwalker comics.' ],
      name: 'Super Starwalker 1',
      use: () => (battler.active ? [ '<32>{#p/human}* (You read Super Starwalker 1.)', '<32>* (Nothing happens.)' ] : [])
   },
   i_starbertB: {
      battle: {
         description: 'The second of a limited run of Super Starwalker comics.',
         name: 'Starwalker 2'
      },
      drop: [ '<32>{#p/human}* (You throw away Super Starwalker 2.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (It seems like the middle of a journey.)' ]
            : [ '<32>{#p/basic}* The second of a limited run of Super Starwalker comics.' ],
      name: 'Super Starwalker 2',
      use: () =>
         battler.active
            ? [
                 '<32>{#p/human}* (You read Super Starwalker 2.)',
                 ...(SAVE.data.b.stargum
                    ? [ '<32>* (Nothing happens.)' ]
                    : [
                         '<32>* (You found a piece of gum taped to the comic strip.)',
                         choicer.create('* (Use the gum?)', 'Si', 'No')
                      ])
              ]
            : []
   },
   i_starbertC: {
      battle: {
         description: 'The third of a limited run of Super Starwalker comics.',
         name: 'Starwalker 3'
      },
      drop: [ '<32>{#p/human}* (You throw away Super Starwalker 3.)' ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (It seems like the end of a journey... or is it a new beginning?)' ]
            : [ '<32>{#p/basic}* The third of a limited run of Super Starwalker comics.' ],
      name: 'Super Starwalker 3',
      use: () => (battler.active ? [ '<32>{#p/human}* (You read Super Starwalker 3.)', '<32>* (Nothing happens.)' ] : [])
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
            : [ "<32>{#p/basic}* Well, that won't be missed." ])
      ],
      info: () =>
         SAVE.data.b.svr || SAVE.data.b.ufokinwotm8
            ? [ '<32>{#p/human}* (14 HP.)' ]
            : [ '<32>{#p/basic}* \"Sizzli Steak\" Heals 14 HP\n* Questionable.' ],
      name: 'Sizzli Steak',
      use: () => [
         '<32>{#p/human}* (You eat the Sizzli Steak.)',
         ...(SAVE.data.b.svr || world.darker || SAVE.data.b.ufokinwotm8 ? [] : [ '<32>{#p/basic}* Gross!' ])
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
                    ? [ '<25>{#f/1}* I thought they would be happier after their performance...' ]
                    : [ '<25>{#f/1}* I have tried to lift their spirits in the past...' ]),
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
            ? [ '<25>{#p/toriel}{#f/3}* There is no need to call me when I am right here, little one.' ]
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
         '<25>{#f/1}* I hope you like it...'
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
   c_call_toriel_early: () =>
      game.room === 'w_bridge' || game.room.startsWith('w_alley') // NO-TRANSLATE

         ? [ '<25>{#p/toriel}{#f/3}* ...', '<25>{#f/2}* Come back to the house this instant!' ]
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
         ? [ '<32>{#p/human}* (But the line was busy.)' ]
         : game.room === 'w_bridge' || game.room.startsWith('w_alley') // NO-TRANSLATE

         ? [ '<25>{#p/toriel}{#f/3}* ...', '<25>{#f/2}* Come back to the house this instant!' ]
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
         [ '<25>{#p/asriel2}{#f/4}* ...' ],
         [ '<25>{#p/asriel2}{#f/4}* ... seriously?' ],
         [ '<25>{#p/asriel2}{#f/3}* You must be really, REALLY bored.' ],
         []
      ][Math.min(SAVE.flag.n.ga_asrielCall++, 4)],
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
               ? [ '<32>{#p/human}* (This cute little home fills you with determination.)' ]
               : [ '<32>{#p/human}* (A house amidst the metallic walls fills you with determination.)' ]
      },
      w_entrance: {
         name: 'Outlands - Entrance',
         text: () =>
            world.runaway
               ? [
                    '<32>{#p/human}* (The industrious Outlands falls silent, filling you with determination.)',
                    '<32>{#p/human}* (PV restaurados.)'
                 ]
               : SAVE.data.n.plot < 48
               ? [
                    '<32>{#p/human}* (The industrious Outlands lies ahead, filling you with determination.)',
                    '<32>{#p/human}* (PV restaurados.)'
                 ]
               : [
                    '<32>{#p/human}* (Returning to where it all began, after so long...)',
                    '<32>{#p/human}* (This fills you with determination.)',
                    '<32>{#p/human}* (PV restaurados.)'
                 ]
      },
      w_froggit: {
         name: 'Outlands - Rest Area',
         text: () =>
            SAVE.data.n.state_wastelands_toriel === 2 || world.runaway || roomKills().w_froggit > 0
               ? SAVE.data.n.plot < 8.1
                  ? [
                       '<32>{#p/human}* (The air grows stale.)\n* (Somehow, this fills you with determination.)',
                       '<32>{#p/human}* (PV restaurados.)'
                    ]
                  : [
                       '<32>{#p/human}* (The air has fully dried up.)\n* (Indeed, this fills you with determination.)',
                       '<32>{#p/human}* (PV restaurados.)'
                    ]
               : SAVE.data.b.svr
               ? [
                    '<32>{#p/human}* (The area has been vacated, but the air remains fresh.)',
                    '<32>{#p/human}* (This, of course, fills you with determination.)',
                    '<32>{#p/human}* (PV restaurados.)'
                 ]
               : [
                    '<32>{#p/human}* (The sight of weird and wonderful creatures fills you with determination.)',
                    '<32>{#p/human}* (PV restaurados.)'
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
