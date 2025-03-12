// START-TRANSLATE

export default {
    battle: {
        death0: ['（你深吸了一口氣。）', "（你充滿了決心。）"],
        death1: ['現在還不能放棄...', '$(name)！\n保持你的決心...'],
        death2: ['我們的命運都\n寄託於你...', '$(name)！\n保持你的決心...'],
        death3: ["你會沒事的！", '$(name)！\n保持你的決心...'],
        death4: ["別失去希望！", '$(name)！\n保持你的決心...'],
        death5: ['現在還不能結束！', '$(name)！\n保持你的決心...'],

        flee1: '   * 先走一步...',
        flee2: "   * 我先撤了。",
        flee3: "   * 我還有別的事要做。",
        flee4: "   * 別拖我後腿。",
        flee5: '   * 你逃跑了，\n   * 你獲得了$(x) EXP和$(y)G。',

        mercy_assist: '* 外援',
        mercy_flee: '* 逃跑',
        mercy_spare: '* 饒恕',

        victory1: '<32>{#p/story}* 你勝利了！\n* 你獲得了$(x) EXP和$(y)G。',
        victory2: '<32>{#p/story}* 你勝利了！\n* 你獲得了$(x) EXP和$(y)G。\n* 你的LOVE增加了。'
    },

    developer: {
        console: {
            header: '錯誤',
            p_resume: {
                header: '忽略',
                resume: '點擊此處忽略錯誤'
            },
            blurb: '遊戲出現錯誤！當前版本號：V74.1\n請截圖傳送給漢化組（QQ：797416533）。'
        },
        control: {
            tab: '快捷功能',
            headers: ['主世界', '戰鬥中'],
            items: [
                [
                    '音樂初始化',
                    '角色初始化',
                    '無限金錢',
                    '允許角色互動',
                    '允許遊戲輸入',
                    '允許角色移動',
                    '無視牆體',
                    '快速存檔',
                    '跳過文本',
                    '自由視角'
                ],
                [
                    '允許外援',
                    '清除彈幕',
                    '退出戰鬥',
                    '重置框體大小',
                    '重置選單',
                    '允許逃跑',
                    '無限血量',
                    '安撫所有敵人',
                    '自殺',
                    '清空敵人血條'
                ]
            ],
            p_speed: {
                fps: '$(x)幀',
                halt: '暫停',
                header: '遊戲倍速',
                next: '加速',
                prev: '減速',
                sec: '每幀$(x)秒'
            }
        },
        godhome: {
            tab: '傳送/戰鬥',
            p_teleport: {
                header: '房間',
                action: '傳送'
            },
            p_encounter: {
                header: '戰鬥',
                action: '開始'
            },
            p_armor: {
                header: '防具'
            },
            p_weapon: {
                header: '武器'
            }
        },
        inspect: {
            tab: '察看圖層',
            headers: ['圖層', '類別'],
            switches: [
                ['基層', '下層', '主層', '上層', '選單層'],
                ['碰撞箱', '貼圖', '文本']
            ],
            p_explorer: {
                header: '瀏覽',
                layers: ['基層', '下層', '主層', '上層', '選單層'],
                letters: {
                    animation: '動',
                    character: 'NPC',
                    rectangle: '方',
                    entity: '形',
                    hitbox: '箱',
                    object: '物',
                    player: '人',
                    sprite: '圖',
                    text: '文'
                }
            },
            debug_instructions: '按[TAB]鍵瀏覽除錯資訊',
            debug: {
                a: '存活？', 
                acceleration: '對象加速度',
                active: '動態',
                alpha: '不透明度',
                anchor: '錨點定位方式',
                b: '暴力饒恕過？', 
                blend: '渲染方式',
                border: '邊框設定',
                compute: '實際尺寸',
                content: '對象內容',
                crop: '裁剪區域坐標',
                down: '下',
                duration: '動畫時長（幀）',
                exp: 'EXP',
                extent: '延伸尺寸',
                f: '調情過？', 
                face: '面部朝向',
                false: '否',
                fill: '填充顏色',
                fontFamily: '字體',
                fontSize: '字體大小',
                frames: '當前幀源檔案',
                gravity: '重力',
                group: '戰鬥組',
                hp: '血量',
                index: '當前播放幀',
                inert: '未激活',
                key: '名稱',
                lastSavedTime: '上次存檔時間',
                layer: '圖層編號',
                layers: '包含圖層',
                left: '左',
                metadata: '元數據',
                music: '音樂',
                namespace: '命名空間',
                none1: '無',
                none2: '無',
                objects: '對象數',
                oversaver: '自動存檔',
                parallax: '視差滾動',
                position: '位置坐標',
                primed: '蓄能狀態',
                priority: '優先級',
                registry: '存檔變量',
                renderer: '圖像渲染器',
                resources: '已使用資源',
                reverse: '倒放資源',
                right: '右',
                room: '房間',
                roomState: '房間狀態',
                rotation: '旋轉角度',
                s: '圖', 
                scale: '縮放',
                shopSelection: '當前選項（商店選單）',
                size: '設定尺寸',
                spacing: '間距',
                spin: '快速旋轉',
                sprites: '資源參數',
                step: '更新頻率',
                stroke: '輪廓描邊',
                subcrop: '子區域裁剪坐標',
                talk: '正在說話',
                target: '針對目標',
                text: '文本',
                time: '持續時間',
                tint: '顏色值',
                trackedAssets: '當前跟蹤的資源',
                true: '是',
                unknown: '未知',
                up: '上',
                vars: '變量',
                velocity: '移動速度',
                volatile: '敵人'
            }
        },
        savemod: {
            tab: '編輯存檔',
            header1: '存檔編輯器',
            domains: [
                '數據（布爾型）',
                '數據（數值型）',
                '數據（字符串型）',
                '節點（布爾型）',
                '節點（數值型）',
                '節點（字符串型）'
            ],
            p_page: {
                header: '翻頁',
                prev: '上一頁',
                next: '下一頁'
            },
            prompt: '輸入變量值',
            back: '返回'
        },
        storage: {
            tab: '物品庫存',
            header: '物品庫存編輯器',
            p_container: { header: '選擇容器', prev: '上一頁', next: '下一頁' },
            display: { inventory: '物品欄', dimboxA: '次元箱 A', dimboxB: '次元箱 B' }
        }
    },

    dialog: {
        dialog_clear_title: '刪除存檔',
        dialog_notice_title: '提示',
        dialog_clear_mobile: '重置移動端設定',
        dialog_open: { buttonLabel: '打開', name: '存檔檔案', title: '匯入存檔' },
        dialog_save: { buttonLabel: '儲存', name: '存檔檔案', title: '匯出存檔' },
        error_load: '無法解析存檔。',
        message_alert: ['確定'],
        message_confirm: ['取消', '確定'],
        prompt_clear: '刪除這個存檔嗎？',
        prompt_demo: '已將您的OUTERTALE demo存檔\n移動到其他時間軸槽位中。',
        prompt_save: '將存檔儲存到其他位置嗎？',
        prompt_clear_mobile: '確定重置所有移動端設定嗎？\n（包含搖杆大小、按鍵位置等。）\n（該功能不會清空遊戲存檔，請放心。）',
        prompt_save_alternate: '新建一個JSON檔案，\n將下列內容複製進去\n並儲存到裝置中。',
        prompt_open: '讀取這個存檔嗎？'
    },

    extra: {
        credits: [
            [
                '§fill=#ff0§< 遊戲開發者 >§fill=#fff§',
                'spacey_432',
                '',
                '§fill=#ff0§< 文本編寫 >§fill=#fff§',
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
                '§fill=#ff0§< 文本編寫 >§fill=#fff§',
                'ThatGuyWhoLikesFood',
                'Turbulation',
                'Zaxento The Greedy',
                '',
                '§fill=#ff0§< 美工 >§fill=#fff§',
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
                '§fill=#ff0§< 美工 >§fill=#fff§',
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
                '§fill=#ff0§< 美工 >§fill=#fff§',
                'supper12',
                'Valor52',
                'Zaxento The Greedy',
                '',
                '§fill=#ff0§< 技術助理 >§fill=#fff§',
                'Codetoil',
                'ryi3r',
                'ws3917',
                '',
                '§fill=#ff0§< 遊戲測試 >§fill=#fff§',
                'Alden',
                'Aspey',
                'Aster',
                'Balgamlı Kedi'
            ],
            [
                '§fill=#ff0§< 遊戲測試 >§fill=#fff§',
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
                '§fill=#ff0§< 遊戲測試 >§fill=#fff§',
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
                '§fill=#ff0§< 遊戲測試 >§fill=#fff§',
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
                '§fill=#ff0§< 遊戲測試 >§fill=#fff§',
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
                '§fill=#ff0§< 遊戲測試 >§fill=#fff§',
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
                '§fill=#ff0§< 特別鳴謝 >§fill=#fff§',
                'Alden',
                '§fill=#808080§感謝你給我依靠，\n教會我人生的道理，\n讓我變得更好。§fill=#fff§'
            ],
            [
                '§fill=#ff0§< 特別鳴謝 >§fill=#fff§',
                'Aster',
                '§fill=#808080§你是第一個支援我夢想的人，\n也是我最暖心的夥伴。\n在你的激勵下，\n我才能完成這款遊戲。§fill=#fff§'
            ],
            [
                '§fill=#ff0§< 特別鳴謝 >§fill=#fff§',
                'Balgamlı Kedi',
                "§fill=#808080§感謝你從遊戲開發之初\n就一直陪伴我。\n無論何時，你總會在\n我最需要幫助的時候支援我。§fill=#fff§"
            ],
            [
                '§fill=#ff0§< 特別鳴謝 >§fill=#fff§',
                'Ghostly',
                '§fill=#808080§感謝你在遊戲的許多方面\n給出了很棒的建議，\n鼓勵我認真對待測試工作。§fill=#fff§'
            ],
            [
                '§fill=#ff0§< 特別鳴謝 >§fill=#fff§',
                'Zaxento The Greedy',
                '§fill=#808080§感謝你直言不諱，\n給予我大量批評和建議。\n從認識的那天起\n你就非常值得信賴。§fill=#fff§'
            ],
            [
                '§fill=#ff0§< 特別鳴謝 >§fill=#fff§',
                'ThatGuyWhoLikesFood',
                '§fill=#808080§感謝你幫助我撰寫了\n遊戲中的關鍵劇情，\n並始終支援我的夢想，\n讓我能以全新的方式表達自我。§fill=#fff§'
            ],
            [
                '§fill=#ff0§< 特別鳴謝 >§fill=#fff§',
                'Bilge \"mnwary\"',
                "§fill=#808080§感謝你從遊戲開發之初\n一直陪伴到遊戲正式發布。\n有了你的幫助，遊戲的劇情\n才能發揮到最佳水準。§fill=#fff§"
            
        ],
            [
            "§fill=#ff0§< 漢化組成員 >§fill=#fff§",
            "§fill=#ff7§【文翻 & 文校】§fill=#fff§",
            "1個渣渣",
            "braing",
            "errosia",
            "Hola amigo!",
            "Murder--Sans_MDR",
            "R.o.C.t.D./π/3.1415⑨",
            "Wasneet Potato",
            "ws3917",
            "§fill=#ff7§【程式】§fill=#fff§",
            "ws3917",
        ],
        [
            "§fill=#ff0§< 漢化組成員 >§fill=#fff§",
            "§fill=#ff7§【美術】§fill=#fff§",
            "KodLenss",
            "小雲愛喝二鍋頭",
            "屑moons月亮君",
            "御魂_",
            "這是紙鳶",
            "§fill=#ff7§【精神支援&推廣】§fill=#fff§",
            "AX暗星233",
            "幻-_-風",
            "屑moons月亮君",
        ],
        [
            "§fill=#ff0§< 漢化組成員 >§fill=#fff§",
            "§fill=#ff7§【漢化測試】§fill=#fff§",
            "braing",
            "鷗皇不歐",
            "升級無敵",
            "Wasneet Potato",
            "雪理奈",
            "（以及其他漢化組成員）",
            "",
            "感謝漢化組成員的努力付出！",
            "同時，也感謝您對這款遊戲的喜愛！",
        ],
        [
            "§fill=#ff0§< 漢化組留言 >§fill=#fff§",
            "",
            "如果在遊玩過程中遇到各種Bug，",
            "或者對遊戲有好的建議，",
            "可以B站關注§fill=#ff0§@PS域外傳說漢化組§fill=#808080§",
            "並留言反饋！",
            "",
            "同時，我們正在為遊戲製作各種Mod！",
            "歡迎貢獻好的點子！",
        ],
['特別鳴謝 由§fill=#ff0§Mavis與朋友們§fill=#fff§提供']
        ],

        final_frontier: {
            header: '(( 演員表 ))',
            opponents: {
                froggit: {
                    name: '蛙吉特',
                    author: 'ScarletScaledDragon',
                    text: {
                        basic: '還在追尋\n蛙生意義',
                        spare: '蛙界\n職業選手',
                        flirt: '仍不知\n愛為何物',
                        bully: '又驚又怕\n到處蹦躂'
                    }
                },
                whimsun: {
                    name: '飄遊蟲蟲',
                    author: 'ScarletScaledDragon',
                    text: {
                        basic: '渴望學會\n飛翔',
                        spare: '心懷勇氣\n努力飛翔',
                        flirt: '尋覓\n天空的浪漫',
                        bully: '擔驚受怕\n四處躲藏'
                    }
                },
                moldsmal: {
                    name: '小黏團',
                    author: 'spacey_432',
                    text: {
                        basic: '發現\n新空間站',
                        spare: '是跳舞的\n不過是替補的',
                        flirt: '果凍界\n舞林高手',
                        bully: '跑到了\n新星系'
                    }
                },
                loox: {
                    name: '乾瞪眼',
                    author: 'ScarletScaledDragon',
                    text: {
                        basic: '成了\n小霸王',
                        spare: '洗心革面\n成了好「惡霸」',
                        flirt: '學會拋媚眼\n有點小撩人',
                        bully: ''
                    }
                },
                migosp: {
                    name: '忍術蟑螂',
                    author: 'ScarletScaledDragon',
                    text: {
                        basic: '性格超級好\n合群得不得了',
                        spare: '快樂擺爛\n享受生活',
                        flirt: '默默暗戀\n就是不說',
                        bully: '遇到危險\n就當沒看見'
                    }
                },
                mushy: {
                    name: '蘑西',
                    author: 'Balgamlı Kedi & ScarletScaledDragon',
                    text: {
                        basic: '專打\n空包彈',
                        spare: '神槍手\n兼魔術師',
                        flirt: '槍桿子中\n出愛情',
                        bully: '子彈齊掃\n心裡祈禱'
                    }
                },
                finalghost: {
                    name: '匿羅',
                    author: 'spacey_432',
                    text: {
                        basic: '潔身自好\n獨來獨往',
                        spare: '總想找人\n「身體接觸」',
                        flirt: '這個幽靈\n很高冷',
                        bully: ''
                    }
                },
                stardrake: {
                    name: '星鐵龍',
                    author: 'Burge',
                    text: {
                        basic: '努力尋找\n「星」笑點',
                        spare: '演演喜劇\n小有名氣',
                        flirt: '收穫大批\n成年粉絲',
                        bully: ''
                    }
                },
                chilldrake: {
                    name: '小酷龍',
                    author: 'Burge',
                    text: {
                        basic: '孤芳自賞\n無人問',
                        spare: '一朝成名\n天下知',
                        flirt: '找到同僚\n先嘴一個',
                        bully: '路見惡霸\n勇敢出手'
                    }
                },
                spacetop: {
                    name: '太空帽',
                    author: 'DESM.al',
                    text: {
                        basic: '還成天守著\n那根天線',
                        spare: '在廣播界\n擔起半壁江山',
                        flirt: '電波對上了\n愛就來了',
                        bully: '「各位聽眾，緊急\n 插播一條訊息！」'
                    }
                },
                jerry: {
                    name: '傑瑞',
                    author: 'Discarded Vessel',
                    text: {
                        basic: '日常\n被人甩',
                        spare: '日常被人甩\n但次數-1',
                        flirt: '洗心革面\n做個好傑瑞',
                        bully: ''
                    }
                },
                mouse: {
                    name: '紳鼠貓',
                    author: 'Zaxento The Greedy & semi',
                    text: {
                        basic: '我是鼠鼠？\n還是貓貓？',
                        spare: '當上了\n新鼠鼠',
                        flirt: '和鼠鼠\n打成一片',
                        bully: '嚇得不輕\n重新做貓'
                    }
                },
                doggo: {
                    name: '遁狗',
                    author: 'Discarded Vessel',
                    text: {
                        basic: '萬能的扳手\n就是他的神',
                        spare: '有了新狼\n但還不是新郎',
                        flirt: '有了新狼\n也有了新郎',
                        bully: '有了新狼\n遇到危險他來抗'
                    }
                },
                lesserdog: {
                    name: '小犬座',
                    author: 'major_memestar',
                    text: {
                        basic: '想要摸摸',
                        spare: '狗狗遇主\n新情濃',
                        flirt: '濃情新主\n遇狗狗',
                        bully: '跪求摸摸'
                    }
                },
                dogs: {
                    name: '狗來米 & 狗媳兒',
                    author: 'major_memestar',
                    text: {
                        basic: '日思夜想著\n那根扳手',
                        spare: '狗狗賣萌賽\n一舉奪魁',
                        flirt: "四目相對\n隨即陷入愛河",
                        bully: '常常緊盯對方\n總是不停提防'
                    }
                },
                greatdog: {
                    name: '大犬座',
                    author: 'major_memestar',
                    text: {
                        basic: "活著\n還是那樣",
                        spare: "活著\n真的很棒",
                        flirt: "活著\n非常幸福",
                        bully: ''
                    }
                },
                woshua: {
                    name: '刷潔頓',
                    author: 'Discarded Vessel',
                    text: {
                        basic: '給自己打98.2分\n因為還有1.8乾淨',
                        spare: '給社會\n來了波大清洗',
                        flirt: '激情浴缸\n創始人',
                        bully: '洗呀刷呀\n洗走內心的高壓'
                    }
                },
                moldbygg: {
                    name: '大黏簇',
                    author: 'spacey_432',
                    text: {
                        basic: '渴望寶寶來坐\n渴望成為寶座',
                        spare: '今「黏」開始進軍\n酒吧座椅行業',
                        flirt: '成了一名\n性感喜劇座駕',
                        bully: '光榮進入\n摔跤用品倉庫'
                    }
                },
                radtile: {
                    name: '老頑鱷',
                    author: 'Balgamlı Kedi & Zaxento The Greedy',
                    text: {
                        basic: '長得再失敗\n還是那麼帥',
                        spare: '幡然醒悟\n開始注意形象',
                        flirt: '從自戀發展到\n和自己談戀愛',
                        bully: '越發覺得\n「人醜就是福」'
                    }
                },
                shyren: {
                    name: '害羞塞壬',
                    author: 'Ghostly',
                    text: {
                        basic: '重操舊業\n繼續上鋼琴課',
                        spare: "當上了鎂塔樂團\n新領唱",
                        flirt: '愛上了\n某隻鬼鬼',
                        bully: "失去了合成器\n再也無法唱歌了"
                    }
                },
                doge: {
                    name: '督吉',
                    author: 'major_memestar',
                    text: {
                        basic: '當上了\n施工隊小隊長',
                        spare: '給自己充了\n終身水療VIP',
                        flirt: '第一次感受到\n戀愛的感覺',
                        bully: ''
                    }
                },
                muffet: {
                    name: '瑪菲特',
                    author: 'major_memestar',
                    text: {
                        basic: '還等著顧客\n乖乖上門呢',
                        spare: '對自己的蜘蛛\n更加上心',
                        flirt: '野炊時幫別人\n介紹對象',
                        bully: ''
                    }
                },
                pyrope: {
                    name: '烈焰熱線',
                    author: 'semi',
                    text: {
                        basic: '打起節拍\n一起搖擺',
                        spare: '超愛激情Rap\n那叫一個快樂',
                        flirt: '唱得跳得累了\n寫點情歌醉了',
                        bully: '哥要使勁嗨\n嗨到哥心衰'
                    }
                },
                tsundere: {
                    name: '傲嬌飛船',
                    author: 'spacey_432',
                    text: {
                        basic: '天之驕子\n飛往傲嬌的彼岸',
                        spare: '火速接近你\n只為獻愛意',
                        flirt: '您是我的驕傲\n我是您的傲嬌',
                        bully: '可算是\n棋逢對手'
                    }
                },
                perigee: {
                    name: '呦呦雞',
                    author: 'Discarded Vessel',
                    text: {
                        basic: '時光匆匆\n矛盾重重',
                        spare: '當上了\n星際外交大使',
                        flirt: '熱心牽紅線\n成就他人姻緣',
                        bully: '我心傷悲\n但絕不讓人心碎'
                    }
                },
                rg: {
                    name: '三號守衛 & 四號守衛',
                    author: 'semi',
                    text: {
                        basic: '各自還在尋找\n童年夥伴',
                        spare: '自行\n腦補',
                        flirt: '沒有大圖\n請自行腦補',
                        bully: '當夠皇家守衛\n不幹了'
                    }
                },
                glyde: {
                    name: '老滑頭',
                    author: 'Burge',
                    text: {
                        basic: '跟他談生意\n可倒了血霉了',
                        spare: '似乎也開始\n良心發現了',
                        flirt: '跟他同床共枕？\n勸你小心點',
                        bully: ''
                    }
                },
                burgie: {
                    name: '漢堡褲',
                    author: 'Pongy25',
                    text: {
                        basic: '他的人生\n行色匆匆',
                        spare: '他的人生\n鴻運當頭',
                        flirt: '他的人生\n為愛發愁',
                        bully: ''
                    }
                },
                madjick: {
                    name: '謎宇人',
                    author: 'semi',
                    text: {
                        basic: '仍在尋找\n魔法捲軸',
                        spare: '成為一名\n著名魔法師',
                        flirt: '成功發現\n新型魔法',
                        bully: ''
                    }
                },
                knightknight: {
                    name: '特雷莉亞',
                    author: 'major_memestar',
                    text: {
                        basic: '仍在\n追尋過去',
                        spare: '成為一名\n著名歷史學家',
                        flirt: '對故園舊景\n仍難以忘懷',
                        bully: ''
                    }
                },
                froggitex: {
                    name: '終極蛙吉特',
                    author: 'PoTheWinterCorder',
                    text: {
                        basic: '將智慧\n埋藏於心',
                        spare: '將智慧\n大方分享',
                        flirt: '將智慧\n融入愛情',
                        bully: '將智慧\n用於自保'
                    }
                },
                whimsalot: {
                    name: '飄遊䗁士',
                    author: 'spacey_432',
                    text: {
                        basic: '每天的工作\n還是那麼多',
                        spare: '終於...\n能喘息一下了',
                        flirt: '想找個機會\n好好獨處',
                        bully: '每天都加班\n就圖個心安'
                    }
                },
                astigmatism: {
                    name: '眼行者長老',
                    author: 'semi',
                    text: {
                        basic: '惡霸脾氣\n一點沒改',
                        spare: '當上眼科醫生\n仍然盛氣凌人',
                        flirt: '當上皮革裁縫\n仍然盛氣凌人',
                        bully: '最終，被一隻\n乾瞪眼推翻'
                    }
                },
                migospel: {
                    name: '默之蟑',
                    author: 'Balgamlı Kedi',
                    text: {
                        basic: '膽子不大\n臉皮不小',
                        spare: '膽子終於\n大一點了',
                        flirt: '生活在恐懼中\n也生活在幸福中',
                        bully: '逃跑速度\n越來越快'
                    }
                },
                mushketeer: {
                    name: '蘑炮手',
                    author: 'Balgamlı Kedi & Ghostly',
                    text: {
                        basic: '組建了一支\n蘑菇軍團',
                        spare: '身經百戰\n也更加崇尚和平',
                        flirt: '身經百戰\n最後敗給了愛情',
                        bully: '被嚇得\n身體僵直'
                    }
                }
            },
            swords: {
                papyrus: {
                    name: '帕派瑞斯',
                    author: 'ProctorDorkchop02 & MattSpriteMaster'
                },
                sans: {
                    name: '衫斯',
                    author: 'ProctorDorkchop02 & Fired'
                },
                undyne: {
                    name: '安黛因',
                    author: 'major_memestar'
                },
                alphys: {
                    name: '艾菲斯',
                    author: 'major_memestar'
                },
                mewmew: {
                    name: '喵喵',
                    author: 'spacey_432'
                },
                napstablook: {
                    name: '納普斯特',
                    author: 'spacey_432'
                },
                mettaton: {
                    name: '鎂塔頓',
                    author: 'MattSpriteMaster'
                },
                toriel: {
                    name: '托麗爾',
                    author: 'MattSpriteMaster'
                },
                asgore: {
                    name: '艾斯戈爾',
                    author: 'MattSpriteMaster'
                },
                monsterkid: {
                    name: '怪物小孩',
                    author: 'spacey_432'
                },
                asriel: {
                    name: '艾斯利爾',
                    author: 'Medi0creking & MattSpriteMaster'
                }
            }
        },

        langPrompt: '[↑或↓] 選擇語言 / [Z 或 ENTER] 確認',
        epilepsyInfo:
            '警告：\n\n遊戲內包含§fill=#ff0§閃爍畫面§fill=#fff§。\n如果您對此十分敏感或無法耐受，\n可以通過§fill=#ff0§遊戲設定§fill=#fff§將其關閉。\n',
        epilepsyKeys: '§fill=#808080§按[Z或ENTER]繼續\n（註：可手動開啟「視覺特效」\n 以獲得更好的體驗。）',

        quitText1: '正在退出',
        quitText2: '正在退出.',
        quitText3: '正在退出..',

        real1: [
            [
                '感謝您遊玩《域外傳說》。',
                '在製作這款遊戲的時光裡，',
                '我很快樂，也很自豪。'
            ],
            ['當我剛開始製作它時，', "我都沒想到能堅持這麼久。", '但最終，如您所見，我完成了它。'],
            [
                '《傳說之下》深深影響了我，',
                '在我達成結局後，過了許久，',
                '那些人物，那些故事，還是難以忘懷。'
            ],
            [
                '所以，我想把《域外傳說》作為一份禮物',
                '獻給您。讓您有機會再次回到那個世界，',
                '重溫最初的感動。'
            ],
            [
                "希望這部作品能給您帶來感動。",
                "希望在那個世界暢遊時，",
                "您能感到快樂，感到幸福。"
            ],
            [
                "不管現實生活中發生了什麼，",
                '在這裡，您為他們所做的一切，',
                '都說明，您是最棒的。'
            ],
            [
                "您憑藉自己的努力，達成了結局。",
                '這段經歷，這段記憶，',
                '是不可替代，無法磨滅的。'
            ],
            ['也許您犯過錯... 但您仍是最棒的。', '相信世界一定會對您溫柔以待。', '記住這些話，好嗎？']
        ],
        real2: '以後的生活裡，多保重，「$(x)」。',

        end1: '劇終',
        end2: '劇終...？',

        restartText1: '正在重啟',
        restartText2: '正在重啟.',
        restartText3: '正在重啟..',

        title: 'OUTERTALE / 域外傳說',
        title_timeline: 'OUTERTALE...? / 域外傳說..？'
    },

    gamepad: {
        prompt: '控制器設定',
        prompt_desc:
            '從遊戲控制器上選擇一個按鍵\n用來控制遊戲中的某個操作。\n\n按下相同的按鍵進行確認，\n或按下其他按鍵重新設定。\n\n按 [ESC] 跳過設定。',
        prompt_counter: '輸入分配到：$(x)',
        z: '[Z 或 ENTER] - 確認/互動',
        x: '[X 或 SHIFT] - 返回',
        c: '[C 或 CTRL] - 選單（遊戲內）',
        u: '[↑ 或 W] - 上移',
        l: '[← 或 A] - 左移',
        d: '[↓ 或 S] - 下移',
        r: '[→ 或 D] - 右移',
        f: '[F4] - 全螢幕',
        prompt_done: '設定完成。\n按任意鍵繼續。',
        prompt_done_browser: '\n注意：在本平臺執行遊戲時，\n可能無法用控制器開啟全螢幕。',
        prompt_load:
            '遊戲控制器設定完成，\n按任意鍵繼續。\n或者連按某個鍵三次\n重新設定控制器。'
    },

    general: {
        asriel: '艾斯利爾',
        asriel_location: '幻境',
        disabled: '關閉',
        enabled: '開啟',
        finish: '按 [X] 返回',
        frisk: '弗裡斯克',
        g: '金錢',
        hp: '血量',
        inf: '\u221e',
        landing1: '[按 Z 或 ENTER]',
        lv: 'LV',
        mystery1: '§mystify=天地玄黃宇宙洪荒日月盈昃辰宿列張寒來暑往秋收冬藏閏餘成歲律呂調陽雲騰致雨露結為霜金生麗水玉出崑岡劍號巨闕珠稱夜光果珍李柰菜重芥姜海鹹河淡鱗潛羽翔龍師火帝鳥官人皇始制文字乃服衣裳推位讓國有虞陶唐§新名字§mystify=§',
        mystery2: '{@mystify=天地玄黃宇宙洪荒日月盈昃辰宿列張寒來暑往秋收冬藏閏餘成歲律呂調陽雲騰致雨露結為霜金生麗水玉出崑岡劍號巨闕珠稱夜光果珍李柰菜重芥姜海鹹河淡鱗潛羽翔龍師火帝鳥官人皇始制文字乃服衣裳推位讓國有虞陶唐}新名字{@mystify=}',
        mystery2l: '{@mystify=天地玄黃宇宙洪荒日月盈昃辰宿列張寒來暑往秋收冬藏閏餘成歲律呂調陽雲騰致雨露結為霜金生麗水玉出崑岡劍號巨闕珠稱夜光果珍李柰菜重芥姜海鹹河淡鱗潛羽翔龍師火帝鳥官人皇始制文字乃服衣裳推位讓國有虞陶唐}新名字{@mystify=}',
        mystery2u: '{@mystify=天地玄黃宇宙洪荒日月盈昃辰宿列張寒來暑往秋收冬藏閏餘成歲律呂調陽雲騰致雨露結為霜金生麗水玉出崑岡劍號巨闕珠稱夜光果珍李柰菜重芥姜海鹹河淡鱗潛羽翔龍師火帝鳥官人皇始制文字乃服衣裳推位讓國有虞陶唐}新名字{@mystify=}',
        no: '否',
        nominal: '§fill=#0f0§正常',
        percent: '$(x)%',
        player: '玩家',
        settings: '遊戲設定',
        shopg: 'G',
        unknown: '?',
        xm: '靈勢',
        yes: '是'
    },

    menu: {
        box1: '物品欄',
        box2: '箱子',
        key1: '鑰匙串',

        confirm1: '確定要選擇這個名字嗎？',
        confirm2: '已經選定了一個名字。',
        confirm3: '返回',

        footer: 'OUTERTALE V5.05 (c) 2025 SPACEY_432',

        heal1: '* （HP已回滿。）',
        heal2: '* （你回復了$(x) HP。）',
        heal3: '* （你失去了$(x) HP。）',
        heal4: '* （HP已清零。）',
        heal5: '* （你額外獲得$(x) HP。）',

        item1: '使用',
        item2: '裝備',
        item3: '資訊',
        item4: '丟棄',

        load1: '繼續',
        load2: '旁觀',
        load3: '重置',
        load4: '真正的重置',

        name1: '為受困的人類命名：',
        name2: '返回',
        name3: '刪除',
        name4: '確定',
        name5: '§fill=#808080§鍵盤輸入，支援中文。\n\n[ENTER] - 確定\n[BACKSPACE] - 刪除\n[ESC] - 返回',

        save1: '儲存',
        save2: '返回',
        save3: '進度已儲存！',

        settings1: '遊戲設定',
        settings2: '返回',
        settingsprompt1: '-> 切換語言、調節音量',
        settings3: '語言',
        settings3a: '繁體中文(人名翻譯)',
        settings4: '音效',
        settings5: '音樂',
        settings6: '視覺特效',
        settingsprompt2: '-> 視覺效果、遊戲操控',
        settings6a: '按住[X]跑步',
        settings6b: '彩色立繪(未完成)',
        settings7: '閃爍畫面',
        settings7a: '預設',
        settings7b: '削減',
        settings8: '手機版設定',
        settings9: '搖杆死區',
        settings10: '打開Mod目錄',
        settings11: '重啟',
        border: {
            option: '遊戲邊框',
            list: [
                '無',
                '動態變化',
                '簡約',
                '星空',
                '外域',
                '托麗爾的家',
                '星港',
                '鑄廠',
                '空境',
                '休閒迴廊',
                '核心',
                '首塔',
                '艾斯戈爾的家',
                '六號檔案',
                '外域（檔案內）',
                '星港（檔案內）',
                '鑄廠（檔案內）',
                '空境（檔案內）',
                "核心（戰鬥內）",
                '艾斯利爾戰',
                '璀璨星空',
                '新家園',
                '§fill=#808080§(待解鎖)'
            ]
        },
        mobile: {
            title: '觸屏設定',
            controlOpacity: '按鍵不透明度',
            controlType: '方向鍵類別',
            enableDiagonal: '方向鍵布局',
            enableSingleArrow: '方向鍵解綁',

            fourKey: '\u4dc8 四鍵',
            eightKey: '\u4dc9 八鍵',
            deadZone: '搖杆死區',
            toleranceAngle: '容錯角',

            loadDefault: '復位所有按鍵',
            enableMultiConfig: '快速切換按鍵布局',
            invertButtonPos: '左右翻轉按鍵位置',

            prompt1: '--- 選擇配置 ---',
            prompt2: '--- 基礎設定 ---',
            prompt3: '--- 控制器/按鍵設定 ---',
            prompt4: '--- 調整按鍵布局 ---',

            nextpage: '下一頁 >',
            prepage: '< 上一頁',

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

            ShowFullScrKey: '顯示全螢幕按鈕',

            xPos: '中心點X坐標',
            yPos: '中心點Y坐標',
            size: '按鍵大小',
            radius: '區域半徑',

            keysettings: '按鍵設定',
            keyprompt0: '§fill=#ffd700§>> §fill=#fff§正在編輯：§fill=#00ffff§$(x)鍵§fill=#808080§（按[R]復位）\n§fill=#ff0§（[L]在左上角，[R]在右上角）',
            keyprompt1: '§fill=#fff§進度：共§fill=#00ffff§3§fill=#fff§步，現在是第§fill=#00ffff§$(x)§fill=#fff§步',
            keyprompt1a: ' [1] 粗略設定位置',
            keyprompt1b: ' [2] 微調按鍵坐標',
            keyprompt1c: ' [3] 設定按鍵大小',
            keyprompt1d:
                '§fill=#00ff00§*** 現在開始設定按鍵布局\n§fill=#fff§請點擊§fill=#ff0§屏幕左上角§fill=#fff§的[L]鍵\n開始設定',
            keyprompt1e: '§fill=#00ff00§*** 布局設定完成。\n§fill=#fff§現在，你可以返回繼續設定其他按鍵，\n- 如果想§fill=#ff0§儲存更改§fill=#fff§，請按§fill=#ff0§[L]鍵§fill=#fff§返回。\n- 如果想§fill=#ff0§放棄更改§fill=#fff§，請按§fill=#ff0§[R]鍵§fill=#fff§返回。',
            keyprompt2: '§fill=#4169e1§--- 操作指引 ---',
            keyprompt2a:
                '§fill=#fff§*拖動§fill=#00ffff§$(x)§fill=#fff§來設定按鈕初始位置\n§fill=#ffd700§*按[L]§fill=#808080§確認位置\n§fill=#ffd700§*如果不小心拖到了屏幕外，按[R]§fill=#808080§恢復\n§fill=#808080§可以在下一步精確調整位置',
            keyprompt2b:
                '§fill=#fff§* 使用 §fill=#ffd700§[上/下/左/右]§fill=#fff§ 來進行微調\n§fill=#ffd700§* 按 [R] §fill=#808080§來恢復之前鍵位\n§fill=#808080§參考坐標系如下\n§fill=#ffd700§* 按 [L] §fill=#808080§確認',
            keyprompt2c:
                '§fill=#fff§* 用 §fill=#ffd700§[-5] [-1] [+1] [+5]§fill=#fff§ 來調節按鍵大小設定\n§fill=#ffd700§* 按 [R] §fill=#808080§來恢復預設大小\n§fill=#808080§現有按鍵大小如下\n§fill=#ffd700§* 按 [L] §fill=#808080§確定',
            keyprompt3a: '§fill=#4169e1§-> §fill=#fff§按鍵位置：\n§fill=#00ffff§X=$(x)，Y=$(y)',
            keyprompt3b: '§fill=#4169e1§-> §fill=#fff§大小: §fill=#00ffff§$(x)',

            helper_loadDefault:
                '【復位所有按鍵】如果遊戲按鍵顯示出現問題，\n或者想重新設定遊戲按鍵，\n可以§fill=#ff0§按[Z]鍵§fill=#808080§一鍵復位所有的§fill=#ff0§按鍵大小、位置§fill=#808080§。',
            helper_enableMultiConfig:
                '【快速切換按鍵布局】\n§fill=#ff0§按[Z]鍵§fill=#808080§來開啟/關閉快速切換按鍵布局功能。\n開啟後，屏幕的左側將會顯示§fill=#fff§[0] - [4]§fill=#808080§五個按鈕，對應不同的按鍵布局，\n可以點擊對應按鈕快速切換布局，也可自訂布局。',
            helper_controlType:
                '【控制方式】§fill=#ff0§按[Z]鍵§fill=#808080§切換以下兩種控制方式：\n§fill=#ff0§1. 方向按鍵§fill=#808080§：傳統方向鍵控制\n§fill=#ff0§2. 虛擬搖杆§fill=#808080§：直接通過滑動來改變方向',
            helper_controlOpacity:
                '【按鍵透明度】\n§fill=#ff0§使用左右方向鍵§fill=#808080§調整：\n數值越大，按鍵越清晰。數值越小，按鍵越透明。',
            helper_enableDiagnal:
                '【方向鍵布局】\n§fill=#ff0§按[Z]鍵§fill=#808080§切換方向鍵布局，以此開啟或關閉斜向移動。\n選擇§fill=#fff§八按鍵§fill=#808080§布局時，可以用額外的四個方向鍵來斜向移動。',
            helper_deadZone:
                "§fill=#ff0§使用左右方向鍵§fill=#808080§調整搖杆的響應靈敏度。死區表示§fill=#ff0§搖杆需要移動多大距離才開始響應§fill=#808080§：\n- §fill=#fff§死區越小§fill=#808080§：搖杆更容易響應，操作更靈敏，§fill=#fff§死區越大§fill=#808080§：需要更大幅度移動才會響應。\n提示：如果搖杆太敏感，可以適當增大死區值。",
            helper_toleranceAngle:
                '§fill=#ff0§使用左右方向鍵§fill=#808080§調整搖杆的方向判定範圍。容錯角度決定了§fill=#ff0§向某個方向移動時的精確程度§fill=#808080§。\n- §fill=#fff§角度越小§fill=#808080§： 移動方向判定越嚴格，§fill=#fff§角度越大§fill=#808080§：移動方向判定越寬鬆。\n提示：超過45度時會自動觸發斜向移動。',
            helper_showFullScrKey:
                '【提示】在屏幕左上角，有兩個額外按鈕：§fill=#ff0§全螢幕和Debug選單§fill=#808080§。\n對於安卓版（非網頁版），全螢幕按鈕是多餘的。\n可以§fill=#ff0§按[Z]鍵§fill=#808080§來隱藏它。',
            helper_modifyButtons:
                '【自訂布局】\n找到想修改布局的按鍵，§fill=#ff0§按[Z]鍵§fill=#808080§開始自訂布局。\n你可以調整所有按鍵的§fill=#ff0§位置和大小§fill=#808080§，系統會引導你完成設定。',
            helper_singleArrow:
                '【獨立方向鍵設定】§fill=#ff0§按[Z]鍵§fill=#808080§開啟或關閉獨立方向鍵設定。\n預設情況下，四個方向鍵會作為一個整體來調整位置和大小。開啟後，你可以§fill=#fff§分別設定每個方向鍵的位置和大小§fill=#808080§。\n根據自己的使用習慣靈活調整布局。',
            helper_invertButtonPos:
                '【左右翻轉按鍵位置】\n§fill=#ff0§按[Z]鍵§fill=#808080§一鍵翻轉所有虛擬按鈕（方向鍵，控制鍵，搖杆）的位置。\n如果您習慣用右手操控方向，左手按ZXC，\n這個功能會非常實用。'
        },

        sidebar1: '物品',
        sidebar2: '狀態',
        sidebar3: '手機',
        sidebar4: '設定',
        sidebar5: '體徵',

        start1: [
            '---- 操作介紹 ----',
            '[Z 或 ENTER] - 確認/互動',
            '[X 或 SHIFT] - 返回',
            '[C 或 CTRL] - 選單（遊戲內）',
            '[F4] - 全螢幕',
            '[長按 ESC] - 重啟',
            '當 HP 降至 0，你就輸了。'
        ],
        start2: '開始遊戲',

        stat1: '攻擊',
        stat2: '防禦',
        stat3: '武器',
        stat4: '防具',
        stat5: '金錢',
        stat6: 'EXP',
        stat7: '升級需',
        stat8: '§fill=#ff0§警告：\n不是\n主時間軸。',
        stat9: '擊殺',
        stat10: '擊敗',
        stat11: '調情',
        stat12: '生命體徵',
        stat13: '「$(x)」',

        story1: ['<24>{#p/storyteller}很久以前，\n太陽系由兩個物種統治著：\n人類和怪物。{^35}{}'],
        story2: ['<24>隨著時間的推移，\n兩個物種之間爆發了戰爭。{^35}{}'],
        story3: ["<24>最終，\n怪物的母星被摧毀，\n人類宣布了勝利。{^35}{}"],
        story4: ['<24>他們將剩下的怪物\n流放到一個廢棄的前哨站。{^35}{}'],
        story5: ['<24>隨後，建起一道強大的力場，\n將怪物們封印在內。{^35}{}'],
        story6: ['<24>許多年後.{^16}.{^16}.{^35}{}'],
        story7: ['<#24>      伊波特星域      \n        251X{^35}{}'],
        story8: ['<24>傳說，宇宙中有一個地方，\n發射到那裡的飛船\n都再也沒有返航。{^35}{}'],
        story9: ['<24>{^100}{}'],
        story10: ['<24>{^100}{}'],
        story11: ['<24>{^35}{}']
    },

    timeline: {
        main: '重返主時間軸',
        main_ex: '開啟主時間軸',
        timelines: '其它時間軸的位置',
        bisect: '切分',
        delete: '刪除',
        instruction: '[ESC]取消 / [ENTER]確定',
        instruction_gamepad: '按控制器上任意按鈕打開鍵盤。',
        launch: '進入',
        rename: '重命名',
        create: '新建',
        placeholder: '輸入時間軸名稱',
        confirm: '確定刪除嗎？'
    }
};


// END-TRANSLATE
