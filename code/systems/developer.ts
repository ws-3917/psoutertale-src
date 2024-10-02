import objectInspect from 'object-inspect';
import { Graphics, isMobile } from 'pixi.js';
import text from '../../languages/default/text/systems';
import { aerialisRooms } from '../aerialis/bootstrap';
import aerialisGroups from '../aerialis/groups';
import { aerialisStates } from '../aerialis/index';
import { citadelRooms } from '../citadel/bootstrap';
import citadelGroups from '../citadel/groups';
import { citadelStates } from '../citadel/index';
import { oversaver } from '../common';
import { commonRooms } from '../common/bootstrap';
import commonGroups from '../common/groups';
import { foundryRooms } from '../foundry/bootstrap';
import foundryGroups from '../foundry/groups';
import { foundryStates } from '../foundry/index';
import { outlandsRooms } from '../outlands/bootstrap';
import outlandsGroups from '../outlands/groups';
import { outlandsStates } from '../outlands/index';
import { startonRooms } from '../starton/bootstrap';
import startonGroups from '../starton/groups';
import { startonStates } from '../starton/index';
import { content, filters, musicRegistry } from './assets';
import { atlas, backend, events, game, items, keys, param, params, renderer, rng, speech, typer } from './core';
import {
   battler,
   calcHP,
   frontEnder,
   heal,
   mobile,
   player,
   portraits,
   quickresume,
   saver,
   shopper,
   teleport,
   ultraPosition,
   updateArmor
} from './framework';
import { OutertaleGroup, OutertaleLayerKey } from './outertale';
import { SAVE } from './save';
import {
   CosmosAnchoredObject,
   CosmosAnimation,
   CosmosAsset,
   CosmosBase,
   CosmosBaseEvents,
   CosmosCharacter,
   CosmosEntity,
   CosmosHitbox,
   CosmosImageUtils,
   CosmosInventory,
   CosmosKeyboardInput,
   CosmosKeyed,
   CosmosMath,
   CosmosObject,
   CosmosPlayer,
   CosmosPoint,
   CosmosPointSimple,
   CosmosRectangle,
   CosmosRenderer,
   CosmosRendererLayer,
   CosmosSizedObject,
   CosmosSprite,
   CosmosText,
   CosmosTransform,
   CosmosUtils
} from './storyteller';

export class OutertaleDeveloperHitbox extends CosmosHitbox<CosmosBaseEvents & { click: []; wheel: [1 | -1] }> {}

export const extraKeys = {
   debugKey: CosmosKeyboardInput.create('Tab'),
   shiftKey: CosmosKeyboardInput.create('ShiftLeft', 'ShiftRight'),
   freecamKey: CosmosKeyboardInput.create('k:e'),
   noclipKey: CosmosKeyboardInput.create('k:q')
};

export const zoomFactor = 2 ** (1 / 4);

export const speedValues = [
   0,
   1 / 150,
   1 / 120,
   1 / 90,
   1 / 60,
   1 / 30,
   0.1,
   0.2,
   0.3,
   0.4,
   0.5,
   0.6,
   0.7,
   0.8,
   0.9,
   1,
   1.1,
   1.2,
   1.3,
   1.4,
   1.5,
   1.6,
   1.7,
   1.8,
   1.9,
   2,
   3,
   4,
   5,
   6,
   7,
   8,
   9,
   10,
   25
];

export const pallete = {
   c0: 0x131020,
   c1: 0x232030,
   c2: 0x333040,
   c3: 0x434050,
   c4: 0x535060,
   c5: 0x838090,
   c6: 0xa3a0b0,
   c7: 0xe3e0f0
};

export function objectInspectCompat (...args: Parameters<typeof objectInspect>) {
   const hasGlobal = typeof global === 'object';
   if (!hasGlobal) {
      //@ts-ignore
      globalThis.global = globalThis;
   }
   const result = objectInspect(...args);
   if (!hasGlobal) {
      //@ts-ignore
      delete globalThis.global;
   }
   return result;
}

export function historianInfo<A extends string, B extends CosmosKeyed> (domain: A, store: B) {
   return Object.keys(store)
      .sort((info1, info2) => (info1 < info2 ? -1 : info1 > info2 ? 1 : 0))
      .map(key => ({ key, domain })) as { domain: A; key: keyof B & string }[];
}

export function decreaseSpeed () {
   const index = speedValues.indexOf(renderer.speed.value);
   if (index > 0) {
      renderer.speed.value = speedValues[index - 1];
   }
}

export function increaseSpeed () {
   const index = speedValues.indexOf(renderer.speed.value);
   if (index < speedValues.length - 1) {
      renderer.speed.value = speedValues[index + 1];
   }
}

export function prevRoom () {
   let rev = keys.altKey.active() ? 5 : 1;
   while (rev-- > 0) {
      const i = godhome.rooms.indexOf(godhome.room);
      if (i === -1) {
         godhome.room = game.room;
      } else if (i === 0) {
         godhome.room = godhome.rooms[godhome.rooms.length - 1];
      } else {
         godhome.room = godhome.rooms[i - 1];
      }
   }
}

export function nextRoom () {
   let rev = keys.altKey.active() ? 5 : 1;
   while (rev-- > 0) {
      godhome.room = godhome.rooms[(godhome.rooms.indexOf(godhome.room) + 1) % godhome.rooms.length];
   }
}

export function prevGroup () {
   let rev = keys.altKey.active() ? 5 : 1;
   while (rev-- > 0) {
      const i = godhome.groups.indexOf(godhome.group);
      if (i === -1) {
         godhome.group = godhome.groups[0];
      } else if (i === 0) {
         godhome.group = godhome.groups[godhome.groups.length - 1];
      } else {
         godhome.group = godhome.groups[i - 1];
      }
   }
}

export function nextGroup () {
   let rev = keys.altKey.active() ? 5 : 1;
   while (rev-- > 0) {
      godhome.group = godhome.groups[(godhome.groups.indexOf(godhome.group) + 1) % godhome.groups.length];
   }
}

export const itemEntries = () => [
   null,
   ...[ ...items.entries() ].map(e => e[0]).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
];

export function prevItem (index: number) {
   const entries = itemEntries();
   const cont = SAVE.storage[storage.container];
   const prev = cont.of(index);
   const next = entries[(entries.indexOf(prev) + entries.length - (keys.altKey.active() ? 10 : 1)) % entries.length];
   if (next === null) {
      cont.remove(index);
   } else {
      cont.set(index, next);
   }
}

export function nextItem (index: number) {
   const entries = itemEntries();
   const cont = SAVE.storage[storage.container];
   const prev = cont.of(index);
   const next = entries[(entries.indexOf(prev) + (keys.altKey.active() ? 10 : 1)) % entries.length];
   if (next === null) {
      cont.remove(index);
   } else {
      cont.set(index, next);
   }
}

export function prevContainer () {
   storage.container =
      storage.container === 'inventory' ? 'dimboxB' : storage.container === 'dimboxB' ? 'dimboxA' : 'inventory';
}

export function nextContainer () {
   storage.container =
      storage.container === 'inventory' ? 'dimboxA' : storage.container === 'dimboxA' ? 'dimboxB' : 'inventory';
}

export const armorEntries = () => [
   'spacesuit',
   ...[ ...items.entries() ]
      .filter(e => e[1].type === 'armor')
      .map(e => e[0])
      .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
];

export function prevArmor () {
   const entries = armorEntries();
   updateArmor(entries[(entries.indexOf(SAVE.data.s.armor) + entries.length - 1) % entries.length]);
}

export function nextArmor () {
   const entries = armorEntries();
   updateArmor(entries[(entries.indexOf(SAVE.data.s.armor) + 1) % entries.length]);
}

export const weaponEntries = () => [
   'spanner',
   ...[ ...items.entries() ]
      .filter(e => e[1].type === 'weapon')
      .map(e => e[0])
      .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
];

export function prevWeapon () {
   const entries = weaponEntries();
   SAVE.data.s.weapon = entries[(entries.indexOf(SAVE.data.s.weapon) + entries.length - 1) % entries.length];
}

export function nextWeapon () {
   const entries = weaponEntries();
   SAVE.data.s.weapon = entries[(entries.indexOf(SAVE.data.s.weapon) + 1) % entries.length];
}

export const godhome = {
   room: '',
   rooms: [ commonRooms, outlandsRooms, startonRooms, foundryRooms, aerialisRooms, citadelRooms ]
      .flatMap(sources => Object.keys(sources))
      .filter(key => key !== '_'),
   group: [ 'nobody', commonGroups.nobody ] as [string, OutertaleGroup],
   groups: [ commonGroups, outlandsGroups, startonGroups, foundryGroups, aerialisGroups, citadelGroups ]
      .flatMap(groups => Object.entries(groups))
      .sort((group1, group2) => (group1[0] < group2[0] ? -1 : group1[0] > group2[0] ? 1 : 0)),
   menu: null as string | null,
   menus: [ null, ...atlas.navigators.keys() ]
};

export const historian = {
   page: 0,
   input: false,
   domain: null as string | null,
   index: null as number | null,
   numericValue: null as string | null,
   restoreInput: false,
   info: {
      dataBoolean: historianInfo('dataBoolean', SAVE.data.b),
      dataNumber: historianInfo('dataNumber', SAVE.data.n),
      dataString: historianInfo('dataString', SAVE.data.s),
      flagBoolean: historianInfo('flagBoolean', SAVE.flag.b),
      flagNumber: historianInfo('flagNumber', SAVE.flag.n),
      flagString: historianInfo('flagString', SAVE.flag.s)
   },
   get entries () {
      return historian.domain ? historian.info[historian.domain as keyof typeof historian.info] : [];
   },
   get pages () {
      return Math.max(Math.ceil(historian.entries.length / 8), 1);
   },
   clearIndex () {
      if (historian.index !== null) {
         historian.index = null;
         historian.clearInput();
      }
   },
   clearInput () {
      if (historian.input) {
         historian.input = false;
         historian.numericValue = null;
         game.input = historian.restoreInput;
         historian.restoreInput = false;
      }
   },
   getEntry (index: number) {
      const infoEntry = historian.entries[index];
      switch (infoEntry.domain) {
         case 'dataNumber':
            return {
               value: SAVE.ready ? `${historian.numericValue ?? SAVE.data.n[infoEntry.key]}` : '0',
               numeric: true
            };
         case 'dataString':
            return { value: SAVE.ready ? SAVE.data.s[infoEntry.key] : '', numeric: false };
         case 'flagNumber':
            return {
               value: SAVE.ready ? `${historian.numericValue ?? SAVE.flag.n[infoEntry.key]}` : '0',
               numeric: true
            };
         case 'flagString':
            return { value: SAVE.ready ? SAVE.flag.s[infoEntry.key] : '', numeric: false };
      }
      return { value: '', numeric: false };
   },
   setEntry (index: number, info: { value: string; numeric: boolean }) {
      info.numeric && !isMobile.any && (historian.numericValue = info.value);
      if (SAVE.ready) {
         const infoEntry = historian.entries[index];
         switch (infoEntry.domain) {
            case 'dataNumber':
               (SAVE.data.n as any)[infoEntry.key] = +info.value;
               switch (infoEntry.key) {
                  case 'base_attack':
                     rng.attack.value = +info.value;
                     break;
                  case 'base_battle':
                     rng.battle.value = +info.value;
                     break;
                  case 'base_dialogue':
                     rng.dialogue.value = +info.value;
                     break;
                  case 'base_overworld':
                     rng.overworld.value = +info.value;
                     break;
                  case 'base_pattern':
                     rng.pattern.value = +info.value;
                     break;
               }
               break;
            case 'flagNumber':
               (SAVE.flag.n as any)[infoEntry.key] = +info.value;
               SAVE.flag.s.$gamepad_input_f === '' || frontEnder.updateDeadzone();
               frontEnder.updateEpilepsy();
               frontEnder.updateFancy();
               frontEnder.updateMusic();
               isMobile.any && frontEnder.updateTouch();
               frontEnder.updateSFX();
               break;
            case 'dataString':
               (SAVE.data.s as any)[infoEntry.key] = info.value;
               break;
            case 'flagString':
               (SAVE.flag.s as any)[infoEntry.key] = info.value;
               break;
         }
      }
   }
};

