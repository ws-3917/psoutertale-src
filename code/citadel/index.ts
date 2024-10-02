import './bootstrap';

import { AdvancedBloomFilter } from '@pixi/filter-advanced-bloom';
import { GlitchFilter } from '@pixi/filter-glitch';
import { HslAdjustmentFilter } from '@pixi/filter-hsl-adjustment';
import { ColorMatrixFilter, Filter, Graphics } from 'pixi.js';
import { pointInPolygon, Vector } from 'sat';
import text from '../../languages/default/text/citadel';
import systemsText from '../../languages/default/text/systems';
import {
   blue,
   bullyEnding,
   characters,
   cs_state,
   friskMirror,
   friskMirrorWater,
   goatbro,
   goatbroTrue,
   grey,
   queue,
   rgHeaders,
   stableRooms,
   tripper
} from '../common/api';
import { content, filters, inventories, music, shaders, sounds } from '../systems/assets';
import { atlas, events, game, init, keys, launch, renderer, rooms, speech, typer } from '../systems/core';
import {
   antifreeze,
   autoNav,
   battler,
   calcBonusHP,
   calcHP,
   calcLV,
   character,
   choicer,
   dialogue,
   dialogue_primitive,
   directionalInput,
   disengageDelay,
   dropShake,
   elevate,
   engageDelay,
   epilogue,
   fader,
   frontEnder,
   header,
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
   rand_rad,
   saver,
   shake,
   sineWaver,
   talkFinder,
   teleport,
   teleporter,
   temporary,
   tracker,
   trivia,
   ultimaFacer,
   updateArmor,
   use,
   waterpour,
   world
} from '../systems/framework';
import { OutertaleGroup, OutertaleMultivisualObject, OutertaleOpponent } from '../systems/outertale';
import { SAVE } from '../systems/save';
import {
   CosmosAnimation,
   CosmosBaseEvents,
   CosmosCharacter,
   CosmosCharacterPreset,
   CosmosDirection,
   CosmosHitbox,
   CosmosImage,
   CosmosImageUtils,
   CosmosInstance,
   CosmosInventory,
   CosmosKeyboardInput,
   CosmosKeyed,
   CosmosMath,
   CosmosObject,
   CosmosPoint,
   CosmosPointSimple,
   CosmosRectangle,
   CosmosSprite,
   CosmosText,
   CosmosUtils,
   CosmosValue
} from '../systems/storyteller';
import { citadelRooms } from './bootstrap';
import { ca_state, cf1_state, cf2_state, cw_state } from './extras';
import groups, {
   bad,
   genRLD,
   hyper_pacifist,
   twAssets1,
   twAssets11,
   twAssets11a,
   twAssets13,
   twAssets13a,
   twAssets15,
   twAssets16,
   twAssets2,
   twAssets3,
   twAssets3a,
   twAssets5,
   twAssets5a,
   twAssets7,
   twAssets7a,
   twAssets9,
   twAssets9a
} from './groups';
import opponents, {
   azAssets1,
   azAssets2,
   azAssets3,
   azAssets4,
   azAssets5,
   azAssets6,
   azAssets7,
   barrier,
   barrierPower
} from './opponents';

export type CitadelRoomKey = keyof typeof citadelRooms;

export type CitadelDefinedRS = {
   c_courtroom: { active: boolean; susser: boolean };
   c_throneroom: { backdoor: CosmosObject; over: CosmosObject };
   c_bastion: { alphys: CosmosCharacter };
   c_courtyard: { active: boolean; susser: boolean };
   c_archive_starton2: { active: boolean };
   c_archive_foundryA1: { beams: CosmosRectangle[]; overs: CosmosSprite[]; restore: boolean };
   c_archive_foundryA2: { beams: CosmosRectangle[]; overs: CosmosSprite[]; restore: boolean };
   c_archive_foundryA3: { beams: CosmosRectangle[]; overs: CosmosSprite[]; restore: boolean };
   c_archive_foundryA4: { beams: CosmosRectangle[]; overs: CosmosSprite[]; restore: boolean };
   c_archive_aerialis2: { location: string; elevating: boolean };
};

export type CitadelRS = {
   [k in CitadelRoomKey]: k extends keyof CitadelDefinedRS ? Partial<CitadelDefinedRS[k]> : {};
};

export const preset_bow = {
   talk: {
      down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAsrielBow }),
      left: new CosmosSprite(),
      right: new CosmosSprite(),
      up: new CosmosSprite()
   },
   walk: {
      down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAsrielBow }),
      left: new CosmosSprite(),
      right: new CosmosSprite(),
      up: new CosmosSprite()
   }
};
export const cf1_puzzle = { state: 0 };

export const cs_puzzle = [
   {
      get x () {
         return -36 - cs_state.p1x;
      },
      set x (v) {
         cs_state.p1x = -36 - v;
      },
      get y () {
         return 16 - cs_state.p1y;
      },
      set y (v) {
         cs_state.p1y = 16 - v;
      }
   },
   {
      get x () {
         return 28 - cs_state.p2x;
      },
      set x (v) {
         cs_state.p2x = 28 - v;
      },
      get y () {
         return 20 - cs_state.p2y;
      },
      set y (v) {
         cs_state.p2y = 20 - v;
      }
   },
   {
      get x () {
         return 16 - cs_state.p3x;
      },
      set x (v) {
         cs_state.p3x = 16 - v;
      },
      get y () {
         return -12 - cs_state.p3y;
      },
      set y (v) {
         cs_state.p3y = -12 - v;
      }
   }
];

export function ringcolor (value?: number) {
   instance('below', 'mightyrings')!.object.tint = value;
   instance('above', 'arch')!.object.tint = value;
}

export function archindex (objects: CosmosObject[], value: number) {
   for (const object of objects) {
      if (object instanceof CosmosAnimation) {
         object.index = value;
      }
   }
}

export function fixPillar (pillar = instance('below', 'pillars')!.object) {
   for (const spr of pillar.objects as CosmosSprite[]) {
      const p = cs_puzzle[spr.position.x / 100];
      const ex = Math.abs(p.x) + Math.abs(p.y);
      spr.tint = CosmosImageUtils.gradient(0xffffff, 0, ex / 100);
      if (spr.anchor.y === -1) {
         spr.offsets[0].y = ex * -1;
      } else {
         spr.offsets[0].y = ex;
      }
   }
}

export const b1 = () => cf1_state.pylonA.y === 180 && cf1_state.pylonB.x < 100;

export const b2 = () => {
   if (b1()) {
      const x = cf1_state.pylonB.x;
      switch (x) {
         case 40:
            return cf1_state.pylonC.y === cf1_state.pylonD.y + 10 ? 95 : NaN;
         case 90:
            return cf1_state.pylonD.y === cf1_state.pylonC.y + 10 ? 45 : NaN;
         default:
            return x + 5;
      }
   } else {
      return NaN;
   }
};

export const b3 = () => b2() === cf1_state.pylonE.x + 5 && cf1_state.pylonF.x > 320;

export function pylon_update (roomState: { beam?: CosmosObject[]; over?: CosmosObject[]; restore?: boolean }) {
   if (!roomState.restore) {
      roomState.restore = true;
      for (const { object: pylon } of instances('main', 'pylon')) {
         const name = (pylon.metadata.tags as string[]).filter(tag => tag !== 'pylon')[0];
         const { x, y } = cf1_state[name as keyof typeof cf1_state];
         x > 0 && (pylon.position.x = x);
         y > 0 && (pylon.position.y = y);
      }
   }
   const pylonz = [ ...instances('main', 'pylon') ].map(instance => instance.object);
   for (const pylon of pylonz) {
      if (pylon.position.task !== void 0) {
         continue;
      }
      const name = (pylon.metadata.tags as string[]).filter(tag => tag !== 'pylon')[0];
      const position = cf1_state[name as keyof typeof cf1_state];
      position.x = pylon.position.x;
      position.y = pylon.position.y;
      const minX = pylon.position.x - 10;
      const maxX = pylon.position.x + 10;
      const minY = pylon.position.y - 20;
      const maxY = pylon.position.y;
      // cool leg
      if ([ 'pylonB', 'pylonG' ].includes(name)) {
         if (
            pylon.position.x === 40 &&
            player.position.x < minX + 5 &&
            (player.position.y < pylon.position.y
               ? keyState.down && player.position.y > minY
               : keyState.up && player.position.y < maxY + 5)
         ) {
            const targetpos = pylon.position.add(10, 0);
            beamflashCleanup(roomState);
            pylon.position.modulate(renderer, 66, targetpos, targetpos).then(() => {
               position.x = targetpos.x;
               position.y = targetpos.y;
               beamflashTrigger(roomState);
            });
            player.position.y += 1.5;
            continue;
         }
      }
      if (player.position.x > minX && player.position.x < maxX) {
         if ([ 'pylonB', 'pylonE', 'pylonF', 'pylonG' ].includes(name)) {
            continue;
         }
         if (player.position.y < pylon.position.y) {
            if (keyState.down && player.position.y > minY) {
               if (name === 'pylonA' && pylon.position.y === 200) {
                  continue;
               }
               if ([ 'pylonC', 'pylonD' ].includes(name) && pylon.position.y === 260) {
                  continue;
               }
               const targetpos = pylon.position.add(0, 10);
               beamflashCleanup(roomState);
               pylon.position.modulate(renderer, 66, targetpos, targetpos).then(() => {
                  position.x = targetpos.x;
                  position.y = targetpos.y;
                  beamflashTrigger(roomState);
               });
               player.position.y -= 1.5;
            }
         } else if (keyState.up && player.position.y < maxY + 5) {
            if (name === 'pylonA' && pylon.position.y === 140) {
               continue;
            }
            if ([ 'pylonC', 'pylonD' ].includes(name) && pylon.position.y === 220) {
               continue;
            }
            const targetpos = pylon.position.add(0, -10);
            beamflashCleanup(roomState);
            pylon.position.modulate(renderer, 66, targetpos, targetpos).then(() => {
               position.x = targetpos.x;
               position.y = targetpos.y;
               beamflashTrigger(roomState);
            });
            player.position.y += 1.5;
         }
      } else if (player.position.y > minY && player.position.y < maxY) {
         if ([ 'pylonA', 'pylonC', 'pylonD' ].includes(name)) {
            continue;
         }
         if (player.position.x < pylon.position.x) {
            if (keyState.right && player.position.x > minX - 10) {
               if (name === 'pylonB' && pylon.position.x === 100) {
                  continue;
               }
               if (name === 'pylonE' && pylon.position.x === 120) {
                  continue;
               }
               if (name === 'pylonF' && pylon.position.x === 360) {
                  continue;
               }
               if (name === 'pylonG' && pylon.position.x === 80) {
                  continue;
               }
               const targetpos = pylon.position.add(10, 0);
               beamflashCleanup(roomState);
               pylon.position.modulate(renderer, 66, targetpos, targetpos).then(() => {
                  position.x = targetpos.x;
                  position.y = targetpos.y;
                  beamflashTrigger(roomState);
               });
               player.position.x -= 1.5;
            }
         } else if (keyState.left && player.position.x < maxX + 10) {
            if ([ 'pylonB', 'pylonG' ].includes(name) && pylon.position.x === 40) {
               continue;
            }
            if (name === 'pylonE' && pylon.position.x === 60) {
               continue;
            }
            if (name === 'pylonF' && pylon.position.x === 300) {
               continue;
            }
            beamflashCleanup(roomState);
            const targetpos = pylon.position.add(-10, 0);
            pylon.position.modulate(renderer, 66, targetpos, targetpos).then(() => {
               position.x = targetpos.x;
               position.y = targetpos.y;
               beamflashTrigger(roomState);
            });
            player.position.x += 1.5;
         }
      }
   }
}

export function beamflash (
   stage: {
      mirrors: [CosmosObject, string, CosmosPointSimple][];
      discovery: CosmosObject[];
      beamwalls: CosmosHitbox[];
      rects: CosmosRectangle[];
      anims: CosmosAnimation[];
      overs: CosmosSprite[];
   },
   position: CosmosPointSimple,
   valid = { state: true },
   face = 'down' as CosmosDirection,
   first = false
): boolean {
   let step = 0;
   let next = 'wall';
   let anim = null as null | CosmosAnimation;
   const seek = new CosmosPoint(position).add(0, 39);
   const increment = { up: { y: -1 }, down: { y: 1 }, left: { x: -1 }, right: { x: 1 } }[face];
   const { mirrors, discovery, beamwalls, rects, anims, overs } = stage;
   top: while (step++ < 1000) {
      seek.x += increment.x ?? 0;
      seek.y += increment.y ?? 0;
      if (step > 8) {
         for (const [ pylon, action, position ] of mirrors) {
            if (seek.x === position.x && seek.y === position.y) {
               next = action;
               anim = pylon.objects.filter(sub => sub instanceof CosmosAnimation)[0] as CosmosAnimation;
               discovery.includes(pylon) || discovery.push(pylon);
               if (next === 'pylon-c' || next === 'pylon-d') {
                  overs.push(
                     temporary(
                        new CosmosSprite({
                           offsets: [ { x: next === 'pylon-c' ? -2 : 2, y: -3 } ],
                           scale: { x: next === 'pylon-c' ? 1 : -1 },
                           position: { x: pylon.position.x - (next === 'pylon-c' ? 6 : -6), y: pylon.position.y - 47 },
                           frames: [ content.iooCArchivePuzzlepylonOverlay ],
                           priority: 1000
                        }),
                        'main'
                     )
                  );
               }
               break top;
            }
         }
         const seekVector = new Vector(seek.x, seek.y);
         for (const beamwall of beamwalls) {
            if (pointInPolygon(seekVector, beamwall.polygon)) {
               if (beamwall.metadata.barrier) {
                  next = 'wall';
                  break top;
               } else if (beamwall.metadata.trigger) {
                  next = 'endpoint';
                  break top;
               }
            }
         }
      }
   }
   const anchor = { up: { x: 0, y: 1 }, down: { x: 0 }, left: { x: 1, y: 0 }, right: { y: 0 } }[face];
   const size = new CosmosPoint({ x: Math.abs(increment.x ?? 0), y: Math.abs(increment.y ?? 0) })
      .multiply(step)
      .add(5)
      .subtract(
         next.startsWith('pylon')
            ? { up: 1, down: 1, left: 3, right: 3 }[face]
            : { up: 1, down: 1, left: 7, right: 7 }[face],
         next.startsWith('pylon')
            ? { up: 6, down: 0, left: 1, right: 1 }[face]
            : { up: 5, down: -33, left: 1, right: 1 }[face]
      );
   rects.push(
      temporary(
         new CosmosRectangle({
            position,
            fill: 0xcfcfcf,
            metadata: { face },
            size,
            anchor,
            priority: position.y + (face === 'down' ? size.y : 0) + 45,
            objects: [
               new CosmosRectangle({
                  fill: 0xffffff,
                  size: {
                     x: face === 'down' || face === 'up' ? size.x / 2 : Math.max(size.x - (face === 'left' ? 0 : 2), 0),
                     y: face === 'left' || face === 'right' ? size.y / 2 : size.y + (face === 'down' && !first ? 1 : 0)
                  },
                  anchor,
                  alpha: 0.5,
                  offsets: [ { x: face === 'left' || face === 'right' ? 1 : 0, y: face === 'down' && !first ? -1 : 0 } ]
               })
            ]
         }),
         'main'
      )
   );
   if (valid.state) {
      anim && (anims.includes(anim) || anims.push(anim));
      switch (next) {
         case 'endpoint':
            return true;
         case 'pylon-a':
            return beamflash(
               stage,
               face === 'right' ? seek.add(0, -37) : seek.add(2, -39),
               valid,
               face === 'right' ? 'up' : 'left'
            );
         case 'pylon-b':
            return beamflash(
               stage,
               face === 'left' ? seek.add(0, -37) : seek.add(-2, -39),
               valid,
               face === 'left' ? 'up' : 'right'
            );
         case 'pylon-c':
            return beamflash(
               stage,
               face === 'right' ? seek.add(0, -37) : seek.add(2, -39),
               valid,
               face === 'right' ? 'down' : 'left'
            );
         case 'pylon-d':
            return beamflash(
               stage,
               face === 'left' ? seek.add(0, -37) : seek.add(-2, -39),
               valid,
               face === 'left' ? 'down' : 'right'
            );
         default:
            return false;
      }
   } else {
      return false;
   }
}

export function beamflashTrigger (
   roomState: { beams?: CosmosRectangle[]; overs?: CosmosSprite[]; restore?: boolean },
   sfx = true
) {
   const rects = (roomState.beams ??= []);
   const overs = (roomState.overs ??= []);
   const anims = [] as CosmosAnimation[];
   const pylons = [ ...instances('main', 'pylon') ];
   const stage = {
      mirrors: pylons.flatMap(
         ({ object: pylon }) =>
            [
               [ pylon, 'pylon-a', pylon.position.add(-5, -15) ],
               [ pylon, 'pylon-b', pylon.position.add(5, -15) ],
               [ pylon, 'pylon-c', pylon.position.add(-5, -5) ],
               [ pylon, 'pylon-d', pylon.position.add(5, -5) ]
            ] as [CosmosObject, string, CosmosPointSimple][]
      ),
      discovery: [],
      beamwalls: [
         instance('below', 'beamwall')!.object.objects[0] as CosmosHitbox,
         ...renderer.layers.below.objects.flatMap(object => object.objects.filter(object => object.metadata.barrier))
      ].filter(b => {
         if (b instanceof CosmosHitbox) {
            b.calculate();
            return true;
         } else {
            return false;
         }
      }) as CosmosHitbox[],
      rects,
      anims,
      overs
   };
   let result = false;
   switch (game.room) {
      case 'c_archive_foundryA1':
         result = beamflash(stage, { x: 215, y: 41 }, void 0, void 0, true);
         if (b1() && cf1_state.pylonC.y === cf1_state.pylonD.y && cf1_state.pylonC.y > 0) {
            switch (cf1_state.pylonB.x) {
               case 40:
                  beamflash(stage, { x: 95, y: 80 }, void 0, void 0, true);
                  break;
               case 90:
                  beamflash(stage, { x: 45, y: 80 }, void 0, void 0, true);
                  break;
            }
         }
         break;
      case 'c_archive_foundryA2':
         if (b1()) {
            result = beamflash(stage, { x: cf1_state.pylonB.x + 105, y: 0 }, void 0, void 0, true);
            break;
         }
         return;
      case 'c_archive_foundryA3': {
         const x = b2();
         if (!Number.isNaN(x)) {
            overs.push(
               temporary(
                  new CosmosSprite({
                     anchor: { x: 0, y: 1 },
                     metadata: { fadestrip: true },
                     position: { x, y: 80 },
                     frames: [ content.iooCFadestrip ],
                     priority: 1983591359
                  }),
                  'main'
               )
            );
            if ((result = beamflash(stage, { x, y: 80 }))) {
               overs.push(
                  temporary(
                     new CosmosSprite({
                        anchor: { x: 0, y: 1 },
                        metadata: { fadestrip: true },
                        position: { x: cf1_state.pylonF.x - 5, y: 80 },
                        frames: [ content.iooCFadestrip ],
                        priority: 1983591359
                     }),
                     'main'
                  )
               );
            }
            break;
         }
         return;
      }
      case 'c_archive_foundryA4':
         if (b3()) {
            result = beamflash(stage, { x: cf1_state.pylonF.x - 305, y: 240 }, void 0, 'up', true);
            break;
         }
         return;
   }
   if (result && b3() && cf1_state.pylonF.x === cf1_state.pylonG.x + 310) {
      if (cf1_state.pylonB.x === 40) {
         for (const rect of rects) {
            rect.fill = 0x6ca4fc;
         }
         for (const pylon of pylons) {
            pylon.index = 1;
         }
         for (const over of overs) {
            if (over.metadata.fadestrip) {
               over.tint = 0x6ca4fc;
            }
         }
         if (cf1_puzzle.state === 3) {
            instance('below', 'cover')?.destroy();
         } else {
            cf1_puzzle.state = 3;
            sfx && sounds.indicator.instance(renderer);
            renderer.pause(500).then(() => {
               sounds.pathway.instance(renderer);
               shake(2, 1000);
               instance('below', 'cover')?.destroy();
            });
         }
      } else {
         for (const rect of rects) {
            rect.fill = 0xfcea72;
         }
         for (const pylon of pylons) {
            pylon.index = 4;
         }
         for (const over of overs) {
            if (over.metadata.fadestrip) {
               over.tint = 0xfcea72;
            }
         }
         if (cf1_puzzle.state === 2) {
            sfx && (sounds.indicator.instance(renderer).gain.value /= 2);
         } else {
            cf1_puzzle.state = 2;
            sfx && sounds.indicator.instance(renderer);
         }
      }
   } else if (result) {
      for (const rect of rects) {
         rect.fill = 0xffffff;
      }
      for (const pylon of pylons) {
         pylon.index = 2;
      }
      for (const over of overs) {
         if (over.metadata.fadestrip) {
            over.tint = 0xffffff;
         }
      }
      if (cf1_puzzle.state === 1) {
         sfx && (sounds.indicator.instance(renderer).gain.value /= 2);
      } else {
         cf1_puzzle.state = 1;
         sfx && sounds.indicator.instance(renderer);
      }
   } else {
      for (const rect of rects) {
         rect.fill = 0xff0000;
      }
      for (const pylon of pylons) {
         pylon.index = 3;
      }
      for (const over of overs) {
         if (over.metadata.fadestrip) {
            over.tint = 0xff0000;
         }
      }
      if (cf1_puzzle.state === 0) {
         sfx && (sounds.noise.instance(renderer).gain.value /= 2);
      } else {
         cf1_puzzle.state = 0;
         sfx && sounds.noise.instance(renderer);
      }
   }
}

export function beamflashCleanup (roomState: { beams?: CosmosRectangle[]; overs?: CosmosSprite[]; restore?: boolean }) {
   roomState.beams && renderer.detach('main', ...roomState.beams);
   roomState.overs && renderer.detach('main', ...roomState.overs);
   for (const inst of instances('main', 'pylon')) {
      inst.index = 0;
   }
}

export async function sad () {
   inventories.alphysAssets.unload();
   inventories.battleAssets.unload();
   opponents.asriel.assets.unload();
   opponents.final.assets.unload();
   SAVE.flag.n.pacifist_marker < 11 && (SAVE.flag.n.pacifist_marker = 11);
   if (SAVE.flag.n.pacifist_marker < 14) {
      player.position.set(120, 120);
      player.face = 'up';
   } else if (SAVE.flag.n.pacifist_marker < 15.1 || !SAVE.flag.b.pacifist_marker_comfort) {
      player.position.set(160, 60);
      player.face = SAVE.flag.n.pacifist_marker < 16 ? 'left' : 'down';
   } else {
      player.position.set(120, 60);
      player.face = SAVE.flag.n.pacifist_marker < 16 ? 'left' : 'down';
   }
   const him = new CosmosAnimation({
      anchor: { x: 0, y: 1 },
      position: {
         x: SAVE.flag.n.pacifist_marker < 14 ? 120 : 80,
         y: SAVE.flag.n.pacifist_marker < 14 ? 10 : SAVE.flag.n.pacifist_marker < 15 ? -10 : 60
      }
   }).on('tick', function () {
      if (this.resources === content.iocAsrielFly1) {
         this.index === 9 && (this.index = 7);
      } else if (this.resources === content.iocAsrielHug2) {
         this.index === 10 && (this.index = 8);
      }
   });
   SAVE.flag.n.pacifist_marker < 15.3 && renderer.attach('main', him);
   const cam = new CosmosObject({ position: { x: 120, y: SAVE.flag.n.pacifist_marker === 14 ? -60 : 10 } });
   game.camera = cam;
   const bac = rooms.of('c_exit').layers.below![0];
   const vex = new CosmosSprite({ alpha: 0.5, frames: [ content.iooCVirtexit ] });
   if (SAVE.flag.n.pacifist_marker < 16) {
      bac.alpha.value = 0;
      renderer.attach('below', vex);
   }
   const tim = (preset: CosmosCharacterPreset = characters.asrielTrue) => {
      him.alpha.value = 0;
      const char = character('asriel1', preset, him, 'down');
      return () => {
         renderer.detach('main', char);
         him.alpha.value = 1;
      };
   };
   if (SAVE.flag.n.pacifist_marker < 11.1) {
      quickresume(true);
      him.use(content.iocAsrielCry1).enable();
      await renderer.pause(4000);
      await renderer.when(() => him.index === 0);
      him.reset();
      await renderer.pause(3000);
      await dialogue('dialoguerTop', ...text.a_citadel.story.sad0());
      const mus = game.music;
      game.music = null;
      mus?.gain.modulate(renderer, 5000, 0).then(() => mus.stop());
      him.use(content.iocAsrielCry2).enable();
      await renderer.pause(3000);
      await renderer.when(() => him.index % 2 === 0);
      him.reset();
      await renderer.pause(1000);
      him.use(content.iocAsrielCry3).enable();
      await renderer.when(() => him.index === 2);
      him.disable();
   } else if (SAVE.flag.n.pacifist_marker < 11.2) {
      him.use(content.iocAsrielCry3);
      him.index = 2;
   }
   let mus: CosmosInstance | null = null;
   if (SAVE.flag.n.pacifist_marker < 11.2) {
      await renderer.pause(2000);
      SAVE.flag.n.pacifist_marker = 11.1;
      mus = music.memory.instance(renderer);
      if (world.runaway) {
         mus.rate.value *= 0.8;
      }
      him.use(content.iocAsrielTrueDown);
      const t = tim();
      await dialogue('dialoguerTop', ...text.a_citadel.story.sad1());
      t();
   } else if (SAVE.flag.n.pacifist_marker < 14) {
      him.use(content.iocAsrielTrueDown);
      if (SAVE.flag.n.pacifist_marker < 13) {
         mus = music.memory.instance(renderer);
         if (world.runaway) {
            mus.rate.value *= 0.8;
         }
      }
   }
   if (SAVE.flag.n.pacifist_marker < 11.3) {
      await renderer.pause(1000);
      SAVE.flag.n.pacifist_marker = 11.2;
      const t = tim();
      await dialogue('dialoguerTop', ...text.a_citadel.story.sad2());
      t();
   }
   if (SAVE.flag.n.pacifist_marker < 12) {
      await renderer.pause(1000);
      SAVE.flag.n.pacifist_marker = 11.3;
      const t = tim();
      await dialogue('dialoguerTop', ...text.a_citadel.story.sad3());
      t();
      SAVE.flag.n.pacifist_marker = 12;
      if (choicer.result === 0) {
         SAVE.flag.b.pacifist_marker_forgive = true;
      }
   }
   if (SAVE.flag.n.pacifist_marker < 13) {
      await renderer.pause(1000);
      const t = tim();
      await dialogue(
         'dialoguerTop',
         ...[ text.a_citadel.story.sad4a, text.a_citadel.story.sad4b ][SAVE.flag.b.pacifist_marker_forgive ? 0 : 1](),
         ...text.a_citadel.story.sad4c()
      );
      t();
      SAVE.flag.n.pacifist_marker = 13;
      await mus?.gain.modulate(renderer, 3000, 0);
      mus?.stop();
   }
   const fd = fader({ size: 1000, position: { x: 160, y: 120 }, anchor: 0 });
   if (SAVE.flag.n.pacifist_marker < 14) {
      await renderer.pause(1000);
      him.use(content.iocAsrielFly1);
      him.enable();
      await renderer.when(() => him.index === 5);
      renderer.pause(500).then(() => cam.position.modulate(renderer, 4000, {}, { y: -60 }, { y: -60 }));
      const s = CosmosUtils.hyperpromise();
      him.position.modulate(renderer, 4000, {}, { y: -60 }, { y: -60 }).then(() => {
         renderer.detach('main', him);
         renderer.attach('below', him);
         const SOULs = [] as CosmosSprite[];
         const orig = new CosmosPoint(him.position.x, -72);
         const spawnRing = (count: number, side: number) => {
            const list = CosmosUtils.populate(count, i => {
               let a = 0;
               let e = 0;
               return new CosmosSprite({ anchor: 0, frames: [ content.ieBossSOUL ], priority: -40000 }).on(
                  'tick',
                  function () {
                     if (++e > 400) {
                        renderer.detach('below', this);
                        SOULs.splice(SOULs.indexOf(this), 1);
                     } else {
                        this.position.set(orig.endpoint((a += [ -3, 3 ][side]) + (i / count) * 360, e));
                     }
                  }
               );
            });
            SOULs.push(...list);
            renderer.attach('below', ...list);
         };
         (async () => {
            him.priority.value = -30000;
            let ct = 6;
            let side = 0;
            let delay = 0;
            while (s.active) {
               spawnRing(Math.floor(ct), side);
               await Promise.race([ s.promise, renderer.pause(800 - delay * CosmosMath.FRAME_2) ]);
               if (!s.active) {
                  break;
               }
               side = 1 - side;
               ++delay > 30 && (delay = 30);
               ct += 1 / 2;
            }
            renderer.detach('below', him, ...SOULs);
            renderer.attach('main', him);
            him.priority.value = 0;
         })();
      });
      let w = 0;
      const bgfx = sounds.deeploop2.instance(renderer);
      bgfx.gain.value = 0;
      bgfx.gain.modulate(renderer, 5000, bgfx.daemon.gain);
      const warpticker = () => {
         w += barrierPower.value;
         bgfx.rate.value =
            CosmosMath.remap(barrierPower.value, 1, 3) +
            bgfx.daemon.rate * (CosmosMath.wave(w / 5) - 0.5) * CosmosMath.remap(barrierPower.value, 1, 1.5);
      };
      renderer.on('tick', warpticker);
      barrierPower.modulate(renderer, 12000, 1);
      renderer.shake.modulate(renderer, 12000, 0, 4);
      music.finalpower.instance(renderer);
      await renderer.pause(10000);
      bgfx.gain.modulate(renderer, 3500, 0.2, 0).then(() => {
         renderer.off('tick', warpticker);
         bgfx.stop();
      });
      await renderer.pause(1000);
      fd.fill = 0xffffff;
      await fd.alpha.modulate(renderer, 1000, 1);
      blue.tint = 0x5f5f5f;
      grey.tint = 0x9f9f9f;
      renderer.detach('base', barrier);
      s.resolve();
      await renderer.pause(4000);
      const anim1 = new CosmosAnimation({ anchor: 0, position: { x: 160, y: 120 }, resources: content.ieBarrier });
      const anim2 = new CosmosAnimation({
         anchor: 0,
         position: { x: 160, y: 120 },
         resources: content.ieBarrier,
         index: 1
      });
      fd.fill = 0;
      renderer.attach('menu', anim1, anim2);
      shake();
      sounds.abreak1.instance(renderer);
      await renderer.pause(2000);
      anim1.gravity.x = -1;
      anim2.gravity.x = 1;
      sounds.abreak2.instance(renderer);
      await renderer.pause(3000);
      SAVE.flag.n.pacifist_marker = 14;
      renderer.detach('menu', anim1, anim2);
      game.text = '';
      player.position.set(160, 60);
      player.face = 'left';
      him.position.set(80, -10);
   } else {
      blue.tint = 0x5f5f5f;
      grey.tint = 0x9f9f9f;
      renderer.detach('base', barrier);
      if (SAVE.flag.n.pacifist_marker < 15) {
         fd.fill = 0;
         fd.alpha.value = 1;
         await renderer.pause(2000);
      }
   }
   if (SAVE.flag.n.pacifist_marker < 15) {
      atlas.switch('dialoguerBase');
      const display = atlas.navigators.of('frontEnd').objects[1];
      renderer.attach('menu', display);
      await dialogue_primitive(text.a_citadel.story.abreak);
      renderer.detach('menu', display);
      atlas.switch(null);
      await renderer.pause(1250);
      fd.alpha.modulate(renderer, 1000, 0);
      him.use(content.iocAsrielFly2);
      him.enable();
      renderer.pause(500).then(() => cam.position.modulate(renderer, 4000, {}, { y: 10 }, { y: 10 }));
      await him.position.modulate(renderer, 4000, {}, { y: 60 }, { y: 60 });
      await renderer.when(() => him.index === 8);
      him.disable();
      await renderer.pause(2000);
      him.use(content.iocAsrielBow);
      const t = tim(preset_bow);
      await dialogue('dialoguerTop', ...text.a_citadel.story.sad5());
      t();
      SAVE.flag.n.pacifist_marker = 15;
      if (choicer.result === 0) {
         SAVE.flag.b.pacifist_marker_comfort = true;
      } else {
         await renderer.pause(2000);
      }
   } else if (SAVE.flag.b.pacifist_marker_comfort && SAVE.flag.n.pacifist_marker < 15.1) {
      him.use(content.iocAsrielBow);
   }
   if (SAVE.flag.b.pacifist_marker_comfort && SAVE.flag.n.pacifist_marker < 15.1) {
      SAVE.data.b.water && (await waterpour());
      player.priority.value = player.position.y + 10;
      if (world.runaway) {
         player.walk(renderer, 3, { x: 120 });
         await renderer.when(() => player.position.x < 130);
         notifier(him, true);
         him.duration = 15;
         him.enable();
         await him.position.modulate(renderer, 500, him.position.subtract(10, 0));
         him.reset();
         await dialogue('dialoguerTop', ...text.a_citadel.story.sad6());
         await renderer.pause(1000);
      } else {
         await player.walk(renderer, 3, him.position.add(4.5, 0));
         await renderer.pause(233);
         player.alpha.value = 0;
         him.use(content.iocAsrielHug2);
         him.enable();
         await renderer.when(() => him.index === 8);
         await renderer.pause(3000);
         await dialogue('dialoguerTop', ...text.a_citadel.story.sad6());
         await renderer.pause(3000);
         keyState.interact && (await keys.interactKey.on('up'));
         him.extrapolate = false;
         him.step = 0;
         him.index = 7;
         him.reverse = true;
         him.duration = 19;
         await renderer.when(() => him.index === 0);
         him.reset();
         him.extrapolate = true;
         await renderer.pause(633);
         him.use(content.iocAsrielBow);
         player.alpha.value = 1;
         await renderer.pause(2000);
         player.face = 'left';
         player.puppet = true;
         player.sprites.left.enable();
         player.sprites.left.duration = 10;
         await player.position.step(renderer, 1.5, { x: 120 });
         player.sprites.left.reset();
         player.puppet = false;
      }
      player.priority.value = 0;
   } else if (SAVE.flag.b.pacifist_marker_comfort) {
      SAVE.data.b.water = false;
      if (SAVE.flag.n.pacifist_marker < 15.2) {
         him.use(content.iocAsrielBow);
      }
   }
   if (SAVE.flag.b.pacifist_marker_comfort && SAVE.flag.n.pacifist_marker < 15.2) {
      await renderer.pause(1000);
      SAVE.flag.n.pacifist_marker = 15.1;
      const t = tim(preset_bow);
      await dialogue('dialoguerTop', ...text.a_citadel.story.sad7());
      t();
      await renderer.pause(2500);
   } else {
      him.use(content.iocAsrielBow);
   }
   if (SAVE.flag.n.pacifist_marker < 15.3) {
      await renderer.pause(1000);
      SAVE.flag.n.pacifist_marker = 15.2;
      const t = tim(preset_bow);
      await dialogue('dialoguerTop', ...text.a_citadel.story.sad8);
      t();
      SAVE.data.b.oops || dialogue('dialoguerTop', ...text.a_citadel.story.sad8x);
   }
   renderer.detach('main', him);
   if (SAVE.flag.n.pacifist_marker < 16) {
      const zim = character(
         'asriel1',
         characters.asrielTrueSad,
         SAVE.flag.n.pacifist_marker < 15.3 ? him : { x: 120, y: 100 },
         'down'
      );
      if (SAVE.flag.n.pacifist_marker < 15.3) {
         await zim.walk(renderer, 1.5, { y: 90 }, { x: 120 }, { y: 120 });
         await renderer.pause(1500);
      }
      await renderer.pause(1000);
      SAVE.flag.n.pacifist_marker = 15.3;
      zim.face = 'up';
      header('x1').then(() => (player.face = 'down'));
      await dialogue('dialoguerTop', ...text.a_citadel.story.sad9());
      await renderer.pause(1000);
      zim.walk(renderer, 1.5, { y: 200 });
      if (!SAVE.data.b.oops) {
         await dialogue('dialoguerTop', ...text.a_citadel.story.sad9x);
      }
      150 <= zim.position.y || (await renderer.when(() => 150 <= zim.position.y));
      fd.fill = 0xffffff;
      const cym = sounds.cymbal.instance(renderer);
      await fd.alpha.modulate(renderer, 5000, 1);
      cym.stop();
      fd.fill = 0;
      renderer.detach('main', zim);
      renderer.detach('below', vex);
      bac.alpha.value = 1;
      await renderer.pause(2650);
   } else {
      fd.alpha.value = 1;
      fd.fill = 0;
      await renderer.pause(1000);
   }
   const epilogueLoader = content.amReunited.load();
   SAVE.flag.n.pacifist_marker = 16;
   await dialogue('dialoguerBottom', ...text.a_citadel.story.sad10());
   if (SAVE.flag.b.okaythatsweird) {
      SAVE.flag.b.okaythatsweird = false;
      await dialogue('auto', ...text.a_citadel.story.oof);
   }
   await antifreeze([ epilogueLoader, renderer.pause(1000) ]);
   cam.position.set(player);
   player.face = 'right';
   player.rotation.value = -90;
   player.sprite.anchor.y = 0;
   player.position.y -= 5;
   instance('main', 'spawn')!.object.position.y = 10;
   const ep = epilogue();
   ep.gain.value = 0;
   await Promise.all([ fd.alpha.modulate(renderer, 5000, 0), ep.gain.modulate(renderer, 5000, ep.daemon.gain) ]);
   renderer.detach('menu', fd);
   await renderer.pause(1500);
   player.position.y += 5;
   player.sprite.anchor.y = 1;
   player.rotation.value = 0;
   player.face = 'up';
   game.camera = player;
   await renderer.pause(1000);
   if (!world.runaway) {
      const poop = SAVE.data.b.f_state_kidd_betray;
      const them = character(
         'kidd',
         poop ? characters.kiddSad : characters.kidd,
         { x: 120, y: player.position.y + 160 },
         'up'
      );
      renderer.when(() => them.position.y < player.position.y + 100).then(() => (player.face = 'down'));
      await them.walk(renderer, 4, { y: player.position.y + (poop ? 90 : 50) });
      await renderer.pause(poop ? 2000 : 1000);
      await dialogue('dialoguerBottom', ...text.a_citadel.story.sad11());
      await renderer.pause(poop ? 2000 : 1000);
      await them.walk(renderer, poop ? 2 : 4, { y: player.position.y + 160 });
      renderer.detach('main', them);
   }
   SAVE.data.n.plot = 72;
   if (SAVE.data.n.state_foundry_blookmusic > 0) {
      const az = rooms.of('f_napstablook').preload;
      const thing = [ content.amSpooktune, content.amSpookwave, content.amSpookwaltz ][
         SAVE.data.n.state_foundry_blookmusic - 1
      ];
      if (az.value.includes(thing)) {
         az.value.splice(az.value.indexOf(thing), 1);
         thing.unload(az);
      }
      SAVE.data.n.state_foundry_blookmusic = 0;
   }
   if (SAVE.data.n.state_starton_jukebox > 0) {
      const az = rooms.of('s_grillbys').preload;
      const thing = [ content.amDjbeatLoop, content.amSecretsongLoop, content.amSansboss ][
         SAVE.data.n.state_starton_jukebox - 1
      ];
      if (az.value.includes(thing)) {
         az.value.splice(az.value.indexOf(thing), 1);
         thing.unload(az);
      }
      SAVE.data.n.state_starton_jukebox = 0;
   }
   if (!SAVE.data.b.oops) {
      await dialogue('dialoguerBottom', ...text.a_citadel.story.sad11x);
   }
   events.on('save').then(() => {
      SAVE.flag.n.pacifist_marker = 16.1;
      if (world.runaway) {
         SAVE.flag.b.true_reset = true;
      }
   });
   game.movement = true;
   azAssets1.unload();
   azAssets2.unload();
   azAssets3.unload();
   azAssets4.unload();
   azAssets5.unload();
   azAssets6.unload();
   azAssets7.unload();
}

