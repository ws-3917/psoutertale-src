import './bootstrap';

import { AdvancedBloomFilter } from '@pixi/filter-advanced-bloom';
import { ZoomBlurFilter } from '@pixi/filter-zoom-blur';
import { AlphaFilter, BLEND_MODES, Filter, Graphics } from 'pixi.js';
import commonText from '../../languages/default/text/common';
import text from '../../languages/default/text/outlands';
import values from '../../languages/default/text/values';
import {
   bullyEnding,
   characters,
   epilogueOverride,
   friskMirror,
   friskMirrorWater,
   goatbro,
   goatbroTrue,
   oversaver,
   runEncounter
} from '../common';
import { faces } from '../common/api';
import commonGroups from '../common/groups';
import commonPatterns from '../common/patterns';
import {
   content,
   inventories,
   music,
   musicConvolver,
   shaders,
   soundDelay,
   soundMixer,
   sounds,
   tints
} from '../systems/assets';
import { atlas, events, game, keys, renderer, rng, rooms, speech, typer } from '../systems/core';
import {
   antifreeze,
   ateThreshold,
   autoNav,
   battler,
   box,
   calcBonusHP,
   calcHP,
   character,
   choicer,
   credits,
   dialogue,
   dialogue_primitive,
   directionalInput,
   disengageDelay,
   engageDelay,
   epilogue,
   fader,
   header,
   heal,
   instance,
   keyState,
   notifier,
   outlandsKills,
   player,
   quickresume,
   quickshadow,
   rand_rad,
   resetThreshold,
   roomKills,
   roomReaction,
   saver,
   shake,
   sidebarrer,
   sineWaver,
   splash,
   talkFinder,
   teleport,
   teleporter,
   temporary,
   tracker,
   trivia,
   ultimaFacer,
   use,
   world
} from '../systems/framework';
import { OutertaleLayerKey } from '../systems/outertale';
import { SAVE } from '../systems/save';
import {
   CosmosAnimation,
   CosmosCharacter,
   CosmosDirection,
   CosmosEntity,
   CosmosHitbox,
   CosmosInstance,
   CosmosInventory,
   CosmosKeyed,
   CosmosMath,
   CosmosObject,
   CosmosPoint,
   CosmosPointSimple,
   CosmosProvider,
   CosmosRectangle,
   CosmosSprite,
   CosmosUtils,
   CosmosValue
} from '../systems/storyteller';
import { toriCheck, toriSV } from './extras';
import groups from './groups';
import { torielSpareState } from './opponents';

export async function AWAKEN (TRANSITION: CosmosObject) {
   player.face = 'right';
   player.position.set(160, 255);
   player.rotation.value = -90;
   player.sprite.anchor.y = 0;
   renderer.attach('main', goatbroTrue);
   goatbroTrue.face = 'right';
   goatbroTrue.metadata.override = true;
   goatbroTrue.position.set(100, 260);
   const EPILOGUE_MUSIC = epilogue();
   EPILOGUE_MUSIC.gain.value = 0;
   await Promise.all([
      TRANSITION.alpha.modulate(renderer, 5000, 0),
      EPILOGUE_MUSIC.gain.modulate(renderer, 5000, EPILOGUE_MUSIC.daemon.gain)
   ]);
   renderer.detach('menu', TRANSITION);
   await renderer.pause(1500);
   player.sprite.anchor.y = 1;
   player.face = 'up';
   player.position.y += 5;
   player.rotation.value = 0;
   game.camera = player;
   await renderer.pause(1000);
   await dialogue('dialoguerTop', ...text.a_outlands.finaltext.d48);
   player.face = 'left';
   await goatbroTrue.walk(renderer, 3, { x: 139 });
   await renderer.pause(2000);
   await dialogue('dialoguerTop', ...text.a_outlands.finaltext.d49);
   await renderer.pause(1000);
   goatbroTrue.face = 'up';
   await renderer.pause(2000);
   await dialogue('dialoguerTop', ...text.a_outlands.finaltext.d50);
   await renderer.pause(2000);
   goatbroTrue.face = 'right';
   goatbroTrue.metadata.override = false;
   tracker.supplant('right');
   await dialogue('dialoguerTop', ...text.a_outlands.finaltext.d51);
   await renderer.pause(1000);
   await dialogue('dialoguerTop', ...text.a_outlands.finaltext.d52);
   game.movement = true;
}

export const outlandsStates = {
   rooms: {} as Partial<CosmosKeyed<CosmosKeyed<any>>>,
   scripts: {} as Partial<CosmosKeyed<CosmosKeyed<any>>>
};

export async function exitscene (lateleave = false, sleep = false) {
   const exitfailAssets = new CosmosInventory(
      content.amHomeAlt,
      content.iooOExitfail,
      content.iooOTorielAsrielOver,
      content.ibcTwinklyUnderlay,
      content.avTwinkly1,
      content.avTwinkly2,
      content.idcTwinklyNice,
      content.idcTwinklyPlain,
      content.idcTwinklySassy,
      content.idcTwinklySide
   );
   exitfailAssets.name = 'exitfailAssets';
   const exitfailLoader = exitfailAssets.load();
   const overlay = new CosmosRectangle({
      alpha: 0,
      size: { x: 1000, y: 1000 },
      position: { x: 160, y: 120 },
      anchor: 0,
      fill: 0,
      stroke: -1
   });
   renderer.attach('menu', overlay);
   await antifreeze([ exitfailLoader, overlay.alpha.modulate(renderer, 3000, 1).then(() => renderer.pause(1000)) ]);
   const splashLoader = inventories.splashAssets.load();
   const alf = new AlphaFilter();
   const alf_value = new CosmosValue();
   const exitfail = new CosmosAnimation({
      area: renderer.area,
      filters: [ alf ],
      resources: content.iooOExitfail,
      index: world.postnoot || outlandsKills() > 10 ? 1 : 0,
      objects: [
         new CosmosAnimation({
            resources: content.iocFriskDown,
            position: { x: 221, y: 137 },
            anchor: { x: 0, y: 1 },
            tint: 0x757575
         }),
         new CosmosSprite({
            position: { x: 206, y: 119 },
            frames: [ content.iooOTorielAsrielOver ]
         }),
         new CosmosSprite({
            alpha: 0.5,
            frames: [ content.ibcTwinklyUnderlay ]
         })
      ]
   }).on('tick', function () {
      alf.alpha = alf_value.value;
   });
   let end = false;
   let homer: CosmosInstance | null = null;
   if (!world.postnoot || SAVE.flag.n.postnoot_exitfail < 2) {
      homer = music.homeAlt.instance(renderer);
      homer.gain.value /= 4;
      homer.rate.value *= world.postnoot || outlandsKills() > 10 ? 0.8 : 1;
      const downTicker = () => {
         homer!.rate.value *= 0.8 ** (1 / 90);
      };
      if (world.postnoot) {
         header('x1').then(() => {
            renderer.on('tick', downTicker);
         });
         header('x2').then(() => {
            renderer.off('tick', downTicker);
            renderer.detach('menu', exitfail);
            homer?.stop();
            end = true;
         });
      }
   }
   renderer.attach('menu', exitfail);
   await Promise.all([ alf_value.modulate(renderer, 3000, 1), homer?.gain.modulate(renderer, 3000, homer.daemon.gain) ]);
   atlas.switch('dialoguerBottom');
   await dialogue_primitive(...text.a_outlands.exitfail1(lateleave, sleep));
   atlas.switch(null);
   if (!end) {
      await Promise.all([ alf_value.modulate(renderer, 3000, 0), homer?.gain.modulate(renderer, 3000, 0) ]);
      renderer.detach('menu', exitfail);
      homer?.stop();
   }
   exitfailAssets.unload();
   await antifreeze([ splashLoader, renderer.pause(2000) ]);
   await credits();
   await new Promise(() => {});
}

export function compat () {
   SAVE.data.n.kills_wastelands = Math.min(SAVE.data.n.kills, 16);
   SAVE.data.n.plot = 16;
   SAVE.storage.dimboxA.add('glove');
}

export function instanceDestroy (tags: string[], layer = 'main' as OutertaleLayerKey) {
   renderer.detach(
      layer,
      ...objectsByTag(objectTags => {
         for (const tag of tags) {
            if (!objectTags.includes(tag)) {
               return false;
            }
         }
         return true;
      })
   );
}

export function objectsByTag (filter: (tags: string[]) => boolean) {
   const objects = [] as CosmosObject[];
   Object.values(renderer.layers).map(layer =>
      CosmosUtils.chain(layer as { objects: CosmosObject[] }, (layer, next) => {
         for (const object of layer.objects) {
            const tags = object.metadata.tags;
            if (tags instanceof Array && filter(tags.filter(tag => typeof tag === 'string') as string[])) {
               objects.push(object);
            }
            next(object);
         }
      })
   );
   return objects;
}

export async function phase (time: number, position: CosmosPointSimple) {
   sounds.phase.instance(renderer);
   player.scale.modulate(renderer, 125, { x: 1.05, y: 1 }).then(() => {
      player.scale.modulate(renderer, 50, { x: 0, y: 1 });
   });
   await player.alpha.modulate(renderer, 100, 0.8);
   player.alpha.value = 0;
   await renderer.pause(40);
   player.alpha.value = 1;
   await renderer.pause(35);
   await player.position.modulate(renderer, time, position);
   sounds.dephase.instance(renderer);
   player.scale.modulate(renderer, 50, { x: 1.05, y: 1 }).then(() => {
      player.scale.modulate(renderer, 125, { x: 1, y: 1 });
   });
   await renderer.pause(35);
   player.alpha.value = 0;
   await renderer.pause(40);
   player.alpha.value = 0.8;
   await player.alpha.modulate(renderer, 100, 1);
}

export function talkerEngine (key: string, ...talkers: CosmosSprite[]) {
   const headerListener = (h: string) => {
      switch (h) {
         case key:
            for (const talker of talkers) {
               speech.targets.add(talker);
            }
            break;
         case `${key}!`:
            for (const talker of talkers) {
               talker.reset();
               speech.targets.delete(talker);
            }
            break;
      }
   };
   typer.on('header', headerListener);
   return {
      end () {
         typer.off('header', headerListener);
         for (const talker of talkers) {
            speech.targets.delete(talker);
         }
      }
   };
}

export function torielOverride () {
   for (const room of rooms.values()) {
      if (room.score.music === 'home') {
         room.score.music = 'toriel';
         room.score.rate = 0.375;
      }
   }
}

export function walkHer (
   entity: CosmosEntity,
   direction: CosmosPointSimple,
   threshold: (position: CosmosPointSimple) => boolean
) {
   return CosmosUtils.chain<void, Promise<void>>(void 0, async (x, next) => {
      await renderer.on('tick');
      let delta = renderer.speed.value;
      while (delta > 0) {
         if (entity.metadata.stopped === true) {
            entity.move({ x: 0, y: 0 }, renderer);
         } else {
            entity.move({ x: direction.x, y: direction.y }, renderer);
         }
         if (threshold(entity.position)) {
            delta--;
         } else {
            entity.move({ x: 0, y: 0 }, renderer);
            return;
         }
      }
      await next();
   });
}

export function spawnBreakfast () {
   temporary(
      new CosmosHitbox({
         anchor: 0,
         position: { x: 90, y: 155 },
         metadata: {
            interact: true,
            name: 'outlands',
            tags: [ 'aClassicDreemurrBreakfast' ],
            args: [ 'breakfast' ]
         },
         priority: 9999,
         objects: [ new CosmosSprite({ anchor: 0, frames: [ content.iooOBreakfast ] }) ],
         size: { x: 12, y: 14 }
      }),
      'main'
   );
}

export function stalkerSetup (plot: number, check: CosmosProvider<boolean> = true, liveCondition = check) {
   const inst = instance('below', 'stalker');
   if (!inst || inst.object.metadata.setup) {
      return;
   }
   if (
      world.genocide ||
      SAVE.flag.b.confront_twinkly ||
      SAVE.flag.n.genocide_milestone === 7 ||
      plot <= SAVE.data.n.plot_stalker ||
      SAVE.data.n.plot > 13 ||
      world.postnoot
   ) {
      inst.destroy();
      return;
   }
   inst.object.alpha.value = 0;
   inst.object.metadata.setup = true;
   inst.object.priority.value = -1;
   let time = 0;
   const starPositionY = new CosmosValue(inst.object.position.y);
   inst.object.tint = 0x1f1f1f;
   inst.object.on('tick', async function () {
      if (!this.metadata.init) {
         if (CosmosUtils.provide(check)) {
            this.alpha.value = 1;
            this.metadata.init = true;
            time = renderer.time;
         } else {
            return;
         }
      }
      if (!CosmosUtils.provide(liveCondition)) {
         this.alpha.value = 0;
         this.metadata.done = true;
         SAVE.data.n.plot_stalker = plot;
         inst.destroy();
         return;
      }
      this.position.y = starPositionY.value + sineWaver(time, 2500, 0, 5);
      if (this.metadata.done) {
         return;
      }
      const proj = renderer.projection(this, game.camera.position);
      if (proj.x < -5 || proj.x > 325 || proj.y < -5 || proj.y > 245) {
         return;
      }
      this.metadata.done = true;
      SAVE.data.n.plot_stalker = plot;
      starPositionY.modulate(renderer, 800, starPositionY.value, starPositionY.value, 0);
      await this.alpha.modulate(renderer, 800, 1, 1, 0);
      inst.destroy();
   });
}

