import { AlphaFilter, Rectangle } from 'pixi.js';
import text from '../../languages/default/text/starton';
import {
   autoMusic,
   defaultSetup,
   endMusic,
   resetBox,
   spareFlee,
   standardMusic,
   standardPos,
   standardSize
} from '../common/api';
import commonOpponents from '../common/opponents';
import commonPatterns from '../common/patterns';
import { content, filters, music } from '../systems/assets';
import { atlas, events, renderer, rng } from '../systems/core';
import { battler, selectElement, world } from '../systems/framework';
import { OutertaleGroup } from '../systems/outertale';
import { SAVE } from '../systems/save';
import { CosmosInventory, CosmosSprite, CosmosUtils } from '../systems/storyteller';
import { papreal } from './extras';
import opponents from './opponents';
import patterns from './patterns';

export function saveJerry () {
   if (SAVE.data.b.spared_jerry) {
      for (const volatile of battler.volatile) {
         if (volatile.opponent === opponents.jerry) {
            volatile.sparable = true;
         }
      }
   }
}

export function active0S () {
   switch (battler.alive[0].opponent) {
      case opponents.stardrake:
         return 'stardrake';
      case commonOpponents.spacetop:
         return 'spacetop';
      case opponents.dogaressa:
         return 'dogaressa';
      case opponents.dogamy:
         return 'dogamy';
   }
}

