import './bootstrap';

import { BLEND_MODES, Graphics } from 'pixi.js';
import text from '../../languages/default/text/starton';
import systemsText from '../../languages/default/text/systems';
import {
   bullyEnding,
   characters,
   cs_state,
   epilogueOverride,
   faces,
   goatbro,
   goatbroTrue,
   resetBox,
   runEncounter,
   tripper
} from '../common/api';
import commonGroups from '../common/groups';
import { content, inventories, music, musicConvolver, musicFilter, musicRegistry, sounds } from '../systems/assets';
import { atlas, events, game, items, keys, renderer, rng, rooms, speech, typer } from '../systems/core';
import {
   antifreeze,
   autozoom,
   battler,
   calcBonusHP,
   calcHP,
   character,
   choicer,
   dialogue,
   dialogue_primitive,
   dropShake,
   epilogue,
   fader,
   header,
   heal,
   instance,
   instances,
   keyState,
   menuBox,
   notifier,
   oops,
   player,
   postSIGMA,
   quickresume,
   rand_rad,
   roomKills,
   roomReaction,
   saver,
   shake,
   shopper,
   sineWaver,
   talkFinder,
   teleport,
   teleporter,
   temporary,
   tracker,
   trivia,
   ultimaFacer,
   world
} from '../systems/framework';
import { OutertaleShop } from '../systems/outertale';
import { SAVE } from '../systems/save';
import {
   CosmosAnimation,
   CosmosCharacter,
   CosmosDirection,
   CosmosEntity,
   CosmosHitbox,
   CosmosImageUtils,
   CosmosInstance,
   CosmosInventory,
   CosmosKeyed,
   CosmosMath,
   CosmosObject,
   CosmosPoint,
   CosmosPointSimple,
   CosmosRectangle,
   CosmosRegion,
   CosmosSprite,
   CosmosText,
   CosmosUtils,
   CosmosValue
} from '../systems/storyteller';
import { navscript } from './bootstrap';
import { blookGone, dateready, papreal, roomready, trueSpaghettiState } from './extras';
import groups from './groups';
import opponents from './opponents';

export const startonStates = {
   rooms: {} as Partial<CosmosKeyed<CosmosKeyed<any>>>,
   scripts: {} as Partial<CosmosKeyed<CosmosKeyed<any>>>
};

export function aussieregion (roomregion = false) {
   (roomregion ? teleporter : renderer).region = [
      { x: -Infinity, y: SAVE.data.n.state_starton_trashprogress < 2 ? 120 : -Infinity },
      { x: Infinity, y: 120 }
   ];
}

export async function kittytext () {
   const roomState = (startonStates.rooms[game.room] ??= {});
   teleporter.movement = false;
   await renderer.pause(600);
   roomState.kitty ||= 0;
   await dialogue(
      'auto',
      ...[
         text.a_starton.paproom1,
         text.a_starton.paproom2,
         text.a_starton.paproom3,
         text.a_starton.paproom4,
         text.a_starton.paproom5
      ][Math.min(roomState.kitty++, 4)]
   );
   game.movement = true;
}

export function updateJukebox (clear = false) {
   const az = rooms.of('s_grillbys').preload;
   const thing = [ content.amDjbeatLoop, content.amSecretsongLoop, content.amSansboss ][
      SAVE.data.n.state_starton_jukebox - 1
   ];
   if (clear) {
      az.value.splice(az.value.indexOf(thing), 1);
   } else {
      az.value.push(thing);
   }
   return [ az, thing ];
}

export function barmusic (roomState: any) {
   game.music?.stop();
   music.uwa.stop();
   music.reunited.stop();
   const mus = musicRegistry
      .of([ 'djbeatLoop', 'secretsongLoop', 'sansboss' ][SAVE.data.n.state_starton_jukebox - 1])
      .instance(renderer);
   roomState.customs = mus;
   roomState.customsLevel = mus.gain.value;
   mus.gain.value /= 4;
   mus.gain.modulate(renderer, 300, mus.gain.value * 4);
   events.on('teleport-start').then(() => {
      mus.gain.modulate(renderer, 300, 0);
   });
   events.on('teleport').then(() => {
      mus.stop();
      roomState.customsLevel = void 0;
      if (SAVE.data.n.plot === 72 && roomState.customs !== void 0) {
         const ep = epilogue();
         ep.gain.value = 0;
         ep.gain.modulate(renderer, 300, ep.daemon.gain);
      }
      roomState.customs = void 0;
   });
}

export function papyrusOverride () {
   for (const room of rooms.values()) {
      if (room.score.music === 'home') {
         room.score.music = 'papyrus';
         room.score.rate = 0.325;
      }
   }
}

export function set_gen () {
   return world.genocide
      ? [
           [ 'r1', 'c1' ],
           [ 'r1', 'c2' ],
           [ 'r1', 'c3' ],
           [ 'r1', 'c4' ],
           [ 'r2', 'c3' ],
           [ 'r3', 'c2' ],
           [ 'r4', 'c1' ],
           [ 'r4', 'c2' ],
           [ 'r4', 'c3' ],
           [ 'r4', 'c4' ]
        ]
      : world.edgy
      ? [
           [ 'r3', 'c3' ],
           [ 'r3', 'c4' ],
           [ 'r1', 'c3' ],
           [ 'r2', 'c2' ],
           [ 'r3', 'c1' ],
           [ 'r4', 'c2' ]
        ]
      : [
           [ 'r1', 'c3' ],
           [ 'r2', 'c4' ],
           [ 'r3', 'c3' ],
           [ 'r4', 'c2' ],
           [ 'r2', 'c1' ],
           [ 'r2', 'c2' ]
        ];
}

export function sas (position: CosmosPointSimple, plot = 32) {
   if (!world.genocide && SAVE.data.n.plot < plot) {
      return temporary(
         character('sans', characters.sans, position, 'down', {
            size: { x: 25, y: 5 },
            anchor: { x: 0, y: 1 },
            metadata: { interact: true, barrier: true, name: 'starton', args: [ 'sandinter' ] }
         }).on('tick', function () {
            if (SAVE.data.n.plot < plot) {
               if (this.talk) {
                  this.face = ultimaFacer(this);
               } else {
                  this.face = 'down';
               }
            } else {
               renderer.detach('main', this);
            }
         }),
         'main'
      );
   }
}

export async function sansy (
   sand = temporary(
      character('sans', characters.sans, { x: 380, y: 380 }, 'down', {
         anchor: { x: 0, y: 1 },
         size: { x: 25, y: 5 },
         metadata: { name: 'starton', args: [ 'sandinter' ], interact: true, barrier: true, tags: [ 'sansy' ] }
      }),
      'main'
   )
) {
   sand.on('tick', function () {
      if (this.talk && SAVE.data.n.plot < 17.1) {
         this.face = ultimaFacer(this);
      } else {
         this.face = 'down';
      }
   });
}

events.on('teleport-pre', async function (from, to) {
   switch (to) {
      case 's_crossroads': {
         if (SAVE.data.n.plot < 17.1) {
            SAVE.data.n.plot = 17.1;
            if (!world.genocide && !world.edgy) {
               await dialogue('auto', ...text.a_starton.sans10);
            }
         }
         break;
      }
      case 's_town1': {
         if (!world.genocide && (world.edgy ? SAVE.data.n.plot < 30 : instance('main', 'normalsans') !== void 0)) {
            world.edgy || (instance('main', 'normalsans')!.object.metadata.talkrotate = false);
            await dialogue('auto', ...text.a_starton.sansbredgey());
            events.on('teleport').then(() => {
               world.edgy && (SAVE.data.n.plot = 30);
            });
         }
         break;
      }
   }
});

export function unlockPuzzle () {
   const parent = instance('main', 'lasercheckpoint')!.object;
   for (const object of parent.objects) {
      if (object instanceof CosmosAnimation) {
         object.alpha.value = 0;
      } else if (object.metadata.barrier === true) {
         object.metadata.barrier = false;
      }
   }
}

export async function depower () {
   sounds.depower.instance(renderer);
   const field = instance('main', 'lasercheckpoint')!.object.objects.filter(
      object => object instanceof CosmosAnimation
   )[0] as CosmosAnimation;
   await renderer.pause(280);
   field.alpha.value = 0;
   await renderer.pause(420 - 320);
   field.alpha.value = 1;
   await renderer.pause(570 - 420);
   field.alpha.value = 0;
   await renderer.pause(650 - 570);
   field.alpha.value = 1;
   await renderer.pause(720 - 650);
   field.alpha.value = 0;
   unlockPuzzle();
}

export function leap (entity: CosmosEntity, time: number, height: number, destie?: number, inverse?: boolean) {
   return new Promise<CosmosEntity>(async resolve => {
      let spin = true;
      if (typeof destie === 'number') {
         await entity.walk(renderer, 3, { x: inverse ? 285 : 235 });
      }
      const midPoint = entity.position.subtract(inverse ? 27.5 : -27.5, height).value();
      const endPoint = entity.position
         .add(inverse ? -55 - (entity.position.x - 285) : 55 + (235 - entity.position.x), 0)
         .value();
      entity.position.modulate(renderer, time, midPoint, endPoint).then(async () => {
         spin = false;
         if (typeof destie === 'number') {
            await entity.walk(renderer, 3, { x: 340 }, { x: 380, y: 440 }, { x: destie });
            entity.face = 'right';
         }
         resolve(entity);
      });
      while (spin && (inverse ? entity.position.x > endPoint.x : entity.position.x < endPoint.x)) {
         await renderer.pause(
            player.position.y < midPoint.y - 20 ? 133 : player.position.y < midPoint.y - 10 ? 99 : 66
         );
         entity.face = (
            { up: 'left', left: 'down', down: 'right', right: 'up' } as CosmosKeyed<CosmosDirection, CosmosDirection>
         )[entity.face];
      }
   });
}

export function papyrusEmotes (paps: CosmosCharacter) {
   return (header: string) => {
      switch (header) {
         case 'x1':
         case 'p/papyrus':
            paps.preset = characters.papyrus;
            paps.face = 'left';
            paps.talk = true;
            break;
         case 'x2':
            paps.preset = characters.papyrusMad;
            paps.face = 'left';
            paps.talk = true;
            break;
         case 'x3':
            paps.preset = characters.papyrusSpecial;
            paps.face = 'down';
            paps.talk = false;
            paps.sprite.enable();
            speech.targets.delete(paps.sprite);
            break;
         case 'x4':
            paps.preset = characters.papyrusSpecial;
            paps.face = 'left';
            paps.talk = false;
            paps.sprite.enable();
            speech.targets.delete(paps.sprite);
            break;
      }
   };
}

export function treeFN (this: CosmosObject) {
   this.tint = CosmosImageUtils.gradient(
      0x8ea0f1,
      0x172667,
      Math.min(Math.max(Math.abs(renderer.projection(this, game.camera.position).x - 160) / 160, 0), 1)
   );
   const pos = this.position.add(0, this.priority.value < 0 ? 20 : 0);
   if (
      Math.abs(player.position.x - pos.x) < 60 &&
      Math.abs(player.position.y - pos.y) < 60 &&
      pos.extentOf(player) < 50
   ) {
      if (this.alpha.value === 0.8) {
         return;
      } else {
         (this.alpha.value += 0.08) > 0.8 && (this.alpha.value = 0.8);
      }
   } else if (this.alpha.value === 0.4) {
      return;
   } else {
      (this.alpha.value -= 0.08) < 0.4 && (this.alpha.value = 0.4);
   }
   const baseValue = (this.alpha.value - 0.4) / 0.4;
   this.offsets[0].y = CosmosMath.remap(baseValue, 0, -2);
}

export const biorooms = {
   w_alley4: 50 - 50,
   w_bridge: 100 - 50,
   w_exit: 100 - 50,
   s_start: 100 - 50,
   s_sans: 1100 - 50,
   s_crossroads: 1720 - 50,
   s_human: 2040 - 50,
   s_papyrus: 2360 - 50,
   s_doggo: 2680 - 50,
   s_maze: 3180 - 50,
   s_dogs: 3500 - 50,
   s_lesser: 3820 - 50,
   s_spaghetti: 4140 - 50,
   s_bros: 4460 - 50,
   s_puzzle1: 4920 - 50,
   s_puzzle2: 5600 - 50,
   s_jenga: 6100 - 50,
   s_pacing: 6420 - 50,
   s_puzzle3: 6840 - 50,
   s_greater: 7160 - 50,
   s_math: 7190 - 50,
   s_secret: 7200 - 50,
   s_bridge: 7480 - 50,
   s_town1: 8480 - 50,
   s_taxi: 9480 - 50,
   s_town2: 8480 - 50,
   s_battle: 9480 - 50,
   s_exit: 10480 - 50
} as CosmosKeyed<number, string>;

export const biodome = new CosmosSprite({
   anchor: { y: 0 },
   parallax: 1,
   tint: 0x6f6faf,
   frames: [ content.iooSBiodome ],
   priority: -99999
}).on('tick', function () {
   if (game.room in biorooms) {
      const clampedPos = game.camera.position.clamp(...renderer.region);
      this.alpha.value =
         game.room === 'w_alley4' ? 0.5 : game.room === 'w_bridge' ? 2 / 3 : game.room === 'w_exit' ? 5 / 6 : 1;
      this.scale.set(1 / renderer.zoom.value);
      this.position.set(
         this.scale.multiply(CosmosMath.remap(biorooms[game.room] + clampedPos.x, 0, -80, 0, 10640 - 50) - 160, 0)
      );
   } else {
      renderer.detach('below', this);
   }
});

export function noNiceCreamForU () {
   if (
      SAVE.data.b.svr ||
      world.runaway ||
      SAVE.data.n.state_starton_lesserdog === 2 ||
      world.genocide ||
      world.population_area('s') < 6 ||
      world.population_area('f') < 6 ||
      SAVE.data.b.ubershortcut
   ) {
      return true;
   }
   switch (game.room) {
      case 's_lesser':
         return SAVE.data.n.plot > 37;
      case 'f_stand':
         return SAVE.data.n.plot > 59;
      case 'a_hub4':
         return world.population < 2 || (world.badder_lizard && world.population < 6);
   }
   return true;
}

export async function shadowyboi () {
   const sandow = temporary(
      character('sans', characters.sans, { x: (world.genocide ? goatbro : player).position.x + 170, y: 60 }, 'right', {
         tint: 0
      }),
      'main'
   );
   await renderer.pause(200);
   await sandow.walk(renderer, 4, { x: sandow.position.x + 70 });
   renderer.detach('main', sandow);
}

export async function comedy (target: CosmosPointSimple) {
   const start = player.position.clamp(...renderer.region);
   const region = renderer.region;
   renderer.region = [
      { x: -Infinity, y: -Infinity },
      { x: Infinity, y: Infinity }
   ];
   game.camera = new CosmosObject({ position: start });
   await Promise.all([ autozoom(1.8, 266), game.camera.position.modulate(renderer, 266, target) ]);
   sounds.rimshot.instance(renderer);
   await renderer.pause(850);
   await Promise.all([ autozoom(1, 266), game.camera.position.modulate(renderer, 266, start) ]);
   renderer.region = region;
   game.camera = player;
}

