// START-TRANSLATE

export default {
    battle: {
        death0: ['(Derin bir nefes aldın.)', "(İçin azimle dolu.)"],
        death1: ['Şu anda pes edemezsin...', '$(name)!\nAzimli kal...'],
        death2: ['Kaderimiz senin elinde...', '$(name)!\nAzimli kal...'],
        death3: ["İyi olacaksın!", '$(name)!\nAzimli kal...'],
        death4: ["Umudunu kaybetme!", '$(name)!\nAzimli kal...'],
        death5: ['Şu anda bitemez!', '$(name)!\nAzimli kal...'],

        flee1: '    * Kaçtık...',
        flee2: "    * Ben kaçar.",
        flee3: "    * Yapacağım daha önemli işler var.",
        flee4: "    * Beni yavaşlatma.",
        flee5: '    * $(x) DP ve $(y)A ile kaçtın.',

        mercy_assist: '* Yardımcı Ol',
        mercy_flee: '* Kaç',
        mercy_spare: '* Bağışla',

        victory1: '<32>{#p/story}* KAZANDIN!\n* Kazancın: $(x) TP ve $(y)A.',
        victory2: '<32>{#p/story}* KAZANDIN!\n* Kazancın: $(x) TP ve $(y)A.\n* SEVGİ\'n arttı.'
    },

    developer: {
        console: {
            header: 'HATA',
            p_resume: {
                header: 'GÖRMEZDEN GEL',
                resume: 'Görmezden gelmek için tıkla'
            },
            blurb: 'Bir hatayla karşılaştın!\nLütfen hatayı geliştiriciye gönder.'
        },
        control: {
            tab: 'KONTROL',
            headers: ['GENEL', 'SAVAŞ'],
            items: [
                [
                    'FixMusic',
                    'FixPlayer',
                    'SonsuzA',
                    'Etkileşim',
                    'Giriş',
                    'Hareket',
                    'Noclip',
                    'Kaydet',
                    'SkipText',
                    'Freecam'
                ],
                [
                    'YardımcıOlVar',
                    'ClearBox',
                    'Çıkış',
                    'ResetBox',
                    'ResetMenu',
                    'CanFlee',
                    'SınırsızCAN',
                    'PacifyAll',
                    'Özkıyım',
                    'WeakenAll'
                ]
            ],
            p_speed: {
                fps: '$(x) FPS',
                halt: 'Halt',
                header: 'GAME SPEED',
                next: 'More',
                prev: 'Less',
                sec: '$(x)s/frame'
            }
        },
        godhome: {
            tab: 'GODHOME',
            p_teleport: {
                header: 'ROOM',
                action: 'Teleport'
            },
            p_encounter: {
                header: 'ENCOUNTER',
                action: 'Start'
            },
            p_armor: {
                header: 'ZIRH'
            },
            p_weapon: {
                header: 'SİLAH'
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
                extent: 'Extent',
                f: 'F', 
                face: 'Face',
                false: 'False',
                fill: 'Fill',
                fontFamily: 'Font Family',
                fontSize: 'Font Size',
                frames: 'Frames',
                gravity: 'Gravity',
                group: 'Group',
                hp: 'CAN',
                index: 'Index',
                inert: 'Inert',
                key: 'Key',
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
                registry: 'REGISTRY',
                renderer: 'Renderer',
                resources: 'Resources',
                reverse: 'Reverse',
                right: 'Right',
                room: 'Room',
                roomState: 'Room State',
                rotation: 'Rotation',
                s: 'S', 
                scale: 'Scale',
                shopSelection: 'Shop Selection',
                size: 'Size',
                spacing: 'Spacing',
                spin: 'Spin',
                sprites: 'Sprites',
                step: 'Step',
                stroke: 'Stroke',
                subcrop: 'Subcrop',
                talk: 'Konuş',
                target: 'Hedef',
                text: 'Text',
                time: 'Süre',
                tint: 'Tint',
                trackedAssets: 'Tracked Assets',
                true: 'True',
                unknown: 'UNKNOWN',
                up: 'Up',
                vars: 'Vars',
                velocity: 'Velocity',
                volatile: 'Volatile'
            }
        },
        savemod: {
            tab: 'SAVEMOD',
            header1: 'SAVE EDITOR',
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
                prev: 'Prev',
                next: 'Next'
            },
            prompt: 'Enter Value',
            back: 'Back'
        },
        storage: {
            tab: 'DEPOLAMA',
            header: 'STORAGE EDITOR',
            p_container: { header: 'SEÇİM', prev: 'Prev', next: 'Next' },
            display: { inventory: 'Envanter', dimboxA: 'Boy. Kutu A', dimboxB: 'Boy. Kutu B' }
        }
    },

    dialog: {
        dialog_clear_title: 'Clear File',
        dialog_notice_title: 'Notice',
        dialog_clear_mobile: 'Clear Mobile Settings',
        dialog_open: { buttonLabel: 'Open', name: 'KAYIT dosyaları', title: 'Dosyayı Aç' },
        dialog_save: { buttonLabel: 'Kaydet', name: 'KAYIT dosyaları', title: 'Dosyayı Kaydet' },
        error_load: 'Bu dosya ayrıştırılamadı.',
        message_alert: ['Tamam'],
        message_confirm: ['İptal', 'Tamam'],
        prompt_clear: 'Dosyayı temizle?',
        prompt_demo: 'OUTERTALE demosundan kalan\nKAYIT dosyanız diğer\nslotlara taşınmıştır.',
        prompt_save: 'Bu dosyayı kaydet?',
        prompt_clear_mobile: 'Mobil ayarlarını temizle?\nBu, KAYIT dosyanızı\nSİLMEYECEKTİR.',
        prompt_save_alternate: 'Aşağıdaki metni bir JSON\ndosyasına kopyalayarak\ncihazınıza kaydedin.',
        prompt_open: 'Bu dosyayı yükle?'
    },

    extra: {
        credits: [
            [
                '§fill=#ff0§< GELİŞTİRİCİ >§fill=#fff§',
                'spacey_432',
                '',
                '§fill=#ff0§< YAZARLAR >§fill=#fff§',
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
                '§fill=#ff0§< YAZARLAR >§fill=#fff§',
                'ThatGuyWhoLikesFood',
                'Turbulation',
                'Zaxento The Greedy',
                '',
                '§fill=#ff0§< ÇİZİMLER >§fill=#fff§',
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
                '§fill=#ff0§< ÇİZİMLER >§fill=#fff§',
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
                '§fill=#ff0§< ÇİZİMLER >§fill=#fff§',
                'supper12',
                'Valor52',
                'Zaxento The Greedy',
                '',
                '§fill=#ff0§< TEKNİSYEN >§fill=#fff§',
                'Codetoil',
                'ryi3r',
                'ws3917',
                '',
                '§fill=#ff0§< TESTERLAR >§fill=#fff§',
                'Alden',
                'Aspey',
                'Aster',
                'Balgamlı Kedi'
            ],
            [
                '§fill=#ff0§< TESTERLAR >§fill=#fff§',
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
                '§fill=#ff0§< TESTERLAR >§fill=#fff§',
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
                '§fill=#ff0§< TESTERLAR >§fill=#fff§',
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
                '§fill=#ff0§< TESTERLAR >§fill=#fff§',
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
                '§fill=#ff0§< TESTERLAR >§fill=#fff§',
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
                '§fill=#ff0§< ÖZEL TEŞEKKÜRLER >§fill=#fff§',
                'Alden',
                '§fill=#808080§Arkamı yaslayacak birine ihtiyacım olduğunda\nyanımda olduğu için, ve beni\ndaha iyi biri haline getiren\nhayat dersleri verdiği için.§fill=#fff§'
            ],
            [
                '§fill=#ff0§< ÖZEL TEŞEKKÜRLER >§fill=#fff§',
                'Aster',
                '§fill=#808080§Bildiğim en dost canlısı\nkişilerden biri olduğu için,\nhayallerime inanan ilk kişi olup\noyunu bitirebilmemde bana ilham\nverdiği için.§fill=#fff§'
            ],
            [
                '§fill=#ff0§< ÖZEL TEŞEKKÜRLER >§fill=#fff§',
                'Balgamlı Kedi',
                "§fill=#808080§Oyunun gelişiminin her aşamasında\nyanımda olduğu için, en başından beri. Çağ\nne olursa olsun her zaman yardım için\nburadaydı.§fill=#fff§"
            ],
            [
                '§fill=#ff0§< ÖZEL TEŞEKKÜRLER >§fill=#fff§',
                'Ghostly',
                '§fill=#808080§Oyunun birçok yönüyle ilgili\nsağduyulu olduğu ve beni\ntest etmeyi ciddiye almaya\nteşvik ettiği için.§fill=#fff§'
            ],
            [
                '§fill=#ff0§< ÖZEL TEŞEKKÜRLER >§fill=#fff§',
                'Zaxento The Greedy',
                '§fill=#808080§Güvenilir olduğu, acımasızca dürüst\ndavrandığı, bana pek çok eleştiri ve\nfikir verdiği ve tanıştığımız günden\nberi sadık olduğu için.§fill=#fff§'
            ],
            [
                '§fill=#ff0§< ÖZEL TEŞEKKÜRLER >§fill=#fff§',
                'ThatGuyWhoLikesFood',
                '§fill=#808080§Oyunun kritik bölümlerini yazmama\nyardım ettiği, hayalimi desteklediği\nve kendimi tamamen yeni bir şekilde\nifade etmeme yardımcı olduğu için.§fill=#fff§'
            ],
            [
                '§fill=#ff0§< ÖZEL TEŞEKKÜRLER >§fill=#fff§',
                'Bilge \"mnwary\"',
                "§fill=#808080§Geliştirmenin sonlarına doğru\nyardım etmek için orada olduğu ve\noyunun yazımının tam potansiyeline\nulaşmasını sağladığı için.§fill=#fff§"
            ],
            ['§fill=#ff0§The Mavis & Co.§fill=#fff§ tarafından sizlere sunuldu']
        ],

        final_frontier: {
            header: '(( KAST ))',
            opponents: {
                froggit: {
                    name: 'FROGGİT',
                    author: 'ScarletScaledDragon',
                    text: {
                        basic: 'Hayat Üstüne\nKafa Yoruyor',
                        spare: 'Profesyonel\nKurbağa',
                        flirt: 'Aşka\nKafa Yoruyor',
                        bully: 'Korkuyla\nZıplıyor'
                    }
                },
                whimsun: {
                    name: 'FLUTTERLYTE',
                    author: 'ScarletScaledDragon',
                    text: {
                        basic: 'Uçmayı\nÖğreniyor',
                        spare: 'Cesaret Veren\nUçuşçu',
                        flirt: 'Göklerde\nArayışta',
                        bully: 'Kaçışlı\nManevralar'
                    }
                },
                moldsmal: {
                    name: 'GELATİNİ',
                    author: 'spacey_432',
                    text: {
                        basic: 'Yeni Bir Uzay\nİstasyonu Buldu',
                        spare: 'Yedek\nDansçı',
                        flirt: 'Egzotik Jel\nDansçısı',
                        bully: 'Yeni Bir\nGalaksi Buldu'
                    }
                },
                loox: {
                    name: 'OCULOUX',
                    author: 'ScarletScaledDragon',
                    text: {
                        basic: 'Kısmen\nZorbamsı',
                        spare: 'Islah Olmuş\nZorba',
                        flirt: 'Kısmen\nÇapkın',
                        bully: ''
                    }
                },
                migosp: {
                    name: 'SİLENTE',
                    author: 'ScarletScaledDragon',
                    text: {
                        basic: 'İnanılmaz\nUzlaşmacı',
                        spare: 'Sadece Hayatın\nTadını Çıkarıyor',
                        flirt: 'Uzaklarda\nAşkla Dolu',
                        bully: 'Tehlike\nİnkarcısı'
                    }
                },
                mushy: {
                    name: 'MUSHY',
                    author: 'Balgamlı Kedi & ScarletScaledDragon',
                    text: {
                        basic: 'Kurusıkı\nAtıyor',
                        spare: 'Eli Çabuk\nSihirbaz',
                        flirt: 'Tam Kalbinden\nVuruldu',
                        bully: 'Sıkıyor Ve\nDua Ediyor'
                    }
                },
                finalghost: {
                    name: 'LURKSALOT',
                    author: 'spacey_432',
                    text: {
                        basic: 'Kimseye Söz\nEtmiyorlar',
                        spare: 'Fiziksel Temas\nArayışında',
                        flirt: 'Sabırlıca\nAlakasız',
                        bully: ''
                    }
                },
                stardrake: {
                    name: 'STARDRAKE',
                    author: 'Burge',
                    text: {
                        basic: 'Hala Kahkaha\nBekleyişinde',
                        spare: 'Yarı Başarılı\nKomedyen',
                        flirt: 'Büyükler Arasında\nPopüler',
                        bully: ''
                    }
                },
                chilldrake: {
                    name: 'CHILLDRAKE',
                    author: 'Burge',
                    text: {
                        basic: 'Hala Destekçi\nArıyor',
                        spare: 'Koyu Hayranlar\nKazandı',
                        flirt: 'Destekçiler İçin\nÖpücük Takaslıyor',
                        bully: 'Zorbalık Karşıtı\nAktivist'
                    }
                },
                spacetop: {
                    name: 'ASTRO SERF',
                    author: 'DESM.al',
                    text: {
                        basic: 'Aklı\nAnteninde',
                        spare: 'Radyo İstasyonu\nAlgılaması',
                        flirt: 'Havada Aşk\nKokusu Var',
                        bully: 'Acil Durum\nYayıncısı'
                    }
                },
                jerry: {
                    name: 'JERRY',
                    author: 'Discarded Vessel',
                    text: {
                        basic: 'Her Gün\nEkilmeye Devam',
                        spare: 'Artık Daha\nAz Ekiliyor',
                        flirt: 'Kendini Affettirme\nYolunda',
                        bully: ''
                    }
                },
                mouse: {
                    name: 'WHİZKARAT',
                    author: 'Zaxento The Greedy & semi',
                    text: {
                        basic: 'Benlik Krizi\nAltında',
                        spare: 'Fare Topluluğunun\nEn Yeni Üyesi',
                        flirt: 'Farelerle\nOynaklaşıyor',
                        bully: 'Hızla Kedi\nTopluluğuna Döndü'
                    }
                },
                doggo: {
                    name: 'DOGGO',
                    author: 'Discarded Vessel',
                    text: {
                        basic: 'Yüce Somun\nAnahtarına İnanıyor',
                        spare: 'Kendi Rehber\nKurdunu Edindi',
                        flirt: 'Kendi Rehber\nKurduna Aşık',
                        bully: 'Kendi Rehber\nKurduna Kaçıyor'
                    }
                },
                lesserdog: {
                    name: 'CANİS MİNOR',
                    author: 'major_memestar',
                    text: {
                        basic: 'İlgi Arayışında',
                        spare: 'Sevgi Dolu Bir\nSahip Buldu',
                        flirt: 'Varlıklı Bir\nSevgili Buldu',
                        bully: 'İlgiye\nMuhtaç'
                    }
                },
                dogs: {
                    name: 'DOGAMY & DOGARESSA',
                    author: 'major_memestar',
                    text: {
                        basic: 'Hala Git Getir\nOynamayı Düşünüyorlar',
                        spare: 'Yavru Köpek\nBakışı Şampiyonları',
                        flirt: "Birbirlerinin\nBakışlarında Kayıplar",
                        bully: 'Defansif Köpek\nBakışı Aktif'
                    }
                },
                greatdog: {
                    name: 'CANİS MAJOR',
                    author: 'major_memestar',
                    text: {
                        basic: "Hayatın Değişiminden\nBihaber",
                        spare: "Hayatın Değişiminden\nHeyecanlı",
                        flirt: "Hayatın Değişiminden\nEtkilenmiş",
                        bully: ''
                    }
                },
                woshua: {
                    name: 'SKRUBBİNGTON',
                    author: 'Discarded Vessel',
                    text: {
                        basic: 'Sadece Yüzde\n99.1 Arınmış',
                        spare: 'Güçlü Yıkamalı\nGüçlü Kişi',
                        flirt: 'Jakuzi\nİmalatçısı',
                        bully: 'Aşırı Güçlü\nBasınçlı Yıkamacı'
                    }
                },
                moldbygg: {
                    name: 'GELATA',
                    author: 'spacey_432',
                    text: {
                        basic: 'Bebek Bakıcısı\nArayışında',
                        spare: 'Balçıkla Çalışan\nBar Taburesi',
                        flirt: 'Seksi Sitkom\nMüdavimi',
                        bully: 'Onurlu\nGüreş İpi'
                    }
                },
                radtile: {
                    name: 'RADTİLE',
                    author: 'Balgamlı Kedi & Zaxento The Greedy',
                    text: {
                        basic: 'Kusurluluk\nİçinde Yüzüyor',
                        spare: 'Öz İmajını\nGeliştiriyor',
                        flirt: 'Kendi Yansımasıyla\nÇıkıyor',
                        bully: 'Çirkin Bir\nGeleceğe Yol Aldı'
                    }
                },
                shyren: {
                    name: 'SHYREN',
                    author: 'Ghostly',
                    text: {
                        basic: 'Piyano Dersleri\nAlmaya Döndü',
                        spare: "Mettaton'un Yeni\nSolisti",
                        flirt: 'Bir Hayalete\nAşık',
                        bully: "Autotune'suz Şarkı\nSöyleyemiyor"
                    }
                },
                doge: {
                    name: 'DOGE',
                    author: 'major_memestar',
                    text: {
                        basic: 'Şantiye\nEğitim Çavuşu',
                        spare: 'Bir Spa\'nın\nÖmürlük Abonesi',
                        flirt: 'İlk Kez Yavru\nKöpek Gibi Sevildi',
                        bully: ''
                    }
                },
                muffet: {
                    name: 'MUFFET',
                    author: 'major_memestar',
                    text: {
                        basic: 'Bir Sonraki\nÖdemeyi Bekliyor',
                        spare: 'Örümcek Klanlarına\nDeğer Veriyor',
                        flirt: 'Piknik Randevusu\nÇöpçatanı',
                        bully: ''
                    }
                },
                pyrope: {
                    name: 'HOTWİRE',
                    author: 'semi',
                    text: {
                        basic: 'Ritmin Düşeceği\nAnı Bekliyor',
                        spare: 'Yıldırım\nHızında Rapçi',
                        flirt: 'Rapçiydi Aşk\nŞarkılarına Geçti',
                        bully: 'Yaklaşan Ölümle\nRap Savaşında'
                    }
                },
                tsundere: {
                    name: 'TSUNDERIDEX',
                    author: 'spacey_432',
                    text: {
                        basic: 'İnkarın İçine\nAlabildiğine Uçuyor',
                        spare: 'Son Hız\nPeşinde',
                        flirt: 'Tsun To Be\nYour Dere-Dere',
                        bully: 'Sonunda Uygun\nPartneri Buldu'
                    }
                },
                perigee: {
                    name: 'PERİGEE',
                    author: 'Discarded Vessel',
                    text: {
                        basic: 'Yeni Bir Gün,\nYeni Bir Sorun',
                        spare: 'Gezegenler Arası\nBüyükelçi',
                        flirt: 'Diğerlerine Aşkı\nAşılıyor',
                        bully: 'Acı İçinden\nNezaket Gösteriyor'
                    }
                },
                rg: {
                    name: 'KM 03 & KM 04',
                    author: 'semi',
                    text: {
                        basic: 'Çocukluk Arkadaşlarını\nArıyorlar',
                        spare: 'Hayal Gücünü\nKullan',
                        flirt: 'Hayal Gücünü\nKullan... Lütfen',
                        bully: 'Emekli Kraliyet\nMuhafızları'
                    }
                },
                glyde: {
                    name: 'GLYDE',
                    author: 'Burge',
                    text: {
                        basic: 'Pek Uygun Bir\nİş Ortağı Değil',
                        spare: 'Normalden Daha\nAz Sıkıntılı',
                        flirt: 'Pek Uygun Bir\nYatak Arkadaşı Değil',
                        bully: ''
                    }
                },
                burgie: {
                    name: 'BURGERPANTS',
                    author: 'Pongy25',
                    text: {
                        basic: 'Önündeki Hayata\nAceleyle Koşuyor',
                        spare: 'Önündeki Hayatı\nMerak Ediyor',
                        flirt: 'Önündeki Hayatında\nAşkı Arıyor',
                        bully: ''
                    }
                },
                madjick: {
                    name: 'COZMO',
                    author: 'semi',
                    text: {
                        basic: 'Bir Sözlük\nArıyor',
                        spare: 'Meşhur\nSihirbaz',
                        flirt: 'Yeni Bir Tür\nSihir Buldu',
                        bully: ''
                    }
                },
                knightknight: {
                    name: 'TERRESTRİA',
                    author: 'major_memestar',
                    text: {
                        basic: 'Geçmişin\nArayışında',
                        spare: 'Tanınmış\nTarihçi',
                        flirt: 'Ana Gezegeninden\nHoşlanıyor',
                        bully: ''
                    }
                },
                froggitex: {
                    name: 'SON FROGGİT',
                    author: 'PoTheWinterCorder',
                    text: {
                        basic: 'Bilgeliğini Kendine\nSaklamakta',
                        spare: 'Bilgelini Başkalarıyla\nPaylaşmakta',
                        flirt: 'Bilgeliğini Aşk\nİçin Kullanmakta',
                        bully: 'Bilgeliğini Yaşamak\nİçin Kullanmakta'
                    }
                },
                whimsalot: {
                    name: 'FLUTTERKNYTE',
                    author: 'spacey_432',
                    text: {
                        basic: 'Hala Her Gün\nÇalışıyor',
                        spare: 'Sonunda Mola\nVerdi',
                        flirt: 'Biraz Kişisel\nZaman Arıyor',
                        bully: 'Korkudan Daha\nÇok Çalışıyor'
                    }
                },
                astigmatism: {
                    name: 'EYEWALKER PRİME',
                    author: 'semi',
                    text: {
                        basic: 'Hala Koca\nBir Zorba',
                        spare: 'Otoriter\nGöz Doktoru',
                        flirt: 'Otoriter\nDerici',
                        bully: 'Yerine Başka\nOculoux Geçti'
                    }
                },
                migospel: {
                    name: 'SİLENCİO',
                    author: 'Balgamlı Kedi',
                    text: {
                        basic: 'Hala Utanmaz\nBir Korkak',
                        spare: 'Artık Pek De\nKorkak Değil',
                        flirt: 'Korkusuna\nAşık',
                        bully: 'Her Zamankinden\nDaha Hızlı Koşuyor'
                    }
                },
                mushketeer: {
                    name: 'MUSHKETEER',
                    author: 'Balgamlı Kedi & Ghostly',
                    text: {
                        basic: 'Tek Mantarlık\nOrdu',
                        spare: 'Eski Savaşçı\nBarış Arayışında',
                        flirt: 'Sevginin Gücüyle\nYenildi',
                        bully: 'Direkt\nKorkmuş'
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
                    name: 'TORİEL',
                    author: 'MattSpriteMaster'
                },
                asgore: {
                    name: 'ASGORE',
                    author: 'MattSpriteMaster'
                },
                monsterkid: {
                    name: 'CANAVAR ÇOCUK',
                    author: 'spacey_432'
                },
                asriel: {
                    name: 'ASRİEL',
                    author: 'Medi0creking & MattSpriteMaster'
                }
            }
        },

        langPrompt: 'Seçmek için [↑ veya ↓] / Onaylamak için [Z veya ENTER]',
        epilepsyInfo:
            'Etkilenebilmesi olası kişilere,\n\nBu oyunda §fill=#ff0§parlak ışıklar§fill=#fff§ mevcut.\nAma dilerseniz §fill=#ff0§ayarlar menüsünden§fill=#fff§\nseviyesini düşürebilirsiniz.\n\n',
        epilepsyKeys: '§fill=#808080§Devam etmek için [Z veya ENTER]\'a basın',

        quitText1: 'Çıkılıyor',
        quitText2: 'Çıkılıyor.',
        quitText3: 'Çıkılıyor..',

        real1: [
            [
                '(Şimdi Sırada Geliştiricinin Sözleri)',
                'Outertale\'i oynadığın için teşekkürler.',
                'Bu projede çalışmak benim için bir gurur ve memnuniyetti.'
            ],
            ['Bu yolculuğa başladığımda, hiç', "bu kadar mesafe kat edebileceğimi düşünmezdim,", 'ama işte buradayız, işin sonunda.'],
            [
                'Benim için, UNDERTALE hayat değiştirici',
                'bir deneyimdi, ilk kez oynadıktan',
                'sonra bırakması zor bir türden.'
            ],
            [
                'O yüzden OUTERTALE ile, sana',
                'tekrar böyle bir evrende bulunma şansı vermek istedim,',
                'adeta ilk kez oynuyormuşçasına.'
            ],
            [
                "Umarım sana öyle bir şans verebilmişimdir.",
                "Ve umarım bu oyunda geçirdiğin zamandan",
                "sonra tatmin olmuşsundur."
            ],
            [
                "Hayatında ne yaptığın fark etmeksizin,",
                'burada yaptığın şeyler kişiliğin',
                'hakkında pek çok şey anlatıyor.'
            ],
            [
                "Senden ötürü sana böyle bir son",
                'denk geldi, bu deneyimi de senden',
                'hiçbir şey alamaz.'
            ],
            ['Hatalarına rağmen... sen mükemmelsin,', 'ayrıca ilgi ve sevgiyi hak ediyorsun.', 'Bunu hatırla, olur mu?']
        ],
        real2: 'Kendine iyi bak, \"$(x).\"',

        end1: 'SON',
        end2: 'SON...?',

        restartText1: 'Tekrar Başlıyor',
        restartText2: 'Tekrar Başlıyor.',
        restartText3: 'Tekrar Başlıyor..',

        title: 'OUTERTALE',
        title_timeline: 'OUTERTALE...?'
    },

    gamepad: {
        prompt: 'GAMEPAD KURULUMU',
        prompt_desc:
            'Tuş ataması yapmak için\ngamepad’inizdeki herhangi\nbir tuşa basın.\n\nAtamayı onaylamak için\ntekrar aynı tuşa basın\nya da başka bir tuşa geçin.\n\nBu aşamayı geçmek için [ESC].',
        prompt_counter: 'Atanmış Tuşlar: $(x)',
        z: '[Z veya ENTER] - Onayla',
        x: '[X veya SHIFT] - İptal',
        c: '[C veya CTRL] - Menü (Oyun İçi)',
        u: '[ÜST OK veya W] - Yukarı',
        l: '[SOL OK veya A] - Sol',
        d: '[ALT OK veya S] - Aşağı',
        r: '[SAĞ OK veya D] - Sağ',
        f: '[F4] - Tam Ekran',
        prompt_done: 'Kurulum tamamlandı.\nDevam etmek için herhangi bir tuşa basın.',
        prompt_done_browser: '\nNot: Bu platformda, gamepad her zaman tam ekrana giremeyebilir.',
        prompt_load:
            'Önceden kurulu bir gamepad mevcut.\nDevam etmek için herhangi bir tuşa basın ya da kurulumu baştan başlatmak\niçin aynı tuşa hızlıca\nüç kere basın.\n\nKurulumu geçmek için [ESC].'
    },

    general: {
        asriel: 'Asriel',
        asriel_location: 'Hiçlik',
        disabled: 'DEVRE DIŞI',
        enabled: 'ETKİN',
        finish: 'Bitirmek için [X]’e basın.',
        frisk: 'Frisk',
        g: 'A',
        hp: 'CAN',
        inf: '\u221e',
        landing1: '[Z VEYA ENTER’A BASIN]',
        lv: 'SV',
        mystery1: '§mystify=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz§aaaaaa§mystify=§',
        mystery2: '{@mystify=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz}aaaaaa{@mystify=}',
        mystery2l: '{@mystify=abcdefghijklmnopqrstuvwxyz}aaaaaa{@mystify=}',
        mystery2u: '{@mystify=ABCDEFGHIJKLMNOPQRSTUVWXYZ}aaaaaa{@mystify=}',
        no: 'Hayır',
        nominal: '§fill=#0f0§NOMINAL',
        percent: '%$(x)',
        player: 'oyuncu',
        settings: 'Ayarlar',
        shopg: 'A',
        unknown: '?',
        xm: 'EM',
        yes: 'Evet'
    },

    menu: {
        box1: 'ENVANTER',
        box2: 'KUTU',
        key1: 'ANAHTARLIK',

        confirm1: 'Bu isim doğru mu?',
        confirm2: 'Çoktan bir isim\nseçilmiş.',
        confirm3: 'Geri dön',

        footer: 'OUTERTALE V5.05 (c) 2025 SPACEY_432',

        heal1: '* (CAN\'ın tamamen doldu.)',
        heal2: '* ($(x) CAN yeniledin.)',
        heal3: '* ($(x) CAN kaybettin.)',
        heal4: '* (CAN\'ın tamamen sıfırlandı.)',
        heal5: '* ($(x) CAN kazandın.)',

        item1: 'KULLAN',
        item2: 'KUŞAN',
        item3: 'BİLGİ',
        item4: 'BIRAK',

        load1: 'Devam Et',
        load2: 'İzle',
        load3: 'Sıfırla',
        load4: 'Gerçekten Sıfırla',

        name1: 'Mahsur kalmış insanı adlandır.',
        name2: 'Çık',
        name3: 'Backspace',
        name4: 'Bitir',
        name5: '§fill=#808080§ [ESC] - Çık / [ENTER] - Bitir',

        save1: 'Kaydet',
        save2: 'Geri Dön',
        save3: 'Dosya kaydedildi.',

        settings1: 'AYARLAR',
        settings2: 'ÇIK',
        settingsprompt1: '-> LANGUAGE & MUSIC',
        settings3: 'DİL',
        settings3a: 'TÜRKÇE',
        settings4: 'SES EFEKTİ',
        settings5: 'MÜZİK',
        settings6: 'SÜSLÜ GRAFİKLER',
        settingsprompt2: '-> GAMEPLAY & GRAPHICS',
        settings6a: 'KARAKTER KOŞUŞU',
        settings6b: 'COLORED SPRITES',
        settings7: 'IŞIK EFEKTLERİ',
        settings7a: 'NORMAL',
        settings7b: 'AZALTILMIŞ',
        settings8: 'MOBİL AYARLARI',
        settings9: 'BOŞLUK',
        settings10: 'MOD DOSYASINI AÇ',
        settings11: 'TEKRAR BAŞLAT',
        border: {
            option: 'OYUN ÇERÇEVESİ',
            list: [
                'NONE',
                'DİNAMİK',
                'SABİT',
                'YILDIZLI',
                'OUTLANDS',
                'OUTLANDS (BATTLE)',
                'TORİEL\'İN EVİ',
                'STARTON',
                'STARTON (BATTLE)',
                'DÖKÜMHANE',
                'FOUNDRY (BATTLE)',
                'AERIALIS',
                'AERIALIS (BATTLE)',
                'EĞ MERKEZİ',
                'REC CENTER (BATTLE)',
                'ÇEKİRDEK',
                "CORE (BATTLE)",
                'HİSAR',
                'ASGORE\'UN EVİ',
                'ARŞİV ALTI',
                'ASRİEL SAVAŞI',
                'BRIGHT GALAXY',
                'YENİ GEZEGEN',
                'NEW WORLD (WITH CUP)',
                '§fill=#808080§(KİLİTLİ)'
            ]
        },
        mobile: {
            title: 'MOBİL KONTROLLERİ',
            controlOpacity: 'OPAKLIK',
            controlType: 'KONTROL TİPİ',
            enableDiagonal: 'ARROW KEY LAYOUT',
            enableSingleArrow: 'INDIV. DIRECT. KEY',

            fourKey: '\u4dc8 4-KEY',
            eightKey: '\u4dc9 8-KEY',
            deadZone: 'BOŞLUK',
            toleranceAngle: 'TOLERANS AÇISI',

            loadDefault: 'VARSAYILAN AYARLAR',
            enableMultiConfig: 'ENABLE QUICK SWITCHING',
            invertButtonPos: 'INVERT BUTTON POSITION',

            prompt1: '--- PROFİL SEÇ ---',
            prompt2: '--- GENEL AYARLAR ---',
            prompt3: '--- KONTROL AYARLARI ---',
            prompt4: '--- TUŞLARI DÜZENLE ---',

            nextpage: 'SONRAKİ >',
            prepage: '< ÖNCEKİ',

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

            xPos: 'MERKEZİ X KONUMU',
            yPos: 'MERKEZİ Y KONUMU',
            size: 'TUŞ BOYUTU',
            radius: 'ÇEMBER YARIÇAPI',

            keysettings: 'TUŞ ÖZELLEŞTİR',
            keyprompt0: '§fill=#ffd700§>> §fill=#fff§DÜZENLENEN: §fill=#00ffff§$(x) §fill=#808080§(Resetlemek için bas: [R])',
            keyprompt1: '§fill=#fff§İLERLEME: §fill=#00ffff§($(x)§fill=#fff§/§fill=#00ffff§3)',
            keyprompt1a: ' [1] Tuşun başlangıçtaki konumu',
            keyprompt1b: ' [2] Konum ince ayarı',
            keyprompt1c: ' [3] Tuş Boyutu Ayarlaması',
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

        sidebar1: 'EŞYA',
        sidebar2: 'DURUM',
        sidebar3: 'CEP',
        sidebar4: 'AYAR',
        sidebar5: 'S',

        start1: [
            '--- Yönerge ---',
            '[Z veya ENTER] - Onayla',
            '[X veya SHIFT] - İptal',
            '[C veya CTRL] - Menü (Oyun İçi)',
            '[F4] - Tam Ekran',
            '[ESC Basılı Tut] - Tekrar Başla',
            'CAN\'ın 0’a düşerse, kaybedersin.'
        ],
        start2: 'Oyuna Başla',

        stat1: 'SL',
        stat2: 'SV',
        stat3: 'SİLAH',
        stat4: 'ZIRH',
        stat5: 'ALTIN',
        stat6: 'EXP',
        stat7: 'SONRAKİ',
        stat8: '§fill=#ff0§Uyarı:\nAsıl zaman\nçizelgesi\ndeğil.',
        stat9: 'ÖLEN',
        stat10: 'ZORBA',
        stat11: 'FLÖRT',
        stat12: 'DURUM',
        stat13: '\"$(x)\"',

        story1: ['<24>{#p/storyteller}Uzun zaman önce, Güneş Sistemi\'ne iki ırk hükmediyordu: İNSANLAR VE CANAVARLAR.{^35}{}'],
        story2: ['<24>Zaman geçtikçe, iki türün arasında bir savaş çıktı.{^35}{}'],
        story3: ["<24>CANAVARLARIN ana gezegeni yok edilince İNSANLAR zafer ilan etti.{^35}{}"],
        story4: ['<24>Geriye kalan CANAVARLAR terk edilmiş bir karakola sürülmüştü.{^35}{}'],
        story5: ['<24>Kuvvetli bir güç kalkanı oluşturuldu, CANAVARLAR içine hapsedildi.{^35}{}'],
        story6: ['<24>Yıllar yıllar sonra.{^8}.{^8}.{^35}{}'],
        story7: ['<#24>     EBOTT SEKTÖRÜ     \n         251X{^35}{}'],
        story8: ['<24>Masallar hiçbir uzay mekiğinin geri dönemediği bir yerden bahseder.{^35}{}'],
        story9: ['<24>{^100}{}'],
        story10: ['<24>{^100}{}'],
        story11: ['<24>{^35}{}']
    },

    timeline: {
        main: 'Asıl Zaman Çizelgesine Devam',
        main_ex: 'Yeni Asıl Zaman Çizelgesi',
        timelines: 'Diğer Slotlar',
        bisect: 'Çoğalt',
        delete: 'Sil',
        instruction: 'İptal için [ESC] / Onaylamak için [ENTER]',
        instruction_gamepad: 'Klavyeyi açmak için gamepad\'inizdeki herhangi bir tuşa basın.',
        launch: 'Yükle',
        rename: 'İsim',
        create: 'Yenisini Oluştur',
        placeholder: 'Zaman Çizelgesi Adı',
        confirm: 'Emin Misin?'
    }
};


// END-TRANSLATE
