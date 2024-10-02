import { AdvancedBloomFilter } from '@pixi/filter-advanced-bloom';
import { ZoomBlurFilter } from '@pixi/filter-zoom-blur';
import { Graphics, Rectangle } from 'pixi.js';
import text from '../../languages/default/text/aerialis';
import {
   boxCheck,
   brez,
   bulletSequence,
   bulletSetup,
   bwsp,
   pastBox,
   screenCheck,
   ShootableEvents
} from '../common/api';
import commonPatterns from '../common/patterns';
import { content, context, filters, soundRouter, sounds } from '../systems/assets';
import { events, game, renderer, rng } from '../systems/core';
import {
   battler,
   box,
   calcLVX,
   heal,
   keyState,
   quickshadow,
   rand_rad,
   sawWaver,
   shake,
   sineWaver,
   world
} from '../systems/framework';
import { OutertaleTurnState } from '../systems/outertale';
import { SAVE } from '../systems/save';
import {
   CosmosAnimation,
   CosmosBaseEvents,
   CosmosDaemon,
   CosmosEventHost,
   CosmosHitbox,
   CosmosImageUtils,
   CosmosMath,
   CosmosObject,
   CosmosPoint,
   CosmosPointSimple,
   CosmosRectangle,
   CosmosSizedObjectProperties,
   CosmosSprite,
   CosmosText,
   CosmosUtils,
   CosmosValue,
   CosmosValueLinked
} from '../systems/storyteller';

export const mtaLaserXA = (2 / 15) * 2 - 1;

export const glydeAntenna = () => {
   const spr = battler.volatile[0].container.objects[0];
   const antenna = spr.objects[3] as CosmosSprite;
   const base = new CosmosPoint(139, 20).add(spr.offsets[0]).add(antenna.position.add(antenna.offsets[0]).divide(2));
   return base.add(4, -3.5).shift(antenna.rotation.value, 0, base);
};

export const treevis = (vizindex: number, sz = 1) =>
   [
      [
         new CosmosHitbox({
            size: { x: 3, y: 29 },
            anchor: { x: 0, y: 1 },
            metadata: { bullet: true, damage: 5 }
         }),
         new CosmosHitbox({
            size: { x: 9, y: 21 },
            anchor: { x: 0, y: 1 },
            metadata: { bullet: true, damage: 5 }
         }),
         new CosmosHitbox({
            size: { x: 13, y: 14 },
            anchor: { x: 0, y: 1 },
            metadata: { bullet: true, damage: 5 }
         }),
         new CosmosHitbox({
            size: { x: 17, y: 8 },
            anchor: { x: 0, y: 1 },
            metadata: { bullet: true, damage: 5 }
         })
      ],
      [
         new CosmosHitbox({
            size: { x: 9, y: 15 },
            anchor: { x: 0, y: 1 },
            metadata: { bullet: true, damage: 5 }
         })
      ],
      [
         new CosmosHitbox({
            size: { x: 5, y: 14 },
            anchor: { x: 0, y: 1 },
            metadata: { bullet: true, damage: 5 }
         }),
         new CosmosHitbox({
            size: { x: 11, y: 10 },
            anchor: { x: 0, y: 1 },
            metadata: { bullet: true, damage: 5 }
         })
      ],
      [
         new CosmosHitbox({
            size: { x: 6, y: 8 },
            anchor: { x: 1, y: 1 },
            metadata: { bullet: true, damage: 5 }
         }),
         new CosmosHitbox({
            size: { x: 7, y: 15 },
            anchor: { x: -2 / 7, y: 1 },
            metadata: { bullet: true, damage: 5 }
         })
      ],
      [
         new CosmosHitbox({
            size: { x: 1, y: 3 },
            anchor: { x: 0, y: 1 },
            metadata: { bullet: true, damage: 3, color: 'green' }
         }),
         new CosmosHitbox({
            size: { x: 15, y: 6 },
            position: { y: -3 * sz },
            anchor: { x: 0, y: 1 },
            metadata: { bullet: true, damage: 3, color: 'green' }
         }),
         new CosmosHitbox({
            size: { x: 11, y: 3 },
            position: { y: -9 * sz },
            anchor: { x: 0, y: 1 },
            metadata: { bullet: true, damage: 3, color: 'green' }
         }),
         new CosmosHitbox({
            size: { x: 9, y: 6 },
            position: { y: -12 * sz },
            anchor: { x: 0, y: 1 },
            metadata: { bullet: true, damage: 3, color: 'green' }
         })
      ]
   ][vizindex];

export const sounder = {
   burst: -Infinity,
   swallow: -Infinity
};

export const mta = {
   fodder (solid: boolean, props: CosmosSizedObjectProperties = {}, over = true) {
      const spr = solid
         ? new CosmosRectangle({ anchor: 0, size: 22, fill: 0xffffff, stroke: 0, border: 2 })
         : new CosmosSprite({ anchor: 0, frames: [ content.ibbBoxBullet ] });
      const bSetup = bulletSetup(
         new CosmosHitbox<
            ShootableEvents,
            {
               shot: boolean;
               shootable: boolean;
               t: number;
               bullet: boolean;
               damage: number;
               rev: boolean;
               blastable: boolean;
            }
         >({
            anchor: 0,
            size: 22,
            metadata: {
               shot: false,
               shootable: true,
               t: renderer.time,
               bullet: true,
               damage: 6,
               blastable: solid,
               rev: false
            } as any,
            objects: [ spr ],
            priority: 30,
            scale: 1 / 2,
            ...props
         }).on('shot', async function (a, b) {
            if (solid) {
               if (sounder.swallow < renderer.time - 50) {
                  sounder.swallow = renderer.time;
                  sounds.swallow.instance(renderer);
               }
               if (battler.SOUL.metadata.color === 'orange') {
                  this.velocity.set(
                     this.velocity.endpoint(
                        a,
                        // its over nine th........................................... just nine!!!!!111!!11!!!1!
                        this.velocity.extent > 9 ? this.velocity.extent : 15 / (b / 5)
                     )
                  );
               }
            } else if (!this.metadata.shot) {
               this.metadata.shot = true;
               this.metadata.shootable = false;
               this.metadata.bullet = false;
               if (sounder.burst < renderer.time - 50) {
                  sounder.burst = renderer.time;
                  sounds.burst.instance(renderer);
               }
               const hs = spr.compute().divide(2);
               const es = CosmosUtils.populate(4, index => {
                  const os = hs.multiply(index % 2, Math.floor(index / 2));
                  const rs = os.divide(hs).subtract(0.5).multiply(2);
                  const subspr = new CosmosSprite({
                     priority: 25,
                     frames: [ content.ibbBoxBullet ],
                     anchor: rs.multiply(-1),
                     position: this,
                     scale: 1 / 2,
                     velocity: rs,
                     // os.u!??!?!?!? osu!!?!?!?1/1/1`/1/?!/1/12rihihasdivhadvjhgdi
                     crop: { bottom: hs.y - os.y, left: os.x, right: hs.x - os.x, top: os.y }
                  });
                  return {
                     anim: subspr,
                     promise: new Promise<void>(reso => {
                        subspr.on('tick', function () {
                           this.alpha.value -= 0.1;
                           if (this.alpha.value <= 0) {
                              this.alpha.value = 0;
                              renderer.detach('menu', this);
                              reso();
                           }
                        });
                     })
                  };
               });
               renderer.attach('menu', ...es.map(element => element.anim));
               await renderer.on('render');
               this.detach(spr);
               await Promise.all(es.map(element => element.promise));
               bSetup.detach();
            }
         }),
         over,
         null
      );
      return bSetup;
   },
   laser (
      baserot: number,
      spin: number,
      speed: number,
      x: number,
      color: 'blue' | 'orange' | 'white',
      props: CosmosSizedObjectProperties
   ) {
      return new CosmosHitbox({
         anchor: 0,
         size: { y: 6, x },
         metadata: { bullet: true, damage: 6, color },
         rotation: baserot,
         objects: [
            new CosmosRectangle({
               anchor: 0,
               fill: color === 'blue' ? 0x00a2e8 : color === 'white' ? 0xffffff : 0xff993d,
               size: { y: 6, x }
            }),
            new CosmosSprite({
               anchor: { y: 0, x: mtaLaserXA },
               position: { x: x / 2 },
               frames: [ content.ibbLaserEmitter ],
               priority: 1,
               objects: [
                  new CosmosHitbox({
                     anchor: { y: 0, x: mtaLaserXA },
                     size: 13,
                     metadata: { bullet: true, damage: 6 }
                  })
               ]
            }),
            new CosmosSprite({
               anchor: { y: 0, x: mtaLaserXA },
               position: { x: x / -2 },
               scale: { x: -1 },
               frames: [ content.ibbLaserEmitter ],
               priority: 1,
               objects: [
                  new CosmosHitbox({
                     anchor: { y: 0, x: mtaLaserXA },
                     size: 13,
                     metadata: { bullet: true, damage: 6 }
                  })
               ]
            })
         ],
         spin,
         velocity: { y: speed },
         ...props
      });
   }
};

