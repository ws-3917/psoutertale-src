import commonText from '../../languages/default/text/common';
import text from '../../languages/default/text/outlands';
import { faces, quickCall } from '../common/api';
import { content, context, convolver, effectSetup, soundOpts, soundRouter, sounds } from '../systems/assets';
import { atlas, game, items, maps, renderer, rooms, speech } from '../systems/core';
import {
   battler,
   dialogue,
   easyRoom,
   instance,
   keyring,
   phone,
   portraits,
   saver,
   talkFinder,
   world
} from '../systems/framework';
import { OutertaleMap, OutertaleSpeechPreset } from '../systems/outertale';
import { SAVE } from '../systems/save';
import {
   CosmosAnimation,
   CosmosDaemon,
   CosmosEffect,
   CosmosImage,
   CosmosSprite,
   CosmosUtils
} from '../systems/storyteller';
import { translator } from '../systems/translator';
import { toriCheck } from './extras';

import imOutlands$info from '../../assets/images/maps/outlands.json?url';
import imOutlands from '../../assets/images/maps/outlands.png?url';

import w_alley1 from '../../rooms/w_alley1.json';
import w_alley2 from '../../rooms/w_alley2.json';
import w_alley3 from '../../rooms/w_alley3.json';
import w_alley4 from '../../rooms/w_alley4.json';
import w_annex from '../../rooms/w_annex.json';
import w_blooky from '../../rooms/w_blooky.json';
import w_bridge from '../../rooms/w_bridge.json';
import w_candy from '../../rooms/w_candy.json';
import w_coffin from '../../rooms/w_coffin.json';
import w_courtyard from '../../rooms/w_courtyard.json';
import w_danger from '../../rooms/w_danger.json';
import w_dummy from '../../rooms/w_dummy.json';
import w_entrance from '../../rooms/w_entrance.json';
import w_exit from '../../rooms/w_exit.json';
import w_froggit from '../../rooms/w_froggit.json';
import w_junction from '../../rooms/w_junction.json';
import w_lobby from '../../rooms/w_lobby.json';
import w_mouse from '../../rooms/w_mouse.json';
import w_pacing from '../../rooms/w_pacing.json';
import w_party from '../../rooms/w_party.json';
import w_puzzle1 from '../../rooms/w_puzzle1.json';
import w_puzzle2 from '../../rooms/w_puzzle2.json';
import w_puzzle3 from '../../rooms/w_puzzle3.json';
import w_puzzle4 from '../../rooms/w_puzzle4.json';
import w_start from '../../rooms/w_start.json';
import w_toriel_asriel from '../../rooms/w_toriel_asriel.json';
import w_toriel_front from '../../rooms/w_toriel_front.json';
import w_toriel_hallway from '../../rooms/w_toriel_hallway.json';
import w_toriel_kitchen from '../../rooms/w_toriel_kitchen.json';
import w_toriel_living from '../../rooms/w_toriel_living.json';
import w_toriel_toriel from '../../rooms/w_toriel_toriel.json';
import w_tutorial from '../../rooms/w_tutorial.json';
import w_twinkly from '../../rooms/w_twinkly.json';
import w_wonder from '../../rooms/w_wonder.json';
import w_zigzag from '../../rooms/w_zigzag.json';

export const outlandsMap = new OutertaleMap(imOutlands$info, new CosmosImage(imOutlands));
outlandsMap.name = 'maps::outlands';

battler.weapons.register({
   spanner: {
      animation (index, critted, accuracy, base, half, hitbar) {
         return new Promise(resolve => {
            battler.hitbar1(hitbar);
            sounds.swing.instance(renderer);
            renderer.attach(
               'menu',
               new CosmosAnimation({
                  active: true,
                  anchor: { x: 0 },
                  scale: accuracy > 0.5 ? 0.5 : 0.25,
                  tint: 0xff6969,
                  position: base.add(half.x, -2.5),
                  resources: content.ibuSwing
               }).on('tick', function () {
                  if (this.index === 5 && this.step === this.duration - 1) {
                     renderer.detach('menu', this);
                     resolve();
                  }
               })
            );
         });
      },
      targets: 1,
      speed: 1,
      crit: 2
   },
   little_dipper: {
      animation (index, critted, accuracy, base, half, hitbar, next) {
         return battler.weapons.of('spanner').animation(index, critted, accuracy, base, half, hitbar, next);
      },
      targets: 1,
      speed: 1,
      crit: 2.2
   }
});