export async function mad () {
   let fd: CosmosObject | null = null;
   if (SAVE.flag.n.lv20 < 2) {
      player.position.set(120, 30);
      player.face = 'down';
      await renderer.pause(600);
      await dialogue('dialoguerBottom', ...text.a_citadel.overworld.get20);
      await renderer.pause(800);
      game.input = false;
      atlas.switch('sidebar');
      await renderer.pause(1000);
      atlas.seek('down');
      await renderer.pause(600);
      atlas.seek('down');
      await renderer.pause(1200);
      atlas.next();
      await renderer.pause(1000);
      atlas.next();
      await renderer.pause(4000);
      atlas.switch(null);
      game.movement = false;
      game.input = true;
      await renderer.pause(2000);
      await player.walk(renderer, 3, { y: 210 });
      await teleport('c_road3', 'down', 40, 10, world);
      await player.walk(renderer, 3, { y: 1270 });
      await teleport('c_bastion', 'down', 170, 110, world);
      await player.walk(renderer, 3, { y: 230 });
      await teleport('c_throneroom', 'down', 110, 130, world);
      await player.walk(renderer, 3, { y: 150 }, { x: 50 }, { y: 610 }, { x: 290 }, { y: 570 });
      await renderer.pause(1050);
      sounds.equip.instance(renderer).rate.value = 1.2;
      await renderer.pause(500);
      sounds.pathway.instance(renderer);
      shake();
      renderer.detach('below', citadelStates.rooms.c_throneroom!.over);
      await renderer.pause(850);
      await player.walk(renderer, 3, { y: 550 }, { x: 350 });
      fd = fader({ size: 1000, position: { x: 160, y: 120 }, anchor: 0 });
      await fd.alpha.modulate(renderer, 3000, 1);
      SAVE.flag.n.lv20 = 2;
   } else if (SAVE.flag.n.lv20 < 3) {
      fd = fader({ alpha: 1, size: 1000, position: { x: 160, y: 120 }, anchor: 0 });
   }
   if (SAVE.flag.n.lv20 < 3) {
      await renderer.pause(1000);
      await dialogue('auto', ...text.a_citadel.story.lv20);
      await renderer.pause(3000);
      await teleport('_cockpit', 'down', 0, 0, { fade: false, fast: true, cutscene: true });
      SAVE.flag.n.lv20 = 3;
      quickresume(true);
      fd?.alpha.modulate(renderer, 1000, 0).then(() => {
         renderer.detach('menu', fd);
      });
   }
}

export const citadelStates = {
   rooms: {} as Partial<CosmosKeyed<CosmosKeyed>>,
   scripts: {} as Partial<CosmosKeyed<CosmosKeyed>>
};

export const archiver = {
   active: false,
   bg: new CosmosRectangle({
      fill: 0,
      priority: 1,
      size: { x: 320, y: 240 },
      objects: (() => {
         const matrix = new ColorMatrixFilter();
         matrix.negative(false);
         return CosmosUtils.populate(4, i =>
            new CosmosAnimation({
               active: true,
               duration: 5,
               position: { x: (i % 2) * 160, y: Math.floor(i / 2) * 120 },
               extrapolate: false,
               resources: content.iooSNoise,
               filters: [ matrix ]
            }).on('tick', function () {
               this.alpha.value =
                  SAVE.data.n.state_citadel_archive < 6 ? (stableRooms.includes(game.room) ? 0.92 : 0.95) : 0;
            })
         );
      })()
   }),
   fx: -Infinity,
   nextfx: Infinity,
   offset: 0,
   ticker () {
      archiver.nextfx <= renderer.time && (archiver.fx = archiver.nextfx);
      const fl = (renderer.filters ??= []);
      if (archiver.fx > renderer.time - 400) {
         if (!fl.includes(archiver.glitcher)) {
            fl.unshift(archiver.glitcher);
            const stable = stableRooms.includes(game.room);
            const offs = stable ? (SAVE.flag.b.$option_epilepsy ? 0.5 : 1) : SAVE.flag.b.$option_epilepsy ? 1 : 2;
            archiver.glitcher.offset = offs;
            archiver.glitcher.red = [ offs, offs ];
            archiver.glitcher.green = [ 0, 0 ];
            archiver.glitcher.blue = [ -offs, -offs ];
            if (stable) {
               archiver.glitcher.slices = 40;
            } else {
               archiver.glitcher.slices = 10;
               if (game.music?.stopped === false) {
                  const n = 0.1;
                  const x = 1.9;
                  const s = 0.1;
                  const r = CosmosMath.remap(Math.random(), n, x);
                  const rr = (r - n) / (x - n);
                  game.music.rate.value = r;
                  game.music.rate.modulate(
                     renderer,
                     7000,
                     CosmosMath.remap(CosmosMath.bezier(Math.random(), 0, rr, rr, rr, rr, 1), n - s, x + s)
                  );
                  const duration = game.music.source!.buffer?.duration;
                  if (duration) {
                     const rt = CosmosMath.remap(Math.random(), 0.1, 6.9);
                     const ls = game.music.position;
                     game.music.source!.loopStart = ls;
                     game.music.source!.loopEnd = (ls + rt) % duration;
                  }
               }
            }
         }
         archiver.glitcher.refresh();
      } else if (fl.includes(archiver.glitcher)) {
         fl.splice(fl.indexOf(archiver.glitcher), 1);
         archiver.nextfx = renderer.time + 1000 + Math.random() * 6000;
      }
   },
   filter: new AdvancedBloomFilter({
      threshold: 0.7,
      bloomScale: 0.6,
      brightness: 1,
      quality: 5,
      pixelSize: 0.5
   }),
   glitcher: new GlitchFilter({ slices: 40, offset: 1, direction: 0, red: [ 1, 1 ], green: [ 0, 0 ], blue: [ -1, -1 ] })
};

export const hueshifter = {
   active: false,
   ticker () {
      hueshifter.filter.hue = saver.time / 5;
   },
   filter: new HslAdjustmentFilter(),
   rooms: [
      'c_start',
      'c_road1',
      'c_elevator1',
      'c_pacing',
      'c_courtyard',
      'c_alley',
      'c_story',
      'c_elevator2',
      'c_road2'
   ]
};

export const monologuer = {
   c: [] as number[],
   r: false,
   x: false,
   async aw (target: number, check: () => boolean, rum = game.room) {
      if (!monologuer.x && world.genocide && SAVE.data.n.plot === 70 && !monologuer.c.includes(target)) {
         monologuer.c.push(target);
         await renderer.when(() => game.room === rum && check() && game.movement);
         if (SAVE.flag.n.ga_asrielMonologueX > 0) {
            await dialogue('auto', ...text.a_citadel.genotext.monologueY);
            monologuer.x = true;
         } else {
            const index = (monologuer.r ? SAVE.flag.n.ga_asrielMonologue : ++SAVE.flag.n.ga_asrielMonologue) - 1;
            await dialogue('auto', ...(text.a_citadel.genotext.monologue[index]?.(monologuer.r) ?? []));
            monologuer.r = false;
         }
      }
   }
};

export const cityRooms = {
   c_elevator1: -320,
   c_courtyard: 1640,
   c_asgore_front: 2640,
   c_story: 2640
} as Partial<CosmosKeyed<number, CitadelRoomKey>>;

export const cityships = [
   { propulsion: 0, speed: 8, cycle: 0, spread: 2 },
   { propulsion: 1, speed: 4, cycle: 32, spread: 4 },
   { propulsion: 2, speed: 3, cycle: 60, spread: 4 },
   { propulsion: 3, speed: 6, cycle: 120, spread: 4 },
   { propulsion: 2, speed: 7, cycle: 140, spread: 4 },
   { propulsion: 2, speed: 2, cycle: 40, spread: 4 },
   { propulsion: 0, speed: 5, cycle: 0, spread: 2 },
   { propulsion: 3, speed: 1, cycle: 100, spread: 4 },
   { propulsion: 2, speed: 9, cycle: 180, spread: 6 },
   { propulsion: 0, speed: 10, cycle: 0, spread: 6 },
   { propulsion: 0, speed: 0, cycle: 0, spread: 3 },
   { propulsion: 1, speed: 11, cycle: 68, spread: 6 }
];

export const citydarks = [
   content.iooCCity1dark,
   content.iooCCity2dark,
   content.iooCCity3dark,
   content.iooCCity4dark,
   content.iooCCity5dark
];

export const city = new CosmosObject({
   area: renderer.area,
   priority: 99999,
   metadata: { ship_speed: 1 },
   objects: (
      [
         [ content.iooCCity1, 400, 0x1f1f1f, -120, [ 0, 1, 2, 3 ] ],
         [ content.iooCCity2, 480, 0x4f4f4f, -100, [ 4, 5, 6, 7 ] ],
         [ content.iooCCity3, 640, 0x7f7f7f, -80, [ 8, 9, 10, 11 ] ],
         [ content.iooCCity4, 960, 0xafafaf, 0, [] ],
         [ content.iooCCity5, 1600, 0xdfdfdf, 0, [] ]
      ] as [CosmosImage, number, number, number, number[]][]
   ).map(([ frame, width, tint, floorY, ships ], index) => {
      return new CosmosSprite({
         position: { y: 120 },
         metadata: { width, index, dark: false },
         anchor: { y: 0 },
         frames: [ frame ],
         objects: ships.map((value, shipindex) => {
            const { propulsion, speed, cycle, spread } = cityships[value];
            const min = -50;
            const max = width + 100;
            return new CosmosAnimation({
               index: value,
               anchor: 0,
               resources: content.iooCCityship
            }).on('tick', function () {
               const speedM = CosmosMath.remap(speed / 11, 1, 5) * city.metadata.ship_speed;
               const totalX = (saver.time + 108000) * speedM;

               if (Math.floor(totalX / max) % spread === 0) {
                  this.alpha.value = 1;
               } else {
                  this.alpha.value = 0;
                  return;
               }

               const cycleM = cycle * city.metadata.ship_speed;

               const localX = totalX % max;
               const cycleX = cycleM === 0 ? 0 : totalX % cycleM;
               const currentrand = rand_rad(index * 8 + shipindex + ((Math.floor(totalX / max) / 100) % 1));

               const baseX = localX - cycleX;
               const baseY = floorY + (shipindex + currentrand.next()) * 10;
               const phase = cycleM === 0 ? 0 : cycleX / cycleM;

               // set x
               let x = baseX;
               switch (propulsion) {
                  case 1:
                     x += CosmosMath.bezier(phase / 2 + (phase < 0.5 ? 0 : 0.5), 0, 0, -0.5, 1.5, 1, 1) * cycleM;
                     break;
                  default:
                     x += cycleX;
               }
               if (currentrand.next() < 0.5) {
                  this.scale.x = 1;
                  this.position.x = min + x;
               } else {
                  this.scale.x = -1;
                  this.position.x = min + (max - x);
               }

               // set y
               let y = baseY;
               switch (propulsion) {
                  case 2:
                     y += (CosmosMath.wave(phase) * 2 - 1) * speedM * 2;
                     break;
                  case 3:
                     y += CosmosMath.linear(phase, 1, -1, 1) * speedM * 2;
                     break;
               }
               this.position.y = y;
            });
         })
      }).on('tick', function () {
         if (world.genocide && SAVE.data.b.armaloop) {
            this.tint = CosmosImageUtils.gradient(
               tint + 0x200000,
               0xff0000,
               CosmosMath.wave((saver.time % 120) / 120) * 0.25
            );
            this.offsets[1].set(Math.random() / 2 - 0.25, Math.random() / 2 - 0.25);
         } else if (world.genocide || world.bad_robot || SAVE.data.b.svr || world.runaway) {
            if (!this.metadata.dark) {
               this.metadata.dark = true;
               this.frames[0] = citydarks[this.metadata.index];
               this.tint = CosmosImageUtils.gradient(0, tint, 0.25);
            }
            this.offsets[1].set(0, 0);
         } else {
            this.tint = tint + 0x000020;
            this.offsets[1].set(0, 0);
         }
      });
   }),
   filters: [ new AdvancedBloomFilter({ threshold: 0, bloomScale: 0.2, brightness: 1, quality: 10 }) ]
}).on('tick', function () {
   if (world.genocide && SAVE.data.b.armaloop) {
      this.metadata.ship_speed = 2;
   } else if (world.genocide || world.bad_robot || SAVE.data.b.svr || world.runaway) {
      this.metadata.ship_speed = 0;
   } else {
      this.metadata.ship_speed = 1;
   }
   const exterior = cityRooms[game.room as CitadelRoomKey];
   if (exterior) {
      const x = (exterior + (game.camera.position.clamp(...renderer.region).x - 160)) / 4280;
      for (const spr of this.objects as CosmosSprite<CosmosBaseEvents, { width: number; index: number }>[]) {
         spr.offsets[0].set(x * (320 - spr.metadata.width), 0);
      }
   } else {
      renderer.detach('base', this);
   }
});

export async function armaloop () {
   const arma = music.approach.instance(renderer, Math.min(SAVE.data.n.armaloop, 230.4), true);
   if (game.room[0] !== 'c') {
      arma.gain.value = 0;
      arma.rate.value = 0;
   }
   arma.source!.loopStart = 236.8;
   arma.source!.loopEnd = 249.6;
   while (!arma.stopped) {
      const to = (await events.on('teleport-start'))[1];
      if (to[0] === 'c') {
         await events.on('teleport');
         arma.rate.value = 1;
         arma.gain.modulate(renderer, (1 - arma.gain.value / arma.daemon.gain) * 300, arma.daemon.gain);
      } else {
         await arma.gain.modulate(renderer, (arma.gain.value / arma.daemon.gain) * 300, 0);
         arma.rate.value = 0;
      }
   }
}

export const choicerooms = [ 'c_start', 'c_road1', 'c_elevator1', 'c_story', 'c_elevator2', 'c_courtroom' ];

export async function choiceloop (choice: CosmosInstance) {
   while (!choice.stopped) {
      const to = (await events.on('teleport-start'))[1];
      if (choicerooms.includes(to)) {
         await events.on('teleport');
         choice.gain.modulate(renderer, (1 - choice.gain.value / choice.daemon.gain) * 300, choice.daemon.gain);
      } else {
         await choice.gain.modulate(renderer, (choice.gain.value / choice.daemon.gain) * 300, 0);
      }
   }
}

export function archiveBattle (group: OutertaleGroup, dest: string, face: CosmosDirection) {
   const handler = async () => {
      events.off('battle-exit', handler);
      const { x = 0, y = 0 } = rooms.of(dest).spawn;
      SAVE.data.n.state_citadel_archive++;
      await Promise.all([
         renderer.pause(2500),
         teleport(dest, face, x, y, { fade: false, fast: true, cutscene: true })
      ]);
      world.cutscene_override = false;
      game.music = music.archive.instance(renderer, archiver.offset, true);
      renderer.alpha.value = 1;
      SAVE.data.n.hp = Math.max(SAVE.data.n.hp, 20);
      game.movement = true;
      engageDelay();
   };
   events.on('battle-exit', handler);
   game.music?.stop();
   return battler.encounter(player, group, true, true);
}

export function cs_unlocked () {
   return (
      cs_puzzle[0].x === 0 &&
      cs_puzzle[0].y === 0 &&
      cs_puzzle[1].x === 0 &&
      cs_puzzle[1].y === 0 &&
      cs_puzzle[2].x === 0 &&
      cs_puzzle[2].y === 0
   );
}

