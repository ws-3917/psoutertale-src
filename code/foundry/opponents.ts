import { AlphaFilter, Rectangle } from 'pixi.js';
import commonText from '../../languages/default/text/common';
import text from '../../languages/default/text/foundry';
import {
   epiphany,
   erndyne,
   helmetdyne,
   helmetoverride,
   kiddFight,
   kiddHandler,
   kiddReaction,
   kiddReactionBully,
   kiddTurn,
   resetBox,
   standardPos,
   standardSize
} from '../common/api';
import commonPatterns from '../common/patterns';
import { content, inventories, music, sounds } from '../systems/assets';
import { events, game, keys, renderer, rng, speech } from '../systems/core';
import { antifreeze, battler, dialogue, heal, oops, sawWaver, selectElement, sineWaver, world } from '../systems/framework';
import { OutertaleOpponent } from '../systems/outertale';
import { SAVE } from '../systems/save';
import {
   CosmosAnimation,
   CosmosDirection,
   CosmosFont,
   CosmosInventory,
   CosmosKeyboardInput,
   CosmosKeyed,
   CosmosMath,
   CosmosObject,
   CosmosPoint,
   CosmosPointSimple,
   CosmosRectangle,
   CosmosSprite,
   CosmosText,
   CosmosUtils,
   CosmosValue,
   CosmosValueLinked
} from '../systems/storyteller';
import { badSpider, dogecon, respecc } from './extras';
import patterns from './patterns';

