import {
   boxCheck,
   bulletSequence,
   bulletSetup,
   helmetdyne,
   helmetdyneAttack,
   pastBox,
   screenCheck,
   starGenerator,
   undBoxRe,
   undBoxTo,
   undCage,
   undController,
   undDirs,
   undKeyHandler,
   undPatterns,
   UndQ,
   undSpear,
   undState,
   undTicker
} from '../common/api';
import { content, sounds } from '../systems/assets';
import { events, game, keys, renderer, rng } from '../systems/core';
import {
   battler,
   box,
   calcLVX,
   clipFilter,
   distanceGravity,
   quickshadow,
   shake,
   sineWaver,
   world
} from '../systems/framework';
import { SAVE } from '../systems/save';
import {
   CosmosAnimation,
   CosmosHitbox,
   CosmosImageUtils,
   CosmosKeyed,
   CosmosMath,
   CosmosObject,
   CosmosPoint,
   CosmosRectangle,
   CosmosSizedObjectProperties,
   CosmosSprite,
   CosmosUtils,
   CosmosValue
} from '../systems/storyteller';
import { dogecon } from './extras';

export function dogeSpear (damage: number, extra: CosmosSizedObjectProperties = {}) {
   return new CosmosHitbox({
      size: { x: 4, y: 88 },
      anchor: { x: 0, y: -1 },
      metadata: { damage, bullet: true },
      scale: 0.5,
      objects: [ new CosmosAnimation({ anchor: extra.anchor ?? { x: 0, y: -1 }, resources: content.ibbSpear }) ],
      ...extra
   });
}

export function redspear (prop: CosmosSizedObjectProperties = {}) {
   return new CosmosHitbox({
      metadata: { bullet: true, damage: 5 },
      anchor: 0,
      size: { x: 27, y: 4 },
      objects: [ new CosmosSprite({ anchor: prop.anchor ?? 0, frames: [ content.ibbRedspear ] }) ],
      ...prop
   });
}

export async function undSequence (
   swing: boolean,
   generator: (spawn: typeof undSpear, pause: (time: number) => Promise<void>) => Promise<void>
) {
   const vola = battler.volatile[0];
   undState.time = 0;
   undState.belltimer = 0;
   battler.box.metadata.alpha = 1;
   renderer.on('tick', undTicker);
   vola.vars.shield = 'up';
   undCage.objects[0].rotation.value = 270;
   battler.alpha.modulate(renderer, 300, 0.2);
   await battler.box.size.modulate(renderer, 300, { x: 36, y: 65 });
   renderer.attach('menu', undCage);
   undCage.alpha.modulate(renderer, 150, 1);
   await Promise.all([
      battler.box.size.modulate(renderer, 150, { y: 36 }),
      battler.box.position.modulate(renderer, 150, { y: 120 })
   ]);
   battler.SOUL.position.set(battler.box.position);
   battler.SOUL.alpha.value = 1;
   const handler = undKeyHandler(undCage);
   for (const dir of undDirs) {
      keys[`${dir}Key`].on('down', handler);
   }
   const promises = [] as Promise<boolean>[];
   const speedo = (vola.vars.speed - 1) * 0.75 + 1;
   await generator(
      (color, direction, speed, damage = 5) => {
         const subpromise = undSpear(color, direction, speed * speedo, damage);
         promises.push(subpromise);
         return subpromise;
      },
      time => renderer.pause(time / speedo)
   );
   const results = await Promise.all(promises);
   if (vola.vars.phase === 0 && !results.includes(false)) {
      vola.vars.phase = 1;
      vola.vars.turns = 0;
   }
   for (const dir of undDirs) {
      keys[`${dir}Key`].off('down', handler);
   }
   undCage.alpha.modulate(renderer, 150, 0).then(() => {
      renderer.detach('menu', undCage);
   });
   if (swing) {
      await renderer.pause(250);
      vola.vars.armswing = true;
      await renderer.when(() => vola.vars.armswing === false);
      if (world.genocide || vola.vars.phase === 5) {
         battler.flee = false;
      }
   }
   game.movement = false;
   battler.SOUL.alpha.value = 0;
   await Promise.all([
      battler.box.size.modulate(renderer, 150, { y: 65 }),
      battler.box.position.modulate(renderer, 150, { y: 160 })
   ]);
   battler.alpha.modulate(renderer, 300, 1);
   await battler.box.size.modulate(renderer, 300, { x: 282.5, y: 65 });
   renderer.off('tick', undTicker);
   battler.volatile[0].container.tint = void 0;
   battler.box.metadata.alpha = void 0;
}