export const areaC = {
   tick () {},
   scripts: {
      async bastionTerm () {
         if (!game.movement) {
            return;
         }
         const inst = instance('main', 'termAlphys');
         if (inst && interactionCheck(inst.object as CosmosHitbox)) {
            return;
         }
         await dialogue('auto', ...text.a_citadel.overworld.bastionTerm());
      },
      async stoveinter () {
         if (!game.movement) {
            return;
         }
         const inst = instance('main', 'picnic_papyrus');
         if (inst && interactionCheck(inst.object as CosmosHitbox)) {
            return;
         }
         await dialogue('auto', ...text.a_citadel.trivia.c_ak_stove());
      },
      async garden_ex () {
         if (!game.movement) {
            return;
         }
         const inst = instance('main', 'picnic_rabbit');
         if (inst && interactionCheck(inst.object.objects[1] as CosmosHitbox)) {
            return;
         }
         await dialogue('auto', ...text.a_citadel.trivia.garden());
      },
      async final_frontier () {
         /** SELECTION */
         if (!game.movement) {
            return;
         }
         game.movement = false;
         await dialogue('auto', ...text.a_citadel.story.finaltext1());
         if (choicer.result === 0) {
            player.face = 'left';
            player.position.x -= 3;
            game.movement = true;
            return;
         }
         const daemone = SAVE.data.b.svr ? music.uwa : music.reunited;
         if (!SAVE.data.b.oops && !SAVE.data.b.svr) {
            await renderer.pause(2000);
            await dialogue('auto', ...text.a_citadel.story.finaltext2);
            if (choicer.result === 0) {
               player.face = 'left';
               player.position.x -= 3;
               game.movement = true;
               return;
            }
            await renderer.pause(2000);
            await dialogue('auto', ...text.a_citadel.story.finaltext3);
            if (choicer.result === 0) {
               player.face = 'left';
               player.position.x -= 3;
               game.movement = true;
               return;
            }
            renderer.alpha.value = 0;
            SAVE.data.b.ufokinwotm8 = true;
            daemone.stop();
            content.amReunited.unload();
            oops();
            await renderer.pause(3000);
         } else {
            await Promise.all([
               renderer.alpha.modulate(renderer, 3000, 0),
               daemone.instances[0].gain.modulate(renderer, 3000, 0)
            ]);
            daemone.stop();
            if (SAVE.data.b.svr) {
               renderer.detach('main', goatbroTrue);
               inventories.svrAssets.unload();
            } else {
               content.amReunited.unload();
            }
         }
         await Promise.all([
            renderer.pause(2000),
            teleport('_hangar', 'up', SAVE.data.b.svr ? 149.5 : 200, 215, { fade: false, fast: true, cutscene: true })
         ]);
         for (const facer of Object.values(goatbroTrue.preset.walk)) {
            facer.reset();
         }
         renderer.layers.base.container.filters = [
            new AdvancedBloomFilter({ threshold: 0, brightness: 1, bloomScale: 1, quality: 10 })
         ];
         const ent = SAVE.data.b.svr
            ? character('asriel1', characters.asrielTrue, { x: 170.5, y: 215 }, 'up')
            : character('asgore', characters.asgore, { x: 160, y: 215 }, 'up');
         quickresume();
         game.music!.gain.value = 0;
         const part1assets = new CosmosInventory(
            content.iocTorielDown,
            content.iocTorielUp,
            content.iocTorielLeft,
            content.iocTorielRight,
            content.iocTorielUpTalk,
            content.iocTorielLeftTalk,
            content.iocTorielRightTalk,
            content.iocTorielDownTalk,
            content.iocAsgoreDown
         );
         part1assets.name = 'part1assets';
         const part2assets = new CosmosInventory(
            inventories.iocPapyrus,
            inventories.iocSans,
            inventories.idcSans,
            content.avSans,
            inventories.iocUndyneDate,
            inventories.iocAlphys,
            inventories.idcAlphys,
            content.avAlphys
         );
         part2assets.name = 'part2assets';
         const part3assets = new CosmosInventory(
            inventories.iocNapstablook,
            content.avNapstablook,
            content.iocMettatonRollup1,
            content.iocMettatonRollup2,
            inventories.avMettaton,
            inventories.iocKidd,
            inventories.idcKidd,
            content.avKidd
         );
         part2assets.name = 'part3assets';
         const part1loader = SAVE.data.b.svr ? void 0 : part1assets.load();
         await Promise.all([
            renderer.alpha.modulate(renderer, 3000, 1),
            game.music!.gain.modulate(renderer, 3000, game.music!.daemon.gain)
         ]);
         await renderer.pause(2000);
         await dialogue('dialoguerTop', ...text.a_citadel.story.hangar1());
         await antifreeze([ part1loader, renderer.pause(4000) ]);
         const part2loader = SAVE.data.b.svr ? void 0 : part2assets.load();
         await dialogue('dialoguerTop', ...text.a_citadel.story.hangar2());
         let tori: CosmosCharacter | null = null;
         if (SAVE.data.b.svr) {
            await renderer.pause(2000);
            await dialogue('dialoguerTop', ...text.a_citadel.story.hangar3());
         } else {
            tori = character('toriel', characters.toriel, { x: 215, y: 320 }, 'up');
            await tori.walk(renderer, 3, { y: 240 });
            notifier(ent, true, 66);
            await dialogue('dialoguerTop', ...text.a_citadel.story.hangar3());
            await Promise.all([
               tori.walk(renderer, 1.5, { x: 230 }, { y: 215 }),
               dialogue('dialoguerTop', ...text.a_citadel.story.hangar4)
            ]);
            await renderer.pause(2000);
            await dialogue('dialoguerTop', ...text.a_citadel.story.hangar5);
            await renderer.pause(4000);
            await dialogue('dialoguerTop', ...text.a_citadel.story.hangar6());
            await renderer.pause(3000);
            await dialogue('dialoguerTop', ...text.a_citadel.story.hangar7());
            await renderer.pause(1500);
            await dialogue('dialoguerTop', ...text.a_citadel.story.hangar8());
            await antifreeze([ part2loader, renderer.pause(2500) ]);
            const part3loader = part3assets.load();
            const paps = character('papyrus', characters.papyrus, { x: 170, y: 320 }, 'up');
            await paps.walk(renderer, 4, { y: 240 });
            ent.face = 'down';
            notifier(ent, true, 66);
            tori.face = 'down';
            notifier(tori, false);
            await dialogue('dialoguerTop', ...text.a_citadel.story.hangar9);
            await paps.walk(renderer, 3, { x: 115 });
            ent.face = 'up';
            tori.face = 'up';
            await paps.walk(renderer, 3, { y: 215 });
            await renderer.pause(2500);
            await dialogue('dialoguerTop', ...text.a_citadel.story.hangar10);
            const sand = character('sans', characters.sans, { x: 260, y: 320 }, 'up');
            await sand.walk(renderer, 3, { y: 230 });
            await dialogue('dialoguerTop', ...text.a_citadel.story.hangar11);
            await renderer.pause(500);
            await dialogue('dialoguerTop', ...text.a_citadel.story.hangar12);
            await renderer.pause(1000);
            await dialogue('dialoguerTop', ...text.a_citadel.story.hangar13);
            await renderer.pause(3000);
            await dialogue('dialoguerTop', ...text.a_citadel.story.hangar14);
            const fish = character('undyne', characters.undyneDate, { x: 140, y: 320 }, 'up');
            await fish.walk(renderer, 3, { y: 240 });
            await dialogue('dialoguerTop', ...text.a_citadel.story.hangar15);
            const alph = character('alphys', characters.alphys, { x: 140, y: 320 }, 'up');
            await Promise.all([
               fish.walk(renderer, 2, { x: 90 }, { y: 215 }),
               alph.walk(renderer, 3, { y: 240 }).then(async () => {
                  await dialogue('dialoguerTop', ...text.a_citadel.story.hangar16);
                  await Promise.all([
                     alph.walk(renderer, 1.5, { x: 65 }, { y: 230 }),
                     dialogue('dialoguerTop', ...text.a_citadel.story.hangar17)
                  ]);
               })
            ]);
            await renderer.pause(1000);
            await dialogue('dialoguerTop', ...text.a_citadel.story.hangar18);
            await renderer.pause(500);
            await dialogue('dialoguerTop', ...text.a_citadel.story.hangar19());
            await renderer.pause(3000);
            await dialogue('dialoguerTop', ...text.a_citadel.story.hangar20);
            await renderer.pause(1500);
            await dialogue('dialoguerTop', ...text.a_citadel.story.hangar21);
            await renderer.pause(7500);
            await dialogue('dialoguerTop', ...text.a_citadel.story.hangar22);
            await antifreeze([ part3loader, renderer.pause(3000) ]);
            const naps = character('napstablook', characters.napstablook, { x: 240, y: 320 }, 'up');
            await naps.walk(renderer, 2, { y: 240 });
            await dialogue('dialoguerTop', ...text.a_citadel.story.hangar23);
            await renderer.pause(1000);
            await naps.walk(renderer, 1, { x: 290 }, { y: 230 });
            await renderer.pause(5000);
            await dialogue('dialoguerTop', ...text.a_citadel.story.hangar24);
            await renderer.pause(3000);
            await dialogue('dialoguerTop', ...text.a_citadel.story.hangar25);
            await renderer.pause(1000);
            await dialogue('dialoguerTop', ...text.a_citadel.story.hangar26);
            const mett = character(
               'mettatonnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn',
               characters.mettaton4C,
               { x: 30, y: 320 },
               'up'
            );
            mett.sprite.enable();
            await mett.position.step(renderer, 3, { y: 230 });
            mett.sprite.reset();
            await dialogue('dialoguerTop', ...text.a_citadel.story.hangar27);
            await renderer.pause(500);
            await dialogue('dialoguerTop', ...text.a_citadel.story.hangar28);
            await renderer.pause(1000);
            await dialogue('dialoguerTop', ...text.a_citadel.story.hangar29);
            await renderer.pause(3000);
            await dialogue('dialoguerTop', ...text.a_citadel.story.hangar30);
            await renderer.pause(4000);
            await dialogue('dialoguerTop', ...text.a_citadel.story.hangar31);
            ent.walk(renderer, 3, { y: 320 });
            await renderer.pause(1000);
            player.walk(renderer, 3, { x: ent.position.x }, { y: 320 });
            await renderer.pause(1500);
            await dialogue('dialoguerTop', ...text.a_citadel.story.hangar32);
            paps.walk(renderer, 4, { y: 320 });
            await renderer.pause(500);
            await dialogue('dialoguerTop', ...text.a_citadel.story.hangar33);
            sand.walk(renderer, 3, { y: 320 });
            await renderer.pause(1500);
            await dialogue('dialoguerTop', ...text.a_citadel.story.hangar34);
            fish.walk(renderer, 3, { y: 320 });
            await renderer.pause(500);
            await dialogue('dialoguerTop', ...text.a_citadel.story.hangar35);
            alph.walk(renderer, 3, { y: 320 });
            await renderer.pause(2000);
            await dialogue('dialoguerTop', ...text.a_citadel.story.hangar36);
            mett.preset = characters.mettaton4C;
            mett.face = 'right';
            mett.sprite.duration = 3;
            mett.sprite.enable();
            mett.position.step(renderer, 3, { y: 320 });
            await renderer.pause(1500);
            await dialogue('dialoguerTop', ...text.a_citadel.story.hangar37);
            naps.walk(renderer, 2, { y: 320 });
            const mkid = character('kidd', characters.kidd, { x: 160, y: 320 }, 'up');
            if (!SAVE.data.b.f_state_kidd_betray) {
               await renderer.pause(3000);
               await mkid.walk(renderer, 4, { y: 235 });
               await dialogue('dialoguerTop', ...text.a_citadel.story.hangar38);
               await renderer.pause(1500);
               mkid.walk(renderer, 4, { y: 320 });
            }
            await renderer.pause(4000);
            await dialogue('dialoguerTop', ...text.a_citadel.story.hangar39);
            await renderer.pause(500);
            await dialogue('dialoguerTop', ...text.a_citadel.story.hangar40);
            renderer.detach('main', paps, sand, fish, alph, naps, mett, mkid);
         }
         await Promise.all([ renderer.alpha.modulate(renderer, 5000, 0), game.music!.gain.modulate(renderer, 5000, 0) ]);
         game.music?.stop();
         renderer.layers.base.container.filters = [];
         renderer.detach('main', ent, ...(tori === null ? [] : [ tori ]));
         part1assets.unload();
         part2assets.unload();
         part3assets.unload();

         /** SETUP */
         const ff = systemsText.extra.final_frontier;
         const oppos = Object.fromEntries(battler.opponentRegistry.entries()) as CosmosKeyed<
            OutertaleOpponent,
            keyof typeof ff.opponents
         >;
         const xleft = 85;
         const xright = 235;
         const genOpponent = (
            key: keyof typeof ff.opponents,
            x: number,
            y: number,
            h: number,
            spared: boolean,
            { offset = { x: 0, y: 0 } as CosmosPointSimple, volatile = {} as any } = {},
            keyoverride = key
         ) => {
            const oppo = oppos[key];
            const bullied = oppo.bullied();
            const flirted = oppo.flirted();
            const oppotext = ff.opponents[keyoverride];
            const desctext = bullied
               ? oppotext.text.bully
               : flirted
               ? oppotext.text.flirt
               : spared
               ? oppotext.text.spare
               : oppotext.text.basic;
            return new CosmosObject({
               position: { x, y },
               objects: [
                  new CosmosText({
                     anchor: { x: 0 },
                     content: oppotext.name,
                     fontSize: 24
                  }),
                  new CosmosText({
                     anchor: { x: 0 },
                     content: oppotext.author,
                     fontSize: 8,
                     position: { y: 20 }
                  }),
                  new CosmosObject({
                     objects: [ oppo.sprite(volatile) ],
                     position: { x: offset.x, y: offset.y + h }
                  }),
                  ...desctext.split('\n').map(
                     (line, index) =>
                        new CosmosText({
                           anchor: { x: 0 },
                           content: line,
                           fill: bullied ? 0x3f00ff : spared ? 0xffff00 : 0xffffff,
                           fontSize: 16,
                           stroke: flirted ? 0xcf7fff : -1,
                           position: { y: h + 2 + index * 14 }
                        })
                  )
               ]
            });
         };
         const sword = (
            text: { name: string; author: string },
            x: number,
            y: number,
            { startx = x, starty = y } = {},
            { endx = startx, endy = starty } = {}
         ) => {
            return new CosmosObject({
               alpha: 0,
               metadata: { fader: false },
               fontFamily: content.fDeterminationSans,
               objects: [
                  new CosmosText({ anchor: { x: 0 }, content: text.name, fontSize: 24 }),
                  new CosmosText({ anchor: { x: 0 }, content: text.author, fontSize: 8, position: { y: 20 } })
               ]
            }).on('tick', function () {
               if (this.metadata.fader) {
                  this.alpha.value > 0 && (this.alpha.value -= 0.05) < 0 && (this.alpha.value = 0);
               } else {
                  this.alpha.value < 1 && (this.alpha.value += 0.05) > 1 && (this.alpha.value = 1);
               }
               const bez = CosmosMath.bezier(this.alpha.value, 0, 1, 1);
               if (this.metadata.fader) {
                  this.position.set(CosmosMath.remap(bez, endx, x), CosmosMath.remap(bez, endy, y) - 12.5);
               } else {
                  this.position.set(CosmosMath.remap(bez, startx, x), CosmosMath.remap(bez, starty, y) - 12.5);
               }
            });
         };

         /** SECTION 1A */
         await Promise.all([ content.ieSplashForeground.load(), content.amCredits1.load(), renderer.pause(4000) ]);
         const fd = fader({ alpha: 1 });
         const creditsDisplay = new CosmosObject({
            fill: 0xffffff,
            fontFamily: content.fDeterminationSans,
            objects: [
               frontEnder.createBackground(),
               new CosmosSprite({ position: { y: -40 }, frames: [ content.ieSplashForeground ] }),
               new CosmosText({ anchor: { x: 0 }, content: ff.header, fontSize: 24, position: { x: 160, y: 160 } })
            ]
         });
         const resetDisplay = () => {
            creditsDisplay.gravity.y = 0;
            creditsDisplay.velocity.y = 0;
            creditsDisplay.position.y = 0;
            creditsDisplay.objects = [];
         };
         renderer.attach('menu', fd, creditsDisplay);
         renderer.alpha.value = 1;
         const seg117 = (60 / 117) * 16;
         const credits1 = music.credits1.instance(renderer);
         const c1stop = credits1.on('stop');
         let seconds = 0;
         const secTicker = () => {
            seconds += 1 / 30;
         };
         renderer.on('tick', secTicker);
         const frAssets1 = new CosmosInventory(
            oppos.froggit.assets,
            oppos.whimsun.assets,
            oppos.moldsmal.assets,
            oppos.migosp.assets,
            oppos.loox.assets,
            oppos.mushy.assets,
            content.ibcDummyFinalghost
         );
         frAssets1.name = 'frAssets1';
         await Promise.all([ frAssets1.load(), renderer.when(() => seg117 <= seconds) ]);

         /** SECTION 1B */
         {
            const y1 = (i: number) => 300 + 170 * i;
            const quickhat = new CosmosAnimation({
               alpha: 0,
               anchor: { y: 1, x: 0 },
               position: { x: 10, y: -72 },
               scale: { x: 1, y: 1 },
               resources: content.ibcNapstablookHat,
               index: 5
            });
            creditsDisplay.attach(
               genOpponent('froggit', xleft, y1(0), 95, SAVE.data.b.spared_froggit),
               genOpponent('whimsun', xright, y1(0), 95, SAVE.data.b.spared_whimsun, { offset: { x: 0, y: -16 } }),
               genOpponent('moldsmal', xleft, y1(1), 95, SAVE.data.b.spared_moldsmal),
               genOpponent('migosp', xright, y1(1), 95, SAVE.data.b.spared_migosp, { volatile: { sparable: true } }),
               genOpponent('loox', xleft, y1(2), 95, SAVE.data.b.spared_loox),
               genOpponent('mushy', xright, y1(2), 95, SAVE.data.b.spared_mushy, { volatile: { sparable: true } }),
               genOpponent('finalghost', 160, y1(3), 120, [ 0, 4, 6 ].includes(SAVE.data.n.state_wastelands_dummy))
            );
            creditsDisplay.velocity.y = -0.875;
            if (!world.sad_ghost) {
               await renderer.when(() => creditsDisplay.position.y < -y1(2));
               quickhat.alpha.modulate(renderer, 5000, 1);
            }
            await renderer.when(() => creditsDisplay.position.y < -y1(3));
            creditsDisplay.gravity.y = creditsDisplay.velocity.y / 10;
            await Promise.all([
               teleport('_credits1', 'down', 160, 280, { fade: false, fast: true, cutscene: true }),
               renderer.when(() => seg117 * 5 <= seconds)
            ]);
            resetDisplay();
         }
         frAssets1.unload();
         content.ieSplashForeground.unload();

         /** SECTION 1C */
         const frAssets2 = new CosmosInventory(
            oppos.stardrake.assets,
            oppos.spacetop.assets,
            oppos.jerry.assets,
            oppos.mouse.assets,
            oppos.doggo.assets,
            oppos.dogs.assets,
            oppos.lesserdog.assets,
            oppos.greatdog.assets
         );
         frAssets2.name = 'frAssets2';
         const frLoaderA = frAssets2.load();
         {
            const starfield_a = new CosmosRectangle({
               fill: 0,
               size: 1000,
               priority: 1000,
               position: { y: -160 },
               anchor: 0,
               metadata: {
                  init: false,
                  gr: new Graphics(),
                  particles: CosmosUtils.populate(5, (i): [number, [number, number, number][]] => [
                     i,
                     CosmosUtils.populate(20, (): [number, number, number] => [
                        -10 + Math.random() * 330,
                        Math.random() * 96,
                        Math.random() * 8 + 2
                     ])
                  ])
               },
               filters: [ filters.bloomX ]
            }).on('tick', function () {
               const gr = this.metadata.gr;
               if (this.metadata.init) {
                  gr.clear();
               } else {
                  this.metadata.init = true;
                  this.container.addChild(gr);
               }
               for (const [ size, list ] of this.metadata.particles) {
                  const al = ((1 - size / 4) * 0.9 + 0.1) ** 2;
                  const wh = 0.75 + size / 8;
                  const w2 = wh / 2;
                  gr.beginFill(0xffffff, al);
                  for (const p of list) {
                     p[0] -= p[2];
                     if (p[0] < -10) {
                        p[0] += 330;
                        p[1] = Math.random() * 96;
                     }
                     gr.drawRect(p[0] - w2, p[1] - w2, wh, wh);
                  }
                  gr.endFill().beginFill(0xffffff, al / 4);
                  for (const p of list) {
                     gr.drawRect(p[0] - w2, p[1] - w2 / 2, wh * p[2] * 2, wh / 2);
                  }
                  gr.endFill();
               }
            });
            renderer.attach('base', starfield_a);
            const region0a = new CosmosPoint(renderer.region[0]);
            const region1a = new CosmosPoint(renderer.region[1]);
            renderer.region[0] = region0a;
            renderer.region[1] = region1a;
            player.alpha.value = 0;
            fd.alpha.value = 0;
            region0a.modulate(renderer, 1500, { y: 120 });
            region1a.modulate(renderer, 1500, { y: 120 });
            starfield_a.position.modulate(renderer, 1500, { y: 0 });
            await renderer.pause(1000);
            const papy = new CosmosAnimation({
               active: true,
               resources: content.iocPapyrusCape,
               anchor: { x: 0, y: 1 },
               scale: { x: -1 },
               subcrop: { bottom: -40 },
               position: { y: -4 }
            });
            const hovertop = new CosmosAnimation({
               active: true,
               resources: content.iooHovercar,
               anchor: { x: 0, y: 1 }
            });
            const hovercar = new CosmosAnimation({
               active: true,
               resources: content.iooHovercarBack,
               anchor: { x: 0, y: 1 },
               position: { x: -36, y: 105 },
               velocity: { x: 6 },
               objects: [ papy, hovertop ]
            }).on('tick', function () {
               papy.offsets[0].y = [ 0, 0, -1, -3, -4, -4, -3, -1 ][this.index];
            });
            const bird = new CosmosAnimation({
               priority: -1000,
               active: true,
               resources: content.ionFBirdFly,
               anchor: { x: 0, y: 1 },
               position: { y: 40 },
               velocity: { x: 7 },
               scale: { x: -1 },
               metadata: { tiume: renderer.time }
            }).on('tick', function () {
               this.offsets[0].y = sineWaver(this.metadata.tiume, 1000, -3, 3);
            });
            const snad = new CosmosAnimation({
               active: true,
               anchor: { x: 0, y: 1 },
               position: { y: 105 },
               velocity: { x: 8.5 },
               resources: content.iooTrike1
            });
            const fcam = new CosmosObject({ velocity: { x: 6 } });
            const azr1 = new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               position: { y: 70 },
               metadata: { spawn: false },
               resources: content.iocAsrielUp
            });
            const huma = instance('main', 'hoooooooooooooooooman')!.object;
            const camtick1 = {
               priority: -193581395135,
               listener: () => {
                  if (game.camera.position.x + game.camera.velocity.x > 460) {
                     hovercar.position.x -= 240;
                     bird.position.x -= 240;
                     snad.position.x -= 240;
                     fcam.position.x -= 240;
                     azr1.position.x -= 240;
                     huma.position.x -= 240;
                     if (azr1.metadata.spawn) {
                        azr1.metadata.spawn = false;
                        azr1.position.x = 570;
                        renderer.attach('main', azr1);
                     }
                  }
               }
            };
            renderer.on('tick', camtick1);
            renderer.attach('main', hovercar);
            game.camera = hovercar;
            await renderer.pause(500);
            const s1 = sword(ff.swords.papyrus, xleft, 200, { startx: xleft - 20 }, { endx: xleft + 20 });
            creditsDisplay.attach(s1);
            await renderer.pause(1500);
            bird.position.x = hovercar.position.x - 200;
            renderer.attach('below', bird);
            await renderer.pause(4500);
            snad.position.x = hovercar.position.x - 200;
            renderer.attach('main', snad);
            const s2 = sword(ff.swords.sans, xright, 200, { startx: xright - 20 }, { endx: xright + 20 });
            renderer.pause(1000).then(() => creditsDisplay.attach(s2));
            await renderer.when(() => hovercar.position.x - 120 <= snad.position.x);
            snad.position.x = hovercar.position.x - 120;
            snad.velocity.y = 1.5;
            await renderer.when(() => hovercar.position.y + 20 <= snad.position.y);
            snad.velocity.y = 0;
            snad.position.y = hovercar.position.y + 20;
            await renderer.when(() => hovercar.position.x - 30 <= snad.position.x);
            snad.position.x = hovercar.position.x - 30;
            snad.velocity.x = 6;
            await renderer.pause(1000);
            papy.scale.x = 1;
            papy.reset().use(content.iocPapyrusDown);
            SAVE.data.b.svr && (azr1.metadata.spawn = true);
            await renderer.pause(1500);
            snad.velocity.x = 8.5;
            snad.resources = content.iooTrike2;
            papy.use(content.iocPapyrusStomp).enable();
            await renderer.pause(1000);
            s1.metadata.fader = true;
            s2.metadata.fader = true;
            await renderer.pause(500);
            fcam.position.set(hovercar);
            renderer.attach('below', fcam);
            game.camera = fcam;
            papy.use(content.iocPapyrusRightMadTalk);
            hovercar.extrapolate = false;
            hovercar.duration = 2;
            hovertop.extrapolate = false;
            hovertop.duration = 2;
            await hovercar.velocity.modulate(renderer, 500, { x: 3 }, { x: 3 });
            hovercar.velocity.modulate(renderer, 1000, { x: 20 });
            await Promise.all([
               frLoaderA,
               region0a.modulate(renderer, 1500, { y: 280 }),
               region1a.modulate(renderer, 1500, { y: 280 }),
               starfield_a.position.modulate(renderer, 1500, { y: -160 }),
               renderer.when(() => seg117 * 7 <= seconds)
            ]);
            fd.alpha.value = 1;
            player.alpha.value = 1;
            renderer.detach('base', starfield_a);
            renderer.detach('below', bird, fcam);
            renderer.detach('main', hovercar, snad, azr1);
            renderer.off('tick', camtick1);
            resetDisplay();
            game.camera = player;
         }

         /** SECTION 2A */
         const frLoaderB = content.amCredits2.load();
         {
            const y2 = (i: number) => 240 + 220 * i;
            const sparedDoggo = SAVE.data.n.state_starton_doggo === 0;
            const lesserdogVars = { creditstretch: false, hurt2: false, mercymod: 0 };
            creditsDisplay.attach(
               genOpponent(
                  'stardrake',
                  xleft,
                  y2(0),
                  130,
                  SAVE.data.b.s_state_chilldrake ? SAVE.data.b.spared_chilldrake : SAVE.data.b.spared_stardrake,
                  void 0,
                  SAVE.data.b.s_state_chilldrake ? 'chilldrake' : 'stardrake'
               ),
               genOpponent('spacetop', xright, y2(0), 130, SAVE.data.b.spared_spacetop),
               genOpponent('mouse', xleft, y2(1), 130, SAVE.data.b.spared_mouse, {
                  volatile: { sparable: SAVE.data.b.spared_mouse }
               }),
               genOpponent('doggo', xright, y2(1), 130, sparedDoggo, {
                  volatile: { sparable: sparedDoggo, vars: { wan: sparedDoggo } }
               }),
               genOpponent('dogs', 160, y2(2), 130, SAVE.data.n.state_starton_dogs === 0, {
                  offset: { x: -47.5, y: 0 }
               }),
               genOpponent('lesserdog', xleft, y2(3), 130, SAVE.data.n.state_starton_lesserdog === 0, {
                  offset: { x: -37.5, y: 0 },
                  volatile: { vars: lesserdogVars }
               }),
               genOpponent('greatdog', xright, y2(3), 130, SAVE.data.n.state_starton_greatdog === 0, {
                  volatile: { vars: { ignores: 0 } }
               }),
               genOpponent('jerry', 160, y2(4), 80, SAVE.data.b.spared_jerry)
            );
            creditsDisplay.velocity.y = -1.1;
            await renderer.when(() => creditsDisplay.position.y < -y2(2.5));
            SAVE.data.n.state_starton_lesserdog === 0 && (lesserdogVars.creditstretch = true);
            await renderer.when(() => creditsDisplay.position.y < -y2(4));
            creditsDisplay.gravity.y = creditsDisplay.velocity.y / 10;
            await Promise.all([
               frLoaderB,
               teleport('_credits2', 'down', 160, 120, { fade: false, fast: true, cutscene: true }),
               c1stop
            ]);
            resetDisplay();
         }
         frAssets2.unload();
         content.amCredits1.unload();

         /** SECTION 2B */
         const seg134 = (60 / 134) * 16;
         const credits2 = music.credits2.instance(renderer);
         const c2stop = credits2.on('stop');
         seconds = 0;
         const frAssets3 = new CosmosInventory(
            oppos.woshua.assets,
            oppos.moldbygg.assets,
            oppos.radtile.assets,
            oppos.shyren.assets,
            oppos.doge.assets,
            oppos.muffet.assets
         );
         frAssets3.name = 'frAssets3';
         const frLoaderC = frAssets3.load();
         {
            const starfield_b = new CosmosRectangle({
               fill: 0,
               size: 1000,
               priority: 1000,
               position: { x: -160 },
               anchor: 0,
               metadata: {
                  init: false,
                  gr: new Graphics(),
                  particles: CosmosUtils.populate(5, (i): [number, [number, number, number][]] => [
                     i,
                     CosmosUtils.populate(35, (): [number, number, number] => [
                        Math.random() * 168,
                        -10 + Math.random() * 330,
                        Math.random() * 8 + 2
                     ])
                  ])
               },
               filters: [ filters.bloomX ]
            }).on('tick', function () {
               const gr = this.metadata.gr;
               if (this.metadata.init) {
                  gr.clear();
               } else {
                  this.metadata.init = true;
                  this.container.addChild(gr);
               }
               for (const [ size, list ] of this.metadata.particles) {
                  const al = ((1 - size / 4) * 0.9 + 0.1) ** 2;
                  const wh = 0.75 + size / 8;
                  const w2 = wh / 2;
                  gr.beginFill(0xffffff, al);
                  for (const p of list) {
                     p[1] -= p[2];
                     if (p[1] < -10) {
                        p[1] += 330;
                        p[0] = Math.random() * 168;
                     }
                     p[1] > 160 && gr.drawRect(p[0] - w2, p[1] - w2, wh, wh);
                  }
                  gr.endFill().beginFill(0xffffff, al / 4);
                  for (const p of list) {
                     p[1] > 160 && gr.drawRect(p[0] - w2 / 2, p[1] - w2, wh / 2, wh * p[2] * 2);
                  }
                  gr.endFill();
               }
            });
            renderer.attach('base', starfield_b);
            const region0b = new CosmosPoint(renderer.region[0]);
            const region1b = new CosmosPoint(renderer.region[1]);
            renderer.region[0] = region0b;
            renderer.region[1] = region1b;
            player.alpha.value = 0;
            fd.alpha.value = 0;
            region0b.modulate(renderer, 1500, { x: 160 });
            region1b.modulate(renderer, 1500, { x: 160 });
            starfield_b.position.modulate(renderer, 1500, { x: 0 });
            const fishsitter = new OutertaleMultivisualObject({}, { anchor: { x: 0, y: 1 } });
            const fishheader = new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneSithead });
            const fisho = new CosmosObject({ objects: [ fishsitter, fishheader ], position: { x: 95, y: 150 } });
            renderer.attach('main', fisho);
            fishsitter.use(content.iocUndyneSitred);
            await renderer.pause(500);
            const lizardo = new OutertaleMultivisualObject({ position: { x: 65, y: 0 } }, { anchor: { x: 0, y: 1 } });
            renderer.attach('main', lizardo);
            lizardo.use(content.iocAlphysDown);
            lizardo.animation.extrapolate = false;
            lizardo.animation.duration = 5;
            lizardo.animation.enable();
            const s1 = sword(ff.swords.undyne, 240, 80, { startx: 260 });
            renderer.pause(1000).then(() => creditsDisplay.attach(s1));
            await lizardo.position.step(renderer, 3, { y: 140 });
            lizardo.animation.reset();
            lizardo.position.y = 145;
            lizardo.use(content.iocAlphysSit);
            await renderer.pause(1000);
            const s2 = sword(ff.swords.alphys, 240, 160, { startx: 260 });
            creditsDisplay.attach(s2);
            fishheader.index = 1;
            await renderer.pause(1500);
            fishsitter.use(content.iocUndyneSitside);
            const distance = fisho.position.x - lizardo.position.x - 17.5;
            for (const target of [
               fisho.position.x - distance / 3,
               fisho.position.x - distance / 1.5,
               fisho.position.x - distance
            ]) {
               fishsitter.animation.enable();
               await fisho.position.modulate(renderer, 500, { x: target });
               fishsitter.animation.reset();
               await renderer.pause(1000);
            }
            fishheader.index = 2;
            await renderer.pause(1500);
            await fishheader.position.modulate(renderer, 250, { x: 2 });
            lizardo.use(content.iocAlphysSitdown);
            await renderer.pause(500);
            await fishheader.position.modulate(renderer, 250, { x: 0 });
            fishheader.index = 3;
            await fishheader.position.modulate(renderer, 250, { x: -2, y: 2 });
            const gay = new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               position: { x: 74, y: 116 },
               resources: content.ieGay,
               active: true,
               velocity: { y: -0.5 }
            });
            renderer.attach('above', gay);
            await renderer.pause(500);
            gay.alpha.modulate(renderer, 1000, 0).then(() => renderer.detach('above', gay));
            await renderer.pause(250);
            fishheader.index = 2;
            await fishheader.position.modulate(renderer, 250, { x: 0, y: 0 });
            await renderer.pause(1000);
            lizardo.use(content.iocAlphysSitred);
            fishheader.index = 4;
            const guyanim = instance('main', 'niceguy')!.object.objects[0] as CosmosAnimation;
            guyanim.use(content.ionSNicecreamShocked);
            await renderer.pause(1000);
            lizardo.animation.enable();
            lizardo.animation.on('tick', function () {
               this.index === 16 && this.disable();
            });
            await renderer.pause(5000);
            const max = new CosmosValue(320);
            const cutoff = new Filter(shaders.clipper.vert, shaders.clipper.frag, {
               minX: 0,
               medX: 160,
               maxX: 320,
               minY: 0,
               medY: 240,
               maxY: 480
            });
            const onionsan = new OutertaleMultivisualObject(
               {
                  scale: 3,
                  position: { y: 240, x: 80 },
                  area: renderer.area,
                  filters: [
                     new AdvancedBloomFilter({ threshold: 0.8, bloomScale: 0.3, quality: 10, brightness: 1 }),
                     cutoff
                  ]
               },
               { active: true, anchor: { x: 0 } }
            ).on('tick', function () {
               cutoff.uniforms.maxX = max.value;
               cutoff.uniforms.medX = max.value / 2;
            });
            onionsan.use(content.ionAOnionsanKawaii);
            renderer.attach('above', onionsan);
            fishheader.index = 5;
            lizardo.use(content.iocAlphysSitonion);
            await onionsan.position.modulate(renderer, 3000, { y: 60 });
            await renderer.pause(750);
            onionsan.use(content.ionAOnionsanWistful);
            await renderer.pause(1250);
            lizardo.use(content.iocAlphysSit);
            fishheader.index = 6;
            guyanim.use(content.ionSNicecreamHappi);
            onionsan.position.modulate(renderer, 3000, { y: 240 });
            s1.metadata.fader = true;
            s2.metadata.fader = true;
            await renderer.pause(1000);
            const azr2 = new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               extrapolate: false,
               position: { x: 80 },
               resources: content.iocAsrielTrueDownSad
            });
            if (SAVE.data.b.svr) {
               renderer.attach('main', azr2);
               azr2.duration = 10;
               azr2.enable();
               azr2.position.step(renderer, 1.5, { y: 60 });
            }
            await Promise.all([
               frLoaderC,
               max.modulate(renderer, 1500, 0),
               region0b.modulate(renderer, 1500, { x: 320 }),
               region1b.modulate(renderer, 1500, { x: 320 }),
               starfield_b.position.modulate(renderer, 1500, { x: -160 }),
               renderer.when(() => seg134 * 4 <= seconds)
            ]);
            fd.alpha.value = 1;
            player.alpha.value = 1;
            renderer.detach('base', starfield_b);
            renderer.detach('main', fisho, lizardo, azr2);
            renderer.detach('above', onionsan);
            resetDisplay();
         }

         /** SECTION 3A */
         {
            const y3 = (i: number) => 240 + 220 * i;
            creditsDisplay.attach(
               genOpponent('woshua', xleft, y3(1), 130, SAVE.data.b.spared_woshua),
               genOpponent('moldbygg', xright, y3(0), 130, SAVE.data.b.spared_moldbygg),
               genOpponent('radtile', xleft, y3(0), 130, SAVE.data.b.spared_radtile),
               genOpponent('shyren', xright, y3(1), 130, SAVE.data.b.spared_shyren, {
                  volatile: { vars: { encourage: SAVE.data.b.spared_shyren } }
               }),
               genOpponent('doge', xleft, y3(2), 140, SAVE.data.n.state_foundry_doge === 2, {
                  volatile: { vars: { pet: SAVE.data.n.state_foundry_doge === 2 } }
               }),
               genOpponent('muffet', xright, y3(2), 140, SAVE.data.n.state_foundry_muffet === 2, {
                  volatile: { vars: {} }
               })
            );
            creditsDisplay.velocity.y = -0.875;
            await renderer.when(() => creditsDisplay.position.y < -y3(2));
            creditsDisplay.gravity.y = creditsDisplay.velocity.y / 10;
            await Promise.all([
               teleport('_credits3', 'down', 160, 120, { fade: false, fast: true, cutscene: true }),
               renderer.when(() => seg134 * 8 <= seconds)
            ]);
            resetDisplay();
         }
         frAssets3.unload();

         /** SECTION 3B */
         const frAssets4 = new CosmosInventory(
            oppos.pyrope.assets,
            oppos.tsundere.assets,
            oppos.perigee.assets,
            oppos.glyde.assets,
            oppos.burgie.assets,
            oppos.rg.assets,
            oppos.madjick.assets,
            oppos.knightknight.assets,
            oppos.froggitex.assets,
            oppos.whimsalot.assets,
            oppos.astigmatism.assets,
            oppos.migospel.assets,
            oppos.mushketeer.assets
         );
         frAssets4.name = 'frAssets4';
         const frLoaderD = frAssets4.load();
         {
            const starfield_c = new CosmosRectangle({
               fill: 0,
               size: 1000,
               priority: 1000,
               position: { y: -160 },
               anchor: 0,
               metadata: {
                  init: false,
                  gr: new Graphics(),
                  particles: CosmosUtils.populate(5, (i): [number, [number, number, number][]] => [
                     i,
                     CosmosUtils.populate(30, (): [number, number, number] => [
                        90 + Math.random() * 144,
                        -10 + Math.random() * 330,
                        Math.random() * 8 + 2
                     ])
                  ])
               },
               filters: [ filters.bloomX ]
            }).on('tick', function () {
               const gr = this.metadata.gr;
               if (this.metadata.init) {
                  gr.clear();
               } else {
                  this.metadata.init = true;
                  this.container.addChild(gr);
               }
               for (const [ size, list ] of this.metadata.particles) {
                  const al = ((1 - size / 4) * 0.9 + 0.1) ** 2;
                  const wh = 0.75 + size / 8;
                  const w2 = wh / 2;
                  gr.beginFill(0xffffff, al);
                  for (const p of list) {
                     p[1] -= p[2];
                     if (p[1] < -10) {
                        p[1] += 330;
                        p[0] = 90 + Math.random() * 144;
                     }
                     p[1] < 35 && gr.drawRect(p[0] - w2, p[1] - w2, wh, wh);
                  }
                  gr.endFill().beginFill(0xffffff, al / 4);
                  for (const p of list) {
                     p[1] < 35 && gr.drawRect(p[0] - w2 / 2, p[1] - w2, wh / 2, wh * p[2] * 2);
                  }
                  gr.endFill();
               }
            });
            renderer.attach('base', starfield_c);
            const region0c = new CosmosPoint(renderer.region[0]);
            const region1c = new CosmosPoint(renderer.region[1]);
            renderer.region[0] = region0c;
            renderer.region[1] = region1c;
            player.alpha.value = 0;
            fd.alpha.value = 0;
            region0c.modulate(renderer, 1500, { y: 120 });
            region1c.modulate(renderer, 1500, { y: 120 });
            starfield_c.position.modulate(renderer, 1500, { y: 0 });
            SAVE.data.b.svr || instance('main', 'asriel')!.destroy();
            const drakedadAnim = instance('main', 'drakedad')!.object.objects[0] as CosmosAnimation;
            drakedadAnim.extrapolate = false;
            drakedadAnim.duration *= 2;
            const time = renderer.time;
            for (const [ index, floater ] of [ ...instances('main', 'floater') ].entries()) {
               const anim = floater.object.objects[0] as CosmosAnimation;
               anim.metadata.time = index * 250;
               anim.on('tick', function () {
                  this.position.y = CosmosMath.wave(((this.metadata.time += CosmosMath.FRAME) % 4000) / 4000) * -2;
               });
            }
            const shyren = instance('main', 'shyren')!.object;
            let sing = true;
            const notes = [] as CosmosSprite[];
            const div134 = 60 / 134 / 2;
            const singTimeArray = [
               true,
               true,
               true,
               true,
               true,
               false,
               true,
               false,
               true,
               true,
               true,
               true,
               true,
               true,
               true,
               true,
               true,
               true,
               true,
               false,
               true,
               true,
               true,
               false,
               true,
               true,
               true,
               false,
               true,
               true,
               true,
               false
            ];
            const shyAnim = shyren.objects[0] as CosmosAnimation;
            shyren.on('tick', function () {
               this.objects[0].offsets[0].y = sineWaver(time, 1000, -2, 2);
               this.metadata.noteCooldown ??= 0;
               if (sing && seg134 * 8.625 <= seconds && singTimeArray[Math.floor(seconds / div134) % 32]) {
                  if (this.metadata.noteCooldown === 0) {
                     this.metadata.noteCooldown = 4;
                     const p = Math.random();
                     const o = (Math.random() < 0.5 ? 1 : -1) * (2 + p * 2);
                     const t = renderer.time;
                     const spr = new CosmosSprite({
                        frames: [ content.ionFShyrenNote ],
                        anchor: { x: 0, y: 1 },
                        position: this.position.subtract(0, 12),
                        priority: this.position.y,
                        velocity: { y: -0.5 - p * 0.5 }
                     }).on('tick', function () {
                        this.alpha.value -= 1 / 60;
                        if (this.alpha.value <= 0) {
                           this.alpha.value = 0;
                           notes.splice(notes.indexOf(this), 1);
                           renderer.detach('main', this);
                        } else {
                           this.offsets[0].x = sineWaver(t, 500, -o, o);
                        }
                     });
                     notes.push(spr);
                     renderer.attach('main', spr);
                  }
                  this.metadata.noteCooldown--;
                  shyAnim.resources = content.ionFShyrenSing;
               } else {
                  this.metadata.noteCooldown = 0;
                  shyAnim.resources = content.ionFShyren;
               }
            });
            const mtins = instance('main', 'metta')!;
            const metta = mtins.object.objects[0] as CosmosAnimation;
            metta.extrapolate = false;
            metta.duration = 10;
            SAVE.data.b.a_state_hapstablook && metta.use(content.iocMettatonMicrophoneHapstablook);
            const animated = [ ...instances('main', 'animated') ].map(inst => inst.object.objects[0] as CosmosAnimation);
            instance('above', 'light')!.object.on('tick', function () {
               const value = (seconds / (60 / 134)) % 1;
               if (seconds < seg134 * 10) {
                  this.alpha.value = CosmosMath.linear(value, 0.8, 0.7, 0.8);
               } else {
                  this.alpha.value = 0.7 + value * 0.3;
               }
            });
            await renderer.pause(1500);
            const s1 = sword(ff.swords.mewmew, xleft, 200, { starty: 180 }, { endy: 220 });
            creditsDisplay.attach(s1);
            const s2 = sword(ff.swords.napstablook, xright, 200, { starty: 180 }, { endy: 220 });
            creditsDisplay.attach(s2);
            await renderer.pause(500);
            shyren.position.step(renderer, 2, { y: 38 });
            await renderer.when(() => seg134 * 9.625 <= seconds);
            metta.resources = SAVE.data.b.a_state_hapstablook
               ? content.iocMettatonPointthreeHapstablook
               : content.iocMettatonPointthree;
            await renderer.when(() => seg134 * 9.75 <= seconds);
            metta.resources = SAVE.data.b.a_state_hapstablook
               ? content.iocMettatonPointtwoHapstablook
               : content.iocMettatonPointtwo;
            await renderer.when(() => seg134 * 10 - 1 <= seconds);
            s1.metadata.fader = true;
            s2.metadata.fader = true;
            await renderer.when(() => seg134 * 9.875 <= seconds);
            metta.resources = SAVE.data.b.a_state_hapstablook
               ? content.iocMettatonPointHapstablook
               : content.iocMettatonPoint;
            await renderer.when(() => seg134 * 10 - 0.6 <= seconds);
            const whitefader = fader({ fill: 0xffffff, priority: 183587913857, size: { x: 320, y: 160 } });
            await whitefader.alpha.modulate(renderer, 300, 1);
            const mtpos = mtins.object.position.value();
            mtins.destroy();
            (instance('main', 'turntable')!.object.objects[0] as CosmosAnimation).enable();
            const fancybody = new CosmosSprite({
               anchor: { x: 0, y: 1 },
               frames: [ content.iocMettatonDanceBody ]
            });
            const fancyleg1 = new CosmosSprite({
               anchor: 0,
               position: { y: -27.5 },
               scale: { x: -1 },
               frames: [ content.iocMettatonDanceLeg ]
            }).on('tick', function () {
               this.rotation.value = CosmosMath.linear(fancymetta.metadata.time % 1, 0, 0, 1, 1, 0, 0, 0, 0, 0) * -50;
            });
            const fancyleg2 = new CosmosSprite({
               anchor: 0,
               position: { y: -27.5 },
               frames: [ content.iocMettatonDanceLeg ]
            }).on('tick', function () {
               this.rotation.value = CosmosMath.linear(fancymetta.metadata.time % 1, 0, 0, 0, 0, 0, 0, 1, 1, 0) * 50;
            });
            const fancyarm1 = new CosmosSprite({
               anchor: { x: 0, y: 1 },
               scale: { x: -1 },
               frames: [ content.iocMettatonDanceArm ]
            }).on('tick', function () {
               this.position.x = -1 + CosmosMath.wave((fancymetta.metadata.time % 1) * 2) * 2;
            });
            const fancyarm2 = new CosmosSprite({
               anchor: { x: 0, y: 1 },
               frames: [ content.iocMettatonDanceArm ]
            }).on('tick', function () {
               this.position.x = -1 + CosmosMath.wave((fancymetta.metadata.time % 1) * 2) * 2;
            });
            const sec134 = (60 / 134) * 4 * 30;
            const fancymetta = new CosmosObject({
               position: { x: mtpos.x, y: mtpos.y },
               metadata: { time: 0 },
               objects: [ fancyleg1, fancyleg2, fancyarm1, fancyarm2, fancybody ]
            }).on('tick', function () {
               this.metadata.time += 1 / sec134;
               this.position.x = mtpos.x + -5 + CosmosMath.wave((fancymetta.metadata.time / 2) % 1) * 10;
            });
            renderer.attach('main', fancymetta);
            await renderer.pause(600);
            for (const an of animated) {
               an.enable();
            }
            await whitefader.alpha.modulate(renderer, 300, 0).then(() => renderer.detach('menu', whitefader));
            await renderer.pause(400);
            const s3 = sword(ff.swords.mettaton, 160, 200, { starty: 220 });
            creditsDisplay.attach(s3);
            await renderer.when(() => seg134 * 11.5 - 3 <= seconds);
            s3.metadata.fader = true;
            await renderer.pause(1000);
            await Promise.all([
               frLoaderD,
               region0c.modulate(renderer, 1500, { y: 280 }),
               region1c.modulate(renderer, 1500, { y: 280 }),
               starfield_c.position.modulate(renderer, 1500, { y: -160 }),
               renderer.when(() => seg134 * 11.5 <= seconds)
            ]);
            sing = false;
            fd.alpha.value = 1;
            player.alpha.value = 1;
            renderer.detach('base', starfield_c);
            renderer.detach('main', fancymetta, ...notes);
            resetDisplay();
         }

         /** SECTION 4A */
         const frLoaderE = content.amCredits3.load();
         {
            const y4 = (i: number) => 240 + 220 * i;
            const y5 = (i: number) => y4(1) + 170 + 220 * i;
            const y6 = (i: number) => y5(2) + 220 + 170 * i;
            const rgVars = { spew: false };
            const migospelVars = { fade: false };
            const sparedBurgie = SAVE.data.n.bully < 30 && world.popmax(2) - SAVE.data.n.bully_aerialis > 0;
            const madjickPosition = { x: xleft, y: y5(2) };
            const sparedMigospel = SAVE.data.b.spared_migospel;
            creditsDisplay.attach(
               genOpponent('pyrope', xleft, y4(0), 130, SAVE.data.b.spared_pyrope),
               genOpponent('tsundere', xright, y4(0), 130, SAVE.data.b.spared_tsundere, { offset: { x: 0, y: -16 } }),
               genOpponent('perigee', 160, y4(1), 95, SAVE.data.b.spared_perigee),
               genOpponent('rg', 160, y5(0), 130, SAVE.data.n.state_aerialis_royalguards === 0, {
                  offset: { x: 0, y: -16 },
                  volatile: { vars: rgVars }
               }),
               genOpponent('glyde', xleft, y5(1), 140, SAVE.data.b.spared_glyde, {
                  offset: { x: 0, y: -40 },
                  volatile: { sparable: SAVE.data.b.spared_glyde }
               }),
               genOpponent('burgie', xright, y5(1), 140, sparedBurgie, { volatile: { sparable: sparedBurgie } }),
               genOpponent('madjick', madjickPosition.x, madjickPosition.y, 140, SAVE.data.b.spared_madjick, {
                  volatile: { vars: { superposition1: madjickPosition, superposition2: creditsDisplay } }
               }),
               genOpponent('knightknight', xright, y5(2), 140, SAVE.data.b.spared_knightknight, {
                  volatile: { vars: {} }
               }),
               genOpponent('froggitex', xleft, y6(0), 95, SAVE.data.b.spared_froggitex),
               genOpponent('whimsalot', xright, y6(0), 95, SAVE.data.b.spared_whimsalot, { offset: { x: 0, y: -16 } }),
               genOpponent('astigmatism', xleft, y6(1), 95, SAVE.data.b.spared_astigmatism),
               genOpponent('migospel', xright, y6(1), 95, sparedMigospel, {
                  volatile: { sparable: sparedMigospel, vars: migospelVars }
               }),
               genOpponent('mushketeer', 160, y6(2), 95, SAVE.data.b.spared_mushketeer, {
                  volatile: { sparable: true, vars: { travel: 0 } }
               })
            );
            creditsDisplay.velocity.y = -0.875;
            await renderer.when(() => creditsDisplay.position.y < -y4(-0.5));
            SAVE.data.n.state_aerialis_royalguards === 0 && (rgVars.spew = true);
            await renderer.when(() => creditsDisplay.position.y < -y6(0.5));
            sparedMigospel || (migospelVars.fade = true);
            await renderer.when(() => creditsDisplay.position.y < -y6(2));
            creditsDisplay.gravity.y = creditsDisplay.velocity.y / 10;
            await Promise.all([
               frLoaderE,
               teleport('_credits4', 'down', 160, 340, { fade: false, fast: true, cutscene: true }),
               c2stop
            ]);
            resetDisplay();
            battler.dumpster();
         }
         frAssets4.unload();
         content.amCredits2.unload();

         /** SECTION 4B */
         const seg77 = (60 / 77) * 16;
         const credits3 = music.credits3.instance(renderer);
         const c3stop = credits3.on('stop');
         seconds = 0;
         const frLoaderF = content.ieStory.load();
         {
            const starfield_d = new CosmosRectangle({
               fill: 0,
               size: 1000,
               priority: 1000,
               position: { x: 160 },
               anchor: 0,
               metadata: {
                  init: false,
                  gr: new Graphics(),
                  particles: CosmosUtils.populate(5, (i): [number, [number, number, number][]] => [
                     i,
                     CosmosUtils.populate(35, (): [number, number, number] => [
                        320 + Math.random() * 168,
                        -10 + Math.random() * 330,
                        Math.random() * 8 + 2
                     ])
                  ])
               },
               filters: [ filters.bloomX ]
            }).on('tick', function () {
               const gr = this.metadata.gr;
               if (this.metadata.init) {
                  gr.clear();
               } else {
                  this.metadata.init = true;
                  this.container.addChild(gr);
               }
               for (const [ size, list ] of this.metadata.particles) {
                  const al = ((1 - size / 4) * 0.9 + 0.1) ** 2;
                  const wh = 0.75 + size / 8;
                  const w2 = wh / 2;
                  gr.beginFill(0xffffff, al);
                  for (const p of list) {
                     p[1] -= p[2];
                     if (p[1] < -10) {
                        p[1] += 330;
                        p[0] = 320 + Math.random() * 168;
                     }
                     gr.drawRect(p[0] - w2, p[1] - w2, wh, wh);
                  }
                  gr.endFill().beginFill(0xffffff, al / 4);
                  for (const p of list) {
                     gr.drawRect(p[0] - w2 / 2, p[1] - w2, wh / 2, wh * p[2] * 2);
                  }
                  gr.endFill();
               }
            });
            renderer.attach('base', starfield_d);
            const region0d = new CosmosPoint(renderer.region[0]);
            const region1d = new CosmosPoint(renderer.region[1]);
            renderer.region[0] = region0d;
            renderer.region[1] = region1d;
            player.alpha.value = 0;
            fd.alpha.value = 0;
            region0d.modulate(renderer, 1500, { x: 320 });
            region1d.modulate(renderer, 1500, { x: 320 });
            starfield_d.position.modulate(renderer, 1500, { x: 0 });
            const cutoff = new Filter(shaders.clipper.vert, shaders.clipper.frag, {
               minX: 320,
               medX: 480,
               maxX: 640,
               minY: 0,
               medY: 240,
               maxY: 480
            });
            const tori = character(
               'toriel',
               {
                  talk: {
                     down: new CosmosSprite(),
                     left: new CosmosSprite(),
                     right: new CosmosSprite(),
                     up: new CosmosSprite()
                  },
                  walk: {
                     down: new CosmosAnimation({
                        anchor: { x: 0, y: 1 },
                        resources:
                           SAVE.data.b.svr || (SAVE.data.b.c_state_secret1_used && SAVE.data.b.c_state_secret5_used)
                              ? content.iocTorielDownAsriel
                              : content.iocTorielDownAsrielSad
                     }),
                     left: new CosmosAnimation({
                        anchor: { x: 0, y: 1 },
                        resources:
                           SAVE.data.b.svr || (SAVE.data.b.c_state_secret1_used && SAVE.data.b.c_state_secret5_used)
                              ? content.iocTorielLeftAsriel
                              : content.iocTorielLeftAsrielSad
                     }),
                     right: new CosmosSprite(),
                     up: new CosmosSprite()
                  }
               },
               { x: 400, y: 220 },
               'down',
               { area: renderer.area, filters: [ cutoff ] }
            );
            renderer.attach('main', tori);
            const s1 = sword(ff.swords.toriel, 80, 80, { startx: 60 });
            renderer.pause(1500).then(() => creditsDisplay.attach(s1));
            await tori.walk(renderer, 1.5, { y: 420 });
            await renderer.pause(1000);
            tori.walk(renderer, 1.5, { x: 300 }).then(() => {
               renderer.detach('main', tori);
            });
            await renderer.pause(1000);
            const mk = character(
               'kidd',
               SAVE.data.b.f_state_kidd_betray ? characters.kiddSad : characters.kidd,
               { x: 300, y: 440 },
               'right',
               { area: renderer.area, filters: [ cutoff ] }
            );
            const s2 = sword(ff.swords.monsterkid, 80, 160, { startx: 60 });
            renderer.pause(1000).then(() => creditsDisplay.attach(s2));
            await mk.walk(renderer, 4, { x: 382 });
            await tripper(mk, SAVE.data.b.f_state_kidd_betray ? content.iocKiddRightTripSad : content.iocKiddRightTrip);
            await renderer.when(() => seg77 <= seconds);
            const gori = new CosmosAnimation({
               active: SAVE.data.b.svr,
               resources: SAVE.data.b.svr ? content.iocAsgoreAsrielhug : content.iocAsgoreUp,
               anchor: { x: 0, y: 1 },
               position: { x: 400, y: 125 }
            });
            renderer.attach('main', gori);
            const forg = mk.position.clamp(...renderer.region);
            const fpos = mk.position.subtract(forg);
            const fcam = new CosmosObject({ position: forg }).on('tick', function () {
               this.position.set(mk.position.subtract(fpos));
               creditsDisplay.position.y = region1d.y - this.position.clamp(...renderer.region).y;
            });
            renderer.attach('below', fcam);
            game.camera = fcam;
            const dY = region1d.y - region0d.y;
            const s3 = sword(ff.swords.asgore, 80, 80 - dY, { startx: 60 });
            creditsDisplay.attach(s3);
            const s4 = sword(ff.swords.asriel, 80, 160 - dY, { startx: 60 });
            SAVE.data.b.svr && creditsDisplay.attach(s4);
            await mk.walk(renderer, 1.5, { y: 180 });
            s1.metadata.fader = true;
            s2.metadata.fader = true;
            s3.metadata.fader = true;
            s4.metadata.fader = true;
            await renderer.pause(1000);
            if (SAVE.data.b.f_state_kidd_betray) {
               gori.use(content.iocAsgoreDown);
               mk.face = 'down';
            } else {
               SAVE.data.b.svr || gori.use(content.iocAsgoreDownHappy);
               mk.walk(renderer, 0.5, { y: 140 });
            }
            await Promise.all([
               frLoaderF,
               region0d.modulate(renderer, 1500, { x: 160 }),
               region1d.modulate(renderer, 1500, { x: 160 }),
               starfield_d.position.modulate(renderer, 1500, { x: 160 }),
               renderer.when(() => seg77 * 2 <= seconds)
            ]);
            fd.alpha.value = 1;
            player.alpha.value = 1;
            renderer.detach('base', starfield_d);
            renderer.detach('below', fcam);
            renderer.detach('main', mk, gori);
            resetDisplay();
            game.camera = player;
         }

         /** SECTION 5 */
         {
            const panel = new CosmosAnimation({
               alpha: 0,
               anchor: { x: 0 },
               position: { x: 160, y: 66.5 },
               resources: content.ieStory,
               index: 17
            });
            creditsDisplay.attach(panel);
            await panel.alpha.modulate(renderer, 3000, 1);
            await renderer.pause(3000);
            const sep = new ColorMatrixFilter();
            sep.sepia(false);
            const sepia = new CosmosAnimation({
               area: renderer.area,
               alpha: 0,
               anchor: { x: 0 },
               position: { x: 160, y: 66.5 },
               resources: content.ieStory,
               index: 17,
               filters: [ sep ]
            });
            creditsDisplay.attach(sepia);
            await sepia.alpha.modulate(renderer, 3000, 1);
            creditsDisplay.detach(panel);
            const div522 = 60 / 522;
            const sub522 = div522 / 4;
            const mic522 = sub522 / 24;
            await renderer.when(() => div522 * 4 * 77 + sub522 * 15 + mic522 * 10 <= seconds);
            creditsDisplay.attach(
               new CosmosText({
                  fontSize: 8,
                  fontFamily: content.fDeterminationSans,
                  content: systemsText.extra.end1,
                  position: { x: 160, y: 275 },
                  scale: { x: 6, y: 10 },
                  anchor: 0
               })
            );
            await creditsDisplay.position.modulate(
               renderer,
               (div522 * 4 * 103 + sub522 * 12 + mic522 * 12 - seconds) * 1000,
               { y: -120 }
            );
            await renderer.pause(5000);
            await Promise.all([ creditsDisplay.alpha.modulate(renderer, 5000, 0), c3stop ]);
         }
         content.ieStory.unload();
         content.amCredits3.unload();

         // end (might be a placeholder?)
         renderer.detach('menu', creditsDisplay);
         renderer.off('tick', secTicker);
         SAVE.data.b.freedom = true;
         await Promise.all([
            renderer.pause(2000).then(async () => {
               if (SAVE.data.b.svr) {
                  await dialogue('dialoguerBottom', ...text.a_citadel.story.returnofchara1);
                  await renderer.pause(1500);
                  await dialogue('dialoguerBottom', ...text.a_citadel.story.returnofchara2);
                  await renderer.pause(1500);
                  await dialogue('dialoguerBottom', ...text.a_citadel.story.returnofchara3);
                  await renderer.pause(1000);
                  await dialogue('dialoguerBottom', ...text.a_citadel.story.returnofchara4);
                  await renderer.pause(2000);
               }
               await renderer.pause(2000);
            }),
            teleport('_frontier1', 'left', 233, 176, { fade: false, fast: true, cutscene: true })
         ]);
         SAVE.data.n.hp = Math.max(SAVE.data.n.hp, Math.min(calcHP() + calcBonusHP(), 99));
         game.movement = true;
         quickresume(true);
         await fd.alpha.modulate(renderer, 3000, 0);
         renderer.detach('menu', fd);
      },
      async rg (roomState, scriptState, index) {
         const headers = rgHeaders(
            instance('main', 'picnic_dragon')!.object.objects[0],
            instance('main', 'picnic_rabbit')!.object.objects[0]
         );
         typer.on('header', headers);
         await dialogue(
            'dialoguerTop',
            ...[ text.a_citadel.overworld.partyguard1, text.a_citadel.overworld.partyguard2 ][+index]()
         );
         typer.off('header', headers);
      },
      async npc (roomState, scriptState, key) {
         if (!game.movement) {
            return;
         }
         const inst = instance('main', key);
         if (inst) {
            const anim = inst.object.objects.filter(obj => obj instanceof CosmosAnimation)[0] as CosmosAnimation;
            key === 'picnic_clamguy' && anim.use(content.ionAClamguyFront);
            await inst.talk(
               'a',
               key === 'a_harpy' ? null : talkFinder(),
               'auto',
               ...CosmosUtils.provide(text.a_citadel.npc[key as keyof typeof text.a_citadel.npc])
            );
            key === 'picnic_clamguy' && anim.use(content.ionAClamguyBack);
         }
      },
      async janet () {
         if (!game.movement) {
            return;
         }
         const inst = instance('main', 'c_janet')!;
         const anim = inst.object.objects[0] as CosmosAnimation;
         anim.disable();
         await dialogue('auto', ...text.a_citadel.overworld.janet());
         anim.enable();
      },
      async nmon (roomState, scriptState, x) {
         const ut_geno = calcLV() > 14;
         if (!game.movement || (!ut_geno && (SAVE.data.b.oops || SAVE.data.n.plot < 72))) {
            return;
         }
         const n = +x;
         if (ut_geno) {
            if (n < 2 || 7 - n <= SAVE.data.n.no_you_di_int) {
               return;
            }
            SAVE.data.n.no_you_di_int = 7 - n;
            await dialogue('auto', ...text.a_citadel.youvedoneitnow[6 - n]);
         } else {
            if (n <= SAVE.data.n.narrator_monologue) {
               return;
            }
            SAVE.data.n.narrator_monologue = n;
            await dialogue('auto', ...text.a_citadel.truetext.epilogue[n - 1]());
         }
      },
      async giftbox1 () {
         if (!game.movement) {
            return;
         }
         game.movement = false;
         if (SAVE.data.b.item_big_dipper) {
            await dialogue('auto', ...text.a_citadel.overworld.giftbox3());
         } else {
            await dialogue('auto', ...text.a_citadel.overworld.giftbox1a());
            if (choicer.result === 0) {
               if (SAVE.storage.inventory.size < 8) {
                  SAVE.data.b.item_big_dipper = true;
                  sounds.equip.instance(renderer);
                  saver.add('big_dipper');
                  instance('main', 'giftbox1')!.index = 1;
                  await dialogue('auto', ...text.a_citadel.overworld.giftbox2a());
                  if (choicer.result === 0) {
                     atlas.switch(autoNav());
                     await use('big_dipper', SAVE.storage.inventory.contents.indexOf('big_dipper'));
                     atlas.switch(null);
                  } else {
                     await dialogue('auto', ...text.a_citadel.noequip);
                  }
               } else {
                  await dialogue('auto', ...text.a_citadel.overworld.toomuch1);
               }
            } else {
               await dialogue('auto', ...text.a_citadel.overworld.giftbox4);
            }
         }
         game.movement = true;
      },
      async giftbox2 () {
         if (!game.movement) {
            return;
         }
         game.movement = false;
         if (SAVE.data.b.item_heart_locket) {
            await dialogue('auto', ...text.a_citadel.overworld.giftbox3());
         } else {
            await dialogue('auto', ...text.a_citadel.overworld.giftbox1b());
            if (choicer.result === 0) {
               if (SAVE.storage.inventory.size < 8) {
                  SAVE.data.b.item_heart_locket = true;
                  sounds.equip.instance(renderer);
                  saver.add('heart_locket');
                  instance('main', 'giftbox2')!.index = 1;
                  await dialogue('auto', ...text.a_citadel.overworld.giftbox2b());
                  if (choicer.result === 0) {
                     atlas.switch(autoNav());
                     await use('heart_locket', SAVE.storage.inventory.contents.indexOf('heart_locket'));
                     atlas.switch(null);
                  } else {
                     await dialogue('auto', ...text.a_citadel.noequip);
                  }
               } else {
                  await dialogue('auto', ...text.a_citadel.overworld.toomuch1);
               }
            } else {
               await dialogue('auto', ...text.a_citadel.overworld.giftbox4);
            }
         }
         game.movement = true;
      },
      async startea () {
         if (SAVE.data.b.item_starling_tea) {
            await dialogue('auto', ...text.a_citadel.overworld.tea2());
         } else {
            await dialogue('auto', ...text.a_citadel.overworld.tea0());
            if (SAVE.storage.inventory.size < 8) {
               SAVE.data.b.item_starling_tea = true;
               sounds.equip.instance(renderer);
               saver.add('starling_tea');
               instance('below', 'startea')?.destroy();
               await dialogue('auto', ...text.a_citadel.overworld.tea1);
            } else {
               await dialogue('auto', ...text.a_citadel.overworld.toomuch1);
            }
         }
      },
      async ringzone (roomState, scriptState, x, y, f: CosmosDirection, z) {
         let level = 0;
         switch (game.room) {
            case 'c_archive_path1':
               level = 1;
               break;
            case 'c_archive_path2':
               level = 2;
               break;
            case 'c_archive_path3':
               level = 3;
               break;
            case 'c_archive_path4':
               level = 4;
               break;
            case 'c_archive_path5':
               level = 5;
               break;
            case 'c_archive_path6':
               level = 6;
               break;
         }
         if (level <= SAVE.data.n.state_citadel_archive) {
            return;
         }
         roomState.b ??= false;
         const akd = instance('below', 'akd')!.object;
         const authorized = SAVE.data.n.state_citadel_archive === level - 1;
         if (akd.position.x <= player.position.x && player.position.x <= akd.position.x + 80) {
            if (!roomState.b) {
               roomState.b = true;
               akd.alpha.value = 1;
               sounds.menu.instance(renderer).rate.value = 2;
            }
         } else if (roomState.b) {
            roomState.b = false;
            if (z === 'x' ? player.position.x > akd.position.x + 80 : player.position.x < akd.position.x) {
               akd.alpha.value = 0;
            } else if (authorized) {
               game.movement = false;
               ringcolor(0x00ffff);
               archindex(akd.objects, 2);
               sounds.depower.instance(renderer).rate.value = 0.8;
               const g2filter = new GlitchFilter({ slices: 100, offset: 0 });
               const g2offset = new CosmosValue();
               const g2ticker = () => {
                  g2filter.offset = g2offset.value;
                  g2filter.refresh();
               };
               (renderer.filters ??= []).unshift(g2filter);
               renderer.on('tick', g2ticker);
               const fd = fader({ fill: SAVE.flag.b.$option_epilepsy ? 0x2f2f2f : 0xffffff });
               await Promise.all([
                  game.music?.gain.modulate(renderer, 300, 0),
                  g2offset.modulate(renderer, 300, 0, 1000, 1000),
                  fd.alpha.modulate(renderer, 300, 1)
               ]);
               akd.alpha.value = 0;
               ringcolor();
               archindex(akd.objects, 0);
               if (game.music) {
                  const sec = (60 / 66) * 8;
                  archiver.offset = Math.round(game.music.position / sec) * sec;
               }
               switch (game.room) {
                  case 'c_archive_path1':
                     await teleport('c_archive_wastelands1', 'right', 20, 200, { fade: false, fast: true });
                     battler.load(groups.archive1);
                     break;
                  case 'c_archive_path2':
                     await teleport('c_archive_starton2', 'left', 300, 60, { fade: false, fast: true });
                     battler.load(groups.archive2);
                     break;
                  case 'c_archive_path3':
                     await teleport('c_archive_foundryA1', 'down', 220, 90, { fade: false, fast: true });
                     battler.load(groups.archive3);
                     break;
                  case 'c_archive_path4':
                     await teleport('c_archive_foundryB1', 'up', 160, 150, { fade: false, fast: true });
                     battler.load(groups.archive4);
                     break;
                  case 'c_archive_path5':
                     await teleport('c_archive_aerialis1', 'right', 20, 160, { fade: false, fast: true });
                     battler.load(groups.archive5);
                     break;
                  case 'c_archive_path6':
                     await teleport('c_archive_surface', 'up', 175, 130, { fade: false, fast: true });
                     break;
               }
               quickresume(true);
               await renderer.pause(150);
               disengageDelay();
               game.room === 'c_archive_surface' || (game.movement = true);
               Promise.all([ g2offset.modulate(renderer, 300, 1, 0, 0), fd.alpha.modulate(renderer, 300, 0) ]).then(
                  () => {
                     renderer.detach('menu', fd);
                     renderer.filters!.splice(renderer.filters!.indexOf(g2filter), 1);
                     renderer.off('tick', g2ticker);
                  }
               );
               world.cutscene_override = true;
            } else {
               game.movement = false;
               ringcolor(0xff0000);
               archindex(akd.objects, 1);
               sounds.depower.instance(renderer).rate.value = 0.8;
               const g2filter = new GlitchFilter({ slices: 100, offset: 0 });
               const g2offset = new CosmosValue();
               const g2ticker = () => {
                  g2filter.offset = g2offset.value;
                  g2filter.refresh();
               };
               (renderer.filters ??= []).unshift(g2filter);
               renderer.on('tick', g2ticker);
               const fd = fader({ fill: SAVE.flag.b.$option_epilepsy ? 0x2f2f2f : 0xffffff });
               await Promise.all([
                  game.music?.gain.modulate(renderer, 300, 0),
                  g2offset.modulate(renderer, 300, 0, 1000, 1000),
                  fd.alpha.modulate(renderer, 300, 1)
               ]);
               akd.alpha.value = 0;
               ringcolor();
               archindex(akd.objects, 0);
               player.position.set(+x, +y);
               player.face = f;
               await renderer.pause(150);
               game.movement = true;
               await Promise.all([
                  game.music?.gain.modulate(renderer, 300, game.music.daemon.gain),
                  g2offset.modulate(renderer, 300, 1, 0, 0),
                  fd.alpha.modulate(renderer, 300, 0)
               ]);
               renderer.detach('menu', fd);
               renderer.filters!.splice(renderer.filters!.indexOf(g2filter), 1);
               renderer.off('tick', g2ticker);
            }
         }
      },
      async exitarchive () {
         if (!game.movement) {
            return;
         }
         game.movement = false;
         if (SAVE.data.n.state_citadel_archive < 6) {
            await dialogue('dialoguerBottom', ...text.a_citadel.overworld.statusterminal1);
            game.movement = true;
            return;
         }
         await dialogue('dialoguerBottom', ...text.a_citadel.overworld.statusterminal2());
         if (choicer.result === 1) {
            game.movement = true;
            return;
         }
         const fad = fader({ fill: 0xffffff });
         const epicAzzets = new CosmosInventory(inventories.idcAlphys, content.avAlphys);
         epicAzzets.name = 'epicAzzets';
         const epicLoader = epicAzzets.load();
         const cym = sounds.cymbal.instance(renderer);
         await Promise.all([ fad.alpha.modulate(renderer, 5000, 1), game.music?.gain.modulate(renderer, 5000, 0) ]);
         cym.stop();
         fad.fill = 0;
         while (SAVE.storage.inventory.size > 0) {
            SAVE.storage.inventory.remove(0);
         }
         let haha = false;
         for (const item of SAVE.data.s.state_citadel_inventory.split(',')) {
            if (item) {
               if (item === 'tvm_mewmew') {
                  haha = true;
               } else {
                  SAVE.storage.inventory.add(item);
               }
            }
         }
         if (!haha) {
            if (SAVE.storage.dimboxA.has('tvm_mewmew')) {
               haha = true;
               SAVE.storage.dimboxA.remove('tvm_mewmew');
            } else if (SAVE.storage.dimboxB.has('tvm_mewmew')) {
               haha = true;
               SAVE.storage.dimboxB.remove('tvm_mewmew');
            }
         }
         SAVE.data.n.hp = SAVE.data.n.state_citadel_hp;
         updateArmor(SAVE.data.s.state_citadel_armor);
         SAVE.data.s.weapon = SAVE.data.s.state_citadel_weapon;
         SAVE.data.n.plot = 71.2;
         world.cutscene_override = false;
         await Promise.all([
            renderer.pause(3000),
            teleport('c_bastion', 'down', 275, 130, { fade: false, fast: true })
         ]);
         renderer.filters = [];
         const alphys = character('alphys', characters.alphys, { x: 170, y: 130 }, 'down');
         disengageDelay();
         await fad.alpha.modulate(renderer, 1000, 0);
         renderer.detach('main', fad);
         await antifreeze([ epicLoader, renderer.pause(1000) ]);
         await dialogue('dialoguerBottom', ...text.a_citadel.story.smasher1(haha));
         await alphys.walk(renderer, 3, { y: 105 });
         await alphys.alpha.modulate(renderer, 300, 0);
         renderer.detach('main', alphys);
         epicAzzets.unload();
         game.movement = true;
      },
      async cw_switch () {
         switch (game.room) {
            case 'c_archive_wastelands1':
               if (cw_state.s1) {
                  return;
               } else {
                  cw_state.s1 = true;
               }
               break;
            case 'c_archive_wastelands2':
               if (cw_state.s2) {
                  return;
               } else {
                  cw_state.s2 = true;
               }
               break;
            case 'c_archive_wastelands4':
               if (cw_state.s3) {
                  return;
               } else {
                  cw_state.s3 = true;
               }
               break;
            default:
               return;
         }
         instance('below', 'cw_switch')!.index = 1;
         sounds.switch.instance(renderer);
      },
      async cw_vender (roomState) {
         if (!game.movement) {
            return;
         }
         if (SAVE.storage.inventory.size < 8) {
            roomState.c ??= 0;
            if (roomState.c < 4) {
               roomState.c++;
               saver.add('archive_candy');
               await dialogue('auto', ...text.a_citadel.overworld.cw_vender1);
            } else {
               await dialogue('auto', ...text.a_citadel.overworld.cw_vender2);
            }
         } else {
            await dialogue('auto', ...text.a_citadel.overworld.toomuch3);
         }
      },
      cw_battle () {
         archiveBattle(groups.archive1, 'c_archive_path1', 'left');
      },
      async cs_vender (roomState) {
         if (!game.movement) {
            return;
         }
         if (SAVE.storage.inventory.size < 8) {
            roomState.c ??= 0;
            if (roomState.c < 8) {
               roomState.c++;
               saver.add('archive_berry');
               await dialogue('auto', ...text.a_citadel.overworld.cs_vender1);
            } else {
               await dialogue('auto', ...text.a_citadel.overworld.cs_vender2);
            }
         } else {
            await dialogue('auto', ...text.a_citadel.overworld.toomuch3);
         }
      },
      async cs_tower (roomState, scriptState, id) {
         if (!game.movement) {
            return;
         }
         const p = cs_puzzle[+id];
         if (p.x === 0 && p.y === 0) {
            await dialogue('auto', ...text.a_citadel.overworld.cs_tower_done);
            return;
         }
         game.movement = false;
         let done = false;
         const fac = 2 ** (1 / 12);
         function keyListener (this: CosmosKeyboardInput) {
            if (done) {
               return;
            }
            const v = { x: p.x, y: p.y };
            switch (this) {
               case keys.downKey:
                  ++p.y > 40 && (p.y = 40);
                  break;
               case keys.leftKey:
                  --p.x < -40 && (p.x = -40);
                  break;
               case keys.rightKey:
                  ++p.x > 40 && (p.x = 40);
                  break;
               case keys.upKey:
                  --p.y < -40 && (p.y = -40);
                  break;
               case keys.specialKey:
                  done = true;
                  return;
            }
            fixPillar();
            if (p.x === 0 && p.y === 0) {
               done = true;
               while (sounds.upgrade.instances.length > 3) {
                  sounds.upgrade.instances[0].stop();
               }
               sounds.upgrade.instance(renderer);
            } else if (p.x !== v.x || p.y !== v.y) {
               sounds.equip.instance(renderer).rate.value =
                  fac ** CosmosMath.remap((Math.abs(p.x) + Math.abs(p.y)) / 80, 6, -48);
            }
         }
         const infobox = menuBox(32, 320 + 38, 566, 140 - 38, 6, {
            objects: [
               new CosmosText({
                  fill: 0xffffff,
                  fontFamily: content.fDeterminationMono,
                  fontSize: 16,
                  position: { x: 11, y: 9 },
                  spacing: { x: 0, y: 5 },
                  stroke: -1,
                  content: text.a_citadel.overworld.cs_tower
               })
            ]
         });
         game.music?.gain.modulate(renderer, 500, game.music.daemon.gain * 0.1);
         engageDelay();
         renderer.attach('menu', infobox);
         for (const k of [ keys.downKey, keys.leftKey, keys.rightKey, keys.upKey, keys.specialKey ]) {
            k.on('down', keyListener);
         }
         await renderer.when(() => done);
         for (const k of [ keys.downKey, keys.leftKey, keys.rightKey, keys.upKey ]) {
            k.off('down', keyListener);
         }
         renderer.detach('menu', infobox);
         sounds.note.stop();
         game.music?.gain.modulate(
            renderer,
            CosmosMath.remap(game.music.gain.value, 500, 0, 0.1, game.music.daemon.gain),
            game.music.daemon.gain
         );
         disengageDelay();
         game.movement = true;
      },
      cs_battle () {
         archiveBattle(groups.archive2, 'c_archive_path2', 'right');
      },
      async cf1_cardbox (roomState) {
         if (!game.movement) {
            return;
         }
         game.movement = false;
         const dimbox = instance('main', 'dimbox')!;
         const anim = dimbox.object.objects[0] as CosmosAnimation;
         anim.enable();
         await renderer.when(() => anim.index === 3);
         anim.disable();
         roomState.c ??= 0;
         if (roomState.c < 2) {
            if (SAVE.storage.inventory.size < 8) {
               roomState.c++;
               sounds.equip.instance(renderer);
               saver.add('archive_tzn');
               await dialogue('auto', ...text.a_citadel.overworld.cf1_dimbox1);
            } else {
               await dialogue('auto', ...text.a_citadel.overworld.toomuch2);
            }
         } else {
            await dialogue('auto', ...text.a_citadel.overworld.cf1_dimbox2);
         }
         await renderer.when(() => atlas.target === null);
         anim.index = 4;
         anim.enable();
         await renderer.when(() => anim.index === 6);
         anim.reset();
         game.movement = true;
      },
      cf1_battle () {
         archiveBattle(groups.archive3, 'c_archive_path3', 'up');
      },
      async cf2_vender (roomState) {
         if (!game.movement) {
            return;
         }
         if (SAVE.storage.inventory.size < 8) {
            const k = `c${cf2_state.time}`;
            roomState[k] ??= false;
            if (!roomState[k]) {
               roomState[k] = true;
               saver.add('archive_rations');
               await dialogue('auto', ...text.a_citadel.overworld.cf2_vender1);
            } else {
               await dialogue('auto', ...text.a_citadel.overworld.cf2_vender2);
            }
         } else {
            await dialogue('auto', ...text.a_citadel.overworld.toomuch3);
         }
      },
      async cf2_key () {
         if (!game.movement || cf2_state.time < 6) {
            return;
         }
         const dimbox = instance('main', 'dimbox')!;
         game.movement = false;
         const anim = dimbox.object.objects[0] as CosmosAnimation;
         anim.enable();
         await renderer.when(() => anim.index === 3);
         anim.disable();
         if (cf2_state.key) {
            await dialogue('auto', ...text.a_citadel.overworld.cf2_key2);
         } else {
            cf2_state.key = true;
            sounds.equip.instance(renderer);
            await dialogue('auto', ...text.a_citadel.overworld.cf2_key1);
         }
         await renderer.when(() => atlas.target === null);
         anim.index = 4;
         anim.enable();
         await renderer.when(() => anim.index === 6);
         anim.reset();
         game.movement = true;
      },
      async cf2_bench (roomState) {
         if (!game.movement) {
            return;
         }
         if (cf2_state.bench && cf2_state.time === 4) {
            await dialogue('auto', ...text.a_citadel.overworld.cf2_bench2);
         } else {
            await dialogue('auto', ...text.a_citadel.overworld.cf2_bench0);
            if (SAVE.storage.inventory.size === 8) {
               await dialogue('auto', ...text.a_citadel.overworld.toomuch1);
            } else if (cf2_state.time === 4) {
               cf2_state.bench = true;
               sounds.equip.instance(renderer);
               saver.add('archive_healpak');
               await dialogue('auto', ...text.a_citadel.overworld.cf2_bench1);
            } else {
               await dialogue('auto', ...text.a_citadel.overworld.cf2_bench3);
            }
         }
      },
      async cf2_blookdoor () {
         if (!game.movement) {
            return;
         }
         if (cf2_state.key) {
            teleport('c_archive_foundryB4', 'up', 90, 230, world);
         } else {
            await dialogue('auto', ...text.a_citadel.overworld.cf2_blookdoor);
            player.position.y += 3;
            player.face = 'down';
         }
      },
      cf2_battle () {
         archiveBattle(groups.archive4, 'c_archive_path4', 'down');
      },
      async ca_elevator (roomState: CitadelRS['c_archive_aerialis2']) {
         if (!game.movement) {
            return;
         }
         if (roomState.location === 'c_archive_aerialis1') {
            await teleport('c_archive_aerialis1', 'down', 240, 130, world);
         } else {
            await teleport('c_archive_aerialis4', 'down', 60, 130, world);
         }
      },
      async ca_lift (roomState: CitadelRS['c_archive_aerialis2']) {
         if (!roomState.elevating && game.movement && ca_state.last_elevated !== roomState.location) {
            roomState.location = ca_state.last_elevated =
               roomState.location === 'c_archive_aerialis1' ? 'c_archive_aerialis4' : 'c_archive_aerialis1';
            ca_state.floor++;
            const ayoButBetter = ca_state.floor / 9;
            game.music?.gain.modulate(renderer, 5000, (1 - ayoButBetter) * game.music!.daemon.gain);
            archiver.bg.tint = CosmosImageUtils.gradient(0xffffff, 0, ayoButBetter ** 3);
            ca_state.floor === 9 && (archiver.nextfx = Infinity);
            roomState.elevating = true;
            game.menu = false;
            elevate().then(() => {
               roomState.elevating = false;
               game.menu = true;
            });
         }
      },
      ca_battle () {
         if (ca_state.floor < 9) {
            return;
         }
         ca_state.wind?.stop();
         archiveBattle(groups.archive5, 'c_archive_path5', 'left').then(() => {
            archiver.bg.tint = void 0;
         });
      },
      async final () {
         if (!game.movement || SAVE.data.n.plot > 71.1) {
            return;
         }
         SAVE.data.n.plot = 71.1;
         game.movement = false;
         if (calcLV() > 14) {
            const cocker = rooms.of('_cockpit').preload.load();
            const asgoreLoaduh = battler.load(groups.finalasgore);
            await renderer.pause(1500);
            player.face = 'down';
            await renderer.pause(2500);
            player.face = 'up';
            await renderer.pause(1500);
            await player.walk(renderer, 1, { y: 30 });
            await renderer.pause(500);
            const goatins = instance('main', 'observer');
            const goatdad = goatins!.object as CosmosCharacter;
            await notifier(goatdad, true, 66);
            goatdad.face = 'down';
            await dialogue('dialoguerBottom', ...text.a_citadel.story.choice8);
            game.music?.stop();
            const white = new CosmosRectangle({
               alpha: 0,
               priority: 10,
               size: { x: 320, y: 240 },
               fill: 0xffffff
            });
            const swinger = new CosmosAnimation({
               active: true,
               anchor: { x: 0, y: 1 },
               scale: 0.5,
               tint: 0xff6969,
               resources: content.ibuSwing,
               position: renderer.projection(goatdad.position, game.camera.position)
            }).on('tick', function () {
               if (this.index === 5 && this.step === this.duration - 1) {
                  this.alpha.value = 0;
               }
            });
            const black = new CosmosRectangle({
               size: { x: 320, y: 240 },
               fill: 0,
               objects: [ white, swinger ]
            });
            renderer.attach('menu', black);
            sounds.swing.instance(renderer);
            const cym = sounds.cymbal.instance(renderer, 2.5);
            cym.gain.value /= 4;
            cym.gain.modulate(renderer, 2500, cym.gain.value * 4);
            await renderer.pause(500);
            await Promise.all([ white.alpha.modulate(renderer, 2000, 1), asgoreLoaduh ]);
            goatins?.destroy();
            const b = battler.start(groups.finalasgore);
            renderer.detach('menu', black);
            cym.stop();
            await b;
            battler.unload(groups.finalasgore);
            await Promise.all([ cocker, renderer.pause(1000) ]);
            renderer.alpha.modulate(renderer, 300, 1);
            quickresume(true);
            await mad();
            return;
         }
         const cam = new CosmosObject({ position: { y: player.position.y } });
         game.camera = cam;
         music.thechoice.stop();
         SAVE.data.b.choiceloop = false;
         content.amChoice.unload();
         const twLoader1 = twAssets1.load();
         if (SAVE.data.n.state_citadel_refuse > 0) {
            await renderer.pause(1000);
            await cam.position.modulate(renderer, 2000, { y: -100 });
            await antifreeze([ twLoader1, renderer.pause(2000) ]);
         } else {
            await renderer.pause(2000);
            await cam.position.modulate(renderer, 2000, { y: -100 });
            await renderer.pause(3000);
            await dialogue('dialoguerTop', ...text.a_citadel.story.choice1);
            await renderer.pause(6000);
            await dialogue('dialoguerTop', ...text.a_citadel.story.choice1a());
            await antifreeze([ twLoader1, renderer.pause(3000) ]);
         }
         await dialogue('dialoguerTop', ...text.a_citadel.story.choice1b());
         if (choicer.result === 0 || world.bad_robot || world.trueKills > 29) {
            if (!(world.bad_robot || world.trueKills > 29)) {
               await renderer.pause(1650);
               await dialogue('dialoguerTop', ...text.a_citadel.story.choice2a);
            }
            await bad();
            twAssets1.unload();
            rooms.of('c_archive_start').preload.load();
            await teleport('c_road3', 'down', 40, 10, world);
            game.camera = player;
            const fakedad = character('asgore', characters.asgore, { x: 40, y: 55 }, 'down');
            fakedad.walk(renderer, 3, { y: 1270 }).then(() => fakedad.alpha.modulate(renderer, 300, 0));
            await player.walk(renderer, 3, { y: 1270 });
            SAVE.data.n.state_citadel_refuse = 0;
            await teleport('c_bastion', 'down', 170, 110, world);
            fakedad.position.set(170, 140);
            fakedad.face = 'down';
            fakedad.alpha.value = 1;
            fakedad.alpha.modulate(renderer, 0, 1);
            const alphys = citadelStates.rooms.c_bastion!.alphys as CosmosCharacter;
            await renderer.pause(2000);
            await dialogue('dialoguerBottom', ...text.a_citadel.story.choice3a);
            await renderer.pause(2000);
            await dialogue('dialoguerBottom', ...text.a_citadel.story.choice4a);
            await notifier(alphys);
            await dialogue('dialoguerBottom', ...text.a_citadel.story.choice4b);
            await renderer.pause(450);
            sounds.menu.instance(renderer).rate.value = 1.2;
            await renderer.pause(350);
            sounds.menu.instance(renderer).rate.value = 1.2;
            await renderer.pause(350);
            sounds.menu.instance(renderer).rate.value = 1.2;
            await renderer.pause(650);
            sounds.menu.instance(renderer).rate.value = 1.6;
            await renderer.pause(1650);
            await dialogue('dialoguerBottom', ...text.a_citadel.story.choice5);
            const fd = fader({ alpha: 0 });
            await fd.alpha.modulate(renderer, 1000, 1);
            player.alpha.value = 0;
            instance('main', 'yourBastion')!.index = 7;
            instance('main', 'bastionTerminal')!.index = 1;
            await renderer.pause(1000);
            await fd.alpha.modulate(renderer, 1000, 0);
            await renderer.pause(1250);
            await dialogue('dialoguerBottom', ...text.a_citadel.story.choice6a);
            await renderer.pause(850);
            await fakedad.walk(renderer, 3, { y: 150 }, { x: 245 });
            await dialogue('dialoguerBottom', ...text.a_citadel.story.choice6b);
            fakedad.face = 'down';
            if (!SAVE.data.b.oops) {
               await renderer.pause(1250);
               await dialogue('dialoguerBottom', ...text.a_citadel.story.choice7);
            }
            const cym = sounds.cymbal.instance(renderer);
            fd.fill = 0xffffff;
            await fd.alpha.modulate(renderer, 5000, 1);
            cym.stop();
            fd.fill = 0;
            renderer.detach('main', fakedad);
            player.alpha.value = 1;
            SAVE.data.n.state_citadel_hp = SAVE.data.n.hp;
            SAVE.data.n.hp = 20;
            SAVE.data.s.state_citadel_armor = SAVE.data.s.armor;
            updateArmor('archive_armor');
            SAVE.data.s.state_citadel_weapon = SAVE.data.s.weapon;
            SAVE.data.s.weapon = 'archive_weapon';
            SAVE.data.s.state_citadel_inventory = SAVE.storage.inventory.contents.join(',');
            while (SAVE.storage.inventory.size > 0) {
               SAVE.storage.inventory.remove(0);
            }
            await Promise.all([
               renderer.pause(2500),
               teleport('c_archive_start', 'down', 50, 430, { fade: false, fast: true, cutscene: true })
            ]);
            renderer.detach('menu', fd);
            game.music = music.archive.instance(renderer, 0, true);
            game.movement = true;
         } else {
            twAssets1.unload();
            SAVE.data.n.state_citadel_refuse > 0 || (await renderer.pause(2450));
            await dialogue('dialoguerTop', ...text.a_citadel.story.choice2b());
            player.position.y += 3;
            await cam.position.modulate(renderer, 2000, { y: player.position.y });
            game.movement = true;
            game.camera = player;
         }
      },
      async bed () {
         if (game.movement && player.face === 'right') {
            game.movement = false;
            const fd = fader();
            await fd.alpha.modulate(renderer, 1000, 1);
            if (SAVE.data.b.svr || world.goatbro) {
               player.position.set(221 - 5, 137);
               player.face = 'right';
               if (SAVE.data.b.svr) {
                  goatbroTrue.metadata.override = true;
                  goatbroTrue.position.set(221 + 5, 137);
                  goatbroTrue.face = 'left';
                  goatbroTrue.sprite.reset();
               } else {
                  goatbro.metadata.override = true;
                  goatbro.position.set(221 + 5, 137);
                  goatbro.face = 'left';
                  goatbro.sprite.reset();
               }
            } else {
               player.position.set(221, 137);
               player.face = 'down';
            }
            await renderer.pause(1000);
            const bedcover = new CosmosSprite({
               position: { x: 206, y: 119 },
               frames: [ content.iooCAsgoreAsrielOver ]
            });
            renderer.attach('above', bedcover);
            await fd.alpha.modulate(renderer, 1000, 0);
            await renderer.pause(2000);
            await fd.alpha.modulate(renderer, 1000, 1);
            if (world.runaway) {
               await bullyEnding();
               return;
            }
            SAVE.data.n.hp = Math.max(SAVE.data.n.hp, Math.min(calcHP() + calcBonusHP(), 99));
            renderer.detach('above', bedcover);
            player.position.x = 195;
            player.face = 'left';
            for (const e of tracker.history) {
               e[0] = player.face;
               e[1].x = player.position.x;
               e[1].y = player.position.y;
            }
            if (SAVE.data.b.svr) {
               goatbroTrue.metadata.override = false;
            } else if (world.goatbro) {
               goatbro.metadata.override = false;
            }
            await renderer.pause(2000);
            game.movement = true;
            await fd.alpha.modulate(renderer, 300, 0);
            renderer.detach('menu', fd);
         }
      },
      async fireplace () {
         if (!game.movement) {
            return;
         }
         game.movement = false;
         await dialogue('auto', ...text.a_citadel.overworld.fireplace1());
         if (world.darker) {
            game.movement = true;
            return;
         }
         if (choicer.result === 0) {
            goatbro.metadata.override = true;
            goatbroTrue.metadata.override = true;
            const promo = Promise.all([
               SAVE.data.b.svr
                  ? goatbroTrue.walk(renderer, 1, { x: 168, y: 101 }).then(() => (goatbroTrue.face = 'down'))
                  : world.goatbro
                  ? goatbro.walk(renderer, 1, { x: 168, y: 101 }).then(() => (goatbro.face = 'down'))
                  : void 0,
               player.walk(renderer, 1, { x: 168 }, { x: 168, y: 72 }).then(() => {
                  player.face = 'down';
               })
            ]);
            await dialogue('auto', ...text.a_citadel.overworld.fireplace2b());
            if (!SAVE.data.b.svr && SAVE.data.n.plot === 72 && !world.runaway) {
               await dialogue('dialoguerTop', ...text.a_citadel.overworld.fireplace2c);
            }
            await promo;
            await directionalInput();
            await player.walk(renderer, 1, { y: 80 });
            goatbro.metadata.override = false;
            goatbroTrue.metadata.override = false;
            tracker.supplant('up');
         } else {
            await dialogue('auto', ...text.a_citadel.overworld.fireplace2a);
         }
         game.movement = true;
      },
      async fridge () {
         if (!game.movement) {
            return;
         }
         await dialogue('auto', ...text.a_citadel.overworld.fridgetrap1());
         if (SAVE.data.b.oops) {
            return;
         }
         await dialogue('auto', ...text.a_citadel.overworld.fridgetrap2());
         if (choicer.result === 1) {
            await dialogue('auto', ...text.a_citadel.overworld.fridgetrap3);
            return;
         }
         if (SAVE.storage.inventory.size === 8) {
            await dialogue('auto', ...text.a_citadel.overworld.toomuch1);
            return;
         }
         sounds.equip.instance(renderer);
         saver.add('chocolate');
         await dialogue('auto', ...text.a_citadel.overworld.fridgetrap4);
         SAVE.data.n.chocolates++;
      }
   } as Partial<CosmosKeyed<(roomState: any, scriptState: any, ...args: string[]) => any>>,
   tickers: {
      async c_start () {
         if (
            !SAVE.data.b.oops &&
            !SAVE.data.b.ultrashortcut &&
            SAVE.data.n.plot_datecheck < 2 &&
            player.position.x > 400 &&
            game.movement
         ) {
            if (SAVE.data.n.plot_datecheck === 0) {
               if (SAVE.data.n.plot_date < 1.1) {
                  SAVE.data.n.plot_datecheck = 1;
                  await dialogue('auto', ...text.a_citadel.truetext.monologue1());
               } else if (SAVE.data.n.plot_date < 2.1) {
                  SAVE.data.n.plot_datecheck = 2;
                  await dialogue('auto', ...text.a_citadel.truetext.monologue2);
               }
            } else if (1.1 <= SAVE.data.n.plot_date) {
               SAVE.data.n.plot_datecheck = 2;
               await dialogue('auto', ...text.a_citadel.truetext.monologue3);
            }
         }
      },
      c_archive_path1 () {
         renderer.region[1].x = 1 <= SAVE.data.n.state_citadel_archive ? 520 : 280;
      },
      c_archive_path2 () {
         renderer.region[0].x = 2 <= SAVE.data.n.state_citadel_archive ? 0 : 240;
      },
      c_archive_path3 () {
         renderer.region[1].y = player.position.x < 700 ? 220 : 3 <= SAVE.data.n.state_citadel_archive ? 340 : 120;
      },
      c_archive_path4 () {
         renderer.region[0].y = player.position.x > 280 ? 120 : 4 <= SAVE.data.n.state_citadel_archive ? 20 : 220;
      },
      c_archive_path5 () {
         renderer.region[1].x = 5 <= SAVE.data.n.state_citadel_archive ? 860 : 620;
      },
      c_archive_path6 () {
         renderer.region[0].x = 6 <= SAVE.data.n.state_citadel_archive ? 0 : 240;
      },
      c_archive_foundryA1 (roomState) {
         cf1_puzzle.state === 3 || pylon_update(roomState);
      },
      c_archive_foundryA2 (roomState) {
         cf1_puzzle.state === 3 || pylon_update(roomState);
      },
      c_archive_foundryA3 (roomState) {
         cf1_puzzle.state === 3 || pylon_update(roomState);
      },
      c_archive_foundryA4 (roomState) {
         cf1_puzzle.state === 3 || pylon_update(roomState);
      }
   } as { [k in CitadelRoomKey]?: (roomState: CitadelRS[k], ...args: string[]) => any },
   teleports: {
      async c_road1 () {
         if (SAVE.data.n.plot_approach < 2 && 70 <= SAVE.data.n.plot && world.bad_robot) {
            SAVE.data.n.plot_approach = 2;
            teleporter.movement = false;
            game.movement = false;
            await dialogue('auto', ...text.a_citadel.overworld.approachescape);
            game.movement = true;
         }
      },
      async c_elevator1 () {
         if (world.genocide && SAVE.data.n.plot < 70) {
            content.amApproach.load();
            SAVE.data.n.plot = 70;
            armaloop();
            SAVE.data.b.armaloop = true;
         }
         monologuer.aw(1, () => player.position.x > 700);
         monologuer.aw(2, () => player.position.x > 900);
         if (SAVE.data.n.plot === 72 && SAVE.data.n.plot_epilogue < 4 && !world.runaway) {
            SAVE.data.n.plot_epilogue = 4;
         } else if (!world.genocide && SAVE.data.n.plot < 70) {
            const bad = world.bad_robot;
            const goatdad = character(
               bad ? 'alphys' : 'asgore',
               bad ? characters.alphys : characters.asgore,
               bad ? { x: 960, y: 190 } : { x: 920, y: 150 },
               bad ? 'left' : 'up'
            );
            await Promise.race([ events.on('teleport'), renderer.when(() => player.position.x > 720 && game.movement) ]);
            if (game.room !== 'c_elevator1') {
               renderer.detach('main', goatdad);
               return;
            }
            let et = 0;
            const di = 37.5; // distance to asgore
            const sp = bad ? 4 : 3; // walk speed
            game.movement = false;
            SAVE.data.n.plot = 70;
            player.face = 'right';
            const storyAssets = new CosmosInventory(
               inventories.iocAsgore,
               content.amOutertale,
               content.avAsgore,
               inventories.idcAsgore
            );
            storyAssets.name = 'storyAssets';
            const storyLoader =
               bad || SAVE.flag.b.waaaaaooaaooooaaaaaaooohooohooohstooooryofunderrtaaaaale
                  ? void 0
                  : storyAssets.load();
            await renderer.pause(1450);
            const cam = new CosmosObject({ position: { x: player.position.x } });
            game.camera = cam;
            await cam.position.modulate(renderer, 2000, { x: 840 });
            await renderer.pause(3250);
            await dialogue('dialoguerTop', ...text.a_citadel.story.asgoreStoryPre1());
            await renderer.pause(1250);
            goatdad.face = 'left';
            await dialogue('dialoguerTop', ...text.a_citadel.story.asgoreStoryPre2());
            if (!bad) {
               await goatdad.walk(renderer, sp, { y: 190 }, { x: 960 });
               await renderer.pause(650);
               goatdad.face = 'left';
               await antifreeze([ storyLoader, renderer.pause(1250) ]);
               await dialogue('dialoguerTop', ...text.a_citadel.story.asgoreStoryPre3());
            }
            if (bad || SAVE.flag.b.waaaaaooaaooooaaaaaaooohooohooohstooooryofunderrtaaaaale) {
               goatdad.walk(renderer, sp, { x: 990 });
               await cam.position.modulate(renderer, 2000, { x: player.position.x });
               game.camera = player;
               renderer.detach('main', goatdad);
               goatdad.walk(renderer);
               game.movement = true;
               return;
            }
            const outertale = music.outertale.instance(renderer);
            const ender = new Promise<void>(res => outertale.source!.addEventListener('ended', () => res()));

            const fade = () => goatdad.alpha.modulate(renderer, 300, 0);

            const restore = () => {
               goatdad.position.set(
                  player.position.x + (player.face === 'left' ? -di : player.face === 'right' ? di : 0),
                  player.position.y + (player.face === 'up' ? -di : player.face === 'down' ? di : 0)
               );
               goatdad.alpha.value = 1;
            };

            const td = async (nav: string, ...lines: string[]) => {
               typer.magic = '{^5}{#x1}{%15}';
               await dialogue(nav, ...lines);
               typer.magic = '';
            };

            const hListener = async (h: string) => {
               if (h === 'x1') {
                  const ref = renderer.time;
                  await typer.on('read');
                  et += speech.presets.of('asgore').interval * 15 - (renderer.time - ref);
               }
            };

            const ep = (a: number) => {
               const etv = Math.min(et, 500);
               et -= etv;
               return renderer.pause(a + etv);
            };

            typer.on('header', hListener);
            goatdad.walk(renderer, sp, { x: 990 }).then(fade);
            await player.walk(renderer, 3, { x: 990, y: 190 });

            await teleport('c_pacing', 'right', 20, 170, world).then(restore);
            {
               game.camera = player;
               await ep(300);
               await td('dialoguerTop', ...text.a_citadel.story.asgoreStory1);
               SAVE.data.b.oops || dialogue('dialoguerTop', ...text.a_citadel.story.asgoreStory1r);
               goatdad.walk(renderer, sp, { x: 630 }).then(fade);
               await player.walk(renderer, sp, { x: 630 });
            }

            await teleport('c_courtyard', 'right', 20, 390, world).then(restore);
            {
               await ep(300);
               await td('dialoguerTop', ...text.a_citadel.story.asgoreStory2);
               SAVE.data.b.oops || dialogue('dialoguerTop', ...text.a_citadel.story.asgoreStory2r);
               goatdad.walk(renderer, sp, { x: 250 }, { y: 160 }).then(fade);
               await player.walk(renderer, sp, { x: 250 }, { y: 160 });
            }

            await teleport('c_asgore_front', 'up', 159, 230, world).then(restore);
            {
               await ep(0);
               goatdad.walk(renderer, sp, { y: 176.5 }, { x: 310 }).then(fade);
               await player.walk(renderer, sp, { y: 176.5 }, { x: 310 });
            }

            await teleport('c_asgore_hallway', 'right', 20, 146.5, world).then(restore);
            {
               await ep(300);
               await td('dialoguerTop', ...text.a_citadel.story.asgoreStory3);
               SAVE.data.b.oops || dialogue('dialoguerTop', ...text.a_citadel.story.asgoreStory3r);
               goatdad.walk(renderer, sp, { x: 588.5 }, { y: 120 }).then(fade);
               await player.walk(renderer, sp, { x: 588.5 }, { y: 120 });
            }

            await teleport('c_asgore_asgore', 'up', 191.5, 230, world).then(restore);
            {
               await ep(0);
               await Promise.all([
                  goatdad.walk(renderer, sp, { y: 190 }, { x: 110, y: 95 }),
                  player.walk(renderer, sp, { y: goatdad.position.y }, { x: 110, y: 95 + di / 2 }).then(() => {
                     player.face = 'up';
                  })
               ]);
               await ep(850);
               shake(1, 400);
               sounds.shake.instance(renderer);
               await ep(1250);
               await td('dialoguerBottom', ...text.a_citadel.story.asgoreStory4);
               SAVE.data.b.oops || dialogue('dialoguerTop', ...text.a_citadel.story.asgoreStory4r);
               goatdad.walk(renderer, sp, { x: 191.5, y: 230 }).then(fade);
               await player.walk(renderer, 3, { x: 90 }, { x: 110 }, { x: 191.5, y: 230 });
            }

            await teleport('c_asgore_hallway', 'down', 588.5, 122, world).then(restore);
            {
               await ep(0);
               await Promise.all([
                  goatdad.walk(renderer, sp, { x: 250 }),
                  player.walk(renderer, sp, { y: goatdad.position.y }, { x: 250 + di })
               ]);
               await td('dialoguerTop', ...text.a_citadel.story.asgoreStory5);
               SAVE.data.b.oops || dialogue('dialoguerTop', ...text.a_citadel.story.asgoreStory5r);
               goatdad.walk(renderer, sp, { x: 10 }).then(fade);
               await player.walk(renderer, sp, { x: 10 });
            }

            await teleport('c_asgore_front', 'left', 300, 176.5, world).then(restore);
            {
               await ep(0);
               goatdad.walk(renderer, sp, { x: 10 }).then(fade);
               await player.walk(renderer, 3, { x: 10 });
            }

            await teleport('c_asgore_living', 'left', 300, 173.5, world).then(restore);
            {
               await ep(300);
               await td('dialoguerTop', ...text.a_citadel.story.asgoreStory6);
               SAVE.data.b.oops || dialogue('dialoguerBottom', ...text.a_citadel.story.asgoreStory6r);
               goatdad.walk(renderer, sp, { x: 66.5, y: 100 }, { y: 10 }).then(fade);
               await player.walk(renderer, 3, { x: goatdad.position.x }, { x: 66.5, y: 100 }, { y: 10 });
            }

            await teleport('c_asgore_kitchen', 'up', 127.5, 230, world).then(restore);
            {
               await ep(0);
               await Promise.all([
                  goatdad.walk(renderer, sp, { x: 190 }, { y: 165 }),
                  player.walk(renderer, sp, { y: goatdad.position.y }, { x: 190 }, { y: 165 + di / 2 })
               ]);
               await ep(850);
               await td('dialoguerTop', ...text.a_citadel.story.asgoreStory7);
               SAVE.data.b.oops || dialogue('dialoguerTop', ...text.a_citadel.story.asgoreStory7r);
               sounds.switch.instance(renderer);
               await ep(1250);
               goatdad.walk(renderer, sp, { y: 190 }, { x: 127.5 }, { y: 230 }).then(fade);
               await player.walk(renderer, 3, { x: 210 });
               player.face = 'left';
               await ep(500);
               await player.walk(renderer, sp, { x: 190 }, { y: 190 }, { x: 127.5 }, { y: 230 });
            }

            await teleport('c_asgore_living', 'down', 66.5, 10, world).then(restore);
            {
               await ep(0);
               await Promise.all([
                  goatdad.walk(renderer, sp, { y: 100 }, { x: 170 }),
                  player.walk(renderer, sp, { y: 100 }, { x: 170 - di })
               ]);
               await td('dialoguerBottom', ...text.a_citadel.story.asgoreStory8);
               SAVE.data.b.oops || dialogue('dialoguerTop', ...text.a_citadel.story.asgoreStory8r);
               goatdad.walk(renderer, sp, { x: 310, y: 173.5 }).then(fade);
               await player.walk(renderer, sp, { x: 170 }, { x: 310, y: 173.5 });
            }

            await teleport('c_asgore_front', 'right', 20, 175.5, world).then(restore);
            {
               await ep(0);
               goatdad.walk(renderer, sp, { x: 159 }, { y: 230 }).then(fade);
               await player.walk(renderer, sp, { x: 159 }, { y: 230 });
            }

            await teleport('c_courtyard', 'down', 250, 150, world).then(restore);
            {
               await ep(300);
               await td('dialoguerTop', ...text.a_citadel.story.asgoreStory9);
               SAVE.data.b.oops || dialogue('dialoguerBottom', ...text.a_citadel.story.asgoreStory9r);
               goatdad
                  .walk(renderer, sp, { y: 260 }, { x: 380 }, { x: 380 }, { x: 440, y: 200 }, { x: 510 })
                  .then(fade);
               await player.walk(renderer, sp, { y: 260 }, { x: 380 }, { x: 380 }, { x: 440, y: 200 }, { x: 510 });
            }

            await teleport('c_alley', 'right', 20, 180, world).then(restore);
            {
               await ep(300);
               await td('dialoguerTop', ...text.a_citadel.story.asgoreStory10);
               await Promise.all([ goatdad.walk(renderer, sp, { x: 320 }), player.walk(renderer, sp, { x: 320 - di }) ]);
               await td('dialoguerTop', ...text.a_citadel.story.asgoreStory11);
               goatdad.walk(renderer, sp, { x: 470 }).then(fade);
               await player.walk(renderer, 3, { x: 470 });
            }

            await teleport('c_story', 'right', 20, 180, world).then(restore);
            {
               await ep(300);
               await td('dialoguerTop', ...text.a_citadel.story.asgoreStory12);
               SAVE.data.b.oops || dialogue('dialoguerTop', ...text.a_citadel.story.asgoreStory12r);
               let idx = 0;
               const inc = 400;
               while (goatdad.position.x < 2000 - inc) {
                  const dx = goatdad.position.x + inc;
                  await Promise.all([ goatdad.walk(renderer, sp, { x: dx }), player.walk(renderer, sp, { x: dx - di }) ]);
                  await td(
                     'dialoguerTop',
                     ...[
                        text.a_citadel.story.asgoreStory13,
                        text.a_citadel.story.asgoreStory14,
                        text.a_citadel.story.asgoreStory15,
                        text.a_citadel.story.asgoreStory16
                     ][idx]
                  );
                  SAVE.data.b.oops ||
                     dialogue(
                        'dialoguerTop',
                        ...[ text.a_citadel.story.asgoreStory13r, text.a_citadel.story.asgoreStory14r, [], [] ][idx]
                     );
                  idx++;
               }
               goatdad.walk(renderer, sp, { x: 1990 }).then(fade);
               await player.walk(renderer, 3, { x: 1990 });
            }

            await teleport('c_elevator2', 'right', 20, 180, world).then(restore);
            {
               await ep(300);
               await td('dialoguerTop', ...text.a_citadel.story.asgoreStory17);
               await Promise.all([ goatdad.walk(renderer, sp, { x: 230 }), player.walk(renderer, sp, { x: 230 - di }) ]);
               await ep(850);
               goatdad.face = 'left';
               await ep(1250);
               await td('dialoguerTop', ...text.a_citadel.story.asgoreStory18());
               SAVE.flag.b.waaaaaooaaooooaaaaaaooohooohooohstooooryofunderrtaaaaale = true;
               if (SAVE.data.b.killed_mettaton || world.baddest_lizard) {
                  await ep(4150);
                  await dialogue('dialoguerTop', ...text.a_citadel.story.asgoreStory21);
                  await ep(2000);
                  goatdad.face = 'down';
                  await ep(1250);
                  await dialogue('dialoguerTop', ...text.a_citadel.story.asgoreStory22);
                  await goatdad.walk(renderer, sp, { y: 230 }).then(fade);
                  renderer.detach('main', goatdad);
               } else {
                  await ep(1650);
                  const mybeloved = character('alphys', characters.alphys, { x: 20, y: 180 }, 'right', { alpha: 0 });
                  mybeloved.sprite.enable();
                  mybeloved.alpha.modulate(renderer, 300, 1);
                  await ep(500);
                  mybeloved.sprite.disable();
                  mybeloved.face = 'up';
                  mybeloved.sprite.enable();
                  await ep(500);
                  mybeloved.sprite.disable();
                  mybeloved.face = 'down';
                  mybeloved.sprite.enable();
                  await ep(500);
                  mybeloved.sprite.disable();
                  mybeloved.face = 'left';
                  mybeloved.sprite.enable();
                  await ep(500);
                  mybeloved.sprite.disable();
                  mybeloved.face = 'right';
                  mybeloved.sprite.enable();
                  await ep(1650);
                  await mybeloved.walk(renderer, 3, { x: player.position.x - 30 });
                  await dialogue('dialoguerTop', ...text.a_citadel.story.asgoreStory19);
                  await ep(850);
                  goatdad.face = 'down';
                  await ep(1250);
                  await dialogue('dialoguerTop', ...text.a_citadel.story.asgoreStory20a);
                  goatdad
                     .walk(renderer, sp, { y: 230 })
                     .then(fade)
                     .then(() => renderer.detach('main', goatdad));
                  await dialogue('dialoguerTop', ...text.a_citadel.story.asgoreStory20b);
                  await mybeloved.walk(renderer, sp, { x: 230, y: 190 }, { y: 230 });
                  await mybeloved.alpha.modulate(renderer, 300, 0);
                  renderer.detach('main', mybeloved);
               }
               typer.off('header', hListener);
               SAVE.data.b.oops || (await dialogue('dialoguerBottom', ...text.a_citadel.truetext.storyEnding()));
               game.movement = true;
               await ender;
               storyAssets.unload();
            }
         } else if (
            SAVE.data.n.plot_approach < 2 &&
            SAVE.data.n.plot_approach > 0 &&
            70 <= SAVE.data.n.plot &&
            world.bad_robot
         ) {
            SAVE.data.n.plot_approach = 2;
            teleporter.movement = false;
            game.movement = false;
            await dialogue('auto', ...text.a_citadel.overworld.approachescape);
            game.movement = true;
         }
      },
      async c_pacing () {
         monologuer.aw(3, () => player.position.x > 320);
      },
      async c_courtyard (roomState) {
         monologuer.aw(4, () => player.position.x > 180 || player.position.y < 340);
         monologuer.aw(5, () => player.position.y < 160);
         if (
            (!world.genocide && !world.bad_robot) ||
            (SAVE.data.b.c_state_switch1 && SAVE.data.b.c_state_switch2) ||
            SAVE.data.n.plot === 72
         ) {
            for (const inst of instances('main', 'c_pylon')) {
               const objects = inst.object.objects;
               if (objects.length > 1) {
                  const [ anim ] = objects as [CosmosAnimation, CosmosHitbox];
                  anim.index = 5;
                  objects.splice(1, objects.length - 1);
               }
            }
         }
         if (SAVE.data.n.plot === 72 && SAVE.data.n.plot_epilogue < 3 && !world.runaway && !roomState.susser) {
            roomState.susser = true;
            await renderer.when(
               () =>
                  game.room === 'c_courtyard' &&
                  (player.position.x <= 360 || (290 <= player.position.y && player.position.x <= 390)) &&
                  game.movement
            );
            game.movement = false;
            SAVE.data.n.plot_epilogue = 3;
            const daddy = character('asgore', characters.asgore, { x: 250, y: 150 }, 'down', { alpha: 0 });
            await daddy.alpha.modulate(renderer, 300, 1);
            await daddy.walk(renderer, 3, { y: player.position.y }, { x: player.position.x - 60 });
            daddy.face = 'right';
            header('x1').then(() => {
               shake(1, 400);
               sounds.shake.instance(renderer);
            });
            await dialogue('auto', ...text.a_citadel.story.epilogue3);
            await renderer.pause(1000);
            game.movement = true;
            await Promise.race([
               events.on('teleport'),
               daddy.walk(renderer, 3, { x: 250 }, { y: 150 }).then(() => daddy.alpha.modulate(renderer, 300, 0))
            ]);
            renderer.detach('main', daddy);
         }
         if (!roomState.active) {
            roomState.active = true;
            if (world.genocide && SAVE.data.n.plot < 71) {
               await renderer.when(
                  () =>
                     game.room === 'c_courtyard' &&
                     player.position.x > 460 &&
                     SAVE.data.b.c_state_switch1 &&
                     SAVE.data.b.c_state_switch2 &&
                     game.movement
               );
               game.movement = false;
               SAVE.data.n.plot = 71;
               player.face = 'right';
               const mx = SAVE.flag.n.ga_asrielMonologueX++;
               mx < 1 && (await dialogue('auto', ...text.a_citadel.genotext.monologueX1));
               goatbro.metadata.override = true;
               await goatbro.walk(
                  renderer,
                  3,
                  { y: player.position.y > 200 ? player.position.y - 10 : player.position.y + 10 },
                  { x: player.position.x + 21 },
                  { y: player.position.y }
               );
               await renderer.pause(1000);
               goatbro.face = 'left';
               await dialogue('auto', ...text.a_citadel.genotext.monologueX2());
               await goatbro.walk(renderer, 3, { x: player.position.x + 12.5 });
               player.alpha.value = 0;
               goatbro.alpha.value = 0;
               let sp = 3;
               const rh = new CosmosAnimation({
                  anchor: { x: 0, y: 1 },
                  position: player.position.add(6.25, 0),
                  resources: SAVE.data.b.water ? content.iocAsrielRightHandholdWater : content.iocAsrielRightHandhold
               }).on('tick', function () {
                  this.active && (this.position.x += sp);
               });
               renderer.attach('main', rh);
               if (mx < 1) {
                  await renderer.pause(850);
                  await dialogue('auto', ...text.a_citadel.genotext.monologueX3);
               }
               for (const instanze of music.approach.instances) {
                  instanze.source!.loopStart = 0;
                  instanze.source!.loopEnd = 0;
                  instanze.loop = false;
               }
               rh.enable();
               await renderer.when(() => rh.position.x > 510);
               rh.reset();
               await teleport('c_alley', 'right', 20, 180, world);
               game.camera = rh;
               rh.position.set(player);
               rh.enable();
               await renderer.when(() => rh.position.x > 470);
               rh.reset();
               await teleport('c_story', 'right', 20, 180, world);
               sp = 2;
               rh.position.set(player);
               rh.enable();
               await renderer.when(() => rh.position.x > 1990);
               rh.reset();
               await teleport('c_elevator2', 'right', 20, 180, world);
               sp = 3;
               rh.position.set(player);
               rh.enable();
               await renderer.when(() => 230 <= rh.position.x);
               renderer.detach('main', rh);
               player.position.set(rh.position.subtract(6.25, 0));
               goatbro.position.set(player.position.add(12.5, 0));
               player.alpha.value = 1;
               goatbro.alpha.value = 1;
               await goatbro.walk(renderer, 3, { x: player.position.x + 21 });
               goatbro.face = 'left';
               await renderer.pause(850);
               SAVE.flag.n.ga_asrielMonologueY += 1;
               await dialogue('auto', ...text.a_citadel.genotext.monologueX4());
               await goatbro.walk(renderer, 3, player.position.add(0, 21), player.position.subtract(21, 0));
               await renderer.pause(650);
               goatbro.face = 'right';
               await renderer.pause(850);
               await dialogue('auto', ...text.a_citadel.genotext.monologueX5);
               goatbro.metadata.override = false;
               tracker.supplant('right');
               game.movement = true;
               SAVE.data.b.armaloop = false;
               game.camera = player;
            }
            if (world.bad_robot && SAVE.data.n.plot_approach < 1) {
               teleporter.movement = false;
               SAVE.data.n.plot_approach = 1;
               const liz = temporary(character('alphys', characters.alphys, { x: 300, y: 390 }, 'left'), 'main');
               await renderer.pause(850);
               await dialogue('auto', ...text.a_citadel.story.alphysApproach1);
               game.movement = true;
               await liz.walk(renderer, 4, { x: 400, y: 290 }, { y: 240 }, { x: 440, y: 200 }, { x: 510 });
               if (game.room === 'c_courtyard') {
                  sounds.retract.instance(renderer);
               }
               renderer.detach('main', liz);
            }
         }
      },
      c_alley () {
         if (world.genocide) {
            SAVE.data.b.c_state_switch1 = true;
            SAVE.data.b.c_state_switch2 = true;
         }
      },
      async c_asgore_front () {
         monologuer.aw(6, () => player.position.x < 40 || player.position.x > 280);
         if (SAVE.data.n.plot === 72 && !SAVE.data.b.svr && !world.runaway) {
            renderer.layers.above.container.filters = [ filters.bloomX ];
            events.on('teleport-update').then(() => {
               renderer.layers.above.container.filters = [];
               filters.bloomX.bloomScale = 1;
            });
            const alphys = temporary(
               new CosmosObject({
                  position: { x: 150, y: 88 },
                  metadata: { tags: [ 'tvlizard' ] },
                  priority: 96,
                  objects: [ new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAlphysSit }) ]
               }),
               'main'
            );
            const undyne = temporary(
               new CosmosObject({
                  position: { x: 172, y: 92 },
                  metadata: { tags: [ 'tvfish' ] },
                  priority: 96,
                  objects: [ new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneDateSit }) ]
               }),
               'main'
            );
            const tv = temporary(
               new CosmosSprite({
                  position: 160,
                  anchor: { x: 0, y: 1 },
                  frames: [ content.iooCTvBack ],
                  objects: [
                     new CosmosHitbox({
                        size: { x: 52, y: 18 },
                        anchor: { x: 0, y: 1 },
                        metadata: { barrier: true, interact: true, name: 'trivia', args: [ 'tv_back' ] }
                     })
                  ]
               }),
               'main'
            );
            const tc = temporary(
               new CosmosSprite({
                  anchor: { x: 0, y: 1 },
                  position: { x: 160, y: 95 },
                  frames: [ content.iooCTopcouch ],
                  objects: [
                     new CosmosHitbox({
                        size: { x: 70, y: 18 },
                        anchor: { x: 0, y: 1 },
                        metadata: { barrier: true }
                     }),
                     new CosmosHitbox({
                        position: { x: -10 },
                        size: { x: 20, y: 18 },
                        anchor: { x: 0, y: 1 },
                        metadata: { interact: true, name: 'citadel', args: [ 'npc', 'tvlizard' ] }
                     }),
                     new CosmosHitbox({
                        position: { x: 12 },
                        size: { x: 20, y: 18 },
                        anchor: { x: 0, y: 1 },
                        metadata: { interact: true, name: 'citadel', args: [ 'npc', 'tvfish' ] }
                     })
                  ]
               }),
               'main'
            );
            const li = temporary(
               new CosmosSprite({ position: 160, anchor: { x: 0, y: 1 }, frames: [ content.iooCTvLite ] }),
               'above'
            );
            temporary(
               new CosmosSprite({
                  priority: 1000,
                  frames: [ content.iooCCAsgoreFrontOver ],
                  metadata: { time: 0, levels: [ 0, ...CosmosUtils.populate(48, () => Math.random()), 0 ] }
               }).on('tick', function () {
                  const value = CosmosMath.linear(this.metadata.time, ...this.metadata.levels);
                  li.alpha.value = 0.2 + value * 0.2;
                  filters.bloomX.bloomScale = 0.5 + value * 0.5;
                  const tint = CosmosImageUtils.gradient(0, 0xffffff, li.alpha.value);
                  this.tint = tint;
                  player.tint = tint;
                  alphys.tint = tint;
                  undyne.tint = tint;
                  tv.tint = tint;
                  tc.tint = tint;
                  this.metadata.time += 1 / 50 / 5;
                  while (1 <= this.metadata.time) {
                     this.metadata.time -= 1;
                  }
               }),
               'below',
               () => {
                  player.tint = void 0;
               }
            );
         }
      },
      async c_asgore_living () {
         world.runaway && instance('main', 'fire')?.destroy();
         monologuer.aw(7, () => player.position.x < 140 && player.position.y < 140);
         SAVE.data.b.c_state_switch2 ||
            monologuer.aw(8, () => player.position.y > 140 && player.position.x > 260 && SAVE.data.b.c_state_switch2);
      },
      async c_asgore_kitchen () {
         monologuer.aw(9, () => player.position.y < 180);
         SAVE.data.b.item_starling_tea && instance('below', 'startea')?.destroy();
         if (SAVE.data.n.plot === 72 && !SAVE.data.b.svr && !world.runaway) {
            temporary(
               character('sans', characters.sans, { x: 95, y: 201 }, 'right', {
                  metadata: {
                     barrier: true,
                     interact: true,
                     name: 'trivia',
                     args: [ 'partysans' ]
                  },
                  size: {
                     x: 23,
                     y: 5
                  },
                  anchor: { x: 0, y: 1 }
               }),
               'main'
            ).on('tick', function () {
               if (this.talk) {
                  this.face = ultimaFacer(this);
               } else if (typer.mode === 'empty') {
                  this.face = 'right';
               }
            });
            temporary(
               character('papyrus', characters.papyrus, { x: 225, y: 167 }, 'up', {
                  metadata: {
                     barrier: true,
                     interact: true,
                     name: 'citadel',
                     args: [ 'npc', 'picnic_papyrus' ],
                     tags: [ 'picnic_papyrus' ]
                  },
                  size: { x: 25, y: 6 },
                  anchor: { x: 0, y: 1 }
               }),
               'main'
            ).on('tick', function () {
               if (this.talk) {
                  this.face = ultimaFacer(this);
               } else if (typer.mode === 'empty') {
                  this.face = 'up';
               }
            });
         }
      },
      async c_asgore_hallway () {
         monologuer.aw(10, () => player.position.x > 220);
         monologuer.aw(11, () => player.position.x > 480);
         if (!SAVE.data.b.c_state_switch1) {
            monologuer.aw(12, () => player.position.x < 480 && SAVE.data.b.c_state_switch1);
            monologuer.aw(13, () => player.position.x < 220 && SAVE.data.b.c_state_switch1);
         }
         temporary(
            new CosmosObject({
               priority: 10,
               objects: [
                  new CosmosSprite({ frames: [ content.iooCMirror ] }).on('pre-render', function () {
                     this.position.set(renderer.projection({ x: 647, y: 80 }));
                  }),
                  new CosmosAnimation({ anchor: { x: 0, y: 1 } }).on('pre-render', function () {
                     const y = 116.5 - (player.position.y - 116.5);
                     this.priority.value = y + 0.001;
                     this.position.set(renderer.projection({ x: player.position.x, y }));
                     this.use((SAVE.data.b.water ? friskMirrorWater : friskMirror)[player.face]);
                     this.index = player.sprite.index;
                     this.fix();
                  }),
                  new CosmosAnimation({ anchor: { x: 0, y: 1 } }).on('pre-render', function () {
                     if (SAVE.data.b.svr || world.goatbro) {
                        const target = SAVE.data.b.svr ? goatbroTrue : goatbro;
                        const y = 116.5 - (target.position.y - 116.5);
                        this.priority.value = y;
                        this.position.set(renderer.projection({ x: target.position.x, y }));
                        const source = target.sprites[
                           { right: 'right', left: 'left', up: 'down', down: 'up' }[target.face] as CosmosDirection
                        ] as CosmosAnimation;
                        this.use(source.resources);
                        this.index = (target.sprite.index + 2) % 4;
                        this.fix();
                     }
                  })
               ]
            }),
            'base'
         );
      },
      async c_asgore_asgore () {
         monologuer.aw(15, () => player.position.x < 160);
      },
      async c_asgore_asriel () {
         SAVE.data.b.item_big_dipper && (instance('main', 'giftbox1')!.index = 1);
         SAVE.data.b.item_heart_locket && (instance('main', 'giftbox2')!.index = 1);
         SAVE.data.b.ultrashortcut || instance('below', 'ultranote')?.destroy();
      },
      async c_elevator2 () {
         if (world.bad_robot && SAVE.data.n.plot_approach < 2) {
            teleporter.movement = false;
            SAVE.data.n.plot_approach = 2;
            const liz = temporary(character('alphys', characters.alphysSad, { x: 230, y: 240 }, 'up'), 'main');
            await liz.walk(renderer, 2, { y: player.position.y });
            await notifier(liz, true, 30);
            liz.face = 'left';
            await renderer.pause(1650);
            await dialogue('auto', ...text.a_citadel.story.alphysApproach2);
            await liz.walk(renderer, 2, { x: player.position.x + 30 });
            await renderer.pause(3000);
            await dialogue('auto', ...text.a_citadel.story.alphysApproach3);
            await liz.walk(renderer, 4, { x: 10, y: player.position.y + 10 });
            await liz.alpha.modulate(renderer, 300, 0);
            renderer.detach('main', liz);
            game.movement = true;
         }
      },
      async c_courtroom (roomState) {
         const hsl = new HslAdjustmentFilter({ saturation: SAVE.data.n.plot === 72 ? 0.92 : 0.94 });
         renderer.layers.base.container.filters = [ hsl ];
         renderer.layers.below.container.filters = [
            new AdvancedBloomFilter({ threshold: 0.7, bloomScale: 0.6, brightness: 1, quality: 10 })
         ];
         events.on('teleport-update').then(() => {
            renderer.layers.base.container.filters = [];
            renderer.layers.below.container.filters = [];
         });
         const pillar = temporary(
            new CosmosObject({
               position: { x: 360.5 },
               parallax: { x: -1 },
               objects: CosmosUtils.populate(
                  10,
                  index =>
                     new CosmosSprite({
                        frames: [ content.iooCPillar ],
                        position: { x: index < 9 ? index * 230 : 230 * 5 + 115 }
                     })
               )
            }).on('tick', function () {
               hsl.hue = saver.time / 5;
            }),
            'above'
         );
         temporary(new CosmosRectangle({ position: { x: 0, y: 200 }, size: { x: 1400, y: 40 }, fill: 0 }), 'above');
         if (SAVE.data.n.plot === 72 && !world.runaway) {
            if (SAVE.data.n.plot_epilogue > 2) {
               instance('main', 'sanser')?.destroy();
            } else {
               const s = instance('main', 'sanser');
               if (s) {
                  if (s.object.tint !== 0) {
                     s.object.tint = 0;
                     s.object.on('tick', function () {
                        const x = game.camera.position.x;
                        const l = x > 1190 ? -10 : x > 960 ? 0 : x > 730 ? 1 : x > 510 ? 2 : x > 290 ? 3 : 10;
                        this.position.x = 1050 - 240 * l;
                        this.metadata.location = l;
                     });
                     if (SAVE.data.n.plot_epilogue < 2 && !roomState.susser) {
                        roomState.susser = true;
                        await renderer.when(
                           () => game.room === 'c_courtroom' && player.position.x <= 1120 && game.movement
                        );
                        SAVE.data.n.plot_epilogue = 2;
                        await dialogue('auto', ...text.a_citadel.story.epilogue2());
                        game.movement = true;
                     }
                  }
               }
            }
         }
         if (roomState.active) {
            return;
         }
         roomState.active = true;
         if (world.genocide && SAVE.data.n.plot < 71.1) {
            battler.load(groups.alphys);
            await renderer.when(() => game.room === 'c_courtroom' && player.position.x > 1120 && game.movement);
            game.movement = false;
            SAVE.data.n.plot = 71.1;
            music.approach.stop();
            content.amApproach.unload();
            shake(2, 500);
            sounds.pathway.instance(renderer);
            pillar.tint = 0;
            renderer.layers.below.objects[0].tint = 0;
            await renderer.pause(310);
            const ep = sounds.electropulse.instance(renderer);
            await renderer.pause(430);
            SAVE.flag.n.genocide_milestone < 5 && (SAVE.flag.b.mad_lizard = true);
            const sT = renderer.time;
            const sY = new CosmosValue();
            const beam = new CosmosRectangle({
               area: renderer.area,
               position: player.position.subtract(0, 15),
               anchor: 0,
               size: { x: 400 },
               priority: 999,
               fill: 0xffffff,
               filters: [ filters.bloomX ]
            }).on('tick', function () {
               const sB = sineWaver(sT, 200, 0, 1);
               this.size.y = (10 + sB * 2) * sY.value;
               const sX = CosmosImageUtils.gradient(0, 0xffffff, 0.2 + sB * 0.1);
               pillar.tint = sX;
               renderer.layers.below.objects[0].tint = sX;
            });
            renderer.shake.value = 4;
            renderer.attach('main', beam);
            sY.modulate(renderer, 100, 1);
            await renderer.pause(770);
            ep.stop();
            battler.SOUL.metadata.color = 'cyan';
            renderer.shake.value = 0;
            await battler.encounter(player, groups.alphys, false, void 0, { x: 160, y: 160 });
            renderer.detach('main', beam);
            pillar.tint = void 0;
            renderer.layers.below.objects[0].tint = void 0;
            if (SAVE.flag.n.ga_asrielFinally++ < 1) {
               await renderer.pause(1000);
               await dialogue('auto', ...text.a_citadel.genotext.afterfight1);
            }
            game.movement = true;
         }
         if (!world.genocide && SAVE.data.n.plot < 71) {
            const lv = calcLV();
            const ut_geno = lv > 14;
            const idealX = ut_geno ? 1110 : 810;
            await renderer.when(() => {
               if (game.room === 'c_courtroom' && idealX <= player.position.x && game.movement) {
                  player.position.x = idealX;
                  game.movement = false;
                  player.face = 'right';
                  return true;
               } else {
                  return false;
               }
            });
            music.outertale.stop();
            SAVE.data.n.plot = 71;
            const ultraAssets = new CosmosInventory(
               content.amMuscle,
               content.iocSansIcecream1,
               content.iocSansIcecream2,
               content.iocSansIcecream3,
               content.iocSansIcecream4,
               content.iocSansIcecream5,
               content.iocSansIcecream6,
               content.iocSansIcecream7,
               content.iocSansIcecream8
            );
            ultraAssets.name = 'ultraAssets';
            const choiceLoader = ut_geno
               ? void 0
               : SAVE.data.b.ultrashortcut
               ? ultraAssets.load()
               : content.amChoice.load();
            if (ut_geno) {
               await dialogue('dialoguerTop', ...text.a_citadel.story.jspeech10a);
            } else {
               await renderer.pause(1000);
            }
            const cam = new CosmosObject({ position: { x: idealX } });
            const ogY = player.position.y;
            const tgY = Math.min(Math.max(player.position.y, 150), 190);
            const susser = character('sus', characters.sans, { x: 930, y: tgY }, 'left', {
               alpha: 0,
               tint: 0,
               metadata: { m: false, v: true }
            }).on('tick', function () {
               this.alpha.value = this.metadata.v && (ut_geno ? cam.position.x < 1074 : cam.position.x > 840) ? 1 : 0;
               if (ut_geno ? cam.position.x < idealX : cam.position.x > 840) {
                  this.metadata.m = true;
                  player.position.y = tgY;
               } else if (this.metadata.m && (ut_geno ? cam.position.x === idealX : cam.position.x <= 840)) {
                  renderer.detach('main', this);
                  player.position.y = ogY;
               }
            });
            game.camera = cam;
            await cam.position.modulate(renderer, 3000, { x: ut_geno ? 984 : 904.25 });
            await renderer.pause(1000);
            let choice = null as CosmosInstance | null;
            if (ut_geno) {
               await dialogue('dialoguerTop', ...text.a_citadel.story.jspeech10b);
               await renderer.pause(5000);
               await dialogue('dialoguerTop', ...text.a_citadel.story.jspeech10c);
               await renderer.pause(3000);
               await dialogue('dialoguerTop', ...text.a_citadel.story.jspeech10d);
               await renderer.pause(1000);
            } else {
               sounds.judgement.instance(renderer);
               await antifreeze([ choiceLoader, renderer.pause(10000) ]);
               if (SAVE.data.b.ultrashortcut ? SAVE.flag.n.meet3 < 1 : SAVE.flag.n.meet2 < 2) {
                  await dialogue('dialoguerTop', ...text.a_citadel.story.jspeech1());
               }
               if (SAVE.data.b.ultrashortcut) {
                  await renderer.pause(2500);
                  await dialogue('dialoguerTop', ...text.a_citadel.story.jspeechU1());
                  await renderer.pause(750);
                  susser.metadata.v = false;
                  const creamer = new CosmosAnimation({
                     anchor: { x: 0, y: 1 },
                     position: susser,
                     resources: content.iocSansIcecream1
                  });
                  renderer.attach('main', creamer);
                  await renderer.pause(1750);
                  const muscle = music.muscle.instance(renderer);
                  await dialogue('dialoguerTop', ...text.a_citadel.story.jspeechU2);
                  creamer.enable();
                  await renderer.pause(8000);
                  creamer.disable();
                  creamer.resources = content.iocSansIcecream2;
                  await renderer.pause(2000);
                  creamer.reset();
                  await dialogue('dialoguerTop', ...text.a_citadel.story.jspeechU3);
                  creamer.enable();
                  await renderer.pause(10000);
                  creamer.disable();
                  creamer.resources = content.iocSansIcecream3;
                  await renderer.pause(1000);
                  creamer.reset();
                  await dialogue('dialoguerTop', ...text.a_citadel.story.jspeechU4);
                  creamer.enable();
                  await renderer.pause(9000);
                  creamer.disable();
                  creamer.resources = content.iocSansIcecream4;
                  await renderer.pause(3000);
                  creamer.reset();
                  await dialogue('dialoguerTop', ...text.a_citadel.story.jspeechU5);
                  creamer.enable();
                  await renderer.pause(10000);
                  creamer.disable();
                  creamer.resources = content.iocSansIcecream5;
                  await renderer.pause(3000);
                  creamer.reset();
                  await dialogue('dialoguerTop', ...text.a_citadel.story.jspeechU6());
                  creamer.enable();
                  await renderer.pause(12000);
                  creamer.disable();
                  creamer.resources = content.iocSansIcecream6;
                  await renderer.pause(2000);
                  creamer.reset();
                  await dialogue('dialoguerTop', ...text.a_citadel.story.jspeechU7);
                  creamer.enable();
                  await renderer.pause(14000);
                  creamer.disable();
                  creamer.resources = content.iocSansIcecream7;
                  await renderer.pause(1000);
                  creamer.reset();
                  await dialogue('dialoguerTop', ...text.a_citadel.story.jspeechU8);
                  creamer.enable();
                  await renderer.pause(13000);
                  creamer.disable();
                  creamer.resources = content.iocSansIcecream8;
                  await renderer.pause(3000);
                  creamer.reset();
                  await dialogue('dialoguerTop', ...text.a_citadel.story.jspeechU9);
                  creamer.enable();
                  await renderer.pause(14000);
                  creamer.disable();
                  await Promise.all([
                     muscle.gain.modulate(renderer, 5000, 0).then(() => muscle.stop()),
                     renderer.pause(1000).then(async () => {
                        creamer.reset().use(content.iocSansLeft);
                        await renderer.pause(2000);
                        renderer.detach('main', creamer);
                        susser.metadata.v = true;
                     })
                  ]);
                  await renderer.pause(1000);
                  await dialogue('dialoguerTop', ...text.a_citadel.story.jspeechU10(ogY < 140));
                  ultraAssets.unload();
               } else {
                  await renderer.pause(1000);
                  const meet1 = lv < 2 && SAVE.flag.n.meet1 > 0 ? SAVE.flag.n.meet1 : SAVE.flag.n.meet1++;
                  choice = music.thechoice.instance(renderer);
                  if (lv < 2) {
                     await dialogue(
                        'dialoguerTop',
                        ...[
                           [ text.a_citadel.story.jspeech2, text.a_citadel.story.jspeech3 ][lv],
                           text.a_citadel.story.jspeech7,
                           text.a_citadel.story.jspeech8,
                           text.a_citadel.story.jspeech9
                        ][Math.min(SAVE.flag.n.meet2, 3)](ogY < 140)
                     );
                     SAVE.flag.n.meet2++ > 1 && (SAVE.data.b.skeleton_key = true);
                  } else {
                     await dialogue('dialoguerTop', ...text.a_citadel.story.jspeech4);
                     if (meet1 < 2) {
                        await renderer.pause(10000);
                        await dialogue('dialoguerTop', ...text.a_citadel.story.jspeech5a);
                        if (meet1 < 1 || lv < 2) {
                           await dialogue('dialoguerTop', ...text.a_citadel.story.jspeech5b1(ogY < 140));
                        } else {
                           await dialogue('dialoguerTop', ...text.a_citadel.story.jspeech5b2());
                           SAVE.data.n.state_citadel_responsibility = (choicer.result + 1) as 1 | 2;
                           await renderer.pause(1000);
                           await dialogue(
                              'dialoguerTop',
                              ...[ text.a_citadel.story.jspeech5b3a, text.a_citadel.story.jspeech5b3b ][choicer.result]
                           );
                           if (SAVE.data.n.state_starton_papyrus === 1) {
                              await dialogue('dialoguerTop', ...text.a_citadel.story.jspeech5b3c);
                              await renderer.pause(1500);
                              choice.stop();
                              content.amChoice.unload();
                              await dialogue(
                                 'dialoguerTop',
                                 ...[ text.a_citadel.story.jspeech5b4a, text.a_citadel.story.jspeech5b4b ][choicer.result]
                              );
                           } else if (30 <= world.trueKills) {
                              await dialogue('dialoguerTop', ...text.a_citadel.story.jspeech5b3c);
                              await renderer.pause(1500);
                              choice.stop();
                              content.amChoice.unload();
                              await dialogue(
                                 'dialoguerTop',
                                 ...[ text.a_citadel.story.jspeech5b6a, text.a_citadel.story.jspeech5b6b ][choicer.result]
                              );
                           } else if (SAVE.data.n.state_foundry_undyne === 2) {
                              await dialogue(
                                 'dialoguerTop',
                                 ...[ text.a_citadel.story.jspeech5b7a, text.a_citadel.story.jspeech5b7b ][choicer.result]
                              );
                           } else if (SAVE.data.n.state_wastelands_toriel === 2) {
                              await dialogue(
                                 'dialoguerTop',
                                 ...[ text.a_citadel.story.jspeech5b5a, text.a_citadel.story.jspeech5b5b ][choicer.result]
                              );
                           } else if (world.bad_robot) {
                              await dialogue(
                                 'dialoguerTop',
                                 ...[ text.a_citadel.story.jspeech5b8a, text.a_citadel.story.jspeech5b8b ][choicer.result]
                              );
                           } else if (world.trueKills > 1) {
                              await dialogue(
                                 'dialoguerTop',
                                 ...[ text.a_citadel.story.jspeech5b9a, text.a_citadel.story.jspeech5b9b ][choicer.result]
                              );
                           } else if (SAVE.data.n.state_foundry_undyne === 0) {
                              await dialogue(
                                 'dialoguerTop',
                                 ...[ text.a_citadel.story.jspeech5b10a, text.a_citadel.story.jspeech5b10b ][
                                    choicer.result
                                 ]
                              );
                           }
                        }
                     } else {
                        await renderer.pause(2500);
                        choice.stop();
                        content.amChoice.unload();
                        await dialogue('dialoguerTop', ...text.a_citadel.story.jspeech6a);
                        const capped = (lv - 2) as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
                        if (SAVE.flag.b[`meet3_${capped}`]) {
                           await renderer.pause(500);
                           await dialogue('dialoguerTop', ...text.a_citadel.story.jspeech6c);
                        } else {
                           await renderer.pause(2000);
                           SAVE.flag.b[`meet3_${capped}`] = true;
                           await dialogue(
                              'dialoguerTop',
                              ...[
                                 text.a_citadel.story.jspeech6b1,
                                 text.a_citadel.story.jspeech6b2,
                                 text.a_citadel.story.jspeech6b3,
                                 text.a_citadel.story.jspeech6b4,
                                 text.a_citadel.story.jspeech6b5,
                                 text.a_citadel.story.jspeech6b6,
                                 text.a_citadel.story.jspeech6b7,
                                 text.a_citadel.story.jspeech6b8,
                                 text.a_citadel.story.jspeech6b9,
                                 text.a_citadel.story.jspeech6b10,
                                 text.a_citadel.story.jspeech6b11,
                                 text.a_citadel.story.jspeech6b12,
                                 text.a_citadel.story.jspeech6b13
                              ][capped]
                           );
                        }
                     }
                  }
               }
            }
            await cam.position.modulate(renderer, 3000, { x: idealX });
            game.camera = player;
            game.movement = true;
            if (choice && !choice.stopped) {
               SAVE.data.b.choiceloop = true;
               choiceloop(choice);
            }
         }
      },
      c_throneroom (roomState, from) {
         renderer.layers.below.container.filters = [
            new AdvancedBloomFilter({ threshold: 0.7, bloomScale: 0.3, brightness: 1, quality: 10 })
         ];
         events.on('teleport-update').then(() => {
            renderer.layers.below.container.filters = [];
         });
         if (SAVE.data.n.plot !== 72 && !world.postnoot && !SAVE.data.b.backdoor && !postSIGMA()) {
            temporary(
               new CosmosSprite({
                  anchor: { x: 0, y: 1 },
                  position: { x: 110, y: 120 },
                  priority: 10139518934,
                  frames: [ content.iooCBastionwall ],
                  metadata: { tags: [ 'backdoor' ] },
                  objects: [
                     new CosmosHitbox({
                        anchor: { x: 0, y: 1 },
                        metadata: { barrier: true },
                        size: { x: 60, y: 20 }
                     })
                  ]
               }),
               'below'
            );
         }
         if (SAVE.data.n.plot_epilogue < 3 || world.runaway) {
            roomState.over = temporary(
               new CosmosRectangle({
                  position: { x: 320, y: 420 },
                  size: { x: 20, y: 160 },
                  fill: 0,
                  priority: 10139518935,
                  objects: [
                     new CosmosHitbox({
                        metadata: { barrier: true },
                        position: { y: 100 },
                        size: { x: 20, y: 60 }
                     })
                  ]
               }),
               'below'
            );
         }
      },
      async c_bastion (roomState) {
         SAVE.data.n.plot_epilogue < 3 || instance('main', 'c_janet')?.destroy();
         if (SAVE.data.n.plot === 72) {
            if (SAVE.data.n.plot_epilogue < 1) {
               teleporter.movement = false;
               SAVE.data.n.plot_epilogue = 1;
               await dialogue('auto', ...text.a_citadel.story.epilogue1());
               game.movement = true;
            }
            return;
         }
         const bt = instance('main', 'bastionTerminal')!.object.objects[0] as CosmosAnimation;
         const bastionCable = instance('below', 'bastionCable')!.object.objects[0] as CosmosAnimation;
         const ls = [ ...instances('main', 'bastion') ];
         if (world.genocide || world.bad_robot || world.trueKills > 29) {
            bt.index = 2;
            bastionCable.index = 1;
            for (const inst of ls) {
               inst.index = 8;
            }
         } else {
            bt.index = 0;
            bastionCable.index = 0;
            let i = 0;
            for (const inst of ls) {
               inst.index = inst.tags.includes('yourBastion') ? 6 : i++;
            }
         }
         if (world.genocide && SAVE.data.n.plot < 71.2) {
            rooms.of('a_core_main').preload.load();
            game.movement = false;
            teleporter.movement = false;
            SAVE.data.n.plot = 71.2;
            const grabLoader = content.asGrab.load();
            const finalAssets = new CosmosInventory(
               content.asSave,
               content.ionFMuffet,
               content.ionFMuffetBack,
               inventories.iocPapyrus,
               content.asSpiderLaugh,
               content.asBoom,
               content.avNapstablook,
               content.ionODummyGlad,
               content.ionODummySad,
               content.ionODummyShock,
               content.asLightningstrike,
               content.iocPapyrusReach,
               content.asBell,
               content.asWind,
               inventories.iocNapstablook,
               content.asDeeploop2,
               content.asShake,
               content.amScramble,
               content.asCymbal,
               content.ionFSpider,
               content.iooACORECritical,
               inventories.iocAsgore,
               inventories.idcAsgore,
               content.avAsgore
            );
            finalAssets.name = 'finalAssets';
            const finalLoader = finalAssets.load();
            await renderer.pause(600);
            await dialogue('auto', ...text.a_citadel.genotext.afterfight2());
            goatbro.metadata.override = true;
            await goatbro.walk(renderer, 3, { x: 80, y: 210 });
            await renderer.pause(1250);
            goatbro.face = 'up';
            await renderer.pause(350);
            sounds.menu.instance(renderer).rate.value = 1.2;
            await renderer.pause(550);
            sounds.menu.instance(renderer).rate.value = 1.2;
            await renderer.pause(950);
            sounds.menu.instance(renderer).rate.value = 1.2;
            await renderer.pause(250);
            sounds.menu.instance(renderer).rate.value = 1.2;
            await renderer.pause(150);
            sounds.menu.instance(renderer).rate.value = 1.6;
            await renderer.pause(750);
            sounds.depower.instance(renderer);
            await renderer.pause(1250);
            await dialogue('auto', ...text.a_citadel.genotext.afterfight3());
            await renderer.pause(850);
            goatbro.face = 'down';
            await dialogue('auto', ...text.a_citadel.genotext.afterfight4);
            await goatbro.walk(renderer, 3, { x: 170 });
            goatbro.walk(renderer, 3, { y: 105 }).then(() => goatbro.alpha.modulate(renderer, 300, 0));
            await player.walk(renderer, 3, { y: 105 });
            await teleport('c_road3', 'up', 40, 1270, world);
            goatbro.position.set(player.position.subtract(0, 21));
            goatbro.face = 'up';
            goatbro.alpha.value = 1;
            goatbro.alpha.modulate(renderer, 0, 1);
            goatbro.walk(renderer, 3, { y: 5 }).then(() => goatbro.alpha.modulate(renderer, 300, 0));
            await player.walk(renderer, 3, { y: 5 });
            await teleport('c_exit', 'up', 120, 210, world);
            goatbro.position.set(player.position.subtract(0, 21));
            goatbro.face = 'up';
            goatbro.alpha.value = 1;
            goatbro.alpha.modulate(renderer, 0, 1);
            await Promise.all([ goatbro.walk(renderer, 3, { y: 60 }), player.walk(renderer, 3, { y: 81 }) ]);
            await renderer.pause(650);
            await dialogue('auto', ...text.a_citadel.genotext.afterfight5a);
            await renderer.pause(1250);
            await dialogue('auto', ...text.a_citadel.genotext.afterfight5b);
            await renderer.pause(850);
            await dialogue('auto', ...text.a_citadel.genotext.afterfight6);
            await renderer.pause(650);
            await goatbro.walk(renderer, 1, { y: 40 });
            await renderer.pause(850);
            await dialogue('auto', ...text.a_citadel.genotext.afterfight7);
            await renderer.pause(3850);
            await dialogue('auto', ...text.a_citadel.genotext.afterfight8);
            const goatdad = instance('main', 'observer')!.object as CosmosCharacter;
            goatdad.face = 'down';
            await goatbro.walk(renderer, 3, { y: 12 });
            await antifreeze([ grabLoader, renderer.pause(200) ]);
            sounds.grab.instance(renderer);
            dropShake(goatdad.offsets[0], false);
            await renderer.pause(650);
            goatbro.sprite.enable();
            while (goatbro.position.y < 20) {
               goatbro.position.y += 1.5;
               await renderer.on('tick');
            }
            goatbro.sprite.reset();
            await renderer.pause(850);
            await dialogue('auto', ...text.a_citadel.genotext.afterfight10);
            player.walk(renderer, 3, { x: 98 });
            await goatbro.walk(renderer, 3, { y: player.position.y });
            goatdad.preset = characters.asgoreHappy;
            await Promise.all([
               dialogue('auto', ...text.a_citadel.genotext.afterfight11),
               SAVE.flag.n.ga_asrielFinalReaction++ < 1 && notifier(goatbro, false)
            ]);
            await renderer.pause(1650);
            goatbro.walk(renderer, 3, { y: 210 }).then(() => goatbro.alpha.modulate(renderer, 300, 0));
            await player.walk(renderer, 3, { x: 120 }, { x: 120, y: 210 });
            await teleport('c_road3', 'down', 40, 10, world);
            goatbro.position.set(player.position.add(0, 21));
            goatbro.face = 'down';
            goatbro.alpha.value = 1;
            goatbro.alpha.modulate(renderer, 0, 1);
            goatbro.walk(renderer, 3, { y: 1270 }).then(() => goatbro.alpha.modulate(renderer, 300, 0));
            await player.walk(renderer, 3, { y: 1270 });
            await teleport('c_bastion', 'down', 170, 110, world);
            goatbro.position.set(player.position.add(0, 21));
            goatbro.face = 'down';
            goatbro.alpha.value = 1;
            goatbro.alpha.modulate(renderer, 0, 1);
            goatbro.walk(renderer, 3, { y: 230 }).then(() => goatbro.alpha.modulate(renderer, 300, 0));
            await player.walk(renderer, 3, { y: 230 });
            await teleport('c_throneroom', 'down', 110, 130, world);
            goatbro.position.set(player.position.add(-1, 20));
            goatbro.face = 'down';
            goatbro.alpha.value = 1;
            goatbro.alpha.modulate(renderer, 0, 1);
            await Promise.all([
               goatbro.walk(renderer, 3, { x: 50 }, { y: 610 }, { x: 290 }, { y: 570 }),
               player.walk(renderer, 3, { y: 150 }, { x: 50 }, { y: 610 }, { x: 290 }, { y: 570 + 21 })
            ]);
            await renderer.pause(1050);
            sounds.equip.instance(renderer).rate.value = 1.2;
            await renderer.pause(500);
            sounds.pathway.instance(renderer);
            shake();
            renderer.detach('below', citadelStates.rooms.c_throneroom!.over);
            await renderer.pause(850);
            await dialogue('auto', ...text.a_citadel.genotext.afterfight12);
            goatbro.walk(renderer, 3, { y: 550 }, { x: 350 });
            await player.walk(renderer, 3, { y: 550 }, { x: 350 });
            const fd = fader({ size: 1000, position: { x: 160, y: 120 }, anchor: 0 });
            await fd.alpha.modulate(renderer, 3000, 1);
            player.alpha.value = 0;
            renderer.detach('main', goatbro);
            SAVE.data.n.plot_approach = 8;
            content.asGrab.unload();
            await Promise.all([
               finalLoader,
               renderer.pause(1000),
               teleport('a_core_main', 'down', 260, 580, { fade: false, fast: true, cutscene: true })
            ]);
            const cocker = rooms.of('_cockpit').preload.load();
            await dialogue('auto', ...text.a_citadel.genotext.afterfight13);
            engageDelay();
            await renderer.pause(1500);
            saver.save('_cockpit');
            SAVE.flag.n._genocide_milestone_last = 7;
            SAVE.flag.n.genocide_milestone = Math.max(SAVE.flag.n.genocide_milestone, 7) as 7;
            sounds.save.instance(renderer);
            await renderer.pause(2000);
            disengageDelay();
            player.alpha.value = 0;
            const CORE = instance('below', 'CORE')!.object;
            const COREoverlay = instance('above', 'CORE_overlay')!.object;
            const COREanim = CORE.objects[0] as CosmosAnimation;
            COREanim.extrapolate = false;
            COREanim.duration = 2;
            const ohHELLyah = sounds.deeploop2.instance(renderer);
            ohHELLyah.gain.value = 0;
            const criticality = {
               level: 0,
               idealLevel: 0,
               gain: new CosmosValue(),
               tint: new CosmosValue(),
               ticker () {
                  criticality.level -= (criticality.level - criticality.idealLevel) / 16;
                  const factor = (3 - criticality.level) / 3;
                  CORE.tint = CosmosImageUtils.gradient(0xffffff, 0x0000ff, criticality.tint.value);
                  COREoverlay.tint = CORE.tint;
                  const coreshaker = (factor < 1 ? factor : CosmosMath.bezier(factor, 0, 0.2, 1)) * 2;
                  CORE.offsets[0].set((Math.random() - 0.5) * coreshaker, (Math.random() - 0.5) * coreshaker);
                  let res = content.iooACORE;
                  if (criticality.idealLevel < 3) {
                     COREanim.duration = 1;
                     if (criticality.idealLevel < 2) {
                        res = content.iooACORECritical;
                        ++COREanim.index === COREanim.frames.length && (COREanim.index = 0);
                        if (criticality.idealLevel < 1) {
                           ++COREanim.index === COREanim.frames.length && (COREanim.index = 0);
                        }
                     }
                  } else {
                     COREanim.duration = 2;
                  }
                  COREanim.resources === res || COREanim.use(res);
                  renderer.shake.value = factor < 1 ? factor : CosmosMath.bezier(factor, 0, 0.4, 1);
                  ohHELLyah.gain.value = Math.min(factor, 1) * ohHELLyah.daemon.gain * criticality.gain.value * 0.4;
               }
            };
            const shock = (short = false) => {
               criticality.level = short ? -5 : -10;
               const snd1 = sounds.lightningstrike.instance(renderer);
               snd1.rate.value = short ? 1.4 : 1;
               const snd2 = sounds.boom.instance(renderer, 0.16);
               snd2.rate.value = short ? 1.2 : 0.8;
               snd2.gain.modulate(renderer, 1000, snd2.gain.value, 0);
               criticality.gain.value = 0;
               renderer.pause(500).then(() => criticality.gain.modulate(renderer, 500, 1));
               const wf = fader({ fill: 0xffffff, size: 1000, alpha: 1, anchor: 0, position: { x: 160, y: 120 } });
               wf.alpha.modulate(renderer, short ? 300 : 600, 0).then(() => renderer.detach('menu', wf));
               short || (criticality.idealLevel = 3);
            };
            renderer.on('tick', criticality.ticker);
            const sp = SAVE.data.b.papyrus_secret;
            const sm = SAVE.data.n.state_foundry_muffet !== 1;
            const sd = SAVE.data.n.state_foundry_maddummy !== 1;
            const papyrus = temporary(character('papyrus', characters.papyrus, { x: 250, y: 640 }, 'up'), 'main');
            const dummy = temporary(
               new CosmosAnimation({
                  anchor: { x: 0, y: 1 },
                  position: { x: 270, y: 640 },
                  resources: content.ionODummyGlad
               }),
               'main'
            );
            fd.alpha.modulate(renderer, 1000, 0).then(() => (fd.fill = 0xffffff));
            criticality.gain.modulate(renderer, 1000, 1);
            const spawnDummy = () => dummy.position.step(renderer, 3, { y: 550 });
            scr: {
               const scramble = music.scramble.instance(renderer);
               scramble.gain.value = 0;
               if (!sm) {
                  (sd || sp) && scramble.gain.modulate(renderer, 1000, scramble.daemon.gain);
                  await renderer.pause(2000);
                  if (sp) {
                     await papyrus.walk(renderer, 4, { y: 570 });
                     await dialogue('dialoguerTop', ...text.a_citadel.genotext.coreboomA1);
                     await renderer.pause(1000);
                     await papyrus.walk(renderer, 2, { y: 530 });
                     shock();
                     await notifier(papyrus, true, 45);
                     await dialogue('dialoguerTop', ...text.a_citadel.genotext.coreboomA2);
                     criticality.idealLevel = 0;
                     await renderer.pause(2450);
                     papyrus.face = 'down';
                     if (sd) {
                        await spawnDummy();
                        scramble.stop();
                        await dialogue('dialoguerTop', ...text.a_citadel.genotext.coreboomA3);
                        dummy.use(content.ionODummyShock);
                     } else {
                        scramble.stop();
                        await dialogue('dialoguerTop', ...text.a_citadel.genotext.coreboomA4);
                     }
                  } else {
                     await renderer.pause(1650);
                     shock();
                     await renderer.pause(1250);
                     criticality.idealLevel = 0;
                     await renderer.pause(1650);
                     if (sd) {
                        await spawnDummy();
                        scramble.stop();
                        await dialogue('dialoguerTop', ...text.a_citadel.genotext.coreboomA5);
                        dummy.use(content.ionODummyShock);
                     } else {
                        scramble.stop();
                     }
                  }
                  break scr;
               }
               scramble.gain.modulate(renderer, 1000, scramble.daemon.gain);
               const muffet = temporary(
                  new CosmosAnimation({
                     anchor: { x: 0, y: 1 },
                     position: { x: 260, y: 440 },
                     resources: content.ionFMuffetBack
                  }).on('tick', function () {
                     this.offsets[0].set(CORE.offsets[0]);
                     this.index === 6 && (this.index = 4);
                  }),
                  'main'
               );
               const spiders = temporary(
                  new CosmosObject({
                     objects: CosmosUtils.populate(
                        4,
                        index =>
                           new CosmosObject({
                              position: { y: [ 370, 360, 380, 370 ][index], x: 200 + index * 40 },
                              objects: [
                                 new CosmosRectangle({
                                    alpha: 0x7f / 0xff,
                                    fill: 0xffffff,
                                    anchor: { x: 0, y: 1 },
                                    size: { x: 1, y: 240 }
                                 }),
                                 new CosmosAnimation({ active: true, resources: content.ionFSpider, anchor: { x: 0 } })
                              ]
                           })
                     )
                  }),
                  'main'
               );
               const wr = rand_rad(SAVE.data.s.name || Math.random().toString());
               const webber = temporary(
                  new CosmosObject({
                     fill: 0xffffff,
                     priority: -99999999,
                     objects: CosmosUtils.populate(20, index => {
                        return new CosmosRectangle({
                           alpha: 0.5 + wr.next() / 2,
                           position: { x: Math.floor(index / 10) * 430 + (index % 10) * 10, y: 340 },
                           size: { x: 260, y: 1 },
                           anchor: { y: 0 }
                        }).on('tick', function () {
                           this.rotation.value = this.position.angleTo(CORE.offsets[0].add(260, 600));
                        });
                     })
                  }),
                  'below'
               );
               await renderer.pause(2000);
               await dialogue('dialoguerBottom', ...text.a_citadel.genotext.coretext1);
               await renderer.pause(350);
               sounds.menu.instance(renderer).rate.value = 1.2;
               await renderer.pause(650);
               sounds.menu.instance(renderer).rate.value = 1.2;
               await renderer.pause(1250);
               await dialogue('dialoguerBottom', ...text.a_citadel.genotext.coretext2);
               sounds.menu.instance(renderer).rate.value = 1.6;
               const webshock = (short = false) => {
                  shock(short);
                  const p = webber.objects
                     .slice()
                     .sort((a, b) => a.alpha.value - b.alpha.value)
                     .map(async (string, i) => {
                        if (!short || i < 12) {
                           string.position.modulate(renderer, 1000, {
                              x: string.position.x < 260 ? string.position.x - 10 : string.position.x + 10
                           });
                           await string.alpha.modulate(renderer, string.alpha.value * 1000, 0);
                        }
                     });
                  if (short) {
                     for (const spider of spiders.objects) {
                        const y = spider.position.y - (spider.position.y - 330) / 2;
                        spider.position.modulate(renderer, 800, { y }, { y });
                     }
                  } else {
                     Promise.all(p).then(() => renderer.detach('below', webber));
                     Promise.all(
                        spiders.objects.map(spider => spider.position.modulate(renderer, 800, { y: 330 }))
                     ).then(() => renderer.detach('main', spiders));
                  }
               };
               if (!sp) {
                  await renderer.pause(1250);
                  webshock();
                  await notifier(muffet, true, void 0, () => muffet.offsets[0]);
                  await dialogue('dialoguerBottom', ...text.a_citadel.genotext.coreboomB1);
                  criticality.idealLevel = 0;
                  await renderer.pause(2450);
                  muffet.use(content.ionFMuffet);
                  if (sd) {
                     await spawnDummy();
                     scramble.stop();
                     await dialogue('dialoguerTop', ...text.a_citadel.genotext.coreboomB2);
                     dummy.use(content.ionODummyShock);
                  } else {
                     scramble.stop();
                     await dialogue('dialoguerBottom', ...text.a_citadel.genotext.coreboomB3);
                  }
                  break scr;
               }
               await papyrus.walk(renderer, 4, { y: 530 });
               await notifier(papyrus, true, 45);
               await renderer.pause(650);
               const knocker = new CosmosAnimation({
                  anchor: { x: 0, y: 1 },
                  resources: content.iocPapyrusReach,
                  position: papyrus
               });
               renderer.detach('main', papyrus);
               renderer.attach('main', knocker);
               sounds.bell.instance(renderer);
               criticality.tint.value = 0.5;
               criticality.tint.modulate(renderer, 500, 0.4);
               await renderer.pause(850);
               await dialogue('dialoguerTop', ...text.a_citadel.genotext.coretext3);
               await renderer.pause(450);
               await dialogue('dialoguerBottom', ...text.a_citadel.genotext.coretext4a);
               await dialogue('dialoguerTop', ...text.a_citadel.genotext.coretext4b);
               await renderer.pause(2450);
               await dialogue('dialoguerTop', ...text.a_citadel.genotext.coretext5a);
               muffet.use(content.ionFMuffet);
               await dialogue('dialoguerBottom', ...text.a_citadel.genotext.coretext5b);
               const relent = async () => {
                  criticality.idealLevel = 0;
                  await renderer.pause(1000);
                  renderer.detach('main', knocker);
                  renderer.attach('main', papyrus);
                  criticality.tint.modulate(renderer, 300, 0);
                  await renderer.pause(1450);
                  scramble.stop();
                  muffet.use(content.ionFMuffet);
               };
               if (!sd) {
                  await renderer.pause(1000);
                  await dialogue('dialoguerTop', ...text.a_citadel.genotext.coreboomC1);
                  await renderer.pause(650);
                  webshock();
                  await Promise.all([
                     notifier(muffet, true, void 0, () => muffet.offsets[0]),
                     notifier(knocker, false)
                  ]);
                  await dialogue('dialoguerTop', ...text.a_citadel.genotext.coreboomC2);
                  await relent();
                  await dialogue('dialoguerBottom', ...text.a_citadel.genotext.coreboomC3);
                  break scr;
               }
               await renderer.pause(1000);
               await spawnDummy();
               await dialogue('dialoguerTop', ...text.a_citadel.genotext.coretext6);
               webshock(true);
               dummy.use(content.ionODummyShock);
               await Promise.all([
                  notifier(muffet, true, void 0, () => muffet.offsets[0]),
                  notifier(knocker, false),
                  notifier(dummy, false)
               ]);
               dummy.use(content.ionODummyGlad);
               await dialogue('dialoguerTop', ...text.a_citadel.genotext.coretext7);
               muffet.use(content.ionFMuffetBack);
               await renderer.pause(450);
               sounds.phone.instance(renderer);
               await renderer.pause(2250);
               if (SAVE.data.n.corekills > 1) {
                  dummy.use(content.ionODummySad);
                  if (SAVE.data.n.corekills > 3) {
                     await dialogue('dialoguerTop', ...text.a_citadel.genotext.coreboomD1);
                  } else {
                     await dialogue('dialoguerTop', ...text.a_citadel.genotext.coreboomD2);
                  }
                  sounds.equip.instance(renderer);
                  await relent();
                  await dialogue('dialoguerTop', ...text.a_citadel.genotext.coreboomD3);
                  break scr;
               }
               await renderer.pause(1000);
               await dialogue('dialoguerTop', ...text.a_citadel.genotext.coretext8);
               sounds.equip.instance(renderer);
               criticality.idealLevel = 0;
               await renderer.pause(1000);
               await dialogue('dialoguerBottom', ...text.a_citadel.genotext.coretext9);
               await renderer.pause(2450);
               await dialogue('dialoguerTop', ...text.a_citadel.genotext.coretext10);
               await renderer.pause(1650);
               sounds.shake.instance(renderer);
               criticality.level = 0;
               criticality.idealLevel = 2;
               await renderer.pause(1250);
               await dialogue('dialoguerBottom', ...text.a_citadel.genotext.coretext11);
               await renderer.pause(650);
               renderer.detach('main', knocker);
               renderer.attach('main', papyrus);
               criticality.tint.modulate(renderer, 300, 0);
               await dialogue('dialoguerTop', ...text.a_citadel.genotext.coretext12a);
               muffet.use(content.ionFMuffet);
               await dialogue('dialoguerBottom', ...text.a_citadel.genotext.coretext12b);
               await renderer.pause(850);
               await dialogue('dialoguerTop', ...text.a_citadel.genotext.coreboom12c);
               criticality.idealLevel = 1;
               await renderer.pause(450);
               dummy.use(content.ionODummyShock);
               await dialogue('dialoguerBottom', ...text.a_citadel.genotext.coreboom12d);
               await renderer.pause(1000);
               dummy.use(content.ionODummySad);
               await dialogue('dialoguerTop', ...text.a_citadel.genotext.coreboom12e);
               await renderer.pause(650);
               papyrus.face = 'down';
               dummy.use(content.ionODummyShock);
               notifier(muffet, true, void 0, () => muffet.offsets[0]);
               notifier(papyrus, false, 45);
               notifier(dummy, false);
               const blbr = new CosmosValue(0);
               const blume = new AdvancedBloomFilter({ threshold: 0, bloomScale: 0, brightness: 1, quality: 10 });
               const napstablook = character('napstablook', characters.napstablook, { x: 260, y: 640 }, 'up', {
                  area: renderer.area,
                  filters: [ blume ]
               }).on('tick', function () {
                  blume.bloomScale = blbr.value;
               });
               await napstablook.walk(renderer, 3, { y: 570 });
               await renderer.pause(1000);
               await dialogue('dialoguerTop', ...text.a_citadel.genotext.coretext13);
               dummy.use(content.ionODummySad);
               dummy.position.step(renderer, 3, { x: 300 });
               renderer.pause(200).then(async () => {
                  await papyrus.walk(renderer, 4, { x: 220 });
                  papyrus.face = 'right';
               });
               await napstablook.walk(renderer, 3, { y: 470 });
               await renderer.pause(1250);
               papyrus.face = 'up';
               await dialogue('dialoguerTop', ...text.a_citadel.genotext.coretext14a);
               napstablook.face = 'down';
               await renderer.pause(850);
               scramble.stop();
               await dialogue('dialoguerBottom', ...text.a_citadel.genotext.coretext14b);
               blbr.modulate(renderer, 10000, 4);
               renderer.pause(1650).then(async () => {
                  await dialogue('dialoguerBottom', ...text.a_citadel.genotext.coretext15);
                  await renderer.pause(850);
                  dialogue('dialoguerTop', ...text.a_citadel.genotext.coretext16);
               });
               await renderer.pause(3000).then(async () => {
                  const cym = sounds.cymbal.instance(renderer);
                  cym.rate.value = 5 / 7;
                  await Promise.all([
                     criticality.gain.modulate(renderer, 7000, 0),
                     fd.alpha.modulate(renderer, 7000, 1)
                  ]);
                  cym.stop();
                  ohHELLyah.stop();
               });
               renderer.detach('main', napstablook);
               criticality.level = 3;
               criticality.idealLevel = 3;
               criticality.ticker();
               renderer.off('tick', criticality.ticker);
               const wind = sounds.wind.instance(renderer);
               wind.gain.value /= 10;
               wind.rate.value = 1.5;
               await renderer.pause(1000);
               await wind.gain.modulate(renderer, 2000, wind.gain.value * 10);
               await renderer.pause(2500);
               await dialogue('dialoguerBottom', ...text.a_citadel.genotext.coretext17);
               await renderer.pause(2500);
               await dialogue('dialoguerBottom', ...text.a_citadel.genotext.coretext18);
               await renderer.pause(5000);
               await dialogue('dialoguerBottom', ...text.a_citadel.genotext.coretext19);
               dummy.use(content.ionODummySad);
               papyrus.face = 'down';
               const goatdad = character('asgore', characters.asgore, { x: 260, y: 650 }, 'up');
               Promise.all(spiders.objects.map(spider => spider.position.modulate(renderer, 1000, { y: 330 }))).then(
                  () => renderer.detach('main', spiders)
               );
               fd.alpha.modulate(renderer, 3000, 0).then(() => (fd.fill = 0));
               await wind.gain.modulate(renderer, 3000, 0);
               wind.stop();
               await renderer.pause(1500);
               await goatdad.walk(renderer, 1.5, { y: 600 });
               await dialogue('dialoguerTop', ...text.a_citadel.genotext.coretext20);
               await goatdad.walk(renderer, 1.5, { y: dummy.position.y });
               await renderer.pause(650);
               goatdad.face = 'right';
               await dialogue('dialoguerTop', ...text.a_citadel.genotext.coretext21);
               await renderer.pause(850);
               await dialogue('dialoguerTop', ...text.a_citadel.genotext.coretext22);
               await renderer.pause(1250);
               await dialogue('dialoguerTop', ...text.a_citadel.genotext.coretext23a);
               goatdad.face = 'up';
               muffet.enable();
               muffet.index = 4;
               await dialogue('dialoguerBottom', ...text.a_citadel.genotext.coretext23b1);
               await renderer.pause(1000);
               muffet.disable();
               muffet.index = 4;
               await dialogue('dialoguerBottom', ...text.a_citadel.genotext.coretext23b2);
               muffet.reset();
               await renderer.pause(850);
               await dialogue('dialoguerTop', ...text.a_citadel.genotext.coretext24a);
               await goatdad.walk(renderer, 1.5, { y: papyrus.position.y });
               await renderer.pause(850);
               goatdad.face = 'down';
               await dialogue('dialoguerTop', ...text.a_citadel.genotext.coretext24b);
               await renderer.pause(650);
               papyrus.face = 'right';
               await dialogue('dialoguerTop', ...text.a_citadel.genotext.coretext25);
               await renderer.pause(1250);
               papyrus.face = 'down';
               await Promise.all([
                  fd.alpha.modulate(renderer, 3000, 1),
                  dialogue('dialoguerBottom', ...text.a_citadel.genotext.coretext26).then(() => renderer.pause(1650))
               ]);
            }
            const destroyed = criticality.level < 3;
            if (destroyed) {
               sounds.boom.instance(renderer);
               await Promise.all([
                  criticality.gain.modulate(renderer, SAVE.flag.b.$option_epilepsy ? 300 : 150, 0),
                  fd.alpha.modulate(renderer, SAVE.flag.b.$option_epilepsy ? 300 : 150, 1)
               ]);
               ohHELLyah.stop();
               criticality.level = 3;
               criticality.idealLevel = 3;
               criticality.ticker();
               renderer.off('tick', criticality.ticker);
               await renderer.pause(SAVE.flag.b.$option_epilepsy ? 850 : 1000);
               await renderer.alpha.modulate(renderer, 3000, 0);
               renderer.alpha.value = 1;
               fd.fill = 0;
            }
            await renderer.pause(1250);
            atlas.switch('dialoguerBase');
            const display = atlas.navigators.of('frontEnd').objects[1];
            renderer.attach('menu', display);
            await dialogue_primitive(
               destroyed ? text.a_citadel.genotext.coretext27a : text.a_citadel.genotext.coretext27b
            );
            renderer.detach('menu', display);
            atlas.switch(null);
            await Promise.all([ cocker, renderer.pause(1250) ]);
            await teleport('_cockpit', 'down', 0, 0, { fade: false, fast: true, cutscene: true });
            quickresume(true);
            await fd.alpha.modulate(renderer, 1000, 0);
            renderer.detach('menu', fd);
            finalAssets.unload();
         } else if (SAVE.data.n.plot < 71.2 && !SAVE.data.b.killed_mettaton && !world.baddest_lizard) {
            const lizard = (roomState.alphys = temporary(
               character('alphys', characters.alphys, { x: 80, y: 210 }, 'up', {
                  metadata: {
                     barrier: true,
                     interact: true,
                     name: 'trivia',
                     args: [ 'alphysEnding' ],
                     tags: [ 'termAlphys' ]
                  },
                  anchor: { x: 0, y: 1 },
                  size: { x: 20, y: 12 }
               }),
               'main'
            ));
            if (SAVE.data.n.plot < 71.1) {
               SAVE.data.n.plot = 71.1;
               teleporter.movement = false;
               await renderer.pause(600);
               await notifier(lizard, false);
               lizard.face = 'right';
               await dialogue('dialoguerTop', ...text.a_citadel.story.choice0());
               await renderer.pause(2000);
               await dialogue('dialoguerTop', ...text.a_citadel.story.choice0x);
               lizard.face = 'up';
               game.movement = true;
            } else if (SAVE.data.n.state_citadel_refuse !== 0 && !SAVE.data.b.c_state_bigwhoop) {
               SAVE.data.b.c_state_bigwhoop = true;
               teleporter.movement = false;
               await renderer.pause(1000);
               await dialogue('dialoguerTop', ...text.a_citadel.story.choice0y);
               game.movement = true;
            }
         }
      },
      async c_road3 () {
         SAVE.data.n.plot < 72 && renderer.attach('base', barrier);
      },
      async c_exit () {
         if (
            SAVE.data.n.plot < 72 &&
            (SAVE.flag.n.neutral_twinkly_stage < 2 || 6 <= SAVE.flag.n.neutral_twinkly_stage)
         ) {
            instance('main', 'spawn')!.object.position.y = -1000000;
            if (SAVE.flag.n.lv20 !== 0) {
               return;
            }
            renderer.attach('base', barrier);
            if (world.genocide || SAVE.data.n.plot < 71.2) {
               if (SAVE.flag.n.neutral_twinkly_stage <= 0 || 6 <= SAVE.flag.n.neutral_twinkly_stage) {
                  temporary(
                     character('asgore', characters.asgore, { x: 120, y: 10 }, 'up', {
                        metadata: {
                           barrier: true,
                           interact: true,
                           name: 'citadel',
                           args: [ 'final' ],
                           tags: [ 'observer' ]
                        },
                        anchor: { x: 0, y: 1 },
                        size: { x: 40, y: 20 }
                     }),
                     'main'
                  );
               }
            } else if (SAVE.flag.n.pacifist_marker < 1) {
               battler.load(groups.final);
               game.movement = false;
               teleporter.movement = false;
               const alphys = character('alphys', characters.alphys, { x: 120, y: 100 }, 'down');
               await player.walk(renderer, 3, { y: 140 });
               await renderer.pause(2000);
               await dialogue('auto', ...text.a_citadel.story.smasher2);
               speech.state.face = null;
               game.music?.stop();
               await battler.encounter(player, groups.final, false);
               renderer.detach('main', alphys);
               await sad();
            }
         }
      },
      async c_archive_path1 () {
         instance('below', 'akd')!.object.alpha.value = 0;
      },
      async c_archive_path2 () {
         instance('below', 'akd')!.object.alpha.value = 0;
      },
      async c_archive_path3 () {
         instance('below', 'akd')!.object.alpha.value = 0;
      },
      async c_archive_path4 () {
         instance('below', 'akd')!.object.alpha.value = 0;
      },
      async c_archive_path5 () {
         instance('below', 'akd')!.object.alpha.value = 0;
      },
      async c_archive_path6 () {
         instance('below', 'akd')!.object.alpha.value = 0;
      },
      async c_archive_wastelands1 () {
         cw_state.s1 && (instance('below', 'cw_switch')!.index = 1);
      },
      async c_archive_wastelands2 () {
         cw_state.s2 && (instance('below', 'cw_switch')!.index = 1);
      },
      async c_archive_wastelands3 () {
         cw_state.s1 && cw_state.s2 && cw_state.s3 && instance('main', 'passthru')?.destroy();
      },
      async c_archive_wastelands4 () {
         cw_state.s3 && (instance('below', 'cw_switch')!.index = 1);
      },
      async c_archive_starton1 () {
         const pillar = instance('below', 'pillars')!.object;
         pillar.priority.value = -1;
         fixPillar(pillar);
      },
      async c_archive_starton2 (roomState) {
         cs_unlocked() && instance('main', 'cs_greatest')?.destroy();
         if (roomState.active) {
            return;
         }
         let i = 0;
         roomState.active = true;
         for (const inst of instances('main', 'cs_screentower')) {
            const local_i = i++;
            inst.object.objects[1].on('tick', function () {
               this.alpha.value = 0.92 / (1 + new CosmosPoint(cs_puzzle[local_i]).extent / 2);
            });
         }
      },
      async c_archive_starton3 () {
         if (cs_unlocked()) {
            const parent = instance('main', 'lasercheckpoint')!.object;
            for (const object of parent.objects) {
               if (object instanceof CosmosAnimation) {
                  object.alpha.value = 0;
               } else if (object.metadata.barrier === true) {
                  object.metadata.barrier = false;
               }
            }
         }
      },
      async c_archive_starton4 () {
         instance('main', 'cs_veg')!.index = 1;
      },
      c_archive_foundryA1 (roomState) {
         beamflashCleanup(roomState);
         beamflashTrigger(roomState, false);
         instance('main', 'cf1_cheesetable')!.index = 1;
      },
      c_archive_foundryA2 (roomState) {
         beamflashCleanup(roomState);
         beamflashTrigger(roomState, false);
      },
      c_archive_foundryA3 (roomState) {
         beamflashCleanup(roomState);
         beamflashTrigger(roomState, false);
      },
      c_archive_foundryA4 (roomState) {
         beamflashCleanup(roomState);
         beamflashTrigger(roomState, false);
      },
      async c_archive_foundryB1 () {
         if (cf2_state.time < 6) {
            for (const inst of instances('main', 'cf2_ficus')) {
               inst.object.alpha.value = 1 - cf2_state.time / 7;
            }
            const alpha = 1 - Math.max(cf2_state.time - 3, 0) / 3;
            for (const inst of instances('main', 'spiderobject')) {
               inst.object.alpha.value = alpha;
            }
            temporary(
               new CosmosObject({
                  alpha,
                  objects: CosmosUtils.populate(
                     5,
                     index =>
                        new CosmosObject({
                           position: { y: [ 65, 35, 30, 35, 65 ][index] - 100, x: 32 + index * 64 },
                           objects: [
                              new CosmosRectangle({
                                 alpha: 0x7f / 0xff,
                                 anchor: { x: 0, y: 1 },
                                 size: { x: 1, y: 240 },
                                 fill: 0xffffff,
                                 position: { y: [ 65, 35, 30, 35, 65 ][index] - 100, x: 32 + index * 64 }
                              }),
                              new CosmosAnimation({ resources: content.ionFSpider, anchor: { x: 0 } })
                           ]
                        })
                  )
               }),
               'main'
            );
         } else {
            for (const inst of [ ...instances('main', 'spiderobject'), ...instances('main', 'cf2_ficus') ]) {
               inst.destroy();
            }
         }
      },
      async c_archive_foundryB2 (roomState, from) {
         if (from === 'c_archive_foundryB2') {
            if (player.position.x < 160) {
               cf2_state.time++;
            } else {
               cf2_state.time--;
            }
         }
         cf2_state.time === 0 || instance('below', 'cover1')?.destroy();
         cf2_state.time === 6 || instance('below', 'cover2')?.destroy();
         instance('main', 'vending_machine')!.index = cf2_state.time;
         if (cf2_state.time < 6) {
            for (const inst of instances('main', 'cf2_ficus')) {
               inst.object.alpha.value = 1 - cf2_state.time / 7;
            }
         } else {
            for (const inst of instances('main', 'cf2_ficus')) {
               inst.destroy();
            }
         }
      },
      async c_archive_foundryB3 () {
         cf2_state.time === 0 && instance('main', 'blookbarrier')?.destroy();
         if (cf2_state.time < 3) {
            for (const inst of instances('main', 'blookobject')) {
               inst.object.alpha.value = 1 - cf2_state.time / 3;
            }
         } else {
            for (const inst of instances('main', 'blookobject')) {
               inst.destroy();
            }
         }
         if (cf2_state.time < 4) {
            instance('main', 'blookextra')?.destroy();
         } else {
            instance('main', 'blookextra')!.object.alpha.value = (cf2_state.time - 3) / 4;
         }
         if (cf2_state.time < 6) {
            for (const inst of instances('main', 'cf2_ficus')) {
               inst.object.alpha.value = 1 - cf2_state.time / 7;
            }
         } else {
            for (const inst of instances('main', 'cf2_ficus')) {
               inst.destroy();
            }
         }
      },
      async c_archive_aerialis1 () {
         (ca_state.wind ??= sounds.wind.instance(renderer)).gain.modulate(
            renderer,
            300,
            (ca_state.floor / 9) ** 3 * sounds.wind.gain
         );
         ca_state.floor === 0 || instance('main', 'neuteral')?.destroy();
         if (ca_state.floartex < ca_state.floor) {
            ca_state.floartex = ca_state.floor;
            teleporter.movement = false;
            await renderer.pause(600);
            await dialogue('auto', ...text.a_citadel.overworld.ca_floartex());
            game.movement = true;
         }
      },
      async c_archive_aerialis2 (roomState, from) {
         roomState.location = from;
         ca_state.last_elevated === from || (ca_state.last_elevated = null);
      },
      async c_archive_aerialis3 () {
         const ayo = (ca_state.floor / 9) ** 3;
         (ca_state.wind ??= sounds.wind.instance(renderer)).gain.modulate(renderer, 300, ayo * sounds.wind.gain);
         instance('main', 'megacarrier')!.object.alpha.value = ayo;
         temporary(
            new CosmosText({
               fill: 0xffffff,
               fontFamily: content.fMarsNeedsCunnilingus,
               fontSize: 14,
               position: { x: 352, y: -53 }
            }).on('tick', async function () {
               this.content = (ca_state.floor + 1).toString().padStart(2, '0');
            }),
            'below'
         );
      },
      async c_archive_aerialis4 () {
         (ca_state.wind ??= sounds.wind.instance(renderer)).gain.modulate(
            renderer,
            300,
            (ca_state.floor / 9) ** 3 * sounds.wind.gain
         );
         if (ca_state.floartex < ca_state.floor) {
            ca_state.floartex = ca_state.floor;
            teleporter.movement = false;
            await renderer.pause(600);
            await dialogue('auto', ...text.a_citadel.overworld.ca_floartex());
            game.movement = true;
         }
      },
      async c_archive_surface () {
         game.movement = false;
         teleporter.movement = false;
         const fd = fader({ alpha: 1 }, 'above');
         instance('main', 'justice')!.object.tint = 0;
         await renderer.pause(3000);
         const crickets = sounds.crickets.instance(renderer);
         crickets.gain.value /= 10;
         await Promise.all([
            crickets.gain.modulate(renderer, 5000, crickets.gain.value * 10),
            fd.alpha.modulate(renderer, 5000, 0)
         ]);
         renderer.detach('above', fd);
         await renderer.pause(2000);
         await dialogue('dialoguerBottom', ...text.a_citadel.story.clover1);
         await renderer.pause(3000);
         await dialogue('dialoguerBottom', ...text.a_citadel.story.clover2);
         await renderer.pause(4000);
         await dialogue('dialoguerBottom', ...text.a_citadel.story.clover3);
         await renderer.pause(3000);
         await dialogue('dialoguerBottom', ...text.a_citadel.story.clover4());
         SAVE.data.n.xm++;
         sounds.xm.instance(renderer, 0.108);
         await Promise.all([ renderer.alpha.modulate(renderer, 1000, 0), crickets.gain.modulate(renderer, 1000, 0) ]);
         const { x = 0, y = 0 } = rooms.of('c_archive_path6').spawn;
         SAVE.data.n.state_citadel_archive++;
         await Promise.all([ renderer.pause(1000), teleport('c_archive_path6', 'right', x, y, world) ]);
         crickets.stop();
         renderer.filters = [];
         archiver.nextfx = Infinity;
         renderer.alpha.modulate(renderer, 300, 1);
         game.movement = true;
         engageDelay();
      },
      async c_archive_exit () {
         instance('main', 'statusterminal')!.index = SAVE.data.n.state_citadel_archive < 6 ? 0 : 1;
      }
   } as { [k in CitadelRoomKey]?: (roomState: CitadelRS[k], from: string) => any }
};

