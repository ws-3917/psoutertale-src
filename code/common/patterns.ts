import { content, context, soundRouter, sounds } from '../systems/assets';
import { events, game, keys, renderer, rng } from '../systems/core';
import { battler, box, quickshadow, shake, sineWaver, world } from '../systems/framework';
import { SAVE } from '../systems/save';
import {
   CosmosAnimation,
   CosmosBaseEvents,
   CosmosDaemon,
   CosmosDirection,
   CosmosFace,
   CosmosHitbox,
   CosmosImageUtils,
   CosmosInstance,
   CosmosKeyboardInput,
   CosmosMath,
   CosmosObject,
   CosmosPoint,
   CosmosPointSimple,
   CosmosRectangle,
   CosmosSprite,
   CosmosUtils,
   CosmosValue
} from '../systems/storyteller';
import { helmetdyne, helmetdyneAttack } from './extras';

export type ShootableEvents = CosmosBaseEvents & { shot: [number, number] };
export type UndA = (time: number) => Promise<void>;
export type UndB = typeof undSpear;
export type UndQ = [keyof typeof undPatterns, number][];
export type UndR = Promise<UndQ>;

export const tabla = { hp: NaN };

export const bwsp = (x: number) => CosmosMath.remap(x, 0, 1, box.x1, box.x2);
export const bhsp = (y: number) => CosmosMath.remap(y, 0, 1, box.y1, box.y2);

export function standardPos (basedbox = false) {
   battler.SOUL.position.set(basedbox ? battler.box : 160);
   battler.SOUL.alpha.value = 1;
}

export function standardSize (size = { x: 100, y: 65 }, basedbox = false) {
   return Promise.all([
      battler.box.size.modulate(renderer, 300, size),
      basedbox ? battler.box.position.modulate(renderer, 300, { x: 160, y: 192.5 - size.y / 2 }) : void 0
   ]);
}

export async function brez (x: number, y: number, sp = true) {
   await standardSize({ x, y }, true);
   if (sp) {
      standardPos(true);
      game.movement = true;
   }
}

export function resetBox (basedbox = false) {
   battler.SOUL.alpha.value = 0;
   return standardSize({ x: 282.5, y: 65 }, basedbox);
}

export function starGenerator (radius: number, extent: number, spokes: number, angle: number, offset = 0) {
   const phase = ((angle % 360) + 360) % 360;
   const segments = spokes * 2;
   const segmentDiv = 360 / segments;
   const segment = Math.floor(phase / segmentDiv);
   const segmentAngle = offset - 90 + segment * segmentDiv;
   const segmentStart = CosmosMath.ray(segmentAngle, radius + (segment % 2 === 0 ? extent : 0));
   const segmentEnd = CosmosMath.ray(segmentAngle + segmentDiv, radius + (segment % 2 === 0 ? 0 : extent));
   const segmentPhase = (phase % segmentDiv) / segmentDiv;
   return new CosmosPoint(
      CosmosMath.remap(segmentPhase, segmentStart.x, segmentEnd.x),
      CosmosMath.remap(segmentPhase, segmentStart.y, segmentEnd.y)
   );
}

/** sides: 0 = top, 1 = right, 2 = bottom, 3 = left */
export function pastBox (distance: number, side = rng.attack.int(3), phase = rng.attack.next()) {
   const even = side % 2 === 0;
   return {
      side,
      position: battler.box.position[side === 1 || side === 2 ? 'add' : 'subtract'](
         even ? battler.box.size.x * phase - battler.box.size.x / 2 : battler.box.size.x / 2 + distance,
         even ? battler.box.size.y / 2 + distance : battler.box.size.y * phase - battler.box.size.y / 2
      ),
      vector: { x: even ? 0 : side === 1 ? 1 : -1, y: even ? (side === 0 ? -1 : 1) : 0 }
   };
}

export function bulletSetup<A extends CosmosObject> (
   bullet: A,
   over = false as boolean | CosmosObject,
   detector: CosmosObject | null = bullet
) {
   const { promise, resolve } = CosmosUtils.hyperpromise();
   const handler = (hitbox: CosmosHitbox) => {
      if (hitbox === detector) {
         state.hit = true;
         resolve();
      }
   };
   events.on('hurt', handler);
   events.on('heal', handler);
   const state = {
      bullet,
      detach: resolve,
      detached: promise.then(() => {
         events.off('hurt', handler);
         events.off('heal', handler);
         over === true ? renderer.detach('menu', bullet) : (over || battler.bullets).detach(bullet);
      }),
      hit: false
   };
   over === true ? renderer.attach('menu', bullet) : (over || battler.bullets).attach(bullet);
   return state;
}

export async function bulletSequence (
   gen: (
      detachers: (() => void)[],
      state: { b: boolean; p: Promise<void> },
      snd: (i: CosmosInstance) => CosmosInstance
   ) => Promise<void>
) {
   const detachers = [] as (() => void)[];
   const state = {
      b: true,
      p: events.on('turn-timer').then(() => {
         state.b = false;
         for (const detach of detachers) {
            detach();
         }
      })
   };
   while (state.b) {
      await gen(detachers, state, i => {
         detachers.push(() => i.stop());
         return i;
      });
   }
}

export function screenCheck (object: CosmosPointSimple, distance: number) {
   return object.x < -distance || object.x > 320 + distance || object.y < -distance || object.y > 240 + distance;
}

export function boxCheck (object: CosmosPointSimple, distance: number) {
   return (
      object.x < battler.box.position.x - battler.box.size.x / 2 - distance ||
      object.x > battler.box.position.x + battler.box.size.x / 2 + distance ||
      object.y < battler.box.position.y - battler.box.size.y / 2 - distance ||
      object.y > battler.box.position.y + battler.box.size.y / 2 + distance
   );
}

export function pastScreen (distance: number, side = rng.attack.int(4), phase = rng.attack.next()) {
   const even = side % 2 === 0;
   return {
      side,
      position: new CosmosPoint(160, 120)[side === 1 || side === 2 ? 'add' : 'subtract'](
         even ? 320 * phase - 320 / 2 : 320 / 2 + distance,
         even ? 240 / 2 + distance : 240 * phase - 240 / 2
      ),
      vector: { x: even ? 0 : side === 1 ? 1 : -1, y: even ? (side === 0 ? -1 : 1) : 0 }
   };
}

export function explosionPower (dom: CosmosObject) {
   for (const sub of battler.bullets.objects) {
      if (sub.metadata.moon) {
         sub.velocity.set(
            sub.velocity.endpoint(Math.round(dom.position.angleTo(sub)), 10 / (dom.position.extentOf(sub) / 4))
         );
      }
   }
   for (const sub of renderer.layers.menu.objects) {
      if (sub.metadata.pyExplodable) {
         const dist = dom.position.extentOf(sub);
         if (dist < 40) {
            sub.metadata.pyExplodable = false;
            const angle = Math.round(dom.position.angleTo(sub));
            const ex = CosmosMath.ray(angle, 1);
            sub.velocity.set(new CosmosPoint(ex).multiply(25 / (dist / 3)));
            sub.spin.value += ex.y < 0 ? -2 - ex.x * 10 : 2 + ex.x * 10;
            sub.velocity.extent < 4 && (sub.velocity.extent = 4);
         }
      }
   }
}

export const undState = {
   time: 0,
   belltimer: 0,
   spawned: [] as { sprite: CosmosSprite; time: number }[],
   cooldown: false
};

export const undDirs = [ 'up', 'left', 'right', 'down' ] as CosmosDirection[];

export const undColors = { blue: 0, yellow: 2, purple: 3, green: 4 };

export const undCage = new CosmosSprite({
   alpha: 0,
   scale: 0.5,
   anchor: 0,
   frames: [ content.ibcUndyneCage ],
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
   this.position.set(battler.box.position);
});

export function undUpdateSpawns () {
   undState.spawned.sort((spawnee1, spawnee2) => spawnee1.time - spawnee2.time);
   for (const [ index, { sprite } ] of undState.spawned.entries()) {
      if (index === 0) {
         sprite.index = 1;
      } else {
         sprite.index = 0;
      }
   }
}

export async function undSpear (
   color: keyof typeof undColors,
   direction = 'up' as CosmosDirection,
   speed: number,
   damage = 5,
   {
      circular = true,
      cage = undCage,
      x = 160,
      l = null as CosmosObject | null,
      dogtrigger = { value: null as (() => void) | null },
      vars = battler.volatile[0].vars,
      p = null as Promise<any> | null
   } = {}
) {
   const vector = new CosmosPoint(
      [ 'up', 'down' ].includes(direction)
         ? { x: 0, y: direction === 'up' ? -1 : 1 }
         : { x: direction === 'left' ? -1 : 1, y: 0 }
   );
   const center = { x, y: 120 };
   const spawnPosition = new CosmosPoint(160).multiply(vector).add(center);
   const distanceToCenter = spawnPosition.extentOf(center);
   return new Promise<boolean>(resolve => {
      let done = false;
      const sprite = new CosmosAnimation({
         scale: 1 / 2,
         index: undColors[color],
         anchor: { x: 1, y: 0 },
         rotation: { up: 90, left: 0, right: 180, down: 270 }[direction] + (color === 'yellow' ? 180 : 0),
         resources: content.ibbArrow,
         position: spawnPosition,
         velocity: new CosmosPoint(vector).multiply(-speed),
         metadata: { stage: 0, active: color !== 'yellow', trig1: false, trig2: false, cooked: false },
         priority: 3
      }).on('tick', async function () {
         if (this.metadata.cooked) {
            return;
         }
         const DESTIE = this.position.extentOf(center);
         switch (color) {
            case 'green':
               if (this.metadata.stage === 0) {
                  if (DESTIE < 96) {
                     this.metadata.stage = 1;
                     await this.alpha.modulate(renderer, 200, 0);
                     this.index = 5;
                     this.metadata.stage = 2;
                  }
               } else if (this.metadata.stage === 2) {
                  const s = quickshadow(
                     sprite,
                     sprite,
                     'menu',
                     CosmosMath.remap_clamped(DESTIE, 0, 0.4, 96, 28),
                     1.5,
                     0.001,
                     () => this.metadata.cooked === true
                  );
                  s.priority.value = 2;
               } else if (this.metadata.stage === 3) {
                  if (DESTIE > 48) {
                     this.metadata.stage = 4;
                     this.index = 4;
                     this.alpha.value = 0;
                     renderer.post().then(() => {
                        renderer.detach('menu', this);
                     });
                     done = true;
                     resolve(true);
                  } else {
                     const s = quickshadow(
                        sprite,
                        sprite,
                        'menu',
                        CosmosMath.remap_clamped(DESTIE, 0, 0.4, 48, 14),
                        1.5,
                        0.001,
                        () => this.metadata.cooked === true
                     );
                     s.priority.value = 2;
                  }
               }
               break;
            case 'purple':
               this.metadata.active = true;
               if (this.metadata.stage === 0) {
                  if (DESTIE < 72) {
                     this.metadata.stage = 1;
                     const ideal = this.velocity.clone();
                     const disappear = this.position.value();
                     const OMGItsAPortal = new CosmosAnimation({
                        active: true,
                        rotation: this.rotation.value,
                        position: disappear,
                        anchor: { x: 1, y: 0 },
                        priority: 20,
                        scale: 0.5,
                        resources: content.ibbArrowportal
                     });
                     this.velocity.set(0);
                     renderer.attach('menu', OMGItsAPortal);
                     // portalSpeed animation speed is obsolete, but attacks are still timed around it
                     // so, use portalSpeed for timing, but ideal.extent for animation
                     const portalSpeed = vector.multiply(-1).extent;
                     const legacyTimer = (async () => {
                        let time = 0;
                        while ((time += portalSpeed) < 25) {
                           await this.on('tick');
                        }
                        await renderer.pause(3000 / speed);
                     })();
                     while ((this.subcrop.left += ideal.extent) < 25) {
                        await this.on('tick');
                     }
                     this.alpha.value = 0;
                     this.subcrop.right = 0;
                     OMGItsAPortal.alpha.value = 0;
                     await legacyTimer;
                     this.index = 6;
                     OMGItsAPortal.rotation.value += 180;
                     OMGItsAPortal.alpha.value = 1;
                     this.velocity.set(ideal.divide(2));
                     this.subcrop.left = 25;
                     this.alpha.value = 1;
                     while ((this.subcrop.left -= ideal.extent) > 0) {
                        await this.on('tick');
                     }
                     this.subcrop.left = 0;
                     renderer.detach('menu', OMGItsAPortal);
                     this.velocity.set(ideal);
                  }
               }
               break;
            case 'yellow':
               if (this.metadata.stage === 0) {
                  if (DESTIE < 40) {
                     this.metadata.stage = 1;
                     const ideal = this.velocity.multiply(-1);
                     this.velocity.set(0, 0);
                     const p = 0.8;
                     const exd = DESTIE / p - DESTIE;
                     const end = this.position.shift(180, exd, battler.SOUL.position);
                     const mid = this.position
                        .add(end)
                        .divide(2)
                        .endpoint(this.position.angleTo(battler.SOUL.position) - 90, (DESTIE * 2 + exd) * p);
                     await this.position.modulate(renderer, 400, mid, end);
                     this.velocity.set(ideal);
                     this.metadata.active = true;
                  }
               }
               break;
         }
         if (this.metadata.active) {
            if (!this.metadata.trig1) {
               if (
                  (color === 'yellow'
                     ? spawnPosition.extentOf(this) < distanceToCenter + 14
                     : spawnPosition.extentOf(this) > distanceToCenter - 14) &&
                  (circular || Math.abs(x - cage.position.x) < 13)
               ) {
                  this.metadata.trig1 = true;
                  if (
                     vars.shield ===
                     (color === 'yellow'
                        ? { up: 'down', down: 'up', left: 'right', right: 'left' }[direction]
                        : direction)
                  ) {
                     (cage.objects[0] as CosmosSprite).index = 1;
                     undState.belltimer = 3;
                     this.metadata.cooked = true;
                     if (color === 'green') {
                        this.velocity.set(0);
                        this.anchor.x = 0;
                        this.position.set(this.position.add(vector.multiply(this.compute().divide(2))));
                        if (dogtrigger.value) {
                           dogtrigger.value();
                           this.alpha.value = 1;
                           await Promise.all([
                              this.alpha.modulate(renderer, 500, 0),
                              this.scale.modulate(renderer, 500, 2)
                           ]);
                        } else {
                           this.alpha.value = 0.75;
                           this.alpha.modulate(renderer, 200, 0, 0);
                           this.scale.modulate(renderer, 200, { x: 2.5, y: 2.5 }, { x: 2.5, y: 2.5 });
                           sounds.bomb.instance(renderer);
                           battler.invulnerable === 0 && battler.damage(battler.bonus_var(damage));
                           await renderer.pause(200);
                        }
                        renderer.post().then(() => {
                           renderer.detach('menu', this);
                        });
                        done = true;
                        resolve(false);
                     } else {
                        sounds.bell.instance(renderer);
                        this.alpha.value = 0;
                        renderer.post().then(() => {
                           renderer.detach('menu', this);
                        });
                        if (color === 'blue') {
                           undState.spawned.shift();
                           undUpdateSpawns();
                        }
                        done = true;
                        resolve(true);
                     }
                  }
               }
            }
            const missDistance = circular || Math.abs(x - battler.SOUL.position.x) < 4 ? 4 : 2;
            if (!this.metadata.trig2) {
               if (
                  color === 'yellow'
                     ? spawnPosition.extentOf(this) < distanceToCenter + missDistance
                     : spawnPosition.extentOf(this) > distanceToCenter - missDistance
               ) {
                  this.metadata.trig2 = true;
                  if (color === 'green') {
                     this.metadata.stage = 3;
                  } else {
                     this.metadata.cooked = true;
                     if (dogtrigger.value) {
                        this.velocity.set(0);
                        this.anchor.x = 0;
                        this.position.set(this.position.add(vector.multiply(this.compute().divide(2))));
                        dogtrigger.value();
                        if (color === 'blue') {
                           undState.spawned.shift();
                           undUpdateSpawns();
                        }
                        await Promise.all([
                           this.alpha.modulate(renderer, 500, 0),
                           this.scale.modulate(renderer, 500, 2)
                        ]);
                     } else {
                        battler.invulnerable === 0 && battler.damage(battler.bonus_var(damage));
                        if (l) {
                           l.alpha.value = 1;
                           l.alpha.modulate(renderer, 300, 0.1);
                           sounds.smallelectroshock.instance(renderer, 0.28);
                        }
                        if (color === 'blue') {
                           undState.spawned.shift();
                           undUpdateSpawns();
                        }
                     }
                     renderer.post().then(() => {
                        renderer.detach('menu', this);
                     });
                     done = true;
                     resolve(false);
                  }
               }
            }
         }
      });
      if (color === 'blue') {
         undState.spawned.push({ sprite, time: undState.time + 145 / speed });
         undUpdateSpawns();
      }
      renderer.attach('menu', sprite);
      p?.then(() => {
         if (!done) {
            done = true;
            sprite.metadata.cooked = true;
            renderer.post().then(() => {
               renderer.detach('menu', sprite);
            });
            if (color === 'blue') {
               undState.spawned.shift();
               undUpdateSpawns();
            }
            resolve(true);
         }
      });
   });
}