export const outlandsScript = async (subscript: string, ...args: string[]): Promise<any> => {
   const roomState = (outlandsStates.rooms[game.room] ??= {});
   if (subscript === 'tick') {
      switch (game.room) {
         case 'w_pacing': {
            SAVE.data.b.oops && instanceDestroy([ 'w_xfrog' ]);
            (world.population < 6 || roomKills().w_pacing > 0 || SAVE.data.b.w_state_lateleave) &&
               instanceDestroy([ 'w_ifrog' ]);
            break;
         }
         case 'w_alley4': {
            if (world.genocide && SAVE.data.n.plot < 16 && !roomState.active2) {
               roomState.active2 = true;
               const jeebs = music.prebattle.instance(renderer);
               jeebs.rate.value = 0.25;
               jeebs.gain.value = 0;
               jeebs.gain.modulate(renderer, 300, jeebs.daemon.gain);
               CosmosUtils.chain<void, Promise<void>>(void 0, async (value, next) => {
                  const [ from, to ] = await events.on('teleport-start');
                  if (SAVE.data.n.plot < 16) {
                     if (from === 'w_alley4' && to === 'w_alley3') {
                        jeebs.gain.modulate(renderer, 300, 0);
                     } else if (from === 'w_alley3' && to === 'w_alley4') {
                        await events.on('teleport');
                        jeebs.gain.modulate(renderer, (jeebs.gain.value / jeebs.daemon.gain) * 300, jeebs.daemon.gain);
                     }
                     next();
                  } else {
                     jeebs.stop();
                  }
               });
            }
            break;
         }
         case 'w_froggit': {
            if (
               SAVE.data.b.svr ||
               world.runaway ||
               world.population < 6 ||
               roomKills().w_froggit > 0 ||
               SAVE.data.b.w_state_lateleave ||
               (world.genocide && 16 <= SAVE.data.n.plot)
            ) {
               instanceDestroy([ 'w_mfrog' ]);
            }
            if (
               SAVE.data.b.svr ||
               world.runaway ||
               world.killed5 ||
               roomKills().w_froggit > 0 ||
               SAVE.data.b.w_state_lateleave ||
               (world.genocide && 16 <= SAVE.data.n.plot)
            ) {
               instanceDestroy([ 'w_loox' ]);
            }
            break;
         }
      }
   } else {
      const scriptState = outlandsStates.scripts[subscript] || (outlandsStates.scripts[subscript] = {});
      switch (subscript) {
         case 'secret': {
            if (!game.movement) {
               return;
            }
            game.movement = false;
            if (SAVE.data.b.key_coffin) {
               if (!SAVE.data.b.w_state_secret) {
                  SAVE.data.b.w_state_secret = true;
                  await dialogue('auto', ...text.a_outlands.secret2);
               }
               await teleport('w_coffin', 'left', 480, 180, world);
            } else {
               await dialogue('auto', ...text.a_outlands.secret1());
               player.position.x += 3;
               player.face = 'right';
            }
            game.movement = true;
            break;
         }
         case 'breakfast': {
            if (player.face !== 'down') {
               break;
            }
            if (!game.movement) {
               return;
            }
            game.movement = false;
            atlas.switch('dialoguerBottom');
            if (SAVE.storage.inventory.size === 8) {
               await dialogue_primitive(...text.a_outlands.breakslow);
            } else {
               SAVE.data.n.state_toriel_food = 4;
               saver.add('snails');
               sounds.equip.instance(renderer);
               instanceDestroy([ 'aClassicDreemurrBreakfast' ], 'main');
               await dialogue_primitive(...text.a_outlands.breakfast);
            }
            atlas.switch(null);
            game.movement = true;
            break;
         }
         case 'piecheck': {
            if (!game.movement) {
               return;
            }
            game.movement = false;
            await dialogue('auto', ...text.a_outlands.piecheck());
            if (
               SAVE.data.n.plot > 7 &&
               SAVE.data.n.plot !== 72 &&
               world.meanie &&
               SAVE.data.n.state_wastelands_mash < 1 &&
               SAVE.data.n.state_wastelands_toriel !== 2
            ) {
               if (choicer.result === 0) {
                  SAVE.data.n.state_wastelands_mash = SAVE.data.n.plot < 8.1 ? 1 : 2;
                  await dialogue('auto', ...text.a_outlands.piesmash2);
                  const whitefader = fader(
                     { fill: 0xffffff, size: 1000, anchor: 0, position: { x: 160, y: 120 } },
                     'menu'
                  );
                  await whitefader.alpha.modulate(renderer, SAVE.flag.b.$option_epilepsy ? 300 : 150, 1);
                  (objectsByTag(tags => tags.includes('w_piepan'))[0].objects[0] as CosmosAnimation).index = 2;
                  sounds.stab.instance(renderer);
                  shake(4, 800);
                  await renderer.pause(SAVE.flag.b.$option_epilepsy ? 150 : 300);
                  whitefader.alpha.modulate(renderer, 300, 0).then(() => renderer.detach('menu', whitefader));
                  await renderer.pause(1500);
                  await dialogue('auto', ...text.a_outlands.piesmash3);
               } else {
                  await dialogue('auto', ...text.a_outlands.piesmash1);
               }
            }
            game.movement = true;
            break;
         }
         case 'latetoriel': {
            if (!game.movement) {
               return;
            }
            instance('main', 'latetoriel')?.talk(
               'a',
               talkFinder(),
               'auto',
               ...(SAVE.data.b.w_state_latetoriel ? text.a_outlands.latetoriel2 : text.a_outlands.latetoriel1)
            );
            SAVE.data.b.w_state_latetoriel = true;
            break;
         }
         case 'fireplace': {
            if (!game.movement) {
               return;
            }
            game.movement = false;
            await dialogue('auto', ...text.a_outlands.fireplace1());
            if (world.darker) {
               game.movement = true;
               return;
            }
            if (choicer.result === 0) {
               goatbro.metadata.override = true;
               goatbroTrue.metadata.override = true;
               const promo = Promise.all([
                  SAVE.data.b.svr
                     ? goatbroTrue.walk(renderer, 1, { x: 168, y: 101 }).then(() => (goatbroTrue.face = 'down'))
                     : world.goatbro
                     ? goatbro.walk(renderer, 1, { x: 168, y: 101 }).then(() => (goatbro.face = 'down'))
                     : void 0,
                  player.walk(renderer, 1, { x: 168 }, { x: 168, y: 72 }).then(() => {
                     player.face = 'down';
                  })
               ]);
               await dialogue('auto', ...text.a_outlands.fireplace2b());
               if (toriCheck()) {
                  await instance('main', 'theOneAndOnlyChairiel')!.talk(
                     'a',
                     talkFinder(),
                     'auto',
                     ...text.a_outlands.fireplace2c
                  );
               } else if (!SAVE.data.b.svr && !world.genocide) {
                  await dialogue('auto', ...text.a_outlands.fireplace2d);
               }
               await promo;
               await directionalInput();
               await player.walk(renderer, 1, { y: 80 });
               goatbro.metadata.override = false;
               goatbroTrue.metadata.override = false;
               tracker.supplant('up');
            } else {
               await dialogue('auto', ...text.a_outlands.fireplace2a);
            }
            game.movement = true;
            break;
         }
         case 'twinkly': {
            if (!game.movement) {
               return;
            }
            if (SAVE.data.n.plot > 0) {
               return;
            } else {
               SAVE.data.n.plot = 1;
            }
            const progress = SAVE.flag.b.reset_twinkly ? 3 : SAVE.flag.n.progress_twinkly;
            const twinklyBattleAssets = new CosmosInventory(
               content.ibcTorielCutscene1,
               content.ibcTorielCutscene2,
               content.ibcTorielScram,
               content.asTwinklyHurt,
               content.asTwinklyLaugh,
               content.idcTwinklyGonk,
               content.avTwinkly2,
               content.idcTwinklyGrin,
               content.idcTwinklyEvil,
               content.idcTwinklyLaugh,
               content.idcTwinklyHurt,
               content.ibbFirebol,
               content.ibbPellet,
               content.ibuBubbleTwinkly,
               content.idcTwinklyPissed,
               content.idcTwinklyNice,
               content.asBell,
               content.ibuArrows,
               content.ibuHP
            );
            twinklyBattleAssets.name = 'twinklyBattleAssets';
            const battleQueue = progress < 3 ? twinklyBattleAssets.load() : void 0;
            game.movement = false;
            let vibes: CosmosInstance;
            if (progress < 4) {
               const time = renderer.time;
               const starPositionY = new CosmosValue();
               const star = new CosmosAnimation({
                  alpha: 0,
                  priority: -1,
                  anchor: { x: 0, y: 1 },
                  position: { x: player.position.x },
                  resources: content.iocTwinklyMain
               }).on('tick', function () {
                  this.position.y = starPositionY.value + CosmosMath.wave(((renderer.time - time) % 2500) / 2500) * 5;
               });
               game.movement = false;
               await renderer.pause(450);
               renderer.attach('main', star);
               await Promise.all([
                  star.alpha.modulate(renderer, 800, 0, 1),
                  starPositionY.modulate(renderer, 800, 140, 140, 140)
               ]);
               const timesMet = SAVE.flag.n.encounter_twinkly++;
               let mus = null as CosmosInstance | null;
               const lateMusic = progress === 3 || timesMet > 1;
               lateMusic || (mus = music.twinkly.instance(renderer));
               speech.targets.add(star);
               atlas.switch('dialoguerBottom');
               if (progress % 2 === 1) {
                  SAVE.flag.n.progress_twinkly++;
               } else if (progress === 1.5) {
                  SAVE.flag.n.progress_twinkly = 2;
               }
               await dialogue_primitive(
                  ...(progress === 3
                     ? world.postnoot
                        ? text.a_outlands.twinkly9c
                        : SAVE.flag.n.genocide_twinkly > 0
                        ? SAVE.flag.n.genocide_milestone < 7
                           ? [
                                ...text.a_outlands.twinkly9a,
                                ...[
                                   text.a_outlands.twinkly9a1,
                                   text.a_outlands.twinkly9a2,
                                   text.a_outlands.twinkly9a3,
                                   text.a_outlands.twinkly9a4,
                                   text.a_outlands.twinkly9a5,
                                   text.a_outlands.twinkly9a6,
                                   text.a_outlands.twinkly9a7
                                ][SAVE.flag.n.genocide_milestone || 0],
                                ...text.a_outlands.twinkly9a8
                             ]
                           : text.a_outlands.twinkly9b
                        : text.a_outlands.twinkly9
                     : progress === 0
                     ? [
                          ...(timesMet < 2 ? text.a_outlands.twinkly1 : []),
                          ...[
                             text.a_outlands.twinkly2,
                             text.a_outlands.twinkly3,
                             text.a_outlands.twinkly4,
                             text.a_outlands.twinkly5
                          ][Math.min(timesMet, 3)]
                       ]
                     : [
                          ...(progress === 1
                             ? text.a_outlands.twinkly6
                             : progress === 1.5
                             ? text.a_outlands.twinkly6a
                             : text.a_outlands.twinkly7),
                          ...text.a_outlands.twinkly8
                       ])
               );
               if (SAVE.flag.b.reset_twinkly) {
                  SAVE.flag.n.progress_twinkly = 4;
                  SAVE.flag.b.reset_twinkly = false;
               }
               atlas.switch(null);
               speech.targets.delete(star);
               if (progress === 3) {
                  await Promise.all([
                     mus?.gain.modulate(renderer, 800, 0),
                     star.alpha.modulate(renderer, 800, 1, 1, 0),
                     starPositionY.modulate(renderer, 800, starPositionY.value, starPositionY.value, 0)
                  ]);
                  mus?.stop();
                  renderer.detach('main', star);
                  content.iocTwinklyMain.unload();
               } else {
                  const twinklyText = async (...lines: string[]) => {
                     renderer.attach('menu', scriptState.speech!);
                     await dialogue_primitive(...lines);
                     renderer.detach('menu', scriptState.speech!);
                  };
                  if (progress === 0) {
                     await Promise.all([ battleQueue, battler.battlefall(player, { x: 160, y: 160 }) ]);
                     lateMusic && (mus = music.twinkly.instance(renderer));
                     speech.state.face = faces.twinklyPlain;
                     speech.state.face.reset();
                  } else {
                     mus?.stop();
                     sounds.noise.instance(renderer);
                     renderer.alpha.value = 0;
                     speech.state.face = faces.twinklyEvil;
                     speech.state.face.reset();
                     await Promise.all([ battleQueue, renderer.pause(300) ]);
                     sounds.noise.instance(renderer);
                     renderer.attach('menu', battler.SOUL);
                     battler.SOUL.alpha.value = 1;
                     battler.SOUL.position.set(160);
                     renderer.alpha.value = 1;
                  }
                  const battleStar = new CosmosObject({
                     priority: 1,
                     position: { x: 160, y: 80 },
                     metadata: { f: true }
                  }).on('tick', function () {
                     this.metadata.f &&
                        (this.position.y =
                           starPositionY.value + CosmosMath.wave(((renderer.time - time) % 2500) / 2500) * 2.5);
                  });
                  const holder = () => {
                     battleStar.objects = speech.state.face ? [ speech.state.face ] : [];
                  };
                  holder();
                  speech.holders.push(holder);
                  battler.box.size.x = 65;
                  battler.box.size.y = 65;
                  battler.box.position.x = 160;
                  battler.box.position.y = 160;
                  atlas.switch('battlerSimple');
                  renderer.attach('menu', battler.SOUL);
                  starPositionY.value = 85;
                  renderer.detach('main', star);
                  renderer.attach('menu', battleStar);
                  content.iocTwinklyMain.unload();
                  battler.active = true;
                  game.movement = true;
                  events.fire('battle');
                  await renderer.pause(1000);
                  scriptState.speech ||= new CosmosObject({
                     position: { x: 375 / 2, y: 134 / 2 },
                     objects: [ battler.bubbles.twinkly() ]
                  });
                  if (SAVE.flag.n.progress_twinkly === 0) {
                     const arr = new CosmosSprite({
                        active: true,
                        anchor: 0,
                        frames: [ content.ibuArrows, null ],
                        duration: 40,
                        scale: 1 / 2,
                        position: { x: 160, y: Math.round(box.y + box.sy / 4) }
                     }).on('tick', function () {
                        this.duration = [ 40, 8 ][this.index];
                        if (battler.SOUL.position.x !== 160 || battler.SOUL.position.y !== 160) {
                           battler.bullets.detach(arr);
                        }
                     });
                     battler.bullets.attach(arr);
                     await twinklyText(...text.a_outlands.twinkly10);
                     speech.state.face = faces.twinklyWink;
                     speech.state.face.reset();
                     await renderer.pause(1350);
                     let stage = 0;
                     const h = CosmosUtils.hyperpromise();
                     const hurtListener = () => h.resolve();
                     events.on('hurt', hurtListener);
                     while (stage < 3) {
                        const myStage = stage++;
                        const h2 = header('x2');
                        twinklyText(
                           ...[ text.a_outlands.twinkly11, text.a_outlands.twinkly12, text.a_outlands.twinkly13 ][
                              stage - 1
                           ]
                        );
                        await h2;
                        const pellets = commonPatterns.twinkly.arc();
                        await header('x1');
                        for (const [ index, { bullet } ] of pellets.entries()) {
                           bullet.velocity.set(
                              CosmosMath.ray(bullet.position.angleTo(battler.SOUL) + (index - 2) * 2, 3)
                           );
                        }
                        let d = true;
                        if (myStage === 2) {
                           speech.state.face = faces.twinklySide;
                           speech.state.face.reset();
                           renderer.pause(1250).then(async () => {
                              if (d) {
                                 game.text = values.textFormat(text.a_outlands.twinkly14, 20, true);
                                 speech.state.face = faces.twinklyNice;
                                 speech.state.face.reset();
                                 await renderer.pause(1650);
                                 if (d) {
                                    typer.reset(true);
                                 }
                              }
                           });
                        }
                        await Promise.race([ h.promise, Promise.all(pellets.map(pellet => pellet.detached)) ]);
                        d = false;
                        typer.reset(true);
                        for (const { bullet, detach } of pellets) {
                           bullet.metadata.bullet = false;
                           bullet.velocity.set(0);
                           bullet.scale.modulate(renderer, 500, 2);
                           bullet.alpha.modulate(renderer, 500, 0).then(() => {
                              detach();
                           });
                        }
                        if (h.active) {
                           if (myStage === 2) {
                              SAVE.flag.n.progress_twinkly = 1.5;
                              await Promise.all([
                                 mus?.rate.modulate(renderer, 1250, 0.5),
                                 mus?.gain.modulate(renderer, 1250, 0)
                              ]);
                              await renderer.pause(1350);
                              speech.state.face = faces.twinklySassy;
                              speech.state.face.reset();
                              await renderer.pause(850);
                              await twinklyText(...text.a_outlands.twinkly16);
                           } else {
                              mus && (mus.rate.value -= 0.05);
                           }
                        } else {
                           mus?.stop();
                           typer.reset(true);
                           speech.state.face = faces.twinklyEvil;
                           speech.state.face.reset();
                           SAVE.flag.n.progress_twinkly = 1;
                           battler.bullets.detach(arr);
                           await renderer.pause(1500);
                           await twinklyText(...text.a_outlands.twinkly15);
                           break;
                        }
                     }
                     events.off('hurt', hurtListener);
                     h.resolve();
                  } else {
                     await twinklyText(...text.a_outlands.twinkly17);
                  }
                  const r5 = commonPatterns.twinkly.ring(90, 1000, 1.5, true, true);
                  await renderer.pause(1800);
                  await twinklyText(...text.a_outlands.twinkly18);
                  speech.state.face = faces.twinklyLaugh;
                  speech.state.face.enable();
                  sounds.twinklyLaugh.instance(renderer);
                  battler.box.size.modulate(renderer, 3500, 12);
                  await r5.modulate(renderer, 3500, 0.3);
                  r5.value = 0.3;
                  await renderer.pause(1000);
                  speech.state.face.reset();
                  await renderer.pause(1500);
                  speech.state.face = faces.twinklySide;
                  speech.state.face.reset();
                  await renderer.pause(350);
                  const firebol = new CosmosAnimation({
                     active: true,
                     anchor: 0,
                     position: { x: 260, y: 88 },
                     resources: content.ibbFirebol
                  });
                  renderer.attach('menu', firebol);
                  let flash = 0;
                  while (flash++ < 6) {
                     firebol.alpha.value = 0;
                     await renderer.pause(66);
                     firebol.alpha.value = 1;
                     await renderer.pause(66);
                  }
                  SAVE.flag.n.progress_twinkly = 3;
                  speech.state.face = faces.twinklyGonk;
                  speech.state.face.reset();
                  await firebol.position.modulate(renderer, 400, { x: 160, y: 88 });
                  speech.state.face = faces.twinklyHurt;
                  speech.state.face.reset();
                  sounds.twinklyHurt.instance(renderer);
                  renderer.detach('menu', firebol);
                  battleStar.metadata.f = false;
                  battleStar.on('tick', function () {
                     const qs = quickshadow(this.objects[0] as CosmosSprite, this, 'menu');
                     qs.rotation.value = this.rotation.value;
                     battler.garbage.push([ 'menu', qs ]);
                  });
                  await Promise.all([
                     battleStar.rotation.modulate(renderer, 800, -180),
                     battleStar.position.modulate(renderer, 800, { x: -40 })
                  ]);
                  renderer.detach('menu', battleStar);
                  speech.holders.splice(speech.holders.indexOf(holder), 1);
                  const battleTori = new CosmosAnimation({
                     blend: BLEND_MODES.ADD,
                     anchor: { x: 0, y: 1 },
                     position: { x: 360, y: 115 },
                     resources: content.ibcTorielCutscene2
                  });
                  speech.targets.add(battleTori);
                  renderer.attach('menu', battleTori);
                  await battleTori.position.modulate(renderer, 1200, { x: 160, y: 115 });
                  vibes = music.toriel.instance(renderer);
                  vibes.gain.value /= 4;
                  vibes.gain.modulate(renderer, 300, vibes.gain.value * 4);
                  scriptState.speech.position.y = (44 + 12) / 2 + 6;
                  battleTori.index = 1;
                  await twinklyText(...text.a_outlands.twinkly19);
                  await renderer.pause(650);
                  battleTori.resources = content.ibcTorielCutscene1;
                  await twinklyText(...text.a_outlands.twinkly20);
                  await renderer.alpha.modulate(renderer, 300, 0);
                  renderer.alpha.value = 0;
                  atlas.switch(null);
                  battler.active = false;
                  game.movement = false;
                  speech.targets.delete(battleTori);
                  renderer.detach('menu', battleTori, battler.SOUL);
                  battler.SOUL.alpha.value = 0;
                  twinklyBattleAssets.unload();
               }
            }
            const tori = new CosmosCharacter({
               anchor: { x: 0, y: 1 },
               position: { x: 120, y: 140 },
               preset: characters.toriel,
               key: 'toriel'
            });
            renderer.attach('main', tori);
            if (progress > 2) {
               tori.position.y = 5;
               await walkHer(tori, { x: 0, y: 3 }, position => position.y < 140);
               vibes = music.toriel.instance(renderer);
               vibes.gain.value /= 4;
               vibes.gain.modulate(renderer, 300, vibes.gain.value * 4);
               atlas.switch('dialoguerBottom');
               await dialogue_primitive(...text.a_outlands.twinkly21);
               atlas.switch(null);
            } else {
               await renderer.pause(850);
               if (SAVE.data.n.hp < calcHP()) {
                  heal();
                  await renderer.pause(650);
               }
               atlas.switch('dialoguerBottom');
               renderer.alpha.modulate(renderer, 300, 1);
               await dialogue_primitive(...text.a_outlands.twinkly22);
               atlas.switch(null);
               SAVE.data.b.toriel_twinkly = true;
            }
            game.movement = true;
            Promise.race([ events.on('teleport'), walkHer(tori, { x: 0, y: -3 }, position => position.y > 5) ]).then(() =>
               renderer.detach('main', tori)
            );
            events.on('teleport-start').then(async () => {
               await vibes.gain.modulate(renderer, 300, 0);
               vibes.stop();
            });
            break;
         }
         case 'tutorial_puzzle': {
            if (args[0] === 'encourage') {
               if (SAVE.data.n.plot < 2.2) {
                  if (!game.movement || !game.menu) {
                     return;
                  }
                  const tori = instance('main', 'toriturner')!.object as CosmosCharacter;
                  const faze = tori.face;
                  tori.face = ultimaFacer(tori);
                  game.movement = false;
                  atlas.switch('dialoguerBottom');
                  await dialogue_primitive(
                     ...(SAVE.data.n.plot < 2.11
                        ? text.a_outlands.tutorial_puzzle8a
                        : SAVE.data.n.plot < 2.12
                        ? text.a_outlands.tutorial_puzzle8b
                        : text.a_outlands.tutorial_puzzle8c)
                  );
                  atlas.switch(null);
                  game.movement = true;
                  tori.face = faze;
               }
               return;
            }
            let stage = 0;
            if (!scriptState.active && SAVE.data.n.plot < 2.2) {
               for (const button of objectsByTag(tags => tags.includes('t_button'))) {
                  (button.objects[0] as CosmosAnimation).index = 1;
               }
            }
            if (SAVE.data.n.plot > 2.1) {
               scriptState.clear ||
                  (scriptState.clear = (tag: string) => {
                     instanceDestroy([ 'barrier', tag ]);
                     for (const button of objectsByTag(
                        tags => tags.includes('t_button') && (tags.includes(`${tag}0`) || tags.includes(`${tag}1`))
                     )) {
                        (button.objects[0] as CosmosAnimation).index = 0;
                     }
                     for (const object of objectsByTag(tags => tags.includes('gate') && tags.includes(tag))) {
                        const gate = object.objects[0] as CosmosAnimation;
                        gate.index = 5;
                        if (gate.position.y === 0) {
                           gate.position.y = object.position.y;
                           object.position.y = 0;
                        }
                     }
                  });
               scriptState.clear('0');
               scriptState.active || (stage += 2);
               if (SAVE.data.n.plot > 2.11) {
                  scriptState.clear('1');
                  scriptState.active || (stage += 2);
                  if (SAVE.data.n.plot > 2.12) {
                     scriptState.clear('2');
                     scriptState.active || (stage += 2);
                  }
               }
            }
            if (scriptState.active || SAVE.data.n.plot > 2.2) {
               return;
            } else if (SAVE.data.n.plot < 2.2) {
               if (!game.movement) {
                  return;
               }
               game.movement = false;
            }
            if (SAVE.data.n.plot < 2.21) {
               scriptState.active = true;
               const tori = new CosmosCharacter({
                  anchor: { x: 0, y: 1 },
                  size: { x: 25, y: 5 },
                  metadata: {
                     barrier: true,
                     interact: true,
                     name: 'outlands',
                     args: [ 'tutorial_puzzle', 'encourage' ],
                     tags: [ 'toriturner' ]
                  },
                  position:
                     SAVE.data.n.plot < 2.1
                        ? { x: 90, y: 110 }
                        : SAVE.data.n.plot < 2.2
                        ? { x: 280, y: 130 }
                        : { x: 280, y: 390 },
                  preset: characters.toriel,
                  key: 'toriel'
               }).on('tick', async function () {
                  if (SAVE.data.n.plot > 2.2) {
                     return;
                  }
                  tori.preset = game.room === 'w_tutorial' ? characters.toriel : characters.none;
                  tori.metadata.barrier = game.room === 'w_tutorial';
                  tori.metadata.interact = game.room === 'w_tutorial';
                  if (
                     game.room === 'w_tutorial' &&
                     SAVE.data.n.plot === 2.2 &&
                     (player.position.y > this.position.y || player.position.extentOf(this.position) < 60)
                  ) {
                     SAVE.data.n.plot = 2.21;
                     await Promise.race([
                        events.on('teleport'),
                        walkHer(tori, { x: 0, y: 3 }, pos => pos.y < 420).then(async () => {
                           await walkHer(tori, { x: 3, y: 0 }, pos => pos.x < 315);
                           await tori.alpha.modulate(renderer, 300, 0);
                        })
                     ]);
                     renderer.detach('main', tori);
                  }
               });
               if (SAVE.data.n.plot < 2.1) {
                  tori.face = 'down';
               } else {
                  tori.face = 'left';
               }
               renderer.attach('main', tori);
               if (SAVE.data.n.plot < 2.2) {
                  const buttons = Object.fromEntries(
                     objectsByTag(tags => tags.includes('t_button')).map(object => [
                        (object.metadata.tags as string[])[0],
                        [ object, object.objects[0] ]
                     ])
                  ) as CosmosKeyed<[CosmosObject, CosmosAnimation], `${0 | 1 | 2}${0 | 1 | 2}`>;
                  for (const self of [ tori, player ]) {
                     (self as CosmosEntity).on('tick', async () => {
                        if (stage < 6 && game.room === 'w_tutorial') {
                           for (const [ button, animation ] of Object.values(buttons)) {
                              if (
                                 animation.index === 1 &&
                                 self.position.extentOf({ x: button.position.x, y: animation.position.y }) < 10 &&
                                 self.position.y > animation.position.y - 2
                              ) {
                                 animation.index = 0;
                                 sounds.noise.instance(renderer);
                                 if (++stage % 2 === 0) {
                                    game.movement = false;
                                    const tag = (stage / 2 - 1).toString();
                                    renderer.pause(50).then(() => {
                                       sounds.retract.instance(renderer).rate.value = 1.25;
                                    });
                                    objectsByTag(tags => tags.includes('gate') && tags.includes(tag)).map(
                                       async object => {
                                          const gate = object.objects[0] as CosmosAnimation;
                                          gate.step = 0;
                                          gate.index = 1;
                                          gate.enable();
                                          await renderer.when(() => gate.index === 5);
                                          gate.disable();
                                          instanceDestroy([ 'barrier', tag ]);
                                          if (gate.position.y === 0) {
                                             gate.position.y = object.position.y;
                                             object.position.y = 0;
                                          }
                                       }
                                    );
                                    await renderer.pause(300);
                                 } else {
                                    await renderer.pause(150);
                                 }
                                 atlas.switch('dialoguerBottom');
                                 switch (stage) {
                                    case 1:
                                       if (SAVE.data.n.plot === 2.1) {
                                          await dialogue_primitive(...text.a_outlands.tutorial_puzzle2a);
                                       } else {
                                          await dialogue_primitive(...text.a_outlands.tutorial_puzzle2);
                                          SAVE.data.n.plot = 2.1;
                                       }
                                       game.movement = true;
                                       break;
                                    case 2:
                                       await dialogue_primitive(...text.a_outlands.tutorial_puzzle3);
                                       atlas.switch(null);
                                       await walkHer(tori, { x: 0, y: 4 }, position => position.y < 250);
                                       break;
                                    case 3:
                                       if (SAVE.data.n.plot === 2.11) {
                                          await dialogue_primitive(...text.a_outlands.tutorial_puzzle4a);
                                       } else {
                                          await dialogue_primitive(...text.a_outlands.tutorial_puzzle4);
                                          SAVE.data.n.plot = 2.11;
                                       }
                                       game.movement = true;
                                       break;
                                    case 4:
                                       await dialogue_primitive(...text.a_outlands.tutorial_puzzle5);
                                       atlas.switch(null);
                                       await walkHer(tori, { x: 0, y: 4 }, position => position.y < 330);
                                       break;
                                    case 5:
                                       tori.face = 'left';
                                       SAVE.data.n.plot = 2.12;
                                       game.movement = true;
                                       break;
                                    case 6:
                                       await dialogue_primitive(...text.a_outlands.tutorial_puzzle6);
                                       atlas.switch(null);
                                       await walkHer(tori, { x: 0, y: 3 }, position => position.y < 390);
                                       await walkHer(tori, { x: 3, y: 0 }, position => position.x < 280);
                                       tori.face = 'left';
                                       await renderer.pause(650);
                                       atlas.switch('dialoguerBottom');
                                       await dialogue_primitive(...text.a_outlands.tutorial_puzzle7);
                                       SAVE.data.n.plot = 2.2;
                                       tori.metadata.interact = false;
                                       tori.metadata.barrier = false;
                                       game.movement = true;
                                       break;
                                 }
                                 atlas.switch(null);
                              }
                           }
                        }
                     });
                  }
                  if (SAVE.data.n.plot < 2.1) {
                     await renderer.pause(600);
                     atlas.switch('dialoguerBottom');
                     await dialogue_primitive(...text.a_outlands.tutorial_puzzle1);
                     atlas.switch(null);
                     await walkHer(tori, { x: 4, y: 0 }, position => position.x < 270);
                     await walkHer(tori, { x: 0, y: 4 }, position => position.y < 170);
                  } else {
                     await renderer.pause(350);
                     await walkHer(tori, { x: -4, y: 0 }, position => position.x > 270);
                     await walkHer(
                        tori,
                        { x: 0, y: 4 },
                        position =>
                           position.y < (SAVE.data.n.plot === 2.1 ? 170 : SAVE.data.n.plot === 2.11 ? 250 : 330)
                     );
                  }
               }
            }
            break;
         }
         case 'dummy': {
            if (args[0] === 'prompt') {
               if (!game.movement) {
                  return;
               }
               const tori = (outlandsStates.scripts.dummy ??= {}).tori as CosmosCharacter;
               const faze = tori.face;
               tori.face = ultimaFacer({ position: tori, size: { x: 30 } });
               game.movement = false;
               atlas.switch('dialoguerBottom');
               if (SAVE.data.n.plot < 2.31) {
                  await dialogue_primitive(...text.a_outlands.dummy3);
                  SAVE.data.n.plot = 2.31;
               } else if (SAVE.data.n.plot < 2.32) {
                  await dialogue_primitive(...text.a_outlands.dummy4);
                  SAVE.data.n.plot = 2.32;
               } else {
                  await dialogue_primitive(...text.a_outlands.dummy5);
               }
               tori.face = faze;
               atlas.switch(null);
               game.movement = true;
               return;
            } else if (args[0] === 'dummybody') {
               if (!game.movement) {
                  return;
               }
               if (SAVE.data.n.plot < 2.4) {
                  await battler.encounter(player, groups.dummy, false);
                  if (SAVE.data.n.state_wastelands_dummy === 1 || SAVE.data.n.state_wastelands_dummy === 5) {
                     instanceDestroy([ 'dummybody' ]);
                  }
                  game.movement = false;
                  atlas.switch('dialoguerBottom');
                  switch (SAVE.data.n.state_wastelands_dummy) {
                     case 0:
                        await dialogue_primitive(...text.a_outlands.dummy7);
                        break;
                     case 1:
                        await dialogue_primitive(...text.a_outlands.dummy6);
                        break;
                     case 2:
                        await dialogue_primitive(...text.a_outlands.dummy8);
                        break;
                     case 3:
                        await dialogue_primitive(...text.a_outlands.dummy9);
                        break;
                     case 4:
                        await dialogue_primitive(...text.a_outlands.dummy10);
                        break;
                     case 5:
                        await dialogue_primitive(...text.a_outlands.dummy12);
                        break;
                     case 6:
                        await dialogue_primitive(...text.a_outlands.dummy9a);
                        break;
                  }
                  atlas.switch(null);
                  game.movement = true;
                  SAVE.data.n.plot = 2.4;
               } else {
                  game.movement = false;
                  atlas.switch('dialoguerBottom');
                  await dialogue_primitive(...text.a_outlands.w_dummy1());
                  atlas.switch(null);
                  game.movement = true;
               }
               return;
            }
            if (SAVE.data.n.plot > 2.32) {
               instanceDestroy([ 'toribarrier' ], 'below');
            }
            const dgone = SAVE.data.n.state_wastelands_dummy === 1 || SAVE.data.n.state_wastelands_dummy === 5;
            if (dgone) {
               instanceDestroy([ 'dummybody' ]);
            } else if (outlandsKills() > 10 || SAVE.data.n.plot > 30.1) {
               (instance('main', 'dummybody')?.object.objects[0] as CosmosAnimation).reset();
            }
            if (dgone && world.goatbro && !scriptState.goated) {
               scriptState.goated = true;
               renderer
                  .when(() => player.position.y > 40 && game.room === 'w_dummy' && game.movement)
                  .then(async () => {
                     if (SAVE.flag.n.ga_asrielOutlands5++ < 1) {
                        await dialogue('auto', ...text.a_outlands.noticedummy);
                     }
                  });
            }
            if (scriptState.active) {
               return;
            } else if (SAVE.data.n.plot < 2.3) {
               if (!game.movement) {
                  return;
               }
               game.movement = false;
            }
            if (SAVE.data.n.plot < 2.41) {
               scriptState.active = true;
               const tori = (scriptState.tori = new CosmosCharacter({
                  anchor: { x: 0, y: 1 },
                  position: SAVE.data.n.plot < 2.3 ? { x: 100, y: 160 } : { x: 200, y: 110 },
                  preset: characters.toriel,
                  key: 'toriel'
               }).on('tick', async function () {
                  if (SAVE.data.n.plot > 2.4) {
                     return;
                  }
                  this.preset = !this.metadata.hide && game.room === 'w_dummy' ? characters.toriel : characters.none;
                  this.metadata.barrier = !this.metadata.hide && game.room === 'w_dummy';
                  this.metadata.interact = !this.metadata.hide && game.room === 'w_dummy';
                  if (SAVE.data.n.plot === 2.4) {
                     SAVE.data.n.plot = 2.41;
                     await Promise.race([
                        events.on('teleport'),
                        walkHer(this, { x: 0, y: -4 }, pos => pos.y > 95).then(async () => {
                           await this.alpha.modulate(renderer, 300, 0);
                        })
                     ]);
                     renderer.detach('main', this);
                  }
               }));
               if (SAVE.data.n.plot < 2.3) {
                  tori.face = 'left';
               } else {
                  tori.face = 'down';
               }
               renderer.attach('main', tori);
               if (SAVE.data.n.plot < 2.3) {
                  await renderer.pause(350);
                  atlas.switch('dialoguerBottom');
                  await dialogue_primitive(...text.a_outlands.dummy1);
                  atlas.switch(null);
                  await walkHer(tori, { x: 4, y: 0 }, position => position.x < 200);
                  tori.position.x = 200;
                  await walkHer(tori, { x: 0, y: -4 }, position => position.y > 110);
                  tori.position.y = 110;
                  tori.face = 'down';
                  await renderer.pause(650);
                  atlas.switch('dialoguerBottom');
                  await dialogue_primitive(...text.a_outlands.dummy2);
                  atlas.switch(null);
                  game.movement = true;
                  SAVE.data.n.plot = 2.3;
               }
            }
            break;
         }
         case 'danger_puzzle': {
            if (args[0] === 'froggit') {
               if (!game.movement) {
                  return;
               }
               if (SAVE.data.n.plot < 2.6) {
                  SAVE.data.n.plot = 2.6;
                  await battler.encounter(player, groups.fakefroggit);
                  if (![ 3, 5 ].includes(SAVE.data.n.state_wastelands_froggit)) {
                     const tori = (outlandsStates.scripts.danger_puzzle ??= {}).tori as CosmosCharacter;
                     tori.face = 'down';
                  }
               }
            } else if (args[0] === 'terminal') {
               if (!game.movement) {
                  return;
               }
               game.movement = false;
               if (48 <= SAVE.data.n.plot) {
                  await dialogue('auto', ...text.a_outlands.danger_puzzle8());
                  game.movement = true;
                  return;
               }
               atlas.switch('dialoguerBottom');
               await dialogue_primitive(...text.a_outlands.danger_puzzle2());
               switch (SAVE.data.n.plot) {
                  case 2.6:
                     SAVE.data.n.plot = 2.601;
                     break;
                  case 2.602:
                     SAVE.data.n.plot = 2.603;
                     break;
                  case 2.601:
                  case 2.603: {
                     atlas.switch('dialoguerBottom');
                     await dialogue_primitive(...text.a_outlands.danger_puzzle3());
                     atlas.switch(null);
                     await walkHer(scriptState.tori!, { x: 0, y: 3 }, position => position.y < 170);
                     await walkHer(scriptState.tori!, { x: 3, y: 0 }, position => position.x < 130);
                     await renderer.pause(850);
                     atlas.switch('dialoguerBottom');
                     await dialogue_primitive(...text.a_outlands.danger_puzzle4());
                     await dialogue_primitive(
                        ...[ text.a_outlands.danger_puzzle5a, text.a_outlands.danger_puzzle5e() ][choicer.result]
                     );
                     if (choicer.result === 1) {
                        SAVE.data.b.w_state_riddleskip = true;
                     }
                     atlas.switch(null);
                     walkHer(player, { x: 0, y: 3 }, position => position.y < 200).then(() => {
                        player.face = 'up';
                     });
                     await walkHer(scriptState.tori!, { x: 3, y: 0 }, position => position.x < 160);
                     await walkHer(scriptState.tori!, { x: 0, y: -3 }, position => position.y > 170);
                     await renderer.pause(1250);
                     if (choicer.result === 0) {
                        scriptState.tori!.face = 'down';
                        await renderer.pause(650);
                        atlas.switch('dialoguerBottom');
                        await dialogue_primitive(
                           ...[
                              ...text.a_outlands.danger_puzzle5b,
                              ...[ text.a_outlands.danger_puzzle5c, text.a_outlands.danger_puzzle5d ][
                                 SAVE.data.b.oops ? 1 : 0
                              ]
                           ]
                        );
                        atlas.switch(null);
                        await renderer.pause(250);
                        scriptState.tori!.face = 'up';
                     }
                     header('x1').then(() => {
                        sounds.retract.instance(renderer).rate.value = 1.25;
                        for (const object of objectsByTag(tags => tags.includes('dangerPylon'))) {
                           const [ anim ] = object.objects as [CosmosAnimation, CosmosHitbox];
                           anim.enable();
                           anim.on('tick', () => {
                              if (anim.active && anim.index === 5) {
                                 anim.disable();
                                 object.objects.splice(1, 1);
                              }
                           });
                        }
                     });
                     await renderer.pause(1150);
                     atlas.switch('dialoguerBottom');
                     await dialogue_primitive(...text.a_outlands.danger_puzzle6());
                     atlas.switch(null);
                     await walkHer(scriptState.tori!, { x: -3, y: 0 }, position => position.x > 100);
                     await walkHer(scriptState.tori!, { x: 0, y: -3 }, position => position.y > 150);
                     await walkHer(scriptState.tori!, { x: -3, y: 0 }, position => position.x > 40);
                     scriptState.tori!.face = 'right';
                     SAVE.data.n.plot = 2.61;
                     await renderer.pause(650);
                     atlas.switch('dialoguerBottom');
                     await dialogue_primitive(...text.a_outlands.danger_puzzle7());
                     atlas.switch(null);
                  }
               }
               atlas.switch(null);
               game.movement = true;
               break;
            } else if (args[0] === 'tori') {
               scriptState.tori.face = 'down';
               atlas.switch('dialoguerBottom');
               await dialogue_primitive(...text.a_outlands.danger_puzzle6());
               atlas.switch(null);
            }
            if (SAVE.data.n.plot > 2.603) {
               for (const object of objectsByTag(tags => tags.includes('dangerPylon'))) {
                  if (object.objects.length > 1) {
                     const [ anim ] = object.objects as [CosmosAnimation, CosmosHitbox];
                     anim.index = 5;
                     object.objects.splice(1, object.objects.length - 1);
                  }
               }
            }
            if (scriptState.active || SAVE.data.n.plot > 2.61) {
               return;
            } else if (SAVE.data.n.plot < 2.5) {
               if (!game.movement) {
                  return;
               }
               game.movement = false;
            }
            scriptState.active = true;
            const tori = (scriptState.tori = new CosmosCharacter({
               anchor: { x: 0, y: 1 },
               size: { x: 25, y: 5 },
               metadata: { barrier: true, args: [ 'torieldanger' ], interact: true, name: 'outlands' },
               position:
                  SAVE.data.n.plot < 2.5
                     ? { x: 100, y: 340 }
                     : SAVE.data.n.plot < 2.61
                     ? { x: 100, y: 140 }
                     : { x: 40, y: 150 },
               preset: characters.toriel,
               key: 'toriel'
            }).on('tick', async function () {
               if (SAVE.data.n.plot > 2.61) {
                  return;
               }
               this.preset = game.room === 'w_danger' ? characters.toriel : characters.none;
               this.metadata.barrier = game.room === 'w_danger';
               this.metadata.interact = game.room === 'w_danger';
               if (
                  game.room === 'w_danger' &&
                  SAVE.data.n.plot === 2.61 &&
                  player.position.extentOf(tori.position) < 45
               ) {
                  SAVE.data.n.plot = 2.62;
                  this.metadata.barrier = false;
                  this.metadata.interact = false;
                  await Promise.race([
                     events.on('teleport'),
                     walkHer(this, { x: -3, y: 0 }, pos => pos.x > 20).then(() => this.alpha.modulate(renderer, 300, 0))
                  ]);
                  renderer.detach('main', this);
               }
            }));
            if (SAVE.data.n.plot < 2.6 || [ 3, 5 ].includes(SAVE.data.n.state_wastelands_froggit)) {
               tori.face = 'left';
            } else if (SAVE.data.n.plot < 2.61) {
               tori.face = 'down';
            } else {
               tori.face = 'right';
            }
            renderer.attach('main', tori);
            if (SAVE.data.n.plot < 2.5) {
               tori.face = 'down';
               await renderer.pause(350);
               atlas.switch('dialoguerBottom');
               await dialogue_primitive(...text.a_outlands.danger_puzzle1());
               atlas.switch(null);
               SAVE.data.n.plot = 2.5;
               game.movement = true;
               await walkHer(tori, { x: 0, y: -4 }, position => position.y > 140).then(() => {
                  tori.face = 'left';
               });
            }
            break;
         }
         case 'zigzag_test': {
            if (player.position.x < 320 && player.position.y > 400) {
               renderer.region[0].x = 160;
               renderer.region[1].x = 160;
            } else if (player.position.x > 760 && player.position.y < 340) {
               renderer.region[0].x = 920;
               renderer.region[1].x = 920;
            } else {
               renderer.region[0].x = 160;
               renderer.region[1].x = 920;
            }
            if (scriptState.active || SAVE.data.n.plot > 2.71) {
               return;
            } else {
               scriptState.active = true;
            }
            let cutscene = false;
            const tori = new CosmosCharacter({
               anchor: { x: 0, y: 1 },
               size: { x: 25, y: 5 },
               position: SAVE.data.n.plot < 2.7 ? { x: 245, y: 580 } : { x: 810, y: 105 },
               preset: characters.toriel,
               key: 'toriel'
            }).on('tick', async function () {
               if (!cutscene) {
                  this.preset = game.room === 'w_zigzag' ? characters.toriel : characters.none;
                  this.metadata.barrier = game.room === 'w_zigzag';
                  this.metadata.interact = game.room === 'w_zigzag';
               }
            });
            if (SAVE.data.n.plot < 2.7) {
               tori.face = 'right';
            } else {
               tori.face = 'down';
            }
            renderer.attach('main', tori);
            const destiePromise = renderer.when(
               () => game.room === 'w_zigzag' && player.position.extentOf(810, 105) < 50
            );
            if (SAVE.data.n.plot < 2.7) {
               await renderer.when(() => game.movement);
               game.movement = false;
               await renderer.pause(350);
               atlas.switch('dialoguerBottom');
               await dialogue_primitive(...text.a_outlands.indie1());
               if (choicer.result === 1) {
                  await dialogue_primitive(...text.a_outlands.indie1a());
                  if (choicer.result === 1) {
                     await dialogue_primitive(...text.a_outlands.indie1b());
                     if (choicer.result === 1) {
                        atlas.switch(null);
                        game.music?.stop();
                        await renderer.pause(1e3);
                        atlas.switch('dialoguerBottom');
                        await dialogue_primitive(...text.a_outlands.indie2b);
                        const feels = music.toriel.instance(renderer);
                        feels.gain.value /= 4;
                        feels.gain.modulate(renderer, 300, feels.gain.value * 4);
                        await dialogue_primitive(...text.a_outlands.indie2b1);
                        atlas.switch(null);
                        const handholder = new CosmosCharacter({
                           anchor: { x: 0, y: 1 },
                           position: { x: 260, y: 580 },
                           preset: characters.torielHandhold,
                           key: 'toriel'
                        });
                        handholder.face = 'left';
                        player.alpha.value = 0;
                        renderer.detach('main', tori);
                        renderer.attach('main', handholder);
                        const fd = fader();
                        Promise.race([
                           walkHer(player, { x: -1.5, y: -1.5 }, position => position.x > 60),
                           walkHer(handholder, { x: -1.5, y: -1.5 }, position => position.x > 60)
                        ]);
                        await Promise.all([
                           fd.alpha.modulate(renderer, 3000, 1),
                           renderer.pause(1850).then(async () => {
                              musicConvolver.modulate(renderer, 1150, 0.8);
                              feels.rate.modulate(renderer, 1150, feels.rate.value * 0.875);
                           })
                        ]);
                        renderer.detach('main', handholder);
                        player.alpha.value = 1;
                        await feels?.gain.modulate(renderer, 1500, 0).then(() => feels.stop());
                        musicConvolver.value = 0;
                        await renderer.pause(1150);
                        atlas.switch('dialoguerBottom');
                        await dialogue_primitive(...text.a_outlands.indie2f);
                        atlas.switch(null);
                        await renderer.pause(1500);
                        await Promise.all([
                           renderer.pause(2000),
                           teleport('w_toriel_asriel', 'down', 221, 137, { fade: false, fast: true })
                        ]);
                        game.music?.stop();
                        game.music = music.home.instance(renderer, 0, true);
                        game.music.gain.value = 0;
                        game.music.rate.value = world.ambiance;
                        const bedcover = new CosmosSprite({
                           position: { x: 206, y: 119 },
                           frames: [
                              SAVE.data.b.w_state_lamp
                                 ? content.iooOTorielAsrielOver
                                 : content.iooOTorielAsrielOverLight
                           ]
                        });
                        renderer.attach('above', bedcover);
                        await fd.alpha.modulate(renderer, 1000, 0);
                        await renderer.pause(2000);
                        await fd.alpha.modulate(renderer, 1000, 1);
                        SAVE.data.n.plot = 8.1;
                        SAVE.data.n.state_pie = 1;
                        SAVE.data.n.plot_call = 4;
                        SAVE.data.n.plot_stalker = 7;
                        SAVE.data.n.state_wastelands_napstablook = 5;
                        SAVE.data.b.w_state_lamp || outlandsScript('toriel_asriel_lamp', 'silent');
                        outlandsScript('pie', 'spawn');
                        SAVE.data.n.hp = Math.max(SAVE.data.n.hp, Math.min(calcHP() + calcBonusHP(), 99));
                        renderer.detach('above', bedcover);
                        player.position.x = 195;
                        player.face = 'left';
                        if (world.postnoot) {
                           await renderer.pause(1000);
                           await dialogue('auto', ...text.a_outlands.nosleep);
                           world.nootflags.add('sleep');
                        }
                        await renderer.pause(2000);
                        game.movement = true;
                        (outlandsStates.scripts.toriel_asriel_lamp ??= {}).music?.gain.modulate(
                           renderer,
                           300,
                           world.level
                        );
                        await fd.alpha.modulate(renderer, 300, 0);
                        renderer.detach('menu', fd);
                        return;
                     }
                  }
               }
               SAVE.data.n.plot = 2.7;
               const queue = content.amTension.load();
               atlas.switch(null);
               game.music?.stop();
               await Promise.all([ queue, renderer.pause(650) ]);
               atlas.switch('dialoguerBottom');
               await dialogue_primitive(...text.a_outlands.indie2a);
               atlas.switch(null);
               game.movement = true;
               const tension = music.tension.instance(renderer);
               Promise.race([
                  destiePromise,
                  events.on('teleport-start').then(() => tension.gain.modulate(renderer, 300, 0))
               ]).then(async () => {
                  tension.stop();
                  content.amTension.unload();
               });
               walkHer(tori, { x: 0, y: -4.5 }, position => position.y > 555).then(async () => {
                  await walkHer(tori, { x: -4.5, y: -4.5 }, position => position.y > 380);
                  await walkHer(tori, { x: 4.5, y: -4.5 }, position => position.x < 320);
                  await walkHer(tori, { x: 4.5, y: 4.5 }, position => position.x < 760);
                  await walkHer(tori, { x: 4.5, y: -4.5 }, position => position.y > 320);
                  await walkHer(tori, { x: -4.5, y: -4.5 }, position => position.x > 820);
                  tori.position.x = 810;
                  tori.position.y = 105;
                  tori.face = 'down';
               });
            }
            await destiePromise;
            game.movement = false;
            if (tori.position.angleFrom(player.position) > 45) {
               tori.face = 'down';
            }
            cutscene = true;
            atlas.switch('dialoguerBottom');
            if (SAVE.data.n.plot < 2.71) {
               await dialogue_primitive(...text.a_outlands.indie3a);
            } else {
               await dialogue_primitive(...text.a_outlands.indie3b);
            }
            atlas.switch(null);
            SAVE.data.n.plot = 3;
            const feels = music.toriel.instance(renderer);
            feels.gain.value /= 4;
            feels.gain.modulate(renderer, 1000, feels.gain.value * 4);
            await renderer.pause(1250);
            atlas.switch('dialoguerBottom');
            await dialogue_primitive(...text.a_outlands.indie4());
            atlas.switch(null);
            await walkHer(tori, { x: -3, y: 0 }, position => position.x > 775);
            await Promise.all([ tori.alpha.modulate(renderer, 300, 0), feels.gain.modulate(renderer, 300, 0) ]);
            renderer.detach('main', tori);
            feels.stop();
            game.movement = true;
            SAVE.data.n.plot = 4;
            quickresume(true);
            let garbo = 0;
            let valid = true;
            events.on('teleport').then(async ([ from, to ]) => {
               to === 'w_froggit' && outlandsScript('froggit');
               if (valid) {
                  valid = false;
                  if (SAVE.data.n.plot !== 4.1) {
                     teleporter.movement = false;
                     game.movement = false;
                     atlas.switch('dialoguerBottom');
                     await dialogue_primitive(...text.a_outlands.indie6(garbo < 1), commonText.c_call_common.end);
                     atlas.switch(null);
                     game.movement = true;
                  }
                  SAVE.data.n.plot = 5;
               }
            });
            while (valid) {
               await renderer.pause(60e3 * 5);
               if (!valid) {
                  break;
               }
               await renderer.when(() => game.movement);
               game.movement = false;
               atlas.switch('dialoguerBottom');
               switch (garbo) {
                  case 2:
                     SAVE.data.n.plot = 4.1;
                     break;
                  case 5:
                     SAVE.data.n.plot = 4.2;
                     break;
               }
               await dialogue_primitive(...text.a_outlands.indie5[garbo++], commonText.c_call_common.end);
               atlas.switch(null);
               if (garbo === text.a_outlands.indie5.length) {
                  valid = false;
                  const overlay = fader();
                  await Promise.all([
                     game.music!.gain.modulate(renderer, 1150, 0),
                     overlay.alpha.modulate(renderer, 1150, 1)
                  ]);
                  game.music?.stop();
                  await renderer.pause(450);
                  atlas.switch('dialoguerBottom');
                  await dialogue_primitive(...text.a_outlands.indie7);
                  atlas.switch(null);
                  tori.face = 'down';
                  tori.position.x = 810;
                  tori.position.y = 105;
                  player.face = 'up';
                  player.position.x = 810;
                  player.position.y = 135;
                  renderer.region[0].x = 920;
                  renderer.region[1].x = 920;
                  renderer.attach('main', tori);
                  tori.alpha.value = 1;
                  const feels = music.toriel.instance(renderer);
                  feels.gain.value /= 4;
                  await Promise.all([
                     feels.gain.modulate(renderer, 850, feels.gain.value * 4),
                     overlay.alpha.modulate(renderer, 850, 0)
                  ]);
                  renderer.detach('menu', overlay);
                  atlas.switch('dialoguerBottom');
                  await dialogue_primitive(...text.a_outlands.indie8);
                  atlas.switch(null);
                  renderer.attach('menu', overlay);
                  await overlay.alpha.modulate(renderer, 850, 1);
                  await renderer.pause(650);
                  SAVE.data.n.plot = 7;
                  SAVE.data.n.plot_call = 4;
                  SAVE.data.n.plot_stalker = 7;
                  SAVE.data.n.state_wastelands_napstablook = 5;
                  await feels.gain.modulate(renderer, 650, 0);
                  feels.stop();
                  renderer.alpha.value = 0;
                  renderer.detach('menu', overlay);
                  await teleport('w_toriel_front', 'up', 159, 230, world);
                  tori.position = new CosmosPoint(159, 200);
                  tori.face = 'down';
                  await renderer.pause(650);
                  atlas.switch('dialoguerTop');
                  await dialogue_primitive(...text.a_outlands.return4());
                  atlas.switch(null);
                  game.movement = true;
                  await Promise.race([
                     events.on('teleport'),
                     walkHer(tori, { x: 3, y: 0 }, pos => pos.x < 300).then(() => tori.alpha.modulate(renderer, 300, 0))
                  ]);
                  renderer.detach('main', tori);
               } else {
                  game.movement = true;
               }
            }
            break;
         }
         case 'toriel_asriel_lamp': {
            args[0] === 'silent' || sounds.noise.instance(renderer);
            SAVE.data.b.w_state_lamp = !SAVE.data.b.w_state_lamp;
            instance('below', 'coverdark')!.object.alpha.value = SAVE.data.b.w_state_lamp ? 1 : 0;
            if (game.music && SAVE.data.n.state_wastelands_toriel !== 2) {
               const mus = scriptState.music as CosmosInstance;
               const ratio1 = game.music.gain.value / world.level;
               const ratio2 = mus.gain.value / world.level;
               if (SAVE.data.b.w_state_lamp) {
                  if (game.music.gain.value > 0) {
                     mus.gain.modulate(renderer, (1 - ratio2) * 300, world.level);
                     game.music.gain.modulate(renderer, ratio1 * 300, 0);
                  }
               } else if (mus.gain.value > 0) {
                  game.music.gain.modulate(renderer, (1 - ratio1) * 300, world.level);
                  mus.gain.modulate(renderer, ratio2 * 300, 0);
               }
            }
            break;
         }
         case 'toriel_asriel_exit': {
            await teleport('w_toriel_hallway', 'down', 170.5, 122, world);
            break;
         }
         case 'goner': {
            if (!game.movement) {
               return;
            }
            const lines = text.a_outlands[subscript];
            game.movement = false;
            atlas.switch('dialoguerTop');
            await dialogue_primitive(...lines.a1());
            atlas.switch(null);
            (objectsByTag(tags => tags.includes('w_goner'))[0].objects[0] as CosmosAnimation).index = 1;
            await renderer.pause(1000);
            atlas.switch('dialoguerTop');
            await dialogue_primitive(...lines.a2());
            atlas.switch(null);
            SAVE.flag.b.$aster = true;
            instanceDestroy([ 'w_goner' ]);
            sounds.bahbye.instance(renderer);
            game.movement = true;
            break;
         }
         case 'coffin': {
            if (!game.movement) {
               return;
            }
            let page = 0;
            game.movement = false;
            atlas.switch('dialoguerTop');
            if (SAVE.data.b.oops) {
               await dialogue_primitive(...text.a_outlands.w_coffin1());
            } else if (SAVE.data.b.w_state_diary) {
               await dialogue_primitive(...text.a_outlands.w_coffin0());
            } else {
               await dialogue_primitive(...text.a_outlands.w_coffin2());
               while (page < 11 && choicer.result === 0) {
                  await dialogue_primitive(...text.a_outlands.asrielDiary[page++], ...text.a_outlands.w_coffin3());
                  if (page === 11) {
                     SAVE.data.b.w_state_diary = true;
                     if (choicer.result === 0) {
                        await dialogue_primitive(...text.a_outlands.w_coffin4);
                     }
                  }
               }
               await dialogue_primitive(...text.a_outlands.w_coffin5);
            }
            game.movement = true;
            atlas.switch(null);
            break;
         }
         case 'puzzle1': {
            scriptState.pressed || (scriptState.pressed = []);
            scriptState.buttons || (scriptState.buttons = []);
            scriptState.sequence || (scriptState.sequence = []);
            if (args[0] === 'switch') {
               if (SAVE.data.n.plot > 5) {
                  if (!game.movement) {
                     return;
                  }
                  game.movement = false;
                  atlas.switch('dialoguerBottom');
                  await dialogue_primitive(...text.a_outlands.puzzle1A());
                  atlas.switch(null);
                  game.movement = true;
                  return;
               }
               const anim = objectsByTag(tags => tags.includes('w_puzzle1_switch'))[0].objects[0] as CosmosAnimation;
               if (anim.index === 0) {
                  anim.index = 1;
                  sounds.switch.instance(renderer);
                  for (const button of scriptState.pressed.splice(0)) {
                     button.index = 6;
                  }
                  if (scriptState.alter) {
                     scriptState.sequence = CosmosUtils.populate(4, () => rng.overworld.int(4));
                  } else {
                     scriptState.alter = true;
                  }
                  await renderer.pause(200);
                  for (const [ index1, objects ] of scriptState.buttons.entries()) {
                     sounds.noise.instance(renderer);
                     for (const [ index2, button ] of objects.entries()) {
                        if (button.index === 6) {
                           if (scriptState.sequence[index1] === index2) {
                              button.index = 1;
                              renderer.pause(250).then(() => {
                                 button.index = 6;
                              });
                           }
                        } else {
                           return;
                        }
                     }
                     await renderer.pause(250);
                  }
                  anim.index = 0;
               }
               return;
            }
            if (scriptState.active) {
               return;
            }
            scriptState.active = true;
            if (SAVE.data.n.plot > 5) {
               for (const object of objectsByTag(tags => tags.includes('w_puzzle1_pylon'))) {
                  if (object.objects.length > 1) {
                     const [ anim ] = object.objects as [CosmosAnimation, CosmosHitbox];
                     anim.index = 5;
                     object.objects.splice(1, object.objects.length - 1);
                  }
               }
               return;
            }
            scriptState.buttons = CosmosUtils.populate(4, index =>
               objectsByTag(tags => {
                  if (tags.includes('w_puzzle1_button')) {
                     for (const tag of tags) {
                        if (tag[0] === index.toString()) {
                           return true;
                        }
                     }
                  }
                  return false;
               }).map(object => {
                  const anim = object.objects[0] as CosmosAnimation;
                  anim.index = 6;
                  return anim;
               })
            );
            scriptState.sequence = CosmosUtils.populate(4, () => rng.overworld.int(4));
            CosmosUtils.chain<void, Promise<void>>(void 0, async (x, next) => {
               if (SAVE.data.n.plot < 5.1) {
                  await renderer.on('render');
                  if (game.room !== 'w_puzzle1') {
                     next();
                     return;
                  }
                  top: for (const [ index1, objects ] of scriptState.buttons.entries()) {
                     for (const [ index2, anim ] of objects.entries()) {
                        if (
                           Math.abs(anim.position.x - player.position.x) < 7 &&
                           Math.abs(anim.position.y - player.position.y) <= 10 &&
                           game.movement
                        ) {
                           if (anim.index === 6) {
                              scriptState.pressed.push(anim);
                              sounds.noise.instance(renderer);
                              if (scriptState.sequence[index1] === index2) {
                                 if (scriptState.pressed.length === 4) {
                                    SAVE.data.n.plot = 5.1;
                                    for (const button of scriptState.pressed) {
                                       button.index = 3;
                                    }
                                    sounds.retract.instance(renderer).rate.value = 1.25;
                                    for (const object of objectsByTag(tags => tags.includes('w_puzzle1_pylon'))) {
                                       const [ anim ] = object.objects as [CosmosAnimation, CosmosHitbox];
                                       anim.enable();
                                       anim.on('tick', () => {
                                          if (anim.active && anim.index === 5) {
                                             anim.disable();
                                             object.objects.splice(1, 1);
                                          }
                                       });
                                    }
                                    await renderer.pause(350);
                                    sounds.noise.instance(renderer).rate.value = 1.2;
                                    for (const kidanim of scriptState.buttons.flat()) {
                                       kidanim.index = 0;
                                    }
                                 } else {
                                    anim.index = 2;
                                 }
                              } else {
                                 game.movement = false;
                                 for (const [ index, button ] of scriptState.pressed.splice(0).entries()) {
                                    button.index = 4;
                                    renderer.pause(200).then(async () => {
                                       button.index = 5;
                                       await renderer.pause(75);
                                       button.index = 4;
                                       await renderer.pause(75);
                                       button.index = 5;
                                       await renderer.pause(75);
                                       button.index = 4;
                                       await renderer.pause(350);
                                       button.index = 6;
                                       if (index === 0) {
                                          sounds.noise.instance(renderer);
                                       }
                                    });
                                 }
                                 await phase(850, { x: 60, y: 160 });
                                 if (game.music && game.music.gain.value > 0 && atlas.target === null) {
                                    game.movement = true;
                                 }
                              }
                           }
                           break top;
                        }
                     }
                  }
                  next();
               }
            });
            break;
         }
         case 'puzzle2': {
            if (scriptState.active || SAVE.data.n.plot > 5.1) {
               return;
            }
            scriptState.active = true;
            const pads = objectsByTag(tags => tags.includes('w_puzzle2_pad'));
            const rad = rand_rad(rng.overworld.next());
            for (const [ index, obj ] of pads.entries()) {
               const anim = obj.objects[0] as CosmosAnimation;
               anim.index = 16;
               anim.position.y = -10;
               anim.on('tick', () => {
                  if (anim.active && anim.index === 13 && anim.step === anim.duration - 1) {
                     anim.index = 2;
                  }
               });
               obj.on('tick', async function () {
                  if (SAVE.data.n.plot > 5.1 || scriptState.fail) {
                     return;
                  }
                  this.metadata.runs ??= 0;
                  this.metadata.state ??= 0;
                  this.metadata.lastspot ??= player.position.value();
                  switch (this.metadata.state) {
                     case 2:
                        if (player.position.y > this.position.y - 3) {
                           break;
                        }
                     case 0:
                        if (
                           player.position.y > this.position.y - 20 &&
                           Math.abs(player.position.x - this.position.x) <= 20
                        ) {
                           this.metadata.state = 1;
                           const run = ++this.metadata.runs;
                           if (!this.metadata.resound) {
                              this.metadata.resound = true;
                              sounds.noise.instance(renderer);
                           }
                           anim.index = 2;
                           anim.enable();
                           await renderer.pause(1500 + rad.next() * 750);
                           let round = 0;
                           while (this.metadata.state === 1 && this.metadata.runs === run && round++ < 5) {
                              if (round === 5) {
                                 this.metadata.state = 0;
                              } else {
                                 anim.disable();
                                 anim.index = 14;
                                 await renderer.pause(133);
                                 if (this.metadata.state === 1 && this.metadata.runs === run) {
                                    anim.index = 0;
                                    await renderer.pause(133);
                                 }
                              }
                           }
                        } else {
                           anim.index = 16;
                           this.metadata.resound = false;
                        }
                        break;
                     case 1:
                        if (player.position.y > this.position.y - 3) {
                           if (anim.active || player.position.extentOf(this.metadata.lastspot) === 0) {
                              game.menu = false;
                              scriptState.fail = true;
                              game.movement = false;
                              anim.disable();
                              anim.index = 15;
                              renderer.pause(200).then(async () => {
                                 anim.index = 1;
                                 await renderer.pause(75);
                                 anim.index = 15;
                                 await renderer.pause(75);
                                 anim.index = 1;
                                 await renderer.pause(75);
                                 anim.index = 15;
                                 await renderer.pause(350);
                                 anim.index = 16;
                                 this.metadata.resound = false;
                                 sounds.noise.instance(renderer);
                              });
                              this.metadata.state = -1;
                              await phase(850, { x: 190, y: 120 });
                              this.metadata.state = 0;
                              game.movement = true;
                              scriptState.fail = false;
                              game.menu = true;
                           }
                        }
                        break;
                  }
                  if (this.metadata.state < 2 && player.position.y > this.position.y + 3) {
                     this.metadata.state = 2;
                     anim.index = 16;
                     sounds.noise.instance(renderer);
                     if (index === 2) {
                        for (const other of pads.map(pad => pad.objects[0] as CosmosAnimation)) {
                           other.index = 0;
                        }
                        SAVE.data.n.plot = 5.2;
                     }
                  }
                  this.metadata.lastspot = player.position.value();
               });
            }
            break;
         }
         case 'puzzle3': {
            scriptState.pressed || (scriptState.pressed = []);
            scriptState.buttons || (scriptState.buttons = []);
            scriptState.sequence || (scriptState.sequence = []);
            if (args[0] === 'switch') {
               if (SAVE.data.n.plot > 5.2) {
                  if (!game.movement) {
                     return;
                  }
                  game.movement = false;
                  atlas.switch('dialoguerBottom');
                  await dialogue_primitive(...text.a_outlands.puzzle3A());
                  atlas.switch(null);
                  game.movement = true;
                  return;
               }
               const anim = objectsByTag(tags => tags.includes('w_puzzle3_switch'))[0].objects[0] as CosmosAnimation;
               if (anim.index === 0) {
                  anim.index = 1;
                  sounds.switch.instance(renderer);
                  for (const button of scriptState.pressed.splice(0)) {
                     button.index = 6;
                  }
                  if (scriptState.alter) {
                     scriptState.sequence = CosmosUtils.populate(5, () => rng.overworld.int(4));
                  } else {
                     scriptState.alter = true;
                  }
                  await renderer.pause(200);
                  for (const [ index1, objects ] of scriptState.buttons.entries()) {
                     sounds.noise.instance(renderer);
                     for (const [ index2, button ] of objects.entries()) {
                        if (button.index === 6) {
                           if (scriptState.sequence[index1] === index2) {
                              button.index = 1;
                              renderer.pause(250).then(() => {
                                 button.index = 6;
                              });
                           }
                        } else {
                           return;
                        }
                     }
                     await renderer.pause(450);
                  }
                  anim.index = 0;
               }
               return;
            }
            if (scriptState.active) {
               return;
            }
            scriptState.active = true;
            if (SAVE.data.n.plot > 5.2) {
               for (const object of objectsByTag(tags => tags.includes('w_puzzle3_pylon'))) {
                  if (object.objects.length > 1) {
                     const [ anim ] = object.objects as [CosmosAnimation, CosmosHitbox];
                     anim.index = 5;
                     object.objects.splice(1, object.objects.length - 1);
                  }
               }
               return;
            }
            scriptState.buttons = CosmosUtils.populate(5, index =>
               objectsByTag(tags => {
                  if (tags.includes('w_puzzle3_button')) {
                     for (const tag of tags) {
                        if (tag[0] === index.toString()) {
                           return true;
                        }
                     }
                  }
                  return false;
               }).map(object => {
                  const anim = object.objects[0] as CosmosAnimation;
                  anim.index = 6;
                  return anim;
               })
            );
            scriptState.sequence = CosmosUtils.populate(5, () => rng.overworld.int(4));
            CosmosUtils.chain<void, Promise<void>>(void 0, async (x, next) => {
               if (SAVE.data.n.plot < 5.3) {
                  await renderer.on('render');
                  if (game.room !== 'w_puzzle3') {
                     next();
                     return;
                  }
                  top: for (const [ index1, objects ] of scriptState.buttons.entries()) {
                     for (const [ index2, anim ] of objects.entries()) {
                        if (
                           Math.abs(anim.position.x - player.position.x) < 7 &&
                           Math.abs(anim.position.y - player.position.y) <= 10 &&
                           game.movement
                        ) {
                           if (anim.index === 6) {
                              scriptState.pressed.push(anim);
                              sounds.noise.instance(renderer);
                              if (scriptState.sequence[index1] === index2) {
                                 if (scriptState.pressed.length === 5) {
                                    SAVE.data.n.plot = 5.3;
                                    for (const button of scriptState.pressed) {
                                       button.index = 3;
                                    }
                                    sounds.retract.instance(renderer).rate.value = 1.25;
                                    for (const object of objectsByTag(tags => tags.includes('w_puzzle3_pylon'))) {
                                       const [ anim ] = object.objects as [CosmosAnimation, CosmosHitbox];
                                       anim.enable();
                                       anim.on('tick', () => {
                                          if (anim.active && anim.index === 5) {
                                             anim.disable();
                                             object.objects.splice(1, 1);
                                          }
                                       });
                                    }
                                    await renderer.pause(350);
                                    sounds.noise.instance(renderer).rate.value = 1.2;
                                    for (const kidanim of scriptState.buttons.flat()) {
                                       kidanim.index = 0;
                                    }
                                 } else {
                                    anim.index = 2;
                                 }
                              } else {
                                 game.movement = false;
                                 for (const [ index, button ] of scriptState.pressed.splice(0).entries()) {
                                    button.index = 4;
                                    renderer.pause(200).then(async () => {
                                       button.index = 5;
                                       await renderer.pause(75);
                                       button.index = 4;
                                       await renderer.pause(75);
                                       button.index = 5;
                                       await renderer.pause(75);
                                       button.index = 4;
                                       await renderer.pause(350);
                                       button.index = 6;
                                       if (index === 0) {
                                          sounds.noise.instance(renderer);
                                       }
                                    });
                                 }
                                 await phase(850, { x: 60, y: 200 });
                                 if (game.music && game.music.gain.value > 0 && atlas.target === null) {
                                    game.movement = true;
                                 }
                              }
                           }
                           break top;
                        }
                     }
                  }
                  next();
               }
            });
            break;
         }
         case 'puzzle4': {
            if (scriptState.active || SAVE.data.n.plot > 5.3) {
               return;
            }
            scriptState.active = true;
            const pads = objectsByTag(tags => tags.includes('w_puzzle4_pad'));
            const rad = rand_rad(rng.overworld.next());
            for (const [ index, obj ] of pads.entries()) {
               obj.position.y += 10;
               const anim = obj.objects[0] as CosmosAnimation;
               anim.index = 16;
               anim.position.y = -10;
               anim.on('tick', () => {
                  if (anim.active && anim.index === 13 && anim.step === anim.duration - 1) {
                     anim.index = 2;
                  }
               });
               obj.on('tick', async function () {
                  if (SAVE.data.n.plot > 5.3 || scriptState.fail || !game.movement) {
                     return;
                  }
                  this.metadata.runs ??= 0;
                  this.metadata.state ??= 0;
                  this.metadata.lastspot ??= player.position.value();
                  switch (this.metadata.state) {
                     case 2:
                        if (player.position.y < this.position.y + 3) {
                           break;
                        }
                     case 0:
                        if (
                           player.position.y < this.position.y + 20 &&
                           Math.abs(player.position.x - this.position.x) <= 20
                        ) {
                           this.metadata.state = 1;
                           const run = ++this.metadata.runs;
                           if (!this.metadata.resound) {
                              this.metadata.resound = true;
                              sounds.noise.instance(renderer);
                           }
                           anim.index = 2;
                           anim.enable();
                           await renderer.pause(1000 + rad.next() * 500);
                           let round = 0;
                           while (this.metadata.state === 1 && this.metadata.runs === run && round++ < 5) {
                              if (round === 5) {
                                 this.metadata.state = 0;
                              } else {
                                 anim.disable();
                                 anim.index = 14;
                                 await renderer.pause(133);
                                 if (this.metadata.state === 1 && this.metadata.runs === run) {
                                    anim.index = 0;
                                    await renderer.pause(133);
                                 }
                              }
                           }
                        } else {
                           anim.index = 16;
                           this.metadata.resound = false;
                        }
                        break;
                     case 1:
                        if (player.position.y < this.position.y + 3) {
                           if (anim.active || player.position.extentOf(this.metadata.lastspot) === 0) {
                              game.menu = false;
                              scriptState.fail = true;
                              game.movement = false;
                              anim.disable();
                              anim.index = 15;
                              renderer.pause(200).then(async () => {
                                 anim.index = 1;
                                 await renderer.pause(75);
                                 anim.index = 15;
                                 await renderer.pause(75);
                                 anim.index = 1;
                                 await renderer.pause(75);
                                 anim.index = 15;
                                 await renderer.pause(350);
                                 anim.index = 16;
                                 this.metadata.resound = false;
                                 sounds.noise.instance(renderer);
                              });
                              this.metadata.state = -1;
                              await phase(850, { x: 210, y: 380 });
                              this.metadata.state = 0;
                              game.movement = true;
                              scriptState.fail = false;
                              game.menu = true;
                           }
                        }
                        break;
                  }
                  if (this.metadata.state < 2 && player.position.y < this.position.y - 3) {
                     this.metadata.state = 2;
                     anim.index = 16;
                     sounds.noise.instance(renderer);
                     if (index === 0) {
                        for (const other of pads.map(pad => pad.objects[0] as CosmosAnimation)) {
                           other.index = 0;
                        }
                        SAVE.data.n.plot = 5.4;
                     }
                  }
                  this.metadata.lastspot = player.position.value();
               });
            }
            break;
         }
         case 'blooky': {
            if (args[0] === 'talk') {
               if (!game.movement) {
                  return;
               }
               game.movement = false;
               atlas.switch('dialoguerBottom');
               if (SAVE.data.n.plot < 6) {
                  await dialogue_primitive(...text.a_outlands.blooky1());
                  SAVE.data.n.plot = 6;
               } else {
                  await dialogue_primitive(...text.a_outlands.blooky2());
               }
               atlas.switch(null);
               if (choicer.result === 0) {
                  await battler.encounter(player, groups.napstablook);
                  const blooky = objectsByTag(tags => tags.includes('napstablookBody'))[0];
                  instanceDestroy([ 'napstablookBody' ]);
                  const blooky2 = character('napstablook', characters.napstablook, blooky, 'left');
                  atlas.switch('dialoguerBottom');
                  await dialogue_primitive(
                     ...[
                        text.a_outlands.blooky3,
                        text.a_outlands.blooky4,
                        text.a_outlands.blooky5,
                        text.a_outlands.blooky6,
                        text.a_outlands.blooky7
                     ][SAVE.data.n.state_wastelands_napstablook]
                  );
                  atlas.switch(null);
                  Promise.race([ events.on('teleport'), blooky2.alpha.modulate(renderer, 500, 0) ]).then(() => {
                     renderer.detach('main', blooky2);
                  });
                  SAVE.data.n.plot = 6.1;
               } else {
                  player.position.x -= 3;
                  player.face = 'left';
               }
               game.movement = true;
               return;
            }
            if (SAVE.data.n.plot > 6) {
               instanceDestroy([ 'napstablookBody' ]);
            } else if (world.population === 0) {
               const blooky = objectsByTag(tags => tags.includes('napstablookBody'))[0];
               if (!roomState.amongus) {
                  roomState.amongus = true;
                  await Promise.race([ events.on('teleport'), blooky.alpha.modulate(renderer, 500, 0) ]);
                  instanceDestroy([ 'napstablookBody' ]);
                  SAVE.data.n.state_wastelands_napstablook = 3;
                  SAVE.data.n.plot = 6.1;
               }
            }
            break;
         }
         case 'mouse': {
            player.face !== 'up' ||
               ateThreshold() ||
               SAVE.data.b.svr ||
               world.runaway ||
               sounds.squeak.instance(renderer);
            break;
         }
         case 'wonder': {
            scriptState.ticks ??= 0;
            if (
               SAVE.flag.b.$aster &&
               !SAVE.data.b.oops &&
               !SAVE.data.b.heard_narrator &&
               SAVE.data.n.plot < 8.1 &&
               player.face === 'up'
            ) {
               if (scriptState.ticks++ === 30 * 3) {
                  await renderer.when(() => game.movement);
                  SAVE.data.b.heard_narrator = true;
                  atlas.switch('dialoguerTop');
                  game.movement = false;
                  await dialogue_primitive(...text.a_outlands.wonder1);
                  atlas.switch(null);
                  game.movement = true;
               }
            } else {
               scriptState.ticks = 0;
            }
            break;
         }
         case 'home': {
            if (SAVE.data.n.plot > 6.2) {
               return;
            } else {
               if (!game.movement) {
                  return;
               }
               SAVE.data.n.plot = 7;
            }
            game.movement = false;
            player.face = 'right';
            const vibesPromise = content.amToriel.load();
            const tori = new CosmosCharacter({
               anchor: { x: 0, y: 1 },
               position: { x: 270, y: 200 },
               preset: characters.toriel,
               key: 'toriel'
            });
            renderer.attach('main', tori);
            await walkHer(tori, { x: 0, y: 3 }, pos => pos.y < player.position.y);
            await notifier(tori);
            await Promise.all([ vibesPromise, walkHer(tori, { x: -4, y: 0 }, pos => pos.x > player.position.x + 25) ]);
            const feels = music.toriel.instance(renderer);
            feels.gain.value /= 4;
            feels.gain.modulate(renderer, 300, feels.gain.value * 4);
            atlas.switch('dialoguerBottom');
            await dialogue_primitive(...text.a_outlands.return1());
            atlas.switch(null);
            await walkHer(tori, { x: -1, y: 0 }, pos => pos.x > player.position.x + 20);
            await renderer.pause(450);
            atlas.switch('dialoguerBottom');
            if (SAVE.data.n.cell_insult < 3 && SAVE.data.n.hp < 5) {
               await dialogue_primitive(...text.a_outlands.return2c);
            } else if (SAVE.data.n.hp < calcHP()) {
               await dialogue_primitive(...text.a_outlands.return2b());
            } else {
               await dialogue_primitive(...text.a_outlands.return2a());
            }
            atlas.switch(null);
            await renderer.pause(550);
            if (SAVE.data.n.hp < calcHP()) {
               heal();
               await renderer.pause(950);
            }
            atlas.switch('dialoguerBottom');
            await dialogue_primitive(...text.a_outlands.return3());
            world.postnoot && world.nootflags.add('toriel');
            atlas.switch(null);
            await renderer.pause(450);
            const handholder = new CosmosCharacter({
               anchor: { x: 0, y: 1 },
               position: { x: player.position.x + 12.5, y: player.position.y },
               preset: characters.torielHandhold,
               key: 'toriel'
            }).on('tick', function () {
               game.room === 'w_courtyard' && player.position.set(this.position.subtract(12.5, 0));
            });
            handholder.face = 'right';
            player.alpha.value = 0;
            renderer.detach('main', tori);
            renderer.attach('main', handholder);
            await walkHer(handholder, { x: 3, y: 0 }, pos => pos.x < 270);
            await walkHer(handholder, { x: 0, y: -3 }, pos => pos.y > 120);
            feels.gain.modulate(renderer, 300, 0).then(() => {
               feels.stop();
               renderer.pause(1000).then(() => {
                  content.amToriel.unload();
               });
            });
            await teleport('w_toriel_front', 'up', 159, 230, world);
            tori.position = new CosmosPoint(159, 200);
            player.alpha.value = 1;
            renderer.detach('main', handholder);
            renderer.attach('main', tori);
            tori.face = 'down';
            await renderer.pause(650);
            atlas.switch('dialoguerTop');
            await dialogue_primitive(...text.a_outlands.return4());
            atlas.switch(null);
            game.movement = true;
            const sus = 3 <= SAVE.data.n.cell_insult;
            await Promise.race([
               events.on('teleport'),
               walkHer(tori, { x: sus ? -3 : 3, y: 0 }, pos => (sus ? pos.x > 20 : pos.x < 300)).then(() =>
                  tori.alpha.modulate(renderer, 300, 0)
               )
            ]);
            renderer.detach('main', tori);
            break;
         }
         case 'front': {
            if (!game.movement) {
               break;
            }
            if (SAVE.data.n.plot === 8.1) {
               game.movement = false;
               SAVE.data.n.plot = 8.2;
               const tori = new CosmosCharacter({
                  anchor: { x: 0, y: 1 },
                  position: { x: 220, y: 70 },
                  preset: characters.torielSpecial,
                  key: 'toriel'
               });
               tori.face = 'down';
               renderer.attach('main', tori);
               const bl = SAVE.data.n.state_wastelands_napstablook < 2 && world.population > 5;
               await renderer.pause(2000);
               atlas.switch('dialoguerBottom');
               await dialogue_primitive(...(bl ? text.a_outlands.front1 : text.a_outlands.front1x));
               atlas.switch(null);
               bl || (await renderer.pause(1000));
               await walkHer(tori, { x: 0, y: 3 }, pos => pos.y < 145);
               await notifier(tori);
               tori.preset = characters.toriel;
               await walkHer(tori, { x: 3, y: 3 }, pos => pos.y < player.position.y);
               await walkHer(tori, { x: 3, y: 0 }, pos => pos.x < player.position.x - 25);
               atlas.switch('dialoguerBottom');
               if (world.population === 0) {
                  await dialogue_primitive(...text.a_outlands.front4());
               } else if (bl) {
                  await dialogue_primitive(...text.a_outlands.front2());
                  if (choicer.result === 0) {
                     await dialogue_primitive(...text.a_outlands.front2a);
                     SAVE.data.b.napsta_performance = true;
                     atlas.switch(null);

                     const lines = text.a_outlands.supervisor;
                     const djAssets = new CosmosInventory(
                        content.iocTorielUp,
                        content.iocNapstablookBody,
                        content.ionOMananaBack,
                        content.ionOSilencioBack,
                        content.ionOSteaksalesmanBack,
                        content.ionOPlugbellyBack,
                        content.ionOWoshuaBack,
                        content.ionOMushyBack,
                        content.ionOFroggitBack,
                        content.ionOLooxBack
                     );
                     djAssets.name = 'djAssets';
                     const queue1 = djAssets.load();
                     const loader2 = content.amDjbeat;
                     const queue2 = loader2.load();

                     const overlay = new CosmosRectangle({
                        alpha: 0,
                        anchor: 0,
                        size: { x: 1000, y: 1000 },
                        position: { x: 160, y: 120 },
                        fill: 0,
                        stroke: -1
                     });
                     renderer.attach('menu', overlay);
                     await Promise.all([
                        overlay.alpha.modulate(renderer, 1250, 1),
                        game.music!.gain.modulate(renderer, 1250, 0)
                     ]);
                     game.music?.stop();
                     renderer.detach('main', tori);
                     world.cutscene_override = true;
                     await Promise.all([ renderer.pause(850), teleport('w_party', 'down', 0, 0, world) ]);
                     world.cutscene_override = false;

                     const djtable = objectsByTag(tags => tags.includes('w_djtable'))[0].objects[0] as CosmosAnimation;
                     const steaksalesman = objectsByTag(tags => tags.includes('w2_steaksalesman'))[0]
                        .objects[0] as CosmosAnimation;
                     const bpatron = objectsByTag(tags => tags.includes('w_bpatron'))[0].objects[0] as CosmosAnimation;

                     atlas.switch('dialoguerBottom');
                     await dialogue_primitive(...lines.a);
                     atlas.switch(null);

                     steaksalesman.alpha.value = 0;
                     bpatron.alpha.value = 0;
                     player.position.set(180, 178);
                     player.face = 'down';

                     const cam = new CosmosObject({ position: { y: 210 } });
                     game.camera = cam;

                     const napsta = character(
                        'napstablook',
                        characters.napstablook,
                        { x: 140, y: 162 },
                        'down',
                        void 0,
                        null
                     );
                     const peeps = [
                        // 0
                        new CosmosAnimation({
                           anchor: { x: 0, y: 1 },
                           position: { x: 140, y: 256 },
                           resources: content.iocTorielUp
                        }),
                        // 1
                        new CosmosAnimation({
                           anchor: { x: 0, y: 1 },
                           position: { x: 232, y: 246 },
                           resources: content.ionOPlugbellyBack
                        }),
                        // 2
                        new CosmosAnimation({
                           anchor: { x: 0, y: 1 },
                           position: { x: 88, y: 245 },
                           resources: content.ionOSteaksalesmanBack
                        }),
                        // 3
                        new CosmosAnimation({
                           anchor: { x: 0, y: 1 },
                           position: { x: 190, y: 245 },
                           resources: content.ionOMananaBack
                        }),
                        // 4
                        new CosmosAnimation({
                           anchor: { x: 0, y: 1 },
                           position: { x: 235, y: 112 },
                           resources: content.ionOSilencioBack
                        }),
                        // 5
                        new CosmosSprite({
                           anchor: { x: 0, y: 1 },
                           position: { x: 108, y: 280 },
                           frames: [ content.ionOLooxBack ]
                        }),
                        // 6
                        new CosmosAnimation({
                           anchor: { x: 0, y: 1 },
                           position: { x: 210, y: 277 },
                           resources: content.ionOFroggitBack
                        }),
                        // 7
                        new CosmosAnimation({
                           anchor: { x: 0, y: 1 },
                           position: { x: 164, y: 290 },
                           resources: content.ionOMushyBack
                        }),
                        // 8
                        new CosmosAnimation({
                           active: true,
                           anchor: { x: 0, y: 1 },
                           position: { x: 234, y: 336 },
                           resources: content.ionOWoshuaBack
                        })
                     ];
                     const crowd = new CosmosObject({ objects: [ napsta, ...peeps ] });

                     await queue1;
                     renderer.attach('main', crowd);
                     await overlay.alpha.modulate(renderer, 1250, 0);
                     await renderer.pause(850);

                     renderer.detach('menu', overlay);
                     const overlay2 = new CosmosObject({ alpha: 0.8, priority: -10 });
                     const graphics = new Graphics()
                        .beginFill(0, 1)
                        .drawRect(0, 0, 320, 240)
                        .endFill()
                        .beginHole()
                        .drawEllipse(132, 70, 60, 45)
                        .endHole();
                     overlay2.container.addChild(graphics);
                     renderer.attach('menu', overlay2);
                     sounds.noise.instance(renderer);

                     await renderer.pause(1250);
                     atlas.switch('dialoguerBottom');
                     await dialogue_primitive(...lines.b);
                     atlas.switch(null);

                     await queue2;
                     djtable.enable();
                     peeps[6].enable();
                     const mus = music.djbeat.instance(renderer);
                     let seconds = 0;
                     const secTicker = () => {
                        seconds += 1 / 30;
                     };
                     renderer.on('tick', secTicker);
                     await renderer.when(() => seconds > 5);
                     await dialogue('dialoguerBottom', ...lines.c1);
                     peeps[3].enable();
                     await renderer.when(() => seconds > 10);
                     await dialogue('dialoguerBottom', ...lines.c2);
                     peeps[1].enable();
                     await renderer.when(() => seconds > 21);
                     await dialogue('dialoguerBottom', ...lines.c3);
                     peeps[2].enable();
                     await renderer.when(() => seconds > 30);
                     await dialogue('dialoguerBottom', ...lines.c4);
                     peeps[4].enable();
                     await renderer.when(() => seconds > 35);
                     peeps[7].enable();
                     await renderer.when(() => seconds > 49);
                     for (const sprite of peeps) {
                        sprite.reset();
                        await renderer.pause(66);
                     }
                     await renderer.when(() => seconds > 51);
                     djtable.disable();
                     await renderer.when(() => seconds > 53);
                     renderer.off('tick', secTicker);
                     await dialogue('dialoguerTop', ...lines.c5);

                     await renderer.pause(1e3);
                     atlas.switch('dialoguerBottom');
                     await dialogue_primitive(...lines.d);
                     atlas.switch(null);
                     napsta.alpha.modulate(renderer, 500, 0);

                     await renderer.pause(250);
                     renderer.detach('menu', overlay2);
                     sounds.noise.instance(renderer);
                     await renderer.pause(450);
                     atlas.switch('dialoguerTop');
                     await dialogue_primitive(...lines.e);
                     atlas.switch(null);

                     await renderer.alpha.modulate(renderer, 1250, 0);
                     renderer.detach('main', crowd);
                     djAssets.unload();
                     mus.stop();
                     loader2.unload();
                     await renderer.pause(1650);
                     steaksalesman.alpha.value = 1;
                     bpatron.alpha.value = 1;
                     game.camera = player;
                     djtable.reset();
                     game.movement = true;
                     renderer.alpha.modulate(renderer, 300, 1);
                     quickresume(true);
                  } else {
                     SAVE.data.n.state_wastelands_napstablook = 3;
                     await dialogue_primitive(...text.a_outlands.front2b);
                  }
               } else {
                  await dialogue_primitive(...text.a_outlands.front3());
               }
               world.postnoot && world.nootflags.add('toriel');
               atlas.switch(null);
               game.movement = true;
               SAVE.data.n.evac_wastelands > 0 && dialogue('dialoguerBottom', ...text.a_outlands.evac);
               await Promise.race([
                  events.on('teleport'),
                  walkHer(tori, { x: -4, y: 0 }, pos => pos.x > 10).then(() => tori.alpha.modulate(renderer, 300, 0))
               ]);
               renderer.detach('main', tori);
            }
            break;
         }
         case 'bed': {
            if (game.movement && player.face === 'right') {
               game.movement = false;
               if (10 <= SAVE.data.n.plot && SAVE.data.n.plot < 14) {
                  await dialogue('auto', ...text.a_outlands.midsleep());
                  if (choicer.result === 0) {
                     const lampState = (outlandsStates.scripts.toriel_asriel_lamp ??= {});
                     game.music?.gain.modulate(renderer, 3000, 0).then(() => game.music?.stop());
                     lampState.music?.gain.modulate(renderer, 3000, 0).then(() => lampState.music?.stop());
                     await exitscene(false, true);
                  } else {
                     game.movement = true;
                     break;
                  }
               }
               const lampState = (outlandsStates.scripts.toriel_asriel_lamp ??= {});
               if (SAVE.data.b.w_state_lamp) {
                  lampState.music?.gain.modulate(renderer, 1000, 0);
               } else {
                  game.music?.gain.modulate(renderer, 1000, 0);
               }
               const fd = fader();
               await fd.alpha.modulate(renderer, 1000, 1);
               if (SAVE.data.b.svr || world.goatbro) {
                  player.position.set(221 - 5, 137);
                  player.face = 'right';
                  if (SAVE.data.b.svr) {
                     goatbroTrue.metadata.override = true;
                     goatbroTrue.position.set(221 + 5, 137);
                     goatbroTrue.face = 'left';
                     goatbroTrue.sprite.reset();
                  } else {
                     goatbro.metadata.override = true;
                     goatbro.position.set(221 + 5, 137);
                     goatbro.face = 'left';
                     goatbro.sprite.reset();
                  }
               } else {
                  player.position.set(221, 137);
                  player.face = 'down';
               }
               await renderer.pause(1000);
               if (14 <= SAVE.data.n.plot && SAVE.data.n.plot < 17.001 && !toriSV() && !SAVE.data.b.w_state_catnap) {
                  SAVE.data.b.w_state_catnap = true;
                  SAVE.data.b.w_state_lamp || outlandsScript('toriel_asriel_lamp', 'silent');
                  await dialogue('auto', ...text.a_outlands.bedfailToriel);
               }
               const bedcover = new CosmosSprite({
                  position: { x: 206, y: 119 },
                  frames: [ SAVE.data.b.w_state_lamp ? content.iooOTorielAsrielOver : content.iooOTorielAsrielOverLight ]
               });
               renderer.attach('above', bedcover);
               await fd.alpha.modulate(renderer, 1000, 0);
               await renderer.pause(2000);
               await fd.alpha.modulate(renderer, 1000, 1);
               if (world.runaway) {
                  await bullyEnding();
                  return;
               }
               if (SAVE.data.n.plot < 8.1) {
                  SAVE.data.n.plot = 8.1;
                  SAVE.data.b.w_state_lamp || outlandsScript('toriel_asriel_lamp', 'silent');
                  SAVE.data.n.state_pie = 1;
                  if (world.killed5) {
                     while (world.population > 0) {
                        world.bully();
                        SAVE.data.n.evac_wastelands++;
                     }
                  }
                  outlandsScript('pie', 'spawn');
               }
               SAVE.data.n.hp = Math.max(SAVE.data.n.hp, Math.min(calcHP() + calcBonusHP(), 99));
               renderer.detach('above', bedcover);
               player.position.x = 195;
               player.face = 'left';
               for (const e of tracker.history) {
                  e[0] = player.face;
                  e[1].x = player.position.x;
                  e[1].y = player.position.y;
               }
               if (SAVE.data.b.svr) {
                  goatbroTrue.metadata.override = false;
               } else if (world.goatbro) {
                  goatbro.metadata.override = false;
               }
               if (world.postnoot && SAVE.data.n.plot !== 72) {
                  await renderer.pause(1000);
                  await dialogue('auto', ...text.a_outlands.nosleep);
                  world.nootflags.add('sleep');
               }
               await renderer.pause(2000);
               game.movement = true;
               lampState.music && (lampState.music.rate.value = world.ambiance);
               game.music && (game.music.rate.value = world.ambiance);
               if (SAVE.data.b.w_state_lamp) {
                  lampState.music?.gain.modulate(renderer, 300, world.level);
               } else {
                  game.music?.gain.modulate(renderer, 300, world.level);
               }
               await fd.alpha.modulate(renderer, 300, 0);
               renderer.detach('menu', fd);
            }
            break;
         }
         case 'beddoor': {
            await teleport('w_toriel_asriel', 'up', 218.5, 230, world);
            break;
         }
         case 'pie': {
            if (args[0] === 'spawn') {
               if (scriptState.spawned || SAVE.data.n.state_pie !== 1) {
                  return;
               }
               scriptState.spawned = true;
               const pieSprite = new CosmosSprite({ anchor: 0 }).on('tick', function () {
                  this.frames[0] = SAVE.data.n.state_wastelands_mash === 1 ? content.iooOPieBowl : content.iooOPie;
                  this.tint = SAVE.data.b.w_state_lamp ? 5592405 : 0xffffff;
               });
               const pieHitbox = new CosmosHitbox({
                  anchor: 0,
                  position: { x: 160, y: 140 },
                  metadata: {
                     barrier: true,
                     interact: true,
                     name: 'outlands',
                     tags: [ 'theOneAndOnlyButterscotchCinnamon' ],
                     args: [ 'pie' ]
                  },
                  priority: 10,
                  size: { x: 12, y: 14 }
               }).on('tick', function () {
                  if (game.room === 'w_toriel_asriel') {
                     if (this.objects.length === 0) {
                        this.metadata.barrier = true;
                        this.metadata.interact = true;
                        this.objects[0] = pieSprite;
                     }
                  } else if (this.objects.length > 0) {
                     this.metadata.barrier = false;
                     this.metadata.interact = false;
                     this.objects = [];
                  }
               });
               renderer.attach('below', pieHitbox);
            } else {
               if (!game.movement) {
                  break;
               }
               game.movement = false;
               atlas.switch('dialoguerBottom');
               if (SAVE.storage.inventory.size === 8) {
                  await dialogue_primitive(...text.a_outlands.denie);
               } else {
                  SAVE.data.n.state_pie = 2;
                  saver.add(
                     3 <= SAVE.data.n.cell_insult
                        ? 'pie4'
                        : SAVE.data.n.state_wastelands_mash === 1
                        ? 'pie3'
                        : SAVE.data.b.snail_pie
                        ? 'pie2'
                        : 'pie'
                  );
                  sounds.equip.instance(renderer);
                  instanceDestroy([ 'theOneAndOnlyButterscotchCinnamon' ], 'below');
                  await dialogue_primitive(...text.a_outlands.pie());
               }
               atlas.switch(null);
               game.movement = true;
            }
            break;
         }
         case 'socks': {
            if (!game.movement) {
               return;
            }
            game.movement = false;
            atlas.switch('dialoguerBottom');
            let coffin = false;
            if (SAVE.data.b.svr) {
               await dialogue_primitive(...text.a_outlands.socks0);
            } else if (SAVE.data.b.cetadel) {
               if (!SAVE.data.b.oops && !SAVE.data.b.key_coffin) {
                  await dialogue_primitive(...text.a_outlands.socks3());
                  coffin = true;
               } else {
                  await dialogue_primitive(...text.a_outlands.socks7());
               }
            } else {
               await dialogue_primitive(...text.a_outlands.socks1());
               if (world.darker) {
                  SAVE.data.b.cetadel = true;
               } else if (choicer.result === 0) {
                  SAVE.data.b.cetadel = true;
                  await dialogue_primitive(...text.a_outlands.socks2());
                  if (!SAVE.data.b.oops) {
                     coffin = true;
                  }
               } else {
                  await dialogue_primitive(...text.a_outlands.socks4);
               }
            }
            if (coffin) {
               if (choicer.result === 0) {
                  await dialogue_primitive(...text.a_outlands.socks5);
                  SAVE.data.b.key_coffin = true;
               } else {
                  await dialogue_primitive(...text.a_outlands.socks6);
               }
            }
            atlas.switch(null);
            game.movement = true;
            break;
         }
         case 'restricted': {
            if (SAVE.data.b.key_coffin) {
               instanceDestroy([ 'coffinbarrier' ], 'below');
            }
            break;
         }
         case 'chairiel': {
            if (!game.movement) {
               return;
            }
            if (!toriCheck()) {
               await dialogue('dialoguerBottom', ...text.a_outlands.chair3());
               break;
            }
            game.movement = false;
            const chair = instance('main', 'theOneAndOnlyChairiel')!.object;
            const chairAnim = chair.objects[0] as CosmosAnimation;
            const talker = talkerEngine('n1', chairAnim);
            atlas.switch('dialoguerBottom');
            if (!toriSV() && (SAVE.data.b.w_state_catnap || SAVE.data.n.plot > 17)) {
               await dialogue_primitive(...text.a_outlands.chair1f());
            } else if (SAVE.data.n.plot === 8) {
               if (SAVE.data.n.state_toriel_book < 1) {
                  SAVE.data.n.state_toriel_book = 1;
                  await dialogue_primitive(...text.a_outlands.chair1e());
               } else {
                  await dialogue_primitive(...text.a_outlands.chair2c3());
               }
               if (choicer.result === 0) {
                  SAVE.data.n.state_toriel_book = 2;
                  await dialogue_primitive(...text.a_outlands.chair2c2, ...text.a_outlands.chair2c6.slice(0, 2));
                  atlas.switch(null);
                  atlas.attach(renderer, 'menu', 'dialoguerBottom');
                  const fd = fader();
                  dialogue_primitive(text.a_outlands.chair2c6[2]);
                  await Promise.all([
                     CosmosValue.prototype.modulate.call(soundMixer.input.gain, renderer, 3000, 0),
                     fd.alpha.modulate(renderer, 3000, 1),
                     renderer.pause(1850).then(async () => {
                        musicConvolver.modulate(renderer, 1150, 0.8);
                        game.music?.rate.modulate(renderer, 1150, game.music.rate.value * 0.875);
                     })
                  ]);
                  talker.end();
                  atlas.detach(renderer, 'menu', 'dialoguerBottom');
                  await game.music?.gain.modulate(renderer, 1500, 0);
                  game.music?.stop();
                  musicConvolver.value = 0;
                  await renderer.pause(1500);
                  await Promise.all([
                     renderer.pause(2000),
                     teleport('w_toriel_asriel', 'down', 221, 137, { fade: false, fast: true })
                  ]);
                  const bedcover = new CosmosSprite({
                     position: { x: 206, y: 119 },
                     frames: [
                        SAVE.data.b.w_state_lamp ? content.iooOTorielAsrielOver : content.iooOTorielAsrielOverLight
                     ]
                  });
                  renderer.attach('above', bedcover);
                  await fd.alpha.modulate(renderer, 1000, 0);
                  await renderer.pause(2000);
                  await fd.alpha.modulate(renderer, 1000, 1);
                  SAVE.data.n.plot = 8.1;
                  SAVE.data.b.w_state_lamp || outlandsScript('toriel_asriel_lamp', 'silent');
                  SAVE.data.n.state_pie = 1;
                  if (world.killed5) {
                     while (world.population > 0) {
                        world.bully();
                        SAVE.data.n.evac_wastelands++;
                     }
                  }
                  outlandsScript('pie', 'spawn');
                  SAVE.data.n.hp = Math.max(SAVE.data.n.hp, Math.min(calcHP() + calcBonusHP(), 99));
                  renderer.detach('above', bedcover);
                  player.position.x = 195;
                  player.face = 'left';
                  soundMixer.input.gain.value = 1;
                  if (world.postnoot) {
                     await renderer.pause(1000);
                     await dialogue('auto', ...text.a_outlands.nosleep);
                     world.nootflags.add('sleep');
                  }
                  await renderer.pause(2000);
                  game.movement = true;
                  const lampState = (outlandsStates.scripts.toriel_asriel_lamp ??= {});
                  lampState.music && (lampState.music.rate.value = world.ambiance);
                  lampState.music?.gain.modulate(renderer, 300, world.level);
                  await fd.alpha.modulate(renderer, 300, 0);
                  renderer.detach('menu', fd);
                  game.music = music.home.instance(renderer, lampState.music?.position ?? 0, true);
                  game.music.gain.value = 0;
                  game.music.rate.value = world.ambiance;
                  return;
               } else {
                  await dialogue_primitive(...text.a_outlands.chair1d);
               }
            } else {
               if (SAVE.data.b.toriel_ask) {
                  await dialogue_primitive(...text.a_outlands.chair1b());
               } else {
                  SAVE.data.b.toriel_ask = true;
                  await dialogue_primitive(...text.a_outlands.chair1a());
               }
               const result = choicer.result;
               switch (result) {
                  case 0:
                     if (SAVE.data.n.state_toriel_food < 2) {
                        if (SAVE.data.n.state_toriel_food < 1) {
                           SAVE.data.n.state_toriel_food = 1;
                           await dialogue_primitive(...text.a_outlands.chair2a1());
                        } else {
                           await dialogue_primitive(...text.a_outlands.chair2a3());
                        }
                        if (choicer.result === 0) {
                           await dialogue_primitive(...text.a_outlands.chair2a2);
                           atlas.switch(null);
                           chairAnim.reset().use(content.ionOChairiel);
                           chairAnim.enable();
                           await renderer.when(() => chairAnim.index === 4);
                           chairAnim.disable();
                           await renderer.pause(133);
                           chairAnim.index = 5;
                           const tori = character('toriel', characters.toriel, { x: 134, y: 96 }, 'right');
                           Promise.race([
                              events.on('teleport'),
                              walkHer(tori, { x: 4, y: 0 }, pos => pos.x < chair.position.x + 30).then(async () => {
                                 await walkHer(tori, { x: 0, y: 3 }, pos => pos.y < 120);
                                 await walkHer(tori, { x: -3, y: 0 }, pos => pos.x > 105);
                                 await walkHer(tori, { x: -3, y: -3 }, pos => pos.x > 65);
                                 await walkHer(tori, { x: 0, y: -3 }, pos => pos.y > 20);
                                 await tori.alpha.modulate(renderer, 300, 0);
                              })
                           ]).then(async () => {
                              renderer.detach('main', tori);
                              await renderer.pause(SAVE.data.n.state_wastelands_mash > 0 ? 30e3 : 20e3);
                              await renderer.when(() => game.movement);
                              if (game.room === 'w_toriel_living') {
                                 typer.reset(true);
                                 game.movement = false;
                                 tori.alpha.value = 1;
                                 tori.alpha.modulate(renderer, 0, 1);
                                 tori.position.set(66.5, 15);
                                 tori.face = 'down';
                                 const breakfast = new CosmosSprite({
                                    anchor: { x: 0, y: 1 },
                                    priority: 999,
                                    frames: [ content.iooOBreakfast ]
                                 }).on('tick', function () {
                                    this.position.set(tori.position.subtract(0, 15));
                                 });
                                 renderer.attach('main', tori, breakfast);
                                 await walkHer(tori, { x: 0, y: 3 }, pos => pos.y < 100);
                                 atlas.switch('dialoguerBottom');
                                 await dialogue_primitive(...text.a_outlands.food());
                                 atlas.switch(null);
                                 await walkHer(tori, { x: 3, y: 3 }, pos => pos.x < 90);
                                 await walkHer(tori, { x: 0, y: 3 }, pos => pos.y < 155);
                                 await renderer.pause(350);
                                 renderer.detach('main', breakfast);
                                 spawnBreakfast();
                                 await renderer.pause(650);
                                 await walkHer(tori, { x: 0, y: -3 }, pos => pos.y > 135);
                                 await walkHer(tori, { x: 3, y: -3 }, pos => pos.y > 105);
                                 await walkHer(tori, { x: 3, y: 0 }, pos => pos.x < 134);
                                 await walkHer(tori, { x: 0, y: -3 }, pos => pos.y > 96);
                                 renderer.detach('main', tori);
                                 chairAnim.index = 4;
                                 chairAnim.step = 0;
                                 chairAnim.reverse = true;
                                 chairAnim.enable();
                                 await renderer.when(() => chairAnim.index === 0);
                                 chairAnim.reverse = false;
                                 chairAnim.reset().use(content.ionOChairielTalk);
                                 SAVE.data.n.plot = 9.1;
                                 game.movement = true;
                              }
                              SAVE.data.n.state_toriel_food = 3;
                           });
                           SAVE.data.n.state_toriel_food = 2;
                           SAVE.data.n.plot = 9;
                        } else {
                           await dialogue_primitive(...text.a_outlands.chair1d);
                        }
                     } else {
                        await dialogue_primitive(...text.a_outlands.chair2a4());
                     }
                     break;
                  case 1:
                     if (SAVE.data.n.state_toriel_book < 2) {
                        if (SAVE.data.n.state_toriel_book < 1) {
                           SAVE.data.n.state_toriel_book = 1;
                           await dialogue_primitive(...text.a_outlands.chair2c1());
                        } else {
                           await dialogue_primitive(...text.a_outlands.chair2c3());
                        }
                        if (choicer.result === 0) {
                           SAVE.data.n.state_toriel_book = 2;
                           await dialogue_primitive(
                              ...text.a_outlands.chair2c2,
                              ...text.a_outlands.chair2c6,
                              ...text.a_outlands.chair2c7
                           );
                        }
                     } else {
                        await dialogue_primitive(...text.a_outlands.chair2c4());
                        if (choicer.result === 0) {
                           await dialogue_primitive(
                              ...text.a_outlands.chair2c5,
                              ...text.a_outlands.chair2c6,
                              ...text.a_outlands.chair2c8
                           );
                        }
                     }
                     if (choicer.result === 1) {
                        await dialogue_primitive(...text.a_outlands.chair1d);
                     }
                     break;
                  case 2: {
                     let nomove = false;
                     if (SAVE.data.b.toriel_home) {
                        await dialogue_primitive(...text.a_outlands.chair2d4);
                        if (choicer.result === 0) {
                           await dialogue_primitive(...text.a_outlands.chair2d5);
                        } else {
                           await dialogue_primitive(...text.a_outlands.chair2d6);
                           nomove = true;
                        }
                     } else {
                        await dialogue_primitive(...text.a_outlands.chair2d1);
                        if (choicer.result === 0) {
                           await dialogue_primitive(...text.a_outlands.chair1c);
                        } else {
                           SAVE.data.b.toriel_home = true;
                           await dialogue_primitive(...text.a_outlands.chair2d2);
                           if (choicer.result === 0) {
                              await dialogue_primitive(...text.a_outlands.chair2d3);
                           } else {
                              await dialogue_primitive(...text.a_outlands.chair2d6);
                              nomove = true;
                           }
                        }
                     }
                     if (nomove) {
                        atlas.switch(null);
                        chairAnim.reset().use(content.ionOChairiel);
                        chairAnim.enable();
                        await renderer.when(() => chairAnim.index === 4);
                        chairAnim.disable();
                        await renderer.pause(133);
                        chairAnim.index = 5;
                        const tori = character('toriel', characters.toriel, { x: 134, y: 96 }, 'right');
                        Promise.race([
                           events.on('teleport'),
                           walkHer(tori, { x: 3, y: 0 }, pos => pos.x < chair.position.x + 60).then(async () => {
                              await walkHer(tori, { x: 4, y: 4 }, pos => pos.y < 173.5);
                              await walkHer(tori, { x: 4, y: 0 }, pos => pos.x < 300);
                              await tori.alpha.modulate(renderer, 300, 0);
                           })
                        ]).then(() => {
                           renderer.detach('main', tori);
                        });
                        SAVE.data.n.plot = 10;
                     }
                     break;
                  }
                  case 3:
                     await dialogue_primitive(...text.a_outlands.chair1c);
                     break;
               }
            }
            talker.end();
            atlas.switch(null);
            game.movement = true;
            break;
         }
         case 'runaway': {
            if (3 <= SAVE.data.n.cell_insult && SAVE.data.n.plot === 7) {
               break;
            } else if (game.movement && SAVE.data.n.plot < 10 && (SAVE.data.n.plot !== 9 || game.room === 'w_alley4')) {
               game.movement = false;
               const tori = character('toriel', characters.toriel, { x: 40, y: player.position.y }, 'right', {
                  alpha: 0
               });
               await tori.alpha.modulate(renderer, 300, 1);
               await tori.walk(renderer, 4, { x: player.position.x - 24 });
               if (SAVE.data.n.plot === 9) {
                  SAVE.data.n.plot = 9.1;
                  SAVE.data.n.state_toriel_food = 3;
                  SAVE.data.b.w_state_youlittlesneaker = true;
                  await dialogue('dialoguerBottom', ...text.a_outlands.runaway3);
               } else if (SAVE.data.n.plot < 8) {
                  await dialogue('dialoguerBottom', ...text.a_outlands.runaway2);
               } else {
                  await dialogue(
                     'dialoguerBottom',
                     ...text.a_outlands.runaway1[
                        Math.min(SAVE.data.n.state_toriel_runaway++, text.a_outlands.runaway1.length - 1)
                     ]
                  );
               }
               tori.preset = characters.torielHandhold;
               tori.face = 'left';
               tori.position.x += 12;
               player.alpha.value = 0;
               const ticker = () => {
                  player.position.set(tori.position.add(12, 0));
               };
               renderer.on('tick', ticker);
               if (game.room === 'w_alley4') {
                  await tori.walk(renderer, 3, { x: 16 });
                  await teleport('w_alley3', 'left', 360, 190, world);
                  tori.position.set(360 - 12, 190);
                  await tori.walk(renderer, 3, { x: 16 });
                  await teleport('w_alley2', 'left', 360, 190, world);
                  tori.position.set(360 - 12, 190);
                  await tori.walk(renderer, 3, { x: 16 });
                  await teleport('w_alley1', 'left', 360, 170, world);
                  tori.position.set(360 - 12, 170);
               }
               await tori.walk(renderer, 3, { x: 16 });
               await teleport('w_courtyard', 'left', 520, 170, world);
               tori.position.set(520 - 12, 170);
               await tori.walk(renderer, 3, { x: 465 }, { x: 415, y: 220 }, { x: 340 });
               tori.preset = characters.toriel;
               player.alpha.value = 1;
               renderer.off('tick', ticker);
               ticker();
               game.movement = true;
               await Promise.race([ events.on('teleport'), tori.walk(renderer, 3, { x: 270, y: 100 }) ]);
               renderer.detach('main', tori);
            }
            break;
         }
         case 'runawayx': {
            if (3 <= SAVE.data.n.cell_insult && SAVE.data.n.plot < 14 && game.movement) {
               game.movement = false;
               SAVE.data.n.plot = 14;
               const tori = temporary(character('toriel', characters.toriel, { x: 40, y: 300 }, 'up'), 'main');
               await tori.walk(renderer, 4, { y: 240 });
               await dialogue('auto', ...text.a_outlands.runaway4);
               await tori.walk(renderer, 2, { y: 200 });
               await renderer.pause(1650);
               await dialogue('auto', ...text.a_outlands.runaway5);
               await renderer.pause(850);
               await tori.walk(renderer, 1, { y: 180 });
               await renderer.pause(1650);
               await dialogue('auto', ...text.a_outlands.runaway6);
               await tori.walk(renderer, 0.5, { y: 160 });
               await renderer.pause(2450);
               await dialogue('auto', ...text.a_outlands.runaway7);
               game.movement = true;
               game.menu = false;
               await Promise.race([
                  events.on('teleport'),
                  renderer.when(() => 120 <= player.position.y && game.movement)
               ]);
               if (game.room === 'w_bridge') {
                  game.movement = false;
                  player.position.y = 120;
                  await dialogue('auto', ...text.a_outlands.runaway7a);
                  await exitscene(true);
               } else {
                  teleporter.movement = false;
                  game.movement = false;
                  torielSpareState();
                  await renderer.pause(1650);
                  await dialogue('auto', ...text.a_outlands.runaway7b);
                  SAVE.flag.b._primer = true;
                  game.movement = true;
                  SAVE.data.b.w_state_lateleave = true;
                  SAVE.data.n.state_wastelands_toriel = 1;
                  game.menu = true;
               }
            }
            break;
         }
         case 'partner': {
            if (args[0] === 'talk') {
               if (!game.movement) {
                  return;
               }
               (roomState.goatbro as CosmosEntity).face = 'down';
               game.movement = false;
               await scriptState.assetQueue!;
               atlas.switch('dialoguerBottom');
               if (SAVE.flag.n.ga_asriel0++ < 1) {
                  await dialogue_primitive(...text.a_outlands.asriel2());
               } else {
                  await dialogue_primitive(...text.a_outlands.asriel2b());
               }
               if (choicer.result === 0) {
                  await dialogue_primitive(...text.a_outlands.asriel3);
                  atlas.switch(null);
                  (roomState.goatbro as CosmosEntity).walk(renderer, 1, { y: 0 });
                  for (const pb of music.prebattle.instances.slice()) {
                     pb.gain.modulate(renderer, 3000, 0).then(() => pb.stop());
                  }
                  renderer.pause(233).then(() => {
                     player.walk(renderer, 1, { y: 0 });
                  });
                  const overlay = fader();
                  await overlay.alpha.modulate(renderer, 3000, 1);
                  compat();
                  await renderer.pause(1000);
                  await splash();
                  await renderer.pause(1000);
                  await teleport('s_start', 'up', 60, 130, world);
                  renderer.detach('menu', overlay);
               } else {
                  await dialogue_primitive(...text.a_outlands.asriel4);
                  (roomState.goatbro as CosmosEntity).face = 'up';
               }
               atlas.switch(null);
               game.movement = true;
            }
            break;
         }
         case 'candy': {
            if (!game.movement) {
               return;
            }
            game.movement = false;
            atlas.switch('dialoguerBottom');
            if (SAVE.data.n.state_wastelands_candy < 4) {
               await dialogue_primitive(...text.a_outlands.candy1());
               if (choicer.result < 3) {
                  if (SAVE.storage.inventory.size < 8) {
                     const item = [ 'candy', 'water', 'delta' ][choicer.result] as 'candy' | 'water' | 'delta';
                     typer.variables.x = text[`i_${item}`].name;
                     saver.add(item);
                     sounds.equip.instance(renderer);
                     await dialogue_primitive(
                        ...[
                           text.a_outlands.candy2,
                           text.a_outlands.candy3,
                           text.a_outlands.candy4(),
                           text.a_outlands.candy5()
                        ][SAVE.data.n.state_wastelands_candy++]
                     );
                     if (SAVE.data.n.state_wastelands_candy === 4) {
                        (instance('main', 'vending_machine')!.object.objects[0] as CosmosAnimation).reset();
                     }
                  } else {
                     await dialogue_primitive(...text.a_outlands.candy8);
                  }
               } else {
                  await dialogue_primitive(...text.a_outlands.candy7);
               }
            } else {
               await dialogue_primitive(...text.a_outlands.candy6());
            }
            atlas.switch(null);
            game.movement = true;
            break;
         }
         case 'fridgetrap': {
            if (!game.movement) {
               return;
            }
            game.movement = false;
            atlas.switch('dialoguerTop');
            if (SAVE.data.b.item_chocolate) {
               await dialogue_primitive(...text.a_outlands.fridgetrap.c());
            } else {
               await dialogue_primitive(...text.a_outlands.fridgetrap.a());
               if (!SAVE.data.b.oops) {
                  await dialogue_primitive(...text.a_outlands.fridgetrap.b());
                  if (choicer.result === 0) {
                     if (SAVE.storage.inventory.size < 8) {
                        sounds.equip.instance(renderer);
                        saver.add('chocolate');
                        SAVE.data.b.item_chocolate = true;
                        await dialogue_primitive(...text.a_outlands.fridgetrap.b2());
                     } else {
                        await dialogue_primitive(...text.a_outlands.fridgetrap.d);
                     }
                  } else {
                     await dialogue_primitive(...text.a_outlands.fridgetrap.b1);
                  }
               }
            }
            atlas.switch(null);
            game.movement = true;
            break;
         }
         case 'endtwinkly': {
            if (!SAVE.flag.b._primer) {
               return;
            }
            SAVE.flag.b._primer = false;
            if (
               !game.movement ||
               SAVE.data.n.plot > 14.1 ||
               world.genocide ||
               SAVE.flag.b.confront_twinkly ||
               (SAVE.flag.b.enrage_twinkly && SAVE.flag.n.genocide_twinkly < resetThreshold()) ||
               [ 7.3, 8.3, 11.3, 12.3, 13.3, 14.3, 15.2 ].includes(SAVE.flag.n.state_toriel) ||
               world.postnoot
            ) {
               return;
            } else {
               SAVE.data.n.plot = 15;
            }
            const time = renderer.time;
            const starPositionY = new CosmosValue();
            const star = new CosmosAnimation({
               alpha: 0,
               priority: -1,
               anchor: { x: 0, y: 1 },
               metadata: { p: false },
               position: { x: player.position.x },
               resources: content.iocTwinklyMain
            }).on('tick', function () {
               this.position.y = starPositionY.value + CosmosMath.wave(((renderer.time - time) % 2500) / 2500) * 5;
            });
            game.movement = false;
            await renderer.pause(450);
            renderer.attach('main', star);
            await Promise.all([
               star.alpha.modulate(renderer, 800, 0, 1),
               starPositionY.modulate(renderer, 800, 140, 140, 140)
            ]);
            const outcomeX = SAVE.flag.n.state_toriel;
            const outcomeY = outlandsKills() + (SAVE.data.n.state_wastelands_toriel === 2 ? 1 : 0);
            const reveal = SAVE.flag.b.reveal_twinkly;
            atlas.switch('dialoguerBottom');
            if (outcomeY > 11) {
               SAVE.flag.b.reveal_twinkly = true;
            }
            const standard = SAVE.flag.n.genocide_milestone < 7 && SAVE.flag.n.genocide_twinkly < resetThreshold();
            speech.targets.add(star);
            let confront = false;
            if (standard) {
               if (SAVE.flag.n.genocide_twinkly > 0) {
                  confront = true;
                  SAVE.flag.b.enrage_twinkly = true;
                  await dialogue_primitive(...text.a_outlands.endtwinklyA1);
               } else {
                  const b = outcomeY === 0 && SAVE.data.n.bully_wastelands - SAVE.data.n.evac_wastelands > 16 * (1 / 3);
                  switch (outcomeX) {
                     case 1:
                        await dialogue_primitive(
                           ...(b ? text.a_outlands.endtwinklyIX : text.a_outlands.endtwinklyI),
                           ...(!reveal && outcomeY > 11
                              ? [
                                   ...text.a_outlands.endtwinklyIB,
                                   ...(outcomeY < 15 ? text.a_outlands.endtwinklyB2 : text.a_outlands.endtwinklyB3)
                                ]
                              : b
                              ? text.a_outlands.endtwinklyIAX
                              : text.a_outlands.endtwinklyIA)
                        );
                        break;
                     case 2:
                     case 3:
                        await dialogue_primitive(
                           ...text.a_outlands.endtwinklyB(),
                           ...(outcomeX === 2
                              ? text.a_outlands.endtwinklyBC
                              : !reveal && outcomeY > 15
                              ? text.a_outlands.endtwinklyB3
                              : !reveal && outcomeY > 11
                              ? text.a_outlands.endtwinklyB2
                              : outcomeY > 0
                              ? world.population === 0
                                 ? text.a_outlands.endtwinklyBB2()
                                 : outcomeY > 1
                                 ? text.a_outlands.endtwinklyBB1()
                                 : text.a_outlands.endtwinklyBB3()
                              : b
                              ? text.a_outlands.endtwinklyD
                              : text.a_outlands.endtwinklyBA())
                        );
                        break;
                     case 4:
                        await dialogue_primitive(
                           ...text.a_outlands.endtwinklyE,
                           ...(!reveal && outcomeY > 11
                              ? [
                                   ...text.a_outlands.endtwinklyEB,
                                   ...(outcomeY < 15 ? text.a_outlands.endtwinklyB2 : text.a_outlands.endtwinklyB3)
                                ]
                              : [ ...text.a_outlands.endtwinklyEA, ...text.a_outlands.endtwinklyC ])
                        );
                        break;
                     case 5:
                     case 6:
                        await dialogue_primitive(
                           ...text.a_outlands.endtwinklyF,
                           ...[ text.a_outlands.endtwinklyFA, text.a_outlands.endtwinklyFB ][outcomeX - 5],
                           ...text.a_outlands.endtwinklyFXA
                        );
                        break;
                     case 15:
                        SAVE.flag.n.state_toriel = 15.1;
                        await dialogue_primitive(...text.a_outlands.endtwinklyL);
                        break;
                     case 15.1:
                        SAVE.flag.n.state_toriel = 15.2;
                        await dialogue_primitive(...text.a_outlands.endtwinklyL1);
                        break;
                     case 7:
                        SAVE.flag.n.state_toriel = 7.1;
                        await dialogue_primitive(...text.a_outlands.endtwinklyG);
                        break;
                     case 11:
                        SAVE.flag.n.state_toriel = 11.1;
                        await dialogue_primitive(...text.a_outlands.endtwinklyG);
                        break;
                     case 13:
                        SAVE.flag.n.state_toriel = 13.1;
                        await dialogue_primitive(...text.a_outlands.endtwinklyG);
                        break;
                     case 7.1:
                        SAVE.flag.n.state_toriel = 7.2;
                        await dialogue_primitive(...text.a_outlands.endtwinklyG1);
                        break;
                     case 11.1:
                        SAVE.flag.n.state_toriel = 11.2;
                        await dialogue_primitive(...text.a_outlands.endtwinklyG1);
                        break;
                     case 13.1:
                        SAVE.flag.n.state_toriel = 13.2;
                        await dialogue_primitive(...text.a_outlands.endtwinklyG1);
                        break;
                     case 7.2:
                        SAVE.flag.n.state_toriel = 7.3;
                        await dialogue_primitive(...text.a_outlands.endtwinklyG2);
                        break;
                     case 11.2:
                        SAVE.flag.n.state_toriel = 11.3;
                        await dialogue_primitive(...text.a_outlands.endtwinklyG2);
                        break;
                     case 13.2:
                        SAVE.flag.n.state_toriel = 13.3;
                        await dialogue_primitive(...text.a_outlands.endtwinklyG2);
                        break;
                     case 8:
                        SAVE.flag.n.state_toriel = 8.1;
                        await dialogue_primitive(
                           ...text.a_outlands.endtwinklyK,
                           ...(outcomeY === 0
                              ? text.a_outlands.endtwinklyKA
                              : outcomeY === 1
                              ? text.a_outlands.endtwinklyKB
                              : outcomeY < 16
                              ? text.a_outlands.endtwinklyKC
                              : text.a_outlands.endtwinklyKD)
                        );
                        break;
                     case 12:
                        SAVE.flag.n.state_toriel = 12.1;
                        await dialogue_primitive(
                           ...text.a_outlands.endtwinklyK,
                           ...(outcomeY === 0
                              ? text.a_outlands.endtwinklyKA
                              : outcomeY === 1
                              ? text.a_outlands.endtwinklyKB
                              : outcomeY < 16
                              ? text.a_outlands.endtwinklyKC
                              : text.a_outlands.endtwinklyKD)
                        );
                        break;
                     case 14:
                        SAVE.flag.n.state_toriel = 14.1;
                        await dialogue_primitive(
                           ...text.a_outlands.endtwinklyK,
                           ...(outcomeY === 0
                              ? text.a_outlands.endtwinklyKA
                              : outcomeY === 1
                              ? text.a_outlands.endtwinklyKB
                              : outcomeY < 16
                              ? text.a_outlands.endtwinklyKC
                              : text.a_outlands.endtwinklyKD)
                        );
                        break;
                     case 8.1:
                        SAVE.flag.n.state_toriel = 8.2;
                        await dialogue_primitive(...text.a_outlands.endtwinklyK1);
                        break;
                     case 12.1:
                        SAVE.flag.n.state_toriel = 12.2;
                        await dialogue_primitive(...text.a_outlands.endtwinklyK1);
                        break;
                     case 14.1:
                        SAVE.flag.n.state_toriel = 14.2;
                        await dialogue_primitive(...text.a_outlands.endtwinklyK1);
                        break;
                     case 8.2:
                        SAVE.flag.n.state_toriel = 8.3;
                        await dialogue_primitive(...text.a_outlands.endtwinklyK2);
                        break;
                     case 12.2:
                        SAVE.flag.n.state_toriel = 12.3;
                        await dialogue_primitive(...text.a_outlands.endtwinklyK2);
                        break;
                     case 14.2:
                        SAVE.flag.n.state_toriel = 14.3;
                        await dialogue_primitive(...text.a_outlands.endtwinklyK2);
                        break;
                     case 9:
                        await dialogue_primitive(...text.a_outlands.endtwinklyH(), ...text.a_outlands.endtwinklyC);
                        break;
                     case 10:
                        await dialogue_primitive(...text.a_outlands.endtwinklyJ, ...text.a_outlands.endtwinklyC);
                        break;
                  }
               }
            } else {
               confront = true;
               oversaver.save();
               SAVE.flag.b.confront_twinkly = true;
               await dialogue_primitive(...text.a_outlands.endtwinklyA2());
            }
            atlas.switch(null);
            speech.targets.delete(star);
            await Promise.all([
               star.alpha.modulate(renderer, 800, 1, 1, 0),
               starPositionY.modulate(renderer, 800, starPositionY.value, starPositionY.value, 0)
            ]);
            renderer.detach('main', star);
            if (!SAVE.data.b.oops) {
               atlas.switch('dialoguerBottom');
               await dialogue_primitive(
                  ...(confront ? text.a_outlands.endtwinklyAreaction : text.a_outlands.endtwinkly2)
               );
               atlas.switch(null);
            }
            game.movement = true;
            break;
         }
         case 'exit': {
            if (!game.movement) {
               return;
            }
            if (SAVE.data.n.plot < 16) {
               game.movement = false;
               atlas.switch('dialoguerBottom');
               await dialogue_primitive(...text.a_outlands.exit());
               atlas.switch(null);
               if (choicer.result === 1) {
                  player.position.y += 3;
                  player.face = 'down';
                  game.movement = true;
                  break;
               }
               compat();
               const overlay = fader();
               await overlay.alpha.modulate(renderer, 3000, 1);
               await renderer.pause(1000);
               await splash();
               await renderer.pause(1000);
               await teleport('s_start', 'up', 60, 130, world);
               renderer.detach('menu', overlay);
               game.movement = true;
            } else {
               await teleport('s_start', 'up', 60, 130, world);
            }
            break;
         }
         case 'torieldanger': {
            if (!game.movement) {
               return;
            }
            if (SAVE.data.n.plot < 2.61) {
               const tori = (outlandsStates.scripts.danger_puzzle ??= {}).tori as CosmosCharacter;
               const faze = tori.face;
               tori.face = ultimaFacer(tori);
               const lines = text.a_outlands[subscript];
               game.movement = false;
               atlas.switch('dialoguerBottom');
               await dialogue_primitive(...[ lines.a, lines.b ][SAVE.data.n.plot < 2.602 ? 0 : 1]);
               tori.face = faze;
               switch (SAVE.data.n.plot) {
                  case 2.6:
                     SAVE.data.n.plot = 2.602;
                     break;
                  case 2.601:
                     SAVE.data.n.plot = 2.603;
                     break;
               }
               atlas.switch(null);
               game.movement = true;
            }
            break;
         }
         case 'afrog': {
            if (!game.movement) {
               return;
            }
            const lines = text.a_outlands[subscript];
            game.movement = false;
            const talker = talkerEngine(
               'n1',
               objectsByTag(tags => tags.includes('w_afrog'))[0].objects[0] as CosmosAnimation
            );
            atlas.switch('dialoguerBottom');
            if (roomKills().w_annex > 0) {
               await dialogue_primitive(...lines.d);
            } else if (world.population < 6) {
               await dialogue_primitive(...lines.c());
            } else if (SAVE.data.n.plot < 8.1) {
               await dialogue_primitive(...lines.a);
            } else {
               await dialogue_primitive(...lines.b());
            }
            talker.end();
            atlas.switch(null);
            game.movement = true;
            break;
         }
         case 'patron': {
            if (!game.movement) {
               return;
            }
            const lines = text.a_outlands[subscript];
            game.movement = false;
            const talker = talkerEngine(
               'n1',
               objectsByTag(tags => tags.includes('w_bpatron'))[0].objects[0] as CosmosAnimation
            );
            const steaker = objectsByTag(tags => tags.includes('w2_steaksalesman'));
            const talker2 = steaker.length === 0 ? null : talkerEngine('n2', steaker[0].objects[0] as CosmosAnimation);
            atlas.switch('dialoguerBottom');
            await dialogue_primitive(...lines.a());
            talker.end();
            talker2?.end();
            atlas.switch(null);
            game.movement = true;
            break;
         }
         case 'loox': {
            if (!game.movement) {
               return;
            }
            const lines = text.a_outlands[subscript];
            game.movement = false;
            const talker = talkerEngine(
               'n1',
               objectsByTag(tags => tags.includes('w_loox'))[0].objects[0] as CosmosAnimation
            );
            atlas.switch('dialoguerBottom');
            if (SAVE.data.n.plot === 72) {
               await dialogue_primitive(...lines.e());
            } else if (SAVE.data.n.bully_wastelands - SAVE.data.n.evac_wastelands > 16 * (1 / 3)) {
               await dialogue_primitive(...lines.d);
            } else if (world.flirt <= 0) {
               SAVE.data.b.w_state_flirtcheck = true;
               await dialogue_primitive(...lines.b);
            } else if (SAVE.data.b.w_state_flirtcheck) {
               await dialogue_primitive(...lines.c);
            } else {
               await dialogue_primitive(...lines.a);
            }
            talker.end();
            atlas.switch(null);
            game.movement = true;
            break;
         }
         case 'manana': {
            if (!game.movement) {
               return;
            }
            const lines = text.a_outlands[subscript];
            game.movement = false;
            const talker = talkerEngine(
               'n1',
               objectsByTag(tags => tags.includes('w_manana'))[0].objects[0] as CosmosAnimation
            );
            atlas.switch('dialoguerBottom');
            if (SAVE.data.n.plot === 72) {
               await dialogue_primitive(...lines.h);
            } else if (SAVE.data.b.starbertA) {
               await dialogue_primitive(...(SAVE.data.n.plot < 48 ? lines.e : lines.g));
            } else {
               await dialogue_primitive(...lines.a());
               if (choicer.result === 0) {
                  const p = SAVE.data.b.napsta_performance ? 5 : 10;
                  if (saver.gold < p) {
                     await dialogue_primitive(...lines.b());
                  } else {
                     if (SAVE.storage.inventory.size < 8) {
                        saver.gold -= p;
                        SAVE.data.b.starbertA = true;
                        saver.add('starbertA');
                        sounds.equip.instance(renderer);
                        await dialogue_primitive(...lines.d);
                     } else {
                        await dialogue_primitive(...lines.f);
                     }
                  }
               } else {
                  await dialogue_primitive(...lines.c);
               }
            }
            talker.end();
            atlas.switch(null);
            game.movement = true;
            break;
         }
         case 'dipper': {
            if (!game.movement) {
               return;
            }
            const lines = text.a_outlands[subscript];
            game.movement = false;
            atlas.switch(autoNav());
            if (SAVE.storage.inventory.size === 8) {
               await dialogue_primitive(...lines.b);
            } else {
               sounds.equip.instance(renderer);
               saver.add('little_dipper');
               SAVE.data.b.item_little_dipper = true;
               instance('below', 'w_dipper')?.destroy();
               await dialogue_primitive(...lines.a());
               if (choicer.result === 0) {
                  atlas.switch(autoNav());
                  await use('little_dipper', SAVE.storage.inventory.contents.indexOf('little_dipper'));
                  atlas.switch(null);
               } else {
                  await dialogue_primitive(...text.a_outlands.noequip);
               }
            }
            atlas.switch(null);
            game.movement = true;
            break;
         }
         case 'halo': {
            if (!game.movement) {
               return;
            }
            const lines = text.a_outlands[subscript];
            game.movement = false;
            atlas.switch(autoNav());
            if (SAVE.storage.inventory.size === 8) {
               await dialogue_primitive(...lines.b);
            } else {
               sounds.equip.instance(renderer);
               saver.add('halo');
               SAVE.data.b.item_halo = true;
               instance('below', 'w_halo')?.destroy();
               await dialogue_primitive(...lines.a());
               if (choicer.result === 0) {
                  atlas.switch(autoNav());
                  await use('halo', SAVE.storage.inventory.contents.indexOf('halo'));
                  atlas.switch(null);
               } else {
                  await dialogue_primitive(...text.a_outlands.noequip);
               }
            }
            atlas.switch(null);
            game.movement = true;
            break;
         }
         case 'backdesk': {
            if (!game.movement) {
               return;
            }
            const lines = text.a_outlands[subscript];
            game.movement = false;
            atlas.switch('dialoguerBottom');
            if (!SAVE.data.b.starbertB) {
               if (SAVE.storage.inventory.size < 8) {
                  SAVE.data.b.starbertB = true;
                  saver.add('starbertB');
                  await dialogue_primitive(...lines.b());
               } else {
                  await dialogue_primitive(...lines.b2());
               }
            } else {
               await dialogue_primitive(...lines.a());
            }
            atlas.switch(null);
            game.movement = true;
            break;
         }
         case 'closetrocket': {
            if (!game.movement) {
               return;
            }
            const lines = text.a_outlands[subscript];
            game.movement = false;
            atlas.switch('dialoguerBottom');
            if (!SAVE.data.b.starbertC) {
               if (SAVE.storage.inventory.size < 8) {
                  SAVE.data.b.starbertC = true;
                  saver.add('starbertC');
                  await dialogue_primitive(...lines.b());
               } else {
                  await dialogue_primitive(...lines.b2());
               }
            } else {
               await dialogue_primitive(...lines.a());
            }
            atlas.switch(null);
            game.movement = true;
            break;
         }
         case 'silencio': {
            if (!game.movement) {
               return;
            }
            const lines = text.a_outlands[subscript];
            game.movement = false;
            const talker = talkerEngine(
               'n1',
               objectsByTag(tags => tags.includes('w_silencio'))[0].objects[0] as CosmosAnimation
            );
            atlas.switch('dialoguerBottom');
            await dialogue_primitive(...lines.a());
            talker.end();
            atlas.switch(null);
            game.movement = true;
            break;
         }
         case 'steaksale': {
            if (!game.movement) {
               return;
            }
            if (player.face !== 'up' && player.face !== 'down') {
               break;
            }
            const lines = text.a_outlands[subscript];
            game.movement = false;
            atlas.switch('dialoguerBottom');
            if (world.population < 6) {
               switch (args[0]) {
                  case 'steak':
                     if (!SAVE.data.b.w_state_steak) {
                        if (SAVE.storage.inventory.size === 8) {
                           await dialogue_primitive(...lines.h);
                        } else {
                           SAVE.data.b.w_state_steak = true;
                           sounds.equip.instance(renderer);
                           saver.add('steak');
                           await dialogue_primitive(...lines.f);
                        }
                     }
                     break;
                  case 'soda':
                     if (!SAVE.data.b.w_state_soda) {
                        if (SAVE.storage.inventory.size === 8) {
                           await dialogue_primitive(...lines.h);
                        } else {
                           SAVE.data.b.w_state_soda = true;
                           sounds.equip.instance(renderer);
                           saver.add('soda');
                           await dialogue_primitive(...lines.g);
                        }
                     }
                     break;
               }
            } else {
               const talker = talkerEngine(
                  'n1',
                  objectsByTag(tags => tags.includes('w2_steaksalesman'))[0]?.objects[0] as CosmosAnimation
               );
               atlas.switch('dialoguerBottom');
               switch (args[0]) {
                  case 'steak':
                     if (!SAVE.data.b.w_state_steak) {
                        await dialogue_primitive(...lines.b());
                        const p = SAVE.data.b.napsta_performance ? 40 : 20;
                        if (choicer.result === 0) {
                           if (saver.gold < p) {
                              await dialogue_primitive(...lines.d());
                           } else if (SAVE.storage.inventory.size === 8) {
                              await dialogue_primitive(...lines.e());
                           } else {
                              saver.gold -= p;
                              SAVE.data.b.w_state_steak = true;
                              sounds.equip.instance(renderer);
                              saver.add('steak');
                              await dialogue_primitive(...lines.b1);
                              if (SAVE.data.b.w_state_soda) {
                                 await dialogue_primitive(...lines.i);
                              }
                           }
                        } else {
                           await dialogue_primitive(...lines.b2);
                        }
                     }
                     break;
                  case 'soda':
                     if (!SAVE.data.b.w_state_soda) {
                        await dialogue_primitive(...lines.c());
                        const p = SAVE.data.b.napsta_performance ? 10 : 5;
                        if (choicer.result === 0) {
                           if (saver.gold < p) {
                              await dialogue_primitive(...lines.d());
                           } else if (SAVE.storage.inventory.size === 8) {
                              await dialogue_primitive(...lines.e());
                           } else {
                              saver.gold -= p;
                              SAVE.data.b.w_state_soda = true;
                              sounds.equip.instance(renderer);
                              saver.add('soda');
                              await dialogue_primitive(...lines.c1);
                              if (SAVE.data.b.w_state_steak) {
                                 await dialogue_primitive(...lines.i);
                              }
                           }
                        } else {
                           await dialogue_primitive(...lines.c2);
                        }
                     }
                     break;
                  default:
                     if (SAVE.data.b.w_state_soda && SAVE.data.b.w_state_steak) {
                        await dialogue_primitive(...lines.a1);
                     } else {
                        await dialogue_primitive(...lines.a());
                     }
                     break;
               }
               talker.end();
            }
            atlas.switch(null);
            game.movement = true;
            break;
         }
         case 'terminal': {
            if (!game.movement) {
               return;
            }
            const lines = text.a_outlands[subscript];
            game.movement = false;
            const container = objectsByTag(tags => tags.includes('w_term'))[0].objects[0] as CosmosSprite;
            sounds.equip.instance(renderer).rate.value = 1.2;
            container.frames = [ content.iooOTerminalScreen ];
            atlas.switch('dialoguerBottom');
            await dialogue_primitive(...lines.a());
            atlas.switch(null);
            container.frames = [];
            game.movement = true;
            break;
         }
         case 'triviabarrier': {
            await trivia(
               ...CosmosUtils.provide(text.a_outlands.trivia[args[0] as keyof typeof text.a_outlands.trivia])
            );
            player.move({ x: +args[1], y: +args[2] }, renderer);
            break;
         }
         case 'x-elevation': {
            const pos = player.position;
            if (scriptState.wsPosition && +args[1] <= pos.x && pos.x <= +args[2]) {
               const diff = pos.x - (scriptState.wsPosition as CosmosPointSimple).x;
               if (Math.abs(diff) > 0) {
                  player.move(
                     { x: 0, y: +args[0] * diff },
                     renderer,
                     [ 'below', 'main' ],
                     hitbox => hitbox.metadata.barrier === true
                  );
               }
            }
            scriptState.wsPosition = pos.value();
            break;
         }
         case 'backtracker': {
            if (!game.movement) {
               return;
            }
            if (SAVE.data.b.w_state_lateleave && SAVE.data.n.plot < 71.2) {
               await dialogue('auto', ...text.a_outlands.securefield);
               player.position.y -= 3;
               player.face = 'up';
            } else {
               await teleport('w_alley4', 'down', 230, 165, world);
            }
            break;
         }
         case 'lateasriel': {
            if (!game.movement) {
               return;
            }
            await dialogue('auto', ...text.a_outlands.lateasriel());
         }
      }
   }
};

