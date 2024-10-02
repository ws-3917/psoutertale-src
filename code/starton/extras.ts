import { postSIGMA, world } from '../systems/framework';
import { SAVE } from '../systems/save';

export const papreal = () => world.dead_skeleton || (SAVE.data.n.plot < 31 && (world.edgy || world.killed0));

export const solo = () => SAVE.data.n.plot_date < 2 || SAVE.data.n.exp > 0;

export const dateready = () => SAVE.data.n.plot_date < 0.2 && !world.edgy && !world.killed0 && SAVE.data.n.plot < 71.2;

export const roomready = () => SAVE.data.n.plot_date < 1 && !world.edgy && !world.killed0 && SAVE.data.n.plot < 71.2;

export const blookGone = () => world.genocide || world.killed0 || world.runaway || world.scared_ghost;

export const trueSpaghettiState = () => Math.max(SAVE.data.n.state_starton_spaghetti, postSIGMA() ? 1 : 0);