export const startonScript = async (subscript: string, ...args: string[]): Promise<any> => {
   const roomState = (startonStates.rooms[game.room] ??= {});
   if (subscript === 'tick') {
      switch (game.room) {
         case 's_start':
            if (roomState.active) {
               return;
            }
            roomState.active = true;
            if (16.1 <= SAVE.data.n.plot) {
               return;
            }
            SAVE.data.n.plot = 16.1;

            const jeebs = music.preshock.instance(renderer);
            jeebs.gain.value = 0;
            jeebs.rate.value = [ 0.73, 0.77, 0.81, 0.85 ][SAVE.data.n.shadowsans];
            jeebs.gain.modulate(renderer, 1000, 1, 1);

            const cancel = () => {
               if (game.room === 'w_exit') {
                  SAVE.data.n.plot = 16;
                  roomState.active = false;
                  jeebs.gain.modulate(renderer, 300, 0).then(() => jeebs.stop());
                  return true;
               } else {
                  return false;
               }
            };

            const walkPromise = (async () => {
               await renderer.when(
                  () => game.room === 'w_exit' || (game.room === 's_start' && player.position.x > 360)
               );
               if (cancel()) {
                  return;
               }
               if (SAVE.data.n.shadowsans < 1) {
                  SAVE.data.n.shadowsans = 1;
                  jeebs.rate.modulate(renderer, 500, 0.77);
                  shadowyboi();
               }
               await renderer.when(
                  () => game.room === 'w_exit' || (game.room === 's_start' && player.position.x > 700)
               );
               if (cancel()) {
                  return;
               }
               if (SAVE.data.n.shadowsans < 2) {
                  SAVE.data.n.shadowsans = 2;
                  jeebs.rate.modulate(renderer, 500, 0.81);
                  shadowyboi();
               }
               await renderer.when(() => game.room === 'w_exit' || game.room === 's_sans');
               if (cancel()) {
                  return;
               }
               if (SAVE.data.n.shadowsans < 3) {
                  SAVE.data.n.shadowsans = 3;
                  jeebs.rate.modulate(renderer, 500, 0.85);
               }
               await renderer.when(
                  () => (game.room === 'w_exit' || (game.room === 's_sans' && player.position.x > 220)) && game.movement
               );
               if (cancel()) {
                  return;
               }
               if (world.genocide) {
                  const sand = character('sans', characters.sans, { x: 40, y: player.position.y }, 'right', {
                     tint: 0
                  });
                  renderer.attach('main', sand);
                  await sand.walk(renderer, 1, { x: 70 });
                  await notifier(sand, false);
                  sand.sprites.right.duration = 15;
                  sand.sprites.right.enable();
                  await sand.position.modulate(renderer, 1e3, sand.position.subtract(10, 0));
                  sand.sprites.right.disable();
                  await renderer.pause(650);
                  await sand.walk(renderer, 4, { x: 35 });
                  renderer.detach('main', sand);
               } else {
                  game.movement = false;
                  player.face = 'right';
                  jeebs.stop();
               }
            })();

            if (world.genocide) {
               const shockLoader = content.amShock.load();
               const stuffAssets = new CosmosInventory(
                  content.asCymbal,
                  content.ibcSansDeath,
                  content.ibcPapyrusBattle,
                  inventories.ibcPapyrusHead,
                  content.ibuBubbleTwinkly,
                  content.asSwing,
                  content.ibuSwing,
                  content.ibuHP,
                  content.ibuIndicator,
                  content.asStrike,
                  content.asGoodbye
               );
               stuffAssets.name = 'stuffAssets';
               const stuffLoader = stuffAssets.load();
               renderer.attach('main', goatbro);
               game.movement = false;
               teleporter.movement = false;
               goatbro.metadata.override = true;
               goatbro.position = new CosmosPoint({ x: 60, y: 60 });
               goatbro.face = 'down';
               await renderer.pause(1150);
               await dialogue('auto', ...text.a_starton.genotext.asriel1());
               await player.walk(renderer, 3, { y: 90 });
               goatbro.walk(renderer, 3, { x: 990 }).then(() => {
                  goatbro.alpha.modulate(renderer, 300, 0);
               });
               await player.walk(renderer, 3, { y: 60 }, { x: 990 });
               await teleport('s_sans', 'right', 20, 400, world);
               const paps = character('papyrus', characters.papyrus, { x: 520, y: 440 }, 'right');
               goatbro.position = player.position.add(21, 0);
               goatbro.alpha.value = 1;
               await Promise.all([ player.walk(renderer, 3, { x: 210 }), goatbro.walk(renderer, 3, { x: 231 }) ]);
               goatbro.face = 'left';
               await renderer.pause(850);
               await dialogue('auto', ...text.a_starton.genotext.asriel2());
               const sand = character('sans', characters.sans, { x: 40, y: player.position.y }, 'right', {
                  tint: 0
               });
               renderer.attach('main', sand);
               sand.walk(renderer, 1, { x: 60 }).then(async () => {
                  await notifier(sand, false);
                  sand.sprites.right.duration = 15;
                  sand.sprites.right.enable();
                  await sand.position.modulate(renderer, 2e3, sand.position.subtract(20, 0));
                  sand.sprites.right.disable();
               });
               await antifreeze([ shockLoader, renderer.pause(550) ]);
               jeebs.stop();
               SAVE.data.n.plot = 17.001;
               await dialogue('auto', ...text.a_starton.genotext.asriel3());
               const jams = music.shock.instance(renderer);
               leap(player, 550, 10, 470);
               await leap(goatbro, 550, 10, 491);
               await antifreeze([ stuffLoader, renderer.pause(750) ]);
               await dialogue('auto', ...text.a_starton.genotext.asriel4);
               await notifier(paps, true, 45);
               paps.face = 'left';
               await dialogue('auto', ...text.a_starton.genotext.asriel5);
               await battler.battlefall(player, { x: 160, y: 160 });
               await battler.simple(async () => {
                  const papyrusTalk = (body: CosmosPointSimple, ...lines: string[]) => {
                     return battler.monster(false, new CosmosPoint(60, 6).add(body), battler.bubbles.twinkly, ...lines);
                  };
                  const sansTalk = (body: CosmosPointSimple, offset = 0, ...lines: string[]) => {
                     return battler.monster(
                        false,
                        new CosmosPoint(25, -77 + offset).add(body),
                        battler.bubbles.twinkly,
                        ...lines
                     );
                  };
                  const papyrus = (speech.emoters.papyrus ??= new CosmosSprite({
                     position: { x: 19, y: 3 },
                     index: 27
                  }).on('tick', function () {
                     const preset = speech.presets.of('papyrus');
                     const sprite = preset.faces![this.index] ?? new CosmosSprite();
                     this.objects[0] = sprite;
                     if (preset === speech.state.preset) {
                        speech.state.face = sprite;
                     }
                  }));
                  const papyrusBody = new CosmosAnimation({
                     active: true,
                     resources: content.ibcPapyrusBattle,
                     position: { x: 130, y: 14 },
                     objects: [ papyrus ],
                     priority: 1
                  });
                  renderer.attach('menu', papyrusBody);
                  await Promise.all([ events.on('battle'), renderer.pause(1250) ]);
                  renderer.detach('menu', papyrusBody);
                  papyrusBody.priority.value = 0;
                  renderer.attach('menu', papyrusBody);
                  await papyrusTalk(papyrusBody, ...text.a_starton.shockpapyrus0a);
                  await renderer.pause(1650);
                  await papyrusTalk(papyrusBody, ...text.a_starton.shockpapyrus0b);
                  await renderer.pause(450);
                  await papyrusTalk(papyrusBody, ...text.a_starton.shockpapyrus0c);
                  await resetBox();
                  atlas.attach(renderer, 'menu', 'battlerAdvancedText');
                  await battler.human(...text.a_starton.shockpapyrus1());
                  if (SAVE.flag.n.ga_asrielPapyrus++ < 1) {
                     await battler.human(
                        ...[
                           text.a_starton.shockpapyrus2a,
                           text.a_starton.shockpapyrus2b,
                           text.a_starton.shockpapyrus2c,
                           text.a_starton.shockpapyrus2d
                        ][choicer.result]
                     );
                  }
                  atlas.detach(renderer, 'menu', 'battlerAdvancedText');
                  jams.gain.value = 0;
                  sounds.swing.instance(renderer);
                  renderer.attach(
                     'menu',
                     new CosmosAnimation({
                        active: true,
                        anchor: { x: 0 },
                        scale: 0.5,
                        tint: 0xff6969,
                        position: papyrusBody.position.add(30, -2.5),
                        resources: content.ibuSwing
                     }).on('tick', function () {
                        if (this.index === 5 && this.step === this.duration - 1) {
                           renderer.detach('menu', this);
                        }
                     })
                  );
                  const fad = fader({ alpha: 0, fill: 0xffffff, priority: 10 });
                  renderer.attach('menu', fad);
                  const cym = sounds.cymbal.instance(renderer, 1.5);
                  cym.gain.value /= 4;
                  cym.gain.modulate(renderer, 2, cym.gain.value * 4);
                  await fad.alpha.modulate(renderer, 3000, 1);
                  fad.fill = 0;
                  cym.stop();
                  sounds.noise.instance(renderer);
                  await renderer.pause(300);
                  papyrus.index = 27;
                  papyrusBody.position.x = 55;
                  renderer.detach('menu', fad);
                  renderer.attach('menu', battler.overlay);
                  sounds.noise.instance(renderer);
                  const volatile = battler.volatile[battler.add(opponents.shocksans, { x: 160, y: 120 })];
                  const sandbox = volatile.container;
                  const sand = sandbox.objects[0];
                  let iteration = 0;
                  while (iteration++ < 7) {
                     if (sand.index === 0) {
                        sand.index = 1;
                     } else {
                        sand.index = 0;
                     }
                     await renderer.pause(100);
                  }
                  sand.index = 2;
                  shake(2, 700);
                  SAVE.flag.n.killed_sans++;
                  await battler.attack(volatile, { power: -21, operation: 'add' }, true, true);
                  await renderer.pause(350);
                  sand.index = 3;
                  sandbox.position.y += 3;
                  await dropShake(sandbox.position);
                  await battler.alpha.modulate(renderer, 850, 0);
                  await renderer.pause(350);
                  await papyrusTalk(papyrusBody, ...text.a_starton.sansDeath1);
                  await sansTalk(sandbox, 4, ...text.a_starton.sansDeath2);
                  sand.index = 4;
                  await renderer.pause(1650);
                  await sansTalk(sandbox, 4, ...text.a_starton.sansDeath3);
                  await renderer.pause(1000);
                  sand.index = 3;
                  await papyrusTalk(papyrusBody, ...text.a_starton.sansDeath4);
                  await renderer.pause(650);
                  sand.index = 5;
                  await renderer.pause(1250);
                  await sansTalk(sandbox, 4, ...text.a_starton.sansDeath5);
                  await renderer.pause(950);
                  sand.index = 6;
                  await renderer.pause(1250);
                  jams.rate.value = 0.25;
                  jams.gain.modulate(renderer, 2e3, jams.daemon.gain, jams.daemon.gain);
                  await sansTalk(sandbox, 4, ...text.a_starton.sansDeath6);
                  await renderer.pause(650);
                  sand.index = 7;
                  await sansTalk(sandbox, 4, ...text.a_starton.sansDeath7);
                  SAVE.data.n.exp += 200;
                  await battler.vaporize(sand);
                  await renderer.pause(350);
                  await papyrusTalk(papyrusBody, ...text.a_starton.sansDeath8);
                  await papyrusBody.position.modulate(renderer, 1350, { x: 100 });
                  await renderer.pause(650);
                  await papyrusBody.position.modulate(renderer, 1000, { x: 420 });
                  battler.overlay.objects = [];
                  renderer.detach('menu', papyrusBody, battler.overlay);
                  await renderer.pause(1000);
                  events.fire('exit');
               });
               atlas.detach(renderer, 'menu', 'battlerSimple');
               renderer.detach('main', paps, sand);
               goatbro.position.set(player.position.x - 21, player.position.y);
               battler.alpha.value = 1;
               await renderer.pause(1350);
               await dialogue('auto', ...text.a_starton.genotext.asriel6());
               for (const f of speech.presets.of('papyrus').faces) {
                  f?.reset();
               }
               goatbro.metadata.override = false;
               tracker.supplant('right');
               stuffAssets.unload();
               game.movement = true;
               while (![ 's_crossroads', 'w_exit' ].includes((await events.on('teleport-start'))[1])) {}
               jams.gain.modulate(renderer, 300, 0).then(() => {
                  jams.stop();
                  content.amShock.unload();
               });
               return;
            }
            await walkPromise;
            if (SAVE.data.n.plot < 16.1) {
               return;
            }

            const sand = temporary(
               character('sans', characters.sans, { x: 50, y: player.position.y }, 'right', {
                  tint: 0,
                  anchor: { x: 0, y: 1 },
                  size: { x: 25, y: 5 },
                  metadata: { name: 'starton', args: [ 'sandinter' ], interact: false, barrier: true }
               }),
               'main'
            );

            const muscleLoader = world.edgy ? void 0 : content.amMuscle.load();
            const papyrusLoader = world.edgy ? void 0 : content.amPapyrus.load();

            const animListener = () => {
               sand.sprite.index % 2 === 1 &&
                  sand.sprite.step === sand.sprite.duration - 1 &&
                  sounds.step.instance(renderer);
            };
            sand.on('tick', animListener);
            await sand.walk(renderer, 1, { x: player.position.x - 23 });
            sand.off('tick', animListener);
            SAVE.data.n.plot = 17.001;
            await dialogue('auto', ...text.a_starton.sans1);
            player.face = 'up';
            await renderer.pause(1e3);
            player.face = 'left';
            await renderer.pause(350);
            sand.alpha.value = 0;
            const handshake = new CosmosAnimation({
               anchor: { y: 1 },
               position: { x: sand.position.x - 8.5, y: player.position.y },
               resources: content.iocSansHandshake
            });
            renderer.attach('main', handshake);
            await renderer.pause(1150);
            player.alpha.value = 0;
            handshake.index = 1;
            sounds.whoopee.instance(renderer);
            await antifreeze([ muscleLoader, renderer.pause(5750) ]);
            renderer.detach('main', handshake);
            sand.tint = void 0;
            player.alpha.value = 1;
            sand.alpha.value = 1;
            const sansMusic = world.edgy ? void 0 : music.muscle.instance(renderer);
            await dialogue('auto', ...text.a_starton.sans2());
            const paps = world.edgy
               ? // sus
                 new CosmosCharacter({ key: 'papyrUS', preset: characters.none })
               : character('papyrus', characters.papyrus, { x: 520, y: 440 }, 'right');
            await Promise.all([ leap(sand, 850, 30, 380), leap(player, 850, 30, 415) ]);
            await renderer.pause(350);
            await dialogue('auto', ...text.a_starton.sans3());
            const ob1_y = 380;
            if (!world.edgy) {
               const ob2_y = 200;
               await player.walk(renderer, 3, { x: 415, y: ob1_y + 3 });
               await renderer.pause(450);
               player.priority.value = ob1_y + 1;
               await player.walk(renderer, 1, { y: ob1_y - 11 });
               await renderer.pause(300);
               sand.face = 'up';
               await renderer.pause(150);
               sounds.equip.instance(renderer).rate.value = 1.25;
               player.position.y -= 15;
               player.anchor.y = 0;
               player.sprite.anchor.y = 0;
               player.position
                  .modulate(
                     renderer,
                     1750,
                     { y: player.position.y },
                     { y: player.position.y },
                     { y: ob2_y + 26 },
                     { y: ob2_y + 26 },
                     { y: ob2_y + 26 }
                  )
                  .then(() => {
                     player.position.y -= 15;
                     player.anchor.y = 1;
                     player.sprite.anchor.y = 1;
                  });
               await renderer.pause(150);
               await player.rotation.modulate(renderer, 1100, 0, 0, 0, 185);
               await player.rotation.modulate(renderer, 250, 185, 178);
               await player.rotation.modulate(renderer, 100, 178, 180);
               sand.face = 'right';
               await sansMusic!.gain.modulate(renderer, 1500, 0);
               sansMusic!.stop();
               content.amMuscle.unload();
               await antifreeze([ papyrusLoader, renderer.pause(850) ]);
               await dialogue('auto', ...text.a_starton.sans4);
               await notifier(paps, true, 45);
               paps.face = 'left';
               const papsMusic = music.papyrus.instance(renderer);
               const listener = papyrusEmotes(paps);
               typer.on('header', listener);
               await Promise.all([ dialogue('auto', ...text.a_starton.sans5) ]);
               sand.preset = characters.sansSpecial;
               sand.face = 'down';
               await comedy(sand);
               sand.preset = characters.sans;
               sand.face = 'right';
               await dialogue('auto', ...text.a_starton.sans6);
               sand.preset = characters.sansSpecial;
               sand.face = 'up';
               await comedy(sand);
               sand.preset = characters.sans;
               sand.face = 'right';
               await dialogue('auto', ...text.a_starton.sans7);
               paps.talk = false;
               await paps.walk(renderer, 4, { x: 540 }, { x: 560, y: 420 }, { x: 590 });
               await renderer.pause(1e3);
               await paps.walk(renderer, 2, { x: 570 });
               await renderer.pause(850);
               await dialogue('auto', ...text.a_starton.sans8);
               paps.talk = false;
               paps.face = 'right';
               papsMusic.gain.modulate(renderer, 500, 0).then(() => {
                  papsMusic.stop();
                  content.amPapyrus.unload();
               });
               await renderer.pause(150);
               await paps.walk(renderer, 4, { x: 600 });
               renderer.detach('main', paps);
               typer.off('header', listener);
               speech.targets.clear();
               await renderer.pause(450);
               await dialogue('auto', ...text.a_starton.sans9);
               sand.face = 'up';
               await renderer.pause(150);
               sounds.equip.instance(renderer).rate.value = 1.25;
               player.position.y += 15;
               player.anchor.y = 0;
               player.sprite.anchor.y = 0;
               player.rotation.modulate(renderer, 1100, 180, 180, 180, -5).then(async () => {
                  await player.rotation.modulate(renderer, 250, -5, 2);
                  await player.rotation.modulate(renderer, 100, 2, 0);
               });
               await renderer.pause(350);
               await player.position.modulate(
                  renderer,
                  1750,
                  { y: player.position.y },
                  { y: player.position.y },
                  { y: ob1_y - 26 },
                  { y: ob1_y - 26 },
                  { y: ob1_y - 26 }
               );
               player.position.y += 15;
               player.anchor.y = 1;
               player.sprite.anchor.y = 1;
            }
            await sand.walk(renderer, 3, { x: 380, y: 380 });
            sand.face = 'down';
            sand.metadata.interact = true;
            if (!world.edgy) {
               await renderer.pause(300);
               await player.walk(renderer, 1, { y: ob1_y + 3 });
               player.priority.value = 0;
            }
            game.movement = true;
            quickresume();
            sansy(sand);
            break;
         case 's_sans':
            if (game.movement && player.metadata.leap) {
               game.movement = false;
               const inverse = player.position.x > 260;
               await leap(player, 850, 30, void 0, inverse);
               player.metadata.trackerbooster = 7;
               player.metadata.leap = false;
               game.movement = true;
            }
            if (player.metadata.reverse) {
               player.priority.value = -player.position.y;
               if (!roomState.reversed) {
                  roomState.reversed = true;
                  for (const object of renderer.layers.main.objects) {
                     object.priority.value = -object.position.y;
                  }
               }
            } else {
               player.priority.value = 0;
               if (roomState.reversed) {
                  roomState.reversed = false;
                  for (const object of renderer.layers.main.objects) {
                     object.priority.value = 0;
                  }
               }
            }
            break;
         case 's_doggo':
            (SAVE.data.b.svr ||
               world.runaway ||
               world.genocide ||
               world.killed0 ||
               roomKills().s_doggo > 1 ||
               SAVE.data.b.s_state_chilldrake ||
               SAVE.data.n.state_starton_doggo === 2) &&
               instance('main', 's_snowdrake')?.destroy();
            break;
         case 's_robot':
            if (!roomState.active) {
               roomState.active = true;
               const inst = instance('main', 's_npc98')?.object;
               if (inst) {
                  inst.on('tick', function () {
                     const anim = inst.objects[0] as CosmosAnimation;
                     switch (SAVE.data.n.state_starton_npc98) {
                        case 0:
                           anim.index = 0;
                           break;
                        case 1:
                        case 4:
                           anim.index = 1;
                           break;
                        case 2:
                        case 3:
                        case 4.1:
                           anim.index = 2;
                           break;
                     }
                  });
               }
            }
            break;
         case 's_spaghetti':
            (world.genocide || SAVE.data.n.plot === 72) && instance('main', 's_spagnote')?.destroy();
            const spag = instance('main', 'spagheddy');
            if (spag && !spag.object.metadata.active) {
               spag.object.metadata.active = true;
               const theEpic = spag.object.objects[0] as CosmosAnimation;
               const baseY = theEpic.position.y;
               if (world.genocide) {
                  theEpic.alpha.value = 0;
               } else if (trueSpaghettiState() < 1) {
                  const time = renderer.time;
                  theEpic.on('tick', () => {
                     if (trueSpaghettiState() > 0) {
                        if (!theEpic.metadata.falling) {
                           theEpic.metadata.falling = true;
                           theEpic.position
                              .modulate(renderer, 450, theEpic.position.value(), theEpic.position.value(), {
                                 x: theEpic.position.x,
                                 y: baseY + 6
                              })
                              .then(async () => {
                                 theEpic.reset();
                                 sounds.landing.instance(renderer);
                                 await shake();
                              });
                           renderer
                              .when(() => trueSpaghettiState() > 1)
                              .then(() => {
                                 theEpic.alpha.value = 0;
                              });
                        }
                     } else {
                        theEpic.position.y = baseY - 2 - CosmosMath.wave(((renderer.time - time) % 3500) / 3500) * 4;
                     }
                  });
               } else if (trueSpaghettiState() < 2) {
                  theEpic.position.set(theEpic.position.x, baseY + 6);
                  theEpic.reset();
                  renderer
                     .when(() => trueSpaghettiState() > 1)
                     .then(() => {
                        theEpic.alpha.value = 0;
                     });
               } else {
                  theEpic.alpha.value = 0;
               }
            }
            break;
         case 's_puzzle3': {
            const p3 = SAVE.data.s.state_starton_s_puzzle3;
            if (p3 || SAVE.data.n.state_starton_s_puzzle3 > 0) {
               function p3activate (tag: string, state: number, tag2?: string) {
                  for (const { object } of instances('main', tag)) {
                     if (!tag2 || (object.metadata.tags as string[]).includes(tag2)) {
                        (object.objects[0] as CosmosAnimation).index = state;
                     }
                  }
               }
               p3 && p3activate(p3, 1);
               if (SAVE.data.n.state_starton_s_puzzle3 > 0) {
                  for (const [ a, b ] of set_gen().slice(0, SAVE.data.n.state_starton_s_puzzle3 as number)) {
                     p3activate(a, 2, b);
                  }
               }
            }
            break;
         }
         case 's_pacing': {
            if (
               SAVE.data.b.svr ||
               world.runaway ||
               epilogueOverride(world.population < 6) ||
               world.genocide ||
               roomKills().s_pacing > 1
            ) {
               instance('main', 's_moonrocks1')?.destroy();
               instance('main', 's_moonrocks2')?.destroy();
            }
            break;
         }
         case 's_greater': {
            (SAVE.data.b.svr ||
               world.runaway ||
               (epilogueOverride(world.population < 6) && !world.bullied) ||
               world.genocide) &&
               instance('main', 's_faun')?.destroy();
            if (!roomState.active) {
               roomState.active = true;
               if (SAVE.data.n.plot < 28) {
                  const lickLoader = content.ionSGreatdogLick.load();
                  await renderer.when(() => game.room === 's_greater' && player.position.x > 180 && game.movement);
                  game.movement = false;
                  game.music?.stop();
                  player.face = 'right';
                  const greatdog = new CosmosAnimation({
                     anchor: { x: 0, y: 1 },
                     position: { x: 400, y: player.position.y },
                     priority: player.position.y - 1,
                     resources: content.ionSGreatdog
                  }).on('tick', function () {
                     if (
                        this.resources === content.ionSGreatdog &&
                        this.index % 2 === 1 &&
                        this.step === this.duration - 1
                     ) {
                        sounds.stomp.instance(renderer).rate.value = 1 / 1.4;
                     }
                  });
                  renderer.attach('main', greatdog);
                  greatdog.enable();
                  while ((greatdog.position.x -= 2) > 290) {
                     await renderer.on('tick');
                  }
                  greatdog.reset();
                  await notifier(greatdog, true, 54);
                  greatdog.enable();
                  const d = player.position.x + 40;
                  while ((greatdog.position.x -= 4) > d) {
                     await renderer.on('tick');
                  }
                  greatdog.position.x = d;
                  greatdog.reset();
                  game.music = null;
                  game.movement = true;
                  await battler.encounter(player, groups.greatdog, false);
                  if (battler.encounter_state.movement) {
                     game.movement = false;
                  }
                  SAVE.data.n.plot = 28;
                  if (SAVE.data.n.state_starton_greatdog < 1) {
                     await antifreeze([ lickLoader, renderer.pause(450) ]);
                     greatdog.resources = content.ionSGreatdogLick;
                     greatdog.enable();
                     await renderer.when(() => greatdog.index === 29);
                     greatdog.disable();
                     await renderer.pause(650);
                     greatdog.resources = content.ionSGreatdog;
                     greatdog.reset();
                     greatdog.anchor.x = 0;
                  }
                  content.ionSGreatdogLick.unload();
                  if (SAVE.data.n.state_starton_greatdog !== 2) {
                     await renderer.pause(350);
                     greatdog.scale.x = -1;
                     await renderer.pause(1150);
                     greatdog.enable();
                     while ((greatdog.position.x += 3) < 400) {
                        await renderer.on('tick');
                     }
                  }
                  renderer.detach('main', greatdog);
                  if (world.genocide) {
                     goatbro.metadata.override = true;
                     goatbro.position.set(player.position.add(42, 0));
                     goatbro.face = 'left';
                     await renderer.pause(600);
                     await dialogue('auto', ...text.a_starton.genotext.asriel26());
                     goatbro.walk(renderer, 3, { x: 310 }).then(async () => {
                        await goatbro.alpha.modulate(renderer, 300, 0);
                     });
                     player.walk(renderer, 3, { x: 310 }).then(async () => {
                        await teleport('s_bridge', 'right', 20, 60, world);
                        startonScript('tick');
                     });
                  } else {
                     if (world.killed5) {
                        while (world.population > 0) {
                           world.bully();
                           SAVE.data.n.evac_starton++;
                        }
                     }
                     if (!SAVE.data.b.oops) {
                        if (
                           SAVE.data.n.state_starton_doggo !== 1 ||
                           SAVE.data.n.state_starton_lesserdog !== 1 ||
                           SAVE.data.n.state_starton_dogs !== 1 ||
                           SAVE.data.n.state_starton_greatdog !== 1
                        ) {
                           if (SAVE.data.n.state_starton_greatdog === 3) {
                              await dialogue('auto', ...text.a_starton.truetext.great3);
                           } else {
                              if (SAVE.data.n.state_starton_greatdog === 0) {
                                 await dialogue('auto', ...text.a_starton.truetext.great1);
                              } else {
                                 await dialogue('auto', ...text.a_starton.truetext.fetch());
                              }
                           }
                        } else {
                           await dialogue('auto', ...text.a_starton.truetext.great2);
                        }
                     }
                     if (battler.encounter_state.movement) {
                        game.movement = true;
                     }
                     if (SAVE.data.n.state_starton_greatdog === 2) {
                        quickresume(true);
                     } else {
                        quickresume();
                     }
                     SAVE.data.n.evac_starton > 0 && (await dialogue('auto', ...text.a_starton.evac));
                  }
               }
            }
            break;
         }
         case 's_bridge': {
            if (!roomState.active) {
               roomState.active = true;
               if (SAVE.data.n.plot < 30) {
                  if (world.genocide) {
                     const papyrusLoader = content.amPapyrus.load();
                     const impactLoader = content.asImpact.load();
                     renderer.on('tick').then(() => {
                        goatbro.alpha.modulate(renderer, 0, 1);
                     });
                     goatbro.position = player.position.add(21, 0);
                     await Promise.all([
                        goatbro.walk(renderer, 3, { x: 680 }),
                        player.walk(renderer, 3, { x: 660 }),
                        papyrusLoader
                     ]);
                     const paps = new CosmosCharacter({
                        preset: characters.papyrusStark,
                        key: 'papyrus',
                        face: 'left',
                        position: { x: 925, y: player.position.y }
                     });
                     renderer.attach('main', paps);
                     await renderer.pause(650);
                     goatbro.face = 'right';
                     const cam = new CosmosObject({ position: player.position });
                     game.camera = cam;
                     await cam.position.modulate(renderer, 1350, { x: 790, y: player.position.y });
                     const papsMusic = music.papyrus.instance(renderer);
                     papsMusic.rate.value = 0.325;
                     await renderer.pause(1250);
                     await dialogue('auto', ...text.a_starton.genotext.papyrusSolo4a);
                     const trueGain = papsMusic.gain.value;
                     await papsMusic.gain.modulate(renderer, 1000, 0);
                     await antifreeze([ impactLoader, renderer.pause(1000) ]);
                     const impact = sounds.impact.instance(renderer);
                     impact.rate.value = 1 / 3;
                     renderer.pause(133).then(async () => {
                        sounds.notify.instance(renderer).gain.value /= 1.5;
                        await notifier(paps, false, 45);
                        paps.sprites.left.duration = 15;
                        paps.sprites.left.enable();
                        await paps.position.modulate(renderer, 500, paps.position.add(5, 0));
                        paps.sprites.left.reset();
                     });
                     await dialogue('auto', ...text.a_starton.genotext.papyrusSolo4b);
                     paps.face = 'right';
                     await renderer.pause(650);
                     await dialogue('auto', ...text.a_starton.genotext.papyrusSolo4c);
                     await renderer.pause(850);
                     paps.preset = characters.papyrusMad;
                     await renderer.pause(350);
                     paps.face = 'left';
                     await dialogue('auto', ...text.a_starton.genotext.papyrusSolo4d);
                     await renderer.pause(850);
                     await dialogue('auto', ...text.a_starton.genotext.papyrusSolo4e);
                     papsMusic.rate.value = 0.65;
                     papsMusic.gain.value = trueGain;
                     await renderer.pause(650);
                     await dialogue('auto', ...text.a_starton.genotext.papyrusSolo4f);
                     papsMusic.gain.modulate(renderer, 300, 0).then(() => {
                        papsMusic.stop();
                        content.amPapyrus.unload();
                        content.asImpact.unload();
                     });
                     await paps.walk(renderer, 4, { x: 990 });
                     await paps.alpha.modulate(renderer, 300, 0);
                     renderer.detach('main', paps);
                     await renderer.pause(350);
                     await cam.position.modulate(renderer, 1350, player.position);
                     game.camera = player;
                     await renderer.pause(850);
                     player.walk(renderer, 3, { x: 990 - 21 });
                     await goatbro.walk(renderer, 3, { x: 990 });
                     while (world.population > 0) {
                        world.bully();
                        SAVE.data.n.evac_starton++;
                     }
                     await teleport('s_town1', 'right', 20, 150, world);
                     startonScript('tick');
                  } else if (!world.edgy) {
                     const papyrusLoader = content.amPapyrus.load();
                     await Promise.all([
                        renderer
                           .when(() => game.room === 's_bridge' && player.position.x > 670 && game.movement)
                           .then(() => {
                              game.movement = false;
                           }),
                        papyrusLoader
                     ]);
                     SAVE.data.n.plot = 30;
                     const sand = new CosmosCharacter({
                        preset: characters.sans,
                        key: 'sans',
                        face: 'left',
                        position: { x: 925, y: 35 },
                        anchor: { x: 0, y: 1 },
                        size: { x: 25, y: 5 },
                        metadata: {
                           interact: true,
                           barrier: true,
                           name: 'starton',
                           args: [ 'sandinter' ],
                           tags: [ 'normalsans' ],
                           talkrotate: true
                        }
                     });
                     const paps = new CosmosCharacter({
                        preset: characters.papyrus,
                        key: 'papyrus',
                        face: 'left',
                        position: { x: 925, y: 95 }
                     });
                     renderer.attach('main', sand, paps);
                     await renderer.pause(650);
                     const cam = new CosmosObject({ position: player.position });
                     game.camera = cam;
                     await cam.position.modulate(renderer, 1350, { x: 790, y: player.position.y });
                     const papsMusic = music.papyrus.instance(renderer);
                     await renderer.pause(1250);
                     await dialogue('auto', ...text.a_starton.papyrus10);
                     const extent = new CosmosValue();
                     const gauntlet = new CosmosObject({
                        position: { x: 790 },
                        objects: [
                           new CosmosObject({
                              objects: [
                                 new CosmosSprite({
                                    position: { x: -90 },
                                    anchor: { x: 0, y: 1 },
                                    parallax: { y: -0.75 },
                                    frames: [ content.iooSGauntletTesla ]
                                 }),
                                 new CosmosSprite({
                                    anchor: { x: 0, y: 1 },
                                    scale: { y: 1 },
                                    parallax: { y: -0.25 },
                                    frames: [ content.iooSGauntletCollarsword ]
                                 }),
                                 new CosmosAnimation({
                                    active: true,
                                    position: { x: 90 },
                                    anchor: { x: 0, y: 1 },
                                    parallax: { y: -0.5 },
                                    resources: content.iooSGauntletDog
                                 })
                              ]
                           }).on('tick', function () {
                              this.position.y = -60 + extent.value;
                           }),
                           new CosmosObject({
                              objects: [
                                 new CosmosSprite({
                                    position: { x: -90 },
                                    anchor: { x: 0, y: 1 },
                                    scale: { y: -1 },
                                    parallax: { y: 0.75 },
                                    frames: [ content.iooSGauntletTesla ]
                                 }),
                                 new CosmosAnimation({
                                    active: true,
                                    anchor: { x: 0 },
                                    resources: content.iooSGauntletFire
                                 }),
                                 new CosmosSprite({
                                    position: { x: 75 },
                                    anchor: { x: 0 },
                                    rotation: -22.5,
                                    parallax: { y: 0.5 },
                                    frames: [ content.iooSGauntletBlaster ]
                                 })
                              ]
                           }).on('tick', function () {
                              this.position.y = 180 - extent.value;
                           })
                        ]
                     });
                     renderer.attach('main', gauntlet);
                     await extent.modulate(renderer, 2e3, 85);
                     await renderer.pause(850);
                     await dialogue('auto', ...text.a_starton.papyrus11);
                     await renderer.pause(3850);
                     sand.face = 'down';
                     paps.face = 'up';
                     await dialogue('auto', ...text.a_starton.papyrus12);
                     sand.face = 'left';
                     paps.face = 'left';
                     await renderer.pause(3850);
                     sand.face = 'down';
                     paps.face = 'up';
                     await dialogue('auto', ...text.a_starton.papyrus13);
                     sand.face = 'left';
                     paps.face = 'left';
                     await extent.modulate(renderer, 2e3, 0);
                     renderer.detach('main', gauntlet);
                     paps.face = 'right';
                     await renderer.pause(650);
                     await notifier(paps, true, 45);
                     paps.face = 'left';
                     await dialogue('auto', ...text.a_starton.papyrus14);
                     papsMusic.gain.modulate(renderer, 650, 0).then(() => {
                        papsMusic.stop();
                        content.amPapyrus.unload();
                     });
                     paps.walk(renderer, 4, { x: 990 }).then(async () => {
                        await paps.alpha.modulate(renderer, 300, 0);
                        renderer.detach('main', paps);
                     });
                     sand.walk(renderer, 3, { y: 20 }).then(() => {
                        sand.face = 'down';
                        sand.on('tick', function () {
                           if (this.talk && this.metadata.talkrotate) {
                              this.face = ultimaFacer(this);
                           } else {
                              this.face = 'down';
                           }
                        });
                     });
                     events.on('teleport').then(() => {
                        renderer.detach('main', sand);
                     });
                     await cam.position.modulate(renderer, 1350, player.position);
                     game.camera = player;
                     if (!SAVE.data.b.oops) {
                        await dialogue('auto', ...text.a_starton.truetext.sans9);
                     }
                     game.movement = true;
                  }
               }
            }
            break;
         }
         case 's_backrooms': {
            if (
               SAVE.data.n.state_starton_lesserdog === 2 ||
               world.population === 0 ||
               SAVE.data.b.svr ||
               world.runaway
            ) {
               const lesser = instance('main', 'lesser');
               if (lesser && !lesser.object.metadata.active) {
                  lesser.object.metadata.active = true;
                  for (const object of lesser.object.objects) {
                     if (object instanceof CosmosAnimation) {
                        object.index = 1;
                        break;
                     }
                  }
               }
            }
            break;
         }
         case 's_town2': {
            const bbox = instance('main', 'bbox');
            bbox && (bbox.index = 10);
            const bloc = instance('main', 'housebloc')?.object;
            if (bloc && !bloc.metadata.active) {
               bloc.metadata.active = true;
               for (const object of bloc.objects) {
                  if (object.metadata.barrier) {
                     object.metadata.bloc = true;
                  } else if (object.metadata.trigger) {
                     object.on('tick', function () {
                        if (SAVE.data.n.plot < 31 || world.dead_skeleton) {
                           if (this.metadata.trigger) {
                              object.metadata.barrier = true;
                              object.metadata.interact = true;
                              object.metadata.trigger = false;
                              object.metadata.name = 'starton';
                              object.metadata.args = [ 'housebloc' ];
                           }
                        } else if (!this.metadata.trigger) {
                           object.metadata.barrier = false;
                           object.metadata.interact = false;
                           object.metadata.trigger = true;
                           object.metadata.name = 'starton';
                           object.metadata.args = [ 'bonehouse' ];
                        }
                     });
                  }
               }
            }
            if (world.population < 2 || SAVE.data.b.svr || world.runaway) {
               instance('main', 't_icewolf')?.destroy();
            }
            if (epilogueOverride(world.population < 2) || SAVE.data.b.svr || world.runaway) {
               instance('main', 't_loverboy')?.destroy();
            }
            if (
               !roomState.papdater &&
               31 <= SAVE.data.n.plot &&
               SAVE.data.n.plot_date < 0.1 &&
               SAVE.data.n.state_starton_papyrus !== 1 &&
               SAVE.data.n.plot < 71.2
            ) {
               roomState.papdater = true;
               renderer.attach(
                  'main',
                  (roomState.paps = new CosmosCharacter({
                     preset: characters.papyrus,
                     key: 'papyrus',
                     position: { x: 575, y: 205 },
                     size: { x: 20, y: 5 },
                     anchor: { x: 0, y: 1 },
                     metadata: {
                        name: 'starton',
                        args: [ 'papdate' ],
                        barrier: true,
                        interact: true,
                        override: void 0 as boolean | void
                     },
                     face: 'down'
                  }).on('tick', function () {
                     if (!this.metadata.override) {
                        if (game.room !== 's_town2') {
                           renderer.detach('main', this);
                           roomState.papdater = false;
                        } else if (this.talk) {
                           this.face = ultimaFacer(this);
                        } else {
                           this.face = 'down';
                        }
                     }
                  }))
               );
            }
            if (31 <= SAVE.data.n.plot || (!world.genocide && world.population > 0)) {
               instance('main', 's_genokid')?.destroy();
            }
         }
         case 's_town1': {
            if (game.room === 's_town1') {
               if (world.population < 6 || SAVE.data.b.svr || world.runaway) {
                  instance('main', 't_rabbit')?.destroy();
                  instance('main', 't_bunny')?.destroy();
                  instance('main', 't_politics')?.destroy();
                  instance('main', 't_imafraidjumitebeinagang')?.destroy();
               }
               if (epilogueOverride(world.population < 4) || SAVE.data.b.svr || world.runaway) {
                  instance('main', 't_kabakk')?.destroy();
                  instance('main', 't_zorren')?.destroy();
               }
               if (epilogueOverride(world.population < 2) || SAVE.data.b.svr || world.runaway) {
                  instance('main', 't_smileguy')?.destroy();
                  instance('main', 't_wisconsin')?.destroy();
               }
               if (!roomState.active) {
                  roomState.active = true;
                  if (SAVE.data.n.plot < 30) {
                     SAVE.data.n.plot = 30;
                     if (world.genocide) {
                        goatbro.position = player.position.add(21, 0);
                        goatbro.face = 'left';
                        await renderer.pause(1050);
                        await dialogue('auto', ...text.a_starton.genotext.asriel28());
                        const ob1 = instance('main', 'teleportpad')!.object;
                        await goatbro.walk(renderer, 3, { x: ob1.position.x }, { y: ob1.position.y + 3 });
                        goatbro.priority.value = ob1.position.y + 1;
                        await renderer.pause(450);
                        await goatbro.walk(renderer, 1, { y: ob1.position.y - 11 });
                        await renderer.pause(300);
                        sounds.phase.instance(renderer);
                        goatbro.scale.modulate(renderer, 125, { x: 1.05, y: 1 }).then(() => {
                           goatbro.scale.modulate(renderer, 50, { x: 0, y: 1 });
                        });
                        await goatbro.alpha.modulate(renderer, 100, 0.8);
                        goatbro.alpha.value = 0;
                        await renderer.pause(40);
                        goatbro.alpha.value = 1;
                        await renderer.pause(35);
                        renderer.detach('main', goatbro);
                        goatbro.priority.value = 0;
                        goatbro.scale.set(1);
                        game.movement = true;
                        SAVE.data.n.evac_starton > 0 && (await dialogue('auto', ...text.a_starton.evac));
                     }
                  } else if (SAVE.data.n.plot !== 30 && world.genocide) {
                     renderer.attach('main', goatbro);
                  }
               }
            }
            break;
         }
         case 's_librarby':
            if (world.population < 6 || SAVE.data.b.svr || world.runaway) {
               instance('main', 'l_cupjake')?.destroy();
            }
            if (world.population < 4 || SAVE.data.b.svr || world.runaway) {
               instance('main', 'l_kakurolady')?.destroy();
            }
            if (epilogueOverride(world.population === 0) || SAVE.data.b.svr || world.runaway) {
               instance('main', 'l_librarian')?.destroy();
            }
            if (world.population === 0 || SAVE.data.b.svr || world.runaway) {
               instance('main', 'l_sweetie')?.destroy();
            }
            break;
         case 's_capture':
            (world.genocide || SAVE.data.n.state_papyrus_capture > 3) && instance('main', 's_trapnote')?.destroy();
            break;
         case 's_taxi': {
            (world.genocide || SAVE.data.b.svr || world.runaway) && (instance('main', 's_vegetoid')!.index = 3);
            break;
         }
      }
   } else {
      const scriptState = startonStates.scripts[subscript] || (startonStates.scripts[subscript] = {});
      switch (subscript) {
         case 'telescope': {
            if (!game.movement) {
               break;
            }
            game.movement = false;
            await dialogue('auto', ...text.a_starton.telescope1());
            if (choicer.result === 0) {
               let x = 0;
               let y = 0;
               SAVE.data.b.s_state_telescope = true;
               const view = new CosmosSprite({ anchor: 0, frames: [ content.ieTelescope ], scale: 0.5 });
               const graphik = new Graphics();
               const s2 = 1920 / 4;
               const rx = s2 - 160;
               const ry = s2 - 120;
               const w = 80;
               const h = 64;
               const recto = new CosmosObject({
                  position: { x: 160, y: 120 },
                  objects: [ view ]
               }).on('tick', () => {
                  const realX = Math.min(Math.max(x, -rx), rx);
                  const realY = Math.min(Math.max(y, -ry), ry);
                  view.position.set(-realX, -realY);
                  graphik
                     .clear()
                     .beginFill(0x000000, 1)
                     .drawRect(-160 - w, -120 - h, 320 + w * 2, 240 + h * 2)
                     .endFill()
                     .beginHole()
                     .drawEllipse(x - realX, y - realY, w, h)
                     .endHole();
               });
               recto.container.addChild(graphik);
               renderer.attach('menu', recto);
               await renderer.pause(500);
               const keyListener = () => {
                  x = Math.min(Math.max(x + (keyState.left ? -4 : 0) + (keyState.right ? 4 : 0), -s2), s2);
                  y = Math.min(Math.max(y + (keyState.up ? -4 : 0) + (keyState.down ? 4 : 0), -s2), s2);
               };
               renderer.on('tick', keyListener);
               await keys.specialKey.on('down');
               renderer.detach('menu', recto);
               renderer.off('tick', keyListener);
               if (!SAVE.data.b.voucher && SAVE.data.n.plot < 31 && !world.genocide && world.population > 0) {
                  SAVE.data.b.voucher = true;
                  await renderer.pause(1000);
                  const mk = character('kidd', characters.kidd, { x: -20, y: 90 }, 'right');
                  await mk.walk(renderer, 4, { x: player.position.x - 18 });
                  await tripper(mk);
                  await dialogue('auto', ...text.a_starton.telescopeMeetup1);
                  player.face = 'down';
                  await mk.walk(renderer, 4, { y: player.position.y + 20 });
                  await dialogue('auto', ...text.a_starton.telescopeMeetup2);
                  mk.face = 'left';
                  await renderer.pause(1650);
                  mk.face = 'up';
                  await dialogue('auto', ...text.a_starton.telescopeMeetup3);
                  await renderer.pause(1250);
                  await dialogue('auto', ...text.a_starton.telescopeMeetup4);
                  await mk.walk(renderer, 4, { x: 30 });
                  await renderer.pause(650);
                  mk.face = 'right';
                  await renderer.pause(850);
                  await dialogue('auto', ...text.a_starton.telescopeMeetup5);
                  await renderer.pause(1250);
                  Promise.race([
                     mk.walk(renderer, 4, { x: 10 }).then(() => mk.alpha.modulate(renderer, 300, 0)),
                     events.on('teleport')
                  ]).then(() => {
                     renderer.detach('main', mk);
                  });
               } else {
                  await renderer.pause(500);
               }
               world.darker || (await dialogue('auto', ...text.a_starton.telescope2()));
            }
            game.movement = true;
            break;
         }
         case 'lesserdog': {
            if (!game.movement || 20.2 <= SAVE.data.n.plot) {
               break;
            }
            game.movement = false;
            game.music?.stop();
            const hed = new CosmosSprite({
               anchor: { x: 0, y: 1 },
               position: { y: -19 },
               frames: [ content.iooSExteriorLesserHead ]
            });
            const obj = new CosmosObject({
               alpha: 0,
               position: { x: player.position.x + 30, y: player.position.y },
               objects: [
                  hed,
                  new CosmosSprite({
                     anchor: { x: 0, y: 1 },
                     frames: [ content.iooSExteriorLesser ]
                  })
               ]
            });
            await renderer.pause(600);
            renderer.attach('main', obj);
            sounds.appear.instance(renderer);
            await obj.alpha.modulate(renderer, 300, 1);
            await renderer.pause(900);
            game.music = null;
            await battler.encounter(player, groups.lesserdog);
            if (SAVE.data.n.state_starton_lesserdog === 2) {
               renderer.detach('main', obj);
               const inst = instance('main', 's_nicecream');
               if (inst) {
                  const guyanim = inst.object.objects[0] as CosmosAnimation;
                  guyanim.use(content.ionSNicecream);
                  instance('below', 'xtrabarrier')?.destroy();
               }
            } else {
               const mercymod = Math.min(Math.max(battler.volatile[0].vars.mercymod, 0), 2700);
               hed.position.y -= mercymod / 2;
               obj.attach(
                  new CosmosSprite({
                     anchor: { x: 0, y: 1 },
                     position: { y: -19 },
                     scale: { y: mercymod / 2 },
                     frames: [ content.iooSExteriorLesserNeck ],
                     priority: -1
                  })
               );
               const cp = player.position.clamp(...renderer.region);
               const vh = cp.y + hed.position.y;
               if (50 <= mercymod && renderer.projection(hed, game.camera.position).y <= 80) {
                  const inst = instance('main', 's_nicecream');
                  const guyanim = inst?.object.objects[0] as CosmosAnimation | void;
                  const resources = guyanim?.resources;
                  const noanim = noNiceCreamForU() || resources === content.ionSNicecreamHappi;
                  noanim || guyanim?.use(content.ionSNicecreamCurious);
                  await renderer.pause(1000);
                  const OGregion = renderer.region[0].y;
                  renderer.region[0].y = -Infinity;
                  const cam = new CosmosObject({ position: cp });
                  game.camera = cam;
                  await cam.position.modulate(renderer, mercymod * 2, { y: vh });
                  await renderer.pause(900);
                  sounds.appear.instance(renderer);
                  await obj.alpha.modulate(renderer, 300, 0);
                  renderer.detach('main', obj);
                  noanim || guyanim?.use(resources!);
                  await renderer.pause(900);
                  cam.position.y = Math.max(cam.position.y, -180);
                  await cam.position.modulate(renderer, 1800, { y: cp.y });
                  game.camera = player;
                  renderer.region[0].y = OGregion;
               } else {
                  await renderer.pause(900);
                  sounds.appear.instance(renderer);
                  await obj.alpha.modulate(renderer, 300, 0);
                  renderer.detach('main', obj);
                  await renderer.pause(600);
               }
            }
            SAVE.data.n.plot = 20.2;
            if (!SAVE.data.b.oops) {
               if (SAVE.data.n.state_starton_doggo < 1 || SAVE.data.n.state_starton_lesserdog < 1) {
                  if (SAVE.data.n.state_starton_lesserdog === 0) {
                     await dialogue('auto', ...text.a_starton.truetext.lesser1);
                  } else {
                     await dialogue('auto', ...text.a_starton.truetext.fetch());
                  }
               } else {
                  await dialogue('auto', ...text.a_starton.truetext.lesser2);
               }
            }
            game.movement = true;
            if (SAVE.data.n.state_starton_lesserdog === 2) {
               quickresume(true);
            } else {
               quickresume();
            }
            break;
         }
         case 'sansdoor': {
            if (!game.movement) {
               return;
            }
            game.movement = false;
            if (SAVE.data.b.skeleton_key && !SAVE.data.b.svr && !world.runaway) {
               if (!SAVE.data.b.s_state_sansdoor) {
                  SAVE.data.b.s_state_sansdoor = true;
                  await dialogue('auto', ...text.a_starton.sansdoor2);
               }
               await teleport('s_sansroom', 'up', 140, 230, world);
               sounds.doorClose.instance(renderer);
            } else {
               await dialogue('auto', ...text.a_starton.sansdoor1());
               player.position.y += 3;
               player.face = 'down';
            }
            game.movement = true;
            break;
         }
         case 'sanscabinet': {
            if (SAVE.data.b.s_state_pendingsword) {
               await dialogue('auto', ...text.a_starton.sanscab3());
               if (SAVE.storage.inventory.size < 8) {
                  SAVE.data.b.s_state_pendingsword = false;
                  saver.add('corndog_sword');
               }
            } else if (!SAVE.data.b.inverter_key) {
               SAVE.data.b.inverter_key = true;
               await dialogue('auto', ...text.a_starton.sanscab1());
            } else {
               await dialogue('auto', ...text.a_starton.sanscab2());
            }
            break;
         }
         case 'sansbed': {
            if (!game.movement) {
               return;
            }
            game.movement = false;
            const fd = fader();
            await fd.alpha.modulate(renderer, 1000, 1);
            player.position.set(222.5, 105);
            player.face = 'down';
            await renderer.pause(1000);
            await fd.alpha.modulate(renderer, 1000, 0);
            await renderer.pause(2000);
            await fd.alpha.modulate(renderer, 1000, 1);
            SAVE.data.n.hp = Math.max(SAVE.data.n.hp, Math.min(calcHP() + calcBonusHP(), 99));
            player.position.x = 196;
            player.face = 'left';
            if (!SAVE.data.b.amogus) {
               SAVE.data.b.amogus = true;
               instance('below', 'yousleptinthebed')!.object.alpha.value = 1;
            }
            await renderer.pause(2000);
            fd.alpha.modulate(renderer, 300, 0).then(() => {
               renderer.detach('menu', fd);
            });
            game.movement = true;
            break;
         }
         case 'onlyinaustralia': {
            await dialogue('auto', ...text.a_starton.aussie());
            break;
         }
         case 'trashhunt': {
            if (!game.movement || 2 <= SAVE.data.n.state_starton_trashprogress) {
               break;
            }
            game.movement = false;
            game.music?.stop();
            SAVE.data.n.state_starton_trashprogress = 2;
            const sansbossAssets = new CosmosInventory(content.asLightningstrike, content.asBoom, content.amSansboss);
            sansbossAssets.name = 'sansbossAssets';
            const sansbossLoader = sansbossAssets.load();
            await renderer.pause(1000);
            let tc = 0;
            const b160 = new CosmosPoint(160);
            const ppos = { x: player.position.x, y: -120 };
            const pshk = new CosmosValue();
            const trashballs = CosmosUtils.populate(40, index => {
               return new CosmosSprite({
                  anchor: 0,
                  frames: [ content.iooSTrashball ],
                  metadata: { time: index / 40, pitch: Math.random(), yaw: Math.random() * 360, xoffs: 0 },
                  spin: 4,
                  rotation: Math.random() * 360
               }).on('tick', function () {
                  if (tc > index && (this.alpha.value -= 1 / 30) <= 0) {
                     this.alpha.value = 0;
                     planetoid.detach(this);
                     return;
                  }
                  this.metadata.time += 1 / (60 - tc);
                  const sin = CosmosMath.wave(this.metadata.time) * 2 - 1;
                  const cos = CosmosMath.wave(this.metadata.time + 0.25) * 2 - 1;
                  const z = 160 * cos * (1 - this.metadata.pitch);
                  this.scale.set(160 / (z + 320));
                  this.position.set(
                     b160
                        .multiply(sin, cos * this.metadata.pitch)
                        .shift(this.metadata.yaw)
                        .add(this.metadata.xoffs, 0)
                        .multiply(this.scale)
                  );
                  this.priority.value = -z;
                  this.tint = CosmosImageUtils.gradient(0xffffff, 0, ((z + 160) / 320) * 0.75);
                  this.metadata.xoffs /= 1.5;
               });
            });
            const planetoid = new CosmosObject({
               objects: [
                  new CosmosAnimation({
                     active: true,
                     anchor: 0,
                     resources: content.iooToby6,
                     spin: -4,
                     metadata: { radiation: 0 }
                  }).on('tick', function () {
                     this.alpha.value = 1 - tc / 40;
                     if (this.alpha.value > 0 && ++this.metadata.radiation === 60 + tc * 1.5) {
                        this.metadata.radiation = 0;
                        planetoid.attach(
                           new CosmosAnimation({
                              anchor: 0,
                              resources: content.iooToby6,
                              alpha: this.alpha.value,
                              spin: this.spin.value,
                              rotation: this.rotation.value,
                              priority: 0.001
                           }).on('tick', function () {
                              this.scale.set(this.scale.multiply(1 / 0.975));
                              if ((this.alpha.value *= 0.9) < 0.01) {
                                 planetoid.detach(this);
                              }
                           })
                        );
                     }
                     this.spin.value = -4 - tc / 2;
                  }),
                  ...trashballs
               ]
            }).on('tick', function () {
               if (pshk.value > 0) {
                  this.position.set(ppos.x + pshk.value * (Math.random() * 2 - 1) * 5, ppos.y);
               } else {
                  this.position.set(ppos);
               }
            });
            renderer.attach('main', planetoid);
            const cam = new CosmosObject({ position: player.position.clamp(...renderer.region) });
            game.camera = cam;
            renderer.region[0].y = -Infinity;
            await cam.position.modulate(renderer, 4000, { y: -120 });
            await antifreeze([ sansbossLoader, renderer.pause(1000) ]);
            await dialogue('dialoguerTop', ...text.a_starton.trashhunt1);
            const ehdkjhgf = menuBox(32, 10, 566, 140 - 38, 6, {
               objects: [
                  new CosmosText({
                     fill: 0xffffff,
                     fontFamily: content.fDeterminationMono,
                     fontSize: 16,
                     position: { x: 11, y: 9 },
                     spacing: { x: 0, y: 5 },
                     stroke: -1,
                     content: text.a_starton.trashhunt2
                  })
               ]
            });
            renderer.attach('menu', ehdkjhgf);
            const mus = music.sansboss.instance(renderer);
            let lastUsed = -Infinity;
            await new Promise<void>(resolve => {
               const listener = () => {
                  if (renderer.time < lastUsed + 200) {
                     return;
                  }
                  tc === 0 && renderer.detach('menu', ehdkjhgf);
                  const power = lastUsed === -Infinity ? 1 : 1 / (1 + (renderer.time - lastUsed - 200) / 100);
                  lastUsed = renderer.time;
                  tc += power * (Math.max(tc, 10) / 40);
                  const snd1 = sounds.lightningstrike.instance(renderer);
                  snd1.rate.value = 1.4;
                  snd1.gain.value *= power;
                  const snd2 = sounds.boom.instance(renderer, 0.16);
                  snd2.rate.value = 1.2;
                  snd2.gain.value *= power;
                  snd2.gain.modulate(renderer, 1000, snd2.gain.value, 0);
                  pshk.value = power;
                  shake(power, 500);
                  for (const trashball of trashballs) {
                     const v = power * 50 * (Math.random() < 0.5 ? -1 : 1);
                     if (Math.abs(v) > Math.abs(trashball.metadata.xoffs)) {
                        trashball.metadata.xoffs = v;
                     }
                  }
                  pshk.modulate(renderer, 500, 0);
                  if (40 <= tc) {
                     mus.stop();
                     keys.interactKey.off('down', listener);
                     resolve();
                  }
               };
               keys.interactKey.on('down', listener);
            });
            await renderer.pause(3000);
            await cam.position.modulate(renderer, 2000, player.position.clamp(...renderer.region));
            game.camera = player;
            renderer.detach('main', planetoid);
            await dialogue('dialoguerTop', ...text.a_starton.trashhunt3());
            if (SAVE.storage.inventory.size < 8) {
               saver.add('corndog_sword');
            } else {
               SAVE.data.b.s_state_pendingsword = true;
            }
            quickresume();
            game.movement = true;
            sansbossAssets.unload();
            break;
         }
         case 'townswap': {
            const xtarget = player.position.x < 500 ? 250 : 750;
            switch (game.room) {
               case 's_town1':
                  await teleport('s_town2', 'down', xtarget, 10, world);
                  break;
               case 's_town2':
                  await teleport('s_town1', 'up', xtarget, 370, world);
                  break;
            }
            break;
         }
         case 'jumptrap':
            if (!game.movement) {
               return;
            }
            player.metadata.leap = true;
            break;
         case 'sandinter':
            if (!game.movement) {
               break;
            }
            switch (game.room) {
               case 's_sans':
               case 's_papyrus':
               case 's_dogs':
               case 's_jenga':
               case 's_bridge':
                  await dialogue('auto', ...text.a_starton.sansinter[game.room]());
                  break;
               case 's_bros':
                  if (world.edgy) {
                     const outcome = roomState.checked ? 1 : roomState.checkered ? (roomState.tricky ? 2 : 3) : 0;
                     await dialogue(
                        'auto',
                        ...[
                           text.a_starton.crossword6a,
                           text.a_starton.crossword6b,
                           text.a_starton.crossword6c,
                           text.a_starton.crossword6d
                        ][outcome]
                     );
                     if (outcome === 0) {
                        roomState.tricky = true;
                     } else {
                        roomState.tricky = false;
                     }
                  } else {
                     await dialogue(
                        'auto',
                        ...[ text.a_starton.crossword5a, text.a_starton.crossword5b ][roomState.choice]
                     );
                  }
                  break;
            }
            break;
         case 'sentry':
            if (!game.movement) {
               return;
            }
            switch (game.room) {
               case 's_sans':
                  if (player.position.x > 470 && player.position.x < 530 && player.position.y < 380) {
                     await dialogue('auto', ...text.a_starton.sentrySans2());
                  } else {
                     await dialogue('auto', ...text.a_starton.sentrySans1());
                  }
                  break;
               case 's_papyrus':
                  if (player.position.x > 200 && player.position.x < 245 && player.position.y < 105) {
                     await dialogue('auto', ...text.a_starton.sentryPapyrus2());
                  } else {
                     await dialogue('auto', ...text.a_starton.sentryPapyrus1());
                  }
                  break;
            }
            break;
         case 'doggo':
            if (!game.movement || 19 <= SAVE.data.n.plot) {
               break;
            }
            SAVE.data.n.plot = 19;
         case 'dogbell': {
            if (!game.movement || (subscript === 'dogbell' && player.face !== 'up')) {
               break;
            }
            game.movement = false;
            const mus =
               SAVE.data.n.plot === 72
                  ? SAVE.data.b.svr
                     ? music.uwa.instances[0]
                     : music.reunited.instances[0]
                  : game.music;
            const rat = mus?.rate.value ?? 1;
            if (subscript === 'dogbell') {
               mus && (mus.rate.value = 0);
               sounds.bell.instance(renderer);
               await renderer.pause(600);
               sounds.bell.instance(renderer);
               if (SAVE.data.n.state_starton_doggo === 2 || SAVE.data.n.plot > 27 || game.room !== 's_doggo') {
                  await renderer.pause(1000);
                  await dialogue('auto', ...text.a_starton.doggonopoggo());
                  game.movement = true;
                  mus && (mus.rate.value = rat);
                  break;
               } else if (SAVE.data.n.state_starton_doggo === 3) {
                  await renderer.pause(1000);
                  await dialogue('auto', ...text.a_starton.doggo3x);
                  game.movement = true;
                  mus && (mus.rate.value = rat);
                  break;
               }
            } else {
               mus?.stop();
               player.face = 'right';
            }
            scriptState.riser = true;
            const doggopoggo = (scriptState.doggo ??= temporary(
               new CosmosAnimation({
                  active: true,
                  anchor: { x: 0, y: 1 },
                  position: { x: 362.5, y: 88 },
                  subcrop: { bottom: -1 },
                  resources: content.ionSDoggo
               }).on('tick', function () {
                  if (scriptState.riser) {
                     if (this.subcrop.bottom > -25) {
                        this.subcrop.bottom -= 0.5;
                        if (this.subcrop.bottom < -25) {
                           this.subcrop.bottom = -25;
                        }
                     }
                  } else if (this.subcrop.bottom < -1) {
                     this.subcrop.bottom += 0.5;
                     if (-1 <= this.subcrop.bottom) {
                        renderer.detach('main', doggopoggo);
                        scriptState.doggo = void 0;
                     }
                  }
               }),
               'main',
               () => (scriptState.doggo = void 0)
            ));
            await renderer.when(() => doggopoggo.subcrop.bottom === -25);
            if (subscript === 'doggo') {
               await dialogue('auto', ...text.a_starton.doggo1);
               game.music = null;
               await battler.encounter(player, groups.doggo, false);
               if (SAVE.data.n.state_starton_doggo !== 2) {
                  await dialogue('auto', ...text.a_starton.doggo2[SAVE.data.n.state_starton_doggo]);
                  scriptState.riser = false;
                  await renderer.when(() => doggopoggo.subcrop.bottom === -1);
                  if (!SAVE.data.b.oops) {
                     await dialogue(
                        'auto',
                        ...[ text.a_starton.truetext.doggo1, text.a_starton.truetext.doggo2 ][
                           SAVE.data.n.state_starton_doggo
                        ]
                     );
                  }
               } else {
                  renderer.detach('main', doggopoggo);
                  scriptState.doggo = void 0;
               }
            } else {
               await dialogue('auto', ...text.a_starton.doggo3());
               scriptState.riser = false;
               game.movement = true;
               mus && (mus.rate.value = rat);
               break;
            }
            game.movement = true;
            if (SAVE.data.n.state_starton_doggo === 2) {
               quickresume(true);
            } else {
               quickresume();
            }
            break;
         }
         case 'dimbox': {
            if (!game.movement) {
               break;
            }
            const dimbox = instance('main', 'dimbox');
            if (dimbox) {
               const anim = dimbox.object.objects[0] as CosmosAnimation;
               if (anim.index > 0) {
                  break;
               }
               game.movement = false;
               anim.enable();
               await renderer.when(() => anim.index === 3);
               anim.disable();
               atlas.navigators.of('sidebarCell').setpos();
               atlas.switch('sidebarCellBox');
               await renderer.when(() => atlas.target === null);
               anim.index = 4;
               anim.enable();
               await renderer.when(() => anim.index === 6);
               anim.reset();
            }
            break;
         }
         case 'papfire': {
            if (!roomState.fail && SAVE.data.n.plot < 20) {
               const cycles = roomState.cycles as number[];
               const indicies = player.position.subtract(100, 35).divide(20, 10).clamp({ x: 0, y: 0 }, { x: 6, y: 13 });
               if (![ 0, 1, 2, 13 ].includes(Math.abs(cycles[Math.round(indicies.x)] - Math.round(indicies.y)))) {
                  roomState.fail = true;
               } else {
                  roomState.step = true;
               }
            }
            break;
         }
         case 'nicecream': {
            if (!game.movement) {
               return;
            }
            const inst = instance('main', 's_nicecream');
            if (inst) {
               const guyanim = inst.object.objects[0] as CosmosAnimation;
               if (guyanim.resources === content.ionSNicecream) {
                  if (game.room === 'c_archive_starton4') {
                     if (SAVE.storage.inventory.size < 8) {
                        if (!cs_state.nc) {
                           cs_state.nc = true;
                           saver.add('archive_nice_cream');
                           await dialogue('auto', ...text.a_starton.cream_get_archive);
                        } else {
                           await dialogue('auto', ...text.a_starton.cream_empty_archive);
                        }
                     } else {
                        await dialogue('auto', ...text.a_starton.cream_full_archive);
                     }
                  } else if (args[0] === 'geno') {
                     if (SAVE.data.n.state_starton_creamz < 8) {
                        if (SAVE.storage.inventory.size < 8) {
                           sounds.equip.instance(renderer);
                           saver.add('nice_cream');
                           await dialogue('auto', ...text.a_starton.cream_get);
                           SAVE.data.n.state_starton_creamz++;
                           if (
                              world.kiddo &&
                              !SAVE.data.b.f_state_kidd_cream &&
                              SAVE.data.n.state_foundry_muffet !== 1
                           ) {
                              SAVE.data.b.f_state_kidd_cream = true;
                              await dialogue('auto', ...text.a_starton.nicecreamK1d, ...text.a_starton.nicecreamK3b);
                           }
                        } else {
                           await dialogue('auto', ...text.a_starton.cream_full);
                        }
                     } else {
                        await dialogue('auto', ...text.a_starton.cream_deny);
                     }
                  }
               } else if (args[0] !== 'geno') {
                  let cost = 0;
                  game.movement = false;
                  if (game.room === 'a_hub4') {
                     speech.targets.add(guyanim);
                     await dialogue('auto', ...text.a_starton.nicecreamE());
                     speech.targets.delete(guyanim);
                     game.movement = true;
                     return;
                  } else if (game.room === 's_lesser') {
                     cost = SAVE.data.b.s_state_million ? 6 : 12;
                     if (SAVE.data.n.state_starton_nicecream < 0.1) {
                        SAVE.data.n.state_starton_nicecream = 0.1;
                        speech.targets.add(guyanim);
                        await dialogue('auto', ...text.a_starton.nicecreamSc1);
                        speech.targets.delete(guyanim);
                        guyanim.use(content.ionSNicecreamCurious);
                        await renderer.pause(850);
                        guyanim.use(content.ionSNicecreamHappi);
                        speech.targets.add(guyanim);
                        await dialogue('auto', ...text.a_starton.nicecreamSc2());
                        speech.targets.delete(guyanim);
                        typer.variables.x = cost.toString();
                        await dialogue('auto', ...text.a_starton.nicecreamPrompt1());
                     } else {
                        guyanim.use(content.ionSNicecreamHappi);
                        speech.targets.add(guyanim);
                        await dialogue('auto', ...text.a_starton.nicecreamSc3());
                        speech.targets.delete(guyanim);
                        typer.variables.x = cost.toString();
                        await dialogue('auto', ...text.a_starton.nicecreamPrompt1());
                     }
                  } else {
                     cost = 10;
                     const free = SAVE.storage.inventory.count('punchcard') > 2;
                     if (!SAVE.data.b.f_state_nicecream) {
                        SAVE.data.b.f_state_nicecream = true;
                        guyanim.use(content.ionSNicecreamCurious);
                        speech.targets.add(guyanim);
                        await dialogue('auto', ...text.a_starton.nicecreamFc1);
                        speech.targets.delete(guyanim);
                        await renderer.pause(850);
                        guyanim.use(content.ionSNicecreamHappi);
                        speech.targets.add(guyanim);
                        await dialogue('auto', ...text.a_starton.nicecreamFc2);
                        speech.targets.delete(guyanim);
                        typer.variables.x = cost.toString();
                        await dialogue('auto', ...text.a_starton.nicecreamPrompt1());
                     } else {
                        guyanim.use(content.ionSNicecreamHappi);
                        if (free) {
                           cost = 0;
                           speech.targets.add(guyanim);
                           await dialogue('auto', ...text.a_starton.nicecreamFc3a);
                           speech.targets.delete(guyanim);
                           await dialogue('auto', ...text.a_starton.nicecreamPrompt2());
                        } else {
                           speech.targets.add(guyanim);
                           await dialogue('auto', ...text.a_starton.nicecreamFc3b);
                           speech.targets.delete(guyanim);
                           typer.variables.x = cost.toString();
                           await dialogue('auto', ...text.a_starton.nicecreamPrompt1());
                        }
                     }
                  }
                  if (choicer.result === 1) {
                     if (game.room === 's_lesser') {
                        if (SAVE.data.n.state_starton_nicecream < 1) {
                           guyanim.use(content.ionSNicecreamSad);
                           speech.targets.add(guyanim);
                           await dialogue('auto', ...text.a_starton.nicecreamSc4);
                           speech.targets.delete(guyanim);
                        } else {
                           guyanim.use(content.ionSNicecreamHappi);
                           speech.targets.add(guyanim);
                           await dialogue('auto', ...text.a_starton.nicecreamReturnWithNeeds);
                           speech.targets.delete(guyanim);
                        }
                     } else if (!SAVE.data.b.f_state_nicecream_purchase) {
                        guyanim.use(content.ionSNicecreamSad);
                        speech.targets.add(guyanim);
                        await dialogue('auto', ...text.a_starton.nicecreamFc4);
                        speech.targets.delete(guyanim);
                     } else {
                        guyanim.use(content.ionSNicecreamHappi);
                        speech.targets.add(guyanim);
                        await dialogue('auto', ...text.a_starton.nicecreamReturnWithNeeds);
                        speech.targets.delete(guyanim);
                     }
                  } else if (cost > 0 && SAVE.storage.inventory.size === 8) {
                     guyanim.use(content.ionSNicecreamCurious);
                     speech.targets.add(guyanim);
                     await dialogue('auto', ...text.a_starton.nicecreamNoFun1);
                     speech.targets.delete(guyanim);
                     if (game.room === 's_lesser') {
                        if (SAVE.data.n.state_starton_nicecream < 1) {
                           guyanim.use(content.ionSNicecreamSad);
                           speech.targets.add(guyanim);
                           await dialogue('auto', ...text.a_starton.nicecreamSc4);
                           speech.targets.delete(guyanim);
                        } else {
                           guyanim.use(content.ionSNicecreamHappi);
                           speech.targets.add(guyanim);
                           await dialogue('auto', ...text.a_starton.nicecreamReturnWithGoods);
                           speech.targets.delete(guyanim);
                        }
                     } else if (!SAVE.data.b.f_state_nicecream_purchase) {
                        guyanim.use(content.ionSNicecreamSad);
                        speech.targets.add(guyanim);
                        await dialogue('auto', ...text.a_starton.nicecreamFc4);
                        speech.targets.delete(guyanim);
                     } else {
                        guyanim.use(content.ionSNicecreamHappi);
                        speech.targets.add(guyanim);
                        await dialogue('auto', ...text.a_starton.nicecreamReturnWithGoods);
                        speech.targets.delete(guyanim);
                     }
                  } else if (saver.gold < cost) {
                     guyanim.use(content.ionSNicecreamCurious);
                     speech.targets.add(guyanim);
                     await dialogue('auto', ...text.a_starton.nicecreamNoMun1);
                     speech.targets.delete(guyanim);
                     if (game.room === 's_lesser') {
                        if (SAVE.data.n.state_starton_nicecream < 1) {
                           if (SAVE.data.n.state_starton_nicecream < 0.2) {
                              SAVE.data.n.state_starton_nicecream = 0.2;
                              guyanim.use(content.ionSNicecreamHappi);
                              speech.targets.add(guyanim);
                              await dialogue('auto', ...text.a_starton.nicecreamFree1);
                              speech.targets.delete(guyanim);
                              saver.add('nice_cream');
                              await dialogue('auto', ...text.a_starton.nicecreamGet);
                              guyanim.use(content.ionSNicecreamCurious);
                              speech.targets.add(guyanim);
                              await dialogue('auto', ...text.a_starton.nicecreamFree2);
                              speech.targets.delete(guyanim);
                              guyanim.use(content.ionSNicecreamSad);
                           } else {
                              guyanim.use(content.ionSNicecreamSad);
                              speech.targets.add(guyanim);
                              await dialogue('auto', ...text.a_starton.nicecreamNoMun2);
                              speech.targets.delete(guyanim);
                           }
                        } else {
                           guyanim.use(content.ionSNicecreamHappi);
                           speech.targets.add(guyanim);
                           await dialogue('auto', ...text.a_starton.nicecreamReturnWithGoods);
                           speech.targets.delete(guyanim);
                        }
                     } else if (!SAVE.data.b.f_state_nicecream_purchase) {
                        guyanim.use(content.ionSNicecreamSad);
                        speech.targets.add(guyanim);
                        await dialogue('auto', ...text.a_starton.nicecreamNoMun2);
                        speech.targets.delete(guyanim);
                     } else {
                        guyanim.use(content.ionSNicecreamHappi);
                        speech.targets.add(guyanim);
                        await dialogue('auto', ...text.a_starton.nicecreamReturnWithGoods);
                        speech.targets.delete(guyanim);
                     }
                  } else {
                     SAVE.data.n.state_starton_nicecream = Math.floor(SAVE.data.n.state_starton_nicecream) + 1;
                     if (game.room === 's_lesser') {
                        saver.gold -= cost;
                     } else {
                        SAVE.data.b.f_state_nicecream_purchase = true;
                        if (cost > 0) {
                           saver.gold -= cost;
                           SAVE.data.n.state_foundry_punchcards++;
                        } else {
                           SAVE.storage.inventory.remove('punchcard');
                           SAVE.storage.inventory.remove('punchcard');
                           SAVE.storage.inventory.remove('punchcard');
                        }
                     }
                     speech.targets.add(guyanim);
                     await dialogue('auto', ...text.a_starton.nicecreamPurchase);
                     speech.targets.delete(guyanim);
                     saver.add('nice_cream');
                     await dialogue('auto', ...text.a_starton.nicecreamGet);
                     if (game.room === 'f_stand' && !SAVE.data.b.f_state_noticard) {
                        SAVE.data.b.f_state_noticard = true;
                        speech.targets.add(guyanim);
                        await dialogue('auto', ...text.a_starton.nicecreamFc5);
                        speech.targets.delete(guyanim);
                     }
                  }
                  if (world.kiddo && !SAVE.data.b.f_state_kidd_cream && SAVE.data.n.state_foundry_muffet !== 1) {
                     SAVE.data.b.f_state_kidd_cream = true;
                     SAVE.data.b.f_state_nicecream_purchase = true;
                     await renderer.pause(850);
                     await dialogue('auto', ...text.a_starton.nicecreamK1a);
                     speech.targets.add(guyanim);
                     await dialogue('auto', ...text.a_starton.nicecreamK1b);
                     speech.targets.delete(guyanim);
                     await dialogue('auto', ...text.a_starton.nicecreamK1c);
                     guyanim.use(content.ionSNicecreamCurious);
                     await renderer.pause(850);
                     speech.targets.add(guyanim);
                     await dialogue('auto', ...text.a_starton.nicecreamK2);
                     speech.targets.delete(guyanim);
                     await renderer.pause(850);
                     guyanim.use(content.ionSNicecreamHappi);
                     speech.targets.add(guyanim);
                     await dialogue('auto', ...text.a_starton.nicecreamK3a);
                     speech.targets.delete(guyanim);
                     await dialogue('auto', ...text.a_starton.nicecreamK3b);
                  }
                  game.movement = true;
               }
            }
            break;
         }
         case 'crossword': {
            if (!game.movement) {
               return;
            }
            game.movement = false;
            const sprite = new CosmosSprite({
               position: { x: 160, y: 120 },
               anchor: 0,
               scale: 1 / 2,
               frames: [ content.iooSCrosswordScreen ]
            });
            const overlay = new CosmosObject({
               objects: [
                  new CosmosRectangle({
                     alpha: 0.7,
                     fill: 0,
                     size: { x: 320, y: 240 }
                  }),
                  sprite
               ]
            });
            renderer.attach('menu', overlay);
            if (SAVE.data.n.plot < 21) {
               roomState.checked = true;
            } else {
               roomState.checkered = true;
            }
            await keys.specialKey.on('down');
            renderer.detach('menu', overlay);
            game.movement = true;
            break;
         }
         case 'spagtable': {
            if (world.genocide) {
               await dialogue('auto', ...text.a_starton.objinter.spagtable0);
            } else if (trueSpaghettiState() < 1) {
               await dialogue('auto', ...text.a_starton.objinter.spagtable1);
            } else if (trueSpaghettiState() < 2) {
               if (SAVE.storage.inventory.size < 8) {
                  SAVE.data.n.state_starton_spaghetti = 2;
                  sounds.equip.instance(renderer);
                  saver.add('spaghetti');
                  await dialogue('auto', ...text.a_starton.objinter.spagtable2);
               } else {
                  await dialogue('auto', ...text.a_starton.objinter.spagtable2b);
               }
            } else {
               await dialogue('auto', ...text.a_starton.objinter.spagtable3());
            }
            break;
         }
         case 'microwave': {
            if (player.position.y <= 116) {
               if (world.genocide || postSIGMA()) {
                  await dialogue('auto', ...text.a_starton.objinter.microwave0);
               } else if (trueSpaghettiState() < 1) {
                  header('s/equip').then(() => {
                     SAVE.data.n.state_starton_spaghetti = 1;
                  });
                  await dialogue('auto', ...text.a_starton.objinter.microwave1());
               } else {
                  await dialogue('auto', ...text.a_starton.objinter.microwave2());
               }
            } else {
               await dialogue('auto', ...text.a_starton.objinter.microwave3());
               if (!SAVE.data.b.svr && trueSpaghettiState() < 1) {
                  await dialogue('auto', ...text.a_starton.objinter.microwave4());
               }
            }
            break;
         }
         case 'ctower': {
            if (!game.movement) {
               return;
            }
            if (SAVE.data.b.s_state_mathpass || postSIGMA()) {
               await dialogue('auto', ...text.a_starton.objinter.ctower1());
            } else {
               game.movement = false;
               const rad = rand_rad(rng.overworld.next());
               let number = 500 + rad.int(9500);
               const operations = [] as { type: '-' | '+'; value: number }[];
               const generate = () => {
                  let index = 0;
                  while (index < 4) {
                     const power = 10 ** (3 - index);
                     while (true) {
                        const type = rad.next() < 0.4 ? (number > 0 ? '-' : '+') : number > 0 ? '+' : '-';
                        const value = Math.floor(rad.next() * 9) + 1;
                        const result = number + (type === '-' ? -value : value) * power;
                        if (result > -1000 && result < 10000 && (Math.abs(number) > 9 || index < 3 || result === 0)) {
                           operations[index++] = { type, value };
                           break;
                        }
                     }
                  }
               };
               generate();
               await dialogue('auto', ...text.a_starton.objinter.ctower0());
               sounds.menu.instance(renderer).rate.value = 1.5;
               navscript.enable(
                  async input => {
                     switch (input) {
                        case 'left':
                        case 'right':
                           sounds.menu.instance(renderer).rate.value = 1.5;
                           break;
                        case 'next':
                           sounds.dimbox.instance(renderer).rate.value = 1.5;
                           const operation = operations[navscript.position.x];
                           number +=
                              (operation.type === '-' ? -operation.value : operation.value) *
                              10 ** (3 - navscript.position.x);
                           if (number === 0) {
                              atlas.switch(null);
                              navscript.disable();
                              sounds.noise.instance(renderer);
                              SAVE.data.b.s_state_mathpass = true;
                              await renderer.pause(250);
                              await depower();
                              if ((!SAVE.data.b.oops || SAVE.data.b.svr) && number === 0) {
                                 await dialogue('auto', ...text.a_starton.truetext.puzzle1());
                              }
                              game.movement = true;
                           } else {
                              generate();
                           }
                           break;
                        case 'prev':
                           navscript.disable();
                           atlas.switch(null);
                           game.movement = true;
                           break;
                     }
                  },
                  CosmosUtils.populate(4, index => [ index ]),
                  [
                     ...CosmosUtils.populate(
                        4,
                        index =>
                           new CosmosSprite({
                              anchor: 0,
                              frames: [ content.iooSScreenon ],
                              position: { y: 100, x: 60 + index * 60 },
                              objects: [
                                 new CosmosText({
                                    fill: 0xffffff,
                                    alpha: 0.8,
                                    anchor: 0,
                                    position: { y: -2.25 },
                                    fontFamily: content.fPapyrus,
                                    fontSize: 32
                                 }).on('tick', function () {
                                    if (number < 0) {
                                       this.content = `-${(-number).toString().padStart(3, '0')}`[index];
                                    } else {
                                       this.content = number.toString().padStart(4, '0')[index];
                                    }
                                 })
                              ]
                           })
                     ),
                     new CosmosSprite({
                        anchor: 0,
                        priority: 10000,
                        position: { y: 160 },
                        frames: [ content.iooSScreenon ],
                        objects: [
                           new CosmosText({
                              fill: 0xffffff,
                              alpha: 0.8,
                              anchor: 0,
                              position: { y: -2.25 },
                              fontFamily: content.fPapyrus,
                              fontSize: 32
                           }).on('tick', function () {
                              const operation = operations[navscript.position.x];
                              this.content = operation.type + operation.value.toString();
                           })
                        ]
                     }).on('tick', function () {
                        this.position.x = 60 + navscript.position.x * 60;
                     })
                  ]
               );
               await renderer.on('render');
               atlas.switch('navscript');
            }
            break;
         }
         case 'xtower': {
            if (!game.movement) {
               return;
            }
            game.movement = false;
            await dialogue('auto', ...text.a_starton.objinter.xtower1());
            if (SAVE.data.b.svr || SAVE.data.n.plot === 72 || world.postnoot || postSIGMA()) {
               game.movement = true;
               return;
            }
            let score = 0;
            let collateral = 1;
            let ended = false;
            let stopanim = false;
            const time = renderer.time;
            const targetContainer = new CosmosObject();
            const bulletContainer = new CosmosObject();
            const scorecard = new CosmosText({
               fill: 0xf0f0dd,
               alpha: 0.8,
               anchor: 0,
               position: { x: 160, y: 75 },
               fontFamily: content.fDeterminationMono,
               fontSize: 16
            });
            const updateScore = (score: number) => {
               if (!ended) {
                  scorecard.content = text.a_starton.xtowerScore.replace('$(x)', Math.min(score, 9999999).toString());
                  if (collateral > 1) {
                     scorecard.content += ` (x${collateral})`;
                  }
               }
            };
            const endGame = async () => {
               ended = true;
               keys.interactKey.off('down', spawnBullet);
               arrow.alpha.value = 0;
               await Promise.all(
                  targets.map(anim =>
                     Promise.race([
                        anim.alpha.modulate(renderer, 300, 0),
                        anim.scale.modulate(renderer, 300, { x: 0.5, y: 0.5 }),
                        anim.rotation.modulate(renderer, 300, 0, -135),
                        anim.position.modulate(renderer, 300, anim.position, anim.position.add(0, 10))
                     ]).then(() => {
                        targetContainer.detach(anim);
                     })
                  )
               );
               stopanim = true;
               const newScore = score;
               const oldScore = SAVE.data.n.state_starton_xtower;
               const topScore = Math.max(oldScore, newScore);
               SAVE.data.n.state_starton_xtower = topScore;
               const scores = {
                  sans: 999999,
                  kidd: 121975,
                  papyrus: 42732,
                  napstablook: 9440,
                  undyne: 1987,
                  you: Math.min(topScore, 9999999)
               } as Partial<CosmosKeyed<number, keyof typeof text.a_starton.xtowerHiscoreNames & string>>;
               scorecard.alpha.task?.();
               scorecard.alpha.set(1);
               scorecard.position.y = 120;
               scorecard.scale.task?.();
               scorecard.scale.set(1);
               scorecard.spacing.y = 1;
               const scoreTable = Object.entries(scores)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 5);
               scorecard.content = `${scoreTable
                  .map(entry => `${text.a_starton.xtowerHiscoreNames[entry[0] as keyof typeof scores]}`)
                  .join('\n')}\n\n${
                  newScore < oldScore
                     ? text.a_starton.xtowerMessage2
                     : newScore === oldScore
                     ? text.a_starton.xtowerMessage3
                     : text.a_starton.xtowerMessage1
               }`;
               const scsize = scorecard.compute();
               const scorecard2 = new CosmosText({
                  spacing: { y: 1 },
                  position: {
                     y: scsize.y / -2,
                     x:
                        scsize.x / -2 +
                        Math.max(
                           ...Object.values(text.a_starton.xtowerHiscoreNames).map(
                              name => content.fDeterminationMono.metrics(name).x
                           )
                        )
                  },
                  content: scoreTable.map(entry => `  -  ${entry[1]}`).join('\n')
               });
               scorecard.attach(scorecard2);
               scorecard.position.x =
                  160 - (scsize.x / -2 + Math.max(scsize.x / 2, scorecard2.position.x + scorecard2.compute().x)) / 2;
               await keys.specialKey.on('down');
               scorecard.detach(scorecard2);
               renderer.detach('main', container);
               scorereaction: {
                  if (newScore < 500 || SAVE.data.b.s_state_million) {
                     break scorereaction;
                  }
                  const inst = instance('main', 's_nicecream');
                  if (!inst) {
                     break scorereaction;
                  }
                  const guyanim = inst.object.objects[0] as CosmosAnimation;
                  if (guyanim.resources === content.ionSNicecream) {
                     break scorereaction;
                  }
                  let msg = 0;
                  const newCat =
                     newScore < 2000 ? 0 : newScore < 40000 ? 1 : newScore < 400000 ? 2 : newScore <= 999999 ? 3 : 4;
                  const oldCat =
                     oldScore < 2000 ? 0 : oldScore < 40000 ? 1 : oldScore < 400000 ? 2 : oldScore <= 999999 ? 3 : 4;
                  if (SAVE.data.b.s_state_scorereaction1) {
                     if (oldCat < 2 && newCat < 2) {
                        // repeated bad high score
                        if (!SAVE.data.b.s_state_scorereaction7) {
                           SAVE.data.b.s_state_scorereaction7 = true;
                           msg = 7;
                        }
                     } else if (oldCat === 3 && newCat === 3) {
                        // repeated near top high score
                        if (!SAVE.data.b.s_state_scorereaction11) {
                           SAVE.data.b.s_state_scorereaction11 = true;
                           msg = 11;
                        }
                     } else if (newCat === 4) {
                        // new score beats top score
                        msg = 3;
                     } else if (newCat < oldCat) {
                        // new score category is worse than previous best
                        if (!SAVE.data.b.s_state_scorereaction2) {
                           SAVE.data.b.s_state_scorereaction2 = true;
                           SAVE.data.b.s_state_scorereaction8 = false;
                           msg = 2;
                        }
                     } else if (newScore > oldScore) {
                        // new high score
                        if (newCat < 3) {
                           // new high score is still not near the top score
                           if (oldCat < 2) {
                              // old high score had bad category
                              if (!SAVE.data.b.s_state_scorereaction8) {
                                 SAVE.data.b.s_state_scorereaction8 = true;
                                 msg = 8;
                              }
                           } else {
                              // old high score had good category
                              SAVE.data.b.s_state_scorereaction2 = false;
                              msg = 5;
                           }
                        } else {
                           // first time getting near the top score
                           msg = 6;
                        }
                     } else if (newCat === oldCat) {
                        // new score category matches previous best
                        if (SAVE.data.b.s_state_scorereaction2) {
                           // got bad score category after setting previous best (redemption)
                           if (!SAVE.data.b.s_state_scorereaction8) {
                              SAVE.data.b.s_state_scorereaction8 = true;
                              msg = 8;
                           }
                        } else {
                           // didn't get bad score category after setting previous best (consistent)
                           if (!SAVE.data.b.s_state_scorereaction4) {
                              SAVE.data.b.s_state_scorereaction4 = true;
                              msg = 4;
                           }
                        }
                     }
                  } else {
                     SAVE.data.b.s_state_scorereaction1 = true;
                     msg = [ 1, 1, 10, 6, 9 ][newCat];
                  }
                  if (newCat === 3) {
                     SAVE.data.b.s_state_scorereaction2 = true;
                     SAVE.data.b.s_state_scorereaction8 = true;
                  }
                  if (msg <= 0) {
                     break scorereaction;
                  }
                  const sad = guyanim.resources === content.ionSNicecreamSad;
                  sad && guyanim.use(content.ionSNicecreamCurious);
                  speech.targets.add(guyanim);
                  await dialogue(
                     'auto',
                     ...[
                        [ text.a_starton.nicecreamScoreReaction1a, text.a_starton.nicecreamScoreReaction1b ],
                        [ text.a_starton.nicecreamScoreReaction2a, text.a_starton.nicecreamScoreReaction2b ],
                        [ text.a_starton.nicecreamScoreReaction3a, text.a_starton.nicecreamScoreReaction3b ],
                        [ text.a_starton.nicecreamScoreReaction4a, text.a_starton.nicecreamScoreReaction4b ],
                        [ text.a_starton.nicecreamScoreReaction5a, text.a_starton.nicecreamScoreReaction5b ],
                        [ text.a_starton.nicecreamScoreReaction6a, text.a_starton.nicecreamScoreReaction6b ],
                        [ text.a_starton.nicecreamScoreReaction7a, text.a_starton.nicecreamScoreReaction7b ],
                        [ text.a_starton.nicecreamScoreReaction8a, text.a_starton.nicecreamScoreReaction8b ],
                        [ text.a_starton.nicecreamScoreReaction9a, text.a_starton.nicecreamScoreReaction9b ],
                        [ text.a_starton.nicecreamScoreReaction10a, text.a_starton.nicecreamScoreReaction10b ],
                        [ text.a_starton.nicecreamScoreReaction11a, text.a_starton.nicecreamScoreReaction11b ]
                     ][msg - 1][sad ? 0 : 1]
                  );
                  speech.targets.delete(guyanim);
                  sad && guyanim.use(content.ionSNicecreamSad);
               }
               if (score > 999999 && !SAVE.data.b.s_state_million) {
                  SAVE.data.b.s_state_million = true;
                  if (SAVE.data.b.svr) {
                     await dialogue('auto', ...text.a_starton.xtowerAsriel);
                  } else if (!world.runaway) {
                     if (world.genocide) {
                        saver.gold = 0;
                     } else if (!world.edgy_x && SAVE.data.n.state_starton_papyrus !== 1) {
                        saver.gold += 10000;
                     }
                     sounds.phone.instance(renderer);
                     await dialogue('auto', ...text.a_starton.xtowerSans());
                  }
               }
               game.movement = true;
            };
            keys.specialKey.on('down').then(() => {
               ended || endGame();
            });
            updateScore(0);
            const arrow = new CosmosAnimation({
               priority: -10,
               resources: content.iooSWidescreenPlayer,
               anchor: 0
            }).on('tick', () => {
               const left = keyState.left;
               const right = keyState.right;
               const up = keyState.up;
               const down = keyState.down;
               left && (arrow.position.x -= 2);
               right && (arrow.position.x += 2);
               up && (arrow.position.y -= 2);
               down && (arrow.position.y += 2);
               if (up) {
                  arrow.rotation.value = 0;
               } else if (down) {
                  arrow.rotation.value = 180;
               } else if (left) {
                  arrow.rotation.value = 270;
               } else if (right) {
                  arrow.rotation.value = 90;
               }
               arrow.position.x = Math.min(Math.max(arrow.position.x, -105), 105);
               arrow.position.y = Math.min(Math.max(arrow.position.y, -50), 50);
            });
            const widescreen = new CosmosSprite({
               anchor: 0,
               position: { x: 160, y: 120 },
               frames: [ content.iooSWidescreen ],
               objects: [ targetContainer, bulletContainer, arrow ]
            });
            const targets = targetContainer.objects as CosmosSprite[];
            const rad = rand_rad(rng.overworld.next());
            const spawnTarget = () => {
               let hit = false;
               const base = new CosmosPoint((rad.next() - 0.5) * 95 * 2, (rad.next() - 0.5) * 40 * 2);
               const anim = new CosmosAnimation({
                  alpha: 0,
                  scale: 0.5,
                  rotation: -135,
                  anchor: 0,
                  metadata: { hit: false, lifetime: 150 },
                  position: base.add(0, 10),
                  resources: content.iooSWidescreenReticle
               }).on('tick', () => {
                  anim.metadata.lifetime = Math.max((anim.metadata.lifetime as number) - 1, 0);
                  if (anim.metadata.hit && !hit) {
                     hit = true;
                     sounds.gunshot.instance(renderer).rate.value = CosmosMath.remap(
                        anim.metadata.lifetime,
                        0.8,
                        1.2,
                        0,
                        150
                     );
                     Promise.all([
                        anim.alpha.modulate(renderer, 300, 0),
                        anim.scale.modulate(renderer, 300, { x: 2, y: 2 }),
                        anim.rotation.modulate(renderer, 300, 0, 135)
                     ]).then(() => {
                        targetContainer.detach(anim);
                     });
                  }
               });
               anim.alpha.modulate(renderer, 300, 1);
               anim.scale.modulate(renderer, 300, { x: 1, y: 1 });
               anim.rotation.modulate(renderer, 300, 0, 0);
               anim.position.modulate(renderer, 300, base, base);
               renderer.pause(2e3).then(async () => {
                  let index = 0;
                  while (index++ < 1) {
                     if (anim.metadata.hit || ended) {
                        return;
                     }
                     sounds.noise.instance(renderer).rate.value = 1.2;
                     anim.alpha.value = 0.5;
                     await renderer.pause(500);
                     if (anim.metadata.hit || ended) {
                        return;
                     }
                     anim.alpha.value = 1;
                     await renderer.pause(500);
                  }
                  index = 0;
                  while (index++ < 2) {
                     if (anim.metadata.hit || ended) {
                        return;
                     }
                     sounds.noise.instance(renderer).rate.value = 1.2;
                     anim.alpha.value = 0.5;
                     await renderer.pause(250);
                     if (anim.metadata.hit || ended) {
                        return;
                     }
                     anim.alpha.value = 1;
                     await renderer.pause(250);
                  }
                  index = 0;
                  while (index++ < 4) {
                     if (anim.metadata.hit || ended) {
                        return;
                     }
                     sounds.noise.instance(renderer).rate.value = 1.2;
                     anim.alpha.value = 0.5;
                     await renderer.pause(133);
                     if (anim.metadata.hit || ended) {
                        return;
                     }
                     anim.alpha.value = 1;
                     await renderer.pause(133);
                  }
                  if (!ended && !anim.metadata.hit) {
                     endGame();
                  }
               });
               targets.push(anim);
            };
            const bullets = bulletContainer.objects as CosmosSprite[];
            const spawnBullet = () => {
               if (arrow.index === 0) {
                  sounds.frypan.instance(renderer).rate.value = 2;
                  arrow.index = 1;
                  renderer.pause(400).then(() => {
                     ended || (arrow.index = 0);
                  });
                  let active = true;
                  let atLeastOneHit = false;
                  const base = arrow.position.endpoint(arrow.rotation.value - 90, 5);
                  const offset = base.subtract(arrow.position).divide(5);
                  const anim = new CosmosSprite({
                     alpha: 0,
                     scale: 0.5,
                     anchor: 0,
                     position: base,
                     frames: [ content.iooSWidescreenBullet ]
                  }).on('tick', () => {
                     if (active) {
                        let index = 0;
                        let distance = 8;
                        while (index++ < 7) {
                           active && (anim.position = anim.position.add(offset));
                           let match = false;
                           for (const target of targets) {
                              if (
                                 !target.metadata.hit &&
                                 Math.abs(anim.position.x - target.position.x) < distance &&
                                 Math.abs(anim.position.y - target.position.y) < distance
                              ) {
                                 distance -= 2;
                                 match = true;
                                 target.metadata.hit = true;
                                 if (atLeastOneHit) {
                                    const current = (collateral += 0.25);
                                    renderer.pause(750).then(async () => {
                                       if (collateral === current) {
                                          collateral = 1;
                                          if (stopanim) {
                                             return;
                                          }
                                          await Promise.all([
                                             scorecard.scale.modulate(renderer, 150, { x: 1.25, y: 1.25 }),
                                             scorecard.alpha.modulate(renderer, 150, 0.5)
                                          ]);
                                          if (stopanim) {
                                             return;
                                          }
                                          updateScore((score = Math.ceil(score * current)));
                                          scorecard.scale.modulate(renderer, 150, { x: 1, y: 1 });
                                          scorecard.alpha.modulate(renderer, 150, 1);
                                       }
                                    });
                                 } else {
                                    atLeastOneHit = true;
                                 }
                                 updateScore((score += Math.ceil(target.metadata.lifetime as number)));
                                 break;
                              }
                           }
                           if (
                              active &&
                              (match ||
                                 anim.position.x < -110 ||
                                 anim.position.x > 110 ||
                                 anim.position.y < -55 ||
                                 anim.position.y > 55)
                           ) {
                              if (!match) {
                                 active = false;
                                 const bomb = sounds.bomb.instance(renderer);
                                 bomb.rate.value = 1.25;
                                 bomb.gain.value *= 0.9;
                              }
                              if (!anim.metadata.fading) {
                                 anim.metadata.fading = true;
                                 Promise.all([
                                    anim.alpha.modulate(renderer, 300, 0),
                                    anim.scale.modulate(renderer, 300, { x: 0.5, y: 0.5 })
                                 ]).then(async () => {
                                    await renderer.post();
                                    bulletContainer.detach(anim);
                                 });
                              }
                           }
                        }
                     }
                  });
                  anim.alpha.modulate(renderer, 300, 1);
                  anim.scale.modulate(renderer, 300, { x: 1, y: 1 });
                  bullets.push(anim);
               }
            };
            sounds.menu.instance(renderer).rate.value = 1.5;
            const container = new CosmosObject({
               priority: -10000,
               objects: [ widescreen, scorecard ]
            });
            renderer.attach('main', container);
            keys.interactKey.on('down', spawnBullet);
            while (!ended) {
               spawnTarget();
               await renderer.pause(
                  CosmosMath.bezier(Math.min(renderer.time - time, 15e4) / 15e4, 2500, 600) *
                     (score <= 999999 ? 1 : 0.5)
               );
            }
            break;
         }
         case 'puzzlechip': {
            if (game.movement && !roomState.activating) {
               roomState.activating = true;
               const target = game.room === 's_puzzle1' ? 24 : 25;
               if (SAVE.data.n.plot < target) {
                  const id = +args[0];
                  const puzzle = instance('main', 'puzzlechip')!.object.objects[0] as CosmosAnimation;
                  if (id < puzzle.index + 1) {
                     roomState.activating = false;
                     return;
                  }
                  sounds.menu.instance(renderer).rate.value = 1.5;
                  if (id === puzzle.index + 1) {
                     puzzle.index = id;
                     if (id === puzzle.frames.length - 7) {
                        const takeover = game.room === 's_puzzle2' && !world.edgy;
                        if (takeover) {
                           game.movement = false;
                        } else {
                           SAVE.data.n.plot = target;
                        }
                        puzzle.enable();
                        await renderer.when(() => puzzle.index === puzzle.frames.length - 3);
                        puzzle.disable();
                        await renderer.pause(166);
                        puzzle.index = puzzle.frames.length - 4;
                        sounds.menu.instance(renderer).rate.value = 1;
                        await renderer.pause(66);
                        puzzle.index = puzzle.frames.length - 3;
                        sounds.menu.instance(renderer).rate.value = 1.25;
                        await renderer.pause(66);
                        puzzle.index = puzzle.frames.length - 4;
                        sounds.menu.instance(renderer).rate.value = 1.5;
                        await renderer.pause(266);
                        puzzle.index = puzzle.frames.length - 3;
                        sounds.menu.instance(renderer).rate.value = 1;
                        await depower();
                        takeover && (SAVE.data.n.plot = target);
                     }
                  } else {
                     game.movement = false;
                     puzzle.index = puzzle.frames.length - 2;
                     await renderer.pause(166);
                     puzzle.index = puzzle.frames.length - 1;
                     sounds.menu.instance(renderer).rate.value = 1;
                     await renderer.pause(66);
                     puzzle.index = puzzle.frames.length - 2;
                     sounds.menu.instance(renderer).rate.value = 0.75;
                     await renderer.pause(66);
                     puzzle.index = puzzle.frames.length - 1;
                     sounds.menu.instance(renderer).rate.value = 0.625;
                     await renderer.pause(266);
                     sounds.menu.instance(renderer).rate.value = 0.5;
                     puzzle.index = 0;
                     game.movement = true;
                  }
                  SAVE.data.n[`state_starton_${game.room as 's_puzzle1'}`] = puzzle.index;
               } else {
                  await dialogue('auto', ...text.a_starton.objinter.puzzlechip());
               }
               roomState.activating = false;
            }
            break;
         }
         case 'puzzle3': {
            if (!game.movement) {
               return;
            }
            game.movement = false;
            const sets = set_gen();
            const activate = (tag: string, state: number, tag2?: string) => {
               for (const { object } of instances('main', tag)) {
                  if (!tag2 || (object.metadata.tags as string[]).includes(tag2)) {
                     const anim = object.objects[0] as CosmosAnimation;
                     anim.index = state;
                  }
               }
            };
            if (SAVE.data.n.plot < 27) {
               if (args.length > 0) {
                  if (!SAVE.data.s.state_starton_s_puzzle3) {
                     sounds.menu.instance(renderer).rate.value = 1.2;
                     activate((SAVE.data.s.state_starton_s_puzzle3 = args[0]), 1);
                  } else if (SAVE.data.s.state_starton_s_puzzle3[0] === args[0][0]) {
                     activate(SAVE.data.s.state_starton_s_puzzle3, 0);
                     if (SAVE.data.s.state_starton_s_puzzle3[1] !== args[0][1]) {
                        sounds.menu.instance(renderer);
                        activate((SAVE.data.s.state_starton_s_puzzle3 = args[0]), 1);
                     } else {
                        SAVE.data.s.state_starton_s_puzzle3 = '';
                        sounds.menu.instance(renderer).rate.value = 0.8;
                     }
                  } else {
                     sounds.menu.instance(renderer).rate.value = 1.2;
                     activate(args[0], 1);
                     await renderer.pause(100);
                     const r = args[0][0] === 'r' ? args[0] : SAVE.data.s.state_starton_s_puzzle3;
                     const c = args[0][0] === 'c' ? args[0] : SAVE.data.s.state_starton_s_puzzle3;
                     const correctSet = sets[(SAVE.data.n.state_starton_s_puzzle3 ||= 0)];
                     SAVE.data.n.state_starton_s_puzzle3++;
                     if (correctSet[0] === r && correctSet[1] === c) {
                        sounds.menu.instance(renderer).rate.value = 1.2;
                        activate(args[0], 2, SAVE.data.s.state_starton_s_puzzle3);
                        await renderer.pause(100);
                        sounds.menu.instance(renderer).rate.value = 1.4;
                        activate('puzzle3tile', 0);
                        for (const [ a, b ] of sets.slice(0, SAVE.data.n.state_starton_s_puzzle3 as number)) {
                           activate(a, 2, b);
                        }
                        if (SAVE.data.n.state_starton_s_puzzle3 === sets.length) {
                           await renderer.pause(100);
                           activate('puzzle3tile', 0);
                           await renderer.pause(200);
                           sounds.menu.instance(renderer).rate.value = 1.4;
                           activate('puzzle3tile', 0);
                           for (const [ a, b ] of sets.slice(0, SAVE.data.n.state_starton_s_puzzle3 as number)) {
                              activate(a, 2, b);
                           }
                           await renderer.pause(100);
                           activate('puzzle3tile', 0);
                           await renderer.pause(200);
                           sounds.menu.instance(renderer).rate.value = 1.4;
                           activate('puzzle3tile', 0);
                           for (const [ a, b ] of sets.slice(0, SAVE.data.n.state_starton_s_puzzle3 as number)) {
                              activate(a, 2, b);
                           }
                           await renderer.pause(600);
                           await depower();
                           SAVE.data.n.plot = 27;
                        }
                     } else {
                        SAVE.data.n.state_starton_s_puzzle3 = 0;
                        sounds.menu.instance(renderer);
                        activate(args[0], 3, SAVE.data.s.state_starton_s_puzzle3);
                        await renderer.pause(200);
                        sounds.menu.instance(renderer).rate.value = 0.6;
                        activate(args[0], 4, SAVE.data.s.state_starton_s_puzzle3);
                        await renderer.pause(400);
                        activate('puzzle3tile', 0);
                     }
                     SAVE.data.s.state_starton_s_puzzle3 = '';
                  }
               } else {
                  if (player.face !== 'up') {
                     game.movement = true;
                     return;
                  }
                  await dialogue('auto', ...text.a_starton.puzzle3());
                  if (choicer.result === 0) {
                     await renderer.pause(300);
                     if (SAVE.data.s.state_starton_s_puzzle3 || SAVE.data.n.state_starton_s_puzzle3) {
                        sounds.menu.instance(renderer).rate.value = 0.8;
                        SAVE.data.s.state_starton_s_puzzle3 = '';
                        activate('puzzle3tile', 0);
                        await renderer.pause(700);
                     }
                     for (const [ a, b ] of sets) {
                        sounds.menu.instance(renderer).rate.value = 1.2;
                        activate(a, 1);
                        activate(b, 1);
                        activate(a, 2, b);
                        await renderer.pause(700);
                        activate('puzzle3tile', 0);
                     }
                  }
               }
            } else {
               await dialogue('auto', ...text.a_starton.objinter.puzzlechip());
            }
            game.movement = true;
            break;
         }
         case 'papsinter': {
            if (!game.movement) {
               return;
            }
            let firstprompt = false;
            switch (SAVE.data.n.plot_puzzlecheck) {
               case 0:
                  await dialogue('auto', ...text.a_starton.papsolu1);
                  SAVE.data.n.plot_puzzlecheck = 1;
                  break;
               case 1:
                  await dialogue('auto', ...text.a_starton.papsolu2);
                  SAVE.data.n.plot_puzzlecheck = 2;
                  break;
               case 2:
                  await dialogue('auto', ...text.a_starton.papsolu3);
                  SAVE.data.n.plot_puzzlecheck = 3;
                  firstprompt = true;
               case 3:
                  await dialogue('auto', ...text.a_starton.papsolu3a());
                  if (choicer.result === 0) {
                     await dialogue('auto', ...text.a_starton.papsolu3a1());
                     SAVE.data.n.plot_puzzlecheck = 4;
                  } else if (firstprompt) {
                     await dialogue('auto', ...text.a_starton.papsolu3a2);
                  }
                  break;
               case 4:
                  if ((instance('main', 'puzzlechip')!.object.objects[0] as CosmosSprite).index === 5) {
                     await dialogue('auto', ...text.a_starton.papsolu5);
                  } else {
                     await dialogue('auto', ...text.a_starton.papsolu4);
                  }
                  break;
            }
            break;
         }
         case 'trickswitch': {
            if (25 <= SAVE.data.n.plot) {
               break;
            }
            const puzzle = instance('main', 'puzzlechip')!.object.objects[0] as CosmosAnimation;
            if (puzzle.index === puzzle.frames.length - 8) {
               return;
            }
            sounds.switch.instance(renderer);
            puzzle.index = puzzle.frames.length - 8;
            instance('below', 'tricktree')!.object.offsets[2].modulate(renderer, 166, { y: -4 }, { y: -4 }, { y: 0 });
            if (SAVE.data.n.plot_puzzlecheck < 4) {
               SAVE.data.b.s_state_pretrick = true;
            }
            break;
         }
         case 'kitchen': {
            if (!roomState.kitchen && (player.position.y < 140 || roomState.forcedY)) {
               roomState.forcedY = false;
               roomState.kitchen = true;
               const trashie = instance('main', 'paptrashie')!.object;
               const wallie = instance('below', 'kitchenwallv2electricboogaloo')!.object.objects[0];
               trashie.priority.value = trashie.objects[0].position.y;
               roomState.paps && (roomState.paps.priority.value = 4100);
               for (const toppo of instances('main', 'toppo')) {
                  toppo.object!.priority.value = 4000;
               }
               for (const sussy of instance('below', 'kitchenwallv1')!.object.objects) {
                  sussy.metadata[sussy.metadata.restore as string] = true;
               }
               const top = instance('main', 'bonetop')!.object;
               top.priority.value = 2000;
               wallie.metadata.barrier = false;
               top.alpha.modulate(renderer, top.alpha.value * 300, 0);
               await renderer.when(() => game.room === 's_bonehouse' && (player.position.y > 140 || roomState.forcedY));
               trashie.priority.value = 0;
               roomState.kitchen = false;
               top.priority.value = 0;
               wallie.metadata.barrier = true;
               for (const toppo of instances('main', 'toppo')) {
                  toppo.object!.priority.value = 0;
               }
               roomState.paps && !roomState.forcedY && (roomState.paps.priority.value = 0);
               for (const sussy of instance('below', 'kitchenwallv1')!.object.objects) {
                  sussy.metadata[sussy.metadata.restore as string] = false;
               }
               top.alpha.modulate(renderer, (1 - top.alpha.value) * 300, 1);
            }
            break;
         }
         case 'bonehouse': {
            if (!game.movement) {
               return;
            }
            game.movement = false;
            if (SAVE.data.n.plot_date < 0.1 && !world.edgy && !world.killed0) {
               await dialogue('auto', ...text.a_starton.papdate0());
               player.position.y += 3;
               player.face = 'down';
            } else {
               await teleport('s_bonehouse', 'up', 240, 230, world);
            }
            game.movement = true;
            break;
         }
         case 'balcony': {
            if (!game.movement) {
               return;
            }
            await teleport('s_town2', 'right', 720, 114, world);
            game.menu = false;
            function pticker (this: CosmosObject) {
               this.priority.value = this.position.y + 175;
            }
            const bloc = instance('main', 'housebloc')!.object;
            const barriers = new CosmosObject({
               position: { x: 740, y: 102 },
               objects: [
                  new CosmosHitbox({ metadata: { barrier: true }, size: { x: -20, y: -20 } }),
                  new CosmosHitbox({ metadata: { barrier: true }, size: { x: 20, y: 26 } }),
                  new CosmosHitbox({ metadata: { barrier: true }, position: { y: 26 }, size: { x: -20, y: 20 } })
               ]
            });
            renderer.attach('main', barriers);
            for (const object of bloc.objects) {
               if (object.metadata.bloc) {
                  object.metadata.barrier = false;
               }
            }
            player.on('tick', pticker);
            goatbro.on('tick', pticker);
            goatbroTrue.on('tick', pticker);
            await renderer.when(() => player.position.x < 715 && game.movement);
            player.off('tick', pticker);
            goatbro.off('tick', pticker);
            goatbroTrue.off('tick', pticker);
            renderer.detach('main', barriers);
            for (const object of bloc.objects) {
               if (object.metadata.bloc) {
                  object.metadata.barrier = true;
               }
            }
            game.movement = false;
            await teleport('s_bonehouse', 'left', 300, 74, world);
            game.menu = true;
            if (dateready() && !roomState.walkin && SAVE.data.n.state_starton_papyrus === 0) {
               roomState.walkin = true;
               await dialogue('auto', ...text.a_starton.balcony0());
               SAVE.data.n.state_papyrus_view = (choicer.result + 1) as 1 | 2;
               await dialogue('auto', ...[ text.a_starton.balcony1, text.a_starton.balcony2 ][choicer.result]);
            } else {
               await renderer.on('render');
            }
            player.priority.value = 0;
            goatbro.priority.value = 0;
            goatbroTrue.priority.value = 0;
            game.movement = true;
            break;
         }
         case 'kiddTalk': {
            const kidd = instance('main', 's_pacikid')!.object;
            scriptState.cooldown ??= 0;
            if (
               kidd.metadata.barrier &&
               player.position.x > kidd.position.x - 10 &&
               player.position.x < kidd.position.x + 10 &&
               player.position.y > kidd.position.y - 5 &&
               player.position.y < kidd.position.y + 3
            ) {
               player.position.y = player.position.y > kidd.position.y ? kidd.position.y + 3 : kidd.position.y - 5;
            } else if (game.movement && (scriptState.cooldown <= renderer.time || kidd.metadata.wait)) {
               game.movement = false;
               kidd.metadata.pause = true;
               if (kidd.metadata.wait) {
                  await dialogue('auto', ...text.a_starton.kidd2());
               } else {
                  await dialogue('auto', ...text.a_starton.kidd1());
               }
               kidd.metadata.pause = false;
               scriptState.cooldown = renderer.time + 1000;
               game.movement = true;
            }
            break;
         }
         case 'npc': {
            if (!game.movement) {
               break;
            }
            const gr = args[0] === 'g_grillby';
            await instance('main', gr ? 'g_redbird' : args[0])?.talk(
               'a',
               talkFinder(),
               'auto',
               ...CosmosUtils.provide(text.a_starton.npcinter[args[0] as keyof typeof text.a_starton.npcinter])
            );
            if (gr && SAVE.data.n.plot === 33 && !SAVE.data.b.item_fast_food) {
               if (SAVE.storage.inventory.size < 8) {
                  SAVE.data.b.item_fast_food = true;
                  instance('main', 'foodz')!.object.objects[0].alpha.value = 0;
                  sounds.equip.instance(renderer);
                  saver.add(SAVE.data.b.fryz ? 'fryz' : 'burgerz');
                  await dialogue('auto', ...text.a_starton.fast_food1());
               } else {
                  await dialogue('auto', ...text.a_starton.fast_food2);
               }
            }
            break;
         }
         case 'papmail': {
            if (!game.movement) {
               break;
            }
            await dialogue('auto', ...text.a_starton.objinter.papmail1());
            if (SAVE.data.b.svr) {
               break;
            }
            if (choicer.result === 0) {
               await dialogue('auto', ...text.a_starton.objinter.papmail2());
            } else {
               await dialogue('auto', ...text.a_starton.objinter.papmail3);
            }
            break;
         }
         case 'beddoor': {
            if (world.population === 0 || SAVE.data.b.svr || world.runaway) {
               await teleport('s_beddinng', 'up', 150, 230, world);
            } else if (SAVE.data.n.plot === 72) {
               await dialogue('auto', ...text.a_starton.beddoor3);
            } else if (SAVE.data.n.state_starton_sleep === 0) {
               await dialogue('auto', ...text.a_starton.beddoor1);
            } else {
               await dialogue('auto', ...text.a_starton.beddoor2);
            }
            player.position.y += 3;
            player.face = 'down';
            break;
         }
         case 'bedbook': {
            await dialogue('auto', ...text.a_starton.bedbook1());
            if (!SAVE.data.b.svr && !SAVE.data.b.oops) {
               await dialogue(
                  'auto',
                  ...[ text.a_starton.bedbook3a, text.a_starton.bedbook3b ][SAVE.data.b.s_state_chareader ? 1 : 0]
               );
               await dialogue('auto', ...text.a_starton.bedbook4());
               if (choicer.result === 0) {
                  SAVE.data.b.s_state_chareader = true;
                  await dialogue('auto', ...text.a_starton.bedbook5);
               } else {
                  await dialogue('auto', ...text.a_starton.bedbook6);
               }
            }
            break;
         }
         case 'innkeep': {
            if (!game.movement || (args[0] === 'sleep' && player.face === 'up')) {
               return;
            }
            game.movement = false;
            const speak = async (...lines: string[]) => {
               await instance('main', 'i_innkeep')?.talk('a', talkFinder(), 'auto', ...lines);
            };
            switch (args[0]) {
               case 'geno':
                  if (SAVE.data.b.svr) {
                     break;
                  } else if (world.population === 0 || world.runaway) {
                     await dialogue('auto', ...text.a_starton.gonezo());
                  }
                  break;
               case 'sleep':
                  const fd = fader();
                  await fd.alpha.modulate(renderer, 1000, 1);
                  if (SAVE.data.b.svr || world.goatbro) {
                     player.position.set(132 - 5, 130);
                     player.face = 'right';
                     if (SAVE.data.b.svr) {
                        goatbroTrue.metadata.override = true;
                        goatbroTrue.position.set(132 + 5, 130);
                        goatbroTrue.face = 'left';
                        goatbroTrue.sprite.reset();
                     } else {
                        goatbro.metadata.override = true;
                        goatbro.position.set(132 + 5, 130);
                        goatbro.face = 'left';
                        goatbro.sprite.reset();
                     }
                  } else {
                     player.position.set(132, 130);
                     player.face = 'down';
                  }
                  await renderer.pause(1000);
                  const bedcover = new CosmosSprite({ position: { x: 113, y: 112 }, frames: [ content.iooSBedcover ] });
                  renderer.attach('above', bedcover);
                  await fd.alpha.modulate(renderer, 1000, 0);
                  await renderer.pause(2000);
                  await fd.alpha.modulate(renderer, 1000, 1);
                  if (world.runaway) {
                     await bullyEnding();
                     return;
                  }
                  SAVE.data.n.hp = Math.max(SAVE.data.n.hp, Math.min(calcHP() + calcBonusHP(), 99));
                  renderer.detach('above', bedcover);
                  player.position.x = 163;
                  player.face = 'right';
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
                  await renderer.pause(2000);
                  fd.alpha.modulate(renderer, 300, 0).then(() => {
                     renderer.detach('menu', fd);
                  });
                  break;
               case 'leave':
                  if (world.population > 0 && !SAVE.data.b.svr && !world.runaway) {
                     await renderer.alpha.modulate(renderer, 500, 0);
                     await renderer.pause(650);
                  }
                  await teleport('s_innterior', 'down', 90, 80, world);
                  if (world.population > 0 && !SAVE.data.b.svr && !world.runaway) {
                     await renderer.pause(650);
                     await speak(...text.a_starton.innkeep3a, ...text.a_starton.innkeep3b);
                     if (SAVE.data.n.state_starton_sleep % 2 === 0) {
                        await speak(...text.a_starton.innkeep3d);
                        saver.gold += 60;
                     } else {
                        await speak(...text.a_starton.innkeep3c);
                     }
                  }
                  break;
               default:
                  if (SAVE.data.n.plot === 72) {
                     await speak(
                        ...[ text.a_starton.innkeep5, text.a_starton.innkeep6 ][SAVE.data.n.state_starton_sleep % 2]
                     );
                     break;
                  }
                  let sleep = false;
                  switch (SAVE.data.n.state_starton_sleep) {
                     case 0:
                        await speak(...text.a_starton.innkeep1a());
                        if (choicer.result === 0) {
                           sleep = true;
                           if (saver.gold < 60) {
                              SAVE.data.n.state_starton_sleep = 1;
                              await speak(...text.a_starton.innkeep2a);
                           } else {
                              saver.gold -= 60;
                              SAVE.data.n.state_starton_sleep = 2;
                              await speak(...text.a_starton.innkeep2b);
                           }
                        } else {
                           await speak(...text.a_starton.innkeep4);
                        }
                        break;
                     case 1:
                        await speak(...text.a_starton.innkeep1c());
                        if (choicer.result === 0) {
                           sleep = true;
                           await speak(...text.a_starton.innkeep2b);
                        } else {
                           await speak(...text.a_starton.innkeep4);
                        }
                        break;
                     case 2:
                        await speak(...text.a_starton.innkeep1b());
                        if (choicer.result === 0) {
                           if (saver.gold < 60) {
                              await speak(...text.a_starton.innkeep2c);
                           } else {
                              sleep = true;
                              saver.gold -= 60;
                              await speak(...text.a_starton.innkeep2b);
                           }
                        } else {
                           await speak(...text.a_starton.innkeep4);
                        }
                        break;
                  }
                  if (sleep) {
                     await renderer.alpha.modulate(renderer, 500, 0);
                     await renderer.pause(500);
                     await teleport('s_beddinng', 'up', 150, 230, world);
                  }
                  break;
            }
            game.movement = true;
            break;
         }
         case 'jukebox': {
            if (game.movement) {
               game.movement = false;
               if (postSIGMA()) {
                  await dialogue('auto', ...text.a_starton.jukebox0);
               } else if (SAVE.data.n.state_starton_jukebox === 0) {
                  await dialogue('auto', ...text.a_starton.jukebox1());
                  if (choicer.result < 3) {
                     switch (choicer.result) {
                        case 0:
                           if (!SAVE.data.b.napsta_performance) {
                              await dialogue('auto', ...text.a_starton.jukebox1x1());
                              game.movement = true;
                              return;
                           }
                           break;
                        case 1:
                           if (SAVE.data.n.state_foundry_swansong < 2) {
                              await dialogue('auto', ...text.a_starton.jukebox1x2());
                              game.movement = true;
                              return;
                           }
                           break;
                        case 2:
                           if (SAVE.data.n.state_starton_trashprogress < 2) {
                              await dialogue('auto', ...text.a_starton.jukebox1x3());
                              game.movement = true;
                              return;
                           }
                           break;
                     }
                     sounds.equip.instance(renderer).rate.value = 1.25;
                     SAVE.data.n.state_starton_jukebox = (choicer.result + 1) as 1 | 2 | 3;
                     const [ az, thing ] = updateJukebox();
                     await antifreeze([ dialogue('auto', ...text.a_starton.jukebox1y), thing.load(az) ]);
                     barmusic(roomState);
                     const precount = [
                        SAVE.data.b.s_state_barmusic1,
                        SAVE.data.b.s_state_barmusic2,
                        SAVE.data.b.s_state_barmusic3
                     ].filter(value => value).length;
                     switch (choicer.result) {
                        case 0:
                           if (!SAVE.data.b.s_state_barmusic1) {
                              SAVE.data.b.s_state_barmusic1 = true;
                              const dogamy = instance('main', 'g_dogamy');
                              const dogaressa = instance('main', 'g_dogaressa');
                              if (dogamy && dogaressa) {
                                 await renderer.pause(850);
                                 await dogamy.talk('a', talkFinder(), 'dialoguerTop', ...text.a_starton.jukebox3a1);
                                 await dogaressa.talk('a', talkFinder(), 'dialoguerTop', ...text.a_starton.jukebox3a2);
                              }
                           }
                           break;
                        case 1:
                           if (!SAVE.data.b.s_state_barmusic2) {
                              SAVE.data.b.s_state_barmusic2 = true;
                              const hamster = instance('main', 'g_punkhamster');
                              if (hamster) {
                                 await renderer.pause(850);
                                 await hamster.talk('a', talkFinder(), 'dialoguerBottom', ...text.a_starton.jukebox3b);
                              }
                           }
                           break;
                        case 2:
                           if (!SAVE.data.b.s_state_barmusic3) {
                              SAVE.data.b.s_state_barmusic3 = true;
                              const grillby = instance('main', 'g_grillby');
                              const redbird = instance('main', 'g_redbird');
                              if (grillby && redbird) {
                                 await renderer.pause(850);
                                 await instance('main', 'g_redbird')?.talk(
                                    'a',
                                    talkFinder(),
                                    'dialoguerBottom',
                                    ...text.a_starton.jukebox3c
                                 );
                              }
                           }
                           break;
                     }
                     const mouthy = instance('main', 'g_bigmouth');
                     if (
                        mouthy &&
                        precount === 2 &&
                        SAVE.data.b.s_state_barmusic1 &&
                        SAVE.data.b.s_state_barmusic2 &&
                        SAVE.data.b.s_state_barmusic3
                     ) {
                        await renderer.pause(850);
                        await mouthy?.talk('a', talkFinder(), 'dialoguerTop', ...text.a_starton.jukebox3d);
                     }
                  }
               } else {
                  await dialogue('auto', ...text.a_starton.jukebox2());
                  if (choicer.result < 1) {
                     sounds.equip.instance(renderer).rate.value = 1.25;
                     const [ az, thing ] = updateJukebox(true);
                     SAVE.data.n.state_starton_jukebox = 0;
                     (roomState.customs as CosmosInstance).stop();
                     thing.unload(az);
                     roomState.customsLevel = void 0;
                     if (!world.genocide && !world.killed0) {
                        if (SAVE.data.n.plot === 72) {
                           if (roomState.customs !== void 0) {
                              const ep = epilogue();
                              ep.gain.value = 0;
                              ep.gain.modulate(renderer, 300, ep.daemon.gain);
                           }
                        } else {
                           quickresume(true);
                        }
                     }
                     roomState.customs = void 0;
                  }
               }
               game.movement = true;
            }
            break;
         }
         case 'stool': {
            if (!game.movement) {
               break;
            }
            if (args[1] === 'no_d' && player.face === 'down') {
               break;
            }
            if (args[1] === 'no_r' && player.face === 'right') {
               break;
            }
            if (!instance('main', args[0])) {
               await dialogue('auto', ...(SAVE.data.b.svr ? text.a_starton.garbanzo : text.a_starton.gonezo()));
            }
            break;
         }
         case 'housebloc': {
            if (!game.movement) {
               break;
            }
            await dialogue('auto', ...text.a_starton.housebloc());
            break;
         }
         case 'npc98': {
            if (SAVE.data.n.plot === 72) {
               await dialogue('auto', ...text.a_starton.robotx());
               return;
            }
            switch (SAVE.data.n.state_starton_npc98) {
               case 0:
                  await dialogue('auto', ...text.a_starton.robot1());
                  if (choicer.result === 1) {
                     await dialogue('auto', ...text.a_starton.robot4());
                  } else if (SAVE.storage.inventory.size < 8) {
                     SAVE.data.n.state_starton_npc98 = 1;
                     saver.add('chip');
                     await dialogue('auto', ...text.a_starton.robot2());
                  } else {
                     await dialogue('auto', ...text.a_starton.robot3);
                  }
                  break;
               case 1:
                  if (
                     SAVE.storage.inventory.has('chip') ||
                     SAVE.storage.dimboxA.has('chip') ||
                     SAVE.storage.dimboxB.has('chip')
                  ) {
                     await dialogue('auto', ...text.a_starton.robot5());
                  } else {
                     await dialogue('auto', ...text.a_starton.robot6());
                     if (choicer.result === 1) {
                        await dialogue('auto', ...text.a_starton.robot8);
                     } else if (SAVE.storage.inventory.size < 8) {
                        SAVE.data.n.state_starton_npc98 = 2;
                        saver.add('chip');
                        await dialogue('auto', ...text.a_starton.robot7);
                     } else {
                        await dialogue('auto', ...text.a_starton.robot3);
                     }
                  }
                  break;
               case 2:
                  if (
                     SAVE.storage.inventory.has('chip') ||
                     SAVE.storage.dimboxA.has('chip') ||
                     SAVE.storage.dimboxB.has('chip')
                  ) {
                     await dialogue('auto', ...text.a_starton.robot9());
                  } else {
                     SAVE.data.n.state_starton_npc98 = 3;
                     await dialogue('auto', ...text.a_starton.robot10);
                  }
                  break;
               case 3:
                  await dialogue('auto', ...text.a_starton.robot11);
                  break;
               case 4:
               case 4.1:
                  await dialogue('auto', ...text.a_starton.robot12);
                  break;
            }
            break;
         }
         case 'candy': {
            if (game.movement) {
               await dialogue('auto', ...text.a_starton.candy1());
               if (postSIGMA()) {
                  break;
               }
               if (choicer.result === 0) {
                  if (SAVE.storage.inventory.size < 8) {
                     if (saver.gold < 8) {
                        await dialogue('auto', ...text.a_starton.candy2);
                     } else {
                        sounds.equip.instance(renderer);
                        saver.gold -= 8;
                        saver.add('berry');
                        await dialogue('auto', ...text.a_starton.candy4);
                     }
                  } else {
                     await dialogue('auto', ...text.a_starton.candy3);
                  }
               } else {
                  await dialogue('auto', ...text.a_starton.candy5);
               }
            }
            break;
         }
         case 'house': {
            if (game.movement && !instance('main', 't_rabbit')) {
               await dialogue('auto', ...text.a_starton.houz());
            }
            break;
         }
         case 'capstation': {
            if (game.movement && epilogueOverride(world.population < 4)) {
               if (player.face === 'down') {
                  if (SAVE.data.b.s_state_capstation) {
                     await dialogue('auto', ...text.a_starton.capstation2);
                  } else {
                     await dialogue('auto', ...text.a_starton.capstation1);
                     SAVE.data.b.s_state_capstation = true;
                  }
               } else {
                  await dialogue('auto', ...text.a_starton.gonezo());
               }
            }
            break;
         }
         case 'paptv': {
            if (!game.movement) {
               return;
            }
            if (world.runaway) {
               await dialogue('auto', ...text.a_starton.notv);
               return;
            }
            game.movement = false;
            const tv = instance('main', 'paptv')!.object;
            const tvsprite = tv.objects[0] as CosmosSprite;
            const tvanim = new CosmosAnimation({
               active: true,
               anchor: tvsprite.anchor.value(),
               position: tvsprite.position.value(),
               resources: content.iooSTvOn
            });
            tv.attach(tvanim);
            game.music?.stop();
            const tvmusic = sounds.tv.instance(renderer);
            if (SAVE.data.b.killed_mettaton) {
               tvmusic.rate.value = 0.6;
            }
            if (!roomState.tvdelay) {
               roomState.tvdelay = true;
               await renderer.pause(SAVE.data.b.killed_mettaton ? 1250 : 850);
            }
            await dialogue('auto', ...text.a_starton.paptv());
            tv.detach(tvanim);
            tvmusic.stop();
            quickresume();
            game.movement = true;
            break;
         }
         case 'papcouch': {
            if (SAVE.data.b.s_state_pilfer) {
               await dialogue('auto', ...text.a_starton.papcouch0());
            } else {
               await dialogue('auto', ...text.a_starton.papcouch1());
               if (choicer.result === 0) {
                  await dialogue('auto', ...text.a_starton.papcouch3);
                  if (dateready() && SAVE.data.n.state_starton_papyrus === 0) {
                     await dialogue('auto', ...text.a_starton.papcouch3a);
                  }
                  saver.gold += 10;
                  SAVE.data.b.s_state_pilfer = true;
               } else {
                  await dialogue('auto', ...text.a_starton.papcouch2);
               }
            }
            break;
         }
         case 'papsink': {
            if (!game.movement) {
               return;
            }
            game.movement = false;
            await dialogue('auto', ...text.a_starton.papsink0());
            if (!roomState.sink && dateready() && SAVE.data.n.state_starton_papyrus === 0) {
               roomState.sink = true;
               SAVE.data.b.s_state_papsink = true;
               const mus1 = content.amDogsigh.load();
               const mus2 = content.amDogdance.load();
               const sprite1 = content.iooToby3.load();
               const sprite2 = content.iooToby2.load();
               const sprite3 = content.iooToby1.load();
               const specatk = content.ibbSpecatkBone.load();
               const present = content.iocPapyrusPresent.load();
               const sallow = content.asSwallow.load();
               const trombone = content.iocSansTrombone.load();
               const boner = content.asTrombone.load();
               const grab = content.asGrab.load();
               await dialogue('auto', ...text.a_starton.papsink1);
               await Promise.all([ sprite1, renderer.pause(350) ]);
               const toby = new CosmosAnimation({
                  active: true,
                  priority: -6666,
                  anchor: { x: 0, y: 1 },
                  position: { x: 226, y: 72 },
                  resources: content.iooToby3
               });
               renderer.attach('main', toby);
               const sink = instance('main', 'papsink')!.object.objects[0] as CosmosAnimation;
               sink.index = 1;
               sounds.door.instance(renderer);
               game.music?.stop();
               await Promise.all([ mus1, renderer.pause(650) ]);
               const sigh = music.dogsigh.instance(renderer);
               await renderer.pause(1150);
               await dialogue('auto', ...text.a_starton.papsink2);
               const paps = roomState.paps as CosmosCharacter;
               paps.metadata.override = true;
               renderer
                  .when(() => paps.position.y < 100)
                  .then(async () => {
                     await player.walk(renderer, 3, { x: 245 });
                     player.face = 'left';
                  });
               await paps.walk(renderer, 4, { x: 224, y: 85 });
               await renderer.pause(650);
               await Promise.all([ present, sallow, specatk, grab, dialogue('auto', ...text.a_starton.papsink3) ]);
               renderer.detach('main', paps);
               const handout = new CosmosAnimation({
                  active: true,
                  anchor: { x: 0, y: 1 },
                  priority: 10000,
                  position: paps.position.value(),
                  resources: content.iocPapyrusPresent
               });
               renderer.attach('main', handout);
               await renderer.when(() => handout.index === 3);
               const sfx = sounds.grab.instance(renderer);
               await renderer.when(() => handout.index === 5);
               handout.disable();
               renderer.pause(850).then(async () => {
                  renderer.detach('main', handout);
                  content.iocPapyrusPresent.unload();
                  renderer.attach('main', paps);
                  await paps.walk(renderer, 4, { y: 120 });
                  paps.face = 'up';
                  sfx.stop();
                  content.asGrab.unload();
               });
               const gift = new CosmosSprite({
                  anchor: 0,
                  position: paps.position.add(17, -30.5),
                  priority: 9999,
                  rotation: 90,
                  frames: [ content.ibbSpecatkBone ]
               });
               renderer.attach('main', gift);
               const dest = toby.position.subtract(8, 4.5);
               const arcTop = new CosmosPoint(dest.x + (gift.position.x - dest.x), -50);
               await Promise.all([
                  gift.position.modulate(renderer, 4000, arcTop, arcTop, arcTop, arcTop, dest),
                  gift.rotation.modulate(renderer, 4000, 360 * 7)
               ]);
               sigh.stop();
               content.amDogsigh.unload();
               sounds.swallow.instance(renderer);
               renderer.detach('main', gift);
               content.ibbSpecatkBone.unload();
               toby.use(content.iooToby2);
               content.iooToby3.unload();
               await Promise.all([ mus2, sprite3, renderer.pause(1150) ]);
               const dance = music.dogdance.instance(renderer);
               toby.use(content.iooToby1);
               content.iooToby2.unload();
               await renderer.pause(650);
               await Promise.all([ sprite2, trombone, dialogue('auto', ...text.a_starton.papsink4) ]);
               const top = instance('main', 'bonetop')!.object;
               const door = new CosmosSprite({
                  position: { x: 253, y: 12 },
                  priority: 6500,
                  frames: [ content.iooSSansdoor ]
               }).on('tick', function () {
                  this.alpha.value = top.alpha.value;
               });
               const sand = new CosmosAnimation({
                  anchor: { x: 1 },
                  priority: 6499,
                  position: door.position.add(30, 10),
                  resources: content.iocSansTrombone
               }).on('tick', function () {
                  this.alpha.value = top.alpha.value;
               });
               const oldp1 = player.priority.value;
               player.priority.value = -9000;
               const oldp2 = paps.priority.value;
               paps.priority.value = -8000;
               renderer.attach('main', sand, door);
               sounds.door.instance(renderer);
               roomState.forcedY = true;
               dance.gain.modulate(renderer, 500, 0).then(() => {
                  dance.stop();
                  content.amDogdance.unload();
               });
               await Promise.all([ sand.position.modulate(renderer, 650, sand.position.add(37, 0)), boner ]);
               const dumbvictory = sounds.trombone.instance(renderer);
               sink.index = 0;
               renderer.detach('main', toby);
               content.iooToby1.unload();
               paps.preset = characters.papyrusMad;
               const noterate = (6 / 11 / 4) * 1000;
               CosmosUtils.populate(
                  6,
                  index =>
                     index++ === 4 || renderer.pause(noterate * index).then(() => (sand.index = [ 1, 0 ][sand.index]))
               );
               await Promise.all([
                  paps.walk(renderer, 4, { y: 185 }).then(async () => {
                     await renderer.pause(850);
                     paps.preset = characters.papyrus;
                     paps.face = 'up';
                     paps.metadata.override = false;
                     await renderer.pause(650);
                     await dialogue('auto', ...text.a_starton.papsink5);
                  }),
                  renderer.pause(noterate * 12).then(async () => {
                     sand.index = 0;
                     startonScript('kitchen');
                     await sand.position.modulate(renderer, 650, sand.position.subtract(37, 0));
                     renderer.detach('main', sand, door);
                     content.iocSansTrombone.unload();
                     sounds.doorClose.instance(renderer);
                     dumbvictory.stop();
                     content.asTrombone.unload();
                     player.priority.value = oldp1;
                     paps.priority.value = oldp2;
                  })
               ]);
               quickresume(true);
            }
            game.movement = true;
            break;
         }
         case 'sansbook': {
            if (SAVE.data.b.svr) {
               await dialogue('auto', ...text.a_starton.sansbook0);
               break;
            }
            await dialogue('auto', ...text.a_starton.sansbook1, ...text.a_starton.sansbook2());
            let looks = 0;
            let total = 0;
            while (choicer.result === 0 && total++ < 40) {
               await dialogue(
                  'auto',
                  ...text.a_starton.sansbook3,
                  ...(total === 40
                     ? text.a_starton.sansbook10()
                     : [
                          ...[
                             text.a_starton.sansbook4,
                             text.a_starton.sansbook5,
                             text.a_starton.sansbook6,
                             text.a_starton.sansbook7,
                             text.a_starton.sansbook8
                          ][looks++],
                          ...text.a_starton.sansbook2()
                       ])
               );
               looks === 5 && (looks = 3);
            }
            if (total < 40) {
               await dialogue('auto', ...text.a_starton.sansbook9);
            }
            break;
         }
         case 'papdate': {
            if (!game.movement) {
               break;
            }
            if (world.edgy || world.killed0) {
               await dialogue('auto', ...text.a_starton.papdate1x());
               return;
            }
            if (game.room === 's_bonehouse') {
               const paps = roomState.paps as CosmosCharacter;
               if (paps.metadata.exhausted) {
                  await dialogue('auto', ...text.a_starton.papdate3b);
               } else if (paps.metadata.tired) {
                  await dialogue('auto', ...text.a_starton.papdate3a);
               } else {
                  await dialogue('auto', ...text.a_starton.papdate3());
               }
               break;
            } else if (game.room === 's_papyrusroom') {
               game.movement = false;
               await dialogue('auto', ...text.a_starton.papdate5());
               if ((choicer.result as number) === 0) {
                  SAVE.data.n.plot_date = 1;
                  const swipeAssets = new CosmosInventory(
                     content.ibcPapyrusBattleBlackoutA,
                     content.ibcPapyrusDateSwipe,
                     content.asGrab
                  );
                  swipeAssets.name = 'swipeAssets';
                  const swipeLoader = swipeAssets.load();
                  await dialogue('auto', ...text.a_starton.papdate5a());
                  await antifreeze([ roomState.dateLoader, battler.battlefall(player, { x: 160, y: 160 }) ]);
                  heal(void 0, false);
                  battler.SOUL.alpha.value = 0;
                  battler.reset();
                  atlas.switch('battlerSimple');
                  renderer.attach('menu', battler.SOUL);
                  renderer.detach('main', roomState.paps);
                  let override = null as null | CosmosSprite;
                  const face = new CosmosObject({ position: { x: 19, y: 3 } });
                  const holder = () => {
                     if (override) {
                        face.objects = [ override ];
                     } else if (speech.state.face) {
                        face.objects = [ speech.state.face ];
                     } else {
                        face.objects = [ faces.papyrusBattleHapp ];
                     }
                  };
                  holder();
                  face.on('tick', holder);
                  speech.holders.push(holder);
                  const datepaps = new CosmosAnimation({
                     active: true,
                     position: { x: 130, y: 14 },
                     resources: content.ibcPapyrusBattle,
                     priority: 1,
                     objects: [ face ]
                  });
                  renderer.attach('menu', datepaps);
                  const papchat = async (...lines: string[]) => {
                     override = null;
                     const container = new CosmosObject({
                        position: { x: 195, y: 15 },
                        priority: 138581358135,
                        objects: [ battler.bubbles.twinkly() ]
                     });
                     renderer.attach('menu', container);
                     await typer.text(...lines);
                     renderer.detach('menu', container);
                     override = speech.state.face;
                  };
                  const sstriker = async () => {
                     sounds.strike.instance(renderer);
                     const overlay = new CosmosRectangle({
                        priority: 99999,
                        size: { x: 1000, y: 1000 },
                        position: { x: 160, y: 120 },
                        anchor: 0,
                        fill: 0xffffff,
                        stroke: -1
                     });
                     renderer.attach('menu', overlay);
                     overlay.alpha.modulate(renderer, 300, 0).then(() => {
                        renderer.detach('menu', overlay);
                     });
                     const origin = datepaps.position.x;
                     let index = 30;
                     while (index-- > 0) {
                        if (index > 0) {
                           datepaps.position.x = origin + Math.floor(index / 3) * (Math.floor((index % 4) / 2) * 2 - 1);
                        } else {
                           datepaps.position.x = origin;
                        }
                        await renderer.on('tick');
                     }
                  };
                  events.fire('battle');
                  let hud = null as null | CosmosObject;
                  const hudPhase = new CosmosValue(0);
                  const hudMenuListener = () => {
                     if (hud) {
                        return;
                     }
                     sounds.swallow.instance(renderer);
                     const time = renderer.time;
                     const timeIndicator = new CosmosText({
                        fontFamily: content.fDeterminationSans,
                        fontSize: 16,
                        anchor: { x: 0, y: 1 },
                        position: { x: 160 },
                        content: text.a_starton.papdate41.c,
                        fill: 0xffffff,
                        objects: [
                           new CosmosRectangle({
                              anchor: { x: 0, y: 1 },
                              blend: BLEND_MODES.MULTIPLY,
                              size: { x: content.fDeterminationSans.metrics(text.a_starton.papdate41.c).x, y: 20 },
                              position: { y: -2 }
                           }).on('tick', function () {
                              this.fill = CosmosImageUtils.color.of(
                                 `hsl(${((renderer.time - time) % 1e3) * 0.25}, 100%, 50%)`
                              );
                           })
                        ]
                     });
                     let mode = 0;
                     const max = 70;
                     const halfPoint = 35;
                     let frames = 0;
                     hud = new CosmosObject({
                        fontFamily: content.fDeterminationSans,
                        fontSize: 16,
                        objects: [
                           timeIndicator,
                           new CosmosObject({
                              position: { y: 90 },
                              border: 1,
                              objects: [
                                 new CosmosRectangle({
                                    fill: -1,
                                    stroke: 0xffffff,
                                    size: { x: 42, y: 50 },
                                    anchor: { x: 1, y: 1 }
                                 }),
                                 ...CosmosUtils.populate(4, index => {
                                    let mode = Math.random() < 0.5 ? 0 : 1;
                                    const generate = () => {
                                       const offset = Math.floor(Math.random() * 10);
                                       return (mode = [ 1, 0 ][mode]) === 0 ? 5 + offset : 45 - offset;
                                    };
                                    let ideal = generate();
                                    return new CosmosRectangle({
                                       anchor: { x: 1, y: 1 },
                                       position: { x: -3 - index * 10, y: -1 },
                                       size: { x: 6, y: generate() },
                                       fill: 0xffff00
                                    }).on('tick', function () {
                                       if (Math.abs(this.size.y - ideal) < 1) {
                                          ideal = generate();
                                       } else {
                                          this.size.y += this.size.y < ideal ? 0.5 : -0.5;
                                       }
                                    });
                                 }),
                                 new CosmosText({
                                    position: { x: -42, y: 2 },
                                    fill: 0xffffff,
                                    content: text.a_starton.papdate41.b
                                 })
                              ]
                           }).on('tick', function () {
                              this.position.x = -5 + hudPhase.value * 65;
                           }),
                           new CosmosRectangle({
                              fill: 0xffffff,
                              size: { x: 73, y: 29 / 2 },
                              anchor: 0,
                              position: { y: 27.5 },
                              objects: [
                                 new CosmosRectangle({
                                    fill: 0,
                                    size: { x: 71, y: 26 / 2 },
                                    anchor: 0,
                                    objects: [
                                       new CosmosRectangle({
                                          fill: 0x808080,
                                          size: { x: 70, y: 24 / 2 },
                                          anchor: 0,
                                          objects: [
                                             new CosmosRectangle({
                                                fill: 0x808080,
                                                size: { y: 24 / 2 },
                                                anchor: { y: 0 },
                                                position: { x: -70 / 2 },
                                                objects: [
                                                   new CosmosText({
                                                      fill: 0xffffff,
                                                      position: { y: -24 },
                                                      fontFamily: content.fDeterminationSans,
                                                      fontSize: 16,
                                                      content: text.a_starton.papdate41.d
                                                   })
                                                ]
                                             }).on('tick', function () {
                                                const movementFactor =
                                                   1 + (1 - Math.abs(halfPoint - this.size.x) / 35) * 5;
                                                if (this.size.x === max) {
                                                   mode = 1;
                                                } else if (this.size.x === 0) {
                                                   mode = 0;
                                                }
                                                if (mode === 0) {
                                                   this.size.x += movementFactor;
                                                } else if (mode === 1) {
                                                   this.size.x -= movementFactor;
                                                }
                                                this.size.x = Math.min(Math.max(this.size.x, 0), 70);
                                                this.fill = CosmosImageUtils.color.of(
                                                   `hsl(225.88, 100%, ${CosmosMath.remap(
                                                      movementFactor,
                                                      40,
                                                      60,
                                                      1,
                                                      6
                                                   )}%)`
                                                );
                                             })
                                          ]
                                       })
                                    ]
                                 })
                              ]
                           }).on('tick', function () {
                              this.position.x = -75 + hudPhase.value * 129;
                           }),
                           new CosmosRectangle({
                              anchor: 0,
                              size: { x: 45, y: 45 },
                              fill: 0,
                              stroke: 0xffffff,
                              border: 1,
                              position: { y: 97.5 },
                              objects: [
                                 new CosmosText({
                                    fill: 0xffffff,
                                    stroke: -1,
                                    anchor: { x: 1, y: 1 },
                                    position: { x: -27, y: 22.5 },
                                    fontFamily: content.fDeterminationSans,
                                    fontSize: 16,
                                    content: text.a_starton.papdate41.e
                                 })
                              ]
                           }).on('tick', function () {
                              this.position.x = 400 - hudPhase.value * 120;
                              if (frames-- === 0) {
                                 frames = Math.floor(Math.random() * 3);
                                 const speed = CosmosMath.remap(Math.random(), 1, 4);
                                 const spawnPos = Math.random();
                                 const object = new CosmosRectangle({
                                    alpha: speed / 4,
                                    size: { x: speed / 2, y: speed / 2 },
                                    fill: 0xffffff,
                                    stroke: -1,
                                    position: new CosmosPoint(-22.5, -22.5).add(
                                       Math.min(spawnPos, 0.5) * 90,
                                       Math.min(1 - spawnPos, 0.5) * 90
                                    )
                                 }).on('tick', () => {
                                    object.position.x -= speed / 3;
                                    object.position.y -= speed / 3;
                                    if (object.position.x < -22.5 || object.position.y < -22.5) {
                                       object.alpha.value = 0;
                                       this.detach(object);
                                    }
                                 });
                                 this.attach(object);
                              }
                           })
                        ]
                     });
                     renderer.attach('menu', hud);
                     timeIndicator.position
                        .modulate(renderer, 1000, timeIndicator.position.add(0, 16), timeIndicator.position.add(0, 16))
                        .then(() => {
                           hudPhase.modulate(renderer, 2000, 1, 1);
                        });
                  };
                  await battler.human(...text.a_starton.papdate6());
                  const datemusic1 = music.datingstart.instance(renderer);
                  await antifreeze([ swipeLoader, papchat(...text.a_starton.papdate7()) ]);
                  const readAssets = new CosmosInventory(
                     content.asStrike,
                     content.asSwallow,
                     content.ibcPapyrusDateRead,
                     content.ibcPapyrusBattleBlackoutB
                  );
                  readAssets.name = 'readAssets';
                  const readLoader = readAssets.load();
                  sounds.grab.instance(renderer);
                  const topAnim = new CosmosAnimation({
                     active: true,
                     resources: content.ibcPapyrusDateSwipe
                  });
                  datepaps.resources = content.ibcPapyrusBattleBlackoutA;
                  datepaps.attach(topAnim);
                  keys.menuKey.on('down', hudMenuListener);
                  await renderer.when(() => topAnim.index === 3);
                  topAnim.disable();
                  await renderer.pause(850);
                  keys.menuKey.off('down', hudMenuListener);
                  await papchat(...text.a_starton.papdate8());
                  const OMGLoader = content.ibcPapyrusDateOMG.load();
                  const tenseLoader = content.amDatingtense.load();
                  keys.menuKey.on('down', hudMenuListener);
                  await antifreeze([ readLoader, renderer.pause(350) ]);
                  keys.menuKey.off('down', hudMenuListener);
                  datepaps.resources = content.ibcPapyrusBattleBlackoutB;
                  topAnim.use(content.ibcPapyrusDateRead).enable();
                  await papchat(...text.a_starton.papdate9());
                  swipeAssets.unload();
                  if (hud) {
                     await renderer.pause(1250);
                     await papchat(...text.a_starton.papdate10());
                  } else {
                     const time = renderer.time;
                     keys.menuKey.on('down', hudMenuListener);
                     await renderer.when(() => {
                        if (hud || 5000 <= renderer.time - time) {
                           return true;
                        }
                        return false;
                     });
                     keys.menuKey.off('down', hudMenuListener);
                     if (hud) {
                        await renderer.pause(1250);
                        await papchat(...text.a_starton.papdate12);
                     } else {
                        await papchat(...text.a_starton.papdate11);
                     }
                  }
                  await renderer.pause(500);
                  await papchat(...text.a_starton.papdate13());
                  datepaps.resources = content.ibcPapyrusBattle;
                  topAnim.alpha.value = 0;
                  await papchat(...text.a_starton.papdate13a());
                  await antifreeze([ OMGLoader, battler.human(...text.a_starton.papdate14()) ]);
                  if (choicer.result === 0) {
                     datepaps.resources = content.ibcPapyrusBattleBlackoutB;
                     topAnim.use(content.ibcPapyrusDateOMG);
                     topAnim.alpha.value = 1;
                  }
                  await papchat(...[ text.a_starton.papdate15a, text.a_starton.papdate15b ][choicer.result]);
                  if (choicer.result === 0) {
                     datepaps.resources = content.ibcPapyrusBattle;
                     topAnim.alpha.value = 0;
                     await papchat(...text.a_starton.papdate15a1);
                  } else {
                     await renderer.pause(1000);
                     await papchat(...text.a_starton.papdate15c);
                  }
                  datepaps.resources = content.ibcPapyrusBattleBlackoutB;
                  topAnim.use(content.ibcPapyrusDateRead);
                  topAnim.alpha.value = 1;
                  await papchat(...text.a_starton.papdate16);
                  await datemusic1.gain.modulate(renderer, 850, 0);
                  datemusic1.stop();
                  datepaps.resources = content.ibcPapyrusBattle;
                  topAnim.alpha.value = 0;
                  await renderer.pause(450);
                  await antifreeze([ tenseLoader, papchat(...text.a_starton.papdate16a) ]);
                  const styleAssets = new CosmosInventory(
                     content.ibcPapyrusSecretStyle,
                     content.ibcPapyrusCoolhat,
                     content.ibcPapyrusCoolhatUnder,
                     content.ibcPapyrusSpagbox
                  );
                  styleAssets.name = 'styleAssets';
                  const styleLoader = styleAssets.load();
                  const fightLoader = content.amDatingfight.load();
                  const datemusic2 = music.datingtense.instance(renderer);
                  await papchat(...text.a_starton.papdate17());
                  datepaps.resources = content.ibcPapyrusBattleBlackoutB;
                  topAnim.use(content.ibcPapyrusDateOMG);
                  topAnim.alpha.value = 1;
                  await papchat(...text.a_starton.papdate17a());
                  await battler.human(...text.a_starton.papdate14());
                  datepaps.resources = content.ibcPapyrusBattle;
                  topAnim.alpha.value = 0;
                  datemusic2.stop();
                  if (choicer.result === 0) {
                     hud && renderer.detach('menu', hud);
                     override = faces.papyrusBattleOwwie;
                     await sstriker();
                     override = null;
                  } else if (hud) {
                     hudPhase.modulate(renderer, 1500, 0).then(() => {
                        renderer.detach('menu', hud!);
                     });
                  }
                  await papchat(...[ text.a_starton.papdate18a, text.a_starton.papdate18b ][choicer.result]());
                  const sizeX = new CosmosValue();
                  const max = 70;
                  const datePower = new CosmosRectangle({
                     fill: 0xffffff,
                     size: { x: 146 / 2, y: 29 / 2 },
                     anchor: 0,
                     objects: [
                        new CosmosRectangle({
                           fill: 0,
                           size: { x: 142 / 2, y: 26 / 2 },
                           anchor: 0,
                           objects: [
                              new CosmosRectangle({
                                 fill: 0x808080,
                                 size: { x: 140 / 2, y: 24 / 2 },
                                 anchor: 0,
                                 objects: [
                                    new CosmosRectangle({
                                       fill: 0x808080,
                                       size: { y: 24 / 2 },
                                       anchor: { y: 0 },
                                       position: { x: -70 / 2 },
                                       metadata: { sin: 0 },
                                       objects: [
                                          new CosmosText({
                                             fill: 0xffffff,
                                             position: { y: -24 },
                                             fontFamily: content.fDeterminationSans,
                                             fontSize: 16,
                                             content: text.a_starton.papdate41.a()
                                          })
                                       ]
                                    }).on('tick', function () {
                                       this.size.x = sizeX.value;
                                       this.fill = CosmosImageUtils.color.of(
                                          `hsl(225.88, 100%, ${CosmosMath.remap(
                                             Math.min(
                                                Math.max(
                                                   200 +
                                                      Math.sin(
                                                         (++this.metadata.sin * 10 * sizeX.value * 2) / max / 10
                                                      ) *
                                                         (20 + (35 * sizeX.value * 2) / max),
                                                   180
                                                ),
                                                255
                                             ),
                                             0,
                                             50,
                                             0,
                                             255
                                          )}%)`
                                       );
                                    })
                                 ]
                              })
                           ]
                        })
                     ]
                  });
                  renderer.attach('menu', datePower);
                  datePower.position = new CosmosPoint(54, 27.5);
                  sizeX.modulate(renderer, 2000, 50 / 2);
                  override = faces.papyrusBattleOwwie;
                  await sstriker();
                  override = null;
                  await renderer.pause(450);
                  datePower.position.modulate(renderer, 2000, { x: -75, y: 27.5 }, { x: -75, y: 27.5 });
                  await renderer.pause(250);
                  await antifreeze([ fightLoader, papchat(...text.a_starton.papdate19) ]);
                  const datemusic3 = music.datingfight.instance(renderer);
                  const tensionBox = new CosmosRectangle({
                     fill: -1,
                     stroke: 0xffffff,
                     size: { x: 42, y: 63 },
                     border: 1,
                     anchor: { x: 1, y: 1 },
                     position: { x: -5, y: 103 },
                     metadata: { next: 0, offset: 0 },
                     objects: [
                        new CosmosText({
                           position: { x: -42, y: 2 },
                           fill: 0xffffff,
                           stroke: -1,
                           fontFamily: content.fDeterminationSans,
                           fontSize: 16,
                           content: text.a_starton.papdate41.f
                        })
                     ]
                  }).on('tick', function () {
                     if (++this.metadata.offset === 3) {
                        this.metadata.offset = 0;
                        const pos = new CosmosPoint({ x: -5, y: this.metadata.next });
                        this.metadata.next = Math.random() * -this.size.y;
                        const target = { x: pos.x + 5, y: this.metadata.next };
                        this.attach(
                           new CosmosRectangle({
                              fill: 0xff0000,
                              stroke: -1,
                              position: pos,
                              size: { y: 1, x: pos.extentOf(target) },
                              anchor: { y: 0 },
                              metadata: { d: false, parent: this },
                              rotation: pos.angleFrom(target) + 180
                           }).on('tick', function () {
                              this.position.x -= 5 / 3;
                              this.position.x < -40 && this.metadata.parent.detach(this);
                           })
                        );
                     }
                  });
                  renderer.attach('menu', tensionBox);
                  tensionBox.position.modulate(
                     renderer,
                     2000,
                     tensionBox.position.add(65, 0),
                     tensionBox.position.add(65, 0)
                  );
                  await antifreeze([ styleLoader, papchat(...text.a_starton.papdate20()) ]);
                  const bellLoader = content.asBell.load();
                  while ((datepaps.position.x += 10) < 320) {
                     await renderer.on('tick');
                  }
                  datepaps.position.x = 330;
                  datepaps.use(content.ibcPapyrusSecretStyle);
                  datepaps.detach(topAnim);
                  content.ibcPapyrusDateOMG.unload();
                  datepaps.position.x -= 5;
                  datepaps.position.y -= 11;
                  face.position.x += 5;
                  face.position.y += 11;
                  const gifty = new CosmosAnimation({
                     anchor: { x: 0, y: 1 },
                     position: { x: 35, y: 20 },
                     resources: content.ibcPapyrusSpagbox
                  });
                  const hatty = new CosmosSprite({
                     frames: [ content.ibcPapyrusCoolhat ]
                  });
                  const hatty_b = new CosmosSprite({
                     priority: -1,
                     frames: [ content.ibcPapyrusCoolhatUnder ]
                  });
                  datepaps.attach(gifty, hatty, hatty_b);
                  await renderer.pause(850);
                  while (datepaps.position.x > 125) {
                     await datepaps.on('tick');
                     datepaps.position.x -= 10;
                  }
                  datepaps.position.x = 125;
                  await papchat(...text.a_starton.papdate21);
                  await battler.human(...text.a_starton.papdate22());
                  if (choicer.result === 0) {
                     override = faces.papyrusBattleOwwie;
                     await sstriker();
                     override = null;
                  }
                  await papchat(...[ text.a_starton.papdate23a, text.a_starton.papdate23b ][choicer.result]);
                  datePower.position = new CosmosPoint(54, 27.5);
                  sizeX.modulate(renderer, 2000, 100 / 2);
                  tensionBox.position
                     .modulate(renderer, 2000, tensionBox.position.subtract(65, 0), tensionBox.position.subtract(65, 0))
                     .then(() => {
                        renderer.detach('menu', tensionBox);
                     });
                  override = faces.papyrusBattleOwwie;
                  await Promise.all([ sstriker(), datemusic3.gain.modulate(renderer, 2500, 0) ]);
                  override = null;
                  datemusic3.stop();
                  await papchat(...text.a_starton.papdate24);
                  const datemusic4 = music.datingtense.instance(renderer);
                  sizeX.modulate(renderer, 1000, 80 / 2);
                  await antifreeze([ bellLoader, papchat(...text.a_starton.papdate24a()) ]);
                  datePower.position.modulate(renderer, 2000, { x: -75, y: 27.5 }, { x: -75, y: 27.5 });
                  await renderer.pause(250);
                  atlas.navigators.of('battlerSimple').objects[1].priority.value = 1;
                  await Promise.all([
                     battler.box.size.modulate(renderer, 1000, { x: 325, y: 245 }),
                     battler.box.position.modulate(renderer, 1000, { x: 160, y: 120 })
                  ]);
                  const infobox = menuBox(32, 320 + 38, 566, 140 - 38, 6, {
                     objects: [
                        new CosmosText({
                           fill: 0xffffff,
                           fontFamily: content.fDeterminationMono,
                           fontSize: 16,
                           position: { x: 11, y: 9 },
                           spacing: { x: 0, y: 5 },
                           stroke: -1,
                           content: text.a_starton.papdate24b
                        })
                     ]
                  }).on('tick', function () {
                     if (
                        this.position.x - 8 <= battler.SOUL.position.x &&
                        battler.SOUL.position.x <= this.position.x + this.size.x + 8 &&
                        this.position.y - 8 <= battler.SOUL.position.y &&
                        battler.SOUL.position.y <= this.position.y + this.size.y + 8
                     ) {
                        this.position.y = this.position.y === 5 ? 179 : 5;
                     }
                  });
                  infobox.priority.value = 2000;
                  renderer.attach('menu', infobox);
                  game.movement = true;
                  battler.SOUL.alpha.value = 1;
                  const hitboxes = [
                     [ 'hat', { x: 145, y: 4 }, { x: 24, y: 21 } ],
                     [ 'hat', { x: 169, y: 4 }, { x: 5, y: 42 } ],
                     [ 'hat', { x: 174, y: 27 }, { x: 9, y: 11 } ],
                     [ 'face', { x: 150, y: 25 }, { x: 19, y: 24 } ],
                     [ 'shoulders', { x: 135, y: 48 }, { x: 10, y: 16 } ],
                     [ 'shoulders', { x: 173, y: 50 }, { x: 17, y: 18 } ],
                     [ 'neck', { x: 146, y: 49 }, { x: 27, y: 7 } ],
                     [ 'shirt', { x: 146, y: 56 }, { x: 27, y: 17 } ],
                     [ 'arms', { x: 126, y: 64 }, { x: 15, y: 16 } ],
                     [ 'arms', { x: 141, y: 68 }, { x: 5, y: 7 } ],
                     [ 'arms', { x: 179, y: 69 }, { x: 6, y: 8 } ],
                     [ 'arms', { x: 174, y: 77 }, { x: 17, y: 13 } ],
                     [ 'gloves', { x: 141, y: 75 }, { x: 8, y: 7 } ],
                     [ 'gloves', { x: 137, y: 80 }, { x: 10, y: 6 } ],
                     [ 'gloves', { x: 177, y: 90 }, { x: 15, y: 9 } ],
                     [ 'amogus', { x: 149, y: 75 }, { x: 22, y: 8 } ],
                     [ 'amogus', { x: 147, y: 82 }, { x: 26, y: 4 } ],
                     [ 'amogus', { x: 145, y: 86 }, { x: 29, y: 9 } ],
                     [ 'legs', { x: 141, y: 97 }, { x: 7, y: 11 } ],
                     [ 'legs', { x: 148, y: 95 }, { x: 11, y: 19 } ],
                     [ 'legs', { x: 161, y: 95 }, { x: 11, y: 20 } ],
                     [ 'legs', { x: 172, y: 100 }, { x: 7, y: 9 } ],
                     [ 'shoes', { x: 140, y: 109 }, { x: 8, y: 5 } ],
                     [ 'shoes', { x: 133, y: 114 }, { x: 21, y: 7 } ],
                     [ 'shoes', { x: 172, y: 110 }, { x: 8, y: 5 } ],
                     [ 'shoes', { x: 165, y: 115 }, { x: 22, y: 7 } ],
                     [ 'lv', { x: 100, y: 200 }, { x: 37, y: 10 } ],
                     [
                        'hp',
                        { x: 137, y: 200 },
                        {
                           x: 73 + Math.max(SAVE.data.n.hp === Infinity ? calcHP() : SAVE.data.n.hp, calcHP()) * 0.6,
                           y: 10
                        }
                     ]
                  ] as [string, CosmosPointSimple, CosmosPointSimple][];
                  let edged = 0;
                  const checked = [] as string[];
                  checker: while (true) {
                     await Promise.race([
                        keys.interactKey.on('down'),
                        ...(edged === 0
                           ? [
                                renderer.when(() => {
                                   if (
                                      battler.SOUL.position.x <= 1.5 ||
                                      318.5 <= battler.SOUL.position.x ||
                                      battler.SOUL.position.y <= 1.5 ||
                                      238.5 <= battler.SOUL.position.y
                                   ) {
                                      edged = 1;
                                      return true;
                                   }
                                   return false;
                                })
                             ]
                           : [])
                     ]);
                     if (edged === 1) {
                        edged = 2;
                        game.movement = false;
                        infobox.alpha.value = 0;
                        await papchat(...text.a_starton.papdate25a);
                        game.movement = true;
                        infobox.alpha.value = 1;
                        continue;
                     }
                     for (const subject of hitboxes) {
                        const [ key, position, size ] = subject;
                        if (
                           !checked.includes(key) &&
                           battler.SOUL.position.x > position.x &&
                           battler.SOUL.position.y > position.y &&
                           battler.SOUL.position.x < position.x + size.x &&
                           battler.SOUL.position.y < position.y + size.y
                        ) {
                           checked.push(key);
                           sounds.bell.instance(renderer);
                           game.movement = false;
                           battler.SOUL.alpha.value = 0;
                           if (key === 'hat') {
                              renderer.detach('menu', infobox);
                              break checker;
                           } else {
                              infobox.alpha.value = 0;
                              switch (key) {
                                 case 'face':
                                    await papchat(...text.a_starton.papdate25i);
                                    break;
                                 case 'shoulders':
                                    await papchat(...text.a_starton.papdate25h());
                                    break;
                                 case 'neck':
                                    await papchat(...text.a_starton.papdate25l);
                                    break;
                                 case 'shirt':
                                    await papchat(...text.a_starton.papdate25b);
                                    break;
                                 case 'arms':
                                    await papchat(...text.a_starton.papdate25c);
                                    break;
                                 case 'gloves':
                                    await papchat(...text.a_starton.papdate25d);
                                    break;
                                 case 'amogus':
                                    await papchat(...text.a_starton.papdate25g);
                                    break;
                                 case 'legs':
                                    await papchat(...text.a_starton.papdate25e);
                                    break;
                                 case 'shoes':
                                    await papchat(...text.a_starton.papdate25f);
                                    break;
                                 case 'lv':
                                    await papchat(...text.a_starton.papdate25j());
                                    break;
                                 case 'hp':
                                    await papchat(...text.a_starton.papdate25k());
                                    break;
                              }
                              infobox.alpha.value = 1;
                           }
                           game.movement = true;
                           battler.SOUL.alpha.value = 1;
                           break;
                        }
                     }
                  }
                  await papchat(...text.a_starton.papdate25);
                  await Promise.all([
                     hatty.position.modulate(renderer, 500, hatty.position.subtract(0, 12)),
                     hatty_b.position.modulate(renderer, 500, hatty_b.position.subtract(0, 12)),
                     battler.box.size.modulate(renderer, 1000, { x: 282.5, y: 65 }),
                     battler.box.position.modulate(renderer, 1000, { x: 160, y: 160 })
                  ]);
                  atlas.navigators.of('battlerSimple').objects[1].priority.value = 0;
                  await papchat(...text.a_starton.papdate26());
                  await battler.human(...text.a_starton.papdate27());
                  if (choicer.result === 1) {
                     await papchat(...text.a_starton.papdate28);
                  }
                  gifty.index = 1;
                  sounds.equip.instance(renderer);
                  await renderer.pause(850);
                  await papchat(...text.a_starton.papdate29);
                  await battler.human(...text.a_starton.papdate30());
                  datemusic4.gain.modulate(renderer, 1500, 0).then(() => {
                     datemusic4.stop();
                     content.amDatingtense.unload();
                  });
                  await papchat(...[ text.a_starton.papdate31a, text.a_starton.papdate31b ][choicer.result]);
                  const datemusic5 = music.datingfight.instance(renderer);
                  datePower.position = new CosmosPoint(300, 100);
                  datePower.position.modulate(renderer, 2000, { x: 260, y: 100 }, { x: 260, y: 100 });
                  await papchat(...text.a_starton.papdate32());
                  await battler.human(...text.a_starton.papdate33());
                  if (choicer.result === 0) {
                     await battler.human(...text.a_starton.papdate33a());
                  }
                  await papchat(...[ text.a_starton.papdate34a, text.a_starton.papdate34b ][choicer.result]());
                  sizeX.modulate(renderer, 1000, 100 / 2);
                  override = faces.papyrusBattleOwwie;
                  sstriker();
                  papchat(...text.a_starton.papdate35);
                  await renderer.pause(1650);
                  sizeX.modulate(renderer, 1000, 120 / 2);
                  sstriker();
                  papchat(...text.a_starton.papdate36);
                  sizeX.modulate(renderer, 4000, 200 / 2);
                  await renderer.pause(1650);
                  sstriker();
                  papchat(...text.a_starton.papdate37);
                  const fader = new CosmosRectangle({
                     alpha: 0,
                     fill: 0xffffff,
                     priority: 2,
                     size: { x: 320, y: 240 },
                     stroke: -1,
                     objects: [
                        new CosmosText({
                           alpha: 0,
                           fill: 0,
                           position: { x: 70, y: 100 },
                           stroke: -1,
                           fontFamily: content.fPapyrus,
                           fontSize: 14,
                           spacing: { x: 1, y: 2 }
                        }).on('tick', function () {
                           this.content = game.text;
                        })
                     ]
                  });
                  renderer.attach('menu', fader);
                  datemusic5.gain.modulate(renderer, 3500, 0).then(() => {
                     datemusic5.stop();
                     content.amDatingfight.unload();
                  });
                  await fader.alpha.modulate(renderer, 4500, 1);
                  game.text = '';
                  await renderer.pause(500);
                  if (SAVE.data.b.flirt_papyrus) {
                     override = faces.papyrusBattleNooo;
                  } else {
                     override = faces.papyrusBattleSide;
                  }
                  fader.objects[0].alpha.value = 1;
                  renderer.detach('menu', datePower);
                  atlas.switch('dialoguerBase');
                  await dialogue_primitive(...text.a_starton.papdate38());
                  hatty.position.y += 12;
                  hatty_b.position.y += 12;
                  datepaps.detach(gifty);
                  fader.objects[0].alpha.value = 0;
                  atlas.switch('battlerSimple');
                  await fader.alpha.modulate(renderer, 3000, 0);
                  game.text = '';
                  await renderer.pause(500);
                  await papchat(...text.a_starton.papdate39());
                  const datemusic6 = music.datingstart.instance(renderer);
                  await papchat(...text.a_starton.papdate39a());
                  datemusic6.gain.modulate(renderer, 1500, 0).then(() => {
                     datemusic6.stop();
                     content.amDatingstart.unload();
                  });
                  while ((datepaps.position.x += 10) < 325) {
                     await renderer.on('tick');
                  }
                  datepaps.use(content.ibcPapyrusBattle);
                  datepaps.position.x += 5;
                  datepaps.position.y += 11;
                  face.position.x -= 5;
                  face.position.y -= 11;
                  datepaps.detach(hatty, hatty_b);
                  await renderer.pause(850);
                  datepaps.position.x = 320;
                  while ((datepaps.position.x -= 10) > 130) {
                     await renderer.on('tick');
                  }
                  datepaps.position.x = 130;
                  await papchat(...text.a_starton.papdate40());
                  while ((datepaps.position.x += 10) < 320) {
                     await renderer.on('tick');
                  }
                  datepaps.position.x = 330;
                  fader.fill = 0;
                  await fader.alpha.modulate(renderer, 300, 1);
                  renderer.detach('menu', datepaps);
                  speech.holders.splice(speech.holders.indexOf(holder), 1);
                  atlas.switch(null);
                  atlas.detach(renderer, 'menu', 'battlerSimple');
                  battler.active = false;
                  fader.alpha.modulate(renderer, 300, 0).then(() => {
                     renderer.detach('menu', fader);
                  });
                  readAssets.unload();
                  styleAssets.unload();
                  content.asBell.unload();
                  content.asSwallow.unload();
                  roomState.dateAssets.unload();
                  inventories.battleAssets.unload();
                  if (!SAVE.data.b.oops) {
                     await renderer.pause(1000);
                     await dialogue('auto', ...text.a_starton.truetext.papdate());
                  }
               } else {
                  await dialogue('auto', ...text.a_starton.papdate5b);
               }
               game.movement = true;
               break;
            }
            game.movement = false;
            await dialogue('auto', ...text.a_starton.papdate1());
            const paps = roomState.paps as CosmosCharacter;
            paps.metadata.override = true;
            if (player.face === 'up') {
               await paps.walk(renderer, 4, { x: paps.position.x - 21 });
            }
            await Promise.all([
               renderer
                  .when(() => player.position.x - paps.position.x > 30)
                  .then(async () => {
                     await player.walk(renderer, 4, { x: 250, y: 230 }, { y: 10 });
                  }),
               paps.walk(renderer, 4, { x: 250, y: 230 }, { y: 10 }).then(async () => {
                  await paps.alpha.modulate(renderer, 300, 0);
                  paps.alpha.value = 0;
               })
            ]);
            await startonScript('townswap');
            startonScript('tick');
            paps.alpha.value = 1;
            paps.position = new CosmosPoint(player.position.subtract(0, 30));
            await Promise.all([
               player.walk(renderer, 4, { y: 150 }, { x: 750 }, { y: 370 }),
               paps.walk(renderer, 4, { y: 150 }, { x: 750 }, { y: 370 }).then(async () => {
                  await paps.alpha.modulate(renderer, 300, 0);
                  paps.alpha.value = 0;
               })
            ]);
            await startonScript('townswap');
            startonScript('tick');
            paps.alpha.value = 1;
            paps.position = new CosmosPoint(player.position.add(0, 30));
            await Promise.all([
               player.walk(renderer, 4, { y: 230 }, { x: 665 }),
               paps.walk(renderer, 4, { y: 230 }, { x: 635 })
            ]);
            await renderer.pause(850);
            await dialogue('auto', ...text.a_starton.papdate2);
            SAVE.data.n.plot_date = 0.1;
            game.movement = true;
            await paps.walk(renderer, 5, { y: 185 });
            await Promise.race([ paps.alpha.modulate(renderer, 300, 0), events.on('teleport') ]);
            renderer.detach('main', paps);
            break;
         }
         case 'paproom': {
            if (!game.movement) {
               return;
            }
            game.movement = false;
            const paps = roomState.paps as CosmosCharacter;
            if (dateready() && SAVE.data.n.state_starton_papyrus === 0) {
               await dialogue('auto', ...text.a_starton.papdate4());
               if (choicer.result === 0) {
                  SAVE.data.n.plot_date = 0.2;
                  await dialogue('auto', ...text.a_starton.papdate4a);
                  paps.metadata.override = true;
                  player.walk(renderer, 3, { x: 80, y: 75 }).then(() => {
                     player.face = 'left';
                  });
                  await paps.walk(renderer, 4, { x: 50, y: 60 });
                  sounds.doorClose.instance(renderer);
                  Promise.race([ paps.alpha.modulate(renderer, 300, 0), events.on('teleport') ]).then(() => {
                     renderer.detach('main', paps);
                  });
               } else {
                  await dialogue('auto', ...text.a_starton.papdate4b);
                  player.position.y += 3;
                  player.face = 'down';
               }
            } else {
               await teleport('s_papyrusroom', 'up', 220, 230, world);
            }
            game.movement = true;
            break;
         }
         case 'papexit': {
            if (SAVE.data.n.plot_date === 1) {
               SAVE.data.n.plot_date = 1.1;
            }
            await teleport('s_bonehouse', 'down', 52, 65, world);
            break;
         }
         case 'papbooks': {
            await dialogue('auto', ...text.a_starton.papbooks1());
            if (!SAVE.data.b.svr) {
               await dialogue('auto', ...text.a_starton.papbooks2());
            }
            break;
         }
         case 'papcomputer': {
            if (!game.movement) {
               return;
            }
            game.movement = false;
            for (const object of instance('main', 'papcomputer')!.object.objects) {
               if (object instanceof CosmosAnimation) {
                  if (!postSIGMA()) {
                     object.index = 1;
                     sounds.select.instance(renderer).rate.value = 0.6;
                  }
                  await dialogue('auto', ...text.a_starton.papcomputer1());
                  if (postSIGMA()) {
                     break;
                  }
                  if (choicer.result === 0) {
                     const outernet = new CosmosObject({
                        fill: 0xffffff,
                        stroke: -1,
                        fontFamily: content.fCryptOfTomorrow,
                        fontSize: 8,
                        objects: [
                           new CosmosSprite({ scale: 0.5, frames: [ content.iooSOuternet ] }),
                           new CosmosAnimation({
                              position: new CosmosPoint({ x: 44, y: 37 }).divide(2),
                              resources: content.idcPapyrusAyoo
                           }),
                           new CosmosText({
                              anchor: { x: 0, y: -1 },
                              position: new CosmosPoint({ x: 99, y: 161 }).divide(2),
                              content: text.a_starton.papcomputer3.a
                           }),
                           new CosmosText({
                              anchor: { x: 0, y: -1 },
                              fill: 0x808080,
                              position: new CosmosPoint({ x: 99, y: 176 }).divide(2),
                              content: text.a_starton.papcomputer3.b
                           }),
                           new CosmosText({
                              position: new CosmosPoint({ x: 32, y: 239 }).divide(2),
                              fontFamily: content.fPapyrus,
                              fontSize: 8,
                              spacing: { y: -0.5 },
                              content: text.a_starton.papcomputer3.c
                           }),
                           new CosmosText({
                              anchor: { x: 0, y: -1 },
                              position: new CosmosPoint({ x: 541, y: 124 }).divide(2),
                              fontFamily: content.fDiaryOfAn8BitMage,
                              fontSize: 10,
                              spacing: { x: -0.5 },
                              content: text.a_starton.papcomputer3.d
                           }),
                           new CosmosText({
                              fill: 0x808080,
                              position: { x: 236, y: 72 },
                              fontFamily: content.fDeterminationMono,
                              fontSize: 8,
                              content: text.a_starton.papcomputer3.e()
                           }),
                           ...text.a_starton.papcomputer5().map(
                              (value, index) =>
                                 new CosmosText({
                                    anchor: 0,
                                    position: { x: 260.5, y: 136.5 + index * 22.5 },
                                    fontFamily: content.fCryptOfTomorrow,
                                    fontSize: 8,
                                    content: value
                                 })
                           ),
                           ...CosmosUtils.populate(
                              4,
                              index =>
                                 new CosmosObject({
                                    position: { x: 104, y: Math.max(16 + index * 60, 36) + 2 },
                                    objects: [
                                       new CosmosText({
                                          fontFamily: content.fDiaryOfAn8BitMage,
                                          fontSize: 10,
                                          position: { y: 2 },
                                          spacing: { x: -0.5 },
                                          content: CosmosUtils.provide(text.a_starton.papcomputer4[index]).a
                                       }),
                                       new CosmosText({
                                          fill: 0x808080,
                                          position: { y: 11, x: -1 },
                                          fontFamily: content.fCryptOfTomorrow,
                                          fontSize: 8,
                                          content: CosmosUtils.provide(text.a_starton.papcomputer4[index]).b
                                       }),
                                       new CosmosText({
                                          position: { y: 20, x: 0.5 },
                                          fontFamily:
                                             CosmosUtils.provide(text.a_starton.papcomputer4[index]).d === true
                                                ? content.fComicSans
                                                : content.fDeterminationMono,
                                          fontSize: 8,
                                          content: CosmosUtils.provide(text.a_starton.papcomputer4[index]).c
                                       })
                                    ]
                                 })
                           )
                        ]
                     });
                     renderer.attach('menu', outernet);
                     object.index = 0;
                     await renderer.pause(500);
                     await keys.specialKey.on('down');
                     renderer.detach('menu', outernet);
                  } else {
                     object.index = 0;
                     await dialogue('auto', ...text.a_starton.papcomputer2);
                  }
                  break;
               }
            }
            game.movement = true;
            break;
         }
         case 'exit': {
            if (SAVE.data.n.plot < 32) {
               SAVE.data.n.plot = 32;
            }
            teleport('f_start', 'up', 160, 490, world);
            break;
         }
         case 'greatdog': {
            if (!game.movement) {
               return;
            }
            game.movement = false;
            const doggie = instance('main', 'g_greatdog')?.object.objects[0] as CosmosAnimation;
            doggie.index += 1;
            if (roomState.customs) {
               roomState.customs.rate.value = 0;
            } else if (game.music) {
               game.music.rate.value = 0;
            }
            await renderer.pause(450);
            doggie.index += 1;
            sounds.boing.instance(renderer);
            await renderer.pause(850);
            doggie.index -= 2;
            if (roomState.customs) {
               roomState.customs.rate.value = roomState.customs.daemon.rate;
            } else if (game.music) {
               game.music.rate.value = world.ambiance;
            }
            game.movement = true;
            break;
         }
         case 'emptytable': {
            if (!instance('main', 'tabler')) {
               await dialogue(
                  'auto',
                  ...(game.room === 's_librarby' ? text.a_starton.emptytable1() : text.a_starton.emptytable2())
               );
            }
            break;
         }
         case 'bunbun': {
            game.movement &&
               world.population > 0 &&
               !SAVE.data.b.svr &&
               !world.runaway &&
               (await dialogue('auto', ...text.a_starton.bunbun()));
            break;
         }
         case 'vegetoid': {
            if (game.movement) {
               game.movement = false;
               const ani = instance('main', 's_vegetoid')!.object.objects[0] as CosmosAnimation;
               if (ani.index === 3) {
                  await dialogue('auto', ...text.a_starton.vegetoidx());
               } else {
                  ani.index = 1;
                  ani.reverse = false;
                  ani.enable();
                  await renderer.when(() => ani.index === 2);
                  ani.disable();
                  ani.step = 0;
                  await dialogue('auto', ...text.a_starton.vegetoid());
                  ani.index = 1;
                  ani.reverse = true;
                  ani.enable();
                  await renderer.when(() => ani.index === 0);
                  ani.reset();
               }
               game.movement = true;
            }
            break;
         }
         case 'teleportpad': {
            if (!game.movement || player.face !== 'up') {
               return;
            }
            if (SAVE.data.b.svr || postSIGMA()) {
               await dialogue('auto', ...text.a_starton.noteleport);
               return;
            }
            game.movement = false;
            const ob1 = instance('main', 'teleportpad')!.object;
            const far = Math.abs(player.position.x - ob1.position.x) > 5;
            await player.walk(renderer, 3, { x: ob1.position.x });
            far && (await renderer.pause(450));
            player.priority.value = ob1.position.y + 1;
            await player.walk(renderer, 1, { y: ob1.position.y - 11 });
            await renderer.pause(300);
            sounds.phase.instance(renderer);
            player.scale.modulate(renderer, 125, { x: 1.05, y: 1 }).then(() => {
               player.scale.modulate(renderer, 50, { x: 0, y: 1 });
            });
            await player.alpha.modulate(renderer, 100, 0.8);
            player.alpha.value = 0;
            await renderer.pause(40);
            player.alpha.value = 1;
            await renderer.pause(35);
            await startonScript('townswap');
            startonScript('tick');
            const ob2 = instance('main', 'teleportpad')!.object;
            player.priority.value = ob2.position.y + 1;
            player.position.set(ob2.position.subtract(0, 11));
            player.face = 'up';
            await renderer.pause(450);
            sounds.dephase.instance(renderer);
            player.scale.modulate(renderer, 50, { x: 1.05, y: 1 }).then(() => {
               player.scale.modulate(renderer, 125, { x: 1, y: 1 });
            });
            await renderer.pause(35);
            player.alpha.value = 0;
            await renderer.pause(40);
            player.alpha.value = 0.8;
            await player.alpha.modulate(renderer, 100, 1);
            await renderer.pause(300);
            await player.walk(renderer, 1, { y: ob2.position.y + 11 });
            player.priority.value = 0;
            game.movement = true;
            break;
         }
         case 'gravometric': {
            if (!game.movement) {
               return;
            }
            if (!SAVE.data.b.inverter_key) {
               await dialogue('auto', ...text.a_starton.gravo1());
               return;
            }
            if (SAVE.data.n.plot === 72) {
               await dialogue('auto', ...text.a_starton.gravo3());
               return;
            }
            game.movement = false;
            const ob1_y = 380;
            const ob2_y = 200;
            if (player.metadata.reverse) {
               player.metadata.reverse = false;
               const far = Math.abs(player.position.x - 415) > 5;
               await player.walk(renderer, 3, { x: 415 });
               far && (await renderer.pause(450));
               player.priority.value = ob1_y + 1;
               await player.walk(renderer, 1, { y: ob2_y + 11 });
               await renderer.pause(300);
               sounds.equip.instance(renderer).rate.value = 1.25;
               player.position.y += 15;
               player.anchor.y = 0;
               player.sprite.anchor.y = 0;
               player.rotation.modulate(renderer, 1100, 180, 180, 180, -5).then(async () => {
                  await player.rotation.modulate(renderer, 250, -5, 2);
                  await player.rotation.modulate(renderer, 100, 2, 0);
               });
               const reg = rooms.of(game.room).region as CosmosRegion;
               await Promise.all([
                  renderer.pause(350).then(async () => {
                     await player.position.modulate(
                        renderer,
                        1750,
                        { y: player.position.y },
                        { y: player.position.y },
                        { y: ob1_y - 26 },
                        { y: ob1_y - 26 },
                        { y: ob1_y - 26 }
                     );
                     player.position.y += 15;
                     player.anchor.y = 1;
                     player.sprite.anchor.y = 1;
                  }),
                  renderer.pause(500).then(async () => {
                     const cam = new CosmosObject({ position: player.position.clamp(...renderer.region) });
                     game.camera = cam;
                     renderer.region[1].y = reg[1].y;
                     await cam.position.modulate(
                        renderer,
                        1000,
                        { y: cam.position.y },
                        { y: reg[0].y },
                        { y: reg[0].y }
                     );
                     await renderer.pause(500);
                  })
               ]);
               player.face = 'down';
               player.sprite.enable();
               await player.walk(renderer, 1, { y: ob1_y + 3 });
               player.sprite.reset();
               game.camera = player;
               player.priority.value = 0;
               game.movement = true;
               renderer.region[0].x = reg[0].x;
               renderer.region[0].y = reg[0].y;
               renderer.region[1].x = reg[1].x;
            } else {
               const far = Math.abs(player.position.x - 415) > 5;
               await player.walk(renderer, 3, { x: 415 });
               far && (await renderer.pause(450));
               player.priority.value = ob1_y + 1;
               await player.walk(renderer, 1, { y: ob1_y - 11 });
               await renderer.pause(300);
               if (!SAVE.data.b.s_state_inverter) {
                  SAVE.data.b.s_state_inverter = true;
                  await dialogue('auto', ...text.a_starton.gravo2);
               }
               sounds.equip.instance(renderer).rate.value = 1.25;
               player.position.y -= 15;
               player.anchor.y = 0;
               player.sprite.anchor.y = 0;
               player.position
                  .modulate(
                     renderer,
                     1750,
                     { y: player.position.y },
                     { y: player.position.y },
                     { y: ob2_y + 26 },
                     { y: ob2_y + 26 },
                     { y: ob2_y + 26 }
                  )
                  .then(() => {
                     player.position.y -= 15;
                     player.anchor.y = 1;
                     player.sprite.anchor.y = 1;
                  });
               renderer.pause(150).then(async () => {
                  await player.rotation.modulate(renderer, 1100, 0, 0, 0, 185);
                  await player.rotation.modulate(renderer, 250, 185, 178);
                  await player.rotation.modulate(renderer, 100, 178, 180);
               });
               await renderer.pause(500);
               const cam = new CosmosObject({ position: player.position.clamp(...renderer.region) });
               game.camera = cam;
               renderer.region[0].y = -Infinity;
               const sandy =
                  SAVE.data.n.state_starton_trashprogress < 1
                     ? character(
                          'sans',
                          {
                             walk: {
                                up: characters.sans.walk.up,
                                down: characters.sans.walk.down,
                                left: characters.sans.walk.right,
                                right: characters.sans.walk.left
                             },
                             talk: {
                                up: characters.sans.talk.up,
                                down: characters.sans.talk.down,
                                left: characters.sans.talk.right,
                                right: characters.sans.talk.left
                             }
                          },
                          { x: 500, y: ob2_y - 3 },
                          'left',
                          { rotation: 180, priority: 999 }
                       ).on('tick', function () {
                          this.alpha.value = game.room === 's_sans' ? 1 : 0;
                       })
                     : null;
               await cam.position.modulate(renderer, 1000, { y: cam.position.y }, { y: 120 }, { y: 120 });
               await renderer.pause(500);
               player.face = 'down';
               player.sprite.enable();
               await player.walk(renderer, 1, { y: ob2_y - 3 });
               player.sprite.reset();
               game.camera = player;
               aussieregion();
               player.metadata.reverse = true;
               if (sandy) {
                  await dialogue('auto', ...text.a_starton.aussie());
                  await sandy.walk(renderer, 3, { x: 560 }, { y: 125 });
                  sandy.face = 'down';
                  await renderer.pause(1000);
                  await dialogue('auto', ...text.a_starton.aussie());
                  SAVE.data.n.state_starton_trashprogress = 1;
                  sandy.walk(renderer, 3, { x: 590 }).then(() => {
                     sandy.face = 'up';
                     renderer.detach('main', sandy);
                     instance('main', 'aussiesans')!.object.alpha.value = 1;
                  });
               }
               game.movement = true;
            }
            break;
         }
         case 'whew': {
            if (!game.movement) {
               return;
            }
            game.movement = false;
            await dialogue('auto', ...text.a_starton.whew1());
            if (3 <= SAVE.data.n.state_papyrus_capture) {
               if (choicer.result === 0) {
                  await dialogue('auto', ...text.a_starton.whew2);
               } else {
                  rooms.of(game.room).neighbors.push('c_asgore_asriel');
                  await dialogue('auto', ...text.a_starton.whew3);
                  const fd = fader();
                  await fd.alpha.modulate(renderer, 1000, 1);
                  await renderer.pause(3000);
                  await dialogue('auto', ...text.a_starton.whew4);
                  await renderer.pause(2000);
                  await dialogue('auto', ...text.a_starton.whew5);
                  SAVE.data.b.nk_mushketeer = true;
                  SAVE.data.n.plot = 70;
                  SAVE.data.b.ultrashortcut = true;
                  await Promise.all([
                     renderer.pause(1000),
                     teleport('c_asgore_asriel', 'down', 221, 137, { fade: false, fast: true })
                  ]);
                  instance('below', 'ultranote')!.object.alpha.value = 0;
                  const bedcover = new CosmosSprite({
                     position: { x: 206, y: 119 },
                     frames: [ content.iooCAsgoreAsrielOver ]
                  });
                  renderer.attach('above', bedcover);
                  await fd.alpha.modulate(renderer, 1000, 0);
                  await renderer.pause(2000);
                  await fd.alpha.modulate(renderer, 1000, 1);
                  SAVE.data.n.hp = Math.max(SAVE.data.n.hp, Math.min(calcHP() + calcBonusHP(), 99));
                  renderer.detach('above', bedcover);
                  player.position.x = 195;
                  player.face = 'left';
                  for (const e of tracker.history) {
                     e[0] = player.face;
                     e[1].x = player.position.x;
                     e[1].y = player.position.y;
                  }
                  await renderer.pause(2000);
                  game.movement = true;
                  instance('below', 'ultranote')!.object.alpha.value = 1;
                  await fd.alpha.modulate(renderer, 300, 0);
                  renderer.detach('menu', fd);
                  if (!SAVE.data.b.oops) {
                     await dialogue('auto', ...text.a_starton.whew6);
                  }
               }
            }
            game.movement = true;
            break;
         }
      }
   }
};