events.on('drop', async key => {
   switch (key) {
      case 'pie':
      case 'pie2':
      case 'pie3':
      case 'pie4':
      case 'snails':
         if (game.room === 'w_toriel_living' && toriCheck()) {
            const talker = talkerEngine(
               'n1',
               instance('main', 'theOneAndOnlyChairiel')!.object.objects[0] as CosmosAnimation
            );
            await dialogue(
               'auto',
               ...text.a_outlands[`drop_${key === 'snails' ? 'snails' : key === 'pie3' ? 'pie3' : 'pie'}`]
            );
            if (key === 'snails') {
               SAVE.data.b.drop_snails = true;
            }
            talker.end();
         }
         break;
      case 'soda':
      case 'steak':
         if (
            game.room === 'w_party' &&
            !(
               world.population < 6 ||
               SAVE.data.n.plot > 17 ||
               SAVE.data.b.w_state_catnap ||
               (world.genocide && 16 <= SAVE.data.n.plot)
            )
         ) {
            const talker = talkerEngine(
               'n1',
               objectsByTag(tags => tags.includes('w2_steaksalesman'))[0].objects[0] as CosmosAnimation
            );
            await dialogue('auto', ...text.a_outlands[`drop_${key}`]);
            talker.end();
         }
         break;
   }
});

