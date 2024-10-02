import commonText from '../../languages/default/text/common';
import text from '../../languages/default/text/outlands';
import { faces, resetBox } from '../common/api';
import commonPatterns from '../common/patterns';
import { content, context, inventories, music, soundRouter, sounds } from '../systems/assets';
import { atlas, events, game, renderer, rng, speech, typer } from '../systems/core';
import {
   battler,
   dropShake,
   fader,
   header,
   oops,
   outlandsKills,
   resetThreshold,
   selectElement,
   world
} from '../systems/framework';
import { OutertaleOpponent } from '../systems/outertale';
import { SAVE } from '../systems/save';
import {
   CosmosAnimation,
   CosmosDaemon,
   CosmosInventory,
   CosmosMath,
   CosmosObject,
   CosmosPoint,
   CosmosRectangle,
   CosmosSprite,
   CosmosUtils,
   CosmosValue
} from '../systems/storyteller';
import patterns from './patterns';

export function torielKillState () {
   switch (SAVE.flag.n.state_toriel) {
      case 0:
         SAVE.flag.n.state_toriel = 1;
         break;
      case 1:
         SAVE.flag.n.state_toriel = 7;
         break;
      case 2:
      case 9:
         SAVE.flag.n.state_toriel = 5;
         break;
      case 3:
         SAVE.flag.n.state_toriel = 4;
         break;
      case 4:
      case 5:
         SAVE.flag.n.state_toriel = 11;
         break;
      case 6:
      case 12:
      case 12.1:
      case 12.2:
      case 12.3:
      case 14:
      case 14.1:
      case 14.2:
      case 14.3:
         SAVE.flag.n.state_toriel = 15;
         break;
      case 8:
      case 8.1:
      case 8.2:
      case 8.3:
         SAVE.flag.n.state_toriel = 10;
         break;
      case 10:
         SAVE.flag.n.state_toriel = 13;
         break;
   }
}

export function torielSpareState () {
   switch (SAVE.flag.n.state_toriel) {
      case 0:
         SAVE.flag.n.state_toriel = 3;
         break;
      case 1:
         SAVE.flag.n.state_toriel = 2;
         break;
      case 2:
      case 6:
         SAVE.flag.n.state_toriel = 12;
         break;
      case 3:
         SAVE.flag.n.state_toriel = 8;
         break;
      case 4:
      case 10:
         SAVE.flag.n.state_toriel = 6;
         break;
      case 5:
      case 11:
      case 11.1:
      case 11.2:
      case 11.3:
      case 13:
      case 13.1:
      case 13.2:
      case 13.3:
         SAVE.flag.n.state_toriel = 15;
         break;
      case 7:
      case 7.1:
      case 7.2:
      case 7.3:
         SAVE.flag.n.state_toriel = 9;
         break;
      case 9:
         SAVE.flag.n.state_toriel = 14;
         break;
   }
}