export const undTicker = () => {
   undState.time += 1;
   battler.volatile[0].container.tint = CosmosImageUtils.gradient(0, 0xffffff, battler.alpha.value);
};

export const undKeyHandler = (cage: CosmosObject, vars = battler.volatile[0].vars) =>
   async function (this: CosmosKeyboardInput) {
      if (!undState.cooldown) {
         const curDur = vars.shield;
         if (curDur) {
            let newDir: CosmosDirection;
            switch (this) {
               case keys.upKey:
                  newDir = 'up';
                  break;
               case keys.leftKey:
                  newDir = 'left';
                  break;
               case keys.rightKey:
                  newDir = 'right';
                  break;
               default:
                  newDir = 'down';
                  break;
            }
            if (curDur !== newDir) {
               undState.cooldown = true;
               const fr = cage.objects[0].rotation.value;
               const to = { up: 270, left: 180, right: 0, down: 90 }[newDir];
               const di = [ to - fr, to + 360 - fr, to - 360 - fr, to + 720 - fr, to - 720 - fr ].sort(
                  (a, b) => Math.abs(a) - Math.abs(b)
               )[0];
               const rotspeed = CosmosMath.remap(battler.stat.speed.compute(), 25, 0, 2, 3);
               await cage.objects[0].rotation.modulate(renderer, rotspeed, fr + di / 2);
               vars.shield = newDir;
               await cage.objects[0].rotation.modulate(renderer, rotspeed, fr + di);
               cage.objects[0].rotation.value = to;
               undState.cooldown = false;
            }
         }
      }
   };

export async function undBoxTo (x: number, y: number, p = true) {
   await Promise.all([
      battler.box.size.modulate(renderer, 300, { x, y }),
      battler.box.position.modulate(renderer, 300, { y: 192.5 - y / 2 })
   ]);
   if (p) {
      battler.SOUL.position.set(battler.box.position);
      game.movement = true;
   }
   battler.SOUL.alpha.value = 1;
}

export async function undBoxRe (swing: boolean) {
   battler.box.size.y > 100 && (await undBoxTo(battler.box.size.x, 65, false));
   if (swing) {
      await renderer.pause(250);
      const vola = battler.volatile[0];
      vola.vars.armswing = true;
      await renderer.when(() => vola.vars.armswing === false);
      if (world.genocide || vola.vars.phase === 5) {
         battler.flee = false;
      }
   }
   game.movement = false;
   battler.SOUL.alpha.value = 0;
   await Promise.all([
      battler.box.size.modulate(renderer, 300, { x: 282.5, y: 65 }),
      battler.box.position.modulate(renderer, 300, { y: 160 })
   ]);
}

export function undPicker<A extends CosmosDirection | number> (...options: A[]): A {
   return options[rng.attack.int(options.length)];
}

export const undDamage = (difficulty: number) =>
   helmetdyne() ? 7 : world.genocide ? 8 : 1 + Math.round(difficulty * 5);

export const undPatterns = {
   async b (pause: UndA, spawn: UndB, difficulty: number): UndR {
      spawn('blue', undPicker('up', 'down', 'left', 'right'), undPicker(4, 4, 4, 4.25, 4.25), undDamage(difficulty));
      await pause(undPicker(350, 450, 450, 450));
      return [
         ...((helmetdyneAttack()
            ? [
                 [ 'b', 2 ],
                 [ 'y', 1 ]
              ]
            : [ [ 'b', 3 ] ]) as UndQ),
         [ 'bSU', 1 ],
         [ 'bSD', 1 ],
         [ 'bSR', 1 ],
         [ 'bSL', 1 ],
         [ 'bpbb', CosmosMath.remap(difficulty, 1, 2) ],
         [ 'bppbb', CosmosMath.remap(difficulty, 1, 2) ],
         [ 'gH', 1 ],
         [ 'gV', 1 ]
      ];
   },
   async bSU (pause: UndA, spawn: UndB, difficulty: number): UndR {
      spawn('blue', 'up', undPicker(4, 4, 4, 4.25, 4.25), undDamage(difficulty));
      await pause(undPicker(350, 450, 450, 450));
      return [
         [ 'b', CosmosMath.remap(difficulty, 3, 5) ],
         [ 'bSU', CosmosMath.remap(difficulty, 3, 1) ],
         [ 'bSR', 6 ],
         [ 'bSL', 6 ]
      ];
   },
   async bSR (pause: UndA, spawn: UndB, difficulty: number): UndR {
      spawn('blue', 'right', undPicker(4, 4, 4, 4.25, 4.25), undDamage(difficulty));
      await pause(undPicker(350, 450, 450, 450));
      return [
         [ 'b', CosmosMath.remap(difficulty, 3, 5) ],
         [ 'bSR', CosmosMath.remap(difficulty, 3, 1) ],
         [ 'bSU', 6 ],
         [ 'bSD', 6 ]
      ];
   },
   async bSL (pause: UndA, spawn: UndB, difficulty: number): UndR {
      spawn('blue', 'left', undPicker(4, 4, 4, 4.25, 4.25), undDamage(difficulty));
      await pause(undPicker(350, 450, 450, 450));
      return [
         [ 'b', CosmosMath.remap(difficulty, 3, 5) ],
         [ 'bSL', CosmosMath.remap(difficulty, 3, 1) ],
         [ 'bSU', 6 ],
         [ 'bSD', 6 ]
      ];
   },
   async bSD (pause: UndA, spawn: UndB, difficulty: number): UndR {
      spawn('blue', 'down', undPicker(4, 4, 4, 4.25, 4.25), undDamage(difficulty));
      await pause(undPicker(350, 450, 450, 450));
      return [
         [ 'b', CosmosMath.remap(difficulty, 3, 5) ],
         [ 'bSD', CosmosMath.remap(difficulty, 3, 1) ],
         [ 'bSL', 6 ],
         [ 'bSR', 6 ]
      ];
   },
   async y (pause: UndA, spawn: UndB, difficulty: number): UndR {
      spawn('yellow', undPicker('up', 'down', 'left', 'right'), undPicker(4, 4, 4, 4.25, 4.25), undDamage(difficulty));
      await pause(undPicker(750, 850, 850, 850));
      return [
         [ 'y', 2 ],
         [ 'ySU', 1 ],
         [ 'ySD', 1 ],
         [ 'ySR', 1 ],
         [ 'ySL', 1 ],
         [ 'y2gH', 1 ],
         [ 'y2gV', 1 ],
         [ 'b', 1 ]
      ];
   },
   async ySU (pause: UndA, spawn: UndB, difficulty: number): UndR {
      spawn('yellow', 'up', undPicker(4, 4, 4, 4.25, 4.25), undDamage(difficulty));
      await pause(undPicker(650, 750, 750, 750));
      return [
         [ 'y', CosmosMath.remap(difficulty, 3, 5) ],
         [ 'ySU', CosmosMath.remap(difficulty, 2, 1) ],
         [ 'ySR', 5 ],
         [ 'ySL', 5 ]
      ];
   },
   async ySR (pause: UndA, spawn: UndB, difficulty: number): UndR {
      spawn('yellow', 'right', undPicker(4, 4, 4, 4.25, 4.25), undDamage(difficulty));
      await pause(undPicker(650, 750, 750, 750));
      return [
         [ 'y', CosmosMath.remap(difficulty, 3, 5) ],
         [ 'ySR', CosmosMath.remap(difficulty, 2, 1) ],
         [ 'ySU', 5 ],
         [ 'ySD', 5 ]
      ];
   },
   async ySL (pause: UndA, spawn: UndB, difficulty: number): UndR {
      spawn('yellow', 'left', undPicker(4, 4, 4, 4.25, 4.25), undDamage(difficulty));
      await pause(undPicker(650, 750, 750, 750));
      return [
         [ 'y', CosmosMath.remap(difficulty, 3, 5) ],
         [ 'ySL', CosmosMath.remap(difficulty, 2, 1) ],
         [ 'ySU', 5 ],
         [ 'ySD', 5 ]
      ];
   },
   async ySD (pause: UndA, spawn: UndB, difficulty: number): UndR {
      spawn('yellow', 'down', undPicker(4, 4, 4, 4.25, 4.25), undDamage(difficulty));
      await pause(undPicker(650, 750, 750, 750));
      return [
         [ 'y', CosmosMath.remap(difficulty, 3, 5) ],
         [ 'ySD', CosmosMath.remap(difficulty, 2, 1) ],
         [ 'ySL', 5 ],
         [ 'ySR', 5 ]
      ];
   },
   async bpbb (pause: UndA, spawn: UndB, difficulty: number): UndR {
      const bluedirs = [ 'up', 'down', 'left', 'right' ] as CosmosDirection[];
      const purpdir = undPicker(...bluedirs);
      bluedirs.splice(bluedirs.indexOf(purpdir), 1);
      spawn('purple', purpdir, 4, undDamage(difficulty));
      spawn('blue', undPicker(...bluedirs), 4, undDamage(difficulty));
      await pause(undPicker(450, 450, 450, 450, 350));
      spawn('blue', undPicker('up', 'down', 'left', 'right'), undPicker(4, 4, 4, 4.25, 4.25), undDamage(difficulty));
      await pause(undPicker(350, 350, 350, 350, 450));
      spawn('blue', undPicker('up', 'down', 'left', 'right'), undPicker(4, 4, 4, 4.25, 4.25), undDamage(difficulty));
      await pause(undPicker(350, 350, 350, 350, 450));
      spawn('blue', undPicker('up', 'down', 'left', 'right'), undPicker(4, 4, 4, 4.25, 4.25), undDamage(difficulty));
      await pause(1550);
      return [
         ...((helmetdyneAttack()
            ? [
                 [ 'b', 9 * (2 / 3) ],
                 [ 'y', 9 * (1 / 3) ]
              ]
            : [ [ 'b', 9 ] ]) as UndQ),
         [ 'gH', CosmosMath.remap(difficulty, 1, 3) ],
         [ 'gV', CosmosMath.remap(difficulty, 1, 3) ]
      ];
   },
   async bppbb (pause: UndA, spawn: UndB, difficulty: number): UndR {
      const bluedirs1 = [ 'up', 'down', 'left', 'right' ] as CosmosDirection[];
      const purpdir1 = undPicker(...bluedirs1);
      bluedirs1.splice(bluedirs1.indexOf(purpdir1), 1);
      spawn('purple', purpdir1, 4, undDamage(difficulty));
      spawn('blue', undPicker(...bluedirs1), 4, undDamage(difficulty));
      await pause(undPicker(450, 450, 450, 450, 350));
      const bluedirs2 = [ 'up', 'down', 'left', 'right' ] as CosmosDirection[];
      const purpdir2 = undPicker(...bluedirs2);
      bluedirs2.splice(bluedirs2.indexOf(purpdir2), 1);
      spawn('purple', purpdir2, 4, undDamage(difficulty));
      spawn('blue', undPicker(...bluedirs2), 4, undDamage(difficulty));
      await pause(undPicker(450, 450, 450, 450, 350));
      spawn('blue', undPicker('up', 'down', 'left', 'right'), undPicker(4, 4, 4, 4.25, 4.25), undDamage(difficulty));
      await pause(undPicker(350, 350, 350, 350, 450));
      spawn('blue', undPicker('up', 'down', 'left', 'right'), undPicker(4, 4, 4, 4.25, 4.25), undDamage(difficulty));
      await pause(1750);
      return [
         ...((helmetdyneAttack()
            ? [
                 [ 'b', 9 * (2 / 3) ],
                 [ 'y', 9 * (1 / 3) ]
              ]
            : [ [ 'b', 9 ] ]) as UndQ),
         [ 'gH', CosmosMath.remap(difficulty, 1, 3) ],
         [ 'gV', CosmosMath.remap(difficulty, 1, 3) ]
      ];
   },
   async gH (pause: UndA, spawn: UndB, difficulty: number): UndR {
      spawn('green', undPicker('left', 'right'), 4, undDamage(difficulty));
      await pause(undPicker(350, 450, 450, 450));
      return [
         [ 'gH', CosmosMath.remap(difficulty, 6, 1) ],
         [ 'gV', CosmosMath.remap(difficulty, 1, 6) ],
         ...((helmetdyneAttack()
            ? [
                 [ 'g2b', 4 * (2 / 3) ],
                 [ 'g2y', 4 * (1 / 3) ]
              ]
            : [ [ 'g2b', 4 ] ]) as UndQ)
      ];
   },
   async gV (pause: UndA, spawn: UndB, difficulty: number): UndR {
      spawn('green', undPicker('up', 'down'), 4, undDamage(difficulty));
      await pause(undPicker(350, 450, 450, 450));
      return [
         [ 'gV', CosmosMath.remap(difficulty, 6, 1) ],
         [ 'gH', CosmosMath.remap(difficulty, 1, 6) ],
         ...((helmetdyneAttack()
            ? [
                 [ 'g2b', 3 ],
                 [ 'g2y', 1 ]
              ]
            : [ [ 'g2b', 4 ] ]) as UndQ)
      ];
   },
   async g2b (pause: UndA): UndR {
      await pause(850);
      return [ [ 'b', 1 ] ];
   },
   async g2y (pause: UndA): UndR {
      await pause(850);
      return [ [ 'y', 1 ] ];
   },
   async y2gH (pause: UndA): UndR {
      await pause(450);
      return [ [ 'gH', 1 ] ];
   },
   async y2gV (pause: UndA): UndR {
      await pause(450);
      return [ [ 'gV', 1 ] ];
   },
   async sl (pause: UndA, spawn: UndB, difficulty: number): UndR {
      spawn('blue', undPicker('up', 'down', 'left', 'right'), 2, undDamage(difficulty));
      await pause(undPicker(400, 400, 400, 400, 400, 400, 350, 350, 300));
      return [ [ 'sl', 1 ] ];
   },
   async fa (pause: UndA, spawn: UndB, difficulty: number): UndR {
      spawn('blue', undPicker('up', 'down', 'left', 'right'), 5.25, undDamage(difficulty));
      await pause(undPicker(500, 500, 500, 500, 500, 500, 450, 450, 400));
      return [ [ 'fa', 1 ] ];
   },
   async bH (pause: UndA, spawn: UndB, difficulty: number): UndR {
      spawn('blue', undPicker('left', 'right'), undPicker(4, 4.25, 4.25, 4.5), undDamage(difficulty));
      await pause(undPicker(350, 450, 450, 450));
      return [
         [ 'bH', CosmosMath.remap(difficulty, 8, 5) ],
         [ 'bV', CosmosMath.remap(difficulty, 1, 4) ]
      ];
   },
   async bV (pause: UndA, spawn: UndB, difficulty: number): UndR {
      spawn('blue', undPicker('up', 'down'), undPicker(4, 4.25, 4.25, 4.5), undDamage(difficulty));
      await pause(undPicker(350, 450, 450, 450));
      return [
         [ 'bV', CosmosMath.remap(difficulty, 8, 5) ],
         [ 'bH', CosmosMath.remap(difficulty, 1, 4) ]
      ];
   },
   async bF (pause: UndA, spawn: UndB, difficulty: number): UndR {
      const finalspear = spawn('blue', undPicker('up', 'down', 'left', 'right'), 1, undDamage(difficulty));
      await pause(1000);
      let i = 6;
      while (i-- > 0) {
         spawn('blue', undPicker('up', 'down', 'left', 'right'), 4.75, undDamage(difficulty));
         await pause(undPicker(500, 500, 500, 500, 500, 500, 450, 450, 400));
      }
      await finalspear;
      return [ [ 'bFX', 1 ] ];
   },
   async bFX (): UndR {
      return [ [ 'bFX', 1 ] ];
   }
};

