import { AdvancedBloomFilter } from '@pixi/filter-advanced-bloom';
import { BulgePinchFilter } from '@pixi/filter-bulge-pinch';
import { GlitchFilter } from '@pixi/filter-glitch';
import { RGBSplitFilter } from '@pixi/filter-rgb-split';
import { ZoomBlurFilter } from '@pixi/filter-zoom-blur';
import { BLEND_MODES, ColorMatrixFilter, Graphics, Rectangle, isMobile } from 'pixi.js';
import text from '../../languages/default/text/citadel';
import commonText from '../../languages/default/text/common';
import {
   ShootableEvents,
   basic,
   blue,
   bulletSetup,
   galaxy,
   grey,
   oversaver,
   pastScreen,
   resetBox,
   standardPos
} from '../common/api';
import {
   content,
   context,
   filters,
   inventories,
   music,
   musicConvolver,
   musicFilter,
   soundDelay,
   soundRouter,
   sounds
} from '../systems/assets';
import { atlas, events, exit, game, keys, reload, renderer, rooms, speech, typer } from '../systems/core';
import {
   antifreeze,
   battler,
   credits,
   dialogue,
   dialogue_primitive,
   disengageDelay,
   dropShake,
   engageDelay,
   fader,
   hashes,
   header,
   instance,
   keyState,
   mobile,
   player,
   quickshadow,
   saver,
   shake,
   sineWaver,
   splash,
   teleport,
   updateArmor,
   world
} from '../systems/framework';
import { OutertaleGroup, OutertaleMultivisualObject, OutertaleOpponent } from '../systems/outertale';
import { SAVE } from '../systems/save';
import {
   CosmosAnimation,
   CosmosBaseEvents,
   CosmosDaemon,
   CosmosEntity,
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
   CosmosRenderer,
   CosmosSprite,
   CosmosText,
   CosmosUtils,
   CosmosValue,
   CosmosValueLinked,
   CosmosValueRandom,
   Vow
} from '../systems/storyteller';
import opponents, {
   azActivateSaveButton,
   azInitSetup,
   azIsolateSaveButton,
   azMusicDespair,
   azMusicEmotion,
   azMusicHyper,
   barrier,
   barrierPower,
   genBarrierGraphics
} from './opponents';
import patterns from './patterns';

export type HyperColor = 'red' | 'orange' | 'yellow' | 'green' | 'cyan' | 'blue' | 'purple';

export const twAssets1 = new CosmosInventory(
   content.amIdiot,
   content.iocAsgoreBound,
   content.iocAsgoreBreak,
   content.iocAsgoreDeath,
   content.iocAsgoreDeathAlt,
   inventories.twinklyAssets,
   content.idcTwinklyBroken,
   content.idcTwinklyCrazed,
   content.idcTwinklyDead,
   content.ibuBossSOUL,
   content.asLightningstrike,
   content.asBoom,
   content.asStrike,
   content.asSuperstrike,
   content.asShatter,
   content.asCackle,
   content.asSwing
);
export const twAssets2 = new CosmosInventory(
   content.iocFriskUpCharaFake,
   content.iocFriskLeftCharaFake,
   content.iocFriskRightCharaFake,
   content.iocFriskDownCharaFake,
   content.amTerror,
   content.iooCArchiveLightInverted,
   content.asStep,
   content.asDeeploop2,
   content.avTwinkly2,
   inventories.iocHumansAll,
   content.asGoodbye,
   content.ibcTwinklyUnderlay,
   content.ibcTwinklyOverlay,
   content.ibcTwinklySun1
);
export const twAssets3 = new CosmosInventory(content.amSng1);
export const twAssets3a = new CosmosInventory(
   content.ibcTwinklyUnderlay,
   content.ibcTwinklyOverlay,
   content.ibcTwinklySun1,
   content.ibcTwinklySun2,
   content.ibcTwinklySun3,
   content.ibcTwinklyHeart1,
   content.ibcTwinklyHeart2,
   content.ibcTwinklyHeart3,
   content.ibcTwinklyHeart4,
   content.ibcTwinklyHeart5,
   content.ibcTwinklyHeart6,
   content.ibcTwinklyHeart7,
   content.ibcTwinklySunbeam,
   content.ibcTwinklySunball,
   content.ibcTwinklySunringBlue,
   content.ibcTwinklySunringOrange,
   content.asSpecout,
   content.avAsriel3,
   content.asBreak,
   content.ibuBossSOUL,
   content.ibuBossbreak,
   content.ibuBossshatter,
   content.asShatter,
   content.amSaved,
   content.iooSNoise,
   content.asStatic,
   content.ibuDefeat,
   content.asSword,
   content.asIndicator
);
export const twAssets4 = new CosmosInventory(content.amSng2, content.ibcTwinklyJusant, content.ibcTwinklySpoon);
export const twAssets5 = new CosmosInventory(content.amSng3);
export const twAssets5a = new CosmosInventory(
   content.ibuCyanReticle,
   content.asArrow,
   content.asBell,
   content.ibcTwinklyDiamondboltArc,
   content.ibcTwinklyDiamondboltRay,
   content.asLightningstrike
);
export const twAssets6 = new CosmosInventory(
   content.amSng4,
   content.ibcTwinklyItssobad,
   content.ibcTwinklyStanleycolumn,
   content.ibcTwinklyStanleyparable,
   content.asPathway
);
export const twAssets7 = new CosmosInventory(content.amSng5);
export const twAssets7a = new CosmosInventory(content.asBoom, content.ibcTwinklyWarpstar, content.asBomb);
export const twAssets8 = new CosmosInventory(
   content.ibcTwinklyGeodash,
   content.ibcTwinklyGeoplatform,
   content.ibcTwinklyGeoring,
   content.amSng6,
   content.ibcTwinklyShoes
);
export const twAssets9 = new CosmosInventory(content.amSng7);
export const twAssets9a = new CosmosInventory(content.ibcTwinklyPlatform, content.ibcTwinklyWormhole);
export const twAssets10 = new CosmosInventory(
   content.ibcTwinklyCheckpoint,
   content.ibcTwinklyWinterrowd,
   content.ibcTwinklyPadd,
   content.amSng8
);
export const twAssets11 = new CosmosInventory(content.amSng9);
export const twAssets11a = new CosmosInventory(content.ibcTwinklyOrbiterMid, content.ibcTwinklyOrbiterExtra);
export const twAssets12 = new CosmosInventory(
   content.amSng10,
   content.ibcTwinklyFunkin,
   content.ibcTwinklyBeatsaber,
   content.ibcTwinklyNotebar,
   content.ibcTwinklyXylo,
   content.ibcTwinklyRestraint
);
export const twAssets13 = new CosmosInventory(content.amSng11);
export const twAssets13a = new CosmosInventory(content.ibcTwinklyRotater, content.ibcTwinklyRotaterBeam);
export const twAssets14 = new CosmosInventory(content.amSng12);
export const twAssets15 = new CosmosInventory(
   content.ibcTwinklyShotstar,
   content.amSng13,
   content.asHeartshot,
   content.ibuYellowShot,
   content.asNode,
   content.asHit
);
export const twAssets16 = new CosmosInventory(
   content.iooCArchiveLight,
   content.asStep,
   content.iooSNoise,
   content.ibuFight,
   content.ibuMercy,
   content.asWind,
   content.asDeeploop2,
   content.avTwinkly1,
   content.avTwinkly2,
   content.asRun,
   content.asBoom
);
export const twAssets17 = new CosmosInventory(
   inventories.idcAlphys,
   inventories.idcSans,
   content.avAlphys,
   content.avSans,
   content.avNapstablook,
   inventories.avMettaton,
   content.ibcTwinklyUnderlay,
   content.ibuSOUL,
   content.ibuBreak,
   content.asBreak,
   content.asBark,
   content.ibuBubbleTwinkly,
   content.ibbPomwag,
   content.ibbPomwalk,
   content.ibbPombark,
   content.asSpiderLaugh
);

twAssets1.name = 'twAssets1';
twAssets2.name = 'twAssets2';
twAssets3.name = 'twAssets3';
twAssets3a.name = 'twAssets3a';
twAssets4.name = 'twAssets4';
twAssets5.name = 'twAssets5';
twAssets5a.name = 'twAssets5a';
twAssets6.name = 'twAssets6';
twAssets7.name = 'twAssets7';
twAssets7a.name = 'twAssets7a';
twAssets8.name = 'twAssets8';
twAssets9.name = 'twAssets9';
twAssets9a.name = 'twAssets9a';
twAssets10.name = 'twAssets10';
twAssets11.name = 'twAssets11';
twAssets11a.name = 'twAssets11a';
twAssets12.name = 'twAssets12';
twAssets13.name = 'twAssets13';
twAssets13a.name = 'twAssets13a';
twAssets14.name = 'twAssets14';
twAssets15.name = 'twAssets15';
twAssets16.name = 'twAssets16';
twAssets17.name = 'twAssets17';

export function genRLD () {
   return new CosmosText({
      fill: 0xffffff,
      fontFamily: content.fDotumChe,
      fontSize: 18,
      spacing: { x: -4, y: 2.5 },
      position: { x: 48.5, y: 62.5 }
   }).on('tick', function () {
      this.content = game.text;
   });
}

export function hyper_pacifist () {
   return SAVE.data.n.exp <= 0 && 2.1 <= SAVE.data.n.plot_date;
}

export const hyper_center = new CosmosPoint(160, 40);

export const hyper = {
   arena: new CosmosObject(),
   assets: [ twAssets3, twAssets5, twAssets7, twAssets9, twAssets11, twAssets13, twAssets15 ],
   assets_additional: [ twAssets5a, twAssets7a, twAssets9a, twAssets11a, twAssets13a, null ],
   bullet_dbv: CosmosUtils.populate(53, x =>
      CosmosUtils.populate(29, y => [ 30 + x * 5, 30 + y * 5 ] as [number, number])
   )
      .flat()
      .filter(value => 100 <= hyper_center.extentOf(value[0], value[1])),
   bullet_radii: [
      30, 32, 35, 37, 40, 43, 46, 50, 53, 57, 62, 66, 71, 76, 82, 88, 95, 102, 110, 118, 127, 136, 146, 157, 169, 181,
      195, 210, 225, 242, 260
   ],
   color_fx: new CosmosAnimation({
      anchor: 0,
      metadata: { time: 15 },
      alpha: 0,
      priority: 1001
   }).on('tick', function () {
      this.alpha.value = CosmosMath.bezier(this.metadata.time / 15, 1, 1, 0);
      this.resources = (battler.SOUL.objects[0] as CosmosAnimation).resources;
      this.scale.set(CosmosMath.bezier(this.metadata.time / 15, 0.5, 1, 1));
      this.position.set(battler.SOUL);
   }),
   color_reset () {
      battler.SOUL.metadata.cyanLeap = false;
      for (const echo of battler.SOUL.metadata.cyanLeapEcho.splice(0)) {
         if (battler.SOUL.metadata.layer === null) {
            renderer.detach('menu', echo);
         } else {
            battler.SOUL.metadata.layer.detach(echo);
         }
         echo.metadata.e.resolve();
      }
      battler.SOUL.metadata.cyanLeapTick = 0;
      battler.line.reset();
      battler.SOUL.metadata.cyanShadowTick = 0;
      if (battler.SOUL.metadata.cyanShadowVisible) {
         battler.SOUL.metadata.cyanShadowVisible = false;
         if (battler.SOUL.metadata.layer === null) {
            renderer.detach('menu', battler.shadow);
         } else {
            battler.SOUL.metadata.layer.detach(battler.shadow);
         }
      }
      if (battler.SOUL.metadata.orangeTick !== 0) {
         battler.SOUL.area = null;
         battler.SOUL.filters = null;
         battler.SOUL.updateFilters();
         battler.SOUL.container.removeChild(battler.SOUL.metadata.orangeGraphics);
      }
      battler.line.iterations = 0;
      for (const obj of battler.SOUL.metadata.shot_obj.splice(0)) {
         if (battler.SOUL.metadata.layer === null) {
            renderer.detach('menu', obj);
         } else {
            battler.SOUL.metadata.layer.detach(obj);
         }
      }
      battler.SOUL.alpha.value = 0;
      battler.SOUL.velocity.y = 0;
      hypervisor.inv_ticks = 0;
      battler.SOUL.objects[0].metadata.tint = hyper.tints[battler.SOUL.metadata.color as HyperColor];
      hyper.color_fx.metadata.time = 15;
   },
   color_update (color: HyperColor) {
      if (color !== 'blue') {
         battler.SOUL.velocity.y = 0;
      }
      if (color === 'purple') {
         battler.stat.invulnerability.modifiers = [ [ 'add', 15, Infinity ] ];
         if (!battler.line.active) {
            battler.line.active = true;
            battler.line.damage = 1;
            battler.line.loop = game.movement ? -1.5 : 0;
            battler.line.offset = (battler.SOUL.position.y % 20) + 2.5;
            battler.line.pos.y = battler.SOUL.position.y;
            battler.line.sticky = false;
            battler.line.width = hypervisor.line_width;
         }
      } else {
         battler.stat.invulnerability.modifiers = [];
         if (battler.line.active) {
            battler.line.reset();
         }
      }
      battler.SOUL.scale.y = color === 'yellow' ? -1 : 1;
      battler.SOUL.objects[0].tint = (hypervisor.inv_ticks % 6 < 3 ? hyper.tints : hyper.tints_dark)[color];
   },
   div246: (60 / 246.857) * 4,
   fg: new CosmosAnimation({
      alpha: 0,
      blend: BLEND_MODES.MULTIPLY,
      resources: content.ibcTwinklyOverlay,
      priority: 1003
   }),
   hp: new CosmosObject({
      alpha: 0.92,
      priority: 1002,
      metadata: { graphics: new Graphics() },
      blend: BLEND_MODES.ADD
   }).on('tick', function () {
      const mx = hyper.hp_max();
      this.metadata.graphics
         .clear()
         .beginFill(0xff6060, 1)
         .drawRect(10, 220, 80, 10)
         .endFill()
         .beginFill(0, 1)
         .drawRect(11, 221, 78, 8)
         .endFill()
         .beginFill(0x803030, 1)
         .drawRect(12, 222, (Math.min(SAVE.data.n.hp, mx) / mx) * 76, 6)
         .endFill();
   }),
   hp_max () {
      return (
         [ 4, 4, 5, 5, 6, 6, 7 ][hypervisor.phase] +
         Math.min(Math.max(Math.ceil((SAVE.flag.n._deaths_twinkly - 3) / 2), 0), 6)
      );
   },
   layer: new CosmosObject({ area: renderer.area }),
   async load_fx () {
      (renderer.filters ??= []).push(filters.glitch);
      const ticker = () => filters.glitch.refresh();
      renderer.on('tick', ticker);
      await renderer.pause(200);
      renderer.off('tick', ticker);
      renderer.filters.splice(renderer.filters.indexOf(filters.glitch), 1);
      sounds.save.instance(renderer);
   },
   load_text: new CosmosText({
      position: 10,
      fill: 0xffffff,
      fontFamily: content.fDeterminationSans,
      fontSize: 24,
      metadata: { ticks: 30 },
      priority: 1983598137591835
   }).on('tick', function () {
      this.alpha.value = 1 - Math.max((this.metadata.ticks++ - 10) / 20, 0);
   }),
   nosound: false,
   phase () {
      return SAVE.flag.n.neutral_twinkly_stage === 3.6
         ? 6
         : SAVE.flag.n.neutral_twinkly_stage === 3.5
         ? 5
         : SAVE.flag.n.neutral_twinkly_stage === 3.4
         ? 4
         : SAVE.flag.n.neutral_twinkly_stage === 3.3
         ? 3
         : SAVE.flag.n.neutral_twinkly_stage === 3.2
         ? 2
         : SAVE.flag.n.neutral_twinkly_stage === 3.1
         ? 1
         : 0;
   },
   rect_bg: new CosmosRectangle({
      alpha: 1,
      fill: 0x1f0000,
      priority: -1,
      size: { x: 320, y: 240 }
   }),
   rect_wf: new CosmosRectangle({
      alpha: 0,
      anchor: 0,
      fill: 0xffffff,
      priority: 19385719387591,
      size: 1000,
      position: { x: 160, y: 120 }
   }),
   sounder: { arrow: -Infinity, bomb: -Infinity },
   async static () {
      const noise = new CosmosObject({
         objects: CosmosUtils.populate(
            4,
            i =>
               new CosmosAnimation({
                  active: true,
                  duration: 2,
                  position: { x: (i % 2) * 160, y: Math.floor(i / 2) * 120 },
                  extrapolate: false,
                  resources: content.iooSNoise
               })
         )
      });
      renderer.attach('menu', noise);
      await sounds.static.instance(renderer).on('stop');
      renderer.detach('menu', noise);
   },
   sun: new CosmosObject({
      position: hyper_center,
      metadata: { x: 0, y: -160, z: 0, s: 1.5, p: 999 },
      priority: 1002,
      tint: 0xffffff,
      objects: [ new CosmosAnimation({ anchor: 0, resources: content.ibcTwinklySun1 }) ]
   }).on('tick', function () {
      if (!battler.active || !game.movement || battler.SOUL.alpha.value === 0) {
         return;
      }
      const ext = this.position.extentOf(battler.SOUL);
      if (85 <= ext) {
         return;
      }
      if (35 <= ext) {
         battler.SOUL.position.set(
            battler.SOUL.position.add(
               CosmosMath.ray(Math.round(this.position.angleFrom(battler.SOUL)), (85 - ext) / 15)
            )
         );
         return;
      }
      battler.damage(20);
   }),
   sun_fx: new CosmosObject({
      priority: -1,
      metadata: { graphics: new Graphics(), particles: [] as [number, number, number, number][] }
   }).on('tick', function () {
      this.metadata.graphics.clear();
      const { x, y } = CosmosMath.ray(Math.floor(Math.random() * 360), 1);
      this.metadata.particles.push([ 0, 0, x, y ]);
      this.metadata.graphics.lineStyle({ color: 0xff0000, alpha: 0.08, width: 1.5 });
      for (const particle of this.metadata.particles.slice()) {
         particle[0] += particle[2] * 45;
         particle[1] += particle[3] * 45;
         if (particle[0] > -260 && particle[0] < 260 && particle[1] > -260 && particle[1] < 260) {
            this.metadata.graphics
               .moveTo(particle[0] - particle[2] * 60, particle[1] - particle[3] * 60)
               .lineTo(particle[0], particle[1]);
         } else {
            this.metadata.particles.splice(this.metadata.particles.indexOf(particle), 1);
         }
      }
      this.metadata.graphics.closePath().lineStyle({ color: 0xff0000, alpha: 0.16, width: 1.5 });
      for (const particle of this.metadata.particles) {
         this.metadata.graphics
            .moveTo(particle[0], particle[1])
            .lineTo(particle[0] + particle[2] * 60, particle[1] + particle[3] * 60);
      }
      this.metadata.graphics.closePath();
   }),
   sun_resources () {
      return SAVE.flag.n.neutral_twinkly_stage === 3.6
         ? content.ibcTwinklySun3
         : SAVE.flag.n.neutral_twinkly_stage === 3.5 ||
           SAVE.flag.n.neutral_twinkly_stage === 3.4 ||
           SAVE.flag.n.neutral_twinkly_stage === 3.3
         ? content.ibcTwinklySun2
         : content.ibcTwinklySun1;
   },
   text: new CosmosText({
      anchor: 0,
      position: { x: 160, y: 40 },
      fontSize: 16,
      fontFamily: content.fDeterminationMono,
      fill: 0xffffff,
      priority: 319513098501935
   }).on('tick', function () {
      this.content = typer.mode === 'empty' ? '' : game.text;
   }),
   tints: {
      red: 0xff0000,
      orange: 0xff993d,
      yellow: 0xfaff29,
      green: 0x00c000,
      cyan: 0x42fcff,
      blue: 0x003cff,
      purple: 0xd535d9
   },
   tints_dark: {
      red: 0x800000,
      orange: 0xb36a2b,
      yellow: 0xcccc23,
      green: 0x008000,
      cyan: 0x218080,
      blue: 0x001d7f,
      purple: 0x8f1c93
   },
   uv: new CosmosSprite({
      frames: [ content.ibcTwinklyUnderlay ],
      blend: BLEND_MODES.NORMAL,
      priority: 183579135,
      position: { x: 160, y: 120 },
      anchor: 0
   }).on('tick', function () {
      this.alpha.value = CosmosRenderer.fancy
         ? 0.9 - CosmosMath.wave(hypervisor.time / 30) * 0.15
         : 0.7 - CosmosMath.wave(hypervisor.time / 30) * 0.13;
   }),
   zbf: new ZoomBlurFilter({ strength: 0, radius: 500, innerRadius: 0, center: [ 320, 240 ] })
};

hyper.hp.container.addChild(hyper.hp.metadata.graphics);
hyper.sun_fx.metadata.graphics.zIndex = -1;
hyper.sun_fx.container.addChild(hyper.sun_fx.metadata.graphics);

export const hyper_bullet_storage = {
   entries: {} as Partial<CosmosKeyed<CosmosObject>>,
   of<A extends CosmosObject> (key: string, provider: () => A) {
      return (hyper_bullet_storage.entries[key] ??= provider()) as A;
   }
};

