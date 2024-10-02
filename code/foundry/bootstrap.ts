import text from '../../languages/default/text/foundry';
import { content, context, soundOpts, soundRouter, sounds } from '../systems/assets';
import { items, maps, renderer, rooms, speech } from '../systems/core';
import { battler, easyRoom, mechanics, saver, shake } from '../systems/framework';
import { OutertaleMap, OutertaleSpeechPreset } from '../systems/outertale';
import { SAVE } from '../systems/save';
import { CosmosAnimation, CosmosDaemon, CosmosImage, CosmosSprite, CosmosUtils } from '../systems/storyteller';
import { translator } from '../systems/translator';

import imFoundryOverlay$info from '../../assets/images/maps/foundry-overlay.json?url';
import imFoundryOverlay from '../../assets/images/maps/foundry-overlay.png?url';
import imFoundry$info from '../../assets/images/maps/foundry.json?url';
import imFoundry from '../../assets/images/maps/foundry.png?url';

import f_abyss from '../../rooms/f_abyss.json';
import f_artifact from '../../rooms/f_artifact.json';
import f_battle from '../../rooms/f_battle.json';
import f_bird from '../../rooms/f_bird.json';
import f_blooky from '../../rooms/f_blooky.json';
import f_chase from '../../rooms/f_chase.json';
import f_chute from '../../rooms/f_chute.json';
import f_corner from '../../rooms/f_corner.json';
import f_corridor from '../../rooms/f_corridor.json';
import f_doge from '../../rooms/f_doge.json';
import f_dummy from '../../rooms/f_dummy.json';
import f_entrance from '../../rooms/f_entrance.json';
import f_error from '../../rooms/f_error.json';
import f_exit from '../../rooms/f_exit.json';
import f_hapstablook from '../../rooms/f_hapstablook.json';
import f_hub from '../../rooms/f_hub.json';
import f_kitchen from '../../rooms/f_kitchen.json';
import f_lobby from '../../rooms/f_lobby.json';
import f_muffet from '../../rooms/f_muffet.json';
import f_napstablook from '../../rooms/f_napstablook.json';
import f_pacing from '../../rooms/f_pacing.json';
import f_path from '../../rooms/f_path.json';
import f_piano from '../../rooms/f_piano.json';
import f_plank from '../../rooms/f_plank.json';
import f_prechase from '../../rooms/f_prechase.json';
import f_prepuzzle from '../../rooms/f_prepuzzle.json';
import f_prespear from '../../rooms/f_prespear.json';
import f_puzzle1 from '../../rooms/f_puzzle1.json';
import f_puzzle2 from '../../rooms/f_puzzle2.json';
import f_puzzle3 from '../../rooms/f_puzzle3.json';
import f_quiche from '../../rooms/f_quiche.json';
import f_sans from '../../rooms/f_sans.json';
import f_shyren from '../../rooms/f_shyren.json';
import f_snail from '../../rooms/f_snail.json';
import f_spear from '../../rooms/f_spear.json';
import f_stand from '../../rooms/f_stand.json';
import f_start from '../../rooms/f_start.json';
import f_statue from '../../rooms/f_statue.json';
import f_story1 from '../../rooms/f_story1.json';
import f_story2 from '../../rooms/f_story2.json';
import f_taxi from '../../rooms/f_taxi.json';
import f_telescope from '../../rooms/f_telescope.json';
import f_truth from '../../rooms/f_truth.json';
import f_tunnel from '../../rooms/f_tunnel.json';
import f_undyne from '../../rooms/f_undyne.json';
import f_view from '../../rooms/f_view.json';
import f_village from '../../rooms/f_village.json';

export const foundryMap = new OutertaleMap(imFoundry$info, new CosmosImage(imFoundry));
foundryMap.name = 'maps::foundry';

export const foundryOverlayMap = new OutertaleMap(imFoundryOverlay$info, new CosmosImage(imFoundryOverlay));
foundryOverlayMap.name = 'maps::foundryOverlay';

