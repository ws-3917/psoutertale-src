// START-TRANSLATE

export default {
    battle: {
        death0: ['(Մեծ շունջ մը կ\'առնես։)', "(Հաստատամտութեամբ լեցուն ես։)"],
        death1: ['Դեռ չ\'ես կրնար յոյսդ կտրել...', '$(name)։\nՀաստատամիտ մնացիր...'],
        death2: ['Մեր ճակատագիրը քեզի կը մնայ...', '$(name)։\nՀաստատամիտ մնացիր...'],
        death3: ["Լա՜ւ պիտի ըլլաս։", '$(name)։\nՀաստատամիտ մնացիր...'],
        death4: ["Յոյսդ մի՜ կտրեր։", '$(name)։\nՀաստատամիտ մնացիր...'],
        death5: ['Հիմա պիտի չի՜ վերջանայ։', '$(name)։\nՀաստատամիտ մնացիր...'],

        flee1: '    * Փախեցար...',
        flee2: "    * Ես գացի։",
        flee3: "    * Աւելի լաւ ընելիքներ ունիմ։",
        flee4: "    * Ինծի մի` ուշացներ։",
        flee5: '    * Փախեցար $(x) EXP-ով\n      եւ $(y)Ո-ով։',

        mercy_assist: '* Օգնել',
        mercy_flee: '* Փախիլ',
        mercy_spare: '* Ներել',

        victory1: '<32>{#p/story}* ՅԱՂԹԵՑԻ՜Ր։\n* $(x) EXP ու $(y)Ո շահեցար։',
        victory2: '<32>{#p/story}* ՅԱՂԹԵՑԻ՜Ր։\n* $(x) EXP ու $(y)G շահեցար։\n* LOVE-դ բարձրացաւ։'
    },

    developer: {
        console: {
            header: 'ՍԽԱԼ',
            p_resume: {
                header: 'ԱՐՁԱԿԵԼ',
                resume: 'Կոխել Արձակելու'
            },
            blurb: 'Սխալ մը պատահեցաւ։ Հաճիս նկար\nղրկէ` հնարիչին։'
        },
        control: {
            tab: 'ԿԱՐԳԱԴՐԵԼ',
            headers: ['ԸՆԴՀԱՆՈՒՐ', 'ԿՌԻՒ'],
            items: [
                [
                    'ՃիշտԵրաժշտ.',
                    'ՃշտԽաղցող',
                    'ԱնեզրՈ',
                    'Շօշափել',
                    'Input',
                    'Movement',
                    'Noclip',
                    'Save',
                    'SkipText',
                    'Freecam'
                ],
                [
                    'CanAssist',
                    'ClearBox',
                    'Դուրս',
                    'ResetBox',
                    'ResetMenu',
                    'ԿրնալՓախիլ',
                    'ԱնեզրHP',
                    'PacifyAll',
                    'Անձնասպանութիւն',
                    'ԲոլորիՏկարացնել'
                ]
            ],
            p_speed: {
                fps: '$(x) FPS',
                halt: 'Կանք',
                header: 'ԽԱՂԻ ԱՐԱԳՈՒԹԻՒՆ',
                next: 'Աւելի',
                prev: 'Քիչ',
                sec: '$(x)երկվ/frame'
            }
        },
        godhome: {
            tab: 'ԱՍՏՈՒԱԾԱՏՈՒՆ',
            p_teleport: {
                header: 'ՍԵՆԵԱԿ',
                action: 'Teleport'
            },
            p_encounter: {
                header: 'ՀԱՆԴԻՊՈՒՄ',
                action: 'Սկսիլ'
            },
            p_armor: {
                header: 'ԶՐԱՀ'
            },
            p_weapon: {
                header: 'ԶԷՆՔ'
            }
        },
        inspect: {
            tab: 'INSPECT',
            headers: ['LAYERS', 'ՏԵՍԱԿՆԵՐ'],
            switches: [
                ['Base', 'Տակ', 'Գլխաւոր', 'Վեր', 'Կարգաւորում'],
                ['Hitbox', 'Նկար', 'Գրութիւն']
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
            debug_instructions: 'Press [TAB] to cycle debug info',
            debug: {
                a: 'A',
                acceleration: 'Acceleration',
                active: 'Active',
                alpha: 'Alpha',
                anchor: 'Anchor',
                b: 'B',
                blend: 'Blend',
                border: 'Border',
                compute: 'Computed Size',
                content: 'Content',
                crop: 'Crop',
                down: 'Down',
                duration: 'Duration',
                exp: 'EXP',
                extent: 'Ծաւալ',
                f: 'F',
                face: 'Դէմք',
                false: 'Սխալ',
                fill: 'Լեցնել',
                fontFamily: 'Տառատեսակի Ընտանիք',
                fontSize: 'Տառերու Չափ',
                frames: 'Նկարներ',
                gravity: 'Ծանրաբարոյութիւն',
                group: 'Խումբ',
                hp: 'HP',
                index: 'Index',
                inert: 'Inert',
                key: 'Բանալի',
                lastSavedTime: 'Last Saved Time',
                layer: 'Layer',
                layers: 'Layers',
                left: 'Left',
                metadata: 'Metadata',
                music: 'Music',
                namespace: 'Namespace',
                none1: 'NONE',
                none2: 'none',
                objects: 'Objects',
                oversaver: 'Oversaver',
                parallax: 'Parallax',
                position: 'Position',
                primed: 'Primed',
                priority: 'Priority',
                registry: 'ԱՐՁԱՆԱԳՐՈՒԹԻՒՆ',
                renderer: 'Render Ընող',
                resources: 'Միջոցներ',
                reverse: 'Հակառակ',
                right: 'Աջ',
                room: 'Սենեակ',
                roomState: 'Սենեակի Վիճակ',
                rotation: 'Թաւալում',
                s: 'S',
                scale: 'Աստիճան',
                shopSelection: 'Խանութի Ընտրելը',
                size: 'Չափը',
                spacing: 'Տեղ Տալ',
                spin: 'Դարձուածք',
                sprites: 'Խաղի Նկարներ',
                step: 'Քայլ',
                stroke: 'Stroke',
                subcrop: 'Subcrop',
                talk: 'Խօսք',
                target: 'Նշան',
                text: 'Գրութիւն',
                time: 'Ժամ',
                tint: 'Երանգ',
                trackedAssets: 'Հետեւուած Կալուածամասներ',
                true: 'Ճիշտ',
                unknown: 'ՉԻ ԳԻՏՑՈՒԱԾ',
                up: 'Վեր',
                vars: 'Vars',
                velocity: 'Երագութիւն',
                volatile: 'Սնկայուն'
            }
        },
        savemod: {
            tab: 'ՊԱՀԱՄՈՏ',
            header1: 'ԿԱՐԳ ՓՈԽԵԼ',
            domains: [
                'Տեղեկութիւն (Պուլեան)',
                'Տեղեկութիւն (Թիւ)',
                'Տեղեկութիւն (Թելեր)',
                'Դրօշեր (Պուլեաններ)',
                'Դրօշեր (Թիւեր)',
                'Դրօշեր (Թելեր)'
            ],
            p_page: {
                header: 'ՆԱՒԱՐԿՈՒԹԻՒՆ',
                prev: 'Առաջ',
                next: 'Յաջորդ'
            },
            prompt: 'Գրէ` Արժէքը',
            back: 'Ետ'
        },
        storage: {
            tab: 'ՄԹԵՐԱՆՈՑ',
            header: 'ՄԹԵՐԱՆՈՑ ՓՈԽԵԼ',
            p_container: { header: 'ԸՆՏՐՈՒՄ', prev: 'Առաջ', next: 'Յաջորդ' },
            display: { inventory: 'Կահագիր', dimboxA: 'Համ. Տուփ Ա', dimboxB: 'Համ. Տուփ Բ' }
        }
    },

    dialog: {
        dialog_clear_title: 'Սրբել Կարգը',
        dialog_notice_title: 'Լուր',
        dialog_clear_mobile: 'Սրբել Հեռաձայնի Յատկութիւններ',
        dialog_open: { buttonLabel: 'Բանալ', name: 'SAVE-ի Կարգեր', title: 'Բանալ Կարգ' },
        dialog_save: { buttonLabel: 'Save', name: 'SAVE-ի Կարգեր', title: 'Պահել Կարգ' },
        error_load: 'Այդ կարգը չ\'աշխատիր։',
        message_alert: ['ԼԱՒ'],
        message_confirm: ['Հանել', 'ԼԱՒ'],
        prompt_clear: 'Սրբե՞լ այս կարգը։',
        prompt_demo: 'SAVE-ի կարգդ OUTERTALE\ndemo-էն տեղափոխուած է\ntimeline թորիծի։',
        prompt_save: 'Պահե՞լ այս կարգը։',
        prompt_clear_mobile: 'Սրբե՞լ հերաձայնի վերաբերեալ ընտրութիւններ։\nՔու SAVE-ի կարգդ\nպիտի չի սրբուի։',
        prompt_save_alternate: 'Վարի գրութիւնը տա`ր\nJSON կարգի որ պահես\nքու համակարգիչիդ։',
        prompt_open: 'Բանա՞լ այս կարգը։'
    },

    extra: {
        credits: [
            [
                '§fill=#ff0§< ՀՆԱՐԻՉ >§fill=#fff§',
                'spacey_432',
                '',
                '§fill=#ff0§< ԳՐՈՂ >§fill=#fff§',
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
                '§fill=#ff0§< ԳՐՈՂ >§fill=#fff§',
                'ThatGuyWhoLikesFood',
                'Turbulation',
                'Zaxento The Greedy',
                '',
                '§fill=#ff0§< ԳԾԱԳՐԻՉ >§fill=#fff§',
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
                '§fill=#ff0§< ԳԾԱԳՐԻՉ >§fill=#fff§',
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
                '§fill=#ff0§< ԳԾԱԳՐԻՉ >§fill=#fff§',
                'supper12',
                'Valor52',
                'Zaxento The Greedy',
                '',
                '§fill=#ff0§< ՄԱՍՆԱԳԷՏ >§fill=#fff§',
                'Codetoil',
                'ryi3r',
                'ws3917',
                '',
                '§fill=#ff0§< ՔՆՆԻՉ >§fill=#fff§',
                'Alden',
                'Aspey',
                'Aster',
                'Balgamlı Kedi'
            ],
            [
                '§fill=#ff0§< ՔՆՆԻՉ >§fill=#fff§',
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
                '§fill=#ff0§< ՔՆՆԻՉ >§fill=#fff§',
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
                '§fill=#ff0§< ՔՆՆԻՉ >§fill=#fff§',
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
                '§fill=#ff0§< ՔՆՆԻՉ >§fill=#fff§',
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
                '§fill=#ff0§< ՔՆՆԻՉ >§fill=#fff§',
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
                '§fill=#ff0§< ՅԱՏՈՒԿ ՇՆՈՐՀԱԿԱԼՈՒԹԻՒՆՆԵՐ >§fill=#fff§',
                'Alden',
                '§fill=#808080§Հոն ըլլալու համար երբ որ ես\nմէկու մը պէտք ունէի, եւ\nինծի կեանքի դաս սորվեցնելու համար որոնք\nինծի աւելի լաւ անձ ըրած են։\n§fill=#fff§'
            ],
            [
                '§fill=#ff0§< ՅԱՏՈՒԿ ՇՆՈՐՀԱԿԱԼՈՒԹԻՒՆՆԵՐ >§fill=#fff§',
                'Aster',
                '§fill=#808080§Ամենամտերիմ անձերէն մէկը ըլլալու համար,\nառաջին անձը որ հաւատայ\nիմ գաղափարիս, ու ինծի\nոգեւորելոի համար որ խաղը վերջացնեմ։§fill=#fff§'
            ],
            [
                '§fill=#ff0§< ՅԱՏՈՒԿ ՇՆՈՐՀԱԿԱԼՈՒԹԻՒՆՆԵՐ >§fill=#fff§',
                'Balgamlı Kedi',
                "§fill=#808080§Քովս ըլլալու համար բոլոր\nշինարարութեան շրջաններու ատեն\nսկիզբէն։ Ինչ որ ըլլար,\nմիշտ հոն եղած է օգնելու։§fill=#fff§"
            ],
            [
                '§fill=#ff0§< ՅԱՏՈՒԿ ՇՆՈՐՀԱԿԱԼՈՒԹԻՒՆՆԵՐ >§fill=#fff§',
                'Ghostly',
                '§fill=#808080§Բանաւոր անձ մը ըլլալու\nբազմաթիւ մասերուն մէջ,\nու ինծի քաջալերելու որ խաղին փորձելը\nլուրջի առնեմ։§fill=#fff§'
            ],
            [
                '§fill=#ff0§< ՅԱՏՈՒԿ ՇՆՈՐՀԱԿԱԼՈՒԹԻՒՆՆԵՐ >§fill=#fff§',
                'Zaxento The Greedy',
                '§fill=#808080§Արճանահաւատ ու\nճշմարիտ ըլլալու, ինծի բազմաթիւ\nգաղափարներ ու խրատներ տալու, ու\nվստահելի ըլլալու մեր ծանօթացած օրէն։§fill=#fff§'
            ],
            [
                '§fill=#ff0§< ՅԱՏՈՒԿ ՇՆՈՐՀԱԿԱԼՈՒԹԻՒՆՆԵՐ >§fill=#fff§',
                'ThatGuyWhoLikesFood',
                '§fill=#808080§For helping me write crucial\nparts of the game, supporting my\nvision, and helping me express\nmyself in a whole new way.§fill=#fff§'
            ],
            [
                '§fill=#ff0§< ՅԱՏՈՒԿ ՇՆՈՐՀԱԿԱԼՈՒԹԻՒՆՆԵՐ >§fill=#fff§',
                'Bilge \"mnwary\"',
                "§fill=#808080§For being there to help towards\nthe end of development, and\nensuring the game's writing\nreaches its full potential.§fill=#fff§"
            ],
            ['Brought to you by §fill=#ff0§The Mavis & Co.§fill=#fff§']
        ],

        final_frontier: {
            header: '(( CAST ))',
            opponents: {
                froggit: {
                    name: 'FROGGIT',
                    author: 'ScarletScaledDragon',
                    text: {
                        basic: 'Pondering\nLife',
                        spare: 'Professional\nFrog',
                        flirt: 'Pondering\nLove',
                        bully: 'Hopping In\nFear'
                    }
                },
                whimsun: {
                    name: 'FLUTTERLYTE',
                    author: 'ScarletScaledDragon',
                    text: {
                        basic: 'Learning To\nFly',
                        spare: 'Emboldening\nAviator',
                        flirt: 'Searching The\nSkies',
                        bully: 'Evasively\nManeuvering'
                    }
                },
                moldsmal: {
                    name: 'GELATINI',
                    author: 'spacey_432',
                    text: {
                        basic: 'Found A New\nSpace Station',
                        spare: 'Backup\nDancer',
                        flirt: 'Exotic Jelly\nDancer',
                        bully: 'Found A New\nGalaxy'
                    }
                },
                loox: {
                    name: 'OCULOUX',
                    author: 'ScarletScaledDragon',
                    text: {
                        basic: 'Slightly\nBully-Like',
                        spare: 'Reformed\nBully',
                        flirt: 'Slightly\nFlirtatious',
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

        end1: 'THE END',
        end2: 'THE END...?',

        restartText1: 'Restarting',
        restartText2: 'Restarting.',
        restartText3: 'Restarting..',

        title: 'OUTERTALE',
        title_timeline: 'OUTERTALE...?'
    },

    gamepad: {
        prompt: 'GAMEPAD SETUP',
        prompt_desc:
            'Use an input on your gamepad to assign\nit to the in-game action.\n\nUse the input again to confirm, or use\nother inputs to assign those as well.\n\nPress ESC to skip setup.',
        prompt_counter: 'Inputs Assigned: $(x)',
        z: '[Z or ENTER] - Confirm',
        x: '[X or SHIFT] - Cancel',
        c: '[C or CTRL] - Menu (In-game)',
        u: '[UP or W] - Move Up',
        l: '[LEFT or A] - Move Left',
        d: '[DOWN or S] - Move Down',
        r: '[RIGHT or D] - Move Right',
        f: '[F4] - Fullscreen',
        prompt_done: 'Setup complete.\nPress any button to continue.',
        prompt_done_browser: '\nNote: On this platform, the gamepad may\nnot always be able to enter fullscreen.',
        prompt_load:
            'A gamepad has already been set up.\nPress any button to continue, or press\nany button three times in rapid\nsuccession to restart setup.\n\nPress ESC to skip setup.'
    },

    general: {
        asriel: 'Asriel',
        asriel_location: 'The Oblivion',
        disabled: 'DISABLED',
        enabled: 'ENABLED',
        finish: 'Press [X] to Finish',
        frisk: 'Frisk',
        g: 'G',
        hp: 'HP',
        inf: '\u221e',
        landing1: '[PRESS Z OR ENTER]',
        lv: 'LV',
        mystery1: '§mystify=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz§aaaaaa§mystify=§',
        mystery2: '{@mystify=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz}aaaaaa{@mystify=}',
        mystery2l: '{@mystify=abcdefghijklmnopqrstuvwxyz}aaaaaa{@mystify=}',
        mystery2u: '{@mystify=ABCDEFGHIJKLMNOPQRSTUVWXYZ}aaaaaa{@mystify=}',
        no: 'No',
        nominal: '§fill=#0f0§NOMINAL',
        percent: '$(x)%',
        player: 'player',
        settings: 'Settings',
        shopg: 'G',
        unknown: '?',
        xm: 'XM',
        yes: 'Yes'
    },

    menu: {
        box1: 'INVENTORY',
        box2: 'BOX',
        key1: 'KEYRING',

        confirm1: 'Is this name correct?',
        confirm2: 'A name has already\nbeen chosen.',
        confirm3: 'Go back',

        footer: 'OUTERTALE V5.06 Preview 5 (c) 2025 SPACEY_432',

        heal1: '* (HP fully restored.)',
        heal2: '* (You recovered $(x) HP.)',
        heal3: '* (You lost $(x) HP.)',
        heal4: '* (HP fully depleted.)',
        heal5: '* (You gained $(x) HP.)',

        item1: 'USE',
        item2: 'EQUIP',
        item3: 'INFO',
        item4: 'DROP',

        load1: 'Continue',
        load2: 'Observe',
        load3: 'Reset',
        load4: 'True Reset',

        name1: 'Name the stranded human.',
        name2: 'Quit',
        name3: 'Backspace',
        name4: 'Done',
        name5: '§fill=#808080§ [ESC] - Quit / [ENTER] - Done',

        save1: 'Save',
        save2: 'Return',
        save3: 'File saved.',

        settings1: 'SETTINGS',
        settings2: 'EXIT',
        settingsprompt1: '-> LANGUAGE & MUSIC',
        settings3: 'LANGUAGE',
        settings3a: 'ԱՐԵՒՄՏԱՀԱՅԵՐԷՆ',
        settings4: 'SOUND FX',
        settings5: 'MUSIC',
        settings6: 'FANCY GRAPHICS',
        settingsprompt2: '-> GAMEPLAY & GRAPHICS',
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
                'NONE',
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
            keyprompt2: '§fill=#4169e1§--- INSTRUCTION ---',
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

        sidebar1: 'ITEM',
        sidebar2: 'STAT',
        sidebar3: 'CELL',
        sidebar4: 'CONF',
        sidebar5: 'S',

        start1: [
            '--- Instruction ---',
            '[Z or ENTER] - Confirm',
            '[X or SHIFT] - Cancel',
            '[C or CTRL] - Menu (In-game)',
            '[F4] - Fullscreen',
            '[Hold ESC] - Restart',
            'When HP is 0, you lose.'
        ],
        start2: 'Begin Game',

        stat1: 'AT',
        stat2: 'DF',
        stat3: 'ԶԷՆՔ',
        stat4: 'ԶՐԱՀ',
        stat5: 'GOLD',
        stat6: 'EXP',
        stat7: 'NEXT',
        stat8: '§fill=#ff0§Warning:\nNon-canon\ntimeline.',
        stat9: 'KILLS',
        stat10: 'BULLY',
        stat11: 'FLIRT',
        stat12: 'STATUS',
        stat13: '\"$(x)\"',

        story1: ['<24>{#p/storyteller}Long ago, two species ruled the solar system: HUMANS and MONSTERS.{^35}{}'],
        story2: ['<24>As time passed, a war broke out between the two species.{^35}{}'],
        story3: ["<24>After the MONSTERS' home planet was destroyed, HUMANS declared victory.{^35}{}"],
        story4: ['<24>The remaining MONSTERS were banished to an abandoned outpost.{^35}{}'],
        story5: ['<24>A powerful force field was erected, and the MONSTERS were sealed in.{^35}{}'],
        story6: ['<24>Many years later.{^8}.{^8}.{^35}{}'],
        story7: ['<#24>     EBOTT SECTOR     \n         251X{^35}{}'],
        story8: ['<24>Tales speak of a place from which spacecraft never return.{^35}{}'],
        story9: ['<24>{^100}{}'],
        story10: ['<24>{^100}{}'],
        story11: ['<24>{^35}{}']
    },

    timeline: {
        main: 'Resume Canon Timeline',
        main_ex: 'Start Canon Timeline',
        timelines: 'Other Slots',
        bisect: 'Bisect',
        delete: 'Delete',
        instruction: '[ESC] to Cancel / [ENTER] to Confirm',
        instruction_gamepad: 'Press any button on your gamepad to open the keyboard.',
        launch: 'Launch',
        rename: 'Rename',
        create: 'Create New',
        placeholder: 'Enter Timeline Name',
        confirm: 'Are You Sure?'
    }
};


// END-TRANSLATE