export const undController = {
   init: [
      // hyperspeed pattern
      [ 'fa', 8 ],
      // "slow" pattern
      [ 'sl', 8 ],
      // "slow" fake-out pattern
      [ 'bF', 6 ],
      // blue vertical alternating pattern
      [ 'bV', 1 ],
      // blue horizontal alternating pattern
      [ 'bH', 2 ],
      // standard pattern
      [ 'b', 8 ],
      // standard pattern (green vertical start)
      [ 'gV', 4 ],
      // standard pattern (green horizontal start)
      [ 'gH', 2 ]
   ] as [keyof typeof undPatterns, number][],
   init_alt: [
      // standard pattern
      [ 'b', 8 * (2 / 3) ],
      // standard pattern (yellow start)
      [ 'y', 8 * (1 / 3) ],
      // standard pattern (green vertical start)
      [ 'gV', 3 ],
      // standard pattern (green horizontal start)
      [ 'gH', 1 ]
   ] as [keyof typeof undPatterns, number][],
   endb: [ 'g2b', 'g2y', 'y2gH', 'y2gV' ] as (keyof typeof undPatterns)[]
};

export async function dumPattern (
   generate: (
      d: (
         type: 'dummy' | 'charge' | 'robot' | 'knife' | 'orange' | 'blue',
         side: CosmosFace,
         from: number,
         to: number,
         count?: number,
         delay?: number,
         dud?: boolean
      ) => Promise<void>,
      p: Promise<void>[]
   ) => Promise<void>,
   otherresolver: Promise<void> | null = null,
   papyrus = false
) {
   const other = { b: false };
   const promises = [] as Promise<void>[];
   const deta = [] as (() => void)[];
   const done = () => other.b === true;
   otherresolver?.then(() => {
      other.b = true;
      for (const d of deta) {
         d();
      }
   });
   await generate(async (typename, sidename, from, to, count = 1, delay = 0, cutscene = false) => {
      if (done()) {
         return;
      }
      let index = 0;
      let arrow = false;
      while (index++ < count) {
         if (done()) {
            return;
         }
         const type = { dummy: 0, charge: 1, robot: 2, knife: 3, blue: 4, orange: 5 }[typename];
         const side = sidename === 'bottom' ? 2 : sidename === 'left' ? 3 : sidename === 'right' ? 1 : 0;
         const phas = from === to ? from : CosmosMath.remap(rng.attack.next(), from, to);
         const dist = new CosmosValue(10);
         const anim = new CosmosAnimation({
            anchor: 0,
            rotation: [ -180, -90, 0, 90 ][side],
            resources: content.ibbDummy,
            index: type === 2 ? 4 : type === 3 ? 5 : 0
         });
         const {
            detach,
            bullet: hbox,
            detached
         } = bulletSetup(
            new CosmosHitbox({
               size: { x: 15, y: 15 },
               anchor: 0,
               scale: 0.5,
               metadata: { bullet: true, damage: 5, color: 'white', yee: true, papyrus },
               position: pastBox(dist.value, side, phas).position,
               objects: [ anim ]
            }).on('tick', function () {
               if (this.metadata.yee) {
                  if (sidename === 'top' || sidename === 'bottom') {
                     this.position.y = pastBox(dist.value, side, phas).position.y;
                  } else {
                     this.position.x = pastBox(dist.value, side, phas).position.x;
                  }
               } else if (boxCheck(this, 25)) {
                  detach();
               }
            })
         );
         deta.push(detach);
         promises.push(
            (async () => {
               await dist.modulate(renderer, 450, -5, ...(type === 2 ? [] : [ -5 ]));
               if (done()) {
                  return;
               }
               if (cutscene) {
                  await renderer.when(() => battler.volatile[0].vars.dudShock);
                  anim.index = 3;
                  await renderer.when(() => battler.volatile[0].vars.dudSad);
                  anim.index = 2;
                  dist.modulate(renderer, 1250, ...(type === 2 ? [] : [ -5 ]), 10).then(() => detach());
               } else {
                  await renderer.pause(300);
                  if (done()) {
                     return;
                  }
                  if (type === 1 || type > 3) {
                     const i = type === 1 ? 1 : type === 4 ? 6 : 7;
                     const c = type === 1 ? 'white' : type === 4 ? 'blue' : 'orange';
                     anim.index = i;
                     hbox.metadata.color = c;
                     await renderer.pause(150);
                     if (done()) {
                        return;
                     }
                     anim.index = 0;
                     hbox.metadata.color = 'white';
                     await renderer.pause(150);
                     if (done()) {
                        return;
                     }
                     anim.index = i;
                     hbox.metadata.color = c;
                     hbox.gravity.set(CosmosMath.ray([ 90, 180, 270, 0 ][side], 0.3));
                     hbox.metadata.yee = false;
                     await detached;
                  } else {
                     dist.modulate(renderer, 450, ...(type === 2 ? [] : [ -5 ]), 10).then(() => detach());
                     const idealInit = hbox.position.angleTo(battler.SOUL);
                     const anim2 =
                        type === 3
                           ? new CosmosSprite({ anchor: 0, frames: [ content.ibbDummyknife ] })
                           : new CosmosAnimation({
                                active: true,
                                anchor: 0,
                                resources: type === 2 ? content.ibbMissile : content.ibbScribble
                             });
                     let s = 1.5;
                     let juice = true;
                     let willHit = true;
                     const {
                        bullet: hbox2,
                        detach: deta2,
                        detached
                     } = bulletSetup(
                        new CosmosHitbox({
                           size: type === 2 ? { x: 17, y: 11 } : type === 3 ? { x: 30, y: 4 } : { x: 15, y: 15 },
                           anchor: 0,
                           metadata: {
                              bullet: true,
                              damage: 5,
                              dummybullet: true,
                              hit: void 0 as boolean | void,
                              detach: void 0 as void | (() => void),
                              papyrus
                           },
                           position: hbox,
                           scale: 0.5,
                           objects: [ anim2 ],
                           rotation: type === 2 || type === 3 ? idealInit : 0,
                           velocity: CosmosMath.ray(idealInit, type === 2 ? 1.5 : type === 3 ? 4 : 1),
                           gravity: type === 0 ? CosmosMath.ray(idealInit, 0.03) : void 0
                        }).on('tick', function () {
                           if (type === 2) {
                              s += 0.5 / 60;
                              if (juice) {
                                 const fr = this.rotation.value;
                                 const to = this.position.angleTo(battler.SOUL);
                                 const di = [ to - fr, to + 360 - fr, to - 360 - fr, to + 720 - fr, to - 720 - fr ].sort(
                                    (a, b) => Math.abs(a) - Math.abs(b)
                                 )[0];
                                 if (Math.abs(di) > 4) {
                                    this.rotation.value = (fr + Math.min(Math.ceil(di / 10), 11)) % 360;
                                    this.velocity.set(CosmosMath.ray(this.rotation.value, Math.min(s, 2)));
                                 }
                              }
                              if (anim2.index === 9) {
                                 juice = false;
                                 anim2.disable();
                              }
                           }
                           if (screenCheck(this, 20)) {
                              willHit = false;
                              deta2();
                           } else if (type === 3) {
                              const sh = quickshadow(anim2, hbox2);
                              sh.scale.set(sh.scale.multiply(hbox2.scale));
                              sh.rotation.value = hbox2.rotation.value;
                              deta.push(() => renderer.detach('menu', sh));
                           }
                        }),
                        true
                     );
                     deta.push(deta2);
                     if (type === 3 && !arrow) {
                        arrow = true;
                        sounds.arrow.instance(renderer);
                     }
                     hbox2.metadata.detach = deta2;
                     await detached;
                     if (done() || !willHit) {
                        return;
                     }
                     hbox2.metadata.hit = true;
                     hbox2.metadata.bullet = false;
                     if (type === 2) {
                        renderer.attach('menu', anim2);
                        anim2.scale.set(hbox2.scale);
                        anim2.position.set(hbox2.position);
                        anim2.reset();
                        anim2.index = 3;
                        sounds.strike.lastPlayed === renderer.ticks || sounds.strike.instance(renderer);
                        while (true) {
                           await renderer.pause(33);
                           if (anim2.index === 0) {
                              break;
                           }
                           anim2.index--;
                        }
                        renderer.detach('menu', anim2);
                     }
                  }
               }
            })()
         );
         if (delay > 0) {
            await renderer.pause(delay);
            arrow = false;
         }
      }
   }, promises);
   await Promise.all(promises);
}