items.register('starbertA', { type: 'special', value: 0, sell1: 10, sell2: 100, text: text.i_starbertA, useSFX: true });
items.register('starbertB', { type: 'special', value: 0, sell1: 8, sell2: 200, text: text.i_starbertB, useSFX: true });
items.register('starbertC', { type: 'special', value: 0, sell1: 6, sell2: 300, text: text.i_starbertC, useSFX: true });
items.register('spacesuit', { type: 'consumable', value: 0, sell1: 100, sell2: 18, text: text.i_spacesuit });
items.register('spanner', { type: 'special', value: 0, sell1: 100, sell2: 15, text: text.i_spanner, useSFX: true });
items.register('halo', { type: 'armor', value: 3, sell1: 20, sell2: 100, text: text.i_halo, useSFX: true });
items.register('candy', { type: 'consumable', value: 10, sell1: 10, sell2: 4, text: text.i_candy });
items.register('delta', { type: 'consumable', value: 5, sell1: 8, sell2: 34, text: text.i_delta });
items.register('chocolate', { type: 'consumable', value: 19, sell1: 150, sell2: 40, text: text.i_chocolate });
items.register('soda', { type: 'consumable', value: 8, sell1: 4, sell2: 2, text: text.i_soda });
items.register('steak', { type: 'consumable', value: 14, sell1: 6, sell2: 3, text: text.i_steak });
items.register('water', { type: 'consumable', value: 12, sell1: 5, sell2: 10, text: text.i_water });
items.register('snails', { type: 'consumable', value: 19, sell1: 10, sell2: 80, text: text.i_snails });
items.register('little_dipper', {
   type: 'weapon',
   value: 3,
   sell1: 25,
   sell2: 5,
   text: text.i_little_dipper,
   useSFX: true
});
items.register('pie', { type: 'consumable', value: 99, sell1: 100, sell2: 300, text: text.i_pie });
items.register('pie2', { type: 'consumable', value: 99, sell1: 100, sell2: 300, text: text.i_pie2 });
items.register('pie3', { type: 'consumable', value: 69, sell1: 20, sell2: 10, text: text.i_pie3 });
items.register('pie4', { type: 'consumable', value: 39, sell1: 5, sell2: 5, text: text.i_pie4 });

keyring.register('coffin', {
   description: () => text.k_coffin.description(),
   name: () => text.k_coffin.name,
   priority: -1,
   display () {
      return SAVE.data.b.key_coffin;
   }
});

maps.register('outlands', outlandsMap);

phone.register('hello', {
   display () {
      return SAVE.data.n.plot < 7;
   },
   priority: 1.1,
   async trigger () {
      SAVE.flag.b._call = true;
      if (SAVE.data.n.plot === 4.1) {
         quickCall(true, ...commonText.c_call_common.nobody4);
      } else if (3 <= SAVE.data.n.cell_insult) {
         quickCall(true, ...text.c_call_outlands.helloX);
      } else {
         quickCall(true, ...text.c_call_outlands.hello[Math.min(SAVE.data.n.cell_hello++, 3)]);
      }
   },
   name: () => text.c_name_outlands.hello
});

phone.register('about', {
   display () {
      return SAVE.data.n.plot < 7 && !SAVE.data.b.cell_about_end;
   },
   priority: 1.2,
   async trigger () {
      SAVE.flag.b._call = true;
      if (SAVE.data.n.plot === 4.1) {
         quickCall(true, ...commonText.c_call_common.nobody4a);
      } else if (3 <= SAVE.data.n.cell_insult) {
         SAVE.data.b.cell_about_end = true;
         quickCall(true, ...text.c_call_outlands.about3);
      } else if (SAVE.data.b.cell_about) {
         SAVE.data.b.cell_about_end = true;
         quickCall(true, ...text.c_call_outlands.about2);
      } else {
         SAVE.data.b.cell_about = true;
         quickCall(true, ...text.c_call_outlands.about1);
      }
   },
   name: () => text.c_name_outlands.about
});

