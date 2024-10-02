import commonText from '../../languages/default/text/common';
import text from '../../languages/default/text/outlands';
import { autoMusic, defaultSetup, endMusic, resetBox, standardMusic, standardPos, standardSize } from '../common/api';
import commonOpponents from '../common/opponents';
import commonPatterns from '../common/patterns';
import { content, music } from '../systems/assets';
import { events, renderer } from '../systems/core';
import { battler, world } from '../systems/framework';
import { OutertaleGroup } from '../systems/outertale';
import { SAVE } from '../systems/save';
import { CosmosAnimation, CosmosInventory, CosmosUtils } from '../systems/storyteller';
import opponents from './opponents';
import patterns from './patterns';

export function fixMigosp () {
   battler.status = () => text.b_opponent_migosp.soloStatus;
   const volatile = battler.alive[0];
   volatile.sparable = true;
   const anim = volatile.container.objects[0] as CosmosAnimation;
   anim.index = 0;
   anim.resources = content.ibcMigospHappi;
   anim.enable();
}

export function active0O () {
   switch (battler.alive[0].opponent) {
      case opponents.froggit:
         return 'froggit';
      case opponents.whimsun:
         return 'whimsun';
      case opponents.migosp:
         return 'migosp';
      case commonOpponents.moldsmal:
         return 'moldsmal';
   }
}