const shops = {
   hare: new OutertaleShop({
      background: new CosmosSprite({ frames: [ content.isHareBackground ] }),
      async handler () {
         if (atlas.target === 'shop') {
            if (shopper.index === 1) {
               if (shops.hare.vars.sell || SAVE.data.b.steal_hare) {
                  await shopper.text(...text.n_shop_hare.sell2());
               } else {
                  shops.hare.vars.sell = true;
                  if (world.population === 0 || world.runaway) {
                     saver.gold += 758;
                     SAVE.data.b.steal_hare = true;
                  }
                  await shopper.text(...text.n_shop_hare.sell1());
               }
            } else if (shopper.index === 3) {
               if (!(world.population === 0 || world.runaway)) {
                  atlas.switch('shopText');
                  await dialogue_primitive(...text.n_shop_hare.exit);
               } else {
                  game.text = '';
                  atlas.switch('shopText');
               }
               const mus = shops.hare.music?.instances.slice(-1)[0];
               await Promise.all([
                  renderer.alpha.modulate(renderer, 300, 0),
                  mus?.gain.modulate(renderer, 300, 0).then(() => {
                     mus.stop();
                  })
               ]);
               atlas.switch(null);
               renderer.alpha.modulate(renderer, 300, 1);
            } else if ((world.population === 0 || world.runaway) && shopper.index === 2) {
               await shopper.text(...text.n_shop_hare.note());
            } else {
               atlas.switch('shopList');
            }
         } else if (atlas.target === 'shopList') {
            if (shopper.listIndex === 4) {
               atlas.switch('shop');
            } else if (shopper.index === 0) {
               atlas.switch('shopPurchase');
            } else {
               await shopper.text(...text.n_shop_hare.talkText[shopper.listIndex]());
            }
         }
      },
      keeper: new CosmosAnimation({
         position: { x: 160, y: 120 },
         anchor: { x: 0, y: 1 },
         resources: content.isHareKeeper
      }),
      music: music.shop,
      options () {
         if (atlas.target === 'shop') {
            return text.n_shop_hare.menu();
         } else if (shopper.index === 0) {
            return text.n_shop_hare.item();
         } else {
            return text.n_shop_hare.talk();
         }
      },
      preset (index) {
         shops.hare.keeper.index = index;
      },
      price () {
         return SAVE.data.n.plot === 72
            ? [ 10, SAVE.data.b.item_eye ? 10 : 20, 8, 5 ][shopper.listIndex]
            : [ 30, SAVE.data.b.item_eye ? 30 : 40, 28, 20 ][shopper.listIndex];
      },
      prompt () {
         return text.n_shop_hare.itemPurchasePrompt();
      },
      purchase (buy) {
         let success = false;
         if (buy) {
            if (SAVE.storage.inventory.size < 8) {
               if (world.population === 0 || world.runaway) {
                  success = true;
               } else {
                  const price = CosmosUtils.provide(shops.hare.price);
                  if (saver.gold < price) {
                     shops.hare.vars.purchase = 3;
                  } else {
                     shops.hare.vars.purchase = 1;
                     saver.gold -= price;
                     success = true;
                  }
               }
            } else {
               shops.hare.vars.purchase = 4;
            }
         } else if (world.population > 0) {
            shops.hare.vars.purchase = 2;
         }
         if (success) {
            world.population === 0 || world.runaway
               ? sounds.grab.instance(renderer)
               : sounds.purchase.instance(renderer);
            const item = [ 'glove_x', SAVE.data.b.item_eye ? 'eye_x' : 'eye', 'pop', 'swirl' ][shopper.listIndex];
            saver.add(item);
            if (item === 'eye') {
               SAVE.data.b.item_eye = true;
            }
         }
      },
      size () {
         if (atlas.target === 'shop') {
            return 4;
         } else {
            return 5;
         }
      },
      status () {
         if (shops.hare.vars.purchase || 0 > 0) {
            const purchaseValue = shops.hare.vars.purchase as number;
            shops.hare.vars.purchase = 0;
            if ((world.population === 0 || world.runaway) && purchaseValue < 4) {
               return text.n_shop_hare.zeroPrompt;
            } else {
               return text.n_shop_hare.itemPurchase[purchaseValue - 1];
            }
         } else if (atlas.target === 'shop') {
            if (world.population === 0 || world.runaway) {
               return text.n_shop_hare.menuPrompt3();
            } else if (shops.hare.vars.idle) {
               return text.n_shop_hare.menuPrompt2;
            } else {
               shops.hare.vars.idle = true;
               return text.n_shop_hare.menuPrompt1;
            }
         } else if (world.population === 0 || world.runaway) {
            return text.n_shop_hare.zeroPrompt;
         } else if (shopper.index === 0) {
            return text.n_shop_hare.itemPrompt;
         } else {
            return text.n_shop_hare.talkPrompt;
         }
      },
      tooltip () {
         if ([ 'shopList', 'shopPurchase' ].includes(atlas.target!) && shopper.index === 0) {
            if (shopper.listIndex === 4) {
               return null;
            } else {
               const info = items.of(
                  [ 'glove_x', SAVE.data.b.item_eye ? 'eye_x' : 'eye', 'pop', 'swirl' ][shopper.listIndex]
               );
               const calc =
                  info.value -
                  (info.type === 'consumable' || info.type === 'special' ? 0 : items.of(SAVE.data.s[info.type]).value);
               return text.n_shop_hare.itemInfo()[shopper.listIndex].replace('$(x)', `${calc < 0 ? '' : '+'}${calc}`);
            }
         } else {
            return null;
         }
      },
      vars: {}
   }),
   blook: new OutertaleShop({
      background: new CosmosSprite({ frames: [ content.isBlookBackground ] }),
      async handler () {
         if (atlas.target === 'shop') {
            if (shopper.index === 1) {
               if (shops.blook.vars.sell || SAVE.data.b.steal_blook) {
                  await shopper.text(...text.n_shop_blook.sell2());
               } else {
                  shops.blook.vars.sell = true;
                  if (blookGone()) {
                     saver.gold += 42;
                     SAVE.data.b.steal_blook = true;
                  }
                  await shopper.text(...text.n_shop_blook.sell1());
               }
            } else if (shopper.index === 3) {
               if (!blookGone()) {
                  atlas.switch('shopText');
                  await dialogue_primitive(...text.n_shop_blook.exit);
               } else {
                  game.text = '';
                  atlas.switch('shopText');
               }
               const mus = shops.blook.music?.instances.slice(-1)[0];
               await Promise.all([
                  renderer.alpha.modulate(renderer, 300, 0),
                  mus?.gain.modulate(renderer, 300, 0).then(() => {
                     mus.stop();
                  })
               ]);
               atlas.switch(null);
               renderer.alpha.modulate(renderer, 300, 1);
            } else if (blookGone() && shopper.index === 2) {
               await shopper.text(...text.n_shop_blook.note());
            } else {
               atlas.switch('shopList');
            }
         } else if (atlas.target === 'shopList') {
            if (shopper.listIndex === 4) {
               atlas.switch('shop');
            } else if (shopper.index === 0) {
               if (
                  (shopper.listIndex === 0 && blookGone()) ||
                  (shopper.listIndex < 2 &&
                     SAVE.data.b[`item_${[ 'voidy', 'blookpie' ][shopper.listIndex] as 'voidy' | 'blookpie'}`])
               ) {
                  dialogue_primitive(text.n_shop_blook.itemUnavailable());
               } else {
                  atlas.switch('shopPurchase');
               }
            } else {
               await shopper.text(...text.n_shop_blook.talkText[shopper.listIndex]());
            }
         }
      },
      keeper: new CosmosAnimation({
         position: { x: 160, y: 140 },
         anchor: { x: 0, y: 1 },
         scale: { x: 1.5, y: 1.5 },
         resources: content.isBlookKeeper,
         metadata: { time: renderer.time },
         objects: [ new CosmosAnimation({ active: true, anchor: { x: 0, y: 1 }, resources: content.isBlookEyes }) ]
      }).on('tick', function () {
         this.offsets[0].y = CosmosMath.wave(((renderer.time - this.metadata.time) % 4000) / 4000) * -2;
      }),
      music: music.blookShop,
      options () {
         if (atlas.target === 'shop') {
            return text.n_shop_blook.menu();
         } else if (shopper.index === 0) {
            return text.n_shop_blook.item();
         } else {
            return text.n_shop_blook.talk(SAVE.data.s.name || systemsText.general.mystery1);
         }
      },
      preset (index) {
         shops.blook.keeper.index = index;
      },
      price () {
         return SAVE.data.n.plot === 72 ? [ 432, 80, 5, 5 ][shopper.listIndex] : [ 432, 100, 12, 16 ][shopper.listIndex];
      },
      prompt () {
         return text.n_shop_blook.itemPurchasePrompt();
      },
      purchase (buy) {
         let success = false;
         if (buy) {
            if (SAVE.storage.inventory.size < 8) {
               if (blookGone()) {
                  success = true;
               } else {
                  const price = CosmosUtils.provide(shops.blook.price);
                  if (saver.gold < price) {
                     shops.blook.vars.purchase = 3;
                  } else {
                     shops.blook.vars.purchase = 1;
                     saver.gold -= price;
                     success = true;
                  }
               }
            } else {
               shops.blook.vars.purchase = 4;
            }
         } else if (!world.genocide && !world.killed0 && !world.runaway) {
            shops.blook.vars.purchase = 2;
         }
         if (success) {
            blookGone() ? sounds.grab.instance(renderer) : sounds.purchase.instance(renderer);
            const item = [ 'voidy', 'blookpie', 'fruit', 'milkshake' ][shopper.listIndex];
            saver.add(item);
            if (item === 'voidy' || item === 'blookpie') {
               SAVE.data.b[`item_${item}`] = true;
            }
         }
      },
      size () {
         if (atlas.target === 'shop') {
            return 4;
         } else {
            return 5;
         }
      },
      status () {
         if (shops.blook.vars.purchase || 0 > 0) {
            const purchaseValue = shops.blook.vars.purchase as number;
            shops.blook.vars.purchase = 0;
            if (blookGone() && purchaseValue < 4) {
               return text.n_shop_blook.zeroPrompt;
            } else {
               return text.n_shop_blook.itemPurchase[purchaseValue - 1];
            }
         } else if (atlas.target === 'shop') {
            if (blookGone()) {
               return text.n_shop_blook.menuPrompt3();
            } else if (shops.blook.vars.idle) {
               return text.n_shop_blook.menuPrompt2;
            } else {
               shops.blook.vars.idle = true;
               return text.n_shop_blook.menuPrompt1();
            }
         } else if (blookGone()) {
            return text.n_shop_blook.zeroPrompt;
         } else if (shopper.index === 0) {
            return text.n_shop_blook.itemPrompt;
         } else {
            return text.n_shop_blook.talkPrompt;
         }
      },
      tooltip () {
         if ([ 'shopList', 'shopPurchase' ].includes(atlas.target!) && shopper.index === 0) {
            if (shopper.listIndex === 4) {
               return null;
            } else {
               if (
                  (shopper.listIndex === 0 && blookGone()) ||
                  (shopper.listIndex < 2 &&
                     SAVE.data.b[`item_${[ 'voidy', 'blookpie' ][shopper.listIndex] as 'voidy' | 'blookpie'}`])
               ) {
                  return null;
               }
               const info = items.of([ 'voidy', 'blookpie', 'fruit', 'milkshake' ][shopper.listIndex]);
               const calc =
                  info.value -
                  (info.type === 'consumable' || info.type === 'special' ? 0 : items.of(SAVE.data.s[info.type]).value);
               return text.n_shop_blook.itemInfo[shopper.listIndex].replace('$(x)', `${calc < 0 ? '' : '+'}${calc}`);
            }
         } else {
            return null;
         }
      },
      vars: {}
   })
};