events.on('init-between').then(() => {
   SAVE.data.n.state_wastelands_toriel === 2 && torielOverride();
});

events.on('script', (name, ...args) => {
   switch (name) {
      case 'outlands':
         outlandsScript(args[0], ...args.slice(1));
         break;
      case 'trivia':
         if (game.movement && game.room[0] === 'w') {
            trivia(...CosmosUtils.provide(text.a_outlands.trivia[args[0] as keyof typeof text.a_outlands.trivia]));
         }
         break;
   }
});

events.on('step', () => {
   if (game.movement && SAVE.data.n.plot < 8.1 && game.room[0] === 'w') {
      switch (game.room) {
         case 'w_froggit':
         case 'w_candy':
         case 'w_puzzle1':
         case 'w_puzzle2':
         case 'w_puzzle3':
         case 'w_puzzle4':
         case 'w_mouse':
         case 'w_blooky':
         case 'w_pacing':
         case 'w_junction':
         case 'w_annex':
            return !!runEncounter(
               (outlandsKills() + SAVE.data.n.bully_wastelands) / 16,
               (() => {
                  switch (game.room) {
                     case 'w_puzzle1':
                        return SAVE.data.n.plot < 5.1
                           ? SAVE.data.n.encounters < 1 && player.position.x < 90
                              ? 1
                              : 0
                           : 1;
                     case 'w_puzzle2':
                        return SAVE.data.n.plot < 5.2
                           ? SAVE.data.n.encounters < 1 && player.position.y < 180
                              ? 1
                              : 0
                           : 1;
                     case 'w_puzzle3':
                        return SAVE.data.n.plot < 5.3
                           ? SAVE.data.n.encounters < 1 && player.position.x < 90
                              ? 1
                              : 0
                           : 1;
                     case 'w_puzzle4':
                        return SAVE.data.n.plot < 5.4
                           ? SAVE.data.n.encounters < 1 && player.position.y > 360
                              ? 1
                              : 0
                           : 1;
                     case 'w_blooky':
                        return SAVE.data.n.plot < 6.1 ? 0 : 1;
                     default:
                        return 1;
                  }
               })(),
               [
                  [ groups.froggit, 3 ],
                  [ groups.whimsun, 3 ],
                  [ groups.froggitWhimsun, 3 ],
                  [ commonGroups.moldsmal, 2 ],
                  [ groups.moldsmalMigosp, 3 ],
                  [ groups.loox, 2 ],
                  [ groups.mushy, 2 ],
                  [ groups.looxMigospWhimsun, 1 ]
               ]
            );
         default:
            SAVE.data.n.steps = 0;
            SAVE.data.n.encounters = 0;
            break;
      }
   }
});

