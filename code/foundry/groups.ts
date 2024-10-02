import { BLEND_MODES, Filter, Rectangle } from 'pixi.js';
import text from '../../languages/default/text/foundry';
import {
   autoMusic,
   endMusic,
   faces,
   helmetdyne,
   resetBox,
   spareFlee,
   standardMusic,
   standardPos,
   standardSize,
   turnSkip
} from '../common/api';
import commonOpponents from '../common/opponents';
import commonPatterns from '../common/patterns';
import { content, music, shaders, sounds } from '../systems/assets';
import { atlas, events, game, renderer, speech, typer } from '../systems/core';
import { antifreeze, battler, dialogue_primitive, shake, world } from '../systems/framework';
import { OutertaleChoice, OutertaleGroup, OutertaleVolatile } from '../systems/outertale';
import { SAVE } from '../systems/save';
import {
   CosmosAnimation,
   CosmosFont,
   CosmosInstance,
   CosmosInventory,
   CosmosMath,
   CosmosObject,
   CosmosPoint,
   CosmosPointSimple,
   CosmosRectangle,
   CosmosSprite,
   CosmosUtils,
   CosmosValue
} from '../systems/storyteller';
import { badSpider, dogecon } from './extras';
import opponents from './opponents';
import patterns from './patterns';

export const pregenoAssets = new CosmosInventory(content.amUndynepregeno, content.amUndynegeno);
pregenoAssets.name = 'pregenoAssets';

