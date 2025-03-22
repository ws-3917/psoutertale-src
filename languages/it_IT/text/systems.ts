// START-TRANSLATE

export default {
    battle: {
        death0: ['(Fai un respiro profondo.)', "(Ti riempi di determinazione.)"],
        death1: ['Non puoi ancora arrenderti...', '$(name)!\nRimani determinato...'],
        death2: ['Il nostro destino dipende da te...', '$(name)!\nRimani determinato...'],
        death3: ["Andrà tutto bene!", '$(name)!\nRimani determinato...'],
        death4: ["Non perdere la speranza!", '$(name)!\nRimani determinato...'],
        death5: ['Non può finire ora!', '$(name)!\nRimani determinato...'],

        flee1: '    * Scappato...',
        flee2: "    * Vado via.",
        flee3: "    * Ho di meglio da fare.",
        flee4: "    * Non rallentarmi.",
        flee5: '    * Scappato con $(x) EXP\n      e $(y)ORO.',

        mercy_assist: '* Aiuto',
        mercy_flee: '* Scappa',
        mercy_spare: '* Risparmia',

        victory1: '<32>{#p/story}* HAI VINTO!\n* Hai ottenuto $(x) EXP and $(y)ORO.',
        victory2: '<32>{#p/story}* HAI VINTO!\n* Hai ottenuto $(x) EXP and $(y)ORO.\n* Il tuo LOVE è aumentato.'
    },

    developer: {
        console: {
            header: 'ERRORE',
            p_resume: {
                header: 'IGNORA',
                resume: 'Premi Per Ignorare'
            },
            blurb: 'Si è verificato un errore! Si prega di inviare\nuna foto allo sviluppatore.'
        },
        control: {
            tab: 'CONTROLLI',
            headers: ['GENERALE', 'BATTAGLIA'],
            items: [
                [
                    'AggiustaMusica',
                    'AggiustaGiocatore',
                    'OroInfinito',
                    'Interagisci',
                    'Input',
                    'Movimento',
                    'Noclip',
                    'Salva',
                    'SaltaTesto',
                    'CameraLibera'
                ],
                [
                    'AiutoDisponibile',
                    'SvuotaScatola',
                    'Esci',
                    'ResettaScatola',
                    'ResettaMenù',
                    'PuoScappare',
                    'HPInfiniti',
                    'TuttiPacifici',
                    'Suicidio',
                    'Indeboliscitutti'
                ]
            ],
            p_speed: {
                fps: '$(x) FPS',
                halt: 'Fermo',
                header: 'VELOCITÀ DI GIOCO',
                next: 'Più',
                prev: 'Meno',
                sec: '$(x)s/fotogramma'
            }
        },
        godhome: {
            tab: 'CASA DI DIO',
            p_teleport: {
                header: 'STANZA',
                action: 'Teletrasporto'
            },
            p_encounter: {
                header: 'INCONTRO',
                action: 'Avvia'
            },
            p_armor: {
                header: 'ARMAT'
            },
            p_weapon: {
                header: 'ARMA'
            }
        },
        inspect: {
            tab: 'ISPEZIONA',
            headers: ['LIVELLI', 'TIPI'],
            switches: [
                ['Base', 'Sotto', 'Principale', 'Sopra', 'Menù'],
                ['Hitbox', 'Sprite', 'Testo']
            ],
            p_explorer: {
                header: 'ESPLORA',
                layers: ['Base (Esplora)', 'Sotto (Esplora)', 'Principale (Esplora)', 'Sopra (Esplora)', 'Menù (Esplora)'],
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
            debug_instructions: 'Premi [TAB] per esplorare le informazioni di debug',
            debug: {
                a: 'A', 
                acceleration: 'Accelera',
                active: 'Attiva',
                alpha: 'Alfa',
                anchor: 'Ancora',
                b: 'B', 
                blend: 'Mischia',
                border: 'Bordo',
                compute: 'Dimensione Calcolata',
                content: 'Contenuto',
                crop: 'Raccolto',
                down: 'Giù',
                duration: 'Durata',
                exp: 'EXP',
                extent: 'Estendi',
                f: 'F', 
                face: 'Faccia',
                false: 'Falso',
                fill: 'Riempi',
                fontFamily: 'Famiglia del Font',
                fontSize: 'Grandezza del Font',
                frames: 'Fotogrammi',
                gravity: 'Gravità',
                group: 'Gruppo',
                hp: 'HP',
                index: 'Indice',
                inert: 'Inerte',
                key: 'Tasto',
                lastSavedTime: 'Ultimo Salvataggio',
                layer: 'Livello',
                layers: 'Livelli',
                left: 'Sinistra',
                metadata: 'Metadata',
                music: 'Musica',
                namespace: 'SpazioDelNome',
                none1: 'NESSUNO',
                none2: 'nessuno',
                objects: 'Oggetti',
                oversaver: 'Sovascrivere',
                parallax: 'Parallassi',
                position: 'Posizione',
                primed: 'Primerizzato',
                priority: 'Priorità',
                registry: 'REGISTRO',
                renderer: 'Renderizzazione',
                resources: 'Risorse',
                reverse: 'Inverti',
                right: 'Destra',
                room: 'Stanza',
                roomState: 'Stato Stanza',
                rotation: 'Rotazione',
                s: 'S', 
                scale: 'Scala',
                shopSelection: 'Selezione Negozio',
                size: 'Grandezza',
                spacing: 'Spaziamento',
                spin: 'Giro',
                sprites: 'Sprites',
                step: 'Passo',
                stroke: 'Colpo',
                subcrop: 'SottoRaccolto',
                talk: 'Parla',
                target: 'Obbiettivo',
                text: 'Testo',
                time: 'Tempo',
                tint: 'Tinta',
                trackedAssets: 'Risorse Monitorate',
                true: 'Vero',
                unknown: 'SCONOSCIUTO',
                up: 'Sù',
                vars: 'Vars',
                velocity: 'Velocità',
                volatile: 'Volatile'
            }
        },
        savemod: {
            tab: 'SALVAMOD',
            header1: 'MODIFICA SALVATAGGIO',
            domains: [
                'Dati (Booleani)',
                'Dati (Numeri)',
                'Dati (Stringhe)',
                'Flags (Booleani)',
                'Flags (Numeri)',
                'Flags (Stringhe)'
            ],
            p_page: {
                header: 'NAVIGAZIONE',
                prev: 'Prec',
                next: 'Pros'
            },
            prompt: 'Inserisci Valore',
            back: 'Indietro'
        },
        storage: {
            tab: 'MAGAZZINO',
            header: 'MODIFICA MAGAZZINO',
            p_container: { header: 'SELEZIONA', prev: 'Prec', next: 'Pros' },
            display: { inventory: 'Inventario', dimboxA: 'Scat. Dim. A', dimboxB: 'Scat. Dim. B' }
        }
    },

    dialog: {
        dialog_clear_title: 'Ripristina File',
        dialog_notice_title: 'Avviso',
        dialog_clear_mobile: 'Ripristina Impostazioni del Telefono',
        dialog_open: { buttonLabel: 'Apri', name: 'File di SALVATAGGIO', title: 'Apri File' },
        dialog_save: { buttonLabel: 'Salva', name: 'File di SALVATAGGIO', title: 'Salva File' },
        error_load: 'Impossibile analizzare il file.',
        message_alert: ['OK'],
        message_confirm: ['Cancella', 'OK'],
        prompt_clear: 'Cancellare questo file?',
        prompt_demo: 'Il tuo file di SALVATAGGIO\ndella demo di OUTERTALE è stato\nspostato in un\'altra timeline.',
        prompt_save: 'Salvare questo file?',
        prompt_clear_mobile: 'Ripristina le impostazioni del telefono?\nQuesto non ripristinerà\nil tuo file di SALVATAGGIO',
        prompt_save_alternate: 'Copia il testo sotto in\nun file JSON per salvarlo\nnel tuo dispositivo.',
        prompt_open: 'Cariare questo file?'
    },

    extra: {
        credits: [
            [
                '§fill=#ff0§< SVILUPPATORE >§fill=#fff§',
                'spacey_432',
                '',
                '§fill=#ff0§< SCRITTORI >§fill=#fff§',
                'Aster',
                'Balgamlı Kedi',
                'Bilge \"mnwary\"',
                'Dischnie',
                'Efe Kaya',
                'Ghostly',
                'InvincibleRacoon',
                'Jojoton56',
                'Kiwi \"Quinn\"',
                'neo9174',
                'Rise'
            ],
            [
                '§fill=#ff0§< SCRITTORI >§fill=#fff§',
                'ThatGuyWhoLikesFood',
                'Turbulation',
                'Zaxento The Greed',
                '',
                '§fill=#ff0§< ARTISTI >§fill=#fff§',
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
                '§fill=#ff0§< ARTISTI >§fill=#fff§',
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
                '§fill=#ff0§< ARTISTI >§fill=#fff§',
                'supper12',
                'Valor52',
                'Zaxento The Greed',
                '',
                '§fill=#ff0§< TECNICI >§fill=#fff§',
                'Codetoil',
                'ryi3r',
                'ws3917',
                '',
                '§fill=#ff0§< TESTER >§fill=#fff§',
                'Alden',
                'Aspey',
                'Aster',
                'Balgamlı Kedi'
            ],
            [
                '§fill=#ff0§< TESTER >§fill=#fff§',
                'Bilge \"mnwary\"',
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
                '§fill=#ff0§< TESTER >§fill=#fff§',
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
                '§fill=#ff0§< TESTER >§fill=#fff§',
                'Kiwi \"Quinn\"',
                'lil tanski',
                'MR. PETER',
                'MSBen',
                'Murder--Sans_MDR',
                'Nanorasmus',
                'neo9174',
                'NepAnime',
                'semi',
                'Shaun Duz Stuffs',
                'SHCyank',
                'NerNot1',
                'petar3644',
                'PixelToons Jaafar'
            ],
            [
                '§fill=#ff0§< TESTER >§fill=#fff§',
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
                'superkippy',
                'Teecup'
            ],
            [
                '§fill=#ff0§< TESTER >§fill=#fff§',
                'Tem in a Cowboy Hat',
                'Tenbrooks',
                'ThatGuyWhoLikesFood',
                'The Fallen Angel',
                'TheAsriel',
                'Turbulation',
                'Wild Pasta',
                'Xiao_Akatsuki',
                'xNoodlePlayz',
                'Zaxento The Greed'
            ],
            [
                '§fill=#ff0§< RINGRAZIAMENTI SPECIALI >§fill=#fff§',
                'Alden',
                '§fill=#808080§Per essere stato lì per me quando\navevo bisogno di qualcuno su cui contare\ne per avermi insegnato lezioni di vita che\nmi hanno reso una persona migliore.§fill=#fff§'
            ],
            [
                '§fill=#ff0§< RINGRAZIAMENTI SPECIALI >§fill=#fff§',
                'Aster',
                '§fill=#808080§Per essere una delle persone più amichevoli\nche conosco, la prima persona\na credere nella mia visione e\nper avermi ispirato a finire il gioco.§fill=#fff§'
            ],
            [
                '§fill=#ff0§< RINGRAZIAMENTI SPECIALI >§fill=#fff§',
                'Balgamlı Kedi',
                "§fill=#808080§Per essere rimasto con me in ogni\nfase dello sviluppo, fin dall'inizio.\nIndipendentemente dall'epoca,\nè sempre stato lì per aiutare.§fill=#fff§"
            ],
            [
                '§fill=#ff0§< RINGRAZIAMENTI SPECIALI >§fill=#fff§',
                'Ghostly',
                '§fill=#808080§Per essere stato la voce della ragione quando\nsi tratta di molti aspetti del\ngioco e per avermi incoraggiato a\nprendere sul serio il testing del gioco.§fill=#fff§'
            ],
            [
                '§fill=#ff0§< RINGRAZIAMENTI SPECIALI >§fill=#fff§',
                'Zaxento The Greed',
                '§fill=#808080§Per essere stato affidabile, brutalmente\nonesto, per avermi dato molte\ncritiche e idee e per essere stato\ndegno di fiducia dal giorno in cui ci siamo incontrati.§fill=#fff§'
            ],
            [
                '§fill=#ff0§< RINGRAZIAMENTI SPECIALI >§fill=#fff§',
                'ThatGuyWhoLikesFood',
                '§fill=#808080§Per avermi aiutato a scrivere parti\ncruciali del gioco, supportando la mia\nvisione e aiutandomi a esprimermi\nin un modo completamente nuovo.§fill=#fff§'
            ],
            [
                '§fill=#ff0§< RINGRAZIAMENTI SPECIALI >§fill=#fff§',
                'Bilge \"mnwary\"',
                "§fill=#808080§Per essere stato d'aiuto verso\nla fine dello sviluppo e\nper aver fatto in modo che la scrittura\ndel gioco raggiungesse il suo pieno potenziale. §fill=#fff§"
            ],
            ['Crediti offerti da §fill=#ff0§The Mavis & Co.§fill=#fff§']
        ],

        final_frontier: {
            header: '(( CAST ))',
            opponents: {
                froggit: {
                    name: 'FROGGIT',
                    author: 'ScarletScaledDragon',
                    text: {
                        basic: 'Riflettendo\nsulla Vita',
                        spare: 'Rana\nProfessionista',
                        flirt: 'Riflettendo\nsull\'amore',
                        bully: 'Saltellando via\nterrorizzato'
                    }
                },
                whimsun: {
                    name: 'FLUTTERLYTE',
                    author: 'ScarletScaledDragon',
                    text: {
                        basic: 'Imparando a\nVolare',
                        spare: 'Aviatore\nIncoraggiato',
                        flirt: 'Esplorando i\ncieli',
                        bully: 'Volando\nElusivamente'
                    }
                },
                moldsmal: {
                    name: 'GELATINI',
                    author: 'spacey_432',
                    text: {
                        basic: 'Trovato una nuova\nStazione Spaziale',
                        spare: 'Ballerino\ndi riserva',
                        flirt: 'Ballerino Esotico\ndi Gelatina',
                        bully: 'Trovato una nuova\nGalassia'
                    }
                },
                loox: {
                    name: 'OCULOUX',
                    author: 'ScarletScaledDragon',
                    text: {
                        basic: 'Leggermente\nAncora un bullo',
                        spare: 'Bullo\nRiveduto',
                        flirt: 'Leggermente\nFlirtante',
                        bully: ''
                    }
                },
                migosp: {
                    name: 'SILENTE',
                    author: 'ScarletScaledDragon',
                    text: {
                        basic: 'Exceedingly\nAgreeable',
                        spare: 'Casually\nEnjoys Life',
                        flirt: 'In Love From\nAfar',
                        bully: 'Endangerment\nDenier'
                    }
                },
                mushy: {
                    name: 'MUSHY',
                    author: 'Balgamlı Kedi & ScarletScaledDragon',
                    text: {
                        basic: 'Shooting\nBlanks',
                        spare: 'Quick-Draw\nMagician',
                        flirt: 'Gunshot\nHeart-Throb',
                        bully: 'Spraying And\nPraying'
                    }
                },
                finalghost: {
                    name: 'LURKSALOT',
                    author: 'spacey_432',
                    text: {
                        basic: 'Keeping To\nThemselves',
                        spare: 'Seeking\nPhysical Contact',
                        flirt: 'Stoically\nUninvolved',
                        bully: ''
                    }
                },
                stardrake: {
                    name: 'STARDRAKE',
                    author: 'Burge',
                    text: {
                        basic: 'Still Looking\nFor Laughs',
                        spare: 'Semi-Successful\nComedian',
                        flirt: 'Popular With The\nGrown-Ups',
                        bully: ''
                    }
                },
                chilldrake: {
                    name: 'CHILLDRAKE',
                    author: 'Burge',
                    text: {
                        basic: 'Still Looking\nFor Supporters',
                        spare: 'Gained A Cult\nFollowing',
                        flirt: 'Trades Kisses\nFor Supporters',
                        bully: 'Anti-Bullying\nActivist'
                    }
                },
                spacetop: {
                    name: 'ASTRO SERF',
                    author: 'DESM.al',
                    text: {
                        basic: 'Thinking About\nIts Antenna',
                        spare: 'Radio Station\nSensation',
                        flirt: 'Love Is On\nThe Air',
                        bully: 'Emergency\nBroadcaster'
                    }
                },
                jerry: {
                    name: 'JERRY',
                    author: 'Discarded Vessel',
                    text: {
                        basic: 'Getting Ditched\nOn The Daily',
                        spare: 'Getting Ditched\nSlightly Less',
                        flirt: 'On The Road To\nRedemption',
                        bully: ''
                    }
                },
                mouse: {
                    name: 'WHIZKARAT',
                    author: 'Zaxento The Greedy & semi',
                    text: {
                        basic: 'Having An\nIdentity Crisis',
                        spare: 'Newest Member Of\nMouse Society',
                        flirt: 'Getting Frisky\nWith The Mice',
                        bully: 'Scurried Back To\nCat Society'
                    }
                },
                doggo: {
                    name: 'DOGGO',
                    author: 'Discarded Vessel',
                    text: {
                        basic: 'Believes In The\nAlmighty Wrench',
                        spare: 'Found His Own\nSeeing-Eye Wolf',
                        flirt: 'In Love With His\nSeeing-Eye Wolf',
                        bully: 'Running To His\nSeeing-Eye Wolf'
                    }
                },
                lesserdog: {
                    name: 'CANIS MINOR',
                    author: 'major_memestar',
                    text: {
                        basic: 'Searching For\nAffection',
                        spare: 'Found A Loving\nOwner',
                        flirt: 'Found An Owning\nLover',
                        bully: 'Desperate For\nAffection'
                    }
                },
                dogs: {
                    name: 'DOGAMY & DOGARESSA',
                    author: 'major_memestar',
                    text: {
                        basic: 'Still Thinking\nAbout Fetch',
                        spare: 'Reigning Puppy-Dog\nEyes Champions',
                        flirt: "Caught In Each-\nOther's Gaze",
                        bully: 'Defensive Puppy-\nDog Eyes Engaged'
                    }
                },
                greatdog: {
                    name: 'CANIS MAJOR',
                    author: 'major_memestar',
                    text: {
                        basic: "Unaware Of\nLife's Changes",
                        spare: "Excited By\nLife's Changes",
                        flirt: "Touched By\nLife's Changes",
                        bully: ''
                    }
                },
                woshua: {
                    name: 'SKRUBBINGTON',
                    author: 'Discarded Vessel',
                    text: {
                        basic: 'Only 99.1\nPercent Clean',
                        spare: 'Power-Washing\nPowerhouse',
                        flirt: 'Hot Tub\nManufacturer',
                        bully: 'Overpowered\nPressure Washer'
                    }
                },
                moldbygg: {
                    name: 'GELATA',
                    author: 'spacey_432',
                    text: {
                        basic: 'Looking For A\nBaby Sitter',
                        spare: 'Slime-Powered\nBarstool',
                        flirt: 'Sexy Sitcom\nRegular',
                        bully: 'Glorified\nWrestling Prop'
                    }
                },
                radtile: {
                    name: 'RADTILE',
                    author: 'Balgamlı Kedi & Zaxento The Greedy',
                    text: {
                        basic: 'Wallowing In\nImperfection',
                        spare: 'Improving His\nSelf-Image',
                        flirt: 'Dating His Own\nReflection',
                        bully: 'Headed For An\nUgly Future'
                    }
                },
                shyren: {
                    name: 'SHYREN',
                    author: 'Ghostly',
                    text: {
                        basic: 'Back To Taking\nPiano Lessons',
                        spare: "Mettaton's\nNew Lead Singer",
                        flirt: 'In Love With\nA Ghost',
                        bully: "Can't Sing Without\nA Synthesizer"
                    }
                },
                doge: {
                    name: 'DOGE',
                    author: 'major_memestar',
                    text: {
                        basic: 'Construction Site\nDrill Sergeant',
                        spare: 'Bought A Lifetime\nSpa Subscription',
                        flirt: 'Felt Puppy Love\nFor The First Time',
                        bully: ''
                    }
                },
                muffet: {
                    name: 'MUFFET',
                    author: 'major_memestar',
                    text: {
                        basic: 'Looking For Her\nNext Payout',
                        spare: 'Caring For The\nSpider Clans',
                        flirt: 'Picnic Date\nMatchmaker',
                        bully: ''
                    }
                },
                pyrope: {
                    name: 'HOTWIRE',
                    author: 'semi',
                    text: {
                        basic: 'Waiting For The\nBeat To Drop',
                        spare: 'Lightning-Fast\nRapper',
                        flirt: 'Rapper Turned\nLove Song Writer',
                        bully: 'Rap Battling To\nThe Near-Death'
                    }
                },
                tsundere: {
                    name: 'TSUNDERIDEX',
                    author: 'spacey_432',
                    text: {
                        basic: 'Flying Deeper\nInto Denial',
                        spare: 'Sneaking Up On\nYou At Warp Speed',
                        flirt: 'Tsun To Be\nYour Dere-Dere',
                        bully: 'Finally Met\nIts Match'
                    }
                },
                perigee: {
                    name: 'PERIGEE',
                    author: 'Discarded Vessel',
                    text: {
                        basic: 'Another Day,\nAnother Conflict',
                        spare: 'Interplanetary\nAmbassador',
                        flirt: 'Encouraging Love\nIn Others',
                        bully: 'Showing Kindness\nThrough The Pain'
                    }
                },
                rg: {
                    name: 'RG 03 & RG 04',
                    author: 'semi',
                    text: {
                        basic: 'In Search Of\nChildhood Friends',
                        spare: 'Use Your\nImagination',
                        flirt: 'Please Use Your\nImagination',
                        bully: 'Royal Guard\nRetirees'
                    }
                },
                glyde: {
                    name: 'GLYDE',
                    author: 'Burge',
                    text: {
                        basic: 'Not Your Ideal\nBusiness Partner',
                        spare: 'A Little Less\nShady Than Usual',
                        flirt: 'Not Your Ideal\nBedfellow',
                        bully: ''
                    }
                },
                burgie: {
                    name: 'BURGERPANTS',
                    author: 'Pongy25',
                    text: {
                        basic: 'Running Hastily\nAt The Life Ahead',
                        spare: 'Looking Forward\nTo The Life Ahead',
                        flirt: 'Finding Love\nIn The Life Ahead',
                        bully: ''
                    }
                },
                madjick: {
                    name: 'COZMO',
                    author: 'semi',
                    text: {
                        basic: 'Looking For A\nDictionary',
                        spare: 'Famous\nMagician',
                        flirt: 'Found A New Kind\nOf Magic',
                        bully: ''
                    }
                },
                knightknight: {
                    name: 'TERRESTRIA',
                    author: 'major_memestar',
                    text: {
                        basic: 'In Search Of\nThe Past',
                        spare: 'Renowned\nHistorian',
                        flirt: 'Has A Crush On\nThe Homeworld',
                        bully: ''
                    }
                },
                froggitex: {
                    name: 'FINAL FROGGIT',
                    author: 'PoTheWinterCorder',
                    text: {
                        basic: 'Keeping Its\nWisdom To Itself',
                        spare: 'Sharing Its\nWisdom Openly',
                        flirt: 'Using Its Wisdom\nFor Love',
                        bully: 'Using Its Wisdom\nFor Survival'
                    }
                },
                whimsalot: {
                    name: 'FLUTTERKNYTE',
                    author: 'spacey_432',
                    text: {
                        basic: 'Still Working\nEvery Day',
                        spare: 'Finally Took\nA Break',
                        flirt: 'Looking For Some\nPrivate Time',
                        bully: 'Working Harder\nOut Of Fear'
                    }
                },
                astigmatism: {
                    name: 'EYEWALKER PRIME',
                    author: 'semi',
                    text: {
                        basic: 'Still A\nBig Bully',
                        spare: 'Domineering\nEye Doctor',
                        flirt: 'Domineering\nLeather Tailor',
                        bully: 'Overthrown By\nAn Oculoux'
                    }
                },
                migospel: {
                    name: 'SILENCIO',
                    author: 'Balgamlı Kedi',
                    text: {
                        basic: 'Still A\nShameless Coward',
                        spare: 'A Little Less Of\nA Coward',
                        flirt: 'In Love With\nIts Fear',
                        bully: 'Running Faster\nThan Ever Before'
                    }
                },
                mushketeer: {
                    name: 'MUSHKETEER',
                    author: 'Balgamlı Kedi & Ghostly',
                    text: {
                        basic: 'One Mushroom\nArmy',
                        spare: 'Hardened Warrior\nSeeking Peace',
                        flirt: 'Defeated By The\nPower Of Love',
                        bully: 'Scared\nStraight'
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

        langPrompt: '[↑ or ↓] to Select / [Z or ENTER] to Confirm',
        epilepsyInfo:
            'To whom it may concern,\n\nThis game contains §fill=#ff0§flashing images§fill=#fff§\nwhich may be reduced via the\n§fill=#ff0§settings menu§fill=#fff§.\n\n',
        epilepsyKeys: '§fill=#808080§Press [Z or ENTER] to Continue',

        quitText1: 'Quitting',
        quitText2: 'Quitting.',
        quitText3: 'Quitting..',

        real1: [
            [
                'Thank you for playing Outertale.',
                'Working on this project has been an honor,',
                'and a pleasure on my part.'
            ],
            ['When I started this journey, I never', "thought I'd get this far, but here we", 'are anyway, at the end.'],
            [
                'For me, UNDERTALE was a life-changing',
                'experience, and one that was very hard to',
                'let go of after I first played it.'
            ],
            [
                'So, with OUTERTALE, I wanted to give you',
                'another chance to exist in a world like it,',
                'as if it were your first time.'
            ],
            [
                "I hope I've given you that chance.",
                "I hope you've come away satisfied with",
                "the time you've spent in this world."
            ],
            [
                "No matter what you've done in your life,",
                'your actions here speak volumes about the',
                'kind of person you really are.'
            ],
            [
                "It's because of you that you got the ending",
                'you did, and nothing can take that',
                'experience away from you.'
            ],
            ['Despite your mistakes... you are awesome,', 'and you deserve love and attention.', 'Remember that, okay?']
        ],
        real2: 'Take care of yourself, \"$(x).\"',

        end1: 'FINE',
        end2: 'FINE...?',

        restartText1: 'Riavvio',
        restartText2: 'Riavvio.',
        restartText3: 'Riavvio..',

        title: 'OUTERTALE',
        title_timeline: 'OUTERTALE...?'
    },

    gamepad: {
        prompt: 'GAMEPAD SETUP',
        prompt_desc:
            'Use an input on your gamepad to assign\nit to the in-game action.\n\nUse the input again to confirm, or use\nother inputs to assign those as well.\n\nPress ESC to skip setup.',
        prompt_counter: 'Inputs Assigned: $(x)',
        z: '[Z o INVIO] - Conferma',
        x: '[X o SHIFT] - Cancella',
        c: '[C o CTRL] - Menù (In gioco)',
        u: '[SÙ o W] - Sù',
        l: '[SINISTRA or A] - Sinistra',
        d: '[GIÙ o S] - Giù',
        r: '[DESTRA o D] - Destra',
        f: '[F4] - Schermo Intero',
        prompt_done: 'Setup complete.\nPress any button to continue.',
        prompt_done_browser: '\nNote: On this platform, the gamepad may\nnot always be able to enter fullscreen.',
        prompt_load:
            'A gamepad has already been set up.\nPress any button to continue, or press\nany button three times in rapid\nsuccession to restart setup.\n\nPress ESC to skip setup.'
    },

    general: {
        asriel: 'Asriel',
        asriel_location: 'L\'Oblio',
        disabled: 'DISATTIVATO',
        enabled: 'ATTIVATO',
        finish: 'Premi [X] per Finire',
        frisk: 'Frisk',
        g: 'ORO',
        hp: 'HP',
        inf: '\u221e',
        landing1: '[PREMI Z O INVIO]',
        lv: 'LV',
        mystery1: '§mystify=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz§aaaaaa§mystify=§',
        mystery2: '{@mystify=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz}aaaaaa{@mystify=}',
        mystery2l: '{@mystify=abcdefghijklmnopqrstuvwxyz}aaaaaa{@mystify=}',
        mystery2u: '{@mystify=ABCDEFGHIJKLMNOPQRSTUVWXYZ}aaaaaa{@mystify=}',
        no: 'No',
        nominal: '§fill=#0f0§NOMINALE',
        percent: '$(x)%',
        player: 'giocatore',
        settings: 'Impostazioni',
        shopg: 'ORO',
        unknown: '?',
        xm: 'ME',
        yes: 'Sì'
    },

    menu: {
        box1: 'INVENTARIO',
        box2: 'SCATOLA',
        key1: 'PORTACHIAVI',

        confirm1: 'Va bene questo nome?',
        confirm2: 'Un nome è già\nstato scelto.',
        confirm3: 'Indietro',

        footer: 'OUTERTALE V5.05 (c) 2025 SPACEY_432',

        heal1: '* (HP ripristinati.)',
        heal2: '* (Hai recuperato $(x) HP.)',
        heal3: '* (Hai perso $(x) HP.)',
        heal4: '* (HP azzerati.)',
        heal5: '* (Hai guadagnato $(x) HP.)',

        item1: 'USA',
        item2: 'EQUIPPAGGIA',
        item3: 'INFO',
        item4: 'BUTTA',

        load1: 'Continua',
        load2: 'Osserva',
        load3: 'Reset',
        load4: 'Il Vero Reset',

        name1: 'Nome del umano alla deriva.',
        name2: 'Esci',
        name3: 'Backspace',
        name4: 'Fatto',
        name5: '§fill=#808080§ [ESC] - Esci / [INVIO] - Fatto',

        save1: 'Salva',
        save2: 'Indietro',
        save3: 'File salvato.',

        settings1: 'IMPOSTAZIONI',
        settings2: 'ESCI',
        settingsprompt1: '-> LINGUA & MUSICA',
        settings3: 'LINGUA',
        settings3a: 'ITALIANO',
        settings4: 'EFFETTI SONORI',
        settings5: 'MUSICA',
        settings6: 'GRAFICHE AVANZATE',
        settingsprompt2: '-> GIOCO & GRAFICA',
        settings6a: 'CHARACTER RUNNING',
        settings6b: 'COLORED SPRITES',
        settings7: 'FLASHING IMAGERY',
        settings7a: 'NORMAL',
        settings7b: 'REDUCED',
        settings8: 'MOBILE SETTINGS',
        settings9: 'DEADZONE',
        settings10: 'OPEN MOD FOLDER',
        settings11: 'RESTART',
        border: {
            option: 'GAME BORDER',
            list: [
                'NESSUNO',
                'DYNAMIC',
                'SIMPLE',
                'STAR',
                'OUTLANDS',
                'OUTLANDS (BATTLE)',
                'TORIEL HOME',
                'STARTON',
                'STARTON (BATTLE)',
                'FOUNDRY',
                'FOUNDRY (BATTLE)',
                'AERIALIS',
                'AERIALIS (BATTLE)',
                'REC CENTER',
                'REC CENTER (BATTLE)',
                'CORE',
                "CORE (BATTLE)",
                'CITADEL',
                'ASGORE HOME',
                'ARCHIVE SIX',
                'ASRIEL BATTLE',
                'BRIGHT GALAXY',
                'NEW WORLD',
                'NEW WORLD (WITH CUP)',
                '§fill=#808080§(LOCKED)'
            ]
        },
        mobile: {
            title: 'MOBILE CTRLS',
            controlOpacity: 'CONTROL OPACITY',
            controlType: 'CONTROL TYPE',
            enableDiagonal: 'ARROW KEY LAYOUT',
            enableSingleArrow: 'INDIV. DIRECT. KEY',

            fourKey: '\u4dc8 4-KEY',
            eightKey: '\u4dc9 8-KEY',
            deadZone: 'DEADZONE',
            toleranceAngle: 'TOLERANCE ANGLE',

            loadDefault: 'LOAD DEFAULT CONFIG',
            enableMultiConfig: 'ENABLE QUICK SWITCHING',
            invertButtonPos: 'INVERT BUTTON POSITION',

            prompt1: '--- SELECT PROFILE ---',
            prompt2: '--- GENERAL SETTINGS ---',
            prompt3: '--- CONTROL SETTINGS ---',
            prompt4: '--- MODIFY BUTTONS ---',

            nextpage: 'NEXT PAGE >',
            prepage: '< PREVIOUS PAGE',

            ZKey: '[Z]',
            XKey: '[X]',
            CKey: '[C]',
            arrowKeys: '[←↑→↓]',
            diagarrowKeys: '[↖↗↘↙]',
            LKey: '[←]',
            UKey: '[↑]',
            RKey: '[→]',
            DKey: '[↓]',
            LUKey: '[↖]',
            RUKey: '[↗]',
            RDKey: '[↘]',
            LDKey: '[↙]',

            ShowFullScrKey: 'SHOW FULLSCREEN BUTTON',

            xPos: 'CENTER X POSITION',
            yPos: 'CENTER Y POSITION',
            size: 'BUTTON SIZE',
            radius: 'CIRCLE RADIUS',

            keysettings: 'BUTTON CUSTOMIZE',
            keyprompt0: '§fill=#ffd700§>> §fill=#fff§EDITING: §fill=#00ffff§$(x) §fill=#808080§(Press [R] to reset)',
            keyprompt1: '§fill=#fff§PROGRESS: §fill=#00ffff§($(x)§fill=#fff§/§fill=#00ffff§3)',
            keyprompt1a: ' [1] Initial Button Placement',
            keyprompt1b: ' [2] Position Fine-tuning',
            keyprompt1c: ' [3] Button Size Adjustment',
            keyprompt1d:
                '§fill=#00ff00§*** Button Position Setup\n§fill=#fff§Press [L] (at the top-left corner) \nto start',
            keyprompt1e: '§fill=#00ff00§*** Setup Complete \n§fill=#fff§Now you can set up\nother buttons',
            keyprompt2: '§fill=#4169e1§--- ISTRUZIONI ---',
            keyprompt2a:
                '§fill=#fff§* Drag §fill=#00ffff§$(x)§fill=#fff§ to set initial position\n§fill=#ffd700§* Press [L] §fill=#808080§to confirm placement\n§fill=#ffd700§* Press [R] §fill=#808080§to recover if button is lost\n§fill=#808080§Position can be adjusted in the next step',
            keyprompt2b:
                '§fill=#fff§* Use §fill=#ffd700§[UP/DOWN/LEFT/RIGHT]§fill=#fff§ for precise adjustments\n§fill=#ffd700§* Press [R] §fill=#808080§to restore previous position\n§fill=#808080§Reference coordinates displayed below\n§fill=#ffd700§* Press [L] §fill=#808080§to confirm',
            keyprompt2c:
                '§fill=#fff§* Adjust with §fill=#ffd700§[-5] [-1] [+1] [+5]§fill=#fff§ to set size\n§fill=#ffd700§* Press [R] §fill=#808080§to restore default size\n§fill=#808080§Current size value shown below\n§fill=#ffd700§* Press [L] §fill=#808080§to confirm',
            keyprompt3a: '§fill=#4169e1§-> §fill=#fff§POSITION: \n§fill=#00ffff§X=$(x), Y=$(y)',
            keyprompt3b: '§fill=#4169e1§-> §fill=#fff§SIZE: §fill=#00ffff§$(x)',

            helper_loadDefault:
                '§fill=#ff0§Press [Z]§fill=#808080§ to reset your settings to default.\nThis will discard any custom configurations\nyou currently have and restore the original settings.',
            helper_enableMultiConfig:
                '§fill=#ff0§Press [Z]§fill=#808080§ to show/hide the configuration buttons.\nIf enabled, five number buttons ([0] - [4]) will display on the left side of the screen.\n§fill=#fff§These buttons allow you to quickly switch between different configuration options.§fill=#fff§',
            helper_controlType:
                '§fill=#ff0§Press [Z]§fill=#808080§ to switch between two control options:\n§fill=#ff0§1. Directional Buttons§fill=#808080§: Traditional arrow keys\n§fill=#ff0§2. Virtual Joystick§fill=#808080§: Touch-screen friendly control',
            helper_controlOpacity:
                '§fill=#ff0§Use LEFT or RIGHT arrows§fill=#808080§ to adjust button transparency.\nHigher values make buttons more visible, lower values make them more transparent.',
            helper_enableDiagnal:
                '§fill=#ff0§Press [Z]§fill=#808080§ to toggle diagonal movement.\nWhen enabled, holding an arrow key will show\n§fill=#ff0§two additional arrows§fill=#808080§ for diagonal movement.',
            helper_deadZone:
                "§fill=#ff0§Use LEFT or RIGHT arrows§fill=#808080§ to adjust joystick sensitivity.\n§fill=#fff§The dead zone is the center area where joystick movement isn't detected§fill=#808080§.\nLarger dead zone = less sensitive controls.",
            helper_toleranceAngle:
                '§fill=#ff0§Use LEFT or RIGHT arrows§fill=#808080§ to adjust joystick angle sensitivity.\n§fill=#fff§This determines how precise your movements need to be§fill=#808080§.\nAngles over 45° will trigger diagonal movement.',
            helper_showFullScrKey:
                '§fill=#ff0§Press [Z]§fill=#808080§ to toggle the visibility of the\n§fill=#fff§Fullscreen button§fill=#808080§.',
            helper_modifyButtons:
                '§fill=#ff0§Press [Z]§fill=#808080§ to customize button layout.\nYou can adjust both the §fill=#ff0§size and position§fill=#808080§ of all buttons.\nA step-by-step guide will help you through the process.',
            helper_singleArrow:
                '§fill=#ff0§Press [Z]§fill=#808080§ to enable or disable individual directional key settings.\nWhen enabled, you can §fill=#fff§independently set the position \nand size of each directional key§fill=#808080§ for greater flexibility.',
            helper_invertButtonPos:
                '§fill=#ff0§Press [Z]§fill=#808080§ to toggle the §fill=#fff§Invert Button Position§fill=#808080§ feature.\nWhen enabled, the layout of virtual navigation buttons will be mirrored left-to-right for better accessibility or personal preference.'
        },

        sidebar1: 'OGGETTI',
        sidebar2: 'STAT',
        sidebar3: 'CELL',
        sidebar4: 'CONF',
        sidebar5: 'S',

        start1: [
            '--- Istruzioni ---',
            '[Z o INVIO] - Conferma',
            '[X o SHIFT] - Cancella',
            '[C o CTRL] - Menù (In gioco)',
            '[F4] - Schermo Intero',
            '[Tieni ESC] - Riavvia',
            'Quando i tuoi HP scendono a 0, perdi.'
        ],
        start2: 'Gioca',

        stat1: 'AT',
        stat2: 'DF',
        stat3: 'ARMA',
        stat4: 'ARMAT',
        stat5: 'ORO',
        stat6: 'EXP',
        stat7: 'PROS',
        stat8: '§fill=#ff0§Attenzione:\nTimeline\nnon canon.',
        stat9: 'UCCISIONI',
        stat10: 'BULLIZZATI',
        stat11: 'CORTEGGIATI',
        stat12: 'STATO',
        stat13: '\"$(x)\"',

        story1: ['<24>{#p/storyteller}Tanto tempo fa, due specie regnavano sul sistema solare: UMANI e MOSTRI.{^35}{}'],
        story2: ['<24>Col passare del tempo, una guerra scoppio tra le due specie.{^35}{}'],
        story3: ["<24>Dopo che il pianeta natale dei MOSTRI venne distrutto, gli UMANI ne uscirono vincitori.{^35}{}"],
        story4: ['<24>I MOSTRI rimanenti vennero banditi in un avamposto abbandonato.{^35}{}'],
        story5: ['<24>Un potente campo di forza fu eretto, e i MOSTRI ne furono sigillati all\'interno.{^35}{}'],
        story6: ['<24>Molti anni dopo.{^8}.{^8}.{^35}{}'],
        story7: ['<#24>     SETTORE EBOTT     \n         251X{^35}{}'],
        story8: ['<24>Le leggende narrano di un posto da cui le astronavi non fanno ritorno.{^35}{}'],
        story9: ['<24>{^100}{}'],
        story10: ['<24>{^100}{}'],
        story11: ['<24>{^35}{}']
    },

    timeline: {
        main: 'Riprendi Timeline Canonica',
        main_ex: 'Inizia Timeline Canonica',
        timelines: 'Altri Slot',
        bisect: 'Dividi',
        delete: 'Cancella',
        instruction: '[ESC] per Tornare Indietro / [ENTER] per Confermare',
        instruction_gamepad: 'Premi un qualsiasi pulsante per aprire la tastiera.',
        launch: 'Avvia',
        rename: 'Rinomina',
        create: 'Crea Nuovo',
        placeholder: 'Inserisci nome della Timeline',
        confirm: 'Sei Sicuro?'
    }
};


// END-TRANSLATE