export const napCry = (reverse = false, bullet = false, trueY = 60, tt = false) => {
   const time = renderer.time;
   const baseX = battler.volatile[0].container.position.x - 2;
   let index = 0;
   while (index < 2) {
      const ao = 25; // angle arc center, offset from straight down
      const az = 45; // angle span from arc center
      const velocity = reverse
         ? new CosmosPoint(rng.attack.next() * 0.4, 0.5)
         : new CosmosPoint(CosmosMath.ray(90 + [ ao, -ao ][index] + (rng.attack.next() * az - az / 2), 6));
      const rv = velocity.multiply(0.25, 0.5);
      const rr = rng.attack.next();
      const {
         bullet: tear,
         detach,
         detached
      } = bulletSetup(
         new CosmosHitbox({
            anchor: 0,
            position: { x: baseX + index * 16 - 2, y: trueY + index * 6 - 3 },
            metadata: {
               bullet,
               damage: 1,
               detach: null as null | (() => void),
               dummybullet: true,
               finalhit: true,
               de: false
            },
            scale: 0.5,
            size: { x: 6, y: 8 },
            objects: [ new CosmosSprite({ position: { y: -1.5 }, anchor: 0, frames: [ content.ibbTear ] }) ],
            velocity: new CosmosPoint(velocity)
         }).on('tick', function () {
            if (screenCheck(this, 25)) {
               detach();
            } else {
               this.offsets[0].set(sineWaver(time, 1000, -0.5, 0.5, rr), 0);
               reverse || this.velocity.set(this.velocity.multiply(3).add(rv).divide(4));
               this.rotation.value = this.velocity.angle - 90;
            }
         }),
         true
      );
      battler.garbage.push([ 'menu', tear ]);
      tear.metadata.detach = detach;
      renderer.pause(50).then(() => {
         if (reverse) {
            const tv = { x: tear.velocity.x / 2, y: rng.attack.next() * -0.6 - 1.2 };
            tear.velocity.modulate(renderer, 2000, tv, tv);
         }
         (reverse
            ? renderer.pause(1400)
            : Promise.race([
                 renderer.when(() => tear.position.y > box.y2 - 10),
                 ...(tt ? [ events.on('turn-timer').then(() => (tear.metadata.de = true)) ] : [])
              ])
         ).then(async () => {
            if (!tear.metadata.de) {
               if (box.x1 + 2 <= tear.position.x && tear.position.x <= box.x2 - 2) {
                  tear.area = renderer.area!;
                  tear.filters = [ battler.clipFilter! ];
                  let s = true;
                  await Promise.race([
                     detached.then(() => (s = false)),
                     renderer.when(() => box.y2 <= tear.position.y)
                  ]);
                  if (!s) {
                     return;
                  }
                  detach();
                  let si = 0;
                  while (si < 4) {
                     const star = new CosmosAnimation({
                        anchor: 0,
                        velocity: CosmosMath.ray(-90 + CosmosMath.spread(60, si, 4) + Math.random() * 20 - 10, 1),
                        acceleration: 0.99,
                        scale: 0.5,
                        gravity: { y: 0.025 },
                        position: { x: tear.position.x, y: box.y2 },
                        active: true,
                        resources: content.ibbFrogstar
                     }).on('tick', function () {
                        if (this.index === 3) {
                           battler.bullets.detach(this);
                        } else {
                           this.alpha.value = (1 - this.index / 3) * 0.8;
                        }
                     });
                     battler.bullets.attach(star);
                     battler.garbage.push([ battler.bullets, star ]);
                     si++;
                  }
               } else {
                  await tear.alpha.modulate(renderer, 300, 0);
               }
               detach();
            }
         });
      });
      index++;
   }
};

export const papPattern = async (
   state: { d: boolean },
   script: (factory: (type: number, size: number, speed: number, damage?: number) => CosmosHitbox) => Promise<void>,
   papyrus = true,
   defaultDamage = 5,
   sp = 1
) => {
   const promises = [] as Promise<void>[];
   await Promise.race([
      renderer.when(() => state.d),
      script((type, size, speed, damage = defaultDamage) => {
         if (state.d) {
            return new CosmosHitbox();
         }
         const { bullet, detach, detached } = bulletSetup(
            new CosmosHitbox({
               anchor: 0,
               metadata: {
                  bullet: true,
                  damage,
                  color: [ 'white', 'blue', 'orange', 'green' ][type],
                  papyrus,
                  size,
                  alter: null,
                  doggerDetach: void 0 as (() => void) | void
               },
               size: { x: 12 },
               position: { x: battler.box.position.x + (battler.box.size.x / 2 + 7) * (speed < 0 ? -1 : 1) },
               velocity: { x: speed * sp * -1 },
               scale: 0.5,
               objects: [
                  new CosmosSprite({ frames: [ content.ibbBonesection ], anchor: 0 }),
                  new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.ibbBone }),
                  new CosmosAnimation({ anchor: { x: 0 }, resources: content.ibbBone, index: 1 })
               ],
               tint: [ 0xffffff, 0x00a2e8, 0xff993d, 0x00ff5e ][type]
            }).on('tick', function () {
               const size = Math.round(this.metadata.size * 1.2);
               this.position.y = (size < 0 ? box.y1 : box.y2) - (size + 10) / 4;
               if (state.d || boxCheck(this, 10)) {
                  detach();
               } else {
                  const trueSize = Math.abs(size);
                  this.size.y = trueSize + 5;
                  (this.objects[0] as CosmosSprite).scale.y = trueSize;
                  this.objects[1].position.y = trueSize / -2;
                  this.objects[2].position.y = trueSize / 2;
               }
            })
         );
         promises.push(detached);
         bullet.metadata.doggerDetach = detach;
         bullet.fire('tick');
         return bullet;
      })
   ]);
   await Promise.all(promises);
};

export const papWaver = function (speed: number, min: number, max: number, alter = false) {
   return {
      priority: 100,
      listener (this: CosmosHitbox) {
         this.metadata.alter ??= alter;
         if (this.metadata.alter) {
            if (((this.metadata.size as number) -= speed) < min) {
               this.metadata.alter = false;
            }
         } else if (((this.metadata.size as number) += speed) > max) {
            this.metadata.alter = true;
         }
      }
   };
};

export const papState = { sound1: true, sound2: true };

export async function papBlaster (
   state: { d: boolean },
   position: Partial<CosmosPointSimple>,
   rotation: number,
   targetPosition: Partial<CosmosPointSimple>,
   targetRotation: number,
   scale: Partial<CosmosPointSimple> = { x: 1, y: 1 },
   duration = 350,
   delay = 350,
   papyrus = true,
   defaultDamage = 5,
   sp = 1
) {
   if (state.d) {
      return;
   }
   const time = renderer.time;
   const scax = new CosmosValue();
   const rect = new CosmosRectangle({
      anchor: { x: 0 },
      fill: 0xffffff,
      size: { x: 20, y: 1000 }
   });
   const anim = new CosmosAnimation({
      anchor: 0,
      resources: content.ibbSpecatk
   });
   const hitbox = new CosmosHitbox({
      anchor: { x: 0 },
      position,
      rotation,
      scale,
      size: { x: 1 },
      metadata: { activated: false, bullet: false, damage: defaultDamage, papyrus, time: 0 },
      objects: [ rect, anim ]
   }).on('tick', function () {
      if (c1()) {
         return;
      }
      rect.alpha.value = scax.value;
      const multiplier = scax.value + CosmosMath.wave((((renderer.time - time) * sp) % 200) / 200) * (24 / 20 - 1);
      this.size.x = 18 * multiplier;
      rect.scale.x = multiplier;
      if (anim.index === 6) {
         anim.index = 4;
      }
      this.metadata.activated && ++this.metadata.time === 3 && (this.metadata.bullet = true);
   });
   const snds = [] as CosmosInstance[];
   const c1 = () => {
      if (state.d) {
         renderer.detach('menu', hitbox);
         for (const snd of snds) {
            snd.stop();
         }
         return true;
      } else {
         return false;
      }
   };
   if (papState.sound1) {
      snds.push(sounds.specin.instance(renderer));
      papState.sound1 = false;
      renderer.on('tick').then(() => {
         papState.sound1 = true;
      });
   }
   renderer.attach('menu', hitbox);
   const trueTarget = { x: targetPosition.x ?? hitbox.position.x, y: targetPosition.y ?? hitbox.position.y };
   await Promise.all([
      hitbox.position.modulate(renderer, duration / sp, trueTarget, trueTarget),
      hitbox.rotation.modulate(renderer, duration / sp, targetRotation, targetRotation)
   ]);
   if (c1()) {
      return;
   }
   await renderer.pause(delay / sp);
   if (c1()) {
      return;
   }
   anim.enable();
   await renderer.when(() => anim.index === 3);
   if (c1()) {
      return;
   }
   if (papState.sound2) {
      sounds.specout.instance(renderer);
      snds.push(
         new CosmosDaemon(content.avAsriel3, {
            context,
            gain: 0.75,
            rate: 1.2,
            router: soundRouter
         }).instance(renderer)
      );
      papState.sound2 = false;
      renderer.on('tick').then(() => {
         papState.sound2 = true;
      });
   }
   scax.modulate(renderer, 200 / sp, 1);
   hitbox.size.y = 1000;
   hitbox.gravity.set(CosmosMath.ray(targetRotation - 90, 1));
   hitbox.metadata.activated = true;
   shake(2, 1000);
   await renderer.when(
      () => state.d || Math.abs(160 - hitbox.position.x) > 320 || Math.abs(120 - hitbox.position.y) > 240
   );
   if (c1()) {
      return;
   }
   hitbox.size.y = 0;
   await scax.modulate(renderer, 500 / sp, 0);
   renderer.detach('menu', hitbox);
}