events.on('consume', async key => {
   if (key === 'corndog_sword' && battler.active && battler.alive[0].opponent.metadata.corndogger) {
      sounds.swallow.instance(renderer);
      renderer.pause(300).then(() => heal(void 0, sounds.dogsword));
   }
});

events.on('drop', async key => {
   switch (key) {
      case 'chip':
         if (game.room === 's_robot' && player.position.y > 160 && SAVE.data.n.plot !== 72 && !world.runaway) {
            if (SAVE.data.n.state_starton_npc98 === 1) {
               SAVE.data.n.state_starton_npc98 = 4;
            } else if (SAVE.data.n.state_starton_npc98 === 2) {
               SAVE.data.n.state_starton_npc98 = 4.1;
            }
            await dialogue('auto', ...text.a_starton.drop_chip);
            oops();
         }
         break;
      case 'nice_cream':
         if (!noNiceCreamForU()) {
            await dialogue('auto', ...text.a_starton.drop_cream);
         }
         break;
      case 'corndog_sword':
         saver.add('corndog_sword');
         break;
   }
});

events.on('loaded').then(() => {
   SAVE.data.n.state_starton_jukebox > 0 && !postSIGMA() && updateJukebox();
});

events.on('script', (name, ...args) => {
   switch (name) {
      case 'shop':
         if (args[0] === 'hare' || args[0] === 'blook') {
            if (SAVE.data.b.svr) {
               dialogue('auto', ...text.a_starton.shopclosed).then(() => {
                  player.position.y += 3;
                  player.face = 'down';
               });
               return;
            }
            shopper.open(
               shops[args[0]],
               args[1] as CosmosDirection,
               +args[2],
               +args[3],
               (args[0] === 'hare' ? world.population > 0 : !world.genocide && !world.killed0) && !world.runaway
            );
         }
         break;
      case 'starton':
         startonScript(args[0], ...args.slice(1));
         break;
      case 'trivia':
         if (game.movement && game.room[0] === 's') {
            trivia(...CosmosUtils.provide(text.a_starton.trivia[args[0] as keyof typeof text.a_starton.trivia]));
         }
         break;
   }
});

