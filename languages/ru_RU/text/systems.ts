// START-TRANSLATE

export default {
   battle: {
      death0: [ '(Ты делаешь глубокий вдох.)', "(Ты наполнен решимостью.)" ],
      death1: [ 'Ты ещё не можешь сдаться...', '$(name)!\nСохраняй решимость...' ],
      death2: [ 'Наша судьба зависит от тебя...', '$(name)!\nСохраняй решимость...' ],
      death3: [ "Ты будешь в порядке!", '$(name)!\nСохраняй решимость...' ],
      death4: [ "Не теряй надежду!", '$(name)!\nСохраняй решимость...' ],
      death5: [ 'Это не может закончиться здесь!', '$(name)!\nСохраняй решимость...' ],

      flee1: '    * Удалось сбежать...',
      flee2: "    * Я сваливаю.",
      flee3: "    * У меня есть дела по важнее.",
      flee4: "    * Не мешай мне.",
      flee5: '    * Убежал с $(x) ОП\n      и $(y)З.',

      mercy_assist: '* Помочь',
      mercy_flee: '* Сбежать',
      mercy_spare: '* Пощадить',

      victory1: '<32>{#p/story}* ПОБЕДА!\n* Награда $(x) ОП и $(y)З.',
      victory2: '<32>{#p/story}* ПОБЕДА!\n* Награда $(x) ОП и $(y)З.\n* Твой УР повысился.'
   },

   developer: {
      console: {
         header: 'ОШИБКА',
         p_resume: {
            header: 'ЗАКРЫТЬ',
            resume: 'Нажмите чтобы закрыть'
         },
         blurb: 'Произошла ошибка! Пожалуйста отправь\nскриншот разработчику.'
      },
      control: {
         tab: 'УПРАВЛЕНИЕ',
         headers: [ 'ОСНОВНОЕ', 'БИТВА' ],
         items: [
            [
               'Фиксированная музыка',
               'Фиксированный игрок',
               'Бесконечные G',
               'Взаимодействовать',
               'Ввод',
               'Движение',
               'Ноуклип',
               'Сохранить',
               'Пропустить Текст',
               'Бесплатная камера'
            ],
            [
               'Может помочь',
               'ОчиститьКоробку',
               'Выход',
               'Перезапустить Ящик',
               'Перезапустить Меню',
               'Суметь сбежать',
               'Бесконечное здоровье',
               'Усмирить всех',
               'Суицид',
               'Ослабить всех'
            ]
         ],
         p_speed: {
            fps: '$(x) ФПС',
            halt: 'Остановка',
            header: 'СКОРОСТЬ ИГРЫ',
            multiplier: '$(x)x',
            next: 'Больше',
            prev: 'Менее',
            sec: '$(x)s/frame'
         }
      },
      godhome: {
         tab: 'Дом бога',
         p_teleport: {
            header: 'КОМНАТА',
            action: 'Телепорт'
         },
         p_encounter: {
            header: 'Столкновение',
            action: 'Старт'
         },
         p_armor: {
            header: 'БРОНЯ'
         },
         p_weapon: {
            header: 'ОРУЖИЕ'
         }
      },
      inspect: {
         tab: 'Проверить',
         headers: [ 'Слои', 'Виды' ],
         switches: [
            [ 'База', 'Ниже', 'Главный', 'Выше', 'Меню' ],
            [ 'Хитбокс', 'Спрайт', 'Текст' ]
         ],
         p_explorer: {
            header: 'Исследователь',
            layers: [ 'Базированый (Проводник)', 'Нижний (Проводник)', 'Главный (Проводник)', 'Верхний (Проводник)', 'Меню (Проводник)' ],
            letters: {
               animation: 'А',
               character: 'С',
               rectangle: 'R',
               entity: 'E',
               hitbox: 'H',
               object: 'O',
               player: 'P',
               sprite: 'S',
               text: 'T'
            }
         },
         debug_instructions: 'Нажмите [TAB], чтобы просмотреть отладочную информацию',
         debug: {
            a: 'А', 
            acceleration: 'Ускорение',
            active: 'Активный',
            alpha: 'Альфа',
            anchor: 'Якорь',
            b: 'B', 
            blend: 'Смесь',
            border: 'Граница',
            compute: 'Вычисленный размер',
            content: 'Контент',
            crop: 'Урожай',
            down: 'Вниз',
            duration: 'Продолжительность',
            exp: 'ОП',
            extent: 'Степень',
            f: 'F', 
            face: 'Лицо',
            false: 'Ложный',
            fill: 'Заполнить',
            fontFamily: 'Семейство шрифтов',
            fontSize: 'Размер шрифта',
            frames: 'Кадры',
            gravity: 'Гравитация',
            group: 'Группа',
            hp: 'ОЗ',
            index: 'Индекс',
            inert: 'Вялый',
            key: 'Ключ',
            lastSavedTime: 'Последнее сохраненное время',
            layer: 'Слой',
            layers: 'Слои',
            left: 'Лево',
            metadata: 'Метаданные',
            music: 'Музыка',
            namespace: 'Название помещения',
            none1: 'Никто',
            none2: 'никто',
            objects: 'Объект',
            oversaver: 'Над спасателем',
            parallax: 'Смещение',
            position: 'Позиция',
            primed: 'Загрунтованный',
            priority: 'Приоритет',
            registry: 'Регистрация',
            renderer: 'Рендеринг',
            resources: 'Ресурсы',
            reverse: 'Реверс',
            right: 'Право',
            room: 'Комната',
            roomState: 'Состояние комнаты',
            rotation: 'Вращение',
            s: 'S', 
            scale: 'Масштаб',
            shopSelection: 'Выбор магазина',
            size: 'Размер',
            spacing: 'Расстояние',
            spin: 'Вращение',
            sprites: 'Спрайты',
            step: 'Шаг',
            stroke: 'Инсульт',
            subcrop: 'Субкультура',
            talk: 'Говорить',
            target: 'Цель',
            text: 'Текст',
            time: 'Time',
            tint: 'Оттенок',
            trackedAssets: 'Отслеживаемые активы',
            true: 'Да',
            unknown: 'НЕИЗВЕСТНЫЙ',
            up: 'Вверх',
            vars: 'Вары',
            velocity: 'Скорость',
            volatile: 'Летучий'
         }
      },
      savemod: {
         tab: 'Cохранить мод',
         header1: 'Cохранить редактор',
         domains: [
            'Данные (логические)',
            'Данные (Номера)',
            'Данные (Строки)',
            'Флаги (логические)',
            'Флаги (Цифры)',
            'Флаги (Строки)'
         ],
         p_page: {
            header: 'Навигация',
            prev: 'Предыдущий',
            next: 'Следующий'
         },
         prompt: 'Введите значение',
         back: 'Назад'
      },
      storage: {
         tab: 'ХРАНИЛИЩЕ',
         header: 'РЕДАКТОР ХРАНИЛИЩА',
         p_container: { header: 'ВЫБОР', prev: 'Предыдущий', next: 'Следующий' },
         display: { inventory: 'Инвентарь', dimboxA: 'Объёмный. Ящик А', dimboxB: 'Объёмный. Ящик Б' }
      }
   },

   dialog: {
      dialog_clear_title: 'Очистить файл',
      dialog_notice_title: 'Уведомление',
      dialog_open: { buttonLabel: 'Открыть', name: 'Сохранить файлы', title: 'Открыть Файл' },
      dialog_save: { buttonLabel: 'Сохранить', name: 'Сохранить файлы', title: 'Сохранить Файл' },
      error_load: 'Этот файл не удалось разобрать.',
      message_alert: [ 'ОК' ],
      message_confirm: [ 'Отмена', 'ОК' ],
      prompt_clear: 'Очистить этот файл?',
      prompt_demo: 'Ваш сохраненный файл из\nдемо-версии OUTERTALE был\nперемещен в раздел временной шкалы.',
      prompt_save: 'Сохранить этот файл?',
      prompt_save_alternate: 'Скопируйте приведенный ниже текст в\nJSON-файл, чтобы сохранить его\nна своем устройстве.',
      prompt_open: 'Загрузить этот файл?'
   },

   extra: {
      credits: [
         [
            '§fill=#ff0§< СОЗДАТЕЛЬ >§fill=#fff§',
            'spacey_432',
            '',
            '§fill=#ff0§< ПИСАТЕЛЬ >§fill=#fff§',
            'Balgamlı Kedi',
            'Bilge \"mnwary\"',
            'Обеденный стол',
            'Efe Kaya',
            'Ghostly',
            'InvincibleRacoon',
            'Jojoton56',
            'Kiwi \"Quinn\"',
            'Моя Астор.',
            'neo9174',
            'Rise'
         ],
         [
            '§fill=#ff0§< ПИСАТЕЛЬ >§fill=#fff§',
            'ThatGuyWhoLikesFood',
            'Turbulation',
            'Zaxento The Greedy',
            '',
            '§fill=#ff0§< ХУДОЖНИК >§fill=#fff§',
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
            '§fill=#ff0§< ХУДОЖНИК >§fill=#fff§',
            'HolyOranges',
            'major_memestar',
            'MattSpriteMaster',
            'Medi0creking',
            'NerNot1',
            'PhyreFM',
            'Pongy25',
            'По Зимней границе',
            'ProctorDorkchop02',
            'Алый чешуйчатый дракон',
            'полу',
            'Soup Taels',
            'Волнистый, извивающийся',
            'Starkiteckt'
         ],
         [
            '§fill=#ff0§< ХУДОЖНИК >§fill=#fff§',
            'supper12',
            'Valor52',
            'Zaxento The Greedy',
            '',
            '§fill=#ff0§< СПЕЦИАЛИСТ >§fill=#fff§',
            'Codetoil',
            'Ryi3r',
            'ws3917',
            '',
            '§fill=#ff0§< ТЕСТЕР >§fill=#fff§',
            'Alden',
            'Aspey',
            'Balgamlı Kedi',
            'Bilge \"mnwary\"'
         ],
         [
            '§fill=#ff0§< ТЕСТЕР >§fill=#fff§',
            'Синий',
            'Brad',
            'brayjamin',
            'ClamsyMoe',
            'Дельта',
            'Discarded Vessel',
            'Обеденный стол',
            'DR4GON HE4RT',
            'Dubituar',
            'Efe Kaya',
            'Emurry',
            'Enzolos',
            'EvanGamesGoodman',
            'Fired'
         ],
         [
            '§fill=#ff0§< ТЕСТЕР >§fill=#fff§',
            'FireWizard72X',
            'FuLiNT',
            'Funtermore',
            'gardnaeden',
            'Ghostly',
            'Gon UT',
            'Зелёный Чай',
            'Обнимашки!',
            'ilovecookies',
            'InvincibleRacoon',
            'Jago128',
            'Joe98912',
            'Jojoton56',
            'Jonkler'
         ],
         [
            '§fill=#ff0§< ТЕСТЕР >§fill=#fff§',
            'Kiwi \"Quinn\"',
            'Тански, Лил',
            'Мистер Питер.',
            'Мсбен',
            'Убийство - Sans MDR',
            'Моя Астор.',
            'Нанорасмус',
            'neo9174',
            'Непал',
            'полу',
            'Шон Дуз Стаффс',
            'ШКьянк',
            'NerNot1',
            'Пайта 3644'
         ],
         [
            '§fill=#ff0§< ТЕСТЕР >§fill=#fff§',
            'Пиксель Тоонс Джаафар',
            'Пресмоп',
            'Праймус АГД',
            'Квин.',
            'Радикальный Рик',
            'Рэйлин.',
            'Попробуйте 22800',
            'Rise',
            'RoCtD 14159',
            'Sonicisawesome 222',
            'Soup Taels',
            'Космический нож 234',
            'Волнистый, извивающийся',
            'Суперкиппи'
         ],
         [
            '§fill=#ff0§< ТЕСТЕР >§fill=#fff§',
            'Текуп',
            'Тема в ковбойской шляпе',
            'Тембрукс',
            'ThatGuyWhoLikesFood',
            'Падший ангел',
            'Асриль',
            'Turbulation',
            'Дикая Италия',
            'Маленький Кацуки',
            'XNoodlePlayz',
            'Zaxento The Greedy'
         ],
         [
            '§fill=#ff0§< ОСОБАЯ БЛАГОДАРНОСТЬ >§fill=#fff§',
            'Alden',
            '§fill=#808080§За то, что был рядом со мной,\nкогда я нуждался в поддержке, и\nпреподал мне жизненные уроки,\nкоторые сделали меня лучше.§fill=#fff§'
         ],
         [
            '§fill=#ff0§< ОСОБАЯ БЛАГОДАРНОСТЬ >§fill=#fff§',
            'Моя Астор.',
            '§fill=#808080§За то что ты один из \nсамых приветливых людей которых я знаю,\nверу в моё виденье и вдохновение завершить игру.§fill=#fff§'
         ],
         [
            '§fill=#ff0§< ОСОБАЯ БЛАГОДАРНОСТЬ >§fill=#fff§',
            'Balgamlı Kedi',
            "Он всегда там помогает. § fill = # fff §"
         ],
         [
            '§fill=#ff0§< ОСОБАЯ БЛАГОДАРНОСТЬ >§fill=#fff§',
            'Ghostly',
            'Тщательное тестирование. § fill = # fff §'
         ],
         [
            '§fill=#ff0§< ОСОБАЯ БЛАГОДАРНОСТЬ >§fill=#fff§',
            'Zaxento The Greedy',
            'С того дня, как мы встретились, мы заслужили доверие. § fill = # fff §'
         ],
         [
            '§fill=#ff0§< ОСОБАЯ БЛАГОДАРНОСТЬ >§fill=#fff§',
            'ThatGuyWhoLikesFood',
            'Я по - новому. § fill = # fff §'
         ],
         [
            '§fill=#ff0§< ОСОБАЯ БЛАГОДАРНОСТЬ >§fill=#fff§',
            'Bilge \"mnwary\"',
            "Полностью реализовать свой потенциал. § fill = # fff §"
         ],
         [ 'От § fill = # ff0 § The Mavis & Co. для вас § fill = # fff §' ]
      ],

      final_frontier: {
         header: '((Актерский состав)',
         opponents: {
            froggit: {
               name: '* ФРОГГИТ',
               author: 'Алый чешуйчатый дракон',
               text: {
                  basic: 'Жизнь',
                  spare: 'Лягушка',
                  flirt: 'Любовь',
                  bully: 'Страх'
               }
            },
            whimsun: {
               name: '* Трепетун',
               author: 'Алый чешуйчатый дракон',
               text: {
                  basic: 'Лети.',
                  spare: 'Пилоты',
                  flirt: 'Небо',
                  bully: 'Мобильность'
               }
            },
            moldsmal: {
               name: '* желатин',
               author: 'spacey_432',
               text: {
                  basic: 'Космическая станция',
                  spare: 'Танцоры',
                  flirt: 'Танцоры',
                  bully: 'Галактика'
               }
            },
            loox: {
               name: '* Окулус',
               author: 'Алый чешуйчатый дракон',
               text: {
                  basic: 'Понравилось издеваться',
                  spare: 'Угрозы',
                  flirt: 'легкомысленный',
                  bully: ''
               }
            },
            migosp: {
               name: '* Силенте',
               author: 'Алый чешуйчатый дракон',
               text: {
                  basic: 'Согласен.',
                  spare: 'Наслаждайтесь жизнью',
                  flirt: 'Афар',
                  bully: 'Даниэль.'
               }
            },
            mushy: {
               name: '* Мушка',
               author: 'Скачать Balgamlı Kedi & ScarletScaledDragon',
               text: {
                  basic: 'Одеяло',
                  spare: 'Волшебник.',
                  flirt: 'Тромб сердца',
                  bully: 'Молитва.'
               }
            },
            finalghost: {
               name: 'ЛУРКСАЛОТ',
               author: 'spacey_432',
               text: {
                  basic: 'Они сами.',
                  spare: 'Физический контакт',
                  flirt: 'Не участвовать',
                  bully: ''
               }
            },
            stardrake: {
               name: '* Стардрейк',
               author: 'Burge',
               text: {
                  basic: 'Для смеха',
                  spare: 'Комедианты',
                  flirt: 'Взрослые',
                  bully: ''
               }
            },
            chilldrake: {
               name: '* Чилдрейк',
               author: 'Burge',
               text: {
                  basic: 'Для сторонников',
                  spare: 'Ниже приводится',
                  flirt: 'Для сторонников',
                  bully: 'Активисты'
               }
            },
            spacetop: {
               name: '* Астро Серф',
               author: 'DESM.al',
               text: {
                  basic: 'Его антенна',
                  spare: 'Чувство',
                  flirt: 'Воздух',
                  bully: 'Радиовещательная компания'
               }
            },
            jerry: {
               name: 'Джерри.',
               author: 'Discarded Vessel',
               text: {
                  basic: 'The Daily Mail',
                  spare: 'Немного меньше.',
                  flirt: 'Выкуп.',
                  bully: ''
               }
            },
            mouse: {
               name: '* Визкарат',
               author: 'Жадность и наполовину',
               text: {
                  basic: 'Кризис идентичности',
                  spare: 'Общество крыс',
                  flirt: '& Мыши',
                  bully: 'Общество кошек'
               }
            },
            doggo: {
               name: '* Догго',
               author: 'Discarded Vessel',
               text: {
                  basic: 'Всемогущий ключ',
                  spare: 'Увидеть глаза волка',
                  flirt: 'Увидеть глаза волка',
                  bully: 'Увидеть глаза волка'
               }
            },
            lesserdog: {
               name: '* Малый Пёс',
               author: 'major_memestar',
               text: {
                  basic: 'Эмоции',
                  spare: 'Владелец',
                  flirt: 'Любовник.',
                  bully: 'Эмоции'
               }
            },
            dogs: {
               name: 'Догами и Догареса',
               author: 'major_memestar',
               text: {
                  basic: 'О компании Fetch',
                  spare: 'Чемпион по глазам',
                  flirt: "Взгляд других",
                  bully: 'Обручение глаз собаки'
               }
            },
            greatdog: {
               name: '* Большой Пёс',
               author: 'major_memestar',
               text: {
                  basic: "Жизнь меняется.",
                  spare: "Жизнь меняется.",
                  flirt: "Жизнь меняется.",
                  bully: ''
               }
            },
            woshua: {
               name: '* Скрубингтон',
               author: 'Discarded Vessel',
               text: {
                  basic: 'Процент чистоты',
                  spare: 'Здание электростанции',
                  flirt: 'Производитель',
                  bully: 'стиральная машина высокого давления'
               }
            },
            moldbygg: {
               name: '* Гелата',
               author: 'spacey_432',
               text: {
                  basic: 'Детская няня',
                  spare: 'Барный стул',
                  flirt: 'Обычный',
                  bully: 'Борьба с опорой'
               }
            },
            radtile: {
               name: ':: Радиоактивные материалы',
               author: 'Balgamlı Kedi & Zaxento - Жадность',
               text: {
                  basic: 'Несовершенство.',
                  spare: 'Самообразие',
                  flirt: 'Размышления',
                  bully: 'Уродливое будущее'
               }
            },
            shyren: {
               name: '* Хирон',
               author: 'Ghostly',
               text: {
                  basic: 'Уроки фортепиано',
                  spare: "Новый вокалист",
                  flirt: 'Призрак.',
                  bully: "Синтезатор"
               }
            },
            doge: {
               name: '* Щенок',
               author: 'major_memestar',
               text: {
                  basic: 'Инструкторы',
                  spare: 'Спа - пакеты',
                  flirt: 'Впервые',
                  bully: ''
               }
            },
            muffet: {
               name: '* Маффины',
               author: 'major_memestar',
               text: {
                  basic: 'Следующий платеж',
                  spare: 'Пауки',
                  flirt: 'Лунный старость',
                  bully: ''
               }
            },
            pyrope: {
               name: '* Горячая линия',
               author: 'полу',
               text: {
                  basic: 'Ударь.',
                  spare: 'Хищные птицы',
                  flirt: 'Любовные писатели',
                  bully: 'На грани смерти'
               }
            },
            tsundere: {
               name: '* Синдрекс',
               author: 'spacey_432',
               text: {
                  basic: 'Отрицание',
                  spare: 'Ты на кривой скорости.',
                  flirt: 'Твои права.',
                  bully: 'Это соревнование.'
               }
            },
            perigee: {
               name: '* Перигей',
               author: 'Discarded Vessel',
               text: {
                  basic: 'Еще один конфликт',
                  spare: 'Посол',
                  flirt: 'В других',
                  bully: 'Через боль'
               }
            },
            rg: {
               name: 'RG 03 и RG 04',
               author: 'полу',
               text: {
                  basic: 'Друзья детства',
                  spare: 'Воображение',
                  flirt: 'Воображение',
                  bully: 'Пенсионеры'
               }
            },
            glyde: {
               name: 'Грэд!',
               author: 'Burge',
               text: {
                  basic: 'Оперативные партнеры',
                  spare: 'Темнее, чем обычно',
                  flirt: 'Бедферро',
                  bully: ''
               }
            },
            burgie: {
               name: 'Воры.',
               author: 'Pongy25',
               text: {
                  basic: 'В будущей жизни',
                  spare: 'Жизнь в будущее',
                  flirt: 'В будущей жизни',
                  bully: ''
               }
            },
            madjick: {
               name: '* Козмо',
               author: 'полу',
               text: {
                  basic: 'Словарь',
                  spare: 'Волшебник.',
                  flirt: 'Магия',
                  bully: ''
               }
            },
            knightknight: {
               name: '* Террестрия',
               author: 'major_memestar',
               text: {
                  basic: 'В прошлом.',
                  spare: 'Историки',
                  flirt: 'Дом',
                  bully: ''
               }
            },
            froggitex: {
               name: '* Последняя лягушка',
               author: 'По Зимней границе',
               text: {
                  basic: 'Сама мудрость',
                  spare: 'Мудрость открыто',
                  flirt: 'Ради любви',
                  bully: 'Чтобы выжить'
               }
            },
            whimsalot: {
               name: '* Флуттеркнит',
               author: 'spacey_432',
               text: {
                  basic: 'Каждый день.',
                  spare: 'Отдохни.',
                  flirt: 'Частное время',
                  bully: 'Из страха'
               }
            },
            astigmatism: {
               name: '* Eyewalker Prime',
               author: 'полу',
               text: {
                  basic: 'Остался\nБольшим задирой',
                  spare: 'Офтальмолог',
                  flirt: 'Кожаный портной',
                  bully: 'Глаз дьявола'
               }
            },
            migospel: {
               name: '* Силенсио',
               author: 'Balgamlı Kedi',
               text: {
                  basic: 'Бесстыдный трус.',
                  spare: 'Трус.',
                  flirt: 'Это страх.',
                  bully: 'Больше, чем когда - либо'
               }
            },
            mushketeer: {
               name: ':: Мушкеттер',
               author: 'Balgamlı Kedi & Призрак',
               text: {
                  basic: 'Армия',
                  spare: 'В поисках мира',
                  flirt: 'Сила любви.',
                  bully: 'Боится\nСилы'
               }
            }
         },
         swords: {
            papyrus: {
               name: 'ПАПИРУС',
               author: 'ProctorDorkchop02 и MattSpriteMaster'
            },
            sans: {
               name: 'САНС',
               author: 'Прокурор Dorkchop02 & уволен'
            },
            undyne: {
               name: 'АНДАЙН',
               author: 'major_memestar'
            },
            alphys: {
               name: 'АЛЬФИС',
               author: 'major_memestar'
            },
            mewmew: {
               name: 'МЯУ МЯУ',
               author: 'spacey_432'
            },
            napstablook: {
               name: 'НАБСТАБЛУК',
               author: 'spacey_432'
            },
            mettaton: {
               name: 'МЕТТАТОН',
               author: 'MattSpriteMaster'
            },
            toriel: {
               name: 'ТОРИЭЛЬ',
               author: 'MattSpriteMaster'
            },
            asgore: {
               name: 'АЗГОР',
               author: 'MattSpriteMaster'
            },
            monsterkid: {
               name: 'МОНСТРЁНОК',
               author: 'spacey_432'
            },
            asriel: {
               name: 'АЗРИЭЛЬ',
               author: 'Medi0creking и MattSpriteMaster'
            }
         }
      },

      langPrompt: '[↑ или ↓] чтобы Выбрать / [Z или ENTER] чтобы Подтвердить',
      epilepsyInfo:
         '§ fill = # ff0 § Меню Настройки § fill = # fff §.',
      epilepsyKeys: '§ fill = # 80080 § Нажмите [Z или ENTER] Продолжить',

      quitText1: 'Выходим',
      quitText2: 'Выходим.',
      quitText3: 'Выходим..',

      real1: [
         [
            'Спасибо за то, что сыграли в Outertale.',
            'Работа над этим проектом была для меня большой честью,',
            'и с удовольствием с моей стороны.'
         ],
         [ 'Когда я начинал это приключение, я никогда', "Не думал, что заберусь так далеко, но вот мы", 'в любом случае, в конце.' ],
         [
            'Для меня UNDERTALE стал судьбоносным.',
            'опыт, который было очень трудно',
            'после того, как я впервые сыграл в нее.'
         ],
         [
            'Поэтому, создавая «OUTERTALE», я хотел дать тебе',
            'еще один шанс на существование в мире, подобном этому,',
            'как будто это твой первый раз.'
         ],
         [
            "Надеюсь, я дал тебе этот шанс.",
            "Я надеюсь, что ты остался доволен",
            "время, проведенное в этом мире."
         ],
         [
            "Неважно, что ты сделал в своей жизни,",
            'твои действия здесь говорят о том',
            'каким человеком ты на самом деле являешься.'
         ],
         [
            "Это благодаря тебе ты получил концовку",
            'ты сделал это, и ничто не может это отменить',
            'опыт, который ты отнимаешь у себя.'
         ],
         [ 'Несмотря на ошибки... ты потрясающий,', 'и ты заслуживаешь любви и внимания.', 'Помни это, хорошо?' ]
      ],
      real2: 'Береги себя, «$(x)».',

      end1: 'КОНЕЦ',
      end2: 'КОНЕЦ...?',

      restartText1: 'Перезапуск',
      restartText2: 'Перезапуск.',
      restartText3: 'Перезапуск..',

      title: 'OUTERTALE',
      title_timeline: 'OUTERTALE...?'
   },

   gamepad: {
      prompt: 'НАСТРОЙКА КНОПОК',
      prompt_desc:
         'Нажмите кнопку на геймпаде чтобы настроить\nеё под действие в игре.\n\nНажмите кнопку снова для подтверждения,\nили нажмите другие кнопки чтобы их тоже настроить.\n\nНажмите ESC чтобы пропустить настройку.',
      prompt_counter: 'Выбранное Управление: $(x)',
      z: '[Z или ENTER] - Подтвердить',
      x: '[X или SHIFT] - Отменить',
      c: '[C или CTRL] - Меню (В игре)',
      u: '[UP или W] - Вверх',
      l: '[LEFT или A] - Влево',
      d: '[DOWN или S] - Вниз',
      r: '[RIGHT or D] - Вправо',
      f: '[F4] - Полный экран',
      prompt_done: 'Настройка завершена.\nНажмите любую кнопку чтобы продолжить.',
      prompt_done_browser: '\nПримечание: На этой платформе, геймпад не\nвсегда сможет входить в Полный экран.',
      prompt_load:
         'Геймпад уже был настроен.\nНажмите любую кнопку чтобы продолжить, или\nнажмите любую кнопку три раза подряд\nчтобы перезапустить настройку.\n\nНажмите ESC чтобы пропустить настройку.'
   },

   general: {
      asriel: 'Азриель',
      asriel_location: 'Забвение',
      disabled: 'ВЫКЛЮЧЕНЫ',
      enabled: 'ВКЛЮЧЕНЫ',
      finish: 'Нажмите [X] чтобы Завершить',
      frisk: 'Фриск',
      g: 'З',
      hp: 'ОЗ',
      inf: 'БЕСК.',
      landing1: '[НАЖМИТЕ Z ИЛИ ENTER]',
      lv: 'УР',
      mystery1: '§mystify=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz§aaaaaa§mystify=§',
      mystery2: '{@mystify=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz}aaaaaa{@mystify=}',
      mystery2l: '{@mystify=abcdefghijklmnopqrstuvwxyz}aaaaaa{@mystify=}',
      mystery2u: '{@mystify=ABCDEFGHIJKLMNOPQRSTUVWXYZ}aaaaaa{@mystify=}',
      no: 'Нет',
      nominal: '§fill=#0f0§НОМИНАЛ',
      percent: '$(x)%',
      player: 'игрок',
      settings: 'Настройки',
      unknown: '?',
      xm: 'ЭВ',
      yes: 'Да'
   },

   menu: {
      box1: 'ИНВЕНТАРЬ',
      box2: 'КОРОБКА',
      key1: 'БРЕЛОК',

      confirm1: 'Это верное имя?',
      confirm2: 'Имя уже было выбрано.',
      confirm3: 'Назад',

      footer: 'OUTERTALE V5.04 (c) 2024 SPACEY_432',

      heal1: '* (ОЗ полностью восстановлено.)',
      heal2: '* (Вы восстановили $(x) ОЗ.)',
      heal3: '* (Вы потеряли $(x) ОЗ.)',
      heal4: '* (ОЗ полностью утрачено.)',
      heal5: '* (Вы получили $(x) ОЗ.)',

      item1: 'ИСП',
      item2: 'ОСНАСТИТЬ',
      item3: 'ИНФО',
      item4: 'ВЫБРОС',

      load1: 'Продолжить',
      load2: 'Наблюдать',
      load3: 'Сброс',
      load4: 'Истинный Сброс',

      name1: 'Назовите застрявшего человека.',
      name2: 'Выйти',
      name3: 'Удалить',
      name4: 'Готово',
      name5: '§fill=#808080§ [ESC] - Выйти / [ENTER] - Готово',

      save1: 'Сохранить',
      save2: 'Назад',
      save3: 'Файл сохранён.',

      settings1: 'НАСТРОЙКИ',
      settings2: 'ВЫЙТИ',
      settings3: 'ЯЗЫК',
      settings3a: 'РУССКИЙ',
      settings4: 'ЗВУКОВЫЕ ЭФФЕКТЫ',
      settings5: 'МУЗЫКА',
      settings6: 'СПЕЦ. ЭФФЕКТЫ',
      settings7: 'МИГАЮЩИЕ ИЗОБРАЖЕНИЯ',
      settings7a: 'ОБЫЧНЫЕ',
      settings7b: 'УМЕНЬШЕННЫЕ',
      settings8: 'СЕНСОРНОЕ УПРАВЛЕНИЕ',
      settings8a: 'СЛЕВА',
      settings8b: 'СПРАВА',
      settings8c: 'СКРЫТЫ',
      settings9: 'МЁРТВАЯ ЗОНА',
      settings10: 'ОТКРЫТЬ ПАПКУ МОДОВ',
      settings11: 'ПЕРЕЗАГРУЗКА',

      sidebar1: 'ВЕЩИ',
      sidebar2: 'СТАТ',
      sidebar3: 'ТЕЛ',
      sidebar4: 'КОНФ',
      sidebar5: 'S',

      start1: [
         '--- Инструкция ---',
         '[Z или ENTER] - Подтвердить',
         '[X или SHIFT] - Отменить',
         '[C или CTRL] - Меню (В игре)',
         '[F4] - Полный экран',
         '[Зажать ESC] - Перезагрузка',
         'Когда ОЗ будет на нуле, вы проиграете.'
      ],
      start2: 'Начать Игру',

      stat1: 'АТ',
      stat2: 'ЗЩ',
      stat3: 'ОРУЖИЕ',
      stat4: 'БРОНЯ',
      stat5: 'ЗОЛОТО',
      stat6: 'ОП',
      stat7: 'СЛЕД',
      stat8: '§fill=#ff0§Внимание:\nНе-каноничная\nлиния времени.',
      stat9: 'УБИТО',
      stat10: 'ЗАПУГАНО',
      stat11: 'ФЛИРТЫ',
      stat12: 'СТАТУС',
      stat13: '\"$(x)\"',

      story1: [ '<24>{#p/storyteller}Давным-давно, два вида правили солнечной системой: ЛЮДИ и МОНСТРЫ.{^35}{}' ],
      story2: [ '<24>Со временем, между ними разрослась война.{^35}{}' ],
      story3: [ "<24>Когда родная планета МОНСТРОВ была уничтожена, ЛЮДИ объявили победу.{^35}{}" ],
      story4: [ '<24>Оставшихся МОНСТРОВ изгнали на заброшенный аванпост.{^35}{}' ],
      story5: [ '<24>Мощный силовой барьер был возведён, и МОНСТРОВ запечатали в нём.{^35}{}' ],
      story6: [ '<24>Много лет спустя.{^8}.{^8}.{^35}{}' ],
      story7: [ '<#24>     СЕКТОР ЭБОТТ     \n         251X{^35}{}' ],
      story8: [ '<24>Легенды гласят, что космические корабли никогда не возвращаются оттуда.{^35}{}' ],
      story9: [ '<24>{^100}{}' ],
      story10: [ '<24>{^100}{}' ],
      story11: [ '<24>{^35}{}' ]
   },

   timeline: {
      main: 'Продолжить Каноничный Таймлайн',
      main_ex: 'Начать Каноничный Таймлайн',
      timelines: 'Другие Слоты',
      bisect: 'Создать',
      delete: 'Удал.',
      instruction: '[ESC] чтобы отменить / [ENTER] чтобы подтвердить',
      instruction_gamepad: 'Нажмите любую клавишу на геймпаде, чтобы открыть клавиатуру.',
      launch: 'Запуск',
      rename: 'Имя',
      create: 'Создать новый',
      placeholder: 'Введите имя таймлайна',
      confirm: 'Вы уверены?'
   }
};


// END-TRANSLATE