export const hyper_bullets = {
   sunbeam (index: number, time: number) {
      const object = hyper_bullet_storage.of(`sunbeam/${index}`, () => {
         const graphics = new Graphics();
         const hitbox = new CosmosHitbox({
            priority: 4,
            metadata: {
               time: 0,
               bullet: false,
               damage: 1,
               particles: CosmosUtils.populate(
                  40,
                  () =>
                     [
                        Math.floor(Math.random() * 260),
                        Math.round(Math.random() * 20 - 10),
                        Math.random() < 0.5 ? -1 : 1
                     ] as [number, number, number]
               )
            },
            position: hyper.sun,
            size: { x: 260, y: 20 },
            anchor: { y: 0 },
            objects: [
               new CosmosAnimation({
                  alpha: 0,
                  metadata: { time: Math.floor(Math.random() * 15) },
                  resources: content.ibcTwinklySunbeam,
                  anchor: { y: 0 }
               })
            ]
         }).on('tick', function () {
            const time = this.metadata.time;
            graphics.clear();
            if (time < 18) {
               this.alpha.value = 1;
               this.metadata.bullet = false;
               this.objects[0].alpha.value = 0;
               const ext = CosmosMath.bezier(time / 18, 0, 0, 50);
               const sz = (time / 18) * 30;
               graphics.beginFill(0xcf0000, time / 18);
               for (const particle of this.metadata.particles) {
                  graphics.drawRect(Math.max(particle[0] + ext * particle[2], 0) - sz / 2, particle[1] - 0.5, sz, 1);
               }
               graphics.endFill();
               if (time === 0) {
                  this.rotation.value = hyper_center.angleTo(battler.SOUL);
               }
            } else {
               if (time < 33) {
                  this.alpha.value = 1;
               } else {
                  this.alpha.value = 0.7 - ((time - 33) / 15) * 0.7;
               }
               this.objects[0].alpha.value = 1;
               this.metadata.bullet = time < 33;
               if (time === 18) {
                  hypervisor.instance({ daemon: sounds.specout });
                  hypervisor.instance({
                     daemon: new CosmosDaemon(content.avAsriel3, {
                        context,
                        gain: 0.75,
                        rate: 1.2,
                        router: soundRouter
                     })
                  });
               }
            }
         });
         hitbox.container.addChild(graphics);
         return hitbox;
      });
      object.metadata.time = time;
      return { active: time < 48, object, shake: time < 18 || time > 33 ? 0 : (1 - (time - 18) / 15) * 2 };
   },
   sunball (index: number, time: number) {
      const object = hyper_bullet_storage.of(`sunball/${index}`, () => {
         return new CosmosHitbox({
            priority: 8,
            metadata: { time: 0, bullet: true, damage: 1, v: new CosmosPoint() },
            size: { x: 55, y: 26 },
            anchor: 0,
            objects: [
               new CosmosAnimation({
                  metadata: { time: Math.floor(Math.random() * 15) },
                  resources: content.ibcTwinklySunball,
                  anchor: 0
               })
            ]
         }).on('tick', function () {
            if (this.metadata.time === 0) {
               const ang = Math.round(hypervisor.random.next() * 135) + 45;
               this.rotation.value = ang;
               this.metadata.v.set(CosmosMath.ray(ang, 5));
               hypervisor.instance({ daemon: sounds.sword, rate: 0.8 + Math.random() * 0.3 });
            }
            this.position.set(hyper_center.add(this.metadata.v.multiply(this.metadata.time + 1)));
         });
      });
      object.metadata.time = time;
      return { active: time < 120, object, shake: 0 };
   },
   sunring_orange (index: number, time: number) {
      const object = hyper_bullet_storage.of(`sunring_orange/${index}`, () => {
         return new CosmosAnimation({
            priority: 5,
            metadata: { auto: false, time: 0 },
            resources: content.ibcTwinklySunringOrange
         }).on('tick', async function () {
            this.index = Math.floor(this.metadata.time / 2);
            battler.SOUL.metadata.ticked || (await battler.SOUL.on('tick'));
            if (
               battler.invulnerable === 0 &&
               (!battler.SOUL.metadata.moved ||
                  (!battler.SOUL.metadata.cyanLeap && battler.SOUL.metadata.color === 'cyan'))
            ) {
               const ext = hyper_center.extentOf(battler.SOUL);
               const radius = hyper.bullet_radii[this.index];
               const border = CosmosMath.bezier(this.index / 30, 1, 4, 6);
               if (ext < radius + border && radius - border <= ext) {
                  battler.damage(1);
               }
            }
         });
      });
      object.metadata.time = time;
      return { active: time < 62, object, shake: 0 };
   },
   sunring_blue (index: number, time: number) {
      const object = hyper_bullet_storage.of(`sunring_blue/${index}`, () => {
         return new CosmosAnimation({
            priority: 5,
            metadata: { auto: false, time: 0 },
            resources: content.ibcTwinklySunringBlue
         }).on('tick', async function () {
            this.index = Math.floor(this.metadata.time / 2);
            battler.SOUL.metadata.ticked || (await battler.SOUL.on('tick'));
            if (battler.invulnerable === 0 && battler.SOUL.metadata.moved && battler.SOUL.metadata.color !== 'cyan') {
               const ext = hyper_center.extentOf(battler.SOUL);
               const radius = hyper.bullet_radii[this.index];
               const border = CosmosMath.bezier(this.index / 30, 1, 4, 6);
               if (ext < radius + border && radius - border <= ext) {
                  battler.damage(1);
               }
            }
         });
      });
      object.metadata.time = time;
      return { active: time < 60, object, shake: 0 };
   },
   diamondbolt (index: number, time: number) {
      const object = hyper_bullet_storage.of(`diamondbolt/${index}`, () => {
         const graphics = new Graphics();
         const frameoffset = Math.floor(Math.random() * 3);
         const object = new CosmosObject({
            priority: 1,
            objects: [
               new CosmosHitbox({
                  metadata: { bullet: false, damage: 1 },
                  position: { x: 14.5, y: -14.5 },
                  size: { x: 42, y: 2 },
                  anchor: 0,
                  rotation: 45
               }),
               new CosmosHitbox({
                  metadata: { bullet: false, damage: 1 },
                  position: { x: 14.5, y: 14.5 },
                  size: { x: 42, y: 2 },
                  anchor: 0,
                  rotation: 135
               }),
               new CosmosHitbox({
                  metadata: { bullet: false, damage: 1 },
                  position: { x: -14.5, y: 14.5 },
                  size: { x: 42, y: 2 },
                  anchor: 0,
                  rotation: 225
               }),
               new CosmosHitbox({
                  metadata: { bullet: false, damage: 1 },
                  position: { x: -14.5, y: -14.5 },
                  size: { x: 42, y: 2 },
                  anchor: 0,
                  rotation: 315
               }),
               new CosmosHitbox({
                  metadata: { bullet: false, damage: 1 },
                  anchor: { y: 0 },
                  position: { x: 29.5 },
                  size: { x: 400, y: 3 }
               }),
               new CosmosHitbox({
                  metadata: { bullet: false, damage: 1 },
                  anchor: { y: 0 },
                  position: { y: 29.5 },
                  size: { x: 400, y: 3 },
                  rotation: 90
               }),
               new CosmosHitbox({
                  metadata: { bullet: false, damage: 1 },
                  anchor: { y: 0 },
                  position: { x: -29.5 },
                  size: { x: 400, y: 3 },
                  rotation: 180
               }),
               new CosmosHitbox({
                  metadata: { bullet: false, damage: 1 },
                  anchor: { y: 0 },
                  position: { y: -29.5 },
                  size: { x: 400, y: 3 },
                  rotation: 270
               }),
               new CosmosAnimation({
                  anchor: 0,
                  metadata: { time: Math.floor(Math.random() * 5) * 3 + frameoffset },
                  resources: content.ibcTwinklyDiamondboltArc
               }),
               new CosmosAnimation({
                  anchor: { y: 0 },
                  metadata: { time: Math.floor(Math.random() * 5) * 3 + frameoffset },
                  resources: content.ibcTwinklyDiamondboltRay,
                  position: { x: 29.5 }
               }),
               new CosmosAnimation({
                  anchor: { y: 0 },
                  metadata: { time: Math.floor(Math.random() * 5) * 3 + frameoffset },
                  resources: content.ibcTwinklyDiamondboltRay,
                  position: { y: 29.5 },
                  rotation: 90
               }),
               new CosmosAnimation({
                  anchor: { y: 0 },
                  metadata: { time: Math.floor(Math.random() * 5) * 3 + frameoffset },
                  resources: content.ibcTwinklyDiamondboltRay,
                  position: { x: -29.5 },
                  rotation: 180
               }),
               new CosmosAnimation({
                  anchor: { y: 0 },
                  metadata: { time: Math.floor(Math.random() * 5) * 3 + frameoffset },
                  resources: content.ibcTwinklyDiamondboltRay,
                  position: { y: -29.5 },
                  rotation: 270
               })
            ],
            metadata: {
               time: 0,
               particles: CosmosUtils.populate(
                  80,
                  i =>
                     [
                        40 + Math.floor(Math.random() * 280),
                        Math.round(Math.random() * 7 - 3.5),
                        Math.random() < 0.5 ? -1 : 1,
                        Math.floor(i / 20)
                     ] as [number, number, number, number]
               ),
               idealrot: 0
            }
         }).on('tick', function () {
            const time = this.metadata.time;
            graphics.clear();
            if (time < 27) {
               if (time === 0) {
                  this.metadata.idealrot = hypervisor.random.next() < 0.5 ? 90 : -90;
                  const oth = Object.entries(hyper_bullet_storage.entries).filter(entry => {
                     if (entry[1] === void 0 || entry[1] === this || 60 <= entry[1].metadata.time) {
                        return false;
                     }
                     const [ name, index ] = entry[0].split('/');
                     if (name !== 'diamondbolt' || hypervisor.time < +index) {
                        return false;
                     }
                     return true;
                  }) as [string, CosmosObject][];
                  const dbv1 = hyper.bullet_dbv.filter(value => {
                     if (
                        10 <= Math.abs(battler.SOUL.position.x - value[0]) &&
                        10 <= Math.abs(battler.SOUL.position.y - value[1])
                     ) {
                        const ext = battler.SOUL.position.extentOf(value[0], value[1]);
                        if (30 <= ext && ext <= 70) {
                           return (
                              oth.filter(
                                 entry =>
                                    Math.abs(entry[1].position.x - value[0]) < 10 ||
                                    Math.abs(entry[1].position.y - value[1]) < 10 ||
                                    entry[1].position.extentOf(value[0], value[1]) < 30
                              ).length === 0
                           );
                        }
                     }
                     return false;
                  });
                  if (dbv1.length !== 0) {
                     const pos = dbv1[hypervisor.random.int(dbv1.length)];
                     this.position.set(pos[0], pos[1]);
                  } else {
                     const dbv2 = hyper.bullet_dbv.filter(value => {
                        if (
                           8 <= Math.abs(battler.SOUL.position.x - value[0]) &&
                           8 <= Math.abs(battler.SOUL.position.y - value[1])
                        ) {
                           const ext = battler.SOUL.position.extentOf(value[0], value[1]);
                           if (30 <= ext && 110 <= ext) {
                              return (
                                 oth.filter(
                                    entry =>
                                       Math.abs(entry[1].position.x - value[0]) < 8 ||
                                       Math.abs(entry[1].position.y - value[1]) < 8 ||
                                       entry[1].position.extentOf(value[0], value[1]) < 25
                                 ).length === 0
                              );
                           }
                        }
                        return false;
                     });
                     if (dbv2.length !== 0) {
                        const pos = dbv2[hypervisor.random.int(dbv2.length)];
                        this.position.set(pos[0], pos[1]);
                     } else {
                        this.position.set(battler.SOUL);
                     }
                  }
               }
               this.alpha.value = 1;
               for (const subobj of this.objects) {
                  if (subobj instanceof CosmosHitbox) {
                     subobj.metadata.bullet = false;
                  } else {
                     subobj.alpha.value = 0;
                  }
               }
               const ext = CosmosMath.bezier(time / 27, 0, 0, 50);
               const sz = (time / 27) * 30;
               graphics.beginFill(0xcf0000, time / 27);
               for (const particle of this.metadata.particles) {
                  switch (particle[3]) {
                     case 0:
                        graphics.drawRect(particle[0] + ext * particle[2] - sz / 2, particle[1] - 0.5, sz, 1);
                        break;
                     case 1:
                        graphics.drawRect(particle[1] - 0.5, particle[0] + ext * particle[2] - sz / 2, 1, sz);
                        break;
                     case 2:
                        graphics.drawRect(-(particle[0] + ext * particle[2]) - sz / 2, particle[1] - 0.5, sz, 1);
                        break;
                     case 3:
                        graphics.drawRect(particle[1] - 0.5, -(particle[0] + ext * particle[2]) - sz / 2, 1, sz);
                        break;
                  }
               }
               graphics.endFill();
            } else if (time < 78) {
               this.alpha.value = 1;
               for (const subobj of this.objects) {
                  if (subobj instanceof CosmosHitbox) {
                     subobj.metadata.bullet = true;
                  } else {
                     subobj.alpha.value = 1;
                  }
               }
               if (time === 27) {
                  hypervisor.instance({ daemon: sounds.lightningstrike });
               }
            } else {
               this.alpha.value = 0.7 - ((time - 78) / 12) * 0.7;
               for (const subobj of this.objects) {
                  if (subobj instanceof CosmosHitbox) {
                     subobj.metadata.bullet = false;
                  } else {
                     subobj.alpha.value = 1;
                  }
               }
            }
            if (time < 54) {
               this.rotation.value = 0;
               this.scale.set(1);
            } else if (time < 78) {
               this.rotation.value = this.metadata.idealrot * CosmosMath.bezier((time - 54) / 24, 0, 0, 1, 1);
               this.scale.set(1);
            } else {
               this.rotation.value = this.metadata.idealrot;
               this.scale.set(1 + CosmosMath.remap((time - 78) / 12, 0, 0, 0.5));
            }
         });
         object.container.addChild(graphics);
         return object;
      });
      object.metadata.time = time;
      return { active: time < 90, object, shake: time < 27 || time > 42 ? 0 : (1 - (time - 27) / 15) * 2 };
   },
   warpstar (index: number, time: number) {
      const object = hyper_bullet_storage.of(`warpstar/${index}`, () => {
         return new CosmosHitbox<
            ShootableEvents,
            {
               time: number;
               position: CosmosPoint;
               shot_time: number;
               shootable: boolean;
               rotdir: number;
            }
         >({
            priority: 7,
            anchor: 0,
            metadata: {
               time: 0,
               position: new CosmosPoint(),
               shootable: true,
               shot_time: 25,
               rotdir: 0
            },
            rotation: 45,
            size: 24,
            objects: [
               new CosmosAnimation({
                  anchor: 0,
                  rotation: -45,
                  metadata: { time: Math.floor(Math.random() * 15) },
                  resources: content.ibcTwinklyWarpstar
               }),
               new CosmosHitbox({
                  anchor: 0,
                  size: { x: 5, y: 33 },
                  rotation: -45,
                  metadata: { bullet: true, damage: 1 }
               }),
               new CosmosHitbox({
                  anchor: 0,
                  size: { x: 33, y: 5 },
                  rotation: -45,
                  metadata: { bullet: true, damage: 1 }
               })
            ]
         })
            .on('tick', async function () {
               const time = this.metadata.time;
               if (time === 0) {
                  this.metadata.shot_time = 30;
                  if (hyper.sounder.arrow < renderer.time - 50) {
                     hyper.sounder.arrow = renderer.time;
                     hypervisor.instance({ daemon: sounds.arrow, rate: 0.75 });
                  }
                  this.metadata.position.set(
                     pastScreen(
                        20,
                        battler.SOUL.position.x < 150
                           ? 1
                           : battler.SOUL.position.x < 170
                           ? hypervisor.random.next() < 0.5
                              ? 1
                              : 3
                           : 3,
                        hypervisor.random.next() * 0.3 + 0.4
                     ).position
                  );
                  this.metadata.rotdir = hypervisor.random.next() < 0.5 ? 1 : -1;
               }
               if (time < this.metadata.shot_time) {
                  this.metadata.shot_time = 30;
                  this.position.set(
                     CosmosMath.remap(time / 30, this.metadata.position.x, battler.SOUL.position.x),
                     CosmosMath.remap(time / 30, this.metadata.position.y, battler.SOUL.position.y)
                  );
                  this.alpha.value = 1;
                  this.scale.set(1);
                  this.rotation.value = 45;
                  for (const b of this.objects) {
                     b instanceof CosmosHitbox && (b.metadata.bullet = true);
                  }
               } else {
                  const p = CosmosMath.bezier(Math.min((time - this.metadata.shot_time) / 10, 1), 0, 1, 1);
                  this.alpha.value = 1 - p;
                  this.scale.set(1 + p * 2);
                  this.rotation.value = 45 + p * 45 * this.metadata.rotdir;
                  for (const b of this.objects) {
                     b instanceof CosmosHitbox && (b.metadata.bullet = false);
                  }
               }
            })
            .on('shot', function () {
               if (this.metadata.time < this.metadata.shot_time) {
                  this.metadata.shot_time = this.metadata.time;
                  if (hyper.sounder.bomb < renderer.time - 50) {
                     hyper.sounder.bomb = renderer.time;
                     hypervisor.instance({ daemon: sounds.bomb });
                  }
               }
            });
      });
      object.metadata.time = time;
      return {
         active: time < 40,
         object,
         shake:
            object.metadata.time < object.metadata.shot_time
               ? 0
               : Math.max(1 - (object.metadata.time - object.metadata.shot_time) / 15, 0) * 2
      };
   },
   platform_fixed (index: number, time: number) {
      return hyper_bullets.platform(index, time, true);
   },
   platform (index: number, time: number, fixed = false) {
      const object = hyper_bullet_storage.of('wormhole/0', () => {
         return new CosmosHitbox({
            priority: 2,
            anchor: { x: 0 },
            metadata: {
               damage: 1,
               bullet: false,
               platforms: {} as CosmosKeyed<
                  CosmosObject<
                     CosmosBaseEvents,
                     { platform: number | void; time: number; uptime: number; fixed: boolean }
                  >
               >
            },
            size: { x: 640, y: 10 },
            position: { x: 160, y: 240 },
            objects: [
               new CosmosAnimation({
                  resources: content.ibcTwinklyWormhole,
                  metadata: { time: Math.floor(Math.random() * 15) },
                  anchor: { x: 0, y: 1 }
               })
            ]
         }).on('tick', function () {
            const platforms = Object.values(this.metadata.platforms).filter(p => p.metadata.uptime <= hypervisor.time);
            const times = platforms.map(p => p.metadata.time);
            const maxTime = Math.max(...times);
            if (maxTime < 20) {
               if (maxTime === 0) {
                  this.position.x = Math.min(Math.max(battler.SOUL.position.x, 80), 240);
               }
               this.alpha.value = maxTime / 20;
               this.metadata.bullet = true;
            } else {
               const minTime = Math.min(...times);
               if (minTime < 55) {
                  this.alpha.value = 1;
                  this.metadata.bullet = true;
               } else {
                  this.alpha.value = 1 - Math.min((minTime - 55) / 20, 1);
                  this.metadata.bullet = false;
               }
            }
            this.detach(...this.objects.slice(1).filter(obj => !platforms.includes(obj as any)));
            this.attach(...platforms);
            if (battler.SOUL.metadata.color === 'blue') {
               if (battler.SOUL.position.x > this.position.x + 50) {
                  battler.SOUL.position.x -= (battler.SOUL.position.x - (this.position.x + 50)) / 10;
               } else if (battler.SOUL.position.x < this.position.x - 50) {
                  battler.SOUL.position.x += (this.position.x - 50 - battler.SOUL.position.x) / 10;
               }
            }
            for (const p of platforms) {
               if (p.metadata.time === 0) {
                  p.position.x = p.metadata.fixed
                     ? battler.SOUL.position.x - this.position.x
                     : hypervisor.random.next() * 70 - 35;
               }
               p.alpha.value = Math.min(p.metadata.time / 5, 1);
               const y = (1 - p.metadata.time / 75) * -60;
               p.position.y = y;
               p.metadata.platform =
                  battler.SOUL.position.y <= 237 + y &&
                  Math.abs(battler.SOUL.position.x - (this.position.x + p.position.x)) <= 15
                     ? 237 + y
                     : void 0;
            }
         });
      });
      if (time < 75) {
         time === 0 && object.tick();
         const obj = (object.metadata.platforms[index] ??= new CosmosHitbox({
            metadata: { fixed, platform: void 0, time: 0, uptime: 0 },
            objects: [ new CosmosSprite({ anchor: { x: 0 }, frames: [ content.ibcTwinklyPlatform ] }) ]
         }));
         obj.metadata.time = time;
         obj.metadata.uptime = hypervisor.time - time;
      } else {
         delete object.metadata.platforms[index];
      }
      return {
         active: Math.min(...Object.values(object.metadata.platforms).map(value => value.metadata.time)) < 75,
         object,
         shake: 0
      };
   },
   orbiter (index: number, time: number) {
      const object = hyper_bullet_storage.of(`orbiter/${index}`, () => {
         return new CosmosHitbox({
            priority: 3,
            anchor: 0,
            size: 14,
            metadata: {
               damage: 1,
               time: 0,
               bullet: true,
               iterations: 0,
               side: 0,
               power: 0,
               lineTime: 0,
               linePos: { x: 0, y: 0 }
            },
            objects: [
               new CosmosHitbox({
                  size: 10,
                  anchor: 0,
                  metadata: { damage: 1, bullet: true },
                  objects: [
                     new CosmosAnimation({
                        anchor: 0,
                        metadata: { time: Math.floor(Math.random() * 15) },
                        resources: content.ibcTwinklyOrbiterExtra
                     })
                  ]
               }),
               new CosmosHitbox({
                  size: 10,
                  anchor: 0,
                  metadata: { damage: 1, bullet: true },
                  objects: [
                     new CosmosAnimation({
                        anchor: 0,
                        metadata: { time: Math.floor(Math.random() * 15) },
                        resources: content.ibcTwinklyOrbiterExtra
                     })
                  ]
               }),
               new CosmosHitbox({
                  size: 10,
                  anchor: 0,
                  metadata: { damage: 1, bullet: true },
                  objects: [
                     new CosmosAnimation({
                        anchor: 0,
                        metadata: { time: Math.floor(Math.random() * 15) },
                        resources: content.ibcTwinklyOrbiterExtra
                     })
                  ]
               }),
               new CosmosHitbox({
                  size: 10,
                  anchor: 0,
                  metadata: { damage: 1, bullet: true },
                  objects: [
                     new CosmosAnimation({
                        anchor: 0,
                        metadata: { time: Math.floor(Math.random() * 15) },
                        resources: content.ibcTwinklyOrbiterExtra
                     })
                  ]
               }),
               new CosmosAnimation({
                  anchor: 0,
                  metadata: { time: Math.floor(Math.random() * 15) },
                  resources: content.ibcTwinklyOrbiterMid
               })
            ]
         }).on('tick', function () {
            const time = this.metadata.time;
            if (time === 0) {
               this.metadata.lineTime = 300;
               const it = CosmosMath.weigh(
                  [
                     [ -2, 4 ],
                     [ -1, 3 ],
                     [ 0, 2 ],
                     [ 6, 1 ],
                     [ 7, 1 ],
                     [ 8, 1 ],
                     [ 9, 1 ]
                  ],
                  hypervisor.random.next()
               )!;
               this.metadata.iterations = battler.line.iterations - it;
               this.metadata.side =
                  it < 6 && battler.SOUL.position.x < 130
                     ? 1
                     : it < 6 && battler.SOUL.position.x > 190
                     ? 0
                     : hypervisor.random.int(2);
               this.metadata.power = hypervisor.random.next();
            }
            const r = 20;
            const v = 3.5 + this.metadata.power;
            const { x, y } = CosmosMath.ray(
               Math.round(time * ((v * 360) / (Math.PI * 2 * r)) * [ 1, -1 ][this.metadata.side]),
               r
            );
            this.objects[0].position.set(x, y);
            this.objects[1].position.set(-y, x);
            this.objects[2].position.set(-x, -y);
            this.objects[3].position.set(y, -x);
            if (battler.line.active && time < this.metadata.lineTime) {
               this.metadata.lineTime = 300;
               this.metadata.bullet = true;
               for (const object of this.objects) {
                  if (object instanceof CosmosHitbox) {
                     object.metadata.bullet = true;
                  }
               }
               if (this.metadata.side === 0) {
                  this.position.x = -40 + time * v;
               } else {
                  this.position.x = 360 - time * v;
               }
               this.position.y = 237 + battler.line.offset + (battler.line.iterations - this.metadata.iterations) * -20;
               this.metadata.linePos.x = this.position.x;
               this.metadata.linePos.y = this.position.y;
               this.alpha.value = 1;
               this.scale.set(1);
            } else {
               if (this.metadata.lineTime > time) {
                  this.metadata.lineTime = time;
               }
               this.metadata.bullet = false;
               for (const object of this.objects) {
                  if (object instanceof CosmosHitbox) {
                     object.metadata.bullet = false;
                  }
               }
               this.position.set(this.metadata.linePos);
               const p = Math.min((time - this.metadata.lineTime) / 15, 1);
               this.alpha.value = 1 - p;
               this.scale.set(1 + p / 2);
            }
         });
      });
      object.metadata.time = time;
      return { active: object.metadata.time < 300, object, shake: 0 };
   },
   rotater (index: number, time: number) {
      const object = hyper_bullet_storage.of(`rotater/${index}`, () => {
         const graphics = new Graphics();
         const object = new CosmosObject({
            priority: 6,
            metadata: {
               time: 0,
               to: 0,
               inside: false,
               particles: CosmosUtils.populate(
                  15,
                  () =>
                     [
                        50 + Math.floor(Math.random() * 330),
                        Math.round(Math.random() * 6 - 3),
                        Math.random() < 0.5 ? -1 : 1
                     ] as [number, number, number]
               )
            },
            objects: [
               new CosmosAnimation({
                  anchor: 0,
                  metadata: { time: Math.floor(Math.random() * 15) },
                  resources: content.ibcTwinklyRotater
               }),
               new CosmosAnimation({
                  anchor: 0,
                  metadata: { time: Math.floor(Math.random() * 15) },
                  resources: content.ibcTwinklyRotaterBeam
               })
            ]
         }).on('tick', function () {
            const time = this.metadata.time;
            graphics.clear();
            if (time < 105) {
               if (index === 0) {
                  this.position.set(battler.SOUL);
               } else if (time === 0) {
                  const dbv = hyper.bullet_dbv.filter(
                     battler.SOUL.metadata.color === 'cyan'
                        ? value => {
                             const ext = battler.shadow.position.extentOf(value[0], value[1]);
                             return 80 <= ext && ext < 160;
                          }
                        : battler.SOUL.metadata.color === 'orange'
                        ? value => {
                             const ext = battler.SOUL.position.extentOf(value[0], value[1]);
                             return 30 <= ext && ext < 60;
                          }
                        : value => {
                             const ext = battler.SOUL.position.extentOf(value[0], value[1]);
                             return 40 <= ext && ext < 80;
                          }
                  );
                  const pos = dbv[hypervisor.random.int(dbv.length)];
                  this.position.set(pos[0], pos[1]);
               }
               this.metadata.inside = false;
               if (time % 20 < 10) {
                  this.alpha.value = 0.25;
               } else {
                  this.alpha.value = 0;
               }
               this.scale.set(1);
               this.objects[1].alpha.value = 0;
               this.rotation.value = 270;
            } else if (time < 120) {
               if (time === 105) {
                  if (this.position.extentOf(battler.SOUL) < 18) {
                     this.metadata.inside = true;
                     SAVE.data.n.hp = Math.min(SAVE.data.n.hp + 1, hyper.hp_max());
                     hypervisor.instance({ daemon: sounds.heal });
                  } else {
                     const fr = 270;
                     const to = this.position.angleTo(battler.SOUL);
                     this.metadata.to =
                        fr +
                        [ to - fr, to + 360 - fr, to - 360 - fr, to + 720 - fr, to - 720 - fr ].sort(
                           (a, b) => Math.abs(a) - Math.abs(b)
                        )[0];
                     hypervisor.instance({ daemon: sounds.noise });
                  }
               }
               if (this.metadata.inside) {
                  const v = 1 - (time - 105) / 15;
                  this.alpha.value = v * 0.25;
                  this.scale.set(1.5 - v * 0.5);
                  this.objects[1].alpha.value = 0;
                  this.rotation.value = 270;
               } else {
                  this.alpha.value = 1;
                  this.scale.set(1);
                  this.objects[1].alpha.value = 0;
                  this.rotation.value = CosmosMath.remap(
                     CosmosMath.bezier((time - 105) / 15, 0, 0, 1, 1),
                     270,
                     this.metadata.to
                  );
               }
            } else if (this.metadata.inside) {
               this.alpha.value = 0;
               this.scale.set(1);
               this.objects[1].alpha.value = 0;
               this.rotation.value = 270;
            } else if (time < 130) {
               const v = (time - 120) / 10;
               const ext = CosmosMath.bezier(v, 0, 0, 50);
               const sz = v * 30;
               graphics.beginFill(0xcf0000, v);
               for (const particle of this.metadata.particles) {
                  graphics.drawRect(Math.max(particle[0] + ext * particle[2], 30) - sz / 2, particle[1] - 0.5, sz, 1);
               }
               graphics.endFill();
               this.alpha.value = 1;
               this.scale.set(1);
               this.objects[1].alpha.value = 0;
               this.rotation.value = this.metadata.to;
            } else if (time < 140) {
               this.alpha.value = 1;
               this.scale.set(1);
               this.objects[1].alpha.value = 1;
               this.rotation.value = this.metadata.to;
               if (time === 130) {
                  hypervisor.instance({ daemon: sounds.specout, rate: 1.5 });
                  hypervisor.instance({
                     daemon: new CosmosDaemon(content.avAsriel3, {
                        context,
                        gain: 0.75,
                        rate: 1.2 * 1.5,
                        router: soundRouter
                     })
                  });
               }
               if (battler.invulnerable === 0) {
                  battler.damage(1);
               }
            } else {
               this.alpha.value = 1 - (this.metadata.time - 140) / 10;
               this.scale.set(1);
               this.objects[1].alpha.value = 1;
               this.rotation.value = this.metadata.to;
            }
         });
         object.container.addChild(graphics);
         return object;
      });
      object.metadata.time = time;
      return {
         active: object.metadata.time < 150,
         object,
         shake: object.metadata.inside || time < 130 || time > 145 ? 0 : (1 - (time - 130) / 15) * 2
      };
   },
   shotstar (index: number, time: number) {
      const object = hyper_bullet_storage.of(`shotstar/${index}`, () => {
         const rail1 = new CosmosHitbox({
            anchor: { y: 0 },
            size: { x: 320, y: 6 },
            metadata: { bullet: true, damage: 1 },
            objects: [
               new CosmosAnimation({
                  anchor: { x: 1, y: 0 },
                  resources: content.ibcTwinklyRotaterBeam,
                  metadata: { time: Math.floor(Math.random() * 15) }
               })
            ]
         });
         const rail2 = new CosmosHitbox({
            anchor: { x: 1, y: 0 },
            size: { x: 320, y: 6 },
            metadata: { bullet: true, damage: 1 },
            objects: [
               new CosmosAnimation({
                  anchor: { x: 1, y: 0 },
                  scale: { x: -1 },
                  resources: content.ibcTwinklyRotaterBeam,
                  metadata: { time: Math.floor(Math.random() * 15) }
               })
            ]
         });
         const star = new CosmosHitbox<ShootableEvents, { shootable: boolean; bullet: boolean; damage: number }>({
            size: 26,
            anchor: 0,
            metadata: { shootable: true, bullet: true, damage: 1 },
            objects: [
               new CosmosAnimation({
                  anchor: 0,
                  metadata: { time: Math.floor(Math.random() * 15) },
                  resources: content.ibcTwinklyShotstar
               })
            ]
         }).on('shot', function () {
            hypervisor.instance({ daemon: sounds.hit });
            object.metadata.shots.push(object.metadata.time);
            this.metadata.shootable = object.metadata.shots.length < 3;
         });
         const object = new CosmosObject({
            priority: 9,
            metadata: { rotdir: 0, shots: [] as number[], time: 0, sploded: 150 },
            objects: [ rail1, rail2, star ]
         }).on('tick', function () {
            const time = this.metadata.time;
            if (time === 0) {
               this.metadata.rotdir = hypervisor.random.next() < 0.5 ? -1 : 1;
               this.position.x =
                  (battler.SOUL.position.x < 155 || (battler.SOUL.position.x <= 165 && hypervisor.random.next() < 0.5)
                     ? 30
                     : 210) +
                  hypervisor.random.next() * 80;
            }
            this.position.y = -20 + time * 2;
            this.metadata.shots.splice(
               0,
               this.metadata.shots.length,
               ...this.metadata.shots.filter(time => time <= this.metadata.time)
            );
            star.metadata.shootable = this.metadata.shots.length < 3;
            if (star.metadata.shootable) {
               this.metadata.sploded = 150;
            } else if (this.metadata.sploded > time) {
               this.metadata.sploded = time;
            }
            const rand =
               this.metadata.shots.length === 0
                  ? 0
                  : (1 - Math.min((time - this.metadata.shots[this.metadata.shots.length - 1]) / 15, 1)) * 2;
            star.objects[0].offsets[0].set((Math.random() * 2 - 1) * rand, (Math.random() * 2 - 1) * rand);
            star.rotation.value = Math.min(time, this.metadata.sploded) * this.metadata.rotdir * 4;
            if (time < this.metadata.sploded) {
               star.metadata.bullet = true;
               star.alpha.value = 1;
               star.scale.set(1);
               rail1.position.x = 0;
               rail2.position.x = 0;
            } else {
               star.rotation.value += (time - this.metadata.sploded) * this.metadata.rotdir * 8;
               const subtime = time - this.metadata.sploded;
               if (subtime < 6) {
                  star.alpha.value = 1;
                  star.scale.set(1 - subtime / 6);
                  rail1.position.x = 0;
                  rail2.position.x = 0;
                  star.metadata.bullet = false;
               } else {
                  const subsubtime = subtime - 6;
                  if (subsubtime < 18) {
                     if (subsubtime === 0) {
                        hypervisor.instance({ daemon: sounds.boom });
                     }
                     star.alpha.value = 1 - CosmosMath.bezier(subsubtime / 18, 0, 0, 1);
                     star.scale.set(CosmosMath.bezier(subsubtime / 18, 0, 2, 2, 0));
                     if (subsubtime < 3) {
                        rail1.position.x = 0;
                        rail2.position.x = 0;
                     } else {
                        if (subsubtime === 3) {
                           hypervisor.instance({ daemon: sounds.node, rate: 2 });
                        }
                        rail1.position.x = ((subsubtime - 3) / 15) * -640;
                        rail2.position.x = ((subsubtime - 3) / 15) * 640;
                     }
                     star.metadata.bullet = true;
                  } else {
                     star.alpha.value = 0;
                     star.scale.set(0);
                     rail1.position.x = -640;
                     rail2.position.x = 640;
                     star.metadata.bullet = false;
                  }
               }
            }
         });
         return object;
      });
      object.metadata.time = time;
      return {
         active: object.metadata.time < 150,
         object,
         shake:
            time < object.metadata.sploded || time > object.metadata.sploded + 15
               ? 0
               : (1 - (time - object.metadata.sploded) / 15) * 2
      };
   }
};