events.on('step', () => {
   if (game.movement && SAVE.data.n.plot < (world.edgy ? 28 : 30) && game.room[0] === 's') {
      const populationfactor = (SAVE.data.n.kills_starton + SAVE.data.n.bully_starton) / world.popmax(0);
      switch (game.room) {
         case 's_sans':
         case 's_crossroads':
         case 's_human':
         case 's_papyrus':
         case 's_doggo':
         case 's_robot':
         case 's_maze':
         case 's_dogs':
         case 's_lesser':
         case 's_spaghetti':
         case 's_bros':
         case 's_puzzle1':
         case 's_puzzle2':
         case 's_jenga':
         case 's_pacing':
         case 's_puzzle3':
         case 's_greater':
            return !!runEncounter(
               populationfactor,
               (() => {
                  switch (game.room) {
                     case 's_sans':
                        return SAVE.data.n.plot < 17.1 || player.position.x < 260 ? 0 : 1;
                     case 's_human':
                        return SAVE.data.n.plot < 18 ? 0 : 1;
                     case 's_papyrus':
                        return !world.genocide && SAVE.data.n.plot < 19 && !world.edgy ? 0 : 1;
                     case 's_doggo':
                        return SAVE.data.n.plot < 19 ? 0 : 1;
                     case 's_maze':
                        return SAVE.data.n.plot < 20 ? 0 : 1;
                     case 's_dogs':
                        return !world.genocide && SAVE.data.n.plot < 20.2 && !world.edgy ? 0 : 1;
                     case 's_lesser':
                        return SAVE.data.n.plot < 20.2 || !noNiceCreamForU() ? 0 : 1;
                     case 's_bros':
                        return SAVE.data.n.plot < 21 ? 0 : 1;
                     case 's_puzzle1':
                        return SAVE.data.n.plot < 23
                           ? 0
                           : SAVE.data.n.plot < 24
                           ? player.position.x < 140
                              ? 1
                              : 0
                           : 1;
                     case 's_puzzle2':
                        return SAVE.data.n.plot < 25 ? 0 : 1;
                     case 's_jenga':
                        return SAVE.data.n.plot < 26 ? 0 : 1;
                     case 's_puzzle3':
                        return SAVE.data.n.plot < 27 ? 0 : 1;
                     case 's_greater':
                        return SAVE.data.n.plot < 28 ? 0 : 1;
                  }
                  return 1;
               })(),
               [
                  [ groups.jerry, 4 ],
                  [ groups.stardrake, 4 ],
                  [ commonGroups.spacetop, 4 ],
                  [ groups.stardrakeSpacetopJerry, 5 ],
                  [ groups.stardrakeSpacetop, 5 ],
                  [ groups.spacetopJerry, 5 ],
                  [ groups.mouse, 5 ]
               ]
            );
         default:
            SAVE.data.n.steps = 0;
            SAVE.data.n.encounters = 0;
            break;
      }
   }
});