const groups = {
   doge: new OutertaleGroup({
      assets: new CosmosInventory(content.amDogebattle),
      init () {
         battler.flee = false;
         battler.grid = content.ibuGrid2;
         battler.status = () => text.b_opponent_doge.status1();
         const mus = music.dogebattle.instance(renderer);
         if (dogecon()) {
            mus.rate.value *= 0.9;
         }
         battler.music = mus;
         return true;
      },
      opponents: [ [ opponents.doge, { x: 160, y: 120 } ] ]
   }),

   muffet: new OutertaleGroup({
      assets: new CosmosInventory(content.amSpiderboss),
      init () {
         battler.flee = false;
         battler.status = () => text.b_opponent_muffet.status1;
         const mus = music.spiderboss.instance(renderer);
         if (badSpider()) {
            mus.rate.value *= 0.9;
         }
         battler.music = mus;
         return true;
      },
      opponents: [ [ opponents.muffet, { x: 160, y: 120 } ] ]
   }),

   shyren: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1, content.amBattle2),
      init () {
         battler.flee = false;
         battler.grid = content.ibuGrid1;
         battler.status = () => text.b_opponent_shyren.status1();
         standardMusic();
         return true;
      },
      handler () {
         battler.alive.length === 0 && battler.music?.stop();
      },
      opponents: [ [ opponents.shyren, { x: 135, y: 120 } ] ]
   }),

   undyne: new OutertaleGroup({
      init () {
         // alternate defense values
         const volatile = battler.volatile[0];

         // waver system
         const filter = new Filter(shaders.waver.vert, shaders.waver.frag, {
            size: 8,
            widthTop: 0,
            widthBottom: 0,
            phase: 0,
            yoffset: 0
         });
         volatile.container.filters = [ filter ];
         volatile.container.area = new Rectangle(0, 0, 640, 240);
         volatile.vars.a = 0.003;
         volatile.vars.b = 0.05;
         volatile.vars.c = new CosmosValue();
         volatile.vars.d = 0.1;
         volatile.vars.e = 0.2;
         volatile.container.on('tick', () => {
            const trueValue =
               volatile.vars.c.value * (1 + CosmosMath.remap(Math.random(), -volatile.vars.e, volatile.vars.e));
            filter.uniforms.widthTop = volatile.vars.a + volatile.vars.b * CosmosMath.remap(trueValue, -1.76, 1);
            filter.uniforms.widthBottom = filter.uniforms.widthTop + volatile.vars.d;
            filter.uniforms.phase = (filter.uniforms.phase + 0.1) % 1;
         });
         volatile.vars.wt = async (
            cutscene: boolean,
            position: CosmosPointSimple,
            bubble: (
               fontFamily?: () => CosmosFont | null,
               fontSize?: () => number,
               content?: () => string
            ) => CosmosObject,
            ...lines: string[]
         ) => {
            if (lines.length === 0) {
               return;
            }
            const container = new CosmosObject({
               position: new CosmosPoint(position).subtract(volatile.container.position),
               objects: [ bubble() ]
            });
            cutscene || atlas.switch('dialoguerBase');
            volatile.container.attach(container);
            typer.magic = battler.generic_magic;
            await dialogue_primitive(...lines);
            typer.magic = '';
            cutscene || atlas.switch(null);
            volatile.container.detach(container);
         };

         // arm swing system
         const swinger = new CosmosAnimation({
            blend: BLEND_MODES.ADD,
            alpha: 0,
            active: true,
            position: { x: -89.5, y: -55.5 },
            scale: 0.5,
            resources: content.ibcUndyneSmear
         });
         const arm = new CosmosSprite({
            anchor: { x: 0, y: 1 },
            frames: [ world.genocide ? content.ibcUndyneArm2Ex : content.ibcUndyneArm2 ]
         }).on('tick', function () {
            this.tint = volatile.container.tint;
         });
         const armholder = new CosmosObject({
            position: volatile.container.position.add(0, 1),
            objects: [ swinger, arm ],
            metadata: { swingin: false }
         }).on('tick', async function () {
            if (volatile.vars.armswing) {
               this.alpha.value = 1;
               if (!this.metadata.swingin) {
                  this.metadata.swingin = true;
                  world.genocide && (volatile.vars.CRAZYHEAD = 1);
                  arm.cast(new CosmosPoint(30, 160).divide(-2));
                  await arm.rotation.modulate(renderer, 300, 70, 60, 60);
                  await arm.rotation.modulate(renderer, 100, 40, -75);
                  world.genocide && (volatile.vars.CRAZYHEAD = 2);
                  swinger.alpha.value = 0.75;
                  swinger.alpha.modulate(renderer, 550, swinger.alpha.value, 0);
                  if (world.genocide) {
                     // set velo to:      (end - start)              / (ms  / frame           )
                     swinger.velocity.y = (240 - swinger.position.y) / (550 / CosmosMath.FRAME);
                  }
                  if ((battler.SOUL.metadata.color = volatile.vars.idealcolor) === 'red') {
                     world.genocide || (battler.flee = true);
                     game.movement = true;
                  } else {
                     battler.flee = false;
                  }
                  await arm.rotation.modulate(renderer, 500, -77.5, -80);
                  world.genocide && (volatile.vars.CRAZYHEAD = 3);
                  await arm.rotation.modulate(renderer, 200, -75, 0, 0);
                  world.genocide && (volatile.vars.CRAZYHEAD = 0);
                  volatile.vars.armswing = false;
                  this.metadata.swingin = false;
                  swinger.velocity.y = 0;
                  swinger.position.y = -55.5;
               }
            } else {
               this.alpha.value = 0;
               this.metadata.swingin = false;
            }
         });
         volatile.vars.armholder = armholder;

         // main thing
         const fishBubblePos = { x: 385 / 2, y: 35 / 2 };
         if (world.genocide) {
            opponents.undyne.df = 5;
            battler.SOUL.alpha.value = 0;
            volatile.vars.genostrike = true;
            battler.SOUL.metadata.color = 'green';
            volatile.vars.face = 0;
            const kidd = new CosmosAnimation({
               position: { x: 225, y: 120 },
               anchor: { x: 0, y: 1 },
               resources: content.ibcKiddBody
            });
            battler.flee = false;
            const UF = SAVE.flag.n.undying;
            const pregenoLoader = pregenoAssets.load();
            UF === 0 || renderer.pause(1600).then(() => (kidd.index = 2));
            battler.alpha.value = 1;
            events.on('battle').then(async () => {
               renderer.attach('menu', kidd, armholder);
               await battler.attack(volatile, { power: 0, operation: 'multiply' }, true, true);
               await renderer.pause(450);
               speech.emoters.kidd = kidd;
               speech.emoters.undyne = volatile.container.objects[0];
               const kiddBubblePos = { x: 252.5, y: 61.5 };
               if (UF === 0) {
                  await battler.monster(
                     false,
                     kiddBubblePos,
                     battler.bubbles.dummy,
                     ...text.b_opponent_undyne.genoCutscene1
                  );
                  await renderer.pause(100);
                  kidd.index = 2;
                  await renderer.pause(1150);
                  await battler.monster(
                     false,
                     kiddBubblePos,
                     battler.bubbles.dummy,
                     ...text.b_opponent_undyne.genoCutscene2
                  );
                  await renderer.pause(1450);
                  await battler.monster(
                     false,
                     fishBubblePos,
                     battler.bubbles.twinkly,
                     ...text.b_opponent_undyne.genoCutscene3
                  );
                  await renderer.pause(1350);
                  await battler.monster(
                     false,
                     kiddBubblePos,
                     battler.bubbles.dummy,
                     ...text.b_opponent_undyne.genoCutscene4
                  );
                  await renderer.pause(850);
                  await battler.monster(
                     false,
                     fishBubblePos,
                     battler.bubbles.twinkly,
                     ...text.b_opponent_undyne.genoCutscene5
                  );
                  await renderer.pause(750);
                  await battler.monster(
                     false,
                     kiddBubblePos,
                     battler.bubbles.dummy,
                     ...text.b_opponent_undyne.genoCutscene6
                  );
                  await renderer.pause(1250);
                  await battler.monster(
                     false,
                     kiddBubblePos,
                     battler.bubbles.dummy,
                     ...text.b_opponent_undyne.genoCutscene7
                  );
                  await renderer.pause(650);
                  await battler.monster(
                     false,
                     fishBubblePos,
                     battler.bubbles.twinkly,
                     ...text.b_opponent_undyne.genoCutscene8
                  );
                  await renderer.pause(1450);
                  await battler.monster(
                     false,
                     fishBubblePos,
                     battler.bubbles.twinkly,
                     ...text.b_opponent_undyne.genoCutscene9
                  );
                  await renderer.pause(850);
                  await battler.monster(
                     false,
                     kiddBubblePos,
                     battler.bubbles.dummy,
                     ...text.b_opponent_undyne.genoCutscene10
                  );
                  await renderer.pause(450);
                  await battler.monster(
                     false,
                     fishBubblePos,
                     battler.bubbles.twinkly,
                     ...text.b_opponent_undyne.genoCutscene11
                  );
               } else {
                  await battler.monster(
                     false,
                     kiddBubblePos,
                     battler.bubbles.dummy,
                     ...text.b_opponent_undyne.genoCutscene2
                  );
                  await renderer.pause(450);
                  await battler.monster(
                     false,
                     fishBubblePos,
                     battler.bubbles.twinkly,
                     ...text.b_opponent_undyne.genoCutscene3x
                  );
               }
               UF === 0 && (await renderer.pause(650));
               kidd.index = 9;
               await renderer.pause(850);
               if (UF === 0) {
                  await kidd.position.modulate(renderer, 600, { x: kidd.position.x + 20 });
                  await renderer.pause(1150);
                  await kidd.position.modulate(renderer, 600, { x: kidd.position.x + 100 });
               } else {
                  await kidd.position.modulate(renderer, 720, { x: kidd.position.x + 120 });
               }
               renderer.detach('menu', kidd);
               await antifreeze([ pregenoLoader, renderer.pause(UF === 0 ? 1250 : 850) ]);
               const c = volatile.vars.c as CosmosValue;
               let HEREITCOMES: CosmosInstance | null = null;
               if (UF === 0) {
                  c.modulate(renderer, 300, c.value, 0.2, 0.2);
                  await volatile.vars.wt(
                     false,
                     fishBubblePos,
                     battler.bubbles.twinkly,
                     ...text.b_opponent_undyne.genoCutscene12a
                  );
                  c.modulate(renderer, 300, c.value, 0.3, 0.3);
                  await volatile.vars.wt(
                     false,
                     fishBubblePos,
                     battler.bubbles.twinkly,
                     ...text.b_opponent_undyne.genoCutscene12b
                  );
                  c.modulate(renderer, 300, c.value, 0.4, 0.4);
                  await volatile.vars.wt(
                     false,
                     fishBubblePos,
                     battler.bubbles.twinkly,
                     ...text.b_opponent_undyne.genoCutscene12c
                  );
                  c.modulate(renderer, 300, c.value, 0.5, 0.5);
                  await volatile.vars.wt(
                     false,
                     fishBubblePos,
                     battler.bubbles.twinkly,
                     ...text.b_opponent_undyne.genoCutscene12d
                  );
                  await c.modulate(renderer, UF === 0 ? 3000 : 2000, c.value, 0.8, 0.8);
                  await c.modulate(renderer, UF === 0 ? 1450 : 1250, c.value, 0.6);
                  c.modulate(renderer, UF === 0 ? 1650 : 1350, 0.2, 0.2);
                  speech.emoters.undyne.index = 9;
                  renderer.pause(66).then(async () => {
                     speech.emoters.undyne.index = 10;
                     await renderer.pause(66);
                     speech.emoters.undyne.index = 11;
                  });
                  await volatile.vars.wt(
                     false,
                     fishBubblePos,
                     battler.bubbles.twinkly,
                     ...text.b_opponent_undyne.genoCutscene13
                  );
                  await renderer.pause(1250);
                  HEREITCOMES = music.undynepregeno.instance(renderer);
                  await volatile.vars.wt(
                     false,
                     fishBubblePos,
                     battler.bubbles.twinkly,
                     ...text.b_opponent_undyne.genoCutscene14
                  );
               } else {
                  await volatile.vars.wt(
                     false,
                     fishBubblePos,
                     battler.bubbles.twinkly,
                     ...text.b_opponent_undyne.genoCutscene14x
                  );
               }
               const whitefader = new CosmosRectangle({
                  alpha: 0,
                  fill: 0xffffff,
                  size: { x: 320, y: 240 }
               });
               renderer.attach('menu', whitefader);
               c.modulate(renderer, UF === 0 ? 4500 : 2500, c.value, 1, 1);
               await whitefader.alpha.modulate(renderer, UF === 0 ? 4500 : 2500, 1, 1);
               volatile.hp = opponents.undyne.hp = 23000;
               volatile.alive = true;
               volatile.container.objects[0].index = 16;
               await renderer.pause(850);
               whitefader.alpha.modulate(renderer, UF === 0 ? 1500 : 600, 1, 0).then(() => {
                  renderer.detach('menu', whitefader);
               });
               await c.modulate(renderer, UF === 0 ? 1500 : 600, c.value, -0.1);
               await renderer.pause(UF === 0 ? 1150 : 750);
               SAVE.flag.n.undying++;
               if (UF === 0) {
                  await volatile.vars.wt(
                     false,
                     fishBubblePos,
                     battler.bubbles.twinkly,
                     ...text.b_opponent_undyne.genoCutscene15
                  );
               } else {
                  await volatile.vars.wt(
                     false,
                     fishBubblePos,
                     battler.bubbles.twinkly,
                     ...text.b_opponent_undyne.genoCutscene15x
                  );
               }

               // undying sprite
               volatile.vars.genostrike = false;
               battler.stat.invulnerability.modifiers.push([ 'multiply', 2 / 3, Infinity ]);
               const usprite = opponents.undyne.sprite(volatile);
               volatile.container.objects[0] = usprite;
               CosmosUtils.chain(usprite.objects, (objects, next) => {
                  for (const object of objects) {
                     if (object.metadata.part === 'head') {
                        (speech.emoters.undyne = object as CosmosSprite).index = 23;
                        break;
                     } else {
                        next(object.objects);
                     }
                  }
               });

               volatile.vars.azzyAssistScene = async () => {
                  const SOULalpha = battler.SOUL.alpha.value;
                  battler.SOUL.alpha.value = 0;
                  const overlay = new CosmosRectangle({ fill: 0, size: { x: 320, y: 240 } });
                  const OGgain = battler.music?.gain.value ?? 0;
                  if (battler.music) {
                     battler.music.gain.value = 0;
                     battler.music.rate.value = 0;
                  }
                  HEREITCOMES?.stop();
                  renderer.attach('menu', overlay);
                  volatile.vars.freeze = true;
                  sounds.noise.instance(renderer);
                  shake(0, 0);
                  await renderer.pause(300);
                  speech.state.face = faces.asrielPlain;
                  speech.state.face.reset();
                  const face = new CosmosObject({
                     blend: BLEND_MODES.ADD,
                     position: { x: -0.5, y: -56.5 }
                  });
                  const holder = () => {
                     face.objects = speech.state.face ? [ speech.state.face ] : [];
                  };
                  holder();
                  speech.holders.push(holder);
                  const goatbro = new CosmosSprite({
                     anchor: { x: 0, y: 1 },
                     position: { x: 160, y: 120 },
                     frames: [ content.ibcAsrielAssist ],
                     objects: [ face ]
                  });
                  overlay.objects = [ goatbro ];
                  renderer.attach('menu', overlay);
                  sounds.noise.instance(renderer);
                  await renderer.pause(1500);
                  await battler.monster(
                     false,
                     { x: 180.5, y: 50 },
                     battler.bubbles.twinkly,
                     ...text.b_opponent_undyne.asrielExplain()
                  );
                  volatile.vars.freeze = false;
                  if (battler.music) {
                     battler.music.rate.value = 1;
                     battler.music.gain.modulate(renderer, 1000, OGgain);
                  }
                  await Promise.all([
                     goatbro.alpha.modulate(renderer, 850, 0),
                     overlay.alpha.modulate(renderer, 850, 0)
                  ]);
                  renderer.detach('menu', overlay);
                  speech.holders.splice(speech.holders.indexOf(holder), 1);
                  const assistValue = volatile.vars.azzyAssist;
                  battler.status = () => text.b_opponent_undyne.trueGenoStatusX(assistValue);
                  SAVE.flag.n.azzy_assist = volatile.vars.azzyAssist = 2;
                  battler.SOUL.alpha.value = SOULalpha;
               };

               volatile.vars.speed = 1.46;
               volatile.vars.azzyAssist = SAVE.flag.n.azzy_assist;
               switch (volatile.vars.azzyAssist) {
                  case 0:
                     SAVE.flag.n.azzy_assist = 1;
                     battler.status = () => text.b_opponent_undyne.genoStatus1;
                     break;
                  case 1:
                     await volatile.vars.azzyAssistScene();
                     break;
                  case 2:
                     const assistValue = volatile.vars.azzyAssist;
                     battler.status = () => text.b_opponent_undyne.trueGenoStatusX(assistValue);
                     break;
               }

               // play unlooped intro first, then move to looped version
               volatile.vars.c.value = -1;
               battler.music = (() => {
                  const inst = music.undynegenoStart.instance(renderer);
                  inst.source!.addEventListener('ended', () => {
                     if (battler.music) {
                        const newinst = music.undynegeno.instance(renderer, 21.81);
                        battler.music = newinst;
                     }
                  });
                  return inst;
               })();
               volatile.vars.finalLoader = content.amUndynegenoFinal.load();
               await battler.resume();
            });
         } else {
            const time = renderer.time;
            const fancygrid = new CosmosObject({
               priority: -1,
               objects: CosmosUtils.populate(6, index =>
                  new CosmosSprite({
                     scale: 0.5,
                     position: { x: 7.5 + 50.5 * index },
                     metadata: { phase: index / 12 },
                     frames: [ content.ibuGrid3 ]
                  }).on('tick', function () {
                     this.position.y =
                        9 / 2 +
                        CosmosMath.remap(
                           CosmosMath.wave(this.metadata.phase + ((renderer.time - time) % 5000) / 5000),
                           -1,
                           1
                        ) *
                           10;
                  })
               )
            }).on('tick', function () {
               this.metadata.cutscene || (this.alpha.value = battler.alpha.value);
            });
            volatile.vars.fancygrid = fancygrid;
            battler.overlay.attach(fancygrid);
            battler.box.position.y = 120;
            battler.box.size.x = 36;
            battler.box.size.y = 36;
            battler.SOUL.position.set(battler.box.position);
            volatile.vars.face = 0;
            volatile.hp =
               SAVE.data.n.undyne_hp || opponents.undyne.hp - (SAVE.data.b.f_state_kidd_betray_wait ? 100 : 0);
            battler.alpha.value = 1;
            events.on('battle').then(() => {
               renderer.attach('menu', armholder);
               battler.resume(async () => {
                  const usprite = volatile.container.objects[0];
                  CosmosUtils.chain(usprite.objects, (objects, next) => {
                     for (const object of objects) {
                        if (object.metadata.part === 'head') {
                           (speech.emoters.undyne = object as CosmosSprite).index = world.genocide
                              ? 23
                              : SAVE.data.n.undyne_phase > 3
                              ? 22
                              : SAVE.data.n.undyne_phase > 2
                              ? 6
                              : SAVE.data.n.state_starton_papyrus === 1
                              ? 2
                              : 0;
                           break;
                        } else {
                           next(object.objects);
                        }
                     }
                  });
                  await renderer.pause(650);
                  if (SAVE.data.n.undyne_phase < 3) {
                     volatile.vars.idealcolor = 'green';
                     volatile.vars.armswing = true;
                     await renderer.when(() => volatile.vars.armswing === false);
                  }
                  if (helmetdyne()) {
                     await renderer.pause(450);
                  } else {
                     await renderer.pause(850);
                     await battler.monster(
                        false,
                        fishBubblePos,
                        battler.bubbles.twinkly,
                        ...CosmosUtils.provide(
                           [
                              text.b_opponent_undyne.intro1,
                              text.b_opponent_undyne.intro2,
                              text.b_opponent_undyne.intro3,
                              text.b_opponent_undyne.intro4,
                              text.b_opponent_undyne.intro5
                           ][SAVE.data.n.undyne_phase]
                        )
                     );
                  }
                  volatile.vars.c.value = -1;
                  battler.music =
                     game.room === 'f_napstablook' && SAVE.data.n.state_foundry_blookmusic !== 0
                        ? null
                        : helmetdyne()
                        ? music.undynehelmet.instance(renderer)
                        : music.undyneboss.instance(renderer);
                  if (SAVE.data.n.state_starton_papyrus === 1 && battler.music && !helmetdyne()) {
                     battler.music.rate.value *= 0.9;
                  }
                  battler.SOUL.alpha.value = 0;
                  await battler.box.position.modulate(renderer, 150, { y: 160 });
                  await battler.box.size.modulate(renderer, 300, { x: 282.5, y: 65 });
                  battler.status = () => text.b_opponent_undyne.status1();
               });
            });
         }
         return false;
      },
      opponents: [ [ opponents.undyne, { x: 160, y: 120 } ] ]
   }),

   dateundyne: new OutertaleGroup({
      assets: new CosmosInventory(content.amUndyneboss),
      init () {
         battler.flee = false;
         battler.SOUL.alpha.value = 0;
         battler.music = music.undyneboss.instance(renderer);
         battler.music.rate.value = 1.2;
         const volatile = battler.volatile[0];
         battler.alpha.value = 1;
         battler.resume(async () => {
            const usprite = volatile.container.objects[0];
            CosmosUtils.chain(usprite.objects, (objects, next) => {
               for (const object of objects) {
                  if (object.metadata.part === 'head') {
                     (speech.emoters.undyne = object as CosmosSprite).index = 11;
                     break;
                  } else {
                     next(object.objects);
                  }
               }
            });
            await renderer.pause(850);
            await battler.monster(
               false,
               { x: 185, y: 32.5 },
               battler.bubbles.twinkly,
               ...text.b_opponent_dateundyne.intro()
            );
            battler.status = () => text.b_opponent_dateundyne.status1;
         });
         const swingListener = () => {
            events.off('swing', swingListener);
            battler.music?.stop();
            const cym = sounds.cymbal.instance(renderer);
            const whitefader = new CosmosRectangle({
               alpha: 0,
               fill: 0xffffff,
               size: { x: 320, y: 240 }
            });
            renderer.attach('menu', whitefader);
            volatile.vars.fightPromise = whitefader.alpha.modulate(renderer, 4000, 1).then(async () => {
               await renderer.pause(1000);
               cym.stop();
               renderer.detach('menu', whitefader);
            });
         };
         events.on('battle-exit').then(() => {
            events.off('swing', swingListener);
         });
         events.on('swing', swingListener);
         return false;
      },
      opponents: [ [ opponents.dateundyne, { x: 160, y: 120 } ] ]
   }),

   radtile: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1, content.amBattle2),
      id: 20,
      init () {
         battler.grid = content.ibuGrid1;
         battler.status = () => text.b_opponent_radtile.status1();
         standardMusic();
         return true;
      },
      async handler (choice: OutertaleChoice, target: number, volatile: OutertaleVolatile) {
         if (spareFlee(choice)) {
            return;
         }
         if (battler.alive.length !== 0) {
            await battler.resume(async () => {
               await standardSize({ x: 65, y: 65 }, true);
               standardPos(true);
               if (turnSkip()) {
                  await renderer.pause(450);
               } else {
                  patterns.radtile();
                  await battler.turnTimer(8000);
               }
               await resetBox(true);
            });
         } else {
            endMusic();
         }
      },
      opponents: [ [ opponents.radtile, { x: 135, y: 120 } ] ]
   }),

   woshua: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1, content.amBattle2),
      id: 21,
      init () {
         battler.grid = content.ibuGrid1;
         battler.status = () => text.b_opponent_woshua.status1();
         standardMusic();
         return true;
      },
      async handler (choice: OutertaleChoice) {
         if (spareFlee(choice)) {
            return;
         }
         if (battler.alive.length !== 0) {
            await battler.resume(async () => {
               await Promise.all([
                  standardSize({ x: 100, y: 100 }),
                  battler.box.position.modulate(renderer, 300, { y: 192.5 - 100 / 2 })
               ]);
               standardPos();
               if (turnSkip()) {
                  await renderer.pause(450);
               } else {
                  patterns.woshua(choice.type === 'act' && choice.act === 'clean', void 0);
                  await battler.turnTimer(8000);
               }
               await Promise.all([ resetBox(), battler.box.position.modulate(renderer, 300, { y: 160 }) ]);
            });
         } else {
            endMusic();
         }
      },
      opponents: [ [ opponents.woshua, { x: 135, y: 120 } ] ]
   }),

   moldbygg: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1, content.amBattle2),
      id: 22,
      init () {
         battler.grid = content.ibuGrid1;
         battler.status = () => text.b_opponent_moldbygg.status1();
         standardMusic();
         return true;
      },
      async handler (choice: OutertaleChoice) {
         if (spareFlee(choice)) {
            return;
         }
         if (battler.alive.length !== 0) {
            await battler.resume(async () => {
               await standardSize({ x: 100, y: 100 }, true);
               standardPos(true);
               if (turnSkip()) {
                  await renderer.pause(450);
               } else {
                  patterns.moldbygg();
                  await battler.turnTimer(8000);
               }
               await resetBox(true);
            });
         } else {
            endMusic();
         }
      },
      opponents: [ [ opponents.moldbygg, { x: 135, y: 120 } ] ]
   }),

   moldfake: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1, content.amBattle2),
      id: 22, // same encounter ID as moldbygg
      init () {
         battler.grid = content.ibuGrid1;
         battler.status = () => text.b_opponent_moldfake.status1();
         standardMusic();
         return true;
      },
      async handler (choice: OutertaleChoice) {
         if (spareFlee(choice)) {
            return;
         }
         if (battler.alive.length !== 0) {
            await battler.resume(async () => {
               const bygg = battler.opponents.includes(opponents.moldbygg);
               await standardSize({ x: 100, y: bygg ? 100 : 65 }, true);
               standardPos(true);
               if (turnSkip() || !bygg) {
                  await renderer.pause(450);
               } else {
                  patterns.moldbygg();
                  await battler.turnTimer(8000);
               }
               await resetBox(true);
            });
         } else {
            endMusic();
         }
      },
      opponents: [ [ opponents.moldfake, { x: 135, y: 120 } ] ]
   }),

   moldsmalMoldbygg: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1, content.amBattle2),
      id: 23,
      init () {
         battler.multitext.active = true;
         battler.grid = content.ibuGrid1;
         battler.status = () => text.b_group_foundry.moldsmalMoldbygg1();
         standardMusic();
         return true;
      },
      async handler (choice) {
         if (spareFlee(choice)) {
            return;
         }
         if (battler.alive.length !== 0) {
            await battler.resume(async () => {
               const smal = battler.opponents.includes(commonOpponents.moldsmal);
               const bygg = battler.opponents.includes(opponents.moldbygg);
               await standardSize({ x: smal && bygg ? 120 : 100, y: bygg ? 100 : 65 }, true);
               standardPos(true);
               autoMusic();
               if (turnSkip() || (!smal && !bygg)) {
                  await renderer.pause(450);
               } else {
                  const vars = battler.volatile[0].vars;
                  if (battler.alive.length < (vars.enemies ?? 2)) {
                     if (battler.opponents[0] === opponents.moldbygg) {
                        battler.status = () => text.b_group_foundry.moldsmalMoldbygg2a();
                     } else {
                        battler.status = () => text.b_group_foundry.moldsmalMoldbygg2b();
                     }
                  }
                  vars.enemies = battler.alive.length;
                  if (smal) {
                     commonPatterns.moldsmal();
                  }
                  if (bygg) {
                     patterns.moldbygg(smal ? 'moldsmal' : void 0);
                  }
                  await battler.turnTimer(8000);
               }
               await resetBox(true);
            });
         } else {
            endMusic();
         }
      },
      opponents: [
         [ commonOpponents.moldsmal, { x: 85, y: 120 } ],
         [ opponents.moldfake, { x: 185, y: 120 } ]
      ]
   }),

   woshuaMoldbygg: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1, content.amBattle2),
      id: 24,
      init () {
         battler.multitext.active = true;
         battler.grid = content.ibuGrid1;
         battler.status = () => text.b_group_foundry.woshuaMoldbygg2();
         standardMusic();
         return true;
      },
      async handler (choice: OutertaleChoice) {
         if (spareFlee(choice)) {
            return;
         }
         if (battler.alive.length !== 0) {
            const vars = battler.volatile[0].vars;
            if (battler.alive.length < (vars.enemies ?? 2)) {
               if (battler.opponents[0] === opponents.woshua) {
                  battler.status = () => text.b_group_foundry.woshuaMoldbygg2b();
               } else {
                  battler.status = () => text.b_group_foundry.woshuaMoldbygg2a();
               }
            }
            vars.enemies = battler.alive.length;
            await battler.resume(async () => {
               await standardSize({ x: 100, y: 100 }, true);
               standardPos(true);
               autoMusic();
               if (turnSkip()) {
                  await renderer.pause(450);
               } else {
                  let findWatuh = false;
                  const wosh = battler.opponents.includes(opponents.woshua);
                  const mold = battler.opponents.includes(opponents.moldbygg);
                  if (wosh) {
                     findWatuh = patterns.woshua(
                        choice.type === 'act' && choice.act === 'clean',
                        mold ? 'moldbygg' : void 0
                     );
                  }
                  if (mold) {
                     patterns.moldbygg(wosh ? 'woshua' : void 0, findWatuh);
                  }
                  await battler.turnTimer(8000);
               }
               await resetBox(true);
            });
         } else {
            endMusic();
         }
      },
      opponents: [
         [ opponents.woshua, { x: 85, y: 120 } ],
         [ opponents.moldbygg, { x: 185, y: 120 } ]
      ]
   })
};

for (const [ key, value ] of Object.entries(groups)) {
   value.assets.name = `groups::${key}`;
}

export default groups;

CosmosUtils.status(`LOAD MODULE: FOUNDRY GROUPS (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