export const inspector = {
   index: null as number | null,
   switches: {
      base: false,
      below: false,
      main: false,
      above: false,
      menu: false,
      hitbox: false,
      sprite: false,
      text: false
   },
   hitboxGraphics: new Graphics(),
   hitboxTint: 0,
   target: null as { objects: CosmosObject[] } | null,
   rootNode: [
      renderer.layers.base,
      renderer.layers.below,
      renderer.layers.main,
      renderer.layers.above,
      renderer.layers.menu
   ] as { objects: CosmosObject[] }[],
   path: [] as number[],
   resolvePath () {
      let step = 0;
      let node = inspector.rootNode;
      while (step < inspector.path.length) {
         const pos = inspector.path[step];
         if (node.length > pos) {
            node = node[pos].objects;
            step++;
         } else {
            inspector.path.splice(step, inspector.path.length - step);
            break;
         }
      }
      return node;
   },
   reportText: new CosmosText({
      fill: pallete.c7,
      position: { x: 5, y: 5 },
      fontFamily: content.fDeterminationMono,
      fontSize: 8,
      priority: Infinity,
      scale: 2,
      filters: [ filters.outline ]
   }).on('pre-render', function () {
      this.plain = true;
      this.alpha.value = 0.62;
      if (panel.tab.value !== 3) {
         this.content = `${text.developer.inspect.debug_instructions} [${panel.debug}]`;
         switch (panel.debug) {
            case -1: {
               this.alpha.value = 0.22;
               break;
            }
            case 0: {
               this.plain = false;
               const sub = (battler.active ? battler.SOUL : player).position;
               const pro = renderer.projection(sub);
               let mus = '';
               musicRegistry.forEach((daemon, entry) => {
                  if (daemon.instances.length > 0) {
                     mus += `\n ${entry}:`;
                     daemon.instances.forEach(inst => {
                        mus += `\n  ${inst.daemon.audio.name} -> ${inst.position.toFixed(3)}s, ${(
                           (inst.instance?.rate ?? 1) * 100
                        ).toFixed(0)}%p, ${(((inst.instance?.gain.gain.value ?? 1) / inst.daemon.gain) * 100).toFixed(
                           0
                        )}%v`;
                     });
                  }
               }, null);
               if (mus.length == 0) {
                  mus ||= text.developer.inspect.debug.none1;
               }
               this.content += `\n${text.developer.inspect.debug.position}: ${sub.x}x ${sub.y}y §fill=#ff0000§(${
                  pro.x
               }x ${pro.y}y)§fill=#ffffff§\n${
                  battler.active
                     ? `\n${text.developer.inspect.debug.group}: ${
                          battler.groups.length === 0
                             ? text.developer.inspect.debug.none1
                             : godhome.groups.find(entry => entry[1] === battler.groups[0])?.[0] ??
                               text.developer.inspect.debug.unknown
                       }\n${text.developer.inspect.debug.music}: ${mus}\n${text.developer.inspect.debug.exp}: ${
                          battler.exp
                       }\nG: ${battler.g}\n${text.developer.inspect.debug.target}: ${atlas.navigators
                          .of('battlerAdvancedTarget')
                          .selection()}${battler.volatile
                          .map((v, i) => {
                             const color = v.alive ? '§fill=#ffffff§' : v.hp <= 0 ? '§fill=ff0000§' : '§fill=00ff00§';
                             return `\n\n${color}< ${text.developer.inspect.debug.volatile} ${i} - ${v.opponent
                                .name()
                                .replace('* ', '')}§reset§${color} - ${text.developer.inspect.debug.hp} ${v.hp} / ${
                                v.opponent.hp
                             } > [${[
                                ...(v.alive ? text.developer.inspect.debug.a : []),
                                ...(battler.bullied.includes(v) ? [ text.developer.inspect.debug.b ] : []),
                                ...(v.flirted ? [ text.developer.inspect.debug.f ] : []),
                                ...(v.sparable ? [ text.developer.inspect.debug.s ] : [])
                             ].join(', ')}]\n${text.developer.inspect.debug.vars}: ${objectInspectCompat(v.vars, {
                                depth: 1,
                                quoteStyle: 'single',
                                indent: 3
                             })}`;
                          })
                          .join('')}`
                     : `${text.developer.inspect.debug.room}: ${game.room}\n${
                          text.developer.inspect.debug.music
                       }: ${mus}\n${text.developer.inspect.debug.shopSelection}: [${shopper.index}, ${
                          shopper.listIndex
                       }]\n${text.developer.inspect.debug.roomState}: ${objectInspectCompat(
                          (game.room[0] === 'w'
                             ? outlandsStates.rooms
                             : game.room[0] === 's'
                             ? startonStates.rooms
                             : game.room[0] === 'f'
                             ? foundryStates.rooms
                             : game.room[0] === 'a'
                             ? aerialisStates.rooms
                             : game.room[0] === 'c'
                             ? citadelStates.rooms
                             : {})[game.room],
                          { depth: 1, quoteStyle: 'single', indent: 3 }
                       )}`
               }\n\n< ${text.developer.inspect.debug.text} - p/${
                  [ ...speech.presets.entries() ].find(entry => entry[1] === speech.state.preset)?.[0] ??
                  text.developer.inspect.debug.unknown
               } - f/${speech.state.preset.faces.indexOf(speech.state.face)} (g/${
                  [ ...portraits.entries() ].find(entry => entry[1] === speech.state.face)?.[0] ??
                  text.developer.inspect.debug.unknown
               }) - i/${typer.interval} - v/${speech.state.preset.voices.indexOf(typer.sounds)} > [${typer.mode}]\n${
                  game.text
               }`;
               break;
            }
            case 1: {
               this.plain = false;
               this.content += `\n${text.developer.inspect.debug.trackedAssets}:\n${CosmosAsset.collect()
                  .map(value => {
                     let constr = `${value._value?.constructor.name ?? 'null'} -> `;
                     if (value._value instanceof Array) {
                        let modified = false;
                        for (const entry of value._value) {
                           if (constr.length + value.name.length + 4 > 60) {
                              constr += modified ? ', ...' : '...';
                              break;
                           }
                           constr += (!modified ? '' : ', ') + (entry?.constructor.name ?? 'null');
                           modified = true;
                        }
                     } else {
                        constr = value._value?.constructor.name ?? 'null';
                     }
                     return `§fill=${value.loaded ? '#00ff00' : '#ffffff'}§> ${value.name} -> ${constr}`;
                  })
                  .join('\n')}`;
               break;
            }
            case 2: {
               this.plain = false;
               this.content += `\n${text.developer.inspect.debug.oversaver}: ${
                  oversaver.primed ? text.developer.inspect.debug.primed : text.developer.inspect.debug.inert
               }\n${text.developer.inspect.debug.lastSavedTime}: ${saver.time_saved}`;
               for (const e of [
                  [ 'data:b', Object.entries(SAVE.state.b ?? {}).filter(e => e[1] !== null) ],
                  [ 'data:n', Object.entries(SAVE.state.n ?? {}).filter(e => e[1] !== null) ],
                  [ 'data:s', Object.entries(SAVE.state.s ?? {}).filter(e => e[1] !== null) ]
               ] as [string, [string, any][]][]) {
                  this.content += `\n\n< ${text.developer.inspect.debug.registry} - ${e[0]} >\n`;
                  let line = 0;
                  for (const char of e[1].map(([ key, value ]) => `\x00${key}\x01: \x02${value}\x01`).join(', ')) {
                     if (char === '\x00') {
                        this.content += '§fill=#ff0000§';
                     } else if (char === '\x01') {
                        this.content += '§fill=#ffffff§';
                     } else if (char === '\x02') {
                        this.content += '§fill=#00ff00§';
                     } else {
                        this.content += char;
                        if (++line === 78) {
                           line = 0;
                           this.content += '\n';
                        }
                     }
                  }
               }
               break;
            }
            case 3: {
               this.plain = false;
               this.content += `\n${text.developer.inspect.debug.namespace}: ${SAVE.namespace}`;
               const keys = SAVE.keys();
               for (const e of [
                  [
                     'flag:b',
                     keys
                        .filter(key => key.startsWith(`${SAVE.namespace}:b`))
                        .map(key => [ key.slice(SAVE.namespace.length + 3), SAVE.manager.getItem(key) ])
                        .filter(e => e[1] !== null)
                  ],
                  [
                     'flag:n',
                     keys
                        .filter(key => key.startsWith(`${SAVE.namespace}:n`))
                        .map(key => [ key.slice(SAVE.namespace.length + 3), SAVE.manager.getItem(key) ])
                        .filter(e => e[1] !== null)
                  ],
                  [
                     'flag:s',
                     keys
                        .filter(key => key.startsWith(`${SAVE.namespace}:s`))
                        .map(key => [ key.slice(SAVE.namespace.length + 3), SAVE.manager.getItem(key) ])
                        .filter(e => e[1] !== null)
                  ]
               ] as [string, [string, any][]][]) {
                  this.content += `\n\n< ${text.developer.inspect.debug.registry} - ${e[0]} >\n`;
                  let line = 0;
                  for (const char of e[1].map(([ key, value ]) => `\x00${key}\x01: \x02${value}\x01`).join(', ')) {
                     if (char === '\x00') {
                        this.content += '§fill=#ff0000§';
                     } else if (char === '\x01') {
                        this.content += '§fill=#ffffff§';
                     } else if (char === '\x02') {
                        this.content += '§fill=#00ff00§';
                     } else {
                        this.content += char;
                        if (++line === 78) {
                           line = 0;
                           this.content += '\n';
                        }
                     }
                  }
               }
               break;
            }
            case 4: {
               const frames = saver.time_but_real.value;
               this.content += `\n${text.developer.inspect.debug.time}: ${Math.floor(
                  frames / 60 / 60 / 60 / 24
               ).toString()}:${(Math.floor(frames / 60 / 60 / 60) % 24).toString().padStart(2, '0')}:${(
                  Math.floor(frames / 60 / 60) % 60
               )
                  .toString()
                  .padStart(2, '0')}:${Math.floor((frames / 60) % 60)
                  .toString()
                  .padStart(2, '0')}.${((frames / 60) % 1).toFixed(3).toString().replace('0.', '').padStart(2, '0')}`;
               break;
            }
         }
         return;
      }
      const base = inspector.resolvePath();
      if (inspector.index === null && inspector.path.length === 0) {
         this.content = inspector.generateReport(renderer, null);
      } else if (inspector.index !== null) {
         if (inspector.index < base.length) {
            inspector.target = base[inspector.index];
            this.content = inspector.generateReport(
               inspector.target as CosmosRendererLayer | CosmosObject,
               inspector.index!
            );
         } else {
            inspector.index = null;
            this.content = '';
         }
      }
      panel.tab.objects[3].objects[2].objects[0].objects = [
         ...(inspector.path.length !== 0 ? [ null ] : []),
         ...base
      ].map((target, index) =>
         new OutertaleDeveloperHitbox({
            anchor: { x: 0 },
            position: {
               x: inspector.path.length !== 0 ? -101.5 + (index % 8) * 29 : 0,
               y: 32 + (inspector.path.length !== 0 ? Math.floor(index / 8) : index) * 29
            },
            size: { x: inspector.path.length !== 0 ? 25 : 232, y: 25 },
            objects: [
               new CosmosRectangle({
                  fill: pallete.c2,
                  fontFamily: content.fDeterminationMono,
                  fontSize: 16,
                  stroke: -1,
                  anchor: { x: 0 },
                  size: { x: inspector.path.length !== 0 ? 25 : 232, y: 25 },
                  objects: [
                     new CosmosText({
                        spacing: {},
                        offsets: [],
                        fill: pallete.c7,
                        anchor: 0,
                        position: { y: 12.5 }
                     }).on('tick', function () {
                        this.content = target
                           ? 'modifiers' in target
                              ? text.developer.inspect.p_explorer.layers[index]
                              : target instanceof CosmosAnimation
                              ? text.developer.inspect.p_explorer.letters.animation
                              : target instanceof CosmosCharacter
                              ? text.developer.inspect.p_explorer.letters.character
                              : target instanceof CosmosPlayer
                              ? text.developer.inspect.p_explorer.letters.player
                              : target instanceof CosmosEntity
                              ? text.developer.inspect.p_explorer.letters.entity
                              : target instanceof CosmosHitbox
                              ? text.developer.inspect.p_explorer.letters.hitbox
                              : target instanceof CosmosRectangle
                              ? text.developer.inspect.p_explorer.letters.rectangle
                              : target instanceof CosmosSprite
                              ? text.developer.inspect.p_explorer.letters.sprite
                              : target instanceof CosmosText
                              ? text.developer.inspect.p_explorer.letters.text
                              : text.developer.inspect.p_explorer.letters.object
                           : '^';
                     })
                  ]
               })
            ]
         })
            .on('tick', function () {
               const active = inspector.index === index - (inspector.path.length !== 0 ? 1 : 0);
               this.objects[0].fill = active ? pallete.c4 : pallete.c2;
               this.objects[0].objects[0].fill = active ? pallete.c7 : pallete.c5;
            })
            .on('click', function () {
               const alterIndex = index - (inspector.path.length !== 0 ? 1 : 0);
               if (alterIndex === -1) {
                  void inspector.path.pop();
                  inspector.index = null;
               } else {
                  if (inspector.index === alterIndex) {
                     inspector.path.push(alterIndex);
                     inspector.index = null;
                  } else {
                     inspector.index = alterIndex;
                  }
               }
            })
      );
   }),
   generateReport (target: CosmosRendererLayer | CosmosObject | CosmosRenderer, index: number | null) {
      const lines = [
         `${
            inspector.path.length === 0
               ? inspector.index === null
                  ? text.developer.inspect.debug.renderer
                  : text.developer.inspect.debug.layer
               : target.constructor.name
         } (${[ ...inspector.path, ...(index === null ? [] : [ index ]) ].join('.')})`
      ];
      if ('objects' in target) {
         target.objects.length > 0 && lines.push(`${text.developer.inspect.debug.objects}: [${target.objects.length}]`);
      } else {
         const k = Object.keys(target.layers);
         k.length > 0 && lines.push(`${text.developer.inspect.debug.layers}: [${k.length}]`);
      }
      if (target instanceof CosmosObject || target instanceof CosmosRenderer) {
         const metadata =
            target instanceof CosmosObject
               ? objectInspectCompat(target.metadata, { quoteStyle: 'double', indent: 3, depth: 1 })
               : '{}';
         if (target instanceof CosmosObject) {
            target.acceleration.value !== 0 &&
               lines.push(`${text.developer.inspect.debug.acceleration}: ${target.acceleration.value}`);
         }
         target instanceof CosmosObject ||
            target.application.ticker.started ||
            lines.push(`${text.developer.inspect.debug.active}: ${text.developer.inspect.debug.false}`);
         if (target instanceof CosmosSprite) {
            lines.push(
               `${text.developer.inspect.debug.active}: ${
                  target.active ? text.developer.inspect.debug.true : text.developer.inspect.debug.false
               }`
            );
         }
         target.alpha.value !== 1 && lines.push(`${text.developer.inspect.debug.alpha}: ${target.alpha.value}`);
         if (target instanceof CosmosAnchoredObject) {
            if (target.anchor.x !== -1 || target.anchor.y !== -1) {
               lines.push(`${text.developer.inspect.debug.anchor}: {${target.anchor.x}, ${target.anchor.y}}`);
            }
         }
         target.blend !== void 0 && lines.push(`${text.developer.inspect.debug.blend}: "${target.blend}"`);
         target.border !== void 0 && lines.push(`${text.developer.inspect.debug.border}: ${target.border}`);
         if (target instanceof CosmosSizedObject) {
            const size = target.compute();
            if (size.x !== 0 || size.y !== 0) {
               lines.push(`${text.developer.inspect.debug.compute}: {${size.x}, ${size.y}}`);
            }
         }
         if (target instanceof CosmosText) {
            if (target !== inspector.reportText && target.content !== '') {
               const sublines = target.content.split('\n').map(line => `| ${line.slice(0, 128)}`);
               if (sublines.length > 4) {
                  lines.push(`${text.developer.inspect.debug.content}:\n${sublines.slice(0, 3).join('\n')}\n...`);
               } else {
                  lines.push(`${text.developer.inspect.debug.content}:\n${sublines.join('\n')}`);
               }
            }
         }
         if (target instanceof CosmosSprite) {
            if (
               target.crop.bottom !== 0 ||
               target.crop.left !== 0 ||
               target.crop.right !== 0 ||
               target.crop.top !== 0
            ) {
               lines.push(
                  `${text.developer.inspect.debug.crop}: /${target.crop.top}, ${target.crop.right}, ${target.crop.bottom}, ${target.crop.left}/`
               );
            }
            lines.push(`${text.developer.inspect.debug.duration}: ${target.duration}`);
         }
         if (target instanceof CosmosPlayer) {
            if (target.extent.x !== 0 || target.extent.y !== 0) {
               lines.push(`${text.developer.inspect.debug.extent}: {${target.extent.x}, ${target.extent.y}}`);
            }
         }
         if (target instanceof CosmosEntity) {
            lines.push(
               `${text.developer.inspect.debug.face}: ${
                  {
                     down: text.developer.inspect.debug.down,
                     left: text.developer.inspect.debug.left,
                     right: text.developer.inspect.debug.right,
                     up: text.developer.inspect.debug.up
                  }[target.face]
               }`
            );
         }
         target.fill !== void 0 && lines.push(`${text.developer.inspect.debug.fill}: ${target.fill}`);
         target.fontFamily !== void 0 &&
            lines.push(
               `${text.developer.inspect.debug.fontFamily}: "${
                  target.fontFamily?.name ?? text.developer.inspect.debug.none1
               }"`
            );
         target.fontSize !== void 0 && lines.push(`${text.developer.inspect.debug.fontSize}: "${target.fontSize}"`);
         if (target instanceof CosmosSprite && !(target instanceof CosmosAnimation)) {
            if (target.frames.length > 0) {
               const sublines = target.frames.map(frame =>
                  frame ? `  @${frame.source.slice(0, 128)}` : `  (${text.developer.inspect.debug.none2})`
               );
               if (sublines.length > 4) {
                  lines.push(`${text.developer.inspect.debug.frames}: [\n${sublines.slice(0, 3).join('\n')}\n  ...\n]`);
               } else {
                  lines.push(`${text.developer.inspect.debug.frames}: [\n${sublines.join('\n')}\n]`);
               }
            }
         }
         if (target instanceof CosmosObject) {
            if (target.gravity.x !== 0 || target.gravity.y !== 0) {
               lines.push(`${text.developer.inspect.debug.gravity}: {${target.gravity.x}, ${target.gravity.y}}`);
            }
         }
         if (target instanceof CosmosSprite) {
            target.reverse &&
               lines.push(`${text.developer.inspect.debug.reverse}: ${text.developer.inspect.debug.true}`);
            lines.push(`${text.developer.inspect.debug.index}: ${target.index}`);
         }
         if (target instanceof CosmosCharacter) {
            lines.push(`${text.developer.inspect.debug.key}: ${target.key}`);
         }
         metadata === '{}' || lines.push(`${text.developer.inspect.debug.metadata}: ${metadata}`);
         if (target instanceof CosmosObject) {
            if (target.parallax.x !== 0 || target.parallax.y !== 0) {
               lines.push(`${text.developer.inspect.debug.parallax}: {${target.parallax.x}, ${target.parallax.y}}`);
            }
         }
         lines.push(`${text.developer.inspect.debug.position}: {${target.position.x}, ${target.position.y}}`);
         if (target instanceof CosmosObject) {
            target.priority.value !== 0 &&
               lines.push(`${text.developer.inspect.debug.priority}: ${target.priority.value}`);
         }
         if (target instanceof CosmosAnimation) {
            if (target.resources !== null) {
               lines.push(`${text.developer.inspect.debug.resources}: ${target.resources.name}`);
            }
         }
         target.rotation.value !== 0 &&
            lines.push(`${text.developer.inspect.debug.rotation}: ${target.rotation.value}`);
         if (target.scale.x !== 1 || target.scale.y !== 1) {
            lines.push(`${text.developer.inspect.debug.scale}: {${target.scale.x}, ${target.scale.y}}`);
         }
         if (target instanceof CosmosHitbox || target instanceof CosmosRectangle) {
            if (target.size.x !== 0 || target.size.y !== 0) {
               lines.push(`${text.developer.inspect.debug.size}: {${target.size.x}, ${target.size.y}}`);
            }
         }
         if (target instanceof CosmosText) {
            if (target.spacing.x !== 0 || target.spacing.y !== 0) {
               lines.push(`${text.developer.inspect.debug.spacing}: {${target.spacing.x}, ${target.spacing.y}}`);
            }
         }
         if (target instanceof CosmosObject) {
            target.spin.value !== 0 && lines.push(`${text.developer.inspect.debug.spin}: ${target.spin.value}`);
         }
         if (target instanceof CosmosEntity) {
            lines.push(
               `${text.developer.inspect.debug.sprites}: /${target.sprites.up.constructor.name}, ${target.sprites.right.constructor.name}, ${target.sprites.down.constructor.name}, ${target.sprites.left.constructor.name}/`
            );
            target.step !== 1 && lines.push(`${text.developer.inspect.debug.step}: ${target.step}`);
         }
         if (target instanceof CosmosSprite) {
            lines.push(`${text.developer.inspect.debug.step}: ${target.step}`);
         }
         target.stroke !== void 0 && lines.push(`${text.developer.inspect.debug.stroke}: ${target.stroke}`);
         if (target instanceof CosmosAnimation) {
            if (
               target.subcrop.bottom !== 0 ||
               target.subcrop.left !== 0 ||
               target.subcrop.right !== 0 ||
               target.subcrop.top !== 0
            ) {
               lines.push(
                  `${text.developer.inspect.debug.subcrop}: /${target.subcrop.top}, ${target.subcrop.right}, ${target.subcrop.bottom}, ${target.subcrop.left}/`
               );
            }
         }
         if (target instanceof CosmosCharacter) {
            lines.push(
               `${text.developer.inspect.debug.talk}: ${
                  target.talk ? text.developer.inspect.debug.true : text.developer.inspect.debug.false
               }`
            );
         }
         target.tint !== void 0 && lines.push(`${text.developer.inspect.debug.tint}: ${target.tint}`);
         if (target instanceof CosmosObject) {
            if (target.velocity.x !== 0 || target.velocity.y !== 0) {
               lines.push(`${text.developer.inspect.debug.velocity}: {${target.velocity.x}, ${target.velocity.y}}`);
            }
         }
      } else {
         target.active || lines.push(`${text.developer.inspect.debug.active}: ${text.developer.inspect.debug.false}`);
      }
      return lines.join('\n');
   }
};

