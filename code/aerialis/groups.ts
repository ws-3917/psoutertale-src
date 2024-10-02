import { Rectangle } from 'pixi.js';
import text from '../../languages/default/text/aerialis';
import { autoMusic, defaultSetup, endMusic, epiphany, screenCheck, spareFlee, standardMusic } from '../common/api';
import commonOpponents from '../common/opponents';
import commonPatterns from '../common/patterns';
import { content, filters, inventories, music, sounds } from '../systems/assets';
import { events, game, renderer, rng, speech } from '../systems/core';
import { battler, header, world } from '../systems/framework';
import { OutertaleGroup, OutertaleOpponent } from '../systems/outertale';
import { SAVE } from '../systems/save';
import {
   CosmosAnimation,
   CosmosInventory,
   CosmosMath,
   CosmosPointSimple,
   CosmosSprite,
   CosmosText,
   CosmosUtils
} from '../systems/storyteller';
import opponents, { fancyIntro, graphGen, selectMTT } from './opponents';
import patterns from './patterns';

export async function switchColor (orange = false) {
   const mtt31 = CosmosUtils.populate(2, ind1 => {
      const e = ind1 * 2 - 1;
      return new CosmosAnimation({
         position: { y: 240, x: 160 + e * 50 },
         anchor: { x: 0 },
         metadata: { sparkle: false, flash: false },
         resources: content.ibbExTiny3,
         velocity: { y: -4 },
         scale: 0.5
      }).on('tick', async function () {
         if (this.position.y < 0) {
            renderer.detach('menu', this);
         } else if (this.position.y < 144) {
            this.velocity.y > -4 && (this.velocity.y -= 0.2);
         } else if (this.position.y < 164) {
            if (!this.metadata.sparkle) {
               this.metadata.sparkle = true;
               this.enable();
               await renderer.when(() => this.index === 2);
               const amount = 7;
               const spread = 0.2;
               const bvalue = ((amount - 1) * spread) / -2;
               sounds.sparkle.instance(renderer).rate.value = 0.69; // funni
               renderer.attach(
                  'menu',
                  ...CosmosUtils.populate(amount, ind2 => {
                     return new CosmosAnimation({
                        active: true,
                        resources: content.ibbExShine,
                        anchor: 0,
                        position: this,
                        velocity: {
                           x: e * -CosmosMath.remap(Math.random(), 0.8, 1.2),
                           y: bvalue + ind2 * spread
                        }
                     }).on('tick', function () {
                        this.alpha.value *= 0.95;
                        screenCheck(this, 10) && renderer.detach('menu', this);
                     });
                  })
               );
            }
         } else if (this.position.y < 200) {
            this.velocity.y < -1 && (this.velocity.y += 0.2);
         }
      });
   });
   renderer.attach('menu', ...mtt31);
   await renderer.when(() => mtt31[0].metadata.sparkle && mtt31[1].metadata.sparkle);
   await renderer.pause(3500);
   battler.SOUL.metadata.color = orange ? 'orange' : 'yellow';
   const shad = new CosmosAnimation({
      anchor: 0,
      resources: orange ? content.ibuOrangeSOUL : content.ibuYellowSOUL,
      scale: 0.5,
      alpha: 0.8
   });
   battler.SOUL.attach(shad);
   sounds.bell.instance(renderer);
   await Promise.all([ shad.scale.modulate(renderer, 500, 1, 1), shad.alpha.modulate(renderer, 500, 1, 0) ]);
   battler.SOUL.detach(shad);
   await renderer.pause(850);
}

export function spawnAlphys (p: CosmosPointSimple) {
   let isThumbsup = false;
   const cc = battler.volatile[0].container;
   const ar = (cc.metadata.ar = new CosmosAnimation({
      anchor: { x: 0, y: 1 },
      position: { x: -1, y: 1 },
      metadata: { thumbsup: false },
      resources: content.ibcAlphysHead
   })).on('tick', async function () {
      if (this.metadata.thumbsup) {
         if (!isThumbsup) {
            isThumbsup = true;
            let a = 0;
            while (this.metadata.thumbsup) {
               this.index = [ 13, 14 ][a];
               a = 1 - a;
               await renderer.pause(233);
            }
         }
      } else if (isThumbsup) {
         isThumbsup = false;
      }
   });
   const arBody = (cc.metadata.arBody = new CosmosAnimation({
      anchor: { x: 0, y: 1 },
      priority: -1,
      position: p,
      resources: content.ibcAlphysBody,
      objects: [ ar ]
   }).on('tick', function () {
      this.index = [ 13, 14 ].includes(ar.index) ? ar.index - 11 : [ 9, 11 ].includes(ar.index) ? 1 : 0;
   }));
   battler.overlay.objects.unshift(arBody);
   battler.garbage.push([ battler.overlay, arBody ]);
   return ar;
}