export const awakenSystem = { state: false };

export async function outlandsTPE (from: string, to: string) {
   if (
      (to === 'w_annex' || to === 'w_alley4') &&
      SAVE.data.n.plot === 72 &&
      !SAVE.data.b.svr &&
      !SAVE.data.b.oops &&
      SAVE.data.n.svr_adv < 1
   ) {
      to === 'w_alley4' && instance('below', 'stalker')?.destroy();
      teleporter.movement = false;
      SAVE.data.n.svr_adv = 1;
      await dialogue('auto', ...text.a_outlands.finaltext.a);
      game.movement = true;
   }
   if (from === 'w_zigzag' && SAVE.data.n.plot === 2.7) {
      SAVE.data.n.plot = 2.71;
   }
   switch (to) {
      case 'w_candy': {
         if (SAVE.data.n.state_wastelands_candy === 4) {
            (instance('main', 'vending_machine')!.object.objects[0] as CosmosAnimation).reset();
         }
         break;
      }
      case 'w_toriel_kitchen': {
         const piepan = objectsByTag(tags => tags.includes('w_piepan'))[0].objects[0] as CosmosAnimation;
         piepan.alpha.value =
            SAVE.data.n.plot < 8 || (SAVE.data.n.state_wastelands_mash === 1 && SAVE.data.n.plot > 8) ? 0 : 1;
         piepan.index = SAVE.data.n.state_wastelands_mash > 0 ? 2 : SAVE.data.n.plot < 8.1 ? 1 : 0;
         break;
      }
      case 'w_lobby': {
         stalkerSetup(1);
         if (SAVE.data.n.plot > 1) {
            instanceDestroy([ 'security_field' ]);
         }
         if (2.01 <= SAVE.data.n.plot) {
            return;
         }
         const tori = temporary(
            character(
               'toriel',
               characters.toriel,
               SAVE.data.n.plot < 2 ? { x: 140, y: 130 } : { x: 240, y: 150 },
               'down'
            ),
            'main'
         );
         if (SAVE.data.n.plot < 2) {
            teleporter.movement = false;
            let stage = 0;
            const buttons = Object.fromEntries(
               objectsByTag(tags => tags.includes('l_button')).map(object => [
                  (object.metadata.tags as string[])[0],
                  [ object, object.objects[0] ]
               ])
            ) as CosmosKeyed<[CosmosObject, CosmosAnimation], `${0 | 1 | 2}${0 | 1 | 2}`>;
            for (const [ x, animation ] of Object.values(buttons)) {
               animation.index = 1;
            }
            tori.on('tick', async function () {
               if (SAVE.data.n.plot > 2) {
                  return;
               }
               tori.preset = game.room === 'w_lobby' ? characters.toriel : characters.none;
               tori.metadata.barrier = game.room === 'w_lobby';
               tori.metadata.interact = game.room === 'w_lobby';
               if (stage === 2) {
                  return;
               }
               for (const [ tag, [ button, animation ] ] of Object.entries(buttons)) {
                  if (stage === 2) {
                     break;
                  }
                  if (this.position.extentOf({ x: button.position.x, y: animation.position.y }) < 10) {
                     if (animation.index === 1) {
                        animation.index = 0;
                        sounds.noise.instance(renderer);
                        if (tag === '22') {
                           stage = 1;
                        }
                     }
                  } else if (tag === '22' && stage === 1) {
                     stage = 2;
                     sounds.noise.instance(renderer).rate.value = 1.2;
                     for (const [ x, animation ] of Object.values(buttons)) {
                        animation.index = 1;
                     }
                     await renderer.pause(350);
                     for (const [ x, animation ] of Object.values(buttons)) {
                        animation.index = 0;
                     }
                     const field = objectsByTag(tags => tags.includes('security_field'))[0];
                     sounds.depower.instance(renderer);
                     await renderer.pause(280);
                     field.alpha.value = 0;
                     await renderer.pause(420 - 320);
                     field.alpha.value = 1;
                     await renderer.pause(570 - 420);
                     field.alpha.value = 0;
                     await renderer.pause(650 - 570);
                     field.alpha.value = 1;
                     await renderer.pause(720 - 650);
                     renderer.detach('main', field);
                     break;
                  }
               }
            });
            await renderer.pause(600);
            atlas.switch('dialoguerBottom');
            await dialogue_primitive(...text.a_outlands.lobby_puzzle1);
            atlas.switch(null);
            await walkHer(tori, { x: -2, y: 0 }, pos => pos.x > 120);
            await walkHer(tori, { x: 0, y: 2 }, pos => pos.y < 160);
            await walkHer(tori, { x: 2, y: 0 }, pos => pos.x < 140);
            await walkHer(tori, { x: 0, y: 2 }, pos => pos.y < 200);
            await walkHer(tori, { x: 2, y: 0 }, pos => pos.x < 160);
            await walkHer(tori, { x: 0, y: 2 }, pos => pos.y < 230);
            await walkHer(tori, { x: -2, y: 0 }, pos => pos.x > 140);
            await walkHer(tori, { x: 0, y: 2 }, pos => pos.y < 250);
            tori.face = 'down';
            atlas.switch('dialoguerTop');
            await dialogue_primitive(...text.a_outlands.lobby_puzzle2);
            atlas.switch(null);
            await walkHer(tori, { x: 0, y: -4 }, pos => pos.y > 216);
            await walkHer(tori, { x: 4, y: 0 }, pos => pos.x < 240);
            await walkHer(tori, { x: 0, y: -4 }, pos => pos.y > 150);
            tori.face = 'down';
            atlas.switch('dialoguerBottom');
            await dialogue_primitive(...text.a_outlands.lobby_puzzle3);
            atlas.switch(null);
            SAVE.data.n.plot = 2;
            game.movement = true;
         }
         await renderer.when(
            () => game.room !== 'w_lobby' || player.position.x > tori.position.x || player.position.extentOf(tori) < 60
         );
         if (game.room !== 'w_lobby') {
            return;
         }
         SAVE.data.n.plot = 2.01;
         await walkHer(tori, { x: 4, y: 0 }, pos => pos.x < 290);
         await walkHer(tori, { x: 0, y: -4 }, pos => pos.y > 140);
         await tori.alpha.modulate(renderer, 300, 0);
         renderer.detach('main', tori);
         break;
      }
      case 'w_tutorial':
         stalkerSetup(
            2,
            () => SAVE.data.n.plot === 2.2,
            () => game.room === 'w_tutorial'
         );
         break;
      case 'w_danger':
         stalkerSetup(3);
         break;
      case 'w_froggit':
         stalkerSetup(4);
         break;
      case 'w_puzzle1': {
         if (world.postnoot && SAVE.data.n.plot < 5.1) {
            SAVE.data.n.plot = 5.1;
            world.nootflags.add('w_puzzle1');
         }
         if (SAVE.data.n.plot_call < 1) {
            outlandsScript('puzzle1');
            teleporter.movement = false;
            game.movement = false;
            SAVE.data.n.plot_call = 1;
            atlas.switch('dialoguerBottom');
            sounds.phone.instance(renderer);
            await dialogue_primitive(...text.a_outlands.plot_call.a(), commonText.c_call_common.end);
            atlas.switch(null);
            SAVE.data.n.choice_flavor = choicer.result as 0 | 1;
            game.movement = true;
         }
         break;
      }
      case 'w_puzzle2': {
         if (world.postnoot && SAVE.data.n.plot < 5.2) {
            SAVE.data.n.plot = 5.2;
            world.nootflags.add('w_puzzle2');
         }
         if (SAVE.data.n.plot_call < 2) {
            outlandsScript('puzzle2');
            teleporter.movement = false;
            game.movement = false;
            SAVE.data.n.plot_call = 2;
            atlas.switch('dialoguerBottom');
            sounds.phone.instance(renderer);
            await dialogue_primitive(...text.a_outlands.plot_call.b());
            if (choicer.result === 0) {
               await dialogue_primitive(...text.a_outlands.plot_call.b1());
            } else {
               await dialogue_primitive(...text.a_outlands.plot_call.b2());
               SAVE.data.b.snail_pie = true;
            }
            await dialogue_primitive(commonText.c_call_common.end);
            atlas.switch(null);
            game.movement = true;
         }
         break;
      }
      case 'w_puzzle3': {
         if (world.postnoot && SAVE.data.n.plot < 5.3) {
            SAVE.data.n.plot = 5.3;
            world.nootflags.add('w_puzzle3');
         }
         break;
      }
      case 'w_puzzle4':
         if (world.postnoot && SAVE.data.n.plot < 5.4) {
            SAVE.data.n.plot = 5.4;
            world.nootflags.add('w_puzzle4');
         }
         (SAVE.data.b.svr ||
            world.runaway ||
            world.population < 6 ||
            SAVE.data.b.w_state_lateleave ||
            (world.genocide && 16 <= SAVE.data.n.plot)) &&
            instanceDestroy([ 'w_manana' ]);
         stalkerSetup(5);
         if (SAVE.data.n.plot_call < 3) {
            outlandsScript('puzzle4');
            teleporter.movement = false;
            game.movement = false;
            SAVE.data.n.plot_call = 3;
            atlas.switch('dialoguerBottom');
            sounds.phone.instance(renderer);
            await dialogue_primitive(...text.a_outlands.plot_call.c, commonText.c_call_common.end);
            atlas.switch(null);
            game.movement = true;
         }
         break;
      case 'w_pacing':
         stalkerSetup(6);
         SAVE.data.b.oops && instanceDestroy([ 'w_xfrog' ]);
         (SAVE.data.b.svr ||
            world.runaway ||
            world.population < 6 ||
            roomKills().w_pacing > 0 ||
            SAVE.data.b.w_state_lateleave ||
            (world.genocide && 16 <= SAVE.data.n.plot)) &&
            instanceDestroy([ 'w_ifrog' ]);
         if (SAVE.data.n.plot_call < 4) {
            teleporter.movement = false;
            game.movement = false;
            SAVE.data.n.plot_call = 4;
            atlas.switch('dialoguerBottom');
            sounds.phone.instance(renderer);
            await dialogue_primitive(...text.a_outlands.plot_call.d, commonText.c_call_common.end);
            atlas.switch(null);
            game.movement = true;
         }
         break;
      case 'w_courtyard':
         stalkerSetup(7);
         break;
      case 'w_wonder': {
         (!SAVE.isCanon() || 7 <= SAVE.data.n.plot || SAVE.flag.b.$aster) && instanceDestroy([ 'w_goner' ]);
         SAVE.data.b.item_little_dipper && instance('below', 'w_dipper')?.destroy();
         break;
      }
      case 'w_annex': {
         (SAVE.data.b.svr ||
            world.runaway ||
            epilogueOverride(world.population < 6) ||
            roomKills().w_annex > 2 ||
            (world.genocide && 16 <= SAVE.data.n.plot)) &&
            instance('main', 'w_afrog')?.destroy();
         break;
      }
      case 'w_junction':
         ((48 <= SAVE.data.n.plot && SAVE.data.n.plot < 72) ||
            roomKills().w_junction > 0 ||
            world.genocide ||
            world.runaway ||
            SAVE.data.b.svr ||
            SAVE.data.b.migonespel ||
            world.population < 6) &&
            instanceDestroy([ 'w_silencio' ]);
         break;
      case 'w_coffin': {
         rooms.of('w_coffin').layers.below![0].tint = tints.dark02;
         break;
      }
      case 'w_entrance': {
         if (SAVE.data.n.plot === 72 && !SAVE.data.b.svr && !SAVE.data.b.oops && SAVE.data.n.svr_adv < 2) {
            teleporter.movement = false;
            SAVE.data.n.svr_adv = 2;
            await dialogue('auto', ...text.a_outlands.finaltext.b);
            game.movement = true;
         }
         break;
      }
      case 'w_start': {
         if (!awakenSystem.state && SAVE.data.b.svr && SAVE.data.s.room === 'w_start') {
            awakenSystem.state = true;
            teleporter.movement = false;
            game.camera = new CosmosObject({ position: { x: 160, y: 260 } });
            const TRANSITION = fader({ alpha: 1, fill: 0 });
            renderer.attach('menu', TRANSITION);
            AWAKEN(TRANSITION);
         } else if (SAVE.data.n.plot === 72 && !SAVE.data.b.svr && !world.runaway) {
            const az = temporary(
               new CosmosHitbox({
                  size: { x: 20, y: 3 },
                  anchor: { x: 0, y: 1 },
                  metadata: {
                     barrier: true,
                     interact: true,
                     name: 'outlands',
                     args: [ 'lateasriel' ],
                     tags: [ 'lateasriel' ]
                  },
                  objects: [ new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAsrielTrueDownSad }) ],
                  position: { x: 160, y: 295 }
               }),
               'main'
            );
            if (!SAVE.data.b.oops && SAVE.data.n.svr_adv < 3) {
               teleporter.movement = false;
               SAVE.data.n.svr_adv = 3;
               await dialogue('auto', ...text.a_outlands.finaltext.c);
               game.movement = true;
            }
            if (!SAVE.data.b.oops) {
               await renderer.when(() => game.room !== 'w_start' || (player.position.y > 140 && game.movement));
               if (game.room !== 'w_start') {
                  return;
               }
               game.movement = false;
               music.reunited.stop();
               content.amReunited.unload();
               const ASSETS_1 = new CosmosInventory(
                  content.amCharacutscene,
                  content.asWind,
                  content.iocAsrielTrueRightSadTalk,
                  content.iocFriskLeftChara
               );
               const ASSETS_2 = new CosmosInventory(content.amMemory, content.iocAsrielBow, content.iocAsrielHug3);
               const ASSETS_3 = new CosmosInventory(content.amCharafinal, content.asRotate, content.ibuBossSOUL);
               ASSETS_1.name = 'ASSETS_1';
               ASSETS_2.name = 'ASSETS_2';
               ASSETS_3.name = 'ASSETS_3';
               const LOADER_1 = ASSETS_1.load();
               await renderer.pause(1000);
               const CAMERA = new CosmosObject({ position: player.position.clamp(...renderer.region) });
               game.camera = CAMERA;
               await CAMERA.position.modulate(renderer, 3000, { y: renderer.region[1].y });
               await renderer.pause(1650);
               const LOADER_2 = ASSETS_2.load();
               await dialogue('dialoguerBottom', ...text.a_outlands.finaltext.d1);
               await renderer.pause(1250);
               await dialogue('dialoguerBottom', ...text.a_outlands.finaltext.d2);
               const BACKGROUND = fader();
               await BACKGROUND.alpha.modulate(renderer, 2000, 1);
               renderer.detach('main', az);
               await antifreeze([ LOADER_1, renderer.pause(2000) ]);
               const SPEECH_PRESET = speech.presets.of('asriel1');
               const ASRIEL = new CosmosAnimation({
                  anchor: { x: 0, y: 1 },
                  position: { x: 60, y: 180 },
                  resources: content.iocAsrielTrueRightSadTalk
               }).on('tick', function () {
                  if (speech.state.preset === SPEECH_PRESET) {
                     speech.targets.has(this) || speech.targets.add(this);
                  } else {
                     speech.targets.has(this) && speech.targets.delete(this);
                     this.reset();
                  }
               });
               const CHARA = new CosmosAnimation({
                  anchor: { x: 0, y: 1 },
                  position: { x: 260, y: 180 },
                  resources: content.iocFriskLeftChara
               });
               renderer.attach('menu', ASRIEL, CHARA);
               const OVERLAY = fader({ alpha: 1 });
               const WIND = sounds.wind.instance(renderer);
               WIND.gain.value /= 10;
               WIND.rate.value = 0.75;
               await Promise.all([
                  OVERLAY.alpha.modulate(renderer, 2000, 0),
                  WIND.gain.modulate(renderer, 2000, WIND.gain.value * 10)
               ]);
               renderer.detach('menu', OVERLAY);
               await renderer.pause(2650);
               await dialogue('dialoguerTop', ...text.a_outlands.finaltext.d3);
               const CHARA_MUSIC = music.characutscene.instance(renderer);
               CHARA_MUSIC.rate.value *= 0.5;
               WIND.gain.modulate(renderer, 2000, WIND.gain.value / 5);
               await renderer.pause(1650);
               await dialogue('dialoguerTop', ...text.a_outlands.finaltext.d4);
               await renderer.pause(450);
               await dialogue('dialoguerTop', ...text.a_outlands.finaltext.d5);
               await renderer.pause(1650);
               await dialogue('dialoguerTop', ...text.a_outlands.finaltext.d6);
               await renderer.pause(650);
               await dialogue('dialoguerTop', ...text.a_outlands.finaltext.d7);
               await renderer.pause(1450);
               await dialogue('dialoguerTop', ...text.a_outlands.finaltext.d8);
               await renderer.pause(1650);
               await dialogue('dialoguerTop', ...text.a_outlands.finaltext.d9);
               await renderer.pause(850);
               await dialogue('dialoguerTop', ...text.a_outlands.finaltext.d10);
               await renderer.pause(1450);
               await dialogue('dialoguerTop', ...text.a_outlands.finaltext.d11);
               await renderer.pause(1850);
               await dialogue('dialoguerTop', ...text.a_outlands.finaltext.d12);
               await renderer.pause(850);
               await dialogue('dialoguerTop', ...text.a_outlands.finaltext.d13);
               await renderer.pause(1650);
               await dialogue('dialoguerTop', ...text.a_outlands.finaltext.d14);
               await renderer.pause(1850);
               await dialogue('dialoguerTop', ...text.a_outlands.finaltext.d15);
               await renderer.pause(2450);
               await dialogue('dialoguerTop', ...text.a_outlands.finaltext.d16);
               await renderer.pause(1250);
               await dialogue('dialoguerTop', ...text.a_outlands.finaltext.d17);
               await renderer.pause(1450);
               await dialogue('dialoguerTop', ...text.a_outlands.finaltext.d18);
               await renderer.pause(2150);
               await dialogue('dialoguerTop', ...text.a_outlands.finaltext.d19);
               await renderer.pause(1850);
               await dialogue('dialoguerTop', ...text.a_outlands.finaltext.d20);
               await renderer.pause(650);
               await dialogue('dialoguerTop', ...text.a_outlands.finaltext.d21);
               await renderer.pause(1250);
               await dialogue('dialoguerTop', ...text.a_outlands.finaltext.d22);
               await renderer.pause(650);
               await dialogue('dialoguerTop', ...text.a_outlands.finaltext.d23);
               await renderer.pause(1650);
               await dialogue('dialoguerTop', ...text.a_outlands.finaltext.d24);
               await renderer.pause(850);
               await dialogue('dialoguerTop', ...text.a_outlands.finaltext.d25);
               await renderer.pause(650);
               await dialogue('dialoguerTop', ...text.a_outlands.finaltext.d26);
               await renderer.pause(1250);
               await dialogue('dialoguerTop', ...text.a_outlands.finaltext.d27);
               CHARA_MUSIC.gain.modulate(renderer, 3000, 0).then(() => CHARA_MUSIC.stop());
               await renderer.pause(1850);
               await dialogue('dialoguerTop', ...text.a_outlands.finaltext.d28);
               await renderer.pause(2450);
               await dialogue('dialoguerTop', ...text.a_outlands.finaltext.d29);
               await renderer.pause(1450);
               await dialogue('dialoguerTop', ...text.a_outlands.finaltext.d30);
               await antifreeze([ LOADER_2, renderer.pause(1850) ]);
               const LOADER_3 = ASSETS_3.load();
               await dialogue('dialoguerTop', ...text.a_outlands.finaltext.d31);
               const ASRIEL_MUSIC = music.memory.instance(renderer);
               await renderer.pause(1250);
               ASRIEL.use(content.iocAsrielBow);
               await renderer.pause(1650);
               await dialogue('dialoguerTop', ...text.a_outlands.finaltext.d32);
               await renderer.pause(1250);
               await dialogue('dialoguerTop', ...text.a_outlands.finaltext.d33);
               await renderer.pause(1450);
               await dialogue('dialoguerTop', ...text.a_outlands.finaltext.d34);
               await renderer.pause(850);
               dialogue('dialoguerTop', ...text.a_outlands.finaltext.d35);
               await renderer.pause(650);
               CHARA.enable();
               CHARA.duration = 5;
               CHARA.extrapolate = false;
               await CHARA.position.step(renderer, 3, { x: ASRIEL.position.x + 4.5 });
               CHARA.reset();
               await renderer.pause(233);
               renderer.detach('menu', ASRIEL, CHARA);
               const ASRIEL_AND_CHARA = new CosmosAnimation({
                  anchor: { x: 0, y: 1 },
                  position: { x: 60, y: 180 },
                  resources: content.iocAsrielHug3
               }).on('tick', function () {
                  this.index === 10 && (this.index = 8);
               });
               renderer.attach('menu', ASRIEL_AND_CHARA);
               ASRIEL_AND_CHARA.enable();
               await renderer.when(() => ASRIEL_AND_CHARA.index === 1);
               ASRIEL_AND_CHARA.disable();
               await renderer.pause(2000);
               await dialogue('dialoguerTop', ...text.a_outlands.finaltext.d36);
               await renderer.pause(500);
               await dialogue('dialoguerTop', ...text.a_outlands.finaltext.d37);
               await renderer.pause(1000);
               ASRIEL_AND_CHARA.index = 2;
               ASRIEL_AND_CHARA.step = 0;
               ASRIEL_AND_CHARA.enable();
               await renderer.when(() => ASRIEL_AND_CHARA.index === 8);
               await renderer.pause(1000);
               await dialogue('dialoguerTop', ...text.a_outlands.finaltext.d38);
               await renderer.pause(2000);
               await dialogue('dialoguerTop', ...text.a_outlands.finaltext.d39);
               await renderer.pause(1000);
               await dialogue('dialoguerTop', ...text.a_outlands.finaltext.d40);
               await renderer.pause(1000);
               keyState.interact && (await keys.interactKey.on('up'));
               renderer.attach('menu', OVERLAY);
               await Promise.all([
                  OVERLAY.alpha.modulate(renderer, 2000, 1),
                  ASRIEL_MUSIC.gain.modulate(renderer, 2000, 0),
                  WIND.gain.modulate(renderer, 2000, 0)
               ]);
               ASRIEL_MUSIC.stop();
               WIND.stop();
               renderer.detach('menu', BACKGROUND, ASRIEL_AND_CHARA);
               const BLOOM_FILTER = new AdvancedBloomFilter({
                  threshold: 0,
                  bloomScale: 0.25,
                  quality: 10,
                  brightness: 1
               });
               (renderer.filters ??= []).push(BLOOM_FILTER);
               engageDelay();
               await renderer.pause(1250);
               await dialogue('dialoguerBottom', ...text.a_outlands.finaltext.d41);
               await antifreeze([ LOADER_3, renderer.pause(1650) ]);
               const LOADER_4 = inventories.svrAssets.load();
               await dialogue('dialoguerBottom', ...text.a_outlands.finaltext.d42);
               await renderer.pause(450);
               const FINAL_MUSIC = music.charafinal.instance(renderer);
               renderer.pause(2000).then(async () => {
                  dialogue('dialoguerBottom', ...text.a_outlands.finaltext.d43);
                  await renderer.pause(5000);
                  dialogue('dialoguerBottom', ...text.a_outlands.finaltext.d44);
                  await renderer.pause(10000);
                  dialogue('dialoguerBottom', ...text.a_outlands.finaltext.d45);
               });
               await renderer.pause(5000);
               const SOUL_DISTANCE = new CosmosValue();
               const SOUL_OBJECT = new CosmosObject({
                  alpha: 0,
                  objects: [
                     new CosmosAnimation({
                        anchor: { x: 1, y: 0 },
                        resources: content.ibuSOUL,
                        subcrop: { right: 8 }
                     }).on('tick', function () {
                        this.position.x = -SOUL_DISTANCE.value;
                     }),
                     new CosmosAnimation({
                        anchor: { y: 0 },
                        resources: content.ibuSOUL,
                        subcrop: { left: 8 }
                     }).on('tick', function () {
                        this.position.x = SOUL_DISTANCE.value;
                     })
                  ],
                  position: { x: 160, y: 100 },
                  scale: 0.5
               });
               renderer.attach('menu', SOUL_OBJECT);
               await Promise.all([
                  SOUL_OBJECT.alpha.modulate(renderer, 3000, 1),
                  SOUL_OBJECT.position.modulate(renderer, 3000, {}, { y: 80 }, { y: 80 })
               ]);
               await renderer.pause(2000);
               const SOUL_ASRIEL = new CosmosSprite({
                  alpha: 0,
                  anchor: 0,
                  frames: [ content.ibuBossSOUL ],
                  position: { x: 160, y: 80 },
                  scale: 0
               });
               renderer.attach('menu', SOUL_ASRIEL);
               SOUL_ASRIEL.scale.modulate(renderer, 17000, 2, 1);
               const ROTATE_SFX_1 = sounds.rotate.instance(renderer);
               await Promise.all([
                  SOUL_ASRIEL.alpha.modulate(renderer, 5000, 1),
                  SOUL_DISTANCE.modulate(renderer, 5000, 20)
               ]);
               ROTATE_SFX_1.stop();
               await renderer.pause(2000);
               const ROTATE_SFX_2 = sounds.rotate.instance(renderer);
               ROTATE_SFX_2.gain.value *= 0.5;
               await Promise.all([
                  SOUL_DISTANCE.modulate(renderer, 3000, 12),
                  SOUL_OBJECT.alpha.modulate(renderer, 3000, 0),
                  ROTATE_SFX_2.gain.modulate(renderer, 3000, 0)
               ]);
               ROTATE_SFX_2.stop();
               renderer.detach('menu', SOUL_OBJECT);
               const TRANSITION = fader({ fill: 0xffffff });
               await TRANSITION.alpha.modulate(renderer, 7000, 1);
               renderer.filters?.splice(renderer.filters.indexOf(BLOOM_FILTER), 1);
               renderer.detach('menu', OVERLAY, SOUL_ASRIEL);
               await renderer.pause(1000);
               await renderer.alpha.modulate(renderer, 3000, 0);
               renderer.alpha.value = 1;
               TRANSITION.fill = 0;
               disengageDelay();
               await FINAL_MUSIC.gain.modulate(renderer, 2500, 0);
               FINAL_MUSIC.stop();
               ASSETS_1.unload();
               ASSETS_2.unload();
               ASSETS_3.unload();
               await dialogue('dialoguerTop', ...text.a_outlands.finaltext.d46);
               await antifreeze([ LOADER_4, renderer.pause(1500) ]);
               await dialogue('dialoguerTop', ...text.a_outlands.finaltext.d47);
               CAMERA.position.set(160, 260);
               engageDelay();
               await renderer.pause(1500);
               SAVE.data.b.svr = true;
               saver.save('w_start');
               sounds.save.instance(renderer);
               await renderer.pause(2000);
               disengageDelay();
               AWAKEN(TRANSITION);
            }
         } else if (
            toriSV() &&
            SAVE.data.n.state_wastelands_toriel !== 2 &&
            world.population > 5 &&
            SAVE.data.n.plot > 47.2 &&
            SAVE.data.n.plot < 71.2 &&
            !SAVE.data.b.w_state_lateleave
         ) {
            temporary(
               new CosmosHitbox({
                  size: { x: 25, y: 5 },
                  anchor: { x: 0, y: 1 },
                  metadata: {
                     barrier: true,
                     interact: true,
                     name: 'outlands',
                     args: [ 'latetoriel' ],
                     tags: [ 'latetoriel' ]
                  },
                  objects: [ new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocTorielSad }) ],
                  position: { x: 160, y: 295 }
               }),
               'main'
            );
         }
         break;
      }
      case 'w_toriel_hallway': {
         temporary(
            new CosmosObject({
               priority: 10,
               objects: [
                  new CosmosSprite({ frames: [ content.iooOMirrorBackdrop ] }).on('pre-render', function () {
                     this.position.set(renderer.projection({ x: 647, y: 80 }));
                  }),
                  new CosmosAnimation({ anchor: { x: 0, y: 1 } }).on('pre-render', function () {
                     const y = 116.5 - (player.position.y - 116.5);
                     this.priority.value = y + 0.001;
                     this.position.set(renderer.projection({ x: player.position.x, y }));
                     this.use((SAVE.data.b.water ? friskMirrorWater : friskMirror)[player.face]);
                     this.index = player.sprite.index;
                     this.fix();
                  }),
                  new CosmosAnimation({ anchor: { x: 0, y: 1 } }).on('pre-render', function () {
                     if (SAVE.data.b.svr || world.goatbro) {
                        const target = SAVE.data.b.svr ? goatbroTrue : goatbro;
                        const y = 116.5 - (target.position.y - 116.5);
                        this.priority.value = y;
                        this.position.set(renderer.projection({ x: target.position.x, y }));
                        const source = target.sprites[
                           { right: 'right', left: 'left', up: 'down', down: 'up' }[target.face] as CosmosDirection
                        ] as CosmosAnimation;
                        this.use(source.resources);
                        this.index = (target.sprite.index + 2) % 4;
                        this.fix();
                     }
                  })
               ]
            }),
            'base'
         );
         const toriwall = instance('below', 'w_toriwall')!.object.objects[0];
         if (
            SAVE.data.n.plot < 14 ||
            SAVE.data.n.state_wastelands_toriel === 2 ||
            outlandsKills() > 10 ||
            SAVE.data.b.w_state_lateleave
         ) {
            toriwall.metadata.trigger = false; // before battle or :cold_face:
         } else if (toriSV()) {
            toriwall.metadata.trigger = SAVE.data.n.plot < 48; // toriel is in her room on LV1 or above
         } else if (SAVE.data.n.plot < 17.001) {
            toriwall.metadata.trigger = !SAVE.data.b.w_state_catnap; // toriel is alive, just after battle completes
         } else {
            toriwall.metadata.trigger = false; // LV0
         }
         if (SAVE.data.n.plot < 8 && SAVE.data.n.cell_insult < 3) {
            SAVE.data.n.plot = 8;
            teleporter.movement = false;
            const handholder = new CosmosCharacter({
               anchor: { x: 0, y: 1 },
               position: { x: player.position.x + 12.5, y: player.position.y },
               preset: characters.torielHandhold,
               key: 'toriel'
            }).on('tick', () => {
               player.position.set(handholder.position.subtract(12.5, 0));
            });
            handholder.face = 'right';
            player.alpha.value = 0;
            renderer.attach('main', handholder);
            await walkHer(handholder, { x: 3, y: 0 }, pos => pos.x < 170);
            renderer.detach('main', handholder);
            const tori = new CosmosCharacter({
               anchor: { x: 0, y: 1 },
               position: { x: player.position.x + 24, y: player.position.y },
               preset: characters.toriel,
               key: 'toriel'
            });
            tori.face = 'up';
            player.face = 'up';
            player.alpha.value = 1;
            renderer.attach('main', tori);
            atlas.switch('dialoguerBottom');
            await dialogue_primitive(...text.a_outlands.return5);
            atlas.switch(null);
            const ruffler = new CosmosAnimation({
               active: true,
               anchor: { x: 0, y: 1 },
               position: { x: player.position.x + 13.5, y: player.position.y },
               resources: content.iocTorielRuffle
            });
            player.alpha.value = 0;
            renderer.detach('main', tori);
            renderer.attach('main', ruffler);
            await renderer.pause(3000);
            player.alpha.value = 1;
            renderer.detach('main', ruffler);
            renderer.attach('main', tori);
            atlas.switch('dialoguerBottom');
            await dialogue_primitive(...text.a_outlands.return6);
            atlas.switch(null);
            game.movement = true;
            await Promise.race([
               events.on('teleport'),
               walkHer(tori, { x: 0, y: 3 }, pos => pos.y < Math.min(player.position.y + 10, 170)).then(async () => {
                  await walkHer(tori, { x: -3, y: 0 }, pos => pos.x > 15);
                  await tori.alpha.modulate(renderer, 300, 0);
               })
            ]);
            renderer.detach('main', tori);
         }
         break;
      }
      case 'w_alley4':
         stalkerSetup(8, true, () => SAVE.flag.n.genocide_twinkly < resetThreshold());
         if (world.goatbro && SAVE.flag.n.ga_asrielOutlands6 < 1) {
            teleporter.movement = false;
            SAVE.flag.n.ga_asrielOutlands6 = 1;
            await dialogue('auto', ...text.a_outlands.noticereturn);
            game.movement = true;
         }
         if (SAVE.data.b.w_state_lateleave && SAVE.data.n.plot < 71.2) {
            temporary(
               new CosmosAnimation({
                  active: true,
                  resources: content.iooOSecurityFieldTall,
                  anchor: { x: 0, y: 1 },
                  position: { x: 230, y: 160 },
                  objects: [
                     new CosmosHitbox({
                        anchor: { x: 0, y: 1 },
                        size: { x: 60, y: 20 },
                        metadata: { barrier: true, interact: true, name: 'trivia', args: [ 'w_security' ] }
                     })
                  ]
               }),
               'below'
            );
         }
      case 'w_alley3':
      case 'w_alley2':
      case 'w_alley1': {
         const toriTarget = to === 'w_alley1' ? 10 : to === 'w_alley2' ? 11 : to === 'w_alley3' ? 12 : 13;
         if (SAVE.data.n.plot !== toriTarget) {
            break;
         }
         temporary(
            character(
               'toriel',
               characters.toriel,
               to === 'w_alley4' ? { x: 230, y: 170 } : { x: 180, y: to === 'w_alley1' ? 160 : 180 },
               to === 'w_alley4' ? 'up' : 'right',
               {
                  anchor: { x: 0, y: 1 },
                  metadata: {
                     name: 'outlands',
                     args: [ 'alley' ],
                     tags: [ 'toriButNotGarb' ],
                     battle: false,
                     stopped: false
                  }
               }
            ).on('tick', async function () {
               if (
                  game.room === to &&
                  SAVE.data.n.plot === toriTarget &&
                  (to === 'w_alley4'
                     ? player.position.y < 180 ||
                       (player.position.x > 160 && player.position.x < 320 && player.position.y < 210)
                     : player.position.x > this.position.x - 30) &&
                  game.movement
               ) {
                  SAVE.data.n.plot < 13 && SAVE.data.n.plot++;
                  game.movement = false;
                  await dialogue(
                     'dialoguerBottom',
                     ...CosmosUtils.provide(
                        to === 'w_alley1'
                           ? text.a_outlands.exit1
                           : to === 'w_alley2'
                           ? text.a_outlands.exit2
                           : to === 'w_alley3'
                           ? text.a_outlands.exit3
                           : text.a_outlands.exit4
                     )
                  );
                  if (to === 'w_alley4') {
                     game.movement = false;
                     this.preset = characters.torielSpecial;
                     const overlay = new CosmosRectangle({
                        alpha: 0,
                        size: { x: 1000, y: 1000 },
                        position: { x: 160, y: 120 },
                        anchor: 0,
                        priority: -1,
                        fill: 0,
                        stroke: -1
                     });
                     renderer.attach('main', overlay);
                     await Promise.all([
                        battler.load(groups.toriel),
                        CosmosUtils.chain<number, Promise<void>>(0, async (value, next) => {
                           sounds.noise.instance(renderer);
                           overlay.alpha.value += 0.25;
                           if (value < 3) {
                              await renderer.pause(350);
                              await next(value + 1);
                           } else {
                              await renderer.pause(850);
                              await battler.battlefall(player);
                           }
                        })
                     ]);
                     await battler.start(groups.toriel);
                     battler.unload(groups.toriel);
                     if (SAVE.data.n.state_wastelands_toriel > 0) {
                        SAVE.data.b.oops = true;
                     }
                     if (SAVE.data.n.state_wastelands_toriel === 2) {
                        torielOverride();
                     }
                     renderer.detach('main', overlay);
                     SAVE.data.n.plot = 14;
                     player.position.x = 230;
                     player.position.y = 240;
                     player.face = 'up';
                     if (SAVE.data.n.state_wastelands_toriel === 2) {
                        if (16 <= outlandsKills() && SAVE.flag.n.genocide_twinkly < resetThreshold()) {
                           this.preset = characters.asriel;
                           this.position.y = 200;
                           this.face = 'up';
                           outlandsScript('tick');
                           await renderer.pause(300);
                           await this.walk(renderer, 3, { y: 160 });
                           await this.alpha.modulate(renderer, 300, 0);
                        }
                        renderer.detach('main', this);
                        SAVE.flag.b._primer = true;
                        game.movement = true;
                     } else {
                        this.preset = characters.toriel;
                        this.face = 'down';
                        const feels = music.toriel.instance(renderer);
                        feels.gain.value /= 4;
                        feels.gain.modulate(renderer, 300, feels.gain.value * 4);
                        events.on('teleport-start').then(async () => {
                           await feels.gain.modulate(renderer, 300, 0);
                           feels.stop();
                        });
                        atlas.switch('dialoguerBottom');
                        if (SAVE.data.n.state_wastelands_toriel > 2) {
                           await dialogue_primitive(
                              ...[ text.a_outlands.goodbye5a, text.a_outlands.goodbye5b ][
                                 SAVE.data.n.state_wastelands_toriel - 3
                              ]
                           );
                           atlas.switch(null);
                           feels.gain.modulate(renderer, 3000, 0).then(() => feels.stop());
                           await exitscene();
                        } else {
                           await dialogue_primitive(
                              ...(SAVE.data.b.oops ? text.a_outlands.goodbye1b : text.a_outlands.goodbye1a)
                           );
                           atlas.switch(null);
                           const midpoint = player.position.y - (player.position.y - this.position.y) / 2;
                           await Promise.all([
                              walkHer(this, { x: 0, y: 3 }, pos => pos.y < midpoint - 0.5),
                              walkHer(player, { x: 0, y: -3 }, pos => pos.y > midpoint + 0.5)
                           ]);
                           this.position.y = midpoint - 0.5;
                           player.position.y = midpoint + 0.5;
                           const hugger = new CosmosAnimation({
                              anchor: { x: 0, y: 1 },
                              position: player.position.value(),
                              resources: content.iocTorielHug
                           });
                           player.alpha.value = 0;
                           this.alpha.value = 0;
                           renderer.attach('main', hugger);
                           await renderer.pause(60);
                           hugger.index = 1;
                           await renderer.pause(120);
                           hugger.index = 2;
                           renderer.pause(850).then(() => SAVE.data.n.hp < calcHP() && heal());
                           await renderer.pause(4150);
                           keyState.interact && (await keys.interactKey.on('up'));
                           hugger.index = 1;
                           await renderer.pause(120);
                           hugger.index = 0;
                           await renderer.pause(850);
                           renderer.detach('main', hugger);
                           player.alpha.value = 1;
                           this.alpha.value = 1;
                           atlas.switch('dialoguerBottom');
                           if (SAVE.data.b.oops) {
                              await dialogue_primitive(...text.a_outlands.goodbye3);
                           } else {
                              await dialogue_primitive(...text.a_outlands.goodbye2);
                           }
                        }
                        atlas.switch(null);
                        const speed = SAVE.data.b.oops ? 4 : 3;
                        await Promise.race([
                           events.on('teleport').then(() => {
                              SAVE.data.b.w_state_fightroom = true;
                           }),
                           walkHer(this, { x: -speed, y: 0 }, pos => pos.x > 180).then(async () => {
                              await walkHer(this, { x: 0, y: speed }, pos => pos.y < 240);
                              await walkHer(this, { x: speed, y: 0 }, pos => pos.x < 230);
                              await walkHer(this, { x: 0, y: speed }, pos => pos.y < 310);
                              await renderer.pause(650);
                              this.face = 'up';
                              await renderer.pause(950);
                              if (!SAVE.data.b.oops) {
                                 atlas.switch('dialoguerTop');
                                 await dialogue_primitive(...text.a_outlands.goodbye4);
                                 atlas.switch(null);
                              }
                              await renderer.pause(1250);
                              SAVE.flag.b._primer = true;
                              game.movement = true;
                              await walkHer(this, { x: 0, y: speed }, pos => pos.y < 520);
                              await walkHer(this, { x: -speed, y: 0 }, pos => pos.x > 35);
                              this.metadata.tags = [];
                              await this.alpha.modulate(renderer, 300, 0);
                           })
                        ]);
                        renderer.detach('main', this);
                     }
                  } else {
                     game.movement = true;
                     await Promise.race([
                        events.on('teleport'),
                        this.walk(renderer, 4, { x: 360 }).then(() => this.alpha.modulate(renderer, 300, 0))
                     ]);
                  }
                  renderer.detach('main', this);
               }
            }),
            'main'
         );
         break;
      }
      case 'w_toriel_living': {
         (SAVE.data.n.state_wastelands_toriel === 2 || world.runaway) && instance('main', 'fire')?.destroy();
         const roomState = (outlandsStates.rooms.w_toriel_living ??= {});
         if (!roomState.active) {
            roomState.active = true;
            SAVE.data.n.state_toriel_food === 2 && (SAVE.data.n.state_toriel_food = 3);
            objectsByTag(tags => tags.includes('w_kitchenwall'))[0].objects[0].on('tick', function () {
               this.metadata.trigger =
                  SAVE.data.n.plot === 9 || (3 <= SAVE.data.n.cell_insult && SAVE.data.n.plot === 7);
            });
         }
         const chairAnim = instance('main', 'theOneAndOnlyChairiel')!.object.objects[0] as CosmosAnimation;
         if (toriCheck() || (SAVE.data.n.plot === 9 && SAVE.data.n.state_toriel_food === 3)) {
            chairAnim.reset().use(content.ionOChairielTalk);
            if (SAVE.data.n.state_toriel_food === 3) {
               spawnBreakfast();
               if (SAVE.data.n.plot < 9.1) {
                  SAVE.data.n.plot = 9.1;
                  game.movement = false;
                  teleporter.movement = false;
                  const talker = talkerEngine('n1', chairAnim);
                  atlas.switch('dialoguerBottom');
                  await dialogue_primitive(...text.a_outlands.chair4);
                  talker.end();
                  atlas.switch(null);
                  game.movement = true;
               }
            }
         } else {
            chairAnim.reset().use(content.ionOChairiel);
            chairAnim.index = 5;
         }
         break;
      }
      case 'w_toriel_asriel': {
         instance('below', 'coverdark')!.object.alpha.value = SAVE.data.b.w_state_lamp ? 1 : 0;
         if ((game.music || from === '_void') && SAVE.data.n.state_wastelands_toriel !== 2) {
            const mus = music.homeAlt.instance(renderer, game.music?.position ?? 0);
            mus.gain.value = 0;
            mus.rate.value = world.ambiance;
            if (SAVE.data.b.w_state_lamp && (!game.music || game.music.gain.value > 0)) {
               mus.gain.modulate(renderer, 300, world.level);
               game.music?.gain.modulate(renderer, (game.music.gain.value / world.level) * 300, 0);
            }
            (outlandsStates.scripts.toriel_asriel_lamp ??= {}).music = mus;
            if (SAVE.data.b.w_state_lamp && from === '_void') {
               world.cutscene_override = true;
               game.music = music.home.instance(renderer, 0, true);
               game.music.gain.value = 0;
               game.music.rate.value = world.ambiance;
               renderer.post().then(() => {
                  world.cutscene_override = false;
               });
            }
            const value = await events.on('teleport-start');
            if (SAVE.data.b.w_state_lamp && mus.gain.value > 0) {
               value[1] === '_void' ||
                  game.music?.gain.modulate(renderer, (1 - game.music.gain.value / world.level) * 300, world.level);
               await mus.gain.modulate(renderer, (mus.gain.value / world.level) * 300, 0);
            }
            mus.stop();
         }
         break;
      }
      case 'w_party': {
         SAVE.data.b.item_halo && instance('below', 'w_halo')?.destroy();
         SAVE.data.n.plot === 72 && instance('main', 'w_djtable')?.destroy();
         if (world.population < 6) {
            (SAVE.data.n.plot < 72 || world.runaway || SAVE.data.b.svr) && instanceDestroy([ 'w_bpatron' ]);
            instanceDestroy([ 'w2_steaksalesman' ]);
         } else if (SAVE.data.n.plot > 17 || SAVE.data.b.w_state_catnap || (world.genocide && 16 <= SAVE.data.n.plot)) {
            (SAVE.data.n.plot < 72 || world.runaway || SAVE.data.b.svr) && instanceDestroy([ 'w_bpatron' ]);
            instanceDestroy([ 'w2_steaksalesman' ]);
            instanceDestroy([ 'w2_steakitem' ]);
            instanceDestroy([ 'w2_sodaitem' ]);
            instanceDestroy([ 'w2_table' ]);
            instanceDestroy([ 'w2_tablebarrier' ], 'below');
         }
         const steakitem = objectsByTag(tags => tags.includes('w2_steakitem'))[0];
         if (steakitem && !steakitem.metadata.active) {
            steakitem.metadata.active = true;
            steakitem.on('tick', () => {
               steakitem.alpha.value = SAVE.data.b.w_state_steak ? 0 : 1;
            });
         }
         const sodaitem = objectsByTag(tags => tags.includes('w2_sodaitem'))[0];
         if (sodaitem && !sodaitem.metadata.active) {
            sodaitem.metadata.active = true;
            sodaitem.on('tick', () => {
               sodaitem.alpha.value = SAVE.data.b.w_state_soda ? 0 : 1;
            });
         }
         break;
      }
      case 'w_twinkly': {
         const roomState = (outlandsStates.rooms.w_twinkly ??= {});
         if (!roomState.goated) {
            roomState.goated = true;
            if (world.goatbro && SAVE.flag.n.ga_asrielOutlands7 < 1) {
               await renderer.when(() => game.room === 'w_twinkly' && player.position.y > 60 && game.movement);
               SAVE.flag.n.ga_asrielOutlands7 = 1;
               await dialogue('auto', ...text.a_outlands.noticestart);
            }
         }
         break;
      }
      case 'w_exit': {
         const roomState = (outlandsStates.rooms.w_exit ??= {});
         if (!roomState.goatbro && world.genocide && SAVE.data.n.plot < 16) {
            const goatbro = new CosmosCharacter({
               anchor: { x: 0, y: 1 },
               position: { x: 120, y: 30 },
               size: { x: 40, y: 20 },
               metadata: {
                  barrier: true,
                  interact: true,
                  name: 'outlands',
                  args: [ 'partner', 'talk' ],
                  sus: void 0 as boolean | void
               },
               preset: characters.asriel,
               key: 'asriel2',
               face: 'up'
            }).on('tick', async () => {
               if (game.room !== 's_start') {
                  goatbro.preset = game.room === 'w_exit' ? characters.asriel : characters.none;
                  goatbro.metadata.barrier = game.room === 'w_exit';
                  goatbro.metadata.interact = game.room === 'w_exit';
               } else {
                  renderer.detach('main', goatbro);
               }
            });
            renderer.attach('main', goatbro);
            roomState.goatbro = goatbro;
            if (SAVE.data.n.plot < 15) {
               teleporter.movement = false;
               game.movement = false;
               SAVE.data.n.plot = 15;
               await renderer.pause(2000);
               await dialogue('dialoguerTop', ...text.a_outlands.asriel0);
               await renderer.pause(1000);
               await goatbro.walk(renderer, 3, { y: 140 });
               await renderer.pause(850);
               await dialogue('dialoguerBottom', ...text.a_outlands.asriel1());
               game.movement = true;
               await Promise.race([ events.on('teleport'), goatbro.walk(renderer, 3, { y: 30 }) ]);
               goatbro.walk(renderer);
               for (const spr of Object.values(characters.asriel.walk)) {
                  spr.reset();
               }
            }
         }
         break;
      }
   }
   if (
      SAVE.data.n.plot < 14 &&
      ((from === 'w_courtyard' && to === 'w_alley1') ||
         (from === 'w_alley1' && to === 'w_alley2') ||
         (from === 'w_alley2' && to === 'w_alley3') ||
         (from === 'w_alley3' && to === 'w_alley4'))
   ) {
      const impact = sounds.impact.instance(renderer);
      impact.rate.value = 1 / 3;
      events.on('teleport-start').then(() => {
         impact.gain.modulate(renderer, 300, 0).then(() => {
            impact.stop();
         });
      });
   }
}

