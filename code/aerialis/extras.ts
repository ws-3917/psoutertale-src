import { epilogueOverride } from '../common';
import { battler, iFancyYourVilliany, world } from '../systems/framework';
import { SAVE } from '../systems/save';

export function iRespeccYourVilliany () {
   return iFancyYourVilliany() && SAVE.data.b.undyne_respecc && 2.1 <= SAVE.data.n.plot_date && SAVE.data.n.exp <= 0;
}

export function glade () {
   return SAVE.data.n.kills_wastelands + SAVE.data.n.bully_wastelands < 11;
}

export function corefriendly () {
   return (
      SAVE.data.n.corekills + (SAVE.data.b.killed_knightknight ? 1 : 0) + (SAVE.data.b.killed_madjick ? 1 : 0) <
      (SAVE.data.b.ubershortcut ? 1 : 3)
   );
}

export function calm_lizard () {
   return battler.exp < 1 && corefriendly();
}

export function burger () {
   return (world.population_area('s') < 6 && !world.bullied_area('s')) || (world.badder_lizard && world.bad_lizard > 1);
}

export const adultEvac = (ep = false) =>
   world.genocide || // chaotic
   world.bad_lizard > 1 || // dark neutral
   world.runaway || // asriel bully
   (SAVE.data.b.bad_lizard && !world.bullied) || // triggered evacuation + killed people
   ((ep ? epilogueOverride(world.population < 2) : world.population < 2) && !world.bullied); // killed most people

export const teenEvac = (ep = false) =>
   adultEvac(ep) || // upper condition
   SAVE.data.b.bad_lizard; // triggered evacuation

export const childEvac = (ep = false) =>
   teenEvac(ep) || // upper condition
   (ep ? epilogueOverride(world.population < 2) : world.population < 2); // hurt/killed most people

export const babyEvac = (ep = false) =>
   childEvac(ep) || // upper condition
   (ep ? epilogueOverride(world.population < 6) : world.population < 6); // hurt/killed a few people