export async function undStandard (swing: boolean) {
   const vola = battler.volatile[0];
   const geno = world.genocide;
   const ats = (vola.vars.attacktypes ??= []) as number[];
   let attacktype = -1;
   while (attacktype === -1 || ats.includes(attacktype)) {
      attacktype = rng.pattern.int(4);
   }
   ats.push(attacktype);
   ats.length > 2 && ats.splice(0, 2);
   switch (attacktype as number) {
      case 0:
         if (geno) {
            // small box attack
            await undBoxTo(16, 65);
            await Promise.all([
               battler.box.size.modulate(renderer, 150, { y: 16 }),
               battler.box.position.modulate(renderer, 150, {
                  y: battler.box.position.y - battler.box.size.y / 2 + 8
               })
            ]);
            const ds = 4;
            const de = 140;
            const bx = battler.box.position.x;
            const by = battler.box.position.y;
            const startset = [
               [ bx - de, by - ds, 0 ],
               [ bx - de, by + ds, 0 ],
               [ bx - ds, by - de, 90 ],
               [ bx + ds, by - de, 90 ],
               [ bx + de, by - ds, 180 ],
               [ bx + de, by + ds, 180 ],
               [ bx - ds, by + de, 270 ],
               [ bx + ds, by + de, 270 ]
            ];
            await battler.sequence(14, async promises => {
               const [ x, y, rotation ] = startset[rng.attack.int(startset.length)];
               const spear = redspear({
                  alpha: 0,
                  position: { x, y },
                  rotation,
                  velocity: CosmosMath.ray(rotation, 5)
               }).on('tick', function () {
                  screenCheck(this, 100) && detach();
               });
               const { detach, detached } = bulletSetup(spear, true, null);
               promises.push(detached);
               sounds.appear.instance(renderer);
               spear.alpha.modulate(renderer, 150, 1);
               await renderer.pause(450);
            });
            await Promise.all([
               battler.box.size.modulate(renderer, 150, { y: 65 }),
               battler.box.position.modulate(renderer, 150, { y: 160 })
            ]);
            await battler.box.size.modulate(renderer, 150, { y: 65 });
            await undBoxRe(swing);
         } else {
            // moving gap attack
            await undBoxTo(282.5, 65);
            const amt = 25;
            const unit = battler.box.size.x / amt;
            const base = battler.box.position.x - battler.box.size.x / 2 + unit / 2;
            const gap = new CosmosValue(battler.box.position.x);
            const ext = new CosmosValue(0);
            const spears = CosmosUtils.populate(amt * 2, index => {
               const top = index < amt;
               return bulletSetup(
                  redspear({
                     position: { x: base + (index % amt) * unit },
                     anchor: { x: 1, y: 0 },
                     rotation: top ? 90 : -90
                  }).on('tick', function () {
                     this.alpha.value = ext.value;
                     this.position.y =
                        battler.box.position.y +
                        (top ? -1 : 1) *
                           CosmosMath.remap(Math.min(Math.abs(gap.value - this.position.x), 40), 25, 1, 0, 40);
                  }),
                  false,
                  null
               );
            });
            sounds.appear.instance(renderer);
            await ext.modulate(renderer, 300, 1);
            let rounds = 4;
            while (rounds-- > 0) {
               let nx = gap.value;
               while (Math.abs(nx - gap.value) < 80) {
                  nx = battler.box.position.x + (rng.attack.next() - 0.5) * battler.box.size.x;
               }
               await gap.step(renderer, 1.6, nx);
            }
            for (const spear of spears) {
               spear.detach();
            }
            await undBoxRe(swing);
         }
         break;
      case 1:
         if (geno) {
            // enclosing circles attack
            await undBoxTo(282.5, 120);
            await battler.sequence(8, async (promises, index) => {
               const a = new CosmosValue();
               const rad = new CosmosValue(70);
               const rot = new CosmosValue();
               const amt = 8;
               const ctr = battler.SOUL.position.clone();
               const sd = rng.attack.next() < 0.5 ? -180 : 180;
               const spears = CosmosUtils.populate(amt, index => {
                  const ba = (index / amt) * 360;
                  return bulletSetup(
                     redspear().on('tick', function () {
                        const selfrot = rot.value + ba;
                        this.position = ctr.endpoint(selfrot, rad.value);
                        this.rotation.value = selfrot + 180;
                        this.alpha.value = a.value;
                     }),
                     true,
                     null
                  );
               });
               a.modulate(renderer, 300, 1);
               rot.modulate(renderer, 1800, sd, sd, sd, sd);
               rad.modulate(renderer, 1800, rad.value, rad.value, 10, 10);
               promises.push(
                  renderer.pause(1500).then(async () => {
                     await a.modulate(renderer, 300, 0);
                     for (const spear of spears) {
                        spear.detach();
                     }
                  })
               );
               index === 7 || (await renderer.pause(1200));
            });
            await undBoxRe(swing);
         } else {
            // spear volley attack
            await undBoxTo(100, 100);
            const units = 10;
            const unitX = battler.box.size.x / units;
            const baseX = battler.box.position.x - battler.box.size.x / 2;
            const botto = battler.box.position.y + battler.box.size.y / 2 + 15;
            await battler.sequence(3, async (promises, round) => {
               const times = CosmosUtils.populate(10, index => index);
               await battler.sequence(10, async (subpromises, index) => {
                  const time = times.splice(rng.attack.int(times.length), 1)[0];
                  const pos = { x: baseX + unitX / 2 + index * unitX, y: botto };
                  const spear = redspear({ position: pos, rotation: -90 }).on('tick', function () {
                     this.position.y < battler.box.position.y && boxCheck(this, 25) && detach();
                  });
                  const { detach, detached } = bulletSetup(spear, false, null);
                  promises.push(detached);
                  subpromises.push(
                     renderer.pause(time * 250).then(async () => {
                        sounds.arrow.instance(renderer);
                        spear.velocity.set(
                           CosmosMath.ray(spear.rotation.value, CosmosMath.remap(rng.attack.next(), 2, 4.5))
                        );
                     })
                  );
               });
               if (round < 2) {
                  await renderer.pause(250);
               }
            });
            await undBoxRe(swing);
         }
         break;
      case 2:
         if (geno) {
            // random direction spears
            await undBoxTo(120, 120);
            await battler.sequence(20, async promises => {
               const pos = pastBox(20).position;
               const offie = new CosmosValue(360);
               let fired = false;
               const spear = redspear({ alpha: 0, position: pos }).on('tick', function () {
                  if (fired) {
                     screenCheck(this, 20) && detach();
                  } else {
                     this.rotation.value = pos.angleTo(battler.SOUL.position) - offie.value;
                  }
               });
               const { detach, detached } = bulletSetup(spear, true, null);
               sounds.appear.instance(renderer);
               promises.push(detached);
               Promise.all([ offie.modulate(renderer, 800, 0, 0), spear.alpha.modulate(renderer, 800, 1) ]).then(
                  async () => {
                     fired = true;
                     sounds.arrow.instance(renderer);
                     spear.velocity.set(CosmosMath.ray(spear.rotation.value, 5));
                  }
               );
               await renderer.pause(650 / vola.vars.speed);
            });
            await undBoxRe(swing);
         } else {
            // star attack
            await undBoxTo(100, 100);
            const spokes = 5;
            const spokeDiv = 360 / spokes;
            const spearDiv = spokeDiv / 2;
            const mRad = new CosmosValue(25);
            const mPos = new CosmosPoint(battler.box.position);
            const mAng = new CosmosValue();
            const aAlp = new CosmosValue(0);
            const aOff = new CosmosValue(1);
            const spears = CosmosUtils.populate(spokes * 2, i => {
               return bulletSetup(
                  redspear().on('tick', function () {
                     const lineAng = spearDiv / 2 + i * spearDiv;
                     const linePos = mPos.add(starGenerator(mRad.value, mRad.value, spokes, lineAng, mAng.value));
                     this.position.set(linePos.endpoint(lineAng - 90, 100 * aOff.value));
                     const lineRot = Math.floor(i / 2) * spokeDiv + (spokeDiv - (i % 2) * spokeDiv);
                     this.rotation.value = lineRot - 90 * aOff.value + mAng.value;
                     this.alpha.value = aAlp.value;
                  }),
                  true,
                  null
               );
            });
            const ticker = () => (mAng.value += 1);
            sounds.appear.instance(renderer);
            renderer.on('tick', ticker);
            await Promise.all([ aAlp.modulate(renderer, 1000, 1, 1), aOff.modulate(renderer, 1000, 0, 0) ]);
            await battler.sequence(10, async promises => {
               const rev = rng.attack.next() < 0.5;
               const x = rev ? -10 : 330;
               const y = battler.box.position.y + (rng.attack.next() * 2 - 1) * 10;
               const { detach, detached } = bulletSetup(
                  redspear({
                     position: { x, y },
                     velocity: { x: rev ? 6 : -6 },
                     rotation: rev ? 0 : 180
                  }).on('tick', function () {
                     screenCheck(this, 20) && detach();
                  }),
                  true,
                  null
               );
               sounds.arrow.instance(renderer);
               promises.push(detached);
               await renderer.pause(450);
            });
            await renderer.pause(600);
            renderer.off('tick', ticker);
            for (const spear of spears) {
               spear.detach();
            }
            await undBoxRe(swing);
         }
         break;
      case 3:
         if (geno) {
            await undBoxTo(90, 90);
            const count = 16;
            const div = 360 / count;
            const mainRot = new CosmosValue();
            const mainDist = new CosmosValue(55);
            let targetspear = null as number | null;
            const sd = new CosmosValue(rng.attack.next() < 0.5 ? -2 : 2);
            const sp = CosmosUtils.populate(count, index => {
               const ang = index * div;
               const targetspearDist = new CosmosValue();
               const targetspearShake = new CosmosValue();
               return bulletSetup(
                  redspear().on('tick', async function () {
                     index === 0 && (mainRot.value += sd.value);
                     this.rotation.value = ang + mainRot.value + 180;
                     if (index === targetspear || this.metadata.targeted) {
                        this.position = battler.box.position.endpoint(
                           ang + mainRot.value,
                           mainDist.value - targetspearDist.value
                        );
                        if (targetspearShake.value > 0) {
                           this.position.set(
                              this.position.add(
                                 new CosmosPoint(Math.random(), Math.random())
                                    .multiply(2)
                                    .subtract(1)
                                    .multiply(targetspearShake.value)
                              )
                           );
                        }
                        if (!this.metadata.targeted) {
                           this.metadata.targeted = true;
                           this.tint = 0xff6969;
                           await targetspearShake.modulate(renderer, 850, 0, 3, 3);
                           shake(1, 300);
                           sounds.stab.instance(renderer);
                           targetspearShake.modulate(renderer, 166, 0);
                           this.tint = void 0;
                           await targetspearDist.modulate(renderer, 200, 50, 50, 50);
                           await renderer.pause(300);
                           await targetspearDist.modulate(renderer, 100, 50, 0, 0);
                           await renderer.pause(500);
                           this.metadata.targeted = false;
                        }
                     } else {
                        this.position = battler.box.position.endpoint(ang + mainRot.value, mainDist.value);
                     }
                  }),
                  false,
                  null
               );
            });
            await mainDist.modulate(renderer, 700, 48, 48);
            mainDist.modulate(renderer, (400 + 700) * 12, 40);
            sd.modulate(renderer, (400 + 700) * 12, sd.value * (3 / 2));
            let i = 0;
            while (i++ < 15) {
               await renderer.pause(400);
               while (!targetspear || sp[targetspear].bullet.metadata.targeted) {
                  targetspear = rng.attack.int(count);
               }
               await renderer.pause(700);
               targetspear = null;
            }
            await renderer.when(() => sp.filter(spx => spx.bullet.metadata.targeted).length === 0);
            for (const b of sp) {
               b.detach();
            }
            await undBoxRe(swing);
         } else {
            await undBoxTo(115, 165);
            battler.SOUL.position.set(160, 160);
            const b = battler.box.position.y - battler.box.size.y / 2;
            await battler.sequence(19, async promises => {
               let stage = 0;
               const { side, position } = pastBox(5, rng.attack.next() < 0.5 ? 1 : 3);
               position.y = CosmosMath.remap(position.y, b + 15, b + 45, b, b + battler.box.size.y);
               const { detach, detached } = bulletSetup(
                  redspear({
                     alpha: 0.75,
                     anchor: { x: 1, y: 0 },
                     position,
                     velocity: { x: side === 3 ? 7 : -7, y: 0 },
                     spin: side === 3 ? 1 : -1,
                     rotation: side === 1 ? 184 : -4,
                     gravity: { y: -0.01 }
                  }).on('tick', function () {
                     if (stage === 0) {
                        this.metadata.bullet = false;
                        const spr = this.objects[0] as CosmosSprite;
                        const s = quickshadow(spr, this, battler.bullets, 0.4, 1.5, 0.001);
                        s.priority.value = 2;
                        s.rotation.value = this.rotation.value;
                        if (side === 1 && this.position.x <= battler.box.position.x - battler.box.size.x / 2) {
                           stage = 1;
                           this.position.x += this.size.x / 2;
                        } else if (side === 3 && battler.box.position.x + battler.box.size.x / 2 <= this.position.x) {
                           stage = 1;
                           this.position.x -= this.size.x / 2;
                        }
                        if (stage === 1) {
                           this.alpha.value = 1;
                           this.anchor.x = 0;
                           spr.anchor.x = 0;
                           const rando = rng.attack.next();
                           this.velocity.x *= CosmosMath.remap(rando, -0.5, -0.25);
                           this.velocity.y = -4;
                           this.gravity.y = 0.5;
                           this.spin.value *= -14;
                           sounds.landing.instance(renderer);
                        }
                     } else if (stage === 1) {
                        this.metadata.bullet = true;
                        boxCheck(this, 20) && detach();
                     }
                  }),
                  false,
                  null
               );
               sounds.arrow.instance(renderer);
               promises.push(detached);
               await renderer.pause(rng.attack.next() * 200 + 400);
            });
            await undBoxRe(swing);
         }
         break;
   }
}