events.on('teleport-start', (from, to) => {
   if (to === 's_grillbys' && SAVE.data.n.plot === 72 && SAVE.data.n.state_starton_jukebox > 0 && !postSIGMA()) {
      if (SAVE.data.b.svr) {
         music.uwa.instances[0].gain.modulate(renderer, 300, 0).then(() => music.uwa.stop());
      } else {
         music.reunited.instances[0].gain.modulate(renderer, 300, 0).then(() => music.reunited.stop());
      }
   }
});

events.on('teleport', async (from, to) => {
   if (to in biorooms) {
      renderer.attach('below', biodome);
   } else {
      renderer.detach('below', biodome);
   }
   let index = 0;
   for (const { object } of instances('main', 's_lamp')) {
      if (!object.metadata.randomized) {
         object.metadata.randomized = true;
         (object.objects[0] as CosmosAnimation).index = index++ % 6;
      }
   }
   if (
      [
         'w_coffin',
         'w_toriel_asriel',
         'w_toriel_toriel',
         's_backrooms',
         's_papyrusroom',
         's_sansroom',
         'f_napstablook',
         'f_hapstablook',
         'a_sleeping2',
         'a_sleeping3',
         'c_asgore_asriel',
         'c_asgore_asgore'
      ]
         .map(x => to === x || from === x)
         .includes(true)
   ) {
      [ to, from ].includes('_void') || sounds.doorClose.instance(renderer);
   }
   if (game.room[0] === 's') {
      const holotreesBelow = [ ...instances('below', 'holotree') ];
      const holotreesAbove = [ ...instances('above', 'holotree') ];
      for (const { object } of holotreesAbove) {
         if (object.priority.value === 0) {
            object.offsets[1].y = 20;
         }
      }
      for (const { object } of [ ...holotreesBelow, ...holotreesAbove ]) {
         if (object.priority.value === 0) {
            object.priority.value = -10000 + object.position.y + 1 / (1000 + object.position.x);
            object.on('tick', treeFN);
         }
         object.tint = CosmosImageUtils.gradient(
            0x8ea0f1,
            0x172667,
            Math.min(Math.max(Math.abs(renderer.projection(object, game.camera.position).x - 160) / 160, 0), 1)
         );
         const pos = object.position.add(0, object.priority.value < 0 ? 20 : 0);
         if (
            Math.abs(player.position.x - pos.x) < 60 &&
            Math.abs(player.position.y - pos.y) < 60 &&
            pos.extentOf(player) < 50
         ) {
            object.alpha.value = 0.8;
            object.offsets[0].y = -2;
         } else {
            object.alpha.value = 0.4;
            object.offsets[0].y = 0;
         }
      }
   }
   switch (to) {
      case 's_crossroads': {
         postSIGMA() && (instance('main', 'vending_machine')!.object.objects[0] as CosmosAnimation).reset();
         break;
      }
      case 's_lesser': {
         const inst = instance('main', 's_nicecream');
         const stayCondition =
            SAVE.data.n.state_starton_lesserdog !== 2 &&
            (SAVE.data.n.plot === 72 || 6 <= world.population) &&
            !world.runaway;
         // moved to next area
         if (world.genocide || (SAVE.data.n.plot > 37 && stayCondition)) {
            inst?.destroy();
            instance('below', 'xtrabarrier')?.destroy();
         } else if (inst) {
            const guyanim = inst.object.objects[0] as CosmosAnimation;
            // stayed in current area
            if (stayCondition) {
               // purchased a nice cream
               guyanim.use(
                  SAVE.data.n.state_starton_nicecream < 1 ? content.ionSNicecreamSad : content.ionSNicecreamHappi
               );
            }
            // fled from current area
            else {
               guyanim.use(content.ionSNicecream);
               instance('below', 'xtrabarrier')?.destroy();
            }
         }
         break;
      }
      case 's_human': {
         if (18 <= SAVE.data.n.plot) {
            return;
         } else if (world.edgy) {
            SAVE.data.n.plot = 18;
            return;
         }
         const papyrusLoader = content.amPapyrus.load();
         const sand = temporary(
            character('sans', characters.sans, { x: 290, y: 130 }, 'up', { alpha: world.genocide ? 0 : 1 }),
            'main'
         );
         const paps = temporary(character('papyrus', characters.papyrus, { x: 290, y: 110 }, 'down'), 'main');
         await renderer.when(() => game.room !== 's_human' || (player.position.x > 40 && game.movement));
         if (game.room !== 's_human') {
            return;
         }
         game.movement = false;
         SAVE.data.n.plot = 18;
         game.music?.stop();
         player.face = 'right';
         let spin = false;
         const swapSpeed = new CosmosValue();
         const spinnerListener = () => {
            let tick = 0;
            return function (this: CosmosEntity) {
               if (spin) {
                  this.face = (
                     {
                        left: this === sand ? 'down' : 'up',
                        up: this === sand ? 'left' : 'right',
                        down: this === sand ? 'right' : 'left',
                        right: this === sand ? 'up' : 'down'
                     } as CosmosKeyed<CosmosDirection, CosmosDirection>
                  )[this.face];
               } else if (swapSpeed.value > 0) {
                  if (tick++ > CosmosMath.remap(swapSpeed.value, 30, 0)) {
                     tick = 0;
                     this.face = (
                        {
                           left: this === sand ? 'up' : 'down',
                           up: 'left',
                           down: 'left'
                        } as CosmosKeyed<CosmosDirection, CosmosDirection>
                     )[this.face];
                  }
               }
            };
         };
         sand.on('tick', spinnerListener());
         paps.on('tick', spinnerListener());
         await antifreeze([ papyrusLoader, dialogue('auto', ...text.a_starton.papyrus1) ]);
         const papsMusic = music.papyrus.instance(renderer);
         paps.face = 'left';
         sand.face = 'left';
         await swapSpeed.modulate(renderer, 6e3, 1);
         spin = true;
         await renderer.pause(2000);
         spin = false;
         swapSpeed.value = 0;
         sand.face = 'left';
         paps.face = 'left';
         await renderer.pause(650);
         paps.face = 'down';
         sand.face = 'up';
         await renderer.pause(450);
         await dialogue('auto', ...text.a_starton.papyrus2);
         sand.face = 'left';
         paps.face = 'left';
         await renderer.pause(950);
         await dialogue('auto', ...text.a_starton.papyrus3);
         papsMusic.gain.modulate(renderer, 1500, 0).then(() => {
            papsMusic.stop();
            content.amPapyrus.unload();
         });
         paps.walk(renderer, 4, { x: 310 }).then(async () => {
            await paps.alpha.modulate(renderer, 300, 0);
            renderer.detach('main', paps);
         });
         await dialogue('auto', ...text.a_starton.papyrus4);
         await sand.walk(renderer, 3, player.position.add(25, 0));
         await dialogue('auto', ...text.a_starton.papyrus5);
         sand
            .walk(renderer, 3, { y: player.position.y + (player.position.y < 120 ? 10 : -10), x: 10 })
            .then(async () => {
               await sand.alpha.modulate(renderer, 300, 0);
               renderer.detach('main', sand);
            });
         game.movement = true;
         quickresume();
         break;
      }
      case 's_sans': {
         player.metadata.reverse && aussieregion(true);
         SAVE.data.n.plot > 17 && SAVE.data.n.plot < 17.1 && !world.genocide && sansy();
         switch (SAVE.data.n.state_starton_trashprogress) {
            case 0:
               instance('main', 'aussiesans')!.object.alpha.value = 0;
               break;
            case 2:
               instance('main', 'aussiesans')?.destroy();
               break;
         }
         break;
      }
      case 's_maze': {
         const roomState = (startonStates.rooms.s_maze ??= {});
         if (SAVE.data.n.plot < 20 && !world.genocide) {
            if (!roomState.fired) {
               roomState.fired = true;
               let frame = 0;
               let previousGen: number;
               const cycles = CosmosUtils.populate(7, () => {
                  if (typeof previousGen === 'number') {
                     return (previousGen = (previousGen + rng.overworld.int(5) + 12) % 14);
                  } else {
                     return (previousGen = rng.overworld.int(14));
                  }
               });
               roomState.cycles = cycles;
               for (const fire of instances('main', 'papfire')) {
                  fire.object.metadata.active = true;
                  const anim = fire.object.objects[0] as CosmosAnimation;
                  anim.index = (frame += 4) % 5;
                  const indicies = fire.object.position.subtract(100, 35).divide(20, 10);
                  anim.on('tick', () => {
                     anim.alpha.value =
                        roomState.fail ||
                        !roomState.ablaze ||
                        [ 0, 1, 13 ].includes(Math.abs(cycles[indicies.x] - indicies.y))
                           ? 0
                           : 1;
                  });
                  if (indicies.y === 0) {
                     let shift = 0;
                     fire.object.on('tick', () => {
                        if (++shift === 15) {
                           shift = 0;
                           if (indicies.x % 2 === 0) {
                              if (++cycles[indicies.x] === 14) {
                                 cycles[indicies.x] = 0;
                              }
                           } else {
                              if (--cycles[indicies.x] === -1) {
                                 cycles[indicies.x] = 13;
                              }
                           }
                        }
                     });
                  }
               }
            }
         } else {
            for (const fire of instances('main', 'papfire')) {
               fire.destroy();
            }
         }
         if (SAVE.data.n.plot < 20) {
            const papyrusLoader = !world.genocide && world.edgy ? content.amMuscle.load() : content.amPapyrus.load();
            const sand = temporary(
               character('sans', characters.sans, { x: 270, y: world.edgy ? 100 : 80 }, 'right', {
                  alpha: world.genocide ? 0 : 1
               }),
               'main'
            );
            const paps = temporary(
               character(
                  'papyrus',
                  world.genocide ? characters.papyrusStark : characters.papyrus,
                  { x: 270, y: world.genocide ? 100 : 120 },
                  'right',
                  { alpha: !world.genocide && world.edgy ? 0 : 1 }
               ),
               'main'
            );
            await renderer.when(() => game.room !== 's_maze' || (player.position.x > 50 && game.movement));
            if (game.room !== 's_maze') {
               return;
            }
            game.movement = false;
            game.music?.stop();
            player.face = 'right';
            if (world.genocide) {
               if (SAVE.flag.n.ga_asriel9++ < 1) {
                  await renderer.pause(850);
                  await dialogue('auto', ...text.a_starton.genotext.asriel9);
               }
               await renderer.pause(450);
               goatbro.face = 'right';
               await antifreeze([ papyrusLoader, notifier(paps, true, 45) ]);
               paps.face = 'left';
               const papsMusic = music.papyrus.instance(renderer);
               papsMusic.rate.value = 0.325;
               await renderer.pause(1250);
               await dialogue('auto', ...text.a_starton.genotext.papyrusSolo1a);
               papsMusic.gain.modulate(renderer, 1500, 0).then(() => {
                  papsMusic.stop();
                  content.amPapyrus.unload();
               });
               paps.walk(renderer, 4, { x: 310 }).then(async () => {
                  await paps.alpha.modulate(renderer, 300, 0);
                  renderer.detach('main', paps);
               });
               await renderer.pause(1650);
               await dialogue('auto', ...text.a_starton.genotext.asriel10());
               SAVE.data.n.plot = 20;
               game.movement = true;
               quickresume();
            } else {
               await renderer.pause(450);
               sand.face = 'left';
               paps.face = 'left';
               await antifreeze([ papyrusLoader, renderer.pause(850) ]);
               const papsMusic = world.edgy ? music.muscle.instance(renderer) : music.papyrus.instance(renderer);
               const papListener = world.edgy ? () => {} : papyrusEmotes(paps);
               typer.on('header', papListener);
               await dialogue('auto', ...text.a_starton.maze1());
               if (!world.edgy) {
                  await dialogue(
                     'auto',
                     ...[ text.a_starton.maze2a, text.a_starton.maze2b ][choicer.result],
                     ...text.a_starton.maze3
                  );
                  paps.preset = characters.papyrus;
                  paps.face = 'left';
               }
               await renderer.pause(450);
               sounds.noise.instance(renderer);
               roomState.ablaze = true;
               await renderer.pause(850);
               if (!world.edgy) {
                  await dialogue('auto', ...text.a_starton.maze3a);
                  sand.preset = characters.sansSpecial;
                  sand.face = 'down';
                  {
                     const target = sand.position;
                     const start = player.position.clamp(...renderer.region);
                     const region = renderer.region;
                     renderer.region = [
                        { x: -Infinity, y: -Infinity },
                        { x: Infinity, y: Infinity }
                     ];
                     game.camera = new CosmosObject({ position: start });
                     await Promise.all([ autozoom(1.8, 266), game.camera.position.modulate(renderer, 266, target) ]);
                     const rimmer = sounds.rimshot.instance(renderer);
                     await renderer.pause(450);
                     rimmer.stop();
                     renderer.zoom.value = 1;
                     game.camera.position.set(start);
                     renderer.region = region;
                     game.camera = player;
                  }
                  await dialogue('auto', ...text.a_starton.maze4);
                  paps.preset = characters.papyrus;
                  paps.face = 'left';
                  sand.preset = characters.sans;
                  sand.face = 'left';
               }
               await dialogue('auto', ...text.a_starton.maze5());
               paps.preset = characters.papyrus;
               paps.face = 'left';
               game.movement = true;
               let targetTime = renderer.time + 5e3;
               const exitStopper = async () => {
                  if (game.movement && player.position.x < 25) {
                     targetTime = Infinity;
                     await dialogue('auto', ...text.a_starton.maze6());
                     targetTime = renderer.time + 3e3;
                     {
                        paps.preset = characters.papyrus;
                        paps.face = 'left';
                     }
                     player.position.x += 3;
                     player.face = 'right';
                  }
               };
               renderer.on('tick', exitStopper);
               if (!world.edgy) {
                  (async () => {
                     let waits = 0;
                     while (waits < text.a_starton.maze7.length) {
                        await renderer.when(() => renderer.time > targetTime);
                        if (roomState.ablaze && !roomState.step) {
                           await renderer.when(() => game.movement);
                           if (roomState.ablaze && !roomState.step) {
                              await dialogue('auto', ...text.a_starton.maze7[waits++]);
                              paps.preset = characters.papyrus;
                              paps.face = 'left';
                              targetTime = renderer.time + 5e3;
                           } else {
                              break;
                           }
                        }
                     }
                  })();
               }
               await renderer.when(() => roomState.fail || player.position.x > 240);
               if (roomState.fail) {
                  SAVE.data.b.papyrus_fire = true;
               }
               game.movement || (await renderer.when(() => game.movement));
               game.movement = false;
               SAVE.data.n.plot = 20;
               sounds.noise.instance(renderer);
               roomState.ablaze = false;
               await dialogue('auto', ...(roomState.fail ? text.a_starton.maze8 : text.a_starton.maze9)());
               if (!world.edgy) {
                  paps.preset = characters.papyrus;
                  paps.face = 'left';
                  await renderer.pause(450);
                  paps.face = 'right';
                  await renderer.pause(650);
                  paps.face = 'left';
               }
               await renderer.pause(850);
               await dialogue('auto', ...text.a_starton.maze10());
               paps.preset = characters.papyrus;
               paps.face = 'left';
               renderer.off('tick', exitStopper);
               typer.off('header', papListener);
               speech.targets.clear();
               papsMusic.gain.modulate(renderer, 1000, 0).then(() => {
                  papsMusic.stop();
                  if (world.edgy) {
                     content.amMuscle.unload();
                  } else {
                     content.amPapyrus.unload();
                  }
               });
               if (!world.edgy) {
                  await paps.walk(renderer, 4, { x: 340 });
                  await renderer.pause(1e3);
                  paps.preset = characters.papyrusMad;
                  await paps.walk(renderer, 2, { x: 300 });
                  await renderer.pause(850);
                  await dialogue('auto', ...text.a_starton.maze11);
               }
               await Promise.all([
                  paps.walk(renderer, 4, { x: 340 }),
                  sand.walk(renderer, world.edgy ? 3 : 4, { x: 340 })
               ]);
               renderer.detach('main', sand, paps);
               if (!SAVE.data.b.oops) {
                  await dialogue(
                     'auto',
                     ...(roomState.fail ? text.a_starton.truetext.sans3 : text.a_starton.truetext.sans4)
                  );
               }
               game.movement = true;
               quickresume();
            }
         }
         break;
      }
      case 's_dogs':
         world.edgy || world.killed5 || world.population < 6 || sas({ x: 290, y: 145 }, 20.2);
         break;
      case 's_papyrus':
         world.edgy || world.killed5 || world.population < 6 || sas({ x: 140, y: 125 }, 19);
         break;
      case 's_bros': {
         if (SAVE.data.n.plot < 21) {
            const muscleLoader = world.genocide || !world.edgy ? content.amPapyrus.load() : content.amMuscle.load();
            if (world.genocide) {
               const paps = temporary(
                  character('papyrus', characters.papyrusStark, { x: 510, y: 160 }, 'left'),
                  'main'
               );
               await renderer.when(() => game.room !== 's_bros' || (230 <= player.position.x && game.movement));
               if (game.room !== 's_bros') {
                  return;
               }
               game.movement = false;
               SAVE.data.n.plot = 21;
               game.music?.stop();
               player.face = 'right';
               await renderer.pause(650);
               goatbro.face = 'right';
               const cam = new CosmosObject({ position: player });
               game.camera = cam;
               await antifreeze([ muscleLoader, cam.position.modulate(renderer, 1000, { x: 360 }) ]);
               const papsMusic = music.papyrus.instance(renderer);
               papsMusic.rate.value = 0.325;
               await renderer.pause(650);
               await dialogue('dialoguerBottom', ...text.a_starton.genotext.papyrusSolo2a);
               paps.preset = characters.papyrusMad;
               paps.walk(renderer, 4, { x: 620, y: 160 }).then(async () => {
                  await paps.walk(renderer, 4, { y: 65 });
                  await paps.alpha.modulate(renderer, 300, 0);
                  renderer.detach('main', paps);
               });
               papsMusic.gain.modulate(renderer, 1500, 0).then(() => {
                  papsMusic.stop();
                  content.amPapyrus.unload();
               });
               await cam.position.modulate(renderer, 1000, { x: player.position.x });
               game.camera = player;
               await dialogue('dialoguerBottom', ...text.a_starton.genotext.asriel17());
               game.movement = true;
               quickresume();
               await events.on('teleport');
            } else {
               const roomState = (startonStates.rooms.s_bros ??= {});
               const sand = temporary(
                  character('sans', characters.sans, { x: 510, y: world.edgy ? 160 : 170 }, 'left', {
                     anchor: { x: 0, y: 1 },
                     size: { x: 25, y: 5 },
                     metadata: { interact: false, barrier: true, name: 'starton', args: [ 'sandinter' ] }
                  }),
                  'main'
               );
               const paps = temporary(
                  character(world.edgy ? 'sussysusser' : 'papyrus', characters.papyrus, { x: 510, y: 150 }, 'left', {
                     alpha: world.edgy ? 0 : 1
                  }),
                  'main'
               );
               temporary(
                  new CosmosHitbox({
                     anchor: 0,
                     size: { x: 15, y: 20 },
                     metadata: { interact: true, name: 'starton', args: [ 'crossword' ] },
                     position: { x: 360, y: 160 },
                     priority: -9999,
                     objects: [ new CosmosSprite({ anchor: 0, frames: [ content.iooSCrossword ] }) ]
                  }),
                  'main'
               );
               await renderer.when(() => game.room !== 's_bros' || (230 <= player.position.x && game.movement));
               if (game.room !== 's_bros') {
                  return;
               }
               game.movement = false;
               game.music?.stop();
               player.face = 'right';
               await renderer.pause(650);
               const cam = new CosmosObject({ position: player });
               game.camera = cam;
               await cam.position.modulate(renderer, 1000, { x: 360 });
               await antifreeze([ muscleLoader, renderer.pause(650) ]);
               await dialogue('auto', ...text.a_starton.crossword0());
               if (!world.edgy) {
                  await renderer.pause(650);
                  paps.face = 'down';
                  sand.face = 'up';
                  await renderer.pause(850);
               }
               const sansMusic = world.edgy ? music.muscle.instance(renderer) : music.papyrus.instance(renderer);
               world.edgy && (await renderer.pause(1250));
               await dialogue('auto', ...text.a_starton.crossword1());
               sand.face = 'left';
               paps.face = 'left';
               const exitStopper = async () => {
                  if (game.movement && player.position.x < 205) {
                     await dialogue(
                        'auto',
                        ...(roomState.checked ? text.a_starton.crossword4b() : text.a_starton.crossword4a())
                     );
                     player.position.x += 3;
                     player.face = 'right';
                  }
               };
               renderer.on('tick', exitStopper);
               game.movement = true;
               await renderer.when(() => player.position.x > 480 && game.movement);
               renderer.off('tick', exitStopper);
               game.movement = false;
               await dialogue('auto', ...text.a_starton.crossword2(roomState.checked === true));
               if (!world.edgy) {
                  await dialogue('auto', ...[ text.a_starton.crossword3a, text.a_starton.crossword3b ][choicer.result]);
                  roomState.choice = choicer.result;
               }
               sansMusic.gain.modulate(renderer, 1000, 0).then(() => {
                  sansMusic.stop();
                  if (world.edgy) {
                     content.amMuscle.unload();
                  } else {
                     content.amPapyrus.unload();
                  }
               });
               if (!world.edgy) {
                  paps.walk(renderer, 4, { x: 620, y: 160 }, { y: 65 }).then(async () => {
                     await paps.alpha.modulate(renderer, 300, 0);
                     renderer.detach('main', paps);
                  });
                  await renderer.pause(850);
               }
               await sand.walk(renderer, 3, { y: 145 });
               sand.face = 'down';
               if (!world.edgy) {
                  await dialogue('auto', ...text.a_starton.crossword3c);
               }
               sand.on('tick', function () {
                  if (this.talk) {
                     this.face = ultimaFacer(this);
                  } else {
                     this.face = 'down';
                  }
               });
               await cam.position.modulate(renderer, 1000, { x: player.position.x });
               game.camera = player;
               if (!SAVE.data.b.oops) {
                  await dialogue(
                     'auto',
                     ...(roomState.checked ? text.a_starton.truetext.sans6 : text.a_starton.truetext.sans5)
                  );
               }
               SAVE.data.n.plot = 21;
               game.movement = true;
               sand.metadata.interact = true;
               quickresume();
            }
         }
         break;
      }
      case 's_puzzle1':
         const roomState = (startonStates.rooms[to] ??= {});
         if (!roomState.active) {
            roomState.active = true;
            if (SAVE.data.n.plot < 23) {
               teleporter.movement = false;
               const bassLoader = world.genocide ? content.amDogbeat.load() : content.amDogbass.load();
               const battleLoader = battler.load(groups.dogs);
               SAVE.data.n.plot = 23;
               player.walk(renderer, 3, { x: 80, y: 80 }).then(async () => {
                  game.music?.stop();
                  const mandog = new CosmosEntity({
                     alpha: 0,
                     sprites: {
                        down: new CosmosAnimation({
                           anchor: { x: 0, y: 1 },
                           resources: content.ionSDogamy,
                           extrapolate: false
                        }),
                        left: new CosmosAnimation({
                           anchor: { x: 0, y: 1 },
                           resources: content.ionSDogamy,
                           extrapolate: false
                        }),
                        right: new CosmosAnimation({
                           anchor: { x: 0, y: 1 },
                           resources: content.ionSDogamy,
                           extrapolate: false
                        }),
                        up: new CosmosAnimation({
                           anchor: { x: 0, y: 1 },
                           resources: content.ionSDogamy,
                           extrapolate: false
                        })
                     },
                     position: { x: 220, y: 90 }
                  });
                  const womandog = new CosmosEntity({
                     alpha: 0,
                     sprites: {
                        down: new CosmosAnimation({
                           anchor: { x: 0, y: 1 },
                           resources: content.ionSDogaressa,
                           extrapolate: false
                        }),
                        left: new CosmosAnimation({
                           anchor: { x: 0, y: 1 },
                           resources: content.ionSDogaressa,
                           extrapolate: false
                        }),
                        right: new CosmosAnimation({
                           anchor: { x: 0, y: 1 },
                           resources: content.ionSDogaressa,
                           extrapolate: false
                        }),
                        up: new CosmosAnimation({
                           anchor: { x: 0, y: 1 },
                           resources: content.ionSDogaressa,
                           extrapolate: false
                        })
                     },
                     position: { x: 220, y: 70 }
                  });
                  renderer.attach('main', mandog, womandog);
                  await Promise.all([
                     mandog.alpha.modulate(renderer, 300, 1).then(async () => {
                        await mandog.walk(renderer, 4, { x: 80 });
                        await mandog.walk(renderer, 2, { x: 60 }, { x: 50, y: 80 });
                     }),
                     womandog.alpha.modulate(renderer, 300, 1).then(async () => {
                        await womandog.walk(renderer, 4, { x: 80 });
                        await womandog.walk(renderer, 2, { x: 100 }, { x: 110, y: 80 });
                     })
                  ]);
                  await Promise.all([
                     bassLoader,
                     dialogue('auto', ...(world.genocide ? text.a_starton.marriage4 : text.a_starton.marriage1))
                  ]);
                  world.genocide ? music.dogbeat.instance(renderer) : music.dogbass.instance(renderer);
                  await Promise.all([
                     mandog.walk(
                        renderer,
                        3,
                        { y: 60 },
                        { x: 30 },
                        { y: 80 },
                        { x: 50, y: 60 },
                        { x: 110 },
                        { y: 110 },
                        { x: 30 },
                        { x: 10, y: 80 },
                        { x: 50, y: 40 },
                        { y: 80 }
                     ),
                     womandog.walk(
                        renderer,
                        3,
                        { x: 150 },
                        { y: 100 },
                        { x: 110, y: 80 },
                        { y: 110 },
                        { x: 70 },
                        { y: 40 },
                        { x: 90 },
                        { y: 20 },
                        { x: 100 },
                        { y: 40 },
                        { x: 120 },
                        { y: 60 },
                        { x: 110 },
                        { y: 80 }
                     )
                  ]);
                  await dialogue('auto', ...(world.genocide ? text.a_starton.marriage5 : text.a_starton.marriage2));
                  await antifreeze([ battleLoader, battler.battlefall(player) ]);
                  world.genocide ? content.amDogbeat.unload() : content.amDogbass.unload();
                  await battler.start(groups.dogs);
                  battler.unload(groups.dogs);
                  if (SAVE.data.n.state_starton_dogs !== 2) {
                     if (SAVE.data.n.state_starton_dogs === 0) {
                        await dialogue('auto', ...text.a_starton.marriage3a);
                     } else if (SAVE.data.n.state_starton_dogs === 3) {
                        if ((battler.volatile[0].vars.sequence || 0) < 2) {
                           await dialogue('auto', ...text.a_starton.marriage3c);
                        } else {
                           await dialogue('auto', ...text.a_starton.marriage3d);
                        }
                     } else if ((battler.volatile[0].vars.sequence || 0) < 2) {
                        await dialogue('auto', ...text.a_starton.marriage3b);
                     } else {
                        await dialogue('auto', ...text.a_starton.marriage3e);
                     }
                     mandog.walk(renderer, 4, { x: 62.5, y: 255 }).then(async () => {
                        await mandog.alpha.modulate(renderer, 300, 0);
                        renderer.detach('main', mandog);
                     });
                     womandog.walk(renderer, 4, { x: 97.5, y: 255 }).then(async () => {
                        await womandog.alpha.modulate(renderer, 300, 0);
                        renderer.detach('main', womandog);
                     });
                  } else {
                     renderer.detach('main', mandog);
                     renderer.detach('main', womandog);
                  }
                  if (!SAVE.data.b.oops) {
                     if (
                        SAVE.data.n.state_starton_doggo < 1 ||
                        SAVE.data.n.state_starton_lesserdog < 1 ||
                        SAVE.data.n.state_starton_dogs < 1
                     ) {
                        if (SAVE.data.n.state_starton_dogs === 0) {
                           await dialogue('auto', ...text.a_starton.truetext.dogs1);
                        } else {
                           await dialogue('auto', ...text.a_starton.truetext.fetch());
                        }
                     } else {
                        await dialogue('auto', ...text.a_starton.truetext.dogs2);
                     }
                  }
                  game.movement = true;
                  if (SAVE.data.n.state_starton_dogs !== 2) {
                     quickresume();
                  } else {
                     quickresume(true);
                  }
               });
            }
         }
         if (!world.genocide && SAVE.data.n.state_papyrus_spaghet < 1) {
            if (world.edgy) {
               SAVE.data.n.state_papyrus_spaghet = 2;
            } else {
               const paps = temporary(character('papyrus', characters.papyrus, { x: 565, y: 80 }, 'right'), 'main');
               renderer
                  .when(() => game.room !== 's_puzzle1' || (paps.position.x - player.position.x < 50 && game.movement))
                  .then(async () => {
                     if (game.room !== 's_puzzle1') {
                        return;
                     }
                     game.movement = false;
                     player.face = 'right';
                     await notifier(paps, false, 45);
                     paps.face = 'left';
                     const have = SAVE.storage.inventory.contents.includes('spaghetti');
                     const gone = !have && trueSpaghettiState() === 2;
                     if (have) {
                        await dialogue('auto', ...text.a_starton.papspaghet1a());
                     } else {
                        await dialogue('auto', ...text.a_starton.papspaghet1(gone));
                     }
                     SAVE.data.n.state_papyrus_spaghet = gone || choicer.result === 1 ? 2 : 1;
                     await dialogue(
                        'auto',
                        ...[ text.a_starton.papspaghet2a, text.a_starton.papspaghet2b ][choicer.result]
                     );
                     paps.walk(renderer, 4, { x: 590 }).then(async () => {
                        await paps.alpha.modulate(renderer, 300, 0);
                        renderer.detach('main', paps);
                     });
                     if (!SAVE.data.b.oops) {
                        await dialogue('auto', ...text.a_starton.truetext.papyrus1);
                     }
                     game.movement = true;
                  });
            }
         }
         if (world.postnoot && SAVE.data.n.plot < 24) {
            SAVE.data.n.plot = 24;
            world.nootflags.add('s_puzzle1');
         }
         if (24 <= SAVE.data.n.plot) {
            unlockPuzzle();
            const puzzle = instance('main', 'puzzlechip')!.object.objects[0] as CosmosAnimation;
            puzzle.index = puzzle.frames.length - 3;
         }
         break;
      case 's_puzzle2': {
         if (SAVE.data.n.plot < 25 && !world.edgy) {
            const paps = temporary(
               character(
                  'papyrus',
                  characters.papyrus,
                  SAVE.data.n.plot < 24.1 ? { x: 120, y: 100 } : { x: 230, y: 25 },
                  SAVE.data.n.plot < 24.1 ? 'left' : 'down',
                  {
                     anchor: { x: 0, y: 1 },
                     size: { x: 25, y: 5 },
                     metadata: { interact: true, barrier: true, name: 'starton', args: [ 'papsinter' ] }
                  }
               ),
               'main'
            );
            if (SAVE.data.n.plot < 24.1) {
               renderer
                  .when(() => game.room !== 's_puzzle2' || (player.position.x > 60 && game.movement))
                  .then(async () => {
                     if (game.room !== 's_puzzle2') {
                        return;
                     }
                     game.movement = false;
                     SAVE.data.n.plot = 24.1;
                     player.face = 'right';
                     await dialogue('dialoguerBottom', ...text.a_starton.pappuzzle1);
                     if (world.postnoot) {
                        SAVE.data.n.plot = 25;
                        world.nootflags.add('s_puzzle2');
                        await paps.walk(renderer, 4, { x: 180 });
                        await renderer.pause(850);
                        paps.face = 'left';
                        await renderer.pause(1250);
                        await dialogue('dialoguerBottom', ...text.a_starton.pappuzzle1b);
                        paps.walk(renderer, 4, { x: 490 }).then(async () => {
                           await paps.alpha.modulate(renderer, 300, 0);
                           renderer.detach('main', paps);
                        });
                        game.movement = true;
                     } else {
                        await paps.walk(renderer, 4, { x: 230 }, { y: 25 });
                        paps.face = 'down';
                        await renderer.pause(850);
                        await dialogue('dialoguerBottom', ...text.a_starton.pappuzzle1a);
                     }
                     game.movement = true;
                  });
            }
            if (!world.postnoot) {
               renderer
                  .when(() => game.room !== 's_puzzle2' || 25 <= SAVE.data.n.plot)
                  .then(async () => {
                     if (game.room !== 's_puzzle2') {
                        return;
                     }
                     await dialogue(
                        'auto',
                        ...text.a_starton.pappuzzle2,
                        ...[
                           text.a_starton.pappuzzle2a,
                           text.a_starton.pappuzzle2b,
                           text.a_starton.pappuzzle2b,
                           text.a_starton.pappuzzle2b,
                           text.a_starton.pappuzzle2c
                        ][SAVE.data.n.plot_puzzlecheck],
                        ...text.a_starton.pappuzzle2d
                     );
                     paps.walk(renderer, 4, { x: 490, y: 100 }).then(async () => {
                        await paps.alpha.modulate(renderer, 300, 0);
                        renderer.detach('main', paps);
                     });
                     game.movement = true;
                  });
            }
         }
         if (world.postnoot || 25 <= SAVE.data.n.plot) {
            if (world.edgy && SAVE.data.n.plot < 25) {
               SAVE.data.n.plot = 25;
            }
            unlockPuzzle();
            const puzzle = instance('main', 'puzzlechip')!.object.objects[0] as CosmosAnimation;
            puzzle.index = puzzle.frames.length - 3;
         }
         break;
      }
      case 's_puzzle3':
         (world.genocide || SAVE.data.n.plot === 72) && instance('main', 's_spagnote')?.destroy();
         if (world.postnoot && SAVE.data.n.plot < 27) {
            SAVE.data.n.plot = 27;
            world.nootflags.add('s_puzzle3');
         }
         27 <= SAVE.data.n.plot && unlockPuzzle();
         break;
      case 's_jenga': {
         instance('main', 'puzzlenote')!.object.alpha.value =
            SAVE.data.b.s_state_puzzlenote && SAVE.data.n.plot !== 72 ? 1 : 0;
         if (SAVE.data.n.plot < 26) {
            const thePuzzle = async (paps: CosmosCharacter, papsMusic: CosmosInstance, xdiag = true) => {
               const compooterLoader = content.asComputer.load();
               xdiag && (await dialogue('auto', ...text.a_starton.papyrus9));
               await paps.walk(renderer, 4, { x: 160 });
               paps.face = 'up';
               paps.sprites.up.alpha.value = 1;
               paps.sprites.up.reset();
               await antifreeze([ compooterLoader, renderer.pause(650) ]);
               sounds.equip.instance(renderer).rate.value = 1.25;
               renderer.pause(950).then(async () => {
                  await paps.walk(renderer, 4, { x: 250 });
                  paps.face = 'left';
               });
               const textie = new CosmosText({
                  fill: 0xf0f0dd,
                  alpha: 0.8,
                  anchor: 0,
                  spacing: { x: -2 },
                  fontFamily: content.fPapyrus,
                  fontSize: 20,
                  position: { x: 21, y: 5.25 }
               });
               const smol = new CosmosSprite({
                  priority: 9999,
                  position: { x: 141, y: -29 },
                  frames: [ content.iooSSmallscreen ],
                  objects: [ textie ]
               });
               renderer.attach('main', smol);
               const compooter = sounds.computer.instance(renderer);
               const power = new CosmosValue();
               papsMusic.gain.value /= 2;
               power.modulate(renderer, 10e3, 10);
               while (power.value < 10) {
                  textie.content = Math.floor(Math.random() * 999).toString();
                  compooter.rate.value = 1 + power.value / 20;
                  await renderer.pause(1e3 / (Math.max(power.value, 1) * 3));
               }
               compooter.stop();
               content.asComputer.unload();
               textie.content = '0';
               papsMusic.stop();
               content.amPapyrus.unload();
               await renderer.pause(1650);
               events.on('teleport').then(() => {
                  renderer.detach('main', smol);
               });
            };
            const papyrusLoader = content.amPapyrus.load();
            if (world.edgy) {
               const paps = temporary(
                  character('papyrus', characters.papyrusStark, { x: 250, y: 80 }, 'right'),
                  'main'
               );
               await renderer.when(() => game.room !== 's_jenga' || (player.position.x > 70 && game.movement));
               if (game.room !== 's_jenga') {
                  return;
               }
               game.movement = false;
               SAVE.data.n.plot = 26;
               game.music?.stop();
               player.face = 'right';
               if (world.genocide) {
                  goatbro.face = 'right';
                  await antifreeze([ papyrusLoader, dialogue('auto', ...text.a_starton.genotext.papyrusSolo3) ]);
                  const papsMusic = music.papyrus.instance(renderer);
                  papsMusic.rate.value = 0.325;
                  await renderer.pause(850);
                  header('x1').then(() => {
                     paps.face = 'left';
                  });
                  await dialogue('auto', ...text.a_starton.genotext.papyrusSolo3a());
                  await thePuzzle(paps, papsMusic, false);
                  CosmosUtils.chain(void 0, async (none, next) => {
                     if (paps.position.x < 310) {
                        paps.face = (
                           { up: 'left', left: 'down', down: 'right', right: 'up' } as CosmosKeyed<
                              CosmosDirection,
                              CosmosDirection
                           >
                        )[paps.face];
                        await renderer.pause(100);
                        next(void 0);
                     }
                  });
                  while (paps.position.y < 80) {
                     paps.position.y += 2;
                     paps.position.x += 2;
                     await renderer.on('tick');
                  }
                  while (paps.position.x < 310) {
                     paps.position.x += 2;
                     await renderer.on('tick');
                  }
                  await paps.alpha.modulate(renderer, 300, 0);
                  renderer.detach('main', paps);
                  await renderer.pause(650);
                  await dialogue('auto', ...text.a_starton.genotext.asriel24());
                  game.movement = true;
                  quickresume();
               } else {
                  await antifreeze([ papyrusLoader, renderer.pause(1250) ]);
                  paps.face = 'left';
                  await dialogue('auto', ...text.a_starton.papyrus6x1);
                  paps.preset = characters.papyrus;
                  const papsMusic = music.papyrus.instance(renderer);
                  await renderer.pause(850);
                  await dialogue('auto', ...text.a_starton.papyrus6x2);
                  await renderer.pause(450);
                  paps.face = 'right';
                  await renderer.pause(650);
                  paps.face = 'left';
                  await renderer.pause(850);
                  await dialogue('auto', ...text.a_starton.papyrus6x3);
                  papsMusic.stop();
                  content.amPapyrus.unload();
                  notifier(paps, false, 45);
                  await dialogue('auto', ...text.a_starton.papyrus6x4);
                  await renderer.pause(350);
                  await paps.walk(renderer, 4, { x: 310 });
                  await paps.alpha.modulate(renderer, 300, 0);
                  renderer.detach('main', paps);
                  game.movement = true;
                  quickresume();
               }
            } else {
               const sand = temporary(
                  character('sans', characters.sans, { x: 250, y: 65 }, 'left', {
                     anchor: { x: 0, y: 1 },
                     size: { x: 25, y: 5 },
                     metadata: { interact: true, barrier: true, name: 'starton', args: [ 'sandinter' ] }
                  }),
                  'main'
               );
               const paps = temporary(character('papyrus', characters.papyrus, { x: 250, y: 105 }, 'left'), 'main');
               await renderer.when(() => game.room !== 's_jenga' || (player.position.x > 70 && game.movement));
               if (game.room !== 's_jenga') {
                  return;
               }
               game.movement = false;
               SAVE.data.n.plot = 26;
               game.music?.stop();
               player.face = 'right';
               await antifreeze([ papyrusLoader, renderer.pause(850) ]);
               const papsMusic = music.papyrus.instance(renderer);
               await renderer.pause(650);
               await dialogue('auto', ...text.a_starton.papyrus6());
               if (choicer.result === 1) {
                  await dialogue('auto', ...text.a_starton.papyrus7());
               }
               papsMusic.gain.modulate(renderer, 1500, 0).then(() => {
                  papsMusic.stop();
                  content.amPapyrus.unload();
               });
               if (choicer.result === 1) {
                  await dialogue('auto', ...text.a_starton.papyrus8);
                  SAVE.data.b.s_state_puzzlenote = true;
                  instance('main', 'puzzlenote')!.object.alpha.value = 1;
               } else {
                  await thePuzzle(paps, papsMusic);
               }
               CosmosUtils.chain(void 0, async (none, next) => {
                  if (paps.position.x < 310) {
                     paps.face = (
                        { up: 'left', left: 'down', down: 'right', right: 'up' } as CosmosKeyed<
                           CosmosDirection,
                           CosmosDirection
                        >
                     )[paps.face];
                     await renderer.pause(100);
                     next(void 0);
                  }
               });
               while (paps.position.y < 80) {
                  paps.position.y += 2;
                  paps.position.x += 2;
                  await renderer.on('tick');
               }
               sand.face = 'right';
               while (paps.position.x < 310) {
                  paps.position.x += 2;
                  await renderer.on('tick');
               }
               await paps.alpha.modulate(renderer, 300, 0);
               renderer.detach('main', paps);
               await renderer.pause(650);
               sand.face = 'left';
               await renderer.pause(450);
               await sand.walk(renderer, 3, { x: 160 }, { y: 47 });
               sand.face = 'down';
               sand.on('tick', function () {
                  if (this.talk) {
                     this.face = ultimaFacer(this);
                  } else {
                     this.face = 'down';
                  }
               });
               if (!SAVE.data.b.oops) {
                  await dialogue(
                     'auto',
                     ...[ text.a_starton.truetext.sans7, text.a_starton.truetext.sans8 ][choicer.result]
                  );
               }
               game.movement = true;
               quickresume();
            }
         } else if ((world.genocide || (!world.edgy && !SAVE.data.b.s_state_puzzlenote)) && !postSIGMA()) {
            temporary(
               new CosmosSprite({
                  priority: 9999,
                  position: { x: 141, y: -29 },
                  frames: [ content.iooSSmallscreen ],
                  objects: [
                     new CosmosText({
                        fill: 0xf0f0dd,
                        alpha: 0.8,
                        anchor: 0,
                        spacing: { x: -2 },
                        fontFamily: content.fPapyrus,
                        fontSize: 20,
                        content: '0',
                        position: { x: 21, y: 5.25 }
                     })
                  ]
               }),
               'main'
            );
         }
         break;
      }
      case 's_math': {
         (SAVE.data.b.s_state_mathpass || postSIGMA()) && unlockPuzzle();
         break;
      }
      case 's_secret': {
         if (SAVE.data.n.state_starton_trashprogress < 2) {
            const toby = instance('main', 'tobycage')!.object;
            if (!toby.metadata.active) {
               toby.metadata.active = true;
               const t = renderer.time;
               toby.on('tick', function () {
                  this.position.y = sineWaver(t, 8000, 0, 10);
                  if (SAVE.data.b.svr || world.runaway) {
                     if (!this.metadata.blinker) {
                        this.metadata.blinker = true;
                        (this?.objects[0] as CosmosAnimation).use(content.iooToby0);
                     }
                  } else if (SAVE.data.b.s_state_papsink) {
                     if (!this.metadata.sinker) {
                        this.metadata.sinker = true;
                        (this?.objects[0] as CosmosAnimation).use(content.iooToby5);
                     }
                  }
               });
            }
            SAVE.data.b.s_state_papsink && (rooms.of('s_secret').score.music = 'dogdance');
         } else {
            instance('main', 'tobycage')?.destroy();
            rooms.of('s_secret').score.music = 'dogfreedom';
         }
         break;
      }
      case 's_bridge': {
         world.edgy && sas({ x: 925, y: 20 }, 30);
         world.genocide && SAVE.data.n.plot < 30 && (teleporter.movement = false);
         break;
      }
      case 's_innterior': {
         if (world.population === 0 || SAVE.data.b.svr || world.runaway) {
            instance('main', 'i_innkeep')?.destroy();
            temporary(
               new CosmosRectangle({
                  position: { x: 221, y: 92 },
                  fill: 0x0c36ae,
                  size: { x: 14, y: 8 },
                  objects: [ new CosmosRectangle({ fill: 0x062d9e, position: { y: 2 }, size: { x: 14, y: 2 } }) ]
               }),
               'below'
            );
         }
         break;
      }
      case 's_grillbys': {
         const roomState = (startonStates.rooms.s_grillbys ??= {});
         if (from === 'f_sans') {
            if (SAVE.data.n.state_starton_jukebox > 0) {
               const [ az, thing ] = updateJukebox(true);
               SAVE.data.n.state_starton_jukebox = 0;
               thing.unload(az);
            }
         } else {
            if (SAVE.data.n.state_starton_jukebox > 0 && !postSIGMA()) {
               teleporter.nomusic = true;
               musicFilter.value = 0;
               musicConvolver.value = 0;
               barmusic(roomState);
            } else {
               (world.genocide || world.killed0) && game.music?.stop();
            }
         }
         if (SAVE.data.n.state_starton_doggo === 2 || world.population < 2 || SAVE.data.b.svr || world.runaway) {
            instance('main', 'g_doggo')?.destroy();
         }
         if (
            SAVE.data.n.state_starton_greatdog === 2 ||
            epilogueOverride(world.population < 2) ||
            SAVE.data.b.svr ||
            world.runaway
         ) {
            instance('main', 'g_greatdog')?.destroy();
         } else if ((SAVE.data.n.state_starton_greatdog === 3 || world.population < 2) && !roomState.dogger) {
            roomState.dogger = true;
            const e = instance('main', 'g_greatdog');
            e && (e.index = 3);
         }
         if (
            SAVE.data.n.state_starton_dogs === 2 ||
            epilogueOverride(world.population < 2) ||
            SAVE.data.b.svr ||
            world.runaway
         ) {
            instance('main', 'g_dogamy')?.destroy();
            instance('main', 'g_dogaressa')?.destroy();
         }
         if (world.population < 6 || SAVE.data.b.svr || world.runaway) {
            instance('main', 'g_beautifulfish')?.destroy();
         }
         if (world.population < 4 || SAVE.data.b.svr || world.runaway) {
            instance('main', 'g_bunbun')?.destroy();
         }
         if (epilogueOverride(world.population < 4) || SAVE.data.b.svr || world.runaway) {
            instance('main', 'g_bigmouth')?.destroy();
         }
         if (epilogueOverride(world.population < 2) || SAVE.data.b.svr || world.runaway) {
            instance('main', 'g_punkhamster')?.destroy();
         }
         if (world.genocide || world.killed0 || SAVE.data.b.svr || world.runaway) {
            instance('main', 'g_grillby')?.destroy();
            instance('main', 'g_redbird')?.destroy();
         }
         const foodz = instance('main', 'foodz')!.object;
         if (SAVE.data.n.plot === 33 && !SAVE.data.b.item_fast_food) {
            foodz.alpha.value = 1;
            foodz.objects[1].alpha.value = 0;
            if (SAVE.data.b.fryz) {
               (foodz.objects[0] as CosmosSprite).frames[0] = content.iooFFries;
            }
         } else {
            foodz.alpha.value = 0;
         }
         break;
      }
      case 's_town1':
      case 's_town2': {
         const roomState = (startonStates.rooms.s_town1 ??= {});
         if (!roomState.spawnedThaKid && SAVE.data.n.plot < 31 && !world.genocide && world.population > 0) {
            roomState.spawnedThaKid = true;
            const kiddState = CosmosUtils.parse<{
               anim: { active: boolean; index: number; step: number };
               face: CosmosDirection;
               volatile: boolean;
               room: 's_town1' | 's_town2';
               state: 'wait' | 'walk' | 'trip';
               trip: number;
               wait: number;
               x: number;
               y: number;
            }>(SAVE.data.s.state_starton_s_town1, {
               anim: { active: true, index: 0, step: 0 },
               face: 'right',
               room: 's_town1',
               state: 'walk',
               trip: 0,
               volatile: true,
               wait: 0,
               x: 420,
               y: 150
            });
            const anim = new CosmosAnimation({
               active: kiddState.anim.active,
               anchor: { x: 0, y: 1 },
               index: kiddState.anim.index,
               resources:
                  kiddState.state === 'wait'
                     ? content.iocKiddDownTalk
                     : kiddState.state === 'walk'
                     ? {
                          down: content.iocKiddDown,
                          left: content.iocKiddLeft,
                          right: content.iocKiddRight,
                          up: content.iocKiddUp
                       }[kiddState.face]
                     : kiddState.face === 'left'
                     ? content.iocKiddLeftTrip
                     : content.iocKiddRightTrip,
               step: kiddState.anim.step
            }).on('tick', function () {
               this.alpha.value = game.room === kiddState.room ? 1 : 0;
               if (kiddState.state === 'trip' && this.index === 19) {
                  if (kiddState.trip++ === 0) {
                     this.active = false;
                  } else if (kiddState.trip === 15) {
                     kiddState.state = 'walk';
                     kiddState.trip = 0;
                     this.reset().use(kiddState.face === 'left' ? content.iocKiddLeft : content.iocKiddRight);
                     this.position.y = 0;
                  }
               }
               kiddState.anim.active = this.active;
               kiddState.anim.index = this.index;
               kiddState.anim.step = this.step;
               SAVE.data.s.state_starton_s_town1 = CosmosUtils.serialize(kiddState);
            });
            anim.frames = CosmosUtils.populate(20, null);
            function move (direction: CosmosDirection, limit: number, speed = 4) {
               switch (direction) {
                  case 'down':
                     kiddState.y += speed;
                     kiddState.y > limit && (kiddState.y = limit);
                     break;
                  case 'left':
                     kiddState.x -= speed;
                     kiddState.x < limit && (kiddState.x = limit);
                     break;
                  case 'right':
                     kiddState.x += speed;
                     kiddState.x > limit && (kiddState.x = limit);
                     break;
                  case 'up':
                     kiddState.y -= speed;
                     kiddState.y < limit && (kiddState.y = limit);
                     break;
               }
               const rez = {
                  down: content.iocKiddDown,
                  left: content.iocKiddLeft,
                  right: content.iocKiddRight,
                  up: content.iocKiddUp
               }[direction];
               if (anim.resources !== rez) {
                  kiddState.face = direction;
                  anim.use(rez);
               }
               anim.active = true;
            }
            function trip () {
               kiddState.state = 'trip';
               if (kiddState.face === 'left') {
                  kiddState.x -= 18;
                  anim.use(content.iocKiddLeftTrip);
               } else {
                  kiddState.x += 18;
                  anim.use(content.iocKiddRightTrip);
               }
               anim.active = true;
               anim.position.y = -1;
            }
            function wait () {
               kiddState.face = 'down';
               kiddState.state = 'wait';
               kiddState.wait = 20 * 30;
               anim.reset().use(content.iocKiddDownTalk);
            }
            function fade (kidd: CosmosHitbox) {
               kidd.metadata.fade = true;
               anim.reset();
               kidd.alpha.modulate(renderer, 300, 0).then(() => {
                  kidd.metadata.fade = false;
                  if (kiddState.room === 's_town1') {
                     kiddState.room = 's_town2';
                     kiddState.y = 10;
                  } else {
                     kiddState.room = 's_town1';
                     kiddState.y = 370;
                  }
                  renderer.post().then(() => (kidd.alpha.value = 1));
               });
            }
            renderer.attach(
               'main',
               new CosmosHitbox({
                  anchor: { x: 0 },
                  metadata: {
                     args: [ 'kiddTalk' ],
                     barrier: false,
                     fade: false,
                     interact: false,
                     locked: true,
                     name: 'starton',
                     pause: false,
                     tags: [ 's_pacikid' ],
                     paused: false,
                     trigger: false,
                     wait: false
                  },
                  size: { x: 20 },
                  objects: [ anim ]
               }).on('tick', function () {
                  if (SAVE.data.n.plot > 30.1 || ![ 's_town1', 's_town2' ].includes(game.room)) {
                     renderer.detach('main', this);
                     roomState.spawnedThaKid = false;
                  } else if (this.metadata.pause) {
                     if (!this.metadata.paused) {
                        this.metadata.paused = true;
                        speech.targets.add(
                           anim.reset().use(
                              {
                                 down: content.iocKiddDownTalk,
                                 left: content.iocKiddLeftTalk,
                                 right: content.iocKiddRightTalk,
                                 up: content.iocKiddUpTalk
                              }[this.metadata.wait ? 'down' : ultimaFacer(this)]
                           )
                        );
                     }
                  } else {
                     this.metadata.paused = false;
                     speech.targets.delete(anim);
                     if (kiddState.state !== 'walk') {
                        kiddState.state === 'wait' && kiddState.wait-- === 0 && (kiddState.state = 'walk');
                     } else if (kiddState.room === 's_town1') {
                        if (kiddState.x < 580) {
                           kiddState.y > 150 ? move('up', 150) : move('right', kiddState.x < 500 ? 500 : 580);
                           kiddState.x === 500 && trip();
                        } else if (kiddState.x === 580 && !(kiddState.y === 150 && kiddState.face === 'down')) {
                           kiddState.volatile = false;
                           kiddState.face === 'down' ? move('down', 150) : move('up', 115);
                           kiddState.y === 115 && wait();
                        } else if (kiddState.y < 370) {
                           kiddState.volatile = true;
                           kiddState.x < 750 ? move('right', 750) : move('down', 370);
                        } else {
                           this.metadata.fade || fade(this);
                        }
                     } else {
                        if (kiddState.x > 450) {
                           kiddState.y < 230 ? move('down', 230) : move('left', kiddState.x > 500 ? 500 : 450);
                           kiddState.x === 500 && trip();
                        } else if (kiddState.x === 450 && !(kiddState.y === 230 && kiddState.face === 'down')) {
                           kiddState.volatile = false;
                           kiddState.face === 'down' ? move('down', 230) : move('up', 195);
                           kiddState.y === 195 && wait();
                        } else if (10 < kiddState.y) {
                           kiddState.volatile = true;
                           kiddState.x > 250 ? move('left', 250) : move('up', 10);
                        } else {
                           this.metadata.fade || fade(this);
                        }
                     }
                  }
                  this.anchor.y = kiddState.state === 'wait' ? 1 : 0;
                  this.size.y = kiddState.state === 'wait' ? 5 : 40;
                  this.metadata.barrier = game.room === kiddState.room && kiddState.state === 'wait';
                  this.metadata.interact = game.room === kiddState.room && kiddState.state === 'wait';
                  this.metadata.trigger =
                     game.room === kiddState.room &&
                     (kiddState.state === 'wait' || (kiddState.state !== 'trip' && kiddState.volatile));
                  this.metadata.wait = kiddState.state === 'wait';
                  this.position.set(kiddState);
                  anim.fix(true);
               })
            );
         }
         break;
      }
      case 's_battle': {
         if (31 <= SAVE.data.n.plot) {
            return;
         }
         const noisestorm = new CosmosAnimation({
            active: true,
            alpha: 0,
            priority: -1000,
            scale: 2,
            metadata: { auto: true },
            resources: content.iooSNoise,
            objects: [
               new CosmosAnimation({ anchor: { x: 0, y: 1 }, tint: 0, scale: 0.5 }).on('pre-render', function () {
                  this.position.set(renderer.projection(player).divide(2));
                  const pres = (player.sprite as CosmosAnimation).resources;
                  if (this.resources !== pres) {
                     this.use(pres);
                  }
                  this.index = player.sprite.index;
                  this.fix();
               })
            ]
         }).on('tick', function () {
            if (this.metadata.auto) {
               this.alpha.value = Math.min(Math.max((player.position.x - 160) / 140, 0), 1);
            }
         });
         SAVE.data.n.state_papyrus_capture < 1 && temporary(noisestorm, 'menu');
         if (!SAVE.data.b.oops && SAVE.data.n.plot < 30.01) {
            await renderer.when(() => game.room !== 's_battle' || (player.position.x > 100 && game.movement));
            if (game.room !== 's_battle') {
               return;
            }
            await dialogue('auto', ...text.a_starton.truetext.papyrus3);
            SAVE.data.n.plot = 30.01;
         }
         if (!SAVE.data.b.oops && SAVE.data.n.plot < 30.02) {
            await renderer.when(() => game.room !== 's_battle' || (player.position.x > 185 && game.movement));
            if (game.room !== 's_battle') {
               return;
            }
            await dialogue('auto', ...text.a_starton.truetext.papyrus4);
            SAVE.data.n.plot = 30.02;
         }
         if (!SAVE.data.b.oops && SAVE.data.n.plot < 30.1) {
            await renderer.when(() => game.room !== 's_battle' || (player.position.x > 270 && game.movement));
            if (game.room !== 's_battle') {
               return;
            }
            await dialogue('auto', ...text.a_starton.truetext.papyrus5);
            SAVE.data.n.plot = 30.1;
         }
         await renderer.when(() => game.room !== 's_battle' || (player.position.x > 310 && game.movement));
         if (game.room !== 's_battle') {
            return;
         }
         game.movement = false;
         player.face = 'right';
         battler.load(groups.papyrus);
         const paps = character(
            'papyrus',
            papreal() ? characters.papyrusStark : characters.papyrus,
            { x: 490, y: player.position.y },
            'left',
            { alpha: SAVE.data.n.state_papyrus_capture < 1 ? 0 : 1 },
            SAVE.data.n.state_papyrus_capture < 1 ? null : 'main'
         );
         for (const facer of Object.values(paps.preset.walk)) {
            facer.reset();
         }
         const cam = new CosmosObject({ position: player.position });
         game.camera = cam;
         await cam.position.step(renderer, 3, { x: 400 });
         await renderer.pause(650);
         if (SAVE.data.n.state_papyrus_capture < 1) {
            const prepaps = character(
               'papyrus',
               papreal() ? characters.papyrusStark : characters.papyrus,
               renderer.projection({ x: 490, y: player.position.y }, game.camera.position),
               'left',
               { alpha: 0, priority: 1000, tint: 0 },
               'menu'
            );
            await prepaps.alpha.modulate(renderer, 450, 1);
            await renderer.pause(650);
            await dialogue('auto', ...text.a_starton.papyrusFinal1, ...text.a_starton.papyrusFinal2());
            const overlay = new CosmosRectangle({
               alpha: 0,
               priority: -1,
               size: { x: 1000, y: 1000 },
               position: { x: 160, y: 120 },
               anchor: 0,
               fill: 0xffffff,
               stroke: -1
            });
            renderer.attach('menu', overlay);
            await overlay.alpha.modulate(renderer, 300, 1);
            renderer.detach('menu', noisestorm!, prepaps);
            overlay.alpha.modulate(renderer, 300, 0).then(() => {
               renderer.detach('menu', overlay);
            });
            paps.alpha.value = 1;
            renderer.attach('main', paps);
            paps.face = 'left';
            await renderer.pause(850);
            header('x1').then(() => {
               paps.face = 'right';
            });
            header('x2').then(() => {
               paps.preset = characters.papyrus;
               paps.face = 'left';
            });
            await dialogue('auto', ...text.a_starton.papyrusFinal3());
         } else {
            await renderer.pause(450);
            switch (SAVE.data.n.state_papyrus_capture) {
               case 1:
                  await dialogue('auto', ...text.a_starton.papyrusFinal5);
                  break;
               case 2:
                  await dialogue('auto', ...text.a_starton.papyrusFinal6);
                  break;
               case 3:
                  await dialogue('auto', ...text.a_starton.papyrusFinal7());
                  await dialogue(
                     'auto',
                     ...[ text.a_starton.papyrusFinal7a, text.a_starton.papyrusFinal7b ][choicer.result]
                  );
                  break;
               case 4:
                  await dialogue('auto', ...text.a_starton.papyrusFinal8());
                  await dialogue(
                     'auto',
                     ...[ text.a_starton.papyrusFinal7a, text.a_starton.papyrusFinal8a ][choicer.result]
                  );
                  break;
            }
         }
         let b = false;
         if (SAVE.data.n.state_papyrus_capture < 3 || choicer.result === 1) {
            heal(void 0, false);
            await battler.shatter(groups.papyrus);
            await renderer.pause(333);
            await battler.encounter(player, groups.papyrus, false);
            battler.SOUL.metadata.color = 'red';
            battler.SOUL.velocity.y = 0;
            if (battler.volatile[0].vars.fail) {
               game.movement = false;
               renderer.detach('main', paps);
               renderer.alpha.modulate(renderer, 0, 0);
               game.camera = player;
               await teleport('s_capture', 'down', 182, 92, world);
               heal(void 0, false);
               game.movement = true;
               return;
            }
            if (battler.bullied.includes(battler.volatile[0])) {
               b = true;
            }
         } else {
            battler.unload(groups.papyrus);
         }
         SAVE.data.n.plot = 31;
         if (SAVE.data.n.state_starton_papyrus < 1) {
            game.movement = false;
            let mus: CosmosInstance;
            const dark = world.edgy || world.killed0;
            await renderer.pause(650);
            dark && (mus = music.papyrus.instance(renderer));
            paps.preset = characters.papyrus;
            paps.face = 'left';
            await dialogue('auto', ...text.a_starton.papyrusFinal4(b));
            if (!dark) {
               mus = music.papyrus.instance(renderer);
               await dialogue(
                  'auto',
                  ...[ text.a_starton.papyrusFinal4a1, text.a_starton.papyrusFinal4a2 ][choicer.result](b)
               );
               await renderer.pause(1000);
               await dialogue(
                  'auto',
                  ...[ text.a_starton.papyrusFinal4b1, text.a_starton.papyrusFinal4b2 ][
                     SAVE.data.b.flirt_papyrus ? 1 : 0
                  ],
                  ...text.a_starton.papyrusFinal4c1
               );
            }
            await dialogue('auto', ...text.a_starton.papyrusFinal4c2);
            const OG = mus!.gain.value;
            await mus!.gain.modulate(renderer, 750, 0);
            await renderer.pause(250);
            await dialogue('auto', ...text.a_starton.papyrusFinal4d);
            mus!.gain.value = OG;
            await dialogue(
               'auto',
               ...text.a_starton.papyrusFinal4e,
               ...(dark
                  ? text.a_starton.papyrusFinal4f3
                  : SAVE.data.b.flirt_papyrus
                  ? text.a_starton.papyrusFinal4f2
                  : text.a_starton.papyrusFinal4f1),
               ...text.a_starton.papyrusFinal4g
            );
            world.postnoot && world.nootflags.add('papyrus');
            if (player.position.y < 50) {
               paps.priority.value = 100000;
            } else {
               paps.priority.value = -100000;
            }
            await paps.walk(renderer, 4, {
               x: player.position.x - 80,
               y: player.position.y < 50 ? player.position.y + 20 : player.position.y - 20
            });
            renderer.detach('main', paps);
            mus!.gain.modulate(renderer, 1250, 0).then(() => mus.stop());
            while (cam.position.x > player.position.x + 3) {
               cam.position.x -= 3;
               await renderer.on('tick');
            }
            game.camera = player;
            game.movement = true;
         } else {
            renderer.detach('main', paps);
            if (world.genocide) {
               const asgoreAssets = new CosmosInventory(
                  content.iocAsgoreLeft,
                  content.iocAsgoreLeftTalk,
                  content.iocAsgoreRight,
                  content.iocAsgoreRightTalk,
                  inventories.idcAsgore,
                  content.avAsgore,
                  content.amPrebattle
               );
               asgoreAssets.name = 'asgoreAssets';
               const asgoreLoader = asgoreAssets.load();
               await renderer.pause(650);
               SAVE.flag.b._victory = true;
               SAVE.flag.n._genocide_milestone_last = 1;
               SAVE.flag.n.genocide_milestone = Math.max(1, SAVE.flag.n.genocide_milestone) as 1;
               const battleQueue = battler.load(groups.shockasgore);
               goatbro.metadata.override = true;
               goatbro.position.set(game.camera.position.x + 180, player.position.y);
               renderer.attach('main', goatbro);
               goatbro.alpha.value = 1;
               goatbro.face = 'left';
               await goatbro.walk(renderer, 3, { x: player.position.x + 21 });
               await renderer.pause(650);
               await dialogue('auto', ...text.a_starton.genotext.asriel29());
               await Promise.all([
                  asgoreLoader,
                  player.walk(renderer, 3, { x: cam.position.x }),
                  goatbro.walk(renderer, 3, { x: cam.position.x + 21 })
               ]);
               const gorey = new CosmosCharacter({
                  position: { x: 960, y: player.position.y },
                  preset: characters.asgore,
                  key: 'asgore',
                  face: 'left'
               });
               renderer.attach('main', gorey);
               game.camera = player;
               await Promise.all([ player.walk(renderer, 3, { x: 720 }), goatbro.walk(renderer, 3, { x: 741 }) ]);
               if (SAVE.flag.n.ga_asriel30++ < 1) {
                  notifier(goatbro, false);
               }
               await renderer.pause(850);
               cam.position = player.position.clone();
               game.camera = cam;
               await cam.position.modulate(renderer, 1350, { x: 840, y: player.position.y });
               let jeebs = music.prebattle.instance(renderer);
               jeebs.rate.value = 0.25;
               await renderer.pause(1650);
               await dialogue('auto', ...text.a_starton.genotext.asriel30());
               if (SAVE.flag.n.ga_asriel30x < 1) {
                  jeebs.stop();
                  sounds.noise.instance(renderer);
                  renderer.alpha.value = 0;
                  speech.state.face = faces.asgorePensive;
                  speech.state.face.reset();
                  await Promise.all([ battleQueue, renderer.pause(300) ]);
                  battler.SOUL.alpha.value = 1;
                  renderer.alpha.value = 1;
                  sounds.noise.instance(renderer);
                  await battler.start(groups.shockasgore);
                  battler.unload(groups.shockasgore);
                  jeebs = music.prebattle.instance(renderer);
                  jeebs.rate.value = 0.25;
                  jeebs.gain.modulate(renderer, 300, jeebs.daemon.gain);
                  await renderer.pause(1000);
                  await dialogue('auto', ...text.a_starton.genotext.asriel30a);
               } else {
                  SAVE.flag.n.ga_asriel30x++;
               }
               await renderer.pause(650);
               await dialogue('auto', ...text.a_starton.genotext.asriel30b);
               jeebs.stop();
               dialogue('auto', ...text.a_starton.genotext.asriel30c);
               player.walk(renderer, 3, { x: 980 }).then(async () => {
                  await teleport('s_exit', 'right', 20, 170, world);
                  game.movement = false;
                  game.camera = player;
                  goatbro.position = player.position.add(21, 0);
                  renderer.detach('main', gorey);
                  await Promise.all([
                     player.walk(renderer, 3, { x: 200 }, { y: 120 }),
                     goatbro.walk(renderer, 3, { x: 200 }, { y: 110 }, { x: 220 }).then(() => {
                        goatbro.face = 'left';
                     })
                  ]);
                  await renderer.pause(1150);
                  await dialogue('auto', ...text.a_starton.genotext.asriel30d());
                  await player.walk(renderer, 1.5, { y: 100 });
                  const fd = fader();
                  await fd.alpha.modulate(renderer, 1000, 1);
                  goatbro.metadata.override = false;
                  await Promise.all([
                     renderer.pause(1000),
                     teleport('f_start', 'up', 160, 490, { fast: true, fade: false, cutscene: true })
                  ]);
                  quickresume(true);
                  await fd.alpha.modulate(renderer, 300, 0);
                  game.movement = true;
               });
               goatbro.walk(renderer, 3, { x: 1000 });
               await renderer.when(() => goatbro.position.x > gorey.position.x - 25);
               atlas.switch(null);
               typer.reset(true);
               sounds.phase.instance(renderer);
               gorey.scale.modulate(renderer, 125, { x: 1.05, y: 1 }).then(() => {
                  gorey.scale.modulate(renderer, 50, { x: 0, y: 1 });
               });
               await gorey.alpha.modulate(renderer, 100, 0.8);
               gorey.alpha.value = 0;
               await renderer.pause(40);
               gorey.alpha.value = 1;
               await renderer.pause(35);
               SAVE.data.n.plot = 32;
            }
            game.camera = player;
            game.movement = true;
         }
         break;
      }
      case 's_bonehouse': {
         if (SAVE.data.n.plot === 72 && !world.runaway) {
            instance('main', 'paptv')?.destroy();
         }
         instance('main', 'couch')!.object.priority.value = 42000;
         for (const botto of instances('main', 'botto')) {
            botto.object!.priority.value = -5000;
         }
         const roomState = (startonStates.rooms.s_bonehouse ??= {});
         const kitty = roomState.kitchen === true;
         if (!kitty) {
            for (const sussy of instance('below', 'kitchenwallv1')!.object.objects) {
               if (sussy.metadata.barrier) {
                  sussy.metadata.barrier = false;
                  sussy.metadata.restore = 'barrier';
               } else if (sussy.metadata.interact) {
                  sussy.metadata.interact = false;
                  sussy.metadata.restore = 'interact';
               }
            }
         }
         if (dateready() && SAVE.data.n.state_starton_papyrus === 0) {
            for (const sprite of Object.values(characters.papyrus.walk)) {
               sprite.duration = 4;
            }
            roomState.paps = temporary(
               character('papyrus', characters.papyrus, { x: kitty ? 215 : 35, y: 185 }, kitty ? 'up' : 'right', {
                  size: { x: 20, y: 5 },
                  anchor: { x: 0, y: 1 },
                  metadata: {
                     speed: 4,
                     kitchen: kitty,
                     name: 'starton',
                     args: [ 'papdate' ],
                     barrier: true,
                     interact: true,
                     override: void 0 as boolean | void,
                     exhausted: void 0 as boolean | void,
                     tired: void 0 as boolean | void
                  }
               }).on('tick', function () {
                  if (this.metadata.override) {
                     return;
                  }
                  if (this.metadata.kitchen !== roomState.kitchen) {
                     this.metadata.kitchen = roomState.kitchen;
                     this.metadata.speed = Math.min(8, this.metadata.speed + 0.25);
                     if (6 <= this.metadata.speed) {
                        if (this.metadata.speed === 8) {
                           this.metadata.exhausted = true;
                        } else {
                           this.metadata.tired = true;
                        }
                        sounds.bell.instance(renderer).rate.value = CosmosMath.remap_clamped(
                           this.metadata.speed,
                           1,
                           1.25,
                           6,
                           8
                        );
                     }
                  }
                  if (this.talk) {
                     this.face = ultimaFacer(this);
                     return;
                  }
                  if (roomState.kitchen) {
                     if (this.position.x < 215) {
                        if (this.face !== 'right') {
                           this.sprite.reset();
                           this.face = 'right';
                           this.sprite.reset().enable();
                        } else if (!this.sprite.active) {
                           this.sprite.reset().enable();
                        }
                        this.position.x = Math.min(this.position.x + this.metadata.speed, 215);
                     } else {
                        if (this.face !== 'up') {
                           this.sprite.reset();
                           this.face = 'up';
                           this.sprite.reset();
                        }
                        this.position.x = 215;
                        this.metadata.speed = 4;
                     }
                  } else if (this.position.x > 35) {
                     if (this.face !== 'left') {
                        this.sprite.reset();
                        this.face = 'left';
                        this.sprite.reset().enable();
                     } else if (!this.sprite.active) {
                        this.sprite.reset().enable();
                     }
                     this.position.x = Math.max(this.position.x - this.metadata.speed, 35);
                  } else {
                     if (this.face !== 'right') {
                        this.sprite.reset();
                        this.face = 'right';
                        this.sprite.reset();
                     }
                     this.position.x = 35;
                     this.metadata.speed = 4;
                  }
               }),
               'main'
            );
            if (from === 's_town2' && player.position.y > 200) {
               roomState.kitty = 0;
            } else {
               from === '_void' && kittytext();
            }
         }
         break;
      }
      case 's_papyrusroom': {
         if (roomready()) {
            const roomState = (startonStates.rooms.s_papyrusroom ??= {});
            roomState.dateAssets ??= new CosmosInventory(
               content.ibuHP,
               content.ibuBubbleTwinkly,
               content.ibcPapyrusBattle,
               content.amDatingstart,
               inventories.ibcPapyrusHead
            );
            roomState.dateAssets.name = 'dateAssets';
            roomState.dateLoader ??= roomState.dateAssets.load();
            roomState.paps = temporary(
               new CosmosCharacter({
                  preset: characters.papyrus,
                  key: 'papyrus',
                  face: 'down',
                  position: { x: 145, y: 140 },
                  size: { x: 20, y: 5 },
                  anchor: { x: 0, y: 1 },
                  metadata: { name: 'starton', args: [ 'papdate' ], barrier: true, interact: true }
               }).on('tick', function () {
                  this.face = ultimaFacer(this);
               }),
               'main'
            );
            from === '_void' && kittytext();
         }
         break;
      }
      case 's_sansroom': {
         SAVE.data.b.amogus || (instance('below', 'yousleptinthebed')!.object.alpha.value = 0);
         break;
      }
   }
});

