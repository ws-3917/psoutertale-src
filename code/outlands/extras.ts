import { SAVE } from '../systems/save';

export function toriSV () {
   return SAVE.data.n.plot < 16 ? SAVE.data.b.oops : SAVE.data.n.state_wastelands_toriel !== 0;
}

export function toriCheck () {
   return (
      SAVE.data.n.plot > 7 &&
      SAVE.data.n.plot < 71.2 &&
      (SAVE.data.n.plot < 9 ||
         SAVE.data.n.plot === 9.1 ||
         (!toriSV() && (SAVE.data.b.w_state_catnap || SAVE.data.n.plot > 17)))
   );
}
