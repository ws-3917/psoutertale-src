// START-TRANSLATE

export default {
    battle: {
        death0: ['(Veszel egy mély lélegzetet.)', "(El vagy telve elszántsággal.)"],
        death1: ['Nem adhatod fel épp most...', '$(name)!\nMaradj elszánt...'],
        death2: ['A sorsunk a Te kezedven van...', '$(name)!\nMaradj elszánt...'],
        death3: ["Minden rendben lesz!", '$(name)!\nMaradj elszánt...'],
        death4: ["Ne veszítsd el a reményt!", '$(name)!\nMaradj elszánt...'],
        death5: ['Ez nem végződhet most!', '$(name)!\nMaradj elszánt...'],

        flee1: '    * Megszökve...',
        flee2: "    * Eltűntem innen.",
        flee3: "    * Van jobb dolgom.",
        flee4: "    * Ne lassíts le.",
        flee5: '    * Megszökve $(x) TP-vel\n\n      és $(y)A-val.',

        mercy_assist: '* Segítség',
        mercy_flee: '* Szökés',
        mercy_spare: '* Kímélet',

        victory1: '<32>{#p/story}* GYŐZTÉL!\n* Elnyertél $(x) TP-t és $(y)A-t.',
        victory2: '<32>{#p/story}* GYŐZTÉL!\n\n* Elnyertél $(x) TP-t és $(y)A-t.\n\n* A SZERETETED emelkedett.'
    },

    developer: {
        console: {
            header: 'HIBA',
            p_resume: {
                header: 'ELUTASÍT',
                resume: 'Kattints az elutasításhoz'
            },
            blurb: 'Hiba lépett fel! Kérlek küldj\nképernyőképet a fejlesztőnek.'
        },
        control: {
            tab: 'IRÁNYÍTÁS',
            headers: ['ÁLTALÁNOS', 'HARC'],
            items: [
                [
                    'ZeneFix',
                    'JátékosFix',
                    'VégtelenA',
                    'Használ',
                    'Bevitel',
                    'Irányítás',
                    'ÜtközésKi',
                    'Mentés',
                    'SzövegÁtugrás',
                    'SzabadKamera'
                ],
                [
                    'KépesSegíteni',
                    'DobozÜrítése',
                    'Kilépés',
                    'DobozVisszaállítása',
                    'MenüVisszaállítása',
                    'KépesMegszökni',
                    'VégtelenÉP',
                    'MindentNyugtat',
                    'Öngyilok',
                    'MindentMeggyengít'
                ]
            ],
            p_speed: {
                fps: '$(x) FPS',
                halt: 'Állj',
                header: 'JÁTÉK SEBESSÉG',
                next: 'Több',
                prev: 'Kevesebb',
                sec: '$(x)s/képkocka'
            }
        },
        godhome: {
            tab: 'ISTENOTTHON',
            p_teleport: {
                header: 'SZOBA',
                action: 'Teleport'
            },
            p_encounter: {
                header: 'ÖSSZECSAPÁS',
                action: 'Start'
            },
            p_armor: {
                header: 'PÁNCÉL'
            },
            p_weapon: {
                header: 'FEGYVER'
            }
        },
        inspect: {
            tab: 'VIZSGÁL',
            headers: ['RÉTEGEK', 'TÍPUSOK'],
            switches: [
                ['Alap', 'Alatt', 'Fő', 'Felett', 'Menü'],
                ['ÜtközésiKeret', 'Sprite', 'Szöveg']
            ],
            p_explorer: {
                header: 'INTÉZŐ',
                layers: ['Alap (Intéző)', 'Alatt (Intéző)', 'Fő (Intéző)', 'Felett (Intéző)', 'Menü (Intéző)'],
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
            debug_instructions: 'Nyomj [TAB]-ot a debug infó váltásához',
            debug: {
                a: 'A',
                acceleration: 'Gyorsulás',
                active: 'Aktív',
                alpha: 'Alfa',
                anchor: 'Horgony',
                b: 'B',
                blend: 'Összemos',
                border: 'keret',
                compute: 'Számított Méret',
                content: 'Tartalom',
                crop: 'Vágás',
                down: 'Le',
                duration: 'Időtartam',
                exp: 'TP',
                extent: 'Mérték',
                f: 'F',
                face: 'Arc',
                false: 'Hamis',
                fill: 'Kitölt',
                fontFamily: 'Betűcsalád',
                fontSize: 'Betűméret',
                frames: 'Képkockák',
                gravity: 'Gravitáció',
                group: 'Csoport',
                hp: 'ÉP',
                index: 'Mutató',
                inert: 'Tétlen',
                key: 'Kulcs',
                lastSavedTime: 'Legutóbbi Mentett Idő',
                layer: 'Réteg',
                layers: 'Rétegek',
                left: 'Bal',
                metadata: 'Metaadat',
                music: 'Zene',
                namespace: 'Névtér',
                none1: 'SEMMI',
                none2: 'semmi',
                objects: 'Objektumok',
                oversaver: 'Túlmentő',
                parallax: 'Parallaxis',
                position: 'Pozíció',
                primed: 'Előkészített',
                priority: 'Prioritás',
                registry: 'BEJEGYZÉS',
                renderer: 'Renderelő',
                resources: 'Erőforrások',
                reverse: 'Fordított',
                right: 'Jobb',
                room: 'Szoba',
                roomState: 'Szoba Állapot',
                rotation: 'Forgatás',
                s: 'S',
                scale: 'Skála',
                shopSelection: 'Bolt Választás',
                size: 'Méret',
                spacing: 'Térköz',
                spin: 'Pörgetés',
                sprites: 'Sprite-ok',
                step: 'Lépés',
                stroke: 'Vonás',
                subcrop: 'AlVágás',
                talk: 'Beszéd',
                target: 'Célpont',
                text: 'Szöveg',
                time: 'Idő',
                tint: 'Árnyalat',
                trackedAssets: 'Követett Elemek',
                true: 'Igaz',
                unknown: 'ISMERETLEN',
                up: 'Fel',
                vars: 'Változók',
                velocity: 'Velocitás',
                volatile: 'Instabil'
            }
        },
        savemod: {
            tab: 'MENTÉSMOD',
            header1: 'MENTÉS SZERKESZTŐ',
            domains: [
                'Adat (Boolean-ek)',
                'Adat (Számok)',
                'Adat (Szövegek)',
                'Flagek (Boolean-ek)',
                'Flagek (Számok)',
                'Flagek (Szövegek)'
            ],
            p_page: {
                header: 'NAVIGÁCIÓ',
                prev: 'Előző',
                next: 'Következő'
            },
            prompt: 'Érték megadása',
            back: 'Vissza'
        },
        storage: {
            tab: 'TÁROLÓ',
            header: 'TÁROLÓ SZERKESZTŐ',
            p_container: { header: 'KIVÁLASZTÁS', prev: 'Előző', next: 'Következő' },
            display: { inventory: 'Leltár', dimboxA: 'Dim. Doboz A', dimboxB: 'Dim. Doboz B' }
        }
    },

    dialog: {
        dialog_clear_title: 'Fájl Ürítése',
        dialog_notice_title: 'Megjegyzés',
        dialog_clear_mobile: 'Mobil Beállítások Ürítése',
        dialog_open: { buttonLabel: 'Megnyit', name: 'MENTÉS fájlok', title: 'Fájl Megnyitása' },
        dialog_save: { buttonLabel: 'Mentés', name: 'MENTÉS fájlok', title: 'Fájl Mentése' },
        error_load: 'A fájlt nem lehet elemezni.',
        message_alert: ['OK'],
        message_confirm: ['Mégse', 'OK'],
        prompt_clear: 'Fájl ürítése?',
        prompt_demo: 'A MENTÉS fájlod az\n\nOUTERTALE demo-ból áthelyezve\n\negy idővonal helyre.',
        prompt_save: 'Fájl mentése?',
        prompt_clear_mobile: 'Törlöd a mobil beállításokat?\nEz NEM fogja törölni\na MENTÉSI fájlod.',
        prompt_save_alternate: 'Másold az alábbi szöveget\negy JSON fájlba, hogy\neszközödre mentsd.',
        prompt_open: 'Fájl betöltése?'
    },

    extra: {
        credits: [
            [
                '§fill=#ff0§< FEJLESZTŐ >§fill=#fff§',
                'spacey_432',
                '',
                '§fill=#ff0§< ÍRÓ >§fill=#fff§',
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
                '§fill=#ff0§< ÍRÓ >§fill=#fff§',
                'ThatGuyWhoLikesFood',
                'Turbulation',
                'Zaxento The Greedy',
                '',
                '§fill=#ff0§< MŰVÉSZ >§fill=#fff§',
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
                '§fill=#ff0§< MŰVÉSZ >§fill=#fff§',
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
                '§fill=#ff0§< MŰVÉSZ >§fill=#fff§',
                'supper12',
                'Valor52',
                'Zaxento The Greedy',
                '',
                '§fill=#ff0§< TECHNIKUS >§fill=#fff§',
                'Codetoil',
                'ryi3r',
                'ws3917',
                '',
                '§fill=#ff0§< TESZTELŐ >§fill=#fff§',
                'Alden',
                'Aspey',
                'Aster',
                'Balgamlı Kedi'
            ],
            [
                '§fill=#ff0§< TESZTELŐ >§fill=#fff§',
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
                '§fill=#ff0§< TESZTELŐ >§fill=#fff§',
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
                '§fill=#ff0§< TESZTELŐ >§fill=#fff§',
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
                '§fill=#ff0§< TESZTELŐ >§fill=#fff§',
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
                '§fill=#ff0§< TESZTELŐ >§fill=#fff§',
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
                '§fill=#ff0§< KÜLÖN KÖSZÖNET >§fill=#fff§',
                'Alden',
                '§fill=#808080§Hogy ott voltál számomra, amikor\nszükségem volt valakire, akire támaszkodhatok,\nés hogy életleckét tanítottál,\namik jobb emberré tettek engem.§fill=#fff§'
            ],
            [
                '§fill=#ff0§< KÜLÖN KÖSZÖNET >§fill=#fff§',
                'Aster',
                '§fill=#808080§Hogy te vagy az egyik legbarátságosabb\nember akit ismerek, az első, aki\nhinni kezdett a víziómban, és\ninspiráltál, hogy befejezzem a játékot.§fill=#fff§'
            ],
            [
                '§fill=#ff0§< KÜLÖN KÖSZÖNET >§fill=#fff§',
                'Balgamlı Kedi',
                "§fill=#808080§Hogy végig velem voltált a fejlesztés\nminden szakaszában, már az elejétől\nfogva. Függetlenül az időszaktól,\nmindig ott voltál, hogy segíts.§fill=#fff§"
            ],
            [
                '§fill=#ff0§< KÜLÖN KÖSZÖNET >§fill=#fff§',
                'Ghostly',
                '§fill=#808080§Hogy a józan ész hangja voltál,\namikor a játék sok aspektusáról\nvolt szó, és bátorítottál, hogy vegyem\nkomolyan a tesztelést.§fill=#fff§'
            ],
            [
                '§fill=#ff0§< KÜLÖN KÖSZÖNET >§fill=#fff§',
                'Zaxento The Greedy',
                '§fill=#808080§Hogy megbízható voltál, brutálisan\nőszinte, rengeteg kritikát és\nötletet adtál, és megbízható\nvoltál a nap óta, mikor először találkoztunk.§fill=#fff§'
            ],
            [
                '§fill=#ff0§< KÜLÖN KÖSZÖNET >§fill=#fff§',
                'ThatGuyWhoLikesFood',
                '§fill=#808080§Hogy segítettél megírni a játék fő\nrészeit, támogattad a víziómat, és\nsegítettél kifejezni magam\negy teljesen új módon.§fill=#fff§'
            ],
            [
                '§fill=#ff0§< KÜLÖN KÖSZÖNET >§fill=#fff§',
                'Bilge \"mnwary\"',
                "§fill=#808080§Hogy ott voltál, hogy segíts a fejlesztés\nvégén, és biztosítottad, hogy a játék\nírása elérje teljes potenciálját\nminden szempontból.§fill=#fff§"
            ],
            ['Elhozta a §fill=#ff0§The Mavis & Co.§fill=#fff§']
        ],

        final_frontier: {
            header: '(( SZEREPOSZTÁS ))',
            opponents: {
                froggit: {
                    name: 'FROGGIT',
                    author: 'ScarletScaledDragon',
                    text: {
                        basic: 'Az életen\ntöpreng',
                        spare: 'Professzionális\nbéka',
                        flirt: 'A szerelmen\ntöpreng',
                        bully: 'Félelemmel\nugrál'
                    }
                },
                whimsun: {
                    name: 'FLUTTERLYTE',
                    author: 'ScarletScaledDragon',
                    text: {
                        basic: 'Repülni\ntanul',
                        spare: 'Bátorító\npilóta',
                        flirt: 'Az eget\nkutatja',
                        bully: 'Kitérő\nmanőverezik'
                    }
                },
                moldsmal: {
                    name: 'GELATINI',
                    author: 'spacey_432',
                    text: {
                        basic: 'Talált egy új\nűrállomást',
                        spare: 'Háttér\ntáncos',
                        flirt: 'Egzotikus zselé\ntáncos',
                        bully: 'Talált egy\núj galaxist'
                    }
                },
                loox: {
                    name: 'OCOLOUX',
                    author: 'ScarletScaledDragon',
                    text: {
                        basic: 'Kissé\nbunkószerű',
                        spare: 'Megújult\nbunkó',
                        flirt: 'Kissé\nFlörtölős',
                        bully: ''
                    }
                },
                migosp: {
                    name: 'SILENTE',
                    author: 'ScarletScaledDragon',
                    text: {
                        basic: 'Felettébb\negyüttértő',
                        spare: 'Simán élvezi\naz életet',
                        flirt: 'A távolságból\nszeret',
                        bully: 'Veszélyeztetés\ntagadó'
                    }
                },
                mushy: {
                    name: 'MUSHY',
                    author: 'Balgamlı Kedi & ScarletScaledDragon',
                    text: {
                        basic: 'Vaktöltényt\nlövöldöz',
                        spare: 'Gyorspárbaj\nmágus',
                        flirt: 'Fegyverlövés a\nszívdobogása',
                        bully: 'Golyószóró és\nremélő'
                    }
                },
                finalghost: {
                    name: 'LURKSALOT',
                    author: 'spacey_432',
                    text: {
                        basic: 'A magányt\nválasztja',
                        spare: 'Fizikai\nkontaktust keres',
                        flirt: 'Sztoikusan\ntávolságtartó',
                        bully: ''
                    }
                },
                stardrake: {
                    name: 'STARDRAKE',
                    author: 'Burge',
                    text: {
                        basic: 'Még mindig nevetést\nkeres',
                        spare: 'Közepesen sikeres\nkomikus',
                        flirt: 'Sikeres a felnőttek\nkörében',
                        bully: ''
                    }
                },
                chilldrake: {
                    name: 'CHILLDRAKE',
                    author: 'Burge',
                    text: {
                        basic: 'Még mindig támgatókat\nkeres',
                        spare: 'Szektaként\nkövetik',
                        flirt: 'Puszikat vált\ntámogatókra',
                        bully: 'Anti-bunkóság\naktivista'
                    }
                },
                spacetop: {
                    name: 'ASTRO SERF',
                    author: 'DESM.al',
                    text: {
                        basic: 'Az antennájára\ngondol...',
                        spare: 'Rádió állomás\nszenzáció',
                        flirt: 'A szerelem az\nadásban~',
                        bully: 'Vészhelyzeti\nközvetítő'
                    }
                },
                jerry: {
                    name: 'JERRY',
                    author: 'Discarded Vessel',
                    text: {
                        basic: 'Napi szinten\nelhagyva',
                        spare: 'Kicsit kevesebbszer\ncserben hagyva',
                        flirt: 'A megváltásra\nvezető úton',
                        bully: ''
                    }
                },
                mouse: {
                    name: 'WHIZKARAT',
                    author: 'Zaxento The Greedy & semi',
                    text: {
                        basic: 'Identitás zavar\nkrízise van',
                        spare: 'Az egér társadalom\nlegújabb tagja',
                        flirt: 'Kezd élénk lenni\naz egerek közt',
                        bully: 'Visszamenekült a\nmacska társadalomba'
                    }
                },
                doggo: {
                    name: 'DOGGO',
                    author: 'Discarded Vessel',
                    text: {
                        basic: 'Hisz a mindenható\ncsavarkulcsban',
                        spare: 'Megtalálta a saját\nlátó-szemű farkasát',
                        flirt: 'Szerelemben a\nlátó-szemű farkasával',
                        bully: 'A látó-szemű\nfarkasához rohan'
                    }
                },
                lesserdog: {
                    name: 'CANIS MINOR',
                    author: 'major_memestar',
                    text: {
                        basic: 'Szeretet után\nkutat',
                        spare: 'Talált egy szerető\ngazdit',
                        flirt: 'Talált egy birtokló\nszeretőt',
                        bully: 'Szeretet után\nsóvárog'
                    }
                },
                dogs: {
                    name: 'DOGAMY & DOGARESSA',
                    author: 'major_memestar',
                    text: {
                        basic: 'Visszahozósdin jár\naz agyuk',
                        spare: 'Verhetetlen kutyaszem\nbajnokok',
                        flirt: "Elveszve egymás\ntekintetében",
                        bully: 'Védekező kutyaszemek\naktívak'
                    }
                },
                greatdog: {
                    name: 'CANIS MAJOR',
                    author: 'major_memestar',
                    text: {
                        basic: "Fel se tűnnek\naz élet változásai",
                        spare: "Izgatott az élet\nváltozásait illetően",
                        flirt: "Megérintve az\nélet változásaitól",
                        bully: ''
                    }
                },
                woshua: {
                    name: 'SKRUBBINGTON',
                    author: 'Discarded Vessel',
                    text: {
                        basic: 'Csak 99.1\nszázalékban tiszta',
                        spare: 'Magasnyomású mosó\nerőgép',
                        flirt: 'Pezsgőfürdő\ngyártó',
                        bully: 'Túlerőltetett\nmagasnyomású mosó'
                    }
                },
                moldbygg: {
                    name: 'GELATA',
                    author: 'spacey_432',
                    text: {
                        basic: 'Bébiszittert\nkeres',
                        spare: 'Zselé-üzemű\nbárszék',
                        flirt: 'Szexi sitcom\nszereplő',
                        bully: 'Megdicsőült\nbirkózókellék'
                    }
                },
                radtile: {
                    name: 'RADTILE',
                    author: 'Balgamlı Kedi & Zaxento The Greedy',
                    text: {
                        basic: 'Belenyugszik a\ntökéletlenségbe',
                        spare: 'Javítja az\nimidzsét',
                        flirt: 'A saját tükörképével\nrandizgat',
                        bully: 'Egy csúnya jövő\nfelé halad'
                    }
                },
                shyren: {
                    name: 'SHYREN',
                    author: 'Ghostly',
                    text: {
                        basic: 'Ismét zongorázni\ntanul',
                        spare: "Mettaton új\nfőénekese",
                        flirt: 'Szerelemben egy\nszellemmel',
                        bully: "Szintetizátor nélkül\nnem tud énekelni"
                    }
                },
                doge: {
                    name: 'DOGE',
                    author: 'major_memestar',
                    text: {
                        basic: 'Építkezési területi\nkiképzőtiszt',
                        spare: 'Vett egy életreszóló\ngyógyfürdő bérletet',
                        flirt: 'Először tapasztalta meg a\nkölyökkutya szerelmét',
                        bully: ''
                    }
                },
                muffet: {
                    name: 'MUFFET',
                    author: 'major_memestar',
                    text: {
                        basic: 'A következő havi\nfizetést várja',
                        spare: 'Törődik a pók\nklánokkal',
                        flirt: 'Piknik randi\nszervező',
                        bully: ''
                    }
                },
                pyrope: {
                    name: 'HOTWIRE',
                    author: 'semi',
                    text: {
                        basic: 'Várja az ütemben\na droppot',
                        spare: 'Villámgyors\nrapper',
                        flirt: 'Rapperből lett\nszerelmes dal író',
                        bully: 'Halál közelig\nrap csatát vív'
                    }
                },
                tsundere: {
                    name: 'TSUNDERIDEX',
                    author: 'spacey_432',
                    text: {
                        basic: 'Mélyen száll az\nelutasításba',
                        spare: 'Hipersebességgel\noson utánad',
                        flirt: 'Hamarosan a\nkedvesed lesz',
                        bully: 'Végre megtalálta\na párját'
                    }
                },
                perigee: {
                    name: 'PERIGEE',
                    author: 'Discarded Vessel',
                    text: {
                        basic: 'Újabb nap,\nújabb konfliktus',
                        spare: 'Bolygószintű\nnagykövet',
                        flirt: 'Másokban bátorítja\na szerelmet',
                        bully: 'Kedvességet mutat\na fájdalmon át'
                    }
                },
                rg: {
                    name: 'KG 03 & KG 04',
                    author: 'semi',
                    text: {
                        basic: 'Gyermekkori barátokat\nkeresnek',
                        spare: 'Használd a\nképzeleted',
                        flirt: 'KÉRLEK használd\na képzeleted!',
                        bully: 'Visszavonult királyi\ngárda tagok'
                    }
                },
                glyde: {
                    name: 'GLYDE',
                    author: 'Burge',
                    text: {
                        basic: 'Nem az ideális\nbiznisz partnered',
                        spare: 'Kicsit kevésbé kétséges\na megszokottnál',
                        flirt: 'Nem az ideális társad\naz ágyban',
                        bully: ''
                    }
                },
                burgie: {
                    name: 'BURGERPANTS',
                    author: 'Pongy25',
                    text: {
                        basic: 'Gyorsan fut az\nelőtte álló életbe',
                        spare: 'Bizakodva várja az\nelőtte álló életet',
                        flirt: 'Szerelmet talál az\nelőtte álló életben',
                        bully: ''
                    }
                },
                madjick: {
                    name: 'COZMO',
                    author: 'semi',
                    text: {
                        basic: 'Egy szótárat\nkeres',
                        spare: 'Híres\nbűvész',
                        flirt: 'Egy újfajta mágiát\ntalált',
                        bully: ''
                    }
                },
                knightknight: {
                    name: 'TERRESTRIA',
                    author: 'major_memestar',
                    text: {
                        basic: 'A múltat\nkutatja',
                        spare: 'Elhírhedt\ntörténész',
                        flirt: 'A crush-a az\notthoni világ',
                        bully: ''
                    }
                },
                froggitex: {
                    name: 'VÉGSŐ FROGGIT',
                    author: 'PoTheWinterCorder',
                    text: {
                        basic: 'Önmagának tartja\nbölcsességét',
                        spare: 'Nyíltan megosztja\nbölcsességét',
                        flirt: 'Bölcsességét a\nszerelemre fordítja',
                        bully: 'Bölcsességét túlélésre\nfordítja'
                    }
                },
                whimsalot: {
                    name: 'FLUTTERKNYTE',
                    author: 'spacey_432',
                    text: {
                        basic: 'Továbbra is minden\nnap dolgozik',
                        spare: 'Végre szünetet\ntart',
                        flirt: 'Privát időre\nvágyik',
                        bully: 'Keményebben dolgozik\nfélelemből'
                    }
                },
                astigmatism: {
                    name: 'EYEWALKER PRIME',
                    author: 'semi',
                    text: {
                        basic: 'Még mindig\nhatalmas bunkó',
                        spare: 'Domináló\nszemdoktor',
                        flirt: 'Domináló\nbőrdíszműves',
                        bully: 'Egy Oculoux\nvette át helyét'
                    }
                },
                migospel: {
                    name: 'SILENCIO',
                    author: 'Balgamlı Kedi',
                    text: {
                        basic: 'Még mindig egy\nszégyentelen gyáva',
                        spare: 'Kicsit kevésbé\ngyáva',
                        flirt: 'Szerelemben a\nfélelmével',
                        bully: 'Gyorsabban fut,\nmint valaha'
                    }
                },
                mushketeer: {
                    name: 'MUSHKETEER',
                    author: 'Balgamlı Kedi & Ghostly',
                    text: {
                        basic: 'Egy-gombás\nhadsereg',
                        spare: 'Békét kereső\nharcos',
                        flirt: 'Legyőzve a szeretet\nerejével',
                        bully: 'Egyszerűen\nmegijedt'
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
                    name: 'SZÖRNY KÖLYÖK',
                    author: 'spacey_432'
                },
                asriel: {
                    name: 'ASRIEL',
                    author: 'Medi0creking & MattSpriteMaster'
                }
            }
        },

        langPrompt: '[↑ vagy ↓] a választáshoz / [Z vagy ENTER] megerősítéshez',
        epilepsyInfo:
            'Akit érintene,\n\nA játék §fill=#ff0§villogó fényket tartalmaz§fill=#fff§\nmelyeket csökkenteni lehet a\n§fill=#ff0§beállítások menüben§fill=#fff§.\n\n',
        epilepsyKeys: '§fill=#808080§nyomj [Z-t vagy ENTER-t] a folytatáshoz',

        quitText1: 'Kilépés',
        quitText2: 'Kilépés.',
        quitText3: 'Kilépés..',

        real1: [
            [
                'Köszi, hogy az Outertalet játszottad!',
                'Megtisztelés volt ezen a projekten dolgozni,',
                'és számomra egyben öröm.'
            ],
            ['Amikor elkezdtem ezt az utat, sosem', "gondoltam volna, hogy ilyen messzire jutok,", 'de itt vagyunk, a végén.'],
            [
                'Számomra, az UNDERTALE életet megváltoztató',
                'tapasztalat volt, amit nehéz volt',
                'elengedni, miután először játszottam'
            ],
            [
                'Tehát, az OUTERTALE-el egy esélyt',
                'szerettem volna teremteni, hogy egy hasonló világban létezhess',
                'mintha ez volna az első alkalmad.'
            ],
            [
                "Remélem megadtam ezt az esélyt.",
                "Remélem, elégedetten távozol ebből a világból",
                "az itt töltött idő után."
            ],
            [
                "Bármit is tettél eddigi életedben,",
                'az itteni tetteid rengeteget elárulnak',
                'arról, milyen nagyszerű ember vagy.'
            ],
            [
                "Azért kaptad ezt a befejezést,",
                'mert TE alakítottad így,',
                'és ezt az élményt senki sem veheti el tőled.'
            ],
            ['A hibáid ellenére... csodálatos vagy,', 'és megérdemled a szeretetet és a törődést.', 'Ne feledd ezt, rendben?']
        ],
        real2: 'Vigyázz magadra, \"$(x).\"',

        end1: 'VÉGE',
        end2: 'VÉGE...?',

        restartText1: 'Újraindítás',
        restartText2: 'Újraindítás.',
        restartText3: 'Újraindítás..',

        title: 'OUTERTALE',
        title_timeline: 'OUTERTALE...?'
    },

    gamepad: {
        prompt: 'KONTROLLER BEÁLLÍTÁS',
        prompt_desc:
            'Használj bevitelt a kontrollereden,\nhogy hozzárendelj egy akciót.\n\nHasználd a bevitelt újra, hogy megerősítsd,\nvagy használj más beviteleket, hogy azokat is hozzárendeld.\n\nüss ESC-et, hogy átlépd a beállítást.',
        prompt_counter: 'Bevitel hozzárendelve: $(x)',
        z: '[Z vagy ENTER] - Megerősít',
        x: '[X vagy SHIFT] - Mégse',
        c: '[C vagy CTRL] - Menü (Játékban)',
        u: '[FEL vagy W] - Mozgás Fel',
        l: '[BAL vagy A] - Mozgás Balra',
        d: '[LE vagy S] - Mozgás Lefele',
        r: '[JOBB vagy D] - Mozgás Jobbra',
        f: '[F4] - Teljes Képernyő',
        prompt_done: 'Beállítás kész.\nNyomj egy gombot a folytatáshoz.',
        prompt_done_browser: '\nMegjegyzés: Ezen a platformon a kontrollerel nem\nmindig lehet teljes képernyőre váltani.',
        prompt_load:
            'Egy kontroller már be van állítva.\nNyomj egy gombot a folytatáshot, vagy nyomd\nle bármely gombot háromszor\ngyorsan, hogy újraindítsd a beállítást.\n\nÜss ESC-et, hogy átlépd a beállítást.'
    },

    general: {
        asriel: 'Asriel',
        asriel_location: 'Oblivion',
        disabled: 'LETILTVA',
        enabled: 'ENGEDÉLYEZVE',
        finish: 'Nyomj [x]-et a befejezéshez',
        frisk: 'Frisk',
        g: 'G',
        hp: 'ÉP',
        inf: '\u221e',
        landing1: '[NYOMJ Z-T VAGY ENTERT]',
        lv: 'SZRT',
        mystery1: '§mystify=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz§aaaaaa§mystify=§',
        mystery2: '{@mystify=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz}aaaaaa{@mystify=}',
        mystery2l: '{@mystify=abcdefghijklmnopqrstuvwxyz}aaaaaa{@mystify=}',
        mystery2u: '{@mystify=ABCDEFGHIJKLMNOPQRSTUVWXYZ}aaaaaa{@mystify=}',
        no: 'Nem',
        nominal: '§fill=#0f0§NÉVLEGES',
        percent: '$(x)%',
        player: 'játékos',
        settings: 'Beállítások',
        shopg: 'G',
        unknown: '?',
        xm: 'EA',
        yes: 'Igen'
    },

    menu: {
        box1: 'LELTÁR',
        box2: 'DOBOZ',
        key1: 'KULCSTARTÓ',

        confirm1: 'Helyes ez a név?',
        confirm2: 'A név már ki\nlett választva.',
        confirm3: 'Vissza',

        footer: 'OUTERTALE V5.06 Preview 5 (c) 2025 SPACEY_432',

        heal1: '* (ÉP teljesen visszanyerve.)',
        heal2: '* (Visszanyertél $(x) ÉP-t.)',
        heal3: '* (Veszítettél $(x) ÉP-t.)',
        heal4: '* (ÉP teljesen elfogyott.)',
        heal5: '* (Szereztél $(x) ÉP-t.)',

        item1: 'HASZNÁL',
        item2: 'FELSZREREL',
        item3: 'INFÓ',
        item4: 'KIDOB',

        load1: 'Folytatás',
        load2: 'Megtekint',
        load3: 'Visszaállítás',
        load4: 'Valódi visszaállítás',

        name1: 'Nevezd el az elveszett embert.',
        name2: 'Kilépés',
        name3: 'Backspace',
        name4: 'Kész',
        name5: '§fill=#808080§ [ESC] - Kilépés / [ENTER] - Kész',

        save1: 'Mentés',
        save2: 'Vissza',
        save3: 'Fájl mentve.',

        settings1: 'BEÁLLÍTÁSOK',
        settings2: 'KILÉPÉS',
        settingsprompt1: '-> NYELV & ZENE',
        settings3: 'NYELV',
        settings3a: 'MAGYAR',
        settings4: 'HANGEFFEKTEK',
        settings5: 'ZENE',
        settings6: 'SZEBB GRAFIKA',
        settingsprompt2: '-> JÁTÉKMENET & GRAFIKA',
        settings6a: 'KARAKTER FUTÁS',
        settings6b: 'SZÍNEZETT SPRITE-OK',
        settings7: 'VILLÓDZÓ KÉP',
        settings7a: 'NORMÁL',
        settings7b: 'CSÖKKENTETT',
        settings8: 'MOBIL BEÁLLÍTÁSOK',
        settings9: 'HOLTZÓNA',
        settings10: 'MOD MAPPA MEGNYITÁSA',
        settings11: 'ÚJRAINDÍT',
        border: {
            option: 'JÁTÉK KERET',
            list: [
                'SEMMI',
                'DINAMIKUS',
                'EGYSZERŰ',
                'CSILLAG',
                'KÜLZÓNA',
                'KÜLZÓNA (HARC)',
                'TORIEL OTTHONA',
                'STARTON',
                'STARTON (HARC)',
                'ÖNTÖDE',
                'ÖNTÖDE (HARC)',
                'AERIALIS',
                'AERIALIS (HARC)',
                'REK KÖZPONT',
                'REK KÖZPONT (HARC)',
                'MAG',
                "MAG (HARC)",
                'CITADELLA',
                'ASGORE OTTHONA',
                'HATOS ARCHÍVUM',
                'ASRIEL HARC',
                'VILÁGOS GALAXIS',
                'ÚJ VILÁG',
                'ÚJ VILÁG (POHÁRRAL)',
                '§fill=#808080§(ZÁRVA)'
            ]
        },
        mobile: {
            title: 'MOBIL IRÁNYÍTÁS',
            controlOpacity: 'IRNYT ÁTTETSZÉS',
            controlType: 'IRNYT TÍPUS',
            enableDiagonal: 'NYÍL GOMB LEOSZTÁS',
            enableSingleArrow: 'KÜLÖN GOMBOK',

            fourKey: '\u4dc8 4-GOMB',
            eightKey: '\u4dc9 8-GOMB',
            deadZone: 'HOLTZÓNA',
            toleranceAngle: 'TŰRÉSI SZÖG',

            loadDefault: 'ALAP BEÁLLÍTÁS BETÖLTÉSE',
            enableMultiConfig: 'GYORS VÁLTÁS ENGEDÉLYEZÉSE',
            invertButtonPos: 'GOMB POZÍCIÓ INVERTÁLÁSA',

            prompt1: '--- PROFIL VÁLASZTÁSA ---',
            prompt2: '--- ÁLTALÁNOS BEÁLLÍTÁSOK ---',
            prompt3: '--- IRÁNYÍTÁS BEÁLLÍTÁSOK ---',
            prompt4: '--- GOMBOK MÓDOSÍTÁSA ---',

            nextpage: 'KÖVETKEZŐ OLDAL >',
            prepage: '< ELŐZŐ OLDAL',

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

            ShowFullScrKey: 'TELJES KÉP GOMB MUTATÁSA',

            xPos: 'X POZÍCIÓ KÖZÉPRE',
            yPos: 'Y POZÍCIÓ KÖZÉPRE',
            size: 'GOMB MÉRET',
            radius: 'KÖR SUGARA',

            keysettings: 'GOMB TESTRESZABÁS',
            keyprompt0: '§fill=#ffd700§>> §fill=#fff§MÓDOSÍTÁS: §fill=#00ffff§$(x) §fill=#808080§(Nyomj [R]-t a visszaállításhoz)',
            keyprompt1: '§fill=#fff§PROGRESS: §fill=#00ffff§($(x)§fill=#fff§/§fill=#00ffff§3)',
            keyprompt1a: ' [1] Kezdeti Gomb Elhelyezés',
            keyprompt1b: ' [2] PPozíció Finomhangolás',
            keyprompt1c: ' [3] Gomb Méret Beállítása',
            keyprompt1d:
                '§fill=#00ff00§*** Gomb Pozíció Beállítás\n§fill=#fff§Nyomj [L]-t (a bal felső saroknál) \na kezdéshez',
            keyprompt1e: '§fill=#00ff00§*** Beállítás Kész \n§fill=#fff§Most már beállíthatsz\nmás gombokat',
            keyprompt2: '§fill=#4169e1§--- ÚTMUTATÓ ---',
            keyprompt2a:
                '§fill=#fff§* Húzd §fill=#00ffff§$(x)§fill=#fff§ kezdeti pozíció beállításhoz\n§fill=#ffd700§* Nyomj [L]-t, §fill=#808080§hogy elfogadd az elhelyezést\n§fill=#ffd700§* Nyomj [R]-t §fill=#808080§hogy helyreállíts gombokat\n§fill=#808080§Pozíció a következő lépésben állítható be',
            keyprompt2b:
                '§fill=#fff§* Használj §fill=#ffd700§[FEL/LE/BAL/JOBB]-ot§fill=#fff§ precíz illesztéshez\n§fill=#ffd700§* Nyomj [R]-t §fill=#808080§az előző pozíció visszaállításához\n§fill=#808080§Referencia koordináták lejjebb mutatva\n§fill=#ffd700§* Nyomj [L]-t §fill=#808080§az elfogadáshoz',
            keyprompt2c:
                '§fill=#fff§* Állíts §fill=#ffd700§[-5] [-1] [+1] [+5]-el§fill=#fff§ , hogyméretet állíts\n§fill=#ffd700§* Nyomj [R]-t §fill=#808080§az eredeti méretekhez\n§fill=#808080§Jelenlegi érték lejjebb mutatva\n§fill=#ffd700§* Nyomj [L]-t §fill=#808080§az elfogadáshoz',
            keyprompt3a: '§fill=#4169e1§-> §fill=#fff§POZÍCIÓ: \n§fill=#00ffff§X=$(x), Y=$(y)',
            keyprompt3b: '§fill=#4169e1§-> §fill=#fff§MÉRET: §fill=#00ffff§$(x)',

            helper_loadDefault:
                '§fill=#ff0§Nyomj [Z]-t§fill=#808080§ az alapok visszaállításához.\nEz minden egyedi beállítást visszaállít,\namid jelenleg van, az eredeti értékekre.',
            helper_enableMultiConfig:
                '§fill=#ff0§Nyomj [Z]-t§fill=#808080§ hogy lásd/elrejtsd a konfig. gombokat.\nHa engedélyezve van, öt számgomb ([0] - [4]) lesz látható a képernyő bal szélén.\n§fill=#fff§Ezek a gombok lehetővé teszik a gyors váltást konfigurált beállítások közt.§fill=#fff§',
            helper_controlType:
                '§fill=#ff0§Nyomj [Z]-t§fill=#808080§ hogy válts két irányítás opció közt:\n§fill=#ff0§1. Iránygombok§fill=#808080§: Klasszikus nyíl gombok\n§fill=#ff0§2. Virtuális Joystick§fill=#808080§: Érintőpanel barát irányítás',
            helper_controlOpacity:
                '§fill=#ff0§Használj BAL vagy JOBB nyilakat,§fill=#808080§ hogy beállítsd az átlátszóságot.\nMagasabb értéknél láthatóbb, alacsonyabbnál áttetszőbb gombok.',
            helper_enableDiagnal:
                '§fill=#ff0§Nyomj [Z]-t,§fill=#808080§ hogy kapcsold az átlós mozgást.\nEngedélyezve egy lenyomva tartott nyíl mutatni fog\n§fill=#ff0§két másik nyilat§fill=#808080§ átlós mozgáshoz.',
            helper_deadZone:
                "§fill=#ff0§Használj BAL vagy JOBB nyilakat§fill=#808080§ a joystick érzékenység konfighoz.\n§fill=#fff§A holtzóna az a központi rész, ahhol a joystick nem érzékel mozgást§fill=#808080§.\nNagyobb holtzóna = kevésbé érzékeny irányítás.",
            helper_toleranceAngle:
                '§fill=#ff0§Használj BAL vagy JOBB nyilakat§fill=#808080§ a joystick szög érzékenység konfighoz.\n§fill=#fff§Ez határozza meg, hogy mennyire kell precíznek lenned mozgáshoz§fill=#808080§.\nSzögek 45° felett átlós mozgást eremnényeznek.',
            helper_showFullScrKey:
                '§fill=#ff0§Nyomj [Z]-t§fill=#808080§, hogy láthatóvá tedd a\n§fill=#fff§Teljes képernyő gombot§fill=#808080§.',
            helper_modifyButtons:
                '§fill=#ff0§Nyomj [Z]-t§fill=#808080§, hogy testreszabd a gomb elhelyezést.\nTestreszabhatod mind a §fill=#ff0§méretét és pozícióját§fill=#808080§ minden gombnak.\nLépésről lépésre segít az útmutató a folyamaton át.',
            helper_singleArrow:
                '§fill=#ff0§nyomj [Z]-t§fill=#808080§, hogy engedélyzd vagy tiltsd az egyéni iránygombok beállítását.\nHa engedélyezve van, tudod §fill=#fff§independently állítani a pozícióját \nés méretét minden iránygombnak§fill=#808080§ jobb rugalmasság végett.',
            helper_invertButtonPos:
                '§fill=#ff0§Nyomj [Z]-t§fill=#808080§, hogy kapcsold az §fill=#fff§inverz gombok§fill=#808080§ opciót.\nHa engedélyezve, a virtuális navigációs gombok leosztása tükrözve lesz balról jobbra, jobb hozzáférés, vagy személyes preferencia végett.'
        },

        sidebar1: 'TÁRGY',
        sidebar2: 'ÁLL',
        sidebar3: 'TEL',
        sidebar4: 'KONF',
        sidebar5: 'S',

        start1: [
            '--- Instrukció ---',
            '[Z vagy ENTER] - Megerősít',
            '[X vagy SHIFT] - Mégse',
            '[C vagy CTRL] - Menü (Játékban)',
            '[F4] - Teljes Képernyő',
            '[Tartsd lenyomva: ESC] - Újraindítás',
            'Ha ÉP 0, veszítesz.'
        ],
        start2: 'Játék Kezdése',

        stat1: 'SEB',
        stat2: 'VÉD',
        stat3: 'FEGYVER',
        stat4: 'PÁNCÉL',
        stat5: 'ARANY',
        stat6: 'TP',
        stat7: 'KÖVETKEZŐ',
        stat8: '§fill=#ff0§Figyelem:\nNem-kánon\nidővonal.',
        stat9: 'GYILOK',
        stat10: 'BUNKÓ',
        stat11: 'FLÖRT',
        stat12: 'STÁTUSZ',
        stat13: '\"$(x)\"',

        story1: ['<24>{#p/storyteller}Réges rég, két faj uralta a Naprendszert: EMBEREK és SZÖRNYEKS.{^35}{}'],
        story2: ['<24>Az idő teltével, háború tört ki a két faj között.{^35}{}'],
        story3: ["<24>Miután a SZÖRNYEK bolygója elpusztult, az EMBEREK kikiáltották a győzelmet.{^35}{}"],
        story4: ['<24>A fennmaradó SZÖRNYEKET egy elhagyott támaszpontra száműzték.{^35}{}'],
        story5: ['<24>Egy hatalmas erőteret emeltek, így a SZÖRNYEKET elzárták.{^35}{}'],
        story6: ['<24>Sok évvel később.{^8}.{^8}.{^35}{}'],
        story7: ['<#24>     EBOTT SZEKTOR     \n         251X{^35}{}'],
        story8: ['<24>Történetek mesélnek egy helyről, honnan űreszköz nem tér vissza.{^35}{}'],
        story9: ['<24>{^100}{}'],
        story10: ['<24>{^100}{}'],
        story11: ['<24>{^35}{}']
    },

    timeline: {
        main: 'Kánon Idővonal Folytatása',
        main_ex: 'Kánon Idővonal Indítása',
        timelines: 'Egyéb Helyek',
        bisect: 'Feloszt',
        delete: 'Töröl',
        instruction: '[ESC] mégse / [ENTER] elfogad',
        instruction_gamepad: 'Nyomj egy gombot a kontrolleren a billentyűzet megnyitásához.',
        launch: 'Indítás',
        rename: 'Átnevez',
        create: 'Új készítése',
        placeholder: 'Nevezd el az idővonalat',
        confirm: 'Biztos vagy benne?'
    }
};


// END-TRANSLATE
