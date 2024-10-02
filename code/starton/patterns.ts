import {
   boxCheck,
   bulletSequence,
   bulletSetup,
   papBlaster,
   papPattern,
   papWaver,
   screenCheck,
   starGenerator
} from '../common/api';
import { content, sounds } from '../systems/assets';
import { events, renderer, rng } from '../systems/core';
import { battler, box, distanceGravity, quickshadow, rand_rad, shake, sineWaver } from '../systems/framework';
import { OutertaleMultivisualObject } from '../systems/outertale';
import {
   CosmosAnimation,
   CosmosHitbox,
   CosmosInstance,
   CosmosMath,
   CosmosObject,
   CosmosPoint,
   CosmosRectangle,
   CosmosSprite,
   CosmosUtils,
   CosmosValue
} from '../systems/storyteller';

const patterns = {
   stardrake (index?: number, spacetop = false) {
      switch (typeof index === 'number' ? index : battler.pattern('stardrake', [ 0, 1 ])) {
         case 0: {
            const v = spacetop
               ? [
                    { x: -1, y: 0 },
                    { x: 1, y: 0 }
                 ]
               : [
                    { x: -1, y: 0 },
                    { x: 0, y: -1 },
                    { x: 1, y: 0 },
                    { x: 0, y: 1 }
                 ];
            bulletSequence(async (detachers, state) => {
               const m = (
                  spacetop
                     ? [
                          { x: box.x2, y: battler.SOUL.position.y },
                          { x: box.x1, y: battler.SOUL.position.y }
                       ]
                     : [
                          { x: box.x2, y: battler.SOUL.position.y },
                          { x: battler.SOUL.position.x, y: box.y2 },
                          { x: box.x1, y: battler.SOUL.position.y },
                          { x: battler.SOUL.position.x, y: box.y1 }
                       ]
               ).map((position, index) => {
                  const { bullet, detach } = bulletSetup(
                     new CosmosHitbox({
                        anchor: 0,
                        size: 11,
                        alpha: 0,
                        metadata: { bullet: true, damage: 4, index, moon: false },
                        position,
                        objects: [
                           new CosmosSprite({ frames: [ content.ibbMoon ], anchor: 0, metadata: { index: 0 } }).on(
                              'tick',
                              function () {
                                 if (++this.metadata.index === 7) {
                                    this.metadata.index = 0;
                                    this.rotation.value += 90;
                                 }
                              }
                           )
                        ]
                     }).on('tick', function () {
                        boxCheck(this, 10) && detach();
                     })
                  );
                  detachers.push(detach);
                  return bullet;
               });
               sounds.appear.instance(renderer);
               Promise.all(m.map(x => x.alpha.modulate(renderer, 300, 0.5))).then(async () => {
                  if (!state.b) {
                     return;
                  }
                  await Promise.all(m.map(x => x.alpha.modulate(renderer, 300, 1)));
                  if (!state.b) {
                     return;
                  }
                  await renderer.pause(400);
                  if (!state.b) {
                     return;
                  }
                  for (const x of m) {
                     x.metadata.moon = true;
                     x.velocity.set(new CosmosPoint(v[x.metadata.index]).multiply(spacetop ? 3 : 4));
                  }
               });
               await renderer.pause(spacetop ? 1300 : 900);
            });
            break;
         }
         case 1: {
            bulletSequence(async (detachers, state) => {
               const { bullet: pipe, detach: de } = bulletSetup(
                  new CosmosHitbox({
                     size: { x: 11, y: 14 },
                     anchor: { x: 0, y: 1 },
                     priority: 20,
                     metadata: { bullet: true, damage: 4 },
                     position: { x: box.x1 + 10 + rng.attack.next() * (box.sx - 20), y: box.y2 + 15 },
                     objects: [ new CosmosSprite({ frames: [ content.ibbPipe ], anchor: { x: 0, y: 1 } }) ]
                  }).on('tick', function () {
                     this.scale.x < 1 && (this.scale.x += 0.01) > 1 && (this.scale.x = 1);
                     this.scale.y > 1 && (this.scale.y -= 0.01) < 1 && (this.scale.y = 1);
                  }),
                  false,
                  null
               );
               detachers.push(de);
               pipe.position.modulate(renderer, 1000, { y: box.y2 }).then(async () => {
                  if (!state.b) {
                     return;
                  }
                  sounds.noise.instance(renderer);
                  let i = 0;
                  while (i++ < 3) {
                     pipe.scale.set(0.9, 1.2);
                     const { detach } = bulletSetup(
                        new CosmosHitbox({
                           anchor: 0,
                           size: 11,
                           metadata: { bullet: true, damage: 4, index, moon: true },
                           position: pipe.position.subtract(0, 10),
                           velocity: { y: -4.5, x: rng.attack.next() * 2 - 1 },
                           gravity: { y: 0.2 },
                           objects: [
                              new CosmosSprite({
                                 frames: [ content.ibbMoon ],
                                 anchor: 0,
                                 metadata: { index: 0 }
                              }).on('tick', function () {
                                 if (++this.metadata.index === 7) {
                                    this.metadata.index = 0;
                                    this.rotation.value += 90;
                                 }
                              })
                           ]
                        }).on('tick', function () {
                           boxCheck(this, 10) && detach();
                        })
                     );
                     detachers.push(detach);
                     await renderer.pause(spacetop ? 400 : 200);
                     if (!state.b) {
                        return;
                     }
                  }
                  await pipe.position.modulate(renderer, 1000, { y: box.y2 + 15 });
                  if (!state.b) {
                     return;
                  }
                  de();
               });
               await renderer.pause(spacetop ? 3000 : 1500);
            });
            break;
         }
      }
   },
   async mouse () {
      if (battler.pattern('mouse', [ true, false ])) {
         await renderer.pause(400);
         bulletSequence(async detachers => {
            const randy = box.y1 + rng.attack.next() * (box.sy / 3);
            const { bullet: cheeseb, detach: cheesed } = bulletSetup(
               new CosmosSprite({
                  frames: [ content.ibbCheese ],
                  velocity: { y: -6 },
                  spin: 3 * (rng.attack.next() < 0.5 ? -1 : 1),
                  anchor: 0,
                  gravity: { y: distanceGravity(6, box.sy + 15) },
                  rotation: rng.attack.next() * 360,
                  position: {
                     x: box.x1 + 10 + rng.attack.next() * (box.sx - 20),
                     y: box.y2 + 15 + (randy - box.y1)
                  },
                  metadata: { stage: 0, ticks: 0 },
                  objects: [
                     new CosmosHitbox({
                        size: { x: 7, y: 11 },
                        position: { x: -8, y: -2 },
                        metadata: { bullet: true, damage: 4 }
                     }),
                     new CosmosHitbox({
                        size: { x: 13, y: 11 },
                        position: { x: -6, y: -7 },
                        metadata: { bullet: true, damage: 4 }
                     }),
                     new CosmosHitbox({
                        size: { x: 10, y: 15 },
                        position: { x: -4, y: -9 },
                        metadata: { bullet: true, damage: 4 }
                     })
                  ]
               }).on('tick', async function () {
                  switch (this.metadata.stage) {
                     case 0:
                        if (this.velocity.y > -2) {
                           const side = box.x < 160 ? 0 : 1;
                           this.metadata.stage = 1;
                           const { detach } = bulletSetup(
                              new CosmosHitbox({
                                 anchor: { x: 0, y: 1 },
                                 size: { x: 14, y: 10 },
                                 metadata: { bullet: true, damage: 4 },
                                 velocity: { y: this.velocity.y, x: [ 6, -6 ][side] },
                                 gravity: this.gravity,
                                 position: { y: this.position.y + 7, x: [ box.x1 - 30, box.x2 + 30 ][side] },
                                 scale: { x: [ -1, 1 ][side] },
                                 priority: 2,
                                 objects: [
                                    new CosmosAnimation({
                                       active: true,
                                       anchor: { x: 0, y: 1 },
                                       position: { y: 1 },
                                       resources: content.ibbMouse
                                    }),
                                    // taller hitbox
                                    new CosmosHitbox({
                                       anchor: { x: 0, y: 1 },
                                       size: { x: 12, y: 13 },
                                       metadata: { bullet: true, damage: 4 }
                                    }),
                                    // wider hitbox
                                    new CosmosHitbox({
                                       anchor: 1,
                                       size: { x: 21, y: 6 },
                                       position: { x: 9, y: -3 },
                                       metadata: { bullet: true, damage: 4 }
                                    }),
                                    // top hat hitbox
                                    new CosmosHitbox({
                                       anchor: 1,
                                       size: 8,
                                       position: { x: -5, y: -10 },
                                       metadata: { bullet: true, damage: 4 }
                                    })
                                 ]
                              }).on('tick', function () {
                                 switch (cheeseb.metadata.stage) {
                                    case 1:
                                       if (Math.abs(cheeseb.position.x - this.position.x) < 10) {
                                          sounds.noise.instance(renderer);
                                          cheeseb.velocity.x = this.velocity.x;
                                          cheeseb.metadata.stage = 2;
                                          cheeseb.spin.value = 0;
                                       }
                                       break;
                                    case 2:
                                       if (boxCheck(this, 30)) {
                                          detach();
                                       } else {
                                          quickshadow(this.objects[0] as CosmosSprite, this, battler.bullets);
                                       }
                                       break;
                                 }
                              }),
                              false,
                              null
                           );
                           detachers.push(detach);
                        }
                        break;
                     case 2:
                        if (boxCheck(this, 20)) {
                           cheesed();
                           return;
                        } else {
                           quickshadow(this, this, battler.bullets).rotation.value = this.rotation.value;
                        }
                        break;
                  }
                  if (++this.metadata.ticks === 12) {
                     this.metadata.ticks = 0;
                     const random3 = rand_rad(rng.attack.next());
                     const { detach } = bulletSetup(
                        new CosmosHitbox({
                           anchor: 0,
                           size: 2,
                           metadata: { bullet: true, damage: 4, tickz: 0 },
                           position: { x: this.position.x + random3.next() * 14 - 7, y: this.position.y },
                           velocity: CosmosMath.ray(Math.floor(random3.next() * 360), 0.3),
                           priority: -10,
                           objects: [ new CosmosAnimation({ resources: content.ibbFrogstar, anchor: 0 }) ]
                        }).on('tick', function () {
                           if (this.metadata.tickz++ > 20) {
                              this.metadata.bullet = false;
                              if ((this.alpha.value -= 0.1) <= 0) {
                                 this.alpha.value = 0;
                                 detach();
                              }
                           }
                        }),
                        false
                     );
                  }
               }),
               false,
               null
            );
            detachers.push(cheesed);
            sounds.arrow.instance(renderer);
            await renderer.pause(1600);
         });
      } else {
         bulletSequence(async (detachers, state) => {
            const mx = box.x1 + 5 + rng.attack.next() * (box.sx - 10);
            const sx = mx + box.sx + 5;
            const ex = mx - box.sx - 5;
            const { bullet, detach } = bulletSetup(
               new CosmosHitbox({
                  anchor: { x: 0, y: 1 },
                  size: { x: 14, y: 10 },
                  metadata: { bullet: true, damage: 4 },
                  position: { y: box.y1, x: sx },
                  scale: { y: -1 },
                  priority: 2,
                  objects: [
                     new CosmosAnimation({
                        active: true,
                        anchor: { x: 0, y: 1 },
                        position: { y: 1 },
                        resources: content.ibbMouse
                     }),
                     // taller hitbox
                     new CosmosHitbox({
                        anchor: { x: 0, y: 1 },
                        size: { x: 12, y: 13 },
                        metadata: { bullet: true, damage: 4 }
                     }),
                     // wider hitbox
                     new CosmosHitbox({
                        anchor: 1,
                        size: { x: 21, y: 6 },
                        position: { x: 9, y: 3 },
                        metadata: { bullet: true, damage: 4 }
                     }),
                     // top hat hitbox
                     new CosmosHitbox({
                        anchor: 1,
                        size: 8,
                        position: { x: -5, y: 10 },
                        metadata: { bullet: true, damage: 4 }
                     })
                  ]
               }),
               false,
               null
            );
            detachers.push(detach);
            bullet.position.modulate(renderer, 750, { x: mx }, { x: mx }).then(async () => {
               if (!state.b) {
                  return;
               }
               await bullet.scale.modulate(renderer, 200, { x: 0.9, y: -1.1 }, { x: 0.9, y: -1.1 });
               if (!state.b) {
                  return;
               }
               const { detach: cheesed } = bulletSetup(
                  new CosmosSprite({
                     frames: [ content.ibbCheese ],
                     spin: 1.5 * (rng.attack.next() < 0.5 ? -1 : 1),
                     anchor: 0,
                     gravity: { y: distanceGravity(6, box.sy + 15) },
                     rotation: rng.attack.next() * 360,
                     position: bullet.position.subtract(0, 5),
                     metadata: { ticks: 0 },
                     objects: [
                        new CosmosHitbox({
                           size: { x: 7, y: 11 },
                           position: { x: -8, y: -2 },
                           metadata: { bullet: true, damage: 4 }
                        }),
                        new CosmosHitbox({
                           size: { x: 13, y: 11 },
                           position: { x: -6, y: -7 },
                           metadata: { bullet: true, damage: 4 }
                        }),
                        new CosmosHitbox({
                           size: { x: 10, y: 15 },
                           position: { x: -4, y: -9 },
                           metadata: { bullet: true, damage: 4 }
                        })
                     ]
                  }).on('tick', async function () {
                     if (box.y2 <= this.position.y) {
                        cheesed();
                        sounds.bomb.instance(renderer);
                        shake();
                        let i = 0;
                        const random3 = rand_rad(rng.attack.next());
                        while (i < 8) {
                           const { detach } = bulletSetup(
                              new CosmosSprite({
                                 scale: 0.5,
                                 frames: [ content.ibbCheese ],
                                 spin: 1.5 * (random3.next() < 0.5 ? -1 : 1),
                                 anchor: 0,
                                 velocity: CosmosMath.ray(-120 + random3.next() * 60, 4),
                                 gravity: this.gravity,
                                 rotation: random3.next() * 360,
                                 position: this,
                                 metadata: { ticks: 0 },
                                 objects: [
                                    new CosmosHitbox({
                                       size: { x: 7, y: 11 },
                                       position: { x: -4, y: -1 },
                                       metadata: { bullet: true, damage: 4 }
                                    }),
                                    new CosmosHitbox({
                                       size: { x: 13, y: 11 },
                                       position: { x: -3, y: -3.5 },
                                       metadata: { bullet: true, damage: 4 }
                                    }),
                                    new CosmosHitbox({
                                       size: { x: 10, y: 15 },
                                       position: { x: -2, y: -4.5 },
                                       metadata: { bullet: true, damage: 4 }
                                    })
                                 ]
                              }).on('tick', function () {
                                 boxCheck(this, 15) && detach();
                              })
                           );
                           detachers.push(detach);
                           i++;
                        }
                     }
                     if (++this.metadata.ticks === 12) {
                        this.metadata.ticks = 0;
                        const random3 = rand_rad(rng.attack.next());
                        const { detach } = bulletSetup(
                           new CosmosHitbox({
                              anchor: 0,
                              size: 2,
                              metadata: { bullet: true, damage: 4, tickz: 0 },
                              position: { x: this.position.x + random3.next() * 14 - 7, y: this.position.y },
                              velocity: CosmosMath.ray(Math.floor(random3.next() * 360), 0.3),
                              priority: -10,
                              objects: [ new CosmosAnimation({ resources: content.ibbFrogstar, anchor: 0 }) ]
                           }).on('tick', function () {
                              if (this.metadata.tickz++ > 20) {
                                 this.metadata.bullet = false;
                                 if ((this.alpha.value -= 0.1) <= 0) {
                                    this.alpha.value = 0;
                                    detach();
                                 }
                              }
                           }),
                           false
                        );
                     }
                  }),
                  false,
                  null
               );
               detachers.push(cheesed);
               sounds.swallow.instance(renderer);
               await bullet.scale.modulate(renderer, 100, { x: 1, y: -1 }, { x: 1, y: -1 });
               if (!state.b) {
                  return;
               }
               await bullet.position.modulate(renderer, 750, { x: mx }, { x: ex });
               if (!state.b) {
                  return;
               }
               detach();
            });
            await renderer.pause(1200);
         });
      }
   },
   async doggo (original = false) {
      if (original) {
         const distance = new CosmosValue(100);
         const angleOffset = new CosmosValue(0);
         const angleSpeed = new CosmosValue(2);
         let index = 0;
         const blad = [] as (() => void)[];
         const hype = CosmosUtils.hyperpromise();
         const prom = hype.promise.then(() => {
            for (const b of blad) {
               b();
            }
         });
         while (index < 5) {
            const myIndex = index++;
            const rotation = myIndex * (360 / 5);
            const { detach, detached } = bulletSetup(
               new CosmosHitbox({
                  size: { x: 9, y: 94 },
                  anchor: { x: 0, y: 1 },
                  scale: 0.5,
                  metadata: { bullet: true, damage: 5, color: 'blue' },
                  rotation,
                  objects: [
                     new CosmosSprite({
                        anchor: { x: 0, y: 1 },
                        position: { y: 2 },
                        frames: [ content.ibbSword ],
                        tint: 0x00a2e8
                     })
                  ]
               }).on('tick', function () {
                  this.rotation.value = rotation + angleOffset.value + 90;
                  this.position.set(battler.box.position.endpoint(rotation + angleOffset.value, distance.value));
                  if (myIndex === 0) {
                     angleOffset.value += angleSpeed.value;
                  }
               })
            );
            blad.push(detach);
            detached.then(() => hype.resolve());
         }
         await Promise.race([ prom, distance.modulate(renderer, 1000, 10, 10) ]);
         if (!hype.active) {
            return;
         }
         angleSpeed.modulate(renderer, 1400, 2, 2, 5);
         await Promise.race([ prom, renderer.pause(1500) ]);
         if (!hype.active) {
            return;
         }
         angleSpeed.modulate(renderer, 600, 1);
         await Promise.race([ prom, distance.modulate(renderer, 1200, 40, 40, -150) ]);
         hype.active && hype.resolve();
      } else {
         const blad = [] as (() => void)[];
         const hype = CosmosUtils.hyperpromise();
         const prom = hype.promise.then(() => {
            for (const b of blad) {
               b();
            }
         });
         const swordDist = new CosmosValue(box.sx / 2);
         let index = 0;
         while (index < 2) {
            const myIndex = index++;
            const { detach, detached } = bulletSetup(
               new CosmosHitbox({
                  anchor: 0,
                  size: { x: 9, y: 94 },
                  metadata: { damage: 5, bullet: true, color: 'blue' },
                  scale: 0.5,
                  objects: [ new CosmosSprite({ anchor: 0, frames: [ content.ibbSword ], tint: 0x00a2e8 }) ]
               }).on('tick', function () {
                  this.position.set(box.x + swordDist.value * [ -1, 1 ][myIndex], box.y);
               })
            );
            blad.push(detach);
            detached.then(() => hype.resolve());
         }
         const lastPos = battler.SOUL.position.value();
         const distTicker = {
            priority: 13581395,
            listener: () => {
               if (battler.SOUL.position.x !== lastPos.x || battler.SOUL.position.y !== lastPos.y) {
                  const dist = Math.max(
                     Math.abs(battler.SOUL.position.x - lastPos.x),
                     Math.abs(battler.SOUL.position.y - lastPos.y)
                  );
                  lastPos.x = battler.SOUL.position.x;
                  lastPos.y = battler.SOUL.position.y;
                  swordDist.value > 0 &&
                     (swordDist.value -= dist < battler.stat.speed.compute() ? 0.25 : 1) < 0 &&
                     (swordDist.value = 0);
               }
            }
         };
         battler.SOUL.on('tick', distTicker);
         await Promise.race([ prom, renderer.pause(500) ]);
         if (!hype.active) {
            return;
         }
         let f = rng.attack.int(2);
         const tt = renderer.pause(6900).then(() => hype.resolve());
         while (hype.active) {
            const myF = f;
            f = 1 - f;
            const { detach } = bulletSetup(
               new CosmosHitbox({
                  anchor: 0,
                  size: { x: 9, y: 94 },
                  metadata: { damage: 5, bullet: true, color: 'orange' },
                  scale: 0.5,
                  velocity: { x: [ 4, -4 ][myF] },
                  position: { y: box.y, x: myF === 0 ? box.x1 - 10 : box.x2 + 10 },
                  objects: [ new CosmosSprite({ anchor: 0, frames: [ content.ibbSword ], tint: 0xff993d }) ]
               }).on('tick', function () {
                  (myF === 0 ? box.x2 <= this.position.x : this.position.x < box.x1) && detach();
               })
            );
            blad.push(detach);
            await Promise.race([ tt, renderer.pause(200) ]);
         }
         battler.SOUL.off('tick', distTicker);
      }
   },
   lesserdog (index?: number) {
      switch (typeof index === 'number' ? index : battler.pattern('lesserdog', [ 0, 1 ])) {
         case 0: {
            let flip = rng.attack.int(2);
            bulletSequence(async detachers => {
               const myF = flip;
               rng.attack.next() < 3 / 4 && (flip = 1 - flip);
               const { detach } = bulletSetup(
                  new CosmosHitbox({
                     size: { x: 9, y: 94 },
                     anchor: { x: 0, y: 1 },
                     metadata: { damage: 5, bullet: true },
                     velocity: { x: -CosmosMath.remap(rng.attack.next(), 2, 2.8) },
                     scale: 0.5,
                     position: { x: box.x2 + 10, y: myF === 0 ? box.y2 - 10 : box.y1 + 10 },
                     objects: [
                        new CosmosSprite({ anchor: { x: 0, y: 1 }, position: { y: 2 }, frames: [ content.ibbSword ] })
                     ],
                     rotation: [ 0, 180 ][myF]
                  }).on('tick', function () {
                     boxCheck(this, 10) && detach();
                  })
               );
               detachers.push(detach);
               await renderer.pause(850 + rng.attack.next() * 350);
            });
            break;
         }
         case 1: {
            bulletSequence(async detachers => {
               const y = box.y1 + 10 + rng.attack.next() * (box.sy - 20);
               const [ { detach: d1 }, { detach: d2 } ] = CosmosUtils.populate(2, i =>
                  bulletSetup(
                     new CosmosHitbox({
                        size: { x: 9, y: 94 },
                        anchor: { x: 0, y: 1 },
                        metadata: { damage: 5, bullet: true },
                        velocity: { x: -2 },
                        scale: 0.5,
                        position: { x: box.x2 + 10, y: y + [ -10, 10 ][i] },
                        objects: [
                           new CosmosSprite({ anchor: { x: 0, y: 1 }, position: { y: 2 }, frames: [ content.ibbSword ] })
                        ],
                        rotation: [ 0, 180 ][i]
                     }).on('tick', function () {
                        boxCheck(this, 10) && [ d1, d2 ][i]();
                     })
                  )
               );
               detachers.push(d1);
               detachers.push(d2);
               await renderer.pause(650);
            });
            break;
         }
      }
   },
   dogs (index: number, modifier?: string) {
      switch (index) {
         case 0: {
            bulletSequence(async (detachers, state) => {
               let shad = false;
               const sp = new CosmosValue(360);
               const dist = new CosmosValue(box.sx / 2);
               const x = box.x + (rng.attack.next() * 80 - 40);
               const warnalpha = new CosmosValue();
               const axes = CosmosUtils.populate(2, index => {
                  const xs = [ 1, -1 ][index];
                  const dv = xs * 2;
                  const fx = [ 0, 7.5 ][index] + 40;
                  const { bullet, detach } = bulletSetup(
                     new CosmosObject({
                        scale: { x: xs / 2, y: 0.5 },
                        position: { y: box.y1 + 5 },
                        priority: 2,
                        objects: [
                           new CosmosAnimation({
                              anchor: { y: 0 },
                              resources: content.ibbAx,
                              index,
                              position: { x: -7.5 / 2 },
                              objects: [
                                 new CosmosHitbox({
                                    size: { x: 197, y: 11 },
                                    anchor: { y: 0 },
                                    position: { x: 5 / dv + fx },
                                    metadata: { bullet: true, damage: 5 }
                                 }),
                                 new CosmosHitbox({
                                    size: { x: 52, y: 78 },
                                    position: { x: 131 / dv + fx, y: -14.5 / 2 },
                                    metadata: { bullet: true, damage: 5 }
                                 }),
                                 new CosmosHitbox({
                                    size: { x: 80, y: 11 },
                                    position: { x: 117 / dv + fx, y: -13.5 / 2 },
                                    metadata: { bullet: true, damage: 5 }
                                 }),
                                 new CosmosHitbox({
                                    size: { x: 15, y: 41 },
                                    position: { x: 119 / dv + fx, y: 57.5 / 2 },
                                    anchor: { y: 1 },
                                    rotation: 17 * xs,
                                    metadata: { bullet: true, damage: 5 }
                                 }),
                                 new CosmosHitbox({
                                    size: { x: 15, y: 41 },
                                    position: { x: 195 / dv + fx, y: 57.5 / 2 },
                                    anchor: 1,
                                    rotation: -17 * xs,
                                    metadata: { bullet: true, damage: 5 }
                                 })
                              ]
                           })
                        ]
                     }).on('tick', function () {
                        this.position.x = x + (dist.value + (201 + 80) / 2) * [ -1, 1 ][index];
                        this.rotation.value = index === 0 ? sp.value : -sp.value;
                        if (shad) {
                           const spr = quickshadow(
                              this.objects[0] as CosmosSprite,
                              this.position.add(this.objects[0]).shift(this.rotation.value, 0, this),
                              battler.bullets
                           );
                           spr.rotation.value = this.rotation.value;
                           spr.scale.set(this.scale);
                        }
                     }),
                     false,
                     null
                  );
                  detachers.push(detach);
                  return { bullet, detach };
               });
               sounds.appear.instance(renderer);
               await Promise.all([
                  dist.modulate(renderer, 800, -15, -15),
                  renderer.pause(200).then(async () => {
                     warnalpha.value = 0.35;
                     await renderer.pause(100);
                     warnalpha.value = 0;
                     await renderer.pause(100);
                     warnalpha.value = 0.35;
                     await renderer.pause(200);
                     warnalpha.value = 0;
                  })
               ]);
               if (!state.b) {
                  return;
               }
               shad = true;
               warnalpha.value = 0;
               await sp.modulate(renderer, 1000, 360, -15, -15);
               if (!state.b) {
                  return;
               }
               await sp.modulate(renderer, 300, sp.value, 25);
               if (!state.b) {
                  return;
               }
               shad = false;
               sounds.bomb.instance(renderer);
               sounds.noise.instance(renderer);
               shake();
               renderer.pause(500).then(async () => {
                  if (!state.b) {
                     return;
                  }
                  await Promise.all(
                     axes.map(axe => {
                        for (const ob of axe.bullet.objects[0].objects) {
                           ob.metadata.bullet = false;
                        }
                        return axe.bullet.alpha.modulate(renderer, 500, 0);
                     })
                  );
                  if (!state.b) {
                     return;
                  }
                  for (const axe of axes) {
                     axe.detach();
                  }
               });
               await renderer.pause(1000);
            });
            break;
         }
         case 1: {
            const zad = modifier === 'dogamy';
            const salt = modifier === 'dogaressa';
            const doggies = CosmosUtils.populate(modifier === void 0 ? 2 : 1, i => {
               const trueIndex = salt ? 1 : i;
               const spr = new OutertaleMultivisualObject(
                  { scale: 0.5, position: { x: 0, y: 1 } },
                  { active: true, anchor: { x: 0, y: 1 } }
               );
               spr.use(zad ? content.ibbPomSad : salt ? content.ibbPomwalkSad : content.ibbPomwag);
               return new CosmosHitbox({
                  size: { x: 17, y: 15 },
                  anchor: { x: 0, y: 1 },
                  position: { x: [ 40, 280 ][trueIndex], y: 180 },
                  metadata: { bullet: true, damage: 5, sh: salt ? 1 : 0 },
                  scale: { x: trueIndex === 0 ? -1 : 1 },
                  objects: [ spr ]
               }).on('tick', function () {
                  this.objects[0].offsets[0].set(
                     this.metadata.sh * (Math.random() * 2 - 1),
                     this.metadata.sh * (Math.random() * 2 - 1)
                  );
               });
            });
            const susser = doggies[0];
            const animeSusser = susser.objects[0] as OutertaleMultivisualObject;
            if (salt) {
               battler.bullets.attach(susser);
               bulletSequence(async (detachers, state) => {
                  await renderer.pause(200);
                  if (!state.b) {
                     return;
                  }
                  susser.metadata.sh = 0;
                  sounds.bark.instance(renderer);
                  animeSusser.use(content.ibbPomjumpSad);
                  renderer.pause(400).then(() => {
                     state.b && animeSusser.use(content.ibbPomwalkSad);
                  });
                  const target = battler.SOUL.position.clone();
                  await susser.position.modulate(renderer, 700, target, target);
                  if (!state.b) {
                     return;
                  }
                  susser.metadata.sh = 1;
               });
            } else {
               const promiz = events.on('turn-timer');
               renderer.attach('menu', ...doggies);
               promiz.then(() => renderer.detach('menu', ...doggies));
               bulletSequence(async (detachers, state) => {
                  let c = 0;
                  const size = new CosmosValue();
                  const position = new CosmosPoint(45, 170);
                  const rotation = new CosmosValue(rng.attack.next() * 360);
                  const shaker = new CosmosValue();
                  const hearts = CosmosUtils.populate(30, index => {
                     const rad = rand_rad(rng.attack.next());
                     const shx = rad.next();
                     return new CosmosHitbox({
                        priority: 1000,
                        anchor: 0,
                        size: 8,
                        scale: 0.5,
                        metadata: { bullet: true, damage: 5, color: void 0 as string | void, shaken: false },
                        objects: [ new CosmosAnimation({ anchor: 0, resources: content.ibbHeart }) ]
                     }).on('tick', function () {
                        if (this.metadata.shaken) {
                           screenCheck(this, 10) && renderer.detach('menu', this);
                        } else if (shaker.value > shx) {
                           this.metadata.shaken = true;
                           this.velocity.set(rad.next() * 2 - 1, 0.5 + rad.next() * -0.5);
                           this.gravity.y = 0.2;
                        } else {
                           this.metadata.color = [ 'white', 'orange' ][c];
                           (this.objects[0] as CosmosAnimation).index = c * 2;
                           this.position.set(
                              position
                                 .add(starGenerator(size.value, size.value, 5, (index / 30) * 360, rotation.value))
                                 .add(shaker.value * (rad.next() * 2 - 1) * 3, shaker.value * (rad.next() * 2 - 1) * 3)
                           );
                        }
                     });
                  });
                  renderer.attach('menu', ...hearts);
                  promiz.then(() => renderer.detach('menu', ...hearts));
                  sounds.bark.instance(renderer);
                  animeSusser.use(zad ? content.ibbPombarkSad : content.ibbPombark);
                  renderer.pause(150).then(() => {
                     state.b && animeSusser.use(zad ? content.ibbPomSad : content.ibbPomwag);
                  });
                  zad && shaker.modulate(renderer, 6000, 0, 0, 1);
                  renderer.pause(500).then(async () => {
                     if (!state.b) {
                        return;
                     }
                     c = 1;
                     sounds.noise.instance(renderer);
                     await renderer.pause(100);
                     if (!state.b) {
                        return;
                     }
                     c = 0;
                     await renderer.pause(100);
                     if (!state.b) {
                        return;
                     }
                     c = 1;
                     sounds.noise.instance(renderer);
                     if (zad) {
                        return;
                     }
                     await renderer.pause(600);
                     if (!state.b) {
                        return;
                     }
                     c = 0;
                     await renderer.pause(600);
                     if (!state.b) {
                        return;
                     }
                     c = 1;
                     await renderer.pause(600);
                     if (!state.b) {
                        return;
                     }
                     c = 0;
                     await renderer.pause(600);
                     if (!state.b) {
                        return;
                     }
                     c = 1;
                     await renderer.pause(600);
                     if (!state.b) {
                        return;
                     }
                     c = 0;
                  });
                  size.modulate(renderer, zad ? 1500 : 750, 20).then(async () => {
                     if (zad || !state.b) {
                        return;
                     }
                     await renderer.pause(2500);
                     if (!state.b) {
                        return;
                     }
                     size.modulate(renderer, 750, 0);
                  });
                  rotation.modulate(renderer, zad ? 8000 : 4000, rotation.value + (zad ? 90 : 180));
                  await position.modulate(renderer, zad ? 8000 : 4000, { x: 275 });
                  if (!state.b) {
                     return;
                  }
                  renderer.detach('menu', ...hearts);
               });
            }
            break;
         }
      }
   },
   async greatdog (index: number) {
      if (index === 0) {
         let b = true;
         const sayo = [] as (() => void)[];
         const dogger = new OutertaleMultivisualObject(
            { scale: 0.5, position: { x: box.x2 + 10, y: box.y }, offsets: [ { y: 0.5 } ] },
            { active: true, anchor: { y: 0 } }
         );
         dogger.use(content.ibbPomwag);
         renderer.attach('menu', dogger);
         let s = 0;
         let d = 0;
         let x = false;
         const mover = () => {
            if (d === 0) {
               dogger.position.y -= 1;
               if (dogger.position.y <= box.y1) {
                  dogger.position.y = box.y1;
                  d = 1;
               }
            } else {
               dogger.position.y += 1;
               if (box.y2 <= dogger.position.y) {
                  dogger.position.y = box.y2;
                  d = 0;
               }
            }
            if (++s === 45) {
               s = 0;
               sounds.bark.instance(renderer);
               x = true;
               dogger.use(content.ibbPombark);
               renderer.pause(150).then(() => {
                  b && (x = false);
               });
               const { detach } = bulletSetup(
                  new CosmosHitbox({
                     anchor: 0,
                     size: { x: 21, y: 9 },
                     metadata: { damage: 5, bullet: true },
                     position: dogger,
                     velocity: CosmosMath.ray(dogger.position.angleTo(battler.SOUL), 5),
                     objects: [ new CosmosSprite({ anchor: 0, frames: [ content.ibbBark ] }) ]
                  }).on('tick', function () {
                     screenCheck(this, 15) && detach();
                  }),
                  true
               );
               sayo.push(detach);
            }
         };
         const lastPos = battler.SOUL.position.value();
         const distTicker = {
            priority: 13581395,
            listener: async () => {
               if (battler.SOUL.position.x !== lastPos.x || battler.SOUL.position.y !== lastPos.y) {
                  const dist = Math.max(
                     Math.abs(battler.SOUL.position.x - lastPos.x),
                     Math.abs(battler.SOUL.position.y - lastPos.y)
                  );
                  lastPos.x = battler.SOUL.position.x;
                  lastPos.y = battler.SOUL.position.y;
                  if (dist === battler.stat.speed.compute()) {
                     x || dogger.use(content.ibbPomwag);
                     mover();
                  } else {
                     x || dogger.use(content.ibbPomwalk);
                     mover();
                     mover();
                  }
               } else {
                  x || dogger.use(content.ibbPomwalk);
                  mover();
                  mover();
                  mover();
                  mover();
               }
            }
         };
         battler.SOUL.on('tick', distTicker);
         await renderer.pause(8000);
         battler.SOUL.off('tick', distTicker);
         b = false;
         for (const sayonara of sayo) {
            sayonara();
         }
         renderer.detach('menu', dogger);
      } else {
         const spr = new OutertaleMultivisualObject(
            { scale: 0.5, position: { y: 1 } },
            { active: true, anchor: { x: 0, y: 1 } }
         );
         spr.use(content.ibbPomwag);
         const { bullet, detach, detached } = bulletSetup(
            new CosmosHitbox({
               size: { x: 17, y: 15 },
               anchor: { x: 0, y: 1 },
               position: { x: box.x2 - 10, y: box.y2 },
               priority: 20,
               metadata: { bullet: true, damage: 5 },
               objects: [ spr ]
            }).on('tick', function () {
               boxCheck(this, 20) && detach();
            })
         );
         let b = true;
         const POMise = detached.then(() => {
            b = false;
         });
         renderer.pause(250).then(async () => {
            if (!b) {
               return;
            }
            let barks = 0;
            while (barks++ < 2) {
               sounds.bark.instance(renderer);
               spr.use(content.ibbPombark);
               await renderer.pause(150);
               if (!b) {
                  return;
               }
               spr.use(content.ibbPomwag);
               await renderer.pause(350);
               if (!b) {
                  return;
               }
            }
            spr.use(content.ibbPomwalk);
            bullet.velocity.x = -0.2;
            bullet.gravity.x = -0.15;
            bullet.scale.modulate(renderer, 2000, { x: 1.5, y: 0.8 });
            await renderer.when(
               () =>
                  !b ||
                  (bullet.position.x - battler.SOUL.position.x < 50 && battler.SOUL.position.y < bullet.position.y - 15)
            );
            if (!b) {
               return;
            }
            bullet.scale.modulate(renderer, 500, 1.5, 1, 1);
            bullet.gravity.set(0, 0.2);
            bullet.velocity.set(
               bullet.velocity.divide(2.5).endpoint(bullet.position.angleTo(battler.SOUL), 3).add(1, -1.35)
            );
            spr.use(content.ibbPomjump);
            await renderer.when(() => !b || (bullet.velocity.y < -1 && bullet.velocity.y > -2));
            if (!b) {
               return;
            }
            const h = spr.sprite.compute().y / -2;
            const fris = new CosmosAnimation({
               active: true,
               resources: content.ibbFrisbee,
               anchor: 0,
               velocity: { y: bullet.velocity.y, x: 8 },
               gravity: { y: 0.2 },
               scale: 0.5,
               priority: 2,
               position: { x: box.x1 - 15, y: bullet.position.y + h / 2 },
               objects: [
                  new CosmosHitbox({
                     size: { x: 36, y: 13 },
                     anchor: 0,
                     metadata: { bullet: true, damage: 5 }
                  })
               ]
            }).on('tick', function () {
               if (!b || boxCheck(this, 20)) {
                  battler.bullets.detach(fris);
               } else if (Math.abs(bullet.position.x - this.position.x) < 10) {
                  battler.bullets.detach(fris);
                  sounds.swallow.instance(renderer);
                  bullet.scale.modulate(renderer, 500, 3, 2);
                  const shad = new CosmosSprite({
                     anchor: 0,
                     frames: [ content.ibbPomjump ],
                     scale: 1,
                     alpha: 0.8,
                     position: { y: h }
                  });
                  spr.attach(shad);
                  Promise.all([ shad.scale.modulate(renderer, 300, 2), shad.alpha.modulate(renderer, 300, 0) ]).then(() =>
                     spr.detach(shad)
                  );
               } else {
                  quickshadow(this, this, battler.bullets);
               }
            });
            battler.bullets.attach(fris);
         });
         await POMise;
      }
   },
   async papyrus (state: { d: boolean }, index: number) {
      battler.stat.invulnerability.modifiers.push([ 'multiply', 3, 1 ]);
      battler.SOUL.metadata.color === 'blue' && (battler.SOUL.velocity.y = -1);
      switch (index) {
         case -1:
            // I THOUGHT ABOUT USING SOME HARMLESS "PREVIEW" BONES HERE, BUT DECIDED IT'D BE...
            // YEAH, IT'D BE TOO AWKWARD IF AN ATTACK DIDN'T ACTUALLY DO ANYTHING.
            /*
            await renderer.pause(850);
            await pattern(state, async factory => {
               let index = 0;
               while (index++ < 3) {
                  factory(0, CosmosMath.remap(random.attack.next(), 10, 25), 2, 0);
                  await renderer.pause(1000);
               }
            });
            */
            break;
         case 0:
            // MY RENOWNED "BLUE ATTACK!"
            const rad = rand_rad(rng.attack.next());
            await papPattern(state, async factory => {
               let index = 0;
               while (index++ < 20) {
                  const top = rad.next() < 0.5;
                  factory(1, (top ? -20 : 20) + rad.next() * (top ? -60 : 60), (1 + rad.next() * 2) * 1.6, 0);
                  await renderer.pause((200 + rad.next() * 600) / 1.6);
               }
               await (battler.music as CosmosInstance).gain.modulate(renderer, 2000, 0);
            });
            if (!state.d) {
               const shad = new CosmosAnimation({
                  anchor: 0,
                  resources: content.ibuBlueSOUL,
                  scale: 0.5,
                  alpha: 0.8
               });
               battler.SOUL.attach(shad);
               sounds.bell.instance(renderer);
               Promise.all([ shad.scale.modulate(renderer, 500, 1, 1), shad.alpha.modulate(renderer, 500, 1, 0) ]).then(
                  () => {
                     battler.SOUL.detach(shad);
                  }
               );
               battler.SOUL.metadata.color = 'blue';
               if (battler.SOUL.position.y < 188) {
                  battler.SOUL.velocity.y = -1;
               }
            }
            await renderer.when(() => battler.SOUL.position.y > 168);
            await papPattern(state, async factory => void factory(0, 13, 4));
            await renderer.pause(1000);
            break;
         case 1:
            // THIS ONE'S PRETTY BASIC. JUST A STARTER PATTERN.
            await papPattern(state, async factory => {
               await renderer.pause(600);
               factory(0, 10, 2);
               await renderer.pause(1500);
               factory(0, 20, 2);
               await renderer.pause(1500);
               factory(0, 10, 2);
            });
            break;
         case 2:
            // I TOOK THE STARTER PATTERN AND UPGRADED IT! NYEH!
            await papPattern(state, async factory => {
               await renderer.pause(600);
               factory(0, 10, 3);
               await renderer.pause(1200);
               factory(0, 20, 3);
               await renderer.pause(1200);
               factory(0, 30, 3);
               await renderer.pause(1200);
               factory(0, 20, 3);
               await renderer.pause(1200);
               factory(0, 10, 3);
            });
            break;
         case 3:
            // THIS ONE MAKES YOU JUMP IN A SATISFYING WAY.
            await papPattern(state, async factory => {
               let index = 0;
               while (index++ < 3) {
                  await renderer.pause(index === 0 ? 600 : 700);
                  factory(0, -80, 2.5);
                  await renderer.pause(700);
                  factory(0, 10, 2.5).on('tick', papWaver(0.6, 10, 20));
                  await renderer.pause(150);
                  factory(0, 10, 2.5).on('tick', papWaver(0.6, 10, 20));
               }
            });
            break;
         case 4:
            // AND THIS ONE DOES THAT BUT BETTER!!
            await papPattern(state, async factory => {
               let index = 0;
               while (index++ < 3) {
                  await renderer.pause(600);
                  factory(0, -80, 3.5);
                  await renderer.pause(120);
                  factory(0, -80, 3.5);
                  await renderer.pause(600);
                  factory(0, 10, 3.5).on('tick', papWaver(1.2, 10, 30));
                  await renderer.pause(120);
                  factory(0, 10, 3.5).on('tick', papWaver(1.2, 10, 30));
                  await renderer.pause(120);
                  factory(0, 10, 3.5).on('tick', papWaver(1.2, 10, 30));
               }
            });
            break;
         case 5:
            // MY FIRST (?) BLUE BONE ATTACK! SPLENDID!
            await papPattern(state, async factory => {
               let index = 0;
               while (index++ < 3) {
                  await renderer.pause(600);
                  factory(1, 80, 4);
                  await renderer.pause(400);
                  factory(0, 20, 3.5);
                  if (index < 3) {
                     await renderer.pause(800);
                  }
               }
            });
            break;
         case 6:
            // SHIMMY! SHAKE! FIT THROUGH THESE THREE TIGHT GAPS!
            await papPattern(state, async factory => {
               let index = 0;
               while (index++ < 3) {
                  await renderer.pause(600);
                  factory(0, -40, 3);
                  factory(0, 30, 3);
                  if (index < 3) {
                     await renderer.pause(900);
                  }
               }
            });
            break;
         case 7:
            // THE FIRST BLUE ATTACK AGAIN, BUT TWICE!!
            await papPattern(state, async factory => {
               let superindex = 0;
               while (superindex++ < 2) {
                  let index = 0;
                  while (index++ < 2) {
                     await renderer.pause(600);
                     factory(1, 80, [ 4, -4 ][superindex - 1]);
                     await renderer.pause(400);
                     factory(0, 20, [ 3.5, -3.5 ][superindex - 1]);
                     if (superindex < 2 || index < 2) {
                        await renderer.pause(800);
                     }
                  }
               }
            });
            break;
         case 8:
            // THOUGHT JUMPING THROUGH A 1-BONE GAP WAS TOUGH? GET A LOAD OF THIS!!
            await papPattern(state, async factory => {
               let index = 0;
               while (index++ < 2) {
                  await renderer.pause(600);
                  factory(0, -50, 3);
                  factory(0, 15, 3);
                  await renderer.pause(133);
                  factory(0, -40, 3);
                  factory(0, 25, 3);
                  await renderer.pause(133);
                  factory(0, -30, 3);
                  factory(0, 35, 3);
                  await renderer.pause(1300);
                  factory(0, -30, 3);
                  factory(0, 35, 3);
                  await renderer.pause(133);
                  factory(0, -35, 3);
                  factory(0, 30, 3);
                  await renderer.pause(133);
                  factory(0, -40, 3);
                  factory(0, 25, 3);
                  if (index < 2) {
                     await renderer.pause(500);
                  }
               }
            });
            break;
         case 9:
            // INTRODUCING: ORANGE!
            await papPattern(state, async factory => {
               let index = 0;
               while (index++ < 3) {
                  await renderer.pause(600);
                  factory(0, -40, 3);
                  factory(0, 30, 3);
                  await renderer.pause(600);
                  factory(1, 80, 2);
                  await renderer.pause(300);
                  factory(2, 80, 5);
                  if (index < 3) {
                     await renderer.pause(700);
                  }
               }
            });
            break;
         case 10:
            // BONE PYRAMIDS. JUMP TO THE RIGHT, THEN BACK TO THE LEFT!
            // IT'S LIKE A SEE-SAW OF SERENDIPITY!
            await papPattern(state, async factory => {
               await renderer.pause(600);
               factory(0, 15, 3);
               await renderer.pause(100);
               factory(0, 25, 3);
               await renderer.pause(100);
               factory(0, 35, 3);
               await renderer.pause(100);
               factory(0, 40, 3);
               await renderer.pause(100);
               factory(0, 35, 3);
               await renderer.pause(100);
               factory(0, 25, 3);
               await renderer.pause(100);
               factory(0, 15, 3);
               await renderer.pause(1000);
               factory(0, 15, -3);
               await renderer.pause(100);
               factory(0, 25, -3);
               await renderer.pause(100);
               factory(0, 35, -3);
               await renderer.pause(100);
               factory(0, 40, -3);
               await renderer.pause(100);
               factory(0, 35, -3);
               await renderer.pause(100);
               factory(0, 25, -3);
               await renderer.pause(100);
               factory(0, 15, -3);
            });
            await papPattern(state, async factory => {
               factory(0, 15, 4);
               await renderer.pause(133);
               factory(0, 25, 4);
               await renderer.pause(133);
               factory(0, 35, 4);
               await renderer.pause(133);
               factory(0, 40, 4);
               await renderer.pause(133);
               factory(0, 35, 4);
               await renderer.pause(133);
               factory(0, 25, 4);
               await renderer.pause(133);
               factory(0, 15, 4);
               await renderer.pause(1000);
               factory(0, 15, -4);
               await renderer.pause(133);
               factory(0, 25, -4);
               await renderer.pause(133);
               factory(0, 35, -4);
               await renderer.pause(133);
               factory(0, 40, -4);
               await renderer.pause(133);
               factory(0, 35, -4);
               await renderer.pause(133);
               factory(0, 25, -4);
               await renderer.pause(133);
               factory(0, 15, -4);
            });
            break;
         case 11:
            // SANS TOLD ME TO PUT THIS ONE IN HERE.
            // IT FEELS WEIRD SOMEHOW.
            await papPattern(state, async factory => {
               let index = 0;
               while (index++ < 3) {
                  await renderer.pause(600);
                  factory(0, 10, 3);
                  factory(0, -60, 3);
                  factory(0, 10, -3);
                  factory(0, -60, -3);
                  if (index < 3) {
                     await renderer.pause(700);
                  }
               }
            });
            break;
         case 12:
            // BONE CHEMISTRY: DON'T TRY IT AT HOME.
            await renderer.pause(600);
            await papPattern(state, async factory => {
               let index = 0;
               while (index++ < 3) {
                  await renderer.pause(600);
                  factory(0, -30, -3);
                  factory(0, 40, -3);
                  await renderer.pause(600);
                  factory(1, 80, -2);
                  await renderer.pause(300);
                  factory(2, 80, -5);
                  if (index < 3) {
                     await renderer.pause(500);
                  }
               }
            });
            break;
         case 13:
            // AND NOW IT'S GOT BLUE -AND- ORANGE BONES!!!
            await papPattern(state, async factory => {
               await renderer.pause(600);
               factory(1, 80, 5);
               await renderer.pause(200);
               factory(2, 80, 3);
               await renderer.pause(400);
               factory(0, 15, 2.5);
               await renderer.pause(200);
               factory(0, 30, 2.5);
               await renderer.pause(200);
               factory(0, 40, 2.5);
               await renderer.pause(200);
               factory(0, 30, 2.5);
               await renderer.pause(200);
               factory(0, 15, 2.5);
               await renderer.pause(1400);
               factory(1, 80, -5);
               await renderer.pause(200);
               factory(2, 80, -3);
               await renderer.pause(400);
               factory(0, 15, -2.5);
               await renderer.pause(200);
               factory(0, 30, -2.5);
               await renderer.pause(200);
               factory(0, 40, -2.5);
               await renderer.pause(200);
               factory(0, 30, -2.5);
               await renderer.pause(200);
               factory(0, 15, -2.5);
            });
            break;
         case 14:
            // SANS UPGRADED HIS ATTACK!? HE'S NOT LAZY AFTER ALL!?
            // THIS IS IMPOSSIBLE!!
            await papPattern(state, async factory => {
               let index = 0;
               while (index++ < 5) {
                  await renderer.pause(600);
                  factory(0, 5, 3.5);
                  factory(0, -65, 3.5);
                  factory(0, 5, -3.5);
                  factory(0, -65, -3.5);
                  if (index < 5) {
                     await renderer.pause(300);
                  }
               }
            });
            break;
         case 15:
            // THE SATISFYING PATTERNS RETURN!!!
            await papPattern(state, async factory => {
               let index = 0;
               while (index++ < 3) {
                  await renderer.pause(index === 0 ? 600 : 700);
                  factory(0, -30, 3.5);
                  factory(0, 30, 3.5);
                  await renderer.pause(150);
                  factory(0, -30, 3.5);
                  factory(0, 30, 3.5);
                  await renderer.pause(1000);
                  factory(0, -50, 3.5).on('tick', papWaver(2, -50, -30));
                  factory(0, 10, 3.5).on('tick', papWaver(2, 10, 30));
                  await renderer.pause(133);
                  factory(0, -50, 3.5).on('tick', papWaver(2, -50, -30));
                  factory(0, 10, 3.5).on('tick', papWaver(2, 10, 30));
                  await renderer.pause(133);
                  factory(0, -50, 3.5).on('tick', papWaver(2, -50, -30));
                  factory(0, 10, 3.5).on('tick', papWaver(2, 10, 30));
                  await renderer.pause(133);
                  factory(0, -50, 3.5).on('tick', papWaver(2, -50, -30));
                  factory(0, 10, 3.5).on('tick', papWaver(2, 10, 30));
                  if (index < 3) {
                     await renderer.pause(800);
                  }
               }
            });
            break;
         case 16:
            // HEY, IT'S THAT TINY GAP ATTACK AGAIN.
            // OH YEAH, I ADDED BLUE AND ORANGE BONES TO MAKE IT COOLER.
            await papPattern(state, async factory => {
               let index = 0;
               while (index++ < 2) {
                  await renderer.pause(600);
                  factory(0, -50, 3);
                  factory(0, 15, 3);
                  await renderer.pause(133);
                  factory(0, -40, 3);
                  factory(0, 25, 3);
                  await renderer.pause(133);
                  factory(0, -30, 3);
                  factory(0, 35, 3);
                  await renderer.pause(333);
                  factory(2, -60, 3);
                  factory(0, 40, 3);
                  await renderer.pause(1300);
                  factory(0, -30, 3);
                  factory(0, 35, 3);
                  await renderer.pause(133);
                  factory(0, -35, 3);
                  factory(0, 30, 3);
                  await renderer.pause(133);
                  factory(0, -40, 3);
                  factory(0, 25, 3);
                  await renderer.pause(566);
                  factory(0, -80, 3);
                  factory(1, 20, 3);
                  if (index < 2) {
                     await renderer.pause(500);
                  }
               }
            });
            break;
         case 17:
            // THIS ATTACK IS A TRUE ROLLERCOASTER OF (E)MOTION!
            // DEPENDING ON HOW YOU GET THROUGH IT.
            await papPattern(state, async factory => {
               let index = 0;
               while (index++ < 5) {
                  await renderer.pause(index === 0 ? 600 : 700);
                  factory(1, 20, 1.25);
                  factory(0, -80, 1.25);
                  await renderer.pause(700);
                  factory(0, 20, 1.25);
                  factory(2, -80, 1.25);
                  if (index < 5) {
                     await renderer.pause(300);
                  }
               }
            });
            break;
         case 18:
            // I CALL THIS ONE "THE TRICKSTER."
            // SOMETIMES, ALL YOU NEED IS JUST ONE BONE...
            await papPattern(state, async factory => {
               await renderer.pause(600);
               const trickster = factory(0, 30, 3);
               await renderer.when(() => trickster.position.x < battler.SOUL.position.x + 20);
               trickster.velocity.x = 0;
               const listener = () => {
                  if (trickster.position.x < battler.SOUL.position.x + 20) {
                     trickster.position.x = battler.SOUL.position.x + 20;
                  }
               };
               trickster.on('tick', listener);
               await renderer.when(() => battler.SOUL.position.y < 188);
               await renderer.when(() => 188 <= battler.SOUL.position.y);
               trickster.off('tick', listener);
               trickster.velocity.x = -6;
            });
            break;
         case 19:
            // PREPARE FOR THE DRAMATIC REVEAL OF... MY SPECIAL ATTACK!
            const volatile = battler.volatile[0];
            (battler.music as CosmosInstance).gain.modulate(renderer, 2000, 0);
            const cx = volatile.container.position.x;
            const cy = volatile.container.position.y;
            await renderer.pause(500);
            await volatile.container.position.modulate(
               renderer,
               750,
               { x: 40, y: cy },
               { x: 40, y: cy },
               { x: 40, y: cy }
            );
            await renderer.pause(250);
            const specatk = new CosmosSprite({
               anchor: 0,
               frames: [ content.ibbSpecatkBone ],
               position: { x: 160, y: 260 },
               priority: -1
            }).on('tick', function () {
               this.rotation.value += 15;
            });
            battler.overlay.attach(specatk);
            await specatk.position.modulate(renderer, 2000, { x: 160, y: -60 }, { x: 160, y: 60 });
            sounds.landing.instance(renderer);
            shake(2, 750);
            await renderer.pause(250);
            const overlay = new CosmosRectangle({
               alpha: 0,
               fill: 0xffffff,
               priority: 999,
               size: { x: 1000, y: 1000 }
            });
            renderer.attach('menu', overlay);
            await overlay.alpha.modulate(renderer, 300, 1);
            battler.overlay.objects.splice(battler.overlay.objects.indexOf(specatk), 1);
            sounds.upgrade.instance(renderer);
            await renderer.pause(300);
            overlay.alpha.modulate(renderer, 300, 0).then(() => renderer.detach('menu', overlay));
            await papBlaster(state, { x: 160, y: 60 }, 0, { x: 160, y: 60 }, 0, { x: 1.5, y: 1.5 }, 0, 1000);
            await renderer.pause(500);
            await volatile.container.position.modulate(
               renderer,
               750,
               { x: cx, y: cy },
               { x: cx, y: cy },
               { x: cx, y: cy }
            );
            break;
         case 20:
            // A SIMPLE PATTERN TO HELP YOU LEARN THE ROPES.
            await papPattern(state, async factory => {
               await renderer.pause(600);
               papBlaster(state, { x: 85, y: -30 }, 90, { x: 85, y: 80 }, -45, { x: 1, y: 1.5 }, 500, 150);
               papBlaster(state, { x: 235, y: -30 }, -90, { x: 235, y: 80 }, 45, { x: 1, y: 1.5 }, 500, 150);
               await renderer.pause(2000);
               factory(0, 10, 2.5).on('tick', papWaver(1, 10, 20));
               factory(0, 10, -2.5).on('tick', papWaver(1, 10, 20));
               await renderer.pause(600);
               papBlaster(state, { x: 160 - 95, y: -30 }, 45, { x: 160 - 95, y: 147 }, -90, { x: 1, y: 1.5 }, 500, 350);
               await renderer.pause(600);
               factory(0, 10, 2.5).on('tick', papWaver(1, 10, 20));
               factory(0, 10, -2.5).on('tick', papWaver(1, 10, 20));
               await renderer.pause(600);
               const p = papBlaster(
                  state,
                  { x: 160 + 95, y: -30 },
                  -45,
                  { x: 160 + 95, y: 142 },
                  90,
                  { x: 1, y: 1.5 },
                  500,
                  350
               );
               await renderer.pause(600);
               factory(0, 20, 2.5).on('tick', papWaver(1, 20, 30));
               factory(0, 20, -2.5).on('tick', papWaver(1, 20, 30));
               await p;
            });
            break;
         case 21:
            // SOMETHING FANCIER, TO GET YOU QUAKING IN YOUR BOOTS!
            await papPattern(state, async factory => {
               await renderer.pause(600);
               factory(0, 10, 3).on('tick', papWaver(1, 10, 20));
               factory(0, -60, 3).on('tick', papWaver(1, -60, -50));
               factory(0, 10, -3).on('tick', papWaver(1, 10, 20));
               factory(0, -60, -3).on('tick', papWaver(1, -60, -50));
               await renderer.pause(600);
               papBlaster(state, { x: -30, y: 100 }, 90, { x: 80, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
               papBlaster(state, { x: 160, y: -30 }, 180, { x: 160, y: 100 }, 0, { x: 1.5, y: 1.5 }, 500, 150);
               papBlaster(state, { x: 350, y: 100 }, -90, { x: 240, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
               await renderer.pause(600);
               factory(2, 80, 4);
               await renderer.pause(1400);
               factory(0, 20, 1).on('tick', papWaver(1, 10, 20));
               factory(0, -50, 1).on('tick', papWaver(1, -50, -40));
               factory(0, 20, -1).on('tick', papWaver(1, 10, 20));
               factory(0, -50, -1).on('tick', papWaver(1, -50, -40));
               await renderer.pause(400);
               papBlaster(state, { x: -30, y: 100 }, 90, { x: 140, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
               papBlaster(state, { x: 350, y: 100 }, -90, { x: 180, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
               await renderer.pause(600);
               factory(2, 80, -4);
               factory(2, 80, 4);
               await renderer.pause(900);
               await papBlaster(state, { x: 160, y: -30 }, -180, { x: 160, y: 100 }, 0, { x: 1.5, y: 1.5 }, 500, 150);
            });
            break;
         case 22:
            // SOMETHING TRICKY TO KEEP YOU GUESSING...
            await papPattern(state, async factory => {
               let index = 0;
               while (index++ < 4) {
                  await renderer.pause(600);
                  factory(0, -75, 1.5).on('tick', papWaver(1.3, -95, -75));
                  factory(0, -75, -1.5).on('tick', papWaver(1, -95, -75));
                  await renderer.pause(400);
                  if (index % 2 === 0) {
                     papBlaster(
                        state,
                        { x: 160 - 95, y: -30 },
                        45,
                        { x: 160 - 95, y: 195 },
                        -90,
                        { x: 1, y: 1.5 },
                        500,
                        150
                     );
                  } else {
                     papBlaster(
                        state,
                        { x: 160 + 95, y: -30 },
                        -45,
                        { x: 160 + 95, y: 195 },
                        90,
                        { x: 1, y: 1.5 },
                        500,
                        150
                     );
                  }
                  await renderer.pause(700);
                  const p = papBlaster(
                     state,
                     { x: 160, y: -30 },
                     -180,
                     { x: 160, y: 100 },
                     0,
                     { x: 1.5, y: 1.5 },
                     500,
                     150
                  );
                  if (index < 4) {
                     await renderer.pause(1500);
                  } else {
                     await p;
                  }
               }
            });
            break;
         case 23:
            // A SHORT REPRIEVE TO PREPARE YOU FOR THE GRAND FINALE...
            await papPattern(state, async factory => {
               await renderer.pause(600);
               let index = 0;
               while (index < 7) {
                  factory(0, 10, 1.5);
                  await renderer.pause(500);
                  factory(0, 10, 1.5);
                  const subindex = [ 0, 2, 1, 2, 0, 2, 1 ][index++];
                  let p: Promise<void>;
                  if (subindex === 0) {
                     p = papBlaster(state, { x: -30, y: 100 }, 90, { x: 130, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
                  } else if (subindex === 1) {
                     p = papBlaster(
                        state,
                        { x: 160, y: -30 },
                        180,
                        { x: 160, y: 100 },
                        0,
                        { x: 1.5, y: 1.5 },
                        500,
                        150
                     );
                  } else {
                     p = papBlaster(state, { x: 350, y: 100 }, -90, { x: 190, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
                  }
                  if (index < 7) {
                     await renderer.pause(1000);
                  } else {
                     await p;
                  }
               }
            });
            break;
         case 24:
            // AND NOW... MY -ULTIMATE- ATTACK!!! NYEH HEH HEH HEH HEH HEH HEH HEH HEH HEH!!!
            await papPattern(state, async factory => {
               await renderer.pause(600);
               factory(0, 10, 3);
               factory(0, -60, 3);
               factory(0, 10, -3);
               factory(0, -60, -3);
               await renderer.pause(900);
               factory(0, 10, 3);
               factory(0, -60, 3);
               factory(0, 10, -3);
               factory(0, -60, -3);
               await renderer.pause(900);
               papBlaster(state, { x: 160, y: -30 }, 180, { x: 160, y: 100 }, 0, { x: 1.5, y: 1.5 }, 500, 150);
               await renderer.pause(900);
               const left = async () => {
                  papBlaster(state, { x: 350, y: 100 }, -90, { x: 100, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
                  await renderer.pause(600);
                  papBlaster(state, { x: 350, y: 100 }, -90, { x: 120, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
                  await renderer.pause(250);
                  papBlaster(state, { x: 350, y: 100 }, -90, { x: 140, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
                  await renderer.pause(250);
                  papBlaster(state, { x: 350, y: 100 }, -90, { x: 160, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
                  await renderer.pause(250);
                  papBlaster(state, { x: 350, y: 100 }, -90, { x: 180, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
                  await renderer.pause(250);
                  papBlaster(state, { x: 350, y: 100 }, -90, { x: 190, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
                  await renderer.pause(1150);
               };
               const right = async () => {
                  papBlaster(state, { x: -30, y: 100 }, 90, { x: 220, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
                  await renderer.pause(600);
                  papBlaster(state, { x: -30, y: 100 }, 90, { x: 200, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
                  await renderer.pause(250);
                  papBlaster(state, { x: -30, y: 100 }, 90, { x: 180, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
                  await renderer.pause(250);
                  papBlaster(state, { x: -30, y: 100 }, 90, { x: 160, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
                  await renderer.pause(250);
                  papBlaster(state, { x: -30, y: 100 }, 90, { x: 140, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
                  await renderer.pause(250);
                  papBlaster(state, { x: -30, y: 100 }, 90, { x: 130, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
                  await renderer.pause(1150);
               };
               let index = 0;
               if (160 <= battler.SOUL.position.x) {
                  factory(1, 80, -4);
                  await renderer.pause(300);
                  await right();
                  await left();
                  while (index++ < 3) {
                     factory(0, 10, -3);
                     factory(0, -60, -3);
                     await renderer.pause(700);
                     papBlaster(
                        state,
                        { x: -30, y: 100 },
                        90,
                        { x: 220 - (index - 1) * 10, y: 100 },
                        0,
                        { x: 1, y: 1.5 },
                        500,
                        150
                     );
                     await renderer.pause(200);
                  }
               } else {
                  factory(1, 80, 4);
                  await renderer.pause(300);
                  await left();
                  await right();
                  while (index++ < 3) {
                     factory(0, 10, 3);
                     factory(0, -60, 3);
                     await renderer.pause(700);
                     papBlaster(
                        state,
                        { x: 350, y: 100 },
                        -90,
                        { x: 100 + (index - 1) * 10, y: 100 },
                        0,
                        { x: 1, y: 1.5 },
                        500,
                        150
                     );
                     await renderer.pause(200);
                  }
               }
               await renderer.pause(1000);
               index = 0;
               while (index++ < 4) {
                  await renderer.pause(600);
                  if (index % 2 === 0) {
                     papBlaster(
                        state,
                        { x: 160 + 95, y: -30 },
                        -45,
                        { x: 160 + 95, y: 195 },
                        90,
                        { x: 1, y: 1.5 },
                        500,
                        150
                     );
                  } else {
                     papBlaster(
                        state,
                        { x: 160 - 95, y: -30 },
                        45,
                        { x: 160 - 95, y: 195 },
                        -90,
                        { x: 1, y: 1.5 },
                        500,
                        150
                     );
                  }
                  await renderer.pause(500);
                  factory(0, 30, 3);
                  factory(0, -40, 3);
                  factory(0, 30, -3);
                  factory(0, -40, -3);
                  await renderer.pause(400);
               }
               await renderer.pause(1000);
               papBlaster(state, { x: 85, y: -30 }, 90, { x: 85, y: 80 }, -45, { x: 1, y: 1.5 }, 500, 150);
               papBlaster(state, { x: 235, y: -30 }, -90, { x: 235, y: 80 }, 45, { x: 1, y: 1.5 }, 500, 150);
               await renderer.pause(1500);
               const time = renderer.time;
               const blimp1 = new CosmosAnimation({
                  anchor: { x: 1, y: 1 },
                  alpha: 0.7,
                  position: { x: box.x1, y: box.y },
                  velocity: { x: 2 },
                  resources: content.ibbBlimpstrat,
                  priority: 10
               }).on('tick', function () {
                  if (state.d || this.position.x > box.x2 + 50) {
                     battler.bullets.detach(this);
                  } else {
                     this.offsets[0].y = sineWaver(time, 1000, -2, 2);
                  }
               });
               const blimp2 = new CosmosAnimation({
                  anchor: { y: 1 },
                  alpha: 0.7,
                  position: { x: box.x2, y: box.y },
                  velocity: { x: -2 },
                  resources: content.ibbBlimpstrat,
                  priority: 10,
                  index: 1
               }).on('tick', function () {
                  if (state.d || this.position.x < box.x1 - 50) {
                     battler.bullets.detach(this);
                  } else {
                     this.offsets[0].y = sineWaver(time, 1000, -2, 2, 0.2);
                  }
               });
               state.d || battler.bullets.attach(blimp1, blimp2);
               index = 0;
               while (index++ < 2) {
                  factory(0, 15, 3).on('tick', papWaver(1, 10, 20));
                  factory(0, 15, -3).on('tick', papWaver(1, 10, 20));
                  await renderer.pause(1000);
               }
               papBlaster(state, { x: 350, y: 100 }, -90, { x: 100, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
               papBlaster(state, { x: -30, y: 100 }, 90, { x: 220, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
               let t = 0;
               const toss = () => {
                  const v = [ 0, 1, 0.5, 0.5, 0, 1 ][t++ % 6];
                  const x = CosmosMath.remap(v, 2.5, 3.5);
                  battler.bullets.attach(
                     ...CosmosUtils.populate(2, i =>
                        new CosmosSprite({
                           anchor: 0,
                           alpha: 0.7,
                           frames: [ content.ibbSpecatkBone ],
                           position: { x: i === 0 ? box.x1 - 5 : box.x2 + 5, y: box.y2 - 5 },
                           gravity: { y: distanceGravity(-5, box.sy) },
                           scale: CosmosMath.remap(v, 1, 1.5),
                           velocity: { x: [ x, -x ][i], y: -5 },
                           spin: -30
                        }).on('tick', function () {
                           (state.d || boxCheck(this, 10)) && battler.bullets.detach(this);
                        })
                     )
                  );
               };
               const boneTosser = async () => {
                  if (state.d) {
                     return;
                  }
                  await renderer.pause(300);
                  toss();
                  await renderer.pause(500);
                  toss();
                  factory(0, 15, 3);
                  factory(0, 15, -3);
                  factory(0, -55, 3);
                  factory(0, -55, -3);
                  await renderer.pause(700);
               };
               await boneTosser();
               papBlaster(state, { x: 350, y: 100 }, -90, { x: 120, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
               papBlaster(state, { x: -30, y: 100 }, 90, { x: 200, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
               await boneTosser();
               papBlaster(state, { x: 350, y: 100 }, -90, { x: 130, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
               papBlaster(state, { x: -30, y: 100 }, 90, { x: 190, y: 100 }, 0, { x: 1, y: 1.5 }, 500, 150);
               await boneTosser();
               await papBlaster(state, { x: 160, y: -30 }, -180, { x: 160, y: 100 }, 0, { x: 2.5, y: 2.5 }, 1200, 300);
            });
            await (battler.music as CosmosInstance).gain.modulate(renderer, 2000, 0);
            break;
      }
   }
};

export default patterns;

CosmosUtils.status(`LOAD MODULE: STARTON PATTERNS (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
