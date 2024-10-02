import './bootstrap';

import { AdvancedBloomFilter } from '@pixi/filter-advanced-bloom';
import { GodrayFilter } from '@pixi/filter-godray';
import { MotionBlurFilter } from '@pixi/filter-motion-blur';
import { BLEND_MODES, ColorMatrixFilter, Container, Graphics } from 'pixi.js';
import text from '../../languages/default/text/aerialis';
import {
   basic,
   bullyEnding,
   characters,
   endCall,
   epilogueOverride,
   genCB,
   goatbro,
   goatbroTrue,
   rgHeaders,
   runEncounter,
   updateMoniker
} from '../common';
import { pms } from '../common/extras';
import { content, filters, inventories, music, musicConvolver, musicFilter, sounds, tints } from '../systems/assets';
import { atlas, events, exit, game, items, keys, maps, renderer, rng, rooms, speech, typer } from '../systems/core';
import {
   antifreeze,
   autoNav,
   autozoom,
   battler,
   calcBonusHP,
   calcHP,
   character,
   choicer,
   dialogue,
   dialogue_primitive,
   dialogueSession,
   distanceGravity,
   elevate,
   epilogue,
   fader,
   header,
   heal,
   iFancyYourVilliany,
   instance,
   instances,
   interactionCheck,
   keyState,
   menuBox,
   notifier,
   oops,
   player,
   postSIGMA,
   quickresume,
   quickshadow,
   rand_rad,
   roomKills,
   roomReaction,
   saver,
   shake,
   shopper,
   sineWaver,
   talkFinder,
   teleport,
   teleporter,
   temporary,
   tracker,
   trivia,
   ultimaFacer,
   use,
   world
} from '../systems/framework';
import { OutertaleMultivisualObject, OutertaleShop } from '../systems/outertale';
import { SAVE } from '../systems/save';
import {
   CosmosAnimation,
   CosmosAnimationResources,
   CosmosCharacter,
   CosmosDirection,
   CosmosEntity,
   CosmosHitbox,
   CosmosImage,
   CosmosImageUtils,
   CosmosInstance,
   CosmosInventory,
   CosmosKeyed,
   CosmosMath,
   CosmosObject,
   CosmosPoint,
   CosmosPointSimple,
   CosmosProvider,
   CosmosRectangle,
   CosmosRenderer,
   CosmosSprite,
   CosmosText,
   CosmosUtils,
   CosmosValue,
   CosmosValueRandom
} from '../systems/storyteller';
import { aerialisRooms, alphysPhoneDisplay, gossiper } from './bootstrap';
import { adultEvac, babyEvac, burger, childEvac, iRespeccYourVilliany, teenEvac } from './extras';
import groups from './groups';

export type AerialisRoomKey = keyof typeof aerialisRooms;

export type AerialisDefinedRS = {
   a_lift: {
      location:
         | 'a_start'
         | 'a_elevator1'
         | 'a_elevator2'
         | 'a_elevator3'
         | 'a_elevator4'
         | 'a_elevator5'
         | 'a_hub5'
         | 'a_core_entry1'
         | 'a_core_exit2'
         | 'c_start'
         | 'c_elevator1'
         | 'c_elevator2';
      elevating: boolean;
   };
   a_lab_main: {
      cutscene: boolean;
      monitor: boolean;
      monitorObject: CosmosObject;
      subcontainer: Container;
      alph: CosmosCharacter;
   };
   a_puzzle1: { offset: number; offsetCheckpoint: number; check: boolean; crash: boolean };
   a_puzzle2: { offset: number; offsetCheckpoint: number; check: boolean; crash: boolean };
   a_barricade1: { trig1: boolean; trig2: boolean; trig3: boolean };
   a_mettaton1: {
      active: boolean;
      ingredient1: number;
      ingredient2: number;
      ingredient3: number;
      danger: boolean;
      metta: boolean;
   };
   a_mettaton2: { active: boolean; killswitch: boolean; climber: boolean };
   a_split: { active: boolean; napsta: CosmosCharacter };
   a_elevator3: { active: boolean };
   a_lookout: { active: boolean };
   a_hub5: { active: boolean };
   a_elevator4: { active: boolean };
   a_core_entry1: { active: boolean };
   a_core_entry2: { active: boolean };
   a_core_left1: { active: boolean; active_puzzle: boolean; switches: number[]; solved: boolean };
   a_core_left2: { active: boolean; active_puzzle: boolean; switches: number[]; solved: boolean };
   a_core_left3: { active: boolean; switched: boolean };
   a_core_right1: { active: boolean };
   a_core_right2: { active: boolean };
   a_core_right3: { active: boolean; switched: boolean };
   a_core_bridge: { active: boolean };
   a_core_checkpoint: { active: boolean };
   a_core_battle: { active: boolean };
   a_sans: { toppler: boolean };
};

export type AerialisRS = {
   [k in AerialisRoomKey]: k extends keyof AerialisDefinedRS ? Partial<AerialisDefinedRS[k]> : {};
};

export const labspawn = () =>
   49 <= SAVE.data.n.plot &&
   ((SAVE.data.n.plot < 60 && SAVE.data.n.state_foundry_undyne === 0) ||
      (SAVE.data.n.plot > 64.1 && SAVE.data.n.plot < 68)) &&
   !world.badder_lizard &&
   !SAVE.data.b.bad_lizard;

export const darkmansSprites = {
   down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.ionADarkman })
};

export const puzzler = {
   templates: {
      a_core_left1: [
         [ 1, 1, 0, 0, 0, 0, 0, 1, 1 ], //
         [ 0, 0, 1, 0, 0, 0, 1, 0, 0 ], //
         [ 0, 0, 1, 1, 1, 1, 1, 0, 0 ],
         [ 0, 0, 0, 1, 1, 1, 0, 0, 0 ] //
      ],
      a_core_left2: [
         [ 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, /**/ 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], //
         [ 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0 ], //
         [ 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, /**/ 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0 ],
         [ 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, /**/ 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0 ], //
         [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, /**/ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1 ], //
         [ 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1 ],
         [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, /**/ 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0 ], //
         [ 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, /**/ 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1 ]
      ]
   },
   resmaps: {
      a_core_left1: [ 0, 0, 0, 0, 0, 0, 1, 1, 0 ],
      a_core_left2: [ 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1 ]
   },
   update (roomState: AerialisRS['a_core_left1'] | AerialisRS['a_core_left2'], targets: number[], restore = false) {
      const switches = roomState.switches!;

      for (const t of targets) {
         switches.includes(t) ? switches.splice(switches.indexOf(t), 1) : switches.push(t);
      }

      let absolute = false;
      const room = game.room as 'a_core_left1' | 'a_core_left2';
      if (world.nootflags.has(room)) {
         absolute = true;
      } else {
         const template = puzzler.templates[room];
         const layout = CosmosUtils.populate(template[0].length, 0);
         for (const id of switches) {
            for (const [ index, value ] of template[id].entries()) {
               layout[index] = ((layout[index] + value) % 2) as 0 | 1;
            }
         }
         absolute = !layout.includes(0);
         const instList = [ ...instances('below', 'switch') ];
         for (const inst of instList) {
            inst.index = switches.includes(+inst.tags[1]) ? 1 : 0;
         }

         const existing = [] as number[];
         const holderObjects1 = instance('main', 'puzzleholder1')?.object.objects ?? [];
         for (const object of holderObjects1) {
            const position = object.metadata.position;
            layout[position] === 1 && existing.push(position);
            object.metadata.mode = absolute ? 2 : layout[position];
         }
         const holderObjects2 = instance('main', 'puzzleholder2')?.object.objects ?? [];
         for (const object of holderObjects2) {
            const position = object.metadata.position;
            layout[position] === 1 && existing.push(position);
            object.metadata.mode = absolute ? 2 : layout[position];
         }

         for (const [ position, value ] of layout.entries()) {
            if (value === 1 && !existing.includes(position)) {
               const holderObjects = [ holderObjects1, holderObjects2 ][Math.floor(position / 13)]!;
               holderObjects.push(
                  new CosmosAnimation({
                     anchor: { x: 0, y: 1 },
                     index: restore ? (absolute ? 6 : 5) : 0,
                     metadata: { mode: absolute ? 2 : 1, position },
                     position: { x: (position % 13) * 20, y: 2 },
                     resources: [ content.iooAPuzzlenode, content.iooAPuzzlenodeDark ][puzzler.resmaps[room][position]],
                     objects: [
                        new CosmosHitbox({ anchor: { x: 0, y: 1 }, size: { x: 10, y: 9 }, metadata: { barrier: true } })
                     ]
                  }).on('tick', async function () {
                     if (this.metadata.mode === 0) {
                        this.index > 0 && --this.index;
                        if (this.index === 0) {
                           this.alpha.value = 0;
                           holderObjects.splice(holderObjects.indexOf(this), 1);
                        }
                     } else {
                        this.index < 5 && ++this.index;
                        if (this.index === 5 && this.metadata.mode === 2) {
                           this.index = 6;
                        }
                     }
                  })
               );
            }
         }
      }

      if (absolute) {
         roomState.solved = true;
         const [ anim, box ] = instance('below', 'puzzledoor')!.object.objects as [CosmosAnimation, CosmosHitbox];
         if (restore) {
            anim.index = 4;
            box.metadata.barrier = false;
         } else {
            anim.enable();
            renderer
               .when(() => anim.index === 4)
               .then(async () => {
                  anim.disable();
                  box.metadata.barrier = false;
                  sounds.pathway.instance(renderer);
                  shake();
                  await renderer.pause(650);
                  await renderer.when(() => game.movement);
                  const puzzletarget = room === 'a_core_left1' ? 1 : 2;
                  if (SAVE.data.n.state_aerialis_corepath_puzzle < puzzletarget) {
                     SAVE.data.n.state_aerialis_corepath_puzzle = puzzletarget;
                  }
               });
         }
      }

      SAVE.data.s[`state_aerialis_${room}`] = switches.length > 0 ? switches.join(',') : '';
   }
};

export const spireRooms = {
   f_battle: { height: 0, x: 0 },
   f_exit: { height: 0, x: 1500 },
   a_start: { height: 0, x: 1820 },
   a_path1: { height: 0, x: 2680 },
   a_path2: { height: 0, x: 2820 },
   a_path3: { height: 0, x: 3020 },
   a_rg1: { height: 0, x: 4020 },
   a_path4: { height: 0, x: 4520 },
   a_barricade1: { height: 0, x: 4800 },
   a_puzzle1: { height: 0, x: 4800 },
   a_mettaton1: { height: 0, x: 5160 },
   a_elevator1: { height: 0, x: 6160 },
   a_elevator2: { height: 1, x: 6120 },
   a_sans: { height: 1, x: 5800 },
   a_pacing: { height: 1, x: 5040 },
   a_prepuzzle: { height: 1, x: 4040 },
   a_puzzle2: { height: 1, x: 3640 },
   a_mettaton2: { height: 1, x: 2900 },
   a_rg2: { height: 1, x: 2560 },
   a_barricade2: { height: 1, x: 2600 },
   a_split: { height: 1, x: 2540 },
   a_offshoot1: { height: 1, x: 2980 },
   a_elevator3: { height: 1, x: 2220 },
   a_lookout: { height: 2, x: 3690 }
} as Partial<CosmosKeyed<{ height: number; x: number }, AerialisRoomKey | 'f_battle' | 'f_exit'>>;

export const hex = {
   delay: { baseTile: 150, baseRate: 1000 },
   dtime: -Infinity,
   fader: 10,
   paths: [
      [ 0, 1, 2, 3, 4, { x: 0, y: -10 }, 9, 8, 7, { x: 20, y: 0 }, 0 ],
      [ 0, 11, 10, { x: 0, y: 10 }, 3, 4, 5, 6, 7, { x: 20, y: 0 }, 0 ],
      [ 5, 6, 8, 9, { x: 0, y: 10 }, 5, /**/ 10, 11, 1, 2, { x: 0, y: -10 }, 10 ]
   ],
   rand: null as CosmosValueRandom | null,
   sets: [
      [ 0, 1, 2, 3, 4, 7, 8, 9 ],
      [ 0, 3, 4, 5, 6, 7, 10, 11 ],
      [ 1, 2, 5, 6, 8, 9, 10, 11 ]
   ],
   tint: 0x232854,
   valid (hexfloor: CosmosPointSimple[], position: CosmosPointSimple) {
      for (const tile of hexfloor) {
         if (tile.x === position.x && (tile.y === position.y || tile.y === position.y - 10)) {
            return true;
         }
      }
      return false;
   }
};

export function spawnFud () {
   instance('main', 'hotelfood')?.destroy();
   temporary(
      new CosmosAnimation({
         active: true,
         metadata: { tags: [ 'hotelfood' ] },
         anchor: { x: 0, y: 1 },
         resources: content.iooAHotelfood,
         position: { x: 129, y: 231 },
         priority: 271,
         objects: [ new CosmosHitbox({ anchor: 0, size: { x: 7, y: 30 }, position: { y: 15 } }) ]
      }),
      'main'
   );
}

export function onionArm (x: number, scaleX: 1 | -1, frame: 'left' | 'out' | 'wave') {
   return new CosmosSprite({
      anchor: 1,
      metadata: { frame },
      scale: { x: scaleX },
      position: { x }
   }).on('tick', function () {
      switch (this.metadata.frame) {
         case 'left':
            this.frames[0] = content.ionAOnionsanArmLeft;
            break;
         case 'out':
            this.frames[0] = content.ionAOnionsanArmOut;
            break;
         case 'wave':
            this.frames[0] = content.ionAOnionsanArmWave;
            break;
      }
   });
}

export function updateBadLizard () {
   const popmax2 = world.popmax(2) + 2;
   const kills_aerialis = SAVE.data.n.kills_aerialis + (SAVE.data.n.state_aerialis_royalguards === 1 ? 2 : 0);
   if (
      world.bad_lizard < 2 &&
      SAVE.data.n.state_foundry_undyne !== 2 &&
      popmax2 - kills_aerialis - SAVE.data.n.bully_aerialis < 6 &&
      kills_aerialis > popmax2 * (1 / 3)
   ) {
      areaA.scripts.notifier!(
         (aerialisStates.rooms[game.room] ??= {}),
         (aerialisStates.scripts.notifier ??= {}),
         'alphysBadLizard'
      );
      SAVE.data.b.bad_lizard = true;
      if ((world.badder_lizard ? 61 : 62) <= SAVE.data.n.plot) {
         if (SAVE.data.n.plot < 63) {
            SAVE.data.n.plot = 63;
            SAVE.data.b.a_state_hapstablook = false;
         }
         if (world.badder_lizard && SAVE.data.n.plot < 64) {
            SAVE.data.n.plot = 64;
         }
      }
   }
}

export const friskJetpack = {
   down: new CosmosAnimation({ active: true, anchor: { x: 0, y: 1 }, resources: content.iocFriskDownJetpack }),
   left: new CosmosAnimation({ active: true, anchor: { x: 0, y: 1 }, resources: content.iocFriskLeftJetpack }),
   right: new CosmosAnimation({ active: true, anchor: { x: 0, y: 1 }, resources: content.iocFriskRightJetpack }),
   up: new CosmosAnimation({ active: true, anchor: { x: 0, y: 1 }, resources: content.iocFriskUpJetpack })
};

export const friskJetpackOff = {
   down: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocFriskDownJetpackOff ] }),
   left: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocFriskLeftJetpackOff ] }),
   right: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocFriskRightJetpackOff ] }),
   up: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocFriskUpJetpackOff ] })
};

export const friskWaterJetpack = {
   down: new CosmosAnimation({ active: true, anchor: { x: 0, y: 1 }, resources: content.iocFriskDownWaterJetpack }),
   left: new CosmosAnimation({ active: true, anchor: { x: 0, y: 1 }, resources: content.iocFriskLeftWaterJetpack }),
   right: new CosmosAnimation({ active: true, anchor: { x: 0, y: 1 }, resources: content.iocFriskRightWaterJetpack }),
   up: new CosmosAnimation({ active: true, anchor: { x: 0, y: 1 }, resources: content.iocFriskUpWaterJetpack })
};

export const friskWaterJetpackOff = {
   down: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocFriskDownWaterJetpackOff ] }),
   left: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocFriskLeftWaterJetpackOff ] }),
   right: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocFriskRightWaterJetpackOff ] }),
   up: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocFriskUpWaterJetpackOff ] })
};

export const rgdragon = {
   down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.ionARgdragonDown }),
   left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.ionARgdragonLeft }),
   right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.ionARgdragonRight }),
   up: new CosmosSprite()
};

export const rgrabbit = {
   down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.ionARgrabbitDown }),
   left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.ionARgrabbitLeft }),
   right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.ionARgrabbitRight }),
   up: new CosmosSprite()
};

export const aerialisStates = {
   rooms: {} as Partial<CosmosKeyed<CosmosKeyed<any>>>,
   scripts: {} as Partial<CosmosKeyed<CosmosKeyed<any>>>
};

export const puzzle1target = 7;
export const puzzle2target = {
   get x () {
      return SAVE.data.n.plot < 58.1 ? 4 : SAVE.data.n.plot < 58.2 ? 7 : 5;
   },
   get y () {
      return SAVE.data.n.plot < 58.1 ? 1 : SAVE.data.n.plot < 58.2 ? -1 : -2;
   }
};

export const flowersampler = [
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
   0, 0, 16766244, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16766244, 16766244, 0, 0,
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16766244, 16766244, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
   0, 0, 0, 0, 0, 0, 0, 0, 16774662, 0, 0, 0, 0, 16766244, 16766244, 16766244, 16766244, 0, 0, 0, 16766244, 16766244, 0,
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16774662, 0, 0, 0, 0, 16766244, 16766244, 16766244, 16766244, 0, 0, 16766244,
   16766244, 16766244, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16774662, 16774662, 16774662, 0, 0, 0, 16766244, 16766244,
   16766244, 16766244, 0, 16766244, 16766244, 16766244, 0, 0, 0, 0, 0, 16774662, 16774662, 0, 0, 0, 0, 0, 16774662,
   16774662, 16774662, 0, 0, 0, 16766244, 16766244, 16766244, 14924822, 16766244, 16766244, 16766244, 16766244, 0, 0, 0,
   0, 0, 16774662, 16774662, 16774662, 16774662, 0, 0, 16774662, 16774662, 16774662, 16774662, 0, 0, 14924822, 16766244,
   16772483, 16766244, 0, 16766244, 16766244, 16766244, 0, 0, 0, 0, 0, 0, 0, 16774662, 16774662, 16774662, 16774662, 0,
   16774662, 16774662, 16774662, 16774662, 0, 16766244, 16766244, 0, 16772483, 16772483, 16766244, 16766244, 16766244,
   16766244, 0, 0, 0, 0, 0, 0, 0, 16774662, 16774662, 16774662, 16774662, 0, 16774662, 16766244, 16774662, 16774662, 0,
   16766244, 16766244, 16772483, 16772483, 16772483, 16772483, 16766244, 16766244, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16774662,
   16774662, 16774662, 16774662, 16766244, 16774662, 16774662, 16774662, 0, 16766244, 16766244, 16772483, 16772483,
   16772483, 16772483, 0, 14924822, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16774662, 16774662, 16774662, 16774662, 0, 16774662,
   16774662, 16774662, 0, 16766244, 16766244, 16766244, 16772483, 16772483, 16772483, 16766244, 16766244, 14924822, 0,
   0, 0, 0, 0, 0, 0, 0, 16766244, 16774662, 16774662, 16774662, 16772483, 16772483, 16766244, 0, 16774662, 0, 14924822,
   0, 16772483, 16772483, 16766244, 16766244, 16766244, 16766244, 16766244, 0, 0, 0, 0, 0, 0, 0, 0, 16766244, 16774662,
   16772483, 16772483, 16772483, 16774662, 16774662, 16774662, 16774662, 0, 16766244, 16766244, 16766244, 0, 16766244,
   16766244, 16766244, 16766244, 16766244, 0, 0, 0, 0, 0, 0, 16774662, 16774662, 0, 16772483, 16772483, 16772483,
   16774662, 16774662, 16774662, 16774662, 16774662, 0, 16766244, 16766244, 16766244, 14924822, 16766244, 16766244,
   16766244, 16766244, 16766244, 0, 0, 0, 0, 16774662, 16774662, 16774662, 16774662, 16772483, 16772483, 16772483,
   16774662, 16774662, 16774662, 16774662, 16774662, 16774662, 0, 16766244, 16766244, 0, 0, 16766244, 16766244,
   16766244, 16766244, 0, 0, 0, 0, 16774662, 16774662, 16774662, 16774662, 16774662, 16772483, 16774662, 16766244,
   16774662, 16774662, 16774662, 16774662, 16774662, 0, 16766244, 16766244, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16774662,
   16774662, 16774662, 16774662, 16774662, 0, 16774662, 16774662, 0, 16774662, 16774662, 0, 0, 0, 16766244, 16766244,
   16766244, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16774662, 16774662, 16774662, 16774662, 16766244, 16774662, 16774662, 16774662,
   16774662, 0, 0, 0, 0, 0, 16766244, 16766244, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16774662, 16774662, 0, 0, 0, 16774662,
   16774662, 16774662, 16774662, 0, 0, 0, 0, 0, 16766244, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16774662,
   16774662, 16774662, 16774662, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16774662, 16774662,
   16774662, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16774662, 16774662, 0, 0, 0, 0, 0,
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16774662, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

export async function operaShow (lizard: CosmosCharacter) {
   const shakeLoader = content.asShake.load();
   const cam = new CosmosObject({ position: renderer.region[0] });
   game.camera = cam;
   const lowOver = new CosmosAnimation({ resources: content.iooAShowglow, blend: BLEND_MODES.MULTIPLY });
   renderer.attach('above', lowOver);
   if (world.genocide) {
      await renderer.pause(850);
      await dialogue('dialoguerTop', ...text.a_aerialis.story.operaX1());
      await renderer.pause(450);
   } else if (!world.badder_lizard) {
      lizard.alpha.value = 1;
      lizard.position.set(20, 200);
      player.alpha.value = 1;
      await renderer.pause(1900);
      await dialogue('dialoguerTop', ...text.a_aerialis.story.opera13);
   } else {
      await renderer.pause(850);
   }
   lowOver.index = 1;
   sounds.noise.instance(renderer);
   if (!world.badder_lizard) {
      await renderer.pause(1650);
      renderer.pause(850).then(async () => {
         lizard.face = 'down';
      });
      await dialogue('dialoguerTop', ...text.a_aerialis.story.opera14a);
      await renderer.pause(650);
   } else {
      await renderer.pause(1250);
   }
   await dialogue(
      'dialoguerTop',
      ...(world.genocide ? text.a_aerialis.story.operaX2() : text.a_aerialis.story.opera14b)
   );
   renderer.pause(450).then(async () => {
      lizard.face = 'right';
   });
   world.genocide && (goatbro.metadata.override = true);
   await Promise.all([
      world.badder_lizard ? player.walk(renderer, 3, { x: world.genocide ? 247.5 : 240 }) : void 0,
      world.genocide ? goatbro.walk(renderer, 3, { x: 226.5 }) : void 0,
      cam.position.modulate(renderer, 2000, { x: 240 }),
      world.genocide ? void 0 : dialogue('dialoguerTop', ...text.a_aerialis.story.opera14c)
   ]);
   const metta = new OutertaleMultivisualObject(
      { position: { x: 355, y: player.position.y } },
      { anchor: { x: 0, y: 1 }, tint: world.genocide ? 0x959595 : void 0 }
   );
   metta.use(content.iocMettatonDressIdle);
   renderer.attach('main', metta);
   await renderer.pause(650);
   lowOver.index = 2;
   sounds.noise.instance(renderer);
   world.genocide && renderer.pause(850).then(() => (goatbro.face = 'down'));
   await antifreeze([ shakeLoader, renderer.pause(1250) ]);
   await dialogue(
      'dialoguerTop',
      ...(world.genocide ? text.a_aerialis.story.operaX3 : text.a_aerialis.story.opera15())
   );
   const operaMusic = (world.genocide ? music.operaAlt : music.opera).instance(renderer);
   let elapsed = 0;
   const secTicker = () => {
      elapsed += 1 / 30;
   };
   renderer.on('tick', secTicker);
   lowOver.alpha.modulate(renderer, 1350, 0).then(() => {
      renderer.detach('above', lowOver);
   });
   metta.use(content.iocMettatonDressPull);
   await renderer.pause(450);
   metta.animation.enable();
   await metta.position.step(renderer, 1, player.position.add(40, 0));
   metta.animation.reset();
   metta.use(content.iocMettatonDressIdle);
   metta.animation.index = 0;
   await renderer.pause(850);
   if (!world.badder_lizard) {
      await lizard.walk(renderer, 3, { x: game.camera.position.x - 160 });
   } else {
      await renderer.pause(450);
   }
   header('x1').then(() => (metta.animation.index = 6));
   header('x2').then(() => (metta.animation.index = 7));
   if (world.badder_lizard) {
      await renderer.pause(1850);
      await dialogue('dialoguerTop', ...text.a_aerialis.story.opera16b);
   } else {
      await dialogue(
         'dialoguerTop',
         ...(world.genocide ? text.a_aerialis.story.operaX4() : text.a_aerialis.story.opera16)
      );
   }
   !world.badder_lizard && lizard.walk(renderer, 3, { x: game.camera.position.x - 180 });
   renderer.pause(450).then(() => (metta.animation.index = 0));
   const operaText = new CosmosText({
      alpha: 0,
      position: { y: 60 },
      fill: 0xffffff,
      priority: -2,
      fontFamily: content.fDeterminationSans,
      fontSize: 32
   }).on('tick', function () {
      this.position.x += 0.1;
   });
   let syl = 0;
   let syllables = [] as string[];
   function updateSyllables (value: CosmosProvider<string>) {
      operaText.content = '';
      syl = 0;
      syllables = CosmosUtils.provide(value).split('|');
      operaText.position.x = 40;
      operaText.alpha.modulate(renderer, 500, 1);
   }
   async function showSyllable (value: string) {
      operaText.alpha.modulate(renderer, 0, 1);
      let ch = 0;
      while (ch < value.length) {
         operaText.content += value[ch];
         await renderer.pause(40);
         ch++;
      }
   }
   let seconds = 16;
   let romance = true;
   const sakuraPos = new CosmosPoint({ y: 0, x: -180 });
   const sakuraAngle = sakuraPos.angleTo({ x: 0, y: 240 });
   const sakuraGen = new CosmosObject({ position: sakuraPos, priority: -1 }).on('tick', function () {
      if (romance && Math.random() < 0.4) {
         const sakuraLeaf = new CosmosSprite({
            anchor: 0,
            frames: [ world.genocide ? content.iooADeadLeaf : content.iooASakuraLeaf ],
            spin: 3,
            position: { x: CosmosMath.remap(Math.random(), 0, sakuraPos.x * -1 + 320), y: -5 },
            velocity: CosmosMath.ray(sakuraAngle, CosmosMath.remap(Math.random(), 2, 3)),
            tint: world.genocide ? 0x959595 : void 0
         }).on('tick', () => {
            if (sakuraLeaf.position.y > 245) {
               this.objects.splice(this.objects.indexOf(sakuraLeaf), 1);
            }
         });
         this.attach(sakuraLeaf);
      }
   });
   const pulley = new CosmosAnimation({
      active: true,
      resources: SAVE.data.b.water ? content.iocAsrielEarTugWater : content.iocAsrielEarTug,
      position: goatbro,
      anchor: { x: 0, y: 1 },
      tint: 0x959595
   });
   while (seconds <= 80) {
      await renderer.when(() => seconds <= elapsed);
      const trueSeconds = (seconds - 16) * 2;
      switch (trueSeconds % 16) {
         case 0:
            switch (Math.floor(trueSeconds / 16)) {
               case 0:
                  renderer.attach('menu', operaText);
                  updateSyllables(text.a_aerialis.story.opera17);
                  metta.animation.index = 0;
                  world.genocide && renderer.pause(650).then(() => (player.face = 'down'));
                  metta.position.modulate(renderer, 2000, player.position.add(40, 30));
                  break;
               case 1:
                  updateSyllables(text.a_aerialis.story.opera19);
                  metta.animation.index = 0;
                  metta.position.modulate(renderer, 2000, player.position.add(40, -20));
                  break;
               case 2:
                  updateSyllables(text.a_aerialis.story.opera21);
                  metta.animation.index = 0;
                  metta.position.modulate(renderer, 2500, player.position.add(-60, -30));
                  break;
               case 3:
                  updateSyllables(text.a_aerialis.story.opera23);
                  metta.animation.index = 0;
                  metta.position.modulate(renderer, 2500, player.position.add(-60, 25));
                  break;
               case 4:
                  renderer.attach('menu', sakuraGen);
                  updateSyllables(text.a_aerialis.story.opera25);
                  metta.animation.index = world.genocide ? 10 : 0;
                  metta.position.modulate(renderer, 3000, player.position.add(-50, 35));
                  (world.genocide || !world.badder_lizard) &&
                     renderer.pause(500).then(async () => {
                        if (world.genocide) {
                           player.walk(renderer, 0.25, { x: 240 });
                           await renderer.pause(350);
                           await dialogue('dialoguerBottom', ...text.a_aerialis.story.operaY1);
                           renderer.detach('main', player, goatbro);
                           renderer.attach('main', pulley);
                           player.face = 'down';
                        } else {
                           dialogue('dialoguerBottom', ...text.a_aerialis.story.opera25a());
                        }
                     });
                  break;
               case 5:
                  updateSyllables(text.a_aerialis.story.opera27);
                  metta.animation.index = world.genocide ? 3 : 6;
                  metta.position.modulate(renderer, 1500, player.position.add(45, 30));
                  world.genocide &&
                     renderer.pause(1000).then(async () => {
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.operaY2);
                     });
                  break;
               case 6:
                  updateSyllables(text.a_aerialis.story.opera29);
                  metta.animation.index = 8;
                  metta.position.modulate(renderer, 2000, player.position.add(30, -20));
                  world.genocide &&
                     renderer.pause(1000).then(async () => {
                        SAVE.flag.b.asriel_earpull = true;
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.operaY3);
                        renderer.detach('main', pulley);
                        renderer.attach('main', player, goatbro);
                        await goatbro.walk(renderer, 1, { x: player.position.x - 21 });
                        await renderer.pause(1450);
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.operaY4);
                        goatbro.face = 'down';
                     });
                  break;
               case 7:
                  updateSyllables(text.a_aerialis.story.opera31);
                  metta.position.modulate(renderer, 2000, player.position.add(35, 0));
                  !world.badder_lizard &&
                     renderer.pause(1500).then(() => {
                        dialogue('dialoguerBottom', ...text.a_aerialis.story.opera31a);
                     });
                  break;
            }
            break;
         case 7:
            switch (Math.floor(trueSeconds / 16)) {
               case 0:
                  updateSyllables(text.a_aerialis.story.opera18);
                  metta.animation.index = world.genocide ? 3 : 10;
                  metta.position.modulate(renderer, 3000, player.position.add(70, 0));
                  break;
               case 1:
                  updateSyllables(text.a_aerialis.story.opera20);
                  metta.animation.index = world.genocide ? 7 : 3;
                  metta.position.modulate(renderer, 2500, player.position.add(20, -10));
                  !world.badder_lizard &&
                     renderer.pause(500).then(() => {
                        dialogue('dialoguerBottom', ...text.a_aerialis.story.opera20a());
                     });
                  break;
               case 2:
                  updateSyllables(text.a_aerialis.story.opera22);
                  metta.animation.index = world.genocide ? 6 : 10;
                  metta.position.modulate(renderer, 3000, player.position.add(-80, 25));
                  break;
               case 3:
                  updateSyllables(text.a_aerialis.story.opera24);
                  metta.animation.index = world.genocide ? 6 : 2;
                  metta.position.modulate(renderer, 3500, player.position.add(-40, 15));
                  break;
               case 4:
                  updateSyllables(text.a_aerialis.story.opera26);
                  metta.animation.index = 10;
                  metta.position.modulate(renderer, 3000, player.position.add(20, 35));
                  break;
               case 5:
                  updateSyllables(text.a_aerialis.story.opera28);
                  metta.animation.index = world.genocide ? 2 : 7;
                  metta.position.modulate(renderer, 3500, player.position.add(70, -20));
                  !world.badder_lizard &&
                     renderer.pause(3500).then(() => {
                        dialogue('dialoguerBottom', ...text.a_aerialis.story.opera28a());
                     });
                  break;
               case 6:
                  updateSyllables(text.a_aerialis.story.opera30);
                  metta.animation.index = 9;
                  metta.position.modulate(renderer, 2000, player.position.add(50, 0));
                  world.genocide ||
                     renderer.pause(1000).then(() => {
                        sounds.shake.instance(renderer).gain.value /= 4;
                        shake(1, 200);
                     });
                  break;
               case 7:
                  updateSyllables(text.a_aerialis.story.opera32);
                  metta.animation.index = 1;
                  world.genocide ||
                     renderer.pause(1000).then(() => {
                        sounds.shake.instance(renderer).gain.value /= 3;
                        shake(1, 300);
                     });
                  break;
            }
            break;
         case 5:
         case 14:
            operaText.alpha.modulate(renderer, 1000, 0);
            break;
      }
      syl < syllables.length && showSyllable(syllables[syl++]);
      seconds += 0.5;
   }
   renderer.off('tick', secTicker);
   romance = false;
   await renderer.pause(1000);
   let shk = null as CosmosInstance | null;
   if (!world.genocide) {
      shk = sounds.shake.instance(renderer);
      shk.gain.value /= 2;
      shake(1, 400);
   }
   await renderer.pause(2000);
   renderer.detach('menu', operaText);
   if (world.genocide) {
      metta.animation.index = 0;
      header('x1').then(() => (metta.animation.index = 7));
      header('x2').then(() => (metta.animation.index = 6));
   }
   if (world.genocide) {
      metta.animation.index = 0;
      await metta.position.step(renderer, 1, { x: 285, y: 180 });
   }
   await dialogue(
      'dialoguerTop',
      ...(world.genocide ? text.a_aerialis.story.operaX5() : text.a_aerialis.story.opera33())
   );
   shk?.stop();
   content.asShake.unload();
   if (!world.badder_lizard) {
      lizard.walk(renderer, 3, { x: game.camera.position.x - 140 });
      header('x1').then(() => (metta.animation.index = 5));
      header('x2').then(() => (metta.animation.index = 4));
   }
   if (world.genocide || world.killed5) {
      while (world.population > 0) {
         world.bully();
         SAVE.data.n.evac_aerialis++;
      }
   }
   if (world.genocide) {
      operaMusic.stop();
      renderer.detach('main', metta);
      sounds.noise.instance(renderer);
      temporary(
         new CosmosHitbox({
            position: { x: 285, y: 180 },
            tint: 0x959595,
            anchor: { x: 0, y: 1 },
            size: { x: 57, y: 6 },
            metadata: { barrier: true, interact: true, name: 'trivia', args: [ 'deadbot' ] },
            objects: [
               new CosmosAnimation({ resources: content.iocMettatonDressIdle, index: 12, anchor: { x: 0, y: 1 } })
            ]
         }),
         'main'
      );
      await renderer.pause(1950);
      await dialogue('dialoguerTop', ...text.a_aerialis.story.operaX7);
      goatbro.metadata.override = false;
      tracker.supplant('right');
   } else {
      battler.load(groups.glyde);
      const azzets = new CosmosInventory(
         inventories.iocNapstablook,
         inventories.iocNapstablookAlter,
         content.avNapstablook,
         content.ionODummy,
         content.ionODummyMad,
         content.ionODummyGlad,
         content.ionODummyRage,
         content.ionODummyBlush,
         SAVE.data.b.oops ? content.amLab : content.amCharacutscene,
         content.iocMettatonSeriouspose
      );
      azzets.name = 'azzets';
      const azzLoder = SAVE.data.b.a_state_hapstablook && azzets.load();
      await dialogue('dialoguerTop', ...text.a_aerialis.story.opera34());
      const fd = fader({ fill: 0xffffff });
      sounds.boom.instance(renderer);
      await fd.alpha.modulate(renderer, SAVE.flag.b.$option_epilepsy ? 300 : 150, 1);
      await renderer.pause(SAVE.flag.b.$option_epilepsy ? 850 : 1000);
      fd.fill = 0;
      operaMusic.stop();
      await battler.encounter(player, groups.glyde, false);
      if (SAVE.data.b.killed_glyde) {
         updateBadLizard();
         renderer.detach('main', lizard);
      }
      metta.use(content.iocMettatonMicrophone);
      renderer.detach('menu', fd);
      await renderer.pause(2000);
      let escaped = false;
      let camready = false;
      const headerListener = (h: string) => {
         switch (h) {
            case 'x0':
               speech.targets.add(metta.animation);
               metta.use(content.iocMettatonShrug);
               break;
            case 'x1':
               metta.use(content.iocMettatonDotdotdot);
               break;
            case 'x2':
               metta.use(content.iocMettatonLaugh);
               break;
            case 'x3':
               metta.use(content.iocMettatonPoint);
               break;
            case 'x4':
               speech.targets.delete(metta.animation);
               metta.use(content.iocMettatonRollRight);
               metta.animation.enable();
               const baseX = game.camera.position.clamp(...renderer.region).x;
               if (SAVE.data.b.a_state_hapstablook) {
                  metta.position.step(renderer, 5, { x: baseX + 135 }).then(async () => {
                     metta.animation.reset();
                     await notifier(new CosmosEntity({ position: metta }), false, metta.sprite.compute().y);
                     metta.metadata.sus = true;
                  });
               } else {
                  metta.position.step(renderer, 5, { x: baseX + 195 }).then(() => {
                     renderer.detach('main', metta);
                     escaped = true;
                  });
               }
               break;
            case 'x5':
               lizard.face = 'up';
               break;
            case 'x6':
               lizard.face = 'down';
               break;
         }
      };
      typer.on('header', headerListener);
      await dialogue('dialoguerTop', ...text.a_aerialis.story.opera35());
      if (SAVE.data.b.a_state_hapstablook) {
         typer.off('header', headerListener);
         await renderer.when(() => metta.metadata.sus);
         await Promise.all([ azzLoder, renderer.pause(850) ]);
         metta.use(content.iocMettatonSeriouspose);
         speech.emoters.mettaton = metta.animation;
         metta.animation.index = 0;
         const napsta = character('napstablook', characters.napstablook, { x: 440, y: 180 }, 'left');
         await cam.position.modulate(renderer, 800, { x: 320 });
         await renderer.pause(1000);
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta36());
         await renderer.pause(650);
         napsta.face = 'down';
         await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta37());
         if (SAVE.data.b.killed_glyde || SAVE.data.b.bad_lizard) {
            SAVE.data.b.a_state_hapstablook = false;
            headerListener('x4');
         } else {
            await renderer.pause(1000);
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta38);
            await renderer.pause(850);
            napsta.face = 'left';
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta39);
            await renderer.pause(1250);
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta40);
            await renderer.pause(450);
            napsta.face = 'down';
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta41);
            await renderer.pause(650);
            metta.position.modulate(renderer, 1000, { x: metta.position.x - 30 });
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta42);
            const finalghost = character('finalghost', characters.finalghost, { x: 470, y: 205 }, 'left', {
               alpha: 0
            });
            finalghost.alpha.modulate(renderer, 300, 1).then(() => finalghost.walk(renderer, 3, { x: 410 }));
            await renderer.pause(450);
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta43);
            napsta.face = 'left';
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta44);
            await renderer.pause(850);
            lizard.walk(renderer, 3, { x: 185 });
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta45);
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta46);
            lizard.face = 'up';
            const time = renderer.time;
            const dummy = new CosmosAnimation({
               index: 0,
               anchor: { x: 0, y: 1 },
               resources: content.ionODummyMad,
               position: { x: 150, y: 155 },
               scale: { x: -1 }
            }).on('tick', () => {
               dummy.offsets[0].y = CosmosMath.wave(((renderer.time - time) % 4000) / 4000) * -2;
            });
            renderer.attach('main', dummy);
            dummy.position.step(renderer, 2, dummy.position.add(60, 0));
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta47);
            lizard.face = 'down';
            await renderer.pause(850);
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta48);
            await renderer.pause(1250);
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta49a);
            await Promise.all([
               metta.position.step(renderer, 1, metta.position.subtract(50, 0)),
               dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta49b)
            ]);
            napsta.walk(renderer, 2, { x: napsta.position.x - 40 });
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta50);
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta51a);
            lizard.face = 'right';
            metta.position.step(renderer, 1, metta.position.add(0, 30));
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta51b);
            await renderer.pause(850);
            napsta.walk(renderer, 2, { x: metta.position.x + 50 });
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta52);
            dummy.use(content.ionODummy);
            await renderer.pause(650);
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta53);
            await renderer.pause(850);
            napsta.face = 'left';
            finalghost.walk(renderer, 2, { x: 380 });
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta54);
            napsta.face = 'down';
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta55a);
            finalghost.face = 'down';
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta55b);
            await renderer.pause(850);
            napsta.face = 'right';
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta56);
            await renderer.pause(450);
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta57a);
            napsta.face = 'down';
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta57b);
            await renderer.pause(650);
            finalghost.walk(renderer, 1, { x: 360 });
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta58);
            napsta.face = 'left';
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta59);
            await renderer.pause(850);
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta60);
            dummy.position.step(renderer, 2, { y: (player.position.y + lizard.position.y) / 2 });
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta61);
            finalghost.face = 'down';
            await renderer.pause(1250);
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta62);
            await renderer.pause(2250);
            napsta.face = 'down';
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta63);
            dummy.use(content.ionODummyBlush);
            await renderer.pause(1250);
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta64);
            finalghost.face = 'up';
            await renderer.pause(850);
            renderer.pause(650).then(() => (finalghost.face = 'left'));
            await Promise.all([
               napsta.walk(renderer, 1, { x: napsta.position.x + 40 }),
               dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta65a)
            ]);
            napsta.face = 'up';
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta65b);
            napsta.walk(renderer, 1, { x: napsta.position.x - 40 });
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta65c);
            await renderer.pause(1250);
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta66a);
            dummy.use(content.ionODummy);
            dummy.scale.x = 1;
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta66b);
            await renderer.pause(650);
            napsta.face = 'down';
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta67);
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta68a);
            napsta.face = 'left';
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta68b);
            dummy.scale.x = -1;
            dummy.use(content.ionODummyMad);
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta68c);
            metta.position.step(renderer, 3, { y: 160 }).then(async () => {
               await metta.position.step(renderer, 3, { x: 470 });
               await metta.alpha.modulate(renderer, 300, 0);
               renderer.detach('main', metta);
            });
            await renderer.pause(650);
            dummy.position.step(renderer, 2, { x: finalghost.position.x - 50 });
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta69);
            await renderer.pause(1650);
            finalghost.face = 'down';
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta70);
            await renderer.pause(650);
            napsta.walk(renderer, 1, { x: 320 });
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta71);
            await renderer.pause(650);
            dummy.scale.x = 1;
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta72);
            dummy.position.step(renderer, 3, { x: 150 }).then(async () => {
               await dummy.alpha.modulate(renderer, 300, 0);
               renderer.detach('main', dummy);
            });
            await renderer.pause(350);
            finalghost.face = 'left';
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta73);
            finalghost.face = 'down';
            await renderer.pause(650);
            finalghost.walk(renderer, 3, { x: 470 }).then(async () => {
               await finalghost.alpha.modulate(renderer, 300, 0);
               renderer.detach('main', finalghost);
            });
            await renderer.pause(850);
            napsta.walk(renderer, 2, { y: lizard.position.y });
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta74);
            if (SAVE.data.b.oops) {
               await renderer.pause(350);
               await lizard.walk(renderer, 3, { x: napsta.position.x - 30 });
            } else {
               await renderer.pause(850);
            }
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta75());
            await renderer.pause(850);
            napsta.face = 'left';
            SAVE.data.b.oops || (await napsta.walk(renderer, 3, { x: lizard.position.x + 30 }));
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta76);
            await renderer.pause(850);
            await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta77);
         }
         await napsta.alpha.modulate(renderer, 500, 0);
         renderer.detach('main', napsta);
         cam.position.modulate(renderer, 1600, { x: player.position.x }).then(() => {
            camready = true;
         });
         typer.on('header', headerListener);
      } else {
         camready = true;
      }
      azzets.unload();
      let gib = true;
      if (!SAVE.data.b.killed_glyde && !world.badder_lizard) {
         await renderer.pause(1450);
         await lizard.walk(renderer, 3, { x: player.position.x });
         if (world.bad_lizard < 1) {
            await lizard.walk(renderer, 3, { y: player.position.y + 25 });
            lizard.face = 'up';
            typer.off('header', headerListener);
         } else {
            await renderer.pause(1000);
         }
         await dialogue('dialoguerTop', ...text.a_aerialis.story.opera36a());
         if (
            !SAVE.data.b.failshow &&
            SAVE.data.b.item_tvm_mewmew &&
            (SAVE.storage.inventory.has('tvm_mewmew') ||
               SAVE.storage.dimboxA.has('tvm_mewmew') ||
               SAVE.storage.dimboxB.has('tvm_mewmew'))
         ) {
            if (choicer.result === 0) {
               if (SAVE.storage.inventory.has('tvm_mewmew')) {
                  SAVE.storage.inventory.remove('tvm_mewmew');
               } else if (SAVE.storage.dimboxA.has('tvm_mewmew')) {
                  SAVE.storage.dimboxA.remove('tvm_mewmew');
               } else {
                  SAVE.storage.dimboxB.remove('tvm_mewmew');
               }
               await dialogue('dialoguerTop', ...text.a_aerialis.story.opera36b1);
            } else {
               gib = false;
               await dialogue('dialoguerTop', ...text.a_aerialis.story.opera36b2);
            }
         }
      } else {
         await renderer.when(() => escaped && camready);
      }
      typer.off('header', headerListener);
      if (!SAVE.data.b.killed_glyde && !world.badder_lizard) {
         if (world.bad_lizard === 1) {
            await renderer.pause(450);
            lizard.face = 'left';
            await renderer.pause(750);
         } else {
            lizard.face = 'left';
         }
         if (world.bad_lizard < 1) {
            await lizard.walk(renderer, 3, { x: game.camera.position.clamp(...renderer.region).x - 140 });
            await renderer.pause(450);
            lizard.face = 'right';
            await renderer.pause(750);
            await dialogue('dialoguerTop', ...text.a_aerialis.story.opera37(gib));
            await renderer.pause(1150);
            if (!SAVE.data.b.oops) {
               dialogue('dialoguerTop', ...text.a_aerialis.story.opera38).then(async () => {
                  game.movement = true;
                  game.music = null;
                  SAVE.data.n.plot = 65;
                  game.camera = player;
                  quickresume();
               });
               return;
            }
         }
      }
   }
   game.movement = true;
   game.music = null;
   SAVE.data.n.plot = 65;
   game.camera = player;
   quickresume();
   SAVE.data.n.evac_aerialis > 0 && (await dialogue('auto', ...text.a_aerialis.evac));
   if (SAVE.data.b.killed_glyde && !world.badder_lizard) {
      while ([ 'a_auditorium', '_void' ].includes((await events.on('teleport'))[1])) {}
      teleporter.movement = false;
      await dialogue('auto', ...text.a_aerialis.afear);
      game.movement = true;
   }
}

export function rampup () {
   for (const RAMpup of instances('below', 'rampup')) {
      for (const obbie of RAMpup.object.objects) {
         if (obbie instanceof CosmosAnimation) {
            obbie.reverse = true;
         }
      }
   }
}

export function lizard (
   pos: CosmosPointSimple,
   face: CosmosDirection,
   { barrier = true, interact = true, script = 'lablizard', args = [] as string[] } = {}
) {
   return temporary(
      character('alphys', characters.alphys, pos, face, {
         metadata: { barrier, interact, name: 'aerialis', args: [ script, ...args ] },
         size: { x: 18, y: 20 },
         anchor: { x: 0, y: 1 }
      }),
      'main'
   );
}

export function partyShift ({ x = 0, y = 0 }) {
   player.position.x += x;
   player.position.y += y;
   player.metadata.x += x;
   player.metadata.y += y;
   for (const entry of tracker.history) {
      entry[1].x += x;
      entry[1].y += y;
   }
}

export async function barricadeFail1 () {
   Promise.race([ renderer.pause(20e3), renderer.when(() => game.room === 'a_path3') ]).then(async () => {
      SAVE.data.n.plot = 54;
      await renderer.when(() => game.movement && !battler.active && game.room !== '_void');
      sounds.phone.instance(renderer);
      await dialogue(
         'auto',
         ...text.a_aerialis.story.barricadeFail2,
         ...(game.room === 'a_barricade1' ? [] : text.a_aerialis.story.barricadeFail2x),
         ...text.a_aerialis.story.barricadeFail3
      );
   });
}

export const spire = new CosmosSprite({
   anchor: { y: 0 },
   frames: [ content.iooAPrimespire ],
   priority: -99999,
   metadata: { min: -Infinity, max: Infinity },
   parallax: 1,
   filters: [ new AdvancedBloomFilter({ threshold: 0.2, bloomScale: 0.6, brightness: 1, quality: 10 }) ]
}).on('tick', function () {
   const exterior = spireRooms[game.room as AerialisRoomKey];
   if (exterior) {
      const gc = game.camera.position.clamp(...renderer.region);
      gc.x = Math.min(Math.max(gc.x, this.metadata.min), this.metadata.max);
      this.tint = CosmosImageUtils.gradient(
         0,
         0x9f9f9f,
         game.room === 'f_battle' ? 0.4 : game.room === 'f_exit' ? 0.6 : 0.8
      );
      this.scale.set(1 / renderer.zoom.value);
      this.position.set(
         this.scale.multiply(CosmosMath.remap(exterior.x + gc.x, 0, -80, 0, 6400) - 160, [ -60, 0, 60 ][exterior.height])
      );
   } else {
      renderer.detach('below', this);
   }
});

export const aurora = new CosmosObject({
   area: renderer.area,
   filters: (() => {
      const godray = new GodrayFilter({ angle: 180, alpha: 0.3 });
      godray.blendMode = BLEND_MODES.ADD;
      const matrix = new ColorMatrixFilter();
      matrix.tint(10727679);
      return [ godray, matrix ];
   })()
}).on('tick', function () {
   const exterior = spireRooms[game.room as AerialisRoomKey];
   if (exterior) {
      this.alpha.value = game.room === 'f_battle' ? 0.4 : game.room === 'f_exit' ? 0.7 : 1;
      (this.filters![0] as GodrayFilter).time += 1 / 100;
   } else {
      renderer.detach('base', this);
   }
});

export function updateObjects (
   dark = SAVE.data.n.plot < 49 ||
      SAVE.data.b.svr ||
      world.runaway ||
      world.bad_lizard > 1 ||
      SAVE.data.n.state_foundry_undyne === 2
) {
   if (dark) {
      player.tint = tints.dark02;
      renderer.layers.below.objects[0].tint = tints.dark02;
      rooms.of(game.room).metadata.dark02 = true;
      for (const inst of [ ...instances('below', 'darkish'), ...instances('main', 'darkish') ]) {
         inst.object.tint = tints.dark02;
      }
   } else {
      player.tint = void 0;
      renderer.layers.below.objects[0].tint = void 0;
      rooms.of(game.room).metadata.dark02 = false;
      for (const inst of [ ...instances('below', 'darkish'), ...instances('main', 'darkish') ]) {
         inst.object.tint = void 0;
      }
   }
}

export const areaA = {
   tick () {},
   scripts: {
      async wish2 (a, b, c) {
         if (!game.movement) {
            return;
         }
         const inst = instance('main', 'a_reg');
         if (inst && interactionCheck(inst.object.objects[1] as CosmosHitbox)) {
            return;
         }
         await dialogue('auto', ...text.a_aerialis.trivia.a_wishflower(true));
      },
      async coreterminal () {
         if (!game.movement) {
            return;
         }
         game.movement = false;
         await dialogue('auto', ...text.a_aerialis.coreterminal());
         if (world.meanie && !world.genocide && world.badder_lizard) {
            if (choicer.result === 0) {
               await dialogue('auto', ...text.a_aerialis.termsmash2);
               const whitefader = fader(
                  { fill: 0xffffff, size: 1000, anchor: 0, position: { x: 160, y: 120 } },
                  'menu'
               );
               await whitefader.alpha.modulate(renderer, SAVE.flag.b.$option_epilepsy ? 300 : 150, 1);
               sounds.stab.instance(renderer);
               await renderer.pause(SAVE.flag.b.$option_epilepsy ? 450 : 600);
               battler.SOUL.position.set(renderer.projection(player.position.subtract(0, 15), game.camera.position));
               battler.defeat();
               return;
            } else {
               await dialogue('auto', ...text.a_aerialis.termsmash1);
            }
         }
         game.movement = true;
      },
      async DINNERTIME (a, b, c) {
         if (!game.movement) {
            return;
         }
         game.movement = false;
         const inst = instance('main', 'hotelfood');
         if (inst && interactionCheck(inst.object.objects[0] as CosmosHitbox)) {
            await dialogue('auto', ...text.a_aerialis.hotelfood0());
            if (choicer.result === 0) {
               if (SAVE.storage.inventory.size < 8) {
                  saver.add('mystery_food');
                  sounds.equip.instance(renderer);
                  inst.destroy();
                  SAVE.data.b.a_state_hotelfood = false;
                  await dialogue('auto', ...text.a_aerialis.hotelfood1());
               } else {
                  await dialogue('auto', ...text.a_aerialis.hotelfood2);
               }
            } else {
               await dialogue('auto', ...text.a_aerialis.hotelfood3);
            }
         } else {
            await dialogue('auto', ...text.a_aerialis.overworld.DINNERTIME());
         }
         game.movement = true;
      },
      async boop (scriptState) {
         if (!game.movement) {
            return;
         }
         if (SAVE.data.b.svr) {
            let nuzzle = false;
            if (270 <= player.position.y && 270 <= goatbroTrue.position.y && Math.abs(260 - player.position.x) < 10) {
               nuzzle = true;
            }
            if (nuzzle) {
               if (!scriptState.nuzzle) {
                  scriptState.nuzzle = true;
                  await dialogue('auto', ...text.a_aerialis.overworld.nuzzle());
               }
            } else if (scriptState.nuzzle) {
               scriptState.nuzzle = false;
            }
         } else if (world.goatbro) {
            let boop = false;
            if (270 <= player.position.y && 270 <= goatbro.position.y && Math.abs(260 - player.position.x) < 10) {
               boop = true;
            }
            if (boop) {
               if (!scriptState.boop) {
                  scriptState.boop = true;
                  await dialogue('auto', ...text.a_aerialis.overworld.boop());
               }
            } else if (scriptState.boop) {
               scriptState.boop = false;
            }
         }
      },
      async riverboi () {
         if (!game.movement || player.face !== 'left') {
            return;
         }
         const inst = instance('below', 'riverboi_x')!;
         if (SAVE.data.b.ubershortcut || (SAVE.data.n.plot < 65 && game.room === 'a_lookout')) {
            await inst.talk('a', talkFinder(), 'auto', ...text.a_aerialis.riverboi4);
            return;
         }
         game.movement = false;
         if (SAVE.data.n.plot < 65) {
            await inst.talk('a', talkFinder(), 'auto', ...text.a_aerialis.riverboi3());
         } else {
            await inst.talk('a', talkFinder(), 'auto', ...text.a_aerialis.riverboi1());
         }
         const targie =
            SAVE.data.n.plot < 65
               ? [ 'a_lookout', game.room ][choicer.result]
               : [ 'w_wonder', 's_taxi', 'f_taxi', 'a_lookout' ][choicer.result];
         if (game.room !== targie) {
            const origin = inst.object.position.value();
            let vert = 1;
            const instRealY = renderer.projection(inst.object, game.camera.position).y;
            const filter1 = new MotionBlurFilter([ 0, 0 ], 7, 0);
            const shaker = new CosmosValue();
            const taxitop = inst.object.metadata.taxitop as CosmosSprite;
            const tickie1 = () => {
               const oY = shaker.value * vert;
               inst.object.objects[0].offsets[0].y = oY;
               taxitop.offsets[0].y = oY;
               player.sprite.offsets[0].y = oY;
               vert *= -1;
               filter1.velocity.y = shaker.value * 4;
            };
            renderer.detach('main', player);
            player.position.set(player.position.subtract(inst.object));
            inst.object.attach(player);
            inst.object.filters = [ filter1 ];
            inst.object.on('tick', tickie1);
            renderer.detach('main', taxitop);
            renderer.attach('below', taxitop);
            taxitop.priority.value = -1;
            renderer.tick();
            shaker.modulate(renderer, 3000, 0, 2, 10);
            sounds.warp_in.instance(renderer);
            await renderer.pause(2700);
            const fd = fader({ fill: 0xffffff });
            await fd.alpha.modulate(renderer, 300, 1);
            inst.object.off('tick', tickie1);
            renderer.detach('below', taxitop);
            inst.object.filters = null;
            inst.object.objects[0].offsets[0].y = 0;
            taxitop.offsets[0].y = 0;
            player.sprite.offsets[0].y = 0;
            await teleport('_taxi', player.face, player.position.x, player.position.y, { fade: false, fast: true });
            const basefd = fader({ alpha: 1 }, 'base');
            const shadbox = temporary(new CosmosObject({ priority: -7000 }), 'below');
            const basefaze = new CosmosValue();
            const filter2 = new ColorMatrixFilter();
            filter2.brightness(8, false);
            const filter3 = new MotionBlurFilter([ 24, 0 ], 7, 0);
            const basestar1 = new CosmosObject({
               position: { x: -320 },
               metadata: {
                  par: basic.metadata.par,
                  collections: basic.metadata.collections,
                  get time () {
                     return basic.metadata.time;
                  },
                  set time (v) {},
                  graphics: new Graphics(),
                  get positions () {
                     return basic.metadata.positions;
                  }
               }
            }).on('tick', basic.events.tick!.handlers[0]);
            basestar1.container.addChild(basestar1.metadata.graphics);
            const basestar2 = new CosmosObject({
               metadata: {
                  par: basic.metadata.par,
                  collections: basic.metadata.collections,
                  get time () {
                     return basic.metadata.time;
                  },
                  set time (v) {},
                  graphics: new Graphics(),
                  get positions () {
                     return basic.metadata.positions;
                  }
               }
            }).on('tick', basic.events.tick!.handlers[0]);
            basestar2.container.addChild(basestar2.metadata.graphics);
            const basestar = new CosmosObject({
               priority: -40000,
               area: renderer.area,
               filters: [ filter2, filter3 ],
               objects: [ basestar1, basestar2 ]
            }).on('tick', function () {
               this.position.x = basefaze.value;
            });
            renderer.attach('below', basestar, inst.object);
            renderer.attach('main', taxitop);
            inst.object.position.set(160, instRealY);
            taxitop.position.set(160, instRealY);
            const mr = 12;
            const time = renderer.time;
            const tickie2 = () => {
               inst.object.position.y = sineWaver(time, 1000, instRealY, instRealY + 10);
               quickshadow(inst.object.objects[0] as CosmosSprite, inst.object, shadbox, void 0, 1.1, 0.05).velocity.x =
                  mr;
               quickshadow(player.sprite, inst.object.position.add(player), shadbox, void 0, 1.1, 0.05).velocity.x = mr;
               quickshadow(taxitop, inst.object, shadbox, void 0, 1.1, 0.05).velocity.x = mr;
               basefaze.value += mr;
               if (320 <= basefaze.value) {
                  basefaze.value = 0;
               }
            };
            inst.object.on('tick', tickie2);
            const ws = sounds.warp_speed.instance(renderer);
            ws.gain.value = 0;
            await ws.gain.modulate(renderer, 500, ws.daemon.gain);
            await fd.alpha.modulate(renderer, 300, 0);
            await renderer.pause(2500);
            if (world.runaway) {
               await dialogue('auto', ...text.a_aerialis.riverboi2x);
            } else {
               await dialogue('auto', ...text.a_aerialis.riverboi2());
            }
            await renderer.pause(2500);
            await Promise.all([ fd.alpha.modulate(renderer, 500, 1), ws.gain.modulate(renderer, 500, 0) ]);
            ws.stop();
            inst.object.detach(player);
            inst.object.off('tick', tickie2);
            renderer.detach('below', basestar, inst.object);
            inst.object.position.set(origin);
            renderer.detach('main', taxitop);
            renderer.detach('base', basefd);
            const tu = events.on('teleport-update');
            const te = events.on('teleport', 9999999);
            teleport(targie, player.face, player.position.x, player.position.y, { fade: false, fast: true });
            await tu;
            switch (game.room) {
               case 'w_wonder':
                  instance('main', 'w_goner')?.destroy();
                  break;
               case 'a_lookout':
                  instance('main', 'warpmarker')?.destroy();
                  break;
               case 's_taxi':
                  (world.genocide || SAVE.data.b.svr || world.runaway) && (instance('main', 's_vegetoid')!.index = 3);
                  break;
            }
            await te;
            const finalinst = instance('below', 'riverboi_x')!;
            const finaltaxitop = finalinst.object.metadata.taxitop;
            renderer.detach('main', finaltaxitop);
            renderer.attach('below', finaltaxitop);
            finaltaxitop.priority.value = -1;
            const tickie3 = () => {
               const oY = shaker.value * vert;
               finalinst.object.objects[0].offsets[0].y = oY;
               finaltaxitop.offsets[0].y = oY;
               player.sprite.offsets[0].y = oY;
               vert *= -1;
               filter1.velocity.y = shaker.value * 4;
            };
            renderer.attach('below', player);
            player.priority.value = finalinst.object.priority.value + 1;
            player.position.set(player.position.add(finalinst.object));
            finalinst.object.filters = [ filter1 ];
            finalinst.object.on('tick', tickie3);
            fd.alpha.modulate(renderer, 300, 0).then(() => {
               renderer.detach('menu', fd);
            });
            sounds.warp_out.instance(renderer);
            await shaker.modulate(renderer, 3000, 2, 0, 0);
            finalinst.object.off('tick', tickie3);
            finalinst.object.filters = null;
            finalinst.object.objects[0].offsets[0].y = 0;
            finaltaxitop.offsets[0].y = 0;
            player.sprite.offsets[0].y = 0;
            renderer.detach('below', player, finaltaxitop);
            renderer.attach('main', player, finaltaxitop);
            player.priority.value = 0;
            finaltaxitop.priority.value = 0;
            renderer.tick();
            player.parent = null;
         }
         game.movement = true;
      },
      async mtttrivia (roomState: AerialisRS['a_mettaton1'], scriptState, key) {
         const mtt = SAVE.data.n.plot === 55.1 && !roomState.danger && !world.genocide && !scriptState[key];
         await trivia(...text.a_aerialis.trivia[key as keyof typeof text.a_aerialis.trivia & `lab${string}`](mtt));
         mtt && (scriptState[key] = true);
      },
      async moonpie () {
         if (!game.movement) {
            return;
         }
         if (SAVE.storage.inventory.size < 8) {
            sounds.equip.instance(renderer);
            saver.add('moon_pie');
            SAVE.data.b.item_moonpie = true;
            instance('main', 'moonpie')?.destroy();
            await dialogue('auto', ...text.a_aerialis.moonpie1());
         } else {
            await dialogue('auto', ...text.a_aerialis.moonpie2);
         }
      },
      async bedsleeper () {
         if (game.movement && player.face !== 'up') {
            game.movement = false;
            const roombed = instance('main', 'roombed')!.object;
            const left = player.position.x < roombed.position.x;
            const fd = fader();
            await fd.alpha.modulate(renderer, 1000, 1);
            if (SAVE.data.b.svr || world.goatbro) {
               player.position.set(roombed.position.x - 5, 141);
               player.face = 'right';
               if (SAVE.data.b.svr) {
                  goatbroTrue.metadata.override = true;
                  goatbroTrue.position.set(roombed.position.x + 5, 141);
                  goatbroTrue.face = 'left';
                  goatbroTrue.sprite.reset();
               } else {
                  goatbro.metadata.override = true;
                  goatbro.position.set(roombed.position.x + 5, 141);
                  goatbro.face = 'left';
                  goatbro.sprite.reset();
               }
            } else {
               player.position.set(roombed.position.x, 141);
               player.face = 'down';
            }
            await renderer.pause(1000);
            const bedcover = new CosmosSprite({
               anchor: { x: 0, y: 1 },
               frames: [ content.iooARoombedCover ],
               position: roombed,
               priority: 10000,
               tint: world.genocide ? 0x999999 : 0xffffff
            });
            renderer.attach('above', bedcover);
            player.priority.value = 183;
            if (SAVE.data.b.svr) {
               goatbroTrue.priority.value = 183;
            } else if (world.goatbro) {
               goatbro.priority.value = 183;
            }
            await fd.alpha.modulate(renderer, 1000, 0);
            await renderer.pause(2000);
            await fd.alpha.modulate(renderer, 1000, 1);
            if (world.runaway) {
               await bullyEnding();
               return;
            }
            SAVE.data.n.hp = Math.max(SAVE.data.n.hp, Math.min(calcHP() + calcBonusHP(), 99));
            renderer.detach('above', bedcover);
            player.position.x = left ? 135 : 205;
            player.face = left ? 'left' : 'right';
            for (const e of tracker.history) {
               e[0] = player.face;
               e[1].x = player.position.x;
               e[1].y = player.position.y;
            }
            player.priority.value = 0;
            if (SAVE.data.b.svr) {
               goatbroTrue.priority.value = 0;
               goatbroTrue.metadata.override = false;
            } else if (world.goatbro) {
               goatbro.priority.value = 0;
               goatbro.metadata.override = false;
            }
            await renderer.pause(2000);
            game.movement = true;
            await fd.alpha.modulate(renderer, 300, 0);
            renderer.detach('menu', fd);
         }
      },
      async tvm_radio () {
         if (!game.movement) {
            return;
         }
         if (SAVE.storage.inventory.size < 8) {
            SAVE.data.b.item_tvm_radio = true;
            instance('main', 'tvm_radio')?.destroy();
            sounds.equip.instance(renderer);
            saver.add('tvm_radio');
            const ins = instance('main', 'ringerNPC');
            if (ins) {
               await ins.talk('a', talkFinder(), 'auto', ...text.a_aerialis.tvm1);
            } else {
               await dialogue('auto', ...text.a_aerialis.tvm8);
            }
         } else {
            await dialogue('auto', ...text.a_aerialis.tvm3);
         }
      },
      async tvm_fireworks () {
         if (!game.movement) {
            return;
         }
         if (SAVE.storage.inventory.size < 8) {
            SAVE.data.b.item_tvm_fireworks = true;
            instance('main', 'tvm_fireworks')?.destroy();
            sounds.equip.instance(renderer);
            saver.add('tvm_fireworks');
            const ins = instance('main', 'ringerNPC');
            if (ins) {
               await ins.talk('a', talkFinder(), 'auto', ...text.a_aerialis.tvm2);
            } else {
               await dialogue('auto', ...text.a_aerialis.tvm9);
            }
         } else {
            await dialogue('auto', ...text.a_aerialis.tvm3);
         }
      },
      async ringer () {
         if (!game.movement) {
            return;
         }
         const npc = instance('main', 'ringerNPC');
         if (SAVE.data.b.a_state_moneyitemC && !SAVE.data.b.item_tvm_mewmew && !SAVE.data.b.a_state_m3) {
            if (npc) {
               SAVE.data.b.a_state_m3 = true;
               saver.gold += 999;
               await npc?.talk('a', talkFinder(), 'auto', ...text.a_aerialis.tvm6());
            } else {
               await dialogue('auto', ...text.a_aerialis.tvm7());
            }
         } else if (npc) {
            if (
               (SAVE.data.b.a_state_moneyitemA && !SAVE.data.b.item_tvm_radio) ||
               (SAVE.data.b.a_state_moneyitemB && !SAVE.data.b.item_tvm_fireworks)
            ) {
               await npc.talk('a', talkFinder(), 'auto', ...text.a_aerialis.tvm4());
            } else {
               await npc.talk('a', talkFinder(), 'auto', ...text.a_aerialis.tvm5());
            }
         } else if (SAVE.data.b.svr) {
            await dialogue('auto', ...text.a_aerialis.endo);
         } else {
            await dialogue('auto', ...text.a_aerialis.gonezo());
         }
      },
      async spidershop () {
         if (SAVE.data.n.state_foundry_muffet === 1) {
            await dialogue('auto', ...text.a_aerialis.spidershop6);
         } else if (SAVE.data.b.svr || world.runaway) {
            await dialogue('auto', ...text.a_aerialis.spidershop7());
         } else {
            await dialogue('auto', ...text.a_aerialis.spidershop1());
            if (choicer.result === 0) {
               const amt = SAVE.data.n.plot === 72 ? 36 : 56;
               if (saver.gold < amt) {
                  await dialogue('auto', ...text.a_aerialis.spidershop4);
               } else if (SAVE.storage.inventory.size < 8) {
                  saver.gold -= amt;
                  saver.add('super_pop');
                  await dialogue('auto', ...text.a_aerialis.spidershop2);
               } else {
                  await dialogue('auto', ...text.a_aerialis.spidershop3);
               }
            } else {
               await dialogue('auto', ...text.a_aerialis.spidershop5);
            }
         }
      },
      async sonic () {
         if (game.movement && !SAVE.data.b.item_sonic) {
            game.movement = false;
            if (SAVE.storage.inventory.size < 8) {
               SAVE.data.b.item_sonic = true;
               saver.add('sonic');
               sounds.equip.instance(renderer);
               instance('below', 'sonic')?.destroy();
               await dialogue('auto', ...text.a_aerialis.sonic1());
               if (choicer.result === 0) {
                  atlas.switch(autoNav());
                  await use('sonic', SAVE.storage.inventory.contents.indexOf('sonic'));
                  atlas.switch(null);
               } else {
                  await dialogue('auto', ...text.a_aerialis.noequip);
               }
            } else {
               await dialogue('auto', ...text.a_aerialis.sonic2);
            }
            game.movement = true;
         }
      },
      async tablaphone () {
         if (game.movement && !SAVE.data.b.item_tablaphone) {
            game.movement = false;
            if (SAVE.storage.inventory.size < 8) {
               SAVE.data.b.item_tablaphone = true;
               saver.add('tablaphone');
               sounds.equip.instance(renderer);
               instance('below', 'tablaphone')?.destroy();
               await dialogue('auto', ...text.a_aerialis.tablaphone1());
               if (choicer.result === 0) {
                  atlas.switch(autoNav());
                  await use('tablaphone', SAVE.storage.inventory.contents.indexOf('tablaphone'));
                  atlas.switch(null);
               } else {
                  await dialogue('auto', ...text.a_aerialis.noequip);
               }
            } else {
               await dialogue('auto', ...text.a_aerialis.tablaphone2);
            }
            game.movement = true;
         }
      },
      async exofountain () {
         await dialogue('auto', ...text.a_aerialis.overworld.exofountain1());
         if (choicer.result === 0) {
            SAVE.flag.b._heal = true;
            heal();
            await dialogue('auto', ...text.a_aerialis.overworld.exofountain2b());
         } else {
            await dialogue('auto', ...text.a_aerialis.overworld.exofountain2a);
         }
      },
      async phonegrabber () {
         await dialogue('auto', ...text.a_aerialis.story.phonegrabber1());
         world.genocide && (SAVE.flag.b.asriel_phone = true);
         SAVE.data.b.a_state_gotphone = true;
         instance('main', 'compactlazerdeluxe')?.destroy();
         sounds.equip.instance(renderer);
         await dialogue('auto', ...text.a_aerialis.story.phonegrabber2);
         if (world.genocide) {
            await dialogue('auto', ...text.a_aerialis.story.phonegrabber3());
         }
      },
      async npc (roomState, scriptState, key) {
         if (!game.movement) {
            return;
         }
         const inst = instance('main', key);
         if (inst) {
            const anim = inst.object.objects.filter(obj => obj instanceof CosmosAnimation)[0] as CosmosAnimation;
            key === 'a_clamguy' && anim.use(content.ionAClamguyFront);
            await inst.talk(
               'a',
               talkFinder(),
               'auto',
               ...CosmosUtils.provide(text.a_aerialis.npc[key as keyof typeof text.a_aerialis.npc])
            );
            key === 'a_clamguy' && anim.use(content.ionAClamguyBack);
         }
      },
      async whatthefuck () {
         const whatthefuck = instance('main', 'whatthefuck')!.object.objects[0] as CosmosAnimation;
         speech.targets.add(whatthefuck);
         await dialogue('dialoguerBottom', ...text.a_aerialis.story.whatthefuck);
         speech.targets.delete(whatthefuck);
      },
      async topdesk () {
         if (!game.movement) {
            return;
         }
         game.movement = false;
         if (!labspawn()) {
            const inst = instance('below', 'labdesk')!;
            const anim = inst.object.objects.filter(obj => obj instanceof CosmosAnimation)[0] as CosmosAnimation;
            await dialogue('auto', ...text.a_aerialis.overworld.topdesk1());
            if (SAVE.data.b.svr || world.bad_lizard > 1 || world.genocide || SAVE.data.n.state_foundry_undyne === 2) {
               game.movement = true;
               return;
            }
            if (choicer.result === 0) {
               anim.index = 1;
               sounds.select.instance(renderer).rate.value = 0.6;
               await dialogue('auto', ...text.a_aerialis.overworld.topdesk3);
               const spr = new CosmosSprite({ frames: [ content.iooAKittyemu2 ] });
               renderer.attach('menu', spr);
               await keys.specialKey.on('down');
               renderer.detach('menu', spr);
            } else {
               await dialogue('auto', ...text.a_aerialis.overworld.topdesk2);
            }
            anim.index = 0;
         }
         game.movement = true;
      },
      elevator (roomState: AerialisRS['a_lift']) {
         switch (roomState.location) {
            case 'a_start':
               teleport('a_start', 'down', 900, 250, world);
               break;
            case 'a_elevator1':
               teleport('a_elevator1', 'down', 200, 150, world);
               break;
            case 'a_elevator2':
               teleport('a_elevator2', 'down', 240, 150, world);
               break;
            case 'a_elevator3':
               teleport('a_elevator3', 'down', 160, 150, world);
               break;
            case 'a_elevator4':
               teleport('a_elevator4', 'down', 70, 110, world);
               break;
            case 'a_elevator5':
               teleport('a_elevator5', 'down', 290, 110, world);
               break;
            case 'a_hub5':
               teleport('a_hub5', 'down', 100, 170, world);
               break;
            case 'a_core_entry1':
               teleport('a_core_entry1', 'down', 60, 530, world);
               break;
            case 'a_core_exit2':
               teleport('a_core_exit2', 'down', 580, 90, world);
               break;
            case 'c_start':
               teleport('c_start', 'down', 110, 150, world);
               break;
            case 'c_elevator1':
               teleport('c_elevator1', 'down', 90, 170, world);
               break;
            case 'c_elevator2':
               teleport('c_elevator2', 'down', 230, 170, world);
               break;
         }
      },
      async lift (roomState: AerialisRS['a_lift']) {
         if (SAVE.data.n.plot === 72 && SAVE.data.n.plot_epilogue < 3 && !world.runaway) {
            return;
         }
         if (!roomState.elevating && game.movement) {
            game.movement = false;
            const prev = roomState.location;
            let shortcut = false;
            let citadelevator = false;
            if (SAVE.data.n.plot < 69) {
               switch (roomState.location) {
                  case 'a_hub5':
                     citadelevator = true;
                     await dialogue('auto', ...text.a_aerialis.elevatorStory1());
                     roomState.location = [ 'a_core_entry1', 'a_hub5' ][
                        choicer.result
                     ] as AerialisRS['a_lift']['location'];
                     break;
                  case 'a_core_entry1':
                     citadelevator = true;
                     await dialogue('auto', ...text.a_aerialis.elevatorStory2());
                     roomState.location = [ 'a_hub5', 'a_core_entry1' ][
                        choicer.result
                     ] as AerialisRS['a_lift']['location'];
                     break;
                  case 'a_core_exit2':
                     citadelevator = true;
                     await dialogue('auto', ...text.a_aerialis.elevatorStory3());
                     roomState.location = [ 'c_start', 'a_core_exit2' ][
                        choicer.result
                     ] as AerialisRS['a_lift']['location'];
                     break;
               }
            }
            if (!citadelevator) {
               if (SAVE.data.n.plot < 65) {
                  switch (roomState.location) {
                     case 'a_elevator1':
                        await dialogue('auto', ...text.a_aerialis.overworld.lift.elevatorStory1());
                        roomState.location = (
                           SAVE.data.n.plot < 64
                              ? [ 'a_elevator2', 'a_elevator1' ]
                              : [ 'a_elevator2', 'a_elevator3', 'a_elevator4', 'a_elevator1' ]
                        )[choicer.result] as AerialisRS['a_lift']['location'];
                        break;
                     case 'a_elevator2':
                        await dialogue('auto', ...text.a_aerialis.overworld.lift.elevatorStory2());
                        roomState.location = (
                           SAVE.data.n.plot < 64
                              ? [ 'a_elevator1', 'a_elevator2' ]
                              : [ 'a_elevator1', 'a_elevator3', 'a_elevator4', 'a_elevator2' ]
                        )[choicer.result] as AerialisRS['a_lift']['location'];
                        break;
                     case 'a_elevator3':
                        await dialogue('auto', ...text.a_aerialis.overworld.lift.elevatorStory3());
                        roomState.location = [ 'a_elevator4', 'a_elevator1', 'a_elevator2', 'a_elevator3' ][
                           choicer.result
                        ] as AerialisRS['a_lift']['location'];
                        break;
                     case 'a_elevator4':
                        await dialogue('auto', ...text.a_aerialis.overworld.lift.elevatorStory4());
                        roomState.location = [ 'a_elevator3', 'a_elevator1', 'a_elevator2', 'a_elevator4' ][
                           choicer.result
                        ] as AerialisRS['a_lift']['location'];
                        break;
                     case 'a_start':
                        await dialogue('auto', ...text.a_aerialis.overworld.lift.elevatorStory6());
                        break;
                  }
               } else {
                  switch (roomState.location) {
                     case 'a_elevator1':
                        await dialogue('auto', ...text.a_aerialis.overworld.lift.elevator1());
                        break;
                     case 'a_elevator2':
                        await dialogue('auto', ...text.a_aerialis.overworld.lift.elevator2());
                        break;
                     case 'a_elevator3':
                        await dialogue('auto', ...text.a_aerialis.overworld.lift.elevator3());
                        break;
                     case 'a_elevator4':
                        if (SAVE.data.b.ubershortcut) {
                           await dialogue('auto', ...text.a_aerialis.overworld.lift.elevatorStory6());
                           game.movement = true;
                           return;
                        } else {
                           await dialogue('auto', ...text.a_aerialis.overworld.lift.elevator4());
                        }
                        break;
                     case 'a_elevator5':
                        if (SAVE.data.b.ubershortcut) {
                           await dialogue('auto', ...text.a_aerialis.overworld.lift.elevatorStory6());
                           game.movement = true;
                           return;
                        } else {
                           await dialogue('auto', ...text.a_aerialis.overworld.lift.elevator5());
                        }
                        break;
                     case 'a_start':
                        await dialogue('auto', ...text.a_aerialis.overworld.lift.elevator6());
                        break;
                     case 'a_hub5':
                        citadelevator = true;
                        await dialogue('auto', ...text.a_aerialis.elevator1());
                        break;
                     case 'a_core_entry1':
                        citadelevator = true;
                        await dialogue('auto', ...text.a_aerialis.elevator2());
                        break;
                     case 'a_core_exit2':
                        citadelevator = true;
                        await dialogue('auto', ...text.a_aerialis.elevator3());
                        break;
                     case 'c_start':
                        if (SAVE.data.b.ultrashortcut || (postSIGMA() && 71 <= SAVE.data.n.plot)) {
                           await dialogue('auto', ...text.a_aerialis.overworld.lift.elevatorStory6());
                           game.movement = true;
                           return;
                        }
                        citadelevator = true;
                        await dialogue('auto', ...text.a_aerialis.elevator4());
                        break;
                     case 'c_elevator1':
                        if (SAVE.data.n.plot < 70) {
                           await dialogue('auto', ...text.a_aerialis.overworld.lift.elevatorStory6(true));
                           game.movement = true;
                           return;
                        }
                     case 'c_elevator2':
                        if (SAVE.data.b.svr || postSIGMA()) {
                           await dialogue('auto', ...text.a_aerialis.overworld.lift.elevatorStory6(true));
                           game.movement = true;
                           return;
                        }
                        shortcut = true;
                        break;
                  }
                  if (shortcut) {
                     roomState.location = roomState.location === 'c_elevator1' ? 'c_elevator2' : 'c_elevator1';
                  } else if (citadelevator) {
                     roomState.location = [ 'a_hub5', 'a_core_entry1', 'a_core_exit2', 'c_start' ][
                        choicer.result
                     ] as AerialisRS['a_lift']['location'];
                  } else {
                     roomState.location = [
                        'a_start',
                        'a_elevator1',
                        'a_elevator3',
                        'a_elevator2',
                        'a_elevator4',
                        'a_elevator5'
                     ][choicer.result] as AerialisRS['a_lift']['location'];
                  }
               }
            }
            if (roomState.location !== prev) {
               roomState.elevating = true;
               game.menu = false;
               rooms.of(roomState.location!).preload.load();
               rooms.of(prev!).preload.unload();
               rooms.of(game.room).neighbors = [];
               elevate(roomState.location === 'c_start' && SAVE.data.n.plot < 69).then(() => {
                  roomState.elevating = false;
                  game.menu = true;
               });
            }
            game.movement = true;
         }
      },
      p1teleport () {
         if (!world.postnoot && SAVE.data.n.plot < 55) {
            const r = rooms.of('a_puzzle1');
            r.region[0]!.x = 160;
            r.region[1]!.x = 160;
            teleport('a_puzzle1', 'up', 160, 490, world);
         } else {
            teleport('a_puzzle1', 'up', 500, 490, world);
         }
      },
      p2teleport () {
         if (!world.postnoot && SAVE.data.n.plot < 59) {
            rooms.of('a_puzzle2').region[1]!.x = 860;
            teleport('a_puzzle2', 'left', 1000, 240, world);
         } else {
            teleport('a_puzzle2', 'left', 380, 240, world);
         }
      },
      p2return () {
         SAVE.data.n.plot < 59 || teleport('a_prepuzzle', 'left', 20, 60, world);
      },
      async labstation () {
         if (!game.movement) {
            return;
         }
         game.movement = false;
         const left = player.position.x < 410;
         const inst = instance('below', left ? 'leftbrain' : 'rightbrain')!;
         const anim = inst.object.objects.filter(obj => obj instanceof CosmosAnimation)[0] as CosmosAnimation;
         await dialogue('auto', ...text.a_aerialis.overworld.topdesk1());
         if (SAVE.data.b.svr || world.bad_lizard > 1 || world.genocide || SAVE.data.n.state_foundry_undyne === 2) {
            game.movement = true;
            return;
         }
         if (choicer.result === 0) {
            anim.index = 1;
            sounds.select.instance(renderer).rate.value = 0.6;
            await dialogue(
               'auto',
               ...(left ? text.a_aerialis.overworld.labstationA : text.a_aerialis.overworld.labstationB)
            );
            const spr = new CosmosSprite({
               scale: 0.5,
               frames: [
                  left ? (SAVE.data.n.plot === 72 ? content.iooAScreen1alt : content.iooAScreen1) : content.iooAScreen2
               ]
            });
            renderer.attach('menu', spr);
            await keys.specialKey.on('down');
            renderer.detach('menu', spr);
         } else {
            await dialogue('auto', ...text.a_aerialis.overworld.topdesk2);
         }
         anim.index = 0;
         game.movement = true;
      },
      async conveyor (r, s, a) {
         if (a === 'up') {
            player.position.y -= 3;
         } else {
            player.position.y += 3;
         }
      },
      async terminal (r, s, a) {
         let term = null as null | CosmosSprite;
         function xterm (x: number, y: number) {
            if (SAVE.data.b.svr || postSIGMA()) {
               return;
            }
            sounds.equip.instance(renderer).rate.value = 1.2;
            term = new CosmosSprite({ position: { x, y }, priority: -20, frames: [ content.iooAXterm ] });
            renderer.attach('main', term);
         }
         switch (a) {
            case '1':
               xterm(219, 68);
               await dialogue('auto', ...text.a_aerialis.overworld.terminal1());
               break;
            case '2':
               xterm(629, 68);
               await dialogue('auto', ...text.a_aerialis.overworld.terminal2());
               break;
            case '3':
               xterm(189, 88);
               await dialogue('auto', ...text.a_aerialis.overworld.terminal3());
               break;
            case '4':
               xterm(159, 148);
               await dialogue('auto', ...text.a_aerialis.overworld.terminal4());
               break;
            case '5':
               xterm(119, 68);
               await dialogue('auto', ...text.a_aerialis.overworld.terminal5());
               break;
            case '-1':
               xterm(119, 68);
               return term;
         }
         term && renderer.detach('main', term);
      },
      async recycler () {
         if (SAVE.data.b.water) {
            SAVE.data.b.water = false;
            sounds.rustle.instance(renderer);
            await dialogue('auto', ...text.a_aerialis.overworld.recyclerX);
         } else {
            await dialogue('auto', ...text.a_aerialis.overworld.recycler());
         }
      },
      async notifier (roomState, scriptState: { infobox: CosmosObject | void }, key) {
         if (
            !SAVE.data.b.bad_lizard &&
            SAVE.data.n.plot < 65 &&
            !world.badder_lizard &&
            !pms().includes(key) &&
            alphysPhoneDisplay()
         ) {
            sounds.textnoise.instance(renderer);
            SAVE.data.s.pms += `${SAVE.data.s.pms === '' ? '' : ','}${key}`;
            scriptState.infobox && renderer.detach('menu', scriptState.infobox);
            const infobox = menuBox(32, 10, 566, 140 - 38 * 2, 6, {
               objects: [
                  new CosmosText({
                     fill: 0xffffff,
                     fontFamily: content.fDeterminationMono,
                     fontSize: 16,
                     position: { x: 11, y: 9 },
                     spacing: { x: 0, y: 5 },
                     stroke: -1,
                     content: text.a_aerialis.story.status
                        .replace(
                           '$(x)',
                           CosmosUtils.provide(
                              text.m_aerialis.sidebarCellPms3[key as keyof typeof text.m_aerialis.sidebarCellPms3]
                                 .author
                           )
                        )
                        .slice(0, 33)
                  })
               ]
            });
            const OGY = infobox.position.y;
            infobox.position.y = -infobox.size.y;
            renderer.attach('menu', infobox);
            scriptState.infobox = infobox;
            await Promise.race([
               infobox.position.modulate(renderer, 900, { y: OGY }, { y: OGY }).then(async () => {
                  await renderer.pause(2000);
                  await infobox.position.modulate(renderer, 900, { y: OGY }, { y: -infobox.size.y });
               }),
               events.on('teleport'),
               events.on('battle'),
               renderer.when(() => atlas.target?.includes('sidebar') ?? false)
            ]);
            scriptState.infobox = void 0;
            renderer.detach('menu', infobox);
         }
      },
      async labcamera2 () {
         await dialogue('auto', ...text.a_aerialis.overworld.labcamera2());
      },
      async doublefridge () {
         await dialogue('auto', ...text.a_aerialis.overworld.doublefridge1());
         if (!SAVE.data.b.item_orange_soda) {
            await dialogue('auto', ...text.a_aerialis.overworld.doublefridge2());
            if (choicer.result === 0) {
               if (SAVE.storage.inventory.size === 8) {
                  await dialogue('auto', ...text.a_aerialis.overworld.doublefridge3);
               } else {
                  SAVE.data.b.item_orange_soda = true;
                  sounds.equip.instance(renderer);
                  saver.add('orange_soda');
                  await dialogue('auto', ...text.a_aerialis.overworld.doublefridge4);
               }
            } else {
               await dialogue('auto', ...text.a_aerialis.overworld.doublefridge5);
            }
         }
      },
      async launchpad () {
         if (!game.movement) {
            return;
         }
         if (player.face === 'up') {
            if (alphysPhoneDisplay() && !postSIGMA()) {
               game.movement = false;
               goatbro.metadata.static = true;
               goatbroTrue.metadata.static = true;
               for (const spr of Object.values(characters.asriel.walk)) {
                  spr.reset();
               }
               for (const spr of Object.values(characters.asrielTrue.walk)) {
                  spr.reset();
               }
               const obs = renderer.layers.above.objects.filter(x => x instanceof CosmosSprite);
               const liftgates = [ ...instances('below', 'a_launchpad') ]
                  .map(x => x.object)
                  .sort((a, b) => a.position.extentOf(player) - b.position.extentOf(player));
               const base = liftgates.map(x => x.position.subtract(0, 22));
               const apex = base.map(x => x.subtract(0, 40));
               const str = new CosmosValue();
               const glow = filters.glow;
               const filterTicker = () => {
                  glow.innerStrength = str.value / 4;
                  glow.outerStrength = str.value;
               };
               const far = Math.abs(player.position.x - base[0].x) > 5;
               await player.walk(renderer, 3, { x: base[0].x });
               far && (await renderer.pause(450));
               await player.walk(renderer, 1, base[0]);
               await renderer.pause(300);
               sounds.equip.instance(renderer).rate.value = 1.25;
               const hum = music.drone.instance(renderer);
               hum.rate.value = 0.8;
               hum.gain.value = 0;
               player.area = renderer.area!;
               goatbro.area = renderer.area!;
               goatbroTrue.area = renderer.area!;
               player.filters = [ glow ];
               goatbro.filters = [ glow ];
               goatbroTrue.filters = [ glow ];
               player.on('tick', filterTicker);
               str.modulate(renderer, 500, 2, 2);
               hum.gain.modulate(renderer, 500, hum.daemon.gain * 2);
               await renderer.pause(300);
               renderer.detach('above', ...obs);
               renderer.attach('main', ...obs);
               await player.position.modulate(renderer, 1000, {}, apex[0], apex[0]);
               await renderer.pause(300);
               renderer.detach('main', player);
               renderer.attach('above', player);
               player.priority.value = 1000;
               await player.position.modulate(renderer, 1000, {}, apex[1], apex[1]);
               renderer.detach('above', player);
               renderer.attach('main', player);
               player.priority.value = 0;
               await player.position.modulate(renderer, 1000, {}, base[1], base[1]);
               renderer.detach('main', ...obs);
               renderer.attach('above', ...obs);
               hum.stop();
               await renderer.pause(300);
               sounds.equip.instance(renderer).rate.value = 1.25;
               str.modulate(renderer, 500, 0, 0);
               await renderer.pause(300);
               await player.walk(renderer, 1, liftgates[1].position.add(0, 5));
               player.filters = null;
               goatbro.filters = null;
               goatbroTrue.filters = null;
               player.area = null;
               goatbro.area = null;
               goatbroTrue.area = null;
               player.off('tick', filterTicker);
               game.movement = true;
               goatbro.metadata.static = false;
               goatbroTrue.metadata.static = false;
            } else {
               await dialogue('auto', ...text.a_aerialis.overworld.platformDeny());
            }
         }
      },
      async lablizard () {
         await dialogue('auto', ...text.a_aerialis.overworld.lablizard.a());
      },
      async barricade1 (roomState: AerialisRS['a_barricade1']) {
         if (SAVE.data.n.plot < 52 && !roomState.trig1) {
            roomState.trig1 = true;
            await dialogue('auto', ...text.a_aerialis.overworld.barricade);
            sounds.phone.instance(renderer);
            await dialogue('auto', ...text.a_aerialis.story.barricade1());
            if (world.postnoot) {
               SAVE.data.n.plot = 54;
               world.nootflags.add('a_barricade1');
               await dialogue('auto', ...text.a_aerialis.story.barricade1x);
               await endCall('auto');
               SAVE.data.n.state_aerialis_barricuda = 3;
            } else {
               const pass = choicer.result === 2;
               pass && header('x1').then(() => (SAVE.data.n.plot = 52));
               await dialogue(
                  'auto',
                  ...[
                     text.a_aerialis.story.barricade1b1,
                     text.a_aerialis.story.barricade1b2,
                     text.a_aerialis.story.barricade1b3(),
                     text.a_aerialis.story.barricade1b4()
                  ][choicer.result]
               );
               if (!pass) {
                  await dialogue('auto', ...text.a_aerialis.story.barricadeFail1);
               }
               await endCall('auto');
               if (pass) {
                  SAVE.data.n.state_aerialis_barricuda = 1;
               } else {
                  await barricadeFail1();
               }
            }
         }
      },
      async barricade2 (roomState: AerialisRS['a_barricade1']) {
         if (SAVE.data.n.plot < 53 && !roomState.trig2) {
            roomState.trig2 = true;
            await dialogue('auto', ...text.a_aerialis.overworld.barricade);
            sounds.phone.instance(renderer);
            await dialogue('auto', ...text.a_aerialis.story.barricade2());
            const pass = choicer.result === 3;
            pass && header('x1').then(() => (SAVE.data.n.plot = 53));
            await dialogue(
               'auto',
               ...[
                  text.a_aerialis.story.barricade2b1,
                  text.a_aerialis.story.barricade2b2,
                  text.a_aerialis.story.barricade2b3,
                  text.a_aerialis.story.barricade2b4
               ][choicer.result]
            );
            if (!pass) {
               await dialogue('auto', ...text.a_aerialis.story.barricadeFail1);
            }
            await endCall('auto');
            if (pass) {
               SAVE.data.n.state_aerialis_barricuda = 2;
            } else {
               await barricadeFail1();
            }
         }
      },
      async barricade3 (roomState: AerialisRS['a_barricade1']) {
         if (SAVE.data.n.plot < 54 && !roomState.trig3) {
            roomState.trig3 = true;
            await dialogue('auto', ...text.a_aerialis.overworld.barricade);
            sounds.phone.instance(renderer);
            await dialogue('auto', ...text.a_aerialis.story.barricade3());
            header('x1').then(() => (SAVE.data.n.plot = 54));
            await dialogue(
               'auto',
               ...[
                  text.a_aerialis.story.barricade3b1,
                  text.a_aerialis.story.barricade3b2,
                  text.a_aerialis.story.barricade3b3,
                  text.a_aerialis.story.barricade3b4
               ][choicer.result]
            );
            const pass = choicer.result === 3;
            if (!pass) {
               await dialogue('auto', ...text.a_aerialis.story.barricade3c);
            }
            await endCall('auto');
            if (pass) {
               SAVE.data.n.state_aerialis_barricuda = 3;
            }
         }
      },
      async barricade4 () {
         if (SAVE.data.n.plot < 62 && game.movement) {
            game.movement = false;
            await dialogue('auto', ...text.a_aerialis.overworld.barricade);
            sounds.phone.instance(renderer);
            header('x1').then(() => (SAVE.data.n.plot = 62));
            await dialogue('auto', ...text.a_aerialis.story.barricade4());
            game.movement = true;
         }
      },
      async puzzle1 (roomState: AerialisRS['a_puzzle1']) {
         if (!game.movement) {
            return;
         }
         if (player.face === 'up') {
            game.movement = false;
            const pterm = instance('main', 'pterm')!.object;
            if (SAVE.data.n.plot < 55) {
               roomState.check = true;
               const anim = pterm.objects.filter(o => o instanceof CosmosAnimation)[0] as CosmosAnimation;
               if ((roomState.offset ?? 0) - puzzle1target === 0) {
                  let i = 0;
                  while (i++ < 3) {
                     await renderer.pause(200);
                     anim.index = 4;
                     sounds.menu.instance(renderer).rate.value = 1.4;
                     await renderer.pause(100);
                     i < 3 && (anim.index = 3);
                  }
                  const obj = fader({ fill: 0xffffff });
                  await obj.alpha.modulate(renderer, 1000, 1);
                  await renderer.pause(400);
                  anim.index = 0;
                  SAVE.data.n.plot = 55;
                  const r = rooms.of('a_puzzle1');
                  r.region[0]!.x = 540;
                  r.region[1]!.x = 540;
                  partyShift({ x: 340 });
                  if (!pterm.metadata.shifted) {
                     pterm.metadata.shifted = true;
                     pterm.position.x += 340;
                  }
                  renderer.region[0].x = 540;
                  renderer.region[1].x = 540;
                  spire.metadata.min = -Infinity;
                  spire.metadata.max = Infinity;
                  obj.alpha.modulate(renderer, 600, 0).then(() => renderer.detach('menu', obj));
                  roomState.check = false;
                  if (!world.badder_lizard && SAVE.data.n.state_foundry_undyne === 0) {
                     sounds.phone.instance(renderer);
                     await dialogue('auto', ...text.a_aerialis.story.puzzleReaction1);
                     await endCall('auto');
                  }
               } else {
                  await renderer.pause(200);
                  anim.index = 2;
                  sounds.menu.instance(renderer).rate.value = 1.2;
                  await renderer.pause(100);
                  anim.index = 1;
                  await renderer.pause(100);
                  anim.index = 2;
                  sounds.menu.instance(renderer).rate.value = 1.2;
                  await renderer.pause(400);
                  anim.index = 0;
                  roomState.check = false;
               }
            } else {
               await dialogue('auto', ...text.a_aerialis.overworld.puzzle1done());
            }
            game.movement = true;
         }
      },
      async puzzle2 (roomState: AerialisRS['a_puzzle2']) {
         if (!game.movement) {
            return;
         }
         if (player.face === 'up') {
            game.movement = false;
            const pterm = instance('main', 'pterm')!.object;
            if (SAVE.data.n.plot < 59) {
               roomState.check = true;
               const anim = pterm.objects.filter(o => o instanceof CosmosAnimation)[0] as CosmosAnimation;
               if (
                  puzzle2target.x - (roomState.offset ?? 0) === 0 &&
                  puzzle2target.y - SAVE.data.n.state_aerialis_puzzle2os === 0
               ) {
                  let i = 0;
                  const n = SAVE.data.n.plot < 58.2 ? 2 : 3;
                  while (i++ < n) {
                     await renderer.pause(200);
                     anim.index = 4;
                     sounds.menu.instance(renderer).rate.value = 1.4;
                     await renderer.pause(100);
                     i < n && (anim.index = 3);
                  }
                  const obj = fader({ fill: 0xffffff });
                  await obj.alpha.modulate(renderer, 1000, 1);
                  await renderer.pause(400);
                  anim.index = 0;
                  if (SAVE.data.n.plot < 58.1) {
                     SAVE.data.n.plot = 58.1;
                  } else if (SAVE.data.n.plot < 58.2) {
                     SAVE.data.n.plot = 58.2;
                  } else {
                     SAVE.data.n.plot = 59;
                     rooms.of('a_puzzle2').region[1]!.x = 240;
                     partyShift({ x: -620 });
                     if (!pterm.metadata.shifted) {
                        pterm.metadata.shifted = true;
                        pterm.position.x -= 620;
                     }
                     renderer.region[0].x = 160;
                     renderer.region[1].x = 240;
                     spire.metadata.min = -Infinity;
                     spire.metadata.max = Infinity;
                  }
                  obj.alpha.modulate(renderer, 600, 0).then(() => renderer.detach('menu', obj));
                  roomState.check = false;
                  if (!world.badder_lizard && SAVE.data.n.state_foundry_undyne === 0) {
                     sounds.phone.instance(renderer);
                     if (SAVE.data.n.plot > 58.2) {
                        await dialogue('auto', ...text.a_aerialis.story.puzzleReaction2c);
                        await endCall('auto');
                     } else if (SAVE.data.n.plot > 58.1) {
                        await dialogue('auto', ...text.a_aerialis.story.puzzleReaction2b);
                        await endCall('auto');
                     } else {
                        await dialogue('auto', ...text.a_aerialis.story.puzzleReaction2a);
                        await endCall('auto');
                     }
                  }
               } else {
                  await renderer.pause(200);
                  anim.index = 2;
                  sounds.menu.instance(renderer).rate.value = 1.2;
                  await renderer.pause(100);
                  anim.index = 1;
                  await renderer.pause(100);
                  anim.index = 2;
                  sounds.menu.instance(renderer).rate.value = 1.2;
                  await renderer.pause(400);
                  anim.index = 0;
                  roomState.check = false;
               }
            } else {
               await dialogue('auto', ...text.a_aerialis.overworld.puzzle1done());
            }
            game.movement = true;
         }
      },
      async ingredient (roomState: AerialisRS['a_mettaton1'], s, ingredient) {
         let ing = false;
         for (const inst of instances('main', 'ingredient')) {
            if (inst.tags.includes(ingredient)) {
               inst.destroy();
               ing = true;
               break;
            }
         }
         if (ing) {
            sounds.equip.instance(renderer);
            switch (ingredient) {
               case 'hexogen':
                  roomState.ingredient1 = 1;
                  await dialogue('auto', ...text.a_aerialis.overworld.ingredient1());
                  break;
               case 'beaker':
                  roomState.ingredient2 = 1;
                  await dialogue('auto', ...text.a_aerialis.overworld.ingredient2());
                  break;
               case 'oil':
                  roomState.ingredient3 = 1;
                  await dialogue('auto', ...text.a_aerialis.overworld.ingredient3());
                  break;
            }
         }
      },
      async labcounter (roomState: AerialisRS['a_mettaton1']) {
         let ing = false;
         if (SAVE.data.n.plot === 55.1 && !roomState.danger) {
            if (roomState.ingredient1 === 1) {
               ing = true;
               roomState.ingredient1 = 2;
            }
            if (roomState.ingredient2 === 1) {
               ing = true;
               roomState.ingredient2 = 2;
            }
            if (roomState.ingredient3 === 1) {
               ing = true;
               roomState.ingredient3 = 2;
            }
         }
         if (ing) {
            sounds.noise.instance(renderer);
         } else {
            await areaA.scripts.mtttrivia!(roomState, (aerialisStates.scripts.mtttrivia ??= {}), 'labcounter');
         }
      },
      async mettacrafter (roomState: AerialisRS['a_mettaton1']) {
         if (!game.movement) {
            return;
         }
         const i1 = roomState.ingredient1 ?? 0;
         const i2 = roomState.ingredient2 ?? 0;
         const i3 = roomState.ingredient3 ?? 0;
         const findAmt = (i1 === 0 ? 0 : 1) + (i2 === 0 ? 0 : 1) + (i3 === 0 ? 0 : 1);
         if (findAmt < 3) {
            await dialogue(
               'dialoguerBottom',
               ...[
                  text.a_aerialis.overworld.mettacrafter1a,
                  text.a_aerialis.overworld.mettacrafter1b,
                  text.a_aerialis.overworld.mettacrafter1c
               ][findAmt]
            );
         } else {
            const placeAmt = (i1 === 2 ? 1 : 0) + (i2 === 2 ? 1 : 0) + (i3 === 2 ? 1 : 0);
            await dialogue(
               'dialoguerBottom',
               ...[
                  text.a_aerialis.overworld.mettacrafter2a,
                  text.a_aerialis.overworld.mettacrafter2b,
                  text.a_aerialis.overworld.mettacrafter2c
               ][placeAmt]
            );
         }
      },
      async laserbarrrier (roomState: AerialisRS['a_mettaton1']) {
         if (roomState.danger) {
            await dialogue('auto', ...text.a_aerialis.overworld.laserbarrrier2());
         } else {
            await dialogue('auto', ...text.a_aerialis.overworld.laserbarrrier1());
         }
      },
      async rg1 () {
         if (!game.movement) {
            return;
         }
         if (SAVE.data.n.plot < 51) {
            SAVE.data.n.plot = 51;
            if (world.bad_lizard > 1 || !SAVE.data.b.bad_lizard) {
               game.movement = false;
               game.music?.stop();
               player.face = 'right';
               const camX = player.position.clamp(...renderer.region).x - 160;
               const npc01 = character(
                  'rgdragon',
                  { talk: rgdragon, walk: rgdragon },
                  { x: camX - 20, y: 150 },
                  'right'
               ).on('tick', function () {
                  if (this.sprite.index % 2 === 1 && this.sprite.step === this.sprite.duration - 1) {
                     sounds.stomp.instance(renderer).rate.value = 1.2;
                  }
               });
               const npc02 = character(
                  'rgrabbit',
                  { talk: rgrabbit, walk: rgrabbit },
                  { x: camX - 60, y: 170 },
                  'right'
               );
               await Promise.all([
                  npc01.walk(renderer, 3, { x: player.position.x - 120 }),
                  npc02.walk(renderer, 3, { x: player.position.x - 160 })
               ]);
               await dialogue('auto', ...text.a_aerialis.story.rg1a());
               await Promise.all([
                  npc01.walk(renderer, 3, { x: player.position.x - 40 }),
                  npc02.walk(renderer, 3, { x: player.position.x - 80 })
               ]);
               await renderer.pause(850);
               const headers = rgHeaders(npc01, npc02);
               typer.on('header', headers);
               await dialogue('auto', ...text.a_aerialis.story.rg1b1());
               await Promise.all([
                  renderer.pause(350).then(async () => {
                     npc02.face = 'left';
                     await renderer.pause(850);
                     npc02.face = 'right';
                  }),
                  dialogue('auto', ...text.a_aerialis.story.rg1b2()).then(() => renderer.pause(3150))
               ]);
               await dialogue('auto', ...text.a_aerialis.story.rg1c());
               await renderer.pause(850);
               // credits to pud!
               npc01.face = 'down';
               await renderer.pause(1450);
               npc01.face = 'right';
               await renderer.pause(1850);
               await dialogue('auto', ...text.a_aerialis.story.rg1d1());
               if (world.bad_lizard > 1) {
                  game.music = null;
                  await battler.shatter(groups.rg);
                  await renderer.pause(333);
                  await battler.encounter(player, groups.rg);
                  typer.off('header', headers);
                  if (SAVE.data.n.state_aerialis_royalguards === 0) {
                     await dialogue('auto', ...text.a_aerialis.story.rg1f);
                     await Promise.all([
                        npc01.walk(renderer, 3, { x: camX - 40 }),
                        npc02.walk(renderer, 3, { x: camX - 40 })
                     ]);
                  }
               } else {
                  npc02.face = 'down';
                  await dialogue('auto', ...text.a_aerialis.story.rg1d2);
                  npc02.face = 'right';
                  await dialogue('auto', ...text.a_aerialis.story.rg1d3);
                  npc01.face = 'left';
                  npc02.face = 'left';
                  await renderer.pause(850);
                  await Promise.all([
                     npc01.walk(renderer, 3, { x: player.position.x - 100 }),
                     npc02.walk(renderer, 3, { x: player.position.x - 140 })
                  ]);
                  await renderer.pause(650);
                  npc01.face = 'right';
                  await renderer.pause(1150);
                  await dialogue('auto', ...text.a_aerialis.story.rg1e);
                  typer.off('header', headers);
                  await renderer.pause(1450);
                  await Promise.all([
                     npc01.walk(renderer, 3, { x: camX - 40 }),
                     npc02.walk(renderer, 3, { x: camX - 40 })
                  ]);
               }
               renderer.detach('main', npc01, npc02);
               game.movement = true;
               quickresume();
            }
         }
      },
      async rg2 (roomState: AerialisRS['a_rg2']) {
         if (SAVE.data.n.plot < 61) {
            if (game.movement && world.bad_lizard <= 1) {
               game.movement = false;
               game.music?.stop();
               player.face = 'left';
               const xpos = player.position.clamp(...renderer.region).x + 180;
               const npc01 = new CosmosAnimation({
                  anchor: { x: 0, y: 1 },
                  resources: content.ionARgcatLeft,
                  position: { y: 140 }
               }).on('tick', function () {
                  if (this.index % 2 === 1 && this.step === this.duration - 1) {
                     sounds.stomp.instance(renderer).rate.value = 1.2;
                  }
               });
               const npc02 = new CosmosAnimation({
                  anchor: { x: 0, y: 1 },
                  resources: content.ionARgbugLeft,
                  position: { x: 40, y: 180 }
               });
               const obj = new CosmosObject({ objects: [ npc01, npc02 ], position: { x: xpos }, priority: 100000 });
               renderer.attach('main', obj);
               npc01.enable();
               npc02.enable();
               const offsetterX = Math.max(player.position.x, ...(world.goatbro ? [ goatbro.position.x ] : []));
               await obj.position.step(renderer, 3, { x: offsetterX + 120 });
               npc01.reset();
               npc02.reset();
               const headers = rgHeaders(npc01, npc02);
               typer.on('header', headers);
               await dialogue('auto', ...text.a_aerialis.story.rg2a);
               npc01.enable();
               npc02.enable();
               await obj.position.step(renderer, 3, { x: offsetterX + 30 });
               npc01.reset();
               npc02.reset();
               await dialogue('auto', ...text.a_aerialis.story.rg2b());
               await renderer.pause(450);
               npc01.use(content.ionARgcatRight);
               await renderer.pause(850);
               npc01.use(content.ionARgcatLeft);
               if (world.genocide) {
                  await dialogue('auto', ...text.a_aerialis.story.rg2c3);
               } else {
                  await renderer.pause(1450);
                  await dialogue('auto', ...text.a_aerialis.story.rg2c1);
                  npc02.use(content.ionARgbugDown);
                  await renderer.pause(1450);
                  await dialogue('auto', ...text.a_aerialis.story.rg2c2);
                  await renderer.pause(650);
                  npc02.use(content.ionARgbugLeft);
               }
               await renderer.pause(1150);
               await dialogue('auto', ...text.a_aerialis.story.rg2d());
               typer.off('header', headers);
               game.music = null;
               await battler.shatter(groups.rg);
               await renderer.pause(333);
               await battler.encounter(player, groups.rg);
               game.movement = false;
               if (SAVE.data.n.state_aerialis_royalguards === 1) {
                  updateBadLizard();
               } else {
                  if (SAVE.data.b.bullied_rg03 || SAVE.data.b.bullied_rg04) {
                     await dialogue('auto', ...text.a_aerialis.story.rg2f);
                  }
                  npc01.use(content.ionARgcatRight);
                  npc02.use(content.ionARgbugRight);
                  npc01.enable();
                  npc02.enable();
                  await obj.position.step(renderer, 3, { x: xpos });
               }
               renderer.detach('main', obj);
               if (!SAVE.data.b.oops) {
                  await dialogue('auto', ...text.a_aerialis.story.rg2e);
               }
               if (world.badder_lizard && world.bad_lizard > 1) {
                  SAVE.data.n.plot = 64;
               } else {
                  SAVE.data.n.plot = 61;
               }
               game.movement = true;
               if (SAVE.data.n.state_aerialis_royalguards === 1) {
                  quickresume(true);
               } else {
                  quickresume();
               }
            }
         }
      },
      async sentrystation (roomState: AerialisRS['a_sans']) {
         if (!game.movement) {
            return;
         }
         const inst = instance('main', 'sentryskeleton');
         if (inst) {
            let dog = false;
            if (SAVE.storage.inventory.size < 8) {
               roomState.toppler = false;
            }
            if (roomState.toppler) {
               await dialogue('auto', ...text.a_aerialis.corndog2b);
               dog = true;
            } else {
               await dialogue('auto', ...text.a_aerialis.corndog1());
               if (choicer.result === 0) {
                  if (SAVE.storage.inventory.size < 8) {
                     let afford = true;
                     if (saver.gold < 5 && SAVE.data.n.cornmoney < 2) {
                        if (SAVE.data.n.cornmoney < 1) {
                           saver.gold += 100;
                           afford = false;
                        }
                        await dialogue('auto', ...text.a_aerialis.corndog3, ...text.a_aerialis.corndog3x());
                     }
                     if (afford) {
                        SAVE.data.n.cornmoney < 2 && (saver.gold -= 5);
                        sounds.equip.instance(renderer);
                        if (SAVE.data.n.state_aerialis_corngoat === 1) {
                           saver.add('corngoat');
                        } else {
                           saver.add('corndog');
                        }
                        await dialogue('auto', ...text.a_aerialis.corndog4());
                     }
                  } else {
                     roomState.toppler = true;
                     events.on('teleport').then(() => (roomState.toppler = false));
                     await dialogue('auto', ...text.a_aerialis.corndog2);
                     dog = true;
                  }
               } else {
                  await dialogue('auto', ...text.a_aerialis.corndog5);
               }
            }
            if (dog) {
               renderer.attach(
                  'main',
                  new CosmosSprite({
                     anchor: 0,
                     frames: [ content.iooACorndog ],
                     position: player.position.subtract(0, 28),
                     gravity: { y: -0.05 },
                     spin: Math.random() < 0.5 ? -0.1 : 0.1,
                     acceleration: 1.05,
                     priority: player.position.y + 1
                  }).on('tick', function () {
                     (this.position.y <= -10 || game.room !== 'a_sans') && renderer.detach('main', this);
                  })
               );
            }
         } else {
            await dialogue('auto', ...text.a_aerialis.corndog6());
         }
      },
      async m2switch (roomState: AerialisRS['a_mettaton2']) {
         if (player.face === 'down') {
            roomState.killswitch = true;
         }
      },
      async m2climber (roomState: AerialisRS['a_mettaton2']) {
         if (game.movement) {
            game.movement = false;
            roomState.climber = true;
         }
      },
      async rg1chat () {
         const headers = rgHeaders(
            instance('main', 'securityGuard1')!.object.objects[0],
            instance('main', 'securityGuard2')!.object.objects[0]
         );
         typer.on('header', headers);
         await dialogue('dialoguerTop', ...text.a_aerialis.rg1chat());
         typer.off('header', headers);
      },
      async rg2chat () {
         const headers = rgHeaders(
            instance('main', 'securityGuard1')!.object.objects[0],
            instance('main', 'securityGuard2')!.object.objects[0]
         );
         typer.on('header', headers);
         await dialogue('dialoguerTop', ...text.a_aerialis.rg2chat());
         typer.off('header', headers);
      },
      async bedcounter () {
         if (SAVE.data.b.svr) {
            await dialogue('auto', ...text.a_aerialis.npc.a_foodreceptionist());
         } else if (adultEvac() || world.runaway) {
            await dialogue('auto', ...text.a_aerialis.gonezo());
         } else {
            const inst = instance('main', 'a_bedreceptionist')!;
            if (SAVE.data.b.a_state_bedroom) {
               await inst.talk('a', talkFinder(), 'auto', ...text.a_aerialis.bedreceptionist4());
            } else {
               await inst.talk('a', talkFinder(), 'auto', ...text.a_aerialis.bedreceptionist1());
               if (SAVE.data.n.plot === 72 || SAVE.data.b.killed_mettaton) {
                  return;
               }
               if (choicer.result === 0) {
                  if (saver.gold < 300) {
                     await inst.talk('a', talkFinder(), 'auto', ...text.a_aerialis.bedreceptionist3);
                  } else {
                     await inst.talk('a', talkFinder(), 'auto', ...text.a_aerialis.bedreceptionist2a);
                     saver.gold -= 300;
                     SAVE.data.b.a_state_bedroom = true;
                  }
               } else {
                  await inst.talk('a', talkFinder(), 'auto', ...text.a_aerialis.bedreceptionist2b);
               }
            }
         }
      },
      async sleeping2 () {
         if (SAVE.data.b.a_state_bedroom || adultEvac() || SAVE.data.n.plot === 72) {
            await teleport('a_sleeping2', 'up', 190, 230, world);
         } else {
            await dialogue('auto', ...text.a_aerialis.nosleep());
            player.position.y += 3;
            player.face = 'down';
         }
      },
      async sleeping3 () {
         if (adultEvac() || SAVE.data.n.plot === 72) {
            await teleport('a_sleeping3', 'up', 150, 230, world);
         } else {
            await dialogue('auto', ...text.a_aerialis.nosleep());
            player.position.y += 3;
            player.face = 'down';
         }
      },
      async sansdate () {
         if (!game.movement) {
            return;
         }
         const sas = instance('main', 'datesans');
         if (sas) {
            game.movement = false;
            await dialogue('auto', ...text.a_aerialis.dinnerdate1());
            if (choicer.result === 0) {
               game.music?.stop();
               await dialogue('auto', ...text.a_aerialis.dinnerdate2b);
               sas.destroy();
               const dat = character('sans', characters.sans, sas.object, 'down');
               if (player.position.x > 219) {
                  await dat.walk(renderer, 3, { x: 190 });
               } else {
                  await dat.walk(renderer, 3, { y: 160 });
               }
               dat.sprites.down.duration = Math.round(15 / 3);
               await dat.walk(renderer, 3, { x: 190, y: 160 });
               await renderer.pause(1000);
               await dialogue('auto', ...text.a_aerialis.dinnerdate3);
               await Promise.all([
                  dat.walk(renderer, 3, { x: 10 }).then(() => dat.alpha.modulate(renderer, 300, 0)),
                  player.walk(renderer, 3, { y: 160 }, { y: 160, x: 10 })
               ]);
               await teleport('a_dining', 'right', 20, 110, { cutscene: true });
               const mus = music.sansdate.instance(renderer);
               dat.face = 'right';
               dat.position.set(45, 110);
               dat.alpha.value = 1;
               await renderer.pause(950);
               dat.face = 'left';
               await renderer.pause(750);
               await dialogue('auto', ...text.a_aerialis.dinnerdate4);
               await Promise.all([
                  player.walk(renderer, 3, { x: 60 }, { x: 60, y: 185 }),
                  dat.walk(renderer, 3, { x: 60 }, { x: 60, y: 210 })
               ]);
               await renderer.pause(850);
               await dialogue('auto', ...text.a_aerialis.dinnerdate5);
               dat.face = 'up';
               await dialogue('auto', ...text.a_aerialis.dinnerdate5b);
               await Promise.all([
                  player.walk(renderer, 3, { y: 205 }, { x: 160 }, { x: 160, y: 240 }).then(() => {
                     player.face = 'left';
                  }),
                  dat.walk(renderer, 3, { y: 240 }).then(() => {
                     dat.face = 'right';
                  })
               ]);
               await renderer.pause(1850);
               await dialogue('auto', ...text.a_aerialis.dinnerdate8());
               dat.face = 'up';
               await renderer.pause(2250);
               await dialogue('auto', ...text.a_aerialis.dinnerdate10);
               dat.face = 'right';
               await dialogue('auto', ...text.a_aerialis.dinnerdate11());
               dat.face = 'up';
               await renderer.pause(1450);
               await dialogue('auto', ...text.a_aerialis.dinnerdate13);
               dat.face = 'right';
               await dialogue('auto', ...text.a_aerialis.dinnerdate14);
               mus.gain.modulate(renderer, 4000, 0);
               await dat.walk(renderer, 3, { y: 105 }, { x: 170, y: 105 }, { x: 170, y: 90 });
               await renderer.pause(3e3);
               await dialogue('auto', ...text.a_aerialis.dinnerdate14comment());
               await renderer.pause(1e3);
               await dat.walk(
                  renderer,
                  3,
                  { y: 105 },
                  { x: 60, y: 105 },
                  { x: 60, y: 200 },
                  { x: 110, y: 200 },
                  { x: 110, y: 215 }
               );
               await renderer.pause(850);
               spawnFud();
               sounds.noise.instance(renderer);
               await renderer.pause(1250);
               await dialogue('auto', ...text.a_aerialis.dinnerdate15());
               mus.gain.modulate(renderer, 1000, mus.daemon.gain);
               await dat.walk(renderer, 3, { y: 200 }, { x: 60, y: 200 }, { x: 60, y: 240 });
               await renderer.pause(850);
               dat.face = 'right';
               await dialogue('auto', ...text.a_aerialis.dinnerdate16());
               await renderer.pause(850);
               dat.face = 'down';
               await renderer.pause(1150);
               await dialogue('auto', ...text.a_aerialis.dinnerdate18());
               dat.face = 'right';
               await dialogue('auto', ...text.a_aerialis.dinnerdate19());
               SAVE.data.n.plot = 66;
               SAVE.data.b.a_state_hotelfood = true;
               game.movement = true;
               game.music = null;
               events.on('teleport-start').then(async () => {
                  await mus.gain.modulate(renderer, 300, 0);
                  mus.stop();
               });
               await Promise.race([ events.on('teleport'), dat.walk(renderer, 3, { y: 110 }, { x: -40, y: 110 }) ]);
               dat.walk(renderer);
               await dat.alpha.modulate(renderer, 0, 0);
               renderer.detach('main', dat);
            } else {
               await dialogue('auto', ...text.a_aerialis.dinnerdate2a());
               game.movement = true;
            }
         }
      },
      async lockup () {
         if (SAVE.data.b.s_state_capstation) {
            switch (SAVE.data.n.state_aerialis_lockup) {
               case 0:
                  SAVE.data.n.state_aerialis_lockup = 1;
                  instance('main', 'lockup')!.index = 1;
                  sounds.equip.instance(renderer);
                  await dialogue('auto', ...text.a_aerialis.lockup1());
                  break;
               case 1:
                  if (SAVE.storage.inventory.size < 8) {
                     SAVE.data.n.state_aerialis_lockup = 2;
                     instance('main', 'lockup')!.index = 2;
                     saver.add('old_gun');
                     sounds.equip.instance(renderer);
                     await dialogue('auto', ...text.a_aerialis.lockup2);
                  } else {
                     await dialogue('auto', ...text.a_aerialis.lockup6);
                  }
                  break;
               case 2:
                  if (SAVE.storage.inventory.size < 8) {
                     SAVE.data.n.state_aerialis_lockup = 3;
                     instance('main', 'lockup')!.index = 3;
                     saver.add('old_bomb');
                     sounds.equip.instance(renderer);
                     await dialogue('auto', ...text.a_aerialis.lockup3);
                  } else {
                     await dialogue('auto', ...text.a_aerialis.lockup6);
                  }
                  break;
               case 3:
                  if (SAVE.storage.inventory.size < 8) {
                     SAVE.data.n.state_aerialis_lockup = 4;
                     instance('main', 'lockup')!.index = 4;
                     saver.add('old_spray');
                     sounds.equip.instance(renderer);
                     await dialogue('auto', ...text.a_aerialis.lockup4);
                  } else {
                     await dialogue('auto', ...text.a_aerialis.lockup6);
                  }
                  break;
               case 4:
                  await dialogue('auto', ...text.a_aerialis.lockup5());
                  break;
            }
         } else {
            await dialogue('auto', ...text.a_aerialis.lockup0());
         }
      },
      async vender () {
         if (game.movement) {
            await dialogue('auto', ...text.a_aerialis.candy1());
            if (postSIGMA()) {
               return;
            }
            if (choicer.result === 0) {
               if (SAVE.storage.inventory.size < 8) {
                  if (saver.gold < 40) {
                     await dialogue('auto', ...text.a_aerialis.candy2);
                  } else {
                     sounds.equip.instance(renderer);
                     saver.gold -= 40;
                     saver.add('filament');
                     await dialogue('auto', ...text.a_aerialis.candy4);
                  }
               } else {
                  await dialogue('auto', ...text.a_aerialis.candy3);
               }
            } else {
               await dialogue('auto', ...text.a_aerialis.candy5);
            }
         }
      },
      async papinter () {
         if (game.movement) {
            if (SAVE.data.n.exp > 0 && !SAVE.data.b.a_state_fishbetray) {
               SAVE.data.b.a_state_fishbetray = true;
               await dialogue('auto', ...text.a_aerialis.papinter2());
            } else {
               await dialogue('auto', ...text.a_aerialis.papinter1());
            }
         }
      },
      async undinter () {
         game.movement && (await dialogue('auto', ...text.a_aerialis.undinter()));
      },
      async corepuzzle (roomState: AerialisRS['a_core_left1'] | AerialisRS['a_core_left2'], scriptState, sw) {
         if (roomState.solved) {
            await dialogue('auto', ...text.a_aerialis.puzzlesolved());
         } else if (!scriptState.activated) {
            scriptState.activated = true;
            puzzler.update(roomState, [ +sw ]);
            sounds.noise.instance(renderer);
            const ret = sounds.retract.instance(renderer);
            ret.rate.value = 2;
            ret.gain.value *= 0.75;
            await renderer.post();
            scriptState.activated = false;
         }
      },
      coreswitch (roomState: AerialisRS['a_core_left3'] | AerialisRS['a_core_right3']) {
         if (roomState.switched) {
            return;
         }
         roomState.switched = true;
         let solve = false;
         const left = game.room === 'a_core_left3';
         if (left) {
            if (SAVE.data.n.state_aerialis_corepath_puzzle < 3) {
               solve = true;
               if (SAVE.data.n.state_aerialis_corepath_warrior < 3) {
                  shake(1, 400);
                  sounds.shake.instance(renderer);
               } else {
                  sounds.noise.instance(renderer);
               }
               renderer.pause(650).then(async () => {
                  await renderer.when(() => game.movement);
                  SAVE.data.n.state_aerialis_corepath_puzzle = 3;
               });
            }
         } else if (SAVE.data.n.state_aerialis_corepath_warrior < 3) {
            solve = true;
            if (SAVE.data.n.state_aerialis_corepath_puzzle < 3) {
               shake(1, 400);
               sounds.shake.instance(renderer);
            } else {
               sounds.noise.instance(renderer);
            }
            renderer.pause(650).then(async () => {
               await renderer.when(() => game.movement);
               SAVE.data.n.state_aerialis_corepath_warrior = 3;
            });
         }
         if (solve) {
            instance('below', 'exitswitch')!.index = 1;
         } else {
            dialogue('auto', ...text.a_aerialis.coreswitched());
         }
         if (SAVE.data.n.plot < 67) {
            if (world.genocide) {
               CosmosUtils.chain<void, Promise<void>>(void 0, async (v, n) => {
                  const [ from, to ] = await events.on('teleport');
                  to === 'a_core_main' || (await n());
               }).then(async () => {
                  teleporter.movement = false;
                  game.movement = false;
                  if (left) {
                     goatbro.face = 'left';
                     goatbro.position.set(80, 460);
                     await goatbro.walk(
                        renderer,
                        3,
                        { x: 60, y: 440 },
                        { x: 60, y: 420 },
                        { x: 40, y: 400 },
                        { x: 40, y: 380 }
                     );
                  } else {
                     goatbro.face = 'right';
                     goatbro.position.set(440, 460);
                     await goatbro.walk(
                        renderer,
                        3,
                        { x: 460, y: 440 },
                        { x: 460, y: 420 },
                        { x: 480, y: 400 },
                        { x: 480, y: 380 }
                     );
                  }
                  await dialogue('auto', ...text.a_aerialis.genotext.core6a());
                  await goatbro.walk(renderer, 3, { y: player.position.y + 10 });
                  if (left) {
                     await goatbro.walk(renderer, 3, { x: player.position.x - 21 });
                  } else {
                     await goatbro.walk(renderer, 3, { x: player.position.x + 21 });
                  }
                  await goatbro.walk(renderer, 3, { y: player.position.y });
                  goatbro.metadata.override = false;
                  tracker.supplant(left ? 'right' : 'left');
                  await renderer.pause(850);
                  await dialogue('auto', ...text.a_aerialis.genotext.core6b);
                  game.movement = true;
               });
            }
            SAVE.data.n.plot = 67;
         }
      },
      async alphys5 () {
         if (
            SAVE.data.n.plot < 55 &&
            !world.badder_lizard &&
            SAVE.data.n.state_foundry_undyne === 0 &&
            !SAVE.data.b.a_state_puzzlehelp
         ) {
            SAVE.data.b.a_state_puzzlehelp = true;
            await dialogue('auto', ...text.a_aerialis.puzzlehelp);
         }
      }
   } as Partial<CosmosKeyed<(roomState: any, scriptState: any, ...args: string[]) => any>>,
   tickers: {
      a_hub2 () {
         const lockup = instance('main', 'lockup');
         if (lockup) {
            lockup.index = SAVE.data.n.state_aerialis_lockup;
         }
      },
      async a_lab_entry () {
         updateObjects();
         if (world.genocide && player.position.y < 420 && SAVE.data.n.state_aerialis_monologue < 1) {
            SAVE.data.n.state_aerialis_monologue = 1;
            SAVE.data.n.state_aerialis_monologue_iteration1 = SAVE.flag.n.ga_asriel46++;
            if (SAVE.data.n.state_aerialis_monologue_iteration1 < 1) {
               await dialogue('auto', ...text.a_aerialis.genotext.asriel46);
            }
         }
         if (world.genocide && player.position.y < 280 && SAVE.data.n.state_aerialis_monologue < 2) {
            SAVE.data.n.state_aerialis_monologue = 2;
            if (SAVE.data.n.state_aerialis_monologue_iteration1 < 1) {
               await dialogue('auto', ...text.a_aerialis.genotext.asriel47);
            }
         }
         if (world.genocide && player.position.x > 280 && SAVE.data.n.state_aerialis_monologue < 3) {
            SAVE.data.n.state_aerialis_monologue = 3;
            if (SAVE.data.n.state_aerialis_monologue_iteration1 < 1) {
               await dialogue('auto', ...text.a_aerialis.genotext.asriel48);
            }
         }
      },
      async a_lab_main (roomState) {
         updateObjects();
         if (!roomState.cutscene) {
            roomState.cutscene = true;
            if (SAVE.data.n.plot < 49) {
               await renderer.when(() => game.room === 'a_lab_main' && player.position.x > 450 && game.movement);
               game.movement = false;
               SAVE.data.n.plot = 49;
               SAVE.data.n.state_aerialis_basebully = SAVE.data.n.bully;
               SAVE.data.n.state_aerialis_basekill = world.trueKills;
               game.music?.stop();
               player.face = 'right';
               await renderer.pause(850);
               const cam = new CosmosObject({ position: player.position.clamp(...renderer.region) });
               game.camera = cam;
               if (world.bad_lizard < 2 && SAVE.data.n.state_foundry_undyne !== 2) {
                  cam.position.modulate(renderer, 1250, { x: 550 });
                  const labLoader = content.amLab.load();
                  const alph = lizard({ x: 800, y: player.position.y }, 'left');
                  alph.tint = tints.dark02;
                  await alph.walk(renderer, 3, { x: 650 });
                  const shocker = new CosmosSprite({
                     anchor: { x: 0, y: 1 },
                     position: alph.position,
                     tint: tints.dark02,
                     frames: [ content.iocAlphysFreaked ]
                  });
                  alph.alpha.value = 0;
                  renderer.attach('main', shocker);
                  const gameshowLoader = content.amGameshow.load();
                  await notifier(alph);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.alphys1());
                  renderer.detach('main', shocker);
                  alph.alpha.value = 1;
                  if (SAVE.data.n.state_foundry_undyne > 0) {
                     await renderer.pause(1650);
                  }
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.alphys2());
                  await renderer.pause(550);
                  alph.face = 'down';
                  await renderer.pause(350);
                  sounds.noise.instance(renderer);
                  updateObjects();
                  player.tint = void 0;
                  alph.tint = void 0;
                  await renderer.pause(850);
                  alph.face = 'left';
                  await antifreeze([ labLoader, renderer.pause(1150) ]);
                  const labMusic = music.lab.instance(renderer);
                  if (SAVE.data.n.state_foundry_undyne > 0) {
                     labMusic.rate.value *= 0.8;
                  } else if (world.bad_lizard === 1) {
                     labMusic.rate.value *= 0.9;
                  }
                  function slam () {
                     sounds.metapproach.instance(renderer);
                     shake();
                  }
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.alphys3());
                  slam();
                  labMusic.stop();
                  content.amLab.unload();
                  await renderer.pause(1950);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.alphys4());
                  await renderer.pause(1750);
                  slam();
                  await renderer.pause(1550);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.alphys5());
                  await renderer.pause(1350);
                  slam();
                  await renderer.pause(1550);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.alphys6());
                  await renderer.pause(1150);
                  slam();
                  await renderer.pause(550);
                  slam();
                  await renderer.pause(550);
                  slam();
                  await renderer.pause(550);
                  slam();
                  await renderer.pause(1950);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.alphys7());
                  sounds.swing.instance(renderer);
                  const exploder = new CosmosRectangle({
                     alpha: 0,
                     fill: 0xffffff,
                     size: { x: 320, y: 240 },
                     priority: -Infinity
                  });
                  renderer.attach('menu', exploder);
                  await exploder.alpha.modulate(renderer, 1000, 1);
                  const blackfader = new CosmosRectangle({ alpha: 0, fill: 0, size: { x: 320, y: 240 } });
                  renderer.attach('menu', blackfader);
                  await blackfader.alpha.modulate(renderer, 2000, 1);
                  await renderer.pause(1000);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.alphys8());
                  await renderer.pause(350);
                  sounds.drumroll.instance(renderer);
                  await renderer.pause(1450);
                  sounds.noise.instance(renderer);
                  alph.face = 'up';
                  player.face = 'up';
                  alph.position.y = 160;
                  player.position.y = 160;
                  renderer.detach('menu', exploder, blackfader);
                  const metta = character('mettaton', characters.mettaton1C, { x: 550, y: 135 }, 'down');
                  const over = new CosmosSprite({ blend: BLEND_MODES.MULTIPLY, frames: [ content.iooASpotlight ] });
                  renderer.attach('menu', over);
                  await antifreeze([ gameshowLoader, renderer.pause(950) ]);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.alphys9);
                  metta.face = 'left';
                  metta.sprite.enable();
                  const ap = sounds.applause.instance(renderer);
                  over.alpha.modulate(renderer, 1500, 0.5);
                  const showtime = music.gameshow.instance(renderer);
                  const discospr = new CosmosAnimation({
                     active: true,
                     position: { x: cam.position.x },
                     anchor: { x: 0, y: 1 },
                     resources: content.iooADiscoball,
                     priority: 1000
                  });
                  renderer.attach('main', discospr);
                  discospr.position.modulate(renderer, 3000, { y: 37 });
                  const confetti = {
                     active: true,
                     cooldown: 0,
                     x1: cam.position.x - 160,
                     x2: cam.position.x + 160,
                     y1: 130,
                     y2: 190,
                     objects: [] as CosmosSprite[]
                  };
                  const confettiTicker = async () => {
                     if (confetti.active && confetti.cooldown-- === 0) {
                        confetti.cooldown = 1;
                        const time = renderer.time;
                        const timePhase = Math.random();
                        const target = CosmosMath.remap(Math.random(), confetti.y1, confetti.y2);
                        const ind = new CosmosAnimation({
                           anchor: 0,
                           metadata: { landed: false },
                           position: { x: CosmosMath.remap(Math.random(), confetti.x1, confetti.x2), y: target - 200 },
                           resources: content.iooAConfetti,
                           priority: target,
                           tint: CosmosImageUtils.color.of(`hsl(${Math.floor(Math.random() * 360)},100%,50%)`)
                        }).on('tick', function () {
                           if (!this.metadata.landed) {
                              const w = sineWaver(time, 1500, 0, 1, timePhase);
                              this.offsets[0].x = CosmosMath.remap(w, -20, 20);
                              this.index = [ 0, 1, 2 ][Math.round(w * 2)];
                           }
                        });
                        confetti.objects.push(ind);
                        renderer.attach('main', ind);
                        await ind.position.step(renderer, 4, { y: target });
                        ind.metadata.landed = true;
                        ind.disable();
                        await ind.alpha.modulate(renderer, 5000, 0);
                        renderer.detach('main', ind);
                        confetti.objects.splice(confetti.objects.indexOf(ind), 1);
                     }
                  };
                  renderer.on('tick', confettiTicker);
                  confetti.active = true;
                  await renderer.pause(2000);
                  confetti.active = false;
                  metta.face = 'down';
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.alphys10());
                  if (iFancyYourVilliany()) {
                     await renderer.pause(3850);
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.alphys10a());
                     await renderer.pause(3850);
                  } else {
                     confetti.active = true;
                     confetti.x1 = player.position.x - 40;
                     confetti.x2 = player.position.x + 40;
                     const centerY = Math.min(Math.max(player.position.y, 150), 170);
                     confetti.y1 = centerY - 20;
                     confetti.y2 = centerY + 20;
                     metta.preset = characters.mettaton2C;
                     metta.face = 'down';
                     metta.sprite.enable();
                     sounds.clap.instance(renderer);
                     await renderer.pause(2250);
                     confetti.active = false;
                  }
                  metta.preset = characters.mettaton1C;
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.alphys11());
                  if (iFancyYourVilliany() && world.flirt <= 9) {
                     metta.preset = characters.mettaton3C;
                     metta.face = 'down';
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.alphys11a());
                     SAVE.data.n.state_aerialis_moniker = (choicer.result + 1) as 1 | 2 | 3 | 4;
                     updateMoniker();
                     metta.preset = characters.mettaton1C;
                  }
                  metta.face = 'up';
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.alphys11b());
                  await renderer.pause(850);
                  metta.face = 'right';
                  ap.stop();
                  sounds.clap.stop();
                  showtime.stop();
                  content.amGameshow.unload();
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.alphys12());
                  renderer.off('tick', confettiTicker);
                  game.music = null;
                  await battler.encounter(player, groups.mettaton1, false);
                  player.face = 'right';
                  renderer.detach('main', metta, discospr, ...confetti.objects);
                  renderer.detach('menu', over);
                  if (SAVE.data.n.state_foundry_undyne > 0) {
                     alph.face = 'down';
                     await renderer.pause(1650);
                     alph.face = 'left';
                  } else {
                     alph.face = 'left';
                     await alph.walk(renderer, 3, player.position.add(40, 0));
                     await renderer.pause(1250);
                  }
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.alphys13());
                  if (SAVE.data.n.state_foundry_undyne > 0) {
                     alph.walk(renderer, 4, { x: game.camera.position.x + 180 }).then(() => {
                        renderer.detach('main', alph);
                     });
                  } else {
                     await alph.walk(renderer, 1.5, player.position.add(30, 0));
                     await renderer.pause(1450);
                     await dialogue('dialoguerTop', ...text.a_aerialis.story.alphys14);
                     await alph.walk(renderer, 3, { x: game.camera.position.x + 180, y: player.position.y });
                     await renderer.pause(1650);
                     sounds.alphysfix.instance(renderer);
                     await renderer.pause(3450);
                     await alph.walk(renderer, 3, player.position.add(30, 0));
                     await dialogue('dialoguerTop', ...text.a_aerialis.story.alphys15());
                     alph.face = 'right';
                     await renderer.pause(650);
                     alph.face = 'left';
                     await renderer.pause(1150);
                     await dialogue('dialoguerTop', ...text.a_aerialis.story.alphys16);
                     roomState.alph = alph;
                     alph.metadata.barrier = true;
                     alph.metadata.interact = true;
                     alph.metadata.name = 'aerialis';
                     alph.metadata.args = [ 'lablizard' ];
                     alph.size.set(18, 20);
                     alph.anchor.set(0, 1);
                     alph
                        .walk(
                           renderer,
                           3,
                           { x: 324, y: player.position.y > 150 && player.position.y < 170 ? 180 : 160 },
                           { y: 145 }
                        )
                        .then(() => {
                           sounds.select.instance(renderer).rate.value = 0.6;
                           instance('below', 'labdesk')!.index = 1;
                        });
                  }
                  await renderer.pause(450);
                  await cam.position.modulate(renderer, 1250, { x: player.position.x });
               } else {
                  const metta = character('mettaton', characters.mettaton1C, { x: 650, y: player.position.y }, 'down', {
                     tint: tints.dark02
                  });
                  goatbro.face = 'right';
                  await cam.position.modulate(renderer, 1250, { x: 550 });
                  await renderer.pause(650);
                  sounds.noise.instance(renderer);
                  updateObjects(false);
                  metta.tint = void 0;
                  await renderer.pause(1250);
                  function mettaEmotes (h: string) {
                     if (h[0] === 'z') {
                        metta.preset = [
                           characters.mettaton1C,
                           characters.mettaton2C,
                           characters.mettaton3C,
                           characters.mettaton4C
                        ][+h[1]];
                        metta.face = [ 'down', 'left', 'right', 'up' ][+h[2]] as CosmosDirection;
                     }
                  }
                  typer.on('header', mettaEmotes);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.robocaller1());
                  if (world.genocide) {
                     metta.preset = characters.mettaton1C;
                     metta.face = 'down';
                     await renderer.pause(650);
                     await dialogue('dialoguerTop', ...text.a_aerialis.story.robocaller1x);
                     await renderer.pause(850);
                     if (world.genocide) {
                        SAVE.flag.n._genocide_milestone_last = 3;
                        SAVE.flag.n.genocide_milestone = Math.max(3, SAVE.flag.n.genocide_milestone) as 3;
                     }
                     await dialogue('dialoguerTop', ...text.a_aerialis.story.robocaller2());
                  }
                  typer.off('header', mettaEmotes);
                  metta.walk(renderer, 4, { x: game.camera.position.x + 180, y: player.position.y }).then(() => {
                     renderer.detach('main', metta);
                  });
                  renderer.pause(650).then(() => {
                     sounds.noise.instance(renderer);
                     updateObjects(true);
                     metta.tint = tints.dark02;
                  });
                  await cam.position.modulate(renderer, 1250, { x: player.position.x });
                  if (world.genocide && SAVE.flag.n.ga_asrielRobo1++ < 1) {
                     await dialogue('dialoguerTop', ...text.a_aerialis.story.robocaller2x());
                  }
               }
               game.camera = player;
               quickresume();
               game.movement = true;
            }
         }
      },
      async a_lab_upstairs () {
         updateObjects();
         const mewanim = instance('below', 'mewposter')!.object.objects[0] as CosmosAnimation;
         mewanim.extrapolate = false;
         mewanim.duration = SAVE.data.n.plot < 49 || SAVE.data.b.svr || world.runaway || postSIGMA() ? 36 : 18;
      },
      async a_path3 () {
         (SAVE.data.n.plot === 72 ||
            world.bad_lizard > 1 ||
            SAVE.data.b.bad_lizard ||
            world.population < 6 ||
            roomKills().a_path3 > 0) &&
            instance('main', 'a_greenfire')?.destroy();
         if (world.genocide && player.position.y < 240 && SAVE.data.n.state_aerialis_monologue < 4) {
            SAVE.data.n.state_aerialis_monologue = 4;
            SAVE.data.n.state_aerialis_monologue_iteration2 = SAVE.flag.n.ga_asriel49++;
            if (SAVE.data.n.state_aerialis_monologue_iteration2 < 1) {
               await dialogue('auto', ...text.a_aerialis.genotext.asriel49);
            }
         }
      },
      async a_path4 () {
         SAVE.data.b.item_sonic && instance('below', 'sonic')?.destroy();
      },
      async a_rg1 () {
         if (world.genocide && player.position.x > 140 && SAVE.data.n.state_aerialis_monologue < 5) {
            SAVE.data.n.state_aerialis_monologue = 5;
            if (SAVE.data.n.state_aerialis_monologue_iteration2 < 1) {
               await dialogue('auto', ...text.a_aerialis.genotext.asriel50);
            }
         }
         if (world.genocide && player.position.x > 440 && SAVE.data.n.state_aerialis_monologue < 6) {
            SAVE.data.n.state_aerialis_monologue = 6;
            if (SAVE.data.n.state_aerialis_monologue_iteration2 < 1) {
               await dialogue('auto', ...text.a_aerialis.genotext.asriel51);
            }
         }
      },
      async a_puzzle1 (roomState) {
         if (SAVE.data.n.plot < 55 && game.movement) {
            let di = 0;
            roomState.offset ??= 0;
            if (player.position.y <= 180) {
               di = 200;
               roomState.offset++;
            } else if (roomState.offset > 0 && player.position.y > 380) {
               di = -200;
               roomState.offset--;
            }
            partyShift({ y: di });
            if (roomState.offset === (roomState.offsetCheckpoint ?? 25)) {
               if (!world.badder_lizard) {
                  game.movement = false;
                  await dialogue('auto', ...text.a_aerialis.puzzle.puzzlestop1a());
                  if (SAVE.data.n.state_foundry_undyne !== 1) {
                     const obj = fader({ fill: 0xffffff });
                     await obj.alpha.modulate(renderer, 1000, 1);
                     await renderer.pause(400);
                     roomState.offset -= 10;
                     obj.alpha.modulate(renderer, 600, 0).then(() => renderer.detach('menu', obj));
                  } else {
                     roomState.offsetCheckpoint = roomState.offsetCheckpoint === void 0 ? 27 : 29;
                  }
                  game.movement = true;
               } else if (world.genocide) {
                  game.movement = false;
                  await dialogue('auto', ...text.a_aerialis.puzzle.puzzlestop1b());
                  player.position.y += 3;
                  player.face = 'down';
                  game.movement = true;
               }
            } else if (roomState.offset === 30) {
               game.movement = false;
               fader({
                  fill: 0xffffff,
                  priority: Infinity,
                  alpha: 1,
                  size: 1000,
                  position: { x: 160, y: 320 },
                  anchor: 0
               });
               game.music?.stop();
               roomState.offset = 50;
               await renderer.pause(3000);
               saver.time_but_real.stop();
               exit();
            }
         }
      },
      async a_sans () {
         if (
            SAVE.data.n.plot === 72 ||
            world.bad_lizard > 1 ||
            SAVE.data.b.bad_lizard ||
            world.population < 6 ||
            roomKills().a_sans > 1
         ) {
            instance('main', 'a_harpy')?.destroy();
         } else if (SAVE.data.n.plot > 56 || world.edgy_xxx || world.dead_skeleton) {
            const inst = instance('main', 'a_harpy');
            if (inst && !inst.object.metadata.noCorny) {
               inst.object.metadata.noCorny = true;
               (inst.object.objects[0] as CosmosAnimation).resources = content.ionAHarpyNoCorny;
            }
         }
      },
      async a_puzzle2 (roomState) {
         (SAVE.data.n.plot === 72 || world.bad_lizard > 1 || SAVE.data.b.bad_lizard || world.population < 4) &&
            instance('main', 'a_proskater')?.destroy();
         (SAVE.data.n.plot === 72 || world.bad_lizard > 1 || SAVE.data.b.bad_lizard || world.population < 2) &&
            instance('main', 'a_clamguy')?.destroy();
         if (SAVE.data.n.plot < 59 && game.movement) {
            const di = { x: 0, y: 0 };
            roomState.offset ??= 0;
            if (player.position.y <= 120) {
               di.y = 240;
               SAVE.data.n.state_aerialis_puzzle2os++;
            } else if (player.position.y > 360) {
               di.y = -240;
               SAVE.data.n.state_aerialis_puzzle2os--;
            }
            if (player.position.x <= 670) {
               di.x = 300;
               roomState.offset++;
               renderer.region[1].x = Infinity;
            } else if (roomState.offset > 0 && player.position.x > 970) {
               di.x = -300;
               roomState.offset--;
               if (roomState.offset === 0) {
                  renderer.region[1].x = 860;
               }
            }
            partyShift(di);
            const o1 = roomState.offset === (roomState.offsetCheckpoint ?? 25);
            const o2 = SAVE.data.n.state_aerialis_puzzle2os === (roomState.offsetCheckpoint ?? 25);
            const o3 = SAVE.data.n.state_aerialis_puzzle2os === -(roomState.offsetCheckpoint ?? 25);
            if (o1 || o2 || o3) {
               if (!world.badder_lizard) {
                  game.movement = false;
                  await dialogue('auto', ...text.a_aerialis.puzzle.puzzlestop1a());
                  if (SAVE.data.n.state_foundry_undyne !== 1) {
                     const obj = fader({ fill: 0xffffff });
                     await obj.alpha.modulate(renderer, 1000, 1);
                     await renderer.pause(400);
                     o1 && (roomState.offset -= 10);
                     o2 && (SAVE.data.n.state_aerialis_puzzle2os -= 10);
                     o3 && (SAVE.data.n.state_aerialis_puzzle2os += 10);
                     obj.alpha.modulate(renderer, 600, 0).then(() => renderer.detach('menu', obj));
                  } else {
                     roomState.offsetCheckpoint = roomState.offsetCheckpoint === void 0 ? 27 : 29;
                  }
                  game.movement = true;
               } else if (world.genocide) {
                  game.movement = false;
                  await dialogue('auto', ...text.a_aerialis.puzzle.puzzlestop1b());
                  o1 && (player.position.x += 3);
                  o2 && (player.position.y += 3);
                  o3 && (player.position.y -= 3);
                  player.face = 'down';
                  game.movement = true;
               }
            } else if (
               roomState.offset === 30 ||
               SAVE.data.n.state_aerialis_puzzle2os === 30 ||
               SAVE.data.n.state_aerialis_puzzle2os === -30
            ) {
               game.movement = false;
               fader({
                  fill: 0xffffff,
                  priority: Infinity,
                  alpha: 1,
                  size: 1000,
                  position: { x: 160, y: 320 },
                  anchor: 0
               });
               game.music?.stop();
               roomState.offset = 50;
               await renderer.pause(3000);
               saver.time_but_real.stop();
               exit();
            }
         }
      },
      async a_rg2 () {
         instance('below', 'signposter')!.index = 1;
         if (
            !world.genocide &&
            !world.edgy_xxx &&
            (world.dead_skeleton ? !SAVE.data.b.a_state_moneyfish : world.bad_lizard <= 1) &&
            SAVE.data.n.plot_call < 6
         ) {
            teleporter.movement = false;
            game.movement = false;
            SAVE.data.n.plot_call = 6;
            await dialogue('auto', ...text.a_aerialis.sanscall1());
            game.movement = true;
         }
      },
      async a_split () {
         const car = instance('main', 'megacarrier')?.object;
         if (car && !car.metadata.init) {
            car.metadata.init = true;
            const carryTime = renderer.time;
            const carryY = car.position.y;
            car.on('tick', function () {
               this.position.y = sineWaver(carryTime, 4000, carryY, carryY - 5);
            });
         }
         (SAVE.data.b.svr ||
            world.runaway ||
            world.bad_lizard > 1 ||
            SAVE.data.b.bad_lizard ||
            epilogueOverride(world.population < 2) ||
            roomKills().a_split > 0) &&
            instance('main', 'a_madguy')?.destroy();
      },
      a_prepuzzle () {
         (world.bad_lizard > 1 ||
            SAVE.data.b.bad_lizard ||
            world.population < 6 ||
            SAVE.data.b.svr ||
            world.runaway ||
            roomKills().a_prepuzzle > 0 ||
            SAVE.data.b.killed_mettaton) &&
            instance('main', 'a_dresslion')?.destroy();
      }
   } as { [k in AerialisRoomKey]?: (roomState: AerialisRS[k], ...args: string[]) => any },
   teleports: {
      a_start () {
         (SAVE.data.b.svr || world.runaway || world.bad_lizard > 1 || SAVE.data.b.bad_lizard || world.population < 6) &&
            instance('main', 'a_blackfire')?.destroy();
      },
      a_lift (roomState, from) {
         from === '_void' || (roomState.location = from as AerialisRS['a_lift']['location']);
      },
      async a_citadelevator (roomState: AerialisRS['a_lift'], from) {
         from === '_void' || (roomState.location = from as AerialisRS['a_lift']['location']);
         if (SAVE.data.n.plot === 72 && SAVE.data.n.plot_epilogue < 3 && !world.runaway) {
            return;
         }
         instance('main', 'eblocker')?.destroy();
         if (SAVE.data.n.plot_approach < 2 && 70 <= SAVE.data.n.plot && world.bad_robot) {
            SAVE.data.n.plot_approach = 2;
            teleporter.movement = false;
            game.movement = false;
            await dialogue('auto', ...text.a_aerialis.approachescape);
            game.movement = true;
         }
      },
      a_lab_downstairs () {
         rampup();
         world.genocide && instance('below', 'syringe')?.destroy();
         (2 <= SAVE.data.n.bad_lizard || SAVE.data.n.state_foundry_undyne !== 1 || SAVE.data.b.a_state_gotphone) &&
            instance('main', 'compactlazerdeluxe')?.destroy();
      },
      a_lab_main (roomState) {
         rampup();
         if (SAVE.data.n.plot < 48.1) {
            SAVE.data.n.plot = 48.1;
            if (world.genocide) {
               SAVE.data.n.bad_lizard = 3;
            } else if (world.trueKills > 29 && SAVE.data.n.state_foundry_undyne === 2) {
               SAVE.data.n.bad_lizard = 2;
            } else {
               const score =
                  // encounters (full area massacre: outlands - 25, starton/foundry - 50)
                  // score per area follows a power-of-two curve from 0 to 1.
                  // in other words, point gains start out small, but increase the more kills in an area.
                  (SAVE.data.n.kills_wastelands / 16) ** 2 * 0.25 + // outlands
                  (SAVE.data.n.kills_starton / world.popmax(0)) ** 2 * 0.5 + // starton
                  (SAVE.data.n.kills_foundry / world.popmax(1)) ** 2 * 0.5 + // foundry
                  //
                  // people alphys doesn't know that well - 10
                  (SAVE.data.n.state_wastelands_toriel === 2 ? 0.1 : 0) + // toriel
                  (SAVE.data.n.state_foundry_doge === 1 ? 0.1 : 0) + // doge
                  (SAVE.data.n.state_foundry_muffet === 1 ? 0.1 : 0) + // muffet
                  (SAVE.data.n.state_foundry_maddummy === 1 ? 0.1 : 0) + // mad dummy
                  (SAVE.data.b.killed_shyren ? 0.1 : 0) + // shyren
                  //
                  // adorable puppies that you should not kill - 20/30
                  (SAVE.data.n.state_starton_doggo === 2 ? 0.2 : 0) + // doggo
                  (SAVE.data.n.state_starton_lesserdog === 2 ? 0.2 : 0) + // canis minor
                  (SAVE.data.n.state_starton_dogs === 2 ? 0.4 : 0) + // dogamy + dogaressa
                  (SAVE.data.n.state_starton_greatdog === 2 ? 0.2 : 0) + // canis major
                  //
                  // people alphys cares about a lot (papyrus - 50, left undyne to die - 50, undyne - 70)
                  (SAVE.data.n.state_starton_papyrus === 1 ? 0.5 : 0) +
                  (SAVE.data.n.state_foundry_undyne === 2 ? 0.7 : SAVE.data.n.state_foundry_undyne === 1 ? 0.5 : 0);
               if (score < 0.5) {
                  SAVE.data.n.bad_lizard = 0;
               } else if (score < 1.25 || world.alphys_percieved_kills < 10) {
                  SAVE.data.n.bad_lizard = 1;
               } else {
                  SAVE.data.n.bad_lizard = 2;
               }
            }
         }
         ((world.bad_lizard < 2 && SAVE.data.n.state_foundry_undyne !== 2) || SAVE.data.b.a_state_gotphone) &&
            instance('main', 'compactlazerdeluxe')?.destroy();
         if (labspawn()) {
            roomState.alph = lizard({ x: 324, y: 145 }, 'up');
            instance('below', 'labdesk')!.index = 1;
         } else {
            roomState.alph = void 0;
            instance('below', 'labdesk')!.index = 0;
         }
         if (SAVE.data.b.svr || postSIGMA()) {
            instance('below', 'screenborder')?.destroy();
            temporary(new CosmosRectangle({ alpha: 1, fill: 0, priority: -1, size: 1000 }), 'below');
            return;
         }
         function gt () {
            return text.a_aerialis.overworld.labdisplay
               .replace('$(x)', Math.min(SAVE.data.n.exp, 99999).toString())
               .replace('$(y)', Math.min(SAVE.data.n.hp, 99999).toString())
               .replace('$(z)', Math.min(saver.gold, 99999).toString())
               .replace('$(w)', Math.floor(player.position.extentOf({ x: 210, y: 123 }) / 20).toString());
         }
         temporary(
            new CosmosText({
               alpha: 0.8,
               fontFamily: content.fDeterminationMono,
               fontSize: 8,
               fill: 0xffffff,
               position: { x: 185, y: 50 },
               objects: [
                  new CosmosAnimation({ anchor: { x: 0, y: 1 }, position: { x: 45, y: 35 } }).on('tick', function () {
                     this.resources = SAVE.data.b.water ? content.iooAMonitorguyWater : content.iooAMonitorguy;
                     player.sprite.active ? this.enable() : this.reset();
                  })
               ],
               filters: [ filters.crt ]
            }).on('tick', function () {
               this.content = gt();
            }),
            'below'
         );
         // monitor setup
         const labdesk = instance('below', 'labdesk')!.object.objects[0] as CosmosAnimation;
         const leadbelt = instance('below', 'leadbelt')!.object.objects[0] as CosmosAnimation;
         function spawnObject (depth = 0) {
            const ob = new CosmosObject<any>({
               scale: 1 / 2,
               priority: -1,
               filters: [ filters.crt ],
               metadata: { yCutoff: [ 0, 150, 125 ][depth] },
               objects: [
                  new CosmosSprite({
                     crop: { bottom: -1103, left: 0, right: -840, top: 863 },
                     frames: [ maps.of('aerialis-a').image ]
                  })
               ]
            }).on('x', function () {
               depth === 0 && (filters.crt.time += 0.5);
               if (depth === 0 || player.position.y < this.metadata.yCutoff) {
                  this.alpha.value = 1;
               } else {
                  this.alpha.value = 0;
                  return;
               }
               this.position.set(
                  new CosmosPoint(100, 47).subtract(
                     this.scale.multiply(
                        Math.max(player.position.x - 60, 0),
                        Math.max(Math.min(player.position.y, 185) - 65, 0)
                     )
                  )
               );
            });
            depth === 0 && (filters.crt.time = 0);
            if (depth < 2) {
               ob.attach(
                  new CosmosAnimation<any>({
                     active: true,
                     position: { x: 60, y: 10 },
                     anchor: { y: 1 },
                     resources: content.iooAConveyor
                  }).on('x', function () {
                     this.index = leadbelt.index;
                     this.alpha.value = player.position.x < 140 ? 1 : 0;
                  }),
                  new CosmosAnimation<any>({
                     active: true,
                     position: { x: 60, y: 30 },
                     anchor: { y: 1 },
                     resources: content.iooAConveyor
                  }).on('x', function () {
                     this.index = leadbelt.index;
                     this.alpha.value = player.position.x < 140 ? 1 : 0;
                  }),
                  new CosmosAnimation<any>({
                     active: true,
                     position: { x: 60, y: 50 },
                     anchor: { y: 1 },
                     resources: content.iooAConveyor
                  }).on('x', function () {
                     this.index = leadbelt.index;
                     this.alpha.value = player.position.x < 140 ? 1 : 0;
                  }),
                  new CosmosAnimation<any>({
                     active: true,
                     position: { x: 60, y: 70 },
                     anchor: { y: 1 },
                     resources: content.iooAConveyor
                  }).on('x', function () {
                     this.index = leadbelt.index;
                     this.alpha.value = player.position.x < 140 ? 1 : 0;
                  }),
                  new CosmosAnimation<any>({
                     active: true,
                     position: { x: 60, y: 90 },
                     anchor: { y: 1 },
                     resources: content.iooAConveyor
                  }).on('x', function () {
                     this.index = leadbelt.index;
                     this.alpha.value = player.position.x < 140 ? 1 : 0;
                  }),
                  new CosmosAnimation<any>({
                     active: true,
                     position: { x: 60, y: 110 },
                     anchor: { y: 1 },
                     resources: content.iooAConveyor
                  }).on('x', function () {
                     this.index = leadbelt.index;
                     this.alpha.value = player.position.x < 140 ? 1 : 0;
                  }),
                  ...(depth < 1
                     ? [
                          new CosmosAnimation<any>({
                             anchor: { x: 0, y: 1 },
                             position: { x: 324, y: 147 },
                             resources: content.iooALabtable
                          }).on('x', function () {
                             this.index = labdesk.index;
                             this.alpha.value = player.position.x > 218 ? 1 : 0;
                          }),
                          new CosmosText<any>({
                             alpha: 0.8,
                             fontFamily: content.fDeterminationMono,
                             fontSize: 8,
                             fill: 0xffffff,
                             position: { x: 185, y: 50 },
                             objects: [
                                new CosmosAnimation<any>({ anchor: { x: 0, y: 1 }, position: { x: 45, y: 35 } }).on(
                                   'x',
                                   function () {
                                      if (player.position.x > 125 && player.position.y < 147) {
                                         this.resources = SAVE.data.b.water
                                            ? content.iooAMonitorguyWater
                                            : content.iooAMonitorguy;
                                         player.sprite.active ? this.enable() : this.reset();
                                      }
                                   }
                                )
                             ],
                             filters: [ filters.crt ]
                          }).on('x', function () {
                             if (player.position.x > 125 && player.position.y < 147) {
                                this.content = gt();
                                this.alpha.value = 1;
                             } else {
                                this.alpha.value = 0;
                             }
                          })
                       ]
                     : []),
                  ...(depth < 1
                     ? [
                          new CosmosAnimation<any>({ anchor: { x: 0, y: 1 } }).on('x', function () {
                             if (roomState.alph) {
                                this.alpha.value = 1;
                                const res = (roomState.alph.sprite as CosmosAnimation).resources;
                                this.resources === res || this.use(res);
                                this.index = roomState.alph.sprite.index;
                                this.position.set(roomState.alph);
                                this.priority.value = roomState.alph.priority.value;
                             } else {
                                this.alpha.value = 0;
                             }
                          })
                       ]
                     : []),
                  ...CosmosUtils.populate(world.goatbro ? 2 : 1, i =>
                     new CosmosAnimation<any>({ anchor: { x: 0, y: 1 } }).on('x', function () {
                        const tar = world.goatbro
                           ? player.position.y > goatbro.position.y
                              ? [ goatbro, player ][i]
                              : [ player, goatbro ][i]
                           : player;
                        const res = (tar.sprite as CosmosAnimation).resources;
                        this.resources === res || this.use(res);
                        this.index = tar.sprite.index;
                        this.position.set(tar);
                     })
                  ),
                  spawnObject(depth + 1)
               );
            }
            return ob;
         }
         const ob = spawnObject();
         ob.on('tick', async function () {
            await player.on('tick', 999999999999);
            CosmosUtils.chain(ob, (ob, n) => {
               ob.fire('x');
               for (const c of ob.objects) {
                  n(c);
               }
            });
         });
         temporary(ob, 'below');
      },
      a_lab_upstairs () {
         rampup();
      },
      a_barricade1 () {
         const b = { barricade1: 52, barricade2: 53, barricade3: 54 };
         for (const tag of Object.keys(b)) {
            const barr = instance('main', tag);
            if (barr) {
               const p = b[tag as keyof typeof b];
               if (SAVE.data.n.plot < p && !world.badder_lizard) {
                  const m = barr.object.metadata;
                  if (!m.active) {
                     const time = renderer.time;
                     m.active = true;
                     barr.object.on('tick', function () {
                        if (
                           (p <= SAVE.data.n.plot || world.badder_lizard || SAVE.data.n.state_foundry_undyne === 1) &&
                           !this.metadata.up
                        ) {
                           this.metadata.up = true;
                           this.gravity.y = -0.8;
                           Promise.race([ renderer.when(() => this.position.y <= 0), events.on('teleport') ]).then(() =>
                              barr.destroy()
                           );
                        }
                     });
                     for (const subobj of barr.object.objects) {
                        if (subobj instanceof CosmosSprite) {
                           subobj.on('tick', function () {
                              this.position.y = sineWaver(time, 4000, 0, -3);
                           });
                           break;
                        }
                     }
                  }
               } else {
                  barr.destroy();
               }
            }
         }
      },
      a_barricade2 () {
         if (world.postnoot && SAVE.data.n.plot < 62) {
            SAVE.data.n.plot = 62;
            world.nootflags.add('a_barricade2');
         }
         const b = { barricade4: 62, barricade5: 62 };
         for (const tag of Object.keys(b)) {
            const barr = instance('main', tag);
            if (barr) {
               const p = b[tag as keyof typeof b];
               if (SAVE.data.n.plot < p && !world.badder_lizard) {
                  const m = barr.object.metadata;
                  if (!m.active) {
                     const time = renderer.time;
                     m.active = true;
                     barr.object.on('tick', function () {
                        if (
                           (p <= SAVE.data.n.plot || world.badder_lizard || SAVE.data.n.state_foundry_undyne === 1) &&
                           !this.metadata.up
                        ) {
                           this.metadata.up = true;
                           this.gravity.y = -0.8;
                           Promise.race([ renderer.when(() => this.position.y <= 0), events.on('teleport') ]).then(() =>
                              barr.destroy()
                           );
                        }
                     });
                     for (const subobj of barr.object.objects) {
                        if (subobj instanceof CosmosSprite) {
                           subobj.on('tick', function () {
                              this.position.y = sineWaver(time, 4000, 0, -3);
                           });
                           break;
                        }
                     }
                  }
               } else {
                  barr.destroy();
               }
            }
         }
      },
      async a_puzzle1 (roomState) {
         roomState.offsetCheckpoint = void 0;
         if (!world.postnoot && SAVE.data.n.plot < 55) {
            const ohHELLnaw = sounds.deeploop2.instance(renderer);
            ohHELLnaw.rate.value = 0.5;
            ohHELLnaw.gain.value = 0;
            temporary(
               new CosmosRectangle({ fill: 0xffffff, size: { x: 320, y: 240 } }).on('tick', function () {
                  if (SAVE.data.n.plot < 55) {
                     const diff = (roomState.offset ?? 0) - puzzle1target;
                     const trueValue = Math.max(diff, 0) / (25 - puzzle1target);
                     this.alpha.value = trueValue * (2 / 3);
                     ohHELLnaw.gain.value = CosmosMath.bezier(trueValue, 0, 0, 1) * ohHELLnaw.daemon.gain;
                     game.music!.rate.value = world.ambiance - trueValue * (1 / 10);
                     renderer.shake.value = CosmosMath.bezier(trueValue, 0, 0, 2);
                  } else {
                     this.alpha.value = 0;
                     ohHELLnaw.gain.value = 0;
                     game.music!.rate.value = world.ambiance;
                     renderer.shake.value = 0;
                  }
               }),
               'base',
               () => ohHELLnaw.stop()
            );
            for (const i of [ 111, 311 ]) {
               temporary(
                  new CosmosText({
                     area: renderer.area,
                     fill: 0xffffff,
                     anchor: 0,
                     position: { x: 161, y: i },
                     priority: i + 40,
                     fontFamily: content.fDeterminationMono,
                     fontSize: 16,
                     metadata: { offset: roomState.offset ?? 0, gt: 0 }
                  }).on('tick', async function () {
                     if (roomState.check) {
                        this.content = '';
                     } else {
                        const diff = puzzle1target - (roomState.offset ?? 0);
                        this.content = diff < 0 ? diff.toString() : diff > 0 ? `+${diff}` : '0';
                     }
                     if (this.metadata.offset !== roomState.offset) {
                        this.metadata.offset = roomState.offset!;
                        this.metadata.gt = renderer.time + 200;
                     }
                     if (this.metadata.gt > renderer.time) {
                        this.filters = [ filters.glitch ];
                        filters.glitch.refresh();
                     } else {
                        this.filters = null;
                     }
                  }),
                  'main'
               );
            }
            spire.metadata.min = 540;
            spire.metadata.max = 540;
            events.on('teleport').then(() => {
               spire.metadata.min = -Infinity;
               spire.metadata.max = Infinity;
            });
         } else {
            const pterm = instance('main', 'pterm')!.object;
            if (!pterm.metadata.shifted) {
               pterm.metadata.shifted = true;
               pterm.position.x += 340;
            }
            if (world.postnoot && SAVE.data.n.plot < 55) {
               SAVE.data.n.plot = 55;
               world.nootflags.add('a_puzzle1');
               if (!world.badder_lizard && SAVE.data.n.state_foundry_undyne !== 1) {
                  teleporter.movement = false;
                  await renderer.pause(600);
                  await dialogue('auto', ...text.a_aerialis.puzzlenoot1());
                  game.movement = true;
               }
            }
         }
      },
      async a_puzzle2 (roomState) {
         (SAVE.data.n.plot === 72 || world.bad_lizard > 1 || SAVE.data.b.bad_lizard || world.population < 4) &&
            instance('main', 'a_proskater')?.destroy();
         (SAVE.data.n.plot === 72 || world.bad_lizard > 1 || SAVE.data.b.bad_lizard || world.population < 2) &&
            instance('main', 'a_clamguy')?.destroy();
         roomState.offsetCheckpoint = void 0;
         if (!world.postnoot && SAVE.data.n.plot < 59) {
            const ohHELLnaw = sounds.deeploop2.instance(renderer);
            ohHELLnaw.rate.value = 0.5;
            ohHELLnaw.gain.value = 0;
            let active = true;
            temporary(
               new CosmosRectangle({ fill: 0xffffff, size: { x: 320, y: 240 } }).on('tick', function () {
                  if (active && SAVE.data.n.plot < 59) {
                     // using puzzle1target is intentional here
                     const diffX = (roomState.offset ?? 0) - puzzle1target;
                     const diffY = Math.abs(SAVE.data.n.state_aerialis_puzzle2os) - puzzle1target;
                     const trueValue = Math.max(diffX, diffY, 0) / (25 - puzzle1target);
                     this.alpha.value = trueValue * (2 / 3);
                     ohHELLnaw.gain.value = CosmosMath.bezier(trueValue, 0, 0, 1) * ohHELLnaw.daemon.gain;
                     game.music!.rate.value = world.ambiance - trueValue * (1 / 10);
                     renderer.shake.value = CosmosMath.bezier(trueValue, 0, 0, 2);
                  } else {
                     this.alpha.value = 0;
                     ohHELLnaw.gain.value = 0;
                     game.music!.rate.value = world.ambiance;
                     renderer.shake.value = 0;
                  }
               }),
               'base',
               () => {
                  ohHELLnaw.stop();
                  renderer.shake.value = 0;
               }
            );
            for (const i of [
               { x: 1121, y: 191 },
               { x: 521, y: 191 },
               { x: 821, y: 191 },
               { x: 821, y: 431 }
            ]) {
               temporary(
                  new CosmosText({
                     area: renderer.area,
                     fill: 0xffffff,
                     anchor: 0,
                     position: i,
                     priority: i.y + 40,
                     fontFamily: content.fDeterminationMono,
                     metadata: { offset: { x: 0, y: SAVE.data.n.state_aerialis_puzzle2os }, gt: 0 }
                  }).on('tick', async function () {
                     if (roomState.check) {
                        this.content = '';
                     } else {
                        const diffX = puzzle2target.x - (roomState.offset ?? 0);
                        const diffY = puzzle2target.y - SAVE.data.n.state_aerialis_puzzle2os;
                        this.content =
                           `${diffX < 0 ? diffX.toString() : diffX > 0 ? `+${diffX}` : ''}${
                              diffY < 0 ? diffY.toString() : diffY > 0 ? `+${diffY}` : ''
                           }` || '0';
                        if (this.content.length < 6) {
                           this.fontSize = 16 - Math.max(this.content.length - 2, 0);
                        } else {
                           this.fontSize = 11;
                        }
                     }
                     if (
                        this.metadata.offset.x !== roomState.offset ||
                        this.metadata.offset.y !== SAVE.data.n.state_aerialis_puzzle2os
                     ) {
                        this.metadata.offset.x = roomState.offset!;
                        this.metadata.offset.y = SAVE.data.n.state_aerialis_puzzle2os;
                        this.metadata.gt = renderer.time + 200;
                     }
                     if (this.metadata.gt > renderer.time) {
                        this.filters = [ filters.glitch ];
                        filters.glitch.refresh();
                     } else {
                        this.filters = null;
                     }
                  }),
                  'main'
               );
            }
            events.on('teleport-start').then(() => {
               active = false;
               ohHELLnaw.gain.modulate(renderer, 300, 0);
            });
            spire.metadata.min = 160;
            spire.metadata.max = 240;
            events.on('teleport').then(() => {
               spire.metadata.min = -Infinity;
               spire.metadata.max = Infinity;
            });
         } else {
            const pterm = instance('main', 'pterm')!.object;
            if (!pterm.metadata.shifted) {
               pterm.metadata.shifted = true;
               pterm.position.x -= 620;
            }
            if (world.postnoot && SAVE.data.n.plot < 59) {
               SAVE.data.n.plot = 59;
               world.nootflags.add('a_puzzle2');
               if (!world.badder_lizard && SAVE.data.n.state_foundry_undyne !== 1) {
                  teleporter.movement = false;
                  await renderer.pause(600);
                  await dialogue('auto', ...text.a_aerialis.puzzlenoot2());
                  game.movement = true;
               }
            }
         }
      },
      async a_mettaton1 (roomState) {
         (world.genocide && SAVE.data.n.plot < 55.1) || instance('main', 'whatthefuck')?.destroy();
         if (world.genocide || SAVE.data.n.plot > 55.1) {
            for (const inst of instances('main', 'ingredient')) {
               inst.destroy();
            }
         }
         if (!world.genocide && SAVE.data.n.plot < 65) {
            for (const inst of instances('below', 'tempgate')) {
               inst.destroy();
            }
            for (const inst of instances('above', 'tempgate')) {
               inst.destroy();
            }
         }
         if (SAVE.data.n.plot < 55.1) {
            if (!roomState.active) {
               roomState.active = true;
               await renderer.when(() => game.room === 'a_mettaton1' && player.position.x > 165 && game.movement);
               SAVE.data.n.plot = 55.1;
               game.movement = false;
               game.menu = false;
               game.music?.stop();
               if (!world.genocide) {
                  const metta = character('mettaton', characters.mettaton1C, { x: 275, y: 235 }, 'down', {
                     metadata: { barrier: true, interact: true, name: 'aerialis', args: [ 'mettacrafter' ] },
                     size: { x: 20, y: 15 },
                     anchor: { x: 0, y: 1 }
                  });
                  const d = metta.sprite as CosmosAnimation;
                  d.subcrop.bottom = 25;
                  await renderer.when(subtick => {
                     if (!subtick) {
                        d.subcrop.bottom -= 1 / 3;
                        if (d.subcrop.bottom <= 0) {
                           d.subcrop.bottom = 0;
                           return true;
                        }
                     }
                     return false;
                  });
                  await renderer.pause(450);
                  const cam = new CosmosObject({ position: metta.position.clamp(...renderer.region) });
                  game.camera = cam;
                  renderer.zoom.value = 1.7;
                  const region = renderer.region;
                  renderer.region = [
                     { x: -Infinity, y: -Infinity },
                     { x: Infinity, y: Infinity }
                  ];
                  await renderer.pause(850);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker1a);
                  autozoom(1, 150).then(() => {
                     renderer.region = region;
                  });
                  cam.position.modulate(renderer, 150, { x: 230 });
                  metta.face = 'left';
                  metta.sprite.enable();
                  const rad = rand_rad(rng.overworld.next());
                  const sign = new CosmosSprite({
                     anchor: 0,
                     frames: [ content.iooAArtsncrafts ],
                     position: { x: 160, y: 80 },
                     metadata: { spark: true }
                  }).on('tick', async function () {
                     if (this.metadata.spark) {
                        const size = this.compute();
                        const sx = size.x;
                        const bx = sx / -2;
                        const by = size.y / -2;
                        const ty = size.y / 2;
                        const sparkle = new CosmosAnimation({
                           active: true,
                           alpha: 0,
                           duration: 3 + Math.floor(Math.random() * 6),
                           extrapolate: false,
                           position: { x: bx + Math.random() * sx, y: size.y / -2 },
                           velocity: { y: 2 },
                           scale: 0.5 + Math.random() * 0.5,
                           resources: content.iooASparkler
                        }).on('tick', function () {
                           this.alpha.value = CosmosMath.linear(
                              CosmosMath.remap(this.position.y, 0, 1, by, ty),
                              0,
                              1,
                              1,
                              1,
                              1,
                              0
                           );
                        });
                        renderer.post().then(() => void this.attach(sparkle));
                     }
                  });
                  const signcontainer = new CosmosRectangle({
                     alpha: 0,
                     size: { x: 320, y: 240 },
                     objects: [ sign ]
                  });
                  renderer.attach('menu', signcontainer);
                  signcontainer.alpha.modulate(renderer, 1000, 1);
                  sounds.sparkle.instance(renderer);
                  sounds.whipcrack.instance(renderer);
                  const muzik = music.letsmakeabombwhydontwe.instance(renderer);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker1b);
                  sign.metadata.spark = false;
                  await signcontainer.alpha.modulate(renderer, 1000, 0);
                  renderer.detach('menu', signcontainer);
                  metta.face = 'down';
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker2a1());
                  metta.face = 'right';
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker2a2());
                  metta.face = 'down';
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker2b());
                  if (iFancyYourVilliany()) {
                     muzik.gain.value = 0;
                  } else {
                     metta.preset = characters.mettaton2C;
                     metta.face = 'down';
                     metta.sprite.enable();
                     sounds.clap.instance(renderer);
                  }
                  await renderer.pause(2250);
                  iFancyYourVilliany() && (muzik.gain.value = muzik.daemon.gain);
                  metta.face = 'up';
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker3a());
                  metta.preset = characters.mettaton1C;
                  metta.face = 'down';
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker3b());
                  const laserbarrier1 = new CosmosHitbox({
                     position: { x: 60, y: 180 },
                     size: { x: 20, y: 80 },
                     metadata: { barrier: true, interact: true, name: 'aerialis', args: [ 'laserbarrrier' ] },
                     objects: [
                        new CosmosAnimation({
                           active: true,
                           resources: content.iooAShowbarrier
                        })
                     ]
                  }).on('tick', function () {
                     this.alpha.value = Math.min(
                        Math.max(CosmosMath.remap(Math.abs(this.position.x + 10 - player.position.x), 0, 1, 50, 20), 0),
                        1
                     );
                  });
                  const laserbarrier2 = new CosmosHitbox({
                     position: { x: 380, y: 180 },
                     size: { x: 20, y: 80 },
                     metadata: { barrier: true, interact: true, name: 'aerialis', args: [ 'laserbarrrier' ] },
                     objects: [
                        new CosmosAnimation({
                           active: true,
                           resources: content.iooAShowbarrier
                        })
                     ]
                  }).on('tick', function () {
                     this.alpha.value = Math.min(
                        Math.max(CosmosMath.remap(Math.abs(this.position.x + 10 - player.position.x), 0, 1, 50, 20), 0),
                        1
                     );
                  });
                  renderer.attach('main', laserbarrier1, laserbarrier2);
                  game.movement = true;
                  const ingredient1 = new CosmosSprite({
                     alpha: 0,
                     position: { x: 214, y: 226 },
                     anchor: { y: 1 },
                     priority: 251,
                     frames: [ content.iooAHexogen ]
                  }).on('tick', function () {
                     this.alpha.value = roomState.ingredient1 === 2 ? 1 : 0;
                  });
                  const ingredient2 = new CosmosSprite({
                     alpha: 0,
                     position: { x: 231, y: 222 },
                     anchor: { y: 1 },
                     priority: 250.5,
                     frames: [ content.iooABeaker ]
                  }).on('tick', function () {
                     this.alpha.value = roomState.ingredient2 === 2 ? 1 : 0;
                  });
                  const ingredient3 = new CosmosSprite({
                     alpha: 0,
                     position: { x: 198, y: 222 },
                     anchor: { y: 1 },
                     priority: 251,
                     frames: [ content.iooAOneOilyBoi ]
                  }).on('tick', function () {
                     this.alpha.value = roomState.ingredient3 === 2 ? 1 : 0;
                  });
                  renderer.attach('main', ingredient1, ingredient2, ingredient3);
                  await renderer.when(
                     () =>
                        roomState.ingredient1 === 2 &&
                        roomState.ingredient2 === 2 &&
                        roomState.ingredient3 === 2 &&
                        game.movement
                  );
                  game.movement = false;
                  renderer.detach('main', laserbarrier2);
                  muzik.gain.modulate(renderer, 3000, 0).then(() => muzik.stop());
                  await renderer.pause(850);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker4a);
                  const tpos = ingredient1.position.x + 27 / 2;
                  if (player.position.x > tpos - 30 && player.position.y < 250) {
                     player.walk(renderer, 1.5, { x: tpos - 30 }).then(() => (player.face = 'down'));
                  }
                  await metta.position.step(renderer, 5, { x: tpos });
                  await renderer.pause(1250);
                  sounds.rustle.instance(renderer);
                  await renderer.pause(650);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker4b);
                  sounds.drumroll.instance(renderer);
                  await renderer.pause(1950);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker5());
                  metta.preset = characters.mettaton1C;
                  metta.face = 'down';
                  let bad = null as CosmosInstance | null;
                  if (!iFancyYourVilliany()) {
                     bad = sounds.bad.instance(renderer);
                  }
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker6());
                  metta.face = 'right';
                  metta.sprite.enable();
                  const faduh = new CosmosRectangle({ fill: 0xffffff, size: { x: 320, y: 240 }, alpha: 0 });
                  renderer.attach('menu', faduh);
                  sounds.swing.instance(renderer);
                  const cym = sounds.cymbal.instance(renderer);
                  await faduh.alpha.modulate(renderer, 3000, 3 / 5);
                  cym.stop();
                  metta.sprite.disable();
                  // i broke the bad
                  bad?.stop();
                  if (!world.badder_lizard && SAVE.data.n.state_foundry_undyne !== 1) {
                     sounds.phone.instance(renderer);
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker7a());
                     metta.face = 'down';
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker7b());
                  } else {
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker7c);
                  }
                  faduh.alpha.modulate(renderer, 500, 0).then(() => {
                     renderer.detach('menu', faduh);
                  });
                  await renderer.pause(350);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker8a1());
                  let flight = false;
                  const ba = 0.12;
                  const avol = new CosmosValue(ba);
                  const timer2 = new CosmosRenderer({ auto: true });
                  const minY = game.camera.position.clamp(...renderer.region).y - 120;
                  const maxY = game.camera.position.clamp(...renderer.region).y + 120 + 30;
                  const bp = new CosmosPoint({ x: 700 - 120, y: 200 - 120 });
                  const f = {
                     shift: 1,
                     thrust: 2,
                     sus: 0.1,
                     restex: 6,
                     leftX: -4,
                     rightX: 8,
                     upY: -6,
                     downY: 12,
                     drop: 0.5,
                     lt: 27.5,
                     ideal: 0.95
                  };
                  const fakepos = new CosmosPoint();
                  const fakevelo = new CosmosPoint();
                  let gas = null as null | CosmosInstance;
                  const echoAlpha = new CosmosValue(1);
                  let swit = false;
                  let dropper = false;
                  const forceDrop = false;
                  const ovu = false;
                  const ovr = false;
                  let buzzer = false;
                  const endX = 12000;
                  let stopfollow = false;
                  let stopdropandcalm = false;
                  const roombg = rooms.of(game.room).layers.below![0];
                  const OGregion = renderer.region[1].x;
                  spire.metadata.max = OGregion;
                  const jetpackSprites = SAVE.data.b.water ? friskWaterJetpack : friskJetpack;
                  const fakeplayer = new CosmosEntity({ metadata: { f }, sprites: jetpackSprites })
                     .on('tick', {
                        priority: Infinity,
                        listener () {
                           fakevelo.set(fakevelo.clamp(-16, 16));
                           fakepos.set(fakepos.add(fakevelo));
                           if (flight) {
                              let ad = false;
                              const down = !buzzer && keyState.down;
                              const up = !forceDrop && (buzzer ? ovu : keyState.up);
                              const left = !buzzer && keyState.left;
                              const right = !forceDrop && (buzzer ? ovr : keyState.right);
                              if (dropper) {
                                 (down ? false : up || left || right) && (ad = true);
                                 if (stopdropandcalm) {
                                    stopdropandcalm = false;
                                    ad = true;
                                 }
                              } else {
                                 down && !swit && (ad = true);
                              }
                              if (forceDrop && !dropper) {
                                 ad = true;
                              }
                              swit === down || (swit = down);
                              if (ad) {
                                 sounds.noise.instance(renderer);
                                 if ((dropper = !dropper)) {
                                    this.sprites = SAVE.data.b.water ? friskWaterJetpackOff : friskJetpackOff;
                                 } else {
                                    this.sprites = jetpackSprites;
                                 }
                              }
                              gas && (gas.rate.value = dropper ? 0 : up ? 1.2 : left || right ? 1 : 0.8);
                              const restExL = left ? f.restex : 0;
                              const restExR = right ? f.restex : 0;
                              if (fakevelo.x > restExR) {
                                 fakevelo.x = Math.max(fakevelo.x - f.sus, restExR);
                              }
                              if (fakevelo.x < -restExL) {
                                 fakevelo.x = Math.min(fakevelo.x + f.sus, -restExL);
                              }
                              if (left && fakevelo.x > f.leftX) {
                                 fakevelo.x = Math.max(fakevelo.x - f.shift, f.leftX);
                              }
                              if (right && fakevelo.x < f.rightX) {
                                 fakevelo.x = Math.min(fakevelo.x + f.shift, f.rightX);
                              }
                              if (up && fakevelo.y > f.upY) {
                                 fakevelo.y = Math.max(fakevelo.y - f.thrust, f.upY);
                              }
                              if (dropper && fakevelo.y < f.downY) {
                                 fakevelo.y = Math.min(fakevelo.y + f.drop, f.downY);
                              }
                              if (!up && !dropper) {
                                 fakevelo.y *= f.ideal;
                              }
                              if (!buzzer || fail) {
                                 if (fakepos.y > maxY) {
                                    fakepos.y -= maxY - minY;
                                 } else if (fakepos.y < minY) {
                                    fakepos.y += maxY - minY;
                                 }
                              }
                              if (Math.abs(fakevelo.x) < 1.5) {
                                 this.face = fakevelo.y < 0 ? 'up' : 'down';
                              } else {
                                 this.face = fakevelo.x < 0 ? 'left' : 'right';
                              }
                           } else {
                              this.face = 'down';
                           }
                           fakepos.set(fakepos.clamp({ x: player.position.x - 20 }, {}));
                           this.position.set(fakepos.add(0, sineWaver(0, 1500, 0, -3 / (1 + Math.abs(fakevelo.y)))));
                           const s = quickshadow(
                              this.sprite,
                              this,
                              'main',
                              Math.min(CosmosMath.remap(Math.abs(fakevelo.extent), 0, 0.2, 0, f.restex), 1) *
                                 echoAlpha.value,
                              1.5,
                              0.00001
                           );
                           s.priority.value = -60;
                           s.anchor.set(0, 1);
                           s.velocity.set(fakevelo.x / 5, 0);
                           s.on('tick', function () {
                              if (!buzzer || fail) {
                                 if (this.position.y > maxY) {
                                    this.position.y -= maxY - minY;
                                 } else if (this.position.y < minY) {
                                    this.position.y += maxY - minY;
                                 }
                              }
                           });
                        }
                     })
                     .on('render', function () {
                        bp.x = Math.min(Math.max(this.position.x - 160, 600), endX) + fakevelo.x * f.lt;
                        if (!stopfollow) {
                           roombg.position.x = Math.max(this.position.x - 700, 0);
                        }
                     });
                  let bomspawn = 0;
                  const keepalive = 12;
                  const boosters = 16;
                  const boosterStartX = 1000;
                  const boosterTotalSpan = endX - boosterStartX * 2;
                  const boosterSep = boosterTotalSpan / boosters;
                  const boosterField = new CosmosObject({
                     priority: -500,
                     objects: CosmosUtils.populate(boosters, i => {
                        let lockY = 0;
                        const x = boosterStartX + boosterSep * i;
                        const y = game.camera.position.clamp(...renderer.region).y + (rng.overworld.next() * 40 - 20);
                        const type = rng.overworld.next() < 3 / 4 ? 0 : 1;
                        return new CosmosAnimation({
                           resources: content.iooABoosterStrut,
                           anchor: 0,
                           index: y <= 160 ? 0 : 1,
                           position: { x, y },
                           objects: [
                              new CosmosAnimation({
                                 resources: [ content.iooABooster, content.iooABoosterBad ][type],
                                 active: true,
                                 anchor: 0
                              })
                           ]
                        }).on('tick', function () {
                           if (
                              Math.abs(this.position.x - fakepos.x) < 42 &&
                              Math.abs(this.position.y - (fakepos.y - 15)) < 18
                           ) {
                              fakevelo.x += [ 2, -2 ][type];
                              if (!this.metadata.thrustie) {
                                 this.metadata.thrustie = true;
                                 this.extrapolate = false;
                                 this.duration = 2;
                                 this.objects[0].tint = void 0;
                                 lockY = fakepos.y;
                              }
                              fakepos.y = lockY;
                              fakevelo.y = 0;
                           } else if (this.metadata.thrustie) {
                              this.metadata.thrustie = false;
                              this.extrapolate = true;
                              this.duration = 6;
                              this.objects[0].tint = 0xcfcfcf;
                           }
                        });
                     })
                  });
                  const bomfield = new CosmosObject().on('tick', function () {
                     if (!buzzer && keepalive <= (bomspawn += 1)) {
                        bomspawn = 0;
                        const spin = rad.next() < 0.5 ? -1 : 1;
                        const bom = new OutertaleMultivisualObject(
                           {
                              spin: 2.5 * spin,
                              position: bp.add({ x: rad.next() * 320, y: -10 }),
                              gravity: { y: 0.07 },
                              rotation: rad.next() * 360,
                              velocity: { y: 4 }
                           },
                           { anchor: 0 }
                        ).on('tick', async function () {
                           let rm = false;
                           if (!this.metadata.sploded) {
                              const trueplayer = fakepos.subtract(0, 16.5);
                              const diz = this.position.extentOf(trueplayer);
                              if (this.metadata.splode || (!buzzer && diz < 15)) {
                                 this.metadata.sploded = true;
                                 this.use(content.iooABomburst);
                                 this.animation.enable();
                                 this.velocity.set(0);
                                 this.spin.value = 0;
                                 this.rotation.value = 0;
                                 sounds.bomb.instance(renderer);
                                 buzzer ||
                                    fakevelo.set(
                                       fakevelo.add(
                                          CosmosMath.ray(
                                             this.position.add(4, 0).angleTo(trueplayer),
                                             10 / ((Math.max(diz, 15) - 10) / 10)
                                          )
                                       )
                                    );
                                 this.scale.modulate(renderer, 500, 2, 2);
                                 await this.alpha.modulate(renderer, 500, 0);
                                 rm = true;
                              } else if (this.position.y > 360) {
                                 rm = true;
                              }
                           }
                           rm && bomfield.objects.splice(bomfield.objects.indexOf(bom), 1);
                        });
                        bom.use(content.iooABom);
                        this.attach(bom);
                        const d = Math.min(
                           Math.max(CosmosMath.remap(550 - game.camera.position.x, 0, 1, 160, 0), 0),
                           1
                        );
                        if (d > 0) {
                           const ar = sounds.arrow.instance(timer2);
                           ar.rate.value = 0.7;
                           ar.gain.value = avol.value * d;
                        }
                     }
                  });
                  renderer.attach('below', boosterField);
                  renderer.attach('above', bomfield);
                  cam.position.step(renderer, 5, { x: 600 });
                  metta.preset = characters.mettaton2C;
                  metta.face = 'down';
                  await metta.walk(renderer, 3, { x: 480 });
                  await renderer.pause(850);
                  if (iFancyYourVilliany()) {
                     metta.preset = characters.mettaton3C;
                     metta.face = 'up';
                  }
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker8a2());
                  metta.preset = characters.mettaton1C;
                  metta.face = 'up';
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker8b());
                  metta.face = 'right';
                  const supriseurdeadWHAT = music.gameshow.instance(renderer);
                  supriseurdeadWHAT.rate.value = 1.275;
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker9());
                  let t = 90;
                  let fail = false;
                  const timertext = new CosmosText({
                     fill: 0xffffff,
                     fontFamily: content.fMarsNeedsCunnilingus,
                     fontSize: 14,
                     position: { x: 66, y: 5 }
                  }).on('tick', async function () {
                     if (!buzzer) {
                        const prex = Math.floor(t);
                        t -= 1 / 30;
                        const postx = Math.floor(t);
                        if (postx < prex && prex > 0) {
                           sounds.select.instance(renderer).rate.value = 1.7;
                           if (postx <= 10) {
                              this.fill = postx <= 5 ? (this.fill = 0xff0000) : 0xffff00;
                              await renderer.pause(133);
                              sounds.select.instance(renderer).rate.value = 1.7;
                              if (postx <= 5) {
                                 await renderer.pause(133);
                                 if (postx === 0) {
                                    if (!buzzer) {
                                       fail = true;
                                       buzzer = true;
                                    }
                                 } else {
                                    sounds.select.instance(renderer).rate.value = 1.7;
                                 }
                              }
                           }
                           this.content = text.a_aerialis.story.cooker14.replace(
                              '$(x)',
                              postx.toString().padStart(2, '0')
                           );
                        }
                     }
                  });
                  const timersprite = new CosmosSprite({
                     position: { x: -101 },
                     frames: [ content.iooATimer ],
                     objects: [ timertext ]
                  });
                  const startX = 530;
                  function pd () {
                     return Math.round(((Math.max(fakepos.x, startX) - startX) / (endX - startX)) * 100);
                  }
                  const distancesprite = new CosmosSprite({
                     position: { x: 320 },
                     frames: [ content.iooAProgresser ],
                     objects: [
                        new CosmosText({
                           fill: 0xffffff,
                           fontFamily: content.fMarsNeedsCunnilingus,
                           fontSize: 14,
                           position: { x: 8, y: 5 }
                        }).on('tick', async function () {
                           if (!buzzer) {
                              this.content = text.a_aerialis.story.cooker15.replace(
                                 '$(x)',
                                 pd().toString().padStart(2, '0')
                              );
                           }
                        })
                     ]
                  });
                  renderer.attach('menu', timersprite, distancesprite);
                  timersprite.position.modulate(renderer, 1200, { x: 0 }, { x: 0 });
                  distancesprite.position.modulate(renderer, 1200, { x: 320 - 101 }, { x: 320 - 101 });
                  await Promise.all([
                     cam.position.step(renderer, 8, { x: player.position.x }).then(() => {
                        game.camera = player;
                     }),
                     dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker10)
                  ]);
                  renderer.detach('main', metta);
                  roomState.danger = true;
                  game.movement = true;
                  await renderer.when(() => t <= 10 || player.position.x > 500);
                  if (atlas.navigator !== null) {
                     typer.reset(true);
                  }
                  const progress = player.position.x > 500;
                  if (progress) {
                     game.movement = false;
                     renderer.detach('main', laserbarrier1);
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker11);
                     if (!world.badder_lizard) {
                        sounds.phone.instance(renderer);
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker12());
                     } else {
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker12x);
                     }
                     let spintick = 0;
                     function spinHandler () {
                        if (spintick++ === 2) {
                           spintick = 0;
                           player.face = (
                              { up: 'left', left: 'down', down: 'right', right: 'up' } as CosmosKeyed<
                                 CosmosDirection,
                                 CosmosDirection
                              >
                           )[player.face];
                        }
                     }
                     player.on('tick', spinHandler);
                     const dy = player.position.y;
                     player.velocity.set(1.5, -7);
                     player.gravity.y = 0.3;
                     renderer.speed.modulate(renderer, 1350, 0.1);
                     timer2.speed.modulate(renderer, 1350, 0.1);
                     await renderer.when(() => player.velocity.y > 0);
                     const fader = new CosmosRectangle({ size: { x: 320, y: 240 }, fill: 0xffffff, alpha: 0 });
                     renderer.attach('menu', fader);
                     fader.alpha.modulate(renderer, 450, 1);
                     avol.modulate(renderer, 450, 0);
                     supriseurdeadWHAT.gain.modulate(renderer, 450, 0).then(() => {
                        supriseurdeadWHAT.stop();
                     });
                     await renderer.when(() => player.position.y > dy - 40);
                     player.gravity.set(0);
                     player.velocity.set(0, 0);
                     renderer.speed.modulate(renderer, 0, 1);
                     await renderer.pause(450);
                     sounds.upgrade.instance(renderer);
                     fakepos.set(player);
                     fakeplayer.face = 'right';
                     player.off('tick', spinHandler);
                     renderer.detach('main', player);
                     renderer.attach('main', fakeplayer);
                     game.camera = fakeplayer;
                     await renderer.pause(350);
                     timer2.speed.modulate(timer2, 0, 1);
                     gas = sounds.jetpack.instance(renderer);
                     gas.rate.value = 0.8;
                     gas.gain.value = 0;
                     avol.modulate(renderer, 650, ba);
                     gas.gain.modulate(renderer, 650, gas.daemon.gain * 0.4);
                     await fader.alpha.modulate(renderer, 650, 0);
                     renderer.detach('menu', fader);
                     await renderer.pause(850);
                     if (!world.badder_lizard) {
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker13());
                     } else {
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker13x);
                     }
                     game.interact = false;
                     const muzak = music.letsflyajetpackwhydontwe.instance(renderer);
                     muzak.gain.value /= 3;
                     muzak.gain.modulate(renderer, 500, muzak.gain.value * 3);
                     flight = true;
                     renderer.region[1].x = Infinity;
                     await renderer.when(() => buzzer || endX <= fakepos.x);
                     buzzer = true;
                     game.movement = false;
                     stopdropandcalm = true;
                     muzak.gain.modulate(renderer, 2000, 0).then(() => muzak.stop());
                     if (fail) {
                        await renderer.pause(133);
                        timertext.alpha.value = 0;
                        await renderer.pause(133);
                        timertext.alpha.value = 1;
                        sounds.select.instance(renderer).rate.value = 1.7;
                        await renderer.pause(133);
                        timertext.alpha.value = 0;
                        await renderer.pause(133);
                        timertext.alpha.value = 1;
                        sounds.select.instance(renderer).rate.value = 1.7;
                        await renderer.pause(133 * 6);
                     }
                  } else {
                     buzzer = true;
                  }
                  Promise.all([
                     timersprite.position.modulate(renderer, 1200, timersprite.position.value(), { x: -101 }),
                     distancesprite.position.modulate(renderer, 1200, distancesprite.position.value(), { x: 320 })
                  ]).then(() => {
                     renderer.detach('menu', timersprite, distancesprite);
                  });
                  function r2p () {
                     game.camera = player;
                     stopfollow = true;
                     roombg.position.x = 0;
                     renderer.region[1].x = OGregion;
                     spire.metadata.max = Infinity;
                     player.face = fakeplayer.face;
                     renderer.detach('main', fakeplayer);
                     renderer.attach('main', player);
                  }
                  const mettpos = new CosmosPoint({ x: 660, y: 80 });
                  const flymet = new CosmosAnimation({
                     active: true,
                     anchor: { x: 0, y: 1 },
                     resources: content.iocMettatonFlyer
                  }).on('tick', function () {
                     this.position.set(mettpos.add(0, sineWaver(0, 1500, 0, -3)));
                  });
                  const mttarget1 = { x: 840, y: 160 };
                  const mttarget2 = { y: 80 };
                  async function fd () {
                     const r = fader();
                     await r.alpha.modulate(renderer, 600, 1);
                     await renderer.pause(1000);
                     player.position.set(900, 220);
                     r2p();
                     renderer.detach('below', boosterField);
                     renderer.detach('above', bomfield);
                     renderer.attach('main', flymet);
                     mettpos.set(mttarget1);
                     await r.alpha.modulate(renderer, 600, 0);
                     renderer.detach('menu', r);
                     await renderer.pause(450);
                  }
                  async function flyaway () {
                     await mettpos.modulate(renderer, 1100, mettpos.value(), mttarget2);
                     renderer.detach('main', flymet);
                     await renderer.pause(650);
                  }
                  if (fail || progress) {
                     await renderer.pause(133);
                     for (const bom of bomfield.objects) {
                        bom.metadata.splode = true;
                        await renderer.on('tick');
                     }
                  }
                  await renderer.pause(1333);
                  game.interact = true;
                  if (fail) {
                     if (pd() < 50) {
                        SAVE.data.n.state_aerialis_crafterresult = 1;
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker17a);
                     } else {
                        SAVE.data.n.state_aerialis_crafterresult = 2;
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker17b);
                     }
                     gas?.gain.modulate(renderer, 600, 0).then(() => {
                        gas?.stop();
                     });
                     await fd();
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker17c());
                     await flyaway();
                     if (!world.badder_lizard) {
                        sounds.phone.instance(renderer);
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker19b);
                        await endCall('dialoguerBottom');
                     }
                     if (!SAVE.data.b.oops) {
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker17e);
                     }
                  } else if (progress) {
                     if (Math.floor(t) <= 5) {
                        SAVE.data.n.state_aerialis_crafterresult = 3;
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker18b);
                     } else {
                        SAVE.data.n.state_aerialis_crafterresult = 4;
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker18a);
                     }
                     gas?.gain.modulate(renderer, 600, 0).then(() => {
                        gas?.stop();
                     });
                     await fd();
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker18c());
                     await flyaway();
                     if (!world.badder_lizard) {
                        sounds.phone.instance(renderer);
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker19a);
                        await endCall('dialoguerBottom');
                     }
                     if (!SAVE.data.b.oops) {
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker17d);
                     }
                  } else {
                     supriseurdeadWHAT.stop();
                     game.movement = false;
                     renderer.attach('main', metta);
                     metta.preset = characters.mettaton2C;
                     if (player.position.x < 270) {
                        metta.position.set(player.position.add(180, 0).clamp({ y: 185 }, { y: 215 }));
                        await metta.walk(renderer, 3, player.position.add(40, 0));
                     } else {
                        metta.position.set(player.position.subtract(180, 0).clamp({ y: 185 }, { y: 215 }));
                        await metta.walk(renderer, 3, player.position.subtract(40, 0));
                     }
                     metta.preset = characters.mettaton3C;
                     metta.face = 'right';
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker16a);
                     await renderer.pause(1000);
                     metta.preset = characters.mettaton3C;
                     metta.face = 'left';
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker16b);
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker16c);
                     metta.preset = characters.mettaton2C;
                     metta.face = 'right';
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker16d);
                     await fd();
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker16e());
                     await flyaway();
                     if (!world.badder_lizard) {
                        sounds.phone.instance(renderer);
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker19c);
                        await endCall('dialoguerBottom');
                     }
                     if (!SAVE.data.b.oops) {
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.cooker16f);
                     }
                  }
                  renderer.detach('main', metta, laserbarrier1, laserbarrier2, ingredient1, ingredient2, ingredient3);
                  SAVE.data.n.plot = 56;
                  timer2.stop();
               } else {
                  sounds.phone.instance(renderer);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.robocaller3);
                  const supriseurdeadWHAT = music.gameshow.instance(renderer);
                  supriseurdeadWHAT.rate.value = 1.275;
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.robocaller4);
                  await endCall('dialoguerBottom');
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.robocaller4x);
                  const laserbarrier1 = new CosmosHitbox({
                     position: { x: 60, y: 180 },
                     size: { x: 20, y: 80 },
                     metadata: { barrier: true, interact: true, name: 'aerialis', args: [ 'laserbarrrier' ] },
                     objects: [
                        new CosmosAnimation({
                           active: true,
                           resources: content.iooAShowbarrier
                        })
                     ]
                  }).on('tick', function () {
                     this.alpha.value = Math.min(
                        Math.max(CosmosMath.remap(Math.abs(this.position.x + 10 - player.position.x), 0, 1, 50, 20), 0),
                        1
                     );
                  });
                  renderer.attach('main', laserbarrier1);
                  game.movement = true;
                  await renderer.when(() => player.position.x > 290 && game.movement);
                  game.movement = false;
                  supriseurdeadWHAT.stop();
                  await renderer.pause(950);
                  goatbro.face = 'right';
                  const cam = new CosmosObject({ position: player });
                  game.camera = cam;
                  await cam.position.modulate(renderer, 850, { x: 370 });
                  await renderer.pause(1150);
                  const whatthefuck = instance('main', 'whatthefuck')!.object.objects[0] as CosmosAnimation;
                  speech.targets.add(whatthefuck);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cookerX1);
                  speech.targets.delete(whatthefuck);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cookerX2);
                  speech.targets.add(whatthefuck);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cookerX3);
                  await renderer.pause(1250);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cookerX4);
                  speech.targets.delete(whatthefuck);
                  await renderer.pause(950);
                  await dialogue(
                     'dialoguerBottom',
                     ...text.a_aerialis.story.cookerX5a,
                     ...text.a_aerialis.story.cookerX5b
                  );
                  await renderer.pause(650);
                  await renderer.pause(850);
                  speech.targets.add(whatthefuck);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cookerX6);
                  speech.targets.delete(whatthefuck);
                  await renderer.pause(450);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cookerX7);
                  await cam.position.modulate(renderer, 850, { x: player.position.x });
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cookerX8);
                  game.movement = true;
                  game.camera = player;
                  await renderer.when(() => player.position.x > 800 && game.movement);
                  game.movement = false;
                  sounds.phone.instance(renderer);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.cookerX9);
                  await endCall('dialoguerBottom');
                  renderer.detach('main', laserbarrier1);
                  SAVE.data.n.plot = 56;
                  instance('main', 'whatthefuck')?.destroy();
               }
               quickresume();
               game.movement = true;
               game.menu = true;
            }
         }
      },
      async a_mettaton2 (roomState) {
         if (SAVE.data.n.plot < 59.1) {
            if (!roomState.active) {
               roomState.active = true;
               if (!world.genocide) {
                  if (iRespeccYourVilliany()) {
                     SAVE.data.b.a_state_moneyfish = true;
                  }
                  const mettpos = new CosmosPoint({ x: 500, y: 80 });
                  const metta = new OutertaleMultivisualObject({}, { active: true, anchor: { x: 0, y: 1 } }).on(
                     'tick',
                     function () {
                        this.position.set(mettpos.add(0, sineWaver(0, 1500, 0, -3)));
                     }
                  );
                  renderer.attach('main', metta);
                  metta.use(content.iocMettatonAnchorFlyer);
                  await renderer.when(() => (game.room !== 'a_mettaton2' || player.position.x <= 680) && game.movement);
                  if (game.room !== 'a_mettaton2') {
                     roomState.active = false;
                     renderer.detach('main', metta);
                     return;
                  }
                  SAVE.data.n.plot = 59.1;
                  game.menu = false;
                  game.movement = false;
                  game.music?.stop();
                  const cam = new CosmosObject({ position: player.position.clamp(...renderer.region) });
                  game.camera = cam;
                  await renderer.pause(650);
                  await cam.position.modulate(renderer, 1200, { x: 500 });
                  await renderer.pause(850);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyPre1());
                  metta.use(content.iocMettatonAnchorDotdotdot);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyPre2());
                  metta.use(content.iocMettatonAnchorFlyer);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyPre3());
                  const over = fader();
                  player.position.y = Math.min(player.position.y, 160);
                  await Promise.all([
                     player.walk(renderer, 3, { x: player.position.x - 3 * (1500 / (100 / 3)) }),
                     over.alpha.modulate(renderer, 1500, 1)
                  ]);
                  await renderer.pause(850);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyPre4);
                  const startpos = { x: 330, y: 150 };
                  player.position.set(startpos);
                  await over.alpha.modulate(renderer, 1000, 0);
                  await renderer.pause(850);
                  const baserot = -90;
                  const lights = new CosmosObject({
                     fontFamily: content.fCryptOfTomorrow,
                     fontSize: 16,
                     fill: 0xbf9fff,
                     position: { y: 130 },
                     priority: -9999,
                     objects: [
                        new CosmosSprite({
                           alpha: 0,
                           anchor: { y: 0 },
                           position: { x: 390 },
                           rotation: baserot - 10,
                           frames: [ content.iooABeam ]
                        }),
                        new CosmosSprite({
                           alpha: 0,
                           anchor: { y: 0 },
                           position: { x: 450 },
                           rotation: baserot,
                           frames: [ content.iooABeam ]
                        }),
                        new CosmosSprite({
                           alpha: 0,
                           anchor: { y: 0 },
                           position: { x: 550 },
                           rotation: baserot,
                           frames: [ content.iooABeam ]
                        }),
                        new CosmosSprite({
                           alpha: 0,
                           anchor: { y: 0 },
                           position: { x: 610 },
                           rotation: baserot + 10,
                           frames: [ content.iooABeam ]
                        }),
                        new CosmosText({ alpha: 0.5, anchor: 0 }).on('tick', function () {
                           this.position.set(lights.position.multiply(-1).add(340 + 30, 12));
                        }),
                        new CosmosText({ alpha: 0.5, anchor: 0 }).on('tick', function () {
                           this.position.set(lights.position.multiply(-1).add(340 + 110, 12));
                        }),
                        new CosmosText({ alpha: 0.5, anchor: 0 }).on('tick', function () {
                           this.position.set(lights.position.multiply(-1).add(340 + 210, 12));
                        }),
                        new CosmosText({ alpha: 0.5, anchor: 0 }).on('tick', function () {
                           this.position.set(lights.position.multiply(-1).add(340 + 290, 12));
                        })
                     ]
                  });
                  renderer.attach('below', lights);
                  const ratio = 2 ** (1 / 12);
                  header('x1').then(() => {
                     lights.objects[0].alpha.value = 1;
                     sounds.orchhit.instance(renderer).rate.value = ratio ** 1;
                  });
                  header('x2').then(() => {
                     lights.objects[1].alpha.value = 1;
                     lights.objects[2].alpha.value = 1;
                     sounds.orchhit.instance(renderer).rate.value = ratio ** 2;
                  });
                  header('x3').then(() => {
                     lights.objects[3].alpha.value = 1;
                     sounds.orchhit.instance(renderer).rate.value = ratio ** 3;
                  });
                  function mettaEmotes (h: string) {
                     if (h[0] === 'z') {
                        metta.use(
                           [
                              content.iocMettatonAnchorFlyer,
                              content.iocMettatonAnchorDotdotdot,
                              content.iocMettatonAnchorPoint,
                              content.iocMettatonAnchorG,
                              content.iocMettatonAnchorLaugh,
                              content.iocMettatonAnchorOMG
                           ][+h[1]]
                        );
                     }
                  }
                  typer.on('header', mettaEmotes);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyIntro1);
                  const showmus = music.gameshow.instance(renderer);
                  sounds.applause.instance(renderer);
                  await renderer.pause(1350);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyIntro2);
                  sounds.drumroll.instance(renderer);
                  await renderer.pause(1950);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyIntro3a());
                  sounds.applause.instance(renderer);
                  const sand = character(
                     iRespeccYourVilliany() ? 'undyne' : 'sans',
                     iRespeccYourVilliany() ? characters.undyneDate : characters.sans,
                     startpos,
                     'right'
                  );
                  await sand.walk(renderer, 3, { x: 400 });
                  if (iRespeccYourVilliany()) {
                     sand.preset = characters.undyneDateSpecial;
                     sand.face = 'left';
                  } else {
                     await renderer.pause(350);
                     sand.preset = characters.sansSpecial;
                     sand.face = 'down';
                     await renderer.pause(650);
                  }
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyIntro3b());
                  sand.preset = iRespeccYourVilliany() ? characters.undyneDate : characters.sans;
                  sand.walk(renderer, 3, { y: 195 }, { x: 440, y: 195 }, { x: 440, y: 185 });
                  await renderer.pause(1250);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyIntro4a);
                  iRespeccYourVilliany() ? sounds.applause.instance(renderer) : sounds.clap.instance(renderer);
                  const napsta = character('napstablook', characters.napstablook, startpos, 'right');
                  napsta.walk(renderer, 3, { x: 390 }, { x: 390, y: 195 }, { x: 480, y: 195 }, { x: 480, y: 185 });
                  await renderer.pause(250);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyIntro4b());
                  await renderer.pause(1250);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyIntro5a());
                  player.walk(renderer, 3, { x: 400 }, { x: 400, y: 195 }, { x: 520, y: 195 }, { x: 520, y: 185 });
                  await renderer.pause(1950);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyIntro6a);
                  sounds.clap.instance(renderer);
                  const zad = SAVE.data.n.state_foundry_muffet === 1;
                  if (zad) {
                     await renderer.pause(2850);
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyIntro8);
                  } else {
                     metta.use(content.iocMettatonAnchorFlyer);
                  }
                  const key = zad ? 'tem' : 'kidd';
                  const kidd = character(key, characters[key], startpos, 'right');
                  await kidd.walk(renderer, 4, { x: 400 });
                  if (zad) {
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyIntro9);
                  } else {
                     for (const spr of Object.values(kidd.sprites)) {
                        spr.duration = 4;
                     }
                     kidd.sprite.enable();
                     await renderer.pause(450);
                     kidd.face = 'left';
                     kidd.sprite.enable();
                     await renderer.pause(450);
                     kidd.face = 'up';
                     kidd.sprite.enable();
                     await renderer.pause(450);
                     kidd.face = 'down';
                     kidd.sprite.enable();
                     await renderer.pause(650);
                     kidd.sprite.disable();
                     await renderer.pause(850);
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyIntro6b());
                  }
                  showmus.gain.modulate(renderer, 2000, 0).then(() => showmus.stop());
                  kidd.walk(renderer, 4, { x: 400, y: 195 }, { x: 560, y: 195 }, { x: 560, y: 185 });
                  if (zad) {
                     await renderer.pause(450);
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyIntro10);
                  }
                  await renderer.pause(1650);
                  zad && (await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyIntro11));
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyIntro7);
                  await Promise.all([
                     lights.objects[0].rotation.modulate(renderer, 1000, baserot - 10, baserot - 60, baserot - 60),
                     lights.objects[1].rotation.modulate(renderer, 1000, baserot, baserot - 20, baserot - 20),
                     lights.objects[2].rotation.modulate(renderer, 1000, baserot, baserot + 20, baserot + 20),
                     lights.objects[3].rotation.modulate(renderer, 1000, baserot + 10, baserot + 60, baserot + 60)
                  ]);
                  metta.use(content.iocMettatonAnchorFlyer);
                  await renderer.pause(150);
                  const overlay2 = new CosmosObject({ alpha: 0.7, priority: -10 });
                  const spotlightgraphics = new Graphics();
                  function spotlightpos (pos: CosmosPointSimple) {
                     sounds.noise.instance(renderer);
                     spotlightgraphics
                        .clear()
                        .beginFill(0, 1)
                        .drawRect(0, 0, 320, 240)
                        .endFill()
                        .beginHole()
                        .drawEllipse(renderer.projection(pos, game.camera.position).x, 160, 20, 35)
                        .endHole();
                  }
                  overlay2.container.addChild(spotlightgraphics);
                  renderer.attach('menu', overlay2);
                  function lightState (...indexes: number[]) {
                     let i = 0;
                     while (i < 4) {
                        lights.objects[i].alpha.value = indexes.includes(i) ? 1 : 0;
                        i++;
                     }
                  }
                  lightState(0);
                  const gterm1 = instance('main', 'gterm1')!.object;
                  spotlightpos(gterm1);
                  await renderer.pause(1450);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyChat1());
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyChat1a());
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyChat1b());
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyChat1c());
                  await renderer.pause(950);
                  lightState(1);
                  const gterm2 = instance('main', 'gterm2')!.object;
                  spotlightpos(gterm2);
                  await renderer.pause(1450);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyChat2);
                  sand.face = 'right';
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyChat2a());
                  renderer.pause(850).then(() => (sand.face = 'up'));
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyChat2b());
                  await renderer.pause(650);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyChat2c());
                  await renderer.pause(850);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyChat2d());
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyChat2e());
                  metta.use(content.iocMettatonAnchorFlyer);
                  await renderer.pause(950);
                  lightState(2);
                  const gterm3 = instance('main', 'gterm3')!.object;
                  spotlightpos(gterm3);
                  await renderer.pause(2650);
                  napsta.face = 'right';
                  await renderer.pause(650);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyChat3());
                  await renderer.pause(850);
                  napsta.face = 'up';
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyChat3a());
                  await renderer.pause(650);
                  lightState(3);
                  const gterm4 = instance('main', 'gterm4')!.object;
                  spotlightpos(gterm4);
                  await renderer.pause(650);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyChat4());
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyChat4a());
                  await renderer.pause(850);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyChat4b());
                  await renderer.pause(1250);
                  if (SAVE.data.n.state_foundry_muffet === 1) {
                     await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyChat4c1);
                  }
                  overlay2.alpha.modulate(renderer, 1500, 0);
                  await Promise.all([
                     lights.objects[0].alpha.modulate(renderer, 1000, 1),
                     lights.objects[1].alpha.modulate(renderer, 1000, 1),
                     lights.objects[2].alpha.modulate(renderer, 1000, 1)
                  ]);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyChat5());
                  await renderer.pause(850);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyTr1);
                  lights.objects[0].rotation.modulate(renderer, 1500, baserot - 60, baserot - 10, baserot - 10);
                  lights.objects[1].rotation.modulate(renderer, 1500, baserot - 20, baserot, baserot);
                  lights.objects[2].rotation.modulate(renderer, 1500, baserot + 20, baserot, baserot);
                  lights.objects[3].rotation.modulate(renderer, 1500, baserot + 60, baserot + 10, baserot + 10);
                  await renderer.pause(850);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyTr2);
                  header('x1').then(() => {
                     lights.objects[0].alpha.value = 0;
                     sounds.orchhit.instance(renderer).rate.value = ratio ** 4;
                  });
                  header('x2').then(() => {
                     lights.objects[1].alpha.value = 0;
                     lights.objects[2].alpha.value = 0;
                     sounds.orchhit.instance(renderer).rate.value = ratio ** 5;
                  });
                  header('x3').then(() => {
                     lights.objects[3].alpha.value = 0;
                     sounds.orchhit.instance(renderer).rate.value = ratio ** 6;
                  });
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyTr3);
                  await renderer.pause(1000);
                  const gterm1anim = gterm1.objects.filter(obj => obj instanceof CosmosAnimation)[0] as CosmosAnimation;
                  const gterm2anim = gterm2.objects.filter(obj => obj instanceof CosmosAnimation)[0] as CosmosAnimation;
                  const gterm3anim = gterm3.objects.filter(obj => obj instanceof CosmosAnimation)[0] as CosmosAnimation;
                  const gterm4anim = gterm4.objects.filter(obj => obj instanceof CosmosAnimation)[0] as CosmosAnimation;

                  const carryY = new CosmosValue(-20);
                  const carryTime = renderer.time;
                  const itemcarrier = new CosmosAnimation({
                     active: true,
                     position: { x: 500 },
                     priority: 100,
                     resources: content.iooACarrier,
                     anchor: { x: 0 }
                  }).on('tick', function () {
                     this.position.y = sineWaver(carryTime, 4000, carryY.value, carryY.value - 5);
                  });
                  renderer.attach('main', itemcarrier);

                  async function moneyRound (
                     resour: CosmosImage | CosmosAnimationResources,
                     texts: CosmosKeyed<CosmosProvider<string[]>, 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g'>,
                     c1time: number,
                     c1guess: number,
                     c2time: number,
                     c2guess: number,
                     c4time: number,
                     c4guess: number,
                     turnTime: number,
                     trueValue: number,
                     special = false
                  ) {
                     let v = 0;
                     let t = turnTime;
                     const spr = new OutertaleMultivisualObject({ position: { y: 8 } }, { anchor: { x: 0, y: 1 } });
                     spr.use(resour);
                     itemcarrier.objects = [ spr ];
                     carryY.modulate(renderer, 2000, 100, 100);
                     await renderer.pause(500);
                     const hy = CosmosUtils.hyperpromise();
                     if (special) {
                        await renderer.pause(1200);
                        await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyFinal2());
                        await renderer.pause(850);
                        if (!world.badder_lizard) {
                           await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyFinal3);
                           sounds.phone.instance(renderer);
                           await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyFinal4());
                           await endCall('dialoguerBottom');
                           await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyFinal5);
                        } else {
                           await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyFinal6);
                        }
                     }
                     await dialogue('dialoguerBottom', ...CosmosUtils.provide(texts.a));
                     let done = false;
                     const guessermusic = music.letsmakeabombwhydontwe.instance(renderer, 42.25);
                     guessermusic.rate.value = 1.1;
                     guessermusic.gain.value /= 10;
                     guessermusic.gain.modulate(renderer, 1500, guessermusic.gain.value * 10);
                     await Promise.all([
                        c1time > 0 && lights.objects[0].alpha.modulate(renderer, 1000, 0.5),
                        c2time > 0 && lights.objects[1].alpha.modulate(renderer, 1000, 0.5),
                        lights.objects[2].alpha.modulate(renderer, 1000, 0.5),
                        c4time > 0 && lights.objects[3].alpha.modulate(renderer, 1000, 0.5)
                     ]);
                     const timertext = new CosmosText({
                        fill: 0xffffff,
                        fontFamily: content.fMarsNeedsCunnilingus,
                        fontSize: 14,
                        position: { x: 379 + 66, y: 22 + 5 }
                     }).on('tick', async function () {
                        if (!done) {
                           const prex = Math.floor(t);
                           t -= 1 / 30;
                           const postx = Math.floor(t);
                           if (postx < prex && prex > 0) {
                              sounds.select.instance(renderer).rate.value = 1.7;
                              if (postx <= 10) {
                                 this.fill = postx <= 5 ? (this.fill = 0xff0000) : 0xffff00;
                                 await renderer.pause(133);
                                 sounds.select.instance(renderer).rate.value = 1.7;
                                 if (postx <= 5) {
                                    await renderer.pause(133);
                                    if (postx === 0) {
                                       sounds.select.instance(renderer).rate.value = 1.7;
                                       await renderer.pause(133);
                                       timertext.alpha.value = 0;
                                       await renderer.pause(133);
                                       timertext.alpha.value = 1;
                                       sounds.select.instance(renderer).rate.value = 1.7;
                                       await renderer.pause(133);
                                       timertext.alpha.value = 0;
                                       await renderer.pause(133);
                                       timertext.alpha.value = 1;
                                       sounds.select.instance(renderer).rate.value = 1.7;
                                       hy.resolve();
                                    } else {
                                       sounds.select.instance(renderer).rate.value = 1.7;
                                    }
                                 }
                              }
                              this.content = text.a_aerialis.story.cooker14.replace(
                                 '$(x)',
                                 postx.toString().padStart(2, '0')
                              );
                           }
                        }
                     });
                     let hchoose = false;
                     const infobox = menuBox(32, 320 + 38, 566, 140 - 38, 6, {
                        objects: [
                           new CosmosText({
                              fill: 0xffffff,
                              fontFamily: content.fDeterminationMono,
                              fontSize: 16,
                              position: { x: 11, y: 9 },
                              spacing: { x: 0, y: 5 },
                              stroke: -1
                           }).on('tick', function () {
                              this.content = (
                                 hchoose
                                    ? text.a_aerialis.story.moneyHelperConfirmed
                                    : text.a_aerialis.story.moneyHelper
                              ).replace('$(x)', v.toString());
                           })
                        ]
                     });
                     if (special && !world.badder_lizard && !iRespeccYourVilliany() && !world.scared_ghost) {
                        napsta.face = 'right';
                        await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyWhisper1());
                        if (choicer.result === 0) {
                           await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyWhisper2a);
                        } else {
                           oops();
                           SAVE.data.b.a_state_napstadecline = true;
                           await renderer.pause(1000);
                           await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyWhisper2b);
                        }
                        await renderer.pause(450);
                        napsta.face = 'up';
                        await renderer.pause(850);
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyWhisper3);
                        await renderer.pause(650);
                        if (choicer.result === 0) {
                           await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyWhisper4);
                        } else {
                           await renderer.pause(1000);
                        }
                     }
                     renderer.attach('menu', infobox);
                     turnTime > 0 && renderer.attach('main', timertext);
                     let presstimer = 0;
                     let pr = null as 'left' | 'right' | null;
                     function bump (amount: number) {
                        const pre_v = v;
                        v = Math.min(Math.max(v + amount, 0), 10000);
                        v === pre_v || sounds.menu.instance(renderer);
                     }
                     const lefty1 = () => {
                        if (keys.altKey.active()) {
                           return;
                        }
                        pr = 'left';
                        presstimer = renderer.time;
                        bump(-1);
                     };
                     const lefty2 = () => {
                        pr === 'left' && (pr = null);
                     };
                     const righty1 = () => {
                        if (keys.altKey.active()) {
                           return;
                        }
                        pr = 'right';
                        presstimer = renderer.time;
                        bump(1);
                     };
                     const righty2 = () => {
                        pr === 'right' && (pr = null);
                     };
                     const ticky = () => {
                        const offset = renderer.time - presstimer;
                        if (pr === 'left') {
                           if (offset > 3000) {
                              bump(-8);
                           } else if (offset > 2000) {
                              bump(-4);
                           } else if (offset > 1000) {
                              bump(-2);
                           } else if (offset > 400) {
                              bump(-1);
                           }
                        } else if (pr === 'right') {
                           if (offset > 3000) {
                              bump(8);
                           } else if (offset > 2000) {
                              bump(4);
                           } else if (offset > 1000) {
                              bump(2);
                           } else if (offset > 400) {
                              bump(1);
                           }
                        }
                     };
                     keys.leftKey.on('down', lefty1);
                     keys.leftKey.on('up', lefty2);
                     keys.rightKey.on('down', righty1);
                     keys.rightKey.on('up', righty2);
                     renderer.on('tick', ticky);
                     let finalValue = 0;
                     const guesses = [ c1guess, SAVE.data.b.a_state_napstadecline ? 999 : c2guess, 0, c4guess ];
                     const [ chosenContestant, winningValue ] = [ ...guesses.entries() ]
                        .filter(([ i, v ]) => v <= trueValue)
                        .sort((a, b) => b[1] - a[1])[0];
                     let monsterTime = 0;
                     let humanTime = 0;
                     await Promise.all([
                        c1time > 0 &&
                           renderer.pause(c1time).then(() => {
                              gterm1anim.index = 4;
                              sounds.purchase.instance(renderer).rate.value = 1.5;
                              lights.objects[0].tint = 0x7f3fff;
                              (lights.objects[4] as CosmosText).content = guesses[0].toString();
                              if (chosenContestant === 0) {
                                 monsterTime = renderer.time;
                              }
                           }),
                        c2time > 0 &&
                           renderer.pause(SAVE.data.b.a_state_napstadecline ? 15000 : c2time).then(() => {
                              gterm2anim.index = 4;
                              sounds.purchase.instance(renderer).rate.value = 1.5;
                              lights.objects[1].tint = 0x7f3fff;
                              (lights.objects[5] as CosmosText).content = guesses[1].toString();
                              if (chosenContestant === 1) {
                                 monsterTime = renderer.time;
                              }
                           }),
                        Promise.race([ keys.interactKey.on('down'), hy.promise ]).then(() => {
                           hy.resolve();
                           gterm3anim.index = 4;
                           sounds.purchase.instance(renderer).rate.value = 1.5;
                           lights.objects[2].tint = 0x7f3fff;
                           (lights.objects[6] as CosmosText).content = v.toString();
                           renderer.detach('menu', infobox);
                           keys.leftKey.off('down', lefty1);
                           keys.leftKey.off('up', lefty2);
                           keys.rightKey.off('down', righty1);
                           keys.rightKey.off('up', righty2);
                           renderer.off('tick', ticky);
                           finalValue = v;
                           humanTime = renderer.time;
                           hchoose = true;
                        }),
                        c4time > 0 &&
                           renderer.pause(c4time).then(() => {
                              gterm4anim.index = 4;
                              sounds.purchase.instance(renderer).rate.value = 1.5;
                              lights.objects[3].tint = 0x7f3fff;
                              (lights.objects[7] as CosmosText).content = guesses[3].toString();
                              if (chosenContestant === 3) {
                                 monsterTime = renderer.time;
                              }
                           })
                     ]);
                     done = true;
                     await renderer.pause(500);
                     guessermusic.gain.modulate(renderer, 2500, 0).then(() => guessermusic.stop());
                     lights.alpha.modulate(renderer, 1000, 0).then(() => {
                        lights.objects[0].alpha.value = 0;
                        lights.objects[1].alpha.value = 0;
                        lights.objects[2].alpha.value = 0;
                        lights.objects[3].alpha.value = 0;
                        lights.objects[0].tint = void 0;
                        lights.objects[1].tint = void 0;
                        lights.objects[2].tint = void 0;
                        lights.objects[3].tint = void 0;
                        (lights.objects[4] as CosmosText).content = '';
                        (lights.objects[5] as CosmosText).content = '';
                        (lights.objects[6] as CosmosText).content = '';
                        (lights.objects[7] as CosmosText).content = '';
                        lights.alpha.value = 1;
                     });
                     await dialogue('dialoguerBottom', ...CosmosUtils.provide(texts.b));
                     sounds.drumroll.instance(renderer);
                     await renderer.pause(1450);
                     const moneytext = new CosmosText({
                        anchor: 0,
                        fill: 0xffffff,
                        fontFamily: content.fMarsNeedsCunnilingus,
                        fontSize: 14,
                        position: { x: 540, y: 32 },
                        scale: 0,
                        content: trueValue.toString()
                     });
                     renderer.attach('main', moneytext);
                     moneytext.scale.modulate(renderer, 200, 1);
                     await renderer.pause(950);
                     await dialogue('dialoguerBottom', ...CosmosUtils.provide(texts.c));
                     timertext.alpha.modulate(renderer, 600, 0).then(() => {
                        renderer.detach('main', timertext);
                     });
                     moneytext.alpha.modulate(renderer, 600, 0).then(() => {
                        renderer.detach('main', moneytext);
                     });
                     carryY.modulate(renderer, 2000, carryY.value, -20).then(() => {
                        itemcarrier.objects = [];
                     });
                     await renderer.pause(450);
                     let x: boolean;
                     if (finalValue === winningValue) {
                        if (monsterTime <= humanTime) {
                           await dialogue('dialoguerBottom', ...CosmosUtils.provide(texts.f));
                           x = true;
                        } else {
                           await dialogue('dialoguerBottom', ...CosmosUtils.provide(texts.g));
                           x = false;
                        }
                     } else if (finalValue > winningValue && finalValue <= trueValue) {
                        await dialogue('dialoguerBottom', ...CosmosUtils.provide(texts.e));
                        x = false;
                     } else {
                        await dialogue('dialoguerBottom', ...CosmosUtils.provide(texts.d));
                        x = true;
                     }
                     gterm1anim.index = 0;
                     gterm2anim.index = 0;
                     gterm3anim.index = 0;
                     gterm4anim.index = 0;
                     SAVE.data.n.state_aerialis_valuediff += Math.abs(trueValue - finalValue);
                     return x;
                  }
                  let noitem = false;
                  if (
                     (SAVE.data.b.a_state_moneyitemA = !(await moneyRound(
                        content.iooAMoneyRadio, // item sprite
                        text.a_aerialis.story.moneyItem1, // text
                        iRespeccYourVilliany() ? 1000 : 9100, // sans guess timer (ms)
                        iRespeccYourVilliany() ? 60 : 40, // sans price
                        3700, // napstablook guess timer (ms)
                        70, // napstablook price
                        SAVE.data.n.state_foundry_muffet === 1 && SAVE.data.b.colleg ? 9000 : 8100, // kiddo guess timer (ms)
                        SAVE.data.n.state_foundry_muffet === 1 && SAVE.data.b.colleg ? 80 : 150, // kiddo price
                        20, // human guess timer (sec)
                        80 // true price
                     )))
                  ) {
                     if (SAVE.storage.inventory.size < 8) {
                        SAVE.data.b.item_tvm_radio = true;
                        sounds.equip.instance(renderer);
                        saver.add('tvm_radio');
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyItemPut1);
                     } else if (!noitem) {
                        noitem = true;
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyItemPut4);
                     }
                  }
                  await renderer.pause(1000);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyVote1());
                  await renderer.pause(1250);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyVote2());
                  await renderer.pause(950);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyVote2a());
                  await renderer.pause(950);
                  let hv = 0;
                  let sv = iRespeccYourVilliany() ? Infinity : 0;
                  async function comedy () {
                     await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyPun1());
                     if (!world.dead_skeleton) {
                        sand.preset = characters.sansSpecial;
                        sand.face = 'up';
                        const start = cam.position.clamp(...renderer.region);
                        const region = renderer.region;
                        renderer.region = [
                           { x: -Infinity, y: -Infinity },
                           { x: Infinity, y: Infinity }
                        ];
                        game.camera = new CosmosObject({ position: start });
                        await Promise.all([
                           autozoom(1.8, 266),
                           game.camera.position.modulate(renderer, 266, sand.position.value())
                        ]);
                        sounds.rimshot.instance(renderer);
                        await renderer.pause(850);
                        await Promise.all([ autozoom(1, 266), game.camera.position.modulate(renderer, 266, start) ]);
                        renderer.region = region;
                        game.camera = cam;
                        sand.preset = characters.sans;
                        sand.face = 'up';
                     }
                  }

                  if (world.sad_ghost || world.scared_ghost) {
                     await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyVote3x());
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyVote3y);
                     hv++;
                  } else {
                     await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyVote3a());
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyVote3b());
                     sv++;
                  }
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyVote4p());
                  if (choicer.result === 0) {
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyVote4());
                     if (choicer.result < 3) {
                        choicer.result === 0 && sv++;
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyVote4a1());
                     } else {
                        await dialogue(
                           'dialoguerBottom',
                           ...text.a_aerialis.story.moneyVote4a3(),
                           ...text.a_aerialis.story.moneyVote4a4()
                        );
                     }
                  } else {
                     await dialogue(
                        'dialoguerBottom',
                        ...text.a_aerialis.story.moneyVote4a2,
                        ...text.a_aerialis.story.moneyVote4a4()
                     );
                  }
                  if (SAVE.data.n.state_foundry_muffet !== 1 && SAVE.data.b.f_state_kidd_betray) {
                     await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyVote5x);
                     await renderer.pause(850);
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyVote5x1);
                     hv++;
                     if (hv > sv) {
                        await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyVote5x2b);
                     } else {
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyVote5x2a);
                     }
                  } else {
                     await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyVote5a());
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyVote5b);
                     await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyVote5c());
                     await renderer.pause(850);
                     sv++;
                     if (sv > hv) {
                        iRespeccYourVilliany() || (await comedy());
                        await dialogue(
                           iRespeccYourVilliany() ? 'dialoguerTop' : 'dialoguerBottom',
                           ...text.a_aerialis.story.moneyPun1a()
                        );
                     }
                  }
                  let m1c = false;
                  let failshow = false;
                  let dolly = false;
                  if (hv > sv) {
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyVote8);
                     failshow = true;
                     SAVE.data.b.failshow = true;
                  } else {
                     if (sv === hv) {
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyVote7);
                        await comedy();
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyPun1b);
                     }
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyVote6a());
                     await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyVote6b());
                     if (iRespeccYourVilliany()) {
                        napsta
                           .walk(renderer, 3, { y: 195 }, { x: 620, y: 195 }, { x: 620, y: 150 }, { x: 1000, y: 150 })
                           .then(() => {
                              renderer.detach('main', napsta);
                           });
                     } else {
                        sand
                           .walk(renderer, 3, { y: 195 }, { x: 620, y: 195 }, { x: 620, y: 150 }, { x: 1000, y: 150 })
                           .then(() => {
                              renderer.detach('main', sand);
                           });
                     }
                     await renderer.pause(1000);
                     const m1b = await moneyRound(
                        content.iooAMoneyFireworks, // item sprite
                        text.a_aerialis.story.moneyItem2, // text
                        iRespeccYourVilliany() ? 1000 : 0, // sans guess timer (ms)
                        iRespeccYourVilliany() ? 20 : 0, // sans price
                        iRespeccYourVilliany() ? 0 : 3500, // napstablook guess timer (ms)
                        iRespeccYourVilliany() ? 0 : 40, // napstablook price
                        SAVE.data.n.state_foundry_muffet === 1 && SAVE.data.b.colleg ? 9000 : 5800, // kiddo guess timer (ms)
                        SAVE.data.n.state_foundry_muffet === 1 && SAVE.data.b.colleg ? 250 : 200, // kiddo price
                        20, // human guess timer (sec)
                        250 // true price
                     );
                     if ((SAVE.data.b.a_state_moneyitemB = !m1b)) {
                        if (SAVE.storage.inventory.size < 8) {
                           SAVE.data.b.item_tvm_fireworks = true;
                           sounds.equip.instance(renderer);
                           saver.add('tvm_fireworks');
                           await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyItemPut2);
                        } else if (!noitem) {
                           noitem = true;
                           await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyItemPut4);
                        }
                     }
                     await renderer.pause(1000);
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyFinal0a());
                     await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyFinal0b());
                     if (iRespeccYourVilliany()) {
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyFinal0c);
                        await dialogue('dialoguerTop', ...text.a_aerialis.story.moneyFinal0d);
                     }
                     if (iRespeccYourVilliany()) {
                        sand
                           .walk(renderer, 3, { y: 195 }, { x: 620, y: 195 }, { x: 620, y: 150 }, { x: 1000, y: 150 })
                           .then(() => {
                              renderer.detach('main', sand);
                           });
                     } else {
                        kidd
                           .walk(renderer, 4, { y: 195 }, { x: 620, y: 195 }, { x: 620, y: 150 }, { x: 1000, y: 150 })
                           .then(() => {
                              renderer.detach('main', kidd);
                           });
                     }
                     await renderer.pause(1000);
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyFinal1());
                     m1c = await moneyRound(
                        content.iooAMoneyMew, // item sprite
                        text.a_aerialis.story.moneyItem3, // text
                        0, // sans guess timer (ms)
                        0, // sans price
                        iRespeccYourVilliany() ? 0 : world.badder_lizard ? 5000 : 1000, // napstablook guess timer (ms)
                        iRespeccYourVilliany() ? 0 : world.badder_lizard ? 500 : 42, // napstablook price
                        iRespeccYourVilliany() ? 10000 : 0, // kiddo guess timer (ms)
                        iRespeccYourVilliany() ? 900 : 0, // kiddo price
                        0, // human guess timer (sec)
                        999, // true price
                        true // cutscene
                     );
                     if (SAVE.data.b.a_state_napstadecline || world.scared_ghost) {
                        napsta
                           .walk(renderer, 3, { y: 195 }, { x: 620, y: 195 }, { x: 620, y: 150 }, { x: 1000, y: 150 })
                           .then(() => {
                              renderer.detach('main', napsta);
                           });
                        await renderer.pause(850);
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyTrash1);
                        await renderer.pause(1450);
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyTrash2);
                     }
                     if ((SAVE.data.b.a_state_moneyitemC = !m1c)) {
                        if (
                           SAVE.storage.inventory.size < 8 ||
                           (!SAVE.data.b.a_state_napstadecline &&
                              !world.badder_lizard &&
                              !iRespeccYourVilliany() &&
                              !world.scared_ghost)
                        ) {
                           dolly = true;
                           sounds.equip.instance(renderer);
                           await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyItemPut3);
                        } else if (!noitem) {
                           noitem = true;
                           await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyItemPut4);
                        }
                     }
                     await over.alpha.modulate(renderer, 1000, 1);
                  }
                  await over.alpha.modulate(renderer, 1000, 1);
                  renderer.detach('below', lights);
                  await renderer.pause(1000);
                  player.position.set(330, 150);
                  player.face = 'left';
                  const napcondition =
                     !failshow &&
                     !SAVE.data.b.a_state_napstadecline &&
                     !world.badder_lizard &&
                     !iRespeccYourVilliany() &&
                     !world.scared_ghost;
                  if (napcondition) {
                     napsta.position.set({ x: 300, y: 150 });
                     napsta.face = 'right';
                  } else {
                     renderer.detach('main', sand, kidd, napsta);
                  }
                  renderer.detach('main', itemcarrier);
                  await over.alpha.modulate(renderer, 1000, 0);
                  renderer.detach('menu', over);
                  await renderer.pause(1000);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyOutro1);
                  mettpos.modulate(renderer, 1100, mettpos.value(), { y: 0 }).then(() => {
                     renderer.detach('main', metta);
                  });
                  await renderer.pause(1000);
                  await cam.position.modulate(renderer, 2000, player.position.clamp(...renderer.region));
                  if (napcondition) {
                     if (SAVE.data.b.f_state_blookbetray) {
                        SAVE.data.b.f_state_blookbetray = false;
                        SAVE.data.n.state_wastelands_napstablook = 3;
                     } else if (world.sad_ghost) {
                        SAVE.data.n.state_wastelands_napstablook = 3;
                     }
                     await renderer.pause(1500);
                     if (!m1c) {
                        SAVE.data.b.a_state_moneyitemC = false;
                        await dialogue('auto', ...text.a_aerialis.story.napchat0);
                     }
                     await dialogue('auto', ...text.a_aerialis.story.napchat1());
                     await renderer.pause(850);
                     napsta.face = 'left';
                     await renderer.pause(650);
                     napsta.face = 'right';
                     await renderer.pause(1350);
                     if (world.happy_ghost && !SAVE.data.b.bad_lizard && SAVE.data.n.kills_wastelands < 16) {
                        await dialogue('auto', ...text.a_aerialis.story.napchat2b);
                        SAVE.data.b.a_state_hapstablook = true;
                     } else {
                        await dialogue('auto', ...text.a_aerialis.story.napchat2a);
                     }
                     napsta.alpha.modulate(renderer, 500, 0).then(() => {
                        renderer.detach('main', napsta);
                     });
                     if (!SAVE.data.b.oops) {
                        await dialogue('auto', ...text.a_aerialis.story.truemtt3);
                     }
                  } else if (dolly) {
                     SAVE.data.b.item_tvm_mewmew = true;
                     saver.add('tvm_mewmew');
                  }
                  game.camera = player;
                  SAVE.data.n.plot = 60;
               } else {
                  await renderer.when(() => game.room === 'a_mettaton2' && player.position.x <= 580 && game.movement);
                  SAVE.data.n.plot = 59.1;
                  game.menu = false;
                  game.movement = false;
                  game.music?.stop();
                  const p1 = instance('below', 'pathtile1')!.object;
                  const p2 = instance('below', 'pathtile2')!.object;
                  p1.priority.value = -9000;
                  p2.priority.value = -9000;
                  shake(1, 300);
                  sounds.pathway.instance(renderer);
                  p1.position.y += 10;
                  await p2.position.modulate(renderer, 300, { y: p2.position.y + 10 });
                  shake(1, 300);
                  sounds.pathway.instance(renderer);
                  p1.position.x += 60;
                  await p2.position.modulate(renderer, 300, { x: p2.position.x - 60 });
                  sounds.landing.instance(renderer);
                  const cam = new CosmosObject({ position: player.position.clamp(...renderer.region) });
                  game.camera = cam;
                  await renderer.pause(650);
                  await cam.position.modulate(renderer, 1200, { x: 500 });
                  await renderer.pause(850);
                  sounds.phone.instance(renderer);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyX1);
                  const supriseurdeadWHAT = music.gameshow.instance(renderer);
                  supriseurdeadWHAT.rate.value = 1.275;
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyX2a);
                  let t = 900;
                  let done = false;
                  const timertext = new CosmosText({
                     fill: 0xffffff,
                     fontFamily: content.fMarsNeedsCunnilingus,
                     fontSize: 14,
                     position: { x: 379 + 66, y: 22 + 5 }
                  }).on('tick', async function () {
                     if (!done) {
                        const prex = Math.floor(t);
                        t -= 1 / 30;
                        const postx = Math.floor(t);
                        if (postx < prex && prex > 0) {
                           sounds.select.instance(renderer).rate.value = 1.7;
                           if (postx <= 10) {
                              this.fill = postx <= 5 ? (this.fill = 0xff0000) : 0xffff00;
                              await renderer.pause(133);
                              sounds.select.instance(renderer).rate.value = 1.7;
                              if (postx <= 5) {
                                 await renderer.pause(133);
                                 if (postx === 0) {
                                    sounds.select.instance(renderer).rate.value = 1.7;
                                    await renderer.pause(133);
                                    timertext.alpha.value = 0;
                                    await renderer.pause(133);
                                    timertext.alpha.value = 1;
                                    sounds.select.instance(renderer).rate.value = 1.7;
                                    await renderer.pause(133);
                                    timertext.alpha.value = 0;
                                    await renderer.pause(133);
                                    timertext.alpha.value = 1;
                                    sounds.select.instance(renderer).rate.value = 1.7;
                                    done = true;
                                 } else {
                                    sounds.select.instance(renderer).rate.value = 1.7;
                                 }
                              }
                           }
                           this.content = text.a_aerialis.story.cooker14.replace(
                              '$(x)',
                              postx.toString().padStart(3, '0')
                           );
                        }
                     }
                  });
                  renderer.attach('main', timertext);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyX2b);
                  await renderer.pause(1000);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyX3());
                  goatbro.metadata.override = true;
                  await goatbro.walk(renderer, 3, {
                     y: player.position.y < 140 ? player.position.y + 21 : player.position.y - 21
                  });
                  await goatbro.walk(renderer, 3, { x: 540 }, { x: 540, y: 123 });
                  await renderer.pause(650);
                  goatbro.alpha.value = 0;
                  const kneelerSprite = new OutertaleMultivisualObject({}, { anchor: { x: 0, y: 1 } });
                  kneelerSprite.use(content.iocAsrielDown);
                  const kneeler = new CosmosHitbox({
                     position: goatbro,
                     priority: -10,
                     metadata: { barrier: true, interact: true, name: 'aerialis', args: [ 'm2climber' ] },
                     size: { x: 20, y: 5 },
                     anchor: 0,
                     objects: [ kneelerSprite ]
                  });
                  renderer.attach('main', kneeler);
                  await renderer.pause(850);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyX4());
                  const bbarrier = new CosmosObject({
                     objects: [
                        new CosmosHitbox({
                           position: { x: 340, y: 120 },
                           size: { x: 20, y: 60 },
                           metadata: { barrier: true }
                        }),
                        new CosmosHitbox({
                           position: { x: 640, y: 120 },
                           size: { x: 20, y: 60 },
                           metadata: { barrier: true }
                        })
                     ]
                  });
                  renderer.attach('below', bbarrier);
                  game.movement = true;
                  const iteration = SAVE.flag.n.ga_asrielMoneyT2;
                  for (const [ index, NRT ] of [ 30, 60, 90, 120, 300, 600, 780, 840, 870 ].entries()) {
                     await renderer.when(() => done || roomState.climber === true || 900 - t > NRT);
                     if (done || roomState.climber === true) {
                        break;
                     }
                     if (atlas.navigator !== null) {
                        typer.reset(true);
                     } else {
                        game.movement || (await renderer.when(() => game.movement));
                     }
                     game.movement = false;
                     await renderer.pause(200);
                     index === 0 && SAVE.flag.n.ga_asrielMoneyT2++;
                     if (done || (roomState.climber as boolean) === true) {
                        break;
                     }
                     await dialogue(
                        'auto',
                        ...[
                           text.a_aerialis.story.moneyT1,
                           text.a_aerialis.story.moneyT2,
                           text.a_aerialis.story.moneyT3,
                           text.a_aerialis.story.moneyT4,
                           text.a_aerialis.story.moneyT5,
                           text.a_aerialis.story.moneyT6,
                           text.a_aerialis.story.moneyT7,
                           text.a_aerialis.story.moneyT8,
                           text.a_aerialis.story.moneyT9
                        ][index](iteration)
                     );
                     game.movement = true;
                  }
                  await renderer.when(() => done || roomState.climber === true);
                  function endkneel () {
                     renderer.pause(350).then(async () => {
                        renderer.detach('main', kneeler);
                        goatbro.alpha.value = 1;
                        await renderer.pause(450);
                        goatbro.face = 'down';
                     });
                  }
                  if (!done) {
                     kneelerSprite.use(content.iocAsrielKneel);
                     await renderer.pause(1600);
                     if (player.position.x > goatbro.position.x - 21 && player.position.y < goatbro.position.y) {
                        await player.walk(renderer, 3, { y: goatbro.position.y + 21 });
                     }
                     await player.walk(
                        renderer,
                        3,
                        { x: goatbro.position.x - 21 },
                        { x: goatbro.position.x - 21, y: goatbro.position.y }
                     );
                     await renderer.pause(650);
                     await player.walk(renderer, 1, { x: goatbro.position.x - 14 });
                     player.face = 'right';
                     await renderer.pause(850);
                     const hugguhRecs = SAVE.data.b.water
                        ? content.iocAsrielHug1NormalWater
                        : content.iocAsrielHug1Normal;
                     const hugguh = new CosmosAnimation({
                        position: player,
                        scale: { x: -1 },
                        anchor: { x: 0, y: 1 },
                        resources: hugguhRecs
                     });
                     renderer.attach('main', hugguh);
                     player.alpha.value = 0;
                     await renderer.pause(600);
                     hugguh.index = 1;
                     await renderer.pause(600);
                     hugguh.reset().use(SAVE.data.b.water ? content.iocAsrielPetWater : content.iocAsrielPet);
                     hugguh.index = 0;
                     await renderer.pause(800);
                     hugguh.index = 1;
                     hugguh.enable();
                     await renderer.pause(800);
                     await dialogue('auto', ...text.a_aerialis.overworld.kneeler);
                     await renderer.pause(400);
                     await renderer.when(() => hugguh.index === 0);
                     hugguh.disable();
                     await renderer.pause(600);
                     hugguh.use(hugguhRecs);
                     hugguh.index = 1;
                     await renderer.pause(600);
                     hugguh.index = 0;
                     await renderer.pause(600);
                     renderer.detach('main', hugguh);
                     player.alpha.value = 1;
                     await player.position.modulate(renderer, 750, kneeler.position.subtract(0, 15));
                     player.face = 'up';
                     await renderer.pause(650);
                     endkneel();
                     await player.position.modulate(renderer, 750, { x: 540, y: 90 });
                     await dialogue('auto', ...text.a_aerialis.overworld.kneeler2);
                     game.movement = true;
                  }
                  await renderer.when(() => done || roomState.killswitch === true);
                  if (atlas.navigator !== null) {
                     typer.reset(true);
                  } else {
                     game.movement || (await renderer.when(() => game.movement));
                  }
                  SAVE.data.b.a_state_awaiter = done;
                  done = true;
                  game.movement = false;
                  if (SAVE.data.b.a_state_awaiter) {
                     await supriseurdeadWHAT.gain.modulate(renderer, 600, 0);
                     supriseurdeadWHAT.stop();
                  } else {
                     supriseurdeadWHAT.stop();
                  }
                  sounds.noise.instance(renderer);
                  timertext.alpha.modulate(renderer, 600, 0).then(() => {
                     renderer.detach('main', timertext);
                  });
                  await Promise.all([
                     p1.position.modulate(renderer, 300, { x: p1.position.x - 60 }),
                     p2.position.modulate(renderer, 300, { x: p2.position.x + 60 })
                  ]);
                  shake(1, 300);
                  sounds.pathway.instance(renderer);
                  await Promise.all([
                     p1.position.modulate(renderer, 300, { y: p1.position.y - 10 }),
                     p2.position.modulate(renderer, 300, { y: p2.position.y - 10 })
                  ]);
                  shake(1, 300);
                  sounds.pathway.instance(renderer);
                  renderer.detach('below', bbarrier);
                  roomState.climber || endkneel();
                  await renderer.pause(1450);
                  if (SAVE.data.b.a_state_awaiter) {
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyX4b);
                  } else {
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyX4a);
                  }
                  sounds.phone.instance(renderer);
                  if (SAVE.data.b.a_state_awaiter) {
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyX5b);
                  } else {
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyX5a);
                  }
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyX5c);
                  await endCall('dialoguerBottom');
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyX6a);
                  await renderer.pause(450 + 850);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyX6b);
                  await renderer.pause(800);
                  goatbro.face = 'left';
                  if (roomState.climber) {
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyX7);
                     await player.walk(renderer, 3, { x: 460 }, { x: 460, y: 100 });
                     await new Promise<void>(async resolve => {
                        const midPoint = player.position.subtract(0, 10).value();
                        const endPoint = player.position.add(0, 30).value();
                        player.position.modulate(renderer, 1000, midPoint, endPoint).then(async () => {
                           resolve();
                        });
                        while (player.position.y < endPoint.y) {
                           await renderer.pause(99);
                           player.face = (
                              { up: 'left', left: 'down', down: 'right', right: 'up' } as CosmosKeyed<
                                 CosmosDirection,
                                 CosmosDirection
                              >
                           )[player.face];
                        }
                     });
                     await renderer.pause(350);
                     player.face = 'down';
                     await renderer.pause(850);
                  }
                  const idealX = player.position.x > 600 ? player.position.x - 21 : player.position.x + 21;
                  if (Math.abs(idealX - player.position.x) < Math.abs(idealX - goatbro.position.x)) {
                     await goatbro.walk(renderer, 3, {
                        y: player.position.y < 140 ? player.position.y + 21 : player.position.y - 21
                     });
                     await goatbro.walk(renderer, 3, { x: idealX });
                     await goatbro.walk(renderer, 3, { y: player.position.y });
                  } else {
                     await goatbro.walk(renderer, 3, { y: player.position.y }, { x: idealX, y: player.position.y });
                  }
                  goatbro.face = player.position.x > 600 ? 'right' : 'left';
                  goatbro.metadata.override = false;
                  tracker.supplant(goatbro.face);
                  await renderer.pause(1000);
                  await cam.position.modulate(renderer, 1000, player.position.clamp(...renderer.region));
                  game.camera = player;
                  await renderer.pause(1500);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.moneyX8);
                  SAVE.data.n.plot = 64;
               }
               game.movement = true;
               game.menu = true;
               quickresume();
            }
         }
      },
      a_sans () {
         (SAVE.data.n.plot > 56 || world.edgy_xxx || world.dead_skeleton || SAVE.data.n.state_foundry_undyne === 2) &&
            instance('main', 'sentryskeleton')?.destroy();
      },
      async a_pacing (roomState) {
         SAVE.data.b.item_tablaphone && instance('below', 'tablaphone')?.destroy();
      },
      async a_prepuzzle () {
         if (SAVE.data.n.plot === 72) {
            const dl = instance('main', 'a_dresslion');
            if (dl) {
               (dl.object.objects[0] as CosmosAnimation).use(content.ionADresslion2);
            }
         }
      },
      async a_split (roomState) {
         if (!roomState.active && !world.genocide && SAVE.data.n.plot < 63) {
            roomState.active = true;
            if (SAVE.data.b.a_state_hapstablook) {
               const napsta = character('napstablook', characters.napstablook, { x: 250, y: 170 }, 'up', {
                  metadata: { tags: [ 'blookishly' ] }
               });
               roomState.napsta = napsta;
               await Promise.race([
                  events.on('teleport'),
                  renderer.when(() => game.room === 'a_split' && player.position.y < 240 && game.movement)
               ]);
               if (game.room === 'a_split') {
                  game.movement = false;
                  await renderer.pause(650);
                  napsta.face = 'down';
                  await renderer.pause(850);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta1());
                  choicer.result === 1 && oops();
                  await dialogue(
                     'dialoguerBottom',
                     ...[ text.a_aerialis.story.hapsta1a, text.a_aerialis.story.hapsta1b ][choicer.result]
                  );
                  if (choicer.result === 1) {
                     SAVE.data.b.a_state_hapstablook = false;
                     SAVE.data.n.plot = 63;
                     game.movement = true;
                     await Promise.race([
                        events.on('teleport'),
                        napsta
                           .walk(renderer, 3, { x: 300 }, { x: 420, y: 160 })
                           .then(() => napsta.alpha.modulate(renderer, 500, 0))
                     ]);
                     renderer.detach('main', napsta);
                     return;
                  }
                  await napsta.walk(renderer, 3, { x: 300 });
                  const fd = fader();
                  await Promise.all([
                     player.walk(renderer, 3, { x: 420, y: 160 }),
                     napsta.walk(renderer, 3, { x: 420, y: 160 }).then(() => napsta.alpha.modulate(renderer, 500, 0)),
                     fd.alpha.modulate(renderer, 2000, 1).then(() => renderer.pause(1400)),
                     game.music?.gain.modulate(renderer, 2000, 0)
                  ]);
                  await teleport('a_offshoot2', 'right', 20, 160, { fast: true, fade: false, cutscene: true });
                  game.movement = false;
                  napsta.position.set(100, 160);
                  napsta.face = 'left';
                  napsta.alpha.value = 1;
                  await renderer.pause(1000);
                  quickresume(true);
                  await fd.alpha.modulate(renderer, 300, 0);
                  await renderer.pause(1000);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta2);
                  await renderer.pause(650);
                  napsta.face = 'down';
                  await renderer.pause(850);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta3a);
                  napsta.face = 'left';
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta3b);
                  await napsta.walk(renderer, 3, { x: 160 }, { x: 160, y: 130 });
                  await renderer.pause(650);
                  const term: CosmosSprite = await areaA.scripts.terminal?.({}, {}, '-1');
                  await renderer.pause(850);
                  napsta.face = 'down';
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta4);
                  await player.walk(renderer, 3, { x: 130 }, { x: 130, y: 130 });
                  await renderer.pause(650);
                  napsta.face = 'left';
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta5);
                  await Promise.all([
                     game.music?.gain.modulate(renderer, 1000, 0),
                     fd.alpha.modulate(renderer, 1000, 1)
                  ]);
                  game.music && (game.music.rate.value = 0);
                  await renderer.pause(850);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta6);
                  renderer.detach('main', term);
                  player.face = 'down';
                  game.music && (game.music.rate.value = game.music.daemon.rate);
                  await Promise.all([
                     game.music?.gain.modulate(renderer, 300, world.level),
                     fd.alpha.modulate(renderer, 300, 0)
                  ]);
                  await renderer.pause(850);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta7);
                  game.music?.stop();
                  napsta.face = 'down';
                  const finalghost = character('finalghost', characters.finalghost, { x: 20, y: 160 }, 'right', {
                     alpha: 0
                  });
                  await finalghost.alpha.modulate(renderer, 300, 1);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta8);
                  await finalghost.walk(renderer, 3, { x: 50 });
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta9);
                  await finalghost.walk(renderer, 3, { x: 160 }, { x: 160, y: 150 });
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta10);
                  await renderer.pause(850);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta11);
                  await renderer.pause(650);
                  finalghost.face = 'down';
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta12a());
                  finalghost.face = 'up';
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta12b);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta13);
                  napsta.face = 'left';
                  finalghost.face = 'left';
                  const time = renderer.time;
                  const dummy = new CosmosAnimation({
                     anchor: { x: 0, y: 1 },
                     resources: content.ionODummyMad,
                     position: { x: -20, y: 160 },
                     scale: { x: -1 }
                  }).on('tick', () => {
                     dummy.offsets[0].y = CosmosMath.wave(((renderer.time - time) % 4000) / 4000) * -2;
                  });
                  renderer.attach('main', dummy);
                  const cover = new CosmosRectangle({ fill: 0xffffff, size: { x: 320, y: 240 } });
                  renderer.attach('menu', cover);
                  sounds.boom.instance(renderer);
                  shake(2, 800);
                  const loop = music.predummy.instance(renderer);
                  loop.gain.value /= 8;
                  const t = dummy.position.add(60, 0);
                  await Promise.all([
                     loop.gain.modulate(renderer, 500, loop.gain.value * 8),
                     cover.alpha.modulate(renderer, 500, 1, 0),
                     dummy.position.modulate(renderer, 500, t, t, t)
                  ]);
                  renderer.detach('menu', cover);
                  await renderer.pause(450);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta14);
                  finalghost.face = 'down';
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta15);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta16);
                  finalghost.face = 'left';
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta17);
                  loop.stop();
                  sounds.shatter.instance(renderer);
                  dummy.scale.x = 1;
                  dummy.use(content.ionODummy);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta18);
                  finalghost.face = 'down';
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta19);
                  dummy.scale.x = -1;
                  await finalghost.walk(renderer, 3, { y: 190 }, { x: 140, y: 190 });
                  await renderer.pause(1150);
                  finalghost.face = 'up';
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta20);
                  await renderer.pause(650);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta21);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta22);
                  await renderer.pause(850);
                  napsta.face = 'right';
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta23);
                  await renderer.pause(650);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta24);
                  await renderer.pause(850);
                  sounds.phone.instance(renderer);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta25);
                  await renderer.pause(650);
                  napsta.face = 'down';
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta26);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta27);
                  await renderer.pause(850);
                  napsta.face = 'right';
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta28);
                  await endCall('dialoguerBottom');
                  napsta.face = 'down';
                  await renderer.pause(650);
                  dummy.scale.x = 1;
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta29);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.hapsta30);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta31);
                  dummy.position.step(renderer, 3, { x: 10 }).then(async () => {
                     await dummy.alpha.modulate(renderer, 300, 0);
                     renderer.detach('main', dummy);
                  });
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta32());
                  finalghost.walk(renderer, 3, { x: 20, y: 160 }).then(async () => {
                     await finalghost.alpha.modulate(renderer, 300, 0);
                     renderer.detach('main', finalghost);
                  });
                  await renderer.pause(850);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta34());
                  await napsta.alpha.modulate(renderer, 500, 0);
                  renderer.detach('main', napsta);
                  if (!SAVE.data.b.oops) {
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.hapsta35);
                  }
                  game.movement = true;
                  quickresume();
               } else {
                  renderer.detach('main', napsta);
                  roomState.active = false;
                  return;
               }
            }
            SAVE.data.n.plot = 63;
         }
      },
      async a_elevator1 () {
         (SAVE.data.b.svr ||
            world.runaway ||
            world.bad_lizard > 1 ||
            SAVE.data.b.bad_lizard ||
            epilogueOverride(world.population < 6) ||
            roomKills().a_elevator1 > 1) &&
            instance('main', 'a_businessdude')?.destroy();
      },
      async a_elevator2 () {
         if (world.genocide && SAVE.data.n.state_aerialis_monologue < 7) {
            teleporter.movement = false;
            SAVE.data.n.state_aerialis_monologue = 7;
            await dialogue('auto', ...text.a_aerialis.genotext.asriel52());
            game.movement = true;
         }
      },
      async a_elevator3 (roomState) {
         if (roomState.active) {
            return;
         }
         roomState.active = true;
         if (SAVE.data.n.plot < 64) {
            if (!world.badder_lizard) {
               await renderer.when(() => game.room === 'a_elevator3' && player.position.x < 280 && game.movement);
               game.movement = false;
               game.music?.stop();
               SAVE.data.n.plot = 64;
               player.face = 'left';
               const lizard = character('alphys', characters.alphys, { x: 160, y: 150 }, 'down', { alpha: 0 });
               await lizard.alpha.modulate(renderer, 300, 1);
               await lizard.walk(renderer, 3, { y: player.position.y }, player.position.subtract(50, 0));
               await renderer.pause(850);
               await dialogue('auto', ...text.a_aerialis.story.opera1());
               await lizard.walk(renderer, 3, { x: 180 });
               await renderer.pause(850);
               lizard.face = 'right';
               await renderer.pause(1150);
               await dialogue('auto', ...text.a_aerialis.story.opera2);
               await Promise.all([
                  lizard.walk(renderer, 3, { x: 160 }, { x: 160, y: 150 }).then(() => {
                     lizard.alpha.modulate(renderer, 300, 0);
                  }),
                  player.walk(renderer, 3, { x: 160 }, { x: 160, y: 150 })
               ]);
               await teleport('a_lift', 'up', 160, 230, world);
               rooms.of('a_elevator4').preload.load();
               lizard.position.set(160, 180);
               lizard.face = 'down';
               lizard.alpha.value = 1;
               player.walk(renderer, 3, { y: 215 });
               await renderer.pause(850);
               lizard.face = 'up';
               await renderer.pause(1150);
               const vator = elevate();
               await renderer.pause(450);
               lizard.face = 'down';
               await renderer.pause(850);
               await dialogue('auto', ...text.a_aerialis.story.opera3);
               await Promise.all([ vator, renderer.pause(950) ]);
               await renderer.pause(800);
               await dialogue('auto', ...text.a_aerialis.story.opera4());
               await player.walk(renderer, 3, { y: 210 });
               player.walk(renderer, 3, { x: 130 }).then(() => (player.face = 'up'));
               await lizard.walk(renderer, 3, { y: 235 });
               lizard.alpha.modulate(renderer, 300, 0);
               await player.walk(renderer, 3, { x: 160 }, { x: 160, y: 235 });
               const gm = game.music;
               gm?.gain.modulate(renderer, 300, 0).then(() => gm.stop());
               await teleport('a_elevator4', 'down', 60, 110, world);
               lizard.position.set(player.position.add(0, 30));
               lizard.face = 'down';
               lizard.alpha.value = 1;
               player.walk(renderer, 3, { y: 260 }, { x: 150, y: 260 });
               await lizard.walk(renderer, 3, { y: 260 }, { x: 180, y: 260 });
               await renderer.pause(1400);
               const rg1 = instance('main', 'securityGuard1')?.object.objects[0] as CosmosAnimation | void;
               const rg2 = instance('main', 'securityGuard2')?.object.objects[0] as CosmosAnimation | void;
               let t = 0;
               const waver = function (this: CosmosAnimation) {
                  this.scale.set(sineWaver(t, 1000, 0.9, 1.1), sineWaver(t, 1000, 1.1, 0.9));
               };
               const rgHeaders = (h: string) => {
                  switch (h) {
                     case 'x1':
                        t = renderer.time;
                        rg1!.on('tick', waver);
                        break;
                     case 'x2':
                        t = renderer.time;
                        rg2!.on('tick', waver);
                        break;
                     case 'x3':
                        rg1!.off('tick', waver);
                        rg2!.off('tick', waver);
                        rg1!.scale.set(1);
                        rg2!.scale.set(1);
                        break;
                  }
               };
               const rge = rg1 !== void 0 && rg2 !== void 0;
               if (rge) {
                  typer.on('header', rgHeaders);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.opera5);
                  await renderer.pause(150);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.opera6);
                  await renderer.pause(850);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.opera7());
                  await renderer.pause(1250);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.opera8);
                  await renderer.pause(350);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.opera9);
                  const field = instance('below', 'securityField')!.object;
                  sounds.depower.instance(renderer);
                  renderer.pause(280).then(async () => {
                     field.alpha.value = 0;
                     await renderer.pause(420 - 320);
                     field.alpha.value = 1;
                     await renderer.pause(570 - 420);
                     field.alpha.value = 0;
                     await renderer.pause(650 - 570);
                     field.alpha.value = 1;
                     await renderer.pause(720 - 650);
                     renderer.detach('below', field);
                  });
                  await renderer.pause(1450);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.opera10);
               } else {
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.opera5b);
               }
               const walkPromise = Promise.all([
                  lizard.walk(renderer, 3, { y: 260 }, { x: 340, y: 260 }).then(() => {
                     lizard.alpha.modulate(renderer, 300, 0);
                  }),
                  player.walk(renderer, 3, { x: 260 }, { x: 340, y: 260 }).then(() => {
                     player.alpha.modulate(renderer, 300, 0);
                  })
               ]);
               await renderer.pause(1000);
               if (rge) {
                  rg1.use(content.ionARgdragonDown);
                  await dialogue('dialoguerTop', ...text.a_aerialis.story.opera11);
                  typer.off('header', rgHeaders);
               }
               const ov = fader();
               if (rge) {
                  renderer.pause(650).then(() => {
                     rg1.use(content.ionARgdragonLeft);
                  });
               }
               await ov.alpha.modulate(renderer, 1250, 1);
               await renderer.pause(1000);
               await Promise.all([
                  dialogue('dialoguerBottom', ...text.a_aerialis.story.opera12),
                  walkPromise.then(() =>
                     teleport('a_auditorium', 'down', 240, 180, { fade: false, fast: true, cutscene: true })
                  )
               ]);
               ov.alpha.modulate(renderer, 1250, 0).then(() => renderer.detach('menu', ov));
               await operaShow(lizard);
               if (SAVE.data.b.killed_glyde) {
                  return;
               }
               await Promise.race([
                  lizard
                     .walk(renderer, world.bad_lizard === 1 ? 4 : 3, { x: 10 })
                     .then(() => lizard.alpha.modulate(renderer, 300, 0)),
                  events.on('teleport')
               ]);
               renderer.detach('main', lizard);
            }
         }
      },
      async a_elevator4 (roomState) {
         if (SAVE.data.n.plot > 64 || world.bad_lizard > 1 || world.badder_lizard || adultEvac()) {
            instance('below', 'securityField')?.destroy();
         }
         if (
            SAVE.data.n.plot === 72 ||
            SAVE.data.b.ubershortcut ||
            world.bad_lizard > 1 ||
            world.badder_lizard ||
            adultEvac()
         ) {
            instance('main', 'securityGuard1')?.destroy();
            instance('main', 'securityGuard2')?.destroy();
         }
         if (world.genocide) {
            if (SAVE.data.n.plot_approach < 1) {
               teleporter.movement = false;
               await dialogue('auto', ...text.a_aerialis.genotext.hotel0());
               SAVE.data.n.plot_approach = 1;
               game.movement = true;
            }
            if (!roomState.active) {
               roomState.active = true;
               if (
                  (SAVE.flag.n.genocide_milestone < 5
                     ? SAVE.flag.b.asriel_electrics
                        ? SAVE.flag.n.ga_asrielElectrics1
                        : SAVE.flag.n.ga_asrielHotel1
                     : SAVE.flag.n.ga_asrielAlphysCom3) < 1 &&
                  SAVE.data.n.plot_approach < 2
               ) {
                  await renderer.when(() => game.room === 'a_elevator4' && player.position.x > 300 && game.movement);
                  game.movement = false;
                  const goatface = goatbro.face;
                  header('x1').then(() => (goatbro.face = 'left'));
                  if (SAVE.flag.n.genocide_milestone < 5) {
                     if (SAVE.flag.b.asriel_electrics) {
                        SAVE.flag.n.ga_asrielElectrics1++;
                     } else {
                        SAVE.flag.n.ga_asrielHotel1++;
                     }
                  } else {
                     SAVE.flag.n.ga_asrielAlphysCom3++;
                  }
                  await dialogue('auto', ...text.a_aerialis.genotext.hotel1());
                  SAVE.data.n.plot_approach = 2;
                  goatbro.face = goatface;
                  game.movement = true;
               }
            }
         }
      },
      async a_elevator5 (roomState) {
         (SAVE.data.b.ubershortcut || SAVE.data.b.svr || world.runaway) && instance('main', 'a_reg')?.destroy();
      },
      a_auditorium () {
         if (SAVE.data.n.plot > 64.1 && world.genocide) {
            temporary(
               new CosmosHitbox({
                  position: { x: 285, y: 180 },
                  tint: 0x959595,
                  anchor: { x: 0, y: 1 },
                  size: { x: 57, y: 6 },
                  metadata: { barrier: true, interact: true, name: 'trivia', args: [ 'deadbot' ] },
                  objects: [
                     new CosmosAnimation({ resources: content.iocMettatonDressIdle, index: 12, anchor: { x: 0, y: 1 } })
                  ]
               }),
               'main'
            );
         }
      },
      a_aftershow () {
         const bbox = instance('main', 'bbox');
         bbox && (bbox.index = 11);
         if (SAVE.data.n.plot <= 65 && !adultEvac() && !world.dead_skeleton && !world.edgy_xx) {
            temporary(
               character('sans', characters.sans, { x: 240, y: 129 }, 'down', {
                  anchor: { x: 0, y: 1 },
                  size: { x: -22, y: 7 },
                  metadata: { interact: true, barrier: true, tags: [ 'datesans' ], name: 'aerialis', args: [ 'sansdate' ] }
               }).on('tick', function () {
                  if (this.talk) {
                     this.face = ultimaFacer(this);
                  } else {
                     this.face = 'down';
                  }
               }),
               'main'
            );
         }
      },
      async a_lookout (roomState) {
         if (
            !roomState.active &&
            !SAVE.data.b.onionsan &&
            !SAVE.data.b.ubershortcut &&
            SAVE.data.n.plot < 68.1 &&
            !!instance('main', 'warpmarker') &&
            player.position.y > 40
         ) {
            roomState.active = true;
            await renderer.when(() => game.room !== 'a_lookout' || player.position.y < 40);
            if (game.room !== 'a_lookout') {
               roomState.active = false;
               return;
            }
            game.movement = false;
            game.music?.stop();
            player.face = 'up';
            const onionB = new OutertaleMultivisualObject({}, { anchor: { x: 0, y: 1 }, active: true });
            const onionA1 = onionArm(-12, 1, 'out');
            const onionA2 = onionArm(25, -1, 'left');
            const tV = renderer.time;
            const onion = new CosmosObject({
               position: { x: 170, y: 180 },
               priority: -5,
               area: renderer.area,
               scale: 2,
               objects: [ onionB, onionA1, onionA2 ],
               filters: [ new AdvancedBloomFilter({ threshold: 0.8, bloomScale: 0.3, quality: 10, brightness: 1 }) ]
            }).on('tick', function () {
               this.offsets[0].y = sineWaver(tV, 4000, 0, 5);
            });
            onionB.use(content.ionAOnionsanKawaii);
            renderer.attach('below', onion);
            await onion.position.modulate(renderer, 3000, { y: 25 });
            await renderer.pause(1000);
            await dialogue('auto', ...text.a_aerialis.onionsan1);
            onionB.use(content.ionAOnionsanYhear);
            onionA1.position.x = -12.5;
            onionA1.position.y += 10;
            onionA1.metadata.frame = 'wave';
            onionA1.position.modulate(renderer, 750, { y: 50 });
            onionA2.position.x = 12.5;
            onionA2.position.y += 10;
            onionA2.metadata.frame = 'wave';
            onionA2.position.modulate(renderer, 750, { y: 50 });
            await dialogue('auto', ...text.a_aerialis.onionsan1a);
            await renderer.pause(1000);
            onionB.use(content.ionAOnionsanWistful);
            await renderer.pause(2000);
            await dialogue('auto', ...text.a_aerialis.onionsan2());
            onionB.use(content.ionAOnionsanKawaii);
            await dialogue('auto', ...text.a_aerialis.onionsan2a());
            await renderer.pause(1000);
            onionB.use(content.ionAOnionsanWistful);
            await dialogue('auto', ...text.a_aerialis.onionsan3);
            await renderer.pause(1000);
            onionB.use(content.ionAOnionsanYhear);
            await dialogue('auto', ...text.a_aerialis.onionsan3a());
            onionB.use(content.ionAOnionsanWistful);
            await dialogue('auto', ...text.a_aerialis.onionsan4);
            onionA1.position.x = 0;
            dialogue('auto', ...text.a_aerialis.onionsan4a);
            await onionA1.position.modulate(renderer, 750, { y: 0 });
            await onion.position.modulate(renderer, 2250, { y: 90 });
            typer.reset(true);
            await onion.position.modulate(renderer, 2250, { y: 180 });
            renderer.detach('below', onion);
            if (world.goatbro && SAVE.flag.n.ga_asrielOnion++ < 1) {
               await dialogue('auto', ...text.a_aerialis.onionsan4x);
            }
            game.movement = true;
            SAVE.data.b.onionsan = true;
            quickresume();
         }
      },
      async a_hub1 () {
         if (SAVE.data.b.svr || babyEvac(true)) {
            instance('main', 'a_heats')?.destroy();
         }
         if (SAVE.data.b.svr || teenEvac(true) || SAVE.data.b.killed_mettaton) {
            instance('main', 'a_vulkin')?.destroy();
            instance('main', 'a_pyrope')?.destroy();
         }
         if (world.genocide && SAVE.data.n.plot_approach < 3) {
            teleporter.movement = false;
            await dialogue('auto', ...text.a_aerialis.genotext.hotel2());
            SAVE.data.n.plot_approach = 3;
            game.movement = true;
         }
      },
      a_dining () {
         if (SAVE.data.n.plot === 72 || babyEvac() || SAVE.data.b.killed_mettaton) {
            instance('main', 'a_charles')?.destroy();
         }
         if (SAVE.data.b.svr || childEvac(true)) {
            instance('main', 'a_drakedad')?.destroy();
         }
         if (SAVE.data.n.plot === 72 || adultEvac() || SAVE.data.b.killed_mettaton) {
            instance('main', 'a_oni')?.destroy();
         }
         instance('main', 'a_foodreceptionist')!.object.objects[0].alpha.value = SAVE.data.b.svr || adultEvac() ? 0 : 1;
         SAVE.data.b.a_state_hotelfood && spawnFud();
      },
      a_sleeping1 () {
         instance('main', 'a_bedreceptionist')!.object.objects[0].alpha.value = SAVE.data.b.svr || adultEvac() ? 0 : 1;
      },
      async a_hub2 () {
         if (SAVE.data.b.svr || childEvac() || SAVE.data.b.killed_mettaton) {
            instance('main', 'a_slime_kid1')?.destroy();
            instance('main', 'a_slime_kid2')?.destroy();
         }
         if (SAVE.data.b.svr || teenEvac()) {
            instance('main', 'a_diamond1')?.destroy();
            instance('main', 'a_diamond2')?.destroy();
         }
         if (SAVE.data.b.svr || adultEvac() || SAVE.data.b.killed_mettaton) {
            instance('main', 'a_slime_mother')?.destroy();
            instance('main', 'a_slime_father')?.destroy();
         }
         // badass ;)
         if (
            SAVE.data.b.svr ||
            world.runaway ||
            world.genocide ||
            world.killed0 ||
            SAVE.data.b.s_state_chilldrake ||
            SAVE.data.b.ubershortcut
         ) {
            instance('main', 'a_drakemom')?.destroy();
         }
         if (SAVE.data.b.ubershortcut || SAVE.data.n.plot < 65 || SAVE.data.b.svr || world.runaway || world.genocide) {
            instance('main', 'chesstable')!.index = 1;
         }
         if (SAVE.data.n.plot < 65) {
            SAVE.data.n.plot = 66.2;
            SAVE.data.n.bad_lizard = 1;
            SAVE.data.n.state_aerialis_basebully = SAVE.data.n.bully;
            SAVE.data.n.state_aerialis_basekill = world.trueKills;
            SAVE.data.b.ubershortcut = true;
            teleporter.movement = false;
            await dialogue('auto', ...text.a_aerialis.escape);
            game.movement = true;
         }
      },
      async a_hub3 () {
         if (SAVE.data.b.svr || teenEvac() || SAVE.data.b.killed_mettaton) {
            instance('main', 'a_gyftrot')?.destroy();
            instance('main', 'a_giftbear')?.destroy();
         }
         if (SAVE.data.n.plot === 72 || adultEvac()) {
            instance('main', 'a_dragon')?.destroy();
         }
         if (world.genocide && SAVE.data.n.plot_approach < 3) {
            teleporter.movement = false;
            await dialogue('auto', ...text.a_aerialis.genotext.hotel2());
            SAVE.data.n.plot_approach = 3;
            game.movement = true;
         }
      },
      a_plaza () {
         // for correct layering
         instance('main', 'pottedtable')!.object.priority.value = 208;
         postSIGMA() && (instance('main', 'vending_machine')!.object.objects[0] as CosmosAnimation).reset();
         if (SAVE.data.b.svr || childEvac()) {
            instance('main', 'a_artgirl')?.destroy();
            instance('main', 'a_bowtie')?.destroy();
         }
         if (SAVE.data.b.svr || adultEvac(true)) {
            instance('main', 'a_thisisnotabomb')?.destroy();
         }
         if (SAVE.data.b.svr || adultEvac() || SAVE.data.b.killed_mettaton) {
            instance('main', 'ringerNPC')?.destroy();
         }
         if (SAVE.data.b.item_moonpie) {
            instance('main', 'moonpie')?.destroy();
         }
         if (!SAVE.data.b.a_state_moneyitemA || SAVE.data.b.item_tvm_radio) {
            instance('main', 'tvm_radio')?.destroy();
         }
         if (!SAVE.data.b.a_state_moneyitemB || SAVE.data.b.item_tvm_fireworks) {
            instance('main', 'tvm_fireworks')?.destroy();
         }
      },
      a_hub4 () {
         (SAVE.data.b.svr || world.runaway || !SAVE.data.b.ubershortcut) && instance('main', 'a_reg')?.destroy();
         const inst = instance('main', 's_nicecream');
         // fled from previous area(s)
         // except in the case of ultrashortcut then he just hasn't gotten here yet
         if (
            world.genocide ||
            SAVE.data.b.svr ||
            SAVE.data.n.state_starton_lesserdog === 2 ||
            epilogueOverride(world.population_area('s') < 6 || world.population_area('f') < 6) ||
            SAVE.data.b.ubershortcut
         ) {
            inst?.destroy();
            instance('below', 'xtrabarrier')?.destroy();
         } else if (inst) {
            const guyanim = inst.object.objects[0] as CosmosAnimation;
            // stayed in current area
            if (!childEvac(true) && !world.runaway) {
               guyanim.use(content.ionSNicecreamHappi);
            }
            // fled from current area
            else {
               guyanim.use(content.ionSNicecream);
               instance('below', 'xtrabarrier')?.destroy();
            }
         }
         (SAVE.data.b.svr || adultEvac(true)) && instance('main', 'a_boomer')?.destroy();
         if (2 <= SAVE.data.n.plot_date && SAVE.data.n.plot < 71.2) {
            (SAVE.data.n.plot < 68.1 || SAVE.data.b.a_state_hapstablook) &&
               temporary(
                  character('papyrus', characters.papyrus, { x: 245, y: 190 }, 'down', {
                     anchor: { x: 0, y: 1 },
                     size: { x: 20, y: 5 },
                     metadata: { barrier: true, interact: true, name: 'aerialis', args: [ 'papinter' ] }
                  }),
                  'main'
               );
            SAVE.data.n.exp <= 0 &&
               temporary(
                  character('undyneDate', characters.undyneDate, { x: 215, y: 220 }, 'down', {
                     key: 'undyne',
                     anchor: { x: 0, y: 1 },
                     size: { x: 20, y: 5 },
                     metadata: { barrier: true, interact: true, name: 'aerialis', args: [ 'undinter' ] }
                  }),
                  'main'
               );
         }
      },
      async a_hub5 (roomState) {
         if (!world.badder_lizard && SAVE.data.b.a_state_corecall && SAVE.data.n.plot < 68) {
            teleporter.movement = false;
            SAVE.data.b.a_state_corecall = false;
            await dialogue('dialoguerBottom', ...text.a_aerialis.core2b());
            await endCall('dialoguerBottom');
            game.movement = true;
         }
         if (!roomState.active) {
            roomState.active = true;
            if (!world.badder_lizard && SAVE.data.n.plot_call < 7) {
               await renderer.when(
                  () => game.room === 'a_hub5' && player.position.x < 200 && player.position.y < 200 && game.movement
               );
               SAVE.data.n.plot_call = 7;
               sounds.phone.instance(renderer);
               await dialogue('dialoguerBottom', ...text.a_aerialis.core1);
               await endCall('dialoguerBottom');
               if (SAVE.data.n.plot < 66) {
                  SAVE.data.n.plot = 66;
               }
            }
         }
      },
      async a_core_entry1 (roomState) {
         if (!world.badder_lizard && !SAVE.data.b.a_state_corecall && SAVE.data.n.plot < 68) {
            teleporter.movement = false;
            SAVE.data.b.a_state_corecall = true;
            sounds.phone.instance(renderer);
            await dialogue('dialoguerBottom', ...text.a_aerialis.core2a());
            game.movement = true;
         } else if (world.genocide && SAVE.data.n.plot_approach < 4) {
            teleporter.movement = false;
            await dialogue('auto', ...text.a_aerialis.genotext.core0());
            SAVE.data.n.plot_approach = 4;
            game.movement = true;
         }
         if (!roomState.active) {
            roomState.active = true;
            if (!world.genocide && SAVE.data.n.plot < 66.1) {
               await renderer.when(() => game.room === 'a_core_entry1' && player.position.y < 360 && game.movement);
               game.movement = false;
               player.face = 'up';
               const darkmans = new CosmosEntity({
                  position: { x: 340, y: 240 },
                  sprites: darkmansSprites,
                  face: 'down'
               });
               renderer.attach('main', darkmans);
               !world.badder_lizard && dialogue('dialoguerBottom', ...text.a_aerialis.core3);
               await darkmans.walk(renderer, 3, { y: player.position.y - 60 });
               await renderer.pause(500);
               dialogueSession.movement = false;
               typer.reset(true);
               await battler.shatter(groups.madjick);
               await battler.encounter(player, groups.madjick, false, true);
               game.movement = false;
               renderer.detach('main', darkmans);
               !world.badder_lizard && (await dialogue('dialoguerBottom', ...text.a_aerialis.core4()));
               SAVE.data.n.plot = 66.1;
               game.movement = true;
            }
         }
      },
      async a_core_entry2 (roomState) {
         world.genocide || instance('main', 'deathnote')?.destroy();
         if (SAVE.data.n.plot < 66.2) {
            const darkmans = world.genocide
               ? new CosmosEntity()
               : temporary(
                    new CosmosEntity({ position: { x: 160, y: 60 }, sprites: darkmansSprites, face: 'down' }),
                    'main'
                 );
            if (!roomState.active) {
               roomState.active = true;
               await renderer.when(
                  () =>
                     game.room === 'a_core_entry2' && player.position.y < (world.genocide ? 170 : 190) && game.movement
               );
               if (world.genocide) {
                  if (SAVE.data.n.plot_approach < 5 && SAVE.flag.n.ga_asrielCore1++ < 1) {
                     await dialogue('auto', ...text.a_aerialis.genotext.core1);
                     SAVE.data.n.plot_approach = 5;
                     SAVE.data.n.plot = 66.2;
                  }
               } else {
                  game.movement = false;
                  player.face = 'up';
                  !world.badder_lizard && dialogue('dialoguerBottom', ...text.a_aerialis.core5);
                  await darkmans.walk(renderer, 3, { y: player.position.y - 60 });
                  await renderer.pause(500);
                  dialogueSession.movement = false;
                  typer.reset(true);
                  await battler.shatter(groups.knightknight);
                  await battler.encounter(player, groups.knightknight, false, true);
                  game.movement = false;
                  renderer.detach('main', darkmans);
                  !world.badder_lizard && (await dialogue('dialoguerBottom', ...text.a_aerialis.core6()));
                  SAVE.data.n.plot = 66.2;
                  game.movement = true;
               }
            }
         }
      },
      async a_core_main (roomState, from) {
         const c = instance('below', 'CORE')!.object;
         c.priority.value = -1000;
         const COREoverlay = instance('above', 'CORE_overlay')!.object;
         COREoverlay.on('pre-render', function () {
            this.offsets[0].set(c.offsets[0]);
         });
         const c_anim = c.objects[0] as CosmosAnimation;
         (COREoverlay.objects[0] as CosmosAnimation).on('pre-render', function () {
            this.index = c_anim.index;
         });
         if (67 <= SAVE.data.n.plot) {
            instance('below', 'coredoor')?.destroy();
         }
         if (SAVE.data.n.plot === 72) {
            c_anim.extrapolate = false;
            c_anim.duration = 4;
         }
         if (SAVE.data.n.state_aerialis_corepath_puzzle === 3 && SAVE.data.n.state_aerialis_corepath_warrior === 3) {
            instance('below', 'pathbarrier')?.destroy();
            if (player.alpha.value > 0) {
               temporary(
                  new CosmosSprite({
                     anchor: { x: 0 },
                     frames: [ content.iooADrawbridge ],
                     position: { x: 260, y: 480 },
                     priority: -10
                  }),
                  'below'
               );
            }
         }
         if (!world.badder_lizard && SAVE.data.n.plot_call < 7.1) {
            teleporter.movement = false;
            SAVE.data.n.plot_call = 7.1;
            await dialogue('dialoguerBottom', ...text.a_aerialis.core7);
            game.movement = true;
         } else if (
            !world.badder_lizard &&
            !SAVE.data.b.a_state_backtracker &&
            ((SAVE.data.n.state_aerialis_corepath_state === 1 && SAVE.data.n.state_aerialis_corepath_puzzle === 2) ||
               (SAVE.data.n.state_aerialis_corepath_state === 2 && SAVE.data.n.state_aerialis_corepath_warrior === 2))
         ) {
            SAVE.data.b.a_state_backtracker = true;
            teleporter.movement = false;
            await dialogue('dialoguerBottom', ...text.a_aerialis.core8c1);
            game.movement = true;
         } else if (world.genocide && SAVE.data.n.plot_approach < 6) {
            teleporter.movement = false;
            await dialogue('auto', ...text.a_aerialis.genotext.core2());
            goatbro.metadata.override = true;
            await goatbro.walk(renderer, 3, { x: player.position.x - 21 }, { x: player.position.x - 21, y: 531 });
            await renderer.pause(1500);
            await dialogue('auto', ...text.a_aerialis.genotext.core3());
            const access = SAVE.flag.b.asriel_access;
            if (access) {
               await renderer.pause(800);
            } else {
               SAVE.flag.b.asriel_access = true;
            }
            shake(1, 500);
            sounds.pathway.instance(renderer).rate.value = 1.3;
            const drawbridge = new CosmosSprite({
               anchor: { x: 0 },
               crop: { top: -4 },
               frames: [ content.iooADrawbridge ],
               position: { x: 260, y: 480 },
               priority: -10
            });
            renderer.attach('below', drawbridge);
            const h = drawbridge.frames[0]!.value!.height;
            await new Promise<void>(resolve => {
               const ticker = () => {
                  drawbridge.crop.top -= 3;
                  if (drawbridge.crop.top <= -h) {
                     drawbridge.crop.top = -h;
                     drawbridge.off('tick', ticker);
                     resolve();
                  }
               };
               drawbridge.on('tick', ticker);
            });
            shake(1, 500);
            sounds.pathway.instance(renderer).rate.value = 1.3;
            await renderer.pause(1000);
            access || (await dialogue('auto', ...text.a_aerialis.genotext.core4a));
            renderer
               .when(() => goatbro.position.y < 460)
               .then(async () => {
                  shake(1, 500);
                  sounds.pathway.instance(renderer).rate.value = 1.3;
                  await new Promise<void>(resolve => {
                     const ticker = () => {
                        drawbridge.crop.top += 3;
                        if (-4 <= drawbridge.crop.top) {
                           drawbridge.off('tick', ticker);
                           resolve();
                        }
                     };
                     drawbridge.on('tick', ticker);
                  });
                  renderer.detach('below', drawbridge);
                  shake(1, 500);
                  sounds.pathway.instance(renderer).rate.value = 1.3;
               });
            await goatbro.walk(renderer, 3, { x: player.position.x }, { x: player.position.x, y: 440 });
            await dialogue('auto', ...text.a_aerialis.genotext.core4b());
            SAVE.data.n.plot_approach = 6;
            game.movement = true;
            while (SAVE.data.n.plot < 67) {
               await renderer.post();
               if (game.movement && player.position.y > 570 && SAVE.data.n.plot < 67) {
                  game.movement = false;
                  await dialogue('auto', ...text.a_aerialis.genotext.core5);
                  player.position.y -= 3;
                  player.face = 'up';
                  game.movement = true;
               }
            }
         }
      },
      async a_core_left1 (roomState) {
         let nooted = false;
         if (world.postnoot && SAVE.data.n.state_aerialis_corepath_puzzle < 1) {
            world.nootflags.add('a_core_left1');
            world.nootflags.add('a_core_left2');
            SAVE.data.n.state_aerialis_corepath_puzzle = 2;
            if (!SAVE.data.b.a_state_nooted1) {
               SAVE.data.b.a_state_nooted1 = true;
               nooted = true;
            }
         }
         if (!roomState.active_puzzle) {
            roomState.active_puzzle = true;
            roomState.switches = [];
            const state = SAVE.data.s.state_aerialis_a_core_left1;
            puzzler.update(roomState, state === '' ? [] : state.split(',').map(id => +id), true);
            instance('main', 'puzzleholder1')!.object.area = renderer.area!;
         }
         if (68 <= SAVE.data.n.plot) {
            return;
         }
         if (!world.badder_lizard) {
            if (SAVE.data.n.state_aerialis_corepath_state === 0) {
               SAVE.data.n.state_aerialis_corepath_state = 1;
               teleporter.movement = false;
               !nooted && (SAVE.data.b.a_state_nooted0 = true);
               await dialogue('dialoguerBottom', ...text.a_aerialis.core8a(nooted));
               game.movement = true;
            } else if (
               !SAVE.data.b.a_state_flipflopper &&
               SAVE.data.n.state_aerialis_corepath_state === 2 &&
               (nooted || SAVE.data.n.state_aerialis_corepath_puzzle < 2)
            ) {
               if (!nooted || SAVE.data.n.state_aerialis_corepath_warrior === 2) {
                  SAVE.data.b.a_state_flipflopper = true;
               }
               SAVE.data.n.state_aerialis_corepath_state = 1;
               teleporter.movement = false;
               await dialogue(
                  'dialoguerBottom',
                  ...[
                     text.a_aerialis.core9a1,
                     text.a_aerialis.core9b1,
                     text.a_aerialis.core8c2,
                     text.a_aerialis.core11
                  ][SAVE.data.n.state_aerialis_corepath_warrior](nooted)
               );
               game.movement = true;
            } else if (nooted && SAVE.data.b.a_state_nooted0) {
               teleporter.movement = false;
               SAVE.data.b.a_state_nooted0 = false;
               await dialogue('dialoguerBottom', ...text.a_aerialis.core12x);
               game.movement = true;
            }
         } else if (
            SAVE.data.n.plot > 66.2 &&
            world.genocide &&
            !goatbro.metadata.override &&
            !SAVE.data.b.a_state_asrielTimewaster
         ) {
            SAVE.data.b.a_state_asrielTimewaster = true;
            teleporter.movement = false;
            await dialogue('auto', ...text.a_aerialis.genotext.timewaster());
            game.movement = true;
         }
         if (
            !roomState.active &&
            !world.badder_lizard &&
            SAVE.data.n.state_aerialis_corepath_warrior < 2 &&
            SAVE.data.n.state_aerialis_corepath_puzzle < 1
         ) {
            roomState.active = true;
            await renderer.when(() => 68 <= SAVE.data.n.plot || SAVE.data.n.state_aerialis_corepath_puzzle === 1);
            if (68 <= SAVE.data.n.plot) {
               roomState.active = false;
               return;
            }
            SAVE.data.b.a_state_flipflopper = false;
            SAVE.data.n.state_aerialis_corepath_state = 1;
            await dialogue('dialoguerBottom', ...text.a_aerialis.core8b);
            roomState.active = false;
         }
      },
      async a_core_left2 (roomState) {
         let nooted = false;
         if (world.postnoot && SAVE.data.n.state_aerialis_corepath_puzzle < 2) {
            world.nootflags.add('a_core_left2');
            SAVE.data.n.state_aerialis_corepath_puzzle = 2;
            if (!SAVE.data.b.a_state_nooted2) {
               SAVE.data.b.a_state_nooted1 && (SAVE.data.b.a_state_nooted2 = true);
               nooted = true;
            }
         }
         if (!roomState.active_puzzle) {
            roomState.active_puzzle = true;
            roomState.switches = [];
            const state = SAVE.data.s.state_aerialis_a_core_left2;
            puzzler.update(roomState, state === '' ? [] : state.split(',').map(id => +id), true);
            instance('main', 'puzzleholder1')!.object.area = renderer.area!;
            instance('main', 'puzzleholder2')!.object.area = renderer.area!;
         }
         if (68 <= SAVE.data.n.plot) {
            return;
         }
         if (SAVE.data.b.papyrus_secret && SAVE.data.n.plot_call < 6) {
            teleporter.movement = false;
            SAVE.data.n.plot_call = 6;
            await dialogue('dialoguerBottom', ...text.a_aerialis.secretcall);
            game.movement = true;
         }
         if (
            !roomState.active &&
            !world.badder_lizard &&
            SAVE.data.n.state_aerialis_corepath_warrior < 3 &&
            SAVE.data.n.state_aerialis_corepath_puzzle < 2
         ) {
            roomState.active = true;
            await renderer.when(() => 68 <= SAVE.data.n.plot || SAVE.data.n.state_aerialis_corepath_puzzle === 2);
            if (68 <= SAVE.data.n.plot) {
               roomState.active = false;
               return;
            }
            if (SAVE.data.n.state_aerialis_corepath_warrior < 2) {
               SAVE.data.b.a_state_flipflopper = false;
               SAVE.data.n.state_aerialis_corepath_state = 1;
               await dialogue('dialoguerBottom', ...text.a_aerialis.core8c);
            } else {
               await dialogue('dialoguerBottom', ...text.a_aerialis.core8c3);
               await renderer.when(() => game.room === 'a_core_left1' && game.movement);
               if (SAVE.data.n.state_aerialis_corepath_puzzle < 3) {
                  await dialogue('dialoguerBottom', ...text.a_aerialis.core8c4);
               }
            }
            roomState.active = false;
         } else if (
            !SAVE.data.b.a_state_backtracker &&
            !world.badder_lizard &&
            SAVE.data.n.state_aerialis_corepath_warrior === 3 &&
            SAVE.data.n.state_aerialis_corepath_puzzle < 3
         ) {
            SAVE.data.b.a_state_backtracker = true;
            teleporter.movement = false;
            await dialogue('dialoguerBottom', ...text.a_aerialis.core12(nooted));
            game.movement = true;
         } else if (
            !world.badder_lizard &&
            !SAVE.data.b.a_state_nooted2 &&
            SAVE.data.n.state_aerialis_corepath_puzzle < 3
         ) {
            SAVE.data.b.a_state_nooted2 = true;
            teleporter.movement = false;
            await dialogue('dialoguerBottom', ...text.a_aerialis.core12(!SAVE.data.b.a_state_nooted1));
            game.movement = true;
         }
      },
      async a_core_left3 (roomState) {
         world.genocide || instance('main', 'deathnote')?.destroy();
         if (SAVE.data.n.state_aerialis_corepath_puzzle === 3) {
            instance('below', 'exitswitch')!.index = 1;
         } else {
            if (68 <= SAVE.data.n.plot) {
               return;
            }
            if (!roomState.active && !world.badder_lizard && SAVE.data.n.state_aerialis_corepath_puzzle < 3) {
               roomState.active = true;
               await renderer.when(() => 68 <= SAVE.data.n.plot || SAVE.data.n.state_aerialis_corepath_puzzle === 3);
               if (68 <= SAVE.data.n.plot) {
                  roomState.active = false;
                  return;
               }
               if (SAVE.data.n.state_aerialis_corepath_warrior < 3) {
                  if (SAVE.data.b.a_state_backtracker) {
                     if (SAVE.data.n.state_aerialis_corepath_state === 1) {
                        await dialogue('dialoguerBottom', ...text.a_aerialis.core10c);
                     } else {
                        await dialogue('dialoguerBottom', ...text.a_aerialis.core10b);
                     }
                  } else {
                     await dialogue('dialoguerBottom', ...text.a_aerialis.core10a);
                  }
               } else {
                  await dialogue('dialoguerBottom', ...text.a_aerialis.core13);
               }
               roomState.active = false;
            }
         }
      },
      async a_core_right1 (roomState) {
         if (68 <= SAVE.data.n.plot) {
            return;
         }
         if (!world.badder_lizard) {
            if (SAVE.data.n.state_aerialis_corepath_state === 0) {
               SAVE.data.n.state_aerialis_corepath_state = 2;
               teleporter.movement = false;
               await dialogue('dialoguerBottom', ...text.a_aerialis.core9a());
               game.movement = true;
            } else if (
               !SAVE.data.b.a_state_flipflopper &&
               SAVE.data.n.state_aerialis_corepath_state === 1 &&
               SAVE.data.n.state_aerialis_corepath_warrior < 2
            ) {
               SAVE.data.b.a_state_flipflopper = true;
               SAVE.data.n.state_aerialis_corepath_state = 2;
               teleporter.movement = false;
               await dialogue(
                  'dialoguerBottom',
                  ...[
                     text.a_aerialis.core8a1,
                     text.a_aerialis.core8b1,
                     text.a_aerialis.core8c2,
                     text.a_aerialis.core11
                  ][SAVE.data.n.state_aerialis_corepath_puzzle](false)
               );
               game.movement = true;
            }
         } else if (
            SAVE.data.n.plot > 66.2 &&
            world.genocide &&
            !goatbro.metadata.override &&
            !SAVE.data.b.a_state_asrielTimewaster
         ) {
            SAVE.data.b.a_state_asrielTimewaster = true;
            teleporter.movement = false;
            await dialogue('auto', ...text.a_aerialis.genotext.timewaster());
            game.movement = true;
         }
         if (!roomState.active && SAVE.data.n.state_aerialis_corepath_warrior < 1) {
            roomState.active = true;
            const dialogueCondition = SAVE.data.n.state_aerialis_corepath_puzzle < 2;
            await renderer.when(
               () =>
                  68 <= SAVE.data.n.plot || (game.movement && game.room === 'a_core_right1' && 160 <= player.position.x)
            );
            if (68 <= SAVE.data.n.plot) {
               roomState.active = false;
               return;
            }
            await battler.encounter(player, groups.froggitexWhimsalot, true, true);
            SAVE.data.n.state_aerialis_corepath_warrior = 1;
            if (!world.badder_lizard && (dialogueCondition || 1 <= battler.exp)) {
               SAVE.data.b.a_state_flipflopper = false;
               SAVE.data.n.state_aerialis_corepath_state = 2;
               await dialogue('dialoguerBottom', ...text.a_aerialis.core9b());
            }
            roomState.active = false;
         }
      },
      async a_core_right2 (roomState) {
         if (68 <= SAVE.data.n.plot) {
            return;
         }
         if (SAVE.data.b.papyrus_secret && SAVE.data.n.plot_call < 6) {
            teleporter.movement = false;
            SAVE.data.n.plot_call = 6;
            await dialogue('dialoguerBottom', ...text.a_aerialis.secretcall);
            game.movement = true;
         }
         if (!roomState.active && SAVE.data.n.state_aerialis_corepath_warrior < 2) {
            roomState.active = true;
            const dialogueCondition = SAVE.data.n.state_aerialis_corepath_puzzle < 3;
            await renderer.when(
               () =>
                  68 <= SAVE.data.n.plot || (game.movement && game.room === 'a_core_right2' && 160 <= player.position.x)
            );
            if (68 <= SAVE.data.n.plot) {
               roomState.active = false;
               return;
            }
            await battler.encounter(player, groups.astigmatismMigospel, true, true);
            SAVE.data.n.state_aerialis_corepath_warrior = 2;
            if (!world.badder_lizard && (dialogueCondition || 1 <= battler.exp)) {
               if (SAVE.data.n.state_aerialis_corepath_puzzle < 2) {
                  SAVE.data.b.a_state_flipflopper = false;
                  SAVE.data.n.state_aerialis_corepath_state = 2;
                  await dialogue('dialoguerBottom', ...text.a_aerialis.core9c());
               } else {
                  await dialogue('dialoguerBottom', ...text.a_aerialis.core8c3);
                  await renderer.when(() => game.room === 'a_core_right1' && game.movement);
                  if (SAVE.data.n.state_aerialis_corepath_warrior < 3) {
                     SAVE.data.b.a_state_nooted1 && (SAVE.data.b.a_state_nooted2 = true);
                     await dialogue('dialoguerBottom', ...text.a_aerialis.core8c4);
                  }
               }
            }
            roomState.active = false;
         } else if (
            !SAVE.data.b.a_state_backtracker &&
            !world.badder_lizard &&
            SAVE.data.n.state_aerialis_corepath_puzzle === 3 &&
            SAVE.data.n.state_aerialis_corepath_warrior < 3
         ) {
            SAVE.data.b.a_state_backtracker = true;
            teleporter.movement = false;
            await dialogue('dialoguerBottom', ...text.a_aerialis.core12(false));
            game.movement = true;
         }
      },
      async a_core_right3 (roomState) {
         world.genocide || instance('main', 'deathnote')?.destroy();
         if (SAVE.data.n.state_aerialis_corepath_warrior === 3) {
            instance('below', 'exitswitch')!.index = 1;
         } else {
            if (68 <= SAVE.data.n.plot) {
               return;
            }
            if (!roomState.active && !world.badder_lizard && SAVE.data.n.state_aerialis_corepath_warrior < 3) {
               roomState.active = true;
               await renderer.when(() => 68 <= SAVE.data.n.plot || SAVE.data.n.state_aerialis_corepath_warrior === 3);
               if (68 <= SAVE.data.n.plot) {
                  roomState.active = false;
                  return;
               }
               if (SAVE.data.n.state_aerialis_corepath_puzzle < 3) {
                  if (SAVE.data.b.a_state_backtracker) {
                     if (SAVE.data.n.state_aerialis_corepath_state === 2) {
                        await dialogue('dialoguerBottom', ...text.a_aerialis.core10c);
                     } else {
                        await dialogue('dialoguerBottom', ...text.a_aerialis.core10b);
                     }
                  } else {
                     await dialogue('dialoguerBottom', ...text.a_aerialis.core10a);
                  }
               } else {
                  await dialogue('dialoguerBottom', ...text.a_aerialis.core13);
               }
               roomState.active = false;
            }
         }
      },
      async a_core_bridge (roomState) {
         SAVE.data.n.plot < 67.1 || instance('main', 'mushk')?.destroy();
         world.genocide || instance('main', 'deathnote')?.destroy();
         if (!roomState.active) {
            roomState.active = true;
            if (!world.badder_lizard && SAVE.data.n.plot_call < 8) {
               await renderer.when(() => game.room === 'a_core_bridge' && player.position.x > 180 && game.movement);
               SAVE.data.n.plot_call = 8;
               await dialogue('dialoguerBottom', ...text.a_aerialis.core14());
            }
            if (SAVE.data.n.plot < 67.1) {
               await renderer.when(() => game.movement && game.room === 'a_core_bridge' && player.position.x > 360);
               game.movement = false;
               player.position.x = 360;
               game.music?.stop();
               game.music = null;
               await renderer.pause(1000);
               goatbro.face = 'right';
               const cam = new CosmosObject({ position: player.position.clamp(...renderer.region) });
               game.camera = cam;
               await cam.position.modulate(renderer, 1000, { x: 480 });
               await renderer.pause(1650);
               await dialogue('dialoguerBottom', ...text.a_aerialis.core14a);
               const mushk = instance('main', 'mushk')!;
               mushk.index = 1;
               await renderer.pause(850);
               await dialogue('dialoguerBottom', ...text.a_aerialis.core14b);
               SAVE.data.b.nk_mushketeer = true;
               await battler.encounter(player, groups.mushketeer, true, true);
               game.movement = false;
               SAVE.data.n.plot = 67.1;
               game.camera = player;
               const end = mushk.object.position.x - 21;
               player.position.x = [ player.position.x, (player.position.x + end) / 2, end ][
                  !world.killed_mushketeer ? 2 : battler.volatile[0].vars.travel ?? 0
               ];
               if (!world.killed_mushketeer) {
                  mushk.index = 0;
                  await renderer.pause(1250);
                  mushk.destroy();
                  const mushk2 = new CosmosAnimation({
                     position: mushk.object,
                     anchor: { x: 0, y: 1 },
                     resources: content.ionAMushketeerWalk,
                     active: true
                  });
                  renderer.attach('main', mushk2);
                  await mushk2.position.step(renderer, 3, { x: 630 });
                  mushk2.reset();
                  await mushk2.alpha.modulate(renderer, 300, 0);
                  renderer.detach('main', mushk2);
               } else {
                  mushk.destroy();
               }
               quickresume();
               if (!world.badder_lizard) {
                  await renderer.pause(600);
                  await dialogue('dialoguerBottom', ...text.a_aerialis.core15());
               }
               game.movement = true;
            }
         }
      },
      async a_core_checkpoint (roomState) {
         if (!roomState.active) {
            roomState.active = true;
            if (world.genocide && SAVE.flag.n.ga_asrielCore6 < 1 && SAVE.data.n.plot_approach < 7) {
               await renderer.when(() => game.room === 'a_core_checkpoint' && player.position.x > 40 && game.movement);
               SAVE.flag.n.ga_asrielCore6++;
               game.movement = false;
               SAVE.data.n.plot_approach = 7;
               await dialogue('auto', ...text.a_aerialis.genotext.core7a);
               await renderer.pause(650);
               goatbro.metadata.override = true;
               const ox = goatbro.position.x;
               await goatbro.walk(
                  renderer,
                  3,
                  { y: player.position.y > 130 ? player.position.y - 21 : player.position.y + 21 },
                  { x: 160 }
               );
               await renderer.pause(800);
               goatbro.face = 'up';
               await renderer.pause(1950);
               goatbro.face = 'left';
               await dialogue('auto', ...text.a_aerialis.genotext.core7b);
               await goatbro.walk(renderer, 3, { x: ox }, { x: ox, y: player.position.y });
               await renderer.pause(650);
               goatbro.face = 'right';
               await renderer.pause(850);
               await dialogue('auto', ...text.a_aerialis.genotext.core7c);
               goatbro.metadata.override = false;
               tracker.supplant('right');
               game.movement = true;
            }
         }
      },
      async a_core_battle (roomState) {
         world.genocide || instance('main', 'deathnote')?.destroy();
         const stageoverlay = instance('below', 'stageoverlay')!.object;
         stageoverlay.priority.value = 9999;
         if (SAVE.data.b.ubershortcut) {
            if (roomState.active || 68.1 <= SAVE.data.n.plot) {
               return;
            }
            roomState.active = true;
            await renderer.when(() => game.room === 'a_core_battle' && player.position.y < 190 && game.movement);
            game.movement = false;
            SAVE.data.n.plot = 68.1;
            const lizard = character('alphys', characters.alphys, { x: 160, y: 70 }, 'down');
            await lizard.walk(renderer, 3, { y: 120 });
            await dialogue('dialoguerBottom', ...text.a_aerialis.story.endY1);
            await renderer.pause(850);
            lizard.face = 'right';
            await renderer.pause(1250);
            lizard.face = 'down';
            await dialogue('dialoguerBottom', ...text.a_aerialis.story.endY2);
            await renderer.pause(1650);
            await dialogue('dialoguerBottom', ...text.a_aerialis.story.endY3);
            await lizard.walk(renderer, 3, { y: 0 });
            renderer.detach('main', lizard);
            game.movement = true;
            return;
         }
         const bad = world.bad_robot;
         if (SAVE.data.n.plot < 68) {
            const OW = temporary(
               new CosmosAnimation({
                  alpha: world.genocide ? 1 : 0,
                  position: { x: 160, y: 130 },
                  resources: world.genocide ? content.iocMettatonNeo : content.iocMettatonSeriouspose,
                  anchor: { x: 0, y: 1 },
                  index: world.genocide ? 0 : bad ? 10 : 32
               }),
               'main'
            );
            const ow_wings = new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               metadata: { time: 0 },
               resources: content.iocMettatonNeoWings,
               position: OW,
               priority: OW.position.y + 1
            }).on('tick', function () {
               this.tint = CosmosImageUtils.gradient(
                  0xffffff,
                  0x7f7f7f,
                  [ 0, 0.5, 1, 0.5 ][Math.floor(this.metadata.time++ / 15) % 4]
               );
            });
            world.genocide && temporary(ow_wings, 'main');
            if (!roomState.active) {
               roomState.active = true;
               await renderer.when(() => game.room !== 'a_core_battle' || (player.position.y <= 190 && game.movement));
               if (game.room !== 'a_core_battle') {
                  renderer.detach('main', OW);
                  roomState.active = false;
                  return;
               }
               player.position.y = 190;
               game.movement = false;
               SAVE.data.n.plot = 68;
               player.face = 'up';
               const overlayY = stageoverlay.position.y;
               const roomBG = rooms.of(game.room).layers.below![0];
               game.music?.stop();
               const repflag = world.genocide ? false : bad ? SAVE.flag.b.gloves : SAVE.flag.b.legs;
               if (world.genocide) {
                  groups.mettaton2.assets.load();
                  if (SAVE.flag.n.azzy_neo < 1) {
                     await dialogue('auto', ...text.a_aerialis.genotext.core8a);
                     await renderer.pause(2350);
                     await dialogue('auto', ...text.a_aerialis.genotext.core8b);
                     await renderer.pause(1150);
                     await dialogue('auto', ...text.a_aerialis.genotext.core8c);
                     await renderer.pause(1650);
                     await dialogue('auto', ...text.a_aerialis.genotext.core8d);
                     await renderer.pause(1950);
                     OW.index = 1;
                     ow_wings.priority.value = OW.position.y - 1;
                     await dialogue('auto', ...text.a_aerialis.genotext.core8e);
                  } else {
                     await dialogue('auto', ...text.a_aerialis.genotext.core8aX());
                  }
               } else {
                  bad && repflag && battler.load(groups.mettaton5);
                  const exLoader = inventories.exAssets.load();
                  const exMusicLoader = bad ? void 0 : inventories.exMusicAssets.load();
                  repflag || (await renderer.pause(850));
                  const cam = new CosmosObject({ position: player });
                  game.camera = cam;
                  if (!repflag) {
                     await cam.position.modulate(renderer, 2000, { y: 140 });
                     await renderer.pause(1400);
                  }
                  sounds.shake.instance(renderer);
                  shake(1, 400);
                  await renderer.alpha.modulate(renderer, repflag ? 1000 : 2000, 0);
                  cam.position.y = 140;
                  await renderer.pause(repflag ? 1000 : 2000);
                  renderer.alpha.value = 1;
                  const over = new CosmosSprite({ frames: [ content.iooASpotlightAlt ] });
                  renderer.attach('menu', over);
                  OW.alpha.value = 1;
                  sounds.noise.instance(renderer);
                  await renderer.pause(repflag ? 1000 : 2000);
                  const bv = -7;
                  speech.emoters.mettaton = OW;
                  if (bad) {
                     if (repflag) {
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.endX1x);
                     } else {
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.endX1);
                     }
                  } else {
                     const ms = music.mettsuspense.instance(renderer);
                     ms.gain.value /= 10;
                     ms.gain.modulate(renderer, 3000, ms.gain.value * 10);
                     await dialogue(
                        'dialoguerBottom',
                        ...text.a_aerialis.story.end1(
                           (SAVE.data.n.state_foundry_doge === 1 ? 1 : 0) +
                              (SAVE.data.n.state_foundry_muffet === 1 ? 1 : 0) +
                              (SAVE.data.n.state_starton_dogs === 2 ? 2 : 0) +
                              (SAVE.data.n.state_starton_greatdog === 2 ? 1 : 0) +
                              (SAVE.data.n.state_starton_lesserdog === 2 ? 1 : 0) +
                              (SAVE.data.n.state_starton_doggo === 2 ? 1 : 0) >
                              2
                        )
                     );
                     ms.gain.modulate(renderer, 1500, 0).then(() => {
                        ms.stop();
                     });
                  }
                  await over.alpha.modulate(renderer, 750, 0);
                  renderer.detach('menu', over);
                  const distancePlayer = player.position.y - 80;
                  const distanceNeo = OW.position.y - 80;
                  const stage = new CosmosSprite({
                     alpha: 0,
                     anchor: { x: 0 },
                     position: { x: 160, y: 80 },
                     frames: [ content.iooAStage ]
                  }).on('tick', function () {
                     this.position.y > 80 && (this.velocity.y = bv / 2);
                     player.position.y = this.position.y + distancePlayer;
                     OW.position.y = this.position.y + distanceNeo;
                  });
                  renderer.attach('below', stage);
                  sounds.appear.instance(renderer);
                  stage.alpha.modulate(renderer, 1000, 1);
                  await renderer.pause(1200);
                  if (bad) {
                     if (repflag) {
                        game.music = null;
                        renderer.detach('below', stage);
                        await battler.encounter(player, groups.mettaton5, false);
                        battler.unload(groups.mettaton5);
                     } else {
                        const loder = battler.load(groups.mettaton4);
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.endX2);
                        const lizard = character('alphys', characters.alphys, { x: 160, y: 20 }, 'down');
                        await lizard.walk(renderer, 3, { y: 90 });
                        await renderer.pause(650);
                        OW.use(content.iocMettatonAnimeChargeUpSequence);
                        OW.enable();
                        const computer = sounds.computer.instance(renderer);
                        const baseGain = computer.gain.value;
                        computer.gain.value = baseGain * 0.0625;
                        sounds.equip.instance(renderer);
                        await renderer.pause(266);
                        computer.gain.value = baseGain * 0.125;
                        sounds.equip.instance(renderer);
                        await renderer.pause(266);
                        computer.gain.value = baseGain * 0.25;
                        sounds.equip.instance(renderer);
                        await renderer.pause(266);
                        computer.gain.value = baseGain * 0.5;
                        sounds.equip.instance(renderer);
                        await renderer.pause(266);
                        computer.gain.value = baseGain;
                        sounds.equip.instance(renderer);
                        await renderer.pause(850);
                        lizard.walk(renderer, 4, { y: 20 }).then(() => {
                           renderer.detach('main', lizard);
                        });
                        const fd = fader({ fill: 0xffffff, size: 1000, anchor: 0, position: { x: 160, y: 120 } });
                        const cym = sounds.cymbal.instance(renderer);
                        cym.rate.value *= 5 / 8;
                        const mttShake = new CosmosValue();
                        function mttShakeTicker (this: CosmosObject) {
                           this.offsets[0].set(
                              (Math.random() * 2 - 1) * mttShake.value,
                              (Math.random() * 2 - 1) * mttShake.value
                           );
                        }
                        OW.on('tick', mttShakeTicker);
                        await Promise.all([
                           computer.rate.modulate(renderer, 8000, 3),
                           fd.alpha.modulate(renderer, 8000, 1),
                           renderer.shake.modulate(renderer, 8000, 4),
                           mttShake.modulate(renderer, 8000, 1)
                        ]);
                        OW.off('tick', mttShakeTicker);
                        computer.stop();
                        cym.stop();
                        fd.fill = 0;
                        renderer.shake.value = 0;
                        await Promise.all([ loder, renderer.pause(2150) ]);
                        renderer.detach('menu', fd);
                        renderer.detach('below', stage);
                        await battler.start(groups.mettaton4);
                        battler.unload(groups.mettaton4);
                     }
                     SAVE.data.n.plot = 68.1;
                  } else {
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.end2);
                     sounds.appear.instance(renderer);
                     await Promise.all([
                        exLoader,
                        exMusicLoader,
                        stage.position.modulate(renderer, 600, stage.position.subtract(0, 20))
                     ]);
                     sounds.landing.instance(renderer);
                     shake(1, 500);
                     await renderer.pause(1300);
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.end3());
                     if (!repflag) {
                        sounds.stab.instance(renderer);
                        stage.velocity.y = bv;
                        stage.gravity.y = distanceGravity(-stage.velocity.y, 120);
                        stageoverlay.position.modulate(renderer, 500, { y: overlayY }, { y: 520 });
                        renderer
                           .when(() => stage.position.y < 0)
                           .then(() => {
                              roomBG.alpha.modulate(renderer, 600, 0);
                           });
                        const speedline = new CosmosObject({ priority: -69420 })
                           .on('tick', async function () {
                              const c = Math.floor(Math.random() * 3);
                              const x = ([ 2, 18, 30 ][c] + Math.random() * [ 18, 18, 40 ][c]) / 2;
                              const s = new CosmosSprite({
                                 anchor: { x: 0 },
                                 position: { x: Math.random() < 0.5 ? x : 320 - x, y: [ -100, -70, -40 ][c] },
                                 velocity: { y: [ 26, 22, 15 ][c] },
                                 scale: { y: [ 6, 4, 3 ][c] },
                                 alpha: [ 0.9, 0.7, 0.3 ][c],
                                 frames: [ content.iooASpeedline ],
                                 tint: CosmosImageUtils.gradient(
                                    CosmosImageUtils.gradient(255, 65535, Math.random()),
                                    16777215,
                                    Math.random() / 2
                                 )
                              }).on('tick', () => {
                                 s.position.y > 240 && this.detach(s);
                              });
                              this.attach(s);
                           })
                           .on('pre-render', function () {
                              this.position.set(renderer.projection({ x: 0, y: 0 }));
                           });
                        renderer
                           .when(() => stage.velocity.y > 0)
                           .then(() => {
                              renderer.attach('main', speedline);
                           });
                        await renderer.pause(1400);
                        music.grandfinale.instance(renderer);
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.end4);
                        await renderer.pause(1000);
                        await battler.shatter(groups.mettaton1);
                        battler.garbage.push([ 'main', speedline ]);
                     }
                     battler.garbage.push([ 'below', stage ]);
                  }
               }
               if (!bad) {
                  game.music = null;
                  await battler.encounter(
                     player,
                     world.genocide ? groups.mettaton2 : repflag ? groups.mettaton3 : groups.mettaton1,
                     false,
                     void 0,
                     world.genocide || !repflag ? { x: 160, y: 160 } : void 0
                  );
               }
               world.genocide || player.position.set(160, 190);
               inventories.exAssets.unload();
               inventories.exMusicAssets.unload();
               groups.mettaton2.assets.unload();
               stageoverlay.position.y = overlayY;
               roomBG.alpha.value = 1;
               game.camera = player;
               renderer.detach('main', OW, ow_wings);
               if (!world.genocide && !bad) {
                  game.movement = false;
                  const mtt2 = new CosmosSprite({
                     anchor: { x: 0, y: 1 },
                     frames: [ content.iocMettatonBro ],
                     position: { x: 160, y: 130 },
                     objects: [
                        new CosmosHitbox({
                           anchor: { x: 0, y: 1 },
                           size: { x: 20, y: 5 },
                           metadata: { name: 'trivia', args: [ 'deadbot2' ], barrier: true, interact: true }
                        })
                     ]
                  });
                  SAVE.data.b.killed_mettaton || renderer.attach('main', mtt2);
                  const lizard = character(
                     'alphys',
                     characters.alphys,
                     { x: 160, y: !world.badder_lizard ? 360 : 0 },
                     'down'
                  );
                  if (!world.badder_lizard) {
                     await lizard.walk(renderer, 3, { y: player.position.y + 40 });
                  } else {
                     await lizard.walk(renderer, 3, { y: player.position.y - 80 });
                     await renderer.pause(2500);
                  }
                  await dialogue('dialoguerBottom', ...text.a_aerialis.story.end5());
                  if (SAVE.data.b.killed_mettaton) {
                     await renderer.pause(1500);
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.end6());
                     if (world.badder_lizard) {
                        lizard.face = 'down';
                        await lizard.position.modulate(renderer, 1000, { y: lizard.position.y - 10 });
                     } else {
                        lizard.face = 'up';
                        await lizard.position.modulate(renderer, 1000, { y: lizard.position.y + 10 });
                     }
                     await renderer.pause(1500);
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.end7());
                     lizard.preset = characters.alphysSad;
                     if (world.badder_lizard) {
                        await lizard.walk(
                           renderer,
                           3,
                           { x: player.position.x - 30 },
                           { y: player.position.y + 40 },
                           { x: player.position.x }
                        );
                     }
                     await lizard.walk(renderer, 4, { y: 360 });
                     renderer.detach('main', lizard);
                  } else {
                     if (!world.badder_lizard) {
                        await lizard.walk(
                           renderer,
                           3,
                           { x: player.position.x - 30 },
                           { x: player.position.x - 30, y: mtt2.position.y }
                        );
                        lizard.face = 'right';
                        await renderer.pause(850);
                        lizard.face = 'down';
                        await renderer.pause(1200);
                     } else {
                        await renderer.pause(800);
                        lizard.face = 'right';
                        await renderer.pause(1800);
                        lizard.face = 'down';
                        await renderer.pause(2700);
                     }
                     world.baddest_lizard && (lizard.preset = characters.alphysSad);
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.end6());
                     if (!world.badder_lizard) {
                        await lizard.walk(
                           renderer,
                           3,
                           { y: mtt2.position.y + 10 },
                           { x: player.position.x, y: mtt2.position.y + 10 },
                           player.position.subtract(0, 30)
                        );
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.end7());
                        await renderer.pause(1500);
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.end8);
                        await renderer.pause(1500);
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.end9);
                        await renderer.pause(1200);
                        await lizard.walk(
                           renderer,
                           3,
                           { x: mtt2.position.x - 30 },
                           { x: mtt2.position.x - 30, y: mtt2.position.y - 20 },
                           { x: mtt2.position.x, y: mtt2.position.y - 20 }
                        );
                     } else {
                        await renderer.pause(1200);
                     }
                     await lizard.walk(renderer, 4, { y: 0 });
                     renderer.detach('main', lizard);
                     await dialogue('dialoguerBottom', ...text.a_aerialis.story.end10());
                     if (!SAVE.data.b.oops) {
                        await dialogue('dialoguerBottom', ...text.a_aerialis.story.end11());
                     }
                  }
                  events.on('teleport').then(() => renderer.detach('main', mtt2));
                  quickresume();
               } else {
                  quickresume(true);
               }
               game.movement = true;
            }
         } else if (SAVE.data.n.plot < 68.1 && !world.genocide && !bad && !SAVE.data.b.killed_mettaton) {
            temporary(
               new CosmosSprite({
                  anchor: { x: 0, y: 1 },
                  frames: [ content.iocMettatonBro ],
                  position: { x: 160, y: 130 },
                  objects: [
                     new CosmosHitbox({
                        anchor: { x: 0, y: 1 },
                        size: { x: 20, y: 5 },
                        metadata: { name: 'trivia', args: [ 'deadbot2' ], barrier: true, interact: true }
                     })
                  ]
               }),
               'main'
            );
         }
      },
      async a_core_exit1 () {
         if (!world.genocide && !world.bad_robot && SAVE.data.n.plot < 68.1 && !SAVE.data.b.killed_mettaton) {
            SAVE.data.n.plot = 68.1;
            const di = 30;
            const lizard = character(
               'alphys',
               !world.baddest_lizard ? characters.alphys : characters.alphysSad,
               { x: 40, y: 140 },
               'down'
            );
            teleporter.movement = false;
            game.movement = false;
            await renderer.pause(1300);
            await dialogue('dialoguerBottom', ...text.a_aerialis.story.endwalk0());
            await player.walk(renderer, 3, lizard.position.add(0, di));
            await Promise.all([
               lizard.walk(renderer, 3, { x: 220 }),
               player.walk(renderer, 3, { y: 140 }, { x: 220 - di })
            ]);
            await dialogue('dialoguerBottom', ...text.a_aerialis.story.endwalk1());
            await Promise.all([ lizard.walk(renderer, 3, { x: 540 }), player.walk(renderer, 3, { x: 540 - di }) ]);
            await dialogue('dialoguerBottom', ...text.a_aerialis.story.endwalk2());
            lizard.walk(renderer, 3, { x: 620 }).then(() => lizard.alpha.modulate(renderer, 300, 0));
            await player.walk(renderer, 3, { x: 610 });
            await teleport('a_core_exit2', 'right', 20, 120, world);
            game.movement = false;
            lizard.alpha.value = 1;
            lizard.position.set({ x: 20 + di, y: 120 });
            lizard.alpha.modulate(renderer, 0, 1);
            await Promise.all([ lizard.walk(renderer, 3, { x: 160 }), player.walk(renderer, 3, { x: 160 - di }) ]);
            await dialogue('dialoguerBottom', ...text.a_aerialis.story.endwalk3());
            await Promise.all([ lizard.walk(renderer, 3, { x: 540 }), player.walk(renderer, 3, { x: 540 - di }) ]);
            world.postnoot && world.nootflags.add('alphys');
            await dialogue('dialoguerBottom', ...text.a_aerialis.story.endwalk4());
            await lizard.walk(
               renderer,
               3,
               { y: 140 },
               { x: game.camera.position.clamp(...renderer.region).x - 180, y: 140 }
            );
            renderer.detach('main', lizard);
            game.movement = true;
         }
      },
      async a_core_exit2 () {
         world.genocide || instance('main', 'deathnote')?.destroy();
      }
   } as { [k in AerialisRoomKey]?: (roomState: AerialisRS[k], from: string) => any }
};

export const aerialisScript = async (subscript: string, ...args: string[]): Promise<any> => {
   const roomState = (aerialisStates.rooms[game.room] ??= {});
   if (subscript === 'tick') {
      areaA.tickers[game.room as AerialisRoomKey]?.(roomState);
   } else {
      areaA.scripts[subscript]?.(roomState, (aerialisStates.scripts[subscript] ??= {}), ...args);
   }
};

events.on('consume', key => {
   if (key === 'trash') {
      const value = 1 + Math.floor(rng.battle.next() ** 7 * 99);
      items.of(key).value = value;
      typer.variables.x = value.toString();
   }
});

events.on('script', (name, ...args) => {
   switch (name) {
      case 'shop':
         switch (args[0]) {
            case 'bpants':
               if (SAVE.data.b.svr) {
                  dialogue('auto', ...text.a_aerialis.shopclosed).then(() => {
                     player.position.y += 3;
                     player.face = 'down';
                  });
                  return;
               }
               shopper.open(shops.bpants, args[1] as CosmosDirection, +args[2], +args[3], !world.runaway);
               if (world.genocide && !SAVE.flag.b.asriel_bpants) {
                  SAVE.flag.b.asriel_bpants = true;
                  renderer
                     .when(() => atlas.target === null && game.movement)
                     .then(() => dialogue('auto', ...text.a_aerialis.genotext.azzyBpants));
               }
               break;
            case 'gossip':
               if (SAVE.data.b.svr) {
                  dialogue('auto', ...text.a_aerialis.shopclosed).then(() => {
                     player.position.y += 3;
                     player.face = 'down';
                  });
                  return;
               }
               shopper.open(
                  shops.gossip,
                  args[1] as CosmosDirection,
                  +args[2],
                  +args[3],
                  !adultEvac(true) && !world.runaway
               );
               break;
         }
         break;
      case 'aerialis':
         aerialisScript(args[0], ...args.slice(1));
         break;
      case 'trivia':
         if (game.movement && game.room[0] === 'a') {
            trivia(...CosmosUtils.provide(text.a_aerialis.trivia[args[0] as keyof typeof text.a_aerialis.trivia]));
         }
         break;
   }
});

events.on('step', () => {
   if (game.movement && SAVE.data.n.plot < 65 && game.room[0] === 'a') {
      switch (game.room) {
         case 'a_path1':
         case 'a_path2':
         case 'a_path3':
         case 'a_rg1':
         case 'a_barricade1':
         case 'a_path4':
         case 'a_puzzle1':
         case 'a_elevator1':
         case 'a_elevator2':
         case 'a_sans':
         case 'a_pacing':
         case 'a_prepuzzle':
         case 'a_puzzle2':
         case 'a_rg2':
         case 'a_barricade2':
         case 'a_split':
         case 'a_offshoot1':
         case 'a_elevator3':
            const enc = runEncounter(
               (SAVE.data.n.kills_aerialis + SAVE.data.n.bully_aerialis) / world.popmax(2),
               (() => {
                  switch (game.room) {
                     case 'a_rg1':
                        return SAVE.data.n.plot < 51 ? 0 : 1;
                     case 'a_puzzle1':
                        return SAVE.data.n.plot < 55 ? 0 : 1;
                     case 'a_puzzle2':
                        return SAVE.data.n.plot < 59 ? 0 : 1;
                     case 'a_sans':
                        return instance('main', 'sentryskeleton') ? 0 : 1;
                     case 'a_rg2':
                        return SAVE.data.n.plot < 61 ? 0 : 1;
                     case 'a_split':
                        return SAVE.data.b.a_state_hapstablook && SAVE.data.n.plot < 63 ? 0 : 1;
                     case 'a_elevator3':
                        return SAVE.data.n.plot < 64 ? 0 : 1;
                  }
                  return 1;
               })(),
               [
                  [ groups.pyrope, 4 ],
                  [ groups.tsundere, 4 ],
                  [ groups.spacetopTsundere, 4 ],
                  [ groups.pyropeTsundere, 5 ],
                  [ groups.perigee, 5 ]
               ]
            );
            enc && enc.then(() => updateBadLizard());
            return !!enc;
         default:
            SAVE.data.n.steps = 0;
            SAVE.data.n.encounters = 0;
            break;
      }
   }
});

events.on('tick', () => {
   game.movement && game.room[0] === 'a' && aerialisScript('tick');
});

events.on('init-overworld').then(() => {
   events.on('teleport').then(() => {
      if (game.room in spireRooms) {
         renderer.attach('base', aurora);
         renderer.attach('below', spire);
      }
   });
});

events.on('teleport', (from, to) => {
   if (to in spireRooms) {
      renderer.attach('base', aurora);
      renderer.attach('below', spire);
   }
   const roomState = (aerialisStates.rooms[to] ??= {});
   genCB();
   const minRF = 0.01;
   for (const { object } of instances('main', 'starflower')) {
      if (!object.metadata.active) {
         object.metadata.active = true;
         const spr = object.objects.find(sub => sub instanceof CosmosSprite) as CosmosSprite | void;
         if (spr !== void 0) {
            const size = spr.compute();
            const graphics = new Graphics();
            graphics.x = size.x * ((spr.anchor.x + 1) / -2);
            graphics.y = size.y * ((spr.anchor.y + 1) / -2);
            const particles = [] as [number, number, number, number, number, number, number][];
            const step = (t = 0) => {
               if (t === 0) {
                  graphics.clear();
                  for (const particle of particles.slice()) {
                     graphics
                        .beginFill(particle[6], particle[2])
                        .drawRect(particle[0] - 0.5, particle[1] - 0.5, 1, 1)
                        .endFill();
                     particle[2] -= particle[5];
                     if (particle[2] > 0) {
                        particle[0] += particle[3];
                        particle[1] += particle[4];
                     } else {
                        particles.splice(particles.indexOf(particle), 1);
                     }
                  }
               }
               if (Math.random() < 1 / 2) {
                  let x = Math.random() * size.x;
                  let y = Math.random() * size.y;
                  const c = flowersampler[Math.floor(x) * size.y + Math.floor(y)];
                  if (c !== 0) {
                     let a = 0.8;
                     const vx = Math.random() - 0.5;
                     const vy = (0.5 + Math.random() * 0.75) * -1;
                     const va = (minRF + Math.random() * 0.02) * 0.8;
                     while (t > 0) {
                        x += vx;
                        y += vy;
                        a -= va;
                        t--;
                     }
                     particles.push([ x, y, a, vx, vy, va, c ]);
                  }
               }
            };
            let sim = Math.floor(1 / minRF);
            while (sim > 0) {
               step(sim--);
            }
            spr.on('tick', step);
            spr.container.addChild(graphics);
         }
      }
   }
   for (const inst of [ ...instances('below', 'darkable'), ...instances('main', 'darkable') ]) {
      inst.object.tint = world.genocide || SAVE.data.b.svr || postSIGMA() ? 0x999999 : 0xffffff;
   }
   const inst = instance('below', 'riverboi_x');
   if (inst) {
      if (
         SAVE.data.b.svr ||
         SAVE.data.n.plot === 71.2 ||
         (SAVE.data.n.plot < 65 && (world.trueKills < 30 || SAVE.data.n.plot !== 47.1)) ||
         world.genocide ||
         (game.room === 'a_lookout' &&
            !SAVE.data.b.onionsan &&
            SAVE.data.n.plot < 68.1 &&
            !!instance('main', 'warpmarker'))
      ) {
         inst.destroy();
      } else {
         instance('below', 'taxibarrier')?.destroy();
         inst.object.priority.value = -1000;
         inst.object.metadata.taxitop = temporary(
            new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iooTaxiOverlay }).on('tick', function () {
               this.index = (inst.object.objects[0] as CosmosSprite).index;
               this.position.set(inst.object);
            }),
            'main'
         );
      }
   }
   areaA.teleports[to as AerialisRoomKey]?.(roomState, from);
});

events.on('teleport-start', (from, to) => {
   if (to === 'a_lift' || to === 'a_citadelevator') {
      from === '_void' || (rooms.of(to).neighbors = [ from ]);
   } else if (to === 'a_auditorium' && SAVE.data.n.plot < 65 && world.badder_lizard) {
      SAVE.data.n.plot = 64.1;
      game.music?.gain.modulate(renderer, 300, 0).then(() => game.music?.stop());
      game.movement = false;
      events.on('teleport').then(() => {
         operaShow(world.genocide ? goatbro : new CosmosCharacter({ preset: characters.none, key: 'amogus' }));
      });
   } else if (to === 'a_sans' && SAVE.data.n.plot <= 56 && !world.edgy_xxx && !world.dead_skeleton) {
      const rum = rooms.of('a_sans');
      rum.score.music = 'muscle';
      events.on('teleport-start').then(async () => {
         await events.on('teleport');
         rum.score.music = 'aerialis';
      });
   }
});

events.on('pre-consume', key => {
   switch (key) {
      case 'legendary_hero':
      case 'legendary_hero_x': {
         battler.active && (items.of(key).type = 'special');
         break;
      }
   }
});

events.on('post-use', key => {
   switch (key) {
      case 'legendary_hero':
      case 'legendary_hero_x': {
         battler.active && (items.of(key).type = 'consumable');
         break;
      }
   }
});

events.on('use', async (key, index) => {
   switch (key) {
      case 'filament':
         saver.add('filament_use1');
         break;
      case 'filament_use1':
         saver.add('filament_use2');
         break;
      case 'filament_use2':
         saver.add('filament_use3');
         break;
      case 'filament_use3':
         saver.add('filament_use4');
         break;
      case 'orange_soda':
         battler.active && world.meanie && (battler.at += 8 + battler.at_bonus);
         break;
      case 'legendary_hero':
      case 'legendary_hero_x':
         if (battler.active) {
            battler.stat.monsteratk.modifiers.push([ 'add', key === 'legendary_hero' ? -1 : 1, 1 ]);
            SAVE.storage.inventory.remove(index);
            battler.hpboost.direct += items.of(key).value;
         }
         break;
      case 'old_gun':
      case 'old_bomb':
      case 'old_spray':
         if (battler.active) {
            const bat = atlas.navigators.of('battlerAdvancedTarget');
            bat.setpos();
            atlas.switch('battlerAdvancedTarget');
            battler.SOUL.alpha.value = 1;
            const [ to ] = await bat.on('to');
            atlas.attach(renderer, 'menu', 'battlerAdvancedText');
            if (to === null) {
               events.fire('select');
               battler.SOUL.alpha.value = 0;
               battler.targetOverride = bat.selection();
               await dialogue('battlerAdvancedText', ...text.b_use[key]());
               atlas.detach(renderer, 'menu', 'battlerAdvancedText');
            } else {
               battler.noItemChoice = true;
            }
         }
         break;
   }
});

renderer.on('tick', () => {
   if (renderer.layers.below.active && game.room[0] === 'a' && game.room.startsWith('a_core')) {
      const roomState = (aerialisStates.rooms[game.room] ??= {});
      roomState.hexfloor ??= [
         ...new Set(
            ((instance('below', 'hexfloor')?.object.objects ?? []) as CosmosHitbox[]).flatMap(hitbox => {
               const size = hitbox.size.value();
               const position = hitbox.position.value();
               if (size.x < 0) {
                  size.x *= -1;
                  position.x -= size.x;
               }
               if (size.y < 0) {
                  size.y *= -1;
                  position.y -= size.y;
               }
               return CosmosUtils.populate(size.x / 20, x =>
                  CosmosUtils.populate(size.y / 20, y => `${position.x + x * 20}:${position.y + y * 20}`)
               ).flat();
            })
         )
      ].map(key => ({ x: +key.split(':')[0], y: +key.split(':')[1] }));
      if (roomState.hexfloor.length > 0 && hex.dtime <= renderer.time) {
         const parent = instance('below', 'hexfloor')?.object;
         if (!parent) {
            return;
         }
         if (!parent.metadata.active) {
            parent.metadata.active = true;
            events.on('teleport-update').then(() => {
               parent.metadata.active = false;
               parent.objects = [];
               hex.dtime = -Infinity;
            });
         }
         const direction = Math.floor(Math.random() * 3);
         const reverse = Math.random() < 0.5 ? false : true;
         let path = hex.paths[direction];
         hex.dtime = renderer.time + hex.delay.baseRate / (roomState.hexfloor.length / hex.delay.baseTile);
         parent.attach(
            new CosmosAnimation({
               alpha: 1 / hex.fader,
               index: hex.sets[direction][Math.floor(Math.random() * 8)],
               metadata: { tick: 1 },
               priority: 2,
               resources: content.iooAFloorsegment,
               position: new CosmosPoint(
                  roomState.hexfloor[Math.floor(Math.random() * roomState.hexfloor.length)] as CosmosPointSimple
               ).add(0, Math.random() < 0.5 ? 0 : 10),
               tint: hex.tint
            }).on('render', async function () {
               let rounds = 0;
               while (rounds++ < 2) {
                  if (Math.random() < 0.33) {
                     const otherdir = (direction + Math.floor(Math.random() * 2)) % 3;
                     if (hex.paths[otherdir].includes(this.index)) {
                        path = hex.paths[otherdir];
                     }
                  }
                  const position = reverse ? path.lastIndexOf(this.index) - 1 : path.indexOf(this.index) + 1;
                  const target = path[position];
                  if (typeof target === 'number') {
                     this.index = target;
                  } else {
                     const targetPosition = this.position[reverse ? 'subtract' : 'add'](target);
                     if (hex.valid(roomState.hexfloor, targetPosition)) {
                        this.position.set(targetPosition);
                        this.index = path[reverse ? position - 1 : position + 1] as number;
                     } else {
                        this.alpha.value = 0;
                        parent.objects.splice(parent.objects.indexOf(this), 1);
                        return;
                     }
                  }
                  parent.attach(
                     new CosmosAnimation({
                        alpha: this.alpha.value,
                        index: this.index,
                        position: this.position.value(),
                        priority: 1,
                        resources: content.iooAFloorsegment,
                        tint: hex.tint
                     }).on('tick', function () {
                        if ((this.alpha.value *= 0.8) < 0.04) {
                           parent.detach(this);
                        }
                     })
                  );
                  this.alpha.value = Math.min(++this.metadata.tick / hex.fader, 1);
                  rounds < 2 && (await renderer.pause(100 / 6));
               }
            })
         );
      }
   }
});

typer.on('header', h => {
   const seg = h.split('/');
   switch (seg[0]) {
      case 'a.la':
         battler.volatile[1].container.objects[0].metadata.leftArmIndex = +seg[1];
         break;
      case 'a.ra':
         battler.volatile[1].container.objects[0].metadata.rightArmIndex = +seg[1];
         break;
      case 'a.radiostart':
         if (SAVE.data.n.plot === 72) {
            music.uwa.stop();
            music.reunited.stop();
         } else {
            game.music?.stop();
            musicFilter.value = 0;
            musicConvolver.value = 0;
         }
         sounds.equip.instance(renderer).rate.value = 1.8;
         music.radiosong.instance(renderer);
         break;
      case 'a.radiostop':
         music.radiosong.stop();
         sounds.equip.instance(renderer).rate.value = 1.8;
         if (SAVE.data.n.plot === 72) {
            epilogue();
         } else {
            quickresume();
         }
         break;
      case 'd.sys':
         SAVE.data.n.time_delta_add = 100;
         break;
      case 'd.sysx':
         SAVE.data.n.time_delta_add = 200;
         break;
   }
});

const shops = {
   bpants: new OutertaleShop({
      background: new CosmosSprite({ frames: [ content.isBpantsBackground ] }),
      async handler () {
         if (atlas.target === 'shop') {
            if (shopper.index === 1) {
               if (world.genocide || world.killed0 || burger()) {
                  if (SAVE.data.b.a_state_freesell) {
                     await shopper.text(...text.n_shop_bpants.sell2());
                  } else {
                     await shopper.text(...text.n_shop_bpants.sell1());
                     if (SAVE.storage.inventory.size < 8) {
                        saver.add('demise');
                        SAVE.data.b.a_state_freesell = true;
                     }
                  }
               } else if (shops.bpants.vars.sell || SAVE.data.b.steal_bpants) {
                  await shopper.text(...text.n_shop_bpants.sell2());
               } else {
                  shops.bpants.vars.sell = true;
                  if (world.runaway) {
                     saver.gold += 2048;
                     SAVE.data.b.steal_bpants = true;
                  }
                  await shopper.text(...text.n_shop_bpants.sell1());
               }
            } else if (shopper.index === 3) {
               if (!world.runaway) {
                  atlas.switch('shopText');
                  await dialogue_primitive(...text.n_shop_bpants.exit());
               } else {
                  game.text = '';
                  atlas.switch('shopText');
               }
               const mus = shops.bpants.music?.instances.slice(-1)[0];
               await Promise.all([
                  renderer.alpha.modulate(renderer, 300, 0),
                  mus?.gain.modulate(renderer, 300, 0).then(() => {
                     mus.stop();
                  })
               ]);
               atlas.switch(null);
               renderer.alpha.modulate(renderer, 300, 1);
            } else if (world.runaway && shopper.index === 2) {
               await shopper.text(...text.n_shop_bpants.note);
            } else {
               atlas.switch('shopList');
            }
         } else if (atlas.target === 'shopList') {
            if (shopper.listIndex === 4) {
               atlas.switch('shop');
            } else if (shopper.index === 0) {
               if (shopper.listIndex === 3 && SAVE.data.b.item_face_steak) {
                  dialogue_primitive(text.n_shop_bpants.itemUnavailable());
               } else {
                  atlas.switch('shopPurchase');
               }
            } else {
               await shopper.text(...text.n_shop_bpants.talkText[shopper.listIndex]());
            }
         }
      },
      keeper: new CosmosAnimation({
         anchor: { x: 0, y: 1 },
         position: { x: 160, y: 120 },
         resources: content.isBpantsKeeper,
         objects: [
            new CosmosSprite({
               anchor: { x: 0, y: 1 },
               alpha: 0,
               frames: [ content.isBpantsArms ],
               position: { x: -48, y: 2 }
            }).on('tick', function () {
               this.offsets[0].set(
                  (Math.random() * 0.6 - Math.random() * 0.6) * 1.1,
                  (Math.random() * 0.6 - Math.random() * 0.6) * 1.1
               );
            }),
            new CosmosAnimation({
               anchor: 1,
               alpha: 0,
               active: true,
               resources: content.isBpantsCloud,
               position: { x: -31, y: -41 }
            })
         ]
      }).on('tick', function () {
         this.objects[0].alpha.value = [ 3 ].includes(this.index) ? 1 : 0;
         this.objects[1].alpha.value = this.index === 6 ? 1 : 0;
      }),
      music: music.shop,
      options () {
         if (atlas.target === 'shop') {
            return text.n_shop_bpants.menu();
         } else if (shopper.index === 0) {
            return text.n_shop_bpants.item();
         } else {
            return text.n_shop_bpants.talk();
         }
      },
      preset (index) {
         shops.bpants.keeper.index = index;
      },
      price () {
         return SAVE.data.n.plot === 72
            ? [ 5, 10, 5, 49 ][shopper.listIndex]
            : [ 16, 30, 24, 69 ][shopper.listIndex] * (world.killed0 || burger() ? 2 : 1);
      },
      prompt () {
         return text.n_shop_bpants.itemPurchasePrompt();
      },
      purchase (buy) {
         let success = false;
         if (buy) {
            if (SAVE.storage.inventory.size < 8) {
               if (world.runaway) {
                  success = true;
               } else if (world.genocide) {
                  shops.bpants.vars.purchase = 1;
                  saver.gold = Math.max(saver.gold - CosmosUtils.provide(shops.bpants.price), 0);
                  success = true;
               } else {
                  const price = CosmosUtils.provide(shops.bpants.price);
                  if (saver.gold < price) {
                     shops.bpants.vars.purchase = 3;
                  } else {
                     shops.bpants.vars.purchase = 1;
                     saver.gold -= price;
                     success = true;
                  }
               }
            } else {
               shops.bpants.vars.purchase = 4;
            }
         } else if (!world.badder_lizard) {
            shops.bpants.vars.purchase = 2;
         }
         if (success) {
            world.runaway ? sounds.grab.instance(renderer) : sounds.purchase.instance(renderer);
            const item = [ 'starfait', 'legendary_hero', 'glamburger', 'face_steak' ][shopper.listIndex];
            if (world.genocide || world.killed0 || burger()) {
               saver.add(`${item}_x`);
            } else {
               saver.add(item);
            }
            item === 'face_steak' && (SAVE.data.b.item_face_steak = true);
         }
      },
      size () {
         if (atlas.target === 'shop') {
            return 4;
         } else {
            return 5;
         }
      },
      status () {
         if (shops.bpants.vars.purchase || 0 > 0) {
            const purchaseValue = shops.bpants.vars.purchase as number;
            shops.bpants.vars.purchase = 0;
            if (world.runaway && purchaseValue < 4) {
               return text.n_shop_bpants.zeroPrompt;
            } else {
               return text.n_shop_bpants.itemPurchase()[purchaseValue - 1];
            }
         } else if (atlas.target === 'shop') {
            if (world.runaway) {
               return text.n_shop_bpants.menuPrompt3;
            } else if (shops.bpants.vars.idle) {
               return text.n_shop_bpants.menuPrompt2();
            } else {
               shops.bpants.vars.idle = true;
               return text.n_shop_bpants.menuPrompt1();
            }
         } else if (world.runaway) {
            return text.n_shop_bpants.zeroPrompt;
         } else if (shopper.index === 0) {
            return text.n_shop_bpants.itemPrompt();
         } else {
            return text.n_shop_bpants.talkPrompt();
         }
      },
      tooltip () {
         if ([ 'shopList', 'shopPurchase' ].includes(atlas.target!) && shopper.index === 0) {
            if (shopper.listIndex === 4) {
               return null;
            } else {
               if (shopper.listIndex === 3 && SAVE.data.b.item_face_steak) {
                  return null;
               }
               return text.n_shop_bpants.itemInfo()[shopper.listIndex];
            }
         } else {
            return null;
         }
      },
      vars: {}
   }),
   gossip: new OutertaleShop({
      background: new CosmosSprite({ frames: [ content.isGossipBackground ] }),
      async handler () {
         if (atlas.target === 'shop') {
            if (shopper.index === 1) {
               if (shops.gossip.vars.sell || SAVE.data.b.steal_gossip) {
                  await gossiper.dialogue(...text.n_shop_gossip.sell2());
               } else {
                  shops.gossip.vars.sell = true;
                  if (adultEvac(true)) {
                     saver.gold += 5;
                     SAVE.data.b.steal_gossip = true;
                  }
                  await gossiper.dialogue(...text.n_shop_gossip.sell1());
               }
            } else if (shopper.index === 3) {
               if (!adultEvac(true)) {
                  atlas.switch(!world.badder_lizard ? 'shopTextGossip' : 'shopText');
                  await gossiper.dialogue(...text.n_shop_gossip.exit);
               } else {
                  game.text = gossiper.text1 = gossiper.text2 = '';
                  atlas.switch(!world.badder_lizard ? 'shopTextGossip' : 'shopText');
               }
               const mus = shops.gossip.music?.instances.slice(-1)[0];
               await Promise.all([
                  renderer.alpha.modulate(renderer, 300, 0),
                  mus?.gain.modulate(renderer, 300, 0).then(() => {
                     mus.stop();
                  })
               ]);
               atlas.switch(null);
               renderer.alpha.modulate(renderer, 300, 1);
            } else if (adultEvac(true) && shopper.index === 2) {
               await gossiper.dialogue(...text.n_shop_gossip.note());
               if (world.genocide && !SAVE.flag.b.asriel_electrics && SAVE.flag.n.genocide_milestone < 5) {
                  SAVE.flag.b.asriel_electrics = true;
                  await renderer.when(() => atlas.target === null && game.movement);
                  await dialogue('auto', ...text.a_aerialis.genotext.hotelElectrics);
               }
            } else {
               atlas.switch('shopList');
            }
         } else if (atlas.target === 'shopList') {
            if (shopper.listIndex === 4) {
               atlas.switch('shop');
            } else if (shopper.index === 0) {
               if (SAVE.data.b.item_mystery_key && shopper.listIndex === 3) {
                  dialogue_primitive(text.n_shop_gossip.itemUnavailable());
               } else {
                  atlas.switch('shopPurchase');
               }
            } else {
               await gossiper.dialogue(...text.n_shop_gossip.talkText[shopper.listIndex]());
            }
         }
      },
      keeper: new CosmosSprite({
         objects: [
            new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               metadata: { angle3: 0, time5: null as number | null },
               resources: content.isGossipKeeper2,
               position: { x: 60, y: 130 },
               objects: [
                  new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.isGossipArm2 ] }),
                  new CosmosSprite({
                     anchor: { x: 0, y: 1 },
                     scale: { x: -1 },
                     frames: [ content.isGossipArm2 ]
                  })
               ]
            }).on('tick', function () {
               const [ arm1, arm2 ] = this.objects as CosmosSprite[];
               if (this.index === 3) {
                  (this.metadata.angle3 -= 12) < 0 && (this.metadata.angle3 += 360);
               } else {
                  this.metadata.angle3 = 0;
               }
               if (this.index === 5) {
                  this.metadata.time5 ??= renderer.time;
                  this.offsets[0].y = sineWaver(this.metadata.time5, 250, -2, 1);
                  arm1.alpha.value = 0;
                  arm2.offsets[0].y = sineWaver(this.metadata.time5, 250, 2.5, -1.5, 0.15);
               } else {
                  this.metadata.time5 = null;
                  this.offsets[0].y = 0;
                  arm1.alpha.value = 1;
                  arm2.offsets[0].y = 0;
               }
               switch (this.index) {
                  case 0:
                  case 1:
                  case 4:
                  case 7:
                     arm1.position.set({ x: -17, y: 67 });
                     arm2.position.set({ x: -3, y: 64 });
                     break;
                  case 2:
                     arm1.position.set({ x: -17, y: 57 });
                     arm2.position.set({ x: -3, y: 54 });
                     break;
                  case 3:
                     arm1.position.set(new CosmosPoint({ x: -17, y: 49 }).endpoint(this.metadata.angle3, 2));
                     arm2.position.set(new CosmosPoint({ x: -3, y: 46 }).endpoint(this.metadata.angle3, 2));
                     break;
                  case 5:
                     arm2.position.set({ x: 42, y: 18 });
                     break;
               }
            }),
            new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.isGossipKeeper1,
               metadata: {
                  angle1: 0,
                  angle2: 0,
                  angle9: 0,
                  time7: null as number | null,
                  time8: null as number | null
               },
               position: { x: 160, y: 130 },
               objects: [
                  new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.isGossipArm1 }),
                  new CosmosAnimation({
                     anchor: { x: 0, y: 1 },
                     scale: { x: -1 },
                     resources: content.isGossipArm1
                  })
               ]
            }).on('tick', function () {
               const [ arm1, arm2 ] = this.objects as CosmosAnimation[];
               if (this.index === 1) {
                  (this.metadata.angle1 -= 12) < 0 && (this.metadata.angle1 += 360);
               } else {
                  this.metadata.angle1 = 0;
               }
               if (this.index === 2) {
                  (this.metadata.angle2 -= 24) < 0 && (this.metadata.angle2 += 360);
               } else {
                  this.metadata.angle2 = 0;
               }
               if (this.index === 7) {
                  this.metadata.time7 ??= renderer.time;
                  this.offsets[0].x = sineWaver(this.metadata.time7, 600, 2, -2);
                  const x = sineWaver(this.metadata.time7, 600, -8, 8, 0.05);
                  const y = (1 - Math.abs(x) / 8) * -3;
                  arm1.offsets[0].set(x, y);
                  arm2.offsets[0].set(x, y);
               } else {
                  this.metadata.time7 = null;
                  this.offsets[0].x = 0;
                  arm1.offsets[0].set(0, 0);
                  arm2.offsets[0].set(0, 0);
               }
               if (this.index === 8) {
                  this.metadata.time8 ??= renderer.time;
                  this.offsets[1].y = sineWaver(this.metadata.time8, 250, -2, 1);
                  const y = sineWaver(this.metadata.time8, 250, 2.5, -1.5, 0.15);
                  arm1.offsets[1].y = y;
                  arm2.offsets[1].y = y;
               } else {
                  this.metadata.time8 = null;
                  this.offsets[1].y = 0;
                  arm1.offsets[1].y = 0;
                  arm2.offsets[1].y = 0;
               }
               if (this.index === 9) {
                  (this.metadata.angle9 -= 12) < 0 && (this.metadata.angle9 += 360);
               } else {
                  this.metadata.angle9 = 0;
               }
               switch (this.index) {
                  case 0:
                  case 3:
                  case 5:
                  case 6:
                     arm1.alpha.value = 0;
                     arm2.alpha.value = 0;
                     break;
                  case 1:
                  case 7:
                  case 8:
                  case 9:
                     arm1.alpha.value = 1;
                     arm2.alpha.value = 1;
                     break;
                  case 2:
                  case 4:
                     arm1.alpha.value = 1;
                     arm2.alpha.value = 0;
                     break;
               }
               switch (this.index) {
                  case 1:
                     arm1.index = 2;
                     arm1.position.set(new CosmosPoint({ x: 9, y: 20 }).endpoint(this.metadata.angle1, 3));
                     arm2.index = 2;
                     arm2.position.set(new CosmosPoint({ x: -10, y: 14 }).endpoint(this.metadata.angle1, 3));
                     break;
                  case 2:
                     arm1.index = 2;
                     arm1.position.set(new CosmosPoint({ x: 22, y: 12 }).endpoint(this.metadata.angle2, 4));
                     break;
                  case 4:
                     arm1.index = 1;
                     arm1.position.set({ x: 7, y: 12 });
                     break;
                  case 7:
                     arm1.index = 1;
                     arm1.position.set({ x: 23, y: 16 });
                     arm2.index = 1;
                     arm2.position.set({ x: -23, y: 16 });
                     break;
                  case 8:
                     arm1.index = 1;
                     arm1.position.set({ x: 21, y: 16 });
                     arm2.index = 1;
                     arm2.position.set({ x: -21, y: 16 });
                     break;
                  case 9:
                     arm1.index = 0;
                     arm1.position.set(new CosmosPoint({ x: 25, y: 16 }).endpoint(this.metadata.angle9, 1.5));
                     arm2.index = 0;
                     arm2.position.set(new CosmosPoint({ x: -25, y: 16 }).endpoint(this.metadata.angle9, 1.5));
                     break;
               }
            })
         ]
      }),
      music: music.thriftShop,
      options () {
         if (atlas.target === 'shop') {
            return text.n_shop_gossip.menu();
         } else if (shopper.index === 0) {
            return text.n_shop_gossip.item();
         } else {
            return text.n_shop_gossip.talk();
         }
      },
      preset (index1 = 0, index2 = 0, index3 = -1) {
         index1 > -1 && ((shops.gossip.keeper.objects[0] as CosmosAnimation).index = index1);
         index2 > -1 && ((shops.gossip.keeper.objects[1] as CosmosAnimation).index = index2);
         const daemon = SAVE.data.n.plot === 72 ? music.reunited : music.thriftShop;
         index3 > -1 && (daemon.instances[0].gain.value = daemon.gain * index3);
      },
      price () {
         return [ 5, SAVE.data.b.item_laser ? 60 : 70, SAVE.data.b.item_visor ? 60 : 70, 400 ][shopper.listIndex];
      },
      prompt () {
         return text.n_shop_gossip.itemPurchasePrompt();
      },
      purchase (buy) {
         let success = false;
         if (buy) {
            if (SAVE.storage.inventory.size < 8 || shopper.listIndex === 3) {
               if (adultEvac(true)) {
                  success = true;
               } else {
                  const price = CosmosUtils.provide(shops.gossip.price);
                  if (saver.gold < price) {
                     shops.gossip.vars.purchase = 3;
                  } else {
                     shops.gossip.vars.purchase = 1;
                     saver.gold -= price;
                     success = true;
                  }
               }
            } else {
               shops.gossip.vars.purchase = 4;
            }
         } else if (!world.badder_lizard) {
            shops.gossip.vars.purchase = 2;
         }
         if (success) {
            adultEvac(true) ? sounds.grab.instance(renderer) : sounds.purchase.instance(renderer);
            const item = [
               'trash',
               SAVE.data.b.item_laser ? 'laser_x' : 'laser',
               SAVE.data.b.item_visor ? 'visor_x' : 'visor',
               'mystery_key'
            ][shopper.listIndex];
            shopper.listIndex < 3 && saver.add(item);
            if (item === 'laser' || item === 'visor' || item === 'mystery_key') {
               SAVE.data.b[`item_${item}`] = true;
            }
         }
      },
      size () {
         if (atlas.target === 'shop') {
            return 4;
         } else {
            return 5;
         }
      },
      status () {
         if (shops.gossip.vars.purchase || 0 > 0) {
            const purchaseValue = shops.gossip.vars.purchase as number;
            shops.gossip.vars.purchase = 0;
            if (adultEvac(true) && purchaseValue < 4) {
               return text.n_shop_gossip.zeroPrompt;
            } else {
               return text.n_shop_gossip.itemPurchase[purchaseValue - 1];
            }
         } else if (atlas.target === 'shop') {
            if (adultEvac(true)) {
               return text.n_shop_gossip.menuPrompt3();
            } else if (shops.gossip.vars.idle) {
               return text.n_shop_gossip.menuPrompt2;
            } else {
               shops.gossip.vars.idle = true;
               return text.n_shop_gossip.menuPrompt1;
            }
         } else if (adultEvac(true)) {
            return text.n_shop_gossip.zeroPrompt;
         } else if (shopper.index === 0) {
            return text.n_shop_gossip.itemPrompt;
         } else {
            return text.n_shop_gossip.talkPrompt;
         }
      },
      tooltip () {
         if ([ 'shopList', 'shopPurchase' ].includes(atlas.target!) && shopper.index === 0) {
            if (shopper.listIndex === 4) {
               return null;
            } else {
               if (shopper.listIndex === 3 && SAVE.data.b.item_mystery_key) {
                  return null;
               }
               const info = items.of(
                  [
                     'trash',
                     SAVE.data.b.item_laser ? 'laser_x' : 'laser',
                     SAVE.data.b.item_visor ? 'visor_x' : 'visor',
                     'mystery_key'
                  ][shopper.listIndex]
               );
               const calc =
                  info.value -
                  (info.type === 'consumable' || info.type === 'special' ? 0 : items.of(SAVE.data.s[info.type]).value);
               return text.n_shop_gossip.itemInfo()[shopper.listIndex].replace('$(x)', `${calc < 0 ? '' : '+'}${calc}`);
            }
         } else {
            return null;
         }
      },
      vars: {}
   })
};

events.on('battle', () =>
   roomReaction({
      a_path3 () {
         roomKills().a_path3++;
      },
      async a_elevator1 (x) {
         if (roomKills().a_elevator1++ < 1) {
            events.fire('tick');
            const n1 = instance('main', 'a_businessdude');
            if (n1) {
               x();
               await n1.talk('a', talkFinder(), 'auto', ...text.a_aerialis.businessKILLER);
            }
         }
      },
      async a_sans (x) {
         if (roomKills().a_sans++ < 1) {
            events.fire('tick');
            const n1 = instance('main', 'a_harpy');
            if (n1) {
               x();
               await n1.talk('a', null, 'auto', ...text.a_aerialis.harpyKILLER);
            }
         }
      },
      a_prepuzzle () {
         roomKills().a_prepuzzle++;
      },
      a_split () {
         roomKills().a_split++;
      }
   })
);

export default shops;

CosmosUtils.status(`LOAD MODULE: AERIALIS AREA (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