export async function fireAttack (
   index: number,
   hardmode: boolean,
   fire: (() => void)[],
   state: { b: boolean },
   damage = 2,
   paw_patrol?: (paw: CosmosObject) => void,
   persist = false
) {
   switch (index) {
      case 0:
         (async () => {
            while (state.b) {
               const speedY = new CosmosValue(1.5);
               const offsetX = (Math.random() - 0.5) * 50;
               const { detach } = bulletSetup(
                  new CosmosAnimation({
                     active: true,
                     anchor: 0,
                     scale: 1 / 2,
                     position: { x: box.x1 + Math.random() * battler.box.size.x, y: box.y1 - 15 },
                     resources: content.ibbFirebol
                  }).on('tick', function () {
                     if ((persist || state.b) && this.position.y < box.y2 + 20) {
                        this.position.y += speedY.value;
                        if (Math.abs(battler.SOUL.position.y - this.position.y) < 50) {
                           this.position.x +=
                              ((180 / (Math.abs(battler.SOUL.position.x - this.position.x) + 10) - 1) *
                                 (battler.SOUL.position.x > this.position.x ? -1 : 1)) /
                              4;
                        } else {
                           this.position.x += offsetX / speedY.value / 12;
                        }
                     } else {
                        detach();
                     }
                  })
               );
               fire.push(detach);
               speedY.modulate(renderer, 1550, 3);
               await renderer.pause(133);
            }
         })();
         break;
      case 1:
         await renderer.pause(400);
         (async () => {
            let t = -Infinity;
            while (state.b) {
               const vs = 1 + rng.attack.next() * (hardmode ? 0.5 : 0.4);
               const { bullet, detach } = bulletSetup(
                  new CosmosHitbox({
                     anchor: 0,
                     size: { x: 13, y: 11 },
                     metadata: { bullet: true, damage },
                     velocity: { x: -1 * vs, y: 3 * vs },
                     scale: CosmosMath.remap(vs, 0.7, 0.3, 1, 1.5),
                     position: {
                        x: box.x1 + 10 + rng.attack.next() * (box.sx + box.sy * (1 / 3) - 20),
                        y: box.y1 - 15
                     },
                     objects: [ new CosmosAnimation({ active: true, anchor: 0, resources: content.ibbFirebol }) ]
                  }).on('tick', function () {
                     if (this.position.y > box.y) {
                        this.alpha.value = Math.min(
                           Math.max(CosmosMath.remap(this.position.y, 1, 0.5, box.y, box.y2), 0),
                           1
                        );
                        if (this.alpha.value === 0) {
                           detach();
                           return;
                        }
                     }
                     quickshadow(
                        this.objects[0] as CosmosSprite,
                        this,
                        battler.bullets,
                        this.alpha.value * 0.6
                     ).scale.set(this.scale);
                  })
               );
               fire.push(detach);
               if (bullet.scale.x > 0.5 && t < renderer.time - 500) {
                  t = renderer.time;
                  const snd = sounds.sword.instance(renderer);
                  snd.gain.value *= 1.6;
                  snd.rate.value = 0.7;
                  renderer.pause(400).then(() => snd.gain.modulate(renderer, 400, 0));
               }
               await renderer.pause(hardmode ? 200 : 300);
            }
         })();
         break;
      case 2:
         await renderer.pause(200);
         (async () => {
            while (state.b) {
               const cp = new CosmosPoint(
                  (rng.attack.next() < 0.5 ? box.x1 + 16 : box.x2 - 16) + rng.attack.next() * 16 - 8,
                  box.y1 + 8 + rng.attack.next() * (box.sy - 16)
               );
               const o1 = cp.subtract(0, 80);
               const o2 = cp.add(0, 80);
               const r1 = new CosmosRectangle({
                  fill: 0xffffff,
                  size: { x: 3, y: 80 },
                  anchor: { x: 0, y: 1 },
                  alpha: 0.5,
                  position: o1
               });
               const r2 = new CosmosRectangle({
                  fill: 0xffffff,
                  size: { x: 3, y: 80 },
                  anchor: { x: 0 },
                  alpha: 0.5,
                  position: o2
               });
               battler.bullets.attach(r1, r2);
               r1.position.modulate(renderer, 200, cp);
               r2.position.modulate(renderer, 200, cp);
               const fadetimer = hardmode ? 400 : 600;
               await Promise.all([
                  r1.alpha.modulate(renderer, fadetimer, r1.alpha.value, 1),
                  r2.alpha.modulate(renderer, fadetimer, r2.alpha.value, 1),
                  r1.size.modulate(renderer, fadetimer, {}, {}, {}, { x: 7 }),
                  r2.size.modulate(renderer, fadetimer, {}, {}, {}, { x: 7 })
               ]);
               if (!state.b) {
                  break;
               }
               battler.bullets.detach(r1, r2);
               const { bullet: b1, detach: d1 } = bulletSetup(
                  new CosmosHitbox({
                     anchor: 0,
                     size: { x: 13, y: 11 },
                     metadata: { bullet: true, damage },
                     scale: 1 / 2,
                     position: o1,
                     objects: [ new CosmosAnimation({ active: true, anchor: 0, resources: content.ibbFirebol }) ]
                  }).on('tick', function () {
                     quickshadow(this.objects[0] as CosmosSprite, this, battler.bullets).scale.set(this.scale);
                  })
               );
               const { bullet: b2, detach: d2 } = bulletSetup(
                  new CosmosHitbox({
                     anchor: 0,
                     size: { x: 13, y: 11 },
                     metadata: { bullet: true, damage },
                     scale: 1 / 2,
                     position: o2,
                     objects: [ new CosmosAnimation({ active: true, anchor: 0, resources: content.ibbFirebol }) ]
                  }).on('tick', function () {
                     quickshadow(this.objects[0] as CosmosSprite, this, battler.bullets).scale.set(this.scale);
                  })
               );
               fire.push(d1, d2);
               await Promise.all([ b1.position.modulate(renderer, 300, cp), b2.position.modulate(renderer, 300, cp) ]);
               if (!state.b) {
                  break;
               }
               d1();
               d2();
               const bom = new CosmosAnimation({
                  active: true,
                  anchor: 0,
                  priority: 2,
                  resources: content.ibbFirebol,
                  position: cp
               });
               battler.bullets.attach(bom);
               Promise.all([ bom.scale.modulate(renderer, 1000, 2), bom.alpha.modulate(renderer, 1000, 0) ]).then(() => {
                  state.b && battler.bullets.detach(bom);
               });
               sounds.bomb.instance(renderer);
               sounds.boxpush.instance(renderer);
               shake();
               let s = 0;
               const rr = rng.attack.next() * (360 / 12);
               const cc = rng.attack.next() < 0.5;
               while (s < 12) {
                  let a = rr + (s / 12) * 360;
                  let e = 4;
                  const { detach } = bulletSetup(
                     new CosmosHitbox({
                        anchor: 0,
                        size: { x: 13, y: 11 },
                        metadata: { bullet: true, damage },
                        scale: 1 / 2,
                        position: cp,
                        priority: 1,
                        objects: [ new CosmosAnimation({ active: true, anchor: 0, resources: content.ibbFirebol }) ]
                     }).on('tick', function () {
                        this.position.set(cp.endpoint(Math.round((a += cc ? -0.5 : 0.5)), (e += hardmode ? 3 : 2)));
                     })
                  );
                  fire.push(detach);
                  s++;
               }
               await renderer.pause(hardmode ? 300 : 600);
            }
         })();
         break;
      case 3:
         (async () => {
            const total = 30;
            const gapSize = 2;
            while (state.b) {
               let i = 0;
               const a = new CosmosValue();
               const r = new CosmosValue(100);
               const o = rng.attack.next() * 360;
               const s = Math.floor(rng.attack.next() * 5) * (total / 5);
               const d = [] as (() => void)[];
               while (i < total) {
                  let t = false;
                  const myI = i++;
                  if (
                     Math.abs(s - myI) <= gapSize ||
                     Math.abs(s - (myI - total)) <= gapSize ||
                     Math.abs(s - (myI + total)) <= gapSize
                  ) {
                     t = true;
                  }
                  const { detach } = bulletSetup(
                     new CosmosHitbox({
                        anchor: 0,
                        size: { x: 13, y: 11 },
                        metadata: t ? void 0 : { bullet: true, damage },
                        scale: 1 / 2,
                        alpha: t ? 0.2 : 1,
                        objects: [ new CosmosAnimation({ active: true, anchor: 0, resources: content.ibbFirebol }) ]
                     }).on('tick', function () {
                        this.position.set(
                           battler.box.position.add(
                              starGenerator(r.value, r.value / 1.5, 5, (myI / total) * 360, o + a.value)
                           )
                        );
                     })
                  );
                  d.push(detach);
                  fire.push(detach);
               }
               Promise.all([
                  r.modulate(renderer, 3000, 0),
                  a.modulate(renderer, 3000, rng.attack.next() < 0.5 ? -135 : 135)
               ]).then(() => {
                  for (const detach of d) {
                     detach();
                  }
               });
               await renderer.pause(2000);
            }
         })();
         break;
      case 4:
         (async () => {
            let i = true;
            while (state.b) {
               let f = false;
               const a = new CosmosValue();
               const op = i ? box.y2 : box.y1;
               const fb = [] as CosmosObject[];
               const paw = new CosmosSprite({
                  scale: 1 / 2,
                  anchor: 0,
                  alpha: 0,
                  metadata: { t: 0 },
                  frames: [ i ? content.ibbPawInverted : content.ibbPaw ]
               }).on('tick', async function () {
                  this.position.set(
                     CosmosMath.remap(CosmosMath.wave(a.value % 1), box.x2, box.x1),
                     CosmosMath.remap(CosmosMath.wave((a.value % 1) - 0.25), op + 10, op - 10)
                  );
                  if (f && state.b) {
                     a.value += 0.025;
                     if (this.metadata.t === 0) {
                        this.metadata.t = 5;
                        sounds.noise.instance(renderer);
                        const { bullet, detach } = bulletSetup(
                           new CosmosHitbox({
                              anchor: 0,
                              size: { x: 13, y: 11 },
                              metadata: { bullet: true, damage },
                              scale: 1 / 2,
                              priority: 1,
                              position: paw,
                              objects: [ new CosmosAnimation({ active: true, anchor: 0, resources: content.ibbFirebol }) ]
                           }).on('tick', function () {
                              if (screenCheck(this, 100)) {
                                 detach();
                              }
                           })
                        );
                        fb.push(bullet);
                        fire.push(detach);
                        renderer.pause(1000).then(() => {
                           state.b && bullet.velocity.set(CosmosMath.ray(bullet.position.angleTo(battler.SOUL), 4));
                        });
                     }
                     this.metadata.t--;
                  }
               });
               const de = () => renderer.detach('menu', paw);
               fire.push(de);
               renderer.attach('menu', paw);
               paw_patrol?.(paw);
               await paw.alpha.modulate(renderer, 300, 0.8);
               if (!state.b) {
                  break;
               }
               f = true;
               const t = hardmode ? 2000 : 1500;
               renderer.pause(t);
               await renderer.pause(t - 300);
               f = false;
               if (!state.b) {
                  break;
               }
               await paw.alpha.modulate(renderer, 300, 0);
               if (!state.b) {
                  break;
               }
               de();
               i = !i;
               await renderer.pause(500);
            }
         })();
         break;
   }
}