export const hyper_build_phase = (
   options: {
      color: HyperColor;
      daemon: CosmosDaemon;
      duration: number;
      load_max: number;
      load_max_total: number;
      load_next_min: number;
      load_next_max: number;
   },
   sequence: (
      save: () => void,
      pause: (dur: number) => void,
      bullet: (type: keyof typeof hyper_bullets) => number,
      color: (type: HyperColor) => void,
      time: (val: number) => void
   ) => void
) => {
   let time = 0;
   const phase = {
      color: [ { time: -15, type: options.color } ],
      daemon: options.daemon,
      pattern: [] as { time: number; type: keyof typeof hyper_bullets }[],
      duration: options.duration,
      load_max: options.load_max,
      load_max_total: options.load_max_total,
      load_next_min: options.load_next_min,
      load_next_max: options.load_next_max,
      save_times: [] as number[]
   };
   sequence(
      () => phase.save_times.push(time),
      dur => (time += Math.round(dur / CosmosMath.FRAME)),
      type => {
         phase.pattern.push({ time, type });
         return Math.round(time * CosmosMath.FRAME);
      },
      type => phase.color.unshift({ time, type }),
      val => (time = Math.round(val / CosmosMath.FRAME))
   );
   return phase;
};

export const hyper_phases = [
   hyper_build_phase(
      {
         /** initial color */
         color: 'red',
         /** phase music */
         daemon: music.sng1,
         /** phase duration */
         duration: 1021,
         /** max relative load time */
         load_max: Math.round(hyper.div246 * 32 * 30),
         /** max absolute load time */
         load_max_total: 45 * 30,
         /** min time to next load */
         load_next_min: 5 * 30,
         /** max time to next load */
         load_next_max: 15 * 30
      },
      (save, pause, bullet) => {
         pause(200);
         bullet('sunbeam');
         pause(600);
         bullet('sunbeam');
         pause(600);
         bullet('sunbeam');
         pause(600);
         bullet('sunbeam');
         pause(1200);
         save();
         bullet('sunring_orange');
         pause(200);
         bullet('sunring_orange');
         pause(200);
         bullet('sunring_orange');
         pause(1200);
         bullet('sunball');
         pause(600);
         bullet('sunball');
         pause(600);
         bullet('sunball');
         pause(600);
         bullet('sunball');
         pause(600);
         bullet('sunball');
         pause(600);
         bullet('sunball');
         pause(1400);
         save();
         bullet('sunbeam');
         pause(800);
         bullet('sunbeam');
         pause(1200);
         bullet('sunbeam');
         pause(800);
         bullet('sunball');
         bullet('sunring_orange');
         pause(600);
         bullet('sunball');
         pause(200);
         bullet('sunring_orange');
         pause(400);
         bullet('sunball');
         pause(400);
         bullet('sunring_orange');
         pause(200);
         save();
         bullet('sunball');
         pause(600);
         bullet('sunball');
         bullet('sunring_blue');
         pause(600);
         bullet('sunball');
         pause(200);
         bullet('sunring_blue');
         pause(800);
         bullet('sunbeam');
         pause(600);
         bullet('sunbeam');
         pause(600);
         bullet('sunbeam');
         pause(600);
         bullet('sunbeam');
         pause(600);
         bullet('sunbeam');
         pause(600);
         bullet('sunbeam');
         pause(1200);
         save();
         bullet('sunring_orange');
         pause(200);
         bullet('sunball');
         bullet('sunring_orange');
         pause(800);
         bullet('sunball');
         bullet('sunring_blue');
         pause(1200);
         bullet('sunring_orange');
         pause(200);
         bullet('sunball');
         bullet('sunring_orange');
         pause(800);
         bullet('sunball');
         bullet('sunring_blue');
         pause(1200);
         bullet('sunball');
         pause(400);
         bullet('sunbeam');
         pause(200);
         bullet('sunball');
         pause(600);
         bullet('sunbeam');
         pause(200);
         bullet('sunball');
         pause(600);
         bullet('sunbeam');
         pause(200);
         bullet('sunball');
         pause(600);
         bullet('sunbeam');
         pause(200);
         bullet('sunball');
         pause(600);
         bullet('sunbeam');
         pause(200);
         bullet('sunball');
         pause(600);
         bullet('sunbeam');
      }
   ),
   hyper_build_phase(
      {
         color: 'cyan',
         daemon: music.sng3,
         duration: 1021,
         load_max: Math.round(hyper.div246 * 32 * 30),
         load_max_total: 45 * 30,
         load_next_min: 7 * 30,
         load_next_max: 17 * 30
      },
      (save, pause, bullet, color) => {
         pause(400);
         bullet('diamondbolt');
         pause(1600);
         save();
         bullet('diamondbolt');
         pause(1600);
         bullet('diamondbolt');
         pause(2400);
         color('red');
         pause(400);
         save();
         bullet('sunbeam');
         bullet('sunring_blue');
         pause(200);
         bullet('sunring_blue');
         pause(200);
         bullet('sunring_blue');
         pause(1600);
         bullet('sunbeam');
         pause(600);
         bullet('sunbeam');
         pause(600);
         bullet('sunbeam');
         pause(800);
         bullet('sunbeam');
         pause(1000);
         save();
         pause(400);
         color('cyan');
         pause(400);
         bullet('diamondbolt');
         pause(1600);
         bullet('diamondbolt');
         pause(2000);
         bullet('sunring_orange');
         pause(400);
         bullet('sunring_orange');
         pause(200);
         color('red');
         pause(200);
         save();
         bullet('sunring_orange');
         pause(400);
         bullet('sunring_orange');
         pause(1800);
         bullet('sunring_blue');
         pause(200);
         bullet('sunring_blue');
         pause(200);
         bullet('sunring_blue');
         pause(1400);
         bullet('sunball');
         pause(200);
         bullet('sunball');
         pause(200);
         bullet('sunball');
         pause(200);
         bullet('sunball');
         pause(200);
         bullet('sunball');
         pause(200);
         bullet('sunball');
         pause(800);
         color('cyan');
         pause(400);
         bullet('sunbeam');
         pause(600);
         bullet('sunbeam');
         pause(800);
         bullet('diamondbolt');
         pause(1600);
         bullet('diamondbolt');
         pause(2400);
         color('red');
         pause(400);
         bullet('sunbeam');
         pause(600);
         bullet('sunbeam');
         pause(600);
         bullet('sunbeam');
         pause(800);
         bullet('sunbeam');
      }
   ),
   hyper_build_phase(
      {
         color: 'orange',
         daemon: music.sng5,
         duration: 1021,
         load_max: Math.round(hyper.div246 * 32 * 30),
         load_max_total: 45 * 30,
         load_next_min: 9 * 30,
         load_next_max: 19 * 30
      },
      (save, pause, bullet, color) => {
         pause(400);
         bullet('warpstar');
         bullet('warpstar');
         bullet('warpstar');
         pause(1200);
         save();
         bullet('warpstar');
         bullet('warpstar');
         bullet('warpstar');
         pause(1200);
         bullet('warpstar');
         bullet('warpstar');
         bullet('warpstar');
         pause(1200);
         pause(400);
         color('red');
         bullet('sunbeam');
         pause(800);
         bullet('sunbeam');
         pause(800);
         bullet('sunring_blue');
         pause(200);
         bullet('sunring_blue');
         pause(200);
         bullet('sunring_blue');
         pause(1600);
         color('cyan');
         pause(800);
         save();
         bullet('diamondbolt');
         pause(1600);
         bullet('diamondbolt');
         pause(2400);
         color('orange');
         pause(200);
         bullet('warpstar');
         bullet('warpstar');
         bullet('warpstar');
         pause(1200);
         bullet('warpstar');
         bullet('warpstar');
         bullet('warpstar');
         pause(1200);
         bullet('warpstar');
         bullet('warpstar');
         bullet('warpstar');
         pause(800);
         color('cyan');
         pause(200);
         save();
         bullet('sunball');
         pause(600);
         bullet('sunball');
         pause(600);
         bullet('sunball');
         pause(1200);
         color('red');
         bullet('sunring_blue');
         pause(400);
         bullet('sunring_orange');
         pause(1200);
         bullet('sunring_blue');
         pause(400);
         bullet('sunring_orange');
         pause(1800);
         color('orange');
         pause(400);
         save();
         pause(400);
         bullet('warpstar');
         bullet('warpstar');
         bullet('warpstar');
         pause(1200);
         bullet('warpstar');
         bullet('warpstar');
         bullet('warpstar');
         pause(600);
         bullet('warpstar');
         bullet('warpstar');
         bullet('warpstar');
         pause(1200);
         bullet('warpstar');
         bullet('warpstar');
         bullet('warpstar');
         pause(1200);
         color('red');
         pause(600);
         bullet('sunball');
         bullet('sunring_blue');
         pause(1200);
         bullet('sunball');
         bullet('sunring_blue');
      }
   ),
   hyper_build_phase(
      {
         color: 'blue',
         daemon: music.sng7,
         duration: 1021,
         load_max: Math.round(hyper.div246 * 32 * 30),
         load_max_total: 45 * 30,
         load_next_min: 11 * 30,
         load_next_max: 21 * 30
      },
      (save, pause, bullet, color) => {
         bullet('sunring_orange');
         bullet('platform_fixed');
         pause(800);
         bullet('platform');
         pause(1200);
         bullet('sunring_orange');
         bullet('platform');
         pause(1200);
         bullet('platform');
         pause(1000);
         bullet('platform');
         pause(800);
         color('orange');
         pause(200);
         save();
         bullet('sunball');
         pause(400);
         bullet('sunball');
         bullet('warpstar');
         pause(100);
         bullet('warpstar');
         pause(400);
         bullet('sunball');
         pause(400);
         bullet('sunball');
         bullet('warpstar');
         pause(100);
         bullet('warpstar');
         pause(1200);
         color('cyan');
         bullet('diamondbolt');
         pause(1600);
         bullet('diamondbolt');
         pause(2200);
         save();
         pause(400);
         color('blue');
         bullet('sunring_orange');
         bullet('platform_fixed');
         pause(1200);
         bullet('platform');
         pause(1200);
         bullet('platform');
         pause(800);
         bullet('sunring_orange');
         bullet('platform');
         pause(800);
         bullet('platform');
         pause(1000);
         bullet('platform');
         pause(800);
         color('red');
         pause(200);
         save();
         bullet('sunbeam');
         pause(800);
         bullet('sunbeam');
         pause(600);
         bullet('sunbeam');
         pause(400);
         bullet('sunring_blue');
         pause(400);
         color('orange');
         pause(400);
         bullet('warpstar');
         bullet('sunring_blue');
         pause(100);
         bullet('warpstar');
         pause(700);
         bullet('sunring_blue');
         pause(100);
         bullet('warpstar');
         pause(100);
         bullet('warpstar');
         pause(800);
         save();
         pause(200);
         color('cyan');
         bullet('diamondbolt');
         pause(2600);
         color('blue');
         bullet('sunring_orange');
         bullet('platform_fixed');
         pause(800);
         bullet('platform');
         pause(1000);
         bullet('platform');
         pause(800);
         bullet('platform');
         pause(1200);
         color('red');
         bullet('sunring_orange');
         pause(200);
         bullet('sunring_orange');
         pause(200);
         bullet('sunring_orange');
         pause(200);
         bullet('sunring_orange');
      }
   ),
   hyper_build_phase(
      {
         color: 'purple',
         daemon: music.sng9,
         duration: 1021,
         load_max: Math.round(hyper.div246 * 32 * 30),
         load_max_total: 45 * 30,
         load_next_min: 13 * 30,
         load_next_max: 23 * 30
      },
      (save, pause, bullet, color) => {
         bullet('orbiter');
         pause(200);
         bullet('orbiter');
         pause(200);
         bullet('sunring_blue');
         pause(200);
         bullet('orbiter');
         pause(200);
         bullet('orbiter');
         pause(400);
         bullet('orbiter');
         pause(1200);
         save();
         bullet('orbiter');
         pause(200);
         bullet('orbiter');
         pause(200);
         bullet('sunring_blue');
         pause(200);
         bullet('orbiter');
         pause(200);
         bullet('orbiter');
         pause(400);
         bullet('orbiter');
         pause(1600);
         save();
         color('blue');
         bullet('sunring_orange');
         bullet('platform_fixed');
         pause(800);
         bullet('platform');
         pause(1000);
         bullet('platform');
         pause(1200);
         bullet('platform');
         pause(1200);
         color('cyan');
         bullet('diamondbolt');
         pause(1600);
         bullet('diamondbolt');
         pause(2000);
         color('orange');
         bullet('warpstar');
         bullet('warpstar');
         bullet('warpstar');
         pause(600);
         bullet('warpstar');
         bullet('warpstar');
         bullet('warpstar');
         pause(600);
         bullet('warpstar');
         bullet('warpstar');
         bullet('warpstar');
         pause(1200);
         color('red');
         pause(200);
         save();
         bullet('sunbeam');
         pause(800);
         bullet('sunbeam');
         pause(1400);
         color('orange');
         bullet('warpstar');
         bullet('warpstar');
         bullet('warpstar');
         pause(600);
         bullet('warpstar');
         bullet('warpstar');
         bullet('warpstar');
         pause(1000);
         save();
         pause(200);
         color('purple');
         bullet('orbiter');
         pause(200);
         bullet('orbiter');
         pause(200);
         bullet('sunring_blue');
         pause(1600);
         bullet('orbiter');
         pause(200);
         bullet('orbiter');
         pause(200);
         bullet('sunring_blue');
         pause(1600);
         bullet('orbiter');
         pause(200);
         bullet('orbiter');
         pause(200);
         bullet('sunring_blue');
         pause(1600);
         bullet('orbiter');
         pause(200);
         bullet('orbiter');
         pause(200);
         bullet('orbiter');
         pause(200);
         bullet('orbiter');
         pause(1000);
         color('red');
         pause(400);
         bullet('sunball');
         pause(600);
         bullet('sunball');
         pause(800);
         bullet('sunball');
         pause(800);
         bullet('sunball');
      }
   ),
   hyper_build_phase(
      {
         color: 'green',
         daemon: music.sng11,
         duration: 1021,
         load_max: Math.round(hyper.div246 * 32 * 30),
         load_max_total: 45 * 30,
         load_next_min: 15 * 30,
         load_next_max: 25 * 30
      },
      (save, pause, bullet, color, time) => {
         let rotater_time = 0;
         pause(-2666);
         bullet('rotater');
         pause(4000);
         save();
         color('red');
         bullet('sunbeam');
         pause(600);
         rotater_time = bullet('rotater');
         bullet('sunball');
         bullet('sunbeam');
         pause(600);
         bullet('sunbeam');
         pause(800);
         bullet('sunball');
         bullet('sunbeam');
         time(rotater_time + 3500);
         color('green');
         pause(300);
         save();
         pause(200);
         bullet('sunring_blue');
         time(rotater_time + 4500);
         color('orange');
         bullet('warpstar');
         bullet('warpstar');
         bullet('warpstar');
         pause(300);
         bullet('sunring_blue');
         pause(500);
         bullet('warpstar');
         bullet('warpstar');
         bullet('warpstar');
         pause(1200);
         color('cyan');
         bullet('diamondbolt');
         pause(1600);
         bullet('diamondbolt');
         pause(800);
         rotater_time = bullet('rotater');
         pause(1600);
         bullet('sunbeam');
         time(rotater_time + 3500);
         color('green');
         pause(300);
         save();
         pause(200);
         bullet('sunring_orange');
         time(rotater_time + 4500);
         color('blue');
         bullet('sunring_orange');
         bullet('platform_fixed');
         pause(1000);
         bullet('platform');
         pause(500);
         bullet('sunring_orange');
         pause(500);
         bullet('platform');
         pause(1200);
         bullet('platform');
         pause(800);
         save();
         color('purple');
         bullet('orbiter');
         pause(200);
         bullet('orbiter');
         pause(200);
         bullet('sunring_blue');
         pause(1600);
         bullet('orbiter');
         pause(200);
         bullet('orbiter');
         pause(200);
         bullet('sunring_blue');
         pause(800);
         rotater_time = bullet('rotater');
         pause(800);
         bullet('sunring_blue');
         time(rotater_time + 3500);
         color('green');
         pause(800);
         bullet('sunbeam');
         time(rotater_time + 4500);
         color('red');
         pause(200);
         bullet('sunbeam');
         pause(400);
         bullet('sunbeam');
         pause(400);
         bullet('sunbeam');
         pause(400);
         bullet('sunbeam');
         pause(400);
         bullet('sunbeam');
         pause(600);
         bullet('sunbeam');
         pause(800);
         bullet('sunbeam');
      }
   ),
   hyper_build_phase(
      {
         color: 'yellow',
         daemon: music.sng13,
         duration: 1867,
         load_max: 0,
         load_max_total: 0,
         load_next_min: 0,
         load_next_max: 0
      },
      (save, pause, bullet, color, time) => {
         let rotater_time = 0;
         pause(100);
         bullet('shotstar');
         pause(3000);
         bullet('shotstar');
         pause(1200);
         bullet('shotstar');
         pause(1200);
         bullet('shotstar');
         pause(3000);
         color('cyan');
         bullet('diamondbolt');
         pause(1400);
         bullet('diamondbolt');
         pause(1400);
         bullet('diamondbolt');
         pause(2200);
         color('orange');
         bullet('warpstar');
         bullet('warpstar');
         bullet('warpstar');
         pause(500);
         bullet('warpstar');
         bullet('warpstar');
         bullet('warpstar');
         pause(500);
         bullet('warpstar');
         bullet('warpstar');
         bullet('warpstar');
         pause(500);
         bullet('warpstar');
         bullet('warpstar');
         bullet('warpstar');
         pause(1000);
         color('blue');
         bullet('sunring_orange');
         bullet('platform_fixed');
         pause(600);
         bullet('platform');
         pause(600);
         bullet('platform');
         pause(1000);
         bullet('sunring_orange');
         bullet('platform');
         pause(800);
         bullet('platform');
         pause(600);
         bullet('platform');
         pause(1000);
         color('purple');
         bullet('orbiter');
         pause(200);
         bullet('orbiter');
         pause(200);
         bullet('sunring_blue');
         pause(1500);
         bullet('orbiter');
         pause(200);
         bullet('orbiter');
         pause(200);
         bullet('sunring_blue');
         pause(1500);
         bullet('orbiter');
         pause(200);
         bullet('orbiter');
         pause(200);
         rotater_time = bullet('rotater');
         time(rotater_time + 3500);
         color('green');
         time(rotater_time + 4500);
         color('red');
         bullet('sunbeam');
         pause(600);
         bullet('sunbeam');
         pause(600);
         bullet('sunbeam');
         rotater_time = bullet('rotater');
         pause(800);
         bullet('sunbeam');
         pause(800);
         bullet('sunbeam');
         pause(800);
         bullet('sunbeam');
         time(rotater_time + 3500);
         color('green');
         time(rotater_time + 4500);
         color('yellow');
         bullet('shotstar');
         pause(1200);
         bullet('shotstar');
         pause(1200);
         bullet('shotstar');
         pause(3000);
         color('red');
         bullet('sunball');
         pause(100);
         bullet('sunball');
         pause(100);
         bullet('sunball');
         pause(600);
         bullet('sunball');
         pause(100);
         bullet('sunball');
         pause(100);
         bullet('sunball');
         pause(400);
         color('orange');
         bullet('warpstar');
         bullet('warpstar');
         bullet('warpstar');
         pause(500);
         bullet('warpstar');
         bullet('warpstar');
         bullet('warpstar');
         pause(1000);
         color('cyan');
         bullet('diamondbolt');
         pause(2400);
         color('purple');
         bullet('orbiter');
         pause(166);
         bullet('orbiter');
         pause(166);
         bullet('orbiter');
         pause(166);
         bullet('sunring_blue');
         pause(2000);
         color('blue');
         bullet('sunring_orange');
         bullet('platform_fixed');
         pause(600);
         bullet('platform');
         pause(800);
         bullet('platform');
         pause(600);
         bullet('platform');
         pause(1000);
         color('yellow');
         bullet('shotstar');
         pause(2200);
         rotater_time = bullet('rotater');
         time(rotater_time + 3500);
         color('green');
         time(rotater_time + 4500);
         color('red');
         bullet('sunbeam');
         pause(600);
         color('yellow');
         bullet('sunbeam');
         pause(600);
         color('blue');
         bullet('sunbeam');
         pause(600);
         color('orange');
         bullet('sunbeam');
         pause(600);
         color('cyan');
         bullet('sunbeam');
         pause(600);
         color('purple');
         bullet('sunbeam');
         pause(600);
         color('green');
         pause(200);
         bullet('sunbeam');
      }
   )
];

