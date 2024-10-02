import commonText from '../../languages/default/text/common';
import text from '../../languages/default/text/starton';
import { faces, quickCall } from '../common/api';
import { content, context, soundOpts, soundRouter, sounds } from '../systems/assets';
import { atlas, game, items, keys, maps, renderer, rooms, speech } from '../systems/core';
import { battler, easyRoom, keyring, phone, portraits, saver, shake } from '../systems/framework';
import { OutertaleMap, OutertaleSpeechPreset } from '../systems/outertale';
import { SAVE } from '../systems/save';
import {
   CosmosAnimation,
   CosmosDaemon,
   CosmosDirection,
   CosmosImage,
   CosmosNavigator,
   CosmosObject,
   CosmosSprite,
   CosmosUtils
} from '../systems/storyteller';
import { translator } from '../systems/translator';

import imStarton$info from '../../assets/images/maps/starton.json?url';
import imStarton from '../../assets/images/maps/starton.png?url';

import s_backrooms from '../../rooms/s_backrooms.json';
import s_battle from '../../rooms/s_battle.json';
import s_beddinng from '../../rooms/s_beddinng.json';
import s_bonehouse from '../../rooms/s_bonehouse.json';
import s_bridge from '../../rooms/s_bridge.json';
import s_bros from '../../rooms/s_bros.json';
import s_capture from '../../rooms/s_capture.json';
import s_crossroads from '../../rooms/s_crossroads.json';
import s_doggo from '../../rooms/s_doggo.json';
import s_dogs from '../../rooms/s_dogs.json';
import s_exit from '../../rooms/s_exit.json';
import s_greater from '../../rooms/s_greater.json';
import s_grillbys from '../../rooms/s_grillbys.json';
import s_human from '../../rooms/s_human.json';
import s_innterior from '../../rooms/s_innterior.json';
import s_jenga from '../../rooms/s_jenga.json';
import s_lesser from '../../rooms/s_lesser.json';
import s_librarby from '../../rooms/s_librarby.json';
import s_math from '../../rooms/s_math.json';
import s_maze from '../../rooms/s_maze.json';
import s_pacing from '../../rooms/s_pacing.json';
import s_papyrus from '../../rooms/s_papyrus.json';
import s_papyrusroom from '../../rooms/s_papyrusroom.json';
import s_puzzle1 from '../../rooms/s_puzzle1.json';
import s_puzzle2 from '../../rooms/s_puzzle2.json';
import s_puzzle3 from '../../rooms/s_puzzle3.json';
import s_robot from '../../rooms/s_robot.json';
import s_sans from '../../rooms/s_sans.json';
import s_sanscloset from '../../rooms/s_sanscloset.json';
import s_sansroom from '../../rooms/s_sansroom.json';
import s_secret from '../../rooms/s_secret.json';
import s_spaghetti from '../../rooms/s_spaghetti.json';
import s_start from '../../rooms/s_start.json';
import s_taxi from '../../rooms/s_taxi.json';
import s_town1 from '../../rooms/s_town1.json';
import s_town2 from '../../rooms/s_town2.json';

export const startonMap = new OutertaleMap(imStarton$info, new CosmosImage(imStarton));
startonMap.name = 'maps::starton';

export const navscript = {
   enable (
      handler = (handler: CosmosDirection | 'next' | 'prev') => {},
      grid = [] as any[][],
      objects = [] as CosmosObject[]
   ) {
      navscript.state = { grid, handler, objects };
   },
   disable () {
      navscript.state = { grid: [], handler: () => {}, objects: [] };
   },
   get position () {
      return atlas.navigators.of('navscript').position;
   },
   state: {
      grid: [] as any[][],
      handler: (input: CosmosDirection | 'next' | 'prev') => {},
      objects: [] as CosmosObject[]
   },
   get value () {
      return atlas.navigators.of('navscript').selection();
   }
};

atlas.navigators.register({
   navscript: new CosmosNavigator({
      grid: () => navscript.state.grid,
      next: () => void navscript.state.handler('next'),
      prev: () => void navscript.state.handler('prev'),
      objects: [
         new CosmosObject().on('tick', function () {
            this.objects = navscript.state.objects;
         })
      ]
   })
      .on('from', () => atlas.attach(renderer, 'main', 'navscript'))
      .on('to', () => atlas.detach(renderer, 'main', 'navscript'))
});