export function undyneDialogue (image: CosmosImage) {
   return new CosmosSprite({
      anchor: 0,
      frames: [ image ],
      objects: [
         new CosmosSprite({ anchor: 0 }).on('tick', function () {
            this.frames = SAVE.data.n.plot < 48 ? [ content.idcUndyneBattleTorso ] : [ content.idcUndyneDateTorsoBody ];
         })
      ]
   });
}

battler.weapons.register({
   boots: {
      async animation (index, critted, accuracy, base, half, hitbar) {
         battler.hitbar2(hitbar, critted);
         if (index === 2) {
            const perfect = 1 - mechanics.span.min / mechanics.span.range <= accuracy;
            perfect && sounds.saber3.instance(renderer);
            const deadcenter = base.add(half);
            const huge = accuracy > 0.5;
            return new Promise(resolve => {
               renderer.attach(
                  'menu',
                  new CosmosAnimation({
                     active: true,
                     anchor: 0,
                     scale: 0.5,
                     tint: perfect ? 0xffee6d : void 0,
                     position: deadcenter.add(
                        huge ? 0 : half.multiply(Math.random() * 2, Math.random() * 2).subtract(half)
                     ),
                     resources: huge ? content.ibuBoot2 : content.ibuBoot1
                  }).on(
                     'tick',
                     (() => {
                        let selfresolve = false;
                        return function () {
                           this.position = this.position.add(Math.random() * 2 - 1, Math.random() * 2 - 1);
                           if (!selfresolve && this.index === (huge ? 3 : 2)) {
                              selfresolve = true;
                              resolve();
                           } else if (this.index === 4 && this.step === this.duration - 1) {
                              renderer.detach('menu', this);
                           }
                        };
                     })()
                  )
               );
               sounds.punch2.instance(renderer).gain.value *= huge ? 1 : 0.5;
               if (huge) {
                  shake(2, 600);
               }
            });
         } else {
            await renderer.pause(500);
         }
      },
      targets: 3,
      speed: 1,
      crit: 2.8
   },
   padd: {
      async animation (index, critted, accuracy, base, half, hitbar) {
         battler.hitbar2(hitbar, critted);
         if (index === 3) {
            const perfect = 1 - mechanics.span.min / mechanics.span.range <= accuracy;
            perfect && sounds.saber3.instance(renderer);
            const deadcenter = base.add(half);
            const nottie = new CosmosSprite({
               anchor: 0,
               position: deadcenter,
               tint: perfect ? 0xffee6d : void 0,
               frames: [ content.ibuNotebook ]
            });
            renderer.attach('menu', nottie);
            sounds.bookspin.instance(renderer);
            await nottie.scale.modulate(renderer, 200, nottie.scale.value(), { x: -1 }, { x: -1 });
            await nottie.scale.modulate(renderer, 200, nottie.scale.value(), { x: 1 }, { x: 1 });
            renderer.detach('menu', nottie);
            const sploder = new CosmosAnimation({
               active: true,
               anchor: 0,
               position: deadcenter,
               tint: perfect ? 0xffee6d : void 0,
               resources: content.ibuStar
            });
            renderer.attach('menu', sploder);
            sounds.punch2.instance(renderer);
            Promise.all([
               sploder.alpha.modulate(renderer, 400, 0, 0),
               sploder.scale.modulate(renderer, 400, { x: 2, y: 2 }, { x: 2, y: 2 })
            ]).then(() => {
               renderer.detach('menu', sploder);
            });
         } else {
            await renderer.pause(500);
         }
      },
      targets: 4,
      speed: 1,
      crit: 2.6
   },
   padd_x: {
      async animation (index, critted, accuracy, base, half, hitbar) {
         battler.hitbar2(hitbar, critted);
         if (index === 3) {
            const perfect = 1 - mechanics.span.min / mechanics.span.range <= accuracy;
            perfect && sounds.saber3.instance(renderer);
            const deadcenter = base.add(half);
            const nottie = new CosmosSprite({
               anchor: 0,
               position: deadcenter,
               tint: perfect ? 0xffee6d : void 0,
               frames: [ content.ibuNotebook ]
            });
            renderer.attach('menu', nottie);
            sounds.bookspin.instance(renderer);
            await nottie.scale.modulate(renderer, 200, nottie.scale.value(), { x: -1 }, { x: -1 });
            await nottie.scale.modulate(renderer, 200, nottie.scale.value(), { x: 1 }, { x: 1 });
            renderer.detach('menu', nottie);
            const sploder = new CosmosAnimation({
               active: true,
               anchor: 0,
               position: deadcenter,
               tint: perfect ? 0xffee6d : void 0,
               resources: content.ibuStar
            });
            renderer.attach('menu', sploder);
            sounds.punch2.instance(renderer);
            Promise.all([
               sploder.alpha.modulate(renderer, 400, 0, 0),
               sploder.scale.modulate(renderer, 400, { x: 2, y: 2 }, { x: 2, y: 2 })
            ]).then(() => {
               renderer.detach('menu', sploder);
            });
         } else {
            await renderer.pause(500);
         }
      },
      targets: 4,
      speed: 1,
      crit: 2.3
   }
});

