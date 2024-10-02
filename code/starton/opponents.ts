import { GlitchFilter } from '@pixi/filter-glitch';
import text from '../../languages/default/text/starton';
import { faces, resetBox, standardPos, standardSize } from '../common/api';
import { content, inventories, music, sounds } from '../systems/assets';
import { events, renderer, rng, speech } from '../systems/core';
import { battler, choicer, fader, oops, selectElement, shake, world } from '../systems/framework';
import { OutertaleOpponent } from '../systems/outertale';
import { SAVE } from '../systems/save';
import {
   CosmosAnimation,
   CosmosHitbox,
   CosmosInventory,
   CosmosKeyed,
   CosmosMath,
   CosmosObject,
   CosmosPoint,
   CosmosRectangle,
   CosmosSprite,
   CosmosUtils,
   CosmosValue
} from '../systems/storyteller';
import { papreal } from './extras';
import patterns from './patterns';

const opponents = {
   stardrake: new OutertaleOpponent({
      flirted: () => (SAVE.data.b.s_state_chilldrake ? SAVE.data.b.flirt_chilldrake : SAVE.data.b.flirt_stardrake),
      assets: new CosmosInventory(
         content.ibcStardrakeChilldrakeHurt,
         content.ibcStardrakeChilldrake,
         content.ibcStardrakeHead,
         content.ibcStardrakeBody,
         content.ibcStardrakeLegs,
         content.ibcStardrakeLegsOver,
         content.ibcStardrakeHurt,
         content.ibbMoon,
         content.asMonsterHurt2,
         content.asAppear,
         content.ibbPipe
      ),
      bullied: () => (SAVE.data.b.s_state_chilldrake ? SAVE.data.b.bullied_chilldrake : SAVE.data.b.bullied_stardrake),
      bullyable: true,
      bully: () => {
         if (SAVE.data.b.s_state_chilldrake) {
            SAVE.data.b.bullied_chilldrake = true;
         } else {
            SAVE.data.b.bullied_stardrake = true;
         }
         world.bully();
      },
      exp: 22,
      hp: 74,
      df: 2,
      name: () => text.b_opponent_stardrake.name(),
      metadata: { automusic: true },
      acts: () => [
         [
            'check',
            v =>
               world.goatbro
                  ? text.b_opponent_stardrake.act_check()
                  : battler.hurt.includes(v)
                  ? text.b_opponent_stardrake.act_check2()
                  : v.sparable
                  ? text.b_opponent_stardrake.act_check4()
                  : v.flirted
                  ? text.b_opponent_stardrake.act_check3()
                  : text.b_opponent_stardrake.act_check()
         ],
         [ 'joke', text.b_opponent_stardrake.punText1 ],
         [ SAVE.data.b.s_state_chilldrake ? 'agree' : 'laugh', [] ],
         [ SAVE.data.b.s_state_chilldrake ? 'telloff' : 'heckle', [] ],
         [ 'flirt', text.b_opponent_stardrake.act_flirt ]
      ],
      hurt: sounds.monsterHurt2,
      sparable: false,
      g: 18,
      handler: ((
         talk: (target: number, ...lines: string[]) => Promise<void>,
         vars: CosmosKeyed,
         defaultStatus: () => () => string[]
      ) => {
         return async (choice, target, volatile) => {
            let idle = true;
            async function doIdle () {
               if (volatile.vars.heckled) {
                  await talk(
                     target,
                     ...[
                        text.b_opponent_stardrake.heckleTalk1,
                        text.b_opponent_stardrake.heckleTalk2,
                        text.b_opponent_stardrake.heckleTalk3
                     ][rng.dialogue.int(3)]()
                  );
                  volatile.vars.heckledTurns ??= 0;
                  if (++volatile.vars.heckledTurns === 3) {
                     volatile.vars.heckled = false;
                  }
               } else if (idle) {
                  volatile.vars.joke = true;
                  await talk(
                     target,
                     ...[
                        text.b_opponent_stardrake.idleTalk1,
                        text.b_opponent_stardrake.idleTalk2,
                        text.b_opponent_stardrake.idleTalk3,
                        text.b_opponent_stardrake.idleTalk4,
                        text.b_opponent_stardrake.idleTalk5,
                        text.b_opponent_stardrake.idleTalk6,
                        text.b_opponent_stardrake.idleTalk7
                     ][rng.dialogue.int(7)]()
                  );
               }
            }
            if (choice.type === 'none') {
               await doIdle();
               return;
            }
            let done = false;
            let statustext = defaultStatus;
            for (const key in vars) {
               volatile.vars[key] ||= vars[key];
            }
            const sparing = battler.sparing(choice);
            let idler = null as Promise<void> | null;
            let weirdo = false;
            choice.type === 'fight' || choice.type === 'act' || sparing || (idler = battler.idle(volatile));
            switch (choice.type) {
               case 'fight':
                  if (await battler.attack(volatile, { power: choice.score })) {
                     world.kill();
                     SAVE.data.b.s_state_chilldrake = true;
                     await battler.idle(volatile);
                     return;
                  }
                  idler = battler.idle(volatile);
                  break;
               case 'act':
                  switch (choice.act) {
                     case 'check':
                        idler = battler.idle(volatile);
                        break;
                     case 'joke':
                        idler = battler.idle(volatile);
                        idle = false;
                        await talk(
                           target,
                           ...[
                              text.b_opponent_stardrake.punTalk1,
                              text.b_opponent_stardrake.punTalk2,
                              text.b_opponent_stardrake.punTalk3
                           ][rng.dialogue.int(3)]()
                        );
                        break;
                     case 'laugh':
                     case 'agree':
                        idle = false;
                        if (!volatile.vars.joke || volatile.vars.heckled) {
                           if (volatile.vars.weirdo) {
                              await battler.human(...text.b_opponent_stardrake.jokeText0());
                              idler = battler.idle(volatile);
                              await talk(target, ...text.b_opponent_stardrake.jokeTalk0());
                           } else {
                              await battler.human(...text.b_opponent_stardrake.jokeText1());
                              idler = battler.idle(volatile);
                              await talk(target, ...text.b_opponent_stardrake.jokeTalk1());
                           }
                        } else {
                           if (!volatile.sparable) {
                              volatile.sparable = true;
                              if (!volatile.vars.hadSpared) {
                                 volatile.vars.hadSpared = true;
                                 if (SAVE.data.b.s_state_chilldrake) {
                                    SAVE.data.b.spared_chilldrake = true;
                                 } else {
                                    SAVE.data.b.spared_stardrake = true;
                                 }
                              }
                           }
                           statustext = () => () => text.b_opponent_stardrake.jokeStatus();
                           if (volatile.vars.laughed) {
                              await battler.human(...text.b_opponent_stardrake.jokeText3());
                              idler = battler.idle(volatile);
                           } else {
                              volatile.vars.laughed = true;
                              await battler.human(...text.b_opponent_stardrake.jokeText2());
                              idler = battler.idle(volatile);
                           }
                           if (!volatile.vars.daddyissues) {
                              volatile.vars.daddyissues = true;
                              await talk(target, ...text.b_opponent_stardrake.jokeTalk2());
                           } else {
                              await talk(
                                 target,
                                 ...[
                                    text.b_opponent_stardrake.jokeTalk2,
                                    text.b_opponent_stardrake.jokeTalk3,
                                    text.b_opponent_stardrake.jokeTalk4
                                 ][rng.dialogue.int(3)]()
                              );
                           }
                        }
                        break;
                     case 'heckle':
                     case 'telloff':
                        volatile.vars.heckled = true;
                        idle = false;
                        volatile.vars.heckledTurns = 0;
                        volatile.vars.heckledCounter ??= 0;
                        const count = volatile.vars.heckledCounter++;
                        await battler.human(
                           ...[
                              text.b_opponent_stardrake.heckleText1,
                              text.b_opponent_stardrake.heckleText2,
                              text.b_opponent_stardrake.heckleText3
                           ][count]()
                        );
                        if (count === 2) {
                           oops();
                           volatile.sparable = true;
                           battler.spare(target);
                           done = true;
                        }
                        idler = battler.idle(volatile);
                        break;
                     case 'flirt':
                        idler = battler.idle(volatile);
                        idle = false;
                        if (volatile.vars.heckled) {
                           await talk(target, ...text.b_opponent_stardrake.flirtTalk2);
                        } else {
                           if (SAVE.data.b.s_state_chilldrake) {
                              SAVE.data.b.flirt_chilldrake = true;
                           } else {
                              SAVE.data.b.flirt_stardrake = true;
                           }
                           volatile.flirted = true;
                           await talk(target, ...text.b_opponent_stardrake.flirtTalk1);
                        }
                        volatile.vars.weirdo = true;
                        weirdo = true;
                        break;
                  }
                  break;
               case 'spare':
                  if (battler.bullied.includes(volatile)) {
                     events.on('battle-exit').then(() => {
                        SAVE.data.b.s_state_chilldrake = true;
                     });
                     return;
                  } else if (!volatile.sparable) {
                     break;
                  }
               case 'flee':
                  return;
            }
            if (!weirdo) {
               volatile.vars.weirdo = false;
            }
            if (!done && !sparing) {
               if (volatile.vars.heckled) {
                  statustext = () => () => text.b_opponent_stardrake.heckleStatus();
               }
               await doIdle();
            }
            if (battler.hurt.includes(volatile)) {
               statustext = () => () => text.b_opponent_stardrake.hurtStatus();
            }
            battler.status = statustext();
            await idler;
         };
      })(
         async (target, ...lines) =>
            battler.monster(
               false,
               battler.volatile[target].container.position.add(29, -92),
               battler.bubbles.dummy,
               ...lines
            ),
         { joke: false, heckled: false, daddyissues: false },
         () =>
            world.goatbro
               ? () => text.b_opponent_stardrake.genoStatus()
               : [
                    () => text.b_opponent_stardrake.randStatus1(),
                    () => text.b_opponent_stardrake.randStatus2(),
                    () => text.b_opponent_stardrake.randStatus3(),
                    () => text.b_opponent_stardrake.randStatus4(),
                    () => text.b_opponent_stardrake.randStatus5()
                 ][rng.dialogue.int(5)]
      ),
      goodbye: () =>
         new CosmosSprite({
            anchor: { y: 1, x: 0 },
            frames: [ SAVE.data.b.s_state_chilldrake ? content.ibcStardrakeChilldrakeHurt : content.ibcStardrakeHurt ]
         }),
      sprite: () => {
         const time = renderer.time;
         return new CosmosSprite({
            anchor: { y: 1, x: 0 },
            frames: [ content.ibcStardrakeLegs ],
            objects: [
               new CosmosSprite({
                  anchor: { y: 1, x: 0 },
                  frames: [ content.ibcStardrakeBody ],
                  objects: [
                     new CosmosAnimation({
                        active: true,
                        anchor: { y: 1, x: 0 },
                        resources: content.ibcStardrakeHead,
                        objects: SAVE.data.b.s_state_chilldrake
                           ? [ new CosmosSprite({ anchor: { y: 1, x: 0 }, frames: [ content.ibcStardrakeChilldrake ] }) ]
                           : []
                     }).on('tick', function () {
                        this.position.y =
                           CosmosMath.bezier(
                              CosmosMath.wave(((renderer.time - time) % 2500) / 2500),
                              0,
                              0.1,
                              0.4,
                              0.75,
                              1
                           ) * 3;
                     })
                  ]
               }).on('tick', function () {
                  this.position.y =
                     CosmosMath.bezier(CosmosMath.wave(((renderer.time - time) % 2500) / 2500), 0, 0.1, 0.4, 0.75, 1) *
                     3;
               }),
               new CosmosSprite({ anchor: { y: 1, x: 0 }, frames: [ content.ibcStardrakeLegsOver ] })
            ]
         });
      }
   }),
   jerry: new OutertaleOpponent({
      flirted: () => SAVE.data.b.flirt_jerry,
      assets: new CosmosInventory(content.ibcJerryMain, content.ibcJerryHurt),
      exp: 1,
      hp: 80,
      df: 8,
      name: () => text.b_opponent_jerry.name,
      metadata: { automusic: true },
      acts: () => [
         [ 'check', text.b_opponent_jerry.act_check ],
         SAVE.data.b.spared_jerry
            ? [ 'kiss', text.b_opponent_jerry.act_kiss ]
            : [ 'ditch', text.b_opponent_jerry.act_ditch ],
         [ 'flirt', text.b_opponent_jerry.act_flirt ]
      ],
      sparable: false,
      g: 8,
      handler: ((
         talk: (target: number, ...lines: string[]) => Promise<void>,
         vars: CosmosKeyed,
         defaultStatus: () => () => string[]
      ) => {
         return async (choice, target, volatile) => {
            async function doIdle () {
               if (battler.alive.length > 1) {
                  await talk(
                     target,
                     ...[
                        text.b_opponent_jerry.idleTalk1,
                        text.b_opponent_jerry.idleTalk2,
                        text.b_opponent_jerry.idleTalk3,
                        text.b_opponent_jerry.idleTalk4
                     ][rng.dialogue.int(4)]()
                  );
               } else {
                  await talk(
                     target,
                     ...[
                        text.b_opponent_jerry.idleTalkSolo1,
                        text.b_opponent_jerry.idleTalkSolo2,
                        text.b_opponent_jerry.idleTalkSolo3,
                        text.b_opponent_jerry.idleTalkSolo4
                     ][rng.dialogue.int(4)]()
                  );
               }
            }
            if (choice.type === 'none') {
               await doIdle();
               return;
            }
            let idle = true;
            let statustext = defaultStatus;
            for (const key in vars) {
               volatile.vars[key] ||= vars[key];
            }
            const sparing = battler.sparing(choice);
            let idler = null as Promise<void> | null;
            choice.type === 'fight' || choice.type === 'act' || sparing || (idler = battler.idle(volatile));
            switch (choice.type) {
               case 'fight':
                  if (await battler.attack(volatile, { power: choice.score })) {
                     world.kill();
                     await battler.idle(volatile);
                     return;
                  }
                  idler = battler.idle(volatile);
                  break;
               case 'act':
                  switch (choice.act) {
                     case 'check':
                        sparing || (idler = battler.idle(volatile));
                        break;
                     case 'flirt':
                        sparing || (idler = battler.idle(volatile));
                        if (!volatile.sparable) {
                           volatile.sparable = true;
                           idle = false;
                           volatile.flirted = true;
                           SAVE.data.b.flirt_jerry = true;
                           if (5 <= world.flirt) {
                              SAVE.data.b.spared_jerry = true;
                              await talk(target, ...text.b_opponent_jerry.flirtTalk);
                              statustext = () => () => text.b_opponent_jerry.flirtStatus;
                           } else {
                              await talk(target, ...text.b_opponent_jerry.flirtTalkWeird);
                              statustext = () => () => text.b_opponent_jerry.flirtStatusWeird;
                           }
                        }
                        break;
                     case 'ditch':
                        volatile.sparable = true;
                        battler.spare(target);
                        if (battler.alive.length !== 0) {
                           await battler.human(...text.b_opponent_jerry.ditchResult());
                        }
                        sparing || (idler = battler.idle(volatile));
                        break;
                     case 'kiss':
                        if (battler.alive.length !== 1) {
                           await battler.human(...text.b_opponent_jerry.kissResult());
                        }
                        sparing || (idler = battler.idle(volatile));
                        idle = false;
                        await talk(target, ...text.b_opponent_jerry.kissTalk);
                        statustext = () => () => text.b_opponent_jerry.kissStatus;
                        break;
                  }
                  break;
               case 'spare':
                  if (!volatile.sparable) {
                     break;
                  }
               case 'flee':
                  return;
            }
            if (volatile.alive) {
               if (idle) {
                  sparing || (await doIdle());
               }
               if (battler.hurt.includes(volatile)) {
                  statustext = () => () => text.b_opponent_jerry.hurtStatus();
               }
               battler.status = statustext();
            }
            await idler;
         };
      })(
         async (target, ...lines) =>
            battler.monster(
               false,
               battler.volatile[target].container.position.subtract(
                  new CosmosPoint({ x: 140, y: 120 }).subtract({ x: 163, y: 66 })
               ),
               battler.bubbles.dummy,
               ...lines
            ),
         {},
         () =>
            world.goatbro
               ? () => text.b_opponent_jerry.genoStatus
               : [
                    () => text.b_opponent_jerry.randStatus1(),
                    () => text.b_opponent_jerry.randStatus2(),
                    () => text.b_opponent_jerry.randStatus3(),
                    () => text.b_opponent_jerry.randStatus4()
                 ][rng.dialogue.int(4)]
      ),
      sprite: () => new CosmosAnimation({ active: true, anchor: { y: 1, x: 0 }, resources: content.ibcJerryMain }),
      goodbye: () => new CosmosSprite({ anchor: { y: 1, x: 0 }, frames: [ content.ibcJerryHurt ] })
   }),
   mouse: new OutertaleOpponent({
      flirted: () => SAVE.data.b.flirt_mouse,
      assets: new CosmosInventory(
         content.ibcMouseHead,
         content.ibcMouseBody,
         content.ibcMouseHurt,
         content.ibbMouse,
         content.asUpgrade,
         content.asArrow,
         content.ibbCheese,
         content.ibbFrogstar,
         content.asBomb
      ),
      bullied: () => SAVE.data.b.bullied_mouse,
      bullyable: true,
      bully: () => {
         SAVE.data.b.bullied_mouse = true;
         world.bully();
      },
      exp: 35,
      hp: 114,
      df: 3,
      name: () => text.b_opponent_mouse.name,
      acts: () => [
         [
            'check',
            v =>
               world.goatbro
                  ? text.b_opponent_mouse.act_check()
                  : battler.hurt.includes(v)
                  ? text.b_opponent_mouse.act_check2
                  : v.flirted
                  ? text.b_opponent_mouse.act_check4
                  : v.sparable
                  ? text.b_opponent_mouse.act_check3
                  : text.b_opponent_mouse.act_check()
         ],
         [ 'pluck', [] ],
         [ 'trivia', [] ],
         [ 'flirt', v => text.b_opponent_mouse.act_flirt ]
      ],
      sparable: false,
      g: 25,
      handler: ((
         talk: (target: number, ...lines: string[]) => Promise<void>,
         vars: CosmosKeyed,
         defaultStatus: () => () => string[]
      ) => {
         return async (choice, target, volatile) => {
            async function doIdle () {
               if (volatile.sparable) {
                  await talk(
                     target,
                     ...[ text.b_opponent_mouse.safeTalk1, text.b_opponent_mouse.safeTalk2 ][rng.dialogue.int(2)]
                  );
                  statustext = () => () => text.b_opponent_mouse.safeStatus();
               } else if ((volatile.vars.remind ?? 0) > 0) {
                  await talk(
                     target,
                     ...[
                        text.b_opponent_mouse.idleTalk1,
                        text.b_opponent_mouse.idleTalk2,
                        text.b_opponent_mouse.idleTalk3,
                        text.b_opponent_mouse.idleTalk4
                     ][rng.dialogue.int(4)]
                  );
               } else {
                  await talk(
                     target,
                     ...[
                        text.b_opponent_mouse.initTalk1,
                        text.b_opponent_mouse.initTalk2,
                        text.b_opponent_mouse.initTalk3,
                        text.b_opponent_mouse.initTalk4
                     ][rng.dialogue.int(4)]
                  );
               }
            }
            if (choice.type === 'none') {
               await doIdle();
               return;
            }
            let idle = true;
            let statustext = defaultStatus;
            for (const key in vars) {
               volatile.vars[key] ||= vars[key];
            }
            switch (choice.type) {
               case 'fight':
                  if (
                     await battler.attack(
                        volatile,
                        volatile.sparable ? { power: 0, operation: 'multiply' } : { power: choice.score }
                     )
                  ) {
                     world.kill();
                     return;
                  }
                  break;
               case 'act':
                  switch (choice.act) {
                     case 'flirt':
                        idle = false;
                        if (volatile.sparable) {
                           SAVE.data.b.flirt_mouse = true;
                           volatile.flirted = true;
                           await talk(target, ...text.b_opponent_mouse.flirtTalk2);
                        } else {
                           await talk(target, ...text.b_opponent_mouse.flirtTalk);
                        }
                        break;
                     case 'trivia':
                        if (volatile.vars.remind === 2) {
                           await battler.human(...text.b_opponent_mouse.act_direct3);
                        } else if (volatile.vars.remind++ === 1) {
                           await battler.human(...text.b_opponent_mouse.act_direct2);
                           const fd = fader({ fill: 0xffffff, priority: 1000 });
                           await fd.alpha.modulate(renderer, 300, 1);
                           sounds.upgrade.instance(renderer);
                           await renderer.pause(300);
                           (volatile.container.objects[0] as CosmosAnimation).reset().use(content.ibcMouseHead);
                           await fd.alpha.modulate(renderer, 300, 0);
                           renderer.detach('menu', fd);
                           await renderer.pause(1000);
                           SAVE.data.b.spared_mouse = true;
                           volatile.sparable = true;
                           idle = false;
                           await talk(target, ...text.b_opponent_mouse.remindTalk3);
                        } else {
                           await battler.human(...text.b_opponent_mouse.act_direct);
                           idle = false;
                           await talk(
                              target,
                              ...[ text.b_opponent_mouse.remindTalk1, text.b_opponent_mouse.remindTalk2 ][
                                 rng.dialogue.int(2)
                              ]
                           );
                           statustext = () => () => text.b_opponent_mouse.remindStatus();
                        }
                        break;
                     case 'pluck':
                        if (volatile.vars.remind === 2) {
                           await battler.human(...text.b_opponent_mouse.act_disown3);
                        } else if (volatile.vars.disown++ === 1) {
                           await battler.human(...text.b_opponent_mouse.act_disown2);
                           oops();
                           volatile.sparable = true;
                           battler.spare(target);
                           return;
                        } else {
                           await battler.human(...text.b_opponent_mouse.act_disown);
                           volatile.vars.remind = 0;
                           idle = false;
                           await talk(target, ...text.b_opponent_mouse.disownTalk1);
                           statustext = () => () => text.b_opponent_mouse.disownStatus();
                        }
                        break;
                  }
                  break;
               case 'spare':
                  if (battler.bullied.includes(volatile)) {
                     return;
                  } else if (!volatile.sparable) {
                     break;
                  }
               case 'flee':
                  return;
            }
            if (idle) {
               await doIdle();
            } else if (volatile.sparable) {
               statustext = () => () => text.b_opponent_mouse.safeStatus();
            }
            if (battler.hurt.includes(volatile)) {
               statustext = () => () => text.b_opponent_mouse.hurtStatus();
            }
            battler.status = statustext();
         };
      })(
         async (target, ...lines) =>
            battler.monster(
               false,
               battler.volatile[target].container.position.add(22, -55),
               battler.bubbles.dummy,
               ...lines
            ),
         {
            disown: 0,
            safe: 0,
            remind: 0
         },
         () =>
            world.goatbro
               ? () => text.b_opponent_mouse.genoStatus
               : [
                    () => text.b_opponent_mouse.randStatus1,
                    () => text.b_opponent_mouse.randStatus2,
                    () => text.b_opponent_mouse.randStatus3,
                    () => text.b_opponent_mouse.randStatus4
                 ][rng.dialogue.int(4)]
      ),
      sprite: volatile =>
         new CosmosAnimation({
            active: true,
            anchor: { y: 1, x: 0 },
            resources: volatile.sparable ? content.ibcMouseHead : content.ibcMouseBody
         }),
      goodbye: () =>
         new CosmosSprite({
            anchor: { y: 1, x: 0 },
            frames: [ content.ibcMouseHurt ]
         })
   }),
   doggo: new OutertaleOpponent({
      flirted: () => SAVE.data.b.flirt_doggo,
      assets: new CosmosInventory(
         content.ibcDoggoArms,
         content.ibcDoggoBody,
         content.ibcDoggoBodyHurt,
         content.ibcDoggoHead,
         content.ibcDoggoHeadWan,
         content.ibbSword,
         content.asWhimper,
         content.ibbMoon
      ),
      bullied: () => SAVE.data.b.bullied_doggo,
      bullyable: false,
      bully: () => {
         SAVE.data.b.bullied_doggo = true;
         SAVE.data.n.bully++;
      },
      exp: 30,
      hp: 70,
      df: 1,
      g: 40,
      hurt: sounds.whimper,
      name: () => text.b_opponent_doggo.name,
      acts: () => [
         [
            'check',
            v =>
               world.goatbro
                  ? text.b_opponent_doggo.act_check()
                  : battler.hurt.includes(v)
                  ? text.b_opponent_doggo.act_check2
                  : v.sparable
                  ? text.b_opponent_doggo.act_check3
                  : v.flirted
                  ? text.b_opponent_doggo.act_check4
                  : text.b_opponent_doggo.act_check()
         ],
         [ 'flirt', text.b_opponent_doggo.act_flirt ],
         [ 'cuddle', [] ],
         [ 'pet', [] ]
      ],
      sparable: false,
      metadata: { reactSpanner: true },
      async handler (choice, target, volatile) {
         volatile.vars.invisible || (volatile.vars.invisible = false);
         let humantext = [] as string[];
         let monstertext = [] as string[][];
         let statustext = (
            volatile.vars.fetcher ? [ () => text.b_opponent_doggo.fetchStatus ] : []
         ) as (() => string[])[];
         volatile.vars.pet || (volatile.vars.pet = 0);
         if (volatile.vars.invisiblePrev !== volatile.vars.invisible) {
            volatile.vars.talk = 0;
            volatile.vars.invisiblePrev = volatile.vars.invisible;
         }
         let overrideStatus = false;
         let tempWan = false;
         let cuddle = false;
         switch (choice.type) {
            case 'fight':
               volatile.vars.wan = false;
               volatile.vars.invisible = false;
               if (
                  await battler.attack(
                     volatile,
                     volatile.sparable ? { power: 0, operation: 'multiply' } : { power: choice.score }
                  )
               ) {
                  SAVE.data.n.state_starton_doggo = 2;
                  battler.music?.stop();
                  return;
               } else {
                  volatile.opponent.bullyable = true;
               }
               break;
            case 'item':
               if (choice.item === 'spanner') {
                  humantext = text.b_opponent_doggo.fetch();
                  monstertext = [ text.b_opponent_doggo.fetchTalk() ];
                  SAVE.data.n.state_starton_doggo = 1;
                  volatile.sparable = true;
                  volatile.vars.fetcher = true;
                  statustext = [ () => text.b_opponent_doggo.fetchStatus ];
               }
               break;
            case 'act':
               switch (choice.act) {
                  case 'pet':
                     if (volatile.vars.fetcher) {
                        humantext = text.b_opponent_doggo.fetchpet;
                     } else if (volatile.vars.invisible) {
                        const petValue = Math.min(volatile.vars.pet++, 13);
                        volatile.sparable = true;
                        humantext = text.b_opponent_doggo.pet();
                        monstertext = [
                           [
                              text.b_opponent_doggo.petTalk1,
                              text.b_opponent_doggo.petTalk2,
                              text.b_opponent_doggo.petTalk3,
                              text.b_opponent_doggo.petTalk4,
                              text.b_opponent_doggo.petTalk5,
                              text.b_opponent_doggo.petTalk6,
                              text.b_opponent_doggo.petTalk7,
                              text.b_opponent_doggo.petTalk8,
                              text.b_opponent_doggo.petTalk9,
                              text.b_opponent_doggo.petTalk10,
                              text.b_opponent_doggo.petTalk11,
                              text.b_opponent_doggo.petTalk12,
                              text.b_opponent_doggo.petTalk13,
                              text.b_opponent_doggo.petTalk14
                           ][petValue]
                        ];
                        volatile.vars.wan = petValue < 9 || petValue > 10;
                        statustext = [ () => text.b_opponent_doggo.petStatus() ];
                        overrideStatus = true;
                     } else {
                        humantext = text.b_opponent_doggo.sussy();
                     }
                     break;
                  case 'flirt':
                     if (volatile.vars.fetcher) {
                        humantext = text.b_opponent_doggo.fetchflirt;
                     } else if (volatile.vars.invisible) {
                        tempWan = !volatile.vars.wan;
                        volatile.vars.wan = true;
                        SAVE.data.b.flirt_doggo = true;
                        volatile.flirted = true;
                        monstertext = [ text.b_opponent_doggo.flirt1 ];
                     } else {
                        humantext = text.b_opponent_doggo.sussy();
                     }
                     break;
                  case 'cuddle':
                     if (volatile.vars.fetcher) {
                        humantext = text.b_opponent_doggo.fetchcuddle;
                     } else if (volatile.vars.invisible) {
                        humantext = text.b_opponent_doggo.act_cuddle();
                        tempWan = true;
                        volatile.vars.invisible = false;
                        volatile.sparable = false;
                        volatile.vars.wan = true;
                        cuddle = true;
                        monstertext = [ text.b_opponent_doggo.cuddle() ];
                     } else {
                        humantext = text.b_opponent_doggo.sussy();
                     }
                     break;
               }
               break;
            case 'spare':
               if (battler.bullied.includes(volatile)) {
                  SAVE.data.n.state_starton_doggo = 3;
                  battler.spare();
                  battler.music?.stop();
                  return;
               } else if (!volatile.sparable) {
                  break;
               }
               battler.spare();
               battler.music?.stop();
               return;
         }
         humantext.length > 0 && (await battler.human(...humantext));
         if (volatile.vars.fetcher) {
            battler.volatile[0].vars.wan = true;
         }
         if (monstertext.length === 0) {
            if (volatile.vars.fetcher) {
               monstertext = [ text.b_opponent_doggo.fetchTalkX1, text.b_opponent_doggo.fetchTalkX2 ];
            } else if (!volatile.vars.queried) {
               monstertext = [ text.b_opponent_doggo.query1 ];
               volatile.vars.queried = true;
            } else {
               monstertext = [ text.b_opponent_doggo.query3 ];
            }
         }
         await battler.monster(
            false,
            volatile.container.position.add(34, -95),
            battler.bubbles.napstablook,
            ...selectElement(monstertext)
         );
         if (tempWan) {
            volatile.vars.wan = false;
         }
         if (battler.alive.length !== 0) {
            await battler.resume(async () => {
               await standardSize({ x: 150, y: 50 }, true);
               standardPos(true);
               if (cuddle || volatile.vars.fetcher) {
                  await renderer.pause(450);
               } else {
                  volatile.vars.invisible = true;
                  const p = patterns.doggo(rng.pattern.next() < 1 / 100);
                  const h = CosmosUtils.hyperpromise();
                  const listener = (b: CosmosHitbox) => {
                     if (b.metadata.color === 'blue') {
                        events.off('hurt', listener);
                        h.resolve();
                     }
                  };
                  events.on('hurt', listener);
                  await p;
                  events.off('hurt', listener);
                  if (h.active) {
                     h.resolve();
                  } else {
                     volatile.vars.wan = false;
                     volatile.vars.invisible = false;
                     overrideStatus = false;
                     volatile.sparable = false;
                     await battler.monster(
                        true,
                        volatile.container.position.add(34, -95),
                        battler.bubbles.napstablook,
                        ...text.b_opponent_doggo.query2
                     );
                  }
               }
               if (!overrideStatus && !volatile.vars.fetcher) {
                  if (volatile.vars.invisible) {
                     statustext = [ () => text.b_opponent_doggo.invisStatus() ];
                  } else {
                     statustext = [ () => text.b_opponent_doggo.normaStatus() ];
                  }
               }
               battler.status = selectElement(statustext);
               await resetBox(true);
            });
         } else {
            battler.music?.stop();
         }
      },
      sprite: volatile => {
         let up = true;
         let wan = volatile.sparable;
         return new CosmosSprite({
            anchor: { x: 0, y: 1 },
            metadata: { size: { y: 95 } },
            objects: [
               new CosmosSprite({
                  anchor: { x: 0, y: 1 },
                  position: { y: -34 + 3 },
                  frames: [ content.ibcDoggoArms ]
               }).on('tick', function () {
                  if (up) {
                     if ((this.position.y -= 0.1) < -35.5 + 3) {
                        up = false;
                     }
                  } else if ((this.position.y += 0.1) > -32.5 + 3) {
                     up = true;
                  }
               }),
               new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcDoggoBody ] }),
               new CosmosAnimation({
                  active: true,
                  anchor: { x: 0, y: 1 },
                  position: { y: -62 },
                  resources: wan ? content.ibcDoggoHeadWan : content.ibcDoggoHead
               }).on('tick', function () {
                  if (volatile.vars.wan !== wan) {
                     this.use((wan = !wan) ? content.ibcDoggoHeadWan : content.ibcDoggoHead);
                  }
               })
            ]
         });
      },
      goodbye: () => new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcDoggoBodyHurt ] })
   }),
   lesserdog: new OutertaleOpponent({
      flirted: () => SAVE.data.b.flirt_lesserdog,
      assets: new CosmosInventory(
         content.ibcLesserdogBody,
         content.ibcLesserdogHead,
         content.ibcLesserdogTail,
         content.ibcLesserdogHurt,
         content.ibcLesserdogHurtHead,
         content.ibbSword,
         content.asWhimper
      ),
      bullied: () => SAVE.data.b.bullied_lesserdog,
      bullyable: false,
      bully: () => {
         SAVE.data.b.bullied_lesserdog = true;
         SAVE.data.n.bully++;
      },
      exp: 18,
      hp: 60,
      df: 0,
      g: 36,
      hurt: sounds.whimper,
      name: () => text.b_opponent_lesserdog.name,
      acts: () => [
         [
            'check',
            v =>
               world.goatbro
                  ? text.b_opponent_lesserdog.act_check()
                  : battler.hurt.includes(v)
                  ? text.b_opponent_lesserdog.act_check2
                  : (v.vars.mercymod || 0) > 2690
                  ? text.b_opponent_lesserdog.act_check5
                  : v.sparable
                  ? text.b_opponent_lesserdog.act_check3
                  : v.flirted
                  ? text.b_opponent_lesserdog.act_check4
                  : text.b_opponent_lesserdog.act_check()
         ],
         [ 'flirt', [] ],
         [ 'pet', [] ],
         [ 'handshake', [] ],
         [ 'inquire', [] ]
      ],
      sparable: false,
      metadata: { reactSpanner: true },
      async handler (choice, target, volatile) {
         let humantext = [] as string[];
         let monstertext = [] as string[][];
         let statustext = (
            volatile.vars.fetcher ? [ () => text.b_opponent_lesserdog.fetchStatus ] : []
         ) as (() => string[])[];
         let overridable = true;
         volatile.vars.mercymod || (volatile.vars.mercymod = 0);
         switch (choice.type) {
            case 'fight':
               volatile.vars.hurt2 = true;
               const ded = volatile.vars.mercymod > 0 || volatile.hp <= battler.calculate(volatile, choice.score);
               const punch = battler.attack(
                  volatile,
                  volatile.vars.mercymod > 0 ? { power: 0, operation: 'multiply' } : { power: choice.score },
                  true,
                  true
               );
               await renderer.when(() => (volatile.vars.mercymod = Math.max(volatile.vars.mercymod - 15 / 2, 0)) === 0);
               if (ded) {
                  volatile.vars.hurt1 = true;
               }
               if (await punch) {
                  await renderer.on('tick');
                  await battler.vaporize(volatile.container.objects[0]);
                  SAVE.data.n.state_starton_lesserdog = 2;
                  events.fire('victory');
                  battler.music?.stop();
                  return;
               } else {
                  volatile.vars.hurt2 = false;
                  volatile.opponent.bullyable = true;
               }
               break;
            case 'item':
               if (choice.item === 'spanner') {
                  volatile.vars.fetcher = true;
                  humantext = text.b_opponent_lesserdog.fetch();
                  statustext = [ () => text.b_opponent_lesserdog.fetchStatus ];
                  volatile.sparable = true;
                  volatile.vars.mercymod += 100;
                  SAVE.data.n.state_starton_lesserdog = 1;
               }
               break;
            case 'act':
               if (choice.act !== 'check') {
                  if (volatile.vars.mercymod > 2740) {
                     humantext = text.b_opponent_lesserdog.petText20();
                     overridable = false;
                  } else if (volatile.vars.mercymod > 2690) {
                     humantext = text.b_opponent_lesserdog.petText19();
                     overridable = false;
                  } else if (volatile.vars.mercymod > 2240) {
                     humantext = text.b_opponent_lesserdog.petText18();
                     overridable = false;
                  } else if (volatile.vars.mercymod > 2190) {
                     humantext = text.b_opponent_lesserdog.petText17();
                     overridable = false;
                  } else if (volatile.vars.mercymod > 1640) {
                     humantext = text.b_opponent_lesserdog.petText16();
                     overridable = false;
                  } else if (volatile.vars.mercymod > 890) {
                     humantext = text.b_opponent_lesserdog.petText15();
                  } else if (volatile.vars.mercymod > 640) {
                     humantext = text.b_opponent_lesserdog.petText14();
                  } else if (volatile.vars.mercymod > 590) {
                     humantext = text.b_opponent_lesserdog.petText13();
                     overridable = false;
                  } else if (volatile.vars.mercymod > 540) {
                     humantext = text.b_opponent_lesserdog.petText12();
                     overridable = false;
                  } else if (volatile.vars.mercymod > 490) {
                     humantext = text.b_opponent_lesserdog.petText11();
                     overridable = false;
                  } else if (volatile.vars.mercymod > 440) {
                     humantext = text.b_opponent_lesserdog.petText10();
                     overridable = false;
                  } else if (volatile.vars.mercymod > 390) {
                     humantext = text.b_opponent_lesserdog.petText9();
                     overridable = false;
                  } else if (volatile.vars.mercymod > 340) {
                     humantext = text.b_opponent_lesserdog.petText8();
                     overridable = false;
                  } else if (volatile.vars.mercymod > 290) {
                     humantext = text.b_opponent_lesserdog.petText7();
                  } else if (volatile.vars.mercymod > 240) {
                     humantext = text.b_opponent_lesserdog.petText6();
                  } else if (volatile.vars.mercymod > 190) {
                     humantext = text.b_opponent_lesserdog.petText5();
                  } else if (volatile.vars.mercymod > 140) {
                     humantext = text.b_opponent_lesserdog.petText4();
                     volatile.sparable = true;
                  } else if (volatile.vars.mercymod > 90) {
                     humantext = text.b_opponent_lesserdog.petText3();
                  } else if (volatile.vars.mercymod > 40) {
                     humantext = text.b_opponent_lesserdog.petText2();
                  } else {
                     humantext = text.b_opponent_lesserdog.petText1();
                  }
                  if (overridable) {
                     switch (choice.act) {
                        case 'flirt':
                           humantext = text.b_opponent_lesserdog.act_flirt;
                           break;
                        case 'inquire':
                           humantext = text.b_opponent_lesserdog.act_inquire;
                           break;
                        case 'handshake':
                           humantext = text.b_opponent_lesserdog.act_handshake;
                           break;
                        case 'tickle':
                           humantext = text.b_opponent_lesserdog.act_tickle;
                           break;
                     }
                  }
                  volatile.vars.mercymod += 50;
               }
               if (choice.act === 'flirt') {
                  SAVE.data.b.flirt_lesserdog = true;
                  volatile.flirted = true;
               }
               break;
            case 'spare':
               if (battler.bullied.includes(volatile)) {
                  SAVE.data.n.state_starton_lesserdog = 3;
               } else if (!volatile.sparable) {
                  break;
               }
               battler.spare();
               volatile.vars.hurt2 = true;
               volatile.container.objects[0].reset();
               (volatile.container.objects[0].objects[2] as CosmosSprite).reset();
               battler.music?.stop();
               return;
         }
         humantext.length > 0 && (await battler.human(...humantext));
         if (volatile.vars.fetcher) {
            monstertext = [ text.b_opponent_lesserdog.fetchTalk ];
         } else {
            if (volatile.vars.mercymod > 690) {
               monstertext = [ text.b_opponent_lesserdog.petTalk1 ];
            } else if (volatile.vars.mercymod > 640) {
               monstertext = [ text.b_opponent_lesserdog.petTalk12 ];
            } else if (volatile.vars.mercymod > 590) {
               monstertext = [ text.b_opponent_lesserdog.petTalk10 ];
            } else if (volatile.vars.mercymod > 540) {
               monstertext = [ text.b_opponent_lesserdog.petTalk11 ];
            } else if (volatile.vars.mercymod > 490) {
               monstertext = [ text.b_opponent_lesserdog.petTalk10 ];
            } else if (volatile.vars.mercymod > 440) {
               monstertext = [ text.b_opponent_lesserdog.petTalk9 ];
            } else if (volatile.vars.mercymod > 390) {
               monstertext = [ text.b_opponent_lesserdog.petTalk8 ];
            } else if (volatile.vars.mercymod > 340) {
               monstertext = [ text.b_opponent_lesserdog.petTalk7 ];
            } else if (volatile.vars.mercymod > 190) {
               monstertext = [ text.b_opponent_lesserdog.petTalk6 ];
            } else if (volatile.vars.mercymod > 90) {
               monstertext = [ text.b_opponent_lesserdog.petTalk5 ];
            } else {
               monstertext = [
                  text.b_opponent_lesserdog.petTalk1,
                  text.b_opponent_lesserdog.petTalk2,
                  text.b_opponent_lesserdog.petTalk3,
                  text.b_opponent_lesserdog.petTalk4
               ];
            }
         }
         await battler.monster(false, { x: 60, y: 35 }, battler.bubbles.napstablook2, ...selectElement(monstertext));
         if (volatile.sparable && world.genocide) {
            statustext = [ () => text.b_opponent_lesserdog.statusX ];
         } else if (volatile.vars.fetcher) {
            statustext = [ () => text.b_opponent_lesserdog.fetchStatus ];
         }
         if (battler.hurt.includes(volatile)) {
            statustext = [ () => text.b_opponent_lesserdog.hurtStatus() ];
         } else if (volatile.vars.mercymod > 2690) {
            statustext = [ () => text.b_opponent_lesserdog.status13() ];
         } else if (volatile.vars.mercymod > 2340) {
            statustext = [ () => text.b_opponent_lesserdog.status12() ];
         } else if (volatile.vars.mercymod > 2190) {
            statustext = [ () => text.b_opponent_lesserdog.status11() ];
         } else if (volatile.vars.mercymod > 1740) {
            statustext = [ () => text.b_opponent_lesserdog.status10() ];
         } else if (volatile.vars.mercymod > 1640) {
            statustext = [ () => text.b_opponent_lesserdog.status9() ];
         } else if (volatile.vars.mercymod > 740) {
            statustext = [ () => text.b_opponent_lesserdog.status8() ];
         } else if (volatile.vars.mercymod > 440) {
            statustext = [ () => text.b_opponent_lesserdog.status7() ];
         } else if (volatile.vars.mercymod > 240) {
            statustext = [ () => text.b_opponent_lesserdog.status6() ];
         } else if (volatile.vars.mercymod > 40) {
            statustext = [ () => text.b_opponent_lesserdog.status5() ];
         } else {
            statustext = [
               () => text.b_opponent_lesserdog.status1(),
               () => text.b_opponent_lesserdog.status2(),
               () => text.b_opponent_lesserdog.status3(),
               () => text.b_opponent_lesserdog.status4()
            ];
         }
         if (battler.alive.length !== 0) {
            if (volatile.vars.mercymod > 290) {
               await battler.resume();
            } else {
               await battler.resume(async () => {
                  await standardSize({ x: 150, y: 50 }, true);
                  standardPos(true);
                  if (SAVE.data.n.state_starton_lesserdog === 1) {
                     await renderer.pause(450);
                  } else {
                     patterns.lesserdog();
                     await battler.turnTimer(7000);
                  }
                  await resetBox(true);
               });
            }
            battler.status = selectElement(statustext);
         } else {
            battler.music?.stop();
         }
      },
      sprite: volatile =>
         new CosmosAnimation({
            active: true,
            extrapolate: false,
            anchor: { y: 1 },
            resources: content.ibcLesserdogTail,
            metadata: { hurt: false },
            objects: [
               new CosmosRectangle({
                  anchor: { y: 1 },
                  position: { x: 23, y: -50 },
                  size: { x: 18 },
                  fill: 0xffffff,
                  objects: [
                     new CosmosAnimation({
                        active: true,
                        anchor: { y: 1 },
                        position: { x: -1, y: -5 },
                        resources: content.ibcLesserdogHead,
                        metadata: { hurt: false }
                     }).on('tick', function () {
                        if (volatile.vars.hurt2 !== this.metadata.hurt) {
                           this.use(
                              (this.metadata.hurt = !this.metadata.hurt)
                                 ? content.ibcLesserdogHurtHead
                                 : content.ibcLesserdogHead
                           );
                        }
                     })
                  ]
               }).on('tick', function () {
                  const mercymod = volatile.vars.mercymod || 0;
                  this.size.y = mercymod / 8 + 5;
                  this.objects[0].position.y = mercymod / -8 - 5;
               }),
               new CosmosRectangle({
                  position: { x: 61, y: -120 },
                  size: { x: 18 },
                  fill: 0xffffff,
                  objects: [
                     new CosmosAnimation({
                        active: true,
                        anchor: { y: 1, x: 1 },
                        position: { x: -1, y: -5 },
                        rotation: 180,
                        resources: content.ibcLesserdogHead,
                        metadata: { hurt: false }
                     }).on('tick', function () {
                        if (volatile.vars.hurt2 !== this.metadata.hurt) {
                           this.use(
                              (this.metadata.hurt = !this.metadata.hurt)
                                 ? content.ibcLesserdogHurtHead
                                 : content.ibcLesserdogHead
                           );
                        }
                     })
                  ]
               }).on('tick', function () {
                  const mercymod = (volatile.vars.mercymod || 0) - 520;
                  if (mercymod > 0) {
                     this.alpha.value = 1;
                     this.size.y = mercymod / 8 + 5 - 25;
                     this.objects[0].position.y = mercymod / 8 - 5 - 25;
                  } else {
                     this.alpha.value = 0;
                  }
               }),
               new CosmosAnimation({ active: true, anchor: { y: 1 }, resources: content.ibcLesserdogBody })
            ]
         }).on('tick', function () {
            volatile.vars.creditstretch && (volatile.vars.mercymod += 5);
            this.duration = Math.round(CosmosMath.remap_clamped(volatile.vars.mercymod || 0, 16, 1, 0, 2700));
            if (volatile.vars.hurt1 && !this.metadata.hurt) {
               this.metadata.hurt = true;
               this.objects = [];
               this.resources = content.ibcLesserdogHurt;
               this.reset();
            }
         })
   }),
   dogamy: new OutertaleOpponent({
      flirted: () => SAVE.data.b.flirt_dogamy,
      assets: new CosmosInventory(
         content.ibbAx,
         content.ibcDogsAxe,
         content.ibcDogsDogamy,
         content.ibcDogsDogamyDesolate,
         content.ibcDogsDogamyHurt,
         content.ibbPomSad,
         content.ibbPombarkSad,
         content.asBomb,
         content.asWhimper,
         content.asAppear
      ),
      bullied: () => SAVE.data.b.bullied_dogamy,
      bully: () => {
         SAVE.data.b.bullied_dogamy = true;
         SAVE.data.n.bully++;
      },
      exp: 30,
      hp: 108,
      df: 4,
      g: 50,
      hurt: sounds.whimper,
      name: () => text.b_opponent_dogamy.name,
      acts: () => [
         [
            'check',
            v =>
               world.goatbro
                  ? text.b_opponent_dogamy.act_check()
                  : battler.alive.length === 1
                  ? text.b_opponent_dogamy.act_check2
                  : v.flirted
                  ? text.b_opponent_dogamy.act_check4
                  : v.sparable
                  ? text.b_opponent_dogamy.act_check3
                  : battler.hurt.includes(battler.volatile[1])
                  ? text.b_opponent_dogamy.act_check5
                  : text.b_opponent_dogamy.act_check()
         ],
         [ 'flirt', [] ],
         [ 'roll', [] ],
         [ 'resniff', [] ],
         [ 'pet', [] ]
      ],
      sparable: false,
      metadata: { reactSpanner: true },
      sprite: () =>
         new CosmosAnimation({
            active: true,
            anchor: { y: 1 },
            metadata: { alt: false, alted: false },
            resources: content.ibcDogsDogamy,
            objects: [ new CosmosSprite({ alpha: 0, anchor: { y: 1 }, frames: [ content.ibcDogsDogamyDesolate ] }) ]
         }).on('tick', function () {
            if (this.metadata.alt && !this.metadata.alted) {
               this.metadata.alted = true;
               this.reset().use(null);
               this.objects[0].alpha.value = 1;
            }
         }),
      goodbye: vola =>
         new CosmosSprite({
            anchor: { y: 1 },
            frames: [
               battler.volatile.find(v => v !== vola && v.hp <= 0) !== void 0
                  ? content.ibcDogsDogamyDesolate
                  : content.ibcDogsDogamyHurt
            ]
         })
   }),
   dogaressa: new OutertaleOpponent({
      flirted: () => SAVE.data.b.flirt_dogaressa,
      assets: new CosmosInventory(
         content.ibcDogsDogaressa,
         content.ibcDogsDogaressaHurt,
         content.ibcDogsDogaressaRabid,
         content.ibbHeart,
         content.ibbPombark,
         content.ibbPomwag,
         content.asBark,
         content.ibbPomjump,
         content.ibbPomjumpSad,
         content.ibbPomwalk,
         content.ibbPomwalkSad
      ),
      bullied: () => SAVE.data.b.bullied_dogaressa,
      bully: () => {
         SAVE.data.b.bullied_dogaressa = true;
         SAVE.data.n.bully++;
      },
      exp: 30,
      hp: 108,
      df: 4,
      g: 50,
      hurt: sounds.whimper,
      name: () => text.b_opponent_dogaressa.name,
      metadata: { reactSpanner: true },
      acts: () => [
         [
            'check',
            v =>
               world.goatbro
                  ? text.b_opponent_dogaressa.act_check()
                  : battler.alive.length === 1
                  ? text.b_opponent_dogaressa.act_check2
                  : v.flirted
                  ? text.b_opponent_dogaressa.act_check4
                  : v.sparable
                  ? text.b_opponent_dogaressa.act_check3
                  : battler.hurt.includes(battler.volatile[0])
                  ? text.b_opponent_dogaressa.act_check5
                  : text.b_opponent_dogaressa.act_check()
         ],
         [ 'flirt', [] ],
         [ 'roll', [] ],
         [ 'resniff', [] ],
         [ 'pet', [] ]
      ],
      sparable: false,
      sprite: () =>
         new CosmosAnimation({
            active: true,
            anchor: { y: 1 },
            metadata: { alt: false, alted: false },
            resources: content.ibcDogsDogaressa,
            objects: [ new CosmosSprite({ alpha: 0, anchor: { y: 1 }, frames: [ content.ibcDogsDogaressaRabid ] }) ]
         }).on('tick', function () {
            if (this.metadata.alt && !this.metadata.alted) {
               this.metadata.alted = true;
               this.reset().use(null);
               this.objects[0].alpha.value = 1;
            }
         }),
      goodbye: vola =>
         new CosmosSprite({
            active: true,
            anchor: { y: 1 },
            frames: [
               battler.volatile.find(v => v !== vola && v.hp <= 0) !== void 0
                  ? content.ibcDogsDogaressaRabid
                  : content.ibcDogsDogaressaHurt
            ]
         })
   }),
   dogs: new OutertaleOpponent({
      bullied: () => SAVE.data.b.bullied_dogamy && SAVE.data.b.bullied_dogaressa,
      flirted: () => SAVE.data.b.flirt_dogamy && SAVE.data.b.flirt_dogaressa,
      assets: new CosmosInventory(content.ibcDogsAxe, content.ibcDogsDogamy, content.ibcDogsDogaressa),
      sprite: () => {
         return new CosmosSprite({
            objects: [
               new CosmosAnimation({
                  active: true,
                  anchor: { y: 1 },
                  position: { x: -12.5 },
                  resources: content.ibcDogsDogamy
               }),
               new CosmosAnimation({
                  active: true,
                  anchor: { y: 1 },
                  position: { x: 12.5 },
                  resources: content.ibcDogsDogaressa
               }),
               new CosmosSprite({
                  anchor: { y: 1 },
                  frames: [ content.ibcDogsAxe ],
                  position: { x: -12.5 },
                  priority: 200
               })
            ]
         });
      }
   }),
   greatdog: new OutertaleOpponent({
      flirted: () => SAVE.data.b.flirt_greatdog,
      assets: new CosmosInventory(
         content.ibbPomwake,
         content.ibbPomsleep,
         content.ibbPomwalk,
         content.ibbPombark,
         content.ibbPomwag,
         content.ibbPomjump,
         content.ibcGreatdog,
         content.ibcGreatdogSleep,
         content.ibbBark,
         content.asBark,
         content.asWhimper,
         content.ibbFrisbee,
         content.asSwallow
      ),
      exp: 80,
      hp: 105,
      df: 4,
      g: 64,
      hurt: sounds.whimper,
      name: () => text.b_opponent_greatdog.name,
      acts: () => [
         [
            'check',
            v =>
               world.goatbro
                  ? text.b_opponent_greatdog.act_check()
                  : v.sparable
                  ? text.b_opponent_greatdog.act_check3
                  : (v.vars.ignores || 0) > 0
                  ? text.b_opponent_greatdog.act_check2
                  : text.b_opponent_greatdog.act_check()
         ],
         [ 'flirt', text.b_opponent_greatdog.act_flirt ],
         [ 'beckon', [] ],
         [ 'play', [] ],
         [ 'pet', [] ]
      ],
      sparable: false,
      metadata: { reactSpanner: true },
      async handler (choice, target, volatile) {
         let statustext = volatile.vars.fetcher
            ? [ () => text.b_opponent_greatdog.fetchStatus ]
            : [
                 () => text.b_opponent_greatdog.status1(),
                 () => text.b_opponent_greatdog.status2(),
                 () => text.b_opponent_greatdog.status3()
              ];
         let ignore = false;
         volatile.vars.pets ||= 0;
         volatile.vars.ignores ||= 0;
         volatile.vars.speedmod ||= [ 'multiply', 0.75, Infinity ];
         switch (choice.type) {
            case 'fight':
               volatile.vars.ignores = 0;
               if (
                  await battler.attack(
                     volatile,
                     volatile.sparable ? { power: 0, operation: 'multiply' } : { power: choice.score }
                  )
               ) {
                  SAVE.data.n.state_starton_greatdog = 2;
               }
               break;
            case 'item':
               if (choice.item === 'spanner') {
                  await battler.human(...text.b_opponent_greatdog.fetch());
                  if (world.goatbro) {
                     SAVE.storage.inventory.remove('spanner');
                  } else {
                     volatile.sparable = true;
                     SAVE.data.n.state_starton_greatdog = 1;
                     volatile.vars.fetcher = true;
                     volatile.vars.close = true;
                     statustext = [ () => text.b_opponent_greatdog.fetchStatus ];
                     volatile.vars.ignores = 0;
                  }
               }
               break;
            case 'act':
               switch (choice.act) {
                  case 'check':
                     ignore = true;
                     break;
                  case 'beckon':
                     if (volatile.vars.close) {
                        await battler.human(...text.b_opponent_greatdog.closeText);
                     } else {
                        await battler.human(...text.b_opponent_greatdog.beckonText);
                        volatile.vars.close = true;
                     }
                     break;
                  case 'play':
                     if (volatile.vars.fetcher) {
                        await battler.human(...text.b_opponent_greatdog.playText4);
                     } else if (volatile.vars.pets < 1) {
                        ignore = true;
                        await battler.human(...text.b_opponent_greatdog.playText1);
                     } else if (volatile.vars.pets > 1) {
                        await battler.human(...text.b_opponent_greatdog.playText3);
                     } else {
                        await battler.human(...text.b_opponent_greatdog.playText2);
                        volatile.vars.pets = 2;
                     }
                     break;
                  case 'pet':
                     if (volatile.vars.fetcher) {
                        await battler.human(...text.b_opponent_greatdog.petText2);
                     } else if (!volatile.vars.close) {
                        ignore = true;
                        await battler.human(...text.b_opponent_greatdog.petText0);
                     } else if (volatile.vars.pets < 1) {
                        await battler.human(...text.b_opponent_greatdog.petText1);
                        volatile.vars.pets++;
                        volatile.vars.ignores = 0;
                     } else if (volatile.vars.pets > 1) {
                        await battler.human(
                           ...[
                              text.b_opponent_greatdog.petText3,
                              text.b_opponent_greatdog.petText4,
                              text.b_opponent_greatdog.petText5
                           ][Math.min(volatile.vars.pets, 4) - 2]
                        );
                        switch (volatile.vars.pets++) {
                           case 2: {
                              battler.stat.speed.modifiers.push(volatile.vars.speedmod);
                              break;
                           }
                           case 3:
                              volatile.sparable = true;
                              battler.stat.speed.modifiers.splice(
                                 battler.stat.speed.modifiers.indexOf(volatile.vars.speedmod),
                                 1
                              );
                              break;
                        }
                     } else {
                        await battler.human(...text.b_opponent_greatdog.petText2);
                     }
                     break;
                  case 'flirt':
                     SAVE.data.b.flirt_greatdog = true;
                     volatile.flirted = true;
                     break;
               }
               break;
            case 'spare':
               ignore = true;
               if (!volatile.sparable) {
                  break;
               }
               battler.music?.stop();
               battler.spare();
               return;
            case 'fake':
               ignore = true;
               break;
         }
         if (world.genocide || volatile.vars.fetcher) {
            ignore = false;
         }
         if (volatile.vars.pets < 1 && ignore) {
            volatile.vars.ignores++;
            volatile.vars.close = true;
            if (volatile.vars.ignores < 3) {
               await battler.human(...text.b_opponent_greatdog.waitText);
            } else {
               await battler.human(...text.b_opponent_greatdog.doneText);
               battler.music?.stop();
               SAVE.data.n.state_starton_greatdog = 3;
               volatile.sparable = true;
               battler.spare(-1, false, world.genocide);
               return;
            }
         }
         if (battler.hurt.includes(volatile)) {
            statustext = [ () => text.b_opponent_greatdog.hurtStatus() ];
         } else if (volatile.vars.ignores > 0) {
            if (volatile.vars.close) {
               statustext = [
                  [ () => text.b_opponent_greatdog.ignoreStatus1(), () => text.b_opponent_greatdog.ignoreStatus2() ][
                     Math.min(volatile.vars.ignores - 1, 3)
                  ]
               ];
            }
         } else if (volatile.vars.pets > 0) {
            if (!volatile.vars.fetcher) {
               statustext = [
                  [
                     () => text.b_opponent_greatdog.petStatus1(),
                     () => text.b_opponent_greatdog.petStatus2(),
                     () => text.b_opponent_greatdog.petStatus3(),
                     () => text.b_opponent_greatdog.petStatus4()
                  ][Math.min(volatile.vars.pets, 4) - 1]
               ];
            }
         } else if (volatile.vars.close) {
            if (!volatile.vars.fetcher) {
               statustext = [ () => text.b_opponent_greatdog.closeStatus() ];
            }
         }
         if (battler.alive.length !== 0) {
            await battler.resume(async () => {
               const index = SAVE.data.n.state_starton_greatdog === 1 ? 0 : battler.pattern('greatdog', [ 0, 1 ]);
               await standardSize(index === 0 ? { x: 100, y: 65 } : { x: 200, y: 45 }, true);
               standardPos(true);
               if (SAVE.data.n.state_starton_greatdog === 1) {
                  await renderer.pause(450);
               } else {
                  await patterns.greatdog(index);
               }
               battler.status = selectElement(statustext);
               await resetBox(true);
            });
         } else {
            battler.music?.stop();
         }
      },
      sprite: volatile =>
         new CosmosAnimation({
            active: true,
            anchor: { y: 1, x: 0 },
            resources: content.ibcGreatdog
         }).on('tick', function () {
            const vars = volatile.vars;
            const ignores = Math.max((vars.ignores as number) || 0, vars.close ? 1 : 0) % 3;
            this.scale.set([ 1, 1.5, 2 ][ignores]);
            this.position.y = [ 0, 35, 70 ][ignores];
         }),
      goodbye: () => new CosmosSprite({ active: true, anchor: { y: 1, x: 0 }, frames: [ content.ibcGreatdogSleep ] })
   }),
   papyrus: new OutertaleOpponent({
      flirted: () => SAVE.data.b.flirt_papyrus,
      dramatic: true,
      assets: new CosmosInventory(
         content.asBell,
         content.ibbBone,
         content.ibbBonesection,
         content.ibcPapyrusBattle,
         inventories.ibcPapyrusHead,
         content.ibuBlueSOUL,
         content.asLanding,
         content.ibcPapyrusBattleOpen,
         content.ibcPapyrusHeadless,
         content.ibbBlimpstrat,
         content.ibbSpecatk,
         content.ibbSpecatkBone,
         content.asSpecin,
         content.asSpecout,
         content.avAsriel3,
         content.asUpgrade
      ),
      bullied: () => SAVE.data.b.bullied_papyrus,
      bullyable: true,
      exp: 0,
      hp: 680,
      df: 2,
      metadata: { reactSpanner: true },
      acts: () => [
         [
            'check',
            v =>
               papreal()
                  ? text.b_opponent_papyrus.act_check()
                  : battler.hurt.includes(v)
                  ? text.b_opponent_papyrus.act_check2
                  : v.sparable
                  ? text.b_opponent_papyrus.act_check3
                  : text.b_opponent_papyrus.act_check()
         ],
         [ 'flirt', text.b_opponent_papyrus.act_flirt ],
         [ 'insult', text.b_opponent_papyrus.act_insult ]
      ],
      sparable: false,
      name: () => text.b_opponent_papyrus.name,
      async handler (choice, target, volatile) {
         const papchat = async (...lines: string[]) => {
            vars.facelock = false;
            await battler.monster(false, { x: 195, y: 15 }, battler.bubbles.twinkly, ...lines);
            vars.facelock = true;
         };

         const vars = volatile.vars as Partial<{
            phase: number;
            turns: number;
            spannerCatch: number;
            sparableSpannerCatch: number;
            sparableFlirt: number;
            sparableInsult: number;
            facelock: boolean;
            flirted: number;
            insult: number;
            vulnerable: boolean;
            hit: boolean;
            fail: boolean;
            epic: number;
            epicstyle: number;
         }>;

         vars.phase ??= 0;
         vars.turns ??= 0;
         vars.spannerCatch ??= 0;
         vars.sparableSpannerCatch ??= 0;
         vars.sparableFlirt ??= 0;
         vars.sparableInsult ??= 0;
         vars.facelock ??= false;
         vars.flirted ??= 0;
         vars.insult ??= 0;
         vars.vulnerable ??= false;
         vars.hit ??= false;
         vars.fail ??= false;
         vars.epic ??= 0;
         vars.epicstyle ??= 0;

         let dustrus = true;
         let epicFlirt = false;
         let epicInsult = false;
         switch (choice.type) {
            case 'fight':
               if (
                  volatile.sparable ||
                  battler.bullied.includes(volatile) ||
                  volatile.hp <= battler.calculate(volatile, choice.score)
               ) {
                  battler.music?.stop();
               }
               vars.hit = true;
               if (
                  await battler.attack(
                     volatile,
                     volatile.sparable || battler.bullied.includes(volatile)
                        ? { power: 0, operation: 'multiply' }
                        : { power: choice.score },
                     true,
                     true
                  )
               ) {
                  speech.state.face = faces.papyrusBattleOwwie;
                  speech.state.face.reset();
                  vars.hit = false;
                  SAVE.data.n.state_starton_papyrus = 1;
                  await renderer.pause(350);
                  await papchat(...text.b_opponent_papyrus.death1());
                  await renderer.pause(350);
                  const sprite = volatile.container.objects[0] as CosmosAnimation;
                  const facebox = sprite.objects[0];
                  await battler.vaporize(sprite, { handler: unit => (facebox.position.y -= unit) });
                  await facebox.position.modulate(
                     renderer,
                     1000,
                     facebox.position.add({ x: 5, y: -30 }),
                     facebox.position.add({ x: 10, y: 75 })
                  );
                  sounds.landing.instance(renderer);
                  shake(2, 750);
                  await renderer.pause(650);
                  vars.facelock = false;
                  await battler.monster(
                     false,
                     { x: 190, y: 90 },
                     battler.bubbles.twinkly,
                     ...text.b_opponent_papyrus.death2()
                  );
                  vars.facelock = true;
                  await renderer.pause(650);
                  SAVE.data.n.exp += 200;
                  await battler.vaporize(facebox.objects[0] as CosmosSprite, { rate: 1 });
                  await renderer.pause(1000);
                  events.fire('exit');
                  return;
               } else {
                  vars.hit = false;
                  if (vars.phase < 1) {
                     await papchat(...text.b_opponent_papyrus.turnTalk0a, ...text.b_opponent_papyrus.turnTalk0c);
                     vars.phase = 1;
                  }
               }
               break;
            case 'act':
               switch (choice.act) {
                  case 'check':
                     if (!papreal() && vars.phase < 1) {
                        await papchat(...text.b_opponent_papyrus.checkTalk);
                     }
                     break;
                  case 'flirt':
                     if (papreal()) {
                        dustrus = false;
                        if (world.genocide) {
                           epicFlirt = true;
                        } else {
                           await papchat(
                              ...[
                                 text.b_opponent_papyrus.sparableFlirt1x,
                                 text.b_opponent_papyrus.sparableFlirt2x,
                                 text.b_opponent_papyrus.sparableFlirt3
                              ][Math.min(vars.sparableFlirt++, 2)]
                           );
                        }
                     } else if (volatile.sparable || battler.bullied.includes(volatile)) {
                        dustrus = false;
                        await papchat(
                           ...[
                              text.b_opponent_papyrus.sparableFlirt1,
                              text.b_opponent_papyrus.sparableFlirt2,
                              text.b_opponent_papyrus.sparableFlirt3
                           ][Math.min(vars.sparableFlirt++, 2)]
                        );
                     } else if (vars.phase < 1) {
                        if (vars.flirted < 1) {
                           dustrus = false;
                           vars.flirted = 1;
                           volatile.flirted = true;
                           SAVE.data.b.flirt_papyrus = true;
                           if (!SAVE.data.b.oops) {
                              await battler.human(...text.b_opponent_papyrus.flirt0);
                           }
                           await papchat(...text.b_opponent_papyrus.flirt1);
                           await battler.human(...text.b_opponent_papyrus.flirt2);
                           await papchat(
                              ...[ text.b_opponent_papyrus.flirt3a, text.b_opponent_papyrus.flirt3b ][choicer.result],
                              ...text.b_opponent_papyrus.flirt4
                           );
                           SAVE.data.b.papyrus_quality = choicer.result === 0;
                        } else if (vars.flirted < 2) {
                           dustrus = false;
                           vars.insult = 2;
                           vars.flirted = 2;
                           await papchat(...text.b_opponent_papyrus.flirt5);
                        } else {
                           await battler.human(...text.b_opponent_papyrus.flirt6);
                        }
                     } else {
                        await battler.human(...text.b_opponent_papyrus.flirt7);
                     }
                     break;
                  case 'insult':
                     if (papreal()) {
                        dustrus = false;
                        if (world.genocide) {
                           epicInsult = true;
                        } else {
                           await papchat(
                              ...[
                                 text.b_opponent_papyrus.sparableInsult1x,
                                 text.b_opponent_papyrus.sparableInsult2x,
                                 text.b_opponent_papyrus.sparableInsult3
                              ][Math.min(vars.sparableFlirt++, 2)]
                           );
                        }
                     } else if (volatile.sparable || battler.bullied.includes(volatile)) {
                        dustrus = false;
                        await papchat(
                           ...[
                              text.b_opponent_papyrus.sparableInsult1,
                              text.b_opponent_papyrus.sparableInsult2,
                              text.b_opponent_papyrus.sparableInsult3
                           ][Math.min(vars.sparableInsult++, 2)]
                        );
                     } else if (vars.phase < 1) {
                        if (vars.insult < 1) {
                           dustrus = false;
                           vars.insult = 1;
                           await papchat(...text.b_opponent_papyrus.insult1);
                        } else if (vars.insult < 2) {
                           dustrus = false;
                           vars.insult = 2;
                           vars.flirted = 2;
                           await papchat(...text.b_opponent_papyrus.insult2);
                        } else {
                           await battler.human(...text.b_opponent_papyrus.insult3);
                        }
                     } else {
                        await battler.human(...text.b_opponent_papyrus.insult4);
                     }
                     break;
               }
               break;
            case 'item':
               if (choice.item === 'spaghetti') {
                  if (vars.phase < 1 || volatile.sparable || battler.bullied.includes(volatile)) {
                     await papchat(...text.b_opponent_papyrus.spaghetti1());
                  } else {
                     await battler.human(...text.b_opponent_papyrus.spaghetti2);
                  }
               } else if (choice.item === 'spanner') {
                  await battler.human(...text.b_opponent_papyrus.spanner);
                  if (vars.phase < 1 || volatile.sparable || battler.bullied.includes(volatile)) {
                     if (volatile.sparable || battler.bullied.includes(volatile)) {
                        await papchat(
                           ...[
                              text.b_opponent_papyrus.sparableSpannerTalk1,
                              text.b_opponent_papyrus.sparableSpannerTalk2
                           ][Math.min(vars.sparableSpannerCatch++, 1)]
                        );
                     } else {
                        await papchat(
                           ...[
                              text.b_opponent_papyrus.spannerTalk1,
                              text.b_opponent_papyrus.spannerTalk2,
                              text.b_opponent_papyrus.spannerTalk3,
                              text.b_opponent_papyrus.spannerTalk4
                           ][Math.min(vars.spannerCatch++, 3)]
                        );
                     }
                  }
               }
               break;
            case 'spare':
               if (battler.bullied.includes(volatile)) {
                  SAVE.data.b.bullied_papyrus = true;
                  SAVE.data.n.bully++;
               } else if (!volatile.sparable) {
                  if (vars.phase < 1) {
                     await papchat(...text.b_opponent_papyrus.turnTalk0b, ...text.b_opponent_papyrus.turnTalk0c);
                     vars.phase = 1;
                  }
                  break;
               }
               battler.music?.stop();
               events.fire('exit');
               return;
         }
         if (volatile.sparable || battler.bullied.includes(volatile)) {
            const h = async () => {
               battler.music?.stop();
               const anim = volatile.container.objects[0] as CosmosAnimation;
               anim.use(content.ibcPapyrusBattle);
               anim.position.x = 0;
               anim.objects[0].position.x = 19;
               await renderer.pause(1400);
            };
            let sex2secretending = false;
            if (dustrus) {
               if (!papreal()) {
                  if (!volatile.vars.whoopsmightabulliedyou && battler.bullied.includes(volatile)) {
                     battler.music?.rate.modulate(renderer, 1000, 0.8);
                     await papchat(...text.b_opponent_papyrus.bullySpareTalk);
                     volatile.vars.whoopsmightabulliedyou = true;
                  } else {
                     await papchat(
                        ...(volatile.sparable
                           ? text.b_opponent_papyrus.idleTalk
                           : text.b_opponent_papyrus.idleTalkBullied)
                     );
                  }
               }
            } else if (epicFlirt) {
               if (vars.epicstyle === 0) {
                  await papchat(
                     ...[
                        text.b_opponent_papyrus.secretFlirt1,
                        text.b_opponent_papyrus.secretFlirt2,
                        text.b_opponent_papyrus.secretFlirt3,
                        text.b_opponent_papyrus.secretFlirt4,
                        text.b_opponent_papyrus.secretFlirt5,
                        text.b_opponent_papyrus.secretFlirt6
                     ][vars.epic++]
                  );
               } else {
                  vars.epicstyle = 0;
                  await papchat(
                     ...[
                        [],
                        text.b_opponent_papyrus.secretInsult2x,
                        text.b_opponent_papyrus.secretInsult3x,
                        text.b_opponent_papyrus.secretInsult4x,
                        text.b_opponent_papyrus.secretInsult5x,
                        text.b_opponent_papyrus.secretInsult6x
                     ][vars.epic++]
                  );
               }
               if (vars.epic === 6) {
                  sex2secretending = true;
                  await h();
                  await papchat(...text.b_opponent_papyrus.secretFlirt7);
               }
            } else if (epicInsult) {
               if (vars.epic === 0 || vars.epicstyle === 1) {
                  vars.epicstyle = 1;
                  await papchat(
                     ...[
                        text.b_opponent_papyrus.secretInsult1,
                        text.b_opponent_papyrus.secretInsult2,
                        text.b_opponent_papyrus.secretInsult3,
                        text.b_opponent_papyrus.secretInsult4,
                        text.b_opponent_papyrus.secretInsult5,
                        text.b_opponent_papyrus.secretInsult6
                     ][vars.epic++]
                  );
                  if (vars.epic === 6) {
                     sex2secretending = true;
                     await h();
                     await papchat(...text.b_opponent_papyrus.secretInsult7);
                  }
               } else {
                  vars.epicstyle = 1;
                  await papchat(
                     ...[
                        [],
                        text.b_opponent_papyrus.secretFlirt2x,
                        text.b_opponent_papyrus.secretFlirt3x,
                        text.b_opponent_papyrus.secretFlirt4x,
                        text.b_opponent_papyrus.secretFlirt5x,
                        text.b_opponent_papyrus.secretFlirt6x
                     ][vars.epic]
                  );
                  if (vars.epic === 5) {
                     sex2secretending = true;
                     await h();
                     await papchat(...text.b_opponent_papyrus.secretFlirt8);
                  }
               }
            }
            if (sex2secretending) {
               await volatile.container.position.modulate(renderer, 1000, { x: -80 });
               SAVE.data.b.papyrus_secret = true;
               SAVE.data.n.state_starton_papyrus = 1;
               events.fire('exit');
               return;
            }
         } else if (vars.phase > 0) {
            await papchat(
               ...CosmosUtils.provide(
                  [
                     [],
                     [ text.b_opponent_papyrus.turnTalk1a, text.b_opponent_papyrus.turnTalk1b ][
                        SAVE.data.b.flirt_papyrus ? 1 : 0
                     ],
                     [ text.b_opponent_papyrus.turnTalk2a, text.b_opponent_papyrus.turnTalk2b ][
                        SAVE.data.b.flirt_papyrus ? 1 : 0
                     ],
                     text.b_opponent_papyrus.turnTalk3,
                     text.b_opponent_papyrus.turnTalk4,
                     text.b_opponent_papyrus.turnTalk5,
                     text.b_opponent_papyrus.turnTalk6,
                     text.b_opponent_papyrus.turnTalk7,
                     text.b_opponent_papyrus.turnTalk8,
                     text.b_opponent_papyrus.turnTalk9,
                     text.b_opponent_papyrus.turnTalk10,
                     [ text.b_opponent_papyrus.turnTalk11a, text.b_opponent_papyrus.turnTalk11b ][
                        SAVE.data.b.flirt_papyrus ? 1 : 0
                     ],
                     text.b_opponent_papyrus.turnTalk12,
                     [ text.b_opponent_papyrus.turnTalk13a, text.b_opponent_papyrus.turnTalk13b ][
                        SAVE.data.b.flirt_papyrus ? 1 : 0
                     ],
                     text.b_opponent_papyrus.turnTalk14,
                     text.b_opponent_papyrus.turnTalk15,
                     text.b_opponent_papyrus.turnTalk16,
                     text.b_opponent_papyrus.turnTalk17,
                     text.b_opponent_papyrus.turnTalk18,
                     text.b_opponent_papyrus.turnTalk19,
                     text.b_opponent_papyrus.turnTalk20,
                     text.b_opponent_papyrus.turnTalk21,
                     text.b_opponent_papyrus.turnTalk22,
                     text.b_opponent_papyrus.turnTalk23,
                     text.b_opponent_papyrus.turnTalk24
                  ][vars.turns]
               )
            );
         }

         await battler.resume(async o => {
            await standardSize({ x: 125, y: 65 });
            standardPos();
            if (volatile.sparable || volatile.vars.whoopsmightabulliedyou === true || vars.phase! < 1) {
               await renderer.pause(450);
            } else {
               const state = { d: false };
               const hurtListener = () => {
                  if (SAVE.data.n.hp === 0) {
                     events.off('hurt', hurtListener);
                     state.d = true;
                     battler.music?.stop();
                  }
               };
               events.on('hurt', hurtListener);
               await patterns.papyrus(state, vars.turns!++);
               events.off('hurt', hurtListener);
               if (state.d) {
                  vars.fail = true;
                  await papchat(
                     ...[
                        text.b_opponent_papyrus.capture1,
                        text.b_opponent_papyrus.capture2,
                        text.b_opponent_papyrus.capture3,
                        text.b_opponent_papyrus.capture4,
                        text.b_opponent_papyrus.capture5
                     ][Math.min(SAVE.data.n.state_papyrus_capture - 1, 4)]
                  );
                  events.fire('exit');
                  return o;
               } else if (vars.turns === 25) {
                  await papchat(...text.b_opponent_papyrus.turnTalk24x);
                  volatile.sparable = true;
                  volatile.opponent.bullyable = false;
               } else {
                  switch (vars.turns) {
                     case 1:
                        await papchat(...text.b_opponent_papyrus.turnTalk0x);
                        battler.music?.stop();
                        battler.music = music.papyrusboss.instance(renderer);
                        break;
                     case 20:
                        SAVE.data.b.papyrus_specatk = true;
                        await papchat(...text.b_opponent_papyrus.turnTalk19x);
                        battler.music?.stop();
                        battler.music = music.specatk.instance(renderer);
                        break;
                  }
               }
            }
            if (volatile.sparable) {
               battler.status = () => text.b_opponent_papyrus.status1;
            } else if (vars.phase! < 1) {
               battler.status = () => text.b_opponent_papyrus.status2;
            } else if (battler.hurt.includes(volatile)) {
               battler.status = () => text.b_opponent_papyrus.hurtStatus;
            } else if (SAVE.data.b.flirt_papyrus && vars.turns! < 11) {
               battler.status = [
                  () => text.b_opponent_papyrus.flirtStatus1,
                  () => text.b_opponent_papyrus.flirtStatus2,
                  () => text.b_opponent_papyrus.flirtStatus3,
                  () => text.b_opponent_papyrus.flirtStatus4,
                  () => text.b_opponent_papyrus.flirtStatus5,
                  () => text.b_opponent_papyrus.flirtStatus6,
                  () => text.b_opponent_papyrus.flirtStatus7,
                  () => text.b_opponent_papyrus.flirtStatus8,
                  () => text.b_opponent_papyrus.flirtStatus9,
                  () => text.b_opponent_papyrus.flirtStatus10,
                  () => text.b_opponent_papyrus.flirtStatus11
               ][vars.turns!];
            } else if (vars.turns! < 19) {
               battler.status = [
                  () => text.b_opponent_papyrus.randomStatus1,
                  () => text.b_opponent_papyrus.randomStatus2,
                  () => text.b_opponent_papyrus.randomStatus3,
                  () => text.b_opponent_papyrus.randomStatus4,
                  () => text.b_opponent_papyrus.randomStatus5,
                  () => text.b_opponent_papyrus.randomStatus6,
                  () => text.b_opponent_papyrus.randomStatus7,
                  () => text.b_opponent_papyrus.randomStatus8,
                  () => text.b_opponent_papyrus.randomStatus9
               ][rng.dialogue.int(9)];
            } else {
               battler.status = [
                  () => text.b_opponent_papyrus.specialStatus0,
                  () => text.b_opponent_papyrus.specialStatus1,
                  () => text.b_opponent_papyrus.specialStatus2,
                  () => text.b_opponent_papyrus.specialStatus3,
                  () => text.b_opponent_papyrus.specialStatus4,
                  () => text.b_opponent_papyrus.specialStatus5,
                  () => text.b_opponent_papyrus.specialStatus6
               ][vars.turns! - 19];
            }
            await resetBox();
         });
      },
      sprite: v => {
         v.vars.holderrr?.();
         const face = new CosmosObject({ position: { x: papreal() ? 33 : 19, y: 3 } });
         const holder = () => {
            const vars = v.vars;
            if (!vars.facelock) {
               face.alpha.value = 1;
               face.objects = vars.hit
                  ? [ faces.papyrusBattleOwwie ]
                  : speech.state.face
                  ? [ speech.state.face ]
                  : [ faces.papyrusBattleMad ];
            } else if (vars.faceoverride) {
               face.objects = [ vars.faceoverride ];
            }
         };
         holder();
         face.on('tick', holder);
         speech.holders.push(holder);
         v.vars.holderrr = () => {
            v.vars.holderrr = null;
            speech.holders.splice(speech.holders.indexOf(holder), 1);
         };
         events.on('battle-exit').then(() => {
            v.vars.holderrr?.();
         });
         return new CosmosAnimation({
            active: true,
            position: { x: papreal() ? -14 : 0 },
            resources: papreal() ? content.ibcPapyrusBattleOpen : content.ibcPapyrusBattle,
            objects: [
               face,
               new CosmosSprite({
                  alpha: 0,
                  frames: [ content.ibcPapyrusHeadless ],
                  position: { x: papreal() ? 14 : 0 }
               })
            ]
         });
      }
   }),
   shocksans: new OutertaleOpponent({
      hp: 1,
      dramatic: true,
      sprite: () => new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.ibcSansDeath })
   }),
   shockasgore: new OutertaleOpponent({
      assets: new CosmosInventory(content.ibcAsgoreStatic),
      exp: 0,
      hp: 1,
      df: 0,
      ghost: true,
      name: () => text.b_opponent_shockasgore.name,
      acts: () => [
         [ 'check', text.b_opponent_shockasgore.act_check ],
         [ 'hug', text.b_opponent_shockasgore.act_hug ]
      ],
      sparable: false,
      metadata: { reactSpanner: true },
      async handler (choice, target, volatile) {
         const vars = volatile.vars;
         const goreyChat = async (...lines: string[]) => {
            vars.facelock = false;
            await battler.monster(false, { x: 220, y: 10 }, battler.bubbles.napstablook, ...lines);
            vars.facelock = true;
         };
         let reveal = false;
         const glitchx = async (intensity: number) => {
            reveal = true;
            battler.music?.stop();
            const gorey = battler.alive[0].container;
            const filter = new GlitchFilter({ slices: 20, offset: 0 });
            gorey.container.filters = [ filter ];
            const trueOffset = new CosmosValue();
            const ticker = () => {
               filter.offset = trueOffset.value;
               filter.refresh();
            };
            renderer.on('tick', ticker);
            trueOffset.value = (SAVE.flag.b.$option_epilepsy ? 10 : 20) * intensity;
            await trueOffset.modulate(renderer, 1000, 3 * intensity, 1 * intensity);
            await trueOffset.modulate(renderer, 1000, 1 * intensity, 0, 0);
            renderer.off('tick', ticker);
            gorey.container.filters = [];
            filter.destroy();
         };
         switch (choice.type) {
            case 'fight':
               await Promise.all([ glitchx(2), battler.attack(volatile, { power: 0, operation: 'add' }, true, true) ]);
               break;
            case 'item':
               if (choice.item === 'spanner') {
                  await glitchx(1);
                  await battler.human(...text.b_opponent_shockasgore.stickText);
                  SAVE.storage.inventory.remove('spanner');
               } else if (
                  !volatile.vars.foodreaction &&
                  [ 'pie', 'pie2', 'pie3', 'pie4', 'snails' ].includes(choice.item)
               ) {
                  volatile.vars.foodreaction = true;
                  await goreyChat(...text.b_opponent_shockasgore.foodText);
               }
               break;
            case 'act':
               if (choice.act === 'hug') {
                  await glitchx(1);
                  await battler.human(...text.b_opponent_shockasgore.hugText);
               }
               break;
         }
         if (reveal) {
            SAVE.flag.n.ga_asriel30x++;
            await battler.alpha.modulate(renderer, 1000, 0);
            await renderer.pause(1000);
            await goreyChat(...text.b_opponent_shockasgore.miss);
            events.fire('exit');
         } else {
            await goreyChat(
               ...[
                  text.b_opponent_shockasgore.idleText2,
                  text.b_opponent_shockasgore.idleText3,
                  text.b_opponent_shockasgore.idleText4
               ][rng.dialogue.int(3)]
            );
            battler.status = () => text.b_opponent_shockasgore.status2;
            battler.resume();
         }
      },
      sprite: v => {
         v.vars.holderrr?.();
         const face = new CosmosObject({ position: { y: -92.5 } });
         const holder = () => {
            const vars = v.vars;
            if (!vars.facelock) {
               face.alpha.value = 1;
               face.objects = [ speech.state.face || faces.asgoreCutscene1 ];
            } else if (vars.faceoverride) {
               face.objects = [ vars.faceoverride ];
            }
         };
         holder();
         face.on('tick', holder);
         speech.holders.push(holder);
         v.vars.holderrr = () => {
            v.vars.holderrr = null;
            speech.holders.splice(speech.holders.indexOf(holder), 1);
         };
         events.on('battle-exit').then(() => {
            v.vars.holderrr?.();
         });
         return new CosmosAnimation({
            anchor: { x: 0, y: 1 },
            resources: content.ibcAsgoreStatic,
            objects: [ face ]
         });
      }
   })
};

for (const [ key, value ] of Object.entries(opponents)) {
   value.assets.name = `opponents::${key}`;
}

battler.opponentRegistry.register(opponents);

export default opponents;

CosmosUtils.status(`LOAD MODULE: STARTON OPPONENTS (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