battler.weapons.register({
   glove: {
      async animation (index, critted, accuracy, base, half, hitbar) {
         battler.hitbar1(hitbar);
         let punches = 0;
         let expired = false;
         let resolved = 0;
         const deadcenter = base.add(half);
         const timeout = renderer.pause(2000).then(() => (expired = true));
         while (!expired && punches < 4) {
            const huge = ++punches === 4;
            let dis = !huge;
            const pressz = new CosmosSprite({
               active: true,
               frames: [ content.ibuPressz, null ],
               duration: 15,
               anchor: 0,
               position: deadcenter,
               scale: 1 / 4
            });
            renderer.attach(
               'menu',
               new CosmosAnimation({
                  active: true,
                  anchor: 0,
                  scale: 0.5,
                  position: deadcenter.add(
                     huge ? 0 : half.multiply(Math.random() * 2, Math.random() * 2).subtract(half)
                  ),
                  resources: huge ? content.ibuFist2 : content.ibuFist1
               }).on(
                  'tick',
                  (() => {
                     let selfresolve = false;
                     return function () {
                        this.position = this.position.add(Math.random() * 2 - 1, Math.random() * 2 - 1);
                        if (!selfresolve && this.index === (huge ? 3 : 2)) {
                           selfresolve = true;
                           resolved++;
                        } else if (this.index === 4 && this.step === this.duration - 1) {
                           renderer.detach('menu', this);
                           dis && renderer.attach('menu', pressz);
                        }
                     };
                  })()
               )
            );
            huge ? sounds.punch2.instance(renderer) : sounds.punch1.instance(renderer);
            if (huge) {
               shake(2, 600);
            } else {
               await Promise.race([ timeout, keys.interactKey.on('down') ]);
               renderer.detach('menu', pressz);
               dis = false;
            }
         }
         battler.attackMultiplier = punches / 4;
         await renderer.when(() => resolved === punches);
      },
      targets: 1,
      speed: 1,
      crit: 2.4
   },
   glove_x: {
      async animation (index, critted, accuracy, base, half, hitbar) {
         battler.hitbar1(hitbar);
         let punches = 0;
         let expired = false;
         let resolved = 0;
         const deadcenter = base.add(half);
         const timeout = renderer.pause(1000).then(() => (expired = true));
         while (!expired && punches < 4) {
            const huge = ++punches === 4;
            renderer.attach(
               'menu',
               new CosmosAnimation({
                  active: true,
                  anchor: 0,
                  scale: 0.5,
                  position: deadcenter.add(
                     huge ? 0 : half.multiply(Math.random() * 2, Math.random() * 2).subtract(half)
                  ),
                  resources: huge ? content.ibuFist2 : content.ibuFist1
               }).on(
                  'tick',
                  (() => {
                     let selfresolve = false;
                     return function () {
                        this.position = this.position.add(Math.random() * 2 - 1, Math.random() * 2 - 1);
                        if (!selfresolve && this.index === (huge ? 3 : 2)) {
                           selfresolve = true;
                           resolved++;
                        } else if (this.index === 4 && this.step === this.duration - 1) {
                           renderer.detach('menu', this);
                        }
                     };
                  })()
               )
            );
            huge ? sounds.punch2.instance(renderer) : sounds.punch1.instance(renderer);
            if (huge) {
               shake(2, 600);
            }
            await Promise.race([ timeout, keys.interactKey.on('down') ]);
         }
         battler.attackMultiplier = punches / 4;
         await renderer.when(() => resolved === punches);
      },
      targets: 1,
      speed: 1,
      crit: 2.2
   }
});