items.register('artifact', { type: 'special', value: 0, sell1: 5, sell2: 999, text: text.i_artifact, useSFX: true });
items.register('epiphany', { type: 'special', value: 0, sell1: 50, sell2: 9999, text: text.i_epiphany });
items.register('punchcard', { type: 'special', value: 0, sell1: 2, sell2: 10, text: text.i_punchcard, useSFX: true });
items.register('goggles', {
   type: 'armor',
   value: 6,
   sell1: 15,
   sell2: 55,
   text: text.i_goggles,
   inv: 30,
   useSFX: true
});
items.register('goggles_x', {
   type: 'armor',
   value: 4,
   sell1: 15,
   sell2: 45,
   text: text.i_goggles_x,
   inv: 20,
   useSFX: true
});
items.register('padd', { type: 'weapon', value: 2, sell1: 15, sell2: 55, text: text.i_padd, inv: 15, useSFX: true });
items.register('padd_x', {
   type: 'weapon',
   value: 0,
   sell1: 15,
   sell2: 45,
   text: text.i_padd_x,
   inv: 10,
   useSFX: true
});
items.register('astrofood', { type: 'consumable', value: 24, sell1: 60, sell2: 18, text: text.i_astrofood });
items.register('tzn', { type: 'consumable', value: 17, sell1: 8, sell2: 26, text: text.i_tzn });
items.register('sap', { type: 'consumable', value: 35, sell1: 14, sell2: 25, text: text.i_sap });
items.register('rations', { type: 'consumable', value: 30, sell1: 7, sell2: 25, text: text.i_rations });
items.register('crisp', { type: 'consumable', value: 18, sell1: 18, sell2: 18, text: text.i_crisp });
items.register('quiche', { type: 'consumable', value: 45, sell1: 24, sell2: 48, text: text.i_quiche });
items.register('tea', { type: 'consumable', value: 15, sell1: 12, sell2: 16, text: text.i_tea, healSFX: sounds.speed });
items.register('boots', { type: 'weapon', value: 7, sell1: 30, sell2: 60, text: text.i_boots, useSFX: true });
items.register('flight_suit', {
   type: 'armor',
   value: 10,
   sell1: 45,
   sell2: 4,
   text: text.i_flight_suit,
   useSFX: true
});
items.register('flakes', { type: 'consumable', value: 2, text: text.i_flakes });
items.register('temyarmor', { type: 'armor', value: 20, text: text.i_temyarmor, inv: 40, useSFX: true });
items.register('snack', { type: 'consumable', value: 15, sell1: 30, sell2: 5, text: text.i_snack });

maps.register('foundry', foundryMap);
maps.register('foundry-overlay', foundryOverlayMap);