export const citadelScript = async (subscript: string, ...args: string[]): Promise<any> => {
   const roomState = (citadelStates.rooms[game.room] ??= {});
   if (subscript === 'tick') {
      areaC.tickers[game.room as CitadelRoomKey]?.(roomState);
   } else {
      areaC.scripts[subscript]?.(roomState, (citadelStates.scripts[subscript] ??= {}), ...args);
   }
};

typer.on('header', function (h) {
   switch (h) {
      case 'c.switch1':
         shake(1, 400);
         sounds.shake.instance(renderer);
         SAVE.data.b.c_state_switch1 = true;
         break;
      case 'c.switch2':
         sounds.switch.instance(renderer);
         SAVE.data.b.c_state_switch2 = true;
         break;
      case 'c.backdoor': {
         sounds.appear.instance(renderer);
         SAVE.data.b.backdoor = true;
         const inst = instance('below', 'backdoor');
         if (inst) {
            inst.object.objects[0].metadata.barrier = false;
            Promise.race([ inst.object.alpha.modulate(renderer, 300, 0), events.on('teleport') ]).then(() => {
               inst.destroy();
            });
         }
         break;
      }
   }
});

events.on('init-between').then(() => {
   monologuer.r = SAVE.flag.n.ga_asrielMonologue > 0;
});

