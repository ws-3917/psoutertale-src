// START-TRANSLATE

export default {
    battle: {
        death0: ['(しんこきゅう　した)', "(ケツイが　みなぎった)"],
        death1: ['あきらめては　いけない…', '$(name)！\nケツイを　ちからに　かえるんだ！'],
        death2: ['われわれの　うんめいが  かかっている…', '$(name)！\nケツイを　ちからに　かえるんだ！'],
        death3: ["しっかりしろ！", '$(name)！\nケツイを　ちからに　かえるんだ！'],
        death4: ["きぼうを　すてるな！", '$(name)！\nケツイを　ちからに　かえるんだ！'],
        death5: ['あきらめては　ダメだ！', '$(name)！\nケツイを　ちからに　かえるんだ！'],

        flee1: '    ＊バトルからにげた…',
        flee2: "    ＊さようなら。",
        flee3: "    ＊こんなことを　している　ばあいじゃない。",
        flee4: "    ＊とめないで。",
        flee5: '    ＊バトルからにげた。\n       $(x)EXPと$(y)ゴールドを　てにいれた。',

        mercy_assist: '＊たすけをもとめる',
        mercy_flee: '＊にげる',
        mercy_spare: '＊にがす',

        victory1: '<32>{#p/story}＊YOU WIN！\n＊$(x)EXPと$(y)ゴールドを　かくとく。',
        victory2: '<32>{#p/story}＊YOU WIN！\n＊$(x)EXPと$(y)ゴールドを　かくとく。\n＊LOVEが　あがった。'
    },

    developer: {
        console: {
            header: 'エラー',
            p_resume: {
                header: '無視',
                resume: 'エラーを無視'
            },
            blurb: 'エラーが発生しました！\n開発者にスクリーンショットを送ってください。'
        },
        control: {
            tab: 'コントロ',
            headers: ['一般', 'バトル'],
            items: [
                [
                    'BGMを修正',
                    'プレイヤー修正',
                    'ゴールド無限',
                    '調査を有効化',
                    '入力を有効化',
                    '移動を有効化',
                    '壁を無視',
                    'セーブ',
                    '会話をスキップ',
                    '自由な視点'
                ],
                [
                    'おたすけモード',
                    '弾を削除',
                    'やめる',
                    '枠サイズ',
                    'ﾒﾆｭｰﾘｾｯﾄ',
                    'にがす',
                    'HPむげん',
                    '敵全体をにがす',
                    '自殺',
                    '敵全体を弱体化'
                ]
            ],
            p_speed: {
                fps: '$(x) FPS',
                halt: '一時停止',
                header: 'ゲームスピード',
                next: '加速',
                prev: '減速',
                sec: '$(x)秒 / フレーム'
            }
        },
        godhome: {
            tab: 'ホーム',
            p_teleport: {
                header: 'ルーム',
                action: 'テレポート'
            },
            p_encounter: {
                header: 'バトル',
                action: '始める'
            },
            p_armor: {
                header: 'AMR'
            },
            p_weapon: {
                header: 'WPN'
            }
        },
        inspect: {
            tab: 'レイヤー',
            headers: ['レイヤー', 'タイプ'],
            switches: [
                ['Base', 'Below', 'Main', 'Above', 'Menu'],
                ['攻撃枠', 'スプライト', 'テキスト']
            ],
            p_explorer: {
                header: '表示',
                layers: ['Base (表示)', 'Below (表示)', 'Main (表示)', 'Above (表示)', 'Menu (表示)'],
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
            debug_instructions: '[TAB]でデバッグ情報を表示',
            debug: {
                a: 'A', 
                acceleration: '加速度',
                active: 'アクティブ',
                alpha: 'アルファ値',
                anchor: 'アンカー',
                b: 'B', 
                blend: 'ブレンドモード',
                border: '枠',
                compute: '処理済みのデータサイズ',
                content: '内容',
                crop: 'クロップ',
                down: '下',
                duration: '継続時間',
                exp: 'EXP',
                extent: '拡張範囲',
                f: 'F', 
                face: '方向',
                false: 'いいえ',
                fill: '塗りつぶす',
                fontFamily: 'フォントファミリー',
                fontSize: 'フォントサイズ',
                frames: 'フレームソース',
                gravity: '重力',
                group: 'グループ',
                hp: 'HP',
                index: 'フレーム番号',
                inert: '非アクティブ',
                key: 'キー',
                lastSavedTime: '前回セーブした時間',
                layer: 'レイヤー',
                layers: 'レイヤー',
                left: '左',
                metadata: 'メタデータ',
                music: 'BGM',
                namespace: '名前空間',
                none1: 'なし',
                none2: '無し',
                objects: '対象',
                oversaver: '自動保存',
                parallax: 'パララックス',
                position: '位置',
                primed: '保存データあり',
                priority: '優先度',
                registry: 'レジストリ',
                renderer: 'レンダラー',
                resources: 'リソース',
                reverse: '逆再生',
                right: '右',
                room: 'ルーム',
                roomState: 'ルーム状態',
                rotation: '回転',
                s: 'S', 
                scale: 'スケーリング',
                shopSelection: '店の選択肢',
                size: 'サイズ',
                spacing: '文字間隔',
                spin: '角速度',
                sprites: 'スプライト',
                step: '移動単位',
                stroke: 'ストローク',
                subcrop: 'サブクロップ',
                talk: '会話',
                target: 'ターゲット',
                text: 'テキスト',
                time: '時間',
                tint: '色',
                trackedAssets: '使用されているアセット',
                true: 'はい',
                unknown: '不明',
                up: '上',
                vars: '変数',
                velocity: '速度',
                volatile: '敵'
            }
        },
        savemod: {
            tab: 'セーブ',
            header1: 'セーブ　エディタ',
            domains: [
                'データ (ブール値)',
                'データ (整数)',
                'データ (文字列)',
                'フラグ (ブール値)',
                'フラグ (整数)',
                'フラグ (文字列)'
            ],
            p_page: {
                header: 'ページ番号',
                prev: '戻る',
                next: '進む'
            },
            prompt: '値を入力',
            back: 'もどる'
        },
        storage: {
            tab: 'アイテム',
            header: 'アイテム　エディタ',
            p_container: { header: '容器を選ぶ', prev: '戻る', next: '進む' },
            display: { inventory: 'インベントリー', dimboxA: 'いじげんボックスA', dimboxB: 'いじげんボックスB' }
        }
    },

    dialog: {
        dialog_clear_title: 'セーブファイルを消去',
        dialog_notice_title: '注意',
        dialog_clear_mobile: 'モバイル用の設定をリセット',
        dialog_open: { buttonLabel: '開く', name: 'セーブファイル', title: 'セーブファイルをインポート' },
        dialog_save: { buttonLabel: 'セーブ', name: 'セーブファイル', title: 'セーブファイルをエクスポート' },
        error_load: 'ファイルは解析できませんでした。',
        message_alert: ['確定'],
        message_confirm: ['やめる', '確定'],
        prompt_clear: 'このセーブファイルを消去しますか？',
        prompt_demo: 'OUTERTALE demoのセーブファイルを\n他のタイムラインに移動しました。',
        prompt_save: 'セーブしますか？',
        prompt_clear_mobile: 'モバイル関連の設定を削除してもよいですか？\n（セーブファイルは削除されません）',
        prompt_save_alternate: '新たにJSONファイルを作成し\n以下の内容をコピーして\nデバイスに保存します。',
        prompt_open: 'ロードしますか？'
    },

    extra: {
        credits: [
            [
                '§fill=#ff0§< かいはつ >§fill=#fff§',
                'spacey_432',
                '',
                '§fill=#ff0§< テキスト >§fill=#fff§',
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
                '§fill=#ff0§< テキスト >§fill=#fff§',
                'ThatGuyWhoLikesFood',
                'Turbulation',
                'Zaxento The Greedy',
                '',
                '§fill=#ff0§< びじゅつ >§fill=#fff§',
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
                '§fill=#ff0§< びじゅつ >§fill=#fff§',
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
                '§fill=#ff0§< びじゅつ >§fill=#fff§',
                'supper12',
                'Valor52',
                'Zaxento The Greedy',
                '',
                '§fill=#ff0§< ぎじゅつ >§fill=#fff§',
                'Codetoil',
                'ryi3r',
                'ws3917',
                '',
                '§fill=#ff0§< テスター >§fill=#fff§',
                'Alden',
                'Aspey',
                'Aster',
                'Balgamlı Kedi'
            ],
            [
                '§fill=#ff0§< テスター >§fill=#fff§',
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
                '§fill=#ff0§< テスター >§fill=#fff§',
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
                '§fill=#ff0§< テスター >§fill=#fff§',
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
                '§fill=#ff0§< テスター >§fill=#fff§',
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
                '§fill=#ff0§< テスター >§fill=#fff§',
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
                '§fill=#ff0§< スペシャル・サンクス >§fill=#fff§',
                'Alden',
                '§fill=#808080§わたしを　ささえてくれて\nじんせいのどうりを　おしえてくれて\nわたしは　せいちょうできました。\nありがとうございます。§fill=#fff§'
            ],
            [
                '§fill=#ff0§< スペシャル・サンクス >§fill=#fff§',
                'Aster',
                '§fill=#808080§わたしのゆめを　サポートする\nさいしょのひと　もっとも\nあたたかい　パートナーです。\nあなたに　はげまされて\nこのゲームを　かんせいさせることができました。\nありがとうございます。§fill=#fff§'
            ],
            [
                '§fill=#ff0§< スペシャル・サンクス >§fill=#fff§',
                'Balgamlı Kedi',
                "§fill=#808080§ゲームかいはつ　とうしょから\nいつも　いっしょに　いてくれて\nありがとうございます。\nいつもわたしが　いちばんたすけを\nひつようとするときに　ささえてくれて\nありがとうございます。§fill=#fff§"
            ],
            [
                '§fill=#ff0§< スペシャル・サンクス >§fill=#fff§',
                'Ghostly',
                '§fill=#808080§すばらしい　アドバイス\nゲームテストに　しんけんに\nとりくむよう　はげましてくれて\nありがとうございます。§fill=#fff§'
            ],
            [
                '§fill=#ff0§< スペシャル・サンクス >§fill=#fff§',
                'Zaxento The Greedy',
                '§fill=#808080§しりあったとき　から\nとても　たよりになります。\nそっちょくな　アドバイスを　いただき\nありがとうございます。§fill=#fff§'
            ],
            [
                '§fill=#ff0§< スペシャル・サンクス >§fill=#fff§',
                'ThatGuyWhoLikesFood',
                '§fill=#808080§ゲームの　キーストーリーを\nかいてくれて　いつもわたしを\nおうえんしてくれて　あたらしい\nひょうげんが　できるようにしてくれて\nありがとうございます。§fill=#fff§'
            ],
            [
                '§fill=#ff0§< スペシャル・サンクス >§fill=#fff§',
                'Bilge \"mnwary\"',
                "§fill=#808080§さいごまで　かいはつを　てつだっていただき\nゲームはさいこう　クオリティとなりました。\nありがとうございます。§fill=#fff§"
            ],
            ['§fill=#ff0§Mavisとおともだち§fill=#fff§　ていきょう']
        ],

        final_frontier: {
            header: '(( CAST ))',
            opponents: {
                froggit: {
                    name: 'フロギー',
                    author: 'ScarletScaledDragon',
                    text: {
                        basic: 'じんせいについて\nこうさつちゅう',
                        spare: 'プロのカエル',
                        flirt: 'あいについて\nこうさつちゅう',
                        bully: 'きょうふで\nピョンピョン'
                    }
                },
                whimsun: {
                    name: 'FLUTTERLYTE',
                    author: 'ScarletScaledDragon',
                    text: {
                        basic: 'ひこうを\nおぼえた',
                        spare: 'はげましてくれる\nパイロット',
                        flirt: 'てんくうを　\nさがして',
                        bully: 'こうげきは　ゼッタイ\nよける'
                    }
                },
                moldsmal: {
                    name: 'GELATINI',
                    author: 'spacey_432',
                    text: {
                        basic: 'あらたな\nうちゅうステーションを\nはっけん',
                        spare: 'バックダンサー',
                        flirt: 'エキゾチック\nゼリーダンサー',
                        bully: 'あらたな　ぎんがを\nはっけん'
                    }
                },
                loox: {
                    name: 'OCULOUX',
                    author: 'ScarletScaledDragon',
                    text: {
                        basic: 'いじめっこの\nけいこうアリ',
                        spare: 'こころを　いれかえた\nいじめっこ',
                        flirt: 'みりょくどアップ',
                        bully: ''
                    }
                },
                migosp: {
                    name: 'SILENTE',
                    author: 'ScarletScaledDragon',
                    text: {
                        basic: 'ねっしんな\nイエスマン',
                        spare: 'きままに　じんせいを\nエンジョイちゅう',
                        flirt: 'えんきょり\nれんあいちゅう',
                        bully: 'きけんなことは\nぜんひてい'
                    }
                },
                mushy: {
                    name: 'MUSHY',
                    author: 'Balgamlı Kedi & ScarletScaledDragon',
                    text: {
                        basic: 'いつも\nはずしちゃう',
                        spare: 'はやうちの\nまじゅつし',
                        flirt: 'キミのハートを\nうちぬく',
                        bully: 'へたなてっぽう　かずうちゃあたる'
                    }
                },
                finalghost: {
                    name: 'LURKSALOT',
                    author: 'spacey_432',
                    text: {
                        basic: 'じぶんだけの\nせかいにとじこもる',
                        spare: 'みんなとの　ふれあいを　もとめて',
                        flirt: 'おどろくほど\nむかんしん',
                        bully: ''
                    }
                },
                stardrake: {
                    name: 'STARDRAKE',
                    author: 'Burge',
                    text: {
                        basic: 'おわらい\nしゅぎょうちゅう',
                        spare: 'そこそこ　うれてる\nおわらいげいにん',
                        flirt: 'ぼうゆうめい\nせいしゅんえいがで\nゆうめいじん',
                        bully: ''
                    }
                },
                chilldrake: {
                    name: 'CHILLDRAKE',
                    author: 'Burge',
                    text: {
                        basic: 'いまだに　ファンを\nぼしゅうちゅう',
                        spare: 'カルトてき　だいにんき',
                        flirt: 'ファンによる　キスする\nけんりの　こうかん',
                        bully: 'だれかを　いためつけるのは\nゼッタイハンタイ'
                    }
                },
                spacetop: {
                    name: 'ASTRO SERF',
                    author: 'DESM.al',
                    text: {
                        basic: 'じぶんの　アンテナが\nきになる',
                        spare: 'ラジオばんぐみで\nだいにんき',
                        flirt: 'こいの　よかん',
                        bully: 'きんきゅうほうそう\nやってます'
                    }
                },
                jerry: {
                    name: 'ジェリー',
                    author: 'Discarded Vessel',
                    text: {
                        basic: 'まいにち\nドタキャン',
                        spare: 'ドタキャン　すこし\nへりました',
                        flirt: 'つみを　つぐなっている\nさいちゅう',
                        bully: ''
                    }
                },
                mouse: {
                    name: 'WHIZKARAT',
                    author: 'Zaxento The Greedy & semi',
                    text: {
                        basic: 'じぶんさがしの\nたびへ',
                        spare: 'ネズミしゃかいの\nしんメンバー',
                        flirt: 'ネズミと\nじゃれあうように',
                        bully: 'ネコしゃかいに\nあわててもどった'
                    }
                },
                doggo: {
                    name: 'ワンボー',
                    author: 'Discarded Vessel',
                    text: {
                        basic: 'あの　レンチには\nきっと　またあえる…',
                        spare: 'もうどう犬との\nしんせいかつ',
                        flirt: 'もうどう犬との\nラブラブ生活',
                        bully: 'もうどう犬に\nたすけをもとめて'
                    }
                },
                lesserdog: {
                    name: 'レッサードッグ',
                    author: 'major_memestar',
                    text: {
                        basic: 'あいじょうを\nもとめて…',
                        spare: 'やさしい\nかいぬしをゲット',
                        flirt: 'じぶんだけの\nこいびとゲット',
                        bully: 'あいじょうに\nうえて'
                    }
                },
                dogs: {
                    name: 'イヌッス＆イヌッサ',
                    author: 'major_memestar',
                    text: {
                        basic: 'あの　ぼうきれのことが\nわすれられず',
                        spare: '「おはなスリスリ\n　コンテスト」で\nゆうしょう',
                        flirt: "おたがいの　めを\nみつめて",
                        bully: '子犬へ　ぼうぎょの\nしせい'
                    }
                },
                greatdog: {
                    name: 'グレータードッグ',
                    author: 'major_memestar',
                    text: {
                        basic: "にちじょうの\nへんかに　きづかず",
                        spare: "にちじょうの\nへんかに　こうふんちゅう",
                        flirt: "にちじょうの\nへんかに　ふれる",
                        bully: ''
                    }
                },
                woshua: {
                    name: 'SKRUBBINGTON',
                    author: 'Discarded Vessel',
                    text: {
                        basic: '99.1％　ピカピカ',
                        spare: 'こうあつせんじょう\nのせんもんか',
                        flirt: 'ジャグジー\nメーカー',
                        bully: 'ちょうこうあつ\nせんじょうき'
                    }
                },
                moldbygg: {
                    name: 'GELATA',
                    author: 'spacey_432',
                    text: {
                        basic: 'ベビーシッター\nさがしてます',
                        spare: 'スライム　つきの\nバースツール',
                        flirt: 'コメディばんぐみの\nセクシーレギュラー',
                        bully: 'えいこうの\nプロレスどうぐ'
                    }
                },
                radtile: {
                    name: 'RADTILE',
                    author: 'Balgamlı Kedi & Zaxento The Greedy',
                    text: {
                        basic: 'じぶんのよわさに\nのたうちまわる',
                        spare: 'じぶんは　できるやつ\nだとしんじる',
                        flirt: 'そっくりさんと\nデートちゅう',
                        bully: 'みにくい　みらいへ\nあしを　はこぶ'
                    }
                },
                shyren: {
                    name: 'シャイレーン',
                    author: 'Ghostly',
                    text: {
                        basic: 'ピアノレッスンを\nさいかい',
                        spare: "メタトンと　バンドを\nけっせいした　ボーカル",
                        flirt: 'ゴーストと　ラブラブ',
                        bully: "シンセサイザー　なしでは\nうたえない"
                    }
                },
                doge: {
                    name: 'DOGE',
                    author: 'major_memestar',
                    text: {
                        basic: 'こうじげんばの\nしどうがかり',
                        spare: 'いっしょうぶんの\nスパを　けいやく',
                        flirt: 'はじめて　子犬の\nあいじょうを　かんじた',
                        bully: ''
                    }
                },
                muffet: {
                    name: 'マフェット',
                    author: 'major_memestar',
                    text: {
                        basic: 'つぎの　しはらいを\nまつ',
                        spare: 'スパイダー同盟の\nえんじょちゅう',
                        flirt: 'ピクニックの　ひどりを\nけつだん',
                        bully: ''
                    }
                },
                pyrope: {
                    name: 'HOTWIRE',
                    author: 'semi',
                    text: {
                        basic: 'ビートが　きざまれる\nのを　まつ',
                        spare: 'でんこうせっかの\nラッパー',
                        flirt: 'ラッパー　から\nラブソングの　さっきょくか　に',
                        bully: 'しの　ふちにいたる\nラップバトル'
                    }
                },
                tsundere: {
                    name: 'ツンデレシャトル',
                    author: 'spacey_432',
                    text: {
                        basic: 'ツンデレの　きわみ',
                        spare: 'ワープホールを　とおって\nあなたの　もとに',
                        flirt: 'ツンツン\nデレデレデレデレ',
                        bully: 'ついに　いんねんの\nあいて　にあえた'
                    }
                },
                perigee: {
                    name: 'PERIGEE',
                    author: 'Discarded Vessel',
                    text: {
                        basic: 'あいかわらず\nしょうとつ',
                        spare: 'せいかん　たいし',
                        flirt: 'みんなに　あいを\nひろめる',
                        bully: 'いたみ　をとうして\nやさしさを　みせる'
                    }
                },
                rg: {
                    name: 'RG 03　＆　RG 04',
                    author: 'semi',
                    text: {
                        basic: 'こどもじだいの\nともだちを　さがしちゅう',
                        spare: 'ごそうぞうに\nおまかせ',
                        flirt: 'ごそうぞうに\nおまかせします！',
                        bully: 'ロイヤルガード\nたいしょく　します'
                    }
                },
                glyde: {
                    name: 'グライド',
                    author: 'Burge',
                    text: {
                        basic: 'りそうてきな\nビジネスパートナー\nとは　いえない',
                        spare: 'いつもよりは　すこし\nウサンクサく　ない',
                        flirt: 'りそうてきな\nなかま\nとは　いえない',
                        bully: ''
                    }
                },
                burgie: {
                    name: 'バーガーパンツ',
                    author: 'Pongy25',
                    text: {
                        basic: 'これからの　じんせいも\nはやあしで',
                        spare: 'これからの　じんせいを\nたのしみに',
                        flirt: 'これからの　じんせいに\nあいを　もとめて',
                        bully: ''
                    }
                },
                madjick: {
                    name: 'コズモ',
                    author: 'semi',
                    text: {
                        basic: 'じしょを\nさがしちゅう',
                        spare: 'ゆうめい　マジシャン',
                        flirt: 'あたらしい　まほうを\nはっけん',
                        bully: ''
                    }
                },
                knightknight: {
                    name: 'TERRESTRIA',
                    author: 'major_memestar',
                    text: {
                        basic: 'かこを　たずねて',
                        spare: 'こうめいな\n歴史家',
                        flirt: 'ふるさとに\nむちゅう',
                        bully: ''
                    }
                },
                froggitex: {
                    name: 'ファイナル・フロギー',
                    author: 'PoTheWinterCorder',
                    text: {
                        basic: 'ちえを\nひけらかさない',
                        spare: 'ちえを　オープンに\nきょうゆう',
                        flirt: 'ちえは\nあいの　ために',
                        bully: 'ちえは\nいきのこる　ため'
                    }
                },
                whimsalot: {
                    name: 'FLUTTERKNYTE',
                    author: 'spacey_432',
                    text: {
                        basic: 'いまだに\nれんきんちゅう',
                        spare: 'やっと\nチルできる',
                        flirt: 'ひとりの　じかんを\nかくほちゅう',
                        bully: 'おそろしくて\nはたらきづめ'
                    }
                },
                astigmatism: {
                    name: 'ルーカス・プライム',
                    author: 'semi',
                    text: {
                        basic: 'あいかわらずの　いじめっこ',
                        spare: 'えらそうな\nがんかい',
                        flirt: 'えらそうな\nふくやのてんいん',
                        bully: 'Overthrown By\nAn Oculoux'
                    }
                },
                migospel: {
                    name: 'SILENCIO',
                    author: 'Balgamlı Kedi',
                    text: {
                        basic: 'いまだ　はじしらずの\nおくびょうもの',
                        spare: 'すこし　ゆうきの　でた\nおくびょうもの',
                        flirt: 'きょうふしん\nとともに　いきていく',
                        bully: 'いままでで　いちばん\nにげあしが　はやい'
                    }
                },
                mushketeer: {
                    name: 'MUSHKETEER',
                    author: 'Balgamlı Kedi & Ghostly',
                    text: {
                        basic: 'キノコあたまの\n兵士',
                        spare: 'へいわの　ために\nたたかう　つわもの',
                        flirt: 'あいの　ちからに\nざんぱい',
                        bully: 'きょうふの　きょうせい\nプログラム'
                    }
                }
            },
            swords: {
                papyrus: {
                    name: 'パピルス',
                    author: 'ProctorDorkchop02 & MattSpriteMaster'
                },
                sans: {
                    name: 'サンズ',
                    author: 'ProctorDorkchop02 & Fired'
                },
                undyne: {
                    name: 'アンダイン',
                    author: 'major_memestar'
                },
                alphys: {
                    name: 'アルフィー',
                    author: 'major_memestar'
                },
                mewmew: {
                    name: 'みゅうみゅう',
                    author: 'spacey_432'
                },
                napstablook: {
                    name: 'ナプスタブルーク',
                    author: 'spacey_432'
                },
                mettaton: {
                    name: 'メタトン',
                    author: 'MattSpriteMaster'
                },
                toriel: {
                    name: 'トリエル',
                    author: 'MattSpriteMaster'
                },
                asgore: {
                    name: 'アズゴア',
                    author: 'MattSpriteMaster'
                },
                monsterkid: {
                    name: 'モンスターの子',
                    author: 'spacey_432'
                },
                asriel: {
                    name: 'アズリエル',
                    author: 'Medi0creking & MattSpriteMaster'
                }
            }
        },

        langPrompt: '[↑ / ↓]で　せんたく / [Z / ENTER]で　けってい',
        epilepsyInfo:
            '注意：\n\nこのゲームは§fill=#ff0§フラッシュによる\n光の点滅§fill=#fff§を含みます。\n苦手な方は§fill=#ff0§せってい§fill=#fff§画面から\n変更してください。\n',
        epilepsyKeys: '§fill=#808080§Press [Z or ENTER] to Continue',

        quitText1: 'しゅうりょうしています',
        quitText2: 'しゅうりょうしています…',
        quitText3: 'しゅうりょうしています……',

        real1: [
            [
                'Outertaleを　プレイしてくれて　ありがとう。',
                'このプロジェクトに　とりくめたことは　こうえいです。',
                'そして　うれしいことです。'
            ],
            ['この　ながいながいたびを　はじめたとき', "いちども　ここまで　やってこられるだろうとは\nおもっていませんでした。", 'ですが　いずれにしても　ゲームはかんせいしたのです。'],
            [
                'わたしにとって　UNDERTALEは　じんせいの\nターニングポイント　でした。',
                'そして　そのけいけんは',
                'はじめて　プレイしてから　てばなすことの\nできないものでした。'
            ],
            [
                'だからこそ　OUTERTALEで　あなたにも\nつかんでほしかった。',
                'おなじような　せかいせんを\nたのしむ　チャンスを。',
                'まるで　あなたが　はじめて\nプレイした　かのように。'
            ],
            [
                "わたしは　そのチャンスを　つかんで\nもらえたことを　ねがいます。",
                "また　このせかいせんで　すごした　じかんに",
                "まんぞく　していて　ほしい。"
            ],
            [
                "あなたの　じんせいで　なにをしようが",
                'あなたの　ここでの　こうどうが',
                'あなたの　ニンゲンせいを　ものがたるのです。'
            ],
            [
                "というのも　このエンディングに　とうたつしたのは",
                'あなたに　よるもの。',
                'そのじじつと　あなたを　ひきはなすことは　できません。'
            ],
            ['ミスしたって…？　それでも　あなたはすごいし', 'あいじょうと　きくばりを　もっている　ことになる。', 'そのことは　わすれないで　くださいね？']
        ],
        real2: 'じぶんのことを　だいいちに。　$(x)。',

        end1: 'THE END',
        end2: 'THE END…？',

        restartText1: 'さいきどうしています',
        restartText2: 'さいきどうしています…',
        restartText3: 'さいきどうしています……',

        title: 'OUTERTALE',
        title_timeline: 'OUTERTALE...?'
    },

    gamepad: {
        prompt: 'コントローラーせってい',
        prompt_desc:
            'コントローラーから　ボタンを　せんたくして\nゲームのそうさを　せっていします。\n\nおなじボタンを　おして　けっていするか\nべつのボタンを　おして　さいせっていします。\n\n[ESC]で　せっていを　スキップします。',
        prompt_counter: 'せんたく　ずみ：$(x)',
        z: '[Z / ENTER] - かくてい',
        x: '[X / SHIFT] - キャンセル',
        c: '[C / CTRL] - フィールドメニュー',
        u: '[↑ / W] - うえ',
        l: '[← / A] - ひだり',
        d: '[↓ / S] - した',
        r: '[→ / D] - みぎ',
        f: '[F4] - フルスクリーン',
        prompt_done: 'せっていを　かんりょうしました。\nにんいのボタンを　おして　つづけます。',
        prompt_done_browser: '\nちゅうい：本プラットフォームで　プレイするばあい\nコントローラーで　ぜんがめんを　ひらくことが\nできないばあいが　あります。',
        prompt_load:
            'コントローラーのせっていを　かんりょうしました。\nにんいのボタンを　おして　つづけます。\nあるいは　あるボタンを　3回おして\nコントローラーを　リセットします。\n\n[ESC]で　せっていを　スキップします。'
    },

    general: {
        asriel: 'アズリエル',
        asriel_location: 'The Oblivion',
        disabled: 'オフ',
        enabled: 'オン',
        finish: '[X]で　しゅうりょう',
        frisk: 'フリスク',
        g: 'G',
        hp: 'HP',
        inf: '\u221e',
        landing1: '[PRESS Z OR ENTER]',
        lv: 'LV',
        mystery1: '§mystify=アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユロラリルレロワヲンーャュョッヮァィゥェォガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんーゃゅょっゎぁぃぅぇぉがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽ§aaaa§@mystify=§',
        mystery2: '{@mystify=アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユロラリルレロワヲンーャュョッヮァィゥェォガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんーゃゅょっゎぁぃぅぇぉがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽ}aaaa{@mystify=}',
        mystery2l: '{@mystify=あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんーゃゅょっゎぁぃぅぇぉがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽ}aaaa{@mystify=}',
        mystery2u: '{@mystify=アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユロラリルレロワヲンーャュョッヮァィゥェォガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ}aaaa{@mystify=}',
        no: 'いいえ',
        nominal: '§fill=#0f0§イジョウナシ',
        percent: '$(x)%',
        player: 'player',
        settings: 'せってい',
        shopg: 'G',
        unknown: '?',
        xm: 'XM',
        yes: 'はい'
    },

    menu: {
        box1: 'もちもの',
        box2: 'ボックス',
        key1: 'キーホルダー',

        confirm1: 'このなまえで\nよろしいですか？',
        confirm2: 'すでに　なまえが\nつけられています。',
        confirm3: 'もどる',

        footer: 'OUTERTALE V5.05 (c) 2025 SPACEY_432',

        heal1: '＊(HPが　まんタンになった)',
        heal2: '＊(HPが　$(x)かいふくした)',
        heal3: '＊(HPが　$(x)へった)',
        heal4: '＊(HPが　0になった)',
        heal5: '＊(HPが　$(x)かくとくした)',

        item1: 'USE',
        item2: 'USE',
        item3: 'INFO',
        item4: 'DROP',

        load1: 'コンティニュー',
        load2: 'かんさつ',
        load3: 'リセット',
        load4: '本当のリセット',

        name1: 'ふじちゃくしたニンゲンに\nなまえをつけてください',
        name2: 'やめる',
        name3: 'さくじょ',
        name4: 'かくてい',
        name5: '§fill=#808080§キーボードでの入力をお願いします\n(ひらがな、カタカナと半角英字のみ使用可\n 入力が完了しても表示されない場合は\n 　　　　　1回Enterキーを押してください)\n[ESC] - やめる　[ENTER] - かくてい',

        save1: 'セーブ',
        save2: 'もどる',
        save3: 'セーブしました。',

        settings1: 'せってい',
        settings2: 'もどる',
        settingsprompt1: '-> LANGUAGE & MUSIC',
        settings3: 'げんご',
        settings3a: 'にほんご',
        settings4: 'SE',
        settings5: 'BGM',
        settings6: 'こうがしつ',
        settingsprompt2: '-> GAMEPLAY & GRAPHICS',
        settings6a: 'パワフルなはしり',
        settings6b: 'カラフル',
        settings7: 'てんめつ',
        settings7a: 'ノーマル',
        settings7b: 'やさしめ',
        settings8: 'モバイル　せってい',
        settings9: 'デッドゾーン',
        settings10: 'Modフォルダをひらく',
        settings11: 'さいきどう',
        border: {
            option: 'フレーム',
            list: [
                'なし',
                'ダイナミック',
                'シンプル',
                'STAR',
                'アウトランド',
                'OUTLANDS (BATTLE)',
                'TORIEL HOME',
                'スタートン',
                'STARTON (BATTLE)',
                'ファウンドリー',
                'FOUNDRY (BATTLE)',
                'エアリアル',
                'AERIALIS (BATTLE)',
                'REC CENTER',
                'REC CENTER (BATTLE)',
                'コア',
                "CORE (BATTLE)",
                'シタデル',
                'ASGORE HOME',
                'ARCHIVE SIX',
                'ASRIEL BATTLE',
                'BRIGHT GALAXY',
                'NEW WORLD',
                'NEW WORLD (WITH CUP)',
                '§fill=#808080§(みかいほう)'
            ]
        },
        mobile: {
            title: 'パッド　せってい',
            controlOpacity: 'とうめいど',
            controlType: 'コントローラー',
            enableDiagonal: 'ARROW KEY LAYOUT',
            enableSingleArrow: '方向キーどくりつ',

            fourKey: '\u4dc8 4-KEY',
            eightKey: '\u4dc9 8-KEY',
            deadZone: 'デッドゾーン',
            toleranceAngle: 'かくどの　はんい',

            loadDefault: 'デフォルトにリセット',
            enableMultiConfig: 'ENABLE QUICK SWITCHING',
            invertButtonPos: 'INVERT BUTTON POSITION',

            prompt1: '--- プリセットのせんたく ---',
            prompt2: '--- いっぱん ---',
            prompt3: '--- コントローラーせってい ---',
            prompt4: '--- ボタンせってい ---',

            nextpage: 'つぎのページ >',
            prepage: '< まえのページ',

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

            xPos: 'ちゅうしんのXざひょう',
            yPos: 'ちゅうしんのYざひょう',
            size: 'ボタンサイズ',
            radius: '円のはんけい',

            keysettings: 'ボタン　せってい',
            keyprompt0: '§fill=#ffd700§>> §fill=#fff§ターゲット: §fill=#00ffff§$(x) §fill=#808080§([R]でリセット)',
            keyprompt1: '§fill=#fff§てじゅん: §fill=#00ffff§($(x)§fill=#fff§/§fill=#00ffff§3)',
            keyprompt1a: ' [1] おおまかな　いちを　きめる',
            keyprompt1b: ' [2] いちを　びちょうせいする',
            keyprompt1c: ' [3] おおきさを　ちょうせいする',
            keyprompt1d:
                '§fill=#00ff00§*** ボタンのざひょうをせってい\n§fill=#fff§[L] (左上) でスタート',
            keyprompt1e: '§fill=#00ff00§*** せっていかんりょう \n§fill=#fff§ほかのボタンのせっていも\nできます',
            keyprompt2: '§fill=#4169e1§--- そうさほうほう ---',
            keyprompt2a:
                '§fill=#fff§* §fill=#00ffff§$(x)§fill=#fff§をいどうさせる\n§fill=#ffd700§* [L]をおして§fill=#808080§かくてい\n§fill=#ffd700§* [R]をおして§fill=#808080§ざひょうをリセット\n§fill=#808080§こまかいちょうせいは　つぎのステップで',
            keyprompt2b:
                '§fill=#fff§* §fill=#ffd700§十字キー§fill=#fff§でせいかくに　そろえる\n§fill=#ffd700§*[R]をおして§fill=#808080§ざひょうをリセット\n§fill=#808080§もとのざひょうは　したにひょうじ\n§fill=#ffd700§* [L]をおして§fill=#808080§かくてい',
            keyprompt2c:
                '§fill=#fff§* §fill=#ffd700§[-5] [-1] [+1] [+5]をおして§fill=#fff§サイズをセット\n§fill=#ffd700§* [R]をおして§fill=#808080§デフォルトにリセット\n§fill=#808080§もとのサイズは　したにひょうじ\n§fill=#ffd700§* [L]をおして§fill=#808080§かくてい',
            keyprompt3a: '§fill=#4169e1§-> §fill=#fff§ざひょう: \n§fill=#00ffff§X=$(x), Y=$(y)',
            keyprompt3b: '§fill=#4169e1§-> §fill=#fff§サイズ: §fill=#00ffff§$(x)',

            helper_loadDefault:
                '§fill=#ff0§[Z]をおして§fill=#808080§せっていを　デフォルトのものに　もどします。\nげんざいのカスタムせっていを　すべてクリアし\nもとのせっていへと　もどします。',
            helper_enableMultiConfig:
                '§fill=#ff0§Press [Z]§fill=#808080§ to show/hide the configuration buttons.\nIf enabled, five number buttons ([0] - [4]) will display on the left side of the screen.\n§fill=#fff§These buttons allow you to quickly switch between different configuration options.§fill=#fff§',
            helper_controlType:
                '§fill=#ff0§[Z]をおして§fill=#808080§いかの２つのコントローラーを　えらびます。\n§fill=#ff0§1. 十字キー§fill=#808080§: むかしながらの　方向キー\n§fill=#ff0§2. 仮想ジョイスティック§fill=#808080§: タッチスクリーンでつかいやすい　コントローラー',
            helper_controlOpacity:
                '§fill=#ff0§左右キーをつかって§fill=#808080§とうめいどを　ちょうせいします。\nあたいがおおきいほど　ボタンはせんめいになり　ちいさいほど　とうめいになります。',
            helper_enableDiagnal:
                '§fill=#ff0§[Z]をおして§fill=#808080§ななめいどうを　ゆうこうにします。\nせっていがオンのとき　§fill=#ff0§２つのほうこうをあわせた§fill=#808080§\nキーがついかされます。',
            helper_deadZone:
                "§fill=#ff0§左右キーをつかって§fill=#808080§ジョイスティックのかんどを　ちょうせいします。\n§fill=#fff§デッドゾーンとはジョイスティックのはんのうしないぶぶんです。§fill=#808080§.\nデッドゾーンがおおきいと　かんどがひくくなります。",
            helper_toleranceAngle:
                '§fill=#ff0§左右キーをつかって§fill=#808080§ジョイスティックのかくどにおける　かんどをちょうせいします。\n§fill=#fff§うごきのせいかくさが　きまります。§fill=#808080§\n45°いじょうで　ななめいどうが　かのうです。',
            helper_showFullScrKey:
                '§fill=#ff0§Press [Z]§fill=#808080§ to toggle the visibility of the\n§fill=#fff§Fullscreen button§fill=#808080§.',
            helper_modifyButtons:
                '§fill=#ff0§[Z]をおして§fill=#808080§ボタンのレイアウトをへんこうします。\nすべてのボタンの§fill=#ff0§サイズとざひょう§fill=#808080§を　ちょうせいできます。\nてじゅんにそって　すすめてください。',
            helper_singleArrow:
                '§fill=#ff0§[Z]をおして§fill=#808080§１つごとにボタンのせっていを　へんこうできるようにします。\nせっていがオンのとき　§fill=#fff§それぞれのボタンのざひょうとサイズを§fill=#808080§ちょうせいすることができます。\nより　じゅうなんせいが　あがるでしょう。',
            helper_invertButtonPos:
                '§fill=#ff0§Press [Z]§fill=#808080§ to toggle the §fill=#fff§Invert Button Position§fill=#808080§ feature.\nWhen enabled, the layout of virtual navigation buttons will be mirrored left-to-right for better accessibility or personal preference.'
        },

        sidebar1: 'ITEM',
        sidebar2: 'STAT',
        sidebar3: 'PHONE',
        sidebar4: 'SETT',
        sidebar5: 'S',

        start1: [
            '― ボタンそうさ ―',
            '[Z / ENTER] - かくてい',
            '[X / SHIFT] - キャンセル',
            '[C / CTRL] - フィールドメニュー',
            '[F4] - フルスクリーン',
            '[ESCながおし] - さいきどう',
            'HPが0になるとゲームオーバー'
        ],
        start2: 'ゲームをはじめる',

        stat1: 'ATK',
        stat2: 'DEF',
        stat3: 'WPN',
        stat4: 'AMR',
        stat5: 'GOLD',
        stat6: 'EXP',
        stat7: 'NEXT',
        stat8: '§fill=#ff0§　けいこく\nメインでない\nタイムライン',
        stat9: 'KILLS',
        stat10: '\u4dc2',
        stat11: '\u4dc1',
        stat12: 'STATUS',
        stat13: '\"$(x)\"',

        story1: ['<16>{#p/storyteller}むかしむかし　たいようけいには\nニンゲンと　モンスターという\n2つのしゅぞくが　いました。{^35}{}'],
        story2: ['<16>ときが　たつにつれ\n2つのしゅぞくの　あいだに\nせんそうが　おきました。{^35}{}'],
        story3: ["<16>そして　モンスターたちの\n母星を　はかいされたのち\nニンゲンが　しょうりしました。{^35}{}"],
        story4: ['<16>のこりの　モンスターたちは　ほうきされた　ぜんしょうきちに　ついほうされました。{^35}{}'],
        story5: ['<16>ニンゲンは　フォース\nフィールドで　モンスターたちを\nとじこめました。{^35}{}'],
        story6: ['<16>それから　さらに\nながい　ときが　ながれ…{^8}…{^8}…{^35}{}'],
        story7: ['<#24>     イビト　セクター    \n      251X年{^35}{}'],
        story8: ['<16>それは　「うちゅうせんは\nにどと　もどらない」といわれる\nてんせつのセクターでした。{^35}{}'],
        story9: ['<16>{^100}{}'],
        story10: ['<16>{^100}{}'],
        story11: ['<16>{^35}{}']
    },

    timeline: {
        main: 'メインタイムラインに　もどる',
        main_ex: 'メインタイムラインを　はじめる',
        timelines: 'ほかの　タイムライン',
        bisect: 'ぶんかつ',
        delete: 'さくじょ',
        instruction: '[ESC]で　やめる / [ENTER]で　かくてい',
        instruction_gamepad: 'コントローラーの　にんいのボタンを　おして　キーボードを　ひらきます。',
        launch: 'はいる',
        rename: 'なまえへんこう',
        create: 'しんきさくせい',
        placeholder: 'タイムラインの　なまえを　にゅうりょく',
        confirm: 'ほんとうに？'
    }
};


// END-TRANSLATE