phone.register('mom', {
   display () {
      return SAVE.data.n.plot < 7 && !SAVE.data.b.cell_mom_end;
   },
   priority: 1.3,
   async trigger () {
      SAVE.flag.b._call = true;
      if (SAVE.data.n.plot === 4.1) {
         quickCall(true, ...commonText.c_call_common.nobody4m);
      } else if (3 <= SAVE.data.n.cell_insult) {
         SAVE.data.b.cell_mom_end = true;
         quickCall(true, ...text.c_call_outlands.mom4);
      } else if (SAVE.data.b.cell_mom) {
         if (SAVE.data.b.cell_flirt) {
            SAVE.data.b.cell_mom_end = true;
            SAVE.data.b.cell_flirt_end = true;
            quickCall(true, ...text.c_call_outlands.mom3);
         } else {
            SAVE.data.b.cell_mom_end = true;
            quickCall(true, ...text.c_call_outlands.mom2);
         }
      } else {
         SAVE.data.b.cell_mom = true;
         quickCall(true, ...text.c_call_outlands.mom1);
      }
   },
   name: () => text.c_name_outlands.mom
});

phone.register('flirt', {
   display () {
      return SAVE.data.n.plot < 7 && !SAVE.data.b.cell_flirt_end;
   },
   priority: 1.4,
   async trigger () {
      SAVE.flag.b._call = true;
      if (SAVE.data.n.plot === 4.1) {
         quickCall(true, ...commonText.c_call_common.nobody4f);
      } else if (3 <= SAVE.data.n.cell_insult) {
         SAVE.data.b.cell_flirt_end = true;
         quickCall(true, ...text.c_call_outlands.flirt4);
      } else if (SAVE.data.b.cell_flirt) {
         if (SAVE.data.b.cell_mom) {
            SAVE.data.b.cell_mom_end = true;
            SAVE.data.b.cell_flirt_end = true;
            quickCall(true, ...text.c_call_outlands.flirt3);
         } else {
            SAVE.data.b.cell_flirt_end = true;
            quickCall(true, ...text.c_call_outlands.flirt2);
         }
      } else {
         SAVE.data.b.cell_flirt = true;
         quickCall(true, ...text.c_call_outlands.flirt1);
      }
   },
   name: () => text.c_name_outlands.flirt
});

const insulter = () => [ 1, 5 ].includes(SAVE.data.n.state_wastelands_dummy) && SAVE.data.b.w_state_riddleskip;

phone.register('insult', {
   display () {
      return SAVE.data.n.plot < 7 && SAVE.data.n.cell_insult < 2;
   },
   priority: 1.5,
   async trigger () {
      SAVE.flag.b._call = true;
      if (SAVE.data.n.plot === 4.1) {
         quickCall(true, ...commonText.c_call_common.nobody4i);
      } else {
         const sus = insulter();
         quickCall(
            true,
            ...[ text.c_call_outlands.insult1, text.c_call_outlands.insult2 ][SAVE.data.n.cell_insult++](sus)
         );
         if (sus && SAVE.data.n.cell_insult === 2) {
            SAVE.data.n.cell_insult = 3;
         }
      }
   },
   name: () => text.c_name_outlands.insult
});

