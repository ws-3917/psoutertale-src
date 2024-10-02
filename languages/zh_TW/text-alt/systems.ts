// START-TRANSLATE

export default {
   battle: {
      death0: [ '（你深吸了一口氣。）', "（你充滿了決心。）" ],
      death1: [ '現在還不能放棄...', '$(name)！\n保持你的決心...' ],
      death2: [ '我們的命運都\n寄託於你...', '$(name)！\n保持你的決心...' ],
      death3: [ "你會沒事的！", '$(name)！\n保持你的決心...' ],
      death4: [ "別失去希望！", '$(name)！\n保持你的決心...' ],
      death5: [ '現在還不能結束！', '$(name)！\n保持你的決心...' ],

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
         blurb: '程式出現錯誤！\n請將錯誤資訊截圖傳送給開發者。'
      },
      control: {
         tab: '快捷功能',
         headers: [ '主世界', '戰鬥中' ],
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
               '無限HP',
               '安撫所有敵人',
               '自殺',
               '清空敵人血條'
            ]
         ],
         p_speed: {
            fps: '$(x)幀',
            halt: '暫停',
            header: '遊戲倍速',
            multiplier: '$(x)倍速',
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
         headers: [ '圖層', '類別' ],
         switches: [
            [ '基層', '下層', '主層', '上層', '選單層' ],
            [ '碰撞箱', '貼圖', '文本' ]
         ],
         p_explorer: {
            header: '瀏覽',
            layers: [ '基層', '下層', '主層', '上層', '選單層' ],
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
            hp: 'HP',
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
      dialog_open: { buttonLabel: '打開', name: '存檔檔案', title: '匯入存檔' },
      dialog_save: { buttonLabel: '儲存', name: '存檔檔案', title: '匯出存檔' },
      error_load: '無法解析存檔。',
      message_alert: [ '確定' ],
      message_confirm: [ '取消', '確定' ],
      prompt_clear: '刪除這個存檔嗎？',
      prompt_demo: '已將您的OUTERTALE demo存檔\n移動到其他時間軸槽位中。',
      prompt_save: '將存檔儲存到其他位置嗎？',
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
            'Balgamlı Kedi',
            'Bilge \"mnwary\"'
         ],
         [
            '§fill=#ff0§< 遊戲測試 >§fill=#fff§',
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
            '§fill=#ff0§< 遊戲測試 >§fill=#fff§',
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
            '§fill=#ff0§< 遊戲測試 >§fill=#fff§',
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
            '§fill=#ff0§< 特別鳴謝 >§fill=#fff§',
            'Alden',
            '§fill=#808080§感謝你給我依靠，\n教會我人生的道理，\n讓我變得更好。§fill=#fff§'
         ],
         [
            '§fill=#ff0§< 特別鳴謝 >§fill=#fff§',
            'My Aster',
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
            "",
            "§fill=#ff7§【組長 & 程式】§fill=#fff§",
            "ws3917",
            "§fill=#ff7§【文翻】§fill=#fff§",
            "ws3917",
            "Murder--Sans_MDR",
            "R.o.C.t.D./π/3.1415⑨",
            "1個渣渣",
            "§fill=#ff7§【文校】§fill=#fff§",
            "ws3917",
            "R.o.C.t.D./π/3.1415⑨",
        ],
        [
            "§fill=#ff0§< 漢化組成員 >§fill=#fff§",
            "",
            "§fill=#ff7§【美術】§fill=#fff§",
            "屑moons月亮君",
            "御魂_",
            "mustad（邊框Mod）",
            "§fill=#ff7§【精神支援&推廣】§fill=#fff§",
            "幻-_-風",
            "AX暗星233",
            "屑moons月亮君"
        ],
        [
            "§fill=#ff0§< 漢化組成員 >§fill=#fff§",
            "",
            "§fill=#ff7§【漢化測試】§fill=#fff§",
            "ws3917",
            "Murder--Sans_MDR",
            "雪理奈",
            "（以及其他漢化組成員）",
            "感謝漢化組成員的努力付出！",
            "同時，也感謝您對這款遊戲的喜愛！",
            "",
            "§fill=#808080§P.S. 漢化組正在為遊戲製作各種Mod！\n歡迎B站關注@ws3917\n了解最新Mod開發進度！§fill=#fff§"
        ],
[ '特別鳴謝 由§fill=#ff0§Mavis與朋友們§fill=#fff§提供' ]
      ],

      final_frontier: {
         header: '(( 演員表 ))',
         opponents: {
            froggit: {
               name: '蛙吉特',
               author: 'ScarletScaledDragon',
               text: {
                  basic: 'Pondering\nLife',
                  spare: 'Professional\nFrog',
                  flirt: 'Pondering\nLove',
                  bully: 'Hopping In\nFear'
               }
            },
            whimsun: {
               name: '飄遊蟲蟲',
               author: 'ScarletScaledDragon',
               text: {
                  basic: 'Learning To\nFly',
                  spare: 'Emboldening\nAviator',
                  flirt: 'Searching The\nSkies',
                  bully: 'Evasively\nManeuvering'
               }
            },
            moldsmal: {
               name: '小黏團',
               author: 'spacey_432',
               text: {
                  basic: 'Found A New\nSpace Station',
                  spare: 'Backup\nDancer',
                  flirt: 'Exotic Jelly\nDancer',
                  bully: 'Found A New\nGalaxy'
               }
            },
            loox: {
               name: '乾瞪眼',
               author: 'ScarletScaledDragon',
               text: {
                  basic: 'Slightly\nBully-Like',
                  spare: 'Reformed\nBully',
                  flirt: 'Slightly\nFlirtatious',
                  bully: ''
               }
            },
            migosp: {
               name: '忍術蟑螂',
               author: 'ScarletScaledDragon',
               text: {
                  basic: 'Exceedingly\nAgreeable',
                  spare: 'Casually\nEnjoys Life',
                  flirt: 'In Love From\nAfar',
                  bully: 'Endangerment\nDenier'
               }
            },
            mushy: {
               name: '蘑西',
               author: 'Balgamlı Kedi & ScarletScaledDragon',
               text: {
                  basic: 'Shooting\nBlanks',
                  spare: 'Quick-Draw\nMagician',
                  flirt: 'Gunshot\nHeart-Throb',
                  bully: 'Spraying And\nPraying'
               }
            },
            finalghost: {
               name: '匿羅',
               author: 'spacey_432',
               text: {
                  basic: 'Keeping To\nThemselves',
                  spare: 'Seeking\nPhysical Contact',
                  flirt: 'Stoically\nUninvolved',
                  bully: ''
               }
            },
            stardrake: {
               name: '星鐵龍',
               author: 'Burge',
               text: {
                  basic: 'Still Looking\nFor Laughs',
                  spare: 'Semi-Successful\nComedian',
                  flirt: 'Popular With The\nGrown-Ups',
                  bully: ''
               }
            },
            chilldrake: {
               name: '小酷龍',
               author: 'Burge',
               text: {
                  basic: 'Still Looking\nFor Supporters',
                  spare: 'Gained A Cult\nFollowing',
                  flirt: 'Trades Kisses\nFor Supporters',
                  bully: 'Anti-Bullying\nActivist'
               }
            },
            spacetop: {
               name: '太空帽',
               author: 'DESM.al',
               text: {
                  basic: 'Thinking About\nIts Antenna',
                  spare: 'Radio Station\nSensation',
                  flirt: 'Love Is On\nThe Air',
                  bully: 'Emergency\nBroadcaster'
               }
            },
            jerry: {
               name: '傑瑞',
               author: 'Discarded Vessel',
               text: {
                  basic: 'Getting Ditched\nOn The Daily',
                  spare: 'Getting Ditched\nSlightly Less',
                  flirt: 'On The Road To\nRedemption',
                  bully: ''
               }
            },
            mouse: {
               name: '紳鼠貓',
               author: 'Zaxento The Greedy & semi',
               text: {
                  basic: 'Having An\nIdentity Crisis',
                  spare: 'Newest Member Of\nMouse Society',
                  flirt: 'Getting Frisky\nWith The Mice',
                  bully: 'Scurried Back To\nCat Society'
               }
            },
            doggo: {
               name: '遁狗',
               author: 'Discarded Vessel',
               text: {
                  basic: 'Believes In The\nAlmighty Wrench',
                  spare: 'Found His Own\nSeeing-Eye Wolf',
                  flirt: 'In Love With His\nSeeing-Eye Wolf',
                  bully: 'Running To His\nSeeing-Eye Wolf'
               }
            },
            lesserdog: {
               name: '小犬座',
               author: 'major_memestar',
               text: {
                  basic: 'Searching For\nAffection',
                  spare: 'Found A Loving\nOwner',
                  flirt: 'Found An Owning\nLover',
                  bully: 'Desperate For\nAffection'
               }
            },
            dogs: {
               name: '狗來米 & 狗媳兒',
               author: 'major_memestar',
               text: {
                  basic: 'Still Thinking\nAbout Fetch',
                  spare: 'Reigning Puppy-Dog\nEyes Champions',
                  flirt: "Caught In Each-\nOther's Gaze",
                  bully: 'Defensive Puppy-\nDog Eyes Engaged'
               }
            },
            greatdog: {
               name: '大犬座',
               author: 'major_memestar',
               text: {
                  basic: "Unaware Of\nLife's Changes",
                  spare: "Excited By\nLife's Changes",
                  flirt: "Touched By\nLife's Changes",
                  bully: ''
               }
            },
            woshua: {
               name: '刷潔頓',
               author: 'Discarded Vessel',
               text: {
                  basic: 'Only 99.1\nPercent Clean',
                  spare: 'Power-Washing\nPowerhouse',
                  flirt: 'Hot Tub\nManufacturer',
                  bully: 'Overpowered\nPressure Washer'
               }
            },
            moldbygg: {
               name: '大黏簇',
               author: 'spacey_432',
               text: {
                  basic: 'Looking For A\nBaby Sitter',
                  spare: 'Slime-Powered\nBarstool',
                  flirt: 'Sexy Sitcom\nRegular',
                  bully: 'Glorified\nWrestling Prop'
               }
            },
            radtile: {
               name: '老頑鱷',
               author: 'Balgamlı Kedi & Zaxento The Greedy',
               text: {
                  basic: 'Wallowing In\nImperfection',
                  spare: 'Improving His\nSelf-Image',
                  flirt: 'Dating His Own\nReflection',
                  bully: 'Headed For An\nUgly Future'
               }
            },
            shyren: {
               name: '害羞塞壬',
               author: 'Ghostly',
               text: {
                  basic: 'Back To Taking\nPiano Lessons',
                  spare: "Mettaton's\nNew Lead Singer",
                  flirt: 'In Love With\nA Ghost',
                  bully: "Can't Sing Without\nA Synthesizer"
               }
            },
            doge: {
               name: '督吉',
               author: 'major_memestar',
               text: {
                  basic: 'Construction Site\nDrill Sergeant',
                  spare: 'Bought A Lifetime\nSpa Subscription',
                  flirt: 'Felt Puppy Love\nFor The First Time',
                  bully: ''
               }
            },
            muffet: {
               name: '瑪菲特',
               author: 'major_memestar',
               text: {
                  basic: 'Looking For Her\nNext Payout',
                  spare: 'Caring For The\nSpider Clans',
                  flirt: 'Picnic Date\nMatchmaker',
                  bully: ''
               }
            },
            pyrope: {
               name: '烈焰熱線',
               author: 'semi',
               text: {
                  basic: 'Waiting For The\nBeat To Drop',
                  spare: 'Lightning-Fast\nRapper',
                  flirt: 'Rapper Turned\nLove Song Writer',
                  bully: 'Rap Battling To\nThe Near-Death'
               }
            },
            tsundere: {
               name: '傲嬌飛船',
               author: 'spacey_432',
               text: {
                  basic: 'Flying Deeper\nInto Denial',
                  spare: 'Sneaking Up On\nYou At Warp Speed',
                  flirt: 'Tsun To Be\nYour Dere-Dere',
                  bully: 'Finally Met\nIts Match'
               }
            },
            perigee: {
               name: '呦呦雞',
               author: 'Discarded Vessel',
               text: {
                  basic: 'Another Day,\nAnother Conflict',
                  spare: 'Interplanetary\nAmbassador',
                  flirt: 'Encouraging Love\nIn Others',
                  bully: 'Showing Kindness\nThrough The Pain'
               }
            },
            rg: {
               name: '三號守衛 & 四號守衛',
               author: 'semi',
               text: {
                  basic: 'In Search Of\nChildhood Friends',
                  spare: 'Use Your\nImagination',
                  flirt: 'Please Use Your\nImagination',
                  bully: 'Royal Guard\nRetirees'
               }
            },
            glyde: {
               name: '老滑頭',
               author: 'Burge',
               text: {
                  basic: 'Not Your Ideal\nBusiness Partner',
                  spare: 'A Little Less\nShady Than Usual',
                  flirt: 'Not Your Ideal\nBedfellow',
                  bully: ''
               }
            },
            burgie: {
               name: '漢堡褲',
               author: 'Pongy25',
               text: {
                  basic: 'Running Hastily\nAt The Life Ahead',
                  spare: 'Looking Forward\nTo The Life Ahead',
                  flirt: 'Finding Love\nIn The Life Ahead',
                  bully: ''
               }
            },
            madjick: {
               name: '謎宇人',
               author: 'semi',
               text: {
                  basic: '尋找著\n詞典',
                  spare: '著名\n魔法師',
                  flirt: '發現了\n新鮮的魔法',
                  bully: ''
               }
            },
            knightknight: {
               name: '特雷莉亞',
               author: 'major_memestar',
               text: {
                  basic: '追尋著\n過去',
                  spare: '著名\n歷史學家',
                  flirt: '痴迷於\n故園',
                  bully: ''
               }
            },
            froggitex: {
               name: '終極蛙吉特',
               author: 'PoTheWinterCorder',
               text: {
                  basic: '將智慧\n藏在心裡',
                  spare: '將智慧\n大方分享',
                  flirt: '將智慧\n用於相愛',
                  bully: '將智慧\n用於生存'
               }
            },
            whimsalot: {
               name: '飄遊䗁士',
               author: 'spacey_432',
               text: {
                  basic: 'Still Working\nEvery Day',
                  spare: 'Finally Took\nA Break',
                  flirt: 'Looking For Some\nPrivate Time',
                  bully: 'Working Harder\nOut Of Fear'
               }
            },
            astigmatism: {
               name: '眼行者',
               author: 'semi',
               text: {
                  basic: '仍然是個\n大惡霸',
                  spare: '盛氣凌人的\n眼科醫生',
                  flirt: '盛氣凌人的\n皮革裁縫',
                  bully: '被一隻\n乾瞪眼\n推翻'
               }
            },
            migospel: {
               name: '默之蟑',
               author: 'Balgamlı Kedi',
               text: {
                  basic: 'Still A\nShameless Coward',
                  spare: 'A Little Less Of\nA Coward',
                  flirt: 'In Love With\nIts Fear',
                  bully: 'Running Faster\nThan Ever Before'
               }
            },
            mushketeer: {
               name: '蘑炮手',
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
      epilepsyKeys: '§fill=#808080§按[Z或ENTER]繼續',

      quitText1: '正在退出',
      quitText2: '正在退出.',
      quitText3: '正在退出..',

      real1: [
         [
            'Thank you for playing Outertale.',
            'Working on this project has been an honor,',
            'and a pleasure on my part.'
         ],
         [ 'When I started this journey, I never', "thought I'd get this far, but here we", 'are anyway, at the end.' ],
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
         [ 'Despite your mistakes... you are awesome,', 'and you deserve love and attention.', 'Remember that, okay?' ]
      ],
      real2: 'Take care of yourself, \"$(x).\"',

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
      g: 'G',
      hp: 'HP',
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

      footer: 'OUTERTALE V5.04 (c) 2024 SPACEY_432 繁體中文版 PSOT漢化組',

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
      settings3: '語言',
      settings3a: '繁體中文(人名翻譯)',
      settings4: '音效',
      settings5: '音樂',
      settings6: '視覺特效',
      settings7: '閃爍畫面',
      settings7a: '預設',
      settings7b: '削減',
      settings8: '方向鍵位置',
      settings8a: '左側',
      settings8b: '右側',
      settings8c: '隱藏',
      settings9: '搖杆死區',
      settings10: '打開Mod目錄',
      settings11: '重啟',

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

      story1: [ '<24>{#p/storyteller}很久以前，\n太陽系由兩個物種統治著：\n人類和怪物。{^35}{}' ],
      story2: [ '<24>隨著時間的推移，\n兩個物種之間爆發了戰爭。{^35}{}' ],
      story3: [ "<24>最終，\n怪物的母星被摧毀，\n人類宣布了勝利。{^35}{}" ],
      story4: [ '<24>他們將剩下的怪物\n流放到一個廢棄的前哨站。{^35}{}' ],
      story5: [ '<24>隨後，建起一道強大的力場，\n將怪物們封印在內。{^35}{}' ],
      story6: [ '<24>許多年後.{^16}.{^16}.{^35}{}' ],
      story7: [ '<#24>       EBOTT區      \n        251X{^35}{}' ],
      story8: [ '<24>傳說，宇宙中有一個地方，\n發射到那裡的飛船\n都再也沒有返航。{^35}{}' ],
      story9: [ '<24>{^100}{}' ],
      story10: [ '<24>{^100}{}' ],
      story11: [ '<24>{^35}{}' ]
   },

   timeline: {
      main: '重返主時間軸',
      main_ex: '開啟主時間軸',
      timelines: '其他時間軸槽位',
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
