import { HslAdjustmentFilter } from '@pixi/filter-hsl-adjustment';
import { AlphaFilter, BLEND_MODES, ColorMatrixFilter, Graphics, Texture } from 'pixi.js';
import text from '../../languages/default/text/citadel';
import {
   bhsp,
   boxCheck,
   brez,
   bulletSequence,
   bulletSetup,
   bwsp,
   fireAttack,
   papBlaster,
   papPattern,
   papWaver,
   pastBox,
   screenCheck,
   ShootableEvents,
   standardPos,
   standardSize,
   undKeyHandler,
   undSpear,
   undState
} from '../common/api';
import { content, context, filters, soundRouter, sounds } from '../systems/assets';
import { atlas, events, game, keys, renderer, rng, speech } from '../systems/core';
import {
   battler,
   box,
   calcLVX,
   dialogue_primitive,
   distanceGravity,
   fader,
   quickshadow,
   rand_rad,
   shake,
   sineWaver
} from '../systems/framework';
import { SAVE } from '../systems/save';
import {
   CosmosAnimation,
   CosmosDaemon,
   CosmosDirection,
   CosmosEventHost,
   CosmosHitbox,
   CosmosInstance,
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

export type HypVoid = {
   active: boolean;
   promise: Promise<void>;
   resolve: (value: void | PromiseLike<void>) => void;
};

export const dogtrigger = { value: null as (() => void) | null };

export const unitTime = 60 / 56.5 / 8;

export const waveMap = [
   { speed: 2, wavelength: 35 },
   { speed: 1.5, wavelength: 40 },
   { speed: 2, wavelength: 45 },
   { speed: 2.5, wavelength: 20 },
   { speed: 2.5, wavelength: 25 },
   { speed: 2, wavelength: 30 },
   { speed: 1.5, wavelength: 20 },
   { speed: 2, wavelength: 45 }
];

export const percussionMap = CosmosUtils.populate(4, bar => [
   1,
   0,
   0,
   0,
   2,
   0,
   0,
   0,
   1 + 2,
   0,
   0,
   0,
   [ 0, 2, 0, 2 ][bar],
   [ 0, 2, 0, 2 ][bar],
   2,
   0,
   0,
   0,
   [ 1, 1, 1, 1 + 2 ][bar],
   0,
   1 + 2,
   0,
   [ 0, 0, 2, 1 ][bar],
   [ 0, 0, 2, 0 ][bar],
   1 + 2,
   0,
   [ 0, 2, 0, 2 ][bar],
   0,
   [ 0, 1, 0, 1 ][bar] + 2,
   [ 0, 0, 0, 2 ][bar],
   2,
   0
]);

export const gpx = (c: number, x: number) => box.x + CosmosMath.spread_quantize(box.sx / 2, x, c);
export const gpy = (r: number, y: number) => box.y + CosmosMath.spread_quantize(box.sy / 2, y, r);

export const baseDM = 7;
export const bl = {
   // point 1, point 2, move time, delay time, charge time, fade time
   async lightning (p1: CosmosPointSimple, p2: CosmosPointSimple, s = true, mT = 400, dT = 0, cT = 133, fT = 400) {
      const pp = new CosmosPoint(p1);
      const mp = pp.add(p2).divide(2);
      const ag = pp.angleTo(p2);
      const ex = pp.extentOf(p2);
      const ct = Math.ceil(ex / 14);
      const em1 = new CosmosAnimation({
         alpha: mT > 0 ? 0 : 1,
         anchor: 0,
         scale: 1 / 2,
         resources: content.ibbLightningEmitter,
         rotation: ag,
         position: mT > 0 ? mp.endpoint(ag, -100) : p1
      });
      const em2 = new CosmosAnimation({
         alpha: mT > 0 ? 0 : 1,
         anchor: 0,
         scale: 1 / 2,
         resources: content.ibbLightningEmitter,
         rotation: ag + 180,
         position: mT > 0 ? mp.endpoint(ag + 180, -100) : p2
      });
      const lightninflash = new CosmosHitbox({
         anchor: { y: 0 },
         rotation: ag,
         size: { y: 8, x: ex },
         position: p1,
         metadata: { bullet: false, damage: baseDM }
      });
      renderer.attach('menu', lightninflash, em1, em2);
      mT > 0 &&
         (await Promise.all([
            em1.position.modulate(renderer, mT, p1, p1),
            em2.position.modulate(renderer, mT, p2, p2),
            em1.alpha.modulate(renderer, mT, 1, 1),
            em2.alpha.modulate(renderer, mT, 1, 1)
         ]));
      dT > 0 && (await renderer.pause(dT));
      em1.index = 1;
      em2.index = 1;
      cT > 0 && (await renderer.pause(cT / 2));
      em1.index = 2;
      em2.index = 2;
      cT > 0 && (await renderer.pause(cT / 2));
      lightninflash.objects = CosmosUtils.populate(
         ct,
         i =>
            new CosmosAnimation({
               active: true,
               resources: content.ibbBuzzlightning,
               subcrop: { right: i < ct - 1 ? 0 : 14 - (ex % 14) },
               position: { x: i * 14 },
               scale: { y: 1.5 },
               anchor: { y: 0 }
            })
      );
      s && sounds.lightningstrike.instance(renderer);
      lightninflash.metadata.bullet = true;
      await renderer.pause(fT / 2);
      lightninflash.metadata.bullet = false;
      fT > 0 && (await lightninflash.alpha.modulate(renderer, fT / 4, 1, 0));
      renderer.detach('menu', lightninflash);
      fT > 0 && (await Promise.all([ em1.alpha.modulate(renderer, fT / 4, 0), em2.alpha.modulate(renderer, fT / 2, 0) ]));
      renderer.detach('menu', em1, em2);
   },
   /** she's -G O T- a -G U N- */
   async gun (
      position: CosmosPointSimple,
      rotation: number,
      scale: CosmosPointSimple,
      duration: number,
      s = true,
      fade = 433
   ) {
      const snd = s ? sounds.electropulsar.instance(renderer) : null;
      if (snd) {
         snd.source!.loopStart = (3 / 56) * 23;
         snd.source!.loopEnd = (3 / 112) * 71;
         snd.source!.loop = true;
      }
      const gun = new CosmosObject({ position, rotation, scale });
      const spr = new CosmosSprite({
         priority: -1,
         frames: [ content.ibbHarknessbac ],
         anchor: 0
      }).on('tick', function () {
         this.offsets[0].set(anim.offsets[0]);
      });
      const sY = new CosmosValue();
      const anim = new CosmosAnimation({
         anchor: 0,
         resources: content.ibbHarknessgun,
         active: true,
         index: 1,
         metadata: { elapsed: false },
         priority: 1
      }).on('tick', function () {
         this.offsets[0].set(sY.value * (Math.random() - 0.5), sY.value * (Math.random() - 0.5));
         if (!this.metadata.elapsed && this.index === 4) {
            this.metadata.elapsed = true;
            this.disable();
            gun.attach(spr);
         }
      });
      gun.attach(anim);
      renderer.attach('menu', gun);
      await renderer.pause(fade);
      const sT = renderer.time;
      gun.attach(
         new CosmosRectangle({
            fill: 0xffffff,
            stroke: 0,
            size: { x: 400, y: 7 },
            border: 1,
            anchor: { y: 0 },
            objects: [
               new CosmosHitbox({
                  metadata: { bullet: true, damage: baseDM },
                  size: { x: 400, y: 7 },
                  anchor: { y: 0 }
               })
            ]
         }).on('tick', function () {
            const sB = sineWaver(sT, 400, 0, 1);
            this.size.y = (this.objects[0] as CosmosHitbox).size.y = (5 + sB * 2) * sY.value;
            this.border = Math.round(sY.value * 2) / 2;
            sY.value < 1 || shake(1, 250);
         })
      );
      sY.modulate(renderer, 100, 1);
      await renderer.pause(duration);
      if (snd) {
         snd.stop();
         sounds.noise.instance(renderer);
      }
      await sY.modulate(renderer, 100, 0);
      gun.detach(spr);
      anim.reverse = true;
      anim.step = 0;
      anim.index = 3;
      anim.enable();
      await new Promise<void>(resolve => anim.on('tick', () => anim.index === 0 && resolve()));
      renderer.detach('menu', gun);
   }
};

export const pt = {
   async lightning (x: boolean, poses: number | number[], mT?: number, dT?: number, cT?: number, fT?: number) {
      await Promise.all(
         (poses instanceof Array ? poses : [ poses ]).map((pos, index) =>
            bl.lightning(
               { x: x ? pos : box.x1 - 5, y: x ? box.y1 - 5 : pos },
               { x: x ? pos : box.x2 + 5, y: x ? box.y2 + 5 : pos },
               index === 0,
               mT,
               dT,
               cT,
               fT
            )
         )
      );
   },
   async lightningAngle (
      angles: number | number[],
      center = battler.box.position.value(),
      extent = (box.sx / 2) * Math.SQRT2 + 10,
      mT?: number,
      dT?: number,
      cT?: number,
      fT?: number
   ) {
      await Promise.all(
         (angles instanceof Array ? angles : [ angles ]).map((ang, i) => {
            const bds = new CosmosPoint(CosmosMath.ray(ang, extent));
            return bl.lightning(bds.add(center), bds.subtract(center).multiply(-1), i === 0, mT, dT, cT, fT);
         })
      );
   },
   /** position, warn time 1, warn time 2, expansion radius, expansion time, expansion pause, expulsion speed */
   async ring (bwsp: number, bhsp: number, wt1 = 300, wt2 = 300, er = 15, et = 300, ep = 100, sp = 5) {
      const mid = new CosmosPoint(box.x1 + bwsp * box.sx, box.y1 + bhsp * box.sy);
      if (wt1 > 0) {
         const rects = CosmosUtils.populate(4, i => {
            const a = [ 0, 90, 180, 270 ][i];
            return new CosmosRectangle({
               alpha: 0.2,
               anchor: { y: 0 },
               position: mid.endpoint(a, 240),
               rotation: a,
               size: { x: 30, y: 2 },
               fill: 0xffffff,
               border: 1
            });
         });
         renderer.attach('menu', ...rects);
         sounds.node.instance(renderer).gain.value *= 0.4;
         sounds.frypan.instance(renderer, 0.07).rate.value = 1.3;
         await Promise.all(rects.map(rect => rect.position.modulate(renderer, wt1, mid)));
         renderer.detach('menu', ...rects);
         sounds.bomb.instance(renderer);
         shake();
      }
      if (wt2 > 0) {
         const star = new CosmosSprite({
            alpha: 0.5,
            scale: 0,
            frames: [ content.ibbCirclestar ],
            anchor: 0,
            spin: 10,
            position: mid
         });
         battler.bullets.attach(star);
         await star.scale.modulate(renderer, wt2, 1.5, 1.5, 0);
         battler.bullets.detach(star);
      }
      if (et > 0 || ep > 0 || sp !== 0) {
         const size = new CosmosValue(2);
         const radius = new CosmosValue(et > 0 ? -2 : er);
         const balls = new Graphics();
         const obj = new CosmosObject({ metadata: { expand: false }, position: mid }).on('tick', function () {
            if (this.metadata.expand) {
               radius.value += sp;
            }
            if (size.value > -radius.value) {
               balls
                  .clear()
                  .beginFill(0xffffff, 1)
                  .drawCircle(0, 0, radius.value + size.value)
                  .endFill();
               if (radius.value > 0) {
                  balls.beginHole().drawCircle(0, 0, radius.value).endHole();
               }
            }
            const ext = this.position.extentOf(battler.SOUL);
            if (battler.invulnerable === 0 && !battler.SOUL.metadata.cyanLeap && ext < radius.value + size.value + 4) {
               if (ext < radius.value - 4) {
                  return;
               }
               battler.damage(battler.bonus_var(baseDM));
            }
         });
         obj.container.addChild(balls);
         battler.bullets.attach(obj);
         sounds.appear.instance(renderer);
         et > 0 && (await radius.modulate(renderer, et, er, er));
         ep > 0 && (await renderer.pause(ep));
         if (sp !== 0) {
            obj.metadata.expand = true;
            await renderer.when(() => radius.value > box.sx * Math.SQRT2 || radius.value < 0);
         }
         battler.bullets.detach(obj);
      }
   },
   /** facing, charge time, travel speed, fade time */
   async fadeline (
      f: 0 | 1 | 2 | 3 | (0 | 1 | 2 | 3)[],
      ct = 1200,
      { spd = 1, sp = 5, ft = 300, pr = 0, dm = baseDM } = {},
      hyp?: HypVoid
   ) {
      if (hyp?.active === false) {
         return;
      }
      await Promise.all(
         (f instanceof Array ? f : [ f ]).map(async (fv, i) => {
            const size = [ box.sy, box.sx ][fv % 2];
            const distance = sp * (ct / CosmosMath.FRAME);
            const edge = new CosmosPoint([ box.x2, box.x, box.x1, box.x ][fv], [ box.y, box.y2, box.y, box.y1 ][fv]);
            const rotation = fv * 90;
            const { bullet, detach, detached } = bulletSetup(
               new CosmosHitbox({
                  alpha: 0,
                  anchor: 0,
                  size: { x: 2, y: size },
                  rotation,
                  position: edge.endpoint(rotation, distance),
                  velocity: CosmosMath.ray(rotation, -sp / spd),
                  metadata: { bullet: true, damage: dm, pass: false, doggerDetach: void 0 as (() => void) | void },
                  priority: pr,
                  objects: [
                     new CosmosSprite({
                        frames: [ content.ibbLinecarrier ],
                        anchor: 0,
                        position: { y: size / 2 },
                        scale: { y: -1 }
                     }),
                     new CosmosSprite({
                        frames: [ content.ibbLinecarrier ],
                        anchor: 0,
                        position: { y: size / -2 }
                     }),
                     new CosmosRectangle({
                        fill: 0xffffff,
                        anchor: 0,
                        size: { x: 2, y: size }
                     })
                  ]
               }).on('tick', function () {
                  if (this.metadata.pass && screenCheck(this, 1)) {
                     detach();
                  } else {
                     const s1 = quickshadow(this.objects[0] as CosmosSprite, this);
                     s1.position.set(s1.position.add(this.objects[0]).shift(rotation, 0, this));
                     s1.rotation.set(rotation);
                     const s2 = quickshadow(this.objects[1] as CosmosSprite, this);
                     s2.position.set(s2.position.add(this.objects[1]).shift(rotation, 0, this));
                     s2.rotation.set(rotation);
                  }
               }),
               true,
               null
            );
            bullet.alpha.modulate(renderer, ft, 1);
            i === 0 && sounds.appear.instance(renderer);
            const preview = new CosmosSprite({
               alpha: 0,
               frames: [ content.ibbFadeline ],
               anchor: { x: 0, y: 1 },
               rotation: rotation - 90,
               scale: { x: size / 2, y: 5 / 100 },
               position: edge
            }).on('tick', function () {
               const a = Math.min(Math.max(1 - edge.extentOf(bullet) / (distance / 2), 0), 1) * 0.5;
               if (this.alpha.value > a) {
                  battler.bullets.detach(this);
                  bullet.metadata.pass = true;
               } else {
                  this.alpha.value = a;
               }
            });
            battler.bullets.attach(preview);
            bullet.metadata.doggerDetach = () => {
               battler.bullets.detach(preview);
               detach();
            };
            return Promise.race([
               detached,
               hyp?.promise.then(() => {
                  battler.bullets.detach(preview);
                  detach();
               })
            ]);
         })
      );
   },
   /** side, Y position, duration */
   async gunH (s: 0 | 1, y: number, d: number, x = true) {
      await bl.gun({ x: [ box.x1 - 55, box.x2 + 55 ][s], y }, 0, { x: [ 1, -1 ][s], y: 1 }, d, x);
   },
   async gunC (s: 0 | 1, d: number, x = true) {
      const a = battler.box.position.angleFrom(box.x1, box.y1);
      const ray = CosmosMath.ray(a, 1);
      const dx = 55;
      await bl.gun(
         { x: [ box.x1 - dx, box.x2 + dx ][s], y: box.y1 - dx * Math.abs(ray.y / ray.x) },
         [ a, -a ][s],
         { x: [ 1, -1 ][s], y: 1 },
         d,
         x
      );
   },
   async gunV (p: number, d: number, x = true) {
      const s = p <= 160 ? 1 : 0;
      await bl.gun({ x: p, y: box.y1 - 55 }, [ 90, -90 ][s], { x: [ 1, -1 ][s], y: 1 }, d, x);
   },
   /** position, step time, rotation origin, base radius, diamond count, radius multiplier, border size */
   async diamond (
      bwsp: number,
      bhsp: number,
      { spd = 1, dm = baseDM, st = 100, ro = -90, br = 5, ct = 6, xr = 5, bs = 2, rv = false } = {},
      hyp?: HypVoid
   ) {
      if (hyp?.active === false) {
         return;
      }
      let i = rv ? 0 : ct;
      const pro = [] as Promise<void>[];
      const mid = new CosmosPoint(box.x1 + bwsp * box.sx, box.y1 + bhsp * box.sy);
      while (rv ? i++ < ct : i-- > 0) {
         const iz = rv ? i - 1 : i;
         const rad = (br + iz * xr) * Math.SQRT2;
         const doggie = CosmosUtils.hyperpromise();
         const rect = new CosmosRectangle({
            alpha: 0.4,
            anchor: 0,
            stroke: 0xffffff,
            border: bs,
            rotation: 45 - (rv ? -ro : ro) * (iz / (ct - 1)),
            position: mid,
            size: rad * 2
         });
         let dt = false;
         const bullets = CosmosUtils.populate(
            4,
            a =>
               new CosmosHitbox({
                  anchor: 0,
                  position: CosmosMath.ray(a * 90, rad),
                  rotation: a * 90,
                  size: { x: bs, y: rad * 2 },
                  metadata: {
                     bullet: false,
                     damage: dm,
                     doggerDetach: () => doggie.resolve(),
                     doggerTrigger: async () => {
                        dt = true;
                        for (const b of bullets) {
                           b.metadata.bullet = false;
                        }
                        await Promise.all([
                           rect.alpha.modulate(renderer, 500, 0),
                           rect.scale.modulate(renderer, 500, 2)
                        ]);
                     }
                  }
               })
         );
         rect.attach(...bullets);
         battler.bullets.attach(rect);
         pro.push(
            Promise.race([ ...(hyp ? [ hyp.promise ] : []), renderer.pause(st / spd) ]).then(async () => {
               if (hyp?.active === false) {
                  return;
               }
               rect.alpha.value = 1;
               for (const b of bullets) {
                  b.metadata.bullet = true;
               }
               await Promise.race([ ...(hyp ? [ hyp.promise ] : []), doggie.promise, renderer.pause(st / spd) ]);
               if (dt || (hyp?.active as boolean) === false || doggie.active === false) {
                  return;
               }
               battler.bullets.detach(rect);
            })
         );
         await Promise.race([ ...(hyp ? [ hyp.promise ] : []), renderer.pause(st / spd) ]);
         if ((hyp?.active as boolean) === false) {
            battler.bullets.detach(rect);
            doggie.resolve();
            return;
         }
      }
      await Promise.all(pro);
   },
   /** rows, columns, fade time, hold duration, border size */
   async grid (r: number, c: number, hd: number, bs = 2) {
      const grid = [
         ...CosmosUtils.populate(
            c - 1,
            x =>
               new CosmosHitbox({
                  anchor: 0,
                  size: { x: bs, y: box.sy },
                  metadata: { bullet: true, damage: baseDM },
                  position: { x: box.x + CosmosMath.spread(box.sx / 2, x + 1, c + 1), y: box.y },
                  objects: [
                     new CosmosRectangle({
                        fill: 0xffffff,
                        anchor: 0,
                        size: { x: bs, y: box.sy }
                     })
                  ]
               })
         ),
         ...CosmosUtils.populate(
            r - 1,
            y =>
               new CosmosHitbox({
                  anchor: 0,
                  size: { x: box.sx, y: bs },
                  metadata: { bullet: true, damage: baseDM },
                  position: { x: box.x, y: box.y + CosmosMath.spread(box.sy / 2, y + 1, r + 1) },
                  objects: [
                     new CosmosRectangle({
                        fill: 0xffffff,
                        anchor: 0,
                        size: { x: box.sx, y: bs }
                     })
                  ]
               })
         )
      ];
      battler.bullets.attach(...grid);
      await renderer.pause(hd);
      battler.bullets.detach(...grid);
   },
   /** position, warn time, fill speed, fill speed ramp, expansion radius, expansion time, expansion pause, expulsion speed */
   async ringflash (
      bwsp: number,
      bhsp: number,
      wt = 1500,
      { spd = 1, dm = baseDM, pr = 0, fs = 16, fsr = 2, er = 12, et = 100, ep = 100, sp = 5 } = {},
      hyp?: HypVoid
   ) {
      if (hyp?.active === false) {
         return;
      }
      const mid = new CosmosPoint(box.x1 + bwsp * box.sx, box.y1 + bhsp * box.sy);
      if (wt > 0) {
         const e = new CosmosValue(60);
         const rot = new CosmosValue(-45);
         const blobs = CosmosUtils.populate(8, i => {
            const a = i * 45;
            return new CosmosSprite({ alpha: 0, anchor: 0, frames: [ content.ibbArccircle ], priority: pr }).on(
               'tick',
               function () {
                  this.position.set(mid.endpoint(a + rot.value, e.value));
               }
            );
         });
         sounds.appear.instance(renderer);
         renderer.attach('menu', ...blobs);
         await Promise.race([
            ...(hyp ? [ hyp.promise ] : []),
            Promise.all([
               e.modulate(renderer, wt / spd, 0),
               rot.modulate(renderer, wt / spd, 45),
               ...blobs.map(blob => blob.alpha.modulate(renderer, wt / spd, 0.7))
            ])
         ]);
         renderer.detach('menu', ...blobs);
         if ((hyp?.active as boolean) === false) {
            return;
         }
         sounds.bomb.instance(renderer);
         shake();
      }
      if ((hyp?.active as boolean) === false) {
         return;
      }
      const size = new CosmosValue();
      const radius = new CosmosValue();
      const balls = new Graphics();
      let fsValue = fs;
      const doggie = CosmosUtils.hyperpromise();
      const obj = new CosmosObject({
         metadata: { expand: false, whimper: false },
         position: mid
      }).on('tick', async function () {
         if (this.metadata.whimper) {
            return;
         }
         if (size.value < box.sx * Math.SQRT2) {
            size.value += fsValue;
            fsValue += fsr;
         }
         if (this.metadata.expand) {
            radius.value += sp;
         }
         if (size.value > -radius.value) {
            balls
               .clear()
               .beginFill(0xffffff, 1)
               .drawCircle(0, 0, radius.value + size.value)
               .endFill();
            if (radius.value > 0) {
               balls.beginHole().drawCircle(0, 0, radius.value).endHole();
            }
         }
         const ext = this.position.extentOf(battler.SOUL);
         if (battler.invulnerable === 0 && !battler.SOUL.metadata.cyanLeap && ext < radius.value + size.value + 4) {
            if (ext < radius.value - 4) {
               return;
            }
            if (dogtrigger.value) {
               this.metadata.whimper = true;
               dogtrigger.value();
               await Promise.all([ this.alpha.modulate(renderer, 500, 0), this.scale.modulate(renderer, 500, 2) ]);
               doggie.resolve();
            } else {
               battler.damage(battler.bonus_var(dm));
            }
         }
      });
      obj.container.addChild(balls);
      battler.bullets.attach(obj);
      et > 0 &&
         (await Promise.race([ ...(hyp ? [ hyp.promise ] : []), doggie.promise, radius.modulate(renderer, et, er, er) ]));
      if ((hyp?.active as boolean) === false || doggie.active === false) {
         battler.bullets.detach(obj);
         doggie.resolve();
         return;
      }
      ep > 0 && (await Promise.race([ ...(hyp ? [ hyp.promise ] : []), doggie.promise, renderer.pause(ep) ]));
      if ((hyp?.active as boolean) === false || (doggie.active as boolean) === false) {
         battler.bullets.detach(obj);
         doggie.resolve();
         return;
      }
      if (sp !== 0) {
         obj.metadata.expand = true;
         await Promise.race([
            ...(hyp ? [ hyp.promise ] : []),
            doggie.promise,
            renderer.when(() => radius.value > box.sx * Math.SQRT2 || radius.value < 0)
         ]);
      }
      battler.bullets.detach(obj);
      doggie.resolve();
   },
   /** sequence, sequence delay, spin time, spin angle */
   async smartphone (seq: (0 | 1 | 2 | 3)[]) {
      let sh = 0;
      const phone = new CosmosAnimation({
         alpha: 0,
         anchor: 0,
         resources: content.ibbMobile,
         rotation: 400 > 0 ? -360 : 0,
         scale: 0,
         position: { x: box.x, y: box.y1 - 25 }
      }).on('tick', function () {
         this.offsets[0].set(sh * (Math.random() * 2 - 1), sh * (Math.random() * 2 - 1));
      });
      renderer.attach('menu', phone);
      if (400 > 0) {
         sounds.appear.instance(renderer);
         await Promise.all([
            phone.rotation.modulate(renderer, 400, 0, 0),
            phone.scale.modulate(renderer, 400, 1),
            phone.alpha.modulate(renderer, 400, 1)
         ]);
      }
      const w = new CosmosRectangle({
         alpha: 0,
         size: battler.box.size.add(45),
         position: box,
         anchor: 0,
         border: 2,
         stroke: 0xffffff
      });
      renderer.attach('menu', w);
      let si = 0;
      const lk = 0;
      while (si < seq.length) {
         phone.index = seq[si++] + 1;
         sounds.noise.instance(renderer);
         if (si === seq.length) {
            sh = 1;
            phone.tint = 0xff6969;
            await Promise.all([
               w.alpha.modulate(renderer, 1000, 0.8, 0.8, 0.8),
               w.size.modulate(renderer, 1000, battler.box.size.add(5))
            ]);
         } else {
            await renderer.pause(1000);
         }
      }
      sh = 0;
      Promise.all([
         phone.rotation.modulate(renderer, 400, 0, 360),
         phone.scale.modulate(renderer, 400, 2),
         phone.alpha.modulate(renderer, 400, 0)
      ]).then(() => {
         renderer.detach('menu', phone);
      });
      const wr = CosmosUtils.populate(
         4,
         i =>
            new CosmosRectangle({
               fill: 0xffffff,
               size: { x: box.sx / 2, y: box.sy / 2 },
               position: { x: box.x1 + (box.sx / 2) * (i % 2), y: box.y1 + (box.sy / 2) * Math.floor(i / 2) },
               objects: [
                  new CosmosHitbox({
                     size: { x: box.sx / 2, y: box.sy / 2 },
                     metadata: { bullet: true, damage: baseDM }
                  })
               ]
            })
      );
      battler.bullets.attach(...wr);
      let pi = 0;
      while (pi < seq.length) {
         const wrx = new CosmosRectangle({
            position: box,
            anchor: 0,
            alpha: 1,
            size: w.size,
            stroke: 0xffffff,
            border: 2
         }).on('tick', function () {
            this.tint = this.size.x > lk ? void 0 : 0xff6969;
         });
         renderer.attach('menu', wrx);
         Promise.all([
            wrx.alpha.modulate(renderer, 500, 0),
            wrx.size.modulate(renderer, 500, battler.box.size.add(25), battler.box.size.add(25))
         ]).then(() => {
            renderer.detach('menu', wrx);
         });
         const wi = seq[pi++];
         const cr = wr[wi];
         cr.alpha.value = 0;
         cr.objects[0].metadata.bullet = false;
         sounds.noise.instance(renderer);
         w.alpha.value = 0;
         w.size.set(battler.box.size.add(45));
         renderer.pause(700).then(() =>
            renderer.attach(
               'menu',
               new CosmosRectangle({
                  area: renderer.area,
                  anchor: 0,
                  position: {
                     x: box.x + CosmosMath.spread_quantize(box.sx / 2, wi % 2, 2),
                     y: box.y + CosmosMath.spread_quantize(box.sy / 2, Math.floor(wi / 2), 2)
                  },
                  size: { x: box.sx / 2 - 2, y: box.sy / 2 - 2 },
                  stroke: 0xffffff,
                  tint: 0xff0000,
                  metadata: { ticks: 0, pb: 0 },
                  border: 2,
                  objects: [
                     new CosmosText({
                        anchor: 0,
                        position: { x: 1 },
                        stroke: -1,
                        fill: 0xff0000,
                        fontFamily: content.fCryptOfTomorrow,
                        fontSize: 8,
                        content: '!'
                     })
                  ],
                  filters: [ battler.clipFilter! ]
               }).on('tick', function () {
                  if (this.metadata.ticks++ === 1) {
                     this.metadata.ticks = 0;
                     const red = this.tint === 0xff0000;
                     this.tint = red ? 0xffff00 : 0xff0000;
                     this.objects[0].fill = red ? 0xffff00 : 0xff0000;
                     if (red) {
                        sounds.prebomb.instance(renderer).rate.value = 1.2;
                     } else if (++this.metadata.pb === 2) {
                        renderer.detach('menu', this);
                     }
                  }
               })
            )
         );
         if (pi < seq.length) {
            await Promise.all([
               w.alpha.modulate(renderer, 1000, 0.8, 0.8, 0.8),
               w.size.modulate(renderer, 1000, battler.box.size.add(5))
            ]);
            for (const rect of wr) {
               rect.alpha.value = 1;
               rect.objects[0].metadata.bullet = true;
            }
         }
      }
      await renderer.pause(1000);
      sounds.noise.instance(renderer);
      renderer.detach('menu', w);
      battler.bullets.detach(...wr);
   }
};

export function glitcher (b: CosmosObject, o = 0) {
   const ogArea = b.area;
   const ogFilters = b.filters?.slice() ?? null;
   const ogTint = b.tint;
   b.area = renderer.area!;
   const spr = battler.volatile[0].container.objects[0];
   const t = () => {
      (b.filters ??= []).splice(o, b.filters.length - o, ...(battler.overlay.filters?.slice() ?? []));
      b.tint = spr.tint;
   };
   b.on('tick', t);
   return () => {
      b.off('tick', t);
      b.area = ogArea;
      b.filters = ogFilters;
      b.tint = ogTint;
   };
}

export const undDirsSpecial = [ 'up', 'down' ] as CosmosDirection[];

export const undCageSpecial = new CosmosSprite({
   alpha: 0,
   scale: 0.5,
   anchor: 0,
   frames: [ content.ibcUndyneCageHoriz ],
   priority: 0.2,
   objects: [
      new CosmosAnimation({
         anchor: 0,
         resources: content.ibcUndyneShield
      }).on('tick', function () {
         if (undState.belltimer === 0) {
            this.index = 0;
         } else {
            this.index = 1;
            undState.belltimer--;
         }
      })
   ]
}).on('tick', function () {
   this.position.set(battler.SOUL);
});

export const undTickerSpecial = () => {
   undState.time++;
};

export async function undSequenceSpecial (
   generator: (
      spawn: typeof undSpear,
      pause: (time: number) => void | Promise<void>,
      promises: Promise<boolean | void>[]
   ) => Promise<void>,
   vars: any,
   atarget: CosmosObject,
   after: (e: (insta?: boolean) => Promise<void>) => Promise<void>,
   spd: number
) {
   undState.time = 0;
   undState.belltimer = 0;
   battler.box.priority.value = 0.2;
   battler.shadow.priority.value = 0.3;
   renderer.on('tick', undTickerSpecial);
   vars.shield = 'up';
   undCageSpecial.objects[0].rotation.value = 270;
   atarget.alpha.modulate(renderer, 300, 0.8);
   await battler.box.size.modulate(renderer, 300, { x: 100, y: 65 });
   renderer.attach('menu', undCageSpecial);
   undCageSpecial.area = renderer.area;
   undCageSpecial.filters = [ battler.clipFilter! ];
   undCageSpecial.alpha.modulate(renderer, 150, 1);
   await Promise.all([
      battler.box.size.modulate(renderer, 150, { y: 36 }),
      battler.box.position.modulate(renderer, 150, { y: 120 })
   ]);
   battler.SOUL.position.set(battler.box.position);
   battler.SOUL.alpha.value = 1;
   const handler = undKeyHandler(undCageSpecial, vars);
   for (const dir of undDirsSpecial) {
      keys[`${dir}Key`].on('down', handler);
   }
   const promises = [] as Promise<boolean | void>[];
   await generator(
      (color, direction, speed, damage = 4, special = {}) => {
         if (vars.b) {
            const subpromise = undSpear(color, direction, speed * spd, damage, special);
            promises.push(subpromise);
            return subpromise;
         } else {
            return new Promise<boolean>(resolve => resolve(true));
         }
      },
      time => (vars.b ? renderer.pause(time / spd) : void 0),
      promises
   );
   await Promise.all(promises);
   for (const dir of undDirsSpecial) {
      keys[`${dir}Key`].off('down', handler);
   }
   undCageSpecial.alpha.modulate(renderer, 150, 0).then(() => {
      renderer.detach('menu', undCageSpecial);
      undCageSpecial.area = null;
      undCageSpecial.filters = null;
   });
   await after(async (insta = false) => {
      battler.SOUL.alpha.value = 0;
      if (insta) {
         battler.box.position.y = 160;
         battler.box.size.set({ x: 282.5, y: 65 });
         renderer.detach('menu', atarget);
      } else {
         await Promise.all([
            battler.box.size.modulate(renderer, 150, { y: 65 }),
            battler.box.position.modulate(renderer, 150, { y: 160 })
         ]);
         atarget.alpha.modulate(renderer, 300, 0).then(() => {
            renderer.detach('menu', atarget);
         });
         await battler.box.size.modulate(renderer, 300, { x: 282.5, y: 65 });
      }
      renderer.off('tick', undTickerSpecial);
      battler.volatile[0].container.tint = void 0;
      battler.box.priority.value = 0;
      battler.shadow.priority.value = 1000.1;
   });
}

export function trident () {
   const { bullet, detach } = bulletSetup(
      new CosmosHitbox({
         anchor: 0,
         size: { x: 228, y: 5 },
         velocity: { y: 8 },
         position: { x: box.x1 + 35 + rng.attack.next() * (box.sx - 70), y: -125 },
         metadata: { bullet: true, damage: 4, doggerDetach: void 0 as (() => void) | void },
         rotation: 90,
         priority: 2,
         objects: [
            new CosmosSprite({ anchor: 0, frames: [ content.ibbStardent ] }),
            new CosmosHitbox({
               size: { x: 20, y: 9 },
               position: { x: -92 },
               anchor: { x: 1, y: 0 },
               metadata: { bullet: true, damage: 4 }
            }),
            new CosmosHitbox({
               size: { x: 17, y: 11 },
               position: { x: 50 },
               anchor: { y: 0 },
               metadata: { bullet: true, damage: 4 }
            }),
            new CosmosHitbox({
               size: { x: 27, y: 9 },
               position: { x: 74 },
               anchor: { y: 0 },
               metadata: { bullet: true, damage: 4 }
            }),
            new CosmosHitbox({
               size: { x: 16, y: 13 },
               position: { x: 77 },
               anchor: { y: 0 },
               metadata: { bullet: true, damage: 4 }
            }),
            new CosmosHitbox({
               size: { x: 11, y: 17 },
               position: { x: 79 },
               anchor: { y: 0 },
               metadata: { bullet: true, damage: 4 }
            }),
            new CosmosHitbox({
               size: { x: 7, y: 23 },
               position: { x: 81 },
               anchor: { y: 0 },
               metadata: { bullet: true, damage: 4 }
            }),
            new CosmosHitbox({
               size: { x: 3, y: 49 },
               position: { x: 83 },
               anchor: { y: 0 },
               metadata: { bullet: true, damage: 4 }
            })
         ]
      }).on('tick', function () {
         if (screenCheck(this, 130)) {
            detach();
         } else {
            const sh = quickshadow(this.objects[0] as CosmosSprite, this);
            sh.priority.value = 1;
            sh.rotation.value += this.rotation.value;
         }
      }),
      true,
      null
   );
   bullet.metadata.doggerDetach = detach;
   const snd = sounds.sword.instance(renderer);
   snd.gain.value *= 1.6;
   snd.rate.value = 0.7;
   renderer.pause(400).then(() => snd.gain.modulate(renderer, 400, 0));
   return detach;
}

export function easyLightning (hyp: HypVoid, dir: 0 | 1, spd: number) {
   if (!hyp.active) {
      return new Promise<void>(resolve => resolve());
   }
   let st = 0;
   const { bullet, detach, detached } = bulletSetup(
      new CosmosHitbox({
         anchor: 0,
         metadata: { bullet: true, damage: 4, doggerDetach: void 0 as (() => void) | void },
         size: 10,
         velocity: { x: [ 1, -1 ][dir] * spd },
         position: pastBox(10, [ 3, 1 ][dir], 0.5).position,
         objects: [ new CosmosAnimation({ anchor: 0, resources: content.ibbLightning }) ]
      }).on('tick', function () {
         switch (st) {
            case 0:
               if (Math.abs(box.x - this.position.x) < box.sx / 2 - 10) {
                  const c = sounds.stab.instance(renderer);
                  c.rate.value = 1.3;
                  c.gain.value *= 0.6;
                  this.velocity.x = [ 6, -6 ][dir] * spd;
                  st = 1;
               }
               break;
            case 1:
               quickshadow(this.objects[0] as CosmosSprite, this);
               screenCheck(this, 10) && detach();
               break;
         }
      })
   );
   hyp.promise.then(() => detach());
   bullet.metadata.doggerDetach = detach;
   return detached;
}

const patterns = {
   async alphys (t: number): Promise<void> {
      battler.stat.invulnerability.modifiers.push([ 'add', -Math.ceil(calcLVX() / 2), 1 ]);
      let boxMoved = false;
      const p = [] as Promise<void>[];
      await renderer.on('tick');
      switch (t) {
         // intro
         case -1: {
            await renderer.pause(100);
            p.push(pt.lightning(true, 160));
            await renderer.pause(500);
            p.push(pt.lightning(true, [ 145, 175 ]));
            await renderer.pause(500);
            p.push(pt.lightning(true, [ 130, 160, 190 ]));
            await renderer.pause(500);
            let y = 130;
            while (y < 190) {
               p.push(pt.lightning(false, y));
               await renderer.pause(133);
               y += 10;
            }
            p.push(pt.lightning(false, 190));
            await renderer.pause(500);
            while (y > 130) {
               p.push(pt.lightning(false, y));
               await renderer.pause(133);
               y -= 10;
            }
            p.push(pt.lightning(false, 130));
            await renderer.pause(500);
            p.push(pt.lightning(true, 160));
            await renderer.pause(266);
            p.push(pt.lightning(true, [ 145, 175 ]));
            await renderer.pause(266);
            p.push(pt.lightning(true, [ 130, 190 ]));
            await renderer.pause(266);
            p.push(pt.lightning(true, [ 145, 175 ]));
            await renderer.pause(266);
            p.push(pt.lightning(true, 160));
            break;
         }
         // phase 1
         case 0:
            await brez(100, 65);
            p.push(pt.lightning(true, [ 115, 205 ]));
            await renderer.pause(133);
            p.push(pt.lightning(true, [ 125, 195 ]));
            await renderer.pause(133);
            p.push(pt.lightning(true, [ 135, 185 ]));
            await renderer.pause(133);
            p.push(pt.lightning(true, [ 145, 175 ]));
            await renderer.pause(133);
            p.push(pt.lightning(true, [ 155, 165 ]));
            await renderer.pause(600);
            p.push(pt.lightning(true, [ 155, 165 ]));
            await renderer.pause(133);
            p.push(pt.lightning(true, [ 145, 175 ]));
            await renderer.pause(133);
            p.push(pt.lightning(true, [ 135, 185 ]));
            await renderer.pause(133);
            p.push(pt.lightning(true, [ 125, 195 ]));
            await renderer.pause(133);
            p.push(pt.lightning(true, [ 115, 205 ]));
            await renderer.pause(600);
            p.push(pt.ring(0.1, 0.5));
            await renderer.pause(600);
            p.push(pt.ring(0.5, 0.5));
            await renderer.pause(600);
            p.push(pt.ring(0.9, 0.5));
            await renderer.pause(600);
            p.push(pt.ring(0.5, 0.5));
            await renderer.pause(400);
            p.push(pt.fadeline(2));
            await renderer.pause(600);
            p.push(pt.fadeline(0));
            await renderer.pause(1200);
            p.push(pt.lightning(true, [ 155, 165 ]));
            await renderer.pause(133);
            p.push(pt.lightning(true, [ 145, 175 ]));
            await renderer.pause(133);
            p.push(pt.lightning(true, [ 135, 185 ]));
            await renderer.pause(133);
            p.push(pt.lightning(true, [ 125, 195 ]));
            await renderer.pause(133);
            p.push(pt.lightning(true, [ 115, 205 ]));
            await renderer.pause(600);
            p.push(pt.lightning(true, [ 115, 205 ]));
            await renderer.pause(133);
            p.push(pt.lightning(true, [ 125, 195 ]));
            await renderer.pause(133);
            p.push(pt.lightning(true, [ 135, 185 ]));
            await renderer.pause(133);
            p.push(pt.lightning(true, [ 145, 175 ]));
            await renderer.pause(133);
            p.push(pt.lightning(true, [ 155, 165 ]));
            await renderer.pause(600);
            p.push(pt.ring(0.5, 0.5));
            await renderer.pause(600);
            p.push(pt.ring(0.9, 0.5));
            await renderer.pause(600);
            p.push(pt.ring(0.5, 0.5));
            await renderer.pause(600);
            p.push(pt.ring(0.1, 0.5));
            await renderer.pause(1200);
            battler.box.size.modulate(renderer, 150, { x: 65 });
            p.push(pt.lightning(true, [ 145, 175 ]));
            await renderer.pause(500);
            p.push(pt.lightning(true, [ 130, 160, 190 ]));
            await renderer.pause(500);
            p.push(pt.lightning(true, [ 145, 175 ]));
            break;
         case 1:
            await brez(100, 65);
            p.push(pt.ring(0.1, 0.1));
            await renderer.pause(800);
            p.push(pt.ring(0.1, 0.9));
            await renderer.pause(200);
            p.push(pt.fadeline(0));
            await renderer.pause(1000);
            p.push(pt.ring(0.9, 0.1));
            await renderer.pause(800);
            p.push(pt.ring(0.9, 0.9));
            await renderer.pause(200);
            p.push(pt.fadeline(2));
            await renderer.pause(600);
            p.push(pt.fadeline(0));
            await renderer.pause(600);
            p.push(pt.fadeline(2));
            await renderer.pause(1500);
            battler.box.size.modulate(renderer, 150, { x: 65 });
            p.push(pt.lightning(true, [ 130, 160, 190 ]));
            await renderer.pause(500);
            p.push(pt.lightning(true, [ 145, 175 ]));
            await renderer.pause(500);
            p.push(pt.lightning(true, [ 130, 160, 190 ]));
            await renderer.pause(500);
            p.push(pt.lightning(true, [ 145, 175 ]));
            await battler.box.size.modulate(renderer, 150, { x: 100 });
            await renderer.pause(500);
            p.push(pt.ring(0.1, 0.3));
            await renderer.pause(700);
            p.push(pt.ring(0.3, 0.7));
            await renderer.pause(600);
            p.push(pt.ring(0.5, 0.3));
            await renderer.pause(500);
            p.push(pt.ring(0.7, 0.7));
            await renderer.pause(400);
            p.push(pt.ring(0.9, 0.3));
            break;
         case 2:
            await brez(100, 65);
            p.push(pt.ring(0.9, 0.9));
            await renderer.pause(400);
            p.push(pt.fadeline([ 2, 3 ]));
            await renderer.pause(1200);
            p.push(pt.ring(0.9, 0.1));
            await renderer.pause(400);
            p.push(pt.fadeline([ 1, 2 ]));
            await renderer.pause(1200);
            p.push(pt.ring(0.1, 0.1));
            await renderer.pause(400);
            p.push(pt.fadeline([ 0, 1 ]));
            await renderer.pause(1200);
            p.push(pt.ring(0.1, 0.9));
            await renderer.pause(400);
            p.push(pt.fadeline([ 3, 0 ]));
            await renderer.pause(800);
            p.push(pt.fadeline([ 1, 2 ]));
            await renderer.pause(800);
            p.push(pt.fadeline([ 3, 0 ]));
            await renderer.pause(800);
            p.push(pt.fadeline([ 1, 2 ]));
            await renderer.pause(800);
            p.push(pt.fadeline([ 3, 0 ]));
            await renderer.pause(1200);
            p.push(pt.ring(0.1, 0.1));
            await renderer.pause(700);
            p.push(pt.ring(0.1, 0.9));
            await renderer.pause(1100);
            p.push(pt.lightning(true, [ 115, 125 ]));
            await renderer.pause(500);
            p.push(pt.ring(0.9, 0.9));
            await renderer.pause(700);
            p.push(pt.ring(0.9, 0.1));
            await renderer.pause(1100);
            p.push(pt.lightning(true, [ 195, 205 ]));
            break;
         case 3:
            await brez(100, 65);
            p.push(pt.gunV(box.x - 20, 2500), pt.gunV(box.x + 20, 2500, false));
            await renderer.pause(800);
            p.push(pt.ring(0.1, 0.1));
            await renderer.pause(600);
            p.push(pt.ring(0.9, 0.1));
            await renderer.pause(600);
            p.push(pt.ring(0.1, 0.1));
            await renderer.pause(400);
            p.push(pt.fadeline(1));
            await renderer.pause(1200);
            p.push(pt.lightning(false, [ 135, 145, 175, 185 ]));
            await renderer.pause(500);
            p.push(pt.lightning(false, [ 145, 155, 165, 175 ]));
            await renderer.pause(500);
            p.push(pt.lightning(false, [ 135, 145, 175, 185 ]));
            await renderer.pause(1200);
            p.push(pt.gunV(box.x - 20, 2500), pt.gunV(box.x + 20, 2500, false));
            await renderer.pause(800);
            p.push(pt.ring(0.9, 0.9));
            await renderer.pause(600);
            p.push(pt.ring(0.1, 0.9));
            await renderer.pause(600);
            p.push(pt.ring(0.9, 0.9));
            await renderer.pause(400);
            p.push(pt.fadeline(3));
            await renderer.pause(1200);
            p.push(pt.lightning(false, [ 135, 145, 175, 185 ]));
            await renderer.pause(500);
            p.push(pt.lightning(false, [ 145, 155, 165, 175 ]));
            await renderer.pause(500);
            p.push(pt.lightning(false, [ 135, 145, 175, 185 ]));
            break;
         case 4:
            await brez(100, 65);
            p.push(pt.gunH(0, box.y - 15, 4000), pt.gunH(1, box.y + 15, 4000, false));
            await renderer.pause(1000);
            p.push(pt.ring(0.1, 0.1));
            await renderer.pause(800);
            p.push(pt.ring(0.9, 0.5));
            await renderer.pause(800);
            p.push(pt.ring(0.5, 0.9));
            await renderer.pause(200);
            p.push(pt.fadeline(3));
            await renderer.pause(600);
            p.push(pt.fadeline(1));
            await renderer.pause(1500);
            p.push(pt.lightning(true, [ 145, 175 ]));
            await renderer.pause(500);
            p.push(pt.lightning(true, [ 130, 160, 190 ]));
            await renderer.pause(500);
            p.push(pt.lightning(true, [ 145, 175 ]));
            await renderer.pause(500);
            p.push(pt.gunC(0, 6000), pt.gunC(1, 6000, false));
            await renderer.pause(500);
            p.push(pt.ring(0.5, 0.1));
            await renderer.pause(200);
            p.push(pt.fadeline(1));
            await renderer.pause(1200);
            p.push(pt.ring(0.9, 0.5));
            await renderer.pause(200);
            p.push(pt.fadeline(2));
            await renderer.pause(1200);
            p.push(pt.ring(0.5, 0.9));
            await renderer.pause(200);
            p.push(pt.fadeline(3));
            await renderer.pause(1200);
            p.push(pt.ring(0.1, 0.5));
            await renderer.pause(200);
            p.push(pt.fadeline(0));
            break;
         case 5:
            await brez(100, 65);
            p.push(pt.fadeline(0, 600));
            await renderer.pause(800);
            p.push(pt.ring(0.1, 0.5));
            await renderer.pause(1000);
            p.push(pt.diamond(0.1, 0.5));
            await renderer.pause(200);
            p.push(pt.ring(0.9, 0.5));
            await renderer.pause(1000);
            p.push(pt.diamond(0.9, 0.5));
            await renderer.pause(400);
            p.push(pt.fadeline(2, 600));
            await renderer.pause(800);
            p.push(pt.ring(0.9, 0.5));
            await renderer.pause(1000);
            p.push(pt.diamond(0.9, 0.5));
            await renderer.pause(200);
            p.push(pt.ring(0.1, 0.5));
            await renderer.pause(1000);
            p.push(pt.diamond(0.1, 0.5));
            await renderer.pause(400);
            p.push(pt.fadeline(0, 600));
            await renderer.pause(1200);
            p.push(pt.gunV(box.x - 45, 500));
            await renderer.pause(300);
            p.push(pt.gunV(box.x - 15, 500));
            await renderer.pause(300);
            p.push(pt.gunV(box.x + 15, 500));
            await renderer.pause(300);
            p.push(pt.gunV(box.x + 45, 500));
            await renderer.pause(300);
            p.push(pt.ring(0.5, 0.5));
            await renderer.pause(1000);
            await pt.diamond(0.5, 0.5, { ct: 12, xr: 2.5 });
            break;
         case 6:
            await brez(100, 65);
            p.push(pt.ring(0.1, 0.1));
            await renderer.pause(1000);
            p.push(pt.diamond(0.1, 0.1));
            await renderer.pause(200);
            p.push(pt.ring(0.1 + 0.8 / 3, 0.9));
            await renderer.pause(1000);
            p.push(pt.diamond(0.1 + 0.8 / 3, 0.9));
            await renderer.pause(200);
            p.push(pt.ring(0.9 - 0.8 / 3, 0.1));
            await renderer.pause(1000);
            p.push(pt.diamond(0.9 - 0.8 / 3, 0.1));
            await renderer.pause(200);
            p.push(pt.ring(0.9, 0.9));
            await renderer.pause(1000);
            p.push(pt.diamond(0.9, 0.9));
            await renderer.pause(800);
            p.push(pt.fadeline([ 2, 3 ], 600));
            await renderer.pause(600);
            p.push(pt.fadeline([ 0, 1 ], 600));
            await renderer.pause(600);
            p.push(pt.fadeline([ 2, 3 ], 600));
            await renderer.pause(600);
            p.push(pt.fadeline([ 0, 1 ], 600));
            await renderer.pause(1200);
            p.push(
               pt.gunV(box.x - box.sx / 6, 6000),
               pt.gunV(box.x + box.sx / 6, 6000, false),
               pt.gunH(0, box.y, 6000, false)
            );
            await renderer.pause(600);
            p.push(pt.fadeline(3, 600));
            await renderer.pause(600);
            p.push(pt.fadeline(2, 600));
            await renderer.pause(600);
            p.push(pt.fadeline(1, 600));
            await renderer.pause(600);
            p.push(pt.fadeline(0, 600));
            await renderer.pause(600);
            p.push(pt.fadeline(3, 600));
            await renderer.pause(600);
            p.push(pt.fadeline(2, 600));
            await renderer.pause(600);
            p.push(pt.fadeline(1, 600));
            await renderer.pause(600);
            p.push(pt.fadeline(0, 600));
            await renderer.pause(600);
            p.push(pt.fadeline(3, 600));
            break;
         case 7:
            boxMoved = true;
            await battler.box.size.modulate(renderer, 300, { x: 120 });
            await Promise.all([
               battler.box.size.modulate(renderer, 150, { y: 120 }),
               battler.box.position.modulate(renderer, 150, { y: 120 })
            ]);
            standardPos(true);
            p.push(pt.grid(5, 5, 17500));
            for (const [ x, y, t ] of [
               [ 2, 0, 800 ],
               [ 2, 4, 800 ],
               [ 0, 2, 800 ],
               [ 2, 2, 800 ],
               [ 4, 2, 1200 ]
            ] as [number, number, number][]) {
               p.push(pt.ring(bwsp(gpx(5, x)), bhsp(gpy(5, y))));
               await renderer.pause(t);
            }
            p.push(pt.gunH(0, gpy(5, 0), 500), pt.gunH(1, gpy(5, 2), 500, false), pt.gunH(0, gpy(5, 4), 500, false));
            await renderer.pause(500);
            p.push(pt.fadeline(2, 600));
            await renderer.pause(1600);
            p.push(pt.gunH(0, gpy(5, 1), 500), pt.gunH(1, gpy(5, 3), 500, false));
            await renderer.pause(500);
            p.push(pt.fadeline(0, 600));
            await renderer.pause(1000);
            for (const [ x, y, t ] of [
               [ 0, 4, 600 ],
               [ 1, 3, 600 ],
               [ 2, 2, 600 ],
               [ 3, 1, 600 ],
               [ 4, 0, 1200 ]
            ] as [number, number, number][]) {
               p.push(pt.ring(bwsp(gpx(5, x)), bhsp(gpy(5, y))));
               await renderer.pause(t);
            }
            p.push(pt.diamond(bwsp(gpx(5, 4)), bhsp(gpy(5, 0))));
            await renderer.pause(1000);
            for (const [ x, y, t ] of [
               [ 4, 4, 600 ],
               [ 3, 3, 600 ],
               [ 2, 2, 600 ],
               [ 1, 1, 600 ],
               [ 0, 0, 1200 ]
            ] as [number, number, number][]) {
               p.push(pt.ring(bwsp(gpx(5, x)), bhsp(gpy(5, y))));
               await renderer.pause(t);
            }
            p.push(pt.diamond(bwsp(gpx(5, 0)), bhsp(gpy(5, 0))));
            break;
         case 8:
            boxMoved = true;
            await battler.box.size.modulate(renderer, 300, { x: 120 });
            await Promise.all([
               battler.box.size.modulate(renderer, 150, { y: 120 }),
               battler.box.position.modulate(renderer, 150, { y: 120 })
            ]);
            standardPos(true);
            p.push(pt.grid(5, 5, 8500).then(() => void sounds.noise.instance(renderer)));
            for (const [ x, y, t1, t2 ] of [
               [ 0, 0, 1000, 500 ],
               [ 4, 1, 1000, 500 ],
               [ 0, 2, 1000, 500 ],
               [ 4, 3, 1000, 500 ],
               [ 0, 4, 1000, 500 ]
            ] as [number, number, number, number][]) {
               p.push(pt.ring(bwsp(gpx(5, x)), bhsp(gpy(5, y))));
               await renderer.pause(t1);
               p.push(pt.diamond(bwsp(gpx(5, x)), bhsp(gpy(5, y))));
               await renderer.pause(t2);
            }
            p.push(pt.ring(0.5, 0.5));
            await renderer.pause(1000);
            await battler.box.size.modulate(renderer, 150, 100);
            p.push(pt.grid(5, 5, 7500));
            for (const [ x, y, t ] of [
               [ 0, 0, 600 ],
               [ 2, 0, 600 ],
               [ 4, 0, 600 ],
               [ 4, 2, 600 ],
               [ 4, 4, 600 ],
               [ 2, 4, 600 ],
               [ 0, 4, 600 ],
               [ 0, 2, 600 ],
               [ 2, 2, 1200 ]
            ] as [number, number, number][]) {
               p.push(pt.ring(bwsp(gpx(5, x)), bhsp(gpy(5, y))));
               await renderer.pause(t);
            }
            p.push(pt.diamond(bwsp(gpx(5, 2)), bhsp(gpy(5, 2))));
            break;
         case 9: {
            boxMoved = true;
            await brez(100, 65);
            p.push(pt.lightning(true, 160));
            await renderer.pause(500);
            p.push(pt.lightning(true, [ 145, 175 ]));
            await renderer.pause(500);
            p.push(pt.lightning(true, [ 130, 160, 190 ]));
            await renderer.pause(500);
            p.push(pt.lightning(true, [ 115, 145, 175, 205 ]));
            await renderer.pause(800);
            await battler.box.size.modulate(renderer, 150, { x: 65 });
            let y = 130;
            while (y < 190) {
               p.push(pt.lightning(false, y));
               await renderer.pause(133);
               y += 10;
            }
            while (y > 130) {
               p.push(pt.lightning(false, y));
               await renderer.pause(133);
               y -= 10;
            }
            while (y < 190) {
               p.push(pt.lightning(false, y));
               await renderer.pause(133);
               y += 10;
            }
            p.push(pt.lightning(false, 190));
            await renderer.pause(800);
            await battler.box.size.modulate(renderer, 150, { x: 100 });
            p.push(pt.ring(0.1, 0.1));
            await renderer.pause(500);
            p.push(pt.ring(0.5, 0.5));
            await renderer.pause(500);
            p.push(pt.ring(0.9, 0.9));
            await renderer.pause(1000);
            p.push(pt.diamond(0.9, 0.9));
            await renderer.pause(200);
            p.push(pt.fadeline([ 2, 3 ], 600));
            await renderer.pause(600);
            p.push(pt.ring(0.9, 0.9));
            await renderer.pause(500);
            p.push(pt.ring(0.5, 0.5));
            await renderer.pause(500);
            p.push(pt.ring(0.1, 0.1));
            await renderer.pause(1000);
            p.push(pt.diamond(0.1, 0.1));
            await renderer.pause(200);
            p.push(pt.fadeline([ 0, 1 ], 600));
            await renderer.pause(1200);
            await Promise.all([
               battler.box.size.modulate(renderer, 150, { y: 100 }),
               battler.box.position.modulate(renderer, 150, { y: 120 })
            ]);
            p.push(
               pt.gunH(0, box.y - 15, 8000),
               pt.gunH(1, box.y + 15, 8000, false),
               pt.gunV(box.x - 15, 8000, false),
               pt.gunV(box.x + 15, 8000, false)
            );
            await renderer.pause(500);
            p.push(pt.fadeline(3, 600));
            await renderer.pause(800);
            p.push(pt.fadeline(2, 600));
            await renderer.pause(800);
            p.push(pt.fadeline(1, 600));
            await renderer.pause(800);
            p.push(pt.fadeline(0, 600));
            await renderer.pause(800);
            p.push(pt.fadeline(3, 600));
            await renderer.pause(800);
            p.push(pt.fadeline(2, 600));
            await renderer.pause(800);
            p.push(pt.fadeline(1, 600));
            await renderer.pause(800);
            p.push(pt.fadeline(0, 600));
            await renderer.pause(1600);
            p.push(pt.ring(0.5, 0.5));
            await renderer.pause(1000);
            p.push(pt.diamond(0.5, 0.5));
            await renderer.pause(1200);
            await battler.box.size.modulate(renderer, 150, 120);
            p.push(pt.grid(5, 5, 9200), pt.gunC(0, 8766), pt.gunC(1, 8766, false));
            await renderer.pause(500);
            for (const [ s, t1, t2 ] of [
               [ 1, 1200, 800 ],
               [ 2, 1200, 800 ],
               [ 3, 1200, 800 ],
               [ 0, 1200, 800 ]
            ] as [0 | 1 | 2 | 3, number, number][]) {
               p.push(pt.ring(bwsp(gpx(5, [ 0, 2, 4, 2 ][s])), bhsp(gpy(5, [ 2, 0, 2, 4 ][s]))));
               await renderer.pause(t1);
               p.push(pt.diamond(bwsp(gpx(5, [ 0, 2, 4, 2 ][s])), bhsp(gpy(5, [ 2, 0, 2, 4 ][s])), { st: 133 }));
               await renderer.pause(t2);
            }
            await renderer.pause(700);
            await battler.box.size.modulate(renderer, 150, 100);
            await renderer.pause(500);
            p.push(pt.gunH(0, box.y, 500));
            await renderer.pause(300);
            p.push(pt.gunC(0, 500));
            await renderer.pause(300);
            p.push(pt.gunV(box.x, 500));
            await renderer.pause(300);
            p.push(pt.gunC(1, 500));
            await renderer.pause(300);
            p.push(pt.gunH(0, box.y, 500));
            await renderer.pause(300);
            p.push(pt.gunC(0, 500));
            await renderer.pause(300);
            p.push(pt.gunV(box.x, 500));
            await renderer.pause(300);
            p.push(pt.gunC(1, 500));
            await renderer.pause(300);
            p.push(pt.gunH(1, box.y, 1500));
            break;
         }
         // halftime
         case 10:
            await brez(100, 65);
            await renderer.pause(10000);
            break;
         // phase 2a
         case 11:
            await brez(65, 65);
            p.push(pt.smartphone([ 0, 1, 2, 3, 0, 1, 2, 3 ]));
            break;
         case 12:
            await brez(65, 65);
            p.push(pt.smartphone([ 3, 2, 0, 1, 3, 2, 0, 1, 3 ]));
            await renderer.pause(500);
            p.push(pt.fadeline(0, void 0, { sp: 3 }));
            await renderer.pause(2200);
            p.push(pt.fadeline(2, void 0, { sp: 3 }));
            await renderer.pause(2200);
            p.push(pt.fadeline(0, void 0, { sp: 3 }));
            await renderer.pause(2200);
            p.push(pt.fadeline(2, void 0, { sp: 3 }));
            break;
         case 13:
            await brez(65, 65);
            p.push(pt.smartphone([ 0, 1, 2, 3, 0, 1, 2, 3, 0, 1 ]));
            await renderer.pause(500);
            p.push(pt.ring(0.1, 0.5, 400, 400, void 0, void 0, 200));
            await renderer.pause(2100);
            p.push(pt.ring(0.5, 0.5, 400, 400, void 0, void 0, 200));
            await renderer.pause(2100);
            p.push(pt.ring(0.9, 0.5, 400, 400, void 0, void 0, 200));
            await renderer.pause(2100);
            p.push(pt.ringflash(0.5, 0.5));
            break;
         case 14:
            await brez(65, 65);
            p.push(pt.smartphone([ 3, 2, 0, 1, 3, 2, 0, 1, 3, 2, 0 ]));
            await renderer.pause(500);
            p.push(pt.ringflash(0.1, 0.1));
            await renderer.pause(2000);
            p.push(pt.ringflash(0.9, 0.1));
            await renderer.pause(2000);
            p.push(pt.ringflash(0.9, 0.9));
            await renderer.pause(2000);
            p.push(pt.ringflash(0.1, 0.9));
            await renderer.pause(2000);
            p.push(pt.ringflash(0.1, 0.1));
            break;
         // phase 2b
         case 15:
            battler.stat.monsteratk.modifiers.push([ 'add', -1, Infinity ]);
            boxMoved = true;
            await brez(100, 65);
            p.push(pt.lightning(true, [ 115, 125, 135, 185, 195, 205 ]));
            await renderer.pause(500);
            p.push(pt.lightning(true, [ 145, 155, 165, 175 ]));
            await renderer.pause(500);
            p.push(pt.lightning(true, [ 115, 125, 135, 185, 195, 205 ]));
            await renderer.pause(500);
            p.push(pt.lightning(true, [ 145, 155, 165, 175 ]));
            await renderer.pause(500);
            p.push(pt.lightning(true, [ 115, 125, 135, 185, 195, 205 ]));
            await renderer.pause(500);
            await battler.box.size.modulate(renderer, 150, { x: 100 });
            p.push(pt.gunC(0, 3500), pt.gunC(1, 3500, false));
            await renderer.pause(500);
            p.push(pt.fadeline(0, 600));
            await renderer.pause(500);
            p.push(pt.fadeline(2, 600));
            await renderer.pause(500);
            p.push(pt.fadeline(0, 600));
            await renderer.pause(500);
            p.push(pt.fadeline(2, 600));
            await renderer.pause(500);
            p.push(pt.fadeline(0, 600));
            await renderer.pause(1500);
            await Promise.all([
               battler.box.size.modulate(renderer, 150, { y: 100 }),
               battler.box.position.modulate(renderer, 150, { y: 120 })
            ]);
            p.push(pt.ringflash(0.5, 0.5));
            await renderer.pause(1800);
            await battler.box.size.modulate(renderer, 150, 120);
            p.push(
               pt.grid(5, 5, 9000),
               pt.gunH(0, gpy(5, 1), 8566),
               pt.gunH(1, gpy(5, 3), 8566, false),
               pt.gunV(gpx(5, 1), 8566, false),
               pt.gunV(gpx(5, 3), 8566, false)
            );
            await renderer.pause(300);
            await pt.diamond(0.5, 0.5, { ct: 12, xr: 2.5, st: 66 });
            p.push(pt.diamond(0.5, 0.5, { ct: 12, xr: 2.5, st: 66, rv: true }));
            await renderer.pause(900);
            p.push(pt.ring(bwsp(gpx(5, 4)), bhsp(gpy(5, 2))));
            await renderer.pause(700);
            p.push(pt.ring(bwsp(gpx(5, 2)), bhsp(gpy(5, 4))));
            await renderer.pause(700);
            p.push(pt.ring(bwsp(gpx(5, 0)), bhsp(gpy(5, 2))));
            await renderer.pause(700);
            p.push(pt.ring(bwsp(gpx(5, 2)), bhsp(gpy(5, 0))));
            await renderer.pause(700);
            p.push(pt.ringflash(bwsp(gpx(5, 4)), bhsp(gpy(5, 2))));
            await renderer.pause(1400);
            p.push(pt.ringflash(bwsp(gpx(5, 0)), bhsp(gpy(5, 2))));
            break;
         case 16:
            await brez(100, 65);
            p.push(pt.fadeline(1, 600));
            await renderer.pause(600);
            p.push(pt.fadeline(3, 600));
            await renderer.pause(1000);
            p.push(pt.fadeline(1, 600));
            await renderer.pause(600);
            p.push(pt.fadeline(3, 600));
            await renderer.pause(1000);
            p.push(pt.fadeline(1, 600));
            await renderer.pause(600);
            p.push(pt.fadeline(3, 600));
            await renderer.pause(1000);
            p.push(pt.ringflash(0.1, 0.5));
            await renderer.pause(1200);
            p.push(pt.ringflash(0.9, 0.5));
            await renderer.pause(1800);
            await pt.diamond(0.5, 0.5, { ct: 12, xr: 2.5, st: 66, rv: true });
            pt.diamond(0.5, 0.5, { ct: 12, xr: 2.5, st: 66 });
            await renderer.pause(1000);
            battler.box.size.modulate(renderer, 150, { x: 65 });
            p.push(pt.lightning(true, 160));
            await renderer.pause(266);
            p.push(pt.lightning(true, [ 145, 175 ]));
            await renderer.pause(266);
            p.push(pt.lightning(true, [ 130, 190 ]));
            await renderer.pause(266);
            p.push(pt.lightning(true, [ 145, 175 ]));
            await renderer.pause(266);
            p.push(pt.lightning(true, 160));
            await renderer.pause(266);
            p.push(pt.lightning(true, [ 145, 175 ]));
            await renderer.pause(266);
            p.push(pt.lightning(true, [ 130, 190 ]));
            await renderer.pause(266);
            p.push(pt.lightning(true, [ 145, 175 ]));
            await renderer.pause(500);
            p.push(pt.gunH(1, box.y, 500));
            await renderer.pause(300);
            p.push(pt.gunC(1, 500));
            await renderer.pause(300);
            p.push(pt.gunV(box.x, 500));
            await renderer.pause(300);
            p.push(pt.gunC(0, 500));
            await renderer.pause(300);
            p.push(pt.gunH(1, box.y, 500));
            await renderer.pause(300);
            p.push(pt.gunC(1, 500));
            await renderer.pause(300);
            p.push(pt.gunV(box.x, 500));
            await renderer.pause(300);
            p.push(pt.gunC(0, 500));
            await renderer.pause(300);
            p.push(pt.gunH(0, box.y, 1500));
            break;
         case 17:
            await brez(100, 65);
            p.push(pt.lightning(true, [ 115, 145, 175, 205 ]));
            await renderer.pause(500);
            p.push(pt.lightning(true, [ 130, 160, 190 ]));
            await renderer.pause(500);
            p.push(pt.lightning(true, [ 115, 145, 175, 205 ]));
            await renderer.pause(500);
            p.push(pt.lightning(true, [ 130, 160, 190 ]));
            await renderer.pause(500);
            p.push(pt.ring(0.1, 0.1));
            await renderer.pause(500);
            p.push(pt.ring(0.5, 0.1));
            await renderer.pause(500);
            p.push(pt.ring(0.9, 0.1));
            await renderer.pause(500);
            p.push(pt.ring(0.5, 0.5));
            await renderer.pause(500);
            p.push(pt.ring(0.1, 0.9));
            await renderer.pause(500);
            p.push(pt.ring(0.5, 0.9));
            await renderer.pause(300);
            p.push(pt.ringflash(0.9, 0.9));
            await renderer.pause(2000);
            p.push(pt.diamond(0.9, 0.9));
            await renderer.pause(300);
            p.push(pt.fadeline(1, 600));
            await renderer.pause(600);
            p.push(pt.gunH(0, box.y - 20, 800));
            await renderer.pause(300);
            p.push(pt.fadeline(3, 600));
            await renderer.pause(300);
            p.push(pt.gunH(1, box.y, 800));
            await renderer.pause(300);
            p.push(pt.fadeline(1, 600));
            await renderer.pause(300);
            p.push(pt.gunH(0, box.y + 20, 800));
            await renderer.pause(1400);
            await pt.diamond(0.5, 0.5, { ct: 12, xr: 2.5, rv: true });
            p.push(pt.diamond(0.5, 0.5, { ct: 12, xr: 2.5 }));
            await renderer.pause(200);
            p.push(pt.fadeline(2, 600));
            await renderer.pause(600);
            p.push(pt.fadeline(0, 600));
            await renderer.pause(600);
            p.push(pt.fadeline(2, 600));
            await renderer.pause(800);
            await battler.box.size.modulate(renderer, 150, { x: 65 });
            p.push(pt.lightning(true, [ 145, 175 ]));
            await renderer.pause(500);
            p.push(pt.lightning(true, [ 130, 160, 190 ]));
            await renderer.pause(500);
            p.push(pt.lightning(true, [ 145, 175 ]));
            await renderer.pause(500);
            p.push(pt.lightning(true, [ 130, 160, 190 ]));
            await renderer.pause(500);
            p.push(pt.lightningAngle([ 45, 135 ]));
            await renderer.pause(500);
            p.push(pt.lightningAngle([ 0, 90 ]));
            await renderer.pause(500);
            p.push(pt.lightningAngle([ 45, 135 ]));
            await renderer.pause(500);
            p.push(pt.lightningAngle([ 0, 90 ]));
            await renderer.pause(500);
            p.push(pt.lightningAngle([ 45, 135 ]));
            break;
         case 18: {
            await brez(100, 65);
            p.push(pt.ring(0.9, 0.5));
            await renderer.pause(800);
            p.push(pt.ringflash(0.1, 0.5));
            await renderer.pause(200);
            p.push(pt.lightning(true, [ 185, 195, 205 ]));
            await renderer.pause(1500);
            p.push(pt.diamond(0.1, 0.5));
            await renderer.pause(1000);
            p.push(pt.ring(0.1, 0.5));
            await renderer.pause(800);
            p.push(pt.ringflash(0.9, 0.5));
            await renderer.pause(200);
            p.push(pt.lightning(true, [ 115, 125, 135 ]));
            await renderer.pause(1500);
            p.push(pt.diamond(0.9, 0.5));
            await renderer.pause(500);
            await battler.box.size.modulate(renderer, 150, { x: 65 });
            p.push(pt.fadeline(0, 600));
            await renderer.pause(800);
            p.push(pt.ring(0.1, 0.5));
            await renderer.pause(800);
            p.push(pt.gunC(0, 3000), pt.gunC(1, 3000, false));
            await renderer.pause(500);
            p.push(pt.lightning(true, [ 130, 140, 180, 190 ]));
            await renderer.pause(800);
            p.push(pt.lightning(true, [ 145, 155, 165, 175 ]));
            await renderer.pause(800);
            p.push(pt.lightning(true, [ 130, 140, 180, 190 ]));
            await renderer.pause(800);
            p.push(pt.lightning(true, [ 145, 155, 165, 175 ]));
            await renderer.pause(500);
            p.push(pt.ring(0.5, 0.1));
            await renderer.pause(500);
            p.push(pt.ring(0.3, 0.3));
            await renderer.pause(500);
            p.push(pt.ring(0.7, 0.5));
            await renderer.pause(500);
            p.push(pt.ring(0.1, 0.7));
            await renderer.pause(500);
            p.push(pt.ring(0.9, 0.9));
            await renderer.pause(1000);
            p.push(pt.diamond(0.9, 0.9));
            await renderer.pause(200);
            p.push(pt.fadeline([ 2, 3 ], 600));
            await renderer.pause(1000);
            p.push(pt.fadeline([ 2, 3 ], 600));
            await renderer.pause(1000);
            p.push(pt.fadeline([ 2, 3 ], 600));
            await renderer.pause(1000);
            p.push(pt.fadeline([ 2, 3 ], 600));
            await renderer.pause(1000);
            p.push(pt.fadeline([ 2, 3 ], 600));
            await renderer.pause(800);
            await battler.box.size.modulate(renderer, 150, { x: 65 });
            let a = -90;
            while (a < 270) {
               p.push(pt.lightningAngle(a));
               await renderer.pause(133);
               a += 15;
            }
            p.push(pt.lightningAngle(270));
            break;
         }
         case 19: {
            boxMoved = true;
            await brez(100, 65);
            p.push(pt.gunH(0, box.y - 20, 1200), pt.gunV(box.x - 30, 1200, false));
            await renderer.pause(500);
            p.push(pt.fadeline([ 2, 3 ], 600));
            await renderer.pause(500);
            p.push(pt.gunH(1, box.y, 1200), pt.gunV(box.x, 1200, false));
            await renderer.pause(500);
            p.push(pt.fadeline([ 0, 1 ], 600));
            await renderer.pause(500);
            p.push(pt.gunH(0, box.y + 20, 1200), pt.gunV(box.x + 30, 1200, false));
            await renderer.pause(1700);
            battler.box.size.modulate(renderer, 150, { x: 65 });
            p.push(pt.lightning(true, [ 145, 175 ]));
            await renderer.pause(500);
            p.push(pt.lightning(true, [ 130, 160, 190 ]));
            await renderer.pause(500);
            let a = 270;
            while (a > -90) {
               p.push(pt.lightningAngle(a));
               await renderer.pause(133);
               a -= 15;
            }
            p.push(pt.lightningAngle(-90));
            await renderer.pause(200);
            battler.box.size.modulate(renderer, 150, { x: 100 });
            await renderer.pause(400);
            await pt.diamond(0.5, 0.5, { ct: 12, xr: 2.5, rv: true });
            p.push(pt.diamond(0.5, 0.5, { ct: 12, xr: 2.5 }));
            await renderer.pause(1000);
            battler.box.size.modulate(renderer, 150, { x: 65 });
            await renderer.pause(200);
            while (a < 270) {
               p.push(pt.lightningAngle([ a, a + 90 ]));
               await renderer.pause(133);
               a += 15;
            }
            p.push(pt.lightningAngle(270));
            await renderer.pause(200);
            battler.box.size.modulate(renderer, 150, { x: 100 });
            await renderer.pause(400);
            await pt.diamond(0.5, 0.5, { ct: 12, xr: 2.5, rv: true });
            p.push(pt.diamond(0.5, 0.5, { ct: 12, xr: 2.5 }));
            await renderer.pause(1000);
            p.push(pt.ring(0.9, 0.5));
            await renderer.pause(500);
            p.push(pt.ring(0.5, 0.1));
            await renderer.pause(500);
            p.push(pt.ring(0.1, 0.5));
            await renderer.pause(500);
            p.push(pt.ringflash(0.5, 0.9));
            await renderer.pause(2000);
            await Promise.all([
               battler.box.size.modulate(renderer, 150, { y: 100 }),
               battler.box.position.modulate(renderer, 150, { y: 120 })
            ]);
            p.push(pt.grid(5, 5, 10000));
            await renderer.pause(500);
            p.push(pt.fadeline(3, 600));
            await renderer.pause(1000);
            p.push(pt.fadeline(1, 600));
            await renderer.pause(1500);
            p.push(pt.fadeline(3, 600));
            await renderer.pause(1000);
            p.push(pt.fadeline(1, 600));
            await renderer.pause(800);
            let y = 75;
            while (y < 165) {
               p.push(pt.lightning(false, y));
               await renderer.pause(133);
               y += 10;
            }
            p.push(pt.lightning(false, 190), pt.ringflash(0.5, 0.9));
            await renderer.pause(1000);
            p.push(pt.ringflash(0.5, 0.1));
            await renderer.pause(1700);
            p.push(pt.diamond(0.5, 0.1));
            break;
         }
         case 20: {
            await brez(100, 65);
            p.push(pt.ringflash(0.5, 0.1, 6500));
            await renderer.pause(500);
            p.push(pt.ringflash(0.9, 0.5));
            await renderer.pause(1500);
            p.push(pt.ringflash(0.5, 0.9));
            await renderer.pause(1500);
            p.push(pt.ringflash(0.1, 0.5));
            await renderer.pause(3500);
            battler.box.size.modulate(renderer, 150, { x: 65 });
            await renderer.pause(200);
            let a = 270;
            while (a > -90) {
               p.push(pt.lightningAngle(a));
               await renderer.pause(133);
               a -= 15;
            }
            p.push(pt.lightningAngle(-90));
            await renderer.pause(500);
            await battler.box.size.modulate(renderer, 150, { x: 100 });
            p.push(pt.lightning(true, [ 115, 145, 175, 205 ]));
            await renderer.pause(500);
            p.push(pt.lightning(true, [ 130, 160, 190 ]));
            await renderer.pause(500);
            p.push(pt.lightning(true, [ 115, 145, 175, 205 ]));
            await renderer.pause(500);
            p.push(pt.lightning(true, [ 130, 160, 190 ]));
            await renderer.pause(500);
            p.push(pt.ring(0.1, 0.5));
            await renderer.pause(500);
            p.push(pt.ring(0.3, 0.6));
            await renderer.pause(500);
            p.push(pt.ring(0.5, 0.4));
            await renderer.pause(450);
            p.push(pt.ring(0.7, 0.7));
            await renderer.pause(450);
            p.push(pt.ring(0.9, 0.3));
            await renderer.pause(450);
            p.push(pt.ring(0.7, 0.8));
            await renderer.pause(400);
            p.push(pt.ring(0.5, 0.2));
            await renderer.pause(400);
            p.push(pt.ring(0.3, 0.9));
            await renderer.pause(400);
            p.push(pt.ring(0.1, 0.1));
            await renderer.pause(1200);
            battler.box.size.modulate(renderer, 150, { x: 65 });
            await renderer.pause(200);
            while (a < 270 + 360) {
               if (Math.abs(270 - a) < 15 / 2) {
                  p.push(pt.ringflash(0.5, 0.5, 4500));
               }
               p.push(pt.lightningAngle([ a, ...(a < 270 ? [] : [ a + 90 ]) ]));
               await renderer.pause(133);
               a += 15;
            }
            p.push(pt.lightningAngle([ 270, 360 ]));
            break;
         }
         case 21:
         case 22:
            // choose phase 2b attack at random
            await patterns.alphys(17 + (battler.volatile[0].vars.bonusTurns++ % 4));
            break;
      }
      p.length > 0 && (await Promise.all(p));
      boxMoved &&
         (await Promise.all([
            battler.box.position.modulate(renderer, 150, { y: 160 }),
            battler.box.size.modulate(renderer, 150, 65)
         ]));
   },
   async archive1 (p: number) {
      if (p === -999) {
         await standardSize({ x: 100, y: 65 });
         standardPos(true);
         await renderer.pause(450);
         return;
      }
      const state = { b: true };
      const fire = [] as (() => void)[];
      switch (battler.pattern('archive1', [ 0, 1, 2, 3 ])) {
         case 0: {
            await standardSize({ x: 100, y: 100 }, true);
            standardPos(true);
            fire.push(glitcher(battler.bullets, 1));
            await fireAttack(1, false, fire, state, 4);
            break;
         }
         case 1: {
            await standardSize({ x: 120, y: 80 }, true);
            standardPos(true);
            fire.push(glitcher(battler.bullets, 1));
            await renderer.pause(200);
            await fireAttack(2, false, fire, state, 4);
            break;
         }
         case 2: {
            await standardSize({ x: 120, y: 120 }, true);
            standardPos(true);
            fire.push(glitcher(battler.bullets, 1));
            await fireAttack(3, false, fire, state, 4);
            break;
         }
         case 3: {
            await standardSize({ x: 100, y: 100 }, true);
            standardPos(true);
            fire.push(glitcher(battler.bullets, 1));
            await fireAttack(4, false, fire, state, 4, paw => glitcher(paw));
            break;
         }
      }
      await battler.turnTimer(10000);
      state.b = false;
      for (const f of fire) {
         f();
      }
      if (p === 3) {
         battler.volatile[0].sparable = true;
      }
   },
   async archive2 (p: number) {
      if (p === -999) {
         await standardSize({ x: 100, y: 65 });
         standardPos(true);
         await renderer.pause(450);
         return;
      }
      const y = box.y;
      const d = [] as (() => void)[];
      await standardSize({ x: 36, y: 36 });
      await battler.box.position.modulate(renderer, 150, { y: 120 });
      standardPos(true);
      d.push(glitcher(battler.bullets, 1));
      const h = CosmosUtils.hyperpromise();
      const hurtListener = () => {
         events.off('hurt', hurtListener);
         h.resolve();
      };
      events.on('hurt', hurtListener);
      switch (p) {
         case 0:
         case 1:
         case 2:
         case 3:
         case 5: {
            const r = new CosmosValue(40);
            const o = new CosmosObject({
               spin: 4,
               alpha: 0,
               objects: CosmosUtils.populate(7, i => {
                  const rotation = (i / 7) * 360;
                  return new CosmosSprite({
                     anchor: { x: 1, y: 0 },
                     rotation,
                     frames: [ content.ibbLegendarysword ],
                     objects:
                        p === 5
                           ? []
                           : [
                                new CosmosHitbox({
                                   anchor: { x: 1, y: 0 },
                                   size: { x: 75, y: 3 },
                                   position: { x: -1, y: -2 },
                                   metadata: { bullet: true, damage: 4 }
                                })
                             ]
                  }).on('tick', function () {
                     this.position.set(CosmosMath.ray(rotation, -r.value));
                  });
               })
            }).on('tick', function () {
               this.position.set(box);
            });
            renderer.attach('menu', o);
            glitcher(o);
            sounds.appear.instance(renderer);
            await o.alpha.modulate(renderer, 500, 1);
            if (p === 5) {
               await renderer.pause(3000);
               await o.alpha.modulate(renderer, 500, 0);
            } else if (p < 2) {
               await renderer.pause(500);
               sounds.arrow.instance(renderer);
               await r.modulate(renderer, 100, 14);
               sounds.boxpush.instance(renderer);
               shake();
               await renderer.pause(900);
               let i = 0;
               while (i++ < 2) {
                  if (rng.attack.next() < 0.5) {
                     await battler.box.position.step(renderer, 0.5, { x: 150 });
                     await battler.box.position.step(renderer, 2, { x: 110 });
                     await battler.box.position.step(renderer, 0.5, { x: 100 });
                     await renderer.pause(1000);
                     await battler.box.position.step(renderer, 0.5, { x: 110 });
                     await battler.box.position.step(renderer, 2, { x: 150 });
                  } else {
                     await battler.box.position.step(renderer, 0.5, { x: 170 });
                     await battler.box.position.step(renderer, 2, { x: 210 });
                     await battler.box.position.step(renderer, 0.5, { x: 220 });
                     await renderer.pause(1000);
                     await battler.box.position.step(renderer, 0.5, { x: 210 });
                     await battler.box.position.step(renderer, 2, { x: 170 });
                  }
                  await battler.box.position.step(renderer, 0.5, { x: 160 });
                  if (i < 2) {
                     await renderer.pause(1000);
                  }
               }
            } else {
               await renderer.pause(500);
               await o.alpha.modulate(renderer, 500, 0);
            }
            renderer.detach('menu', o);
            break;
         }
         case 4: {
            const pv = new CosmosPoint(160, 120);
            await Promise.race([
               h.promise,
               (async () => {
                  let q = 0;
                  while (h.active && q++ < 4) {
                     const r = new CosmosValue(40);
                     const side = Math.floor(rng.attack.next() * 4);
                     const rotation = [ 0, 90, 180, 270 ][side];
                     const c = new CosmosHitbox({
                        anchor: { x: 1, y: 0 },
                        size: { x: 75, y: 3 },
                        position: { x: -1, y: -2 },
                        metadata: { bullet: true, damage: 4 }
                     });
                     const s = new CosmosSprite({
                        alpha: 0,
                        anchor: { x: 1, y: 0 },
                        rotation,
                        frames: [ content.ibbLegendarysword ],
                        objects: [ c ]
                     }).on('tick', function () {
                        this.position.set(pv.endpoint(Math.round(rotation), -r.value));
                     });
                     renderer.attach('menu', s);
                     glitcher(s);
                     d.push(() => renderer.detach('menu', s));
                     sounds.appear.instance(renderer);
                     await s.alpha.modulate(renderer, 500, 1);
                     if (!h.active) {
                        return;
                     }
                     await renderer.pause(400);
                     if (!h.active) {
                        return;
                     }
                     sounds.arrow.instance(renderer);
                     await r.modulate(renderer, 100, 14);
                     if (!h.active) {
                        return;
                     }
                     sounds.boxpush.instance(renderer);
                     shake();
                     const size = 108;
                     const diff = (size - 36) / 2;
                     const es = { x: [ size, 36, size, 36 ][side], y: [ 36, size, 36, size ][side] };
                     const ep = {
                        x: [ 160 + diff, 160, 160 - diff, 160 ][side],
                        y: [ 120, 120 + diff, 120, 120 - diff ][side]
                     };
                     await Promise.all([
                        battler.box.size.modulate(renderer, 500, es, es),
                        battler.box.position.modulate(renderer, 500, ep, ep)
                     ]);
                     if (!h.active) {
                        return;
                     }
                     let i = 0;
                     let g = Math.floor(rng.attack.next() * 4);
                     const ccs = [] as CosmosHitbox[];
                     while (i++ < 4) {
                        let j = 0;
                        while (j < 4) {
                           if (j !== g) {
                              const { bullet, detach } = bulletSetup(
                                 new CosmosHitbox({
                                    anchor: 0,
                                    size: 4,
                                    metadata: { bullet: true, damage: 4 },
                                    position: {
                                       x:
                                          side % 2 === 1
                                             ? box.x + CosmosMath.spread_quantize(18, j, 4)
                                             : [ box.x1 - 10, box.x2 + 10 ][side / 2],
                                       y:
                                          side % 2 === 0
                                             ? box.y + CosmosMath.spread_quantize(18, j, 4)
                                             : [ box.y1 - 10, box.y2 + 10 ][(side - 1) / 2]
                                    },
                                    velocity: { x: [ 4, 0, -4, 0 ][side], y: [ 0, 4, 0, -4 ][side] },
                                    objects: [
                                       new CosmosAnimation({ resources: content.ibbFrogstar, anchor: 0, index: 1 })
                                    ]
                                 }).on('tick', function () {
                                    if (boxCheck(this, 20)) {
                                       detach();
                                    } else {
                                       const qs = quickshadow(this.objects[0] as CosmosSprite, this, battler.bullets);
                                       qs.rotation.value = 0;
                                       d.push(() => battler.bullets.detach(qs));
                                    }
                                 })
                              );
                              d.push(detach);
                              ccs.push(bullet);
                           }
                           j++;
                        }
                        sounds.arrow.instance(renderer);
                        g = g === 0 ? 1 : g === 3 ? 2 : rng.attack.next() < 0.5 ? g - 1 : g + 1;
                        if (i < 4) {
                           await renderer.pause(500);
                           if (!h.active) {
                              return;
                           }
                        }
                     }
                     c.metadata.bullet = false;
                     await s.alpha.modulate(renderer, 500, 0);
                     if (!h.active) {
                        return;
                     }
                     renderer.detach('menu', s);
                     for (const cc of ccs) {
                        cc.metadata.bullet = false;
                     }
                     await Promise.all([
                        battler.box.size.modulate(renderer, 500, {}, {}, { x: 36, y: 36 }),
                        battler.box.position.modulate(renderer, 500, {}, {}, { x: 160, y: 120 })
                     ]);
                  }
               })()
            ]);
            break;
         }
      }
      events.off('hurt', hurtListener);
      for (const deta of d) {
         deta();
      }
      battler.SOUL.alpha.value = 0;
      await Promise.all([
         battler.box.size.modulate(renderer, 150, 36),
         battler.box.position.modulate(renderer, 150, { x: 160, y })
      ]);
      if (h.active) {
         h.resolve();
         if (p === 4) {
            battler.volatile[0].sparable = true;
            return 3;
         } else if (p === 5) {
            return 1;
         }
      } else if (p === 4) {
         await battler.volatile[0].vars.t(...text.b_opponent_archive2.challengeFail);
         return 2;
      } else if (p === 5) {
         return 1;
      }
   },
   async archive3 (p: number, x: CosmosKeyed) {
      if (p === -999) {
         await standardSize({ x: 100, y: 65 });
         standardPos(true);
         await renderer.pause(450);
         return;
      }
      await standardSize({ x: [ 100, 100, 100, 120, 80, 100 ][p], y: 65 }, true);
      standardPos(true);
      battler.SOUL.area = renderer.area!;
      battler.SOUL.filters = [ battler.clipFilter ];
      const bb = glitcher(battler.bullets, 1);
      let sy = 0;
      const hy = CosmosUtils.hyperpromise();
      const omniRect = new CosmosRectangle({
         fill: [ 0xc000c0, 0xffff40, 0x7df1f3 ][p - 3],
         position: { x: box.x, y: box.y2 },
         anchor: { x: 0, y: 1 },
         size: { x: box.sx },
         priority: 2000,
         area: renderer.area,
         filters: [ battler.clipFilter! ]
      });
      const objects = CosmosUtils.populate(2, i => {
         const scale = [ -1, 1 ][i];
         return new CosmosAnimation({
            anchor: { y: 1 },
            resources: [
               content.ibbBeaker1,
               content.ibbBeaker1,
               content.ibbBeaker1,
               content.ibbBeaker1,
               content.ibbBeaker2,
               content.ibbBeaker3
            ][p],
            position: { x: (box.sx / 2 - 10) * scale },
            scale: { x: scale },
            index: p < 2 ? 15 : 0
         }).on('tick', function () {
            if (this.active) {
               if (i === 0 && this.step === 0) {
                  const y = Math.round((sy += battler.box.size.y / 15));
                  omniRect.size.modulate(renderer, 66, { y }, { y });
               }
               if (this.index === 15) {
                  this.disable();
                  this.step = 1;
                  hy.resolve();
               }
            }
         });
      });
      const container = new CosmosObject();
      renderer.attach('menu', container);
      glitcher(container);
      const beakers = new CosmosObject({ alpha: 0, position: { x: box.x, y: box.y2 }, objects });
      container.attach(beakers);
      sounds.appear.instance(renderer);
      await beakers.alpha.modulate(renderer, 500, 1);
      if (p < 2) {
         await renderer.pause(500);
         await beakers.alpha.modulate(renderer, 500, 0);
         bb();
         renderer.detach('menu', container);
         battler.SOUL.area = null;
         battler.SOUL.filters = null;
         return;
      }
      renderer.detach('menu', battler.SOUL);
      battler.box.objects[2].attach(battler.SOUL);
      container.attach(omniRect);
      for (const obj of objects) {
         obj.step = obj.duration - 1;
         obj.enable();
      }
      await hy.promise;
      beakers.alpha.modulate(renderer, 500, 0).then(() => {
         container.detach(beakers);
      });
      await renderer.pause(250);
      battler.SOUL.area = null;
      battler.SOUL.filters = null;
      const or = omniRect.alpha.modulate(renderer, 1000, 1, 0).then(() => {
         container.detach(omniRect);
         battler.box.objects[2].detach(battler.SOUL);
         renderer.attach('menu', battler.SOUL);
      });
      const promies = [] as Promise<void>[];
      const de = [] as (() => void)[];
      switch (p) {
         case 3:
            battler.line.reset();
            battler.line.pos.x = 160;
            battler.line.pos.y = battler.line.offset + 20;
            battler.SOUL.metadata.color = 'purple';
            battler.line.active = true;
            battler.SOUL.position.x = battler.line.pos.x;
            await or;
            renderer.detach('menu', container);
            const spawn = async (id: 0 | 1, row: 0 | 1 | 2, side: -1 | 1 = 1, speed = 5) => {
               let tick = 0;
               const line = battler.box.size.y / -2 + battler.line.offset + row * 20;
               const sx = battler.box.position.x + side * (battler.box.size.x / 2 + 45);
               const vx = -side * speed * [ 1, 0.6 ][id];
               const { bullet, detached, detach } = bulletSetup(
                  new CosmosHitbox({
                     size: [ 10, 8 ][id],
                     anchor: 0,
                     velocity: { x: vx },
                     position: { x: sx, y: battler.box.position.y + line },
                     metadata: { bullet: true, damage: 4 },
                     objects: [
                        new CosmosSprite({
                           anchor: 0,
                           frames: [ [ content.ibbLabber1, content.ibbLabber2 ][id] ]
                        })
                     ]
                  }).on('tick', function () {
                     this.position.y = battler.box.position.y + line;
                     if (id === 0) {
                        this.velocity.x = vx * (this.position.y === battler.SOUL.position.y ? 0.25 : 1);
                     } else {
                        this.position.y += CosmosMath.wave(tick / 30) * [ 40, 0, -40 ][row];
                     }
                     if (
                        tick++ > 120 / speed &&
                        Math.abs(this.position.x - battler.box.position.x) > battler.box.size.x / 2 + 24
                     ) {
                        detach();
                        battler.overlay.detach(shadow);
                     }
                  }),
                  false,
                  null
               );
               const shadow = new CosmosSprite({
                  anchor: 0,
                  velocity: bullet.velocity,
                  position: bullet.position,
                  frames: [ [ content.ibbLabber1Outline, content.ibbLabber2Outline ][id] ]
               }).on('tick', function () {
                  this.position.y = battler.box.position.y + line;
                  if (id === 0) {
                     this.velocity.x = vx * (this.position.y === battler.SOUL.position.y ? 0.25 : 1);
                  } else {
                     this.position.y += CosmosMath.wave(tick / 30) * [ 40, 0, -40 ][row];
                  }
                  if (Math.abs(shadow.position.x - battler.box.position.x) < 10) {
                     battler.overlay.detach(shadow);
                  }
               });
               battler.overlay.attach(shadow);
               promies.push(detached);
               await detached;
            };
            spawn(0, 0, -1);
            spawn(1, 1, -1);
            spawn(0, 2, -1);
            spawn(0, 0, 1);
            spawn(1, 1, 1);
            spawn(0, 2, 1);
            await renderer.pause(1000);
            spawn(0, 0, -1);
            spawn(1, 1, -1);
            spawn(0, 2, -1);
            spawn(0, 0, 1);
            spawn(1, 1, 1);
            spawn(0, 2, 1);
            await renderer.pause(2000);
            spawn(1, 0, 1);
            await renderer.pause(700);
            spawn(1, 0, -1);
            await renderer.pause(1200);
            spawn(1, 2, 1);
            await renderer.pause(700);
            spawn(1, 2, -1);
            await renderer.pause(2000);
            spawn(0, 0, -1);
            spawn(1, 1, -1);
            spawn(0, 2, -1);
            spawn(0, 0, 1);
            spawn(1, 1, 1);
            spawn(0, 2, 1);
            await renderer.pause(1000);
            spawn(0, 0, -1);
            spawn(1, 1, -1);
            spawn(0, 2, -1);
            spawn(0, 0, 1);
            spawn(1, 1, 1);
            spawn(0, 2, 1);
            await renderer.pause(1000);
            spawn(0, 0, -1);
            spawn(1, 1, -1);
            spawn(0, 2, -1);
            spawn(0, 0, 1);
            spawn(1, 1, 1);
            spawn(0, 2, 1);
            await renderer.pause(2000);
            spawn(1, 0, 1);
            spawn(1, 2, 1);
            await renderer.pause(700);
            spawn(1, 0, -1);
            spawn(1, 2, -1);
            await renderer.pause(1200);
            spawn(1, 0, 1);
            spawn(1, 2, 1);
            await renderer.pause(700);
            spawn(1, 0, -1);
            spawn(1, 2, -1);
            await renderer.pause(2000);
            spawn(0, 0, -1);
            spawn(1, 1, -1);
            spawn(0, 2, -1);
            spawn(0, 0, 1);
            spawn(1, 1, 1);
            spawn(0, 2, 1);
            await renderer.pause(1000);
            spawn(0, 0, -1);
            spawn(1, 1, -1);
            spawn(0, 2, -1);
            spawn(0, 0, 1);
            spawn(1, 1, 1);
            spawn(0, 2, 1);
            await renderer.pause(1000);
            spawn(0, 0, -1);
            spawn(1, 1, -1);
            spawn(0, 2, -1);
            spawn(0, 0, 1);
            spawn(1, 1, 1);
            spawn(0, 2, 1);
            await renderer.pause(1000);
            spawn(0, 0, -1);
            spawn(1, 1, -1);
            spawn(0, 2, -1);
            spawn(0, 0, 1);
            spawn(1, 1, 1);
            spawn(0, 2, 1);
            break;
         case 4:
            battler.SOUL.metadata.color = 'yellow';
            await or;
            container.priority.value = 10;
            const sploder = (splode: number) => {
               let i = 0;
               while (i < 5) {
                  const local_i = i++;
                  const spr =
                     local_i === splode
                        ? new CosmosSprite({ anchor: 0, frames: [ content.ibbBoxBulletSplode ] })
                        : new CosmosRectangle({ anchor: 0, size: 22, fill: 0xffffff, stroke: 0, border: 2 });
                  const { detach, detached } = bulletSetup(
                     new CosmosHitbox<
                        ShootableEvents,
                        { bullet: boolean; damage: number; shootable: boolean; absorb: boolean }
                     >({
                        anchor: 0,
                        size: 22,
                        metadata: { bullet: true, damage: 4, shootable: true, absorb: local_i !== splode },
                        position: { x: box.x + CosmosMath.spread_quantize(box.sx / 2, local_i, 5), y: -10 },
                        objects: [ spr ],
                        velocity: { y: 2 },
                        scale: 1 / 2
                     })
                        .on('shot', async function () {
                           if (!this.metadata.shootable) {
                              return;
                           }
                           if (local_i === splode) {
                              this.metadata.shootable = false;
                              sounds.bomb.instance(renderer);
                              shake();
                              detach();
                              let j = 0;
                              while (j < 8) {
                                 const sd = bulletSetup(
                                    new CosmosHitbox({
                                       position: this,
                                       velocity: CosmosMath.ray(22.5 + (j / 8) * 360, 4),
                                       size: 4,
                                       anchor: 0,
                                       metadata: { bullet: true, damage: 4 },
                                       priority: -1,
                                       objects: [
                                          new CosmosAnimation({
                                             resources: content.ibbFrogstar,
                                             anchor: 0,
                                             index: 1
                                          })
                                       ]
                                    }).on('tick', function () {
                                       if (screenCheck(this, 10)) {
                                          sd.detach();
                                       } else {
                                          const qs = quickshadow(this.objects[0] as CosmosSprite, this, container);
                                          qs.priority.value = -2;
                                          de.push(() => container.detach(qs));
                                       }
                                    }),
                                    container
                                 );
                                 promies.push(sd.detached);
                                 j++;
                              }
                           }
                        })
                        .on('tick', function () {
                           screenCheck(this, 10) && detach();
                        }),
                     container,
                     null
                  );
                  promies.push(detached);
               }
            };
            let iter = 0;
            let position = 2;
            while (iter++ < 10) {
               switch (position) {
                  case 0:
                     position = [ 1, 2 ][Math.floor(rng.attack.next() * 2)];
                     break;
                  case 1:
                     position = [ 0, 2, 3 ][Math.floor(rng.attack.next() * 3)];
                     break;
                  case 2:
                     position = [ 0, 1, 3, 4 ][Math.floor(rng.attack.next() * 4)];
                     break;
                  case 3:
                     position = [ 1, 2, 4 ][Math.floor(rng.attack.next() * 3)];
                     break;
                  case 4:
                     position = [ 2, 3 ][Math.floor(rng.attack.next() * 2)];
                     break;
               }
               const sp = sploder(position);
               await (iter < 10 ? renderer.pause(1500) : sp);
            }
            break;
         case 5:
            battler.SOUL.metadata.color = 'cyan';
            await or;
            const positions = [ 1, 2, 3 ];
            const segments = 5;
            let s = 100;
            let v = 0;
            let g = -1 / 15;
            const x = -0.5;
            let hits = 0;
            let ended = false;
            const de2 = [] as (() => void)[];
            const dangerRect = new CosmosRectangle({
               anchor: 0,
               border: 1,
               stroke: 0xffffff,
               position: battler.box
            }).on('tick', function () {
               if (!ended) {
                  v = Math.max(v + g, x);
                  s += v;
                  this.alpha.value = Math.min(Math.max(CosmosMath.bezier(s / 100, 1, 1, 0), 0), 1);
                  if (s <= 0 && !battler.SOUL.metadata.cyanLeap) {
                     ended = true;
                     shake();
                     sounds.bomb.instance(renderer);
                     this.fill = 0xffffff;
                     this.area = renderer.area!;
                     this.filters = [ battler.clipFilter! ];
                     battler.invulnerable = 0;
                     battler.damage(4 + battler.bonus);
                     for (const d of de2) {
                        d();
                     }
                  } else {
                     this.size.set(battler.box.size.add(s));
                  }
               }
            });
            container.attach(dangerRect);
            const rad = rand_rad(rng.battle.next());
            while (!ended && hits < 15) {
               const segmentSize = battler.box.size.x / segments;
               const baseX = box.x1 + segmentSize / 2;
               let fx = true;
               const top = rad.next() < 0.5;
               const lanes = CosmosUtils.populate(segments, segment => segment).filter(
                  testLane => !positions.includes(testLane)
               );
               const lane = lanes[rad.int(lanes.length)];
               positions.push(lane);
               positions.length > 3 && positions.shift();
               const { bullet, detached, detach } = bulletSetup(
                  new CosmosHitbox({
                     anchor: 0,
                     size: 10,
                     position: { x: baseX + lane * segmentSize, y: top ? box.y1 - 10 : box.y2 + 10 },
                     metadata: { bullet: true, color: 'yellow', damage: 0 },
                     velocity: { y: top ? 2 : -2 }
                  }).on('tick', function () {
                     if (top ? this.position.y > box.y2 + 10 : this.position.y < box.y1 - 10) {
                        fx = false;
                        detach();
                     }
                  })
               );
               de2.push(detach);
               let av = true;
               const spr = new CosmosAnimation({
                  anchor: 0,
                  resources: content.ibbLabber3Yellow
               }).on('tick', function () {
                  this.position.set(bullet);
                  if (av) {
                     this.alpha.value =
                        (top ? box.y2 - this.position.y : this.position.y - box.y1) / battler.box.size.y;
                  }
               });
               container.attach(spr);
               de2.push(() => container.detach(spr));
               await detached;
               if (ended) {
                  break;
               }
               av = false;
               if (fx) {
                  hits++;
                  spr.active = true;
                  spr.extrapolate = false;
                  spr.duration = 2;
                  const r = CosmosMath.remap(spr.alpha.value, 1.2, 1.8);
                  sounds.upgrade.instance(renderer).rate.value = r;
                  spr.scale.modulate(renderer, 600, 7);
                  spr.alpha.modulate(renderer, 600, 0, 0).then(() => {
                     container.detach(spr);
                  });
                  v = 1;
               } else {
                  shake();
                  sounds.bomb.instance(renderer);
                  spr.use(content.ibbLabber3);
                  spr.alpha.value = 0.5;
                  spr.alpha.modulate(renderer, 300, 1).then(async () => {
                     await renderer.pause(300);
                     await spr.alpha.modulate(renderer, 300, 0);
                     container.detach(spr);
                  });
               }
            }
            if (ended) {
               await dangerRect.alpha.modulate(renderer, 1000, 0);
               container.detach(dangerRect);
            } else {
               v = 10;
               g = 0;
               await dangerRect.alpha.modulate(renderer, 300, 0);
               for (const d of de) {
                  d();
               }
            }
            await renderer.pause(1000);
            break;
      }
      await Promise.all(promies);
      battler.line.active = false;
      battler.SOUL.metadata.color = 'red';
      battler.SOUL.metadata.cyanLeap = false;
      for (const d of de) {
         d();
      }
      bb();
      renderer.detach('menu', container);
      if (x.test_a && x.test_b && x.test_c) {
         battler.volatile[0].sparable = true;
         return 2;
      } else {
         return 1;
      }
   },
   async archive4 (p: number) {
      if (p === 0 || p === -999) {
         await renderer.pause(450);
         return;
      }
      const d = [] as (() => void)[];
      const songEvents = new CosmosEventHost<{
         kick: [];
         snare: [];
         chord: [number];
         multipercussion: [number];
      }>();
      const unitID = () => {
         return Math.round(battler.music!.position / unitTime);
      };
      let lastUnit = unitID();
      const chordID = () => {
         if (lastUnit < 4) {
            return 7;
         } else if (lastUnit < 500) {
            return [ 6, 5 ][Math.floor((lastUnit - 4) / 32) % 2];
         } else if (lastUnit < 516) {
            return 7;
         } else if (lastUnit < 772) {
            return [ 1, 1, 0, 0, 1, 1, 2, 3, 4, 4, 2, 2, 4, 4, 2, 2 ][Math.floor((lastUnit - 516) / 16)];
         } else {
            return 7;
         }
      };
      let lastChord = chordID();
      function timeTicker () {
         const unit = unitID();
         if (unit !== lastUnit) {
            lastUnit = unit;
            if (unit < 4) {
               songEvents.fire('kick');
               songEvents.fire('snare');
            } else if (unit < 884) {
               const baseUnit = unit - 4;
               const value = percussionMap[Math.floor((baseUnit % 128) / 32)][baseUnit % 32];
               let kick = false;
               let snare = false;
               if (value % 2 === 1) {
                  kick = true;
                  songEvents.fire('kick');
               }
               if (value > 1 && (unit < 772 || baseUnit % 16 === 8)) {
                  snare = true;
                  songEvents.fire('snare');
               }
               if (kick || snare) {
                  songEvents.fire('multipercussion', value);
               }
            }
            const chord = chordID();
            if (chord !== lastChord) {
               lastChord = chord;
               songEvents.fire('chord', chord);
            }
         }
      }
      renderer.on('tick', timeTicker);
      if (p === 6) {
         const container = new CosmosObject();
         renderer.attach('menu', container);
         glitcher(container);
         songEvents.on('multipercussion', () => {
            const time = renderer.time;
            const baseX = box.x1 + 3 + rng.attack.next() * (box.sx - 6);
            const { detach } = bulletSetup(
               new CosmosHitbox({
                  metadata: { bullet: true, damage: 4 },
                  anchor: 0,
                  size: 10,
                  position: { x: baseX },
                  velocity: { y: 8 },
                  scale: 1 / 2,
                  objects: [
                     new CosmosAnimation({
                        index: Math.floor(Math.random() * 4),
                        resources: content.ibbNote,
                        anchor: 0
                     })
                  ]
               }).on('tick', function () {
                  if (screenCheck(this, 10)) {
                     detach();
                     return;
                  }
                  this.position.x = baseX + sineWaver(time, unitTime * 4, -2, 2);
                  if (this.velocity.y > 4) {
                     if ((this.velocity.y -= 0.2) <= 4) {
                        this.velocity.y = 4;
                     } else {
                        const qs = quickshadow(this.objects[0] as CosmosSprite, this, container);
                        qs.priority.value = -1;
                        d.push(() => container.detach(qs));
                     }
                  }
               }),
               container
            );
            d.push(detach);
         });
         await renderer.pause(10000);
         renderer.off('tick', timeTicker);
         for (const deta of d) {
            deta();
         }
         renderer.detach('menu', container);
         return 1;
      }
      const h = CosmosUtils.hyperpromise();
      const hurtListener = () => {
         events.off('hurt', hurtListener);
         h.resolve();
      };
      events.on('hurt', hurtListener);
      switch (p) {
         case 1:
         case 2:
         case 7: {
            let d = renderer.time;
            const wave = waveMap[lastChord];
            const speed = new CosmosValue(wave.speed);
            const wavelength = new CosmosValue(wave.wavelength);
            songEvents.on('chord', value => {
               d = renderer.time;
               const wave = waveMap[value];
               speed.modulate(renderer, unitTime * 4000, wave.speed);
               wavelength.modulate(renderer, unitTime * 4000, wave.wavelength);
            });
            const total = 40;
            const spr = new CosmosSprite({
               anchor: 0,
               frames: [ content.ibbHeadset ],
               position: box,
               metadata: { t: renderer.time }
            }).on('tick', function () {
               const shValue = Math.min(Math.max((this.metadata.t - renderer.time) / 300, 0), 1);
               this.offsets[0].set((Math.random() * 2 - 1) * shValue, (Math.random() * 2 - 1) * shValue);
            });
            const particles = CosmosUtils.populate(total, i => {
               const baseX = CosmosMath.spread(110 / 2, i, total);
               return new CosmosHitbox({
                  size: 4,
                  metadata: { damage: 4, bullet: true, s: 0 },
                  position: { x: spr.position.x + baseX },
                  objects: [ new CosmosAnimation({ resources: content.ibbFrogstar, anchor: 0, index: 1 }) ]
               }).on('tick', function () {
                  const modspd = speed.value / 2;
                  const modwavelength = wavelength.value * 3;
                  const waveEndpoint =
                     CosmosMath.wave(
                        (baseX % modwavelength) / modwavelength + (this.metadata.s += modspd) * (modspd / modwavelength)
                     ) - 0.5;
                  if (p !== 7 || Math.floor(Math.max(renderer.time - d, 0) / (unitTime * 8000)) % 2 === 0) {
                     this.alpha.value = 0.1 + Math.abs(waveEndpoint) * 0.8;
                     this.metadata.bullet = false;
                  } else {
                     this.alpha.value = 1;
                     this.metadata.bullet = true;
                  }
                  this.position.y = spr.position.y + waveEndpoint * box.sy;
               });
            });
            renderer.attach('menu', spr);
            battler.bullets.attach(...particles);
            glitcher(spr);
            songEvents.on('multipercussion', function () {
               spr.metadata.t = renderer.time + 300;
            });
            await spr.position.modulate(renderer, 1000, {}, { y: box.y }, { y: box.y });
            await Promise.race([ h.promise, renderer.pause(p === 7 ? 15000 : 4000) ]);
            battler.bullets.detach(...particles);
            renderer.detach('menu', spr);
            break;
         }
         case 3:
         case 4:
         case 8: {
            const container = new CosmosObject();
            renderer.attach('menu', container);
            glitcher(container);
            const sh = new CosmosValue(2);
            const boomboxes = CosmosUtils.populate(2, i =>
               new CosmosSprite({
                  frames: [ content.ibbBoombox ],
                  anchor: 0,
                  position: { x: [ 40, 280 ][i], y: box.y },
                  metadata: { t: renderer.time }
               }).on('tick', function () {
                  const phaser = Math.min(Math.max((this.metadata.t - renderer.time) / 300, 0), 1);
                  this.scale.set(CosmosMath.remap(phaser, 1, 0.9), CosmosMath.remap(phaser, 1, 1.1));
                  this.offsets[0].set((Math.random() * 2 - 1) * sh.value, (Math.random() * 2 - 1) * sh.value);
               })
            );
            container.attach(...boomboxes);
            const spawnRing = (side: number) => {
               const pos = boomboxes[side].position;
               let i = 0;
               const baserot = rng.attack.next() * 360;
               const amt = 12;
               const div = 4;
               while (i < amt) {
                  if ((Math.floor(i / (amt / div)) % div) % 2 === 0) {
                     let r = 8;
                     let a = baserot + (i / amt) * 360;
                     const { detach } = bulletSetup(
                        new CosmosHitbox({
                           anchor: 0,
                           size: 6,
                           metadata: { y: -0.5, bullet: true, damage: 4 },
                           priority: 1,
                           objects: [ new CosmosSprite({ anchor: 0, frames: [ content.ibbBoomboxRing ] }) ]
                        }).on('tick', function () {
                           this.position.set(pos.endpoint(Math.round((a += 0.1)), (r += 3)));
                           this.rotation.value = a;
                           screenCheck(this, 10) && detach();
                        }),
                        container
                     );
                     d.push(detach);
                  }
                  i++;
               }
            };
            songEvents.on('kick', function () {
               boomboxes[0].metadata.t = renderer.time + 300;
               p === 8 && spawnRing(0);
            });
            songEvents.on('snare', function () {
               boomboxes[1].metadata.t = renderer.time + 300;
               p === 8 && spawnRing(1);
            });
            songEvents.on('multipercussion', function (value) {
               shake([ 1, 0.5, 2 ][value - 1], 100);
            });
            sounds.landing.instance(renderer);
            await Promise.race([ h.promise, sh.modulate(renderer, 500, 0, 0) ]);
            if (h.active) {
               await Promise.race([ h.promise, renderer.pause(p === 8 ? 14500 : 3500) ]);
            }
            renderer.detach('menu', container);
            break;
         }
      }
      events.off('hurt', hurtListener);
      renderer.off('tick', timeTicker);
      for (const deta of d) {
         deta();
      }
      if (h.active) {
         h.resolve();
         if (p === 7) {
            return 3;
         } else if (p === 8) {
            battler.volatile[0].sparable = true;
            return 5;
         }
      } else if (p === 7) {
         await battler.volatile[0].vars.t(...text.b_opponent_archive4.composeFail);
         return 2;
      } else if (p === 8) {
         await battler.volatile[0].vars.t(...text.b_opponent_archive4.mixFail);
         return 4;
      }
   },
   async archive5 (p: number) {
      if (p === -999) {
         await renderer.pause(450);
         return;
      }
      const state = { b: true };
      const fire = [] as (() => void)[];
      await fireAttack(0, false, fire, state);
      await battler.turnTimer(4000);
      state.b = false;
      for (const f of fire) {
         f();
      }
      if (p === 1) {
         battler.volatile[0].sparable = true;
      }
   },
   async asriel (
      turns: number,
      ultimadelay = 0,
      ultimadamage = 99,
      ultimatime = 4000,
      dialogue = async (cutscene: boolean, ...lines: string[]) => {}
   ) {
      const hy = CosmosUtils.hyperpromise();
      const controller = CosmosUtils.hyperpromise();
      const is = [] as CosmosInstance[];
      const sf = (inst: CosmosInstance) => {
         is.push(inst);
         inst.on('stop').then(() => is.splice(is.indexOf(inst), 1));
         return inst;
      };
      const hurtListener = (a: CosmosHitbox, b: number, papyrus: boolean) => {
         if (!papyrus && SAVE.data.n.hp <= 0) {
            battler.regen.reset();
            battler.avert = true;
            hy.resolve();
         }
      };
      events.on('hurt', hurtListener);
      let tt = true;
      let turnPromise = void 0 as Promise<void> | void;
      switch (turns) {
         case -1: {
            const fire = [] as (() => void)[];
            const state = { b: true };
            await standardSize({ x: 100, y: 65 }, true);
            standardPos(true);
            (async () => {
               let s = 0;
               const time = renderer.time;
               while (state.b) {
                  const o = rng.attack.next();
                  const y =
                     box.y1 + 4 + CosmosMath.bezier(rng.attack.next(), 0, 0, 0, 0, 0, 1, 1, 1, 1, 1) * (box.sy - 8);
                  let w = 0;
                  const { bullet, detach } = bulletSetup(
                     new CosmosHitbox({
                        anchor: 0,
                        size: { x: 13, y: 11 },
                        metadata: { bullet: true, damage: 4, doggerDetach: void 0 as (() => void) | void },
                        scale: 1 / 2,
                        priority: 1,
                        gravity: { x: [ 0.15, -0.15 ][s] },
                        acceleration: 0.98,
                        position: { x: [ box.x1 - 10, box.x2 + 10 ][s] },
                        objects: [ new CosmosAnimation({ active: true, anchor: 0, resources: content.ibbFirebol }) ]
                     }).on('tick', function () {
                        if ([ this.position.x > box.x2 + 10, this.position.x < box.x1 - 10 ][s]) {
                           detach();
                        } else {
                           quickshadow(this.objects[0] as CosmosSprite, this, battler.bullets).scale.set(1 / 2);
                           this.position.y = y + sineWaver(time, 500, -w, w, o);
                           w += 1 / 20;
                        }
                     })
                  );
                  fire.push(detach);
                  bullet.metadata.doggerDetach = detach;
                  await renderer.pause(200);
                  s = 1 - s;
               }
            })();
            turnPromise = renderer.pause(10000);
            controller.promise.then(() => {
               state.b = false;
               for (const f of fire) {
                  f();
               }
            });
            break;
         }
         // star blazing
         case 0:
         case 6:
         case 11: {
            await brez(120, 65);
            const hardmode = turns === 11; // galacta blazing
            const dcount = 16;
            const fcount = hardmode ? 16 : 12;
            const roffst = 360 / dcount / 6;
            battler.box.priority.value = 1;
            turnPromise = (async () => {
               const detachers = [] as (() => void)[];
               controller.promise.then(() => {
                  battler.box.priority.value = 0;
                  for (const d of detachers) {
                     d();
                  }
               });
               let findex = 0;
               while (controller.active && findex < fcount) {
                  const big = findex === fcount - 1;
                  const rator = rng.attack.next();
                  const tY = 40 + (big ? 0 : rator) * 40;
                  const tV = big ? (hardmode ? 5.5 : 3.5) : hardmode ? 9 : 7;
                  const colorMatrix = new HslAdjustmentFilter();
                  const firework = new CosmosAnimation({
                     area: renderer.area,
                     active: true,
                     position: { x: big ? 160 : box.x1 + rng.attack.next() * box.sx, y: 240 },
                     anchor: { x: 0 },
                     resources: content.ibbFirework,
                     velocity: { y: -tV },
                     metadata: { hue: 0 },
                     gravity: { y: distanceGravity(tV, (240 - tY) * 2) },
                     tint: 0xff8080,
                     filters: [ colorMatrix ],
                     priority: 0.5
                  }).on('tick', async function () {
                     if (this.position.y <= tY) {
                        renderer.detach('menu', firework);
                        const superstar = new CosmosSprite({
                           area: renderer.area,
                           anchor: 0,
                           scale: 0.25,
                           spin: 3,
                           priority: 5,
                           frames: [ content.ibbGalaxystar ],
                           position: firework,
                           tint: 0xff8080,
                           filters: [ colorMatrix ]
                        }).on('tick', () => {
                           colorMatrix.hue = this.metadata.hue % 360;
                           this.metadata.hue += 24;
                        });
                        renderer.attach('menu', superstar);
                        detachers.push(() => renderer.detach('menu', superstar));
                        Promise.all([
                           superstar.scale.modulate(renderer, 1000, 4),
                           superstar.alpha.modulate(renderer, 1000, 0)
                        ]).then(() => {
                           renderer.detach('menu', superstar);
                        });
                        sf(sounds.boom.instance(renderer, 0.2)).rate.value = big ? 0.8 : 1.6;
                        shake(2, big ? 1000 : 500);
                        let xindex = 0;
                        const rcount = big ? (hardmode ? 6 : 5) : hardmode ? 3 : 2;
                        while (xindex < rcount * dcount) {
                           const dindex = xindex % dcount;
                           const rindex = Math.floor(xindex / dcount);
                           const angle = Math.round((dindex / dcount) * 360 + rindex * roffst);
                           const { bullet, detach } = bulletSetup(
                              new CosmosHitbox({
                                 alpha: 0.8,
                                 anchor: 0,
                                 size: 8,
                                 scale: 3 / 4,
                                 rotation: 45,
                                 metadata: { bullet: true, damage: 7, doggerDetach: void 0 as (() => void) | void },
                                 position: superstar.position.endpoint(angle, rindex * 3),
                                 velocity: CosmosMath.ray(angle, 4 + rindex / 7),
                                 spin: rng.attack.next() < 0.5 ? -3 : 3,
                                 priority: 2,
                                 objects: [
                                    new CosmosSprite({ frames: [ content.ibbStardrop ], rotation: -45, anchor: 0 })
                                 ]
                              }).on('tick', function () {
                                 screenCheck(this, 10) && detach();
                              }),
                              true
                           );
                           bullet.metadata.doggerDetach = detach;
                           controller.promise.then(() => detach());
                           xindex++;
                        }
                     } else {
                        colorMatrix.hue = this.metadata.hue % 360;
                        const cmfx = new ColorMatrixFilter();
                        cmfx.hue(this.metadata.hue % 360, false);
                        const qs = quickshadow(this, this);
                        qs.priority.value = 0;
                        qs.area = renderer.area;
                        qs.tint = 0xff8080;
                        qs.filters = [ cmfx ];
                        qs.priority.value = 0;
                        detachers.push(() => renderer.detach('menu', qs));
                        this.metadata.hue += 12;
                     }
                  });
                  renderer.attach('menu', firework);
                  detachers.push(() => renderer.detach('menu', firework));
                  sf(sounds.starfall.instance(renderer)).rate.value = (1.1 - rator * 0.2) / (big ? 2 : 1);
                  if (big) {
                     await renderer.pause(hardmode ? 3500 : 4000);
                  } else {
                     await renderer.pause(700 + rator * 300);
                  }
                  findex++;
               }
            })();
            break;
         }
         // shocker breaker
         case 1:
         case 4:
         case 10: {
            await brez(120, 65);
            const hardmode = turns === 10; // shocker breaker II
            let i = 0;
            let l = 0;
            let w = 0;
            const mx = 100;
            const wind = new CosmosValue();
            const windlines = CosmosUtils.populate(25, () => ({
               x: box.x + (box.sx + mx) * (Math.random() - 0.5),
               y: box.y1 + Math.random() * box.sy
            }));
            const graphics = new Graphics();
            const windloop = sf(sounds.wind.instance(renderer));
            windloop.gain.value = 0;
            const windbox = new CosmosObject().on('tick', function () {
               const ab = Math.abs(wind.value);
               const sh = ab * 2;
               const rs = ab * mx * 2;
               battler.SOUL.position.x += wind.value;
               windloop.gain.value = ab;
               windloop.rate.value = 0.8 + ab * 0.4;
               renderer.shake.value < sh && shake(sh);
               const aab = Math.min(ab * 0.2, 0.1);
               graphics.clear().beginFill(0xffffff, aab / 2);
               for (const windline of windlines) {
                  windline.x += wind.value * 30;
                  if (windline.x <= box.x1 - mx / 2) {
                     windline.x += box.sx + mx;
                  } else if (box.x2 + mx / 2 <= windline.x) {
                     windline.x -= box.sx + mx;
                  }
                  graphics.drawRect(windline.x - rs * 0.5, windline.y - 0.5, rs, 1);
               }
               graphics.endFill().beginFill(0xffffff, aab);
               for (const windline of windlines) {
                  graphics.drawRect(windline.x - rs * 0.7 * 0.5, windline.y - 0.5, rs * 0.7, 1);
               }
               graphics.endFill();
            });
            windbox.container.addChild(graphics);
            battler.bullets.attach(windbox);
            turnPromise = (async () => {
               const detachers = [] as (() => void)[];
               controller.promise.then(() => {
                  windloop.stop();
                  battler.bullets.detach(windbox);
                  for (const d of detachers) {
                     d();
                  }
               });
               while (controller.active && i < (hardmode ? 150 : 100)) {
                  const x = box.x1 + 5 + rng.attack.next() * (box.sx - 10);
                  if (w-- === 0) {
                     w = 20 + rng.attack.int(10);
                     const value = (rng.attack.next() * 2 - 1) * (hardmode ? 0.5 : 0.3);
                     const targetvalue = value < 0 ? value - 0.2 : value + 0.2;
                     wind.modulate(renderer, 500, wind.value, targetvalue, targetvalue);
                  }
                  if (l-- === 0) {
                     l = hardmode ? 4 + rng.attack.int(8) : 5 + rng.attack.int(10);
                     const warner = new CosmosRectangle({
                        area: renderer.area,
                        anchor: { x: 0, y: 1 },
                        position: { x, y: box.y2 - 1 },
                        size: 12,
                        stroke: 0xffffff,
                        tint: 0xff0000,
                        metadata: { ticks: 0 },
                        objects: [
                           new CosmosText({
                              anchor: 0,
                              position: { x: 1, y: -6 },
                              stroke: -1,
                              fill: 0xff0000,
                              fontFamily: content.fCryptOfTomorrow,
                              fontSize: 8,
                              content: '!'
                           })
                        ],
                        filters: [ battler.clipFilter! ]
                     }).on('tick', function () {
                        if (this.metadata.ticks++ === 1) {
                           this.metadata.ticks = 0;
                           const red = this.tint === 0xff0000;
                           this.tint = red ? 0xffff00 : 0xff0000;
                           this.objects[0].fill = red ? 0xffff00 : 0xff0000;
                           if (red) {
                              sounds.prebomb.instance(renderer).rate.value = 1.2;
                           }
                        }
                     });
                     renderer.attach('menu', warner);
                     detachers.push(() => renderer.detach('menu', warner));
                     renderer.pause(hardmode ? 800 : 1000).then(async () => {
                        if (!controller.active) {
                           return;
                        }
                        renderer.detach('menu', warner);
                        const colorMatrix = new HslAdjustmentFilter();
                        const { bullet, detach } = bulletSetup(
                           new CosmosHitbox({
                              area: renderer.area,
                              anchor: { x: 0, y: 1 },
                              size: { x: 16, y: 200 },
                              metadata: {
                                 hue: 0,
                                 bullet: true,
                                 damage: 7,
                                 doggerDetach: void 0 as (() => void) | void
                              },
                              priority: 2,
                              position: { x, y: box.y2 },
                              tint: 0xff8080,
                              filters: [ colorMatrix ],
                              objects: [
                                 new CosmosAnimation({
                                    anchor: { x: 0, y: 1 },
                                    active: true,
                                    resources: content.ibbBigbolt
                                 })
                              ]
                           }).on('tick', function () {
                              colorMatrix.hue = this.metadata.hue % 360;
                              this.metadata.hue += 24;
                           }),
                           true,
                           null
                        );
                        bullet.metadata.doggerDetach = detach;
                        detachers.push(detach);
                        sf(sounds.lightningstrike.instance(renderer));
                        const snd2 = sf(sounds.boom.instance(renderer, 0.16));
                        snd2.rate.value = 0.8;
                        snd2.gain.modulate(renderer, 1000, snd2.gain.value, 0);
                        shake();
                        await renderer.pause(150);
                        if (!controller.active) {
                           return;
                        }
                        bullet.metadata.bullet = false;
                        if (bullet.alpha.task !== void 0) {
                           return;
                        }
                        await bullet.alpha.modulate(renderer, 300, 0);
                        if (!controller.active) {
                           return;
                        }
                        detach();
                     });
                  } else {
                     const invis = rng.attack.next() < 0.85;
                     const s = invis ? 0.5 : 1;
                     const { bullet, detach } = bulletSetup(
                        new CosmosHitbox({
                           alpha: invis ? 0.25 : 1,
                           size: { x: 10, y: 11 },
                           anchor: { y: 0, x: 1 },
                           position: { x, y: -10 },
                           rotation: 90,
                           scale: { x: 0.6 * s, y: 0.4 * s },
                           gravity: { y: 0.3 },
                           priority: 1,
                           metadata: { damage: 7, bullet: !invis, doggerDetach: void 0 as (() => void) | void },
                           objects: [
                              new CosmosAnimation({
                                 anchor: { y: 0, x: 1 },
                                 position: { x: 1 },
                                 resources: content.ibbWater
                              })
                           ]
                        }).on('tick', async function () {
                           if (box.y2 <= this.position.y) {
                              detach();
                              if (invis) {
                                 return;
                              }
                              let i = 0;
                              while (i < 4) {
                                 battler.bullets.attach(
                                    new CosmosAnimation({
                                       scale: 1 / 4,
                                       alpha: 0.25,
                                       position: this.position.add(CosmosMath.spread(0, i, 6), 0),
                                       velocity: CosmosMath.ray(
                                          Math.round(CosmosMath.spread(20, i, 4) + -90 + (Math.random() * 10 - 5)),
                                          Math.random() * 2 + 3
                                       ),
                                       gravity: { y: 0.3, x: wind.value },
                                       resources: content.ibbWater
                                    }).on('tick', function () {
                                       if (!controller.active || this.position.y > box.y2 + 10) {
                                          battler.bullets.detach(this);
                                       } else {
                                          this.rotation.value = this.velocity.angle;
                                       }
                                    })
                                 );
                                 i++;
                              }
                           } else {
                              box.y1 <= this.position.y && (this.gravity.x = wind.value / 2);
                              if (this.filters === null && box.y <= this.position.y) {
                                 this.area = renderer.area;
                                 this.filters = [ battler.clipFilter! ];
                              }
                              const qs = quickshadow(this.objects[0] as CosmosSprite, this.position.add(0, 1));
                              qs.priority.value = 0;
                              qs.scale.set(this.scale);
                              qs.rotation.value = 90;
                           }
                        }),
                        true
                     );
                     detachers.push(detach);
                     bullet.metadata.doggerDetach = detach;
                  }
                  await renderer.pause(100 + rng.attack.next() * 50);
                  i++;
               }
            })();
            break;
         }
         // chaos saber (sword)
         case 2:
         case 7:
         case 9: {
            await brez(120, 65);
            const hardmode = turns === 9; // chaos slicer
            const rounds = hardmode ? 8 : 6;
            turnPromise = (async () => {
               const detachers = [] as (() => void)[];
               controller.promise.then(() => {
                  for (const d of detachers) {
                     d();
                  }
               });
               let round = 0;
               while (controller.active && round < rounds) {
                  const rad = rand_rad(rng.attack.next());
                  const side = rad.next() < 0.5 ? 0 : 1;
                  const sh = new CosmosValue(20);
                  const sword = new CosmosSprite({
                     alpha: 0,
                     anchor: 0,
                     frames: [ content.ibbAwesomesword ],
                     position: { x: box.x, y: 60 },
                     metadata: { offs: 1, tick: 0, b: true },
                     priority: 1
                  }).on('tick', function () {
                     sword.offsets[0].set(sh.value * this.metadata.offs, 0);
                     if (this.metadata.tick++ === 1) {
                        this.metadata.tick = 0;
                        this.metadata.offs *= -1;
                     }
                     if (this.velocity.y !== 0) {
                        if (this.position.y > box.y2 + 50) {
                           renderer.detach('menu', sword);
                           return;
                        } else {
                           let s = 0;
                           while (s++ < 3) {
                              const b = this.metadata.b;
                              this.metadata.b = !this.metadata.b;
                              const rx = battler.SOUL.position.x < 160 ? rad.next() - 0.65 : rad.next() - 0.35;
                              const { bullet, detach } = bulletSetup(
                                 new CosmosHitbox({
                                    alpha: b ? 1 : 0.4,
                                    size: 4,
                                    anchor: 0,
                                    metadata: {
                                       bullet: b,
                                       damage: 7,
                                       ticks: 0,
                                       doggerDetach: void 0 as (() => void) | void
                                    },
                                    position: this.position.add(rx * 4, rad.next() * 87 - 43.5),
                                    priority: 0.25,
                                    scale: 0.5,
                                    velocity: { y: (rad.next() - 0.5) * 2.5, x: (rad.next() - 0.5) * 4 },
                                    acceleration: 0.98,
                                    objects: [
                                       new CosmosAnimation({ index: 3, resources: content.ibbExShine, anchor: 0 })
                                    ]
                                 }).on('tick', function () {
                                    if (32 <= this.metadata.ticks++) {
                                       this.metadata.bullet = false;
                                       this.alpha.value -= 1 / 32;
                                       if (this.alpha.value <= 0) {
                                          this.alpha.value = 0;
                                          screenCheck(this, 10) && renderer.detach('menu', this);
                                       }
                                    }
                                 }),
                                 true
                              );
                              detachers.push(detach);
                              bullet.metadata.doggerDetach = detach;
                           }
                        }
                     }
                     const qs = quickshadow(this, this);
                     qs.priority.value = 0.5;
                     qs.position.x += this.offsets[0].x;
                     detachers.push(() => renderer.detach('menu', qs));
                  });
                  renderer.attach('menu', sword);
                  detachers.push(() => renderer.detach('menu', sword));
                  const warner = new CosmosRectangle({
                     area: renderer.area,
                     anchor: 0,
                     position: { x: [ box.x1, box.x ][side] + box.sx / 4, y: box.y },
                     size: { x: box.sx / 2 - 2, y: box.sy - 2 },
                     stroke: 0xffffff,
                     tint: 0xff0000,
                     metadata: { ticks: 0, pb: 0 },
                     border: 2,
                     objects: [
                        new CosmosText({
                           anchor: 0,
                           position: { x: 1 },
                           stroke: -1,
                           fill: 0xff0000,
                           fontFamily: content.fCryptOfTomorrow,
                           fontSize: 8,
                           content: '!'
                        })
                     ],
                     filters: [ battler.clipFilter! ]
                  }).on('tick', function () {
                     if (this.metadata.ticks++ === 1) {
                        this.metadata.ticks = 0;
                        const red = this.tint === 0xff0000;
                        this.tint = red ? 0xffff00 : 0xff0000;
                        this.objects[0].fill = red ? 0xffff00 : 0xff0000;
                        if (red) {
                           sounds.prebomb.instance(renderer).rate.value = 1.2;
                        }
                     }
                  });
                  renderer.attach('menu', warner);
                  detachers.push(() => renderer.detach('menu', warner));
                  sf(sounds.sword.instance(renderer));
                  await Promise.all([
                     sh.modulate(renderer, hardmode ? 600 : 800, 0),
                     sword.alpha.modulate(renderer, hardmode ? 600 : 800, 1)
                  ]);
                  if (!controller.active) {
                     return;
                  }
                  renderer.detach('menu', warner);
                  sword.velocity.y = 20;
                  sf(sounds.stab.instance(renderer));
                  sf(sounds.asrielSparkle.instance(renderer));
                  const displayline = new CosmosRectangle({
                     size: { x: 1, y: 1000 },
                     anchor: { x: 0, y: 1 },
                     fill: 0xffffff,
                     alpha: 0.4
                  }).on('tick', async function () {
                     this.position.set(sword.position.add(0, 45.5));
                     if (
                        battler.SOUL.metadata.collision &&
                        Math.abs(160 - battler.SOUL.position.x) < 4 &&
                        battler.SOUL.position.y - 4 <= this.position.y
                     ) {
                        const target = { x: battler.SOUL.position.x < 160 ? 120 : 200, y: battler.SOUL.position.y };
                        const leaper = new CosmosAnimation({
                           anchor: 0,
                           scale: 0.5,
                           resources: content.ibuSOUL,
                           position: battler.SOUL,
                           priority: battler.shadow.priority.value
                        }).on('tick', function () {
                           battler.SOUL.position.set(this);
                           quickshadow(this, this, 'menu', 0.4, 1 / 0.9, 0.2);
                        });
                        battler.SOUL.objects[0].alpha.value = 0;
                        renderer.attach('menu', leaper);
                        sounds.arrow.instance(renderer);
                        battler.SOUL.metadata.collision = false;
                        Promise.race([ controller.promise, leaper.position.modulate(renderer, 100, target) ]).then(() => {
                           battler.SOUL.metadata.collision = true;
                           renderer.detach('menu', leaper);
                           battler.SOUL.objects[0].alpha.value = 1;
                           battler.SOUL.position.set(target);
                        });
                     }
                  });
                  battler.bullets.attach(displayline);
                  detachers.push(() => battler.bullets.detach(displayline));
                  await renderer.pause(400);
                  if (!controller.active) {
                     return;
                  }
                  battler.bullets.detach(displayline);
                  battler.box.size.x = 65;
                  if (battler.SOUL.position.x < 160) {
                     battler.box.position.x = 160 - 3 - 65 / 2;
                  } else {
                     battler.box.position.x = 160 + 3 + 65 / 2;
                  }
                  const fakesiz = new CosmosValue(65);
                  const fakebox = new CosmosRectangle({
                     stroke: 0xffffff,
                     fill: 0,
                     border: 2.5,
                     anchor: 0,
                     metadata: { dt: false, tt: 0 },
                     position: { x: 320 - battler.box.position.x, y: battler.box.position.y }
                  }).on('tick', async function () {
                     this.size.set(fakesiz.value + 2.5);
                     if (this.metadata.dt) {
                        switch (this.metadata.tt++) {
                           case 0:
                              dogtrigger.value!();
                              const shadowbox = new CosmosRectangle({
                                 stroke: 0xffffff,
                                 fill: 0,
                                 border: 2.5,
                                 anchor: 0,
                                 position: box
                              });
                              renderer.attach('menu', shadowbox);
                              detachers.push(() => renderer.detach('menu', shadowbox));
                              await Promise.all([
                                 shadowbox.scale.modulate(renderer, 500, 2),
                                 shadowbox.alpha.modulate(renderer, 500, 0)
                              ]);
                              renderer.detach('menu', shadowbox);
                              break;
                           case 1:
                              this.metadata.tt = 0;
                              break;
                        }
                     }
                  });
                  renderer.attach('menu', fakebox);
                  detachers.push(() => renderer.detach('menu', fakebox));
                  sf(sounds.boom.instance(renderer, 0.2)).rate.value = 1.6;
                  shake();
                  if (!controller.active) {
                     return;
                  }
                  const badside = side === (battler.SOUL.position.x < 160 ? 0 : 1);
                  if (badside) {
                     await Promise.race([
                        controller.promise,
                        Promise.all([
                           battler.box.size.modulate(renderer, 100, 8),
                           battler.box.position.modulate(renderer, 100, battler.SOUL)
                        ])
                     ]);
                     if (!controller.active) {
                        battler.box.size.task?.();
                        battler.box.position.task?.();
                        return;
                     }
                     if (dogtrigger.value) {
                        fakebox.metadata.dt = true;
                        await renderer.pause(200);
                        fakebox.metadata.dt = false;
                     } else {
                        battler.damage(5 + battler.bonus);
                        await renderer.pause(200);
                     }
                     await Promise.race([
                        controller.promise,
                        Promise.all([
                           battler.box.alpha.modulate(renderer, 150, 0),
                           battler.SOUL.alpha.modulate(renderer, 150, 0)
                        ])
                     ]);
                     battler.box.alpha.task?.();
                     battler.box.alpha.value = 1;
                     if (!controller.active) {
                        battler.SOUL.alpha.task?.();
                        battler.SOUL.alpha.value = 1;
                        return;
                     }
                     battler.box.size.set(65);
                     battler.box.position.set(fakebox);
                     renderer.detach('menu', fakebox);
                  } else {
                     await fakesiz.modulate(renderer, 100, 8);
                     if (!controller.active) {
                        return;
                     }
                     await renderer.pause(200);
                     if (!controller.active) {
                        return;
                     }
                     await fakebox.alpha.modulate(renderer, 150, 0);
                     if (!controller.active) {
                        return;
                     }
                  }
                  await Promise.race([
                     controller.promise,
                     Promise.all([
                        battler.box.position.modulate(renderer, 150, { x: 160 }),
                        battler.box.size.modulate(renderer, 150, { x: 120 })
                     ])
                  ]);
                  badside && (battler.SOUL.alpha.value = 1);
                  battler.box.size.task?.();
                  battler.box.position.task?.();
                  if (!controller.active) {
                     return;
                  }
                  await renderer.pause(500);
                  round++;
               }
            })();
            break;
         }
         // chaos buster
         case 3:
         case 5:
         case 8: {
            await brez(120, 65);
            const hardmode = turns === 8; // chaos blaster
            const rounds = hardmode ? 12 : 8;
            await Promise.all([
               battler.box.size.modulate(renderer, 150, { y: 120 }),
               battler.box.position.modulate(renderer, 150, { y: 120 })
            ]);
            const ex = 60 * Math.SQRT2 + 20;
            const center = battler.box.position.clone();
            const colorMatrix1 = new HslAdjustmentFilter();
            const ship = new CosmosSprite({
               rotation: 90,
               priority: 5,
               anchor: 0,
               frames: [ content.ibbBlastship ]
            }).on('tick', function () {
               this.position.set(center.endpoint(Math.round(this.rotation.value), ex));
               colorMatrix1.hue = (this.rotation.value + 360) % 360;
               const qs = quickshadow(this, this);
               qs.priority.value = 0;
               controller.promise.then(() => renderer.detach('menu', qs));
            });
            renderer.attach('menu', ship);
            turnPromise = (async () => {
               const detachers = [] as (() => void)[];
               controller.promise.then(() => {
                  renderer.detach('menu', ship);
                  for (const d of detachers) {
                     d();
                  }
               });
               let round = 0;
               while (controller.active && round++ < rounds) {
                  const rad = rand_rad(rng.attack.next());
                  const direction = Math.round(battler.SOUL.position.angleTo(center) + rad.next() * 20 - 10);
                  while (ship.rotation.value > direction + 180) {
                     ship.rotation.value -= 360;
                  }
                  while (ship.rotation.value < direction - 180) {
                     ship.rotation.value += 360;
                  }
                  const unit = CosmosMath.ORIGIN.endpoint(direction, 1);
                  const asteroid = new CosmosAnimation({
                     alpha: 0,
                     anchor: 0,
                     resources: content.ibbAsteroid,
                     index: Math.floor(Math.random() * 4),
                     rotation: Math.random() * 360,
                     position: center.add(unit.multiply(ex * -3)),
                     priority: 4
                  }).on('tick', function () {
                     const qs = quickshadow(this, this);
                     qs.priority.value = 3;
                     detachers.push(() => renderer.detach('menu', qs));
                  });
                  renderer.attach('menu', asteroid);
                  detachers.push(() => renderer.detach('menu', asteroid));
                  asteroid.alpha.modulate(renderer, 500, 1);
                  asteroid.spin.modulate(renderer, 500, Math.random() < 0.5 ? -3 : 3);
                  asteroid.position.modulate(renderer, hardmode ? 800 : 1500, center.add(unit.multiply(-ex)));
                  sf(sounds.appear.instance(renderer));
                  renderer.pause(hardmode ? 100 : 300).then(async () => {
                     if (!controller.active) {
                        return;
                     }
                     await ship.rotation.modulate(renderer, hardmode ? 300 : 600, direction, direction, direction);
                     if (!controller.active) {
                        return;
                     }
                     ship.area = renderer.area;
                     ship.filters = [ colorMatrix1 ];
                     const warner = new CosmosRectangle({
                        alpha: 0,
                        anchor: { x: 1, y: 0 },
                        rotation: direction,
                        position: ship,
                        size: { y: 1 },
                        fill: 0xffffff
                     }).on('tick', function () {
                        this.size.x = ship.position.extentOf(asteroid);
                        if (this.alpha.value === 0) {
                           this.alpha.value = 0.3;
                           ship.tint = 0x00ffff;
                           sf(sounds.target.instance(renderer));
                        } else {
                           this.alpha.value = 0;
                           ship.tint = 0xff0000;
                        }
                     });
                     renderer.attach('menu', warner);
                     detachers.push(() => renderer.detach('menu', warner));
                     await renderer.pause(hardmode ? 200 : 400);
                     if (!controller.active) {
                        return;
                     }
                     renderer.detach('menu', warner);
                     ship.area = null;
                     ship.filters = null;
                     ship.tint = void 0;
                     const colorMatrix2 = new HslAdjustmentFilter();
                     const shipshad = new CosmosSprite({
                        area: renderer.area,
                        anchor: 0,
                        priority: 6,
                        frames: [ content.ibbBlastship ],
                        rotation: ship.rotation.value,
                        metadata: { hue: ship.rotation.value },
                        position: ship,
                        tint: 0xff8080,
                        filters: [ colorMatrix2 ]
                     }).on('tick', function () {
                        colorMatrix2.hue = this.metadata.hue % 360;
                        this.metadata.hue += 12;
                     });
                     renderer.attach('menu', shipshad);
                     detachers.push(() => renderer.detach('menu', shipshad));
                     Promise.all([
                        shipshad.alpha.modulate(renderer, 1000, 0),
                        shipshad.scale.modulate(renderer, 1000, 2)
                     ]).then(() => {
                        if (!controller.active) {
                           return;
                        }
                        renderer.detach('menu', shipshad);
                     });
                     const time = renderer.time;
                     const scax = new CosmosValue(1);
                     const colorMatrix3 = new HslAdjustmentFilter();
                     const rect = new CosmosRectangle({
                        area: renderer.area,
                        anchor: { x: 0 },
                        fill: 0xff8080,
                        size: { x: 8, y: 1000 },
                        metadata: { hue: ship.rotation.value },
                        filters: [ colorMatrix3 ]
                     }).on('tick', function () {
                        colorMatrix3.hue = this.metadata.hue % 360;
                        this.metadata.hue += 24;
                     });
                     const bullet = new CosmosHitbox({
                        anchor: { x: 0 },
                        position: ship,
                        rotation: direction + 90,
                        size: { x: 1, y: 1000 },
                        metadata: {
                           bullet: true,
                           damage: 7,
                           doggerDetach: void 0 as (() => void) | void,
                           doggerTrigger: async () => {
                              asteroid.velocity.set(0);
                              asteroid.velocity.task?.();
                              asteroid.spin.set(0);
                              asteroid.spin.task?.();
                              await Promise.all([
                                 bullet.alpha.modulate(renderer, 500, 0),
                                 bullet.scale.modulate(renderer, 500, 2),
                                 asteroid.alpha.modulate(renderer, 500, 0),
                                 asteroid.scale.modulate(renderer, 500, 2)
                              ]);
                           }
                        },
                        objects: [ rect ]
                     }).on('tick', function () {
                        rect.alpha.value = scax.value;
                        const multiplier =
                           scax.value + CosmosMath.wave(((renderer.time - time) % 200) / 200) * (24 / 20 - 1);
                        this.size.x = 6 * multiplier;
                        rect.scale.x = multiplier;
                     });
                     const bulletDetach = () => renderer.detach('menu', bullet);
                     bullet.metadata.doggerDetach = bulletDetach;
                     detachers.push(bulletDetach);
                     renderer.attach('menu', bullet);
                     sf(sounds.specout.instance(renderer));
                     sf(
                        new CosmosDaemon(content.avAsriel3, {
                           context,
                           gain: 0.75,
                           rate: 1.2,
                           router: soundRouter
                        }).instance(renderer)
                     );
                     shake(2, 1000);
                     await renderer.pause(200);
                     if (!controller.active) {
                        return;
                     }
                     renderer.detach('menu', asteroid);
                     let i = 0;
                     const baserot = Math.random() * 360;
                     const subastcount = 8;
                     while (i < subastcount) {
                        const ang = Math.round(baserot + (i / subastcount) * 360);
                        const { bullet, detach } = bulletSetup(
                           new CosmosHitbox({
                              size: 6,
                              anchor: 0,
                              position: asteroid.position.endpoint(ang, 2 + rad.next() * 2),
                              velocity: CosmosMath.ray(ang, 3 + rad.next() * (hardmode ? 2.25 : 2.75)),
                              spin: asteroid.spin.value + rad.next() * 2 - 1,
                              priority: 2,
                              metadata: {
                                 bullet: true,
                                 damage: 7,
                                 doggerDetach: void 0 as (() => void) | void
                              },
                              objects: [
                                 new CosmosAnimation({
                                    resources: content.ibbAsteroidfragment,
                                    anchor: 0,
                                    index: asteroid.index * 2 + (i % 2)
                                 })
                              ]
                           }).on('tick', function () {
                              screenCheck(this, 10) && detach();
                           }),
                           true
                        );
                        detachers.push(detach);
                        bullet.metadata.doggerDetach = detach;
                        i++;
                     }
                     sf(sounds.boom.instance(renderer, 0.2)).rate.value = 1.6;
                     bullet.size.y = 0;
                     await scax.modulate(renderer, 300, 0);
                     if (!controller.active) {
                        return;
                     }
                     bulletDetach();
                  });
                  await renderer.pause(hardmode ? 1000 : 1500);
               }
               await renderer.pause(1000);
            })();
            break;
         }
         // hyper goner *can't allow gameover*
         case 12: {
            await brez(120, 65);

            // vars
            const max = 2;
            const sca = 4;
            const spd = new CosmosValue();

            // hyper goner sfx
            const attackTime = 12000;
            const sfx = sounds.goner_charge.instance(renderer);
            sfx.rate.value = 9700 / attackTime;

            // setup 3d environment
            const shads = [] as CosmosSprite[];
            const backdrop = new CosmosObject({ priority: -2 });
            const colormat = new HslAdjustmentFilter();
            const graphics = new Graphics();
            const hitboxes = [] as CosmosSprite[];
            const hyperbox = new CosmosObject({
               alpha: 0,
               area: renderer.area,
               position: { x: 160, y: 120 },
               metadata: { b: true, hue: 0, time: 0, ticks: 0 },
               filters: [ battler.clipFilter!, colormat ],
               objects: [
                  backdrop,
                  new CosmosSprite({
                     anchor: 0,
                     priority: -1,
                     frames: [ content.ibbHypergrid ],
                     blend: BLEND_MODES.MULTIPLY
                  })
               ]
            }).on('tick', function () {
               // draw background
               graphics.clear();
               let rPhase = ((this.metadata.time / 30) % 1) / 9;
               while (rPhase < 1) {
                  const w = 325 ** rPhase;
                  const h = w * 0.75;
                  graphics.lineStyle({ alpha: rPhase, color: 0xff0000, width: 1 }).drawRect(w / -2, h / -2, w, h);
                  rPhase += 1 / 9;
               }

               // attempt to spawn bullet
               if (max / spd.value <= ++this.metadata.ticks) {
                  this.metadata.ticks -= max / spd.value;
                  const bullet = new CosmosSprite({
                     area: renderer.area,
                     alpha: 0,
                     anchor: 0,
                     filters: [ battler.clipFilter! ],
                     metadata: {
                        time: 0,
                        x: 320 * (rng.attack.next() - 0.5),
                        y: 240 * (rng.attack.next() - 0.5)
                     },
                     spin: rng.attack.next() < 0.5 ? -3 : 3,
                     frames: [ content.ibbStardrop ]
                  });
                  hitboxes.push(bullet);
                  renderer.attach('menu', bullet);
                  bullet.alpha.modulate(renderer, 500, 1);
               }

               // tick all bullets
               for (const bullet of hitboxes.slice()) {
                  const bPhase = bullet.metadata.time / 60;
                  if (1 <= bPhase && (bullet.alpha.value /= 1.25) < 0.01) {
                     hitboxes.splice(hitboxes.indexOf(bullet), 1);
                     renderer.detach('menu', bullet);
                  } else {
                     const scale = sca ** bPhase * (1 / sca);
                     bullet.metadata.time += spd.value;
                     bullet.position.set(160 + bullet.metadata.x * scale, 120 + bullet.metadata.y * scale);
                     bullet.priority.value = scale + 999;
                     bullet.scale.set(scale);
                  }
               }

               // spawn soul shadow
               let sPhase = 1;
               const bspos = battler.SOUL.position.subtract(160, 120);
               const shad = quickshadow(
                  battler.SOUL.objects[0] as CosmosSprite,
                  battler.SOUL,
                  'menu',
                  spd.value / max,
                  1.25,
                  0.01
               );
               shads.push(shad);
               shad.on('tick', function () {
                  sPhase += spd.value / 30;
                  shad.scale.set(sca ** sPhase * (1 / sca) * 0.5);
                  shad.priority.value = battler.SOUL.priority.value + sPhase;
                  shad.position.set(
                     bspos.x < 0 ? 160 - (-bspos.x) ** sPhase : 160 + bspos.x ** sPhase,
                     bspos.y < 0 ? 120 - (-bspos.y) ** sPhase : 120 + bspos.y ** sPhase
                  );
               });

               // advance time
               colormat.hue = this.metadata.hue % 360;
               this.metadata.hue += 12;
               this.metadata.time += spd.value;
            });

            backdrop.container.addChild(
               new Graphics()
                  .lineStyle({ alpha: 1, color: 0xff0000, width: 1 })
                  .moveTo(-160, 0)
                  .lineTo(160, 0)
                  .moveTo(-160, -120)
                  .lineTo(160, 120)
                  .moveTo(0, -120)
                  .lineTo(0, 120)
                  .moveTo(160, -120)
                  .lineTo(-160, 120)
                  .closePath(),
               graphics
            );

            // start the sequence
            renderer.attach('menu', hyperbox);
            hyperbox.alpha.modulate(renderer, 1000, 1);
            spd.modulate(renderer, attackTime / 2, max, max);
            battler.box.size.modulate(renderer, 1000, { x: 325, y: 245 });
            battler.box.position.modulate(renderer, 1000, { x: 160, y: 120 });

            // set turn promise
            turnPromise = renderer.pause(attackTime - 3000).then(async () => {
               const fd = fader({ fill: 0xffffff, priority: 2000 });
               renderer.pause(1500).then(() => {
                  hyperbox.metadata.b = false;
               });
               await fd.alpha.modulate(renderer, 3000, 1);
               renderer.detach('menu', hyperbox);
               await renderer.pause(1000);
               renderer.detach('menu', ...hitboxes, ...shads);
               battler.box.size.task?.();
               battler.box.size.set(120, 65);
               battler.box.position.task?.();
               battler.box.position.set(160, 160);
               battler.SOUL.position.set(160, 160);
               speech.emoters.asriel.metadata.alpha = 1;
               sounds.upgrade.instance(renderer);
               fd.alpha.modulate(renderer, 500, 0).then(() => renderer.detach('menu', fd));
            });
            break;
         }
         // survival section
         case 13: {
            sf(sounds.cast.instance(renderer));
            speech.emoters.asriel.metadata.armRotate();
            await renderer.pause(800);
            let done = false;
            const detachers = [] as (() => void)[];
            const rand = rand_rad(rng.attack.next());
            renderer.pause(ultimatime).then(() => {
               if (controller.active) {
                  done = true;
               }
            });
            renderer.pause(ultimatime + 200).then(() => {
               if (controller.active) {
                  speech.emoters.asriel.metadata.armUnrotate();
               }
            });
            controller.promise.then(() => {
               if (SAVE.data.n.hp <= 0) {
                  for (const d of detachers) {
                     d();
                  }
               }
            });
            (async () => {
               let i = rand.int(9) * 2;
               const posi = [ 0.05, 0.075, 0.1, 0.45, 0.5, 0.55, 0.9, 0.925, 0.95 ];
               const rate = 1 / 50;
               const size = 9;
               const wake = 12;
               const wdiv = 5;
               const step = rate / wdiv;
               while (controller.active && renderer.alpha.value > 0 && !done) {
                  const side = rand.next() < 0.5 ? 0 : 1;
                  const a1 = [ 180, 0 ][side];
                  const a2 = [ -10, 190 ][side];
                  const ex = (posi[i % 9] + (rand.next() * 0.1 - 0.05)) * 3.5 - 0.25;
                  const angleGen = (v: number) => Math.round(CosmosMath.bezier(v, a1, a2, a2));
                  const extentGen = (v: number) => ex + CosmosMath.bezier(v, 4, 3, 15);
                  const graphics = new Graphics();
                  const cmf = new HslAdjustmentFilter();
                  const position = { x: [ 85, 235 ][side], y: 20 };
                  const { bullet, detach } = bulletSetup(
                     new CosmosHitbox({
                        anchor: { x: -0.75, y: 0 },
                        area: renderer.area,
                        filters: [ cmf ],
                        metadata: {
                           hue: 0,
                           tick: 0,
                           damage: ultimadamage,
                           bullet: true,
                           doggerDetach: void 0 as (() => void) | void
                        },
                        position,
                        scale: 1 / 2,
                        size: { x: 36, y: 15 },
                        objects: [
                           new CosmosSprite({
                              active: true,
                              anchor: { x: -0.75, y: 0 },
                              frames: [ content.ibbUltima ],
                              tint: 0xffb0b0
                           })
                        ]
                     }).on('tick', function () {
                        const tick = this.metadata.tick++;
                        graphics.clear();
                        if (tick < 4 * 30) {
                           let i = 0;
                           let b = new CosmosPoint();
                           let value = Math.min(tick * rate, 1.5);
                           const total = Math.min(tick, wake);
                           const rotation = angleGen(value);
                           this.position.set(this.position.endpoint(rotation, extentGen(value)));
                           this.rotation.value = rotation;
                           graphics.angle = -this.rotation.value;
                           graphics.beginFill(0xffb0b0, 1);
                           while (i < total) {
                              let j = 0;
                              const angle = angleGen(value) + 180;
                              const extent = extentGen(value) / wdiv;
                              const radius = size * (1 - i / total);
                              while (j < wdiv) {
                                 graphics.drawRect(
                                    b.x / this.scale.x - radius / 2,
                                    b.y / this.scale.y - radius / 2,
                                    radius,
                                    radius
                                 );
                                 b = b.endpoint(angle, extent);
                                 value -= step;
                                 j++;
                              }
                              i++;
                           }
                           graphics.endFill();
                           cmf.hue = this.metadata.hue % 360;
                           this.metadata.hue += 12;
                        } else {
                           detach();
                        }
                     }),
                     true,
                     null
                  );
                  bullet.container.addChild(graphics);
                  bullet.metadata.doggerDetach = detach;
                  detachers.push(detach);
                  if (i % 2 === 0) {
                     const spawn = new CosmosSprite({
                        anchor: 0,
                        frames: [ content.ibbBeamcircle ],
                        scale: 2,
                        position
                     });
                     renderer.attach('menu', spawn);
                     detachers.push(() => renderer.detach('menu', spawn));
                     Promise.all([ spawn.alpha.modulate(renderer, 500, 0), spawn.scale.modulate(renderer, 500, 4) ]).then(
                        () => {
                           renderer.detach('menu', spawn);
                        }
                     );
                     sf(sounds.sega.instance(renderer)).gain.value *= renderer.alpha.value;
                  }
                  await renderer.pause(83 + ultimadelay * CosmosMath.FRAME_2);
                  i++;
               }
            })();
            turnPromise = renderer.pause(ultimatime + 2000);
            tt = false;
            break;
         }
         case 14:
            await fireAttack(
               0,
               false,
               [],
               {
                  get b () {
                     return controller.active;
                  }
               },
               void 0,
               void 0,
               true
            );
            turnPromise = renderer.pause(4000);
            tt = false;
            break;
         case 15: {
            await standardSize({ x: 36, y: 65 }, true);
            await Promise.all([
               battler.box.size.modulate(renderer, 150, { y: 36 }),
               battler.box.position.modulate(renderer, 150, { x: 160, y: 192.5 - 36 / 2 })
            ]);
            game.movement = true;
            let ps = 0;
            (async () => {
               while (ps < 6) {
                  const psfx = sounds.cast.instance(renderer);
                  psfx.gain.value = psfx.daemon.gain + ps / 8;
                  psfx.rate.value = 0.5 + ps / 6;
                  await renderer.pause(150);
                  ++ps < 6 && psfx.stop();
               }
            })();
            const [ arm1, arm2 ] = speech.emoters.asriel.metadata.armRotate(true) as CosmosAnimation[];
            const sh = new CosmosValue();
            const shakeTicker1 = function (this: CosmosObject) {
               this.offsets[0].set(sh.value * (Math.random() * 2 - 1), sh.value * (Math.random() * 2 - 1));
            };
            const shakeTicker2 = function (this: CosmosObject) {
               this.offsets[0].set(sh.value * (Math.random() - 0.5), sh.value * (Math.random() - 0.5));
            };
            arm1.on('tick', shakeTicker1);
            arm2.on('tick', shakeTicker1);
            speech.emoters.asriel.objects[1].on('tick', shakeTicker2);
            const endY = 130;
            const pos1 = arm1.position.add(160, 120);
            const graphics1 = new Graphics();
            const ext1 = pos1.extentOf(160, endY);
            const pos2 = arm2.position.add(160, 120);
            const graphics2 = new Graphics();
            const ext2 = pos2.extentOf(160, endY);
            const angles = CosmosUtils.populate(12, i => CosmosMath.ray(i * (360 / 12), 1));
            const graphicsTicker1 = function (graphics: Graphics, radi: number) {
               let side = 0;
               graphics.clear().lineStyle({ alpha: 1, color: 0xffffff, width: 1 });
               while (side < 12) {
                  const pos1 = new CosmosPoint(radi / 2).multiply(angles[side]);
                  const pos2 = new CosmosPoint(radi / 2).multiply(angles[(side + 1) % angles.length]);
                  graphics.moveTo(pos1.x, pos1.y).lineTo(pos2.x, pos2.y);
                  side++;
               }
               graphics.closePath();
               graphics.scale.set(40 / radi);
            };
            const ball1 = new CosmosSprite({
               alpha: 0,
               anchor: 0,
               frames: [ content.ibbBeamcircle ],
               metadata: { siner: 0, rader: 0 }
            }).on('tick', function () {
               this.metadata.rader < 60 && (this.metadata.rader += 1.5);
               const raderx = this.metadata.rader + (Math.sin(this.metadata.siner++ / 2) * this.metadata.rader) / 8;
               ball1.position.set(pos1.endpoint(Math.round(arm1.rotation.value + 90), ext1));
               ball2.position.set(pos2.endpoint(Math.round(arm2.rotation.value + 90), ext2));
               ball1.scale.set(raderx / 40);
               ball2.scale.set(raderx / 40);
               graphicsTicker1(graphics1, raderx);
               graphicsTicker1(graphics2, raderx);
            });
            const ball2 = new CosmosSprite({ alpha: 0, anchor: 0, frames: [ content.ibbBeamcircle ] });
            ball1.container.addChild(graphics1);
            ball2.container.addChild(graphics2);
            renderer.attach('menu', ball1, ball2);
            ball1.alpha.modulate(renderer, 600, 1);
            ball2.alpha.modulate(renderer, 600, 1);
            await sh.modulate(renderer, 1250, 2);
            sh.value = 0;
            await Promise.all([
               arm1.rotation.modulate(renderer, 200, pos1.angleTo(160, endY) - 90),
               arm2.rotation.modulate(renderer, 200, pos2.angleTo(160, endY) - 90)
            ]);
            sh.value = 1;
            renderer.detach('menu', ball1, ball2);
            // true scale multiplier
            const tsm = new CosmosValue();
            const graphics3 = new Graphics();
            graphics3.alpha = 0.6;
            const graphics4 = new Graphics();
            graphics4.alpha = 0.6;
            const graphics5 = new Graphics();
            graphics5.alpha = 0.6;
            const texture = new Texture(content.ibbBeamstrip.value);
            const graphicsTicker2 = function (graphics: Graphics, multi: number, radi: number) {
               graphics.clear();
               if (multi > 0) {
                  const pos = CosmosMath.ray(multi * (35 + tsm.value * 20 + radi * (2 + tsm.value / 2)), 1000);
                  graphics.beginTextureFill({ texture }).drawPolygon(0, 0, -pos.y, pos.x, pos.y, pos.x).endFill();
               }
            };
            const cmf = new HslAdjustmentFilter();
            const alf = new AlphaFilter(0.6);
            const alv = new CosmosValue(0);
            const ball3 = new CosmosSprite({
               area: renderer.area!,
               anchor: 0,
               frames: [ content.ibbBeamcircle ],
               filters: [ cmf, alf ],
               position: { x: 160, y: endY },
               metadata: { hue: 0, siner: 0 },
               priority: 2000,
               tint: 0xff0000
            }).on('tick', function () {
               const siner = this.metadata.siner++ / 2;
               const rader = Math.sin(siner) / 2 + 0.5;
               const min = 60 / -8;
               const max = 60 / 8;
               const raderx = 60 + CosmosMath.remap(rader, min, max * tsm.value);
               const radery = 60 + CosmosMath.remap(rader, min - 2, max * (5 + tsm.value * 1.5));
               const raderz = 60 + CosmosMath.remap(rader, min - 4, max * (10 + tsm.value * 2));
               ball3.scale.set(alv.value * (raderx / 20));
               ball4.scale.set(alv.value * (radery / 20));
               ball5.scale.set(alv.value * (raderz / 20));
               graphicsTicker2(graphics3, alv.value, Math.sin(siner / 1.5));
               graphicsTicker2(graphics4, alv.value, Math.sin(siner / 1.5 + Math.PI * (1 / 3)));
               graphicsTicker2(graphics5, alv.value, Math.sin(siner / 1.5 + Math.PI * (4 / 3)));
               cmf.hue = this.metadata.hue % 360;
               this.metadata.hue += 24;
            });
            const ball4 = new CosmosSprite({
               area: renderer.area!,
               anchor: 0,
               frames: [ content.ibbBeamcircle ],
               filters: [ cmf, alf ],
               position: { x: 160, y: endY },
               priority: 2001,
               tint: 0xff0000
            });
            const ball5 = new CosmosSprite({
               area: renderer.area!,
               anchor: 0,
               frames: [ content.ibbBeamcircle ],
               filters: [ cmf, alf ],
               position: { x: 160, y: endY },
               priority: 2002,
               tint: 0xff0000
            });
            ball3.container.addChild(graphics3);
            ball4.container.addChild(graphics4);
            ball5.container.addChild(graphics5);
            renderer.attach('menu', ball3, ball4, ball5);
            speech.emoters.asriel.index = 14;
            alv.modulate(renderer, 200, 1);
            const hit = (hp: string | number) => {
               if (typeof hp === 'number') {
                  SAVE.data.n.hp = hp;
               } else {
                  battler.fakehp = hp;
               }
               sounds.hurt.instance(renderer);
               shake();
            };
            hit(1);
            (battler.SOUL.objects[0] as CosmosSprite).enable();
            const beamsfx = sounds.rainbowbeam.instance(renderer);
            beamsfx.source!.loopStart = (60 / 522) * 5 + 60 / 522 / 48;
            beamsfx.source!.loopEnd = (60 / 522) * 12;
            await renderer.pause(1500);
            hit(1);
            await renderer.pause(1500);
            hit('00.90');
            await renderer.pause(1000);
            tsm.modulate(renderer, 200, 1);
            beamsfx.gain.modulate(renderer, 200, beamsfx.daemon.gain * 1.1);
            beamsfx.rate.modulate(renderer, 200, beamsfx.daemon.rate * 1.1);
            const buttonList = battler.buttons.slice(0, 3);
            for (const button of buttonList) {
               button.on('tick', shakeTicker1);
            }
            dialogue(true, ...text.b_opponent_asriel.cryTalk1);
            await renderer.pause(500);
            hit('00.50');
            await renderer.pause(1500);
            hit('00.10');
            await renderer.pause(1500);
            hit('00.01');
            await renderer.pause(1500);
            hit('00.001');
            tsm.modulate(renderer, 200, 2);
            beamsfx.gain.modulate(renderer, 200, beamsfx.daemon.gain * 1.2);
            beamsfx.rate.modulate(renderer, 200, beamsfx.daemon.rate * 1.2);
            for (const [ index, button ] of buttonList.entries()) {
               button.off('tick', shakeTicker1);
               button.offsets[0].set(0);
               button.anchor.set(0);
               button.position.set(button.position.add(button.compute().divide(4)));
               button.velocity.x = [ -1, 1 ][index % 2];
               button.velocity.y = -2;
               button.gravity.y = 0.35;
            }
            dialogue(true, ...text.b_opponent_asriel.cryTalk2);
            await renderer.pause(1500);
            hit('00.0001');
            await renderer.pause(1500);
            hit('00.000001');
            await renderer.pause(1500);
            hit('00.0000000001');
            await renderer.pause(1000);
            await Promise.all([
               sh.modulate(renderer, 500, 1, 0),
               alv.modulate(renderer, 500, 1, 0),
               beamsfx.gain.modulate(renderer, 500, 0)
            ]);
            beamsfx.stop();
            (battler.SOUL.objects[0] as CosmosSprite).reset();
            speech.emoters.asriel.index = 11;
            renderer.detach('menu', ball3, ball4, ball5);
            arm1.off('tick', shakeTicker1);
            arm2.off('tick', shakeTicker1);
            speech.emoters.asriel.objects[1].off('tick', shakeTicker2);
            arm1.offsets[0].set(0);
            arm2.offsets[0].set(0);
            speech.emoters.asriel.objects[1].offsets[0].set(0);
            await Promise.all([
               arm1.rotation.modulate(renderer, 500, 0, 0),
               arm2.rotation.modulate(renderer, 500, 0, 0)
            ]);
            battler.SOUL.alpha.value = 0;
            await Promise.all([
               battler.box.size.modulate(renderer, 150, { y: 65 }),
               battler.box.position.modulate(renderer, 150, { x: 160, y: 192.5 - 65 / 2 })
            ]);
            battler.hpboost.reset();
            break;
         }
         case 16: {
            const vars = {
               get b () {
                  return controller.active;
               },
               shield: 'up'
            };
            const lighter = new CosmosAnimation({
               alpha: 0.1,
               resources: content.ibbBluelightning,
               position: { x: 160, y: 120 },
               anchor: 0,
               active: true,
               priority: -4139
            });
            const special: Parameters<typeof undSpear>[4] = {
               circular: false,
               cage: undCageSpecial,
               x: 0,
               p: controller.promise,
               l: lighter,
               dogtrigger,
               vars
            };
            const specx = (bwsp = rng.attack.next()) => {
               special.x = box.x1 + box.sx * bwsp;
               return special;
            };
            const spd = 2 <= SAVE.flag.n.genocide_milestone ? 1.25 : 1;
            turnPromise = undSequenceSpecial(
               async (spawn, pause, promises) => {
                  battler.bullets.attach(lighter);
                  if (6 <= SAVE.flag.n.genocide_milestone) {
                     if (battler.pattern('lostsoul_a', [ true, false ])) {
                        promises.push(pt.ringflash(0.1, 0.5, 4400, { spd, dm: 4, pr: 1 }, controller));
                        spawn('blue', 'up', 3, 4, specx(0.5));
                        await pause(600);
                        spawn('blue', 'down', 3, 4, specx(0.2));
                        await pause(600);
                        spawn('blue', 'up', 3, 4, specx(0.5));
                        await pause(600);
                        spawn('blue', 'down', 3, 4, specx(0.8));
                        await pause(3000);
                        promises.push(pt.diamond(0.1, 0.5, { spd, dm: 4 }, controller));
                        await pause(400);
                        promises.push(pt.fadeline(0, 600, { spd, dm: 4, pr: 1 }, controller));
                        spawn('purple', 'up', 3, 4, specx(0.2));
                        await pause(600);
                        promises.push(pt.fadeline(2, 600, { spd, dm: 4, pr: 1 }, controller));
                        spawn('purple', 'down', 3, 4, specx(0.4));
                        await pause(600);
                        promises.push(pt.fadeline(0, 600, { spd, dm: 4, pr: 1 }, controller));
                        spawn('purple', 'up', 3, 4, specx(0.6));
                        await pause(600);
                        promises.push(pt.fadeline(2, 600, { spd, dm: 4, pr: 1 }, controller));
                        spawn('purple', 'down', 3, 4, specx(0.8));
                     } else {
                        promises.push(pt.ringflash(0.9, 0.5, 5800, { spd, dm: 4, pr: 1 }, controller));
                        spawn('green', 'up', 3, 4, specx(0.2));
                        spawn('blue', 'down', 3, 4, specx(0.5));
                        await pause(1200);
                        spawn('blue', 'up', 3, 4, specx(0.5));
                        spawn('green', 'down', 3, 4, specx(0.8));
                        await pause(1200);
                        spawn('green', 'up', 3, 4, specx(0.8));
                        spawn('blue', 'down', 3, 4, specx(0.2));
                        await pause(3000);
                        promises.push(pt.ringflash(0.1, 0.5, 2000, { spd, dm: 4, pr: 1 }, controller));
                        await pause(1500);
                        promises.push(pt.ringflash(0.9, 0.5, 2000, { spd, dm: 4, pr: 1 }, controller));
                        await pause(2300);
                        promises.push(pt.diamond(0.9, 0.5, { spd, dm: 4 }, controller));
                        await pause(400);
                        promises.push(pt.fadeline(2, 600, { spd, dm: 4, pr: 1 }, controller));
                        await pause(500);
                        spawn('blue', 'up', 3, 4, specx(0.5));
                        await pause(1000);
                        promises.push(pt.fadeline(2, 600, { spd, dm: 4, pr: 1 }, controller));
                        await pause(500);
                        spawn('blue', 'down', 3, 4, specx(0.5));
                        await pause(1000);
                        promises.push(pt.fadeline(2, 600, { spd, dm: 4, pr: 1 }, controller));
                        await pause(500);
                        spawn('blue', 'up', 3, 4, specx(0.5));
                        await pause(1000);
                        promises.push(pt.fadeline(2, 600, { spd, dm: 4, pr: 1 }, controller));
                        await pause(500);
                        spawn('blue', 'down', 3, 4, specx(0.5));
                     }
                  } else if (battler.pattern('lostsoul_a', [ true, false ])) {
                     spawn('blue', 'up', 3, 4, specx(0.5));
                     await pause(1200);
                     spawn('blue', 'up', 3, 4, specx(0.2));
                     await pause(1200);
                     promises.push(easyLightning(controller, 1, spd));
                     await pause(600);
                     spawn('blue', 'up', 3, 4, specx(0.8));
                     await pause(1200);
                     spawn('blue', 'up', 3, 4, specx(0.5));
                     await pause(600);
                     spawn('blue', 'down', 3, 4, specx(0.5));
                     await pause(1200);
                     spawn('blue', 'down', 3, 4, specx(0.8));
                     await pause(1200);
                     promises.push(easyLightning(controller, 0, spd));
                  } else {
                     spawn('blue', 'up', 3, 4, specx(0.2));
                     await pause(600);
                     spawn('purple', 'up', 3, 4, specx(0.8));
                     await pause(800);
                     promises.push(easyLightning(controller, 1, spd));
                     await pause(600);
                     spawn('blue', 'down', 3, 4, specx(0.8));
                     await pause(1000);
                     spawn('blue', 'down', 3, 4, specx(0.8));
                     await pause(1200);
                     promises.push(easyLightning(controller, 0, spd));
                     await pause(600);
                     spawn('blue', 'up', 3, 4, specx(0.2));
                     await pause(600);
                     spawn('blue', 'down', 3, 4, specx(0.2));
                     await pause(1200);
                     spawn('blue', 'down', 3, 4, specx(0.5));
                     await pause(600);
                     spawn('blue', 'up', 3, 4, specx(0.5));
                  }
               },
               vars,
               fader({ anchor: 0, position: { x: 160, y: 120 }, priority: 0.1, size: 1000 }),
               async e => {
                  if (hy.active) {
                     battler.bullets.detach(lighter);
                     await e();
                  } else {
                     controller.active && (await controller.promise);
                     battler.bullets.detach(lighter);
                     await e(true);
                  }
               },
               spd
            );
            break;
         }
         case 17: {
            await brez(125, 65);
            const sp = 1 <= SAVE.flag.n.killed_sans ? 1.25 : 1;
            const pausex = (time: number) =>
               controller.active ? Promise.race([ controller.promise, renderer.pause(time / sp) ]) : void 0;
            const state = {
               get d () {
                  return !controller.active;
               }
            };
            turnPromise = papPattern(
               state,
               async factory => {
                  if (1 <= SAVE.flag.n.genocide_milestone) {
                     if (battler.pattern('lostsoul_b', [ true, false ])) {
                        let index = 0;
                        while (index < 4) {
                           await pausex(index === 0 ? 600 : 900);
                           factory(0, 15, 2.5);
                           await pausex(400);
                           factory(0, 15, 2.5);
                           await pausex(400);
                           factory(0, 15, 2.5);
                           await pausex(400);
                           factory(0, 15, 2.5);
                           await pausex(300);
                           papBlaster(
                              state,
                              { x: 160 - 95, y: -30 },
                              45,
                              { x: 160 - 95, y: 170 },
                              -90,
                              { x: 1, y: 1.5 },
                              500,
                              150,
                              false,
                              4,
                              sp
                           );
                           index++;
                        }
                        await pausex(1000);
                        papBlaster(state, { x: 85, y: -30 }, 90, { x: 85, y: 80 }, -45, { x: 1, y: 1.5 }, 500, 150);
                        await papBlaster(
                           state,
                           { x: 235, y: -30 },
                           -90,
                           { x: 235, y: 80 },
                           45,
                           { x: 1, y: 1.5 },
                           500,
                           150,
                           false,
                           4,
                           sp
                        );
                     } else {
                        await pausex(600);
                        let y = box.y1;
                        (async () => {
                           while (!state.d) {
                              papBlaster(
                                 state,
                                 { x: 160 + 95, y: -30 },
                                 -45,
                                 { x: 160 + 95, y },
                                 90,
                                 { x: 1, y: 1.5 },
                                 500,
                                 150,
                                 false,
                                 4,
                                 sp
                              );
                              await pausex(500);
                           }
                        })();
                        (async () => {
                           while (!state.d) {
                              await renderer.when(() => state.d || battler.SOUL.position.y < 188);
                              await renderer.when(() => state.d || 188 <= battler.SOUL.position.y);
                              y += box.sy / 40;
                           }
                        })();
                        let index = 0;
                        while (index < 7) {
                           let subindex = 0;
                           const subtotal = [ 0, 2, 1, 2, 0, 2, 1 ][index++];
                           while (subindex++ < subtotal + 2) {
                              await pausex(450);
                              factory(0, [ 35, 25, 15 ][subtotal], 2.5);
                           }
                           if (index < 7) {
                              await pausex(450);
                           }
                        }
                     }
                  } else if (battler.pattern('lostsoul_b', [ true, false ])) {
                     await pausex(600);
                     factory(0, 15, 3);
                     factory(0, -55, 3);
                     factory(0, 15, -3);
                     factory(0, -55, -3);
                     await pausex(1000);
                     factory(0, 15, 3);
                     factory(0, -55, 3);
                     factory(0, 15, -3);
                     factory(0, -55, -3);
                     await pausex(1000);
                     factory(0, 15, 4);
                     await pausex(133);
                     factory(0, 25, 4);
                     await pausex(133);
                     factory(0, 35, 4);
                     await pausex(133);
                     factory(0, 25, 4);
                     await pausex(133);
                     factory(0, 15, 4);
                     await pausex(800);
                     factory(0, 15, -4);
                     await pausex(133);
                     factory(0, 25, -4);
                     await pausex(133);
                     factory(0, 35, -4);
                     await pausex(133);
                     factory(0, 25, -4);
                     await pausex(133);
                     factory(0, 15, -4);
                     await pausex(1200);
                     factory(0, -50, 3.5).on('tick', papWaver(2, -50, -30));
                     factory(0, 10, 3.5).on('tick', papWaver(2, 10, 30));
                     await pausex(133);
                     factory(0, -50, 3.5).on('tick', papWaver(2, -50, -30));
                     factory(0, 10, 3.5).on('tick', papWaver(2, 10, 30));
                     await pausex(133);
                     factory(0, -50, 3.5).on('tick', papWaver(2, -50, -30));
                     factory(0, 10, 3.5).on('tick', papWaver(2, 10, 30));
                     await pausex(800);
                     factory(0, -50, -3.5).on('tick', papWaver(2, -50, -30));
                     factory(0, 10, -3.5).on('tick', papWaver(2, 10, 30));
                     await pausex(133);
                     factory(0, -50, -3.5).on('tick', papWaver(2, -50, -30));
                     factory(0, 10, -3.5).on('tick', papWaver(2, 10, 30));
                     await pausex(133);
                     factory(0, -50, -3.5).on('tick', papWaver(2, -50, -30));
                     factory(0, 10, -3.5).on('tick', papWaver(2, 10, 30));
                     await pausex(1600);
                     factory(1, 80, -5);
                     factory(1, 80, 5);
                  } else {
                     await pausex(600);
                     factory(0, 15, 2);
                     factory(0, -55, 2);
                     factory(0, 35, -2);
                     factory(0, -35, -2);
                     await pausex(2000);
                     factory(0, 15, -2);
                     factory(0, -55, -2);
                     factory(0, 35, 2);
                     factory(0, -35, 2);
                     await pausex(2000);
                     factory(2, 80, 2.5);
                     factory(1, 80, -2.5);
                     await pausex(1600);
                     factory(0, 15, -3);
                     await pausex(1000);
                     factory(0, 25, -3);
                     await pausex(1000);
                     factory(0, 35, -3);
                     await pausex(1000);
                     factory(0, 45, -3);
                     await pausex(1600);
                     factory(1, 80, 2.5);
                     factory(2, 80, -2.5);
                     await pausex(1600);
                     factory(0, 15, 3);
                     await pausex(1000);
                     factory(0, 25, 3);
                     await pausex(1000);
                     factory(0, 35, 3);
                     await pausex(1000);
                     factory(0, 45, 3);
                  }
               },
               false,
               4,
               sp
            );
            break;
         }
         case 18: {
            await brez(100, 65);
            const hardmode = 1 <= SAVE.flag.n.genocide_twinkly;
            if (battler.pattern('lostsoul_c', [ true, false ])) {
               bulletSequence(async (detachers, state) => {
                  const x = box.x1 + 5 + rng.attack.next() * (box.sx - 10);
                  const warner = new CosmosRectangle({
                     area: renderer.area,
                     anchor: { x: 0, y: 1 },
                     position: { x, y: box.y2 - 1 },
                     size: 12,
                     stroke: 0xffffff,
                     tint: 0xff0000,
                     metadata: { ticks: 0 },
                     objects: [
                        new CosmosText({
                           anchor: 0,
                           position: { x: 1, y: -6 },
                           stroke: -1,
                           fill: 0xff0000,
                           fontFamily: content.fCryptOfTomorrow,
                           fontSize: 8,
                           content: '!'
                        })
                     ],
                     filters: [ battler.clipFilter! ]
                  }).on('tick', function () {
                     if (this.metadata.ticks++ === 1) {
                        this.metadata.ticks = 0;
                        const red = this.tint === 0xff0000;
                        this.tint = red ? 0xffff00 : 0xff0000;
                        this.objects[0].fill = red ? 0xffff00 : 0xff0000;
                        if (red) {
                           sounds.prebomb.instance(renderer).rate.value = 1.2;
                        }
                     }
                  });
                  renderer.attach('menu', warner);
                  detachers.push(() => renderer.detach('menu', warner));
                  await renderer.pause(hardmode ? 1000 : 1200);
                  if (!state.b) {
                     return;
                  }
                  renderer.detach('menu', warner);
                  let i = 0;
                  while (i++ < 10) {
                     const { bullet, detach } = bulletSetup(
                        new CosmosHitbox({
                           anchor: 0,
                           size: { x: 13, y: 11 },
                           metadata: { bullet: true, damage: 4, doggerDetach: void 0 as (() => void) | void },
                           scale: 1 / 2,
                           priority: 1,
                           position: { x, y: box.y2 },
                           gravity: { y: 0.3 },
                           velocity: { x: rng.attack.next() * 4 - 2, y: -4 - rng.attack.next() * 3 },
                           objects: [ new CosmosAnimation({ active: true, anchor: 0, resources: content.ibbFirebol }) ]
                        }).on('tick', function () {
                           if (this.position.y > box.y2 + 10) {
                              detach();
                           } else {
                              quickshadow(this.objects[0] as CosmosSprite, this, battler.bullets).scale.set(1 / 2);
                           }
                        })
                     );
                     bullet.metadata.doggerDetach = detach;
                     detachers.push(detach);
                  }
                  sounds.bomb.instance(renderer);
                  await renderer.pause(hardmode ? 400 : 600);
                  if (state.b && 7 <= SAVE.flag.n.genocide_milestone) {
                     await renderer.pause(800);
                     if (!state.b) {
                        return;
                     }
                     detachers.push(trident());
                     await renderer.pause(800);
                  }
               });
            } else {
               let r = false;
               let v = 0;
               bulletSequence(async (detachers, state) => {
                  const myR = r;
                  const { bullet, detach } = bulletSetup(
                     new CosmosHitbox({
                        alpha: 0,
                        anchor: 0,
                        size: { x: 13, y: 11 },
                        metadata: {
                           bullet: true,
                           damage: 4,
                           unac: false,
                           nose: false,
                           doggerDetach: void 0 as (() => void) | void
                        },
                        gravity: { y: 0.4 },
                        scale: 0.5,
                        velocity: { x: (1 + rng.attack.next() * 1.5) * (myR ? -1 : 1) },
                        position: {
                           x: myR ? box.x2 + rng.attack.next() * 12 : box.x1 - rng.attack.next() * 12,
                           y: box.y1 - 5 - rng.attack.next() * 5
                        },
                        priority: 1,
                        objects: [ new CosmosAnimation({ active: true, anchor: 0, resources: content.ibbFirebol }) ]
                     }).on('tick', function () {
                        if (myR ? this.position.x < box.x1 - 10 : this.position.x > box.x2 + 10) {
                           detach();
                        } else {
                           quickshadow(
                              this.objects[0] as CosmosSprite,
                              this,
                              this.metadata.unac ? battler.bullets : 'menu'
                           ).scale.set(0.5);
                           if (this.position.y > box.y && !this.metadata.unac) {
                              this.metadata.unac = true;
                              this.area = renderer.area;
                              this.filters = [ battler.clipFilter! ];
                           }
                           if (box.y2 <= this.position.y && this.velocity.y > 0) {
                              this.velocity.y *= -1;
                              if (!this.metadata.nose) {
                                 this.metadata.nose = true;
                                 sounds.noise.instance(renderer);
                              }
                           }
                        }
                     }),
                     true
                  );
                  bullet.alpha.modulate(renderer, 300, 1);
                  detachers.push(detach);
                  bullet.metadata.doggerDetach = detach;
                  await renderer.pause(hardmode ? 400 : 600);
                  if (state.b && 7 <= SAVE.flag.n.genocide_milestone && ++v === 5) {
                     v = 0;
                     await renderer.pause(800);
                     if (!state.b) {
                        return;
                     }
                     detachers.push(trident());
                     await renderer.pause(1200);
                  }
                  r = !r;
               });
            }
            turnPromise = renderer.pause(7 <= SAVE.flag.n.genocide_milestone ? 10000 : hardmode ? 8000 : 6000);
            break;
         }
      }
      await Promise.race([ hy.promise, turnPromise ]);
      events.off('hurt', hurtListener);
      tt && battler.turnTimer();
      if (hy.active) {
         controller.resolve();
         hy.resolve();
      } else {
         battler.hpboost.reset();
         SAVE.flag.n.pacifist_marker_gameover++;
         const fd = fader({ alpha: 1, priority: 200000 });
         await renderer.pause(100);
         controller.resolve();
         const da = battler.music?.daemon;
         const ls = battler.music?.source!.loopStart;
         const le = battler.music?.source!.loopEnd;
         battler.music?.stop();
         for (const inst of is.slice()) {
            inst.stop();
         }
         sounds.hurt.stop();
         renderer.shake.task?.();
         renderer.shake.value = 0;
         const position = battler.SOUL.position.clone();
         const SOUL = new CosmosAnimation({
            anchor: 0,
            resources: content.ibuSOUL,
            position,
            scale: 0.5,
            priority: 200001
         });
         renderer.attach('menu', SOUL);
         await renderer.pause(660);
         renderer.detach('menu', SOUL);
         const sh = new CosmosValue();
         const breakSOUL = new CosmosSprite({
            anchor: 0,
            frames: [ content.ibuBreak ],
            position,
            scale: 0.5,
            priority: 200001
         }).on('tick', function () {
            this.offsets[0].set(sh.value * (Math.random() - 0.5), sh.value * (Math.random() - 0.5));
         });
         renderer.attach('menu', breakSOUL);
         sounds.break.instance(renderer);
         await renderer.pause(1330);
         await sh.modulate(renderer, 1330, 2);
         renderer.detach('menu', breakSOUL);
         sounds.break.instance(renderer);
         renderer.attach('menu', SOUL);
         await renderer.pause(1000);
         const display = atlas.navigators.of('frontEnd').objects[1];
         display.priority.value = 200002;
         display.area = renderer.area;
         display.filters = [ filters.outline ];
         display.position.y = 240 - display.position.y;
         if (SAVE.flag.n.pacifist_marker_gameover_refused++ < 1) {
            atlas.switch('dialoguerBase');
            renderer.attach('menu', display);
            await dialogue_primitive(text.b_opponent_asriel.refuse);
         }
         const fdx = fader({ fill: 0xffffff, priority: 2000000 });
         await fdx.alpha.modulate(renderer, 500, 1);
         display.priority.value = 0;
         display.area = null;
         display.filters = null;
         display.position.y = 240 - display.position.y;
         atlas.switch(null);
         renderer.detach('menu', fd, SOUL, display);
         battler.SOUL.position.set(position);
         fdx.alpha.modulate(renderer, 500, 0).then(() => renderer.detach('menu', fdx));
         if (da) {
            battler.music = da.instance(renderer, 0, true);
            battler.music.gain.value = 0;
            battler.music.gain.modulate(renderer, 300, da.gain);
            battler.music.source!.loopStart = ls!;
            battler.music.source!.loopEnd = le!;
         }
         return true;
      }
      return false;
   }
};

export default patterns;

CosmosUtils.status(`LOAD MODULE: CITADEL PATTERNS (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