export const hypervisor = {
   attempts: [] as number[],
   end: null as Vow | null,
   files: CosmosUtils.populate(6, () => ({
      cyanLeap: false,
      cyanLeapEcho: [] as [number, CosmosImage | null, CosmosPointSimple][],
      cyanLeapFromX: 0,
      cyanLeapFromY: 0,
      cyanLeapTick: 0,
      cyanLeapToX: 0,
      cyanLeapToY: 0,
      cyanShadowTick: 0,
      cyanShadowVisible: false,
      cyanShadowX: 0,
      cyanShadowY: 0,
      hp: 0,
      invulnerable: 0,
      instances: [] as { daemon: CosmosDaemon; gain: number; position: number; rate: number }[],
      lineActive: false,
      lineIterations: 0,
      lineOffset: 0,
      linePosY: 0,
      lineSwap: 0,
      lineSwapInvuln: false,
      orangeTick: 0,
      orangeFactors: [] as number[],
      time: 0,
      velocityY: 0,
      x: 0,
      y: 0
   })),
   instance ({
      daemon,
      gain = daemon.gain,
      position = 0,
      rate = daemon.rate
   }: {
      daemon: CosmosDaemon;
      gain?: number;
      position?: number;
      rate?: number;
   }) {
      if (hyper.nosound) {
         return;
      }
      const inst = daemon.instance(renderer, position, true);
      inst.gain.value = gain;
      inst.rate.value = rate;
      inst.on('stop', hypervisor.instance_stop);
      hypervisor.instances.push(inst);
   },
   instance_stop (this: CosmosInstance) {
      hypervisor.instances.splice(hypervisor.instances.indexOf(this), 1);
   },
   instances: [] as CosmosInstance[],
   inv_ticks: 0,
   line_width: 325,
   load (slot: number) {
      hyper.load_text.content = [
         text.a_citadel.hypertext.file1loaded,
         text.a_citadel.hypertext.file2loaded,
         text.a_citadel.hypertext.file3loaded,
         text.a_citadel.hypertext.file4loaded,
         text.a_citadel.hypertext.file5loaded,
         text.a_citadel.hypertext.file6loaded
      ][slot];
      hyper.load_text.metadata.ticks = 0;
      const file = hypervisor.files[slot];
      battler.SOUL.metadata.cyanLeap = file.cyanLeap;
      for (const echo of battler.SOUL.metadata.cyanLeapEcho.splice(0)) {
         if (battler.SOUL.metadata.layer === null) {
            renderer.detach('menu', echo);
         } else {
            battler.SOUL.metadata.layer.detach(echo);
         }
         echo.metadata.e.resolve();
      }
      for (const echo of file.cyanLeapEcho) {
         const s = quickshadow(
            new CosmosSprite({ anchor: 0, scale: 0.5, frames: [ echo[1] ] }),
            echo[2],
            battler.SOUL.metadata.layer ?? 'menu',
            echo[0],
            1 / 0.9,
            0.2
         );
         s.tint = battler.SOUL.objects[0].tint;
         battler.SOUL.metadata.cyanLeapEcho.push(s);
         s.metadata.e.promise.then(() => {
            const idx = battler.SOUL.metadata.cyanLeapEcho.indexOf(s);
            idx === -1 || battler.SOUL.metadata.cyanLeapEcho.splice(idx, 1);
         });
      }
      battler.SOUL.metadata.cyanLeapFrom.set(file.cyanLeapFromX, file.cyanLeapFromY);
      battler.SOUL.metadata.cyanLeapTick = file.cyanLeapTick;
      battler.SOUL.metadata.cyanLeapTo.set(file.cyanLeapToX, file.cyanLeapToY);
      battler.SOUL.metadata.cyanShadowTick = file.cyanShadowTick;
      if (file.cyanShadowVisible) {
         if (!battler.SOUL.metadata.cyanShadowVisible) {
            battler.SOUL.metadata.cyanShadowVisible = true;
            if (battler.SOUL.metadata.layer === null) {
               renderer.attach('menu', battler.shadow);
            } else {
               battler.SOUL.metadata.layer.attach(battler.shadow);
            }
         }
      } else if (battler.SOUL.metadata.cyanShadowVisible) {
         battler.SOUL.metadata.cyanShadowVisible = false;
         if (battler.SOUL.metadata.layer === null) {
            renderer.detach('menu', battler.shadow);
         } else {
            battler.SOUL.metadata.layer.detach(battler.shadow);
         }
      }
      battler.shadow.position.set(file.cyanShadowX, file.cyanShadowY);
      SAVE.data.n.hp = file.hp;
      battler.invulnerable = file.invulnerable;
      if (file.lineActive && !battler.line.active) {
         battler.line.damage = 1;
         battler.line.loop = -1.5;
         battler.line.sticky = false;
         battler.line.width = hypervisor.line_width;
      }
      battler.line.active = file.lineActive;
      battler.line.iterations = file.lineIterations;
      battler.line.offset = file.lineOffset;
      battler.line.pos.y = file.linePosY;
      battler.line.swap = file.lineSwap;
      battler.line.swap_invuln = file.lineSwapInvuln;
      if (file.orangeTick === 0) {
         if (battler.SOUL.metadata.orangeTick !== 0) {
            battler.SOUL.area = null;
            battler.SOUL.filters = null;
            battler.SOUL.updateFilters();
            battler.SOUL.container.removeChild(battler.SOUL.metadata.orangeGraphics);
         }
      } else if (battler.SOUL.metadata.orangeTick === 0) {
         battler.SOUL.area = renderer.area;
         battler.SOUL.filters = [ battler.SOUL.metadata.orangeFilter ];
         battler.SOUL.updateFilters();
         battler.SOUL.container.addChild(battler.SOUL.metadata.orangeGraphics);
      }
      battler.SOUL.metadata.orangeFactors.splice(0, battler.SOUL.metadata.orangeFactors.length, ...file.orangeFactors);
      battler.SOUL.metadata.orangeTick = file.orangeTick;
      hypervisor.time = file.time;
      battler.SOUL.velocity.y = file.velocityY;
      battler.SOUL.position.set(file.x, file.y);
      hypervisor.silence();
      for (const inst of file.instances) {
         hypervisor.instance(inst);
      }
      hyper.load_fx();
   },
   phase: 0,
   random: new CosmosValueRandom(),
   save (slot: number) {
      hyper.load_text.content = [
         text.a_citadel.hypertext.file1saved,
         text.a_citadel.hypertext.file2saved,
         text.a_citadel.hypertext.file3saved,
         text.a_citadel.hypertext.file4saved,
         text.a_citadel.hypertext.file5saved,
         text.a_citadel.hypertext.file6saved
      ][slot];
      hyper.load_text.metadata.ticks = 0;
      const file = hypervisor.files[slot];
      file.cyanLeap = battler.SOUL.metadata.cyanLeap;
      file.cyanLeapEcho = battler.SOUL.metadata.cyanLeapEcho.map(e => [ e.alpha.value, e.frames[0], e.position.value() ]);
      file.cyanLeapFromX = battler.SOUL.metadata.cyanLeapFrom.x;
      file.cyanLeapFromY = battler.SOUL.metadata.cyanLeapFrom.y;
      file.cyanLeapTick = battler.SOUL.metadata.cyanLeapTick;
      file.cyanLeapToX = battler.SOUL.metadata.cyanLeapTo.x;
      file.cyanLeapToY = battler.SOUL.metadata.cyanLeapTo.y;
      file.cyanShadowTick = battler.SOUL.metadata.cyanShadowTick;
      file.cyanShadowVisible = battler.SOUL.metadata.cyanShadowVisible;
      file.cyanShadowX = battler.shadow.position.x;
      file.cyanShadowY = battler.shadow.position.y;
      file.hp = SAVE.data.n.hp;
      file.instances.splice(
         0,
         file.instances.length,
         ...[ ...hypervisor.instances, ...sounds.arrow_leap.instances, ...sounds.boom_orange.instances ].map(inst => ({
            daemon: inst.daemon,
            gain: inst.gain.value,
            position: inst.position,
            rate: inst.rate.value
         }))
      );
      file.invulnerable = battler.invulnerable;
      file.lineActive = battler.line.active;
      file.lineIterations = battler.line.iterations;
      file.lineOffset = battler.line.offset;
      file.linePosY = battler.line.pos.y;
      file.lineSwap = battler.line.swap;
      file.lineSwapInvuln = battler.line.swap_invuln;
      file.orangeFactors.splice(0, file.orangeFactors.length, ...battler.SOUL.metadata.orangeFactors);
      file.orangeTick = battler.SOUL.metadata.orangeTick;
      file.time = hypervisor.time;
      file.velocityY = battler.SOUL.velocity.y;
      file.x = battler.SOUL.position.x;
      file.y = battler.SOUL.position.y;
   },
   save_times: [] as number[],
   shake () {
      return Math.max(0.25 + hypervisor.phase / 24, battler.SOUL.metadata.orangeTick / 7.5);
   },
   silence () {
      sounds.hurt.stop();
      sounds.arrow_leap.stop();
      sounds.boom_orange.stop();
      sounds.heartshot.stop();
      for (const inst of hypervisor.instances.splice(0)) {
         inst.off('stop', hypervisor.instance_stop);
         inst.stop();
      }
   },
   slots: 0,
   time: 0,
   time_load: NaN,
   time_total: 0,
   tick () {
      const phase = hyper_phases[hypervisor.phase];
      if (hypervisor.time === phase.duration) {
         if (hypervisor.phase === 6) {
            hyper.rect_wf.alpha.value = 1;
         }
         hypervisor.end?.confirm();
      } else {
         // set load time
         if (phase.load_max !== 0 && Number.isNaN(hypervisor.time_load)) {
            hypervisor.time_load =
               hypervisor.time + phase.load_next_min + hypervisor.random.int(phase.load_next_max - phase.load_next_min);
         }

         // save or load if possible
         if (phase.save_times.includes(hypervisor.time) && !hypervisor.save_times.includes(hypervisor.time)) {
            hypervisor.save_times.push(hypervisor.time);
            hypervisor.save(
               hypervisor.phase +
                  (hypervisor.slots < 6 - hypervisor.phase
                     ? hypervisor.slots++
                     : hypervisor.random.int(6 - hypervisor.phase))
            );
         } else if (
            hypervisor.slots !== 0 &&
            hypervisor.time === hypervisor.time_load &&
            hypervisor.time <= phase.load_max &&
            hypervisor.time_total <= phase.load_max_total
         ) {
            const slot = hypervisor.phase + hypervisor.random.int(hypervisor.slots);
            if (hypervisor.time_total + (phase.duration - hypervisor.files[slot].time) <= phase.load_max_total) {
               hypervisor.time_load = NaN;
               hypervisor.load(slot);
            }
         }

         // set soul sprite corruption level
         const mx = hyper.hp_max();
         battler.SOUL.metadata.spriteoverride = [
            content.ibcTwinklyHeart1,
            content.ibcTwinklyHeart2,
            content.ibcTwinklyHeart3,
            content.ibcTwinklyHeart4,
            content.ibcTwinklyHeart5,
            content.ibcTwinklyHeart6,
            content.ibcTwinklyHeart7
         ][Math.floor((1 - Math.min(SAVE.data.n.hp, mx) / mx) * 7)];
         const sprite = battler.SOUL.objects[0] as CosmosAnimation;
         if (sprite.resources !== battler.SOUL.metadata.spriteoverride) {
            sprite.resources = battler.SOUL.metadata.spriteoverride;
            sprite.fix(true);
         }

         // set soul color
         const color = phase.color.find(value => value.time <= hypervisor.time)!;
         battler.SOUL.metadata.color = color.type;
         hyper.color_update(color.type);

         // apply soul color change effect if necessary
         hyper.color_fx.tint = hyper.tints[color.type];
         hyper.color_fx.metadata.time = Math.min(hypervisor.time - color.time, 15);
         if (hypervisor.time === color.time) {
            hypervisor.instance({ daemon: sounds.bell });
         }

         // collect bullets
         const bullets = [ ...phase.pattern.entries() ]
            .filter(entry => entry[1].time <= hypervisor.time)
            .map(entry => hyper_bullets[entry[1].type](entry[0], hypervisor.time - entry[1].time))
            .filter(entry => entry.active);

         // collect bullet objects for tick
         const objects: CosmosObject[] = bullets.map(bullet => bullet.object);

         // update object list
         hyper.arena.detach(...hyper.arena.objects.filter(object => !objects.includes(object)));
         hyper.nosound = true;
         for (const object of objects) {
            object.tick();
         }
         hyper.nosound = false;
         hyper.arena.attach(...objects);

         // collect bullet shakes for tick
         let sh = hypervisor.shake();
         for (const bullet of bullets) {
            if (bullet.shake > sh) {
               sh = bullet.shake;
            }
         }
         renderer.shake.value = sh;

         // update sprites
         CosmosUtils.chain<CosmosObject[], void>(renderer.layers.menu.objects, (objects, next) => {
            for (const object of objects) {
               if (object instanceof CosmosSprite && object.metadata.auto !== false) {
                  const time = hypervisor.time - (object.metadata.time ?? 0);
                  object.index = Math.floor(time / object.duration) % object.frames.length;
                  object.step = time % object.duration;
               }
               next(object.objects);
            }
         });

         // update white final buildup fader
         const finaltime = phase.duration - 90;
         if (hypervisor.phase === 6) {
            if (hypervisor.time < finaltime) {
               hyper.rect_wf.alpha.value = 0;
            } else {
               hyper.rect_wf.alpha.value = CosmosMath.bezier((hypervisor.time - finaltime) / 90, 0, 0, 0, 1);
            }
            const mus_position = hypervisor.time_total / 30;
            const zpower = Math.min(Math.floor(Math.max(mus_position / (hyper.div246 * 8) - 3, 0)) / 4, 4);
            hyper.zbf.strength =
               zpower * 0.03 + zpower * CosmosMath.wave(mus_position - zpower * hyper.div246 * 8) * 0.02;
         }

         // warning text
         else if (finaltime <= hypervisor.time) {
            hyper.load_text.content = text.a_citadel.hypertext.warn;
            hyper.load_text.metadata.ticks = (hypervisor.time - finaltime) % 30;
         }

         // update sun rotation
         const rot = (hypervisor.time / phase.duration) * 360;
         hyper.sun.objects[0].rotation.value = rot;
         hyper.sun.objects[1].rotation.value = rot;

         // add time
         hypervisor.time++;
         hypervisor.time_total++;
      }
   }
};