const groups = {
   stardrake: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1, content.amBattle2),
      id: 10,
      init () {
         battler.grid = content.ibuGrid1;
         battler.status = () =>
            world.goatbro ? text.b_opponent_stardrake.genoStatus() : text.b_opponent_stardrake.status1();
         standardMusic();
         return true;
      },
      handler: defaultSetup(() => {
         patterns.stardrake();
         return battler.turnTimer(7000);
      }),
      opponents: [ [ opponents.stardrake, { x: 135, y: 120 } ] ]
   }),

   mouse: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1, content.amBattle2),
      id: 11,
      init () {
         battler.grid = content.ibuGrid1;
         battler.status = () => (world.goatbro ? text.b_opponent_mouse.genoStatus : text.b_opponent_mouse.status1);
         standardMusic();
         return true;
      },
      handler: defaultSetup(
         async (c, t, v) => {
            if (v.sparable) {
               await renderer.pause(450);
            } else {
               patterns.mouse();
               return battler.turnTimer(7000);
            }
         },
         { y: 100, x: 100 },
         true
      ),
      opponents: [ [ opponents.mouse, { x: 135, y: 120 } ] ]
   }),

   jerry: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1, content.amBattle2),
      id: 12,
      init () {
         battler.grid = content.ibuGrid1;
         battler.status = () => (world.goatbro ? text.b_opponent_jerry.genoStatus : text.b_opponent_jerry.status1);
         standardMusic();
         saveJerry();
         return true;
      },
      handler: defaultSetup(() => renderer.pause(SAVE.data.b.spared_jerry ? 225 : 900)),
      opponents: [ [ opponents.jerry, { x: 135, y: 120 } ] ]
   }),

   stardrakeSpacetop: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1, content.amBattle2),
      id: 13,
      init () {
         battler.multitext.active = true;
         battler.grid = content.ibuGrid1;
         battler.status = () => text.b_group_starton.stardrakeSpacetop();
         standardMusic();
         return true;
      },
      async handler (choice) {
         if (spareFlee(choice)) {
            return;
         }
         if (battler.alive.length !== 0) {
            const vars = battler.volatile[0].vars;
            if (battler.alive.length < (vars.enemies || 2)) {
               if (battler.opponents[0] === commonOpponents.space) {
                  battler.status = () => text.b_group_starton.stardrakeSpacetop2c();
               } else if (battler.opponents[0] === commonOpponents.spacetop) {
                  battler.status = () => text.b_group_starton.stardrakeSpacetop2b();
               } else {
                  battler.status = () => text.b_group_starton.stardrakeSpacetop2a();
               }
            }
            vars.enemies = battler.alive.length;
            await battler.resume(async () => {
               await standardSize();
               standardPos();
               autoMusic();
               const spacetop = battler.opponents.includes(commonOpponents.spacetop);
               const stardrake = battler.opponents.includes(opponents.stardrake);
               if (spacetop || stardrake) {
                  const r = stardrake ? battler.pattern('stardrake', [ 0, 1 ]) : void 0;
                  stardrake && patterns.stardrake(r, spacetop);
                  spacetop && commonPatterns.spacetop(r === void 0 ? void 0 : r, stardrake);
                  await battler.turnTimer(7000);
               } else {
                  await renderer.pause(450);
               }
               await resetBox();
            });
         } else {
            endMusic();
         }
      },
      opponents: [
         [ opponents.stardrake, { x: 85, y: 120 } ],
         [ commonOpponents.spacetop, { x: 185, y: 120 } ]
      ]
   }),

   spacetopJerry: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1, content.amBattle2),
      id: 14,
      init () {
         battler.multitext.active = true;
         battler.grid = content.ibuGrid1;
         battler.status = () => text.b_group_starton.spacetopJerry();
         standardMusic();
         saveJerry();
         return true;
      },
      async handler (choice) {
         if (spareFlee(choice)) {
            return;
         }
         if (battler.alive.length !== 0) {
            const vars = battler.volatile[0].vars;
            if (battler.alive.length < (vars.enemies || 2)) {
               if (battler.opponents[0] === commonOpponents.space) {
                  battler.status = () => text.b_group_starton.stardrakeSpacetop2c();
               } else if (battler.opponents[0] === commonOpponents.spacetop) {
                  battler.status = () => text.b_group_starton.stardrakeSpacetop2b();
               } else {
                  battler.status = () => text.b_group_starton.stardrakeSpacetop2d();
               }
            }
            vars.enemies = battler.alive.length;
            await battler.resume(async () => {
               await standardSize();
               standardPos();
               autoMusic();
               const spacetop = battler.opponents.includes(commonOpponents.spacetop);
               const jerry = battler.opponents.includes(opponents.jerry);
               if (spacetop) {
                  commonPatterns.spacetop();
                  await battler.turnTimer(7000 + (jerry ? (SAVE.data.b.spared_jerry ? -2000 : 2000) : 0));
               } else {
                  await renderer.pause(jerry ? (SAVE.data.b.spared_jerry ? 225 : 900) : 450);
               }
               await resetBox();
            });
         } else {
            endMusic();
         }
      },
      opponents: [
         [ commonOpponents.spacetop, { x: 85, y: 120 } ],
         [ opponents.jerry, { x: 185, y: 120 } ]
      ]
   }),

   stardrakeSpacetopJerry: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1, content.amBattle2),
      id: 15,
      init () {
         battler.multitext.active = true;
         battler.grid = content.ibuGrid1;
         battler.status = () => text.b_group_starton.stardrakeSpacetopJerry();
         standardMusic();
         saveJerry();
         return true;
      },
      async handler (choice) {
         if (spareFlee(choice)) {
            return;
         }
         if (battler.alive.length !== 0) {
            const vars = battler.volatile[0].vars;
            if (battler.alive.length < (vars.enemies || 3)) {
               if (battler.alive.length === 1) {
                  if (battler.opponents[0] === commonOpponents.space) {
                     battler.status = () => text.b_group_starton.stardrakeSpacetop2c();
                  } else if (battler.opponents[0] === commonOpponents.spacetop) {
                     battler.status = () => text.b_group_starton.stardrakeSpacetop2b();
                  } else if (battler.opponents.includes(opponents.jerry)) {
                     battler.status = () => text.b_group_starton.stardrakeSpacetop2d();
                  } else {
                     battler.status = () => text.b_group_starton.stardrakeSpacetop2a();
                  }
               } else if (battler.opponents.includes(opponents.jerry)) {
                  if (battler.opponents.includes(opponents.stardrake)) {
                     battler.status = () => text.b_group_starton.stardrakeSpacetopJerry2c();
                  } else {
                     battler.status = () => text.b_group_starton.stardrakeSpacetopJerry2b();
                  }
               } else {
                  battler.status = () => text.b_group_starton.stardrakeSpacetopJerry2a();
               }
            }
            vars.enemies = battler.alive.length;
            await battler.resume(async () => {
               await standardSize();
               standardPos();
               autoMusic();
               const spacetop = battler.opponents.includes(commonOpponents.spacetop);
               const stardrake = battler.opponents.includes(opponents.stardrake);
               const jerry = battler.opponents.includes(opponents.jerry);
               if (spacetop || stardrake) {
                  const r = stardrake ? battler.pattern('stardrake', [ 0, 1 ]) : void 0;
                  stardrake && patterns.stardrake(r, spacetop);
                  spacetop && commonPatterns.spacetop(r === void 0 ? void 0 : r, stardrake);
                  await battler.turnTimer(7000 + (jerry ? (SAVE.data.b.spared_jerry ? -2000 : 2000) : 0));
               } else {
                  await renderer.pause(jerry ? (SAVE.data.b.spared_jerry ? 225 : 900) : 450);
               }
               await resetBox();
            });
         } else {
            endMusic();
         }
      },
      opponents: [
         [ opponents.stardrake, { x: 35, y: 120 } ],
         [ opponents.jerry, { x: 135, y: 120 } ],
         [ commonOpponents.spacetop, { x: 235, y: 120 } ]
      ]
   }),

   doggo: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1, content.amBattle2, content.amShock),
      init () {
         battler.flee = false;
         battler.grid = content.ibuGrid1;
         battler.status = () => text.b_opponent_doggo.status1();
         battler.volatile[0].vars.wan = false;
         if (world.genocide) {
            battler.music = music.shock.instance(renderer);
         } else {
            standardMusic();
         }
         return true;
      },
      opponents: [ [ opponents.doggo, { x: 160, y: 120 } ] ]
   }),

   lesserdog: new OutertaleGroup({
      assets: new CosmosInventory(content.amDogsong, content.amShock),
      init () {
         battler.flee = false;
         battler.grid = content.ibuGrid1;
         battler.status = () => text.b_opponent_lesserdog.status0();
         battler.volatile[0].vars.hurt1 = false;
         battler.volatile[0].vars.hurt2 = false;
         battler.volatile[0].vars.statustext = [ () => text.b_opponent_lesserdog.status0 ];
         const ba = atlas.navigators.of('battlerAdvanced');
         ba.objects[3].area = new Rectangle(0, 200 * 2, 320 * 2, 40 * 2);
         ba.objects[3].filters = [ filters.outline ];
         events.on('battle-exit').then(() => {
            ba.objects[3].area = null;
            ba.objects[3].filters = null;
         });
         const mus = world.genocide ? music.shock.instance(renderer) : music.dogsong.instance(renderer);
         battler.music = mus;
         return true;
      },
      opponents: [ [ opponents.lesserdog, { x: 122.5, y: 120 } ] ]
   }),

   dogs: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1, content.amBattle2, content.amShock),
      init () {
         battler.multitext.active = true;
         battler.flee = false;
         battler.grid = content.ibuGrid1;
         battler.status = () => text.b_group_starton.dogs();
         if (world.genocide) {
            battler.music = music.shock.instance(renderer);
         } else {
            standardMusic();
         }
         const vola = battler.volatile[0];
         const dao = vola.container.position.value();
         const dogamyaxe = (vola.vars.dogamyaxe = new CosmosSprite({
            anchor: { y: 1 },
            frames: [ content.ibcDogsAxe ],
            position: dao,
            priority: 200
         }).on('tick', function () {
            const spr = vola.container.objects[0];
            this.position.x = dao.x + spr.position.x;
         }));
         battler.garbage.push([ battler.overlay, dogamyaxe ]);
         battler.overlay.attach(dogamyaxe);
         return true;
      },
      async handler (choice, target, volatile) {
         const GV = battler.volatile[0].vars;
         let statustext = GV.fetch
            ? GV.dogamy && GV.dogaressa
               ? [ () => text.b_opponent_dogamy.fetchStatusX ]
               : [ () => text.b_opponent_dogamy.fetchStatus ]
            : GV.dogamy && GV.dogaressa
            ? [ () => text.b_opponent_dogamy.petStatus() ]
            : [
                 () => text.b_opponent_dogamy.status1(),
                 () => text.b_opponent_dogamy.status2(),
                 () => text.b_opponent_dogamy.status3(),
                 () => text.b_opponent_dogamy.status4()
              ];
         let monstertext1 = (
            GV.fetch || (GV.dogamy && GV.dogaressa)
               ? [ text.b_opponent_dogamy.otherPet ]
               : [
                    text.b_opponent_dogamy.randTalk1(),
                    text.b_opponent_dogamy.randTalk2(),
                    text.b_opponent_dogamy.randTalk3(),
                    text.b_opponent_dogamy.randTalk4()
                 ]
         ) as string[][] | null;
         let monstertext2 = (
            GV.fetch || (GV.dogamy && GV.dogaressa)
               ? [ text.b_opponent_dogaressa.otherPet ]
               : [
                    text.b_opponent_dogaressa.randTalk1(),
                    text.b_opponent_dogaressa.randTalk2(),
                    text.b_opponent_dogaressa.randTalk3(),
                    text.b_opponent_dogaressa.randTalk4()
                 ]
         ) as string[][] | null;
         if (battler.alive.length < 2) {
            if (volatile.opponent === opponents.dogamy) {
               statustext = [ () => text.b_opponent_dogaressa.loneStatus() ];
               monstertext1 = [ text.b_opponent_dogamy.loneTalk1, text.b_opponent_dogamy.loneTalk2 ];
               monstertext2 = null;
            } else {
               statustext = [ () => text.b_opponent_dogamy.loneStatus() ];
               monstertext1 = null;
               monstertext2 = [ text.b_opponent_dogaressa.loneTalk1, text.b_opponent_dogaressa.loneTalk2 ];
            }
         }
         GV.sequence || (GV.sequence = 0);
         switch (choice.type) {
            case 'fight':
               for (const oppo of battler.alive) {
                  oppo.container.objects[0].reset();
               }
               const isDogamy = volatile.opponent === opponents.dogamy;
               if (
                  await battler.attack(
                     volatile,
                     volatile.sparable
                        ? { power: 0, operation: 'multiply' }
                        : {
                             power: choice.score,
                             multiplier: battler.alive.length < 2 ? (isDogamy ? 2 : 0.5) : 1
                          },
                     isDogamy,
                     isDogamy
                  )
               ) {
                  opponents.dogamy.bullyable = false;
                  opponents.dogaressa.bullyable = false;
                  if (isDogamy) {
                     await Promise.all([
                        battler.vaporize(volatile.container.objects[0]),
                        battler.vaporize(GV.dogamyaxe)
                     ]);
                     if (battler.alive.length === 0) {
                        events.fire('victory');
                     }
                  }
                  GV.dogamy = false;
                  GV.dogaressa = false;
                  GV.fetch = false;
                  SAVE.data.n.state_starton_dogs = 2;
                  for (const oppo of battler.alive) {
                     oppo.sparable = false;
                  }
                  if (volatile.opponent === opponents.dogamy) {
                     statustext = [ () => text.b_opponent_dogamy.loneStatus() ];
                     monstertext2 = [ text.b_opponent_dogaressa.loneTalk1, text.b_opponent_dogaressa.loneTalk2 ];
                  } else {
                     statustext = [ () => text.b_opponent_dogaressa.loneStatus() ];
                     monstertext1 = [ text.b_opponent_dogamy.loneTalk1, text.b_opponent_dogamy.loneTalk2 ];
                  }
                  if (battler.alive.length === 0) {
                     battler.music?.stop();
                     return;
                  }
               } else {
                  if (battler.hurt.length === 2) {
                     opponents.dogamy.bullyable = true;
                     opponents.dogaressa.bullyable = true;
                  }
                  if (battler.alive.length > 1) {
                     if (volatile.opponent === opponents.dogamy) {
                        monstertext1 = [
                           !GV.fetch && GV.sequence < 2
                              ? text.b_opponent_dogamy.petTalk1
                              : text.b_opponent_dogamy.petTalk1x
                        ];
                        monstertext2 = [ text.b_opponent_dogaressa.petTalk1 ];
                     } else {
                        monstertext1 = [ text.b_opponent_dogamy.petTalk3 ];
                        monstertext2 = [ text.b_opponent_dogaressa.petTalk3 ];
                     }
                     for (const oppo of battler.alive) {
                        oppo.container.objects[0].enable();
                     }
                  }
               }
               break;
            case 'item':
               if (choice.item === 'spanner') {
                  if (battler.alive.length < 2 || world.genocide) {
                     if (volatile.opponent === opponents.dogamy) {
                        await battler.human(...text.b_opponent_dogamy.fetchTextLone());
                     } else {
                        await battler.human(...text.b_opponent_dogaressa.fetchTextLone());
                     }
                     SAVE.storage.inventory.remove('spanner');
                  } else {
                     await battler.human(...text.b_opponent_dogamy.fetchText);
                     GV.fetch = true;
                     monstertext1 =
                        GV.dogamy && GV.dogaressa
                           ? [ text.b_opponent_dogamy.fetchTalkX ]
                           : [ text.b_opponent_dogamy.fetchTalk ];
                     monstertext2 =
                        GV.dogamy && GV.dogaressa
                           ? [ text.b_opponent_dogaressa.fetchTalkX ]
                           : [ text.b_opponent_dogaressa.fetchTalk ];
                     statustext =
                        GV.dogamy && GV.dogaressa
                           ? [ () => text.b_opponent_dogamy.fetchStatusX ]
                           : [ () => text.b_opponent_dogamy.fetchStatus ];
                     SAVE.data.n.state_starton_dogs = 1;
                     for (const oppo of battler.alive) {
                        oppo.sparable = true;
                     }
                  }
               }
               break;
            case 'act':
               switch (choice.act) {
                  case 'flirt':
                     if (battler.alive.length < 2) {
                        if (volatile.opponent === opponents.dogamy) {
                           await battler.human(...text.b_opponent_dogamy.flirtTextLone);
                        } else {
                           await battler.human(...text.b_opponent_dogaressa.flirtTextLone);
                        }
                     } else if (volatile.opponent === opponents.dogamy) {
                        if (GV.sequence < 2) {
                           monstertext1 = [ text.b_opponent_dogamy.flirtTalk1 ];
                           monstertext2 = [ text.b_opponent_dogaressa.flirtTalk1 ];
                        } else {
                           SAVE.data.b.flirt_dogamy = true;
                           volatile.flirted = true;
                           monstertext1 = [ text.b_opponent_dogamy.flirtTalk2 ];
                           monstertext2 = [ text.b_opponent_dogaressa.flirtTalk2 ];
                        }
                        await battler.human(...text.b_opponent_dogamy.flirtText);
                     } else {
                        if (GV.sequence < 2) {
                           monstertext1 = [ text.b_opponent_dogamy.flirtTalk3 ];
                           monstertext2 = [ text.b_opponent_dogaressa.flirtTalk3 ];
                        } else {
                           SAVE.data.b.flirt_dogaressa = true;
                           volatile.flirted = true;
                           monstertext1 = [ text.b_opponent_dogamy.flirtTalk4 ];
                           monstertext2 = [ text.b_opponent_dogaressa.flirtTalk4 ];
                        }
                        await battler.human(...text.b_opponent_dogaressa.flirtText);
                     }
                     break;
                  case 'roll':
                     if (battler.alive.length < 2) {
                        if (volatile.opponent === opponents.dogamy) {
                           await battler.human(...text.b_opponent_dogamy.rollTextLone());
                        } else {
                           await battler.human(...text.b_opponent_dogaressa.rollTextLone());
                        }
                     } else {
                        if (GV.sequence < 1) {
                           await battler.human(...text.b_opponent_dogamy.rollText());
                           GV.sequence = 1;
                        } else {
                           await battler.human(...text.b_opponent_dogamy.rollText2);
                        }
                        if (!GV.fetch) {
                           battler.status = () => text.b_opponent_dogamy.rollStatus();
                        }
                     }
                     break;
                  case 'resniff':
                     if (battler.alive.length < 2) {
                        if (volatile.opponent === opponents.dogamy) {
                           monstertext1 = [ text.b_opponent_dogamy.otherPet ];
                           await battler.human(...text.b_opponent_dogamy.resmellTextLone);
                        } else {
                           monstertext2 = [ text.b_opponent_dogaressa.resmellTalkLone ];
                           await battler.human(...text.b_opponent_dogaressa.resmellTextLone);
                        }
                     } else if (GV.fetch) {
                        await battler.human(...text.b_opponent_dogamy.resmellTextFetch);
                     } else if (GV.sequence < 1) {
                        monstertext1 = [ text.b_opponent_dogamy.smellTalk1 ];
                        monstertext2 = [ text.b_opponent_dogaressa.smellTalk1 ];
                        await battler.human(...text.b_opponent_dogamy.resmellText1);
                     } else if (GV.dogamy && GV.dogaressa) {
                        monstertext1 = [ text.b_opponent_dogamy.smellTalk3 ];
                        monstertext2 = [ text.b_opponent_dogaressa.smellTalk3 ];
                     } else {
                        monstertext1 = [ text.b_opponent_dogamy.smellTalk2 ];
                        monstertext2 = [ text.b_opponent_dogaressa.smellTalk2 ];
                        if (GV.sequence < 2) {
                           GV.sequence = 2;
                           await battler.human(...text.b_opponent_dogamy.resmellText2);
                        } else {
                           await battler.human(...text.b_opponent_dogamy.resmellText3);
                        }
                     }
                     break;
                  case 'pet': {
                     const dd = GV.dogamy && GV.dogaressa;
                     if (battler.alive.length < 2) {
                        if (volatile.opponent === opponents.dogamy) {
                           await battler.human(...text.b_opponent_dogamy.petTextLone);
                        } else {
                           await battler.human(...text.b_opponent_dogaressa.petTextLone);
                        }
                     } else if (!GV.fetch && GV.sequence < 2) {
                        if (volatile.opponent === opponents.dogamy) {
                           monstertext1 = [ text.b_opponent_dogamy.petTalk1 ];
                           monstertext2 = [ text.b_opponent_dogaressa.petTalk1 ];
                        } else {
                           monstertext1 = [ text.b_opponent_dogamy.petTalk3 ];
                           monstertext2 = [ text.b_opponent_dogaressa.petTalk3 ];
                        }
                        await battler.human(...text.b_opponent_dogamy.susText);
                     } else if (!dd) {
                        if (volatile.opponent === opponents.dogamy) {
                           GV.dogamy = true;
                           statustext = [ () => text.b_opponent_dogamy.petNeedStatus() ];
                           monstertext1 = [ text.b_opponent_dogamy.petTalk2 ];
                           if (GV.dogaressa) {
                              monstertext2 = [ text.b_opponent_dogaressa.otherPet ];
                           } else {
                              monstertext2 = [ text.b_opponent_dogaressa.petTalk2 ];
                           }
                           await battler.human(...text.b_opponent_dogamy.petText);
                        } else {
                           GV.dogaressa = true;
                           statustext = [ () => text.b_opponent_dogaressa.petNeedStatus() ];
                           if (GV.dogamy) {
                              monstertext1 = [ text.b_opponent_dogamy.otherPet ];
                           } else {
                              monstertext1 = [ text.b_opponent_dogamy.petTalk4 ];
                           }
                           monstertext2 = [ text.b_opponent_dogaressa.petTalk4 ];
                           await battler.human(...text.b_opponent_dogaressa.petText);
                        }
                        if (GV.dogamy && GV.dogaressa) {
                           statustext = [ () => text.b_opponent_dogamy.petStatus() ];
                           for (const oppo of battler.alive) {
                              oppo.sparable = true;
                           }
                        }
                     } else {
                        monstertext1 = [ text.b_opponent_dogamy.petTalk5 ];
                        monstertext2 = [ text.b_opponent_dogaressa.petTalk5 ];
                     }
                     break;
                  }
               }
               break;
            case 'spare':
               if (battler.bullied.includes(volatile)) {
                  SAVE.data.n.state_starton_dogs = 3;
               } else if (!volatile.sparable) {
                  break;
               }
               battler.overlay.area = renderer.area;
               battler.overlay.filters = [ new AlphaFilter(0.5) ];
               battler.spare(void 0, void 0, void 0, void 0, void 0, void 0, true);
               endMusic();
               return;
         }
         let randtext = 0;
         if (monstertext1 || monstertext2) {
            randtext = (monstertext1?.length ?? 0) > 1 && (monstertext2?.length ?? 0) > 1 ? rng.dialogue.next() : 0;
         }
         battler.alive.length < 2 && (battler.alive[0].container.objects[0].metadata.alt = true);
         await Promise.all([
            monstertext1 &&
               battler.opponents.includes(opponents.dogamy) &&
               battler.monster(
                  false,
                  { x: 45, y: 32 },
                  battler.bubbles.napstablook2,
                  ...monstertext1[Math.floor(randtext * monstertext1.length)]
               ),
            monstertext2 &&
               battler.opponents.includes(opponents.dogaressa) &&
               battler.monster(
                  false,
                  { x: 210, y: 32 },
                  battler.bubbles.napstablook,
                  ...monstertext2[Math.floor(randtext * monstertext2.length)]
               )
         ]);
         if (battler.alive.length !== 0) {
            battler.status = selectElement(statustext);
            await battler.resume(async () => {
               const index = battler.alive.length < 2 ? 1 : battler.pattern('dogs', [ 0, 1 ]);
               const modifier = battler.alive.length < 2 ? active0S() : void 0;
               await standardSize(index === 0 ? { x: 120, y: 85 } : { x: 150, y: 65 }, true);
               standardPos(true);
               if (GV.fetch || (GV.dogamy && GV.dogaressa)) {
                  await renderer.pause(450);
               } else {
                  patterns.dogs(index, modifier);
                  await battler.turnTimer(7000);
               }
               await resetBox(true);
            });
         } else {
            endMusic();
         }
      },
      opponents: [
         [ opponents.dogamy, { x: 100, y: 120 } ],
         [ opponents.dogaressa, { x: 125, y: 120 } ]
      ]
   }),

   greatdog: new OutertaleGroup({
      assets: new CosmosInventory(content.amDogsong, content.amShock),
      init () {
         battler.flee = false;
         battler.grid = content.ibuGrid1;
         battler.status = () => text.b_opponent_greatdog.status1();
         const mus = world.genocide ? music.shock.instance(renderer) : music.dogsong.instance(renderer);
         battler.music = mus;
         return true;
      },
      opponents: [ [ opponents.greatdog, { x: 160, y: 120 } ] ]
   }),

   papyrus: new OutertaleGroup({
      assets: new CosmosInventory(content.amPapyrus, content.amPapyrusboss, content.amSpecatk),
      init () {
         battler.flee = false;
         battler.status = () => (papreal() ? text.b_opponent_papyrus.status1 : text.b_opponent_papyrus.status2);
         const volatile = battler.volatile[0];
         if (world.genocide || papreal()) {
            volatile.sparable = true;
         } else {
            volatile.vars.zero = !SAVE.data.b.oops;
            if (SAVE.data.n.state_papyrus_capture++ > 0) {
               const jams = music.papyrusboss.instance(renderer);
               battler.music = jams;
               volatile.vars.phase = 2;
               volatile.vars.turns = 1;
               battler.SOUL.metadata.color = 'blue';
               if (SAVE.data.b.flirt_papyrus) {
                  volatile.flirted = true;
               }
            } else {
               const ebic = music.papyrus.instance(renderer);
               battler.music = ebic;
            }
         }
         return true;
      },
      opponents: [ [ opponents.papyrus, { x: 130, y: 14 } ] ]
   }),

   shockasgore: new OutertaleGroup({
      assets: new CosmosInventory(content.amShock),
      init () {
         battler.flee = false;
         battler.status = () => [];
         battler.SOUL.alpha.value = 0;
         events.on('battle').then(async () => {
            const volatile = battler.volatile[0];
            const vars = volatile.vars;
            await renderer.pause(1000);
            vars.facelock = false;
            await battler.monster(
               false,
               { x: 220, y: 10 },
               battler.bubbles.napstablook,
               ...text.b_opponent_shockasgore.idleText1
            );
            vars.facelock = true;
            const mus = music.shock.instance(renderer);
            battler.music = mus;
            battler.status = () => text.b_opponent_shockasgore.status1;
            battler.resume();
         });
         return false;
      },
      opponents: [ [ opponents.shockasgore, { x: 160, y: 122.5 } ] ]
   })
};

for (const [ key, value ] of Object.entries(groups)) {
   value.assets.name = `groups::${key}`;
}

export default groups;

CosmosUtils.status(`LOAD MODULE: STARTON GROUPS (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