export const mtb = {
   async gunarm (bwsp = rng.attack.next(), delay = 1000, speed = 2.5, color = rng.attack.int(2) as 0 | 1) {
      const gunarm = new CosmosSprite({
         frames: [ content.ibbGunarm ],
         anchor: { x: 0, y: 1 },
         position: { x: box.x1 + box.sx * bwsp }
      });
      renderer.attach('menu', gunarm);
      await gunarm.position.modulate(renderer, 500, { y: 32 });
      const size = new CosmosValue(12);
      const radius = new CosmosValue();
      const balls = new Graphics();
      const position = { x: 0, y: 0 };
      const sh = new CosmosValue(4);
      const obj = new CosmosHitbox<ShootableEvents, { shot: boolean; shootable: boolean; absorb: boolean; a: number }>({
         anchor: 0,
         alpha: 0,
         metadata: { shot: false, shootable: true, absorb: true, a: 0.75 },
         position: gunarm
      })
         .on('tick', function () {
            let moved = false;
            const rate = battler.stat.speed.compute() / (keyState.special ? 2 : 1);
            if (rate <= Math.abs(battler.SOUL.position.x - position.x)) {
               moved = true;
            } else if (rate <= Math.abs(battler.SOUL.position.y - position.y)) {
               moved = true;
            }
            position.x = battler.SOUL.position.x;
            position.y = battler.SOUL.position.y;
            if (!this.metadata.shootable) {
               if (size.value > 3) {
                  size.value -= 1.5;
               } else {
                  radius.value += 3;
               }
            } else {
               if (!this.metadata.absorb && size.value < 6) {
                  size.value += 0.25;
               }
               if (box.y1 <= this.position.y) {
                  this.metadata.shootable = false;
                  this.velocity.y = 0;
                  sh.value = 0;
                  sounds.bomb.instance(renderer);
                  shake();
               }
            }
            this.size.set(size.value * 1.8);
            const x = sh.value * (Math.random() - 0.5);
            const y = sh.value * (Math.random() - 0.5);
            balls
               .clear()
               .beginFill(this.metadata.shot ? [ 0xff993d, 0x00a2e8 ][color] : 0xffffff, this.metadata.a)
               .drawCircle(x, y, radius.value + size.value)
               .endFill();
            if (radius.value > 0) {
               balls.beginHole().drawCircle(x, y, radius.value).endHole();
            }
            if (this.alpha.value < 1) {
               return;
            }
            const ext = this.position.extentOf(battler.SOUL);
            if (battler.invulnerable === 0 && ext < radius.value + size.value + 4) {
               if (ext < radius.value - 4) {
                  return;
               }
               if (this.metadata.shot) {
                  if (moved && color === 0) {
                     return;
                  } else if (!moved && color === 1) {
                     return;
                  }
               }
               battler.damage(6 + battler.bonus);
            }
         })
         .on('shot', function () {
            if (this.metadata.shootable && !this.metadata.absorb) {
               this.metadata.shootable = false;
               this.metadata.shot = true;
               this.velocity.y = 0;
               sh.value = 0;
               sounds.bomb.instance(renderer);
               shake();
            }
         });
      obj.container.addChild(balls);
      renderer.attach('menu', obj);
      sounds.appear.instance(renderer);
      await Promise.all([
         obj.alpha.modulate(renderer, 1000, 1),
         size.modulate(renderer, 1000, 4, 4),
         sh.modulate(renderer, 1000, 1)
      ]);
      await renderer.pause(delay);
      obj.velocity.y = speed;
      obj.metadata.a = 1;
      sounds.node.instance(renderer).gain.value *= 0.4;
      sounds.frypan.instance(renderer, 0.07).rate.value = 1.3;
      obj.metadata.absorb = false;
      await gunarm.position.modulate(renderer, 500, { y: 0 });
      renderer.detach('menu', gunarm);
      await renderer.when(() => radius.value + size.value > box.sx * Math.SQRT2);
      await obj.alpha.modulate(renderer, 250, 0);
      renderer.detach('menu', obj);
   },
   async sideleg (
      side: -1 | 1 = rng.attack.next() < 0.5 ? -1 : 1,
      center = box.x,
      centerDistance = 0,
      speed = 2,
      sd = 20,
      sr = 1.5,
      tickOffset = 18 / sr,
      preyellow = false,
      arm = false
   ) {
      const bx = center + centerDistance * side;
      const { detach, detached } = bulletSetup(
         new CosmosHitbox<
            ShootableEvents,
            { shot: boolean; bullet: boolean; damage: number; shootable: boolean; ticks: number }
         >({
            anchor: { x: 0, y: 1.005 },
            size: { x: 8, y: 1000 },
            metadata: { bullet: true, damage: 6, shot: preyellow, shootable: true, ticks: tickOffset },
            position: { x: bx, y: -20 },
            velocity: { y: speed },
            scale: { x: side },
            rotation: side === -1 ? 270 : 90,
            tint: preyellow ? 0xffff00 : 0xffffff,
            priority: 1,
            objects: [
               arm
                  ? new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.ibbArmBullet })
                  : new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibbLegBullet ] })
            ]
         })
            .on('shot', function () {
               if (arm) {
                  if (!this.metadata.shot) {
                     this.metadata.shot = true;
                     sounds.burst.instance(renderer);
                     this.velocity.x = side * 10;
                     (this.objects[0] as CosmosAnimation).index = 1;
                  }
               } else {
                  sounds.swallow.instance(renderer);
                  if (this.metadata.shot) {
                     this.metadata.shot = false;
                     this.tint = 0xffffff;
                  } else {
                     this.metadata.shot = true;
                     this.tint = 0xffff00;
                  }
               }
            })
            .on('tick', function () {
               if (screenCheck(this, 20)) {
                  detach();
               } else {
                  if (arm) {
                     const shad = quickshadow(this.objects[0] as CosmosSprite, this);
                     shad.priority.value = 0;
                     shad.scale.set(this.scale);
                     shad.rotation.value = this.rotation.value;
                  } else {
                     const swing = (this.metadata.shot ? (this.metadata.ticks += sr) : this.metadata.ticks) / 30;
                     this.position.x =
                        bx + (arm ? CosmosMath.linear(swing % 1, 0, 1, 0) : CosmosMath.wave(swing)) * sd * side;
                  }
               }
            }),
         true,
         null
      );
      return detached;
   },
   async sidearm (
      side: -1 | 1 = rng.attack.next() < 0.5 ? -1 : 1,
      center = box.x,
      centerDistance = 0,
      speed = 3,
      swingSpeed = 2,
      tickOffset = 0,
      preyellow = false
   ) {
      return mtb.sideleg(side, center, centerDistance, speed, swingSpeed, 0, tickOffset, preyellow, true);
   },
   /** bwsp = box-width-span phase */
   async bomb (bwsp = rng.attack.next(), speed = 2, rev: CosmosEventHost<{ rev: [] }> | null = null) {
      const spr = new CosmosAnimation({ anchor: 0, resources: content.ibbBomb });
      const { bullet, detach, detached } = bulletSetup(
         new CosmosHitbox<
            ShootableEvents,
            { shot: boolean; bullet: boolean; damage: number; shootable: boolean; rev: boolean; bombexempt: boolean }
         >({
            priority: 30,
            anchor: 0,
            size: 12,
            metadata: { bullet: true, damage: 6, shot: false, shootable: true, rev: false, bombexempt: true },
            position: { x: box.x1 + box.sx * bwsp, y: -10 },
            velocity: { y: speed },
            objects: [ spr ]
         })
            .on('shot', async function () {
               if (!this.metadata.shot) {
                  this.metadata.shot = true;
                  this.metadata.shootable = false;
                  spr.enable();
                  await renderer.when(() => spr.index === 1);
                  sounds.prebomb.instance(renderer);
                  await renderer.when(() => spr.index === 0);
                  await renderer.when(() => spr.index === 1);
                  sounds.prebomb.instance(renderer);
                  await renderer.when(() => spr.index === 0);
                  await renderer.when(() => spr.index === 1);
                  sounds.prebomb.instance(renderer);
                  await renderer.when(() => spr.index === 0);
                  await renderer.when(() => spr.index === 1);
                  sounds.bomb.instance(renderer);
                  battler.target!.vars.ratings?.(text.b_opponent_mettaton2.ratings.bomb, 20);
                  shake();
                  this.metadata.bullet = false;
                  spr.alpha.value = 0;
                  this.attach(
                     new CosmosAnimation({
                        active: true,
                        anchor: 0,
                        resources: content.ibbExBombBlastCore,
                        objects: [
                           new CosmosHitbox({
                              anchor: 0,
                              metadata: { bullet: true, damage: 6 },
                              size: { x: 10, y: 1000 }
                           }).on('render', function () {
                              this.metadata.bullet = false;
                              for (const object of renderer.detect(
                                 this,
                                 ...renderer.calculate('menu', o => o.metadata.shootable === true)
                              )) {
                                 if (!object.metadata.blastable && !object.metadata.bombexempt) {
                                    (object as CosmosHitbox<CosmosBaseEvents & { shot: [] }>).fire('shot');
                                 }
                                 if (!object.metadata.bombignore) {
                                    break;
                                 }
                              }
                           }),
                           new CosmosHitbox({
                              anchor: 0,
                              metadata: { bullet: true, damage: 6 },
                              size: { x: 1000, y: 10 }
                           }).on('render', function () {
                              this.metadata.bullet = false;
                              for (const object of renderer.detect(
                                 this,
                                 ...renderer.calculate('menu', o => o.metadata.shootable === true)
                              )) {
                                 if (object.metadata.blastable) {
                                    object.alpha.value = 0;
                                    object.metadata.shootable = false;
                                    object.metadata.bullet = false;
                                 } else if (!object.metadata.bombexempt) {
                                    (object as CosmosHitbox<CosmosBaseEvents & { shot: [] }>).fire('shot');
                                 }
                                 if (!object.metadata.bombignore) {
                                    break;
                                 }
                              }
                           }),
                           ...CosmosUtils.populate(
                              4,
                              index =>
                                 new CosmosAnimation({
                                    anchor: { y: 0 },
                                    position: CosmosMath.ray(index * 90, 5),
                                    rotation: index * 90,
                                    resources: content.ibbExBombBlastRay
                                 })
                           )
                        ]
                     }).on('tick', function () {
                        for (const c of this.objects as CosmosAnimation[]) {
                           c.index = this.index;
                        }
                        if (this.index === 7) {
                           detach();
                        }
                     })
                  );
               }
            })
            .on('tick', function () {
               this.metadata.rev && this.velocity.y > -speed && (this.velocity.y -= 0.2);
               if (rev) {
                  this.position.y < -10 && this.velocity.y < 0 && detach();
               } else {
                  this.position.y > 250 && detach();
               }
            }),
         true,
         null
      );
      rev?.on('rev', () => {
         bullet.metadata.rev = true;
      });
      return detached;
   },
   async parasol (bwsp = rng.attack.next(), speed = 3, early = speed * 20) {
      const spr = new CosmosAnimation({
         anchor: 0,
         resources: content.ibbExTiny2,
         metadata: { queueCancel: false }
      }).on('tick', function () {
         this.metadata.queueCancel && this.index === 0 && this.disable();
      });
      const { detach, detached } = bulletSetup(
         new CosmosHitbox<ShootableEvents, { shot: boolean; a1: number; shootable: boolean }>({
            anchor: { x: 0 },
            size: { x: 40, y: 25 },
            metadata: { shot: false, a1: 0, shootable: true },
            position: { x: box.x1 + box.sx * bwsp, y: -10 },
            velocity: { y: speed },
            objects: [ spr ],
            priority: 10,
            scale: 1 / 2
         })
            .on('shot', async function () {
               if (!this.metadata.shot) {
                  this.metadata.shot = true;
                  this.metadata.shootable = false;
                  sounds.burst.instance(renderer);
                  battler.target!.vars.ratings?.(text.b_opponent_mettaton2.ratings.hurt, 5);
                  const hs = spr.compute().divide(2);
                  const es = CosmosUtils.populate(4, index => {
                     const os = hs.multiply(index % 2, Math.floor(index / 2));
                     const rs = os.divide(hs).subtract(0.5).multiply(2);
                     const anim = new CosmosAnimation({
                        resources: content.ibbExTiny2,
                        index: spr.index,
                        anchor: rs.multiply(-1),
                        position: this,
                        scale: 1 / 2,
                        velocity: rs,
                        // os.u!??!?!?!? osu!!?!?!?1/1/1`/1/?!/1/12rihihasdivhadvjhgdi
                        subcrop: { bottom: hs.y - os.y, left: os.x, right: hs.x - os.x, top: os.y }
                     });
                     return {
                        anim,
                        promise: new Promise<void>(reso => {
                           anim.on('tick', function () {
                              this.alpha.value -= 0.1;
                              if (this.alpha.value <= 0) {
                                 this.alpha.value = 0;
                                 renderer.detach('menu', this);
                                 reso();
                              }
                           });
                        })
                     };
                  });
                  renderer.attach('menu', ...es.map(element => element.anim));
                  await renderer.on('render');
                  this.detach(spr);
                  await Promise.all(es.map(element => element.promise));
                  detach();
               }
            })
            .on('tick', async function () {
               if (!this.metadata.shot) {
                  switch (this.metadata.a1) {
                     case 0:
                        if (this.position.y > box.y1 - early - 15) {
                           this.metadata.a1 = 1;
                           spr.enable();
                           await renderer.when(() => spr.index === 12);
                           spr.metadata.queueCancel = true;
                           renderer.attach(
                              'menu',
                              new CosmosHitbox({
                                 anchor: 0,
                                 position: this,
                                 scale: 0.5,
                                 metadata: { ticks: 0, size: 0.1, bullet: true, damage: 6 },
                                 priority: 4,
                                 size: 16,
                                 velocity: CosmosMath.ray(this.position.angleTo(battler.SOUL), 2.5),
                                 objects: [ new CosmosSprite({ anchor: 0, frames: [ content.ibbExKiss ] }) ]
                              }).on('tick', function () {
                                 this.metadata.ticks++;
                                 this.metadata.size < 1 && (this.metadata.size += 0.1);
                                 this.rotation.value = Math.sin(this.metadata.ticks / 4) * 12;
                                 this.scale.set((this.metadata.size + Math.sin(this.metadata.ticks / 2) * 0.1) * 0.5);
                                 screenCheck(this, 10) && renderer.detach('menu', this);
                              })
                           );
                        }
                        break;
                     case 1:
                        if (this.velocity.y > 1.5) {
                           this.velocity.y -= 0.15;
                        } else {
                           this.metadata.a1 = 2;
                        }
                        break;
                     case 2:
                        if (this.position.y > box.y - 10) {
                           this.metadata.a1 = 3;
                           this.gravity.x = this.position.x < 160 ? -0.5 : 0.5;
                        }
                        break;
                     case 3:
                        screenCheck(this, 10) && detach();
                        break;
                  }
               }
            }),
         true,
         null
      );
      return detached;
   },
   async meteor (bwsp = rng.attack.next(), speed = 24, warntime = 600) {
      const x = box.x1 + box.sx * bwsp;
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
      await renderer.pause(warntime);
      renderer.detach('menu', warner);
      const b = new AdvancedBloomFilter({ threshold: 0, brightness: 1, bloomScale: 0.2 });
      await new Promise<void>(res => {
         renderer.attach(
            'menu',
            new CosmosAnimation({
               area: renderer.area,
               active: true,
               anchor: { x: 0, y: 1 },
               resources: content.ibbMeteor,
               position: { x, y: -10 },
               priority: 1,
               velocity: { y: speed },
               filters: [ b ]
            }).on('tick', function () {
               if (this.position.y < box.y2) {
                  quickshadow(this, this).priority.value = 0;
                  if (this.position.y > box.y) {
                     this.filters!.length < 2 && this.filters?.push(battler.clipFilter!);
                  }
               } else {
                  renderer.detach('menu', this);
                  res();
               }
            })
         );
      });
      shake(4, 500);
      sounds.bomb.instance(renderer);
      sounds.boom.instance(renderer, 0.2).rate.value = 1.6;
      const flareViz = new CosmosRectangle({
         area: renderer.area,
         position: { x, y: box.y2 },
         alpha: 0,
         anchor: { x: 0, y: 1 },
         size: { x: 4, y: 1000 },
         fill: 0xffffff,
         filters: [ b, battler.clipFilter! ]
      });
      renderer.attach('menu', flareViz);
      flareViz.size.modulate(renderer, 300, { x: 15 }, { x: 15 }, { x: 15 }, { x: 15 }).then(() => {
         flareViz.size.modulate(renderer, 300, { x: 15 }, { x: 15 }, { x: 15 }, { x: 4 });
      });
      await flareViz.alpha.modulate(renderer, 150, 1, 1);
      flareViz.attach(
         new CosmosHitbox({
            size: { x: 11, y: box.sy },
            anchor: { x: 0, y: 1 },
            metadata: { bullet: true, damage: 6 }
         }).on('render', function () {
            this.metadata.bullet = false;
         })
      );
      await flareViz.alpha.modulate(renderer, 450, 1, 0);
      renderer.detach('menu', flareViz);
   },
   async rocket (bs = rng.attack.int(4), bwsp = rng.attack.next(), warntime = 600, firetime = 400) {
      const t = renderer.time;
      const warnspr = new CosmosAnimation({
         active: true,
         anchor: 0,
         resources: content.ibbWarningreticle,
         area: renderer.area,
         filters: [ battler.clipFilter! ],
         tint: 0xff0000,
         position: pastBox(0, bs, bwsp).position,
         metadata: { ticks: 0, silent: false },
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
         ]
      }).on('tick', function () {
         const s = (renderer.time - t) / (warntime + firetime);
         this.scale.set(CosmosMath.bezier(s, 0, 1, 1));
         if (this.metadata.ticks++ === 1) {
            this.metadata.ticks = 0;
            const red = this.tint === 0xff0000;
            this.tint = red ? 0xffff00 : 0xff0000;
            this.objects[0].fill = red ? 0xffff00 : 0xff0000;
            if (!this.metadata.silent && red) {
               const pb = sounds.prebomb.instance(renderer);
               pb.rate.value = 1.2;
               pb.gain.value *= CosmosMath.remap(s, 0.4, 1.6);
            }
         }
      });
      renderer.attach('menu', warnspr);
      await renderer.pause(warntime);
      warnspr.metadata.silent = true;
      const color = rng.attack.next() < 0.5 ? 0 : 1;
      const tint = [ 0x00a2e8, 0xff993d ][color];
      const ROCKET = new CosmosAnimation({
         active: true,
         anchor: { x: 0, y: 1 },
         rotation: bs * 90,
         priority: 2,
         resources: content.ibbNeoRocket,
         position: pastBox(140, bs, bwsp).position,
         tint
      }).on('tick', function () {
         const s = quickshadow(this, this, 'menu', 0.6, 1.3, 0.05);
         s.tint = tint;
         s.priority.value = 1.5;
      });
      renderer.attach('menu', ROCKET);
      await ROCKET.position.modulate(renderer, firetime, warnspr);
      await renderer.on('render');
      renderer.detach('menu', ROCKET, warnspr);
      shake();
      sounds.bomb.instance(renderer);
      const am = 32;
      await Promise.all(
         CosmosUtils.populate(am, index => {
            const spr = new CosmosAnimation({ anchor: 0, resources: content.ibbFrogstar });
            const { detached, detach } = bulletSetup(
               new CosmosHitbox({
                  anchor: 0,
                  size: 2,
                  position: ROCKET,
                  scale: 1.5,
                  metadata: { bullet: true, damage: 6, color: [ 'blue', 'orange' ][color] },
                  velocity: CosmosMath.ray(index * (360 / am), 140 / (firetime / (100 / 3)) / 3),
                  objects: [ spr ],
                  priority: 1,
                  tint
               }).on('tick', function () {
                  this.velocity.angle += 2;
                  if (boxCheck(this, 5)) {
                     detach();
                  } else {
                     const s = quickshadow(spr, this, battler.bullets, 0.6, 1.3, 0.05);
                     s.tint = tint;
                     s.scale.set(1.5);
                     s.priority.value = 0;
                  }
               }),
               false,
               null
            );
            return detached;
         })
      );
   },
   async paratrooper (
      bulletspeed = 5,
      side: -1 | 1 = rng.attack.next() < 0.5 ? -1 : 1,
      distance = 10,
      speed = 3,
      waversize = 2
   ) {
      const spr = new CosmosAnimation({
         anchor: 0,
         resources: content.ibbNeoTiny1,
         scale: { x: side },
         priority: 1,
         metadata: { fast: false, t: renderer.time }
      }).on('tick', async function () {
         if (this.metadata.fast) {
            const s = quickshadow(this, bullet.position.add(this.offsets[0]), 'menu', 0.6, 1.5, 0.1);
            s.scale.set(0.5);
            s.rotation.value = bullet.rotation.value;
            s.priority.value = 0;
         } else {
            this.offsets[0].x = sineWaver(this.metadata.t, 2500 / speed, -1, 1) * waversize;
         }
      });
      const { bullet, detach, detached } = bulletSetup(
         new CosmosHitbox<ShootableEvents, { shot: boolean; a1: number; shootable: boolean }>({
            anchor: { x: 0 },
            size: { x: 40, y: 25 },
            metadata: { shot: false, a1: 0, shootable: true },
            position: { x: box.x + side * (battler.box.size.x * 0.5) + side * distance, y: -10 },
            velocity: { y: speed },
            objects: [ spr ],
            priority: 10,
            scale: 1 / 2
         })
            .on('shot', async function () {
               if (!this.metadata.shot) {
                  this.metadata.shot = true;
                  this.metadata.shootable = false;
                  sounds.burst.instance(renderer);
                  const hs = spr.compute().divide(2);
                  const es = CosmosUtils.populate(4, index => {
                     const os = hs.multiply(index % 2, Math.floor(index / 2));
                     const rs = os.divide(hs).subtract(0.5).multiply(2);
                     const anim = new CosmosAnimation({
                        resources: side === 1 ? content.ibbNeoTiny1 : content.ibbNeoTiny1a,
                        index: spr.index,
                        anchor: rs.multiply(-1),
                        position: this,
                        scale: 1 / 2,
                        velocity: rs,
                        // os.u!??!?!?!? osu!!?!?!?1/1/1`/1/?!/1/12rihihasdivhadvjhgdi
                        subcrop: { bottom: hs.y - os.y, left: os.x, right: hs.x - os.x, top: os.y }
                     });
                     return {
                        anim,
                        promise: new Promise<void>(reso => {
                           anim.on('tick', function () {
                              this.alpha.value -= 0.1;
                              if (this.alpha.value <= 0) {
                                 this.alpha.value = 0;
                                 renderer.detach('menu', this);
                                 reso();
                              }
                           });
                        })
                     };
                  });
                  renderer.attach('menu', ...es.map(element => element.anim));
                  await renderer.on('render');
                  this.detach(spr);
                  await Promise.all(es.map(element => element.promise));
                  detach();
               }
            })
            .on('tick', async function () {
               if (!this.metadata.shot) {
                  switch (this.metadata.a1) {
                     case 0:
                        if (this.position.y > battler.SOUL.position.y - speed / 2) {
                           this.metadata.a1 = 1;
                           sounds.node.instance(renderer).gain.value *= 0.4;
                           sounds.frypan.instance(renderer, 0.07).rate.value = 1.3;
                           spr.index = 1;
                           spr.metadata.fast = true;
                           this.spin.value = 10 * side;
                           this.velocity.x = 10 * side;
                           this.velocity.y = 0;
                           spr.enable();
                           renderer.when(() => spr.index === 0).then(() => spr.disable());
                           const parent = new CosmosHitbox<
                              ShootableEvents,
                              {
                                 ticks: number;
                                 size: number;
                                 bullet: boolean;
                                 damage: number;
                                 shootable: boolean;
                                 shot: boolean;
                              }
                           >({
                              anchor: 0,
                              position: this,
                              scale: 0.5,
                              metadata: { ticks: 0, size: 0.1, bullet: true, damage: 6, shootable: true, shot: false },
                              priority: 4,
                              size: 4,
                              velocity: CosmosMath.ray(side === -1 ? 0 : 180, bulletspeed),
                              objects: [
                                 new CosmosAnimation({ active: true, anchor: 0, resources: content.ibbExShine }).on(
                                    'tick',
                                    function () {
                                       this.index === 4 && this.disable();
                                       const s = quickshadow(this, parent, 'menu', 0.6, 1.5, 0.1);
                                       s.priority.value = 3.5;
                                    }
                                 )
                              ]
                           })
                              .on('shot', async function () {
                                 if (!this.metadata.shot) {
                                    this.metadata.shot = true;
                                    this.alpha.modulate(renderer, 300, 0);
                                    renderer.detach('menu', this);
                                 }
                              })
                              .on('tick', function () {
                                 this.metadata.ticks++;
                                 this.metadata.size < 1 && (this.metadata.size += 0.2);
                                 this.scale.set(this.metadata.size);
                                 screenCheck(this, 10) && renderer.detach('menu', this);
                              });
                           renderer.attach('menu', parent);
                        }
                        break;
                     case 1:
                        screenCheck(this, 10) && detach();
                        break;
                  }
               }
            }),
         true,
         null
      );
      return detached;
   },
   async blaster (side: -1 | 1 = rng.attack.next() < 0.5 ? -1 : 1, y = box.y, chargeTime = 5000, blastTime = 500) {
      const blastuh = new CosmosSprite({
         alpha: 0.25,
         anchor: { x: 1, y: 0 },
         frames: [ content.ibbBigblaster ],
         metadata: { time: null as number | null, fire: false },
         scale: { y: 0 }
      }).on('tick', function () {
         if (this.metadata.fire) {
            this.scale.y = sineWaver((this.metadata.time ??= renderer.time), 800, 1, 0.8);
         }
      });
      const arm = new CosmosSprite({
         anchor: new CosmosPoint(17, 13).divide(62, 22).multiply(2).subtract(1),
         frames: [ content.ibcMettatonNeoArm1 ],
         metadata: { shake: new CosmosValue() }
      }).on('tick', function () {
         this.offsets[0].set(
            new CosmosPoint(Math.random() * 2 - 1, Math.random() * 2 - 1).multiply(this.metadata.shake.value)
         );
      });
      const holder = new CosmosObject({
         position: { x: side === -1 ? -30 : 350, y },
         scale: { x: side },
         objects: [ blastuh, arm ]
      }).on('tick', function () {
         this.position.x = Math.min(Math.max(this.position.x, -30), 350);
      });
      renderer.attach('menu', holder);
      const target = { x: side === -1 ? 0 : 320 };
      await holder.position.modulate(renderer, 600, target, target);
      const sfx = sounds.goner_charge.instance(renderer, 1.5);
      sfx.rate.value = 8500 / chargeTime;
      sfx.gain.value /= 4;
      sfx.gain.modulate(renderer, Math.min(500, chargeTime), sfx.gain.value * 4);
      await Promise.all([
         arm.metadata.shake.modulate(renderer, chargeTime, 0, 0, 2),
         blastuh.scale.modulate(renderer, chargeTime, 1)
      ]);
      sfx.stop();
      sounds.specout.instance(renderer);
      new CosmosDaemon(content.avAsriel3, {
         context,
         gain: 0.75,
         rate: 1.2,
         router: soundRouter
      }).instance(renderer);
      arm.metadata.shake.value = 4;
      blastuh.alpha.value = 1;
      const blastbox = new CosmosHitbox({
         size: { x: 1000, y: 40 },
         anchor: { x: 1, y: 0 },
         metadata: { bullet: true, damage: 6, shootable: true, absorb: true }
      });
      blastuh.attach(blastbox);
      blastuh.metadata.fire = true;
      holder.gravity.x = side === -1 ? -0.1 : 0.1;
      const permashaker = () => renderer.shake.modulate(renderer, 0, 6);
      renderer.on('tick', permashaker);
      await renderer.pause(blastTime);
      renderer.off('tick', permashaker);
      renderer.shake.modulate(renderer, 600, 0);
      blastuh.detach(blastbox);
      await blastuh.alpha.modulate(renderer, 300, 0);
      renderer.detach('menu', holder);
   },
   async fodder (
      bwsp = rng.attack.next(),
      solid = false,
      speed = 2,
      waversize = 2,
      rev: CosmosEventHost<{ rev: [] }> | null = null
   ) {
      const x = box.x1 + box.sx * bwsp;
      const { bullet, detach, detached } = mta.fodder(solid, {
         position: { x, y: -10 },
         velocity: { y: speed }
      });
      bullet.on('tick', async function () {
         this.metadata.rev && this.velocity.y > -speed && (this.velocity.y -= 0.2);
         if (!this.metadata.shot) {
            if (screenCheck(this, 10)) {
               (!rev || this.position.y < 120) && detach();
            } else {
               this.position.x = x + sineWaver(this.metadata.t, 2500 / speed, -1, 1) * waversize;
            }
         }
      });
      rev?.on('rev', () => {
         bullet.metadata.rev = true;
      });
      return detached;
   },
   async hopbox (bwsp = rng.attack.next(), speed = 4, waversize = 0, hoptime = 1000, hopheight = 50) {
      const x = box.x1 + box.sx * bwsp;
      const spr = new CosmosSprite({ anchor: 0, frames: [ content.ibbBoxBulletUp ] });
      const hopper = new CosmosValue(0);
      const { detach, detached } = bulletSetup(
         new CosmosHitbox<
            ShootableEvents,
            {
               shot: boolean;
               shootable: boolean;
               t: number;
               bullet: boolean;
               absorb: boolean;
               damage: number;
               y: number;
               consecutive: number;
            }
         >({
            anchor: 0,
            size: 22,
            metadata: {
               shot: false,
               shootable: true,
               t: renderer.time,
               bullet: true,
               damage: 6,
               absorb: false,
               y: -10,
               consecutive: 0
            },
            position: { x, y: -10 },
            objects: [ spr ],
            priority: 10,
            scale: 1 / 2
         })
            .on('shot', async function () {
               sounds.noise.instance(renderer);
               hopper.value === 0 ||
                  battler.target!.vars.ratings?.(
                     text.b_opponent_mettaton2.ratings.hopbox,
                     CosmosMath.bezier(Math.min(this.metadata.consecutive++, 20) / 20, 5, 1, 1)
                  );
               await hopper.modulate(renderer, hoptime, hopper.value + hopheight * -2, 0);
            })
            .on('tick', async function () {
               if (screenCheck(this, 10)) {
                  detach();
               } else {
                  this.tint = hopper.value < 0 ? 0xffff00 : void 0;
                  this.position.set(
                     x + sineWaver(this.metadata.t, 2500 / speed, -1, 1) * waversize,
                     (this.metadata.y += speed) + hopper.value
                  );
               }
            }),
         true,
         null
      );
      return detached;
   },
   async buzzgate (bwsp = rng.attack.next(), sep = 10, speed = 2, waversize = 4) {
      return new Promise<void>(res => {
         const x = box.x1 + box.sx * bwsp;
         const bloom = new AdvancedBloomFilter({ threshold: 0, brightness: 1, bloomScale: 0 });
         const brightnessMod = {
            get value () {
               return bloom.bloomScale;
            },
            set value (value) {
               bloom.bloomScale = value;
            }
         };
         const beam = new CosmosAnimation({
            anchor: 0,
            scale: { x: (sep + 6) / 20 },
            position: { y: 2 },
            resources: content.ibbBuzzlightning,
            active: true,
            filters: [ bloom ],
            area: renderer.area,
            objects: [
               new CosmosHitbox<
                  ShootableEvents,
                  { shot: boolean; bullet: boolean; damage: number; shootable: boolean }
               >({
                  anchor: 0,
                  size: { x: sep + 6, y: 4 },
                  metadata: { bullet: true, damage: 6, shootable: true, shot: false }
               }).on('shot', async function (a, b) {
                  if (!this.metadata.shot) {
                     if (b === 0 || b < 30) {
                        this.metadata.shot = true;
                        this.metadata.shootable = false;
                        sounds.retract.instance(renderer).rate.value = 2;
                        await CosmosValue.prototype.modulate.call(brightnessMod, renderer, 150, 5);
                        this.metadata.bullet = false;
                        sounds.node.instance(renderer).rate.value = 2;
                        beam.alpha.value = 0;
                        pillar1.velocity.x = -16;
                        pillar1.enable();
                        pillar2.velocity.x = 16;
                        pillar2.enable();
                        await renderer.when(
                           () =>
                              buzzer.position.x + pillar1.position.x <= 0 &&
                              320 <= buzzer.position.x + pillar2.position.x
                        );
                        renderer.detach('menu', buzzer);
                        res();
                     }
                  }
               })
            ]
         });
         const pillar1 = new CosmosAnimation({
            anchor: { x: 1, y: 0 },
            position: { x: sep / -2 },
            priority: 1,
            resources: content.ibbBuzzpillar,
            objects: [
               new CosmosHitbox<ShootableEvents>({
                  anchor: { x: 1, y: 0 },
                  size: { x: 1000, y: 12 },
                  position: { x: -1.5 },
                  metadata: { bullet: true, damage: 6, shootable: true, absorb: true }
               }).on('shot', function (a, b) {
                  b === 0 && (buzzer.velocity.y += 0.5);
               })
            ]
         }).on('tick', function () {
            this.index === 2 && this.disable();
            (this.active || this.index > 0) && (quickshadow(this, buzzer.position.add(this)).priority.value = 0);
         });
         const pillar2 = new CosmosAnimation({
            anchor: { x: 1, y: 0 },
            position: { x: sep / 2 },
            resources: content.ibbBuzzpillar,
            priority: 1,
            scale: { x: -1 },
            objects: [
               new CosmosHitbox<ShootableEvents>({
                  position: { x: 1.5 },
                  anchor: { x: 1, y: 0 },
                  size: { x: 1000, y: 12 },
                  metadata: { bullet: true, damage: 6, shootable: true, absorb: true }
               }).on('shot', function (a, b) {
                  b === 0 && (buzzer.velocity.y += 0.5);
               })
            ]
         }).on('tick', function () {
            this.index === 2 && this.disable();
            (this.active || this.index > 0) && (quickshadow(this, buzzer.position.add(this)).priority.value = 0);
         });
         const buzzer = new CosmosObject({
            objects: [ beam, pillar1, pillar2 ],
            position: { y: -10 },
            velocity: { y: speed },
            metadata: { t: renderer.time },
            priority: 30
         }).on('tick', function () {
            if (screenCheck(this, 15)) {
               renderer.detach('menu', this);
               res();
            } else {
               this.position.x = x + sineWaver(this.metadata.t, 2500 / speed, -1, 1) * waversize;
            }
         });
         renderer.attach('menu', buzzer);
      });
   },
   async laser (
      bwsp = 0.5,
      baserot = CosmosMath.remap(rng.attack.next(), -35, 35),
      spin = (1 - ((baserot + 35) / 35 - 1) ** 4) * 0.5,
      speed = 4,
      x = box.sx,
      color: 'orange' | 'blue' = rng.attack.next() < 0.5 ? 'blue' : 'orange'
   ) {
      const rect = mta.laser(baserot, spin, speed, x, color, {
         position: { x: box.x1 + box.sx * bwsp, y: -10 }
      });
      for (const subr of rect.objects) {
         if (subr instanceof CosmosSprite) {
            subr.on('tick', function () {
               const s = quickshadow(
                  subr,
                  rect.position.add(this).shift(rect.rotation.value, 0, rect.position.value())
               );
               s.rotation.value = rect.rotation.value;
               s.priority.value = 0;
            });
         }
      }
      renderer.attach('menu', rect);
      await renderer.when(() => rect.position.y > 260 + x / 2);
      renderer.detach('menu', rect);
   }
};