phone.register('toriel', {
   display () {
      return !SAVE.data.b.freedom && SAVE.data.n.plot > 6.1;
   },
   priority: 2.1,
   async trigger () {
      SAVE.flag.b._call = true;
      if (world.genocide && (world.goatbro || (game.room === 'w_exit' && SAVE.data.n.plot < 16))) {
         quickCall(false, ...commonText.c_call_common.nobody1, ...text.c_call_asriel());
         return;
      } else if ([ 'f_truth', 'f_village', 'a_offshoot2', 'a_sleeping2', 'a_sleeping3' ].includes(game.room)) {
         quickCall(false, ...commonText.c_call_common.nobody0);
         return;
      } else if (SAVE.data.n.plot === 72) {
         if (SAVE.data.n.plot_epilogue === 5) {
            const dt = instance('main', 'darktoriel');
            if (dt && SAVE.data.n.plot_epilogue < 6) {
               SAVE.data.n.plot_epilogue = 6;
               dt.talk('a', talkFinder(), 'auto', ...text.a_outlands.darktorielcall).then(() => {
                  atlas.detach(renderer, 'menu', 'sidebar');
                  game.movement = true;
               });
               return;
            }
         }
         quickCall(false, ...commonText.c_call_common.nobody3);
         return;
      } else if (SAVE.data.n.plot === 7) {
         quickCall(false, ...text.c_call_toriel_early());
         return;
      } else if (SAVE.data.n.plot < 10) {
         const chair =
            game.room === 'w_toriel_living' && toriCheck()
               ? (instance('main', 'theOneAndOnlyChairiel')?.object.objects[0] as CosmosSprite)
               : void 0;
         chair && speech.targets.add(chair);
         quickCall(false, ...text.c_call_toriel_late()).then(() => {
            chair && speech.targets.delete(chair);
         });
         return;
      } else if (SAVE.data.n.state_wastelands_toriel === 2) {
         quickCall(false, ...commonText.c_call_common.nobody2);
         return;
      } else if (
         SAVE.data.n.plot < 16
            ? SAVE.data.b.oops || SAVE.data.n.plot < 14
            : SAVE.data.n.state_wastelands_toriel !== 0 || 71.2 <= SAVE.data.n.plot
      ) {
         quickCall(false, ...commonText.c_call_common.nobody1);
         return;
      }
      const toritext = CosmosUtils.provide(text.c_call_toriel[game.room] ?? []);
      const real = toritext.length !== 0;
      if (real && game.room === 'w_alley4') {
         dialogue('dialoguerBottom', ...toritext).then(() => {
            atlas.detach(renderer, 'menu', 'sidebar');
            game.movement = true;
         });
      } else {
         const chair =
            game.room === 'w_toriel_living' && real && toriCheck()
               ? (instance('main', 'theOneAndOnlyChairiel')?.object.objects[0] as CosmosSprite)
               : void 0;
         chair && speech.targets.add(chair);
         quickCall(real, ...(real ? toritext : commonText.c_call_common.nobody3)).then(() => {
            chair && speech.targets.delete(chair);
         });
      }
   },
   name: () => text.c_name_outlands.toriel
});

phone.register('puzzle1', {
   display () {
      return (
         (game.room === 'w_puzzle1' && SAVE.data.n.plot < 5.1) ||
         (game.room === 'w_puzzle2' && SAVE.data.n.plot < 5.2) ||
         (game.room === 'w_puzzle3' && SAVE.data.n.plot < 5.3) ||
         (game.room === 'w_puzzle4' && SAVE.data.n.plot < 5.4)
      );
   },
   priority: 3.1,
   async trigger () {
      SAVE.flag.b._call = true;
      SAVE.data.b.cell_puzzle = true;
      if (3 <= SAVE.data.n.cell_insult) {
         quickCall(true, ...text.c_call_outlands.puzzle2);
      } else if ([ 1, 5 ].includes(SAVE.data.n.state_wastelands_dummy) && SAVE.data.b.w_state_riddleskip) {
         quickCall(true, ...text.c_call_outlands.puzzle3);
      } else {
         quickCall(true, ...text.c_call_outlands.puzzle1);
      }
   },
   name: () => text.c_name_outlands.puzzle
});

portraits.register(faces);

