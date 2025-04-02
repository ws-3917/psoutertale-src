// START-TRANSLATE

export default {
    battle: {
        death0: ['(Você preenche seus pulmões.)', "(Você se enche de \ndeterminação.)"],
        death1: ['Você não pode desistir\nagora...', '$(name)!\nTenha determinação...'],
        death2: ['Nossas esperanças dependem\nde você...', '$(name)!\nTenha determinação...'],
        death3: ["Você ficará bem!", '$(name)!\nTenha determinação...'],
        death4: ["Não perca sua esperança!", '$(name)!\nTenha determinação...'],
        death5: ['Não pode acabar agora!', '$(name)!\nTenha determinação...'],

        flee1: '    * Escapou...',
        flee2: "    * Eu tô fora.",
        flee3: "    * Eu tenho mais o que\nfazer.",
        flee4: "    * Não me atrasa.",
        flee5: '    * Fugiu com\n$(x) EXP\n      e $(y)G.',

        mercy_assist: '* Ajudar',
        mercy_flee: '* Fugir',
        mercy_spare: '* Poupar',

        victory1: '<32>{#p/story}* Você venceu!\n* Você ganhou $(x) EXP e\n$(y)G.',
        victory2: '<32>{#p/story}* Você venceu!\n* Você ganhou $(x) EXP e\n$(y)G. Seu LOVE cresceu.'
    },

    developer: {
        console: {
            header: 'ERRO',
            p_resume: {
                header: 'LIBERAR',
                resume: 'Clique Para Liberar'
            },
            blurb: 'Um erro aconteceu! Por favor\nmande um\nprint para o desenvolvedor.'
        },
        control: {
            tab: 'CONTROLE',
            headers: ['GERAL', 'BATALHA'],
            items: [
                [
                    'ArrumarMúsica',
                    'ArrumarJogador',
                    'G.Infinito',
                    'Interagir',
                    'Entrada',
                    'Movimentação',
                    'Semclip',
                    'Salvar',
                    'PularTexto',
                    'CâmeraLivre'
                ],
                [
                    'Assistência',
                    'CaixaLimpa',
                    'Saída',
                    'ResetarCaixa',
                    'ResetarMenu',
                    'FugaPermitida',
                    'HP.Infinito',
                    'PouparTODOS',
                    'Suicídio',
                    'FraquejarTODOS'
                ]
            ],
            p_speed: {
                fps: '$(x) FPS',
                halt: 'Parar',
                header: 'VELOCIDADE DE JOGO',
                next: 'Mais',
                prev: 'Menos',
                sec: '$(x)s/frame'
            }
        },
        godhome: {
            tab: 'CASADEUS',
            p_teleport: {
                header: 'SALA',
                action: 'Teletransporte'
            },
            p_encounter: {
                header: 'ENCONTRO',
                action: 'Começo'
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
            headers: ['CAMADAS', 'TIPOS'],
            switches: [
                ['Base', 'Abaixo', 'Principal', 'Acima', 'Menu'],
                ['Hitbox', 'Sprite', 'Texto']
            ],
            p_explorer: {
                header: 'EXPLORADOR',
                layers: ['Base (EXPLORADOR)', 'Abaixo (EXPLORADOR)', 'Principal (EXPLORADOR)', 'Acima (EXPLORADOR)', 'Menu (EXPLORADOR)'],
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
            debug_instructions: 'Pressione [TAB] para alterar\nas informações debug.',
            debug: {
                a: 'A', 
                acceleration: 'Aceleração',
                active: 'Ativo',
                alpha: 'Alfa',
                anchor: 'Âncora',
                b: 'B', 
                blend: 'Mistura',
                border: 'Borda',
                compute: 'Tamanho Calculado',
                content: 'Conteúdo',
                crop: 'Colheita',
                down: 'Baixo',
                duration: 'Duração',
                exp: 'EXP',
                extent: 'Extensão',
                f: 'F', 
                face: 'Face',
                false: 'Mentira',
                fill: 'Preencher',
                fontFamily: 'Família Fonte',
                fontSize: 'Tamanho da Fonte',
                frames: 'Frames',
                gravity: 'Gravidade',
                group: 'Grupo',
                hp: 'HP',
                index: 'Index',
                inert: 'Inerte',
                key: 'Chave',
                lastSavedTime: 'Última Vez Salvo',
                layer: 'Camada',
                layers: 'Camadas',
                left: 'Esquerda',
                metadata: 'Metadata',
                music: 'Música',
                namespace: 'EspaçoDeNome',
                none1: 'NADA',
                none2: 'nada',
                objects: 'Objetos',
                oversaver: 'Oversaver',
                parallax: 'Paralaxe',
                position: 'Posição',
                primed: 'Aprontado',
                priority: 'Prioridade',
                registry: 'REGISTRO',
                renderer: 'Renderizador',
                resources: 'Recursos',
                reverse: 'Inverso',
                right: 'Direita',
                room: 'Sala',
                roomState: 'Estado da Sala',
                rotation: 'Rotação',
                s: 'S', 
                scale: 'Escala',
                shopSelection: 'Seleção de Mercado',
                size: 'Tamanho',
                spacing: 'Espaçamento',
                spin: 'Girar',
                sprites: 'Sprites',
                step: 'Passo',
                stroke: 'Stroke',
                subcrop: 'Subcrop',
                talk: 'Fala',
                target: 'Alvo',
                text: 'Texto',
                time: 'Tempo',
                tint: 'Tonalidade',
                trackedAssets: 'Ativos Rastreados',
                true: 'Verdade',
                unknown: 'DESCONHECIDO',
                up: 'Cima',
                vars: 'Vars',
                velocity: 'Velocidade',
                volatile: 'Volátil'
            }
        },
        savemod: {
            tab: 'SAVEMOD',
            header1: 'SALVAR EDIÇÃO',
            domains: [
                'Data (Booleans)',
                'Data (Números)',
                'Data (Strings)',
                'Flags (Booleans)',
                'Flags (Números)',
                'Flags (Strings)'
            ],
            p_page: {
                header: 'NAVEGAÇÃO',
                prev: 'Anterior',
                next: 'Próximo'
            },
            prompt: 'Coloque Um Valor',
            back: 'Atrás'
        },
        storage: {
            tab: 'ARMAZENAMENTO',
            header: 'EDITOR DE ARMAZENAMENTO',
            p_container: { header: 'SELEÇÃO', prev: 'Anterior', next: 'Próximo' },
            display: { inventory: 'Inventário', dimboxA: 'Esconder. Caixa A', dimboxB: 'Esconder. Caixa B' }
        }
    },

    dialog: {
        dialog_clear_title: 'Limpar Arquivo',
        dialog_notice_title: 'Notar',
        dialog_clear_mobile: 'Limpar Configurações Mobile',
        dialog_open: { buttonLabel: 'Abrir', name: 'Arquivos SALVOS', title: 'Abrir Arquivo' },
        dialog_save: { buttonLabel: 'Salvar', name: 'Arquivos SALVOS', title: 'Arquivo Salvar' },
        error_load: 'Esse arquivo não pode ser analisado.',
        message_alert: ['OK'],
        message_confirm: ['Cancelar', 'OK'],
        prompt_clear: 'Limpar este arquivo?',
        prompt_demo: 'Seu arquivo SALVO da Demo\nde Outertale foi movido\npara uma linha do tempo.',
        prompt_save: 'Salvar o arquivo?',
        prompt_clear_mobile: 'Limpar as configurações\nMobile?\nIsto não limpará seu\narquivo SALVO.',
        prompt_save_alternate: 'Copiar o texto abaixo em\num JSON file para salvar\nno seu dispositivo.',
        prompt_open: 'Carregar Arquivo?'
    },

    extra: {
        credits: [
            [
                '§fill=#ff0§< DESENVOLVEDOR >§fill=#fff§',
                'spacey_432',
                '',
                '§fill=#ff0§< ESCRITOR >§fill=#fff§',
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
                'Recipiente Descartado',
                'Efe Kaya',
                'Demitido',
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
                '§fill=#ff0§< TÉCNICO >§fill=#fff§',
                'Codetoil',
                'ryi3r',
                'ws3917',
                '',
                '§fill=#ff0§< TESTE >§fill=#fff§',
                'Alden',
                'Aspey',
                'Aster',
                'Balgamlı Kedi'
            ],
            [
                '§fill=#ff0§< TESTE >§fill=#fff§',
                'Bilge \"mnwary\"',
                'Brad',
                'brayjamin',
                'ClamsyMoe',
                'delta',
                'Recipiente Descartado',
                'Dischnie',
                'DR4GON HE4RT',
                'Dubituar',
                'Efe Kaya',
                'Emurry',
                'Enzolos',
                'EvanGamesGoodman',
                'Demitido'
            ],
            [
                '§fill=#ff0§< TESTE >§fill=#fff§',
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
                '§fill=#ff0§< TESTE >§fill=#fff§',
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
                '§fill=#ff0§< TESTE >§fill=#fff§',
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
                '§fill=#ff0§< TESTE >§fill=#fff§',
                'Tem in a Cowboy Hat',
                'Tenbrooks',
                'ThatGuyWhoLikesFood',
                'The Fallen Angel',
                'TheAsriel',
                'Turbulation',
                'Pasta Estranha',
                'Xiao_Akatsuki',
                'xNoodlePlayz',
                'Zaxento The Greedy'
            ],
            [
                '§fill=#ff0§< AGRADECIMENTOS ESPECIAIS >§fill=#fff§',
                'Alden',
                '§fill=#808080§Por estar aqui quando eu\nprecisei de alguém para me apoiar e\nme ensinar lições de vida que\nfizeram a pessoa que sou.§fill=#fff§'
            ],
            [
                '§fill=#ff0§< AGRADECIMENTOS ESPECIAIS >§fill=#fff§',
                'Aster',
                '§fill=#808080§Por ser uma das pessoas mais amigáveis\nQue eu já conheci, a primeira pessoa\nque acreditou na minha visão, e\nme inspirou a finalizar o jogo.§fill=#fff§'
            ],
            [
                '§fill=#ff0§< AGRADECIMENTOS ESPECIAIS >§fill=#fff§',
                'Balgamlı Kedi',
                "§fill=#808080§Por estar comigo no momento de desenvolvimento,\ndo começo até\nos últimos momentos da construção.\nEle sempre esteve ali para me ajudar.§fill=#fff§"
            ],
            [
                '§fill=#ff0§< AGRADECIMENTOS ESPECIAIS >§fill=#fff§',
                'Ghostly',
                '§fill=#808080§Por ser a voz da razão em relação aos aspectos\ndo jogo, me encorajando a tomar decisões\nsérias.§fill=#fff§'
            ],
            [
                '§fill=#ff0§< AGRADECIMENTOS ESPECIAIS >§fill=#fff§',
                'Zaxento The Greedy',
                '§fill=#808080§Por ser realista e brutalmente\nhonesto, dando muitas críticas e ideias, e sendo uma pessoa de confiança\ndesde o dia que nos conhecemos.§fill=#fff§'
            ],
            [
                '§fill=#ff0§< AGRADECIMENTOS ESPECIAIS >§fill=#fff§',
                'ThatGuyWhoLikesFood',
                '§fill=#808080§Por me ajudar a escrever partes cruciais\ndo jogo, apoiar minha\nvisão, e me ajudar a expressar meus sentimentos\nde uma forma totalmente nova.§fill=#fff§'
            ],
            [
                '§fill=#ff0§< AGRADECIMENTOS ESPECIAIS >§fill=#fff§',
                'Bilge \"mnwary\"',
                "§fill=#808080§Por estar lá sempre e me ajudar no\nfinal do desenvolvimento, e\ngarantir um jogo escrito no\nseu potencial máximo.§fill=#fff§"
            ],
            ['Trazido a você por §fill=#ff0§The Mavis & Co.§fill=#fff§']
        ],

        final_frontier: {
            header: '(( CAST ))',
            opponents: {
                froggit: {
                    name: 'FROGGIT',
                    author: 'ScarletScaledDragon',
                    text: {
                        basic: 'Ponderando\na vida.',
                        spare: 'Sapo\nProfissional',
                        flirt: 'Ponderando\nAmor',
                        bully: 'Pulando de\nMedo'
                    }
                },
                whimsun: {
                    name: 'FLUTTERLYTE',
                    author: 'ScarletScaledDragon',
                    text: {
                        basic: 'Aprendendo a\nVoar',
                        spare: 'Aviador\nEncorajador',
                        flirt: 'Procurando pelos\nCéus',
                        bully: 'Manobrando\nEvasivamente'
                    }
                },
                moldsmal: {
                    name: 'GELATINI',
                    author: 'spacey_432',
                    text: {
                        basic: 'Achou uma nova\nEstação Espacial',
                        spare: 'Dançarino\nSintilante',
                        flirt: 'Dançarino como\nGeleia Exótica',
                        bully: 'Achou Uma Nova\nGalaxia'
                    }
                },
                loox: {
                    name: 'OCULOUX',
                    author: 'ScarletScaledDragon',
                    text: {
                        basic: 'Gosta parcialmente\nde bullying',
                        spare: 'Bully\nReformado',
                        flirt: 'Paquerador\nProfissional',
                        bully: ''
                    }
                },
                migosp: {
                    name: 'SILENTE',
                    author: 'ScarletScaledDragon',
                    text: {
                        basic: 'Extremamente\nAgradável',
                        spare: 'Curtindo a vida\nCasualmente',
                        flirt: 'Um amor com\nDistância',
                        bully: 'Negador do\nPerigo'
                    }
                },
                mushy: {
                    name: 'MUSHY',
                    author: 'Balgamlı Kedi & ScarletScaledDragon',
                    text: {
                        basic: 'Atirando no\nVazio',
                        spare: 'Mágico\nVelocista',
                        flirt: 'Gunshot\nHeart-Throb',
                        bully: 'Pinchando e\nOrando'
                    }
                },
                finalghost: {
                    name: 'LURKSALOT',
                    author: 'spacey_432',
                    text: {
                        basic: 'Mantendo para\nEles mesmos',
                        spare: 'A procura de\nContato fisico',
                        flirt: 'Estoicamente\nNão envolvido',
                        bully: ''
                    }
                },
                stardrake: {
                    name: 'STARDRAKE',
                    author: 'Burge',
                    text: {
                        basic: 'Ainda procurando\nPor risadas',
                        spare: 'Comediante quase\nbem sucedido',
                        flirt: 'Popular entre os\nadultos',
                        bully: ''
                    }
                },
                chilldrake: {
                    name: 'CHILLDRAKE',
                    author: 'Burge',
                    text: {
                        basic: 'Ainda procurando\npor apoiadores',
                        spare: 'Ganhou um seguidor\npara seu culto',
                        flirt: 'Troca beijos\npor apoiadores',
                        bully: 'Ativista\nAnti-Bullying'
                    }
                },
                spacetop: {
                    name: 'ASTRO SERF',
                    author: 'DESM.al',
                    text: {
                        basic: 'Pensando em\nsua Antena',
                        spare: 'Sensação na\nEstação de Rádio',
                        flirt: 'O amor está\nno ar',
                        bully: 'Emissor de\nEmergência'
                    }
                },
                jerry: {
                    name: 'JERRY',
                    author: 'Recipiente Descartado',
                    text: {
                        basic: 'Sendo abandonado\nDiariamente',
                        spare: 'Sendo abandonado\ncom menos frequência',
                        flirt: 'No caminho para\na redenção',
                        bully: ''
                    }
                },
                mouse: {
                    name: 'WHIZKARAT',
                    author: 'Zaxento The Greedy & semi',
                    text: {
                        basic: 'Tendo crise\nde identidade',
                        spare: 'Mais novo membro da\nSociedade dos Ratos',
                        flirt: 'Ficando brincalhão\ncom os ratos',
                        bully: 'Devolvido para a\nSociedade dos Gatos'
                    }
                },
                doggo: {
                    name: 'DOGGO',
                    author: 'Recipiente Descartado',
                    text: {
                        basic: 'Acredita na chave\ndo Todo-Poderoso',
                        spare: 'Achou seu próprio\nLobo de guarda',
                        flirt: 'Apaixonado pelo seu\nLobo de guarda',
                        bully: 'Correndo atrás de\nseu Lobo de guarda'
                    }
                },
                lesserdog: {
                    name: 'CANIS MINOR',
                    author: 'major_memestar',
                    text: {
                        basic: 'Procurando por\nafeto',
                        spare: 'Achou um dono\nAdorável',
                        flirt: 'Achou um dono\nAmante...',
                        bully: 'Desesperado por\nAfeto'
                    }
                },
                dogs: {
                    name: 'DOGAMY & DOGARESSA',
                    author: 'major_memestar',
                    text: {
                        basic: 'Ainda pensando\nsobre buscas',
                        spare: 'Campeões em\nObservar cachorrinhos',
                        flirt: "Caçando a calda\num do outro",
                        bully: 'Competidores defensivos\nem olhar cachorrinhos'
                    }
                },
                greatdog: {
                    name: 'CANIS MAJOR',
                    author: 'major_memestar',
                    text: {
                        basic: "Alheio as\nmudanças da vida",
                        spare: "Animado para as\nmudanças de vida",
                        flirt: "Marcado pelas\nmudanças de vida",
                        bully: ''
                    }
                },
                woshua: {
                    name: 'SKRUBBINGTON',
                    author: 'Recipiente Descartado',
                    text: {
                        basic: 'Apenas 99.1\nPorcento limpo',
                        spare: 'Poder da Limpeza\nPoder da Casa',
                        flirt: 'Fabricante de\nHidromassagem',
                        bully: 'Super poderoso\nLimpador pressurizado'
                    }
                },
                moldbygg: {
                    name: 'GELATA',
                    author: 'spacey_432',
                    text: {
                        basic: 'Procurando por uma\nBabá',
                        spare: 'Movido a slime\nBarstool',
                        flirt: 'Sexy Sitcom\nRegular',
                        bully: 'Glorificado\nLutador'
                    }
                },
                radtile: {
                    name: 'RADTILE',
                    author: 'Balgamlı Kedi & Zaxento The Greedy',
                    text: {
                        basic: 'Chafurdando em\nImperfeição',
                        spare: 'Melhorando sua\nImagem própria',
                        flirt: 'Namorando seu\nPróprio reflexo',
                        bully: 'Indo para um\nfuturo horroroso'
                    }
                },
                shyren: {
                    name: 'SHYREN',
                    author: 'Ghostly',
                    text: {
                        basic: 'De volta as\nlições de piano',
                        spare: "Novo cantor para\nMettaton",
                        flirt: 'Apaixonado por\num fantasma',
                        bully: "Não consegue cantar\nsem um sintetizador"
                    }
                },
                doge: {
                    name: 'DOGE',
                    author: 'major_memestar',
                    text: {
                        basic: 'Construtor local\nprofissional na broca',
                        spare: 'Comprou um inscrição\npara a vida no spa',
                        flirt: 'Sentiu amor de um\ncachorrinho pela\nprimeira vez',
                        bully: ''
                    }
                },
                muffet: {
                    name: 'MUFFET',
                    author: 'major_memestar',
                    text: {
                        basic: 'Procurando pelo\nPróximo pagamento',
                        spare: 'Cuidando do clã\nde aranhas',
                        flirt: 'Juntando dates\npara um piquenique',
                        bully: ''
                    }
                },
                pyrope: {
                    name: 'HOTWIRE',
                    author: 'semi',
                    text: {
                        basic: 'Esperando a\nbatida perfeita',
                        spare: 'Rapper na\nVelocidade da luz',
                        flirt: 'Rapper escritor de\nmúsicas românticas',
                        bully: 'Batalhando rap até\na beira da morte'
                    }
                },
                tsundere: {
                    name: 'TSUNDERIDEX',
                    author: 'spacey_432',
                    text: {
                        basic: 'Voando dentro\nda negação',
                        spare: 'Se aproximando de\nvocê no modo avião',
                        flirt: 'Pronto para ser\nTsundere',
                        bully: 'Finalmente\nencontrou alguém'
                    }
                },
                perigee: {
                    name: 'PERIGEE',
                    author: 'Recipiente Descartado',
                    text: {
                        basic: 'Outro dia,\nOutro conflito',
                        spare: 'Embaixador\nInterplanetário',
                        flirt: 'Encorajando o\namor nos outros',
                        bully: 'Mostrando bondade\natravés da dor'
                    }
                },
                rg: {
                    name: 'RG 03 & RG 04',
                    author: 'semi',
                    text: {
                        basic: 'Procurando por\namigos da infância',
                        spare: 'Use sua\nImaginação',
                        flirt: 'Use, use sua\nImaginação',
                        bully: 'Guardas Reais\nAposentados'
                    }
                },
                glyde: {
                    name: 'GLYDE',
                    author: 'Burge',
                    text: {
                        basic: 'Não é o melhor\nparceiro de negócios',
                        spare: 'Menos duvidoso\ndo que o normal',
                        flirt: 'Não é o companheiro\nde cama ideal',
                        bully: ''
                    }
                },
                burgie: {
                    name: 'BURGERPANTS',
                    author: 'Pongy25',
                    text: {
                        basic: 'Correndo apressadamente\nPara a vida à frente',
                        spare: 'Ansioso para\nsua nova vida',
                        flirt: 'Encontrando amor\nna sua nova vida',
                        bully: ''
                    }
                },
                madjick: {
                    name: 'COZMO',
                    author: 'semi',
                    text: {
                        basic: 'Procurando um\ndicionário',
                        spare: 'Mágico\nFamoso',
                        flirt: 'Achou um novo\nTipo de magia',
                        bully: ''
                    }
                },
                knightknight: {
                    name: 'TERRESTRIA',
                    author: 'major_memestar',
                    text: {
                        basic: 'Em busca do\nseu passado',
                        spare: 'Historiador\nRenomado',
                        flirt: 'Tem uma queda pelo\nPlaneta Natal',
                        bully: ''
                    }
                },
                froggitex: {
                    name: 'FINAL FROGGIT',
                    author: 'PoTheWinterCorder',
                    text: {
                        basic: 'Guardando sua\nsabedoria para si',
                        spare: 'Compartilhando\nSabedoria',
                        flirt: 'Usando sua sabedoria\nPara o amor',
                        bully: 'Usando sua sabedoria\npara sobreviver'
                    }
                },
                whimsalot: {
                    name: 'FLUTTERKNYTE',
                    author: 'spacey_432',
                    text: {
                        basic: 'Trabalhando\nTodos os dias',
                        spare: 'Finalmente\nDescansou',
                        flirt: 'Procurando por um\ntempo sozinho',
                        bully: 'Trabalhando duro\npor medo'
                    }
                },
                astigmatism: {
                    name: 'EYEWALKER PRIME',
                    author: 'semi',
                    text: {
                        basic: 'Ainda um\ngrande bully',
                        spare: 'Doutor do olho\ndominante',
                        flirt: 'Dominador do\nalfaiate de couro',
                        bully: 'Derrubado por\num Oculoux'
                    }
                },
                migospel: {
                    name: 'SILENCIO',
                    author: 'Balgamlı Kedi',
                    text: {
                        basic: 'Ainda um\ngrande covarde',
                        spare: 'Um pouco menos\ncovarde',
                        flirt: 'Em amor com\nseu medo',
                        bully: 'Correndo mais\nrápido que nunca'
                    }
                },
                mushketeer: {
                    name: 'MUSHKETEER',
                    author: 'Balgamlı Kedi & Ghostly',
                    text: {
                        basic: 'Batalhão de\num cogumelo',
                        spare: 'Guerreiro forte\nprocurando pela paz',
                        flirt: 'Derrotado pelo\npoder do amor',
                        bully: 'Totalmente\nassustado'
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
                    author: 'Medi0creking & \nMattSpriteMaster'
                }
            }
        },

        langPrompt: '[↑ or ↓] para selecionar / [Z ou ENTER] para confirmar',
        epilepsyInfo:
            'Aviso de perigo,\n\nEste jogo contém §fill=#ff0§imagens piscantes§fill=#fff§\nque podem ser reduzidas\n§fill=#ff0§nas configurações§fill=#fff§.\n\n',
        epilepsyKeys: '§fill=#808080§Pressione [Z ou ENTER] para continuar',

        quitText1: 'Fechando',
        quitText2: 'Fechando.',
        quitText3: 'Fechando..',

        real1: [
            [
                'Obrigado por ter jogado\nOutertale.',
                'Foi uma honra estar trabalhando neste projeto,',
                'e um prazer por minha parte.'
            ],
            ['Quando comecei está jornada, eu jamais', "que chegaria tão longe, mas aqui estamos", 'de toda forma, no fim.'],
            [
                'Para mim, UNDERTALE foi uma mudança de vida',
                'com sua experiência, e um coisa que foi muito difícil de',
                'deixar ir após jogar pela primeira vez.'
            ],
            [
                'Então,com OUTERTALE, eu quero dar a você',
                'outra chance de existir em um mundo como este,',
                'como se fosse sua primeira vez de todas.'
            ],
            [
                "Eu espero ter te dado essa chance.",
                "Eu espero que você tenha ficado satisfeito com",
                "o tempo que você passou neste mundo."
            ],
            [
                "Não importa o que você tenha feito na sua vida,",
                'suas ações aqui dizem muito sobre o tipo',
                'de pessoa que você é na vida real.'
            ],
            [
                "É por causa de você que você conseguiu este final",
                'e nada pode tomar essa experiência',
                'de você.'
            ],
            ['Apesar dos seus erros... você é incrível,', 'e merece amor com atenção.', 'Lembre-se disso, tudo bem?']
        ],
        real2: 'Cuide-se, \"$(x).\"',

        end1: 'O FIM',
        end2: 'O FIM...?',

        restartText1: 'Recomeçando',
        restartText2: 'Recomeçando.',
        restartText3: 'Recomeçando..',

        title: 'OUTERTALE',
        title_timeline: 'OUTERTALE...?'
    },

    gamepad: {
        prompt: 'GAMEPAD SETUP',
        prompt_desc:
            'Use o input no seu gamepad para ir até às ações do jogo\n\nUse o input novamente para confirmar ou use\noutros inputs para mudar as ações deles.\n\nPressione ESC para pular o setup.',
        prompt_counter: 'Input assinado: $(x)',
        z: '[Z ou ENTER] - Confirmar',
        x: '[X ou SHIFT] - Cancelar',
        c: '[C ou CTRL] - Menu (No jogo)',
        u: '[UP ou W] - Mover-se pra cima',
        l: '[LEFT ou A] - Mover Esquerda',
        d: '[DOWN ou S] - Mover para baixo',
        r: '[RIGHT ou D] - Mover direita',
        f: '[F4] - Fullscreen',
        prompt_done: 'Setup completo.\nPressione qualquer botão para continuar.',
        prompt_done_browser: '\nNote: Nesta plataforma, o gamepad talvez\nnão permita o uso de tela cheia.',
        prompt_load:
            'O gamepad já foi colocado.\nPressione qualquer botão para continuar ou pressione\nqualquer botão rapidamente três vezes\nsucessivamente para reiniciar.\n\nPressione ESC para pular setup.'
    },

    general: {
        asriel: 'Asriel',
        asriel_location: 'O Esquecimento',
        disabled: 'DESATIVADO',
        enabled: 'ATIVADO',
        finish: 'Pressione [X] para finalizar',
        frisk: 'Frisk',
        g: 'G',
        hp: 'HP',
        inf: '\u221e',
        landing1: '[PRESSIONE Z OU ENTER]',
        lv: 'LV',
        mystery1: '§mystify=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz§aaaaaa§mystify=§',
        mystery2: '{@mystify=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz}aaaaaa{@mystify=}',
        mystery2l: '{@mystify=abcdefghijklmnopqrstuvwxyz}aaaaaa{@mystify=}',
        mystery2u: '{@mystify=ABCDEFGHIJKLMNOPQRSTUVWXYZ}aaaaaa{@mystify=}',
        no: 'Não',
        nominal: '§fill=#0f0§NOMINAL',
        percent: '$(x)%',
        player: 'jogador',
        settings: 'Configurações',
        shopg: 'G',
        unknown: '?',
        xm: 'XM',
        yes: 'Sim'
    },

    menu: {
        box1: 'INVENTÁRIO',
        box2: 'CAIXA',
        key1: 'CHAVEIRO',

        confirm1: 'Este nome está correto?',
        confirm2: 'Um nome já foi escolhido.',
        confirm3: 'Volte',

        footer: 'OUTERTALE V5.06 Preview 5 (c) 2025 SPACEY_432',

        heal1: '* (HP totalmente recuperado.)',
        heal2: '* (Você recuperou $(x) HP.)',
        heal3: '* (Você perdeu $(x) HP.)',
        heal4: '* (HP totalmente esgotado.)',
        heal5: '* (Você ganhou $(x) HP.)',

        item1: 'USE',
        item2: 'EQUIPAR',
        item3: 'INFORMAÇÃO',
        item4: 'SOLTAR',

        load1: 'Continuar',
        load2: 'Observar',
        load3: 'Resetar',
        load4: 'Verdadeiro Resete',

        name1: 'Nomeie o humano encalhado.',
        name2: 'Sair',
        name3: 'Espaço',
        name4: 'Pronto',
        name5: '§fill=#808080§ [ESC] - Sair / [ENTER] - Pronto',

        save1: 'Salvar',
        save2: 'Retornar',
        save3: 'Arquivo Salvo.',

        settings1: 'CONFIGURAÇÕES',
        settings2: 'SAIR',
        settingsprompt1: '-> IDIOMA & MÚSICA',
        settings3: 'IDIOMA',
        settings3a: 'PORTUGUÊS (BR)',
        settings4: 'FIXAR MÚSICA',
        settings5: 'MÚSICA',
        settings6: 'GRÁFICOS FANCY',
        settingsprompt2: '-> GAMEPLAY & GRÁFICOS',
        settings6a: 'PERSONAGEM CORRENDO',
        settings6b: 'SPRITES COLORIDOS',
        settings7: 'IMAGENS PISCANTES',
        settings7a: 'NORMAL',
        settings7b: 'REDUZIDO',
        settings8: 'CONFIGURAÇÕES MOBILE',
        settings9: 'DEADZONE',
        settings10: 'ABRIR PASTA DE MOD',
        settings11: 'REINICIAR',
        border: {
            option: 'BORDA DO JOGO',
            list: [
                'NADA',
                'DINÂMICA',
                'SIMPLES',
                'ESTRELA',
                'OUTLANDS',
                'OUTLANDS (BATALHA)',
                'CASA DA TORIEL',
                'STARTON',
                'STARTON (BATALHA)',
                'FOUNDRY',
                'FOUNDRY (BATALHA)',
                'AERIALIS',
                'AERIALIS (BATALHA)',
                'CENTRO DE GRAVAÇÃO',
                'REC CENTER (BATALHA)',
                'CORE',
                "CORE (BATALHA)",
                'CIDADELA',
                'CASA DO ASGORE',
                'ARQUIVO SEIS',
                'BATALHA DE ASRIEL',
                'GALÁXIA BRILHANTE',
                'NOVO MUNDO',
                'NOVO MUNDO (COM COPO)',
                '§fill=#808080§(FECHADO)'
            ]
        },
        mobile: {
            title: 'MOBILE CTRLS',
            controlOpacity: 'CONTROLE DE OPACIDADE',
            controlType: 'TIPO DE CONTROLE',
            enableDiagonal: 'LAYOUT DA TECLA DE SETA',
            enableSingleArrow: 'CHAVE. INDIV. DIRETA.',

            fourKey: '\u4dc8 4-KEY',
            eightKey: '\u4dc9 8-KEY',
            deadZone: 'DEADZONE',
            toleranceAngle: 'ÂNGULO DE TOLERÂNCIA',

            loadDefault: 'CARREGAR CONFIGURAÇÕES PADRÃO',
            enableMultiConfig: 'ATIVAR TROCA RÁPIDA',
            invertButtonPos: 'INVERTER POSIÇÃO DE BOTÕES',

            prompt1: '--- SELECIONAR PERFIL ---',
            prompt2: '--- CONFIGURAÇÕES GERAIS ---',
            prompt3: '--- CONTROLE DE CONFIGURAÇÕES ---',
            prompt4: '--- MODIFICAR BOTÕES ---',

            nextpage: 'PRÓXIMA PAGINA >',
            prepage: '< PÁGINA ANTERIOR',

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

            ShowFullScrKey: 'MOSTRAR TODA A TELA',

            xPos: 'CENTRO X POSIÇÃO',
            yPos: 'CENTRO Y POSIÇÃO',
            size: 'TAMANHO DO BOTÃO',
            radius: 'RAIO DO CÍRCULO',

            keysettings: 'CUSTOMIZAR BOTÃO',
            keyprompt0: '§fill=#ffd700§>> §fill=#fff§EDITANDO: §fill=#00ffff§$(x) §fill=#808080§(Pressione [R] para resetar)',
            keyprompt1: '§fill=#fff§PROGRESSO: §fill=#00ffff§($(x)§fill=#fff§/§fill=#00ffff§3)',
            keyprompt1a: ' [1] Posicionamento de botão inicial',
            keyprompt1b: ' [2] Ajuste fino da posição',
            keyprompt1c: ' [3] Ajuste do tamanho do botão',
            keyprompt1d:
                '§fill=#00ff00§*** Configuração da posição do botão\n§fill=#fff§Pressione [L] (no canto superior esquerdo)\nPara começar',
            keyprompt1e: '§fill=#00ff00§*** Setup completo.\n§fill=#fff§Agora você pode arrumar\nOutros botões',
            keyprompt2: '§fill=#4169e1§--- \nINSTRUÇÃO ---',
            keyprompt2a:
                '§fill=#fff§* Arraste §fill=#00ffff§$(x)§fill=#fff§ para definir a posição inicial\n§fill=#ffd700§* Pressione [L] §fill=#808080§para confirmar o posicionamento\n§fill=#ffd700§* Pressione [R] §fill=#808080§para recuperar se o botão for perdido\n§fill=#808080§A posição pode ser ajustada na próxima etapa',
            keyprompt2b:
                '§fill=#fff§* Use §fill=#ffd700§[UP/DOWN/LEFT/RIGHT]§fill=#fff§ para ajustes precisos\n§fill=#ffd700§* Pressione [R] §fill=#808080§para restaurar a posição anterior\n§fill=#808080§Coordenadas de referência exibidas abaixo\n§fill=#ffd700§* Pressione [L] §fill=#808080§para confirmar',
            keyprompt2c:
                '§fill=#fff§* Ajuste com §fill=#ffd700§[-5] [-1] [+1] [+5]§fill=#fff§ para definir o tamanho\n§fill=#ffd700§* Pressione [R] §fill=#808080§para restaurar o tamanho padrão\n§fill=#808080§Valor de tamanho atual mostrado abaixo\n§fill=#ffd700§* Pressione [L] §fill=#808080§para confirmar',
            keyprompt3a: '§fill=#4169e1§-> §fill=#fff§POSIÇÃO: \n§fill=#00ffff§X=$(x), Y=$(y)',
            keyprompt3b: '§fill=#4169e1§-> §fill=#fff§TAMANHO: §fill=#00ffff§$(x)',

            helper_loadDefault:
                '§fill=#ff0§Pressione [Z]§fill=#808080§ para resetar suas configurações ao padrão.\nIsso vai descartar qual configuração customizada\nque você tem e restaurar as configurações originais.',
            helper_enableMultiConfig:
                '§fill=#ff0§Pressione [Z]§fill=#808080§ para mostrar/ocultar os botões de configuração.\nSe ativado, cinco botões numéricos ([0] - [4]) serão exibidos no lado esquerdo da tela.\n§fill=#fff§Esses botões permitem alternar rapidamente entre diferentes opções de configuração.§fill=#fff§',
            helper_controlType:
                '§fill=#ff0§Pressione [Z]§fill=#808080§ para alternar entre duas opções de controle:\n§fill=#ff0§1. Botões direcionais§fill=#808080§: Teclas de seta tradicionais\n§fill=#ff0§2. Virtual Joystick§fill=#808080§: Controle amigável da tela sensível ao toque',
            helper_controlOpacity:
                '§fill=#ff0§Use as setas da esquerda e direita§fill=#808080§ para ajustar a transparência dos botões.\nAltos valores fazem botões mais visíveis, baixos valores fazem eles mais transparentes.',
            helper_enableDiagnal:
                'fill=#ff0§Pressione [Z]§fill=#808080§ para alternar o movimento diagonal.\nQuando permitido, segurando a uma seta vai mostrar\n§fill=#ff0§duas setas adicionaisfill=#808080§ para movimento diagonal.',
            helper_deadZone:
                "§fill=#ff0§Use as setas ESQUERDA ou DIREITA§fill=#808080§ para ajustar a sensibilidade do joystick.\n§fill=#fff§A zona morta é a área central onde o movimento do joystick não é detectado§fill=#808080§.\nZona morta maior = controles menos sensíveis",
            helper_toleranceAngle:
                '§fill=#ff0§Use as setas ESQUERDA ou DIREITA§fill=#808080§ para ajustar a sensibilidade do ângulo do joystick.\n§fill=#fff§Isso determina a precisão de seus movimentos§fill=#808080§.\nÂngulos acima de 45° acionará o movimento diagonal',
            helper_showFullScrKey:
                '§fill=#ff0§Pressione [Z]§fill=#808080§ para alternar a visibilidade do\n§fill=#fff§Botão de tela cheia§fill=#808080§.',
            helper_modifyButtons:
                '§fill=#ff0§Pressione [Z]§fill=#808080§ para personalizar o layout do botão.\nVocê pode ajustar o §fill=#ff0§size e position§fill=#808080§ de todos os botões.\nUm guia passo a passo irá ajudá-lo no processo.',
            helper_singleArrow:
                '§fill=#ff0§Pressione [Z]§fill=#808080§ para ativar ou desativar as configurações de teclas direcionais individuais.\nQuando ativado, você pode §fill=#fff§ definir a posição independentemente \ne tamanho de cada tecla direcional§fill=#808080§ para maior flexibilidade.',
            helper_invertButtonPos:
                '§fill=#ff0§Pressione [Z]§fill=#808080§ para alternar o recurso §fill=#fff§Inverter posição do botão§fill=#808080§.\nQuando ativado, o layout dos botões de navegação virtual será espelhado da esquerda para a direita para melhor acessibilidade ou preferência pessoal.'
        },

        sidebar1: 'ÍTEM',
        sidebar2: 'STAT',
        sidebar3: 'CELL',
        sidebar4: 'CONF',
        sidebar5: 'S',

        start1: [
            '--- Instrução ---',
            '[Z ou ENTER] - Confirmar',
            '[X ou SHIFT] - Cancelar',
            '[C ou CTRL] - Menu (No jogo)',
            '[F4] - Fullscreen',
            '[Segure ESC] - Recomeçar',
            'Quando seu HP for 0, você perde.'
        ],
        start2: 'Começar o Jogo',

        stat1: 'AT',
        stat2: 'DF',
        stat3: 'ARMA',
        stat4: 'ARMADURA',
        stat5: 'OURO',
        stat6: 'EXP',
        stat7: 'PRÓXIMO',
        stat8: '§fill=#ff0§Aviso:\nLinha do tempo\nNão canônica.',
        stat9: 'MORTES',
        stat10: 'BULLY',
        stat11: 'FLERTE',
        stat12: 'STATUS',
        stat13: '\"$(x)\"',

        story1: ['<24>{#p/storyteller}Muito tempo atrás, duas raças reinavam sobre o sistema solar: HUMANOS e MONSTROS.{^35}{}'],
        story2: ['<24>O tempo passou, uma guerra se iniciou entre as duas raças.{^35}{}'],
        story3: ["<24>Após o planeta dos Monstros ter sido destruído, os HUMANOS declararam vitória.{^35}{}"],
        story4: ['<24>Os MONSTROS restantes foram banidos para um Posto Avançado abandonado.{^35}{}'],
        story5: ['<24>Um escudo de força foi criado, e isso selou os MONSTROS naquela prisão.{^35}{}'],
        story6: ['<24>Muitos anos depois.{^8}.{^8}.{^35}{}'],
        story7: ['<#24>     EBOTT SECTOR     \n         251X{^35}{}'],
        story8: ['<24>Lendas dizem que a este é um local pelo qual as naves espaciais jamais retornam.{^35}{}'],
        story9: ['<24>{^100}{}'],
        story10: ['<24>{^100}{}'],
        story11: ['<24>{^35}{}']
    },

    timeline: {
        main: 'Resumir Linha do Tempo\n      Canônica',
        main_ex: 'Começar Linha do Tempo\n      Canônica',
        timelines: 'Outros Arquivos',
        bisect: 'Copiar',
        delete: 'Deletar',
        instruction: '[ESC] para cancelar / [Enter]\npara confirmar',
        instruction_gamepad: 'Pressione qualquer botão no gamepad para abrir o teclado.',
        launch: 'Entrar',
        rename: 'Renomear',
        create: 'Crie Um Novo',
        placeholder: 'Nome da Linha do Tempo',
        confirm: 'Você tem certeza?'
    }
};


// END-TRANSLATE