items.register('chip', { type: 'consumable', value: 45, sell1: 1, sell2: 1, text: text.i_chip });
items.register('fruit', {
   type: 'consumable',
   value: 15,
   sell1: 25,
   sell2: 12,
   text: text.i_fruit,
   healSFX: sounds.spooky
});
items.register('nice_cream', { type: 'consumable', value: 15, sell1: 40, sell2: 15, text: text.i_nice_cream });
items.register('spaghetti', { type: 'consumable', value: 16, sell1: 150, sell2: 75, text: text.i_spaghetti });
items.register('berry', { type: 'consumable', value: 7, sell1: 20, sell2: 8, text: text.i_berry });
items.register('pop', { type: 'consumable', value: 11, sell1: 20, sell2: 28, text: text.i_pop });
items.register('glove', { type: 'weapon', value: 5, sell1: 15, sell2: 40, text: text.i_glove, useSFX: true });
items.register('glove_x', { type: 'weapon', value: 3, sell1: 15, sell2: 30, text: text.i_glove_x, useSFX: true });
items.register('eye', { type: 'armor', value: 7, sell1: 15, sell2: 40, text: text.i_eye, useSFX: true });
items.register('eye_x', { type: 'armor', value: 5, sell1: 15, sell2: 30, text: text.i_eye_x, useSFX: true });
items.register('swirl', { type: 'consumable', value: 22, sell1: 20, sell2: 20, text: text.i_swirl });
items.register('milkshake', {
   type: 'consumable',
   value: 18,
   sell1: 80,
   sell2: 16,
   text: text.i_milkshake,
   healSFX: sounds.spooky
});

items.register('voidy', { type: 'special', value: 0, sell1: 8, sell2: 800, text: text.i_voidy, useSFX: true });
items.register('blookpie', {
   type: 'consumable',
   value: 99,
   sell1: 40,
   sell2: 100,
   text: text.i_blookpie,
   healSFX: sounds.spooky
});
items.register('corndog_sword', {
   type: 'special',
   value: 0,
   sell1: Infinity,
   sell2: Infinity,
   text: text.i_corndog_sword,
   useSFX: true
});
items.register('fryz', { type: 'consumable', value: 30, sell1: 80, sell2: 20, text: text.i_fryz });
items.register('burgerz', { type: 'consumable', value: 15, sell1: 15, sell2: 30, text: text.i_burgerz });
items.register('burgerz_use1', { type: 'consumable', value: 15, sell1: 10, sell2: 20, text: text.i_burgerz_use1 });
items.register('burgerz_use2', { type: 'consumable', value: 15, sell1: 5, sell2: 10, text: text.i_burgerz_use2 });

keyring.register('premium', {
   description: () => text.k_premium.description(),
   name: () => text.k_premium.name,
   priority: 1,
   display () {
      return SAVE.data.b.voucher;
   }
});

keyring.register('inverter', {
   description: () => text.k_inverter.description(),
   name: () => text.k_inverter.name,
   priority: 5,
   display () {
      return SAVE.data.b.inverter_key;
   }
});

keyring.register('security', {
   description: () => text.k_security.description(),
   name: () => text.k_security.name,
   priority: 0,
   display () {
      return SAVE.data.b.s_state_capstation;
   }
});

maps.register('starton', startonMap);

phone.register('papyrus', {
   display () {
      return !SAVE.data.b.freedom && SAVE.data.n.plot_date > 0.2 && !SAVE.data.b.ultrashortcut;
   },
   priority: 2.2,
   async trigger () {
      SAVE.flag.b._call = true;
      if ([ 'f_truth', 'f_village', 'a_offshoot2', 'a_sleeping2', 'a_sleeping3' ].includes(game.room)) {
         quickCall(false, ...commonText.c_call_common.nobody0);
      } else if (SAVE.data.n.plot === 72 || (2 <= SAVE.data.n.plot_date && SAVE.data.n.exp > 0)) {
         quickCall(false, ...commonText.c_call_common.nobody3);
      } else {
         const papytext = CosmosUtils.provide(text.c_call_papyrus[game.room] ?? []);
         const real = papytext.length !== 0;
         if (real) {
            if (
               SAVE.data.n.plot < 71.2 &&
               (SAVE.data.n.plot < 68.1 || SAVE.data.b.a_state_hapstablook || SAVE.data.n.plot_date < 2)
            ) {
               quickCall(true, ...papytext);
            } else {
               quickCall(false, ...commonText.c_call_common.nobody1);
            }
         } else {
            quickCall(false, ...commonText.c_call_common.nobody3);
         }
      }
   },
   name: () => text.c_name_starton.papyrus()
});

portraits.register(faces);

