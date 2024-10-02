import { DropShadowFilter } from '@pixi/filter-drop-shadow';
import { OutlineFilter } from '@pixi/filter-outline';
import { ZoomBlurFilter } from '@pixi/filter-zoom-blur';
import { AlphaFilter } from 'pixi.js';
import text from '../../languages/default/text/aerialis';
import { epiphany, MadDummyMetadata, resetBox, standardSize } from '../common/api';
import commonOpponents from '../common/opponents';
import { content, filters, inventories, music, sounds } from '../systems/assets';
import { atlas, events, game, items, renderer, rng, speech, typer } from '../systems/core';
import {
   battler,
   calcDFX,
   deAllB,
   dropShake,
   fader,
   header,
   iFancyYourVilliany,
   mechanics,
   oops,
   quickshadow,
   saver,
   shake,
   sineWaver,
   world
} from '../systems/framework';
import { OutertaleOpponent, OutertaleTurnState, OutertaleVolatile } from '../systems/outertale';
import { SAVE } from '../systems/save';
import {
   CosmosAnimation,
   CosmosAnimationResources,
   CosmosEventHost,
   CosmosImageUtils,
   CosmosInstance,
   CosmosInventory,
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
import { glade } from './extras';
import patterns from './patterns';

export const targetItems = [ 'epiphany', 'old_bomb', 'old_gun', 'old_spray' ];

export async function fancyIntro (fd = fader({ fill: 0xffffff, alpha: 0, priority: 10 })) {
   const light1 = new CosmosAnimation({ resources: content.iooAStagelight, position: { x: -140 } });
   const light2 = new CosmosAnimation({
      resources: content.iooAStagelight,
      position: { x: 140 },
      scale: { x: -1 }
   });
   const lightbox = new CosmosObject({
      position: { x: 160, y: -45 },
      objects: [ light1, light2 ],
      priority: -10
   });
   battler.overlay.attach(lightbox);
   await lightbox.position.modulate(renderer, 1650, { y: 0 });
   sounds.noise.instance(renderer);
   await renderer.pause(850);
   light1.index = 1;
   light2.index = 1;
   sounds.noise.instance(renderer);
   lightbox.attach(
      new CosmosObject({ metadata: { gen: 0 } }).on('tick', async function () {
         if (this.metadata.gen === 0) {
            this.metadata.gen = 5;
            const cloud = new CosmosSprite({
               anchor: { x: 0, y: 1 },
               frames: [ content.iooAStagecloud ],
               velocity: {
                  x: (1 + Math.random() * 2) * (Math.random() < 0.5 ? 1 : -1)
               },
               acceleration: 0.9,
               position: { y: 120 }
            }).on('tick', function () {
               this.priority.value += 1;
            });
            this.attach(cloud);
            await cloud.alpha.modulate(renderer, 2000, 0, 0);
            this.detach(cloud);
         } else {
            this.metadata.gen--;
         }
      })
   );
   const volatile2 = battler.volatile[battler.add(opponents.mettaton2, { x: 160, y: 120 })];
   volatile2.hp = opponents.mettaton2.hp = 400;
   volatile2.container.objects[0].tint = 0;
   volatile2.flirted = SAVE.data.b.flirt_mettaton;
   const bad = world.bad_robot;
   if (bad) {
      const spr = volatile2.container.objects[0] as CosmosSprite;
      spr.metadata.leftLegIndex = 5;
      spr.metadata.rightLegIndex = 5;
      spr.metadata.leftArmIndex = 8;
      spr.metadata.rightArmIndex = 8;
   }
   const a = volatile2.container.area;
   volatile2.container.area = renderer.area;
   const f = new AlphaFilter(0.5);
   (volatile2.container.filters ??= []).push(f);
   const al = new CosmosValue();
   const alphaticker = () => {
      f.alpha = al.value;
   };
   volatile2.container.on('tick', alphaticker);
   await al.modulate(renderer, 1000, 1);
   volatile2.container.off('tick', alphaticker);
   volatile2.container.filters.splice(volatile2.container.filters.indexOf(f), 1);
   volatile2.container.area = a;
   await renderer.pause(1000);
   let mus3: CosmosInstance | null = null;
   bad || (mus3 = music.ohmy.instance(renderer));
   await battler.monster(false, { x: 160, y: 128 }, battler.bubbles.mtt, ...text.b_opponent_mettaton1.turnTalk4());
   await fd.alpha.modulate(renderer, 300, 1);
   if (bad) {
      const head = volatile2.container.objects[0].objects[6] as CosmosSprite;
      head.index = 23;
   }
   battler.overlay.detach(lightbox);
   volatile2.container.objects[0].tint = 0xffffff;
   mus3?.gain.modulate(renderer, 450, 0).then(() => mus3?.stop());
   sounds.upgrade.instance(renderer);
   await renderer.pause(300);
   await fd.alpha.modulate(renderer, 300, 0);
   renderer.detach('menu', fd);
   await renderer.pause(1000);
   if (bad) {
      SAVE.flag.b.gloves = true;
   } else {
      SAVE.flag.b.legs = true;
   }
   await battler.monster(false, { x: 160, y: 128 }, battler.bubbles.mtt, ...text.b_opponent_mettaton1.turnTalk5());
   battler.alpha.value = 1;
}

export const graphMetadata = {
   next: -3,
   offset: 0,
   ratingsmin: 2000,
   ratingsbase: 4000,
   ratingstier: 10000,
   ratingscap: 14000,
   ratingsgain: -0.1,
   ratingsboost: 0,
   eventQueue: [] as { label: string; score: number }[]
};

export function rg (type: 0 | 1, vars: CosmosKeyed = {}) {
   let t = type * 10;
   return new CosmosSprite({
      metadata: { timefactor: 1, size: { y: 80 }, spew: false, sB: void 0 as number | void },
      objects: [
         new CosmosSprite({ frames: [ content.ibcRoyalguardShoes ], anchor: { x: 0 }, metadata: { part: 'shoes' } }),
         new CosmosSprite({ frames: [ content.ibcRoyalguardLegs ], anchor: { x: 0, y: 1 }, metadata: { part: 'legs' } }),
         new CosmosSprite({
            frames: [ content.ibcRoyalguardFlag ],
            anchor: { x: 0, y: 1 },
            metadata: { part: 'flag' },
            position: { y: -21 },
            priority: 1
         }),
         new CosmosSprite({
            frames: [ content.ibcRoyalguardBall ],
            anchor: 0,
            metadata: { part: 'left1' },
            position: { x: -30, y: -45 }
         }),
         new CosmosSprite({
            frames: [ content.ibcRoyalguardBall ],
            anchor: 0,
            metadata: { part: 'right1' },
            position: { x: 30, y: -45 }
         }),
         new CosmosSprite({
            frames: [ content.ibcRoyalguardBall ],
            anchor: 0,
            metadata: { part: 'left2' },
            position: { x: -36, y: -34 }
         }),
         new CosmosSprite({
            frames: [ content.ibcRoyalguardBall ],
            anchor: 0,
            metadata: { part: 'right2' },
            position: { x: 36, y: -34 }
         }),
         new CosmosAnimation({
            resources: content.ibcRoyalguardChestplate,
            anchor: { x: 0, y: 1 },
            metadata: { part: 'chestplate' },
            position: { y: -21 }
         }),
         new CosmosObject({
            metadata: { part: 'head' },
            position: { y: -45 },
            objects: [
               new CosmosObject(), // sweat container (for nervy part)
               new CosmosSprite({
                  frames: [
                     [
                        world.bad_lizard > 1 ? content.ibcRoyalguardRabbitHead : content.ibcRoyalguardCatHead,
                        world.bad_lizard > 1 ? content.ibcRoyalguardDragonHead : content.ibcRoyalguardBugHead
                     ][type]
                  ],
                  anchor: { x: 0, y: 1 }
               })
            ]
         }),
         new CosmosSprite({
            frames: [ content.ibcRoyalguardFist ],
            anchor: 0,
            metadata: { part: 'fist' },
            position: { x: -38, y: -22 },
            priority: 2
         }),
         new CosmosSprite({
            frames: [ content.ibcRoyalguardFalchion ],
            anchor: new CosmosPoint(12.5, 54.5).divide(22, 65).multiply(2).subtract(1).value(),
            metadata: { part: 'falchion' },
            position: { x: 38, y: -22 },
            rotation: 45 / 2,
            priority: 2
         })
      ]
   }).on('tick', function () {
      const v = (t += this.metadata.timefactor) / 4;
      const s = CosmosMath.remap(Math.sin(v), 0, 1, -1, 1);
      if (vars.spew || this.metadata.spew) {
         this.position.x = sineWaver((this.metadata.sB ??= renderer.time as number), 200, -1, 1) * 0.5;
      }
      for (const obj of this.objects) {
         switch (obj.metadata.part) {
            case 'shoes':
               obj.scale.set(CosmosMath.remap(s, 0.97, 1.03), CosmosMath.remap(s, 1.03, 0.97));
               break;
            case 'legs':
               obj.scale.set(CosmosMath.remap(s, 0.97, 1.03), CosmosMath.remap(s, 1.03, 0.97));
               break;
            case 'chestplate':
            case 'flag': {
               const iY = (obj.metadata.iY ??= obj.position.y);
               obj.position.y = CosmosMath.remap(s, iY, iY + 2);
               break;
            }
            case 'head': {
               const iY = (obj.metadata.iY ??= obj.position.y);
               obj.position.y = CosmosMath.remap(s, iY, iY + 3);
               if ((vars.spew || this.metadata.spew) && Math.random() < 0.1) {
                  const spw = obj.objects[0];
                  spw.attach(
                     new CosmosSprite({
                        alpha: 0,
                        frames: [ content.ibcRoyalguardSweat ],
                        anchor: 0,
                        metadata: { t: 0 },
                        position: { y: iY + 17.5 },
                        scale: 0.5,
                        velocity: CosmosMath.ray(Math.random() * -180, 1.85)
                     }).on('tick', function () {
                        this.rotation.value = this.velocity.angle;
                        if (this.metadata.t === 0 && this.alpha.value < 1) {
                           this.alpha.value = Math.min(this.alpha.value + 0.1, 1);
                        } else if (this.metadata.t++ < 15) {
                           this.gravity.y = 0.1;
                        } else {
                           this.alpha.value -= 0.04;
                           if (this.alpha.value < 0.1) {
                              spw.objects.splice(spw.objects.indexOf(this), 1);
                           }
                        }
                     })
                  );
               }
               break;
            }
            case 'left1':
            case 'right1': {
               const iY = (obj.metadata.iY ??= obj.position.y);
               obj.position.y = CosmosMath.remap(Math.sin(v - 0.7), iY, iY + 2, -1, 1);
               break;
            }
            case 'left2':
            case 'right2': {
               const iY = (obj.metadata.iY ??= obj.position.y);
               obj.position.y = CosmosMath.remap(Math.sin(v - 1.4), iY, iY + 2, -1, 1);
               break;
            }
            case 'fist':
            case 'falchion': {
               const iY = (obj.metadata.iY ??= obj.position.y);
               const iR = (obj.metadata.iR ??= obj.rotation.value);
               obj.position.y = CosmosMath.remap(Math.sin(v - 2.1), iY, iY + 2, -1, 1);
               if (obj.metadata.part === 'falchion') {
                  obj.rotation.value = CosmosMath.remap(Math.sin(v - 2.8), iR, iR + 10, -1, 1);
               } else {
                  obj.rotation.value = CosmosMath.remap(Math.sin(v - 2.8), iR, iR - 10, -1, 1);
               }
               break;
            }
         }
      }
   });
}

export function useOld (key: string, state: OutertaleTurnState<any>, spare = true) {
   SAVE.storage.inventory.remove(key);
   if (spare) {
      oops();
      state.volatile.sparable = true;
      battler.spare(state.target);
   }
}

export function ratings (label: string, score: number) {
   if (!world.genocide && !world.bad_robot) {
      const scaled = Math.round(score * 4);
      graphMetadata.eventQueue.push({
         label,
         score: scaled === 0 ? (score > 0 ? 1 : score < 0 ? -1 : 0) : scaled
      });
   }
}

export function graphGen () {
   const rh = 57;
   const rw = 90; // real width
   return new CosmosRectangle({
      fill: -1,
      stroke: 0xffffff,
      size: { x: rw, y: rh },
      border: 1,
      anchor: { y: 1 },
      position: { x: 10, y: rh + 12 },
      metadata: graphMetadata,
      priority: -999,
      objects: [
         new CosmosRectangle({ size: { x: rw, y: 1 }, fill: 0xffff00, stroke: -1 }),
         new CosmosText({
            position: { y: 2 },
            fill: 0xffffff,
            stroke: -1,
            fontFamily: content.fDeterminationSans,
            fontSize: 16
         }),
         new CosmosObject(),
         new CosmosObject({ position: { y: 26 } }),
         new CosmosText({
            fill: 0xffff00,
            stroke: -1,
            fontFamily: content.fDeterminationSans,
            fontSize: 8,
            position: { y: 16 }
         })
      ]
   }).on('tick', function () {
      const displayMultiplier = [ 1, 0.5, 0.1, 0 ][world.bad_lizard];
      this.objects[0].position.y = -3 - (this.metadata.ratingstier / this.metadata.ratingscap) * (this.size.y - 6);
      if (this.metadata.ratingsbase < this.metadata.ratingsmin) {
         this.metadata.ratingsbase = Math.min(
            this.metadata.ratingsbase -
               this.metadata.ratingsgain *
                  5 **
                     CosmosMath.remap_clamped(
                        Math.abs(this.metadata.ratingsmin - this.metadata.ratingsbase),
                        -1,
                        1,
                        0,
                        2000
                     ),
            this.metadata.ratingsmin
         );
      } else {
         this.metadata.ratingsbase = Math.max(
            this.metadata.ratingsbase +
               this.metadata.ratingsgain *
                  5 **
                     CosmosMath.remap_clamped(
                        Math.abs(this.metadata.ratingsmin - this.metadata.ratingsbase),
                        -1,
                        0,
                        0,
                        1000
                     ),
            this.metadata.ratingsmin
         );
      }
      this.metadata.ratingsbase += graphMetadata.ratingsboost;
      for (const { label, score } of this.metadata.eventQueue.splice(0)) {
         const displayScore =
            Math.floor((this.metadata.ratingsbase + score) * displayMultiplier) -
            Math.floor(this.metadata.ratingsbase * displayMultiplier);
         this.metadata.ratingsbase += score;
         const parent = this.objects[3];
         const eventText = new CosmosText({
            fill: displayScore < 0 ? 0xff0000 : displayScore === 0 ? 0x7f7f7f : 0x00ff00,
            stroke: -1,
            fontFamily: content.fDeterminationSans,
            fontSize: 8,
            metadata: { wobble: 4 },
            content: `${label} ${displayScore <= 0 ? '' : '+'}${displayScore.toString()}`
         }).on('tick', function () {
            this.position.set((Math.random() * 2 - 1) * this.metadata.wobble, parent.objects.indexOf(eventText) * 10);
            this.metadata.wobble *= 0.6;
         });
         parent.objects.unshift(eventText);
         renderer.pause(1000).then(async () => {
            await eventText.alpha.modulate(renderer, 1000, 0);
            parent.detach(eventText);
         });
      }
      this.metadata.ratingsbase < 0 && (this.metadata.ratingsbase = 0);
      const basefloor = Math.floor(this.metadata.ratingsbase * displayMultiplier);
      (this.objects[1] as CosmosText).content = text.a_aerialis.ratings.replace('$(x)', basefloor.toString());
      (this.objects[4] as CosmosText).content = text.a_aerialis.gold.replace(
         '$(x)',
         Math.floor(basefloor / 5).toString()
      );
      if (++this.metadata.offset === 3) {
         this.metadata.offset = 0;
         const pos = new CosmosPoint({ x: this.size.x - 5, y: this.metadata.next });
         const rangeBase = this.size.y * (basefloor / this.metadata.ratingscap);
         const rangeMin = Math.max(rangeBase - 8, 3);
         const rangeMax = Math.min(rangeBase + 8, this.size.y - 3);
         this.metadata.next = -(
            rangeMin +
            CosmosMath.linear(Math.random(), 0, 0.44, 0.46, 0.48, 0.5, 0.52, 0.54, 0.56, 1) * (rangeMax - rangeMin)
         );
         const target = { x: pos.x + 5, y: this.metadata.next };
         this.objects[2].attach(
            new CosmosRectangle({
               fill: 0xff00ff,
               stroke: -1,
               position: pos,
               size: { y: 1, x: pos.extentOf(target) },
               anchor: { y: 0 },
               metadata: { parent: this },
               rotation: pos.angleFrom(target) + 180
            }).on('tick', function () {
               this.position.x -= 5 / 3;
               this.position.x < 2 && renderer.post().then(() => this.metadata.parent.objects[2].detach(this));
            })
         );
      }
   });
}

export function selectMTT (...args: [] | ['fight' | 'spare' | 'flee' | 'assist'] | ['act' | 'item', string]) {
   if (args[0] === 'item' && targetItems.includes(args[1])) {
      return;
   }
   const volatile1 = battler.volatile[1];
   const meta = volatile1.container.objects[0].metadata;
   meta.dance = false;
   meta.dancedelay = [ 25, 25, 25, 25, 25, 25, 21, 18, 15, 12, 9, 6, 3, 60, 100, 140, 180, 220, 300, 300, 300 ][
      volatile1.vars.turns
   ];
   graphMetadata.ratingsgain = 0;
}

const opponents = {
   mettaton1: new OutertaleOpponent({
      flirted: () => SAVE.data.b.flirt_mettaton,
      assets: new CosmosInventory(
         content.ibcMettatonBody,
         content.ibcMettatonBodySOUL,
         content.ibcMettatonArmsNoticard,
         content.ibcMettatonArmsThonk,
         content.ibcMettatonArmsWelcome,
         content.ibcMettatonArmsWhaaat,
         content.ibcMettatonWheel,
         content.ibcMettatonFlyawaymyroboticfriend,
         inventories.avMettaton,
         content.ibbBluelightning,
         content.avAlphys,
         content.asQuickelectroshock,
         content.ibuCyanSOUL,
         content.ibcMettatonArmsBruh,
         content.ibcMettatonArmsWhatevs,
         content.ibuCyanReticle,
         content.ibcShyrenBattleAgent,
         content.ibcShyrenBattleFront,
         content.ibcShyrenBattleBack,
         content.ibcDummyMadBase,
         content.ibcDummyMadBody,
         content.ibcDummyMadHead,
         content.ibcDummyMadTorso,
         content.ibbMissile,
         content.ibbDummy,
         content.ibbScribble,
         content.ibcMettatonRocket,
         content.ibbNote,
         content.ibbTheMoves,
         content.ibbLightning,
         content.asUpgrade,
         content.asBomb,
         content.asDrumroll,
         content.asSingBass1,
         content.asSingBass2,
         content.asSingBad1,
         content.asSingBad2,
         content.asSingBad3,
         content.asSingTreble1,
         content.asSingTreble2,
         content.asSingTreble3,
         content.asSingTreble4,
         content.asSingTreble5,
         content.asSingTreble6,
         content.asStab,
         content.asNode
      ),
      hp: 1,
      df: 0,
      exp: 0,
      name: () => text.b_opponent_mettaton1.name,
      acts: () =>
         SAVE.data.n.plot < 67
            ? [
                 [ 'check', text.b_opponent_mettaton1.act_check ],
                 [ 'flirt', text.b_opponent_mettaton1.act_flirt ]
              ]
            : [
                 [ 'check', text.b_opponent_mettaton1.act_check ],
                 [ 'flirt', text.b_opponent_mettaton1.act_flirt ],
                 [ 'turn', text.b_opponent_mettaton1.act_turn ],
                 [ 'burn', text.b_opponent_mettaton1.act_burn ]
              ],
      metadata: { reactOld: true, reactArtifact: true, nootexempt: true },
      handler: battler.opponentHandler({
         vars: {
            attacked: false,
            checked: false,
            flirted: false,
            turns: 0,
            turnResults: CosmosUtils.populate(9, () => 0),
            armRezo: null as CosmosAnimationResources | null,
            host: new CosmosEventHost<{ x: [number] }>(),
            async rtext (cutscene: boolean, ar: CosmosPointSimple, ...lines: string[]) {
               const b = battler.bubbles.twinkly2();
               b.priority.value = Infinity;
               await battler.monster(cutscene, new CosmosPoint(-27.5, -70).add(ar), () => b, ...lines);
            },
            async ltext (cutscene: boolean, al: CosmosPointSimple, ...lines: string[]) {
               await battler.monster(cutscene, new CosmosPoint(27.5, -70).add(al), battler.bubbles.twinkly, ...lines);
            },
            shyren: false,
            maddummy: false,
            totalFails: 0,
            final: { flirt: 0, burn: 0, check: 0, fight: 0, idle: 0 }
         },
         defaultTalk: [],
         bubble: pos =>
            pos.x < 100 ? [ pos.add(35, -70), battler.bubbles.twinkly ] : [ pos.add(-35, -70), battler.bubbles.twinkly2 ],
         async fight ({ volatile, vars }) {
            const n = sounds.node.instance(renderer);
            n.rate.value = 0.867;
            n.gain.value *= 0.7;
            await battler.attack(volatile, { operation: 'none' });
            vars.attacked = true;
            return false;
         },
         preact ({ vars }) {
            vars.flirted = false;
         },
         act: {
            check ({ vars }) {
               vars.checked = true;
            },
            flirt ({ vars }) {
               vars.flirted = true;
            }
         },
         item: {
            async artifact () {
               await battler.human(...text.b_opponent_mettaton1.artifact);
            },
            async old_gun (state) {
               await battler.human(...text.b_opponent_mettaton1.old_gun_text);
               state.talk = text.b_opponent_mettaton1.old_gun_talk;
               useOld('old_gun', state, false);
            },
            async old_bomb (state) {
               await battler.human(...text.b_opponent_mettaton1.old_bomb_text);
               state.talk = text.b_opponent_mettaton1.old_bomb_talk;
               useOld('old_bomb', state, false);
            },
            async old_spray (state) {
               await battler.human(...text.b_opponent_mettaton1.old_spray_text);
               state.talk = text.b_opponent_mettaton1.old_spray_talk;
               useOld('old_spray', state, false);
            },
            async epiphany (state) {
               const container = state.volatile.container;
               const body = container.objects[0] as CosmosAnimation;
               const anim = body.objects[1] as CosmosAnimation;
               const mettamover = body.metadata.mettamover as {
                  wobble: CosmosValue;
                  idealX: number;
                  freeze: boolean;
                  wobbleRate: CosmosValue;
               };
               const x = mettamover.idealX;
               const value = mettamover.wobble.value;
               const quizzerBody = container.metadata.arBody as CosmosAnimation;
               const sideObj1 = container.metadata.side_shy as CosmosObject | void;
               const sideObj2 = container.metadata.side_mdm as CosmosObject | void;
               const armRezo = anim.resources;
               const bodyIndex = body.index;
               await epiphany(
                  state.target,
                  state.volatile,
                  160,
                  { result: false },
                  battler.bubbles.twinkly,
                  () => container.position.add(35, -70),
                  text.b_opponent_mettaton1.epiphaNOPE,
                  () => {
                     body.index = bodyIndex;
                     state.vars.armRezo = armRezo;
                     quizzerBody && (quizzerBody.alpha.value = 1);
                     sideObj1 && (sideObj1.alpha.value = 1);
                     sideObj2 && (sideObj2.alpha.value = 1);
                     mettamover.wobble.value = value;
                     mettamover.idealX = x;
                     container.position.x = x;
                  },
                  () => {
                     body.index = 0;
                     state.vars.armRezo = content.ibcMettatonArmsBruh;
                     quizzerBody && (quizzerBody.alpha.value = 0);
                     sideObj1 && (sideObj1.alpha.value = 0);
                     sideObj2 && (sideObj2.alpha.value = 0);
                     mettamover.wobble.value = 0;
                     mettamover.idealX = 160;
                     container.position.x = 160;
                  }
               );
            }
         },
         async postchoice (state) {
            const container = state.volatile.container;
            const quizzer = container.metadata.ar as CosmosAnimation;
            const body = container.objects[0] as CosmosAnimation;
            const quizzerBody = container.metadata.arBody as CosmosAnimation;
            const mettamover = body.metadata.mettamover as {
               wobble: CosmosValue;
               idealX: number;
               freeze: boolean;
               wobbleRate: CosmosValue;
            };
            const mdpos = { x: 50, y: 120 };
            let idle = true;
            if (state.vars.turns < 1) {
               if (state.vars.checked) {
                  if (SAVE.data.n.plot < 67 || state.vars.final.check++ < 1) {
                     await state.dialogue(false, ...text.b_opponent_mettaton1.checkTalk);
                     idle = false;
                  }
               }
               if (state.vars.attacked) {
                  if (SAVE.data.n.plot < 67 || state.vars.final.fight++ < 1) {
                     await state.dialogue(false, ...text.b_opponent_mettaton1.attackTalk());
                     idle = false;
                  }
               }
               if (state.vars.flirted) {
                  if (SAVE.data.n.plot < 67) {
                     await state.dialogue(false, ...text.b_opponent_mettaton1.flirtTalk);
                  } else if (state.vars.final.flirt < 5) {
                     await state.dialogue(
                        false,
                        ...CosmosUtils.provide(
                           [
                              text.b_opponent_mettaton1.flirtTalk1,
                              text.b_opponent_mettaton1.flirtTalk2,
                              text.b_opponent_mettaton1.flirtTalk3,
                              text.b_opponent_mettaton1.flirtTalk4,
                              text.b_opponent_mettaton1.flirtTalk5
                           ][SAVE.data.n.plot < 67 ? 0 : state.vars.final.flirt++]
                        )
                     );
                     idle = false;
                  }
                  if (SAVE.data.n.plot < 67) {
                     state.volatile.flirted = true;
                     SAVE.data.b.flirt_mettaton = true;
                  } else {
                     state.vars.flirted = false;
                  }
               } else if (state.choice.type === 'act') {
                  if (state.choice.act === 'turn') {
                     await state.dialogue(false, ...text.b_opponent_mettaton1.turnTalk1);
                     body.use(content.ibcMettatonBodyBack);
                     state.vars.armRezo = content.ibcMettatonArmsWelcomeBack;
                     await renderer.pause(1650);
                     await state.dialogue(false, ...text.b_opponent_mettaton1.turnTalk2);
                     body.index = 1;
                     battler.music?.stop();
                     sounds.equip.instance(renderer);
                     mettamover.freeze = true;
                     (body.objects[1] as CosmosSprite).disable();
                     await renderer.pause(1650);
                     await state.dialogue(false, ...text.b_opponent_mettaton1.turnTalk3);
                     body.use(content.ibcMettatonBodyTransform);
                     body.enable();
                     mettamover.wobble.value = 0;
                     state.vars.armRezo = content.ibcMettatonArmsWhaaat;
                     mettamover.freeze = false;
                     mettamover.wobble.modulate(renderer, 4000, 8, 8);
                     const computer = sounds.computer.instance(renderer);
                     await Promise.all([
                        computer.rate.modulate(renderer, 5000, 3),
                        mettamover.wobbleRate.modulate(renderer, 5000, 9, 9)
                     ]);
                     computer.stop();
                     sounds.swing.instance(renderer);
                     const fd = fader({ fill: 0xffffff, alpha: 0, priority: 10 });
                     await fd.alpha.modulate(renderer, 1000, 1);
                     await renderer.pause(750);
                     sounds.mus_ohyes.instance(renderer);
                     await renderer.pause(3000);
                     battler.alpha.value = 0;
                     battler.overlay.detach(state.volatile.container);
                     await fd.alpha.modulate(renderer, 1000, 0);
                     state.volatile.alive = false;
                     await fancyIntro(fd);
                     const graph = graphGen();
                     battler.overlay.attach(graph);
                     state.status = () => () => text.b_opponent_mettaton2.statusX();
                     music.legsIntro.instance(renderer).source!.addEventListener('ended', () => {
                        battler.music = music.legs.instance(renderer, (60 / 148) * 16);
                     });
                     battler.volatile[0].vars.graph = graph;
                     events.on('select', selectMTT);
                     return;
                  } else if (state.choice.act === 'burn' && state.vars.final.burn < 5) {
                     await state.dialogue(
                        false,
                        ...CosmosUtils.provide(
                           [
                              text.b_opponent_mettaton1.burnTalk1,
                              text.b_opponent_mettaton1.burnTalk2,
                              text.b_opponent_mettaton1.burnTalk3,
                              text.b_opponent_mettaton1.burnTalk4,
                              text.b_opponent_mettaton1.burnTalk5
                           ][state.vars.final.burn++]
                        )
                     );
                     idle = false;
                  }
               }
               if (67 <= SAVE.data.n.plot) {
                  if (idle) {
                     await state.dialogue(
                        false,
                        ...CosmosUtils.provide(
                           [
                              text.b_opponent_mettaton1.idleTalk1,
                              text.b_opponent_mettaton1.idleTalk2,
                              text.b_opponent_mettaton1.idleTalk3,
                              text.b_opponent_mettaton1.idleTalk4,
                              text.b_opponent_mettaton1.idleTalk5,
                              text.b_opponent_mettaton1.idleTalk6
                           ][Math.min(state.vars.final.idle++, 5)]
                        )
                     );
                  }
                  await patterns.mettaton2(false, state, 0);
                  game.movement = false;
                  battler.SOUL.alpha.value = 0;
                  await battler.box.size.modulate(renderer, 300, { x: 282.5, y: 65 });
                  return;
               }
               await state.dialogue(false, ...text.b_opponent_mettaton1.turn1);
               mettamover.idealX = 55;
               state.vars.armRezo = content.ibcMettatonArmsThonk;
               body.index = 1;
               SAVE.data.n.state_foundry_undyne > 0 || (quizzer.index = 1);
               await renderer.pause(1350);
               await state.dialogue(false, ...text.b_opponent_mettaton1.turn1a1);
               body.index = 0;
               body.use(content.ibcMettatonBodySOUL);
               body.enable();
               quizzer.index = SAVE.data.n.state_foundry_undyne > 0 ? 30 : 0;
               state.vars.armRezo = content.ibcMettatonArmsNoticard;
               await state.dialogue(false, ...text.b_opponent_mettaton1.turn1a2);
               quizzer.index = SAVE.data.n.state_foundry_undyne > 0 ? 29 : world.bad_lizard < 1 ? 3 : 7;
               await state.vars.rtext(false, quizzerBody, ...text.b_opponent_mettaton1.turn1b1());
               quizzer.index = SAVE.data.n.state_foundry_undyne > 0 ? 30 : world.bad_lizard < 1 ? 4 : 8;
               await state.vars.rtext(false, quizzerBody, ...text.b_opponent_mettaton1.turn1b2());
               await battler.box.size.modulate(renderer, 300, { x: 100, y: 65 });
               battler.SOUL.position.set(160);
               battler.SOUL.alpha.value = 1;
               game.movement = true;
               SAVE.data.n.state_foundry_undyne > 0 || (quizzer.index = world.bad_lizard < 1 ? 4 : 7);
               await patterns.mettatonA(0);
               quizzer.index = SAVE.data.n.state_foundry_undyne > 0 ? 15 : 0;
               await renderer.pause(950);
               state.vars.armRezo = content.ibcMettatonArmsWelcome;
               await state.dialogue(true, ...text.b_opponent_mettaton1.turn1c);
               body.reset();
               body.use(content.ibcMettatonBody);
               await renderer.pause(250);
               quizzer.index = world.bad_lizard < 1 ? 8 : 15;
               await state.vars.rtext(true, quizzerBody, ...text.b_opponent_mettaton1.turn1d());
               await renderer.pause(1250);
               quizzer.index = SAVE.data.n.state_foundry_undyne > 0 ? 30 : 6;
               state.vars.armRezo = content.ibcMettatonArmsNoticard;
               await state.dialogue(true, ...text.b_opponent_mettaton1.turn1e);
               quizzer.index = SAVE.data.n.state_foundry_undyne > 0 ? 30 : 1;
               await state.dialogue(true, ...text.b_opponent_mettaton1.turn1f);
               quizzer.index = SAVE.data.n.state_foundry_undyne > 0 ? 15 : 2;
               await state.dialogue(true, ...text.b_opponent_mettaton1.turn1g);
               quizzer.index = SAVE.data.n.state_foundry_undyne > 0 ? 15 : 0;
               battler.SOUL.alpha.value = 0;
               mettamover.idealX = 160;
               state.vars.armRezo = content.ibcMettatonArmsWelcome;
               game.movement = false;
               battler.SOUL.metadata.cyanLeap = false;
               await battler.box.size.modulate(renderer, 300, { x: 282.5, y: 65 });
               state.status = () => () => text.b_opponent_mettaton1.turn1status;
            } else {
               let skip = false;
               const host = state.vars.host;
               const amspeed = 10;
               SAVE.data.n.state_foundry_undyne > 0 && state.vars.turns < 8 && (quizzer.index = 30);
               switch (state.vars.turns) {
                  case 1:
                     await state.dialogue(false, ...text.b_opponent_mettaton1.turn2);
                     mettamover.idealX = 55;
                     body.index = 4;
                     break;
                  case 2:
                     await state.dialogue(false, ...text.b_opponent_mettaton1.turn3);
                     mettamover.idealX = 55;
                     body.index = 4;
                     break;
                  case 3:
                     if (state.vars.turnResults[1] < 1 && state.vars.turnResults[2] < 1) {
                        await state.dialogue(false, ...text.b_opponent_mettaton1.turn4a1);
                     } else {
                        await state.dialogue(false, ...text.b_opponent_mettaton1.turn4a2);
                     }
                     mettamover.idealX = 235;
                     quizzerBody.position.step(renderer, amspeed, { x: 290 });
                     body.index = 4;
                     state.vars.armRezo = content.ibcMettatonArmsThonk;
                     const shytime = renderer.time;
                     const shyPositionY = new CosmosValue(120);
                     const agent = new CosmosAnimation({
                        anchor: { y: 1, x: 0 },
                        resources: content.ibcShyrenBattleAgent,
                        position: { x: -30 },
                        index: SAVE.data.b.killed_shyren ? 1 : 0
                     }).on('tick', function () {
                        this.position.y =
                           shyPositionY.value - CosmosMath.wave(((renderer.time - shytime) % 4000) / 4000) * 4;
                     });
                     const shy = new CosmosAnimation({
                        active: true,
                        anchor: { y: 1 },
                        position: { x: -19.5, y: -45 },
                        resources: SAVE.data.b.bullied_shyren
                           ? content.ibcShyrenBattleBack
                           : content.ibcShyrenBattleFront
                     });
                     SAVE.data.b.killed_shyren || agent.attach(shy);
                     battler.overlay.attach(agent);
                     container.metadata.side_shy = agent;
                     await agent.position.step(renderer, 3, { x: 55 });
                     host.on('x', x => {
                        if (x === 2) {
                           SAVE.data.b.bullied_shyren || shy.use(content.ibcShyrenBattleFront);
                        } else if (x === 3 && state.vars.turns === 4) {
                           shy.reset().use(content.ibcShyrenBattleBack);
                           agent.position.step(renderer, 3, { x: -30 }).then(() => {
                              battler.overlay.objects.splice(battler.overlay.objects.indexOf(agent), 1);
                           });
                        }
                     });
                     if (SAVE.data.b.killed_shyren) {
                        skip = true;
                        await renderer.pause(1650);
                        body.index = 1;
                        await state.dialogue(false, ...text.b_opponent_mettaton1.turn4e);
                        await renderer.pause(1150);
                        await state.vars.ltext(
                           false,
                           agent.position.subtract(5, 0),
                           ...text.b_opponent_mettaton1.turn4f
                        );
                        agent.position.step(renderer, 3, { x: -30 }).then(() => {
                           battler.overlay.objects.splice(battler.overlay.objects.indexOf(agent), 1);
                        });
                        await renderer.pause(1000);
                        await state.dialogue(false, ...text.b_opponent_mettaton1.turn4g);
                        mettamover.idealX = 160;
                        quizzerBody.position.step(renderer, amspeed, { x: 265 });
                        body.index = 3;
                        state.vars.armRezo = content.ibcMettatonArmsWhatevs;
                        await renderer.pause(850);
                        mettamover.wobble.modulate(renderer, 1000, 1, 1);
                        await state.dialogue(false, ...text.b_opponent_mettaton1.turn4h);
                        quizzer.index = SAVE.data.n.state_foundry_undyne > 0 ? 46 : 2;
                        const OGgain = battler.music?.gain.value ?? 0;
                        await battler.music?.gain.modulate(renderer, 0, 0);
                        await renderer.pause(4500);
                        body.index = 0;
                        state.vars.armRezo = content.ibcMettatonArmsWelcome;
                        await state.dialogue(false, ...text.b_opponent_mettaton1.turn4i);
                        battler.music?.gain.modulate(renderer, 1000, OGgain, OGgain);
                        await renderer.pause(450);
                        await state.dialogue(false, ...text.b_opponent_mettaton1.turn4j());
                        mettamover.wobble.modulate(renderer, 1000, 3, 3);
                        quizzer.index = SAVE.data.n.state_foundry_undyne > 0 ? 15 : 0;
                     } else {
                        body.index = 4;
                        state.vars.shyren = true;
                     }
                     break;
                  case 4:
                     if (state.vars.turnResults[3] < 1) {
                        await state.dialogue(false, ...text.b_opponent_mettaton1.turn5a1);
                     } else {
                        await state.dialogue(false, ...text.b_opponent_mettaton1.turn5a2());
                     }
                     mettamover.idealX = 235;
                     quizzerBody.position.step(renderer, amspeed, { x: 290 });
                     break;
                  case 5:
                     await state.dialogue(false, ...text.b_opponent_mettaton1.turn6);
                     mettamover.idealX = 55;
                     break;
                  case 6:
                     await state.dialogue(false, ...text.b_opponent_mettaton1.turn7a);
                     mettamover.idealX = 235;
                     quizzerBody.position.step(renderer, amspeed, { x: 290 });
                     if (16 <= SAVE.data.n.kills_wastelands) {
                        skip = true;
                        await renderer.pause(2250);
                        body.index = 1;
                        await state.dialogue(false, ...text.b_opponent_mettaton1.turn7n);
                        await renderer.pause(3350);
                        body.index = 0;
                        if (SAVE.data.b.killed_shyren) {
                           await state.dialogue(false, ...text.b_opponent_mettaton1.turn7o2);
                        } else {
                           await state.dialogue(false, ...text.b_opponent_mettaton1.turn7o1());
                        }
                     } else {
                        const target = battler.add(commonOpponents.maddummy, { x: -25, y: 100 });
                        const volatyle = battler.volatile[target];
                        volatyle.alive = false;
                        const obj = volatyle.container;
                        const MDM = obj.objects[0].metadata as MadDummyMetadata;
                        volatyle.vars.face = 4;
                        MDM.speed = 1;
                        MDM.multiplier = 0.5;
                        container.metadata.side_mdm = obj;
                        await obj.position.step(renderer, 4, { x: 55 });
                        await renderer.pause(850);
                        if (SAVE.data.n.state_wastelands_toriel === 0) {
                           volatyle.vars.face = 8;
                           MDM.speed = 1;
                           MDM.multiplier = 0.5;
                           await state.vars.ltext(false, mdpos, ...text.b_opponent_mettaton1.turn7h);
                           await renderer.pause(1250);
                           await state.dialogue(false, ...text.b_opponent_mettaton1.turn7i);
                           volatyle.vars.face = 7;
                           await state.vars.ltext(false, mdpos, ...text.b_opponent_mettaton1.turn7j1);
                           volatyle.vars.face = 6;
                           await state.vars.ltext(false, mdpos, ...text.b_opponent_mettaton1.turn7j2);
                           await state.dialogue(false, ...text.b_opponent_mettaton1.turn7k);
                           volatyle.vars.face = 2;
                           await state.vars.ltext(false, mdpos, ...text.b_opponent_mettaton1.turn7l1);
                           volatyle.vars.face = 6;
                           await renderer.pause(650);
                           await state.vars.ltext(false, mdpos, ...text.b_opponent_mettaton1.turn7l2);
                           volatyle.vars.face = 8;
                           await state.vars.ltext(false, mdpos, ...text.b_opponent_mettaton1.turn7l3);
                           await state.dialogue(false, ...text.b_opponent_mettaton1.turn7m);
                        } else {
                           volatyle.vars.face = 0;
                           await state.vars.ltext(false, mdpos, ...text.b_opponent_mettaton1.turn7b1);
                           MDM.speed = 2.3;
                           MDM.multiplier = 1;
                           await state.vars.ltext(false, mdpos, ...text.b_opponent_mettaton1.turn7b2);
                           volatyle.vars.face = 3;
                           MDM.speed = 2.6;
                           MDM.multiplier = 3;
                           await state.vars.ltext(false, mdpos, ...text.b_opponent_mettaton1.turn7b3);
                           await renderer.pause(1250);
                           await state.dialogue(false, ...text.b_opponent_mettaton1.turn7c);
                           volatyle.vars.face = 2;
                           MDM.speed = 1;
                           MDM.multiplier = 0.5;
                           await state.vars.ltext(false, mdpos, ...text.b_opponent_mettaton1.turn7d1);
                           volatyle.vars.face = 5;
                           MDM.speed = 2.6;
                           MDM.multiplier = 4;
                           await state.vars.ltext(false, mdpos, ...text.b_opponent_mettaton1.turn7d2);
                           await state.dialogue(false, ...text.b_opponent_mettaton1.turn7e);
                           await renderer.pause(650);
                           volatyle.vars.face = 7;
                           MDM.speed = 1.65;
                           MDM.multiplier = 1;
                           await state.vars.ltext(false, mdpos, ...text.b_opponent_mettaton1.turn7f);
                           await renderer.pause(850);
                           await state.dialogue(false, ...text.b_opponent_mettaton1.turn7g1);
                           await state.vars.ltext(false, mdpos, ...text.b_opponent_mettaton1.turn7g2);
                           volatyle.vars.face = 0;
                        }
                        host.on('x', x => {
                           x === 3 && obj.position.step(renderer, 4, { x: -20 }).then(() => (obj.alpha.value = 0));
                        });
                        state.vars.maddummy = true;
                     }
                     break;
                  case 7:
                     if (state.vars.turnResults[6] < 1) {
                        await state.dialogue(false, ...text.b_opponent_mettaton1.turn8a1);
                     } else {
                        await state.dialogue(false, ...text.b_opponent_mettaton1.turn8a2);
                     }
                     mettamover.idealX = 235;
                     quizzerBody.position.step(renderer, amspeed, { x: 290 });
                     break;
                  case 8:
                     await state.dialogue(false, ...text.b_opponent_mettaton1.turn9a());
                     quizzer.index = SAVE.data.n.state_foundry_undyne > 0 ? 30 : 9;
                     SAVE.data.n.state_foundry_undyne > 0 && battler.music?.stop();
                     await state.vars.rtext(false, quizzerBody, ...text.b_opponent_mettaton1.turn9b());
                     if (SAVE.data.n.state_foundry_undyne > 0) {
                        skip = true;
                        quizzerBody.metadata.noshake = true;
                        await state.vars.rtext(false, quizzerBody, ...text.b_opponent_mettaton1.turn9bx);
                     } else {
                        quizzer.index = world.bad_lizard < 1 ? 11 : 4;
                        mettamover.idealX = 55;
                     }
                     break;
               }
               const alphysFinaleSetup = async () => {
                  await renderer.pause(1000);
                  state.vars.armRezo = content.ibcMettatonArmsNoticard;
                  battler.music?.gain.modulate(renderer, 1500, 0).then(() => {
                     battler.music?.stop();
                  });
                  await state.dialogue(false, ...text.b_opponent_mettaton1.turn8end4);
                  state.vars.armRezo = content.ibcMettatonArmsWelcome;
                  await state.dialogue(false, ...text.b_opponent_mettaton1.turn8end5);
                  sounds.drumroll.instance(renderer);
                  await renderer.pause(1950);
                  await state.dialogue(false, ...text.b_opponent_mettaton1.turn8end6);
                  battler.music = music.sexyrectangle.instance(renderer);
                  battler.music.rate.value = 1.25;
                  quizzer.index = SAVE.data.n.state_foundry_undyne > 0 ? 29 : 9;
                  const pos = quizzerBody.position.clone();
                  const shaker = () => {
                     if (quizzerBody.metadata.noshake) {
                        quizzerBody.position.set(pos);
                        quizzerBody.off('tick', shaker);
                     } else {
                        quizzerBody.position.set(pos.add(Math.random() - 0.5, Math.random() - 0.5));
                     }
                  };
                  quizzerBody.on('tick', shaker);
               };
               if (skip) {
                  if (state.vars.turns === 3) {
                     state.status = () => () => text.b_opponent_mettaton1.turn4statusX;
                     state.vars.turns = 4;
                  } else if (state.vars.turns === 6) {
                     state.status = () => () => text.b_opponent_mettaton1.turn7statusX;
                     state.vars.turns = 7;
                     mettamover.idealX = 160;
                     quizzerBody.position.step(renderer, amspeed, { x: 265 });
                     await renderer.pause(450);
                     await alphysFinaleSetup();
                  } else if (state.vars.turns === 8) {
                     await renderer.pause(650);
                  }
                  state.vars.turnResults[state.vars.turns] = 0;
               } else {
                  state.vars.armRezo = content.ibcMettatonArmsThonk;
                  await battler.box.size.modulate(renderer, 300, { x: 100, y: 65 });
                  await Promise.all([
                     battler.box.size.modulate(renderer, 300, { y: state.vars.turns === 8 ? 100 : 120, x: 100 }),
                     battler.box.position.modulate(renderer, 300, { x: 160, y: 120 }),
                     battler.box.rotation.modulate(renderer, 300, 0)
                  ]);
                  renderer.detach('menu', battler.SOUL);
                  battler.box.objects[2].attach(battler.SOUL);
                  battler.SOUL.position.set(battler.box);
                  battler.SOUL.alpha.value = 1;
                  battler.SOUL.metadata.cyanShadowInner = true;
                  game.movement = true;
                  host.fire('x', 1);
                  const [ score, fails ] = await patterns.mettaton1(
                     state.vars.turns - 1,
                     state.vars.shyren,
                     state.vars.maddummy,
                     quizzer,
                     state.vars.totalFails,
                     state.vars.turns === 8
                        ? async (e: number) => {
                             if (e === 2) {
                                quizzerBody.metadata.noshake = true;
                                if (battler.music) {
                                   battler.music.gain.value = 0;
                                   battler.music.rate.value = 0;
                                }
                             }
                             await state.vars.rtext(
                                true,
                                quizzerBody,
                                ...[
                                   text.b_opponent_mettaton1.turn9c,
                                   text.b_opponent_mettaton1.turn9d,
                                   text.b_opponent_mettaton1.turn9e()
                                ][e]
                             );
                          }
                        : void 0
                  );
                  battler.alive.length > 1 && (battler.alive[1].vars.face = 0);
                  state.vars.totalFails += fails;
                  host.fire('x', 2);
                  battler.SOUL.metadata.cyanLeap = false;
                  game.movement = false;
                  battler.SOUL.alpha.value = 0;
                  battler.box.objects[2].detach(battler.SOUL);
                  renderer.attach('menu', battler.SOUL);
                  await Promise.all([
                     battler.box.size.modulate(renderer, 300, { y: 65, x: 100 }),
                     battler.box.position.modulate(renderer, 300, { x: 160, y: 192.5 - 65 / 2 }),
                     battler.box.rotation.modulate(renderer, 300, 0)
                  ]);
                  if (state.vars.turns < 8) {
                     await state.dialogue(
                        false,
                        ...[
                           [ text.b_opponent_mettaton1.turn2react1, text.b_opponent_mettaton1.turn2react2 ],
                           [ text.b_opponent_mettaton1.turn3react1, text.b_opponent_mettaton1.turn3react2 ],
                           [ text.b_opponent_mettaton1.turn4react1, text.b_opponent_mettaton1.turn4react2 ],
                           [ text.b_opponent_mettaton1.turn5react1, text.b_opponent_mettaton1.turn5react2 ],
                           [ text.b_opponent_mettaton1.turn6react1, text.b_opponent_mettaton1.turn6react2 ],
                           [ text.b_opponent_mettaton1.turn7react1, text.b_opponent_mettaton1.turn7react2 ],
                           [ text.b_opponent_mettaton1.turn8react1, text.b_opponent_mettaton1.turn8react2 ]
                        ][state.vars.turns - 1][score]
                     );
                     state.vars.turnResults[state.vars.turns] = score;
                  } else {
                     await renderer.pause(1000);
                     await state.dialogue(false, ...text.b_opponent_mettaton1.turn9end1);
                     speech.emoters.alphys = quizzer;
                     await state.vars.rtext(false, quizzerBody, ...text.b_opponent_mettaton1.turn9end2());
                  }
                  quizzer.metadata.thumbsup = false;
                  quizzer.index = SAVE.data.n.state_foundry_undyne > 0 ? 15 : 0;
                  if (state.vars.turns === 4) {
                     state.vars.shyren = false;
                     await renderer.pause(450);
                     host.fire('x', 3);
                     await renderer.pause(850);
                     mettamover.idealX = 160;
                     quizzerBody.position.step(renderer, amspeed, { x: 265 });
                     await renderer.pause(1250);
                     await state.dialogue(false, ...text.b_opponent_mettaton1.turn5end1());
                     state.vars.armRezo = content.ibcMettatonArmsNoticard;
                     await state.dialogue(false, ...text.b_opponent_mettaton1.turn5end2);
                     state.vars.armRezo = content.ibcMettatonArmsWelcome;
                  } else if (state.vars.turns === 7) {
                     state.vars.maddummy = false;
                     await renderer.pause(450);
                     if (SAVE.data.n.state_wastelands_toriel === 0) {
                        if (score === 0) {
                           await state.vars.ltext(false, mdpos, ...text.b_opponent_mettaton1.turn8reactMD1a);
                        } else {
                           await state.vars.ltext(false, mdpos, ...text.b_opponent_mettaton1.turn8reactMD1b);
                        }
                     } else if (score === 0) {
                        await state.vars.ltext(false, mdpos, ...text.b_opponent_mettaton1.turn8reactMD2a);
                     } else {
                        await state.vars.ltext(false, mdpos, ...text.b_opponent_mettaton1.turn8reactMD2b);
                     }
                     const aggregate = state.vars.turnResults[6] + state.vars.turnResults[7] + score;
                     await renderer.pause(450);
                     host.fire('x', 3);
                     await renderer.pause(500);
                     mettamover.idealX = 160;
                     quizzerBody.position.step(renderer, amspeed, { x: 265 });
                     await renderer.pause(450);
                     const lastAggregate =
                        state.vars.turnResults[1] +
                        state.vars.turnResults[2] +
                        state.vars.turnResults[3] +
                        state.vars.turnResults[4];
                     if (aggregate < 2) {
                        if (iFancyYourVilliany()) {
                           await state.dialogue(false, ...text.b_opponent_mettaton1.turn8end2a());
                        } else if (lastAggregate < 3) {
                           await state.dialogue(false, ...text.b_opponent_mettaton1.turn8end1a);
                        } else {
                           await state.dialogue(false, ...text.b_opponent_mettaton1.turn8end1b);
                        }
                     } else if (iFancyYourVilliany()) {
                        await state.dialogue(false, ...text.b_opponent_mettaton1.turn8end2b());
                     } else if (lastAggregate < 3) {
                        await state.dialogue(false, ...text.b_opponent_mettaton1.turn8end3a);
                     } else {
                        await state.dialogue(false, ...text.b_opponent_mettaton1.turn8end3b);
                     }
                     await alphysFinaleSetup();
                  }
                  if (mettamover.idealX !== 160) {
                     mettamover.idealX = 160;
                     quizzerBody.position.step(renderer, amspeed, { x: 265 });
                  }
                  body.index = 0;
                  state.vars.armRezo = content.ibcMettatonArmsWelcome;
                  await battler.box.size.modulate(renderer, 300, { x: 282.5 });
                  if (state.vars.turns < 8) {
                     state.status = [
                        () => () => text.b_opponent_mettaton1.turn1status,
                        () => () => text.b_opponent_mettaton1.turn2status,
                        () => () => text.b_opponent_mettaton1.turn3status,
                        () => () => text.b_opponent_mettaton1.turn4status,
                        () => () => text.b_opponent_mettaton1.turn5status,
                        () => () => text.b_opponent_mettaton1.turn6status,
                        () => () => text.b_opponent_mettaton1.turn7status,
                        () => () => text.b_opponent_mettaton1.turn8status
                     ][state.vars.turns];
                  }
               }
            }
            if (state.vars.turns < 8) {
               return;
            }
            await renderer.pause(850);
            state.vars.armRezo = content.ibcMettatonArmsThonk;
            if (battler.music) {
               battler.music.rate.value = battler.music.daemon.rate;
               battler.music.gain.modulate(renderer, 500, battler.music.daemon.gain);
            }
            await state.dialogue(false, ...text.b_opponent_mettaton1.turn9end3());
            if (SAVE.data.n.state_foundry_undyne <= 0) {
               state.vars.armRezo = content.ibcMettatonArmsWhatevs;
               await state.dialogue(false, ...text.b_opponent_mettaton1.turn9end4);
            }
            state.vars.armRezo = content.ibcMettatonArmsNoticard;
            await state.dialogue(false, ...text.b_opponent_mettaton1.turn9end5());
            state.vars.armRezo = content.ibcMettatonArmsWelcome;
            await renderer.pause(1000);
            await state.dialogue(false, ...text.b_opponent_mettaton1.turn9end6);
            delete speech.emoters.alphys;
            await mettamover.wobble.modulate(renderer, 600, 0);
            body.alpha.value = 0;
            const anim = new CosmosAnimation({
               active: true,
               anchor: { x: 0, y: 1 },
               scale: 1.15,
               position: container.position.add(0, 24 - 15),
               resources: content.ibcMettatonFlyawaymyroboticfriend
            });
            battler.overlay.attach(anim);
            await renderer.when(() => anim.index === 5);
            anim.use(content.ibcMettatonRocket);
            anim.position.y += 18;
            const bpos = anim.position.clone();
            const sh = new CosmosValue(0);
            const shaker = () => {
               anim.position.set(
                  bpos.add(new CosmosPoint(Math.random() * 2 - 1, Math.random() * 2 - 1).multiply(sh.value))
               );
            };
            anim.on('tick', shaker);
            await sh.modulate(renderer, 1000, 1, 1);
            await bpos.modulate(renderer, 1500, bpos.value(), { y: 0 });
            battler.overlay.objects.splice(battler.overlay.objects.indexOf(anim), 1);
            await renderer.pause(650);
            await quizzerBody.position.step(renderer, 3, { x: 160 });
            await renderer.pause(850);
            quizzer.index = SAVE.data.n.state_foundry_undyne > 0 ? 28 : state.vars.totalFails === 0 ? 6 : 8;
            battler.music?.stop();
            await state.vars.rtext(
               false,
               quizzerBody,
               ...(SAVE.data.n.state_foundry_undyne > 0
                  ? text.b_opponent_mettaton1.turn9end7c
                  : state.vars.totalFails === 0
                  ? text.b_opponent_mettaton1.turn9end7b
                  : text.b_opponent_mettaton1.turn9end7a)
            );
            events.fire('exit');
            state.volatile.alive = false;
            SAVE.data.n.state_aerialis_talentfails = state.vars.totalFails;
         },
         async poststatus (state) {
            SAVE.data.n.plot < 67 && state.vars.turns++;
         }
      }),
      sprite (volatile) {
         let time = renderer.time;
         const originX = volatile.container.position.x;
         const mettamover = {
            wobble: new CosmosValue(3),
            idealX: 160,
            freeze: false,
            wobbleRate: new CosmosValue()
         };
         function hugoFactor () {
            return mettamover.idealX - volatile.container.position.x;
         }
         volatile.container.on('tick', function () {
            this.velocity.x = (this.velocity.x + hugoFactor()) / 2;
         });
         const body = new CosmosAnimation({
            anchor: { x: 0, y: 1 },
            resources: content.ibcMettatonBody,
            metadata: { mettamover },
            scale: 1.15,
            objects: [
               new CosmosSprite({ frames: [ content.ibcMettatonWheel ], anchor: 0 }).on('tick', function () {
                  const posX = volatile.container.position.x + body.position.x;
                  this.rotation.value = -body.rotation.value + 360 * ((posX - originX) / 30);
               }),
               new CosmosAnimation({
                  active: true,
                  anchor: { x: 0, y: 1 },
                  position: { x: 2.5, y: 8 },
                  resources: content.ibcMettatonArmsWelcome
               }).on('tick', function () {
                  if (!mettamover.freeze) {
                     const hv = mettamover.wobble.value / 2;
                     this.position.y = sineWaver(time, 900, 10.5 - hv, 10.5 + hv);
                  }
                  if (volatile.vars.armRezo) {
                     this.use(volatile.vars.armRezo);
                     volatile.vars.armRezo = null;
                  }
               })
            ]
         }).on('tick', function () {
            if (!mettamover.freeze) {
               const wv = mettamover.wobble.value;
               const v = sineWaver(time, 700, -wv, wv);
               this.position.x = v;
               this.rotation.value = -v - volatile.container.velocity.x / 4;
            }
            if (mettamover.freeze || mettamover.wobbleRate.value > 0) {
               time += (100 / 3) * mettamover.wobbleRate.value;
            }
            if (typeof volatile.vars.scrIndex === 'number') {
               this.index = volatile.vars.scrIndex;
               volatile.vars.scrIndex = null;
            }
            if (volatile.vars.screenRezo) {
               this.use(volatile.vars.screenRezo);
               volatile.vars.screenRezo = null;
            }
         });
         return body;
      }
   }),
   mettaton2: new OutertaleOpponent({
      flirted: () => SAVE.data.b.flirt_mettaton,
      hp: 1600,
      df: 1,
      name: () => text.b_opponent_mettaton2.name(),
      acts: () =>
         world.genocide
            ? [ [ 'check', [] ] ]
            : world.bad_robot
            ? [
                 [ 'check', [] ],
                 [ 'cut', [] ]
              ]
            : [
                 [ 'check', [] ],
                 [ 'pose', [] ], // dramatic pose, more effective on high hp
                 [ 'heel', [] ], // heel turn, audience wants u to get hit
                 [ 'boast', [] ], // say you wont get hit
                 [ 'scream', [] ], // scream, raise audience hype but soul moves slower
                 [ 'flirt', [] ] // flirt, audience reacts differently based on
              ],
      ghost: true,
      dramatic: true,
      metadata: { reactSpanner: true, reactTVM: true, reactOld: true, reactArtifact: true, nootexempt: true },
      handler: battler.opponentHandler({
         vars: {
            // fight no act
            fnoa: 0,
            turns: -1,
            items: [] as string[],
            fighto: 0,
            fightprimer: false,
            ap: 0,
            assistStatus: 0,
            neoTurns: 0,
            boast: { hit: false, origin: 0, value: false },
            villian: { hit: false, value: false },
            spanner: false,
            wires: 8,
            wireprogress: 0,
            wirecutted: false,
            finalthreat: false,
            act: {
               pose: 0,
               flirt: 0,
               scream: 0
            },
            boosts: 0,
            flirts: 0,
            ratings,
            hurtListener () {
               const vars = battler.target!.vars;
               if (vars.boast.value) {
                  if (vars.boast.hit) {
                     ratings(
                        text.b_opponent_mettaton2.ratings.boast2,
                        (vars.boast.origin - graphMetadata.ratingsbase) /
                           (iFancyYourVilliany() ? 16 : SAVE.data.b.a_state_hapstablook ? 8 : 12)
                     );
                  } else {
                     vars.boast.hit = true;
                     graphMetadata.ratingsgain = 0;
                     ratings(
                        text.b_opponent_mettaton2.ratings.boast1,
                        (vars.boast.origin - graphMetadata.ratingsbase) /
                           (iFancyYourVilliany() ? 4 : SAVE.data.b.a_state_hapstablook ? 2 : 3)
                     );
                  }
               } else if (vars.villian.value) {
                  if (vars.villian.hit) {
                     ratings(
                        text.b_opponent_mettaton2.ratings.heel2,
                        iFancyYourVilliany() ? 40 : SAVE.data.b.a_state_hapstablook ? 20 : 30
                     );
                  } else {
                     vars.villian.hit = true;
                     ratings(
                        text.b_opponent_mettaton2.ratings.heel1,
                        iFancyYourVilliany() ? 80 : SAVE.data.b.a_state_hapstablook ? 40 : 60
                     );
                  }
               } else {
                  ratings(text.b_opponent_mettaton2.ratings.hurt, 10);
               }
            }
         },
         defaultTalk: ({ vars }) =>
            world.genocide
               ? []
               : [
                    () => [],
                    text.b_opponent_mettaton2.turnTalk1,
                    text.b_opponent_mettaton2.turnTalk2,
                    text.b_opponent_mettaton2.turnTalk3,
                    text.b_opponent_mettaton2.turnTalk4,
                    text.b_opponent_mettaton2.turnTalk5,
                    text.b_opponent_mettaton2.turnTalk6,
                    text.b_opponent_mettaton2.turnTalk7,
                    text.b_opponent_mettaton2.turnTalk8,
                    text.b_opponent_mettaton2.turnTalk9,
                    text.b_opponent_mettaton2.turnTalk10,
                    text.b_opponent_mettaton2.turnTalk11,
                    text.b_opponent_mettaton2.turnTalk12,
                    text.b_opponent_mettaton2.turnTalk13,
                    text.b_opponent_mettaton2.turnTalk14,
                    text.b_opponent_mettaton2.turnTalk15,
                    text.b_opponent_mettaton2.turnTalk16,
                    text.b_opponent_mettaton2.turnTalk17,
                    text.b_opponent_mettaton2.turnTalk18,
                    () => []
                 ][Math.min(++vars.turns, 19)](),
         defaultStatus: state =>
            state.vars.wires === 0
               ? () => text.b_opponent_mettaton2.statusY
               : () => text.b_opponent_mettaton2.statusX(4 <= state.vars.fnoa),
         bubble: () => [
            world.genocide
               ? { x: 180, y: 25 }
               : { x: 195, y: battler.volatile[1].container.objects[0].metadata.hideLegs ? 60 : 30 },
            battler.bubbles.twinkly
         ],
         async fight ({ volatile, choice, vars, dialogue }, truePower) {
            if (world.bad_robot) {
               vars.fnoa !== -1 && vars.fnoa++;
               volatile.opponent.ghost = false;
               const spr = volatile.container.objects[0];
               if (volatile.hp <= battler.calculate(volatile, truePower)) {
                  battler.music?.stop();
                  renderer.speed.value /= (2 ** (1 / 24)) ** vars.boosts;
                  spr.metadata.tickSpeed.value = 0;
                  spr.metadata.doTick = false;
               } else if (vars.wires === 0) {
                  renderer.speed.value *= 2 ** (1 / 24);
                  vars.boosts++;
               }
               if (vars.wires === 0) {
                  spr.metadata.dance = false;
                  speech.emoters.mettaton.index = 28;
               }
               const result = await battler.attack(volatile, { power: truePower }, true, true);
               volatile.opponent.ghost = true;
               if (result) {
                  const underdrive = vars.wires > 0;
                  if (underdrive) {
                     sounds.switch.instance(renderer).rate.value *= 1.5;
                     vars.wireprogress = Infinity;
                  }
                  await renderer.pause(1600);
                  await dialogue(
                     false,
                     ...(underdrive ? text.b_opponent_mettaton2.turnTalkX3 : text.b_opponent_mettaton2.turnTalkX2)
                  );
                  const fd = new CosmosRectangle({ alpha: 0, fill: 0xffffff, size: { x: 320, y: 240 }, priority: 1 });
                  renderer.attach('menu', fd);
                  await renderer.pause(300);
                  sounds.boom.instance(renderer);
                  await fd.alpha.modulate(renderer, 300, 1);
                  SAVE.data.n.exp += 3000;
                  await renderer.pause(3000);
                  volatile.container.alpha.value = 0;
                  await fd.alpha.modulate(renderer, 3000, 0);
                  renderer.detach('menu', fd);
                  await renderer.pause(1000);
                  events.on('battle-exit').then(() => {
                     deAllB();
                     renderer.speed.value = 1;
                  });
                  events.fire('exit');
                  return true;
               } else if (vars.wires > 0) {
                  const healFactor = CosmosMath.bezier(vars.wires / 8, 0, 1, 1);
                  const finalHP = volatile.hp + (volatile.opponent.hp - volatile.hp) * healFactor;

                  // sprite calculation
                  const next = volatile.container.objects[0];
                  const half = new CosmosPoint((next.metadata.size as CosmosPointSimple) || next.compute()).divide(2);
                  const base = volatile.container.position.add(
                     next.position.subtract(half.add(half.multiply(next.anchor)))
                  );

                  const sz = volatile.hp / volatile.opponent.hp;
                  const ez = finalHP / volatile.opponent.hp;

                  const barsize = Math.max(half.x * next.scale.x * 2, 60) * 1.25;
                  const healthbar = new CosmosRectangle({
                     area: renderer.area,
                     anchor: 0,
                     position: base
                        .add(half.x, -7)
                        .clamp({ x: 1 + barsize / 2, y: 25 }, { x: 319 - barsize / 2, y: 215 }),
                     stroke: 0xffffff,
                     fill: 0,
                     size: { y: 7.5, x: barsize },
                     border: 0.5,
                     scale: 2,
                     alpha: 0,
                     metadata: { sh: new CosmosValue() },
                     filters: [ filters.bloomX ]
                  }).on('tick', function () {
                     this.offsets[0].x = (Math.random() * 2 - 1) * this.metadata.sh.value;
                  });
                  const healthbarFill = new CosmosRectangle({
                     anchor: { y: 0 },
                     position: { x: barsize / -2 + 0.25 },
                     fill: 0xff3f3f,
                     stroke: -1,
                     size: { y: 7, x: Math.ceil((barsize - 0.5) * sz * 2) / 2 }
                  });
                  healthbar.attach(healthbarFill);
                  renderer.attach('menu', healthbar);

                  const wires = volatile.container.objects[0].objects.slice(7);
                  const wiresOffsets = CosmosUtils.populate(wires.length, i => i);
                  for (const wire of wires) {
                     wire.metadata.active = true;
                     wire.metadata.lastphase = -Infinity;
                     wire.metadata.offset = wiresOffsets.splice(Math.random() * wiresOffsets.length, 1)[0] * 4;
                     wire.metadata.ticks = 0;
                  }

                  healthbar.alpha.modulate(renderer, 500, 1);
                  healthbar.scale
                     .modulate(renderer, 500, 1, 1)
                     .then(() => healthbar.scale.modulate(renderer, 2500, 1.1));
                  healthbar.metadata.sh.modulate(renderer, 3000, 0, 0, 2);
                  const sfx = sounds.surge.instance(renderer, 1.5);
                  sfx.rate.value = 8500 / 4000;
                  sfx.gain.value /= 4;
                  sfx.gain.modulate(renderer, 500, sfx.gain.value * 2);
                  await healthbarFill.size.modulate(renderer, 3000, { x: Math.floor((barsize - 0.5) * ez * 2) / 2 });
                  sfx.stop();
                  healthbar.scale.modulate(renderer, 500, 2, 2);
                  for (const wire of wires) {
                     wire.metadata.active = false;
                  }
                  await healthbar.alpha.modulate(renderer, 500, 0);
                  renderer.detach('menu', healthbar);
                  volatile.hp = finalHP;
               } else {
                  speech.emoters.mettaton.index = 27;
                  spr.metadata.dancedelay > 5 && (spr.metadata.dancedelay -= 5);
                  spr.metadata.dance = true;
               }
               return false;
            }
            const spr = volatile.container.objects[0];
            if (vars.ap > 0) {
               spr.index = volatile.hp < 1000 ? 5 : volatile.hp < volatile.opponent.hp / 4 ? 3 : 12;
               spr.metadata.freeze = true;
               volatile.opponent.ghost = false;
            } else if (world.genocide) {
               spr.index = 4;
               const n = sounds.node.instance(renderer);
               n.rate.value = 0.867;
               n.gain.value *= 0.7;
            } else {
               volatile.opponent.ghost = false;
               spr.metadata.doTick = false;
            }
            const power = world.genocide
               ? battler.calculate(volatile, truePower, vars.ap * 50)
               : battler.calculate(volatile, truePower);
            if (world.genocide) {
               spr.metadata.ap = vars.ap;
               if (volatile.hp > power) {
                  spr.metadata.hit = renderer.time;
               } else {
                  spr.metadata.dead = true;
                  spr.metadata.hideWings = true;
                  SAVE.flag.b._victory = true;
                  SAVE.flag.n._genocide_milestone_last = 4;
                  SAVE.flag.n.genocide_milestone = Math.max(4, SAVE.flag.n.genocide_milestone) as 4;
                  battler.music?.stop();
                  spr.index = 8;
                  volatile.container.metadata.ti.metadata.re();
               }
            } else if (volatile.hp > power) {
               const crit = 1 - mechanics.span.min / mechanics.span.range <= truePower;
               ratings(
                  crit ? text.b_opponent_mettaton2.ratings.crit : text.b_opponent_mettaton2.ratings.hurt,
                  power / 4
               );
               crit && sounds.mus_mt_yeah.instance(renderer);
            } else {
               ratings(text.b_opponent_mettaton2.ratings.dead, 1000);
               battler.music?.stop();
               speech.emoters.mettaton.index = 16;
               graphMetadata.ratingsgain = 0;
            }
            const result = await battler.attack(volatile, { operation: 'add', power: power * -1 }, true, true);
            if (result) {
               if (world.genocide) {
                  await renderer.pause(1600);
                  spr.metadata.hit = renderer.time;
                  spr.metadata.dead = false;
                  await renderer.pause(2400);
                  await spr.position.modulate(renderer, 1200, { x: spr.position.x - 30 });
                  const snb = spr.metadata.shakenbake as CosmosValue;
                  snb.modulate(renderer, 500, 1, 1, 1, 1);
                  speech.emoters.mettaton = spr;
                  await dialogue(false, ...text.b_opponent_mettaton2.mettahero1);
                  await renderer.pause(1600);
                  snb.value = 0;
                  await dialogue(false, ...text.b_opponent_mettaton2.mettahero2);
                  spr.metadata.hit = renderer.time - 1150;
                  const fd = new CosmosRectangle({
                     alpha: 0,
                     fill: 0xffffff,
                     size: { x: 320, y: 240 },
                     priority: 1
                  }).on('tick', function () {
                     spr.metadata.hit = Math.min(spr.metadata.hit + (100 / 3) * 4, renderer.time);
                  });
                  renderer.attach('menu', fd);
                  snb.modulate(renderer, 600, 4, 4);
                  await renderer.pause(300);
                  SAVE.data.n.exp += 3000;
                  sounds.boom.instance(renderer);
                  await fd.alpha.modulate(renderer, 300, 1);
                  await renderer.pause(3000);
                  spr.alpha.value = 0;
                  fd.alpha.modulate(renderer, 3000, 0).then(() => renderer.detach('menu', fd));
                  const napstaSprite = new CosmosAnimation({
                     active: true,
                     anchor: { y: 1, x: 0 },
                     resources: content.ibcNapstablookBattleLookdown,
                     metadata: { time: renderer.time, blookyPositionY: new CosmosValue() }
                  }).on('tick', function () {
                     this.position.y =
                        this.metadata.blookyPositionY.value -
                        CosmosMath.wave(((renderer.time - this.metadata.time) % 4000) / 4000) * 4;
                  });
                  const napstaContainer = new CosmosObject({ position: { x: 160, y: 0 }, objects: [ napstaSprite ] });
                  renderer.attach('menu', napstaContainer);
                  await napstaContainer.position.modulate(renderer, 1500, { y: 120 });
                  typer.magic = battler.ghost_magic;
                  await battler.monster(
                     false,
                     { x: 195, y: 41 },
                     battler.bubbles.twinkly,
                     ...text.b_opponent_mettaton2.napstahero1
                  );
                  typer.magic = '';
                  await renderer.pause(1600);
                  napstaSprite.use(content.ibcNapstablookBattleLookforward);
                  await renderer.pause(2000);
                  typer.magic = battler.ghost_magic;
                  await battler.monster(
                     false,
                     { x: 195, y: 41 },
                     battler.bubbles.twinkly,
                     ...text.b_opponent_mettaton2.napstahero2
                  );
                  typer.magic = '';
                  napstaSprite.use(content.ibcNapstablookBattleLookdeath);
                  battler.volatile.push({
                     alive: false,
                     container: napstaContainer as OutertaleVolatile['container'],
                     opponent: new OutertaleOpponent({
                        exp: 0,
                        hp: 1,
                        df: 0,
                        sparable: false,
                        dramatic: true,
                        name: () => '',
                        acts: [],
                        sprite: () =>
                           new CosmosSprite({
                              anchor: { x: 0, y: 1 },
                              metadata: { size: { y: 93 } },
                              position: { x: 160, y: 125 }
                           })
                     }),
                     flirted: false,
                     hp: 1,
                     sparable: false,
                     vars: {}
                  });
                  shake(2, 700);
                  await battler.attack(battler.volatile[1], { power: -42, operation: 'add' }, false, true);
                  await renderer.pause(300);
                  const goatbro = new CosmosAnimation({
                     alpha: 0,
                     anchor: { x: 0, y: 1 },
                     position: { x: 160, y: 120 },
                     resources: content.ibcAsrielCutscene2
                  });
                  renderer.attach('menu', goatbro);
                  await goatbro.alpha.modulate(renderer, 1000, 1);
                  await renderer.pause(600);
                  SAVE.flag.n.ga_asrielNapstakill < 1 && header('x1').then(() => (goatbro.index = 1));
                  await battler.monster(
                     false,
                     { x: 185, y: 45 },
                     battler.bubbles.twinkly,
                     ...text.b_opponent_mettaton2.napstahero3()
                  );
                  battler.garbage.push([ 'menu', napstaContainer ], [ 'menu', goatbro ]);
                  events.on('battle-exit').then(() => {
                     deAllB();
                  });
                  events.fire('exit');
               } else {
                  SAVE.data.b.killed_mettaton = true;
                  const graph = battler.volatile[0].vars.graph as CosmosObject;
                  graph.alpha.modulate(renderer, 1000, 0).then(() => {
                     battler.overlay.detach(graph);
                  });
                  events.off('select', selectMTT);
                  await renderer.pause(1600);
                  await dialogue(false, ...text.b_opponent_mettaton2.turnTalkX0a());
                  await renderer.pause(600);
                  const ramp = new CosmosValue();
                  const rampTicker = () => {
                     volatile.container.offsets[0].set(
                        (Math.random() - 0.5) * ramp.value,
                        (Math.random() - 0.5) * ramp.value
                     );
                  };
                  volatile.container.on('tick', rampTicker);
                  await ramp.modulate(renderer, 1400, 2, 0);
                  volatile.container.off('tick', rampTicker);
                  volatile.container.offsets[0].set(0);
                  await renderer.pause(1000);
                  await dialogue(false, ...text.b_opponent_mettaton2.turnTalkX0b());
                  const fd = new CosmosRectangle({ alpha: 0, fill: 0xffffff, size: { x: 320, y: 240 }, priority: 1 });
                  renderer.attach('menu', fd);
                  await renderer.pause(300);
                  sounds.boom.instance(renderer);
                  await fd.alpha.modulate(renderer, 300, 1);
                  SAVE.data.n.exp += 3000;
                  await renderer.pause(3000);
                  volatile.container.alpha.value = 0;
                  await fd.alpha.modulate(renderer, 3000, 0);
                  renderer.detach('menu', fd);
                  await renderer.pause(1000);
                  const ratings = Math.floor(graphMetadata.ratingsbase * [ 1, 0.5, 0.1, 0 ][world.bad_lizard]);
                  SAVE.data.n.state_mettaton_ratings = ratings;
                  saver.gold += Math.floor(ratings / 5);
                  SAVE.data.b.a_state_hapstablook = false;
                  events.on('battle-exit').then(() => {
                     deAllB();
                  });
                  events.fire('exit');
                  return true;
               }
            } else if (world.genocide) {
               spr.index = volatile.hp < 1000 ? 2 : volatile.hp < volatile.opponent.hp / 4 ? 1 : 0;
               spr.metadata.freeze = false;
               volatile.opponent.ghost = true;
               switch (battler.music?.rate.value) {
                  case 1:
                     volatile.hp < volatile.opponent.hp / 4 && battler.music?.rate.modulate(renderer, 1000, 0.85);
                     break;
                  case 0.85:
                     volatile.hp < 1000 && battler.music?.rate.modulate(renderer, 1000, 0.7);
                     break;
               }
            } else {
               volatile.opponent.ghost = true;
               spr.metadata.doTick = true;
               switch (battler.music?.rate.value) {
                  case 1:
                     volatile.hp < volatile.opponent.hp / 4 && battler.music?.rate.modulate(renderer, 1000, 1.1);
                     break;
                  case 1.1:
                     volatile.hp < 100 && battler.music?.rate.modulate(renderer, 1000, 1.2);
                     break;
               }
            }
            return result;
         },
         pretalk ({ volatile }) {
            speech.emoters.mettaton = volatile.container.objects[0].objects[6] as CosmosSprite;
         },
         async preitem (state, item) {
            const info = items.of(item);
            if (info.type === 'armor' || info.type === 'weapon') {
               if (state.vars.items.includes(item)) {
                  ratings(text.b_opponent_mettaton2.ratings.item.repeat, -10);
               } else {
                  ratings(text.b_opponent_mettaton2.ratings.item.armor, (info.sell1 ?? 50) + (info.sell2 ?? 50));
                  state.vars.items.push(item);
               }
            } else if ([ 'starfait_x', 'legendary_hero_x', 'glamburger_x', 'face_steak_x' ].includes(item)) {
               ratings(text.b_opponent_mettaton2.ratings.item.pain, 25);
            }
         },
         item: {
            async blookpie () {
               await battler.human(...text.b_opponent_mettaton2.tvmReaction.blookpie());
               battler.stat.monsterdef.modifiers.push([ 'add', world.bad_robot ? 5 : -5, Infinity ]);
               battler.stat.monsteratk.modifiers.push([ 'add', world.bad_robot ? 1 : -1, Infinity ]);
               ratings(text.b_opponent_mettaton2.ratings.item.blookpie, 50);
            },
            async artifact () {
               await battler.human(...text.b_opponent_mettaton2.artifact());
               ratings(text.b_opponent_mettaton2.ratings.item.artifact, 0);
            },
            async old_gun (state) {
               await battler.human(...text.b_opponent_mettaton2.old_gun_text());
               useOld('old_gun', state, false);
               ratings(text.b_opponent_mettaton2.ratings.item.old_gun, 100);
            },
            async old_bomb (state) {
               await battler.human(...text.b_opponent_mettaton2.old_bomb_text());
               useOld('old_bomb', state, false);
               ratings(text.b_opponent_mettaton2.ratings.item.old_bomb, 100);
            },
            async old_spray (state) {
               await battler.human(...text.b_opponent_mettaton2.old_spray_text());
               useOld('old_spray', state, false);
               ratings(text.b_opponent_mettaton2.ratings.item.old_spray, 100);
            },
            async spanner (state) {
               await battler.human(...text.b_opponent_mettaton2.spannerReaction(state.vars.spanner));
               if (world.genocide) {
                  SAVE.storage.inventory.remove('spanner');
               } else if (world.bad_robot) {
                  SAVE.storage.inventory.remove('spanner');
                  battler.damage(6 + battler.bonus);
               } else if (state.vars.spanner) {
                  ratings(text.b_opponent_mettaton2.ratings.item.repeat, -10);
               } else {
                  state.vars.spanner = true;
                  ratings(text.b_opponent_mettaton2.ratings.item.spanner, 100);
               }
            },
            async tvm_radio () {
               if (!world.genocide) {
                  await battler.human(...text.b_opponent_mettaton2.tvmReaction.radio());
                  SAVE.storage.inventory.remove('tvm_radio');
                  ratings(text.b_opponent_mettaton2.ratings.item.tvm_radio, 100);
               }
            },
            async tvm_fireworks () {
               if (!world.genocide) {
                  await battler.human(...text.b_opponent_mettaton2.tvmReaction.fireworks());
                  SAVE.storage.inventory.remove('tvm_fireworks');
                  ratings(text.b_opponent_mettaton2.ratings.item.tvm_fireworks, 200);
               }
            },
            async tvm_mewmew () {
               if (!world.genocide) {
                  await battler.human(...text.b_opponent_mettaton2.tvmReaction.mewmew());
                  SAVE.storage.inventory.remove('tvm_mewmew');
                  ratings(text.b_opponent_mettaton2.ratings.item.tvm_mewmew, 300);
               }
            },
            async epiphany (state) {
               const container = state.volatile.container;
               const spr = container.objects[0];
               const tint = spr.tint;
               const index = speech.emoters.mettaton.index;
               const ti = container.metadata.ti as void | CosmosText;
               await epiphany(
                  state.target,
                  state.volatile,
                  160,
                  { result: false },
                  battler.bubbles.twinkly,
                  () =>
                     world.genocide
                        ? { x: 180, y: 25 }
                        : { x: 195, y: state.volatile.container.objects[0].metadata.hideLegs ? 60 : 30 },
                  text.b_opponent_mettaton2.epiphaNOPE(),
                  () => {
                     spr.tint = tint;
                     speech.emoters.mettaton.index = index;
                     ti && (ti.alpha.value = 1);
                  },
                  () => {
                     spr.tint = void 0;
                     ti && (ti.alpha.value = 0);
                  }
               );
            }
         },
         async prestatus (state) {
            if (
               SAVE.data.b.a_state_hapstablook &&
               state.vars.assistStatus++ === 1 &&
               battler.alive.length !== 0 &&
               !SAVE.data.b.oops
            ) {
               battler.status = () => text.b_opponent_mettaton2.hint;
            }
         },
         async poststatus (state) {
            if (world.genocide) {
               return;
            }
            const { vars, dialogue, volatile } = state;
            if (battler.alive.length !== 0) {
               state.vars.boast.value && (graphMetadata.ratingsgain = iFancyYourVilliany() ? 0.1 : 0.2);
               graphMetadata.ratingsboost = CosmosMath.remap(volatile.hp, 0, 0.2, volatile.opponent.hp, 0);
               events.on('hurt', vars.hurtListener);
               await patterns.mettaton2(
                  true,
                  state,
                  vars.turns,
                  state.choice.type === 'act' && state.choice.act === 'cut' && state.vars.wires !== 0,
                  world.bad_robot && state.vars.wires === 0
               );
               if (state.vars.boast.value) {
                  state.vars.boast.value = false;
                  if (state.vars.boast.hit) {
                     state.vars.boast.hit = false;
                  } else {
                     ratings(
                        text.b_opponent_mettaton2.ratings.boast3,
                        (graphMetadata.ratingsbase - state.vars.boast.origin) / 2
                     );
                  }
               } else if (state.vars.villian.value) {
                  state.vars.villian.value = false;
                  if (state.vars.villian.hit) {
                     state.vars.villian.hit = false;
                  } else {
                     ratings(
                        text.b_opponent_mettaton2.ratings.heel3,
                        iFancyYourVilliany() ? -40 : SAVE.data.b.a_state_hapstablook ? -20 : -30
                     );
                  }
               }
               game.movement = false;
               battler.SOUL.alpha.value = 0;
               events.off('hurt', vars.hurtListener);
               const container = state.volatile.container;
               const spr = container.objects[0];
               await Promise.all([
                  battler.box.position.modulate(renderer, 300, 160),
                  battler.box.size.modulate(renderer, 300, { x: 282.5, y: 65 })
               ]);
               if (world.bad_robot) {
                  if (state.vars.wires > 0) {
                     return;
                  }
                  if (!state.vars.finalthreat) {
                     state.vars.finalthreat = true;
                     battler.music?.stop();
                     await dialogue(false, ...text.b_opponent_mettaton2.turnTalkX1a);
                     await battler.alpha.modulate(renderer, 1500, 0);
                     await renderer.pause(1500);
                     await dialogue(false, ...text.b_opponent_mettaton2.turnTalkX1b);
                     const sfx = sounds.surge.instance(renderer, 1.5);
                     sfx.rate.value = 8500 / 4000;
                     sfx.gain.value /= 4;
                     sfx.gain.modulate(renderer, 500, sfx.gain.value * 4);
                     const fd = fader({
                        fill: 0xffffff,
                        alpha: 0,
                        anchor: 0,
                        size: 1000,
                        position: { x: 160, y: 160 },
                        priority: 913576193857
                     });
                     await Promise.all([
                        renderer.shake.modulate(renderer, 3000, 2),
                        renderer.pause(2500).then(async () => fd.alpha.modulate(renderer, 500, 1))
                     ]);
                     sfx.stop();
                     renderer.shake.value = 0;
                     speech.emoters.mettaton.index = 27;
                     spr.metadata.leftLegIndex = 2;
                     spr.metadata.leftLegIndex = 5;
                     spr.metadata.ticks = 0;
                     await renderer.pause(1000);
                     await fd.alpha.modulate(renderer, 500, 0);
                     await renderer.pause(1000);
                     await dialogue(false, ...text.b_opponent_mettaton2.turnTalkX1c);
                     battler.music = music.glovesFinal.instance(renderer);
                     battler.alpha.value = 1;
                     spr.metadata.tickSpeed.value = 1.5;
                     spr.metadata.doTick = true;
                     battler.status = () => text.b_opponent_mettaton2.statusY;
                     while (vars.turns < 18) {
                        vars.turns += 12;
                     }
                     spr.metadata.dancedelay = 25;
                  }
                  spr.metadata.dance = true;
                  return;
               }
               if ((vars.turns < 12 ? 14000 : vars.turns < 18 ? 12000 : 10000) <= graphMetadata.ratingsbase) {
                  spr.metadata.tickSpeed.modulate(renderer, 2000, 0).then(() => {
                     spr.metadata.doTick = false;
                  });
                  battler.music?.stop();
                  const graph = battler.volatile[0].vars.graph as CosmosObject;
                  graph.alpha.modulate(renderer, 1000, 0).then(() => {
                     battler.overlay.detach(graph);
                  });
                  events.off('select', selectMTT);
                  await renderer.pause(1200);
                  const [ leftLeg, rightLeg, leftArm, rightArm ] = spr.objects as CosmosAnimation[];
                  let sfx = false;
                  if (!spr.metadata.hideArms) {
                     sfx = true;
                     spr.metadata.hideArms = true;
                     leftArm.gravity.y = 0.25;
                     leftArm.spin.value = 1;
                     leftArm.priority.value = -10;
                     rightArm.gravity.y = 0.25;
                     rightArm.spin.value = -1;
                     rightArm.priority.value = -10;
                  }
                  if (!spr.metadata.hideLegs) {
                     sfx = true;
                     spr.metadata.hideLegs = true;
                     leftLeg.gravity.y = 0.25;
                     leftLeg.spin.value = 1;
                     rightLeg.gravity.y = 0.25;
                     rightLeg.spin.value = -1;
                  }
                  if (sfx) {
                     sounds.noise.instance(renderer);
                     await renderer.pause(300);
                     sounds.boom.instance(renderer);
                     await renderer.pause(2000);
                  } else {
                     await renderer.pause(1000);
                  }
                  await dialogue(false, ...text.b_opponent_mettaton2.audienceRec0());
                  const fans = music.forthefans.instance(renderer);
                  await renderer.pause(500);
                  sounds.phone.instance(renderer);
                  typer.magic = battler.ghost_magic;
                  await battler.monster(
                     false,
                     { x: 250, y: 120 },
                     battler.bubbles.mttphone,
                     ...text.b_opponent_mettaton2.audienceRec1()
                  );
                  typer.magic = '';
                  await dialogue(false, ...text.b_opponent_mettaton2.audienceRec2);
                  sounds.phone.instance(renderer);
                  await battler.monster(
                     false,
                     { x: 240, y: 120 },
                     battler.bubbles.mttphone,
                     ...text.b_opponent_mettaton2.audienceRec3a()
                  );
                  sounds.phone.instance(renderer);
                  await battler.monster(
                     false,
                     { x: 260, y: 120 },
                     battler.bubbles.mttphone,
                     ...text.b_opponent_mettaton2.audienceRec3b()
                  );
                  sounds.phone.instance(renderer);
                  await battler.monster(
                     false,
                     { x: 250, y: 120 },
                     battler.bubbles.mttphone,
                     ...text.b_opponent_mettaton2.audienceRec3c()
                  );
                  await renderer.pause(1600);
                  fans.gain.modulate(renderer, 2000, 0).then(() => fans.stop());
                  await dialogue(false, ...text.b_opponent_mettaton2.audienceRec4());
                  volatile.alive = false;
                  const ratings = Math.floor(graphMetadata.ratingsbase * [ 1, 0.5, 0.1, 0 ][world.bad_lizard]);
                  SAVE.data.n.state_mettaton_ratings = ratings;
                  saver.gold += Math.floor(ratings / 5);
                  events.on('battle-exit').then(() => {
                     deAllB();
                  });
                  events.fire('exit');
               } else {
                  volatile.container.objects[0].metadata.dance = true;
                  graphMetadata.ratingsgain = CosmosMath.remap(volatile.hp, -0.1, 0, volatile.opponent.hp, 0);
               }
            }
         },
         prechoice (state) {
            let pose = false;
            let flirt = false;
            let scream = false;
            if (state.choice.type === 'act') {
               switch (state.choice.act) {
                  case 'pose':
                     pose = true;
                     state.vars.act.pose < 4 && state.vars.act.pose++;
                     break;
                  case 'flirt':
                     flirt = true;
                     state.vars.act.flirt < 4 && state.vars.act.flirt++;
                     break;
                  case 'scream':
                     scream = true;
                     state.vars.act.scream < 4 && state.vars.act.scream++;
                     break;
               }
            }
            !pose && state.vars.act.pose > 0 && state.vars.act.pose--;
            !flirt && state.vars.act.flirt > 0 && state.vars.act.flirt--;
            !scream && state.vars.act.scream > 0 && state.vars.act.scream--;
         },
         act: {
            async check () {
               await battler.human(...text.b_opponent_mettaton2.act_check());
            },
            async pose (state) {
               if (state.vars.act.pose > 1) {
                  await battler.human(...text.b_opponent_mettaton2.act_pose0()[Math.min(state.vars.act.pose - 2, 1)]);
                  ratings(
                     text.b_opponent_mettaton2.ratings.item[state.vars.act.pose < 3 ? 'repeat' : 'repeat_x'],
                     state.vars.act.scream < 3 ? -10 : -25
                  );
                  return;
               }
               const level =
                  3 -
                  Math.min(
                     Math.ceil(SAVE.data.n.hp / (6 + battler.bonus + calcDFX() + battler.stat.monsteratk.compute())),
                     3
                  );
               await battler.human(
                  ...[
                     text.b_opponent_mettaton2.act_pose1,
                     text.b_opponent_mettaton2.act_pose2,
                     text.b_opponent_mettaton2.act_pose3,
                     text.b_opponent_mettaton2.act_pose4
                  ][level]()
               );
               ratings(
                  [
                     text.b_opponent_mettaton2.ratings.pose1,
                     text.b_opponent_mettaton2.ratings.pose2,
                     text.b_opponent_mettaton2.ratings.pose3,
                     text.b_opponent_mettaton2.ratings.pose4
                  ][level](),
                  (iFancyYourVilliany() ? [ 200, 50, 25, 100 ] : [ 25, 50, 100, 200 ])[level]
               );
            },
            async flirt (state) {
               if (state.vars.act.flirt > 1) {
                  await battler.human(...text.b_opponent_mettaton2.act_flirt0[Math.min(state.vars.act.flirt - 2, 1)]);
                  ratings(
                     text.b_opponent_mettaton2.ratings.item[state.vars.act.flirt < 3 ? 'repeat' : 'repeat_x'],
                     state.vars.act.scream < 3 ? -10 : -25
                  );
                  return;
               }
               const level = iFancyYourVilliany()
                  ? Math.min(state.vars.flirts++, 3)
                  : world.flirt < 10
                  ? 0
                  : world.flirt < 15
                  ? 1
                  : world.flirt < 20
                  ? 2
                  : 3;
               await battler.human(
                  ...[
                     text.b_opponent_mettaton2.act_flirt1,
                     text.b_opponent_mettaton2.act_flirt2,
                     text.b_opponent_mettaton2.act_flirt3,
                     text.b_opponent_mettaton2.act_flirt4
                  ][level]()
               );
               ratings(
                  [
                     text.b_opponent_mettaton2.ratings.flirt1,
                     text.b_opponent_mettaton2.ratings.flirt2,
                     text.b_opponent_mettaton2.ratings.flirt3,
                     text.b_opponent_mettaton2.ratings.flirt4
                  ][level](),
                  (iFancyYourVilliany() ? [ 320, 160, 80, 40 ] : [ 20, 40, 80, 160 ])[level]
               );
            },
            async boast (state) {
               await battler.human(...text.b_opponent_mettaton2.act_boast);
               state.vars.boast.value = true;
               state.vars.boast.origin = graphMetadata.ratingsbase;
            },
            async heel (state) {
               await battler.human(...text.b_opponent_mettaton2.act_heel);
               state.vars.villian.value = true;
            },
            async scream (state) {
               if (state.vars.act.scream > 1) {
                  await battler.human(...text.b_opponent_mettaton2.act_scream0[Math.min(state.vars.act.scream - 2, 1)]);
                  ratings(
                     text.b_opponent_mettaton2.ratings.item[state.vars.act.scream < 3 ? 'repeat' : 'repeat_x'],
                     state.vars.act.scream < 3 ? -10 : -25
                  );
               } else {
                  await battler.human(...text.b_opponent_mettaton2.act_scream);
                  ratings(text.b_opponent_mettaton2.ratings.scream, 100);
               }
               battler.stat.speed.modifiers.push([ 'multiply', 0.75, 1 ]);
            },
            async cut (state) {
               state.vars.fnoa = -1;
               if (state.vars.wires === 0) {
                  await battler.human(...text.b_opponent_mettaton2.act_cut3);
               } else if (state.vars.wirecutted) {
                  await battler.human(...text.b_opponent_mettaton2.act_cut2);
               } else {
                  state.vars.wirecutted = true;
                  await battler.human(...text.b_opponent_mettaton2.act_cut1);
               }
            }
         }
      }),
      sprite (v) {
         const { abs, sin } = Math;
         function display (
            sprite: CosmosSprite,
            index: number,
            x: number,
            y: number,
            sx: number = 2,
            sy: number = 2,
            r: number = 0,
            a: number = 1
         ) {
            sprite.index = index % sprite.frames.length;
            sprite instanceof CosmosAnimation && sprite.fix();
            sprite.position.set(x / 2, (y - 240) / 2);
            sprite.scale.set(sx / 2, sy / 2);
            sprite.rotation.value = -r;
            sprite.alpha.value = a;
         }
         if (world.genocide) {
            const wing1 = new CosmosSprite({
               offsets: [ { y: 33, x: 3 } ],
               frames: [ content.ibcMettatonNeoWings ]
            });
            const wing2 = new CosmosSprite({
               offsets: [ { y: 33, x: -3 } ],
               frames: [ content.ibcMettatonNeoWings ]
            });
            const legs = new CosmosSprite({
               anchor: { x: 0, y: 1 },
               frames: [ content.ibcMettatonNeoLegs ],
               offsets: [ { y: 30 } ]
            });
            const arm1 = new CosmosSprite({
               anchor: { x: 0 },
               frames: [ content.ibcMettatonNeoArm2 ],
               offsets: [ { x: 30, y: 35 } ]
            });
            const arm2 = new CosmosSprite({
               anchor: { x: 0 },
               frames: [ content.ibcMettatonNeoArm1 ],
               offsets: [ { x: -30, y: 35 } ]
            });
            const body = new CosmosAnimation({
               anchor: { x: 0 },
               resources: content.ibcMettatonNeoBody
            });
            const head = new CosmosAnimation({
               anchor: { x: 0 },
               resources: content.ibcMettatonNeoHead,
               offsets: [ { y: 14.5 } ]
            });
            return new CosmosSprite({
               tint: 0xffffff,
               anchor: { y: 1 },
               metadata: {
                  ap: 0,
                  ticks: 0,
                  freeze: false,
                  shakenbake: new CosmosValue(),
                  size: { y: 100 },
                  hit: -Infinity,
                  dead: false,
                  hideWings: false,
                  bodyActive: false
               },
               area: renderer.area,
               objects: [ wing1, wing2, legs, arm1, arm2, body, head ],
               filters: [
                  new OutlineFilter(1, 0xff007f, 1, 1),
                  new DropShadowFilter({ quality: 1, blur: 1, color: 0xff007f, alpha: 0, offset: { x: 0, y: 0 } }),
                  new ZoomBlurFilter({ strength: 0, radius: 250, innerRadius: 0, center: [ 320, 120 ] })
               ]
            }).on('tick', function () {
               const { x, y } = this.position;
               const { freeze, ticks, dead, bodyActive } = this.metadata;
               freeze || this.metadata.ticks++;
               dead && (this.metadata.ticks = 0);
               const snbv = this.metadata.shakenbake.value;
               snbv > 0 && this.offsets[0].set((Math.random() * 2 - 1) * snbv, (Math.random() * 2 - 1) * snbv);
               if (bodyActive) {
                  body.reverse = false;
                  body.index < 5 ? body.enable() : body.disable();
               } else {
                  body.reverse = true;
                  body.index > 0 ? body.enable() : body.disable();
               }
               display(
                  wing1,
                  0,
                  x - 26,
                  y + 18 + sin(ticks / 3) * 1,
                  -2,
                  2,
                  sin(ticks / 6) * 2,
                  this.metadata.hideWings ? 0 : abs(sin(ticks * 0.3)) * 0.5 + 0.4
               );
               display(
                  wing2,
                  0,
                  x + 26,
                  y + 18 + sin(ticks / 3) * 1,
                  2,
                  2,
                  -sin(ticks / 6) * 2,
                  this.metadata.hideWings ? 0 : abs(sin(ticks * 0.3)) * 0.5 + 0.4
               );
               display(legs, 0, x, y + 84 + 112, 2, 2 - sin(ticks / 3) * 0.05, 0, 1);
               display(arm1, 0, x + 26 + sin(ticks / 3) * 2, y + 40, 2, 2, sin(ticks / 6) * 2, 1);
               display(arm2, 0, x - 26 - sin(ticks / 3) * 2, y + 40, 2, 2, -sin(ticks / 6) * 2, 1);
               display(body, body.index || 0, x, y + 36 + sin(ticks / 3) * 2, 2, 2, 0, 1);
               display(head, this.index, x, y + sin(ticks / 3) * 3, 2, 2, 0, 1);
               const timephase = dead
                  ? 1
                  : 1 -
                    Math.min(
                       Math.max((renderer.time - this.metadata.hit) / CosmosMath.remap(this.metadata.ap, 300, 1200), 0),
                       1
                    );
               if (this.tint !== void 0) {
                  this.tint = CosmosImageUtils.gradient(0xffffff, 0xff007f, timephase);
               }
               (this.filters![0] as OutlineFilter).alpha = timephase;
               const shad = this.filters![1] as DropShadowFilter;
               shad.alpha = timephase;
               shad.blur = timephase * 2;
            });
         } else {
            const garbo1234 = [ 42, 12, 65, 33, 47, 55 ];
            const body = new CosmosAnimation({
               resources: content.ibcMettatonExBody,
               anchor: { x: 0 },
               offsets: [ { y: 11 } ]
            });
            const bodyHeart = new CosmosAnimation({
               resources: content.ibcMettatonExBodyHeart,
               anchor: { x: 0, y: 1 },
               offsets: [ { y: -2 } ]
            });
            const head = new CosmosAnimation({
               resources: content.ibcMettatonExFace,
               anchor: { x: 0 },
               offsets: [ { y: 35 } ]
            });
            const leftArm = new CosmosAnimation({
               resources: content.ibcMettatonExArm,
               anchor: { x: 1 },
               offsets: [ { x: 22, y: -4 } ]
            });
            const leftLeg = new CosmosAnimation({
               resources: content.ibcMettatonExLeg,
               offsets: [ { x: 10, y: 48 } ],
               priority: -2
            });
            const rightArm = new CosmosAnimation({
               resources: content.ibcMettatonExArm,
               anchor: { x: 1 },
               offsets: [ { x: -22, y: -4 } ]
            });
            const rightLeg = new CosmosAnimation({
               resources: content.ibcMettatonExLeg,
               offsets: [ { x: -10, y: 48 } ],
               priority: -2
            });
            const wires = CosmosUtils.populate(world.bad_robot ? 8 : 0, index => {
               const side = index % 2;
               const scaleX = [ -1, 1 ][side];
               const localAnchor = new CosmosPoint(160, 125);
               const yIndex = Math.floor(index / 2);
               const distantAnchor = new CosmosPoint([ 5, 315 ][side], 25 + yIndex * 30);
               const rotationOffset = [ 180, 0 ][side];
               return new CosmosAnimation({
                  resources: content.ibcMettatonBrachistochrone,
                  anchor: { y: 0 },
                  offsets: [ { x: 3 * scaleX, y: 32 + yIndex * 2 } ],
                  priority: -138518351835,
                  metadata: {
                     active: false,
                     activated: false,
                     autumn: false,
                     autumnAccel: 0.4 * 0.95,
                     autumnSpeed: 0.5 * 0.95,
                     lastphase: -Infinity,
                     offset: 0,
                     phase: new CosmosValue(),
                     ticks: 0
                  }
               })
                  .on('tick', function () {
                     if (this.alpha.value === 0) {
                        return;
                     } else if (this.index === 2) {
                        this.disable();
                     }
                     const vars = battler.volatile[1]?.vars ?? {};
                     if (vars.wireprogress === Infinity) {
                        this.metadata.autumn = true;
                        this.enable();
                     }
                     if (!this.metadata.autumn && vars.wires === index + 1 && 1 <= vars.wireprogress) {
                        this.metadata.autumn = true;
                        vars.wires--;
                        vars.wireprogress = 0;
                        vars.wirecutted = false;
                        sounds.switch.instance(renderer).rate.value *= 1.5;
                        this.enable();
                     }
                  })
                  .on('pre-render', function () {
                     const truePosition = localAnchor.add(this).add(this.offsets[0]);
                     this.rotation.value = truePosition.angleTo(distantAnchor) + rotationOffset;
                     this.scale.x = (truePosition.extentOf(distantAnchor) / 180) * scaleX;
                     if (this.metadata.autumn) {
                        const destination = truePosition
                           .add(this.offsets[1])
                           .shift(
                              (this.metadata.autumnSpeed += this.metadata.autumnAccel += 0.08 * 0.95) * [ 1, -1 ][side],
                              0,
                              distantAnchor
                           );
                        this.offsets[1].set(destination.subtract(truePosition));
                        this.rotation.value +=
                           destination.angleFrom(distantAnchor) - truePosition.angleFrom(distantAnchor);
                        (this.alpha.value -= 1 / 17) < 0 && (this.alpha.value = 0);
                        return;
                     } else if (
                        this.metadata.active &&
                        ++this.metadata.ticks > this.metadata.offset &&
                        renderer.time > this.metadata.lastphase + 2000
                     ) {
                        this.metadata.activated = true;
                        this.metadata.lastphase = renderer.time;
                        this.metadata.phase.modulate(renderer, 2000, 2, 0).then(() => {
                           this.metadata.activated = false;
                        });
                     }
                     if (this.metadata.activated) {
                        this.tint = CosmosImageUtils.gradient(
                           0xffffff,
                           0xff3f3f,
                           CosmosMath.wave(this.metadata.phase.value + 0.75)
                        );
                     } else {
                        this.tint = void 0;
                     }
                  });
            });
            return new CosmosSprite({
               tint: 0xffffff,
               anchor: { y: 1 },
               metadata: {
                  bodyActive: false,
                  dance: false,
                  dancedelay: 25,
                  dancetimer: 0,
                  doTick: true,
                  fallTicks: null as number | null,
                  fallTicksRate: 1,
                  hideArms: false,
                  hideHeart: false,
                  hideLegs: false,
                  leftArmIndex: 0,
                  leftLegIndex: 0,
                  leftLegTicks: 0,
                  rightArmIndex: 0,
                  rightLegIndex: 0,
                  rightLegTicks: 0,
                  ticks: 0,
                  tickSpeed: new CosmosValue(1),
                  size: { y: 100 }
               },
               objects: [ leftLeg, rightLeg, leftArm, rightArm, body, bodyHeart, head, ...wires ],
               position: { y: 5 }
            }).on('tick', async function () {
               if (this.metadata.dance) {
                  if (this.metadata.dancedelay <= ++this.metadata.dancetimer) {
                     const armPoses =
                        world.bad_robot || v.hp < v.opponent.hp / 2 ? [ 0, 1, 2, 3, 4, 6, 7 ] : [ 0, 1, 2, 3, 4, 5, 6, 7 ];
                     this.metadata.leftArmIndex = armPoses[Math.floor(Math.random() * armPoses.length)];
                     this.metadata.leftLegIndex = Math.floor(Math.random() * 5);
                     this.metadata.rightArmIndex = armPoses[Math.floor(Math.random() * armPoses.length)];
                     this.metadata.rightLegIndex = Math.floor(Math.random() * 5);
                     head.index < 9 && (head.index = Math.floor(Math.random() * 9));
                     this.metadata.dancetimer = 0;
                  }
               } else {
                  this.metadata.dancetimer = 0;
               }
               const { x, y } = this.position;
               const { sin, cos, max } = Math;
               const {
                  bodyActive,
                  doTick,
                  hideArms,
                  hideHeart,
                  hideLegs,
                  leftArmIndex,
                  leftLegIndex,
                  rightArmIndex,
                  rightLegIndex,
                  tickSpeed
               } = this.metadata;

               const leftLegDepth = garbo1234[leftLegIndex];
               const rightLegDepth = garbo1234[rightLegIndex];

               const legAngle = 0;
               let legDepth = 0;

               const bad = leftLegIndex === 5 && rightLegIndex === 5;
               const badFactor = bad ? 1.5 : 1;
               if (hideLegs) {
                  this.metadata.fallTicks ??= max(leftLegDepth, rightLegDepth) * 2;
                  if (this.metadata.fallTicks > 0) {
                     legDepth = this.metadata.fallTicks -= this.metadata.fallTicksRate++;
                     if (this.metadata.fallTicks <= 0) {
                        this.metadata.fallTicks = 0;
                        sounds.landing.instance(renderer);
                        shake(2, 1000);
                     }
                  }
               } else {
                  if (doTick) {
                     this.metadata.leftLegTicks += tickSpeed.value;
                     this.metadata.rightLegTicks += tickSpeed.value;
                     if (leftLegIndex !== 1 || rightLegIndex !== 1) {
                        this.metadata.ticks += tickSpeed.value / badFactor;
                     }
                  }
                  if (leftLegDepth > rightLegDepth) {
                     legDepth = leftLegDepth * 2;
                     this.metadata.leftLegTicks = 0;
                  } else {
                     legDepth = rightLegDepth * 2;
                     this.metadata.rightLegTicks = 0;
                  }
                  if (abs(leftLegDepth - rightLegDepth) < 5) {
                     this.metadata.leftLegTicks = 0;
                     this.metadata.rightLegTicks = 0;
                  }
               }

               if (bodyActive) {
                  body.reverse = false;
                  body.index < 4 ? body.enable() : body.disable();
               } else {
                  body.reverse = true;
                  body.index > 0 ? body.enable() : body.disable();
               }

               const sin2 = sin(this.metadata.ticks / 2);
               const sin3_5 = sin(this.metadata.ticks / 3.5) / badFactor;
               const cos3_5 = cos(this.metadata.ticks / 3.5) / badFactor;

               const badLegFactor = bad ? 0 : 0.05;
               if (!hideLegs) {
                  display(
                     leftLeg,
                     leftLegIndex,
                     x - 14,
                     y + 130 - legDepth - sin2 * badLegFactor,
                     -2,
                     2 - sin3_5 * badLegFactor,
                     sin(this.metadata.leftLegTicks / 7) * 10
                  );
                  display(
                     rightLeg,
                     rightLegIndex,
                     x + 14,
                     y + 130 - legDepth - sin2 * badLegFactor,
                     2,
                     2 - sin3_5 * badLegFactor,
                     sin(this.metadata.rightLegTicks / 7) * 10 - legAngle
                  );
               }

               if (!hideArms) {
                  display(leftArm, leftArmIndex, x - 37 + sin3_5, y - legDepth + 80 + cos3_5 * 2);
                  display(rightArm, rightArmIndex, x + 37 + sin3_5, y - legDepth + 80 + cos3_5 * 2, -2);
                  leftArm.priority.value = [ 5, 9 ].includes(leftArmIndex) ? 1 : -1;
                  rightArm.priority.value = [ 5, 9 ].includes(rightArmIndex) ? 1 : -1;
               }

               display(body, body.index || 0, x + sin3_5, y - legDepth + 134 + cos3_5 * 2);
               if (bad) {
                  for (const wire of wires) {
                     if (!wire.metadata.autumn) {
                        display(wire, 0, x + sin3_5, y - legDepth + 134 + cos3_5 * 2);
                     }
                  }
               }
               hideHeart ||
                  display(
                     bodyHeart,
                     bodyHeart.index || 0,
                     x + sin3_5,
                     y - legDepth + 134 + cos3_5 * 2 + 108 + bodyHeart.index
                  );
               display(head, head.index || 0, x, y + 40 - legDepth + cos3_5 * 3, 2, 2, 0, 1);
            });
         }
      }
   }),
   rg01: new OutertaleOpponent({
      flirted: () => SAVE.data.b.flirt_rg03,
      assets: new CosmosInventory(
         content.ibcRoyalguardCatHead,
         content.ibcRoyalguardRabbitHead,
         content.ibcRoyalguardCatFist
      ),
      hp: 150,
      df: 4,
      exp: 110,
      g: 72,
      bullied: () => SAVE.data.b.bullied_rg03,
      bully: () => {
         SAVE.data.b.bullied_rg03 = true;
         SAVE.data.n.bully++;
      },
      name: () => text.b_opponent_rg01.name(),
      acts: () =>
         world.bad_lizard > 1
            ? [
                 [
                    'check',
                    () =>
                       battler.volatile[0].vars.killed !== -1
                          ? text.b_opponent_rg01.act_check2()
                          : text.b_opponent_rg01.act_check()
                 ],
                 [ 'flirt', [] ]
              ]
            : [
                 [
                    'check',
                    v =>
                       battler.hurt.includes(v)
                          ? text.b_opponent_rg01.act_check2()
                          : v.sparable
                          ? text.b_opponent_rg01.act_check3
                          : battler.volatile[0].vars.killed !== -1
                          ? (battler.volatile[0].vars.progress ?? 0) < 2
                             ? text.b_opponent_rg01.act_check6
                             : text.b_opponent_rg01.act_check4
                          : (battler.volatile[0].vars.progress ?? 0) < 1
                          ? text.b_opponent_rg01.act_check()
                          : text.b_opponent_rg01.act_check5
                 ],
                 [ 'tug', [] ],
                 [ 'whisper', [] ],
                 [ 'flirt', [] ]
              ],
      sprite: () => rg(0),
      goodbye: () =>
         new CosmosAnimation({
            metadata: { size: { y: 80 } },
            anchor: { x: 0, y: (164 / 198) * 2 - 1 },
            resources: content.ibcRoyalguardHurt,
            index: world.bad_lizard > 1 ? 0 : 2,
            scale: 1 / 2
         })
   }),
   rg02: new OutertaleOpponent({
      flirted: () => SAVE.data.b.flirt_rg04,
      assets: new CosmosInventory(
         content.ibcRoyalguardBugHead,
         content.ibcRoyalguardDragonHead,
         content.ibcRoyalguardBugFist
      ),
      hp: 150,
      df: 4,
      exp: 110,
      g: 72,
      bullied: () => SAVE.data.b.bullied_rg04,
      bully: () => {
         SAVE.data.b.bullied_rg04 = true;
         SAVE.data.n.bully++;
      },
      name: () => text.b_opponent_rg02.name(),
      acts: () =>
         world.bad_lizard > 1
            ? [
                 [
                    'check',
                    () =>
                       battler.volatile[0].vars.killed !== -1
                          ? text.b_opponent_rg02.act_check2()
                          : text.b_opponent_rg02.act_check()
                 ],
                 [ 'flirt', [] ]
              ]
            : [
                 [
                    'check',
                    v =>
                       battler.hurt.includes(v)
                          ? text.b_opponent_rg02.act_check2()
                          : v.sparable
                          ? text.b_opponent_rg02.act_check3
                          : battler.volatile[0].vars.killed !== -1
                          ? (battler.volatile[0].vars.progress ?? 0) < 2
                             ? text.b_opponent_rg02.act_check6
                             : text.b_opponent_rg02.act_check4
                          : (battler.volatile[0].vars.progress ?? 0) < 1
                          ? text.b_opponent_rg02.act_check()
                          : text.b_opponent_rg02.act_check5
                 ],
                 [ 'tug', [] ],
                 [ 'whisper', [] ],
                 [ 'flirt', [] ]
              ],
      sprite: () => rg(1),
      goodbye: () =>
         new CosmosAnimation({
            metadata: { size: { y: 80 } },
            anchor: { x: 0, y: (164 / 198) * 2 - 1 },
            resources: content.ibcRoyalguardHurt,
            index: world.bad_lizard > 1 ? 1 : 3,
            scale: 1 / 2
         })
   }),
   rg: new OutertaleOpponent({
      assets: new CosmosInventory(
         content.ibcRoyalguardBall,
         content.ibcRoyalguardChestplate,
         content.ibcRoyalguardLegs,
         content.ibcRoyalguardShoes,
         content.ibcRoyalguardFist,
         content.ibcRoyalguardFlag,
         content.ibcRoyalguardFalchion,
         content.ibcRoyalguardHurt,
         content.ibcRoyalguardSweat,
         content.ibcRoyalguardCatHead,
         content.ibcRoyalguardBugHead
      ),
      flirted: () => SAVE.data.b.flirt_rg03 && SAVE.data.b.flirt_rg04,
      bullied: () => SAVE.data.b.bullied_rg03 && SAVE.data.b.bullied_rg04,
      sprite: v =>
         new CosmosSprite({
            objects: [
               new CosmosObject({
                  position: { x: -80 },
                  objects: [ rg(0, v.vars) ]
               }),
               new CosmosObject({
                  position: { x: 80 },
                  objects: [ rg(1) ]
               })
            ]
         })
   }),
   glyde: new OutertaleOpponent({
      flirted: () => SAVE.data.b.flirt_glyde,
      assets: new CosmosInventory(
         content.ibcGlydeAntenna,
         content.ibcGlydeBody,
         content.ibcGlydeWingLeft,
         content.ibcGlydeWingRight,
         content.ibcMettatonBody,
         content.ibcMettatonArmsWhatevs,
         content.ibcMettatonArmsThonk,
         content.ibcMettatonArmsNoticard,
         content.ibcMettatonWheel,
         content.ibcBurgerpantsBody,
         content.ibbYarn,
         content.asArrow,
         content.ibcGlydeHurt,
         content.ibbPlusSign,
         content.asBomb,
         content.ibbSoda,
         content.asArrow,
         content.asBurst,
         content.asLanding
      ),
      hp: 220,
      df: -20,
      exp: 100,
      g: 100,
      name: () => text.b_opponent_glyde.name,
      acts: () => [
         [ 'check', text.b_opponent_glyde.act_check ],
         [ 'flirt', [] ],
         [ 'berate', text.b_opponent_glyde.act_berate ],
         [ 'password', text.b_opponent_glyde.act_secret ]
      ],
      handler: battler.opponentHandler({
         vars: {
            turns: 0,
            flirted: false,
            secreted: false,
            checked: false,
            itemcount: 0,
            intermediateItem: false,
            async rtext (cutscene: boolean, ar: CosmosPointSimple, ...lines: string[]) {
               await battler.monster(cutscene, new CosmosPoint(27.5, -70).add(ar), battler.bubbles.twinkly, ...lines);
            }
         },
         bubble: [ { x: 190, y: 15 }, battler.bubbles.twinkly ],
         act: {
            async flirt (state) {
               if (state.vars.turns === 0) {
                  state.vars.flirted = true;
                  SAVE.data.b.flirt_glyde = true;
                  state.volatile.flirted = true;
                  await battler.human(...text.b_opponent_glyde.act_flirt1);
               } else {
                  await battler.human(...text.b_opponent_glyde.act_flirt2);
               }
            },
            password (state) {
               if (SAVE.data.b.w_state_steak && SAVE.data.b.w_state_soda && glade()) {
                  state.vars.secreted = true;
               }
            },
            check (state) {
               state.vars.checked = true;
            }
         },
         item: {
            steak (state) {
               state.vars.itemcount++;
            },
            soda (state) {
               state.vars.itemcount++;
            },
            async epiphany (state) {
               const index = speech.emoters.glyde.index;
               await epiphany(
                  state.target,
                  state.volatile,
                  state.volatile.container.position.x,
                  { result: false },
                  battler.bubbles.twinkly,
                  { x: 190, y: 15 },
                  text.b_opponent_glyde.epiphaNOPE,
                  () => void (speech.emoters.glyde.index = index)
               );
            }
         },
         pretalk (state) {
            if (state.vars.secreted || state.vars.itemcount === 2) {
               state.pacify = true;
               return;
            }
            let itemTalk = false;
            const talkText = [] as string[];
            if (state.vars.itemcount === 1 && !state.vars.intermediateItem) {
               itemTalk = true;
               state.vars.intermediateItem = true;
               talkText.push(...text.b_opponent_glyde.fightItem1(state.vars.turns === 0));
            }
            switch (state.vars.turns) {
               case 0:
                  if (state.vars.checked) {
                     talkText.push(...text.b_opponent_glyde.turn1d);
                  } else if (state.vars.flirted) {
                     talkText.push(...text.b_opponent_glyde.turn1c);
                  } else if (state.hurt) {
                     talkText.push(...text.b_opponent_glyde.turn1b());
                  } else if (!itemTalk) {
                     talkText.push(...text.b_opponent_glyde.turn1a());
                  }
                  talkText.push(...text.b_opponent_glyde.turn1e);
                  state.status = () => () => text.b_opponent_glyde.turnStatus1;
                  break;
               case 1:
                  talkText.push(...text.b_opponent_glyde.turn2);
                  state.status = () => () => text.b_opponent_glyde.turnStatus2;
                  break;
               case 2:
                  talkText.push(...text.b_opponent_glyde.turn3);
                  state.status = () => () => text.b_opponent_glyde.turnStatus3;
                  break;
               case 3:
                  talkText.push(...text.b_opponent_glyde.turn4);
                  state.status = () => () => text.b_opponent_glyde.turnStatus4;
                  break;
               case 4:
                  talkText.push(...text.b_opponent_glyde.turn5());
                  state.status = () => () => text.b_opponent_glyde.turnStatus5;
                  break;
               case 5:
                  talkText.push(...text.b_opponent_glyde.turn6a);
                  break;
            }
            state.talk = talkText;
         },
         postfight (state) {
            state.dead && (SAVE.data.b.killed_glyde = true);
         },
         posttalk (state) {
            if (state.vars.turns === 5) {
               speech.emoters.glyde.index = 7;
            }
         },
         prestatus (state) {
            battler.hurt.includes(state.volatile) && (state.status = () => () => text.b_opponent_glyde.hurtStatus);
         },
         async poststatus (state) {
            const container = state.volatile.container;
            const quizzer = container.metadata.ar as CosmosAnimation | void;
            const body = container.objects[0] as CosmosObject;
            const quizzerBody = container.metadata.arBody as CosmosAnimation | void;
            if (state.vars.secreted) {
               await battler.monster(
                  false,
                  { x: 195, y: 13 },
                  battler.bubbles.twinkly,
                  ...(state.vars.itemcount === 1
                     ? text.b_opponent_glyde.fightEnder1
                     : text.b_opponent_glyde.fightEnder2),
                  ...text.b_opponent_glyde.fightEnder3
               );
               SAVE.data.b.spared_glyde = true;
               state.volatile.sparable = true;
               battler.spare();
               return;
            } else if (state.vars.itemcount === 2) {
               await battler.monster(
                  false,
                  { x: 195, y: 13 },
                  battler.bubbles.twinkly,
                  ...text.b_opponent_glyde.fightItem2()
               );
               await body.position.step(renderer, 5, { x: -80 });
               SAVE.data.b.spared_glyde = true;
               state.volatile.sparable = true;
               battler.spare();
               return;
            } else if (state.vars.turns === 4) {
               if (!world.badder_lizard) {
                  quizzer!.index = 6;
                  await quizzerBody!.position.step(renderer, 4, { x: 10 });
                  await state.vars.rtext(false, quizzerBody!, ...text.b_opponent_glyde.turn5a);
                  await renderer.pause(850);
                  header('x1').then(() => (quizzer!.index = 23));
                  await battler.monster(
                     false,
                     { x: 195, y: 13 },
                     battler.bubbles.twinkly,
                     ...text.b_opponent_glyde.turn5b
                  );
                  await renderer.pause(350);
                  quizzerBody!.position.step(renderer, 3, { x: -25 });
                  await renderer.pause(850);
                  await battler.monster(
                     false,
                     { x: 195, y: 13 },
                     battler.bubbles.twinkly,
                     ...text.b_opponent_glyde.turn5c
                  );
               }
            } else if (state.vars.turns === 5) {
               battler.music?.stop();
               await renderer.pause(100);
               const yarrrrn = new CosmosAnimation({
                  active: true,
                  anchor: { x: (12 / 69) * 2 - 1, y: 0 },
                  position: { x: 300, y: 80 },
                  resources: content.ibbYarn
               });
               battler.overlay.attach(yarrrrn);
               renderer.pause(450).then(() => {
                  speech.emoters.glyde.index = 11;
                  battler.monster(true, { x: 195, y: 13 }, battler.bubbles.twinkly, ...text.b_opponent_glyde.turn6b);
               });
               body.metadata.factor.modulate(renderer, 1000, 0, 0);
               let flash = 0;
               while (flash++ < 8) {
                  yarrrrn.alpha.value = 0;
                  await renderer.pause(50);
                  yarrrrn.alpha.value = 1;
                  await renderer.pause(50);
               }
               sounds.arrow.instance(renderer);
               await yarrrrn.position.modulate(renderer, 300, { x: 160 });
               body.alpha.value = 0;
               sounds.strike.instance(renderer);
               battler.overlay.detach(yarrrrn);
               typer.reset(true);
               const bodyx = new CosmosAnimation({
                  resources: content.ibcGlydeHurt,
                  anchor: { x: (61 / 122) * 2 - 1, y: (65 / 102) * 2 - 1 },
                  position: { x: 160, y: 80 },
                  metadata: { size: { y: 95 } },
                  priority: 2
               }).on('tick', function () {
                  this.alpha.value !== 0 && (quickshadow(this, this).priority.value = 1);
               });
               renderer.attach('menu', bodyx);
               await Promise.all([
                  bodyx.rotation.modulate(renderer, 600, -180),
                  bodyx.position.modulate(renderer, 600, { x: -80 })
               ]);
               renderer.detach('menu', bodyx);
               const bpants = new CosmosAnimation({
                  anchor: { x: 0, y: 1 },
                  position: { x: 360, y: 123 },
                  resources: content.ibcBurgerpantsBody,
                  index: 12
               });
               renderer.attach('menu', bpants);
               battler.garbage.push([ 'menu', bpants ]);
               await renderer.pause(850);
               await bpants.position.modulate(renderer, 1600, { x: 160 });
               speech.emoters.bpants = bpants;
               battler.music = music.wrongenemy.instance(renderer);
               battler.music.rate.value = 0.75;
               await battler.monster(
                  false,
                  { x: bpants.position.x - 23, y: 20 },
                  battler.bubbles.twinkly2,
                  ...text.b_opponent_glyde.turn6c()
               );
               await renderer.pause(450);
               speech.emoters.bpants.index = 6;
               await renderer.pause(650);
               await bpants.position.modulate(renderer, 1000, { x: 265 });
               const metta = battler.volatile[battler.add(opponents.mettaton1, { x: -50, y: 115 })];
               metta.vars.armRezo = content.ibcMettatonArmsWhatevs;
               const mettaBody = metta.container.objects[0];
               const mettamover = mettaBody.metadata.mettamover as {
                  wobble: CosmosValue;
                  idealX: number;
               };
               mettamover.idealX = 70;
               if (!world.badder_lizard) {
                  quizzer!.index = 0;
                  quizzerBody!.position.step(renderer, 3, { x: 15 });
               }
               await renderer.pause(1250);
               await battler.monster(
                  false,
                  { x: 108, y: 35 },
                  battler.bubbles.twinkly,
                  ...text.b_opponent_glyde.turn6d
               );
               await renderer.pause(350);
               await battler.monster(
                  false,
                  { x: bpants.position.x - 23, y: 20 },
                  battler.bubbles.twinkly2,
                  ...text.b_opponent_glyde.turn6e()
               );
               await renderer.pause(850);
               metta.vars.armRezo = content.ibcMettatonArmsThonk;
               await battler.monster(
                  false,
                  { x: 108, y: 35 },
                  battler.bubbles.twinkly,
                  ...text.b_opponent_glyde.turn6f()
               );
               await renderer.pause(650);
               await battler.monster(
                  false,
                  { x: bpants.position.x - 23, y: 20 },
                  battler.bubbles.twinkly2,
                  ...text.b_opponent_glyde.turn6g
               );
               metta.vars.armRezo = content.ibcMettatonArmsNoticard;
               await battler.monster(
                  false,
                  { x: 108, y: 35 },
                  battler.bubbles.twinkly,
                  ...text.b_opponent_glyde.turn6h
               );
               await renderer.pause(650);
               bpants.index = 10;
               battler.music.stop();
               await renderer.pause(850);
               bpants.position.step(renderer, 7, { x: 360 });
               await renderer.pause(1150);
               events.fire('exit');
               return;
            }
            await battler.resume(async () => {
               await standardSize({ x: 100, y: 100 }, true);
               battler.SOUL.position.set(160);
               battler.SOUL.alpha.value = 1;
               patterns.glyde();
               await battler.turnTimer(10000);
               battler.SOUL.alpha.value = 0;
               await resetBox(true);
            });
            // after all
            state.vars.turns++;
         }
      }),
      sprite (v) {
         let siner = 0;
         let ticks = 0;
         const wingLeft = new CosmosSprite({ frames: [ content.ibcGlydeWingLeft ], anchor: 1, offsets: [ { x: -4 } ] });
         const body = new CosmosAnimation({ resources: content.ibcGlydeBody, index: v.sparable ? 5 : 0 });
         const wingRight = new CosmosSprite({ frames: [ content.ibcGlydeWingRight ], anchor: { x: -1, y: 1 } });
         const antenna = new CosmosSprite({
            frames: [ content.ibcGlydeAntenna ],
            anchor: { x: -0.55, y: 0.15 },
            offsets: [ { x: 8, y: 2 } ]
         });
         function display (spr: CosmosSprite, x: number, y: number, scaX: number, scaY: number, rot: number) {
            spr.position.set(x, y);
            spr.scale.set(scaX, scaY);
            spr.rotation.value = -rot;
         }
         return new CosmosSprite({
            objects: [ wingRight, body, wingLeft, antenna ],
            metadata: { factor: new CosmosValue(1) },
            position: { x: 5 },
            scale: 0.5
         }).on('tick', function () {
            ticks++;
            siner += Math.cos(ticks / 24) * 2;
            this.offsets[0].y = Math.sin(siner / 12) * 8 * this.metadata.factor.value;
            const mod1 = Math.sin(siner / 6);
            const mod2 = Math.sin(siner / 12);
            display(
               wingRight,
               -7,
               -6 + mod1 * 2 * this.metadata.factor.value,
               2,
               2 - mod1 * 0.15 * this.metadata.factor.value,
               0
            );
            display(body, -53, -112, 2, 2, 0);
            display(
               wingLeft,
               29,
               62,
               CosmosMath.remap(this.metadata.factor.value, 2, 1.95 + mod1 * 0.05),
               2 - mod1 * 0.1 * this.metadata.factor.value,
               0
            );
            display(
               antenna,
               -1 + mod2 * 2 * this.metadata.factor.value,
               -108,
               2,
               2,
               (2 - mod2 * 12) * this.metadata.factor.value
            );
            speech.emoters.glyde = body;
         });
      },
      goodbye: () =>
         new CosmosAnimation({
            resources: content.ibcGlydeHurt,
            anchor: { x: (61 / 122) * 2 - 1, y: (65 / 102) * 2 - 1 },
            metadata: { size: { y: 95 } }
         })
   }),
   burgie: new OutertaleOpponent({
      assets: new CosmosInventory(content.ibcBurgerpantsBody),
      flirted: () => SAVE.data.n.bully < 30 && 20 <= world.flirt,
      sprite (volatile) {
         return new CosmosAnimation({
            anchor: { x: 0, y: 1 },
            resources: content.ibcBurgerpantsBody,
            index: volatile.sparable ? 11 : 5
         });
      }
   }),
   pyrope: new OutertaleOpponent({
      flirted: () => SAVE.data.b.flirt_pyrope,
      assets: new CosmosInventory(
         content.ibbPyropefire,
         content.ibbRope,
         content.ibbPyropebomb,
         content.ibbPyropebom,
         content.asBomb,
         content.ibcPyropeRing,
         content.ibcPyropeDrip,
         content.ibcPyropeHead,
         content.ibcPyropeHurt
      ),
      bullied: () => SAVE.data.b.bullied_pyrope,
      bullyable: true,
      bully: () => {
         SAVE.data.b.bullied_pyrope = true;
         world.bully();
      },
      g: 56,
      hp: 110,
      df: 1,
      exp: 80,
      name: () => text.b_opponent_pyrope.name,
      metadata: { automusic: true },
      acts: () => [
         [
            'check',
            v =>
               world.goatbro
                  ? text.b_opponent_pyrope.act_check()
                  : battler.hurt.includes(v)
                  ? text.b_opponent_pyrope.act_check2
                  : v.sparable
                  ? text.b_opponent_pyrope.act_check3
                  : v.flirted
                  ? text.b_opponent_pyrope.act_check4
                  : text.b_opponent_pyrope.act_check()
         ],
         [
            'rap',
            ({ vars }) =>
               [ text.b_opponent_pyrope.rapText1, text.b_opponent_pyrope.rapText2, text.b_opponent_pyrope.rapText3 ][
                  vars.charge ?? 0
               ]
         ],
         [
            'spark',
            ({ vars }) =>
               [
                  text.b_opponent_pyrope.sparkText1,
                  text.b_opponent_pyrope.sparkText2,
                  text.b_opponent_pyrope.sparkText3
               ][vars.charge ?? 0]
         ],
         [ 'diss', text.b_opponent_pyrope.act_diss ],
         [ 'flirt', text.b_opponent_pyrope.act_flirt ]
      ],
      sparable: false,
      handler: battler.opponentHandler({
         kill: () => world.kill(),
         defaultStatus: ({ vars }) =>
            [
               world.goatbro
                  ? () => text.b_opponent_pyrope.genoStatus
                  : [
                       () => text.b_opponent_pyrope.status1,
                       () => text.b_opponent_pyrope.status2,
                       () => text.b_opponent_pyrope.status3,
                       () => text.b_opponent_pyrope.status4,
                       () => text.b_opponent_pyrope.status5
                    ],

               world.goatbro
                  ? () => text.b_opponent_pyrope.genoStatus
                  : [
                       () => text.b_opponent_pyrope.sparkStatus1A,
                       () => text.b_opponent_pyrope.sparkStatus2A,
                       () => text.b_opponent_pyrope.sparkStatus3A
                    ],

               world.goatbro
                  ? () => text.b_opponent_pyrope.genoSpareStatus
                  : [
                       () => text.b_opponent_pyrope.sparkStatus1B,
                       () => text.b_opponent_pyrope.sparkStatus2B,
                       () => text.b_opponent_pyrope.sparkStatus3B
                    ]
            ][vars.charge],
         defaultTalk: ({ vars }) =>
            [
               [
                  text.b_opponent_pyrope.idleTalk1,
                  text.b_opponent_pyrope.idleTalk2,
                  text.b_opponent_pyrope.idleTalk3,
                  text.b_opponent_pyrope.idleTalk4,
                  text.b_opponent_pyrope.idleTalk5
               ],
               [
                  text.b_opponent_pyrope.sparkTalk1A,
                  text.b_opponent_pyrope.sparkTalk2A,
                  text.b_opponent_pyrope.sparkTalk3A
               ],
               [
                  text.b_opponent_pyrope.sparkTalk1B,
                  text.b_opponent_pyrope.sparkTalk2B,
                  text.b_opponent_pyrope.sparkTalk3B
               ]
            ][vars.charge],
         bubble: pos => [ pos.add(22, -92), battler.bubbles.dummy ],
         vars: { charge: 0 },
         item: {
            async epiphany (state) {
               state.talk = [];
               await epiphany(
                  state.target,
                  state.volatile,
                  160,
                  {
                     befriend: () => (SAVE.data.b.spared_pyrope = true),
                     flirt: () => (SAVE.data.b.flirt_pyrope = true)
                  },
                  battler.bubbles.dummy,
                  () => state.volatile.container.position.add(22, -92),
                  text.b_opponent_pyrope.epiphany
               );
            }
         },
         act: {
            flirt (state) {
               SAVE.data.b.flirt_pyrope = true;
               state.volatile.flirted = true;
               state.talk = [
                  text.b_opponent_pyrope.flirtTalk,
                  text.b_opponent_pyrope.sparkFlirtTalkA,
                  text.b_opponent_pyrope.sparkFlirtTalkB
               ][state.vars.charge];
            },
            spark (state) {
               if (state.vars.charge < 2 && ++state.vars.charge === 2) {
                  state.pacify = true;
                  SAVE.data.b.spared_pyrope = true;
               }
            },
            diss (state) {
               state.talk = [
                  text.b_opponent_pyrope.dissTalk1,
                  text.b_opponent_pyrope.dissTalk2,
                  text.b_opponent_pyrope.dissTalk3
               ][state.vars.charge];
            }
         },
         prestatus (state) {
            battler.hurt.includes(state.volatile) && (state.status = () => () => text.b_opponent_pyrope.hurtStatus());
         }
      }),
      sprite () {
         const time = renderer.time;
         return new CosmosSprite({
            position: { y: -50 },
            objects: [
               ...CosmosUtils.populate(6, index =>
                  new CosmosAnimation({ anchor: { x: 0 }, index, resources: content.ibcPyropeRing }).on(
                     'tick',
                     function () {
                        const d = -8 - (index + 0.5) * 1.5;
                        this.offsets[0].y = -Math.abs(sineWaver(time, 2000, d, -d, -0.05 - index * 0.005));
                     }
                  )
               ),
               ...CosmosUtils.populate(2, index =>
                  new CosmosSprite({
                     anchor: new CosmosPoint(5.5, 5).divide(22, 13).multiply(2).subtract(1),
                     scale: { x: [ 1, -1 ][index] },
                     position: { x: 6.5 * [ 1, -1 ][index], y: 43 },
                     frames: [ content.ibcPyropeDrip ]
                  }).on('tick', function () {
                     this.offsets[0].y = -Math.abs(sineWaver(time, 2000, -8, 8));
                     this.rotation.value = Math.abs(sineWaver(time, 2000, 25, -25)) * this.scale.x;
                  })
               ),
               new CosmosAnimation({
                  active: true,
                  anchor: 0,
                  position: { y: -16 },
                  resources: content.ibcPyropeHead
               }).on('tick', function () {
                  const d = -8 - 6.5 * 1.5;
                  this.offsets[0].y = -Math.abs(sineWaver(time, 2000, d, -d, -0.05 - 6.5 * 0.005));
                  this.rotation.value = sineWaver(time, 2000 / 1.5, -4, 4, 1 / 8);
               })
            ]
         });
      },
      goodbye () {
         return new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcPyropeHurt ] });
      }
   }),
   tsundere: new OutertaleOpponent({
      flirted: () => SAVE.data.b.flirt_tsundere,
      assets: new CosmosInventory(
         content.ibcTsundereBody,
         content.ibcTsundereExhaust,
         content.ibcTsundereBlush,
         content.ibcTsundereHurt,
         content.ibbVertship,
         content.asBell,
         content.asDeeploop2,
         content.asStab,
         content.ibbFrogstar,
         content.asBoom
      ),
      bullied: () => SAVE.data.b.bullied_tsundere,
      bullyable: true,
      bully: () => {
         SAVE.data.b.bullied_tsundere = true;
         world.bully();
      },
      g: 68,
      hp: 80,
      df: 6,
      exp: 95,
      name: () => text.b_opponent_tsundere.name,
      metadata: { automusic: true },
      acts: () => [
         [
            'check',
            v =>
               world.goatbro
                  ? text.b_opponent_tsundere.act_check()
                  : battler.hurt.includes(v)
                  ? text.b_opponent_tsundere.act_check2
                  : battler.alive.filter(w => w !== v && w.flirted).length > 0
                  ? text.b_opponent_tsundere.act_check4
                  : v.flirted
                  ? text.b_opponent_tsundere.act_check3
                  : v.sparable
                  ? text.b_opponent_tsundere.act_check5
                  : text.b_opponent_tsundere.act_check()
         ],
         [
            'activate',
            ({ vars }) =>
               [
                  text.b_opponent_tsundere.upgradeText1,
                  text.b_opponent_tsundere.upgradeText2,
                  text.b_opponent_tsundere.upgradeText3,
                  text.b_opponent_tsundere.upgradeText4
               ][vars.upgrade ?? 0]
         ],
         [ 'siphon', text.b_opponent_tsundere.stealText ],
         [ 'ignore', text.b_opponent_tsundere.act_ignore ],
         [
            'flirt',
            () =>
               [
                  text.b_opponent_tsundere.flirtText1,
                  text.b_opponent_tsundere.flirtText2,
                  text.b_opponent_tsundere.flirtText3,
                  text.b_opponent_tsundere.flirtText4,
                  text.b_opponent_tsundere.flirtText5,
                  text.b_opponent_tsundere.flirtText6,
                  text.b_opponent_tsundere.flirtText7,
                  text.b_opponent_tsundere.flirtText8,
                  text.b_opponent_tsundere.flirtText9,
                  text.b_opponent_tsundere.flirtText10,
                  text.b_opponent_tsundere.flirtText11,
                  text.b_opponent_tsundere.flirtText12
               ][rng.dialogue.int(12)]
         ]
      ],
      sparable: false,
      handler: battler.opponentHandler({
         kill: () => world.kill(),
         defaultStatus: () => [
            () => text.b_opponent_tsundere.status1(),
            () => text.b_opponent_tsundere.status2(),
            () => text.b_opponent_tsundere.status3(),
            () => text.b_opponent_tsundere.status4(),
            () => text.b_opponent_tsundere.status5()
         ],
         defaultTalk: ({ volatile: v }) =>
            battler.alive.filter(w => w !== v && w.flirted).length > 0
               ? [
                    text.b_opponent_tsundere.jellyTalk1,
                    text.b_opponent_tsundere.jellyTalk2,
                    text.b_opponent_tsundere.jellyTalk3
                 ]
               : [
                    text.b_opponent_tsundere.idleTalk1,
                    text.b_opponent_tsundere.idleTalk2,
                    text.b_opponent_tsundere.idleTalk3,
                    text.b_opponent_tsundere.idleTalk4,
                    text.b_opponent_tsundere.idleTalk5
                 ],
         bubble: pos => [ pos.add(30, -52), battler.bubbles.dummy ],
         vars: { upgrade: 0, greenmode: false },
         preact (s) {
            s.vars.greenmode = false;
         },
         item: {
            async epiphany (state) {
               state.talk = [];
               await epiphany(
                  state.target,
                  state.volatile,
                  160,
                  {
                     befriend: () => (SAVE.data.b.spared_tsundere = true),
                     flirt: () => (SAVE.data.b.flirt_tsundere = true)
                  },
                  battler.bubbles.dummy,
                  () => state.volatile.container.position.add(22, -54),
                  text.b_opponent_tsundere.epiphany
               );
            }
         },
         act: {
            flirt (state) {
               state.talk = [
                  text.b_opponent_tsundere.flirtTalk1,
                  text.b_opponent_tsundere.flirtTalk2,
                  text.b_opponent_tsundere.flirtTalk3,
                  text.b_opponent_tsundere.flirtTalk4
               ][state.vars.upgrade];
               if (state.vars.upgrade === 3) {
                  SAVE.data.b.flirt_tsundere = true;
                  state.volatile.flirted = true;
               }
            },
            activate (state) {
               if (state.vars.upgrade < 3) {
                  state.talk = [
                     text.b_opponent_tsundere.upgradeTalk1,
                     text.b_opponent_tsundere.upgradeTalk2,
                     text.b_opponent_tsundere.upgradeTalk3
                  ][state.vars.upgrade];
                  state.status = () => [
                     () => text.b_opponent_tsundere.upgradeStatus1(),
                     () => text.b_opponent_tsundere.upgradeStatus2(),
                     () => text.b_opponent_tsundere.upgradeStatus3()
                  ];
                  if (++state.vars.upgrade === 2) {
                     state.pacify = true;
                     SAVE.data.b.spared_tsundere = true;
                  }
                  state.volatile.container.objects[0].metadata.blushFactor = state.vars.upgrade / 3;
               }
            },
            siphon (state) {
               state.vars.greenmode = true;
               state.talk = [
                  text.b_opponent_tsundere.stealTalk1,
                  text.b_opponent_tsundere.stealTalk2,
                  text.b_opponent_tsundere.stealTalk3
               ];
            },
            ignore (state) {
               state.talk = [ text.b_opponent_tsundere.ignoreTalk1, text.b_opponent_tsundere.ignoreTalk2 ];
            }
         },
         prestatus (state) {
            if (battler.hurt.includes(state.volatile)) {
               state.status = () => () => text.b_opponent_tsundere.hurtStatus();
            } else if (state.volatile.sparable) {
               state.status = () => () => text.b_opponent_tsundere.status6();
            }
         }
      }),
      sprite () {
         return new CosmosSprite({
            metadata: { blushFactor: 0, ticks: 0 },
            objects: [
               new CosmosObject({ position: -30 }),
               new CosmosSprite({
                  anchor: { x: 0, y: 1 },
                  frames: [ content.ibcTsundereBody ],
                  objects: [
                     new CosmosAnimation({
                        active: true,
                        anchor: 0,
                        resources: content.ibcTsundereBlush,
                        position: { x: 23, y: -9 }
                     })
                  ],
                  metadata: { time: renderer.time }
               }).on('tick', function () {
                  this.position.y = CosmosMath.bezier(sineWaver(this.metadata.time, 1500, 0, 1), -1, -1, 1);
               })
            ]
         }).on('tick', function () {
            this.objects[1].objects[0].alpha.value = this.metadata.blushFactor;
            if (this.metadata.ticks-- === 0) {
               this.metadata.ticks = 4;
               const exhaustContainer = this.objects[0];
               exhaustContainer.attach(
                  new CosmosSprite({
                     frames: [ content.ibcTsundereExhaust ],
                     velocity: { x: -2, y: -1 },
                     metadata: { ticks: 0 },
                     position: this.objects[1],
                     anchor: 0
                  }).on('tick', async function () {
                     switch (++this.metadata.ticks) {
                        case 2:
                           this.scale.modulate(renderer, 1000, 0.5);
                           break;
                        case 5:
                           await this.alpha.modulate(renderer, 500, 0);
                           exhaustContainer.detach(this);
                           break;
                     }
                  })
               );
            }
         });
      },
      goodbye () {
         return new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcTsundereHurt ] });
      }
   }),
   perigee: new OutertaleOpponent({
      flirted: () => SAVE.data.b.flirt_perigee,
      assets: new CosmosInventory(
         content.ibcPerigeeBody,
         content.ibcPerigeeHurt,
         content.ibbBird,
         content.ibbFeather,
         content.ibbBirdfront
      ),
      bullied: () => SAVE.data.b.bullied_perigee,
      bullyable: true,
      bully: () => {
         SAVE.data.b.bullied_perigee = true;
         world.bully();
      },
      g: 1,
      hp: 20,
      df: -10,
      exp: 70,
      name: () => text.b_opponent_perigee.name,
      acts: () => [
         [
            'check',
            v =>
               world.goatbro
                  ? text.b_opponent_perigee.act_check()
                  : battler.hurt.includes(v)
                  ? text.b_opponent_perigee.act_check2
                  : v.sparable
                  ? text.b_opponent_perigee.act_check3
                  : v.flirted
                  ? text.b_opponent_perigee.act_check4
                  : text.b_opponent_perigee.act_check()
         ],
         [
            'bow',
            ({ vars }) =>
               vars.flirt || vars.whistle ? text.b_opponent_perigee.act_bow2 : text.b_opponent_perigee.act_bow1
         ],
         [ 'whistle', text.b_opponent_perigee.act_whistle ],
         [ 'shout', text.b_opponent_perigee.act_yell ],
         [ 'flirt', text.b_opponent_perigee.act_flirt ]
      ],
      sparable: false,
      handler: battler.opponentHandler({
         kill: () => world.kill(),
         defaultStatus: state =>
            state.volatile.sparable
               ? () => text.b_opponent_perigee.status6()
               : world.genocide
               ? () => text.b_opponent_perigee.genoStatus
               : [
                    () => text.b_opponent_perigee.status1,
                    () => text.b_opponent_perigee.status2,
                    () => text.b_opponent_perigee.status3,
                    () => text.b_opponent_perigee.status4,
                    () => text.b_opponent_perigee.status5
                 ],
         defaultTalk: () => [
            text.b_opponent_perigee.idleTalk1,
            text.b_opponent_perigee.idleTalk2,
            text.b_opponent_perigee.idleTalk3,
            text.b_opponent_perigee.idleTalk4,
            text.b_opponent_perigee.idleTalk5
         ],
         bubble: pos => [ pos.add(22, -54), battler.bubbles.dummy ],
         vars: { whistle: false, flirt: false },
         item: {
            async epiphany (state) {
               state.talk = [];
               await epiphany(
                  state.target,
                  state.volatile,
                  160,
                  {
                     befriend: () => (SAVE.data.b.spared_perigee = true),
                     flirt: () => (SAVE.data.b.flirt_perigee = true)
                  },
                  battler.bubbles.dummy,
                  () => state.volatile.container.position.add(22, -54),
                  text.b_opponent_perigee.epiphany
               );
            }
         },
         preact (state) {
            if (state.choice.type !== 'act' || state.choice.act !== 'bow') {
               state.vars.flirt = false;
               state.vars.whistle = false;
            }
         },
         act: {
            flirt (state) {
               state.talk = text.b_opponent_perigee.flirtTalk;
               state.vars.flirt = true;
            },
            whistle (state) {
               state.talk = text.b_opponent_perigee.whistleTalk;
               state.status = () => () => text.b_opponent_perigee.whistleStatus();
               state.vars.whistle = true;
            },
            bow (state) {
               if (state.vars.flirt) {
                  state.talk = text.b_opponent_perigee.flirtTalkX;
                  SAVE.data.b.flirt_perigee = true;
                  state.volatile.flirted = true;
                  state.pacify = true;
                  SAVE.data.b.spared_perigee = true;
               } else if (state.vars.whistle) {
                  state.talk = text.b_opponent_perigee.whistleTalkX;
                  state.pacify = true;
                  SAVE.data.b.spared_perigee = true;
               }
               state.vars.flirt = false;
               state.vars.whistle = false;
            },
            shout (state) {
               state.talk = state.vars.whistle
                  ? text.b_opponent_perigee.yellTalk3
                  : [ text.b_opponent_perigee.yellTalk1, text.b_opponent_perigee.yellTalk2 ];
            }
         },
         prestatus (state) {
            battler.hurt.includes(state.volatile) && (state.status = () => () => text.b_opponent_perigee.hurtStatus());
         }
      }),
      sprite () {
         return new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.ibcPerigeeBody, active: true });
      },
      goodbye () {
         return new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcPerigeeHurt ] });
      }
   }),
   madjick: new OutertaleOpponent({
      flirted: () => SAVE.data.b.flirt_madjick,
      assets: new CosmosInventory(
         content.ibbOrb,
         content.ibbWhitelightning,
         content.ibcMadjickBoot,
         content.ibcMadjickCape,
         content.ibcMadjickLapel,
         content.ibcMadjickHat,
         content.ibcMadjickHead,
         content.ibcMadjickDress,
         content.ibcMadjickHurt,
         content.ibbFrogstar,
         content.ibcMadjickOrb,
         content.asLightningstrike,
         content.asAppear,
         content.ibbArccircle,
         content.amMadjickSting,
         content.ibbStardrop,
         content.asSpiderLaugh
      ),
      g: 125,
      hp: 190,
      df: -1,
      exp: 150,
      name: () => text.b_opponent_madjick.name,
      hurt: sounds.spiderLaugh,
      acts: () => [
         [
            'check',
            v =>
               !world.badder_lizard
                  ? text.b_opponent_madjick.act_check()
                  : battler.hurt.includes(v)
                  ? text.b_opponent_madjick.act_check2
                  : [
                       text.b_opponent_madjick.act_check(),
                       text.b_opponent_madjick.act_check5,
                       text.b_opponent_madjick.act_check3,
                       text.b_opponent_madjick.act_check4
                    ][v.vars.result ?? 0]
         ],
         [
            'playdead',
            ({ vars }) =>
               vars.result ? text.b_opponent_madjick.playdeadText2 : text.b_opponent_madjick.playdeadText1()
         ],
         [
            'dance',
            ({ vars }) =>
               vars.result
                  ? vars.result === 3
                     ? text.b_opponent_madjick.danceText4
                     : text.b_opponent_madjick.danceText3
                  : [ text.b_opponent_madjick.danceText1, text.b_opponent_madjick.danceText2() ][vars.danceProgress || 0]
         ],
         [
            'flirt',
            ({ vars }) =>
               (world.flirt < 15
                  ? text.b_opponent_madjick.flirtText0
                  : vars.result
                  ? text.b_opponent_madjick.flirtText3
                  : [ text.b_opponent_madjick.flirtText1, text.b_opponent_madjick.flirtText2 ][vars.flirtProgress || 0])()
         ]
      ],
      metadata: { reactOld: true, reactArtifact: true, reactSpanner: true },
      handler: battler.opponentHandler({
         kill () {
            SAVE.data.b.killed_madjick = true;
         },
         vars: { result: 0, flirtProgress: 0, danceProgress: 0, attacktype: 0, crazy: false, instaSpare: false },
         defaultStatus: () => [
            () => text.b_opponent_madjick.idleStatus1(),
            () => text.b_opponent_madjick.idleStatus2(),
            () => text.b_opponent_madjick.idleStatus3(),
            () => text.b_opponent_madjick.idleStatus4(),
            () => text.b_opponent_madjick.idleStatus5()
         ],
         defaultTalk: () => [
            text.b_opponent_madjick.idleTalk1,
            text.b_opponent_madjick.idleTalk2,
            text.b_opponent_madjick.idleTalk3,
            text.b_opponent_madjick.idleTalk4,
            text.b_opponent_madjick.idleTalk5
         ],
         bubble: pos => [ pos.add(25, -85), battler.bubbles.twinkly ],
         async assist (state) {
            game.music && (game.music.gain.value = 0);
            await state.dialogue(false, ...text.b_opponent_madjick.assistTalk1);
            const overlay = fader({ priority: 2000 });
            await overlay.alpha.modulate(renderer, 1350, 1);
            await renderer.pause(1350);
            atlas.switch('dialoguerBottom');
            atlas.navigators.of('dialoguerBottom').objects[0].priority.value = 2001;
            music.madjickSting.instance(renderer);
            await typer.text(...text.b_opponent_madjick.assistAction);
            atlas.navigators.of('dialoguerBottom').objects[0].priority.value = 0;
            atlas.switch(null);
            game.music?.gain.modulate(renderer, 1350, world.level);
            await overlay.alpha.modulate(renderer, 1350, 0);
            renderer.detach('menu', overlay);
            await renderer.pause(1000);
            await state.dialogue(false, ...text.b_opponent_madjick.assistTalk2);
            state.vars.instaSpare = true;
            state.pacify = true;
            SAVE.data.b.spared_madjick = true;
            SAVE.data.b.assist_madjick = true;
            state.talk = [];
         },
         prechoice (state) {
            state.vars.attacktype = state.vars.result < 1 ? 0 : 3;
            state.vars.crazy = false;
         },
         preact (state) {
            switch (state.vars.result) {
               case 1:
                  state.talk = [
                     text.b_opponent_madjick.flirtIdleTalk1,
                     text.b_opponent_madjick.flirtIdleTalk2,
                     text.b_opponent_madjick.flirtIdleTalk3
                  ][rng.dialogue.int(3)];
                  state.status = () => () => text.b_opponent_madjick.playdeadStatus();
                  break;
               case 2:
                  state.talk = [
                     text.b_opponent_madjick.danceIdleTalk1,
                     text.b_opponent_madjick.danceIdleTalk2,
                     text.b_opponent_madjick.danceIdleTalk3
                  ][rng.dialogue.int(3)];
                  state.status = () => () => text.b_opponent_madjick.danceStatus3();
                  break;
               case 3:
                  state.talk = [
                     text.b_opponent_madjick.playdeadIdleTalk1,
                     text.b_opponent_madjick.playdeadIdleTalk2,
                     text.b_opponent_madjick.playdeadIdleTalk3
                  ][rng.dialogue.int(3)];
                  state.status = () => () => text.b_opponent_madjick.flirtStatus2();
                  break;
            }
         },
         act: {
            flirt (state) {
               if (!state.vars.result && !(world.flirt < 15)) {
                  SAVE.data.b.flirt_madjick = true;
                  state.volatile.flirted = true;
                  switch (++state.vars.flirtProgress) {
                     case 1:
                        state.talk = text.b_opponent_madjick.flirtTalk1;
                        state.status = () => () => text.b_opponent_madjick.flirtStatus1();
                        break;
                     case 2:
                        state.talk = text.b_opponent_madjick.flirtTalk2;
                        state.status = () => () => text.b_opponent_madjick.flirtStatus2();
                        state.vars.result = 1;
                        state.pacify = true;
                        break;
                  }
               }
            },
            dance (state) {
               let spare = false;
               if (state.vars.result === 3) {
                  state.talk = text.b_opponent_madjick.danceTalk3;
                  spare = true;
                  state.vars.instaSpare = true;
               } else if (!state.vars.result) {
                  switch (++state.vars.danceProgress) {
                     case 1:
                        state.talk = text.b_opponent_madjick.danceTalk1;
                        state.status = () => () => text.b_opponent_madjick.danceStatus1();
                        state.vars.attacktype = 1;
                        break;
                     case 2:
                        state.talk = text.b_opponent_madjick.danceTalk2;
                        state.status = () => () => text.b_opponent_madjick.danceStatus2();
                        state.vars.attacktype = 2;
                        spare = true;
                        break;
                  }
               }
               if (spare) {
                  state.vars.result = 2;
                  state.pacify = true;
                  SAVE.data.b.spared_madjick = true;
               }
            },
            playdead (state) {
               if (!state.vars.result) {
                  state.talk = text.b_opponent_madjick.playdeadTalk;
                  state.status = () => () => text.b_opponent_madjick.playdeadStatus();
                  state.vars.result = 3;
                  state.vars.crazy = true;
                  state.pacify = true;
               }
            }
         },
         item: {
            async artifact (state) {
               await battler.human(...text.b_opponent_madjick.artifact_text);
               state.talk = text.b_opponent_madjick.artifactTalk;
               state.pacify = true;
               SAVE.data.b.spared_madjick = true;
               state.vars.instaSpare = true;
            },
            async old_gun (state) {
               await battler.human(...text.b_opponent_madjick.old_gun_text);
               useOld('old_gun', state);
            },
            async old_bomb (state) {
               await battler.human(...text.b_opponent_madjick.old_bomb_text);
               useOld('old_bomb', state);
            },
            async old_spray (state) {
               await battler.human(...text.b_opponent_madjick.old_spray_text);
               useOld('old_spray', state);
            },
            async epiphany (state) {
               await epiphany(
                  state.target,
                  state.volatile,
                  state.volatile.container.position.x,
                  { result: false },
                  battler.bubbles.twinkly,
                  { x: 202, y: 11 },
                  text.b_opponent_madjick.epiphaNOPE
               );
            },
            async spanner (state) {
               await battler.human(...text.b_opponent_madjick.spanner);
            }
         },
         prestatus (state) {
            if (battler.hurt.includes(state.volatile)) {
               state.status = () => () => text.b_opponent_madjick.perilStatus();
            }
         },
         poststatus (state) {
            if (state.vars.instaSpare) {
               state.volatile.sparable = true;
               battler.spare(state.target);
            }
         }
      }),
      sprite (volatile) {
         const { sin, cos } = Math;
         function display (
            sprite: CosmosSprite,
            index: number,
            x: number,
            y: number,
            sx: number = 2,
            sy: number = 2,
            r: number = 0,
            a: number = 1
         ) {
            sprite.index = index % sprite.frames.length;
            sprite.position.set(x / 2, (y - 240) / 2);
            sprite.scale.set(sx / 2, sy / 2);
            sprite.rotation.value = -r;
            sprite.alpha.value = a;
         }
         const cape = new CosmosSprite({ anchor: { x: 0 }, frames: [ content.ibcMadjickCape ], offsets: [ { y: -8 } ] });
         const boot1 = new CosmosSprite({ anchor: { x: 0 }, frames: [ content.ibcMadjickBoot ] });
         const boot2 = new CosmosSprite({ anchor: { x: 0 }, frames: [ content.ibcMadjickBoot ] });
         const lapel1 = new CosmosSprite({
            anchor: { y: 1 },
            frames: [ content.ibcMadjickLapel ],
            offsets: [ { x: 2, y: -2 } ]
         });
         const lapel2 = new CosmosSprite({
            anchor: { y: 1 },
            frames: [ content.ibcMadjickLapel ],
            offsets: [ { x: -2, y: -2 } ]
         });
         const dress = new CosmosSprite({ anchor: { x: 0 }, frames: [ content.ibcMadjickDress ], offsets: [ { y: -8 } ] });
         const head = new CosmosSprite({ anchor: { x: -0.5, y: -0.25 }, frames: [ content.ibcMadjickHead ] });
         const hat = new CosmosSprite({
            anchor: { x: 0, y: 1 },
            frames: [ content.ibcMadjickHat ],
            offsets: [ { y: 1.5 } ]
         });
         function particlegen (this: CosmosObject) {
            if (this.metadata.gen && topsprite.parent) {
               const spr = new CosmosAnimation({
                  anchor: 0,
                  resources: content.ibbFrogstar,
                  velocity: { y: -3 },
                  position: topsprite.parent.position
                     .add(volatile.vars.superposition1 ?? {})
                     .add(volatile.vars.superposition2 ?? {})
                     .add(topsprite)
                     .add(this)
                     .add((Math.random() * 2 - 1) * 7, 0)
               }).on('tick', function () {
                  this.alpha.value *= 0.9;
                  if (this.alpha.value < 0.05) {
                     renderer.detach('menu', this);
                     battler.garbage.splice(battler.garbage.indexOf(garbo), 1);
                  }
               });
               renderer.attach('menu', spr);
               const garbo = [ 'menu', spr ] as ['menu', CosmosAnimation];
               battler.garbage.push(garbo);
            }
         }
         const orb1 = new CosmosSprite({
            active: true,
            anchor: 0,
            frames: [ content.ibcMadjickOrb ],
            metadata: { gen: true }
         }).on('tick', particlegen);
         const orb2 = new CosmosSprite({
            active: true,
            anchor: 0,
            frames: [ content.ibcMadjickOrb ],
            metadata: { gen: true }
         }).on('tick', particlegen);
         const topsprite = new CosmosSprite({
            metadata: { time: 0, orb1, orb2 },
            objects: [ cape, boot1, boot2, dress, lapel1, lapel2, head, hat, orb1, orb2 ]
         }).on('tick', function () {
            const sin5 = sin(this.metadata.time / 5);
            const cos5 = cos(this.metadata.time / 5);
            this.position.y = 47 + sin((this.metadata.time + 4) / 5) * 10;
            display(cape, 0, 0, 52 + sin5, 2, 1.9 - sin5 * 0.1);
            display(boot1, 0, -24 - sin5 * 5, 80 - sin5 * 6, 2, 2, -30 - sin5 * 8);
            display(boot2, 0, 22 + sin5 * 5, 80 - sin5 * 6, -2, 2, 30 + sin5 * 8);
            display(dress, 0, 0, 52 + sin5, 2, 1.8 - sin5 * 0.2);
            display(lapel1, 0, 0, 52 + sin5 / 2, 2, 2, -sin5 * 5);
            display(lapel2, 0, 0, 52 + sin5 / 2, -2, 2, sin5 * 5);
            display(head, 0, -6, 2 + sin5 * 8);
            display(hat, 0, 2 + cos5, 4 + sin5 * 10);
            display(orb1, 0, -62, 16 + cos5 * 5);
            display(orb2, 0, 62, 6 + cos5 * 5);
            this.metadata.time++;
         });
         return topsprite;
      },
      goodbye () {
         return new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcMadjickHurt ], position: { y: -10 } });
      }
   }),
   knightknight: new OutertaleOpponent({
      flirted: () => SAVE.data.b.flirt_knightknight,
      assets: new CosmosInventory(
         content.ibcKnightknightArmball,
         content.asAppear,
         content.ibbLightning,
         content.ibcKnightknightArmstaff,
         content.ibcKnightknightBase,
         content.ibcKnightknightDragonfur,
         content.ibcKnightknightEyes,
         content.ibcKnightknightHeadpiece,
         content.ibcKnightknightMouthpiece,
         content.ibcKnightknightHurt,
         content.ibbWave,
         content.amKnightknightSting,
         content.ibbTree,
         content.ibbPlanet,
         content.ibbWater,
         content.ibbFrogstar,
         content.asMonsterHurt1
      ),
      g: 150,
      hp: 230,
      df: 2,
      exp: 180,
      hurt: sounds.monsterHurt1,
      name: () => text.b_opponent_knightknight.name,
      acts: () => [
         [
            'check',
            v =>
               !world.badder_lizard
                  ? text.b_opponent_knightknight.act_check()
                  : battler.hurt.includes(v)
                  ? text.b_opponent_knightknight.act_check2
                  : [
                       text.b_opponent_knightknight.act_check(),
                       text.b_opponent_knightknight.act_check5,
                       text.b_opponent_knightknight.act_check3,
                       text.b_opponent_knightknight.act_check4
                    ][v.vars.result ?? 0]
         ],
         [
            'flash',
            ({ vars }) =>
               vars.result
                  ? [
                       text.b_opponent_knightknight.flashText2a,
                       text.b_opponent_knightknight.flashText2b,
                       text.b_opponent_knightknight.flashText2c
                    ][vars.result - 1]
                  : text.b_opponent_knightknight.flashText1()
         ],
         [
            'comfort',
            ({ vars }) =>
               vars.result
                  ? vars.result === 3
                     ? text.b_opponent_knightknight.comfortText4
                     : text.b_opponent_knightknight.comfortText3
                  : [ text.b_opponent_knightknight.comfortText1, text.b_opponent_knightknight.comfortText2 ][
                       vars.comfortProgress || 0
                    ]()
         ],
         [
            'flirt',
            ({ vars }) =>
               (world.flirt < 15
                  ? text.b_opponent_knightknight.flirtText0
                  : vars.result
                  ? text.b_opponent_knightknight.flirtText3
                  : [ text.b_opponent_knightknight.flirtText1, text.b_opponent_knightknight.flirtText2 ][
                       vars.flirtProgress || 0
                    ])()
         ]
      ],
      metadata: { reactOld: true, reactArtifact: true },
      handler: battler.opponentHandler({
         kill () {
            SAVE.data.b.killed_knightknight = true;
         },
         defaultStatus: () => [
            () => text.b_opponent_knightknight.idleStatus1(),
            () => text.b_opponent_knightknight.idleStatus2(),
            () => text.b_opponent_knightknight.idleStatus3(),
            () => text.b_opponent_knightknight.idleStatus4(),
            () => text.b_opponent_knightknight.idleStatus5()
         ],
         defaultTalk: () => [
            text.b_opponent_knightknight.idleTalk1,
            text.b_opponent_knightknight.idleTalk2,
            text.b_opponent_knightknight.idleTalk3,
            text.b_opponent_knightknight.idleTalk4,
            text.b_opponent_knightknight.idleTalk5
         ],
         vars: { result: 0, flirtProgress: 0, comfortProgress: 0, shakeFactor: new CosmosValue(1), instaSpare: false },
         bubble: [ { x: 202, y: 11 }, battler.bubbles.twinkly ],
         async assist (state) {
            game.music && (game.music.gain.value = 0);
            await state.dialogue(false, ...text.b_opponent_knightknight.assistTalk1);
            const overlay = fader({ priority: 2000 });
            await overlay.alpha.modulate(renderer, 1350, 1);
            await renderer.pause(1350);
            atlas.switch('dialoguerBottom');
            atlas.navigators.of('dialoguerBottom').objects[0].priority.value = 2001;
            music.knightknightSting.instance(renderer);
            await typer.text(...text.b_opponent_knightknight.assistAction);
            atlas.navigators.of('dialoguerBottom').objects[0].priority.value = 0;
            atlas.switch(null);
            game.music?.gain.modulate(renderer, 1350, world.level);
            await overlay.alpha.modulate(renderer, 1350, 0);
            renderer.detach('menu', overlay);
            await renderer.pause(1000);
            await state.dialogue(false, ...text.b_opponent_knightknight.assistTalk2);
            state.vars.instaSpare = true;
            state.pacify = true;
            SAVE.data.b.spared_knightknight = true;
            SAVE.data.b.assist_knightknight = true;
            state.talk = [];
         },
         preact (state) {
            switch (state.vars.result) {
               case 1:
                  state.talk = [
                     text.b_opponent_knightknight.flirtIdleTalk1,
                     text.b_opponent_knightknight.flirtIdleTalk2,
                     text.b_opponent_knightknight.flirtIdleTalk3
                  ];
                  state.status = () => () => text.b_opponent_knightknight.flirtStatus2();
                  break;
               case 2:
                  state.talk = [
                     text.b_opponent_knightknight.comfortIdleTalk1,
                     text.b_opponent_knightknight.comfortIdleTalk2,
                     text.b_opponent_knightknight.comfortIdleTalk3
                  ];
                  state.status = () => () => text.b_opponent_knightknight.comfortStatus3();
                  break;
               case 3:
                  state.talk = [
                     text.b_opponent_knightknight.flashIdleTalk1,
                     text.b_opponent_knightknight.flashIdleTalk2,
                     text.b_opponent_knightknight.flashIdleTalk3
                  ];
                  state.status = () => () => text.b_opponent_knightknight.flashStatus();
                  break;
            }
         },
         act: {
            flirt (state) {
               if (!state.vars.result && !(world.flirt < 15)) {
                  SAVE.data.b.flirt_knightknight = true;
                  state.volatile.flirted = true;
                  switch (++state.vars.flirtProgress) {
                     case 1:
                        state.talk = text.b_opponent_knightknight.flirtTalk1;
                        state.status = () => () => text.b_opponent_knightknight.flirtStatus1();
                        break;
                     case 2:
                        state.talk = text.b_opponent_knightknight.flirtTalk2;
                        state.status = () => () => text.b_opponent_knightknight.flirtStatus2();
                        state.vars.result = 1;
                        state.pacify = true;
                        break;
                  }
               }
            },
            comfort (state) {
               let spare = false;
               if (state.vars.result === 3) {
                  state.talk = text.b_opponent_knightknight.comfortTalk3;
                  spare = true;
                  state.vars.instaSpare = true;
               } else if (!state.vars.result) {
                  switch (++state.vars.comfortProgress) {
                     case 1:
                        state.talk = text.b_opponent_knightknight.comfortTalk1;
                        state.status = () => () => text.b_opponent_knightknight.comfortStatus1();
                        break;
                     case 2:
                        state.talk = text.b_opponent_knightknight.comfortTalk2;
                        state.status = () => () => text.b_opponent_knightknight.comfortStatus2();
                        spare = true;
                        break;
                  }
               }
               if (spare) {
                  state.vars.result = 2;
                  state.pacify = true;
                  SAVE.data.b.spared_knightknight = true;
               }
            },
            flash (state) {
               if (!state.vars.result) {
                  state.talk = text.b_opponent_knightknight.flashTalk;
                  state.status = () => () => text.b_opponent_knightknight.flashStatus();
                  state.vars.result = 3;
                  state.pacify = true;
               }
            }
         },
         item: {
            async artifact (state) {
               await battler.human(...text.b_opponent_knightknight.artifact_text);
               state.talk = text.b_opponent_knightknight.artifactTalk;
               state.pacify = true;
               SAVE.data.b.spared_knightknight = true;
               state.vars.instaSpare = true;
            },
            async old_gun (state) {
               await battler.human(...text.b_opponent_knightknight.old_gun_text);
               useOld('old_gun', state);
            },
            async old_bomb (state) {
               await battler.human(...text.b_opponent_knightknight.old_bomb_text);
               useOld('old_bomb', state);
            },
            async old_spray (state) {
               await battler.human(...text.b_opponent_knightknight.old_spray_text);
               useOld('old_spray', state);
            },
            async epiphany (state) {
               await epiphany(
                  state.target,
                  state.volatile,
                  state.volatile.container.position.x,
                  { result: false },
                  battler.bubbles.twinkly,
                  { x: 202, y: 11 },
                  text.b_opponent_knightknight.epiphaNOPE
               );
            }
         },
         prestatus (state) {
            if (battler.hurt.includes(state.volatile)) {
               state.status = () => () => text.b_opponent_knightknight.perilStatus();
            }
         },
         poststatus (state) {
            if (state.vars.instaSpare) {
               state.volatile.sparable = true;
               battler.spare(state.target);
            }
         }
      }),
      sprite (volatile) {
         return new CosmosSprite({
            objects: [
               new CosmosSprite({
                  frames: [ content.ibcKnightknightArmstaff ],
                  position: { x: -77, y: -85 },
                  objects: [
                     new CosmosAnimation({
                        active: true,
                        anchor: 0,
                        position: { x: 8, y: 62 },
                        resources: content.ibcKnightknightArmball
                     })
                  ]
               }),
               new CosmosSprite({
                  anchor: { x: 0, y: 1 },
                  frames: [ content.ibcKnightknightBase ],
                  objects: [
                     new CosmosAnimation({
                        active: true,
                        position: { x: -18, y: -66 },
                        resources: content.ibcKnightknightEyes
                     }).on('tick', {
                        priority: 200,
                        listener () {
                           if (volatile.vars.result === 3) {
                              this.extrapolate = false;
                              this.duration = Math.round(
                                 (this.resources!.data.value!.frames[this.index]!.duration / (1000 / 30)) *
                                    CosmosMath.remap(volatile.vars.shakeFactor.value, 2, 0.25)
                              );
                           }
                        }
                     }),
                     new CosmosAnimation({
                        active: true,
                        position: { x: -28, y: -55 },
                        resources: content.ibcKnightknightDragonfur
                     })
                  ]
               }),
               new CosmosAnimation({
                  position: { x: -23, y: -111 },
                  metadata: { blinkTimer: null as number | null },
                  resources: content.ibcKnightknightHeadpiece
               }).on('tick', function () {
                  if (this.active) {
                     this.index === 2 && this.reset();
                  } else if (this.metadata.blinkTimer === null) {
                     this.metadata.blinkTimer =
                        renderer.time +
                        (2 + Math.random() * 5) *
                           (volatile.vars.result === 3
                              ? CosmosMath.remap(volatile.vars.shakeFactor.value, 2000, 250)
                              : 1000);
                  } else if (renderer.time > this.metadata.blinkTimer) {
                     this.metadata.blinkTimer = null;
                     this.enable();
                  }
               }),
               new CosmosAnimation({
                  active: true,
                  position: { x: -12, y: -60 },
                  resources: content.ibcKnightknightMouthpiece
               })
            ]
         }).on('tick', function () {
            if (volatile.vars.result === 3) {
               this.offsets[0].set(
                  new CosmosPoint(volatile.vars.shakeFactor.value).multiply(
                     Math.random() * 1 - 1 / 2,
                     Math.random() * 1 - 1 / 2
                  )
               );
            }
         });
      },
      goodbye () {
         return new CosmosSprite({
            anchor: { x: 0, y: 1 },
            frames: [ content.ibcKnightknightHurt ]
         });
      }
   }),
   froggitex: new OutertaleOpponent({
      flirted: () => SAVE.data.b.flirt_froggitex,
      assets: new CosmosInventory(
         content.ibbFroglegs,
         content.ibbFrogstar,
         content.ibbFrogfly,
         content.asTwinklyHurt,
         content.asArrow,
         content.ibcFroggitexGone,
         content.ibcFroggitexHead,
         content.ibcFroggitexLegs,
         content.ibbLily,
         content.ibbTongue,
         content.ibbHypno,
         content.ibbWaterwall,
         content.ibbFrogstop
      ),
      metadata: { reactOld: true },
      bullied: () => SAVE.data.b.bullied_froggitex,
      bullyable: true,
      bully: () => {
         SAVE.data.b.bullied_froggitex = true;
         SAVE.data.n.bully++;
      },
      g: 85,
      hp: 100,
      df: 0,
      exp: 120,
      name: () => text.b_opponent_froggitex.name,
      acts: () => [
         [
            'check',
            v =>
               !world.badder_lizard
                  ? text.b_opponent_froggitex.act_check()
                  : battler.hurt.includes(v)
                  ? text.b_opponent_froggitex.act_check2
                  : v.sparable
                  ? text.b_opponent_froggitex.act_check4
                  : v.flirted
                  ? text.b_opponent_froggitex.act_check3
                  : text.b_opponent_froggitex.act_check()
         ],
         [
            'translate',
            vola =>
               vola.vars.message ? text.b_opponent_froggitex.act_translate2 : text.b_opponent_froggitex.act_translate2
         ],
         [ 'mystify', text.b_opponent_froggitex.act_mystify ],
         [ 'flirt', text.b_opponent_froggitex.act_flirt ],
         [ 'threaten', text.b_opponent_froggitex.act_threaten ]
      ],
      hurt: sounds.twinklyHurt,
      sparable: false,
      handler: battler.opponentHandler({
         kill: () => void SAVE.data.n.corekills++,
         defaultStatus: () => [
            () => text.b_opponent_froggitex.status1(),
            () => text.b_opponent_froggitex.status2(),
            () => text.b_opponent_froggitex.status3()
         ],
         defaultTalk: () => [
            text.b_opponent_froggitex.idleText1,
            text.b_opponent_froggitex.idleText2,
            text.b_opponent_froggitex.idleText3,
            text.b_opponent_froggitex.idleText4
         ],
         bubble: p => [ p.add(28, -56), battler.bubbles.dummy ],
         vars: { message: false, hit: false },
         preact (state) {
            state.vars.message = true;
         },
         act: {
            flirt (state) {
               state.talk = text.b_opponent_froggitex.flirtText;
               SAVE.data.b.flirt_froggitex = true;
               state.volatile.flirted = true;
               state.vars.message = false;
            },
            translate (state) {
               state.talk = [
                  text.b_opponent_froggitex.translateText1(),
                  text.b_opponent_froggitex.translateText2(),
                  text.b_opponent_froggitex.translateText3(),
                  text.b_opponent_froggitex.translateText4(),
                  text.b_opponent_froggitex.translateText5()
               ];
               state.status = () => () => text.b_opponent_froggitex.mercyStatus();
               SAVE.data.b.spared_froggitex = true;
               state.vars.message = false;
               state.pacify = true;
            }
         },
         item: {
            async old_gun (state) {
               await battler.human(...text.b_opponent_froggitex.old_gun_text);
               useOld('old_gun', state);
            },
            async old_bomb (state) {
               await battler.human(...text.b_opponent_froggitex.old_bomb_text);
               useOld('old_bomb', state);
            },
            async old_spray (state) {
               await battler.human(...text.b_opponent_froggitex.old_spray_text);
               useOld('old_spray', state);
            },
            async epiphany (state) {
               state.talk = [];
               await epiphany(
                  state.target,
                  state.volatile,
                  160,
                  {
                     befriend: () => (SAVE.data.b.spared_froggitex = true),
                     flirt: () => (SAVE.data.b.flirt_froggitex = true),
                     kill: () => void SAVE.data.n.corekills++
                  },
                  battler.bubbles.dummy,
                  () => state.volatile.container.position.add(28, -56),
                  text.b_opponent_froggitex.epiphany
               );
            }
         },
         prestatus (state) {
            if (world.goatbro && SAVE.data.n.plot > 66.2) {
               state.status = () => () => text.b_opponent_froggitex.genostatus;
            } else if (battler.hurt.includes(state.volatile)) {
               state.status = () => () => text.b_opponent_froggitex.perilStatus();
            }
         }
      }),
      sprite () {
         return new CosmosSprite({
            metadata: { size: { y: 55 } },
            objects: [
               new CosmosAnimation({
                  active: true,
                  anchor: { y: 1, x: 0 },
                  metadata: { t: renderer.time },
                  resources: content.ibcFroggitexLegs
               }).on('tick', function () {
                  this.scale.y = sineWaver(this.metadata.t, 1000, 1, 1.1);
                  if (this.index === 0 && Math.random() < 1 / 30 / 10) {
                     this.index = 1;
                     renderer.pause(650).then(() => {
                        this.index = 0;
                     });
                  }
               }),
               new CosmosAnimation({
                  active: true,
                  position: { x: -2, y: -20 },
                  anchor: { y: 1, x: 0 },
                  resources: content.ibcFroggitexHead,
                  metadata: { t: renderer.time }
               }).on('tick', function () {
                  this.offsets[0].set(sineWaver(this.metadata.t, 3000, -3, 3), sineWaver(this.metadata.t, 1000, 0, -3));
               })
            ]
         });
      },
      goodbye () {
         return new CosmosSprite({ frames: [ content.ibcFroggitexGone ], anchor: { y: 1, x: 0 } });
      }
   }),
   whimsalot: new OutertaleOpponent({
      flirted: () => SAVE.data.b.flirt_whimsalot,
      assets: new CosmosInventory(
         content.ibbStarfly,
         content.ibcWhimsalotBody,
         content.ibcWhimsalotHit,
         content.ibbTiparrow
      ),
      metadata: { reactOld: true },
      bullied: () => SAVE.data.b.bullied_whimsalot,
      bullyable: true,
      bully: () => {
         SAVE.data.b.bullied_whimsalot = true;
         SAVE.data.n.bully++;
      },
      g: 74,
      hp: 95,
      df: -3,
      exp: 110,
      sparable: false,
      name: () => text.b_opponent_whimsalot.name,
      acts: () => [
         [
            'check',
            v =>
               !world.badder_lizard
                  ? text.b_opponent_whimsalot.act_check()
                  : battler.hurt.includes(v)
                  ? text.b_opponent_whimsalot.act_check2
                  : v.sparable
                  ? text.b_opponent_whimsalot.act_check4
                  : v.flirted
                  ? text.b_opponent_whimsalot.act_check3
                  : text.b_opponent_whimsalot.act_check()
         ],
         [
            'perch',
            vola =>
               [
                  text.b_opponent_whimsalot.act_perch1,
                  text.b_opponent_whimsalot.act_perch2,
                  text.b_opponent_whimsalot.act_perch3
               ][vola.vars.perch ?? 0]()
         ],
         [
            'poke',
            vola =>
               (battler.hurt.includes(vola)
                  ? text.b_opponent_whimsalot.act_poke2
                  : text.b_opponent_whimsalot.act_poke1)()
         ],
         [ 'flirt', text.b_opponent_whimsalot.act_flirt ]
      ],
      handler: battler.opponentHandler({
         kill: () => void SAVE.data.n.corekills++,
         defaultStatus: () => [
            () => text.b_opponent_whimsalot.status1(),
            () => text.b_opponent_whimsalot.status2(),
            () => text.b_opponent_whimsalot.status3(),
            () => text.b_opponent_whimsalot.status4(),
            () => text.b_opponent_whimsalot.status5()
         ],
         defaultTalk: () => [
            text.b_opponent_whimsalot.idleTalk1,
            text.b_opponent_whimsalot.idleTalk2,
            text.b_opponent_whimsalot.idleTalk3,
            text.b_opponent_whimsalot.idleTalk4
         ],
         vars: { perch: 0 },
         bubble: p => [ p.add(27, -48), battler.bubbles.dummy ],
         preact (state) {
            if (state.choice.type !== 'act' || state.choice.act !== 'perch') {
               state.vars.perch = 0;
            }
         },
         act: {
            flirt (state) {
               state.talk = text.b_opponent_whimsalot.flirtTalk;
               SAVE.data.b.flirt_whimsalot = true;
               state.volatile.flirted = true;
               state.vars.perch = 0;
            },
            perch (state) {
               switch (++state.vars.perch) {
                  case 1:
                     state.talk = [
                        text.b_opponent_whimsalot.preperchText1,
                        text.b_opponent_whimsalot.preperchText2,
                        text.b_opponent_whimsalot.preperchText3
                     ];
                     break;
                  case 2:
                     state.talk = [
                        text.b_opponent_whimsalot.perchText1,
                        text.b_opponent_whimsalot.perchText2,
                        text.b_opponent_whimsalot.perchText3,
                        text.b_opponent_whimsalot.perchText4,
                        text.b_opponent_whimsalot.perchText5
                     ];
                     state.status = () => () => text.b_opponent_whimsalot.spareStatus();
                     SAVE.data.b.spared_whimsalot = true;
                     state.pacify = true;
                     break;
                  case 3:
                     battler.spare(state.target);
                     break;
               }
            },
            poke (state) {
               if (battler.hurt.includes(state.volatile)) {
                  battler.spare(state.target);
               }
            }
         },
         item: {
            async old_gun (state) {
               await battler.human(...text.b_opponent_whimsalot.old_gun_text);
               useOld('old_gun', state);
            },
            async old_bomb (state) {
               await battler.human(...text.b_opponent_whimsalot.old_bomb_text);
               useOld('old_bomb', state);
            },
            async old_spray (state) {
               await battler.human(...text.b_opponent_whimsalot.old_spray_text);
               useOld('old_spray', state);
            },
            async epiphany (state) {
               state.talk = [];
               await epiphany(
                  state.target,
                  state.volatile,
                  160,
                  {
                     befriend: () => (SAVE.data.b.spared_whimsalot = true),
                     flirt: () => (SAVE.data.b.flirt_whimsalot = true),
                     kill: () => void SAVE.data.n.corekills++
                  },
                  battler.bubbles.dummy,
                  () => state.volatile.container.position.add(27, -48),
                  text.b_opponent_whimsalot.epiphany
               );
            }
         },
         prestatus (state) {
            if (world.goatbro && SAVE.data.n.plot > 66.2) {
               state.status = () => () => text.b_opponent_whimsalot.genostatus;
            } else if (battler.hurt.includes(state.volatile)) {
               state.status = () => () => text.b_opponent_whimsalot.perilStatus();
            }
         }
      }),
      goodbye () {
         return new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcWhimsalotHit ] });
      },
      sprite () {
         return new CosmosAnimation({
            active: true,
            anchor: { x: 0, y: 1 },
            metadata: { dir: -1, ele: 0.5 },
            resources: content.ibcWhimsalotBody
         }).on('tick', function () {
            this.position.y = (this.metadata.ele += this.metadata.dir / (30 * 2)) * 12;
            if (this.metadata.ele < 0 || this.metadata.ele > 1) {
               this.metadata.dir *= -1;
            }
         });
      }
   }),
   astigmatism: new OutertaleOpponent({
      bully () {
         SAVE.data.b.bullied_astigmatism = true;
         SAVE.data.n.bully++;
      },
      bullied: () => SAVE.data.b.bullied_astigmatism,
      flirted: () => SAVE.data.b.flirt_astigmatism,
      assets: new CosmosInventory(
         content.ibcAstigmatismArm,
         content.ibcAstigmatismBody,
         content.ibcAstigmatismLeg,
         content.ibcAstigmatismHurt,
         content.ibbToothsingle,
         content.ibbCircle4,
         content.ibbEyecone,
         content.asAppear,
         content.asBomb,
         content.asSpiderLaugh
      ),
      hurt: sounds.spiderLaugh,
      metadata: { reactOld: true },
      g: 92,
      hp: 120,
      df: -2,
      exp: 130,
      name: () => text.b_opponent_astigmatism.name,
      acts: () => [
         [
            'check',
            v =>
               !world.badder_lizard
                  ? text.b_opponent_astigmatism.act_check()
                  : battler.hurt.includes(v)
                  ? text.b_opponent_astigmatism.act_check4
                  : v.flirted
                  ? text.b_opponent_astigmatism.act_check3
                  : v.sparable
                  ? text.b_opponent_astigmatism.act_check2
                  : text.b_opponent_astigmatism.act_check()
         ],
         [ 'stare', text.b_opponent_astigmatism.act_stare ],
         [ 'grin', text.b_opponent_astigmatism.act_smile ],
         [ 'flirt', text.b_opponent_astigmatism.act_flirt ]
      ],
      sparable: false,
      handler: battler.opponentHandler({
         kill: () => void SAVE.data.n.corekills++,
         defaultStatus: ({ vars }) =>
            [
               [
                  () => text.b_opponent_astigmatism.status1(),
                  () => text.b_opponent_astigmatism.status2(),
                  () => text.b_opponent_astigmatism.status3(),
                  () => text.b_opponent_astigmatism.status4(),
                  () => text.b_opponent_astigmatism.status5()
               ],
               [
                  () => text.b_opponent_astigmatism.partialStatus1(),
                  () => text.b_opponent_astigmatism.partialStatus2(),
                  () => text.b_opponent_astigmatism.partialStatus3()
               ],
               () => text.b_opponent_astigmatism.fullStatus()
            ][vars.prog ?? 0],
         bubble: pos => [ pos.add(31, -54), battler.bubbles.dummy ],
         defaultTalk: ({ vars }) =>
            [
               [
                  text.b_opponent_astigmatism.idleTalk1,
                  text.b_opponent_astigmatism.idleTalk2,
                  text.b_opponent_astigmatism.idleTalk3,
                  text.b_opponent_astigmatism.idleTalk4,
                  text.b_opponent_astigmatism.idleTalk5
               ],
               [
                  text.b_opponent_astigmatism.partialIdleTalk1,
                  text.b_opponent_astigmatism.partialIdleTalk2,
                  text.b_opponent_astigmatism.partialIdleTalk3
               ],
               [
                  text.b_opponent_astigmatism.fullIdleTalk1,
                  text.b_opponent_astigmatism.fullIdleTalk2,
                  text.b_opponent_astigmatism.fullIdleTalk3
               ]
            ][vars.prog ?? 0],
         vars: { prog: 0, stare: false, grin: false },
         act: {
            stare (state) {
               if (!state.vars.stare) {
                  state.vars.stare = true;
                  state.vars.prog++;
                  if (state.vars.prog < 2) {
                     state.talk = [
                        text.b_opponent_astigmatism.partialTalk1,
                        text.b_opponent_astigmatism.partialTalk2,
                        text.b_opponent_astigmatism.partialTalk3
                     ];
                  } else {
                     state.pacify = true;
                     SAVE.data.b.spared_astigmatism = true;
                  }
               }
            },
            grin (state) {
               if (!state.vars.grin) {
                  state.vars.grin = true;
                  state.vars.prog++;
                  if (state.vars.prog < 2) {
                     state.talk = [
                        text.b_opponent_astigmatism.partialTalk1,
                        text.b_opponent_astigmatism.partialTalk2,
                        text.b_opponent_astigmatism.partialTalk3
                     ];
                  } else {
                     state.pacify = true;
                     SAVE.data.b.spared_astigmatism = true;
                  }
               }
            },
            flirt (state) {
               if (state.vars.prog < 2) {
                  state.talk = text.b_opponent_astigmatism.flirtTalk;
               } else {
                  SAVE.data.b.flirt_astigmatism = true;
                  state.volatile.flirted = true;
                  state.talk = text.b_opponent_astigmatism.flirtTalkFull;
               }
            }
         },
         pretalk (state) {
            if (state.hurt && state.vars.prog > 0) {
               state.vars.prog = 0;
               state.vars.grin = false;
               state.vars.stare = false;
               state.talk = text.b_opponent_astigmatism.hurtTalk;
            }
         },
         item: {
            async old_gun (state) {
               await battler.human(...text.b_opponent_astigmatism.old_gun_text);
               useOld('old_gun', state);
            },
            async old_bomb (state) {
               await battler.human(...text.b_opponent_astigmatism.old_bomb_text);
               useOld('old_bomb', state);
            },
            async old_spray (state) {
               await battler.human(...text.b_opponent_astigmatism.old_spray_text);
               useOld('old_spray', state);
            },
            async epiphany (state) {
               state.talk = [];
               await epiphany(
                  state.target,
                  state.volatile,
                  160,
                  {
                     befriend: () => (SAVE.data.b.spared_astigmatism = true),
                     flirt: () => (SAVE.data.b.flirt_astigmatism = true),
                     kill: () => void SAVE.data.n.corekills++
                  },
                  battler.bubbles.dummy,
                  () => state.volatile.container.position.add(31, -54),
                  text.b_opponent_astigmatism.epiphany
               );
            }
         },
         prestatus (state) {
            if (world.goatbro && SAVE.data.n.plot > 66.2) {
               state.status = () => () => text.b_opponent_astigmatism.genostatus;
            } else if (battler.hurt.includes(state.volatile)) {
               state.status = () => () => text.b_opponent_astigmatism.perilStatus();
            }
         }
      }),
      sprite () {
         const ex = new CosmosValue();
         const er = new CosmosValue();
         const body = new CosmosAnimation({
            active: true,
            anchor: { x: 0, y: 1 },
            metadata: { delta: 0, move: false },
            position: { y: -10 },
            resources: content.ibcAstigmatismBody
         }).on('tick', function () {
            if (this.index === 10 && !this.metadata.move) {
               this.metadata.move = true;
               ex.modulate(renderer, 1000, 0, 1.3, 1.3);
               er.modulate(renderer, 3000, 0, 1, 1);
            } else if (this.index !== 10 && this.metadata.move) {
               this.metadata.move = false;
               ex.modulate(renderer, 1000, 1, 0, 0);
               er.modulate(renderer, 3000, 1, 0, 0);
            }
            this.metadata.delta += ex.value * 5;
         });
         return new CosmosSprite({
            metadata: { cycle: 0 },
            objects: [
               new CosmosSprite({
                  position: { x: 2, y: -13 },
                  frames: [ content.ibcAstigmatismLeg ]
               }).on('tick', function () {
                  this.offsets[0].set(CosmosMath.ray(body.metadata.delta % 360, er.value));
               }),
               new CosmosSprite({
                  position: { x: -2, y: -13 },
                  scale: { x: -1 },
                  frames: [ content.ibcAstigmatismLeg ]
               }).on('tick', function () {
                  this.offsets[0].set(CosmosMath.ray((body.metadata.delta + 180) % 360, er.value));
               }),
               new CosmosSprite({
                  position: { x: 16, y: -24 },
                  frames: [ content.ibcAstigmatismArm ]
               }).on('tick', function () {
                  this.offsets[0].set(CosmosMath.ray((body.metadata.delta + 180) % 360, er.value));
               }),
               new CosmosSprite({
                  position: { x: -16, y: -24 },
                  scale: { x: -1 },
                  frames: [ content.ibcAstigmatismArm ]
               }).on('tick', function () {
                  this.offsets[0].set(CosmosMath.ray(body.metadata.delta % 360, er.value));
               }),
               body
            ]
         });
      },
      goodbye () {
         return new CosmosSprite({
            anchor: { x: 0, y: 1 },
            position: { y: 2 },
            metadata: { size: { y: 60 } },
            frames: [ content.ibcAstigmatismHurt ],
            scale: 0.5
         });
      }
   }),
   migospel: new OutertaleOpponent({
      bully () {
         SAVE.data.b.migonespel = true;
         SAVE.data.n.bully++;
      },
      bullied: () => SAVE.data.b.migonespel,
      flirted: () => SAVE.data.b.flirt_migospel,
      assets: new CosmosInventory(
         content.ibbMigosp,
         content.ibcMigospel,
         content.ibcMigospelHurt,
         content.ibcMigospelLegs,
         content.ibcMigospelHappi
      ),
      metadata: { reactOld: true },
      g: 80,
      hp: 90,
      df: 3,
      exp: 100,
      name: () => text.b_opponent_migospel.name,
      acts: () => [
         [ 'check', text.b_opponent_migospel.act_check ],
         [ 'flirt', text.b_opponent_migospel.act_flirt ],
         [ 'insult', text.b_opponent_migospel.act_insult ]
      ],
      sparable: false,
      handler: battler.opponentHandler({
         kill: () => {
            SAVE.data.b.migonespel = true;
            SAVE.data.n.corekills++;
         },
         defaultTalk: () =>
            battler.alive.length > 1
               ? [
                    text.b_opponent_migospel.groupTalk1,
                    text.b_opponent_migospel.groupTalk2,
                    text.b_opponent_migospel.groupTalk3,
                    text.b_opponent_migospel.groupTalk4,
                    text.b_opponent_migospel.groupTalk5,
                    text.b_opponent_migospel.groupTalk6
                 ]
               : [
                    text.b_opponent_migospel.soloTalk1,
                    text.b_opponent_migospel.soloTalk2,
                    text.b_opponent_migospel.soloTalk3,
                    text.b_opponent_migospel.soloTalk4,
                    text.b_opponent_migospel.soloTalk5
                 ],
         bubble: pos => [ pos.add(17, -54), battler.bubbles.dummy ],
         defaultStatus: () =>
            battler.alive.length > 1
               ? [ () => text.b_opponent_migospel.groupStatus1(), () => text.b_opponent_migospel.groupStatus2() ]
               : () => text.b_opponent_migospel.soloStatus(),
         act: {
            flirt (state) {
               if (battler.alive.length === 1) {
                  SAVE.data.b.flirt_migospel = true;
                  state.volatile.flirted = true;
                  state.talk = text.b_opponent_migospel.flirtTalk;
               }
            }
         },
         postact (state, act) {
            if (battler.alive.length === 1 && (act === 'talk' || act === 'flirt')) {
               SAVE.data.b.spared_migospel = true;
               state.pacify = true;
            }
         },
         pretalk (state) {
            if (!state.dead) {
               if (battler.hurt.includes(state.volatile)) {
                  state.talk = text.b_opponent_migospel.perilTalk;
               } else if (battler.alive.length === 1) {
                  (state.volatile.container.objects[0].objects[1] as CosmosAnimation)
                     .use(content.ibcMigospelHappi)
                     .enable();
               }
            }
         },
         posttalk (state) {
            if (battler.hurt.includes(state.volatile) && !state.dead) {
               SAVE.data.b.migonespel = true;
               state.volatile.sparable = true;
               battler.spare(state.target);
               SAVE.data.n.bully++;
            }
         },
         item: {
            async old_gun (state) {
               await battler.human(...text.b_opponent_migospel.old_gun_text);
               useOld('old_gun', state);
            },
            async old_bomb (state) {
               await battler.human(...text.b_opponent_migospel.old_bomb_text);
               useOld('old_bomb', state);
            },
            async old_spray (state) {
               await battler.human(...text.b_opponent_migospel.old_spray_text);
               useOld('old_spray', state);
            },
            async epiphany (state) {
               state.talk = [];
               await epiphany(
                  state.target,
                  state.volatile,
                  160,
                  {
                     befriend: () => (SAVE.data.b.spared_migospel = true),
                     flirt: () => (SAVE.data.b.flirt_migospel = true),
                     kill: () => void SAVE.data.n.corekills++
                  },
                  battler.bubbles.dummy,
                  () => state.volatile.container.position.add(17, -54),
                  text.b_opponent_migospel.epiphany
               );
            }
         },
         prestatus (state) {
            world.goatbro &&
               SAVE.data.n.plot > 66.2 &&
               (state.status = () => () => text.b_opponent_migospel.genostatus);
         }
      }),
      goodbye: () => new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcMigospelHurt ] }),
      sprite: volatile => {
         const t = renderer.time;
         return new CosmosSprite({
            objects: [
               new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcMigospelLegs ] }),
               new CosmosAnimation({
                  active: volatile.sparable,
                  anchor: { x: 0, y: 1 },
                  resources: volatile.sparable ? content.ibcMigospelHappi : content.ibcMigospel
               }).on('tick', function () {
                  if (this.resources === content.ibcMigospel && this.index === 0 && Math.random() < 1 / 30 / 3) {
                     this.index = Math.floor(Math.random() * 2) + 1;
                     renderer.pause(100 + CosmosMath.bezier(Math.random(), 0, 0, 750, 750)).then(() => {
                        this.index = 0;
                     });
                  }
               })
            ]
         }).on('tick', function () {
            this.scale.y = sineWaver(t, 2000, 1.04, 0.96);
            if (volatile.vars.fade) {
               this.alpha.value > 0 && (this.alpha.value -= 1 / 30) < 0 && (this.alpha.value = 0);
            }
         });
      }
   }),
   mushketeer: new OutertaleOpponent({
      flirted: () => SAVE.data.b.flirt_mushketeer,
      assets: new CosmosInventory(
         content.ibbLiteralBullet,
         content.ibbCrosshair,
         content.asBomb,
         content.ibcMushketeerBody,
         content.ibcMushketeerHurt,
         content.ibcMushketeerBodyDisarmed,
         content.ibcMushketeerHurtDisarmed,
         content.ibbExplosion,
         content.ibbTank,
         content.asBoom,
         content.ibbFrogstar,
         content.ibbNuker,
         content.asBombfall,
         content.ibbTankarm,
         content.asNode,
         content.asAppear,
         content.asGrab,
         content.amSaved
      ),
      metadata: { reactOld: true },
      bullied: () => SAVE.data.b.bullied_mushketeer,
      bullyable: true,
      bully: () => {
         SAVE.data.b.bullied_mushketeer = true;
         SAVE.data.n.bully++;
      },
      g: 99,
      hp: 144,
      df: -2,
      exp: 150,
      name: () => text.b_opponent_mushketeer.name,
      acts: () => [
         [
            'check',
            v =>
               !world.badder_lizard
                  ? text.b_opponent_mushketeer.act_check()
                  : battler.hurt.includes(v)
                  ? text.b_opponent_mushketeer.act_check4
                  : v.flirted
                  ? text.b_opponent_mushketeer.act_check3
                  : v.sparable
                  ? text.b_opponent_mushketeer.act_check2
                  : text.b_opponent_mushketeer.act_check()
         ],
         [
            'disarm',
            ({ vars }) =>
               vars.disarmed
                  ? text.b_opponent_mushketeer.act_disarm3x
                  : [
                       text.b_opponent_mushketeer.act_disarm1,
                       text.b_opponent_mushketeer.act_disarm2,
                       world.genocide ? text.b_opponent_mushketeer.act_disarm4 : text.b_opponent_mushketeer.act_disarm3
                    ][vars.travel ?? 0]()
         ],
         [
            'approach',
            ({ vars }) =>
               [
                  text.b_opponent_mushketeer.act_travel1,
                  text.b_opponent_mushketeer.act_travel2,
                  text.b_opponent_mushketeer.act_travel3
               ][vars.travel ?? 0]()
         ],
         [ 'flirt', text.b_opponent_mushketeer.act_flirt ]
      ],
      handler: battler.opponentHandler({
         kill () {
            SAVE.data.b.nk_mushketeer = false;
            SAVE.data.b.spared_mushketeer = false;
         },
         async fight ({ volatile }, power) {
            if (volatile.sparable || volatile.hp <= battler.calculate(volatile, power)) {
               music.saved.stop();
               battler.music?.stop();
            }
            return battler.attack(volatile, volatile.sparable ? { power: 0, operation: 'multiply' } : { power });
         },
         defaultStatus: ({ vars, volatile }) =>
            world.genocide
               ? () => text.b_opponent_mushketeer.genoStatus
               : volatile.sparable
               ? () => text.b_opponent_mushketeer.disarmStatus
               : vars.travel < 1
               ? [
                    () => text.b_opponent_mushketeer.status1(),
                    () => text.b_opponent_mushketeer.status2(),
                    () => text.b_opponent_mushketeer.status3(),
                    () => text.b_opponent_mushketeer.status4(),
                    () => text.b_opponent_mushketeer.status5()
                 ]
               : [
                    () => text.b_opponent_mushketeer.travelStatus1(),
                    () => text.b_opponent_mushketeer.travelStatus2(),
                    () => text.b_opponent_mushketeer.travelStatus3()
                 ],
         defaultTalk: ({ vars, volatile }) =>
            volatile.sparable
               ? [ text.b_opponent_mushketeer.postDisarmTalk1, text.b_opponent_mushketeer.postDisarmTalk2 ]
               : world.genocide || vars.travel < 1
               ? [
                    text.b_opponent_mushketeer.idleTalk1(),
                    text.b_opponent_mushketeer.idleTalk2(),
                    text.b_opponent_mushketeer.idleTalk3()
                 ]
               : [ text.b_opponent_mushketeer.travelTalk1, text.b_opponent_mushketeer.travelTalk2 ],
         vars: { travel: 0, disarmed: false },
         bubble: pos => [ pos.add(35, -57), battler.bubbles.dummy ],
         act: {
            flirt (state) {
               if (state.volatile.sparable) {
                  state.talk = text.b_opponent_mushketeer.flirtTalk2;
                  SAVE.data.b.flirt_mushketeer = true;
                  state.volatile.flirted = true;
                  state.status = () => () => text.b_opponent_mushketeer.flirtStatus2();
               } else {
                  state.talk = text.b_opponent_mushketeer.flirtTalk;
                  state.status = () => () => text.b_opponent_mushketeer.flirtStatus();
               }
            },
            approach (state) {
               if (state.vars.travel < 2) {
                  state.vars.travel++;
                  battler.music && (battler.music.rate.value = 1.2 + state.vars.travel * 0.1);
               }
            },
            async disarm (state) {
               if (!state.vars.disarmed && 2 <= state.vars.travel) {
                  if (world.genocide) {
                     state.vars.travel = 0;
                     battler.music && (battler.music.rate.value = 1.2);
                  } else {
                     battler.music?.stop();
                     sounds.grab.instance(renderer);
                     dropShake(state.volatile.container.position, false);
                     state.vars.disarmed = true;
                     await renderer.pause(1650);
                     state.talk = text.b_opponent_mushketeer.disarmTalk;
                     state.volatile.sparable = true;
                     SAVE.data.b.spared_mushketeer = true;
                     music.saved.instance(renderer).rate.value = 0.75;
                  }
               }
            }
         },
         item: {
            async old_gun (state) {
               await battler.human(...text.b_opponent_mushketeer.old_gun_text);
               useOld('old_gun', state);
            },
            async old_bomb (state) {
               await battler.human(...text.b_opponent_mushketeer.old_bomb_text);
               useOld('old_bomb', state);
            },
            async old_spray (state) {
               await battler.human(...text.b_opponent_mushketeer.old_spray_text);
               useOld('old_spray', state);
            },
            async epiphany (state) {
               state.talk = [];
               await epiphany(
                  state.target,
                  state.volatile,
                  160,
                  {
                     befriend: () => (SAVE.data.b.spared_mushketeer = true),
                     flirt: () => (SAVE.data.b.flirt_mushketeer = true),
                     kill: () => {
                        SAVE.data.b.nk_mushketeer = false;
                        SAVE.data.b.spared_mushketeer = false;
                     }
                  },
                  battler.bubbles.dummy,
                  () => state.volatile.container.position.add(35, -57),
                  text.b_opponent_mushketeer.epiphany
               );
            }
         },
         prestatus (state) {
            if (battler.hurt.includes(state.volatile)) {
               state.status = () => () => text.b_opponent_mushketeer.hurtStatus();
            }
         }
      }),
      sprite (volatile) {
         const spinchance = volatile.sparable ? 1 / 30 / 2 : 1 / 30 / 20;
         return new CosmosSprite({
            anchor: { x: 0, y: 1 },
            metadata: { spinning: false, spinScale: new CosmosValue(1) }
         }).on('tick', function () {
            this.frames[0] = volatile.vars.disarmed ? content.ibcMushketeerBodyDisarmed : content.ibcMushketeerBody;
            if (!this.metadata.spinning && Math.random() < spinchance) {
               this.metadata.spinning = true;
               this.metadata.spinScale.modulate(renderer, 150, -1).then(async () => {
                  await renderer.pause(100);
                  await this.metadata.spinScale.modulate(renderer, 150, 1);
                  await renderer.pause(100);
                  await this.metadata.spinScale.modulate(renderer, 150, -1);
                  await renderer.pause(100);
                  await this.metadata.spinScale.modulate(renderer, 150, 1);
                  this.metadata.spinning = false;
               });
            }
            this.scale.set(
               new CosmosPoint([ 1, 1.5, 2 ][(volatile.vars.travel as number) ?? 0]).multiply(
                  this.metadata.spinScale.value,
                  1
               )
            );
         });
      },
      goodbye (v) {
         return new CosmosSprite({
            anchor: { x: 0, y: 1 },
            frames: [ v.vars.disarmed ? content.ibcMushketeerHurtDisarmed : content.ibcMushketeerHurt ]
         }).on('tick', function () {
            this.scale.set([ 1, 1.5, 2 ][(battler.volatile[0].vars.travel as number) ?? 0]);
         });
      }
   })
};

for (const [ key, value ] of Object.entries(opponents)) {
   value.assets.name = `opponents::${key}`;
}

battler.opponentRegistry.register(opponents);

export default opponents;

CosmosUtils.status(`LOAD MODULE: AERIALIS OPPONENTS (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