events.on('tick', () => {
   game.movement && game.room[0] === 's' && startonScript('tick');
});

events.on('use', async (key, index) => {
   switch (key) {
      case 'burgerz':
         saver.add('burgerz_use1');
         break;
      case 'burgerz_use1':
         saver.add('burgerz_use2');
         break;
      case 'voidy':
         if (battler.active) {
            return;
         }
         if (game.room === '_void') {
            if (player.metadata.voidkey) {
               const { room, face, position } = player.metadata.voidkey;
               player.metadata.voidkey = null;
               await teleport(room, face, position.x, position.y, world);
            }
         } else {
            player.metadata.voidkey = { room: game.room, face: player.face, position: player.position.value() };
            rooms.of('_void').neighbors = [ game.room, ...rooms.of(game.room).neighbors ];
            await teleport(
               '_void',
               'up',
               player.metadata.reverse ? 180 : 140,
               player.metadata.reverse ? 10 : 230,
               world
            );
         }
         break;
      case 'pop':
      case 'super_pop':
         if (!game.vortex && battler.active) {
            game.vortex_factor = key === 'super_pop' ? 0.7 : 0.85;
            renderer.speed.modulate(renderer, 300, renderer.speed.value * game.vortex_factor);
            game.vortex = true;
            let insta = false;
            Promise.race([
               events.on('resume').then(() => events.on('resume')),
               events.on('escape').then(() => (insta = true)),
               events.on('victory').then(() => (insta = true)),
               events.on('exit').then(() => (insta = true))
            ]).then(() => {
               game.vortex = false;
               const value = renderer.speed.value / game.vortex_factor;
               insta && (renderer.speed.value = value);
               renderer.speed.modulate(renderer, insta ? 0 : 300, value);
            });
         }
         break;
      case 'chip':
         if (battler.active) {
            return;
         }
         if (game.room === 's_robot' && player.position.y > 160 && SAVE.data.n.plot !== 72 && !world.runaway) {
            if (SAVE.data.n.state_starton_npc98 === 1) {
               SAVE.data.n.state_starton_npc98 = 4;
            } else if (SAVE.data.n.state_starton_npc98 === 2) {
               SAVE.data.n.state_starton_npc98 = 4.1;
            }
            await dialogue('auto', ...text.a_starton.eat_chip);
            oops();
         }
         break;
      case 'nice_cream':
         if (battler.active) {
            return;
         }
         if (!noNiceCreamForU()) {
            await dialogue('auto', ...text.a_starton.eat_cream);
         }
         break;
      case 'corndog_sword':
         SAVE.data.n.corndogger === 5 && SAVE.storage.inventory.remove(index);
         break;
   }
});

