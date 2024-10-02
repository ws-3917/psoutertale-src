import text from '../../languages/default/text/common';
import { atlas, game, renderer } from '../systems/core';
import { dialogue_primitive, world } from '../systems/framework';
import { SAVE } from '../systems/save';

export const helmetoverride = { state: false };

export const cs_state = { nc: false, p1x: 0, p1y: 0, p2x: 0, p2y: 0, p3x: 0, p3y: 0 };

export function pms () {
   if (world.bad_lizard < 2 && SAVE.data.n.state_foundry_undyne !== 2) {
      return [ 'alphys0', ...(SAVE.data.s.pms === '' ? [] : SAVE.data.s.pms.split(',')) ];
   } else {
      const doggoKill = SAVE.data.n.state_starton_doggo === 2;
      const startonKill = world.popmax(0) - SAVE.data.n.kills_starton < 6;
      const foundryKill = world.popmax(1) - SAVE.data.n.kills_foundry < 6;
      const sentryKill =
         (doggoKill ? 1 : 0) +
            (SAVE.data.n.state_starton_lesserdog === 2 ? 1 : 0) +
            (SAVE.data.n.state_starton_dogs === 2 ? 1 : 0) +
            (SAVE.data.n.state_starton_greatdog === 2 ? 1 : 0) >
         1;
      const eliteKill = SAVE.data.n.state_foundry_doge === 1 || SAVE.data.n.state_foundry_muffet === 1;
      const papyrusKill = SAVE.data.n.state_starton_papyrus === 1;
      const undyneKill = SAVE.data.n.state_foundry_undyne > 0;
      return [
         'alphysX0',
         'alphysX1',
         'alphysX2',
         'alphysX3',
         'alphysX4',
         'alphysX5',
         'alphysX6',
         'alphysX7',
         'alphysX8',
         ...(world.genocide
            ? [
                 'alphysZ1',
                 'alphysZ2',
                 'alphysZ3',
                 'alphysZ4',
                 'alphysZ5',
                 'alphysZ6',
                 'alphysZ7',
                 'alphysZ8',
                 'alphysZ9',
                 'alphysZ10',
                 'alphysZ11',
                 'alphysZ12',
                 'alphysZ13',
                 'alphysZ14',
                 'alphysZ15',
                 'alphysZ16',
                 'alphysZ17',
                 'alphysZ18'
              ]
            : [
                 'alphysX9',
                 'alphysY1',
                 'alphysY2',
                 'alphysY3',
                 'alphysY4',
                 'alphysY5',
                 'alphysY6',
                 'alphysY7',
                 ...(doggoKill
                    ? [
                         'alphysYdoggo1',
                         'alphysYdoggo2',
                         'alphysYdoggo3',
                         'alphysYdoggo4',
                         'alphysYdoggo5',
                         'alphysYdoggo6'
                      ]
                    : []),
                 ...(startonKill || sentryKill
                    ? [
                         'alphysY8A1',
                         [ 'alphysY8A1a', 'alphysY8A1b', 'alphysY8A1c', 'alphysY8A1d' ][
                            doggoKill ? 3 : (startonKill ? 1 : 0) + (sentryKill ? 2 : 0) - 1
                         ],
                         'alphysY8A2',
                         'alphysY8A3'
                      ]
                    : []),
                 ...(SAVE.data.b.s_state_chilldrake
                    ? [
                         'alphysYdrake1',
                         'alphysYdrake2',
                         'alphysYdrake3',
                         'alphysYdrake4',
                         'alphysYdrake5',
                         'alphysYdrake6'
                      ]
                    : []),
                 ...((startonKill || sentryKill) && !papyrusKill
                    ? [
                         'alphysY8A4',
                         'alphysY8A5',
                         'alphysY8A6',
                         ...(SAVE.data.n.kills_foundry > 0 ||
                         SAVE.data.b.killed_shyren ||
                         SAVE.data.n.state_foundry_maddummy === 1 ||
                         eliteKill
                            ? [ 'alphysY8A7', 'alphysY8A8' ]
                            : [])
                      ]
                    : []),
                 ...(papyrusKill
                    ? [
                         'alphysY8B1',
                         'alphysY8B2',
                         'alphysY8B3',
                         world.edgy || (world.population_area('s') < 6 && !world.bullied_area('s'))
                            ? 'alphysY8B4a'
                            : 'alphysY8B4b',
                         'alphysY8B5',
                         'alphysY8B6',
                         'alphysY8B7',
                         'alphysY8B8',
                         'alphysY8B9',
                         'alphysY8B10',
                         'alphysY8B11',
                         'alphysY8B12',
                         'alphysY8B13',
                         'alphysY8B14',
                         'alphysY8B15'
                      ]
                    : []),
                 ...(!startonKill && !sentryKill && !papyrusKill
                    ? [ 'alphysY7A1', 'alphysY7A2', 'alphysY7A3', 'alphysY7A4', 'alphysY7A5', 'alphysY7A6', 'alphysY7A7' ]
                    : []),
                 ...(foundryKill || eliteKill
                    ? startonKill || sentryKill || papyrusKill
                       ? [ 'alphysY8B16', 'alphysY8B17', foundryKill ? 'alphysY8B18' : 'alphysY8B18x', 'alphysY8B19', 'alphysY8B20' ]
                       : [
                            'alphysY8C1',
                            [ 'alphysY8C2a', 'alphysY8C2b', 'alphysY8C2c' ][
                               (foundryKill ? 1 : 0) + (eliteKill ? 2 : 0) - 1
                            ],
                            !startonKill && !sentryKill && !papyrusKill ? 'alphysY8C3a' : 'alphysY8C3b',
                            'alphysY8C4',
                            'alphysY8C5',
                            'alphysY8C6',
                            'alphysY8C7'
                         ]
                    : []),
                 'alphysY8C8',
                 'alphysY8C9',
                 ...(startonKill || sentryKill || papyrusKill || eliteKill || foundryKill
                    ? [ 'alphysY8C10a', 'alphysY8C11a', 'alphysY8C12a', 'alphysY8C13a' ]
                    : [ 'alphysY8C10b', 'alphysY8C11b', 'alphysY8C12b', 'alphysY8C13b' ]),
                 'alphysY8C14',
                 ...(undyneKill
                    ? [
                         'alphysY8D1',
                         ...(SAVE.data.n.state_foundry_undyne === 1
                            ? [
                                 'alphysY8D1c1',
                                 'alphysY8D1c2',
                                 'alphysY8D1c3',
                                 'alphysY8D1c4',
                                 'alphysY8D2b',
                                 'alphysY8D3b1',
                                 'alphysY8D3b2'
                              ]
                            : [
                                 papyrusKill
                                    ? 'alphysY8D1a1'
                                    : eliteKill
                                    ? 'alphysY8D1a2'
                                    : sentryKill
                                    ? 'alphysY8D1a3'
                                    : foundryKill
                                    ? 'alphysY8D1a4'
                                    : startonKill
                                    ? 'alphysY8D1a5'
                                    : 'alphysY8D1b',
                                 'alphysY8D2a',
                                 'alphysY8D3a'
                              ]),
                         'alphysY8D4'
                      ]
                    : [ 'alphysY8D1x', 'alphysY8D2x', 'alphysY8D3x', 'alphysY8D4x' ]),
                 'alphysY8D5',
                 'alphysY8D6',
                 'alphysY8D7',
                 'alphysY8D8',
                 'alphysY8D9'
              ])
      ];
   }
}

export function helmetdyneAttack () {
   return !world.genocide && (SAVE.data.n.plot < 49 ? world.trueKills > 29 : SAVE.data.n.state_aerialis_basekill > 29);
}

export function helmetdyne () {
   return !helmetoverride.state && helmetdyneAttack();
}

export async function quickCall (end: boolean, ...lines: string[]) {
   atlas.switch('dialoguerBottom');
   await dialogue_primitive(text.c_call_common.start, ...lines);
   if (end) {
      await dialogue_primitive(text.c_call_common.end);
   }
   atlas.switch(null);
   atlas.detach(renderer, 'menu', 'sidebar');
   game.movement = true;
}