export async function bad () {
   if (!world.postnoot || !hyper_pacifist()) {
      let w = false;
      const wTf = fader({ fill: 0xffffff });
      if (world.postnoot || SAVE.flag.n.neutral_twinkly_stage < 1) {
         game.music?.stop();
         if (world.postnoot) {
            await renderer.pause(300);
            SAVE.flag.b.reset_twinkly = true;
         } else {
            await renderer.pause(600);
            oversaver.save();
            SAVE.flag.s.myworld = CosmosUtils.serialize(SAVE.state);
            SAVE.flag.s.myhostages = CosmosUtils.serialize(SAVE.hostages);
            SAVE.flag.b.reset_twinkly = true;
            SAVE.flag.n.neutral_twinkly_stage = 1;
         }
         w = true;
         renderer.attach('menu', wTf);
         sounds.swing.instance(renderer);
         await wTf.alpha.modulate(renderer, SAVE.flag.b.$option_epilepsy ? 300 : 150, 1);
         await renderer.pause(SAVE.flag.b.$option_epilepsy ? 600 : 750);
         sounds.shatter.instance(renderer);
         await renderer.pause(world.postnoot ? 500 : 1000);
         game.camera.position.y = 10;
      }
      const rep = SAVE.flag.n.neutral_repeat;
      const neutralText = commonText.a_common.neutral0();
      if (world.postnoot || SAVE.flag.n.neutral_twinkly_stage < 2) {
         const assX = new CosmosInventory(content.idcTwinklyRegret, content.avTwinkly1);
         assX.name = 'assX';
         const twLoader2 = world.postnoot
            ? rep < 7
               ? assX.load()
               : Promise.all([ twAssets17.load(), rooms.of('_hangar').preload.load(), neutralText.m.audio.load() ])
            : twAssets2.load();
         renderer.detach('main', player);
         instance('main', 'observer')?.destroy();
         w && wTf.alpha.modulate(renderer, world.postnoot ? 600 : 300, 0).then(() => renderer.detach('menu', wTf));
         if (!world.postnoot) {
            rooms.of('c_exit').layers.below![0].alpha.value = 0;
            const virt = new CosmosSprite({ alpha: 0.5, frames: [ content.iooCVirtexit ] });
            renderer.attach('below', virt);
            const pre = speech.presets.of('asgore');
            const breaker = new CosmosAnimation({
               anchor: { x: 0 },
               resources: content.iocAsgoreBound,
               priority: 10,
               position: { x: 120, y: -110 }
            }).on('tick', function () {
               if (this.resources === content.iocAsgoreBound) {
                  if (speech.state.preset === pre) {
                     speech.targets.has(this) || speech.targets.add(this);
                  } else {
                     speech.targets.has(this) && speech.targets.delete(this);
                     this.reset();
                  }
               }
            });
            renderer.attach('main', breaker);
            let idiot: CosmosInstance | null = null;
            const soundjump = (offset: number) => {
               sounds.save.stop();
               idiot?.stop();
               idiot = music.idiot.instance(renderer, offset, true);
               idiot.source!.loopStart = (60 / 140) * 16 * 3;
               idiot.source!.loopEnd = (60 / 140) * 32 * 3;
            };
            soundjump(0);
            await renderer.pause(500);
            const time_basis = renderer.time;
            let time = time_basis;
            const starPositionY = new CosmosValue(-110);
            const star = new CosmosAnimation({
               alpha: 0,
               priority: -1,
               anchor: { x: 0, y: 1 },
               position: { x: 160 },
               resources: content.iocTwinklyMain
            }).on('tick', function () {
               this.position.y = starPositionY.value + CosmosMath.wave(((renderer.time - time) % 2500) / 2500) * 5;
            });
            renderer.attach('menu', hyper.load_text);
            const snap = async () => {
               sounds.lightningstrike.instance(renderer);
               const snd2 = sounds.boom.instance(renderer, 0.16);
               snd2.rate.value = 0.8;
               snd2.gain.modulate(renderer, 1000, snd2.gain.value, 0);
               const wf = fader({
                  fill: 0xffffff,
                  size: 1000,
                  alpha: 1,
                  anchor: 0,
                  position: { x: 160, y: 120 },
                  priority: 10000
               });
               shake();
               await wf.alpha.modulate(renderer, 500, 0);
               renderer.detach('menu', wf);
            };
            renderer.attach('main', star);
            await Promise.all([
               star.alpha.modulate(renderer, 800, 0, 1),
               starPositionY.modulate(renderer, 800, -50, -50, -50)
            ]);
            await dialogue('dialoguerBottom', ...text.a_citadel.story.bad1());
            await Promise.all([
               star.alpha.modulate(renderer, 800, 1, 0),
               starPositionY.modulate(renderer, 800, -50, -50, -110)
            ]);

            breaker.reset().use(content.iocAsgoreBreak).enable();
            await renderer.when(() => breaker.index === 4);
            breaker.disable();
            breaker.step = 0;

            star.position.x = 80;
            await Promise.all([
               star.alpha.modulate(renderer, 800, 0, 1),
               starPositionY.modulate(renderer, 800, -50, -50, -50)
            ]);
            if (!SAVE.flag.b.introduce_twinkly) {
               await dialogue('dialoguerBottom', ...text.a_citadel.story.bad2);
               SAVE.flag.b.introduce_twinkly = true;
            }
            const mt1 = idiot!.position;
            const time1 = renderer.time;
            hyper.load_text.content = text.a_citadel.hypertext.file1saved;
            hyper.load_text.metadata.ticks = 0;

            breaker.index = 5;
            breaker.enable();
            await renderer.when(() => breaker.index === 6);

            snap();
            dialogue('dialoguerBottom', ...text.a_citadel.story.bad3);
            await Promise.all([
               renderer
                  .when(() => breaker.index === 8)
                  .then(() => {
                     breaker.disable();
                     breaker.step = 0;
                  }),
               renderer.pause(1500).then(async () => {
                  await dialogue('dialoguerBottom', ...text.a_citadel.story.bad4);
                  await Promise.all([
                     star.alpha.modulate(renderer, 800, 1, 0),
                     starPositionY.modulate(renderer, 800, -50, -50, -110)
                  ]);
               })
            ]);

            breaker.index = 9;
            breaker.enable();
            await renderer.when(() => breaker.index === 13);
            breaker.disable();
            breaker.step = 0;

            star.position.x = 160;
            await Promise.all([
               star.alpha.modulate(renderer, 800, 0, 1),
               starPositionY.modulate(renderer, 800, -50, -50, -50)
            ]);
            await dialogue('dialoguerBottom', ...text.a_citadel.story.bad5);
            const mt2 = idiot!.position;
            const time2 = renderer.time;
            hyper.load_text.content = text.a_citadel.hypertext.file2saved;
            hyper.load_text.metadata.ticks = 0;

            breaker.index = 14;
            breaker.enable();
            await renderer.when(() => breaker.index === 15);

            snap();
            dialogue('dialoguerBottom', ...text.a_citadel.story.bad6);

            await Promise.all([
               renderer
                  .when(() => breaker.index === 17)
                  .then(() => {
                     breaker.disable();
                     breaker.step = 0;
                  }),
               renderer.pause(1000).then(async () => {
                  await dialogue('dialoguerBottom', ...text.a_citadel.story.bad7);
               })
            ]);
            time = time_basis + (renderer.time - time1);
            hyper.load_text.content = text.a_citadel.hypertext.file1loaded;
            hyper.load_text.metadata.ticks = 0;
            hyper.load_fx();
            soundjump(mt1);
            star.position.x = 80;

            breaker.index = 5;
            breaker.step = 21;
            breaker.enable();
            await renderer.when(() => breaker.index === 6);

            snap();
            dialogue('dialoguerBottom', ...text.a_citadel.story.bad3);
            await renderer.pause(600);
            await dialogue('dialoguerBottom', ...text.a_citadel.story.bad8);
            time = time_basis + (renderer.time - time2);
            hyper.load_text.content = text.a_citadel.hypertext.file2loaded;
            hyper.load_text.metadata.ticks = 0;
            hyper.load_fx();
            soundjump(mt2);
            star.position.x = 160;

            breaker.index = 14;
            breaker.step = 21;
            await renderer.when(() => breaker.index === 15);

            snap();
            dialogue('dialoguerBottom', ...text.a_citadel.story.bad6);
            await renderer.pause(600);
            await dialogue('dialoguerBottom', ...text.a_citadel.story.bad9);
            time = time_basis + (renderer.time - time1);
            hyper.load_text.content = text.a_citadel.hypertext.file1loaded;
            hyper.load_text.metadata.ticks = 0;
            hyper.load_fx();
            soundjump(mt1);
            star.position.x = 80;

            breaker.index = 5;
            breaker.step = 21;
            await renderer.when(() => breaker.index === 6);

            snap();
            dialogue('dialoguerBottom', ...text.a_citadel.story.bad3);
            await renderer.pause(400);
            await dialogue('dialoguerBottom', ...text.a_citadel.story.bad10);
            time = time_basis + (renderer.time - time2);
            hyper.load_text.content = text.a_citadel.hypertext.file2loaded;
            hyper.load_text.metadata.ticks = 0;
            hyper.load_fx();
            soundjump(mt2);
            star.position.x = 160;

            breaker.index = 14;
            breaker.step = 21;
            await renderer.when(() => breaker.index === 15);

            snap();
            dialogue('dialoguerBottom', ...text.a_citadel.story.bad6);
            await renderer.pause(400);
            const dlb = atlas.navigators.of('dialoguerBottom').objects[0].objects[2].objects[1];
            dlb.area = renderer.area;
            dlb.filters = [ filters.outline ];
            dialogue('dialoguerBottom', ...text.a_citadel.story.bad11);
            let s = 0;
            while (typer.mode !== 'empty' || s !== 0) {
               time = time_basis + (renderer.time - [ time1, time2 ][s]);
               hyper.load_text.content = [ text.a_citadel.hypertext.file1loaded, text.a_citadel.hypertext.file2loaded ][
                  s
               ];
               hyper.load_text.metadata.ticks = 0;
               hyper.load_fx();
               soundjump([ mt1, mt2 ][s]);
               star.position.x = [ 80, 160 ][s];

               breaker.index = [ 5, 14 ][s];
               breaker.step = 21;
               await renderer.when(() => breaker.index === [ 6, 15 ][s]);

               snap();
               await renderer.pause(300);
               s = 1 - s;
            }
            breaker.disable();
            await Promise.all([
               star.alpha.modulate(renderer, 800, 1, 0),
               starPositionY.modulate(renderer, 800, -50, -50, -110)
            ]);
            renderer.detach('main', star);
            await renderer.pause(1200);
            breaker.index = 18;
            await renderer.pause(1000);
            (idiot as CosmosInstance | null)?.stop();
            dlb.area = null;
            dlb.filters = null;
            await dialogue('dialoguerBottom', ...text.a_citadel.story.bad12);
            renderer.detach('main', breaker);
         }
         const murder = new CosmosAnimation({
            active: true,
            resources: world.postnoot ? content.iocAsgoreDeathAlt : content.iocAsgoreDeath,
            position: renderer.resolve({ x: -5.5, y: 0 }, game.camera.position),
            fill: 0
         });
         renderer.attach('above', murder);
         await renderer.when(() => murder.index === 3);
         murder.attach(
            ...CosmosUtils.populate(50, () => {
               return new CosmosRectangle({
                  size: 2,
                  anchor: 0,
                  position: { x: 160.5, y: 52 },
                  velocity: { x: 3 + Math.random() * 6, y: -2 - Math.random() * 4 },
                  gravity: { y: 0.5 }
               }).on('tick', function () {
                  this.alpha.value > 0 && (this.alpha.value -= 1 / 120) < 0 && (this.alpha.value = 0);
                  this.size.set(this.size.x * 0.98);
               });
            })
         );
         sounds.shatter.stop();
         const s1 = sounds.strike.instance(renderer);
         const s2 = sounds.superstrike.instance(renderer);
         await Promise.all([
            renderer.when(() => murder.index === 4).then(() => murder.disable()),
            (async () => {
               const simple = renderer.container.position;
               const base = simple.x;
               simple.x = base + 6;
               await renderer.pause(66);
               simple.x = base - 6;
               await renderer.pause(66);
               simple.x = base + 6;
               await renderer.pause(66);
               simple.x = base - 6;
               await renderer.pause(66);
               simple.x = base + 6;
               await renderer.pause(66);
               simple.x = base - 5;
               await renderer.pause(66);
               simple.x = base + 5;
               await renderer.pause(66);
               simple.x = base - 5;
               await renderer.pause(66);
               simple.x = base + 5;
               await renderer.pause(66);
               simple.x = base - 4;
               await renderer.pause(66);
               simple.x = base + 4;
               await renderer.pause(66);
               simple.x = base - 4;
               await renderer.pause(66);
               simple.x = base + 3;
               await renderer.pause(66);
               simple.x = base - 3;
               await renderer.pause(66);
               simple.x = base + 2;
               await renderer.pause(66);
               simple.x = base - 1;
               await renderer.pause(66);
               simple.x = base;
            })(),
            renderer.pause(world.postnoot ? 2500 : 4000)
         ]);
         s1.stop();
         s2.stop();
         world.postnoot || (SAVE.flag.n.neutral_twinkly_stage = 2);
         renderer.alpha.value = 0;
         sounds.noise.instance(renderer);
         await Promise.all([
            twLoader2,
            (async () => {
               await renderer.pause(1000);
               renderer.clear('base', 'below', 'main', 'above', 'menu');
               isMobile.any && renderer.attach('menu', mobile.gamepad());
               if (!world.postnoot) {
                  const cak = sounds.cackle.instance(renderer);
                  cak.rate.value = 0.8;
                  await cak.on('stop');
               }
               await renderer.pause(world.postnoot ? 3500 : 1000);
            })()
         ]);
         twAssets1.unload();
         renderer.alpha.value = 1;
         if (world.postnoot) {
            if (rep < 7) {
               const twLoader17 = Promise.all([
                  twAssets17.load(),
                  rooms.of('_hangar').preload.load(),
                  neutralText.m.audio.load()
               ]);
               game.text = '';
               const display = genRLD();
               renderer.attach('menu', display);
               atlas.switch('dialoguerBase');
               const twinkly = new CosmosAnimation({
                  anchor: 0,
                  resources: content.idcTwinklyRegret,
                  index: rep < 2 ? 17 : [ 15, 20, 14, 0, 0 ][rep - 2],
                  position: { x: 160, y: 260 }
               }).on('tick', function () {
                  this.offsets[0].y = sineWaver(0, 2500, 0, 5);
               });
               renderer.attach('menu', twinkly);
               speech.emoters.twinkly = twinkly;
               await twinkly.position.modulate(renderer, 800, { y: 160 }, { y: 160 }, { y: 160 });
               await renderer.pause(1000);
               await dialogue_primitive(...text.a_citadel.story.postnoot1(rep));
               SAVE.flag.n.neutral_repeat++;
               game.text = '';
               if (SAVE.data.b.ultrashortcut) {
                  SAVE.flag.b.ultra_twinkly = true;
               } else if (rep < 2) {
                  const puzzlesolve =
                     [
                        'w_puzzle1',
                        'w_puzzle2',
                        'w_puzzle3',
                        'w_puzzle4',
                        's_puzzle1',
                        's_puzzle2',
                        's_puzzle3',
                        'f_puzzle1',
                        'f_puzzle2',
                        'f_puzzle3',
                        'a_puzzle1',
                        'a_barricade1',
                        'a_puzzle2',
                        'a_barricade2',
                        'a_core_left1',
                        'a_core_left2'
                     ].find(key => world.nootflags.has(key)) !== void 0;
                  const enemyweaken =
                     [ 'toriel', 'papyrus', 'undyne', 'alphys' ].find(key => world.nootflags.has(key)) !== void 0;
                  await renderer.pause(2000);
                  await dialogue_primitive(...text.a_citadel.story.postnoot2(rep, puzzlesolve, enemyweaken));
                  (puzzlesolve || enemyweaken) && (SAVE.flag.b.neutral_reload_interloper = true);
                  game.text = '';
               }
               await twinkly.position.modulate(renderer, 800, {}, {}, { y: 260 });
               renderer.detach('menu', twinkly);
               assX.unload();
               atlas.switch(null);
               renderer.detach('menu', display);
               await antifreeze([ twLoader17, renderer.pause(2000) ]);
            }
         } else {
            sounds.noise.instance(renderer);
         }
      } else {
         renderer.alpha.task?.();
         renderer.alpha.value = 1;
         renderer.clear('base', 'below', 'main', 'above', 'menu');
         isMobile.any && renderer.attach('menu', mobile.gamepad());
      }
      renderer.layers.base.active = false;
      renderer.layers.below.active = false;
      renderer.layers.main.active = false;
      renderer.layers.above.active = false;
      const gx = 152;
      const height = (index: number) => 270 + index * 450;
      if (!world.postnoot) {
         const b13 = text.a_citadel.story.bad13();
         const hmax = height(b13.length + 3);
         const brightener = new ColorMatrixFilter();
         brightener.brightness(1.25, false);
         const babybloomer = new AdvancedBloomFilter({ threshold: 0, bloomScale: 0.4, quality: 10, brightness: 1 });
         hyper.layer.filters = [ CosmosRenderer.fancy ? babybloomer : brightener ];
         if (SAVE.flag.n.neutral_twinkly_stage < 3) {
            hyper.fg.active = true;
            (hyper.sun.objects[0] as CosmosAnimation).active = true;
            hyper.sun.metadata.z = hmax + 160;
            const mus = music.terror.instance(renderer);
            const dl2 = sounds.deeploop2.instance(renderer);
            dl2.gain.value = 0;
            const cha = new CosmosEntity({
               face: 'up',
               metadata: { x: 0, y: 60, z: 5, p: 1000 },
               sprites: {
                  down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocFriskDownCharaFake }),
                  left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocFriskLeftCharaFake }),
                  right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocFriskRightCharaFake }),
                  up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocFriskUpCharaFake })
               }
            }).on('tick', function () {
               let active = false;
               const sp = game.sprint && keyState.special ? 30 : 3;
               if (keyState.left) {
                  active = this.metadata.x > -75;
                  this.face = 'left';
                  (this.metadata.x -= sp) < -75 && (this.metadata.x = -75);
               } else if (keyState.right) {
                  active = this.metadata.x < 75;
                  this.face = 'right';
                  (this.metadata.x += sp) > 75 && (this.metadata.x = 75);
               }
               if (keyState.up) {
                  active = true;
                  this.face = 'up';
                  this.metadata.z += sp;
               } else if (keyState.down) {
                  this.metadata.z > 0 && (active = true);
                  this.face = 'down';
                  (this.metadata.z -= sp) < 0 && (this.metadata.z = 0);
               }
               for (const sprite of Object.values(this.sprites)) {
                  if (active && sprite === this.sprite) {
                     sprite.enable();
                  } else {
                     sprite.reset();
                  }
               }
               if (this.sprite.index % 2 === 1 && this.sprite.step === this.sprite.duration - 1) {
                  sounds.step.instance(renderer).gain.value *= 1 - this.metadata.z / hmax;
               }
            });
            const graphics = new Graphics();
            const gobject = new CosmosObject();
            gobject.container.addChild(graphics);
            const spritez = [
               {
                  down: content.iocHumansPatienceDown,
                  left: content.iocHumansPatienceLeft,
                  right: content.iocHumansPatienceRight,
                  up: content.iocHumansPatienceUp
               },
               {
                  down: content.iocHumansBraveryDown,
                  left: content.iocHumansBraveryLeft,
                  right: content.iocHumansBraveryRight,
                  up: content.iocHumansBraveryUp
               },
               {
                  down: content.iocHumansIntegrityDown,
                  left: content.iocHumansIntegrityLeft,
                  right: content.iocHumansIntegrityRight,
                  up: content.iocHumansIntegrityUp
               },
               {
                  down: content.iocHumansPerserveranceDown,
                  left: content.iocHumansPerserveranceLeft,
                  right: content.iocHumansPerserveranceRight,
                  up: content.iocHumansPerserveranceUp
               },
               {
                  down: content.iocHumansKindnessDown,
                  left: content.iocHumansKindnessLeft,
                  right: content.iocHumansKindnessRight,
                  up: content.iocHumansKindnessUp
               },
               {
                  down: content.iocHumansJusticeDown,
                  left: content.iocHumansJusticeLeft,
                  right: content.iocHumansJusticeRight,
                  up: content.iocHumansJusticeUp
               }
            ];
            const lampposts = CosmosUtils.populate(52, index => {
               return new CosmosSprite({
                  anchor: 0,
                  frames: [ content.iooCArchiveLightInverted ],
                  metadata: { x: [ -240, 240 ][index % 2], y: 60, z: Math.floor(index / 2) * 400, s: 3 }
               });
            });
            const humans = CosmosUtils.populate(6, index => {
               const huspr = spritez[index % 6];
               const spr = new CosmosSprite({ anchor: { x: 0, y: 1 } });
               const sid = [ huspr.right, huspr.left ][index % 2];
               return new CosmosObject({
                  metadata: { x: [ -240, 240 ][index % 2], y: 100, z: 2200 + index * 1600, s: 3, v: false },
                  objects: [ spr ]
               }).on('tick', function () {
                  if (this.metadata.v) {
                     return;
                  }
                  if (this.metadata.z - 135 <= cha.metadata.z) {
                     this.metadata.v = true;
                     battler.vaporize(spr, { rate: 1, filter: () => true });
                  } else {
                     const rez = this.metadata.z - 180 < cha.metadata.z ? sid : huspr.down;
                     spr.frames[0] === rez || (spr.frames[0] = rez);
                  }
               });
            });
            const myworld = new CosmosObject({
               objects: [ ...lampposts, ...humans, gobject, cha, hyper.sun ],
               position: { x: 160, y: 120 },
               priority: 1002
            }).on('tick', function () {
               const camX = Math.min(Math.max(cha.metadata.x, -40), 40);
               const camZ = Math.max(cha.metadata.z - 80, 0);
               const camF = CosmosMath.remap_clamped(cha.metadata.z, 0, 1, hmax / 3, hmax);
               const tint = CosmosImageUtils.gradient(0xffffff, 0xff0000, camF);
               const tint_lp = CosmosImageUtils.gradient(0, tint, 0.8125);
               this.tint = tint;
               renderer.shake.value = camF;
               renderer.speed.value = 1 - camF * 0.25;
               dl2.gain.value = camF;
               hyper.fg.alpha.value = camF * 0.25;
               hyper.sun.metadata.x = camX;
               barrier.objects[0].metadata.tint = tint_lp;
               for (const lamppost of lampposts) {
                  lamppost.tint = tint_lp;
               }
               for (const obj of this.objects as CosmosObject<
                  CosmosBaseEvents,
                  { x: number; y: number; z: number; p: number | void; s: number | void }
               >[]) {
                  if (obj === gobject) {
                     continue;
                  }
                  const div = obj.metadata.z - camZ + 80;
                  if (div > 0) {
                     const scale = 160 / div;
                     obj.alpha.value = 1;
                     obj.scale.set(scale * (obj.metadata.s ?? 1));
                     obj.position.set(scale * (obj.metadata.x - camX), scale * obj.metadata.y);
                     obj.priority.value = obj.metadata.p ?? -obj.metadata.z;
                  } else {
                     obj.alpha.value = 0;
                  }
               }
               graphics
                  .clear()
                  .beginFill(tint, 0.5 - camF * 0.5)
                  .drawPolygon(-gx - camX, 120, gx - camX, 120, 0, 0)
                  .endFill()
                  .beginFill(0, 0.5 - camF * 0.5)
                  .drawPolygon(-gx - camX, 120, -(gx + 8) - camX, 120, 0, 0)
                  .drawPolygon(gx - camX, 120, gx + 8 - camX, 120, 0, 0)
                  .endFill();
            });
            renderer.attach('menu', hyper.layer);
            hyper.layer.attach(barrier, myworld, hyper.fg, hyper.text);
            for (const [ index, line ] of b13.entries()) {
               const hpos = height(index);
               await renderer.when(() => hpos <= cha.metadata.z);
               index === 1 && SAVE.flag.n.neutral_twinkly_loop2++;
               dialogue_primitive(line);
            }
            await renderer.when(() => hmax <= cha.metadata.z);
            SAVE.flag.n.neutral_twinkly_base = hashes.of(SAVE.data.s.name || Math.random().toString());
            SAVE.flag.n.neutral_twinkly_stage = 3;
            hyper.layer.detach(barrier, myworld, hyper.text);
            hyper.sun.position.set(hyper_center);
            hyper.sun.priority.value = 1002;
            (hyper.sun.objects[0] as CosmosAnimation).active = false;
            hyper.sun.scale.set(1);
            hyper.fg.alpha.value = 0.25;
            hyper.fg.active = false;
            hyper.layer.attach(hyper.rect_bg, hyper.sun, hyper.uv);
            renderer.shake.value = 0;
            renderer.speed.value = 1;
            barrier.objects[0].metadata.tint = 0xcfcfcf;
            const repbase = [ mus, dl2 ].map(inst => ({
               daemon: inst.daemon,
               gain: inst.gain.value,
               position: inst.position,
               rate: inst.rate.value
            }));
            const repinst = [] as CosmosInstance[];
            mus.stop();
            dl2.stop();
            sounds.step.stop();
            let i = 0;
            await renderer.when(() => {
               if (i < 180) {
                  if (i % 2 === 0) {
                     for (const inst of repinst.splice(0)) {
                        inst.stop();
                     }
                     repinst.push(
                        ...repbase.map(info => {
                           const inst = info.daemon.instance(renderer, info.position);
                           inst.gain.value = info.gain;
                           inst.rate.value = info.rate;
                           return inst;
                        })
                     );
                  }
                  i++;
                  return false;
               }
               return true;
            });
            for (const inst of repinst.splice(0)) {
               inst.stop();
            }
            saver.time_but_real.stop();
            exit();
            await new Promise(() => {});
         }
         hyper.fg.alpha.value = 0.25;
         if (SAVE.flag.n.neutral_twinkly_stage < 4) {
            const twLoader16 = twAssets16.load();
            const armor = SAVE.data.s.armor;
            const weapon = SAVE.data.s.weapon;
            updateArmor('spacesuit');
            SAVE.data.s.weapon = 'spanner';
            hypervisor.phase = hyper.phase();
            hypervisor.random.value = SAVE.flag.n.neutral_twinkly_base;
            battler.active = true;
            battler.box.position.set(160, 120);
            battler.box.size.set(325, 245);
            battler.box.graphics.blendMode = BLEND_MODES.ADD;
            const invTicker = {
               priority: 5000000,
               listener () {
                  if (battler.invulnerable === 0) {
                     hypervisor.inv_ticks = 0;
                  } else {
                     hypervisor.inv_ticks++;
                  }
               }
            };
            battler.SOUL.on('tick', invTicker);
            const hyper_sun_glitch = new GlitchFilter({ slices: 100, offset: 100 });
            hyper_sun_glitch.enabled = false;
            hyper.sun.attach(
               new CosmosAnimation({
                  area: renderer.area,
                  anchor: 0,
                  scale: 4,
                  alpha: 0.1,
                  position: { y: -120 },
                  metadata: { active: false },
                  priority: -2,
                  resources: content.ibcTwinklySun1,
                  filters: [ hyper_sun_glitch ]
               }).on('tick', function () {
                  hyper_sun_glitch.enabled && hyper_sun_glitch.refresh();
               })
            );
            babybloomer.bloomScale = 1.4;
            let boot = true;
            while (true) {
               const rescueAssets = [ twAssets4, twAssets6, twAssets8, twAssets10, twAssets12, twAssets14, null ][
                  hypervisor.phase
               ];
               const rescueLoader = rescueAssets?.load();
               battler.invulnerable = 0;
               battler.SOUL.alpha.value = 1;
               battler.SOUL.position.set(160);
               battler.shadow.position.set(160);
               SAVE.data.n.hp = hyper.hp_max();
               battler.line.iterations = 0;
               battler.SOUL.metadata.spriteoverride = content.ibcTwinklyHeart1;
               hyper.color_update(hyper_phases[hypervisor.phase].color.slice(-1)[0]!.type);
               hyper.load_text.position.set(310, 232);
               hyper.load_text.anchor.set(1);
               hyper.fg.reset();
               (hyper.sun.objects[0] as CosmosAnimation).reset().resources = hyper.sun_resources();
               hyper.arena.objects = [];
               battler.SOUL.metadata.layer = hyper.layer;
               renderer.attach('menu', hyper.layer, hyper.load_text);
               if (boot) {
                  (async () => {
                     while (boot) {
                        hyper.load_text.content = text.a_citadel.hypertext.boot;
                        hyper.load_text.metadata.ticks = 0;
                        await renderer.pause(1000);
                     }
                  })();
                  hyper.layer.attach(hyper.rect_bg);
                  sounds.noise.instance(renderer);
                  await renderer.pause(500 + hypervisor.random.next() * 500);
                  hyper.layer.attach(battler.box, hyper.arena, battler.SOUL, hyper.color_fx, hyper.hp, hyper.uv);
                  sounds.noise.instance(renderer);
                  await renderer.pause(500 + hypervisor.random.next() * 500);
                  hyper.layer.attach(hyper.sun, hyper.fg);
                  sounds.noise.instance(renderer);
                  await renderer.pause(500 + hypervisor.random.next() * 500);
                  boot = false;
               } else {
                  hyper.layer.attach(
                     hyper.rect_bg,
                     battler.box,
                     hyper.arena,
                     battler.SOUL,
                     hyper.color_fx,
                     hyper.hp,
                     hyper.uv,
                     hyper.sun,
                     hyper.fg
                  );
               }
               hyper_sun_glitch.enabled = true;
               hyper.sun.attach(hyper.sun_fx);
               hypervisor.instance({
                  daemon: [ music.sng1, music.sng3, music.sng5, music.sng7, music.sng9, music.sng11, music.sng13 ][
                     hypervisor.phase
                  ]
               });
               game.movement = true;
               if (battler.line.active) {
                  battler.line.loop = -1.5;
               }
               if (hypervisor.phase === 6) {
                  renderer.attach('menu', hyper.rect_wf);
                  (renderer.filters ??= []).push(hyper.zbf);
               }
               const hy = CosmosUtils.hyperpromise();
               const hurtListener = (a: CosmosHitbox, b: number, papyrus: boolean) => {
                  if (!papyrus && SAVE.data.n.hp <= 0) {
                     battler.regen.reset();
                     battler.avert = true;
                     hy.resolve();
                  }
               };
               hyper.load_text.content = text.a_citadel.hypertext.init;
               hyper.load_text.metadata.ticks = 0;
               hypervisor.end = new Vow();
               events.on('hurt', hurtListener);
               hyper.arena.on('tick', hypervisor.tick);
               await Promise.race([ hy.promise, hypervisor.end ]);
               hyper.arena.off('tick', hypervisor.tick);
               events.off('hurt', hurtListener);
               hypervisor.end = null;
               game.movement = false;
               renderer.shake.value = 0;
               hyper.sun.detach(hyper.sun_fx);
               hyper.sun.objects[0].rotation.value = 0;
               hyper.sun.objects[1].rotation.value = 0;
               renderer.detach('menu', hyper.layer, hyper.load_text);
               hyper.layer.detach(
                  hyper.rect_bg,
                  battler.box,
                  hyper.arena,
                  battler.SOUL,
                  hyper.color_fx,
                  hyper.hp,
                  hyper.uv,
                  hyper.sun,
                  hyper.fg
               );
               hyper.color_reset();
               hypervisor.save_times.splice(0);
               hypervisor.time = 0;
               hypervisor.time_load = NaN;
               hypervisor.time_total = 0;
               hyper.arena.objects = [];
               battler.SOUL.metadata.layer = null;
               for (const file of hypervisor.files) {
                  file.instances.splice(0);
                  file.time = NaN;
               }
               hypervisor.slots = 0;
               for (const key in hyper_bullet_storage.entries) {
                  delete hyper_bullet_storage.entries[key];
               }
               if (hy.active && hypervisor.phase === 6) {
                  hy.resolve();
                  hypervisor.silence();
                  SAVE.flag.n.neutral_twinkly_stage = 4;
                  renderer.pause(50).then(() => {
                     renderer.filters?.splice(renderer.filters.indexOf(hyper.zbf), 1);
                  });
                  await renderer.pause(2000);
                  await hyper.rect_wf.alpha.modulate(renderer, 5000, 0);
                  renderer.detach('menu', hyper.rect_wf);
                  await antifreeze([ twLoader16, renderer.pause(4000) ]);
                  break;
               } else if (hy.active) {
                  hypervisor.silence();
                  hy.resolve();
                  const phaseAssets = hyper.assets[hypervisor.phase + 1];
                  const phaseAssetsAdditional = hyper.assets_additional[hypervisor.phase];
                  const phaseLoader = phaseAssets.load();
                  const phaseLoaderAdditional = phaseAssetsAdditional?.load();
                  const cam = game.camera;
                  const safe = {
                     end: null as null | Vow,
                     action_provider: (): -1 | 0 | 1 => 0,
                     fg: new CosmosRectangle({
                        blend: BLEND_MODES.MULTIPLY,
                        fill: 0xff0000,
                        size: { x: 320, y: 240 },
                        priority: 1000000
                     }).on('pre-render', async function () {
                        this.position.set(renderer.resolve({ x: 0, y: 0 }));
                     }),
                     async intro (...lines: string[]) {
                        await safe.dialogue(...lines);
                        await hyper.static();
                     },
                     load_extra: () => {},
                     load_text: new CosmosText({
                        area: new Rectangle(320, 320, 320, 160),
                        anchor: 1,
                        fontFamily: content.fDeterminationSans,
                        blend: BLEND_MODES.NORMAL,
                        fontSize: 24,
                        metadata: { ticks: 30 },
                        priority: 1835798135791835,
                        filters: [ filters.outline ]
                     }).on('pre-render', async function () {
                        this.alpha.value = 1 - Math.max((this.metadata.ticks++ - 10) / 20, 0);
                        this.position.set(renderer.resolve({ x: 310, y: 232 }));
                     }),
                     mus_time: 0,
                     mus_daemon: [ music.sng2, music.sng4, music.sng6, music.sng8, music.sng10, music.sng12 ][
                        hypervisor.phase
                     ],
                     mus_start () {
                        safe.mus_daemon.stop();
                        safe.mus_daemon.instance(renderer, safe.mus_time);
                     },
                     async outro (...lines: string[]) {
                        await renderer.pause(100);
                        sounds.heal.stop();
                        await hyper.static();
                        await renderer.pause(500);
                        await Promise.all([ music.saved.instance(renderer).on('stop'), safe.dialogue(...lines) ]);
                     },
                     progress: new CosmosObject({
                        alpha: 0.5,
                        priority: 138957019835,
                        metadata: { graphics: new Graphics() }
                     }).on('pre-render', async function () {
                        this.position.set(renderer.resolve({ x: 0, y: 0 }));
                        this.metadata.graphics
                           .clear()
                           .beginFill(0, 1)
                           .drawRect(9, 219, 82, 12)
                           .endFill()
                           .beginFill(0xffffff, 1)
                           .drawRect(10, 220, 80, 10)
                           .endFill()
                           .beginFill(0, 1)
                           .drawRect(11, 221, 78, 8)
                           .endFill()
                           .beginFill(0xffffff, 1)
                           .drawRect(12, 222, safe.progress_provider() * 76, 6)
                           .endFill();
                     }),
                     progress_provider: () => 0,
                     result: false,
                     save () {
                        hypervisor.save(hypervisor.phase);
                        safe.mus_time = Math.max(safe.mus_time, safe.mus_daemon.instances[0]?.position ?? 0);
                        safe.save_extra();
                     },
                     save_extra: () => {},
                     saved: false,
                     async setup (
                        action_provider: () => -1 | 0 | 1,
                        progress_provider: () => number,
                        region_min: CosmosPointSimple,
                        region_max: CosmosPointSimple,
                        x: number,
                        y: number,
                        color: HyperColor,
                        condition: Promise<void>,
                        preview_start: CosmosPointSimple,
                        save_extra: () => void,
                        load_extra: () => void,
                        ...extra: CosmosObject[]
                     ) {
                        safe.action_provider = action_provider;
                        safe.progress_provider = progress_provider;
                        safe.load_extra = load_extra;
                        safe.save_extra = save_extra;
                        renderer.region = [ region_min, region_max ];
                        battler.SOUL.position.set(x, y);
                        battler.SOUL.metadata.color = color;
                        hyper.color_update(color);
                        renderer.attach('menu', ...extra, battler.SOUL, safe.fg, safe.progress, safe.load_text);
                        battler.SOUL.alpha.value = 1;
                        battler.SOUL.metadata.spriteoverride = content.ibcTwinklyHeart1;
                        battler.box.size.set(1000000, 1000000);
                        renderer.layers.menu.modifiers[0] = false;
                        const mobile_obj = renderer.layers.menu.objects.find(
                           obj => obj.metadata.mobile_gamepad === true
                        );
                        const mobile_ticker = () => void mobile_obj?.position.set(renderer.resolve({ x: 0, y: 0 }));
                        mobile_obj?.on('pre-render', mobile_ticker);
                        musicFilter.value = 0;
                        musicConvolver.value = 0;
                        renderer.speed.value = 1;
                        safe.fg.alpha.value = 0;
                        safe.load_text.metadata.ticks = 30;
                        const subcam = new CosmosObject({ position: preview_start });
                        game.camera = subcam;
                        await renderer.pause(1000);
                        await subcam.position.modulate(
                           renderer,
                           2000,
                           battler.SOUL.position.clamp(region_min, region_max)
                        );
                        game.camera = battler.SOUL;
                        game.movement = true;
                        safe.mus_start();
                        safe.save();
                        safe.end = new Vow();
                        renderer.on('tick', safe.tick);
                        await Promise.race([ safe.end, condition ]);
                        if (safe.end.active) {
                           safe.end.confirm();
                           safe.result = true;
                        }
                        renderer.off('tick', safe.tick);
                        hypervisor.end = null;
                        game.camera = cam;
                        battler.SOUL.alpha.value = 0;
                        battler.box.size.set(325, 245);
                        renderer.layers.menu.modifiers[0] = true;
                        mobile_obj?.off('pre-render', mobile_ticker);
                        mobile_obj?.position.set(0);
                        game.movement = false;
                        safe.mus_daemon.stop();
                        hypervisor.time = 0;
                        musicFilter.value = 0;
                        musicConvolver.value = 0;
                        renderer.speed.value = 1;
                        hypervisor.silence();
                        hypervisor.time = 0;
                        renderer.detach('menu', ...extra, battler.SOUL, safe.fg, safe.progress, safe.load_text);
                     },
                     async dialogue (...lines: string[]) {
                        atlas.switch('dialoguerBase');
                        hyper.text.position.y = 120;
                        renderer.attach('menu', hyper.text);
                        await dialogue_primitive(...lines);
                        renderer.detach('menu', hyper.text);
                        hyper.text.position.y = 40;
                        atlas.switch(null);
                     },
                     tick () {
                        if (hypervisor.time === 900) {
                           safe.end?.confirm();
                        } else {
                           const safe_value =
                              battler.SOUL.position.x < renderer.region[0].x - 160 ||
                              battler.SOUL.position.x > renderer.region[1].x + 160 ||
                              battler.SOUL.position.y < renderer.region[0].y - 120 ||
                              battler.SOUL.position.y > renderer.region[1].y + 120
                                 ? -1
                                 : safe.action_provider();
                           if (safe_value === 1) {
                              if (!safe.saved) {
                                 safe.saved = true;
                                 safe.save();
                              }
                           } else if (safe_value === -1) {
                              const diff = hypervisor.time - hypervisor.files[hypervisor.phase].time;
                              hypervisor.load(hypervisor.phase);
                              hypervisor.time += Math.min(diff, 30);
                              safe.mus_start();
                              safe.load_extra();
                              safe.saved = true;
                           } else if (safe.saved) {
                              safe.saved = false;
                           }
                           const v1 = Math.max((hypervisor.time - 750) / 150, 0);
                           musicFilter.value = v1 * 0.6;
                           musicConvolver.value = v1 * 0.8;
                           renderer.speed.value = 1 - v1 * 0.2;
                           if (hypervisor.time < 300) {
                              safe.fg.alpha.value = 0;
                              safe.load_text.metadata.ticks = 30;
                           } else {
                              safe.fg.alpha.value =
                                 CosmosMath.wave(
                                    (safe.mus_daemon.instances[0]?.position ?? hyper.div246 * 24) / hyper.div246
                                 ) *
                                 ((hypervisor.time - 300) / 600);
                              safe.load_text.content = text.a_citadel.hypertext.count.replace(
                                 '$(x)',
                                 (30 - Math.floor(hypervisor.time / 30)).toString().padStart(2, '0')
                              );
                              safe.load_text.fill = 0xffffff;
                              safe.load_text.metadata.ticks = hypervisor.time % 30;
                              if (
                                 safe.load_text.metadata.ticks < (hypervisor.time < 750 ? 4 : 12) &&
                                 safe.load_text.metadata.ticks % 4 === 0
                              ) {
                                 hypervisor.instance({ daemon: sounds.indicator, rate: 2 });
                              }
                           }
                           hypervisor.time++;
                        }
                     }
                  };
                  await Promise.all([
                     rescueLoader,
                     hyper.static().then(async () => {
                        engageDelay();
                        await renderer.pause(500);
                     })
                  ]);
                  safe.progress.container.addChild(safe.progress.metadata.graphics);
                  const genFinalPickup = (frame: CosmosImage, x: number, y: number, sx: number, sy: number) => {
                     const zbf = new ZoomBlurFilter({ strength: 0, radius: 500, innerRadius: 0 });
                     return bulletSetup(
                        new CosmosHitbox({
                           area: renderer.area,
                           size: { x: sx, y: sy },
                           anchor: 0,
                           position: { x, y },
                           metadata: { bullet: true, color: 'green', damage: 0 },
                           objects: [ new CosmosSprite({ anchor: 0, frames: [ frame ] }) ],
                           filters: [ zbf ]
                        }).on('tick', function () {
                           this.offsets[0].set(Math.random() * 2 - 1, Math.random() * 2 - 1);
                           zbf.strength = 0.1 + Math.random() * 0.2;
                           const { x, y } = renderer
                              .projection(this.position.add(this.parent?.position ?? {}), game.camera.position)
                              .multiply(2);
                           zbf.center = [ x, y ];
                        }),
                        true
                     );
                  };
                  switch (hypervisor.phase) {
                     case 0: {
                        if (!hypervisor.attempts.includes(0)) {
                           hypervisor.attempts.push(0);
                           await safe.intro(...text.a_citadel.hypertext.cyan1);
                        }
                        const rockclimber = new CosmosSprite({ frames: [ content.ibcTwinklyJusant ] });
                        const pickups = [
                           { x: 60, y: 660 },
                           { x: 180, y: 620 },
                           { x: 280, y: 520 },
                           { x: 380, y: 580 },
                           { x: 80, y: 380 },
                           { x: 180, y: 420 },
                           { x: 260, y: 360 },
                           { x: 360, y: 320 },
                           { x: 460, y: 380 },
                           { x: 220, y: 180 },
                           { x: 340, y: 100 },
                           { x: 420, y: 220 },
                           { x: 580, y: 200 }
                        ];
                        const finalpickup = genFinalPickup(content.ibcTwinklySpoon, 240, -20, 89, 21);
                        await safe.setup(
                           () => {
                              if (battler.SOUL.metadata.cyanLeap) {
                                 return 0;
                              } else if (
                                 760 <= battler.SOUL.position.y ||
                                 battler.SOUL.position.y <= 0 ||
                                 pickups.find(
                                    pickup =>
                                       Math.abs(battler.SOUL.position.x - pickup.x) <= 7 &&
                                       Math.abs(battler.SOUL.position.y - pickup.y) <= 7
                                 ) !== void 0
                              ) {
                                 return 1;
                              } else {
                                 return -1;
                              }
                           },
                           () => CosmosMath.remap_clamped(battler.SOUL.position.y, 0, 1, 760, 0),
                           { x: 160, y: -20 },
                           { x: 480, y: 720 },
                           160,
                           800,
                           'cyan',
                           finalpickup.detached,
                           { x: 160, y: -60 },
                           () => {},
                           () => {},
                           rockclimber
                        );
                        finalpickup.detach();
                        safe.result && (await safe.outro(...text.a_citadel.hypertext.cyan2));
                        break;
                     }
                     case 1: {
                        if (!hypervisor.attempts.includes(1)) {
                           hypervisor.attempts.push(1);
                           await safe.intro(...text.a_citadel.hypertext.orange1);
                        }
                        let prog = 1;
                        let prog_storage = 1;
                        const whiterect = CosmosUtils.populate(7, index => {
                           return new CosmosRectangle({
                              anchor: 0,
                              position: { x: 80 + index * 240, y: 120 },
                              fill: 0xffffff,
                              size: 240
                           }).on('tick', function () {
                              this.alpha.value = Math.min(
                                 Math.max(CosmosMath.remap(prog, 1, 0, index, index + 1), 0),
                                 1
                              );
                           });
                        });
                        const blackrect = [
                           { i: 1, s: true, x: 200, y: 50 },
                           { i: 1, s: false, x: 200, y: 110 },
                           { i: 1, s: false, x: 200, y: 190 },
                           { i: 2, s: false, x: 440, y: 90 },
                           { i: 2, s: false, x: 440, y: 130 },
                           { i: 2, s: true, x: 440, y: 190 },
                           { i: 3, s: false, x: 680, y: 50 },
                           { i: 3, s: true, x: 680, y: 130 },
                           { i: 3, s: false, x: 680, y: 190 }
                        ].map(data => {
                           const rec = new CosmosRectangle({ anchor: 0, fill: 0, size: { x: 6, y: 0 } });
                           return new CosmosHitbox<
                              ShootableEvents,
                              { time: number; shootable: boolean; time_storage: number; s: boolean }
                           >({
                              size: { y: 20 },
                              anchor: 0,
                              position: data,
                              priority: 2,
                              metadata: { time: Infinity, shootable: true, time_storage: Infinity, s: data.s },
                              objects: [ rec ]
                           })
                              .on('tick', function () {
                                 if (hypervisor.time < this.metadata.time) {
                                    this.metadata.time = Infinity;
                                    rec.size.y = 0;
                                 } else {
                                    const subtime = hypervisor.time - this.metadata.time;
                                    if (subtime < 4) {
                                       const p = subtime / 3;
                                       rec.size.y = p * 20;
                                       if (data.s) {
                                          data.i <= prog && prog < data.i + 1 && (prog = data.i + p);
                                       } else {
                                          data.i - 1 < prog && prog <= data.i && (prog = data.i - p);
                                       }
                                       subtime === 3 && hypervisor.instance({ daemon: sounds.pathway });
                                    } else {
                                       rec.size.y = 20;
                                       if (data.s) {
                                          data.i <= prog && prog < data.i + 1 && (prog = data.i + 1);
                                       } else {
                                          data.i - 1 < prog && prog <= data.i && (prog = data.i - 1);
                                       }
                                    }
                                 }
                              })
                              .on('shot', function () {
                                 if (hypervisor.time < this.metadata.time && prog < data.i + 1) {
                                    this.metadata.time = hypervisor.time;
                                 }
                              });
                        });
                        const doorblaster = new CosmosSprite({
                           frames: [ content.ibcTwinklyStanleyparable ],
                           priority: 1,
                           objects: [
                              ...whiterect,
                              new CosmosSprite({ frames: [ content.ibcTwinklyStanleycolumn ], priority: 1 }),
                              ...blackrect
                           ]
                        });
                        const shakeTicker = () => {
                           renderer.shake.value = Math.max(
                              battler.SOUL.metadata.orangeTick / 7.5,
                              ...blackrect.map(rect => {
                                 const target = rect.metadata.time - 3;
                                 if (hypervisor.time < target) {
                                    return 0;
                                 } else {
                                    return 2 - Math.min(hypervisor.time - target, 15) / 7.5;
                                 }
                              })
                           );
                        };
                        renderer.on('pre-render', shakeTicker);
                        const finalpickup = genFinalPickup(content.ibcTwinklyItssobad, 780, 120, 22, 54);
                        await safe.setup(
                           () => {
                              if (
                                 battler.SOUL.position.y < 20 ||
                                 battler.SOUL.position.y > 220 ||
                                 prog === Math.floor((battler.SOUL.position.x + 40) / 240)
                              ) {
                                 return -1;
                              } else if (Math.abs(120 - ((battler.SOUL.position.x + 160) % 240)) < 9) {
                                 const br = blackrect.find(
                                    br =>
                                       Math.abs(battler.SOUL.position.x - br.position.x) <= 20 &&
                                       Math.abs(battler.SOUL.position.y - br.position.y) <= 6
                                 );
                                 if (br === void 0) {
                                    return -1;
                                 } else if (br.metadata.time === Infinity) {
                                    return -1;
                                 } else if (br.metadata.s) {
                                    return 1;
                                 } else {
                                    return 0;
                                 }
                              } else {
                                 return 0;
                              }
                           },
                           () => CosmosMath.remap_clamped(battler.SOUL.position.x, 0, 1, 200, 680),
                           { x: 160, y: 120 },
                           { x: 720, y: 120 },
                           100,
                           120,
                           'orange',
                           finalpickup.detached,
                           { x: 720, y: 120 },
                           () => {
                              prog_storage = prog;
                           },
                           () => {
                              prog = prog_storage;
                           },
                           doorblaster
                        );
                        renderer.off('pre-render', shakeTicker);
                        renderer.shake.value = 0;
                        finalpickup.detach();
                        safe.result && (await safe.outro(...text.a_citadel.hypertext.orange2));
                        break;
                     }
                     case 2: {
                        if (!hypervisor.attempts.includes(2)) {
                           hypervisor.attempts.push(2);
                           await safe.intro(...text.a_citadel.hypertext.blue1);
                        }
                        const loop = 1040;
                        const lands = [ 0, 260, 520, 780, 1040, 1300 ];
                        const plats = [
                           { x: 55, y: 165 },
                           { x: 130, y: 150 },
                           { x: 205, y: 155 },
                           { x: 315, y: 165 },
                           { x: 390, y: 170 },
                           { x: 465, y: 175 },
                           { x: 575, y: 175 },
                           { x: 650, y: 170 },
                           { x: 725, y: 165 },
                           { x: 835, y: 155 },
                           { x: 910, y: 150 },
                           { x: 985, y: 165 },
                           { x: 1095, y: 165 },
                           { x: 1170, y: 150 },
                           { x: 1245, y: 155 }
                        ];
                        const landhopper = new CosmosSprite({
                           frames: [ content.ibcTwinklyGeodash ],
                           objects: [
                              ...lands.map(land =>
                                 new CosmosHitbox({
                                    metadata: { platform: void 0 as number | void },
                                    position: { x: land, y: 170 }
                                 }).on('tick', function () {
                                    this.metadata.platform =
                                       battler.SOUL.position.y <= 166 &&
                                       Math.abs((battler.SOUL.position.x % loop) - land) <= 31
                                          ? 166
                                          : void 0;
                                 })
                              ),
                              ...plats.map(plat => {
                                 const o = plat.x / 1040;
                                 return new CosmosHitbox({
                                    metadata: { platform: void 0 as number | void },
                                    position: { x: plat.x },
                                    objects: [
                                       new CosmosSprite({ anchor: { x: 0 }, frames: [ content.ibcTwinklyGeoplatform ] })
                                    ]
                                 }).on('tick', function () {
                                    const y = plat.y + CosmosMath.linear((o + hypervisor.time / 60) % 1, 8, 20, 8);
                                    this.metadata.platform =
                                       battler.SOUL.position.y <= y - (y < this.position.y ? 3 : 4) &&
                                       Math.abs((battler.SOUL.position.x % loop) - plat.x) <= 15
                                          ? y - 4
                                          : void 0;
                                    this.position.y = y;
                                 });
                              })
                           ]
                        });
                        const rings = [
                           { x: 90, y: 140 },
                           { x: 170, y: 120 },
                           { x: 350, y: 140 },
                           { x: 430, y: 160 },
                           { x: 610, y: 160 },
                           { x: 690, y: 140 },
                           { x: 870, y: 120 },
                           { x: 950, y: 140 },
                           { x: 1130, y: 140 },
                           { x: 1210, y: 120 }
                        ].map(data => {
                           return new CosmosSprite({
                              position: data,
                              priority: 4000,
                              anchor: 0,
                              frames: [ content.ibcTwinklyGeoring ]
                           });
                        });
                        const finalpickup = genFinalPickup(content.ibcTwinklyShoes, 1300, 140, 36, 34);
                        await safe.setup(
                           () => {
                              if (
                                 battler.SOUL.position.y === 166 &&
                                 lands.find(land => Math.abs(battler.SOUL.position.x - land) <= 31) !== void 0
                              ) {
                                 return 1;
                              } else if (
                                 220 <= battler.SOUL.position.y ||
                                 (battler.SOUL.position.y > 166 &&
                                    lands.find(land => Math.abs(battler.SOUL.position.x - land) <= 31) !== void 0) ||
                                 rings.find(
                                    ring =>
                                       Math.abs(battler.SOUL.position.x - ring.position.x) < 7 &&
                                       16 <= Math.abs(battler.SOUL.position.y - ring.position.y)
                                 ) !== void 0
                              ) {
                                 return -1;
                              } else {
                                 return 0;
                              }
                           },
                           () => CosmosMath.remap_clamped(battler.SOUL.position.x, 0, 1, 30, 750),
                           { x: 160, y: 120 },
                           { x: 1190, y: 120 },
                           10,
                           166,
                           'blue',
                           finalpickup.detached,
                           { x: 1190, y: 120 },
                           () => {},
                           () => {},
                           landhopper,
                           ...rings
                        );
                        finalpickup.detach();
                        safe.result && (await safe.outro(...text.a_citadel.hypertext.blue2));
                        break;
                     }
                     case 3: {
                        if (!hypervisor.attempts.includes(3)) {
                           hypervisor.attempts.push(3);
                           await safe.intro(...text.a_citadel.hypertext.purple1);
                        }
                        const regions = [
                           { x1: 20, y1: 280, x2: 140, y2: 360, l: 0 },
                           { x1: 140, y1: 120, x2: 220, y2: 360, l: -1 },
                           { x1: 220, y1: 120, x2: 380, y2: 200, l: 1 },
                           { x1: 380, y1: 120, x2: 460, y2: 360, l: 1 },
                           { x1: 460, y1: 280, x2: 540, y2: 360, l: -1 },
                           { x1: 540, y1: 280, x2: 620, y2: 440, l: 1 },
                           { x1: 620, y1: 360, x2: 700, y2: 440, l: -1 },
                           { x1: 700, y1: 120, x2: 780, y2: 440, l: -1 },
                           { x1: 780, y1: 120, x2: 860, y2: 200, l: 1 },
                           { x1: 860, y1: 40, x2: 940, y2: 200, l: -1 },
                           { x1: 940, y1: 40, x2: 1020, y2: 120, l: -1 },
                           { x1: 1020, y1: 40, x2: 1100, y2: 200, l: 1 },
                           { x1: 1100, y1: 120, x2: 1180, y2: 200, l: -1 },
                           { x1: 1180, y1: 120, x2: 1260, y2: 360, l: 1 },
                           { x1: 1260, y1: 280, x2: 1380, y2: 360, l: 0 }
                        ];
                        const lines = regions.slice(1).map(region => region.x1);
                        const controller = new CosmosObject({
                           fill: 0x800080,
                           priority: -13985713,
                           position: { x: 700 },
                           objects: CosmosUtils.populate(
                              24,
                              () => new CosmosRectangle({ anchor: 0, size: { x: 1400, y: 0.5 } })
                           )
                        }).on('tick', function () {
                           if (game.movement) {
                              for (const region of regions) {
                                 if (battler.SOUL.position.x < region.x2) {
                                    battler.line.loop = region.l;
                                    break;
                                 }
                              }
                           }
                           const offs = battler.line.offset;
                           battler.line.offset = (battler.line.offset + battler.line.loop + 20) % 20;
                           if (Math.abs(offs - battler.line.offset) > 10) {
                              battler.line.iterations++;
                           }
                           let index = 0;
                           for (const object of this.objects as CosmosRectangle[]) {
                              object.position.y = battler.line.offset + index++ * 20 - 0.5;
                           }
                        });
                        const mazetraveler = new CosmosSprite({ frames: [ content.ibcTwinklyWinterrowd ] });
                        const checkpoints = lines.map(line => {
                           return new CosmosSprite({
                              position: { x: line },
                              anchor: { x: 0 },
                              frames: [ content.ibcTwinklyCheckpoint ],
                              priority: 19385
                           });
                        });
                        battler.line.active = true;
                        battler.line.damage = 0;
                        battler.line.loop = 0;
                        battler.line.offset = 0;
                        battler.line.pos.y = 320;
                        battler.line.sticky = false;
                        battler.line.width = 1000000;
                        battler.line.amount_override = 24;
                        battler.line.box_override = 0;
                        hypervisor.line_width = 1000000;
                        renderer.attach('menu', controller);
                        const cameraLocker = () => {
                           renderer.freecam || (renderer.position.y = renderer.position.y < 240 ? 120 : 360);
                        };
                        renderer.on('pre-render', cameraLocker);
                        const finalpickup = genFinalPickup(content.ibcTwinklyPadd, 1340, 320, 43, 57);
                        await safe.setup(
                           () => {
                              const region = regions.find(
                                 region => region.x1 <= battler.SOUL.position.x && battler.SOUL.position.x < region.x2
                              );
                              if (
                                 region === void 0 ||
                                 battler.SOUL.position.y < region.y1 ||
                                 battler.SOUL.position.y > region.y2
                              ) {
                                 return -1;
                              } else {
                                 const line = lines.find(line => battler.SOUL.position.x < line + 4);
                                 if (
                                    line !== void 0 &&
                                    Math.abs(battler.SOUL.position.x - line) <= 4 &&
                                    region.y1 + 8 <= battler.SOUL.position.y &&
                                    battler.SOUL.position.y <= region.y2 - 8
                                 ) {
                                    return 1;
                                 } else {
                                    return 0;
                                 }
                              }
                           },
                           () => CosmosMath.remap_clamped(battler.SOUL.position.x, 0, 1, 132, 1268),
                           { x: 160, y: 120 },
                           { x: 1240, y: 360 },
                           40,
                           320,
                           'purple',
                           finalpickup.detached,
                           { x: 1240, y: 320 },
                           () => {},
                           () => {},
                           mazetraveler,
                           ...checkpoints
                        );
                        finalpickup.detach();
                        renderer.off('pre-render', cameraLocker);
                        renderer.detach('menu', controller);
                        battler.line.amount_override = null;
                        battler.line.box_override = null;
                        hypervisor.line_width = 325;
                        battler.line.reset();
                        safe.result && (await safe.outro(...text.a_citadel.hypertext.purple2));
                        break;
                     }
                     case 4: {
                        if (!hypervisor.attempts.includes(4)) {
                           hypervisor.attempts.push(4);
                           await safe.intro(...text.a_citadel.hypertext.green1);
                        }
                        const xs = [ -30, -10, 10, 30 ];
                        const sep = 80;
                        const bars = [ 1, 2, 0, 1, 1, 2, 3, 1, 0, 2, 3, 3, 1, 2, 1, 3, 1, 3 ].map((bar, index) => ({
                           x: xs[bar],
                           y: index * -sep
                        }));
                        // sorry just got reminded of the voice line that happens when you use arrow volley in the army of darkness defense mobile game (it sounds like bro is saying airolls) ((but to be fair its a cut off voice clip from the movie so y-)) (((but to be doubly fair they coulda done a better j-))) ((((anyway back to work now :grin: :grin: :grin: :skull: :g-))))
                        const AIROLLS = new CosmosAnimation({
                           anchor: 0,
                           position: { x: 160, y: 15 },
                           resources: content.ibcTwinklyFunkin
                        });
                        const controller = new CosmosObject({
                           priority: -1,
                           metadata: {
                              slot: 0,
                              slot_ideal: 0,
                              slot_tick: 3,
                              storage: { slot: 0, slot_ideal: 0, slot_tick: 3 }
                           },
                           objects: bars.map(bar => {
                              return new CosmosSprite({
                                 anchor: 0,
                                 position: bar,
                                 frames: [ content.ibcTwinklyNotebar ]
                              });
                           })
                        }).on('tick', function () {
                           if (this.metadata.slot_tick !== 3) {
                              if (++this.metadata.slot_tick === 3) {
                                 this.metadata.slot = this.metadata.slot_ideal;
                                 hypervisor.instance({ daemon: sounds.menu });
                              }
                           }
                           const x = 160 + xs[this.metadata.slot];
                           const idealx = 160 + xs[this.metadata.slot_ideal];
                           const truex = CosmosMath.remap(this.metadata.slot_tick / 3, x, idealx);
                           this.position.x = truex;
                           AIROLLS.index = this.metadata.slot;
                           if (game.movement) {
                              if (keyState.up) {
                                 (battler.SOUL.position.y += 4.5) > 60 && (battler.SOUL.position.y = 60);
                                 this.tint = 0xfaff29;
                              } else if (keyState.down) {
                                 battler.SOUL.position.y -= 4.5;
                                 this.tint = 0xfaff29;
                              } else {
                                 this.tint = void 0;
                              }
                           }
                        });
                        const thekindness = new CosmosSprite({
                           frames: [ content.ibcTwinklyBeatsaber ],
                           objects: [ AIROLLS ]
                        }).on('pre-render', async function () {
                           this.position.set(renderer.resolve({ x: 0, y: 0 }));
                        });
                        const gr = new Graphics()
                           .lineStyle({ color: 0xffffff, width: 1, alpha: 1 })
                           .moveTo(-30, 0)
                           .lineTo(-30, 240)
                           .moveTo(-10, 0)
                           .lineTo(-10, 240)
                           .moveTo(10, 0)
                           .lineTo(10, 240)
                           .moveTo(30, 0)
                           .lineTo(30, 240)
                           .closePath();
                        gr.zIndex = -2000;
                        thekindness.container.addChild(gr);
                        const finalpickup = genFinalPickup(content.ibcTwinklyXylo, 160, bars.length * -sep, 75, 44);
                        const keyHandler = function (this: CosmosKeyboardInput) {
                           if (game.movement && controller.metadata.slot_tick === 3) {
                              switch (this) {
                                 case keys.leftKey: {
                                    --controller.metadata.slot_ideal < 0 && (controller.metadata.slot_ideal = 0);
                                    break;
                                 }
                                 case keys.rightKey: {
                                    ++controller.metadata.slot_ideal > 3 && (controller.metadata.slot_ideal = 3);
                                    break;
                                 }
                              }
                              if (controller.metadata.slot !== controller.metadata.slot_ideal) {
                                 controller.metadata.slot_tick = 0;
                              }
                           }
                        };
                        for (const key of [ keys.leftKey, keys.rightKey ]) {
                           key.on('down', keyHandler);
                        }
                        const restraint = new CosmosSprite({
                           priority: -43394,
                           anchor: 0,
                           frames: [ content.ibcTwinklyRestraint ]
                        }).on('pre-render', function () {
                           this.position.set(battler.SOUL);
                        });
                        await safe.setup(
                           () => {
                              const bar = bars.find(bar => Math.abs(battler.SOUL.position.y - bar.y) <= 14);
                              if (bar !== void 0) {
                                 if (Math.abs(battler.SOUL.position.x - (controller.position.x + bar.x)) <= 6) {
                                    return 0;
                                 } else {
                                    return -1;
                                 }
                              } else {
                                 return 1;
                              }
                           },
                           () =>
                              Math.min(
                                 Math.max(
                                    CosmosMath.remap(battler.SOUL.position.y, 0, 1, 0, bars.length * -sep + sep / 2),
                                    0
                                 ),
                                 1
                              ),
                           { x: 160, y: bars.length * -sep + sep / 2 },
                           { x: 160, y: 60 },
                           160,
                           30,
                           'green',
                           finalpickup.detached,
                           { x: 160, y: bars.length * -sep + sep / 2 },
                           () => {
                              controller.metadata.storage.slot = controller.metadata.slot;
                              controller.metadata.storage.slot_tick = controller.metadata.slot_tick;
                              controller.metadata.storage.slot_ideal = controller.metadata.slot_ideal;
                           },
                           () => {
                              controller.metadata.slot = controller.metadata.storage.slot;
                              controller.metadata.slot_tick = controller.metadata.storage.slot_tick;
                              controller.metadata.slot_ideal = controller.metadata.storage.slot_ideal;
                           },
                           controller,
                           thekindness,
                           restraint
                        );
                        for (const key of [ keys.leftKey, keys.rightKey ]) {
                           key.off('down', keyHandler);
                        }
                        finalpickup.detach();
                        safe.result && (await safe.outro(...text.a_citadel.hypertext.green2));
                        break;
                     }
                     case 5: {
                        safe.result = true;
                        const mus = music.sng12.instance(renderer);
                        mus.source!.loopStart = hyper.div246 * 20;
                        mus.source!.loopEnd = hyper.div246 * 24;
                        await safe.dialogue(...text.a_citadel.hypertext.yellow);
                        mus.stop();
                        break;
                     }
                  }
                  disengageDelay();
                  if (safe.result) {
                     hyper.assets[hypervisor.phase]!.unload();
                     SAVE.flag.n.neutral_twinkly_base = hypervisor.random.value;
                     SAVE.flag.n.neutral_twinkly_stage = [ 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 4 ][
                        hypervisor.phase
                     ] as typeof SAVE.flag.n.neutral_twinkly_stage;
                     hypervisor.phase = hyper.phase();
                     await antifreeze([ phaseLoader, phaseLoaderAdditional, hyper.static() ]);
                  } else {
                     hypervisor.random.value = SAVE.flag.n.neutral_twinkly_base;
                     phaseAssets?.unload();
                     await hyper.static();
                     phaseAssetsAdditional?.unload();
                  }
                  rescueAssets?.unload();
               } else {
                  renderer.detach('menu', hyper.rect_wf);
                  const d = SAVE.flag.n._deaths_twinkly++;
                  let r = 0;
                  while (r++ < 1000) {
                     hypervisor.random.next_void();
                  }
                  SAVE.flag.n.neutral_twinkly_base = hypervisor.random.value;
                  renderer.pause(50).then(() => {
                     babybloomer.bloomScale = 0.4;
                     hypervisor.phase === 6 && renderer.filters?.splice(renderer.filters.indexOf(hyper.zbf), 1);
                  });
                  await renderer.pause(100);
                  hypervisor.silence();
                  const position = battler.SOUL.position.clone();
                  const colortint = battler.SOUL.objects[0].tint;
                  const SOUL = new CosmosSprite({
                     anchor: 0,
                     frames: [ content.ibuBossSOUL ],
                     position,
                     scale: { x: 0.5, y: battler.SOUL.scale.y / -2 },
                     tint: colortint
                  });
                  renderer.attach('menu', hyper.layer);
                  hyper.layer.attach(SOUL);
                  const cancelled = new Vow();
                  const zListener = () => {
                     keys.interactKey.off('down', zListener);
                     cancelled.confirm();
                  };
                  d === 0 || keys.interactKey.on('down', zListener);
                  let gameover: CosmosInstance | null = null;
                  await Promise.race([ cancelled, renderer.pause(660) ]).then(async () => {
                     hyper.layer.detach(SOUL);
                     if (!cancelled.active) {
                        return;
                     }
                     const sh = new CosmosValue();
                     const breakSOUL = new CosmosSprite({
                        anchor: 0,
                        frames: [ content.ibuBossbreak ],
                        position,
                        scale: { x: 0.5, y: battler.SOUL.scale.y / -2 },
                        tint: colortint,
                        priority: 200001
                     }).on('tick', function () {
                        this.offsets[0].set(sh.value * (Math.random() - 0.5), sh.value * (Math.random() - 0.5));
                     });
                     hyper.layer.attach(breakSOUL);
                     const snd1 = sounds.break.instance(renderer);
                     await Promise.race([ cancelled, renderer.pause(1330) ]);
                     hyper.layer.detach(breakSOUL);
                     if (!cancelled.active) {
                        snd1.stop();
                        return;
                     }
                     const shards = CosmosUtils.populate(6, index =>
                        new CosmosAnimation({
                           active: true,
                           anchor: 0,
                           resources: content.ibuBossshatter,
                           position: position.add(index * 2 - (index < 3 ? 7 : 3), (index % 3) * 3),
                           scale: 0.5,
                           tint: colortint
                        }).on(
                           'tick',
                           (() => {
                              let gravity = 0;
                              const direction = Math.random() * 360;
                              return async function () {
                                 this.position = this.position.endpoint(direction, 3.5).add(0, (gravity += 0.1));
                                 if (this.position.y > 250) {
                                    renderer.detach('menu', this);
                                 }
                              };
                           })()
                        )
                     );
                     hyper.layer.attach(...shards);
                     const snd2 = sounds.shatter.instance(renderer);
                     await Promise.race([ cancelled, renderer.pause(650) ]);
                     if (!cancelled.active) {
                        hyper.layer.detach(...shards);
                        snd2.stop();
                        return;
                     }
                     gameover = music.saved.instance(renderer);
                     gameover.rate.value = 0.5;
                     const defeat = new CosmosSprite({
                        alpha: 0,
                        frames: [ content.ibuDefeat ],
                        position: { x: 114 / 2, y: 36 / 2 },
                        scale: 0.5
                     });
                     hyper.layer.attach(defeat);
                     defeat.alpha.modulate(renderer, 1250, 1);
                     await Promise.race([ cancelled, renderer.pause(650) ]);
                     if (!cancelled.active) {
                        hyper.layer.detach(defeat);
                        gameover.stop();
                        return;
                     }
                     zListener();
                     const backEnd = new CosmosText({
                        fill: 0xffffff,
                        position: { x: 160 / 2, y: 324 / 2 },
                        stroke: -1,
                        priority: 1,
                        fontFamily: content.fDeterminationMono,
                        fontSize: 16,
                        spacing: { x: 1, y: 5 }
                     }).on('tick', function () {
                        this.content = game.text;
                     });
                     hyper.layer.attach(backEnd);
                     atlas.switch('dialoguerBase');
                     await dialogue_primitive(
                        ...[
                           text.a_citadel.hypertext.death1,
                           text.a_citadel.hypertext.death2,
                           text.a_citadel.hypertext.death3,
                           text.a_citadel.hypertext.death4,
                           text.a_citadel.hypertext.death5,
                           text.a_citadel.hypertext.death6,
                           text.a_citadel.hypertext.death7
                        ][hypervisor.phase].map(line => `${d === 0 ? '<20>{*}' : '<20>'}${line}`)
                     );
                     hyper.layer.detach(backEnd);
                     await Promise.all([
                        gameover?.gain.modulate(renderer, 1250, 0).then(() => gameover!.stop()),
                        defeat.alpha.modulate(renderer, 1250, 0)
                     ]);
                     hyper.layer.detach(defeat, ...shards);
                  });
                  renderer.pause(500).then(() => {
                     babybloomer.bloomScale = 1.4;
                  });
                  await renderer.pause(1000);
                  boot = true;
               }
               hyper.color_reset();
            }
            battler.SOUL.off('tick', invTicker);
            battler.active = false;
            twAssets3a.unload();
            twAssets5a.unload();
            twAssets7a.unload();
            twAssets9a.unload();
            twAssets11a.unload();
            twAssets13a.unload();
            twAssets15.unload();
            updateArmor(armor);
            SAVE.data.s.weapon = weapon;
         } else if (SAVE.flag.n.neutral_twinkly_stage < 6) {
            await renderer.on('tick');
         }
      }
      const stellarObjects = [ grey, galaxy, blue, basic ];
      if (SAVE.flag.n.neutral_twinkly_stage < 6) {
         (renderer.filters ??= []).push(hyper.zbf);
         const twLoader17 = Promise.all([
            twAssets17.load(),
            rooms.of('_hangar').preload.load(),
            neutralText.m.audio.load()
         ]);
         blue.tint = void 0;
         galaxy.alpha.value = 0;
         grey.tint = void 0;
         let mv = true;
         const b14 = text.a_citadel.story.bad14;
         const hmax = height(b14.length);
         const bpf = new BulgePinchFilter({ strength: 1 });
         const blackhole = new CosmosObject({ metadata: { x: 0, y: -160, z: hmax, p: -10000, s: 1 } });
         blackhole.container.addChild(new Graphics().beginFill(0, 1).drawCircle(0, 0, 100).endFill());
         const fri = new CosmosEntity({
            face: 'up',
            tint: 0xffffff,
            metadata: { x: 0, y: 60, z: 5, p: 1000 },
            sprites: {
               down: new CosmosAnimation({
                  anchor: { x: 0, y: 1 },
                  resources: SAVE.data.b.water ? content.iocFriskDownWater : content.iocFriskDown
               }),
               left: new CosmosAnimation({
                  anchor: { x: 0, y: 1 },
                  resources: SAVE.data.b.water ? content.iocFriskLeftWater : content.iocFriskLeft
               }),
               right: new CosmosAnimation({
                  anchor: { x: 0, y: 1 },
                  resources: SAVE.data.b.water ? content.iocFriskRightWater : content.iocFriskRight
               }),
               up: new CosmosAnimation({
                  anchor: { x: 0, y: 1 },
                  resources: SAVE.data.b.water ? content.iocFriskUpWater : content.iocFriskUp
               })
            }
         }).on('tick', function () {
            let active = false;
            if (mv) {
               const sp = game.sprint && keyState.special ? 30 : 3;
               if (keyState.left) {
                  active = this.metadata.x > -75;
                  this.face = 'left';
                  (this.metadata.x -= sp) < -75 && (this.metadata.x = -75);
               } else if (keyState.right) {
                  active = this.metadata.x < 75;
                  this.face = 'right';
                  (this.metadata.x += sp) > 75 && (this.metadata.x = 75);
               }
               if (keyState.up) {
                  active = true;
                  this.face = 'up';
                  this.metadata.z += sp;
               } else if (keyState.down) {
                  this.metadata.z > 0 && (active = true);
                  this.face = 'down';
                  (this.metadata.z -= sp) < 0 && (this.metadata.z = 0);
               }
            }
            for (const sprite of Object.values(this.sprites)) {
               if (active && sprite === this.sprite) {
                  sprite.enable();
               } else {
                  sprite.reset();
               }
            }
            if (this.sprite.index % 2 === 1 && this.sprite.step === this.sprite.duration - 1) {
               sounds.step.instance(renderer);
            }
         });
         const graphics = new Graphics();
         const gobject = new CosmosObject();
         gobject.container.addChild(graphics);
         const lampposts = CosmosUtils.populate(18, index => {
            return new CosmosSprite({
               anchor: 0,
               frames: [ content.iooCArchiveLight ],
               metadata: { x: [ -240, 240 ][index % 2], y: 60, z: Math.floor(index / 2) * 400, s: 3 }
            });
         });
         const wind = SAVE.flag.n.neutral_twinkly_stage < 5.1 ? sounds.wind.instance(renderer) : null;
         wind && (wind.gain.value = 0);
         const dl2 =
            SAVE.flag.n.neutral_twinkly_stage < 5.1 || SAVE.flag.n.neutral_twinkly_choice === 1
               ? sounds.deeploop2.instance(renderer)
               : null;
         dl2 && (dl2.gain.value = 0);
         const yourworld = new CosmosObject({
            objects: [ blackhole, ...lampposts, gobject, fri ],
            position: { x: 160, y: 120 },
            priority: 1002
         }).on('tick', function () {
            const camX = Math.min(Math.max(fri.metadata.x, -40), 40);
            const camZ = Math.max(fri.metadata.z - 80, 0);
            const camF = CosmosMath.remap_clamped(fri.metadata.z, 0, 1, hmax / 3, hmax);
            soundDelay.value = camF * 0.5;
            blackhole.metadata.x = camX;
            blackhole.metadata.y = -160 + Math.max(fri.metadata.z - blackhole.metadata.z, 0) / 4;
            wind && (wind.gain.value = camF * wind.daemon.gain);
            hyper.zbf.strength = camF * 0.03;
            galaxy.alpha.value = camF;
            if (dl2) {
               const pwr = CosmosMath.remap(blackhole.metadata.s, 0, 1, 1, 2);
               dl2.gain.value = Math.min(pwr, 1) * dl2.daemon.gain;
               renderer.shake.value = pwr * 2;
               hyper.zbf.strength += pwr * 0.02;
            }
            for (const obj of this.objects as CosmosObject<
               CosmosBaseEvents,
               { x: number; y: number; z: number; p: number | void; s: number | void }
            >[]) {
               if (obj === gobject) {
                  continue;
               }
               const div = obj.metadata.z - camZ + 80;
               if (div > 0) {
                  obj.alpha.value = 1;
                  const scale = 160 / div;
                  obj.scale.set(scale * (obj.metadata.s ?? 1));
                  obj.position.set(scale * (obj.metadata.x - camX), scale * obj.metadata.y);
                  obj.priority.value = obj.metadata.p ?? -obj.metadata.z;
               } else {
                  obj.alpha.value = 0;
               }
            }
            bpf.radius = blackhole.scale.x * 2 * 150;
            bpf.center = [ 0.5, (240 + blackhole.position.y * 2) / 480 ];
            graphics
               .clear()
               .beginFill(0, 0.5 - camF * 0.5)
               .drawPolygon(-gx - camX, 120, gx - camX, 120, 0, 0)
               .endFill()
               .beginFill(0xffffff, 0.5 - camF * 0.5)
               .drawPolygon(-gx - camX, 120, -(gx + 8) - camX, 120, 0, 0)
               .drawPolygon(gx - camX, 120, gx + 8 - camX, 120, 0, 0)
               .endFill();
         });
         const finalbackdrop = new CosmosObject({
            area: new Rectangle(0, 0, 640, 480),
            filters: [ bpf ],
            objects: stellarObjects,
            priority: -1378518375
         }).on('pre-render', function () {
            this.area!.x = renderer.layers.menu.container.position.x;
            this.area!.y = renderer.layers.menu.container.position.y;
         });
         renderer.attach('menu', finalbackdrop, yourworld, hyper.text);
         if (SAVE.flag.n.neutral_twinkly_stage < 5) {
            for (const [ index, line ] of b14.entries()) {
               const hpos = height(index);
               await renderer.when(() => hpos <= fri.metadata.z);
               dialogue_primitive(line);
            }
            await renderer.when(() => hmax <= fri.metadata.z);
            SAVE.flag.n.neutral_twinkly_stage = 5;
            mv = false;
            fri.metadata.z = hmax;
            await renderer.pause(750);
         } else {
            mv = false;
            fri.metadata.z = hmax;
         }
         const friX = Math.min(Math.max(fri.metadata.x, -40), 40);
         const SOUL = new CosmosAnimation({
            alpha: 0,
            priority: 9185679138756,
            anchor: 0,
            resources: content.ibuSOUL,
            metadata: { x: friX, y: 90, z: hmax, s: 0.75 }
         }).on('tick', function () {
            if (this.alpha.value === 1) {
               const sp = keyState.special ? 1 : 2;
               if (keyState.left) {
                  (this.metadata.x -= sp) < friX - 160 && (this.metadata.x = friX - 160);
               } else if (keyState.right) {
                  (this.metadata.x += sp) > friX + 160 && (this.metadata.x = friX + 160);
               }
               if (keyState.up) {
                  (this.metadata.y -= sp) < 67.5 && (this.metadata.y = 67.5);
               } else if (keyState.down) {
                  (this.metadata.y += sp) > 112.5 && (this.metadata.y = 112.5);
               }
            }
         });
         const buttonTicker = function (this: CosmosAnimation) {
            const inside =
               SOUL.alpha.value === 1 &&
               SOUL.metadata.x < this.metadata.x + 46 &&
               SOUL.metadata.x > this.metadata.x - 46 &&
               SOUL.metadata.y < this.metadata.y + 20 &&
               SOUL.metadata.y > this.metadata.y - 20;
            if (inside && this.index === 0) {
               this.index = 1;
               sounds.menu.instance(renderer);
            } else if (!inside && this.index === 1) {
               this.index = 0;
               sounds.menu.instance(renderer);
            }
         };
         const inputObjects = [
            new CosmosAnimation({
               priority: -19359,
               anchor: 0,
               metadata: { x: friX - 80, y: 90, z: hmax, s: 0.75 },
               resources: content.ibuFight
            }).on('pre-render', buttonTicker),
            new CosmosAnimation({
               priority: -19359,
               anchor: 0,
               metadata: { x: friX + 80, y: 90, z: hmax, s: 0.75 },
               resources: content.ibuMercy
            }).on('pre-render', buttonTicker),
            SOUL
         ];
         const inputSystem = {
            vow: null as Vow | null,
            result: 0,
            handler (this: CosmosKeyboardInput) {
               if (inputObjects[0].index === 1) {
                  keys.interactKey.off('down', inputSystem.handler);
                  inputObjects[0].index = 0;
                  inputSystem.result = 0;
               } else if (inputObjects[1].index === 1) {
                  keys.interactKey.off('down', inputSystem.handler);
                  inputObjects[1].index = 0;
                  inputSystem.result = 1;
               } else {
                  return;
               }
               SOUL.alpha.value = 0;
               sounds.select.instance(renderer);
               inputSystem.vow?.confirm();
            },
            setup () {
               SOUL.alpha.value = 1;
               SOUL.metadata.x = friX;
               SOUL.metadata.y = 90;
               SOUL.position.x = 160;
               inputSystem.vow = new Vow();
               keys.interactKey.on('down', inputSystem.handler);
               return inputSystem.vow;
            }
         };
         if (SAVE.flag.n.neutral_twinkly_stage < 5.1) {
            let mi = 0;
            while (true) {
               yourworld.attach(...inputObjects);
               await inputSystem.setup();
               yourworld.detach(...inputObjects);
               if (inputSystem.result === 0) {
                  blackhole.metadata.s = 1;
                  SAVE.flag.n.neutral_twinkly_choice = 1;
                  break;
               }
               blackhole.metadata.s = [ 1, 1, 4 / 3, 5 / 3, 2, 2, 2, 1, 1, 4 / 3, 2, 1 ][mi];
               if (mi === 11) {
                  break;
               }
               atlas.switch('dialoguerBase');
               await dialogue_primitive(...text.a_citadel.story.bad15[mi++]);
               atlas.switch(null);
               await renderer.pause(1500);
            }
            SAVE.flag.n.neutral_twinkly_stage = 5.1;
            atlas.navigators.delete('navx');
            sounds.step.stop();
            wind?.stop();
         }
         atlas.switch('dialoguerBase');
         await dialogue_primitive(
            ...[ text.a_citadel.story.bad16a, text.a_citadel.story.bad16b ][SAVE.flag.n.neutral_twinkly_choice]
         );
         atlas.switch(null);
         if (SAVE.flag.n.neutral_twinkly_choice === 0) {
            await renderer.alpha.modulate(renderer, 3000, 0);
         } else {
            await new CosmosValueLinked({
               get value () {
                  return blackhole.metadata.s;
               },
               set value (v) {
                  blackhole.metadata.s = v;
               }
            }).modulate(renderer, 5000, 1, 1, 1, 0);
         }
         renderer.detach('menu', finalbackdrop, yourworld, hyper.text);
         renderer.shake.value = 0;
         galaxy.alpha.value = 0;
         dl2?.stop();
         disengageDelay();
         renderer.pause(50).then(() => {
            renderer.filters?.splice(renderer.filters.indexOf(hyper.zbf), 1);
         });
         if (SAVE.flag.n.neutral_twinkly_choice === 0) {
            await renderer.pause(1000);
            renderer.alpha.value = 1;
            sounds.run.instance(renderer);
            const display = atlas.navigators.of('frontEnd').objects[1];
            display.position.y = 240 - display.position.y;
            renderer.attach('menu', display);
            atlas.switch('dialoguerBase');
            dialogue_primitive(...text.a_citadel.story.bad17);
            await renderer.pause(5000);
            typer.reset(true);
            renderer.detach('menu', display);
            atlas.switch(null);
            display.position.y = 240 - display.position.y;
            await renderer.pause(2000);
         } else {
            await renderer.pause(2000);
            sounds.boom.instance(renderer).rate.value = 0.5;
            const wf = fader({ fill: 0xffffff });
            await wf.alpha.modulate(renderer, 300, 1);
            await renderer.pause(2000);
            await wf.alpha.modulate(renderer, 6000, 0);
            renderer.detach('menu', wf);
            await renderer.pause(2000);
         }
         twAssets16.unload();
         await antifreeze([ twLoader17, renderer.pause(2000) ]);
         SAVE.flag.b.neutral_reload = true;
         SAVE.flag.n.neutral_twinkly_stage = 6;
         SAVE.flag.s.neutral_unique = neutralText.k;
         await credits(false);
      } else {
         SAVE.flag.s.neutral_unique += `,${neutralText.k}`;
      }
      game.timer = false;
      if (SAVE.data.n.state_starton_trashprogress < 2) {
         await renderer.pause(2000);
         const pom = new OutertaleMultivisualObject(
            {
               metadata: {
                  barkTime: 0
               },
               position: { x: 340, y: 180 }
            },
            { anchor: 0 }
         ).on('tick', function () {
            if (this.metadata.barkTime-- > 0) {
               if (this.objects[0] === this.animation) {
                  this.animation.reset();
                  this.use(content.ibbPombark);
               }
            } else if (this.objects[0] === this.sprite) {
               this.use(content.ibbPomwag);
               this.animation.enable();
            }
         });
         pom.use(content.ibbPomwalk);
         renderer.attach('menu', pom);
         pom.animation.enable();
         await pom.position.step(renderer, 3, { x: 160 });
         pom.animation.reset();
         pom.use(content.ibbPomwag);
         pom.animation.enable();
         await renderer.pause(1500);
         const display = genRLD();
         renderer.attach('menu', display);
         atlas.switch('dialoguerBase');
         const barkTrigger = (h: string) => {
            if (h === 'x1' && pom.metadata.barkTime !== 4) {
               pom.metadata.barkTime = 4;
               sounds.bark.instance(renderer);
            }
         };
         const check2 = commonText.a_common.dogcheck2();
         typer.on('header', barkTrigger);
         await typer.text(
            ...commonText.a_common.dogcheck1,
            ...check2,
            ...commonText.a_common.dogcheck3(check2.length === 0)
         );
         typer.off('header', barkTrigger);
         atlas.switch(null);
         renderer.detach('menu', display);
         await renderer.pause(1500);
         pom.animation.reset();
         pom.use(content.ibbPomwalk);
         pom.animation.enable();
         await pom.position.step(renderer, 3, { x: -20 });
         renderer.detach('menu', pom);
      }
      await renderer.pause(1000);
      await splash();
      await renderer.pause(4000);
      renderer.layers.base.active = true;
      renderer.layers.below.active = true;
      renderer.attach('base', ...stellarObjects);
      const fd = fader({ alpha: 1 });
      await Promise.all([
         ...(neutralText.a.length === 0 ? [] : [ dialogue('dialoguerBottom', ...neutralText.a) ]),
         teleport('_hangar', 'down', 0, 0, { fade: false, fast: true, cutscene: true })
      ]);
      blue.tint = 0x5f5f5f;
      galaxy.alpha.value = 0.75;
      grey.tint = 0x9f9f9f;
      const ender = neutralText.m.instance(renderer);
      ender.gain.value /= 4;
      switch (neutralText.m) {
         case music.ending:
            ender.source!.loopStart = ender.source!.buffer!.duration - (60 / 95) * 96;
            ender.source!.loopEnd = ender.source!.buffer!.duration - (60 / 95) * 48;
            break;
      }
      const ovah = new CosmosSprite({ alpha: 0.5, frames: [ content.ibcTwinklyUnderlay ] });
      renderer.attach('menu', ovah);
      await Promise.all([ fd.alpha.modulate(renderer, 3000, 0), ender.gain.modulate(renderer, 3000, ender.daemon.gain) ]);
      atlas.switch('dialoguerBottom');
      let x0 = false;
      const headerListener = (h: string) => {
         if (h === 'x0') {
            x0 = true;
            typer.off('header', headerListener);
            fd.alpha.value = 1;
            ender.stop();
         }
      };
      typer.on('header', headerListener);
      await dialogue_primitive(...neutralText.b);
      typer.off('header', headerListener);
      atlas.switch(null);
      x0 || (await Promise.all([ fd.alpha.modulate(renderer, 3000, 1), ender.gain.modulate(renderer, 3000, 0) ]));
      renderer.detach('menu', ovah);
      ender.stop();
      neutralText.m.audio.unload();
      twAssets17.unload();
      if (neutralText.d) {
         battler.SOUL.position.set(renderer.projection({ x: 160, y: 120 }, game.camera.position));
         await battler.defeat();
      } else {
         await renderer.pause(1500);
         document.querySelector('#splash')?.setAttribute('visible', '');
         await renderer.pause(1500);
         saver.time_but_real.stop();
         reload(true);
         await new Promise(() => {});
      }
   }
}

