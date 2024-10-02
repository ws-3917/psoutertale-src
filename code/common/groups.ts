import text from '../../languages/default/text/common';
import { content, music } from '../systems/assets';
import { atlas, events, game, keys, renderer } from '../systems/core';
import { antiAteThreshold, ateThreshold, battler, world } from '../systems/framework';
import { OutertaleChoice, OutertaleGroup, OutertaleVolatile } from '../systems/outertale';
import { SAVE } from '../systems/save';
import { CosmosInventory, CosmosPointSimple, CosmosUtils } from '../systems/storyteller';
import opponents from './opponents';
import patterns, { resetBox, standardPos, standardSize } from './patterns';

export async function standardMusic () {
   if (ateThreshold()) {
      battler.music = music.battle2.instance(renderer);
   } else {
      battler.music = music.battle1.instance(renderer);
      antiAteThreshold() && (battler.music.rate.value *= 0.8);
   }
}

export function autoMusic () {
   battler.music?.stopped && standardMusic();
}

export function endMusic () {
   battler.music?.stop();
}

export function spareFlee (choice: OutertaleChoice) {
   switch (choice.type) {
      case 'spare':
         battler.spare();
         break;
      case 'flee':
         events.fire('escape');
         endMusic();
         return true;
   }
   return false;
}

export function defaultSetup (
   pattern: (choice: OutertaleChoice, target: number, volatile: OutertaleVolatile) => Promise<void>,
   size?: CosmosPointSimple,
   basedbox = false
) {
   return async (choice: OutertaleChoice, target: number, volatile: OutertaleVolatile) => {
      if (spareFlee(choice)) {
         return;
      }
      if (battler.alive.length !== 0) {
         await battler.resume(async () => {
            await standardSize(size, basedbox);
            standardPos(basedbox);
            await pattern(choice, target, volatile);
            await resetBox(basedbox);
         });
      } else {
         endMusic();
      }
   };
}

export function turnSkip () {
   let skip = false;
   for (const v of battler.alive) {
      if (v.vars.kidskip) {
         skip = true;
         v.vars.kidskip = false;
      }
   }
   return skip;
}

const groups = {
   maddummy: new OutertaleGroup({
      assets: new CosmosInventory(content.amDummyboss, content.amPrebattle),
      init () {
         battler.flee = false;
         battler.grid = 16 <= SAVE.data.n.kills_wastelands ? content.ibuGrid1 : null;
         battler.status = () => text.b_opponent_maddummy.status1();
         const mus =
            16 <= SAVE.data.n.kills_wastelands
               ? music.prebattle.instance(renderer)
               : music.dummyboss.instance(renderer);
         battler.music = mus;
         if (16 <= SAVE.data.n.kills_wastelands) {
            opponents.maddummy.ghost = false;
            opponents.maddummy.metadata.nootexempt = false;
            battler.volatile[0].sparable = true;
         } else {
            battler.volatile[0].container.position.x = 163.5;
            battler.volatile[0].container.position.y = 82.5;
         }
         return true;
      },
      opponents: [ [ opponents.maddummy, { x: 108, y: 68 } ] ]
   }),

   moldsmal: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1, content.amBattle2),
      id: 7,
      init () {
         battler.multitext.active = true;
         battler.grid = content.ibuGrid1;
         battler.status = () => text.b_opponent_moldsmal.status1();
         standardMusic();
         return true;
      },
      async handler (choice) {
         if (spareFlee(choice)) {
            return;
         }
         const vars = battler.volatile[0].vars;
         battler.alive.length < (vars.enemies || 2) && (battler.status = () => text.b_opponent_moldsmal.status6);
         vars.enemies = battler.alive.length;
         if (battler.alive.length !== 0) {
            await battler.resume(async () => {
               await standardSize({ x: 80 + battler.alive.length * 20, y: 65 });
               standardPos();
               autoMusic();
               if (turnSkip()) {
                  await renderer.pause(450);
               } else {
                  let i = 0;
                  while (i < battler.alive.length) {
                     patterns.moldsmal(i++);
                  }
                  await battler.turnTimer(game.room[0] === 'w' ? 6000 : 8000);
               }
               await resetBox();
            });
         } else {
            endMusic();
         }
      },
      opponents: [
         [ opponents.moldsmal, { x: 85, y: 120 } ],
         [ opponents.moldsmal, { x: 185, y: 120 } ]
      ]
   }),

   spacetop: new OutertaleGroup({
      assets: new CosmosInventory(content.amBattle1, content.amBattle2),
      id: 16,
      init () {
         battler.grid = content.ibuGrid1;
         battler.status = () =>
            world.goatbro ? text.b_opponent_spacetop.genoStatus : text.b_opponent_spacetop.status1;
         standardMusic();
         return true;
      },
      handler: defaultSetup(() => {
         if (battler.opponents.includes(opponents.spacetop)) {
            patterns.spacetop();
            return battler.turnTimer(game.room[0] === 's' ? 7000 : 9000);
         } else {
            return renderer.pause(450);
         }
      }),
      opponents: [ [ opponents.spacetop, { x: 135, y: 120 } ] ]
   }),

   nobody: new OutertaleGroup({
      assets: new CosmosInventory(content.amPrebattle),
      init () {
         const jeebs = music.prebattle.instance(renderer);
         jeebs.rate.value = world.bullied ? 0.5 : 0.25;
         jeebs.gain.value = 0;
         jeebs.gain.modulate(renderer, 300, jeebs.daemon.gain);
         battler.SOUL.alpha.value = 0;
         game.text = text.b_group_common.nobody();
         atlas.attach(renderer, 'menu', 'battlerAdvancedText');
         battler.alpha.value = 1;
         keys.interactKey.on('down').then(() => {
            game.text = '';
            atlas.detach(renderer, 'menu', 'battlerAdvancedText');
            jeebs.gain.modulate(renderer, 300, 0).then(() => {
               jeebs.stop();
            });
            events.fire('exit');
         });
         return false;
      },
      opponents: []
   })
};

events.on('fatal', v => {
   if (
      v.opponent.metadata.automusic &&
      battler.alive.length > 1 &&
      ((!ateThreshold() && ateThreshold(1)) || (!antiAteThreshold() && antiAteThreshold(1)))
   ) {
      endMusic();
   }
});

for (const [ key, value ] of Object.entries(groups)) {
   value.assets.name = `groups::${key}`;
}

export default groups;

CosmosUtils.status(`LOAD MODULE: COMMON GROUPS (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
