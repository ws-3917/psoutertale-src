import { world } from '../systems/framework';
import { SAVE } from '../systems/save';

/** tem shop armor price */
export function armorprice () {
   const d = SAVE.flag.n._deaths;
   return d === 0
      ? 9999
      : d < 6
      ? 10000 - d * 1000
      : d < 10
      ? 5000 - (d - 5) * 500
      : d < 18
      ? 3000 - (d - 9) * 200
      : d < 20
      ? 1400 - (d - 17) * 150
      : d < 25
      ? 1000
      : d < 30
      ? 750
      : 500;
}

export function temgone () {
   return SAVE.data.b.svr || world.runaway || SAVE.data.s.state_foundry_deathroom === 'f_village';
}

export function respecc () {
   return world.trueKills === 0 && SAVE.data.n.bully > 9 && !SAVE.data.b.f_state_kidd_betray;
}

export function badSpider () {
   return world.genocide || world.population < 6;
}

export function startonATE () {
   return world.population_area('s') < 6 && !world.bullied_area('s');
}

export function geno () {
   return world.genocide || startonATE();
}

export function ghostpartyCondition () {
   return SAVE.data.n.plot === 72 && SAVE.data.b.a_state_hapstablook && !SAVE.data.b.svr && !world.runaway;
}

export function dogex () {
   return world.dead_skeleton && startonATE();
}

export function dogecon () {
   return dogex() || world.dead_canine;
}