const groups = {
   dummy: new OutertaleGroup({
      assets: new CosmosInventory(content.amPrebattle),
      init () {
         battler.grid = content.ibuGrid1;
         battler.status = () => commonText.b_opponent_dummy.status1;
         battler.music = music.prebattle.instance(renderer);
         return true;
      },
      opponents: [ [ opponents.dummy, { x: 108, y: 68 } ] ]
   }),

   fakefroggit: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1, content.amBattle2),
      id: 0, // same ID as froggit
      init () {
         battler.grid = content.ibuGrid1;
         battler.status = () => text.b_opponent_froggit.status1;
         standardMusic();
         battler.volatile[0].vars.fake = true;
         battler.volatile[0].hp = 10;
         battler.volatile[0].opponent.hp = 10;
         events.on('battle-exit').then(() => {
            battler.volatile[0].opponent.hp = 30;
         });
         return true;
      },
      async handler (choice, target, volatile) {
         switch (choice.type) {
            case 'act':
               switch (choice.act) {
                  case 'compliment':
                     SAVE.data.n.state_wastelands_froggit = 1;
                     break;
                  case 'flirt':
                     SAVE.data.n.state_wastelands_froggit = 2;
                     break;
                  case 'threat':
                     SAVE.data.n.state_wastelands_froggit = 4;
                     break;
               }
               break;
            case 'flee':
               events.fire('escape');
               endMusic();
               SAVE.data.n.state_wastelands_froggit = 3;
               return;
            case 'fight':
               battler.music?.stop();
               if (SAVE.data.n.kills > 0) {
                  SAVE.data.n.state_wastelands_froggit = 5;
                  return;
               } else if (battler.hurt.includes(volatile)) {
                  world.bully();
                  SAVE.data.n.state_wastelands_froggit = 4;
                  break;
               }
         }
         endMusic();
         const tori = new CosmosAnimation({
            anchor: { x: 0, y: 1 },
            position: { y: 120, x: 360 },
            resources: content.ibcTorielScram
         });
         renderer.attach('menu', tori);
         battler.garbage.push([ 'menu', tori ]);
         await tori.position.modulate(renderer, 950, { x: 260, y: 120 });
         await renderer.pause(350);
         tori.index = 1;
         const frogger = new CosmosAnimation({
            anchor: { y: 1, x: 0 },
            resources: content.ibcFroggitBody,
            position: { y: -2 }
         });
         battler.volatile[target].container.objects[0] = frogger;
         await renderer.pause(850);
         frogger.index = 1;
         renderer.pause(1250).then(() => {
            tori.index = 0;
         });
         await battler.volatile[target].container.position.modulate(renderer, 2500, { x: -70, y: 120 });
         events.fire('exit');
      },
      opponents: [ [ opponents.froggit, { x: 135, y: 120 } ] ]
   }),

   froggit: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1, content.amBattle2),
      id: 0,
      init () {
         battler.grid = content.ibuGrid1;
         battler.status = () => text.b_opponent_froggit.status1;
         standardMusic();
         return true;
      },
      handler: defaultSetup(async () => {
         const px = patterns.froggit();
         if (px) {
            await px;
            return;
         }
         await battler.turnTimer(6000);
      }),
      opponents: [ [ opponents.froggit, { x: 135, y: 120 } ] ]
   }),

   whimsun: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1, content.amBattle2),
      id: 1,
      init () {
         battler.grid = content.ibuGrid1;
         battler.status = () => text.b_opponent_whimsun.status1;
         standardMusic();
         return true;
      },
      handler: defaultSetup(() => {
         patterns.whimsun();
         return battler.turnTimer(6000);
      }),
      opponents: [ [ opponents.whimsun, { x: 135, y: 50 } ] ]
   }),

   froggitWhimsun: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1, content.amBattle2),
      id: 2,
      init () {
         battler.multitext.active = true;
         battler.grid = content.ibuGrid1;
         battler.status = () => text.b_group_outlands.froggitWhimsun;
         standardMusic();
         return true;
      },
      async handler (choice) {
         const vars = battler.volatile[0].vars;
         switch (choice.type) {
            case 'spare':
               battler.spare();
               break;
            case 'flee':
               events.fire('escape');
               endMusic();
               return;
         }
         if (battler.alive.length < (vars.enemies || 2)) {
            battler.status = battler.opponents.includes(opponents.froggit)
               ? () => text.b_group_outlands.froggitWhimsun2a
               : () => text.b_group_outlands.froggitWhimsun2b;
         }
         vars.enemies = battler.alive.length;
         if (battler.alive.length !== 0) {
            await battler.resume(async () => {
               await standardSize();
               standardPos();
               autoMusic();
               if (battler.alive.length > 1) {
                  const p = battler.pattern('fw1', [ 0, 1 ]);
                  patterns.froggit(p, 'whimsun');
                  patterns.whimsun(p, 'froggit', p === 0);
               } else if (active0O() === 'whimsun') {
                  patterns.whimsun();
               } else {
                  const px = patterns.froggit();
                  if (px) {
                     await px;
                     await resetBox();
                     return;
                  }
               }
               await battler.turnTimer(6000);
               await resetBox();
            });
         } else {
            endMusic();
         }
      },
      opponents: [
         [ opponents.froggit, { x: 85, y: 120 } ],
         [ opponents.whimsun, { x: 185, y: 50 } ]
      ]
   }),

   moldsmalMigosp: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1, content.amBattle2),
      id: 3,
      init () {
         battler.multitext.active = true;
         battler.grid = content.ibuGrid1;
         battler.status = () => text.b_group_outlands.moldsmalMigosp;
         standardMusic();
         return true;
      },
      async handler (choice) {
         const vars = battler.volatile[0].vars;
         switch (choice.type) {
            case 'spare':
               battler.spare();
               break;
            case 'flee':
               events.fire('escape');
               endMusic();
               return;
         }
         if (battler.alive.length < (vars.enemies || 2)) {
            if (battler.alive.length === 1 && battler.opponents.includes(opponents.migosp)) {
               fixMigosp();
            } else {
               battler.status = () => commonText.b_opponent_moldsmal.status8();
            }
         }
         vars.enemies = battler.alive.length;
         if (battler.alive.length !== 0) {
            await battler.resume(async () => {
               await standardSize();
               standardPos();
               autoMusic();
               if (battler.alive.length === 1 && battler.opponents.includes(opponents.migosp)) {
                  await patterns.migosp(1);
               } else {
                  if (battler.alive.length > 1) {
                     patterns.migosp(0, false, true);
                  }
                  commonPatterns.moldsmal();
                  await battler.turnTimer(6000);
               }
               await resetBox();
            });
         } else {
            endMusic();
         }
      },
      opponents: [
         [ commonOpponents.moldsmal, { x: 85, y: 120 } ],
         [ opponents.migosp, { x: 185, y: 120 } ]
      ]
   }),

   loox: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1, content.amBattle2),
      id: 4,
      init () {
         battler.multitext.active = true;
         battler.grid = content.ibuGrid1;
         battler.status = () => text.b_opponent_loox.status1;
         standardMusic();
         return true;
      },
      async handler (choice) {
         const vars = battler.volatile[0].vars;
         switch (choice.type) {
            case 'spare':
               battler.spare();
               break;
            case 'flee':
               events.fire('escape');
               endMusic();
               return;
         }
         if (battler.alive.length < (vars.enemies || 2)) {
            battler.status = () => text.b_opponent_loox.status7;
         }
         vars.enemies = battler.alive.length;
         if (battler.alive.length !== 0) {
            await battler.resume(async () => {
               await standardSize();
               standardPos();
               autoMusic();
               if (battler.alive.length > 1) {
                  patterns.loox(0);
                  patterns.loox(1);
               } else {
                  patterns.loox();
               }
               await battler.turnTimer(6000);
               await resetBox();
            });
         } else {
            endMusic();
         }
      },
      opponents: [
         [ opponents.loox, { x: 85, y: 120 } ],
         [ opponents.loox, { x: 185, y: 120 } ]
      ]
   }),

   mushy: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1, content.amBattle2),
      id: 5,
      init () {
         battler.grid = content.ibuGrid1;
         battler.status = () => text.b_opponent_mushy.status1;
         standardMusic();
         return true;
      },
      handler: defaultSetup(choice => {
         patterns.mushy(choice.type === 'act' && choice.act === 'challenge');
         return battler.turnTimer(6000);
      }),
      opponents: [ [ opponents.mushy, { x: 135, y: 120 } ] ]
   }),

   looxMigospWhimsun: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1, content.amBattle2),
      id: 6,
      init () {
         battler.multitext.active = true;
         battler.grid = content.ibuGrid1;
         battler.status = () => text.b_group_outlands.looxMigospWhimsun;
         standardMusic();
         return true;
      },
      async handler (choice) {
         const vars = battler.volatile[0].vars;
         switch (choice.type) {
            case 'spare':
               battler.spare();
               break;
            case 'flee':
               events.fire('escape');
               endMusic();
               return;
         }
         if (battler.alive.length < (vars.enemies || 3)) {
            if (battler.alive.length === 1 && battler.opponents.includes(opponents.migosp)) {
               fixMigosp();
            } else {
               battler.status =
                  battler.alive.length > 1
                     ? () => text.b_group_outlands.looxMigospWhimsun2
                     : () => text.b_group_outlands.looxMigospWhimsun3;
            }
         }
         vars.enemies = battler.alive.length;
         if (battler.alive.length !== 0) {
            await battler.resume(async () => {
               await standardSize();
               standardPos();
               autoMusic();
               if (battler.alive.length === 1 && battler.opponents.includes(opponents.migosp)) {
                  await patterns.migosp(1);
               } else {
                  const l = battler.opponents.includes(opponents.loox);
                  const mig = battler.opponents.includes(opponents.migosp);
                  const whim = battler.opponents.includes(opponents.whimsun);
                  l && patterns.loox(mig ? 1 : void 0, mig, whim);
                  mig && patterns.migosp(0, whim);
                  whim &&
                     patterns.whimsun(
                        [ void 0, 0, 1 ][battler.alive.length - 1],
                        battler.alive.length > 1 ? 'froggit' : void 0
                     );
                  await battler.turnTimer(6000);
               }
               await resetBox();
            });
         } else {
            endMusic();
         }
      },
      opponents: [
         [ opponents.loox, { x: 35, y: 120 } ],
         [ opponents.migosp, { x: 135, y: 120 } ],
         [ opponents.whimsun, { x: 235, y: 50 } ]
      ]
   }),

   napstablook: new OutertaleGroup({
      grid: content.ibuGrid2,
      flee: false,
      status: () => text.b_opponent_napstablook.status1,
      music: music.ghostbattle,
      assets: new CosmosInventory(content.amGhostbattle),
      opponents: [ [ opponents.napstablook, { x: 160, y: 120 } ] ]
   }),

   toriel: new OutertaleGroup({
      grid: content.ibuGrid2,
      status: () => text.b_opponent_toriel.status1,
      music: music.torielboss,
      assets: new CosmosInventory(content.amTorielboss),
      opponents: [ [ opponents.toriel, { x: 160, y: 120 } ] ]
   })
};

for (const [ key, value ] of Object.entries(groups)) {
   value.assets.name = `groups::${key}`;
}

export default groups;

CosmosUtils.status(`LOAD MODULE: OUTLANDS GROUPS (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