keys.downKey.on('down', () => {
   if (game.input && (!game.movement || battler.active) && atlas.target === 'navscript' && !keys.altKey.active()) {
      navscript.state.handler('down');
   }
});

keys.leftKey.on('down', () => {
   if (game.input && (!game.movement || battler.active) && atlas.target === 'navscript' && !keys.altKey.active()) {
      navscript.state.handler('left');
   }
});

keys.rightKey.on('down', () => {
   if (game.input && (!game.movement || battler.active) && atlas.target === 'navscript' && !keys.altKey.active()) {
      navscript.state.handler('right');
   }
});

keys.upKey.on('down', () => {
   if (game.input && (!game.movement || battler.active) && atlas.target === 'navscript' && !keys.altKey.active()) {
      navscript.state.handler('up');
   }
});

typer.on('header', header => {
   switch (header) {
      case 's.stop':
         game.music && (game.music.rate.value = 0);
         break;
      case 's.resume':
         game.music && (game.music.rate.value = world.ambiance);
         game.music?.gain.modulate(renderer, 1000, game.music.daemon.gain);
         break;
   }
});

events.on('battle', () =>
   roomReaction({
      async s_doggo (x) {
         if (player.position.x < 280 && roomKills().s_doggo++ < 1) {
            events.fire('tick');
            const n = instance('main', 's_snowdrake');
            if (n) {
               x();
               await n.talk('a', talkFinder(), 'auto', ...text.a_starton.snowdrakeX);
            }
         }
      },
      async s_pacing (x) {
         if (!(world.population < 6 || world.genocide) && roomKills().s_pacing++ < 1) {
            events.fire('tick');
            const n1 = instance('main', 's_moonrocks1');
            const n2 = instance('main', 's_moonrocks2');
            if (n1 && n2) {
               x();
               await n1.talk('a', talkFinder(), 'auto', ...text.a_starton.moonrocksX1);
               await n2.talk('b', talkFinder(), 'auto', ...text.a_starton.moonrocksX2);
            }
         }
      },
      async s_greater (x) {
         events.fire('tick');
         const n = instance('main', 's_faun');
         if (n) {
            x();
            await n.talk('a', talkFinder(), 'dialoguerBottom', ...text.a_starton.faunX());
         }
      }
   })
);

export default shops;

CosmosUtils.status(`LOAD MODULE: STARTON AREA (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