export async function mufPattern (
   speedstat: number,
   gen: (
      spawn: (id: 0 | 1 | 2, row: number, side?: -1 | 1, speed?: number, vert?: -1 | 0 | 1) => Promise<void>,
      pause: (t: number) => Promise<void>,
      cupcake: (id: 0 | 1 | 2, p1: number, p2: number, callback: () => Promise<void> | void) => Promise<void>
   ) => Promise<void>
) {
   let end = false;
   const promies = [] as Promise<void>[];
   const spawn = async (id: 0 | 1 | 2, row: number, side: -1 | 1 = 1, speed = 5, vert: -1 | 0 | 1 = 0) => {
      let tick = 0;
      let line = battler.box.size.y / -2 + battler.line.offset + row * 20;
      let sy = 0;
      let vy = vert * speed * speedstat * 0.75;
      const sx = battler.box.position.x + side * (battler.box.size.x / 2 + 45);
      const vx = -side * speed * speedstat * [ 1, 1.5, 1.25 ][id];
      const { bullet, detached, detach } = bulletSetup(
         new CosmosHitbox({
            size: [ 20, { x: 12, y: 20 }, 16 ][id],
            anchor: 0,
            scale: 0.5,
            velocity: { x: vx },
            spin: id === 1 ? side * 4 * speedstat : void 0,
            gravity:
               id === 1
                  ? {
                       x:
                          side *
                          distanceGravity(
                             Math.abs(vx),
                             Math.abs(battler.box.position.x - side * (battler.box.size.x / 2 - 15) - sx)
                          )
                    }
                  : void 0,
            position: { x: sx, y: battler.box.position.y + line },
            metadata: { bullet: true, damage: 5 },
            objects: [
               new CosmosSprite({
                  anchor: 0,
                  frames: [ [ content.ibbSpider, content.ibbCrossiant, content.ibbDonut ][id] ]
               })
            ]
         }).on('tick', function () {
            this.position.y = battler.box.position.y + (line += battler.line.loop) + (sy += vy);
            if (id === 2) {
               const checkBase = battler.box.position.y - battler.box.size.y / 2 + battler.line.offset;
               if (this.position.y <= checkBase) {
                  vy = Math.abs(vy);
               } else if (checkBase + 40 <= this.position.y) {
                  vy = -Math.abs(vy);
               }
            }
            if (
               end ||
               (tick++ > 120 / speed &&
                  Math.abs(this.position.x - battler.box.position.x) > battler.box.size.x / 2 + 24)
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
         scale: 0.5,
         velocity: bullet.velocity,
         spin: bullet.spin.value,
         gravity: bullet.gravity,
         position: bullet.position,
         frames: [ [ content.ibbSpiderOutline, content.ibbCrossiantOutline, content.ibbDonutOutline ][id] ]
      }).on('tick', function () {
         this.position.y = battler.box.position.y + (line + battler.line.loop) + (sy + vy);
         if (Math.abs(shadow.position.x - battler.box.position.x) < 10) {
            battler.overlay.detach(shadow);
         }
      });
      battler.overlay.attach(shadow);
      promies.push(detached);
      await detached;
   };
   await gen(
      spawn,
      async t => renderer.pause(t / speedstat),
      async (id, p1, p2, callback) => {
         renderer.detach('menu', battler.SOUL);
         battler.box.objects[2].attach(battler.SOUL);
         const pos = battler.box.position;
         const baseY = pos.y;
         await pos.modulate(renderer, 600, pos.value(), { x: 90 }, { x: 90 });
         callback();
         let unit = 0;
         const units = Math.ceil(p1 / 1250);
         while (unit++ < units) {
            const endX = CosmosMath.remap(unit / units, 90, 160);
            const halfwayX = (pos.x + endX) / 2;
            await pos.modulate(
               renderer,
               1250 / speedstat,
               { x: halfwayX, y: baseY + 30 },
               { x: halfwayX, y: baseY - 30 },
               { x: endX, y: baseY }
            );
         }
         const cakePos1 = new CosmosPoint({ x: 235, y: 195 });
         const cupcakeSprite1 = new CosmosAnimation({
            anchor: { y: 1 },
            scale: 1 / 2,
            resources: content.ibcMuffetCupcake,
            priority: 999999999999
         }).on('tick', function () {
            this.position.set(cakePos1.add(Math.random() * 2 - 1, Math.random() * 2 - 1));
         });
         battler.bullets.attach(cupcakeSprite1);
         battler.line.sticky = false;
         const m = 60;
         await Promise.all([
            pos.modulate(renderer, 600, { x: pos.x + m / 2 }),
            battler.box.size.modulate(renderer, 600, { x: battler.box.size.x + m }),
            battler.box.objects[0].position.modulate(renderer, 600, {
               x: battler.box.objects[0].position.x - m / 2
            })
         ]);
         await renderer.pause(1000);
         cupcakeSprite1.index = 1;
         await renderer.pause(1000);
         await Promise.all([
            pos.modulate(renderer, 600, { x: pos.x - m / 2 }),
            battler.box.size.modulate(renderer, 600, { x: battler.box.size.x - m }),
            battler.box.objects[0].position.modulate(renderer, 600, {
               x: battler.box.objects[0].position.x + m / 2
            })
         ]);
         battler.bullets.detach(cupcakeSprite1);
         const n = 100;
         battler.line.sticky = true;
         const endPosY = pos.y - n / 2;
         const endSizeY = battler.box.size.y + n;
         const time1 = renderer.time;
         const i = new CosmosValue(5);
         const rotter = () => {
            battler.box.rotation.value = sineWaver(time1, 3000, -i.value, i.value, 0.25);
         };
         battler.box.on('tick', rotter);
         let ebic = true;
         Promise.all([ pos.step(renderer, 3, { y: endPosY }), battler.box.size.step(renderer, 3, { y: endSizeY }) ]).then(
            async () => {
               battler.line.loop = 1.5;
               const sc1 = async (d = true) => {
                  const rows = {} as CosmosKeyed<number>;
                  while (ebic) {
                     const mid = Math.ceil((battler.line.pos.y - battler.line.offset) / 20) - 1;
                     const possible = CosmosUtils.populate(battler.line.amount(), index => index - 2);
                     for (const p of possible) {
                        if (2 <= (rows[p] ?? 0) || Math.abs(p - mid) > 2) {
                           possible.splice(possible.indexOf(p), 1);
                        }
                     }
                     if (possible.length > 0) {
                        const row = possible[rng.attack.int(possible.length)];
                        if (d || (row + battler.line.iterations) % 2 === 0) {
                           rows[row] ??= 0;
                           rows[row]++;
                           spawn(0, row - 3, rng.attack.next() < 0.5 ? -1 : 1, 1.5);
                           renderer.pause(1650).then(() => {
                              rows[row]--;
                           });
                        }
                     }
                     await renderer.pause(250);
                  }
               };
               const sc2 = async (d = true) => {
                  const rows = {} as CosmosKeyed<boolean>;
                  while (ebic) {
                     const mid = Math.ceil((battler.line.pos.y - battler.line.offset) / 20) - 1;
                     const possible = CosmosUtils.populate(battler.line.amount(), index => index - 2);
                     for (const p of possible) {
                        if (rows[p] || Math.abs(p - mid) > 2) {
                           possible.splice(possible.indexOf(p), 1);
                        }
                     }
                     if (possible.length > 0) {
                        const row = possible[rng.attack.int(possible.length)];
                        if (d || (row + battler.line.iterations) % 2 === 0) {
                           rows[row] = true;
                           spawn(1, row, rng.attack.next() < 0.5 ? -1 : 1, 3.5).then(async () => {
                              await renderer.pause(650);
                              rows[row] = false;
                           });
                        }
                     }
                     await renderer.pause(250);
                  }
               };
               switch (id) {
                  case 0: {
                     await sc1();
                     break;
                  }
                  case 1: {
                     await sc2();
                     break;
                  }
                  case 2: {
                     battler.line.iterations = 0;
                     await Promise.all([ sc1(false), sc2(false) ]);
                     break;
                  }
               }
            }
         );
         await renderer.pause(1000);
         battler.line.maxY = endPosY + endSizeY / 3;
         const time2 = renderer.time;
         const cakePos2 = new CosmosPoint({ x: 160, y: endPosY + endSizeY / 2 + 30 });
         const cupcakeSprite2 = new CosmosAnimation({
            area: renderer.area!,
            active: true,
            anchor: { x: 0, y: 1 },
            scale: 1 / 2,
            resources: content.ibbCupcakeAttack,
            priority: 999999999999,
            filters: [ clipFilter ]
         }).on('tick', function () {
            this.position.set(cakePos2.add(0, sineWaver(time2, 2500, 0, 25, 0.5)));
         });
         battler.box.objects[2].attach(cupcakeSprite2);
         cakePos2.modulate(renderer, 1000, cakePos2.subtract(0, 30), cakePos2.subtract(0, 30));
         await renderer.pause(p2 / speedstat);
         ebic = false;
         await Promise.all([
            i.modulate(renderer, 800, 1, 0, 0).then(() => {
               battler.box.off('tick', rotter);
               battler.box.rotation.value = 0;
            }),
            cakePos2.modulate(renderer, 1000, cakePos2.value(), { y: cakePos2.y + 60 })
         ]);
         battler.box.objects[2].detach(cupcakeSprite2, battler.SOUL);
         renderer.attach('menu', battler.SOUL);
         end = true;
      }
   );
   await Promise.all(promies);
}

const patterns = {
   async undynefast () {
      await battler.sequence(15, async promises => {
         sounds.arrow.instance(renderer);
         const velocity = new CosmosPoint(1.5, 4.5);
         const { detach, detached } = bulletSetup(
            redspear({
               position: {
                  x: box.x2 - rng.attack.next() * (box.sx + box.sy * (1 / 2)),
                  y: box.y1 - 15
               },
               velocity,
               rotation: velocity.angle
            }).on('tick', function () {
               if (boxCheck(this, 40)) {
                  detach();
               } else {
                  const qs = quickshadow(
                     this.objects[0] as CosmosSprite,
                     this,
                     battler.bullets,
                     this.alpha.value * 0.6
                  );
                  qs.rotation.value = this.rotation.value;
                  qs.priority.value = -1;
               }
            }),
            false,
            null
         );
         promises.push(detached);
         await renderer.pause(200);
      });
      battler.bullets.objects = [];
   },
   async doge (damage: number, turn: number) {
      const dark = dogecon() || world.goatbro;
      switch (turn < 4 ? turn : battler.pattern('doge', [ 0, 1, 2, 3 ])) {
         case 0: {
            let i = 0;
            while (i++ < (dark ? 2 : 1)) {
               const total = 7;
               const baseAngle = rng.attack.next() * 360;
               const asValue = rng.attack.next() < 0.5 ? -1 : 1;
               const angleSpeed = new CosmosValue(asValue * 2);
               const distance = new CosmosValue(150);
               const speers = CosmosUtils.populate(total, index => {
                  const rotation = (index / total) * 360 + baseAngle;
                  return bulletSetup(
                     dogeSpear(damage, {
                        rotation,
                        position: battler.box.position.endpoint(rotation + 90, 150)
                     }).on('tick', function () {
                        this.rotation.value += angleSpeed.value;
                        this.position.set(battler.box.position.endpoint(this.rotation.value + 90, distance.value));
                     })
                  );
               });
               renderer.pause(600).then(async () => {
                  const bul = speers[rng.attack.int(total)].bullet;
                  const spr = bul.objects[0] as CosmosSprite;
                  spr.index = 1;
                  bul.metadata.color = 'orange';
                  await renderer.pause(350);
                  spr.index = 0;
                  bul.metadata.color = void 0;
                  await renderer.pause(350);
                  bul.metadata.color = 'orange';
                  spr.index = 1;
               });
               await distance.modulate(renderer, dark ? 800 : 1000, 12.5, 12.5);
               await angleSpeed.modulate(renderer, dark ? 1200 : 1800, asValue, asValue, asValue * 4);
               angleSpeed.modulate(renderer, 600, asValue / 2, asValue / 2);
               await distance.modulate(renderer, 1200, 60, 60, 60, -150);
               for (const speer of speers) {
                  speer.detach();
               }
            }
            break;
         }
         case 1: {
            let side = rng.attack.next() < 0.5 ? -1 : 1;
            const twinkler = new CosmosSprite({
               alpha: 0.5,
               anchor: 0,
               position: new CosmosPoint(side === -1 ? 40 : 280, battler.box.position.y),
               frames: [ content.ibbCrosshair ],
               spin: side * 5,
               scale: 0
            });
            renderer.attach('menu', twinkler);
            await twinkler.scale.modulate(renderer, 500, 1, 1, 0);
            renderer.detach('menu', twinkler);
            bulletSequence(async (detachers, state) => {
               let mov = false;
               const boxX = battler.box.position.x;
               const speerz = new CosmosObject({
                  gravity: { x: 0.5 * -side },
                  position: new CosmosPoint(side === -1 ? -10 : 330, battler.box.position.y),
                  objects: CosmosUtils.populate(7, index =>
                     dogeSpear(damage, {
                        size: { x: 50, y: 88 },
                        rotation: side === -1 ? 90 : -90,
                        position: { y: CosmosMath.spread_quantize(box.sy / 2, index, 7) }
                     })
                  )
               }).on('tick', () => {
                  mov && (battler.box.position.x = boxX + Math.abs(speerz.position.x - speerzX) * -side);
               });
               const de = () => renderer.detach('menu', speerz);
               detachers.push(de);
               renderer.attach('menu', speerz);
               const speerzX = battler.box.position.x + battler.box.size.x * 0.45 * side;
               await renderer.when(
                  () => (side === -1 && speerz.position.x > speerzX) || (side === 1 && speerz.position.x < speerzX)
               );
               if (!state.b) {
                  return;
               }
               speerz.gravity.x = 0;
               speerz.velocity.x = side * -4;
               speerz.position.x = speerzX;
               speerz.acceleration.value = 1 / 1.005;
               shake(2, 800);
               sounds.boxpush.instance(renderer);
               shake();
               mov = true;
               await Promise.race([
                  renderer.pause(rng.attack.next() * 1000 + 500),
                  renderer.when(() => battler.box.position.x < 100 || battler.box.position.x > 220)
               ]);
               if (!state.b) {
                  return;
               }
               battler.box.position.x = Math.min(Math.max(battler.box.position.x, 100), 220);
               mov = false;
               speerz.velocity.x = 0;
               for (const ob of speerz.objects) {
                  ob.metadata.bullet = false;
               }
               speerz.alpha.modulate(renderer, 500, 0).then(() => {
                  state.b && de();
               });
               await renderer.pause(dark ? 300 : 400);
               if (!state.b) {
                  return;
               }
               side *= -1;
            });
            await battler.turnTimer(dark ? 9500 : 7500);
            break;
         }
         case 2: {
            bulletSequence(async (detachers, state) => {
               let y = 0;
               let track = true;
               let shadow = false;
               const sh = new CosmosValue();
               const center = box.x1 + 25 + rng.attack.next() * (box.sx - 50);
               const distance = new CosmosValue(box.sx);
               const britney = CosmosUtils.populate(2, index =>
                  dogeSpear(damage, { rotation: [ 90, -90 ][index] }).on('tick', function () {
                     this.position.set(
                        new CosmosPoint(
                           center + distance.value * [ -1, 1 ][index],
                           track ? battler.SOUL.position.y : y
                        ).add(sh.value * (Math.random() * 2 - 1), sh.value * (Math.random() * 2 - 1))
                     );
                     if (shadow) {
                        const shad = quickshadow(this.objects[0] as CosmosSprite, this, battler.bullets);
                        shad.rotation.value = this.rotation.value;
                        shad.scale.set(this.scale);
                     }
                  })
               );
               const de = () => battler.bullets.detach(...britney);
               detachers.push(de);
               battler.bullets.attach(...britney);
               await distance.modulate(renderer, dark ? 1000 : 1200, 10, 10);
               if (!state.b) {
                  return;
               }
               track = false;
               y = battler.SOUL.position.y;
               await Promise.all([ sh.modulate(renderer, 300, 1), distance.modulate(renderer, 300, 12, 12) ]);
               if (!state.b) {
                  return;
               }
               shadow = true;
               sh.value = 0;
               sounds.stab.instance(renderer);
               await distance.modulate(renderer, 400, -box.sx);
               state.b && de();
            });
            await battler.turnTimer(dark ? 10000 : 8000);
            break;
         }
         case 3: {
            bulletSequence(async detachers => {
               detachers.push(
                  ...CosmosUtils.populate(2, index => {
                     const sp = dogeSpear(damage, {
                        rotation: [ -110, 70 ][index],
                        velocity: { y: (dark ? 2 : 1.5) * [ 1, -1 ][index] },
                        position: { x: box.x, y: [ box.y1, box.y2 ][index] }
                     }).on('tick', function () {
                        boxCheck(this, 40) && de();
                     });
                     const de = () => battler.bullets.detach(sp);
                     battler.bullets.attach(sp);
                     return de;
                  })
               );
               await renderer.pause(1000);
            });
            await battler.turnTimer(dark ? 10000 : 8000);
            break;
         }
      }
   },
   async muffet (turn: number, speedstat: number) {
      switch (turn) {
         case 0:
            battler.SOUL.area = renderer.area!;
            battler.SOUL.filters = [ battler.clipFilter ];
            const purpleRect = new CosmosRectangle({
               fill: 0xc000c0,
               position: { x: box.x, y: box.y2 },
               anchor: { x: 0, y: 1 },
               size: { x: box.sx },
               priority: 2000,
               area: renderer.area,
               filters: [ battler.clipFilter! ]
            });
            renderer.attach('menu', purpleRect);
            const biasNumber = new CosmosValue();
            battler.volatile[0].vars.biasNumber = biasNumber;
            await biasNumber.modulate(renderer, 1000, 0.9, 0.9);
            let sy = 0;
            await battler.sequence(12, async (promises, superindex) => {
               const sc = new CosmosValue(0.25);
               const droplets = CosmosUtils.populate(2, index => {
                  const sm = [ -1, 1 ][index];
                  const position = new CosmosPoint(160 + 55 * sm, 90);
                  const sprite = new CosmosSprite({
                     anchor: 0,
                     position,
                     frames: [ content.ibcMuffetDustrus ],
                     rotation: sm * -4,
                     priority: 1500
                  }).on('tick', function () {
                     if (this.position.y > purpleRect.position.y - purpleRect.size.y + 6) {
                        renderer.detach('menu', this);
                        if (index === 0) {
                           const y = Math.round((sy += battler.box.size.y / 12));
                           purpleRect.size.modulate(renderer, 66, { y }, { y });
                        }
                        return;
                     }
                     this.scale.set(sc.value * sm, sc.value);
                     if (this.position.extentOf(position) !== 0) {
                        this.rotation.value = this.position.angleFrom(position) - 90;
                     }
                     position.set(this);
                     if (this.position.y > box.y - 20 && (this.filters?.length ?? 0) === 0) {
                        this.area = renderer.area!;
                        this.filters = [ battler.clipFilter! ];
                     }
                  });
                  sprite.position.modulate(
                     renderer,
                     1600,
                     sprite.position.add(8 * sm, 16),
                     purpleRect.position.add(20 * sm, 7)
                  );
                  return sprite;
               });
               renderer.attach('menu', ...droplets);
               sc.modulate(renderer, 1600, 0.5, 0.5);
               await renderer.pause(250);
               superindex === 12 - 1 && biasNumber.modulate(renderer, 1000, 0, 0);
            });
            await renderer.pause(1000);
            battler.SOUL.metadata.color = 'purple';
            battler.line.active = true;
            battler.SOUL.position.x = battler.line.pos.x;
            battler.SOUL.area = null;
            battler.SOUL.filters = null;
            await purpleRect.alpha.modulate(renderer, 1000, 1, 0);
            renderer.detach('menu', purpleRect);
            break;
         case 1:
            await mufPattern(speedstat, async (spawn, pause) => {
               spawn(0, 0);
               spawn(0, 0, -1);
               spawn(0, 2);
               spawn(0, 2, -1);
               await pause(650);
               spawn(0, 0);
               spawn(0, 0, -1);
               spawn(0, 2);
               spawn(0, 2, -1);
               await pause(650);
               spawn(0, 0);
               spawn(0, 0, -1);
               spawn(0, 2);
               spawn(0, 2, -1);
               await pause(650);
               spawn(0, 0);
               await pause(250);
               spawn(0, 1);
               await pause(250);
               spawn(0, 2);
               await pause(250);
               spawn(0, 1);
               await pause(250);
               spawn(0, 0);
               await pause(650);
               spawn(0, 2, -1);
               await pause(250);
               spawn(0, 1, -1);
               await pause(250);
               spawn(0, 0, -1);
               await pause(250);
               spawn(0, 1, -1);
               await pause(250);
               spawn(0, 2, -1);
            });
            break;
         case 2:
            await mufPattern(speedstat, async (spawn, pause) => {
               spawn(0, 1);
               await pause(150);
               spawn(0, 2);
               await pause(250);
               spawn(0, 0);
               await pause(150);
               spawn(0, 1);
               await pause(650);
               spawn(0, 1);
               await pause(150);
               spawn(0, 2);
               await pause(250);
               spawn(0, 0);
               await pause(150);
               spawn(0, 1);
               await pause(850);
               spawn(0, 0, 1, 4);
               spawn(0, 2, 1, 4);
               await pause(250);
               spawn(0, 1, -1, 4);
               await pause(250);
               spawn(0, 0, 1, 4);
               spawn(0, 2, 1, 4);
               await pause(250);
               spawn(0, 1, -1, 4);
               await pause(250);
               spawn(0, 0, 1, 4);
               spawn(0, 2, 1, 4);
               await pause(250);
               spawn(0, 1, -1, 4);
            });
            break;
         case 3:
            await mufPattern(speedstat, async (spawn, pause, cupcake) => {
               await cupcake(0, 8000, 12000, async () => {
                  let et = 0;
                  let rounds = 0;
                  while (et < 7500) {
                     if (rounds++ % 2 === 0) {
                        spawn(0, 1, -1);
                     } else {
                        spawn(0, 0, -1);
                        spawn(0, 2, -1);
                     }
                     const time = CosmosMath.remap(et / 7500, 450, 250);
                     await pause(time);
                     et += time;
                  }
               });
            });
            break;
         case 4:
            await mufPattern(speedstat, async (spawn, pause) => {
               spawn(1, 0);
               spawn(1, 0, -1);
               await pause(450);
               spawn(1, 1);
               spawn(1, 1, -1);
               await pause(450);
               spawn(1, 2);
               spawn(1, 2, -1);
               await pause(1650);
               spawn(0, 1);
               await pause(350);
               spawn(0, 0);
               spawn(0, 2);
               await pause(350);
               spawn(0, 1);
               await pause(350);
               spawn(0, 0);
               spawn(0, 2);
               await pause(350);
               spawn(0, 1);
            });
            break;
         case 5:
            await mufPattern(speedstat, async (spawn, pause) => {
               spawn(0, 0);
               spawn(0, 0, -1);
               spawn(0, 2);
               spawn(0, 2, -1);
               await pause(450);
               spawn(1, 1);
               spawn(1, 1, -1);
               await pause(1650);
               spawn(0, 0);
               spawn(0, 0, -1);
               spawn(0, 2);
               spawn(0, 2, -1);
               await pause(450);
               spawn(1, 1);
               spawn(1, 1, -1);
               await pause(1650);
               spawn(0, 0);
               spawn(0, 0, -1);
               spawn(0, 2);
               spawn(0, 2, -1);
               await pause(450);
               spawn(1, 1);
               spawn(1, 1, -1);
               await pause(1650);
               spawn(0, 0);
               spawn(0, 0, -1);
               spawn(0, 2);
               spawn(0, 2, -1);
            });
            break;
         case 6:
            await mufPattern(speedstat, async (spawn, pause) => {
               spawn(1, 0);
               spawn(1, 2);
               await pause(850);
               spawn(1, 1);
               spawn(1, 2);
               await pause(1650);
               spawn(0, 0);
               await pause(250);
               spawn(0, 1);
               await pause(250);
               spawn(0, 0);
               spawn(0, 2);
               await pause(1250);
               spawn(1, 0, -1);
               spawn(1, 2, -1);
               await pause(850);
               spawn(1, 0, -1);
               spawn(1, 1, -1);
               await pause(1650);
               spawn(0, 2, -1);
               await pause(250);
               spawn(0, 1, -1);
               await pause(250);
               spawn(0, 0, -1);
               spawn(0, 2, -1);
            });
            break;
         case 7:
            await mufPattern(speedstat, async (spawn, pause, cupcake) => {
               await cupcake(1, 8000, 12000, async () => {
                  let et = 0;
                  let rounds = 0;
                  while (et < 7500) {
                     switch (rounds++ % 4) {
                        case 0:
                           spawn(1, 1);
                           break;
                        case 1:
                           spawn(1, 0, -1);
                           spawn(1, 2, -1);
                           break;
                        case 2:
                           spawn(1, 1, -1);
                           break;
                        case 3:
                           spawn(1, 0);
                           spawn(1, 2);
                           break;
                     }
                     const time = CosmosMath.remap(et / 7500, 1250, 1000);
                     await pause(time);
                     et += time;
                  }
               });
            });
            break;
         case 8:
            await mufPattern(speedstat, async (spawn, pause) => {
               spawn(2, 0, 1, 3, 1);
               spawn(2, 2, 1, 3, -1);
               await pause(650);
               spawn(0, 1);
               spawn(0, 1, -1);
               await pause(350);
               spawn(0, 0);
               spawn(0, 0, -1);
               spawn(0, 2);
               spawn(0, 2, -1);
               await pause(350);
               spawn(0, 1);
               spawn(0, 1, -1);
               await pause(650);
               spawn(2, 1, 1, 3, 1);
               spawn(2, 1, 1, 3, -1);
               await pause(650);
               spawn(2, 1, -1, 3, 1);
               spawn(2, 1, -1, 3, -1);
               await pause(850);
               spawn(0, 1);
               spawn(0, 1, -1);
               await pause(350);
               spawn(0, 0);
               spawn(0, 0, -1);
               spawn(0, 2);
               spawn(0, 2, -1);
               await pause(350);
               spawn(0, 1);
               spawn(0, 1, -1);
               await pause(350);
               spawn(0, 0);
               spawn(0, 0, -1);
               spawn(0, 2);
               spawn(0, 2, -1);
               await pause(650);
               spawn(2, 0, -1, 3, 1);
               spawn(2, 2, -1, 3, -1);
            });
            break;
         case 9:
            await mufPattern(speedstat, async (spawn, pause) => {
               spawn(2, 0, 1, 3, 1);
               await pause(650);
               spawn(2, 1, 1, 3, 1);
               await pause(650);
               spawn(2, 2, 1, 3, -1);
               await pause(650);
               spawn(2, 1, 1, 3, -1);
               await pause(650);
               spawn(2, 0, 1, 3, 1);
               await pause(650);
               spawn(2, 1, 1, 3, 1);
               await pause(850);
               spawn(1, 0);
               spawn(1, 0, -1);
               await pause(450);
               spawn(1, 1);
               spawn(1, 1, -1);
               await pause(450);
               spawn(1, 2);
               spawn(1, 2, -1);
               await pause(1250);
               spawn(2, 1, 1, 3, 1);
               spawn(2, 1, 1, 3, -1);
               await pause(1250);
               spawn(1, 0);
               spawn(1, 2);
               await pause(850);
               spawn(2, 1, 1, 3, 1);
               spawn(2, 1, 1, 3, -1);
               await pause(1250);
               spawn(1, 0, -1);
               spawn(1, 2, -1);
            });
            break;
         case 10:
            await mufPattern(speedstat, async (spawn, pause) => {
               spawn(1, 0);
               spawn(1, 0, -1);
               spawn(1, 2);
               spawn(1, 2, -1);
               await pause(650);
               spawn(0, 1, -1);
               await pause(350);
               spawn(0, 1, -1);
               await pause(850);
               spawn(2, 1, 1, 3, 1);
               spawn(2, 1, 1, 3, -1);
               await pause(650);
               spawn(2, 1, -1, 3, 1);
               spawn(2, 1, -1, 3, -1);
               await pause(350);
               spawn(0, 2, -1);
               spawn(0, 2, 1);
               await pause(450);
               spawn(0, 1, -1);
               spawn(0, 1, 1);
               await pause(450);
               spawn(0, 0, -1);
               spawn(0, 0, 1);
               spawn(0, 2, -1);
               spawn(0, 2, 1);
               await pause(450);
               spawn(0, 1, -1);
               spawn(0, 1, 1);
               await pause(1050);
               spawn(0, 1, -1, 6);
               await pause(350);
               spawn(0, 0, -1, 6);
               await pause(350);
               spawn(0, 1, 1, 6);
               await pause(350);
               spawn(0, 2, 1, 6);
               await pause(350);
               spawn(0, 1, -1, 6);
               await pause(350);
               spawn(0, 0, -1, 6);
               await pause(350);
               spawn(0, 1, 1, 6);
               await pause(350);
               spawn(0, 2, 1, 6);
               await pause(350);
               spawn(2, 0, -1, 3, 1);
               spawn(2, 2, -1, 3, -1);
               await pause(850);
               spawn(2, 0, 1, 3, 1);
               spawn(2, 2, 1, 3, -1);
               await pause(850);
               spawn(2, 0, -1, 3, 1);
               spawn(2, 2, -1, 3, -1);
               await pause(1250);
               spawn(1, 0);
               spawn(1, 0, -1);
               spawn(1, 2);
               spawn(1, 2, -1);
               await pause(650);
               spawn(1, 1);
               spawn(1, 1, -1);
               await pause(1250);
               spawn(1, 1);
               spawn(1, 1, -1);
               await pause(650);
               spawn(1, 0);
               spawn(1, 0, -1);
               spawn(1, 2);
               spawn(1, 2, -1);
            });
            break;
         case 11:
            await mufPattern(speedstat, async (spawn, pause, cupcake) => {
               await cupcake(2, 8000, 16000, async () => {
                  let et = 0;
                  let rounds = 0;
                  while (et < 7500) {
                     switch (rounds++ % 4) {
                        case 0:
                           spawn(2, 0, 1, 3, 1);
                           break;
                        case 1:
                           spawn(2, 1, -1, 3, 1);
                           break;
                        case 2:
                           spawn(2, 2, 1, 3, -1);
                           break;
                        case 3:
                           spawn(2, 1, -1, 3, -1);
                           break;
                     }
                     const time = CosmosMath.remap(et / 7500, 550, 350);
                     await pause(time);
                     et += time;
                  }
               });
            });
            break;
      }
   },
   radtile () {
      if (battler.pattern('radtile', [ true, false ])) {
         const mirror1 = new CosmosSprite({ frames: [ content.ibbMirror ], anchor: 0 });
         const mirror2 = new CosmosSprite({ frames: [ content.ibbMirror ], anchor: 0, rotation: 180 });
         const hinge1 = new CosmosHitbox({
            priority: 1,
            position: { x: box.x1 + 4, y: box.y },
            objects: [
               mirror1,
               new CosmosAnimation({ anchor: 0, resources: content.ibbHinge }),
               new CosmosHitbox({ anchor: 0, size: { x: 13, y: 10 }, metadata: { bullet: true, damage: 4 } })
            ]
         });
         const hinge2 = new CosmosHitbox({
            priority: 1,
            position: { x: box.x2 - 4, y: box.y },
            objects: [
               mirror2,
               new CosmosAnimation({ anchor: 0, resources: content.ibbHinge, index: 1 }),
               new CosmosHitbox({ anchor: 0, size: { x: 13, y: 10 }, metadata: { bullet: true, damage: 4 } })
            ]
         });
         battler.bullets.attach(hinge1, hinge2);
         events.on('turn-timer').then(() => battler.bullets.detach(hinge1, hinge2));
         bulletSequence(async (detachers, state) => {
            // calculate new hinge positions
            const p1 = new CosmosPoint(hinge1.position.x, box.y1 + 4 + rng.attack.next() * (box.sy - 8));
            const p2 = new CosmosPoint(hinge2.position.x, box.y1 + 4 + rng.attack.next() * (box.sy - 8));

            // get shape type
            const zShape = p1.y > p2.y;

            // decide which hinges are top and bottom
            const pB = zShape ? p1 : p2;
            const pT = zShape ? p2 : p1;

            // get start and end points
            const start = new CosmosPoint(zShape ? box.x2 : box.x1, box.y2);
            const end = new CosmosPoint(zShape ? box.x1 : box.x2, box.y1);

            // get angles between all points
            const a1 = start.angleTo(pB);
            const a2 = pB.angleTo(pT);
            const a3 = pT.angleTo(end);

            // get median angles for mirrors
            const rot1 = pB.angleTo(pB.endpoint(a1, -1).add(pB.endpoint(a2, 1)).divide(2));
            const rot2 = pT.angleTo(pT.endpoint(a2, -1).add(pT.endpoint(a3, 1)).divide(2));

            // move all elements
            await Promise.all([
               hinge1.position.modulate(renderer, 400, {}, p1, p1),
               hinge2.position.modulate(renderer, 400, {}, p2, p2),
               (zShape ? mirror1 : mirror2).rotation.modulate(renderer, 400, rot1 > 270 ? rot1 - 360 : rot1),
               (zShape ? mirror2 : mirror1).rotation.modulate(renderer, 400, rot2 > 270 ? rot2 - 360 : rot2)
            ]);
            if (!state.b) {
               return;
            }
            const beams = (
               [
                  [ start.add(pB).divide(2), a1 ],
                  [ pB.add(pT).divide(2), a2 ],
                  [ pT.add(end).divide(2), a3 ]
               ] as [CosmosPoint, number][]
            ).map(([ position, rotation ]) => {
               const { bullet, detach } = bulletSetup(
                  new CosmosHitbox({
                     position,
                     rotation,
                     anchor: 0,
                     size: { x: 200, y: 6 },
                     metadata: { bullet: false, damage: 4, alpha: new CosmosValue() },
                     objects: [ new CosmosRectangle({ anchor: 0, size: { x: 200, y: 6 }, fill: 0xffffff }) ]
                  }).on('tick', function () {
                     this.tint = CosmosImageUtils.gradient(0, 0xffffff, this.metadata.alpha.value);
                  }),
                  false,
                  null
               );
               bullet.scale.modulate(renderer, 200, { y: bullet.scale.y * 1.25 }, { y: bullet.scale.y });
               detachers.push(detach);
               return { bullet, detach };
            });
            sounds.appear.instance(renderer);
            await Promise.all(beams.map(b => b.bullet.metadata.alpha.modulate(renderer, 600, 0.4, 0.4)));
            if (!state.b) {
               return;
            }
            for (const b of beams) {
               b.bullet.metadata.alpha.value = 1;
               b.bullet.metadata.bullet = true;
            }
            shake(2, 300);
            sounds.bomb.instance(renderer);
            renderer.pause(100).then(() => {
               if (!state.b) {
                  return;
               }
               for (const b of beams) {
                  b.bullet.metadata.bullet = false;
                  b.bullet.metadata.alpha.modulate(renderer, 300, 0).then(() => {
                     state.b && b.detach();
                  });
               }
            });
            await renderer.pause(600);
         });
      } else {
         battler.SOUL.position.y = box.y1 + 8;
         const mirror = new CosmosSprite({
            anchor: 0,
            frames: [ content.ibbMirrorLarge ],
            position: box,
            scale: 1.5,
            priority: 1,
            objects: [
               new CosmosHitbox({ anchor: 0, size: { x: 9, y: 23 }, metadata: { bullet: true, damage: 4 } }),
               new CosmosHitbox({ anchor: 0, size: { x: 21, y: 11 }, metadata: { bullet: true, damage: 4 } }),
               new CosmosHitbox({ anchor: 0, size: { x: 17, y: 19 }, metadata: { bullet: true, damage: 4 } })
            ]
         });
         battler.bullets.attach(mirror);
         events.on('turn-timer').then(() => battler.bullets.detach(mirror));
         bulletSequence(async (detachers, state) => {
            const r = rng.attack.next() * 360;
            const beams = CosmosUtils.populate(3, i => {
               const { bullet, detach } = bulletSetup(
                  new CosmosHitbox({
                     anchor: 0,
                     rotation: r + i * (180 / 3),
                     size: { x: 200, y: 6 },
                     metadata: { bullet: false, damage: 4, alpha: new CosmosValue() },
                     objects: [ new CosmosRectangle({ anchor: 0, size: { x: 200, y: 6 }, fill: 0xffffff }) ],
                     position: box
                  }).on('tick', function () {
                     this.tint = CosmosImageUtils.gradient(0, 0xffffff, this.metadata.alpha.value);
                  }),
                  false,
                  null
               );
               bullet.scale.modulate(renderer, 200, { y: bullet.scale.y * 1.25 }, { y: bullet.scale.y });
               detachers.push(detach);
               return { bullet, detach };
            });
            sounds.appear.instance(renderer);
            const rotTar = (rng.attack.next() * 60 + 60) * (rng.attack.next() < 0.5 ? -1 : 1);
            for (const b of beams) {
               b.bullet.metadata.alpha.modulate(renderer, 600, 0.4, 0.4);
            }
            await renderer.pause(200);
            if (!state.b) {
               return;
            }
            await Promise.all(
               beams.map(b =>
                  b.bullet.rotation.modulate(
                     renderer,
                     1000,
                     b.bullet.rotation.value,
                     b.bullet.rotation.value + rotTar,
                     b.bullet.rotation.value + rotTar
                  )
               )
            );
            if (!state.b) {
               return;
            }
            for (const b of beams) {
               b.bullet.metadata.alpha.value = 1;
               b.bullet.metadata.bullet = true;
            }
            shake(2, 300);
            sounds.bomb.instance(renderer);
            renderer.pause(100).then(() => {
               if (!state.b) {
                  return;
               }
               for (const b of beams) {
                  b.bullet.metadata.bullet = false;
                  b.bullet.metadata.alpha.modulate(renderer, 300, 0).then(() => {
                     state.b && b.detach();
                  });
               }
            });
            await renderer.pause(400);
         });
      }
   },
   woshua (cleaners = false, modifier?: 'moldbygg') {
      if (cleaners || battler.pattern('woshua', [ true, false ])) {
         let g = 0;
         let a = 0;
         const time = renderer.time;
         const offs = [ new CosmosValue() ];
         const watuh = new CosmosHitbox({
            area: renderer.area,
            filters: [ battler.clipFilter! ],
            size: { x: 100, y: 65 },
            anchor: { x: 0 },
            position: { x: box.x },
            priority: 9999,
            metadata: { bullet: true, damage: 4, watuh: true },
            objects: [
               new CosmosAnimation({
                  active: true,
                  anchor: { x: 0 },
                  resources: content.ibbWaterwall,
                  position: { y: -6 }
               })
            ]
         }).on('tick', function () {
            let y = 0;
            for (const o of offs) {
               y += o.value;
            }
            this.position.y = Math.max(box.y2 - y, box.y1 + 16) + sineWaver(time, 2000, -1, 1);
            g = Math.max(g - 0.1, 0);
            a = Math.max(a - 0.1, 0);
            this.tint = CosmosImageUtils.gradient(CosmosImageUtils.gradient(0xcfcfcf, 0xffffff, a), 0x40ff40, g / 2);
         });
         renderer.attach('menu', watuh);
         const healListener = () => {
            events.off('heal', healListener);
            for (const volatile of battler.volatile) {
               if (volatile.vars.clean === false && !volatile.sparable) {
                  volatile.sparable = true;
                  SAVE.data.b.spared_woshua = true;
                  volatile.vars.clean = true;
               }
            }
         };
         events.on('turn-timer').then(() => {
            renderer.detach('menu', watuh);
            cleaners && events.off('heal', healListener);
         });
         events.on('heal', healListener);
         let index = 0;
         bulletSequence(async (detachers, state) => {
            const s = rng.attack.next();
            const c = 1 + s;
            const gel = modifier === 'moldbygg' && s > 0.75;
            const green = cleaners && index % 7 === 0;
            const { bullet, detach } = bulletSetup(
               new CosmosHitbox({
                  size: gel ? { x: 28, y: 7 } : { x: 10, y: 11 },
                  anchor: gel ? { x: 0, y: 1 } : { y: 0, x: 1 },
                  position: {
                     x: green
                        ? Math.min(Math.max(battler.SOUL.position.x, box.x1 + 15), box.x2 - 15) +
                          rng.attack.next() * 20 -
                          10
                        : box.x1 + 5 + rng.attack.next() * (box.sx - 10),
                     y: box.y1 - 10
                  },
                  rotation: gel ? 0 : 90,
                  scale: gel ? { x: 0.6 * c, y: 0.4 * c } : { x: 0.4 * c, y: 0.6 * c },
                  metadata: { damage: green ? 3 : 4, bullet: true, color: green ? 'green' : 'white' },
                  objects: [
                     gel
                        ? new CosmosSprite({
                             anchor: { x: 0, y: 1 },
                             frames: [ content.ibbGelatslab ],
                             position: { y: 1 },
                             tint: green ? 0x40ff40 : void 0
                          })
                        : new CosmosAnimation({
                             anchor: { y: 0, x: 1 },
                             position: { x: 1 },
                             resources: content.ibbWater,
                             index: green ? 1 : 0
                          })
                  ],
                  priority: gel ? 2 : 1
               }).on('tick', function () {
                  let y = 0;
                  for (const o of offs) {
                     y += o.value;
                  }
                  if (this.position.y > Math.max(box.y2 - y, box.y1 + 16) - 3) {
                     a = 1;
                     if (green) {
                        g = 1;
                     }
                     const o = new CosmosValue();
                     offs.push(o);
                     const es = CosmosMath.remap(s, 2, 4) * (gel ? 2 : 1);
                     o.modulate(renderer, 300, es * 4, es * 4).then(async () => {
                        await o.modulate(renderer, 600, o.value, es, es);
                        offs.splice(offs.indexOf(o), 1);
                        offs[0].value += 3;
                     });
                     sounds.swallow.instance(renderer);
                     gel && sounds.rustle.instance(renderer);
                     detach();
                     let i = 0;
                     while (i < (gel ? 6 : 4)) {
                        battler.bullets.attach(
                           new CosmosAnimation({
                              scale: 1 / 4,
                              alpha: 0.7,
                              position: this.position.add(CosmosMath.spread(gel ? 5 : 0, i, 6), 0),
                              velocity: CosmosMath.ray(
                                 CosmosMath.spread(20, i, 4) - 90 + (Math.random() * 10 - 5),
                                 Math.random() * 2 + 3
                              ),
                              gravity: { y: 0.5 },
                              resources: content.ibbWater,
                              index: green ? 1 : 0
                           }).on('tick', function () {
                              if (this.position.y > box.y2 + 10) {
                                 battler.bullets.detach(this);
                              } else {
                                 this.rotation.value = this.velocity.angle;
                              }
                           })
                        );
                        i++;
                     }
                  }
               })
            );
            detachers.push(detach);
            bullet.position.modulate(renderer, 500, { y: box.y1 + 5 }, { y: box.y1 + 5 }).then(async () => {
               if (!state.b) {
                  return;
               }
               bullet.velocity.y = 1;
               bullet.gravity.y = 0.5;
               const e = { x: bullet.scale.y, y: bullet.scale.x };
               bullet.scale.modulate(renderer, 500, e, e);
            });
            await renderer.pause(gel ? 850 : 450);
            index++;
         });
         return true;
      } else {
         const e = box.sy + 40;
         const tint = CosmosImageUtils.gradient(0xffffff, 0x00a2e8, 0.25);
         const xes = [] as number[];
         bulletSequence(async (detachers, state) => {
            let swiped = false;
            let x = NaN;
            while (Number.isNaN(x) || xes.filter(xe => Math.abs(xe - x) < 8).length > 0) {
               x = box.x1 + 5 + rng.attack.next() * (box.sx - 10);
            }
            xes.push(x);
            const { bullet, detach, detached } = bulletSetup(
               new CosmosHitbox({
                  size: { x: 18, y: 4 },
                  anchor: { x: 0 },
                  metadata: { bullet: true, damage: 4, ae: 0, skrub: true },
                  position: { x, y: box.y2 },
                  objects: [
                     new CosmosSprite({
                        frames: [ content.ibbSkrubber ],
                        anchor: { x: 0 },
                        priority: 1,
                        position: { y: -1 }
                     }).on('tick', function () {
                        if (swiped) {
                           const b = quickshadow(this, this, bullet, 0.4);
                           b.velocity.y = -bullet.velocity.y;
                        }
                     })
                  ]
               }).on('tick', async function () {
                  if (this.position.y < box.y1 - e) {
                     detach();
                  } else if (swiped && ++this.metadata.ae === (modifier === 'moldbygg' ? 8 : 4)) {
                     this.metadata.ae = 0;
                     const { bullet, detach } = bulletSetup(
                        new CosmosHitbox({
                           size: 12,
                           anchor: { x: 0 },
                           scale: 0.5,
                           priority: -10,
                           velocity: {
                              x: rng.attack.next() * 2 - 1,
                              y: rng.attack.next() * 2 - 1 - this.velocity.y
                           },
                           position: { x: (this.size.x - 4) * (Math.random() - 0.5) },
                           metadata: { bullet: true, damage: 4, sparkle: true },
                           objects: [ new CosmosAnimation({ active: true, anchor: 0, resources: content.ibbGlitter }) ]
                        }),
                        this
                     );
                     detachers.push(detach);
                     await bullet.scale.modulate(renderer, 850, 0.1);
                     detach();
                  }
               }),
               false,
               null
            );
            const r = new CosmosHitbox({
               anchor: { x: 0, y: 1 },
               size: { x: 14, y: 80 },
               metadata: { fadeline: true },
               rotation: 180,
               priority: -400,
               objects: [
                  new CosmosSprite({
                     alpha: 0.8,
                     anchor: { x: 0, y: 1 },
                     scale: { x: 14 / 2, y: e / 100 },
                     frames: [ content.ibbFadeline ],
                     tint
                  })
               ]
            }).on('tick', function () {
               this.position.set(bullet);
            });
            battler.bullets.attach(r);
            detached.then(() => {
               battler.bullets.detach(r);
               xes.splice(xes.indexOf(x), 1);
            });
            detachers.push(detach);
            await bullet.position.modulate(renderer, 500, { y: box.y2 - 5 });
            if (!state.b) {
               return;
            }
            await renderer.pause(500);
            if (!state.b) {
               return;
            }
            swiped = true;
            bullet.velocity.y = -3;
            sounds.swipe.instance(renderer).rate.value *= 0.9;
         });
         return false;
      }
   },
   moldbygg (modifier?: 'woshua' | 'moldsmal', findWatuh = false) {
      const wosh = modifier === 'woshua';
      const watuh = findWatuh ? renderer.layers.menu.objects.find(ob => ob.metadata.watuh) : null;
      const tint = CosmosImageUtils.gradient(0xffffff, 0x00a2e8, 0.25);
      if (modifier !== 'moldsmal' && (wosh || battler.pattern('moldbygg', [ true, false ]))) {
         if (watuh) {
            return;
         }
         let ct = 0;
         const stackHeight = 5;
         bulletSequence(async (detachers, state) => {
            if (wosh) {
               await renderer.pause(700);
               if (!state.b) {
                  return;
               }
            }
            const stackElevation = new CosmosValue();
            const stackScale = new CosmosPoint(0.75, 1);
            const woshSide = wosh && rng.attack.next() < 0.5 ? 0 : 1;
            const parts = CosmosUtils.populate(wosh ? 1 : stackHeight, i => {
               const baseY = box.y2 + i * 10;
               const { bullet, detach } = bulletSetup(
                  new CosmosHitbox({
                     size: { x: 28, y: 7 },
                     anchor: 0,
                     metadata: { bullet: true, damage: 4, knocked: false, ripperdipperskipper: false },
                     position: wosh
                        ? {
                             x: [ box.x2 + 20, box.x1 - 20 ][woshSide],
                             y: box.y + 5 + rng.attack.next() * (box.sy / 2 - 10)
                          }
                        : {
                             x:
                                Math.min(Math.max(battler.SOUL.position.x, box.x1 + 15), box.x2 - 15) +
                                (rng.attack.next() * 10 - 5),
                             y: i === 0 ? box.y1 - 10 : baseY
                          },
                     objects: [ new CosmosSprite({ anchor: 0, frames: [ content.ibbGelatslab ] }) ],
                     priority: -1,
                     scale: stackScale,
                     gravity: { y: wosh || i > 0 ? 0 : 0.5 },
                     velocity: { x: wosh ? [ -3, 3 ][woshSide] : 0, y: wosh || i > 0 ? 0 : ct++ < 1 ? -4 : 1 }
                  }).on('tick', async function () {
                     if (boxCheck(this, stackHeight * 10)) {
                        detach();
                        return;
                     } else if (!wosh) {
                        if (!this.metadata.knocked) {
                           const targetY = (baseY + stackElevation.value - box.y2) * stackScale.y + box.y2;
                           if (i > 0 || this.gravity.y === 0) {
                              this.scale.set(stackScale);
                              this.position.y = targetY;
                           } else if (targetY <= this.position.y) {
                              this.gravity.y = 0;
                              this.position.y = targetY;
                              await stackScale.modulate(
                                 renderer,
                                 500,
                                 { x: 1, y: 0.4 },
                                 { x: stackScale.x, y: stackScale.y }
                              );
                              if (!state.b) {
                                 return;
                              }
                              for (const [ i, part ] of parts.entries()) {
                                 part.metadata.knocked = true;
                                 part.gravity.y = 0.5;
                                 const vx = rng.attack.next() - 0.5;
                                 part.velocity.set(vx < 0 ? -1 - vx * 3 : 1 + vx * 3, -2.5 - (stackHeight - i));
                                 part.spin.value = part.velocity.x * 4;
                              }
                              sounds.stab.instance(renderer);
                           }
                        }
                     } else if (!this.metadata.ripperdipperskipper) {
                        if (this.velocity.y > -1) {
                           const skrubs = renderer.detect(
                              this,
                              ...renderer.calculate(battler.bullets, obj => obj.metadata.skrub)
                           );
                           if (
                              skrubs.length > 0 &&
                              this.position.y < skrubs[0].position.y + 5 &&
                              Math.abs(this.position.x - skrubs[0].position.x) < 20
                           ) {
                              this.metadata.knocked = true;
                              this.spin.value = this.velocity.x * 4;
                              this.velocity.y = -4;
                              this.gravity.y = 0.25;
                              sounds.noise.instance(renderer);
                              this.priority.value = 1;
                              return;
                           }
                        }
                        if (this.velocity.y > -2 && this.priority.value < 0) {
                           const fadelines = renderer.detect(
                              this,
                              ...renderer.calculate(battler.bullets, obj => obj.metadata.fadeline)
                           );
                           if (fadelines.length > 0 && Math.abs(this.position.x - fadelines[0].position.x) < 2) {
                              this.metadata.ripperdipperskipper = true;
                              this.metadata.knocked = true;
                              this.position.x = fadelines[0].position.x;
                              this.spin.value = 0;
                              this.velocity.y = -3;
                              this.gravity.y = 0;
                              this.velocity.x = 0;
                              this.tint = tint;
                              sounds.noise.instance(renderer);
                           }
                        }
                     }
                     if (this.metadata.knocked) {
                        const spr = quickshadow(this.objects[0] as CosmosSprite, this, battler.bullets);
                        spr.rotation.value = this.rotation.value;
                        spr.scale.set(this.scale);
                     }
                  }),
                  false,
                  null
               );
               detachers.push(detach);
               return bullet;
            });
            if (wosh) {
               await renderer.pause(500);
            } else {
               stackElevation.modulate(renderer, 800, stackHeight * -10 + 5, stackHeight * -10 + 5);
               await renderer.pause(2000);
            }
         });
      } else {
         const time = renderer.time;
         bulletSequence(async detachers => {
            const s = rng.attack.next();
            const x = box.x1 + rng.attack.next() * box.sy;
            const p = CosmosMath.remap(s, 1000, 2000);
            const o = rng.attack.next();
            const t = 1.5;
            const f = t ** (1 / 20);
            const scale = CosmosMath.remap(s, 0.3, 0.6);
            const { detach } = bulletSetup(
               new CosmosHitbox({
                  anchor: 0,
                  size: 10,
                  scale,
                  metadata: { bullet: true, damage: 4, stage: 0 },
                  position: { x, y: box.y2 + 5 },
                  velocity: { y: CosmosMath.remap(s, 0, -1) },
                  gravity: { y: -0.15 },
                  objects: [ new CosmosSprite({ anchor: 0, frames: [ content.ibbOctagon ] }) ]
               }).on('tick', function () {
                  switch (this.metadata.stage) {
                     case 0:
                        this.position.x = x + sineWaver(time, p, -3, 3, o);
                        if (s < 1 / 3) {
                           boxCheck(this, 10) && detach();
                        } else if (this.position.y <= box.y1) {
                           this.metadata.stage = 1;
                           this.gravity.y = 0;
                           this.velocity.y = 0;
                           this.position.y = box.y1;
                           this.scale.set(this.scale.multiply(1.2, 0.8));
                        }
                        break;
                     case 1:
                        this.scale.set(this.scale.multiply(f));
                        if (scale * t <= this.scale.x) {
                           this.metadata.stage = 2;
                           this.gravity.y = 0.5;
                        }
                        break;
                     case 2:
                        if (boxCheck(this, 10)) {
                           detach();
                        } else {
                           this.scale.set(this.scale.multiply(0.98, 1.02));
                           quickshadow(this.objects[0] as CosmosSprite, this, battler.bullets).scale.set(this.scale);
                        }
                        break;
                  }
               })
            );
            detachers.push(detach);
            await renderer.pause(modifier === 'moldsmal' ? 600 : 400);
         });
      }
   },
   async undyne (phase: number, turns: number, swing: boolean, maxhp: number) {
      const vola = battler.volatile[0];
      world.genocide && battler.stat.invulnerability.modifiers.push([ 'add', -Math.ceil(calcLVX() / 2), 1 ]);
      if (helmetdyne() || world.genocide || phase === 5) {
         if (battler.SOUL.metadata.color === 'red') {
            await undStandard(swing);
         } else {
            let r =
               helmetdyne() || world.genocide
                  ? (helmetdyne() ? 17 : 9) + CosmosMath.bezier(rng.attack.next(), 0, 0, 1, 1) * 7
                  : 1 + CosmosMath.remap(Math.min(turns, 8) / 8, 12, 0);
            const difficulty =
               helmetdyne() || world.genocide
                  ? CosmosMath.bezier(vola.hp / maxhp, 1, 0.25, 0) * (helmetdyne() ? 0.75 : 1)
                  : 1 - Math.min(turns, 8) / 8;
            if (!helmetdyne() && !world.genocide) {
               vola.vars.speed = Math.max(vola.vars.speed - 0.1, 0.1);
            }
            await undSequence(swing, (spawn, pause) =>
               CosmosUtils.chain<UndQ, Promise<any>>(
                  helmetdyneAttack() ? undController.init_alt : world.genocide ? undController.init : [ [ 'b', 1 ] ],
                  async (patterns, next) => {
                     const pattern = CosmosMath.weigh(patterns, rng.attack.next())!;
                     if (undController.endb.includes(pattern) || r-- > 0) {
                        await next(await undPatterns[pattern](pause, spawn, difficulty));
                     }
                  }
               )
            );
         }
      } else {
         switch (phase) {
            case 0:
               {
                  switch (turns) {
                     case 0:
                        vola.vars.turns++;
                     case 1:
                        await undSequence(swing, async (spawn, pause) => {
                           spawn('blue', 'up', 2);
                           await pause(750);
                           spawn('blue', 'up', 2);
                           await pause(750);
                           spawn('blue', 'up', 2);
                        });
                        break;
                     case 2:
                        await undSequence(swing, async (spawn, pause) => {
                           spawn('blue', 'up', 1.5, 4);
                        });
                        break;
                     case 3:
                        await undSequence(swing, async (spawn, pause) => {
                           spawn('blue', 'up', 3, 4);
                        });
                        break;
                     case 4:
                        await undSequence(swing, async (spawn, pause) => {
                           spawn('blue', 'right', 3);
                           await pause(350);
                           spawn('blue', 'left', 3);
                           await pause(350);
                           spawn('blue', 'right', 3);
                           await pause(350);
                           spawn('blue', 'left', 3);
                           await pause(350);
                           spawn('blue', 'down', 3);
                           await pause(350);
                           spawn('blue', 'right', 3);
                           await pause(350);
                           spawn('blue', 'up', 3);
                           await pause(350);
                           spawn('blue', 'left', 3);
                           await pause(350);
                           spawn('blue', 'down', 3);
                           await pause(350);
                           spawn('blue', 'up', 3);
                           await pause(350);
                           spawn('blue', 'down', 4);
                           await pause(350);
                           spawn('blue', 'up', 4);
                           await pause(450);
                           spawn('blue', 'down', 5);
                           await pause(450);
                           spawn('blue', 'up', 5);
                           await pause(550);
                           spawn('blue', 'down', 6);
                           await pause(550);
                           spawn('blue', 'up', 6);
                           await pause(650);
                           spawn('blue', 'down', 7);
                        });
                  }
               }
               break;
            case 1: {
               switch (turns) {
                  case 0:
                     await undSequence(swing, async (spawn, pause) => {
                        spawn('blue', 'up', 3);
                        await pause(350);
                        spawn('blue', 'up', 3);
                        await pause(550);
                        spawn('blue', 'left', 3);
                        await pause(350);
                        spawn('blue', 'left', 3);
                        await pause(550);
                        spawn('blue', 'right', 3);
                        await pause(350);
                        spawn('blue', 'right', 3);
                     });
                     break;
                  case 1:
                     await undSequence(swing, async (spawn, pause) => {
                        spawn('blue', 'left', 3);
                        await pause(450);
                        spawn('blue', 'up', 3);
                        await pause(450);
                        spawn('blue', 'left', 3);
                        await pause(450);
                        spawn('blue', 'left', 3);
                        await pause(450);
                        spawn('blue', 'up', 3);
                        await pause(450);
                        spawn('blue', 'left', 3);
                        await pause(450);
                        spawn('blue', 'right', 3);
                        await pause(450);
                        spawn('blue', 'right', 3);
                     });
                     break;
                  case 2:
                     await undSequence(swing, async (spawn, pause) => {
                        spawn('blue', 'down', 3);
                        await pause(650);
                        spawn('blue', 'right', 3);
                        await pause(650);
                        spawn('blue', 'up', 3);
                        await pause(650);
                        spawn('blue', 'left', 3);
                        await pause(650);
                        spawn('blue', 'down', 3);
                        await pause(550);
                        spawn('blue', 'right', 3);
                        await pause(550);
                        spawn('blue', 'up', 3);
                        await pause(450);
                        spawn('blue', 'left', 3);
                        await pause(450);
                        spawn('blue', 'down', 3);
                        await pause(350);
                        spawn('blue', 'right', 3);
                        await pause(350);
                        spawn('blue', 'up', 3);
                     });
                     break;
                  case 3:
                     await undSequence(swing, async (spawn, pause) => {
                        spawn('blue', 'down', 3.5);
                        spawn('blue', 'right', 5);
                        await pause(1450);
                        spawn('blue', 'up', 3.5);
                        spawn('blue', 'left', 5);
                        await pause(1450);
                        spawn('blue', 'down', 5);
                        spawn('blue', 'left', 3.5);
                        await pause(1450);
                        spawn('blue', 'up', 5);
                        spawn('blue', 'right', 3.5);
                     });
                     break;
                  case 4:
                     await undSequence(swing, async (spawn, pause) => {
                        spawn('blue', 'up', 4);
                        await pause(450);
                        spawn('blue', 'left', 4);
                        await pause(450);
                        spawn('blue', 'right', 4);
                        await pause(450);
                        spawn('blue', 'right', 4);
                        await pause(450);
                        spawn('blue', 'down', 4);
                        await pause(450);
                        spawn('blue', 'right', 4);
                        await pause(450);
                        spawn('blue', 'left', 4);
                        await pause(450);
                        spawn('blue', 'up', 4);
                        await pause(450);
                        spawn('blue', 'down', 4);
                        await pause(450);
                        spawn('purple', 'right', 4);
                     });
                     break;
                  case 5:
                     await undStandard(swing);
                     break;
                  case 6:
                     await undStandard(swing);
                     break;
               }
               break;
            }
            case 2: {
               switch (turns) {
                  case 0:
                     await undSequence(swing, async (spawn, pause) => {
                        spawn('blue', 'up', 4);
                        await pause(650);
                        spawn('blue', 'down', 4);
                        await pause(650);
                        spawn('blue', 'left', 4);
                        await pause(650);
                        spawn('blue', 'right', 4);
                        await pause(650);
                        spawn('purple', 'left', 3);
                        await pause(650);
                        spawn('blue', 'right', 4);
                     });
                     break;
                  case 1:
                     await undSequence(swing, async (spawn, pause) => {
                        spawn('blue', 'up', 4);
                        await pause(550);
                        spawn('blue', 'right', 4);
                        await pause(550);
                        spawn('blue', 'right', 4);
                        spawn('purple', 'left', 3);
                        await pause(550);
                        spawn('blue', 'right', 4);
                        await pause(550);
                        spawn('blue', 'right', 4);
                        await pause(550);
                        spawn('blue', 'up', 4);
                     });
                     break;
                  case 2:
                     await undSequence(swing, async (spawn, pause) => {
                        spawn('purple', 'left', 2);
                        await pause(350);
                        spawn('purple', 'right', 2);
                        await pause(350);
                        spawn('purple', 'left', 2);
                        await pause(350);
                        spawn('blue', 'up', 4);
                        await pause(550);
                        spawn('blue', 'down', 4);
                        await pause(550);
                        spawn('blue', 'up', 4);
                        await pause(550);
                        spawn('blue', 'down', 4);
                     });
                     break;
                  case 3:
                     await undSequence(swing, async (spawn, pause) => {
                        spawn('blue', 'up', 4);
                        await pause(350);
                        spawn('blue', 'right', 4);
                        await pause(350);
                        spawn('blue', 'down', 4);
                        await pause(350);
                        spawn('blue', 'left', 4);
                        await pause(350);
                        spawn('blue', 'up', 4);
                        await pause(350);
                        spawn('purple', 'right', 4);
                        spawn('blue', 'down', 4);
                        await pause(350);
                        spawn('blue', 'down', 4);
                        await pause(350);
                        spawn('blue', 'left', 4);
                        await pause(1450);
                        spawn('blue', 'up', 4);
                     });
                     break;
                  case 4:
                     await undSequence(swing, async (spawn, pause) => {
                        spawn('blue', 'down', 5);
                        await pause(450);
                        spawn('blue', 'up', 5);
                        await pause(450);
                        spawn('blue', 'down', 5);
                        await pause(450);
                        spawn('blue', 'down', 5);
                        await pause(450);
                        spawn('blue', 'up', 5);
                        await pause(450);
                        spawn('blue', 'down', 5);
                        await pause(450);
                        spawn('blue', 'up', 5);
                        await pause(450);
                        spawn('blue', 'up', 5);
                        await pause(450);
                        spawn('blue', 'down', 5);
                     });
                     break;
                  case 5:
                     await undSequence(swing, async (spawn, pause) => {
                        spawn('blue', 'left', 4);
                        await pause(450);
                        spawn('blue', 'right', 4);
                        await pause(450);
                        spawn('blue', 'left', 4);
                        await pause(450);
                        spawn('blue', 'right', 4);
                        await pause(450);
                        spawn('blue', 'left', 4);
                        await pause(450);
                        spawn('blue', 'left', 4);
                        await pause(450);
                        spawn('blue', 'right', 4);
                        await pause(450);
                        spawn('blue', 'right', 4);
                        await pause(450);
                        spawn('blue', 'left', 4);
                        await pause(450);
                        spawn('green', 'up', 4);
                        spawn('green', 'down', 4);
                     });
                     break;
                  case 6:
                     await undStandard(swing);
                     break;
                  case 7:
                     await undStandard(swing);
                     break;
               }
               break;
            }
            case 3: {
               switch (turns) {
                  case 0:
                     await undSequence(swing, async (spawn, pause) => {
                        spawn('blue', 'up', 3);
                        await pause(450);
                        spawn('blue', 'right', 3);
                        await pause(450);
                        spawn('blue', 'right', 3);
                        await pause(450);
                        spawn('blue', 'up', 3);
                        await pause(450);
                        spawn('green', 'right', 3);
                        await pause(450);
                        spawn('purple', 'left', 3);
                        await pause(450);
                        spawn('blue', 'right', 3);
                     });
                     break;
                  case 1:
                     await undSequence(swing, async (spawn, pause) => {
                        spawn('blue', 'up', 3);
                        await pause(450);
                        spawn('blue', 'left', 3);
                        await pause(650);
                        spawn('blue', 'down', 3);
                        await pause(450);
                        spawn('blue', 'left', 3);
                        await pause(950);
                        spawn('green', 'right', 5);
                        await pause(350);
                        spawn('green', 'left', 5);
                        await pause(350);
                        spawn('green', 'right', 5);
                     });
                     break;
                  case 2:
                     await undSequence(swing, async (spawn, pause) => {
                        spawn('blue', 'left', 4);
                        spawn('green', 'right', 4);
                        await pause(650);
                        spawn('blue', 'right', 4);
                        spawn('green', 'left', 4);
                        await pause(650);
                        spawn('blue', 'left', 4);
                        spawn('green', 'right', 4);
                        await pause(650);
                        spawn('blue', 'right', 4);
                        spawn('green', 'left', 4);
                        await pause(650);
                        spawn('blue', 'left', 4);
                        spawn('green', 'right', 4);
                        await pause(650);
                        spawn('blue', 'right', 4);
                        spawn('green', 'left', 4);
                     });
                     break;
                  case 3:
                     await undSequence(swing, async (spawn, pause) => {
                        spawn('green', 'up', 3);
                        spawn('green', 'down', 3);
                        await pause(850);
                        spawn('green', 'left', 3);
                        spawn('green', 'right', 3);
                        await pause(1550);
                        spawn('blue', 'up', 3);
                        await pause(450);
                        spawn('blue', 'right', 3);
                        await pause(450);
                        spawn('blue', 'down', 3);
                        await pause(450);
                        spawn('blue', 'right', 3);
                        await pause(450);
                        spawn('blue', 'down', 3);
                        await pause(450);
                        spawn('blue', 'left', 3);
                        await pause(450);
                        spawn('green', 'left', 3);
                     });
                     break;
                  case 4:
                     await undSequence(swing, async (spawn, pause) => {
                        spawn('green', 'right', 3);
                        spawn('green', 'down', 3);
                        spawn('green', 'left', 3);
                        await pause(1450);
                        spawn('green', 'up', 3);
                        spawn('green', 'left', 3);
                        spawn('green', 'down', 3);
                        await pause(1450);
                        spawn('green', 'up', 3);
                        spawn('green', 'left', 3);
                        spawn('green', 'right', 3);
                        await pause(1450);
                        spawn('green', 'up', 3);
                        spawn('green', 'right', 3);
                        spawn('green', 'down', 3);
                     });
                     break;
                  case 5:
                     await undSequence(swing, async (spawn, pause) => {
                        spawn('green', 'right', 3);
                        spawn('green', 'down', 3);
                        await pause(850);
                        spawn('green', 'up', 3);
                        spawn('green', 'left', 3);
                        await pause(850);
                        spawn('blue', 'left', 4);
                        await pause(350);
                        spawn('blue', 'right', 4);
                        await pause(350);
                        spawn('blue', 'left', 4);
                        await pause(350);
                        spawn('blue', 'right', 4);
                        await pause(350);
                        spawn('blue', 'left', 4);
                     });
                     break;
                  case 6:
                     await undSequence(swing, async (spawn, pause) => {
                        spawn('blue', 'up', 0.75);
                        await pause(850);
                        spawn('blue', 'left', 5);
                        await pause(450);
                        spawn('blue', 'right', 5);
                        await pause(450);
                        spawn('blue', 'right', 5);
                        await pause(450);
                        spawn('blue', 'down', 5);
                        await pause(450);
                        spawn('blue', 'right', 5);
                        await pause(450);
                        spawn('blue', 'left', 5);
                        await pause(750);
                        spawn('green', 'left', 4);
                        await pause(450);
                        spawn('green', 'right', 4);
                     });
                     break;
                  case 7:
                     await undSequence(swing, async (spawn, pause) => {
                        spawn('blue', 'up', 4);
                        await pause(650);
                        spawn('blue', 'right', 4);
                        await pause(650);
                        spawn('blue', 'down', 4);
                        await pause(650);
                        spawn('blue', 'left', 4);
                        await pause(650);
                        spawn('blue', 'up', 4);
                        await pause(450);
                        spawn('blue', 'right', 4);
                        await pause(450);
                        spawn('blue', 'down', 4);
                        await pause(450);
                        spawn('blue', 'left', 4);
                        await pause(450);
                        spawn('blue', 'up', 4);
                        await pause(350);
                        spawn('blue', 'right', 4);
                        await pause(350);
                        spawn('blue', 'down', 4);
                        await pause(350);
                        spawn('blue', 'left', 4);
                        await pause(350);
                        spawn('blue', 'up', 4);
                        await pause(300);
                        spawn('blue', 'right', 4);
                        await pause(300);
                        spawn('blue', 'down', 4);
                        await pause(300);
                        spawn('blue', 'left', 4);
                        await pause(300);
                        spawn('blue', 'up', 4);
                        await pause(300);
                        spawn('blue', 'right', 4);
                        await pause(300);
                        spawn('blue', 'down', 4);
                        await pause(300);
                        spawn('blue', 'left', 4);
                        await pause(300);
                        spawn('blue', 'up', 4);
                        await pause(300);
                        spawn('blue', 'right', 4);
                        await pause(300);
                        spawn('blue', 'down', 4);
                        await pause(300);
                        spawn('blue', 'left', 4);
                        await pause(300);
                        spawn('blue', 'up', 4);
                        spawn('green', 'left', 4);
                        await pause(450);
                        spawn('blue', 'down', 4);
                        spawn('green', 'left', 4);
                        await pause(450);
                        spawn('blue', 'up', 4);
                        spawn('green', 'right', 4);
                        await pause(450);
                        spawn('blue', 'down', 4);
                        spawn('green', 'right', 4);
                        await pause(750);
                        spawn('blue', 'up', 2);
                     });
                     break;
                  case 8:
                     await undStandard(swing);
                     break;
                  case 9:
                     await undStandard(swing);
                     break;
               }
               break;
            }
            case 4: {
               await undStandard(swing);
               break;
            }
         }
      }
   }
};

export default patterns;

CosmosUtils.status(`LOAD MODULE: FOUNDRY PATTERNS (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