export const barrierGraphics = genBarrierGraphics();

export function archiveGroup (status: () => string[], opponent: OutertaleOpponent, y = 120) {
   return new OutertaleGroup({
      assets: new CosmosInventory(content.amAmalgam, content.ibuBubbleBlookyInverted),
      flee: false,
      music: music.amalgam,
      status,
      opponents: [ [ opponent, { x: 160, y } ] ]
   });
}

const groups = {
   alphys: new OutertaleGroup({
      flee: false,
      opponents: [ [ opponents.alphys, { x: 160, y: 120 } ] ],
      init () {
         const con = battler.volatile[0].container;
         battler.box.size.set(65);
         standardPos(true);
         let monologueValue = null as null | number;
         if (SAVE.flag.n.ga_asrielAlphysMonologue < 1) {
            monologueValue = 1;
            battler.status = () => text.b_opponent_alphys.status1a;
         } else {
            SAVE.flag.n.ga_asrielAlphysMonologue < 3 && (monologueValue = 3);
            battler.status = () => text.b_opponent_alphys.status1r();
         }
         battler.resume(async () => {
            let start = 0;
            let beats = 180;
            let pmapp = [ 1, 3, 5, 5, 3, 5, 1, 1, -3, -5, 5, 5, 3, 3 ].map(v =>
               SAVE.flag.b.$option_epilepsy ? v / 3 : v
            );
            const bsize = 20;
            const msize = 570;
            const ratio = 1.4;
            const cycle = 16;
            const graphics = new Graphics();
            const abf = new AdvancedBloomFilter({
               threshold: 0,
               brightness: 0.5,
               quality: 10,
               pixelSize: 0.5
            });
            const rsf = new RGBSplitFilter([ 0, 0 ], [ 0, 0 ], [ 0, 0 ]);
            const ddd = new CosmosObject({
               alpha: 0,
               metadata: { s: true, p: 0, x: 0, c: 0, o: 0 },
               filters: [ abf, rsf ]
            }).on('tick', function () {
               graphics.clear();

               const vtime = battler.music ? (start + battler.music.position) / ((60 / beats) * 32) : 0;
               const power = Math.floor(vtime);

               const presp = (vtime % 1) ** 10;
               const pcurr = pmapp[power];
               const pnext = pmapp[(power + 1) % pmapp.length];
               if (presp > 0.5 && pcurr !== pnext) {
                  const v = (presp * 2 - 1) * pcurr;
                  if (this.metadata.s && renderer.shake.value < v) {
                     renderer.shake.value = v;
                     renderer.shake.modulate(renderer, 300, 0);
                  }
               }

               const speed = CosmosMath.remap(presp, pcurr, pnext);
               this.metadata.p += speed / 20;
               while (this.metadata.p < 0) {
                  this.metadata.p++;
                  this.metadata.o--;
               }
               while (1 <= this.metadata.p) {
                  this.metadata.p--;
                  this.metadata.o++;
               }

               const spabs = Math.abs(speed) / 2;
               if (this.metadata.s) {
                  abf.brightness = CosmosMath.remap(spabs, 0.2, 0.5);
                  abf.bloomScale = CosmosMath.remap(spabs, 0.3, 1.3);

                  const spa2d = spabs / 2;
                  rsf.red = [ -spa2d, -spa2d ];
                  rsf.blue = [ spa2d, spa2d ];

                  let i = Math.floor(this.metadata.o / 2);
                  let size = msize * CosmosMath.remap(this.metadata.p, 1, 1 * ratio);

                  while (size > bsize) {
                     const hsize = size / -2;
                     graphics.lineStyle({
                        alpha: Math.min(((size + 50) / msize) ** 1.4, 1),
                        color: 0xffffff,
                        width: (i % cycle === 0 ? 10 : 4) * (size / msize)
                     });
                     graphics.drawRect(hsize, hsize, size, size);
                     size /= ratio;
                     i++;
                  }
               }

               this.spin.value = CosmosMath.remap(spabs / 2, 1, 1.5) * (SAVE.flag.b.$option_epilepsy ? 1 / 3 : 1);
            });
            ddd.container.addChild(graphics);
            const ba = atlas.navigators.of('battlerAdvanced');
            ba.objects[0].attach(ddd);
            ba.objects[3].area = new Rectangle(0, 200 * 2, 320 * 2, 40 * 2);
            ba.objects[3].filters = [ filters.outline ];
            events.on('battle-exit').then(() => {
               ba.objects[0].detach(ddd);
               ba.objects[3].area = null;
               ba.objects[3].filters = null;
            });
            await patterns.alphys(-1);
            if (SAVE.data.n.hp > 0) {
               const fd = fader({ fill: 0xffffff });
               await fd.alpha.modulate(renderer, 300, 1);
               ddd.alpha.value = 0.4;
               const head = new CosmosAnimation({
                  anchor: { x: 0, y: 1 },
                  position: { x: -1, y: 1 },
                  resources: content.ibcAlphysHead,
                  index: 19
               });
               con.objects[0] = new CosmosSprite({
                  anchor: { x: 0, y: 1 },
                  metadata: { time: renderer.time },
                  frames: [ content.ibcAlphysFeet ],
                  objects: [ new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcAlphysTorso ] }), head ]
               }).on('tick', function () {
                  const [ torso, head ] = this.objects;
                  const s = sineWaver(this.metadata.time, 4000, 0, 1);
                  torso.position.y = CosmosMath.remap(s, 0.5, -1);
                  torso.scale.y = CosmosMath.remap(s, 1 * 0.975, 1 / 0.975);
                  head.position.y = CosmosMath.remap(s, 2, -2);
               });
               SAVE.flag.n._genocide_milestone_last = 5;
               SAVE.flag.n.genocide_milestone = Math.max(SAVE.flag.n.genocide_milestone, 5) as 5;
               await fd.alpha.modulate(renderer, 300, 0);
               renderer.detach('menu', fd);
               await renderer.pause(1000);
               speech.emoters.alphys = head;
               await battler.monster(
                  true,
                  new CosmosPoint(27.5, -70).add(con),
                  battler.bubbles.twinkly,
                  ...text.b_opponent_alphys.gotcha
               );
               battler.SOUL.metadata.cyanLeap = false;
               game.movement = false;
               await resetBox(true);
               battler.music = music.galactomania.instance(renderer, 0, true);
               monologueValue !== null && (SAVE.flag.n.ga_asrielAlphysMonologue = monologueValue);
               header('z1').then(async () => {
                  ddd.alpha.modulate(renderer, 3000, 0);
                  const mus = battler.music;
                  await mus?.gain.modulate(renderer, 3000, 0);
                  mus?.stop();
               });
               header('z2').then(() => {
                  beats = 120;
                  pmapp = [ 0.5, 0.5, 1, 1, 3, 3, 3 ];
                  battler.music = music.galactomaniaQuiet.instance(renderer, 0, true);
                  battler.music.source!.loopStart = 80;
                  battler.music.source!.loopEnd = 96;
                  battler.music.gain.value = 0;
                  battler.music.gain.modulate(renderer, 1000, battler.music.daemon.gain);
                  ddd.alpha.modulate(renderer, 1000, 0.4);
               });
               header('z3').then(async () => {
                  ddd.alpha.modulate(renderer, 1000, 0);
                  const mus = battler.music;
                  await mus?.gain.modulate(renderer, 1000, 0);
                  mus?.stop();
               });
               header('z4').then(async () => {
                  start = 8;
                  beats = 180;
                  pmapp = [ 1, 6, 6, 6, 6, 6 ];
                  battler.music = music.galactomaniaFinal.instance(renderer, 0, true);
                  battler.music.source!.loopStart = 24;
                  battler.music.source!.loopEnd = 45 + 1 / 3;
                  ddd.alpha.modulate(renderer, 500, 0.4);
               });
            }
         });
         return false;
      }
   }),
   archive1: archiveGroup(() => text.b_opponent_archive1.status0, opponents.archive1),
   archive2: archiveGroup(() => text.b_opponent_archive2.status0, opponents.archive2, 135),
   archive3: archiveGroup(() => text.b_opponent_archive3.status0, opponents.archive3),
   archive4: archiveGroup(() => text.b_opponent_archive4.status0, opponents.archive4),
   archive5: archiveGroup(() => text.b_opponent_archive5.status0, opponents.archive5),
   asriel: new OutertaleGroup({
      flee: false,
      opponents: [ [ opponents.asriel, { x: 160, y: 120 } ] ],
      init () {
         let auto = false;
         if (SAVE.flag.n.pacifist_marker < 7) {
            battler.music = music.asrielboss.instance(renderer, 0, true);
            if (SAVE.flag.n.pacifist_marker < 6) {
               auto = true;
            }
         } else if (SAVE.flag.n.pacifist_marker < 7.8) {
            azMusicDespair();
         } else {
            azActivateSaveButton();
            if (SAVE.flag.n.pacifist_marker === 8) {
               if (SAVE.flag.n.pacifist_marker_bully !== 3) {
                  azMusicHyper();
                  auto = true;
               }
            } else if (SAVE.flag.n.pacifist_marker > 9) {
               azMusicEmotion();
               if (SAVE.flag.n.pacifist_marker === 10) {
                  azIsolateSaveButton();
                  battler.buttons[0].index = 1;
                  auto = true;
                  battler.fakehp = '00.0000000001';
               }
            }
         }
         azInitSetup();
         if (auto) {
            return true;
         } else {
            events.fire('choice', { type: 'spare' });
            battler.alpha.value = 1;
            atlas.switch('battlerAdvanced');
            atlas.attach(renderer, 'menu', 'battlerAdvanced');
            renderer.attach('menu', battler.SOUL);
            events.fire('resume');
            return false;
         }
      }
   }),
   final: new OutertaleGroup({
      flee: false,
      assets: new CosmosInventory(content.asDeeploop2),
      opponents: [ [ opponents.final, { x: 160, y: 120 } ] ],
      init () {
         const ba = atlas.navigators.of('battlerAdvanced');
         ba.objects[0].attach(barrierGraphics);
         ba.objects[3].filters = [ filters.outline ];
         events.on('battle-exit').then(() => {
            ba.objects[0].detach(barrierGraphics);
            ba.objects[3].filters = null;
         });
         if (SAVE.flag.n.pacifist_marker < 1) {
            battler.music = music.ASGORE.instance(renderer, 0.96);
            battler.status = () => text.b_opponent_final.status0;
            let w = 0;
            const bgfx = sounds.deeploop2.instance(renderer);
            bgfx.gain.value = 0;
            const warpticker = () => {
               w += barrierPower.value;
               bgfx.rate.value =
                  CosmosMath.remap(barrierPower.value, 1, 3) +
                  bgfx.daemon.rate * (CosmosMath.wave(w / 5) - 0.5) * CosmosMath.remap(barrierPower.value, 1, 1.5);
            };
            renderer.on('tick', warpticker);
            battler.volatile[0].container.metadata.bgfx = bgfx;
            battler.volatile[0].container.metadata.warpticker = warpticker;
         } else {
            events.fire('choice', { type: 'spare' });
         }
         return true;
      }
   }),
   finalasgore: new OutertaleGroup({
      assets: new CosmosInventory(content.ibuBossSOUL),
      init () {
         battler.SOUL.alpha.value = 0;
         battler.alpha.value = 1;
         events.on('battle').then(async () => {
            const volatile = battler.volatile[0];
            await battler.attack(volatile, { power: 0, operation: 'multiply' }, true, true);
            await renderer.pause(350);
            speech.emoters.asgore.index = 1;
            await dropShake(battler.volatile[0].container.position);
            await battler.alpha.modulate(renderer, 850, 0);
            await renderer.pause(350);
            const vars = volatile.vars;
            vars.facelock = false;
            await battler.monster(
               false,
               { x: 220, y: 10 },
               battler.bubbles.napstablook,
               ...text.b_opponent_finalasgore.death1
            );
            vars.facelock = true;
            SAVE.data.n.exp = 65535;
            await battler.vaporize(volatile.container.objects[0], { rate: 2 });
            const baze = new CosmosPoint({ x: 160, y: 83 });
            const bossSOUL = new CosmosSprite({
               alpha: 0,
               anchor: 0,
               position: baze,
               frames: [ content.ibuBossSOUL ],
               scale: 0.5
            }).on('tick', function () {
               this.position = baze.add(Math.random() * 4 - 2, Math.random() * 4 - 2);
            });
            renderer.attach('menu', bossSOUL);
            battler.SOUL.position.x = 160;
            battler.SOUL.position.y = 123;
            battler.SOUL.alpha.value = 1;
            const wf = fader({ fill: 0xffffff, priority: 18359135 }).on('pre-render', function () {
               this.alpha.value = CosmosMath.remap_clamped(battler.SOUL.position.y, 0, 1, 123, 96);
            });
            bossSOUL.alpha.modulate(renderer, 2500, 1);
            await renderer.pause(500);
            await battler.SOUL.position.step(renderer, 2 * 0.15, { y: 83 });
            await renderer.pause(500);
            SAVE.data.n.plot = 71.2;
            saver.save('c_exit');
            SAVE.flag.n.lv20 = 1;
            renderer.alpha.value = 0;
            battler.garbage.push([ 'menu', wf ], [ 'menu', bossSOUL ]);
            battler.instafade = true;
            events.fire('exit');
         });
         return false;
      },
      opponents: [ [ opponents.finalasgore, { x: 160, y: 122.5 } ] ]
   })
};

for (const [ key, value ] of Object.entries(groups)) {
   value.assets.name = `groups::${key}`;
}

export default groups;

CosmosUtils.status(`LOAD MODULE: CITADEL GROUPS (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
