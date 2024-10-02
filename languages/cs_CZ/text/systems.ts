// START-TRANSLATE

export default {
   battle: {
      death0: [ '(Zhluboka se nadechnete.)', "(Jsi plný odhodlání.)" ],
      death1: [ 'Ještě se nesmíš vzdát...', '$(name)!\nZůstaňte odhodlaní...' ],
      death2: [ 'Náš osud spočívá na tobě...', '$(name)!\nZůstaňte odhodlaní...' ],
      death3: [ "Budeš v pořádku!", '$(name)!\nZůstaňte odhodlaní...' ],
      death4: [ "Neztrácejte naději!", '$(name)!\nZůstaňte odhodlaní...' ],
      death5: [ 'Teď to nemůže skončit!', '$(name)!\nZůstaňte odhodlaní...' ],

      flee1: '    *Utekl jsi...',
      flee2: "        * Jsem odsud pryč.",
      flee3: "    * Mám lepší práci.",
      flee4: "    * Nezpomaluj mě.",
      flee5: '    * Utekl jsi s $(x) BP\n      a $(y)Z.',

      mercy_assist: '* Asistence',
      mercy_flee: '* Utéct',
      mercy_spare: '* Ušetřete',

      victory1: '<32>{#p/story}* VYHRÁLI JSTE!\n* Dostali jste $(x) BP and $(y)Z.',
      victory2: '<32>{#p/story}* VYHRÁLI JSTE!\n* Dostali jste $(x) BP a $(y)Z.\n* Vaše ÚN vzrostla.'
   },

   developer: {
      console: {
         header: 'CHYBA',
         p_resume: {
            header: 'PROPUSTIT',
            resume: 'Klepnutím zavřít'
         },
         blurb: 'Došlo k chybě! Prosím o zaslání\nsnímek obrazovky vývojáři.'
      },
      control: {
         tab: 'ŘÍZENÍ',
         headers: [ 'GENERÁL', 'BITVA' ],
         items: [
            [
               'OpravitHudba',
               'OpravitHráč',
               'NekonečnýG',
               'Interagujte',
               'Vstup',
               'Pohyb',
               'Noclip',
               'Uložit',
               'PřeskočitText',
               'Vol.kam'
            ],
            [
               'MůžeAssist',
               'VymazBox',
               'Exit',
               'ResetBox',
               'ResetMenu',
               'MůžeUtéct',
               'NekonečnáHP',
               'PacifikVše',
               'Sebevražda',
               'OslabitVše'
            ]
         ],
         p_speed: {
            fps: '$(x) SZS',
            halt: 'Zastavit',
            header: 'RYCHLOST HRY',
            multiplier: '$(x)x ',
            next: 'Více',
            prev: 'Méně ',
            sec: '$(x)s/snímek'
         }
      },
      godhome: {
         tab: 'KMOTR',
         p_teleport: {
            header: 'POKOJ',
            action: 'Teleportovat'
         },
         p_encounter: {
            header: 'SETKÁNÍ',
            action: 'Start'
         },
         p_armor: {
            header: 'BRNĚNÍ'
         },
         p_weapon: {
            header: 'ZBRAŇ'
         }
      },
      inspect: {
         tab: 'PROZKOUMAT',
         headers: [ 'VRSTVY', 'TYPY' ],
         switches: [
            [ 'Základna', 'Pod', 'Hlavní', 'Nad', 'Menu' ],
            [ 'Hitbox', 'Skřítek', 'Text' ]
         ],
         p_explorer: {
            header: 'PRŮZKUMNÍK',
            layers: [ 'Základní (Průzkumník)', 'Níže (Průzkumník)', 'Hlavní (Průzkumník)', 'Nahoře (průzkumník)', 'Nabídka (průzkumník)' ],
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
         debug_instructions: 'Stisknutím klávesy [TAB] můžete cyklicky přepínat informace o ladění',
         debug: {
            a: 'A', 
            acceleration: 'Zrychlení',
            active: 'Aktivní',
            alpha: 'Alfa',
            anchor: 'Kotva',
            b: 'B', 
            blend: 'Směs',
            border: 'Hranice',
            compute: 'Vypočtená velikost',
            content: 'Obsah',
            crop: 'Plodina',
            down: 'Dolů',
            duration: 'Trvání',
            exp: 'BP',
            extent: 'Rozsah',
            f: 'F', 
            face: 'Obličej',
            false: 'Falešný',
            fill: 'Vyplnit',
            fontFamily: 'Rodina písem',
            fontSize: 'Velikost písma',
            frames: 'Snímky',
            gravity: 'Gravitace',
            group: 'Skupina',
            hp: 'ZB',
            index: 'Index',
            inert: 'Inertní',
            key: 'Klíč',
            lastSavedTime: 'Poslední uložený čas',
            layer: 'Vrstva',
            layers: 'Vrstvy',
            left: 'Vlevo',
            metadata: 'Metadata',
            music: 'Hudba',
            namespace: 'Jmen.prost.',
            none1: 'ŽÁDNÝ',
            none2: 'žádný',
            objects: 'Objekty',
            oversaver: 'Přílišný spořič',
            parallax: 'Paralaxa',
            position: 'Postavení',
            primed: 'Natřený základní barvou',
            priority: 'Priorita',
            registry: 'REGISTR',
            renderer: 'Vykreslovač',
            resources: 'Prostředky',
            reverse: 'Rezerva',
            right: 'Vpravo',
            room: 'Místnost',
            roomState: 'Stav místnosti',
            rotation: 'Rotace',
            s: 'S', 
            scale: 'Škála',
            shopSelection: 'Výběr obchodu',
            size: 'Velikost',
            spacing: 'Rozteč',
            spin: 'Příst',
            sprites: 'Skřítci',
            step: 'Krok',
            stroke: 'Mrtvice',
            subcrop: 'Dílčí plodina',
            talk: 'Hovořit',
            target: 'Cíl',
            text: 'Text',
            time: 'Čas',
            tint: 'Odstín',
            trackedAssets: 'Sledované datové zdroje',
            true: 'Pravdivý',
            unknown: 'NEZNÁMÝ',
            up: 'Nahoru',
            vars: 'Prom.',
            velocity: 'Rychlost',
            volatile: 'Nestálý'
         }
      },
      savemod: {
         tab: 'ULOŽMOD',
         header1: 'ULOŽIT EDITOR',
         domains: [
            'Data (logické hodnoty)',
            'Data (čísla)',
            'Data (řetězce)',
            'Příznaky (Booleans)',
            'Příznaky (Čísla)',
            'Příznaky (řetězce)'
         ],
         p_page: {
            header: 'NAVIGACE',
            prev: 'Před',
            next: 'Další'
         },
         prompt: 'Zadejte hodnotu',
         back: 'Zpět'
      },
      storage: {
         tab: 'SKLADOVÁNÍ',
         header: 'EDITOR ÚLOŽIŠTĚ',
         p_container: { header: 'SELEKCE', prev: 'Před', next: 'Další' },
         display: { inventory: 'Inventář', dimboxA: 'Roz. rámeček A', dimboxB: 'Roz. Rámeček B' }
      }
   },

   dialog: {
      dialog_clear_title: 'Vymazat soubor',
      dialog_notice_title: 'Oznámení',
      dialog_open: { buttonLabel: 'Otevřít', name: 'UKLÁDÁNÍ souborů', title: 'Otevřít soubor' },
      dialog_save: { buttonLabel: 'Uložit', name: 'UKLÁDÁNÍ souborů', title: 'Uložit soubor' },
      error_load: 'Tento soubor nebylo možné analyzovat.',
      message_alert: [ 'OK' ],
      message_confirm: [ 'Zrušit', 'OK' ],
      prompt_clear: 'Vymazat tento soubor?',
      prompt_demo: 'Váš soubor SAVE z\nOUTERTALE demo bylo\npřesunuto do slotu časové osy.',
      prompt_save: 'Uložit tento soubor?',
      prompt_save_alternate: 'Zkopírujte níže uvedený text do\nsoubor JSON pro jeho uložení\ndo vašeho zařízení.',
      prompt_open: 'Načíst tento soubor?'
   },

   extra: {
      credits: [
         [
            '§fill=#ff0§< VÝVOJÁŘ >§fill=#fff§',
            'spacey_432',
            '',
            '§fill=#ff0§< SPISOVATEL >§fill=#fff§',
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
            '§fill=#ff0§< SPISOVATEL >§fill=#fff§',
            'ThatGuyWhoLikesFood',
            'Turbulation',
            'Zaxento The Greedy',
            '',
            '§fill=#ff0§< UMĚLEC >§fill=#fff§',
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
            '§fill=#ff0§< UMĚLEC >§fill=#fff§',
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
            '§fill=#ff0§< UMĚLEC >§fill=#fff§',
            'supper12',
            'Valor52',
            'Zaxento The Greedy',
            '',
            '§fill=#ff0§< TECHNIK >§fill=#fff§',
            'Codetoil',
            'ryi3r',
            'ws3917',
            '',
            '§fill=#ff0§< ZKOUŠEČ >§fill=#fff§',
            'Alden',
            'Aspey',
            'Balgamlı Kedi',
            'Bilge \"mnwary\"'
         ],
         [
            '§fill=#ff0§< ZKOUŠEČ >§fill=#fff§',
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
            '§fill=#ff0§< ZKOUŠEČ >§fill=#fff§',
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
            '§fill=#ff0§< ZKOUŠEČ >§fill=#fff§',
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
            '§fill=#ff0§< ZKOUŠEČ >§fill=#fff§',
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
            '§fill=#ff0§< ZKOUŠEČ >§fill=#fff§',
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
            '§fill=#ff0§< ZVLÁŠTNÍ PODĚKOVÁNÍ >§fill=#fff§',
            'Alden',
            '§fill=#808080§Za to, že je tu pro mě, když\nPotřebuji někoho, o koho se může opřít, a\nUčí mě životní lekce, které\nze mě udělaly lepšího člověka.§fill=#fff§'
         ],
         [
            '§fill=#ff0§< ZVLÁŠTNÍ PODĚKOVÁNÍ >§fill=#fff§',
            'My Aster',
            '§fill=#808080§Za to, že je jedním z nejpřátelštějších\nlidé, které znám, první osoba\nvěřit v mou vizi a\ninspirující mě k dokončení hry.§fill=#fff§'
         ],
         [
            '§fill=#ff0§< ZVLÁŠTNÍ PODĚKOVÁNÍ >§fill=#fff§',
            'Balgamlı Kedi',
            "§fill=#808080§Za to, že je se mnou zůstal na každém\nfáze vývoje, již od\nzačátek. Bez ohledu na dobu,\nvždycky tu byl, aby pomohl.§fill=#fff§"
         ],
         [
            '§fill=#ff0§< ZVLÁŠTNÍ PODĚKOVÁNÍ >§fill=#fff§',
            'Ghostly',
            '§fill=#808080§Za to, že je hlasem rozumu, když\ntýká se to mnoha aspektů\nhry, a povzbuzuje mě, abych si vzal\ntestování vážně.§fill=#fff§'
         ],
         [
            '§fill=#ff0§< ZVLÁŠTNÍ PODĚKOVÁNÍ >§fill=#fff§',
            'Zaxento The Greedy',
            '§fill=#808080§Za to, že je spolehlivý, brutální\nupřímný, dává mi spoustu\nkritika a myšlenky a bytí\ndůvěryhodný ode dne, kdy jsme se potkali.§fill=#fff§'
         ],
         [
            '§fill=#ff0§< ZVLÁŠTNÍ PODĚKOVÁNÍ >§fill=#fff§',
            'ThatGuyWhoLikesFood',
            '§fill=#808080§Za pomoc při psaní zásadních\nčásti hry, podporující můj\nvize a pomáhá mi vyjádřit\nÚplně novým způsobem.§fill=#fff§'
         ],
         [
            '§fill=#ff0§< ZVLÁŠTNÍ PODĚKOVÁNÍ >§fill=#fff§',
            'Bilge \"mnwary\"',
            "§fill=#808080§Za to, že je tam byl, abys pomohl\nukončení vývoje a\nzajištění psaní hry\ndosahuje svého plného potenciálu.§fill=#fff§"
         ],
         [ 'Přináší vám §fill=#ff0§The Mavis & Co.§fill=#fff§' ]
      ],

      final_frontier: {
         header: '(( OBSAZENÍ ))',
         opponents: {
            froggit: {
               name: 'FROGGIT',
               author: 'ScarletScaledDragon',
               text: {
                  basic: 'Přemítání\no životě',
                  spare: 'Profesionální\nžába',
                  flirt: 'Přemítání\no lásce',
                  bully: 'Poskakování\nve strachu'
               }
            },
            whimsun: {
               name: 'FLUTTERLYTE',
               author: 'ScarletScaledDragon',
               text: {
                  basic: 'Učí se\nlétat',
                  spare: 'Povzbudivý\nletec',
                  flirt: 'Prohledávání\noblohy',
                  bully: 'Vyhýbavé\nmanévrování'
               }
            },
            moldsmal: {
               name: 'GELATINI',
               author: 'spacey_432',
               text: {
                  basic: 'Našel novou\nvesmírnou stanici',
                  spare: 'Doprovodný\nTanečník',
                  flirt: 'Exotická želé\nTanečnice',
                  bully: 'Objevil novou\ngalaxii'
               }
            },
            loox: {
               name: 'OCULOUX',
               author: 'ScarletScaledDragon',
               text: {
                  basic: 'Mírně\ntyranský',
                  spare: 'Reformovaný\ntyran',
                  flirt: 'Mírně\nkoketní',
                  bully: ''
               }
            },
            migosp: {
               name: 'SILENTE',
               author: 'ScarletScaledDragon',
               text: {
                  basic: 'Nesmírně\nPříjemné',
                  spare: 'Příležitostně\nsi užívá života',
                  flirt: 'Zamilovaní\nZ daleka',
                  bully: 'Popírač\nOhrožení'
               }
            },
            mushy: {
               name: 'MUSHY',
               author: 'Balgamlı Kedi & ScarletScaledDragon',
               text: {
                  basic: 'Střílí slepými\nNáboji',
                  spare: 'Kouzelník\nrychlého tahu',
                  flirt: 'Výstřel z\nPistole Srdcař',
                  bully: 'Stříká\na modlí se'
               }
            },
            finalghost: {
               name: 'LURKSALOT',
               author: 'spacey_432',
               text: {
                  basic: 'Drží se\nsami sebe',
                  spare: 'Vyhledání\nFyzického kontaktu',
                  flirt: 'Stoicky\nnezúčastněný',
                  bully: ''
               }
            },
            stardrake: {
               name: 'STARDRAKE',
               author: 'Burge',
               text: {
                  basic: 'Stále\nhledá smích',
                  spare: 'Poloúspěšný\nkomik',
                  flirt: 'Oblíbený\nu dospělý',
                  bully: ''
               }
            },
            chilldrake: {
               name: 'CHILLDRAKE',
               author: 'Burge',
               text: {
                  basic: 'Stále hledá\npodporovatele',
                  spare: 'Získal kultovní\nnásledovníky',
                  flirt: '­Výměna polibků\nPro fanoušky',
                  bully: 'Aktivista proti\nŠikaně'
               }
            },
            spacetop: {
               name: 'ASTRO SERF',
               author: 'DESM.al',
               text: {
                  basic: 'Přemýšlení o\njeho anténě',
                  spare: 'Rozhlasová\nsenzace',
                  flirt: 'Láska je\nVe vzduchu',
                  bully: '‘Nouzový vysílač'
               }
            },
            jerry: {
               name: 'JERRY',
               author: 'Discarded Vessel',
               text: {
                  basic: 'Každodenní\npříkop',
                  spare: 'Dostává se do\nPříkopů něco méně',
                  flirt: 'Na cestě k\nvykoupení',
                  bully: ''
               }
            },
            mouse: {
               name: 'WHIZKARAT',
               author: 'Zaxento The Greedy & semi',
               text: {
                  basic: 'Krize\nidentity',
                  spare: 'Nejnovější člen\nmyší společnosti',
                  flirt: 'Začíná si\nHrát s myšmi',
                  bully: 'Uháněl zpět do\nkočičí společnosti'
               }
            },
            doggo: {
               name: 'DOGGO',
               author: 'Discarded Vessel',
               text: {
                  basic: 'Věří ve\nvšemocný klíč',
                  spare: 'Našel vlastního vlka\ns vidoucím okem',
                  flirt: 'Zamilovaný do svého\nvlka s vidoucím okem',
                  bully: 'Běží ke svému vlkovi\ns vidoucím okem'
               }
            },
            lesserdog: {
               name: 'CANIS MINOR',
               author: 'major_memestar',
               text: {
                  basic: 'Hledání\nnáklonnosti',
                  spare: 'Našel milujícího\nmajitele',
                  flirt: 'Našel vlastního\nmilence',
                  bully: 'Zoufale touží\npo náklonnosti'
               }
            },
            dogs: {
               name: 'DOGAMY & DOGARESSA',
               author: 'major_memestar',
               text: {
                  basic: 'Stále přemýšlejí\no aportování',
                  spare: 'Úřadující šampióni\nv očích štěňat',
                  flirt: "Chyceni v pohledu\ntoho druhého",
                  bully: 'Obranné štěně-psí\nOči zapojené'
               }
            },
            greatdog: {
               name: 'CANIS MAJOR',
               author: 'major_memestar',
               text: {
                  basic: "Nevědomý si\nživotních změn",
                  spare: "Nadšeni životními\nzměnami",
                  flirt: "Dojatý životními\nZměnami",
                  bully: ''
               }
            },
            woshua: {
               name: 'SKRUBBINGTON',
               author: 'Discarded Vessel',
               text: {
                  basic: 'Pouze 99,1\nProcenta čisté',
                  spare: 'Výkonný mycí\nMotor',
                  flirt: 'Výrobce\nVířivky',
                  bully: 'Nadměrně výkonná\ntlaková myčka'
               }
            },
            moldbygg: {
               name: 'GELATA',
               author: 'spacey_432',
               text: {
                  basic: 'Hledá\nchůvu',
                  spare: 'Barová židle\nPoháněná slizem',
                  flirt: 'Sexy sitcom\nstálý',
                  bully: 'Oslavovaná wrestl-\n-ingová rekvizita'
               }
            },
            radtile: {
               name: 'RADTILE',
               author: 'Balgamlı Kedi & Zaxento The Greedy',
               text: {
                  basic: 'Válení se v\nnedokonalosti',
                  spare: 'Zlepšení jeho\nsebe-obrazu',
                  flirt: 'Randění s\nvlastním odrazem',
                  bully: 'Míří vstříc\nošklivé budoucnosti'
               }
            },
            shyren: {
               name: 'SHYREN',
               author: 'Ghostly',
               text: {
                  basic: 'Zpět k lekcím\nklavíru',
                  spare: "Nová hlavní zpěvačka \nspolečnosti Mettaton",
                  flirt: 'Zamilovaná\ndo ducha',
                  bully: "Nemůže zpívat\nbez syntezátoru"
               }
            },
            doge: {
               name: 'DOGE',
               author: 'major_memestar',
               text: {
                  basic: 'Cvičná seržantka\nna staveništi',
                  spare: 'Koupila doživotního\npředplatného lázní',
                  flirt: 'Poprvé pocítila\nštěněcí lásku',
                  bully: ''
               }
            },
            muffet: {
               name: 'MUFFET',
               author: 'major_memestar',
               text: {
                  basic: 'Hledá její\ndalší výplatu',
                  spare: 'Péče o\npavoučí klany',
                  flirt: 'Dohazovačka na\nPiknikové rande',
                  bully: ''
               }
            },
            pyrope: {
               name: 'HOTWIRE',
               author: 'semi',
               text: {
                  basic: 'Čeká, až\nrytmus klesne',
                  spare: 'Bleskurychlý\nrapper',
                  flirt: 'Stal se rapperem a\nautorem milostných písní',
                  bully: 'Rap bojující na\npokraji smrti'
               }
            },
            tsundere: {
               name: 'TSUNDERIDEX',
               author: 'spacey_432',
               text: {
                  basic: 'Letí hlouběji\ndo popírání',
                  spare: 'Plíží se k tobě\nwarpovou rychlostí',
                  flirt: 'Tsun být\nvaším dere-dere',
                  bully: 'Konečně potkal\nsvůj protějšek'
               }
            },
            perigee: {
               name: 'PERIGEE',
               author: 'Discarded Vessel',
               text: {
                  basic: 'Další den,\ndalší konflikt',
                  spare: 'Meziplanetární\nambasador',
                  flirt: 'Povzbuzování lásky\nv druhých',
                  bully: 'Projevování laskavosti\nSkrze bolest'
               }
            },
            rg: {
               name: 'RG 03 & RG 04',
               author: 'semi',
               text: {
                  basic: 'Hledá přáteli\nZ dětství',
                  spare: 'Použijte svou představivost',
                  flirt: 'Prosím, použijte\nsvou představivost',
                  bully: 'Důchodci z \nKrálovské gardy'
               }
            },
            glyde: {
               name: 'GLYDE',
               author: 'Burge',
               text: {
                  basic: 'Není to váš ideální\nObchodní partner',
                  spare: 'O něco méně\nStinné než obvykle',
                  flirt: 'Není to váš ideální\nSpolunocležník',
                  bully: ''
               }
            },
            burgie: {
               name: 'BURGERPANTS',
               author: 'Pongy25',
               text: {
                  basic: 'Spěšně běží za\nŽivotem před sebou',
                  spare: 'Těší se na život,\nKterý je před ním',
                  flirt: 'Hledá lásku v životě,\nKterý je před námi',
                  bully: ''
               }
            },
            madjick: {
               name: 'COZMO',
               author: 'semi',
               text: {
                  basic: 'Hledá\nslovník',
                  spare: 'Slavný\nKouzelník',
                  flirt: 'Objevil nový\nDruh magie',
                  bully: ''
               }
            },
            knightknight: {
               name: 'TERRESTRIA',
               author: 'major_memestar',
               text: {
                  basic: 'Hledá\nMinulosti',
                  spare: 'Renomovaný\nHistorik',
                  flirt: 'Je zamilovaný do\nDomovského světa',
                  bully: ''
               }
            },
            froggitex: {
               name: 'FINAL FROGGIT',
               author: 'PoTheWinterCorder',
               text: {
                  basic: 'Nechává si svou\nMoudrost pro sebe',
                  spare: 'Otevřeně se dělí\nO svou moudrost',
                  flirt: 'Používá jeho\nMoudrosti k lásce',
                  bully: 'Používá jeho moud-\nrosti pro přežití'
               }
            },
            whimsalot: {
               name: 'FLUTTERKNYTE',
               author: 'spacey_432',
               text: {
                  basic: 'Stále pracuje\nKaždý den',
                  spare: 'Konečně si\nDal pauzu',
                  flirt: 'Hledá nějaký\nSoukromý čas',
                  bully: 'Pracuje tvrději\nZe strachu'
               }
            },
            astigmatism: {
               name: 'EYEWALKER PRIME',
               author: 'semi',
               text: {
                  basic: 'Je stále\nVelký tyran',
                  spare: 'Dominantní\nOční lékař',
                  flirt: 'Dominantní\nKožený krejčí',
                  bully: 'Svržen\nOculouxem'
               }
            },
            migospel: {
               name: 'SILENCIO',
               author: 'Balgamlı Kedi',
               text: {
                  basic: 'Stále nestydatý\nZbabělec',
                  spare: 'O něco méně\nZbabělec',
                  flirt: 'Zamilovaný do\nSvého strachu',
                  bully: 'Běží rychleji než\nKdy předtím'
               }
            },
            mushketeer: {
               name: 'MUSHKETEER',
               author: 'Balgamlı Kedi & Ghostly',
               text: {
                  basic: 'Jedna houbová\nArmáda',
                  spare: 'Zocelený válečník\nhledá mír',
                  flirt: 'Poražen silu\nLásky',
                  bully: 'Vyděšený\nRovný'
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

      langPrompt: '[↑ nebo ↓] vyberte / [Z nebo ENTER] potvrďte',
      epilepsyInfo:
         'Všem zainteresovaným\n\nTato hra obsahuje §fill=#ff0§blikající obrázky§fill=#fff§\n, které mohou být sníženy prostřednictvím\n§fill=#ff0§nabídka nastavení§fill=#fff§.\n\n',
      epilepsyKeys: '§fill=#808080§Pokračujte stisknutím [Z nebo ENTER]',

      quitText1: 'Končíte',
      quitText2: 'Končíte.',
      quitText3: 'Končíte..',

      real1: [
         [
            'Děkujeme, že hrajete Outertale.',
            'Práce na tomto projektu pro mě byla ctí,',
            'a potěšení z mé strany.'
         ],
         [ 'Když jsem se vydal na tuto cestu, nikdy jsem', "nemyslel jsem, že se dostanu tak daleko, ale tady jsme", 'jsou každopádně na konci.' ],
         [
            'UNDERTALE mi změnilo život',
            'zkušeností, a to takovou, která byla velmi těžko dostupná',
            'pustit poté, co jsem to poprvé hrál.'
         ],
         [
            'Takže, s OUTERTALE, jsem vám chtěl dát',
            'další šanci existovat ve světě jako je tento,',
            'jako by to bylo poprvé.'
         ],
         [
            "Doufám, že jsem vám tu šanci dal.",
            "Doufám, že jste odcházeli spokojeni s",
            "čas, který jste strávili v tomto světě."
         ],
         [
            "Nezáleží na tom, co jste ve svém životě udělali,",
            'vaše činy zde vypovídají o',
            'takový člověk opravdu jsi.'
         ],
         [
            "Je to díky tobě, že jsi dostal tenhle konec",
            'udělal jsi to a nic to nemůže vzít',
            'zkušenosti daleko od vás.'
         ],
         [ 'Navzdory vašim chybám... jsi úžasný,', 'a vy si zasloužíte lásku a pozornost.', 'Pamatujete si to, dobře?' ]
      ],
      real2: 'Dávej na sebe pozor, \"$(x).\"',

      end1: 'KONEC',
      end2: 'KONEC...?',

      restartText1: 'Restartuje',
      restartText2: 'Restartuje.',
      restartText3: 'Restartuje..',

      title: 'OUTERTALE',
      title_timeline: 'OUTERTALE...?'
   },

   gamepad: {
      prompt: 'NASTAVENÍ GAMEPADU',
      prompt_desc:
         'Přiřazení pomocí vstupu na gamepadu\naž po akci ve hře.\n\nZnovu použijte vstup pro potvrzení, nebo použijte\ndalší vstupy pro jejich přiřazení.\n\nStisknutím klávesy ESC přeskočte nastavení.',
      prompt_counter: 'Přiřazené vstupy: $(x)',
      z: '[Z nebo ENTER] - Potvrdit',
      x: '[X nebo SHIFT] - Zrušit',
      c: '[C nebo CTRL] - Menu (V her)',
      u: '[UP nebo W] - Pohyb nahoru',
      l: '[LEFT nebo A] - Pohyb Levé',
      d: '[DOWN nebo S] - Pohyb Dolů',
      r: '[RIGHT nebo D] - Pohyb Pravá',
      f: '[F4] – Celá obrazovka',
      prompt_done: 'Nastavení dokončeno.\nPokračujte stisknutím libovolného tlačítka.',
      prompt_done_browser: '\nPoznámka: Na této platformě může gamepad\nne vždy bude možné vstoupit na celou obrazovku.',
      prompt_load:
         'Gamepad je již nastaven.\nPokračujte stisknutím libovolného tlačítka nebo stisknutím tlačítka\nlibovolné tlačítko třikrát v rychlém\npro opětovné spuštění nastavení.\n\nStisknutím klávesy ESC přeskočte nastavení.'
   },

   general: {
      asriel: 'Asriel',
      asriel_location: 'Zapomnění',
      disabled: 'VYPNUTÝ',
      enabled: 'ZAPNUTÝ',
      finish: 'Stiskněte [X] pro dokončení',
      frisk: 'Frisk',
      g: 'Z',
      hp: 'ZB',
      inf: 'NEK',
      landing1: '[STISKNĚTE Z NEBO ENTER]',
      lv: 'ÚN',
      mystery1: '§mystify=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz§aaaaaa§mystify=§',
      mystery2: '{@mystify=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz}aaaaaa{@mystify=}',
      mystery2l: '{@mystify=abcdefghijklmnopqrstuvwxyz}aaaaaa{@mystify=}',
      mystery2u: '{@mystify=ABCDEFGHIJKLMNOPQRSTUVWXYZ}aaaaaa{@mystify=}',
      no: 'Ne',
      nominal: '§fill=#0f0§NOMINÁLNÍ',
      percent: '$(x)%',
      player: 'hráč',
      settings: 'Nastavení',
      unknown: '?',
      xm: 'XH',
      yes: 'Ano'
   },

   menu: {
      box1: 'INVENTÁŘ',
      box2: 'KRABICE',
      key1: 'KLÍČENKA',

      confirm1: 'Je tento název správný?',
      confirm2: 'Jméno již bylo\nbyl vybrán.',
      confirm3: 'Zpět',

      footer: 'OUTERTALE V5.04 (c) 2024 SPACEY_432',

      heal1: '* (ZB plně obnoveno.)',
      heal2: '* (Získali jste zpět $(x) ZB.)',
      heal3: '* (Ztratili jste o $(x) ZB.)',
      heal4: '* (ZB je zcela vybitá.)',
      heal5: '* (Získali jste $(x) ZB.)',

      item1: 'POUŽÍT',
      item2: 'VYBAVIT',
      item3: 'INFO',
      item4: 'ODEVZDÁT',

      load1: 'Pokračovat',
      load2: 'Pozorovat',
      load3: 'Resetovat',
      load4: 'Skutečný Resetovat',

      name1: 'Pojmenujte uvízlého člověka.',
      name2: 'Ukončit',
      name3: 'Smazat',
      name4: 'Hotovo',
      name5: '§fill=#808080§ [ESC] - Ukončení / [ENTER] - Hotovo',

      save1: 'Uložit',
      save2: 'Vrátit',
      save3: 'Soubor uložen.',

      settings1: 'NASTAVENÍ',
      settings2: 'EXIT',
      settings3: 'JAZYK',
      settings3a: 'ČEŠTINA',
      settings4: 'ZVUKOVÉ FX',
      settings5: 'HUDBA',
      settings6: 'EFEKTNÍ GRAFIKA',
      settings7: 'BLIKAJÍCÍ OBRAZY',
      settings7a: 'NORMÁLNÍ',
      settings7b: 'REDUKOVANÝ',
      settings8: 'DOTYKOVÉ OVLÁDÁNÍ',
      settings8a: 'VLEVO',
      settings8b: 'VPRAVO',
      settings8c: 'SCHOVANÝ',
      settings9: 'MRTVÁ ZÓNA',
      settings10: 'OTEVŘÍT SLOŽKU MOD',
      settings11: 'RESTARTOVAT',

      sidebar1: 'VĚCI',
      sidebar2: 'STAT',
      sidebar3: 'TEL',
      sidebar4: 'KONF',
      sidebar5: 'S',

      start1: [
         '--- Instrukce ---',
         '[Z nebo ENTER] - Potvrdit',
         '[X nebo SHIFT] - Zrušit',
         '[C nebo CTRL] - Menu (V her)',
         '[F4] – Celá obrazovka',
         '[Podržet klávesu ESC] - Restartovat',
         'Když je ZB 0, prohráváte.'
      ],
      start2: 'Začít hru',

      stat1: 'ÚT',
      stat2: 'OB',
      stat3: 'ZBRAŇ',
      stat4: 'BRNĚNÍ',
      stat5: 'ZLATO',
      stat6: 'BP',
      stat7: 'DALŠÍ',
      stat8: '§fill=#ff0§Varování:\nNekanonické\nčasová osa.',
      stat9: 'ZABÍJENÍ',
      stat10: 'TYRAN',
      stat11: 'FLIRT',
      stat12: 'STAV',
      stat13: '\"$(x)\"',

      story1: [ '<24>{#p/storyteller}Před dávnými časy vládly sluneční soustavě dva druhy: LIDÉ a PŘÍŠERY.{^35}{}' ],
      story2: [ '<24>Jak čas plynul, mezi těmito dvěma druhy vypukla válka.{^35}{}' ],
      story3: [ "<24>Poté, co byla domovská planeta PŘÍŠER zničena, vyhlásili LIDÉ vítězství.{^35}{}" ],
      story4: [ '<24>Zbývající PŘÍŠERY byly vykázány na opuštěnou základnu.{^35}{}' ],
      story5: [ '<24>Bylo vztyčeno mocné silové pole a PŘÍŠERY byly zapečetěny.{^35}{}' ],
      story6: [ '<24>O mnoho let později.{^8}.{^8}.{^35}{}' ],
      story7: [ '<#24> SEKTOR EBOTT     \n         251X{^35}{}' ],
      story8: [ '<24>Příběhy hovoří o místě, odkud se kosmické lodě nikdy nevrátí.{^35}{}' ],
      story9: [ '<24>{^100}{}' ],
      story10: [ '<24>{^100}{}' ],
      story11: [ '<24>{^35}{}' ]
   },

   timeline: {
      main: 'Pokračovat Časová osa kánonu',
      main_ex: 'Spustit časovou osu Canon',
      timelines: 'Další sloty',
      bisect: 'Přetínat',
      delete: 'Vymazat',
      instruction: '[ESC] pro zrušení / [ENTER] pro potvrzení',
      instruction_gamepad: 'Stisknutím libovolného tlačítka na gamepadu otevřete klávesnici.',
      launch: 'Spustit',
      rename: 'Přejmenovat',
      create: 'Vytvořit nový',
      placeholder: 'Zadejte název časové osy',
      confirm: 'Opravdu?'
   }
};


// END-TRANSLATE
