// START-TRANSLATE

export default {
   battle: {
      death0: [ '(Tomas un respiro profundo.)', "(Estas lleno de determinación.)" ],
      death1: [ 'No puedes rendirte aún...', '$¡(nombre)!\nMantente determinado...' ],
      death2: [ 'Nuestro destino está en tus manos...', '$¡(nombre)!\nMantente determinado...' ],
      death3: [ "¡Estarás bien!", '$¡(nombre)!\nMantente determinado...' ],
      death4: [ "¡No te rindas!", '$¡(nombre)!\nMantente determinado...' ],
      death5: [ '¡No puede acabar ahora!', '$¡(nombre)!\nMantente determinado...' ],

      flee1: '. . . . * Escapaste...',
      flee2: ". . . . * Me largo.",
      flee3: ". . . . * Tengo mejores cosas que hacer.",
      flee4: ". . . . * No me ralentices.",
      flee5: '. . . . * Huiste con $(x) de EXP\n. . . . . . y $(y) de G.',

      mercy_assist: '* Asistir',
      mercy_flee: '* Huir',
      mercy_spare: '* Perdonar',

      victory1: '<32>{#p/story}* GANASTE!\n* Obtuviste $(x) de EXP y $(y) de O.',
      victory2: '<32>{#p/story}* GANASTE!\n* Obtuviste $(x) de EXP y $(y) de O.\n* Tu AMOR aumentó.'
   },

   developer: {
      console: {
         header: 'ERROR',
         p_resume: {
            header: 'CERRAR',
            resume: 'Click Para Cerrar'
         },
         blurb: '¡Ha ocurrido un error! Por favor manda\nuna captura de pantalla al desarrollador.'
      },
      control: {
         tab: 'CONTROLES',
         headers: [ 'GENERAL', 'COMBATE' ],
         items: [
            [
               'ArreglarMusica',
               'ArreglarJugador',
               'OroInfinito',
               'Interactuar',
               'Entrada',
               'Movimiento',
               'Noclip',
               'Guardar',
               'SaltarTexto',
               'CamaraLibre'
            ],
            [
               'PuedeAsistir',
               'LimpiarCaja',
               'Salir',
               'ResetCaja',
               'ResetearMenú',
               'PuedeHuir',
               'PVInfinita',
               'PacificarTodos',
               'Suicidar',
               'DebilitarTodos'
            ]
         ],
         p_speed: {
            fps: '$(x) FPS',
            halt: 'Parar',
            header: 'VELOCIDAD DEL JUEGO',
            multiplier: '$(x)x',
            next: 'Más',
            prev: 'Menos',
            sec: '$(x)s/fotogramas'
         }
      },
      godhome: {
         tab: 'CENTROMANDO',
         p_teleport: {
            header: 'HABITACION',
            action: 'Teletransportar'
         },
         p_encounter: {
            header: 'ENCUENTROS',
            action: 'Inicar'
         },
         p_armor: {
            header: 'ARMADURA'
         },
         p_weapon: {
            header: 'ARMA'
         }
      },
      inspect: {
         tab: 'INSPECIONAR',
         headers: [ 'CAPAS', 'TIPOS' ],
         switches: [
            [ 'Base', 'Debajo', 'Principal', 'Encima', 'Menú' ],
            [ 'Hitbox', 'Sprite', 'Texto' ]
         ],
         p_explorer: {
            header: 'EXPLORADOR',
            layers: [ 'Base (Explorador)', 'Debajo (Explorador)', 'Principal (Explorador)', 'Encima (Explorador)', 'Menú (Explorador)' ],
            letters: {
               animation: 'A',
               character: 'C',
               rectangle: 'R',
               entity: 'E',
               hitbox: 'H',
               object: 'O',
               player: 'P',
               sprite: 'S',
               text: 'T'
            }
         },
         debug_instructions: 'Presiona [TAB] para ciclar la info',
         debug: {
            a: 'A', 
            acceleration: 'Aceleración',
            active: 'Activo',
            alpha: 'Alfa',
            anchor: 'Ancla',
            b: 'B', 
            blend: 'Mezclar',
            border: 'Borde',
            compute: 'Tamaño Computado',
            content: 'Contenidos',
            crop: 'Recortar',
            down: 'Abajo',
            duration: 'Duración',
            exp: 'PE',
            extent: 'Extensión',
            f: 'F', 
            face: 'Cara',
            false: 'Falso',
            fill: 'Llenar',
            fontFamily: 'Tipo de Letra',
            fontSize: 'Tamaño de Letra',
            frames: 'Fotogramas',
            gravity: 'Gravedad',
            group: 'Grupo',
            hp: 'PS',
            index: 'Índice',
            inert: 'Inerte',
            key: 'Tecla',
            lastSavedTime: 'Ultimo Guardado',
            layer: 'Capa',
            layers: 'Capas',
            left: 'Restante',
            metadata: 'Metadatos',
            music: 'Musica',
            namespace: 'EspaciodNombre',
            none1: 'NULO',
            none2: 'nulo',
            objects: 'Objetos',
            oversaver: 'SobreGuardado',
            parallax: 'Paralax',
            position: 'Posición',
            primed: 'Imprimado',
            priority: 'Prioridad',
            registry: 'REGISTRAR',
            renderer: 'Renderizar',
            resources: 'Recursos',
            reverse: 'Invertir',
            right: 'Derecha',
            room: 'Habitación',
            roomState: 'EstadHabitación',
            rotation: 'Rotación',
            s: 'S', 
            scale: 'Escala',
            shopSelection: 'SelecdeTienda',
            size: 'Tamaño',
            spacing: 'Espaciado',
            spin: 'Giro',
            sprites: 'Sprites',
            step: 'Paso',
            stroke: 'Golpe',
            subcrop: 'Subcultivo',
            talk: 'Hablar',
            target: 'Objetivo',
            text: 'Texto',
            time: 'Tiempo',
            tint: 'Tinte',
            trackedAssets: 'Recursos Monitoreados',
            true: 'Verdad',
            unknown: 'DESCONOCIDO',
            up: 'Arriba',
            vars: 'Vars',
            velocity: 'Velocidad',
            volatile: 'Volátil'
         }
      },
      savemod: {
         tab: 'GUARDARMOD',
         header1: 'GUARDAR EDITOR',
         domains: [
            'Info (Estado)',
            'Info (Números)',
            'Info (Texto)',
            'Banderas (Estado)',
            'Banderas (Número)',
            'Banderas (Texto)'
         ],
         p_page: {
            header: 'NAVEGACIÓN',
            prev: 'Anterior',
            next: 'Siguiente'
         },
         prompt: 'Introduzca Valor',
         back: 'Volver'
      },
      storage: {
         tab: 'ALMACENAMIENTO',
         header: 'EDITOR ALMACENAMIENTO',
         p_container: { header: 'SELECCIÓN', prev: 'Anterior', next: 'Siguiente' },
         display: { inventory: 'Inventario', dimboxA: 'Caja Dimensional A', dimboxB: 'Caja Dimensional B' }
      }
   },

   dialog: {
      dialog_clear_title: 'Limpiar Archivo',
      dialog_notice_title: 'Aviso',
      dialog_open: { buttonLabel: 'Abrir', name: 'Archivo de GUARDADO', title: 'Abrir Archivo' },
      dialog_save: { buttonLabel: 'Guardar', name: 'Archivo de GUARDADO', title: 'Guardar Archivo' },
      error_load: 'Ese archivo no pudo ser analizado.',
      message_alert: [ 'Vale' ],
      message_confirm: [ 'Cancelar', 'Vale' ],
      prompt_clear: '¿Desea eliminar este archivo?',
      prompt_demo: 'Su archivo de GUARDADO\nde la demo de OUTERTALE\nse ha movido a una línea temporal.',
      prompt_save: '¿Guardar este archivo?',
      prompt_save_alternate: 'Copia el texto de abajo\nen archivo JSON para\nguardarlo en su dispositivo.',
      prompt_open: '¿Cargar este archivo?'
   },

   extra: {
      credits: [
         [
            '§fill=#ff0§< DESARROLLADOR >§fill=#fff§',
            'spacey_432',
            '',
            '§fill=#ff0§< ESCRITOR >§fill=#fff§',
            'Balgamlı Kedi',
            'Bilge \"mnwary\"',
            'Dischnie',
            'Efe Kaya',
            'Ghostly',
            'InvincibleRacoon',
            'Jojoton56',
            'Kiwi \"Quinn\"',
            'My Aster',
            'neo9174',
            'Rise'
         ],
         [
            '§fill=#ff0§< ESCRITOR >§fill=#fff§',
            'ThatGuyWhoLikesFood',
            'Turbulation',
            'Zaxento The Greedy',
            '',
            '§fill=#ff0§< ARTISTA >§fill=#fff§',
            'Balgamlı Kedi',
            'Burge',
            'Deskius',
            'DESM.al',
            'Discarded Vessel',
            'Efe Kaya',
            'Fired',
            'Funtermore',
            'Ghostly'
         ],
         [
            '§fill=#ff0§< ARTISTA >§fill=#fff§',
            'HolyOranges',
            'major_memestar',
            'MattSpriteMaster',
            'Medi0creking',
            'NerNot1',
            'PhyreFM',
            'Pongy25',
            'PoTheWinterCorder',
            'ProctorDorkchop02',
            'ScarletScaledDragon',
            'semi',
            'Soup Taels',
            'SquigglyWiggley',
            'Starkiteckt'
         ],
         [
            '§fill=#ff0§< ARTISTA >§fill=#fff§',
            'supper12',
            'Valor52',
            'Zaxento The Greedy',
            '',
            '§fill=#ff0§< TECNICISTA >§fill=#fff§',
            'Codetoil',
            'ryi3r',
            'ws3917',
            '',
            '§fill=#ff0§< TESTEADOR >§fill=#fff§',
            'Alden',
            'Aspey',
            'Balgamlı Kedi',
            'Bilge \"mnwary\"'
         ],
         [
            '§fill=#ff0§< TESTEADOR >§fill=#fff§',
            'blue',
            'Brad',
            'brayjamin',
            'ClamsyMoe',
            'delta',
            'Discarded Vessel',
            'Dischnie',
            'DR4GON HE4RT',
            'Dubituar',
            'Efe Kaya',
            'Emurry',
            'Enzolos',
            'EvanGamesGoodman',
            'Fired'
         ],
         [
            '§fill=#ff0§< TESTEADOR >§fill=#fff§',
            'FireWizard72X',
            'FuLiNT',
            'Funtermore',
            'gardnaeden',
            'Ghostly',
            'Gon UT',
            'Green Tea',
            'Huggies!',
            'ilovecookies',
            'InvincibleRacoon',
            'Jago128',
            'Joe98912',
            'Jojoton56',
            'Jonkler'
         ],
         [
            '§fill=#ff0§< TESTEADOR >§fill=#fff§',
            'Kiwi \"Quinn\"',
            'lil tanski',
            'MR. PETER',
            'MSBen',
            'Murder--Sans_MDR',
            'My Aster',
            'Nanorasmus',
            'neo9174',
            'NepAnime',
            'semi',
            'Shaun Duz Stuffs',
            'SHCyank',
            'NerNot1',
            'petar3644'
         ],
         [
            '§fill=#ff0§< TESTEADOR >§fill=#fff§',
            'PixelToons Jaafar',
            'Prezmop',
            'prymus-agd',
            'Quin',
            'RadicalRic',
            'Raelynn',
            'retr22800',
            'Rise',
            'RoCtD_14159',
            'sonicisawesome222',
            'Soup Taels',
            'spaceknife234',
            'SquigglyWiggley',
            'superkippy'
         ],
         [
            '§fill=#ff0§< TESTEADOR >§fill=#fff§',
            'Teecup',
            'Tem in a Cowboy Hat',
            'Tenbrooks',
            'ThatGuyWhoLikesFood',
            'The Fallen Angel',
            'TheAsriel',
            'Turbulation',
            'Wild Pasta',
            'Xiao_Akatsuki',
            'xNoodlePlayz',
            'Zaxento The Greedy'
         ],
         [
            '§fill=#ff0§< GRACIAS ESPECIALES >§fill=#fff§',
            'Alden',
            '§fill=#808080§Por estar ahí por mí cuando\nnecesitaba alguien para apoyarme, y\nenseñarme lecciones de vida que\nme han hecho una mejor persona.§fill=#fff§'
         ],
         [
            '§fill=#ff0§< GRACIAS ESPECIALES >§fill=#fff§',
            'My Aster',
            '§fill=#808080§Por ser una de las personas\nmás amigables que conozco, la primera persona\nen cree en mi visión, e\ninspirarme en terminar el juego.§fill=#fff§'
         ],
         [
            '§fill=#ff0§< GRACIAS ESPECIALES >§fill=#fff§',
            'Balgamlı Kedi',
            "§fill=#808080§Por estar conmigo en cualquier etapa de desarrollo,\n desde el inicio.\n Independientemente de la etapa,\n siempre ha estado ahí para ayudar.§fill=#fff§"
         ],
         [
            '§fill=#ff0§< GRACIAS ESPECIALES >§fill=#fff§',
            'Ghostly',
            '§fill=#808080§Por ser una voz razonante\nen muchos aspectos del juego,\n y por hacerme testear seriamente.§fill=#fff§'
         ],
         [
            '§fill=#ff0§< GRACIAS ESPECIALES >§fill=#fff§',
            'Zaxento The Greedy',
            '§fill=#808080§Por ser confiable, brutalmente\nhonesto, darme mucha crítica\ne ideas, y ser\nconfiable desde que nos conocimos.§fill=#fff§'
         ],
         [
            '§fill=#ff0§< GRACIAS ESPECIALES >§fill=#fff§',
            'ThatGuyWhoLikesFood',
            '§fill=#808080§Por ayudarme a escribir partes\nimportantes del juego, apoyando mi\nvisión, y ayudarme a\nexpresarme de una nueva manera.§fill=#fff§'
         ],
         [
            '§fill=#ff0§< GRACIAS ESPECIALES >§fill=#fff§',
            'Bilge \"mnwary\"',
            "§fill=#808080§Por estar ahí para ayudar al\nfinal del desarrollo, y\nasegurando que la escritura del juego\nllegue a su potencial máximo.§fill=#fff§"
         
        ],
         [
            '§fill=#ff0§< TRADUCTORES AL ESPAÑOL >§fill=#fff§',
            'Chistosito',
            'Stefano9000',
            'DR4GON_HE4RT',
            'Manuel',
        ],
[ 'Traído a usted por §fill=#ff0§The Mavis & Co.§fill=#fff§' ]
      ],

      final_frontier: {
         header: '(( REPARTO ))',
         opponents: {
            froggit: {
               name: 'FROGGIT',
               author: 'ScarletScaledDragon',
               text: {
                  basic: 'Reflexionando Sobre\nLa Vida',
                  spare: 'Rana\n Profesional',
                  flirt: 'Reflexionando Sobre\nEl Amor',
                  bully: 'Deseando Con\n Miedo'
               }
            },
            whimsun: {
               name: 'FLUTTERLYTE',
               author: 'ScarletScaledDragon',
               text: {
                  basic: 'Aprendiendo A\nVolar',
                  spare: 'Aviador\nValiente',
                  flirt: 'Surcando Los\nCielos',
                  bully: 'Maniobrando\nEvasivamente'
               }
            },
            moldsmal: {
               name: 'GELATINI',
               author: 'spacey_432',
               text: {
                  basic: 'Encontró Una Nueva\nEstación Espacial',
                  spare: 'Bailarín/a\nDe Repuesto',
                  flirt: 'Gelatina Exótica\nBailadora',
                  bully: 'Encontró Una Nueva\nGalaxia'
               }
            },
            loox: {
               name: 'OCULOUX',
               author: 'ScarletScaledDragon',
               text: {
                  basic: 'Un Poco\nBully',
                  spare: 'Bully\nReformado',
                  flirt: 'Un Poco\nCoqueto',
                  bully: ''
               }
            },
            migosp: {
               name: 'SILENTE',
               author: 'ScarletScaledDragon',
               text: {
                  basic: 'Excesivamente\nAcordante',
                  spare: 'Disfruta De La Vida\nCasualmente',
                  flirt: 'Enamorado\nDe Lejos',
                  bully: 'Negador\nDel Peligro'
               }
            },
            mushy: {
               name: 'MUSHY',
               author: 'Balgamlı Kedi & ScarletScaledDragon',
               text: {
                  basic: 'Disparando\nA Dianas',
                  spare: 'Mago\nRápido',
                  flirt: 'Disparo De La \nPistola Rompecorazones',
                  bully: 'Rociando y\nRezando'
               }
            },
            finalghost: {
               name: 'LURKSALOT',
               author: 'spacey_432',
               text: {
                  basic: 'Quedándoselo\nPara Él',
                  spare: 'Buscando\nContacto Físico',
                  flirt: 'No Involucrado\nEstoicamente',
                  bully: ''
               }
            },
            stardrake: {
               name: 'STARDRAKE',
               author: 'Burge',
               text: {
                  basic: 'Aún Buscando\nRisas',
                  spare: 'Comediante\nMedio Exitoso',
                  flirt: 'Popular Con Los\nAdultos',
                  bully: ''
               }
            },
            chilldrake: {
               name: 'CHILLDRAKE',
               author: 'Burge',
               text: {
                  basic: 'Aún Buscando\nAyudantes',
                  spare: 'Consiguió Un\nCulto',
                  flirt: 'Cambia Besos\nPor Ayudantes',
                  bully: 'Activista\nAnti-Acoso'
               }
            },
            spacetop: {
               name: 'ASTRO SERF',
               author: 'DESM.al',
               text: {
                  basic: 'Pensando Sobre\nSu Antena',
                  spare: 'Sensación Sobre\nUna Estación De Radio',
                  flirt: 'Amor Está\nEn El Aire',
                  bully: 'Locutor De\nEmergencias'
               }
            },
            jerry: {
               name: 'JERRY',
               author: 'Discarded Vessel',
               text: {
                  basic: 'Siendo Abandonado\nDiariamente',
                  spare: 'Siendo Abandonado\nUn Poco Menos',
                  flirt: 'En Camino A\nRedención',
                  bully: ''
               }
            },
            mouse: {
               name: 'WHIZKARAT',
               author: 'Zaxento El Greedy & semi',
               text: {
                  basic: 'Teniendo Una\nCrisis de Identidad',
                  spare: 'El Nuevo Miembro\nDe Los Ratones',
                  flirt: 'Volviéndose Retozón\nCon Los Ratones',
                  bully: 'Echado De Vuelta\nA La Sociedad Gatuna'
               }
            },
            doggo: {
               name: 'DOGGO',
               author: 'Discarded Vessel',
               text: {
                  basic: 'Cree En La\nLlave Inglesa Suprema',
                  spare: 'Encontró Su Propio\nLobo De Ojos Videntes',
                  flirt: 'En Amor Con Su\nLobo De Ojos Videntes',
                  bully: 'Corriendo A Su\nLobo De Ojos Videntes'
               }
            },
            lesserdog: {
               name: 'CANINO MENOR',
               author: 'major_memestar',
               text: {
                  basic: 'Buscando\nAfecto',
                  spare: 'Encontró Un Dueño\nAmante',
                  flirt: 'Encontró Amor\nPropio',
                  bully: 'Desesperado Por\nAfecto'
               }
            },
            dogs: {
               name: 'DOGAMY & DOGARESSA',
               author: 'major_memestar',
               text: {
                  basic: 'Aún Pensando\nSobre Buscar',
                  spare: 'Reinante Ojos De\nPerros Campeones',
                  flirt: "Atrapado En La\nMirada Del Otro",
                  bully: 'Ojos De Perro\nDefensivo Comprometido'
               }
            },
            greatdog: {
               name: 'CANINO MAYOR',
               author: 'major_memestar',
               text: {
                  basic: "Inconsciente De Los\nCambios De La Vida",
                  spare: "Emocionado De Los\nCambios De La Vida",
                  flirt: "Afectado Por\nLos Cambios De La Vida",
                  bully: ''
               }
            },
            woshua: {
               name: 'SKRUBBINGTON',
               author: 'Discarded Vessel',
               text: {
                  basic: 'Solo 99.1%\nLimpio',
                  spare: 'Central De\nLavado',
                  flirt: 'Fabricante De \nJacuzzis',
                  bully: 'Sobre Poderosa\nMáquina De Presión'
               }
            },
            moldbygg: {
               name: 'GELATA',
               author: 'spacey_432',
               text: {
                  basic: 'Buscando Una\nNiñera',
                  spare: 'Taburete Con\nMotor Slime',
                  flirt: 'Comediante Regular\nSexy',
                  bully: 'Objeto De Lucha\nLibre Glorificado'
               }
            },
            radtile: {
               name: 'RADTILE',
               author: 'Balgamlı Kedi & Zaxento El Greedy',
               text: {
                  basic: 'Revolcándose En\nImperfecciones',
                  spare: 'Mejorando Su\nImagen Personal',
                  flirt: 'Teniendo Citas Con\nSu Reflejo',
                  bully: 'Preparado Por El\nFeo Futuro'
               }
            },
            shyren: {
               name: 'SHYREN',
               author: 'Ghostly',
               text: {
                  basic: 'Volviendo A Tener\nClases De Piano',
                  spare: "La Nueva Cantante Principal\nDe Mettaton",
                  flirt: 'Enamorada De Un Fantasma',
                  bully: "No Puede Cantar Sin\nUn Sintetizador"
               }
            },
            doge: {
               name: 'DOGE',
               author: 'major_memestar',
               text: {
                  basic: 'Sargento Excavadora\nDe Lugar De Construcción',
                  spare: 'Compró Una Subscripción\nA Spa De Por Vida',
                  flirt: 'Sintió Amor Perruno\nPor La Primera Vez',
                  bully: ''
               }
            },
            muffet: {
               name: 'MUFFET',
               author: 'major_memestar',
               text: {
                  basic: 'Buscando Su\nSiguiente Paga',
                  spare: 'Cuidando De\nLos Clanes De Arañas',
                  flirt: 'Cita De Picnic\nProfesional',
                  bully: ''
               }
            },
            pyrope: {
               name: 'HOTWIRE',
               author: 'semi',
               text: {
                  basic: 'Esperando A Que\nBaje El Ritmo',
                  spare: 'Rapeador\nVelocidad-Rayo',
                  flirt: 'Rapero Convertido\nEscritor De Canciones De Amor',
                  bully: 'Batallando Con Rap\nHasta La Muerte'
               }
            },
            tsundere: {
               name: 'TSUNDERIDEX',
               author: 'spacey_432',
               text: {
                  basic: 'Volando Profundamente\nEn Negación',
                  spare: 'Acercándose A Ti\nA Velocidad De Transformación',
                  flirt: 'Pronto será\nTu-sn Dere-Dere',
                  bully: 'Finalmente Encontró\nSu Pareja'
               }
            },
            perigee: {
               name: 'PERIGEE',
               author: 'Discarded Vessel',
               text: {
                  basic: 'Otro Día,\nOtro Conflicto',
                  spare: 'Embajador\nInterplanetario',
                  flirt: 'Fomentando Amor\nEn Otros',
                  bully: 'Mostrando Amabilidad\nA Través Del Dolor'
               }
            },
            rg: {
               name: 'GR 03 & GR 04',
               author: 'semi',
               text: {
                  basic: 'En Busca De\nAmigos De La Infancia',
                  spare: 'Usa Tu\nImaginación',
                  flirt: 'Por Favor Usa Tu\nImaginación',
                  bully: 'Retirados De La\nGuardia Real'
               }
            },
            glyde: {
               name: 'GLYDE',
               author: 'Burge',
               text: {
                  basic: 'No Tu Compañero\nDe Trabajo Ideal',
                  spare: 'Un Poco Menos\nOscuro De Lo Usual',
                  flirt: 'No Tu Compañero De Cama\nIdeal',
                  bully: ''
               }
            },
            burgie: {
               name: 'BURGERPANTS',
               author: 'Pongy25',
               text: {
                  basic: 'Corriendo Precipitadamente\nA La Vida',
                  spare: 'Mirando Adelante\nA Lo Que Le Viene En La Vida',
                  flirt: 'Buscando Amor\nEn Lo Que Le Viene En La Vida',
                  bully: ''
               }
            },
            madjick: {
               name: 'COZMO',
               author: 'semi',
               text: {
                  basic: 'Buscando Un\nDiccionario',
                  spare: 'Mago\nFamoso',
                  flirt: 'Encontró Un Nuevo Tipo\nDe Magia',
                  bully: ''
               }
            },
            knightknight: {
               name: 'TERRESTRIA',
               author: 'major_memestar',
               text: {
                  basic: 'En Busca Del\nPasado',
                  spare: 'Historiador\nRenombrado',
                  flirt: 'Está Enamorada Del\nMundo Natal',
                  bully: ''
               }
            },
            froggitex: {
               name: 'FROGGIT FINAL',
               author: 'PoTheWinterCorder',
               text: {
                  basic: 'Quedándose Su\nSabiduría Para Él',
                  spare: 'Compartiendo Su\nSabiduría Abiertamente',
                  flirt: 'Usando Su Sabiduría\nPara El Amor',
                  bully: 'Usando Su Sabiduría\nPara Sobrevivir'
               }
            },
            whimsalot: {
               name: 'FLUTTERKNYTE',
               author: 'spacey_432',
               text: {
                  basic: 'Aún Trabajando\nTodos Los Días',
                  spare: 'Finalmente Se Tomó\nUn Descanso',
                  flirt: 'Buscando Tiempo\nA Solas',
                  bully: 'Trabajando Más Duro\nPor Miedo'
               }
            },
            astigmatism: {
               name: 'EYEWALKER PRIME',
               author: 'semi',
               text: {
                  basic: 'Aún Un\nGran Acosador',
                  spare: 'Dominador\nDoctor De Ojos',
                  flirt: 'Sastre De Cuero\nDominante',
                  bully: 'Derrocado Por\nUn Oculoux'
               }
            },
            migospel: {
               name: 'SILENCIO',
               author: 'Balgamlı Kedi',
               text: {
                  basic: 'Aún Un\nCobarde Desvergonzado',
                  spare: 'Un Poco Menos\nCobarde',
                  flirt: 'Enamorado De\nSu Miedo',
                  bully: 'Corriendo Más Rápido\nQue Nunca Antes'
               }
            },
            mushketeer: {
               name: 'MUSHKETEER',
               author: 'Balgamlı Kedi & Ghostly',
               text: {
                  basic: 'Un Ejército De\nChampiñones',
                  spare: 'Guerrero Endurecido\nBuscando Paz',
                  flirt: 'Derrotado Por El\nPoder Del Amor',
                  bully: 'Miedo A\nLa Fuerza'
               }
            }
         },
         swords: {
            papyrus: {
               name: 'PAPYRUS',
               author: 'ProctorDorkchop02 & MattSpriteMaster'
            },
            sans: {
               name: 'SANS',
               author: 'ProctorDorkchop02 & Fired'
            },
            undyne: {
               name: 'UNDYNE',
               author: 'major_memestar'
            },
            alphys: {
               name: 'ALPHYS',
               author: 'major_memestar'
            },
            mewmew: {
               name: 'MEW MEW',
               author: 'spacey_432'
            },
            napstablook: {
               name: 'NAPSTABLOOK',
               author: 'spacey_432'
            },
            mettaton: {
               name: 'METTATON',
               author: 'MattSpriteMaster'
            },
            toriel: {
               name: 'TORIEL',
               author: 'MattSpriteMaster'
            },
            asgore: {
               name: 'ASGORE',
               author: 'MattSpriteMaster'
            },
            monsterkid: {
               name: 'MONSTER KID',
               author: 'spacey_432'
            },
            asriel: {
               name: 'ASRIEL',
               author: 'Medi0creking & MattSpriteMaster'
            }
         }
      },

      langPrompt: '[↑ o ↓] para Elegir / [Z o INTRO] para Confirmar',
      epilepsyInfo:
         'Para el que le preocupe,\n\nEste juego contiene §fill=#ff0§luces parpadeantes§fill=#fff§\nque podrán ser reducidas mediante el\n§fill=#ff0§menú de opciones§fill=#fff§.\n',
      epilepsyKeys: '§fill=#808080§Presiona [Z o INTRO] para Continuar',

      quitText1: 'Saliendo',
      quitText2: 'Saliendo.',
      quitText3: 'Saliendo..',

      real1: [
         [
            'Gracias por jugar Outertale.',
            'Trabajar en este proyecto a sido un honor,',
            'y un placer de mi parte.'
         ],
         [ 'Cuando empecé esta aventura, nunca', "pensé que llegaría tan lejos, pero aquí", 'estamos de todas formas, al final.' ],
         [
            'Para mí, UNDERTALE fue una experiencia',
            'que me cambió la vida, y una que fue muy difícil',
            'dejar pasar después de jugarlo por primera vez.'
         ],
         [
            'Entonces, con OUTERTALE, quería darte',
            'otra oportunidad de existir en un mundo como aquel,',
            'como si fuera tu primera vez.'
         ],
         [
            "Espero que haberte dado esa oportunidad.",
            "Espero que estés satisfecho con",
            "el rato que has pasado en este mundo."
         ],
         [
            "Sin importar lo que hayas hecho en tu vida,",
            'tus acciones aquí hablan sobre',
            'el tipo de persona que eres en realidad.'
         ],
         [
            "Es gracias a ti que conseguiste el final",
            'que tu hiciste, y nada puede quitarte esa',
            'experiencia de ti.'
         ],
         [ 'A pesar de tus errores... eres increíble,', 'y mereces amor y atención.', '¿Recuérdalo, vale?' ]
      ],
      real2: 'Cuida de ti, \"$(x).\"',

      end1: 'FIN',
      end2: '¿FIN...?',

      restartText1: 'Reiniciando',
      restartText2: 'Reiniciando.',
      restartText3: 'Reiniciando..',

      title: 'OUTERTALE',
      title_timeline: '¿OUTERTALE...?'
   },

   gamepad: {
      prompt: 'CONFIGURACIÓN DEL MANDO',
      prompt_desc:
         'Pulsa un botón del mando para asignarlo\na la acción del juego.\n\nPulsa el botón otra vez para confirmar, o pulsa\notros botones para asignar la misma acción.\n\nPulsa ESC para saltarte la configuración.',
      prompt_counter: 'Botones Asignados: $(x)',
      z: '[Z o INTRO] - Confirmar',
      x: '[X o SHIFT] - Cancelar',
      c: '[C o CTRL] - Menú (En el juego)',
      u: '[FLECHA ARRIBA o W] - Moverte hacia Arriba',
      l: '[FLECHA IZQUIERDA o A] - Moverte hacia la izquierda',
      d: '[FLECHA ABAJO o S] - Moverte hacia abajo',
      r: '[FLECHA DERECHA o D] - Moverte hacia la derecha',
      f: '[F4] - Pantalla Completa',
      prompt_done: 'Configuración completada.\nPulsa cualquier botón para continuar.',
      prompt_done_browser: '\nNota: En esta plataforma, puede que el mando\nno pueda entrar pantalla completa.',
      prompt_load:
         'Un mando ya se ha configurado\nPulsa un botón para continuar, o pulsa\ncualquier botón 3 veces seguidas para reiniciar la configuración.\n\nPulsa ESC para saltarte la configuración.'
   },

   general: {
      asriel: 'Asriel',
      asriel_location: 'El Olvido',
      disabled: 'DESACTIVADO',
      enabled: 'ACTIVADO',
      finish: 'Pulsa [X] para Terminar.',
      frisk: 'Frisk',
      g: 'Oro',
      hp: 'PS',
      inf: 'INF',
      landing1: '[PRESIONA Z O ENTER]',
      lv: 'NV',
      mystery1: '§mystify=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz§aaaaaa§mystify=§',
      mystery2: '{@mystify=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz}aaaaaa{@mystify=}',
      mystery2l: '{@mystify=abcdefghijklmnopqrstuvwxyz}aaaaaa{@mystify=}',
      mystery2u: '{@mystify=ABCDEFGHIJKLMNOPQRSTUVWXYZ}aaaaaa{@mystify=}',
      no: 'No',
      nominal: '§fill=#0f0§NOMINAL',
      percent: '$(x)%',
      player: 'jugador',
      settings: 'Ajustes',
      unknown: '?',
      xm: 'ME',
      yes: 'Si'
   },

   menu: {
      box1: 'INVENTARIO',
      box2: 'CAJA',
      key1: 'LLAVERO',

      confirm1: '¿Es este nombre correcto?',
      confirm2: 'Un nombre ya ha sido\nescogido.',
      confirm3: 'Regresar',

      footer: 'OUTERTALE V5.04 (c) 2024 SPACEY_432',

      heal1: '* (PV restaurados.)',
      heal2: '* (Has recuperado $(x) PV.)',
      heal3: '* (Has perdido $(x) PV.)',
      heal4: '* (PV agotados.)',
      heal5: '* (Has ganado $(x) PV.)',

      item1: 'USAR',
      item2: 'EQUIPAR',
      item3: 'INFO',
      item4: 'TIRAR',

      load1: 'Continuar',
      load2: 'Observar',
      load3: 'Reiniciar',
      load4: 'Reinicio Real',

      name1: 'Nombra el humano estrellado.',
      name2: 'Salir',
      name3: 'Eliminar',
      name4: 'Listo',
      name5: '§fill=#808080§ [ESC] - Salir / [INTRO] - Listo',

      save1: 'Guardar',
      save2: 'Regresar',
      save3: 'Archivo Guardado.',

      settings1: 'AJUSTES',
      settings2: 'SALIR',
      settings3: 'IDIOMA',
      settings3a: 'ESPAÑOL',
      settings4: 'EFECTOS DE SONIDO',
      settings5: 'MÚSICA',
      settings6: 'GRÁFICOS ELEGANTES',
      settings7: 'LUCES PARPADEANTES',
      settings7a: 'NORMAL',
      settings7b: 'REDUCIDAS',
      settings8: 'CONTROLES TÁCTILES',
      settings8a: 'IZQUIERDA',
      settings8b: 'DERECHA',
      settings8c: 'ESCONDIDOS',
      settings9: 'ZONA MUERTA',
      settings10: 'ABRIR CARPETA DE MODS',
      settings11: 'REINICIAR',

      sidebar1: 'OBJT',
      sidebar2: 'ESTA',
      sidebar3: 'TELF',
      sidebar4: 'CONF',
      sidebar5: 'S',

      start1: [
         '--- Instrucciones ---',
         '[Z o INTRO] - Confirmar',
         '[X o SHIFT] - Cancelar',
         '[C o CTRL] - Menú (En el juego)',
         '[F4] - Pantalla Completa',
         '[Mantén ESC] - Reiniciar',
         'Cuando sus PV llegan a 0, pierdes.'
      ],
      start2: 'Empezar el Juego',

      stat1: 'AT',
      stat2: 'DF',
      stat3: 'ARMA',
      stat4: 'ARMADURA',
      stat5: 'ORO',
      stat6: 'PE',
      stat7: 'SIGUIENTE',
      stat8: '§fill=#ff0§Advertencia:\nLínea temporal\nno canónica.',
      stat9: 'MUERTES',
      stat10: 'ACOSO',
      stat11: 'COQUETEO',
      stat12: 'ESTADO',
      stat13: '\"$(x)\"',

      story1: [ '<24>{#p/storyteller}Hace tiempo, dos especies habitaban el sistema solar: HUMANOS y MONSTRUOS.{^35}{}' ],
      story2: [ '<24>Cuando el tiempo pasó, una guerra empezó entre las especies.{^35}{}' ],
      story3: [ "<24>Después de que el planeta natal de los MONSTRUOS fuera destruido, los HUMANOS declararon victoria.{^35}{}" ],
      story4: [ '<24>Los MONSTRUOS restantes fueron expulsados a un puesto abandonado.{^35}{}' ],
      story5: [ '<24>Un poderoso campo de fuerza fue creado, y los MONSTRUOS fueron sellados dentro.{^35}{}' ],
      story6: [ '<24>Muchos años después.{^8}.{^8}.{^35}{}' ],
      story7: [ '<#24>     SECTOR EBOTT     \n         251X{^35}{}' ],
      story8: [ '<24>Leyendas hablan de un lugar del que las naves nunca vuelven.{^35}{}' ],
      story9: [ '<24>{^100}{}' ],
      story10: [ '<24>{^100}{}' ],
      story11: [ '<24>{^35}{}' ]
   },

   timeline: {
      main: 'Continuar Línea Temporal Canónica',
      main_ex: 'Empezar Línea Temporal Canónica',
      timelines: 'Otras Ranuras',
      bisect: 'Dividir',
      delete: 'Borrar',
      instruction: '[ESC] para Cancelar / [INTRO] para Confirmar',
      instruction_gamepad: 'Pulsa cualquier botón del mando para abrir el teclado.',
      launch: 'Iniciar',
      rename: 'Renombrar',
      create: 'Crear Nuevo',
      placeholder: 'Introduzca Nombre de la Línea Temporal',
      confirm: '¿Estás Seguro?'
   }
};


// END-TRANSLATE
