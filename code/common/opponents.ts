import { ZoomBlurFilter } from '@pixi/filter-zoom-blur';
import { Filter } from 'pixi.js';
import text from '../../languages/default/text/common';
import { content, musicConvolver, shaders, sounds } from '../systems/assets';
import { atlas, events, game, renderer, rng, typer } from '../systems/core';
import { battler, choicer, dialogue, dropShake, fader, heal, instance, oops, saver, world } from '../systems/framework';
import { OutertaleOpponent, OutertaleTurnState, OutertaleVolatile } from '../systems/outertale';
import { SAVE } from '../systems/save';
import {
   CosmosAnimation,
   CosmosFont,
   CosmosHitbox,
   CosmosInventory,
   CosmosKeyed,
   CosmosMath,
   CosmosObject,
   CosmosPoint,
   CosmosPointSimple,
   CosmosProvider,
   CosmosSprite,
   CosmosUtils,
   CosmosValue
} from '../systems/storyteller';
import { default as commonPatterns, default as patterns, resetBox, standardPos, standardSize } from './patterns';

export type MadDummyMetadata = {
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
      pov: boolean;
   };
   ragdolled: boolean;
};

const mdDialogueListener = (header: string) => {
   switch (header) {
      case 'x1':
         battler.volatile[0].vars.face = 0;
         break;
      case 'x2':
         battler.volatile[0].vars.face = 1;
         break;
      case 'x3':
         battler.volatile[0].vars.face = 2;
         break;
      case 'x4':
         battler.volatile[0].vars.face = 3;
         break;
      case 'x5':
         battler.volatile[0].vars.face = 4;
         break;
      case 'x6':
         battler.volatile[0].vars.face = 5;
         break;
   }
};

export async function kiddTurn (opkey: string, allowpac = true) {
   await battler.human(
      ...[ text.b_party_kidd.mkTurn1, text.b_party_kidd.mkTurn2, text.b_party_kidd.mkTurn3, [] ][
         Math.min(SAVE.data.n.state_foundry_kiddturns++, 3)
      ],
      ...text.b_party_kidd.mkTurnX()
   );
   switch (choicer.result) {
      case 0:
         if (!SAVE.data.b.f_state_kidd_mercy) {
            SAVE.data.b.f_state_kidd_mercy = true;
            await battler.human(...text.b_party_kidd.mkTurnMercy1);
         }
         battler.spare();
         return 'pacify';
      case 1:
         if (!SAVE.data.b.f_state_kidd_act) {
            SAVE.data.b.f_state_kidd_act = true;
            await battler.human(...text.b_party_kidd.mkTurnAct1);
         }
         const act = CosmosMath.weigh(
            [
               [ 0, 2 ],
               [ 1, 6 ],
               [ 2, 3 ],
               [ 3, 1 ]
            ],
            rng.battle.next()
         ) as 0 | 1 | 2 | 3;
         typer.variables.x = battler.target!.opponent.name().replace('* ', '');
         await battler.human(
            ...[
               text.b_party_kidd.mkTurnActRand1,
               text.b_party_kidd.mkTurnActRand2,
               text.b_party_kidd.mkTurnActRand3,
               text.b_party_kidd.mkTurnActRand4
            ][act](opkey)[rng.dialogue.int(act === 3 ? 1 : 3)]
         );
         if (opkey !== 'muffet') {
            await battler.human(
               ...[
                  text.b_party_kidd.mkTurnActResult1(opkey),
                  text.b_party_kidd.mkTurnActResult2(opkey),
                  text.b_party_kidd.mkTurnActResult3(opkey, battler.alive.length > 1),
                  text.b_party_kidd.mkTurnActResult4(opkey, battler.alive.length > 1, allowpac)
               ][act]
            );
            switch (act) {
               case 0:
                  battler.stat.monsterdef.modifiers.push([ 'add', -5, Infinity ]);
                  return 'defdown';
               case 1:
                  battler.stat.monsteratk.modifiers.push([ 'add', -1, Infinity ]);
                  return 'atkdown';
               case 2:
                  return 'skip';
               case 3:
                  if (allowpac) {
                     const active = battler.target!;
                     active.sparable = true;
                     battler.spare(battler.volatile.indexOf(active));
                     return 'pacify';
                  } else {
                     return void 0;
                  }
            }
         } else {
            await battler.human(...text.b_party_kidd.mkTurnActResult0);
            return void 0;
         }
      case 2:
         if (!SAVE.data.b.f_state_kidd_magic) {
            SAVE.data.b.f_state_kidd_magic = true;
            await battler.human(...text.b_party_kidd.mkMagic1);
         } else {
            await battler.human(
               ...[ text.b_party_kidd.mkMagic2a, text.b_party_kidd.mkMagic2b, text.b_party_kidd.mkMagic2c ][
                  rng.dialogue.int(3)
               ]
            );
         }
         heal(2, true, true);
         return void 0;
      case 3:
         if (!SAVE.data.b.f_state_kidd_fight) {
            await battler.human(...text.b_party_kidd.mkTurnFight1());
            if ((choicer.result as number) === 1) {
               await battler.human(...text.b_party_kidd.mkTurnFight2b);
               SAVE.data.b.f_state_kidd_mercy = true;
               battler.spare();
               return 'pacify';
            } else {
               await battler.human(...text.b_party_kidd.mkTurnFight2a);
               SAVE.data.b.f_state_kidd_fight = true;
            }
         }
         if (battler.bullied.includes(battler.target!)) {
            await battler.human(
               ...(SAVE.data.n.state_foundry_kiddbully < 2
                  ? [ text.b_party_kidd.mkWeaken1, text.b_party_kidd.mkWeaken2 ][SAVE.data.n.state_foundry_kiddbully++]
                  : [ text.b_party_kidd.mkWeaken3a, text.b_party_kidd.mkWeaken3b, text.b_party_kidd.mkWeaken3c ][
                       rng.dialogue.int(3)
                    ])
            );
         } else {
            await battler.human(
               ...[ text.b_party_kidd.mkTurnFight3a, text.b_party_kidd.mkTurnFight3b, text.b_party_kidd.mkTurnFight3c ][
                  rng.dialogue.int(3)
               ]
            );
         }
         oops();
         return 'fight';
   }
}

export async function kiddFight (volatile: OutertaleVolatile) {
   return await battler.attack(
      volatile,
      volatile.sparable ? { power: 0, operation: 'multiply' } : { item: 'spanner', power: 1, multiplier: 0.5 }
   );
}

export async function kiddReaction (opkey: string) {
   if (!world.kiddo || SAVE.data.n.state_foundry_muffet === 1) {
      return;
   }
   if (battler.alive.length !== 0) {
      await battler.human(
         ...[
            text.b_party_kidd.mkDeath1,
            text.b_party_kidd.mkDeath2,
            text.b_party_kidd.mkDeath3,
            text.b_party_kidd.mkDeath4
         ][Math.min(SAVE.data.n.state_foundry_kidddeath++, 3)]
      );
   } else if (opkey !== 'muffet') {
      const move = battler.encounter_state.movement;
      battler.encounter_state.movement = false;
      events.on('battle-exit').then(async () => {
         events.fire('tick');
         switch (game.room) {
            case 'f_telescope':
               instance('main', 'f_starkiller')?.destroy();
               break;
            case 'f_stand':
               instance('main', 'f_shortsy')?.destroy();
               instance('main', 'f_longsy')?.destroy();
               break;
         }
         game.movement = false;
         await dialogue(
            'dialoguerBottom',
            ...[
               text.b_party_kidd.mkDeath1OW,
               text.b_party_kidd.mkDeath2OW,
               text.b_party_kidd.mkDeath3OW,
               text.b_party_kidd.mkDeath4OW
            ][Math.min(SAVE.data.n.state_foundry_kidddeath++, 3)]
         );
         move && (game.movement = true);
      });
   }
}