events.on('init-overworld').then(() => {
   const inArchive =
      SAVE.data.n.plot === 71.1 && SAVE.data.n.state_citadel_archive < 6 && stableRooms.includes(game.room);
   inArchive && (world.cutscene_override = true);
   events.on('teleport').then(async () => {
      game.room in cityRooms && renderer.attach('base', city);
      if (SAVE.data.n.plot === 70 && SAVE.data.b.armaloop && SAVE.flag.n.ga_asrielMonologueX < 1) {
         armaloop();
      } else if (SAVE.data.n.plot === 71 && SAVE.data.b.choiceloop) {
         const choice = music.thechoice.instance(renderer);
         if (!choicerooms.includes(game.room)) {
            choice.gain.value = 0;
         }
         choiceloop(choice);
      } else if (SAVE.data.n.plot === 72 && SAVE.data.s.room[0] !== '_') {
         const ep = epilogue();
         ep.gain.value = 0;
         ep.gain.modulate(renderer, 300, ep.daemon.gain);
      }
      if (inArchive) {
         game.movement = false;
         teleporter.movement = false;
         const fd = fader({ alpha: 1 });
         renderer.pause(2000).then(() => {
            SAVE.data.n.state_citadel_archive < 6 && (game.music = music.archive.instance(renderer, 0, true));
            renderer.detach('menu', fd);
            world.cutscene_override = false;
            game.movement = true;
            engageDelay();
         });
      }
      if (SAVE.flag.b.okaythatsweird) {
         if (SAVE.flag.n.pacifist_marker < 16.1) {
            return;
         }
         events.fire('tick');
         game.movement = false;
         teleporter.movement = false;
         await renderer.pause(1000);
         SAVE.flag.b.okaythatsweird = false;
         await dialogue('auto', ...text.a_citadel.story.oof);
         game.movement = true;
         return;
      }
      const died = SAVE.flag.b._died;
      const mad_lizard = SAVE.flag.b.mad_lizard;
      if (died) {
         SAVE.flag.b._died = false;
      }
      if (mad_lizard) {
         SAVE.flag.b.mad_lizard = false;
      }
      if (!SAVE.flag.b._victory) {
         if (mad_lizard && world.goatbro && SAVE.flag.n.ga_asrielWitness < 3) {
            game.movement = false;
            teleporter.movement = false;
            await renderer.pause(1000);
            if (SAVE.flag.n._genocide_milestone_last === 5) {
               const wit = SAVE.flag.n.ga_asrielWitness;
               SAVE.flag.n.ga_asrielWitness = 3;
               await dialogue('auto', ...text.a_citadel.genotext.respawnWitnessB(wit));
            } else if (SAVE.flag.n.ga_asrielWitness < 3 && SAVE.flag.n.genocide_milestone < 5) {
               if (SAVE.flag.n.ga_asrielWitness === 2) {
                  SAVE.flag.n._genocide_milestone_last = 5;
                  SAVE.flag.n.genocide_milestone = Math.max(SAVE.flag.n.genocide_milestone, 5) as 5;
               }
               await dialogue('auto', ...text.a_citadel.genotext.respawnWitnessA());
            }
            game.movement = true;
         }
         return;
      }
      SAVE.flag.b._victory && (SAVE.flag.b._victory = false);
      if (!world.goatbro || SAVE.flag.n._genocide_milestone_last === 0) {
         return;
      }
      game.movement = false;
      teleporter.movement = false;
      await renderer.pause(1000);
      switch (died ? 0 : SAVE.flag.n._genocide_milestone_last) {
         case 0:
            await dialogue('auto', ...text.a_citadel.genotext.respawn0());
            break;
         case 1:
            await dialogue('auto', ...text.a_citadel.genotext.respawn1());
            break;
         case 2:
         case 3:
            await dialogue('auto', ...text.a_citadel.genotext.respawn2());
            break;
         case 4:
         case 5:
            await dialogue('auto', ...text.a_citadel.genotext.respawn4());
            break;
         case 6:
            await dialogue('auto', ...text.a_citadel.genotext.respawn6());
            break;
      }
      game.movement = true;
   });
});