export const outlandsRooms = {
   w_start: easyRoom('w_start', outlandsMap, w_start),
   w_twinkly: easyRoom('w_twinkly', outlandsMap, w_twinkly),
   w_entrance: easyRoom('w_entrance', outlandsMap, w_entrance),
   w_lobby: easyRoom('w_lobby', outlandsMap, w_lobby),
   w_tutorial: easyRoom('w_tutorial', outlandsMap, w_tutorial),
   w_dummy: easyRoom('w_dummy', outlandsMap, w_dummy),
   w_coffin: easyRoom('w_coffin', outlandsMap, w_coffin),
   w_danger: easyRoom('w_danger', outlandsMap, w_danger),
   w_zigzag: easyRoom('w_zigzag', outlandsMap, w_zigzag),
   w_froggit: easyRoom('w_froggit', outlandsMap, w_froggit),
   w_candy: easyRoom('w_candy', outlandsMap, w_candy),
   w_puzzle1: easyRoom('w_puzzle1', outlandsMap, w_puzzle1),
   w_puzzle2: easyRoom('w_puzzle2', outlandsMap, w_puzzle2),
   w_puzzle3: easyRoom('w_puzzle3', outlandsMap, w_puzzle3),
   w_puzzle4: easyRoom('w_puzzle4', outlandsMap, w_puzzle4),
   w_mouse: easyRoom('w_mouse', outlandsMap, w_mouse),
   w_blooky: easyRoom('w_blooky', outlandsMap, w_blooky),
   w_party: easyRoom('w_party', outlandsMap, w_party),
   w_pacing: easyRoom('w_pacing', outlandsMap, w_pacing),
   w_junction: easyRoom('w_junction', outlandsMap, w_junction),
   w_annex: easyRoom('w_annex', outlandsMap, w_annex),
   w_wonder: easyRoom('w_wonder', outlandsMap, w_wonder),
   w_courtyard: easyRoom('w_courtyard', outlandsMap, w_courtyard),
   w_toriel_front: easyRoom('w_toriel_front', outlandsMap, w_toriel_front),
   w_toriel_living: easyRoom('w_toriel_living', outlandsMap, w_toriel_living),
   w_toriel_kitchen: easyRoom('w_toriel_kitchen', outlandsMap, w_toriel_kitchen),
   w_toriel_hallway: easyRoom('w_toriel_hallway', outlandsMap, w_toriel_hallway),
   w_toriel_asriel: easyRoom('w_toriel_asriel', outlandsMap, w_toriel_asriel),
   w_toriel_toriel: easyRoom('w_toriel_toriel', outlandsMap, w_toriel_toriel),
   w_alley1: easyRoom('w_alley1', outlandsMap, w_alley1),
   w_alley2: easyRoom('w_alley2', outlandsMap, w_alley2),
   w_alley3: easyRoom('w_alley3', outlandsMap, w_alley3),
   w_alley4: easyRoom('w_alley4', outlandsMap, w_alley4),
   w_bridge: easyRoom('w_bridge', outlandsMap, w_bridge),
   w_exit: easyRoom('w_exit', outlandsMap, w_exit)
};

rooms.register(outlandsRooms);

saver.locations.register(text.s_save_outlands);