export const foundryRooms = {
   f_start: easyRoom('f_start', foundryMap, f_start),
   f_sans: easyRoom('f_sans', foundryMap, f_sans),
   f_corridor: easyRoom('f_corridor', foundryMap, f_corridor),
   f_doge: easyRoom('f_doge', foundryMap, f_doge),
   f_puzzle1: easyRoom('f_puzzle1', foundryMap, f_puzzle1),
   f_quiche: easyRoom('f_quiche', foundryMap, f_quiche),
   f_bird: easyRoom('f_bird', foundryMap, f_bird),
   f_puzzle2: easyRoom('f_puzzle2', foundryMap, f_puzzle2),
   f_story1: easyRoom('f_story1', foundryMap, f_story1),
   f_prechase: easyRoom('f_prechase', foundryMap, f_prechase),
   f_chase: easyRoom('f_chase', foundryMap, f_chase),
   f_entrance: easyRoom('f_entrance', foundryMap, f_entrance),
   f_lobby: easyRoom('f_lobby', foundryMap, f_lobby),
   f_error: easyRoom('f_error', foundryMap, f_error),
   f_telescope: easyRoom('f_telescope', foundryMap, f_telescope),
   f_stand: easyRoom('f_stand', foundryMap, f_stand),
   f_abyss: easyRoom('f_abyss', foundryMap, f_abyss),
   f_muffet: easyRoom('f_muffet', foundryMap, f_muffet),
   f_shyren: easyRoom('f_shyren', foundryMap, f_shyren),
   f_statue: easyRoom('f_statue', foundryMap, f_statue),
   f_piano: easyRoom('f_piano', foundryMap, f_piano),
   f_artifact: easyRoom('f_artifact', foundryMap, f_artifact),
   f_truth: easyRoom('f_truth', foundryMap, f_truth),
   f_path: easyRoom('f_path', foundryMap, f_path),
   f_view: easyRoom('f_view', foundryMap, f_view),
   f_prespear: easyRoom('f_prespear', foundryMap, f_prespear),
   f_spear: easyRoom('f_spear', foundryMap, f_spear),
   f_plank: easyRoom('f_plank', foundryMap, f_plank),
   f_tunnel: easyRoom('f_tunnel', foundryMap, f_tunnel),
   f_chute: easyRoom('f_chute', foundryMap, f_chute),
   f_dummy: easyRoom('f_dummy', foundryMap, f_dummy),
   f_village: easyRoom('f_village', foundryMap, f_village),
   f_hub: easyRoom('f_hub', foundryMap, f_hub),
   f_undyne: easyRoom('f_undyne', foundryMap, f_undyne),
   f_kitchen: easyRoom('f_kitchen', foundryMap, f_kitchen),
   f_blooky: easyRoom('f_blooky', foundryMap, f_blooky),
   f_snail: easyRoom('f_snail', foundryMap, f_snail),
   f_napstablook: easyRoom('f_napstablook', foundryMap, f_napstablook),
   f_hapstablook: easyRoom('f_hapstablook', foundryMap, f_hapstablook),
   f_prepuzzle: easyRoom('f_prepuzzle', foundryMap, f_prepuzzle),
   f_puzzle3: easyRoom('f_puzzle3', foundryMap, f_puzzle3),
   f_taxi: easyRoom('f_taxi', foundryMap, f_taxi),
   f_corner: easyRoom('f_corner', foundryMap, f_corner),
   f_story2: easyRoom('f_story2', foundryMap, f_story2),
   f_pacing: easyRoom('f_pacing', foundryMap, f_pacing),
   f_battle: easyRoom('f_battle', foundryMap, f_battle),
   f_exit: easyRoom('f_exit', foundryMap, f_exit)
};

rooms.register(foundryRooms);

saver.locations.register(text.s_save_foundry);

