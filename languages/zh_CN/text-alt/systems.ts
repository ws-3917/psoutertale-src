// START-TRANSLATE

export default {
    battle: {
        death0: ['（你深吸了一口气。）', "（你充满了决心。）"],
        death1: ['现在还不能放弃...', '$(name)！\n保持你的决心...'],
        death2: ['我们的命运都\n寄托于你...', '$(name)！\n保持你的决心...'],
        death3: ["你会没事的！", '$(name)！\n保持你的决心...'],
        death4: ["别失去希望！", '$(name)！\n保持你的决心...'],
        death5: ['现在还不能结束！', '$(name)！\n保持你的决心...'],

        flee1: '   * 先走一步...',
        flee2: "   * 我先撤了。",
        flee3: "   * 我还有别的事要做。",
        flee4: "   * 别拖我后腿。",
        flee5: '   * 你逃跑了，\n   * 你获得了$(x) EXP和$(y)G。',

        mercy_assist: '* 外援',
        mercy_flee: '* 逃跑',
        mercy_spare: '* 饶恕',

        victory1: '<32>{#p/story}* 你胜利了！\n* 你获得了$(x) EXP和$(y)G。',
        victory2: '<32>{#p/story}* 你胜利了！\n* 你获得了$(x) EXP和$(y)G。\n* 你的LOVE增加了。'
    },

    developer: {
        console: {
            header: '错误',
            p_resume: {
                header: '忽略',
                resume: '点击此处忽略错误'
            },
            blurb: '游戏出现错误！当前版本号：V74.2\n请截图发给汉化组（QQ：797416533）。'
        },
        control: {
            tab: '快捷功能',
            headers: ['主世界', '战斗中'],
            items: [
                [
                    '音乐初始化',
                    '角色初始化',
                    '无限金钱',
                    '允许角色交互',
                    '允许游戏输入',
                    '允许角色移动',
                    '无视墙体',
                    '快速存档',
                    '跳过文本',
                    '自由视角'
                ],
                [
                    '允许外援',
                    '清除弹幕',
                    '退出战斗',
                    '重置框体大小',
                    '重置菜单',
                    '允许逃跑',
                    '无限血量',
                    '安抚所有敌人',
                    '自杀',
                    '清空敌人血条'
                ]
            ],
            p_speed: {
                fps: '$(x)帧',
                halt: '暂停',
                header: '游戏倍速',
                next: '加速',
                prev: '减速',
                sec: '每帧$(x)秒'
            }
        },
        godhome: {
            tab: '传送/战斗',
            p_teleport: {
                header: '房间',
                action: '传送'
            },
            p_encounter: {
                header: '战斗',
                action: '开始'
            },
            p_armor: {
                header: '防具'
            },
            p_weapon: {
                header: '武器'
            }
        },
        inspect: {
            tab: '察看图层',
            headers: ['图层', '类型'],
            switches: [
                ['基层', '下层', '主层', '上层', '菜单层'],
                ['碰撞箱', '贴图', '文本']
            ],
            p_explorer: {
                header: '浏览',
                layers: ['基层', '下层', '主层', '上层', '菜单层'],
                letters: {
                    animation: '动',
                    character: 'NPC',
                    rectangle: '方',
                    entity: '形',
                    hitbox: '箱',
                    object: '物',
                    player: '人',
                    sprite: '图',
                    text: '文'
                }
            },
            debug_instructions: '按[TAB]键浏览调试信息',
            debug: {
                a: '存活？', 
                acceleration: '对象加速度',
                active: '动态',
                alpha: '不透明度',
                anchor: '锚点定位方式',
                b: '暴力饶恕过？', 
                blend: '渲染方式',
                border: '边框设定',
                compute: '实际尺寸',
                content: '对象内容',
                crop: '裁剪区域坐标',
                down: '下',
                duration: '动画时长（帧）',
                exp: 'EXP',
                extent: '延伸尺寸',
                f: '调情过？', 
                face: '面部朝向',
                false: '否',
                fill: '填充颜色',
                fontFamily: '字体',
                fontSize: '字体大小',
                frames: '当前帧源文件',
                gravity: '重力',
                group: '战斗组',
                hp: '血量',
                index: '当前播放帧',
                inert: '未激活',
                key: '名称',
                lastSavedTime: '上次存档时间',
                layer: '图层编号',
                layers: '包含图层',
                left: '左',
                metadata: '元数据',
                music: '音乐',
                namespace: '命名空间',
                none1: '无',
                none2: '无',
                objects: '对象数',
                oversaver: '自动存档',
                parallax: '视差滚动',
                position: '位置坐标',
                primed: '蓄能状态',
                priority: '优先级',
                registry: '存档变量',
                renderer: '图像渲染器',
                resources: '已使用资源',
                reverse: '倒放资源',
                right: '右',
                room: '房间',
                roomState: '房间状态',
                rotation: '旋转角度',
                s: '图', 
                scale: '缩放',
                shopSelection: '当前选项（商店菜单）',
                size: '设定尺寸',
                spacing: '间距',
                spin: '快速旋转',
                sprites: '资源参数',
                step: '更新频率',
                stroke: '轮廓描边',
                subcrop: '子区域裁剪坐标',
                talk: '正在说话',
                target: '针对目标',
                text: '文本',
                time: '持续时间',
                tint: '颜色值',
                trackedAssets: '当前跟踪的资源',
                true: '是',
                unknown: '未知',
                up: '上',
                vars: '变量',
                velocity: '移动速度',
                volatile: '敌人'
            }
        },
        savemod: {
            tab: '编辑存档',
            header1: '存档编辑器',
            domains: [
                '数据（布尔型）',
                '数据（数值型）',
                '数据（字符串型）',
                '节点（布尔型）',
                '节点（数值型）',
                '节点（字符串型）'
            ],
            p_page: {
                header: '翻页',
                prev: '上一页',
                next: '下一页'
            },
            prompt: '输入变量值',
            back: '返回'
        },
        storage: {
            tab: '物品库存',
            header: '物品库存编辑器',
            p_container: { header: '选择容器', prev: '上一页', next: '下一页' },
            display: { inventory: '物品栏', dimboxA: '次元箱 A', dimboxB: '次元箱 B' }
        }
    },

    dialog: {
        dialog_clear_title: '删除存档',
        dialog_notice_title: '提示',
        dialog_clear_mobile: '重置移动端设置',
        dialog_open: { buttonLabel: '打开', name: '存档文件', title: '导入存档' },
        dialog_save: { buttonLabel: '保存', name: '存档文件', title: '导出存档' },
        error_load: '无法解析存档。',
        message_alert: ['确定'],
        message_confirm: ['取消', '确定'],
        prompt_clear: '删除这个存档吗？',
        prompt_demo: '已将您的OUTERTALE demo存档\n移动到其他时间线槽位中。',
        prompt_save: '将存档保存到其他位置吗？',
        prompt_clear_mobile: '确定重置所有移动端设置吗？\n（包含摇杆大小、按键位置等。）\n（该功能不会清空游戏存档，请放心。）',
        prompt_save_alternate: '新建一个JSON文件，\n将下列内容复制进去\n并保存到设备中。',
        prompt_open: '读取这个存档吗？'
    },

    extra: {
        credits: [
            [
                '§fill=#ff0§< 游戏开发者 >§fill=#fff§',
                'spacey_432',
                '',
                '§fill=#ff0§< 文本编写 >§fill=#fff§',
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
                '§fill=#ff0§< 文本编写 >§fill=#fff§',
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
                '§fill=#ff0§< 技术助理 >§fill=#fff§',
                'Codetoil',
                'ryi3r',
                'ws3917',
                '',
                '§fill=#ff0§< 游戏测试 >§fill=#fff§',
                'Alden',
                'Aspey',
                'Aster',
                'Balgamlı Kedi'
            ],
            [
                '§fill=#ff0§< 游戏测试 >§fill=#fff§',
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
                '§fill=#ff0§< 游戏测试 >§fill=#fff§',
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
                '§fill=#ff0§< 游戏测试 >§fill=#fff§',
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
                '§fill=#ff0§< 游戏测试 >§fill=#fff§',
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
                '§fill=#ff0§< 游戏测试 >§fill=#fff§',
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
                '§fill=#ff0§< 特别鸣谢 >§fill=#fff§',
                'Alden',
                '§fill=#808080§感谢你给我依靠，\n教会我人生的道理，\n让我变得更好。§fill=#fff§'
            ],
            [
                '§fill=#ff0§< 特别鸣谢 >§fill=#fff§',
                'Aster',
                '§fill=#808080§你是第一个支持我梦想的人，\n也是我最暖心的伙伴。\n在你的激励下，\n我才能完成这款游戏。§fill=#fff§'
            ],
            [
                '§fill=#ff0§< 特别鸣谢 >§fill=#fff§',
                'Balgamlı Kedi',
                "§fill=#808080§感谢你从游戏开发之初\n就一直陪伴我。\n无论何时，你总会在\n我最需要帮助的时候支持我。§fill=#fff§"
            ],
            [
                '§fill=#ff0§< 特别鸣谢 >§fill=#fff§',
                'Ghostly',
                '§fill=#808080§感谢你在游戏的许多方面\n给出了很棒的建议，\n鼓励我认真对待测试工作。§fill=#fff§'
            ],
            [
                '§fill=#ff0§< 特别鸣谢 >§fill=#fff§',
                'Zaxento The Greedy',
                '§fill=#808080§感谢你直言不讳，\n给予我大量批评和建议。\n从认识的那天起\n你就非常值得信赖。§fill=#fff§'
            ],
            [
                '§fill=#ff0§< 特别鸣谢 >§fill=#fff§',
                'ThatGuyWhoLikesFood',
                '§fill=#808080§感谢你帮助我撰写了\n游戏中的关键剧情，\n并始终支持我的梦想，\n让我能以全新的方式表达自我。§fill=#fff§'
            ],
            [
                '§fill=#ff0§< 特别鸣谢 >§fill=#fff§',
                'Bilge \"mnwary\"',
                "§fill=#808080§感谢你从游戏开发之初\n一直陪伴到游戏正式发布。\n有了你的帮助，游戏的剧情\n才能发挥到最佳水准。§fill=#fff§"
            
        ],
            [
            "§fill=#ff0§< 汉化组成员 >§fill=#fff§",
            "§fill=#ff7§【文翻 & 文校】§fill=#fff§",
            "1个渣渣",
            "braing",
            "errosia",
            "Hola amigo!",
            "Murder--Sans_MDR",
            "R.o.C.t.D./π/3.1415⑨",
            "Wasneet Potato",
            "ws3917",
            "§fill=#ff7§【程序】§fill=#fff§",
            "ws3917",
        ],
        [
            "§fill=#ff0§< 汉化组成员 >§fill=#fff§",
            "§fill=#ff7§【美术】§fill=#fff§",
            "KodLenss",
            "小云爱喝二锅头",
            "屑moons月亮君",
            "御魂_",
            "这是纸鸢",
            "§fill=#ff7§【精神支持&推广】§fill=#fff§",
            "AX暗星233",
            "幻-_-风",
            "屑moons月亮君",
        ],
        [
            "§fill=#ff0§< 汉化组成员 >§fill=#fff§",
            "§fill=#ff7§【汉化测试】§fill=#fff§",
            "braing",
            "鸥皇不欧",
            "升级无敌",
            "Wasneet Potato",
            "雪理奈",
            "（以及其他汉化组成员）",
            "",
            "感谢汉化组成员的努力付出！",
            "同时，也感谢您对这款游戏的喜爱！",
        ],
        [
            "§fill=#ff0§< 汉化组留言 >§fill=#fff§",
            "",
            "如果在游玩过程中遇到各种Bug，",
            "或者对游戏有好的建议，",
            "可以B站关注§fill=#ff0§@PS域外传说汉化组§fill=#808080§",
            "并留言反馈！",
            "",
            "同时，我们正在为游戏制作各种Mod！",
            "欢迎贡献好的点子！",
        ],
['特别鸣谢 由§fill=#ff0§Mavis与朋友们§fill=#fff§提供']
        ],

        final_frontier: {
            header: '(( 演员表 ))',
            opponents: {
                froggit: {
                    name: '蛙吉特',
                    author: 'ScarletScaledDragon',
                    text: {
                        basic: '还在追寻\n蛙生意义',
                        spare: '蛙界\n职业选手',
                        flirt: '仍不知\n爱为何物',
                        bully: '又惊又怕\n到处蹦跶'
                    }
                },
                whimsun: {
                    name: '飘游虫虫',
                    author: 'ScarletScaledDragon',
                    text: {
                        basic: '渴望学会\n飞翔',
                        spare: '心怀勇气\n努力飞翔',
                        flirt: '寻觅\n天空的浪漫',
                        bully: '担惊受怕\n四处躲藏'
                    }
                },
                moldsmal: {
                    name: '小黏团',
                    author: 'spacey_432',
                    text: {
                        basic: '发现\n新空间站',
                        spare: '是跳舞的\n不过是替补的',
                        flirt: '果冻界\n舞林高手',
                        bully: '跑到了\n新星系'
                    }
                },
                loox: {
                    name: '干瞪眼',
                    author: 'ScarletScaledDragon',
                    text: {
                        basic: '成了\n小霸王',
                        spare: '洗心革面\n成了好“恶霸”',
                        flirt: '学会抛媚眼\n有点小撩人',
                        bully: ''
                    }
                },
                migosp: {
                    name: '忍术蟑螂',
                    author: 'ScarletScaledDragon',
                    text: {
                        basic: '性格超级好\n合群得不得了',
                        spare: '快乐摆烂\n享受生活',
                        flirt: '默默暗恋\n就是不说',
                        bully: '遇到危险\n就当没看见'
                    }
                },
                mushy: {
                    name: '蘑西',
                    author: 'Balgamlı Kedi & ScarletScaledDragon',
                    text: {
                        basic: '专打\n空包弹',
                        spare: '神枪手\n兼魔术师',
                        flirt: '枪杆子中\n出爱情',
                        bully: '子弹齐扫\n心里祈祷'
                    }
                },
                finalghost: {
                    name: '匿罗',
                    author: 'spacey_432',
                    text: {
                        basic: '洁身自好\n独来独往',
                        spare: '总想找人\n“身体接触”',
                        flirt: '这个幽灵\n很高冷',
                        bully: ''
                    }
                },
                stardrake: {
                    name: '星铁龙',
                    author: 'Burge',
                    text: {
                        basic: '努力寻找\n“星”笑点',
                        spare: '演演喜剧\n小有名气',
                        flirt: '收获大批\n成年粉丝',
                        bully: ''
                    }
                },
                chilldrake: {
                    name: '小酷龙',
                    author: 'Burge',
                    text: {
                        basic: '孤芳自赏\n无人问',
                        spare: '一朝成名\n天下知',
                        flirt: '找到同僚\n先嘴一个',
                        bully: '路见恶霸\n勇敢出手'
                    }
                },
                spacetop: {
                    name: '太空帽',
                    author: 'DESM.al',
                    text: {
                        basic: '还成天守着\n那根天线',
                        spare: '在广播界\n担起半壁江山',
                        flirt: '电波对上了\n爱就来了',
                        bully: '“各位听众，紧急\n 插播一条消息！”'
                    }
                },
                jerry: {
                    name: '杰瑞',
                    author: 'Discarded Vessel',
                    text: {
                        basic: '日常\n被人甩',
                        spare: '日常被人甩\n但次数-1',
                        flirt: '洗心革面\n做个好杰瑞',
                        bully: ''
                    }
                },
                mouse: {
                    name: '绅鼠猫',
                    author: 'Zaxento The Greedy & semi',
                    text: {
                        basic: '我是鼠鼠？\n还是猫猫？',
                        spare: '当上了\n新鼠鼠',
                        flirt: '和鼠鼠\n打成一片',
                        bully: '吓得不轻\n重新做猫'
                    }
                },
                doggo: {
                    name: '遁狗',
                    author: 'Discarded Vessel',
                    text: {
                        basic: '万能的扳手\n就是他的神',
                        spare: '有了新狼\n但还不是新郎',
                        flirt: '有了新狼\n也有了新郎',
                        bully: '有了新狼\n遇到危险他来抗'
                    }
                },
                lesserdog: {
                    name: '小犬座',
                    author: 'major_memestar',
                    text: {
                        basic: '想要摸摸',
                        spare: '狗狗遇主\n新情浓',
                        flirt: '浓情新主\n遇狗狗',
                        bully: '跪求摸摸'
                    }
                },
                dogs: {
                    name: '狗来米 & 狗媳儿',
                    author: 'major_memestar',
                    text: {
                        basic: '日思夜想着\n那根扳手',
                        spare: '狗狗卖萌赛\n一举夺魁',
                        flirt: "四目相对\n随即陷入爱河",
                        bully: '常常紧盯对方\n总是不停提防'
                    }
                },
                greatdog: {
                    name: '大犬座',
                    author: 'major_memestar',
                    text: {
                        basic: "活着\n还是那样",
                        spare: "活着\n真的很棒",
                        flirt: "活着\n非常幸福",
                        bully: ''
                    }
                },
                woshua: {
                    name: '刷洁顿',
                    author: 'Discarded Vessel',
                    text: {
                        basic: '给自己打98.2分\n因为还有1.8干净',
                        spare: '给社会\n来了波大清洗',
                        flirt: '激情浴缸\n创始人',
                        bully: '洗呀刷呀\n洗走内心的高压'
                    }
                },
                moldbygg: {
                    name: '大黏簇',
                    author: 'spacey_432',
                    text: {
                        basic: '渴望宝宝来坐\n渴望成为宝座',
                        spare: '今“黏”开始进军\n酒吧座椅行业',
                        flirt: '成了一名\n性感喜剧座驾',
                        bully: '光荣进入\n摔跤用品仓库'
                    }
                },
                radtile: {
                    name: '老顽鳄',
                    author: 'Balgamlı Kedi & Zaxento The Greedy',
                    text: {
                        basic: '长得再失败\n还是那么帅',
                        spare: '幡然醒悟\n开始注意形象',
                        flirt: '从自恋发展到\n和自己谈恋爱',
                        bully: '越发觉得\n“人丑就是福”'
                    }
                },
                shyren: {
                    name: '害羞塞壬',
                    author: 'Ghostly',
                    text: {
                        basic: '重操旧业\n继续上钢琴课',
                        spare: "当上了镁塔乐团\n新领唱",
                        flirt: '爱上了\n某只鬼鬼',
                        bully: "失去了合成器\n再也无法唱歌了"
                    }
                },
                doge: {
                    name: '督吉',
                    author: 'major_memestar',
                    text: {
                        basic: '当上了\n施工队小队长',
                        spare: '给自己充了\n终身水疗VIP',
                        flirt: '第一次感受到\n恋爱的感觉',
                        bully: ''
                    }
                },
                muffet: {
                    name: '玛菲特',
                    author: 'major_memestar',
                    text: {
                        basic: '还等着顾客\n乖乖上门呢',
                        spare: '对自己的蜘蛛\n更加上心',
                        flirt: '野炊时帮别人\n介绍对象',
                        bully: ''
                    }
                },
                pyrope: {
                    name: '烈焰热线',
                    author: 'semi',
                    text: {
                        basic: '打起节拍\n一起摇摆',
                        spare: '超爱激情Rap\n那叫一个快乐',
                        flirt: '唱得跳得累了\n写点情歌醉了',
                        bully: '哥要使劲嗨\n嗨到哥心衰'
                    }
                },
                tsundere: {
                    name: '傲娇飞船',
                    author: 'spacey_432',
                    text: {
                        basic: '天之骄子\n飞往傲娇的彼岸',
                        spare: '火速接近你\n只为献爱意',
                        flirt: '您是我的骄傲\n我是您的傲娇',
                        bully: '可算是\n棋逢对手'
                    }
                },
                perigee: {
                    name: '呦呦鸡',
                    author: 'Discarded Vessel',
                    text: {
                        basic: '时光匆匆\n矛盾重重',
                        spare: '当上了\n星际外交大使',
                        flirt: '热心牵红线\n成就他人姻缘',
                        bully: '我心伤悲\n但绝不让人心碎'
                    }
                },
                rg: {
                    name: '三号守卫 & 四号守卫',
                    author: 'semi',
                    text: {
                        basic: '各自还在寻找\n童年伙伴',
                        spare: '自行\n脑补',
                        flirt: '没有大图\n请自行脑补',
                        bully: '当够皇家守卫\n不干了'
                    }
                },
                glyde: {
                    name: '老滑头',
                    author: 'Burge',
                    text: {
                        basic: '跟他谈生意\n可倒了血霉了',
                        spare: '似乎也开始\n良心发现了',
                        flirt: '跟他同床共枕？\n劝你小心点',
                        bully: ''
                    }
                },
                burgie: {
                    name: '汉堡裤',
                    author: 'Pongy25',
                    text: {
                        basic: '他的人生\n行色匆匆',
                        spare: '他的人生\n鸿运当头',
                        flirt: '他的人生\n为爱发愁',
                        bully: ''
                    }
                },
                madjick: {
                    name: '谜宇人',
                    author: 'semi',
                    text: {
                        basic: '仍在寻找\n魔法卷轴',
                        spare: '成为一名\n著名魔法师',
                        flirt: '成功发现\n新型魔法',
                        bully: ''
                    }
                },
                knightknight: {
                    name: '特雷莉亚',
                    author: 'major_memestar',
                    text: {
                        basic: '仍在\n追寻过去',
                        spare: '成为一名\n著名历史学家',
                        flirt: '对故园旧景\n仍难以忘怀',
                        bully: ''
                    }
                },
                froggitex: {
                    name: '终极蛙吉特',
                    author: 'PoTheWinterCorder',
                    text: {
                        basic: '将智慧\n埋藏于心',
                        spare: '将智慧\n大方分享',
                        flirt: '将智慧\n融入爱情',
                        bully: '将智慧\n用于自保'
                    }
                },
                whimsalot: {
                    name: '飘游䗁士',
                    author: 'spacey_432',
                    text: {
                        basic: '每天的工作\n还是那么多',
                        spare: '终于...\n能喘息一下了',
                        flirt: '想找个机会\n好好独处',
                        bully: '每天都加班\n就图个心安'
                    }
                },
                astigmatism: {
                    name: '眼行者长老',
                    author: 'semi',
                    text: {
                        basic: '恶霸脾气\n一点没改',
                        spare: '当上眼科医生\n仍然盛气凌人',
                        flirt: '当上皮革裁缝\n仍然盛气凌人',
                        bully: '最终，被一只\n干瞪眼推翻'
                    }
                },
                migospel: {
                    name: '默之蟑',
                    author: 'Balgamlı Kedi',
                    text: {
                        basic: '胆子不大\n脸皮不小',
                        spare: '胆子终于\n大一点了',
                        flirt: '生活在恐惧中\n也生活在幸福中',
                        bully: '逃跑速度\n越来越快'
                    }
                },
                mushketeer: {
                    name: '蘑炮手',
                    author: 'Balgamlı Kedi & Ghostly',
                    text: {
                        basic: '组建了一支\n蘑菇军团',
                        spare: '身经百战\n也更加崇尚和平',
                        flirt: '身经百战\n最后败给了爱情',
                        bully: '被吓得\n身体僵直'
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
                    name: '纳普斯特',
                    author: 'spacey_432'
                },
                mettaton: {
                    name: '镁塔顿',
                    author: 'MattSpriteMaster'
                },
                toriel: {
                    name: '托丽尔',
                    author: 'MattSpriteMaster'
                },
                asgore: {
                    name: '艾斯戈尔',
                    author: 'MattSpriteMaster'
                },
                monsterkid: {
                    name: '怪物小孩',
                    author: 'spacey_432'
                },
                asriel: {
                    name: '艾斯利尔',
                    author: 'Medi0creking & MattSpriteMaster'
                }
            }
        },

        langPrompt: '[↑或↓] 选择语言 / [Z 或 ENTER] 确认',
        epilepsyInfo:
            '警告：\n\n游戏内包含§fill=#ff0§闪烁画面§fill=#fff§。\n如果您对此十分敏感或无法耐受，\n可以通过§fill=#ff0§游戏设置§fill=#fff§将其关闭。\n',
        epilepsyKeys: '§fill=#808080§按[Z或ENTER]继续\n（注：可手动开启“视觉特效”\n 以获得更好的体验。）',

        quitText1: '正在退出',
        quitText2: '正在退出.',
        quitText3: '正在退出..',

        real1: [
            [
                '感谢您游玩《域外传说》。',
                '在制作这款游戏的时光里，',
                '我很快乐，也很自豪。'
            ],
            ['当我刚开始制作它时，', "我都没想到能坚持这么久。", '但最终，如您所见，我完成了它。'],
            [
                '《传说之下》深深影响了我，',
                '在我达成结局后，过了许久，',
                '那些人物，那些故事，还是难以忘怀。'
            ],
            [
                '所以，我想把《域外传说》作为一份礼物',
                '献给您。让您有机会再次回到那个世界，',
                '重温最初的感动。'
            ],
            [
                "希望这部作品能给您带来感动。",
                "希望在那个世界畅游时，",
                "您能感到快乐，感到幸福。"
            ],
            [
                "不管现实生活中发生了什么，",
                '在这里，您为他们所做的一切，',
                '都说明，您是最棒的。'
            ],
            [
                "您凭借自己的努力，达成了结局。",
                '这段经历，这段记忆，',
                '是不可替代，无法磨灭的。'
            ],
            ['也许您犯过错... 但您仍是最棒的。', '相信世界一定会对您温柔以待。', '记住这些话，好吗？']
        ],
        real2: '以后的生活里，多保重，“$(x)”。',

        end1: '剧终',
        end2: '剧终...？',

        restartText1: '正在重启',
        restartText2: '正在重启.',
        restartText3: '正在重启..',

        title: 'OUTERTALE / 域外传说',
        title_timeline: 'OUTERTALE...? / 域外传说..？'
    },

    gamepad: {
        prompt: '手柄设定',
        prompt_desc:
            '从游戏手柄上选择一个按键\n用来控制游戏中的某个操作。\n\n按下相同的按键进行确认，\n或按下其他按键重新设置。\n\n按 [ESC] 跳过设置。',
        prompt_counter: '输入分配到：$(x)',
        z: '[Z 或 ENTER] - 确认/交互',
        x: '[X 或 SHIFT] - 返回',
        c: '[C 或 CTRL] - 菜单（游戏内）',
        u: '[↑ 或 W] - 上移',
        l: '[← 或 A] - 左移',
        d: '[↓ 或 S] - 下移',
        r: '[→ 或 D] - 右移',
        f: '[F4] - 全屏',
        prompt_done: '设置完成。\n按任意键继续。',
        prompt_done_browser: '\n注意：在本平台运行游戏时，\n可能无法用手柄开启全屏。',
        prompt_load:
            '游戏手柄设置完成，\n按任意键继续。\n或者连按某个键三次\n重新设置手柄。'
    },

    general: {
        asriel: '艾斯利尔',
        asriel_location: '幻境',
        disabled: '关闭',
        enabled: '开启',
        finish: '按 [X] 返回',
        frisk: '弗里斯克',
        g: '金钱',
        hp: '血量',
        inf: '\u221e',
        landing1: '[按 Z 或 ENTER]',
        lv: 'LV',
        mystery1: '§mystify=天地玄黄宇宙洪荒日月盈昃辰宿列张寒来暑往秋收冬藏闰余成岁律吕调阳云腾致雨露结为霜金生丽水玉出昆冈剑号巨阙珠称夜光果珍李柰菜重芥姜海咸河淡鳞潜羽翔龙师火帝鸟官人皇始制文字乃服衣裳推位让国有虞陶唐§新名字§mystify=§',
        mystery2: '{@mystify=天地玄黄宇宙洪荒日月盈昃辰宿列张寒来暑往秋收冬藏闰余成岁律吕调阳云腾致雨露结为霜金生丽水玉出昆冈剑号巨阙珠称夜光果珍李柰菜重芥姜海咸河淡鳞潜羽翔龙师火帝鸟官人皇始制文字乃服衣裳推位让国有虞陶唐}新名字{@mystify=}',
        mystery2l: '{@mystify=天地玄黄宇宙洪荒日月盈昃辰宿列张寒来暑往秋收冬藏闰余成岁律吕调阳云腾致雨露结为霜金生丽水玉出昆冈剑号巨阙珠称夜光果珍李柰菜重芥姜海咸河淡鳞潜羽翔龙师火帝鸟官人皇始制文字乃服衣裳推位让国有虞陶唐}新名字{@mystify=}',
        mystery2u: '{@mystify=天地玄黄宇宙洪荒日月盈昃辰宿列张寒来暑往秋收冬藏闰余成岁律吕调阳云腾致雨露结为霜金生丽水玉出昆冈剑号巨阙珠称夜光果珍李柰菜重芥姜海咸河淡鳞潜羽翔龙师火帝鸟官人皇始制文字乃服衣裳推位让国有虞陶唐}新名字{@mystify=}',
        no: '否',
        nominal: '§fill=#0f0§正常',
        percent: '$(x)%',
        player: '玩家',
        settings: '游戏设置',
        shopg: 'G',
        unknown: '?',
        xm: '灵势',
        yes: '是'
    },

    menu: {
        box1: '物品栏',
        box2: '箱子',
        key1: '钥匙串',

        confirm1: '确定要选择这个名字吗？',
        confirm2: '已经选定了一个名字。',
        confirm3: '返回',

        footer: 'OUTERTALE V5.05 (c) 2025 SPACEY_432',

        heal1: '* （HP已回满。）',
        heal2: '* （你回复了$(x) HP。）',
        heal3: '* （你失去了$(x) HP。）',
        heal4: '* （HP已清零。）',
        heal5: '* （你额外获得$(x) HP。）',

        item1: '使用',
        item2: '装备',
        item3: '信息',
        item4: '丢弃',

        load1: '继续',
        load2: '旁观',
        load3: '重置',
        load4: '真正的重置',

        name1: '为受困的人类命名：',
        name2: '返回',
        name3: '删除',
        name4: '确定',
        name5: '§fill=#808080§键盘输入，支持中文。\n\n[ENTER] - 确定\n[BACKSPACE] - 删除\n[ESC] - 返回',

        save1: '保存',
        save2: '返回',
        save3: '进度已保存！',

        settings1: '游戏设置',
        settings2: '返回',
        settingsprompt1: '-> 切换语言、调节音量',
        settings3: '语言',
        settings3a: '简体中文(人名翻译)',
        settings4: '音效',
        settings5: '音乐',
        settings6: '视觉特效',
        settingsprompt2: '-> 视觉效果、游戏操控',
        settings6a: '按住[X]跑步',
        settings6b: '彩色立绘(未完成)',
        settings7: '闪烁画面',
        settings7a: '默认',
        settings7b: '削减',
        settings8: '手机版设置',
        settings9: '摇杆死区',
        settings10: '打开Mod目录',
        settings11: '重启',
        border: {
            option: '游戏边框',
            list: [
                '无',
                '动态变化',
                '简约',
                '星空',
                '外域',
                '托丽尔的家',
                '星港',
                '铸厂',
                '空境',
                '休闲回廊',
                '核心',
                '首塔',
                '艾斯戈尔的家',
                '六号档案',
                '外域（档案内）',
                '星港（档案内）',
                '铸厂（档案内）',
                '空境（档案内）',
                "核心（战斗内）",
                '艾斯利尔战',
                '璀璨星空',
                '新家园',
                '§fill=#808080§(待解锁)'
            ]
        },
        mobile: {
            title: '触屏设置',
            controlOpacity: '按键不透明度',
            controlType: '方向键类型',
            enableDiagonal: '方向键布局',
            enableSingleArrow: '方向键解绑',

            fourKey: '\u4dc8 四键',
            eightKey: '\u4dc9 八键',
            deadZone: '摇杆死区',
            toleranceAngle: '容错角',

            loadDefault: '复位所有按键',
            enableMultiConfig: '快速切换按键布局',
            invertButtonPos: '左右翻转按键位置',

            prompt1: '--- 选择配置 ---',
            prompt2: '--- 基础设置 ---',
            prompt3: '--- 手柄/按键设置 ---',
            prompt4: '--- 调整按键布局 ---',

            nextpage: '下一页 >',
            prepage: '< 上一页',

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

            ShowFullScrKey: '显示全屏按钮',

            xPos: '中心点X坐标',
            yPos: '中心点Y坐标',
            size: '按键大小',
            radius: '区域半径',

            keysettings: '按键设定',
            keyprompt0: '§fill=#ffd700§>> §fill=#fff§正在编辑：§fill=#00ffff§$(x)键§fill=#808080§（按[R]复位）\n§fill=#ff0§（[L]在左上角，[R]在右上角）',
            keyprompt1: '§fill=#fff§进度：共§fill=#00ffff§3§fill=#fff§步，现在是第§fill=#00ffff§$(x)§fill=#fff§步',
            keyprompt1a: ' [1] 粗略设定位置',
            keyprompt1b: ' [2] 微调按键坐标',
            keyprompt1c: ' [3] 设定按键大小',
            keyprompt1d:
                '§fill=#00ff00§*** 现在开始设定按键布局\n§fill=#fff§请点击§fill=#ff0§屏幕左上角§fill=#fff§的[L]键\n开始设置',
            keyprompt1e: '§fill=#00ff00§*** 布局设置完成。\n§fill=#fff§现在，你可以返回继续设置其他按键，\n- 如果想§fill=#ff0§保存更改§fill=#fff§，请按§fill=#ff0§[L]键§fill=#fff§返回。\n- 如果想§fill=#ff0§放弃更改§fill=#fff§，请按§fill=#ff0§[R]键§fill=#fff§返回。',
            keyprompt2: '§fill=#4169e1§--- 操作指引 ---',
            keyprompt2a:
                '§fill=#fff§*拖动§fill=#00ffff§$(x)§fill=#fff§来设置按钮初始位置\n§fill=#ffd700§*按[L]§fill=#808080§确认位置\n§fill=#ffd700§*如果不小心拖到了屏幕外，按[R]§fill=#808080§恢复\n§fill=#808080§可以在下一步精确调整位置',
            keyprompt2b:
                '§fill=#fff§* 使用 §fill=#ffd700§[上/下/左/右]§fill=#fff§ 来进行微调\n§fill=#ffd700§* 按 [R] §fill=#808080§来恢复之前键位\n§fill=#808080§参考坐标系如下\n§fill=#ffd700§* 按 [L] §fill=#808080§确认',
            keyprompt2c:
                '§fill=#fff§* 用 §fill=#ffd700§[-5] [-1] [+1] [+5]§fill=#fff§ 来调节按键大小设置\n§fill=#ffd700§* 按 [R] §fill=#808080§来恢复默认大小\n§fill=#808080§现有按键大小如下\n§fill=#ffd700§* 按 [L] §fill=#808080§确定',
            keyprompt3a: '§fill=#4169e1§-> §fill=#fff§按键位置：\n§fill=#00ffff§X=$(x)，Y=$(y)',
            keyprompt3b: '§fill=#4169e1§-> §fill=#fff§大小: §fill=#00ffff§$(x)',

            helper_loadDefault:
                '【复位所有按键】如果游戏按键显示出现问题，\n或者想重新设置游戏按键，\n可以§fill=#ff0§按[Z]键§fill=#808080§一键复位所有的§fill=#ff0§按键大小、位置§fill=#808080§。',
            helper_enableMultiConfig:
                '【快速切换按键布局】\n§fill=#ff0§按[Z]键§fill=#808080§来开启/关闭快速切换按键布局功能。\n开启后，屏幕的左侧将会显示§fill=#fff§[0] - [4]§fill=#808080§五个按钮，对应不同的按键布局，\n可以点击对应按钮快速切换布局，也可自定义布局。',
            helper_controlType:
                '【控制方式】§fill=#ff0§按[Z]键§fill=#808080§切换以下两种控制方式：\n§fill=#ff0§1. 方向按键§fill=#808080§：传统方向键控制\n§fill=#ff0§2. 虚拟摇杆§fill=#808080§：直接通过滑动来改变方向',
            helper_controlOpacity:
                '【按键透明度】\n§fill=#ff0§使用左右方向键§fill=#808080§调整：\n数值越大，按键越清晰。数值越小，按键越透明。',
            helper_enableDiagnal:
                '【方向键布局】\n§fill=#ff0§按[Z]键§fill=#808080§切换方向键布局，以此开启或关闭斜向移动。\n选择§fill=#fff§八按键§fill=#808080§布局时，可以用额外的四个方向键来斜向移动。',
            helper_deadZone:
                "§fill=#ff0§使用左右方向键§fill=#808080§调整摇杆的响应灵敏度。死区表示§fill=#ff0§摇杆需要移动多大距离才开始响应§fill=#808080§：\n- §fill=#fff§死区越小§fill=#808080§：摇杆更容易响应，操作更灵敏，§fill=#fff§死区越大§fill=#808080§：需要更大幅度移动才会响应。\n提示：如果摇杆太敏感，可以适当增大死区值。",
            helper_toleranceAngle:
                '§fill=#ff0§使用左右方向键§fill=#808080§调整摇杆的方向判定范围。容错角度决定了§fill=#ff0§向某个方向移动时的精确程度§fill=#808080§。\n- §fill=#fff§角度越小§fill=#808080§： 移动方向判定越严格，§fill=#fff§角度越大§fill=#808080§：移动方向判定越宽松。\n提示：超过45度时会自动触发斜向移动。',
            helper_showFullScrKey:
                '【提示】在屏幕左上角，有两个额外按钮：§fill=#ff0§全屏和Debug菜单§fill=#808080§。\n对于安卓版（非网页版），全屏按钮是多余的。\n可以§fill=#ff0§按[Z]键§fill=#808080§来隐藏它。',
            helper_modifyButtons:
                '【自定义布局】\n找到想修改布局的按键，§fill=#ff0§按[Z]键§fill=#808080§开始自定义布局。\n你可以调整所有按键的§fill=#ff0§位置和大小§fill=#808080§，系统会引导你完成设置。',
            helper_singleArrow:
                '【独立方向键设置】§fill=#ff0§按[Z]键§fill=#808080§开启或关闭独立方向键设置。\n默认情况下，四个方向键会作为一个整体来调整位置和大小。开启后，你可以§fill=#fff§分别设置每个方向键的位置和大小§fill=#808080§。\n根据自己的使用习惯灵活调整布局。',
            helper_invertButtonPos:
                '【左右翻转按键位置】\n§fill=#ff0§按[Z]键§fill=#808080§一键翻转所有虚拟按钮（方向键，控制键，摇杆）的位置。\n如果您习惯用右手操控方向，左手按ZXC，\n这个功能会非常实用。'
        },

        sidebar1: '物品',
        sidebar2: '状态',
        sidebar3: '手机',
        sidebar4: '设置',
        sidebar5: '体征',

        start1: [
            '---- 操作介绍 ----',
            '[Z 或 ENTER] - 确认/交互',
            '[X 或 SHIFT] - 返回',
            '[C 或 CTRL] - 菜单（游戏内）',
            '[F4] - 全屏',
            '[长按 ESC] - 重启',
            '当 HP 降至 0，你就输了。'
        ],
        start2: '开始游戏',

        stat1: '攻击',
        stat2: '防御',
        stat3: '武器',
        stat4: '防具',
        stat5: '金钱',
        stat6: 'EXP',
        stat7: '升级需',
        stat8: '§fill=#ff0§警告：\n不是\n主时间线。',
        stat9: '击杀',
        stat10: '击败',
        stat11: '调情',
        stat12: '生命体征',
        stat13: '“$(x)”',

        story1: ['<24>{#p/storyteller}很久以前，\n太阳系由两个物种统治着：\n人类和怪物。{^35}{}'],
        story2: ['<24>随着时间的推移，\n两个物种之间爆发了战争。{^35}{}'],
        story3: ["<24>最终，\n怪物的母星被摧毁，\n人类宣布了胜利。{^35}{}"],
        story4: ['<24>他们将剩下的怪物\n流放到一个废弃的前哨站。{^35}{}'],
        story5: ['<24>随后，建起一道强大的力场，\n将怪物们封印在内。{^35}{}'],
        story6: ['<24>许多年后.{^16}.{^16}.{^35}{}'],
        story7: ['<#24>      伊波特星域      \n        251X{^35}{}'],
        story8: ['<24>传说，宇宙中有一个地方，\n发射到那里的飞船\n都再也没有返航。{^35}{}'],
        story9: ['<24>{^100}{}'],
        story10: ['<24>{^100}{}'],
        story11: ['<24>{^35}{}']
    },

    timeline: {
        main: '重返主时间线',
        main_ex: '开启主时间线',
        timelines: '其他时间线槽位',
        bisect: '切分',
        delete: '删除',
        instruction: '[ESC]取消 / [ENTER]确定',
        instruction_gamepad: '按手柄上任意按钮打开键盘。',
        launch: '进入',
        rename: '重命名',
        create: '新建',
        placeholder: '输入时间线名称',
        confirm: '确定删除吗？'
    }
};


// END-TRANSLATE