const patterns = {
   async mettaton1 (
      turn: number,
      shyren: boolean,
      maddummy: boolean,
      quizzer: CosmosSprite,
      totalFails: number,
      f?: (e: number) => Promise<void>
   ) {
      let fails = 0;
      let otherpattern = true;
      const segments = 5;
      const mode = turn < 4 ? 0 : turn < 7 ? 1 : 2;
      const resources = [ content.ibbNote, content.ibbTheMoves, content.ibbLightning ][mode];
      const amt = [ 5, 9, 12, 12, 9, 12, 16, 1 ][turn];
      const spd = CosmosMath.remap([ 0, 2, 1, 2, 2, 2.5, 3, 3 ][turn] / 4, 1.75, 3);
      const positions = [ 1, 2, 3 ];
      const otherpromises = [] as Promise<void>[];
      const timeIndicator = new CosmosText({
         fontFamily: content.fDeterminationSans,
         fontSize: 16,
         anchor: { x: 0, y: 1 },
         position: { x: 160 },
         fill: 0xffffff
      }).on('tick', function () {
         this.content = text.b_opponent_mettaton1.missIndicator.replace('$(x)', (totalFails + fails).toString());
      });
      renderer.attach('menu', timeIndicator);
      timeIndicator.position.modulate(
         renderer,
         400,
         timeIndicator.position.add(0, 16),
         timeIndicator.position.add(0, 16)
      );
      otherpromises.push(
         new Promise(async resolve => {
            if (shyren) {
               let i = 0;
               const np =
                  turn === 3 ? (SAVE.data.b.bullied_shyren ? 0.5 : 0.75) : SAVE.data.b.bullied_shyren ? 0.4 : 0.6;
               const delay = (turn === 3 ? 550 : 700) * (SAVE.data.b.bullied_shyren ? 4 : 1);
               const otherresolver = renderer.when(() => !otherpattern);
               const spawner = await commonPatterns.shyren(
                  new CosmosPoint(55, 120),
                  0,
                  90,
                  true,
                  otherresolver,
                  SAVE.data.b.spared_shyren
               );
               while (otherpattern && SAVE.data.n.hp > 0) {
                  spawner!(otherpromises, i++, rng.attack.int(6), np);
                  otherpattern && (await Promise.race([ renderer.pause(delay), otherresolver ]));
               }
            } else if (maddummy) {
               const np = turn === 6 ? 4 : 3;
               const delay = turn === 6 ? 1000 : 1500;
               const otherresolver = renderer.when(() => !otherpattern);
               while (otherpattern && SAVE.data.n.hp > 0) {
                  await commonPatterns.maddummy(
                     false,
                     true,
                     np,
                     SAVE.data.n.state_wastelands_toriel !== 0 && turn === 6,
                     otherresolver,
                     SAVE.data.n.state_wastelands_toriel === 0
                  );
                  otherpattern && (await Promise.race([ renderer.pause(delay), otherresolver ]));
               }
            } else if (f) {
               while (otherpattern && SAVE.data.n.hp > 0) {
                  otherpromises.push(
                     patterns.mettatonA(
                        1,
                        renderer.when(() => ftest)
                     )
                  );
                  await renderer.pause(500 + rng.attack.next() * 1000);
               }
            }
            resolve();
         })
      );
      let index = 0;
      let ftest = false;
      if (f) {
         renderer.pause(2000).then(async () => {
            await f(0);
            await renderer.pause(3000);
            await f(1);
            await renderer.pause(5000);
            ftest = true;
            await f(2);
         });
      }
      const rad = rand_rad(rng.battle.next());
      while (index++ < amt) {
         const segmentSize = battler.box.size.x / segments;
         const baseX = box.x1 + segmentSize / 2;
         f && (index = 0);
         let fx = true;
         const top = rad.next() < 0.5;
         let lane = NaN;
         while (Number.isNaN(lane) || positions.includes(lane)) {
            lane = rad.int(segments);
         }
         positions.push(lane);
         positions.length > 3 && positions.shift();
         const { bullet, detached, detach } = bulletSetup(
            new CosmosHitbox({
               anchor: 0,
               size: 10,
               position: { x: baseX + lane * segmentSize, y: top ? box.y1 - 10 : box.y2 + 10 },
               metadata: { bullet: true, color: 'yellow', damage: 0 },
               velocity: { y: spd * (top ? 1 : -1) }
            }).on('tick', function () {
               if (ftest || (top ? this.position.y > box.y2 + 10 : this.position.y < box.y1 - 10)) {
                  fx = false;
                  detach();
               }
            })
         );
         let av = true;
         const spr = new CosmosAnimation({
            anchor: 0,
            resources,
            tint: 0xfaff29,
            scale: mode === 0 ? 0.5 : 1
         }).on('tick', function () {
            this.position.set(bullet);
            if (av) {
               this.alpha.value = (top ? box.y2 - this.position.y : this.position.y - box.y1) / battler.box.size.y;
            }
         });
         const last = index === amt;
         renderer.attach('menu', spr);
         await detached.then(async () => {
            av = false;
            if (ftest || fx) {
               spr.active = true;
               spr.extrapolate = false;
               spr.duration = 2;
               if (!ftest) {
                  const upg = sounds.upgrade.instance(renderer);
                  upg.rate.value = CosmosMath.remap(spr.alpha.value, 1.2, 1.8);
                  upg.gain.value *= 0.8;
               }
               spr.scale.modulate(renderer, 600, 7);
               spr.alpha.modulate(renderer, 600, 0, 0).then(() => {
                  renderer.detach('menu', spr);
               });
               if (last && fails === 0 && world.bad_lizard < 1 && SAVE.data.n.state_foundry_undyne <= 0) {
                  quizzer.metadata.thumbsup = true;
                  await renderer.pause(1000);
               }
            } else {
               fails++;
               if (fails > 2) {
                  quizzer.index = 15;
               } else if (fails > 7) {
                  quizzer.index = SAVE.data.n.state_foundry_undyne > 0 ? 15 : 4;
               }
               SAVE.data.n.hp > 0 && shake();
               sounds.bomb.instance(renderer);
               spr.tint = void 0;
               spr.alpha.value = 0.5;
               spr.alpha.modulate(renderer, 300, 1).then(async () => {
                  await renderer.pause(300);
                  await spr.alpha.modulate(renderer, 300, 0);
                  renderer.detach('menu', spr);
               });
            }
         });
         if (ftest) {
            break;
         } else if (!last && mode === 1) {
            await Promise.all([
               battler.box.rotation.modulate(renderer, 150, (rng.attack.next() * 2 - 1) * 10),
               battler.box.position.modulate(
                  renderer,
                  150,
                  new CosmosPoint(160, 120).add(
                     new CosmosPoint(rng.attack.next() - 0.5, rng.attack.next() - 0.5).multiply(25 * 2, 5 * 2)
                  )
               ),
               battler.box.size.modulate(
                  renderer,
                  150,
                  new CosmosPoint(80, 100).add(rng.attack.next() * 40, rng.attack.next() * 40)
               )
            ]);
         }
      }
      otherpattern = false;
      ftest || (await Promise.all(otherpromises));
      timeIndicator.position
         .modulate(renderer, 400, timeIndicator.position.subtract(0, 16), timeIndicator.position.subtract(0, 16))
         .then(() => {
            renderer.detach('menu', timeIndicator);
         });
      SAVE.data.n.hp > 0 || (await renderer.pause(Infinity));
      return [ fails > 2 ? 1 : 0, fails ];
   },
   async mettaton2 (ex: boolean, state: OutertaleTurnState<any>, turns = 0, cut = false, dd = false) {
      const promises = [] as Promise<void>[];
      const q = (...p: Promise<void>[]) => void promises.push(...p);
      const r = (amount: number, center: number, spread: number, p: (i: number, x: number) => Promise<void>) => {
         const sp = center - ((amount - 1) * spread) / 2;
         return CosmosUtils.populate(amount, i => p(i, sp + i * spread));
      };
      const shrinker = () => {
         const bbs = battler.box.size;
         if (bbs.y > 40) {
            bbs.y -= 4 / 30;
         } else if (bbs.y > 20) {
            bbs.y -= 2 / 30;
         } else if (bbs.y > 10) {
            bbs.y -= 1 / 30;
         }
      };
      let teV = 0;
      const t = renderer.time;
      const special = new CosmosHitbox<
         ShootableEvents,
         { shootable: boolean; l: number; bombignore: boolean; scissors: boolean }
      >({
         anchor: 0,
         size: 18,
         metadata: { shootable: true, l: 0, bombignore: true, scissors: true },
         objects: [
            new CosmosSprite({ anchor: 0, frames: [ content.ibbScissors ] }).on('tick', function () {
               this.tint = CosmosImageUtils.gradient(
                  0x00ff00,
                  0xcc3300,
                  Math.min(Math.max(state.vars.wireprogress, 0), 1)
               );
            })
         ]
      })
         .on('tick', async function () {
            const v = sineWaver(t, 6000, -1, 1, 1 / 8);
            this.position.set(
               battler.box.position
                  .add(v * (box.sx * 0.4), sineWaver(t, 6000 / 2, -1, 1, 1 / 8) * (box.sy * 0.4))
                  .subtract(0, battler.box.size.y / 2)
            );
            this.scale.set(1, CosmosMath.bezier(Math.abs(v), 1, 1, 0.5));
            if (this.metadata.l > 0) {
               this.metadata.l--;
            }
         })
         .on('shot', async function () {
            if (this.metadata.l > 0) {
               return;
            }
            this.metadata.l = 15;
            sounds.bell.instance(renderer);
            const iwires = state.vars.wires;
            state.vars.wireprogress += 1 / 6;
            if (1 <= state.vars.wireprogress) {
               teV = -Infinity;
               renderer.detach('menu', special);
               const container = state.volatile.container;
               const spr = container.objects[0];
               const ev = Math.max((iwires - 1) / 8, 0);
               spr.metadata.tickSpeed.modulate(renderer, 500, ev).then(() => {
                  ev === 0 && (spr.metadata.doTick = false);
               });
            }
            const subspr = new CosmosSprite({ anchor: 0, frames: [ content.ibbScissors ] }).on('tick', function () {
               this.tint = CosmosImageUtils.gradient(
                  0x00ff00,
                  0xcc3300,
                  Math.min(Math.max(state.vars.wireprogress, 0), 1)
               );
            });
            this.attach(subspr);
            subspr.scale.modulate(renderer, 500, 2);
            await subspr.alpha.modulate(renderer, 500, 0);
            this.detach(subspr);
         });
      const cutTime = 1000;
      if (ex) {
         const bad = world.bad_robot;
         bad && battler.stat.monsteratk.modifiers.push([ 'add', dd ? 6 : 2, 1 ]);
         let trueTurns = 0;
         const recentTurns: number[] = (battler.volatile[0].container.metadata.recent ??= []);
         if (turns < (bad ? 13 : 19)) {
            trueTurns = turns;
         } else if (turns % 6 === 0) {
            trueTurns = ((turns - 1) % 12) + 1;
         } else {
            while (trueTurns === 0 || recentTurns.includes(trueTurns)) {
               trueTurns = (bad ? [ 3, 5, 8, 10, 11 ] : [ 8, 10, 11, 13, 17 ])[rng.pattern.int(5)];
            }
         }
         recentTurns.push(trueTurns);
         recentTurns.length > 3 && void recentTurns.shift();
         switch (trueTurns) {
            case 1: {
               if (bad) {
                  await brez(120, 65);
                  cut && renderer.attach('menu', special);
                  battler.box.on('tick', shrinker);
                  let i = 0;
                  while (i < 4) {
                     const type = i++ % 2;
                     q(mtb.sideleg([ -1, 1 ][type] as -1 | 1, 160, -30, 3, 25, 2, 25));
                     await renderer.pause(133);
                     q(
                        mtb.fodder(bwsp([ box.x2 - 24, box.x1 + 24 ][type]), true, 3, 0),
                        mtb.fodder(bwsp([ box.x2 - 8, box.x1 + 8 ][type]), true, 3, 0)
                     );
                     await renderer.pause(366);
                     q(mtb.sideleg([ -1, 1 ][type] as -1 | 1, 160, -30, 3, 25, 2, 25));
                     await renderer.pause(133);
                     q(
                        mtb.fodder(bwsp([ box.x2 - 24, box.x1 + 24 ][type]), true, 3, 0),
                        mtb.fodder(bwsp([ box.x2 - 8, box.x1 + 8 ][type]), true, 3, 0)
                     );
                     if (i < 4) {
                        await renderer.pause(1000);
                     }
                  }
                  break;
               }
               await brez(80, 65);
               q(mtb.sideleg(-1, 160, -60, 2, 60, 0.85, 25));
               await renderer.pause(300);
               q(mtb.sideleg(-1, 160, -60, 2, 60, 0.85, 25));
               await renderer.pause(1200);
               q(...r(8, box.x, 15, (i, x) => (i === 5 ? mtb.hopbox(bwsp(x), 2, 1) : mtb.fodder(bwsp(x), true, 2, 1))));
               await renderer.pause(1200);
               q(mtb.sideleg(1, 160, -60, 2, 60, 0.85, 25));
               await renderer.pause(300);
               q(mtb.sideleg(1, 160, -60, 2, 60, 0.85, 25));
               await renderer.pause(1200);
               q(...r(8, box.x, 15, (i, x) => (i === 2 ? mtb.hopbox(bwsp(x), 2, 1) : mtb.fodder(bwsp(x), true, 2, 1))));
               break;
            }
            case 2: {
               if (bad) {
                  await brez(120, 65);
                  cut && renderer.attach('menu', special);
                  battler.box.on('tick', shrinker);
                  let i = 0;
                  while (i++ < 4) {
                     let j = 0;
                     let t = rng.attack.int(8);
                     while (j++ < 2) {
                        q(
                           ...r(8, box.x, 15, (i, x) =>
                              i === t ? mtb.bomb(bwsp(x), 1.5) : mtb.fodder(bwsp(x), rng.attack.next() < 3 / 4, 1.5, 0)
                           )
                        );
                        await renderer.pause(400);
                        t = Math.min(Math.max(t, 2), 5) + (rng.attack.int(5) - 2);
                     }
                     q(mtb.buzzgate((t + 0.5) / 8, 8, 1.5, 5));
                     if (i < 4) {
                        await renderer.pause(2400);
                     }
                  }
                  break;
               }
               await brez(80, 65);
               q(mtb.sideleg(-1, 186, 0, 2, 60, 1, 0, true));
               q(mtb.sideleg(1, 194, -60, 2, 60, 1, 15, true));
               await renderer.pause(1200);
               q(...r(4, box.x, 25, (i, x) => mtb.fodder(bwsp(x), false, 2, 1.5)));
               await renderer.pause(800);
               q(...r(4, box.x, 25, (i, x) => mtb.fodder(bwsp(x), false, 2, 1.5)));
               await renderer.pause(1600);
               q(mtb.sideleg(-1, 186, 0, 2, 60, 1, 0, true));
               q(mtb.sideleg(1, 194, -60, 2, 60, 1, 15, true));
               await renderer.pause(1200);
               q(...r(4, box.x, 25, (i, x) => mtb.fodder(bwsp(x), false, 2, 1.5)));
               await renderer.pause(800);
               q(...r(4, box.x, 25, (i, x) => mtb.fodder(bwsp(x), false, 2, 1.5)));
               await renderer.pause(1600);
               q(mtb.sideleg(-1, 186, 0, 2, 60, 1, 0, true));
               q(mtb.sideleg(1, 194, -60, 2, 60, 1, 15, true));
               break;
            }
            case 3: {
               if (bad) {
                  await brez(120, 65);
                  cut && renderer.attach('menu', special);
                  battler.box.on('tick', shrinker);
                  let i = 0;
                  while (i++ < 4) {
                     let j = 0;
                     let t = rng.attack.int(8);
                     while (j++ < 2) {
                        q(
                           ...r(8, box.x, 15, (i, x) =>
                              i === t ? mtb.bomb(bwsp(x), 1.5) : mtb.fodder(bwsp(x), rng.attack.next() < 3 / 4, 1.5, 0)
                           )
                        );
                        await renderer.pause(400);
                        t = Math.min(Math.max(t, 2), 5) + (rng.attack.int(5) - 2);
                     }
                     q(mtb.buzzgate((t + 0.5) / 8, 8, 1.5, 5));
                     if (i < 4) {
                        await renderer.pause(2400);
                     }
                  }
                  break;
               }
               await brez(80, 65);
               q(mtb.buzzgate(0.2));
               await renderer.pause(800);
               q(mtb.buzzgate(0.8));
               await renderer.pause(1400);
               q(...r(2, box.x, 80, async (i, x) => mtb.parasol(bwsp(x), 6)));
               await renderer.pause(400);
               q(...r(2, box.x, 60, async (i, x) => mtb.parasol(bwsp(x), 6)));
               await renderer.pause(800);
               q(...r(2, box.x, 100, async (i, x) => mtb.parasol(bwsp(x), 6)));
               await renderer.pause(1800);
               q(mtb.buzzgate(0.8, 8, void 0, 7));
               await renderer.pause(800);
               q(mtb.buzzgate(0.2, 8, void 0, 7));
               await renderer.pause(1400);
               q(...r(2, box.x, 100, async (i, x) => mtb.parasol(bwsp(x), 6)));
               await renderer.pause(400);
               q(...r(2, box.x, 60, async (i, x) => mtb.parasol(bwsp(x), 6)));
               await renderer.pause(800);
               q(...r(2, box.x, 80, async (i, x) => mtb.parasol(bwsp(x), 6)));
               await renderer.pause(1800);
               q(mtb.buzzgate(0.5, 6, 1, 10));
               break;
            }
            case 4: {
               if (bad) {
                  await brez(100, 65);
                  cut && renderer.attach('menu', special);
                  battler.box.on('tick', shrinker);
                  let i = 0;
                  while (i++ < 7) {
                     const t = rng.attack.int(4) + 1;
                     q(
                        ...r(6, box.x, 15, (i, x) =>
                           i === t ? mtb.hopbox(bwsp(x), 3) : mtb.fodder(bwsp(x), true, 3, 0)
                        )
                     );
                     q(mtb.paratrooper(7));
                     if (i < 7) {
                        await renderer.pause(1800);
                     }
                  }
                  break;
               }
               await brez(80, 65);
               q(...r(6, box.x, 15, (i, x) => (i === 2 ? mtb.hopbox(bwsp(x), 3, 1) : mtb.fodder(bwsp(x), true, 3, 1))));
               await renderer.pause(1000);
               q(...r(6, box.x, 15, (i, x) => (i === 1 ? mtb.hopbox(bwsp(x), 3, 1) : mtb.fodder(bwsp(x), true, 3, 1))));
               await renderer.pause(1000);
               q(...r(6, box.x, 15, (i, x) => (i === 4 ? mtb.hopbox(bwsp(x), 3, 1) : mtb.fodder(bwsp(x), true, 3, 1))));
               await renderer.pause(1000);
               q(...r(6, box.x, 15, (i, x) => (i === 3 ? mtb.hopbox(bwsp(x), 3, 1) : mtb.fodder(bwsp(x), true, 3, 1))));
               await renderer.pause(1600);
               q(mtb.parasol(0.8, 6));
               await renderer.pause(400);
               q(mtb.parasol(0.7, 6));
               await renderer.pause(400);
               q(mtb.parasol(0.6, 6));
               await renderer.pause(400);
               q(mtb.parasol(0.5, 6));
               await renderer.pause(400);
               q(mtb.parasol(0.4, 6));
               await renderer.pause(1000);
               q(mtb.parasol(0.2, 6));
               await renderer.pause(400);
               q(mtb.parasol(0.3, 6));
               await renderer.pause(400);
               q(mtb.parasol(0.4, 6));
               await renderer.pause(400);
               q(mtb.parasol(0.5, 6));
               await renderer.pause(400);
               q(mtb.parasol(0.6, 6));
               break;
            }
            case 5: {
               if (bad) {
                  await brez(100, 65);
                  cut && renderer.attach('menu', special);
                  battler.box.on('tick', shrinker);
                  let i = 0;
                  while (i++ < 11) {
                     const t = rng.attack.int(4) + 1;
                     q(
                        ...r(6, box.x, 15, (i, x) =>
                           i === t ? mtb.hopbox(bwsp(x), 3) : mtb.fodder(bwsp(x), true, 3, 0)
                        )
                     );
                     q(mtb.paratrooper(7));
                     if (i < 11) {
                        await renderer.pause(1500);
                     }
                  }
                  break;
               }
               await brez(282.2, 90);
               const qa = text.b_opponent_mettaton2.qa();
               const buttonz = CosmosUtils.populate(4, index => {
                  const vec = new CosmosPoint(index % 2, Math.floor(index / 2)).multiply(2).subtract(1);
                  return new CosmosHitbox({
                     anchor: 0,
                     size: 20,
                     metadata: { buttonz: true, index },
                     position: vec.multiply(25, 15).add(160),
                     objects: [
                        new CosmosAnimation({
                           anchor: 0,
                           resources: content.ibcMettatonQuizbutton,
                           index,
                           scale: 0.5,
                           tint: 0x00ff00
                        }),
                        new CosmosText({
                           position: { x: vec.x * 20 },
                           anchor: { x: vec.x * -1, y: 0 },
                           content: qa[index],
                           fill: 0xffffff,
                           fontFamily: content.fDeterminationMono,
                           fontSize: 16
                        }).on('tick', function () {
                           this.offsets[0].set(Math.random() * 2 - 1, Math.random() * 2 - 1);
                        })
                     ]
                  });
               });
               const tex = new CosmosText({
                  position: { x: 160, y: box.y1 + 10 },
                  anchor: { x: 0 },
                  content: text.b_opponent_mettaton2.qq(),
                  fontFamily: content.fDeterminationMono,
                  fontSize: 16,
                  fill: 0xffffff
               });
               renderer.attach('menu', ...buttonz, tex);
               let answer = -1;
               let expire = false;
               await Promise.race([
                  renderer.pause(10000),
                  renderer.when(() => {
                     const hit = renderer.detect(battler.SOUL, ...renderer.calculate('menu', o => o.metadata.buttonz));
                     if (hit.length > 0) {
                        answer = hit[0].metadata.index;
                        return true;
                     } else {
                        return expire;
                     }
                  })
               ]);
               SAVE.data.n.state_aerialis_mttanswer = (answer + 1) as 0 | 1 | 2 | 3 | 4;
               expire = true;
               tex.fill = answer === -1 ? 0xff0000 : 0xffff00;
               for (const b of buttonz) {
                  b.objects[0].alpha.value = 0;
                  b.objects[1].fill = answer === -1 ? 0xff0000 : answer === b.metadata.index ? 0x00ff00 : 0xffff00;
               }
               if (answer === -1) {
                  if (!SAVE.data.b.a_state_hapstablook) {
                     sounds.shock.instance(renderer);
                     battler.target!.vars.ratings?.(text.b_opponent_mettaton2.ratings.nosmooch, -100);
                  }
                  await state.dialogue(true, ...text.b_opponent_mettaton2.q0());
               } else {
                  sounds.buhbuhbuhdaadodaa.instance(renderer);
                  battler.target!.vars.ratings?.(text.b_opponent_mettaton2.ratings.smooch, 100);
                  await state.dialogue(
                     true,
                     ...[
                        text.b_opponent_mettaton2.q1,
                        text.b_opponent_mettaton2.q2,
                        text.b_opponent_mettaton2.q3,
                        text.b_opponent_mettaton2.q4
                     ][answer]()
                  );
               }
               renderer.detach('menu', ...buttonz, tex);
               break;
            }
            case 6:
            case 12:
            case 18: {
               await brez(80, 65);
               cut && renderer.attach('menu', special);
               bad && battler.box.on('tick', shrinker);
               const container = state.volatile.container;
               const spr = container.objects[0];
               const [ leftLeg, rightLeg, leftArm, rightArm, body, bodyHeart, head ] = spr.objects as CosmosAnimation[];
               spr.metadata.bodyActive = true;
               await renderer.when(() => body.index === 4);
               bodyHeart.index = 1;
               await renderer.pause(100);
               bodyHeart.tint = 0;
               const basePosition = container.position.add(spr).add(bodyHeart).add(0, -8);
               const wt = renderer.time;
               const heartAnim = new CosmosAnimation({ anchor: 0, resources: content.ibbExHeart });
               const heart = new CosmosHitbox<
                  ShootableEvents,
                  {
                     shootable: boolean;
                     sploded: boolean;
                     hits: number;
                     rng: CosmosValue;
                     done: boolean;
                     bombexempt: boolean;
                  }
               >({
                  anchor: 0,
                  size: 10,
                  position: basePosition,
                  metadata: {
                     shootable: true,
                     sploded: false,
                     hits: 0,
                     rng: new CosmosValue(),
                     done: false,
                     bombexempt: true
                  },
                  objects: [ heartAnim ],
                  priority: 20
               })
                  .on('shot', async function () {
                     if (this.metadata.sploded) {
                        sounds.swallow.instance(renderer);
                     } else {
                        sounds.hit.instance(renderer);
                        battler.target!.vars.ratings?.(text.b_opponent_mettaton2.ratings.hurt, 10);
                        if (!bad && ++this.metadata.hits === 10 + trueTurns / 3) {
                           if (trueTurns > 6) {
                              sounds.noise.instance(renderer);
                              if (!SAVE.data.b.a_state_armwrecker) {
                                 spr.metadata.hideArms = true;
                                 SAVE.data.b.a_state_armwrecker = true;
                                 leftArm.gravity.y = 0.25;
                                 leftArm.spin.value = 1;
                                 leftArm.priority.value = -10;
                                 rightArm.gravity.y = 0.25;
                                 rightArm.spin.value = -1;
                                 rightArm.priority.value = -10;
                              } else {
                                 spr.metadata.hideLegs = true;
                                 SAVE.data.b.a_state_legwrecker = true;
                                 leftLeg.gravity.y = 0.25;
                                 leftLeg.spin.value = 1;
                                 rightLeg.gravity.y = 0.25;
                                 rightLeg.spin.value = -1;
                              }
                           }
                           head.index = 16;
                           this.metadata.sploded = true;
                           this.metadata.rng.modulate(renderer, 0, 2);
                           await this.scale.modulate(renderer, 300, 0);
                           sounds.boom.instance(renderer);
                           battler.target!.vars.ratings?.(text.b_opponent_mettaton2.ratings.hearthurt, 50);
                           renderer.attach(
                              'menu',
                              ...CosmosUtils.populate(13, index => {
                                 const ang = (index / 13) * 360;
                                 return new CosmosSprite({
                                    anchor: 0,
                                    position: heart,
                                    velocity: CosmosMath.ray(ang, 3),
                                    rotation: ang,
                                    frames: [ content.ibcMettatonExStarburst ],
                                    spin: 4,
                                    acceleration: 0.95
                                 }).on('tick', function () {
                                    this.scale.set(this.scale.multiply(0.95));
                                    if ((this.alpha.value *= 0.95) < 0.05) {
                                       renderer.detach('menu', this);
                                    }
                                 });
                              })
                           );
                           this.metadata.done = true;
                           this.scale.modulate(renderer, 150, 2).then(() => {
                              this.scale.modulate(renderer, 150, 1);
                              this.metadata.rng.modulate(renderer, 150, 0);
                           });
                        } else {
                           this.metadata.rng.value = 2;
                        }
                        this.metadata.rng.modulate(renderer, 300, 0);
                     }
                  })
                  .on('tick', function () {
                     const rand = this.metadata.rng.value;
                     heartAnim.offsets[0].set((Math.random() * 2 - 1) * rand, (Math.random() * 2 - 1) * rand);
                     if (!this.metadata.done && !this.metadata.sploded) {
                        const xmove = trueTurns === 6 ? 3 : 6;
                        const ymove = trueTurns === 6 ? 0 : 3;
                        this.position.set(
                           basePosition.add(sineWaver(wt, 3000, -xmove, xmove), sineWaver(wt, 1500, -ymove, ymove))
                        );
                     }
                  });
               renderer.attach('menu', heart);
               let done = false;
               await Promise.all([
                  (async () => {
                     const c = renderer.when(() => done);
                     const cFrames = (t: number) => Promise.race([ c, renderer.pause(t) ]);
                     const dBullet = (f: () => void) => done || f();
                     let br = 0;
                     const bl = new CosmosObject({ metadata: { x: 0 } }).on('tick', function () {
                        this.position.set(heart.position);
                        if (this.metadata.x === 0) {
                           this.metadata.x = rng.attack.next() < 0.5 ? 2 : 4;
                           if (bad) {
                              renderer.attach(
                                 'menu',
                                 new CosmosAnimation({
                                    anchor: 0,
                                    resources: content.ibbLightning,
                                    position: bl,
                                    velocity: CosmosMath.ray(br + 90, 3.5),
                                    objects: [
                                       new CosmosHitbox({
                                          anchor: 0,
                                          size: 10,
                                          metadata: { bullet: true, damage: 6 }
                                       })
                                    ]
                                 }).on('tick', function () {
                                    screenCheck(this, 10) && renderer.detach('menu', this);
                                 }),
                                 new CosmosAnimation({
                                    anchor: 0,
                                    resources: content.ibbLightning,
                                    position: bl,
                                    velocity: CosmosMath.ray(br + 270, 3.5),
                                    objects: [
                                       new CosmosHitbox({
                                          anchor: 0,
                                          size: 10,
                                          metadata: { bullet: true, damage: 6 }
                                       })
                                    ]
                                 }).on('tick', function () {
                                    screenCheck(this, 10) && renderer.detach('menu', this);
                                 })
                              );
                           } else {
                              renderer.attach(
                                 'menu',
                                 new CosmosSprite({
                                    alpha: 0.8,
                                    anchor: { x: 0 },
                                    frames: [ content.ibbTear ],
                                    scale: 0.5,
                                    position: bl,
                                    rotation: br,
                                    velocity: CosmosMath.ray(br + 90, 3),
                                    objects: [
                                       new CosmosHitbox({
                                          anchor: { x: 0 },
                                          size: { x: 8, y: 12 },
                                          metadata: { bullet: true, damage: 6 }
                                       })
                                    ]
                                 }).on('tick', function () {
                                    screenCheck(this, 10) && renderer.detach('menu', this);
                                 }),
                                 new CosmosAnimation({
                                    active: true,
                                    anchor: { x: 0 },
                                    resources: content.ibbScribble,
                                    scale: 0.5,
                                    position: bl,
                                    velocity: CosmosMath.ray(br + 270, 3),
                                    objects: [
                                       new CosmosHitbox({
                                          anchor: { x: 0 },
                                          size: 20,
                                          metadata: { bullet: true, damage: 6 }
                                       })
                                    ]
                                 }).on('tick', function () {
                                    screenCheck(this, 10) && renderer.detach('menu', this);
                                 })
                              );
                           }
                           br += 360 / 5 + 4;
                        } else {
                           this.metadata.x--;
                        }
                     });
                     renderer.attach('menu', bl);
                     switch (trueTurns) {
                        case 6:
                        case 18: {
                           while (!done) {
                              if (bad) {
                                 dBullet(() => q(mtb.paratrooper(7)));
                                 await cFrames(1000);
                              } else {
                                 dBullet(() => q(mtb.buzzgate(rng.attack.next(), 12, 2, 4)));
                                 await cFrames(3000);
                              }
                           }
                           break;
                        }
                        case 12: {
                           await cFrames(1000);
                           while (!done) {
                              if (bad) {
                                 dBullet(() => q(mtb.gunarm(rng.attack.next() < 0.5 ? 0.25 : 0.75, 750)));
                                 await cFrames(3000);
                              } else {
                                 dBullet(() => q(mtb.parasol(void 0, 6)));
                                 await cFrames(1000);
                              }
                           }
                           break;
                        }
                     }
                     renderer.detach('menu', bl);
                  })(),
                  Promise.race([
                     renderer.pause(7000 + trueTurns * 500),
                     renderer.when(() => heart.metadata.sploded || heart.metadata.done)
                  ]).then(async () => {
                     done = true;
                     if (heart.metadata.sploded) {
                        await renderer.when(() => heart.metadata.done);
                     } else {
                        heart.metadata.done = true;
                     }
                     await heart.position.modulate(renderer, 300, basePosition, basePosition);
                     await renderer.pause(100);
                     renderer.detach('menu', heart);
                     bodyHeart.tint = void 0;
                     await renderer.pause(100);
                     bodyHeart.index = 0;
                     spr.metadata.bodyActive = false;
                     if (!bad) {
                        head.index = trueTurns === 6 ? 0 : trueTurns === 12 ? 15 : 14;
                     }
                  })
               ]);
               break;
            }
            case 7:
            case 8: {
               await brez(80, 65);
               cut && renderer.attach('menu', special);
               bad && battler.box.on('tick', shrinker);
               const rotTime = trueTurns === 7 ? 1250 : 1000;
               const rotSpread = bad ? 60 : 45;
               const rotAmount = bad ? 10 : 15;
               const rotEvents = new CosmosEventHost<{ l: []; r: [] }>();
               const colorRatio = 1 / 2;
               const colorGen = () => (rng.attack.next() < colorRatio ? 0 : 1);
               const colorSequences = CosmosUtils.populate(2, () => [ 1, ...CosmosUtils.populate(4, colorGen) ]);
               const spawnpoints = CosmosUtils.populate(2, side => {
                  const rotStep = rotSpread * [ 1, -1 ][side];
                  const rotBase = [ 0, 180 ][side] - rotStep * 2.5;
                  const colorSequence = colorSequences[side];
                  const lasers = new CosmosObject({
                     position: { x: [ -70, 70 ][side], y: 57 },
                     objects: CosmosUtils.populate(6, index =>
                        new CosmosRectangle({
                           alpha: index === 0 ? 0 : 1,
                           size: { x: 1000, y: 2 },
                           anchor: { y: 0 },
                           metadata: { index },
                           fill: 0xffffff,
                           objects: [
                              new CosmosHitbox({
                                 size: { x: 1000, y: 2 },
                                 metadata: { bullet: true, damage: 6, color: 'white' }
                              }).on('tick', function () {
                                 this.metadata.color = [ 'white', bad ? 'orange' : 'blue' ][
                                    (colorSequence[index] + (disco.metadata.shot ? 1 : 0)) % 2
                                 ];
                              })
                           ],
                           rotation: rotBase + rotStep * index
                        }).on('tick', function () {
                           this.fill = [ 0xffffff, bad ? 0xff993d : 0x00a2e8 ][
                              (colorSequence[index] + (disco.metadata.shot ? 1 : 0)) % 2
                           ];
                        })
                     )
                  });
                  rotEvents.on(side === 0 ? 'l' : 'r', async function () {
                     await Promise.all([
                        lasers.objects[0].alpha.modulate(renderer, rotTime, 1),
                        lasers.objects[4].alpha.modulate(renderer, rotTime, 0),
                        lasers.rotation.modulate(renderer, rotTime, 0, rotStep, rotStep)
                     ]);
                     colorSequence.pop();
                     colorSequence.unshift(colorGen());
                     lasers.objects[0].alpha.value = 0;
                     lasers.objects[4].alpha.value = 1;
                     lasers.rotation.value = 0;
                  });
                  return lasers;
               });
               const discoAnim = new CosmosAnimation({
                  active: true,
                  anchor: { x: 0 },
                  resources: content.ibcMettatonDjdisco
               });
               const disco = new CosmosHitbox<ShootableEvents, { shot: boolean; shootable: boolean }>({
                  position: battler.box.position.subtract(0, 57),
                  anchor: { x: 0 },
                  objects: [ ...spawnpoints, discoAnim ],
                  metadata: { shootable: true, shot: false },
                  size: { x: 14, y: 10 }
               }).on('shot', function () {
                  sounds.noise.instance(renderer);
                  if (this.metadata.shot) {
                     this.metadata.shot = false;
                     discoAnim.use(content.ibcMettatonDjdisco);
                  } else {
                     this.metadata.shot = true;
                     discoAnim.use(content.ibcMettatonDjdiscoInv);
                  }
               });
               renderer.attach('menu', disco);
               await renderer.pause(rotTime);
               let i = 0;
               while (i < rotAmount) {
                  const e = i++ % 2 === 0;
                  if (bad && i < rotAmount) {
                     q(mtb.paratrooper(7));
                  }
                  await Promise.all(rotEvents.fire(e ? 'l' : 'r'));
               }
               await Promise.all(promises);
               if (cut) {
                  teV = renderer.time;
                  await renderer.when(() => cutTime <= renderer.time - teV || 1 <= state.vars.wireprogress);
                  renderer.detach('menu', special);
               }
               bad && battler.box.off('tick', shrinker);
               renderer.detach('menu', disco);
               return;
            }
            case 9:
            case 10: {
               if (bad) {
                  await brez(80, 65);
                  cut && renderer.attach('menu', special);
                  battler.box.on('tick', shrinker);
                  let i = 0;
                  const total = trueTurns === 9 ? 3 : 4;
                  const delay = trueTurns === 9 ? 500 : 250;
                  while (i++ < total) {
                     q(mtb.buzzgate(void 0, trueTurns === 9 ? 14 : 10, 3, 1));
                     await renderer.pause(500);
                     q(mtb.buzzgate(void 0, trueTurns === 9 ? 14 : 10, 3, 1));
                     await renderer.pause(500);
                     if (rng.attack.next() < 0.5) {
                        q(mtb.gunarm(0.25, delay));
                        await renderer.pause(trueTurns === 9 ? 1000 : 750);
                        q(mtb.gunarm(0.75, delay));
                     } else {
                        q(mtb.gunarm(0.75, delay));
                        await renderer.pause(trueTurns === 9 ? 1000 : 750);
                        q(mtb.gunarm(0.25, delay));
                     }
                     if (i < total) {
                        await renderer.pause(trueTurns === 9 ? 3500 : 3000);
                     }
                  }
                  break;
               }
               await brez(56, 65);
               let index = 0;
               const spede = trueTurns === 9 ? 2.5 : 3;
               const total = trueTurns === 9 ? 5 : 9;
               const thymeAndYesImPurposefullyMisspellingVariablesBecauseImSoPhreakingBoredThanksForAskingOhYoureSoGodDamnWelcomeOkayBye =
                  trueTurns === 9 ? 1500 : 1250;
               while (index < total) {
                  const t = rng.attack.int(4);
                  q(
                     ...r(4, box.x, 15, (i, x) =>
                        i === t ? mtb.bomb(bwsp(x), spede) : mtb.fodder(bwsp(x), true, spede, 0)
                     )
                  );
                  await renderer.pause(
                     thymeAndYesImPurposefullyMisspellingVariablesBecauseImSoPhreakingBoredThanksForAskingOhYoureSoGodDamnWelcomeOkayBye
                  );
                  index++;
               }
               break;
            }
            case 11: {
               if (bad) {
                  await brez(80, 65);
                  cut && renderer.attach('menu', special);
                  battler.box.on('tick', shrinker);
                  let ind = 20;
                  while (ind-- > 0) {
                     q(mtb.paratrooper(7));
                     if (ind > 0) {
                        await renderer.pause(400);
                     }
                  }
                  break;
               }
               if (!world.badder_lizard && turns === 11) {
                  await brez(80, 65);
                  const urb = new CosmosSprite({
                     alpha: 0.7,
                     anchor: 0,
                     scale: 0.5,
                     frames: [ content.ibcMettatonHappybreaktime ],
                     metadata: { tx: 15 },
                     position: box
                  }).on('tick', function () {
                     if (this.metadata.tx === 0) {
                        this.metadata.tx = 15;
                        this.alpha.value = this.alpha.value > 0 ? 0 : 0.7;
                     }
                     this.metadata.tx--;
                  });
                  renderer.attach('menu', urb);
                  await renderer.pause(5000);
                  renderer.detach('menu', urb);
                  break;
               } else {
                  await brez(80, 65);
                  let ind = 20;
                  while (ind-- > 0) {
                     q(mtb.parasol(void 0, 6));
                     if (ind > 0) {
                        await renderer.pause(400);
                     }
                  }
                  break;
               }
            }
            case 13: {
               await brez(80, 65);
               const cnt = 19;
               const elements = CosmosUtils.populate(cnt, index => index);
               while (elements.length > 0) {
                  if (elements.length % 5 === 0) {
                     q(mtb.buzzgate(rng.attack.next(), 8, void 0, 7));
                  }
                  q(mtb.parasol(elements.splice(rng.attack.next() * elements.length, 1)[0] / cnt, 3));
                  await renderer.pause(1000);
               }
               break;
            }
            case 14:
            case 15: {
               await brez(80, 65);
               const spr = new CosmosAnimation({
                  anchor: 1,
                  scale: 1 / 2,
                  position: { x: box.x2 - 2.5, y: box.y2 - 2.5 },
                  metadata: { tx: 15 },
                  resources: content.ibcMettatonRecbox
               }).on('tick', function () {
                  if (this.metadata.tx === 0) {
                     this.metadata.tx = 15;
                     this.alpha.value = this.alpha.value > 0 ? 0 : 1;
                  }
                  this.metadata.tx--;
               });
               renderer.attach('menu', spr);
               const rev = new CosmosEventHost<{ rev: [] }>();
               const spd = trueTurns === 14 ? 4 : 5;
               const elements = CosmosUtils.populate(6, index => index);
               while (elements.length > 0) {
                  const t = elements.splice(rng.attack.next() * elements.length, 1)[0];
                  q(...r(6, box.x, 15, (i, x) => mtb.fodder(bwsp(x), ![ t, (t + 3) % 6 ].includes(i), spd, 0, rev)));
                  elements.length > 0 && (await renderer.pause(2000));
               }
               rev.fire('rev');
               spr.index = 1;
               Promise.all(promises).then(() => {
                  renderer.detach('menu', spr);
               });
               break;
            }
            case 16:
            case 17: {
               await brez(80, 65);
               let elements = trueTurns === 17 ? 20 : 14;
               const sp = trueTurns === 17 ? 4 : 3;
               while (elements > 0) {
                  if (elements % 3 === 0) {
                     q(mtb.laser());
                  }
                  const bb = rng.attack.int(3);
                  q(...r(3, box.x, 25, (i, x) => (bb === i ? mtb.bomb(bwsp(x), sp) : mtb.fodder(bwsp(x), false, sp))));
                  await renderer.pause(trueTurns === 17 ? 800 : 600);
                  elements--;
               }
               break;
            }
            default:
               await renderer.pause(450);
         }
      } else {
         switch (rng.pattern.int(3)) {
            case 0: {
               await brez(80, 65);
               let i = 32;
               while (i > 0) {
                  await renderer.pause(150);
                  q(mtb.fodder(void 0, false, 3, 4));
                  i--;
               }
               break;
            }
            case 1: {
               await brez(95, 65);
               let i = 2;
               while (i > 0) {
                  await renderer.pause(1200);
                  q(mtb.buzzgate(void 0, 15, 3, 4));
                  i--;
               }
               break;
            }
            case 2: {
               await brez(65, 65);
               let i = 4;
               while (i > 0) {
                  await renderer.pause(1800);
                  const t = rng.attack.int(4);
                  q(...r(4, box.x, 15, (i, x) => (i === t ? mtb.bomb(bwsp(x), 3) : mtb.fodder(bwsp(x), false, 3, 0))));
                  i--;
               }
               break;
            }
         }
      }
      await Promise.all(promises);
      if (cut) {
         teV = renderer.time;
         await renderer.when(() => cutTime <= renderer.time - teV || 1 <= state.vars.wireprogress);
         renderer.detach('menu', special);
      }
      ex && world.bad_robot && battler.box.off('tick', shrinker);
   },
   async mettaton3 (turns: number) {
      battler.stat.invulnerability.modifiers.push([ 'add', -Math.ceil(calcLVX() / 2), 1 ]);
      battler.stat.monsteratk.modifiers.push([ 'add', 4, 1 ]);
      game.movement = true;
      let hits = 0;
      let ended = false;
      let boxed = false;
      let positionsOverride = false;
      let post_end = null as (() => void) | null;
      const positions = [ 1, 2, 3 ];
      const promises = [] as Promise<void>[];
      const rad = rand_rad(rng.battle.next());
      const volatile = battler.volatile[0];
      const vars = volatile.vars;
      const shielder = (async () => {
         if (1 <= vars.ap) {
            return;
         }
         await renderer.when(() => boxed);
         const segments = CosmosUtils.populate(5, segment => segment);
         const timeIndicator = new CosmosText({
            area: new Rectangle(0, 0, 640, 30 * 2),
            fontFamily: content.fDeterminationSans,
            fontSize: 16,
            anchor: { x: 0, y: 1 },
            position: { x: 160 },
            filters: [ filters.outline ]
         }).on('tick', function () {
            this.content = text.b_opponent_mettaton2.hitIndicator.replace('$(x)', hits.toString());
            this.fill = hits < 10 ? 0xffffff : hits < 15 ? 0xfaff29 : 0x722bff;
         });
         renderer.attach('menu', timeIndicator);
         timeIndicator.position.modulate(
            renderer,
            400,
            timeIndicator.position.add(0, 16),
            timeIndicator.position.add(0, 16)
         );
         while (!ended && hits < 15) {
            let fx = true;
            const top = rad.next() < 0.5;
            const boost = hits < 14 ? rad.next() < 1 / 4 : false;
            const lanes = segments.filter(
               testLane =>
                  !positions.includes(testLane) &&
                  Math.abs(box.x + CosmosMath.spread_quantize(box.sx / 2, testLane, 5) - battler.SOUL.position.x) <
                     battler.box.size.x / 3
            );
            const lane = lanes[rad.int(lanes.length)];
            if (!positionsOverride) {
               positions.push(lane);
               positions.length > 3 && positions.shift();
            }
            const { bullet, detached, detach } = bulletSetup(
               new CosmosHitbox({
                  anchor: 0,
                  size: 10,
                  position: {
                     x: box.x + CosmosMath.spread_quantize(box.sx / 2, lane, 5),
                     y: top ? box.y1 - 10 : box.y2 + 10
                  },
                  metadata: { bullet: true, color: 'yellow', damage: boost ? 2 : 0 },
                  velocity: { y: top ? 1.5 : -1.5 }
               }).on('tick', function () {
                  if (top ? this.position.y > box.y2 + 10 : this.position.y < box.y1 - 10) {
                     fx = false;
                     detach();
                  }
               })
            );
            let av = true;
            const spr = new CosmosAnimation({
               area: boost ? renderer.area : null,
               anchor: 0,
               resources: content.ibbShield,
               tint: 0xfaff29,
               filters: boost ? [ new AdvancedBloomFilter({ bloomScale: 3, brightness: 1, threshold: 0 }) ] : null
            }).on('tick', function () {
               this.position.set(bullet);
               if (av) {
                  this.alpha.value = (top ? box.y2 - this.position.y : this.position.y - box.y1) / battler.box.size.y;
               }
            });
            renderer.attach('menu', spr);
            await detached;
            av = false;
            if (fx) {
               hits += boost ? 2 : 1;
               spr.active = true;
               spr.extrapolate = false;
               spr.duration = 2;
               const r = CosmosMath.remap(spr.alpha.value, 1.2, 1.8);
               const upg = sounds.upgrade.instance(renderer);
               upg.rate.value = r;
               upg.gain.value *= 0.8;
               if (spr.filters !== null) {
                  let iterations = 0;
                  let mix = 8 / 10;
                  const decay = 2 / 3;
                  const time = 200;
                  let doppler = 1;
                  while (iterations++ < 12) {
                     renderer.pause(time * iterations).then(() => {
                        const ech = sounds.upgrade.instance(renderer);
                        ech.rate.value = r * doppler;
                        ech.gain.value *= 0.8 * mix;
                        mix *= decay;
                        doppler -= 0.01;
                     });
                  }
               }
               spr.scale.modulate(renderer, 600, 7);
               spr.alpha.modulate(renderer, 600, 0, 0).then(() => {
                  renderer.detach('menu', spr);
               });
            } else {
               SAVE.data.n.hp > 0 && shake();
               sounds.bomb.instance(renderer);
               spr.tint = void 0;
               spr.alpha.value = 0.5;
               spr.alpha.modulate(renderer, 300, 1).then(async () => {
                  await renderer.pause(300);
                  await spr.alpha.modulate(renderer, 300, 0);
                  renderer.detach('menu', spr);
               });
            }
            !ended && box.sy < 65 && (await renderer.pause(CosmosMath.remap(box.sy, 0, 1000, 65, 24)));
         }
         ended || (await renderer.when(() => ended));
         await timeIndicator.position.modulate(
            renderer,
            400,
            timeIndicator.position.subtract(0, 16),
            timeIndicator.position.subtract(0, 16)
         );
         renderer.detach('menu', timeIndicator);
      })();
      const q = (...p: Promise<void>[]) => void promises.push(...p);
      let trueTurns = 0;
      const recentTurns: number[] = (battler.volatile[0].container.metadata.recent ??= []);
      if (turns < 13) {
         trueTurns = turns;
      } else if (turns % 3 === 0) {
         trueTurns = ((turns - 1) % 12) + 1;
      } else {
         while (trueTurns === 0 || recentTurns.includes(trueTurns)) {
            trueTurns = [ 2, 4, 5, 7, 8, 10, 11 ][rng.pattern.int(7)];
         }
      }
      recentTurns.push(trueTurns);
      recentTurns.length > 5 && void recentTurns.shift();
      switch (trueTurns) {
         case 1: {
            await brez(80, 65);
            boxed = true;
            let ii = 0;
            while (ii++ < 4) {
               let angle = 0;
               let index = 0;
               const time = renderer.time;
               const extent = new CosmosValue(210);
               const detacs = [] as (() => void)[];
               const subpromises = [] as Promise<void>[];
               while (index < 12) {
                  const si = index++;
                  const { bullet, detached, detach } = mta.fodder(false);
                  subpromises.push(detached);
                  detacs.push(detach);
                  bullet.on('tick', function () {
                     this.position.set(
                        battler.box.position.endpoint(
                           angle + (si / 12) * 360,
                           sineWaver(time, 3000, extent.value - 4, extent.value + 4)
                        )
                     );
                  });
               }
               extent.modulate(renderer, 3000, 8, 8).then(async () => {
                  await renderer.pause(2000);
                  await extent.modulate(renderer, 3000, 8, 210);
                  for (const detach of detacs) {
                     detach();
                  }
               });
               const ticker = () => (angle += 4);
               renderer.on('render', ticker);
               promises.push(...subpromises);
               await Promise.race([
                  renderer.pause(1000),
                  Promise.all(subpromises).then(() => {
                     renderer.off('render', ticker);
                  })
               ]);
            }
            break;
         }
         case 2: {
            await brez(80, 65);
            boxed = true;
            let i = 5;
            let s = rng.attack.next() < 0.5 ? -1 : 1;
            while (i > 0) {
               q(mtb.sidearm(s as 1 | -1, 160, -50, 3, 60, 0));
               await renderer.pause(200);
               q(mtb.sidearm(s as 1 | -1, 160, -50, 3, 60, 0));
               await renderer.pause(1500);
               i--;
               s *= -1;
            }
            break;
         }
         case 3:
         case 9: {
            await brez(80, 65);
            boxed = true;
            q(mtb.blaster(void 0, void 0, 9000));
            let i = 15;
            while (i > 0) {
               q(mtb.meteor(rng.attack.next(), void 0, 800));
               await renderer.pause(500);
               i--;
            }
            break;
         }
         case 4: {
            await brez(80, 65);
            boxed = true;
            let i = 8;
            while (i > 0) {
               q(mtb.rocket());
               await renderer.pause(1000);
               i--;
            }
            break;
         }
         case 5: {
            await brez(80, 65);
            boxed = true;
            let e = 0;
            while (e++ < 200) {
               const s = Math.floor(rng.attack.next() * 4);
               const { bullet, detach, detached } = mta.fodder(true, {
                  position: {
                     x: s === 1 || s === 3 ? box.x1 + box.sx * rng.attack.next() : s === 0 ? 330 : -10,
                     y: s === 0 || s === 2 ? box.y1 + box.sy * rng.attack.next() : s === 1 ? 250 : -10
                  },
                  velocity: {
                     x: s === 1 || s === 3 ? 0 : s === 0 ? -6 : 6,
                     y: s === 0 || s === 2 ? 0 : s === 0 ? -6 : 6
                  }
               });
               bullet.on('tick', function () {
                  if (screenCheck(this, 10)) {
                     detach();
                  } else if (this.metadata.shot) {
                     boxCheck(this, 10) && this.velocity.set(this.velocity.multiply(1.1));
                  }
               });
               q(detached);
               await renderer.pause(66);
            }
            break;
         }
         case 6:
         case 12: {
            await brez(80, 65);
            boxed = true;
            const container = battler.volatile[0].container;
            const spr = container.objects[0];
            const body = spr.objects[5] as CosmosAnimation;
            spr.metadata.bodyActive = true;
            await renderer.when(() => body.index === 5);
            const basePosition = container.position.add(spr).add(body).add(-1, 56.5);
            const wt = renderer.time;
            const heartAnim = new CosmosAnimation({ anchor: 0, resources: content.ibcMettatonNeoHeart });
            const heart = new CosmosHitbox<ShootableEvents, {}>({
               anchor: 0,
               size: 10,
               position: basePosition,
               objects: [ heartAnim ],
               priority: 20
            }).on('tick', function () {
               this.position.set(basePosition.add(sineWaver(wt, 3000, -6, 6), sineWaver(wt, 1500, -3, 3)));
            });
            renderer.attach('menu', heart);
            await renderer.pause(100);
            heartAnim.index = 1;
            let done = false;
            await Promise.all([
               (async () => {
                  const c = renderer.when(() => done);
                  const cFrames = (t: number) => Promise.race([ c, renderer.pause(t) ]);
                  const dBullet = (f: () => void) => done || f();
                  let br = 0;
                  const bl = new CosmosObject({ metadata: { x: 0 } }).on('tick', function () {
                     this.position.set(heart.position);
                     if (this.metadata.x === 0) {
                        this.metadata.x = rng.attack.next() < 0.5 ? 2 : 4;
                        renderer.attach(
                           'menu',
                           ...CosmosUtils.populate(2, index =>
                              new CosmosHitbox<
                                 ShootableEvents,
                                 { bullet: boolean; damage: number; shootable: boolean }
                              >({
                                 anchor: 0,
                                 size: { x: 30, y: 5 },
                                 metadata: { bullet: true, damage: 6, shootable: true },
                                 scale: { x: 1 / 16 },
                                 position: bl,
                                 priority: 1,
                                 rotation: br + index * 180,
                                 velocity: CosmosMath.ray(br + index * 180, 4),
                                 objects: [ new CosmosSprite({ alpha: 0.8, anchor: 0, frames: [ content.ibbDummyknife ] }) ]
                              })
                                 .on('shot', function (a, b) {
                                    this.velocity.set(this.velocity.endpoint(a, 15 / (b / 5)));
                                    const { x, y } = CosmosMath.ray(a, 1);
                                    this.spin.value += y < 0 ? -2 - x * 10 : 2 + x * 10;
                                 })
                                 .on('tick', function () {
                                    if (screenCheck(this, 10)) {
                                       renderer.detach('menu', this);
                                    } else {
                                       this.scale.x < 1 && (this.scale.x *= 2);
                                       const e = quickshadow(this.objects[0] as CosmosSprite, this, void 0, 0.4);
                                       e.rotation.value = this.rotation.value;
                                       e.priority.value = 0;
                                    }
                                 })
                           )
                        );
                        br += 360 / 5 + 4;
                     } else {
                        this.metadata.x--;
                     }
                  });
                  renderer.attach('menu', bl);
                  switch (trueTurns) {
                     case 6: {
                        while (!done) {
                           dBullet(() => q(mtb.meteor()));
                           await cFrames(1000);
                        }
                        break;
                     }
                     case 12: {
                        await cFrames(1000);
                        while (!done) {
                           dBullet(() => q(mtb.paratrooper()));
                           await cFrames(1000);
                        }
                        break;
                     }
                  }
                  renderer.detach('menu', bl);
               })(),
               renderer.pause(7000 + trueTurns * 500).then(async () => {
                  done = true;
                  await heart.position.modulate(renderer, 300, basePosition, basePosition);
                  await renderer.pause(100);
                  heartAnim.index = 0;
                  await renderer.pause(100);
                  spr.metadata.bodyActive = false;
                  await renderer.when(() => body.index === 4);
                  renderer.detach('menu', heart);
               })
            ]);
            break;
         }
         case 7: {
            await brez(80, 65);
            boxed = true;
            let i = 8;
            while (i > 0) {
               q(mtb.paratrooper());
               await renderer.pause(300);
               q(mtb.paratrooper());
               await renderer.pause(300);
               q(mtb.sidearm(void 0, 160, -50, 3, 60, 0));
               await renderer.pause(1200);
               i--;
            }
            break;
         }
         case 8: {
            positionsOverride = true;
            positions.splice(0);
            await brez(120, 65);
            boxed = true;
            const cl = 5;
            const sd = box.sx / cl;
            const rex = CosmosUtils.populate(cl - 1, index => {
               const rect = (
                  mta.laser(90, 0, 0, 120, 'white', {
                     position: { x: box.x1 + (index + 1) * sd, y: box.y }
                  }) as CosmosHitbox<ShootableEvents>
               )
                  .on('shot', function () {
                     this.metadata.shottimer ??= -Infinity;
                     if (
                        this.metadata.shottimer <= renderer.time &&
                        Math.abs(this.position.x - battler.SOUL.position.x) < sd
                     ) {
                        this.metadata.shottimer = renderer.time + 1000;
                     }
                  })
                  .on('tick', function () {
                     this.metadata.shottimer ??= -Infinity;
                     if (this.metadata.shottimer <= renderer.time) {
                        if (this.metadata.color !== 'white') {
                           this.metadata.color = 'white';
                           this.objects[0].fill = 0xffffff;
                        }
                     } else if (this.metadata.color !== 'orange') {
                        this.metadata.color = 'orange';
                        this.objects[0].fill = 0xff993d;
                        sounds.noise.instance(renderer);
                     }
                  });
               rect.metadata.shootable = true;
               return rect;
            });
            renderer.attach('menu', ...rex);
            await renderer.pause(500);
            let i = 9;
            while (i > 0) {
               positions.splice(0);
               const si = Math.floor((battler.SOUL.position.x - box.x1) / sd);
               const asi = si + (rng.attack.next() < 0.5 ? -1 : 1);
               positions.push(si, asi);
               q(mtb.meteor(bwsp(box.x1 + sd * (si + 0.5)), void 0, 1000));
               await renderer.pause(200);
               if (asi > -1 && asi < cl && !(si === 0 && asi === 1) && !(si === cl - 1 && asi === cl - 2)) {
                  q(mtb.meteor(bwsp(box.x1 + sd * (asi + 0.5)), void 0, 1000));
               }
               await renderer.pause(1500);
               i--;
            }
            post_end = () => void renderer.detach('menu', ...rex);
            break;
         }
         case 10: {
            await brez(80, 65);
            boxed = true;
            let i = 4;
            while (i > 0) {
               q(mtb.rocket());
               await renderer.pause(1000);
               q(mtb.paratrooper());
               await renderer.pause(200);
               q(mtb.paratrooper());
               await renderer.pause(200);
               q(mtb.paratrooper());
               await renderer.pause(1200);
               i--;
            }
            break;
         }
         case 11: {
            await brez(24, 24);
            boxed = true;
            let i = 10;
            while (i > 0) {
               const DESTIEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE = CosmosMath.remap(
                  rng.attack.next(),
                  60,
                  100
               );
               const sh = new CosmosValue();
               const side = rng.attack.next() < 0.5 ? -1 : 1;
               let activated = false;
               const { bullet, detach, detached } = mta.fodder(true, {
                  position: { x: 160 + side * 100, y: 250 }
               });
               const carrier = new CosmosSprite({
                  anchor: { x: 0 },
                  frames: [ content.ibbNeoTiny2 ],
                  position: { x: bullet.position.x }
               });
               renderer.attach('menu', carrier);
               bullet.on('tick', function () {
                  if (screenCheck(this, 10)) {
                     detach();
                  } else if (!activated) {
                     if (this.position.y > DESTIEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE) {
                        const ramp = CosmosMath.bezier(
                           CosmosMath.remap(
                              this.position.y,
                              0,
                              1,
                              250,
                              DESTIEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
                           ),
                           0,
                           0,
                           1
                        );
                        const diff = CosmosMath.remap(ramp, 6, 2);
                        this.position.y -= diff;
                        carrier.position.y = this.position.y + this.scale.y * 12;
                        sh.value = ramp;
                     } else {
                        activated = true;
                        sh.value = 0;
                        carrier.spin.modulate(renderer, 100, side * -16);
                        this.spin.modulate(renderer, 50, side * -12);
                        this.velocity.set(CosmosMath.ray(this.position.angleTo(battler.SOUL), 12));
                        carrier.alpha.modulate(renderer, 1000, 0).then(() => {
                           renderer.detach('menu', carrier);
                        });
                     }
                     this.offsets[4].set(
                        new CosmosPoint(Math.random() * 2 - 1, Math.random() * 2 - 1).multiply(sh.value)
                     );
                     carrier.offsets[4].set(this.offsets[4]);
                  } else {
                     renderer.attach(
                        'menu',
                        new CosmosRectangle({
                           size: (this.objects[0] as CosmosRectangle).size,
                           scale: this.scale,
                           fill: this.objects[0].fill,
                           stroke: this.objects[0].stroke,
                           border: this.objects[0].border,
                           rotation: this.rotation.value,
                           position: this,
                           alpha: 0.7,
                           anchor: 0
                        }).on('tick', function () {
                           if ((this.alpha.value *= 0.6) < 0.04) {
                              renderer.detach('menu', this);
                           }
                        })
                     );
                  }
               });
               q(detached);
               await renderer.pause(1200);
               i--;
            }
            break;
         }
      }
      await Promise.all(promises);
      ended = true;
      await shielder;
      if (hits > 0) {
         vars.ap ??= 0;
         const startAP = 1 - vars.ap;
         vars.ap += hits / (SAVE.data.b.a_state_awaiter ? 300 : 200);
         const trueDamage = startAP - (1 - vars.ap);
         vars.ap > 1 && (vars.ap = 1);

         // sprite calculation
         const next = volatile.container.objects[0];
         const half = new CosmosPoint((next.metadata.size as CosmosPointSimple) || next.compute()).divide(2);
         const base = volatile.container.position.add(next.position.subtract(half.add(half.multiply(next.anchor))));

         const barsize = Math.max(half.x * next.scale.x * 2, 60) * 1.25;
         const healthbar = new CosmosRectangle({
            anchor: 0,
            position: base.add(half.x, -7).clamp({ x: 1 + barsize / 2, y: 25 }, { x: 319 - barsize / 2, y: 215 }),
            stroke: 0,
            fill: 0x404040,
            size: { y: 7.5, x: barsize },
            border: 0.5
         });
         const healthbarFill = new CosmosRectangle({
            anchor: { y: 0 },
            position: { x: barsize / -2 + 0.25 },
            fill: 0x007fff,
            stroke: -1,
            size: { y: 7, x: Math.ceil((barsize - 0.5) * startAP * 2) / 2 }
         });
         const dmgtext = Math.round(trueDamage * 200).toString();
         const indicator = new CosmosHitbox({
            position: { x: (dmgtext.length * 14 + (dmgtext.length - 1)) / -2 },
            objects: dmgtext.split('').map((value, index) => {
               const anim = new CosmosAnimation({
                  anchor: { y: 1 },
                  scale: 2,
                  position: { x: index * 15, y: -3.875 - 0.5 },
                  resources: content.ibuIndicator
               });
               anim.index = +value;
               return anim;
            })
         });
         healthbar.attach(healthbarFill, indicator);

         // strike animations
         volatile.container.objects[0] = next;
         renderer.attach('menu', healthbar);
         indicator.position.modulate(renderer, 850, { y: -20 }, { y: -20 }, { y: 2 }).then(() => {
            indicator.position.modulate(renderer, 100, {}, { y: 0 });
         });
         healthbarFill.size.modulate(renderer, 400, {
            x: Math.floor((barsize - 0.5) * (1 - vars.ap) * 2) / 2
         });

         // strike sfx
         sounds.strike.instance(renderer);
         const striker = sounds.superstrike.instance(renderer);
         striker.gain.value = CosmosMath.bezier(hits / 15, 0, 0, 0, striker.daemon.gain);
         hits < 10 || renderer.pause(300).then(() => heal(4));
         let index = 30;
         const origin = next.position.y;
         const zbf = next.filters![2] as ZoomBlurFilter;
         zbf.strength = 0.25;
         while (index-- > 0) {
            if (index > 0) {
               next.position.y = origin + Math.floor(index / 3) * (Math.floor((index % 4) / 2) * 2 - 1);
            } else {
               next.position.y = origin;
            }
            await renderer.on('tick');
            zbf.strength *= 3 / 4;
         }
         zbf.strength = 0;

         // end animations
         renderer.detach('menu', healthbar);
      }
      post_end?.();
   },
   async mettatonA (idx: number, ftester = (async () => {})()) {
      switch (idx) {
         case 0: {
            const bloom = new AdvancedBloomFilter({ threshold: 0, brightness: 1, bloomScale: 0 });
            const brightnessMod = {
               get value () {
                  return bloom.bloomScale;
               },
               set value (value) {
                  bloom.bloomScale = value;
               }
            };
            const lighter = new CosmosAnimation({
               alpha: 0,
               scale: { y: 20 },
               resources: content.ibbBluelightning,
               position: 160,
               anchor: 0,
               active: true,
               filters: [ bloom ],
               area: renderer.area
            });
            renderer.detach('menu', battler.SOUL);
            battler.bullets.attach(lighter, battler.SOUL);
            await Promise.all([
               lighter.alpha.modulate(renderer, 600, 1, 1),
               lighter.scale.modulate(renderer, 600, 1, 1, 1)
            ]);
            sounds.smallelectroshock.instance(renderer);
            const recto = new CosmosRectangle({
               alpha: 0,
               priority: 10000,
               fill: 0xffffff,
               size: { x: 320, y: 240 }
            });
            battler.bullets.attach(recto);
            recto.alpha.modulate(renderer, 300, 1, 1);
            await CosmosValue.prototype.modulate.call(brightnessMod, renderer, 500, 10);
            battler.SOUL.metadata.color = 'cyan';
            lighter.alpha.value = 0;
            await recto.alpha.modulate(renderer, 300, 0);
            battler.bullets.objects = [];
            renderer.attach('menu', battler.SOUL);
            await renderer.pause(1000);
            break;
         }
         case 1: {
            let st = 0;
            const dir = rng.attack.next() < 0.5 ? 0 : 1;
            const { detach, detached } = bulletSetup(
               new CosmosHitbox({
                  anchor: 0,
                  metadata: { bullet: true, damage: 1, papyrus: true },
                  size: 10,
                  priority: 1,
                  velocity: { x: [ 1, -1 ][dir] },
                  position: pastBox(10, [ 3, 1 ][dir]).position,
                  objects: [ new CosmosAnimation({ anchor: 0, resources: content.ibbLightning }) ]
               }).on('tick', function () {
                  switch (st) {
                     case 0:
                        if (Math.abs(box.x - this.position.x) < box.sx / 2 - 10) {
                           const c = sounds.stab.instance(renderer);
                           c.rate.value = 1.3;
                           c.gain.value *= 0.6;
                           this.velocity.x = [ 6, -6 ][dir];
                           st = 1;
                        }
                        break;
                     case 1:
                        quickshadow(this.objects[0] as CosmosSprite, this).priority.value = 0;
                        screenCheck(this, 10) && detach();
                        break;
                  }
               })
            );
            ftester.then(() => detach());
            await detached;
            break;
         }
      }
   },
   async rg (
      sparable: boolean,
      progress: 0 | 1 | 2,
      killed: -1 | 0 | 1,
      modifier: 'cf' | 'gr' | null,
      totalTugScore: number
   ) {
      if (sparable || (killed > -1 && progress === 2)) {
         await renderer.pause(450);
         return;
      }
      let tugScore = 0;
      const t = renderer.time;
      const bros = world.bad_lizard > 1;
      const bulletDelay = [ 1000, 750, bros ? 750 : 1500 ][killed + 1];
      if (modifier === 'gr') {
         const tt = events.on('turn-timer');
         const special = new CosmosHitbox({
            anchor: 0,
            size: 16,
            metadata: { detected: false },
            objects: [
               new CosmosSprite({ anchor: 0, frames: [ content.ibcRoyalguardFist ] }).on('tick', function () {
                  this.tint = CosmosImageUtils.gradient(
                     0x00ff00,
                     0xcc3300,
                     Math.min(Math.max(totalTugScore + tugScore, 0), 1)
                  );
               })
            ]
         }).on('tick', function () {
            const v = sineWaver(t, 3000, -1, 1, 1 / 8);
            this.position.set(battler.box.position.add(v * 50, sineWaver(t, 3000 / 2, -1, 1, 1 / 8) * 20));
            this.scale.set(1, CosmosMath.bezier(Math.abs(v), 1, 1, 0.5));
            this.calculate();
            const detected = renderer.detect(battler.SOUL, this).length > 0;
            if (detected !== this.metadata.detected) {
               if ((this.metadata.detected = detected)) {
                  const bel1 = sounds.bell.instance(renderer);
                  tt.then(() => bel1.stop());
                  tugScore += 1 / 12;
               }
            }
         });
         renderer.attach('menu', special);
         tt.then(() => renderer.detach('menu', special));
      }
      if (battler.pattern('rg', [ true, false ])) {
         let i1 = 0;
         while (i1 < 2) {
            const index1 = i1++;
            if (index1 === killed) {
               continue;
            }
            const bshake = bros ? false : index1 === 0 && (killed === 1 || progress === 1);
            const region = new CosmosPoint([ box.x1, box.x ][index1], box.y1);
            bulletSequence(
               async (
                  detachers,
                  state,
                  sndExceptTheNameWasAlreadyTakenSoImUsingThisInsteadGotAProblemWithThatNoOkayGoodVeryGoodNowGetOnWithYourLifeMyGoodSirOrMadamOrAnythingInBetweenReallyYeahYouJustGetOnWithItNowOkayBye
               ) => {
                  const yfactor = rng.attack.next() * 20;
                  const shad = new CosmosSprite({
                     alpha: 0,
                     anchor: 0,
                     frames: [ content.ibbStardrop ],
                     position: region.add(
                        rng.attack.next() * (box.sx / 2),
                        rng.attack.next() < 0.5 ? yfactor : box.sy - yfactor
                     )
                  });
                  const unshad = () => renderer.detach('menu', shad);
                  detachers.push(unshad);
                  renderer.attach('menu', shad);
                  const bs = [ 600, 300, bros ? 300 : 900 ][killed + 1] + (bros ? 250 : 0);
                  shad.alpha.modulate(renderer, 400 + bs, 0.7);
                  renderer.pause(400).then(async () => {
                     if (!state.b) {
                        return;
                     }
                     const { bullet, detach, detached } = bulletSetup(
                        new CosmosHitbox({
                           position: { x: [ -10, 330 ][index1], y: shad.position.y },
                           anchor: 0,
                           size: 8,
                           rotation: 45,
                           metadata: { bullet: true, damage: 5 },
                           objects: [ new CosmosSprite({ anchor: 0, frames: [ content.ibbStardrop ], rotation: -45 }) ]
                        }).on('tick', function () {
                           if (this.spin.value === 0) {
                              const spr = quickshadow(this.objects[0] as CosmosSprite, this, battler.bullets);
                              spr.rotation.value = this.rotation.value - 45;
                           }
                        })
                     );
                     detachers.push(detach);
                     let hit = false;
                     const snd =
                        sndExceptTheNameWasAlreadyTakenSoImUsingThisInsteadGotAProblemWithThatNoOkayGoodVeryGoodNowGetOnWithYourLifeMyGoodSirOrMadamOrAnythingInBetweenReallyYeahYouJustGetOnWithItNowOkayBye(
                           sounds.sword.instance(renderer)
                        );
                     snd.gain.value *= 1.6;
                     snd.rate.value = 0.85;
                     detachers.push(() => snd.stop());
                     renderer.pause(400).then(async () => {
                        await snd.gain.modulate(renderer, 400, 0);
                        snd.stop();
                     });
                     const hitpromise = detached.then(() => {
                        hit = true;
                        snd.stop();
                     });
                     let avValue = shad.position.angleTo(bullet);
                     let evValue = shad.position.extentOf(bullet);
                     await Promise.race([
                        hitpromise,
                        Promise.all([
                           new CosmosValueLinked({
                              get value () {
                                 return avValue;
                              },
                              set value (v) {
                                 bullet.position.set(shad.position.endpoint(v, evValue));
                                 avValue = v;
                              }
                           }).modulate(renderer, bs, avValue + 90),
                           new CosmosValueLinked({
                              get value () {
                                 return evValue;
                              },
                              set value (v) {
                                 bullet.position.set(shad.position.endpoint(avValue, v));
                                 evValue = v;
                              }
                           }).modulate(renderer, bs, 0),
                           bullet.rotation.modulate(renderer, bs, [ 360 * 2, 360 * -2 ][index1] + 45)
                        ])
                     ]);
                     if (!state.b) {
                        return;
                     }
                     if (hit) {
                        await shad.alpha.modulate(renderer, 300, 0);
                        if (!state.b) {
                           return;
                        }
                     } else {
                        bullet.rotation.value = 45;
                     }
                     unshad();
                     if (hit) {
                        return;
                     }
                     bullet.spin.value = [ 5, -5 ][index1];
                     const rad = rand_rad(rng.attack.next());
                     let i2 = 0;
                     while (i2 < 6) {
                        const index = i2++;
                        const spr = new CosmosAnimation({ anchor: 0, resources: content.ibbFrogstar });
                        const shaker = new CosmosValue();
                        const { detach } = bulletSetup(
                           new CosmosHitbox({
                              anchor: 0,
                              size: 2,
                              position: bullet,
                              scale: 1.5,
                              metadata: { bullet: true, damage: 5, shaken: false },
                              velocity: CosmosMath.ray(index * (360 / 6), [ 4, 5, bros ? 6 : 3 ][killed + 1]),
                              objects: [ spr ],
                              acceleration: bshake ? 0.975 : 1
                           }).on('tick', function () {
                              if (boxCheck(this, 5)) {
                                 detach();
                              } else {
                                 const threshold = rng.attack.next() / 2 + 0.5;
                                 if (bshake && !this.metadata.shaken) {
                                    if ((shaker.value += 1 / 90) > threshold) {
                                       this.metadata.shaken = true;
                                       this.velocity.set(rad.next() * 2 - 1, -0.5 - rad.next() * 0.5);
                                       this.gravity.y = 0.2;
                                    } else {
                                       this.offsets[0].set(
                                          (Math.random() - 0.5) * shaker.value * 3,
                                          (Math.random() - 0.5) * shaker.value * 3
                                       );
                                    }
                                 }
                                 quickshadow(
                                    spr,
                                    this.position.add(this.offsets[0]),
                                    battler.bullets,
                                    void 0
                                 ).scale.set(1.5);
                              }
                           })
                        );
                        detachers.push(detach);
                     }
                     await Promise.race([
                        hitpromise,
                        Promise.all([
                           bullet.scale.modulate(renderer, 500, 3, 3),
                           bullet.alpha.modulate(renderer, 500, 0)
                        ])
                     ]);
                     if (!state.b) {
                        return;
                     }
                     detach();
                  });
                  await renderer.pause(bulletDelay);
               }
            );
         }
      } else if (bros) {
         let i = 0;
         while (i < 2) {
            const index = i++;
            if (index === killed) {
               continue;
            }
            bulletSequence(async detachers => {
               const rotoffset = 15 + rng.attack.next() * 90;
               const holder = new CosmosObject({
                  position: {
                     x: killed > -1 ? box.x : [ box.x1 + 5, box.x2 - 5 ][index],
                     y: [ box.y1 - 35, box.y2 + 35 ][index]
                  },
                  velocity: { y: [ 1, -1 ][index] * (killed > -1 ? 4 : 3) },
                  objects: CosmosUtils.populate(
                     3,
                     j =>
                        new CosmosHitbox({
                           size: { x: 4, y: 34 },
                           anchor: { x: 0, y: 1 },
                           metadata: { bullet: true, damage: 5 },
                           objects: [
                              new CosmosSprite({
                                 frames: [ content.ibbFalchion ],
                                 anchor: { x: 0, y: 1 },
                                 position: { y: -1 }
                              })
                           ],
                           spin: killed > -1 ? -6 : -5,
                           rotation: j * (360 / 3) + [ 0, 90 ][index] + rotoffset
                        })
                  )
               }).on('tick', function () {
                  boxCheck(this, 40) && de();
               });
               const de = () => battler.bullets.detach(holder);
               detachers.push(de);
               battler.bullets.attach(holder);
               await renderer.pause(bulletDelay);
            });
         }
      } else {
         let i1 = 0;
         let i2 = 0;
         while (i1 < 2) {
            const index1 = i1++;
            if (index1 === killed) {
               continue;
            }
            const sideIndex = i2++;
            bulletSequence(async (detachers, state, snd) => {
               let i3 = 0;
               const bulletLimit = [ 2, 4, bros ? 4 : 1 ][killed + 1];
               const bshake = bros ? false : index1 === 0 && (killed === 1 || progress === 1);
               while (i3 < bulletLimit) {
                  const bulletIndex = i3++;
                  sideIndex === 0 && bulletIndex === 0 && snd(sounds.appear.instance(renderer));
                  const orig = { x: [ box.x1 - 1, box.x2 + 1 ][index1], y: box.y1 + rng.attack.next() * box.sy };
                  const shaker = new CosmosValue();
                  const { bullet, detach, detached } = bulletSetup(
                     new CosmosHitbox({
                        area: renderer.area,
                        position: orig,
                        anchor: { y: 0 },
                        size: { y: 7, x: 1000 },
                        scale: { x: [ -1, 1 ][index1] },
                        metadata: { bullet: true, damage: 5 },
                        objects: [
                           new CosmosSprite({ anchor: { y: 0 }, frames: [ content.ibbHaymaker ] }).on(
                              'tick',
                              function () {
                                 this.offsets[0].set(
                                    shaker.value * (Math.random() * 2 - 1),
                                    shaker.value * (Math.random() * 2 - 1)
                                 );
                              }
                           )
                        ]
                     })
                  );
                  detachers.push(detach);
                  let hit = false;
                  const hitpromise = detached.then(() => (hit = true));
                  const tt1 = [ 500, 350, bros ? 350 : 650 ][killed + 1];
                  const tt2 = [ 750, 250, bros ? 250 : 1250 ][killed + 1];
                  const tt3 = [ 1000, 750, bros ? 750 : 1250 ][killed + 1];
                  Promise.race([
                     hitpromise,
                     Promise.all([
                        bullet.position
                           .modulate(renderer, tt1, { x: [ box.x1 + 7, box.x2 - 7 ][index1] })
                           .then(() => renderer.pause(tt2)),
                        bshake ? shaker.modulate(renderer, tt1 + tt2, 2) : void 0
                     ])
                  ]).then(async () => {
                     if (!state.b) {
                        return;
                     }
                     sideIndex === 0 && bulletIndex === 0 && snd(sounds.stab.instance(renderer));
                     if (hit) {
                        return;
                     }
                     const reachX = { x: [ box.x1 + 90, box.x2 - 90 ][index1] };
                     await Promise.race([
                        hitpromise,
                        Promise.all([
                           bullet.position.modulate(renderer, tt3, reachX, reachX, reachX, orig),
                           bshake ? shaker.modulate(renderer, tt3, 4, 4) : void 0
                        ])
                     ]);
                     if (!state.b) {
                        return;
                     }
                     detach();
                  });
               }
               await renderer.pause(bulletDelay);
            });
         }
      }
      await battler.turnTimer(10000);
      return tugScore;
   },
   async glyde () {
      if (battler.pattern('glyde', [ true, false ])) {
         const pxr = 3 * 1.1;
         bulletSequence(async (detachers, state, snd) => {
            const position = glydeAntenna();
            const pxp = (position.x - box.x1) / box.sx;
            const { bullet, detach, detached } = bulletSetup(
               new CosmosHitbox({
                  anchor: 0,
                  size: 8,
                  position,
                  rotation: rng.attack.next() * 360,
                  metadata: { bullet: true, damage: 5, t: renderer.time },
                  spin: rng.attack.next() * 10 - 5,
                  velocity: { x: CosmosMath.remap(rng.attack.next(), pxp * -pxr, (1 - pxp) * pxr), y: -2 },
                  gravity: { y: 0.5 },
                  objects: [
                     new CosmosSprite({ anchor: 0, frames: [ content.ibbPlusSign ] }),
                     new CosmosSprite({ anchor: 0, frames: [ content.ibbPlusSign ], rotation: 45, alpha: 0 })
                  ]
               }).on('tick', function () {
                  if (box.y2 <= this.position.y) {
                     detach();
                  } else {
                     const phase = ((renderer.time - this.metadata.t) % 800) / 800;
                     const phasedAlpha = CosmosMath.linear(phase, 1, 1, 1, 1, 0, 0, 0, 0, 1);
                     this.objects[0].alpha.value = phasedAlpha;
                     this.objects[1].alpha.value = 1 - phasedAlpha;
                     if (this.position.y > box.y1 + 10 && this.filters === null) {
                        this.area = renderer.area!;
                        this.filters = [ battler.clipFilter! ];
                     }
                  }
               }),
               true,
               null
            );
            detachers.push(detach);
            detached.then(async () => {
               if (!state.b) {
                  return;
               }
               const r = new CosmosHitbox({
                  size: { x: 12, y: box.sy },
                  anchor: { x: 0, y: 1 },
                  position: { x: bullet.position.x, y: box.y2 },
                  metadata: { bullet: true, damage: 5 },
                  objects: [ new CosmosRectangle({ fill: 0xffffff, anchor: { x: 0, y: 1 }, size: { x: 12, y: box.sy } }) ]
               });
               battler.bullets.attach(r);
               detachers.push(() => battler.bullets.detach(r));
               snd(sounds.bomb.instance(renderer));
               shake();
               r.scale.modulate(renderer, 500, { x: 1 }, { x: 1 }, { x: 0 }).then(() => {
                  battler.bullets.detach(r);
               });
               const s = bulletSetup(
                  new CosmosHitbox({
                     anchor: 0,
                     metadata: { bullet: true, damage: 5, stage: 0 },
                     position: { x: bullet.position.x, y: box.y1 - 10 },
                     size: { x: 10, y: 16 },
                     velocity: { y: 12 },
                     objects: [ new CosmosSprite({ frames: [ content.ibbSoda ], anchor: 0 }) ]
                  }).on('tick', function () {
                     switch (this.metadata.stage) {
                        case 0:
                           if (box.y2 - 10 <= this.position.y) {
                              this.metadata.stage = 1;
                              this.gravity.y = 0.5;
                              this.velocity.set(rng.attack.next() < 0.5 ? -2 : 2, -7);
                              this.position.y = box.y2 - 10;
                              this.spin.value = rng.attack.next() * 40 - 20;
                              shake();
                              snd(sounds.burst.instance(renderer));
                           } else {
                              quickshadow(this.objects[0] as CosmosSprite, this, battler.bullets);
                           }
                           break;
                        case 1:
                           boxCheck(this, 15) && detach();
                           break;
                     }
                  })
               );
               detachers.push(s.detach);
               snd(sounds.arrow.instance(renderer));
            });
            await renderer.pause(1200);
         });
      } else {
         const pxr = 3 * 1.21;
         bulletSequence(async (detachers, state, snd) => {
            let sup = 0;
            while (sup < 5) {
               const suplocal = sup++;
               const position = glydeAntenna();
               const pxp = (position.x - box.x1) / box.sx;
               const { detach } = bulletSetup(
                  new CosmosHitbox({
                     anchor: 0,
                     size: 8,
                     position,
                     rotation: rng.attack.next() * 360,
                     metadata: { bullet: true, damage: 5, t: renderer.time, stage: 0 },
                     spin: rng.attack.next() * 10 - 5,
                     velocity: { x: CosmosMath.remap(suplocal / 4, pxp * -pxr, (1 - pxp) * pxr) - 0.2, y: -2 },
                     gravity: { y: 0.5 },
                     objects: [
                        new CosmosSprite({ anchor: 0, frames: [ content.ibbPlusSign ] }),
                        new CosmosSprite({ anchor: 0, frames: [ content.ibbPlusSign ], rotation: 45, alpha: 0 })
                     ]
                  }).on('tick', async function () {
                     const phase = ((renderer.time - this.metadata.t) % 800) / 800;
                     const phasedAlpha = CosmosMath.linear(phase, 1, 1, 1, 1, 0, 0, 0, 0, 1);
                     this.objects[0].alpha.value = phasedAlpha;
                     this.objects[1].alpha.value = 1 - phasedAlpha;
                     switch (this.metadata.stage) {
                        case 0:
                           if (box.y1 - 10 <= this.position.y) {
                              this.metadata.stage = 1;
                              this.gravity.y = 0;
                              this.velocity.set(0);
                              this.position.y = box.y1 - 10;
                              if (suplocal === 4) {
                                 snd(sounds.landing.instance(renderer));
                                 shake();
                              }
                              await renderer.pause(200);
                              if (!state.b) {
                                 return;
                              }
                              suplocal === 4 && snd(sounds.arrow.instance(renderer));
                              const p = battler.SOUL.position.value();
                              this.metadata.stage = 2;
                              await this.position.modulate(renderer, 600, p);
                              if (!state.b) {
                                 return;
                              }
                              this.metadata.stage = 3;
                              detach();
                              if (suplocal === 4) {
                                 const s = bulletSetup(
                                    new CosmosHitbox({
                                       anchor: 0,
                                       size: 8,
                                       position: p,
                                       rotation: rng.attack.next() * 360,
                                       metadata: { bullet: true, damage: 5, t: renderer.time },
                                       spin: 4 * (rng.attack.next() < 0.5 ? -1 : 1),
                                       objects: [
                                          new CosmosSprite({ anchor: 0, frames: [ content.ibbPlusSign ] }),
                                          new CosmosSprite({
                                             anchor: 0,
                                             frames: [ content.ibbPlusSign ],
                                             rotation: 45,
                                             alpha: 0
                                          })
                                       ]
                                    }).on('tick', function () {
                                       const phase = ((renderer.time - this.metadata.t) % 800) / 800;
                                       const phasedAlpha = CosmosMath.linear(phase, 1, 1, 1, 1, 0, 0, 0, 0, 1);
                                       this.objects[0].alpha.value = phasedAlpha;
                                       this.objects[1].alpha.value = 1 - phasedAlpha;
                                       if (this.position.y > box.y1 + 10 && this.filters === null) {
                                          this.area = renderer.area!;
                                          this.filters = [ battler.clipFilter! ];
                                       }
                                    }),
                                    true,
                                    null
                                 );
                                 detachers.push(s.detach);
                                 renderer.pause(400).then(() => {
                                    state.b && (s.bullet.metadata.bullet = false);
                                 });
                                 snd(sounds.bomb.instance(renderer));
                                 shake();
                                 let ix = 0;
                                 while (ix < 12) {
                                    const t = bulletSetup(
                                       new CosmosHitbox({
                                          anchor: 0,
                                          size: 8,
                                          position: s.bullet,
                                          rotation: rng.attack.next() * 360,
                                          metadata: { bullet: true, damage: 5, t: renderer.time },
                                          spin: rng.attack.next() * 10 - 5,
                                          scale: 3 / 4,
                                          velocity: CosmosMath.ray((ix / 12) * 360, 2.5),
                                          objects: [
                                             new CosmosSprite({ anchor: 0, frames: [ content.ibbPlusSign ] }),
                                             new CosmosSprite({
                                                anchor: 0,
                                                frames: [ content.ibbPlusSign ],
                                                rotation: 45,
                                                alpha: 0
                                             })
                                          ]
                                       }).on('tick', function () {
                                          if (boxCheck(this, 10)) {
                                             t.detach();
                                          } else {
                                             const phase = ((renderer.time - this.metadata.t) % 800) / 800;
                                             const phasedAlpha = CosmosMath.linear(phase, 1, 1, 1, 1, 0, 0, 0, 0, 1);
                                             this.objects[0].alpha.value = phasedAlpha;
                                             this.objects[1].alpha.value = 1 - phasedAlpha;
                                          }
                                       })
                                    );
                                    ix++;
                                    detachers.push(t.detach);
                                 }
                                 await Promise.all([
                                    s.bullet.scale.modulate(renderer, 600, 8),
                                    s.bullet.alpha.modulate(renderer, 600, 0)
                                 ]);
                                 if (!state.b) {
                                    return;
                                 }
                                 s.detach();
                              }
                           }
                           break;
                        case 2:
                           const e = quickshadow(this.objects[0] as CosmosSprite, this);
                           e.rotation.value = this.rotation.value;
                           detachers.push(() => renderer.detach('menu', e));
                           break;
                     }
                  }),
                  true,
                  null
               );
               detachers.push(detach);
            }
            await renderer.pause(2000);
         });
      }
   },
   pyrope (company: boolean) {
      if (battler.pattern('pyrope', [ true, false ])) {
         let seqIndex = 0;
         bulletSequence(async detachers => {
            const ix = seqIndex % 2;
            const bp = new CosmosPoint([ box.x2 + 10, box.x1 - 10 ][ix], box.y);
            const rotation = rng.attack.next() * 40 - 40 / 2;
            const yshift = new CosmosValue();
            const trueRotation = rotation - 90;
            const wall1 = bulletSetup(
               new CosmosHitbox({
                  anchor: { x: 0, y: 1 },
                  size: { x: 10, y: 120 },
                  metadata: { damage: 4, bullet: true },
                  rotation,
                  scale: 1 / 2,
                  objects: [ new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibbRope ] }) ]
               }).on('tick', function () {
                  this.position.set(bp.endpoint(trueRotation, 20 + yshift.value));
               }),
               false,
               null
            );
            detachers.push(wall1.detach);
            const flamez = CosmosUtils.populate(3, index => {
               const ybase = [ -12, 0, 12 ][index];
               const flame = bulletSetup(
                  new CosmosHitbox({
                     anchor: 0,
                     scale: 1 / 2,
                     metadata: { damage: 4, bullet: true, color: 'orange' },
                     objects: [
                        new CosmosAnimation({
                           active: true,
                           anchor: 0,
                           resources: content.ibbPyropefire,
                           tint: 0xff993d
                        })
                     ]
                  }).on('tick', function () {
                     this.position.set(bp.endpoint(trueRotation, ybase + yshift.value));
                  }),
                  false,
                  null
               );
               detachers.push(flame.detach);
               return flame;
            });
            const wall2 = bulletSetup(
               new CosmosHitbox({
                  anchor: { x: 0 },
                  size: { x: 10, y: 120 },
                  rotation,
                  metadata: { damage: 4, bullet: true },
                  scale: 1 / 2,
                  objects: [ new CosmosSprite({ anchor: { x: 0 }, frames: [ content.ibbRope ] }) ]
               }).on('tick', function () {
                  this.position.set(bp.endpoint(trueRotation, -20 + yshift.value));
               }),
               false,
               null
            );
            detachers.push(wall2.detach);
            const time = renderer.time;
            const rand = rng.attack.next();
            const xlimit = ix === 0 ? -10 - Math.abs(rotation) * 1.2 : 330 + Math.abs(rotation) * 1.2;
            const tickre = () => {
               bp.x += [ -2, 2 ][ix];
               yshift.value = sawWaver(time, 2000, -30, 30, rand);
               if (ix === 0 ? bp.x < xlimit : bp.x > xlimit) {
                  wall1.detach();
                  wall2.detach();
                  for (const flame of flamez) {
                     flame.detach();
                  }
               }
            };
            const offie = () => renderer.off('tick', tickre);
            detachers.push(offie);
            renderer.on('tick', tickre);
            Promise.all([ wall1.detached, ...flamez.map(flame => flame.detached), wall2.detached ]).then(() => {
               offie();
            });
            await renderer.pause(company ? 2000 : 1000);
            seqIndex++;
         });
      } else {
         bulletSequence(async (detachers, state, snd) => {
            let multispawn = false;
            let singlespawn = false;
            const target = new CosmosPoint(box.x1, box.y1).add(
               battler.box.size.multiply(rng.attack.next(), rng.attack.next())
            );
            const baseE = 160 + box.sx / 2 + 10;
            let ind = 0;
            while (ind < 2) {
               let a = false;
               let n = false;
               const i = ind++;
               const p = target.clone();
               const { bullet, detach, detached } = bulletSetup(
                  new CosmosHitbox({
                     anchor: 0,
                     metadata: { damage: 4, bullet: true },
                     position: target.add(baseE * [ -1, 1 ][i], 0),
                     velocity: { x: [ 4, -4 ][i] },
                     objects: [ new CosmosAnimation({ resources: content.ibbPyropebomb, anchor: 0, active: true }) ]
                  }).on('tick', function () {
                     if (multispawn) {
                        if (screenCheck(this, 15)) {
                           n = true;
                           detach();
                        }
                     } else if (i === 0 ? target.x <= this.position.x : this.position.x <= target.x) {
                        a = true;
                        detach();
                     } else {
                        const spr = quickshadow(this.objects[0] as CosmosSprite, this);
                        detachers.push(() => renderer.detach('menu', spr));
                     }
                  }),
                  true
               );
               detachers.push(detach);
               detached.then(async () => {
                  if (!state.b || singlespawn || n) {
                     return;
                  }
                  if (a) {
                     singlespawn = true;
                  } else {
                     multispawn = true;
                     p.set(bullet);
                  }
                  for (const ob of renderer.layers.menu.objects) {
                     if (ob.metadata.pyExplodable) {
                        ob.metadata.pyExplodable = false;
                        const a = p.angleTo(ob);
                        const b = p.extentOf(ob);
                        ob.velocity.set(ob.velocity.endpoint(a, 25 / (b / 3)));
                        const { x, y } = CosmosMath.ray(a, 1);
                        ob.spin.value += y < 0 ? -2 - x * 10 : 2 + x * 10;
                        ob.velocity.extent = Math.max(ob.velocity.extent, 4);
                     }
                  }
                  snd(sounds.bomb.instance(renderer));
                  shake();
                  const bom = new CosmosHitbox({
                     anchor: 0,
                     position: p,
                     size: { x: 27, y: 35 },
                     metadata: { bullet: true, damage: 4 },
                     objects: [ new CosmosSprite({ anchor: 0, frames: [ content.ibbPyropebom ] }) ]
                  }).on('tick', function () {
                     this.metadata.bullet = this.scale.x < 1.5;
                  });
                  renderer.attach('menu', bom);
                  const bomde = () => renderer.detach('menu', bom);
                  detachers.push(bomde);
                  await Promise.all([ bom.alpha.modulate(renderer, 650, 1, 0), bom.scale.modulate(renderer, 650, 2, 2) ]);
                  bomde();
               });
            }
            await renderer.pause(company ? 2000 : 1000);
         });
      }
   },
   tsundere (company: boolean, greenmode: boolean) {
      if (company || greenmode) {
         bulletSequence(async (detachers, state, snd) => {
            const anim = new CosmosAnimation({ anchor: 0, resources: content.ibbVertship });
            const { bullet, detach, detached } = bulletSetup(
               new CosmosHitbox({
                  anchor: 0,
                  metadata: { bullet: true, damage: 4, xt: 0, pyExplodable: true, moon: true },
                  position: { x: rng.attack.next() * box.sx + box.x1, y: -15 },
                  scale: 1 / 2,
                  priority: 31,
                  size: 24,
                  velocity: { y: company ? 3 : 6 }
               }),
               true
            );
            const { detach: dh2, detached: dd2 } = bulletSetup(
               new CosmosHitbox({
                  anchor: 0,
                  metadata: { bullet: true, damage: 4 },
                  position: { y: 3 },
                  size: { x: 10, y: 40 }
               }),
               bullet
            );
            if (greenmode) {
               bullet.attach(
                  new CosmosHitbox({
                     anchor: 0,
                     metadata: { trig: false },
                     scale: 2,
                     size: 24,
                     objects: [
                        new CosmosHitbox({
                           anchor: 0,
                           metadata: { trig: false },
                           position: { y: 3 },
                           size: { x: 10, y: 40 }
                        }),
                        new CosmosAnimation({ anchor: 0, index: 1, resources: content.ibbVertship })
                     ]
                  }).on('tick', function () {
                     this.calculate();
                     (this.objects[0] as CosmosHitbox).calculate();
                     if (renderer.detect(battler.SOUL, this, this.objects[0] as CosmosHitbox).length > 0) {
                        bullet.detach(this);
                        snd(sounds.bell.instance(renderer));
                        heal(4);
                        battler.hpboost.magic -= 4;
                        bullet.velocity.set(bullet.velocity.multiply(2 / 3));
                     }
                  })
               );
            }
            bullet.attach(anim);
            bullet.on('tick', function () {
               if (screenCheck(this, 20)) {
                  detach();
               } else if (this.metadata.pyExplodable) {
                  this.metadata.xt = Math.min(this.metadata.xt, 8 - this.velocity.y);
                  if (this.metadata.xt === 0) {
                     this.metadata.xt = 8 - this.velocity.y;
                     const sub = new CosmosHitbox({
                        anchor: 0,
                        scale: 1 / 3,
                        rotation: 90,
                        position: this.position.subtract(0, 8),
                        velocity: { y: this.velocity.y / -12 },
                        priority: 30,
                        size: { x: 18, y: 22 },
                        metadata: { bullet: true, damage: 4 },
                        objects: [ new CosmosSprite({ anchor: 0, frames: [ content.ibcTsundereExhaust ] }) ]
                     }).on('tick', function () {
                        if ((this.alpha.value -= 0.15) <= 0) {
                           renderer.detach('menu', this);
                        }
                     });
                     detachers.push(() => renderer.detach('menu', sub));
                     renderer.attach('menu', sub);
                  }
                  this.metadata.xt--;
               } else {
                  const spr = quickshadow(anim, this);
                  spr.rotation.value = this.rotation.value;
                  spr.scale.set(this.scale);
                  detachers.push(() => renderer.detach('menu', spr));
               }
            });
            detached.then(() => dh2());
            dd2.then(() => detach());
            detachers.push(detach, dh2);
            await renderer.pause(company ? 2000 : 1000);
         });
      } else {
         bulletSequence(async (detachers, state, snd) => {
            const anim = new CosmosAnimation({ anchor: 0, resources: content.ibbVertship });
            const sh = new CosmosValue();
            const position = new CosmosPoint(-15, box.y1 + 5 + rng.attack.next() * (box.sy - 10));
            const { bullet, detach, detached } = bulletSetup(
               new CosmosHitbox({
                  anchor: 0,
                  metadata: {
                     bullet: true,
                     damage: 4,
                     xt: 0,
                     pyExplodable: true,
                     moon: true
                  },
                  position,
                  scale: 1 / 2,
                  rotation: -90,
                  priority: 31,
                  size: 24
               }),
               true,
               null
            );
            const { detach: dh2, detached: dd2 } = bulletSetup(
               new CosmosHitbox({
                  anchor: 0,
                  metadata: { bullet: true, damage: 4 },
                  position: { y: 3 },
                  size: { x: 10, y: 40 }
               }),
               bullet,
               null
            );
            bullet.attach(anim);
            const random3 = rand_rad(rng.attack.next());
            bullet.on('tick', function () {
               let vx = 0;
               if (screenCheck(this, 20)) {
                  detach();
               } else if (this.metadata.pyExplodable) {
                  if (sh.value > 0) {
                     this.position.set(
                        position.add(sh.value * (random3.next() * 2 - 1), sh.value * (random3.next() * 2 - 1))
                     );
                  } else {
                     vx = Math.round(position.x - this.position.x);
                     this.position.set(position);
                  }
               } else {
                  vx = this.velocity.x;
               }
               if (sh.value > 0 || !this.metadata.pyExplodable) {
                  const spr = quickshadow(
                     anim,
                     sh.value > 0 ? position.add(this.position.subtract(position).multiply(4)) : this
                  );
                  spr.rotation.value = this.rotation.value;
                  spr.scale.set(this.scale);
                  detachers.push(() => renderer.detach('menu', spr));
               }
               this.metadata.xt = Math.min(this.metadata.xt, 8 - vx);
               if (this.metadata.xt === 0) {
                  this.metadata.xt = 8 - vx;
                  const sub = new CosmosHitbox({
                     anchor: 0,
                     scale: 1 / 3,
                     position: this.position.subtract(8, 0),
                     velocity: { x: vx / -12 },
                     priority: 30,
                     size: { x: 18, y: 22 },
                     metadata: { bullet: true, damage: 4 },
                     objects: [ new CosmosSprite({ anchor: 0, frames: [ content.ibcTsundereExhaust ] }) ]
                  }).on('tick', function () {
                     if ((this.alpha.value -= 0.15) <= 0) {
                        renderer.detach('menu', this);
                     }
                  });
                  detachers.push(() => renderer.detach('menu', sub));
                  renderer.attach('menu', sub);
               }
               this.metadata.xt--;
            });
            detached.then(() => dh2());
            dd2.then(() => detach());
            detachers.push(detach, dh2);
            const tx = box.x1 + 20 + rng.attack.next() * (box.sx / 2 - 20);
            position.modulate(renderer, 2000, { x: tx }, { x: tx });
            renderer.pause(1500).then(async () => {
               if (!state.b) {
                  return;
               }
               const dl = snd(sounds.deeploop2.instance(renderer));
               dl.gain.value = 0;
               dl.rate.value *= 2;
               await Promise.race([
                  renderer.when(() => !bullet.metadata.pyExplodable),
                  Promise.all([ sh.modulate(renderer, 500, 1), dl.gain.modulate(renderer, 500, dl.daemon.gain / 2) ])
               ]);
               dl.stop();
               if (!bullet.metadata.pyExplodable) {
                  return;
               }
               bullet.metadata.pyExplodable = false;
               if (!state.b) {
                  return;
               }
               sh.value = 0;
               let i = 0;
               while (i < 12) {
                  const { detach: sparkled } = bulletSetup(
                     new CosmosHitbox({
                        anchor: 0,
                        size: 2,
                        metadata: { bullet: true, damage: 4, tickz: 0, pyExplodable: true, moon: true },
                        position: bullet.position.subtract(8, 0),
                        velocity: CosmosMath.ray((i / 12) * 360, 3),
                        priority: 29,
                        objects: [ new CosmosAnimation({ resources: content.ibbFrogstar, anchor: 0 }) ]
                     }).on('tick', function () {
                        if (this.metadata.tickz++ > 20) {
                           this.metadata.bullet = false;
                           if ((this.alpha.value -= 0.1) <= 0) {
                              this.alpha.value = 0;
                              sparkled();
                              return;
                           }
                        }
                        const spr = quickshadow(this.objects[0] as CosmosSprite, this);
                        detachers.push(() => renderer.detach('menu', spr));
                     }),
                     true
                  );
                  detachers.push(sparkled);
                  i++;
               }
               snd(sounds.stab.instance(renderer));
               snd(sounds.boom.instance(renderer, 0.2)).rate.value = 1.6;
               bullet.velocity.x = 7;
            });
            await renderer.pause(1000);
         });
      }
   },
   perigee () {
      if (battler.pattern('perigee', [ true, false ])) {
         bulletSequence(async detachers => {
            const time = renderer.time;
            const { detach } = bulletSetup(
               new CosmosHitbox({
                  anchor: 0,
                  metadata: { fs: 0 },
                  position: { x: 330, y: box.y1 - 5 - rng.attack.next() * 15 },
                  velocity: { x: -4 - rng.attack.next() * 2 },
                  priority: 4,
                  objects: [
                     new CosmosAnimation({ active: true, scale: { x: -1 }, anchor: 0, resources: content.ibbBird })
                  ]
               }).on('tick', function () {
                  if (screenCheck(this, 25)) {
                     detach();
                  } else {
                     this.offsets[0].y = sineWaver(time, 1000, -3, 0);
                     if (this.metadata.fs === 0) {
                        this.metadata.fs = 12;
                        const fsway = 30;
                        const fradi = 30;
                        const frate = 1300;
                        const fbase = this.position.subtract(0, fradi);
                        const ftime = renderer.time;
                        const { detach } = bulletSetup(
                           new CosmosHitbox({
                              metadata: { damage: 4, bullet: true, size: 0.5 },
                              size: { x: 15, y: 6 },
                              position: this,
                              anchor: 0,
                              objects: [ new CosmosSprite({ anchor: 0, frames: [ content.ibbFeather ] }) ]
                           }).on('tick', function () {
                              if (screenCheck(this, 20)) {
                                 detach();
                              } else {
                                 this.scale.set(this.metadata.size);
                                 this.metadata.size = Math.min(this.metadata.size + 0.1, 1);
                                 this.rotation.value = sineWaver(ftime, frate, -fsway, fsway);
                                 this.position.set(fbase.endpoint(90 + this.rotation.value, fradi));
                                 fbase.y += 2.5;
                              }
                           }),
                           true
                        );
                        detachers.push(detach);
                     }
                     this.metadata.fs--;
                  }
               }),
               true
            );
            detachers.push(detach);
            await renderer.pause(800);
         });
      } else {
         let b = true;
         const dodo = [] as (() => void)[];
         const tioasdbaghadjgbiadgfadhgb = renderer.time;
         const { bullet, detach } = bulletSetup(
            new CosmosHitbox({
               anchor: 0,
               size: { x: 17, y: 8 },
               position: { x: 160, y: -15 },
               metadata: { damage: 4, bullet: true, trig: false, ayo: 0, ayoX: 0 },
               scale: 1.5,
               objects: [ new CosmosAnimation({ active: true, anchor: 0, resources: content.ibbBirdfront }) ]
            }).on('tick', function () {
               this.offsets[0].y = sineWaver(tioasdbaghadjgbiadgfadhgb, 1500, -3, 3);
               if (this.metadata.trig) {
                  if (this.metadata.ayo === 0) {
                     this.metadata.ayo = ++this.metadata.ayoX % 3 === 0 ? 20 : 10;
                     const ang = this.position.angleTo(battler.SOUL);
                     const spin = rng.attack.next() < 0.5 ? 10 : -10;
                     let i = 0;
                     while (i < 3) {
                        const { detach } = bulletSetup(
                           new CosmosHitbox({
                              metadata: { damage: 4, bullet: true, size: 0.5 },
                              size: { x: 15, y: 6 },
                              position: this.position.add(this.offsets[0]),
                              anchor: 0,
                              spin,
                              velocity: CosmosMath.ray(ang + [ -35, 0, 35 ][i], 5),
                              acceleration: 0.98,
                              objects: [ new CosmosSprite({ anchor: 0, frames: [ content.ibbFeather ] }) ]
                           }).on('tick', function () {
                              if (boxCheck(this, 20)) {
                                 detach();
                              } else {
                                 this.scale.set(this.metadata.size);
                                 this.metadata.size = Math.min(this.metadata.size + 0.1, 1);
                              }
                           })
                        );
                        dodo.push(detach);
                        i++;
                     }
                  }
                  this.metadata.ayo--;
               }
            }),
            true
         );
         const ayyyyyyyyyyyyyyyyy = { y: box.y1 + box.sy / 4 };
         bullet.position.modulate(renderer, 1000, ayyyyyyyyyyyyyyyyy, ayyyyyyyyyyyyyyyyy).then(() => {
            b && (bullet.metadata.trig = true);
         });
         events.on('turn-timer').then(() => {
            b = false;
            bullet.metadata.trig = false;
            detach();
            for (const d of dodo) {
               d();
            }
         });
      }
   },
   async madjick (protoattacktype: number, protocrazy: boolean) {
      if (protoattacktype === 3) {
         await renderer.pause(450);
         return;
      }
      const crazy = protocrazy || protoattacktype > 0;
      switch (protocrazy ? 0 : protoattacktype || battler.pattern('madjick', [ 1, 2 ])) {
         case 0: {
            battler.SOUL.position.y = box.y2 - 8;
            const rottie = Math.random() < 0.5 ? -90 : 90;
            const size = new CosmosValue(45);
            const spinner = new CosmosValue(1 / 3);
            const subd = [] as (() => void)[];
            events.on('turn-timer').then(() => {
               battler.SOUL.velocity.set(0);
               for (const d of subd) {
                  d();
               }
            });
            const orb = new CosmosSprite({
               anchor: 0,
               position: box,
               frames: [ content.ibbOrb ],
               metadata: { spinner: 0 }
            }).on('tick', function () {
               this.scale.set(size.value / 40);
               this.rotation.value = Math.round((this.metadata.spinner += spinner.value)) * rottie;
               if (battler.invulnerable === 0 && this.position.extentOf(battler.SOUL) < size.value / 2 + 4) {
                  battler.damage(5 + battler.bonus);
               }
               const afac = Math.random();
               const alpha = 0.2 + afac * 0.4;
               const rotation = Math.random() * 360;
               const recto = new CosmosRectangle({
                  size: { y: 1, x: 4 + afac * 8 },
                  rotation,
                  anchor: 0,
                  metadata: { lifetime: 0 },
                  fill: 0xffffff,
                  position: orb.position.endpoint(rotation, 100),
                  gravity: CosmosMath.ray(rotation, -1),
                  velocity: CosmosMath.ray(rotation, -2)
               }).on('tick', function () {
                  if (this.position.extentOf(orb) < 5) {
                     deta4();
                  } else {
                     this.alpha.value = alpha * Math.min(++this.metadata.lifetime / 8, 1);
                  }
               });
               const deta4 = () => battler.bullets.detach(recto);
               subd.push(deta4);
               battler.bullets.attach(recto);
               battler.SOUL.velocity.set(
                  CosmosMath.ray(
                     battler.SOUL.position.angleTo(this),
                     Math.max(Math.min(25 / (battler.SOUL.position.extentOf(this) + size.value / 2), 1.5), 0.15)
                  )
               );
            });
            subd.push(() => battler.bullets.detach(orb));
            battler.bullets.attach(orb);
            bulletSequence(async (detachers, state, snd) => {
               if (rng.attack.next() < 0.5) {
                  const a =
                     orb.position.angleTo(battler.SOUL) +
                     CosmosMath.bezier(rng.attack.next(), 0, 0, 1) * (rng.attack.next() < 0.5 ? -180 : 180);
                  const prominence = rng.attack.next();
                  const spindir = rng.attack.next() < 0.5 ? -1 : 1;
                  const bp = orb.position.endpoint(a, 104);
                  const wr = new CosmosRectangle({
                     alpha: 0.8,
                     fill: 0xffffff,
                     anchor: { x: 1, y: 0 },
                     rotation: a,
                     priority: -100,
                     size: { y: CosmosMath.remap(prominence, 1, 2), x: 0 },
                     position: bp
                  });
                  detachers.push(() => battler.bullets.detach(wr));
                  battler.bullets.attach(wr);
                  wr.size.modulate(renderer, 200, { x: 104 }).then(async () => {
                     if (!state.b) {
                        return;
                     }
                     wr.position.set(orb);
                     wr.anchor.x = -1;
                     await wr.size.modulate(renderer, 200, { x: 0 });
                     if (!state.b) {
                        return;
                     }
                     battler.bullets.detach(wr);
                  });
                  const { detach } = bulletSetup(
                     new CosmosHitbox({
                        rotation: 90,
                        anchor: 0,
                        size: 8,
                        priority: -50,
                        scale: CosmosMath.remap(prominence, 0.5, 1),
                        spin: spindir * CosmosMath.remap(prominence, 30, 10),
                        metadata: { bullet: true, damage: 5 },
                        objects: [ new CosmosSprite({ anchor: 0, frames: [ content.ibbStardrop ], rotation: -45 }) ],
                        position: bp,
                        gravity: CosmosMath.ray(a, CosmosMath.remap(prominence, -0.2, -0.1))
                     }).on('tick', function () {
                        if (this.position.extentOf(orb) < size.value / 2 - 4) {
                           size.modulate(renderer, 100, size.value + 1.5);
                           snd(sounds.swallow.instance(renderer));
                           detach();
                        }
                     })
                  );
                  detachers.push(detach);
               } else {
                  let li = 0;
                  while (li < 3) {
                     const liLocal = li++;
                     const a =
                        orb.position.angleTo(battler.SOUL) +
                        CosmosMath.bezier(rng.attack.next(), 0, 0, 1) * (rng.attack.next() < 0.5 ? -180 : 180);
                     const bubble = new CosmosSprite({
                        alpha: 0,
                        frames: [ content.ibbArccircle ],
                        anchor: 0,
                        scale: 0.5,
                        rotation: a + 45,
                        priority: -10
                     }).on('tick', function () {
                        this.position.set(orb.position.endpoint(a, size.value / 2 + 2 - this.scale.x * 3));
                     });
                     battler.bullets.attach(bubble);
                     detachers.push(() => battler.bullets.detach(bubble));
                     Promise.all([
                        bubble.scale.modulate(renderer, 1500, 1),
                        bubble.alpha.modulate(renderer, 1500, 1)
                     ]).then(async () => {
                        if (!state.b) {
                           return;
                        }
                        battler.bullets.detach(bubble);
                        const { bullet, detach } = bulletSetup(
                           new CosmosHitbox({
                              size: { x: 100, y: 3 },
                              anchor: { y: 0 },
                              metadata: { bullet: true, damage: 5 },
                              scale: 1.5,
                              priority: -10,
                              objects: [
                                 new CosmosAnimation({
                                    active: true,
                                    anchor: { y: 0 },
                                    resources: content.ibbWhitelightning
                                 })
                              ],
                              rotation: a
                           }).on('tick', function () {
                              this.position.set(orb.position.endpoint(a, size.value / 2));
                           }),
                           false,
                           null
                        );
                        detachers.push(detach);
                        if (liLocal === 0) {
                           size.modulate(renderer, 100, size.value - 1.5);
                           snd(sounds.lightningstrike.instance(renderer));
                           shake();
                        }
                        await renderer.pause(150);
                        if (!state.b) {
                           return;
                        }
                        bullet.metadata.bullet = false;
                        await bullet.alpha.modulate(renderer, 150, 0);
                        if (!state.b) {
                           return;
                        }
                        detach();
                     });
                  }
               }
               await renderer.pause(crazy ? 500 : 600);
            });
            break;
         }
         case 1: {
            battler.SOUL.position.y = box.y2 - 8;
            const rottie = Math.random() < 0.5 ? -90 : 90;
            const size = new CosmosValue(20);
            const spinner = new CosmosValue(1 / 6);
            const subd = [] as (() => void)[];
            events.on('turn-timer').then(() => {
               battler.SOUL.velocity.set(0);
               for (const d of subd) {
                  d();
               }
            });
            const orb = new CosmosSprite({
               anchor: 0,
               position: box,
               frames: [ content.ibbOrb ],
               metadata: { spinner: 0 }
            }).on('tick', function () {
               this.scale.set(size.value / 40);
               this.rotation.value = Math.round((this.metadata.spinner += spinner.value)) * rottie;
               if (battler.invulnerable === 0 && this.position.extentOf(battler.SOUL) < size.value / 2 + 4) {
                  battler.damage(5 + battler.bonus);
               }
               const afac = Math.random();
               const alpha = 0.2 + afac * 0.4;
               const rotation = Math.random() * 360;
               const recto = new CosmosRectangle({
                  size: { y: 1, x: 4 + afac * 8 },
                  rotation,
                  anchor: 0,
                  metadata: { lifetime: 0 },
                  fill: 0xffffff,
                  position: orb.position.endpoint(rotation, 100),
                  gravity: CosmosMath.ray(rotation, -1),
                  velocity: CosmosMath.ray(rotation, -2)
               }).on('tick', function () {
                  if (this.position.extentOf(orb) < 5) {
                     deta4();
                  } else {
                     this.alpha.value = alpha * Math.min(++this.metadata.lifetime / 8, 1);
                  }
               });
               const deta4 = () => battler.bullets.detach(recto);
               subd.push(deta4);
               battler.bullets.attach(recto);
               battler.SOUL.velocity.set(
                  CosmosMath.ray(
                     battler.SOUL.position.angleTo(this),
                     Math.max(Math.min(50 / (battler.SOUL.position.extentOf(this) + size.value / 2), 1.5), 0.15)
                  )
               );
            });
            spinner.modulate(renderer, 3000, 1 / 2);
            subd.push(() => battler.bullets.detach(orb));
            battler.bullets.attach(orb);
            bulletSequence(async (detachers, state, snd) => {
               const a =
                  orb.position.angleTo(battler.SOUL) +
                  CosmosMath.bezier(rng.attack.next(), 0, 0, 1) * (rng.attack.next() < 0.5 ? -180 : 180);
               const prominence = rng.attack.next();
               const spindir = rng.attack.next() < 0.5 ? -1 : 1;
               const bp = orb.position.endpoint(a, 104);
               const wr = new CosmosRectangle({
                  alpha: 0.8,
                  fill: 0xffffff,
                  anchor: { x: 1, y: 0 },
                  rotation: a,
                  priority: -100,
                  size: { y: CosmosMath.remap(prominence, 1, 2), x: 0 },
                  position: bp
               });
               detachers.push(() => battler.bullets.detach(wr));
               battler.bullets.attach(wr);
               wr.size.modulate(renderer, 200, { x: 104 }).then(async () => {
                  if (!state.b) {
                     return;
                  }
                  wr.position.set(orb);
                  wr.anchor.x = -1;
                  await wr.size.modulate(renderer, 200, { x: 0 });
                  if (!state.b) {
                     return;
                  }
                  battler.bullets.detach(wr);
               });
               const { detach } = bulletSetup(
                  new CosmosHitbox({
                     rotation: 90,
                     anchor: 0,
                     size: 8,
                     priority: -50,
                     scale: CosmosMath.remap(prominence, 0.5, 1),
                     spin: spindir * CosmosMath.remap(prominence, 30, 10),
                     metadata: { bullet: true, damage: 5 },
                     objects: [ new CosmosSprite({ anchor: 0, frames: [ content.ibbStardrop ], rotation: -45 }) ],
                     position: bp,
                     gravity: CosmosMath.ray(a, CosmosMath.remap(prominence, -0.2, -0.1))
                  }).on('tick', function () {
                     if (this.position.extentOf(orb) < size.value / 2 - 4) {
                        size.modulate(renderer, 100, size.value + 1.5);
                        snd(sounds.swallow.instance(renderer));
                        detach();
                     }
                  })
               );
               detachers.push(detach);
               await renderer.pause(crazy ? 300 : 400);
            });
            break;
         }
         case 2: {
            battler.SOUL.position.y = box.y2 - 8;
            const rottie = Math.random() < 0.5 ? -90 : 90;
            const size = new CosmosValue(70);
            const spinner = new CosmosValue(1 / 2);
            const orb = new CosmosSprite({
               anchor: 0,
               position: box,
               frames: [ content.ibbOrb ],
               metadata: { spinner: 0 }
            }).on('tick', function () {
               this.scale.set(size.value / 40);
               this.rotation.value = Math.round((this.metadata.spinner += spinner.value)) * rottie;
               if (battler.invulnerable === 0 && this.position.extentOf(battler.SOUL) < size.value / 2 + 4) {
                  battler.damage(5 + battler.bonus);
               }
            });
            spinner.modulate(renderer, 3000, 1 / 6);
            events.on('turn-timer').then(() => battler.bullets.detach(orb));
            battler.bullets.attach(orb);
            bulletSequence(async (detachers, state, snd) => {
               let li = 0;
               while (li < 3) {
                  const liLocal = li++;
                  const a =
                     orb.position.angleTo(battler.SOUL) +
                     CosmosMath.bezier(rng.attack.next(), 0, 0, 1) * (rng.attack.next() < 0.5 ? -180 : 180);
                  const bubble = new CosmosSprite({
                     alpha: 0,
                     frames: [ content.ibbArccircle ],
                     anchor: 0,
                     scale: 0.5,
                     rotation: a + 45,
                     priority: -10
                  }).on('tick', function () {
                     this.position.set(orb.position.endpoint(a, size.value / 2 + 2 - this.scale.x * 3));
                  });
                  battler.bullets.attach(bubble);
                  detachers.push(() => battler.bullets.detach(bubble));
                  Promise.all([
                     bubble.scale.modulate(renderer, 1500, 1),
                     bubble.alpha.modulate(renderer, 1500, 1)
                  ]).then(async () => {
                     if (!state.b) {
                        return;
                     }
                     battler.bullets.detach(bubble);
                     const { bullet, detach } = bulletSetup(
                        new CosmosHitbox({
                           size: { x: 100, y: 3 },
                           anchor: { y: 0 },
                           metadata: { bullet: true, damage: 5 },
                           scale: 1.5,
                           priority: -10,
                           objects: [
                              new CosmosAnimation({
                                 active: true,
                                 anchor: { y: 0 },
                                 resources: content.ibbWhitelightning
                              })
                           ],
                           rotation: a
                        }).on('tick', function () {
                           this.position.set(orb.position.endpoint(a, size.value / 2));
                        }),
                        false,
                        null
                     );
                     detachers.push(detach);
                     if (liLocal === 0) {
                        size.modulate(renderer, 100, size.value - 1.5);
                        snd(sounds.lightningstrike.instance(renderer));
                        shake();
                     }
                     await renderer.pause(150);
                     if (!state.b) {
                        return;
                     }
                     bullet.metadata.bullet = false;
                     await bullet.alpha.modulate(renderer, 150, 0);
                     if (!state.b) {
                        return;
                     }
                     detach();
                  });
               }
               await renderer.pause(crazy ? 400 : 500);
            });
            break;
         }
      }
      await battler.turnTimer(crazy ? 12000 : 10000);
   },
   async knightknight (panic = false) {
      const vars = battler.volatile[0].vars;
      if (vars.shakeFactor.value === 0 || vars.result === 1 || vars.result === 2) {
         await renderer.pause(450);
         return;
      }
      const tt = events.on('turn-timer');
      switch (battler.pattern('knightknight', [ 0, 1 ])) {
         case 0: {
            const gap = 25;
            const radius = 140;
            const population = 14;
            const time = renderer.time;
            const planets = CosmosUtils.populate(2, index =>
               new CosmosSprite({
                  anchor: 0,
                  frames: [ content.ibbPlanet ],
                  spin: 0,
                  objects: CosmosUtils.populate(population, subindex => {
                     const vizindex =
                        subindex % 2 === 0
                           ? 0
                           : CosmosMath.weigh(
                                [
                                   [ 1, 9 ],
                                   [ 2, 9 ],
                                   [ 3, 9 ],
                                   [ 4, 1 ]
                                ],
                                rng.attack.next()
                             )!;
                     const rotation = Math.round((subindex / population) * 360 + (rng.attack.next() * 8 - 4));
                     return new CosmosAnimation({
                        anchor: { x: 0, y: 1 },
                        position: CosmosMath.ray(rotation, radius - 1),
                        rotation: rotation + 90,
                        resources: content.ibbTree,
                        index: vizindex,
                        metadata: { primed: false },
                        tint: vizindex === 4 ? 0x00ff5e : void 0,
                        objects: treevis(vizindex)
                     }).on('tick', async function () {
                        if (vizindex === 4 && !this.metadata.primed) {
                           this.metadata.primed = true;
                           await Promise.race(
                              this.objects.map(obj => {
                                 const { detach, detached } = bulletSetup(obj, this);
                                 tt.then(() => detach());
                                 return detached;
                              })
                           );
                           this.alpha.value = 0;
                           for (const obj of this.objects) {
                              obj.metadata.bullet = false;
                           }
                        }
                     });
                  })
               }).on('tick', function () {
                  this.position.set(
                     box.x,
                     box.y + (gap + radius) * [ -1, 1 ][index] + sineWaver(time, 1500, -1, 1) * this.spin.value * 3
                  );
                  if (battler.invulnerable === 0 && this.position.extentOf(battler.SOUL) < radius + 4) {
                     battler.damage(5 + battler.bonus);
                  }
               })
            );
            battler.bullets.attach(...planets);
            for (const p of planets) {
               p.spin.modulate(renderer, 1500, panic ? 1.1 : 0.9);
            }
            tt.then(() => battler.bullets.detach(...planets));
            break;
         }
         case 1: {
            let subindex = 0;
            let superindex = 0;
            bulletSequence(async (detachers, state) => {
               const x = battler.SOUL.position.x + rng.attack.next() * 20 - 10;
               const vizindex =
                  superindex++ % 4 === 0
                     ? subindex++ % 3 === 0
                        ? 0
                        : CosmosMath.weigh(
                             [
                                [ 1, 9 ],
                                [ 2, 9 ],
                                [ 3, 9 ],
                                [ 4, 1 ]
                             ],
                             rng.attack.next()
                          )!
                     : -1;
               const green = vizindex === 4;
               const s = vizindex === -1 ? 0.25 : 1;
               const ys = rng.attack.next() < 0.5 ? 0 : 1;
               const { bullet, detach } = bulletSetup(
                  new CosmosHitbox({
                     size: vizindex === -1 ? 0 : { x: 10, y: 11 },
                     anchor: { y: 0, x: 1 },
                     position: { x, y: [ box.y1 - 10, box.y2 + 10 ][ys] },
                     rotation: 90,
                     alpha: s,
                     scale: { x: 0.4 * s, y: 0.6 * s },
                     metadata: { damage: green ? 3 : 5, bullet: vizindex !== -1, color: green ? 'green' : 'white' },
                     objects: [
                        new CosmosAnimation({
                           anchor: { y: 0, x: 1 },
                           position: { x: 1 },
                           resources: content.ibbWater,
                           index: green ? 1 : 0
                        })
                     ]
                  }).on('tick', async function () {
                     if (state.b && (ys === 0 ? box.y2 <= this.position.y : this.position.y <= box.y1)) {
                        detach();
                        if (vizindex === -1) {
                           return;
                        }
                        let i = 0;
                        while (i < 4) {
                           battler.bullets.attach(
                              new CosmosAnimation({
                                 scale: 1 / 4,
                                 alpha: 0.5,
                                 position: this.position.add(CosmosMath.spread(0, i, 6), 0),
                                 velocity: CosmosMath.ray(
                                    Math.round(CosmosMath.spread(20, i, 4) + [ -90, 90 ][ys] + (Math.random() * 10 - 5)),
                                    Math.random() * 2 + 3
                                 ),
                                 gravity: { y: [ 0.5, -0.5 ][ys] },
                                 resources: content.ibbWater,
                                 index: green ? 1 : 0
                              }).on('tick', function () {
                                 if (ys === 0 ? this.position.y > box.y2 + 10 : this.position.y < box.y1 - 10) {
                                    battler.bullets.detach(this);
                                 } else {
                                    this.rotation.value = this.velocity.angle;
                                 }
                              })
                           );
                           i++;
                        }
                        const sz = 1.5;
                        const yp = [ 30, 15, 14, 15, 18 ][vizindex] * 0.75 * sz;
                        const tree = new CosmosAnimation({
                           anchor: { x: 0, y: 1 },
                           position: { x, y: [ box.y2 + yp, box.y1 - yp ][ys] },
                           resources: content.ibbTree,
                           index: vizindex,
                           scale: { x: 1.25 * sz, y: 0.75 * sz },
                           metadata: { primed: false, particle: false, pcounter: 0 },
                           tint: green ? 0x00ff5e : void 0,
                           objects: treevis(vizindex, sz),
                           rotation: [ 0, 180 ][ys],
                           priority: 1
                        }).on('tick', async function () {
                           if (green && !this.metadata.primed) {
                              this.metadata.primed = true;
                              await Promise.race(
                                 this.objects.map(obj => {
                                    const { detach, detached } = bulletSetup(obj, this);
                                    tt.then(() => detach());
                                    return detached;
                                 })
                              );
                              this.alpha.value = 0;
                              for (const obj of this.objects) {
                                 obj.metadata.bullet = false;
                              }
                           }
                        });
                        battler.bullets.attach(tree);
                        detachers.push(() => battler.bullets.detach(tree));
                        const yd = { y: [ box.y2, box.y1 ][ys] };
                        await Promise.all([
                           tree.scale.modulate(
                              renderer,
                              150,
                              { x: 0.75 * sz, y: 1.25 * sz },
                              { x: 0.75 * sz, y: 1.25 * sz },
                              sz
                           ),
                           tree.position.modulate(renderer, 150, yd, yd, yd),
                           renderer.pause(green ? 3000 : 1000)
                        ]);
                        if (!state.b) {
                           return;
                        }
                        for (const obj of tree.objects) {
                           obj.metadata.bullet = false;
                        }
                        await tree.alpha.modulate(renderer, 300, 0);
                        if (!state.b) {
                           return;
                        }
                        battler.bullets.detach(tree);
                     }
                  })
               );
               detachers.push(detach);
               const end = () => {
                  bullet.velocity.y = [ 1, -1 ][ys];
                  bullet.gravity.y = [ 0.5, -0.5 ][ys];
                  const e = { x: bullet.scale.y, y: bullet.scale.x };
                  bullet.scale.modulate(renderer, 500, e, e);
               };
               if (vizindex === -1) {
                  end();
               } else {
                  const ye = { y: [ box.y1 + 5, box.y2 - 5 ][ys] };
                  bullet.position.modulate(renderer, 500, ye, ye).then(async () => {
                     if (!state.b) {
                        return;
                     }
                     end();
                  });
               }
               await renderer.pause(panic ? 66 : 100);
            });
            break;
         }
      }
      await battler.turnTimer(panic ? 12000 : 10000);
   },
   froggitex (index: number) {
      if (index === 0 && rng.pattern.next() < 1 / 100) {
         const time = renderer.time;
         const { bullet, detach, detached } = bulletSetup(
            new CosmosHitbox({
               size: { x: 50, y: 20 },
               anchor: { x: 0, y: 1 },
               metadata: { bullet: true, damage: 5, t: 0 },
               position: { y: box.y2 + 40, x: box.x },
               objects: [
                  new CosmosAnimation({
                     active: true,
                     anchor: { x: 0, y: 1 },
                     resources: content.ibbHypno
                  })
               ]
            }).on('tick', function () {
               this.scale.set(sineWaver(time, 2000, 0.95, 1.05), sineWaver(time, 2000, 1.05, 0.95));
               battler.SOUL.position.set(
                  battler.SOUL.position.shift(0, -8 / (battler.SOUL.position.extentOf(this) / 10), this)
               );
            })
         );
         const ex = bulletSetup(
            new CosmosHitbox({ size: { x: 22, y: 19 }, metadata: { bullet: true, damage: 5 } }).on('tick', function () {
               this.position.x = -20 * bullet.scale.x;
               this.position.y = -39 * bullet.scale.y;
            }),
            bullet
         );
         const rate = battler.music?.rate.value ?? 1;
         battler.music?.rate.modulate(renderer, 10000, rate * 0.5);
         renderer.shake.modulate(renderer, 10000, 4);
         return Promise.race([
            detached,
            ex.detached,
            bullet.position.modulate(renderer, 10000, { y: box.y2 + 10 })
         ]).then(() => {
            detach();
            ex.detach();
            battler.music?.rate.modulate(renderer, 300, rate);
            renderer.shake.modulate(renderer, 300, 0);
         });
      }
      switch (index) {
         case 0: {
            const time = renderer.time;
            const rand = rng.attack.next();
            const frog = [] as (() => void)[];
            const computeY = () => Math.max(box.y2 - sawWaver(time, 2000, 0, 20), box.y1 + 16);
            const watuh = new CosmosHitbox({
               area: renderer.area,
               filters: [ battler.clipFilter! ],
               size: { x: 100, y: 65 },
               anchor: { x: 0 },
               position: { x: box.x },
               priority: 9999,
               metadata: { bullet: true, damage: 5 },
               objects: [
                  new CosmosAnimation({
                     active: true,
                     anchor: { x: 0 },
                     resources: content.ibbWaterwall,
                     position: { y: -6 }
                  })
               ]
            }).on('tick', function () {
               this.position.y = computeY() + sineWaver(time, 2000, 2, 4);
            });
            renderer.attach('menu', watuh);
            frog.push(() => renderer.detach('menu', watuh));
            let y = box.y2 + 15;
            const lily = new CosmosObject({
               metadata: { time: 0 },
               position: { x: 160, y },
               objects: CosmosUtils.populate(4, index =>
                  new CosmosSprite({
                     position: { x: CosmosMath.spread(box.sx / 2, index, 3) },
                     anchor: { x: 0, y: 1 },
                     frames: [ content.ibbLily ],
                     offsets: [ { y: 4.5 } ],
                     scale: 1 / 2,
                     metadata: { landed: 0 },
                     objects: [
                        new CosmosHitbox({
                           anchor: 0,
                           size: { x: 5, y: 26 },
                           metadata: { bullet: true, damage: 5 }
                        }),
                        new CosmosHitbox({
                           anchor: { x: 0 },
                           size: { x: 37, y: 15 },
                           position: { y: -14 },
                           metadata: { bullet: true, damage: 5 }
                        })
                     ]
                  }).on('tick', function () {
                     if (this.metadata.landed) {
                        this.position.y = (this.position.y + 3) / 2;
                     } else {
                        this.position.y -= this.position.y * 1.8;
                     }
                  })
               )
            }).on('tick', async function () {
               this.position.x = box.x + sineWaver(time, 3000, -30, 30, rand);
               y = (y + box.y2 * 3) / 4;
               this.position.y = y - (box.y2 - computeY()) * (1 - (y - box.y2) / 15);
               if (this.metadata.time === 0) {
                  this.metadata.time = 40;
                  let e = true;
                  let f = null as CosmosObject | null;
                  let p = 3;
                  let o = 0;
                  const sp = new CosmosPoint(CosmosMath.spread(box.sx / 2, p, 3), -10);
                  const spr = new CosmosSprite({
                     frames: [ content.ibbFroglegs ],
                     anchor: { x: 0, y: 1 }
                  });
                  const hbox = new CosmosHitbox({
                     anchor: { x: 0, y: 1 },
                     size: { x: 30, y: 23 },
                     scale: 1 / 2,
                     metadata: { bullet: true, damage: 5, color: 'white' },
                     objects: [ spr ]
                  }).on('tick', function () {
                     this.position.set(sp.add(lily).add(0, o + (f?.position.y ?? 0)));
                  });
                  const { detach, detached } = bulletSetup(hbox, false);
                  frog.push(detach);
                  const de = detached.then(() => (e = false));
                  while (e && p > -1) {
                     const x = CosmosMath.spread(box.sx / 2, --p, 3);
                     const y = -60;
                     const mx = (x + sp.x) / 2;
                     await sp.modulate(renderer, 500, { x: mx, y }, { x: mx, y }, { x, y: -10 });
                     if (e) {
                        f = lily.objects[p];
                        f && f.metadata.landed++;
                        spr.frames = [ content.ibbFrogstop ];
                        o = 0;
                        spr.anchor.y = 1;
                        hbox.size.y = 20;
                        hbox.anchor.y = 1;
                        await Promise.race([ de, renderer.pause(500) ]);
                        if (e) {
                           o = -11;
                           spr.anchor.y = 0;
                           hbox.size.y = 23;
                           hbox.anchor.y = 0;
                           spr.frames = [ content.ibbFroglegs ];
                        }
                        f && f.metadata.landed--;
                        f = null;
                     }
                  }
                  detach();
               }
               this.metadata.time--;
            });
            battler.bullets.attach(lily);
            events.on('turn-timer').then(() => {
               battler.bullets.detach(lily);
               for (const f of frog) {
                  f();
               }
            });
            break;
         }
         case 1: {
            let b = true;
            const time = renderer.time;
            const frog = [] as (() => void)[];
            const turnTimer = events.on('turn-timer').then(() => {
               b = false;
               for (const f of frog) {
                  f();
               }
            });
            (async () => {
               let d = 0;
               while (true) {
                  const v = rng.attack.next() < 0.5 ? 0 : 1;
                  const x = box.x1 + rng.attack.next() * box.sx;
                  const y = [ box.y1 + rng.attack.next() * (box.sy / 2), box.y2 - rng.attack.next() * (box.sy / 2) ][v];
                  const rand = rng.attack.next();
                  const truefly = d++ % 5 < 2;
                  const { detach, detached } = bulletSetup(
                     new CosmosHitbox({
                        alpha: truefly ? 1 : 0.3,
                        anchor: 0,
                        size: 6,
                        scale: 1,
                        position: { x: box.x2 + 5, y },
                        velocity: { x: -2 * (truefly ? 1 : 1.5) },
                        metadata: { activated: false, prepped: false, bullet: truefly, damage: 5 },
                        objects: [
                           new CosmosAnimation({
                              anchor: 0,
                              resources: content.ibbFrogfly,
                              active: true
                           })
                        ]
                     }).on('tick', async function () {
                        if (!this.metadata.activated) {
                           this.position.y = y + sineWaver(time, 2000, -3, 3, rand);
                        }
                        if (!truefly) {
                           return;
                        }
                        if (!this.metadata.prepped) {
                           if (this.position.x <= x + 50) {
                              this.metadata.prepped = true;
                              const bullet = new CosmosSprite({
                                 frames: [ content.ibbTongue ],
                                 anchor: { x: 0 },
                                 rotation: [ 0, 180 ][v],
                                 position: { x, y: [ box.y2, box.y1 ][v] },
                                 objects: [
                                    new CosmosHitbox({
                                       size: { x: 3, y: 99 },
                                       position: { y: 1 },
                                       anchor: { x: 0 },
                                       metadata: { bullet: true, damage: 5 }
                                    })
                                 ]
                              });
                              battler.bullets.attach(bullet);
                              const subdetach = () => battler.bullets.detach(bullet);
                              frog.push(subdetach);
                              const y = [ box.y2 - 10, box.y1 + 10 ][v];
                              bullet.position.modulate(renderer, 200, { y }, { y });
                              detached.then(async () => {
                                 if (!this.metadata.activated) {
                                    await bullet.position.modulate(
                                       renderer,
                                       [ (bullet.position.y - box.y2) / -10, (bullet.position.y - box.y1) / 10 ][v] * 200,
                                       { y: [ box.y2, box.y1 ][v] }
                                    );
                                    subdetach();
                                 }
                              });
                              await renderer.when(() => this.position.x <= x);
                              this.metadata.activated = true;
                              this.position.x = x;
                              (this.objects[0] as CosmosAnimation).disable();
                              this.velocity.x = 0;
                              const tY = [ this.position.y - 10, this.position.y + 10 ][v];
                              await Promise.all([
                                 this.position.modulate(renderer, 333, { y: tY }, { y: tY }),
                                 bullet.position.modulate(renderer, 333, { y: tY }, { y: tY })
                              ]);
                              await Promise.all([
                                 this.position.modulate(renderer, 166, { y: [ box.y2 + 5, box.y1 - 5 ][v] }),
                                 bullet.position.modulate(renderer, 166, { y: [ box.y2 + 5, box.y1 - 5 ][v] })
                              ]);
                              detach();
                              subdetach();
                           }
                        }
                     })
                  );
                  frog.push(detach);
                  await Promise.race([ turnTimer, renderer.pause(200) ]);
                  if (!b) {
                     break;
                  }
               }
            })();
            break;
         }
      }
      return false;
   },
   async whimsalot (index: number) {
      switch (index) {
         case 0: {
            let b = true;
            const time = renderer.time;
            const whim = [] as (() => void)[];
            const turnTimer = events.on('turn-timer').then(() => {
               b = false;
               for (const w of whim) {
                  w();
               }
            });
            (async () => {
               while (true) {
                  const y = (box.y1 + rng.attack.next() * box.sy - box.y) * 0.85 + box.y;
                  const rand = rng.attack.next();
                  let end = false;
                  const { bullet, detach, detached } = bulletSetup(
                     new CosmosHitbox({
                        anchor: 0,
                        size: 8,
                        position: { x: box.x2 + 5, y },
                        priority: -10,
                        velocity: { x: -3 },
                        metadata: {
                           bullet: true,
                           damage: 5,
                           hit: false
                        },
                        objects: [
                           new CosmosAnimation({
                              anchor: 0,
                              scale: 1 / 2,
                              resources: content.ibbStarfly,
                              active: true
                           }).on('tick', function () {
                              bullet.size.y = [ 8, 4 ][this.index];
                           })
                        ]
                     }).on('tick', async function () {
                        this.metadata.hit || (this.position.y = y + sineWaver(time, 2000, -3, 3, rand));
                        if (this.position.x < box.x1 - 5 || this.position.y > box.y2 + 5) {
                           end = true;
                           detach();
                           return;
                        }
                        if (this.metadata.hit) {
                           quickshadow(this.objects[0] as CosmosSprite, this.position, battler.bullets);
                        }
                     })
                  );
                  whim.push(detach);
                  const xt = box.x1 + 35 + rng.attack.next() * (box.sx - 70);
                  const b2 = bulletSetup(
                     new CosmosHitbox({
                        size: { x: 28, y: 3 },
                        anchor: 0,
                        scale: 0.5,
                        velocity: { x: -3 },
                        position: bullet.position.add(10, 0),
                        metadata: { bullet: true, damage: 5, launched: false },
                        objects: [
                           new CosmosSprite({
                              frames: [ content.ibbTiparrow ],
                              anchor: 0,
                              rotation: -45
                           })
                        ]
                     }).on('tick', function () {
                        if (this.metadata.launched) {
                           if (boxCheck(this, 10)) {
                              b2.detach();
                           }
                        } else if (a) {
                           this.position.y = y + sineWaver(time, 2000, -3, 3, rand);
                           this.rotation.value = this.position.angleTo(battler.SOUL);
                           if (this.position.x <= xt) {
                              this.metadata.launched = true;
                              const arr1 = sounds.arrow.instance(renderer);
                              whim.push(() => arr1.stop());
                              this.velocity.set(CosmosMath.ray(this.rotation.value, 4));
                           }
                        }
                     })
                  );
                  let a = true;
                  detached.then(async () => {
                     a = false;
                     if (end || b2.bullet.metadata.launched) {
                        return;
                     }
                     b2.bullet.velocity.set(0);
                     b2.bullet.metadata.bullet = false;
                     await Promise.all([
                        b2.bullet.alpha.modulate(renderer, 150, 0),
                        b2.bullet.scale.modulate(renderer, 150, 2)
                     ]);
                     b2.detach();
                  });
                  whim.push(b2.detach);
                  await Promise.race([ turnTimer, renderer.pause(750) ]);
                  if (!b) {
                     break;
                  }
               }
            })();
            await turnTimer;
            break;
         }
         case 1: {
            let rot2 = 0;
            const time = renderer.time;
            const total = 15;
            const distance = 38;
            const center = new CosmosPoint(160);
            const whim = CosmosUtils.populate(total, index => {
               let rot1 = (index / total) * -360;
               const { bullet, detach } = bulletSetup(
                  new CosmosHitbox({
                     anchor: 0,
                     size: 8,
                     scale: 1 / 2,
                     metadata: { bullet: true, damage: 5 },
                     objects: [
                        new CosmosAnimation({
                           anchor: 0,
                           resources: content.ibbStarfly,
                           active: true
                        }).on('tick', function () {
                           bullet.size.y = [ 8, 4 ][this.index];
                        })
                     ]
                  }).on('tick', function () {
                     index === 0 && (rot2 += 4);
                     const d = distance + sineWaver(time, 750, -5, 5);
                     this.position.set(
                        center
                           .endpoint(rot1 - 90, sineWaver(time, 1500, d, d + 6, ((index / total) * 8) % 1))
                           .endpoint(rot2, 5)
                     );
                     this.rotation.value = rot1;
                     rot1 -= 2;
                  })
               );
               return { bullet, detach };
            });
            await events.on('turn-timer');
            for (const w of whim) {
               w.detach();
            }
            break;
         }
      }
   },
   astigmatism () {
      if (battler.pattern('astigmatism', [ true, false ])) {
         const rad = 28;
         const size = 65;
         const amount = 30;
         const spin = new CosmosValue();
         const speed = new CosmosValue();
         const gapdist = 3;
         const speedtarget = rng.attack.next() < 0.5 ? 0 : 1;
         const rings = CosmosUtils.populate(4, i1 => {
            const rev = i1 % 2 === speedtarget;
            return new CosmosObject({
               position: { x: 160 + [ size * 2, size, 0, -size, -size * 2 ][speedtarget + i1], y: box.y },
               rotation: rev ? 0 : 180,
               objects: CosmosUtils.populate(amount, i2 => {
                  if (Math.min(Math.abs(0 - i2), Math.abs(amount - i2)) < gapdist) {
                     return new CosmosObject();
                  } else {
                     const rotation = (i2 / amount) * 360;
                     return new CosmosHitbox({
                        size: { x: 6, y: 4 },
                        anchor: 0,
                        position: CosmosMath.ray(rotation, rad),
                        metadata: { bullet: true, damage: 5 },
                        scale: CosmosMath.remap(rng.attack.next(), 0.8, 1.2),
                        rotation: rotation + CosmosMath.remap(rng.attack.next(), -10, 10),
                        objects: [
                           new CosmosSprite({
                              anchor: 0,
                              frames: [ content.ibbToothsingle ]
                           })
                        ]
                     });
                  }
               })
            }).on('tick', function () {
               this.spin.value = rev ? spin.value : -spin.value;
               this.velocity.x = speed.value;
               if (this.position.x > box.x2 + size + 5) {
                  this.position.x -= size * 4;
               } else if (this.position.x < box.x1 - size - 5) {
                  this.position.x += size * 4;
               }
            });
         });
         battler.bullets.attach(...rings);
         events.on('turn-timer').then(() => battler.bullets.detach(...rings));
         speed.modulate(renderer, 2000, [ -1, 1 ][speedtarget]);
         spin.modulate(renderer, 2000, rng.attack.next() < 0.5 ? -6 : 6);
      } else {
         battler.SOUL.position.y = box.y2 - 8;
         const { bullet, detach } = bulletSetup(
            new CosmosHitbox({
               anchor: 0,
               size: 14,
               position: box,
               metadata: { bullet: true, damage: 5 },
               objects: [ new CosmosSprite({ anchor: 0, priority: 1, frames: [ content.ibbCircle4 ] }) ]
            }),
            false,
            null
         );
         let b = true;
         const tt = events.on('turn-timer');
         tt.then(() => {
            b = false;
            detach();
         });
         (async () => {
            while (b) {
               const v =
                  bullet.position.angleTo(battler.SOUL) +
                  CosmosMath.bezier(rng.attack.next(), 0, 0, 1) * (rng.attack.next() < 0.5 ? -180 : 180);
               const r = rng.attack.next();
               const a = v - (180 + ((r * 2) % 1) * 180) * (r < 0.5 ? -1 : 1);
               const cone = new CosmosSprite({
                  alpha: 0,
                  anchor: { y: 0 },
                  metadata: { active: false },
                  frames: [ content.ibbEyecone ],
                  rotation: a
               }).on('tick', function () {
                  if (!this.metadata.active || battler.invulnerable !== 0) {
                     return;
                  }
                  const ext = bullet.position.extentOf(battler.SOUL);
                  if (ext < 16) {
                     return;
                  }
                  const angle = bullet.position.angleTo(battler.SOUL);
                  let low = this.rotation.value;
                  while (low < 0) {
                     low += 360;
                  }
                  while (360 <= low) {
                     low -= 360;
                  }
                  if (
                     Math.min(
                        Math.abs(this.rotation.value - (angle - 360)),
                        Math.abs(this.rotation.value - angle),
                        Math.abs(this.rotation.value - (angle + 360))
                     ) <
                     22.5 + (4 * 360) / (ext * Math.PI * 2)
                  ) {
                     battler.damage(5 + battler.bonus);
                  }
               });
               bullet.attach(cone);
               const app1 = sounds.appear.instance(renderer);
               tt.then(() => app1.stop());
               (async () => {
                  await cone.alpha.modulate(renderer, 300, 0.5);
                  if (!b) {
                     return;
                  }
                  await renderer.pause(300);
                  if (!b) {
                     return;
                  }
                  await cone.rotation.modulate(renderer, 1000, cone.rotation.value, v, v);
                  if (!b) {
                     return;
                  }
                  await renderer.pause(300);
                  if (!b) {
                     return;
                  }
                  cone.metadata.active = true;
                  cone.alpha.value = 1;
                  const bom1 = sounds.bomb.instance(renderer);
                  tt.then(() => bom1.stop());
                  shake();
                  await renderer.pause(300);
                  if (!b) {
                     return;
                  }
                  cone.metadata.active = false;
                  await cone.alpha.modulate(renderer, 300, 0);
                  bullet.detach(cone);
               })();
               await renderer.pause(1000);
            }
         })();
      }
   },
   async migospel () {
      const { detach, detached } = bulletSetup(
         new CosmosHitbox({
            size: { x: 8, y: 11 },
            anchor: { x: 0, y: 1 },
            metadata: { bullet: true, damage: 5 },
            position: { y: box.y2, x: box.x },
            objects: [
               new CosmosAnimation({
                  active: true,
                  scale: 0.5,
                  anchor: { x: 0, y: 1 },
                  resources: content.ibbMigosp
               })
            ]
         })
      );
      await Promise.race([ detached, renderer.pause(5000) ]);
      detach();
   },
   async mushketeer (travel: number) {
      if (battler.pattern('mushketeer', [ true, false ])) {
         let b = true;
         const deta = [] as (() => void)[];
         events.on('turn-timer').then(() => {
            b = false;
            for (const d of deta) {
               d();
            }
         });
         const scale = [ 0.5, 0.75, 1 ][travel];
         const funni = sounds.bombfall.instance(renderer);
         deta.push(() => funni.stop());
         funni.rate.value = [ 0.1, 0.12, 0.14 ][travel];
         const { detach } = bulletSetup(
            new CosmosHitbox({
               scale,
               size: { x: 8, y: 17 },
               anchor: { x: 0, y: 1 },
               metadata: { bullet: true, damage: 5 },
               position: { x: box.x, y: box.y1 },
               velocity: { y: [ 2, 2.5, 3 ][travel] },
               acceleration: 1.005,
               objects: [
                  new CosmosSprite({ anchor: { x: 0, y: 1 }, position: { y: 2 * scale }, frames: [ content.ibbNuker ] })
               ]
            }).on('tick', async function () {
               if (box.y2 - 2 * scale <= this.position.y) {
                  detach();
                  funni.stop();
                  if (!b) {
                     return;
                  }
                  const bom1 = sounds.bomb.instance(renderer);
                  deta.push(() => bom1.stop());
                  const bom2 = sounds.boom.instance(renderer, 0.2);
                  deta.push(() => bom2.stop());
                  bom2.rate.value = 0.5;
                  shake(4, 1000);
                  const hitboxes = [
                     new CosmosHitbox({
                        metadata: { bullet: true, damage: 5, position: { x: -10, y: -96 } },
                        size: { x: 20, y: 96 }
                     }),
                     new CosmosHitbox({
                        metadata: { bullet: true, damage: 5, position: { x: -43, y: -17 } },
                        size: { x: 86, y: 16 }
                     }),
                     new CosmosHitbox({
                        metadata: { bullet: true, damage: 5, position: { x: -47, y: -15 } },
                        size: { x: 94, y: 8 }
                     }),
                     new CosmosHitbox({
                        metadata: { bullet: true, damage: 5, position: { x: -41, y: -24 } },
                        size: { x: 8, y: 7 }
                     }),
                     new CosmosHitbox({
                        metadata: { bullet: true, damage: 5, position: { x: 41, y: -24 } },
                        size: { x: 8, y: 7 },
                        anchor: { x: 1 }
                     }),
                     new CosmosHitbox({
                        metadata: { bullet: true, damage: 5, position: { x: -27, y: -40 } },
                        size: { x: 54, y: 11 }
                     }),
                     new CosmosHitbox({
                        metadata: { bullet: true, damage: 5, position: { x: -34, y: -42 } },
                        size: { x: 15, y: 9 }
                     }),
                     new CosmosHitbox({
                        metadata: { bullet: true, damage: 5, position: { x: 34, y: -42 } },
                        size: { x: 15, y: 9 },
                        anchor: { x: 1 }
                     }),
                     new CosmosHitbox({
                        metadata: { bullet: true, damage: 5, position: { x: -22, y: -62 } },
                        size: { x: 11, y: 4 }
                     }),
                     new CosmosHitbox({
                        metadata: { bullet: true, damage: 5, position: { x: 22, y: -62 } },
                        size: { x: 11, y: 4 },
                        anchor: { x: 1 }
                     }),
                     new CosmosHitbox({
                        metadata: { bullet: true, damage: 5, position: { x: -29, y: -93 } },
                        size: { x: 58, y: 31 }
                     }),
                     new CosmosHitbox({
                        metadata: { bullet: true, damage: 5, position: { x: -35, y: -73 } },
                        size: { x: 70, y: 9 }
                     }),
                     new CosmosHitbox({
                        metadata: { bullet: true, damage: 5, position: { x: -36, y: -82 } },
                        size: { x: 72, y: 8 }
                     }),
                     new CosmosHitbox({
                        metadata: { bullet: true, damage: 5, position: { x: -16, y: -97 } },
                        size: { x: 32, y: 4 }
                     })
                  ];
                  const sca = new CosmosValue();
                  const rad = rand_rad(rng.attack.next());
                  const { bullet, detach: detach2 } = bulletSetup(
                     new CosmosSprite({
                        frames: [ content.ibbExplosion ],
                        position: { x: box.x, y: box.y2 },
                        anchor: { x: 0, y: 1 },
                        scale: 0,
                        objects: hitboxes
                     }).on('tick', function () {
                        const idealScale = new CosmosPoint(0.9 + rad.next() * 0.2, 0.9 + rad.next() * 0.2).multiply(
                           sca.value * scale
                        );
                        this.scale.set(this.scale.add(idealScale.subtract(this.scale).divide(4)));
                        for (const hbox of hitboxes) {
                           hbox.position.set(this.scale.multiply(hbox.metadata.position));
                        }
                     }),
                     false,
                     null
                  );
                  deta.push(detach2);
                  battler.bullets.attach(bullet);
                  sca.modulate(renderer, 300, 1, 1, 1).then(async () => {
                     if (!b) {
                        return;
                     }
                     await renderer.pause(300);
                     if (!b) {
                        return;
                     }
                     for (const hbox of hitboxes) {
                        hbox.metadata.bullet = false;
                     }
                     await bullet.alpha.modulate(renderer, 600, 0);
                     if (!b) {
                        return;
                     }
                     detach2();
                  });
                  bulletSequence(async detachers => {
                     const time = renderer.time;
                     const x = box.x1 + rng.attack.next() * box.sx;
                     const intensity = rng.attack.next();
                     const { detach: detach3 } = bulletSetup(
                        new CosmosHitbox({
                           alpha: CosmosMath.remap(intensity, 0.8, 1),
                           anchor: 0,
                           metadata: { bullet: true, damage: 5 },
                           position: { x, y: box.y1 - 5 },
                           velocity: { y: CosmosMath.remap(intensity, 1.5, 2.5) * scale },
                           acceleration: 1.005,
                           objects: [ new CosmosAnimation({ resources: content.ibbFrogstar, active: true, anchor: 0 }) ]
                        }).on('tick', function () {
                           if (boxCheck(this, 10)) {
                              detach3();
                           } else {
                              this.position.x = sineWaver(time, 600, x - 0.5, x + 0.5);
                              const i = (this.objects[0] as CosmosSprite).index;
                              this.size.set([ 2, 4, 2, 0 ][i]);
                              this.metadata.bullet = i < 3;
                           }
                        })
                     );
                     detachers.push(detach3);
                     await renderer.pause(100);
                  });
               }
            }),
            false,
            null
         );
         deta.push(detach);
      } else {
         bulletSequence(async (detachers, state, snd) => {
            const s = rng.attack.next() < 0.5 ? 0 : 1;
            const q1 = [ box.x + box.sx / 4, box.x - box.sx / 4 ][s];
            const q2 = [ box.x - box.sx / 4, box.x + box.sx / 4 ][s];
            const br = [ 180, 0 ][s];
            const vx = [ 2, 3, 4 ][travel] * [ -1, 1 ][s];
            const offset = { x: [ -4, 4 ][travel], y: -14 };
            const origin = new CosmosPoint(box.x, box.y2).add(offset);
            const target = box.y1 + 4 + rng.attack.next() * (box.sy * 0.75 - 8);
            let angle = origin.angleTo([ box.x1, box.x2 ][s], target);
            angle > 270 && (angle -= 360);
            const arm = new CosmosHitbox({
               anchor: { y: 0 },
               position: offset,
               metadata: { bullet: true, damage: 5, f: false, n: false },
               objects: [ new CosmosSprite({ anchor: { y: 0 }, frames: [ content.ibbTankarm ] }) ]
            }).on('tick', function () {
               if (this.metadata.f) {
                  this.rotation.value = CosmosMath.remap(
                     Math.min(CosmosMath.remap(bullet.position.x, 0, 1, box.x, q2), 1),
                     angle,
                     br
                  );
               } else {
                  const sh = CosmosMath.remap_clamped(bullet.position.x, 0, 1, q1, box.x);
                  this.offsets[0].set(sh * (Math.random() - 0.5), sh * (Math.random() - 0.5));
                  this.rotation.value = CosmosMath.remap_clamped(bullet.position.x, br, angle, [ box.x2, box.x1 ][s], q1);
                  if (!this.metadata.n && this.rotation.value === angle) {
                     this.metadata.n = true;
                     snd(sounds.noise.instance(renderer));
                  }
               }
            });
            const targeter = new CosmosSprite({
               alpha: 0,
               spin: 10,
               anchor: 0,
               scale: 1 / 2,
               rotation: Math.random() * 360,
               position: { x: [ box.x1, box.x2 ][s] },
               frames: [ content.ibbCrosshair ]
            }).on('tick', function () {
               this.position.y = CosmosMath.remap_clamped(bullet.position.x, origin.y, target, [ box.x2, box.x1 ][s], q1);
            });
            renderer.attach('menu', targeter);
            detachers.push(() => renderer.detach('menu', targeter));
            snd(sounds.appear.instance(renderer));
            targeter.alpha.modulate(renderer, 300, 1);
            const { detach, bullet } = bulletSetup(
               new CosmosObject({
                  position: { x: [ box.x2 + 20, box.x1 - 20 ][s], y: box.y2 },
                  velocity: { x: vx },
                  objects: [
                     arm,
                     new CosmosAnimation({
                        anchor: { x: 0, y: 1 },
                        resources: content.ibbTank,
                        scale: { x: [ 1, -1 ][s] },
                        active: true
                     }),
                     new CosmosHitbox({
                        anchor: { x: 0, y: 1 },
                        size: { x: 36, y: 9 },
                        metadata: { bullet: true, damage: 5 }
                     }),
                     new CosmosHitbox({
                        anchor: { x: 0, y: 1 },
                        size: { x: 30, y: 11 },
                        metadata: { bullet: true, damage: 5 }
                     }),
                     new CosmosHitbox({
                        anchor: { x: 0, y: 1 },
                        size: { x: 20, y: 14 },
                        metadata: { bullet: true, damage: 5 }
                     }),
                     new CosmosHitbox({
                        anchor: { x: 0, y: 1 },
                        size: { x: 14, y: 16 },
                        metadata: { bullet: true, damage: 5 }
                     })
                  ]
               }).on('tick', function () {
                  if (!arm.metadata.f && (s === 0 ? this.position.x <= box.x : box.x <= this.position.x)) {
                     arm.metadata.f = true;
                     this.velocity.x = [ 1, -1 ][s];
                     this.position.x = box.x;
                     this.velocity.modulate(renderer, 1000, { x: vx });
                     snd(sounds.node.instance(renderer)).rate.value = 1.2;
                     shake();
                     const { detach, detached } = bulletSetup(
                        new CosmosHitbox({
                           anchor: 0,
                           size: 20,
                           scale: 1 / 8,
                           priority: -1,
                           position: origin.endpoint(angle, 16),
                           rotation: angle + 90,
                           velocity: CosmosMath.ray(angle, [ 6, 7, 8 ][travel]),
                           metadata: { bullet: true, damage: 5 },
                           objects: [ new CosmosSprite({ anchor: 0, frames: [ content.ibbLiteralBullet ] }) ]
                        }).on('tick', function () {
                           if (s === 0 ? this.position.x <= box.x1 : box.x2 <= this.position.x) {
                              detach();
                              snd(sounds.bomb.instance(renderer));
                              shake();
                              let i = 0;
                              const total = [ 5, 6, 7 ][travel];
                              while (i < total) {
                                 const { detach: sparkled } = bulletSetup(
                                    new CosmosHitbox({
                                       anchor: 0,
                                       size: 2,
                                       metadata: { bullet: true, damage: 5 },
                                       position: { x: [ box.x1, box.x2 ][s], y: target },
                                       velocity: CosmosMath.ray(
                                          CosmosMath.spread(50, i, total) + [ 0, 180 ][s],
                                          [ 4, 4.5, 5 ][travel]
                                       ),
                                       priority: -2,
                                       objects: [ new CosmosAnimation({ resources: content.ibbFrogstar, anchor: 0 }) ]
                                    }).on('tick', function () {
                                       if (boxCheck(this, 10)) {
                                          sparkled();
                                       } else {
                                          quickshadow(this.objects[0] as CosmosSprite, this, battler.bullets);
                                       }
                                    })
                                 );
                                 detachers.push(sparkled);
                                 i++;
                              }
                           } else {
                              const spr = quickshadow(this.objects[0] as CosmosSprite, this, battler.bullets);
                              spr.rotation.value = this.rotation.value;
                              spr.scale.set(this.scale);
                              spr.priority.value = -2;
                           }
                        })
                     );
                     detachers.push(detach);
                     detached.then(() => renderer.detach('menu', targeter));
                  }
               }),
               false,
               null
            );
            detachers.push(detach);
            await renderer.pause([ 1750, 1500, 1250 ][travel]);
         });
      }

      // travel 0 - 2 (higher number means more intense)
   }
};

export default patterns;

CosmosUtils.status(`LOAD MODULE: AERIALIS PATTERNS (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