const patterns = {
   async maddummy (
      cutscene = false,
      alt = false,
      nc = 0,
      ncmod = false,
      otherresolver: Promise<void> | null = null,
      papyrus = false
   ) {
      if (alt) {
         await dumPattern(
            e => e(ncmod ? 'robot' : 'dummy', rng.attack.next() < 0.5 ? 'top' : 'bottom', 0.1, 0.9, nc, 400),
            otherresolver,
            papyrus
         );
      } else if (cutscene) {
         dumPattern(async e => {
            e('dummy', 'top', 0.1, 0.9, 8, 0, true);
            e('dummy', 'left', 0.1, 0.9, 8, 0, true);
            e('dummy', 'bottom', 0.1, 0.9, 8, 0, true);
            e('dummy', 'right', 0.1, 0.9, 8, 0, true);
         });
      } else {
         const volatile = battler.volatile[0];
         const MDM = volatile.container.objects[0].metadata as {
            speed: number;
            multiplier: number;
            time: number;
            mode: 'normal' | 'ragdoll' | 'random' | 'restore';
            movement: {
               rate: number;
               intensity: number;
               center: CosmosPoint;
               sineRate: CosmosPointSimple;
               sinePower: CosmosPointSimple;
            };
            ragdolled: boolean;
         };
         let s = false;
         const cx = MDM.movement.center.x;
         const cy = MDM.movement.center.y;
         function halt () {
            s = true;
            const target = {
               x: MDM.movement.center.x + (rng.attack.next() < 0.5 ? -100 : 100),
               y: MDM.movement.center.y + (rng.attack.next() < 0.5 ? -20 : 20)
            };
            MDM.movement.center.modulate(renderer, 500, target, target);
            MDM.movement.intensity = 0;
         }
         const mx = 1;
         const my = 1;
         let ox = 0;
         let oy = 0;
         let st = 0;
         const OG = battler.box.position.value();
         const sway = new CosmosPoint();
         const swayDuration = new CosmosValue(1000);
         const swayCenter = new CosmosPoint(OG);
         const swayTicker = () => {
            st += CosmosMath.FRAME / swayDuration.value;
            battler.box.position.set(
               swayCenter.add(
                  CosmosMath.remap(CosmosMath.wave(((st + ox) * mx) % 1), -sway.x, sway.x),
                  CosmosMath.remap(CosmosMath.wave(((st + oy) * my) % 1), -sway.y, sway.y)
               )
            );
         };
         await dumPattern(async (e, z) => {
            renderer.on('tick', swayTicker);
            const triple = async () => {
               await e('dummy', 'bottom', 0.1, 0.3, 3, 20);
               await renderer.pause(600);
               await e('dummy', 'bottom', 0.4, 0.6, 3, 20);
               await renderer.pause(600);
               await e('dummy', 'bottom', 0.7, 0.9, 3, 20);
            };
            const trouble = async () => {
               await e('robot', 'bottom', 0.1, 0.3, 3, 20);
               await renderer.pause(600);
               await e('robot', 'bottom', 0.4, 0.6, 3, 20);
               await renderer.pause(600);
               await e('robot', 'bottom', 0.7, 0.9, 3, 20);
            };
            switch (volatile.vars.pauseact || volatile.vars.phase) {
               case 1:
                  switch (rng.pattern.int(3)) {
                     case 0:
                        await e('dummy', 'top', 0.1, 0.9, 6, 100);
                        break;
                     case 1:
                        await e('dummy', 'top', 0.7, 0.9, 2, 20);
                        await renderer.pause(800);
                        await e('dummy', 'top', 0.4, 0.6, 2, 20);
                        await renderer.pause(800);
                        await e('dummy', 'top', 0.1, 0.3, 2, 20);
                        break;
                     case 2:
                        await e('dummy', 'left', 0.1, 0.6, 3, 60);
                        await renderer.pause(1600);
                        await e('dummy', 'right', 0.1, 0.6, 3, 60);
                        break;
                  }
                  await renderer.pause(2000);
                  await e('dummy', 'bottom', 0.1, 0.9, 3, 100);
                  break;
               case 2: {
                  const turns = volatile.vars.turns + (volatile.vars.semiTurn ? 1 : 0);
                  switch (turns < 7 ? turns : battler.pattern('maddummy', [ 3, 4, 5, 6 ])) {
                     case 1: {
                        sway.modulate(renderer, 0, 0);
                        await swayCenter.modulate(renderer, 100, { y: OG.y - 20 });
                        st = 0;
                        oy = 0.5;
                        sway.y = 20;
                        swayDuration.value = 400;
                        z.push(sway.modulate(renderer, 1200, { y: 5 }, 0, 0));
                        await e('dummy', 'top', 0.1, 0.3, 2, 20);
                        await renderer.pause(800);
                        await e('dummy', 'top', 0.4, 0.6, 2, 20);
                        await renderer.pause(800);
                        await e('dummy', 'top', 0.7, 0.9, 2, 20);
                        await renderer.pause(1600);
                        sway.modulate(renderer, 0, 0);
                        await swayCenter.modulate(renderer, 100, { y: OG.y });
                        st = 0;
                        oy = 0;
                        sway.y = 20;
                        swayDuration.value = 400;
                        z.push(sway.modulate(renderer, 1200, { y: 5 }, 0, 0));
                        await triple();
                        break;
                     }
                     case 2: {
                        sway.modulate(renderer, 0, 0);
                        await swayCenter.modulate(renderer, 100, { x: OG.x - 20 });
                        st = 0;
                        ox = 0.5;
                        sway.x = 20;
                        swayDuration.value = 400;
                        z.push(sway.modulate(renderer, 1200, { x: 5 }, 0, 0));
                        await e('dummy', 'left', 0.2, 0.8, 3, 20);
                        await renderer.pause(800);
                        await e('dummy', 'left', 0.2, 0.8, 3, 20);
                        await renderer.pause(1600);
                        sway.modulate(renderer, 0, 0);
                        await swayCenter.modulate(renderer, 100, { x: OG.x + 20 });
                        st = 0;
                        ox = 0;
                        sway.x = 30;
                        swayDuration.value = 400;
                        z.push(sway.modulate(renderer, 1800, { x: 7.5 }, 0, 0));
                        await e('dummy', 'right', 0.2, 0.8, 3, 20);
                        await renderer.pause(800);
                        await e('dummy', 'right', 0.2, 0.8, 3, 20);
                        await renderer.pause(1600);
                        sway.modulate(renderer, 0, 0);
                        await swayCenter.modulate(renderer, 100, { x: OG.x });
                        st = 0;
                        ox = 0.5;
                        sway.x = 20;
                        swayDuration.value = 400;
                        z.push(sway.modulate(renderer, 1200, { x: 5 }, 0, 0));
                        await triple();
                        break;
                     }
                     case 3: {
                        await e('knife', 'left', 0.1, 0.9, 2);
                        await renderer.pause(600);
                        await e('knife', 'right', 0.1, 0.9, 2);
                        await renderer.pause(800);
                        st = 0;
                        swayDuration.value = 2000;
                        sway.modulate(renderer, 1000, { x: 20 });
                        let i = 0;
                        while (i++ < 8) {
                           await e('charge', rng.attack.next() < 0.5 ? 'left' : 'right', 0.1, 0.9, 2);
                           await renderer.pause(500);
                        }
                        await sway.modulate(renderer, 1000, 0);
                        await triple();
                        break;
                     }
                     case 4: {
                        swayDuration.value = 500;
                        sway.modulate(renderer, 4000, { x: 2.5 });
                        swayCenter.modulate(renderer, 4000, { y: OG.y - 60 });
                        let i = 0;
                        while (i++ < 8) {
                           await e('knife', 'top', 0.1, 0.9, 2);
                           await renderer.pause(500);
                        }
                        await renderer.pause(300);
                        sway.modulate(renderer, 2000, 0);
                        await e('dummy', 'left', 0.2, 0.8, 4, 20);
                        await renderer.pause(800);
                        await e('dummy', 'right', 0.2, 0.8, 4, 20);
                        await renderer.pause(800);
                        await e('dummy', 'top', 0.2, 0.8, 4, 20);
                        await renderer.pause(800);
                        halt();
                        await renderer.pause(800);
                        await swayCenter.modulate(renderer, 100, { y: OG.y });
                        st = 0;
                        oy = 0;
                        sway.y = 40;
                        swayDuration.value = 400;
                        z.push(sway.modulate(renderer, 2400, { y: 10 }, 0, 0));
                        await renderer.pause(1000);
                        await triple();
                        break;
                     }
                     case 5: {
                        swayCenter.modulate(renderer, 2000, { x: OG.x - 80 });
                        let i = 0;
                        while (i++ < 3) {
                           const t = rng.attack.int(2);
                           await e([ 'dummy', 'charge' ][t] as 'dummy' | 'charge', 'left', 0.1, 0.9, [ 4, 2 ][t], 20);
                           await renderer.pause(400);
                        }
                        await renderer.pause(1600);
                        swayCenter.modulate(renderer, 4000, { x: OG.x + 80 });
                        i = 0;
                        while (i++ < 6) {
                           const t = rng.attack.int(2);
                           await e([ 'dummy', 'charge' ][t] as 'dummy' | 'charge', 'right', 0.1, 0.9, [ 4, 2 ][t], 20);
                           await renderer.pause(400);
                        }
                        await renderer.pause(1600);
                        swayCenter.modulate(renderer, 4000, { x: OG.x - 80 });
                        i = 0;
                        while (i++ < 6) {
                           const t = rng.attack.int(2);
                           await e([ 'dummy', 'charge' ][t] as 'dummy' | 'charge', 'left', 0.1, 0.9, [ 4, 2 ][t], 20);
                           await renderer.pause(400);
                        }
                        await renderer.pause(1600);
                        swayCenter.modulate(renderer, 2000, { x: OG.x });
                        i = 0;
                        while (i++ < 3) {
                           const t = rng.attack.int(2);
                           await e([ 'dummy', 'charge' ][t] as 'dummy' | 'charge', 'right', 0.1, 0.9, [ 4, 2 ][t], 20);
                           await renderer.pause(400);
                        }
                        await renderer.pause(800);
                        halt();
                        await renderer.pause(800);
                        await triple();
                        break;
                     }
                     case 6: {
                        let i = 0;
                        while (i++ < 4) {
                           const c = rng.attack.next() < 0.5 ? 'blue' : 'orange';
                           const s = i % 2 === 0 ? 'left' : 'right';
                           let j = 0;
                           while (j++ < 9) {
                              await e(c, s, j * 0.1, j * 0.1, 1);
                              await renderer.pause(20);
                           }
                           await renderer.pause(800);
                        }
                        await renderer.pause(800);
                        sway.modulate(renderer, 0, 0);
                        await swayCenter.modulate(renderer, 100, { x: OG.x - 20 });
                        st = 0;
                        ox = 0.5;
                        sway.x = 20;
                        swayDuration.value = 400;
                        z.push(sway.modulate(renderer, 1200, { x: 5 }, 0, 0));
                        await e('knife', 'left', 0.2, 0.8, 2, 100);
                        await renderer.pause(400);
                        await e('dummy', 'top', 0.2, 0.8, 4, 20);
                        await renderer.pause(800);
                        sway.modulate(renderer, 0, 0);
                        await swayCenter.modulate(renderer, 100, { x: OG.x + 20 });
                        st = 0;
                        ox = 0;
                        sway.x = 30;
                        swayDuration.value = 400;
                        z.push(sway.modulate(renderer, 1800, { x: 7.5 }, 0, 0));
                        await e('knife', 'right', 0.2, 0.8, 2, 100);
                        await renderer.pause(400);
                        await e('dummy', 'bottom', 0.2, 0.8, 4, 20);
                        await renderer.pause(800);
                        sway.modulate(renderer, 0, 0);
                        await swayCenter.modulate(renderer, 100, { x: OG.x - 20 });
                        st = 0;
                        ox = 0.5;
                        sway.x = 30;
                        swayDuration.value = 400;
                        z.push(sway.modulate(renderer, 1800, { x: 7.5 }, 0, 0));
                        await e('knife', 'left', 0.2, 0.8, 2, 100);
                        await renderer.pause(400);
                        await e('dummy', 'top', 0.2, 0.8, 4, 20);
                        await renderer.pause(800);
                        sway.modulate(renderer, 0, 0);
                        await swayCenter.modulate(renderer, 100, { x: OG.x + 20 });
                        st = 0;
                        ox = 0;
                        sway.x = 30;
                        swayDuration.value = 400;
                        z.push(sway.modulate(renderer, 1800, { x: 7.5 }, 0, 0));
                        await e('knife', 'right', 0.2, 0.8, 2, 100);
                        await renderer.pause(400);
                        await e('dummy', 'bottom', 0.2, 0.8, 4, 20);
                        halt();
                        await renderer.pause(800);
                        sway.modulate(renderer, 0, 0);
                        await swayCenter.modulate(renderer, 100, { x: OG.x });
                        st = 0;
                        ox = 0.5;
                        sway.x = 20;
                        swayDuration.value = 400;
                        z.push(sway.modulate(renderer, 1200, { x: 5 }, 0, 0));
                        await renderer.pause(800);
                        await triple();
                        break;
                     }
                  }
                  break;
               }
               case 3:
                  switch (volatile.vars.turns) {
                     case 1: {
                        sway.modulate(renderer, 0, 0);
                        await swayCenter.modulate(renderer, 100, { y: OG.y - 20 });
                        st = 0;
                        oy = 0.5;
                        sway.y = 20;
                        swayDuration.value = 400;
                        z.push(sway.modulate(renderer, 1200, { y: 5 }, 0, 0));
                        await e('robot', 'top', 0.1, 0.3, 2, 20);
                        await renderer.pause(800);
                        await e('robot', 'top', 0.4, 0.6, 2, 20);
                        await renderer.pause(800);
                        await e('robot', 'top', 0.7, 0.9, 2, 20);
                        await renderer.pause(1600);
                        sway.modulate(renderer, 0, 0);
                        await swayCenter.modulate(renderer, 100, { y: OG.y });
                        st = 0;
                        oy = 0;
                        sway.y = 20;
                        swayDuration.value = 400;
                        z.push(sway.modulate(renderer, 1200, { y: 5 }, 0, 0));
                        await trouble();
                        break;
                     }
                     case 2: {
                        sway.modulate(renderer, 0, 0);
                        await swayCenter.modulate(renderer, 100, { x: OG.x - 20 });
                        st = 0;
                        ox = 0.5;
                        sway.x = 20;
                        swayDuration.value = 400;
                        z.push(sway.modulate(renderer, 1200, { x: 5 }, 0, 0));
                        let i = 0;
                        while (i++ < 2) {
                           const c = rng.attack.next() < 0.5 ? 'blue' : 'orange';
                           let j = 0;
                           while (j++ < 9) {
                              await e(c, 'right', j * 0.1, j * 0.1, 1);
                              await renderer.pause(20);
                           }
                           await renderer.pause(800);
                        }
                        await renderer.pause(800);
                        sway.modulate(renderer, 0, 0);
                        await swayCenter.modulate(renderer, 100, { x: OG.x + 20 });
                        st = 0;
                        ox = 0;
                        sway.x = 30;
                        swayDuration.value = 400;
                        z.push(sway.modulate(renderer, 1800, { x: 7.5 }, 0, 0));
                        i = 0;
                        while (i++ < 2) {
                           const c = rng.attack.next() < 0.5 ? 'blue' : 'orange';
                           let j = 0;
                           while (j++ < 9) {
                              await e(c, 'left', j * 0.1, j * 0.1, 1);
                              await renderer.pause(20);
                           }
                           await renderer.pause(800);
                        }
                        await renderer.pause(800);
                        sway.modulate(renderer, 0, 0);
                        await swayCenter.modulate(renderer, 100, { x: OG.x });
                        st = 0;
                        ox = 0.5;
                        sway.x = 20;
                        swayDuration.value = 400;
                        z.push(sway.modulate(renderer, 1200, { x: 5 }, 0, 0));
                        await trouble();
                        break;
                     }
                     case 3: {
                        await Promise.all([
                           e('robot', 'top', 0.3, 0.3),
                           e('robot', 'top', 0.7, 0.7),
                           e('robot', 'right', 0.3, 0.3),
                           e('robot', 'right', 0.7, 0.7)
                        ]);
                        await renderer.pause(2400);
                        await Promise.all([ e('knife', 'bottom', 0.2, 0.8, 1), e('knife', 'left', 0.2, 0.8, 1) ]);
                        await renderer.pause(800);
                        await Promise.all([
                           e('robot', 'right', 0.3, 0.3),
                           e('robot', 'right', 0.7, 0.7),
                           e('robot', 'bottom', 0.3, 0.3),
                           e('robot', 'bottom', 0.7, 0.7)
                        ]);
                        await renderer.pause(2400);
                        await Promise.all([ e('knife', 'left', 0.2, 0.8, 1), e('knife', 'top', 0.2, 0.8, 1) ]);
                        await renderer.pause(800);
                        await Promise.all([
                           e('robot', 'bottom', 0.3, 0.3),
                           e('robot', 'bottom', 0.7, 0.7),
                           e('robot', 'left', 0.3, 0.3),
                           e('robot', 'left', 0.7, 0.7)
                        ]);
                        await renderer.pause(2400);
                        await Promise.all([ e('knife', 'top', 0.2, 0.8, 1), e('knife', 'right', 0.2, 0.8, 1) ]);
                        await renderer.pause(800);
                        await Promise.all([
                           e('robot', 'left', 0.3, 0.3),
                           e('robot', 'left', 0.7, 0.7),
                           e('robot', 'top', 0.3, 0.3),
                           e('robot', 'top', 0.7, 0.7)
                        ]);
                        await renderer.pause(2400);
                        await Promise.all([ e('knife', 'right', 0.2, 0.8, 1), e('knife', 'bottom', 0.2, 0.8, 1) ]);
                        await renderer.pause(800);
                        await trouble();
                        break;
                     }
                     case 4: {
                        swayCenter.modulate(renderer, 2000, { x: OG.x - 100 });
                        let i = 0;
                        while (i++ < 3) {
                           await e('robot', 'bottom', 0.1, 0.9, 1);
                           await renderer.pause(400);
                        }
                        await renderer.pause(1600);
                        i = 0;
                        while (i++ < 4) {
                           await e('charge', 'left', 0.1, 0.9, 2);
                           await renderer.pause(500);
                        }
                        await renderer.pause(1100);
                        swayCenter.modulate(renderer, 2000, { y: OG.y - 100 });
                        i = 0;
                        while (i++ < 3) {
                           await e('robot', 'left', 0.1, 0.9, 1);
                           await renderer.pause(400);
                        }
                        await renderer.pause(1600);
                        i = 0;
                        while (i++ < 4) {
                           await e('charge', 'top', 0.1, 0.9, 2);
                           await renderer.pause(500);
                        }
                        await renderer.pause(1100);
                        swayCenter.modulate(renderer, 4000, { x: OG.x + 100 });
                        i = 0;
                        while (i++ < 6) {
                           await e('robot', 'top', 0.1, 0.9, 1);
                           await renderer.pause(400);
                        }
                        await renderer.pause(1600);
                        i = 0;
                        while (i++ < 2) {
                           await e('knife', 'right', 0.1, 0.9, 2);
                           await renderer.pause(500);
                        }
                        await renderer.pause(1100);
                        swayCenter.modulate(renderer, 2000, { y: OG.y });
                        i = 0;
                        while (i++ < 3) {
                           await e('robot', 'right', 0.1, 0.9, 1);
                           await renderer.pause(400);
                        }
                        await renderer.pause(1600);
                        i = 0;
                        while (i++ < 2) {
                           await e('knife', 'bottom', 0.1, 0.9, 2);
                           await renderer.pause(500);
                        }
                        await renderer.pause(1100);
                        swayCenter.modulate(renderer, 2000, { x: OG.x });
                        i = 0;
                        while (i++ < 3) {
                           await e('robot', 'bottom', 0.1, 0.9, 1);
                           await renderer.pause(400);
                        }
                        await renderer.pause(1500);
                        await trouble();
                        break;
                     }
                  }
                  break;
            }
         });
         renderer.off('tick', swayTicker);
         s && MDM.movement.center.modulate(renderer, 500, { x: cx, y: cy }, { x: cx, y: cy });
      }
   },
   async moldsmal (c = 0) {
      const damage = SAVE.data.n.plot < 16 ? 3 : 4;
      switch (battler.pattern('moldsmal', [ 0, 1 ])) {
         case 0: {
            let b = true;
            const mold = [] as (() => void)[];
            const gsx = 23;
            const gsh = gsx / 2;
            const endp = events.on('turn-timer').then(() => {
               b = false;
               for (const a of mold) {
                  a();
               }
            });
            await Promise.race([ endp, renderer.pause(c * 1200) ]);
            if (!b) {
               return;
            }
            while (true) {
               (async () => {
                  const hbo = new CosmosHitbox({
                     size: { x: 19, y: 11 },
                     position: { x: -2 },
                     anchor: { y: 1 },
                     metadata: { bullet: true, damage, t: 0, gel: true, sp: new CosmosValue(1) }
                  });
                  const gs = new CosmosPoint({ y: -1 });
                  const gel = new CosmosSprite({
                     anchor: { y: 1 },
                     priority: 10,
                     position: { x: box.x1 - gsx, y: box.y1 },
                     frames: [ content.ibbGelatin ],
                     objects: [ hbo ],
                     scale: gs,
                     metadata: { t: 0, tb: 60 }
                  }).on('tick', function () {
                     this.scale.set(gs.multiply(hbo.metadata.sp.value));
                     if (this.metadata.t === 0) {
                        this.metadata.t = this.metadata.tb;
                        const prominence = rng.attack.next();
                        const { bullet, detach } = bulletSetup(
                           new CosmosHitbox({
                              size: 10,
                              anchor: 0,
                              metadata: { bullet: true, damage, mold: true, detach: null as null | (() => void) },
                              velocity: { y: CosmosMath.remap(rng.attack.next(), 1, 2.5) },
                              acceleration: 0.99,
                              position: {
                                 x:
                                    this.position.x -
                                    (gsh + gsh * this.anchor.x) +
                                    rng.attack.compute() * gsx * this.scale.x,
                                 y: this.position.y
                              },
                              scale: CosmosMath.remap(prominence, 0.25, 0.5) * hbo.metadata.sp.value,
                              objects: [
                                 new CosmosSprite({
                                    alpha: CosmosMath.remap(prominence, 0.5, 1),
                                    frames: [ content.ibbOctagon ],
                                    anchor: 0
                                 })
                              ]
                           }).on('tick', function () {
                              boxCheck(this, 10) && detach();
                              if (this.velocity.extent < 0.15) {
                                 this.metadata.bullet = false;
                                 if ((this.alpha.value -= 0.05) <= 0) {
                                    this.alpha.value = 0;
                                    detach();
                                 }
                              }
                           }),
                           false
                        );
                        bullet.metadata.detach = detach;
                        mold.push(detach);
                     }
                     this.metadata.t--;
                  });
                  battler.bullets.attach(gel);
                  const detach = () => battler.bullets.detach(gel);
                  mold.push(detach);
                  while (true) {
                     await Promise.race([
                        endp,
                        gs.modulate(renderer, 550, {}, { x: 1.5, y: -0.8 }, { x: 1.5, y: -0.8 })
                     ]);
                     if (!b) {
                        break;
                     }
                     gel.anchor.x = 1;
                     gel.position.x += gsx * 1.5;
                     hbo.anchor.x = 1;
                     hbo.position.x = -2;
                     gel.metadata.t = 10;
                     gel.metadata.tb = 10;
                     await Promise.race([
                        endp,
                        Promise.all([
                           gs.modulate(renderer, 750, {}, { x: 1, y: -1 }, { x: 1, y: -1 }),
                           gel.position.modulate(
                              renderer,
                              750,
                              {},
                              { x: gel.position.x + 30 },
                              { x: gel.position.x + 30 }
                           )
                        ])
                     ]);
                     gel.metadata.tb = 60;
                     gel.anchor.x = -1;
                     gel.position.x -= gsx;
                     hbo.anchor.x = -1;
                     hbo.position.x = 2;
                     if (!b) {
                        break;
                     }
                  }
               })();
               await Promise.race([ endp, renderer.pause(battler.alive.length * 1500 + rng.attack.next() * 200) ]);
               if (!b) {
                  break;
               }
            }
            break;
         }
         case 1: {
            const mold = [] as (() => void)[];
            const bscale = new CosmosPoint(0.95, 1.125);
            const fscale = new CosmosPoint(0.9, 1.25);
            const gel = new CosmosHitbox({
               alpha: 0,
               anchor: { x: 0, y: 1 },
               size: { x: 19, y: 11 },
               position: {
                  x: box.x + rng.attack.next() * 20 - 10,
                  y: box.y1 - 42
               },
               gravity: { y: 0.2 },
               metadata: { bullet: true, damage, landed: false, t: 0, btime: 0, gel: true, sp: new CosmosValue(1) },
               scale: bscale,
               objects: [
                  new CosmosSprite({ frames: [ content.ibbGelatin ], anchor: { x: 0, y: 1 }, position: { y: -1 } })
               ],
               priority: 10
            }).on('tick', function () {
               if (this.metadata.landed) {
                  if (this.metadata.t === 0) {
                     this.metadata.t = 15;
                     const prominence = rng.attack.next();
                     const { bullet, detach } = bulletSetup(
                        new CosmosHitbox({
                           size: 10,
                           anchor: 0,
                           metadata: { bullet: true, damage, mold: true, detach: null as null | (() => void) },
                           acceleration: 0.99,
                           velocity: CosmosMath.ray(
                              rng.attack.next() < 1 / 6
                                 ? gel.position.angleTo(battler.SOUL) + CosmosMath.remap(rng.attack.next(), -5, -5)
                                 : CosmosMath.remap(rng.attack.next(), -160, -20),
                              CosmosMath.remap(rng.attack.next(), 1, 2.5)
                           ),
                           position: gel,
                           scale: CosmosMath.remap(prominence, 0.25, 0.5) * this.metadata.sp.value,
                           objects: [
                              new CosmosSprite({
                                 alpha: CosmosMath.remap(prominence, 0.5, 1),
                                 frames: [ content.ibbOctagon ],
                                 anchor: 0
                              })
                           ]
                        }).on('tick', function () {
                           boxCheck(this, 10) && detach();
                           if (this.velocity.extent < 0.15) {
                              this.metadata.bullet = false;
                              if ((this.alpha.value -= 0.05) <= 0) {
                                 this.alpha.value = 0;
                                 detach();
                              }
                           }
                        }),
                        false
                     );
                     bullet.metadata.detach = detach;
                     mold.push(detach);
                  }
                  this.metadata.t--;
               } else if (box.y2 + 1 <= this.position.y + this.velocity.y) {
                  this.position.y = box.y2 + 1;
                  this.gravity.set(0);
                  this.velocity.set(0);
                  this.metadata.landed = true;
                  fscale.set(this.scale.multiply(this.metadata.sp.value));
               } else {
                  this.scale.x -= 0.01;
                  this.scale.y += 0.01;
                  quickshadow(this.objects[0] as CosmosSprite, this.position.add(0, -1), battler.bullets);
                  return;
               }
               this.scale.set(
                  CosmosMath.remap(CosmosMath.wave(this.metadata.btime * (1 / 30)), fscale.x, 1 / fscale.x),
                  CosmosMath.remap(CosmosMath.wave(this.metadata.btime * (1 / 30)), fscale.y, 1 / fscale.y)
               );
               if (this.metadata.btime++ < 100) {
                  fscale.set(fscale.x ** 0.98, fscale.y ** 0.98);
               }
            });
            renderer.attach('menu', gel);
            gel.alpha.modulate(renderer, 300, 1);
            sounds.appear.lastPlayed === renderer.ticks || sounds.appear.instance(renderer);
            await events.on('turn-timer');
            renderer.detach('menu', gel);
            for (const o of mold) {
               o();
            }
            break;
         }
      }
   },
   async napstablook (index: number) {
      switch (index) {
         case 999: {
            let aeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeae = 0;
            while (
               aeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeae++ <
               15
            ) {
               napCry(false, true, -20, true);
               await battler.turnTimer(500);
            }
            break;
         }
         case 0: {
            const blurb = new CosmosSprite({
               anchor: 0,
               scale: 0.5,
               frames: [ content.ibcNapstablookSad ]
            }).on('tick', () => {
               blurb.position = new CosmosPoint(160).add((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2);
            });
            renderer.attach('menu', blurb);
            await renderer.pause(3000);
            renderer.detach('menu', blurb);
            break;
         }
         case 1: {
            let tears = 0;
            while (tears++ < 10) {
               napCry(false, true, void 0, true);
               await renderer.pause(550);
            }
            await battler.turnTimer(1500);
            break;
         }
         case 2: {
            let times = 0;
            while (times++ < 5) {
               napCry(false, true, void 0, true);
               await renderer.pause(400);
               napCry(false, true, void 0, true);
               await renderer.pause(400);
               napCry(false, true, void 0, true);
               await renderer.pause(400);
               const volatile = battler.volatile[0];
               await volatile.container.alpha.modulate(renderer, 300, 0);
               if (times < 5) {
                  const possie = [ 100, 160, 220 ].filter(
                     x => x !== volatile.container.position.x && (times !== 7 || x !== 160)
                  );
                  volatile.container.position.x = possie[rng.attack.int(possie.length)];
               } else {
                  volatile.container.position.x = 160;
               }
               battler.box.position.modulate(renderer, 500, {
                  x: (volatile.container.position.x - 160) * 0.5 + 160,
                  y: battler.box.position.y
               });
               await volatile.container.alpha.modulate(renderer, 300, 1);
            }
            await battler.turnTimer();
            break;
         }
         case 3: {
            napCry(true);
            break;
         }
         default: {
            napCry();
            break;
         }
      }
   },
   async shyren (
      originpos = battler.volatile[0].container.position,
      anga = 45,
      angb = 70,
      alt = false,
      otherresolver: Promise<void> | null = null,
      papyrus = false
   ) {
      const mouthPos = originpos.subtract({ x: -0.5, y: 64.5 });
      async function spawnNote (v = 1) {
         const fv = CosmosMath.remap(rng.attack.next(), 2, 4) * v;
         const hitbox = new CosmosHitbox({
            metadata: { bullet: true, damage: 4, papyrus },
            anchor: 0,
            size: 10,
            position: mouthPos.add(rng.attack.next() * 4 - 2, rng.attack.next() * 4 - 2),
            velocity: CosmosMath.ray(anga + rng.attack.next() * angb, fv),
            objects: [ new CosmosAnimation({ active: true, resources: content.ibbNote, anchor: 0, scale: 0.5 }) ]
         });
         const { detached, detach } = bulletSetup(
            new CosmosObject({ objects: [ hitbox ] }).on(
               'tick',
               (() => {
                  const time = renderer.time;
                  const phase = rng.attack.next();
                  return function () {
                     this.position.x = sineWaver(time, 1000 / fv, -0.7, 0.7, phase);
                  };
               })()
            ),
            true,
            hitbox
         );
         await Promise.race([
            detached,
            renderer.when(() => screenCheck(hitbox, 10)),
            ...(otherresolver === null ? [] : [ otherresolver ])
         ]);
         detach();
      }
      function spawnNoteWithSnd (promises: Promise<void>[], index: number, note: number, notepower: number) {
         if (SAVE.data.b.bullied_shyren) {
            [ sounds.singBad1, sounds.singBad2, sounds.singBad3 ][Math.floor(Math.random() * 3)].instance(renderer);
            promises.push(spawnNote(notepower));
         } else {
            if (index % 8 === 0) {
               [ sounds.singBass1, sounds.singBass2 ][index % 16 === 0 ? 0 : 1].instance(renderer);
            }
            [
               sounds.singTreble1,
               sounds.singTreble2,
               sounds.singTreble3,
               sounds.singTreble4,
               sounds.singTreble5,
               sounds.singTreble6
            ][note].instance(renderer);
            promises.push(spawnNote(notepower));
         }
      }
      const vars = battler.volatile[0].vars;
      if (alt) {
         return spawnNoteWithSnd;
      } else if (vars.encourage > 0) {
         const notes =
            vars.encourage < 5
               ? [
                    [ 1, 5, 4, 5, 3, 4, 2, 4, 3, 2, 1, 2, 0 ],
                    [ 0, 4, 3, 0, 2, 0, 2, 3, 0, 0, 3, 0, 2, 0, 2, 3 ],
                    [ 0, 0, 5, 0, 4, 0, 0, 3, 0, 2, 0, 1, 0, 0, 1, 2, 0, 0, 5, 0, 4, 0, 0, 3, 0, 2, 0, 1, 0, 0, 2, 1 ],
                    [ 0, 0, 0, 0, 5, 0, 3, 0, 2, 0, 1, 0, 2, 3, 0, 4, 0, 0, 3, 0, 2, 1, 0, 1, 0, 0, 3, 0, 2, 1, 2, 1 ]
                 ][vars.encourage - 1]
               : CosmosUtils.populate(71, () => Math.floor(Math.random() * 6));
         const notepower = [ 1, 1, 1.1, 1.2, 1.5 ][vars.encourage - 1];
         const timedelay = [ 250, 250, 240, 220, 190 ][vars.encourage - 1];
         await battler.sequence(notes.length, async (promises, index) => {
            spawnNoteWithSnd(promises, index, notes[index], notepower);
            if (index === notes.length - 1) {
               vars.singturn = false;
            } else {
               await renderer.pause(timedelay);
            }
         });
      } else {
         [ sounds.singBad1, sounds.singBad2, sounds.singBad3 ][Math.floor(Math.random() * 3)].instance(renderer);
         await spawnNote(0.5);
      }
   },
   spacetop (index?: number, stardrake = false) {
      switch (typeof index === 'number' ? index : battler.pattern('spacetop', [ 0, 1 ])) {
         case 0: {
            bulletSequence(async (detachers, state) => {
               const y = box.y1 + 5 + rng.attack.next() * (box.sy - 10);
               const line = new CosmosRectangle({
                  anchor: 0,
                  position: { x: box.x, y },
                  size: { x: box.sx, y: 4 },
                  fill: 0xffffff,
                  alpha: 0.5
               });
               battler.bullets.attach(line);
               const de = () => battler.bullets.detach(line);
               detachers.push(de);
               await renderer.pause(100);
               if (!state.b) {
                  return;
               }
               line.alpha.value = 0;
               await renderer.pause(100);
               if (!state.b) {
                  return;
               }
               line.alpha.value = 0.5;
               await renderer.pause(300);
               if (!state.b) {
                  return;
               }
               de();
               const side = rng.attack.next() < 0.5 ? 0 : 1;
               const hbox = new CosmosHitbox({
                  anchor: 0,
                  velocity: { x: [ 4, -4 ][side] },
                  size: { x: 10, y: 7 },
                  metadata: { bullet: true, damage: 4, sploded: false },
                  objects: [
                     new CosmosAnimation({
                        anchor: 0,
                        index: Math.floor(Math.random() * 4),
                        resources: content.ibbLithium
                     })
                  ],
                  position: { x: [ box.x1 - 10, box.x2 + 10 ][side], y },
                  rotation: 90
               });
               const esplo = async (q = false) => {
                  hbox.metadata.sploded = true;
                  q || (hbox.position.x = side === 0 ? box.x2 : box.x1);
                  hbox.velocity.x = 0;
                  shake();
                  explosionPower(hbox);
                  sounds.bomb.instance(renderer);
                  hbox.scale.modulate(renderer, 300, 5, 5);
                  await renderer.pause(150);
                  hbox.metadata.bullet = false;
                  await hbox.alpha.modulate(renderer, 150, 0);
                  d1();
               };
               const {
                  bullet,
                  detach: d1,
                  detached: dc1
               } = bulletSetup(
                  hbox.on('tick', async function () {
                     if (
                        !this.metadata.sploded &&
                        (side === 0 ? box.x2 <= this.position.x : this.position.x <= box.x1)
                     ) {
                        esplo();
                     }
                  }),
                  void 0,
                  null
               );
               const {
                  bullet: b2,
                  detach: d2,
                  detached: dc2
               } = bulletSetup(
                  new CosmosHitbox({
                     anchor: 0,
                     size: { x: 4, y: 15 },
                     metadata: { bullet: true, damage: 4 }
                  }),
                  bullet,
                  null
               );
               const hl = (b: CosmosHitbox) => {
                  if ((b === hbox || b === b2) && !hbox.metadata.sploded) {
                     esplo(true);
                  }
               };
               events.on('hurt', hl);
               dc1.then(() => {
                  events.off('hurt', hl);
                  d2();
               });
               dc2.then(() => d1());
               detachers.push(d1, d2);
               await renderer.pause(stardrake ? 1300 : 700);
            });
            break;
         }
         case 1: {
            bulletSequence(async (detachers, state) => {
               const hbox = new CosmosHitbox({
                  anchor: 0,
                  size: { x: 10, y: 7 },
                  metadata: { bullet: true, damage: 4, sploded: false },
                  objects: [
                     new CosmosAnimation({
                        anchor: 0,
                        index: Math.floor(Math.random() * 4),
                        resources: content.ibbLithium
                     })
                  ],
                  position: { x: box.x1 + 5 + rng.attack.next() * (box.sx - 10), y: box.y1 - 10 }
               });
               const esplo = async (q = false) => {
                  hbox.metadata.sploded = true;
                  q || (hbox.position.y = box.y2);
                  hbox.gravity.y = 0;
                  hbox.velocity.y = 0;
                  shake();
                  explosionPower(hbox);
                  sounds.bomb.instance(renderer);
                  hbox.scale.modulate(renderer, 300, 5, 5);
                  await renderer.pause(150);
                  hbox.metadata.bullet = false;
                  await hbox.alpha.modulate(renderer, 150, 0);
                  d1();
               };
               const {
                  bullet,
                  detach: d1,
                  detached: dc1
               } = bulletSetup(
                  hbox.on('tick', async function () {
                     if (!this.metadata.sploded && box.y2 <= this.position.y) {
                        esplo();
                     }
                  }),
                  void 0,
                  null
               );
               const {
                  bullet: b2,
                  detach: d2,
                  detached: dc2
               } = bulletSetup(
                  new CosmosHitbox({
                     anchor: 0,
                     size: { x: 4, y: 15 },
                     metadata: { bullet: true, damage: 4 }
                  }),
                  bullet,
                  null
               );
               const hl = (b: CosmosHitbox) => {
                  if ((b === hbox || b === b2) && !hbox.metadata.sploded) {
                     esplo(true);
                  }
               };
               events.on('hurt', hl);
               dc1.then(() => {
                  events.off('hurt', hl);
                  d2();
               });
               dc2.then(() => d1());
               detachers.push(d1, d2);
               bullet.position.modulate(renderer, 500, { y: box.y1 }).then(async () => {
                  if (!state.b) {
                     return;
                  }
                  await renderer.pause(500);
                  if (!state.b) {
                     return;
                  }
                  bullet.gravity.y = 0.5;
               });
               await renderer.pause(stardrake ? 2000 : 1000);
            });
            break;
         }
      }
   },
   twinkly: {
      arc () {
         return CosmosUtils.populate(5, index => {
            const { bullet, detach, detached } = bulletSetup(
               new CosmosHitbox({
                  anchor: 0,
                  size: { x: 10, y: 9 },
                  alpha: 0,
                  rotation: Math.random() < 0.5 ? -135 : 135,
                  metadata: { bullet: true, damage: 19 },
                  scale: 1.5,
                  position: new CosmosPoint(160, 70).endpoint([ -150, -120, -90, -60, -30 ][index], 50),
                  objects: [
                     new CosmosSprite({ frames: [ content.ibbPellet ], anchor: 0 }).on('tick', function () {
                        this.offsets[0].set((Math.random() * 2 - 1) * 0.6, (Math.random() * 2 - 1) * 0.6);
                     })
                  ]
               }).on('tick', function () {
                  screenCheck(this, 5) && detach();
               }),
               true
            );
            bullet.alpha.modulate(renderer, 1000, 1);
            bullet.rotation.modulate(renderer, 1000, 0, 0);
            bullet.scale.modulate(renderer, 1000, 0.5, 0.5);
            return { bullet, detach, detached };
         });
      },
      ring (spindir = 90, spawnTime = 1000, initialD = 1, rebound = false, toriel = false) {
         let lock = false;
         const dist = new CosmosValue(1);
         const pellets = new CosmosObject({
            objects: CosmosUtils.populate(40, index => {
               const bullet = new CosmosHitbox({
                  anchor: 0,
                  size: { x: 10, y: 9 },
                  alpha: 0,
                  rotation: Math.random() < 0.5 ? -135 : 135,
                  metadata: { bullet: toriel, damage: 19 },
                  scale: 1,
                  objects: [
                     new CosmosSprite({ frames: [ content.ibbPellet ], anchor: 0 }).on('tick', function () {
                        this.offsets[0].set((Math.random() * 2 - 1) * 0.6, (Math.random() * 2 - 1) * 0.6);
                     })
                  ]
               }).on('tick', function () {
                  const sixpack = Math.abs(dist.value) * initialD;
                  this.position.set(
                     battler.box.position.add(
                        starGenerator(
                           sixpack * 60,
                           sixpack * 40,
                           5,
                           index * 9,
                           lock ? 63 : CosmosMath.remap(dist.value, 0, spindir, 1, 0)
                        )
                     )
                  );
               });
               bullet.alpha.modulate(renderer, spawnTime, 1);
               bullet.rotation.modulate(renderer, spawnTime, 0, 0);
               bullet.scale.modulate(renderer, spawnTime, 0.5, 0.5);
               return bullet;
            })
         }).on('tick', function () {
            (this.alpha.value === 0 || dist.value === 10) && renderer.detach('menu', this);
         });
         renderer.attach('menu', pellets);
         if (rebound) {
            renderer
               .when(() => dist.value <= 0.4)
               .then(async () => {
                  const dx = new CosmosValue(0.3);
                  const xt = new CosmosObject({
                     priority: 100000,
                     position: battler.box,
                     objects: CosmosUtils.populate(40, index =>
                        new CosmosAnimation({
                           anchor: 0,
                           active: true,
                           scale: 1 / 2,
                           resources: toriel ? content.ibbFirebol : content.ibbSmolbol
                        }).on('tick', function () {
                           this.position.set(starGenerator(dx.value * 60, dx.value * 40, 5, index * 9, 63));
                        })
                     )
                  });
                  renderer.attach('menu', xt);
                  await renderer.pause(66);
                  xt.alpha.value = 0;
                  await renderer.pause(66);
                  xt.alpha.value = 1;
                  await renderer.pause(66);
                  xt.alpha.value = 0;
                  await renderer.pause(66);
                  xt.alpha.value = 1;
                  await renderer.pause(66);
                  dx.modulate(renderer, 1000, 0.4, 0.4);
                  await renderer.pause(500);
                  await xt.alpha.modulate(renderer, 500, 0);
                  renderer.detach('menu', xt);
               });
            renderer
               .when(() => dist.value === 0.3)
               .then(() => {
                  lock = true;
                  sounds.bell.instance(renderer);
                  dist.modulate(renderer, 700, 0.6);
                  pellets.alpha.modulate(renderer, 500, 0);
               });
         }
         return dist;
      },
      async row (side: 1 | -1, rebound: 0 | 1 | 2 | 3) {
         const pellets = new CosmosObject({
            position: battler.box.position.add(100 * side, 0),
            objects: CosmosUtils.populate(6, index => {
               const bullet = new CosmosHitbox({
                  anchor: 0,
                  size: { x: 10, y: 9 },
                  alpha: 0,
                  rotation: Math.random() < 0.5 ? -135 : 135,
                  metadata: { bullet: true, damage: 19 },
                  scale: 2,
                  position: { y: (-2.5 + index) * 10 },
                  objects: [
                     new CosmosSprite({ frames: [ content.ibbPellet ], anchor: 0 }).on('tick', function () {
                        this.offsets[0].set((Math.random() * 2 - 1) * 0.6, (Math.random() * 2 - 1) * 0.6);
                     })
                  ]
               });
               bullet.alpha.modulate(renderer, 300, 1);
               bullet.rotation.modulate(renderer, 300, 0, 0);
               bullet.scale.modulate(renderer, 300, 0.5, 0.5);
               return bullet;
            })
         });
         renderer.attach('menu', pellets);
         await renderer.pause(500);
         pellets.position.modulate(renderer, 500, battler.box.position.add(40 * side, 0));
         await renderer.pause(200);
         let xt: CosmosObject;
         switch (rebound) {
            case 0:
               xt = new CosmosObject({
                  objects: [
                     new CosmosSprite({
                        frames: [ content.ibbBonesection ],
                        anchor: 0,
                        scale: { x: 0.5, y: 56 }
                     }),
                     new CosmosAnimation({
                        anchor: { x: 0, y: 1 },
                        resources: content.ibbBone,
                        position: { y: -28 },
                        scale: 0.5
                     }),
                     new CosmosAnimation({
                        anchor: { x: 0 },
                        resources: content.ibbBone,
                        index: 1,
                        position: { y: 28 },
                        scale: 0.5
                     })
                  ]
               });
               break;
            case 1:
               xt = new CosmosSprite({
                  frames: [ content.ibbRedspear ],
                  scale: { x: 2 },
                  rotation: 90,
                  anchor: 0
               });
               break;
            case 2:
               xt = new CosmosObject({
                  objects: CosmosUtils.populate(
                     6,
                     index =>
                        new CosmosAnimation({
                           scale: 1 / 2,
                           resources: content.ibbSmolbol,
                           anchor: 0,
                           active: true,
                           position: { y: (-2.5 + index) * 10 }
                        })
                  )
               });
               break;
            case 3:
               xt = new CosmosObject({
                  objects: CosmosUtils.populate(
                     6,
                     index =>
                        new CosmosAnimation({
                           resources: content.ibbLightning,
                           anchor: 0,
                           position: { y: (-2.5 + index) * 10 }
                        })
                  )
               });
               break;
         }
         xt.position.set(battler.box.position.add(30 * side, 0));
         renderer.attach('menu', xt);
         renderer.pause(66).then(async () => {
            xt.alpha.value = 0;
            await renderer.pause(66);
            xt.alpha.value = 1;
         });
         await renderer.pause(300);
         sounds.bell.instance(renderer);
         const d60 = battler.box.position.add(60 * side, 0);
         pellets.position.modulate(renderer, 700, d60, d60);
         pellets.alpha.modulate(renderer, 500, 0).then(() => {
            renderer.detach('menu', pellets);
         });
         await renderer.pause(200);
         await xt.alpha.modulate(renderer, 500, 0);
         renderer.detach('menu', xt);
      }
   }
};

export default patterns;

CosmosUtils.status(`LOAD MODULE: COMMON PATTERNS (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