export async function kiddReactionBully (opkey: string) {
   if (!world.kiddo || SAVE.data.n.state_foundry_muffet === 1) {
      return;
   }
   if (battler.alive.length !== 0) {
      await battler.human(
         ...[ text.b_party_kidd.mkBully1, text.b_party_kidd.mkBully2, text.b_party_kidd.mkBully3 ][
            Math.min(SAVE.data.n.state_foundry_kiddrunner++, 2)
         ]
      );
   } else if (opkey !== 'muffet') {
      const move = battler.encounter_state.movement;
      battler.encounter_state.movement = false;
      events.on('battle-exit').then(async () => {
         events.fire('tick');
         game.movement = false;
         await dialogue(
            'dialoguerBottom',
            ...[ text.b_party_kidd.mkBully1OW, text.b_party_kidd.mkBully2OW, text.b_party_kidd.mkBully3OW ][
               Math.min(SAVE.data.n.state_foundry_kiddrunner++, 2)
            ]
         );
         move && (game.movement = true);
      });
   }
}

export async function kiddHandler (state: OutertaleTurnState<any>, opkey: string, allowpac = true) {
   let f = false;
   if (world.kiddo && battler.alive.length !== 0 && state.volatile.alive) {
      if (SAVE.data.n.state_foundry_muffet === 1) {
         if (!SAVE.data.b.f_state_kidd_trauma) {
            await battler.human(...text.b_party_kidd.mkNope);
            SAVE.data.b.f_state_kidd_trauma = true;
         }
      } else {
         if (!state.dead) {
            const bul = battler.bullied.includes(state.volatile);
            switch (await kiddTurn(opkey, allowpac)) {
               case 'fight': {
                  if (await kiddFight(state.volatile)) {
                     opkey === 'muffet' || opkey === 'shyren' || world.kill();
                     state.dead = true;
                  } else {
                     state.hurt = true;
                  }
                  f = true;
                  break;
               }
               case 'skip': {
                  state.vars.kidskip = true;
                  break;
               }
               case 'pacify': {
                  if (bul && !state.volatile.sparable) {
                     await kiddReactionBully(opkey);
                  }
                  break;
               }
            }
         }
         if (state.dead) {
            await kiddReaction(opkey);
         }
      }
   }
   return f;
}

export async function epiphany (
   target: number,
   volatile: OutertaleVolatile,
   middle: number,
   { befriend = () => {}, flirt = () => {}, kill = () => world.kill(), result = true },
   dialogueBubble: (
      fontFamily?: () => CosmosFont | null,
      fontSize?: () => number,
      content?: () => string
   ) => CosmosObject,
   dialoguePos: CosmosProvider<CosmosPointSimple>,
   dialogueLines: string[] | CosmosProvider<string[]>[],
   endScript: () => void | Promise<void> = () => {},
   setupScript: () => void | Promise<void> = () => {}
) {
   const cpx = volatile.container.position.x;
   const mgv = battler.music?.gain.value ?? 0;
   const mrv = battler.music?.rate.value ?? 1;
   const tsv = renderer.speed.value;
   const vhp = volatile.opponent.hp / 4;

   const wSpeed = new CosmosValue(0.05);
   const wWidth = new CosmosValue();
   const zPower = new CosmosValue();
   const wFilter = new Filter(shaders.waver.vert, shaders.waver.frag, {
      size: 160,
      phase: 0,
      widthTop: 0,
      widthBottom: 0,
      yoffset: 0
   });
   const zFilter = new ZoomBlurFilter({ strength: 0, radius: 400, innerRadius: 0, center: [ 320, 240 ] });
   const t = () => {
      wFilter.uniforms.phase += wSpeed.value;
      wFilter.uniforms.widthBottom = wWidth.value;
      wFilter.uniforms.widthTop = wWidth.value;
      zFilter.strength = zPower.value;
   };

   t();
   (renderer.filters ??= []).push(wFilter, zFilter);
   renderer.on('tick', t);
   const whiteFader = fader({ fill: 0xffffff, priority: 10001, position: { x: 160, y: 120 }, size: 1000, anchor: 0 });
   await Promise.all([
      musicConvolver.modulate(renderer, 1000, 0.7, 0.7),
      renderer.shake.modulate(renderer, 1000, 0, 5),
      renderer.speed.modulate(renderer, 1000, 1, tsv * 0.75),
      whiteFader.alpha.modulate(renderer, 1000, 1),
      wSpeed.modulate(renderer, 1000, 0.06),
      wWidth.modulate(renderer, 1000, 0.01, 0.01, 0.03),
      zPower.modulate(renderer, 1000, 0, 0, 0, 0, 1)
   ]);
   atlas.detach(renderer, 'menu', 'battlerAdvancedText');
   battler.alpha.value = 0;
   wSpeed.value = 0.03;
   wWidth.value = 0.015;
   t();
   renderer.filters?.splice(renderer.filters.indexOf(zFilter), 1);
   renderer.shake.value = 0;
   const alphaValues = battler.volatile
      .filter(v => v !== volatile)
      .map(({ container: { alpha } }) => {
         const value = alpha.value;
         alpha.value = 0;
         return { alpha, value };
      });
   volatile.container.position.x = middle;
   typer.reset(true);
   const blackFader = fader({ fill: 0, priority: 10002, position: { x: 160, y: 120 }, size: 1000, anchor: 0 });
   await blackFader.alpha.modulate(renderer, 1000, 1);
   renderer.detach('menu', whiteFader);
   renderer.tint = [
      0xffff00,
      world.meanie ? 0x3f00ff : SAVE.data.b.oops && world.flirt > 9 ? 0xcf7fff : SAVE.data.b.oops ? 0x00ff5e : 0xffee6d,
      0xff6969,
      0xffffff
   ][choicer.result];
   await setupScript();
   await Promise.all([ battler.music?.gain.modulate(renderer, 1000, mgv), blackFader.alpha.modulate(renderer, 1000, 0) ]);
   renderer.detach('menu', blackFader);
   await renderer.pause(1000);

   await battler.monster(
      false,
      CosmosUtils.provide(dialoguePos),
      dialogueBubble,
      ...(typeof dialogueLines[0] === 'string'
         ? (dialogueLines as string[])
         : CosmosUtils.provide(dialogueLines[choicer.result]))
   );
   choicer.result === 2 && oops();
   if (result) {
      if (choicer.result === 2) {
         while (volatile.alive) {
            await renderer.pause(500);
            battler.music && (battler.music.rate.value -= mrv / 4);
            await battler.attack(volatile, { power: -vhp, operation: 'add' }, false, true);
         }
         kill();
         await renderer.pause(500);
      } else {
         choicer.result === 1 && !world.meanie && (world.flirt > 9 ? flirt() : befriend());
         volatile.sparable = true;
         battler.spare(target, false, true, false, choicer.result === 1 && world.meanie, choicer.result === 3);
      }
      await renderer.pause(500);
   }

   if (battler.alive.length === 0) {
      renderer.speed.value = 1;
      SAVE.data.n.exp <= 0 && battler.exp > 0 && (battler.exp = Math.max(battler.exp - SAVE.data.n.exp, 10));
      events.on('battle-exit').then(() => {
         battler.alpha.value = 1;
         renderer.filters?.splice(renderer.filters.indexOf(wFilter), 1);
         renderer.off('tick', t);
         renderer.tint = void 0;
         saver.gold += battler.g;
      });
      SAVE.data.n.exp += battler.exp;
      events.fire('exit');
      return;
   }

   renderer.attach('menu', blackFader);
   await Promise.all([
      battler.music?.gain.modulate(renderer, 1000, 0),
      blackFader.alpha.modulate(renderer, 1000, 1),
      musicConvolver.modulate(renderer, 1000, 0)
   ]);
   await renderer.pause(1000);
   for (const { alpha, value } of alphaValues) {
      alpha.value = value;
   }
   battler.alpha.value = 1;
   battler.music && (battler.music.rate.value = mrv);
   battler.music?.gain.modulate(renderer, 1000, mgv);
   renderer.filters?.splice(renderer.filters.indexOf(wFilter), 1);
   renderer.off('tick', t);
   renderer.tint = void 0;
   volatile.container.position.x = cpx;
   renderer.speed.value = tsv;
   await endScript();
   await blackFader.alpha.modulate(renderer, 1000, 0);
   renderer.detach('menu', blackFader);
}