speech.presets.register({
   radio: new OutertaleSpeechPreset({
      faces: [ null ],
      interval: 2,
      voices: [
         [
            new CosmosDaemon(content.avAlphys, {
               context,
               rate: 0.8,
               router: soundRouter
            })
         ],
         [
            new CosmosDaemon(content.avPapyrus, {
               context,
               rate: 1.8,
               router: soundRouter
            })
         ]
      ],
      fontFamily1: content.fDeterminationMono,
      fontFamily2: content.fDotumChe
   }),
   erogot: new OutertaleSpeechPreset({
      faces: [ null ],
      interval: 5,
      voices: [
         [
            new CosmosDaemon(content.avAsgore, {
               context,
               rate: 0.9,
               router: soundRouter
            })
         ]
      ],
      fontFamily1: content.fDeterminationMono,
      fontFamily2: content.fDotumChe
   }),
   tem: new OutertaleSpeechPreset({
      faces: [ null ],
      interval: 1,
      voices: [
         [
            new CosmosDaemon(content.avTem1, { context, router: soundRouter }),
            new CosmosDaemon(content.avTem2, { context, router: soundRouter }),
            new CosmosDaemon(content.avTem3, { context, router: soundRouter }),
            new CosmosDaemon(content.avTem4, { context, router: soundRouter }),
            new CosmosDaemon(content.avTem5, { context, router: soundRouter }),
            new CosmosDaemon(content.avTem6, { context, router: soundRouter })
         ]
      ],
      fontFamily1: content.fDeterminationMono,
      fontFamily2: content.fDotumChe
   }),
   asriel3: new OutertaleSpeechPreset({
      faces: [ null ],
      interval: 2,
      voices: [
         [ new CosmosDaemon(content.avAsriel4, { context, rate: 1, router: soundRouter }) ],
         [ new CosmosDaemon(content.avAsriel3, { context, rate: 1, router: soundRouter }) ]
      ],
      fontFamily1: content.fDeterminationMono,
      fontFamily2: content.fDotumChe
   }),
   undyne: new OutertaleSpeechPreset({
      faces: [
         null, // 0
         undyneDialogue(content.idcUndyneCutscene1), // 1
         undyneDialogue(content.idcUndyneAngryTomato), // 2
         undyneDialogue(content.idcUndyneDafuq), // 3
         undyneDialogue(content.idcUndyneGrr), // 4
         undyneDialogue(content.idcUndyneGrrSide), // 5
         undyneDialogue(content.idcUndyneHappyTomato), // 6
         undyneDialogue(content.idcUndyneImOntoYouPunk), // 7
         undyneDialogue(content.idcUndyneLaughcrazy), // 8
         undyneDialogue(content.idcUndynePensive), // 9
         undyneDialogue(content.idcUndyneSquidgames), // 10
         undyneDialogue(content.idcUndyneSus), // 11
         undyneDialogue(content.idcUndyneSweating), // 12
         undyneDialogue(content.idcUndyneTheHell), // 13
         undyneDialogue(content.idcUndyneBeingAwesomeForTenMinutesStraight), // 14
         undyneDialogue(content.idcUndyneUwu), // 15
         undyneDialogue(content.idcUndyneWhatevs), // 16
         undyneDialogue(content.idcUndyneWtfbro), // 17
         undyneDialogue(content.idcUndyneYouKilledHim), // 18
         undyneDialogue(content.idcUndyneYouKilledHimPensive), // 19
         undyneDialogue(content.idcUndyneYouKilledHimSide), // 20
         undyneDialogue(content.idcUndyneYouKilledHimSmile), // 21
         undyneDialogue(content.idcUndyneYouKilledHimStare) // 22
      ],
      interval: 2,
      voices: [
         [ new CosmosDaemon(content.avUndyne, soundOpts()) ],
         [ new CosmosDaemon(content.avUndyneex, soundOpts()) ],
         [ new CosmosDaemon(content.avUndyneex, soundOpts(1, 0.95)) ],
         [ new CosmosDaemon(content.avUndyneex, soundOpts(1, 0.9)) ],
         [ new CosmosDaemon(content.avUndyneex, soundOpts(1, 0.8)) ]
      ],
      fontFamily1: content.fDeterminationMono,
      fontFamily2: content.fDotumChe
   })
});

translator.addAsset('imFoundry$info', foundryMap);
translator.addAsset('imFoundry', foundryMap.image);
translator.addAsset('imFoundryOverlay$info', foundryOverlayMap);
translator.addAsset('imFoundryOverlay', foundryOverlayMap.image);
translator.addText('foundry', text);

CosmosUtils.status(`LOAD MODULE: FOUNDRY BOOTSTRAP (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