events.on('teleport', (from, to) => {
   outlandsTPE(from, to);
});

const svrtext: [string, string, CosmosProvider<string[]>][] = [
   [ 'w_zigzag', 'w_danger', text.a_outlands.finaltext.e1 ],
   [ 'w_courtyard', 'w_junction', text.a_outlands.finaltext.e2 ],
   [ 's_sans', 's_start', text.a_outlands.finaltext.e3 ],
   [ 's_jenga', 's_puzzle2', text.a_outlands.finaltext.e4 ],
   [ 's_bridge', 's_greater', text.a_outlands.finaltext.e5 ],
   [ 'f_start', 's_exit', text.a_outlands.finaltext.e6 ],
   [ 'f_story1', 'f_puzzle2', text.a_outlands.finaltext.e7 ],
   [ 'f_telescope', 'f_error', text.a_outlands.finaltext.e8 ],
   [ 'f_story2', 'f_corner', text.a_outlands.finaltext.e9 ],
   [ 'a_start', 'f_exit', text.a_outlands.finaltext.e10 ],
   [ 'a_hub5', 'a_hub4', text.a_outlands.finaltext.e11 ],
   [ 'c_courtyard', 'c_pacing', text.a_outlands.finaltext.e12 ],
   [ 'c_courtroom', 'c_elevator2', text.a_outlands.finaltext.e13 ]
];