export const startonRooms = {
   s_start: easyRoom('s_start', startonMap, s_start),
   s_sans: easyRoom('s_sans', startonMap, s_sans),
   s_crossroads: easyRoom('s_crossroads', startonMap, s_crossroads),
   s_human: easyRoom('s_human', startonMap, s_human),
   s_papyrus: easyRoom('s_papyrus', startonMap, s_papyrus),
   s_doggo: easyRoom('s_doggo', startonMap, s_doggo),
   s_robot: easyRoom('s_robot', startonMap, s_robot),
   s_maze: easyRoom('s_maze', startonMap, s_maze),
   s_dogs: easyRoom('s_dogs', startonMap, s_dogs),
   s_lesser: easyRoom('s_lesser', startonMap, s_lesser),
   s_spaghetti: easyRoom('s_spaghetti', startonMap, s_spaghetti),
   s_bros: easyRoom('s_bros', startonMap, s_bros),
   s_puzzle1: easyRoom('s_puzzle1', startonMap, s_puzzle1),
   s_puzzle2: easyRoom('s_puzzle2', startonMap, s_puzzle2),
   s_jenga: easyRoom('s_jenga', startonMap, s_jenga),
   s_pacing: easyRoom('s_pacing', startonMap, s_pacing),
   s_puzzle3: easyRoom('s_puzzle3', startonMap, s_puzzle3),
   s_greater: easyRoom('s_greater', startonMap, s_greater),
   s_math: easyRoom('s_math', startonMap, s_math),
   s_secret: easyRoom('s_secret', startonMap, s_secret),
   s_bridge: easyRoom('s_bridge', startonMap, s_bridge),
   s_town1: easyRoom('s_town1', startonMap, s_town1),
   s_innterior: easyRoom('s_innterior', startonMap, s_innterior),
   s_beddinng: easyRoom('s_beddinng', startonMap, s_beddinng),
   s_grillbys: easyRoom('s_grillbys', startonMap, s_grillbys),
   s_backrooms: easyRoom('s_backrooms', startonMap, s_backrooms),
   s_taxi: easyRoom('s_taxi', startonMap, s_taxi),
   s_town2: easyRoom('s_town2', startonMap, s_town2),
   s_librarby: easyRoom('s_librarby', startonMap, s_librarby),
   s_bonehouse: easyRoom('s_bonehouse', startonMap, s_bonehouse),
   s_papyrusroom: easyRoom('s_papyrusroom', startonMap, s_papyrusroom),
   s_sansroom: easyRoom('s_sansroom', startonMap, s_sansroom),
   s_sanscloset: easyRoom('s_sanscloset', startonMap, s_sanscloset),
   s_capture: easyRoom('s_capture', startonMap, s_capture),
   s_battle: easyRoom('s_battle', startonMap, s_battle),
   s_exit: easyRoom('s_exit', startonMap, s_exit)
};

rooms.register(startonRooms);

saver.locations.register(text.s_save_starton);

