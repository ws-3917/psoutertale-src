import { AdvancedBloomFilter } from '@pixi/filter-advanced-bloom';
import { GlitchFilter } from '@pixi/filter-glitch';
import { MotionBlurFilter } from '@pixi/filter-motion-blur';
import { BLEND_MODES, Container, Filter, Graphics } from 'pixi.js';
import { Vector, pointInPolygon } from 'sat';
import commonText from '../../languages/default/text/common';
import text from '../../languages/default/text/foundry';
import { characters, erndyne, galaxy, goatbro, goatbroTrue, kiddo, runEncounter, tripper } from '../common';
import { helmetdyne } from '../common/api';
import commonGroups from '../common/groups';
import {
   content,
   filters,
   inventories,
   music,
   musicConvolver,
   musicFilter,
   musicRegistry,
   ratio01,
   ratio02,
   shaders,
   sounds,
   tints
} from '../systems/assets';
import { atlas, events, game, items, keys, renderer, rng, rooms, speech, typer } from '../systems/core';
import {
   antifreeze,
   autoNav,
   autozoom,
   battler,
   character,
   choicer,
   dialogue,
   dialogueSession,
   dialogue_primitive,
   directionalInput,
   dropShake,
   epilogue,
   fader,
   fetchCharacters,
   header,
   heal,
   instance,
   instances,
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
   waterpour,
   world
} from '../systems/framework';
import { OutertaleShop } from '../systems/outertale';
import { OutertaleDataNumber, SAVE } from '../systems/save';
import {
   CosmosAnimation,
   CosmosCharacter,
   CosmosDirection,
   CosmosHitbox,
   CosmosImageUtils,
   CosmosInstance,
   CosmosInventory,
   CosmosKeyed,
   CosmosMath,
   CosmosObject,
   CosmosPoint,
   CosmosPointSimple,
   CosmosRectangle,
   CosmosRegion,
   CosmosSprite,
   CosmosText,
   CosmosUtils,
   CosmosValue,
   CosmosValueLinked,
   Vow
} from '../systems/storyteller';
import './bootstrap';
import { armorprice, ghostpartyCondition, startonATE, temgone } from './extras';
import groups, { pregenoAssets } from './groups';
import opponents from './opponents';
import patterns from './patterns';

export const pianosolutions = [
   {
      sequence: [ 0, 7, 5, 0, 4, 4, 5 ],
      willActivate: () => !SAVE.data.b.f_state_piano,
      script: async () => {
         SAVE.data.b.f_state_piano = true;
         instance('main', 'pianobarrier')?.destroy();
         sounds.pathway.instance(renderer);
         shake(2, 1000);
      }
   },
   {
      sequence: [ 3, 12, 10, 12, 9, 10, 7, 10, 9, 5, 3, 5, 0 ],
      willActivate: () => !SAVE.data.b.f_state_truth,
      script: async () => {
         SAVE.data.b.f_state_truth = true;
         instance('main', 'truthbarrier')?.destroy();
         sounds.pathway.instance(renderer);
         shake(2, 1000);
      }
   }
];

export const asgoreAssets = new CosmosInventory(
   content.iocAsgoreUp,
   content.iocAsgoreUpTalk,
   content.iocAsgoreDown,
   content.iocAsgoreDownTalk,
   content.iocAsgoreLeft,
   content.iocAsgoreLeftTalk,
   content.iocAsgoreRight,
   content.iocAsgoreRightTalk,
   inventories.idcAsgore,
   content.avAsgore,
   content.amPrebattle
);
asgoreAssets.name = 'asgoreAssets';

export const eggoAssets = new CosmosInventory(inventories.iocUndyne, content.asStomp, content.amUndynefast);
eggoAssets.name = 'eggoAssets';

export function despawnDummy () {
   (16 <= SAVE.data.n.kills_wastelands ||
      SAVE.data.b.svr ||
      world.runaway ||
      SAVE.data.b.a_state_hapstablook ||
      SAVE.data.b.killed_mettaton ||
      postSIGMA()) &&
      instance('main', 'f_dummynpc')?.destroy();
}

export function destroyHouse () {
   instance('main', 'f_undyne_door')?.destroy();
   const houzz = instance('main', 'f_undynehouse')?.object;
   if (houzz && !houzz.metadata.swapped) {
      houzz.metadata.swapped = true;
      for (const object of houzz.objects) {
         if (object instanceof CosmosAnimation) {
            object.use(content.iooFUndynehouseWrecked);
            object.enable();
            break;
         }
      }
   }
}

export function updateSpooktunes (clear = false) {
   const az = rooms.of('f_napstablook').preload;
   const thing = [ content.amSpooktune, content.amSpookwave, content.amSpookwaltz ][
      SAVE.data.n.state_foundry_blookmusic - 1
   ];
   if (clear) {
      az.value.splice(az.value.indexOf(thing), 1);
   } else {
      az.value.push(thing);
   }
   return [ az, thing ];
}

export async function chaseloop () {
   resetPhish();
   renderer.attach('main', erndyne);
   game.movement = true;
   while ((await events.on('teleport-start'))[1] !== 'f_exit') {}
   await erndyne.metadata.chaser?.gain.modulate(renderer, 300, 0);
   erndyne.metadata.chaser?.stop();
}

export function alphaCheck (this: CosmosObject) {
   switch (game.room) {
      case 'w_toriel_asriel':
         if (SAVE.data.b.w_state_lamp) {
            this.tint = tintCalc(0, ratio02);
            return;
         }
         this.tint = 0xffffff;
         break;
      case 'f_entrance':
         if (this.position.x > 100) {
            this.tint = tintCalc((this.position.x - 100) / 200, ratio02);
         } else {
            this.tint = tintCalc(0, ratio02);
         }
         break;
      case 'f_abyss':
         if (this.position.x > 220) {
            this.tint = tintCalc(0, ratio02);
         } else {
            this.tint = tintCalc(1 - this.position.x / 200, ratio02);
         }
         break;
      case 'f_muffet':
         if (this.position.x < 820) {
            this.tint = tintCalc(0, ratio02);
         } else {
            this.tint = tintCalc((this.position.x - 820) / 200, ratio02);
         }
         break;
      case 'f_plank':
         if (this.position.x > 420) {
            this.tint = tintCalc(0, ratio02);
         } else {
            this.tint = tintCalc(1 - (this.position.x - 220) / 200, ratio02);
         }
         break;
      case 'f_dummy':
         if (this.position.y < 200 || this.position.x < 80 || this.position.x > 240) {
            this.tint = tintCalc(0, ratio01);
         } else {
            this.tint = tintCalc((this.position.y - 200) / 40, ratio01);
         }
         break;
      case 'f_village':
         if (this.position.y < 0) {
            this.tint = tintCalc(0, ratio02);
         } else {
            this.tint = tintCalc(this.position.y / 60, ratio02);
         }
         break;
      case 'f_battle':
         if (this.position.x < 180) {
            this.tint = tintCalc(0, ratio02);
         } else {
            this.tint = tintCalc((this.position.x - 180) / 160, ratio02);
         }
         break;
      case 'a_hub1':
         if (world.genocide || SAVE.data.b.svr || postSIGMA()) {
            const pZed = 80;
            const pArr = [ 320, 300, 280, 260, 260, 240, 220, 200, 200, 180, 180, 160, 160, 160, 140 ];
            const pExt = pArr.length * 20;
            const pPer = Math.min(Math.max((this.position.y - pZed) / pExt, 0), 1);
            const pVal = CosmosMath.linear(pPer, ...pArr, pArr[pArr.length - 1]);
            const pRel = Math.min(Math.max(this.position.x - pVal, -40), 0) / -40;
            this.tint = tintCalc(1 - pRel, 0.6);
         } else {
            this.tint = 0xffffff;
         }
         break;
      case 'a_hub2':
         if (world.genocide || SAVE.data.b.svr || postSIGMA()) {
            const pZed = 20;
            const pArr = [
               300, 280, 260, 240, 220, 220, 200, 200, 200, 180, 180, 180, 180, 180, 180, 180, 180, 200, 200, 200, 220,
               220, 240, 260, 280, 300
            ];
            const pExt = pArr.length * 20;
            const pPer = Math.min(Math.max((this.position.x - pZed) / pExt, 0), 1);
            const pVal = CosmosMath.linear(pPer, ...pArr, pArr[pArr.length - 1]);
            const pRel = Math.min(Math.max(this.position.y - pVal, -40), 0) / -40;
            this.tint = tintCalc(1 - pRel, 0.6);
         } else {
            this.tint = 0xffffff;
         }
         break;
      case 'a_lookout':
         if (world.genocide || SAVE.data.b.svr || postSIGMA()) {
            if (this.position.x < 80) {
               this.tint = tintCalc(1 - Math.min(this.position.x - 60, this.position.y - 20) / 40, 0.6);
            } else if (this.position.x > 260) {
               this.tint = tintCalc(1 - Math.min(280 - this.position.x, this.position.y - 20) / 40, 0.6);
            } else {
               if (this.position.y > 60) {
                  this.tint = tintCalc(0, 0.6);
               } else {
                  this.tint = tintCalc((60 - this.position.y) / 40, 0.6);
               }
            }
         } else {
            this.tint = 0xffffff;
         }
         break;
      case 'a_hub3':
         if (world.genocide || SAVE.data.b.svr || postSIGMA()) {
            const pZed = 80;
            const pArr = [
               0, 20, 40, 60, 60, 80, 100, 120, 120, 140, 160, 160, 160, 180, 180, 180, 180, 180, 180, 180, 160, 140
            ];
            const pExt = pArr.length * 20;
            const pPer = Math.min(Math.max((this.position.y - pZed) / pExt, 0), 1);
            const pVal = CosmosMath.linear(pPer, ...pArr, pArr[pArr.length - 1]);
            const pRel = Math.min(Math.max(pVal - this.position.x, -40), 0) / -40;
            this.tint = tintCalc(1 - pRel, 0.6);
         } else {
            this.tint = 0xffffff;
         }
         break;
      case 'a_hub4':
         if (world.genocide || SAVE.data.b.svr || postSIGMA()) {
            if (this.position.x < 100 && this.position.y < 240) {
               this.tint = tintCalc((this.position.y - 200) / 40, 0.6);
            } else if (this.position.y < 260) {
               const pZed = 80;
               const pArr = [ 300, 320, 340, 340, 320, 320, 300, 300, 280, 260 ];
               const pExt = pArr.length * 20;
               const pPer = Math.min(Math.max((this.position.y - pZed) / pExt, 0), 1);
               const pVal = CosmosMath.linear(pPer, ...pArr, pArr[pArr.length - 1]);
               const pRel = Math.min(Math.max(pVal - this.position.x, -40), 0) / -40;
               this.tint = tintCalc(1 - pRel, 0.6);
            } else {
               const pZed = 0;
               const pArr = [ 300, 320, 340, 340, 340, 340, 340, 320, 320, 320, 300, 300, 280, 260, 240, 220 ];
               const pExt = pArr.length * 20;
               const pPer = Math.min(Math.max((this.position.x - pZed) / pExt, 0), 1);
               const pVal = CosmosMath.linear(pPer, ...pArr, pArr[pArr.length - 1]);
               const pRel = Math.min(Math.max(pVal - this.position.y, -40), 0) / -40;
               this.tint = tintCalc(1 - pRel, 0.6);
            }
         } else {
            this.tint = 0xffffff;
         }
         break;
      case 'a_sleeping1':
         if (world.genocide || SAVE.data.b.svr || postSIGMA()) {
            this.tint = tintCalc((this.position.y - 220) / 40, 0.6);
         } else {
            this.tint = 0xffffff;
         }
         break;
      case 'a_hub5':
         if (world.genocide || SAVE.data.b.svr || postSIGMA()) {
            if (this.position.y < 240) {
               const pZed = 160;
               const pArr = [ 120, 140, 140, 160, 180, 200 ];
               const pExt = pArr.length * 20;
               const pPer = Math.min(Math.max((this.position.y - pZed) / pExt, 0), 1);
               const pVal = CosmosMath.linear(pPer, ...pArr, pArr[pArr.length - 1]);
               const pRel = Math.min(Math.max(this.position.x - pVal, -40), 0) / -40;
               this.tint = tintCalc(1 - pRel, 0.6);
            } else {
               const pZed = 140;
               const pArr = [ 200, 220, 240, 260, 280, 300, 300, 320, 320, 320, 340, 340, 340, 340, 340, 320, 300 ];
               const pExt = pArr.length * 20;
               const pPer = Math.min(Math.max((this.position.x - pZed) / pExt, 0), 1);
               const pVal = CosmosMath.linear(pPer, ...pArr, pArr[pArr.length - 1]);
               const pRel = Math.min(Math.max(pVal - this.position.y, -40), 0) / -40;
               this.tint = tintCalc(1 - pRel, 0.6);
            }
         } else {
            this.tint = 0xffffff;
         }
         break;
      case 'c_throneroom':
         if (this.position.x < 120) {
            if (this.position.y < 280) {
               this.tint = tintCalc(1 - (300 - this.position.y) / 80, 0.6);
               break;
            } else if (this.position.y < 340) {
               this.tint = tintCalc((340 - this.position.y) / 80, 0.6);
               break;
            } else if (this.position.y < 480) {
               this.tint = tintCalc(1 - (500 - this.position.y) / 80, 0.6);
               break;
            } else if (this.position.y < 540) {
               this.tint = tintCalc((540 - this.position.y) / 80, 0.6);
               break;
            }
         } else if (this.position.x < 220 && this.position.y > 300 && this.position.y < 540) {
            this.tint = tintCalc((540 - this.position.y) / 80, 0.6);
            break;
         }
         this.tint = tintCalc(0, 0.6);
         break;
   }
}

export function tintCalc (value: number, target: number) {
   if (1 <= value) {
      return 0xffffff;
   } else {
      return CosmosImageUtils.gradient(0, 0xffffff, CosmosMath.remap(Math.max(value, 0), target, 1));
   }
}

export const foundryStates = {
   rooms: {} as Partial<CosmosKeyed<CosmosKeyed<any>>>,
   scripts: {} as Partial<CosmosKeyed<CosmosKeyed<any>>>
};

export function puzzleTarget () {
   return game.room === 'f_puzzle1' ? 36 : game.room === 'f_puzzle2' ? 37 : 45;
}

export function pulsetestGenOver (owner: CosmosObject) {
   return CosmosUtils.populate(
      2,
      side =>
         new CosmosSprite({
            offsets: [ { x: [ -2, 2 ][side], y: -3 } ],
            scale: { x: [ 1, -1 ][side] },
            position: owner.position.subtract([ 6, -6 ][side], 47),
            frames: [ content.iooFPuzzlepylonOverlay ],
            priority: owner.position.y + 3
         })
   );
}

export function pulsetest (instances: CosmosObject[], pylon: CosmosObject) {
   const objects = [] as CosmosObject[];
   checker: for (const other of instances) {
      if (other === pylon) {
         continue;
      }
      const closeX = Math.abs(other.position.x - pylon.position.x) < 12;
      const closeY = Math.abs(other.position.y - pylon.position.y) < 12;
      if (closeX === closeY) {
         continue;
      } else {
         objects.push(...(objects.length === 0 ? pulsetestGenOver(pylon) : []), ...pulsetestGenOver(other));
         const targets = [] as number[];
         if (closeX) {
            if (other.position.y < pylon.position.y) {
               other.position.x <= pylon.position.x && targets.push(0);
               pylon.position.x <= other.position.x && targets.push(1);
            } else {
               other.position.x <= pylon.position.x && targets.push(5);
               pylon.position.x <= other.position.x && targets.push(4);
            }
         } else if (other.position.x < pylon.position.x) {
            other.position.y <= pylon.position.y && targets.push(7);
            pylon.position.y <= other.position.y && targets.push(6);
         } else {
            other.position.y <= pylon.position.y && targets.push(2);
            pylon.position.y <= other.position.y && targets.push(3);
         }
         for (const target of targets) {
            const o1 = target < 4 ? pylon : other;
            const o2 = target < 4 ? other : pylon;
            const p1 = o1.position.value();
            const p2 = o2.position.value();
            const wT = target % 4;
            const distance = Math.abs(wT < 2 ? o2.position.y - o1.position.y : o2.position.x - o1.position.x);
            for (const obj of objects) {
               if (obj.metadata.target === target) {
                  if (obj.metadata.distance < distance) {
                     continue checker;
                  } else {
                     objects.splice(objects.indexOf(obj), 1);
                  }
               }
            }
            objects.push(
               new CosmosRectangle({
                  alpha: 0.75,
                  fill: 0xffffff,
                  metadata: { target, distance },
                  position: o1.position.add(wT === 0 ? -7 : 3, wT === 0 || wT === 1 ? -47 : wT === 2 ? -56 : -46),
                  size: {
                     x: wT < 2 ? 4 : o2.position.x - o1.position.x - 6,
                     y: wT < 2 ? o2.position.y - o1.position.y : 4
                  },
                  priority: wT === 0 || wT === 1 ? o2.position.y + 1 : wT === 2 ? o1.position.y - 9 : o1.position.y + 1
               }).on('tick', function () {
                  if (this.alpha.value > 0) {
                     this.alpha.value -= 1 / 30;
                     if (
                        this.alpha.value <= 0 ||
                        o1.position.x !== p1.x ||
                        o2.position.x !== p2.x ||
                        o1.position.y !== p1.y ||
                        o2.position.y !== p2.y
                     ) {
                        renderer.detach('main', ...objects);
                        for (const obj of objects) {
                           obj.alpha.value = 0;
                           // ensures disappearance before render
                           obj.container.alpha = 0;
                        }
                     }
                  }
               })
            );
         }
      }
   }
   renderer.attach('main', ...objects);
   objects.length > 0 && (sounds.indicator.instance(renderer).rate.value = 1.3);
}

export async function beamcast (
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
): Promise<boolean> {
   let step = 0;
   let next = 'wall';
   let anim = null as null | CosmosAnimation;
   const seek = new CosmosPoint(position).add(0, 39);
   const increment = { up: { y: -1 }, down: { y: 1 }, left: { x: -1 }, right: { x: 1 } }[face];
   const { mirrors, discovery, beamwalls, rects, anims, overs } = stage;
   top: while (step++ < 1000) {
      seek.x += increment.x ?? 0;
      seek.y += increment.y ?? 0;
      if (step > 4) {
         for (const [ pylon, action, position ] of mirrors) {
            if (seek.x === position.x && seek.y === position.y) {
               next = action;
               anim = pylon.objects.filter(sub => sub instanceof CosmosAnimation)[0] as CosmosAnimation;
               discovery.includes(pylon) || discovery.push(pylon);
               if (next === 'pylon-c' || next === 'pylon-d') {
                  const over = new CosmosSprite({
                     offsets: [ { x: next === 'pylon-c' ? -2 : 2, y: -3 } ],
                     scale: { x: next === 'pylon-c' ? 1 : -1 },
                     position: { x: pylon.position.x - (next === 'pylon-c' ? 6 : -6), y: pylon.position.y - 47 },
                     frames: [ content.iooFPuzzlepylonOverlay ],
                     priority: pylon.position.y + 3
                  });
                  overs.push(over);
                  renderer.attach('main', over);
               }
               break top;
            }
         }
         const seekVector = new Vector(seek.x, seek.y);
         for (const beamwall of beamwalls) {
            if (pointInPolygon(seekVector, beamwall.polygon)) {
               if (beamwall.metadata.barrier) {
                  next = 'wall';
                  seek.x += increment.x ?? 0;
                  seek.y += increment.y ?? 0;
                  break top;
               } else if (beamwall.metadata.trigger) {
                  next = 'endpoint';
                  seek.x += increment.x ?? 0;
                  seek.y += increment.y ?? 0;
                  break top;
               }
            }
         }
      }
   }
   const anchor = { up: { x: 0, y: 1 }, down: { x: 0 }, left: { x: 1, y: 0 }, right: { y: 0 } }[face];
   const target = new CosmosPoint({ x: Math.abs(increment.x ?? 0), y: Math.abs(increment.y ?? 0) })
      .multiply(step)
      .add(5)
      .subtract(
         next.startsWith('pylon')
            ? { up: 1, down: 1, left: 3, right: 3 }[face]
            : { up: 1, down: 1, left: 6, right: 6 }[face],
         next.startsWith('pylon')
            ? { up: 6, down: 0, left: 1, right: 1 }[face]
            : { up: 4, down: -34, left: 1, right: 1 }[face]
      );
   const size = target.subtract(5).multiply(0.75).add(5);
   const rect = new CosmosRectangle({
      position,
      fill: 0xcfcfcf,
      metadata: { face },
      size: 5,
      anchor,
      objects: [
         new CosmosRectangle({
            fill: 0xffffff,
            anchor,
            alpha: 0.5,
            offsets: [ { x: face === 'left' ? -1 : face === 'right' ? 1 : 0, y: face === 'down' && !first ? -1 : 0 } ]
         })
      ]
   }).on('tick', function () {
      this.priority.value =
         this.position.y + (face === 'left' || face === 'right' ? 45 : face === 'down' ? size.y + 46 : 45 - size.y);
      (this.objects[0] as CosmosRectangle).size.set(
         face === 'down' || face === 'up' ? this.size.x / 2 : Math.max(this.size.x - 2, 0),
         face === 'left' || face === 'right' ? this.size.y / 2 : this.size.y
      );
   });
   renderer.attach('main', rect);
   rects.push(rect);
   let moving = true;
   await Promise.race([
      rect.size.modulate(renderer, step * 2, size, target),
      renderer
         .when(() => !valid.state)
         .then(() => (moving ? rect.size.modulate(renderer, 0, rect.size.value()) : void 0))
   ]);
   moving = false;
   if (valid.state) {
      if (anim) {
         anims.includes(anim) || anims.push(anim);
         sounds.indicator.instance(renderer);
         anim.index = 2;
      }
      switch (next) {
         case 'endpoint':
            return true;
         case 'pylon-a':
            return await beamcast(
               stage,
               face === 'right' ? seek.add(0, -37) : seek.add(2, -39),
               valid,
               face === 'right' ? 'up' : 'left'
            );
         case 'pylon-b':
            return await beamcast(
               stage,
               face === 'left' ? seek.add(0, -37) : seek.add(-2, -39),
               valid,
               face === 'left' ? 'up' : 'right'
            );
         case 'pylon-c':
            return await beamcast(
               stage,
               face === 'right' ? seek.add(0, -37) : seek.add(2, -39),
               valid,
               face === 'right' ? 'down' : 'left'
            );
         case 'pylon-d':
            return await beamcast(
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

export function napstamusic (roomState: any) {
   game.music?.stop();
   music.uwa.stop();
   music.reunited.stop();
   const mus = musicRegistry
      .of([ 'spooktune', 'spookwave', 'spookwaltz' ][SAVE.data.n.state_foundry_blookmusic - 1])
      .instance(renderer);
   roomState.customs = mus;
   roomState.customsLevel = mus.gain.value;
   mus.gain.value /= 4;
   mus.gain.modulate(renderer, 300, mus.gain.value * 4);
   events.on('teleport-start').then(() => {
      mus.gain.modulate(renderer, 300, 0);
   });
   events.on('teleport').then(() => {
      mus.stop();
      roomState.customsLevel = void 0;
      if (SAVE.data.n.plot === 72 && roomState.customs !== void 0) {
         const ep = epilogue();
         ep.gain.value = 0;
         ep.gain.modulate(renderer, 300, ep.daemon.gain);
      }
      roomState.customs = void 0;
   });
}

export const failPuzzle = async (rects: CosmosRectangle[], pylons: CosmosAnimation[], semi?: boolean) => {
   semi ? sounds.indicator.instance(renderer) : sounds.noise.instance(renderer);
   for (const rect of rects) {
      rect.fill = semi ? 0xfcea72 : 0xff0000;
   }
   for (const pylon of pylons) {
      pylon.index = semi ? 4 : 3;
   }
   await renderer.pause(100);
   for (const rect of rects) {
      rect.fill = 0;
   }
   for (const pylon of pylons) {
      pylon.index = 0;
   }
   await renderer.pause(200);
   sounds.noise.instance(renderer);
   for (const rect of rects) {
      rect.fill = semi ? 0xfcea72 : 0xff0000;
   }
   for (const pylon of pylons) {
      pylon.index = semi ? 4 : 3;
   }
   await renderer.pause(400);
   for (const rect of rects) {
      renderer.detach('main', rect);
   }
   for (const pylon of pylons) {
      pylon.index = 0;
   }
};

export const passPuzzle = async (rects: CosmosRectangle[], pylons: CosmosAnimation[]) => {
   sounds.indicator.instance(renderer);
   for (const rect of rects) {
      rect.fill = 0x6ca4fc;
   }
   for (const pylon of pylons) {
      pylon.index = 1;
   }
   await renderer.pause(100);
   for (const rect of rects) {
      rect.fill = 0;
   }
   for (const pylon of pylons) {
      pylon.index = 0;
   }
   await renderer.pause(200);
   sounds.indicator.instance(renderer);
   for (const rect of rects) {
      rect.fill = 0x6ca4fc;
   }
   for (const pylon of pylons) {
      pylon.index = 1;
   }
   await renderer.pause(400);
};

export async function stabbie (earlyExit = false, ...positions: CosmosPointSimple[]) {
   const r = game.room;
   const sprs = [] as CosmosSprite[];
   for (const position of positions) {
      const y = position.y + 20;
      const spr = temporary(
         new CosmosSprite({
            alpha: 0,
            anchor: { y: 1 },
            priority: y,
            position: { x: position.x, y },
            frames: [ content.iooFFloorspearBase ]
         }),
         'below'
      );
      sprs.push(spr);
      spr.alpha.modulate(renderer, 400, 1);
   }
   sounds.appear.instance(renderer);
   await renderer.pause(300);
   if (game.room !== r) {
      return;
   }
   const anims = [] as CosmosAnimation[];
   for (const spr of sprs) {
      const anim = temporary(
         new CosmosAnimation({
            active: true,
            anchor: { y: 1 },
            position: spr,
            resources: content.iooFFloorspear
         }).on('tick', function () {
            this.index === 2 && this.disable();
         }),
         'main'
      );
      anims.push(anim);
      stabbieHole(spr, !earlyExit);
   }
   sounds.stab.instance(renderer);
   if (!earlyExit) {
      for (const spr of sprs) {
         if (
            game.movement &&
            spr.position.x > player.position.x - 22.5 &&
            spr.position.x < player.position.x + 2.5 &&
            spr.position.y > player.position.y - 2.5 &&
            spr.position.y < player.position.y + 17.5
         ) {
            game.movement = false;
            battler.battlefall(player, { x: 160, y: 180 }).then(() =>
               battler.simple(async () => {
                  game.movement = true;
                  await patterns.undynefast();
                  if (SAVE.data.n.hp > 0) {
                     events.on('battle-exit').then(async () => {
                        if (renderer.layers.main.objects.includes(kiddo)) {
                           await dialogue('auto', ...text.a_foundry.epicreaction());
                        }
                        if (renderer.layers.main.objects.includes(goatbro)) {
                           await dialogue('auto', ...text.a_foundry.goatreaction());
                        }
                     });
                     events.fire('exit');
                  }
               })
            );
            break;
         }
      }
      if (game.room !== r) {
         return;
      }
      await renderer.pause(300);
      if (game.room !== r) {
         return;
      }
      await Promise.all([ ...sprs, ...anims ].map(o => o.alpha.modulate(renderer, 500, 0)));
      renderer.detach('below', ...sprs);
      renderer.detach('main', ...anims);
   }
   return { sprs, anims };
}

export function stabbieHole (position: CosmosPointSimple, append = false) {
   temporary(
      new CosmosSprite({ anchor: { y: 1 }, position, frames: [ content.iooFSpearHole ], priority: position.y - 1 }),
      'below'
   );
   if (append) {
      SAVE.data.s.state_foundry_f_chaseHole = CosmosUtils.serialize([
         ...CosmosUtils.parse<CosmosPointSimple[]>(SAVE.data.s.state_foundry_f_chaseHole, []),
         { x: position.x, y: position.y }
      ]);
   }
}

export const foundryScript = async (subscript: string, ...args: string[]): Promise<any> => {
   const roomState = (foundryStates.rooms[game.room] ??= {});
   if (subscript === 'tick') {
      if (!foundryStates.scripts.steamgap || !foundryStates.scripts.steamgap.init) {
         const scriptState = (foundryStates.scripts.steamgap ??= {});
         scriptState.init = true;
         renderer.pause(CosmosMath.remap(Math.random(), 500, 5000)).then(() => {
            if (renderer.alpha.value === 1 && !battler.active) {
               const steamgap = foundryStates.rooms[game.room]?.steamgap as CosmosPointSimple[];
               if (steamgap && steamgap.length > 0) {
                  const scale = Math.random();
                  const trueScale = CosmosMath.remap(scale, 0.5, 0.9);
                  const position = new CosmosPoint(Math.random() * 20, Math.random() * 20).add(
                     steamgap[Math.floor(Math.random() * steamgap.length)]
                  );
                  const sprite = new CosmosSprite({
                     alpha: 0.5,
                     anchor: 0,
                     scale: new CosmosPoint(trueScale),
                     position,
                     priority: position.y,
                     rotation: Math.round(Math.random() * 360),
                     frames: [ content.iooFSteam ]
                  });
                  renderer.attach('main', sprite);
                  sprite.rotation.modulate(
                     renderer,
                     1000,
                     sprite.rotation.value + CosmosMath.remap(Math.random(), 45, 135) * (Math.random() < 0.5 ? 1 : -1)
                  );
                  sprite.position.modulate(
                     renderer,
                     1000,
                     sprite.position.subtract(0, trueScale * 30),
                     sprite.position.subtract(0, trueScale * 45)
                  );
                  sprite.scale.modulate(
                     renderer,
                     500,
                     sprite.scale.multiply(CosmosMath.remap(Math.random(), 1.1, 1.3))
                  );
                  Promise.race([ sprite.alpha.modulate(renderer, 1000, 0), events.on('teleport') ]).then(() => {
                     renderer.detach('main', sprite);
                  });
               }
            }
            scriptState.init = false;
         });
      }
      switch (game.room) {
         case 'f_quiche':
            SAVE.data.b.item_jumpsuit && instance('main', 'jumpsuit_item')?.destroy();
            break;
         case 'f_sans':
            SAVE.data.n.plot < 35 || instance('main', 'f_kidd')?.destroy();
            break;
         case 'f_view': {
            if (SAVE.data.n.state_foundry_muffet !== 1) {
               const hist = (roomState.hist ??= []) as CosmosPointSimple[];
               hist.push(player.position.value()) > 7 && hist.shift();
               roomState.mode ??= 'follow';
               const proximity = Math.abs(500 - player.position.x) < 140;
               if (SAVE.data.n.plot_kidd < 4) {
                  if ((proximity && roomState.mode === 'follow') || (!proximity && roomState.mode === 'onlook')) {
                     roomState.mode = 'transition';
                     kiddo.metadata.barrier = false;
                     kiddo.metadata.override = true;
                     if (player.position.x > 500 && !proximity) {
                        SAVE.data.n.plot_kidd = 4;
                     }
                  }
               }
               if (roomState.mode === 'transition') {
                  if (proximity) {
                     const target = { x: 500, y: 85 };
                     for (const sprite of Object.values(kiddo.sprites)) {
                        sprite.duration = Math.round(15 / 4);
                     }
                     const x = target.x;
                     const y = target.y;
                     const diffX = Math.abs(x - kiddo.position.x);
                     const diffY = Math.abs(y - kiddo.position.y);
                     if (diffX > 0 || diffY > 0) {
                        const dirX = x - kiddo.position.x < 0 ? -1 : 1;
                        const dirY = y - kiddo.position.y < 0 ? -1 : 1;
                        kiddo.move(
                           {
                              x: (diffX === 0 ? 0 : diffX < 4 ? diffX : 4) * dirX,
                              y: (diffY === 0 ? 0 : diffY < 4 ? diffY : 4) * dirY
                           },
                           renderer
                        );
                     } else {
                        kiddo.face = 'up';
                        roomState.mode = 'onlook';
                        kiddo.metadata.barrier = true;
                        kiddo.metadata.interact = true;
                        kiddo.metadata.name = 'trivia';
                        SAVE.data.n.plot_kidd < 4 || (SAVE.data.n.plot_kidd = 3.3);
                        kiddo.metadata.args = [ 'f_view' ];
                        kiddo.move({ x: 0, y: 0 }, renderer);
                        if (renderer.detect(kiddo, player).length > 0) {
                           if (player.position.x < kiddo.position.x) {
                              player.position.x = kiddo.position.x - kiddo.size.x / 2 - player.size.x / 2;
                           } else {
                              player.position.x = kiddo.position.x + kiddo.size.x / 2 + player.size.x / 2;
                           }
                        }
                     }
                  } else {
                     const pos = kiddo.position.clone();
                     const extent = pos.extentOf(player.position);
                     const modRate = 4.5;
                     if (extent <= 21 + modRate) {
                        kiddo.position.set(
                           player.position.x < 500 ? player.position.add(21, 0) : player.position.subtract(21, 0)
                        );
                        kiddo.face = player.face;
                        roomState.mode = 'follow';
                        kiddo.metadata.barrier = false;
                        kiddo.metadata.interact = false;
                        kiddo.metadata.name = void 0;
                        kiddo.metadata.args = void 0;
                        kiddo.metadata.override = false;
                        kiddo.metadata.move = 0;
                        tracker.supplant(player.position.x < 500 ? 'left' : 'right');
                     } else {
                        const target = hist[0];
                        pos.x += Math.min(Math.max(target.x - pos.x, -modRate), modRate);
                        pos.y += Math.min(Math.max(target.y - pos.y, -modRate), modRate);
                        kiddo.move(
                           pos.subtract(kiddo.position.value()),
                           renderer,
                           [ 'below', 'main' ],
                           hitbox => hitbox !== kiddo && hitbox.metadata.barrier === true
                        );
                     }
                  }
               }
            }
            break;
         }
         case 'f_puzzle1':
         case 'f_puzzle2':
         case 'f_puzzle3': {
            const multi = [ 'f_puzzlepylon3A', 'f_puzzlepylon3B', 'f_puzzlepylon3D', 'f_puzzlepylon3E' ];
            const target = puzzleTarget();
            if (SAVE.data.n.plot < target) {
               const pylonz = [ ...instances('main', 'pylon') ].map(instance => instance.object);
               hyperloop: for (const pylon of pylonz) {
                  if (pylon.position.task !== void 0) {
                     continue;
                  }
                  const name = (pylon.metadata.tags as string[]).filter(tag => tag !== 'pylon')[0];
                  SAVE.data.n[`state_foundry_${name.slice(2) as 'puzzlepylon1A'}x`] = pylon.position.x;
                  SAVE.data.n[`state_foundry_${name.slice(2) as 'puzzlepylon1A'}y`] = pylon.position.y;
                  const minX = pylon.position.x - 10;
                  const maxX = pylon.position.x + 10;
                  const minY = pylon.position.y - 20;
                  const maxY = pylon.position.y;
                  if (player.position.x > minX && player.position.x < maxX) {
                     if (
                        [ 'f_puzzlepylon1B', 'f_puzzlepylon2B', 'f_puzzlepylon3F', 'f_puzzlepylon3H' ].includes(name) ||
                        (name === 'f_puzzlepylon2A' && pylon.position.x !== 310) ||
                        (name === 'f_puzzlepylon2D' && pylon.position.x !== 350) ||
                        ([ 'f_puzzlepylon3A', 'f_puzzlepylon3B' ].includes(name) &&
                           ![ 590, 650 ].includes(pylon.position.x)) ||
                        ([ 'f_puzzlepylon3D', 'f_puzzlepylon3E' ].includes(name) &&
                           ![ 730, 790 ].includes(pylon.position.x))
                     ) {
                        continue;
                     }
                     if (player.position.y < pylon.position.y) {
                        if (keyState.down && player.position.y > minY) {
                           if (name === 'f_puzzlepylon1A' && pylon.position.y === 260) {
                              continue;
                           }
                           if (name === 'f_puzzlepylon2A' && pylon.position.y === 200) {
                              continue;
                           }
                           if ([ 'f_puzzlepylon2C', 'f_puzzlepylon2D' ].includes(name) && pylon.position.y === 160) {
                              continue;
                           }
                           if (multi && pylon.position.y === 260) {
                              continue;
                           }
                           const targetpos = pylon.position.add(0, 10);
                           if (multi.includes(name)) {
                              for (const other of pylonz) {
                                 if (pylon === other) {
                                    continue;
                                 }
                                 if (
                                    Math.abs(other.position.x - targetpos.x) +
                                       Math.abs(other.position.y - targetpos.y) <
                                    20
                                 ) {
                                    continue hyperloop;
                                 }
                              }
                           }
                           pylon.position.modulate(renderer, 66, targetpos, targetpos).then(() => {
                              pulsetest(pylonz, pylon);
                           });
                           player.position.y -= 1.5;
                        }
                     } else if (keyState.up && player.position.y < maxY + 5) {
                        if (name === 'f_puzzlepylon1A' && pylon.position.y === 180) {
                           continue;
                        }
                        if (
                           [ 'f_puzzlepylon2A', 'f_puzzlepylon2C', 'f_puzzlepylon2D' ].includes(name) &&
                           pylon.position.y === 120
                        ) {
                           continue;
                        }
                        if (
                           [ 'f_puzzlepylon3A', 'f_puzzlepylon3B', 'f_puzzlepylon3D', 'f_puzzlepylon3E' ].includes(
                              name
                           ) &&
                           pylon.position.y === 200
                        ) {
                           continue;
                        }
                        const targetpos = pylon.position.add(0, -10);
                        if (multi.includes(name)) {
                           for (const other of pylonz) {
                              if (pylon === other) {
                                 continue;
                              }
                              if (
                                 Math.abs(other.position.x - targetpos.x) + Math.abs(other.position.y - targetpos.y) <
                                 20
                              ) {
                                 continue hyperloop;
                              }
                           }
                        }
                        pylon.position.modulate(renderer, 66, targetpos, targetpos).then(() => {
                           pulsetest(pylonz, pylon);
                        });
                        player.position.y += 1.5;
                     }
                  } else if (player.position.y > minY && player.position.y < maxY) {
                     if (
                        [ 'f_puzzlepylon1A', 'f_puzzlepylon2C' ].includes(name) ||
                        (name === 'f_puzzlepylon2A' && pylon.position.y !== 200) ||
                        (name === 'f_puzzlepylon2D' && pylon.position.y !== 120) ||
                        (multi.includes(name) && ![ 200, 260 ].includes(pylon.position.y))
                     ) {
                        continue;
                     }
                     if (player.position.x < pylon.position.x) {
                        if (keyState.right && player.position.x > minX - 10) {
                           if (name === 'f_puzzlepylon1B' && pylon.position.x === 190) {
                              continue;
                           }
                           if (name === 'f_puzzlepylon2A' && pylon.position.x === 350) {
                              continue;
                           }
                           if (name === 'f_puzzlepylon2B' && pylon.position.x === 270) {
                              continue;
                           }
                           if (name === 'f_puzzlepylon2D' && pylon.position.x === 390) {
                              continue;
                           }
                           if (
                              [ 'f_puzzlepylon3A', 'f_puzzlepylon3B', 'f_puzzlepylon3F' ].includes(name) &&
                              pylon.position.x === 650
                           ) {
                              continue;
                           }
                           if (
                              [ 'f_puzzlepylon3D', 'f_puzzlepylon3E', 'f_puzzlepylon3H' ].includes(name) &&
                              pylon.position.x === 790
                           ) {
                              continue;
                           }
                           const targetpos = pylon.position.add(10, 0);
                           if (multi.includes(name)) {
                              for (const other of pylonz) {
                                 if (pylon === other) {
                                    continue;
                                 }
                                 if (
                                    Math.abs(other.position.x - targetpos.x) +
                                       Math.abs(other.position.y - targetpos.y) <
                                    20
                                 ) {
                                    continue hyperloop;
                                 }
                              }
                           }
                           pylon.position.modulate(renderer, 66, targetpos, targetpos).then(() => {
                              pulsetest(pylonz, pylon);
                           });
                           player.position.x -= 1.5;
                        }
                     } else if (keyState.left && player.position.x < maxX + 10) {
                        if (name === 'f_puzzlepylon1B' && pylon.position.x === 130) {
                           continue;
                        }
                        if (name === 'f_puzzlepylon2A' && pylon.position.x === 310) {
                           continue;
                        }
                        if (name === 'f_puzzlepylon2B' && pylon.position.x === 230) {
                           continue;
                        }
                        if (name === 'f_puzzlepylon2D' && pylon.position.x === 350) {
                           continue;
                        }
                        if (
                           [ 'f_puzzlepylon3A', 'f_puzzlepylon3B', 'f_puzzlepylon3F' ].includes(name) &&
                           pylon.position.x === 590
                        ) {
                           continue;
                        }
                        if (
                           [ 'f_puzzlepylon3D', 'f_puzzlepylon3E', 'f_puzzlepylon3H' ].includes(name) &&
                           pylon.position.x === 730
                        ) {
                           continue;
                        }
                        const targetpos = pylon.position.add(-10, 0);
                        if (multi.includes(name)) {
                           for (const other of pylonz) {
                              if (pylon === other) {
                                 continue;
                              }
                              if (
                                 Math.abs(other.position.x - targetpos.x) + Math.abs(other.position.y - targetpos.y) <
                                 20
                              ) {
                                 continue hyperloop;
                              }
                           }
                        }
                        pylon.position.modulate(renderer, 66, targetpos, targetpos).then(() => {
                           pulsetest(pylonz, pylon);
                        });
                        player.position.x += 1.5;
                     }
                  }
               }
            } else if (
               !world.nootflags.has(game.room) &&
               (game.room !== 'f_puzzle3' || !SAVE.data.b.f_state_quicksolve)
            ) {
               for (const { object: pylon } of instances('main', 'pylon')) {
                  if (!pylon.metadata.active) {
                     pylon.metadata.active = true;
                     (pylon.objects.filter(x => x instanceof CosmosAnimation)[0] as CosmosAnimation).index = 1;
                  }
               }
            }
            break;
         }
         case 'f_prechase': {
            if (SAVE.data.n.plot < 48 || world.genocide) {
               for (const inst of instances('below', 'bridge')) {
                  inst.destroy();
               }
               for (const inst of instances('main', 'bridge')) {
                  inst.destroy();
               }
            } else {
               instance('below', 'bridgeblocker')?.destroy();
               if (SAVE.data.b.svr || world.runaway) {
                  instance('main', 'f_shortsy')?.destroy();
                  instance('main', 'f_longsy')?.destroy();
               }
            }
            if (!roomState.active) {
               roomState.active = true;
               if (SAVE.data.n.plot < 37.11) {
                  let hover = false;
                  let controller = true;
                  const time = renderer.time;
                  const fishShake = new CosmosValue();
                  const fishPosition = new CosmosPoint();
                  await renderer.when(() => player.position.x > 419 && game.room === 'f_prechase' && game.movement);
                  // ensuring MK assets are loaded
                  const kiddLoader = inventories.kiddAssets.load();
                  const tinter = new CosmosValue(0);
                  const fish = character('undyneArmor', characters.undyneArmor, { x: 420, y: 80 }, 'up', {
                     tint: tints.dark02
                  }).on('tick', function () {
                     if (tinter.value !== -1) {
                        this.tint = CosmosImageUtils.gradient(tints.dark02, tints.dark03, tinter.value);
                     }
                  });
                  fishPosition.x = fish.position.x;
                  fishPosition.y = fish.position.y;
                  const fishListener = () => {
                     if (controller) {
                        fish.position = fishPosition.add(
                           (Math.random() - 0.5) * fishShake.value * 2,
                           (Math.random() - 0.5) * fishShake.value * 2
                        );
                     }
                     if (hover) {
                        fish.position.y += CosmosMath.wave(((renderer.time - time) % 1200) / 1200) * 2;
                     }
                  };
                  fish.on('tick', fishListener);
                  game.music?.stop();
                  musicConvolver.value = 0;
                  musicFilter.value = 0;
                  game.movement = false;
                  SAVE.data.n.plot = 37.11;
                  player.face = 'right';
                  const PX = player.position.x;
                  const cam = new CosmosObject({ position: { x: PX, y: 260 } });
                  game.camera = cam;
                  const OGregion = renderer.region[0].y;
                  const kidd = world.genocide
                     ? new CosmosCharacter({ preset: characters.none, key: 'mogus420' })
                     : character(
                          'kidd',
                          characters.kidd,
                          { x: player.position.x + 200, y: player.position.y },
                          'down',
                          {
                             key: 'kidd',
                             tint: tints.dark02
                          }
                       );
                  if (!world.genocide) {
                     await renderer.pause(850);
                     renderer.region[0].y = -1000;
                     cam.position.modulate(renderer, 2000, { x: PX, y: 140 });
                     if (!world.dead_skeleton) {
                        const paps = character('papyrusStark', characters.papyrusStark, { x: 280, y: 80 }, 'right', {
                           tint: tints.dark02
                        });
                        paps.walk(renderer, 2, { x: 340 });
                        await renderer.pause(1350);
                        const premus = music.undynepre.instance(renderer);
                        premus.gain.value /= 8;
                        premus.gain.modulate(renderer, 1000, premus.gain.value * 8);
                        await dialogue('dialoguerBottom', ...text.a_foundry.undyne1a);
                        renderer.pause(350).then(() => {
                           fish.face = 'left';
                        });
                        await renderer.pause(850);
                        await dialogue('dialoguerBottom', ...text.a_foundry.undyne1b);
                        paps.preset = characters.papyrusSpecial;
                        paps.face = 'right';
                        await dialogue('auto', ...text.a_foundry.undyne1c());
                        await renderer.pause(1250);
                        paps.preset = characters.papyrusStark;
                        paps.face = 'down';
                        await dialogue('auto', ...text.a_foundry.undyne1d);
                        await renderer.pause(850);
                        paps.face = 'down';
                        await renderer.pause(450);
                        await dialogue('auto', ...text.a_foundry.undyne1e);
                        paps.face = 'right';
                        await dialogue('auto', ...text.a_foundry.undyne1f());
                        fish.face = 'up';
                        await renderer.pause(750);
                        await dialogue('auto', ...text.a_foundry.undyne1g());
                        paps.walk(renderer, 1, { x: 390 });
                        renderer.pause(850).then(() => {
                           fish.face = 'left';
                        });
                        await dialogue('auto', ...text.a_foundry.undyne1h());
                        fish.face = 'left';
                        await renderer.pause(2150);
                        await dialogue('auto', ...text.a_foundry.undyne1i());
                        world.postnoot && world.nootflags.add('papyrus');
                        paps.face = 'left';
                        await renderer.pause(650);
                        paps.walk(renderer, 2, { x: 200 }).then(() => {
                           renderer.detach('main', paps);
                        });
                        premus.gain.modulate(renderer, 2000, 0).then(() => {
                           premus.stop();
                           content.amUndynepre.unload();
                        });
                        await renderer.pause(850);
                     } else {
                        await renderer.pause(5350);
                        fish.face = 'left';
                        await renderer.pause(1350);
                        fish.face = 'right';
                        await renderer.pause(2350);
                        fish.face = 'up';
                     }
                     cam.position.modulate(renderer, 2000, { x: PX, y: 260 });
                     await kidd.walk(renderer, 4, { x: player.position.x + 21 });
                     characters.kidd.walk.down.enable(5);
                     kidd.face = 'down';
                     await renderer.pause(650);
                     characters.kidd.walk.up.enable(5);
                     kidd.face = 'up';
                     await renderer.pause(650);
                     characters.kidd.walk.right.enable(5);
                     kidd.face = 'right';
                     await renderer.pause(1150);
                     kidd.face = 'left';
                     await dialogue('auto', ...text.a_foundry.undyne1j);
                     renderer.region[0].y = OGregion;
                     game.camera = player;
                  }
                  game.camera = cam;
                  renderer.region[0].y = -1000;
                  await cam.position.modulate(renderer, 400, { x: PX, y: 140 });
                  sounds.notify.instance(renderer);
                  fish.face = 'down';
                  await renderer.pause(650);
                  const fishMusic = music.undyne.instance(renderer);
                  const stepSFX = () => {
                     if (fish.sprite.index % 2 === 1 && fish.sprite.step === 0) {
                        sounds.stomp.instance(renderer).gain.value *= Math.min(fish.position.y, 90) / 90;
                     }
                  };
                  await Promise.all([
                     (async () => {
                        fish.idle = false;
                        fish.on('tick', stepSFX);
                        characters.undyneArmor.walk.down.enable(6);
                        while (fishPosition.y < 115) {
                           await renderer.on('tick');
                           fishPosition.y = Math.min(fishPosition.y + 1, 115);
                        }
                        characters.undyneArmor.walk.down.reset();
                        fish.off('tick', stepSFX);
                        fish.idle = true;
                     })(),
                     world.genocide || dialogue('auto', ...text.a_foundry.undyne1k)
                  ]);
                  await renderer.pause(world.genocide ? 850 : 1850);
                  if (world.genocide) {
                     inventories.kiddAssets.unload();
                     header('x1').then(() => (goatbro.face = 'up'));
                     header('x2').then(() => (fish.face = 'left'));
                     header('x3').then(() => (fish.face = 'down'));
                     header('x4').then(() => (fish.face = 'up'));
                     header('x5').then(() => (fish.face = 'down'));
                     await dialogue('dialoguerBottom', ...text.a_foundry.madfish1());
                     await renderer.pause(850);
                     await dialogue('dialoguerBottom', ...text.a_foundry.madfish2());
                     renderer.pause(1000).then(() => {
                        fishMusic.gain.modulate(renderer, 5000, 0).then(() => {
                           fishMusic.stop();
                           content.amUndyne.unload();
                           musicConvolver.value = rooms.of(game.room).score.reverb;
                           musicFilter.value = rooms.of(game.room).score.filter;
                        });
                     });
                     await renderer.pause(850);
                     fish.face = 'up';
                     await renderer.pause(1150);
                     fish.idle = false;
                     fish.on('tick', stepSFX);
                     characters.undyneArmor.walk.up.enable(4);
                     while (fishPosition.y > 0) {
                        await renderer.on('tick');
                        fishPosition.y = Math.max(fishPosition.y - 2, 0);
                     }
                     characters.undyneArmor.walk.up.reset();
                     fish.off('tick', stepSFX);
                     fish.idle = true;
                     content.asStomp.unload();
                     renderer.detach('main', fish);
                     await renderer.pause(650);
                     await cam.position.modulate(renderer, 2000, { x: PX, y: 260 });
                     renderer.region[0].y = OGregion;
                     game.camera = player;
                     await dialogue('dialoguerBottom', ...text.a_foundry.madfish3());
                     quickresume();
                     game.movement = true;
                  } else {
                     fish.preset = characters.undyneArmorJetpack;
                     sounds.noise.instance(renderer);
                     const flame = sounds.jetpack.instance(renderer);
                     flame.gain.value *= 0.4;
                     await fishShake.modulate(renderer, 350, 1);
                     hover = true;
                     renderer.pause(400).then(() => {
                        fishShake.modulate(renderer, 700, 0);
                     });
                     tinter.modulate(renderer, 800, 0, 1, 1);
                     fishPosition
                        .modulate(renderer, 800, {}, { y: fishPosition.y - 10 }, { y: fishPosition.y - 10 })
                        .then(async () => {
                           await renderer.pause(1650);
                           fish.alpha.value = 0;
                           const spearFish = new CosmosAnimation({
                              active: true,
                              alpha: 0.7,
                              anchor: { x: 0, y: 1 },
                              resources: content.iocUndyneDownArmorSpear
                           }).on('tick', function () {
                              this.position = fish.position.clone();
                           });
                           renderer.attach('main', spearFish);
                           await renderer.when(() => player.position.x > fish.position.x + 320);
                           renderer.detach('main', spearFish);
                           content.iocUndyneDownArmorSpear.unload();
                           sounds.noise.instance(renderer).gain.value *= 0.1;
                           flame.gain.modulate(renderer, 0, 0);
                           await renderer.pause(1150);
                           sounds.stomp.instance(renderer).gain.value *= 0.6 * 0.1;
                           shake(1, 500);
                        });
                     await renderer.pause(450);
                     dialogue('auto', ...text.a_foundry.undyne1l);
                     await cam.position.modulate(renderer, 1000, { x: PX, y: 260 });
                     renderer.region[0].y = OGregion;
                     game.camera = player;
                     const raftblock = new CosmosHitbox({
                        anchor: 1,
                        position: { x: -10 },
                        size: 20
                     });
                     const platform = new CosmosSprite({
                        position: { x: 250 + 360, y: 130 + 140 },
                        anchor: { x: 0, y: 1 },
                        priority: -18937659153,
                        frames: [ content.iooFRaft ],
                        objects: [ raftblock ]
                     });
                     renderer.attach('main', platform);
                     await Promise.all([
                        player.walk(renderer, 3, { x: 605, y: 260 }),
                        kidd.walk(renderer, 4, { x: 615, y: 260 })
                     ]);
                     SAVE.data.n.plot = 37.2;
                     renderer.pause(3000).then(() => {
                        flame.gain.modulate(renderer, 5000, 0);
                        fishMusic.gain.modulate(renderer, 5000, 0).then(() => {
                           fishMusic.stop();
                        });
                     });
                     renderer.region[1].x = 1260;
                     await Promise.all([
                        player.position.step(renderer, 3, { x: 885 + 360 }),
                        platform.position.step(renderer, 3, { x: 890 + 360 }),
                        kidd.position.step(renderer, 3, { x: 895 + 360 })
                     ]);
                     await kidd.walk(
                        renderer,
                        2,
                        { x: kidd.position.x + 20 },
                        { x: kidd.position.x + 20, y: kidd.position.y - 10 }
                     );
                     kidd.face = 'down';
                     await dialogue('auto', ...text.a_foundry.undyne1m);
                     await renderer.pause(1000);
                     await dialogue('auto', ...text.a_foundry.undyne1n);
                     const base = player.position.x;
                     renderer
                        .when(() => player.position.x > base + 25)
                        .then(async () => {
                           await Promise.race([ events.on('teleport'), platform.position.step(renderer, 3, { x: 0 }) ]);
                           renderer.detach('main', platform);
                        });
                     await player.walk(renderer, 3, { x: kidd.position.x + 21 });
                     await kidd.walk(renderer, 3, { y: player.position.y });
                     await renderer.pause(650);
                     kidd.face = 'left';
                     await renderer.pause(1250);
                     kidd.face = 'right';
                     await dialogue('auto', ...text.a_foundry.undyne1o);
                     renderer.detach('main', kidd);
                     renderer.attach('main', kiddo);
                     kiddo.position.set(kidd);
                     kiddo.face = 'right';
                     tracker.supplant('right');
                     raftblock.metadata.barrier = true;
                     game.movement = true;
                     game.menu = false;
                     quickresume();
                     await renderer.when(() => player.position.x > 1360 && game.movement);
                     game.music?.stop();
                     musicConvolver.value = 0;
                     musicFilter.value = 0;
                     game.movement = false;
                     player.face = 'right';
                     await dialogue('auto', ...text.a_foundry.undyne1p);
                     cam.position.set(player.position.clamp(...renderer.region));
                     renderer.region[1].x = Infinity;
                     game.camera = cam;
                     renderer.attach('main', fish);
                     fishPosition.set({ x: 1470, y: 260 });
                     fish.face = 'right';
                     fish.preset = characters.undyneArmorJetpack;
                     fish.tint = tints.dark03;
                     fish.alpha.value = 0;
                     await cam.position.modulate(renderer, 400, { x: 1340 });
                     await renderer.pause(250);
                     fish.alpha.modulate(renderer, 450, 1);
                     flame.gain.modulate(renderer, 450, flame.daemon.gain * 0.4);
                     sounds.fear.instance(renderer);
                     await renderer.pause(1000);
                     const runMusic = music.undynefast.instance(renderer);
                     await renderer.pause(1650);
                     await dialogue('auto', ...text.a_foundry.undyne1q);
                     game.movement = true;
                     world.cutscene_override = true;
                     await events.on('teleport');
                     renderer.detach('main', fish);
                     flame.stop();
                     game.camera = player;
                     game.movement = false;
                     teleporter.movement = false;
                     await renderer.pause(1250);
                     await dialogue('auto', ...text.a_foundry.undyne1r);
                     game.movement = true;
                     await renderer.when(() => game.room === 'f_entrance' && player.position.x > 220 && game.movement);
                     game.movement = false;
                     player.face = 'right';
                     fishPosition.x = 280;
                     fishPosition.y = player.position.y - 160;
                     fish.alpha.value = 1;
                     tinter.value = -1;
                     fish.tint = void 0;
                     renderer.attach('main', fish);
                     fish.on('tick', () => void foundryScript('tick'));
                     await dialogue('auto', ...text.a_foundry.undyne1s);
                     await player.walk(renderer, 3, { x: 400, y: 120 });
                     kiddo.metadata.override = true;
                     kiddo.walk(renderer, 3, { x: 400 });

                     // fade out music & restore score
                     runMusic.gain.modulate(renderer, 5000, 0).then(() => {
                        runMusic.stop();
                     });

                     // fish stops being mad
                     await renderer.pause(1350);
                     fish.face = 'down';
                     await fishShake.modulate(renderer, 1000, 0);
                     renderer
                        .when(() => fish.position.y > player.position.y - 15)
                        .then(() => {
                           fish.preset = characters.undyneArmor;
                           sounds.noise.instance(renderer);
                        });
                     await fishPosition.modulate(
                        renderer,
                        1150,
                        fishPosition.value(),
                        { y: player.position.y },
                        { y: player.position.y }
                     );
                     hover = false;
                     sounds.stomp.instance(renderer).gain.value *= 0.6;
                     shake(1.25, 500);
                     await renderer.pause(650);

                     // fish walks towards player
                     const stepSFX = () => {
                        if (fish.sprite.index % 2 === 0 && fish.sprite.step === 0) {
                           sounds.stomp.instance(renderer).gain.value *= CosmosMath.remap(
                              fish.position.x,
                              0,
                              1,
                              120,
                              400
                           );
                        }
                     };

                     // walk towards player X
                     fish.face = 'right';
                     fish.idle = false;
                     fish.on('tick', stepSFX);
                     characters.undyneArmor.walk.right.duration = 6;
                     characters.undyneArmor.walk.right.enable();
                     while (fishPosition.x < kiddo.position.x - 19) {
                        await renderer.on('tick');
                        fishPosition.x = Math.min(fishPosition.x + 1, kiddo.position.x - 19);
                     }
                     characters.undyneArmor.walk.right.reset();
                     fish.off('tick', stepSFX);
                     fish.idle = true;

                     // fish grabs the... oh wait it's monster kid
                     await renderer.pause(2150);
                     fish.alpha.value = 0;
                     const touchie = new CosmosAnimation({
                        active: true,
                        anchor: { x: 0, y: 1 },
                        priority: 121,
                        position: fish.position.value(),
                        resources: content.iocUndyneGrabKidd
                     });
                     renderer.attach('main', touchie);
                     renderer
                        .when(() => touchie.index === 1)
                        .then(() => {
                           sounds.grab.instance(renderer);
                        });
                     await renderer.when(() => touchie.index === 29);
                     renderer.detach('main', touchie);
                     fish.alpha.value = 1;
                     await renderer.pause(850);
                     fish.face = 'left';
                     await renderer.pause(1350);
                     controller = false;

                     // the fish ran away
                     characters.undyneArmor.walk.left.duration = 4;
                     characters.undyneArmor.walk.left.step = 1;
                     fish.on('tick', stepSFX);
                     await fish.walk(renderer, 2, { x: 120 });
                     fish.off('tick', stepSFX);
                     characters.undyneArmor.walk.left.reset();
                     fish.alpha.value = 0;

                     // script end... just KIDding it's monster KID!!
                     await kiddo.walk(renderer, 4, { x: 500 });
                     await tripper(kiddo);
                     await renderer.pause(500);
                     kiddo.face = 'left';
                     await renderer.pause(500);
                     kiddo.face = 'up';
                     await renderer.pause(500);
                     kiddo.face = 'down';
                     await renderer.pause(1150);
                     await dialogue('auto', ...text.a_foundry.undyne2a);
                     await renderer.pause(850);
                     kiddo.face = 'left';
                     await renderer.pause(1150);
                     await dialogue('auto', ...text.a_foundry.undyne2b);
                     await player.walk(renderer, 3, kiddo.position.subtract(21, 0));
                     await renderer.pause(1000);
                     await dialogue('auto', ...text.a_foundry.undyne2c);
                     await kiddo.walk(renderer, 2, player.position.add(0, 14), player.position.subtract(21, 0));
                     await renderer.pause(350);
                     kiddo.face = 'right';
                     await antifreeze([ kiddLoader, renderer.pause(850) ]);
                     await dialogue('auto', ...text.a_foundry.undyne2d);
                     player.face = 'right';
                     kiddo.metadata.override = false;
                     tracker.supplant('right');

                     // restore game music
                     quickresume();

                     // script end (for real this time)
                     renderer.detach('main', fish);
                     world.cutscene_override = false;
                     SAVE.data.n.plot = 38.01;
                     game.movement = true;
                     game.menu = true;
                  }
               }
            }
            break;
         }
         case 'f_spear': {
            let sh = 0;
            const LIM = SAVE.data.n.plot > 45 || world.genocide ? 0 : 12;
            roomState.phaser ??= 0;
            if (player.position.y < 100) {
               roomState.phaser = 0;
            } else if (player.position.y > 300) {
               roomState.phaser = LIM;
            } else if (player.position.y < 120) {
               if (roomState.phaser > 0) {
                  roomState.phaser--;
                  sh = 160;
               }
            } else if (player.position.y > 280) {
               if (roomState.phaser < LIM) {
                  roomState.phaser++;
                  sh = -160;
               }
            }
            if (sh) {
               player.position.y += sh;
               player.metadata.y += sh;
               for (const entry of tracker.history) {
                  entry[1].y += sh;
               }
               for (const obj of renderer.layers.main.objects) {
                  if (obj.metadata.shiftable) {
                     obj.position.y += sh;
                  }
               }
            }
            break;
         }
         case 'f_entrance': {
            let snd = true;
            for (const tallgrass of instances('main', 'tallgrass')) {
               const obby = tallgrass.object;
               const anim = obby.objects.filter(subobby => subobby instanceof CosmosAnimation)[0] as CosmosAnimation;
               const contact = [ player, ...fetchCharacters() ]
                  .map(
                     susser =>
                        susser.position.y > obby.position.y - 10 &&
                        susser.position.y < obby.position.y + 5 &&
                        Math.abs(obby.position.x - susser.position.x) < 25
                  )
                  .includes(true);
               if (contact && anim.index === 0) {
                  if (snd) {
                     snd = false;
                     sounds.rustle.instance(renderer);
                  }
                  anim.index = 1;
               } else if (!contact && anim.index === 1) {
                  anim.index = 0;
               }
            }
            if (!roomState.meetMK) {
               roomState.meetMK = true;
               if (world.genocide && SAVE.data.n.plot < 38.01) {
                  await renderer.when(() => game.room === 'f_entrance' && player.position.x > 100 && game.movement);
                  if (38.01 <= SAVE.data.n.plot) {
                     return;
                  }
                  // ensuring MK assets are loaded
                  const kiddLoader = inventories.kiddAssets.load();
                  game.movement = false;
                  SAVE.data.n.plot = 38.01;
                  player.face = 'right';
                  kiddo.position.set(340, player.position.y);
                  kiddo.metadata.override = true;
                  kiddo.face = 'left';
                  renderer.attach('main', kiddo);
                  goatbro.metadata.override = true;
                  goatbro.walk(renderer, 3, player.position.subtract(21, 0)).then(() => {
                     goatbro.face = 'right';
                  });
                  await kiddo.walk(renderer, 4, { x: player.position.x + 160 });
                  await tripper(kiddo, content.iocKiddLeftTrip);
                  await kiddo.walk(renderer, 4, { x: player.position.x + 21 });
                  await dialogue('auto', ...text.a_foundry.undyne2ax());
                  await kiddo.walk(
                     renderer,
                     2,
                     { x: goatbro.position.x - 7, y: player.position.y + (player.position.y > 120 ? -14 : 14) },
                     goatbro.position.subtract(21, 0)
                  );
                  kiddo.face = 'right';
                  kiddo.position = kiddo.position;
                  tracker.supplant('right');
                  kiddo.metadata.override = false;
                  goatbro.metadata.override = false;
                  await antifreeze([ kiddLoader, renderer.pause(1250) ]);
                  await dialogue('auto', ...text.a_foundry.undyne2bx);
                  game.movement = true;
                  await renderer.when(() => game.room === 'f_entrance' && player.position.x > 280 && game.movement);
                  await dialogue('auto', ...text.a_foundry.undyne2cx);
                  await renderer.when(() => game.room === 'f_entrance' && player.position.x > 520 && game.movement);
                  await dialogue('auto', ...text.a_foundry.undyne2dx());
                  await renderer.when(() => game.room === 'f_lobby' && player.position.y > 120 && game.movement);
                  await dialogue('auto', ...text.a_foundry.undyne2ex);
               }
            }
            break;
         }
         case 'f_stand': {
            (SAVE.data.b.svr ||
               48 <= SAVE.data.n.plot ||
               world.genocide ||
               world.population < 6 ||
               roomKills().f_stand > 0) &&
               instance('main', 'f_shortsy')?.destroy();
            (SAVE.data.b.svr ||
               48 <= SAVE.data.n.plot ||
               world.genocide ||
               world.population < 6 ||
               roomKills().f_stand > 0) &&
               instance('main', 'f_longsy')?.destroy();
            break;
         }
         case 'f_telescope': {
            (SAVE.data.b.svr ||
               world.runaway ||
               world.genocide ||
               (world.population < 6 && !world.bullied) ||
               roomKills().f_telescope > 1) &&
               instance('main', 'f_starkiller')?.destroy();
            if (!roomState.active) {
               roomState.active = true;
               if (world.genocide && SAVE.data.n.plot < 38.1) {
                  await renderer.when(() => game.room === 'f_telescope' && player.position.x > 300 && game.movement);
                  if (
                     38.1 <= SAVE.data.n.plot ||
                     roomState.isweartogodifthisvariabledoesntstopthefuckingexecutionimgonnascrea
                  ) {
                     return;
                  }
                  roomState.isweartogodifthisvariabledoesntstopthefuckingexecutionimgonnascrea = true;
                  game.movement = false;
                  player.face = 'right';
                  await dialogue('auto', ...text.a_foundry.genotext.asriel34x);
                  game.movement = false;
                  goatbro.metadata.override = true;
                  await goatbro.walk(renderer, 3, player.position.add(0, player.position.y > 140 ? -21 : 21), {
                     x: 380
                  });
                  game.movement = false;
                  await renderer.pause(450);
                  game.movement = false;
                  goatbro.face = 'left';
                  await renderer.pause(850);
                  game.movement = false;
                  kiddo.metadata.override = true;
                  SAVE.data.n.plot = 38.1;
                  await dialogue('auto', ...text.a_foundry.genotext.asriel34);
                  game.movement = false;
                  await goatbro.walk(renderer, 3, { x: 440, y: 140 });
                  game.movement = false;
                  renderer.detach('main', goatbro);
                  await Promise.all([
                     dialogue('auto', ...text.a_foundry.genotext.kidd1),
                     kiddo.walk(renderer, 2, { x: player.position.x - 21 }, { y: player.position.y }).then(() => {
                        tracker.supplant('right');
                     })
                  ]);
                  kiddo.metadata.override = false;
                  game.movement = true;
                  SAVE.data.n.steps = 0;
                  SAVE.data.n.encounters = 1;
               }
            }
            if (!roomState.sandy && roomKills().f_telescope < 1) {
               roomState.sandy = true;
               if (SAVE.data.n.plot < 39 && !world.edgy_xxx && !world.dead_skeleton) {
                  const sand = character('sans', characters.sans, { x: 135, y: 105 }, 'down', {
                     anchor: { x: 0, y: 1 },
                     size: { x: 25, y: 5 },
                     metadata: {
                        interact: true,
                        barrier: true,
                        name: 'foundry',
                        args: [ 'sandinter' ],
                        tags: [ 'telescoper' ]
                     }
                  }).on('tick', function () {
                     if (this.talk) {
                        this.face = ultimaFacer(this);
                     } else {
                        this.face = 'down';
                     }
                  });
                  await events.on('teleport');
                  roomState.sandy = false;
                  renderer.detach('main', sand);
               }
            }
            break;
         }
         case 'f_bird': {
            if (SAVE.data.n.plot !== 47.2) {
               if (!roomState.active) {
                  roomState.active = true;
                  if (!SAVE.data.b.f_state_kidd_bird && SAVE.data.n.plot < 42 && world.kiddo) {
                     await renderer.when(() => game.room === 'f_bird' && player.position.x > 135 && game.movement);
                     if (!SAVE.data.b.f_state_kidd_bird && SAVE.data.n.plot < 42) {
                        SAVE.data.b.f_state_kidd_bird = true;
                        await dialogue('auto', ...text.a_foundry.walktext.bird());
                     }
                  }
               }
               if (SAVE.data.n.plot > 42 && !roomState.subercheck) {
                  roomState.subercheck = true;
                  if (!SAVE.data.b.f_state_narrator_bird && world.genocide) {
                     await renderer.when(() => game.room === 'f_bird' && player.position.x < 1365 && game.movement);
                     if (!SAVE.data.b.f_state_narrator_bird) {
                        game.movement = false;
                        SAVE.data.b.f_state_narrator_bird = true;
                        await renderer.pause(1000);
                        await dialogue('auto', ...text.a_foundry.walktext.birdx);
                        game.movement = true;
                     }
                  }
               }
            }
            break;
         }
         case 'f_lobby': {
            SAVE.data.b.item_boots && instance('main', 'f_booties')?.destroy();
            break;
         }
         case 'f_undyne': {
            2 <= SAVE.data.n.plot_date && destroyHouse();
            despawnDummy();
            if (!roomState.comcheck && world.goatbro && world.kiddo) {
               roomState.comcheck = true;
               await renderer.when(() => game.movement);
               if (!SAVE.data.b.f_state_kidd_undynecom && world.genocide && world.kiddo) {
                  SAVE.data.b.f_state_kidd_undynecom = true;
                  await dialogue('auto', ...text.a_foundry.walktext.undynecom);
               }
            }
            break;
         }
         case 'f_village': {
            if (temgone()) {
               instance('main', 'f_genohole')!.object.position.y = 0;
               instance('main', 'f_temmie1')?.destroy();
               instance('main', 'f_temmie2')?.destroy();
               instance('main', 'f_temmie3')?.destroy();
               instance('main', 'f_temmie4')?.destroy();
               instance('main', 'f_temmie5')?.destroy();
               instance('main', 'f_temmie6')?.destroy();
               instance('main', 'f_temmie7')?.destroy();
               instance('main', 'f_eggo')?.destroy();
               instance('main', 'f_mushroomdance')?.destroy();
            } else {
               instance('main', 'f_genohole')!.object.position.y = -140;
            }
            break;
         }
         case 'f_exit': {
            if (!roomState.active) {
               roomState.active = true;
               if (!world.genocide && SAVE.data.n.plot < 48) {
                  renderer.detach('main', erndyne);
                  await renderer.when(() => game.movement);
                  game.movement = false;
                  await player.walk(renderer, 3, { x: 160, y: 100 });
                  const filter = filters.glow;
                  const shaker = new CosmosValue();
                  let soundreduce = false;
                  const key = SAVE.data.n.state_starton_papyrus === 1 ? 'undyneStoic' : 'undyne';
                  const finalfish = character(key, characters[key], { x: -20, y: 100 }, 'right', {
                     area: renderer.area,
                     filters: [ filter ]
                  }).on('tick', {
                     priority: Infinity,
                     listener () {
                        filter.innerStrength = shaker.value / 4;
                        filter.outerStrength = shaker.value;
                        this.sprite.duration = 8;
                        if (!this.talk && this.sprite.index % 2 === 1 && this.sprite.step === 0) {
                           const st = sounds.stomp.instance(renderer);
                           if (soundreduce) {
                              st.gain.value *= Math.min(Math.max((finalfish.position.x + 15) / 70, 0), 1);
                           }
                        }
                     }
                  });
                  let yee = false;
                  let basepos = finalfish.position.x;
                  finalfish.on('tick', () => {
                     yee && (finalfish.position.x = basepos + (Math.random() * 2 - 1) * shaker.value);
                  });
                  await finalfish.walk(renderer, 2, { x: 40 });
                  basepos = finalfish.position.x;
                  yee = true;
                  await shaker.modulate(renderer, 1500, 2, 0);
                  yee = false;
                  await renderer.pause(1000);
                  await dialogue('auto', ...text.a_foundry.finalfish1);
                  await renderer.pause(1000);
                  await finalfish.walk(renderer, 1, { x: 60 });
                  await dialogue('auto', ...text.a_foundry.finalfish2);
                  basepos = finalfish.position.x;
                  yee = true;
                  await shaker.modulate(renderer, 500, 2, 2);
                  yee = false;
                  renderer.detach('main', finalfish);
                  shaker.value = 0;
                  const fallenfish = new CosmosSprite({
                     anchor: { x: 0, y: 1 },
                     frames: [ content.iocUndyneFallen ]
                  });
                  const fallencontainer = new CosmosHitbox({
                     objects: [ fallenfish ],
                     anchor: 0,
                     position: { x: 60, y: 100 },
                     size: { x: 69, y: 40 },
                     metadata: { trigger: true, name: 'foundry', args: [ 'fallenfish' ] }
                  });
                  renderer.attach('main', fallencontainer);
                  game.menu = false;
                  game.interact = true;
                  game.movement = true;
                  dropShake(fallenfish.position);
                  const vow = (roomState.water = new Vow());
                  await Promise.race([ events.on('teleport'), vow ]);
                  SAVE.data.n.plot = 48;
                  if (game.room === 'f_exit') {
                     await waterpour();
                     await renderer.pause(250);
                     {
                        const base = fallenfish.position.x;
                        fallenfish.position.x = base + 1;
                        await renderer.pause(66);
                        fallenfish.position.x = base - 2;
                        await renderer.pause(66);
                        fallenfish.position.x = base + 3;
                        await renderer.pause(66);
                        fallenfish.position.x = base - 3;
                        await renderer.pause(66);
                        fallenfish.position.x = base;
                     }
                     renderer.detach('main', fallencontainer);
                     sounds.noise.instance(renderer);
                     shaker.value = 2;
                     renderer.attach('main', finalfish);
                     await shaker.modulate(renderer, 500, 0, 0);
                     await renderer.pause(2250);
                     finalfish.face = 'left';
                     await renderer.pause(1250);
                     finalfish.face = 'down';
                     await renderer.pause(1750);
                     finalfish.face = 'up';
                     await renderer.pause(2250);
                     soundreduce = true;
                     renderer.detach('main', finalfish);
                     let hover = false;
                     const a = new CosmosValue();
                     const time = renderer.time;
                     const fishShake = new CosmosValue();
                     const fishPosition = finalfish.position.clone();
                     const finalfish2 = new CosmosAnimation({
                        active: true,
                        anchor: { x: 0, y: 1 },
                        resources: content.iocUndyneUpJetpack
                     }).on('tick', function () {
                        this.position = fishPosition.add(
                           (Math.random() - 0.5) * fishShake.value * 2,
                           (Math.random() - 0.5) * fishShake.value * 2
                        );
                        if (hover) {
                           this.position.y += CosmosMath.remap(
                              a.value,
                              0,
                              CosmosMath.wave(((renderer.time - time) % 1200) / 1200) * 2
                           );
                        }
                     });
                     renderer.attach('main', finalfish2);
                     sounds.noise.instance(renderer);
                     const flame = sounds.jetpack.instance(renderer);
                     flame.gain.value *= 0.4;
                     await renderer.pause(1100);
                     await fishShake.modulate(renderer, 350, 1);
                     hover = true;
                     a.modulate(renderer, 1000, 1);
                     renderer.pause(400).then(() => {
                        fishShake.modulate(renderer, 700, 0);
                     });
                     flame.gain.modulate(renderer, 3200, flame.gain.value, 0).then(() => {
                        flame.stop();
                     });
                     await fishPosition.modulate(renderer, 1800, {}, { y: -60 });
                     await renderer.pause(1000);
                     renderer.detach('main', finalfish2);
                     if (!SAVE.data.b.oops) {
                        await dialogue('auto', ...text.a_foundry.truetext.undyne1);
                     }
                     game.movement = true;
                     game.menu = true;
                  } else {
                     renderer.detach('main', fallencontainer);
                     SAVE.data.n.state_foundry_undyne = 1;
                     game.menu = true;
                  }
                  eggoAssets.unload();
               }
            }
            break;
         }
         case 'f_battle': {
            let sh = 0;
            const LIM = SAVE.data.n.undyne_phase < 3 && SAVE.data.n.plot < 48 ? 12 : 0;
            roomState.phaser ??= 0;
            if (player.position.x < 960) {
               roomState.phaser = 0;
            } else if (player.position.x > 1020) {
               roomState.phaser = LIM;
            } else if (player.position.x < 980) {
               if (roomState.phaser > 0) {
                  roomState.phaser--;
                  sh = 20;
               }
            } else if (player.position.x > 1000) {
               if (roomState.phaser < LIM) {
                  roomState.phaser++;
                  sh = -20;
               }
            }
            if (sh) {
               player.position.x += sh;
               player.metadata.x += sh;
               for (const entry of tracker.history) {
                  entry[1].x += sh;
               }
               erndyne.position.x += sh;
               const feesh = instance('main', 'feesh');
               if (feesh) {
                  feesh.object.position.x += sh;
               }
            }
            break;
         }
      }
   } else {
      const scriptState = foundryStates.scripts[subscript] || (foundryStates.scripts[subscript] = {});
      switch (subscript) {
         case 'quicksolve': {
            if (!game.movement) {
               return;
            }
            game.movement = false;
            if (45 <= SAVE.data.n.plot) {
               await dialogue('auto', ...text.a_foundry.quicksolve3());
               game.movement = true;
               return;
            }
            await dialogue('auto', ...text.a_foundry.quicksolve4);
            if (!SAVE.data.b.f_state_password) {
               await dialogue('auto', ...text.a_foundry.quicksolve5);
               game.movement = true;
               return;
            }
            await dialogue('auto', ...text.a_foundry.quicksolve6());
            if (choicer.result === 1) {
               await dialogue('auto', ...text.a_foundry.quicksolve7);
               game.movement = true;
               return;
            }
            SAVE.data.b.f_state_quicksolve = true;
            SAVE.data.n.plot = 45;
            sounds.pathway.instance(renderer);
            shake(2, 1000);
            await renderer.pause(1650);
            await dialogue('auto', ...text.a_foundry.quicksolve8);
            game.movement = true;
            break;
         }
         case 'escape': {
            if (!game.movement) {
               return;
            }
            if (helmetdyne() && SAVE.data.n.plot < 47.1) {
               SAVE.data.n.plot = 47.1;
               sounds.phone.instance(renderer);
               await dialogue('auto', ...text.a_foundry.escape);
            } else if (world.genocide && SAVE.data.n.plot < 47.1) {
               SAVE.data.n.plot = 47.1;
               await dialogue('auto', ...text.a_foundry.genotext.kiddFinal3());
            }
            break;
         }
         case 'mazetrap': {
            if (game.movement && SAVE.data.n.plot < 38.01) {
               const mazetrap = instance('below', 'mazetrap');
               if (mazetrap) {
                  for (const [ ind, obj ] of mazetrap.object.objects.entries()) {
                     if (player.detect(obj as CosmosHitbox)) {
                        const traps = CosmosUtils.parse<number[]>(SAVE.data.s.state_foundry_f_chaseTrap, []);
                        if (!traps.includes(ind)) {
                           traps.push(ind);
                           SAVE.data.s.state_foundry_f_chaseTrap = CosmosUtils.serialize(traps);
                           const pos = obj.position;
                           stabbie(false, pos, pos.add(0, 20), pos.add(20, 0), pos.add(20, 20));
                        }
                        break;
                     }
                  }
               }
            }
            break;
         }
         case 'npc': {
            if (!game.movement) {
               break;
            }
            const inst = instance('main', args[0]);
            if (inst) {
               const anim = inst.object.objects.filter(obj => obj instanceof CosmosAnimation)[0] as CosmosAnimation;
               const resources = anim.resources;
               if (args[0] === 'f_clamgirl') {
                  anim.use(content.ionFClamgirl2);
               } else if (args[0].startsWith('f_temmie')) {
                  const centerX = inst.object.position.x + anim.anchor.x * (anim.compute().x / -2);
                  if (Math.abs(player.position.x - centerX) < 3) {
                     anim.use(
                        resources === content.iocTemmieLeft ? content.iocTemmieLeftTalk : content.iocTemmieRightTalk
                     );
                  } else {
                     anim.use(player.position.x < centerX ? content.iocTemmieLeftTalk : content.iocTemmieRightTalk);
                  }
               }
               await inst.talk(
                  'a',
                  talkFinder(),
                  'auto',
                  ...CosmosUtils.provide(text.a_foundry.npcinter[args[0] as keyof typeof text.a_foundry.npcinter])
               );
               (args[0] === 'f_clamgirl' || args[0].startsWith('f_temmie')) && anim.use(resources);
            }
            break;
         }
         case 'spookydate': {
            if (player.face !== 'up' || !game.movement) {
               if (player.position.y <= 90) {
                  await dialogue('auto', ...text.a_foundry.spookydate0y);
               } else {
                  await dialogue('auto', ...text.a_foundry.spookydate0z);
               }
               break;
            }
            game.movement = false;
            if (world.edgy_x) {
               await dialogue('auto', ...text.a_foundry.spookydate0x());
            } else if (SAVE.data.n.plot < 33) {
               await dialogue('auto', ...text.a_foundry.spookydate1());
               await dialogue('auto', ...[ text.a_foundry.spookydate2a, text.a_foundry.spookydate2b ][choicer.result]());
               if (choicer.result === 0) {
                  const rimshotLoader = content.asRimshot.load();
                  const whoopeeLoader = content.asWhoopee.load();
                  const premonitionLoader = content.amSpookydate.load();
                  const stoolAssets = new CosmosInventory(
                     content.iocSansStool,
                     content.iocSansStoolComb,
                     content.iocSansStoolLeft,
                     content.iocSansStoolRight,
                     content.iocSansStoolScratch,
                     content.iocSansDownTomato,
                     content.iocSansLeftTomato,
                     content.idcSansWinkTomato,
                     content.idcSansBlinkTomato,
                     content.iooSKetch
                  );
                  const grillbyAssets = new CosmosInventory(
                     content.iocGrillbyUp,
                     content.asDephase,
                     content.asPhase,
                     content.iocGrillbyDown
                  );
                  stoolAssets.name = 'stoolAssets';
                  grillbyAssets.name = 'grillbyAssets';
                  const stoolLoader = stoolAssets.load();
                  const grillbyLoader = grillbyAssets.load();
                  const elevatorMachineLoader = content.asLongElevator.load();
                  const roomSans = roomState.sand as CosmosCharacter;
                  await roomSans.walk(renderer, 3, { x: 200 }, { y: 160 }, { x: 280 });
                  roomSans.face = 'left';
                  await renderer.pause(850);
                  await dialogue('auto', ...text.a_foundry.spookydate3);
                  await Promise.all([
                     roomSans.walk(renderer, 3, { x: 340 }, { y: 280 }),
                     player.walk(renderer, 3, { y: 160 }, { x: 340 }, { y: 240 })
                  ]);
                  await teleport('s_grillbys', 'up', 177.5, 230, world);
                  const sand = character('sans', characters.sans, { x: 177.5, y: 200 }, 'down');
                  await renderer.pause(1000);
                  await dialogue('auto', ...text.a_foundry.spookydate4);
                  sand.face = 'up';
                  await dialogue('auto', ...text.a_foundry.spookydate5);
                  await sand.walk(renderer, 3, { y: 200, x: 156.5 });
                  if (SAVE.data.n.state_starton_dogs === 2 || world.population < 2) {
                     await renderer.pause(450);
                  } else {
                     const dogamy = instance('main', 'g_dogamy')!.object.objects[0] as CosmosAnimation;
                     const dogaressa = instance('main', 'g_dogaressa')!.object.objects[0] as CosmosAnimation;
                     speech.targets.add(dogamy);
                     header('x1').then(() => {
                        speech.targets.delete(dogamy);
                        dogamy.reset();
                        speech.targets.add(dogaressa);
                     });
                     await dialogue('auto', ...text.a_foundry.spookydate7);
                     speech.targets.delete(dogaressa);
                     dogaressa.reset();
                  }
                  await sand.walk(renderer, 3, { x: 213.5 });
                  if (world.population < 4) {
                     await renderer.pause(450);
                  } else {
                     const bunbun = instance('main', 'g_bunbun')!.object.objects[0] as CosmosAnimation;
                     const bigmouth = instance('main', 'g_bigmouth')!.object.objects[0] as CosmosAnimation;
                     speech.targets.add(bigmouth);
                     header('x1').then(() => {
                        speech.targets.delete(bigmouth);
                        bigmouth.reset();
                        speech.targets.add(bunbun);
                     });
                     await dialogue('auto', ...text.a_foundry.spookydate6);
                     speech.targets.delete(bunbun);
                     bunbun.reset();
                  }
                  await sand.walk(renderer, 3, { y: 130 });
                  if (world.population < 2) {
                     await renderer.pause(650);
                     sand.face = 'left';
                     await renderer.pause(1350);
                     await dialogue('dialoguerBottom', ...text.a_foundry.spookydate9x);
                     await instance('main', 'g_redbird')?.talk(
                        'a',
                        talkFinder(),
                        'dialoguerBottom',
                        ...CosmosUtils.provide(text.a_foundry.spookydate9y)
                     );
                     await dialogue('dialoguerBottom', ...text.a_foundry.spookydate9z);
                     await renderer.pause(1250);
                  } else if (world.population < 6) {
                     await renderer.pause(850);
                  } else {
                     sand.face = 'left';
                     const beautifulfish = instance('main', 'g_beautifulfish')!.object.objects[0] as CosmosAnimation;
                     speech.targets.add(beautifulfish);
                     await dialogue('dialoguerBottom', ...text.a_foundry.spookydate8);
                     speech.targets.delete(beautifulfish);
                     await rimshotLoader;
                     await dialogue('dialoguerBottom', ...text.a_foundry.spookydate9);
                     sand.preset = characters.sansSpecial;
                     sand.face = 'down';
                     const NPCs = [
                        beautifulfish,
                        instance('main', 'g_bunbun')!.object.objects[0] as CosmosAnimation,
                        instance('main', 'g_bigmouth')!.object.objects[0] as CosmosAnimation,
                        ...(SAVE.data.n.state_starton_dogs === 2
                           ? []
                           : [
                                instance('main', 'g_dogamy')!.object.objects[0] as CosmosAnimation,
                                instance('main', 'g_dogaressa')!.object.objects[0] as CosmosAnimation
                             ])
                     ];
                     for (const guy of NPCs) {
                        guy.duration = 2;
                        guy.enable();
                     }
                     const rimmer = sounds.rimshot.instance(renderer);
                     await renderer.pause(3000);
                     rimmer.stop();
                     for (const guy of NPCs) {
                        guy.reset();
                     }
                     sand.preset = characters.sans;
                  }
                  content.asRimshot.unload();
                  await stoolLoader;
                  await dialogue('auto', ...text.a_foundry.spookydate10);
                  let mode = 0;
                  const sr = new CosmosAnimation({
                     anchor: { y: 1 },
                     position: { x: 200, y: 116 },
                     resources: content.iocSansStoolRight
                  }).on('tick', function () {
                     this.alpha.value = mode === 4 ? 1 : 0;
                  });
                  const stoolsand = new CosmosObject({
                     priority: 10000,
                     objects: [
                        new CosmosSprite({
                           anchor: { y: 1 },
                           position: { x: 200, y: 116 },
                           frames: [ content.iocSansStool ]
                        }).on('tick', function () {
                           this.alpha.value = mode === 0 ? 1 : 0;
                        }),
                        new CosmosSprite({
                           anchor: { y: 1 },
                           position: { x: 200, y: 116 },
                           frames: [ content.iocSansStoolLeft ]
                        }).on('tick', function () {
                           this.alpha.value = mode === 1 ? 1 : 0;
                        }),
                        new CosmosAnimation({
                           anchor: { y: 1 },
                           position: { x: 200, y: 116 },
                           resources: content.iocSansStoolComb
                        }).on('tick', function () {
                           this.alpha.value = mode === 2 ? 1 : 0;
                           if (mode === 2 && !this.active) {
                              this.enable();
                           } else if (mode !== 2 && this.active) {
                              this.reset();
                           }
                        }),
                        new CosmosAnimation({
                           anchor: { y: 1 },
                           position: { x: 200, y: 116 },
                           resources: content.iocSansStoolScratch
                        }).on('tick', function () {
                           this.alpha.value = mode === 3 ? 1 : 0;
                           if (mode === 3 && !this.active) {
                              this.enable();
                           } else if (mode !== 3 && this.active) {
                              this.reset();
                           }
                        }),
                        sr
                     ]
                  });
                  sand.walk(renderer, 2, { y: 116 }).then(() => {
                     sand.preset = characters.none;
                     renderer.attach('main', stoolsand);
                  });
                  await antifreeze([ whoopeeLoader, player.walk(renderer, 3, { x: 187.5, y: 127 }) ]);
                  await player.walk(renderer, 1.5, { y: 106.5 });
                  const whooper = sounds.whoopee.instance(renderer);
                  whooper.rate.value = 1.25;
                  await antifreeze([ grillbyLoader, renderer.pause(2500) ]);
                  await dialogue('auto', ...text.a_foundry.spookydate11);
                  SAVE.data.b.fryz = choicer.result === 0;
                  await dialogue(
                     'auto',
                     ...[ text.a_foundry.spookydate12a, text.a_foundry.spookydate12b ][choicer.result]
                  );
                  mode = 2;
                  const grillbz = instance('main', 'g_grillby')!.object;
                  grillbz.alpha.value = 0;
                  const ogp = grillbz.position.add(11.5, 0);
                  const gwalk = new CosmosAnimation({
                     anchor: { x: 0, y: 1 },
                     priority: -999,
                     position: ogp,
                     resources: content.iocGrillbyUp
                  });
                  renderer.attach('main', gwalk);
                  gwalk.enable();
                  await gwalk.position.step(renderer, 1.5, { y: 70 });
                  gwalk.reset();
                  gwalk.use(content.iocGrillbyDown);
                  await renderer.pause(600);
                  sounds.phase.instance(renderer);
                  gwalk.scale.modulate(renderer, 125, { x: 1.05, y: 1 }).then(() => {
                     gwalk.scale.modulate(renderer, 50, { x: 0, y: 1 });
                  });
                  gwalk.alpha.modulate(renderer, 100, 0.8).then(async () => {
                     gwalk.alpha.value = 0;
                     await renderer.pause(40);
                     gwalk.alpha.value = 1;
                  });
                  await renderer.pause(4000);
                  whooper.stop();
                  content.asWhoopee.unload();
                  mode = 1;
                  await dialogue('auto', ...text.a_foundry.spookydate13());
                  await dialogue(
                     'auto',
                     ...[ text.a_foundry.spookydate14a, text.a_foundry.spookydate14b ][choicer.result]
                  );
                  await renderer.pause(3000);
                  gwalk.attach(
                     new CosmosSprite({
                        position: { y: 0 },
                        anchor: { x: 0, y: 1 },
                        frames: [ SAVE.data.b.fryz ? content.iooFFries : content.iooFBurger ]
                     }).on('pre-render', function () {
                        this.position.y = gwalk.index % 2 === 1 ? -23 : -22;
                     })
                  );
                  sounds.dephase.instance(renderer);
                  gwalk.scale.modulate(renderer, 50, { x: 1.05, y: 1 }).then(() => {
                     gwalk.scale.modulate(renderer, 125, { x: 1, y: 1 });
                  });
                  renderer.pause(35).then(async () => {
                     gwalk.alpha.value = 0;
                     await renderer.pause(40);
                     gwalk.alpha.value = 0.8;
                     await gwalk.alpha.modulate(renderer, 100, 1);
                  });
                  const foodz = instance('main', 'foodz')!.object;
                  await Promise.all([
                     renderer.pause(850).then(async () => {
                        gwalk.enable();
                        await gwalk.position.step(renderer, 1.5, { y: ogp.y });
                        gwalk.alpha.value = 0;
                        grillbz.alpha.value = 1;
                        foodz.alpha.value = 1;
                        if (SAVE.data.b.fryz) {
                           for (const spr of foodz.objects as CosmosSprite[]) {
                              spr.frames[0] = content.iooFFries;
                           }
                        }
                        await renderer.pause(3000);
                        renderer.detach('main', gwalk);
                        grillbyAssets.unload();
                     }),
                     renderer.pause(1250).then(async () => {
                        await dialogue('auto', ...text.a_foundry.spookydate15);
                        mode = 3;
                        await renderer.pause(2000);
                     })
                  ]);
                  mode = 1;
                  await dialogue('auto', ...text.a_foundry.spookydate16);
                  mode = 0;
                  await game.music!.gain.modulate(renderer, 2500, 0);
                  await renderer.pause(1500);
                  await dialogue('auto', ...text.a_foundry.spookydate17);
                  await antifreeze([ premonitionLoader, renderer.pause(850) ]);
                  const path = new CosmosObject({ alpha: 0.8 });
                  const graphics = new Graphics()
                     .beginFill(0, path.alpha.value)
                     .drawRect(0, 0, 320, 240)
                     .endFill()
                     .beginHole()
                     .drawEllipse(200, 92, 55 / 2, 61 / 2)
                     .endHole();
                  path.container.addChild(graphics);
                  (grillbz.objects[0] as CosmosAnimation).disable();
                  renderer.attach('menu', path);
                  sounds.noise.instance(renderer);
                  await renderer.pause(1150);
                  const spooky = music.spookydate.instance(renderer);
                  await dialogue('auto', ...text.a_foundry.spookydate18());
                  await dialogue(
                     'auto',
                     ...[ text.a_foundry.spookydate19a, text.a_foundry.spookydate19b ][choicer.result],
                     ...text.a_foundry.spookydate20
                  );
                  spooky.gain.modulate(renderer, 1000, 0).then(() => {
                     spooky.stop();
                     content.amSpookydate.unload();
                  });
                  await renderer.pause(450);
                  game.music!.gain.modulate(renderer, 1000, world.level);
                  (grillbz.objects[0] as CosmosAnimation).enable();
                  await path.alpha.modulate(renderer, 850, 0);
                  renderer.detach('menu', path);
                  await renderer.pause(1000);
                  await dialogue('auto', ...text.a_foundry.spookydate21);
                  await antifreeze([ elevatorMachineLoader, renderer.pause(350) ]);
                  mode = 4;
                  await renderer.pause(350);
                  const gr = new Graphics();
                  const objects = [] as { a: number; x: number; y: number; vx: number; vy: number }[];
                  const ketch = new CosmosAnimation({
                     position: { x: 283, y: 88 },
                     priority: 10001,
                     resources: content.iooSKetch
                  }).on('tick', function () {
                     this.subcrop.right = this.position.x - 289;
                     if (!this.active) {
                        return;
                     }
                     const { x, y } = CosmosMath.ray(Math.random() * 360, 2);
                     gr.clear();
                     objects.unshift({ a: 1, x: 0, y: 0, vx: x, vy: y });
                     if (objects.length > 10) {
                        void objects.pop();
                     }
                     for (const object of objects) {
                        object.a *= 0.95;
                        object.x += object.vx;
                        object.y += object.vy;
                        gr.beginFill(0xd6341a, object.a)
                           .drawRect(object.x - 1, object.y - 1, 2, 2)
                           .endFill();
                     }
                  });
                  ketch.container.addChild(gr);
                  renderer.attach('main', ketch);
                  const t = renderer.time;
                  const gen = sounds.long_elevator.instance(renderer);
                  gen.rate.value = 2;
                  await renderer.shake.modulate(renderer, 250, 0.5);
                  await ketch.position.step(renderer, 6, { x: 217 });
                  ketch.enable();
                  sr.index = 1;
                  sounds.noise.instance(renderer);
                  await renderer.pause(9000 - (renderer.time - t));
                  await Promise.all([
                     ketch.alpha.modulate(renderer, 500, 0),
                     renderer.shake.modulate(renderer, 500, 0)
                  ]);
                  gen.stop();
                  content.asLongElevator.unload();
                  renderer.detach('main', ketch);
                  await renderer.pause(1250);
                  await dialogue('auto', ...text.a_foundry.spookydate22);
                  await renderer.pause(200);
                  foodz.objects[1].alpha.value = 0;
                  renderer.detach('main', stoolsand);
                  sand.preset = characters.sansTomato;
                  await sand.walk(renderer, 1.5, { y: 130 });
                  await sand.walk(renderer, 3, { x: 177.5 }, { y: 200 });
                  player.walk(renderer, 1.5, { y: 130 });
                  await renderer.pause(1650);
                  sand.face = 'up';
                  await dialogue('dialoguerTop', ...text.a_foundry.spookydate23());
                  await sand.walk(renderer, 3, { y: 240 });
                  await sand.alpha.modulate(renderer, 300, 0);
                  renderer.detach('main', sand);
                  stoolAssets.unload();
                  SAVE.data.n.plot = 33;
               }
            } else {
               await dialogue('auto', ...text.a_foundry.spookydate0());
            }
            game.movement = true;
            break;
         }
         case 'doge': {
            if (SAVE.data.n.plot < 35) {
               SAVE.data.n.plot = 35;
               game.movement = false;
               game.music?.stop();
               player.face = 'right';
               const doge = new CosmosAnimation({
                  active: true,
                  position: { x: player.position.x - 260, y: 160 },
                  anchor: { x: 0, y: 1 },
                  resources: content.ionFDogeRight,
                  extrapolate: false,
                  velocity: { x: 3 }
               }).on('tick', function () {
                  this.duration = Math.round(15 / 3);
                  if (this.index % 2 === 1 && this.step === 0) {
                     sounds.stomp.instance(renderer).rate.value = 1.4;
                  }
               });
               renderer.attach('main', doge);
               await renderer.when(() => player.position.x - 40 <= doge.position.x);
               doge.velocity.x = 0;
               doge.reset();
               await renderer.pause(300);
               game.music = null;
               await battler.encounter(player, groups.doge, true);
               if (SAVE.data.n.state_foundry_doge !== 1) {
                  doge.use(content.ionFDogeLeft);
                  await renderer.pause(300);
                  doge.velocity.x = -3;
                  doge.enable();
                  await renderer.when(() => doge.position.x <= player.position.x - 260);
               }
               renderer.detach('main', doge);
               if (!SAVE.data.b.oops) {
                  await dialogue('auto', ...text.a_foundry.truetext.doge1);
               }
               game.movement = true;
               if (SAVE.data.n.state_foundry_doge === 1) {
                  quickresume(true);
               } else {
                  quickresume();
               }
            }
            break;
         }
         case 'puzzle1':
         case 'puzzle2':
         case 'puzzle3': {
            if (!game.movement && args[0] !== 'cutscene') {
               break;
            }
            const target = puzzleTarget();
            if (target <= SAVE.data.n.plot) {
               await dialogue('auto', ...text.a_foundry[`${subscript}switch`]());
               break;
            }
            game.movement = false;
            const swit = instance('main', `f_${subscript}_switch`)!.object.objects.filter(
               obj => obj instanceof CosmosAnimation
            )[0] as CosmosAnimation;
            swit.index = 1;
            sounds.noise.instance(renderer);
            const anims = [] as CosmosAnimation[];
            const rects = [] as CosmosRectangle[];
            const pylons = [ ...instances('main', 'pylon') ];
            const overs = [] as CosmosSprite[];
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
                  ...instance('below', 'beamwall')!.object.objects,
                  ...renderer.layers.below.objects.flatMap(object =>
                     object.objects.filter(object => object.metadata.barrier)
                  )
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
            if (
               await (async () => {
                  if (subscript === 'puzzle3') {
                     const valid1 = { state: true };
                     const valid2 = { state: true };
                     return await Promise.all([
                        beamcast(stage, { x: 655, y: 121 }, valid1, void 0, true).then(result => {
                           result || (valid1.state && (valid1.state = false));
                           return result;
                        }),
                        beamcast(stage, { x: 735, y: 121 }, valid2, void 0, true).then(result_1 => {
                           result_1 || (valid2.state && (valid2.state = false));
                           return result_1;
                        })
                     ]).then(([ result1, result2 ]) => result1 && result2);
                  } else {
                     return beamcast(
                        stage,
                        subscript === 'puzzle1' ? { x: 75, y: 101 } : { x: 315, y: 41 },
                        void 0,
                        void 0,
                        true
                     );
                  }
               })()
            ) {
               if (stage.discovery.length === pylons.length) {
                  SAVE.data.s[`state_foundry_f_${subscript}`] = CosmosUtils.serialize([
                     rects.map(rect => [
                        [ 'up', 'down', 'left', 'right' ].indexOf(rect.metadata.face as string),
                        rect.position.value(),
                        rect.size.value()
                     ]),
                     overs.map(over => [ over.position.value(), over.scale.x === -1 ])
                  ] as [[number, CosmosPointSimple, CosmosPointSimple][], [CosmosPointSimple, boolean][]]);
                  await passPuzzle(rects, anims);
                  for (const { object: pylon } of instances('main', 'pylon')) {
                     pylon.metadata.active = true;
                  }
                  events.on('teleport').then(() => {
                     renderer.detach('main', ...rects, ...overs);
                  });
                  SAVE.data.n.plot = target;
                  sounds.pathway.instance(renderer);
                  shake(2, 1000);
               } else {
                  await failPuzzle(rects, anims, true);
                  renderer.detach('main', ...overs);
               }
            } else {
               await failPuzzle(rects, anims);
               renderer.detach('main', ...overs);
            }
            swit.index = 0;
            args[0] === 'cutscene' || (game.movement = true);
            break;
         }
         case 'quiche': {
            if (SAVE.data.b.item_quiche) {
               await dialogue('auto', ...text.a_foundry.quiche4());
            } else {
               await dialogue('auto', ...text.a_foundry.quiche1());
               if (choicer.result === 0) {
                  if (SAVE.storage.inventory.size < 8) {
                     SAVE.data.b.item_quiche = true;
                     saver.add('quiche');
                     sounds.equip.instance(renderer);
                     await dialogue('auto', ...text.a_foundry.quiche3);
                  } else {
                     await dialogue('auto', ...text.a_foundry.quiche2);
                  }
               } else {
                  await dialogue('auto', ...text.a_foundry.quiche5);
               }
            }
            break;
         }
         case 'cardbox': {
            if (!game.movement) {
               break;
            }
            const dimbox = instance('main', 'dimbox');
            if (dimbox) {
               game.movement = false;
               const anim = dimbox.object.objects[0] as CosmosAnimation;
               anim.enable();
               await renderer.when(() => anim.index === 3);
               anim.disable();
               if (SAVE.data.b.svr || SAVE.data.n.state_foundry_punchcards > 0) {
                  if (SAVE.data.b.svr) {
                     await dialogue('auto', ...text.a_foundry.punchcardX());
                  } else {
                     await dialogue(
                        'auto',
                        ...(SAVE.data.n.state_foundry_punchcards > 1
                           ? text.a_foundry.punchcard2
                           : text.a_foundry.punchcard1)
                     );
                     await dialogue('auto', ...text.a_foundry.punchcard3());
                  }
                  if (SAVE.data.n.state_foundry_punchcards <= 0) {
                     await dialogue('auto', ...text.a_foundry.punchcard0());
                  } else if (choicer.result === 0) {
                     if (SAVE.storage.inventory.size < 8) {
                        sounds.equip.instance(renderer);
                        saver.add('punchcard');
                        await dialogue('auto', ...text.a_foundry.punchcard4);
                        SAVE.data.n.state_foundry_punchcards--;
                     } else {
                        await dialogue('auto', ...text.a_foundry.quiche2);
                     }
                  }
               } else {
                  await dialogue('auto', ...text.a_foundry.punchcard0());
               }
               await renderer.when(() => atlas.target === null);
               anim.index = 4;
               anim.enable();
               await renderer.when(() => anim.index === 6);
               anim.reset();
               game.movement = true;
            }
            break;
         }
         case 'sentry': {
            if (!game.movement) {
               return;
            }
            if (35 <= SAVE.data.n.plot || world.dead_skeleton) {
               if (player.position.x > 210 && player.position.y < 100) {
                  await dialogue('auto', ...text.a_foundry.sansSentryBack());
               } else {
                  await dialogue('auto', ...text.a_foundry.sansSentry());
               }
            }
            break;
         }
         case 'artifact': {
            if (SAVE.data.b.item_artifact) {
               await dialogue('auto', ...text.a_foundry.artifact3());
            } else {
               if (SAVE.storage.inventory.size < 8) {
                  const box = instance('main', 'artifactbox')!;
                  const spr = box.object.objects.filter(x => x instanceof CosmosSprite)[0] as CosmosSprite;
                  spr.index = 1;
                  SAVE.data.b.item_artifact = true;
                  saver.add('artifact');
                  sounds.equip.instance(renderer);
                  await dialogue('auto', ...text.a_foundry.artifact1);
               } else {
                  await dialogue('auto', ...text.a_foundry.artifact2);
               }
            }
            break;
         }
         case 'tome': {
            if (SAVE.data.n.epiphany < 1) {
               await dialogue('auto', ...text.a_foundry.tome0());
            } else if (SAVE.data.n.epiphany < 2) {
               if (SAVE.storage.inventory.size < 8) {
                  instance('main', 'tomebox')!.index = 1;
                  SAVE.data.n.epiphany = 2;
                  saver.add('epiphany');
                  roomState.muzi?.stop();
                  roomState.muzi = void 0;
                  roomState.fi && renderer.filters?.splice(renderer.filters.indexOf(roomState.fi), 1);
                  roomState.fi = void 0;
                  sounds.equip.instance(renderer);
                  await dialogue('auto', ...text.a_foundry.tome1());
                  SAVE.data.n.epiphany = 2;
                  world.cutscene_override = false;
                  if (SAVE.data.n.plot === 72) {
                     if (SAVE.data.b.svr) {
                        music.uwa.instances[0].rate.value = music.uwa.rate;
                     } else {
                        music.reunited.instances[0].rate.value = music.reunited.rate * (world.runaway ? 0.4 : 1);
                     }
                  } else {
                     game.music!.rate.value = world.ambiance;
                  }
               } else {
                  await dialogue('auto', ...text.a_foundry.tome2);
               }
            } else {
               await dialogue('auto', ...text.a_foundry.tome3());
            }
            break;
         }
         case 'piano': {
            if (!game.movement) {
               return;
            }
            game.movement = false;
            if (SAVE.data.n.plot === 72) {
               if (SAVE.data.b.svr) {
                  music.uwa.stop();
               } else {
                  music.reunited.stop();
               }
               quickresume(true);
            }
            let active = true;
            let portamento = null as number | null;
            const ratio = 2 ** (1 / 12);
            const notehistory = [] as number[];
            const maxhist = Math.max(...pianosolutions.map(solu => solu.sequence.length));
            const update = (play = false) => {
               if (!active) {
                  return;
               }
               const keyX = (keyState.left ? -1 : 0) + (keyState.right ? 1 : 0);
               const keyY = (keyState.down ? 1 : 0) + (keyState.up ? -1 : 0);
               const keyZ = `k${[ 0, 1, 2 ][keyX + 1]}${[ 0, 1, 2 ][keyY + 1]}`;
               for (const instance of instances('main', 'pianoarrow')) {
                  const focus = instance.tags.includes(keyZ) ? (keyState.interact ? 2 : 1) : 0;
                  if (instance.object.metadata.active !== focus) {
                     instance.object.metadata.active = focus || void 0;
                     for (const subobj of instance.object.objects as CosmosAnimation[]) {
                        subobj.index = focus;
                     }
                  }
               }
               if (!play) {
                  return;
               }
               const tags = instance('main', keyZ)!.tags as string[];
               for (const tag of tags) {
                  if (tag === 'pianoarrow' || tag === keyZ) {
                     continue;
                  }
                  const step = +tag;
                  notehistory.push(step);
                  notehistory.length > maxhist && notehistory.shift();
                  for (const { sequence, willActivate, script } of pianosolutions) {
                     if (
                        sequence.length <= notehistory.length &&
                        notehistory[notehistory.length - 1] === sequence[sequence.length - 1]
                     ) {
                        let match = true;
                        for (const [ subindex, note ] of notehistory.slice(-sequence.length).entries()) {
                           if (note !== sequence[subindex]) {
                              match = false;
                              break;
                           }
                        }
                        if (match && willActivate()) {
                           active = false;
                           renderer.pause(500).then(async () => {
                              deactivate(false);
                              await script();
                              deactivate2();
                           });
                        }
                     }
                  }
                  const note = sounds.note.instance(renderer);
                  const rate = ratio ** step;
                  note.rate.value = Math.min(Math.max(portamento ?? rate, rate / 1.25), rate * 1.25);
                  note.rate.modulate(renderer, 50, (portamento = rate));
                  break;
               }
            };
            const ticker = () => update();
            const listener = () => update(true);
            const ender = () => {
               if (active) {
                  deactivate();
                  deactivate2();
               }
            };
            const deactivate = (silence = true) => {
               renderer.off('tick', ticker);
               keys.interactKey.off('down', listener);
               keys.specialKey.off('down', ender);
               for (const instance of instances('main', 'pianoarrow')) {
                  if (instance.object.metadata.active) {
                     instance.object.metadata.active = void 0;
                     for (const subobj of instance.object.objects as CosmosAnimation[]) {
                        subobj.index = 0;
                     }
                  }
               }
               silence && sounds.note.stop();
            };
            const deactivate2 = () => {
               game.movement = true;
               if (SAVE.data.n.plot === 72) {
                  game.music?.stop();
                  epilogue();
               }
            };
            renderer.on('tick', ticker);
            keys.interactKey.on('down', listener);
            ticker();
            await renderer.pause(500);
            keys.specialKey.on('down', ender);
            break;
         }
         case 'shard': {
            if (!game.movement || roomState.shardsmash) {
               return;
            }
            await dialogue('auto', ...text.a_foundry.shard1);
            if (SAVE.data.n.bully < 10) {
               return;
            }
            await dialogue('auto', ...text.a_foundry.shard2());
            if (choicer.result === 1) {
               await dialogue('auto', ...text.a_foundry.shard3);
               return;
            }
            roomState.shardsmash = true;
            await dialogue('auto', ...text.a_foundry.shard4);
            const whitefader = fader({ fill: 0xffffff, size: 1000, anchor: 0, position: { x: 160, y: 120 } });
            await whitefader.alpha.modulate(renderer, SAVE.flag.b.$option_epilepsy ? 300 : 150, 1);
            sounds.stab.instance(renderer);
            for (const inst of instances('main', 'ayoooooo')) {
               const obj = inst.object as CosmosSprite;
               const pos = { x: 44.5 + Math.random() * 231, y: 84.5 + Math.random() * 111 };
               const rot = obj.rotation.value + (Math.random() * 270 + 90) * (Math.random() < 0.5 ? -1 : 1);
               const pro = (obj.priority.value += pos.y - obj.position.y);
               obj.position.modulate(renderer, 1000, pos, pos, pos);
               obj.rotation.modulate(renderer, 1000, rot, rot, rot);
               obj.priority.modulate(renderer, 1000, pro, pro, pro);
            }
            shake(4, 800);
            await renderer.pause(SAVE.flag.b.$option_epilepsy ? 150 : 300);
            whitefader.alpha.modulate(renderer, 300, 0).then(() => renderer.detach('menu', whitefader));
            await renderer.pause(1500);
            await dialogue('auto', ...text.a_foundry.shard5());
            break;
         }
         case 'candy': {
            if (game.movement) {
               game.movement = false;
               await dialogue('auto', ...text.a_foundry.candy1());
               if (postSIGMA()) {
                  game.movement = true;
                  break;
               }
               if (choicer.result < 3) {
                  const item = [ 'astrofood', 'crisp', 'rations' ][choicer.result] as 'astrofood' | 'crisp' | 'rations';
                  const price = [ 18, 10, 25 ][choicer.result];
                  typer.variables.x = text[`i_${item}`].name;
                  typer.variables.y = price.toString();
                  await dialogue('auto', ...text.a_foundry.candy3());
                  if (choicer.result === 0) {
                     if (SAVE.storage.inventory.size < 8) {
                        if (saver.gold < price) {
                           await dialogue('auto', ...text.a_foundry.candy4);
                        } else {
                           saver.gold -= price;
                           saver.add(item);
                           sounds.equip.instance(renderer);
                           await dialogue('auto', ...text.a_foundry.candy2);
                        }
                     } else {
                        await dialogue('auto', ...text.a_foundry.candy6);
                     }
                  } else {
                     await dialogue('auto', ...text.a_foundry.candy5);
                  }
               } else {
                  await dialogue('auto', ...text.a_foundry.candy7);
               }
               game.movement = true;
            }
            break;
         }
         case 'fakedummy': {
            if (!game.movement) {
               return;
            }
            game.movement = false;
            if (SAVE.data.b.f_state_dummypunch || SAVE.data.b.f_state_dummyhug) {
               await dialogue('auto', ...text.a_foundry.dummypunch3());
            } else {
               SAVE.data.b.f_state_dummytalk = true;
               world.meanie && (SAVE.data.b.f_state_dummytalk_meanie = true);
               await dialogue('auto', ...text.a_foundry.dummypunch1());
               if (choicer.result === 0) {
                  if (SAVE.data.b.oops) {
                     SAVE.data.b.f_state_dummypunch = true;
                     world.meanie && (SAVE.data.b.f_state_dummypunch_meanie = true);
                  } else {
                     SAVE.data.b.f_state_dummyhug = true;
                  }
                  if (world.genocide || world.meanie) {
                     const whitefader = fader(
                        { fill: 0xffffff, size: 1000, anchor: 0, position: { x: 160, y: 120 } },
                        'menu'
                     );
                     await whitefader.alpha.modulate(renderer, SAVE.flag.b.$option_epilepsy ? 300 : 150, 1);
                     sounds.stab.instance(renderer);
                     shake(4, 800);
                     await renderer.pause(SAVE.flag.b.$option_epilepsy ? 150 : 300);
                     whitefader.alpha.modulate(renderer, 300, 0).then(() => renderer.detach('menu', whitefader));
                     await renderer.pause(1500);
                  }
                  if (!(world.genocide || world.meanie || SAVE.data.n.exp > 0 || SAVE.data.b.oops) && 25 <= world.flirt) {
                     SAVE.data.b.flirt_maddummy = true;
                  }
                  await dialogue('auto', ...text.a_foundry.dummypunch2b());
               } else {
                  await dialogue('auto', ...text.a_foundry.dummypunch2a);
               }
            }
            game.movement = true;
            break;
         }
         case 'sandinter': {
            if (!game.movement) {
               return;
            }
            game.movement = false;
            if (SAVE.data.b.f_state_telescope) {
               await dialogue('auto', ...text.a_foundry.telescopeZ);
            } else {
               await dialogue('auto', ...text.a_foundry.telescopeX());
               if (choicer.result === 0) {
                  let x = 160;
                  let y = 120;
                  SAVE.data.b.f_state_telescope = true;
                  const graphik = new Graphics();
                  const recto = new CosmosRectangle({
                     fill: 0,
                     size: { x: 320, y: 240 }
                  }).on('tick', () => {
                     graphik.clear().beginFill(0xffffff, 1).drawEllipse(x, y, 40, 32).endFill();
                  });
                  recto.container.addChild(graphik);
                  renderer.attach('menu', recto);
                  await renderer.pause(500);
                  const keyListener = () => {
                     x = Math.min(Math.max(x + (keyState.left ? -4 : 0) + (keyState.right ? 4 : 0), 0), 320);
                     y = Math.min(Math.max(y + (keyState.up ? -4 : 0) + (keyState.down ? 4 : 0), 0), 240);
                  };
                  renderer.on('tick', keyListener);
                  await keys.specialKey.on('down');
                  renderer.detach('menu', recto);
                  renderer.off('tick', keyListener);
                  await dialogue('auto', ...text.a_foundry.telescopeY());
               }
            }
            game.movement = true;
            break;
         }
         case 'birdcheck': {
            if (!game.movement) {
               return;
            }
            game.movement = false;
            await dialogue('auto', ...text.a_foundry.bird1());
            const bird = roomState.bird as CosmosHitbox;
            const birdSprite = bird.objects[0] as CosmosAnimation;
            if (choicer.result === 0) {
               const riseAssets = new CosmosInventory(content.amRise, content.asBoom);
               riseAssets.name = 'riseAssets';
               const riseLoader = riseAssets.load();
               if (SAVE.data.b.svr) {
                  goatbroTrue.sprite.reset();
                  goatbroTrue.metadata.static = true;
                  goatbroTrue.metadata.override = true;
               }
               birdSprite.use(content.ionFBird);
               const speed1 = 1;
               const speed2 = 0.8;
               const speed3 = 10;
               const speed4 = 0.6;
               const bazeTime = renderer.time;
               const shaker = new CosmosValue(1.2);
               const birdPos = birdSprite.position.clone();
               const playerPos = player.sprite.position.clone();
               const goatPos = goatbroTrue.sprite.position.clone();
               let goatshk = false;
               const shakeListener = () => {
                  birdSprite.position.set(
                     birdPos.add((Math.random() - 0.5) * shaker.value, (Math.random() - 0.5) * shaker.value)
                  );
                  player.sprite.position.set(
                     playerPos.add((Math.random() - 0.5) * shaker.value, (Math.random() - 0.5) * shaker.value)
                  );
                  if (goatshk) {
                     goatbroTrue.sprite.position.set(
                        goatPos.add((Math.random() - 0.5) * shaker.value, (Math.random() - 0.5) * shaker.value)
                     );
                  }
               };
               const side = player.position.x < 750 ? 1 : -1;
               const targetX = side === 1 ? 1385 : 115;
               const echoAlpha = new CosmosValue(1);
               const echoListener = () => {
                  for (const [ subject, sprite ] of [
                     [ bird, birdSprite ],
                     [ player, player.sprite ],
                     ...(SAVE.data.b.svr ? [ [ goatbroTrue, goatbroTrue.sprite ] ] : [])
                  ] as [CosmosHitbox, CosmosAnimation][]) {
                     const s = quickshadow(
                        sprite,
                        subject.position.add(subject.velocity.x, 0).add(sprite.position),
                        'main',
                        CosmosMath.remap(Math.abs(subject.velocity.x), 0, 0.2, speed2, speed3) * echoAlpha.value,
                        1.5,
                        0.00001
                     );
                     s.priority.value = subject.position.y - 1;
                  }
               };

               // init delay
               if (SAVE.data.n.plot === 72) {
                  music.uwa.stop();
                  music.reunited.stop();
               } else {
                  game.music?.stop();
               }
               await renderer.pause(350);

               // move to player
               birdSprite.use(content.ionFBirdFly);
               await bird.position.step(renderer, speed1, player.position.subtract(0, 20));
               await antifreeze([ riseLoader, renderer.pause(500) ]);

               // lift
               const rise = music.rise.instance(renderer);
               const OGgain = rise.gain.value;
               rise.gain.value = 0;
               rise.gain.modulate(renderer, 1500, OGgain);
               renderer.on('tick', shakeListener);
               await bird.position.step(renderer, speed2, player.position.subtract(0, 25));
               const dif1 = { y: 25 };
               const dif2 = { y: 40 };
               if (SAVE.data.b.svr) {
                  const d1 = goatbroTrue.position.subtract(0, 40);
                  await Promise.all([
                     bird.position.step(renderer, speed2, d1),
                     player.position.step(renderer, speed2, d1.add(dif1))
                  ]);
                  await renderer.pause(500);
                  goatshk = true;
                  shaker.value = 1.8;
                  rise.rate.modulate(renderer, 1500, rise.rate.value / 0.92);
                  goatbroTrue.preset = characters.asrielTrueSad;
                  const d2 = goatbroTrue.position.subtract(0, 45);
                  await Promise.all([
                     bird.position.step(renderer, speed4, d2),
                     player.position.step(renderer, speed4, d2.add(dif1)),
                     goatbroTrue.position.step(renderer, speed4, d2.add(dif2))
                  ]);
                  const d3 = bird.position.subtract(0, 40);
                  await Promise.all([
                     bird.position.step(renderer, speed4, d3),
                     player.position.step(renderer, speed4, d3.add(dif1)),
                     goatbroTrue.position.step(renderer, speed4, d3.add(dif2))
                  ]);

                  // set initial velocity
                  bird.velocity.x = speed4 * side;
                  player.velocity.x = speed4 * side;
                  goatbroTrue.velocity.x = speed4 * side;
               } else {
                  const d1 = bird.position.subtract(0, 40);
                  await Promise.all([
                     bird.position.step(renderer, speed2, d1),
                     player.position.step(renderer, speed2, d1.add(dif1))
                  ]);
                  await renderer.pause(500);

                  // set initial velocity
                  bird.velocity.x = speed2 * side;
                  player.velocity.x = speed2 * side;
               }

               // speed up
               shaker.modulate(renderer, 1000, 0.8);
               Promise.all([
                  bird.velocity.modulate(
                     renderer,
                     2000,
                     { x: (SAVE.data.b.svr ? speed4 : speed2) * side },
                     { x: speed3 * 0.8 * side }
                  ),
                  player.velocity.modulate(
                     renderer,
                     2000,
                     { x: (SAVE.data.b.svr ? speed4 : speed2) * side },
                     { x: speed3 * 0.8 * side }
                  ),
                  ...(SAVE.data.b.svr
                     ? [ goatbroTrue.velocity.modulate(renderer, 2000, { x: speed4 * side }, { x: speed3 * 0.8 * side }) ]
                     : [])
               ]).then(() => {
                  const b = sounds.boom.instance(renderer);
                  b.rate.value = 0.5;
                  const wf = fader({ fill: 0xffffff });
                  wf.alpha.modulate(renderer, 300, 1).then(async () => {
                     renderer.on('tick', echoListener);
                     await renderer.pause(1000);
                     await wf.alpha.modulate(renderer, 3000, 0);
                     renderer.detach('menu', wf);
                  });
                  bird.velocity.modulate(
                     renderer,
                     15000 - (renderer.time - bazeTime),
                     { x: speed3 * side },
                     { x: speed3 * side }
                  );
                  player.velocity.modulate(
                     renderer,
                     15000 - (renderer.time - bazeTime),
                     { x: speed3 * side },
                     { x: speed3 * side }
                  );
                  if (SAVE.data.b.svr) {
                     goatbroTrue.velocity.modulate(
                        renderer,
                        15000 - (renderer.time - bazeTime),
                        { x: speed3 * side },
                        { x: speed3 * side }
                     );
                  }
               });

               renderer.pause(17500 - (renderer.time - bazeTime)).then(async () => {
                  await echoAlpha.modulate(renderer, 3000, 0);
                  renderer.off('tick', echoListener);
               });
               while (renderer.time - bazeTime < 18500) {
                  await renderer.when(() => Math.abs(targetX - player.position.x) < 500);
                  for (const object of renderer.layers.main.objects) {
                     if (!object.metadata.tags?.includes('hovercrystal')) {
                        object.position.x -= side * 100;
                     }
                  }
               }

               await renderer.when(() => Math.abs(targetX - player.position.x) < 200);

               // slow down
               shaker.modulate(renderer, 1000, SAVE.data.b.svr ? 1.8 : 1.2);
               bird.velocity.modulate(renderer, 1000, { x: (SAVE.data.b.svr ? speed4 : speed2) * side });
               player.velocity.modulate(renderer, 1000, { x: (SAVE.data.b.svr ? speed4 : speed2) * side });
               if (SAVE.data.b.svr) {
                  goatbroTrue.velocity.modulate(renderer, 1000, { x: speed4 * side });
               }
               await renderer.when(() => Math.abs(targetX - player.position.x) < 10);

               // cancel velocity
               bird.velocity.x = 0;
               player.velocity.x = 0;
               if (SAVE.data.b.svr) {
                  goatbroTrue.velocity.x = 0;
                  await Promise.all([
                     bird.position.step(renderer, speed4, { x: targetX }),
                     player.position.step(renderer, speed4, { x: targetX }),
                     goatbroTrue.position.step(renderer, speed4, { x: targetX })
                  ]);
               } else {
                  // manually move the remaining distance
                  await Promise.all([
                     bird.position.step(renderer, speed2, { x: targetX }),
                     player.position.step(renderer, speed2, { x: targetX })
                  ]);
               }
               await renderer.pause(500);

               // beging dropdown
               rise.gain.modulate(renderer, 3000, 0, 0).then(() => {
                  rise.stop();
                  sounds.boom.stop();
                  riseAssets.unload();
               });
               if (SAVE.data.b.svr) {
                  const dropOffset1 = goatbroTrue.position
                     .add(0, 40)
                     .clamp({ x: -Infinity, y: 125 }, { x: Infinity, y: 155 })
                     .subtract(goatbroTrue.position);
                  await Promise.all([
                     bird.position.step(renderer, speed4, bird.position.add(dropOffset1)),
                     player.position.step(renderer, speed4, player.position.add(dropOffset1)),
                     goatbroTrue.position.step(renderer, speed4, goatbroTrue.position.add(dropOffset1))
                  ]);
                  goatshk = false;
                  shaker.value = 1.2;
                  goatbroTrue.sprite.position.set(goatPos);
                  goatbroTrue.preset = characters.asrielTrue;
                  await renderer.pause(500);

                  const dropOffset2 = {
                     x: player.position.x > 750 ? 21 : -21,
                     y: goatbroTrue.position.y - player.position.y
                  };

                  // end dropdown
                  await Promise.all([
                     bird.position.step(renderer, speed2, bird.position.add(dropOffset2)),
                     player.position.step(renderer, speed2, player.position.add(dropOffset2))
                  ]);
               } else {
                  const dropOffset = player.position
                     .add(0, 40)
                     .clamp({ x: -Infinity, y: 125 }, { x: Infinity, y: 155 })
                     .subtract(player.position);
                  await Promise.all([
                     bird.position.step(renderer, speed2, bird.position.add(dropOffset)),
                     player.position.step(renderer, speed2, player.position.add(dropOffset))
                  ]);
               }
               renderer.off('tick', shakeListener);
               birdSprite.position.set(birdPos);
               player.sprite.position.set(playerPos);
               await renderer.pause(500);

               // move to start spot
               await bird.position.step(renderer, speed1, { x: player.position.x > 750 ? 1360 : 140, y: 140 });
               birdSprite.use(content.ionFBird);
               if (SAVE.data.b.svr) {
                  goatbroTrue.metadata.static = false;
                  goatbroTrue.metadata.override = false;
                  tracker.supplant(player.position.x > 750 ? 'right' : 'left');
               }

               // end delay
               await renderer.pause(350);
               if (SAVE.data.n.plot === 72) {
                  epilogue();
               } else {
                  quickresume();
               }
            } else {
               birdSprite.use(content.ionFBirdCry);
            }
            game.movement = true;
            break;
         }
         case 'astrofood': {
            if (SAVE.data.b.svr || SAVE.data.n.state_foundry_astrofood < 3) {
               await dialogue('auto', ...(SAVE.data.b.svr ? text.a_foundry.astrofood0() : text.a_foundry.astrofood1()));
               if (choicer.result === 0) {
                  if (3 <= SAVE.data.n.state_foundry_astrofood) {
                     await dialogue('auto', ...text.a_foundry.astrofood5());
                  } else if (SAVE.storage.inventory.size < 8) {
                     saver.add('tzn');
                     sounds.equip.instance(renderer);
                     await dialogue('auto', ...text.a_foundry.astrofood2);
                     SAVE.data.n.state_foundry_astrofood++;
                  } else {
                     await dialogue('auto', ...text.a_foundry.astrofood3);
                  }
               } else {
                  await dialogue('auto', ...text.a_foundry.astrofood4());
               }
            } else {
               await dialogue('auto', ...text.a_foundry.astrofood5());
            }
            break;
         }
         case 'ladder': {
            if (!scriptState.active) {
               scriptState.active = true;
               player.face = 'up';
               player.puppet = true;
               (player.sprites.up as CosmosAnimation).extrapolate = false;
               player.sprites.up.duration = 10;
               const listener = () => {
                  let end = false;
                  let moved = false;
                  if (game.room !== 'f_dummy') {
                     end = true;
                  } else if (game.movement) {
                     const d = keyState.up ? -1.5 : keyState.down ? 1.5 : 0;
                     if (d !== 0) {
                        player.position.y += d;
                        if (player.position.y <= 180) {
                           player.position.y = Math.floor(player.position.y);
                           end = true;
                        } else if (243 <= player.position.y) {
                           player.position.y = Math.ceil(player.position.y);
                           end = true;
                        } else {
                           moved = true;
                        }
                     }
                  }
                  if (end || !moved) {
                     player.sprites.up.reset();
                     if (end) {
                        player.sprites.up.duration = 5;
                        (player.sprites.up as CosmosAnimation).extrapolate = true;
                        player.puppet = false;
                        renderer.off('tick', listener);
                        scriptState.active = false;
                     }
                  } else {
                     player.sprites.up.enable();
                  }
               };
               renderer.on('tick', listener);
            }
            break;
         }
         case 'blookmusic': {
            if (game.movement) {
               game.movement = false;
               if (postSIGMA()) {
                  await dialogue('auto', ...text.a_foundry.blookmusic0);
               } else if (SAVE.data.n.state_foundry_blookmusic === 0) {
                  await dialogue('auto', ...text.a_foundry.blookmusic1());
                  if (choicer.result < 3) {
                     SAVE.data.n.state_foundry_blookmusic = (choicer.result + 1) as 1 | 2 | 3;
                     const [ az, thing ] = updateSpooktunes();
                     await antifreeze([ dialogue('auto', ...text.a_foundry.blookmusic1y), thing.load(az) ]);
                     sounds.equip.instance(renderer).rate.value = 1.25;
                     if (SAVE.data.n.plot === 47.2) {
                        const ch = erndyne.metadata.chaser;
                        if (ch) {
                           ch.gain.task?.();
                           ch.gain.value = 0;
                        }
                     }
                     napstamusic(roomState);
                     const precount = [
                        SAVE.data.b.f_state_blookmusic1,
                        SAVE.data.b.f_state_blookmusic2,
                        SAVE.data.b.f_state_blookmusic3
                     ].filter(value => value).length;
                     const blooky = roomState.blookie as CosmosCharacter;
                     switch (choicer.result) {
                        case 0:
                           if (ghostpartyCondition() && !SAVE.data.b.f_state_blookmusic1x) {
                              SAVE.data.b.f_state_blookmusic1x = true;
                              roomState.finalghost.face = 'left';
                              await renderer.pause(850);
                              await dialogue('auto', ...text.a_foundry.ghostpartymusic1);
                              roomState.finalghost.face = 'up';
                           }
                           if (SAVE.data.b.f_state_blookmusic1 || SAVE.data.n.state_foundry_blookdate === 2) {
                              break;
                           }
                           SAVE.data.b.f_state_blookmusic1 = true;
                           if (world.sad_ghost) {
                              break;
                           }
                           if (blooky) {
                              blooky.face = 'left';
                              await renderer.pause(850);
                              await dialogue('auto', ...text.a_foundry.blookmusic3a);
                           }
                           break;
                        case 1:
                           if (ghostpartyCondition() && !SAVE.data.b.f_state_blookmusic2x) {
                              SAVE.data.b.f_state_blookmusic2x = true;
                              await renderer.pause(850);
                              await dialogue('auto', ...text.a_foundry.ghostpartymusic2);
                           }
                           if (SAVE.data.b.f_state_blookmusic2 || SAVE.data.n.state_foundry_blookdate === 2) {
                              break;
                           }
                           SAVE.data.b.f_state_blookmusic2 = true;
                           if (world.sad_ghost) {
                              break;
                           }
                           if (blooky) {
                              blooky.face = 'left';
                              await renderer.pause(850);
                              await dialogue('auto', ...text.a_foundry.blookmusic3b);
                           }
                           break;
                        case 2:
                           if (ghostpartyCondition() && !SAVE.data.b.f_state_blookmusic3x) {
                              SAVE.data.b.f_state_blookmusic3x = true;
                              await renderer.pause(850);
                              await dialogue('auto', ...text.a_foundry.ghostpartymusic3);
                           }
                           if (SAVE.data.b.f_state_blookmusic3 || SAVE.data.n.state_foundry_blookdate === 2) {
                              break;
                           }
                           SAVE.data.b.f_state_blookmusic3 = true;
                           if (world.sad_ghost) {
                              break;
                           }
                           if (blooky) {
                              blooky.face = 'left';
                              await renderer.pause(850);
                              await dialogue('auto', ...text.a_foundry.blookmusic3c);
                           }
                           break;
                     }
                     if (
                        blooky &&
                        precount === 2 &&
                        SAVE.data.b.f_state_blookmusic1 &&
                        SAVE.data.b.f_state_blookmusic2 &&
                        SAVE.data.b.f_state_blookmusic3
                     ) {
                        blooky.face = 'left';
                        await renderer.pause(850);
                        await dialogue('auto', ...text.a_foundry.blookmusic3d);
                     }
                     blooky && (blooky.face = 'down');
                  }
               } else {
                  await dialogue('auto', ...text.a_foundry.blookmusic2());
                  if (choicer.result < 1) {
                     sounds.equip.instance(renderer).rate.value = 1.25;
                     const [ az, thing ] = updateSpooktunes(true);
                     SAVE.data.n.state_foundry_blookmusic = 0;
                     (roomState.customs as CosmosInstance).stop();
                     thing.unload(az);
                     roomState.customsLevel = void 0;
                     if (!world.genocide || SAVE.data.n.plot < 68) {
                        if (SAVE.data.n.plot === 72) {
                           if (roomState.customs !== void 0) {
                              const ep = epilogue();
                              ep.gain.value = 0;
                              ep.gain.modulate(renderer, 300, ep.daemon.gain);
                           }
                        } else if (SAVE.data.n.plot === 47.2) {
                           erndyne.metadata.chaser?.gain.modulate(renderer, 300, 1);
                        } else {
                           quickresume(true);
                        }
                     }
                     roomState.customs = void 0;
                  }
               }
               game.movement = true;
            }
            break;
         }
         case 'blookfridge': {
            if (game.movement && player.face === 'up') {
               game.movement = false;
               await dialogue('auto', ...text.a_foundry.blookdate2x());
               if (roomState.blookie && SAVE.data.n.state_foundry_blookdate === 1) {
                  const napsta = roomState.blookie as CosmosCharacter;
                  await renderer.pause(350);
                  napsta.face = 'left';
                  await renderer.pause(650);
                  await dialogue('auto', ...text.a_foundry.blookdate2());
                  await napsta.walk(renderer, 3, { x: 130 });
                  player.walk(renderer, 3, player.position.add(0, 20)).then(() => {
                     player.face = 'up';
                  });
                  await napsta.walk(renderer, 3, { x: 100 }, { y: 85 });
                  await renderer.pause(2650);
                  napsta.face = 'down';
                  await renderer.pause(350);
                  await dialogue('auto', ...text.a_foundry.blookdate3());
                  if (choicer.result === 1) {
                     napsta.face = 'right';
                  }
                  await dialogue('auto', ...[ text.a_foundry.blookdate4a, text.a_foundry.blookdate4b ][choicer.result]);
                  let primed = true;
                  if (choicer.result === 1) {
                     primed = false;
                  }
                  await renderer.pause(1350);
                  napsta.face = 'down';
                  await dialogue('auto', ...text.a_foundry.blookdate5());
                  if (choicer.result === 1) {
                     napsta.face = 'right';
                  }
                  await dialogue('auto', ...[ text.a_foundry.blookdate6a, text.a_foundry.blookdate6b ][choicer.result]);
                  if (choicer.result === 0) {
                     const chillLoader = content.amNapstachords.load();
                     await Promise.all([
                        content.ieHomeworld.load(),
                        napsta.walk(renderer, 3, { x: 140 }, { x: 160, y: 105 }).then(async () => {
                           await renderer.pause(450);
                           napsta.face = 'left';
                        }),
                        renderer.pause(350).then(() => player.walk(renderer, 3, { x: 160, y: 135 }))
                     ]);
                     await antifreeze([ chillLoader, renderer.pause(1250) ]);
                     napsta.alpha.value = 0;
                     const napsta2 = new CosmosSprite({
                        position: napsta.position.subtract(0, 5),
                        anchor: 0,
                        rotation: 90,
                        priority: 999999,
                        frames: [ napsta.sprite.frames[0] ]
                     });
                     renderer.attach('main', napsta2);
                     player.face = 'right';
                     player.rotation.value = -90;
                     player.sprite.anchor.y = 0;
                     player.position.y -= 5;
                     player.priority.value = 9999999;
                     await renderer.pause(850);
                     await dialogue('auto', ...text.a_foundry.blookdate7);
                     await renderer.pause(500);
                     const level = new CosmosValue();
                     renderer.layers.below.modifiers = [];
                     const pc = instance('main', 'f_blookpc')!.object;
                     const bg = renderer.layers.below.objects.filter(
                        obj => obj instanceof CosmosSprite
                     )[0] as CosmosSprite;
                     const moosic = music.napstachords.instance(renderer);
                     moosic.rate.value = 0;
                     moosic.gain.value = 0;
                     const coolwaver = new Filter(shaders.waver.vert, shaders.waver.frag, {
                        size: 480,
                        phase: 0,
                        widthTop: 1 / 40,
                        widthBottom: 1 / 40,
                        yoffset: 0
                     });
                     const ch = new CosmosAnimation({
                        rotation: 90,
                        anchor: 0,
                        position: { x: 160, y: 160 },
                        resources: content.iocFriskLeftChara,
                        priority: 99999999
                     });
                     const fg = new CosmosSprite({
                        area: renderer.area,
                        alpha: 0,
                        frames: [ content.ieHomeworld ],
                        scale: 0.5,
                        filters: [ coolwaver ],
                        priority: 99999
                     }).on('pre-render', function () {
                        this.position.set(renderer.resolve({ x: 0, y: 0 }));
                     });
                     renderer.attach('main', fg, ...(SAVE.data.b.oops ? [] : [ ch ]));
                     const normal = game.music!.gain.value;
                     const ticker = () => {
                        pc.alpha.value = 1 - level.value;
                        bg.alpha.value = 1 - level.value;
                        fg.alpha.value = level.value;
                        ch.alpha.value = level.value * 0.2;
                        moosic.gain.value = level.value * 0.8;
                        game.music!.gain.value = normal * (1 - level.value);
                        if (roomState.customs) {
                           (roomState.customs as CosmosInstance).gain.value =
                              (1 - level.value) * (roomState.customsLevel as number);
                        }
                        coolwaver.uniforms.phase += 0.0025;
                     };
                     let activated = false;
                     let falseactivated = false;
                     renderer.pause(7000).then(() => {
                        if (primed) {
                           activated = true;
                           moosic.rate.value = 1;
                           level.modulate(renderer, 7000, 1);
                        } else {
                           falseactivated = true;
                        }
                     });
                     renderer.on('tick', ticker);
                     renderer.layers.base.container.alpha = 0;
                     await renderer.pause(3000);
                     await directionalInput();
                     primed = false;
                     player.position.y += 5;
                     player.sprite.anchor.y = 1;
                     player.rotation.value = 0;
                     player.face = 'up';
                     await level.modulate(renderer, level.value * 2500, 0);
                     renderer.layers.base.container.alpha = 1;
                     renderer.off('tick', ticker);
                     ticker();
                     moosic.stop();
                     content.amNapstachords.unload();
                     renderer.detach('main', fg, ...(SAVE.data.b.oops ? [] : [ ch ]));
                     content.ieHomeworld.unload();
                     await renderer.pause(1000);
                     player.priority.value = 0;
                     renderer.detach('main', napsta2);
                     napsta.face = 'down';
                     napsta.alpha.value = 1;
                     await renderer.pause(850);
                     await dialogue(
                        'auto',
                        ...(activated
                           ? text.a_foundry.blookdate8
                           : falseactivated
                           ? text.a_foundry.blookdate8y
                           : text.a_foundry.blookdate8x)
                     );
                     napsta.face = 'up';
                     await renderer.pause(850);
                     napsta.face = 'down';
                     await renderer.pause(1000);
                     await dialogue('auto', ...text.a_foundry.blookdate9);
                  }
                  await napsta.walk(renderer, 3, { x: 90 }, { y: 235 });
                  SAVE.data.n.state_foundry_blookdate = 2;
                  roomState.blookie = void 0;
                  game.movement = true;
                  await napsta.alpha.modulate(renderer, 500, 0);
                  renderer.detach('main', napsta);
               } else {
                  game.movement = true;
               }
            }
            break;
         }
         case 'blooktouch': {
            if (game.movement && game.menu) {
               switch (game.room) {
                  case 'f_napstablook':
                     if (SAVE.data.n.state_foundry_blookdate < 2) {
                        game.movement = false;
                        await dialogue('auto', ...text.a_foundry.blooktouch1());
                        if (world.sad_ghost) {
                           if (choicer.result === 0) {
                              if (SAVE.data.b.f_state_blookbetray) {
                                 await dialogue('auto', ...text.a_foundry.blooksorryY);
                              } else {
                                 await dialogue('auto', ...text.a_foundry.blooksorry1());
                                 if (choicer.result === 0) {
                                    await dialogue('auto', ...text.a_foundry.blooksorry2());
                                    if (choicer.result === 0) {
                                       SAVE.data.n.state_wastelands_napstablook = 3;
                                       await dialogue('auto', ...text.a_foundry.blooksorry3);
                                    } else {
                                       SAVE.data.b.f_state_blookbetray = true;
                                       await dialogue('auto', ...text.a_foundry.blooksorryX);
                                    }
                                 } else {
                                    SAVE.data.b.f_state_blookbetray = true;
                                    await dialogue('auto', ...text.a_foundry.blooksorryX);
                                 }
                              }
                           }
                        } else {
                           switch (choicer.result) {
                              case 0:
                                 if (SAVE.data.b.f_state_ghosthug) {
                                    await dialogue('auto', ...text.a_foundry.blooktouch2a2);
                                 } else {
                                    SAVE.data.b.f_state_ghosthug = true;
                                    await dialogue('auto', ...text.a_foundry.blooktouch2a1);
                                 }
                                 break;
                              case 1:
                                 if (SAVE.data.b.f_state_ghostsleep) {
                                    await dialogue('auto', ...text.a_foundry.blooktouch2b2);
                                 } else {
                                    SAVE.data.b.f_state_ghostsleep = true;
                                    await dialogue('auto', ...text.a_foundry.blooktouch2b1);
                                 }
                                 break;
                              case 2:
                                 switch (SAVE.data.n.state_foundry_swansong) {
                                    case 0:
                                       await dialogue('auto', ...text.a_foundry.blooktouch2c1);
                                       SAVE.data.n.state_foundry_swansong = 1;
                                       break;
                                    case 1:
                                    case 2:
                                       await dialogue(
                                          'auto',
                                          ...[ text.a_foundry.blooktouch2c2, text.a_foundry.blooktouch2c2x ][
                                             SAVE.data.n.state_foundry_swansong - 1
                                          ]()
                                       );
                                       if ((choicer.result as number) === 0) {
                                          const secretLoader = content.amSecretsong.load();
                                          await dialogue('auto', ...text.a_foundry.blooktouch2c3b);
                                          if (player.position.y < 120 && player.position.x > 200) {
                                             player.walk(renderer, 3, { x: 200 }).then(() => {
                                                player.face = 'right';
                                             });
                                          }
                                          const blooky = roomState.blookie as CosmosCharacter;
                                          await blooky.walk(renderer, 3, { y: 85 });
                                          await renderer.pause(350);
                                          sounds.menu.instance(renderer).rate.value = 1.25;
                                          await renderer.pause(650);
                                          sounds.menu.instance(renderer).rate.value = 1.25;
                                          await renderer.pause(1150);
                                          sounds.equip.instance(renderer).rate.value = 1.25;
                                          if (roomState.customs) {
                                             roomState.customs.rate.value = 0;
                                          } else {
                                             game.music?.stop();
                                          }
                                          await antifreeze([ secretLoader, renderer.pause(1450) ]);
                                          renderer.pause(850).then(() => {
                                             blooky.face = ultimaFacer(blooky, true);
                                          });
                                          const mus = music.secretsong.instance(renderer);
                                          mus.gain.value /= 4;
                                          mus.gain.modulate(renderer, 300, mus.gain.value * 4);
                                          await mus.on('stop');
                                          content.amSecretsong.unload();
                                          blooky.face = 'up';
                                          await renderer.pause(1650);
                                          sounds.menu.instance(renderer).rate.value = 1.25;
                                          if (roomState.customs) {
                                             roomState.customs.rate.value = roomState.customs.daemon.rate;
                                             roomState.customs.gain.modulate(renderer, 300, roomState.customsLevel);
                                          } else {
                                             quickresume(true);
                                          }
                                          await renderer.pause(1250);
                                          await blooky.walk(renderer, 3, { y: 100 });
                                          blooky.face = ultimaFacer(blooky, true);
                                          await renderer.pause(850);
                                          await dialogue('auto', ...text.a_foundry.blooktouch2c4());
                                          if ((choicer.result as number) === 0) {
                                             blooky.face = ultimaFacer(blooky);
                                             await dialogue('auto', ...text.a_foundry.blooktouch2c5a);
                                             SAVE.data.n.state_foundry_swansong = 3;
                                          } else {
                                             await dialogue('auto', ...text.a_foundry.blooktouch2c5b);
                                             SAVE.data.n.state_foundry_swansong = 4;
                                          }
                                          blooky.face = 'up';
                                       } else {
                                          await dialogue('auto', ...text.a_foundry.blooktouch2c3a);
                                          SAVE.data.n.state_foundry_swansong = 2;
                                       }
                                       break;
                                    case 3:
                                    case 4:
                                       await dialogue(
                                          'auto',
                                          ...[ text.a_foundry.blooktouch2d1, text.a_foundry.blooktouch2d2 ][
                                             SAVE.data.n.state_foundry_swansong - 3
                                          ]
                                       );
                                       break;
                                 }
                                 break;
                           }
                        }
                        game.movement = true;
                     }
                     break;
                  case 'f_blooky':
                     if (!game.movement) {
                        return;
                     }
                     if (SAVE.data.n.state_foundry_blookdate === 2) {
                        game.movement = false;
                        await dialogue('auto', ...text.a_foundry.blookyard1());
                        game.movement = true;
                     }
                     break;
                  case 'f_snail':
                     if (!game.movement) {
                        return;
                     }
                     if (SAVE.data.n.state_foundry_blookdate === 2) {
                        game.movement = false;
                        if (SAVE.data.n.state_foundry_thundersnail < 1) {
                           await dialogue('auto', ...text.a_foundry.blooksnail1());
                        } else {
                           await dialogue('auto', ...text.a_foundry.blooksnail1i());
                        }
                        if (choicer.result === 0) {
                           const snailAssets = new CosmosInventory(
                              content.iooFTronsnail1,
                              content.iooFTronsnail2,
                              content.iooFTronsnail3,
                              content.asBoom,
                              content.asDepower
                           );
                           snailAssets.name = 'snailAssets';
                           const snailLoader = snailAssets.load();
                           const thunderLoader = content.amThundersnail.load();
                           const blooky = roomState.blookie as CosmosCharacter;
                           blooky.face = 'up';
                           if (saver.gold < 10) {
                              await dialogue('auto', ...text.a_foundry.blooksnail2a);
                           } else {
                              saver.gold -= 10;
                           }
                           if (SAVE.data.n.state_foundry_thundersnail < 1) {
                              await dialogue('auto', ...text.a_foundry.blooksnail3);
                           } else {
                              await dialogue('auto', ...text.a_foundry.blooksnail3i);
                           }
                           game.music?.stop();
                           game.menu = false;
                           game.movement = true;
                           const cam = new CosmosObject({
                              position: player.position.value()
                           });
                           game.camera = cam;
                           const anim = new CosmosAnimation({
                              active: true,
                              position: { x: 20, y: 80 },
                              resources: content.iooFThundertron
                           }).on('tick', () => {
                              player.position.x > 320 && (player.position.x = 320);
                           });
                           renderer.attach('main', anim);
                           let index = 0;
                           while (anim.index < 12) {
                              await renderer.on('tick');
                              if (anim.index !== index) {
                                 if ((index = anim.index) < 3) {
                                    sounds.menu.instance(renderer);
                                 } else {
                                    sounds.menu.instance(renderer).rate.value = 2;
                                 }
                              }
                           }
                           anim.disable();
                           const snail1 = new CosmosAnimation({
                              anchor: { x: 1, y: 1 },
                              position: anim.position.add(26, 20),
                              scale: { x: 0, y: 2 },
                              priority: 81,
                              resources: content.iooFTronsnail1
                           });
                           let origin1 = snail1.position.x;
                           const trail1 = new CosmosRectangle({
                              fill: 0x05070d,
                              anchor: { y: 0 },
                              size: { x: 5, y: 5 },
                              priority: 77,
                              position: snail1.position.subtract(7.5, 0),
                              objects: [
                                 new CosmosRectangle({
                                    fill: 0x1c2a4f,
                                    anchor: { y: 0 },
                                    size: { x: 3, y: 3 },
                                    position: { x: 1 },
                                    objects: [
                                       new CosmosRectangle({
                                          fill: 0x618fde,
                                          anchor: { y: 0 },
                                          size: { x: 1, y: 1 },
                                          position: { x: 1 }
                                       }).on('tick', function () {
                                          this.size.x = 1 + (snail1.position.x - origin1);
                                       })
                                    ]
                                 }).on('tick', function () {
                                    this.size.x = 3 + (snail1.position.x - origin1);
                                 })
                              ]
                           }).on('tick', function () {
                              this.size.x = 5 + (snail1.position.x - origin1);
                           });
                           const snail2 = new CosmosAnimation({
                              anchor: { x: 1, y: 1 },
                              position: anim.position.add(26, 40),
                              scale: { x: 0, y: 2 },
                              priority: 82,
                              resources: content.iooFTronsnail2
                           });
                           let origin2 = snail2.position.x;
                           const trail2 = new CosmosRectangle({
                              fill: 0x0d0606,
                              anchor: { y: 0 },
                              size: { x: 5, y: 5 },
                              priority: 78,
                              position: snail2.position.subtract(7.5, 0),
                              objects: [
                                 new CosmosRectangle({
                                    fill: 0x4d2723,
                                    anchor: { y: 0 },
                                    size: { x: 3, y: 3 },
                                    position: { x: 1 },
                                    objects: [
                                       new CosmosRectangle({
                                          fill: 0xcacaca,
                                          anchor: { y: 0 },
                                          size: { x: 1, y: 1 },
                                          position: { x: 1 }
                                       }).on('tick', function () {
                                          this.size.x = 1 + (snail2.position.x - origin2);
                                       })
                                    ]
                                 }).on('tick', function () {
                                    this.size.x = 3 + (snail2.position.x - origin2);
                                 })
                              ]
                           }).on('tick', function () {
                              this.size.x = 5 + (snail2.position.x - origin2);
                           });
                           const snail3 = new CosmosAnimation({
                              anchor: { x: 1, y: 1 },
                              position: anim.position.add(26, 60),
                              scale: { x: 0, y: 2 },
                              priority: 83,
                              resources: content.iooFTronsnail3
                           });
                           let origin3 = snail3.position.x;
                           const trail3 = new CosmosRectangle({
                              fill: 0x0d0c05,
                              anchor: { y: 0 },
                              size: { x: 5, y: 5 },
                              priority: 79,
                              position: snail3.position.subtract(7.5, 0),
                              objects: [
                                 new CosmosRectangle({
                                    fill: 0x4d471d,
                                    anchor: { y: 0 },
                                    size: { x: 3, y: 3 },
                                    position: { x: 1 },
                                    objects: [
                                       new CosmosRectangle({
                                          fill: 0xd8cf67,
                                          anchor: { y: 0 },
                                          size: { x: 1, y: 1 },
                                          position: { x: 1 }
                                       }).on('tick', function () {
                                          this.size.x = 1 + (snail3.position.x - origin3);
                                       })
                                    ]
                                 }).on('tick', function () {
                                    this.size.x = 3 + (snail3.position.x - origin3);
                                 })
                              ]
                           }).on('tick', function () {
                              this.size.x = 5 + (snail3.position.x - origin3);
                           });
                           await antifreeze([ snailLoader, renderer.pause(500) ]);
                           renderer.attach('main', snail1, snail2, snail3);
                           snail1.anchor.x = 0;
                           snail1.position.x -= 9;
                           snail1.scale.modulate(renderer, 200, { x: 1.2, y: 0.6 }, { x: 1, y: 1 }).then(() => {
                              snail1.anchor.x = 1;
                              snail1.position.x += 9;
                           });
                           await renderer.pause(500);
                           snail2.anchor.x = 0;
                           snail2.position.x -= 9;
                           snail2.scale.modulate(renderer, 200, { x: 1.2, y: 0.6 }, { x: 1, y: 1 }).then(() => {
                              snail2.anchor.x = 1;
                              snail2.position.x += 9;
                           });
                           await renderer.pause(500);
                           snail3.anchor.x = 0;
                           snail3.position.x -= 9;
                           snail3.scale.modulate(renderer, 200, { x: 1.2, y: 0.6 }, { x: 1, y: 1 }).then(() => {
                              snail3.anchor.x = 1;
                              snail3.position.x += 9;
                           });
                           await antifreeze([ thunderLoader, renderer.pause(1000) ]);
                           const raceText = new CosmosText({
                              fill: 0xffffff,
                              position: { x: 160, y: 50 },
                              anchor: 0,
                              fontFamily: content.fMarsNeedsCunnilingus,
                              fontSize: 10
                           });
                           renderer.attach('main', raceText);
                           raceText.content = text.a_foundry.blooksnailX.a;
                           await renderer.pause(1000);
                           raceText.content = text.a_foundry.blooksnailX.b;
                           await renderer.pause(1000);
                           raceText.content = text.a_foundry.blooksnailX.c;
                           await renderer.pause(1000);
                           raceText.content = text.a_foundry.blooksnailX.d;
                           renderer.pause(2500).then(() => {
                              raceText.content = '';
                           });
                           sounds.boom.instance(renderer).rate.value = 1.25;
                           const muzak = music.thundersnail.instance(renderer);
                           renderer.attach('main', trail1, trail2, trail3);
                           snail1.enable();
                           snail1.velocity.x = 0.17;
                           snail2.enable();
                           snail2.velocity.x = 0.18;
                           snail3.enable();
                           snail3.velocity.x = 0.13;
                           // oh no no no no KEKW
                           if (SAVE.data.s.state_foundry_deathroom === 'f_snail') {
                              snail1.velocity.x *= 2;
                              snail2.velocity.x *= 2;
                           }
                           let sad = 0;
                           let hits = 0;
                           let timerr = 0;
                           const rad = rand_rad(rng.overworld.next());
                           const interactListener = () => {
                              if (game.movement) {
                                 hits++;
                                 sounds.notify.instance(renderer);
                                 if (timerr === 0) {
                                    const notifier = new CosmosAnimation({
                                       anchor: { x: 0, y: 1 },
                                       position: renderer.projection(
                                          snail3.position.subtract(9, 14),
                                          game.camera.position
                                       ),
                                       resources: content.ibuNotify
                                    });
                                    renderer.attach('menu', notifier);
                                    const oldspeed = snail3.velocity.x;
                                    snail3.velocity.x = 0;
                                    renderer
                                       .when(() => timerr <= 0)
                                       .then(() => {
                                          renderer.detach('menu', notifier);
                                          if (game.movement && sad === 0) {
                                             if (hits < 2) {
                                                snail3.velocity.x = oldspeed + 0.01;
                                             } else if (hits === 2) {
                                                snail3.velocity.x = oldspeed;
                                             } else if (hits > 2) {
                                                snail3.velocity.x = Math.max(oldspeed - 0.01 * hits, 0);
                                             }
                                             hits = 0;
                                          }
                                       });
                                 }
                                 timerr = SAVE.data.b.oops ? 22 + rad.int(16) : 11 + rad.int(8);
                                 if (hits > 90) {
                                    snail1.velocity.x = 0.4;
                                    snail2.velocity.x = 0.44;
                                 } else if (hits > 70) {
                                    sad = 3;
                                    snail3.alpha.modulate(renderer, 300, 1, 0);
                                 } else if (hits > 50) {
                                    sad = 2;
                                    snail3.scale.modulate(renderer, 300, { x: 1.1, y: -0.8 }, { x: 1.1, y: -0.8 });
                                 } else if (hits > 30) {
                                    sad = 1;
                                    snail3.anchor.y = -1;
                                    snail3.scale.y = -1;
                                 }
                              }
                           };
                           keys.interactKey.on('down', interactListener);
                           let win1 = false;
                           snail3.on('tick', () => {
                              timerr = Math.max(timerr - 1, 0);
                              if (target - 10 <= snail3.position.x) {
                                 win1 = true;
                              }
                           });
                           const target = anim.position.x + 260;
                           await renderer.when(
                              () => target <= Math.max(snail1.position.x, snail2.position.x, snail3.position.x)
                           );
                           const win2 = target <= snail3.position.x;
                           muzak.stop();
                           content.amThundersnail.unload();
                           sounds.noise.instance(renderer);
                           keys.interactKey.off('down', interactListener);
                           snail1.reset();
                           snail1.velocity.x = 0;
                           snail2.reset();
                           snail2.velocity.x = 0;
                           snail3.reset();
                           snail3.velocity.x = 0;
                           raceText.content = text.a_foundry.blooksnailX.e;
                           game.movement || (await renderer.when(() => game.movement));
                           game.movement = false;
                           await renderer.pause(2500);
                           renderer.detach('main', raceText);
                           snail1.anchor.x = 0;
                           snail1.position.x -= 9;
                           origin1 -= 9;
                           snail1.scale.modulate(renderer, 200, { x: 1.1, y: 0.8 }, { x: 0, y: 2 });
                           const ppromise = renderer.pause(500).then(async () => {
                              snail2.anchor.x = 0;
                              snail2.position.x -= 9;
                              origin2 -= 9;
                              snail2.scale.modulate(renderer, 200, { x: 1.1, y: 0.8 }, { x: 0, y: 2 });
                              await renderer.pause(500);
                              snail3.anchor.x = 0;
                              snail3.position.x -= 9;
                              origin3 -= 9;
                              await snail3.scale.modulate(renderer, 200, { x: 1.1, y: 0.8 }, { x: 0, y: 2 });
                              renderer.detach('main', snail1, snail2, snail3);
                              sounds.depower.instance(renderer);
                              await renderer.pause(280);
                              anim.alpha.value = 0;
                              trail1.alpha.value = 0;
                              trail2.alpha.value = 0;
                              trail3.alpha.value = 0;
                              await renderer.pause(420 - 320);
                              anim.alpha.value = 1;
                              trail1.alpha.value = 1;
                              trail2.alpha.value = 1;
                              trail3.alpha.value = 1;
                              await renderer.pause(570 - 420);
                              anim.alpha.value = 0;
                              trail1.alpha.value = 0;
                              trail2.alpha.value = 0;
                              trail3.alpha.value = 0;
                              await renderer.pause(650 - 570);
                              anim.alpha.value = 1;
                              trail1.alpha.value = 1;
                              trail2.alpha.value = 1;
                              trail3.alpha.value = 1;
                              await renderer.pause(720 - 650);
                              renderer.detach('main', anim, trail1, trail2, trail3);
                           });
                           await renderer.pause(500);
                           blooky.face = 'right';
                           if (sad === 0) {
                              if (win1) {
                                 if (win2) {
                                    SAVE.data.b.f_state_thundersnail_win = true;
                                    await dialogue('auto', ...text.a_foundry.blooksnail4a);
                                    saver.gold += 20;
                                 } else {
                                    await dialogue('auto', ...text.a_foundry.blooksnail4b);
                                    saver.gold += 40;
                                 }
                              } else {
                                 await dialogue('auto', ...text.a_foundry.blooksnail4c);
                              }
                           } else if (sad === 1) {
                              await dialogue('auto', ...text.a_foundry.blooksnail4d);
                           } else if (sad === 2) {
                              await dialogue('auto', ...text.a_foundry.blooksnail4e);
                           } else {
                              await dialogue('auto', ...text.a_foundry.blooksnail4f);
                           }
                           SAVE.data.n.state_foundry_thundersnail += 1;
                           cam.position.set(cam.position.clamp(...renderer.region));
                           await cam.position.step(renderer, 3, player.position.clamp(...renderer.region));
                           game.camera = player;
                           game.menu = true;
                           quickresume();
                           await ppromise;
                           snailAssets.unload();
                        } else {
                           if (SAVE.data.n.state_foundry_thundersnail < 1) {
                              await dialogue('auto', ...text.a_foundry.blooksnail2b);
                           } else {
                              await dialogue('auto', ...text.a_foundry.blooksnail2b0);
                           }
                        }
                        game.movement = true;
                     }
                     break;
               }
            }
            break;
         }
         case 'saver': {
            if (!game.movement || !roomState.canSaveMK) {
               return;
            }
            roomState.rescue = true;
            game.movement = false;
            break;
         }
         case 'undyneboss': {
            if (!game.movement || SAVE.data.n.plot > 47 || helmetdyne()) {
               return;
            }
            game.movement = false;
            player.position.x = 500;
            player.face = 'right';
            const fishAssets = new CosmosInventory(inventories.iocUndyne, content.iocUndyneTurn, content.asStrike);
            fishAssets.name = 'fishAssets';
            const fishLoader = fishAssets.load();
            const undyne = new CosmosCharacter({
               position: { x: 500, y: -354 },
               key: 'undyne',
               preset: characters.undyneArmor
            });
            undyne.face = 'up';
            const papyrusKiller = world.dead_skeleton;
            const moosicLoader = papyrusKiller ? content.amYouscreweduppal.load() : content.amUndynepreboss.load();
            header('x1').then(() => {
               undyne.face = 'right';
            });
            header('x2').then(() => {
               undyne.face = 'up';
            });
            header('x3').then(() => {
               undyne.face = 'down';
            });
            header('x4').then(() => {
               undyne.face = 'right';
            });
            header('x5').then(() => {
               undyne.face = 'down';
            });
            await antifreeze([ fishLoader, renderer.pause(1000) ]);
            renderer.attach('main', undyne);
            const ayo = player.position.clamp(...renderer.region);
            const cam = new CosmosObject({ position: ayo });
            game.camera = cam;
            const OGregion = renderer.region[0].y;
            renderer.region[0].y = undyne.position.y;
            await cam.position.modulate(renderer, 3000, { x: player.position.x, y: undyne.position.y });
            await renderer.pause(2000);
            await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal1a());
            await antifreeze([ moosicLoader, renderer.pause(1000) ]);
            if (papyrusKiller) {
               undyne.face = 'right';
               await renderer.pause(850);
               await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal2c1);
               sounds.noise.instance(renderer);
               undyne.preset = characters.undyneStoic;
               const bossmusic = music.youscreweduppal.instance(renderer);
               bossmusic.gain.value /= 4;
               bossmusic.gain.modulate(renderer, 500, bossmusic.gain.value * 4);
               await renderer.pause(1000);
               for (const [ key, face ] of [
                  [ 'x1', 'down' ],
                  [ 'x2', 'right' ],
                  [ 'x3', 'down' ],
                  [ 'x4', 'right' ],
                  [ 'x5', 'down' ],
                  [ 'x6', 'right' ],
                  [ 'x7', 'left' ],
                  [ 'x8', 'down' ],
                  [ 'x9', 'left' ],
                  [ 'x10', 'up' ],
                  [ 'x11', 'down' ]
               ] as [string, CosmosDirection][]) {
                  header(key).then(() => {
                     undyne.face = face;
                  });
               }
               await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal2c2());
               Promise.race([ events.on('teleport-start'), renderer.when(() => scriptState.battlefall) ]).then(
                  async () => {
                     scriptState.battlefall || (await bossmusic.gain.modulate(renderer, 300, 0));
                     bossmusic.stop();
                     content.amYouscreweduppal.unload();
                  }
               );
            } else {
               await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal1b());
               dialogueSession.active = true;
               atlas.switch(null);
               atlas.attach(renderer, 'menu', 'dialoguerBottom');
               const overtop = new CosmosRectangle({
                  alpha: 0,
                  fill: 0xffffff,
                  size: { x: 320, y: 240 }
               });
               renderer.attach('menu', overtop);
               const bpm = 180;
               const beatsPer = 4;
               const measureTime = (1 / (bpm / (60 * beatsPer))) * 1000;
               const bossmusic = music.undynepreboss.instance(renderer);
               Promise.race([ events.on('teleport-start'), renderer.when(() => scriptState.battlefall) ]).then(
                  async () => {
                     scriptState.battlefall || (await bossmusic.gain.modulate(renderer, 300, 0));
                     bossmusic.stop();
                     content.amUndynepreboss.unload();
                  }
               );
               renderer.layers.below.modifiers = [];
               renderer.layers.above.modifiers = [];
               const OG2 = renderer.region.slice() as CosmosRegion;
               const halv = cam.position.clamp(...renderer.region);
               const allObjects = [
                  cam,
                  ...renderer.layers.below.objects,
                  ...renderer.layers.main.objects,
                  ...renderer.layers.above.objects
               ];
               renderer.region = [
                  { x: -Infinity, y: -Infinity },
                  { x: Infinity, y: Infinity }
               ];
               for (const object of allObjects) {
                  object.position.set(object.position.subtract(halv));
               }
               renderer.zoom.value = 1.6;
               renderer.rotation.value = 15;
               overtop.alpha.value = 1;
               overtop.alpha.modulate(renderer, 250, 0);
               sounds.strike.instance(renderer);
               dialogue_primitive(...text.a_foundry.undynefinal1c());
               await renderer.pause(measureTime);
               renderer.zoom.value = 1.8;
               renderer.rotation.value = -20;
               overtop.alpha.value = 1;
               overtop.alpha.modulate(renderer, 250, 0);
               sounds.strike.instance(renderer);
               dialogue_primitive(...text.a_foundry.undynefinal1d());
               await renderer.pause(measureTime);
               renderer.zoom.value = 2.0;
               renderer.rotation.value = 25;
               overtop.alpha.value = 1;
               overtop.alpha.modulate(renderer, 250, 0);
               sounds.strike.instance(renderer);
               dialogue_primitive(...text.a_foundry.undynefinal1e());
               await renderer.pause(measureTime);
               renderer.zoom.value = 1.8;
               renderer.rotation.value = 0;
               overtop.alpha.value = 1;
               overtop.alpha.modulate(renderer, 250, 0).then(async () => {
                  await overtop.alpha.modulate(renderer, measureTime - 250, 1);
                  await renderer.pause(measureTime / 2);
                  await overtop.alpha.modulate(renderer, measureTime - 250, 0);
                  renderer.detach('menu', overtop);
               });
               sounds.strike.instance(renderer);
               dialogue_primitive(...text.a_foundry.undynefinal1f);
               await renderer.pause(measureTime);
               renderer.zoom.value = 1;
               for (const object of allObjects) {
                  object.position.set(object.position.add(halv));
               }
               renderer.region = OG2;
               atlas.detach(renderer, 'menu', 'dialoguerBottom');
               typer.reset(true);
               dialogueSession.active = false;
               const turner = new CosmosAnimation({
                  position: undyne.position.value(),
                  anchor: { x: 0, y: 1 },
                  resources: content.iocUndyneTurn
               });
               renderer.detach('main', undyne);
               renderer.attach('main', turner);
               renderer
                  .when(() => turner.index === 8)
                  .then(() => {
                     turner.disable();
                  });
               await renderer.pause(measureTime * 2);
               turner.enable();
               await renderer.pause(measureTime * 2);
               renderer.detach('main', turner);
               renderer.attach('main', undyne);
               undyne.preset = characters.undyne;
               undyne.face = 'down';
               await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal1g());
               if (world.trueKills > 0) {
                  await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal2b1);
                  const torielKiller = SAVE.data.n.state_wastelands_toriel === 2;
                  const outlandsKiller = world.trueKills === SAVE.data.n.kills_wastelands + (torielKiller ? 1 : 0);
                  if (outlandsKiller) {
                     await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal2b1b);
                  } else {
                     await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal2b1a);
                  }
                  await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal2b2());
                  const dogeKiller = SAVE.data.n.state_foundry_doge === 1;
                  const muffetKiller = SAVE.data.n.state_foundry_muffet === 1;
                  const eliteKiller = dogeKiller && muffetKiller;
                  const dogsKiller = SAVE.data.n.state_starton_dogs === 2;
                  const greatdogKiller = SAVE.data.n.state_starton_greatdog === 2;
                  const lesserdogKiller = SAVE.data.n.state_starton_lesserdog === 2;
                  const doggoKiller = SAVE.data.n.state_starton_doggo === 2;
                  const dogScore =
                     (dogsKiller ? 1 : 0) +
                     (greatdogKiller ? 1 : 0) +
                     (lesserdogKiller ? 1 : 0) +
                     (doggoKiller ? 1 : 0);
                  const dummyKiller = SAVE.data.n.state_foundry_maddummy === 1;
                  if (dogScore === 4) {
                     if (eliteKiller) {
                        if (world.trueKills - 7 > 9) {
                           await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal2b2a);
                        } else {
                           await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal2b2b);
                        }
                     } else {
                        await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal2b2d);
                     }
                  } else if (dogScore === 3) {
                     if (!greatdogKiller) {
                        await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal2b2u1);
                     } else if (!dogsKiller) {
                        await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal2b2u2);
                     } else if (!lesserdogKiller) {
                        await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal2b2u3);
                     } else {
                        await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal2b2u4);
                     }
                  } else if (dogScore === 2) {
                     if (greatdogKiller && dogsKiller) {
                        await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal2b2v1);
                     } else if (greatdogKiller && lesserdogKiller) {
                        await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal2b2v2);
                     } else if (greatdogKiller && doggoKiller) {
                        await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal2b2v3);
                     } else if (dogsKiller && lesserdogKiller) {
                        await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal2b2v4);
                     } else if (dogsKiller && doggoKiller) {
                        await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal2b2v5);
                     } else {
                        await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal2b2v6);
                     }
                  } else if (eliteKiller) {
                     await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal2b2c);
                  } else if (dogeKiller) {
                     await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal2b2g);
                  } else if (greatdogKiller) {
                     await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal2b2h);
                  } else if (dogsKiller) {
                     await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal2b2i);
                  } else if (lesserdogKiller) {
                     await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal2b2j);
                  } else if (doggoKiller) {
                     await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal2b2k);
                  } else if (muffetKiller) {
                     await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal2b2f);
                  } else if (dummyKiller) {
                     await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal2b2e);
                  } else if (torielKiller) {
                     await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal2b2l);
                  } else if (SAVE.data.n.kills_foundry === world.popmax(1)) {
                     await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal2b2m);
                  } else if (SAVE.data.n.kills_starton === world.popmax(0)) {
                     await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal2b2n);
                  } else if (SAVE.data.n.kills_foundry > 1) {
                     await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal2b2o);
                  } else if (SAVE.data.n.kills_starton > 1) {
                     await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal2b2p);
                  } else if (
                     SAVE.data.n.kills_foundry === 1 &&
                     SAVE.data.n.kills_starton === 1 &&
                     SAVE.data.n.kills_wastelands === 1
                  ) {
                     await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal2b2q1);
                  }
                  if (
                     SAVE.data.n.kills_foundry === 2 &&
                     SAVE.data.n.kills_starton === 2 &&
                     SAVE.data.n.kills_wastelands === 2
                  ) {
                     await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal2b2q2);
                  }
                  if (
                     SAVE.data.n.kills_foundry === 3 &&
                     SAVE.data.n.kills_starton === 3 &&
                     SAVE.data.n.kills_wastelands === 3
                  ) {
                     await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal2b2q3);
                  }
                  if (
                     SAVE.data.n.kills_foundry === 4 &&
                     SAVE.data.n.kills_starton === 4 &&
                     SAVE.data.n.kills_wastelands === 4
                  ) {
                     await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal2b2q4);
                  }
                  if (
                     SAVE.data.n.kills_foundry === 5 &&
                     SAVE.data.n.kills_starton === 5 &&
                     SAVE.data.n.kills_wastelands === 5
                  ) {
                     await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal2b2q5);
                  } else if (outlandsKiller) {
                     await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal2b2r());
                  } else if (world.trueKills === 1) {
                     await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal2b2s);
                  } else {
                     await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal2b2t);
                  }
                  await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal2b3());
               } else {
                  await dialogue('dialoguerBottom', ...text.a_foundry.undynefinal2a());
               }
            }
            SAVE.data.n.plot = 47.1;
            await cam.position.modulate(renderer, 3000, ayo);
            renderer.detach('main', undyne);
            fishAssets.unload();
            renderer.region[0].y = OGregion;
            game.camera = player;
            if (!SAVE.data.b.oops) {
               await dialogue('dialoguerTop', ...text.a_foundry.truetext.preundyne);
            }
            game.movement = true;
            break;
         }
         case 'undynefight': {
            if (args[0] === 'truetp') {
               scriptState.truetp = true;
               scriptState.truetpPromise = teleport('f_exit', 'right', 20, 100, world);
               return;
            }
            if (!game.movement || SAVE.data.n.plot > 47.1) {
               return;
            }
            if (helmetdyne()) {
               game.menu = false;
               SAVE.data.n.plot = 47.2;
               const spd = 4;
               const fish2 = temporary(
                  character('fish2', characters.undyneArmor, { x: 400, y: 220 }, 'right', {
                     metadata: { tags: [ 'feesh' ] }
                  }).on('tick', async function () {
                     if (!game.movement) {
                        return;
                     }
                     if (Math.abs(player.position.x - this.position.x) <= 40) {
                        this.move({
                           x: Math.min(player.position.x - this.position.x, 4),
                           y: Math.min(player.position.y - this.position.y, 4)
                        });
                        if (this.position.extentOf(player) < 20) {
                           game.movement = false;
                           await battler.encounter(player, groups.undyne, false);
                           renderer.detach('main', fish2);
                           game.movement = true;
                           game.menu = true;
                           return;
                        }
                     } else {
                        this.position.x += spd;
                        if (this.position.x < 440) {
                           this.sprite.enable();
                        } else if (this.position.x < 460) {
                           this.position.y -= spd;
                           if (this.face === 'right') {
                              this.sprite.reset();
                              this.face = 'up';
                              this.sprite.enable();
                           }
                        } else if (this.position.x < 540) {
                           if (this.face === 'up') {
                              this.sprite.reset();
                              this.face = 'right';
                              this.sprite.enable();
                           }
                        } else if (this.position.x < 560) {
                           this.position.y += spd;
                           if (this.face === 'right') {
                              this.sprite.reset();
                              this.face = 'down';
                              this.sprite.enable();
                           }
                        } else if (this.face === 'down') {
                           this.sprite.reset();
                           this.face = 'right';
                           this.sprite.enable();
                        }
                     }
                     this.sprite.duration = Math.round(15 / spd);
                     if (this.sprite.index % 2 === 1 && this.sprite.step === 0) {
                        sounds.stomp.instance(renderer).gain.value *= Math.min(
                           Math.max(
                              CosmosMath.remap(
                                 Math.abs(160 - renderer.projection(this, game.camera.position).x),
                                 0,
                                 1,
                                 640,
                                 20
                              ),
                              0
                           ),
                           1
                        );
                     }
                  }),
                  'main'
               );
               fish2.idle = false;
               return;
            }
            groups.undyne.assets.load();
            opponents.undyne.assets.load();
            const eggo = eggoAssets.load();
            game.movement = false;
            await dialogue('dialoguerTop', ...text.a_foundry.undynefinal3());
            (foundryStates.scripts.undyneboss ??= {}).battlefall = true;
            dialogue('dialoguerTop', ...text.a_foundry.undynefinal3x);
            await header('x1');
            typer.reset(true);
            const diver = new CosmosAnimation({
               active: true,
               anchor: { x: 0, y: 1 },
               position: player.position.subtract(0, 200),
               resources: content.iocUndyneDive
            }).on('tick', async () => {
               diver.position.y += 240 / 30;
               const s = quickshadow(diver, diver, 'main', 0.5, 2, 0.00001);
               s.priority.value = -100;
            });
            renderer.attach('main', diver);
            await renderer.when(() => diver.position.y > player.position.y - 30);
            renderer.detach('main', diver);
            battler.encounter_state.movement = true;
            await Promise.all([ eggo, battler.encounter(player, groups.undyne, false).then(() => (game.menu = false)) ]);
            if (SAVE.data.n.plot < 48) {
               SAVE.data.n.plot = 47.2;
               chaseloop();
            } else {
               world.postnoot && world.nootflags.add('undyne');
               eggoAssets.unload();
               if (battler.encounter_state.movement) {
                  game.movement = true;
               }
               game.menu = true;
            }
            break;
         }
         case 'viewchat': {
            scriptState.ticks ??= 0;
            if (SAVE.data.n.plot_kidd < 4 && !SAVE.data.b.oops) {
               const dist = Math.abs(500 - player.position.x);
               if (dist < 120 && player.face === 'up' && player.position.y < 110) {
                  if (scriptState.ticks++ === 30 * 3) {
                     if (!SAVE.data.b.f_state_viewchat && SAVE.data.n.plot_kidd < 3.4) {
                        await renderer.when(() => game.movement);
                        await dialogue('dialoguerBottom', ...text.a_foundry.truetext.view1);
                        SAVE.data.b.f_state_viewchat = true;
                     }
                  }
               } else {
                  scriptState.ticks = 0;
               }
            }
            break;
         }
         case 'temmiepat': {
            if (!game.movement) {
               return;
            }
            game.movement = false;
            const TTG = instance('main', 'f_temmie7')!;
            const anim = TTG.object.objects.filter(obj => obj instanceof CosmosAnimation)[0] as CosmosAnimation;
            const resources = anim.resources;
            const centerX = TTG.object.position.x + anim.anchor.x * (anim.compute().x / -2);
            if (Math.abs(player.position.x - centerX) < 3) {
               anim.use(resources === content.iocTemmieLeft ? content.iocTemmieLeftTalk : content.iocTemmieRightTalk);
            } else {
               anim.use(player.position.x < centerX ? content.iocTemmieLeftTalk : content.iocTemmieRightTalk);
            }
            if (SAVE.data.n.state_foundry_tempet === 0) {
               await TTG.talk('a', talkFinder(), 'auto', ...text.a_foundry.temmiepat1());
               if (choicer.result === 0) {
                  await TTG.talk('a', talkFinder(), 'auto', ...text.a_foundry.temmiepat2a);
                  SAVE.data.n.state_foundry_tempet = 1;
               } else {
                  await TTG.talk('a', talkFinder(), 'auto', ...text.a_foundry.temmiepat2b);
                  SAVE.data.n.state_foundry_tempet = 2;
               }
            } else {
               await TTG.talk(
                  'a',
                  talkFinder(),
                  'auto',
                  ...[ text.a_foundry.temmiepat3a, text.a_foundry.temmiepat3b ][SAVE.data.n.state_foundry_tempet - 1]
               );
            }
            anim.use(resources);
            game.movement = true;
            break;
         }
         case 'mirror': {
            if (player.face === 'down') {
               if (SAVE.data.b.f_state_temstatue) {
                  await dialogue('auto', ...text.a_foundry.temstatueAftuh());
               } else {
                  SAVE.data.b.f_state_temstatue = true;
                  sounds.switch.instance(renderer);
                  await dialogue('auto', ...text.a_foundry.temstatue());
               }
            } else {
               await dialogue('auto', ...text.a_foundry.temstatueNormuh());
            }
            break;
         }
         case 'mushroomdance': {
            if (!game.movement) {
               return;
            }
            const mushguy = instance('main', 'f_mushroomdance');
            if (mushguy) {
               if (SAVE.data.n.plot === 47.2) {
                  await dialogue('auto', ...text.a_foundry.noShroom);
                  break;
               }
               game.movement = false;
               if (SAVE.data.n.plot === 72) {
                  if (SAVE.data.b.svr) {
                     music.uwa.instances[0].rate.value = 0;
                  } else {
                     music.reunited.instances[0].rate.value = 0;
                  }
               } else {
                  game.music!.rate.value = 0;
               }
               const anim = mushguy.object.objects.filter(x => x instanceof CosmosAnimation)[0] as CosmosAnimation;
               anim.enable();
               await renderer.when(() => anim.index === anim.frames.length - 1 && anim.step === anim.duration - 1);
               atlas.attach(renderer, 'menu', 'dialoguerTop');
               dialogue_primitive(...text.a_foundry.mushroomdance1);
               let x = 0;
               let end = false;
               const musiiiiiii = music.mushroomdance.instance(renderer);
               const ticker = () => {
                  anim.position.x = Math.sin(++x / 6) * 2;
                  if (end && Math.abs(anim.position.x - 0) < 0.5) {
                     anim.off('tick', ticker);
                  }
               };
               anim.on('tick', ticker);
               anim.reset().use(content.ionFMushroomdance2).enable();
               await renderer.pause(5000);
               await renderer.when(() => anim.index === anim.frames.length - 1 && anim.step === anim.duration - 1);
               end = true;
               musiiiiiii.stop();
               atlas.detach(renderer, 'menu', 'dialoguerTop');
               anim.reset().use(content.ionFMushroomdance3).enable();
               await renderer.when(() => anim.index === anim.frames.length - 1);
               anim.disable();
               typer.reset(true);
               await renderer.pause(1000);
               await dialogue('auto', ...text.a_foundry.mushroomdance2());
               anim.reverse = true;
               anim.enable();
               await renderer.when(() => anim.index === 0 && anim.step === anim.duration - 1);
               anim.reset().use(content.ionFMushroomdance1).enable();
               anim.index = anim.frames.length - 1;
               await renderer.when(() => anim.index === 0 && anim.step === anim.duration - 1);
               anim.disable();
               anim.reverse = false;
               if (SAVE.data.n.plot === 72) {
                  SAVE.data.b.f_state_mushroomdanceEpilogue = true;
               } else if (10 <= world.trueKills) {
                  SAVE.data.b.f_state_mushroomdanceGeno = true;
               } else {
                  SAVE.data.b.f_state_mushroomdance = true;
               }
               game.movement = true;
               if (SAVE.data.n.plot === 72) {
                  if (SAVE.data.b.svr) {
                     music.uwa.instances[0].rate.value = music.uwa.rate;
                  } else {
                     music.reunited.instances[0].rate.value = music.reunited.rate * (world.runaway ? 0.4 : 1);
                  }
               } else {
                  game.music!.rate.value = world.ambiance;
               }
            }
            break;
         }
         case 'shop': {
            if (game.movement) {
               switch (args[0]) {
                  case 'tortoise':
                     if (SAVE.data.b.svr) {
                        await dialogue('auto', ...text.a_foundry.shopclosed);
                        player.position.y += 3;
                        player.face = 'down';
                     } else if (SAVE.data.n.plot === 47.2) {
                        await dialogue('auto', ...text.a_foundry.noTortoise());
                        player.position.y += 3;
                        player.face = 'down';
                     } else {
                        shopper.open(shops.tortoise, 'down', 520, 105, !world.runaway);
                     }
                     break;
                  case 'tem':
                     if (SAVE.data.b.svr) {
                        await dialogue('auto', ...text.a_foundry.shopclosed);
                        player.position.y += 3;
                        player.face = 'down';
                     } else if (SAVE.data.n.plot === 47.2) {
                        await dialogue('auto', ...text.a_foundry.noTem);
                        player.position.y += 3;
                        player.face = 'down';
                     } else {
                        shopper.open(shops.tem, 'down', 320, 170, !temgone());
                     }
                     break;
               }
            }
            break;
         }
         case 'fallenfish': {
            if (!game.movement) {
               return;
            }
            if (SAVE.data.b.water) {
               game.movement = false;
               if (Math.abs(100 - player.position.y) > 3) {
                  await player.walk(renderer, 3, { y: 100 });
               }
               await player.walk(renderer, 3, { x: 100 });
               player.face = 'left';
               (roomState.water as Vow).confirm();
            } else {
               await dialogue('auto', ...text.a_foundry.fallenfish);
               player.face = 'right';
               player.position.x += 3;
            }
            break;
         }
         case 'fallenfish2': {
            if (!game.movement) {
               return;
            }
            if (SAVE.data.b.water && ultimaFacer({ position: { x: 60, y: 100 }, size: { x: 49 } }) === 'right') {
               game.movement = false;
               player.face = 'left';
               await waterpour();
               await dialogue('auto', ...text.a_foundry.fallenfish3);
               game.movement = true;
            } else {
               await dialogue('auto', ...text.a_foundry.fallenfish2);
            }
            break;
         }
         case 'watercooler': {
            if (!game.movement) {
               return;
            }
            if (SAVE.data.b.water) {
               await dialogue('auto', ...text.a_foundry.watercooler3());
            } else {
               await dialogue('auto', ...text.a_foundry.watercooler1());
               if (choicer.result === 0) {
                  SAVE.data.b.water = true;
                  sounds.equip.instance(renderer);
                  await dialogue('auto', ...text.a_foundry.watercooler2a);
               } else {
                  await dialogue('auto', ...text.a_foundry.watercooler2b);
               }
            }
            break;
         }
         case 'jumpsuit_item': {
            if (game.movement && !SAVE.data.b.item_jumpsuit) {
               game.movement = false;
               if (SAVE.storage.inventory.size < 8) {
                  SAVE.data.b.item_jumpsuit = true;
                  saver.add('flight_suit');
                  sounds.equip.instance(renderer);
                  instance('main', 'jumpsuit_item')?.destroy();
                  await dialogue('auto', ...text.a_foundry.jumpsuit1());
                  if (choicer.result === 0) {
                     atlas.switch(autoNav());
                     await use('flight_suit', SAVE.storage.inventory.contents.indexOf('flight_suit'));
                     atlas.switch(null);
                  } else {
                     await dialogue('auto', ...text.a_foundry.noequip);
                  }
               } else {
                  await dialogue('auto', ...text.a_foundry.jumpsuit2);
               }
               game.movement = true;
            }
            break;
         }
         case 'boots': {
            if (game.movement && !SAVE.data.b.item_boots) {
               game.movement = false;
               if (SAVE.storage.inventory.size < 8) {
                  SAVE.data.b.item_boots = true;
                  saver.add('boots');
                  sounds.equip.instance(renderer);
                  instance('main', 'f_booties')?.destroy();
                  await dialogue('auto', ...text.a_foundry.boots1());
                  if (choicer.result === 0) {
                     atlas.switch(autoNav());
                     await use('boots', SAVE.storage.inventory.contents.indexOf('boots'));
                     atlas.switch(null);
                  } else {
                     await dialogue('auto', ...text.a_foundry.noequip);
                  }
               } else {
                  await dialogue('auto', ...text.a_foundry.boots2);
               }
               game.movement = true;
            }
            break;
         }
         case 'exit': {
            if (!game.movement) {
               return;
            }
            game.movement = false;
            if (!world.genocide && SAVE.data.n.plot < 48) {
               await dialogue('auto', ...text.a_foundry.finalpre());
               if (choicer.result === 0) {
                  oops();
               } else {
                  player.position.x -= 3;
                  player.face = 'left';
                  game.movement = true;
                  break;
               }
            }
            await teleport('a_start', 'right', 20, 280, world);
            game.movement = true;
            break;
         }
         case 'kitchencall': {
            if (
               !SAVE.data.b.kitchencall &&
               !world.genocide &&
               !world.edgy_x &&
               SAVE.data.n.state_starton_papyrus === 0 &&
               SAVE.data.n.plot_date < 1.2
            ) {
               SAVE.data.b.kitchencall = true;
               sounds.phone.instance(renderer);
               await dialogue('auto', ...text.a_foundry.kitchencall());
            }
            break;
         }
         case 'unddate': {
            if (args[0] === 'sit') {
               if (!game.movement) {
                  return;
               }
               game.movement = false;
               await dialogue('auto', ...text.a_foundry.unddate14());
               if (choicer.result === 0) {
                  roomState.sittah = true;
               } else {
                  game.movement = true;
               }
               break;
            } else if (args[0] === 'fish') {
               if (!game.movement) {
                  return;
               }
               game.movement = false;
               await dialogue('auto', ...text.a_foundry.unddate13());
               if (choicer.result === 0) {
                  if (roomState.snacked) {
                     await dialogue('auto', ...text.a_foundry.unddate13a5());
                  } else {
                     await dialogue('auto', ...text.a_foundry.unddate13a1);
                     roomState.snack = true;
                     await renderer.when(() => roomState.snacked);
                  }
               } else {
                  await dialogue(
                     'auto',
                     ...CosmosUtils.provide(
                        [ text.a_foundry.unddate13b, text.a_foundry.unddate13c, text.a_foundry.unddate13d ][
                           choicer.result - 1
                        ]
                     )
                  );
               }
               game.movement = true;
               break;
            } else if (args[0] === 'snack') {
               if (game.movement) {
                  if (SAVE.storage.inventory.size < 8) {
                     sounds.equip.instance(renderer);
                     saver.add('snack');
                     instance('main', 'snacc')?.destroy();
                     await dialogue('auto', ...text.a_foundry.unddate13a4b);
                  } else {
                     await dialogue('auto', ...text.a_foundry.unddate13a4a);
                  }
               }
               break;
            }
            if (!game.movement || roomState.entered) {
               break;
            }
            game.movement = false;
            if (SAVE.data.n.plot_date < 1.2) {
               await dialogue('auto', ...text.a_foundry.unddate0());
               SAVE.data.n.plot_date = 1.2;
            } else {
               await dialogue('auto', ...text.a_foundry.unddate0x());
            }
            if (world.trueKills === 0 && SAVE.data.n.state_foundry_undyne === 0) {
               if (choicer.result === 0) {
                  roomState.entered = true;
                  await dialogue('auto', ...text.a_foundry.unddate1a);
               } else {
                  await dialogue('auto', ...text.a_foundry.unddate1b());
                  game.movement = true;
                  break;
               }
            } else {
               game.movement = true;
               break;
            }
            const papy = roomState.papdater as CosmosCharacter;
            papy.metadata.override = true;
            papy.face = 'up';
            {
               if (player.position.y <= 125 && player.position.x > 140 && player.position.x < 180) {
                  await player.walk(renderer, 3, { x: player.position.x < 160 ? 140 : 180 });
               }
               if (player.position.y !== papy.position.y + 10) {
                  await player.walk(renderer, 3, { y: papy.position.y + 10 });
               }
               if (player.position.x !== papy.position.x) {
                  await player.walk(renderer, 3, { x: papy.position.x });
               }
               player.position.set(papy.position.add(0, 10));
               player.face = 'up';
            }
            await renderer.pause(1400);
            const handout = new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               position: papy.position,
               resources: content.iocPapyrusPresent2
            });
            renderer.detach('main', papy);
            renderer.attach('main', handout);
            await dialogue('auto', ...text.a_foundry.unddate2a);
            handout.enable();
            await renderer.when(() => handout.index === 4);
            handout.disable();
            await renderer.pause(1400);
            await dialogue('auto', ...text.a_foundry.unddate2b);
            while (handout.index > 0) {
               handout.index--;
               await renderer.pause(250);
            }
            renderer.detach('main', handout);
            renderer.attach('main', papy);
            await renderer.pause(1400);
            const knocker = new CosmosAnimation({
               active: true,
               anchor: { x: 0, y: 1 },
               position: papy.position,
               resources: content.iocPapyrusKnock
            });
            renderer.detach('main', papy);
            renderer.attach('main', knocker);
            sounds.knock.instance(renderer);
            await renderer.pause(1000);
            renderer.detach('main', knocker);
            renderer.attach('main', papy);
            await renderer.pause(600);
            const trueMusic = roomState.trueMusic as CosmosInstance;
            await trueMusic.gain.modulate(renderer, 300, 0);
            await renderer.pause(2000);
            const undyne = character('undyneDate', characters.undyneDate, { x: 160, y: 115 }, 'down');
            const door = instance('main', 'f_undyne_door')!.object;
            const anim = door.objects[0] as CosmosAnimation;
            anim.enable();
            await renderer.when(() => anim.index === 3);
            sounds.electrodoor.instance(renderer);
            await renderer.when(() => anim.index === 7);
            anim.disable();
            await renderer.pause(1200);
            await dialogue('auto', ...text.a_foundry.unddate3);
            await papy.walk(renderer, 3, papy.position.subtract(30, 0));
            papy.face = 'right';
            await dialogue('auto', ...text.a_foundry.unddate4());
            undyne.face = 'up';
            undyne.alpha.modulate(renderer, 300, 0);
            await papy.walk(renderer, 3, papy.position.add(30, 0));
            await papy.walk(renderer, 3, door.position);
            papy.metadata.barrier = false;
            papy.alpha.modulate(renderer, 300, 0);
            const barrier = instance('main', 'f_unddate_barrier')!.object.objects[0] as CosmosHitbox;
            barrier.metadata.barrier = false;
            barrier.metadata.trigger = true;
            barrier.metadata.name = 'teleport';
            barrier.metadata.args = [ 'f_kitchen', 'up', '160', '230' ];
            SAVE.data.n.plot_date = 1.3;
            events.on('teleport').then(() => {
               renderer.detach('main', undyne);
            });
            game.movement = true;
            break;
         }
         case 'undynehouse': {
            if (game.movement) {
               if (2 <= SAVE.data.n.plot_date) {
                  await dialogue('auto', ...text.a_foundry.undynehouse2());
               } else if (!roomState.papdater) {
                  await dialogue('auto', ...text.a_foundry.undynehouse1);
                  if (SAVE.data.n.plot === 47.2) {
                     SAVE.data.b.f_state_undynecheck = true;
                  }
               }
            }
            break;
         }
         case 'npc86': {
            const inst = instance('main', 'f_npc86');
            if (inst) {
               const talk = (...lines: string[]) => inst.talk('a', talkFinder(), 'auto', ...lines);
               if (SAVE.data.n.plot === 72) {
                  await talk(...text.a_foundry.npc86x());
               } else if (SAVE.data.n.plot === 47.2) {
                  await talk(...text.a_foundry.npc86z());
               } else if (SAVE.data.n.state_foundry_npc86 === 0) {
                  await talk(...text.a_foundry.npc86a());
                  if (choicer.result === 0) {
                     await talk(...text.a_foundry.npc86b());
                     SAVE.data.n.state_foundry_npc86 = (choicer.result + 2) as 2 | 3 | 4 | 5;
                  } else {
                     SAVE.data.n.state_foundry_npc86 = 1;
                  }
                  await talk(...text.a_foundry.npc86c);
               } else if (SAVE.data.n.state_foundry_npc86_mood === 0) {
                  await talk(...text.a_foundry.npc86d());
                  SAVE.data.n.state_foundry_npc86_mood = (choicer.result + 1) as 1 | 2 | 3 | 4;
                  await talk(...text.a_foundry.npc86e());
               } else if (SAVE.data.n.state_foundry_npc86_feelings === 0) {
                  await talk(...text.a_foundry.npc86f());
                  SAVE.data.n.state_foundry_npc86_feelings = (choicer.result + 1) as 1 | 2 | 3 | 4;
                  await talk(...text.a_foundry.npc86g());
               } else {
                  await talk(...text.a_foundry.npc86h());
                  SAVE.data.b.f_state_done86 = true;
               }
            }
            break;
         }
         case 'hapstadoor': {
            game.movement = false;
            if (
               !SAVE.data.b.f_state_hapstadoor &&
               (SAVE.data.n.plot < 72 || !SAVE.data.b.a_state_hapstablook || world.runaway)
            ) {
               if (!SAVE.data.b.item_mystery_key) {
                  await dialogue('auto', ...text.a_foundry.hapstadoor1());
                  player.position.y += 3;
                  player.face = 'down';
                  game.movement = true;
                  break;
               } else {
                  SAVE.data.b.f_state_hapstadoor = true;
                  await dialogue('auto', ...text.a_foundry.hapstadoor2);
               }
            }
            await teleport('f_hapstablook', 'up', 170, 230, world);
            game.movement = true;
            break;
         }
         case 'napcomputer': {
            if (roomState.blookie || !game.movement || ghostpartyCondition()) {
               break;
            }
            game.movement = false;
            for (const object of instance('main', 'f_blookpc')!.object.objects) {
               if (object instanceof CosmosAnimation) {
                  object.index = 1;
                  sounds.select.instance(renderer).rate.value = 0.6;
                  await dialogue('auto', ...text.a_foundry.napcomputer1());
                  if (postSIGMA()) {
                     break;
                  }
                  if (choicer.result === 0) {
                     const napster = new CosmosObject({
                        fill: 0xffffff,
                        stroke: -1,
                        fontFamily: content.fDeterminationSans,
                        fontSize: 8,
                        objects: [
                           new CosmosSprite({ scale: 0.5, frames: [ content.iooFNapster ] }),
                           ...CosmosUtils.populate(8, div => {
                              const index = div % 6;
                              const downloaded = div < 6;
                              const textsource = downloaded ? text.a_foundry.napcomputer3 : text.a_foundry.napcomputer4;
                              return new CosmosText({
                                 anchor: { y: 0 },
                                 position: { x: 40, y: ((downloaded ? 101 : 371) + index * 25) / 2 },
                                 content: textsource.a()[index],
                                 objects: [
                                    new CosmosText({
                                       anchor: { y: 0 },
                                       position: { x: 247 / 2 },
                                       content: textsource.b()[index]
                                    })
                                 ]
                              });
                           })
                        ]
                     });
                     renderer.attach('menu', napster);
                     object.index = 0;
                     await renderer.pause(500);
                     await keys.specialKey.on('down');
                     renderer.detach('menu', napster);
                  } else {
                     object.index = 0;
                     await dialogue('auto', ...text.a_foundry.napcomputer2);
                  }
                  break;
               }
            }
            game.movement = true;
            break;
         }
         case 'darktoriel': {
            if (!game.movement || player.face !== 'up') {
               return;
            }
            const dt = instance('main', 'darktoriel');
            if (dt) {
               const an = dt.object.objects[0] as CosmosAnimation;
               if (SAVE.data.n.plot_epilogue < 5) {
                  game.movement = false;
                  SAVE.data.n.plot_epilogue = 5;
                  await dt?.talk('a', talkFinder(), 'auto', ...text.a_foundry.darktoriel1);
                  await renderer.pause(1650);
                  an.use(content.iocTorielDownTalk);
                  await dt?.talk('a', talkFinder(), 'auto', ...text.a_foundry.darktoriel2);
                  await renderer.pause(1250);
                  await dt?.talk('a', talkFinder(), 'auto', ...text.a_foundry.darktoriel3);
                  an.use(content.iocTorielPhoneTalk);
                  await renderer.pause(1250);
                  await dt?.talk('a', talkFinder(), 'auto', ...text.a_foundry.darktoriel4a);
                  an.use(content.iocTorielDownTalk);
                  await dt?.talk('a', talkFinder(), 'auto', ...text.a_foundry.darktoriel4b);
                  await renderer.pause(1650);
                  if (SAVE.data.b.c_state_secret1) {
                     SAVE.data.b.c_state_secret1_used = true;
                     await dt?.talk(
                        'a',
                        talkFinder(),
                        'auto',
                        ...text.a_foundry.darktoriel5a,
                        ...text.a_foundry.darktoriel6
                     );
                  } else {
                     an.use(content.iocTorielSad);
                     await dt?.talk(
                        'a',
                        talkFinder(),
                        'auto',
                        ...text.a_foundry.darktoriel5b,
                        ...text.a_foundry.darktoriel6
                     );
                  }
                  game.movement = true;
               } else {
                  await dt?.talk('a', talkFinder(), 'auto', ...text.a_foundry.darktoriel7());
               }
            }
            break;
         }
      }
   }
};

const shops = {
   tortoise: new OutertaleShop({
      persist () {
         return !world.runaway;
      },
      background: new CosmosSprite({ frames: [ content.isTortoiseBackground ] }),
      async handler () {
         if (atlas.target === 'shop') {
            if (shopper.index === 1) {
               if (shops.tortoise.vars.sell || SAVE.data.b.steal_tortoise) {
                  await shopper.text(...text.n_shop_tortoise.sell2());
               } else {
                  shops.tortoise.vars.sell = true;
                  if (world.runaway) {
                     saver.gold += 1394;
                     SAVE.data.b.steal_tortoise = true;
                  }
                  await shopper.text(...text.n_shop_tortoise.sell1());
               }
            } else if (shopper.index === 3) {
               if (!world.runaway) {
                  atlas.switch('shopText');
                  await dialogue_primitive(...text.n_shop_tortoise.exit());
               } else {
                  game.text = '';
                  atlas.switch('shopText');
               }
               const mus = shops.tortoise.music?.instances.slice(-1)[0];
               await Promise.all([
                  renderer.alpha.modulate(renderer, 300, 0),
                  mus?.gain.modulate(renderer, 300, 0).then(() => {
                     mus.stop();
                  })
               ]);
               atlas.switch(null);
               renderer.alpha.modulate(renderer, 300, 1);
            } else if (world.runaway && shopper.index === 2) {
               await shopper.text(...text.n_shop_tortoise.note);
            } else {
               atlas.switch('shopList');
            }
         } else if (atlas.target === 'shopList') {
            if (shopper.listIndex === 4) {
               atlas.switch('shop');
            } else if (shopper.index === 0) {
               atlas.switch('shopPurchase');
            } else {
               await shopper.text(...text.n_shop_tortoise.talkText[shopper.listIndex]());
            }
         }
      },
      keeper: (() => {
         const arm = new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.isTortoiseArm ] });
         const head = new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.isTortoiseKeeper });
         const pre = speech.presets.of('basic');
         const spr = new CosmosSprite({
            position: { x: 160, y: 120 },
            metadata: { tickx: 0 },
            objects: [ arm, new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.isTortoiseBody ] }), head ]
         }).on('tick', function () {
            if (typer.mode === 'read' && speech.state.preset === pre) {
               if (++this.metadata.tickx === 12) {
                  this.metadata.tickx = 0;
               }
            } else {
               this.metadata.tickx = 0;
            }
            const x = [ 0, 2, 4, 2 ][Math.floor(this.metadata.tickx / 3)];
            arm.position.set(x, x / 2);
            head.position.set(0, x);
         });
         return spr;
      })(),
      music: music.shop,
      options () {
         if (atlas.target === 'shop') {
            return text.n_shop_tortoise.menu();
         } else if (shopper.index === 0) {
            return text.n_shop_tortoise.item();
         } else {
            return text.n_shop_tortoise.talk();
         }
      },
      preset (index) {
         (shops.tortoise.keeper.objects[2] as CosmosAnimation).index = index;
      },
      price () {
         return SAVE.data.n.plot === 72
            ? [ SAVE.data.b.item_padd ? 25 : 35, SAVE.data.b.item_goggles ? 25 : 35, 5, 5 ][shopper.listIndex]
            : [
                 SAVE.data.b.item_padd ||
                 world.genocide ||
                 world.killed0 ||
                 startonATE() ||
                 SAVE.data.s.state_foundry_deathroom === 'f_hub'
                    ? 45
                    : 55,
                 SAVE.data.b.item_goggles ||
                 world.genocide ||
                 world.killed0 ||
                 startonATE() ||
                 SAVE.data.s.state_foundry_deathroom === 'f_hub'
                    ? 45
                    : 55,
                 16,
                 25
              ][shopper.listIndex];
      },
      prompt () {
         return text.n_shop_tortoise.itemPurchasePrompt();
      },
      purchase (buy) {
         let success = false;
         if (buy) {
            if (SAVE.storage.inventory.size < 8) {
               if (world.runaway) {
                  success = true;
               } else {
                  const price = CosmosUtils.provide(shops.tortoise.price);
                  if (saver.gold < price) {
                     shops.tortoise.vars.purchase = 3;
                  } else {
                     shops.tortoise.vars.purchase = 1;
                     saver.gold -= price;
                     success = true;
                  }
               }
            } else {
               shops.tortoise.vars.purchase = 4;
            }
         } else {
            shops.tortoise.vars.purchase = 2;
         }
         if (success) {
            world.runaway ? sounds.grab.instance(renderer) : sounds.purchase.instance(renderer);
            const item = [
               SAVE.data.b.item_padd ||
               world.genocide ||
               world.killed0 ||
               startonATE() ||
               SAVE.data.s.state_foundry_deathroom === 'f_hub'
                  ? 'padd_x'
                  : 'padd',
               SAVE.data.b.item_goggles ||
               world.genocide ||
               world.killed0 ||
               startonATE() ||
               SAVE.data.s.state_foundry_deathroom === 'f_hub'
                  ? 'goggles_x'
                  : 'goggles',
               'tea',
               'sap'
            ][shopper.listIndex];
            saver.add(item);
            if (item === 'padd' || item === 'goggles') {
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
         if (shops.tortoise.vars.purchase || 0 > 0) {
            const purchaseValue = shops.tortoise.vars.purchase as number;
            shops.tortoise.vars.purchase = 0;
            if (world.runaway && purchaseValue < 4) {
               return text.n_shop_tortoise.zeroPrompt;
            } else {
               return text.n_shop_tortoise.itemPurchase()[purchaseValue - 1];
            }
         } else if (atlas.target === 'shop') {
            if (world.runaway) {
               return text.n_shop_tortoise.menuPrompt4;
            } else if (
               world.genocide ||
               world.killed0 ||
               startonATE() ||
               SAVE.data.s.state_foundry_deathroom === 'f_hub'
            ) {
               return text.n_shop_tortoise.menuPrompt3();
            } else if (shops.tortoise.vars.idle) {
               return text.n_shop_tortoise.menuPrompt2();
            } else {
               shops.tortoise.vars.idle = true;
               return text.n_shop_tortoise.menuPrompt1();
            }
         } else if (world.runaway) {
            return text.n_shop_tortoise.zeroPrompt;
         } else if (shopper.index === 0) {
            return text.n_shop_tortoise.itemPrompt();
         } else {
            return text.n_shop_tortoise.talkPrompt();
         }
      },
      tooltip () {
         if ([ 'shopList', 'shopPurchase' ].includes(atlas.target!) && shopper.index === 0) {
            if (shopper.listIndex === 4) {
               return null;
            } else {
               const info = items.of(
                  [
                     SAVE.data.b.item_padd ||
                     world.genocide ||
                     world.killed0 ||
                     startonATE() ||
                     SAVE.data.s.state_foundry_deathroom === 'f_hub'
                        ? 'padd_x'
                        : 'padd',
                     SAVE.data.b.item_goggles ||
                     world.genocide ||
                     world.killed0 ||
                     startonATE() ||
                     SAVE.data.s.state_foundry_deathroom === 'f_hub'
                        ? 'goggles_x'
                        : 'goggles',
                     'tea',
                     'sap'
                  ][shopper.listIndex]
               );
               const calc =
                  info.value -
                  (info.type === 'consumable' || info.type === 'special' ? 0 : items.of(SAVE.data.s[info.type]).value);
               return text.n_shop_tortoise
                  .itemInfo()
                  [shopper.listIndex].replace('$(x)', `${calc < 0 ? '' : '+'}${calc}`);
            }
         } else {
            return null;
         }
      },
      vars: {}
   }),
   tem: new OutertaleShop({
      persist () {
         return !temgone();
      },
      background: new CosmosSprite({ frames: [ content.isTemBackground ] }),
      async handler () {
         if (atlas.target === 'shop') {
            if (shopper.index === 1) {
               if (temgone()) {
                  if (SAVE.data.b.steal_tem) {
                     await shopper.text(...text.n_shop_tem.steal2);
                  } else {
                     saver.gold += 32767;
                     SAVE.data.b.steal_tem = true;
                     await shopper.text(...text.n_shop_tem.steal1);
                  }
               } else if (world.meanie) {
                  if (shops.tem.vars.sell) {
                     await shopper.text(...text.n_shop_tem.sell2);
                  } else {
                     shops.tem.vars.sell = true;
                     await shopper.text(...text.n_shop_tem.sell1);
                  }
               } else {
                  atlas.switch('shopList');
               }
            } else if (shopper.index === 2 && temgone()) {
               await shopper.text(...text.n_shop_tem.note);
            } else if (shopper.index === 3) {
               if (!temgone()) {
                  atlas.switch('shopText');
                  await dialogue_primitive(...text.n_shop_tem.exit);
               } else {
                  game.text = '';
                  atlas.switch('shopText');
               }
               const mus = shops.tem.music?.instances.slice(-1)[0];
               await Promise.all([
                  renderer.alpha.modulate(renderer, 300, 0),
                  mus?.gain.modulate(renderer, 300, 0).then(() => {
                     mus.stop();
                  })
               ]);
               atlas.switch(null);
               renderer.alpha.modulate(renderer, 300, 1);
            } else {
               atlas.switch('shopList');
            }
         } else if (atlas.target === 'shopList') {
            if (shopper.index === 1) {
               if (shopper.listIndex === CosmosUtils.provide(shops.tem.size) - 1) {
                  atlas.switch('shop');
               } else {
                  const item = SAVE.storage.inventory.contents[shopper.listIndex];
                  if ((SAVE.data.b.colleg ? 'sell2' : 'sell1') in items.of(item)) {
                     if (SAVE.data.n.specsell === 0) {
                        SAVE.data.n.specsell = 7;
                        typer.variables.x = CosmosUtils.provide(items.of(item).text.battle.name);
                        atlas.switch('shopText');
                        await dialogue_primitive(...text.n_shop_tem.sellStory1());
                        shops.tem.vars.attempt = 1;
                     }
                     atlas.switch('shopPurchase');
                  } else {
                     dialogue_primitive(text.n_shop_tem.itemRestricted);
                  }
               }
            } else if (shopper.listIndex === 4) {
               atlas.switch('shop');
            } else if (shopper.index === 0) {
               if (shopper.listIndex === 3 && (SAVE.data.b.item_temyarmor || temgone())) {
                  dialogue_primitive(text.n_shop_tem.itemUnavailable());
               } else {
                  atlas.switch('shopPurchase');
               }
            } else {
               await shopper.text(...text.n_shop_tem.talkText[shopper.listIndex]());
            }
         }
      },
      keeper: (() => {
         let ox = 0;
         let crfx = 0;
         let timerr = 0;
         let siner = 0;
         const body = { x: 0, y: 0 };
         const face = { x: 0, y: 0 };
         const offset1 = { x: 0, y: 0 };
         const offset2 = { x: 0, y: 0 };
         const offset3 = { x: 0, y: 0 };

         const bodyS = new CosmosSprite({ frames: [ content.isTemBody ] });
         const eyebrowsS = new CosmosSprite({ frames: [ content.isTemEyebrows ] });
         const eyesS = new CosmosSprite({ active: true });
         const eyesA = new CosmosAnimation({ active: true });
         const mouthS = new CosmosSprite({ active: true });
         const mouthA = new CosmosAnimation({ active: true });
         const sweatA = new CosmosSprite({ frames: [ content.isTemSweat ] });
         const hatS = new CosmosSprite({ frames: [ content.isTemHat ], alpha: 0 });
         const boxS = new CosmosSprite({ frames: [ content.isTemBox ] });
         const coffeeA = new CosmosAnimation({ resources: content.isTemCoffee });

         function display (sprite: CosmosSprite, index: number, x: number, y: number, alpha = 1) {
            sprite.index = index % sprite.frames.length;
            sprite.position.set(x, y);
            sprite.alpha.value = alpha;
         }

         return new CosmosSprite({
            objects: [
               bodyS,
               eyebrowsS,
               new CosmosObject({ objects: [ eyesS, eyesA ] }),
               new CosmosObject({ objects: [ mouthS, mouthA ] }),
               sweatA,
               hatS,
               boxS,
               coffeeA
            ]
         }).on('tick', function () {
            eyebrowsS.alpha.value = 0;
            eyesS.alpha.value = 0;
            eyesA.alpha.value = 0;
            mouthS.alpha.value = 0;
            mouthA.alpha.value = 0;
            sweatA.alpha.value = 0;
            const fx = this.metadata.face as number;
            if (fx !== crfx) {
               timerr = 0;
               face.x = 0;
               face.y = 0;
               body.x = 0;
               body.y = 0;
               crfx = fx;
            }
            siner++;
            display(coffeeA, Math.floor(siner / 8), 178 + ox, Math.floor(62 + Math.sin(siner / 4) * 1.5));
            display(bodyS, 0, 99 + body.x + ox, 1 + body.y);
            switch (fx) {
               case 0:
                  eyesA.use(content.isTemEyes1);
                  mouthA.use(content.isTemMouth1);
                  display(eyebrowsS, 0, Math.floor(138 + offset1.x), Math.floor(32 + offset1.y + face.y / 2));
                  display(eyesA, 0, Math.floor(139 + offset2.x + face.x), Math.floor(40 + offset2.y + face.y));
                  display(mouthA, 0, Math.floor(141 + offset3.x + face.x), Math.floor(48 + offset3.y + face.y));
                  timerr++;
                  if ((timerr > 90 && timerr < 110) || (timerr > 130 && timerr < 150)) {
                     face.x += Math.sin(timerr / 10) * 0.8;
                  } else if (timerr > 190 && timerr < 230) {
                     face.x *= 0.9;
                     face.x <= 0.5 && (face.x = 0);
                  }
                  timerr > 290 && timerr < 310 && (face.y += Math.sin(timerr / 10) * 0.8);
                  timerr > 326 && timerr < 345 && (face.y += Math.sin(timerr / 10) * 1.5);
                  if (timerr > 390 && timerr < 430) {
                     face.y *= 0.9;
                     face.y <= 0.5 && (face.x = 0);
                  } else if (timerr == 460) {
                     timerr = 0;
                  }
                  break;
               case 1:
                  eyesS.frames = [ content.isTemEyes2 ];
                  mouthA.use(content.isTemMouth1);
                  display(
                     eyebrowsS,
                     0,
                     Math.floor(138 + offset1.x),
                     Math.floor(32 + offset1.y + face.y / 2 - Math.sin(timerr / 2))
                  );
                  display(
                     eyesS,
                     0,
                     Math.floor(135 + offset2.x + face.x + (Math.random() * 2 - 1) * 0.8),
                     Math.floor(38 + offset2.y + face.y + (Math.random() * 2 - 1) * 0.8)
                  );
                  display(mouthA, 0, Math.floor(141 + offset3.x + face.x), Math.floor(48 + offset3.y + face.y));
                  break;
               case 2:
                  eyesS.frames = [ content.isTemEyes3 ];
                  mouthA.use(content.isTemMouth2);
                  display(eyebrowsS, 0, Math.floor(138 + offset1.x), Math.floor(32 + offset1.y + face.y / 2));
                  display(eyesS, 0, Math.floor(139 + offset2.x + face.x), Math.floor(40 + offset2.y + face.y));
                  display(
                     mouthA,
                     Math.floor(siner / 3),
                     Math.floor(141 + offset3.x + face.x),
                     Math.floor(48 + offset3.y + face.y)
                  );
                  display(sweatA, 0, 133, 39 + Math.sin(siner / 4) * 1.5, 1 + Math.sin(siner / 4));
                  if ((timerr > 45 && timerr < 55) || (timerr > 65 && timerr < 75)) {
                     face.x += Math.sin(timerr / 5) * 0.8;
                  } else if (timerr > 95 && timerr < 115) {
                     face.x *= 0.9;
                     face.x <= 0.5 && (face.x = 0);
                  } else if (timerr == 140) {
                     timerr = 0;
                  }
                  break;
               case 3:
                  eyesS.frames = [ content.isTemEyes4 ];
                  mouthS.frames = [ content.isTemMouth3 ];
                  face.x = 2;
                  face.y = -2;
                  display(eyesS, 0, Math.floor(137 + offset2.x + face.x), Math.floor(32 + offset2.y + face.y));
                  display(
                     mouthS,
                     Math.floor(siner / 3),
                     Math.floor(146 + offset3.x + face.x),
                     Math.floor(42 + offset3.y + face.y)
                  );
                  break;
               case 4:
                  eyesS.frames = [ content.isTemEyes5 ];
                  mouthS.frames = [ content.isTemMouth3 ];
                  face.y = Math.sin(timerr / 5) * 1.5;
                  display(eyesS, 0, Math.floor(137 + offset2.x + face.x), Math.floor(32 + offset2.y + face.y));
                  display(
                     mouthS,
                     Math.floor(siner / 3),
                     Math.floor(144 + offset3.x + face.x + Math.cos(siner / 1.5) * 1.5),
                     Math.floor(43 + offset3.y + face.y)
                  );
                  display(sweatA, 0, 133, 39 + Math.sin(siner / 4) * 1.5, 1 + Math.sin(siner / 4));
                  break;
               case 5:
                  eyesS.frames = [ content.isTemEyes6 ];
                  mouthS.frames = [ content.isTemMouth3 ];
                  body.x = Math.random() * 2 - 1;
                  body.y = Math.random() * 2 - 1;
                  face.y = Math.sin(timerr / 3) * 2;
                  display(eyesS, 0, Math.floor(137 + offset2.x + face.x), Math.floor(31 + offset2.y + face.y));
                  display(
                     mouthS,
                     Math.floor(siner / 3),
                     Math.floor(144 + offset3.x + face.x + Math.cos(siner) * 2),
                     Math.floor(43 + offset3.y + face.y)
                  );
                  display(sweatA, 0, 133, 39 + Math.sin(siner / 2) * 2, 1 + Math.sin(siner / 2));
                  break;
               case 6:
                  mouthA.use(content.isTemMouth4);
                  display(
                     mouthA,
                     Math.floor(siner / 2),
                     Math.floor(139 + offset2.x + face.x) + ox,
                     Math.floor(25 + offset2.y + face.y)
                  );
                  break;
            }
            fx > 0 && timerr++;
            display(boxS, 0, 80 + ox, 68);
            SAVE.data.b.colleg && display(hatS, 0, 99 + body.x + 37 + ox, 1 + body.y);
            ox = Math.max(ox + (this.metadata.colleg ? 3 : -3), 0);
         });
      })(),
      music: music.temShop,
      options () {
         if (atlas.target === 'shop') {
            return text.n_shop_tem.menu();
         } else if (shopper.index === 0) {
            return text.n_shop_tem.item(armorprice());
         } else if (shopper.index === 1) {
            const prop = SAVE.data.b.colleg ? 'sell2' : 'sell1';
            return [
               ...SAVE.storage.inventory.contents.map(key => {
                  const item = items.of(key);
                  const price = item[prop];
                  if (price === void 0) {
                     return `§fill=#808080§${item.text.battle.name}`;
                  } else {
                     return `${item.text.battle.name} - ${text.n_shop_tem.sellValue.replace('$(x)', price.toString())}`;
                  }
               }),
               text.n_shop_tem.sellExit
            ];
         } else {
            return text.n_shop_tem.talk();
         }
      },
      preset (index) {
         shops.tem.keeper.metadata.face = index;
      },
      price () {
         if (shopper.index === 0) {
            return SAVE.data.n.plot === 72
               ? [ 0, 0, 0, SAVE.data.b.colleg ? armorprice() : 1000 ][shopper.listIndex]
               : [ 4, 2, 20, SAVE.data.b.colleg ? armorprice() : 1000 ][shopper.listIndex];
         } else {
            const att = (shops.tem.vars.attempt || 0) as number;
            const value = items.of(SAVE.storage.inventory.contents[shopper.listIndex])[
               SAVE.data.b.colleg ? 'sell2' : 'sell1'
            ]!;
            if (att > 1) {
               return Math.ceil((value + 1) * 1.25) + 1;
            } else if (att > 0) {
               return value + 1;
            } else {
               return value;
            }
         }
      },
      prompt () {
         return shopper.index === 0
            ? text.n_shop_tem.itemPurchasePrompt(SAVE.data.n.plot === 72 && shopper.listIndex < 3)
            : text.n_shop_tem.itemSellPrompt;
      },
      purchase (buy) {
         let success = false;
         if (buy) {
            if (shopper.index === 1) {
               shops.tem.vars.purchase = 1;
               saver.gold += CosmosUtils.provide(shops.tem.price);
               success = true;
            } else if (SAVE.storage.inventory.size < 8 || (shopper.listIndex === 3 && !SAVE.data.b.colleg)) {
               const price = CosmosUtils.provide(shops.tem.price);
               if (saver.gold < price) {
                  shops.tem.vars.purchase = 3;
               } else {
                  shops.tem.vars.purchase = 1;
                  saver.gold -= price;
                  success = true;
               }
            } else {
               shops.tem.vars.purchase = 4;
            }
         } else {
            shops.tem.vars.purchase = 2;
         }
         if (success) {
            if (shopper.index === 1) {
               shops.tem.vars.attempt = void 0;
               sounds.purchase.instance(renderer);
               if (!SAVE.data.b.oops && SAVE.storage.inventory.contents[shopper.listIndex] === 'heart_locket') {
                  renderer
                     .when(() => atlas.target === null && game.movement)
                     .then(() => {
                        dialogue('auto', ...text.a_foundry.locketseller);
                     });
               }
               SAVE.storage.inventory.remove(shopper.listIndex);
               SAVE.data.n.specsell > 0 && SAVE.data.n.specsell--;
            } else if (shopper.listIndex === 3 && !SAVE.data.b.colleg && !temgone()) {
               shops.tem.vars.purchase = 0;
               sounds.select.instance(renderer);
               atlas.switch('shopText');
               dialogue_primitive(...text.n_shop_tem.colleg1).then(async () => {
                  game.input = false;
                  shops.tem.keeper.metadata.colleg = true;
                  await renderer.pause(3500);
                  SAVE.data.b.colleg = true;
                  shops.tem.keeper.metadata.colleg = false;
                  await renderer.pause(3500);
                  game.input = true;
                  await dialogue_primitive(...text.n_shop_tem.colleg2);
                  atlas.switch('shop');
               });
               return true;
            } else {
               temgone() ? sounds.grab.instance(renderer) : sounds.purchase.instance(renderer);
               const item = [ 'flakes', 'flakes', 'flakes', 'temyarmor' ][shopper.listIndex];
               saver.add(item);
               if (item === 'temyarmor') {
                  SAVE.data.b.item_temyarmor = true;
               }
            }
         } else if (shops.tem.vars.attempt === 1) {
            shops.tem.vars.purchase = 0;
            atlas.switch('shopText');
            dialogue_primitive(...text.n_shop_tem.sellStory2).then(() => {
               shops.tem.vars.attempt = 2;
               atlas.switch('shopPurchase');
            });
            return true;
         } else if (shops.tem.vars.attempt === 2) {
            shops.tem.vars.purchase = 0;
            const inst = (SAVE.data.n.plot === 72 ? (SAVE.data.b.svr ? music.uwa : music.reunited) : music.temShop)
               .instances[0];
            const gain = inst.gain.value;
            inst.gain.value = 0;
            atlas.switch('shopText');
            dialogue_primitive(...text.n_shop_tem.sellStory3()).then(() => {
               shops.tem.vars.attempt = void 0;
               inst.gain.value = gain;
               atlas.switch('shopList');
            });
            return true;
         }
      },
      size () {
         if (atlas.target === 'shop') {
            return 4;
         } else if (shopper.index === 1) {
            return SAVE.storage.inventory.contents.length + 1;
         } else {
            return 5;
         }
      },
      status () {
         if (shops.tem.vars.purchase || 0 > 0) {
            const purchaseValue = shops.tem.vars.purchase as number;
            shops.tem.vars.purchase = 0;
            if (temgone() && purchaseValue < 4) {
               return text.n_shop_tem.zeroPrompt;
            } else {
               return text.n_shop_tem.itemPurchase[purchaseValue - 1];
            }
         } else if (atlas.target === 'shop') {
            return temgone() ? text.n_shop_tem.menuPrompt2 : text.n_shop_tem.menuPrompt1;
         } else if (temgone()) {
            return text.n_shop_tem.zeroPrompt;
         } else if (shopper.index === 0) {
            return text.n_shop_tem.itemPrompt;
         } else {
            return text.n_shop_tem.talkPrompt;
         }
      },
      tooltip () {
         if ([ 'shopList', 'shopPurchase' ].includes(atlas.target!) && shopper.index === 0) {
            if (shopper.listIndex === 4) {
               return null;
            } else {
               if (shopper.listIndex === 3 && (SAVE.data.b.item_temyarmor || temgone())) {
                  return null;
               }
               const info = items.of([ 'flakes', 'flakes', 'flakes', 'temyarmor' ][shopper.listIndex]);
               const calc =
                  info.value -
                  (info.type === 'consumable' || info.type === 'special' ? 0 : items.of(SAVE.data.s[info.type]).value);
               return text.n_shop_tem.itemInfo()[shopper.listIndex].replace('$(x)', `${calc < 0 ? '' : '+'}${calc}`);
            }
         } else {
            return null;
         }
      },
      vars: {}
   })
};

goatbro.on('tick', alphaCheck);
goatbroTrue.on('tick', alphaCheck);
kiddo.on('tick', alphaCheck);
erndyne.on('tick', alphaCheck).on('tick', async function () {
   if (this.metadata.override || this.metadata.tick < 30 || !game.movement || this.position.extentOf(player) > 25) {
      return;
   }
   dialogueSession.movement = false;
   typer.reset(true);
   atlas.switch(null);
   renderer.detach('menu', this.metadata.notifier);
   this.metadata.override = true;
   game.movement = false;
   this.sprite.reset();
   this.metadata.chaser?.stop();
   this.metadata.chaser = null;
   await battler.encounter(
      player,
      groups.undyne,
      false,
      game.room !== 'f_napstablook' || SAVE.data.n.state_foundry_blookmusic === 0
   );
   if (SAVE.data.n.state_foundry_undyne === 2) {
      SAVE.data.s.state_foundry_deathroom = game.room;
      [ 'f_bird', 'f_snail', 'f_chute' ].includes(game.room) || (await renderer.pause(1150));
      switch (game.room) {
         case 'f_chute': {
            quickresume(true);
            game.movement = true;
            await renderer.when(() => game.room === 'f_dummy' && game.movement);
            game.movement = false;
            game.music?.stop();
            await renderer.pause(1150);
         }
         case 'f_dummy': {
            const inst = instance('main', 'f_npc86');
            if (inst) {
               const ogx = player.position.clamp(...renderer.region);
               const cam = new CosmosObject({ position: ogx });
               if (player.position.y > 200) {
                  game.camera = cam;
                  await cam.position.modulate(renderer, 1000, { y: 200 });
               }
               await inst.talk('a', talkFinder(), 'auto', ...text.a_foundry.deathReaction.f_dummy);
               if (player.position.y > 200) {
                  await cam.position.modulate(renderer, 1000, ogx);
                  game.camera = player;
               }
            }
            break;
         }
         case 'f_hub': {
            const inst = instance('main', 'f_clamgirl');
            if (inst) {
               const anim = inst.object.objects.filter(obj => obj instanceof CosmosAnimation)[0] as CosmosAnimation;
               anim.use(content.ionFClamgirl2);
               await inst.talk('a', talkFinder(), 'auto', ...text.a_foundry.deathReaction.f_hub);
               anim.use(content.ionFClamgirl1);
            }
            break;
         }
         case 'f_bird': {
            const bird = new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               active: true,
               position: { x: 1320, y: 80 },
               resources: content.ionFBirdFly
            });
            renderer.attach('main', bird);
            Promise.race([ events.on('teleport'), bird.position.step(renderer, 2, { x: 1100 }) ]).then(() => {
               game.room === 'f_bird' && renderer.detach('main', bird);
            });
            await renderer.pause(1150);
            await dialogue('dialoguerBottom', ...text.a_foundry.deathReaction.f_bird);
            break;
         }
         case 'f_undyne':
            const inst = instance('main', 'f_dummynpc');
            if (inst) {
               await inst.talk('a', talkFinder(), 'auto', ...text.a_foundry.deathReaction.f_undyne);
            }
            break;
         case 'f_blooky': {
            const inst1 = instance('main', 'f_snail1');
            const inst2 = instance('main', 'f_snail2');
            if (inst1 && inst2) {
               let t = 0;
               const ogx = player.position.clamp(...renderer.region);
               const cam = new CosmosObject({ position: ogx });
               if (player.position.x > 160) {
                  game.camera = cam;
                  await cam.position.modulate(renderer, 1000, { x: 160 });
               }
               for (const line of text.a_foundry.deathReaction.f_blooky) {
                  await [ inst1, inst2 ][t].talk('a', talkFinder(), 'auto', line);
                  t = [ 1, 0 ][t];
               }
               if (player.position.x > 160) {
                  await cam.position.modulate(renderer, 1000, ogx);
                  game.camera = player;
               }
            }
            break;
         }
         case 'f_snail': {
            await renderer.pause(650);
            const snail = new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               position: player.position.subtract(0, 60).clamp({}, { x: 290 }),
               scale: { x: 0, y: 2 },
               resources: content.iooFTronsnail2
            });
            renderer.attach('main', snail);
            snail.scale.modulate(renderer, 200, { x: 1.2, y: 0.6 }, { x: 1, y: 1 });
            await renderer.pause(1150);
            speech.targets.add(snail);
            await dialogue('auto', ...text.a_foundry.deathReaction.f_snail());
            speech.targets.delete(snail);
            await renderer.pause(1150);
            await snail.scale.modulate(renderer, 200, { x: 1.1, y: 0.8 }, { x: 0, y: 2 });
            renderer.detach('main', snail);
            break;
         }
      }
   }
   if (SAVE.data.n.plot === 48) {
      world.postnoot && world.nootflags.add('undyne');
      (game.room === 'f_napstablook' && SAVE.data.n.state_foundry_blookmusic !== 0) || quickresume();
      game.menu = true;
      eggoAssets.unload();
   }
   resetPhish();
   this.metadata.override = false;
   game.movement = true;
});

events.on('init-between').then(() => {
   SAVE.data.n.plot === 47.2 && (game.menu = false);
});

events.on('init-overworld').then(() => {
   events.on('teleport').then(() => {
      SAVE.data.n.plot === 47.2 && chaseloop();
   });
});

events.on('loaded').then(() => {
   SAVE.data.n.state_foundry_blookmusic > 0 && !postSIGMA() && updateSpooktunes();
});

events.on('script', (name, ...args) => {
   switch (name) {
      case 'shop':
         if (args[0] === 'tortoise' || args[0] === 'tem') {
            shopper.open(shops[args[0]], args[1] as CosmosDirection, +args[2], +args[3], !world.runaway);
         }
         break;
      case 'foundry':
         foundryScript(args[0], ...args.slice(1));
         break;
      case 'trivia':
         if (game.movement && game.room[0] === 'f') {
            trivia(...CosmosUtils.provide(text.a_foundry.trivia[args[0] as keyof typeof text.a_foundry.trivia]));
         }
         break;
   }
});

events.on('step', () => {
   if (game.movement && SAVE.data.n.plot < 46 && game.room[0] === 'f' && !(world.goatbro && world.kiddo)) {
      switch (game.room) {
         case 'f_corridor':
         case 'f_doge':
         case 'f_quiche':
         case 'f_puzzle1':
         case 'f_puzzle2':
         case 'f_story1':
         case 'f_lobby':
         case 'f_error':
         case 'f_telescope':
         case 'f_stand':
         case 'f_abyss':
         case 'f_muffet':
         case 'f_path':
         case 'f_prepuzzle':
         case 'f_puzzle3':
         case 'f_prespear':
         case 'f_spear':
         case 'f_story2':
         case 'f_pacing':
            return !!runEncounter(
               (SAVE.data.n.kills_foundry + SAVE.data.n.bully_foundry) / world.popmax(1),
               (() => {
                  switch (game.room) {
                     case 'f_doge':
                     case 'f_quiche':
                        return SAVE.data.n.plot < 35 ? 0 : 1;
                     case 'f_puzzle1':
                        return SAVE.data.n.plot < 36 ? 0 : 1;
                     case 'f_puzzle2':
                        return SAVE.data.n.plot < 37 ? 0 : 1;
                     case 'f_story1':
                        return world.genocide && SAVE.data.n.plot < 37.1 ? 0 : 1;
                     case 'f_telescope':
                        return instance('main', 'telescoper') ? 0 : 1;
                     case 'f_stand':
                        return SAVE.data.n.state_starton_lesserdog === 2 ||
                           world.genocide ||
                           world.population_area('s') < 6 ||
                           world.population_area('f') < 6 ||
                           SAVE.data.b.ubershortcut ||
                           SAVE.data.n.plot > 59
                           ? 1
                           : 0;
                     case 'f_abyss':
                        return world.genocide && SAVE.data.n.plot < 38.2 ? 0 : 1;
                     case 'f_muffet':
                        return SAVE.data.n.plot < 39 ? 0 : 1;
                     case 'f_path':
                        return SAVE.data.n.plot_kidd < 4 ? 0 : 1;
                     case 'f_puzzle3':
                        return SAVE.data.n.plot < 45 ? 0 : 1;
                     case 'f_prespear':
                     case 'f_spear':
                        return SAVE.data.n.plot < 46 ? 0 : 1;
                  }
                  return 1;
               })(),
               [
                  [ groups.woshua, 4 ],
                  [ groups.moldbygg, 2 ], // 4 / 2 (1)
                  [ groups.moldfake, 2 ], // 4 / 2 (2)
                  [ groups.moldsmalMoldbygg, 4 ],
                  [ groups.woshuaMoldbygg, 5 ],
                  [ groups.radtile, 5 ]
               ]
            );
         default:
            SAVE.data.n.steps = 0;
            SAVE.data.n.encounters = 0;
            break;
      }
   }
});

export function resetPhish () {
   renderer.detach('menu', erndyne.metadata.notifier);
   erndyne.metadata.tick = 0;
   erndyne.position.set(player);
   for (const entry of tracker.history) {
      entry[0] = player.face;
      entry[1].x = player.position.x;
      entry[1].y = player.position.y;
   }
}

export async function foundryTPE (from: string, to: string) {
   const roomState = (foundryStates.rooms[to] ??= {});
   if (!roomState.steamgap) {
      const sg = instance('below', 'steamgap');
      if (sg) {
         roomState.steamgap = [
            ...new Set(
               (sg.object.objects as CosmosHitbox[]).flatMap(hitbox => {
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
      }
   }
   let index = 0;
   for (const { object } of instances('main', 'hovercrystal')) {
      object.metadata.time = renderer.time;
      if (!object.metadata.sussed) {
         const phase = (index % 6) / 6;
         object.metadata.sussed = true;
         object.on('tick', function () {
            this.offsets[0].y = sineWaver(this.metadata.time, 2000, -2, 2, phase);
         });
         const anim = object.objects[0] as CosmosAnimation;
         anim.index = index % 4;
         anim.step = index % anim.duration;
         index++;
      }
   }
   if (SAVE.data.n.epiphany === 1) {
      const roomState = (foundryStates.rooms.f_truth ??= {});
      if (from === 'f_truth') {
         roomState.fi && renderer.filters?.splice(renderer.filters.indexOf(roomState.fi), 1);
         roomState.fi = void 0;
      } else if (to === 'f_truth') {
         const fi = (roomState.fi ??= new AdvancedBloomFilter({
            threshold: 0.5,
            bloomScale: 0.5,
            quality: 10,
            brightness: 1
         }));
         (renderer.filters ??= []).push(fi);
         const muzi = (roomState.muzi ??= music.splendor.instance(renderer));
         muzi.rate.value = 0.75;
         muzi.gain.modulate(renderer, 300, 0.6);
      }
   }
   if (from === 'f_napstablook' && SAVE.data.n.state_foundry_blookmusic !== 0 && SAVE.data.n.plot === 47.2) {
      erndyne.metadata.chaser?.gain.modulate(renderer, 300, 1);
   }
   switch (to) {
      case 'f_truth': {
         SAVE.data.n.epiphany === 2 && (instance('main', 'tomebox')!.index = 1);
         break;
      }
      case 'f_view': {
         const scale = 0.5;
         const width = 700 * scale;
         const maxPos = renderer.region[1].x;
         const parallax = (maxPos - (width - 320)) / maxPos;
         const mus = !SAVE.data.b.svr && !world.runaway ? music.splendor.instance(renderer) : null;
         temporary(
            new CosmosSprite({
               area: renderer.area,
               alpha: 0.65,
               anchor: { x: 0, y: 1 },
               scale,
               position: { x: width / 2 - renderer.region[0].x * parallax, y: 20 },
               parallax: { x: parallax },
               frames: [ content.iooFViewBackdrop ],
               filters: [ filters.bloomX ]
            }).on('tick', function () {
               if (renderer.layers.below.objects.length !== 0) {
                  const x500 = Math.abs(500 - player.position.x);
                  this.alpha.value = CosmosMath.remap(
                     CosmosMath.bezier(Math.min(x500, 400) / 400, 0.95, 1, 1),
                     0,
                     0.65 + (SAVE.flag.b.$option_epilepsy ? 0.05 : Math.random() * 0.1),
                     1,
                     0.95
                  );
                  const value = Math.min(Math.max(300 - x500, 0) / 250, 1);
                  mus && (mus.gain.value = SAVE.data.n.plot === 72 ? 0 : value * 0.5);
                  galaxy.alpha.value = value * (SAVE.data.n.plot === 72 ? 0.75 : 0.25);
                  const tintValue = CosmosImageUtils.gradient(0xffffff, 0x353535, value);
                  kiddo.tint = tintValue;
                  player.tint = tintValue;
                  goatbroTrue.tint = tintValue;
                  renderer.layers.below.objects[0].tint = tintValue;
               }
            }),
            'main',
            () => {
               mus?.stop();
            }
         );
         if (!SAVE.data.b.svr && !world.runaway) {
         }
         break;
      }
      case 'f_statue': {
         let mus = null as CosmosInstance | null;
         const statue = instance('main', 'statue')!.object.objects[0] as CosmosAnimation;
         const switches = instance('main', 'lightswitch')!.object.objects as CosmosSprite[];
         const light = new CosmosSprite({
            alpha: 0.15,
            position: { x: 200, y: 0 },
            anchor: { x: 0 },
            priority: 10000,
            frames: [ content.iooFOverhead ]
         });
         const solution = new CosmosAnimation({
            active: true,
            alpha: 0,
            anchor: 0,
            position: { x: 200, y: 190 },
            resources: SAVE.data.b.f_state_temstatue ? content.iooFPianosolution2 : content.iooFPianosolution
         });
         const switchTicker = function (this: CosmosSprite) {
            let index = 1;
            this.metadata.stepped = false;
            for (const subject of [ player, kiddo, goatbroTrue ]) {
               if (
                  renderer.layers.main.objects.includes(subject) &&
                  Math.abs(this.position.x - subject.position.x) < 8 &&
                  Math.abs(this.position.y - subject.position.y) < 8
               ) {
                  index = 0;
                  break;
               }
            }
            if (this.index !== index) {
               this.index = index;
               if (switches[0].index === 0 && switches[1].index === 0) {
                  game.menu = false;
                  statue.index = 1;
                  renderer.attach('main', light, solution);
                  solution.alpha.value = 0;
                  solution.alpha.modulate(renderer, 2000, 0.3);
                  if (SAVE.data.n.plot === 72) {
                     if (SAVE.data.b.svr) {
                        music.uwa.instances[0].rate.value = 0;
                        music.uwa.instances[0].gain.value = 0;
                     } else {
                        music.reunited.instances[0].rate.value = 0;
                        music.reunited.instances[0].gain.value = 0;
                     }
                  } else {
                     game.music?.stop();
                  }
                  mus = SAVE.data.b.f_state_temstatue
                     ? music.chara.instance(renderer)
                     : music.memory.instance(renderer);
                  mus!.gain.value /= 4;
                  mus!.gain.modulate(renderer, 500, mus!.gain.value * 4);
                  renderer.alpha.value > 0 && sounds.noise.instance(renderer);
               } else {
                  game.menu = true;
                  statue.index = 0;
                  renderer.detach('main', light, solution);
                  solution.alpha.modulate(renderer, 0, 0);
                  mus?.stop();
                  musicConvolver.value = 0;
                  if (SAVE.data.n.plot === 72) {
                     if (SAVE.data.b.svr) {
                        music.uwa.instances[0].rate.value = music.uwa.rate;
                        music.uwa.instances[0].gain.modulate(renderer, 300, music.uwa.gain);
                     } else {
                        music.reunited.instances[0].rate.value = music.reunited.rate * (world.runaway ? 0.4 : 1);
                        music.reunited.instances[0].gain.modulate(renderer, 300, music.reunited.gain);
                     }
                  } else {
                     quickresume(true);
                  }
                  renderer.alpha.value > 0 && (sounds.noise.instance(renderer).rate.value = 1.2);
               }
            }
         };
         for (const subobj of switches) {
            subobj.index = 1;
            subobj.on('tick', switchTicker);
         }
         if ((world.kiddo || SAVE.data.b.svr) && SAVE.data.n.state_foundry_muffet !== 1) {
            const mtarget = SAVE.data.b.svr ? goatbroTrue : kiddo;
            let schmovin = true;
            if (from === '_void') {
               mtarget.metadata.barrier = true;
               mtarget.metadata.override = true;
               mtarget.position.set(230, 110);
               mtarget.alpha.task?.();
               mtarget.alpha.value = 1;
               mtarget.face = 'down';
               mtarget.sprite.reset();
               mtarget.metadata.interact = true;
               mtarget.metadata.name = 'trivia';
               mtarget.metadata.args = [ 'f_statue_kidd' ];
            } else {
               mtarget.metadata.barrier = true;
               mtarget.metadata.override = true;
               mtarget.position.set(player);
               mtarget.alpha.task?.();
               mtarget.alpha.value = 1;
               if (world.kiddo && !SAVE.data.b.f_state_kidd_statue) {
                  teleporter.movement = false;
                  await dialogue('dialoguerBottom', ...text.a_foundry.kiddStatue);
                  SAVE.data.b.f_state_kidd_statue = true;
                  game.movement = true;
               }
               for (const sprite of Object.values(mtarget.sprites)) {
                  sprite.duration = Math.round(15 / 2);
               }
               const dirX = 230 - mtarget.position.x < 0 ? -1 : 1;
               const dirY = 110 - mtarget.position.y < 0 ? -1 : 1;
               CosmosUtils.chain<void, Promise<void>>(void 0, async (z, next) => {
                  const diffX = Math.abs(230 - mtarget.position.x);
                  const diffY = Math.abs(110 - mtarget.position.y);
                  mtarget.move(
                     {
                        x: (diffX === 0 ? 0 : diffX < 2 ? diffX : 2) * dirX,
                        y: (diffY === 0 ? 0 : diffY < 2 ? diffY : 2) * dirY
                     },
                     renderer
                  );
                  if (schmovin && (diffX > 0 || diffY > 0)) {
                     await renderer.on('tick');
                     if (schmovin) {
                        await next();
                     }
                  }
               }).then(() => {
                  if (schmovin) {
                     mtarget.face = 'down';
                     mtarget.sprite.reset();
                     mtarget.metadata.interact = true;
                     mtarget.metadata.name = 'trivia';
                     mtarget.metadata.args = [ 'f_statue_kidd' ];
                     if (renderer.detect(mtarget, player).length > 0) {
                        player.position.y = mtarget.position.y + mtarget.size.y;
                     }
                  }
               });
            }
            await events.on('teleport');
            schmovin = false;
            mtarget.metadata.barrier = false;
            mtarget.metadata.interact = false;
            mtarget.metadata.name = void 0;
            mtarget.metadata.args = void 0;
            mtarget.metadata.override = false;
            tracker.supplant();
         } else {
            await events.on('teleport');
         }
         for (const subobj of switches) {
            subobj.off('tick', switchTicker);
         }
         break;
      }
      case 'f_quiche': {
         SAVE.data.n.plot < 35 &&
            temporary(
               new CosmosAnimation({
                  active: true,
                  position: { x: 160, y: 90 },
                  anchor: { x: 0, y: 1 },
                  resources: content.ionFDoge,
                  extrapolate: false,
                  duration: 20,
                  tint: tints.dark02,
                  objects: [
                     new CosmosHitbox({
                        size: { x: 20, y: 4 },
                        anchor: { x: 0, y: 1 },
                        metadata: { interact: true, barrier: true, name: 'trivia', args: [ 'sleepingdogs' ] }
                     })
                  ]
               }),
               'main'
            );
         break;
      }
      case 'f_stand': {
         const flavortown = instance('below', '21flavors')!.object.objects.filter(
            obj => obj instanceof CosmosSprite
         )[0] as CosmosSprite;
         const inst = instance('main', 's_nicecream');
         const stayCondition = (SAVE.data.n.plot === 72 || 6 <= world.population) && !world.runaway;
         // fled from previous area
         if (SAVE.data.n.state_starton_lesserdog === 2 || world.genocide || world.population_area('s') < 6) {
            inst?.destroy();
            instance('main', 'dimbox')?.destroy();
            instance('below', 'xtrabarrier')?.destroy();
            flavortown.frames = [ content.iooFWallsign ];
         }
         // moved to next area
         else if (SAVE.data.n.plot > 59 && stayCondition) {
            inst?.destroy();
            instance('below', 'xtrabarrier')?.destroy();
            if (SAVE.data.n.plot === 72) {
               flavortown.frames = [ content.iooFWallsign ];
            } else {
               instance('below', '21flavors')?.destroy();
            }
         } else if (inst) {
            const guyanim = inst.object.objects[0] as CosmosAnimation;
            // stayed in current area
            if (stayCondition) {
               guyanim.use(
                  SAVE.data.b.f_state_nicecream_purchase ? content.ionSNicecreamHappi : content.ionSNicecreamSad
               );
            }
            // fled from current area
            else {
               guyanim.use(content.ionSNicecream);
               instance('below', 'xtrabarrier')?.destroy();
            }
         }
         break;
      }
      case 'f_piano': {
         if (!SAVE.data.b.f_state_piano) {
            temporary(
               new CosmosObject({
                  priority: 8000,
                  metadata: { tags: [ 'pianobarrier' ] },
                  objects: [
                     new CosmosHitbox({
                        metadata: { barrier: true },
                        position: { x: 60, y: 180 },
                        size: { x: 20, y: 40 }
                     }),
                     new CosmosSprite({
                        position: { x: 40, y: 100 },
                        frames: [ content.iooFPianoOver1 ]
                     })
                  ]
               }),
               'main'
            );
         }
         if (!SAVE.data.b.f_state_truth) {
            temporary(
               new CosmosObject({
                  priority: 8000,
                  metadata: { tags: [ 'truthbarrier' ] },
                  objects: [
                     new CosmosHitbox({
                        metadata: { barrier: true },
                        position: { x: 240, y: 180 },
                        size: { x: 20, y: 40 }
                     }),
                     new CosmosSprite({
                        position: { x: 240, y: 100 },
                        frames: [ content.iooFPianoOver2 ]
                     })
                  ]
               }),
               'main'
            );
         }
         break;
      }
      case 'f_corridor': {
         for (const inst of instances('main', 'dark2')) {
            inst.object.tint = tints.dark02;
         }
         break;
      }
      case 'f_sans':
         if (world.genocide || (world.population < 6 && !world.bullied) || SAVE.data.b.svr || world.runaway) {
            instance('main', 'f_echodude')?.destroy();
         }
         if (!roomState.spawnd) {
            roomState.spawnd = true;
            if (SAVE.data.n.plot < 35 && !world.dead_skeleton) {
               roomState.sand = temporary(
                  character('sans', characters.sans, { x: 240, y: 100 }, 'down', {
                     anchor: { x: 0, y: 1 },
                     size: { x: 20, y: 10 },
                     metadata: { interact: true, barrier: true, name: 'foundry', args: [ 'spookydate' ] }
                  }),
                  'main',
                  () => {
                     roomState.spawnd = false;
                  }
               );
            }
         }
         break;
      case 'f_shyren':
         postSIGMA() && (instance('main', 'vending_machine')!.object.objects[0] as CosmosAnimation).reset();
         if (!roomState.active) {
            roomState.active = true;
            if (SAVE.data.n.plot < 40) {
               await renderer.when(
                  () =>
                     (player.position.x > 290 ||
                        player.position.y > 230 ||
                        (player.position.x > 120 && player.position.x < 200 && player.position.y < 90)) &&
                     game.room === 'f_shyren' &&
                     game.movement
               );
               await battler.encounter(player, groups.shyren);
               SAVE.data.n.plot = 40;
            }
         }
         break;
      case 'f_story1': {
         if (!roomState.active) {
            roomState.active = true;
            if (world.genocide && SAVE.data.n.plot < 37.1) {
               const asgoreLoader = asgoreAssets.load();
               await renderer.when(() => player.position.y < 185 && game.room === 'f_story1' && game.movement);
               SAVE.data.n.plot = 37.1;
               game.movement = false;
               game.music?.stop();
               player.face = 'up';
               await antifreeze([ asgoreLoader, renderer.pause(850) ]);
               const gorey = character('asgore', characters.asgore, { x: 160, y: 60 }, 'down', {
                  key: 'asgore'
               });
               const cam = new CosmosObject({ position: player.position.clone() });
               game.camera = cam;
               goatbro.face = 'up';
               await cam.position.modulate(renderer, 1500, { y: 120 });
               const jeebs = music.prebattle.instance(renderer);
               jeebs.rate.value = 0.25;
               await renderer.pause(650);
               await dialogue('auto', ...text.a_foundry.genotext.asriel32);
               sounds.phase.instance(renderer);
               gorey.scale.modulate(renderer, 125, { x: 1.05, y: 1 }).then(() => {
                  gorey.scale.modulate(renderer, 50, { x: 0, y: 1 });
               });
               await gorey.alpha.modulate(renderer, 100, 0.8);
               gorey.alpha.value = 0;
               await renderer.pause(40);
               gorey.alpha.value = 1;
               await renderer.pause(850);
               jeebs.gain.modulate(renderer, 1000, 0).then(() => {
                  jeebs.stop();
               });
               await cam.position.modulate(renderer, 1500, { y: player.position.y });
               game.camera = player;
               SAVE.flag.n.ga_asriel33++ < 1 && (await dialogue('auto', ...text.a_foundry.genotext.asriel33));
               game.movement = true;
               quickresume();
               renderer.detach('main', gorey);
               asgoreAssets.unload();
            }
            break;
         }
         break;
      }
      case 'f_prechase': {
         if (world.genocide && SAVE.data.n.plot < 37.2) {
            const ebar = instance('below', 'ebar')!.object.objects[0] as CosmosHitbox;
            ebar.metadata.barrier = false;
            const platform = temporary(
               new CosmosSprite({
                  position: { x: 250 + 360, y: 130 + 140 },
                  anchor: { x: 0, y: 1 },
                  priority: -18937659153,
                  frames: [ content.iooFRaft ],
                  objects: [ new CosmosHitbox({ anchor: 1, position: { x: -10 }, size: 20 }) ]
               }),
               'main'
            );
            await renderer.when(() => game.room !== 'f_prechase' || (255 + 360 <= player.position.x && game.movement));
            if (game.room !== 'f_prechase') {
               return;
            }
            SAVE.data.n.plot = 37.2;
            player.position.x = 255 + 360;
            game.movement = false;
            await renderer.pause(450);
            player.face = 'left';
            await renderer.pause(1000);
            goatbro.metadata.override = true;
            goatbro.priority.value = player.position.y - 1;
            await goatbro.walk(renderer, 1, player.position.subtract(4.5, 0));
            goatbro.face = 'right';
            await renderer.pause(850);
            await dialogue('auto', ...text.a_foundry.genotext.asrielHug1);
            await Promise.all([
               player.position.step(renderer, 3, { x: player.position.x + 640 }),
               platform.position.step(renderer, 3, { x: platform.position.x + 640 }),
               goatbro.position.step(renderer, 3, { x: goatbro.position.x + 640 }),
               renderer.pause(1950).then(async () => {
                  player.face = 'left';
                  player.alpha.value = 0;
                  const hugger = new CosmosAnimation({
                     active: true,
                     anchor: { x: 0, y: 1 },
                     resources: content.iocAsrielHug1,
                     priority: player.position.y + 10,
                     tint: tints.dark02
                  }).on('tick', function () {
                     this.position.set(player.position);
                  });
                  renderer.attach('main', hugger);
                  await renderer.when(() => hugger.index === 1);
                  hugger.disable();
                  await renderer.pause(850);
                  await dialogue('auto', ...text.a_foundry.genotext.asrielHug2);
                  await renderer.pause(2150);
                  keyState.interact && (await keys.interactKey.on('up'));
                  hugger.index = 0;
                  await renderer.pause(600);
                  renderer.detach('main', hugger);
                  player.alpha.value = 1;
                  player.face = 'left';
                  await renderer.pause(1650);
               })
            ]);
            await player.walk(renderer, 3, { x: goatbro.position.x + 21 });
            await Promise.all([
               player.walk(renderer, 3, { x: player.position.x + 18.5 }),
               goatbro.walk(renderer, 3, {
                  x: goatbro.position.x + 18.5
               })
            ]);
            goatbro.metadata.override = false;
            tracker.supplant('right');
            goatbro.priority.value = 0;
            await renderer.pause(850);
            dialogue('auto', ...text.a_foundry.genotext.asrielHug3).then(() => {
               game.movement = true;
            });
            ebar.metadata.barrier = true;
            await Promise.race([ events.on('teleport'), platform.position.step(renderer, 3, { x: 0 }) ]);
            renderer.detach('main', platform);
         }
         break;
      }
      case 'f_chase': {
         temporary(
            new CosmosAnimation({ active: true, anchor: 0, resources: content.iooFMazeshadow }).on('tick', function () {
               this.position.set(player.position.x, player.position.y - 15);
            }),
            'above'
         );
         for (const pos of CosmosUtils.parse<CosmosPointSimple[]>(SAVE.data.s.state_foundry_f_chaseHole, [])) {
            stabbieHole(pos);
         }
         if (
            !SAVE.data.b.f_state_kidd_prechase &&
            SAVE.data.n.plot > 37.2 &&
            renderer.layers.main.objects.includes(kiddo)
         ) {
            teleporter.movement = false;
            await dialogue('auto', ...text.a_foundry.walktext.prechase);
            SAVE.data.b.f_state_kidd_prechase = true;
            game.movement = true;
         }
         break;
      }
      case 'f_abyss': {
         if (!roomState.active) {
            roomState.active = true;
            if (world.genocide && SAVE.data.n.plot < 38.2) {
               const asgoreLoader = asgoreAssets.load();
               await renderer.when(() => player.position.x > 200 && game.room === 'f_abyss' && game.movement);
               game.movement = false;
               SAVE.data.n.plot = 38.2;
               game.music?.stop();
               player.face = 'right';
               const OGverb = musicConvolver.value;
               musicConvolver.value = 0;
               musicFilter.value = 0;
               await antifreeze([ asgoreLoader, renderer.pause(850) ]);
               const gorey = character('asgore', characters.asgore, { x: 410, y: 290 }, 'left', {
                  key: 'asgore',
                  tint: tints.dark02
               });
               kiddo.face = 'right';
               const cam = new CosmosObject({ position: player.position.clone() });
               game.camera = cam;
               await cam.position.modulate(renderer, 1500, { x: 300 });
               const jeebs = music.prebattle.instance(renderer);
               jeebs.rate.value = 0.25;
               await renderer.pause(650);
               await dialogue('auto', ...text.a_foundry.genotext.asgoreMK1);
               sounds.phase.instance(renderer);
               gorey.scale.modulate(renderer, 125, { x: 1.05, y: 1 }).then(() => {
                  gorey.scale.modulate(renderer, 50, { x: 0, y: 1 });
               });
               await gorey.alpha.modulate(renderer, 100, 0.8);
               gorey.alpha.value = 0;
               await renderer.pause(40);
               gorey.alpha.value = 1;
               await renderer.pause(850);
               jeebs.gain.modulate(renderer, 1000, 0).then(() => {
                  jeebs.stop();
               });
               await cam.position.modulate(renderer, 1500, { x: player.position.x });
               game.camera = player;
               await dialogue('auto', ...text.a_foundry.genotext.asgoreMK2);
               game.movement = true;
               musicConvolver.value = OGverb;
               musicFilter.value = rooms.of(game.room).score.filter;
               quickresume();
               renderer.detach('main', gorey);
               asgoreAssets.unload();
            }
         }
         break;
      }
      case 'f_prespear': {
         if (SAVE.data.n.plot < 46 && !world.genocide) {
            if (roomState.awaituh) {
               return;
            }
            roomState.awaituh = true;
            await renderer.when(() => game.movement && game.room === 'f_prespear' && 210 <= player.position.x);
            game.movement = false;
            game.music?.stop();
            musicConvolver.value = 0;
            musicFilter.value = 0;
            await player.walk(renderer, 3, { x: 240 });
            const r = rooms.of('f_prespear').region!;
            const OGX1 = r[0]!.x;
            const OGX2 = r[1]!.x;
            r[0]!.x = renderer.region[0].x = player.position.x;
            r[1]!.x = renderer.region[1].x = player.position.x;
            const sp1 = (await stabbie(true, { x: 180, y: 100 }, { x: 180, y: 120 }, { x: 180, y: 140 }))!;
            const barryR = new CosmosHitbox({
               metadata: { barrier: true },
               position: { x: 180, y: 100 },
               size: { x: 20, y: 60 }
            }).on('tick', function () {
               this.metadata.barrier = game.room === 'f_prespear';
            });
            renderer.attach('below', barryR);
            for (const obj of [ ...sp1.sprs, ...sp1.anims ]) {
               obj.on('tick', function () {
                  this.alpha.value = game.room === 'f_prespear' ? 1 : 0;
               });
            }
            await renderer.pause(1000);
            let hover = false;
            let controller = false;
            const time = renderer.time;
            const fishShake = new CosmosValue();
            const fishPosition = new CosmosPoint();
            const fish = character('undyneSUSSSSSSSSSSSSSSSSSSSSSS', characters.undyneArmor, { x: 240, y: 0 }, 'down', {
               tint: tints.dark02
            }).on('tick', function () {
               if (controller) {
                  this.position = fishPosition.add(
                     (Math.random() - 0.5) * fishShake.value * 2,
                     (Math.random() - 0.5) * fishShake.value * 2
                  );
                  if (hover) {
                     this.position.y += CosmosMath.wave(((renderer.time - time) % 1200) / 1200) * 2;
                  }
               } else if (this.sprite.index % 2 === 1 && this.sprite.step === 0) {
                  sounds.stomp.instance(renderer);
               }
            });
            await fish.walk(renderer, 2, { y: 35 });
            await renderer.pause(1250);
            world.cutscene_override = true;
            await dialogue('auto', ...text.a_foundry.run1);
            fish.walk(renderer, 2, { y: 0 }).then(() => {
               renderer.detach('main', fish);
            });
            const runMusic = music.undynefast.instance(renderer);
            game.movement = true;
            game.menu = false;
            const tspeed = new CosmosValue(1600);
            tspeed.modulate(renderer, 30000, 800);
            let ttime = renderer.time - tspeed.value / 2;
            await renderer.when(subtick => {
               if (subtick) {
                  return false;
               }
               if (game.room === 'f_corner') {
                  if (220 <= player.position.y && game.movement) {
                     game.movement = false;
                     game.menu = true;
                     return true;
                  }
               } else if (renderer.time - ttime > tspeed.value && game.movement && !battler.active) {
                  ttime = renderer.time;
                  const sr = game.room;
                  const bx = sr === 'f_prespear' ? 210 : 130;
                  const sf = rng.overworld.int(4);
                  let i = 0;
                  while (i < 4) {
                     if (sf !== i) {
                        const spawnSprite = temporary(
                           new CosmosAnimation({
                              active: true,
                              position: { x: 130 + i * 20, y: 10 },
                              resources: content.iooFSpearSpawn,
                              anchor: 0,
                              scale: 0.5,
                              alpha: 1,
                              rotation: Math.random() * 360
                           }),
                           'menu'
                        );
                        spawnSprite.scale.modulate(renderer, 700, 1.5, 1.5).then(() => {
                           spawnSprite.scale.modulate(renderer, 400, 1.5, 0);
                        });
                        const rotTarget = spawnSprite.rotation.value + 120;
                        spawnSprite.rotation.modulate(renderer, 1000, rotTarget, rotTarget);
                        spawnSprite.alpha.modulate(renderer, 1000, 1, 1, 0).then(() => {
                           renderer.detach('menu', spawnSprite);
                        });
                     }
                     i++;
                  }
                  sounds.arrow.instance(renderer);
                  renderer.pause(800).then(async () => {
                     if (game.room !== sr || battler.active) {
                        return;
                     }
                     temporary(
                        new CosmosObject({
                           metadata: { landed: false, shiftable: true },
                           position: { x: bx, y: player.position.clamp(...renderer.region).y - 120 },
                           velocity: { y: 16 },
                           objects: CosmosUtils.populate(
                              4,
                              i =>
                                 new CosmosSprite({
                                    alpha: i === sf ? 0 : 1,
                                    anchor: { x: 0, y: 1 },
                                    frames: [ content.iooFSpear ],
                                    position: { x: i * 20 }
                                 })
                           )
                        }),
                        'main'
                     ).on('tick', async function () {
                        if (this.metadata.landed || player.position.y > this.position.y) {
                           return;
                        }
                        this.metadata.landed = true;
                        if (battler.active) {
                           renderer.detach('main', this);
                           return;
                        }
                        this.position.y = player.position.y;
                        this.velocity.y = 0;
                        for (const obj of this.objects) {
                           if (obj instanceof CosmosSprite) {
                              obj.frames[0] = content.iooFSpearStab;
                           }
                        }
                        sounds.landing.instance(renderer);
                        shake().then(async () => {
                           await this.alpha.modulate(renderer, 500, 0);
                           renderer.detach('main', this);
                        });
                        if (game.movement && !battler.active && Math.abs(bx + sf * 20 - player.position.x) > 10) {
                           game.movement = false;
                           ttime = Infinity;
                           await battler.battlefall(player, { x: 160, y: 180 });
                           battler.simple(async () => {
                              game.movement = true;
                              renderer.detach('main', this);
                              await patterns.undynefast();
                              if (SAVE.data.n.hp > 0) {
                                 events.on('battle-exit').then(() => {
                                    ttime = renderer.time;
                                 });
                                 events.fire('exit');
                              }
                           });
                        }
                     });
                  });
               }
               return false;
            });
            r[0]!.x = OGX1;
            r[1]!.x = OGX2;
            renderer.detach('below', ...sp1.sprs, barryR);
            renderer.detach('main', ...sp1.anims);
            const sp2 = (await stabbie(
               true,
               { x: 120, y: 220 },
               { x: 140, y: 220 },
               { x: 160, y: 220 },
               { x: 180, y: 220 }
            ))!;
            for (const spr of sp2.sprs) {
               temporary(spr, 'below');
            }
            for (const anim of sp2.anims) {
               temporary(anim, 'main');
            }
            renderer.attach('main', fish);
            fish.alpha.value = 0;
            fish.position.set(160, 10);
            fish.face = 'down';
            runMusic.stop();
            await fish.alpha.modulate(renderer, 300, 1);
            await fish.walk(renderer, 1.5, { y: 80 });
            if (SAVE.data.n.state_foundry_muffet === 1) {
               await renderer.pause(850);
               sounds.phone.instance(renderer);
               await renderer.pause(500);
               sounds.phone.instance(renderer);
               await renderer.pause(1500);
               fish.alpha.value = 0;
               const phoneSpr = new CosmosSprite({
                  position: { x: fish.position.x, y: fish.position.y - 1 },
                  anchor: { x: 0, y: 1 },
                  frames: [ content.iocUndynePhone ],
                  tint: tints.dark02
               });
               renderer.attach('main', phoneSpr);
               await renderer.pause(2500);
               await dialogue('auto', ...(helmetdyne() ? text.a_foundry.run2a2 : text.a_foundry.run2a1));
               sounds.equip.instance(renderer);
               renderer.detach('main', phoneSpr);
               fish.alpha.value = 1;
               fish.face = 'up';
               await renderer.pause(850);
               await dialogue('auto', ...(helmetdyne() ? text.a_foundry.run2b2 : text.a_foundry.run2b1));
               Promise.all([ ...sp2.sprs, ...sp2.anims ].map(o => o.alpha.modulate(renderer, 500, 0))).then(() => {
                  renderer.detach('below', ...sp2.sprs);
                  renderer.detach('main', ...sp2.anims);
               });
               await fish.walk(renderer, 3, { y: 5 });
               Promise.race([ events.on('teleport'), fish.alpha.modulate(renderer, 300, 0) ]).then(() => {
                  renderer.detach('main', fish);
               });
            } else {
               const bp = new CosmosValue(200);
               const sh = new CosmosValue();
               const time2 = renderer.time;
               const jetpacker = new CosmosAnimation({
                  area: renderer.area,
                  position: { x: 160 },
                  resources: content.iocKiddDownTalk,
                  metadata: { fly: false },
                  tint: tints.dark03,
                  anchor: { x: 0, y: 1 },
                  objects: [
                     new CosmosAnimation({ active: true, anchor: { x: 0, y: 1 }, resources: content.iocKiddJetpack })
                  ]
               }).on('tick', function () {
                  if (this.metadata.fly) {
                     quickshadow(this, this);
                     quickshadow(this.objects[0] as CosmosSprite, this);
                  } else {
                     this.position.set(
                        new CosmosPoint(sh.value)
                           .multiply(Math.random() - 0.5, Math.random() - 0.5)
                           .add(160, bp.value + 15 + sineWaver(time2, 1000, 0, 5))
                     );
                     this.priority.value = this.position.y > 140 ? -3715619835 : 120;
                  }
               });
               const hlister = (h: string) => {
                  if (h === 'x1') {
                     speech.targets.add(jetpacker);
                  } else if (h === 'x2') {
                     speech.targets.delete(jetpacker);
                  }
               };
               typer.on('header', hlister);
               renderer.attach('below', jetpacker);
               const gas = sounds.jetpack.instance(renderer);
               gas.rate.value = 0.8;
               gas.gain.value = 0;
               gas.gain.modulate(renderer, 650, gas.daemon.gain * 0.4);
               renderer.pause(200).then(async () => {
                  await notifier(fish);
                  fish.idle = false;
                  fish.sprite.duration = 6;
                  fish.sprite.enable();
                  await fish.position.modulate(renderer, 1000, { y: fish.position.y - 40 });
                  fish.sprite.reset();
                  fish.idle = true;
                  Promise.all([ ...sp2.sprs, ...sp2.anims ].map(o => o.alpha.modulate(renderer, 500, 0))).then(() => {
                     renderer.detach('below', ...sp2.sprs);
                     renderer.detach('main', ...sp2.anims);
                  });
               });
               dialogue('dialoguerBottom', ...text.a_foundry.run3);
               await bp.modulate(renderer, 2000, 80, 80);
               await bp.modulate(renderer, 1000, bp.value, 120, 120);
               await bp.modulate(renderer, 500, bp.value, 100, 100);
               await dialogue('dialoguerBottom', ...text.a_foundry.run4);
               await renderer.pause(1000);
               sh.modulate(renderer, 4000, 4, 4, 1);
               await renderer.pause(1000);
               await dialogue('dialoguerBottom', ...text.a_foundry.run5);
               await renderer.pause(650);
               jetpacker.use(content.iocKiddDownTalkSad);
               await renderer.pause(850);
               await dialogue('dialoguerBottom', ...text.a_foundry.run6);
               renderer.detach('below', jetpacker);
               renderer.attach('main', jetpacker);
               foundryStates.rooms.f_corner ??= {};
               let res = -1;
               const max = 15e3;
               const time3 = renderer.time;
               renderer.pause(5000).then(() => {
                  if (res === -1) {
                     bp.modulate(renderer, 750, bp.value, 92.5);
                     sh.modulate(renderer, 1000, 1, 2, 2);
                     dialogue('dialoguerBottom', ...text.a_foundry.run6a);
                  }
               });
               renderer.pause(10e3).then(() => {
                  if (res === -1) {
                     bp.modulate(renderer, 750, bp.value, 85);
                     sh.modulate(renderer, 1000, 2, 3, 3);
                     dialogue('dialoguerBottom', ...text.a_foundry.run6b);
                  }
               });
               const tension = music.scramble.instance(renderer);
               tension.gain.value *= 2;
               game.movement = true;
               game.menu = false;
               const rs = (foundryStates.rooms.f_corner ??= {});
               rs.canSaveMK = true;
               await renderer.when(() => {
                  if (rs.rescue) {
                     res = 0;
                     return true;
                  } else if (player.position.y < 60) {
                     res = 1;
                     return game.movement;
                  } else if (time3 + max <= renderer.time || game.room !== 'f_corner') {
                     res = 2;
                     return game.movement;
                  }
                  return false;
               });
               rs.canSaveMK = false;
               tension.gain.modulate(renderer, 300, 0);
               game.movement = false;
               game.menu = true;
               if (res === 0) {
                  const fd = fader();
                  await fd.alpha.modulate(renderer, 600, 1);
                  await renderer.pause(850);
                  sounds.noise.instance(renderer);
                  gas.stop();
                  await renderer.pause(1250);
                  renderer.detach('main', jetpacker);
                  const kiddo = character('kidd', characters.kidd, { x: 160, y: 80 }, 'up', {
                     tint: tints.dark02
                  });
                  await fd.alpha.modulate(renderer, 300, 0);
                  renderer.detach('menu', fd);
                  await renderer.pause(500);
                  await kiddo.walk(renderer, 1, fish.position.add(0, 20));
                  await dialogue('dialoguerBottom', ...text.a_foundry.run7);
                  await renderer.pause(150);
                  fish.idle = false;
                  fish.sprite.duration = 5;
                  fish.sprite.enable();
                  await fish.position.modulate(renderer, 500, fish.position.add(0, -5));
                  fish.sprite.reset();
                  fish.idle = true;
                  await renderer.pause(1150);
                  fish.idle = false;
                  fish.sprite.enable();
                  await fish.position.modulate(renderer, 500, fish.position.add(0, -5));
                  fish.sprite.reset();
                  fish.idle = true;
                  await renderer.pause(1150);
                  fish.idle = false;
                  fish.face = 'up';
                  fish.sprite.duration = 5;
                  fish.sprite.enable();
                  await fish.position.step(renderer, 2, { y: 5 });
                  fish.alpha.modulate(renderer, 300, 0).then(() => {
                     renderer.detach('main', fish);
                     fish.sprite.reset();
                     fish.idle = true;
                  });
                  await renderer.pause(650);
                  await kiddo.walk(renderer, 2, { y: 80 });
                  await dialogue('dialoguerBottom', ...text.a_foundry.run8);
                  kiddo.face = 'up';
                  await renderer.pause(650);
                  await kiddo.walk(renderer, 1.5, { y: 30 });
                  await renderer.pause(650);
                  kiddo.face = 'down';
                  await renderer.pause(1150);
                  await dialogue('dialoguerBottom', ...text.a_foundry.run9);
                  await kiddo.walk(renderer, 2, { y: 5 });
                  await kiddo.alpha.modulate(renderer, 300, 0);
                  renderer.detach('main', kiddo);
               } else if (game.room === 'f_corner') {
                  await dialogue('dialoguerBottom', ...[ text.a_foundry.run6d, text.a_foundry.run6c ][res - 1]);
                  await sh.modulate(renderer, 500, 6);
                  const sfxAssets = new CosmosInventory(content.asBoom, content.asLanding, content.asJetpack);
                  sfxAssets.name = 'sfxAssets';
                  const sfxLoader = sfxAssets.load();
                  jetpacker.metadata.fly = true;
                  jetpacker.position.x = 160;
                  jetpacker.velocity.y = -10;
                  sounds.stab.instance(renderer);
                  gas.stop();
                  shake();
                  await renderer.pause(66);
                  sounds.superstrike.instance(renderer).gain.value /= 2;
                  await renderer.pause(200);
                  await notifier(fish, false);
                  await antifreeze([ sfxLoader, renderer.pause(650) ]);
                  fish.preset = characters.undyneArmorJetpack;
                  sounds.noise.instance(renderer);
                  const flame = sounds.jetpack.instance(renderer);
                  flame.gain.value *= 0.4;
                  controller = true;
                  fishPosition.set(fish);
                  await fishShake.modulate(renderer, 350, 1);
                  hover = true;
                  renderer.pause(400).then(() => {
                     fishShake.modulate(renderer, 700, 0);
                  });
                  renderer.pause(500).then(() => {
                     sounds.boom.instance(renderer).rate.value = 0.5;
                  });
                  await fishPosition.modulate(renderer, 1000, {}, { y: -50 });
                  await renderer.pause(1000);
                  sounds.landing.instance(renderer);
                  flame.stop();
                  await renderer.pause(2150);
                  await dialogue('auto', ...text.a_foundry.run11(res === 1));
                  oops();
                  SAVE.data.b.f_state_kidd_betray = true;
                  SAVE.data.b.f_state_kidd_betray_wait = true;
                  await renderer.pause(650);
                  sfxAssets.unload();
                  renderer.detach('main', fish, jetpacker);
               } else {
                  renderer.detach('main', fish, jetpacker);
                  gas.stop();
                  teleporter.movement = false;
                  await renderer.pause(1150);
                  await dialogue('auto', ...text.a_foundry.run10);
                  oops();
                  SAVE.data.b.f_state_kidd_betray = true;
                  game.movement = true;
                  game.menu = true;
               }
               typer.off('header', hlister);
               renderer.detach('below', jetpacker);
            }
            world.cutscene_override = false;
            SAVE.data.n.plot = 46;
            game.movement = true;
            quickresume();
         } else if (!world.genocide) {
            for (const pos of [
               { x: 180, y: 120 },
               { x: 180, y: 140 },
               { x: 180, y: 160 }
            ]) {
               stabbieHole(pos);
            }
         }
         break;
      }
      case 'f_spear':
         if (!roomState.active) {
            roomState.active = true;
            if (world.genocide && SAVE.data.n.plot < 46) {
               game.movement = false;
               teleporter.movement = false;
               SAVE.data.n.plot = 46;
               const fish = character('undyneArmor', characters.undyneArmor, { x: 160, y: 200 }, 'down', {
                  tint: tints.dark02
               });
               const stepSFX = () => {
                  if (fish.sprite.index % 2 === 0 && fish.sprite.step === 0) {
                     sounds.stomp.instance(renderer).gain.value *= Math.min(
                        Math.max(CosmosMath.remap(fish.position.y, 1, 0, 220, 280), 0),
                        1
                     );
                  }
               };
               fish.on('tick', stepSFX);
               fish.walk(renderer, 3, fish.position.add(0, 60)).then(() => {
                  fish.off('tick', stepSFX);
                  renderer.detach('main', fish);
               });
               await renderer.pause(550);
               await dialogue('auto', ...text.a_foundry.genotext.kiddFinal1);
               fish.alpha.value = 0;
               game.movement = true;
            }
         }
         break;
      case 'f_corner': {
         if (SAVE.data.n.plot > 45 && !world.genocide) {
            for (const pos of [
               { x: 120, y: 240 },
               { x: 140, y: 240 },
               { x: 160, y: 240 },
               { x: 180, y: 240 }
            ]) {
               stabbieHole(pos);
            }
         }
         break;
      }
      case 'f_story2':
         if (!roomState.active) {
            roomState.active = true;
            if (world.genocide && SAVE.data.n.plot < 47) {
               SAVE.data.n.plot = 47;
               teleporter.movement = false;
               await dialogue('auto', ...text.a_foundry.genotext.kiddFinal2());
               game.movement = true;
            }
         }
         break;
      case 'f_prepuzzle': {
         if (!roomState.active) {
            roomState.active = true;
            if (world.genocide && SAVE.data.n.plot < 44) {
               const asgoreLoader = asgoreAssets.load();
               await renderer.when(() => player.position.x > 210 && game.room === 'f_prepuzzle' && game.movement);
               game.movement = false;
               SAVE.data.n.plot = 44;
               game.music?.stop();
               player.face = 'right';
               await antifreeze([ asgoreLoader, renderer.pause(850) ]);
               const gorey = character('asgore', characters.asgore, { x: 420, y: 110 }, 'left', {
                  key: 'asgore'
               });
               goatbro.face = 'right';
               const cam = new CosmosObject({ position: player.position.clone() });
               game.camera = cam;
               await cam.position.modulate(renderer, 1500, { x: 300 });
               const jeebs = music.prebattle.instance(renderer);
               jeebs.rate.value = 0.25;
               await renderer.pause(650);
               SAVE.flag.n.ga_asrielStutter < 1 && header('x1').then(() => (SAVE.flag.n.ga_asrielStutter = 1));
               await dialogue('auto', ...text.a_foundry.genotext.asgoreFinal1());
               sounds.phase.instance(renderer);
               gorey.scale.modulate(renderer, 125, { x: 1.05, y: 1 }).then(() => {
                  gorey.scale.modulate(renderer, 50, { x: 0, y: 1 });
               });
               await gorey.alpha.modulate(renderer, 100, 0.8);
               gorey.alpha.value = 0;
               await renderer.pause(40);
               gorey.alpha.value = 1;
               const alphy = character('alphys', characters.alphysSad, gorey, 'left', { scale: { x: 0 } });
               sounds.dephase.instance(renderer);
               alphy.scale.modulate(renderer, 50, { x: 1.05, y: 1 }).then(() => {
                  alphy.scale.modulate(renderer, 125, { x: 1, y: 1 });
               });
               renderer.pause(35).then(async () => {
                  alphy.alpha.value = 0;
                  await renderer.pause(40);
                  alphy.alpha.value = 0.8;
                  await alphy.alpha.modulate(renderer, 100, 1);
               });
               await renderer.pause(850);
               renderer.detach('main', gorey);
               await dialogue('auto', ...text.a_foundry.genotext.asgoreFinal2());
               sounds.phase.instance(renderer);
               alphy.scale.modulate(renderer, 125, { x: 1.05, y: 1 }).then(() => {
                  alphy.scale.modulate(renderer, 50, { x: 0, y: 1 });
               });
               await alphy.alpha.modulate(renderer, 100, 0.8);
               alphy.alpha.value = 0;
               await renderer.pause(40);
               alphy.alpha.value = 1;
               jeebs.gain.modulate(renderer, 1000, 0).then(() => {
                  jeebs.stop();
               });
               await cam.position.modulate(renderer, 1500, { x: player.position.x });
               game.camera = player;
               await dialogue('auto', ...text.a_foundry.genotext.asgoreFinal3());
               game.movement = true;
               quickresume();
               renderer.detach('main', alphy);
               asgoreAssets.unload();
            }
         }
         break;
      }
      case 'f_puzzle1':
      case 'f_puzzle2':
      case 'f_puzzle3': {
         const target = puzzleTarget();
         if (
            SAVE.data.n.plot < target &&
            (world.postnoot || (to === 'f_puzzle3' && !world.genocide && world.trueKills < 30))
         ) {
            SAVE.data.n.plot = target;
            world.postnoot && world.nootflags.add(to);
         }
         for (const { object: pylon } of instances('main', 'pylon')) {
            const name = (pylon.metadata.tags as string[]).filter(tag => tag !== 'pylon')[0];
            const x = SAVE.data.n[`state_foundry_${name.slice(2)}x` as keyof OutertaleDataNumber];
            const y = SAVE.data.n[`state_foundry_${name.slice(2)}y` as keyof OutertaleDataNumber];
            x > 0 && (pylon.position.x = x);
            y > 0 && (pylon.position.y = y);
         }
         if (SAVE.data.n.plot < target) {
            const origin = game.room;
            temporary(
               new CosmosSprite({
                  priority: 8000,
                  position:
                     origin === 'f_puzzle1'
                        ? { x: 220, y: 0 }
                        : origin === 'f_puzzle2'
                        ? { x: 420, y: 140 }
                        : { x: 840, y: 0 },
                  frames: [
                     origin === 'f_puzzle1'
                        ? content.iooFPuzzle1Over
                        : origin === 'f_puzzle2'
                        ? content.iooFPuzzle2Over
                        : content.iooFPuzzle3Over
                  ],
                  objects: [
                     new CosmosHitbox({
                        metadata: { barrier: true },
                        position: { y: 80 },
                        size: { x: 20, y: origin === 'f_puzzle2' ? 40 : 60 }
                     })
                  ]
               }).on('tick', function () {
                  target <= SAVE.data.n.plot && renderer.detach('main', this);
               }),
               'main'
            );
         } else {
            const objects = [] as CosmosObject[];
            const [ beams, overlays ] = CosmosUtils.parse<
               [[number, CosmosPointSimple, CosmosPointSimple][], [CosmosPointSimple, boolean][]]
            >(SAVE.data.s[`state_foundry_${to}`], [ [], [] ]);
            for (const [ index, [ cardinal, position, size ] ] of beams.entries()) {
               const face = [ 'up', 'down', 'left', 'right' ][cardinal] as CosmosDirection;
               const anchor = { up: { x: 0, y: 1 }, down: { x: 0 }, left: { x: 1, y: 0 }, right: { y: 0 } }[face];
               objects.push(
                  new CosmosRectangle({
                     anchor: {
                        up: { x: 0, y: 1 },
                        down: { x: 0 },
                        left: { x: 1, y: 0 },
                        right: { y: 0 }
                     }[face],
                     position,
                     size,
                     fill: 0x6ca4fc,
                     priority:
                        position.y +
                        (face === 'left' || face === 'right' ? 45 : face === 'down' ? size.y + 46 : 45 - size.y),
                     objects: [
                        new CosmosRectangle({
                           fill: 0xffffff,
                           anchor,
                           alpha: 0.5,
                           offsets: [
                              {
                                 x: face === 'left' ? -1 : face === 'right' ? 1 : 0,
                                 y: face === 'down' && index !== 0 ? -1 : 0
                              }
                           ],
                           size: {
                              x: face === 'down' || face === 'up' ? size.x / 2 : Math.max(size.x - 2, 0),
                              y: face === 'left' || face === 'right' ? size.y / 2 : size.y
                           }
                        })
                     ]
                  })
               );
            }
            for (const [ position, inverse ] of overlays) {
               objects.push(
                  new CosmosSprite({
                     offsets: [ { x: inverse ? 2 : -2, y: -3 } ],
                     scale: { x: inverse ? -1 : 1 },
                     position,
                     priority: position.y + 50,
                     frames: [ content.iooFPuzzlepylonOverlay ]
                  })
               );
            }
            renderer.attach('main', ...objects);
            events.on('teleport').then(() => {
               renderer.detach('main', ...objects);
            });
         }
         if (!roomState.active) {
            roomState.active = true;
            if (world.genocide && game.room === 'f_puzzle3') {
               // puzzle part
               if (SAVE.data.n.plot < 45) {
                  await renderer.when(() => player.position.y > 150 && game.room === 'f_puzzle3' && game.movement);
                  game.movement = false;
                  await dialogue('auto', ...text.a_foundry.genotext.asriel39);

                  // kid start walk
                  kiddo.metadata.override = true;
                  const OGregion = renderer.region[0].y;
                  renderer.region[0].y = game.camera.position.y;
                  game.camera = kiddo;
                  player.walk(renderer, 3, { y: 170 }, { x: 711, y: 170 }).then(async () => {
                     await renderer.pause(650);
                     goatbro.face = 'down';
                  });

                  // puzzle sequence
                  const pylon3A = instance('main', 'f_puzzlepylon3A')!.object;
                  const pylon3D = instance('main', 'f_puzzlepylon3D')!.object;
                  const pylon3H = instance('main', 'f_puzzlepylon3H')!.object;

                  await renderer.pause(850);
                  await kiddo.walk(renderer, 3, { x: 545 }, { x: 570, y: 190 });
                  let index = 0;
                  while (index++ < 2) {
                     pylon3A.position.modulate(renderer, 66, pylon3A.position.add(10, 0));
                     await kiddo.walk(renderer, 1.5, kiddo.position.add(3, 0));
                     await kiddo.walk(renderer, 3, kiddo.position.add(7, 0));
                  }
                  await renderer.pause(950);
                  await kiddo.walk(renderer, 3, { x: 680, y: 190 }, { x: 690 });
                  index = 0;
                  await renderer.pause(1150);
                  await kiddo.walk(renderer, 3, { x: 710, y: 190 });
                  index = 0;
                  while (index++ < 6) {
                     pylon3D.position.modulate(renderer, 66, pylon3D.position.add(10, 0));
                     await kiddo.walk(renderer, 1.5, kiddo.position.add(3, 0));
                     await kiddo.walk(renderer, 3, kiddo.position.add(7, 0));
                  }
                  await renderer.pause(450);
                  await kiddo.walk(renderer, 3, { x: 770, y: 280 }, { x: 790, y: 310 });
                  index = 0;
                  while (index++ < 3) {
                     pylon3H.position.modulate(renderer, 66, pylon3H.position.subtract(10, 0));
                     await kiddo.walk(renderer, 1.5, kiddo.position.subtract(3, 0));
                     await kiddo.walk(renderer, 3, kiddo.position.subtract(7, 0));
                  }

                  // return to sender
                  await kiddo.walk(
                     renderer,
                     3,
                     { y: 280 },
                     { x: goatbro.position.x, y: 280 },
                     goatbro.position.add(0, 21)
                  );

                  // end script
                  await renderer.pause(650);
                  await dialogue('auto', ...text.a_foundry.genotext.asriel40());
                  goatbro.face = 'up';
                  await renderer.pause(850);
                  await foundryScript('puzzle3', 'cutscene');
                  await renderer.pause(450);
                  await dialogue('auto', ...text.a_foundry.genotext.asriel41);
                  const cammie = new CosmosObject({ position: kiddo.position });
                  game.camera = cammie;
                  await kiddo.walk(renderer, 3, goatbro.position.add(-21, 21), goatbro.position.add(-21, 0));
                  kiddo.face = 'right';
                  tracker.supplant('right');
                  await renderer.pause(650);
                  await dialogue('auto', ...text.a_foundry.genotext.asriel42);
                  await cammie.position.modulate(renderer, 450, player.position.value());
                  game.camera = player;
                  kiddo.metadata.override = false;
                  renderer.region[0].y = OGregion;
                  SAVE.data.n.state_foundry_puzzlepylon3Ax = pylon3A.position.x;
                  SAVE.data.n.state_foundry_puzzlepylon3Ay = pylon3A.position.y;
                  SAVE.data.n.state_foundry_puzzlepylon3Dx = pylon3D.position.x;
                  SAVE.data.n.state_foundry_puzzlepylon3Dy = pylon3D.position.y;
                  SAVE.data.n.state_foundry_puzzlepylon3Hx = pylon3H.position.x;
                  SAVE.data.n.state_foundry_puzzlepylon3Hy = pylon3H.position.y;
                  game.movement = true;
               }
            }
         }
         break;
      }
      case 'f_muffet': {
         if (SAVE.data.n.plot < 39) {
            battler.load(groups.muffet);
            renderer.attach(
               'main',
               ...CosmosUtils.populate(2, index =>
                  (subject => {
                     let lastPos = { x: NaN, y: NaN };
                     const anim = new CosmosAnimation({ priority: 1000000, anchor: { x: 0, y: 1 } }).on(
                        'tick',
                        function () {
                           if (subject.position.x !== lastPos.x || subject.position.y !== lastPos.y) {
                              lastPos = subject.position.value();
                              this.enable();
                              this.position = subject.position.clone();
                           } else {
                              this.disable();
                           }
                           let speed = 1;
                           const distance = Math.abs(500 - subject.position.x);
                           if (distance < 40) {
                              this.alpha.value = 1;
                              speed = distance < 0.1 ? 0 : 1 / 4;
                              this.resources === content.iooFGunk3 || this.use(content.iooFGunk3);
                           } else if (distance < 110) {
                              this.alpha.value = 1;
                              speed = 1 / 3;
                              this.resources === content.iooFGunk2 || this.use(content.iooFGunk2);
                           } else if (distance < 180) {
                              this.alpha.value = 1;
                              speed = 1 / 2;
                              this.resources === content.iooFGunk1 || this.use(content.iooFGunk1);
                           } else {
                              this.alpha.value = 0;
                           }
                           if (subject === player) {
                              subject.metadata.speed = speed;
                           }
                        }
                     );
                     Promise.race([ events.on('teleport'), renderer.when(() => SAVE.data.n.plot === 39) ]).then(
                        async () => {
                           renderer.detach('main', anim);
                           if (subject === player) {
                              subject.metadata.speed = 1;
                           }
                        }
                     );
                     return anim;
                  })([ player, kiddo ][index])
               )
            );
         } else if (SAVE.data.n.plot === 72) {
            const mf = instance('main', 'grandmuffdarkened');
            mf && (mf.object.tint = tints.dark02);
         }
         const wr = rand_rad(rng.overworld.compute());
         const amount = 40;
         const spread = 1000 / amount;
         temporary(
            new CosmosObject({
               fill: 0xffffff,
               priority: -1000,
               objects: CosmosUtils.populate(amount, index => {
                  const distance = wr.next();
                  return new CosmosRectangle({
                     alpha: distance / 4,
                     parallax: { x: 1 - distance },
                     position: { x: index * spread + wr.next() * spread },
                     size: { x: 1, y: 300 },
                     anchor: { x: 0 },
                     rotation: CosmosMath.remap(wr.next(), -40, 40)
                  });
               })
            }),
            'below'
         );
         if (SAVE.data.n.plot < 39) {
            const spiders = CosmosUtils.populate(
               5,
               index =>
                  new CosmosObject({
                     alpha: index < SAVE.data.n.state_foundry_spiders ? 0 : 1,
                     position: { y: [ 50, 40, 60, 50, 70 ][index], x: 200 + index * 75 },
                     objects: [
                        new CosmosRectangle({
                           alpha: 0x7f / 0xff,
                           anchor: { x: 0, y: 1 },
                           size: { x: 1, y: 240 },
                           fill: 0xffffff
                        }),
                        new CosmosAnimation({ active: true, resources: content.ionFSpider, anchor: { x: 0 } })
                     ]
                  })
            );
            renderer.attach('main', ...spiders);
            if (SAVE.data.b.papyrus_secret && SAVE.data.n.plot_call < 5) {
               teleporter.movement = false;
               SAVE.data.n.plot_call = 5;
               await dialogue('dialoguerBottom', ...text.a_foundry.secretcallA);
               game.movement = true;
            }
            for (const [ index, spider ] of spiders.entries()) {
               await renderer.when(
                  () => game.room !== 'f_muffet' || (game.movement && player.position.x > spider.position.x - 40)
               );
               if (game.room !== 'f_muffet') {
                  renderer.detach('main', ...spiders);
                  return;
               }
               spider.position.modulate(renderer, 1000, { y: -10 });
               if (SAVE.data.n.state_foundry_spiders < index + 0.5) {
                  SAVE.data.n.state_foundry_spiders = index + 0.5;
               }
               await renderer.when(
                  () => game.room !== 'f_muffet' || (game.movement && player.position.x > spider.position.x - 1)
               );
               if (game.room !== 'f_muffet') {
                  renderer.detach('main', ...spiders);
                  return;
               }
               index === 4 && (player.position.x = 500);
               if (SAVE.data.n.state_foundry_spiders < index + 1) {
                  sounds.spiderLaugh.instance(renderer);
                  SAVE.data.n.state_foundry_spiders = index + 1;
                  await dialogue(
                     'dialoguerBottom',
                     ...[
                        text.a_foundry.spider1,
                        text.a_foundry.spider2,
                        text.a_foundry.spider3,
                        text.a_foundry.spider4,
                        text.a_foundry.spider5
                     ][index]()
                  );
               }
            }
            game.menu = false;
            const battleLoader = battler.load(groups.muffet);
            const mofo = new CosmosAnimation({
               position: { y: -31 },
               anchor: { x: 0, y: 1 },
               resources: content.ionFMuffet
            }).on('tick', function () {
               this.index === 6 && (this.index = 4);
            });
            const platform = new CosmosSprite({
               anchor: { x: 0, y: 1 },
               position: { x: 500 },
               frames: [ content.iooFWeb3 ],
               objects: [ mofo ]
            });
            renderer.attach('main', platform);
            await platform.position.modulate(renderer, 2500, { y: 120 });
            await renderer.pause(1000);
            await dialogue('dialoguerBottom', ...text.a_foundry.spider6());
            sounds.spiderLaugh.instance(renderer);
            mofo.enable();
            await renderer.when(() => mofo.index === 4);
            await renderer.pause(1450);
            renderer.detach('main', ...spiders);
            game.movement = false;
            await antifreeze([ battleLoader, battler.battlefall(player) ]);
            await battler.start(groups.muffet);
            battler.unload(groups.muffet);
            player.position.y = Math.min(Math.max(player.position.y, 155), 190);
            player.face = 'right';
            SAVE.data.n.plot = 39;
            tracker.supplant();
            kiddo.position = player.position.subtract(21, 0);
            // post-battle dialogue
            if (SAVE.data.n.state_foundry_muffet === 1) {
               kiddo.metadata.holdover = true;
               mofo.alpha.value = 0;
               await dialogue('auto', ...text.a_foundry.muffetGeno1());
               const spider = new CosmosAnimation({
                  priority: 1000,
                  position: { x: platform.position.x + 170, y: platform.position.y + mofo.position.y },
                  resources: content.ionFSpider,
                  objects: [
                     new CosmosSprite({
                        anchor: { x: 0, y: 1.5 },
                        position: { y: 5 },
                        frames: [ content.iooFSpiderflower ]
                     })
                  ]
               });
               renderer.attach('main', spider);
               spider.enable();
               while (spider.position.x > platform.position.x + 5) {
                  spider.position.x -= 2;
                  await renderer.on('tick');
               }
               spider.reset();
               await renderer.pause(650);
               const flower = spider.objects[0];
               await Promise.all([
                  flower.position.modulate(
                     renderer,
                     700,
                     { x: flower.position.x - 5 },
                     { x: flower.position.x - 5, y: flower.position.y + 3 }
                  ),
                  renderer.pause(350).then(async () => {
                     await dialogue('dialoguerTop', ...text.a_foundry.muffetGeno1x);
                     kiddo.metadata.holdover = false;
                     await renderer.pause(650);
                  })
               ]);
               spider.objects = [];
               flower.position = spider.position.add(flower.position);
               flower.priority.value = 1000;
               renderer.attach('main', flower);
               renderer
                  .when(() => spider.position.x > platform.position.x + 80)
                  .then(async () => {
                     await Promise.all([
                        platform.position.modulate(renderer, 2500, { y: 0 }),
                        flower.position.modulate(renderer, 2500, { y: flower.position.y - platform.position.y })
                     ]);
                     renderer.detach('main', platform, flower);
                  });
               (async () => {
                  while (spider.position.x < platform.position.x + 170) {
                     spider.position.x += 4;
                     await renderer.on('tick');
                  }
                  renderer.detach('main', spider);
               })();
               await dialogue('dialoguerTop', ...text.a_foundry.muffetGeno2);
               await renderer.pause(1350);
               await dialogue('dialoguerTop', ...text.a_foundry.muffetGeno3);
            } else {
               mofo.reset();
               await dialogue('auto', ...text.a_foundry.muffet1());
               mofo.enable();
               sounds.spiderLaugh.instance(renderer);
               platform.position.modulate(renderer, 2500, { y: 0 }).then(() => {
                  renderer.detach('main', platform);
               });
               await renderer.pause(850);
               tracker.supplant('right');
               await dialogue('dialoguerTop', ...text.a_foundry.muffet2());
               if (!SAVE.data.b.oops) {
                  await dialogue('auto', ...text.a_foundry.truetext.muffet);
               }
            }
            game.movement = true;
            game.menu = true;
         }
         break;
      }
      case 'f_artifact': {
         if (!roomState.active) {
            roomState.active = true;
            if (SAVE.data.b.item_artifact) {
               const box = instance('main', 'artifactbox')!;
               const spr = box.object.objects.filter(x => x instanceof CosmosSprite)[0] as CosmosSprite;
               spr.index = 1;
            }
         }
         break;
      }
      case 'f_path': {
         if (!roomState.active) {
            roomState.active = true;
            if (SAVE.data.n.plot_kidd < 3) {
               await renderer.when(() => game.room === 'f_path' && player.position.x > 300 && game.movement);
               await dialogue('auto', ...text.a_foundry.walktext.path1());
               SAVE.data.n.plot_kidd = 3;
            }
            if (SAVE.data.n.plot_kidd < 3.1) {
               await renderer.when(() => game.room === 'f_path' && player.position.x > 700 && game.movement);
               await dialogue('auto', ...text.a_foundry.walktext.path2());
               SAVE.data.n.plot_kidd = 3.1;
            }
            if (SAVE.data.n.plot_kidd < 3.2) {
               await renderer.when(() => game.room === 'f_path' && player.position.x > 800 && game.movement);
               await dialogue('auto', ...text.a_foundry.walktext.path3());
               SAVE.data.n.plot_kidd = 3.2;
            }
            if (SAVE.data.n.plot_kidd < 3.3) {
               await renderer.when(() => game.room === 'f_path' && player.position.x > 1200 && game.movement);
               await dialogue('auto', ...text.a_foundry.walktext.path4());
               SAVE.data.n.plot_kidd = 3.3;
            }
         }
         break;
      }
      case 'f_plank': {
         if (SAVE.data.n.plot < 42) {
            if (roomState.active) {
               return;
            }
            // normal MK part
            roomState.active = true;
            await renderer.when(() => game.room === 'f_plank' && player.position.x > 120 && game.movement);
            game.movement = false;
            const cam = new CosmosObject({ position: player.position.value() });
            game.camera = cam;
            await dialogue('auto', ...text.a_foundry.walktext.path5);
            game.movement = false;
            kiddo.metadata.override = true;
            await kiddo.walk(renderer, 3, player.position.add(0, player.position.y > 110 ? -21 : 21), {
               x: 155,
               y: 110
            });
            game.movement = false;
            kiddo.face = 'right';
            await renderer.pause(650);
            game.movement = false;
            kiddo.face = 'left';
            await renderer.pause(1150);
            game.movement = false;
            await dialogue('auto', ...text.a_foundry.walktext.path6());
            game.movement = false;
            kiddo.face = 'right';
            await renderer.pause(850);
            game.movement = false;
            kiddo.alpha.value = 0;
            const spr = new CosmosSprite({
               anchor: { x: 0, y: 1 },
               position: kiddo.position.value(),
               frames: [ content.iocKiddCrouch ]
            });
            renderer.attach('main', spr);
            await renderer.pause(1000);
            game.movement = false;
            await dialogue('auto', ...text.a_foundry.walktext.path7());
            game.movement = false;
            await player.walk(renderer, 3, kiddo.position.subtract(21, 0));
            game.movement = false;
            await renderer.pause(650);
            game.movement = false;
            await player.position.modulate(renderer, 750, kiddo.position.subtract(0, 15));
            game.movement = false;
            await renderer.pause(150);
            game.movement = false;
            renderer.pause(650).then(() => {
               renderer.detach('main', spr);
               kiddo.alpha.value = 1;
            });
            await new Promise<void>(async resolve => {
               const midPoint = player.position.subtract(-37.5, 10).value();
               const endPoint = player.position.add(75, 15).value();
               player.position.modulate(renderer, 1000, midPoint, endPoint).then(async () => {
                  resolve();
               });
               while (player.position.x < endPoint.x) {
                  await renderer.pause(
                     player.position.y < midPoint.y - 5 ? 133 : player.position.y < midPoint.y - 10 ? 99 : 66
                  );
                  player.face = (
                     { up: 'left', left: 'down', down: 'right', right: 'up' } as CosmosKeyed<
                        CosmosDirection,
                        CosmosDirection
                     >
                  )[player.face];
               }
            });
            game.movement = false;
            await renderer.pause(350);
            game.movement = false;
            player.face = 'left';
            await renderer.pause(850);
            game.movement = false;
            await dialogue('auto', ...text.a_foundry.walktext.path8());
            game.movement = false;
            kiddo.walk(renderer, 3, { x: 30, y: 110 }).then(() => {
               renderer.detach('main', kiddo);
            });
            await cam.position.modulate(renderer, 2000, player.position.value());
            game.camera = player;
            game.movement = true;
            game.menu = false;

            // wait for player to enter trap zone
            await renderer.when(() => player.position.x > 400 && game.movement);
            player.face = 'right';
            game.movement = false;
            game.menu = true;
            const spearSpr = new CosmosSprite({
               position: { x: 420, y: -110 },
               frames: [ content.iooFSpear ], // fear spear
               anchor: { x: 0, y: 1 }
            });
            renderer.attach('above', spearSpr);
            sounds.arrow.instance(renderer);
            await spearSpr.position.modulate(renderer, 300, { y: 110 });
            game.movement = false;
            const fd = fader({ fill: 0xffffff, alpha: 1 });
            renderer.detach('above', spearSpr);
            spearSpr.priority.value = -294867948;
            renderer.attach('below', spearSpr);
            spearSpr.position.modulate(renderer, 450, { y: 330 }).then(() => {
               renderer.detach('below', spearSpr);
            });
            shake(4, 1000);
            sounds.landing.instance(renderer);

            // bridgefall
            const faker = instance('below', 'fakebridge')!.object;
            faker.velocity.set(2, -7);
            faker.gravity.y = 0.5;
            faker.spin.value = -0.5;
            await fd.alpha.modulate(renderer, 300, 0);
            game.movement = false;
            await renderer.pause(300);
            game.movement = false;
            cam.position.set(player);
            game.camera = cam;

            const fakekid = character('mogus2', characters.kiddSad, kiddo, 'right');

            // start kidd walkback if applicable
            if (SAVE.data.n.state_foundry_muffet === 1) {
               renderer.detach('main', fakekid);
            }

            // spawn chaser undyne
            let hover = true;
            const time = renderer.time;
            const fishPosition = new CosmosPoint({ x: 260, y: cam.position.y - 120 });
            const fish = character('undyneArmorJetpack', characters.undyneArmorJetpack, fishPosition.value(), 'down')
               .on('tick', function () {
                  this.position.set(fishPosition);
                  if (hover) {
                     this.position.y += CosmosMath.wave(((renderer.time - time) % 1200) / 1200) * 2;
                  }
               })
               .on('tick', alphaCheck);

            // make fish fall
            const flame = sounds.jetpack.instance(renderer);
            renderer
               .when(() => fish.position.y > player.position.y - 15)
               .then(() => {
                  sounds.noise.instance(renderer);
                  fish.preset = characters.undyneArmor;
                  flame.stop();
               });
            flame.gain.modulate(renderer, 1150, flame.daemon.gain * 0.4);
            await fishPosition.modulate(
               renderer,
               1150,
               fishPosition.value(),
               { y: player.position.y },
               { y: player.position.y }
            );
            game.movement = false;
            hover = false;
            sounds.stomp.instance(renderer).gain.value *= 0.6;
            shake(2.5, 500);
            await renderer.pause(650);
            game.movement = false;

            // face da music
            fish.face = 'right';
            await renderer.pause(1250);
            game.movement = false;
            if (SAVE.data.n.state_foundry_muffet !== 1) {
               renderer.pause(500).then(() => (fish.face = 'left'));
               await cam.position.modulate(renderer, 1000, { x: 280 });
               game.movement = false;
               fakekid.walk(renderer, 3, { x: 140 });
               await dialogue('auto', ...text.a_foundry.walktext.rescue1());
               game.movement = false;
               await renderer.pause(500);
               game.movement = false;
               fish.face = 'right';
               await renderer.pause(650);
               game.movement = false;
               fakekid.key = 'kidd';
               header('x1').then(() => fakekid.sprite.disable());
               await dialogue('auto', ...text.a_foundry.walktext.rescue2);
               game.movement = false;
               await cam.position.modulate(renderer, 1000, { x: player.position.x });
               game.movement = false;
               renderer.detach('main', fakekid);
               renderer.pause(850).then(async () => {
                  await dialogue('auto', ...text.a_foundry.walktext.rescue3);
               });
            }

            // fish walks towards player
            const stepSFX = () => {
               if (fish.sprite.index % 2 === 0 && fish.sprite.step === 0) {
                  sounds.stomp.instance(renderer);
               }
            };

            // walk towards player X
            fish.idle = false;
            fish.on('tick', stepSFX);
            fish.face = 'right';
            characters.undyneArmor.walk.right.duration = 6;
            characters.undyneArmor.walk.right.enable();
            while (fishPosition.x < player.position.x - 18) {
               await renderer.on('tick');
               fishPosition.x = Math.min(fishPosition.x + 1, player.position.x - 18);
            }
            characters.undyneArmor.walk.right.reset();
            fish.off('tick', stepSFX);
            fish.idle = true;
            await renderer.pause(SAVE.data.n.state_foundry_muffet !== 1 ? 2850 : 1150);
            game.movement = false;

            // stop fish (instead of go fish)
            inventories.kiddAssets.unload();
            await dialogue('auto', ...text.a_foundry.bruh);
            game.movement = false;
            await renderer.pause(500);
            game.movement = false;
            fish.alpha.value = 0;
            const touchie = new CosmosAnimation({
               active: true,
               tint: fish.tint,
               anchor: { x: 0, y: 1 },
               position: fish.position.value(),
               resources: content.iocUndyneKick
            });
            renderer.attach('main', touchie);
            await renderer.when(() => touchie.index === 2);
            game.movement = false;
            touchie.disable();
            const kicker = sounds.kick.instance(renderer);
            shake(1.5, 1400);
            const overlay = new CosmosRectangle({ alpha: 0, fill: 0, size: { x: 320, y: 240 } });
            renderer.attach('menu', overlay);
            cam.position.set(player.position.value());
            player.position.y -= 15;
            player.anchor.y = 0;
            player.sprite.anchor.y = 0;
            renderer.pause(2350).then(() => (touchie.index = 0));
            const memoryLoader = content.amMemory.load();
            await Promise.all([
               player.position.modulate(renderer, 5000, player.position.add(400, -200)),
               player.rotation.modulate(renderer, 5000, 1200),
               overlay.alpha.modulate(renderer, 5000, 1),
               kicker.gain.modulate(renderer, 5000, 1, 0)
            ]);
            game.movement = false;

            // reset player
            player.rotation.value = 0;
            renderer.detach('main', touchie, fish);
            kicker.stop();
            player.anchor.y = 1;
            player.sprite.anchor.y = 1;

            // wait and play memory
            await antifreeze([ memoryLoader, renderer.pause(3000) ]);
            game.movement = false;
            const musicbox = music.memory.instance(renderer);
            const epic = new CosmosText({
               fill: 0xffffff,
               position: { x: 80, y: 100 },
               stroke: -1,
               fontFamily: content.fDeterminationMono,
               fontSize: 16,
               spacing: { x: 1, y: 2 }
            }).on('tick', function () {
               this.content = game.text;
            });
            renderer.attach('menu', epic);
            let ticko = true;
            header('x1').then(async () => {
               overlay.objects.push(
                  new CosmosRectangle({
                     alpha: 0,
                     fill: 0xffffff,
                     size: { x: 320, y: 240 }
                  }).on('tick', function () {
                     if (ticko) {
                        this.alpha.value += 1 / (9 * 12);
                     } else {
                        overlay.objects.splice(overlay.objects.indexOf(this), 1);
                     }
                  })
               );
               while (ticko) {
                  await renderer.on('tick');
                  musicbox.rate.value += 0.5 / (18 * 12);
               }
            });
            await dialogue('dialoguerBase', ...text.a_foundry.musicbox);
            game.movement = false;

            // end memory and tp to landing zone
            ticko = false;
            musicbox.stop();
            content.amMemory.unload();
            game.camera = player;
            renderer.detach('menu', epic);
            await teleport('f_tunnel', 'down', 160, 150, { fast: true });
            game.movement = false;
            await renderer.pause(1000);
            SAVE.data.n.plot = 42;
            game.movement = true;
            game.menu = true;
            overlay.alpha.modulate(renderer, 300, 0).then(() => {
               renderer.detach('menu', overlay);
            });
         } else {
            instance('below', 'fakebridge')?.destroy();
         }
         break;
      }
      case 'f_dummy': {
         if (SAVE.data.n.plot < 42.1) {
            const dummySprite = new CosmosAnimation({
               active: true,
               anchor: { x: 0, y: 1 },
               resources: content.ionODummyDark
            });
            const dummy = temporary(
               new CosmosHitbox({
                  position: { x: 210, y: 120 },
                  anchor: 0,
                  size: { x: 20, y: 10 },
                  objects: [ dummySprite ],
                  metadata: { barrier: true, interact: true, name: 'foundry', args: [ 'fakedummy' ] }
               }),
               'main'
            );
            if (SAVE.data.b.papyrus_secret && SAVE.data.n.plot_call < 5.1) {
               teleporter.movement = false;
               SAVE.data.n.plot_call = 5.1;
               await dialogue('dialoguerBottom', ...text.a_foundry.secretcallB);
               game.movement = true;
            } else if (!world.dead_skeleton && SAVE.data.n.plot_call < 5) {
               teleporter.movement = false;
               SAVE.data.n.plot_call = 5;
               await dialogue('auto', ...text.a_foundry.sanscall2());
               game.movement = true;
            }
            await renderer.when(() => game.room !== 'f_dummy' || (player.position.y > 300 && game.movement));
            if (game.room !== 'f_dummy') {
               return;
            }
            game.movement = false;
            SAVE.data.n.plot = 42.1;
            game.music?.stop();
            player.face = 'down';
            const bigAssets = new CosmosInventory(
               content.asDununnn,
               content.ionODummyMadDark,
               content.ionODummyMad,
               content.asShatter,
               content.ionODummyRage,
               content.ionODummy,
               content.asBoom,
               content.amPredummy,
               ...(16 <= SAVE.data.n.kills_wastelands ? [ content.ionODummyGlad, content.ionODummyBlush ] : [])
            );
            bigAssets.name = 'bigAssets';
            const bigLoader = bigAssets.load();
            const battleLoader =
               SAVE.data.n.state_wastelands_toriel === 0 ? void 0 : battler.load(commonGroups.maddummy);
            await renderer.pause(1150);
            const cam = new CosmosObject({ position: { x: 160, y: player.position.y } });
            game.camera = cam;
            await cam.position.modulate(renderer, 850, { x: 160, y: player.position.y - 100 });
            cam.position.x = 160;
            await antifreeze([ bigLoader, renderer.pause(850) ]);
            const region = renderer.region;
            renderer.region = [
               { x: -Infinity, y: -Infinity },
               { x: Infinity, y: Infinity }
            ];
            const start = cam.position.value();
            await Promise.all([ autozoom(1.8, 266), cam.position.modulate(renderer, 266, dummy) ]);
            sounds.dununnn.instance(renderer);
            dummySprite.use(content.ionODummyMadDark);
            await renderer.pause(2450);
            await Promise.all([ autozoom(1, 266), cam.position.modulate(renderer, 266, start) ]);
            renderer.region = region;
            const dummyShake = new CosmosValue();
            const basePos = dummy.position.clone();
            dummy.on('tick', () => {
               dummy.position = basePos.add(
                  (Math.random() - 0.5) * dummyShake.value * 2,
                  (Math.random() - 0.5) * dummyShake.value * 2
               );
            });
            dummyShake.modulate(renderer, 350, 0, 2);
            await renderer.pause(350);
            await Promise.all([
               dummy.alpha.modulate(renderer, 500, 1, 0),
               dummyShake.modulate(renderer, 500, 0, 0),
               basePos.modulate(renderer, 500, basePos.value(), basePos.subtract(0, 60))
            ]);
            await cam.position.modulate(renderer, 850, { x: 160, y: player.position.y });
            game.camera = player;
            basePos.set(player.position.subtract(0, 140));
            dummyShake.modulate(renderer, 500, 2, 0);
            await renderer.pause(350);
            dummySprite.use(content.ionODummyMad);
            const overDummy = new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.ionODummyMadDark
            });
            dummySprite.attach(overDummy);
            const cover = new CosmosRectangle({
               fill: 0xffffff,
               size: { x: 320, y: 240 }
            });
            renderer.attach('menu', cover);
            sounds.boom.instance(renderer);
            shake(2, 800);
            const loop = music.predummy.instance(renderer);
            loop.gain.value /= 8;
            await Promise.all([
               loop.gain.modulate(renderer, 500, loop.gain.value * 8),
               dummy.alpha.modulate(renderer, 500, 1, 1),
               cover.alpha.modulate(renderer, 500, 1, 0),
               basePos.modulate(renderer, 500, basePos.add(0, 60), basePos.add(0, 60), basePos.add(0, 60)),
               overDummy.alpha.modulate(renderer, 500, 0)
            ]);
            renderer.detach('menu', cover);
            let wav = 2;
            const time = renderer.time;
            dummy.on('tick', () => {
               dummy.position.y = basePos.y - CosmosMath.wave(((renderer.time - time) % 4000) / 4000) * wav;
            });
            if (SAVE.data.b.f_state_dummypunch) {
               await dialogue('dialoguerBottom', ...text.a_foundry.dummy1c());
            } else if (SAVE.data.b.f_state_dummyhug) {
               await dialogue('dialoguerBottom', ...text.a_foundry.dummy1x());
            } else if (SAVE.data.b.f_state_dummytalk) {
               await dialogue('dialoguerBottom', ...text.a_foundry.dummy1b());
            } else {
               await dialogue('dialoguerBottom', ...text.a_foundry.dummy1a());
            }
            if (SAVE.data.n.state_wastelands_toriel === 0) {
               header('x1').then(() => {
                  loop.stop();
                  sounds.shatter.instance(renderer);
                  dummySprite.reset().use(content.ionODummy);
               });
               if (SAVE.data.n.state_wastelands_toriel !== 0) {
                  header('x2').then(() => {
                     dummySprite.use(content.ionODummyMad).enable();
                  });
               }
            } else if (16 <= SAVE.data.n.kills_wastelands) {
               header('x1').then(() => {
                  dummySprite.reset().use(content.ionODummyRage);
                  dummySprite.enable();
               });
            } else if (SAVE.data.n.state_wastelands_dummy === 4) {
               header('x1').then(() => {
                  dummySprite.use(content.ionODummy);
               });
            }
            await dialogue('dialoguerBottom', ...text.a_foundry.dummy2());
            if (SAVE.data.n.state_wastelands_toriel === 0) {
               basePos.y = dummy.position.y;
               wav = 0;
               dummyShake.modulate(renderer, 350, 0, 2);
               await renderer.pause(350);
               await Promise.all([
                  dummyShake.modulate(renderer, 500, 0, 0),
                  basePos.modulate(renderer, 500, basePos.value(), basePos.subtract(0, 180))
               ]);
            } else {
               if (16 <= SAVE.data.n.kills_wastelands) {
                  await renderer.pause(1450);
                  loop.stop();
                  sounds.shatter.instance(renderer);
                  dummySprite.use(content.ionODummyBlush);
                  await renderer.pause(1450);
                  header('x3').then(() => {
                     dummySprite.use(content.ionODummyGlad);
                  });
                  await dialogue('dialoguerBottom', ...text.a_foundry.dummy3);
               } else {
                  loop.stop();
                  sounds.shatter.instance(renderer);
                  dummySprite.use(content.ionODummyRage);
                  await renderer.pause(1450);
               }
               await antifreeze([ battleLoader, battler.battlefall(player) ]);
               await battler.start(commonGroups.maddummy);
               game.movement = false;
               battler.unload(commonGroups.maddummy);
            }
            renderer.detach('main', dummy);
            if (world.genocide || world.killed5) {
               while (world.population > 0) {
                  world.bully();
                  SAVE.data.n.evac_foundry++;
               }
            }
            if (!world.genocide) {
               const mover = 16 <= SAVE.data.n.kills_wastelands || SAVE.data.n.state_wastelands_toriel === 0;
               const napsta = character(
                  'napstablook',
                  characters.napstablook,
                  { x: 220, y: mover ? 495 : 395 },
                  'down'
               );
               mover && (await napsta.position.modulate(renderer, 1400, { y: 395 }));
               await dialogue('dialoguerTop', ...text.a_foundry.dummy4(mover));
               await renderer.pause(200);
               await napsta.position.modulate(renderer, 1400, { y: 495 });
               await napsta.alpha.modulate(renderer, 500, 0);
               renderer.detach('main', napsta);
               quickresume();
            } else {
               SAVE.data.n.state_foundry_blookdate = 2;
               quickresume(true);
            }
            SAVE.data.n.evac_foundry > 0 && (await dialogue('auto', ...text.a_foundry.evac));
            game.movement = true;
            bigAssets.unload();
         }
         break;
      }
      case 'f_hub': {
         const bbox = instance('main', 'bbox');
         bbox && (bbox.index = 9);
         (SAVE.data.b.svr || world.runaway || world.genocide || (world.population < 6 && !world.bullied)) &&
            instance('main', 'f_clamgirl')?.destroy();
         if (!roomState.active) {
            roomState.active = true;
            if (SAVE.data.n.plot < 43) {
               if (world.genocide) {
                  const loder = inventories.kiddAssets.load();
                  await renderer.when(() => 400 <= player.position.x && game.room === 'f_hub' && game.movement);
                  game.movement = false;
                  SAVE.data.n.plot = 43;
                  player.position.x = 400;
                  game.music?.stop();
                  player.face = 'right';
                  await renderer.pause(450);
                  renderer.attach('main', goatbro);
                  goatbro.metadata.override = true;
                  goatbro.position.set({ x: 200, y: player.position.y });
                  await goatbro.walk(renderer, 3, player.position.add(-21, 0));
                  await renderer.pause(850);
                  await dialogue('auto', ...text.a_foundry.genotext.asriel35());
                  await Promise.all([ renderer.pause(650), loder ]);
                  goatbro.face = 'left';
                  renderer.attach('main', kiddo);
                  kiddo.metadata.override = true;
                  kiddo.preset = characters.kiddSlave;
                  kiddo.position.set({ x: 200, y: player.position.y });
                  kiddo.sprite.duration = 5;
                  await kiddo.walk(renderer, 3, goatbro.position.add(-21, 0));
                  await renderer.pause(1150);
                  await dialogue('auto', ...text.a_foundry.genotext.asriel37());
                  await renderer.pause(450);
                  goatbro.face = 'right';
                  await renderer.pause(850);
                  tracker.supplant('right');
                  await dialogue('auto', ...text.a_foundry.genotext.asriel38());
                  goatbro.metadata.override = false;
                  kiddo.metadata.override = false;
                  kiddo.metadata.barrier = false;
                  kiddo.metadata.interact = false;
                  game.movement = true;
                  quickresume();
               } else if (SAVE.data.n.state_foundry_blookdate < 0.1) {
                  SAVE.data.n.state_foundry_blookdate = 0.1;
                  const napsta = character('napstablook', characters.napstablook, { x: 220, y: 195 }, 'down');
                  await Promise.race([
                     renderer.pause(200).then(async () => {
                        await napsta.walk(renderer, 3, { y: 255 });
                        await napsta.alpha.modulate(renderer, 500, 0);
                     }),
                     events.on('teleport')
                  ]);
                  renderer.detach('main', napsta);
               }
            }
         }
         break;
      }
      case 'f_blooky': {
         (world.killed0 || SAVE.data.b.svr || world.runaway || world.genocide) &&
            instance('main', 'f_snail1')?.destroy();
         (world.killed0 || SAVE.data.b.svr || world.runaway || world.genocide) &&
            instance('main', 'f_snail2')?.destroy();
         if (
            SAVE.data.n.plot < 71.2 &&
            !world.genocide &&
            SAVE.data.n.plot !== 47.2 &&
            !world.scared_ghost &&
            !SAVE.data.b.a_state_napstadecline
         ) {
            if (SAVE.data.n.state_foundry_blookdate < 2) {
               if (SAVE.data.n.state_foundry_blookdate < 0.2 && SAVE.data.n.plot <= 48.1) {
                  SAVE.data.n.state_foundry_blookdate = 0.2;
                  const blooker = character('napstablook', characters.napstablook, { x: 280, y: 200 }, 'right');
                  await Promise.race([
                     events.on('teleport'),
                     renderer.pause(200).then(async () => {
                        await blooker.walk(renderer, 3, { x: 320, y: 200 }, { x: 390, y: 130 });
                        await blooker.alpha.modulate(renderer, 300, 0);
                     })
                  ]);
                  renderer.detach('main', blooker);
               }
               break;
            }
            const blooker = character('napstablook', characters.napstablook, { x: 120, y: 90 }, 'down', {
               anchor: 0,
               metadata: { barrier: true, interact: true, name: 'foundry', args: [ 'blooktouch' ], tags: [ 'blookishly' ] },
               size: { x: 10, y: 10 }
            }).on('tick', function () {
               this.alpha.value = (player.position.x - 10) / 30;
            });
            events.on('teleport').then(() => {
               renderer.detach('main', blooker);
            });
         }
         break;
      }
      case 'f_tunnel': {
         (SAVE.data.b.svr || world.runaway) && instance('main', 'trasher')?.destroy();
         if (SAVE.data.n.plot === 72 && !world.runaway && !SAVE.data.b.svr) {
            temporary(
               new CosmosHitbox({
                  size: { x: 25, y: 5 },
                  anchor: { x: 0, y: 1 },
                  metadata: {
                     barrier: true,
                     interact: true,
                     name: 'foundry',
                     args: [ 'darktoriel' ],
                     tags: [ 'darktoriel' ]
                  },
                  objects: [
                     new CosmosAnimation({
                        anchor: { x: 0, y: 1 },
                        resources: SAVE.data.b.c_state_secret1_used ? content.iocTorielDownTalk : content.iocTorielSad,
                        tint: tints.dark01
                     })
                  ],
                  position: { x: 160, y: 120 }
               }),
               'main'
            );
         }
         if (!roomState.comcheck && world.goatbro && world.kiddo) {
            roomState.comcheck = true;
            await renderer.when(() => game.movement);
            if (!SAVE.flag.b.asriel_trashcom && world.genocide && world.kiddo) {
               SAVE.flag.b.asriel_trashcom = true;
               await dialogue('auto', ...text.a_foundry.walktext.trashcom);
            }
         }
         break;
      }
      case 'f_snail': {
         if (
            SAVE.data.n.plot < 71.2 &&
            !world.genocide &&
            SAVE.data.n.plot !== 47.2 &&
            !world.scared_ghost &&
            !SAVE.data.b.a_state_napstadecline
         ) {
            const blooker = character('napstablook', characters.napstablook, { x: 40, y: 190 }, 'right', {
               anchor: 0,
               metadata: { barrier: true, interact: true, name: 'foundry', args: [ 'blooktouch' ], tags: [ 'blookishly' ] },
               size: { x: 10, y: 10 }
            }).on('tick', function () {
               if (SAVE.data.n.state_foundry_blookdate < 2) {
                  this.alpha.value = 0;
                  this.metadata.barrier = false;
                  this.metadata.interact = false;
               }
            });
            roomState.blookie = blooker;
            events.on('teleport').then(() => {
               renderer.detach('main', blooker);
            });
         } else {
            if (!roomState.comcheck && world.goatbro && world.kiddo) {
               roomState.comcheck = true;
               if (!SAVE.data.b.f_state_kidd_snailcom && world.genocide && world.kiddo) {
                  await renderer.when(() => player.position.x < 240 && game.room === 'f_snail' && game.movement);
                  SAVE.data.b.f_state_kidd_snailcom = true;
                  await dialogue('auto', ...text.a_foundry.walktext.snailcom);
               }
            }
         }
         break;
      }
      case 'f_napstablook': {
         if (SAVE.data.n.state_foundry_blookmusic > 0 && !postSIGMA()) {
            teleporter.nomusic = true;
            musicFilter.value = 0;
            musicConvolver.value = 0;
            napstamusic(roomState);
         } else {
            !world.genocide || SAVE.data.n.plot < 68 || game.music?.stop();
         }
         if (ghostpartyCondition()) {
            roomState.finalghost = temporary(
               character('finalghost', characters.finalghost, { x: 230, y: 100 }, 'up', {
                  anchor: 0,
                  metadata: { barrier: true, interact: true, name: 'trivia', args: [ 'ghostparty1' ] },
                  size: { x: 10, y: 10 }
               }),
               'main'
            );
            const time = renderer.time;
            temporary(
               new CosmosSprite({
                  anchor: { x: 0, y: 1 },
                  frames: [ content.iooAMoneyMew ],
                  position: { x: 125, y: 170 },
                  objects: [
                     new CosmosHitbox({
                        size: { x: 20, y: 10 },
                        anchor: { x: 0, y: 1 },
                        metadata: { barrier: true, interact: true, name: 'trivia', args: [ 'ghostparty2' ] }
                     })
                  ]
               }).on('tick', function () {
                  this.offsets[0].y = CosmosMath.wave(((renderer.time - time) % 4000) / 4000) * -2;
               }),
               'main'
            );
            const metter = new CosmosAnimation({
               resources: content.iocMettatonSeriouspose,
               index: 9,
               anchor: { x: 0, y: 1 }
            });
            speech.emoters.mettaton = metter;
            temporary(
               new CosmosHitbox({
                  position: { x: 125, y: 90 },
                  anchor: { x: 0, y: 1 },
                  size: { x: 57, y: 6 },
                  metadata: { barrier: true, interact: true, name: 'trivia', args: [ 'ghostparty3' ] },
                  objects: [ metter ]
               }),
               'main'
            );
         }
         if (
            !world.genocide &&
            SAVE.data.n.plot !== 47.2 &&
            !world.scared_ghost &&
            SAVE.data.n.plot <= 48.1 &&
            SAVE.data.n.state_foundry_blookdate < 2
         ) {
            roomState.blookie = temporary(
               character('napstablook', characters.napstablook, { x: 230, y: 100 }, 'down', {
                  anchor: 0,
                  metadata: {
                     barrier: true,
                     interact: true,
                     name: 'foundry',
                     args: [ 'blooktouch' ],
                     tags: [ 'blookishly' ]
                  },
                  size: { x: 10, y: 10 }
               }),
               'main',
               () => (roomState.blookie = void 0)
            );
            if (!roomState.active && SAVE.data.n.state_foundry_blookdate < 1) {
               SAVE.data.n.state_foundry_blookdate = 1;
               teleporter.movement = false;
               game.movement = false;
               await renderer.pause(850);
               await dialogue('auto', ...text.a_foundry.blookdate1());
               game.movement = true;
            }
         }
         break;
      }
      case 'f_battle': {
         instance('main', 'darkly')!.object.tint = tints.dark03;
         instance('below', 'epic')!.object.priority.value = -10;
         if (roomState.active) {
            return;
         }
         roomState.active = true;
         if (world.genocide && SAVE.data.n.plot < 48) {
            const fishAzzets = new CosmosInventory(inventories.iocUndyne, content.avUndyne);
            fishAzzets.name = 'fishAzzets';
            const fishLoader = fishAzzets.load();
            const undyneLoaduh = battler.load(groups.undyne);
            await renderer.when(() => game.room === 'f_battle' && player.position.x > 200 && game.movement);
            game.movement = false;
            const UF = SAVE.flag.n.undying;
            await antifreeze([ fishLoader, renderer.pause(UF === 0 ? 850 : 350) ]);
            const fish = character('undyne', characters.undyne, { x: 500, y: 200 }, 'right');
            const cam = new CosmosObject({ position: player.position.value() });
            game.camera = cam;
            if (UF === 0) {
               await cam.position.modulate(renderer, 1000, { x: 350 });
               await renderer.pause(850);
               await dialogue('auto', ...text.a_foundry.genotext.kiddFinal4);
               await renderer.pause(650);
               await cam.position.modulate(renderer, 1000, player.position.value());
               await renderer.pause(1150);
               await dialogue('auto', ...text.a_foundry.genotext.kiddFinal5);
               await renderer.pause(450);
            }
            goatbro.face = 'left';
            await renderer.pause(UF === 0 ? 850 : 650);
            const impact = sounds.impact.instance(renderer);
            impact.rate.value = 1 / 3;
            dialogue('auto', ...text.a_foundry.genotext.kiddFinal6);
            await renderer.pause(133);
            kiddo.metadata.override = true;
            kiddo.face = 'right';
            sounds.notify.instance(renderer).gain.value /= 1.5;
            await notifier(kiddo, false);
            kiddo.sprites.right.duration = 15;
            kiddo.sprites.right.enable();
            await kiddo.position.modulate(renderer, UF === 0 ? 500 : 350, kiddo.position.add(-5, 0));
            kiddo.sprites.right.disable();
            await renderer.pause(UF === 0 ? 850 : 450);
            await kiddo.walk(renderer, 3, { y: 230 }, { x: player.position.x, y: 230 });
            game.camera = kiddo;
            await kiddo.walk(renderer, 3, { x: 300 }, { x: 350, y: 220 });
            UF === 0 && (await renderer.pause(950));
            await kiddo.walk(renderer, UF === 0 ? 1.5 : 3, { x: 440 }, { x: 470, y: 200 });
            await renderer.pause(UF === 0 ? 1150 : 150);
            await notifier(fish);
            fish.face = 'left';
            const quickshake = new CosmosValue();
            const quickshaker = () => {
               kiddo.offsets[0].set(
                  quickshake.value * (Math.random() * 2 - 1),
                  quickshake.value * (Math.random() * 2 - 1)
               );
            };
            kiddo.on('tick', quickshaker);
            quickshake.modulate(renderer, 1000, 0, 1, 0);
            await renderer.pause(UF === 0 ? 850 : 350);
            UF === 0 && (await dialogue('auto', ...text.a_foundry.genotext.kiddFinal7));
            kiddo.off('tick', quickshaker);
            kiddo.offsets[0].set(0);
            SAVE.data.n.plot = 48;
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
               position: renderer.projection(fish.position, game.camera.position)
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
            const cym = sounds.cymbal.instance(renderer, UF === 0 ? 2.5 : 3.5);
            cym.gain.value /= 4;
            cym.gain.modulate(renderer, UF === 0 ? 2500 : 1500, cym.gain.value * 4);
            await renderer.pause(500);
            await Promise.all([ white.alpha.modulate(renderer, UF === 0 ? 2000 : 1000, 1), undyneLoaduh ]);
            const b = battler.start(groups.undyne);
            renderer.detach('menu', black);
            cym.stop();
            player.face = 'right';
            player.position.set(500, 200);
            renderer.detach('main', fish, kiddo);
            game.camera = player;
            await b;
            tracker.supplant('right');
            battler.unload(groups.undyne);
            inventories.kiddAssets.unload();
            pregenoAssets.unload();
            content.amUndynegenoFinal.unload();
            fishAzzets.unload();
            await renderer.pause(1000);
            await dialogue('auto', ...text.a_foundry.genotext.asriel43());
            await renderer.pause(2350);
            await dialogue('auto', ...text.a_foundry.genotext.asriel44);
            let done = false;
            goatbro.metadata.override = true;
            Promise.race([
               player.walk(renderer, 2, { x: 540, y: 200 }, { x: 560, y: 220 }, { x: 1400, y: 220 }).then(() => {
                  player.walk(renderer, 2, { x: 1500 });
               }),
               goatbro.walk(renderer, 2, { x: 540, y: 200 }, { x: 560, y: 220 }, { x: 1400, y: 220 }).then(() => {
                  goatbro.walk(renderer, 2, { x: 1500 });
               })
            ]).then(async () => {
               const overlay1 = new CosmosRectangle({
                  alpha: 0,
                  fill: 0,
                  size: { x: 1000, y: 1000 },
                  anchor: 0
               }).on('tick', function () {
                  this.position.set(player.position);
               });
               renderer.attach('main', overlay1);
               await overlay1.alpha.modulate(renderer, 1000, 1);
               await renderer.when(() => done);
               renderer.detach('main', overlay1);
            });
            await renderer.pause(850);
            goatbro.key = '';
            await dialogue('auto', ...text.a_foundry.genotext.asriel45);
            goatbro.key = 'asriel2';
            await renderer.pause(650);
            // get menu container
            const menu = renderer.layers.menu.container;
            const fad = renderer.fader;
            // remove menu container
            renderer.application.stage.removeChild(menu, fad);
            // remove and retrieve other containers
            const others = renderer.application.stage.removeChildren(0, renderer.application.stage.children.length);
            // make new subcontainer
            const subcontainer = new Container();
            // populate subcontainer
            subcontainer.addChild(...others);
            // add subcontainer and (leftover) menu container to stage
            renderer.application.stage.addChild(subcontainer, menu, fad);
            // script
            const tvticker = () => {
               filters.crt.time += 0.5;
            };
            filters.crt.time = 0;
            subcontainer.filters = [ filters.crt ];
            renderer.on('tick', tvticker);
            const overlay2 = new CosmosRectangle({
               alpha: 0.45,
               fill: 0,
               size: { x: 1000, y: 1000 },
               anchor: 0
            }).on('tick', function () {
               this.position.set(player.position);
            });
            renderer.attach('main', overlay2);
            renderer.zoom.value = 0.7;
            const regdiff = 160 / renderer.zoom.value - 160;
            renderer.region[1].x -= regdiff;
            await renderer.pause(1950);
            await dialogue('auto', ...text.a_foundry.genotext.bombshell1);
            await renderer.pause(1750);
            await dialogue('auto', ...text.a_foundry.genotext.bombshell2);
            await renderer.pause(1950);
            await dialogue('auto', ...text.a_foundry.genotext.bombshell3);
            await renderer.pause(1550);
            await dialogue('auto', ...text.a_foundry.genotext.bombshell4);
            const overlay3 = new CosmosRectangle({
               fill: 0,
               alpha: 0,
               size: { x: 320, y: 240 }
            });
            renderer.attach('menu', overlay3);
            await overlay3.alpha.modulate(renderer, 3000, 1);
            // remove all containers again
            renderer.off('tick', tvticker);
            renderer.application.stage.removeChildren(0, renderer.application.stage.children.length);
            // restore original setup
            renderer.application.stage.addChild(...others, menu, fad);
            // end cutscene
            done = true;
            renderer.detach('main', overlay2);
            player.walk(renderer);
            goatbro.walk(renderer);
            goatbro.metadata.override = false;
            await teleport('a_start', 'right', 20, 280, world);
            renderer.zoom.value = 1;
            renderer.detach('menu', overlay3);
            game.movement = true;
         } else if (SAVE.data.n.plot < 48) {
            battler.load(groups.undyne);
         }
         break;
      }
      case 'f_undyne': {
         if (SAVE.data.b.svr || world.runaway) {
            instance('main', 'f_undynehouse')?.destroy();
            instance('main', 'f_unddate_barrier')?.destroy();
         }
         if (SAVE.data.n.plot_date === 1.3 && SAVE.data.n.plot < 71.2) {
            SAVE.data.b.f_state_exitdate = true;
            game.music?.stop();
            instance('main', 'f_undyne_door')!.index = 7;
            const barrier = instance('main', 'f_unddate_barrier')!.object.objects[0] as CosmosHitbox;
            barrier.metadata.barrier = false;
            barrier.metadata.trigger = true;
            barrier.metadata.name = 'teleport';
            barrier.metadata.args = [ 'f_kitchen', 'up', '160', '230' ];
            SAVE.data.n.plot_date = 1.3;
            events.on('teleport').then(([ f, t ]) => {
               if (t === 'f_hub') {
                  quickresume(true);
               }
            });
         } else if (
            !world.genocide &&
            SAVE.data.n.state_starton_papyrus < 1 &&
            1 <= SAVE.data.n.plot_date &&
            SAVE.data.n.plot_date < 1.3 &&
            SAVE.data.n.plot > 47.2 &&
            SAVE.data.n.plot < 71.2
         ) {
            let trueMusic: CosmosInstance | null = null;
            if (world.trueKills === 0 && SAVE.data.n.state_foundry_undyne === 0) {
               game.music?.stop();
               trueMusic = roomState.trueMusic = music.undynepiano.instance(renderer);
            }
            roomState.papdater && renderer.attach('main', roomState.papdater);
            const papy = (roomState.papdater ??= character('papyrus', characters.papyrus, { x: 160, y: 130 }, 'down', {
               size: { x: 20, y: 5 },
               anchor: { x: 0, y: 1 },
               metadata: {
                  barrier: true,
                  interact: true,
                  name: 'foundry',
                  args: [ 'unddate' ]
               }
            })) as CosmosCharacter;
            papy.on('tick', () => {
               papy.metadata.override || (papy.face = ultimaFacer(papy));
            });
            events.on('teleport').then(([ f, t ]) => {
               trueMusic?.stop();
               renderer.detach('main', papy);
               if (t === 'f_hub') {
                  quickresume(true);
               }
            });
         }
         break;
      }
      case 'f_kitchen': {
         if (roomState.cutsceneInit) {
            if (from === '_void') {
               teleporter.movement = false;
               await renderer.pause(600);
               roomState.kitty ||= 0;
               await dialogue(
                  'auto',
                  ...[
                     text.a_foundry.undroom1,
                     text.a_foundry.undroom2,
                     text.a_foundry.undroom3,
                     text.a_foundry.undroom4,
                     text.a_foundry.undroom5
                  ][Math.min(roomState.kitty++, 4)]()
               );
               game.movement = true;
            }
            break;
         } else {
            roomState.cutsceneInit = true;
         }
         const flamer = instance('main', 'k_flamer')!.object;
         flamer.alpha.value = 0;
         const moosicLoader = content.amDatingfight.load();
         const papy = character('papyrus', characters.papyrus, { x: 140, y: 180 }, 'up');
         let COMEBACKHEREYOULITTLESHIT = false;
         const undyne = character('undyneDate', characters.undyneDate, { x: 160, y: 100 }, 'down', {
            key: 'undyne',
            size: { x: 20, y: 5 },
            anchor: 0,
            metadata: { name: 'foundry', args: [ 'unddate', 'fish' ], barrier: true, interact: true }
         }).on('tick', function () {
            if (!COMEBACKHEREYOULITTLESHIT) {
               if (game.room === 'f_kitchen') {
                  this.alpha.value = 1;
                  this.metadata.barrier = true;
                  this.metadata.interact = true;
               } else {
                  this.alpha.value = 0;
                  this.metadata.barrier = false;
                  this.metadata.interact = false;
               }
            }
         });
         const drawer = instance('main', 'k_bonedrawer')!.object.objects[0] as CosmosAnimation;
         drawer.subcrop.top = 25;
         const broadsword = instance('main', 'k_broadsword')!.object;
         for (const object of broadsword.objects) {
            if (object instanceof CosmosHitbox) {
               object.rotation.value = 45;
               object.metadata.interact = true;
               object.metadata.name = 'trivia';
               object.metadata.args = [ 'k_broadsword' ];
               break;
            }
         }
         await renderer.when(() => game.movement);
         game.movement = false;
         player.face = 'up';
         const blocker = new CosmosObject({
            fill: 0,
            position: { x: 140, y: 200 },
            priority: 1000,
            objects: [
               new CosmosRectangle({ alpha: 0, size: { x: 60, y: 40 }, position: { x: -10 } }),
               new CosmosRectangle({ size: { y: 40 } }),
               new CosmosRectangle({ anchor: { x: 1 }, position: { x: 40 }, size: { y: 40 } }),
               new CosmosHitbox({ size: 40, metadata: { barrier: true } }).on('tick', function () {
                  this.metadata.barrier = game.room === 'f_kitchen';
               })
            ]
         }).on('tick', function () {
            this.alpha.value = game.room === 'f_kitchen' ? 1 : 0;
         });
         player.walk(renderer, 3, { x: 160, y: 195 }).then(async () => {
            renderer.attach('main', blocker);
            await Promise.all([
               blocker.objects[0].alpha.modulate(renderer, 400, 1),
               (blocker.objects[1] as CosmosRectangle).size.modulate(renderer, 400, { x: 20 }),
               (blocker.objects[2] as CosmosRectangle).size.modulate(renderer, 400, { x: 20 })
            ]);
            sounds.pathway.instance(renderer);
            shake(2, 300);
         });
         await renderer.pause(2000);
         if (SAVE.data.b.f_state_exitdate) {
            await dialogue('dialoguerBottom', ...text.a_foundry.unddate5x);
            await renderer.pause(1200);
         } else {
            await dialogue('dialoguerBottom', ...text.a_foundry.unddate5);
            const handout = new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               position: papy.position,
               resources: content.iocPapyrusPresent2
            });
            renderer.detach('main', papy);
            renderer.attach('main', handout);
            handout.enable();
            await renderer.when(() => handout.index === 4);
            handout.disable();
            await renderer.pause(1400);
            await dialogue('dialoguerBottom', ...text.a_foundry.unddate6);
            await undyne.walk(renderer, 3, { y: 170 });
            handout.index = 5;
            await undyne.walk(renderer, 3, { y: 130 });
            undyne.face = 'down';
            renderer.detach('main', handout);
            renderer.attach('main', papy);
            await dialogue('dialoguerBottom', ...text.a_foundry.unddate7);
            await undyne.walk(renderer, 3, { y: 90 }, { x: 150, y: 90 });
            await renderer.pause(1000);
            sounds.noise.instance(renderer);
            while (drawer.subcrop.top > 0) {
               await drawer.on('render');
               drawer.subcrop.top -= 2;
            }
            drawer.subcrop.top = 0;
            await renderer.pause(800);
            drawer.index = 1;
            await renderer.pause(1400);
            while (drawer.subcrop.top < 25) {
               await drawer.on('render');
               drawer.subcrop.top += 2;
            }
            drawer.subcrop.top = 25;
            sounds.noise.instance(renderer);
            await renderer.pause(1000);
            await undyne.walk(renderer, 3, { x: 160 }, { y: 100 });
            undyne.face = 'down';
         }
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate8);
         papy.face = 'left';
         await renderer.pause(600);
         papy.face = 'right';
         await renderer.pause(600);
         papy.face = 'down';
         await renderer.pause(1200);
         papy.face = 'up';
         await renderer.pause(1400);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate9);
         sounds.equip.instance(renderer);
         await renderer.pause(500);
         undyne.face = 'left';
         const filter1 = new MotionBlurFilter([ 1, 0 ], 7, -1);
         renderer.detach('main', papy);
         const jumper = new CosmosAnimation({
            area: renderer.area,
            anchor: { x: 0, y: 1 },
            position: papy,
            resources: content.iocPapyrusLeap,
            filters: [ filter1 ]
         }).on('tick', function () {
            if (this.position.y < 0) {
               renderer.detach('main', this);
            } else if (this.velocity.y < 0) {
               quickshadow(this, this, 'main');
            }
         });
         renderer.attach('main', jumper);
         let offx = -1;
         const windu = instance('main', 'k_window')!.object.objects[0] as CosmosAnimation;
         jumper.enable();
         await renderer.when(() => jumper.index === 2);
         jumper.disable();
         while (filter1.velocity.x < 40) {
            filter1.velocity.x *= 1.15;
            jumper.position.x += offx / 5;
            offx *= -1;
            if (offx < 0) {
               offx -= 1;
            } else {
               offx += 1;
            }
            await jumper.on('render');
         }
         jumper.alpha.value = 1;
         filter1.velocity.x = 0;
         filter1.velocity.y = 30;
         jumper.index = 3;
         jumper.velocity.y = -20;
         sounds.stab.instance(renderer);
         shake();
         await renderer.pause(66);
         sounds.superstrike.instance(renderer).gain.value /= 2;
         await renderer.pause(133);
         sounds.glassbreak.instance(renderer);
         windu.index = 1;
         shake(4, 1000);
         const shards = CosmosUtils.populate(21, i => {
            const xoffset = Math.floor(i / 3);
            const y = 174.5 - xoffset * 2;
            const hbox = new CosmosHitbox({
               metadata: { interact: true, name: 'foundry', args: [ 'shard' ] },
               anchor: 0,
               size: 2
            });
            return new CosmosSprite({
               anchor: 0,
               rotation: Math.random() * 360,
               position: { x: 26.5 + xoffset, y: y - Math.floor(Math.random() * 20) },
               priority: y + 14.5,
               spin: 4 * (Math.random() < 0.5 ? -1 : 1),
               gravity: { y: 0.5 },
               velocity: { x: 1 + Math.random() * 2, y: -2 },
               frames: [ content.iooFShard ],
               metadata: { tags: [ 'ayoooooo' ] },
               objects: [ hbox ]
            }).on('tick', function () {
               if (game.room === 'f_kitchen') {
                  this.alpha.value = 1;
                  hbox.metadata.interact = true;
               } else {
                  this.alpha.value = 0;
                  hbox.metadata.interact = false;
               }
               if (this.gravity.y !== 0 && this.priority.value <= this.position.y) {
                  this.gravity.y = 0;
                  this.velocity.set(0);
                  this.position.y = this.priority.value;
                  this.priority.value -= 1000;
                  this.spin.value = 0;
               }
            });
         });
         renderer.attach('main', ...shards);
         await renderer.pause(1500);
         undyne.face = 'down';
         await renderer.pause(2000);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate10());
         if (!SAVE.data.b.undyne_respecc) {
            if (choicer.result === 0) {
               await dialogue('dialoguerBottom', ...text.a_foundry.unddate11b);
            } else {
               await dialogue('dialoguerBottom', ...text.a_foundry.unddate11a());
               if (choicer.result === 0) {
                  await dialogue('dialoguerBottom', ...text.a_foundry.unddate11a1a);
                  await renderer.pause(1600);
                  await dialogue('dialoguerBottom', ...text.a_foundry.unddate11a1b);
               } else {
                  await dialogue('dialoguerBottom', ...text.a_foundry.unddate11a2);
               }
            }
            const dateOMG = new CosmosAnimation({
               active: true,
               anchor: { x: 0, y: 1 },
               position: undyne.position,
               resources: content.iocUndyneDateOMG
            });
            renderer.detach('main', undyne);
            renderer.attach('main', dateOMG);
            await dialogue('dialoguerBottom', ...text.a_foundry.unddate12a);
            renderer.detach('main', dateOMG);
            renderer.attach('main', undyne);
            undyne.preset = characters.undyneDateSpecial;
            undyne.face = 'left';
            await dialogue('dialoguerBottom', ...text.a_foundry.unddate12b);
            dateOMG.active = false;
            await renderer.pause(500);
            undyne.face = 'down';
            await dialogue('dialoguerBottom', ...text.a_foundry.unddate12c);
            undyne.sprite.reset();
         }
         const datemusic = music.datingstart.instance(renderer);
         const snacc = new CosmosSprite({
            position: { x: 90, y: 60 },
            anchor: 0,
            metadata: {
               tags: [ 'snacc' ]
            },
            priority: -1000,
            frames: [ content.iooFSnack ],
            objects: [
               new CosmosHitbox({
                  anchor: { x: 0 },
                  size: { x: 20, y: 20 },
                  metadata: { interact: true, name: 'foundry', args: [ 'unddate', 'snack' ] }
               }).on('tick', function () {
                  this.metadata.interact = game.room === 'f_kitchen';
               })
            ]
         }).on('tick', function () {
            this.alpha.value = game.room === 'f_kitchen' ? 1 : 0;
         });
         game.movement = true;
         renderer
            .when(() => roomState.snack || roomState.sittah)
            .then(async () => {
               if (roomState.snack) {
                  undyne.preset = characters.undyneDate;
                  undyne.sprite.reset();
                  await undyne.walk(renderer, 3, { x: 60 }, { x: 60, y: 65 });
                  await renderer.pause(2400);
                  await dialogue('dialoguerBottom', ...text.a_foundry.unddate13a2);
                  await undyne.walk(renderer, 3, { y: 90 }, { x: snacc.position.x, y: 90 });
                  undyne.face = 'up';
                  renderer.attach('main', snacc);
                  await renderer.pause(1200);
                  await undyne.walk(renderer, 3, { x: 160 }, { x: 160, y: 100 });
                  undyne.face = 'down';
                  await dialogue('dialoguerBottom', ...text.a_foundry.unddate13a3);
                  undyne.preset = characters.undyneDateSpecial;
                  undyne.sprite.reset();
                  roomState.snacked = true;
               }
            });
         await renderer.when(() => roomState.sittah);
         player.position.y < 160 && (player.priority.value = 1000);
         await player.position.step(renderer, 1.5, { x: 210, y: 160 });
         player.priority.value = 1000;
         player.face = 'up';
         await renderer.pause(1000);
         if (SAVE.data.b.water) {
            await dialogue('dialoguerTop', ...text.a_foundry.unddate15b());
            SAVE.data.b.water = false;
            await dialogue('dialoguerTop', ...text.a_foundry.unddate15c());
         } else {
            await dialogue('dialoguerTop', ...text.a_foundry.unddate15a());
         }
         undyne.preset = characters.undyneDate;
         await undyne.walk(renderer, 3, { x: 260 }, { x: 260, y: 82.5 });
         await renderer.pause(2300);
         const drink1 = new CosmosAnimation({
            anchor: { x: 0, y: 1 },
            position: { x: 230, y: 62 },
            resources: content.iooFDrinkTea
         });
         const drink2 = new CosmosAnimation({
            anchor: { x: 0, y: 1 },
            position: { x: 210, y: 62 },
            resources: content.iooFDrinkHotchocolate
         });
         const drink3 = new CosmosAnimation({
            anchor: { x: 0, y: 1 },
            position: { x: 190, y: 62 },
            resources: content.iooFDrinkSoda
         });
         const drink4 = new CosmosAnimation({
            anchor: { x: 0, y: 1 },
            position: { x: 160, y: 62 },
            resources: content.iooFDrinkSugar
         });
         const drink5 = new CosmosAnimation({
            anchor: { x: 0, y: 1 },
            position: { x: 130, y: 62 },
            resources: content.iooFDrinkWater
         });
         await undyne.walk(renderer, 3, { y: 90 });
         const drinks = [ drink1, drink2, drink3, drink4, drink5 ];
         for (const drink of drinks) {
            await undyne.walk(renderer, 3, { x: drink.position.x });
            undyne.face = 'up';
            await renderer.pause(900);
            renderer.attach('main', drink);
         }
         await undyne.walk(renderer, 3, { x: 115 }, { x: 115, y: 135 });
         undyne.preset = characters.undyneDateSpecial;
         await dialogue('dialoguerTop', ...text.a_foundry.unddate16());
         await directionalInput();
         let tut = true;
         let sel = true;
         let curtext = '';
         let targetIndex = -1;
         const OGgain = datemusic.gain.value;
         datemusic.gain.value = 0;
         const thrower = new CosmosAnimation({
            anchor: { x: 0, y: 1 },
            position: undyne.position,
            resources: content.iocUndyneDateThrow
         });
         const stabStart = thrower.position.add(12, -38);
         const stabTarget = new CosmosPoint(215, 125);
         const stabAngle = stabStart.angleTo(stabTarget);
         const stabEnd = stabTarget.endpoint(stabAngle, -44);
         const rotassoc = [ 110, 122, 138, 150, 166, 180, 194, 214, 255 ];
         const stabber = new CosmosSprite({
            frames: [ content.iooFSpear ],
            position: stabStart,
            rotation: stabAngle - 90,
            velocity: CosmosMath.ray(stabAngle, 12),
            anchor: { x: 0 },
            metadata: { state: 0, hit: void 0 as boolean | void }
         }).on('tick', function () {
            switch (this.metadata.state) {
               case 0:
                  if (this.position.x > stabEnd.x || this.position.y > stabEnd.y) {
                     this.metadata.state = 1;
                     this.metadata.hit = true;
                     this.velocity.set(0);
                     this.position.set(stabEnd);
                     this.frames[0] = content.iooFSpearStab;
                     for (const subobject of instance('main', 'k_table')!.object.objects) {
                        if (subobject instanceof CosmosSprite) {
                           subobject.index = 1;
                           break;
                        }
                     }
                     {
                        const whitefader = new CosmosRectangle({ fill: 0xffffff, size: { x: 320, y: 240 } });
                        renderer.attach('menu', whitefader);
                        whitefader.alpha.modulate(renderer, 300, 0).then(() => {
                           renderer.detach('menu', whitefader);
                        });
                     }
                     sounds.landing.instance(renderer);
                     shake(4, 1000);
                  }
                  break;
               case 2:
                  if (sel) {
                     const inc = keyState.special ? 2 : 1;
                     keyState.left && (this.rotation.value -= inc);
                     keyState.right && (this.rotation.value += inc);
                     this.rotation.value = Math.min(Math.max(this.rotation.value, 100), 260);
                     targetIndex = -1;
                     curtext = tut ? text.a_foundry.unddate19x : '';
                     for (const [ index, angle ] of rotassoc.entries()) {
                        if (Math.abs(this.rotation.value - angle) <= 5) {
                           targetIndex = index;
                           curtext = text.a_foundry.unddate19y()[index];
                           tut = false;
                           break;
                        }
                     }
                  }
                  break;
            }
         });
         renderer.detach('main', undyne);
         renderer.attach('main', thrower, stabber);
         thrower.enable();
         sounds.arrow.instance(renderer);
         stabber.on('render').then(() => {
            stabber.priority.value = 999;
         });
         await renderer.when(() => thrower.index === 2);
         renderer.detach('main', thrower);
         renderer.attach('main', undyne);
         undyne.face = 'right';
         await renderer.pause(1600);
         await dialogue('dialoguerTop', ...text.a_foundry.unddate17());
         undyne.face = 'down';
         datemusic.gain.value = OGgain;
         await dialogue('dialoguerTop', ...text.a_foundry.unddate18());
         stabber.metadata.state = 1;
         await stabber.alpha.modulate(renderer, 300, 0);
         stabber.frames[0] = content.iooFSpear;
         stabber.position.set(210, 148);
         stabber.rotation.value = 135;
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
                  this.content = curtext;
               })
            ]
         });
         renderer.attach('menu', infobox);
         let madeSelection = false;
         let drinkChoice = 0;
         const drinkChoices = [ 2, 4, 5, 6 ];
         const selector = async function () {
            if (sel && targetIndex > -1) {
               sel = false;
               infobox.alpha.value = 0;
               atlas.switch('dialoguerBottom');
               await dialogue_primitive(...text.a_foundry.unddate20[targetIndex]());
               if (drinkChoices.includes(targetIndex)) {
                  await dialogue_primitive(...text.a_foundry.unddate21());
                  if (choicer.result === 0) {
                     drinkChoice = drinkChoices.indexOf(targetIndex);
                     SAVE.data.n.undyne_drink = drinkChoice;
                     await dialogue_primitive(...text.a_foundry.unddate22[drinkChoice]);
                     atlas.switch(null);
                     keys.interactKey.off('down', selector);
                     madeSelection = true;
                     return;
                  }
               }
               atlas.switch(null);
               infobox.alpha.value = 1;
               sel = true;
            }
         };
         stabber.metadata.state = 2;
         stabber.alpha.modulate(renderer, 300, 1);
         keys.interactKey.on('down', selector);
         await renderer.when(() => madeSelection);
         datemusic.gain.modulate(renderer, 2000, 0).then(() => {
            datemusic.stop();
         });
         stabber.alpha.modulate(renderer, 1000, 0).then(() => {
            renderer.detach('main', stabber);
         });
         await renderer.pause(500);
         const teacup = instance('main', 'k_teacup')!.object;
         undyne.preset = characters.undyneDate;
         await undyne.walk(renderer, 3, { y: 90 });
         async function grabTeacup () {
            await undyne.walk(renderer, 3, { x: 100 });
            undyne.face = 'up';
            await renderer.pause(900);
            teacup.alpha.value = 0;
         }
         const teapot = new CosmosAnimation({
            anchor: { x: 0, y: 1 },
            position: { x: 171, y: 64 },
            resources: content.iooFTeapot
         });
         switch (drinkChoice) {
            case 0:
               await grabTeacup();
               await undyne.walk(renderer, 3, { x: drink5.position.x });
               break;
            case 1:
               await grabTeacup();
               await undyne.walk(renderer, 3, { x: drink3.position.x });
               break;
            case 2:
               await grabTeacup();
               await undyne.walk(renderer, 3, { x: 260 });
               undyne.face = 'up';
               await renderer.pause(900);
               await undyne.walk(renderer, 3, { x: drink2.position.x });
               break;
            case 3:
               await undyne.walk(renderer, 3, { x: teapot.position.x });
               undyne.face = 'up';
               await renderer.pause(1400);
               sounds.noise.instance(renderer);
               renderer.attach('main', teapot);
               await renderer.pause(1900);
               undyne.preset = characters.undyneDateSpecial;
               undyne.face = 'down';
               await dialogue('dialoguerBottom', ...text.a_foundry.unddate22x);
               undyne.preset = characters.undyneDate;
               undyne.face = 'up';
               await renderer.pause(4400);
               sounds.slidewhistle.instance(renderer);
               teapot.enable();
               await renderer.pause(1400);
               undyne.preset = characters.undyneDateSpecial;
               undyne.face = 'down';
               await dialogue('dialoguerBottom', ...text.a_foundry.unddate22y());
               undyne.preset = characters.undyneDate;
               await grabTeacup();
               undyne.face = 'up';
               await renderer.pause(900);
               await undyne.walk(renderer, 3, { x: teapot.position.x });
               break;
         }
         undyne.face = 'up';
         await renderer.pause(1300);
         sounds.rustle.instance(renderer);
         if (drinkChoice === 3) {
            renderer
               .when(() => teapot.index === 0)
               .then(() => {
                  teapot.reset().use(content.iooFDrinkTeapot);
               });
         }
         await renderer.pause(700);
         await undyne.walk(renderer, 3, { y: 100 }, { x: 160, y: 100 }, { x: 160, y: 175 }, { x: 190, y: 175 });
         undyne.face = 'up';
         await renderer.pause(1000);
         teacup.position.set(200, 150);
         teacup.alpha.value = 1;
         teacup.priority.value = 500;
         sounds.noise.instance(renderer);
         await renderer.pause(1000);
         undyne.face = 'right';
         await dialogue('dialoguerTop', ...text.a_foundry.unddate23);
         await undyne.walk(renderer, 3, { x: 160 }, { x: 160, y: 105 }, { x: 210, y: 105 }, { x: 210, y: 115 });
         await renderer.pause(850);
         await undyne.walk(renderer, 1.5, { y: 120 });
         undyne.position.y += 5;
         undyne.preset = characters.undyneDateSpecial;
         undyne.face = 'up';
         await renderer.pause(1000);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate24[drinkChoice]);
         await renderer.pause(2400);
         await dialogue('dialoguerBottom', ...CosmosUtils.provide(text.a_foundry.unddate25[drinkChoice]));
         heal(void 0, false);
         if (drinkChoice > 0) {
            await dialogue('dialoguerBottom', ...text.a_foundry.unddate25x());
         }
         await renderer.pause(1400);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate27[drinkChoice], ...text.a_foundry.unddate28());
         const memorymusic = music.memory.instance(renderer);
         await renderer.pause(2000);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate29);
         await renderer.pause(2500);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate30);
         await memorymusic.gain.modulate(renderer, 1500, 0);
         await renderer.pause(1000);
         await dialogue(
            'dialoguerBottom',
            ...text.a_foundry.unddate31(),
            ...text.a_foundry.unddate32[drinkChoice],
            ...text.a_foundry.unddate33()
         );
         undyne.preset = characters.undyneDate;
         undyne.position.y -= 5;
         await undyne.walk(renderer, 3, { x: 160 });
         await antifreeze([ moosicLoader, renderer.pause(1750) ]);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate34);
         undyne.preset = characters.undyneDateSpecial;
         undyne.face = 'left';
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate35);
         const crazyAnim = new CosmosAnimation({
            position: undyne.position,
            anchor: { x: 0, y: 1 },
            resources: content.iocUndyneDateLeap
         }).on('tick', function () {
            this.resources === content.iocUndyneDateKick && this.active && this.index === 0 && this.reset();
         });
         renderer.detach('main', undyne);
         renderer.attach('main', crazyAnim);
         const BADADANUNUNUH = music.datingfight.instance(renderer);
         async function leap (crazyTarget: CosmosPointSimple, height: number, time: number) {
            const halfTarget = new CosmosPoint(
               (crazyTarget.x + crazyAnim.position.x) / 2,
               height - Math.abs(crazyTarget.y - crazyAnim.position.y)
            );
            await crazyAnim.position.modulate(renderer, time, halfTarget, halfTarget, crazyTarget);
            sounds.landing.instance(renderer);
            shake(4, 500);
         }
         crazyAnim.enable();
         await renderer.when(() => crazyAnim.index === 2);
         renderer
            .when(() => crazyAnim.index === 3)
            .then(async () => {
               crazyAnim.disable();
               await renderer.pause(500);
               crazyAnim.index = 1;
            });
         await leap({ x: 90, y: 60 }, 60, 800);
         crazyAnim.index = 0;
         await renderer.pause(500);
         crazyAnim.use(content.iocUndyneDownDate);
         await renderer.pause(1000);
         const trueDrinks = [ ...drinks, ...(drinkChoice === 3 ? [ teapot ] : []) ];
         for (const [ index, drink ] of trueDrinks.entries()) {
            let kick = false;
            const vx = [ 1.1, 1, 0.6, 1.2, 1, 1.4 ][5 - index];
            const floorY = [ 95, 110, 90, 100, 95, 105 ][5 - index];
            function handler () {
               if (drink.index === 0 && floorY <= drink.position.y) {
                  drink.index = 1;
                  drink.gravity.set(0);
                  drink.velocity.set(0);
                  drink.position.y = floorY;
                  drink.acceleration.value = 1;
                  drink.spin.value = 0;
                  drink.priority.value = -1000;
                  sounds.glassbreak.instance(renderer);
                  drink.off('tick', handler);
                  shake(4, 250);
               } else if (!kick && drink.position.x <= crazyAnim.position.x + 8) {
                  kick = true;
                  drink.gravity.y = 0.6;
                  sounds.noise.instance(renderer);
                  crazyAnim.enable();
                  drink.anchor.y = 0;
                  drink.position.y -= drink.compute().y / 2;
                  drink.velocity.set(vx / 1.5, -4);
                  drink.spin.value = vx * 4;
                  drink.acceleration.value = 1 / 1.01;
               }
            }
            drink.on('tick', handler);
         }
         crazyAnim.use(content.iocUndyneDateKick);
         const finalpos = drink1.position.value();
         await crazyAnim.position.modulate(
            renderer,
            (Math.abs(finalpos.x - crazyAnim.position.x) / 4) * (1000 / 30),
            finalpos,
            finalpos
         );
         await renderer.pause(500);
         renderer.detach('main', crazyAnim);
         renderer.attach('main', undyne);
         undyne.preset = characters.undyneDate;
         undyne.position.set(finalpos);
         undyne.face = 'down';
         await renderer.pause(1000);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate36());
         renderer.detach('main', undyne);
         renderer.attach('main', crazyAnim);
         crazyAnim.use(content.iocUndyneDateLeap);
         crazyAnim.priority.value = 1000;
         crazyAnim.enable();
         await renderer.when(() => crazyAnim.index === 2);
         renderer
            .when(() => crazyAnim.index === 3)
            .then(async () => {
               crazyAnim.disable();
               await renderer.pause(500);
               crazyAnim.index = 1;
            });
         await leap(player.position.subtract(19.5, 0), 60, 1200);
         crazyAnim.index = 0;
         await renderer.pause(500);
         crazyAnim.use(content.iocUndyneDownDate);
         await renderer.pause(500);
         crazyAnim.use(content.iocUndyneUpDate);
         await renderer.pause(500);
         crazyAnim.use(content.iocUndyneDateGrab);
         crazyAnim.position.set(player.position);
         crazyAnim.enable();
         await renderer.when(() => crazyAnim.index === 1);
         player.alpha.value = 0;
         await renderer.when(() => crazyAnim.index === 2);
         sounds.grab.instance(renderer);
         await renderer.when(() => crazyAnim.index === 4);
         crazyAnim.disable();
         renderer.pause(500).then(() => (crazyAnim.index = 3));
         await leap({ x: 230, y: 90 }, 60, 1000);
         crazyAnim.step = 0;
         crazyAnim.reverse = true;
         crazyAnim.enable();
         await renderer.when(() => crazyAnim.index === 0);
         player.position.set(crazyAnim.position);
         player.alpha.value = 1;
         await renderer.when(() => crazyAnim.step === crazyAnim.duration - 1);
         renderer.detach('main', crazyAnim);
         renderer.attach('main', undyne);
         undyne.position.set(player.position.subtract(19.5, 0));
         undyne.face = 'up';
         await renderer.pause(500);
         undyne.face = 'right';
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate37);
         renderer.detach('main', undyne);
         renderer.attach('main', crazyAnim);
         crazyAnim.reverse = false;
         crazyAnim.position.set(undyne.position);
         crazyAnim.use(content.iocUndyneDateStomp);
         crazyAnim.priority.value = 0;
         crazyAnim.enable();
         await renderer.when(() => crazyAnim.index === 9);
         crazyAnim.disable();
         sounds.landing.instance(renderer);
         shake(4, 1000);
         const veggies = new CosmosAnimation({
            gravity: { y: 0.3 },
            position: { x: 206, y: -60 },
            resources: content.iooFVeggies
         });
         renderer.attach('main', veggies);
         await Promise.all([
            renderer.pause(500).then(() => {
               renderer.detach('main', crazyAnim);
               renderer.attach('main', undyne);
            }),
            renderer
               .when(() => 28 <= veggies.position.y)
               .then(() => {
                  veggies.gravity.set(0);
                  veggies.velocity.set(0);
                  veggies.position.y = 28;
                  sounds.noise.instance(renderer);
               })
         ]);
         await renderer.pause(800);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate38());
         header('x1').then(() => {
            undyne.preset = characters.undyneDateSpecial;
            undyne.face = 'left';
         });
         if (choicer.result === 0) {
            await dialogue('dialoguerBottom', ...text.a_foundry.unddate39a());
         } else {
            world.meanie || (veggies.index = 2);
            await dialogue('dialoguerBottom', ...text.a_foundry.unddate39b());
         }
         if (world.meanie && choicer.result === 1) {
            const whitefader = fader({ fill: 0xffffff });
            await whitefader.alpha.modulate(renderer, SAVE.flag.b.$option_epilepsy ? 300 : 150, 1);
            veggies.index += 1;
            renderer.detach('main', undyne);
            renderer.attach('main', crazyAnim);
            crazyAnim.use(content.iocUndyneDateTomato);
            sounds.stab.instance(renderer);
            shake(4, 800);
            await renderer.pause(SAVE.flag.b.$option_epilepsy ? 150 : 300);
            whitefader.alpha.modulate(renderer, 300, 0).then(() => renderer.detach('menu', whitefader));
            await renderer.pause(1500);
         } else {
            renderer.detach('main', undyne);
            renderer.attach('main', crazyAnim);
            crazyAnim.reset().use(content.iocUndyneDateUppercut);
            crazyAnim.enable();
            await renderer.when(() => crazyAnim.index === 7);
            {
               const whitefader = new CosmosRectangle({
                  fill: 0xffffff,
                  size: 1000,
                  anchor: 0,
                  position: { x: 160, y: 120 }
               });
               renderer.attach('menu', whitefader);
               whitefader.alpha.modulate(renderer, 300, 0).then(() => {
                  renderer.detach('menu', whitefader);
               });
            }
            sounds.stab.instance(renderer);
            shake(4, 500);
            veggies.index += 1;
            await renderer.when(() => crazyAnim.index === 8);
            crazyAnim.disable();
            await renderer.pause(500);
            crazyAnim.use(content.iocUndyneDateTomato);
            await renderer.pause(1000);
         }
         speech.targets.add(crazyAnim);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate40(choicer.result));
         speech.targets.delete(crazyAnim);
         // final stomp
         crazyAnim.use(content.iocUndyneDateStompTomato);
         crazyAnim.priority.value = 0;
         crazyAnim.enable();
         await renderer.when(() => crazyAnim.index === 9);
         crazyAnim.disable();
         sounds.landing.instance(renderer);
         shake(4, 1000);
         const cookpot = new CosmosAnimation({
            anchor: { x: 0, y: 1 },
            position: { x: 149.5, y: 1 },
            resources: content.iooFCookpotStir
         });
         const spaghetti = new CosmosSprite({
            anchor: { x: 0, y: 1 },
            position: { x: 170.5 },
            frames: [ content.iooFSpaghetti ]
         });
         const chefWrapper = new CosmosObject({
            position: { y: -60 },
            gravity: { y: 0.3 },
            objects: [ cookpot, spaghetti ]
         }).on('tick', function () {
            64 <= this.position.y && (this.position.y = 64);
         });
         renderer.attach('main', chefWrapper);
         await Promise.all([
            renderer.pause(500).then(async () => {
               renderer.detach('main', crazyAnim);
               renderer.attach('main', undyne);
               undyne.preset = characters.undyneDate;
               undyne.face = 'down';
            }),
            renderer
               .when(() => 64 <= chefWrapper.position.y)
               .then(() => {
                  chefWrapper.gravity.set(0);
                  chefWrapper.velocity.set(0);
                  sounds.noise.instance(renderer);
                  chefWrapper.position.modulate(renderer, 200, { y: 62 }, { y: 62 }, { y: 64 });
               })
         ]);
         await renderer.pause(800);
         await undyne.walk(renderer, 3, { x: 130 });
         undyne.face = 'right';
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate41);
         await renderer.pause(1500);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate41x);
         await player.walk(renderer, 3, { x: 160 });
         player.face = 'up';
         await renderer.pause(800);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate41y());
         undyne.face = 'up';
         if (choicer.result === 0) {
            await dialogue('dialoguerBottom', ...text.a_foundry.unddate42a, ...text.a_foundry.unddate43);
         } else {
            chefWrapper.objects = [ cookpot ];
            await dialogue('dialoguerBottom', ...text.a_foundry.unddate42b, ...text.a_foundry.unddate43);
         }
         undyne.face = 'right';
         await renderer.pause(800);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate44);
         undyne.face = 'up';
         curtext = text.a_foundry.unddate45;
         infobox.alpha.value = 1;
         let baseIndex = 0;
         const zeeListener = () => {
            baseIndex++;
            ++cookpot.index === cookpot.frames.length && (cookpot.index = 0);
         };
         keys.interactKey.on('down', zeeListener);
         await renderer.pause(3000);
         infobox.alpha.value = 0;
         if (baseIndex === 0) {
            await dialogue('dialoguerBottom', ...text.a_foundry.unddate46x);
         } else {
            await dialogue('dialoguerBottom', ...text.a_foundry.unddate46);
         }
         const stirAmt1 = baseIndex;
         infobox.alpha.value = 1;
         await renderer.pause(1500);
         infobox.alpha.value = 0;
         if (stirAmt1 === baseIndex) {
            await dialogue('dialoguerBottom', ...text.a_foundry.unddate47x);
         } else {
            await dialogue('dialoguerBottom', ...text.a_foundry.unddate47);
         }
         const stirAmt2 = baseIndex;
         infobox.alpha.value = 1;
         await renderer.pause(1500);
         infobox.alpha.value = 0;
         if (stirAmt2 === baseIndex) {
            await dialogue('dialoguerBottom', ...text.a_foundry.unddate48x);
         } else {
            await dialogue('dialoguerBottom', ...text.a_foundry.unddate48);
         }
         infobox.alpha.value = 1;
         await renderer.pause(2000);
         infobox.alpha.value = 0;
         keys.interactKey.off('down', zeeListener);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate49);
         let wave = true;
         const time = renderer.time;
         const slammer = new CosmosValue();
         const THATSTHESTUFF = new CosmosSprite({
            anchor: { x: 0, y: 1 },
            frames: [ content.iooFSpear ]
         }).on('tick', function () {
            wave && this.position.set(cookpot.position.x + sineWaver(time, 1500, -8, 8), slammer.value);
         });
         renderer.attach('main', THATSTHESTUFF);
         let slams = 0;
         while (slams++ < 16) {
            sounds.arrow.instance(renderer);
            await slammer.modulate(renderer, 125, 62);
            sounds.stab.instance(renderer);
            sounds.landing.instance(renderer);
            shake(4, 1000);
            switch (slams) {
               case 2:
                  cookpot.use(content.iooFTHATSTHESTUFF);
                  break;
               case 4:
                  cookpot.index = 1;
                  break;
               case 6:
                  cookpot.index = 2;
                  break;
               case 8:
                  cookpot.index = 3;
                  break;
            }
            if (slams < 16) {
               await slammer.modulate(renderer, 125, 10);
            }
         }
         wave = false;
         await THATSTHESTUFF.alpha.modulate(renderer, 600, 0);
         renderer.detach('main', THATSTHESTUFF);
         await renderer.pause(400);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate50); // best line ever
         await renderer.pause(1200);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate51);
         undyne.face = 'right';
         await renderer.pause(800);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate52);
         cookpot.use(content.iooFCookpotHeat);
         cookpot.enable();
         undyne.face = 'up';
         curtext = text.a_foundry.unddate53;
         infobox.alpha.value = 1;
         let leftChecker = 0;
         const rotspeed = 360 / 60;
         const stoveknob = instance('main', 'k_stoveknob')!.object;
         baseIndex = 0;
         let heater = true;
         let newTime = renderer.time;
         const yeeListener = async () => {
            leftChecker === 1 && (newTime = renderer.time);
            if (keyState.left) {
               if (leftChecker === 0) {
                  leftChecker = 1;
                  infobox.alpha.value = 0;
                  await dialogue('dialoguerBottom', ...text.a_foundry.unddate53x);
                  infobox.alpha.value = 1;
                  leftChecker = 2;
               }
            } else if (keyState.right) {
               heater && (stoveknob.rotation.value += rotspeed);
            }
            baseIndex = Math.min(Math.floor(stoveknob.rotation.value / 180) * 2, 16);
            while (cookpot.index < baseIndex) {
               cookpot.index += 2;
            }
            if (cookpot.index === baseIndex) {
               cookpot.reverse = false;
            } else {
               cookpot.reverse = true;
            }
         };
         renderer.on('tick', yeeListener);
         await renderer.when(() => 3000 <= renderer.time - newTime);
         infobox.alpha.value = 0;
         if (baseIndex === 0) {
            await dialogue('dialoguerBottom', ...text.a_foundry.unddate54x);
         } else {
            await dialogue('dialoguerBottom', ...text.a_foundry.unddate54);
         }
         const base1 = baseIndex;
         infobox.alpha.value = 1;
         newTime = renderer.time;
         await renderer.when(() => 1000 <= renderer.time - newTime);
         infobox.alpha.value = 0;
         if (baseIndex === base1) {
            await dialogue('dialoguerBottom', ...text.a_foundry.unddate55x);
         } else {
            await dialogue('dialoguerBottom', ...text.a_foundry.unddate55);
         }
         const base2 = baseIndex;
         infobox.alpha.value = 1;
         newTime = renderer.time;
         await renderer.when(() => 1000 <= renderer.time - newTime);
         infobox.alpha.value = 0;
         if (baseIndex === base2) {
            await dialogue('dialoguerBottom', ...text.a_foundry.unddate56x);
         } else {
            await dialogue('dialoguerBottom', ...text.a_foundry.unddate56);
         }
         leftChecker = 2;
         infobox.alpha.value = 1;
         newTime = renderer.time;
         await renderer.when(() => 2000 <= renderer.time - newTime);
         renderer.detach('menu', infobox);
         heater = false;
         if (baseIndex < 16) {
            await dialogue('dialoguerBottom', ...text.a_foundry.unddate57a);
            await stoveknob.rotation.step(renderer, rotspeed * 2, 180 * 9);
            BADADANUNUNUH.stop();
            await dialogue('dialoguerBottom', ...text.a_foundry.unddate57b);
         } else {
            BADADANUNUNUH.stop();
            await dialogue('dialoguerBottom', ...text.a_foundry.unddate58);
         }
         content.amDatingfight.unload();
         sounds.swing.instance(renderer);
         const cym = sounds.cymbal.instance(renderer);
         const exploder = new CosmosRectangle({
            alpha: 0,
            fill: 0xffffff,
            size: { x: 320, y: 240 },
            priority: -Infinity
         });
         renderer.attach('menu', exploder);
         await exploder.alpha.modulate(renderer, 3000, 1);
         renderer.off('tick', yeeListener);
         cookpot.use(content.iooFCookpotBlack);
         renderer.detach('main', undyne);
         renderer.attach('main', crazyAnim);
         crazyAnim.use(content.iocUndyneDateBurnt);
         crazyAnim.position.set(undyne.position);
         flamer.alpha.value = 1;
         let bindex = 0;
         for (const object of flamer.objects as CosmosSprite[]) {
            object.index = bindex++;
         }
         await renderer.pause(1000);
         const blackfader = new CosmosRectangle({ alpha: 1, fill: 0, size: { x: 320, y: 240 } });
         renderer.attach('menu', blackfader);
         cym.stop();
         await renderer.pause(2000);
         exploder.fill = 0x3f3fff;
         exploder.blend = BLEND_MODES.MULTIPLY;
         const deeploop2 = sounds.deeploop2.instance(renderer);
         deeploop2.gain.value /= 8;
         await Promise.all([ deeploop2.gain.modulate(renderer, 1000, 1), blackfader.alpha.modulate(renderer, 1000, 0) ]);
         renderer.detach('menu', blackfader);
         await renderer.pause(1500);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate59);
         await renderer.pause(3500);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate60);
         await renderer.pause(2500);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate61);
         await renderer.pause(2000);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate62());
         await renderer.pause(1500);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate63());
         await renderer.pause(1250);
         renderer.detach('main', crazyAnim);
         renderer.attach('main', undyne);
         undyne.preset = characters.undyneDateSpecial;
         undyne.face = 'left';
         deeploop2.stop();
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate64());
         await battler.encounter(player, groups.dateundyne, false);
         renderer.alpha.value = 0;
         instance('main', 'snacc')?.destroy();
         await teleport('f_undyne', 'up', 140, 180, { fast: true });
         renderer.alpha.modulate(renderer, 300, 1);
         destroyHouse();
         despawnDummy();
         player.priority.value = 0;
         renderer.detach('menu', exploder);
         renderer.detach('main', ...shards, ...trueDrinks, veggies, chefWrapper, blocker);
         COMEBACKHEREYOULITTLESHIT = true;
         undyne.alpha.value = 1;
         undyne.position.set(180, 160);
         undyne.preset = characters.undyneDate;
         undyne.face = 'left';

         await renderer.pause(1500);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate65());
         await renderer.pause(500);
         undyne.face = 'up';
         await renderer.pause(1000);
         undyne.face = 'left';
         await renderer.pause(1000);
         await dialogue('dialoguerBottom', ...text.a_foundry.unddate66());
         undyne.walk(renderer, 3, { x: 160, y: 240 }).then(async () => {
            await Promise.race([ undyne.alpha.modulate(renderer, 300, 0), events.on('teleport') ]);
            renderer.detach('main', undyne);
         });
         if (!SAVE.data.b.oops) {
            await dialogue('dialoguerBottom', ...text.a_foundry.truetext.unddate());
         }
         {
            const barrier = instance('main', 'f_unddate_barrier')!.object.objects[0] as CosmosHitbox;
            barrier.metadata.barrier = true;
            barrier.metadata.trigger = false;
            barrier.metadata.name = void 0;
            barrier.metadata.args = void 0;
         }
         SAVE.data.n.plot_date = 2;
         events.on('teleport').then(() => {
            SAVE.data.n.plot_date = 2.1;
         });
         game.movement = true;
         break;
      }
      case 'f_lobby': {
         const insta = instance('main', 'f_cheesetable');
         if (SAVE.data.b.svr || postSIGMA()) {
            insta?.destroy();
            return;
         }
         const cheesetable = insta!.object;
         if (!cheesetable.metadata.init) {
            cheesetable.metadata.init = true;
            const spr = cheesetable.objects.filter(object => object instanceof CosmosAnimation)[0] as CosmosAnimation;
            spr.container.filterArea = renderer.area!;
            const glf = new GlitchFilter({ slices: 40, offset: 5 });
            spr.on('tick', () => {
               if (spr.index === 0) {
                  if (spr.active) {
                     spr.reset();
                     spr.container.filters = [];
                  } else if (Math.random() < 0.1) {
                     spr.index = 1;
                     spr.enable();
                     spr.container.filters = [ glf ];
                  }
               }
               if (spr.index === 1) {
                  glf.refresh();
               }
            });
         }
         break;
      }
      case 'f_exit': {
         if (SAVE.data.n.plot < 49 && SAVE.data.n.state_foundry_undyne === 1) {
            temporary(
               new CosmosHitbox({
                  objects: [ new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocUndyneFallen ] }) ],
                  anchor: 0,
                  position: { x: 60, y: 100 },
                  size: { x: 49, y: 5 },
                  metadata: { barrier: true, interact: true, name: 'foundry', args: [ 'fallenfish2' ] }
               }),
               'main'
            );
         }
         break;
      }
      case 'f_bird': {
         for (const { object } of instances('main', 'hovercrystal')) {
            object.priority.value = -999999;
         }
         if (
            !world.runaway &&
            SAVE.data.n.plot !== 47.2 &&
            SAVE.data.n.plot > 42 &&
            !world.genocide &&
            SAVE.data.s.state_foundry_deathroom !== 'f_bird'
         ) {
            roomState.bird = temporary(
               new CosmosHitbox({
                  anchor: 0,
                  size: { x: 20, y: 20 },
                  position: { x: player.position.x > 750 ? 1360 : 140, y: 140 },
                  metadata: { barrier: true, interact: true, name: 'foundry', args: [ 'birdcheck' ] },
                  objects: [ new CosmosAnimation({ anchor: { x: 0, y: 1 }, active: true, resources: content.ionFBird }) ]
               }).on('tick', function () {
                  SAVE.data.s.state_foundry_deathroom === 'f_bird' && renderer.detach('main', this);
               }),
               'main'
            );
            break;
         }
      }
   }
}

events.on('teleport', (from, to) => {
   foundryTPE(from, to);
});

events.on('teleport-start', (from, to) => {
   if (SAVE.data.n.epiphany === 1) {
      if (from === 'f_truth') {
         const roomState = (foundryStates.rooms.f_truth ??= {});
         const muzi = roomState.muzi;
         if (muzi) {
            roomState.muzi = void 0;
            muzi?.gain.modulate(renderer, 300, 0).then(() => muzi.stop());
         }
         world.cutscene_override = false;
      } else if (to === 'f_truth') {
         world.cutscene_override = true;
      }
   }
   if (to === 'f_sans' && SAVE.data.n.plot < 35 && !world.dead_skeleton) {
      const rum = rooms.of('f_sans');
      rum.score.music = 'muscle';
      events.on('teleport-start').then(async () => {
         await events.on('teleport');
         rum.score.music = 'factory';
      });
   }
   if (to === 'f_napstablook' && SAVE.data.n.state_foundry_blookmusic > 0 && !postSIGMA()) {
      if (SAVE.data.b.svr) {
         music.uwa.instances[0].gain.modulate(renderer, 300, 0).then(() => music.uwa.stop());
      } else if (SAVE.data.n.plot === 72) {
         music.reunited.instances[0].gain.modulate(renderer, 300, 0).then(() => music.reunited.stop());
      } else if (SAVE.data.n.plot === 47.2) {
         erndyne.metadata.chaser?.gain.modulate(renderer, 300, 0);
      }
   }
});

events.on('teleport-update', () => {
   SAVE.data.n.plot === 47.2 && resetPhish();
});

events.on('tick', () => {
   game.movement && game.room[0] === 'f' && foundryScript('tick');
});

events.on('use', async (key, index) => {
   switch (key) {
      case 'artifact':
         if (game.room === 'f_truth' && SAVE.data.n.epiphany < 1) {
            SAVE.storage.inventory.remove('artifact');
            atlas.switch(null);
            atlas.detach(renderer, 'menu', 'sidebar');
            SAVE.data.n.epiphany = 1;
            world.cutscene_override = true;
            const roomState = (foundryStates.rooms.f_truth ??= {});
            sounds.epiphany.instance(renderer);
            if (SAVE.data.n.plot === 72) {
               if (SAVE.data.b.svr) {
                  music.uwa.instances[0].rate.value = 0;
               } else {
                  music.reunited.instances[0].rate.value = 0;
               }
            } else {
               game.music!.rate.value = 0;
            }
            await renderer.pause(1200);
            const fi = (roomState.fi = new AdvancedBloomFilter({
               threshold: 0.5,
               bloomScale: 0,
               quality: 10,
               brightness: 1
            }));
            (renderer.filters ??= []).push(fi);
            const muzi = (roomState.muzi = music.splendor.instance(renderer));
            muzi.rate.value = 0.75;
            new CosmosValueLinked({
               get value () {
                  return fi.bloomScale;
               },
               set value (v) {
                  fi.bloomScale = v;
               }
            }).modulate(renderer, 2000, 0.5);
            muzi.gain.modulate(renderer, 2000, 0.6);
         }
         break;
      case 'epiphany':
         if (battler.active) {
            const bat = atlas.navigators.of('battlerAdvancedTarget');
            bat.position.x = 0;
            bat.position.y = 0;
            atlas.switch('battlerAdvancedTarget');
            battler.SOUL.alpha.value = 1;
            const [ to ] = await bat.on('to');
            atlas.attach(renderer, 'menu', 'battlerAdvancedText');
            if (to === null) {
               events.fire('select');
               battler.SOUL.alpha.value = 0;
               battler.targetOverride = bat.selection();
               await dialogue('battlerAdvancedText', ...text.a_foundry.tome4());
               const n =
                  battler.targetOverride !== null &&
                  battler.volatile[battler.targetOverride].opponent.metadata.noEpiphany;
               atlas.attach(renderer, 'menu', 'battlerAdvancedText');
               await dialogue(
                  'battlerAdvancedText',
                  [ text.a_foundry.tome5a, text.a_foundry.tome5b(), text.a_foundry.tome5c, text.a_foundry.tome5d ][
                     choicer.result
                  ] + (n ? text.a_foundry.tome5f : ''),
                  ...(n ? [] : [ text.a_foundry.tome5e ])
               );
               atlas.detach(renderer, 'menu', 'battlerAdvancedText');
            } else {
               battler.noItemChoice = true;
            }
         }
         break;
      case 'punchcard':
         if (world.meanie) {
            battler.active && (battler.at += 2 + battler.at_bonus);
            SAVE.storage.inventory.remove(index);
         } else if (!battler.active) {
            content.iePunchcard.load().then(async () => {
               const card = new CosmosSprite({ frames: [ content.iePunchcard ] });
               renderer.attach('menu', card);
               await keys.specialKey.on('down');
               renderer.detach('menu', card);
               game.movement = true;
               content.iePunchcard.unload();
            });
         }
         break;
      case 'tea':
         battler.active && battler.stat.speed.modifiers.push([ 'add', 0.5, Infinity ]);
         break;
      case 'tzn':
         battler.active && (battler.at += 4 + battler.at_bonus);
         break;
      case 'sap':
         battler.active && (battler.regen.time = 60);
         break;
   }
});

player.on('tick', alphaCheck);

typer.on('header', header => {
   switch (header) {
      case 'f.batmusic1':
         battler.music!.gain.value = 0;
         break;
      case 'f.batmusic2':
         battler.music!.gain.modulate(renderer, 1000, battler.music!.daemon.gain);
         break;
   }
});

events.on('battle', async () => {
   if (battler.groups[0] === commonGroups.nobody) {
      if (world.kiddo && SAVE.data.n.state_foundry_muffet !== 1 && !SAVE.data.b.f_state_kidd_nobody) {
         SAVE.data.b.f_state_kidd_nobody = true;
         await events.on('battle-exit');
         battler.encounter_state.movement = false;
         await dialogue('auto', ...commonText.b_party_kidd.mkNobody);
         game.movement = true;
      }
   } else {
      roomReaction({
         f_stand () {
            roomKills().f_stand++;
         },
         async f_telescope (x) {
            const count = ++roomKills().f_telescope;
            if (!(world.genocide || (world.population < 6 && !world.bullied) || count > 1)) {
               const n1 = instance('main', 'f_starkiller');
               if (n1) {
                  x();
                  await n1.talk('a', talkFinder(), 'auto', ...text.a_foundry.starKILLER);
               }
            }
         }
      });
   }
});

export default shops;

CosmosUtils.status(`LOAD MODULE: FOUNDRY AREA (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