events.on('teleport-pre', async function (from, to) {
   if (!SAVE.data.b.svr || 16 <= SAVE.data.n.svr_adv || to === from || to === '_void') {
      return;
   }
   SAVE.data.n.svr_adv < 3 && (SAVE.data.n.svr_adv = 3);
   const value = svrtext[SAVE.data.n.svr_adv - 3];
   if (from !== value[0] || to === value[1]) {
      return;
   }
   await dialogue('auto', ...CosmosUtils.provide(value[2]));
   SAVE.data.n.svr_adv < 16 && SAVE.data.n.svr_adv++;
});

events.on('tick', () => {
   game.movement && game.room[0] === 'w' && outlandsScript('tick');
});

events.on('use', async key => {
   switch (key) {
      case 'delta':
         SAVE.data.n.time_delta_add = 300;
         break;
      case 'pie':
      case 'pie2':
      case 'pie3':
      case 'pie4':
      case 'snails':
         if (game.room === 'w_toriel_living' && toriCheck()) {
            const talker = talkerEngine(
               'n1',
               instance('main', 'theOneAndOnlyChairiel')!.object.objects[0] as CosmosAnimation
            );
            await dialogue('auto', ...text.a_outlands[`eat_${key === 'snails' ? 'snails' : 'pie'}`]);
            talker.end();
         }
         break;
      case 'soda':
      case 'steak':
         // {#n1}
         if (
            game.room === 'w_party' &&
            !(
               world.population < 6 ||
               SAVE.data.n.plot > 17 ||
               SAVE.data.b.w_state_catnap ||
               (world.genocide && 16 <= SAVE.data.n.plot)
            )
         ) {
            const talker = talkerEngine(
               'n1',
               objectsByTag(tags => tags.includes('w2_steaksalesman'))[0].objects[0] as CosmosAnimation
            );
            await dialogue('auto', ...text.a_outlands[`eat_${key}`]);
            talker.end();
         }
         break;
      case 'starbertA':
      case 'starbertB':
      case 'starbertC':
         if (!battler.active) {
            sidebarrer.use_movement = false;
            const arr1 = new CosmosSprite({
               scale: { x: -1 },
               anchor: 0,
               position: { x: -80 },
               frames: [ content.ieStarbertArrow ],
               metadata: { activated: false }
            }).on('tick', function () {
               if (view.index > 0) {
                  this.alpha.value = 1;
               } else {
                  this.alpha.value = 0.5;
               }
               if (this.metadata.activated) {
                  this.offsets[0].x > -3 && this.offsets[0].x--;
                  if (this.offsets[0].x === -3) {
                     this.metadata.activated = false;
                  }
               } else if (this.offsets[0].x < 0) {
                  this.offsets[0].x++;
               }
            });
            const arr2 = new CosmosSprite({
               anchor: 0,
               position: { x: 80 },
               frames: [ content.ieStarbertArrow ]
            }).on('tick', function () {
               if (view.index < view.frames.length - 1) {
                  this.alpha.value = 1;
               } else {
                  this.alpha.value = 0.5;
               }
               if (this.metadata.activated) {
                  this.offsets[0].x < 3 && this.offsets[0].x++;
                  if (this.offsets[0].x === 3) {
                     this.metadata.activated = false;
                  }
               } else if (this.offsets[0].x > 0) {
                  this.offsets[0].x--;
               }
            });
            const view = new CosmosAnimation({
               active: key === 'starbertC',
               anchor: 0,
               resources:
                  key === 'starbertA'
                     ? content.ieStarbertA
                     : key === 'starbertB'
                     ? content.ieStarbertB
                     : content.ieStarbertC,
               objects: [
                  ...(key === 'starbertC' ? [] : [ arr1, arr2 ]),
                  ...(key === 'starbertB' && !SAVE.data.b.stargum
                     ? [
                          new CosmosSprite({ anchor: 0, frames: [ content.ieStarbertBGum ] }).on('tick', function () {
                             this.alpha.value = view.index === 0 ? 1 : 0;
                          })
                       ]
                     : [])
               ]
            });
            const overlay = new CosmosObject({
               objects: [
                  new CosmosRectangle({
                     alpha: 0.7,
                     fill: 0,
                     size: { x: 320, y: 240 }
                  }),
                  new CosmosRectangle({
                     fill: 0xffffff,
                     size: { x: 89, y: 206 },
                     position: { x: 160, y: 120 },
                     anchor: 0,
                     objects: [ view ]
                  })
               ]
            });
            renderer.attach('menu', overlay);
            const leftListener = () => {
               if (keys.altKey.active()) {
                  return;
               }
               if (view.index > 0) {
                  arr1.metadata.activated = true;
                  sounds.menu.instance(renderer);
                  view.index--;
               }
            };
            const rightListener = () => {
               if (keys.altKey.active()) {
                  return;
               }
               if (view.index < view.frames.length - 1) {
                  arr2.metadata.activated = true;
                  sounds.menu.instance(renderer);
                  view.index++;
               }
            };
            if (key !== 'starbertC') {
               keys.leftKey.on('down', leftListener);
               keys.rightKey.on('down', rightListener);
            }
            game.movement = false;
            keys.specialKey.on('down').then(async () => {
               if (key !== 'starbertC') {
                  keys.leftKey.off('down', leftListener);
                  keys.rightKey.off('down', rightListener);
               }
               renderer.detach('menu', overlay);
               if (key === 'starbertB' && !SAVE.data.b.stargum) {
                  await dialogue('auto', ...text.a_outlands.stargum1());
                  if (choicer.result === 0) {
                     SAVE.flag.b._heal = true;
                     SAVE.data.b.stargum = true;
                     heal(4);
                     typer.variables.x = '4';
                     if (SAVE.data.n.hp < calcHP()) {
                        await dialogue('auto', ...text.a_outlands.stargum3);
                     } else {
                        await dialogue('auto', ...text.a_outlands.stargum4);
                     }
                  } else {
                     await dialogue('auto', ...text.a_outlands.stargum2);
                  }
               }
               game.movement = true;
            });
         } else if (key === 'starbertB' && !SAVE.data.b.stargum) {
            if (choicer.result === 0) {
               SAVE.flag.b._heal = true;
               SAVE.data.b.stargum = true;
               heal(4);
               typer.variables.x = '4';
               if (SAVE.data.n.hp < calcHP()) {
                  await dialogue('battlerAdvancedText', ...text.a_outlands.stargum3);
               } else {
                  await dialogue('battlerAdvancedText', ...text.a_outlands.stargum4);
               }
            } else {
               await dialogue('battlerAdvancedText', ...text.a_outlands.stargum2);
            }
         }
         break;
   }
});