export const logician = {
   error: [] as any[],
   errored: false,
   tab: 0,
   inspect (error: any[]) {
      return error
         .map(value =>
            typeof value === 'string'
               ? value
               : objectInspectCompat(value, {
                    depth: value instanceof CosmosBase ? 1 : 4,
                    quoteStyle: 'single',
                    indent: 3
                 })
         )
         .join('\n')
         .replace(/[A-Za-z]*:.*\/app.asar/g, ':');
   },
   suspend (error: any) {
      console.trace(error);
      if (!logician.errored) {
         logician.errored = true;
         if (!panel.active && panel.ready) {
            panel.userError = true;
            panel.start();
         }
         logician.tab = panel.tab.value;
         panel.tab.switch(panel.tab.objects.length - 1);
      }
      logician.error.unshift(error?.stack ?? error);
      logician.error.length > 100 && logician.error.pop();
      const errors = CosmosUtils.parse<any[][]>(SAVE.manager.getItem('ERRORCODE'), []);
      errors.unshift([
         ...logician.inspect([ logician.error[0] ]).split('\n'),
         game.room,
         player.position.x,
         player.position.y,
         ...CosmosAsset.collect().map(asset => asset.name),
         rng.attack.value,
         rng.battle.value,
         rng.dialogue.value,
         rng.overworld.value,
         rng.pattern.value,
         SAVE.namespace,
         SAVE.manager.getItem(SAVE.namespace)
      ]);
      errors.length > 10 && void errors.pop();
      SAVE.manager.setItem('ERRORCODE', CosmosUtils.serialize(errors));
   },
   resume () {
      if (logician.errored) {
         logician.errored = false;
         if (panel.userError) {
            panel.stop();
            panel.userError = false;
         }
         panel.tab.switch(logician.tab);
      }
   }
};