const opponents = {
   maddummy: new OutertaleOpponent({
      flirted: () => SAVE.data.b.flirt_maddummy,
      assets: new CosmosInventory(
         content.ibcDummy,
         content.ibcDummyGlad,
         content.ibcDummyShock,
         content.ibcDummyGladHugged,
         content.ibcDummyMadBase,
         content.ibcDummyMadBody,
         content.ibcDummyMadHead,
         content.ibcDummyMadTorso,
         content.ibcNapstablookBattle,
         content.ibbTear,
         content.asLanding,
         content.ibbMissile,
         content.ibbDummy,
         content.ibbDummyknife,
         content.ibbScribble,
         content.asArrow,
         content.asBell,
         content.asSlidewhistle,
         content.ibbFrogstar
      ),
      exp: 42,
      hp: 1,
      df: 0,
      name: () => text.b_opponent_maddummy.name(),
      acts: () => [
         [ 'check', text.b_opponent_maddummy.act_check ],
         [ 'talk', text.b_opponent_maddummy.act_talk ],
         [ 'hug', text.b_opponent_maddummy.act_hug ],
         [ 'slap', text.b_opponent_maddummy.act_slap ],
         [ 'flirt', text.b_opponent_maddummy.act_flirt ]
      ],
      ghost: true,
      sparable: false,
      metadata: { nootexempt: true },
      handler: ((
         talkie: (target: number, ...lines: string[]) => Promise<void>,
         vars: CosmosKeyed,
         defaultStatus: () => () => string[]
      ) => {
         const talk = async (target: number, ...lines: string[]) => {
            await talkie(target, ...lines);
            battler.volatile[0].vars.face = 0;
         };
         return async (choice, target, volatile) => {
            let idle = true;
            let statustext = defaultStatus;
            volatile.vars.pauseact = 0;
            const MDM = volatile.container.objects[0].metadata as MadDummyMetadata;
            for (const key in vars) {
               volatile.vars[key] ||= vars[key];
            }
            if (SAVE.data.n.kills_wastelands < 16 && volatile.vars.POOP !== 1) {
               volatile.vars.POOP = 1;
               typer.on('header', mdDialogueListener);
               events.on('battle-exit').then(() => {
                  typer.off('header', mdDialogueListener);
               });
            }
            switch (choice.type) {
               case 'fight':
                  if (16 <= SAVE.data.n.kills_wastelands) {
                     volatile.container.objects[0].frames = [ content.ibcDummyShock ];
                     if (await battler.attack(volatile, { power: 0, operation: 'multiply' })) {
                        battler.exp += 42;
                        SAVE.data.n.state_foundry_maddummy = 1;
                        battler.music?.stop();
                        return;
                     }
                  } else {
                     MDM.ragdolled = true;
                     volatile.vars.phase === 1 && (volatile.vars.turns = 0);
                     sounds.strike.instance(renderer);
                     MDM.mode = 'ragdoll';
                     volatile.vars.attak || (battler.music && (battler.music.rate.value = 0));
                     await battler.attack(volatile, { operation: 'none' }, true, true);
                     await renderer.pause(volatile.vars.attak ? 500 : 2000);
                     MDM.mode = 'restore';
                     MDM.ragdolled = false;
                     volatile.vars.attak || battler.music?.rate.modulate(renderer, 500, 1);
                     if (!volatile.vars.attak) {
                        await renderer.pause(1500);
                        idle = false;
                        volatile.vars.attak = true;
                        await talk(target, ...text.b_opponent_maddummy.fightFail);
                        volatile.vars.phase === 2 && (volatile.vars.semiTurn = true);
                        volatile.vars.phase === 3 && volatile.vars.turns++;
                     }
                  }
                  break;
               case 'item':
                  if (choice.item === 'epiphany') {
                     if (16 <= SAVE.data.n.kills_wastelands) {
                        await epiphany(
                           target,
                           volatile,
                           108,
                           { result: false },
                           battler.bubbles.dummy,
                           { x: 295 / 2, y: 134 / 2 },
                           text.b_opponent_maddummy.epiphaNOPE2
                        );
                     } else {
                        const MDS = battler.volatile[target].container.objects[0];
                        const MDM = MDS.metadata as MadDummyMetadata;
                        const pos = MDS.position.value();
                        const vel = MDS.velocity.value();
                        typer.magic = battler.ghost_magic;
                        await epiphany(
                           target,
                           volatile,
                           108,
                           { result: false },
                           battler.bubbles.napstablook,
                           () => volatile.container.position.add(18, -53),
                           text.b_opponent_maddummy.epiphaNOPE1,
                           () => {
                              MDM.movement.pov = false;
                              MDS.position.set(pos);
                              MDS.velocity.set(vel);
                           },
                           () => {
                              MDM.movement.pov = true;
                              MDS.position.set(0);
                              MDS.velocity.set(0);
                           }
                        );
                        typer.magic = '';
                     }
                  }
                  break;
               case 'act':
                  switch (choice.act) {
                     case 'flirt': {
                        SAVE.data.b.flirt_maddummy = true;
                        break;
                     }
                     case 'hug':
                        if (16 <= SAVE.data.n.kills_wastelands) {
                           volatile.vars.phase === 1 && (volatile.vars.turns = 0);
                        }
                        if (volatile.vars.phase < 3) {
                           idle = false;
                           volatile.vars.pauseact = 1;
                           if (16 <= SAVE.data.n.kills_wastelands) {
                              volatile.container.objects[0].frames = [ content.ibcDummyGladHugged ];
                              SAVE.data.n.state_foundry_maddummy = 4;
                              volatile.sparable = true;
                           }
                           await talk(
                              target,
                              ...[
                                 text.b_opponent_maddummy.hugTalk1(),
                                 text.b_opponent_maddummy.hugTalk2,
                                 text.b_opponent_maddummy.hugTalk3,
                                 text.b_opponent_maddummy.hugTalk4
                              ][Math.min(volatile.vars.hugs++, 3)]
                           );
                           if (16 <= SAVE.data.n.kills_wastelands) {
                              battler.music?.stop();
                              battler.spare();
                              return;
                           }
                        }
                        break;
                     case 'slap':
                        if (16 <= SAVE.data.n.kills_wastelands) {
                           oops();
                           battler.music?.stop();
                           SAVE.data.n.state_foundry_maddummy = 5;
                           sounds.slidewhistle.instance(renderer);
                           await volatile.container.position.modulate(renderer, 1250, {
                              x: volatile.container.position.x,
                              y: -80
                           });
                           await renderer.pause(650);
                           volatile.sparable = true;
                           battler.spare();
                           return;
                        } else {
                           volatile.vars.phase === 1 && (volatile.vars.turns = 0);
                           if (volatile.vars.phase < 3) {
                              idle = false;
                              volatile.vars.pauseact = 1;
                              await talk(
                                 target,
                                 ...[
                                    text.b_opponent_maddummy.slapTalk1,
                                    text.b_opponent_maddummy.slapTalk2,
                                    text.b_opponent_maddummy.slapTalk3,
                                    text.b_opponent_maddummy.slapTalk4
                                 ][Math.min(volatile.vars.slaps++, 3)]
                              );
                           }
                        }
                        break;
                  }
                  break;
               case 'spare':
                  if (!volatile.sparable) {
                     break;
                  }
                  battler.music?.stop();
                  battler.spare();
                  return;
            }
            if (volatile.vars.phase === 1 && ++volatile.vars.turns === 5) {
               battler.music?.stop();
               if (16 <= SAVE.data.n.kills_wastelands) {
                  await battler.human(...text.b_opponent_dummy.bored);
               } else {
                  await talk(target, ...text.b_opponent_maddummy.boredTalk);
               }
               volatile.sparable = true;
               battler.spare();
               SAVE.data.n.state_foundry_maddummy = 3;
            }
            if (battler.alive.length !== 0) {
               if (16 <= SAVE.data.n.kills_wastelands) {
                  if (idle) {
                     await talk(
                        target,
                        ...[
                           text.b_opponent_maddummy.gladTalk1,
                           text.b_opponent_maddummy.gladTalk2,
                           text.b_opponent_maddummy.gladTalk3,
                           text.b_opponent_maddummy.gladTalk4,
                           text.b_opponent_maddummy.gladTalk5,
                           text.b_opponent_maddummy.gladTalk6
                        ][Math.min(volatile.vars.gratitude++, 6)]
                     );
                  }
                  battler.status = statustext();
                  battler.resume();
               } else {
                  if (idle) {
                     switch (volatile.vars.phase) {
                        case 1:
                           await talk(
                              target,
                              ...[
                                 text.b_opponent_maddummy.randTalk1,
                                 text.b_opponent_maddummy.randTalk2,
                                 text.b_opponent_maddummy.randTalk3,
                                 text.b_opponent_maddummy.randTalk4
                              ][rng.dialogue.int(4)]
                           );
                           break;
                        case 2:
                           const t = volatile.vars.turns++;
                           await talk(
                              target,
                              ...[
                                 text.b_opponent_maddummy.phase2Talk1,
                                 text.b_opponent_maddummy.phase2Talk2,
                                 text.b_opponent_maddummy.phase2Talk3,
                                 text.b_opponent_maddummy.phase2Talk4,
                                 text.b_opponent_maddummy.phase2Talk5,
                                 text.b_opponent_maddummy.phase2Talk6,
                                 text.b_opponent_maddummy.phase2Talk7,
                                 text.b_opponent_maddummy.phase2Talk8
                              ][Math.min(t, 7)]
                           );
                           if (t > 2) {
                              MDM.movement.intensity = 2;
                              MDM.movement.sineRate.y = 2;
                              MDM.movement.sinePower.y = 10;
                              MDM.speed = 2;
                              MDM.multiplier = 1.5;
                           }
                           break;
                        case 3:
                           await talk(
                              target,
                              ...[
                                 text.b_opponent_maddummy.phase3Talk1,
                                 text.b_opponent_maddummy.phase3Talk2,
                                 text.b_opponent_maddummy.phase3Talk3,
                                 text.b_opponent_maddummy.phase3Talk4
                              ][Math.min(volatile.vars.turns++, 3)]
                           );
                           break;
                     }
                  }
                  await battler.resume(async o => {
                     await standardSize({ x: 90, y: 92.5 }, true);
                     standardPos();
                     await patterns.maddummy();
                     if (volatile.vars.phase === 3 && volatile.vars.turns === 4) {
                        MDM.movement.center.x = 0;
                        MDM.movement.center.y = 0;
                        MDM.movement.intensity = 0;
                        await talk(target, ...text.b_opponent_maddummy.phaseChange3a1);
                        MDM.speed = 3;
                        MDM.multiplier = 1.75;
                        await talk(target, ...text.b_opponent_maddummy.phaseChange3a2);
                        MDM.speed = 1;
                        MDM.multiplier = 1.25;
                        sounds.bell.instance(renderer);
                        const knife = new CosmosHitbox({
                           anchor: 0,
                           size: { x: 30, y: 10 },
                           rotation: 160,
                           position: { x: 240 / 2, y: 120 / 2 },
                           metadata: { bullet: true, damage: 99 },
                           tint: 0xff6969,
                           objects: [ new CosmosSprite({ anchor: 0, frames: [ content.ibbDummyknife ] }) ]
                        });
                        renderer.attach('menu', knife);
                        knife.alpha.modulate(renderer, 300, 1, 1);
                        await knife.rotation.modulate(renderer, 300, 110, 110);
                        MDM.speed = 4;
                        MDM.multiplier = 2;
                        await talk(target, ...text.b_opponent_maddummy.phaseChange3b);
                        sounds.arrow.instance(renderer);
                        knife.rotation.value = battler.SOUL.position.angleFrom(knife.position);
                        knife.velocity.set(CosmosMath.ray(knife.rotation.value, 6));
                        await renderer.when(() => knife.position.y > 240);
                        if (SAVE.data.n.hp > 0) {
                           MDM.speed = 1;
                           MDM.multiplier = 0.5;
                           await renderer.pause(1000);
                           renderer.detach('menu', knife);
                           await talk(target, ...text.b_opponent_maddummy.phaseChange3c1);
                           MDM.speed = 4;
                           MDM.multiplier = 2;
                           await talk(target, ...text.b_opponent_maddummy.phaseChange3c2);
                           MDM.speed = 1;
                           MDM.multiplier = 0.5;
                           await talk(target, ...text.b_opponent_maddummy.phaseChange3c3);
                           MDM.speed = 4;
                           MDM.multiplier = 2;
                           await talk(target, ...text.b_opponent_maddummy.phaseChange3c4);
                           MDM.speed = 3.5;
                           MDM.multiplier = 6;
                           await talk(target, ...text.b_opponent_maddummy.phaseChange3c5);
                           MDM.speed = 3;
                           MDM.multiplier = 10;
                           let napsta = false;
                           (async () => {
                              while (!napsta) {
                                 await talk(target, ...text.b_opponent_maddummy.phaseChange3d);
                              }
                           })();
                           commonPatterns.napstablook(999);
                           await renderer.when(() => volatile.vars.finalhit);
                           napsta = true;
                           typer.reset(true);
                           battler.music?.stop();
                           await renderer.pause(1000);
                           if (SAVE.data.n.hp === 0) {
                              return o;
                           }
                           await talk(target, ...text.b_opponent_maddummy.phaseChange3e);
                           await volatile.container.position.modulate(renderer, 1450, { y: -40 });
                           volatile.container.position.y = -1000;
                           await renderer.pause(1650);
                           const time = renderer.time;
                           const blookyPositionY = new CosmosValue();
                           const napstaSprite = new CosmosAnimation({
                              active: true,
                              anchor: { y: 1, x: 0 },
                              resources: content.ibcNapstablookBattle
                           }).on('tick', function () {
                              this.position.y =
                                 blookyPositionY.value - CosmosMath.wave(((renderer.time - time) % 4000) / 4000) * 4;
                           });
                           const napstaContainer = new CosmosObject({
                              position: { x: 160, y: 0 },
                              objects: [ napstaSprite ]
                           });
                           renderer.attach('menu', napstaContainer);
                           await napstaContainer.position.modulate(renderer, 2500, { y: 94 });
                           typer.off('header', mdDialogueListener);
                           if (SAVE.data.n.hp === 0) {
                              return o;
                           }
                           typer.magic = battler.ghost_magic;
                           await battler.monster(
                              false,
                              { x: 385 / 2, y: 16.5 },
                              battler.bubbles.napstablook,
                              ...text.b_opponent_maddummy.final1()
                           );
                           typer.magic = '';
                           await napstaContainer.position.modulate(renderer, 2000, { y: 0 });
                           renderer.detach('menu', napstaContainer);
                           if (SAVE.data.n.hp === 0) {
                              return o;
                           }
                           events.fire('exit');
                        }
                        return o;
                     } else {
                        if (volatile.vars.phase === 1 && volatile.vars.hits > 0) {
                           volatile.vars.turns = 0;
                           volatile.vars.phase = 2;
                           MDM.multiplier = 0.5;
                           MDM.speed = 1.5;
                           await talk(target, ...text.b_opponent_maddummy.phaseChange1);
                           statustext = () => () => text.b_opponent_maddummy.changeStatus1;
                        } else if (volatile.vars.phase === 2) {
                           if (volatile.vars.hits > 10) {
                              MDM.movement.rate = 0.325;
                           }
                           if (volatile.vars.turns > 3) {
                              MDM.movement.intensity = 2;
                           }
                           if (volatile.vars.hits > 40) {
                              volatile.vars.turns = 0;
                              volatile.vars.phase = 3;
                              const int = MDM.movement.intensity;
                              MDM.movement.center.x = 0;
                              MDM.movement.center.y = 0;
                              MDM.movement.intensity = 0;
                              await talk(target, ...text.b_opponent_maddummy.phaseChange2a);
                              volatile.vars.hits = -Infinity;
                              patterns.maddummy(true);
                              await renderer.pause(2000);
                              await talk(target, ...text.b_opponent_maddummy.phaseChange2b1);
                              volatile.vars.dudShock = true;
                              const OGspeed = MDM.speed;
                              const OGmultiplier = MDM.multiplier;
                              MDM.speed = 4;
                              MDM.multiplier = 2;
                              await talk(target, ...text.b_opponent_maddummy.phaseChange2b2);
                              MDM.speed = OGspeed;
                              MDM.multiplier = OGmultiplier;
                              volatile.vars.dudSad = true;
                              await renderer.pause(2000);
                              await talk(target, ...text.b_opponent_maddummy.phaseChange2c);
                              statustext = () => () => text.b_opponent_maddummy.changeStatus2;
                              MDM.movement.center.x = 0;
                              MDM.movement.center.y = 0;
                              MDM.movement.intensity = int;
                           }
                        }
                        await resetBox(true);
                     }
                     battler.status = statustext();
                  });
               }
            } else {
               battler.music?.stop();
            }
         };
      })(
         async (target, ...lines) =>
            16 <= SAVE.data.n.kills_wastelands
               ? battler.monster(false, { x: 295 / 2, y: 134 / 2 }, battler.bubbles.dummy, ...lines)
               : (async () => {
                    const MDM = battler.volatile[target].container.objects[0].metadata as MadDummyMetadata;
                    const cx = MDM.movement.center.x;
                    const cy = MDM.movement.center.y;
                    const int = MDM.movement.intensity;
                    MDM.movement.center.x = 0;
                    MDM.movement.center.y = 0;
                    MDM.movement.intensity = 0;
                    typer.magic = battler.ghost_magic;
                    await battler.monster(
                       false,
                       battler.volatile[target].container.position.add(18, -53),
                       battler.bubbles.napstablook,
                       ...lines
                    );
                    typer.magic = '';
                    MDM.movement.center.x = cx;
                    MDM.movement.center.y = cy;
                    MDM.movement.intensity = int;
                 })(),
         { turns: 0, slaps: 0, hugs: 0, gratitude: 0, phase: 1, hits: 0, face: 0, activate: 0 },
         () =>
            16 <= SAVE.data.n.kills_wastelands
               ? [
                    () => text.b_opponent_maddummy.gladStatus1,
                    () => text.b_opponent_maddummy.gladStatus2,
                    () => text.b_opponent_maddummy.gladStatus3
                 ][rng.dialogue.int(3)]
               : [
                    () => text.b_opponent_maddummy.randStatus1,
                    () => text.b_opponent_maddummy.randStatus2,
                    () => text.b_opponent_maddummy.randStatus3,
                    () => text.b_opponent_maddummy.randStatus4,
                    () => text.b_opponent_maddummy.randStatus5
                 ][rng.dialogue.int(5)]
      ),
      sprite: volatyle =>
         16 <= SAVE.data.n.kills_wastelands
            ? new CosmosSprite({ frames: [ content.ibcDummyGlad ] })
            : new CosmosSprite({
                 anchor: { x: 0, y: 1 },
                 metadata: {
                    size: { y: 48 },
                    speed: 0.5,
                    multiplier: 0.1,
                    time: 0,
                    ragdolled: false,
                    mode: 'normal',
                    movement: {
                       rate: 0.5,
                       intensity: 0,
                       center: new CosmosPoint({ x: 0, y: 0 }),
                       sineRate: { x: 1, y: 4 },
                       sinePower: { x: 45, y: 5 },
                       pov: false
                    }
                 } as MadDummyMetadata,
                 objects: [
                    new CosmosObject({
                       objects: [
                          new CosmosSprite({ anchor: { x: 0 }, frames: [ content.ibcDummyMadBase ] }),
                          new CosmosSprite({ anchor: 0, frames: [ content.ibcDummyMadTorso ] }),
                          new CosmosSprite({ anchor: 0, frames: [ content.ibcDummyMadBody ] }),
                          new CosmosAnimation({ anchor: 0, resources: content.ibcDummyMadHead }).on(
                             'tick',
                             function () {
                                this.index = volatyle.vars.face ?? 0;
                             }
                          )
                       ]
                    }),
                    new CosmosHitbox({
                       anchor: { x: 0, y: 1 },
                       size: { x: 59 / 2 + 10, y: 118 / 2 + 10 },
                       position: { x: -2.5, y: 15.5 }
                    })
                 ]
              }).on(
                 'tick',
                 (() => {
                    let rot = 0;
                    let dingus = 0;
                    let fakegrav = 0.5;
                    let lastmode = 'normal';
                    let lastRate = 0.5;
                    let lastCenterX = 0;
                    let lastCenterY = 0;
                    let lastIntensity = 0;
                    let lastSinePowerX = 45;
                    let lastSinePowerY = 5;
                    const movement = {
                       time: 0,
                       intensity: 0,
                       center: { x: 0, y: 0 },
                       rate: 0.5,
                       sinePower: { x: 45, y: 5 },
                       pov: false
                    };
                    let trueSpeed = 0.5;
                    let trueMultiplier = 0.1;
                    const base = [
                       { x: 0, y: 0, r: 0 },
                       { x: -3, y: -19.5, r: 0 },
                       { x: 0, y: -5, r: 0 },
                       { x: -3, y: -40, r: 0 }
                    ];
                    const states = [] as typeof base;
                    function reset () {
                       for (const [ index, origin ] of base.entries()) {
                          states[index] = { x: origin.x, y: origin.y, r: origin.r };
                       }
                    }
                    reset();
                    return function () {
                       let hit = false;
                       const meta = this.metadata as MadDummyMetadata;
                       for (const garbo of renderer.detect(
                          this.objects[1] as CosmosHitbox,
                          ...renderer.calculate(
                             'menu',
                             garbo =>
                                !garbo.metadata.hit &&
                                garbo.metadata.dummybullet === true &&
                                garbo.position.y < battler.box.position.y - battler.box.size.y / 2
                          )
                       )) {
                          if (garbo.metadata.finalhit) {
                             volatyle.vars.finalhit = true;
                             garbo.alpha.value = 0;
                             garbo.metadata.bullet = false;
                          }
                          meta.multiplier = 0.4;
                          meta.speed = 2;
                          garbo.metadata.hit = true;
                          garbo.metadata.detach?.();
                          volatyle.vars.hits++;
                          if (!hit) {
                             hit = true;
                             sounds.strike.instance(renderer);
                             meta.mode = 'random';
                             this.velocity.set(0, 0);
                             atlas.target === 'dialoguerBase' || (volatyle.vars.face = 1);
                          }
                          if (volatyle.vars.phase < 3 && 10 <= volatyle.vars.hits && volatyle.vars.turns < 4) {
                             meta.movement.rate = 0.325;
                             meta.movement.intensity = 1;
                          }
                       }

                       if (dingus > 20) {
                          dingus = 0;
                          reset();
                          meta.mode = 'normal';
                          if (
                             atlas.target !== 'dialoguerBase' ||
                             (48 <= SAVE.data.n.plot && SAVE.data.n.state_wastelands_toriel === 0)
                          ) {
                             volatyle.vars.face =
                                48 <= SAVE.data.n.plot && SAVE.data.n.state_wastelands_toriel === 0 ? 8 : 0;
                          }
                       }

                       const {
                          speed,
                          multiplier,
                          time,
                          mode,
                          movement: { rate, intensity, center, sineRate, sinePower }
                       } = meta;

                       if (meta.movement.pov || meta.ragdolled || battler.alive.length === 0) {
                          this.velocity.set(0, 0);
                       } else {
                          const pseudoRate = movement.rate - (movement.rate - lastRate) / 8;
                          const psuedoTime = movement.time + pseudoRate / 30;
                          const pseudoCenterX = movement.center.x - (movement.center.x - lastCenterX) / 8;
                          const pseudoCenterY = movement.center.y - (movement.center.y - lastCenterY) / 8;
                          const pseudoIntensity = movement.intensity - (movement.intensity - lastIntensity) / 8;
                          const pseudoSinePowerX = movement.sinePower.x - (movement.sinePower.x - lastSinePowerX) / 8;
                          const pseudoSinePowerY = movement.sinePower.y - (movement.sinePower.y - lastSinePowerY) / 8;

                          const projectedVelocity = new CosmosPoint(
                             (CosmosMath.wave((psuedoTime * sineRate.x) % 1) * 2 - 1) * pseudoSinePowerX,
                             (CosmosMath.wave((psuedoTime * sineRate.y) % 1) * 2 - 1) * pseudoSinePowerY
                          )
                             .multiply(pseudoIntensity)
                             .add(pseudoCenterX, pseudoCenterY)
                             .subtract(this.position);

                          movement.rate -= (movement.rate - rate) / 8;
                          movement.time += movement.rate / 30;
                          movement.center.x -= (movement.center.x - center.x) / 8;
                          movement.center.y -= (movement.center.y - center.y) / 8;
                          movement.intensity -= (movement.intensity - intensity) / 8;
                          movement.sinePower.x -= (movement.sinePower.x - sinePower.x) / 8;
                          movement.sinePower.y -= (movement.sinePower.y - sinePower.y) / 8;

                          lastRate = rate;
                          lastCenterX = center.x;
                          lastCenterY = center.y;
                          lastIntensity = intensity;
                          lastSinePowerX = sinePower.x;
                          lastSinePowerY = sinePower.y;

                          const trueVelocity = new CosmosPoint(
                             (CosmosMath.wave((movement.time * sineRate.x) % 1) * 2 - 1) * movement.sinePower.x,
                             (CosmosMath.wave((movement.time * sineRate.y) % 1) * 2 - 1) * movement.sinePower.y
                          )
                             .multiply(movement.intensity)
                             .add(movement.center)
                             .subtract(this.position);

                          this.velocity.set(trueVelocity.subtract(trueVelocity.subtract(projectedVelocity).divide(4)));
                       }

                       if (battler.alive.length !== 0 && (mode === 'normal' || (mode === 'restore' && dingus > -1))) {
                          trueSpeed -= (trueSpeed - speed) / 4;
                          trueMultiplier -= (trueMultiplier - multiplier) / 4;
                          rot = Math.sin((meta.time = time + trueSpeed) / 6) * trueMultiplier * 30;
                       }

                       if (mode === 'ragdoll') {
                          if (lastmode === mode) {
                             fakegrav += 0.5;
                          } else {
                             fakegrav = 0.5;
                          }
                       } else if (mode === 'restore') {
                          lastmode === mode && dingus++;
                       }
                       lastmode === mode || (lastmode = mode);
                       for (const [ index, object ] of this.objects[0].objects.entries()) {
                          const state = states[index];
                          if (mode === 'ragdoll') {
                             const bottom = 300 - this.position.y - volatyle.container.position.y;
                             if (state.y < bottom) {
                                if (state.y + fakegrav < bottom) {
                                   state.y += fakegrav;
                                } else {
                                   state.y = bottom;
                                }
                                switch (index) {
                                   case 0:
                                      state.x++;
                                      state.r += 2;
                                      break;
                                   case 1:
                                      state.x += 2;
                                      state.r += 5;
                                      break;
                                   case 2:
                                      state.x -= 0.5;
                                      state.r -= 3;
                                      break;
                                   case 3:
                                      state.x -= 1.5;
                                      state.r -= 9;
                                      break;
                                }
                             } else if (state.y > bottom) {
                                state.y = bottom;
                             }
                          } else if (mode === 'random') {
                             const origin = base[index];
                             state.r = origin.r + Math.random() * 180 - 90;
                             state.x = origin.x + Math.random() * 20 - 10;
                             state.y = origin.y + Math.random() * 10 - 5;
                          } else if (mode === 'restore' && dingus > -1) {
                             const origin = base[index];
                             state.r -= (state.r - origin.r) / 4;
                             state.x -= (state.x - origin.x) / 4;
                             state.y -= (state.y - origin.y) / 4;
                          }
                          switch (index) {
                             case 0:
                                object.position.set(state.x, state.y);
                                object.rotation.value = state.r + -rot;
                                break;
                             case 1:
                                object.position.set(state.x, state.y - rot / 8);
                                object.rotation.value = state.r + rot / 2;
                                break;
                             case 2:
                                object.position.set(state.x, state.y);
                                object.rotation.value = state.r + rot / 3;
                                break;
                             case 3:
                                object.position.set(state.x + rot / 6, state.y - rot / 6);
                                object.rotation.value = state.r + rot;
                                break;
                          }
                       }
                       if (meta.mode === 'random') {
                          meta.mode = 'restore';
                          dingus = -5;
                       }
                    };
                 })()
              )
   }),
   moldsmal: new OutertaleOpponent({
      flirted: () => SAVE.data.b.flirt_moldsmal,
      assets: new CosmosInventory(content.ibcMoldsmal, content.ibbOctagon, content.ibbGelatin, content.asAppear),
      bullied: () => SAVE.data.b.bullied_moldsmal,
      bullyable: true,
      bully: () => {
         SAVE.data.b.bullied_moldsmal = true;
         world.bully();
      },
      exp: 3,
      hp: 50,
      df: 0,
      g: 6,
      name: () => text.b_opponent_moldsmal.name,
      metadata: { automusic: true },
      acts: () => [
         [
            'check',
            v =>
               world.goatbro
                  ? text.b_opponent_moldsmal.act_check0
                  : battler.hurt.includes(v)
                  ? text.b_opponent_moldsmal.act_check4
                  : v.flirted
                  ? text.b_opponent_moldsmal.act_check3
                  : v.sparable
                  ? text.b_opponent_moldsmal.act_check2
                  : text.b_opponent_moldsmal.act_check
         ],
         [ 'pat', text.b_opponent_moldsmal.act_imitate ],
         [
            'slap',
            v =>
               v.vars.afraid || battler.hurt.includes(v)
                  ? text.b_opponent_moldsmal.act_slap3
                  : world.meanie || v.hp < v.opponent.hp
                  ? text.b_opponent_moldsmal.act_slap2
                  : text.b_opponent_moldsmal.act_slap
         ],
         [ 'flirt', text.b_opponent_moldsmal.act_flirt ]
      ],
      handler: battler.opponentHandler({
         kill: () => world.kill(),
         defaultTalk: () => [
            text.b_opponent_moldsmal.idleTalk1,
            text.b_opponent_moldsmal.idleTalk2,
            text.b_opponent_moldsmal.idleTalk3
         ],
         defaultStatus: () => [
            () => text.b_opponent_moldsmal.status2(),
            () => text.b_opponent_moldsmal.status3(),
            () => text.b_opponent_moldsmal.status4(),
            () => text.b_opponent_moldsmal.status5()
         ],
         bubble: position => [ position.add(28, -54), battler.bubbles.dummy ],
         item: {
            async epiphany (state) {
               state.talk = [];
               await epiphany(
                  state.target,
                  state.volatile,
                  160,
                  {
                     befriend: () => (SAVE.data.b.spared_moldsmal = true),
                     flirt: () => (SAVE.data.b.flirt_moldsmal = true)
                  },
                  battler.bubbles.dummy,
                  () => state.volatile.container.position.add(28, -54),
                  text.b_opponent_moldsmal.epiphany
               );
            }
         },
         act: {
            flirt (state) {
               state.volatile.flirted = true;
               SAVE.data.b.flirt_moldsmal = true;
               state.talk = text.b_opponent_moldsmal.sexyChat;
            },
            async slap ({ volatile, target }) {
               if (volatile.vars.afraid || battler.hurt.includes(volatile)) {
                  oops();
                  volatile.sparable = true;
                  battler.spare(target);
               } else if (world.meanie || volatile.hp < volatile.opponent.hp) {
                  volatile.sparable = true;
                  volatile.vars.afraid = true;
               }
            }
         },
         postact (state, act) {
            if (act === 'flirt' || act === 'pat') {
               SAVE.data.b.spared_moldsmal = true;
               state.pacify = true;
               state.volatile.sparable = true;
            }
         },
         async postfight (state) {
            if (state.dead) {
               await kiddReaction('moldsmal');
            }
         },
         async postchoice (state) {
            if (!state.dead) {
               if (state.choice.type === 'spare' && !state.volatile.alive && !state.volatile.sparable) {
                  await kiddReactionBully('moldsmal');
               } else {
                  await kiddHandler(state, 'moldsmal');
               }
            }
         },
         prestatus (state) {
            battler.hurt.includes(state.volatile) && (state.status = () => text.b_opponent_moldsmal.perilStatus);
         }
      }),
      goodbye: () => new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcMoldsmal ] }),
      sprite () {
         const time = renderer.time;
         return new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcMoldsmal ] }).on('tick', function () {
            this.scale.y = 0.9 + CosmosMath.wave(((renderer.time - time) % 3000) / 3000) * 0.1;
         });
      }
   }),
   spacetop: new OutertaleOpponent({
      flirted: () => SAVE.data.b.flirt_spacetop,
      assets: new CosmosInventory(
         content.ibcSpacetop,
         content.ibcSpacetopHurt,
         content.ibcSpacetopCrystal,
         content.ibbLithium,
         content.asBomb,
         content.asGrab
      ),
      bullied: () => SAVE.data.b.bullied_spacetop,
      bullyable: true,
      bully: () => {
         SAVE.data.b.bullied_spacetop = true;
         world.bully();
      },
      exp: 17,
      hp: 48,
      df: 0,
      g: 12,
      name: () => text.b_opponent_spacetop.name,
      metadata: { automusic: true },
      acts: () => [
         [
            'check',
            v =>
               world.goatbro
                  ? text.b_opponent_spacetop.act_check()
                  : battler.hurt.includes(v)
                  ? text.b_opponent_spacetop.act_check4
                  : v.sparable
                  ? v.flirted
                     ? text.b_opponent_spacetop.act_check3
                     : text.b_opponent_spacetop.act_check2
                  : text.b_opponent_spacetop.act_check()
         ],
         [ 'compliment', text.b_opponent_spacetop.act_compliment ],
         [ 'create', text.b_opponent_spacetop.act_create ],
         [ 'steal', [] ],
         [ 'flirt', text.b_opponent_spacetop.act_flirt ]
      ],
      sparable: false,
      handler: ((
         talk: (target: number, ...lines: string[]) => Promise<void>,
         vars: CosmosKeyed,
         defaultStatus: () => () => string[]
      ) => {
         return async (choice, target, volatile) => {
            async function doIdle () {
               await talk(
                  target,
                  ...[
                     text.b_opponent_spacetop.idleTalk1,
                     text.b_opponent_spacetop.idleTalk2,
                     text.b_opponent_spacetop.idleTalk3,
                     text.b_opponent_spacetop.idleTalk4,
                     text.b_opponent_spacetop.idleTalk5
                  ][rng.dialogue.int(5)]
               );
            }
            if (choice.type === 'none') {
               await doIdle();
               return;
            }
            let idle = true;
            let justice = false;
            let statustext = defaultStatus;
            for (const key in vars) {
               volatile.vars[key] ||= vars[key];
            }
            const sparing = battler.sparing(choice);
            let idler = null as Promise<void> | null;
            choice.type === 'fight' ||
               choice.type === 'act' ||
               choice.type === 'item' ||
               sparing ||
               (idler = battler.idle(volatile));
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
                        idler = battler.idle(volatile);
                        break;
                     case 'compliment':
                        idler = battler.idle(volatile);
                        idle = false;
                        await talk(
                           target,
                           ...[ text.b_opponent_spacetop.complimentTalk1, text.b_opponent_spacetop.complimentTalk2 ][
                              rng.dialogue.int(2)
                           ]
                        );
                        break;
                     case 'steal':
                        idle = false;
                        await battler.human(...text.b_opponent_spacetop.act_steal());
                        if (battler.hurt.includes(volatile)) {
                           sounds.grab.instance(renderer);
                           volatile.alive = false;
                           volatile.container.alpha.value = 0;
                           const index = battler.add(opponents.space, volatile.container.position.value());
                           const vola = battler.volatile[index];
                           vola.vars.tookit = true;
                           dropShake(vola.container.position, false);
                           statustext = () => () => text.b_opponent_space.randStatus1;
                           justice = true;
                           await renderer.pause(1000);
                           idler = battler.idle(volatile);
                        } else {
                           idler = battler.idle(volatile);
                           await talk(
                              target,
                              ...[ text.b_opponent_spacetop.stealTalk1, text.b_opponent_spacetop.stealTalk2 ][
                                 rng.dialogue.int(2)
                              ]
                           );
                        }
                        break;
                     case 'create':
                        idle = false;
                        switch (volatile.vars.create++) {
                           case 0:
                              idler = battler.idle(volatile);
                              await talk(
                                 target,
                                 ...[ text.b_opponent_spacetop.createTalk1, text.b_opponent_spacetop.createTalk2 ][
                                    rng.dialogue.int(2)
                                 ]
                              );
                              statustext = () => () => text.b_opponent_spacetop.createStatus1();
                              break;
                           case 1:
                              idler = battler.idle(volatile);
                              await talk(
                                 target,
                                 ...[
                                    text.b_opponent_spacetop.createTalk3,
                                    text.b_opponent_spacetop.createTalk4,
                                    text.b_opponent_spacetop.createTalk5
                                 ][rng.dialogue.int(3)]
                              );
                              statustext = () => () => text.b_opponent_spacetop.createStatus2();
                              SAVE.data.b.spared_spacetop = true;
                              if (!volatile.sparable) {
                                 volatile.sparable = true;
                              }
                              break;
                           case 2:
                              volatile.sparable = true;
                              battler.spare(target);
                              return;
                        }
                        break;
                     case 'flirt':
                        idler = battler.idle(volatile);
                        idle = false;
                        if (volatile.vars.create < 2) {
                           await talk(target, ...text.b_opponent_spacetop.flirtTalk1);
                           statustext = () => () => text.b_opponent_spacetop.flirtStatus1;
                        } else {
                           volatile.flirted = true;
                           SAVE.data.b.flirt_spacetop = true;
                           await talk(target, ...text.b_opponent_spacetop.flirtTalk2);
                           statustext = () => () => text.b_opponent_spacetop.flirtStatus2;
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
                        {
                           befriend: () => (SAVE.data.b.spared_spacetop = true),
                           flirt: () => (SAVE.data.b.flirt_spacetop = true)
                        },
                        battler.bubbles.dummy,
                        () =>
                           volatile.container.position.subtract(
                              new CosmosPoint({ x: 140, y: 120 }).subtract({ x: 163, y: 66 })
                           ),
                        text.b_opponent_spacetop.epiphany
                     );
                     battler.alive.length !== 0 && (await battler.idle(volatile));
                     return;
                  }
                  idler = battler.idle(volatile);
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
               sparing || (await doIdle());
            }
            if (justice) {
               await talk(target, ...text.b_opponent_spacetop.justiceTalk);
            } else if (battler.hurt.includes(volatile)) {
               statustext = () => () => text.b_opponent_spacetop.hurtStatus();
            }
            battler.status = statustext();
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
         { create: 0 },
         () =>
            world.goatbro
               ? () => text.b_opponent_spacetop.genoStatus
               : [
                    () => text.b_opponent_spacetop.randStatus1,
                    () => text.b_opponent_spacetop.randStatus2,
                    () => text.b_opponent_spacetop.randStatus3,
                    () => text.b_opponent_spacetop.randStatus4
                 ][rng.dialogue.int(4)]
      ),
      goodbye: () =>
         new CosmosSprite({
            anchor: { y: 1, x: 0 },
            frames: [ content.ibcSpacetopHurt ]
         }),
      sprite: () =>
         new CosmosAnimation({
            active: true,
            anchor: { y: 1, x: 0 },
            resources: content.ibcSpacetop
         })
   }),
   space: new OutertaleOpponent({
      bullied: () => SAVE.data.b.bullied_spacetop,
      bullyable: true,
      bully: () => {
         SAVE.data.b.bullied_spacetop = true;
         world.bully();
      },
      exp: 25,
      hp: 48,
      df: -100,
      g: 12,
      name: () => text.b_opponent_space.name,
      metadata: { automusic: true },
      acts: () => [
         [ 'check', text.b_opponent_space.act_check ],
         [ 'reassure', text.b_opponent_space.act_reassure ]
      ],
      sparable: false,
      handler: ((
         talk: (target: number, ...lines: string[]) => Promise<void>,
         vars: CosmosKeyed,
         defaultStatus: () => () => string[]
      ) => {
         return async (choice, target, volatile) => {
            let statustext = defaultStatus;
            async function doIdle () {
               if (volatile.vars.happy) {
                  statustext = () => () => text.b_opponent_space.happyStatus;
                  await talk(
                     target,
                     ...[
                        text.b_opponent_space.happyTalk1,
                        text.b_opponent_space.happyTalk2,
                        text.b_opponent_space.happyTalk3,
                        text.b_opponent_space.happyTalk4
                     ][rng.dialogue.int(4)]
                  );
               } else {
                  await talk(
                     target,
                     ...[
                        text.b_opponent_space.idleTalk1,
                        text.b_opponent_space.idleTalk2,
                        text.b_opponent_space.idleTalk3,
                        text.b_opponent_space.idleTalk4
                     ][rng.dialogue.int(4)]
                  );
               }
            }
            if (choice.type === 'none') {
               volatile.vars.tookit || (await doIdle());
               return;
            }
            for (const key in vars) {
               volatile.vars[key] ||= vars[key];
            }
            volatile.vars.tookit = false;
            const sparing = battler.sparing(choice);
            let idler = null as Promise<void> | null;
            choice.type === 'fight' || choice.type === 'item' || sparing || (idler = battler.idle(volatile));
            switch (choice.type) {
               case 'item':
                  if (choice.item === 'epiphany') {
                     await epiphany(
                        target,
                        volatile,
                        160,
                        {
                           befriend: () => (SAVE.data.b.spared_spacetop = true),
                           flirt: () => (SAVE.data.b.flirt_spacetop = true)
                        },
                        battler.bubbles.dummy,
                        () =>
                           volatile.container.position.subtract(
                              new CosmosPoint({ x: 140, y: 120 }).subtract({ x: 163, y: 66 })
                           ),
                        text.b_opponent_space.epiphany
                     );
                     battler.alive.length !== 0 && (await battler.idle(volatile));
                     return;
                  }
                  idler = battler.idle(volatile);
                  break;
               case 'fight':
                  if (await battler.attack(volatile, { power: choice.score })) {
                     world.kill();
                     await battler.idle(volatile);
                     return;
                  }
                  idler = battler.idle(volatile);
                  break;
               case 'act':
                  if (choice.act === 'reassure') {
                     volatile.vars.happy = true;
                     SAVE.data.b.spared_spacetop = true;
                     if (!volatile.sparable) {
                        volatile.sparable = true;
                     }
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
            battler.status = statustext();
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
               ? () => text.b_opponent_space.genoStatus
               : [ () => text.b_opponent_space.randStatus1, () => text.b_opponent_space.randStatus2 ][rng.dialogue.int(2)]
      ),
      sprite: () => new CosmosSprite({ anchor: { y: 1, x: 0 }, frames: [ content.ibcSpacetopCrystal ] })
   })
};

for (const [ key, value ] of Object.entries(opponents)) {
   value.assets.name = `opponents::${key}`;
}

battler.opponentRegistry.register(opponents);

export default opponents;

CosmosUtils.status(`LOAD MODULE: COMMON OPPONENTS (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