events.on('loaded', {
   priority: -1,
   async listener () {
      if (SAVE.flag.b.true_reset && SAVE.data.b.freedom) {
         SAVE.data.s.room = '_frontier8';
         events.on('init-overworld').then(() => {
            if (SAVE.data.s.room === '_frontier8') {
               teleporter.movement = false;
            }
         });
      }
      if (SAVE.flag.b.true_reset) {
         if (launch.intro && !SAVE.flag.b.true_reset_spiel) {
            saver.time_but_real.active = true;
            const rez = frontEnder.menuMusicResource.asset.load();
            init();
            frontEnder.nostory = true;
            const display = genRLD();
            renderer.attach('menu', display);
            atlas.switch('dialoguerBase');
            if (SAVE.data.b.svr) {
               await Promise.all([ content.avNarrator.load(inventories.lazyAssets), renderer.pause(1500) ]);
               await dialogue_primitive(...text.a_citadel.story.please1);
               game.text = '';
               await renderer.pause(1500);
               await dialogue_primitive(...text.a_citadel.story.please2);
               game.text = '';
               await renderer.pause(1500);
               await dialogue_primitive(...text.a_citadel.story.please3);
               game.text = '';
            } else if (world.runaway || SAVE.data.b.ufokinwotm8) {
               await Promise.all([ content.avNarrator.load(inventories.lazyAssets), renderer.pause(1500) ]);
               await dialogue_primitive(...text.a_citadel.story.forget1);
               game.text = '';
               await renderer.pause(3000);
               await dialogue_primitive(...text.a_citadel.story.forget2);
               game.text = '';
               await renderer.pause(3000);
               await dialogue_primitive(...text.a_citadel.story.forget3);
               game.text = '';
               await renderer.pause(1500);
               await dialogue_primitive(...text.a_citadel.story.forget4);
               game.text = '';
            } else {
               const ass = new CosmosInventory(content.idcTwinklyRegret, content.avTwinkly1);
               ass.name = 'ass';
               await Promise.all([ ass.load(), renderer.pause(1500) ]);
               const ut_geno = calcLV() > 14;
               const twinkly = new CosmosAnimation({
                  anchor: 0,
                  resources: content.idcTwinklyRegret,
                  position: { x: 160, y: 260 },
                  index: ut_geno ? 15 : 0
               }).on('tick', function () {
                  this.offsets[0].y = sineWaver(0, 2500, 0, 5);
               });
               renderer.attach('menu', twinkly);
               speech.emoters.twinkly = twinkly;
               await twinkly.position.modulate(renderer, 800, { y: 160 }, { y: 160 }, { y: 160 });
               await renderer.pause(1500);
               typer.variables.name = SAVE.data.s.name || systemsText.general.mystery2;
               if (ut_geno) {
                  await dialogue_primitive(...text.a_citadel.story.killer1);
                  game.text = '';
                  await renderer.pause(3000);
                  await dialogue_primitive(...text.a_citadel.story.killer2);
                  game.text = '';
                  await renderer.pause(1500);
                  await dialogue_primitive(...text.a_citadel.story.killer3);
                  game.text = '';
                  await renderer.pause(1500);
                  await dialogue_primitive(...text.a_citadel.story.killer4);
                  game.text = '';
                  await renderer.pause(3000);
                  await dialogue_primitive(...text.a_citadel.story.killer5);
                  game.text = '';
               } else {
                  await dialogue_primitive(...text.a_citadel.story.regret1);
                  game.text = '';
                  await renderer.pause(3000);
                  await dialogue_primitive(...text.a_citadel.story.regret2);
                  game.text = '';
                  await renderer.pause(3000);
                  await dialogue_primitive(...text.a_citadel.story.regret3);
                  game.text = '';
                  await renderer.pause(1500);
                  await dialogue_primitive(...text.a_citadel.story.regret4);
                  game.text = '';
                  await renderer.pause(3000);
                  await dialogue_primitive(...text.a_citadel.story.regret5);
                  game.text = '';
               }
               await twinkly.position.modulate(renderer, 800, {}, {}, { y: 260 });
               renderer.detach('menu', twinkly);
               ass.unload();
            }
            atlas.switch(null);
            renderer.detach('menu', display);
            await Promise.all([ rez, renderer.pause(2000) ]);
            SAVE.flag.b.true_reset_spiel = true;
            saver.time_but_real.active = false;
         }
      } else if (SAVE.flag.b.neutral_reload) {
         saver.time_but_real.active = true;
         const rez = frontEnder.menuMusicResource.asset.load();
         init();
         frontEnder.nostory = true;
         const display = genRLD();
         renderer.attach('menu', display);
         atlas.switch('dialoguerBase');
         const ass = new CosmosInventory(content.idcTwinklyRegret, content.avTwinkly1);
         ass.name = 'ass';
         await Promise.all([ ass.load(), renderer.pause(1500) ]);
         const twinkly = new CosmosAnimation({
            anchor: 0,
            index:
               world.trueKills === 0 &&
               SAVE.data.n.state_foundry_undyne !== 1 &&
               SAVE.flag.n.neutral_twinkly_choice === 0
                  ? 1
                  : 0,
            resources: content.idcTwinklyRegret,
            position: { x: 160, y: 260 }
         }).on('tick', function () {
            this.offsets[0].y = sineWaver(0, 2500, 0, 5);
         });
         renderer.attach('menu', twinkly);
         speech.emoters.twinkly = twinkly;
         await twinkly.position.modulate(renderer, 800, { y: 160 }, { y: 160 }, { y: 160 });
         await renderer.pause(1500);
         await dialogue_primitive(...text.a_citadel.story.postnoot0());
         game.text = '';
         await twinkly.position.modulate(renderer, 800, {}, {}, { y: 260 });
         renderer.detach('menu', twinkly);
         ass.unload();
         atlas.switch(null);
         renderer.detach('menu', display);
         await Promise.all([ rez, renderer.pause(2000) ]);
         SAVE.flag.b.neutral_reload = false;
         saver.time_but_real.active = false;
      } else if (SAVE.flag.n.pacifist_marker > 0 && SAVE.flag.n.pacifist_marker < 16.1) {
         let b = 0;
         launch.intro = false;
         world.cutscene_override = true;
         switch (SAVE.flag.n.pacifist_marker) {
            case 1:
               queue.assets.push(
                  inventories.battleAssets,
                  opponents.final.assets,
                  azAssets1,
                  azAssets2,
                  content.amIdiot
               );
               break;
            case 2:
               queue.assets.push(
                  inventories.battleAssets,
                  opponents.final.assets,
                  opponents.asriel.assets,
                  azAssets1,
                  azAssets2,
                  azAssets3,
                  content.amDontgiveup
               );
               break;
            case 3:
               queue.assets.push(
                  inventories.battleAssets,
                  opponents.final.assets,
                  opponents.asriel.assets,
                  azAssets1,
                  azAssets2,
                  azAssets3
               );
               break;
            case 4:
               queue.assets.push(inventories.battleAssets, opponents.asriel.assets, content.ibcAsrielCutscene1full);
               break;
            case 5:
            case 6:
               b = 1;
               queue.assets.push(inventories.battleAssets, opponents.asriel.assets);
               break;
            case 7:
            case 7.1:
            case 7.2:
            case 7.3:
            case 7.4:
            case 7.5:
            case 7.6:
            case 7.7:
               b = 1;
               queue.assets.push(inventories.battleAssets, opponents.asriel.assets, azAssets4);
               break;
            case 7.8:
            case 8:
               b = 1;
               queue.assets.push(inventories.battleAssets, opponents.asriel.assets, azAssets4, azAssets5);
               break;
            case 9:
            case 9.1:
            case 9.2:
            case 9.3:
            case 9.4:
            case 9.5:
            case 9.6:
            case 9.7:
            case 9.8:
            case 10:
               b = 1;
               queue.assets.push(inventories.battleAssets, opponents.asriel.assets, azAssets4, azAssets5, azAssets6);
               break;
            case 11:
            case 11.1:
            case 11.2:
            case 11.3:
            case 12:
            case 13:
            case 14:
            case 15:
            case 15.1:
            case 15.2:
            case 15.3:
            case 16:
               b = 2;
               queue.assets.push(azAssets7);
               break;
         }
         SAVE.data.s.room = 'c_exit';
         events.on('init-overworld').then(async () => {
            events.on('ready').then(() => {
               world.cutscene_override = false;
            });
            teleporter.movement = false;
            switch (b) {
               case 0:
                  renderer.attach('menu', battler.SOUL);
                  await battler.start(groups.final);
                  game.movement = false;
                  break;
               case 1:
                  renderer.attach('menu', battler.SOUL);
                  battler.SOUL.alpha.value = 1;
                  await battler.start(groups.asriel);
                  game.movement = false;
                  break;
               case 2:
                  await events.on('teleport');
                  break;
            }
            await sad();
         });
      } else if (SAVE.flag.n.neutral_twinkly_stage > 0 && SAVE.flag.n.neutral_twinkly_stage < 6) {
         SAVE.state = CosmosUtils.parse<CosmosKeyed>(SAVE.flag.s.myworld, {});
         SAVE.hostages = CosmosUtils.parse<CosmosKeyed>(SAVE.flag.s.myhostages, {});
         launch.intro = false;
         world.cutscene_override = true;
         switch (SAVE.flag.n.neutral_twinkly_stage) {
            case 1:
               queue.assets.push(twAssets1);
               break;
            case 2:
               queue.assets.push(twAssets2);
               break;
            case 3:
               queue.assets.push(twAssets3, twAssets3a);
               break;
            case 3.1:
               queue.assets.push(twAssets5, twAssets3a, twAssets5a);
               break;
            case 3.2:
               queue.assets.push(twAssets7, twAssets3a, twAssets5a, twAssets7a);
               break;
            case 3.3:
               queue.assets.push(twAssets9, twAssets3a, twAssets5a, twAssets7a, twAssets9a);
               break;
            case 3.4:
               queue.assets.push(twAssets11, twAssets3a, twAssets5a, twAssets7a, twAssets9a, twAssets11a);
               break;
            case 3.5:
               queue.assets.push(twAssets13, twAssets3a, twAssets5a, twAssets7a, twAssets9a, twAssets11a, twAssets13a);
               break;
            case 3.6:
               queue.assets.push(twAssets15, twAssets3a, twAssets5a, twAssets7a, twAssets9a, twAssets11a, twAssets13a);
               break;
            case 4:
            case 5:
            case 5.1:
               queue.assets.push(twAssets16);
               break;
         }
         SAVE.data.s.room = 'c_exit';
         events.on('init-overworld').then(() => {
            events.on('ready').then(() => {
               world.cutscene_override = false;
            });
            teleporter.movement = false;
            if (2 <= SAVE.flag.n.neutral_twinkly_stage) {
               teleporter.attach = false;
            }
            game.camera = new CosmosObject({ position: { y: 10 } });
            bad();
         });
      } else if (SAVE.flag.n.lv20 !== 0) {
         launch.intro = false;
         world.cutscene_override = true;
         SAVE.data.s.room = SAVE.flag.n.lv20 < 3 ? 'c_exit' : '_cockpit';
         events.on('init-overworld').then(() => {
            events.on('ready').then(() => {
               world.cutscene_override = false;
            });
            teleporter.movement = false;
            SAVE.flag.n.lv20 < 3 && mad();
         });
      }
   }
});