export const storage = {
   container: Object.keys(SAVE.storage)[0] as keyof typeof SAVE.storage
};

export const panel = {
   activate () {
      panel.userError || (panel.active ? panel.stop() : panel.start());
      if (isMobile.any) {
         for (const touch in mobile.state.touches) {
            mobile.clear(+touch);
         }
      }
   },
   active: false,
   debug: -1,
   dragger: { state: false, origin: { x: 0, y: 0 }, offset: { x: 0, y: 0 } },
   interaction (position: CosmosPointSimple, type: 'click' | 'wheel' = 'click', direction: 1 | -1 = 1) {
      const target = panel.object.objects[0];
      target.position.set(position.x - 640, position.y);
      for (const hitbox of panel.renderer.detect(
         target as CosmosHitbox,
         ...panel.renderer.calculate('main', hbox => hbox instanceof OutertaleDeveloperHitbox)
      )) {
         (hitbox as OutertaleDeveloperHitbox).fire(type, ...(type === 'click' ? [] : [ direction ]));
      }
   },
   object: new CosmosRectangle({
      size: { x: 320, y: 480 },
      fill: -1,
      offsets: [ { x: 640 } ],
      objects: [
         new CosmosHitbox(),
         new CosmosObject({ position: { y: 40 } }),
         new CosmosObject({
            objects: CosmosUtils.populate(5, index =>
               new OutertaleDeveloperHitbox({
                  size: { x: 80, y: 20 },
                  position: { x: (index % 4) * 80, y: Math.floor(index / 4) * 20 },
                  objects: [
                     new CosmosRectangle({
                        size: { x: 80, y: 20 },
                        position: { x: 1 },
                        objects: [
                           new CosmosText({
                              anchor: 0,
                              position: { x: 40, y: 10 + 0.5 },
                              fontFamily: content.fDeterminationMono,
                              spacing: {},
                              offsets: [],
                              fontSize: 16
                           }).on('tick', function () {
                              this.content = [
                                 text.developer.control.tab,
                                 text.developer.godhome.tab,
                                 text.developer.savemod.tab,
                                 text.developer.inspect.tab,
                                 text.developer.storage.tab
                              ][index];
                           })
                        ]
                     })
                  ]
               })
                  .on('tick', function () {
                     this.alpha.value = logician.errored ? 0 : 1;
                     this.objects[0].fill = this.metadata.active ? pallete.c3 : -1;
                     this.objects[0].objects[0].fill = this.metadata.active ? pallete.c7 : pallete.c5;
                  })
                  .on('click', function () {
                     logician.errored || panel.tab.switch(index);
                  })
            )
         }),
         new CosmosRectangle({
            anchor: { x: 0 },
            fill: pallete.c1,
            position: { x: 160 },
            size: { x: 320, y: 40 },
            objects: [
               new CosmosText({
                  anchor: 0,
                  fill: pallete.c7,
                  fontFamily: content.fDeterminationMono,
                  spacing: {},
                  offsets: [],
                  fontSize: 16,
                  position: { y: 20 }
               }).on('tick', function () {
                  this.content = text.developer.console.blurb;
               })
            ]
         }).on('tick', function () {
            this.alpha.value = logician.errored ? 1 : 0;
         })
      ]
   }),
   ready: false,
   renderer: new CosmosRenderer({
      auto: false,
      wrapper: '#wrapper',
      layers: { main: [ 'fixed' ] },
      width: 960,
      height: 480
   }),
   setup: false,
   start () {
      if (!panel.ready) {
         return;
      }
      panel.setup || panelSetup();
      params.has('developer') || param('developer', '');
      panel.active = true;
      game.sprint = true;
      game.width = 960;
      SAVE.saveswap = true;
      backend?.exec('pad', 320);
      panel.renderer.start();
      game.resize();
   },
   stop () {
      param('developer');
      historian.clearIndex();
      historian.clearInput();
      backend?.exec('pad', 0);
      panel.renderer.stop();
      panel.active = false;
      panel.dragger.state = false;
      game.sprint = false;
      game.width = 640;
      SAVE.saveswap = false;
      game.resize();
   },
   tab: {
      objects: [
         new CosmosObject({
            objects: [
               ...CosmosUtils.populate(
                  2,
                  index1 =>
                     new CosmosRectangle({
                        fill: -1,
                        stroke: pallete.c7,
                        anchor: { x: 0 },
                        size: { x: 130, y: 46 + 10 * 29 },
                        position: { x: 85 + index1 * 150, y: 7 },
                        objects: [
                           new CosmosText({
                              fill: pallete.c7,
                              fontFamily: content.fMarsNeedsCunnilingus,
                              fontSize: 24,
                              anchor: { x: 0 },
                              position: { y: 9 },
                              objects: CosmosUtils.populate([ 10, 10 ][index1], index2 =>
                                 new OutertaleDeveloperHitbox({
                                    anchor: { x: 0 },
                                    position: { y: 27 + index2 * 29 },
                                    size: { x: 105, y: 25 },
                                    metadata: { lastClick: -Infinity },
                                    objects: [
                                       new CosmosRectangle({
                                          fill: pallete.c2,
                                          fontFamily: content.fDeterminationMono,
                                          fontSize: 16,
                                          stroke: -1,
                                          anchor: { x: 0 },
                                          size: { x: 105, y: 25 },
                                          objects: [
                                             new CosmosText({
                                                spacing: {},
                                                offsets: [],
                                                fill: pallete.c7,
                                                anchor: 0,
                                                position: { y: 12.5 }
                                             }).on('tick', function () {
                                                this.content = text.developer.control.items[index1][index2];
                                             })
                                          ]
                                       })
                                    ]
                                 })
                                    .on('tick', function () {
                                       let active = false;
                                       const recentlyClicked = panel.renderer.time - this.metadata.lastClick < 80;
                                       if (index1 === 0) {
                                          switch (index2) {
                                             case 0:
                                             case 1:
                                             case 7:
                                             case 8:
                                                active = recentlyClicked;
                                                break;
                                             case 2:
                                                active = SAVE.ready && saver.gold === Infinity;
                                                break;
                                             case 3:
                                                active = game.interact;
                                                break;
                                             case 4:
                                                active = game.input;
                                                break;
                                             case 5:
                                                active = game.movement;
                                                break;
                                             case 6:
                                                active = game.noclip;
                                                break;
                                             case 9:
                                                active = renderer.freecam;
                                                break;
                                          }
                                       } else {
                                          switch (index2) {
                                             case 0:
                                                active = battler.assist;
                                                break;
                                             case 1:
                                             case 2:
                                             case 3:
                                             case 4:
                                             case 7:
                                             case 8:
                                             case 9:
                                                active = recentlyClicked;
                                                break;
                                             case 5:
                                                active = battler.flee;
                                                break;
                                             case 6:
                                                active = SAVE.ready && SAVE.data.n.hp === Infinity;
                                                break;
                                          }
                                       }
                                       this.objects[0].fill = active ? pallete.c4 : pallete.c2;
                                       this.objects[0].objects[0].fill = active ? pallete.c7 : pallete.c5;
                                    })
                                    .on('click', function () {
                                       this.metadata.lastClick = panel.renderer.time;
                                       if (index1 === 0) {
                                          switch (index2) {
                                             case 0:
                                                if (SAVE.ready) {
                                                   battler.music?.stop();
                                                   quickresume(true);
                                                }
                                                break;
                                             case 1: {
                                                if (SAVE.ready) {
                                                   const { face, position } = ultraPosition(game.room);
                                                   player.face = face;
                                                   player.position.set(position);
                                                   game.camera = player;
                                                }
                                                break;
                                             }
                                             case 2:
                                                if (SAVE.ready) {
                                                   if (saver.gold === Infinity) {
                                                      saver.gold = this.metadata.g ?? 432;
                                                   } else {
                                                      this.metadata.g = saver.gold;
                                                      saver.gold = Infinity;
                                                   }
                                                }
                                                break;
                                             case 3:
                                                game.interact = !game.interact;
                                                break;
                                             case 4:
                                                game.input = !game.input;
                                                break;
                                             case 5:
                                                game.movement = !game.movement;
                                                break;
                                             case 6:
                                                game.noclip = !game.noclip;
                                                break;
                                             case 7:
                                                if (SAVE.ready) {
                                                   game.movement = false;
                                                   heal();
                                                   atlas.switch('save');
                                                }
                                                break;
                                             case 8:
                                                typer.reset(true);
                                                break;
                                             case 9:
                                                (renderer.freecam = !renderer.freecam) || (renderer.zoom.value = 1);
                                                break;
                                          }
                                       } else {
                                          switch (index2) {
                                             case 0:
                                                battler.assist = !battler.assist;
                                                break;
                                             case 1:
                                                battler.bullets.objects = [];
                                                break;
                                             case 2:
                                                battler.music?.stop();
                                                events.fire('exit');
                                                break;
                                             case 3:
                                                battler.reposition();
                                                break;
                                             case 4:
                                                game.movement = false;
                                                battler.resume();
                                                break;
                                             case 5:
                                                battler.flee = !battler.flee;
                                                break;
                                             case 6:
                                                if (SAVE.ready) {
                                                   if (SAVE.data.n.hp === Infinity) {
                                                      SAVE.data.n.hp = this.metadata.hp ?? calcHP();
                                                   } else {
                                                      this.metadata.hp = SAVE.data.n.hp;
                                                      SAVE.data.n.hp = Infinity;
                                                   }
                                                }
                                                break;
                                             case 7:
                                                for (const volatile of battler.volatile) {
                                                   volatile.sparable = true;
                                                }
                                                break;
                                             case 8:
                                                SAVE.ready && (SAVE.data.n.hp = 0);
                                                if (!battler.active) {
                                                   battler.SOUL.position.set(
                                                      renderer.projection(
                                                         player.position.subtract(0, 15),
                                                         game.camera.position
                                                      )
                                                   );
                                                }
                                                battler.defeat();
                                                break;
                                             case 9:
                                                for (const volatile of battler.volatile) {
                                                   volatile.hp = 0;
                                                }
                                                break;
                                          }
                                       }
                                    })
                              )
                           }).on('tick', function () {
                              this.content = text.developer.control.headers[index1];
                           })
                        ]
                     })
               ),
               new CosmosRectangle({
                  fill: -1,
                  stroke: pallete.c7,
                  anchor: { x: 0 },
                  size: { x: 280, y: 80 },
                  position: { x: 160, y: 350 },
                  objects: [
                     new CosmosText({
                        fill: pallete.c7,
                        fontFamily: content.fMarsNeedsCunnilingus,
                        fontSize: 24,
                        anchor: { x: 0 },
                        position: { y: 9 },
                        objects: CosmosUtils.populate(3, index =>
                           new OutertaleDeveloperHitbox({
                              anchor: { x: 0 },
                              position: { x: -97.5 + index * 97.5, y: 30 },
                              size: { x: index === 1 ? 120 : 60, y: 25 },
                              objects: [
                                 new CosmosRectangle({
                                    fill: pallete.c1,
                                    fontFamily: content.fDeterminationMono,
                                    fontSize: 16,
                                    stroke: -1,
                                    anchor: { x: 0 },
                                    size: { x: index === 1 ? 120 : 60, y: 25 },
                                    objects: [
                                       new CosmosText({
                                          spacing: {},
                                          offsets: [],
                                          fill: pallete.c6,
                                          anchor: 0,
                                          position: { y: 12.5 }
                                       }).on('tick', function () {
                                          this.content = [
                                             text.developer.control.p_speed.prev,
                                             '',
                                             text.developer.control.p_speed.next
                                          ][index];
                                       })
                                    ]
                                 })
                              ]
                           })
                              .on('tick', function () {
                                 if (index === 1) {
                                    const obj = this.objects[0].objects[0] as CosmosText;
                                    const value = renderer.speed.value;
                                    switch (value) {
                                       case 0:
                                          obj.content = text.developer.control.p_speed.halt;
                                          break;
                                       case Math.floor(value):
                                          obj.content = text.developer.control.p_speed.fps.replace(
                                             '$(x)',
                                             (value * 30).toString()
                                          );
                                          break;
                                       default: {
                                          const spf = 1 / value;
                                          if (spf % 30 === 0) {
                                             obj.content = text.developer.control.p_speed.sec.replace(
                                                '$(x)',
                                                (spf / 30).toString()
                                             );
                                          } else {
                                             obj.content = text.developer.control.p_speed.multiplier.replace(
                                                '$(x)',
                                                value.toString().slice(0, 13).toString()
                                             );
                                          }
                                          break;
                                       }
                                    }
                                 } else {
                                    const active = panel.renderer.time - this.metadata.lastClick < 80;
                                    this.objects[0].fill = active ? pallete.c4 : pallete.c2;
                                    this.objects[0].objects[0].fill = active ? pallete.c7 : pallete.c5;
                                 }
                              })
                              .on('click', function () {
                                 this.metadata.lastClick = panel.renderer.time;
                                 switch (index) {
                                    case 0:
                                       decreaseSpeed();
                                       break;
                                    case 1:
                                       renderer.speed.value = 1;
                                       break;
                                    case 2:
                                       increaseSpeed();
                                       break;
                                 }
                              })
                              .on('wheel', function (dir) {
                                 if (dir === 1) {
                                    decreaseSpeed();
                                 } else {
                                    increaseSpeed();
                                 }
                              })
                        )
                     }).on('tick', function () {
                        this.content = text.developer.control.p_speed.header;
                     })
                  ]
               })
            ]
         }),
         new CosmosObject({
            objects: [
               new CosmosRectangle({
                  fill: -1,
                  stroke: pallete.c7,
                  anchor: { x: 0 },
                  size: { x: 280, y: 109 },
                  position: { x: 160, y: 7 },
                  objects: [
                     new CosmosText({
                        fill: pallete.c7,
                        fontFamily: content.fMarsNeedsCunnilingus,
                        fontSize: 24,
                        anchor: { x: 0 },
                        position: { y: 9 },
                        objects: [
                           ...CosmosUtils.populate(3, index =>
                              new OutertaleDeveloperHitbox({
                                 anchor: { x: 0 },
                                 position: { x: -112.5 + index * 112.5, y: 27 },
                                 size: { x: 120, y: 25 },
                                 metadata: { lastClick: -Infinity },
                                 objects: [
                                    new CosmosRectangle({
                                       fill: -1,
                                       fontFamily: content.fDeterminationMono,
                                       fontSize: 16,
                                       stroke: -1,
                                       anchor: { x: 0 },
                                       size: { x: 30, y: 25 },
                                       objects: [
                                          new CosmosText({
                                             spacing: {},
                                             offsets: [],
                                             fill: pallete.c6,
                                             anchor: 0,
                                             position: { y: 12.5 },
                                             content: [ '<', '', '>' ][index]
                                          })
                                       ]
                                    })
                                 ]
                              })
                                 .on('tick', function () {
                                    if (index === 1) {
                                       (this.objects[0].objects[0] as CosmosText).content = godhome.room;
                                    } else {
                                       const active = panel.renderer.time - this.metadata.lastClick < 80;
                                       this.objects[0].fill = active ? pallete.c4 : pallete.c2;
                                       this.objects[0].objects[0].fill = active ? pallete.c7 : pallete.c5;
                                    }
                                 })
                                 .on('click', function () {
                                    this.metadata.lastClick = panel.renderer.time;
                                    switch (index) {
                                       case 0:
                                          prevRoom();
                                          break;
                                       case 1:
                                          godhome.room = game.active ? game.room : SAVE.ready ? SAVE.data.s.room : '';
                                          break;
                                       case 2:
                                          nextRoom();
                                          break;
                                    }
                                    game.active || (SAVE.ready && (SAVE.data.s.room = godhome.room));
                                 })
                                 .on('wheel', function (dir) {
                                    if (dir === 1) {
                                       nextRoom();
                                    } else {
                                       prevRoom();
                                    }
                                    game.active || (SAVE.ready && (SAVE.data.s.room = godhome.room));
                                 })
                           ),
                           new OutertaleDeveloperHitbox({
                              anchor: { x: 0 },
                              position: { y: 56 },
                              size: { x: 255, y: 25 },
                              metadata: { lastClick: -Infinity },
                              objects: [
                                 new CosmosRectangle({
                                    fill: pallete.c2,
                                    fontFamily: content.fDeterminationMono,
                                    fontSize: 16,
                                    stroke: -1,
                                    anchor: { x: 0 },
                                    size: { x: 255, y: 25 },
                                    objects: [
                                       new CosmosText({
                                          spacing: {},
                                          offsets: [],
                                          fill: pallete.c7,
                                          anchor: 0,
                                          position: { y: 12.5 }
                                       }).on('tick', function () {
                                          this.content = text.developer.godhome.p_teleport.action;
                                       })
                                    ]
                                 })
                              ]
                           })
                              .on('tick', function () {
                                 const active = panel.renderer.time - this.metadata.lastClick < 80;
                                 this.objects[0].fill = active ? pallete.c4 : pallete.c2;
                                 this.objects[0].objects[0].fill = active ? pallete.c7 : pallete.c5;
                              })
                              .on('click', function () {
                                 this.metadata.lastClick = panel.renderer.time;
                                 if (game.active) {
                                    const { face, position } = ultraPosition(godhome.room);
                                    renderer.alpha.value = 0;
                                    teleport(godhome.room, face, position.x, position.y, { fast: true }).then(() => {
                                       renderer.alpha.value = 1;
                                       quickresume(true);
                                    });
                                 }
                              })
                        ]
                     }).on('tick', function () {
                        this.content = text.developer.godhome.p_teleport.header;
                     })
                  ]
               }),
               new CosmosRectangle({
                  fill: -1,
                  stroke: pallete.c7,
                  anchor: { x: 0 },
                  size: { x: 280, y: 109 },
                  position: { x: 160, y: 123 },
                  objects: [
                     new CosmosText({
                        fill: pallete.c7,
                        fontFamily: content.fMarsNeedsCunnilingus,
                        fontSize: 24,
                        anchor: { x: 0 },
                        position: { y: 9 },
                        objects: [
                           ...CosmosUtils.populate(3, index =>
                              new OutertaleDeveloperHitbox({
                                 anchor: { x: 0 },
                                 position: { x: -112.5 + index * 112.5, y: 27 },
                                 size: { x: 120, y: 25 },
                                 metadata: { lastClick: -Infinity },
                                 objects: [
                                    new CosmosRectangle({
                                       fill: -1,
                                       fontFamily: content.fDeterminationMono,
                                       fontSize: 16,
                                       stroke: -1,
                                       anchor: { x: 0 },
                                       size: { x: 30, y: 25 },
                                       objects: [
                                          new CosmosText({
                                             spacing: {},
                                             offsets: [],
                                             fill: pallete.c6,
                                             anchor: 0,
                                             position: { y: 12.5 },
                                             content: [ '<', '', '>' ][index]
                                          })
                                       ]
                                    })
                                 ]
                              })
                                 .on('tick', function () {
                                    if (index === 1) {
                                       (this.objects[0].objects[0] as CosmosText).content = godhome.group[0];
                                    } else {
                                       const active = panel.renderer.time - this.metadata.lastClick < 80;
                                       this.objects[0].fill = active ? pallete.c4 : pallete.c2;
                                       this.objects[0].objects[0].fill = active ? pallete.c7 : pallete.c5;
                                    }
                                 })
                                 .on('click', function () {
                                    this.metadata.lastClick = panel.renderer.time;
                                    switch (index) {
                                       case 0:
                                          prevGroup();
                                          break;
                                       case 2:
                                          nextGroup();
                                          break;
                                    }
                                 })
                                 .on('wheel', function (dir) {
                                    if (dir === 1) {
                                       nextGroup();
                                    } else {
                                       prevGroup();
                                    }
                                 })
                           ),
                           new OutertaleDeveloperHitbox({
                              anchor: { x: 0 },
                              position: { y: 56 },
                              size: { x: 255, y: 25 },
                              metadata: { lastClick: -Infinity },
                              objects: [
                                 new CosmosRectangle({
                                    fill: pallete.c2,
                                    fontFamily: content.fDeterminationMono,
                                    fontSize: 16,
                                    stroke: -1,
                                    anchor: { x: 0 },
                                    size: { x: 255, y: 25 },
                                    objects: [
                                       new CosmosText({
                                          spacing: {},
                                          offsets: [],
                                          fill: pallete.c7,
                                          anchor: 0,
                                          position: { y: 12.5 }
                                       }).on('tick', function () {
                                          this.content = text.developer.godhome.p_encounter.action;
                                       })
                                    ]
                                 })
                              ]
                           })
                              .on('tick', function () {
                                 const active = panel.renderer.time - this.metadata.lastClick < 80;
                                 this.objects[0].fill = active ? pallete.c4 : pallete.c2;
                                 this.objects[0].objects[0].fill = active ? pallete.c7 : pallete.c5;
                              })
                              .on('click', function () {
                                 this.metadata.lastClick = panel.renderer.time;
                                 game.active && battler.encounter(player, godhome.group[1], false);
                              })
                        ]
                     }).on('tick', function () {
                        this.content = text.developer.godhome.p_encounter.header;
                     })
                  ]
               }),
               new CosmosRectangle({
                  fill: -1,
                  stroke: pallete.c7,
                  anchor: { x: 0 },
                  size: { x: 280, y: 80 },
                  position: { x: 160, y: 239 },
                  objects: [
                     new CosmosText({
                        fill: pallete.c7,
                        fontFamily: content.fMarsNeedsCunnilingus,
                        fontSize: 24,
                        anchor: { x: 0 },
                        position: { y: 9 },
                        objects: CosmosUtils.populate(3, index =>
                           new OutertaleDeveloperHitbox({
                              anchor: { x: 0 },
                              position: { x: -112.5 + index * 112.5, y: 27 },
                              size: { x: 120, y: 25 },
                              metadata: { lastClick: -Infinity },
                              objects: [
                                 new CosmosRectangle({
                                    fill: -1,
                                    fontFamily: content.fDeterminationMono,
                                    fontSize: 16,
                                    stroke: -1,
                                    anchor: { x: 0 },
                                    size: { x: 30, y: 25 },
                                    objects: [
                                       new CosmosText({
                                          spacing: {},
                                          offsets: [],
                                          fill: pallete.c6,
                                          anchor: 0,
                                          position: { y: 12.5 },
                                          content: [ '<', '', '>' ][index]
                                       })
                                    ]
                                 })
                              ]
                           })
                              .on('tick', function () {
                                 if (index === 1) {
                                    (this.objects[0].objects[0] as CosmosText).content = SAVE.ready
                                       ? SAVE.data.s.armor
                                       : '';
                                 } else {
                                    const active = panel.renderer.time - this.metadata.lastClick < 80;
                                    this.objects[0].fill = active ? pallete.c4 : pallete.c2;
                                    this.objects[0].objects[0].fill = active ? pallete.c7 : pallete.c5;
                                 }
                              })
                              .on('click', function () {
                                 this.metadata.lastClick = panel.renderer.time;
                                 switch (index) {
                                    case 0:
                                       SAVE.ready && prevArmor();
                                       break;
                                    case 2:
                                       SAVE.ready && nextArmor();
                                       break;
                                 }
                              })
                              .on('wheel', function (dir) {
                                 if (dir === 1) {
                                    SAVE.ready && nextArmor();
                                 } else {
                                    SAVE.ready && prevArmor();
                                 }
                              })
                        )
                     }).on('tick', function () {
                        this.content = text.developer.godhome.p_armor.header;
                     })
                  ]
               }),
               new CosmosRectangle({
                  fill: -1,
                  stroke: pallete.c7,
                  anchor: { x: 0 },
                  size: { x: 280, y: 80 },
                  position: { x: 160, y: 326 },
                  objects: [
                     new CosmosText({
                        fill: pallete.c7,
                        fontFamily: content.fMarsNeedsCunnilingus,
                        fontSize: 24,
                        anchor: { x: 0 },
                        position: { y: 9 },
                        objects: CosmosUtils.populate(3, index =>
                           new OutertaleDeveloperHitbox({
                              anchor: { x: 0 },
                              position: { x: -112.5 + index * 112.5, y: 27 },
                              size: { x: 120, y: 25 },
                              metadata: { lastClick: -Infinity },
                              objects: [
                                 new CosmosRectangle({
                                    fill: -1,
                                    fontFamily: content.fDeterminationMono,
                                    fontSize: 16,
                                    stroke: -1,
                                    anchor: { x: 0 },
                                    size: { x: 30, y: 25 },
                                    objects: [
                                       new CosmosText({
                                          spacing: {},
                                          offsets: [],
                                          fill: pallete.c6,
                                          anchor: 0,
                                          position: { y: 12.5 },
                                          content: [ '<', '', '>' ][index]
                                       })
                                    ]
                                 })
                              ]
                           })
                              .on('tick', function () {
                                 if (index === 1) {
                                    (this.objects[0].objects[0] as CosmosText).content = SAVE.ready
                                       ? SAVE.data.s.weapon
                                       : '';
                                 } else {
                                    const active = panel.renderer.time - this.metadata.lastClick < 80;
                                    this.objects[0].fill = active ? pallete.c4 : pallete.c2;
                                    this.objects[0].objects[0].fill = active ? pallete.c7 : pallete.c5;
                                 }
                              })
                              .on('click', function () {
                                 this.metadata.lastClick = panel.renderer.time;
                                 switch (index) {
                                    case 0:
                                       SAVE.ready && prevWeapon();
                                       break;
                                    case 2:
                                       SAVE.ready && nextWeapon();
                                       break;
                                 }
                              })
                              .on('wheel', function (dir) {
                                 if (dir === 1) {
                                    SAVE.ready && nextWeapon();
                                 } else {
                                    SAVE.ready && prevWeapon();
                                 }
                              })
                        )
                     }).on('tick', function () {
                        this.content = text.developer.godhome.p_weapon.header;
                     })
                  ]
               })
            ]
         }),
         new CosmosObject({
            objects: [
               new CosmosRectangle({
                  fill: -1,
                  stroke: pallete.c7,
                  anchor: { x: 0 },
                  size: { x: 280, y: 46 + 10 * 29 },
                  position: { x: 160, y: 7 },
                  objects: [
                     new CosmosText({
                        fill: pallete.c7,
                        fontFamily: content.fMarsNeedsCunnilingus,
                        fontSize: 24,
                        anchor: { x: 0 },
                        position: { y: 9 },
                        objects: [
                           ...CosmosUtils.populate(10, index =>
                              new OutertaleDeveloperHitbox({
                                 anchor: { x: 0 },
                                 position: { y: 27 + index * 29 },
                                 size: { x: 255, y: 25 },
                                 metadata: {
                                    saveEntry: true,
                                    index,
                                    lastClick: -Infinity,
                                    focus: false,
                                    title: '',
                                    edituh: false
                                 },
                                 objects: [
                                    new CosmosRectangle({
                                       fill: index < 9 ? pallete.c2 : pallete.c0,
                                       fontFamily: content.fDeterminationMono,
                                       fontSize: 16,
                                       stroke: index < 9 ? -1 : pallete.c7,
                                       anchor: { x: 0 },
                                       size: { x: 255, y: 25 },
                                       objects: [
                                          new CosmosText({
                                             spacing: {},
                                             offsets: [],
                                             fill: pallete.c7,
                                             stroke: -1,
                                             anchor: 0,
                                             position: { y: 12.5 }
                                          })
                                       ]
                                    })
                                 ]
                              })
                                 .on('tick', function () {
                                    let contents = '';
                                    let active = panel.renderer.time - this.metadata.lastClick < 80;
                                    if (index < 9) {
                                       if (historian.domain !== null) {
                                          if (index === 0) {
                                             contents = text.developer.savemod.back;
                                          } else {
                                             const infoIndex = historian.page * 8 + (index - 1);
                                             if (infoIndex < historian.entries.length) {
                                                contents = historian.entries[infoIndex].key;
                                                if (infoIndex === historian.index) {
                                                   active = true;
                                                }
                                             }
                                          }
                                       } else if (index < 6) {
                                          contents = text.developer.savemod.domains[index];
                                       }
                                       this.objects[0].fill = active ? pallete.c4 : pallete.c2;
                                       this.objects[0].objects[0].fill = active ? pallete.c7 : pallete.c5;
                                    } else {
                                       if (historian.index !== null) {
                                          const entry = historian.entries[historian.index];
                                          switch (entry.domain) {
                                             case 'dataBoolean':
                                                contents = SAVE.ready ? `${SAVE.data.b[entry.key]}` : 'false';
                                                break;
                                             case 'dataNumber':
                                                contents = SAVE.ready
                                                   ? `${historian.numericValue ?? SAVE.data.n[entry.key]}`
                                                   : '0';
                                                break;
                                             case 'dataString':
                                                contents = SAVE.ready ? `"${SAVE.data.s[entry.key]}"` : '""';
                                                break;
                                             case 'flagBoolean':
                                                contents = SAVE.ready ? `${SAVE.flag.b[entry.key]}` : 'false';
                                                break;
                                             case 'flagNumber':
                                                contents = SAVE.ready
                                                   ? `${historian.numericValue ?? SAVE.flag.n[entry.key]}`
                                                   : '0';
                                                break;
                                             case 'flagString':
                                                contents = SAVE.ready ? `"${SAVE.flag.s[entry.key]}"` : '""';
                                                break;
                                          }
                                       }
                                       index === 9 && historian.input && (active = true);
                                       this.objects[0].fill = active ? pallete.c2 : pallete.c0;
                                       this.objects[0].objects[0].fill = active ? pallete.c7 : pallete.c5;
                                    }
                                    (this.objects[0].objects[0] as CosmosText).content = contents;
                                    if (contents.length > 0) {
                                       this.alpha.value = 1;
                                    } else {
                                       this.alpha.value = 0;
                                    }
                                 })
                                 .on('click', function () {
                                    this.metadata.lastClick = panel.renderer.time;
                                    if (index < 9) {
                                       if (historian.domain !== null) {
                                          if (index === 0) {
                                             historian.clearIndex();
                                             historian.page = 0;
                                             historian.domain = null;
                                          } else {
                                             const infoIndex = historian.page * 8 + (index - 1);
                                             if (infoIndex < historian.entries.length) {
                                                if (historian.index === infoIndex) {
                                                   historian.clearIndex();
                                                } else {
                                                   historian.index = infoIndex;
                                                   historian.clearInput();
                                                }
                                             }
                                          }
                                       } else if (index < 6) {
                                          historian.domain = [
                                             'dataBoolean',
                                             'dataNumber',
                                             'dataString',
                                             'flagBoolean',
                                             'flagNumber',
                                             'flagString'
                                          ][index];
                                       }
                                    } else if (historian.index !== null) {
                                       const infoEntry = historian.entries[historian.index];
                                       if (infoEntry.domain === 'dataBoolean') {
                                          SAVE.ready && (SAVE.data.b[infoEntry.key] = !SAVE.data.b[infoEntry.key]);
                                       } else if (infoEntry.domain === 'flagBoolean') {
                                          SAVE.ready && (SAVE.flag.b[infoEntry.key] = !SAVE.flag.b[infoEntry.key]);
                                          SAVE.flag.s.$gamepad_input_f === '' || frontEnder.updateDeadzone();
                                          frontEnder.updateEpilepsy();
                                          frontEnder.updateFancy();
                                          frontEnder.updateMusic();
                                          isMobile.any && frontEnder.updateTouch();
                                          frontEnder.updateSFX();
                                       } else if (historian.input) {
                                          historian.clearInput();
                                       } else if (isMobile.any) {
                                          const info = historian.getEntry(historian.index);
                                          info.value = prompt(text.developer.savemod.prompt, info.value) ?? info.value;
                                          if (info.numeric && Number.isNaN(+info.value)) {
                                             return;
                                          }
                                          historian.setEntry(historian.index, info);
                                       } else {
                                          historian.input = true;
                                          historian.restoreInput = game.input;
                                          game.input = false;
                                       }
                                    }
                                 })
                           )
                        ]
                     }).on('tick', function () {
                        this.content = text.developer.savemod.header1;
                     })
                  ]
               }),
               new CosmosRectangle({
                  fill: -1,
                  stroke: pallete.c7,
                  anchor: { x: 0 },
                  size: { x: 280, y: 80 },
                  position: { x: 160, y: 350 },
                  objects: [
                     new CosmosText({
                        fill: pallete.c7,
                        fontFamily: content.fMarsNeedsCunnilingus,
                        fontSize: 24,
                        anchor: { x: 0 },
                        position: { y: 9 },
                        objects: CosmosUtils.populate(3, index =>
                           new OutertaleDeveloperHitbox({
                              anchor: { x: 0 },
                              position: { x: -97.5 + index * 97.5, y: 30 },
                              size: { x: index === 1 ? 120 : 60, y: 25 },
                              objects: [
                                 new CosmosRectangle({
                                    fill: pallete.c1,
                                    fontFamily: content.fDeterminationMono,
                                    fontSize: 16,
                                    stroke: -1,
                                    anchor: { x: 0 },
                                    size: { x: index === 1 ? 120 : 60, y: 25 },
                                    objects: [
                                       new CosmosText({
                                          spacing: {},
                                          offsets: [],
                                          fill: pallete.c6,
                                          anchor: 0,
                                          position: { y: 12.5 }
                                       }).on('tick', function () {
                                          this.content = [
                                             text.developer.savemod.p_page.prev,
                                             '',
                                             text.developer.savemod.p_page.next
                                          ][index];
                                       })
                                    ]
                                 })
                              ]
                           })
                              .on('tick', function () {
                                 if (index === 1) {
                                    (this.objects[0].objects[0] as CosmosText).content = historian.page.toString();
                                 } else {
                                    const active = panel.renderer.time - this.metadata.lastClick < 80;
                                    this.objects[0].fill = active ? pallete.c4 : pallete.c2;
                                    this.objects[0].objects[0].fill = active ? pallete.c7 : pallete.c5;
                                 }
                              })
                              .on('click', function () {
                                 this.metadata.lastClick = panel.renderer.time;
                                 switch (index) {
                                    case 0:
                                       --historian.page === -1 && (historian.page = historian.pages - 1);
                                       historian.clearIndex();
                                       break;
                                    case 1:
                                       historian.page = 0;
                                       break;
                                    case 2:
                                       ++historian.page === historian.pages && (historian.page = 0);
                                       historian.clearIndex();
                                       break;
                                 }
                              })
                              .on('wheel', function (dir) {
                                 if (dir === 1) {
                                    ++historian.page === historian.pages && (historian.page = 0);
                                    historian.clearIndex();
                                 } else {
                                    --historian.page === -1 && (historian.page = historian.pages - 1);
                                    historian.clearIndex();
                                 }
                              })
                        )
                     }).on('tick', function () {
                        this.content = text.developer.savemod.p_page.header;
                     })
                  ]
               })
            ]
         }),
         new CosmosObject({
            objects: [
               ...CosmosUtils.populate(
                  2,
                  index1 =>
                     new CosmosRectangle({
                        fill: -1,
                        stroke: pallete.c7,
                        anchor: { x: 0 },
                        size: { x: 130, y: 46 + 5 * 29 },
                        position: { x: 85 + index1 * 150, y: 7 },
                        objects: [
                           new CosmosText({
                              fill: pallete.c7,
                              fontFamily: content.fMarsNeedsCunnilingus,
                              fontSize: 24,
                              anchor: { x: 0 },
                              position: { y: 9 },
                              objects: CosmosUtils.populate([ 5, 3 ][index1], index2 => {
                                 const switchKey = [
                                    [ 'base', 'below', 'main', 'above', 'menu' ],
                                    [ 'hitbox', 'sprite', 'text' ]
                                 ][index1][index2] as keyof typeof inspector.switches;
                                 return new OutertaleDeveloperHitbox({
                                    anchor: { x: 0 },
                                    position: { y: 27 + index2 * 29 },
                                    size: { x: 105, y: 25 },
                                    objects: [
                                       new CosmosRectangle({
                                          fill: pallete.c2,
                                          fontFamily: content.fDeterminationMono,
                                          fontSize: 16,
                                          stroke: -1,
                                          anchor: { x: 0 },
                                          size: { x: 105, y: 25 },
                                          objects: [
                                             new CosmosText({
                                                spacing: {},
                                                offsets: [],
                                                fill: pallete.c7,
                                                anchor: 0,
                                                position: { y: 12.5 }
                                             }).on('tick', function () {
                                                this.content = text.developer.inspect.switches[index1][index2];
                                             })
                                          ]
                                       })
                                    ]
                                 })
                                    .on('tick', function () {
                                       const active = inspector.switches[switchKey];
                                       this.objects[0].fill = active ? pallete.c4 : pallete.c2;
                                       this.objects[0].objects[0].fill = active ? pallete.c7 : pallete.c5;
                                    })
                                    .on('click', function () {
                                       inspector.switches[switchKey] = !inspector.switches[switchKey];
                                    });
                              })
                           }).on('tick', function () {
                              this.content = text.developer.inspect.headers[index1];
                           })
                        ]
                     })
               ),
               new CosmosRectangle({
                  fill: -1,
                  stroke: pallete.c7,
                  anchor: { x: 0 },
                  size: { x: 280, y: 225 },
                  position: { x: 160, y: 205 },
                  objects: [
                     new CosmosText({
                        fill: pallete.c7,
                        fontFamily: content.fMarsNeedsCunnilingus,
                        fontSize: 24,
                        anchor: { x: 0 },
                        position: { y: 9 }
                     }).on('tick', function () {
                        this.content = text.developer.inspect.p_explorer.header;
                     })
                  ]
               })
            ]
         }),
         new CosmosObject({
            objects: [
               new CosmosRectangle({
                  fill: -1,
                  stroke: pallete.c7,
                  anchor: { x: 0 },
                  size: { x: 280, y: 46 + 10 * 29 },
                  position: { x: 160, y: 7 },
                  objects: [
                     new CosmosText({
                        fill: pallete.c7,
                        fontFamily: content.fMarsNeedsCunnilingus,
                        fontSize: 24,
                        anchor: { x: 0 },
                        position: { y: 9 },
                        objects: [
                           ...CosmosUtils.populate(10, superindex =>
                              new CosmosObject({
                                 position: { y: 27 + superindex * 29 },
                                 objects: CosmosUtils.populate(3, index =>
                                    new OutertaleDeveloperHitbox({
                                       anchor: { x: 0 },
                                       position: { x: -112.5 + index * 112.5 },
                                       size: { x: 120, y: 25 },
                                       metadata: { lastClick: -Infinity },
                                       objects: [
                                          new CosmosRectangle({
                                             fill: -1,
                                             fontFamily: content.fDeterminationMono,
                                             fontSize: 16,
                                             stroke: -1,
                                             anchor: { x: 0 },
                                             size: { x: 30, y: 25 },
                                             objects: [
                                                new CosmosText({
                                                   spacing: {},
                                                   offsets: [],
                                                   fill: pallete.c6,
                                                   anchor: 0,
                                                   position: { y: 12.5 },
                                                   content: [ '<', '', '>' ][index]
                                                })
                                             ]
                                          })
                                       ]
                                    })
                                       .on('tick', function () {
                                          if (index === 1) {
                                             (this.objects[0].objects[0] as CosmosText).content = SAVE.ready
                                                ? SAVE.storage[storage.container].of(superindex) ?? ''
                                                : '';
                                          } else {
                                             const active = panel.renderer.time - this.metadata.lastClick < 80;
                                             this.objects[0].fill = active ? pallete.c4 : pallete.c2;
                                             this.objects[0].objects[0].fill = active ? pallete.c7 : pallete.c5;
                                          }
                                       })
                                       .on('click', function () {
                                          if (SAVE.ready) {
                                             const container = SAVE.storage[storage.container];
                                             if (superindex <= Math.min(container.size, container.capacity - 1)) {
                                                this.metadata.lastClick = panel.renderer.time;
                                                switch (index) {
                                                   case 0:
                                                      prevItem(superindex);
                                                      break;
                                                   case 2:
                                                      nextItem(superindex);
                                                      break;
                                                }
                                             }
                                          }
                                       })
                                       .on('wheel', function (dir) {
                                          if (SAVE.ready) {
                                             const container = SAVE.storage[storage.container];
                                             if (superindex <= Math.min(container.size, container.capacity - 1)) {
                                                if (dir === 1) {
                                                   nextItem(superindex);
                                                } else {
                                                   prevItem(superindex);
                                                }
                                             }
                                          }
                                       })
                                 )
                              }).on('tick', function () {
                                 if (SAVE.ready) {
                                    const container = SAVE.storage[storage.container];
                                    this.alpha.value =
                                       superindex <= Math.min(container.size, container.capacity - 1) ? 1 : 0;
                                 }
                              })
                           )
                        ]
                     }).on('tick', function () {
                        this.content = text.developer.storage.header;
                     })
                  ]
               }),
               new CosmosRectangle({
                  fill: -1,
                  stroke: pallete.c7,
                  anchor: { x: 0 },
                  size: { x: 280, y: 80 },
                  position: { x: 160, y: 350 },
                  objects: [
                     new CosmosText({
                        fill: pallete.c7,
                        fontFamily: content.fMarsNeedsCunnilingus,
                        fontSize: 24,
                        anchor: { x: 0 },
                        position: { y: 9 },
                        objects: CosmosUtils.populate(3, index =>
                           new OutertaleDeveloperHitbox({
                              anchor: { x: 0 },
                              position: { x: -97.5 + index * 97.5, y: 30 },
                              size: { x: index === 1 ? 120 : 60, y: 25 },
                              objects: [
                                 new CosmosRectangle({
                                    fill: pallete.c1,
                                    fontFamily: content.fDeterminationMono,
                                    fontSize: 16,
                                    stroke: -1,
                                    anchor: { x: 0 },
                                    size: { x: index === 1 ? 120 : 60, y: 25 },
                                    objects: [
                                       new CosmosText({
                                          spacing: {},
                                          offsets: [],
                                          fill: pallete.c6,
                                          anchor: 0,
                                          position: { y: 12.5 }
                                       }).on('tick', function () {
                                          this.content = [
                                             text.developer.storage.p_container.prev,
                                             '',
                                             text.developer.storage.p_container.next
                                          ][index];
                                       })
                                    ]
                                 })
                              ]
                           })
                              .on('tick', function () {
                                 if (index === 1) {
                                    (this.objects[0].objects[0] as CosmosText).content =
                                       text.developer.storage.display[storage.container];
                                 } else {
                                    const active = panel.renderer.time - this.metadata.lastClick < 80;
                                    this.objects[0].fill = active ? pallete.c4 : pallete.c2;
                                    this.objects[0].objects[0].fill = active ? pallete.c7 : pallete.c5;
                                 }
                              })
                              .on('click', function () {
                                 this.metadata.lastClick = panel.renderer.time;
                                 switch (index) {
                                    case 0:
                                       prevContainer();
                                       break;
                                    case 1:
                                       storage.container = 'inventory';
                                       break;
                                    case 2:
                                       nextContainer();
                                       break;
                                 }
                              })
                              .on('wheel', function (dir) {
                                 if (dir === 1) {
                                    nextContainer();
                                 } else {
                                    prevContainer();
                                 }
                              })
                        )
                     }).on('tick', function () {
                        this.content = text.developer.storage.p_container.header;
                     })
                  ]
               })
            ]
         }),
         new CosmosObject({
            objects: [
               new CosmosRectangle({
                  fill: -1,
                  stroke: pallete.c7,
                  anchor: { x: 0 },
                  size: { x: 280, y: 46 + 10 * 29 },
                  position: { x: 160, y: 7 },
                  objects: [
                     new CosmosText({
                        fill: pallete.c7,
                        fontFamily: content.fMarsNeedsCunnilingus,
                        fontSize: 24,
                        anchor: { x: 0 },
                        position: { y: 9 },
                        objects: [
                           new CosmosText({
                              alpha: 0.7,
                              fontFamily: content.fDeterminationMono,
                              spacing: {},
                              offsets: [],
                              fontSize: 16,
                              stroke: -1,
                              plain: true,
                              position: { x: -130, y: 25 }
                           }).on('tick', function () {
                              this.fill = logician.errored ? 0xff7f7f : pallete.c7;
                              const error = logician.inspect(logician.error.slice(0, 21));
                              let line = 2;
                              let content = '> ';
                              for (const char of error) {
                                 if (char === '\n') {
                                    line = 2;
                                    content += '\n> ';
                                 } else if (line++ === 33) {
                                    line = 1;
                                    content += `\n${char}`;
                                 } else {
                                    content += char;
                                 }
                              }
                              this.content = content.split('\n').slice(0, 21).join('\n');
                           })
                        ]
                     }).on('tick', function () {
                        this.content = text.developer.console.header;
                     })
                  ]
               }),
               new CosmosRectangle({
                  fill: -1,
                  stroke: pallete.c7,
                  anchor: { x: 0 },
                  size: { x: 280, y: 80 },
                  position: { x: 160, y: 350 },
                  objects: [
                     new CosmosText({
                        fill: pallete.c7,
                        fontFamily: content.fMarsNeedsCunnilingus,
                        fontSize: 24,
                        anchor: { x: 0 },
                        position: { y: 9 },
                        objects: [
                           new CosmosRectangle({
                              fontFamily: content.fDeterminationMono,
                              fontSize: 16,
                              stroke: -1,
                              anchor: { x: 0 },
                              size: { x: 255, y: 25 },
                              position: { y: 30 },
                              fill: pallete.c2,
                              objects: [
                                 new CosmosText({
                                    spacing: {},
                                    offsets: [],
                                    fill: pallete.c5,
                                    stroke: -1,
                                    anchor: 0,
                                    position: { y: 12.5 }
                                 }).on('tick', function () {
                                    this.content = text.developer.console.p_resume.resume;
                                 }),
                                 new OutertaleDeveloperHitbox({ anchor: { x: 0 }, size: { x: 255, y: 25 } }).on(
                                    'click',
                                    function () {
                                       logician.resume();
                                    }
                                 )
                              ]
                           })
                        ]
                     }).on('tick', function () {
                        this.content = text.developer.console.p_resume.header;
                     })
                  ]
               })
            ]
         })
      ],
      switch (tab: number) {
         historian.clearIndex();
         historian.clearInput();
         for (const [ index, object ] of panel.object.objects[2].objects.entries()) {
            object.metadata.active = index === tab;
         }
         panel.object.objects[1].objects = [ panel.tab.objects[tab] ];
      },
      get value () {
         return panel.tab.objects.indexOf(panel.object.objects[1].objects[0]);
      }
   },
   userError: false
};