speech.presets.register({
   asriel1: new OutertaleSpeechPreset({
      faces: [
         null, // 0
         faces.asrielEvilTrue, // 1
         faces.asrielEvilClosedTrue, // 2
         faces.asrielPlainTrue, // 3
         faces.asrielPlainClosedTrue, // 4
         faces.asrielSmirkTrue, // 5
         faces.asrielFocusTrue, // 6
         faces.asrielFocusClosedTrue, // 7
         faces.asrielFocusSideTrue, // 8
         faces.asrielCockyTrue, // 9
         faces.asrielHuhTrue, // 10
         new CosmosSprite(), // 11
         new CosmosSprite(), // 12
         faces.asrielOhReallyTrue, // 13
         new CosmosSprite(), // 14
         faces.asrielFurrowTrue, // 15
         faces.asrielOhReallyClosedTrue, // 16
         faces.asrielSmirkHappyTrue, // 17
         faces.asrielBoopedTrue, // 18
         faces.asrielNice, // 19
         faces.asrielKawaii, // 20
         faces.asrielNervous, // 21
         faces.asrielExhaust, // 22
         faces.asrielGrateful, // 23
         faces.asrielHmmOkayICanKindaSeeWhereYouCominFrom, // 24
         faces.asrielSade1, // 25
         faces.asrielSade2, // 26
         faces.asrielTakumi, // 27
         faces.asrielWink, // 28
         faces.asrielDetermined, // 29
         faces.asrielSade3, // 30
         faces.asrielSussmile // 31
      ],
      interval: 2,
      voices: [
         [
            new CosmosDaemon(content.avAsriel, {
               context,
               router: soundRouter
            })
         ],
         [
            new CosmosDaemon(content.avAsriel, {
               context,
               rate: 1.2,
               router: soundRouter
            })
         ],
         [
            new CosmosDaemon(content.avAsriel, {
               context,
               rate: 1.4,
               router: soundRouter
            })
         ]
      ],
      fontFamily1: content.fDeterminationMono,
      fontFamily2: content.fDotumChe
   }),
   asriel2: new OutertaleSpeechPreset({
      faces: [
         null, // 0
         faces.asrielEvil, // 1
         faces.asrielEvilClosed, // 2
         faces.asrielPlain, // 3
         faces.asrielPlainClosed, // 4
         faces.asrielSmirk, // 5
         faces.asrielFocus, // 6
         faces.asrielFocusClosed, // 7
         faces.asrielFocusSide, // 8
         faces.asrielCocky, // 9
         faces.asrielHuh, // 10
         new CosmosSprite(), // 11
         new CosmosSprite(), // 12
         faces.asrielOhReally, // 13
         faces.asrielFear, // 14
         faces.asrielFurrow, // 15
         faces.asrielOhReallyClosed, // 16
         faces.asrielSmirkHappy, // 17
         faces.asrielBooped, // 18
         new CosmosSprite(), // 19
         new CosmosSprite(), // 20
         new CosmosSprite(), // 21
         new CosmosSprite(), // 22
         faces.asrielGrateful // 23
      ],
      interval: 2,
      voices: [ [ new CosmosDaemon(content.avAsriel2, soundOpts()) ] ],
      fontFamily1: content.fDeterminationMono,
      fontFamily2: content.fDotumChe
   }),
   napstablook: new OutertaleSpeechPreset({
      faces: [ null ],
      interval: 2,
      voices: [
         [
            new CosmosDaemon(content.avNapstablook, {
               context,
               router: effectSetup(new CosmosEffect(context, convolver, 0.6), soundRouter)
            })
         ]
      ],
      fontFamily1: content.fDeterminationMono,
      fontFamily2: content.fDotumChe
   }),
   toriel: new OutertaleSpeechPreset({
      faces: [
         faces.torielCutscene1, // 0
         faces.torielCutscene2, // 1
         faces.torielEverythingisfine, // 2
         faces.torielWTF, // 3
         faces.torielWTF2, // 4
         faces.torielConcern, // 5
         faces.torielSmallXD, // 6
         faces.torielBlush, // 7
         faces.torielXD, // 8
         faces.torielCompassion, // 9
         faces.torielCompassionSmile, // 10
         faces.torielIsMad, // 11
         faces.torielCompassionFrown, // 12
         faces.torielStraightUp, // 13
         faces.torielSincere, // 14
         faces.torielDreamworks, // 15
         faces.torielShock, // 16
         faces.torielLowConcern, // 17
         faces.torielSad, // 18
         faces.torielCry, // 19
         faces.torielCryLaugh, // 20
         null, // 21
         faces.torielTired, // 22
         faces.torielSus, // 23
         faces.torielBlank // 24
      ],
      interval: 2,
      voices: [
         [
            new CosmosDaemon(content.avToriel, {
               context,
               router: soundRouter
            })
         ],
         [
            new CosmosDaemon(content.avToriel, {
               context,
               rate: 0.95,
               router: soundRouter
            })
         ],
         [
            new CosmosDaemon(content.avToriel, {
               context,
               rate: 0.9,
               router: soundRouter
            })
         ],
         [
            new CosmosDaemon(content.avToriel, {
               context,
               rate: 0.8,
               router: soundRouter
            })
         ]
      ],
      fontFamily1: content.fDeterminationMono,
      fontFamily2: content.fDotumChe
   }),
   twinkly: new OutertaleSpeechPreset({
      faces: [
         faces.twinklyEvil, // 0
         faces.twinklyGonk, // 1
         faces.twinklyGrin, // 2
         faces.twinklyHurt, // 3
         faces.twinklyLaugh, // 4
         faces.twinklyNice, // 5
         faces.twinklyPlain, // 6
         faces.twinklySassy, // 7
         faces.twinklySide, // 8
         faces.twinklyWink, // 9
         faces.twinklyKawaii, // 10
         faces.twinklyCapping, // 11
         faces.twinklyPissed, // 12
         faces.twinklyPlead, // 13
         faces.twinklyTwisted, // 14
         faces.twinklyLose1, // 15
         faces.twinklyLose2, // 16
         faces.twinklyLose3, // 17
         faces.twinklyLose4, // 18
         null // 19
      ],
      interval: 2,
      voices: [
         [
            new CosmosDaemon(content.avTwinkly1, {
               context,
               router: soundRouter
            })
         ],
         [
            new CosmosDaemon(content.avTwinkly2, {
               context,
               router: soundRouter
            })
         ]
      ],
      fontFamily1: content.fDeterminationMono,
      fontFamily2: content.fDotumChe
   })
});

translator.addAsset('imOutlands$info', outlandsMap);
translator.addAsset('imOutlands', outlandsMap.image);
translator.addText('outlands', text);

CosmosUtils.status(`LOAD MODULE: OUTLANDS BOOTSTRAP (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