events.on('drop', async key => {
   if (SAVE.data.n.plot === 72 && !SAVE.data.b.svr && !world.runaway && game.room === 'c_asgore_asgore') {
      switch (key) {
         case 'pie':
         case 'pie2':
         case 'pie3':
         case 'pie4':
         case 'snails':
         case 'snack':
            await dialogue('dialoguerBottom', ...text.a_citadel.overworld.drop_tori);
            break;
         case 'starling_tea':
            await dialogue('dialoguerBottom', ...text.a_citadel.overworld.drop);
            break;
      }
   }
});

events.on('use', async key => {
   if (SAVE.data.n.plot === 72 && !SAVE.data.b.svr && !world.runaway && game.room === 'c_asgore_asgore') {
      switch (key) {
         case 'pie':
         case 'pie2':
         case 'pie3':
         case 'pie4':
         case 'snails':
         case 'snack':
            await dialogue('dialoguerBottom', ...text.a_citadel.overworld.use_tori);
            break;
         case 'starling_tea':
            await dialogue('dialoguerBottom', ...text.a_citadel.overworld.use);
            break;
      }
   }
});

events.on('save', () => {
   SAVE.flag.b._victory && (SAVE.flag.b._victory = false);
   if (SAVE.data.n.plot === 70 && SAVE.data.b.armaloop && music.approach.instances.length > 0) {
      SAVE.data.n.armaloop = music.approach.instances[0].position;
   }
});

