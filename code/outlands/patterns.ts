import { boxCheck, bulletSetup, fireAttack, pastBox, standardPos, standardSize } from '../common/api';
import { content, sounds } from '../systems/assets';
import { events, renderer, rng } from '../systems/core';
import { battler, box, quickshadow, shake, sineWaver } from '../systems/framework';
import { SAVE } from '../systems/save';
import {
   CosmosAnimation,
   CosmosHitbox,
   CosmosMath,
   CosmosObject,
   CosmosPoint,
   CosmosPointSimple,
   CosmosRectangle,
   CosmosSprite,
   CosmosUtils,
   CosmosValue
} from '../systems/storyteller';

const patterns = {
   froggit (index?: number, modifier?: string) {
      const n = rng.pattern.next();
      const solo = battler.alive.length === 1;
      if (solo && n < 1 / 100) {
         const time = renderer.time;
         const { bullet, detach, detached } = bulletSetup(
            new CosmosHitbox({
               size: { x: 50, y: 20 },
               anchor: { x: 0, y: 1 },
               metadata: { bullet: true, damage: 3, t: 0 },
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
                  battler.SOUL.position.shift(0, -4 / (battler.SOUL.position.extentOf(this) / 10), this)
               );
            })
         );
         const ex = bulletSetup(
            new CosmosHitbox({ size: { x: 22, y: 19 }, metadata: { bullet: true, damage: 3 } }).on('tick', function () {
               this.position.x = -20 * bullet.scale.x;
               this.position.y = -39 * bullet.scale.y;
            }),
            bullet
         );
         const rate = battler.music?.rate.value ?? 1;
         battler.music?.rate.modulate(renderer, 10000, rate * 0.75);
         renderer.shake.modulate(renderer, 10000, 2);
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
      switch (
         typeof index === 'number'
            ? index
            : battler.pattern('froggit', [ 0, 1 ], CosmosMath.remap(n, 0, 1, solo ? 1 / 100 : 0, 1))
      ) {
         case 0: {
            const time = renderer.time;
            const rand = rng.attack.next();
            const whim = modifier === 'whimsun';
            const frog = [] as (() => void)[];
            const lily = new CosmosObject({
               metadata: { time: 0 },
               position: { x: 160, y: box.y2 + 15 },
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
                           anchor: { x: 0, y: 1 },
                           size: { x: 5, y: 13 },
                           metadata: { bullet: true, damage: 3 }
                        }),
                        new CosmosHitbox({
                           anchor: { x: 0 },
                           size: { x: 37, y: 15 },
                           position: { y: -14 },
                           metadata: { bullet: true, damage: 3 }
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
               this.position.x = box.x + sineWaver(time, 5000, -30, 30, rand);
               this.position.y = (this.position.y + box.y2 * 3) / 4;
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
                     metadata: { bullet: true, damage: 3, color: 'white' },
                     objects: [ spr ]
                  }).on('tick', function () {
                     this.position.set(sp.add(lily).add(0, o + (f?.position.y ?? 0)));
                     if (whim && this.position.x > box.x1 && this.position.x < box.x2) {
                        this.calculate();
                        const f = renderer.detect(
                           this,
                           ...renderer.calculate(battler.bullets, obj => obj.metadata.frogger === true)
                        );
                        if (f.length > 0) {
                           f[0].metadata.detach();
                           sounds.swallow.instance(renderer);
                           this.tint = 0x00ff5e;
                           this.metadata.color = 'green';
                           this.metadata.damage = 3;
                        }
                     }
                  });
                  const { detach, detached } = bulletSetup(hbox, false);
                  frog.push(detach);
                  const de = detached.then(() => (e = false));
                  while (e && p > -1) {
                     const x = CosmosMath.spread(box.sx / 2, --p, 3);
                     const y = whim ? -30 : -60;
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
            const whim = modifier === 'whimsun';
            const frog = [] as (() => void)[];
            const turnTimer = events.on('turn-timer').then(() => {
               b = false;
               for (const f of frog) {
                  f();
               }
            });
            (async () => {
               while (true) {
                  const x = box.x1 + rng.attack.next() * box.sx;
                  const y = box.y1 + rng.attack.next() * (box.sy / 2);
                  const rand = rng.attack.next();
                  const { detach, detached } = bulletSetup(
                     new CosmosHitbox({
                        anchor: 0,
                        size: 6,
                        scale: 1,
                        position: { x: box.x2 + 5, y },
                        velocity: { x: -2 },
                        metadata: { activated: false, prepped: false, bullet: true, damage: 3 },
                        objects: [
                           new CosmosAnimation({
                              anchor: 0,
                              resources: content.ibbFrogfly,
                              active: true
                           })
                        ]
                     }).on('tick', async function () {
                        if (!this.metadata.activated) {
                           this.position.y = y + sineWaver(time, 2000, whim ? -3 : -6, whim ? 3 : 6, rand);
                        }
                        if (!this.metadata.prepped) {
                           if (this.position.x <= x + 50) {
                              this.metadata.prepped = true;
                              const bullet = new CosmosSprite({
                                 frames: [ content.ibbTongue ],
                                 anchor: { x: 0 },
                                 position: { x, y: box.y2 },
                                 objects: [
                                    new CosmosHitbox({
                                       size: { x: 3, y: 99 },
                                       position: { y: 1 },
                                       anchor: { x: 0 },
                                       metadata: { bullet: true, damage: 3 }
                                    })
                                 ]
                              });
                              battler.bullets.attach(bullet);
                              const subdetach = () => battler.bullets.detach(bullet);
                              frog.push(subdetach);
                              const y = box.y2 - 10;
                              bullet.position.modulate(renderer, 200, { y }, { y });
                              detached.then(async () => {
                                 if (!this.metadata.activated) {
                                    await bullet.position.modulate(
                                       renderer,
                                       ((bullet.position.y - box.y2) / -10) * 200,
                                       {
                                          y: box.y2
                                       }
                                    );
                                    subdetach();
                                 }
                              });
                              await renderer.when(() => this.position.x <= x);
                              this.metadata.activated = true;
                              this.position.x = x;
                              (this.objects[0] as CosmosAnimation).disable();
                              this.velocity.x = 0;
                              const tY = this.position.y - 10;
                              await Promise.all([
                                 this.position.modulate(renderer, 333, { y: tY }, { y: tY }),
                                 bullet.position.modulate(renderer, 333, { y: tY }, { y: tY })
                              ]);
                              await Promise.all([
                                 this.position.modulate(renderer, 166, { y: box.y2 + 5 }),
                                 bullet.position.modulate(renderer, 166, { y: box.y2 + 5 })
                              ]);
                              detach();
                              subdetach();
                           }
                        }
                     })
                  );
                  frog.push(detach);
                  await Promise.race([ turnTimer, renderer.pause(1000) ]);
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
   async whimsun (index?: number, modifier?: string, frogger = false) {
      switch (typeof index === 'number' ? index : battler.pattern('whimsun', [ 0, 1 ])) {
         case 0: {
            let b = true;
            const time = renderer.time;
            const frog = modifier === 'froggit';
            const whim = [] as (() => void)[];
            const turnTimer = events.on('turn-timer').then(() => {
               b = false;
               for (const w of whim) {
                  w();
               }
            });
            (async () => {
               let c = 0;
               while (true) {
                  const y = (box.y1 + rng.attack.next() * (frog ? box.sy / 2 : box.sy) - box.y) * 0.85 + box.y;
                  const rand = rng.attack.next();
                  if (!frog || frogger || c++ % 3 !== 0) {
                     const { bullet, detach } = bulletSetup(
                        new CosmosHitbox({
                           anchor: 0,
                           size: 8,
                           position: { x: box.x2 + 5, y },
                           priority: -10,
                           velocity: { x: frog ? -2.5 : -3 },
                           metadata: {
                              bullet: true,
                              damage: 3,
                              frogger: false,
                              detach: null as null | (() => void),
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
                              detach();
                              return;
                           } else if (this.position.x < box.x2 - 10) {
                              this.metadata.frogger = true;
                           }
                           if (this.metadata.hit) {
                              quickshadow(this.objects[0] as CosmosSprite, this.position, battler.bullets);
                           }
                        })
                     );
                     frogger && (bullet.metadata.detach = detach);
                     whim.push(detach);
                  }
                  await Promise.race([ turnTimer, renderer.pause(frog ? 1000 : 750) ]);
                  if (!b) {
                     break;
                  }
               }
            })();
            await turnTimer;
            break;
         }
         case 1: {
            const time = renderer.time;
            const total = 15;
            const distance = modifier === 'froggit' ? 32 : 26;
            const center = new CosmosPoint(160);
            const whim = CosmosUtils.populate(total, index => {
               let rot = (index / total) * -360;
               const { bullet, detach } = bulletSetup(
                  new CosmosHitbox({
                     anchor: 0,
                     size: 8,
                     scale: 1 / 2,
                     metadata: { bullet: true, damage: 3 },
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
                     this.position.set(
                        center.endpoint(
                           rot - 90,
                           sineWaver(time, 1500, distance, distance + 6, ((index / total) * 4) % 1)
                        )
                     );
                     this.rotation.value = rot;
                     rot -= 2;
                  })
               );
               return detach;
            });
            await events.on('turn-timer');
            for (const w of whim) {
               w();
            }
            break;
         }
      }
   },
   async loox (index?: number, mig = false, whim = false) {
      switch (typeof index === 'number' ? index : battler.pattern('loox', [ 0, 1 ])) {
         case 0: {
            let b = true;
            const bp = events.on('turn-timer').then(() => {
               b = false;
            });
            while (b) {
               let su = false;
               const t = battler.SOUL.position.clone();
               const sh = new CosmosValue();
               const { bullet: b1, detach: d1 } = bulletSetup(
                  new CosmosHitbox({
                     anchor: { x: 0, y: 1 },
                     size: { x: 14, y: 6 },
                     alpha: 0,
                     priority: 900,
                     position: t.subtract(0, 15),
                     tint: 0xcfcfcf,
                     metadata: { bullet: true, damage: 3, shad: false },
                     scale: 1.5,
                     objects: [
                        new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibbToothtop ], position: { y: 2 } })
                     ]
                  }).on('tick', function () {
                     this.offsets[0].set((Math.random() * 2 - 1) * sh.value, (Math.random() * 2 - 1) * sh.value);
                     this.metadata.shad &&
                        quickshadow(this.objects[0] as CosmosSprite, this, battler.bullets).scale.set(1.5);
                  }),
                  false,
                  null
               );
               const { bullet: b2, detach: d2 } = bulletSetup(
                  new CosmosHitbox({
                     anchor: { x: 0 },
                     size: { x: 14, y: 6 },
                     alpha: 0,
                     position: t.add(0, 15),
                     scale: 1.5,
                     priority: 900,
                     metadata: { bullet: true, damage: 3, shad: false },
                     tint: 0xcfcfcf,
                     objects: [
                        new CosmosSprite({ anchor: { x: 0 }, frames: [ content.ibbToothbot ], position: { y: -2 } })
                     ]
                  }).on('tick', function () {
                     if (su) {
                        this.offsets[0].set(b1.offsets[0]);
                     } else {
                        this.offsets[0].set((Math.random() * 2 - 1) * sh.value, (Math.random() * 2 - 1) * sh.value);
                     }
                     this.metadata.shad &&
                        quickshadow(this.objects[0] as CosmosSprite, this, battler.bullets).scale.set(1.5);
                  }),
                  false,
                  null
               );
               Promise.race([
                  bp,
                  Promise.all([ b1.alpha.modulate(renderer, 500, 1), b2.alpha.modulate(renderer, 500, 1) ])
               ])
                  .then(async () => {
                     if (!b) {
                        return;
                     }
                     await Promise.race([ bp, sh.modulate(renderer, 600, 0, 1, 1) ]);
                     if (!b) {
                        return;
                     }
                     sounds.stab.instance(renderer);
                     b1.metadata.shad = true;
                     b2.metadata.shad = true;
                     sh.value = 0;
                     await Promise.race([
                        bp,
                        Promise.all([ b1.position.step(renderer, 4, t), b2.position.step(renderer, 4, t) ])
                     ]);
                     if (!b) {
                        return;
                     }
                     shake(1);
                     sounds.noise.instance(renderer);
                     b1.metadata.shad = false;
                     b2.metadata.shad = false;
                     b1.tint = void 0;
                     b2.tint = void 0;
                     sh.value = 1;
                     su = true;
                     if (whim) {
                        const c = renderer.calculate(battler.bullets, obj => obj.metadata.hit === false);
                        const f = [ ...renderer.detect(b1, ...c), ...renderer.detect(b2, ...c) ];
                        for (const v of f) {
                           v.metadata.hit = true;
                           v.velocity.set(0);
                           v.gravity.y = 0.5;
                           v.scale.y /= 2;
                           (v.objects[0] as CosmosSprite).reset();
                        }
                     }
                     await Promise.race([
                        bp,
                        sh.modulate(renderer, 300, 0).then(async () => {
                           b1.metadata.bullet = false;
                           b2.metadata.bullet = false;
                           await Promise.all([
                              b1.position.modulate(renderer, 500, {}, t.subtract(0, 5)),
                              b2.position.modulate(renderer, 500, {}, t.add(0, 5)),
                              b1.alpha.modulate(renderer, 500, 0),
                              b2.alpha.modulate(renderer, 500, 0)
                           ]);
                        })
                     ]);
                  })
                  .then(() => {
                     d1();
                     d2();
                  });
               await renderer.pause(1800);
            }
            break;
         }
         case 1: {
            const minX = box.x1 + 4;
            const maxX = box.x2 - 4;
            const minY = box.y1 + 4;
            const maxY = box.y2 - 4;
            const position = battler.SOUL.position.add(
               [
                  { x: 25, y: 0 },
                  { x: 0, y: 25 },
                  { x: -25, y: 0 },
                  { x: 0, y: -25 }
               ][rng.attack.int(4)]
            );
            const bulletticker = function (this: CosmosHitbox) {
               quickshadow(this.objects[0] as CosmosSprite, this, battler.bullets).priority.value =
                  this.priority.value - 1;
               if (mig) {
                  const f = renderer.detect(
                     this,
                     ...renderer.calculate(battler.bullets, obj => obj.metadata.mighit === false)
                  );
                  if (f.length > 0) {
                     f[0].metadata.mighit = true;
                     f[0].position.task?.();
                     f[0].velocity.set(f[0].velocity.x / 8 + (f[0].metadata.flipside ? -0.5 : 0.5), -4);
                     f[0].gravity.y = 0.5;
                     (f[0].objects[0] as CosmosSprite).reset();
                     sounds.noise.instance(renderer);
                  }
               }
               if (whim) {
                  const f = renderer.detect(
                     this,
                     ...renderer.calculate(battler.bullets, obj => obj.metadata.hit === false)
                  );
                  if (f.length > 0) {
                     f[0].metadata.hit = true;
                     f[0].velocity.set(f[0].velocity.x / 6, -4);
                     f[0].gravity.y = 0.5;
                     (f[0].objects[0] as CosmosSprite).reset();
                     sounds.noise.instance(renderer);
                  }
               }
            };
            const { bullet: bullet1, detach: detacher1 } = bulletSetup(
               new CosmosHitbox({
                  anchor: 0,
                  size: 7,
                  priority: 900,
                  position,
                  metadata: { bullet: true, damage: 3 },
                  objects: [ new CosmosSprite({ scale: 0.5, anchor: 0, frames: [ content.ibbCircle3 ] }) ]
               }).on('tick', bulletticker),
               false,
               null
            );
            const { bullet: bullet2, detach: detacher2 } = bulletSetup(
               new CosmosHitbox({
                  anchor: 0,
                  priority: 898,
                  size: 5,
                  metadata: { bullet: true, damage: 3 },
                  position,
                  objects: [ new CosmosSprite({ scale: 0.5, anchor: 0, frames: [ content.ibbCircle2 ] }) ]
               }).on('tick', bulletticker),
               false,
               null
            );
            const { bullet: bullet3, detach: detacher3 } = bulletSetup(
               new CosmosHitbox({
                  anchor: 0,
                  priority: 896,
                  size: 4,
                  metadata: { bullet: true, damage: 3 },
                  position,
                  objects: [ new CosmosSprite({ scale: 0.5, anchor: 0, frames: [ content.ibbCircle1 ] }) ]
               }).on('tick', bulletticker),
               false,
               null
            );
            let angle = rng.attack.int(4) * 90 + 45;
            const positions = [] as CosmosPointSimple[];
            const reboundTicker = () => {
               const destie = position.endpoint(angle, mig ? 2 : 3);
               position.set(destie.clamp({ x: minX, y: minY }, { x: maxX, y: maxY }));
               let rot = true;
               angle = angle % 360;
               if (position.x === minX) {
                  angle -= (180 - angle) * 2;
               } else if (position.x === maxX) {
                  angle -= (0 - angle) * 2;
               } else if (position.y === minY) {
                  angle -= (-90 - angle) * 2;
               } else if (position.y === maxY) {
                  angle -= (90 - angle) * 2;
               } else {
                  rot = false;
               }
               if (rot) {
                  position.set(position.endpoint(angle, position.extentOf(destie)));
                  sounds.burst.instance(renderer);
               }
               positions.unshift(position.value());
               bullet1.position.set(position);
               if (positions.length > 2) {
                  bullet2.position.set(positions[2]);
                  if (positions.length > 4) {
                     bullet3.position.set(positions.pop()!);
                  }
               }
            };
            renderer.on('tick', reboundTicker);
            await events.on('turn-timer');
            renderer.off('tick', reboundTicker);
            detacher1();
            detacher2();
            detacher3();
            break;
         }
      }
   },
   async migosp (index: number, whim = false, mold = false) {
      switch (index) {
         case 0: {
            let b = true;
            const oo = [] as (() => void)[];
            const tt = events.on('turn-timer').then(() => {
               b = false;
               for (const o of oo) {
                  o();
               }
            });
            while (b) {
               let walter = false;
               let speedup = 0;
               const sh = new CosmosValue();
               const flipside = false;
               const { bullet, detach } = bulletSetup(
                  new CosmosHitbox({
                     size: 3,
                     anchor: 0,
                     metadata: { bullet: true, damage: 3, mighit: false, flipside },
                     position: {
                        y: (box.y1 + rng.attack.next() * box.sy - box.y) * (whim ? 0.75 : 0.85) + box.y,
                        x: flipside ? box.x2 + 5 : box.x1 - 5
                     },
                     objects: [
                        new CosmosAnimation({
                           active: true,
                           scale: { x: flipside ? -0.5 : 0.5, y: 0.5 },
                           anchor: 0,
                           resources: content.ibbRoachfly
                        })
                     ]
                  }).on('tick', async function () {
                     this.offsets[0].set(sh.value * (Math.random() * 2 - 1), sh.value * (Math.random() * 2 - 1));
                     (mold || whim) && this.calculate();
                     if (mold) {
                        const g = renderer.detect(
                           this,
                           ...renderer.calculate(battler.bullets, obj => obj.metadata.gel === true)
                        );
                        if (g.length > 0) {
                           g[0].metadata.sp.modulate(renderer, 400, 1.4, 1.4, 1);
                           sounds.swallow.instance(renderer);
                           detach();
                           return;
                        }
                        const f = renderer.detect(
                           this,
                           ...renderer.calculate(battler.bullets, obj => obj.metadata.mold === true)
                        );
                        if (f.length > 0) {
                           f[0].metadata.detach();
                           sounds.swallow.instance(renderer);
                           speedup++;
                           this.position.modulate(renderer, 0, this.position);
                           this.velocity.x += flipside ? -4 : 4;
                           sounds.stab.instance(renderer);
                        }
                     }
                     if (whim && !this.metadata.mighit && this.position.x > box.x1 && this.position.x < box.x2) {
                        const f = renderer.detect(
                           this,
                           ...renderer.calculate(battler.bullets, obj => obj.metadata.hit === false)
                        );
                        if (f.length > 0) {
                           f[0].metadata.hit = true;
                           const r = Math.max(speedup, 1) * (flipside ? -1 : 1);
                           f[0].spin.value = r < 0 ? -10 : 10;
                           f[0].velocity.set(r, -4);
                           f[0].gravity.y = 0.5;
                           (f[0].objects[0] as CosmosSprite).reset();
                           sounds.noise.instance(renderer);
                           walter = true;
                           sh.value = 2;
                           sh.modulate(renderer, 600, 1, 0);
                           const x = this.position.x + (flipside ? 5 : -5);
                           await this.position.modulate(
                              renderer,
                              600,
                              { x, y: this.position.y - 5 },
                              { x, y: this.position.y }
                           );
                           walter = false;
                        }
                     }
                     if (speedup > 0 || walter || this.metadata.mighit) {
                        quickshadow(this.objects[0] as CosmosSprite, this.position, battler.bullets);
                     }
                  }),
                  false
               );
               oo.push(detach);
               (async () => {
                  while (b && speedup < 1 && !bullet.metadata.mighit) {
                     walter && (await renderer.when(() => !b || !walter));
                     if (!b) {
                        break;
                     }
                     const x = bullet.position.x + (20 + rng.attack.next() * 15) * (flipside ? -1 : 1);
                     await bullet.position.modulate(renderer, 850, {}, { x }, { x }, { x: flipside ? x + 5 : x - 5 });
                     if (boxCheck(bullet, 10)) {
                        detach();
                        break;
                     }
                  }
               })();
               await Promise.race([ tt, renderer.pause(mold ? 500 : 500 * battler.alive.length) ]);
            }
            break;
         }
         case 1: {
            const { detach, detached } = bulletSetup(
               new CosmosHitbox({
                  size: { x: 8, y: 11 },
                  anchor: { x: 0, y: 1 },
                  metadata: { bullet: true, damage: 3 },
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
            break;
         }
      }
   },
   async mushy (challenge = true) {
      let b = true;
      const bull = [] as (() => void)[];
      events.on('turn-timer').then(() => {
         b = false;
         for (const f of bull) {
            f();
         }
      });
      if (battler.pattern('mushy', [ false, true ])) {
         while (b) {
            const area = 40;
            const center = battler.SOUL.position
               .subtract(area / 2)
               .clamp({ x: box.x1, y: box.y1 }, { x: box.x2 - area, y: box.y2 - area })
               .add(rng.attack.next() * area, rng.attack.next() * area);
            const target = new CosmosSprite({
               alpha: 0,
               scale: new CosmosPoint(0.4),
               position: center,
               anchor: 0,
               frames: [ content.ibbCrosshair ],
               priority: -10
            });
            battler.bullets.attach(target);
            target.scale.modulate(renderer, 300, 1 / 4, 1 / 4);
            target.alpha.modulate(renderer, 300, 0.7, 0.7).then(async () => {
               if (!b) {
                  return;
               }
               await renderer.pause(350);
               if (!b) {
                  return;
               }
               sounds.node.instance(renderer).rate.value = 1.2;
               await Promise.all(
                  CosmosUtils.populate(4, index => {
                     const rotation = 45 + (index / 4) * 360;
                     const position = center.endpoint(rotation + 90, 100);
                     const velocity = CosmosMath.ray(rotation - 90, 7);
                     const { detach, detached } = bulletSetup(
                        new CosmosHitbox({
                           anchor: 0,
                           size: 20,
                           scale: 1 / 4,
                           position,
                           rotation,
                           velocity,
                           metadata: { time: 0, bullet: true, damage: 3, in: false },
                           objects: [ new CosmosSprite({ anchor: 0, frames: [ content.ibbLiteralBullet ] }) ]
                        }).on('tick', function () {
                           this.metadata.in
                              ? boxCheck(this, 10) && detach()
                              : boxCheck(this, 10) || (this.metadata.in = true);
                           const shad = quickshadow(this.objects[0] as CosmosSprite, this, battler.bullets);
                           shad.scale.set(this.scale);
                           shad.rotation.value = this.rotation.value;
                        })
                     );
                     bull.push(detach);
                     return detached;
                  })
               ).then(() => {
                  target.scale.modulate(renderer, 300, 0.4, 0.4);
                  target.alpha.modulate(renderer, 300, 0).then(() => battler.bullets.detach(target));
               });
            });
            await renderer.pause(challenge ? 650 : 1250);
         }
      } else {
         while (b) {
            const { position } = pastBox(10);
            const center = battler.box.position.add(rng.attack.next() * 20 - 10, rng.attack.next() * 20 - 10);
            const rotation = position.angleTo(center);
            const warnRect2 = new CosmosRectangle({
               alpha: 0.7,
               position,
               priority: -5,
               anchor: { y: 0 },
               size: { y: 4 },
               rotation,
               fill: 0xffffff
            });
            const { bullet, detach } = bulletSetup(
               new CosmosHitbox({
                  anchor: 0,
                  size: 20,
                  scale: 1 / 4,
                  position,
                  rotation: rotation + 90,
                  metadata: { time: 0, bullet: true, damage: 3, fired: false },
                  objects: [ new CosmosSprite({ anchor: 0, frames: [ content.ibbLiteralBullet ] }) ]
               }).on('tick', function () {
                  if (this.metadata.fired) {
                     if (boxCheck(this, 20)) {
                        detach();
                     } else {
                        const shad = quickshadow(this.objects[0] as CosmosSprite, this, battler.bullets);
                        shad.scale.set(this.scale);
                        shad.rotation.value = this.rotation.value;
                     }
                  }
               }),
               false
            );
            bull.push(detach);
            battler.bullets.attach(warnRect2);
            sounds.arrow.instance(renderer).rate.value = 0.75;
            warnRect2.size.modulate(renderer, 600, { x: 200 }, { x: 200 }).then(async () => {
               if (!b) {
                  return;
               }
               warnRect2.alpha.value = 1;
               warnRect2.alpha.modulate(renderer, 400, 0.75, 0).then(() => battler.bullets.detach(warnRect2));
               bullet.velocity.set(CosmosMath.ray(rotation, 7));
               bullet.metadata.fired = true;
               sounds.node.instance(renderer).rate.value = 1.2;
            });
            await renderer.pause(challenge ? 350 : 650);
            if (!b) {
               break;
            }
         }
      }
   },
   async toriel (index: number) {
      const fire = [] as (() => void)[];
      const state = { b: true };
      const hardmode = 3 <= SAVE.data.n.cell_insult;
      switch (index) {
         case 0: {
            await standardSize({ x: 100, y: 65 }, true);
            standardPos(true);
            await fireAttack(0, hardmode, fire, state);
            break;
         }
         case 1: {
            await standardSize({ x: 100, y: 100 }, true);
            standardPos(true);
            await fireAttack(1, hardmode, fire, state);
            break;
         }
         case 2: {
            await standardSize({ x: 120, y: 80 }, true);
            standardPos(true);
            await fireAttack(2, hardmode, fire, state);
            break;
         }
         case 3: {
            await standardSize({ x: 120, y: 120 }, true);
            standardPos(true);
            await fireAttack(3, hardmode, fire, state);
            break;
         }
         case 4: {
            await standardSize({ x: 100, y: 100 }, true);
            standardPos(true);
            await fireAttack(4, hardmode, fire, state);
            break;
         }
      }
      await Promise.race([
         battler.turnTimer(index === 0 ? 4000 : hardmode ? 8000 : 6000),
         ...(index === 0 ? [] : [ renderer.when(() => !state.b || SAVE.data.n.hp <= 4) ])
      ]);
      state.b = false;
      for (const f of fire) {
         f();
      }
   }
};

export default patterns;

CosmosUtils.status(`LOAD MODULE: OUTLANDS PATTERNS (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