export const deltasystem = {
   active: false,
   abf: new AdvancedBloomFilter({ bloomScale: 0, threshold: 0, quality: 5, brightness: 1 }),
   wvf: new Filter(shaders.waver.vert, shaders.waver.frag, {
      size: 160,
      phase: 0,
      widthTop: 0,
      widthBottom: 0,
      yoffset: 0
   }),
   zbf: new ZoomBlurFilter({ radius: 500, innerRadius: 0, center: [ 320, 240 ] }),
   get filters () {
      return [ deltasystem.zbf, deltasystem.abf, deltasystem.wvf ];
   }
};

renderer.on('tick', () => {
   if (game.active) {
      if (SAVE.data.n.time_delta_add > 0) {
         SAVE.data.n.time_delta += Math.floor(CosmosMath.bezier(SAVE.data.n.time_delta_add / 300, -1, 3, 3, 3));
         SAVE.data.n.time_delta_add--;
      } else if (SAVE.data.n.time_delta > 0) {
         SAVE.data.n.time_delta--;
      }
      if (SAVE.data.n.time_delta > 0) {
         if (!deltasystem.active) {
            deltasystem.active = true;
            (renderer.filters ??= []).push(...deltasystem.filters);
         }
         const value = Math.min(SAVE.data.n.time_delta / 600, 1);
         deltasystem.abf.bloomScale = value / 5;
         if (value < 0.5) {
            deltasystem.wvf.uniforms.phase = 0;
            deltasystem.wvf.uniforms.widthBottom = 0;
            deltasystem.wvf.uniforms.widthTop = 0;
         } else {
            deltasystem.wvf.uniforms.phase += 0.005;
            deltasystem.wvf.uniforms.widthBottom = (value - 0.5) / 25;
            deltasystem.wvf.uniforms.widthTop = (value - 0.5) / 25;
            deltasystem.wvf.uniforms.yoffset = game.camera.position.clamp(...renderer.region).y * 2;
         }
         deltasystem.zbf.strength = value / 7;
         soundDelay.value = value;
      } else if (deltasystem.active) {
         deltasystem.active = false;
         for (const filter of deltasystem.filters) {
            renderer.filters?.splice(renderer.filters.indexOf(filter), 1);
         }
         deltasystem.wvf.uniforms.phase = 0;
         soundDelay.value = 0;
      }
   }
});

events.on('battle', () =>
   roomReaction({
      w_froggit () {
         roomKills().w_froggit++;
      },
      async w_puzzle4 (x) {
         if (player.position.y < 230) {
            events.fire('tick');
            const n = instance('main', 'w_manana');
            if (n) {
               x();
               await n.talk('n1', talkFinder(), 'auto', ...text.a_outlands.mananaX());
            }
         }
      },
      w_pacing () {
         roomKills().w_pacing++;
      },
      w_junction () {
         roomKills().w_junction++;
      },
      async w_annex (x) {
         const k = roomKills().w_annex++;
         if (k < 2) {
            events.fire('tick');
            const n = instance('main', 'w_afrog');
            if (n) {
               x();
               await n.talk('n1', talkFinder(), 'auto', ...text.a_outlands.afrogX(k));
            }
         }
      }
   })
);

typer.on('header', function (h) {
   switch (h) {
      case 'w.stopThatGoat': {
         const inst = instance('main', 'toriButNotGarb');
         if (inst) {
            inst.object.metadata.stopped = true;
         }
         break;
      }
      case 'w.startThatGoat': {
         const inst = instance('main', 'toriButNotGarb');
         if (inst) {
            inst.object.metadata.stopped = false;
         }
         break;
      }
   }
});

export default {};

CosmosUtils.status(`LOAD MODULE: OUTLANDS AREA (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
