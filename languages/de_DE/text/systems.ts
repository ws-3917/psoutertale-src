// START-TRANSLATE

export default {
    battle: {
        death0: ['(Sie holen tief Luft.)', "(Sie sind voller Entschlossenheit.)"],
        death1: ['Du darfst noch nicht aufgeben...', '$(name)!\nBleib entschlossen...'],
        death2: ['Unser Schicksal liegt in Ihren Händen...', '$(name)!\nBleib entschlossen...'],
        death3: ["Es wird alles gut!", '$(name)!\nBleib entschlossen...'],
        death4: ["Geben Sie die Hoffnung nicht auf!", '$(name)!\nBleib entschlossen...'],
        death5: ['Es darf jetzt nicht enden!', '$(name)!\nBleib entschlossen...'],

        flee1: '    * Entkommen...',
        flee2: "    * Ich bin hier raus.",
        flee3: "    * Ich habe Besseres zu tun.",
        flee4: "    * Brems mich nicht aus.",
        flee5: '    * Bin mit $(x) EXP\n      und $(y)G weggelaufen.',

        mercy_assist: '* Helfen',
        mercy_flee: '* Fliehen',
        mercy_spare: '* Verschonen',

        victory1: '<32>{#p/story}* DU HAST GEWONNEN!\n* Du erhältst $(x) EXP und $(y)G.',
        victory2: '<32>{#p/story}* DU HAST GEWONNEN!\n* Du erhältst $(x) EXP und $(y)G.\n* Deine LOVE ist gestiegen.'
    },

    developer: {
        console: {
            header: 'FEHLER',
            p_resume: {
                header: 'ZURÜCKWEISEN',
                resume: 'Klicken, um zu schließen.'
            },
            blurb: 'Ein Fehler ist aufgetreten! Bitte senden\nSie einen Screenshot an den Entwickler.'
        },
        control: {
            tab: 'KONTROLLE',
            headers: ['ALLGEMEIN', 'BATTLE'],
            items: [
                [
                    'FixMusic',
                    'FixPlayer',
                    'InfiniteG',
                    'Interagieren',
                    'Input',
                    'Bewegung',
                    'Noclip',
                    'Speichern',
                    'SkipText',
                    'Freecam'
                ],
                [
                    'CanAssist',
                    'ClearBox',
                    'Verlassen',
                    'ResetBox',
                    'ResetMenu',
                    'KannFliehen',
                    'InfiniteHP',
                    'AlleBefrieden',
                    'Selbstmord',
                    'AlleSchwächen'
                ]
            ],
            p_speed: {
                fps: '$(x) FPS',
                halt: 'Halt',
                header: 'GAME SPEED',
                next: 'Mehr',
                prev: 'Weniger',
                sec: '$(x)s/frame'
            }
        },
        godhome: {
            tab: 'GOTTESHAUS',
            p_teleport: {
                header: 'Räume',
                action: 'Teleport'
            },
            p_encounter: {
                header: 'BEGEGNEN',
                action: 'Start'
            },
            p_armor: {
                header: 'RÜST'
            },
            p_weapon: {
                header: 'WAFFEN'
            }
        },
        inspect: {
            tab: 'INSPECT',
            headers: ['LAYERS', 'TYPES'],
            switches: [
                ['Base', 'Below', 'Main', 'Above', 'Menu'],
                ['Hitbox', 'Sprite', 'Text']
            ],
            p_explorer: {
                header: 'EXPLORER',
                layers: ['Base (Explorer)', 'Below (Explorer)', 'Main (Explorer)', 'Above (Explorer)', 'Menu (Explorer)'],
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
            debug_instructions: 'Drücken Sie [TAB], um die Debuginformationen durchzugehen',
            debug: {
                a: 'A', 
                acceleration: 'Beschleunigung',
                active: 'Aktiv',
                alpha: 'Alpha',
                anchor: 'Anker',
                b: 'B', 
                blend: 'Mischung',
                border: 'Grenze',
                compute: 'Berechnete Größe\n',
                content: 'Inhalt',
                crop: 'Ernte',
                down: 'Runter',
                duration: 'Dauer',
                exp: 'EXP',
                extent: 'Ausmaß',
                f: 'F', 
                face: 'Gesicht',
                false: 'FALSCH',
                fill: 'Füllen',
                fontFamily: 'Schriftfamilie',
                fontSize: 'Schriftgröße',
                frames: 'Rahmen',
                gravity: 'Schwerkraft',
                group: 'Gruppe',
                hp: 'HP',
                index: 'Index',
                inert: 'Inert',
                key: 'Schlüssel',
                lastSavedTime: 'Zuletzt gespeicherter Zeitpunkt',
                layer: 'Layer',
                layers: 'Layers',
                left: 'Links',
                metadata: 'Metadaten',
                music: 'Musik',
                namespace: 'Namensraum',
                none1: 'KEINER',
                none2: 'keiner',
                objects: 'Objekte',
                oversaver: 'Oversaver',
                parallax: 'Parallaxe',
                position: 'Position',
                primed: 'Grundiert',
                priority: 'Priorität',
                registry: 'REGISTRIERUNG',
                renderer: 'Renderer',
                resources: 'Ressourcen',
                reverse: 'Umkehren',
                right: 'Rechts',
                room: 'Raum',
                roomState: 'Raumzustand',
                rotation: 'Drehung',
                s: 'S', 
                scale: 'Skala',
                shopSelection: 'Shop-Auswahl',
                size: 'Größe',
                spacing: 'Abstand',
                spin: 'Drehen',
                sprites: 'Sprites',
                step: 'Schritt',
                stroke: 'Schlaganfall',
                subcrop: 'Subcrop',
                talk: 'Sprechen',
                target: 'Ziel',
                text: 'Text',
                time: 'Zeit',
                tint: 'Farbton',
                trackedAssets: 'Verfolgte Vermögenswerte',
                true: 'WAHR',
                unknown: 'UNBEKANNT',
                up: 'Hoch',
                vars: 'Vars',
                velocity: 'Geschwindigkeit',
                volatile: 'Flüchtig'
            }
        },
        savemod: {
            tab: 'SAVEMOD',
            header1: 'EDITOR SPEICHERN',
            domains: [
                'Data (Booleans)',
                'Data (Numbers)',
                'Data (Strings)',
                'Flags (Booleans)',
                'Flags (Numbers)',
                'Flags (Strings)'
            ],
            p_page: {
                header: 'NAVIGATION',
                prev: 'Zurück',
                next: 'Nächste'
            },
            prompt: 'Wert eingeben',
            back: 'Zurück'
        },
        storage: {
            tab: 'LAGERUNG',
            header: 'SPEICHEREDITOR',
            p_container: { header: 'AUSWAHL', prev: 'Zurück', next: 'Nächste' },
            display: { inventory: 'Inventar', dimboxA: 'Dim. Box A', dimboxB: 'Dim. Box B' }
        }
    },

    dialog: {
        dialog_clear_title: 'Datei löschen',
        dialog_notice_title: 'Beachten',
        dialog_clear_mobile: 'Mobile Einstellungen löschen',
        dialog_open: { buttonLabel: 'Offen', name: 'SAVE-Dateien', title: 'Datei öffnen' },
        dialog_save: { buttonLabel: 'Speichern', name: 'SAVE-Dateien', title: 'Datei speichern' },
        error_load: 'Diese Datei konnte nicht analysiert werden.',
        message_alert: ['OK'],
        message_confirm: ['Stornieren', 'OK'],
        prompt_clear: 'Diese Datei löschen?',
        prompt_demo: 'Ihre SAVE-Datei aus der\nOUTERTALE-Demo wurde\nin einen Timeline-Slot verschoben.',
        prompt_save: 'Diese Datei speichern?',
        prompt_clear_mobile: 'Mobilbezogene Einstellungen löschen?\nDadurch wird Ihre\nSAVE-Datei NICHT gelöscht.',
        prompt_save_alternate: 'Kopieren Sie den folgenden Text in\neine JSON-Datei, um ihn\nauf Ihrem Gerät zu speichern.',
        prompt_open: 'Diese Datei laden?'
    },

    extra: {
        credits: [
            [
                '§fill=#ff0§< ENTWICKLER >§fill=#fff§',
                'spacey_432',
                '',
                '§fill=#ff0§< SCHREIBER >§fill=#fff§',
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
                '§fill=#ff0§< SCHREIBER >§fill=#fff§',
                'ThatGuyWhoLikesFood',
                'Turbulation',
                'Zaxento The Greedy',
                '',
                '§fill=#ff0§< KÜNSTLER >§fill=#fff§',
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
                '§fill=#ff0§< KÜNSTLER >§fill=#fff§',
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
                '§fill=#ff0§< KÜNSTLER >§fill=#fff§',
                'supper12',
                'Valor52',
                'Zaxento The Greedy',
                '',
                '§fill=#ff0§< ARTIST (CONTINUED) >§fill=#fff§',
                'Abb',
                '§fill=#808080§Created one border, fanart,\nand several sprites.§fill=#fff§',
                'C-G_O_A_T',
                '§fill=#808080§Colored dialogue sprites for\nAlphys, Asriel, Undyne, etc.§fill=#fff§',
            ],
            [
                '§fill=#ff0§< ARTIST (CONTINUED) >§fill=#fff§',
                'DarkFlameWeaver',
                '§fill=#808080§Created battle-colored Undyne\nsprites.§fill=#fff§',
                'JustAnimates',
                '§fill=#808080§Improved Toriel sprite art.§fill=#fff§',
                'Kite95',
                '§fill=#808080§Created Frisk running animation\nand revised many key sprites.§fill=#fff§',
                'KodLenss',
                '§fill=#808080§Designed Outlands and\nAerialis borders.§fill=#fff§',
            ],
            [
                '§fill=#ff0§< ARTIST (CONTINUED) >§fill=#fff§',
                'KrisDrmr',
                '§fill=#808080§Created sprites for Muffet,\nCozmo, and Mettaton.§fill=#fff§',
                'moons',
                '§fill=#808080§Contributed over 40 colored\nbattle sprites.§fill=#fff§',
                'XiaoYun',
                '§fill=#808080§Designed 18 Outertale borders\nincluding Starton and CORE.§fill=#fff§',
            ],
            [
                '§fill=#ff0§< TECHNIKER >§fill=#fff§',
                'AnXing',
                '§fill=#808080§Assisted with Android controller\ncode and build debugging.\nWrote Cordova build guide.§fill=#fff§',
                'Codetoil',
                '§fill=#808080§\"The Great Theoretical Physicist Codetoil.\"§fill=#fff§',
                'Murder--Sans_MDR',
                '§fill=#808080§Contributed to code improvements\nand sprite implementation, as well\nas technical support during build.§fill=#fff§',
                'Onezhazha',
                '§fill=#808080§Created full Russian font set and\nsupported various text systems.§fill=#fff§',
            ],
            [
                '§fill=#ff0§< TECHNIKER >§fill=#fff§',
                'ryi3r',
                '§fill=#808080§\"Remember when I speedran the chaotic?\"§fill=#fff§',
                'Wasneet Potato',
                '§fill=#808080§Helped with border scripting and\ntechnical aspects of phone call\ndialogue system.§fill=#fff§',
                'WS3917',
                '§fill=#808080§Contributed to bug fixing,\ncode improvements, and game\ntranslation support.§fill=#fff§',
                '§fill=#808080§Adding the entirety of CJK characters into one image... it builds character!§fill=#fff§',
            ],
            [
                '§fill=#ff0§< TESTER >§fill=#fff§',
                'Alden',
                'AnXing',
                'Aspey',
                'Aster',
                'Balgamlı Kedi',
                'Bilge \"mnwary\"',
                'Brad',
                'braing',
                'brayjamin',
                'ClamsyMoe',
                'delta',
                'Discarded Vessel',
                'Dischnie',
            ],
            [
                '§fill=#ff0§< TESTER >§fill=#fff§',
                'DR4GON HE4RT',
                'Dubituar',
                'Efe Kaya',
                'Emurry',
                'Enzolos',
                'errosia',
                'EvanGamesGoodman',
                'Fired',
                'FireWizard72X',
                'FuLiNT',
                'Funtermore',
                'gardnaeden',
                'Ghostly',
            ],
            [
                '§fill=#ff0§< TESTER >§fill=#fff§',
                'Gon UT',
                'Green Tea',
                'Holaamigo',
                'Huggies!',
                'ilovecookies',
                'InvincibleRacoon',
                'Jago128',
                'Joe98912',
                'Jojoton56',
                'Jonkler',
                'Kiwi \"Quinn\"',
                'lil tanski',
                'MR. PETER'
            ],
            [
                '§fill=#ff0§< TESTER >§fill=#fff§',
                'MSBen',
                'Murder--Sans_MDR',
                'Nanorasmus',
                'neo9174',
                'NepAnime',
                'semi',
                'Shaun Duz Stuffs',
                'SHCyank',
                'NerNot1',
                'Onezhazha',
                'petar3644',
                'PixelToons Jaafar',
                'Prezmop'
            ],
            [
                '§fill=#ff0§< TESTER >§fill=#fff§',
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
                'Wasneet Potato',
                'Wild Pasta',
                'WS3917',
                'Xiao_Akatsuki',
                'XieFish',
                'xNoodlePlayz',
                'Zaxento The Greedy'
            ],
            [
                '§fill=#ff0§< BESONDERER DANK >§fill=#fff§',
                'Alden',
                '§fill=#808080§Dafür, dass du für mich da warst, wenn ich\njemanden zum Anlehnen brauchte, und\nmir Lektionen fürs Leben beigebracht hast,\ndie mich zu einem besseren Menschen gemacht haben.§fill=#fff§'
            ],
            [
                '§fill=#ff0§< BESONDERER DANK >§fill=#fff§',
                'Aster',
                '§fill=#808080§Dafür, dass du einer der freundlichsten\nMenschen bist, die ich kenne, der erste Mensch,\nder an meine Vision glaubt und\nmich dazu inspiriert hast, das Spiel fertigzustellen.§fill=#fff§'
            ],
            [
                '§fill=#ff0§< BESONDERER DANK >§fill=#fff§',
                'Balgamlı Kedi',
                "§fill=#808080§Dafür, dass er mir in jeder\nEntwicklungsphase von Anfang an zur Seite stand. Egal in welcher Ära,\ner war immer da, um mir zu helfen.§fill=#fff§"
            ],
            [
                '§fill=#ff0§< BESONDERER DANK >§fill=#fff§',
                'Ghostly',
                '§fill=#808080§Dafür, dass Sie in\nvielen Aspekten des Spiels die Stimme der Vernunft sind und mich ermutigt haben,\ndas Testen ernst zu nehmen.§fill=#fff§'
            ],
            [
                '§fill=#ff0§< BESONDERER DANK >§fill=#fff§',
                'Zaxento The Greedy',
                '§fill=#808080§Dafür, dass du zuverlässig und schonungslos \nehrlich bist, mir viel Kritik und Ideen \ngibst und vom ersten Tag an \nvertrauenswürdig bist.§fill=#fff§'
            ],
            [
                '§fill=#ff0§< BESONDERER DANK >§fill=#fff§',
                'ThatGuyWhoLikesFood',
                '§fill=#808080§Dafür, dass Sie mir geholfen haben, entscheidende\nTeile des Spiels zu schreiben, meine\nVision unterstützt haben und mir geholfen haben,\nmich auf eine ganz neue Art und Weise auszudrücken.§fill=#fff§'
            ],
            [
                '§fill=#ff0§< BESONDERER DANK >§fill=#fff§',
                'Bilge \"mnwary\"',
                "§fill=#808080§Dafür, dass Sie gegen Ende der Entwicklung \nmitgeholfen haben und dafür gesorgt haben, dass die Texte \ndes Spiels ihr volles Potenzial entfalten.§fill=#fff§"
            ],
            ['Präsentiert von §fill=#ff0§The Mavis & Co.§fill=#fff§']
        ],

        final_frontier: {
            header: '(( CAST ))',
            opponents: {
                froggit: {
                    name: 'FROGGIT',
                    author: 'ScarletScaledDragon',
                    text: {
                        basic: 'Nachdenken\nÜber das Leben',
                        spare: 'Profi\nFrosch',
                        flirt: 'Pondering\nLove',
                        bully: 'Hüpfen in \nAngst'
                    }
                },
                whimsun: {
                    name: 'FLUTTERLYTE',
                    author: 'ScarletScaledDragon',
                    text: {
                        basic: 'Fliegen \nlernen',
                        spare: 'Ermutigender \nFlieger',
                        flirt: 'Den Himmel\ndurchsuchen',
                        bully: 'Ausweichen\nManövrieren'
                    }
                },
                moldsmal: {
                    name: 'GELATINI',
                    author: 'spacey_432',
                    text: {
                        basic: 'Eine neue\nRaumstation gefunden',
                        spare: 'Backup\nTänzer',
                        flirt: 'Exotische Jelly\nTänzerin',
                        bully: 'Eine neue\nGalaxie gefunden'
                    }
                },
                loox: {
                    name: 'OCULOUX',
                    author: 'ScarletScaledDragon',
                    text: {
                        basic: 'Leicht\nBully-artig',
                        spare: 'Geläuterter\nBully',
                        flirt: 'Leicht\nkokett',
                        bully: ''
                    }
                },
                migosp: {
                    name: 'SILENTE',
                    author: 'ScarletScaledDragon',
                    text: {
                        basic: 'Überaus\nangenehm',
                        spare: 'Lässig\nGenießt das Leben',
                        flirt: 'Verliebt aus der\nFerne',
                        bully: 'Gefährdung\nLeugner'
                    }
                },
                mushy: {
                    name: 'MUSHY',
                    author: 'Balgamlı Kedi & ScarletScaledDragon',
                    text: {
                        basic: 'Schießen\nPlatzpatronen',
                        spare: 'Schnellzieher\nZauberer',
                        flirt: 'Gunshot\nHerzensbrecher',
                        bully: 'Sprühen und\nBeten'
                    }
                },
                finalghost: {
                    name: 'LURKSALOT',
                    author: 'spacey_432',
                    text: {
                        basic: 'Unter sich \nbleiben',
                        spare: 'Suche nach\nKörperkontakt',
                        flirt: 'Stoisch\nunbeteiligt',
                        bully: ''
                    }
                },
                stardrake: {
                    name: 'STARDRAKE',
                    author: 'Burge',
                    text: {
                        basic: 'Immer noch auf der\nSuche nach Lachern',
                        spare: 'Halbwegs erfolgreicher\nKomiker',
                        flirt: 'Beliebt bei den\nErwachsenen',
                        bully: ''
                    }
                },
                chilldrake: {
                    name: 'CHILLDRAKE',
                    author: 'Burge',
                    text: {
                        basic: 'Immer noch auf der \nSuche nach Unterstützern',
                        spare: 'Eine Kultanhängerschaft\ngewonnen',
                        flirt: 'Tauscht Küsse gegen\nUnterstützer aus',
                        bully: 'Anti-Mobbing-\nAktivist'
                    }
                },
                spacetop: {
                    name: 'ASTRO SERF',
                    author: 'DESM.al',
                    text: {
                        basic: 'Nachdenken über\ndie Antenne',
                        spare: 'Radiosender\nSensation',
                        flirt: 'Liebe liegt in \nder Luft',
                        bully: 'Notfall-\nRundfunk'
                    }
                },
                jerry: {
                    name: 'JERRY',
                    author: 'Discarded Vessel',
                    text: {
                        basic: 'Täglich im Stich\ngelassen werden',
                        spare: 'Etwas weniger \nverlassen werden',
                        flirt: 'Auf dem Weg zur\nErlösung',
                        bully: ''
                    }
                },
                mouse: {
                    name: 'WHIZKARAT',
                    author: 'Zaxento The Greedy & semi',
                    text: {
                        basic: 'Eine Identitätskrise\nhaben',
                        spare: 'Neuestes Mitglied der\nMouse Society',
                        flirt: 'Mit den Mäusen\nmunter werden',
                        bully: 'Zurückgehuscht zur\nKatzengesellschaft'
                    }
                },
                doggo: {
                    name: 'DOGGO',
                    author: 'Discarded Vessel',
                    text: {
                        basic: 'Glaubt an den Allmächtigen\nSchraubenschlüssel',
                        spare: 'Fand seinen\neigenen Blindenwolf',
                        flirt: 'Verliebt in\nseinen Blindenwolf',
                        bully: 'Er rennt zu\nseinem Blindenwolf'
                    }
                },
                lesserdog: {
                    name: 'CANIS MINOR',
                    author: 'major_memestar',
                    text: {
                        basic: 'Auf der Suche\nnach Zuneigung',
                        spare: 'Einen liebevollen Besitzer \ngefunden',
                        flirt: 'Einen besitzenden Liebhaber \ngefunden',
                        bully: 'Verzweifelt nach \nZuneigung'
                    }
                },
                dogs: {
                    name: 'DOGAMY & DOGARESSA',
                    author: 'major_memestar',
                    text: {
                        basic: 'Denke immer noch\nüber Fetch nach',
                        spare: 'Amtierende \nWelpenblick-Champions',
                        flirt: "Gefangen in den \nBlicken des anderen",
                        bully: '„Defensive Welpen-\nBlick aktiviert!“'
                    }
                },
                greatdog: {
                    name: 'CANIS MAJOR',
                    author: 'major_memestar',
                    text: {
                        basic: "Unbewusst über die \nVeränderungen im Leben",
                        spare: "Aufgeregt durch die\nVeränderungen des Lebens",
                        flirt: "Von den Veränderungen\ndes Lebens berührt",
                        bully: ''
                    }
                },
                woshua: {
                    name: 'SKRUBBINGTON',
                    author: 'Discarded Vessel',
                    text: {
                        basic: 'Nur 99,1\nProzent sauber',
                        spare: 'Hochdruckreiniger-\nKraftpaket',
                        flirt: 'Whirlpool\nHersteller',
                        bully: 'Überlasteter\nHochdruckreiniger'
                    }
                },
                moldbygg: {
                    name: 'GELATA',
                    author: 'spacey_432',
                    text: {
                        basic: 'Suche einen\nBaby Sitter',
                        spare: 'Barhocker mit\nSchleimantrieb',
                        flirt: 'Sexy Sitcom\nStammgast',
                        bully: 'Verherrlichte\nWrestling-Requisite'
                    }
                },
                radtile: {
                    name: 'RADTILE',
                    author: 'Balgamlı Kedi & Zaxento The Greedy',
                    text: {
                        basic: 'Sich in der\nUnvollkommenheit suhlen',
                        spare: 'Verbesserung seines\nSelbstbildes',
                        flirt: 'Mit seinem eigenen\nSpiegelbild ausgehen',
                        bully: 'Auf dem Weg in eine\nhässliche Zukunft'
                    }
                },
                shyren: {
                    name: 'SHYREN',
                    author: 'Ghostly',
                    text: {
                        basic: 'Zurück zum\nKlavierunterricht',
                        spare: "Mettaton's\nneuer Leadsänger",
                        flirt: 'Verliebt in\neinen Geist',
                        bully: "Ohne Synthesizer\nkann ich nicht singen"
                    }
                },
                doge: {
                    name: 'DOGE',
                    author: 'major_memestar',
                    text: {
                        basic: 'Baustelle\nAusbilder',
                        spare: 'Habe ein lebenslanges\nSpa-Abonnement gekauft',
                        flirt: 'Zum ersten Mal\nWelpenliebe gespürt',
                        bully: ''
                    }
                },
                muffet: {
                    name: 'MUFFET',
                    author: 'major_memestar',
                    text: {
                        basic: 'Auf der Suche nach\nihrer nächsten Auszahlung',
                        spare: 'Fürsorge für die\nSpinnenclans',
                        flirt: 'Picknick-Date\nKupplerin',
                        bully: ''
                    }
                },
                pyrope: {
                    name: 'HOTWIRE',
                    author: 'semi',
                    text: {
                        basic: 'Warten auf\nden Beat',
                        spare: 'Blitzschneller\nRapper',
                        flirt: 'Vom Rapper zum\nLiebesliedschreiber',
                        bully: 'Rap-Kampf bis\nzum Tod'
                    }
                },
                tsundere: {
                    name: 'TSUNDERIDEX',
                    author: 'spacey_432',
                    text: {
                        basic: 'Tiefer fliegen\nIn die Verleugnung',
                        spare: 'Schleicht sich mit Warp-\nGeschwindigkeit an Sie heran',
                        flirt: 'Tsun soll Ihr\nDere-Dere sein',
                        bully: 'Endlich seinen\nMeister gefunden'
                    }
                },
                perigee: {
                    name: 'PERIGEE',
                    author: 'Discarded Vessel',
                    text: {
                        basic: 'Ein neuer Tag,\nein neuer Konflikt',
                        spare: 'Interplanetarer\nBotschafter',
                        flirt: 'Die Liebe in\nanderen fördern',
                        bully: 'Trotz des Schmerzes\nFreundlichkeit zeigen'
                    }
                },
                rg: {
                    name: 'RG 03 & RG 04',
                    author: 'semi',
                    text: {
                        basic: 'Auf der Suche nach\nFreunden aus der Kindheit',
                        spare: 'Verwenden Sie\nIhre Vorstellungskraft',
                        flirt: 'Bitte nutzen Sie Ihre\nVorstellungskraft',
                        bully: 'Königliche Wache\nRentner'
                    }
                },
                glyde: {
                    name: 'GLYDE',
                    author: 'Burge',
                    text: {
                        basic: 'Nicht Ihr idealer\nGeschäftspartner',
                        spare: 'Etwas weniger\nzwielichtig als sonst',
                        flirt: 'Nicht Ihr idealer\nBettgenosse',
                        bully: ''
                    }
                },
                burgie: {
                    name: 'BURGERPANTS',
                    author: 'Pongy25',
                    text: {
                        basic: 'Hastig dem Leben entgegen-\nrennen, das vor uns liegt',
                        spare: 'Ich freue mich auf\ndas Leben, das vor mir liegt',
                        flirt: 'Liebe finden\nIm kommenden Leben',
                        bully: ''
                    }
                },
                madjick: {
                    name: 'COZMO',
                    author: 'semi',
                    text: {
                        basic: 'Auf der Suche nach\neinem Wörterbuch',
                        spare: 'Berühmter\nMagier',
                        flirt: 'Eine neue Art von\nMagie entdeckt',
                        bully: ''
                    }
                },
                knightknight: {
                    name: 'TERRESTRIA',
                    author: 'major_memestar',
                    text: {
                        basic: 'Auf der Suche nach\nder Vergangenheit',
                        spare: 'Renommierter\nHistoriker',
                        flirt: 'Ist in die\nHeimatwelt verknallt',
                        bully: ''
                    }
                },
                froggitex: {
                    name: 'FINAL FROGGIT',
                    author: 'PoTheWinterCorder',
                    text: {
                        basic: 'SeineWeisheit\nfür sich behalten',
                        spare: 'Seine Weisheit\noffen teilen',
                        flirt: 'Seine Weisheit für\ndie Liebe nutzen',
                        bully: 'Seine Weisheit zum\nÜberleben nutzen'
                    }
                },
                whimsalot: {
                    name: 'FLUTTERKNYTE',
                    author: 'spacey_432',
                    text: {
                        basic: 'Arbeite immer\nnoch jeden Tag',
                        spare: 'Endlich eine\nPause gemacht',
                        flirt: 'Auf der Suche nach\netwas Privatsphäre',
                        bully: 'Aus Angst\nhärter arbeiten'
                    }
                },
                astigmatism: {
                    name: 'EYEWALKER PRIME',
                    author: 'semi',
                    text: {
                        basic: 'Immer noch ein\ngroßer Tyrann',
                        spare: 'Dominanter\nAugenarzt',
                        flirt: 'Dominanter\nLederschneider',
                        bully: 'Gestürzt von\neinem Oculoux'
                    }
                },
                migospel: {
                    name: 'SILENCIO',
                    author: 'Balgamlı Kedi',
                    text: {
                        basic: 'Immer noch ein\nschamloser Feigling',
                        spare: 'Ein bisschen weniger\nein Feigling',
                        flirt: 'Verliebt in\nseine Angst',
                        bully: 'Schneller laufen\nals je zuvor'
                    }
                },
                mushketeer: {
                    name: 'MUSHKETEER',
                    author: 'Balgamlı Kedi & Ghostly',
                    text: {
                        basic: 'Eine Pilzarmee',
                        spare: 'Abgehärteter Krieger\nAuf der Suche nach Frieden',
                        flirt: 'Besiegt durch die\nMacht der Liebe',
                        bully: 'Angst\nGeradewegs'
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

        langPrompt: '[↑ oder ↓] zum Auswählen / [Z oder ENTER] zum Bestätigen',
        epilepsyInfo:
            'An alle, die es betrifft,\n\nDieses Spiel enthält\n§fill=#ff0§flackernde Bilder§fill=#fff§,\ndie über das\n§fill=#ff0§Einstellungsmenü reduziert\nwerden können§fill=#fff§.\n',
        epilepsyKeys: '\n\n§fill=#808080§Drücke [Z oder ENTER] zum Fortfahren',

        quitText1: 'Beenden',
        quitText2: 'Beenden.',
        quitText3: 'Beenden..',

        real1: [
            [
                'Vielen Dank, dass du Outertale gespielt hast.',
                'An diesem Projekt zu arbeiten, war mir eine Ehre',
                'und eine Freude.'
            ],
            ['Als ich diese Reise begann, hätte ich nie gedacht,', "dass ich so weit kommen würde, aber hier sind wir,", 'am Ende angelangt.'],
            [
                'Für mich war UNDERTALE eine lebensverändernde',
                'Erfahrung, und es fiel mir sehr schwer,',
                'es loszulassen, nachdem ich es zum ersten Mal gespielt hatte.'
            ],
            [
                'Mit OUTERTALE wollte ich dir eine weitere Chance geben,',
                'in einer Welt wie dieser zu existieren,',
                'als wäre es dein erstes Mal.'
            ],
            [
                "Ich hoffe, ich habe dir diese Chance gegeben.",
                "Ich hoffe, du bist mit der Zeit, die du in dieser Welt",
                "verbracht hast, zufrieden."
            ],
            [
                "Egal, was du in deinem Leben getan hast,",
                'deine Handlungen hier sprechen Bände darüber,',
                'welche Art von Mensch du wirklich bist.'
            ],
            [
                "Es ist wegen dir, dass du das Ende erreicht hast,",
                'das du erlebt hast, und nichts kann dir',
                'diese Erfahrung nehmen.'
            ],
            ['Trotz deiner Fehler... du bist großartig,', 'und du verdienst Liebe und Aufmerksamkeit.', 'Vergiss das nicht, okay?']
        ],
        real2: 'Pass auf dich auf, \"$(x).\"',

        end1: 'DAS ENDE',
        end2: 'DAS ENDE...?',

        restartText1: 'Neustart',
        restartText2: 'Neustart.',
        restartText3: 'Neustart..',

        title: 'OUTERTALE',
        title_timeline: 'OUTERTALE...?'
    },

    gamepad: {
        prompt: 'GAMEPAD SETUP',
        prompt_desc:
            '\nVerwende eine Eingabe auf deinem Gamepad, \num sie einer Aktion im Spiel zuzuweisen.\n\nVerwende dieselbe Eingabe erneut, \num zu bestätigen, oder benutze andere \nEingaben, um weitere Aktionen zuzuweisen.\n\nDrücke ESC, um die Einrichtung zu überspringen.',
        prompt_counter: 'Eingaben zugewiesen: $(x)',
        z: '[Z oder ENTER] - Bestätigen',
        x: '[X oder SHIFT] - Abbrechen',
        c: '[C oder STRG] - Menü (Im Spiel)',
        u: '[↑ oder W] - Nach oben bewegen',
        l: '[← oder A] - Nach links bewegen',
        d: '[↓ oder S] - Nach unten bewegen',
        r: '[→ oder D] - Nach rechts bewegen',
        f: '[F4] - Vollbild',
        prompt_done: 'Setup abgeschlossen.\nDrücke eine beliebige Taste, um fortzufahren.',
        prompt_done_browser: '\nHinweis: Auf dieser Plattform kann der Gamepad\nmöglicherweise nicht immer den\nVollbildmodus aktivieren.',
        prompt_load:
            'Ein Gamepad wurde bereits eingerichtet.\nDrücke eine beliebige Taste, um\nfortzufahren, oder drücke\ndrei Mal schnell hintereinander eine\nbeliebige Taste, um die Einrichtung\nneu zu starten.\n\nDrücke ESC, um die Einrichtung zu überspringen.'
    },

    general: {
        asriel: 'Asriel',
        asriel_location: 'Das Oblivion',
        disabled: 'DEAKTIVIERT',
        enabled: 'AKTIVIERT',
        finish: 'Zum Beenden [X] drücken',
        frisk: 'Frisk',
        g: 'G',
        hp: 'HP',
        inf: '\u221e',
        landing1: '[Z ODER EINGABE DRÜCKEN]',
        lv: 'LV',
        mystery1: '§mystify=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz§aaaaaa§mystify=§',
        mystery2: '{@mystify=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz}aaaaaa{@mystify=}',
        mystery2l: '{@mystify=abcdefghijklmnopqrstuvwxyz}aaaaaa{@mystify=}',
        mystery2u: '{@mystify=ABCDEFGHIJKLMNOPQRSTUVWXYZ}aaaaaa{@mystify=}',
        no: 'Nein',
        nominal: '§fill=#0f0§NOMINAL',
        percent: '$(x)%',
        player: 'Spieler',
        settings: 'Einstellungen',
        shopg: 'G',
        unknown: '?',
        xm: 'XM',
        yes: 'Ja'
    },

    menu: {
        box1: 'INVENTAR',
        box2: 'BOX',
        key1: 'Schlüssel',

        confirm1: 'Ist dieser Name richtig?',
        confirm2: 'Ein Name wurde bereits\ngewählt.',
        confirm3: 'Geh zurück',

        footer: 'OUTERTALE V5.06 Preview 5 (c) 2025 SPACEY_432',

        heal1: '* (HP vollständig wiederhergestellt.)',
        heal2: '* (Du hast $(x) HP wiederhergestellt.)',
        heal3: '* (Du hast $(x) HP verloren.)',
        heal4: '* (HP vollständig aufgebraucht.)',
        heal5: '* (Du hast $(x) HP dazugewonnen.)',

        item1: 'NUTZE',
        item2: 'RÜSTEN',
        item3: 'INFO',
        item4: 'FALLEN',

        load1: 'Fortfahren',
        load2: 'Beobachten',
        load3: 'Reset',
        load4: 'Wahres Reset',

        name1: 'Nenne den gestrandeten Menschen',
        name2: 'Zurück',
        name3: 'löschen',
        name4: 'Fertig',
        name5: '§fill=#808080§ [ESC] - Beenden / [ENTER] - Fertig',

        save1: 'Speichern',
        save2: 'Zurückkehren',
        save3: 'Datei gespeichert.',

        settings1: 'EINSTELLUNGEN',
        settings2: 'VERLASSEN',
        settingsprompt1: '-> SPRACHE & MUSIK',
        settings3: 'SPRACHE',
        settings3a: 'DEUTSCH',
        settings4: 'SOUNDEFFEKTE',
        settings5: 'MUSIK',
        settings6: 'SCHICKE GRAFIKEN',
        settingsprompt2: '-> GAMEPLAY & GRAFIK',
        settings6a: 'CHARAKTER LAUFEN',
        settings6b: 'FARBIGE SPRITES',
        settings7: 'BLINKENDE BILDER',
        settings7a: 'NORMAL',
        settings7b: 'REDUZIERT',
        settings8: 'MOBILE EINSTELLUNGEN',
        settings9: 'TOTE ZONE',
        settings10: 'MOD ORDNER ÖFFNEN',
        settings11: 'NEUSTART',
        border: {
            option: 'SPIELRAND',
            list: [
                'KEINER',
                'DYNAMISCH',
                'EINFACH',
                'STAR',
                'OUTLANDS',
                'OUTLANDS (BATTLE)',
                'TORIEL HAUS',
                'STARTON',
                'STARTON (BATTLE)',
                'FOUNDRY',
                'FOUNDRY (BATTLE)',
                'AERIALIS',
                'AERIALIS (BATTLE)',
                'Freizeitzentrum',
                'REC CENTER (BATTLE)',
                'CORE',
                "CORE (BATTLE)",
                'ZITADELLE',
                'ASGORE HAUS',
                'ARCHIV SECHS',
                'ASRIEL BATTLE',
                'BRIGHT GALAXY',
                'NEUE WELT',
                'NEW WORLD (WITH CUP)',
                '§fill=#808080§(GESPERRT)'
            ]
        },
        mobile: {
            title: 'MOBILE STEUERUNGEN',
            controlOpacity: 'TRANSPARENZ EINSTELLEN',
            controlType: 'STEUERUNGSTYP',
            enableDiagonal: 'PFEILTASTEN-ANORDNUNG',
            enableSingleArrow: 'EINZELNE DIREKTE TASTE',

            fourKey: '\u4dc8 4-KEY',
            eightKey: '\u4dc9 8-KEY',
            deadZone: 'TOTE ZONE',
            toleranceAngle: 'TOLERANZ WINKEL',

            loadDefault: 'LADEN DER STANDARDKONFIGURATION',
            enableMultiConfig: 'SCHNELLWECHSEL',
            invertButtonPos: 'TASTENPOSITION UMKEHREN',

            prompt1: '--- PROFIL AUSWÄHLEN ---',
            prompt2: '--- ALLGEMEINE EINSTELLUNGEN ---',
            prompt3: '--- CONTROL-EINSTELLUNGEN ---',
            prompt4: '--- TASTEN ÄNDERN ---',

            nextpage: 'NÄCHSTE SEITE >',
            prepage: '< VORHERIGE SEITE',

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

            ShowFullScrKey: 'Vollbild-Schaltfläche',

            xPos: 'MITTE X POSITION',
            yPos: 'MITTE Y POSITION',
            size: 'TASTENGRÖSSE',
            radius: 'KREISRADIEN',

            keysettings: 'TASTE ANPASSEN',
            keyprompt0: '§fill=#ffd700§>> §fill=#fff§BEREITSTELLUNG: §fill=#00ffff§$(x) §fill=#808080§(Drücke [R], um zurückzusetzen)',
            keyprompt1: '§fill=#fff§FORTSCHRITT: §fill=#00ffff§($(x)§fill=#fff§/§fill=#00ffff§3)',
            keyprompt1a: ' [1] Anfangs Platzierung der Tasten',
            keyprompt1b: ' [2] Feinabstimmung der Position',
            keyprompt1c: ' [3] Tasten Größenanpassung',
            keyprompt1d:
                '§fill=#00ff00§*** Tastenposition einrichten  \n§fill=#fff§Drücke [L] (oben links), um zu starten',
            keyprompt1e: '§fill=#00ff00§*** Einrichtung abgeschlossen  \n§fill=#fff§Nun kannst du die anderen Tasten einrichten.',
            keyprompt2: '§fill=#4169e1§--- ANLEITUNG ---',
            keyprompt2a:
                '§fill=#fff§* Ziehe §fill=#00ffff§$(x)§fill=#fff§, um die Anfangsposition festzulegen  \n§fill=#ffd700§* Drücke [L] §fill=#808080§, um die Platzierung zu bestätigen  \n§fill=#ffd700§* Drücke [R] §fill=#808080§, um den Button wiederherzustellen, falls er verloren geht  \n§fill=#808080§Die Position kann im nächsten Schritt angepasst werden',
            keyprompt2b:
                '§fill=#fff§* Verwende §fill=#ffd700§[OBEN/UNTEN/LINKS/Rechts]§fill=#fff§ für präzise Anpassungen  \n§fill=#ffd700§* Drücke [R] §fill=#808080§, um die vorherige Position wiederherzustellen  \n§fill=#808080§Referenzkoordinaten werden unten angezeigt  \n§fill=#ffd700§* Drücke [L] §fill=#808080§, um zu bestätigen',
            keyprompt2c:
                '§fill=#fff§* Passen Sie die Größe mit §fill=#ffd700§[-5] [-1] [+1] [+5]§fill=#fff§ an  \n§fill=#ffd700§* Drücke [R] §fill=#808080§, um die Standardgröße wiederherzustellen  \n§fill=#808080§Der aktuelle Größenwert wird unten angezeigt  \n§fill=#ffd700§* Drücke [L] §fill=#808080§, um zu bestätigen',
            keyprompt3a: '§fill=#4169e1§-> §fill=#fff§POSITION:  \n§fill=#00ffff§X=$(x), Y=$(y)',
            keyprompt3b: '§fill=#4169e1§-> §fill=#fff§GRÖßE: §fill=#00ffff§$(x)',

            helper_loadDefault:
                '§fill=#ff0§Drücke [Z]§fill=#808080§, um deine Einstellungen auf die Standardwerte zurückzusetzen.  \nDies wird alle aktuellen benutzerdefinierten Konfigurationen verwerfen und \ndie ursprünglichen Einstellungen wiederherstellen.',
            helper_enableMultiConfig:
                '§fill=#ff0§Drücke [Z]§fill=#808080§ um die Konfigurations-Buttons anzuzeigen/zu verbergen.\nBei Aktivierung erscheinen fünf Zahlen-Tasten ([0] - [4]) links auf dem Bildschirm.\n§fill=#fff§Diese Tasten ermöglichen schnelles Wechseln zwischen den Konfigurationsoptionen.§fill=#fff§',
            helper_controlType:
                '§fill=#ff0§Drücke [Z]§fill=#808080§, um zwischen zwei Steuerungsoptionen zu wechseln:  \n§fill=#ff0§1. Richtungstasten§fill=#808080§: Klassische Pfeiltasten  \n§fill=#ff0§2. Virtueller Joystick§fill=#808080§: Touchscreen-freundliche Steuerung',
            helper_controlOpacity:
                '§fill=#ff0§Verwende die PFEILTASTEN LINKS oder RECHTS§fill=#808080§, um die Tasten-Transparenz anzupassen.  \nHöhere Werte machen die Tasten sichtbarer, niedrigere Werte machen sie durchsichtiger.',
            helper_enableDiagnal:
                '§fill=#ff0§Drücke [Z]§fill=#808080§, um diagonale Bewegungen ein- oder auszuschalten.  \nWenn aktiviert, werden beim Halten einer Richtungstaste  \n§fill=#ff0§zwei zusätzliche Pfeile§fill=#808080§ für diagonale Bewegung angezeigt.',
            helper_deadZone:
                "§fill=#ff0§Benutze die PFEILTASTEN LINKS oder RECHTS§fill=#808080§, um die Joystick-Empfindlichkeit anzupassen.\n§fill=#fff§Die Totzone ist der zentrale Bereich, in dem Joystickbewegungen nicht erkannt werden§fill=#808080§.\nGrößere Totzone = weniger empfindliche Steuerung.",
            helper_toleranceAngle:
                '§fill=#ff0§Verwende die PFEILTASTEN LINKS oder RECHTS§fill=#808080§, um die Winkelempfindlichkeit des Joysticks\nanzupassen. §fill=#fff§Dies bestimmt, wie präzise deine Bewegungen sein müssen§fill=#808080§.  \nWinkel über 45° lösen diagonale Bewegungen aus.',
            helper_showFullScrKey:
                '§fill=#ff0§Drücke [Z]§fill=#808080§ um die Sichtbarkeit der\n§fill=#fff§Vollbild-Schaltfläche umzuschalten§fill=#808080§.',
            helper_modifyButtons:
                '§fill=#ff0§Drücke [Z]§fill=#808080§, um das Tastenlayout anzupassen.  \nDu kannst sowohl die §fill=#ff0§Größe als auch die Position§fill=#808080§ aller Tasten ändern.  \nEin Schritt-für-Schritt-Leitfaden führt dich durch den Prozess.',
            helper_singleArrow:
                '§fill=#ff0§Drücke [Z]§fill=#808080§, um die individuellen Einstellungen für die Richtungstasten zu aktivieren oder zu deaktivieren.  \nWenn aktiviert, kannst du §fill=#fff§die Position und Größe jeder Richtungstaste unabhängig§fill=#808080§ anpassen, um mehr Flexibilität zu bieten.',
            helper_invertButtonPos:
                '§fill=#ff0§Drücke [Z]§fill=#808080§, um die §fill=#fff§Taste für die Button-Position umkehren§fill=#808080§ umzuschalten.\nWenn aktiviert, wird das Layout der virtuellen Navigationstasten für bessere Zugänglichkeit oder persönliche Vorlieben von links nach rechts gespiegelt.'
        },

        sidebar1: 'ITEM',
        sidebar2: 'STAT',
        sidebar3: 'HANDY',
        sidebar4: 'CONF',
        sidebar5: 'S',

        start1: [
            '--- Anweisung ---',
            '[Z oder ENTER] - Bestätigen',
            '[X oder SHIFT] - Abbrechen',
            '[C oder STRG] - Menü (Im Spiel)',
            '[F4] - Vollbild',
            '[Drücke ESC] - Neustart',
            'Wenn die HP 0 sind, verlierst du.'
        ],
        start2: 'Spiel beginnen',

        stat1: 'AT',
        stat2: 'DF',
        stat3: 'WAFFEN',
        stat4: 'RÜST',
        stat5: 'GOLD',
        stat6: 'EXP',
        stat7: 'NEXT',
        stat8: '§fill=#ff0§Warnung:\nNicht\nkanonische\nZeitlinie.',
        stat9: 'TÖTET',
        stat10: 'SCHIKANIEREN',
        stat11: 'FLIRTEN',
        stat12: 'STATUS',
        stat13: '\"$(x)\"',

        story1: ['<24>{#p/storyteller}Vor langer Zeit herrschten zwei Spezies über das Sonnensystem: MENSCHEN und MONSTER.{^35}{}'],
        story2: ['<24>Mit der Zeit brach ein Krieg zwischen den beiden Spezies aus.{^35}{}'],
        story3: ["<24>Nachdem der Heimatplanet der MONSTER zerstört worden war, erklärten die MENSCHEN ihren Sieg.{^35}{}"],
        story4: ['<24>Die verbliebenen MONSTER wurden in einen verlassenen Außenposten verbannt.{^35}{}'],
        story5: ['<24>Ein mächtiges Kraftfeld wurde errichtet, und die MONSTER wurden eingeschlossen.{^35}{}'],
        story6: ['<24>Viele Jahre später.{^8}.{^8}.{^35}{}'],
        story7: ['<#24>     EBOTT SECTOR     \n         251X{^35}{}'],
        story8: ['<24>Es heißt, es gebe einen Ort, von dem Raumschiffe nie zurückkehren.{^35}{}'],
        story9: ['<24>{^100}{}'],
        story10: ['<24>{^100}{}'],
        story11: ['<24>{^35}{}']
    },

    timeline: {
        main: 'Fortsetzen der Haupt-Zeitlinie',
        main_ex: 'Canon Timeline starten',
        timelines: 'Weitere Slots',
        bisect: '  Spalten',
        delete: '   Löschen',
        instruction: '[ESC] zum Abbrechen /\n[ENTER] zum Bestätigen',
        instruction_gamepad: 'Drücke eine beliebige Taste auf deinem Gamepad, um die Tastatur zu öffnen.',
        launch: 'Start',
        rename: 'Umbenen',
        create: 'Neu erstellen',
        placeholder: 'Gib den Namen der\nZeitlinie ein.',
        confirm: 'Bist du sicher?'
    }
};


// END-TRANSLATE