speech.presets.register({
   kidd: new OutertaleSpeechPreset({
      faces: [
         null, // 0
         faces.kiddCutscene1, // 1
         faces.kiddSide, // 2
         faces.kiddAww, // 3
         faces.kiddHuh, // 4
         faces.kiddNeutral, // 5
         faces.kiddSerene, // 6
         faces.kiddShocked, // 7
         faces.kiddKiller, // 8
         faces.kiddHuhSlave, // 9
         faces.kiddNeutralSlave, // 10
         faces.kiddShockedSlave, // 11
         faces.kiddKillerSlave, // 12
         faces.kiddDetermined, // 13
         faces.kiddStarstruck // 14
      ],
      interval: 2,
      voices: [ [ new CosmosDaemon(content.avKidd, soundOpts()) ] ],
      fontFamily1: content.fDeterminationMono,
      fontFamily2: content.fDotumChe
   }),
   kidding: new OutertaleSpeechPreset({
      faces: [
         null, // 0
         faces.kiddCutscene1, // 1
         faces.kiddSide, // 2
         faces.kiddAww, // 3
         faces.kiddHuh, // 4
         faces.kiddNeutral, // 5
         faces.kiddSerene, // 6
         faces.kiddShocked, // 7
         faces.kiddKiller, // 8
         faces.kiddHuhSlave, // 9
         faces.kiddNeutralSlave, // 10
         faces.kiddShockedSlave, // 11
         faces.kiddKillerSlave, // 12
         faces.kiddDetermined, // 13
         faces.kiddStarstruck // 14
      ],
      interval: 2,
      voices: [ [ new CosmosDaemon(content.avKidd, soundOpts()) ] ],
      fontFamily1: content.fDeterminationMono,
      fontFamily2: content.fDotumChe
   }),
   asgore: new OutertaleSpeechPreset({
      faces: [
         null, // 0
         faces.asgoreCutscene1, // 1
         faces.asgorePensive, // 2
         faces.asgoreWhatHaveYouDone, // 3
         faces.asgorePensiveSmile, // 4
         faces.asgoreSide, // 5
         faces.asgoreHopeful, // 6
         faces.asgoreHopefulSide, // 7
         faces.asgoreFunni, // 8
         faces.asgoreBouttacry, // 9
         faces.asgoreCry1, // 10
         faces.asgoreCry2, // 11
         faces.asgoreWhatYouDoin, // 12
         faces.asgoreMad, // 13
         faces.asgoreMadClosed, // 14
         faces.asgoreHmph, // 15
         faces.asgoreHmphClosed, // 16
         faces.asgoreBound, // 17
         faces.asgoreBreak1, // 18
         faces.asgoreBreak2, // 19
         faces.asgoreWat, // 20
         faces.asgoreLoverboy, // 21
         faces.asgoreSmacked, // 22
         faces.asgoreBlank, // 23
         faces.asgoreItsHim, // 24
         faces.asgoreContemplative // 25
      ],
      interval: 4,
      voices: [
         [ new CosmosDaemon(content.avAsgore, { context, router: soundRouter }) ],
         [
            new CosmosDaemon(content.avAsgore, {
               context,
               rate: 0.95,
               router: soundRouter
            })
         ],
         [
            new CosmosDaemon(content.avAsgore, {
               context,
               rate: 0.9,
               router: soundRouter
            })
         ],
         [
            new CosmosDaemon(content.avAsgore, {
               context,
               rate: 0.8,
               router: soundRouter
            })
         ]
      ],
      fontFamily1: content.fDeterminationMono,
      fontFamily2: content.fDotumChe
   }),
   mettaton: new OutertaleSpeechPreset({
      chunksize: 2,
      faces: [ null, faces.mettatonNeo ],
      interval: 2,
      voices: [
         [
            new CosmosDaemon(content.avMettaton1, { context, router: soundRouter }),
            new CosmosDaemon(content.avMettaton2, { context, router: soundRouter }),
            new CosmosDaemon(content.avMettaton3, { context, router: soundRouter }),
            new CosmosDaemon(content.avMettaton4, { context, router: soundRouter }),
            new CosmosDaemon(content.avMettaton5, { context, router: soundRouter }),
            new CosmosDaemon(content.avMettaton6, { context, router: soundRouter }),
            new CosmosDaemon(content.avMettaton7, { context, router: soundRouter }),
            new CosmosDaemon(content.avMettaton8, { context, router: soundRouter }),
            new CosmosDaemon(content.avMettaton8, { context, router: soundRouter })
         ]
      ],
      threshold: 0.8,
      fontFamily1: content.fDeterminationMono,
      fontFamily2: content.fDotumChe
   }),
   papyrus: new OutertaleSpeechPreset({
      faces: [
         faces.papyrusCutscene1, // 0
         faces.papyrusAYAYA, // 1
         faces.papyrusAyoo, // 2
         faces.papyrusDisbeef, // 3
         faces.papyrusIsThatSo, // 4
         faces.papyrusNervousLaugh, // 5
         faces.papyrusNervousSweat, // 6
         faces.papyrusNyeh, // 7
         faces.papyrusThisIsSoSad, // 8
         faces.papyrusWhatchaGonnaDo, // 9
         faces.papyrusBattleHapp, // 10
         faces.papyrusBattleHappAgain, // 11
         faces.papyrusBattleAnime, // 12
         faces.papyrusBattleBlush, // 13
         faces.papyrusBattleBlushRefuse, // 14
         faces.papyrusBattleConfident, // 15
         faces.papyrusBattleDeadpan, // 16
         faces.papyrusBattleDetermined, // 17
         faces.papyrusBattleEyeroll, // 18
         faces.papyrusBattleFakeAnger, // 19
         faces.papyrusBattleMad, // 20
         faces.papyrusBattleNooo, // 21
         faces.papyrusBattleOwwie, // 22
         faces.papyrusBattleShock, // 23
         faces.papyrusBattleSide, // 24
         faces.papyrusBattleSly, // 25
         faces.papyrusBattleSus, // 26
         faces.papyrusBattleSweat, // 27
         faces.papyrusBattleTopBlush, // 28
         faces.papyrusBattleWeary, // 29
         null, // 30
         faces.papyrusSad, // 31
         faces.papyrusSadSweat, // 32
         faces.papyrusBattleClosed, // 33
         faces.papyrusDisbeefTurnaround, // 34
         faces.papyrusBattleSmacked, // 35
         faces.papyrusBattleBlank // 36
      ],
      interval: 2,
      voices: [ [ new CosmosDaemon(content.avPapyrus, { context, router: soundRouter }) ] ],
      fontFamily1: content.fPapyrus,
      fontFamily2: content.fPapyrus,
      fontSize2: 8
   }),
   papyrusnt: new OutertaleSpeechPreset({
      faces: [ null ],
      interval: 2,
      voices: [ [ new CosmosDaemon(content.avPapyrus, { context, router: soundRouter }) ] ],
      fontFamily1: content.fPapyrus,
      fontFamily2: content.fPapyrus,
      fontSize2: 8
   }),
   alphys: new OutertaleSpeechPreset({
      faces: [
         null, // 0
         faces.alphysCutscene1, // 1
         faces.alphysShocked, // 2
         faces.alphysNervousLaugh, // 3
         faces.alphysWorried, // 4
         faces.alphysYeahYouKnowWhatsUp, // 5
         faces.alphysYeahYouKnowWhatsUpCenter, // 6
         faces.alphysDontGetAllDreamyEyedOnMeNow, // 7
         faces.alphysCutscene2, // 8
         faces.alphysSide, // 9
         faces.alphysSmileSweat, // 10
         faces.alphysSideSad, // 11
         faces.alphysSoAwesome, // 12
         faces.alphysThatSucks, // 13
         faces.alphysHaveSomeCompassion, // 14
         faces.alphysTheFactIs, // 15
         faces.alphysHellYeah, // 16
         faces.alphysWelp, // 17
         faces.alphysUhButHeresTheDeal, // 18
         faces.alphysIDK, // 19
         faces.alphysNeutralSweat, // 20
         faces.alphysWTF, // 21
         faces.alphysWTF2, // 22
         faces.alphysCutscene3, // 23
         faces.alphysGarbo, // 24
         faces.alphysGarboCenter, // 25
         faces.alphysFR, // 26
         faces.alphysInquisitive, // 27
         faces.alphysSmarmy, // 28
         faces.alphysSmarmyAggressive, // 29
         faces.alphysIDK2, // 30
         faces.alphysIDK3, // 31
         faces.alphysWhyOhWhy, // 32
         faces.alphysYupEverythingsFine // 33
      ],
      interval: 2,
      voices: [ [ new CosmosDaemon(content.avAlphys, { context, router: soundRouter }) ] ],
      fontFamily1: content.fDeterminationMono,
      fontFamily2: content.fDotumChe
   }),
   darksans: new OutertaleSpeechPreset({
      faces: [ null, faces.sansEmpty ],
      interval: 3,
      voices: [ null ],
      fontFamily1: content.fDeterminationMono,
      fontFamily2: content.fDotumChe
   }),
   sans: new OutertaleSpeechPreset({
      faces: [
         faces.sansNormal, // 0
         faces.sansEmpty, // 1
         faces.sansWink, // 2
         faces.sansBlink, // 3
         faces.sansLaugh1, // 4
         faces.sansLaugh2, // 5
         faces.sansEye, // 6
         null, // 7
         faces.sansBlinkTomato, // 8
         faces.sansWinkTomato // 9
      ],
      interval: 2,
      voices: [ [ new CosmosDaemon(content.avSans, { context, router: soundRouter }) ] ],
      fontFamily1: content.fComicSans,
      fontFamily2: content.fComicSans,
      fontSize2: 8
   }),
   without: new OutertaleSpeechPreset({
      faces: [ null ],
      interval: 2,
      voices: [ [ new CosmosDaemon(content.avSans, { context, router: soundRouter }) ] ],
      fontFamily1: content.fComicSans,
      fontFamily2: content.fComicSans,
      fontSize2: 8
   })
});

translator.addAsset('imStarton$info', startonMap);
translator.addAsset('imStarton', startonMap.image);
translator.addText('starton', text);

CosmosUtils.status(`LOAD MODULE: STARTON BOOTSTRAP (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