const groups = {
   glyde: new OutertaleGroup({
      assets: new CosmosInventory(
         content.ibcAlphysHead,
         content.ibcAlphysBody,
         content.amWrongenemy,
         inventories.avMettaton
      ),
      flee: false,
      music: music.wrongenemy,
      init () {
         if (!world.badder_lizard) {
            spawnAlphys({ x: -25, y: 122 });
         }
         battler.SOUL.alpha.value = 0;
         battler.alpha.value = 1;
         renderer.pause(450).then(async () => {
            await battler.monster(false, { x: 195, y: 13 }, battler.bubbles.twinkly, ...text.b_opponent_glyde.intro1);
            await renderer.pause(250);
            const mettaAnim = new CosmosAnimation({
               resources: content.ibcMettatonBody,
               anchor: { x: 0 },
               rotation: 45,
               position: { x: -30 }
            });
            renderer.attach('menu', mettaAnim);
            await mettaAnim.position.step(renderer, 2, { x: 5 });
            await battler.monster(false, { x: 5, y: 40 }, battler.bubbles.twinkly, ...text.b_opponent_glyde.intro2a());
            await battler.monster(false, { x: 195, y: 13 }, battler.bubbles.twinkly, ...text.b_opponent_glyde.intro2b);
            await renderer.pause(650);
            await battler.monster(false, { x: 5, y: 40 }, battler.bubbles.twinkly, ...text.b_opponent_glyde.intro2c);
            await renderer.pause(250);
            mettaAnim.position.step(renderer, 2, { x: -20 }).then(() => {
               renderer.detach('menu', mettaAnim);
            });
            await renderer.pause(1450);
            await battler.monster(false, { x: 195, y: 13 }, battler.bubbles.twinkly, ...text.b_opponent_glyde.intro3);
            battler.status = () => text.b_opponent_glyde.status1;
            battler.resume();
         });
         return false;
      },
      opponents: [ [ opponents.glyde, { x: 160, y: 80 } ] ]
   }),
   mettaton1: new OutertaleGroup({
      assets: new CosmosInventory(
         content.ibcAlphysHead,
         content.ibcAlphysBody,
         content.amSexyrectangle,
         content.ibbExTiny3,
         content.ibbExShine,
         content.asSparkle,
         content.asBell
      ),
      init () {
         battler.flee = false;
         battler.status = () => text.b_opponent_mettaton1.status1();
         const mus = music.sexyrectangle.instance(renderer);
         battler.music = mus;
         if (SAVE.data.n.plot < 67) {
            spawnAlphys({ x: 265, y: 122 }).index = SAVE.data.n.state_foundry_undyne > 0 ? 15 : 0;
            return true;
         } else {
            const container = battler.volatile[0].container;
            const body = container.objects[0] as CosmosAnimation;
            const arms = body.objects[1] as CosmosAnimation;
            battler.box.size.set(40);
            battler.SOUL.position.set(battler.box);
            game.movement = true;
            battler.alpha.value = 1;
            renderer.pause(850).then(async () => {
               arms.use(content.ibcMettatonArmsNoticard);
               header('x1').then(() => {
                  body.use(content.ibcMettatonBodySOUL);
                  body.enable();
               });
               await battler.monster(
                  true,
                  container.position.add(-35, -70),
                  battler.bubbles.twinkly2,
                  ...text.b_opponent_mettaton1.yellow1()
               );
               await switchColor();
               body.use(content.ibcMettatonBody);
               arms.use(content.ibcMettatonArmsWhatevs);
               body.reset();
               await battler.monster(
                  true,
                  battler.volatile[0].container.position.add(-35, -70),
                  battler.bubbles.twinkly2,
                  ...text.b_opponent_mettaton1.yellow2()
               );
               arms.use(content.ibcMettatonArmsWelcome);
               game.movement = false;
               battler.SOUL.alpha.value = 0;
               await battler.box.size.modulate(renderer, 300, { x: 282.5, y: 65 });
               battler.resume();
            });
            return false;
         }
      },
      handler () {
         battler.alive.length !== 0 && battler.resume();
      },
      opponents: [ [ opponents.mettaton1, { x: 160, y: 115 } ] ]
   }),
   mettaton2: new OutertaleGroup({
      assets: new CosmosInventory(
         content.asNode,
         content.amArms,
         content.amArmsIntro,
         content.ibcMettatonNeoArm1,
         content.ibcMettatonNeoArm2,
         content.ibcMettatonNeoBody,
         content.ibcMettatonNeoHead,
         content.ibcMettatonNeoLegs,
         content.ibcMettatonNeoWings,
         content.ibbBomb,
         content.ibbBoxBullet,
         content.ibbBoxBulletUp,
         content.ibbNeoRocket,
         content.ibbNeoTiny1,
         content.ibuYellowSOUL,
         content.ibuYellowShot,
         content.asPrebomb,
         content.asBomb,
         content.asBoom,
         content.asSuperstrike,
         content.ibcNapstablookBattleLookdown,
         content.ibcNapstablookBattleLookforward,
         content.ibcNapstablookBattleLookdeath,
         content.ibbMeteor,
         content.asBurst,
         content.ibbWarningreticle,
         content.ibbFrogstar,
         content.ibbNeoTiny1a,
         content.asFrypan,
         content.ibbExShine,
         content.ibbBigblaster,
         content.ibbArmBullet,
         content.ibuOrangeSOUL,
         content.ibcAsrielCutscene2,
         content.avNapstablook,
         content.ibbShield,
         content.asSparkle,
         content.asBell,
         content.ibcMettatonNeoHeart,
         content.asGonerCharge,
         content.asSpecout,
         content.avAsriel3,
         content.ibbDummyknife,
         content.ibbNeoTiny2,
         content.ibbExTiny3,
         content.ibbExBombBlastCore,
         content.ibbExBombBlastRay,
         content.asSwallow,
         content.asUpgrade,
         content.ibbLaserEmitter
      ),
      init () {
         opponents.mettaton2.df = 0;
         battler.volatile[0].hp = opponents.mettaton2.hp = 30000;
         music.armsIntro.instance(renderer).source!.addEventListener('ended', () => {
            battler.music = music.arms.instance(renderer, 6.76);
         });
         function ti () {
            const azzy_neo = SAVE.flag.n.azzy_neo++;
            battler.status = () => text.b_opponent_mettaton2.status1(azzy_neo);
            const timeIndicator = new CosmosText({
               area: new Rectangle(0, 0, 640, 30 * 2),
               fontFamily: content.fDeterminationSans,
               fontSize: 16,
               anchor: { x: 0, y: 1 },
               position: { x: 160 },
               priority: 1,
               metadata: {
                  ex () {
                     renderer.attach('menu', timeIndicator);
                     timeIndicator.position.modulate(
                        renderer,
                        400,
                        timeIndicator.position.add(0, 16),
                        timeIndicator.position.add(0, 16)
                     );
                  },
                  async re () {
                     await timeIndicator.position.modulate(
                        renderer,
                        400,
                        timeIndicator.position.subtract(0, 16),
                        timeIndicator.position.subtract(0, 16)
                     );
                     renderer.detach('menu', timeIndicator);
                  }
               },
               fill: 0xffffff,
               filters: [ filters.outline ]
            }).on('tick', function () {
               const ap = 1 - (battler.volatile[0].vars.ap ?? 0);
               this.content = text.b_opponent_mettaton2.shieldIndicator.replace('$(x)', Math.ceil(ap * 100).toString());
               if (ap <= 0) {
                  this.fill = 0x3f3f3f;
               } else if (ap < 1 / 4) {
                  this.fill = 0xff0000;
               }
            });
            battler.volatile[0].container.metadata.ti = timeIndicator;
            timeIndicator.metadata.ex();
         }
         if (SAVE.flag.n.azzy_neo < 1) {
            battler.box.size.set(40);
            battler.SOUL.position.set(battler.box);
            game.movement = true;
            battler.alpha.value = 1;
            renderer.pause(450).then(async () => {
               await switchColor(true);
               const spr = battler.volatile[0].container.objects[0];
               await spr.position.modulate(renderer, 600, { x: spr.position.x - 30 });
               speech.emoters.mettaton = spr;
               await battler.monster(
                  false,
                  { x: 180, y: 25 },
                  battler.bubbles.twinkly,
                  ...text.b_opponent_mettaton2.neointro
               );
               await spr.position.modulate(renderer, 600, { x: spr.position.x + 30 });
               game.movement = false;
               battler.SOUL.alpha.value = 0;
               await battler.box.size.modulate(renderer, 300, { x: 282.5, y: 65 });
               ti();
               battler.resume();
            });
            return false;
         } else {
            ti();
            battler.SOUL.metadata.color = 'orange';
            return true;
         }
      },
      async handler (c, t, v) {
         if (spareFlee(c)) {
            return;
         }
         if (battler.alive.length !== 0) {
            await battler.resume(async () => {
               if (world.genocide) {
                  const timeIndicator = battler.volatile[0].container.metadata.ti;
                  timeIndicator?.metadata.re();
                  await patterns.mettaton3(++v.vars.neoTurns);
                  battler.SOUL.alpha.value = 0;
                  timeIndicator?.metadata.ex();
                  await Promise.all([
                     battler.box.position.modulate(renderer, 300, { y: 192.5 - 65 / 2 }),
                     battler.box.size.modulate(renderer, 300, { x: 282.5, y: 65 })
                  ]);
               }
            });
         } else {
            endMusic();
         }
      },
      opponents: [ [ opponents.mettaton2, { x: 160, y: 115 } ] ]
   }),
   mettaton3: new OutertaleGroup({
      flee: false,
      assets: new CosmosInventory(content.ibbExTiny3, content.ibbExShine, content.asSparkle, content.asBell),
      init () {
         battler.SOUL.metadata.color = 'yellow';
         battler.overlay.detach(battler.volatile[0].container);
         battler.volatile[0].alive = false;
         battler.status = () => text.b_opponent_mettaton2.statusX();
         music.legsIntro.instance(renderer).source!.addEventListener('ended', () => {
            battler.music = music.legs.instance(renderer, 6.48);
         });
         const graph = graphGen();
         battler.overlay.attach(graph);
         battler.volatile[0].vars.graph = graph;
         events.on('select', selectMTT);
         events.fire('choice', { type: 'none' });
         return true;
      },
      handler () {
         battler.alive.length !== 0 && battler.resume();
      },
      opponents: [
         [ new OutertaleOpponent(), { x: 0, y: 0 } ],
         [ opponents.mettaton2, { x: 160, y: 120 } ]
      ]
   }),
   mettaton4: new OutertaleGroup({
      flee: false,
      assets: new CosmosInventory(
         content.amGloves,
         content.amGlovesFinal,
         content.amGlovesIntro,
         content.asGonerCharge,
         content.ibbExShine,
         content.ibbNeoTiny1a,
         content.ibbNeoTiny1,
         content.asFrypan,
         content.ibbScissors,
         content.asBell,
         content.ibbGunarm,
         content.ibbLightning
      ),
      init () {
         battler.alpha.value = 0;
         const vola = battler.volatile[0];
         battler.overlay.detach(vola.container);
         vola.alive = false;
         battler.SOUL.metadata.color = 'yellow';
         fancyIntro().then(() => {
            battler.SOUL.alpha.value = 1;
            battler.status = () => text.b_opponent_mettaton2.statusX();
            music.glovesIntro.instance(renderer).source!.addEventListener('ended', () => {
               battler.music = music.gloves.instance(renderer, (60 / 158) * 16);
            });
            events.fire('choice', { type: 'none' });
            battler.resume();
         });
         return false;
      },
      handler () {
         battler.alive.length !== 0 && battler.resume();
      },
      opponents: [ [ new OutertaleOpponent(), { x: 0, y: 0 } ] ]
   }),
   mettaton5: new OutertaleGroup({
      flee: false,
      assets: new CosmosInventory(
         content.amGloves,
         content.amGlovesFinal,
         content.amGlovesIntro,
         content.asGonerCharge,
         content.ibbExShine,
         content.ibbNeoTiny1a,
         content.ibbNeoTiny1,
         content.asFrypan,
         content.ibbScissors,
         content.asBell,
         content.ibbGunarm,
         content.ibbLightning
      ),
      init () {
         battler.SOUL.metadata.color = 'yellow';
         battler.overlay.detach(battler.volatile[0].container);
         battler.volatile[0].alive = false;
         const volatile2 = battler.volatile[1];
         volatile2.hp = opponents.mettaton2.hp = 400;
         const spr = volatile2.container.objects[0] as CosmosSprite;
         spr.metadata.leftLegIndex = 5;
         spr.metadata.rightLegIndex = 5;
         spr.metadata.leftArmIndex = 8;
         spr.metadata.rightArmIndex = 8;
         const head = volatile2.container.objects[0].objects[6] as CosmosSprite;
         head.index = 23;
         battler.status = () => text.b_opponent_mettaton2.statusX();
         music.glovesIntro.instance(renderer).source!.addEventListener('ended', () => {
            battler.music = music.gloves.instance(renderer, (60 / 158) * 16);
         });
         events.fire('choice', { type: 'none' });
         return true;
      },
      handler () {
         battler.alive.length !== 0 && battler.resume();
      },
      opponents: [
         [ new OutertaleOpponent(), { x: 0, y: 0 } ],
         [ opponents.mettaton2, { x: 160, y: 120 } ]
      ]
   }),
   rg: new OutertaleGroup({
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
         content.amConfession,
         content.amBattle3,
         content.ibbStardrop,
         content.ibbFrogstar,
         content.ibbHaymaker,
         content.asStab,
         content.asBell,
         content.asAppear,
         content.ibbFalchion,
         content.asSword,
         content.asGrab
      ),
      init () {
         battler.multitext.active = true;
         battler.flee = false;
         battler.grid = content.ibuGrid1;
         battler.status = () => text.b_group_aerialis.rg();
         const mus = music.battle3.instance(renderer);
         world.bad_lizard > 1 && (mus.rate.value *= 0.9);
         battler.music = mus;
         const vars = (battler.volatile[0].vars = {
            flirts: 0,
            progress: 0,
            glove1: true,
            glove2: true,
            totalTugScore: 0,
            pull1 () {
               if (vars.glove1) {
                  vars.glove1 = false;
                  sounds.grab.instance(renderer);
                  const x = battler.volatile[0].container.objects[0].objects.filter(
                     obj => obj.metadata.part === 'fist'
                  )[0] as CosmosSprite;
                  x.frames[0] = content.ibcRoyalguardCatFist;
                  x.position.x = -40;
                  x.metadata.iY = -23;
               }
            },
            pull2 () {
               if (vars.glove2) {
                  vars.glove2 = false;
                  sounds.grab.instance(renderer);
                  const x = battler.volatile[1].container.objects[0].objects.filter(
                     obj => obj.metadata.part === 'fist'
                  )[0] as CosmosSprite;
                  x.frames[0] = content.ibcRoyalguardBugFist;
                  x.position.x = -37.5;
                  x.metadata.iY = -27;
               }
            },
            get killed () {
               return battler.alive.length < 2 ? 1 - battler.volatile.indexOf(battler.alive[0]) : -1;
            }
         });
         return true;
      },
      handler: (() => {
         function monster1 (...lines: string[]) {
            return battler.monster(false, { x: 120, y: 12 }, battler.bubbles.napstablook, ...lines);
         }
         function monster2 (...lines: string[]) {
            return battler.monster(false, { x: 140, y: 12 }, battler.bubbles.napstablook2, ...lines);
         }
         return async function (choice, target, volatile) {
            let cf = false; // confession
            let gr = false; // tug sequence
            let t1 = null as string[] | null; // talk 1
            let t2 = null as string[] | null; // talk 2
            let t3 = null as (() => string[]) | null; // statustext
            const vars = battler.volatile[0].vars;
            let killer = false;
            switch (choice.type) {
               case 'fight':
                  volatile.sparable && battler.music?.stop();
                  if (
                     await battler.attack(
                        volatile,
                        volatile.sparable || vars.progress === 2
                           ? { power: 0, operation: 'multiply' }
                           : { power: choice.score }
                     )
                  ) {
                     opponents.rg01.bullyable = false;
                     opponents.rg02.bullyable = false;
                     SAVE.data.n.state_aerialis_royalguards = 1;
                     for (const e of battler.alive) {
                        e.sparable = false;
                     }
                     killer = true;
                  } else {
                     if (battler.hurt.length === 2) {
                        opponents.rg01.bullyable = true;
                        opponents.rg02.bullyable = true;
                     }
                  }
                  break;
               case 'act':
                  switch (choice.act) {
                     case 'flirt':
                        if (world.bad_lizard > 1) {
                           await battler.human(
                              ...[ text.b_opponent_rg01.act_flirt_nada, text.b_opponent_rg02.act_flirt_nada ][target]
                           );
                        } else if (volatile.sparable) {
                           await battler.human(
                              ...[ text.b_opponent_rg01.act_flirt_happy, text.b_opponent_rg02.act_flirt_happy ][target]
                           );
                           if (target === 0) {
                              SAVE.data.b.flirt_rg03 = true;
                           } else {
                              SAVE.data.b.flirt_rg04 = true;
                           }
                           volatile.flirted = true;
                        } else {
                           if (vars.killed === -1) {
                              const r = rng.dialogue.int(4);
                              if (vars.progress === 1) {
                                 t1 = [ text.b_opponent_rg01.flirtTalk1, text.b_opponent_rg01.flirtTalk2 ][r % 2];
                                 t2 = [ text.b_opponent_rg02.flirtTalk1, text.b_opponent_rg02.flirtTalk2 ][r % 2];
                                 t3 = () => text.b_opponent_rg01.flirtStatus;
                              } else {
                                 t1 = [ text.b_opponent_rg01.flirtTalkNervy1, text.b_opponent_rg01.flirtTalkNervy2 ][
                                    r % 2
                                 ];
                                 t2 = [ text.b_opponent_rg02.flirtTalkNervy1, text.b_opponent_rg02.flirtTalkNervy2 ][
                                    r % 2
                                 ];
                                 t3 = () => text.b_opponent_rg01.flirtStatusNervy;
                              }
                           } else if (vars.killed === 0) {
                              t2 = text.b_opponent_rg02.flirtTalkLone;
                           } else {
                              t1 = text.b_opponent_rg01.flirtTalkLone;
                           }
                           await battler.human(
                              ...[ text.b_opponent_rg01.act_flirt, text.b_opponent_rg02.act_flirt ][target]
                           );
                        }
                        break;
                     case 'tug':
                        if (volatile.sparable) {
                           await battler.human(
                              ...[ text.b_opponent_rg01.act_tug_happy, text.b_opponent_rg02.act_tug_happy ][target]
                           );
                        } else if (vars.killed === -1) {
                           if (target === 0) {
                              t1 = [
                                 text.b_opponent_rg01.tugTalk1,
                                 text.b_opponent_rg01.tugTalk2,
                                 text.b_opponent_rg01.tugTalk3,
                                 text.b_opponent_rg01.tugTalk4
                              ][rng.dialogue.int(4)];
                              t2 = text.b_opponent_rg02.tugTalkLone;
                              t3 = () => text.b_opponent_rg01.tugStatus;
                              await battler.human(...text.b_opponent_rg01.act_tug);
                           } else {
                              t1 = text.b_opponent_rg01.tugTalkLone;
                              if (vars.glove2) {
                                 t2 = [
                                    text.b_opponent_rg02.tugTalk1,
                                    text.b_opponent_rg02.tugTalk2,
                                    text.b_opponent_rg02.tugTalk3,
                                    text.b_opponent_rg02.tugTalk4
                                 ][rng.dialogue.int(4)];
                                 t3 = () => text.b_opponent_rg02.tugStatus;
                                 await battler.human(...text.b_opponent_rg02.act_tug);
                                 gr = true;
                              } else {
                                 t2 = text.b_opponent_rg02.holdTalk;
                                 t3 = () => text.b_opponent_rg02.holdStatus;
                                 await battler.human(...text.b_opponent_rg02.act_tug_hold);
                              }
                           }
                        } else if (vars.killed === 0) {
                           t2 = text.b_opponent_rg02.tugTalkLone;
                           if (vars.glove2) {
                              if (vars.progress < 2) {
                                 t3 = () => text.b_opponent_rg02.tugStatusLone;
                              }
                              await battler.human(...text.b_opponent_rg02.act_tug_lone);
                              vars.pull2();
                           } else {
                              await battler.human(...text.b_opponent_rg02.act_tug_hold_lone);
                           }
                        } else {
                           t1 = text.b_opponent_rg01.tugTalkLone;
                           if (vars.progress < 2) {
                              t3 = () => text.b_opponent_rg01.tugStatusLone;
                           }
                           await battler.human(...text.b_opponent_rg01.act_tug_lone);
                        }
                        break;
                     case 'whisper':
                        if (vars.killed === -1) {
                           if (target === 0) {
                              if (vars.progress === 1) {
                                 await battler.human(...text.b_opponent_rg01.act_whisper);
                                 cf = true;
                              } else {
                                 await battler.human(...text.b_opponent_rg01.act_whisper_alt);
                              }
                           } else if (vars.progress < 2) {
                              await battler.human(...text.b_opponent_rg02.act_whisper);
                           } else {
                              await battler.human(...text.b_opponent_rg02.act_whisper_alt);
                           }
                        } else if (target === 0) {
                           await battler.human(...text.b_opponent_rg01.act_whisper_alt);
                        } else {
                           await battler.human(...text.b_opponent_rg02.act_whisper_alt);
                        }
                        break;
                  }
                  break;
               case 'item':
                  if (choice.item === 'epiphany') {
                     await epiphany(
                        target,
                        volatile,
                        160,
                        { result: false },
                        battler.bubbles.twinkly,
                        () => volatile.container.position.add(30, -52),
                        (target === 0 ? text.b_opponent_rg01.epiphaNOPE : text.b_opponent_rg02.epiphaNOPE)()
                     );
                  }
                  break;
               case 'spare':
                  if (!volatile.sparable && !battler.bullied.includes(volatile)) {
                     break;
                  }
                  battler.spare();
                  break;
            }
            if (battler.alive.length !== 0) {
               if (t1 === null && t2 === null) {
                  const r = rng.dialogue.int(4);
                  if (vars.killed === -1) {
                     if (vars.progress < 1) {
                        t1 = [
                           text.b_opponent_rg01.randTalk1,
                           text.b_opponent_rg01.randTalk2,
                           text.b_opponent_rg01.randTalk3,
                           text.b_opponent_rg01.randTalk4
                        ][r]();
                        t2 = [
                           text.b_opponent_rg02.randTalk1,
                           text.b_opponent_rg02.randTalk2,
                           text.b_opponent_rg02.randTalk3,
                           text.b_opponent_rg02.randTalk4
                        ][r]();
                     } else if (vars.progress < 2) {
                        t1 = [
                           text.b_opponent_rg01.nervyTalk1,
                           text.b_opponent_rg01.nervyTalk2,
                           text.b_opponent_rg01.nervyTalk3,
                           text.b_opponent_rg01.nervyTalk4
                        ][r];
                        t2 = [
                           text.b_opponent_rg02.nervyTalk1,
                           text.b_opponent_rg02.nervyTalk2,
                           text.b_opponent_rg02.nervyTalk3,
                           text.b_opponent_rg02.nervyTalk4
                        ][r];
                     } else {
                        t1 = [
                           text.b_opponent_rg01.happyTalk1,
                           text.b_opponent_rg01.happyTalk2,
                           text.b_opponent_rg01.happyTalk3,
                           text.b_opponent_rg01.happyTalk4
                        ][r];
                        t2 = [
                           text.b_opponent_rg02.happyTalk1,
                           text.b_opponent_rg02.happyTalk2,
                           text.b_opponent_rg02.happyTalk3,
                           text.b_opponent_rg02.happyTalk4
                        ][r];
                     }
                  } else if (vars.progress < 2) {
                     if (vars.killed === 0) {
                        t2 = [
                           text.b_opponent_rg02.randTalkLone1(),
                           text.b_opponent_rg02.randTalkLone2(),
                           text.b_opponent_rg02.randTalkLone3(),
                           text.b_opponent_rg02.randTalkLone4()
                        ][r];
                     } else {
                        t1 = [
                           text.b_opponent_rg01.randTalkLone1,
                           text.b_opponent_rg01.randTalkLone2,
                           text.b_opponent_rg01.randTalkLone3,
                           text.b_opponent_rg01.randTalkLone4
                        ][r]();
                     }
                  } else {
                     if (vars.killed === 0) {
                        t2 = [
                           text.b_opponent_rg02.horrorTalk1,
                           text.b_opponent_rg02.horrorTalk2,
                           text.b_opponent_rg02.horrorTalk3,
                           text.b_opponent_rg02.horrorTalk4
                        ][r];
                     } else {
                        t1 = [
                           text.b_opponent_rg01.horrorTalk1,
                           text.b_opponent_rg01.horrorTalk2,
                           text.b_opponent_rg01.horrorTalk3,
                           text.b_opponent_rg01.horrorTalk4
                        ][r];
                     }
                  }
               }
               let generic = true;
               if (t3 === null) {
                  if (vars.killed === -1) {
                     if (vars.progress < 1) {
                        if (world.goatbro) {
                           t3 = () => text.b_group_aerialis.rg();
                        } else {
                           t3 = [
                              () => text.b_opponent_rg01.randStatus1(),
                              () => text.b_opponent_rg01.randStatus2(),
                              () => text.b_opponent_rg01.randStatus3(),
                              () => text.b_opponent_rg01.randStatus4(),
                              () => text.b_opponent_rg01.randStatus5()
                           ][rng.dialogue.int(5)];
                        }
                     } else if (vars.progress < 2) {
                        t3 = () => text.b_opponent_rg01.nervyStatus;
                     } else {
                        t3 = () => text.b_opponent_rg01.happyStatus;
                        generic = false;
                     }
                  } else if (vars.progress < 2) {
                     if (vars.killed === 0) {
                        t3 = () => text.b_opponent_rg02.randStatusLone();
                        killer && (generic = false);
                     } else {
                        t3 = () => text.b_opponent_rg01.randStatusLone();
                        killer && (generic = false);
                     }
                  } else {
                     t3 = () => text.b_opponent_rg01.horrorStatus;
                     generic = false;
                  }
               }
               if (generic && battler.hurt.includes(volatile)) {
                  if (target === 0) {
                     t3 = () => text.b_opponent_rg01.dangerStatus();
                  } else {
                     t3 = () => text.b_opponent_rg02.dangerStatus();
                  }
               }
               t1 && (await monster1(...t1));
               t2 && (await monster2(...t2));
               await battler.box.size.modulate(renderer, 300, { x: 80, y: 65 });
               await Promise.all([
                  battler.box.size.modulate(renderer, 450, { y: 160 }),
                  battler.box.position.modulate(renderer, 450, { y: 100 })
               ]);
               battler.SOUL.position.set(battler.box);
               battler.SOUL.alpha.value = 1;
               game.movement = true;
               const tugScore = await patterns.rg(
                  volatile.sparable,
                  vars.progress,
                  vars.killed,
                  cf ? 'cf' : gr ? 'gr' : null,
                  vars.totalTugScore
               );
               battler.SOUL.alpha.value = 0;
               game.movement = false;
               await Promise.all([
                  battler.box.size.modulate(renderer, 450, { y: 65 }),
                  battler.box.position.modulate(renderer, 450, { y: 192.5 - 65 / 2 })
               ]);
               if (vars.progress < 1) {
                  vars.totalTugScore += tugScore;
                  if (1 <= vars.totalTugScore) {
                     await monster2(...text.b_opponent_rg02.tugShock);
                     await renderer.pause(850);
                     vars.pull2();
                     await renderer.pause(850);
                     await monster1(...text.b_opponent_rg01.tugShock);
                     vars.progress = 1;
                     t3 = () => text.b_opponent_rg02.tugSuccessStatus;
                     battler.volatile[0].container.objects[0].metadata.timefactor = 1.5;
                     battler.volatile[0].container.objects[0].metadata.spew = true;
                     battler.music?.rate.modulate(renderer, 500, 1.15);
                  }
               } else if (cf) {
                  await battler.music?.rate.modulate(renderer, 1500, 1.4);
                  battler.music?.stop();
                  await renderer.pause(1000);
                  battler.volatile[0].container.objects[0].metadata.timefactor = 1;
                  battler.volatile[0].container.objects[0].metadata.spew = false;
                  await monster1(...text.b_opponent_rg01.confess1);
                  await renderer.pause(1000);
                  await monster2(...text.b_opponent_rg01.confess2);
                  await renderer.pause(1200);
                  await monster1(...text.b_opponent_rg01.confess3);
                  await renderer.pause(650);
                  vars.pull1();
                  await renderer.pause(1350);
                  await monster2(...text.b_opponent_rg01.confess4);
                  await monster1(...text.b_opponent_rg01.confess5);
                  battler.music = music.confession.instance(renderer);
                  battler.volatile[1].container.objects[0].metadata.timefactor = 1.5;
                  battler.volatile[1].container.objects[0].metadata.spew = true;
                  await renderer.pause(1650);
                  await monster2(...text.b_opponent_rg01.confess6);
                  await renderer.pause(850);
                  battler.volatile[1].container.objects[0].metadata.timefactor = 1;
                  battler.volatile[1].container.objects[0].metadata.spew = false;
                  await monster1(...text.b_opponent_rg01.confess7);
                  battler.volatile[1].container.objects[0].metadata.timefactor = 0.5;
                  await renderer.pause(950);
                  await monster2(...text.b_opponent_rg01.confess8);
                  battler.volatile[0].container.objects[0].metadata.timefactor = 0.5;
                  await renderer.pause(1650);
                  await monster1(...text.b_opponent_rg01.confess9);
                  await monster2(...text.b_opponent_rg01.confess10);
                  await monster1(...text.b_opponent_rg01.confess11);
                  for (const v of battler.volatile) {
                     v.sparable = true;
                  }
                  vars.progress = 2;
                  t3 = () => text.b_opponent_rg01.happyStatus;
               }
               await battler.box.size.modulate(renderer, 300, { x: 282.5 });
               battler.status = t3;
               battler.resume();
            } else {
               battler.music?.stop();
            }
         };
      })(),
      opponents: [
         [ opponents.rg01, { x: 80, y: 104 } ],
         [ opponents.rg02, { x: 240, y: 104 } ]
      ]
   }),
   pyrope: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1, content.amBattle2),
      id: 30,
      init () {
         battler.grid = content.ibuGrid1;
         battler.status = () => (world.goatbro ? text.b_opponent_pyrope.genoStatus : text.b_opponent_pyrope.status1);
         standardMusic();
         return true;
      },
      handler: defaultSetup(() => {
         patterns.pyrope(false);
         return battler.turnTimer(9000);
      }),
      opponents: [ [ opponents.pyrope, { x: 135, y: 120 } ] ]
   }),
   perigee: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1, content.amBattle2),
      id: 31,
      init () {
         battler.grid = content.ibuGrid1;
         battler.status = () => (world.goatbro ? text.b_opponent_perigee.genoStatus : text.b_opponent_perigee.status1);
         standardMusic();
         return true;
      },
      handler: defaultSetup(
         () => {
            patterns.perigee();
            return battler.turnTimer(9000);
         },
         { x: 100, y: 140 },
         true
      ),
      opponents: [ [ opponents.perigee, { x: 135, y: 120 } ] ]
   }),
   spacetopTsundere: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1, content.amBattle2),
      id: 32,
      init () {
         battler.multitext.active = true;
         battler.grid = content.ibuGrid1;
         battler.status = () => text.b_group_aerialis.spacetopTsundere();
         standardMusic();
         return true;
      },
      handler: defaultSetup(async (c, t, v) => {
         autoMusic();
         const spacetop = battler.opponents.includes(commonOpponents.spacetop);
         const tsundere = battler.opponents.includes(opponents.tsundere);
         if (spacetop) {
            commonPatterns.spacetop();
         }
         if (tsundere) {
            patterns.tsundere(spacetop, v.vars.greenmode);
         }
         await battler.turnTimer(9000);
         v.vars.groupDead ??= battler.alive.length;
         if (battler.alive.length < v.vars.groupDead) {
            v.vars.groupDead = battler.alive.length;
            battler.alive.length === 1 && (battler.status = () => text.b_group_aerialis.spacetopTsundereX(spacetop));
         }
      }),
      opponents: [
         [ commonOpponents.spacetop, { x: 85, y: 120 } ],
         [ opponents.tsundere, { x: 185, y: 57.5 } ]
      ]
   }),
   pyropeTsundere: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1, content.amBattle2),
      id: 33,
      init () {
         battler.multitext.active = true;
         battler.grid = content.ibuGrid1;
         battler.status = () => text.b_group_aerialis.pyropeTsundere();
         standardMusic();
         return true;
      },
      handler: defaultSetup(async (c, t, v) => {
         autoMusic();
         const pyrope = battler.opponents.includes(opponents.pyrope);
         const tsundere = battler.opponents.includes(opponents.tsundere);
         if (pyrope) {
            patterns.pyrope(tsundere);
         }
         if (tsundere) {
            patterns.tsundere(pyrope, v.vars.greenmode);
         }
         await battler.turnTimer(9000);
         v.vars.groupDead ??= battler.alive.length;
         if (battler.alive.length < v.vars.groupDead) {
            v.vars.groupDead = battler.alive.length;
            battler.alive.length === 1 && (battler.status = () => text.b_group_aerialis.pyropeTsundereX(pyrope));
         }
      }),
      opponents: [
         [ opponents.pyrope, { x: 85, y: 120 } ],
         [ opponents.tsundere, { x: 185, y: 57.5 } ]
      ]
   }),
   tsundere: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1, content.amBattle2),
      id: 34,
      init () {
         battler.grid = content.ibuGrid1;
         battler.status = () => text.b_opponent_tsundere.status1();
         standardMusic();
         return true;
      },
      handler: defaultSetup((c, t, v) => {
         patterns.tsundere(false, v.vars.greenmode);
         return battler.turnTimer(9000);
      }),
      opponents: [ [ opponents.tsundere, { x: 135, y: 57.5 } ] ]
   }),
   madjick: new OutertaleGroup({
      grid: content.ibuGrid2,
      flee: false,
      init () {
         battler.status = () => text.b_opponent_madjick.status1();
         return true;
      },
      opponents: [ [ opponents.madjick, { x: 160, y: 120 } ] ],
      handler: async (c, t, v) => {
         if (SAVE.data.b.a_state_hapstablook && battler.alive.length !== 0 && !SAVE.data.b.oops && !battler.assist) {
            battler.assist = true;
            battler.status = () => text.b_opponent_madjick.hint;
         }
         await defaultSetup(
            async (c, t, v) => {
               const attacktype = v.vars.attacktype;
               await patterns.madjick(attacktype, v.vars.crazy);
               if (attacktype === 1) {
                  const spr = v.container.objects[0].metadata.orb1 as CosmosSprite;
                  spr.active = false;
                  spr.metadata.gen = false;
               } else if (attacktype === 2) {
                  const spr = v.container.objects[0].metadata.orb2 as CosmosSprite;
                  spr.active = false;
                  spr.metadata.gen = false;
               }
            },
            { x: 120, y: 120 },
            true
         )(c, t, v);
      }
   }),
   knightknight: new OutertaleGroup({
      grid: content.ibuGrid2,
      flee: false,
      init () {
         battler.status = () => text.b_opponent_knightknight.status1();
         return true;
      },
      opponents: [ [ opponents.knightknight, { x: 160, y: 120 } ] ],
      handler: async (c, t, v) => {
         if (SAVE.data.b.a_state_hapstablook && battler.alive.length !== 0 && !SAVE.data.b.oops && !battler.assist) {
            battler.assist = true;
            battler.status = () => text.b_opponent_knightknight.hint;
         }
         await defaultSetup((c, t, v) => patterns.knightknight(v.vars.result === 3), { x: 100, y: 100 }, true)(c, t, v);
      }
   }),
   froggitexWhimsalot: new OutertaleGroup({
      grid: content.ibuGrid1,
      flee: false,
      init () {
         battler.multitext.active = true;
         battler.status = () => text.b_group_aerialis.froggitexWhimsalot();
         return true;
      },
      opponents: [
         [ opponents.froggitex, { x: 85, y: 120 } ],
         [ opponents.whimsalot, { x: 185, y: 80 } ]
      ],
      handler: defaultSetup(async () => {
         const whimmer = battler.opponents.includes(opponents.whimsalot);
         if (battler.alive.length > 1) {
            patterns.froggitex(1);
            patterns.whimsalot(1);
         } else if (whimmer) {
            patterns.whimsalot(0);
         } else {
            const px = patterns.froggitex(0);
            if (px) {
               await px;
               return;
            }
         }
         await battler.turnTimer(10000);
         const vars = battler.volatile[0].vars;
         vars.groupDead ??= 2;
         if (battler.alive.length < vars.groupDead) {
            vars.groupDead = battler.alive.length;
            battler.alive.length === 1 && (battler.status = () => text.b_group_aerialis.froggitexWhimsalotX(whimmer));
         }
      })
   }),
   astigmatismMigospel: new OutertaleGroup({
      grid: content.ibuGrid1,
      flee: false,
      init () {
         battler.multitext.active = true;
         battler.status = () => text.b_group_aerialis.astigmatism();
         if (world.genocide) {
            battler.volatile[0].container.position.x = 135;
            battler.volatile[1].alive = false;
            battler.volatile[1].container.alpha.value = 0;
         }
         return true;
      },
      opponents: [
         [ opponents.astigmatism, { x: 85, y: 120 } ],
         [ opponents.migospel, { x: 185, y: 120 } ]
      ],
      handler: defaultSetup(async () => {
         if (battler.opponents.includes(opponents.astigmatism)) {
            patterns.astigmatism();
            await battler.turnTimer(10000);
            const vars = battler.volatile[0].vars;
            if (battler.alive.length < 2 && !vars.gonSolo) {
               vars.gonSolo = true;
               battler.status = () => text.b_group_aerialis.astigmatismMigospelX;
            }
         } else if (battler.alive.length !== 0) {
            if (!battler.alive[0].container.metadata.happi) {
               battler.alive[0].container.metadata.happi = true;
               battler.status = () => text.b_opponent_migospel.soloStatus();
               const volatile = battler.alive[0];
               volatile.sparable = true;
               const anim = volatile.container.objects[0] as CosmosAnimation;
               anim.index = 0;
               anim.resources = content.ibcMigospelHappi;
               anim.enable();
            }
            await patterns.migospel();
         }
      })
   }),
   mushketeer: new OutertaleGroup({
      grid: content.ibuGrid1,
      flee: false,
      init () {
         battler.music = world.genocide ? music.youscreweduppal.instance(renderer) : music.CORE.instance(renderer);
         battler.music.rate.value *= 1 + 0.2 * world.ambiance;
         battler.status = () => text.b_opponent_mushketeer.status0();
         return true;
      },
      opponents: [ [ opponents.mushketeer, { x: 135, y: 120 } ] ],
      handler: defaultSetup(
         async (c, t, v) => {
            if (v.sparable) {
               await renderer.pause(450);
            } else {
               patterns.mushketeer(v.vars.travel ?? 0);
               return battler.turnTimer(10000);
            }
         },
         { x: 100, y: 100 },
         true
      )
   })
};

for (const [ key, value ] of Object.entries(groups)) {
   value.assets.name = `groups::${key}`;
}

export default groups;

CosmosUtils.status(`LOAD MODULE: AERIALIS GROUPS (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