events.on('script', (name, ...args) => {
   switch (name) {
      case 'citadel':
         citadelScript(args[0], ...args.slice(1));
         break;
      case 'trivia':
         if (game.movement && game.room[0] === 'c') {
            trivia(...CosmosUtils.provide(text.a_citadel.trivia[args[0] as keyof typeof text.a_citadel.trivia]));
         }
         break;
   }
});

events.on('tick', () => {
   game.movement && game.room[0] === 'c' && citadelScript('tick');
});

events.on('teleport', async (from, to) => {
   to in cityRooms && renderer.attach('base', city);
   const roomState = (citadelStates.rooms[to] ??= {});
   if (hueshifter.rooms.includes(to)) {
      if (!hueshifter.active) {
         hueshifter.active = true;
         renderer.on('tick', hueshifter.ticker);
         renderer.layers.below.container.filters = [ hueshifter.filter ];
      }
   } else if (hueshifter.active) {
      hueshifter.active = false;
      renderer.off('tick', hueshifter.ticker);
      renderer.layers.below.container.filters = [];
   }
   const inArchive = to.startsWith('c_archive');
   if (inArchive && to !== 'c_archive_surface') {
      if (!archiver.active) {
         archiver.active = true;
         if (SAVE.data.n.state_citadel_archive < 6) {
            archiver.fx = renderer.time;
            renderer.on('tick', archiver.ticker);
            (renderer.filters ??= []).push(archiver.filter);
            archiver.filter.bloomScale = SAVE.flag.b.$option_epilepsy ? 0.3 : 0.6;
         }
      }
      temporary(new CosmosObject({ objects: [ archiver.bg ] }), 'base');
   } else if (archiver.active) {
      archiver.active = false;
      renderer.filters?.includes(archiver.filter) &&
         renderer.filters.splice(renderer.filters.indexOf(archiver.filter), 1);
      renderer.off('tick', archiver.ticker);
   }
   world.archive = inArchive;
   if (SAVE.data.n.plot === 72) {
      for (const i of instances('below', 'xobject')) {
         i.destroy();
      }
      for (const i of instances('main', 'xobject')) {
         i.destroy();
      }
      for (const i of instances('above', 'xobject')) {
         i.destroy();
      }
   }
   if (SAVE.data.n.plot !== 72 || world.runaway || SAVE.data.b.svr) {
      for (const i of instances('below', 'eobject')) {
         i.destroy();
      }
      for (const i of instances('main', 'eobject')) {
         i.destroy();
      }
      for (const i of instances('above', 'eobject')) {
         i.destroy();
      }
   }
   areaC.teleports[to as CitadelRoomKey]?.(roomState, from);
   if (SAVE.data.n.plot === 71.2 && hyper_pacifist()) {
      const brocalls = [
         'c_courtroom',
         'c_start',
         'a_hub3',
         'f_exit',
         'f_telescope',
         'f_corridor',
         's_start',
         'w_entrance'
      ];
      if (to === brocalls[SAVE.data.n.plot_approach]) {
         teleporter.movement = false;
         if (to === 'w_entrance') {
            if (SAVE.flag.n.backtrack_twinkly++ < 1) {
               SAVE.data.n.plot_approach = 8;
               const time = renderer.time;
               const starPositionY = new CosmosValue(40);
               const star = new CosmosSprite({
                  alpha: 0,
                  priority: 9999,
                  anchor: { x: 0, y: 1 },
                  position: { x: player.position.x },
                  frames: [ content.iocTwinklyMainBack ]
               }).on('tick', function () {
                  this.position.y = starPositionY.value + CosmosMath.wave(((renderer.time - time) % 2500) / 2500) * 5;
               });
               game.movement = false;
               await renderer.pause(450);
               renderer.attach('main', star);
               await Promise.all([
                  star.alpha.modulate(renderer, 800, 0, 1),
                  starPositionY.modulate(renderer, 800, 200, 200, 200)
               ]);
               await dialogue('auto', ...text.a_citadel.overworld.brocall8);
               await Promise.all([
                  star.alpha.modulate(renderer, 800, 1, 1, 0),
                  starPositionY.modulate(renderer, 800, starPositionY.value, starPositionY.value, 40)
               ]);
               renderer.detach('main', star);
               game.movement = true;
            }
         } else {
            await dialogue(
               'auto',
               ...[
                  text.a_citadel.overworld.brocall1,
                  text.a_citadel.overworld.brocall2,
                  text.a_citadel.overworld.brocall3,
                  text.a_citadel.overworld.brocall4,
                  text.a_citadel.overworld.brocall5,
                  text.a_citadel.overworld.brocall6,
                  text.a_citadel.overworld.brocall7
               ][SAVE.data.n.plot_approach++]
            );
         }
         game.movement = true;
      }
   }
});

events.on('teleport-start', (from, to) => {
   if (to === 'c_archive_aerialis2') {
      ca_state.wind?.gain.modulate(renderer, 300, 0);
   }
});

export default {};

CosmosUtils.status(`LOAD MODULE: CITADEL AREA (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