export function panelSetup () {
   panel.setup = true;

   inspector.hitboxGraphics.scale.set(2, 2);
   panel.renderer.attach('main', panel.object, inspector.reportText);
   panel.renderer.canvas.style.zIndex = '999';
   panel.tab.switch(0);

   panel.renderer.on('tick', function () {
      panel.renderer.layers.main.container.removeChild(inspector.hitboxGraphics);
   });

   panel.renderer.on('render', function () {
      panel.renderer.layers.main.container.addChild(inspector.hitboxGraphics);
      inspector.hitboxGraphics.clear();
      const camera = renderer.freecam ? renderer.position : renderer.position.clamp(...renderer.region);
      for (const [ key, layer ] of Object.entries(renderer.layers)) {
         const fixed = layer.modifiers[0];
         const zoom = fixed ? 1 : renderer.zoom.value;
         CosmosUtils.chain(
            [
               false,
               [ new CosmosPoint(fixed ? 0 : camera.multiply(-zoom).add(160, 120)), 0, new CosmosPoint(zoom) ],
               layer.objects
            ] as [boolean, CosmosTransform, CosmosObject[]],
            ([ wasActive, transform, objects ], next) => {
               for (const object of objects) {
                  if (object !== void 0) {
                     const active = wasActive || object === inspector.target;
                     const [ position, rotation, scale ] = CosmosMath.transform(transform, object, camera);
                     if (
                        object instanceof CosmosAnchoredObject &&
                        (active || inspector.switches[key as OutertaleLayerKey])
                     ) {
                        draw: {
                           let style: { alpha: number; color: number; width: number };
                           if (active) {
                              style = {
                                 alpha: 1,
                                 color: CosmosImageUtils.color.of(`hsl(${inspector.hitboxTint},100%,50%)`),
                                 width: 1
                              };
                           } else if (object instanceof CosmosHitbox && inspector.switches.hitbox) {
                              style = { alpha: 0.75, color: 0xffffff, width: 1 };
                           } else if (object instanceof CosmosSprite && inspector.switches.sprite) {
                              style = { alpha: 0.5, color: 0xffffff, width: 1 };
                           } else if (object instanceof CosmosText && inspector.switches.text) {
                              style = { alpha: 0.25, color: 0xffffff, width: 1 };
                           } else {
                              break draw;
                           }
                           const size = object.compute().multiply(scale);
                           const half = size.divide(2);
                           const base = position.subtract(half.add(half.multiply(object.anchor)));
                           if (object.offsets.length > 0) {
                              base.set(base.subtract(object.offsets.reduce((prev, curr) => prev.add(curr))));
                           }
                           const shift = rotation + 180;
                           const corner2 = base.endpoint(0, size.x);
                           const corner3 = corner2.endpoint(90, size.y);
                           const corner4 = corner3.endpoint(180, size.x);
                           const points = [
                              position.endpoint(position.angleFrom(base) + shift, position.extentOf(base)),
                              position.endpoint(position.angleFrom(corner2) + shift, position.extentOf(corner2)),
                              position.endpoint(position.angleFrom(corner3) + shift, position.extentOf(corner3)),
                              position.endpoint(position.angleFrom(corner4) + shift, position.extentOf(corner4))
                           ];
                           inspector.hitboxGraphics.moveTo(points[3].x, points[3].y);
                           inspector.hitboxGraphics.lineStyle({ alpha: 0.125, color: 0xffffff, width: 1 });
                           for (const { x, y } of object.offsets) {
                              for (const point of points) {
                                 inspector.hitboxGraphics.lineTo(point.x, point.y);
                              }
                              for (const point of points) {
                                 inspector.hitboxGraphics.moveTo(point.x, point.y);
                                 point.set(point.add(x, y));
                                 inspector.hitboxGraphics.lineTo(point.x, point.y);
                              }
                           }
                           inspector.hitboxGraphics.lineStyle(style);
                           for (const point of points) {
                              inspector.hitboxGraphics.lineTo(point.x, point.y);
                           }
                           if (object instanceof CosmosHitbox) {
                              object.calculate();
                              inspector.hitboxGraphics.lineStyle({ alpha: 0.5, color: 0xffffff, width: 1 });
                              for (const point of object.polygon.calcPoints) {
                                 inspector.hitboxGraphics.drawCircle(
                                    object.polygon.pos.x + point.x - (camera.x - 160),
                                    object.polygon.pos.y + point.y - (camera.y - 120),
                                    1
                                 );
                              }
                           }
                        }
                     }
                     next([ active, [ position, rotation, scale ], object.objects ]);
                  }
               }
            }
         );
      }
      if (renderer.freecam) {
         const base = camera.multiply(-renderer.zoom.value).add(160, 120);
         inspector.hitboxGraphics
            .beginFill(0xff00ff, 1 / 16)
            .drawRect(
               base.x + (renderer.region[0].x - 160) * renderer.zoom.value,
               base.y + (renderer.region[0].y - 120) * renderer.zoom.value,
               (renderer.region[1].x - renderer.region[0].x + 320) * renderer.zoom.value,
               (renderer.region[1].y - renderer.region[0].y + 240) * renderer.zoom.value
            )
            .endFill();
         inspector.hitboxGraphics.lineStyle({
            alpha: 0.5,
            color: 0xff00ff,
            width: 1
         });
         const p1 = base.add(
            game.camera.position
               .clamp(...renderer.region)
               .subtract(160, 120)
               .multiply(renderer.zoom.value)
         );
         const p2 = p1.add(new CosmosPoint(320, 240).multiply(renderer.zoom.value));
         inspector.hitboxGraphics.moveTo(p1.x, p1.y);
         inspector.hitboxGraphics.lineTo(p2.x, p1.y);
         inspector.hitboxGraphics.lineTo(p2.x, p2.y);
         inspector.hitboxGraphics.lineTo(p1.x, p2.y);
         inspector.hitboxGraphics.lineTo(p1.x, p1.y);
      }
      if (++inspector.hitboxTint === 360) {
         inspector.hitboxTint = 0;
      }
   });

   panel.renderer.wrapper!.addEventListener('click', event => {
      panel.active && panel.interaction({ x: event.offsetX, y: event.offsetY });
   });

   panel.renderer.wrapper!.addEventListener(
      'wheel',
      event => {
         panel.active && panel.interaction({ x: event.offsetX, y: event.offsetY }, 'wheel', event.deltaY < 0 ? -1 : 1);
      },
      { passive: true }
   );

   renderer.wrapper!.addEventListener('mousedown', event => {
      if (panel.active && !panel.dragger.state && event.offsetX <= 640) {
         if (renderer.freecam) {
            panel.dragger.origin.x = renderer.position.x;
            panel.dragger.origin.y = renderer.position.y;
         } else if (inspector.path.length !== 0 && inspector.target instanceof CosmosObject) {
            panel.dragger.origin.x = inspector.target.position.x;
            panel.dragger.origin.y = inspector.target.position.y;
         } else {
            return;
         }
         panel.dragger.state = true;
         panel.dragger.offset.x = event.offsetX;
         panel.dragger.offset.y = event.offsetY;
      }
   });

   renderer.wrapper!.addEventListener('mousemove', event => {
      if (panel.active && panel.dragger.state) {
         if (renderer.freecam) {
            const zoom = renderer.scale.multiply(renderer.zoom.value);
            renderer.position.set(
               panel.dragger.origin.x + (panel.dragger.offset.x - event.offsetX) / zoom.x,
               panel.dragger.origin.y + (panel.dragger.offset.y - event.offsetY) / zoom.y
            );
         } else if (inspector.path.length !== 0 && inspector.target instanceof CosmosObject) {
            inspector.target.position.set(
               panel.dragger.origin.x + (event.offsetX - panel.dragger.offset.x) / 2,
               panel.dragger.origin.y + (event.offsetY - panel.dragger.offset.y) / 2
            );
         }
      }
   });

   panel.renderer.wrapper!.addEventListener('mouseup', () => {
      panel.active && (panel.dragger.state = false);
   });

   panel.renderer.wrapper!.addEventListener(
      'wheel',
      event => {
         if (panel.active && renderer.freecam) {
            if (event.deltaY < 0) {
               renderer.zoom.value *= zoomFactor;
            } else {
               renderer.zoom.value /= zoomFactor;
            }
         }
      },
      { passive: true }
   );

   addEventListener('keydown', event => {
      if (panel.active && historian.input && historian.index !== null) {
         const info = historian.getEntry(historian.index);
         if (event.key === 'Backspace') {
            if (info.numeric) {
               if ([ 'NaN', 'Infinity', '-Infinity', '0', '-0' ].includes(info.value)) {
                  info.value = '0';
               } else {
                  info.value = info.value.slice(0, -1);
                  if (info.value === '-') {
                     info.value = '-0';
                  } else if (info.value === '') {
                     info.value = '0';
                  }
               }
            } else {
               info.value = info.value.slice(0, -1);
            }
         } else if (event.key.length === 1) {
            if (info.numeric) {
               if ('0123456789'.includes(event.key)) {
                  if (!info.value.includes('Infinity') && !info.value.includes('NaN')) {
                     if (info.value === '0') {
                        info.value = event.key;
                     } else if (info.value === '-0') {
                        info.value = `-${event.key}`;
                     } else {
                        info.value += event.key;
                        if (+info.value === Infinity) {
                           info.value = 'Infinity';
                        } else if (+info.value === -Infinity) {
                           info.value = '-Infinity';
                        } else if (+info.value <= 1 && -1 <= +info.value && info.value.length > 20) {
                           const negative = info.value[0] === '-';
                           info.value = `${+info.value}`;
                           if (negative && info.value[0] !== '-') {
                              info.value = `-${info.value}`;
                           }
                        }
                     }
                  }
               } else if (event.key === '-') {
                  if (info.value[0] === '-') {
                     info.value = info.value.slice(1);
                  } else {
                     info.value = `-${info.value}`;
                  }
               } else if (event.key === '.') {
                  if (!info.value.includes('.') && !info.value.includes('Infinity')) {
                     info.value += '.';
                  }
               } else if (event.key === 'i') {
                  if (+info.value === 0) {
                     if (info.value[0] === '-') {
                        info.value = '-Infinity';
                     } else {
                        info.value = 'Infinity';
                     }
                  } else {
                     info.value = `${+info.value * Infinity}`;
                  }
               }
            } else {
               info.value += event.key;
            }
         } else if (event.key === 'Enter') {
            historian.clearInput();
            return;
         }
         historian.setEntry(historian.index, info);
      }
   });

   if (isMobile.any) {
      addEventListener('touchstart', event => {
         if (!panel.active) {
            return;
         }
         event.preventDefault();
         const bounds = panel.renderer.canvas.getBoundingClientRect();
         for (const touch of mobile.touches(event)) {
            panel.interaction(
               new CosmosPoint(touch.clientX, touch.clientY)
                  .subtract(bounds)
                  .divide(game.ratio)
                  .divide(panel.renderer.scale)
            );
         }
      });
   }

   extraKeys.debugKey.on('down', () => {
      if (panel.active && game.input) {
         if (extraKeys.shiftKey.state.length !== 0) {
            panel.debug--;
            if (panel.debug === -2) {
               panel.debug = 4;
            }
         } else {
            panel.debug++;
            if (panel.debug === 5) {
               panel.debug = -1;
            }
         }
      }
   });

   extraKeys.noclipKey
      .on('down', () => panel.active && game.input && (game.noclip = true))
      .on('up', () => panel.active && game.input && (game.noclip = false));

   extraKeys.freecamKey
      .on('down', () => panel.active && game.input && (renderer.freecam = true))
      .on('up', () => {
         if (panel.active && game.input) {
            renderer.freecam = false;
            renderer.zoom.value = 1;
         }
      });
}

CosmosUtils.status(`LOAD MODULE: DEVELOPER (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