const opponents = {
   dummy: new OutertaleOpponent({
      flirted: () => SAVE.data.n.state_wastelands_dummy === 6,
      assets: new CosmosInventory(content.ibcDummy, content.ibcDummyHugged, content.asSlidewhistle),
      exp: 0,
      hp: 1,
      df: 0,
      ghost: true,
      name: () => commonText.b_opponent_dummy.name,
      acts: () => [
         [ 'check', commonText.b_opponent_dummy.act_check ],
         [ 'talk', commonText.b_opponent_dummy.act_talk ],
         [ 'hug', commonText.b_opponent_dummy.act_hug ],
         [ 'slap', commonText.b_opponent_dummy.act_slap ],
         [ 'flirt', commonText.b_opponent_dummy.act_flirt ]
      ],
      sparable: false,
      async handler (choice, target, volatile) {
         volatile.vars.hugs || (volatile.vars.hugs = 0);
         volatile.vars.slaps || (volatile.vars.slaps = 0);
         volatile.vars.turns || (volatile.vars.turns = 0);
         let humantext = [] as string[];
         switch (choice.type) {
            case 'fight':
               SAVE.data.n.state_wastelands_dummy = 1;
               await battler.attack(volatile, { operation: 'multiply', power: 0 }, true, true);
               volatile.vars.slaps = 3;
               break;
            case 'flee':
               SAVE.data.n.state_wastelands_dummy = 2;
               events.fire('escape');
               battler.music?.stop();
               return;
            case 'act':
               switch (choice.act) {
                  case 'talk':
                     volatile.sparable = true;
                     SAVE.data.n.state_wastelands_dummy = 0;
                     break;
                  case 'flirt':
                     volatile.sparable = true;
                     SAVE.data.n.state_wastelands_dummy = 6;
                     break;
                  case 'hug':
                     if (++volatile.vars.hugs === 3) {
                        volatile.sparable = true;
                        volatile.container.objects[0].frames = [ content.ibcDummyHugged ];
                        humantext = commonText.b_opponent_dummy.hugged;
                        SAVE.data.n.state_wastelands_dummy = 4;
                     }
                     break;
                  case 'slap':
                     if (++volatile.vars.slaps === 3) {
                        humantext = commonText.b_opponent_dummy.slapped;
                     }
                     break;
               }
               break;
         }
         if (
            (choice.type !== 'act' || ![ 'talk', 'flirt' ].includes(choice.act)) &&
            volatile.vars.slaps < 3 &&
            volatile.vars.hugs < 3 &&
            ++volatile.vars.turns === 10
         ) {
            volatile.sparable = true;
            humantext = commonText.b_opponent_dummy.bored;
            SAVE.data.n.state_wastelands_dummy = 3;
         }
         humantext.length > 0 && (await battler.human(...humantext));
         if (volatile.vars.slaps === 3) {
            oops();
            battler.music?.stop();
            SAVE.data.n.state_wastelands_dummy === 1 || (SAVE.data.n.state_wastelands_dummy = 5);
            sounds.slidewhistle.instance(renderer);
            await volatile.container.position.modulate(renderer, 1250, {
               x: volatile.container.position.x,
               y: -80
            });
            await renderer.pause(650);
            volatile.sparable = true;
         }
         if (volatile.sparable) {
            battler.music?.stop();
            events.fire('exit');
         } else {
            await battler.monster(
               false,
               volatile.container.position.add(40, -2),
               battler.bubbles.dummy,
               ...commonText.b_opponent_dummy.talk
            );
            battler.status = [
               () => commonText.b_opponent_dummy.status2,
               () => commonText.b_opponent_dummy.status3,
               () => commonText.b_opponent_dummy.status4
            ][rng.dialogue.int(3)];
            battler.resume();
         }
      },
      sprite: () => new CosmosSprite({ frames: [ content.ibcDummy ] })
   }),
   froggit: new OutertaleOpponent({
      flirted: () => SAVE.data.b.flirt_froggit,
      assets: new CosmosInventory(
         content.ibcFroggitGone,
         content.ibcFroggitHead,
         content.ibcFroggitLegs,
         content.ibbFroglegs,
         content.ibbFrogfly,
         content.asTwinklyHurt,
         content.ibbFrogstop,
         content.ibbLily,
         content.ibbTongue,
         content.ibbHypno
      ),
      bullied: () => SAVE.data.b.bullied_froggit,
      bullyable: true,
      bully: () => {
         SAVE.data.b.bullied_froggit = true;
         world.bully();
      },
      exp: 3,
      hp: 30,
      df: 4,
      g: 4,
      name: () => text.b_opponent_froggit.name,
      metadata: { automusic: true },
      acts: () => [
         [
            'check',
            v =>
               battler.hurt.includes(v)
                  ? v.flirted
                     ? text.b_opponent_froggit.act_check4
                     : text.b_opponent_froggit.act_check3
                  : v.sparable
                  ? v.flirted
                     ? text.b_opponent_froggit.act_check5
                     : text.b_opponent_froggit.act_check2
                  : text.b_opponent_froggit.act_check
         ],
         [ 'compliment', text.b_opponent_froggit.act_compliment ],
         [ 'translate', [] ],
         [ 'flirt', text.b_opponent_froggit.act_flirt ],
         [ 'threaten', v => (v.vars.afraid ? text.b_opponent_froggit.act_threat2 : text.b_opponent_froggit.act_threat) ]
      ],
      hurt: sounds.twinklyHurt,
      sparable: false,
      async handler (choice, target, volatile) {
         let monstertext = [
            text.b_opponent_froggit.idleText1,
            text.b_opponent_froggit.idleText2,
            text.b_opponent_froggit.idleText3,
            text.b_opponent_froggit.idleText4
         ];
         async function doIdle () {
            await battler.monster(
               false,
               volatile.container.position.add(22, -54),
               battler.bubbles.dummy,
               ...selectElement(monstertext)
            );
         }
         if (choice.type === 'none') {
            await doIdle();
            return;
         }
         let statustext = [
            () => text.b_opponent_froggit.status2,
            () => text.b_opponent_froggit.status3,
            () => text.b_opponent_froggit.status4
         ];
         const sparing = battler.sparing(choice);
         let idler = null as Promise<void> | null;
         choice.type === 'fight' || choice.type === 'act' || sparing || (idler = battler.idle(volatile));
         switch (choice.type) {
            case 'fight':
               if (
                  await battler.attack(
                     volatile,
                     volatile.sparable ? { power: 0, operation: 'multiply' } : { power: choice.score }
                  )
               ) {
                  world.kill();
                  await battler.idle(volatile);
                  return;
               }
               idler = battler.idle(volatile);
               break;
            case 'act':
               if (choice.act === 'translate') {
                  switch (volatile.vars.lastact) {
                     case 'threaten':
                        if (volatile.vars.afraid || battler.hurt.includes(volatile)) {
                           await battler.human(...text.b_opponent_froggit.act_translate1y);
                           oops();
                           volatile.sparable = true;
                           battler.spare(target);
                           return;
                        } else if (world.population < 15 || volatile.hp < volatile.opponent.hp) {
                           volatile.sparable = true;
                           volatile.vars.afraid = true;
                           await battler.human(...text.b_opponent_froggit.act_translate1x);
                           monstertext = [ text.b_opponent_froggit.meanText ];
                        } else {
                           await battler.human(...text.b_opponent_froggit.act_translate1z);
                        }
                        break;
                     case 'compliment':
                        SAVE.data.b.spared_froggit = true;
                        volatile.sparable = true;
                        await battler.human(...text.b_opponent_froggit.act_translate1);
                        monstertext = [ text.b_opponent_froggit.niceText ];
                        break;
                     case 'flirt':
                        SAVE.data.b.flirt_froggit = true;
                        SAVE.data.b.spared_froggit = true;
                        volatile.flirted = true;
                        volatile.sparable = true;
                        await battler.human(...text.b_opponent_froggit.act_translate2);
                        monstertext = [ text.b_opponent_froggit.flirtText ];
                        break;
                     default:
                        await battler.human(...text.b_opponent_froggit.act_translate0);
                        break;
                  }
               }
               sparing || (idler = battler.idle(volatile));
               volatile.vars.lastact = choice.act;
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
         choice.type !== 'act' && (volatile.vars.lastact = void 0);
         sparing || (await doIdle());
         if (volatile.sparable) {
            statustext = [ () => text.b_opponent_froggit.mercyStatus ];
         } else if (battler.hurt.includes(volatile)) {
            statustext = [ () => text.b_opponent_froggit.perilStatus ];
         }
         battler.status = selectElement(statustext);
         await idler;
      },
      goodbye: () =>
         new CosmosSprite({
            anchor: { y: 1, x: 0 },
            frames: [ content.ibcFroggitGone ]
         }),
      sprite: () =>
         new CosmosAnimation({
            active: true,
            anchor: { y: 1, x: 0 },
            metadata: { size: { y: 55 } },
            resources: content.ibcFroggitLegs,
            objects: [
               new CosmosAnimation({
                  active: true,
                  position: { x: -2, y: -20 },
                  anchor: { y: 1, x: 0 },
                  metadata: { dir: 0 },
                  resources: content.ibcFroggitHead
               }).on('tick', function () {
                  const destie = this.position.endpoint(this.metadata.dir * 90 + 45, 1 / 20);
                  if (destie.extentOf({ x: -2, y: -20 }) > 1.5 + (Math.random() - 0.5) * 2 * 1) {
                     if (this.metadata.dir++ === 3) {
                        this.metadata.dir = 0;
                     }
                  } else {
                     this.position = destie;
                  }
               })
            ]
         }).on('tick', function () {
            if (this.index === 0 && Math.random() < 1 / 30 / 10) {
               this.index = 1;
               renderer.pause(650).then(() => {
                  this.index = 0;
               });
            }
         })
   }),
   whimsun: new OutertaleOpponent({
      flirted: () => SAVE.data.b.flirt_whimsun,
      assets: new CosmosInventory(content.ibcWhimsun, content.ibcWhimsunHit, content.ibbStarfly),
      bullied: () => SAVE.data.b.bullied_whimsun,
      bullyable: true,
      bully: () => {
         SAVE.data.b.bullied_whimsun = true;
         world.bully();
      },
      exp: 2,
      hp: 10,
      df: 0,
      name: () => text.b_opponent_whimsun.name,
      metadata: { automusic: true },
      acts: () => [
         [
            'check',
            v => (battler.hurt.includes(v) ? text.b_opponent_whimsun.act_check2 : text.b_opponent_whimsun.act_check)
         ],
         [ 'boost', text.b_opponent_whimsun.act_console ],
         [ 'terrorize', [] ],
         [ 'flirt', text.b_opponent_whimsun.act_flirt ]
      ],
      g: 2,
      async handler (choice, target, volatile) {
         const monstertext = [
            text.b_opponent_whimsun.idleTalk1,
            text.b_opponent_whimsun.idleTalk2,
            text.b_opponent_whimsun.idleTalk3,
            text.b_opponent_whimsun.idleTalk4,
            text.b_opponent_whimsun.idleTalk5
         ];
         async function doIdle () {
            await battler.monster(
               false,
               volatile.container.position.add(44 - 20, -44),
               battler.bubbles.dummy,
               ...selectElement(monstertext)
            );
         }
         if (choice.type === 'none') {
            await doIdle();
            return;
         }
         let statustext = [
            () => text.b_opponent_whimsun.status2,
            () => text.b_opponent_whimsun.status3,
            () => text.b_opponent_whimsun.status4,
            () => text.b_opponent_whimsun.status5,
            () => text.b_opponent_whimsun.status6
         ];
         const sparing = battler.sparing(choice);
         let idler = null as Promise<void> | null;
         switch (choice.type) {
            case 'fight':
               if (
                  await battler.attack(
                     volatile,
                     volatile.sparable ? { power: 0, operation: 'multiply' } : { power: choice.score }
                  )
               ) {
                  world.kill();
                  await battler.idle(volatile);
                  return;
               }
               idler = battler.idle(volatile);
               break;
            case 'act':
               switch (choice.act) {
                  case 'boost':
                     SAVE.data.b.spared_whimsun = true;
                     volatile.sparable = true;
                     battler.spare(target);
                     return;
                  case 'flirt':
                     SAVE.data.b.flirt_whimsun = true;
                     volatile.flirted = true;
                     SAVE.data.b.spared_whimsun = true;
                     volatile.sparable = true;
                     battler.spare(target);
                     return;
                  case 'terrorize':
                     await battler.human(...text.b_opponent_whimsun.act_terrorize);
                     oops();
                     volatile.sparable = true;
                     battler.spare(target);
                     return;
                  default:
                     idler = battler.idle(volatile);
                     break;
               }
               break;
            case 'spare':
               if (battler.bullied.includes(volatile)) {
                  return;
               } else if (!volatile.sparable) {
                  sparing || (idler = battler.idle(volatile));
                  break;
               }
            case 'flee':
               return;
            default:
               idler = battler.idle(volatile);
               break;
         }
         sparing || (await doIdle());
         if (battler.hurt.includes(volatile)) {
            statustext = [ () => text.b_opponent_whimsun.perilStatus ];
         }
         battler.status = selectElement(statustext);
         await idler;
      },
      goodbye: () =>
         new CosmosSprite({
            anchor: { x: 0, y: 1 },
            frames: [ content.ibcWhimsunHit ]
         }),
      sprite () {
         let direction = -1;
         let elevation = 0.5;
         return new CosmosAnimation({ active: true, anchor: { x: 0, y: 1 }, resources: content.ibcWhimsun }).on(
            'tick',
            function () {
               this.position.y = (elevation += direction / (30 * 2)) * 12;
               if (elevation < 0 || elevation > 1) {
                  direction *= -1;
               }
            }
         );
      }
   }),
   migosp: new OutertaleOpponent({
      flirted: () => SAVE.data.b.flirt_migosp,
      assets: new CosmosInventory(
         content.ibcMigosp,
         content.ibcMigospHit,
         content.ibcMigospHappi,
         content.ibbFrogfly,
         content.ibbRoachfly,
         content.ibbMigosp,
         content.asStab
      ),
      bullied: () => SAVE.data.b.bullied_migosp,
      bullyable: true,
      bully: () => {
         SAVE.data.b.bullied_migosp = true;
         world.bully();
      },
      exp: 5,
      hp: 40,
      df: 4,
      g: 3,
      name: () => text.b_opponent_migosp.name,
      metadata: { automusic: true },
      acts: () => [
         [
            'check',
            v =>
               battler.hurt.includes(v)
                  ? text.b_opponent_migosp.act_check4
                  : battler.alive.length > 1
                  ? text.b_opponent_migosp.act_check
                  : v.flirted
                  ? text.b_opponent_migosp.act_check3
                  : text.b_opponent_migosp.act_check2
         ],
         [ 'flirt', text.b_opponent_migosp.act_flirt ],
         [
            'insult',
            () => (battler.alive.length > 1 ? text.b_opponent_migosp.groupInsult : text.b_opponent_migosp.soloInsult)
         ]
      ],
      sparable: false,
      handler: battler.opponentHandler({
         kill: () => world.kill(),
         defaultTalk: () =>
            battler.alive.length > 1
               ? [
                    text.b_opponent_migosp.groupTalk1,
                    text.b_opponent_migosp.groupTalk2,
                    text.b_opponent_migosp.groupTalk3,
                    text.b_opponent_migosp.groupTalk4,
                    text.b_opponent_migosp.groupTalk5,
                    text.b_opponent_migosp.groupTalk6
                 ]
               : [
                    text.b_opponent_migosp.soloTalk1,
                    text.b_opponent_migosp.soloTalk2,
                    text.b_opponent_migosp.soloTalk3,
                    text.b_opponent_migosp.soloTalk4,
                    text.b_opponent_migosp.soloTalk5
                 ],
         bubble: pos => [ pos.add(17, -54), battler.bubbles.dummy ],
         defaultStatus: state =>
            battler.hurt.includes(state.volatile)
               ? () => text.b_opponent_migosp.perilStatus
               : battler.alive.length > 1
               ? [ () => text.b_opponent_migosp.groupStatus1, () => text.b_opponent_migosp.groupStatus2 ]
               : () => text.b_opponent_migosp.soloStatus,
         act: {
            flirt (state) {
               if (battler.alive.length === 1) {
                  SAVE.data.b.flirt_migosp = true;
                  state.volatile.flirted = true;
                  state.talk = text.b_opponent_migosp.flirtTalk;
               }
            }
         },
         postact (state, act) {
            if (battler.alive.length === 1 && (act === 'talk' || act === 'flirt')) {
               SAVE.data.b.spared_migosp = true;
               state.pacify = true;
            }
         },
         pretalk ({ volatile }) {
            battler.alive.length === 1 &&
               (volatile.container.objects[0] as CosmosAnimation).use(content.ibcMigospHappi).enable();
         }
      }),
      goodbye: () =>
         new CosmosSprite({
            anchor: { x: 0, y: 1 },
            frames: [ content.ibcMigospHit ]
         }),
      sprite: volatile => {
         return new CosmosAnimation({
            anchor: { x: 0, y: 1 },
            resources: volatile.sparable ? content.ibcMigospHappi : content.ibcMigosp,
            active: volatile.sparable
         }).on('tick', function () {
            if (this.resources === content.ibcMigosp && this.index === 0 && Math.random() < 1 / 30 / 3) {
               this.index = Math.floor(Math.random() * 2) + 1;
               renderer.pause(100 + CosmosMath.bezier(Math.random(), 0, 0, 750, 750)).then(() => {
                  this.index = 0;
               });
            }
         });
      }
   }),
   loox: new OutertaleOpponent({
      flirted: () => SAVE.data.b.flirt_loox,
      assets: new CosmosInventory(
         content.ibcLooxBody,
         content.ibcLooxHit,
         content.ibbCircle1,
         content.ibbCircle2,
         content.ibbCircle3,
         content.ibbToothtop,
         content.ibbToothbot,
         content.asStab,
         content.asBurst
      ),
      exp: 7,
      hp: 50,
      df: 4,
      g: 5,
      name: () => text.b_opponent_loox.name,
      metadata: { automusic: true },
      acts: () => [
         [
            'check',
            v =>
               v.sparable
                  ? text.b_opponent_loox.act_check3
                  : v.flirted
                  ? text.b_opponent_loox.act_check2
                  : text.b_opponent_loox.act_check
         ],
         [ 'stare', text.b_opponent_loox.act_dontpick ],
         [ 'annoy', text.b_opponent_loox.act_pick ],
         [ 'flirt', text.b_opponent_loox.act_flirt ]
      ],
      sparable: false,
      async handler (choice, target, volatile) {
         let monstertext = [
            text.b_opponent_loox.idleTalk1,
            text.b_opponent_loox.idleTalk2,
            text.b_opponent_loox.idleTalk3,
            text.b_opponent_loox.idleTalk4
         ];
         async function doIdle () {
            await battler.monster(
               false,
               volatile.container.position.add(23, -54),
               battler.bubbles.dummy,
               ...selectElement(monstertext)
            );
         }
         if (choice.type === 'none') {
            await doIdle();
            return;
         }
         let statustext = [
            () => text.b_opponent_loox.status2,
            () => text.b_opponent_loox.status3,
            () => text.b_opponent_loox.status4,
            () => text.b_opponent_loox.status5,
            () => text.b_opponent_loox.status6
         ];
         const sparing = battler.sparing(choice);
         let idler = null as Promise<void> | null;
         choice.type === 'fight' || sparing || (idler = battler.idle(volatile));
         switch (choice.type) {
            case 'fight':
               if (
                  await battler.attack(
                     volatile,
                     volatile.sparable ? { power: 0, operation: 'multiply' } : { power: choice.score }
                  )
               ) {
                  world.kill();
                  await battler.idle(volatile);
                  return;
               }
               idler = battler.idle(volatile);
               break;
            case 'act':
               switch (choice.act) {
                  case 'flirt':
                     SAVE.data.b.flirt_loox = true;
                     volatile.flirted = true;
                     if (volatile.vars.locked) {
                        monstertext = [ text.b_opponent_loox.flirtDeny1 ];
                     } else {
                        monstertext = [ text.b_opponent_loox.flirtTalk1 ];
                     }
                     break;
                  case 'annoy':
                     volatile.vars.locked = true;
                     monstertext = [ text.b_opponent_loox.pickTalk1 ];
                     break;
                  case 'stare':
                     SAVE.data.b.spared_loox = true;
                     volatile.sparable = true;
                     if (volatile.vars.locked) {
                        volatile.vars.locked = false;
                        monstertext = [ text.b_opponent_loox.dontDeny1 ];
                     } else {
                        monstertext = [ text.b_opponent_loox.dontTalk1 ];
                     }
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
         sparing || (await doIdle());
         if (volatile.sparable) {
            statustext = [ () => text.b_opponent_loox.spareStatus ];
         } else if (battler.hurt.includes(volatile)) {
            statustext = [ () => text.b_opponent_loox.hurtStatus ];
         }
         battler.status = selectElement(statustext);
         await idler;
      },
      goodbye: () =>
         new CosmosSprite({
            anchor: { x: 0, y: 1 },
            frames: [ content.ibcLooxHit ]
         }),
      sprite: () =>
         new CosmosAnimation({
            active: true,
            anchor: { x: 0, y: 1 },
            resources: content.ibcLooxBody
         })
   }),
   mushy: new OutertaleOpponent({
      flirted: () => SAVE.data.b.flirt_mushy,
      assets: new CosmosInventory(
         content.ibcMushyBody,
         content.ibcMushyHit,
         content.ibbLiteralBullet,
         content.ibbCrosshair,
         content.asNode
      ),
      bullied: () => SAVE.data.b.bullied_mushy,
      bullyable: true,
      bully: () => {
         SAVE.data.b.bullied_mushy = true;
         world.bully();
      },
      exp: 6,
      hp: 72,
      df: 0,
      g: 7,
      name: () => text.b_opponent_mushy.name,
      acts: () => [
         [
            'check',
            v =>
               v.sparable
                  ? text.b_opponent_mushy.act_check3
                  : v.flirted
                  ? text.b_opponent_mushy.act_check2
                  : text.b_opponent_mushy.act_check
         ],
         [ 'challenge', text.b_opponent_mushy.act_challenge ],
         [ 'taunt', text.b_opponent_mushy.act_taunt ],
         [ 'flirt', text.b_opponent_mushy.act_flirt ]
      ],
      sparable: false,
      async handler (choice, target, volatile) {
         let monstertext = [
            text.b_opponent_mushy.idleTalk1,
            text.b_opponent_mushy.idleTalk2,
            text.b_opponent_mushy.idleTalk3
         ];
         async function doIdle () {
            await battler.monster(
               false,
               volatile.container.position.add(22, -54),
               battler.bubbles.dummy,
               ...selectElement(monstertext)
            );
         }
         if (choice.type === 'none') {
            await doIdle();
            return;
         }
         volatile.vars.challenge || (volatile.vars.challenge = 0);
         let statustext = [] as (() => string[])[];
         const sparing = battler.sparing(choice);
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
                  case 'taunt':
                     monstertext = [ text.b_opponent_mushy.tauntTalk1 ];
                     statustext = [ () => text.b_opponent_mushy.tauntStatus1 ];
                     break;
                  case 'flirt':
                     SAVE.data.b.flirt_mushy = true;
                     volatile.flirted = true;
                     monstertext = [ text.b_opponent_mushy.flirtTalk1 ];
                     statustext = [ () => text.b_opponent_mushy.flirtStatus1 ];
                     break;
                  case 'challenge':
                     const challengeValue = ++volatile.vars.challenge;
                     if (challengeValue < 2) {
                        monstertext = [ text.b_opponent_mushy.challengeTalk1 ];
                        statustext = [ () => text.b_opponent_mushy.challengeStatus ];
                     } else {
                        SAVE.data.b.spared_mushy = true;
                        monstertext = [ text.b_opponent_mushy.challengeTalk2 ];
                        statustext = [ () => text.b_opponent_mushy.spareStatus ];
                        volatile.sparable = true;
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
         sparing || (await doIdle());
         if (statustext.length === 0) {
            if (battler.hurt.includes(volatile)) {
               statustext = [ () => text.b_opponent_mushy.hurtStatus ];
            } else {
               statustext = [
                  () => text.b_opponent_mushy.status2,
                  () => text.b_opponent_mushy.status3,
                  () => text.b_opponent_mushy.status4,
                  () => text.b_opponent_mushy.status5
               ];
            }
         }
         battler.status = selectElement(statustext);
      },
      goodbye: () =>
         new CosmosSprite({
            anchor: { x: 0, y: 1 },
            frames: [ content.ibcMushyHit ]
         }),
      sprite (volatile) {
         let spinning = false;
         const spinchance = volatile.sparable ? 1 / 30 / 2 : 1 / 30 / 20;
         return new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcMushyBody ] }).on('tick', function () {
            if (!spinning && Math.random() < spinchance) {
               spinning = true;
               this.scale.modulate(renderer, 150, { x: -1, y: 1 }).then(async () => {
                  await renderer.pause(100);
                  await this.scale.modulate(renderer, 150, { x: 1, y: 1 });
                  spinning = false;
               });
            }
         });
      }
   }),
   napstablook: new OutertaleOpponent({
      flirted: () => SAVE.data.n.state_wastelands_napstablook === 1,
      assets: new CosmosInventory(
         content.ibcNapstablookBattle,
         content.ibcNapstablookSad,
         content.ibcNapstablookHat,
         content.ibbTear,
         content.avNapstablook,
         content.ibbFrogstar
      ),
      hp: 88,
      df: 4,
      name: () => text.b_opponent_napstablook.name,
      acts: () => [
         [
            'check',
            v =>
               v.vars.sour
                  ? text.b_opponent_napstablook.act_check2
                  : v.vars.cheer === 3
                  ? text.b_opponent_napstablook.act_check3
                  : v.vars.flirt === 3
                  ? text.b_opponent_napstablook.act_check4
                  : text.b_opponent_napstablook.act_check
         ],
         [ 'flirt', [] ],
         [ 'threaten', [] ],
         [ 'cheer', [] ]
      ],
      sparable: false,
      ghost: true,
      metadata: { nootexempt: true },
      async handler (choice, target, volatile) {
         volatile.vars.talk || (volatile.vars.talk = 0);
         volatile.vars.cheer || (volatile.vars.cheer = 0);
         volatile.vars.flirt || (volatile.vars.flirt = 0);
         volatile.vars.mercy || (volatile.vars.mercy = 0);
         volatile.vars.turns || (volatile.vars.turns = 0);
         volatile.vars.sourTurns || (volatile.vars.sourTurns = 0);
         volatile.vars.restoreMercy || (volatile.vars.restoreMercy = 0);
         let humantext = [] as string[];
         let monstertext = [] as string[][];
         let statustext = [] as (() => string[])[];
         let doCry = false;
         let doHat = false;
         switch (choice.type) {
            case 'act':
               switch (choice.act) {
                  case 'check':
                     if (volatile.vars.sour) {
                        monstertext = [ text.b_opponent_napstablook.silentTalk ];
                     } else {
                        monstertext = [ text.b_opponent_napstablook.checkTalk ];
                     }
                     break;
                  case 'threaten':
                     if (volatile.vars.hat) {
                        humantext = text.b_opponent_napstablook.suck;
                     } else {
                        humantext = text.b_opponent_napstablook.threat;
                     }
                     if (volatile.vars.sour) {
                        monstertext = [
                           text.b_opponent_napstablook.insultTalk2,
                           text.b_opponent_napstablook.insultTalk3,
                           text.b_opponent_napstablook.insultTalk4
                        ];
                        volatile.vars.restoreMercy = 2;
                     } else {
                        volatile.vars.sour = true;
                        doCry = true;
                        monstertext = [ text.b_opponent_napstablook.insultTalk1 ];
                        volatile.vars.restoreMercy = 1;
                        volatile.vars.cheer = 0;
                        volatile.vars.flirt = 0;
                     }
                     break;
                  case 'cheer':
                     if (volatile.vars.sour) {
                        humantext = text.b_opponent_napstablook.cheer0;
                        monstertext = [
                           text.b_opponent_napstablook.consoleTalk1,
                           text.b_opponent_napstablook.consoleTalk2,
                           text.b_opponent_napstablook.consoleTalk3
                        ];
                        if (volatile.vars.restoreMercy-- === 0) {
                           volatile.vars.sour = false;
                           volatile.vars.sourTurns = 0;
                        }
                     } else {
                        const cheerValue = volatile.vars.cheer++;
                        if (cheerValue === 3) {
                           volatile.sparable = true;
                           doCry = true;
                           SAVE.data.n.state_wastelands_napstablook = 0;
                        } else {
                           cheerValue === 2 && (doHat = true);
                           humantext = [
                              text.b_opponent_napstablook.cheer1,
                              text.b_opponent_napstablook.cheer2,
                              [],
                              text.b_opponent_napstablook.cheer3
                           ][cheerValue];
                           statustext = [
                              [
                                 () => text.b_opponent_napstablook.status2,
                                 () => text.b_opponent_napstablook.status3,
                                 () => text.b_opponent_napstablook.status3a
                              ][cheerValue]
                           ];
                        }
                        monstertext = [
                           [
                              text.b_opponent_napstablook.cheerTalk1,
                              text.b_opponent_napstablook.cheerTalk2,
                              text.b_opponent_napstablook.cheerTalk3,
                              text.b_opponent_napstablook.cheerTalk4
                           ][cheerValue]
                        ];
                     }
                     break;
                  case 'flirt':
                     const flirtValue = volatile.vars.flirt++;
                     if (volatile.vars.hat) {
                        doCry = true;
                        volatile.sparable = true;
                        humantext = text.b_opponent_napstablook.sincere;
                        monstertext = [ text.b_opponent_napstablook.sincereTalk ];
                        SAVE.data.n.state_wastelands_napstablook = flirtValue > 2 ? 1 : 0;
                        break;
                     } else {
                        humantext = [
                           text.b_opponent_napstablook.flirt1,
                           text.b_opponent_napstablook.flirt2,
                           text.b_opponent_napstablook.flirt3,
                           text.b_opponent_napstablook.flirt4
                        ][Math.min(flirtValue, 3)];
                     }
                     if (volatile.vars.sour) {
                        if (volatile.vars.sourTurns < 2) {
                           volatile.sparable = true;
                           monstertext = [ text.b_opponent_napstablook.awkwardTalk ];
                           SAVE.data.n.state_wastelands_napstablook = 3;
                        } else {
                           monstertext = [ text.b_opponent_napstablook.silentTalk ];
                        }
                     } else {
                        monstertext = [
                           [
                              text.b_opponent_napstablook.flirtTalk1,
                              text.b_opponent_napstablook.flirtTalk2,
                              text.b_opponent_napstablook.flirtTalk3,
                              text.b_opponent_napstablook.flirtTalk4
                           ][flirtValue]
                        ];
                        if (flirtValue < 3) {
                           statustext = [
                              [
                                 () => text.b_opponent_napstablook.status4,
                                 () => text.b_opponent_napstablook.status5,
                                 () => text.b_opponent_napstablook.status5a
                              ][flirtValue]
                           ];
                        } else {
                           volatile.sparable = true;
                           SAVE.data.n.state_wastelands_napstablook = 1;
                        }
                     }
                     break;
               }
               break;
            case 'fight':
               if (
                  (!volatile.vars.sour || volatile.vars.restoreMercy === 0) &&
                  (volatile.vars.cheer > 2 || volatile.vars.flirt > 2)
               ) {
                  doCry = true;
                  volatile.vars.sour = true;
                  monstertext = [ text.b_opponent_napstablook.insultTalk1 ];
                  volatile.vars.cheer = 0;
                  volatile.vars.flirt = 0;
               } else {
                  monstertext = [
                     text.b_opponent_napstablook.idleTalk1,
                     text.b_opponent_napstablook.idleTalk2,
                     text.b_opponent_napstablook.idleTalk3
                  ];
               }
               if (volatile.vars.sour) {
                  volatile.vars.restoreMercy = 2;
               }
               if (await battler.attack(volatile, { power: choice.score }, true, true)) {
                  volatile.sparable = true;
                  monstertext = [ text.b_opponent_napstablook.deadTalk ];
                  if (volatile.vars.sour) {
                     SAVE.data.n.state_wastelands_napstablook = 2;
                  } else {
                     SAVE.data.n.state_wastelands_napstablook = 4;
                  }
               }
               break;
            case 'spare':
            case 'item':
            case 'fake':
               monstertext = [
                  text.b_opponent_napstablook.idleTalk1,
                  text.b_opponent_napstablook.idleTalk2,
                  text.b_opponent_napstablook.idleTalk3
               ];
               break;
         }
         await battler.human(...humantext);
         if (volatile.sparable) {
            battler.music?.stop();
         }
         if (volatile.vars.hat && (choice.type === 'fight' || (choice.type === 'act' && choice.act === 'threaten'))) {
            const list = volatile.container.objects[0].objects;
            list.splice(list.indexOf(volatile.vars.hat), 1);
            volatile.vars.hat = null;
         }
         if (doHat) {
            let stop = false;
            header('x1').then(async () => {
               await CosmosUtils.chain<void, Promise<void>>(void 0, async (x, next) => {
                  commonPatterns.napstablook(3);
                  await renderer.pause(500);
                  stop || (await next());
               });
            });
            header('x2').then(async () => {
               const hat = (volatile.vars.hat = new CosmosAnimation({
                  active: true,
                  anchor: { y: 1, x: 0 },
                  position: { x: 10, y: -72 },
                  scale: { x: 1, y: 1 },
                  resources: content.ibcNapstablookHat
               }));
               volatile.container.objects[0].attach(hat);
               await CosmosUtils.chain<void, Promise<void>>(void 0, async (x, next) => {
                  await renderer.on('tick');
                  hat.index < 5 && (await next());
               });
               hat.disable();
            });
            header('x3').then(() => {
               stop = true;
            });
         }
         if (volatile.vars.sour) {
            volatile.vars.sourTurns++;
            statustext = [
               () => text.b_opponent_napstablook.status8,
               () => text.b_opponent_napstablook.status9,
               () => text.b_opponent_napstablook.status10
            ];
         }
         doCry && commonPatterns.napstablook(4);
         typer.magic = battler.ghost_magic;
         monstertext.length > 0 &&
            (await battler.monster(
               false,
               { x: 385 / 2, y: 85 / 2 },
               battler.bubbles.napstablook,
               ...selectElement(monstertext)
            ));
         typer.magic = '';
         if (volatile.sparable) {
            events.fire('exit');
         } else {
            statustext.length > 0 ||
               (statustext = [
                  () => text.b_opponent_napstablook.status6,
                  () => text.b_opponent_napstablook.status7,
                  () => text.b_opponent_napstablook.status8
               ]);
            battler.status = selectElement(statustext);
            if (volatile.vars.hat) {
               battler.resume();
            } else {
               await battler.box.size.modulate(renderer, 300, { x: 120, y: 65 });
               battler.SOUL.position.set(160);
               battler.resume(async () => {
                  battler.SOUL.alpha.value = 1;
                  const turn = volatile.vars.turns++;
                  if (turn === 1 || (turn > 1 && rng.pattern.next() < 0.3)) {
                     await commonPatterns.napstablook(0);
                  } else {
                     await commonPatterns.napstablook(turn === 0 ? 1 : rng.pattern.next() < 0.3 ? 2 : 1);
                  }
                  battler.SOUL.alpha.value = 0;
                  await battler.box.size.modulate(renderer, 300, { x: 282.5, y: 65 });
               });
            }
         }
      },
      sprite (volatile) {
         const time = renderer.time;
         const blookyPositionY = new CosmosValue();
         return new CosmosAnimation({
            active: true,
            anchor: { y: 1, x: 0 },
            resources: content.ibcNapstablookBattle,
            objects: volatile.vars.quickhat ? [ volatile.vars.quickhat ] : []
         }).on('tick', function () {
            this.position.y = blookyPositionY.value - CosmosMath.wave(((renderer.time - time) % 4000) / 4000) * 4;
         });
      }
   }),
   finalghost: new OutertaleOpponent({
      flirted: () => SAVE.data.n.state_wastelands_dummy === 6,
      assets: new CosmosInventory(content.ibcDummyFinalghost),
      sprite () {
         const time = renderer.time;
         const blookyPositionY = new CosmosValue();
         return new CosmosAnimation({
            active: true,
            anchor: { y: 1, x: 0 },
            resources: content.ibcDummyFinalghost
         }).on('tick', function () {
            this.position.y = blookyPositionY.value - CosmosMath.wave(((renderer.time - time) % 4000) / 4000) * 4;
         });
      }
   }),
   toriel: new OutertaleOpponent({
      flirted: () => SAVE.data.b.cell_flirt,
      dramatic: true,
      assets: new CosmosInventory(
         content.ibcTorielBattle1,
         content.ibcTorielBattle2,
         content.ibuBossSOUL,
         content.ibuBossbreak,
         content.ibuBossshatter,
         content.asTwinklyLaugh,
         content.asLanding,
         content.avTwinkly1,
         content.idcTwinklyCapping,
         content.idcTwinklyLaugh,
         content.ibuBubbleTwinkly,
         content.avAsriel2,
         content.idcAsrielEvil,
         content.idcAsrielEvilClosed,
         content.idcAsrielPlain,
         content.idcAsrielPlainClosed,
         content.idcAsrielSmirk,
         content.ibcAsrielCutscene1,
         content.asCymbal,
         content.ibbPaw,
         content.ibbPawInverted,
         content.ibbFirebol,
         content.ibuMercydud,
         content.ibcAsrielMagic,
         content.asSword,
         content.asBomb,
         content.asSavior,
         content.asShatter
      ),
      exp: 0,
      hp: 440,
      df: 1,
      name: () => text.b_opponent_toriel.name,
      acts: () => [
         [
            'check',
            v =>
               v.vars.vulnerable
                  ? text.b_opponent_toriel.act_check4
                  : SAVE.data.n.hp <= 4
                  ? text.b_opponent_toriel.act_check3
                  : 3 <= SAVE.data.n.cell_insult
                  ? text.b_opponent_toriel.act_check2
                  : SAVE.data.b.cell_flirt && 5 <= world.flirt && v.hp === v.opponent.hp
                  ? text.b_opponent_toriel.act_check5
                  : text.b_opponent_toriel.act_check
         ],
         [ 'talk', [] ]
      ],
      metadata: { reactSpanner: true, reactChocolate: true },
      sparable: false,
      async handler (choice, target, volatile) {
         volatile.vars.talk || (volatile.vars.talk = 0);
         volatile.vars.mercy || (volatile.vars.mercy = 0);
         volatile.vars.turns || (volatile.vars.turns = 0);
         let humantext = [] as string[];
         let monstertext = [] as string[][];
         let statustext = [] as (() => string[])[];
         let doEnd = false;
         let stopMusic = false;
         let doSpare = false;
         let doAssist = false;
         switch (choice.type) {
            case 'act':
               volatile.vars.vulnerable && (doSpare = true);
               switch (choice.act) {
                  case 'talk':
                     if (volatile.vars.vulnerable) {
                        humantext = text.b_opponent_toriel.talk8;
                     } else {
                        const index = Math.min(volatile.vars.talk++, 6);
                        humantext = [
                           text.b_opponent_toriel.talk1,
                           text.b_opponent_toriel.talk2,
                           text.b_opponent_toriel.talk3,
                           text.b_opponent_toriel.talk4,
                           text.b_opponent_toriel.talk5,
                           text.b_opponent_toriel.talk6,
                           text.b_opponent_toriel.talk7
                        ][index];
                     }
                     break;
               }
               break;
            case 'fight':
               if (
                  volatile.vars.vulnerable ||
                  volatile.hp <= Math.max(volatile.opponent.hp / 3, battler.calculate(volatile, choice.score))
               ) {
                  const genotrigger =
                     (16 <= outlandsKills() || SAVE.flag.n.genocide_twinkly > 0) &&
                     SAVE.flag.n.genocide_twinkly < resetThreshold();
                  const genocideQueue = genotrigger ? inventories.asrielAssets.load() : void 0;
                  torielKillState();
                  battler.volatile[0].vars.dead = 1;
                  battler.music?.stop();
                  await battler.attack(volatile, { power: 0, operation: 'multiply' }, true, true);
                  await renderer.pause(350);
                  battler.volatile[0].vars.dead = 2;
                  await dropShake(battler.volatile[0].container.position);
                  await battler.alpha.modulate(renderer, 850, 0);
                  SAVE.data.n.state_wastelands_toriel = 2;
                  await renderer.pause(350);
                  function susky (header: string) {
                     header[0] === 'x' && (battler.volatile[0].vars.dead = +header[1] + 1);
                  }
                  typer.on('header', susky);
                  events.on('exit').then(() => {
                     typer.off('header', susky);
                  });
                  await battler.monster(
                     false,
                     { x: 385 / 2, y: 95 / 2 },
                     battler.bubbles.napstablook,
                     ...(volatile.vars.vulnerable
                        ? text.b_opponent_toriel.death1
                        : outlandsKills() > 10
                        ? text.b_opponent_toriel.death2
                        : text.b_opponent_toriel.death3)
                  );
                  SAVE.data.n.exp += 200;
                  await battler.vaporize(volatile.container.objects[0]);
                  const baze = new CosmosPoint({ x: 160, y: 83 });
                  const bossSOUL = new CosmosSprite({
                     alpha: 0,
                     anchor: 0,
                     position: baze,
                     frames: [ content.ibuBossSOUL ],
                     scale: 0.5
                  }).on('tick', function () {
                     this.position = baze.add(Math.random() * 4 - 2, Math.random() * 4 - 2);
                  });
                  renderer.attach('menu', bossSOUL);
                  battler.box.size.x = 1000;
                  battler.box.size.y = 1000;
                  battler.box.position.x = 160;
                  battler.box.position.y = 120;
                  battler.SOUL.position.x = 160;
                  battler.SOUL.position.y = 123;
                  battler.SOUL.alpha.value = 1;
                  const speedmod = [ 'multiply', 0.15, Infinity ] as ['multiply', number, number];
                  battler.stat.speed.modifiers.push(speedmod);
                  game.movement = true;
                  await bossSOUL.alpha.modulate(renderer, 2500, 1);
                  await renderer.pause(500);
                  game.movement = false;
                  battler.stat.speed.modifiers.splice(battler.stat.speed.modifiers.indexOf(speedmod), 1);
                  if (genotrigger) {
                     SAVE.data.b.genocide = true;
                     battler.SOUL.alpha.value = 0;
                     SAVE.flag.b.reset_twinkly = true;
                     renderer.alpha.value = 0;
                     sounds.noise.instance(renderer);
                     const time = renderer.time;
                     const battleStar = new CosmosObject({
                        position: { x: 160 }
                     }).on('tick', function () {
                        this.position.y = 80 + CosmosMath.wave(((renderer.time - time) % 2500) / 2500) * 5;
                     });
                     battleStar.objects[0] = faces.twinklyCapping;
                     renderer.attach('menu', battleStar);
                     renderer.detach('menu', bossSOUL);
                     await renderer.pause(300);
                     renderer.alpha.value = 1;
                     sounds.noise.instance(renderer);
                     await renderer.pause(1000);
                     await battler.monster(
                        false,
                        { x: 188.5, y: 58 },
                        battler.bubbles.twinkly,
                        ...text.b_opponent_toriel.theft
                     );
                     battleStar.objects[0] = faces.twinklyLaugh.enable();
                     sounds.twinklyLaugh.instance(renderer);
                     const snd = sounds.cymbal.instance(renderer);
                     const fader = new CosmosRectangle({
                        alpha: 0,
                        size: { x: 1000, y: 1000 },
                        position: { x: 160, y: 120 },
                        anchor: 0,
                        priority: 1,
                        fill: 0xffffff,
                        stroke: -1
                     });
                     renderer.attach('menu', fader);
                     await Promise.all([ genocideQueue, fader.alpha.modulate(renderer, 5000, 1) ]);
                     snd.stop();
                     SAVE.flag.n.genocide_twinkly++;
                     renderer.detach('menu', battleStar);
                     speech.state.face = null;
                     const face = new CosmosObject({ position: { x: -0.5, y: -56.5 } });
                     const holder = () => {
                        face.objects = speech.state.face ? [ speech.state.face ] : [];
                     };
                     holder();
                     speech.holders.push(holder);
                     const goatbro = new CosmosAnimation({
                        anchor: { x: 0, y: 1 },
                        position: { x: 160, y: 120 },
                        resources: content.ibcAsrielCutscene1,
                        objects: [ face ]
                     }).on('tick', function () {
                        this.index === 3 && this.active && this.disable();
                     });
                     renderer.attach('menu', goatbro);
                     await renderer.pause(1000);
                     await fader.alpha.modulate(renderer, 3000, 0);
                     if (SAVE.flag.n.ga_asrielAwaken++ < 1) {
                        await renderer.pause(1750);
                        await battler.monster(
                           false,
                           { x: 180.5, y: 50 },
                           battler.bubbles.twinkly,
                           ...text.b_opponent_toriel.precrime
                        );
                        await renderer.pause(1650);
                     } else {
                        await renderer.pause(500);
                     }
                     goatbro.enable();
                     renderer.detach('menu', fader);
                     await renderer.when(() => !goatbro.active);
                     await renderer.pause(1250);
                     speech.state.face = faces.asrielPlain;
                     speech.state.face.reset();
                     const reveal = SAVE.flag.b.reveal_twinkly;
                     SAVE.flag.b.reveal_twinkly = true;
                     await battler.monster(
                        false,
                        { x: 180.5, y: 50 },
                        battler.bubbles.twinkly,
                        ...[
                           text.b_opponent_toriel.criminal1(reveal),
                           text.b_opponent_toriel.criminal2,
                           text.b_opponent_toriel.criminal3
                        ][Math.min(SAVE.flag.n.ga_asrielIntro++, 2)]
                     );
                     const truemercy = new CosmosAnimation({
                        anchor: 0,
                        resources: content.ibuMercy
                     });
                     const fakemercy = new CosmosSprite({
                        alpha: 0,
                        anchor: 0,
                        frames: [ content.ibuMercydud ]
                     });
                     const shaker = new CosmosValue(2);
                     const buttonPos = new CosmosPoint(160, 160);
                     const mercybox = new CosmosObject({
                        objects: [ truemercy, fakemercy ]
                     }).on('tick', function () {
                        this.position = buttonPos.add(
                           (Math.random() - 0.5) * shaker.value * 2,
                           (Math.random() - 0.5) * shaker.value * 2
                        );
                     });
                     renderer.attach('menu', mercybox);
                     sounds.landing.instance(renderer);
                     mercybox.alpha.value = 1;
                     shaker.modulate(renderer, 300, 1, 0);
                     await renderer.pause(1300);
                     const fakeboi = new CosmosSprite({
                        anchor: { x: 0, y: 1 },
                        position: { x: 160, y: 120 },
                        frames: [ content.ibcAsrielMagic ]
                     });
                     renderer.detach('menu', goatbro);
                     speech.holders.splice(speech.holders.indexOf(holder), 1);
                     renderer.attach('menu', fakeboi);
                     await shaker.modulate(renderer, 1000, 1, 1);
                     await renderer.pause(1000);
                     await Promise.all([
                        fakemercy.alpha.modulate(renderer, 400, 0, 1),
                        shaker.modulate(renderer, 600, 1, 0)
                     ]);
                     truemercy.alpha.value = 0;
                     await renderer.pause(1700);
                     await battler.vaporize(fakemercy);
                     if (SAVE.flag.n.ga_asrielIntro < 2) {
                        await renderer.pause(1000);
                        await battler.monster(
                           false,
                           { x: 180.5, y: 50 },
                           battler.bubbles.twinkly,
                           ...text.b_opponent_toriel.magic1
                        );
                     }
                     battler.garbage.push([ 'menu', fakeboi ], [ 'menu', mercybox ]);
                  } else {
                     const screen = new CosmosObject();
                     renderer.attach('menu', screen);
                     renderer.detach('menu', bossSOUL);
                     screen.objects[0] = new CosmosSprite({
                        anchor: 0,
                        frames: [ content.ibuBossbreak ],
                        position: bossSOUL.position.value(),
                        scale: 0.5
                     });
                     sounds.break.instance(renderer);
                     await renderer.pause(1250);
                     screen.objects = CosmosUtils.populate(6, index =>
                        new CosmosAnimation({
                           active: true,
                           anchor: 0,
                           resources: content.ibuBossshatter,
                           position: bossSOUL.position.add(index * 2 - (index < 3 ? 7 : 3), (index % 3) * 3).value(),
                           scale: 0.5,
                           metadata: { g: 0, d: Math.random() * 360 }
                        }).on('tick', function () {
                           this.position = this.position
                              .endpoint(this.metadata.d, 3.5)
                              .add(0, (this.metadata.g += 0.1));
                        })
                     );
                     sounds.shatter.instance(renderer);
                     battler.garbage.push([ 'menu', screen ]);
                     await renderer.pause(2000);
                  }
                  events.fire('exit');
                  return;
               } else {
                  volatile.vars.hitmult ??= 1;
                  await battler.attack(
                     volatile,
                     { power: choice.score, operation: 'calculate', multiplier: volatile.vars.hitmult },
                     true,
                     true
                  );
                  volatile.vars.hitmult *= 1 / 0.9;
               }
               break;
            case 'assist':
               doAssist = true;
               stopMusic = true;
               volatile.vars.mercy = 24;
            case 'spare':
            case 'fake':
               doSpare = true;
               break;
            case 'flee':
               if (volatile.vars.vulnerable) {
                  SAVE.data.n.state_wastelands_toriel = 3;
               } else {
                  SAVE.data.n.state_wastelands_toriel = 4;
               }
               events.fire('escape');
               battler.music?.stop();
               return;
            case 'item':
               if (choice.item === 'spanner') {
                  humantext = text.b_opponent_toriel.spannerText;
                  if (volatile.vars.vulnerable) {
                     doSpare = true;
                  } else if (volatile.vars.spannerRepeat) {
                     monstertext = [ text.b_opponent_toriel.spannerTalkRepeat ];
                  } else {
                     monstertext = [ text.b_opponent_toriel.spannerTalk ];
                     volatile.vars.spannerRepeat = true;
                  }
               }
               break;
         }
         if (doSpare) {
            const mercyValue = ++volatile.vars.mercy;
            if (mercyValue === 12) {
               volatile.container.objects[0].metadata.sad = true;
               volatile.vars.hitmult ??= 1;
               volatile.vars.hitmult < 2 && (volatile.vars.hitmult = 2);
            }
            if (mercyValue === 15) {
               volatile.vars.vulnerable = true;
               stopMusic = true;
            }
            if (mercyValue < 25) {
               monstertext = [
                  [
                     text.b_opponent_toriel.spareTalk1,
                     text.b_opponent_toriel.spareTalk2,
                     text.b_opponent_toriel.spareTalk3,
                     text.b_opponent_toriel.spareTalk4,
                     text.b_opponent_toriel.spareTalk5,
                     text.b_opponent_toriel.spareTalk6,
                     text.b_opponent_toriel.spareTalk7,
                     text.b_opponent_toriel.spareTalk8,
                     text.b_opponent_toriel.spareTalk9,
                     text.b_opponent_toriel.spareTalk10,
                     text.b_opponent_toriel.spareTalk11,
                     text.b_opponent_toriel.spareTalk12,
                     text.b_opponent_toriel.spareTalk13,
                     text.b_opponent_toriel.spareTalk14,
                     text.b_opponent_toriel.spareTalk15,
                     text.b_opponent_toriel.spareTalk16,
                     text.b_opponent_toriel.spareTalk17,
                     text.b_opponent_toriel.spareTalk18,
                     text.b_opponent_toriel.spareTalk19,
                     text.b_opponent_toriel.spareTalk20,
                     text.b_opponent_toriel.spareTalk21,
                     text.b_opponent_toriel.spareTalk22,
                     text.b_opponent_toriel.spareTalk23,
                     text.b_opponent_toriel.spareTalk24
                  ][mercyValue - 1]
               ];
            } else {
               doEnd = true;
               if (doAssist) {
                  monstertext = [ text.b_opponent_toriel.spareTalk28c ];
               } else {
                  SAVE.data.n.state_wastelands_toriel = 1;
                  monstertext = [ text.b_opponent_toriel.spareTalk28b ];
               }
            }
         }
         await battler.human(...humantext);
         if (stopMusic) {
            battler.music?.stop();
            if (doSpare && !doAssist) {
               oops();
               await renderer.pause(850);
            }
         }
         if (volatile.vars.vulnerable) {
            statustext = [ () => text.b_opponent_toriel.status5 ];
         }
         volatile.container.objects[0].objects[0].metadata.face = true;
         monstertext.length > 0 &&
            (await battler.monster(
               false,
               { x: 385 / 2, y: 35 / 2 },
               battler.bubbles.napstablook,
               ...selectElement(monstertext)
            ));
         if (doAssist) {
            volatile.container.objects[0].metadata.sus = true;
         }
         volatile.container.objects[0].objects[0].metadata.face = false;
         statustext.length > 0 ||
            (statustext = [
               () => text.b_opponent_toriel.status2,
               () => text.b_opponent_toriel.status3,
               () => text.b_opponent_toriel.status4
            ]);
         battler.status = selectElement(statustext);
         if (doEnd) {
            torielSpareState();
            if (doAssist) {
               const queue = content.amCharacutscene.load();
               const overlay = fader({ priority: 2000 });
               await overlay.alpha.modulate(renderer, 1350, 1);
               await renderer.pause(1000);
               new CosmosDaemon(content.asSavior, {
                  context,
                  rate: 0.92,
                  router: soundRouter
               }).instance(renderer);
               await Promise.all([ queue, renderer.pause(1350) ]);
               atlas.switch('dialoguerBottom');
               atlas.navigators.of('dialoguerBottom').objects[0].priority.value = 2001;
               await typer.text(...text.b_opponent_toriel.cutscene1);
               const mus = music.characutscene.instance(renderer);
               mus.gain.value /= 2;
               mus.gain.modulate(renderer, 300, mus.gain.value * 2);
               await typer.text(...text.b_opponent_toriel.cutscene2);
               atlas.navigators.of('dialoguerBottom').objects[0].priority.value = 0;
               atlas.switch(null);
               await mus.gain.modulate(renderer, 1500, 0);
               mus.stop();
               content.amCharacutscene.unload();
               battler.garbage.push([ 'menu', overlay ]);
            }
            events.fire('exit');
         } else if (!volatile.vars.vulnerable) {
            battler.resume(async () => {
               const turnValue = ++volatile.vars.turns;
               volatile.vars.attackturns ||= 0;
               const att = volatile.vars.attackturns++;
               await patterns.toriel(
                  SAVE.data.n.hp <= 4 ? 0 : att < 4 ? att + 1 : battler.pattern('toriel', [ 1, 2, 3, 4 ])
               );
               battler.SOUL.alpha.value = 0;
               await resetBox(true);
               if (!SAVE.data.b.oops && SAVE.data.b.w_state_diary && 5 <= turnValue) {
                  battler.assist = true;
                  battler.status = () => text.b_opponent_toriel.assistStatus;
               }
            });
         } else {
            battler.resume();
         }
      },
      goodbye () {
         return new CosmosAnimation({
            anchor: { x: 0, y: 1 },
            metadata: { size: { x: 72, y: 102 } },
            resources: content.ibcTorielBattle2,
            objects: [
               new CosmosObject({ position: { y: -84.5 } }).on('tick', function () {
                  if (this.metadata.face) {
                     this.alpha.value = 1;
                     this.objects = speech.state.face ? [ speech.state.face ] : [];
                  } else {
                     this.objects = [];
                  }
               })
            ]
         }).on('tick', function () {
            this.index = battler.volatile[0].vars.dead || 0;
         });
      },
      sprite () {
         return new CosmosAnimation({
            anchor: { x: 0, y: 1 },
            resources: content.ibcTorielBattle1,
            objects: [
               new CosmosObject({ position: { y: -84.5 } }).on('tick', function () {
                  if (this.metadata.face) {
                     this.alpha.value = 1;
                     this.objects = speech.state.face ? [ speech.state.face ] : [];
                     speech.state.face?.parent?.subcontainer.addChild(speech.state.face.container);
                  } else {
                     this.objects = [];
                  }
               })
            ]
         }).on('tick', function () {
            if (this.metadata.sus) {
               this.index = 2;
            } else if (this.metadata.sad) {
               this.index = 1;
            } else {
               this.index = 0;
            }
         });
      }
   })
};

for (const [ key, value ] of Object.entries(opponents)) {
   value.assets.name = `opponents::${key}`;
}

battler.opponentRegistry.register(opponents);

export default opponents;

CosmosUtils.status(`LOAD MODULE: OUTLANDS OPPONENTS (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