const opponents = {
   doge: new OutertaleOpponent({
      flirted: () => SAVE.data.b.flirt_doge,
      assets: new CosmosInventory(
         content.ibcDoge,
         content.ibcDogeHurt,
         content.ibcDogeTail,
         content.amDogerelax,
         content.ibbSpear,
         content.asLanding,
         content.ibbCrosshair,
         content.asStab
      ),
      exp: 150,
      hp: 450,
      df: 0,
      name: () => text.b_opponent_doge.name,
      acts: () => [
         [ 'check', text.b_opponent_doge.act_check ],
         [
            'flirt',
            v =>
               [ text.b_opponent_doge.act_flirt(), text.b_opponent_doge.act_flirt2, text.b_opponent_doge.act_flirt3 ][
                  v.sparable && (v.vars.flirtcounter ?? 0) < 2 ? 0 : v.vars.flirtcounter ?? 0
               ]
         ],
         [ 'bathe', [] ] /* volatile => (!save.data.b.oops && volatile.vars.turns === 2 ? '#ff0' : 0xffffff) */,
         [ 'walk', [] ],
         [ 'pet', [] ]
      ],
      sparable: false,
      metadata: { reactSpanner: true },
      g: 60,
      async handler (choice, target, volatile) {
         let attack = true;
         let status = true;
         volatile.vars.pets ||= 0;
         volatile.vars.astat ||= 0;
         volatile.vars.turns ||= 0;
         let turn = volatile.vars.turns++;
         let petTalk = false;
         const talk = (...lines: string[]) =>
            battler.monster(false, volatile.container.position.add(31, -105), battler.bubbles.napstablook, ...lines);
         switch (choice.type) {
            case 'fight':
               volatile.vars.attacked = true;
               if (
                  await battler.attack(
                     volatile,
                     volatile.sparable ? { power: 0, operation: 'multiply' } : { power: choice.score }
                  )
               ) {
                  SAVE.data.n.state_foundry_doge = 1;
                  battler.music?.stop();
                  return;
               }
               break;
            case 'item':
               if (choice.item === 'spanner') {
                  if (volatile.sparable) {
                     if (volatile.vars.pet) {
                        await battler.human(...text.b_opponent_doge.fetchTextEpic);
                     } else {
                        await battler.human(...text.b_opponent_doge.fetchTextGarb);
                     }
                  } else {
                     status = false;
                     await battler.human(...text.b_opponent_doge.fetchText());
                     battler.stat.speed.modifiers.push([ 'multiply', 0.75, 1 ]);
                     battler.status = () => text.b_opponent_doge.fetchStatus;
                  }
               }
               break;
            case 'act':
               switch (choice.act) {
                  case 'flirt':
                     volatile.vars.flirtcounter ??= 0;
                     if (!(dogecon() || world.goatbro) && (volatile.sparable || 10 <= world.flirt)) {
                        if (volatile.sparable && volatile.vars.flirtcounter < 2) {
                           if (volatile.vars.pet) {
                              SAVE.data.b.flirt_doge = true;
                              battler.status = () => text.b_opponent_doge.flirtStatusAccept;
                           } else {
                              battler.status = () => text.b_opponent_doge.flirtStatusReject;
                           }
                           status = false;
                        } else if (++volatile.vars.flirtcounter === 3) {
                           SAVE.data.b.flirt_doge = true;
                           volatile.flirted = true;
                           volatile.sparable = true;
                           SAVE.data.n.state_foundry_doge = 3;
                           battler.music?.stop();
                           battler.spare();
                           return;
                        } else {
                           battler.status = () => text.b_opponent_doge.flirtStatus;
                           status = false;
                        }
                     }
                     break;
                  case 'bathe':
                     if (dogecon() || world.goatbro) {
                        await battler.human(...text.b_opponent_doge.batheTextGeno);
                     } else if (turn < 2) {
                        await battler.human(...text.b_opponent_doge.batheTextEarly);
                     } else if (turn > 2) {
                        if (volatile.vars.bathe) {
                           await battler.human(...text.b_opponent_doge.batheTextPost);
                        } else {
                           await battler.human(...text.b_opponent_doge.batheTextLate);
                        }
                     } else {
                        await battler.human(...text.b_opponent_doge.batheText);
                        (volatile.vars.astat as number) += 1;
                        volatile.vars.bathe = true;
                        attack = false;
                     }
                     break;
                  case 'walk':
                     if (dogecon() || world.goatbro) {
                        await battler.human(...text.b_opponent_doge.walkTextGeno);
                     } else if (turn < 3) {
                        await battler.human(...text.b_opponent_doge.walkTextEarly);
                     } else if (turn > 4) {
                        if (volatile.vars.walk) {
                           await battler.human(...text.b_opponent_doge.walkTextPost);
                        } else if (volatile.vars.bathe) {
                           await battler.human(...text.b_opponent_doge.walkTextLate1);
                        } else {
                           await battler.human(...text.b_opponent_doge.walkTextLate2);
                        }
                     } else if (volatile.vars.bathe) {
                        await battler.human(...text.b_opponent_doge.walkText);
                        (volatile.vars.astat as number) += 1;
                        volatile.vars.walk = true;
                        attack = false;
                        if (turn === 3) {
                           turn++;
                           volatile.vars.turns++;
                        }
                     } else {
                        await battler.human(...text.b_opponent_doge.walkTextSus);
                     }
                     break;
                  case 'pet':
                     if (dogecon() || world.goatbro) {
                        await battler.human(...text.b_opponent_doge.petTextGeno);
                     } else if (turn < 7) {
                        await battler.human(...text.b_opponent_doge.petTextEarly);
                     } else if (turn > 9) {
                        if (volatile.vars.pet) {
                           petTalk = true;
                           await battler.human(
                              ...[
                                 text.b_opponent_doge.petTextPost1,
                                 text.b_opponent_doge.petTextPost2,
                                 text.b_opponent_doge.petTextPost3,
                                 text.b_opponent_doge.petTextPost4,
                                 text.b_opponent_doge.petTextPost5,
                                 text.b_opponent_doge.petTextPost6,
                                 text.b_opponent_doge.petTextPost7
                              ][Math.min((volatile.vars.pets as number)++, 6)]
                           );
                        } else {
                           await battler.human(...text.b_opponent_doge.petTextLate);
                        }
                     } else if (volatile.vars.walk) {
                        battler.music?.stop();
                        await battler.human(...text.b_opponent_doge.petText);
                        const mus = (battler.music = music.dogerelax.instance(renderer));
                        mus.gain.value /= 16;
                        mus.gain.modulate(renderer, 1000, mus.gain.value * 16);
                        volatile.vars.pet = true;
                        attack = false;
                        if (turn === 7) {
                           turn += 2;
                           volatile.vars.turns += 2;
                        } else if (turn === 8) {
                           turn++;
                           volatile.vars.turns++;
                        }
                        volatile.sparable = true;
                     } else {
                        await battler.human(...text.b_opponent_doge.petTextSus);
                     }
                     break;
               }
               break;
            case 'spare':
               if (!volatile.sparable) {
                  break;
               }
               battler.spare();
               battler.music?.stop();
               if (volatile.vars.pet) {
                  SAVE.data.n.state_foundry_doge = 2;
               }
               return;
         }
         if (status && battler.hurt.includes(volatile)) {
            status = false;
            battler.status = () => text.b_opponent_doge.hurtStatus();
         }
         if (!(dogecon() || world.goatbro)) {
            if (turn === 9) {
               volatile.sparable = true;
               if (!volatile.vars.pet) {
                  battler.music?.stop();
               }
            }
         }
         if (petTalk) {
            await talk(...text.b_opponent_doge.petTalkPost);
         } else {
            await talk(
               ...[
                  text.b_opponent_doge.turnTalk1,
                  text.b_opponent_doge.turnTalk2,
                  text.b_opponent_doge.turnTalk3,
                  text.b_opponent_doge.turnTalk4,
                  text.b_opponent_doge.turnTalk5,
                  text.b_opponent_doge.turnTalk6,
                  text.b_opponent_doge.turnTalk7,
                  text.b_opponent_doge.turnTalk8,
                  text.b_opponent_doge.turnTalk9,
                  text.b_opponent_doge.turnTalk10,
                  text.b_opponent_doge.turnTalk11
               ][Math.min(turn as number, 10)]()
            );
         }
         if (status || (SAVE.data.n.exp <= 0 && [ 1, 3, 8 ].includes(turn as number))) {
            battler.status = world.genocide
               ? () => text.b_opponent_doge.status1()
               : [
                    () => text.b_opponent_doge.turnStatus1,
                    () => text.b_opponent_doge.turnStatus2(),
                    () => text.b_opponent_doge.turnStatus3(),
                    () => text.b_opponent_doge.turnStatus4(),
                    () => text.b_opponent_doge.turnStatus5(),
                    () => text.b_opponent_doge.turnStatus6(),
                    () => text.b_opponent_doge.turnStatus7(),
                    () => text.b_opponent_doge.turnStatus8(),
                    () => text.b_opponent_doge.turnStatus9(),
                    () => text.b_opponent_doge.turnStatus10()
                 ][Math.min(turn as number, 9)];
         }
         if (battler.alive.length !== 0) {
            await battler.resume(async () => {
               await standardSize({ x: 80, y: 80 }, true);
               standardPos(true);
               volatile.vars.attackturns ||= 0;
               await (attack && !volatile.sparable
                  ? patterns.doge(5 - volatile.vars.astat, volatile.vars.attackturns++)
                  : renderer.pause(450));
               await resetBox(true);
            });
         } else {
            battler.music?.stop();
         }
      },
      sprite: vola =>
         new CosmosAnimation({
            active: true,
            anchor: { x: 0, y: 1 },
            scale: 0.5,
            extrapolate: false,
            duration: dogecon() || world.goatbro ? 20 : 10,
            resources: content.ibcDogeTail,
            objects: [
               new CosmosAnimation({
                  active: true,
                  anchor: { x: 0, y: 1 },
                  position: { x: -2 },
                  extrapolate: false,
                  duration: dogecon() || world.goatbro ? 17 : 7,
                  resources: content.ibcDoge
               }).on('tick', function () {
                  if (vola.vars.pet) {
                     this.duration = 22;
                  } else if (vola.sparable) {
                     this.active && this.reset();
                  } else if (vola.vars.walk) {
                     this.duration = 17;
                  } else if (vola.vars.bathe) {
                     this.duration = 12;
                  }
               })
            ]
         }).on('tick', function () {
            if (vola.vars.pet) {
               this.duration = 5;
            } else if (vola.sparable) {
               this.active && this.reset();
            }
         }),
      goodbye: () => new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcDogeHurt ] })
   }),
   muffet: new OutertaleOpponent({
      flirted: () => SAVE.data.b.flirt_muffet,
      assets: new CosmosInventory(
         content.ibcMuffetArm1,
         content.ibcMuffetArm2a,
         content.ibcMuffetArm2b,
         content.ibcMuffetArm3,
         content.ibcMuffetCupcake,
         content.ibcMuffetEye1,
         content.ibcMuffetEye2,
         content.ibcMuffetEye3,
         content.ibcMuffetSpider,
         content.ibcMuffetSpiderSign,
         content.ibcMuffetDustrus,
         content.ibcMuffetHair,
         content.ibcMuffetHead,
         content.ibcMuffetHurt,
         content.ibcMuffetLegs,
         content.ibcMuffetPants,
         content.ibcMuffetShirt,
         content.ibcMuffetShoulder,
         content.ibcMuffetSpiderTelegram,
         content.ibcMuffetTeapot,
         content.ibuPurpleSOUL,
         content.amSpiderrelax,
         content.ibbSpider,
         content.ibbDonut,
         content.ibbCrossiant,
         content.ibbSpiderOutline,
         content.ibbDonutOutline,
         content.ibbCrossiantOutline,
         inventories.idcKidd,
         content.avKidd,
         content.ibbCupcakeAttack,
         content.ibbCupcake
      ),
      exp: 300,
      hp: 900,
      df: 0,
      g: 0,
      name: () => text.b_opponent_muffet.name,
      acts: () => [
         [ 'check', text.b_opponent_muffet.act_check ],
         [
            'counter',
            volatile =>
               badSpider()
                  ? text.b_opponent_muffet.counterTextGeno
                  : (volatile.vars.turns ?? 0) < 2
                  ? text.b_opponent_muffet.counterTextEarly
                  : volatile.vars.turns > 2
                  ? volatile.vars.counter
                     ? text.b_opponent_muffet.counterTextPost
                     : text.b_opponent_muffet.counterTextLate
                  : text.b_opponent_muffet.counterText
         ],
         [
            'appease',
            volatile =>
               badSpider()
                  ? text.b_opponent_muffet.appeaseTextGeno
                  : (volatile.vars.turns ?? 0) < 4
                  ? text.b_opponent_muffet.appeaseTextEarly
                  : volatile.vars.turns > 6
                  ? volatile.vars.appease
                     ? text.b_opponent_muffet.appeaseTextPost
                     : text.b_opponent_muffet.appeaseTextLate
                  : volatile.vars.counter
                  ? text.b_opponent_muffet.appeaseText
                  : text.b_opponent_muffet.appeaseTextSus
         ],
         [
            'pay',
            volatile =>
               badSpider()
                  ? text.b_opponent_muffet.payTextGeno
                  : (volatile.vars.turns ?? 0) < 8
                  ? text.b_opponent_muffet.payTextEarly
                  : volatile.vars.turns > 10
                  ? volatile.vars.pay
                     ? text.b_opponent_muffet.payTextPost
                     : text.b_opponent_muffet.payTextLate
                  : volatile.vars.appease
                  ? []
                  : text.b_opponent_muffet.payTextSus
         ],
         [
            'flirt',
            v =>
               [
                  text.b_opponent_muffet.act_flirt(),
                  text.b_opponent_muffet.act_flirt2,
                  text.b_opponent_muffet.act_flirt3
               ][v.sparable && (v.vars.flirtcounter ?? 0) < 2 ? 0 : v.vars.flirtcounter ?? 0]
         ]
      ],
      sparable: false,
      handler: battler.opponentHandler({
         vars: {
            attack: true,
            attacked: false,
            speedstat: 0.85,
            turns: 0,
            counter: false,
            appease: false,
            pay: false,
            didf: 0,
            kidf: 0,
            finalflirt: 0,
            hitmult: 1,
            flirtcounter: 0
         },
         bubble: pos => [ pos.add(31, -105), battler.bubbles.napstablook ],
         defaultTalk: state =>
            [
               text.b_opponent_muffet.turnTalk1,
               text.b_opponent_muffet.turnTalk2,
               text.b_opponent_muffet.turnTalk3,
               text.b_opponent_muffet.turnTalk4,
               text.b_opponent_muffet.turnTalk5,
               text.b_opponent_muffet.turnTalk6,
               text.b_opponent_muffet.turnTalk7,
               text.b_opponent_muffet.turnTalk8,
               text.b_opponent_muffet.turnTalk9,
               text.b_opponent_muffet.turnTalk10,
               text.b_opponent_muffet.turnTalk11,
               text.b_opponent_muffet.turnTalk12,
               text.b_opponent_muffet.turnTalk13
            ][Math.min(state.vars.turns, 12)](state.vars.didf + state.vars.kidf > 4),
         fight (state, power) {
            const res = battler.attack(
               state.volatile,
               state.volatile.sparable ? { power: 0, operation: 'multiply' } : { power, multiplier: state.vars.hitmult }
            );
            badSpider() && (state.vars.hitmult *= 1 / 0.9);
            return res;
         },
         postfight (state) {
            state.vars.didf++;
         },
         defaultStatus: state =>
            [
               () => text.b_opponent_muffet.turnStatus1(),
               () => text.b_opponent_muffet.turnStatus2(),
               () => text.b_opponent_muffet.turnStatus3(),
               () => text.b_opponent_muffet.turnStatus4(),
               () => text.b_opponent_muffet.turnStatus5(),
               () => text.b_opponent_muffet.turnStatus6(),
               () => text.b_opponent_muffet.turnStatus7(),
               () => text.b_opponent_muffet.turnStatus8(),
               () => text.b_opponent_muffet.turnStatus9(),
               () => text.b_opponent_muffet.turnStatus10(),
               () => text.b_opponent_muffet.turnStatus11(),
               () => text.b_opponent_muffet.turnStatus12(),
               () => text.b_opponent_muffet.turnStatus13()
            ][Math.min(state.vars.turns, 12)],
         prechoice (state) {
            state.vars.attack = true;
         },
         act: {
            flirt (state) {
               if (!badSpider() && (state.volatile.sparable || 10 <= world.flirt)) {
                  if (state.volatile.sparable && state.vars.flirtcounter < 2) {
                     SAVE.data.b.flirt_muffet = true;
                     state.talk = [
                        text.b_opponent_muffet.flirtReaction1,
                        text.b_opponent_muffet.flirtReaction2,
                        text.b_opponent_muffet.flirtReaction3
                     ][Math.min(state.vars.finalflirt++, 2)];
                  } else if (++state.vars.flirtcounter === 3) {
                     SAVE.data.b.flirt_muffet = true;
                     state.volatile.flirted = true;
                     state.volatile.sparable = true;
                     SAVE.data.n.state_foundry_muffet = 3;
                     battler.music?.stop();
                     battler.spare();
                  }
               }
            },
            counter (state) {
               if (!badSpider() && state.vars.turns === 2) {
                  state.vars.counter = true;
                  state.vars.speedstat -= 0.05;
                  state.vars.attack = false;
               }
            },
            appease (state) {
               if (!badSpider() && [ 4, 5, 6 ].includes(state.vars.turns) && state.vars.counter) {
                  state.vars.appease = true;
                  state.vars.speedstat -= 0.05;
                  state.vars.attack = false;
                  state.vars.turns = 6;
               }
            },
            pay (state) {
               if (state.vars.pay) {
                  state.talk = text.b_opponent_muffet.payTalkPost;
               } else if (!badSpider() && [ 8, 9, 10 ].includes(state.vars.turns) && state.vars.appease) {
                  state.vars.pay = true;
                  state.vars.attack = false;
                  state.vars.turns = 10;
               }
            }
         },
         spare (state) {
            state.volatile.sparable && state.vars.pay && (SAVE.data.n.state_foundry_muffet = 2);
            battler.spare();
         },
         async postchoice (state) {
            if (badSpider()) {
               if (await kiddHandler(state, 'muffet')) {
                  state.vars.kidf++;
               }
            } else if (state.volatile.alive) {
               if (state.vars.turns < 10) {
                  if (await kiddHandler(state, 'muffet')) {
                     state.vars.kidf++;
                  }
               } else if (state.vars.turns === 10) {
                  state.pacify = true;
                  battler.music?.stop();
                  if (state.vars.pay) {
                     await battler.human(...text.b_opponent_muffet.payText);
                     const mus = music.spiderrelax.instance(renderer);
                     mus.gain.value /= 16;
                     mus.gain.modulate(renderer, 1000, mus.gain.value * 16);
                     battler.music = mus;
                  } else {
                     const rotbase = renderer.time;
                     const spideySign = new CosmosSprite({
                        anchor: 1,
                        position: { x: -1, y: -4 },
                        frames: [ content.ibcMuffetSpiderTelegram ]
                     }).on('tick', function () {
                        this.rotation.value = sineWaver(rotbase, 3000, 10, -10);
                     });
                     const spidey = new CosmosAnimation({
                        anchor: { x: 0, y: 1 },
                        position: { x: 325, y: 123 },
                        resources: content.ibcMuffetSpider,
                        objects: [ spideySign ]
                     });
                     renderer.attach('menu', spidey);
                     spidey.enable();
                     await spidey.position.modulate(renderer, 1400, { x: 280 }, { x: 260 });
                     spidey.reset();
                     battler.garbage.push([ 'menu', spidey ]);
                     const bbox = battler.box.size.x;
                     renderer
                        .when(() => battler.box.size.x < bbox)
                        .then(() => {
                           spidey.enable();
                           spidey.position.modulate(renderer, 1400, { x: 280 }, { x: 325 }).then(async () => {
                              renderer.detach('menu', spidey);
                           });
                        });
                  }
               }
            }
            state.dead && (SAVE.data.n.state_foundry_muffet = 1);
         },
         async posttalk (state) {
            if (badSpider()) {
               if (state.vars.turns === 12) {
                  state.volatile.sparable = true;
                  battler.spare();
               }
            } else if (!state.vars.pay && state.vars.turns === 10) {
               state.volatile.sparable = true;
               battler.spare();
            }
         },
         async poststatus (state) {
            await battler.resume(async () => {
               renderer.detach('menu', battler.SOUL);
               await standardSize({ x: 120, y: 65 }, true);
               renderer.attach('menu', battler.SOUL);
               battler.line.reset();
               battler.line.pos.x = 160;
               battler.line.pos.y = battler.line.offset + 20;
               if (state.vars.turns > 0) {
                  battler.line.active = true;
                  battler.SOUL.position.x = battler.line.pos.x;
               } else {
                  battler.SOUL.position.set(battler.box);
               }
               battler.SOUL.alpha.value = 1;
               if (state.vars.attack && state.vars.turns < (badSpider() ? 12 : 10)) {
                  await patterns.muffet(state.vars.turns, state.vars.speedstat);
                  if (state.vars.turns === 0) {
                     await battler.monster(
                        false,
                        state.volatile.container.position.add(31, -105),
                        battler.bubbles.napstablook,
                        ...text.b_opponent_muffet.turnTalk1a
                     );
                  }
                  if (state.vars.appease && state.vars.turns < 6) {
                     state.vars.turns = 6;
                  }
                  const infoElements = [
                     // man i love formatting
                     [ 0 ],
                     [ 0 ],
                     [ 3 ],
                     [ 0, 1 ],
                     [ 0, 1 ],
                     [ 0, 1 ],
                     [ 3 ],
                     [ 0, 2 ],
                     [ 1, 2 ],
                     [ 0, 1, 2 ],
                     [ 3 ]
                  ][state.vars.turns];
                  if (infoElements) {
                     const attackInfo = new CosmosObject({
                        alpha: 0,
                        position: { y: -34 },
                        objects: infoElements.map(
                           (id, index, arr) =>
                              new CosmosSprite({
                                 anchor: 0,
                                 scale: 0.5,
                                 position: { x: (index + arr.length / -2 + 0.5) * 12.5 },
                                 frames: [
                                    [ content.ibbSpider, content.ibbCrossiant, content.ibbDonut, content.ibbCupcake ][id]
                                 ]
                              })
                        )
                     });
                     const spideySign = new CosmosAnimation({
                        anchor: { x: 0, y: 1 },
                        position: { x: -1, y: -4 },
                        resources: content.ibcMuffetSpiderSign,
                        objects: [ attackInfo ]
                     }).on('tick', function () {
                        if (!this.reverse && this.active && this.index === this.frames.length - 1) {
                           this.disable();
                           attackInfo.alpha.value = 1;
                        }
                     });
                     const spidey = new CosmosAnimation({
                        anchor: { x: 0, y: 1 },
                        position: { x: 325, y: 123 },
                        resources: content.ibcMuffetSpider,
                        objects: [ spideySign ]
                     });
                     renderer.attach('menu', spidey);
                     spidey.enable();
                     spidey.position.modulate(renderer, 500, { x: 280 }, { x: 260 }).then(async () => {
                        spidey.reset();
                        spideySign.enable();
                     });
                     events.on('choice').then(async () => {
                        if (spideySign.index > 0) {
                           attackInfo.alpha.value = 0;
                           spideySign.reverse = true;
                           spideySign.enable();
                           await renderer.when(() => spideySign.index === 0);
                           spideySign.reset();
                        }
                        spidey.enable();
                        await spidey.position.modulate(renderer, 500, { x: 280 }, { x: 325 });
                        renderer.detach('menu', spidey);
                     });
                  }
               } else {
                  await renderer.pause(450);
               }
               battler.line.active = false;
               await resetBox(true);
               state.vars.turns++;
            });
         }
      }),
      sprite: volatile =>
         new CosmosSprite({
            anchor: { x: 0, y: 1 },
            frames: [ content.ibcMuffetLegs ],
            metadata: { base: renderer.time, eyePhase: -1 },
            objects: [
               new CosmosAnimation({
                  metadata: { part: 'arm1' },
                  position: { x: -9, y: -36 },
                  scale: { x: -1 },
                  resources: content.ibcMuffetArm1
               }),
               new CosmosAnimation({
                  metadata: { part: 'arm6' },
                  position: { x: 9, y: -36 },
                  resources: content.ibcMuffetArm1
               }),
               new CosmosSprite({
                  metadata: { part: 'forearm1' },
                  position: { x: -8, y: -44 },
                  scale: { x: -1 },
                  frames: [ content.ibcMuffetArm2a ],
                  objects: [
                     new CosmosSprite({
                        metadata: { part: 'arm2' },
                        anchor: { y: 1 },
                        position: { x: 13, y: 15 },
                        frames: [ content.ibcMuffetArm2b ],
                        objects: [
                           new CosmosSprite({
                              metadata: { part: 'teapot1' },
                              anchor: { y: 0 },
                              position: { x: 9, y: -12 },
                              frames: [ content.ibcMuffetTeapot ]
                           })
                        ]
                     })
                  ]
               }),
               new CosmosSprite({
                  metadata: { part: 'forearm2' },
                  position: { x: 8, y: -44 },
                  frames: [ content.ibcMuffetArm2a ],
                  objects: [
                     new CosmosSprite({
                        metadata: { part: 'arm5' },
                        anchor: { y: 1 },
                        position: { x: 13, y: 15 },
                        frames: [ content.ibcMuffetArm2b ],
                        objects: [
                           new CosmosSprite({
                              metadata: { part: 'teapot2' },
                              anchor: { y: 0 },
                              position: { x: 9, y: -12 },
                              frames: [ content.ibcMuffetTeapot ]
                           })
                        ]
                     })
                  ]
               }),
               new CosmosSprite({
                  metadata: { part: 'shoulder1' },
                  position: { x: -2, y: -59 },
                  scale: { x: -1 },
                  frames: [ content.ibcMuffetShoulder ],
                  objects: [
                     new CosmosSprite({
                        metadata: { part: 'arm3' },
                        anchor: { y: 1 },
                        position: { x: 14, y: 16 },
                        frames: [ content.ibcMuffetArm3 ]
                     })
                  ]
               }),
               new CosmosSprite({
                  metadata: { part: 'shoulder2' },
                  position: { x: 2, y: -59 },
                  frames: [ content.ibcMuffetShoulder ],
                  objects: [
                     new CosmosSprite({
                        metadata: { part: 'arm4' },
                        anchor: { y: 1 },
                        position: { x: 14, y: 16 },
                        frames: [ content.ibcMuffetArm3 ]
                     })
                  ]
               }),
               new CosmosSprite({
                  metadata: { part: 'pants' },
                  anchor: { x: 0, y: 1 },
                  position: { y: -20 },
                  frames: [ content.ibcMuffetPants ],
                  objects: [
                     new CosmosSprite({
                        metadata: { part: 'hair1' },
                        anchor: { y: 0 },
                        position: { x: -18, y: -72 },
                        scale: { x: -1 },
                        frames: [ content.ibcMuffetHair ]
                     }),
                     new CosmosSprite({
                        metadata: { part: 'hair2' },
                        anchor: { y: 0 },
                        position: { x: 18, y: -72 },
                        frames: [ content.ibcMuffetHair ]
                     }),
                     new CosmosSprite({
                        metadata: { part: 'head' },
                        anchor: { x: 0, y: 1 },
                        position: { y: -31 },
                        frames: [ content.ibcMuffetHead ],
                        objects: [
                           new CosmosAnimation({
                              metadata: { part: 'eye1' },
                              position: { x: -11, y: -29 },
                              resources: content.ibcMuffetEye1
                           }).on('tick', function () {
                              if (this.index === this.frames.length - 1 && this.step === this.duration - 1) {
                                 this.index = 0;
                                 this.disable();
                              }
                           }),
                           new CosmosAnimation({
                              metadata: { part: 'eye2' },
                              position: { x: -8, y: -34 },
                              resources: content.ibcMuffetEye3
                           }).on('tick', function () {
                              if (this.index === this.frames.length - 1 && this.step === this.duration - 1) {
                                 this.index = 0;
                                 this.disable();
                              }
                           }),
                           new CosmosAnimation({
                              anchor: { x: 0, y: 1 },
                              metadata: { part: 'eye3' },
                              position: { y: -31 },
                              resources: content.ibcMuffetEye2
                           }).on('tick', function () {
                              if (this.index === this.frames.length - 1 && this.step === this.duration - 1) {
                                 this.index = 0;
                                 this.disable();
                              }
                           }),
                           new CosmosAnimation({
                              metadata: { part: 'eye4' },
                              position: { x: 8, y: -34 },
                              scale: { x: -1 },
                              resources: content.ibcMuffetEye3
                           }).on('tick', function () {
                              if (this.index === this.frames.length - 1 && this.step === this.duration - 1) {
                                 this.index = 0;
                                 this.disable();
                              }
                           }),
                           new CosmosAnimation({
                              metadata: { part: 'eye5' },
                              position: { x: 11, y: -29 },
                              scale: { x: -1 },
                              resources: content.ibcMuffetEye1
                           }).on('tick', function () {
                              if (this.index === this.frames.length - 1 && this.step === this.duration - 1) {
                                 this.index = 0;
                                 this.disable();
                              }
                           })
                        ]
                     }),
                     new CosmosSprite({
                        metadata: { part: 'shirt' },
                        anchor: { x: 0, y: 1 },
                        position: { y: -20 },
                        frames: [ content.ibcMuffetShirt ]
                     })
                  ]
               })
            ]
         }).on('tick', function () {
            const phase = ((renderer.time - this.metadata.base) % 1000) / 1000;
            const eyePhase = (renderer.time - this.metadata.base) % 3000;
            const siner = CosmosMath.wave(phase);
            const bias = (volatile.vars.biasNumber as CosmosValue)?.value ?? 0;
            CosmosUtils.chain(this.objects, (objects, next) => {
               for (const sprite of objects as CosmosSprite[]) {
                  next(sprite.objects);
                  switch (sprite.metadata.part) {
                     case 'arm1':
                        sprite.index = phase < 0.5 ? 1 : 0;
                        sprite.rotation.value = CosmosMath.remap(siner, 0, 15);
                        break;
                     case 'arm2':
                        sprite.rotation.value = CosmosMath.remap(
                           CosmosMath.wave(phase + 0.2),
                           CosmosMath.remap(bias, 2, -5),
                           CosmosMath.remap(bias, -2, -5)
                        );
                        break;
                     case 'arm3':
                        sprite.rotation.value = CosmosMath.remap(1 - CosmosMath.wave(phase - 0.1), -5, 5);
                        break;
                     case 'arm4':
                        sprite.rotation.value = CosmosMath.remap(1 - CosmosMath.wave(phase - 0.1), -5, 5);
                        break;
                     case 'arm5':
                        sprite.rotation.value = CosmosMath.remap(
                           CosmosMath.wave(phase + 0.2),
                           CosmosMath.remap(bias, 2, -5),
                           CosmosMath.remap(bias, -2, -5)
                        );
                        break;
                     case 'arm6':
                        sprite.index = phase < 0.5 ? 1 : 0;
                        sprite.rotation.value = CosmosMath.remap(siner, 0, -15);
                        break;
                     case 'teapot1':
                        sprite.rotation.value = CosmosMath.remap(
                           siner,
                           CosmosMath.remap(bias, 15, 25),
                           CosmosMath.remap(bias, -15, 25)
                        );
                        break;
                     case 'teapot2':
                        sprite.rotation.value = CosmosMath.remap(
                           siner,
                           CosmosMath.remap(bias, 15, 25),
                           CosmosMath.remap(bias, -15, 25)
                        );
                        break;
                     case 'eye1': {
                        if (this.metadata.eyePhase <= 500 && eyePhase > 500) {
                           sprite.enable();
                        }
                        if (this.metadata.eyePhase <= 1500 && eyePhase > 1500) {
                           sprite.enable();
                        }
                        break;
                     }
                     case 'eye2': {
                        if (this.metadata.eyePhase <= 500 && eyePhase > 500) {
                           sprite.enable();
                        }
                        if (this.metadata.eyePhase <= 1700 && eyePhase > 1700) {
                           sprite.enable();
                        }
                        break;
                     }
                     case 'eye3': {
                        if (this.metadata.eyePhase <= 500 && eyePhase > 500) {
                           sprite.enable();
                        }
                        if (this.metadata.eyePhase <= 1900 && eyePhase > 1900) {
                           sprite.enable();
                        }
                        break;
                     }
                     case 'eye4': {
                        if (this.metadata.eyePhase <= 500 && eyePhase > 500) {
                           sprite.enable();
                        }
                        if (this.metadata.eyePhase <= 2100 && eyePhase > 2100) {
                           sprite.enable();
                        }
                        break;
                     }
                     case 'eye5': {
                        if (this.metadata.eyePhase <= 500 && eyePhase > 500) {
                           sprite.enable();
                        }
                        if (this.metadata.eyePhase <= 2300 && eyePhase > 2300) {
                           sprite.enable();
                        }
                        break;
                     }
                     case 'head':
                        sprite.position.y = ((sprite.metadata.baseY ??= sprite.position.y) as number) + -siner * 2;
                        break;
                     case 'hair1':
                        sprite.position.y = ((sprite.metadata.baseY ??= sprite.position.y) as number) + -siner * 2;
                        sprite.rotation.value = CosmosMath.remap(1 - siner, -10, 20);
                        break;
                     case 'hair2':
                        sprite.position.y = ((sprite.metadata.baseY ??= sprite.position.y) as number) + -siner * 2;
                        sprite.rotation.value = CosmosMath.remap(1 - siner, 10, -20);
                        break;
                     case 'pants':
                        sprite.position.y = ((sprite.metadata.baseY ??= sprite.position.y) as number) + -siner;
                        break;
                     case 'shirt':
                        sprite.position.y = ((sprite.metadata.baseY ??= sprite.position.y) as number) + -siner;
                        break;
                     case 'shoulder1':
                        sprite.position.y =
                           ((sprite.metadata.baseY ??= sprite.position.y) as number) +
                           -CosmosMath.wave(phase + 0.1) * 1.5;
                        break;
                     case 'shoulder2':
                        sprite.position.y =
                           ((sprite.metadata.baseY ??= sprite.position.y) as number) +
                           -CosmosMath.wave(phase + 0.1) * 1.5;
                        break;
                     case 'forearm1':
                        sprite.position.y =
                           ((sprite.metadata.baseY ??= sprite.position.y) as number) +
                           -CosmosMath.remap(bias, CosmosMath.wave(phase + 0.2), 1) * 2;
                        break;
                     case 'forearm2':
                        sprite.position.y =
                           ((sprite.metadata.baseY ??= sprite.position.y) as number) +
                           -CosmosMath.remap(bias, CosmosMath.wave(phase + 0.2), 1) * 2;
                        break;
                  }
               }
            });
            this.metadata.eyePhase = eyePhase;
         }),
      goodbye: () => new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcMuffetHurt ] })
   }),
   shyren: new OutertaleOpponent({
      flirted: () => SAVE.data.b.flirt_shyren,
      assets: new CosmosInventory(
         content.ibcShyrenBattleAgent,
         content.ibcShyrenBattleBack,
         content.ibcShyrenBattleFront,
         content.ibcShyrenBattleWave,
         content.ibcShyrenBattleHurt,
         content.asSingBad1,
         content.asSingBad2,
         content.asSingBad3,
         content.asSingBass1,
         content.asSingBass2,
         content.asSingTreble1,
         content.asSingTreble2,
         content.asSingTreble3,
         content.asSingTreble4,
         content.asSingTreble5,
         content.asSingTreble6,
         content.ibbNote
      ),
      bullied: () => SAVE.data.b.bullied_shyren,
      bullyable: true,
      bully: () => {
         SAVE.data.b.bullied_shyren = true;
         SAVE.data.n.bully++;
      },
      exp: 52,
      hp: 66,
      df: 2,
      name: () => text.b_opponent_shyren.name,
      acts: () => [
         [
            'check',
            v =>
               battler.hurt.includes(v)
                  ? text.b_opponent_shyren.act_check5
                  : v.flirted
                  ? text.b_opponent_shyren.act_check7
                  : (v.vars.encourage ?? 0) > 0
                  ? [
                       text.b_opponent_shyren.act_check2,
                       text.b_opponent_shyren.act_check3,
                       text.b_opponent_shyren.act_check4
                    ][Math.min(v.vars.encourage - 1, 2)]
                  : v.vars.creep
                  ? text.b_opponent_shyren.act_check6
                  : text.b_opponent_shyren.act_check
         ],
         [ 'hum', [] ],
         [ 'flirt', [] ],
         [ 'dance', [] ],
         [
            'boo',
            v =>
               v.vars.creep
                  ? text.b_opponent_shyren.act_boo2
                  : (v.vars.encourage ?? 0) > 0
                  ? [ text.b_opponent_shyren.act_boo3, text.b_opponent_shyren.act_boo4, text.b_opponent_shyren.act_boo5 ][
                       Math.min(v.vars.encourage - 1, 2)
                    ]
                  : text.b_opponent_shyren.act_boo1
         ]
      ],
      sparable: false,
      g: 44,
      handler: ((
         talk: (target: number, ...lines: string[]) => Promise<void>,
         vars: CosmosKeyed,
         defaultStatus: () => () => string[]
      ) => {
         return async (choice, target, volatile) => {
            let idle = true;
            let status = true;
            let encourage = false;
            let awkward = false;
            let flirt = false;
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
                     volatile.vars.what = true;
                     battler.music?.stop();
                     SAVE.data.b.killed_shyren = true;
                     if (SAVE.data.n.state_foundry_muffet !== 1) {
                        if ((volatile.vars.encourage || 0) < 2) {
                           await kiddReaction('shyren');
                        } else {
                           events.on('battle-exit').then(async () => {
                              events.fire('tick');
                              const move = battler.encounter_state.movement;
                              battler.encounter_state.movement = false;
                              SAVE.data.n.state_foundry_kidddeath++;
                              await dialogue('dialoguerBottom', ...commonText.b_party_kidd.mkShyrenDeath!);
                              move && (game.movement = true);
                           });
                        }
                     }
                     return;
                  }
                  break;
               case 'act':
                  switch (choice.act) {
                     case 'hum':
                        idle = false;
                        if (volatile.vars.creep) {
                           volatile.vars.facestate = 'front';
                           volatile.vars.creep = false;
                           await battler.human(...text.b_opponent_shyren.hum4);
                           volatile.vars.encourage = 0;
                           awkward = true;
                        } else if (volatile.vars.encourage === 0) {
                           await battler.human(
                              ...(world.meanie
                                 ? text.b_opponent_shyren.hum0
                                 : [
                                      text.b_opponent_shyren.hum1,
                                      text.b_opponent_shyren.hum2,
                                      text.b_opponent_shyren.hum3
                                   ][rng.dialogue.int(3)])
                           );
                        } else {
                           await battler.human(
                              ...[
                                 text.b_opponent_shyren.humX1,
                                 text.b_opponent_shyren.humX2,
                                 text.b_opponent_shyren.humX3,
                                 text.b_opponent_shyren.humX4
                              ][volatile.vars.encourage - 1]()
                           );
                        }
                        encourage = true;
                        break;
                     case 'flirt':
                        if (volatile.vars.creep) {
                           await battler.human(...text.b_opponent_shyren.creepText2);
                           oops();
                           volatile.sparable = true;
                           battler.spare(target);
                           battler.music?.stop();
                           return;
                        } else if (volatile.vars.encourage < 2) {
                           volatile.vars.encourage = 0;
                           volatile.vars.creep = true;
                           volatile.vars.facestate = void 0;
                           await battler.human(...text.b_opponent_shyren.creepText1);
                           status = false;
                           statustext = () => () => text.b_opponent_shyren.creepStatus();
                        } else {
                           idle = false;
                           SAVE.data.b.flirt_shyren = true;
                           volatile.flirted = true;
                           await battler.human(...text.b_opponent_shyren.flirtText1);
                           flirt = true;
                        }
                        break;
                     case 'dance':
                        if (volatile.vars.encourage > 1) {
                           await battler.human(...text.b_opponent_shyren.wave2());
                        } else {
                           await battler.human(...text.b_opponent_shyren.wave1);
                        }
                        break;
                     case 'boo':
                        oops();
                        volatile.sparable = true;
                        battler.spare(target);
                        battler.music?.stop();
                        return;
                  }
                  break;
               case 'spare': {
                  if (!battler.bullied.includes(volatile) && !volatile.sparable) {
                     break;
                  }
                  battler.spare();
                  if (battler.bullied.includes(volatile)) {
                     await kiddReactionBully('shyren');
                  }
               }
               case 'flee':
                  battler.music?.stop();
                  return;
            }
            if (world.kiddo && SAVE.data.n.state_foundry_muffet === 1 && !SAVE.data.b.f_state_kidd_trauma) {
               SAVE.data.b.f_state_kidd_trauma = true;
               await battler.human(...commonText.b_party_kidd.mkNope);
            }
            const bul = battler.bullied.includes(volatile);
            const turn =
               SAVE.data.n.state_foundry_muffet === 1 || !volatile.alive
                  ? void 0
                  : await kiddTurn('shyren', volatile.vars.encourage < 1);
            if (turn === 'fight') {
               if (await kiddFight(volatile)) {
                  volatile.vars.what = true;
                  battler.music?.stop();
                  SAVE.data.b.killed_shyren = true;
                  await kiddReaction('shyren');
                  return;
               }
            } else if (turn === 'skip') {
               volatile.vars.kidskip = true;
            } else if (turn === 'pacify' && bul && !volatile.sparable) {
               await kiddReactionBully('shyren');
            }
            if (battler.alive.length !== 0) {
               if (idle && (volatile.vars.encourage || 0) < 1) {
                  await talk(
                     target,
                     ...[ text.b_opponent_shyren.sadtalk1, text.b_opponent_shyren.sadtalk2 ][rng.dialogue.int(2)]
                  );
               } else if (awkward) {
                  await talk(target, ...text.b_opponent_shyren.awkwardtoot);
               } else if (encourage || (!flirt && (volatile.vars.encourage || 0) > 0)) {
                  await talk(
                     target,
                     ...[
                        text.b_opponent_shyren.talk3,
                        text.b_opponent_shyren.talk4,
                        text.b_opponent_shyren.talk5,
                        text.b_opponent_shyren.talk6,
                        text.b_opponent_shyren.talk7
                     ][(volatile.vars.encourage as number) - (encourage ? 0 : 1)]
                  );
               } else if (flirt) {
                  await talk(target, ...text.b_opponent_shyren.flirttoot);
               }
               if (status && battler.hurt.includes(volatile)) {
                  status = false;
                  statustext = () => () => text.b_opponent_shyren.hurtStatus;
               } else if (encourage) {
                  status = false;
                  statustext = [
                     () => () => text.b_opponent_shyren.encourage1(),
                     () => () => text.b_opponent_shyren.encourage2(),
                     () => () => text.b_opponent_shyren.encourage3(),
                     () => () => text.b_opponent_shyren.encourage4(),
                     () => () => []
                  ][volatile.vars.encourage];
               }
               let axend = false;
               if (encourage) {
                  if (++volatile.vars.encourage > 4) {
                     axend = true;
                     volatile.sparable = true;
                     SAVE.data.b.spared_shyren = true;
                  }
               }
               battler.status = statustext();
               game.movement = true;
               battler.music!.gain.modulate(renderer, 600, battler.music!.gain.value / 10);
               await battler.box.size.modulate(renderer, 300, { x: 150, y: 95 / 2 });
               battler.SOUL.position.set(160);
               battler.SOUL.alpha.value = 1;
               if (turn === 'skip') {
                  await renderer.pause(450);
               } else {
                  if (!volatile.vars.creep && volatile.vars.encourage > 0) {
                     volatile.vars.singturn = true;
                  }
                  await commonPatterns.shyren();
               }
               volatile.vars.singturn = false;
               battler.music!.gain.modulate(renderer, 600, battler.music!.gain.value * 10);
               await battler.box.size.modulate(renderer, 300, { x: 282.5, y: 65 });
               game.movement = false;
               battler.SOUL.alpha.value = 0;
               if (axend) {
                  battler.spare();
                  battler.music?.stop();
               } else {
                  await battler.resume();
               }
            } else {
               battler.music?.stop();
            }
         };
      })(
         async (target, ...lines) =>
            battler.monster(
               false,
               battler.volatile[target].container.position.subtract(
                  new CosmosPoint({ x: 140, y: 120 }).subtract({ x: 180, y: 35 })
               ),
               battler.bubbles.dummy,
               ...lines
            ),
         { encourage: 0, creep: false },
         () => {
            const enc = battler.volatile[0].vars.encourage || 0;
            if (enc > 0) {
               return [
                  () => text.b_opponent_shyren.encourage1(),
                  () => text.b_opponent_shyren.encourage2(),
                  () => text.b_opponent_shyren.encourage3(),
                  () => text.b_opponent_shyren.encourage4()
               ][enc - 1];
            } else {
               return [
                  () => text.b_opponent_shyren.randStatus1(),
                  () => text.b_opponent_shyren.randStatus2(),
                  () => text.b_opponent_shyren.randStatus3(),
                  () => text.b_opponent_shyren.randStatus4(),
                  () => text.b_opponent_shyren.randStatus5()
               ][rng.dialogue.int(5)];
            }
         }
      ),
      sprite: vol =>
         new CosmosAnimation({
            anchor: { y: 1, x: 0 },
            resources: content.ibcShyrenBattleAgent,
            objects: [
               new CosmosAnimation({
                  anchor: { y: 1 },
                  position: { x: -19.5, y: -45 },
                  resources: content.ibcShyrenBattleBack,
                  metadata: { index: 0 }
               }).on('tick', function () {
                  if ((vol.vars.encourage || 0) < 1 || vol.vars.creep) {
                     if (this.metadata.index !== 0) {
                        this.metadata.index = 0;
                        this.reset().use(content.ibcShyrenBattleBack);
                     }
                  } else if (vol.vars.singturn) {
                     if (this.metadata.index !== 1) {
                        this.metadata.index = 1;
                        this.enable().use(content.ibcShyrenBattleWave);
                     }
                  } else {
                     if (this.metadata.index !== 2) {
                        this.metadata.index = 2;
                        this.enable().use(content.ibcShyrenBattleFront);
                     }
                  }
               })
            ]
         }).on(
            'tick',
            (() => {
               const time = renderer.time;
               const shyPositionY = new CosmosValue();
               const listener = function (this: CosmosAnimation) {
                  if (battler.alive.length === 0) {
                     this.off('tick', listener);
                  } else {
                     this.position.y = shyPositionY.value - CosmosMath.wave(((renderer.time - time) % 4000) / 4000) * 4;
                  }
               };
               return listener;
            })()
         ),
      goodbye: () =>
         new CosmosSprite({
            anchor: { y: 1 },
            position: { x: -19.5, y: -45 },
            frames: [ content.ibcShyrenBattleHurt ],
            objects: [
               new CosmosAnimation({
                  anchor: { y: 1, x: 0 },
                  position: { x: 19.5, y: 45 },
                  resources: content.ibcShyrenBattleAgent
               }).on('tick', function () {
                  if (battler.volatile[0].vars.what) {
                     this.index = 1;
                  }
               })
            ]
         })
   }),
   moldfake: new OutertaleOpponent({
      flirted: () => SAVE.data.b.flirt_moldbygg,
      assets: new CosmosInventory(
         content.ibcMoldsmal,
         content.ibbOctagon,
         content.ibcMoldbyggHead,
         content.ibcMoldbyggPart,
         content.ibcMoldbyggDefeated,
         content.ibbGelatslab,
         content.asStab,
         content.asRustle
      ),
      exp: 46,
      hp: 70,
      df: 4,
      g: 28,
      name: () => text.b_opponent_moldfake.name,
      metadata: { automusic: true },
      acts: () => [
         [ 'check', text.b_opponent_moldfake.act_check ],
         [ 'pat', text.b_opponent_moldfake.act_imitate ],
         [ 'slap', text.b_opponent_moldfake.act_slap ],
         [ 'flirt', text.b_opponent_moldfake.act_flirt ]
      ],
      sparable: false,
      async handler (choice, target, volatile) {
         async function doIdle () {
            await battler.monster(
               false,
               volatile.container.position.add(28, -54),
               battler.bubbles.dummy,
               ...text.b_opponent_moldfake.smalTalk
            );
         }
         if (choice.type === 'none') {
            await doIdle();
            return;
         }
         let bygg = false;
         const statustext = [
            () => text.b_opponent_moldfake.fakeStatus1(),
            () => text.b_opponent_moldfake.fakeStatus2(),
            () => text.b_opponent_moldfake.fakeStatus3(),
            () => text.b_opponent_moldfake.fakeStatus4()
         ];
         const sparing = battler.sparing(choice);
         let idler = null as Promise<void> | null;
         switch (choice.type) {
            case 'item':
               if (choice.item === 'epiphany') {
                  await epiphany(
                     target,
                     volatile,
                     160,
                     {
                        befriend: () => (SAVE.data.b.spared_moldbygg = true),
                        flirt: () => (SAVE.data.b.flirt_moldbygg = true)
                     },
                     battler.bubbles.dummy,
                     () => volatile.container.position.add(28, -54),
                     text.b_opponent_moldfake.smalTalk
                  );
                  return;
               }
               break;
            case 'fight':
               if (await battler.attack(volatile, { power: choice.score })) {
                  world.kill();
                  await kiddReaction('moldsmal');
                  await battler.idle(volatile);
                  return;
               } else {
                  bygg = true;
               }
               break;
            case 'act':
               switch (choice.act) {
                  case 'flirt':
                     bygg = true;
                     break;
                  case 'pat':
                     bygg = true;
                     break;
                  case 'slap':
                     bygg = true;
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
         if (world.kiddo && SAVE.data.n.state_foundry_muffet === 1 && !SAVE.data.b.f_state_kidd_trauma) {
            SAVE.data.b.f_state_kidd_trauma = true;
            await battler.human(...commonText.b_party_kidd.mkNope);
         }
         let nk = false;
         const bul = battler.bullied.includes(volatile);
         const turn =
            bygg || !world.kiddo || SAVE.data.n.state_foundry_muffet === 1 ? void 0 : await kiddTurn('moldsmal');
         if (turn === 'fight') {
            if (await kiddFight(volatile)) {
               world.kill();
               battler.music?.stop();
               await kiddReaction('moldsmal');
               return;
            } else {
               bygg = true;
               nk = true;
            }
         } else if (turn === 'skip') {
            volatile.vars.kidskip = true;
         } else if (turn === 'pacify' && bul && !volatile.sparable) {
            await kiddReactionBully('moldsmal');
         }
         sparing || (idler = battler.idle(volatile));
         if (bygg) {
            volatile.alive = false;
            volatile.container.alpha.value = 0;
            const v2 = battler.volatile[battler.add(opponents.moldbygg, { x: volatile.container.position.x, y: 180 })];
            battler.volatile[target] = v2;
            battler.volatile[battler.volatile.length - 1] = volatile;
            v2.flirted = volatile.flirted;
            v2.hp = volatile.hp;
            await Promise.all([
               v2.container.position.modulate(renderer, 1000, { y: 150 }, { y: 130 }, { y: 120 }),
               battler.monster(
                  false,
                  new CosmosPoint({ x: volatile.container.position.x, y: 120 }).add(28, -64),
                  battler.bubbles.dummy,
                  ...text.b_opponent_moldbygg.idleTalk1
               )
            ]);
            const bul = battler.bullied.includes(v2);
            const turn =
               nk || !world.kiddo || SAVE.data.n.state_foundry_muffet === 1 ? void 0 : await kiddTurn('moldbygg');
            if (turn === 'fight') {
               if (await kiddFight(v2)) {
                  world.kill();
                  await kiddReaction('moldbygg');
                  return;
               }
            } else if (turn === 'skip') {
               v2.vars.kidskip = true;
            } else if (turn === 'pacify' && bul && !v2.sparable) {
               await kiddReactionBully('moldbygg');
            }
            battler.status = () => text.b_opponent_moldbygg.status1();
         } else if (volatile.alive) {
            sparing || (await doIdle());
            battler.status = selectElement(statustext);
         }
         await idler;
      },
      sprite: () => new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcMoldsmal ] })
   }),
   moldbygg: new OutertaleOpponent({
      flirted: () => SAVE.data.b.flirt_moldbygg,
      assets: new CosmosInventory(
         content.ibbOctagon,
         content.ibcMoldbyggHead,
         content.ibcMoldbyggPart,
         content.ibcMoldbyggDefeated,
         content.ibbGelatslab,
         content.asStab,
         content.asRustle
      ),
      bullied: () => SAVE.data.b.bullied_moldbygg,
      bullyable: true,
      bully: () => {
         SAVE.data.b.bullied_moldbygg = true;
         world.bully();
      },
      exp: 46,
      hp: 70,
      df: 4,
      g: 28,
      name: () => text.b_opponent_moldbygg.name,
      metadata: { automusic: true },
      acts: () => [
         [
            'check',
            v =>
               world.goatbro
                  ? text.b_opponent_moldbygg.act_check()
                  : battler.hurt.includes(v)
                  ? text.b_opponent_moldbygg.act_check2
                  : v.sparable
                  ? text.b_opponent_moldbygg.act_check3
                  : v.flirted
                  ? text.b_opponent_moldbygg.act_check4
                  : text.b_opponent_moldbygg.act_check()
         ],
         [ 'handshake', text.b_opponent_moldbygg.act_handshake ],
         [ 'sit', text.b_opponent_moldbygg.act_sit ],
         [ 'flirt', text.b_opponent_moldbygg.act_flirt ],
         [
            'topple',
            v =>
               battler.hurt.includes(v) ? text.b_opponent_moldbygg.act_topple2 : text.b_opponent_moldbygg.act_topple1
         ]
      ],
      sparable: false,
      handler: battler.opponentHandler({
         kill: () => world.kill(),
         vars: { new: true, slimy: false },
         bubble: position => [ new CosmosPoint({ x: position.x, y: 120 }).add(28, -64), battler.bubbles.dummy ],
         item: {
            async epiphany (state) {
               state.talk = [];
               await epiphany(
                  state.target,
                  state.volatile,
                  160,
                  {
                     befriend: () => (SAVE.data.b.spared_moldbygg = true),
                     flirt: () => (SAVE.data.b.flirt_moldbygg = true)
                  },
                  battler.bubbles.dummy,
                  () => state.volatile.container.position.add(28, -54),
                  text.b_opponent_moldbygg.epiphany
               );
            }
         },
         act: {
            handshake (state) {
               state.vars.slimy = true;
               for (const subvolatile of battler.alive) {
                  if (subvolatile.opponent === opponents.woshua && subvolatile.vars.clean === true) {
                     subvolatile.vars.clean = false;
                  }
               }
            },
            sit (state) {
               state.pacify = true;
               SAVE.data.b.spared_moldbygg = true;
            },
            flirt (state) {
               SAVE.data.b.flirt_moldbygg = true;
               state.volatile.flirted = true;
               state.talk = text.b_opponent_moldbygg.sexyChat;
            },
            topple ({ volatile, target }) {
               if (battler.hurt.includes(volatile)) {
                  oops();
                  volatile.sparable = true;
                  battler.spare(target);
               }
            }
         },
         async postfight (state) {
            if (state.dead) {
               await kiddReaction('moldbygg');
            }
         },
         async postchoice (state) {
            if (!state.dead) {
               if (state.choice.type === 'spare' && !state.volatile.alive && !state.volatile.sparable) {
                  await kiddReactionBully('moldbygg');
               } else {
                  await kiddHandler(state, 'moldbygg');
               }
            }
         },
         pretalk (state) {
            if (state.vars.new) {
               state.talk = [];
               state.vars.new = false;
            }
         },
         prestatus (state) {
            battler.hurt.includes(state.volatile) && (state.status = () => () => text.b_opponent_moldbygg.hurtStatus());
         },
         defaultTalk: () => [
            text.b_opponent_moldbygg.idleTalk1,
            text.b_opponent_moldbygg.idleTalk2,
            text.b_opponent_moldbygg.idleTalk3,
            text.b_opponent_moldbygg.idleTalk4
         ],
         defaultStatus: () => [
            () => text.b_opponent_moldbygg.randStatus1(),
            () => text.b_opponent_moldbygg.randStatus2(),
            () => text.b_opponent_moldbygg.randStatus3(),
            () => text.b_opponent_moldbygg.randStatus4()
         ]
      }),
      sprite () {
         const time = renderer.time;
         const phase = Math.random();
         return new CosmosAnimation({
            active: true,
            anchor: { x: 0, y: 1 },
            resources: content.ibcMoldbyggHead,
            objects: CosmosUtils.populate(4, index => {
               const phase = Math.random();
               return new CosmosSprite({
                  anchor: { x: 0, y: 1 },
                  frames: [ content.ibcMoldbyggPart ],
                  position: { y: index * -14 }
               }).on('tick', function () {
                  this.position.x = sineWaver(time, 2500, -4, 4, phase);
               });
            })
         }).on('tick', function () {
            this.position.x = sineWaver(time, 2500, -3, 3, phase);
         });
      },
      goodbye: () => new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcMoldbyggDefeated ] })
   }),
   woshua: new OutertaleOpponent({
      flirted: () => SAVE.data.b.flirt_woshua,
      assets: new CosmosInventory(
         content.ibcWoshuaBody,
         content.ibcWoshuaDuck,
         content.ibcWoshuaFace,
         content.ibcWoshuaHanger,
         content.ibcWoshuaHead,
         content.ibcWoshuaHurt,
         content.ibcWoshuaTail,
         content.ibcWoshuaWater,
         content.ibuBubbleTiny,
         content.ibbGlitter,
         content.ibbSoap,
         content.ibbWater,
         content.ibbSkrubber,
         content.ibbFadeline,
         content.asSwipe,
         content.ibbWaterwall
      ),
      bullied: () => SAVE.data.b.bullied_woshua,
      bullyable: true,
      bully: () => {
         SAVE.data.b.bullied_woshua = true;
         world.bully();
      },
      exp: 52,
      hp: 70,
      df: 1,
      g: 33,
      name: () => text.b_opponent_woshua.name,
      metadata: { automusic: true },
      acts: () => [
         [
            'check',
            v =>
               world.goatbro
                  ? text.b_opponent_woshua.act_check()
                  : battler.hurt.includes(v)
                  ? text.b_opponent_woshua.act_check2
                  : v.flirted
                  ? text.b_opponent_woshua.act_check4
                  : v.sparable
                  ? text.b_opponent_woshua.act_check3
                  : text.b_opponent_woshua.act_check()
         ],
         [
            'clean',
            volatile => (volatile.vars.cleantry ? text.b_opponent_woshua.cleanText2 : text.b_opponent_woshua.cleanText1)
         ],
         [
            'joke',
            () =>
               [ text.b_opponent_woshua.jokeText1, text.b_opponent_woshua.jokeText2, text.b_opponent_woshua.jokeText3 ][
                  rng.dialogue.int(3)
               ]
         ],
         [
            'flirt',
            volatile =>
               battler.alive.find(vola => vola.vars.slimy) !== void 0
                  ? text.b_opponent_woshua.touchText0
                  : volatile.vars.clean
                  ? text.b_opponent_woshua.touchText2
                  : text.b_opponent_woshua.touchText1
         ]
      ],
      handler: battler.opponentHandler({
         kill: () => world.kill(),
         bubble: position => [ position.subtract(-25, 60), battler.bubbles.dummy ],
         vars: {
            clean: false,
            cleantry: false,
            dub: 0,
            tweetSprite: new CosmosSprite({
               frames: [ content.ibuBubbleTiny ],
               scale: 0.5,
               objects: [
                  new CosmosText({
                     fill: 0,
                     position: { x: 13, y: 5 },
                     stroke: -1,
                     scale: 2,
                     spacing: { x: -2 },
                     fontFamily: content.fDotumChe,
                     fontSize: 9,
                     content: text.b_opponent_woshua.tweet
                  })
               ]
            })
         },
         item: {
            async epiphany (state) {
               state.talk = [];
               await epiphany(
                  state.target,
                  state.volatile,
                  160,
                  {
                     befriend: () => (SAVE.data.b.spared_woshua = true),
                     flirt: () => (SAVE.data.b.flirt_woshua = true)
                  },
                  battler.bubbles.dummy,
                  () => state.volatile.container.position.subtract(-25, 60),
                  text.b_opponent_woshua.epiphany
               );
            }
         },
         act: {
            async flirt (state) {
               if (battler.alive.find(vola => vola.vars.slimy) !== void 0) {
                  state.volatile.sparable = true;
                  battler.spare(state.target);
               } else if (state.vars.clean) {
                  SAVE.data.b.flirt_woshua = true;
                  state.volatile.flirted = true;
                  state.talk = text.b_opponent_woshua.flirtTalk2;
               } else {
                  state.talk = text.b_opponent_woshua.flirtTalk1;
               }
            },
            async clean (state) {
               state.vars.cleantry = true;
               state.talk = text.b_opponent_woshua.cleanTalk;
            },
            async joke (state) {
               state.talk = [ text.b_opponent_woshua.jokeTalk1, text.b_opponent_woshua.jokeTalk2 ][rng.dialogue.int(2)];
            }
         },
         async postfight (state) {
            if (state.dead) {
               await kiddReaction('woshua');
            }
         },
         async postchoice (state) {
            if (!state.dead) {
               if (state.choice.type === 'spare' && !state.volatile.alive && !state.volatile.sparable) {
                  await kiddReactionBully('woshua');
               } else {
                  await kiddHandler(state, 'woshua');
               }
            }
         },
         pretalk ({ volatile }) {
            volatile.vars.tweetSprite.position.set(volatile.container.position.subtract(30, 79).add(29 / 2, 0));
            renderer.attach('menu', volatile.vars.tweetSprite);
         },
         defaultTalk ({ volatile }) {
            switch (rng.dialogue.int(3) as 0 | 1 | 2) {
               case 0:
                  return [
                     text.b_opponent_woshua.idleTalk1a,
                     text.b_opponent_woshua.idleTalk1b,
                     text.b_opponent_woshua.idleTalk1c,
                     text.b_opponent_woshua.idleTalk1d,
                     text.b_opponent_woshua.idleTalk1e
                  ];
               case 1:
                  return [
                     text.b_opponent_woshua.idleTalk2a,
                     text.b_opponent_woshua.idleTalk2b,
                     text.b_opponent_woshua.idleTalk2c
                  ][Math.min(volatile.vars.dub++, 2)];
               case 2:
                  return text.b_opponent_woshua.idleTalk3();
            }
         },
         posttalk ({ volatile }) {
            renderer.detach('menu', volatile.vars.tweetSprite);
         },
         prestatus (state) {
            battler.hurt.includes(state.volatile) && (state.status = () => () => text.b_opponent_woshua.hurtStatus());
         },
         defaultStatus: () =>
            world.goatbro
               ? () => text.b_opponent_woshua.status1()
               : [
                    () => text.b_opponent_woshua.randStatus1(),
                    () => text.b_opponent_woshua.randStatus2(),
                    () => text.b_opponent_woshua.randStatus3(),
                    () => text.b_opponent_woshua.randStatus4(),
                    () => text.b_opponent_woshua.randStatus5()
                 ][rng.dialogue.int(5)]
      }),
      sprite () {
         const time = renderer.time;
         return new CosmosSprite({
            anchor: { x: 0, y: 1 },
            frames: [ content.ibcWoshuaHanger ],
            objects: [
               new CosmosSprite({ anchor: { x: 0, y: 1 }, position: { x: -1 }, frames: [ content.ibcWoshuaDuck ] }).on(
                  'tick',
                  function () {
                     this.position.y = sawWaver(time, 4000, -2, 2);
                  }
               ),
               new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcWoshuaWater ] }).on('tick', function () {
                  this.position.x = sineWaver(time, 2500, -2, 2);
                  this.position.y = sineWaver(time, 2500 / 2, -1, 1);
               }),
               new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcWoshuaWater ] }).on('tick', function () {
                  this.position.x = sineWaver(time, 2500, 2, -2);
                  this.position.y = sineWaver(time, 2500 / 2, 1, -1);
               }),
               new CosmosAnimation({ active: true, anchor: { x: 0, y: 1 }, resources: content.ibcWoshuaTail }),
               new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcWoshuaBody ] }),
               new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcWoshuaHead ] }).on('tick', function () {
                  this.position.y = sawWaver(time, 2250, 1.5, -1.5);
               }),
               new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcWoshuaFace ] }).on('tick', function () {
                  this.position.y = -1 + sawWaver(time, 2250, -1.5, 1.5);
               })
            ]
         });
      },
      goodbye: () => new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcWoshuaHurt ] })
   }),
   radtile: new OutertaleOpponent({
      flirted: () => SAVE.data.b.flirt_radtile,
      assets: new CosmosInventory(
         content.ibcRadtile,
         content.ibcRadtileHurt,
         content.ibcRadtileTail,
         content.ibbHat,
         content.ibbMirror,
         content.ibbHinge,
         content.asBomb,
         content.asAppear,
         content.ibbMirrorLarge
      ),
      bullied: () => SAVE.data.b.bullied_radtile,
      bullyable: true,
      bully: () => {
         SAVE.data.b.bullied_radtile = true;
         world.bully();
      },
      exp: 52,
      hp: 98,
      df: 2,
      g: 52,
      name: () => text.b_opponent_radtile.name,
      acts: () => [
         [
            'check',
            v =>
               world.goatbro
                  ? text.b_opponent_radtile.act_check()
                  : battler.hurt.includes(v)
                  ? text.b_opponent_radtile.act_check2
                  : v.sparable
                  ? text.b_opponent_radtile.act_check3
                  : v.flirted
                  ? text.b_opponent_radtile.act_check4
                  : text.b_opponent_radtile.act_check()
         ],
         [
            'praise',
            vola =>
               battler.bullied.includes(vola)
                  ? text.b_opponent_radtile.act_praise_bullied
                  : text.b_opponent_radtile.act_praise
         ],
         [
            'insult',
            vola =>
               battler.bullied.includes(vola)
                  ? text.b_opponent_radtile.act_insult_bullied
                  : text.b_opponent_radtile.act_insult
         ],
         [
            'flirt',
            vola =>
               battler.bullied.includes(vola)
                  ? text.b_opponent_radtile.act_flirt_bullied
                  : text.b_opponent_radtile.act_flirt
         ]
      ],
      sparable: false,
      handler: battler.opponentHandler({
         kill: () => world.kill(),
         vars: { mood: 0, heckled: false },
         item: {
            async epiphany (state) {
               state.talk = [];
               await epiphany(
                  state.target,
                  state.volatile,
                  160,
                  {
                     befriend: () => (SAVE.data.b.spared_radtile = true),
                     flirt: () => (SAVE.data.b.flirt_radtile = true)
                  },
                  battler.bubbles.dummy,
                  () => state.volatile.container.position.add(21, -76),
                  text.b_opponent_radtile.epiphany
               );
            }
         },
         act: {
            praise (state) {
               if (state.vars.mood < 0) {
                  state.talk = text.b_opponent_radtile.complimentPostInsultTalk1;
                  state.status = () => () =>
                     world.goatbro
                        ? text.b_opponent_radtile.status1()
                        : text.b_opponent_radtile.complimentPostInsultStatus();
                  state.vars.mood = 0;
               } else if (state.vars.mood < 1) {
                  state.talk = [
                     text.b_opponent_radtile.complimentTalk1,
                     text.b_opponent_radtile.complimentTalk2,
                     text.b_opponent_radtile.complimentTalk3
                  ];
                  state.status = () => () =>
                     world.goatbro ? text.b_opponent_radtile.status1() : text.b_opponent_radtile.complimentStatus();
               } else {
                  state.talk = text.b_opponent_radtile.realTalk1;
                  state.status = () => () =>
                     world.goatbro ? text.b_opponent_radtile.status1() : text.b_opponent_radtile.realStatus();
                  state.vars.mood = 2;
                  state.pacify = true;
                  SAVE.data.b.spared_radtile = true;
               }
            },
            async insult (state) {
               state.vars.heckled = true;
            },
            check (state) {
               if (state.vars.mood < 1) {
                  if (state.vars.mood < 0) {
                     state.talk = text.b_opponent_radtile.checkPostInsultTalk;
                     state.status = () => () =>
                        world.goatbro
                           ? text.b_opponent_radtile.status1()
                           : text.b_opponent_radtile.checkPostInsultStatus();
                  } else {
                     state.talk = text.b_opponent_radtile.checkTalk;
                  }
                  state.vars.mood = 1;
               }
            },
            flirt (state) {
               SAVE.data.b.flirt_radtile = true;
               state.volatile.flirted = true;
               state.talk = text.b_opponent_radtile.flirtTalk1;
            }
         },
         defaultTalk (state) {
            if (state.vars.mood < 0) {
               return [
                  text.b_opponent_radtile.insultIdleTalk1,
                  text.b_opponent_radtile.insultIdleTalk2,
                  text.b_opponent_radtile.insultIdleTalk3
               ];
            } else if (state.vars.mood < 2) {
               return [
                  text.b_opponent_radtile.idleTalk1,
                  text.b_opponent_radtile.idleTalk2,
                  text.b_opponent_radtile.idleTalk3,
                  text.b_opponent_radtile.idleTalk4
               ];
            } else {
               return [
                  text.b_opponent_radtile.realTalkY1,
                  text.b_opponent_radtile.realTalkY2,
                  text.b_opponent_radtile.realTalkY3
               ];
            }
         },
         prestatus (state) {
            if (state.hurt || state.vars.heckled) {
               if (state.vars.mood > 1) {
                  state.talk = text.b_opponent_radtile.shockTalk1;
                  state.status = () => () =>
                     world.goatbro ? text.b_opponent_radtile.status1() : text.b_opponent_radtile.shockStatus();
               } else if (state.vars.mood > -1) {
                  state.talk = text.b_opponent_radtile.insultTalk1;
                  state.status = () => () =>
                     world.goatbro ? text.b_opponent_radtile.status1() : text.b_opponent_radtile.insultStatus();
               }
               state.vars.mood = -1;
               state.vars.heckled = false;
            }
            battler.hurt.includes(state.volatile) && (state.status = () => () => text.b_opponent_radtile.hurtStatus());
         },
         async postfight (state) {
            if (state.dead) {
               await kiddReaction('radtile');
            }
         },
         async postchoice (state) {
            if (!state.dead) {
               if (state.choice.type === 'spare' && !state.volatile.alive && !state.volatile.sparable) {
                  await kiddReactionBully('radtile');
               } else {
                  await kiddHandler(state, 'radtile');
               }
            }
         },
         defaultStatus: () =>
            world.goatbro
               ? () => text.b_opponent_radtile.status1()
               : [
                    () => text.b_opponent_radtile.randStatus1(),
                    () => text.b_opponent_radtile.randStatus2(),
                    () => text.b_opponent_radtile.randStatus3(),
                    () => text.b_opponent_radtile.randStatus4()
                 ],
         bubble: position => [ position.add(21, -76), battler.bubbles.dummy ]
      }),
      sprite: () =>
         new CosmosAnimation({
            active: true,
            anchor: { x: 0, y: 1 },
            resources: content.ibcRadtile,
            objects: [
               new CosmosAnimation({
                  active: true,
                  anchor: { x: 0, y: 1 },
                  resources: content.ibcRadtileTail
               })
            ]
         }),
      goodbye: () => new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcRadtileHurt ] })
   }),
   undyne: new OutertaleOpponent({
      flirted: () => SAVE.data.b.flirt_undyne,
      dramatic: true,
      assets: new CosmosInventory(
         content.ibcUndyneMain,
         content.ibcUndyneMainPain,
         content.ibcUndyneMainSad,
         content.ibcUndyneMainEx,
         content.ibcUndyneArm1,
         content.ibcUndyneArm1Ex,
         content.ibcUndyneArm2,
         content.ibcUndyneArm2Ex,
         content.ibcUndyneBoots,
         content.ibcUndyneBootsEx,
         content.ibcUndyneChestplate,
         content.ibcUndyneChestplateEx,
         content.ibcUndyneHair,
         content.ibcUndyneHairEx,
         content.ibcUndyneHead,
         content.ibcUndyneNeutralFinal,
         content.ibcUndyneSheath,
         content.ibcUndyneSheathEx,
         content.ibcUndyneShocked,
         content.ibcUndyneSmear,
         content.ibcUndyneCage,
         content.ibcUndyneShield,
         content.ibuGreenSOUL,
         content.amUndyneboss,
         content.amUndynegenoStart,
         content.amUndynegeno,
         content.ibcUndyneFatal,
         content.asSuperstrike,
         content.asNode,
         content.ibcUndyneArrow,
         content.ibbArrow,
         content.ibbArrowportal,
         content.asBell,
         content.asBomb,
         content.ibcKiddBody,
         content.avUndyneex,
         content.ibcAsrielAssist,
         content.amEndingexcerpt,
         content.ibbRedspear,
         content.asAppear,
         content.asArrow,
         content.asStab,
         content.asLanding,
         content.ibcUndyneLaugh,
         content.ibcUndyneEyebeam,
         content.ibcUndyneHelmet,
         content.ibcUndyneMainHelmet,
         content.ibcUndyneChestplateHelmet,
         content.amUndynehelmet,
         content.ibcUndyneMainPause,
         content.asGrab,
         content.asPurchase
      ),
      exp: 0,
      hp: 1500,
      df: 0,
      name: () => text.b_opponent_undyne.name(),
      acts: () => [
         [ 'check', text.b_opponent_undyne.act_check ],
         [ 'challenge', [] ],
         [ 'plead', [] ]
      ],
      sparable: false,
      metadata: { reactArtifact: true },
      async handler (choice, target, volatile) {
         const fishBubblePos = { x: 385 / 2, y: 35 / 2 };
         const talk = async (...lines: string[]) => {
            await battler.monster(false, fishBubblePos, battler.bubbles.twinkly, ...lines);
         };

         // battle vars
         const vars = volatile.vars as Partial<{
            artifactcheck: boolean;
            artifactcheck2: boolean;
            attackRunoff: number;
            finalLoader: Promise<void>;
            hardmode: boolean;
            hitmult: number;
            k: CosmosValue;
            lerp: number;
            mercyStreak: number;
            phase: number;
            sb: number;
            shockTurns: number;
            speed: number;
            trolled: boolean;
            turns: number;
         }> & {
            a: number;
            armholder: CosmosObject;
            armswing: boolean;
            azzyAssist: number;
            azzyAssistScene: () => Promise<void>;
            b: number;
            c: CosmosValue;
            d: number;
            e: number;
            fancygrid: CosmosObject;
            idealcolor: 'green' | 'red';
            wt: (
               cutscene: boolean,
               position: CosmosPointSimple,
               bubble: (
                  fontFamily?: () => CosmosFont | null,
                  fontSize?: () => number,
                  content?: () => string
               ) => CosmosObject,
               ...lines: string[]
            ) => Promise<void>;
         };

         vars.artifactcheck ??= false;
         vars.artifactcheck2 ??= false;
         vars.attackRunoff ??= 0;
         vars.hardmode ??= SAVE.data.b.undyne_hardmode;
         vars.hitmult ??= 1;
         vars.k ??= new CosmosValue(1);
         vars.lerp ??= 0;
         vars.mercyStreak ??= 0;
         vars.phase ??= [ 0, 2, 3, 4, 4 ][SAVE.data.n.undyne_phase];
         vars.shockTurns ??= 0;
         vars.speed ??= SAVE.data.n.undyne_speed || (helmetdyne() ? 1.23 : 1);
         vars.trolled ??= false;
         vars.turns ??= 0;

         // local vars
         let earlyChallenge = false;
         let mercy = false;
         let noStatus = false;
         const noTalk = false;
         let swing = false;

         // handle actions upfront
         switch (choice.type) {
            case 'item': {
               switch (choice.item) {
                  case 'artifact':
                     await battler.human(...text.b_opponent_undyne.artifact);
                     break;
                  case 'spaghetti':
                     if (SAVE.data.n.state_starton_papyrus === 1) {
                        await battler.human(...text.b_opponent_undyne.spaghetti2());
                        battler.stat.monsterdef.modifiers.push([ 'add', -5, Infinity ]);
                        if (world.genocide) {
                           battler.stat.monsteratk.modifiers.push([ 'add', 2, Infinity ]);
                        }
                     } else if (vars.phase < 5) {
                        await battler.human(...text.b_opponent_undyne.spaghetti1);
                        battler.stat.monsteratk.modifiers.push([ 'add', -1, Infinity ]);
                     }
                     break;
                  case 'epiphany': {
                     const index = speech.emoters.undyne.index;
                     await epiphany(
                        target,
                        volatile,
                        160,
                        { result: false },
                        battler.bubbles.twinkly,
                        fishBubblePos,
                        text.b_opponent_undyne.epiphaNOPE,
                        () => void (speech.emoters.undyne.index = index)
                     );
                     break;
                  }
               }
               break;
            }
            case 'fight': {
               if (world.genocide) {
                  if (vars.azzyAssist === 1) {
                     noStatus = true;
                     await vars.azzyAssistScene();
                  }
                  let xdamage = 1;
                  if (vars.azzyAssist === 2) {
                     let curr = 0;
                     let subtimer = renderer.time + 1600;
                     let whoops = NaN;
                     const dirs = [ 'up', 'left', 'right', 'down' ] as CosmosDirection[];
                     const arrows = CosmosUtils.populate(7, index => {
                        const rand = Math.floor(rng.battle.next() * 4);
                        return new CosmosSprite({
                           anchor: 0,
                           frames: [ content.ibcUndyneArrow ],
                           position: { x: (index - 3) * 20 },
                           rotation: [ 270, 180, 0, 90 ][rand],
                           metadata: { dir: dirs[rand] }
                        }).on('tick', function () {
                           if (curr === index) {
                              this.scale.x = 1.25;
                              this.scale.y = 1.25;
                           } else {
                              this.scale.x = 1;
                              this.scale.y = 1;
                           }
                           if (whoops === index) {
                              this.tint = 0xff0000;
                           } else if (curr > index) {
                              this.tint = 0x00ff00;
                           } else {
                              this.tint = 0xffffff;
                           }
                        });
                     });
                     const wrapper = new CosmosObject({
                        alpha: 0,
                        position: { x: 160, y: 60 },
                        objects: [
                           new CosmosRectangle({
                              anchor: { x: 0, y: -0.5 },
                              alpha: 0.9,
                              fill: 0,
                              size: { x: 320, y: 240 }
                           }),
                           ...arrows
                        ]
                     });
                     renderer.attach('menu', wrapper);
                     await wrapper.alpha.modulate(renderer, 150, 1);
                     const listener = function (this: CosmosKeyboardInput) {
                        if (Number.isNaN(whoops) && curr < 7) {
                           if (this === keys[`${arrows[curr].metadata.dir as CosmosDirection}Key`]) {
                              const p = sounds.purchase.instance(renderer);
                              p.rate.value = 2;
                              p.gain.value *= 0.7;
                              curr++;
                              xdamage = 25 ** (curr / 7);
                              subtimer += 150;
                           } else {
                              sounds.node.instance(renderer).rate.value = 1.5;
                              whoops = curr;
                              xdamage = 1;
                           }
                        }
                     };
                     for (const dir of dirs) {
                        keys[`${dir}Key`].on('down', listener);
                     }
                     await Promise.race([
                        renderer.when(() => renderer.time > subtimer),
                        renderer.when(() => !Number.isNaN(whoops) || curr === 7)
                     ]);
                     for (const dir of dirs) {
                        keys[`${dir}Key`].off('down', listener);
                     }
                     if (!Number.isNaN(whoops) || curr === 7) {
                        await renderer.pause(250);
                     }
                     if (!Number.isNaN(whoops)) {
                        wrapper.position.modulate(renderer, 200, wrapper.position.value(), {
                           y: wrapper.position.y + 50
                        });
                     } else {
                        const striker = sounds.superstrike.instance(renderer);
                        striker.gain.value = CosmosMath.bezier(curr / 7, 0, 0, 0, 0, striker.daemon.gain);
                        if (curr === 7) {
                           wrapper.scale.modulate(renderer, 200, { x: 2, y: 2 }, { x: 2, y: 2 }).then(async () => {
                              await renderer.pause(100);
                              heal(2, true, true);
                           });
                        }
                     }
                     wrapper.alpha.modulate(renderer, 200, 0, 0).then(() => {
                        renderer.detach('menu', wrapper);
                     });
                  }
                  const gannadie = volatile.hp <= battler.calculate(volatile, choice.score, xdamage);
                  if (gannadie) {
                     const e = battler.music;
                     battler.music = null;
                     e?.stop();
                     SAVE.flag.b._victory = true;
                     SAVE.flag.n._genocide_milestone_last = 2;
                     SAVE.flag.n.genocide_milestone = Math.max(2, SAVE.flag.n.genocide_milestone) as 2;
                  }
                  await battler.attack(volatile, { power: choice.score, multiplier: xdamage }, true, true);
                  if (gannadie) {
                     await renderer.pause(1000);
                     speech.emoters.undyne.index = 24;
                     const head = new CosmosObject({
                        position: { x: 0.5 },
                        objects: [
                           new CosmosAnimation({
                              anchor: { x: 0, y: 1 },
                              index: 11,
                              resources: content.ibcUndyneHead
                           }).on('tick', function () {
                              this.index = speech.emoters.undyne.index;
                           })
                        ]
                     });
                     volatile.container.attach(head);
                     const basepos1 = volatile.container.objects[0].position.value();
                     const basepos2 = volatile.container.objects[1].position.value();
                     volatile.container.area = renderer.area!;
                     const ramp = new CosmosValue();
                     const tickah = () => {
                        const rando = new CosmosPoint(
                           (Math.random() * 2 - 1) * ramp.value,
                           (Math.random() * 2 - 1) * ramp.value
                        );
                        volatile.container.objects[0].position.set(rando.add(basepos1));
                        volatile.container.objects[1].position.set(rando.add(basepos2));
                     };
                     volatile.container.on('tick', tickah);
                     ramp.modulate(renderer, 1000, 1);
                     await vars.wt(false, fishBubblePos, battler.bubbles.twinkly, ...text.b_opponent_undyne.genoDeath1);
                     await antifreeze([ vars.finalLoader, renderer.pause(450) ]);
                     const mus = music.undynegenoFinal.instance(renderer);
                     const stopPromise = mus.on('stop');
                     await renderer.pause(1650);
                     await vars.wt(false, fishBubblePos, battler.bubbles.twinkly, ...text.b_opponent_undyne.genoDeath2);
                     ramp.modulate(renderer, 1000, 0);
                     await renderer.pause(2450);
                     volatile.container.off('tick', tickah);
                     volatile.container.detach(head);
                     const anim = volatile.container.objects[0] as CosmosAnimation;
                     anim.index = 1;
                     await vars.wt(false, fishBubblePos, battler.bubbles.twinkly, ...text.b_opponent_undyne.genoDeath3);
                     await Promise.race([ renderer.pause(2450), stopPromise ]);
                     anim.index = 2;
                     await stopPromise;
                     await vars.wt(false, fishBubblePos, battler.bubbles.twinkly, ...text.b_opponent_undyne.genoDeath4);
                     SAVE.data.n.exp += 1000;
                     await battler.vaporize(anim);
                     await renderer.pause(1000);
                     renderer.detach('menu', vars.armholder);
                     events.fire('exit');
                     SAVE.data.n.state_foundry_undyne = 2;
                     return;
                  }
               } else {
                  vars.attackRunoff += 3;
                  let earlytick = true;
                  const basepos1 = volatile.container.objects[0].position.value();
                  const basepos2 = { x: 0.5, y: 0 };
                  const hploss = battler.calculate(volatile, choice.score, vars.phase < 5 ? vars.hitmult : 2);
                  (respecc() || vars.phase === 4) && (vars.hitmult *= 1 / 0.9);
                  const gannadie = volatile.hp <= hploss;
                  if (gannadie && vars.phase < 5) {
                     battler.music?.stop();
                     if (!helmetdyne()) {
                        speech.emoters.undyne.index = 11;
                        volatile.container.attach(
                           new CosmosObject({
                              position: basepos2,
                              objects: [
                                 new CosmosAnimation({
                                    anchor: { x: 0, y: 1 },
                                    index: 11,
                                    resources: content.ibcUndyneHead
                                 }).on('tick', function () {
                                    this.index = speech.emoters.undyne.index;
                                 })
                              ]
                           }).on('tick', function () {
                              if (earlytick) {
                                 this.position = volatile.container.objects[0].position
                                    .subtract(basepos1)
                                    .add(basepos2);
                              }
                           })
                        );
                     }
                  }
                  const prev = volatile.container.objects[0];
                  await battler.attack(volatile, { operation: 'add', power: -hploss }, true, true);
                  earlytick = false;
                  if (gannadie) {
                     if (vars.phase < 5) {
                        const c = vars.c;
                        c.modulate(renderer, 2000, c.value, 0.1, 0.1);
                        await renderer.pause(1000);
                        battler.flee = false;
                        const fancygrid = vars.fancygrid;
                        fancygrid.metadata.cutscene = true;
                        fancygrid.alpha.modulate(renderer, 3000, 0);
                        if (helmetdyne()) {
                           await renderer.pause(1000);
                        } else {
                           await vars.wt(
                              false,
                              fishBubblePos,
                              battler.bubbles.twinkly,
                              ...text.b_opponent_undyne.death1()
                           );
                        }
                        await c.modulate(renderer, 2500, 0.6, 0.8);
                        await renderer.pause(3000);
                        c.modulate(renderer, 2500, 0.3, 0.1);
                        const sh = new CosmosValue();
                        if (helmetdyne()) {
                           function shakeTicker (this: CosmosObject) {
                              if (sh.value > 0) {
                                 this.offsets[10].set(
                                    sh.value * (Math.random() - 0.5),
                                    sh.value * (Math.random() - 0.5)
                                 );
                              } else {
                                 this.offsets[10].set(0);
                              }
                           }
                           volatile.container.on('tick', shakeTicker);
                           volatile.container.objects[0].frames = [ content.ibcUndyneMainPause ];
                           sounds.grab.instance(renderer);
                           sh.value = 4;
                           await sh.modulate(renderer, 500, 0);
                           volatile.container.off('tick', shakeTicker);
                        }
                        await vars.wt(
                           false,
                           fishBubblePos,
                           battler.bubbles.twinkly,
                           ...text.b_opponent_undyne.death2()
                        );
                        await renderer.pause(1000);
                        volatile.container.objects = [ prev ];
                        if (helmetdyne()) {
                           prev.objects[0].objects[0] = speech.emoters.undyne = new CosmosAnimation({
                              anchor: { x: 0, y: 1 },
                              position: 0.5,
                              resources: content.ibcUndyneHead,
                              metadata: { part: 'head' }
                           });
                           prev.objects[1].objects[2] = new CosmosSprite({
                              anchor: { x: 0, y: 1 },
                              frames: [ content.ibcUndyneChestplate ]
                           });
                        }
                        if (game.room !== 'f_napstablook' || SAVE.data.n.state_foundry_blookmusic === 0) {
                           battler.music = music.endingexcerpt.instance(renderer);
                           battler.music.source!.loopStart = (60 / 95) * 3 * 32;
                           battler.music.source!.loopEnd = (60 / 95) * 3 * 48;
                        }
                        await talk(...text.b_opponent_undyne.death3());
                        battler.SOUL.metadata.color = 'red';
                        await battler.box.size.modulate(renderer, 300, { x: 36, y: 36 });
                        await battler.box.position.modulate(renderer, 150, { y: 120 });
                        battler.SOUL.alpha.value = 1;
                        battler.SOUL.position.set(battler.box.position);
                        battler.SOUL.tick();
                        game.movement = true;
                        vars.idealcolor = 'green';
                        vars.armswing = true;
                        await renderer.when(() => vars.armswing === false);
                        await renderer.pause(850);
                        await talk(...text.b_opponent_undyne.death4());
                        game.movement = false;
                        battler.SOUL.alpha.value = 0;
                        await battler.box.position.modulate(renderer, 150, { y: 160 });
                        await battler.box.size.modulate(renderer, 300, { x: 282.5, y: 65 });
                        vars.phase = 5;
                        vars.turns = 0;
                        helmetoverride.state = true;
                        vars.speed = 1.46;
                        battler.status = () => text.b_opponent_undyne.neutralFinalStatus;
                        volatile.alive = true;
                        battler.resume();
                        volatile.container.area = new Rectangle(0, 0, 640, 240);
                        let oldtime = (vars.sb = renderer.time);
                        volatile.container.on('tick', () => {
                           const delta = renderer.time - oldtime;
                           vars.sb! += delta * vars.k!.value;
                           oldtime += delta;
                        });
                        opponents.undyne.dramatic = false;
                        return;
                     } else {
                        volatile.container.objects[0] = prev;
                        volatile.alive = true;
                     }
                  }
               }
               break;
            }
            case 'act': {
               switch (choice.act) {
                  case 'plead':
                     if (world.genocide) {
                        await battler.human(...text.b_opponent_undyne.pleadText4);
                     } else if (vars.phase === 5) {
                        await battler.human(...text.b_opponent_undyne.pleadText6);
                     } else if (helmetdyne()) {
                        await battler.human(...text.b_opponent_undyne.pleadText8);
                     } else if (respecc()) {
                        if (vars.speed < 1.6) {
                           vars.speed *= 1.1;
                           if (vars.speed < 1.6) {
                              await battler.human(...text.b_opponent_undyne.pleadText7a);
                           } else {
                              await battler.human(...text.b_opponent_undyne.pleadText7c);
                              vars.speed = 2;
                           }
                        } else {
                           await battler.human(...text.b_opponent_undyne.pleadText7b);
                        }
                     } else if (vars.hardmode) {
                        await battler.human(...text.b_opponent_undyne.pleadText5);
                     } else if (SAVE.data.n.state_starton_papyrus !== 1 && vars.attackRunoff < 2) {
                        if (vars.speed < 1.6 && 0.9 <= vars.speed) {
                           await battler.human(...text.b_opponent_undyne.pleadText2);
                           vars.speed *= 0.8;
                           if (vars.speed < 0.9) {
                              vars.speed = 0.9;
                           }
                        } else {
                           await battler.human(...text.b_opponent_undyne.pleadText1);
                        }
                     } else {
                        await battler.human(...text.b_opponent_undyne.pleadText3);
                     }
                     break;
                  case 'challenge':
                     if (world.genocide) {
                        await battler.human(...text.b_opponent_undyne.challengeText1);
                     } else if (helmetdyne()) {
                        await battler.human(...text.b_opponent_undyne.challengeText7);
                     } else if (vars.phase === 0 && vars.turns === 0) {
                        await battler.human(...text.b_opponent_undyne.challengeText4);
                        await talk(...text.b_opponent_undyne.earlyChallenge());
                        vars.phase = 1;
                        vars.turns = 0;
                        vars.speed = respecc() ? 2.2 : 2;
                        vars.hardmode = true;
                        earlyChallenge = true;
                     } else if (vars.phase > 3) {
                        await battler.human(...text.b_opponent_undyne.challengeText1);
                     } else if (vars.speed < 1.6) {
                        vars.speed *= 1.1;
                        if (vars.speed < 1.6) {
                           await battler.human(...text.b_opponent_undyne.challengeText2);
                        } else {
                           await battler.human(...text.b_opponent_undyne.challengeText3);
                           vars.speed = 2;
                        }
                     } else {
                        await battler.human(...text.b_opponent_undyne.challengeText5);
                     }
                     break;
               }
               break;
            }
            case 'fake':
            case 'spare': {
               mercy = true;
               vars.mercyStreak++;
               break;
            }
            case 'flee': {
               SAVE.data.n.undyne_speed = vars.speed;
               SAVE.data.b.undyne_hardmode = vars.hardmode === true;
               SAVE.data.n.undyne_hp = volatile.hp;
               renderer.detach('menu', vars.armholder);
               events.fire('escape');
               battler.music?.stop();
               battler.music = null;
               SAVE.data.n.undyne_phase < 4 && SAVE.data.n.undyne_phase++;
               return;
            }
         }

         // get current phase and turns (very useful)
         const truePhase = vars.phase;
         const trueTurns = vars.turns;

         // phase gubbins and talk dialogue
         if (world.genocide) {
            const lerp = ++vars.lerp;
            if (battler.SOUL.metadata.color === 'red') {
               if (lerp === 2) {
                  swing = true;
                  vars.idealcolor = 'green';
                  vars.lerp = 0;
               }
            } else {
               if (lerp === 6) {
                  swing = true;
                  vars.idealcolor = 'red';
                  vars.lerp = 0;
               }
            }
         } else if (!helmetdyne()) {
            choice.type !== 'fight' && vars.attackRunoff > 0 && vars.attackRunoff--;
            mercy || (vars.mercyStreak = 0);
            if (vars.phase < 4) {
               if (vars.turns === [ -1, 4, 5, 7 ][vars.phase]) {
                  swing = true;
                  vars.idealcolor = 'red';
               }
               if (vars.turns++ === [ SAVE.data.n.state_starton_papyrus === 1 ? 0 : 4, 6, 7, 9 ][vars.phase]) {
                  if (vars.phase > 0) {
                     if (vars.phase < 3) {
                        swing = true;
                        vars.idealcolor = 'green';
                     }
                     if (SAVE.data.n.undyne_phase < 4) {
                        SAVE.data.n.undyne_phase++;
                     }
                  } else {
                     vars.trolled = true;
                     vars.speed = 1.46;
                     vars.hardmode = true;
                  }
                  vars.turns = 0;
                  switch (vars.phase++) {
                     case 1:
                        vars.turns = 1;
                        break;
                     case 2:
                        SAVE.data.n.state_starton_papyrus === 1 && (vars.turns = 1);
                        break;
                  }
               }
            } else if (vars.phase === 5) {
               vars.turns++;
            }
            if (!earlyChallenge && !noTalk) {
               await vars.wt(
                  false,
                  fishBubblePos,
                  battler.bubbles.twinkly,
                  ...CosmosUtils.provide(
                     [
                        [
                           text.b_opponent_undyne.tutorial1,
                           text.b_opponent_undyne.tutorial2,
                           text.b_opponent_undyne.tutorial3,
                           text.b_opponent_undyne.tutorial4,
                           text.b_opponent_undyne.tutorial5
                        ],
                        [
                           text.b_opponent_undyne.turnTalkA1,
                           text.b_opponent_undyne.turnTalkA2,
                           text.b_opponent_undyne.turnTalkA3,
                           text.b_opponent_undyne.turnTalkA4,
                           text.b_opponent_undyne.turnTalkA5,
                           [ text.b_opponent_undyne.turnTalkA6a, text.b_opponent_undyne.turnTalkA6b ][mercy ? 1 : 0],
                           [ text.b_opponent_undyne.turnTalkA7a, text.b_opponent_undyne.turnTalkA7b ][
                              vars.mercyStreak > 1 ? 1 : 0
                           ]
                        ],
                        [
                           text.b_opponent_undyne.turnTalkB1,
                           text.b_opponent_undyne.turnTalkB2,
                           text.b_opponent_undyne.turnTalkB3,
                           text.b_opponent_undyne.turnTalkB4,
                           text.b_opponent_undyne.turnTalkB5,
                           text.b_opponent_undyne.turnTalkB6,
                           [ text.b_opponent_undyne.turnTalkB7a, text.b_opponent_undyne.turnTalkB7b ][
                              vars.mercyStreak > 1 ? 1 : 0
                           ],
                           [ text.b_opponent_undyne.turnTalkB8a, text.b_opponent_undyne.turnTalkB8b ][
                              vars.mercyStreak > 1 ? 1 : 0
                           ]
                        ],
                        [
                           text.b_opponent_undyne.turnTalkC1,
                           text.b_opponent_undyne.turnTalkC2,
                           text.b_opponent_undyne.turnTalkC3,
                           text.b_opponent_undyne.turnTalkC4,
                           text.b_opponent_undyne.turnTalkC5,
                           text.b_opponent_undyne.turnTalkC6,
                           text.b_opponent_undyne.turnTalkC7,
                           text.b_opponent_undyne.turnTalkC8,
                           [ text.b_opponent_undyne.turnTalkC9a, text.b_opponent_undyne.turnTalkC9b ][
                              vars.mercyStreak > 1 ? 1 : 0
                           ],
                           [ text.b_opponent_undyne.turnTalkC10a, text.b_opponent_undyne.turnTalkC10b ][
                              vars.mercyStreak > 1 ? 1 : 0
                           ]
                        ],
                        [ text.b_opponent_undyne.turnTalkD ],
                        [
                           text.b_opponent_undyne.determination1,
                           text.b_opponent_undyne.determination2,
                           text.b_opponent_undyne.determination3,
                           text.b_opponent_undyne.determination4,
                           text.b_opponent_undyne.determination5,
                           text.b_opponent_undyne.determination6,
                           text.b_opponent_undyne.determination7,
                           text.b_opponent_undyne.determination8
                        ]
                     ][truePhase][trueTurns]
                  )
               );
            }
         }

         // standard attack code
         const epic = respecc() && truePhase === 3 && trueTurns === 7;
         await patterns.undyne(truePhase, trueTurns, epic ? false : swing, opponents.undyne.hp);

         // most awesome thing in existence
         if (epic) {
            battler.music?.stop();
            await volatile.container.objects[0].metadata.slowdown.modulate(renderer, 2000, 800 / 30);
            await renderer.pause(1000);
            await vars.wt(false, fishBubblePos, battler.bubbles.twinkly, ...text.b_opponent_undyne.respeccTalk1);
            await renderer.pause(1250);
            await vars.wt(false, fishBubblePos, battler.bubbles.twinkly, ...text.b_opponent_undyne.respeccTalk2);
            await renderer.pause(2450);
            await vars.wt(false, fishBubblePos, battler.bubbles.twinkly, ...text.b_opponent_undyne.respeccTalk3);
            const alpine = new AlphaFilter(1);
            volatile.container.filters = [ alpine ];
            volatile.container.area = renderer.area;
            await new CosmosValueLinked({
               get value () {
                  return alpine.alpha;
               },
               set value (v) {
                  alpine.alpha = v;
               }
            }).modulate(renderer, 2000, 0);
            await renderer.pause(2000);
            renderer.detach('menu', vars.armholder);
            SAVE.data.n.plot = 48;
            battler.encounter_state.movement = true;
            SAVE.data.b.undyne_respecc = true;
            events.fire('exit');
            renderer.detach('main', erndyne);
            return;
         }

         // handle neutral death :cold_face:
         if (truePhase === 5) {
            const kv = vars.k!.value;
            vars.k!.modulate(renderer, 500, kv, kv * 0.85, kv * 0.85);
            const cv = vars.c.value;
            vars.c.modulate(renderer, 1000, cv, cv + 0.3 / 9, cv + 0.3 / 9);
            if (vars.turns === 8) {
               await renderer.pause(1000);
               const e = battler.music;
               battler.music = null;
               e?.stop();
               await vars.wt(false, fishBubblePos, battler.bubbles.twinkly, ...text.b_opponent_undyne.death5());
               const c = vars.c as CosmosValue;
               c.modulate(renderer, 1000, c.value, 0.5, 0.5);
               await renderer.pause(450);
               await vars.wt(false, fishBubblePos, battler.bubbles.twinkly, ...text.b_opponent_undyne.death6());
               c.modulate(renderer, 1500, c.value, 0.6, 0.6).then(() => c.modulate(renderer, 1500, c.value, 1, 1));
               await vars.wt(false, fishBubblePos, battler.bubbles.twinkly, ...text.b_opponent_undyne.death7);
               await renderer.pause(2000);
               const neutralFinal = new CosmosAnimation({
                  anchor: { x: 0, y: 1 },
                  resources: content.ibcUndyneNeutralFinal
               });
               volatile.container.objects = [ neutralFinal ];
               c.modulate(renderer, 2000, c.value, -0.1);
               await vars.wt(false, fishBubblePos, battler.bubbles.twinkly, ...text.b_opponent_undyne.death8a);
               await renderer.pause(2500);
               neutralFinal.index = 1;
               await vars.wt(false, fishBubblePos, battler.bubbles.twinkly, ...text.b_opponent_undyne.death8b);
               await renderer.pause(2000);
               neutralFinal.index = 2;
               await vars.wt(false, fishBubblePos, battler.bubbles.twinkly, ...text.b_opponent_undyne.death8c);
               await renderer.pause(2000);
               neutralFinal.index = 3;
               await vars.wt(false, fishBubblePos, battler.bubbles.twinkly, ...text.b_opponent_undyne.death9);
               SAVE.data.n.exp += 1000;
               await battler.vaporize(neutralFinal);
               await renderer.pause(1000);
               renderer.detach('menu', vars.armholder);
               SAVE.data.n.plot = 48;
               battler.encounter_state.movement = true;
               SAVE.data.n.state_foundry_undyne = 2;
               helmetoverride.state = false;
               events.fire('exit');
               renderer.detach('main', erndyne);
               return;
            }
         }

         // status text handler
         if (!noStatus) {
            battler.status = helmetdyne()
               ? () => text.b_opponent_undyne.status1()
               : earlyChallenge
               ? () => text.b_opponent_undyne.earlyChallengeStatus
               : world.genocide
               ? vars.azzyAssist < 2
                  ? [
                       () => text.b_opponent_undyne.genoStatus2,
                       () => text.b_opponent_undyne.genoStatus3,
                       () => text.b_opponent_undyne.genoStatus4,
                       () => text.b_opponent_undyne.genoStatus5
                    ][Math.min(vars.shockTurns!++, 3)]
                  : volatile.hp < 1200
                  ? () => text.b_opponent_undyne.trueGenoStatusLow2
                  : volatile.hp < 2400
                  ? () => text.b_opponent_undyne.trueGenoStatusLow1
                  : [
                       () => text.b_opponent_undyne.trueGenoStatus1,
                       () => text.b_opponent_undyne.trueGenoStatus2,
                       () => text.b_opponent_undyne.trueGenoStatus3,
                       () => text.b_opponent_undyne.trueGenoStatus4,
                       () => text.b_opponent_undyne.trueGenoStatus5
                    ][rng.dialogue.int(5)]
               : truePhase === 5
               ? [
                    () => text.b_opponent_undyne.deterStatus1,
                    () => text.b_opponent_undyne.deterStatus2,
                    () => text.b_opponent_undyne.deterStatus3,
                    () => text.b_opponent_undyne.deterStatus4,
                    () => text.b_opponent_undyne.deterStatus5
                 ][rng.dialogue.int(5)]
               : SAVE.data.n.state_starton_papyrus === 1
               ? [
                    () => text.b_opponent_undyne.papStatus1,
                    () => text.b_opponent_undyne.papStatus2,
                    () => text.b_opponent_undyne.papStatus3,
                    () => text.b_opponent_undyne.papStatus4,
                    () => text.b_opponent_undyne.papStatus5
                 ][rng.dialogue.int(5)]
               : volatile.hp < opponents.undyne.hp / 4
               ? [
                    () => text.b_opponent_undyne.lowStatus1,
                    () => text.b_opponent_undyne.lowStatus2,
                    () => text.b_opponent_undyne.lowStatus3,
                    () => text.b_opponent_undyne.lowStatus4,
                    () => text.b_opponent_undyne.lowStatus5
                 ][rng.dialogue.int(5)]
               : [
                    () => text.b_opponent_undyne.randStatus1(),
                    () => text.b_opponent_undyne.randStatus2(),
                    () => text.b_opponent_undyne.randStatus3(),
                    () => text.b_opponent_undyne.randStatus4(),
                    () => text.b_opponent_undyne.randStatus5(),
                    () => text.b_opponent_undyne.randStatus6(),
                    () => text.b_opponent_undyne.randStatus7(),
                    () => text.b_opponent_undyne.randStatus8(),
                    () => text.b_opponent_undyne.randStatus9(),
                    () => text.b_opponent_undyne.randStatus10()
                 ][rng.dialogue.int(10)];

            if (world.genocide && vars.azzyAssist < 2 && vars.shockTurns === 3) {
               vars.azzyAssist = 1;
            }
         }

         await battler.resume();
      },
      sprite: () =>
         new CosmosSprite({
            anchor: { x: 0, y: 1 },
            metadata: { base: renderer.time, slowdown: new CosmosValue() },
            frames: [ world.genocide ? content.ibcUndyneBootsEx : content.ibcUndyneBoots ],
            objects: [
               new CosmosAnimation({
                  active: true,
                  anchor: { x: 0, y: 1 },
                  metadata: { part: 'hair' },
                  resources: world.genocide ? content.ibcUndyneHairEx : content.ibcUndyneHair,
                  objects: [
                     helmetdyne()
                        ? new CosmosSprite({
                             anchor: { x: 0, y: 1 },
                             frames: [ content.ibcUndyneHelmet ],
                             metadata: { part: 'head' }
                          })
                        : new CosmosAnimation({
                             anchor: { x: 0, y: 1 },
                             position: 0.5,
                             resources: content.ibcUndyneHead,
                             metadata: { part: 'head', savedIndex: void 0 as number | void },
                             objects: world.genocide
                                ? [
                                     new CosmosSprite({
                                        active: true,
                                        anchor: { x: -1, y: 0 },
                                        position: { x: 5.5, y: -102 },
                                        frames: [ content.ibcUndyneEyebeam ]
                                     }).on('tick', function () {
                                        if (battler.volatile[0].vars.CRAZYHEAD) {
                                           this.alpha.value = 0;
                                        } else {
                                           this.rotation.value = sineWaver(
                                              (this.metadata.rottime ??= renderer.time),
                                              2500,
                                              -30,
                                              30
                                           );
                                           const ftr = 1600;
                                           const flashtime = ((this.metadata.flashtime ??= 0) % ftr) / ftr;
                                           this.alpha.value = Math.max(CosmosMath.bezier(flashtime, 1, -0.6), 0);
                                           this.scale.x = CosmosMath.remap(flashtime, 1, 2);
                                           this.metadata.flashtime += 100 / 3;
                                        }
                                     })
                                  ]
                                : []
                          }).on('tick', function () {
                             const vola = battler.volatile[0];
                             switch (vola.vars.CRAZYHEAD) {
                                case 1:
                                   if (this.resources === content.ibcUndyneHead) {
                                      this.metadata.savedIndex = this.index;
                                      this.use(content.ibcUndyneLaugh);
                                      this.active = true;
                                   }
                                   this.position.y = Math.max(this.position.y - 1, -2);
                                   break;
                                case 2:
                                   if (this.resources === content.ibcUndyneLaugh) {
                                      this.use(content.ibcUndyneHead);
                                      this.active = false;
                                      this.index = this.metadata.savedIndex!;
                                   }
                                   this.position.y = Math.min(this.position.y + 1, 2);
                                   break;
                                case 3:
                                   this.position.y = Math.max(this.position.y - 1, 0);
                                   break;
                             }
                          })
                  ]
               }),
               new CosmosObject({
                  position: { y: 1 },
                  metadata: { part: 'chestplate' },
                  objects: [
                     new CosmosSprite({
                        anchor: { x: 0, y: 1 },
                        metadata: { part: 'arm1' },
                        frames: [ world.genocide ? content.ibcUndyneArm1Ex : content.ibcUndyneArm1 ]
                     }),
                     new CosmosSprite({
                        anchor: { x: 0, y: 1 },
                        position: { x: 2 },
                        metadata: { part: 'arm2' },
                        frames: [ world.genocide ? content.ibcUndyneArm2Ex : content.ibcUndyneArm2 ]
                     }).on('tick', function () {
                        if (battler.volatile[0].vars.armswing) {
                           this.alpha.value = 0;
                        } else {
                           this.alpha.value = 1;
                        }
                     }),
                     new CosmosSprite({
                        anchor: { x: 0, y: 1 },
                        frames: [
                           helmetdyne()
                              ? content.ibcUndyneChestplateHelmet
                              : world.genocide
                              ? content.ibcUndyneChestplateEx
                              : content.ibcUndyneChestplate
                        ]
                     })
                  ]
               }),
               new CosmosSprite({
                  anchor: { x: 0, y: 1 },
                  position: { y: 1 },
                  metadata: { part: 'sheath' },
                  frames: [ world.genocide ? content.ibcUndyneSheathEx : content.ibcUndyneSheath ]
               })
            ]
         }).on('tick', function () {
            const vola = battler.volatile[0];
            if (!vola.vars.freeze) {
               this.metadata.base += this.metadata.slowdown.value;
               const diff = (vola.vars.sb || renderer.time) - this.metadata.base;
               const phase = (diff % 1000) / 1000;
               const siner = CosmosMath.wave(phase);
               CosmosUtils.chain(this.objects, (objects, next) => {
                  for (const sprite of objects as CosmosSprite[]) {
                     next(sprite.objects);
                     switch (sprite.metadata.part) {
                        case 'sheath':
                           sprite.position.y = ((sprite.metadata.baseY ??= sprite.position.y) as number) - siner * 2.5;
                           break;
                        case 'chestplate':
                           sprite.position.y = ((sprite.metadata.baseY ??= sprite.position.y) as number) - siner * 3;
                           break;
                        case 'hair':
                           sprite.position.y =
                              ((sprite.metadata.baseY ??= sprite.position.y) as number) - siner * 3.5 + 0.25;
                           break;
                        case 'arm1':
                           sprite.position.x =
                              ((sprite.metadata.baseX ??= sprite.position.x) as number) -
                              CosmosMath.wave((diff % 500) / 500);
                           sprite.position.y = ((sprite.metadata.baseY ??= sprite.position.y) as number) - siner * 2;
                           break;
                        case 'arm2':
                           sprite.position.x = ((sprite.metadata.baseX ??= sprite.position.x) as number) - siner * 2;
                           break;
                     }
                  }
               });
            }
         }),
      goodbye: () =>
         helmetdyne()
            ? new CosmosSprite({
                 anchor: { x: 0, y: 1 },
                 metadata: { size: { y: 80 } },
                 frames: [ content.ibcUndyneMainHelmet ]
              })
            : world.genocide
            ? new CosmosAnimation({
                 anchor: { x: 0, y: 1 },
                 metadata: { size: { y: 80 } },
                 resources: battler.volatile[0].vars.genostrike ? content.ibcUndyneFatal : content.ibcUndyneMainEx
              })
            : new CosmosSprite({
                 anchor: { x: 0, y: 1 },
                 metadata: { size: { y: 80 } },
                 frames: [
                    battler.volatile[0].vars.phase === 5
                       ? content.ibcUndyneMainPain
                       : SAVE.data.n.state_starton_papyrus === 1
                       ? content.ibcUndyneMainSad
                       : content.ibcUndyneMain
                 ]
              })
   }),
   dateundyne: new OutertaleOpponent({
      flirted: () => SAVE.data.b.flirt_undyne,
      dramatic: true,
      assets: new CosmosInventory(
         content.ibcUndyneHair,
         content.ibcUndyneHead,
         content.amUndyneboss,
         content.ibcUndyneDateArm,
         content.ibcUndyneDateLegs,
         content.ibcUndyneDate,
         content.ibcUndyneDateSpear,
         content.ibcUndyneDateTorso,
         content.asCymbal
      ),
      exp: 0,
      hp: 1500,
      df: 0,
      name: () => text.b_opponent_dateundyne.name,
      acts: () => [
         [ 'check', text.b_opponent_dateundyne.act_check ],
         [ 'flirt', [] ]
      ],
      safe: true,
      sparable: false,
      async handler (choice, target, volatile) {
         let idle = true;
         let endPart = false;
         let fought = false;
         const fishBubblePos = { x: 185, y: 32.5 };
         async function talk (...lines: string[]) {
            await battler.monster(false, fishBubblePos, battler.bubbles.twinkly, ...lines);
         }
         switch (choice.type) {
            case 'fight':
               await volatile.vars.fightPromise;
               volatile.vars.sb = renderer.time;
               speech.emoters.undyne.index = SAVE.data.b.undyne_respecc ? 19 : 16;
               const power = SAVE.data.b.oops
                  ? (1 + Math.floor(SAVE.data.n.bully / 5)) * (SAVE.data.b.undyne_respecc ? 10 : 1)
                  : 0;
               SAVE.data.b.oops || (volatile.opponent.ghost = true);
               await battler.attack(volatile, { power: -power, operation: 'add' });
               await renderer.pause(1600);
               await talk(...text.b_opponent_dateundyne.fightTalk(power > 1));
               await renderer.pause(1400);
               endPart = true;
               fought = true;
               break;
            case 'item':
               if (choice.item === 'snack') {
                  idle = false;
                  await talk(...text.b_opponent_dateundyne.snacker());
                  battler.status = () => text.b_opponent_dateundyne.status1;
               } else if (choice.item === 'epiphany') {
                  const index = speech.emoters.undyne.index;
                  await epiphany(
                     target,
                     volatile,
                     160,
                     { result: false },
                     battler.bubbles.twinkly,
                     fishBubblePos,
                     text.b_opponent_undyne.epiphaNOPE,
                     () => void (speech.emoters.undyne.index = index)
                  );
               }
               break;
            case 'act':
               if (choice.act === 'flirt') {
                  const flirtValue = (volatile.vars.flirts ??= 0);
                  if (world.flirt < 15) {
                     await battler.human(...text.b_opponent_dateundyne.flirtText0);
                     if (flirtValue === 0) {
                        await talk(...text.b_opponent_dateundyne.flirtTalk0);
                        battler.status = () => text.b_opponent_dateundyne.flirtStatus0;
                        idle = false;
                     }
                  } else {
                     await battler.human(
                        ...[
                           text.b_opponent_dateundyne.flirtText1,
                           text.b_opponent_dateundyne.flirtText2,
                           text.b_opponent_dateundyne.flirtText3
                        ][flirtValue]
                     );
                     await talk(
                        ...[
                           text.b_opponent_dateundyne.flirtTalk1,
                           text.b_opponent_dateundyne.flirtTalk2,
                           text.b_opponent_dateundyne.flirtTalk3
                        ][flirtValue]
                     );
                     if (flirtValue === 2) {
                        SAVE.data.b.flirt_undyne = true;
                        volatile.vars.sb = renderer.time;
                        battler.music?.stop();
                        await renderer.pause(1800);
                        endPart = true;
                     } else if (flirtValue === 1) {
                        battler.status = () => text.b_opponent_dateundyne.flirtStatus2;
                     } else {
                        battler.status = () => text.b_opponent_dateundyne.flirtStatus1;
                     }
                     idle = false;
                  }
                  volatile.vars.flirts++;
               }
               break;
         }
         if (endPart) {
            await talk(...text.b_opponent_dateundyne.cutscene1);
            speech.emoters.undyne.index = 11;
            battler.volatile[0].vars.endPart = true;
            await renderer.pause(1500);
            volatile.container.objects[0] = new CosmosSprite({
               objects: [
                  new CosmosSprite({
                     anchor: { x: 0, y: 1 },
                     frames: [ content.ibcUndyneDate ],
                     position: { y: 1 }
                  }),
                  new CosmosAnimation({
                     active: true,
                     anchor: { x: 0, y: 1 },
                     metadata: { part: 'hair' },
                     position: { y: 8 },
                     resources: content.ibcUndyneHair,
                     objects: [
                        (speech.emoters.undyne = new CosmosAnimation({
                           anchor: { x: 0, y: 1 },
                           index: 11,
                           resources: content.ibcUndyneHead,
                           metadata: { part: 'head' }
                        }))
                     ]
                  })
               ]
            });
            await renderer.pause(1000);
            await talk(...text.b_opponent_dateundyne.cutscene2(fought));
            events.fire('exit');
         } else {
            if (idle) {
               await talk(
                  ...[
                     text.b_opponent_dateundyne.idleTalk1,
                     text.b_opponent_dateundyne.idleTalk2,
                     text.b_opponent_dateundyne.idleTalk3,
                     text.b_opponent_dateundyne.idleTalk4
                  ][rng.dialogue.int(4)]
               );
               battler.status = () => text.b_opponent_dateundyne.status1;
            }
            await battler.resume(async () => {
               await battler.box.size.modulate(renderer, 300, { x: 100, y: 65 });
               battler.SOUL.position.set(160);
               battler.SOUL.alpha.value = 1;
               await renderer.pause(450);
               await battler.box.size.modulate(renderer, 300, { x: 282.5, y: 65 });
            });
         }
      },
      sprite: () =>
         new CosmosSprite({
            anchor: { x: 0, y: 1 },
            metadata: { size: { y: 100 }, base: renderer.time },
            objects: [
               new CosmosSprite({
                  anchor: { x: 0, y: 1 },
                  metadata: { part: 'legs' },
                  frames: [ content.ibcUndyneDateLegs ]
               }),
               new CosmosSprite({
                  anchor: { x: 0, y: 1 },
                  metadata: { part: 'torso' },
                  frames: [ content.ibcUndyneDateTorso ]
               }),
               new CosmosAnimation({
                  anchor: { x: 0, y: 1 },
                  metadata: { part: 'arm1' },
                  resources: content.ibcUndyneDateArm
               }),
               new CosmosAnimation({
                  anchor: { x: 0, y: 1 },
                  metadata: { part: 'arm2' },
                  scale: { x: -1 },
                  resources: content.ibcUndyneDateArm
               }),
               new CosmosAnimation({
                  anchor: { x: 0, y: 1 },
                  metadata: { part: 'spear' },
                  resources: content.ibcUndyneDateSpear
               }),
               new CosmosAnimation({
                  active: true,
                  anchor: { x: 0, y: 1 },
                  metadata: { part: 'hair' },
                  position: { y: 27 },
                  resources: content.ibcUndyneHair,
                  objects: [
                     new CosmosAnimation({
                        anchor: { x: 0, y: 1 },
                        resources: content.ibcUndyneHead,
                        metadata: { part: 'head' }
                     })
                  ]
               })
            ]
         }).on('tick', function () {
            const diff = (battler.volatile[0].vars.sb || renderer.time) - this.metadata.base;
            const phase = (diff % 1000) / 1000;
            const siner = CosmosMath.wave(phase);
            const endPart = battler.volatile[0].vars.endPart;
            CosmosUtils.chain(this.objects, (objects, next) => {
               for (const sprite of objects as CosmosSprite[]) {
                  next(sprite.objects);
                  switch (sprite.metadata.part) {
                     case 'hair':
                        sprite.position.y =
                           ((sprite.metadata.baseY ??= sprite.position.y) as number) +
                           CosmosMath.remap(siner, 0, 54 - 54 * 0.88);
                        break;
                     case 'legs':
                        sprite.scale.y = CosmosMath.remap(siner, 1, 0.9);
                        break;
                     case 'torso':
                        sprite.scale.y = CosmosMath.remap(siner, 1, 0.9);
                        break;
                     case 'arm1':
                        if (endPart) {
                           sprite.index = 1;
                        } else {
                           sprite.position.y = CosmosMath.remap(siner, 3, 54 - 54 * 0.85);
                        }
                        break;
                     case 'arm2':
                        if (endPart) {
                           sprite.index = 1;
                        } else {
                           sprite.position.y = CosmosMath.remap(siner, 3, 54 - 54 * 0.85);
                        }
                        break;
                     case 'spear':
                        if (endPart) {
                           sprite.index = 1;
                           if (!sprite.metadata.initfall) {
                              sprite.metadata.initfall = true;
                              sprite.alpha.modulate(renderer, 1000, 0);
                              sprite.position.modulate(renderer, 1000, sprite.position.add(0, 20));
                              sprite.rotation.modulate(renderer, 1000, sprite.rotation.value + 15);
                           }
                        } else if (!battler.volatile[0].vars.sb) {
                           sprite.position.y = CosmosMath.remap(siner, 0, 54 - 54 * 0.9);
                           sprite.rotation.value = sineWaver(this.metadata.base, 1200, -2, 2);
                        }
                        break;
                  }
               }
            });
         })
   })
};

for (const [ key, value ] of Object.entries(opponents)) {
   value.assets.name = `opponents::${key}`;
}

battler.opponentRegistry.register(opponents);

export default opponents;

CosmosUtils.status(`LOAD MODULE: FOUNDRY OPPONENTS (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
