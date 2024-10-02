import './init';

import { Filter, Graphics, Rectangle } from 'pixi.js';
import values from '../languages/default/text/values';
import { content, filters, inventories, musicConvolver, musicFilter, musicRegistry } from './systems/assets';
import {
   OutertaleChildAnimationDecorator,
   OutertaleChildBarrierDecorator,
   OutertaleChildObject,
   OutertaleChildScriptDecorator,
   OutertaleEditorContainer,
   OutertaleLayerKey,
   OutertaleMap,
   OutertaleParentObject,
   OutertaleParentObjectDecorator,
   OutertaleRoom,
   OutertaleRoomDecorator,
   OutertaleSpriteDecorator
} from './systems/outertale';
import {
   CosmosAnimation,
   CosmosAnimationResources,
   CosmosAsset,
   CosmosAtlas,
   CosmosDirection,
   CosmosEventHost,
   CosmosHitbox,
   CosmosImage,
   CosmosInstance,
   CosmosInventory,
   CosmosKeyboardInput,
   CosmosNavigator,
   CosmosObject,
   CosmosPoint,
   CosmosRectangle,
   CosmosRegion,
   CosmosRegistry,
   CosmosRenderer,
   CosmosSprite,
   CosmosText,
   CosmosUtils,
   CosmosValue
} from './systems/storyteller';

import im_$info from '../assets/images/maps/_.json?url';
import im_ from '../assets/images/maps/_.png?url';
import imAerialisAOverlay$info from '../assets/images/maps/aerialis-a-overlay.json?url';
import imAerialisAOverlay from '../assets/images/maps/aerialis-a-overlay.png?url';
import imAerialisA$info from '../assets/images/maps/aerialis-a.json?url';
import imAerialisA from '../assets/images/maps/aerialis-a.png?url';
import imAerialisBDark$info from '../assets/images/maps/aerialis-b-dark.json?url';
import imAerialisBDark from '../assets/images/maps/aerialis-b-dark.png?url';
import imAerialisB$info from '../assets/images/maps/aerialis-b.json?url';
import imAerialisB from '../assets/images/maps/aerialis-b.png?url';
import imCitadel$info from '../assets/images/maps/citadel.json?url';
import imCitadel from '../assets/images/maps/citadel.png?url';
import imFoundryOverlay$info from '../assets/images/maps/foundry-overlay.json?url';
import imFoundryOverlay from '../assets/images/maps/foundry-overlay.png?url';
import imFoundry$info from '../assets/images/maps/foundry.json?url';
import imFoundry from '../assets/images/maps/foundry.png?url';
import imOutlands$info from '../assets/images/maps/outlands.json?url';
import imOutlands from '../assets/images/maps/outlands.png?url';
import imStarton$info from '../assets/images/maps/starton.json?url';
import imStarton from '../assets/images/maps/starton.png?url';

import _ from '../rooms/_.json';
import _cockpit from '../rooms/_cockpit.json';
import _credits1 from '../rooms/_credits1.json';
import _credits2 from '../rooms/_credits2.json';
import _credits3 from '../rooms/_credits3.json';
import _credits4 from '../rooms/_credits4.json';
import _frontier1 from '../rooms/_frontier1.json';
import _frontier10 from '../rooms/_frontier10.json';
import _frontier2 from '../rooms/_frontier2.json';
import _frontier3 from '../rooms/_frontier3.json';
import _frontier4 from '../rooms/_frontier4.json';
import _frontier5 from '../rooms/_frontier5.json';
import _frontier6 from '../rooms/_frontier6.json';
import _frontier7 from '../rooms/_frontier7.json';
import _frontier8 from '../rooms/_frontier8.json';
import _frontier9 from '../rooms/_frontier9.json';
import _hangar from '../rooms/_hangar.json';
import _taxi from '../rooms/_taxi.json';
import _void from '../rooms/_void.json';
import a_aftershow from '../rooms/a_aftershow.json';
import a_auditorium from '../rooms/a_auditorium.json';
import a_barricade1 from '../rooms/a_barricade1.json';
import a_barricade2 from '../rooms/a_barricade2.json';
import a_citadelevator from '../rooms/a_citadelevator.json';
import a_core_battle from '../rooms/a_core_battle.json';
import a_core_bridge from '../rooms/a_core_bridge.json';
import a_core_checkpoint from '../rooms/a_core_checkpoint.json';
import a_core_entry1 from '../rooms/a_core_entry1.json';
import a_core_entry2 from '../rooms/a_core_entry2.json';
import a_core_exit1 from '../rooms/a_core_exit1.json';
import a_core_exit2 from '../rooms/a_core_exit2.json';
import a_core_left1 from '../rooms/a_core_left1.json';
import a_core_left2 from '../rooms/a_core_left2.json';
import a_core_left3 from '../rooms/a_core_left3.json';
import a_core_main from '../rooms/a_core_main.json';
import a_core_right1 from '../rooms/a_core_right1.json';
import a_core_right2 from '../rooms/a_core_right2.json';
import a_core_right3 from '../rooms/a_core_right3.json';
import a_core_suspense from '../rooms/a_core_suspense.json';
import a_dining from '../rooms/a_dining.json';
import a_elevator1 from '../rooms/a_elevator1.json';
import a_elevator2 from '../rooms/a_elevator2.json';
import a_elevator3 from '../rooms/a_elevator3.json';
import a_elevator4 from '../rooms/a_elevator4.json';
import a_elevator5 from '../rooms/a_elevator5.json';
import a_hub1 from '../rooms/a_hub1.json';
import a_hub2 from '../rooms/a_hub2.json';
import a_hub3 from '../rooms/a_hub3.json';
import a_hub4 from '../rooms/a_hub4.json';
import a_hub5 from '../rooms/a_hub5.json';
import a_lab_downstairs from '../rooms/a_lab_downstairs.json';
import a_lab_entry from '../rooms/a_lab_entry.json';
import a_lab_main from '../rooms/a_lab_main.json';
import a_lab_upstairs from '../rooms/a_lab_upstairs.json';
import a_lab_virt from '../rooms/a_lab_virt.json';
import a_lift from '../rooms/a_lift.json';
import a_lookout from '../rooms/a_lookout.json';
import a_mettaton1 from '../rooms/a_mettaton1.json';
import a_mettaton2 from '../rooms/a_mettaton2.json';
import a_offshoot1 from '../rooms/a_offshoot1.json';
import a_offshoot2 from '../rooms/a_offshoot2.json';
import a_pacing from '../rooms/a_pacing.json';
import a_path1 from '../rooms/a_path1.json';
import a_path2 from '../rooms/a_path2.json';
import a_path3 from '../rooms/a_path3.json';
import a_path4 from '../rooms/a_path4.json';
import a_plaza from '../rooms/a_plaza.json';
import a_prepuzzle from '../rooms/a_prepuzzle.json';
import a_puzzle1 from '../rooms/a_puzzle1.json';
import a_puzzle2 from '../rooms/a_puzzle2.json';
import a_rg1 from '../rooms/a_rg1.json';
import a_rg2 from '../rooms/a_rg2.json';
import a_sans from '../rooms/a_sans.json';
import a_sleeping1 from '../rooms/a_sleeping1.json';
import a_sleeping2 from '../rooms/a_sleeping2.json';
import a_sleeping3 from '../rooms/a_sleeping3.json';
import a_split from '../rooms/a_split.json';
import a_start from '../rooms/a_start.json';
import c_alley from '../rooms/c_alley.json';
import c_archive_aerialis1 from '../rooms/c_archive_aerialis1.json';
import c_archive_aerialis2 from '../rooms/c_archive_aerialis2.json';
import c_archive_aerialis3 from '../rooms/c_archive_aerialis3.json';
import c_archive_aerialis4 from '../rooms/c_archive_aerialis4.json';
import c_archive_exit from '../rooms/c_archive_exit.json';
import c_archive_foundryA1 from '../rooms/c_archive_foundryA1.json';
import c_archive_foundryA2 from '../rooms/c_archive_foundryA2.json';
import c_archive_foundryA3 from '../rooms/c_archive_foundryA3.json';
import c_archive_foundryA4 from '../rooms/c_archive_foundryA4.json';
import c_archive_foundryB1 from '../rooms/c_archive_foundryB1.json';
import c_archive_foundryB2 from '../rooms/c_archive_foundryB2.json';
import c_archive_foundryB3 from '../rooms/c_archive_foundryB3.json';
import c_archive_foundryB4 from '../rooms/c_archive_foundryB4.json';
import c_archive_path1 from '../rooms/c_archive_path1.json';
import c_archive_path2 from '../rooms/c_archive_path2.json';
import c_archive_path3 from '../rooms/c_archive_path3.json';
import c_archive_path4 from '../rooms/c_archive_path4.json';
import c_archive_path5 from '../rooms/c_archive_path5.json';
import c_archive_path6 from '../rooms/c_archive_path6.json';
import c_archive_start from '../rooms/c_archive_start.json';
import c_archive_starton1 from '../rooms/c_archive_starton1.json';
import c_archive_starton2 from '../rooms/c_archive_starton2.json';
import c_archive_starton3 from '../rooms/c_archive_starton3.json';
import c_archive_starton4 from '../rooms/c_archive_starton4.json';
import c_archive_surface from '../rooms/c_archive_surface.json';
import c_archive_wastelands1 from '../rooms/c_archive_wastelands1.json';
import c_archive_wastelands2 from '../rooms/c_archive_wastelands2.json';
import c_archive_wastelands3 from '../rooms/c_archive_wastelands3.json';
import c_archive_wastelands4 from '../rooms/c_archive_wastelands4.json';
import c_asgore_asgore from '../rooms/c_asgore_asgore.json';
import c_asgore_asriel from '../rooms/c_asgore_asriel.json';
import c_asgore_front from '../rooms/c_asgore_front.json';
import c_asgore_hallway from '../rooms/c_asgore_hallway.json';
import c_asgore_kitchen from '../rooms/c_asgore_kitchen.json';
import c_asgore_living from '../rooms/c_asgore_living.json';
import c_bastion from '../rooms/c_bastion.json';
import c_courtroom from '../rooms/c_courtroom.json';
import c_courtyard from '../rooms/c_courtyard.json';
import c_elevator1 from '../rooms/c_elevator1.json';
import c_elevator2 from '../rooms/c_elevator2.json';
import c_exit from '../rooms/c_exit.json';
import c_pacing from '../rooms/c_pacing.json';
import c_road1 from '../rooms/c_road1.json';
import c_road2 from '../rooms/c_road2.json';
import c_road3 from '../rooms/c_road3.json';
import c_start from '../rooms/c_start.json';
import c_story from '../rooms/c_story.json';
import c_throneroom from '../rooms/c_throneroom.json';
import f_abyss from '../rooms/f_abyss.json';
import f_artifact from '../rooms/f_artifact.json';
import f_battle from '../rooms/f_battle.json';
import f_bird from '../rooms/f_bird.json';
import f_blooky from '../rooms/f_blooky.json';
import f_chase from '../rooms/f_chase.json';
import f_chute from '../rooms/f_chute.json';
import f_corner from '../rooms/f_corner.json';
import f_corridor from '../rooms/f_corridor.json';
import f_doge from '../rooms/f_doge.json';
import f_dummy from '../rooms/f_dummy.json';
import f_entrance from '../rooms/f_entrance.json';
import f_error from '../rooms/f_error.json';
import f_exit from '../rooms/f_exit.json';
import f_hapstablook from '../rooms/f_hapstablook.json';
import f_hub from '../rooms/f_hub.json';
import f_kitchen from '../rooms/f_kitchen.json';
import f_lobby from '../rooms/f_lobby.json';
import f_muffet from '../rooms/f_muffet.json';
import f_napstablook from '../rooms/f_napstablook.json';
import f_pacing from '../rooms/f_pacing.json';
import f_path from '../rooms/f_path.json';
import f_piano from '../rooms/f_piano.json';
import f_plank from '../rooms/f_plank.json';
import f_prechase from '../rooms/f_prechase.json';
import f_prepuzzle from '../rooms/f_prepuzzle.json';
import f_prespear from '../rooms/f_prespear.json';
import f_puzzle1 from '../rooms/f_puzzle1.json';
import f_puzzle2 from '../rooms/f_puzzle2.json';
import f_puzzle3 from '../rooms/f_puzzle3.json';
import f_quiche from '../rooms/f_quiche.json';
import f_sans from '../rooms/f_sans.json';
import f_shyren from '../rooms/f_shyren.json';
import f_snail from '../rooms/f_snail.json';
import f_spear from '../rooms/f_spear.json';
import f_stand from '../rooms/f_stand.json';
import f_start from '../rooms/f_start.json';
import f_statue from '../rooms/f_statue.json';
import f_story1 from '../rooms/f_story1.json';
import f_story2 from '../rooms/f_story2.json';
import f_taxi from '../rooms/f_taxi.json';
import f_telescope from '../rooms/f_telescope.json';
import f_truth from '../rooms/f_truth.json';
import f_tunnel from '../rooms/f_tunnel.json';
import f_undyne from '../rooms/f_undyne.json';
import f_view from '../rooms/f_view.json';
import f_village from '../rooms/f_village.json';
import s_backrooms from '../rooms/s_backrooms.json';
import s_battle from '../rooms/s_battle.json';
import s_beddinng from '../rooms/s_beddinng.json';
import s_bonehouse from '../rooms/s_bonehouse.json';
import s_bridge from '../rooms/s_bridge.json';
import s_bros from '../rooms/s_bros.json';
import s_capture from '../rooms/s_capture.json';
import s_crossroads from '../rooms/s_crossroads.json';
import s_doggo from '../rooms/s_doggo.json';
import s_dogs from '../rooms/s_dogs.json';
import s_exit from '../rooms/s_exit.json';
import s_greater from '../rooms/s_greater.json';
import s_grillbys from '../rooms/s_grillbys.json';
import s_human from '../rooms/s_human.json';
import s_innterior from '../rooms/s_innterior.json';
import s_jenga from '../rooms/s_jenga.json';
import s_lesser from '../rooms/s_lesser.json';
import s_librarby from '../rooms/s_librarby.json';
import s_math from '../rooms/s_math.json';
import s_maze from '../rooms/s_maze.json';
import s_pacing from '../rooms/s_pacing.json';
import s_papyrus from '../rooms/s_papyrus.json';
import s_papyrusroom from '../rooms/s_papyrusroom.json';
import s_puzzle1 from '../rooms/s_puzzle1.json';
import s_puzzle2 from '../rooms/s_puzzle2.json';
import s_puzzle3 from '../rooms/s_puzzle3.json';
import s_robot from '../rooms/s_robot.json';
import s_sans from '../rooms/s_sans.json';
import s_sanscloset from '../rooms/s_sanscloset.json';
import s_sansroom from '../rooms/s_sansroom.json';
import s_secret from '../rooms/s_secret.json';
import s_spaghetti from '../rooms/s_spaghetti.json';
import s_start from '../rooms/s_start.json';
import s_taxi from '../rooms/s_taxi.json';
import s_town1 from '../rooms/s_town1.json';
import s_town2 from '../rooms/s_town2.json';
import w_alley1 from '../rooms/w_alley1.json';
import w_alley2 from '../rooms/w_alley2.json';
import w_alley3 from '../rooms/w_alley3.json';
import w_alley4 from '../rooms/w_alley4.json';
import w_annex from '../rooms/w_annex.json';
import w_blooky from '../rooms/w_blooky.json';
import w_bridge from '../rooms/w_bridge.json';
import w_candy from '../rooms/w_candy.json';
import w_coffin from '../rooms/w_coffin.json';
import w_courtyard from '../rooms/w_courtyard.json';
import w_danger from '../rooms/w_danger.json';
import w_dummy from '../rooms/w_dummy.json';
import w_entrance from '../rooms/w_entrance.json';
import w_exit from '../rooms/w_exit.json';
import w_froggit from '../rooms/w_froggit.json';
import w_junction from '../rooms/w_junction.json';
import w_lobby from '../rooms/w_lobby.json';
import w_mouse from '../rooms/w_mouse.json';
import w_pacing from '../rooms/w_pacing.json';
import w_party from '../rooms/w_party.json';
import w_puzzle1 from '../rooms/w_puzzle1.json';
import w_puzzle2 from '../rooms/w_puzzle2.json';
import w_puzzle3 from '../rooms/w_puzzle3.json';
import w_puzzle4 from '../rooms/w_puzzle4.json';
import w_start from '../rooms/w_start.json';
import w_toriel_asriel from '../rooms/w_toriel_asriel.json';
import w_toriel_front from '../rooms/w_toriel_front.json';
import w_toriel_hallway from '../rooms/w_toriel_hallway.json';
import w_toriel_kitchen from '../rooms/w_toriel_kitchen.json';
import w_toriel_living from '../rooms/w_toriel_living.json';
import w_toriel_toriel from '../rooms/w_toriel_toriel.json';
import w_tutorial from '../rooms/w_tutorial.json';
import w_twinkly from '../rooms/w_twinkly.json';
import w_wonder from '../rooms/w_wonder.json';
import w_zigzag from '../rooms/w_zigzag.json';

const aerialisAMap = new OutertaleMap(imAerialisA$info, new CosmosImage(imAerialisA));
aerialisAMap.name = 'maps::aerialisA';

const aerialisAOverlayMap = new OutertaleMap(imAerialisAOverlay$info, new CosmosImage(imAerialisAOverlay));
aerialisAOverlayMap.name = 'maps::aerialisAOverlay';

const aerialisBMap = new OutertaleMap(imAerialisB$info, new CosmosImage(imAerialisB));
aerialisBMap.name = 'maps::aerialisB';

const aerialisBDarkMap = new OutertaleMap(imAerialisBDark$info, new CosmosImage(imAerialisBDark));
aerialisBDarkMap.name = 'maps::aerialisBDark';

const citadelMap = new OutertaleMap(imCitadel$info, new CosmosImage(imCitadel));
citadelMap.name = 'maps::citadel';

export const _map = new OutertaleMap(im_$info, new CosmosImage(im_));
_map.name = 'maps::_';

export const foundryMap = new OutertaleMap(imFoundry$info, new CosmosImage(imFoundry));
foundryMap.name = 'maps::foundry';

export const foundryOverlayMap = new OutertaleMap(imFoundryOverlay$info, new CosmosImage(imFoundryOverlay));
foundryOverlayMap.name = 'maps::foundryOverlay';

export const outlandsMap = new OutertaleMap(imOutlands$info, new CosmosImage(imOutlands));
outlandsMap.name = 'maps::outlands';

export const startonMap = new OutertaleMap(imStarton$info, new CosmosImage(imStarton));
startonMap.name = 'maps::starton';

const text = {
   delete: 'delete',
   property: {
      active: 'active',
      anchor: 'anchor',
      args: 'args',
      background: 'background',
      filter: 'filter',
      filters: 'filters',
      frames: 'frames',
      gain: 'gain',
      layer: 'layer',
      music: 'music',
      name: 'name',
      neighbors: 'neighbors',
      objects: 'objects',
      position: 'position',
      preload: 'preload',
      rate: 'rate',
      regionMax: 'region-max',
      regionMin: 'region-min',
      resources: 'resources',
      reverb: 'reverb',
      rotation: 'rotation',
      score: 'score',
      size: 'size',
      spawn: 'spawn',
      steps: 'steps',
      tags: 'tags',
      type: 'type'
   },
   room: 'Room: $(x)',
   status: {
      creating: 'creating',
      modifying: 'modifying',
      selecting: 'selecting'
   },
   type: {
      object: 'object',
      room: 'room',
      subObject: 'sub-object'
   }
};

function atlasInput (key = null as string | null) {
   return game.input || [ 'ArrowLeft', 'ArrowRight' ].includes(key!);
}

function backSprite (map: OutertaleMap, name: string) {
   const handler = {
      priority: -Infinity,
      listener (this: CosmosSprite) {
         const {
            area: { x, y, width, height },
            offset
         } = map.value![`r:${name}`];
         this.crop.top = y;
         this.crop.left = x;
         this.crop.right = -x - width;
         this.crop.bottom = -y - height;
         this.position.set(offset);
         this.off('tick', handler);
      }
   };
   return new CosmosSprite({ frames: [ map.image ] }).on('tick', handler);
}

function easyRoom (name: string, map: OutertaleMap, decorator: OutertaleRoomDecorator) {
   const extras: CosmosAsset[] = [];
   rooms.register(
      name,
      new OutertaleRoom({
         decorator,
         face: decorator.face as CosmosDirection,
         layers: Object.fromEntries(
            Object.entries(decorator.layers ?? {}).map(([ layer, objects = [] ]) => [
               layer,
               [
                  ...(layer === decorator.background ? [ backSprite(map, name) ] : []),
                  ...(layer in (decorator.mixins ?? {}) ? [ backSprite(maps.of(decorator.mixins![layer]!), name) ] : []),
                  ...objects.map(decorator => {
                     const {
                        attachments = [],
                        barriers = [],
                        filters: filterList = [],
                        interacts = [],
                        position,
                        rotation,
                        tags = [],
                        triggers = []
                     } = decorator;
                     return new CosmosObject({
                        filters: filterList
                           .filter(filter => filter in filters)
                           .map(filter => filters[filter as keyof typeof filters]),
                        metadata: { class: 'object', decorator, tags: tags.slice() },
                        position,
                        rotation,
                        objects: [
                           ...attachments.map(decorator => {
                              const {
                                 anchor,
                                 active = false,
                                 filters: filterList = [],
                                 frames = [],
                                 position,
                                 resources,
                                 rotation,
                                 steps: duration,
                                 type
                              } = decorator;
                              if (type === 'sprite') {
                                 return new CosmosSprite({
                                    anchor,
                                    active,
                                    filters: filterList
                                       .filter(filter => filter in filters)
                                       .map(filter => filters[filter as keyof typeof filters]),
                                    frames: frames.map(frame => {
                                       const extra = content[frame as keyof typeof content] as CosmosImage;
                                       extras.push(extra);
                                       return extra;
                                    }),
                                    metadata: { class: 'attachment', decorator },
                                    position,
                                    rotation,
                                    duration
                                 });
                              } else {
                                 const extra = content[resources as keyof typeof content] as CosmosAnimationResources;
                                 extras.push(extra);
                                 return new CosmosAnimation({
                                    anchor,
                                    active,
                                    filters: filterList
                                       .filter(filter => filter in filters)
                                       .map(filter => filters[filter as keyof typeof filters]),
                                    metadata: { class: 'attachment', decorator },
                                    resources: extra,
                                    position,
                                    rotation
                                 });
                              }
                           }),
                           ...barriers.map(decorator => {
                              const { anchor, position, rotation, size } = decorator;
                              return new CosmosHitbox({
                                 anchor,
                                 metadata: { barrier: true, class: 'barrier', decorator },
                                 position,
                                 rotation,
                                 size
                              });
                           }),
                           ...interacts.map(decorator => {
                              const { anchor, args = [], name, position, rotation, size } = decorator;
                              return new CosmosHitbox({
                                 anchor,
                                 metadata: {
                                    args: args.slice(),
                                    class: 'interact',
                                    decorator,
                                    interact: true,
                                    name
                                 },
                                 position,
                                 rotation,
                                 size
                              });
                           }),
                           ...triggers.map(decorator => {
                              const { anchor, args = [], name, position, rotation, size } = decorator;
                              return new CosmosHitbox({
                                 anchor,
                                 metadata: { args, class: 'trigger', decorator, name, trigger: true },
                                 position,
                                 rotation,
                                 size
                              });
                           })
                        ]
                     });
                  })
               ]
            ])
         ),
         metadata: decorator.metadata,
         neighbors: decorator.neighbors?.slice(),
         preload: new CosmosInventory(
            ...([
               ...[ ...new Set([ map, ...Object.values(decorator.mixins ?? {}).map(key => maps.of(key!)) ]) ],
               ...extras,
               ...(decorator.preload ?? []).map(asset =>
                  asset[0] === '#'
                     ? maps.get(asset.slice(1))
                     : content[asset as keyof typeof content] || inventories[asset as keyof typeof inventories]
               )
            ].filter(asset => asset instanceof CosmosAsset) as CosmosAsset[])
         ),
         region: decorator.region?.slice() as CosmosRegion | [],
         score: decorator.score,
         spawn: decorator.spawn
      })
   );
}

function editorProperty (property: string) {
   if (atlas.target === 'editorObject' || property !== editor.property) {
      return '§fill=#fff§';
   } else if (atlas.target === 'editorProperty') {
      return '§fill=#0ff§';
   } else {
      return '§fill=#ff0§';
   }
}

function editorValue (property: string, index: number) {
   if (atlas.target === 'editorValue' && property === editor.property) {
      if (index === editor.index) {
         return '§fill=#f00§';
      } else {
         return '§fill=#ff0§';
      }
   } else {
      return editorProperty(property);
   }
}

function param (key: string, value: string | null = null) {
   value === null ? params.delete(key) : params.set(key, value);
   history.replaceState(null, '', `${location.origin + location.pathname}?${params.toString()}${location.hash}`);
}

async function reload (fast = false, invisible = fast) {
   param('fast', fast ? '' : null);
   param('invisible', invisible ? '' : null);
   param('xxx', Math.random().toString());
   backend?.exec('reload') ?? location.reload();
}

async function teleport (dest: string) {
   const next = rooms.of(dest);
   const score = next.score;
   const prev = rooms.of(game.room);
   if (score.music !== prev.score.music) {
      game.music?.stop();
   }
   renderer.clear('below', 'main', 'above');
   await next.preload.load();
   for (const key in next.layers) {
      renderer.attach(key as keyof typeof next.layers, ...(next.layers[key as keyof typeof next.layers] ?? []));
   }
   prev !== next && prev.preload.unload();
   const prevkey = game.room;
   game.room = dest;
   await renderer.on('render');
   events.fire('teleport', prevkey, dest);
   renderer.region[0].x = next.region[0]?.x ?? renderer.region[0].x;
   renderer.region[0].y = next.region[0]?.y ?? renderer.region[0].y;
   renderer.region[1].x = next.region[1]?.x ?? renderer.region[1].x;
   renderer.region[1].y = next.region[1]?.y ?? renderer.region[1].y;
   renderer.position.set(renderer.position.clamp(...renderer.region));
   if (score.music !== prev.score.music) {
      const daemon = typeof score.music === 'string' ? musicRegistry.of(score.music) : null;
      game.music = daemon?.instance(renderer) ?? null;
   }
   musicFilter.value = score.filter;
   game.music && (game.music.gain.value = game.music.daemon.gain * score.gain);
   game.music && (game.music.rate.value = game.music.daemon.rate * score.rate);
   musicConvolver.value = score.reverb;
}

const atlas = new CosmosAtlas();
const backend = typeof ___spacetime___ === 'object' ? ___spacetime___ : null;
const dragger = { state: false, origin: { x: 0, y: 0 }, offset: { x: 0, y: 0 } };
const events = new CosmosEventHost<{ teleport: [string, string] }>();

const fontLoader = content.fDiaryOfAn8BitMage.load();

const game = {
   input: true,
   music: null as CosmosInstance | null,
   resize () {
      const width = 640;
      const height = 480;
      const frame = document.querySelector('#frame') as HTMLElement;
      const wrapper = document.querySelector('#wrapper') as HTMLElement;
      let ratio: number;
      if (frame.clientWidth / frame.clientHeight < width / height) {
         ratio = frame.clientWidth / width;
      } else {
         ratio = frame.clientHeight / height;
      }
      wrapper.style.width = `${width}px`;
      wrapper.style.height = `${height}px`;
      wrapper.style.transform = `scale(${ratio})`;
   },
   room: ''
};

const keys = {
   downKey: CosmosKeyboardInput.create('ArrowDown', 'k:s'),
   freecamKey: CosmosKeyboardInput.create('Tab'),
   interactKey: CosmosKeyboardInput.create('Enter', 'Space'),
   leftKey: CosmosKeyboardInput.create('ArrowLeft', 'k:a'),
   rightKey: CosmosKeyboardInput.create('ArrowRight', 'k:d'),
   specialKey: CosmosKeyboardInput.create('Backspace', 'Escape', 'ShiftLeft', 'ShiftRight'),
   upKey: CosmosKeyboardInput.create('ArrowUp', 'k:w')
};

const maps = new CosmosRegistry<string, OutertaleMap>(new OutertaleMap('', new CosmosImage('')));
const params = new URLSearchParams(location.search);

const renderer = new CosmosRenderer<OutertaleLayerKey>({
   area: new Rectangle(0, 0, 640, 480),
   wrapper: '#wrapper',
   layers: { base: [ 'fixed' ], below: [], main: [ 'vertical' ], above: [], menu: [ 'fixed' ] },
   width: 640,
   height: 480,
   scale: 2
});

const rooms = new CosmosRegistry<string, OutertaleRoom>(new OutertaleRoom());
const zoomFactor = 2 ** (1 / 4);

import.meta.hot?.on('vite:beforeFullReload', () => {
   throw '';
});

maps.register('_', _map);
maps.register('outlands', outlandsMap);
maps.register('starton', startonMap);
maps.register('foundry', foundryMap);
maps.register('foundry-overlay', foundryOverlayMap);
maps.register('aerialis-a', aerialisAMap);
maps.register('aerialis-a-overlay', aerialisAOverlayMap);
maps.register('aerialis-b', aerialisBMap);
maps.register('aerialis-b-dark', aerialisBDarkMap);
maps.register('citadel', citadelMap);

easyRoom('_', _map, _);
easyRoom('_void', _map, _void);
easyRoom('_taxi', _map, _taxi);
easyRoom('_cockpit', _map, _cockpit);
easyRoom('_hangar', _map, _hangar);
easyRoom('_credits1', _map, _credits1);
easyRoom('_credits2', _map, _credits2);
easyRoom('_credits3', _map, _credits3);
easyRoom('_credits4', _map, _credits4);
easyRoom('_frontier1', _map, _frontier1);
easyRoom('_frontier2', _map, _frontier2);
easyRoom('_frontier3', _map, _frontier3);
easyRoom('_frontier4', _map, _frontier4);
easyRoom('_frontier5', _map, _frontier5);
easyRoom('_frontier6', _map, _frontier6);
easyRoom('_frontier7', _map, _frontier7);
easyRoom('_frontier8', _map, _frontier8);
easyRoom('_frontier9', _map, _frontier9);
easyRoom('_frontier10', _map, _frontier10);

easyRoom('w_start', outlandsMap, w_start);
easyRoom('w_twinkly', outlandsMap, w_twinkly);
easyRoom('w_entrance', outlandsMap, w_entrance);
easyRoom('w_lobby', outlandsMap, w_lobby);
easyRoom('w_tutorial', outlandsMap, w_tutorial);
easyRoom('w_dummy', outlandsMap, w_dummy);
easyRoom('w_coffin', outlandsMap, w_coffin);
easyRoom('w_danger', outlandsMap, w_danger);
easyRoom('w_zigzag', outlandsMap, w_zigzag);
easyRoom('w_froggit', outlandsMap, w_froggit);
easyRoom('w_candy', outlandsMap, w_candy);
easyRoom('w_puzzle1', outlandsMap, w_puzzle1);
easyRoom('w_puzzle2', outlandsMap, w_puzzle2);
easyRoom('w_puzzle3', outlandsMap, w_puzzle3);
easyRoom('w_puzzle4', outlandsMap, w_puzzle4);
easyRoom('w_mouse', outlandsMap, w_mouse);
easyRoom('w_blooky', outlandsMap, w_blooky);
easyRoom('w_party', outlandsMap, w_party);
easyRoom('w_pacing', outlandsMap, w_pacing);
easyRoom('w_junction', outlandsMap, w_junction);
easyRoom('w_annex', outlandsMap, w_annex);
easyRoom('w_wonder', outlandsMap, w_wonder);
easyRoom('w_courtyard', outlandsMap, w_courtyard);
easyRoom('w_toriel_front', outlandsMap, w_toriel_front);
easyRoom('w_toriel_living', outlandsMap, w_toriel_living);
easyRoom('w_toriel_kitchen', outlandsMap, w_toriel_kitchen);
easyRoom('w_toriel_hallway', outlandsMap, w_toriel_hallway);
easyRoom('w_toriel_asriel', outlandsMap, w_toriel_asriel);
easyRoom('w_toriel_toriel', outlandsMap, w_toriel_toriel);
easyRoom('w_alley1', outlandsMap, w_alley1);
easyRoom('w_alley2', outlandsMap, w_alley2);
easyRoom('w_alley3', outlandsMap, w_alley3);
easyRoom('w_alley4', outlandsMap, w_alley4);
easyRoom('w_bridge', outlandsMap, w_bridge);
easyRoom('w_exit', outlandsMap, w_exit);

easyRoom('s_start', startonMap, s_start);
easyRoom('s_sans', startonMap, s_sans);
easyRoom('s_crossroads', startonMap, s_crossroads);
easyRoom('s_human', startonMap, s_human);
easyRoom('s_papyrus', startonMap, s_papyrus);
easyRoom('s_doggo', startonMap, s_doggo);
easyRoom('s_robot', startonMap, s_robot);
easyRoom('s_maze', startonMap, s_maze);
easyRoom('s_dogs', startonMap, s_dogs);
easyRoom('s_lesser', startonMap, s_lesser);
easyRoom('s_spaghetti', startonMap, s_spaghetti);
easyRoom('s_bros', startonMap, s_bros);
easyRoom('s_puzzle1', startonMap, s_puzzle1);
easyRoom('s_puzzle2', startonMap, s_puzzle2);
easyRoom('s_jenga', startonMap, s_jenga);
easyRoom('s_pacing', startonMap, s_pacing);
easyRoom('s_puzzle3', startonMap, s_puzzle3);
easyRoom('s_greater', startonMap, s_greater);
easyRoom('s_math', startonMap, s_math);
easyRoom('s_secret', startonMap, s_secret);
easyRoom('s_bridge', startonMap, s_bridge);
easyRoom('s_town1', startonMap, s_town1);
easyRoom('s_innterior', startonMap, s_innterior);
easyRoom('s_beddinng', startonMap, s_beddinng);
easyRoom('s_grillbys', startonMap, s_grillbys);
easyRoom('s_backrooms', startonMap, s_backrooms);
easyRoom('s_taxi', startonMap, s_taxi);
easyRoom('s_town2', startonMap, s_town2);
easyRoom('s_librarby', startonMap, s_librarby);
easyRoom('s_bonehouse', startonMap, s_bonehouse);
easyRoom('s_papyrusroom', startonMap, s_papyrusroom);
easyRoom('s_sansroom', startonMap, s_sansroom);
easyRoom('s_sanscloset', startonMap, s_sanscloset);
easyRoom('s_capture', startonMap, s_capture);
easyRoom('s_battle', startonMap, s_battle);
easyRoom('s_exit', startonMap, s_exit);

easyRoom('f_start', foundryMap, f_start);
easyRoom('f_sans', foundryMap, f_sans);
easyRoom('f_corridor', foundryMap, f_corridor);
easyRoom('f_doge', foundryMap, f_doge);
easyRoom('f_puzzle1', foundryMap, f_puzzle1);
easyRoom('f_quiche', foundryMap, f_quiche);
easyRoom('f_bird', foundryMap, f_bird);
easyRoom('f_puzzle2', foundryMap, f_puzzle2);
easyRoom('f_story1', foundryMap, f_story1);
easyRoom('f_prechase', foundryMap, f_prechase);
easyRoom('f_chase', foundryMap, f_chase);
easyRoom('f_entrance', foundryMap, f_entrance);
easyRoom('f_lobby', foundryMap, f_lobby);
easyRoom('f_error', foundryMap, f_error);
easyRoom('f_telescope', foundryMap, f_telescope);
easyRoom('f_stand', foundryMap, f_stand);
easyRoom('f_abyss', foundryMap, f_abyss);
easyRoom('f_muffet', foundryMap, f_muffet);
easyRoom('f_shyren', foundryMap, f_shyren);
easyRoom('f_statue', foundryMap, f_statue);
easyRoom('f_piano', foundryMap, f_piano);
easyRoom('f_artifact', foundryMap, f_artifact);
easyRoom('f_truth', foundryMap, f_truth);
easyRoom('f_path', foundryMap, f_path);
easyRoom('f_view', foundryMap, f_view);
easyRoom('f_prespear', foundryMap, f_prespear);
easyRoom('f_spear', foundryMap, f_spear);
easyRoom('f_plank', foundryMap, f_plank);
easyRoom('f_tunnel', foundryMap, f_tunnel);
easyRoom('f_chute', foundryMap, f_chute);
easyRoom('f_dummy', foundryMap, f_dummy);
easyRoom('f_village', foundryMap, f_village);
easyRoom('f_hub', foundryMap, f_hub);
easyRoom('f_undyne', foundryMap, f_undyne);
easyRoom('f_kitchen', foundryMap, f_kitchen);
easyRoom('f_blooky', foundryMap, f_blooky);
easyRoom('f_snail', foundryMap, f_snail);
easyRoom('f_napstablook', foundryMap, f_napstablook);
easyRoom('f_hapstablook', foundryMap, f_hapstablook);
easyRoom('f_prepuzzle', foundryMap, f_prepuzzle);
easyRoom('f_puzzle3', foundryMap, f_puzzle3);
easyRoom('f_taxi', foundryMap, f_taxi);
easyRoom('f_corner', foundryMap, f_corner);
easyRoom('f_story2', foundryMap, f_story2);
easyRoom('f_pacing', foundryMap, f_pacing);
easyRoom('f_battle', foundryMap, f_battle);
easyRoom('f_exit', foundryMap, f_exit);

easyRoom('a_start', aerialisAMap, a_start);
easyRoom('a_lab_entry', aerialisAMap, a_lab_entry);
easyRoom('a_lab_main', aerialisAMap, a_lab_main);
easyRoom('a_lab_upstairs', aerialisAMap, a_lab_upstairs);
easyRoom('a_lab_downstairs', aerialisAMap, a_lab_downstairs);
easyRoom('a_lab_virt', aerialisAMap, a_lab_virt);
easyRoom('a_path1', aerialisAMap, a_path1);
easyRoom('a_path2', aerialisAMap, a_path2);
easyRoom('a_path3', aerialisAMap, a_path3);
easyRoom('a_rg1', aerialisAMap, a_rg1);
easyRoom('a_path4', aerialisAMap, a_path4);
easyRoom('a_barricade1', aerialisAMap, a_barricade1);
easyRoom('a_puzzle1', aerialisAMap, a_puzzle1);
easyRoom('a_mettaton1', aerialisAMap, a_mettaton1);
easyRoom('a_elevator1', aerialisAMap, a_elevator1);
easyRoom('a_lift', aerialisAMap, a_lift);
easyRoom('a_elevator2', aerialisAMap, a_elevator2);
easyRoom('a_sans', aerialisAMap, a_sans);
easyRoom('a_pacing', aerialisAMap, a_pacing);
easyRoom('a_prepuzzle', aerialisAMap, a_prepuzzle);
easyRoom('a_puzzle2', aerialisAMap, a_puzzle2);
easyRoom('a_mettaton2', aerialisAMap, a_mettaton2);
easyRoom('a_rg2', aerialisAMap, a_rg2);
easyRoom('a_barricade2', aerialisAMap, a_barricade2);
easyRoom('a_split', aerialisAMap, a_split);
easyRoom('a_offshoot1', aerialisAMap, a_offshoot1);
easyRoom('a_offshoot2', aerialisAMap, a_offshoot2);
easyRoom('a_elevator3', aerialisAMap, a_elevator3);

easyRoom('a_elevator4', aerialisBMap, a_elevator4);
easyRoom('a_auditorium', aerialisBMap, a_auditorium);
easyRoom('a_aftershow', aerialisBMap, a_aftershow);
easyRoom('a_hub1', aerialisBMap, a_hub1);
easyRoom('a_dining', aerialisBMap, a_dining);
easyRoom('a_hub2', aerialisBMap, a_hub2);
easyRoom('a_lookout', aerialisBMap, a_lookout);
easyRoom('a_hub3', aerialisBMap, a_hub3);
easyRoom('a_plaza', aerialisBMap, a_plaza);
easyRoom('a_elevator5', aerialisBMap, a_elevator5);
easyRoom('a_hub4', aerialisBMap, a_hub4);
easyRoom('a_sleeping1', aerialisBMap, a_sleeping1);
easyRoom('a_sleeping2', aerialisBMap, a_sleeping2);
easyRoom('a_sleeping3', aerialisBMap, a_sleeping3);
easyRoom('a_hub5', aerialisBMap, a_hub5);
easyRoom('a_citadelevator', aerialisBMap, a_citadelevator);
easyRoom('a_core_entry1', aerialisBMap, a_core_entry1);
easyRoom('a_core_entry2', aerialisBMap, a_core_entry2);
easyRoom('a_core_main', aerialisBMap, a_core_main);
easyRoom('a_core_left1', aerialisBMap, a_core_left1);
easyRoom('a_core_left2', aerialisBMap, a_core_left2);
easyRoom('a_core_left3', aerialisBMap, a_core_left3);
easyRoom('a_core_right1', aerialisBMap, a_core_right1);
easyRoom('a_core_right2', aerialisBMap, a_core_right2);
easyRoom('a_core_right3', aerialisBMap, a_core_right3);
easyRoom('a_core_bridge', aerialisBMap, a_core_bridge);
easyRoom('a_core_checkpoint', aerialisBMap, a_core_checkpoint);
easyRoom('a_core_suspense', aerialisBMap, a_core_suspense);
easyRoom('a_core_battle', aerialisBMap, a_core_battle);
easyRoom('a_core_exit1', aerialisBMap, a_core_exit1);
easyRoom('a_core_exit2', aerialisBMap, a_core_exit2);

easyRoom('c_start', citadelMap, c_start);
easyRoom('c_road1', citadelMap, c_road1);
easyRoom('c_elevator1', citadelMap, c_elevator1);
easyRoom('c_pacing', citadelMap, c_pacing);
easyRoom('c_courtyard', citadelMap, c_courtyard);
easyRoom('c_alley', citadelMap, c_alley);
easyRoom('c_story', citadelMap, c_story);
easyRoom('c_elevator2', citadelMap, c_elevator2);
easyRoom('c_courtroom', citadelMap, c_courtroom);
easyRoom('c_road2', citadelMap, c_road2);
easyRoom('c_throneroom', citadelMap, c_throneroom);
easyRoom('c_bastion', citadelMap, c_bastion);
easyRoom('c_road3', citadelMap, c_road3);
easyRoom('c_exit', citadelMap, c_exit);
easyRoom('c_asgore_front', citadelMap, c_asgore_front);
easyRoom('c_asgore_living', citadelMap, c_asgore_living);
easyRoom('c_asgore_kitchen', citadelMap, c_asgore_kitchen);
easyRoom('c_asgore_hallway', citadelMap, c_asgore_hallway);
easyRoom('c_asgore_asriel', citadelMap, c_asgore_asriel);
easyRoom('c_asgore_asgore', citadelMap, c_asgore_asgore);
easyRoom('c_archive_start', citadelMap, c_archive_start);
easyRoom('c_archive_path1', citadelMap, c_archive_path1);
easyRoom('c_archive_wastelands1', citadelMap, c_archive_wastelands1);
easyRoom('c_archive_wastelands2', citadelMap, c_archive_wastelands2);
easyRoom('c_archive_wastelands3', citadelMap, c_archive_wastelands3);
easyRoom('c_archive_wastelands4', citadelMap, c_archive_wastelands4);
easyRoom('c_archive_path2', citadelMap, c_archive_path2);
easyRoom('c_archive_starton1', citadelMap, c_archive_starton1);
easyRoom('c_archive_starton2', citadelMap, c_archive_starton2);
easyRoom('c_archive_starton3', citadelMap, c_archive_starton3);
easyRoom('c_archive_starton4', citadelMap, c_archive_starton4);
easyRoom('c_archive_path3', citadelMap, c_archive_path3);
easyRoom('c_archive_foundryA1', citadelMap, c_archive_foundryA1);
easyRoom('c_archive_foundryA2', citadelMap, c_archive_foundryA2);
easyRoom('c_archive_foundryA3', citadelMap, c_archive_foundryA3);
easyRoom('c_archive_foundryA4', citadelMap, c_archive_foundryA4);
easyRoom('c_archive_path4', citadelMap, c_archive_path4);
easyRoom('c_archive_foundryB1', citadelMap, c_archive_foundryB1);
easyRoom('c_archive_foundryB2', citadelMap, c_archive_foundryB2);
easyRoom('c_archive_foundryB3', citadelMap, c_archive_foundryB3);
easyRoom('c_archive_foundryB4', citadelMap, c_archive_foundryB4);
easyRoom('c_archive_path5', citadelMap, c_archive_path5);
easyRoom('c_archive_aerialis1', citadelMap, c_archive_aerialis1);
easyRoom('c_archive_aerialis2', citadelMap, c_archive_aerialis2);
easyRoom('c_archive_aerialis3', citadelMap, c_archive_aerialis3);
easyRoom('c_archive_aerialis4', citadelMap, c_archive_aerialis4);
easyRoom('c_archive_path6', citadelMap, c_archive_path6);
easyRoom('c_archive_surface', citadelMap, c_archive_surface);
easyRoom('c_archive_exit', citadelMap, c_archive_exit);

const editor = {
   associations: new Map<OutertaleParentObject | OutertaleChildObject, CosmosRectangle>(),
   box (parent: OutertaleParentObject, child?: OutertaleChildObject) {
      if (child) {
         editor.associations.has(child) ||
            editor.associations.set(
               child,
               new CosmosRectangle({
                  fill: -1,
                  metadata: {
                     display: false,
                     graphics: new Graphics()
                  },
                  stroke: {
                     attachment: 0xffffff,
                     barrier: 0xff0000,
                     interact: 0x00ff00,
                     trigger: 0x0000ff
                  }[child.metadata.class]
               }).on('tick', function () {
                  this.alpha.value = editor.target?.object === child ? 1 : 0.6;
                  this.anchor.set(child.anchor);
                  this.position.set(parent.position.add(child));
                  this.size.set(child.compute());
                  this.rotation.value = child.rotation.value;
                  if (editor.target?.object === child) {
                     const graphics = this.metadata.graphics.clear().lineStyle({
                        width: 1.5,
                        color: { attachment: 0xffffff, barrier: 0xff3f3f, interact: 0x3fff3f, trigger: 0x3f3fff }[
                           child.metadata.class
                        ],
                        alpha: 0x6f / 0xff
                     });
                     const size = child.compute();
                     const half = new CosmosPoint(size?.x || 0, size?.y || 0).divide(2);
                     const diff = half.add(half.multiply(child.anchor));
                     for (const [ dx, dy ] of [
                        [ 0, 0 ],
                        [ size?.x ?? 0, 0 ],
                        [ 0, size?.y ?? 0 ],
                        [ size?.x ?? 0, size?.y ?? 0 ]
                     ]) {
                        graphics
                           .beginFill()
                           .moveTo(dx - diff.x, dy - diff.y)
                           .lineTo(0, 0)
                           .endFill();
                     }
                     graphics.beginFill().arc(0, 0, 1.5, 0, 360).endFill();
                     if (!this.metadata.display) {
                        this.metadata.display = true;
                        this.container.addChild(graphics);
                     }
                  } else if (this.metadata.display) {
                     this.metadata.display = false;
                     this.container.removeChild(this.metadata.graphics);
                  }
               })
            );
         return editor.associations.get(child)!;
      } else {
         editor.associations.has(parent) ||
            editor.associations.set(
               parent,
               new CosmosRectangle().on('tick', function () {
                  this.alpha.value = editor.target?.object === parent ? 1 : 0.6;
                  this.position = (renderer.freecam ? renderer.position : renderer.position.clamp(...renderer.region))
                     .multiply(-renderer.zoom.value)
                     .add(160, 120);
                  this.rotation.value = parent.rotation.value;
                  this.scale.set(renderer.zoom.value);
               })
            );
         return editor.associations.get(parent)!;
      }
   },
   containers: [] as OutertaleEditorContainer[],
   depth: -1,
   destination: params.get('room') ?? 'w_start',
   editTime: Infinity,
   get index () {
      return atlas.navigators.of('editorValue').position.x;
   },
   set index (value) {
      atlas.navigators.of('editorValue').position.x = value;
   },
   generate () {
      editor.wrapper.objects = [];
      editor.containers = (
         editor.layers
            .flatMap(key => renderer.layers[key].objects)
            .filter(object => object.metadata.class === 'object') as OutertaleParentObject[]
      ).map(parent => {
         const box = editor.box(parent);
         const container = {
            box,
            children: [] as {
               box: CosmosRectangle;
               object: OutertaleChildObject;
               parent: OutertaleEditorContainer;
            }[],
            object: parent
         };
         box.objects = [];
         box.attach(
            ...parent.objects.map((child: OutertaleChildObject) => {
               const box = editor.box(parent, child);
               container.children.push({ box, object: child, parent: container });
               return box;
            })
         );
         editor.wrapper.attach(box);
         return container;
      });
   },
   get group () {
      const property = editor.property;
      for (const key in editor.groups) {
         if (editor.groups[key as keyof typeof editor.groups].includes(property)) {
            return key;
         }
      }
   },
   groups: {
      array: [ 'tags', 'frames', 'args', 'preload', 'neighbors', 'filters' ],
      boolean: [ 'active' ],
      number: [ 'steps', 'gain', 'reverb', 'filter', 'rate', 'rotation' ],
      string: [ 'resources', 'name', 'music' ],
      vector: [ 'position', 'anchor', 'size', 'region-min', 'region-max', 'spawn' ]
   },
   layers: [ 'below', 'main', 'above' ] as OutertaleLayerKey[],
   get parent () {
      return editor.containers[editor.pos.x];
   },
   pos: { x: 0, y: 0 },
   get property () {
      return atlas.navigators.of('editorProperty').selection() as string;
   },
   get room () {
      return rooms.of(game.room).decorator ?? {};
   },
   get target () {
      if (editor.depth === -1) {
         return null;
      } else if (editor.depth > 0) {
         return editor.parent.children[editor.pos.y];
      } else if (editor.containers.length > 0) {
         return editor.parent;
      } else {
         return null;
      }
   },
   write () {
      backend?.writeRoom(game.room, CosmosUtils.serialize(rooms.of(game.room).decorator, true));
   },
   text: new CosmosObject({
      position: { x: 2.5, y: 240 - 2.5 },
      priority: Infinity,
      objects: [
         new CosmosRectangle({
            fill: 0,
            alpha: 0x7 / 0xf,
            anchor: { y: 1 }
         }),
         new CosmosText({
            fontFamily: content.fDiaryOfAn8BitMage,
            fontSize: 10,
            anchor: { y: 1 },
            fill: 0xffffff,
            position: { x: 2.5, y: -2.5 },
            spacing: { x: -0.5 }
         }).on('tick', function () {
            if (editor.depth === -2) {
               this.content = text.room.replace('$(x)', editor.destination);
            } else if (editor.depth === -1) {
               this.content = `${text.status.modifying} - ${text.type.room}\n---\n${editorProperty('preload')}> ${
                  text.property.preload
               }: [${values.textFormat(
                  (editor.room.preload || [])
                     .map((arg, index) => `${editorValue('preload', index)}"${arg}"${editorProperty('preload')}`)
                     .join(', '),
                  120,
                  true
               )}]\n${editorProperty('background')}> ${text.property.background}: "${
                  editor.room.background
               }"\n${editorProperty('neighbors')}> ${text.property.neighbors}: [${(editor.room.neighbors || [])
                  .map((arg, index) => `${editorValue('neighbors', index)}"${arg}"${editorProperty('neighbors')}`)
                  .join(', ')}]\n${editorProperty('region-min')}> ${text.property.regionMin}: ${
                  editor.room.region?.[0].x ?? 0
               }x ${editor.room.region?.[0].y ?? 0}y\n${editorProperty('region-max')}> ${text.property.regionMax}: ${
                  editor.room.region?.[1].x ?? 0
               }x ${editor.room.region?.[1].y ?? 0}y\n${editorProperty('spawn')}> ${text.property.spawn}: ${
                  editor.room.spawn?.x ?? 0
               }x ${editor.room.spawn?.y ?? 0}y\n${editorProperty('music')}> ${text.property.music}: "${
                  editor.room.score?.music ?? ''
               }"\n${editorProperty('gain')}> ${text.property.gain}: ${editor.room.score?.gain ?? 1}\n${editorProperty(
                  'reverb'
               )}> ${text.property.reverb}: ${editor.room.score?.reverb ?? 0}\n${editorProperty('filter')}> ${
                  text.property.filter
               }: ${editor.room.score?.filter ?? 0}\n${editorProperty('rate')}> ${text.property.rate}: ${
                  editor.room.score?.rate ?? 1
               }\n${editorProperty('objects')}> ${text.property.objects}: [${editor.containers.length}]`;
            } else if (atlas.target === 'editorAdd') {
               this.content = `${text.status.creating} - ${
                  editor.depth > 0 ? text.type.subObject : text.type.object
               }\n§fill=#ff0§> ${editor.depth > 0 ? text.property.type : text.property.layer}: ${
                  (editor.depth > 0 ? editor.types : editor.layers)[atlas.navigators.of('editorAdd').position.y]
               }`;
            } else {
               const target = editor.target;
               if (target) {
                  const object = target.object;
                  const meta = object.metadata;
                  this.content = `${
                     atlas.target === 'editorObject' ? text.status.selecting : text.status.modifying
                  } - ${meta.class}\n---\n${editorProperty('position')}> ${text.property.position}: ${
                     meta.decorator.position?.x ?? 0
                  }x ${meta.decorator.position?.y ?? 0}y\n${
                     meta.class === 'object'
                        ? `${editorProperty('filters')}> ${text.property.filters}: [${(meta.decorator.filters || [])
                             .map(
                                (frame, index) =>
                                   `${editorValue('filters', index)}"${frame}"${editorProperty('filters')}`
                             )
                             .join(', ')}]\n${editorProperty('tags')}> ${text.property.tags}: [${(
                             meta.decorator.tags || []
                          )
                             .map((tag, index) => `${editorValue('tags', index)}"${tag}"${editorProperty('tags')}`)
                             .join(', ')}]\n${editorProperty('objects')}> ${text.property.objects}: [${
                             object.objects.length
                          }]`
                        : `${editorProperty('anchor')}> ${text.property.anchor}: ${meta.decorator.anchor?.x ?? -1}x ${
                             meta.decorator.anchor?.y ?? -1
                          }y\n${
                             meta.class === 'attachment'
                                ? `${editorProperty('active')}> ${text.property.active}: ${
                                     meta.decorator.active || false
                                  }\n${editorProperty('filters')}> ${text.property.filters}: [${(
                                     meta.decorator.filters || []
                                  )
                                     .map(
                                        (frame, index) =>
                                           `${editorValue('filters', index)}"${frame}"${editorProperty('filters')}`
                                     )
                                     .join(', ')}]\n${
                                     meta.decorator.type === 'sprite'
                                        ? `${editorProperty('frames')}> ${text.property.frames}: [${(
                                             meta.decorator.frames || []
                                          )
                                             .map(
                                                (frame, index) =>
                                                   `${editorValue('frames', index)}"${frame}"${editorProperty(
                                                      'frames'
                                                   )}`
                                             )
                                             .join(', ')}]\n${editorProperty('steps')}> ${text.property.steps}: ${
                                             meta.decorator.steps || 0
                                          }`
                                        : `${editorProperty('resources')}> ${text.property.resources}: "${
                                             meta.decorator.resources || ''
                                          }"`
                                  }`
                                : `${editorProperty('size')}> ${text.property.size}: ${meta.decorator.size?.x ?? 0}x ${
                                     meta.decorator.size?.y ?? 0
                                  }y${
                                     meta.class === 'barrier'
                                        ? ''
                                        : `\n${editorProperty('name')}> ${text.property.name}: "${
                                             meta.decorator.name || ''
                                          }"\n${editorProperty('args')}> ${text.property.args}: [${(
                                             meta.decorator.args || []
                                          )
                                             .map(
                                                (arg, index) =>
                                                   `${editorValue('args', index)}"${arg}"${editorProperty('args')}`
                                             )
                                             .join(', ')}]`
                                  }`
                          }`
                  }\n${editorProperty('rotation')}> ${text.property.rotation}: ${
                     meta.decorator.rotation ?? 0
                  }\n${editorProperty('delete')}> ${text.delete}`;
               }
            }
         })
      ]
   }).on('pre-render', function () {
      (this.objects[0] as CosmosRectangle).size.set((this.objects[1] as CosmosText).compute().add(5, 7.5));
   }),
   types: [ 'animation', 'sprite', 'barrier', 'interact', 'trigger' ],
   waiting: false,
   wrapper: new CosmosObject({ priority: -1 })
};

atlas.navigators.register({
   editorAdd: new CosmosNavigator({
      flip: true,
      grid: () => [ editor.depth > 0 ? editor.types : editor.layers ],
      next (self) {
         const selection = self.selection() as string;
         if (editor.depth > 0) {
            let object: CosmosObject;
            const parent = editor.parent.object;
            switch (selection) {
               case 'animation': {
                  const decorator = { type: 'animation' } as OutertaleChildAnimationDecorator;
                  object = new CosmosAnimation({ metadata: { class: 'attachment', decorator } });
                  (parent.metadata.decorator.attachments ??= []).push(decorator);
                  break;
               }
               case 'sprite': {
                  const decorator = { type: 'sprite' } as OutertaleSpriteDecorator;
                  object = new CosmosSprite({ metadata: { class: 'attachment', decorator } });
                  (parent.metadata.decorator.attachments ??= []).push(decorator);
                  break;
               }
               case 'barrier': {
                  const decorator = {} as OutertaleChildBarrierDecorator;
                  object = new CosmosHitbox({ metadata: { barrier: true, class: 'barrier', decorator } });
                  (parent.metadata.decorator.barriers ??= []).push(decorator);
                  break;
               }
               default: {
                  const decorator = {} as OutertaleChildScriptDecorator;
                  object = new CosmosHitbox({
                     metadata: { [selection]: true, args: [], class: selection, decorator, name: '' }
                  });
                  (parent.metadata.decorator[`${selection as 'interact' | 'trigger'}s`] ??= []).push(decorator);
                  break;
               }
            }
            parent.attach(object);
            editor.generate();
            editor.write();
            for (const [ index, child ] of editor.parent.children.entries()) {
               if (child.object === object) {
                  editor.pos.y = index;
                  break;
               }
            }
         } else {
            const decorator = {} as OutertaleParentObjectDecorator;
            const object = new CosmosObject({ metadata: { class: 'object', decorator, tags: [] as string[] } });
            ((rooms.of(game.room).decorator!.layers ??= {})[selection as OutertaleLayerKey] ??= []).push(decorator);
            renderer.attach(selection as OutertaleLayerKey, object);
            const room = game.room;
            events.on('teleport', (from, to) => {
               if (to === room) {
                  renderer.attach(selection as OutertaleLayerKey, object);
               } else if (from === room) {
                  renderer.detach(selection as OutertaleLayerKey, object);
               }
            });
            editor.generate();
            editor.write();
            for (const [ index, parent ] of editor.containers.entries()) {
               if (parent.object === object) {
                  editor.pos.x = index;
                  break;
               }
            }
         }
         atlas.navigators.of('editorProperty').setpos();
         return 'editorProperty';
      },
      prev () {
         if (editor.depth > 0) {
            editor.parent.children.length === 0 && (editor.depth = 0);
            return 'editorObject';
         } else if (editor.containers.length > 0) {
            return 'editorObject';
         } else {
            editor.depth = -1;
            atlas.navigators.of('editorProperty').position.y = CosmosUtils.provide(
               atlas.navigators.of('editorProperty').grid
            )[0].indexOf('objects');
            return 'editorProperty';
         }
      }
   }).on('from', function () {
      this.setpos();
   }),
   editorObject: new CosmosNavigator<string>({
      flip: true,
      grid () {
         if (editor.depth > 0) {
            return [ [ ...editor.parent.children.keys() ] ];
         } else {
            return [ [ ...editor.containers.keys() ] ];
         }
      },
      next () {
         atlas.navigators.of('editorProperty').position.y = 0;
         return 'editorProperty';
      },
      prev () {
         editor.depth--;
         atlas.navigators.of('editorProperty').position.y = CosmosUtils.provide(
            atlas.navigators.of('editorProperty').grid
         )[0].indexOf('objects');
         return 'editorProperty';
      }
   })
      .on('from', function () {
         this.position.y = editor.depth > 0 ? editor.pos.y : editor.pos.x;
      })
      .on('change', function () {
         if (editor.depth > 0) {
            editor.pos.y = this.position.y;
         } else {
            editor.pos.x = this.position.y;
         }
      }),
   editorProperty: new CosmosNavigator({
      grid () {
         if (editor.depth === -1) {
            return [
               [
                  'preload',
                  'background',
                  'neighbors',
                  'region-min',
                  'region-max',
                  'spawn',
                  'music',
                  'gain',
                  'reverb',
                  'filter',
                  'rate',
                  'objects'
               ]
            ];
         } else {
            const meta = editor.target!.object.metadata;
            switch (meta.class) {
               case 'attachment':
                  if (meta.decorator.type === 'sprite') {
                     return [ [ 'position', 'anchor', 'active', 'filters', 'frames', 'steps', 'rotation', 'delete' ] ];
                  } else {
                     return [ [ 'position', 'anchor', 'active', 'filters', 'resources', 'rotation', 'delete' ] ];
                  }
               case 'barrier':
                  return [ [ 'position', 'anchor', 'size', 'rotation', 'delete' ] ];
               case 'interact':
               case 'trigger':
                  return [ [ 'position', 'anchor', 'size', 'name', 'args', 'rotation', 'delete' ] ];
               case 'object':
                  return [ [ 'position', 'filters', 'tags', 'objects', 'rotation', 'delete' ] ];
            }
         }
      },
      next (self) {
         if (editor.depth === -2) {
            if (!editor.waiting) {
               editor.waiting = true;
               param('room', editor.destination);
               teleport(editor.destination).then(() => {
                  editor.generate();
                  renderer.attach('menu', editor.wrapper);
                  editor.depth = -1;
                  editor.waiting = false;
               });
            }
            return;
         }
         const property = self.selection();
         if (property === 'objects') {
            if (editor.depth === -1) {
               editor.depth = 0;
               editor.pos.x = 0;
               return editor.containers.length > 0 ? 'editorObject' : 'editorAdd';
            } else {
               const target = editor.target as OutertaleEditorContainer;
               editor.depth = 1;
               editor.pos.y = 0;
               return target.children.length > 0 ? 'editorObject' : 'editorAdd';
            }
         } else if (property === 'delete') {
            const target = editor.target!;
            if (target.object.metadata.class === 'object') {
               for (const layer of editor.layers) {
                  if (renderer.layers[layer].objects.includes(target.object)) {
                     renderer.detach(layer, target.object);
                     const list = rooms.of(game.room).decorator!.layers![layer]!;
                     list.splice(list.indexOf(target.object.metadata.decorator as any), 1);
                     break;
                  }
               }
               editor.generate();
               editor.write();
               if (editor.containers.length > 0) {
                  editor.pos.x = Math.min(editor.pos.x, editor.containers.length - 1);
                  return 'editorObject';
               } else {
                  editor.depth = -1;
                  atlas.navigators.of('editorProperty').position.y = CosmosUtils.provide(
                     atlas.navigators.of('editorProperty').grid
                  )[0].indexOf('objects');
                  return 'editorProperty';
               }
            } else {
               const parent = editor.parent;
               parent.object.objects.splice(parent.object.objects.indexOf(target.object), 1);
               const collection = parent.object.metadata.decorator;
               for (const key in collection) {
                  if (key !== 'tags' && key !== 'position') {
                     const list = collection[key as keyof typeof collection] as (
                        | OutertaleChildAnimationDecorator
                        | OutertaleSpriteDecorator
                        | OutertaleChildBarrierDecorator
                        | OutertaleChildScriptDecorator
                     )[];
                     if (list.includes(target.object.metadata.decorator)) {
                        list.splice(list.indexOf(target.object.metadata.decorator as any), 1);
                        break;
                     }
                  }
               }
               editor.generate();
               editor.write();
               for (const [ index, other ] of editor.containers.entries()) {
                  if (other.object === parent.object) {
                     editor.pos.x = index;
                     break;
                  }
               }
               if (parent.children.length > 0) {
                  editor.pos.y = Math.min(editor.pos.y, parent.children.length - 1);
                  return 'editorObject';
               } else {
                  editor.depth = 0;
                  atlas.navigators.of('editorProperty').position.y = CosmosUtils.provide(
                     atlas.navigators.of('editorProperty').grid
                  )[0].indexOf('objects');
                  return 'editorProperty';
               }
            }
         } else {
            switch (editor.group) {
               case 'array':
               case 'boolean':
                  editor.index = 0;
                  atlas.navigators.of('editorValue').position.y = 0;
                  break;
               case 'number':
                  editor.index = 1;
                  atlas.navigators.of('editorValue').position.y = 0;
                  break;
               case 'vector':
                  editor.index = 1;
                  atlas.navigators.of('editorValue').position.y = 1;
                  break;
            }
            editor.editTime = renderer.time + 50;
            if (editor.group === 'array' || editor.group === 'string') {
               game.input = false;
            }
            return 'editorValue';
         }
      },
      prev () {
         if (editor.depth === -1) {
            editor.depth = -2;
            renderer.detach('menu', editor.wrapper);
            atlas.navigators.of('editorProperty').setpos();
         } else if (editor.depth !== -2) {
            return 'editorObject';
         }
      }
   }),
   editorValue: new CosmosNavigator<string>({
      grid () {
         switch (editor.group) {
            case 'array':
               if (editor.depth === -1) {
                  return [ ...(editor.room[editor.property as 'preload' | 'neighbors'] || []).keys() ].map(value => [
                     value
                  ]);
               } else {
                  //@ts-expect-error
                  return [ ...editor.target.object.metadata[editor.property].keys() ].map(value => [ value ]);
               }
            case 'boolean':
               return [ [ 0 ], [ 1 ] ];
            case 'number':
               return [ [ 0 ], [ 1 ], [ 2 ] ];
            case 'vector':
               return [
                  [ 0, 1, 2 ],
                  [ 3, 4, 5 ],
                  [ 6, 7, 8 ]
               ];
            default:
               return [ [] ];
         }
      },
      prev: 'editorProperty'
   })
      .on('change', () => {
         if (editor.depth === -1) {
            const room = editor.room;
            const position = atlas.navigators.of('editorValue').position;
            const property = editor.property;
            switch (editor.group) {
               case 'number': {
                  const rate = property === 'rate';
                  if (position.x === 0) {
                     (room.score ??= {})[property as 'gain' | 'reverb' | 'filter' | 'rate'] =
                        Math.round(
                           Math.min(
                              Math.max(
                                 (room.score[property as 'gain' | 'reverb' | 'filter' | 'rate'] ??= [
                                    'gain',
                                    'rate'
                                 ].includes(property)
                                    ? 1
                                    : 0) - (keys.interactKey.active() ? 0.01 : 0.2),
                                 0
                              ),
                              rate ? Infinity : 1
                           ) * 100
                        ) / 100;
                     position.x = 1;
                  } else if (position.x === 2) {
                     (room.score ??= {})[property as 'gain' | 'reverb' | 'filter' | 'rate'] =
                        Math.round(
                           Math.min(
                              Math.max(
                                 (room.score[property as 'gain' | 'reverb' | 'filter' | 'rate'] ??= [
                                    'gain',
                                    'rate'
                                 ].includes(property)
                                    ? 1
                                    : 0) + (keys.interactKey.active() ? 0.01 : 0.2),
                                 0
                              ),
                              rate ? Infinity : 1
                           ) * 100
                        ) / 100;
                     position.x = 1;
                  }
                  editor.write();
                  break;
               }
               case 'vector': {
                  const amount = keys.interactKey.active() ? 20 : 1;
                  if (position.x === 0) {
                     (property === 'spawn'
                        ? (room.spawn ??= { x: 0, y: 0 })
                        : (room.region ??= [
                             { x: 0, y: 0 },
                             { x: 0, y: 0 }
                          ])[property === 'region-min' ? 0 : 1]
                     ).x -= amount;
                     position.x = 1;
                  } else if (position.x === 2) {
                     (property === 'spawn'
                        ? (room.spawn ??= { x: 0, y: 0 })
                        : (room.region ??= [
                             { x: 0, y: 0 },
                             { x: 0, y: 0 }
                          ])[property === 'region-min' ? 0 : 1]
                     ).x += amount;
                     position.x = 1;
                  } else if (position.y === 0) {
                     (property === 'spawn'
                        ? (room.spawn ??= { x: 0, y: 0 })
                        : (room.region ??= [
                             { x: 0, y: 0 },
                             { x: 0, y: 0 }
                          ])[property === 'region-min' ? 0 : 1]
                     ).y -= amount;
                     position.y = 1;
                  } else if (position.y === 2) {
                     (property === 'spawn'
                        ? (room.spawn ??= { x: 0, y: 0 })
                        : (room.region ??= [
                             { x: 0, y: 0 },
                             { x: 0, y: 0 }
                          ])[property === 'region-min' ? 0 : 1]
                     ).y += amount;
                     position.y = 1;
                  }
                  if (property === 'spawn') {
                     const spawn = rooms.of(game.room).spawn;
                     spawn.x = room.spawn?.x;
                     spawn.y = room.spawn?.y;
                  } else {
                     rooms.of(game.room).region = [
                        { x: room.region![0].x, y: room.region![0].y },
                        { x: room.region![1].x, y: room.region![1].y }
                     ];
                     renderer.region = [
                        { x: room.region![0].x, y: room.region![0].y },
                        { x: room.region![1].x, y: room.region![1].y }
                     ];
                  }
                  editor.write();
                  break;
               }
            }
         } else {
            const object = editor.target!.object as any;
            const position = atlas.navigators.of('editorValue').position;
            const property = editor.property;
            switch (editor.group) {
               case 'boolean': {
                  (object.metadata.decorator[property] = object[property] = !object[property])
                     ? object.enable()
                     : object.reset();
                  editor.write();
                  break;
               }
               case 'number': {
                  const prop = object[property];
                  const amount = keys.interactKey.active() ? 15 : 1;
                  if (position.x === 0) {
                     if (prop instanceof CosmosValue) {
                        prop.value -= amount;
                     } else {
                        object[property] -= amount;
                     }
                     position.x = 1;
                  } else if (position.x === 2) {
                     if (prop instanceof CosmosValue) {
                        prop.value += amount;
                     } else {
                        object[property] += amount;
                     }
                     position.x = 1;
                  }
                  object.metadata.decorator[property] = prop instanceof CosmosValue ? prop.value : object[property];
                  editor.write();
                  break;
               }
               case 'vector': {
                  const anchor = property === 'anchor';
                  const amount = (keys.interactKey.active() ? (anchor ? 0.05 : 20) : 1) * (anchor ? -1 : 1);
                  if (position.x === 0) {
                     object[property].x -= amount;
                     position.x = 1;
                  } else if (position.x === 2) {
                     object[property].x += amount;
                     position.x = 1;
                  } else if (position.y === 0) {
                     object[property].y -= amount;
                     position.y = 1;
                  } else if (position.y === 2) {
                     object[property].y += amount;
                     position.y = 1;
                  }
                  object.metadata.decorator[property] = object[property].value();
                  editor.write();
                  break;
               }
            }
         }
      })
      .on('to', () => {
         game.input = true;
      })
});

keys.downKey.on('down', () => atlasInput() && atlas.seek('down'));
keys.interactKey.on('down', () => game.input && atlas.next());
keys.leftKey.on('down', key => atlasInput(key) && atlas.seek('left'));
keys.rightKey.on('down', key => atlasInput(key) && atlas.seek('right'));
keys.specialKey.on('down', () => game.input && atlas.prev());
keys.upKey.on('down', () => atlasInput() && atlas.seek('up'));

keys.downKey.on('down', key => {
   if (!game.input && key === 'ArrowDown') {
      const property = editor.property;
      if (editor.group === 'array') {
         if (editor.depth === -1) {
            const array = editor.room[property as 'preload' | 'neighbors'];
            if (array?.length ?? 0 > 0) {
               array?.splice(editor.index, 1);
               editor.index = Math.min(Math.max(editor.index, 0), (array?.length ?? 0) - 1);
            }
         } else {
            const object = editor.target!.object as CosmosObject;
            const meta = object.metadata as any;
            if (meta.decorator[property]?.length ?? 0 > 0) {
               if (property === 'filters') {
                  object.container.filters?.splice(editor.index, 1);
               } else {
                  meta[property].splice(editor.index, 1);
               }
               meta.decorator[property].splice(editor.index, 1);
               editor.index = Math.min(Math.max(editor.index, 0), Math.max(meta.decorator[property].length - 1, 0));
            }
         }
      }
   }
});

keys.freecamKey.on('down', () => {
   if (game.input) {
      renderer.freecam = !renderer.freecam;
      renderer.zoom.value = 1;
      renderer.position.set(renderer.position.clamp(...renderer.region));
   }
});

keys.upKey.on('down', key => {
   if (!game.input) {
      if (key === 'ArrowUp') {
         const property = editor.property;
         if (editor.group === 'array') {
            if (editor.depth === -1) {
               const room = editor.room;
               (room[property as 'preload' | 'neighbors'] ??= []).push('');
            } else {
               const object = editor.target!.object as any;
               if (property === 'filters') {
                  (object.container.filters ??= []).push(new Filter());
               } else if (property === 'frames') {
                  object.frames.push(null);
               } else {
                  object.metadata[property].push('');
               }
               (object.metadata.decorator[property] ??= []).push('');
            }
         }
      }
   } else if (atlas.target === 'editorObject') {
      atlas.switch('editorAdd');
   }
});

addEventListener('keydown', async event => {
   switch (event.code) {
      case 'F4':
      case 'F11':
         if (backend === null) {
            document.fullscreenElement ? document.exitFullscreen() : document.body.requestFullscreen();
         } else {
            event.preventDefault();
         }
         return;
      case 'F12':
      case 'Backslash':
         backend?.exec('devtools', true) ?? event.preventDefault();
         return;
      case 'KeyR':
         event.preventDefault();
         if (event.ctrlKey) {
            reload();
            return;
         }
         break;
      default:
         event.preventDefault();
         break;
   }
   if (editor.depth === -2) {
      switch (event.key) {
         case 'Backspace':
            editor.destination.length > 0 && (editor.destination = editor.destination.slice(0, -1));
            break;
         default:
            event.key.length === 1 && (editor.destination += event.key);
      }
   } else if (!game.input && editor.editTime <= renderer.time) {
      if (event.key === 'Enter' || event.key === 'Escape') {
         atlas.prev();
         return;
      }
      let value = '';
      const property = editor.property;
      if (editor.depth === -1) {
         const room = editor.room;
         switch (editor.group) {
            case 'array':
               if (room[property as 'preload' | 'neighbors']?.length ?? 0 > 0) {
                  value = room[property as 'preload' | 'neighbors']![editor.index];
               } else {
                  return;
               }
               break;
            case 'string':
               value = room.score?.music ?? '';
               break;
            default:
               return;
         }
      } else {
         const object = editor.target!.object as any;
         switch (editor.group) {
            case 'array':
               if (object.metadata.decorator[property]?.length ?? 0 > 0) {
                  value = object.metadata.decorator[property][editor.index];
               } else {
                  return;
               }
               break;
            case 'string':
               value = object.metadata.decorator[property] || '';
               break;
            default:
               return;
         }
      }
      if (event.key === 'Backspace') {
         value = value.slice(0, -1);
      } else if (event.key.length === 1) {
         value += event.key;
      }
      if (editor.depth === -1) {
         const room = editor.room;
         switch (editor.group) {
            case 'array':
               room[property as 'preload' | 'neighbors']![editor.index] = value;
               editor.write();
               if (property === 'preload') {
                  if (value[0] === '#') {
                     maps.get(value.slice(1))?.load();
                  } else if (value in content) {
                     const resource = content[value as keyof typeof content];
                     resource.load();
                  } else if (value in inventories) {
                     const resource = inventories[value as keyof typeof inventories];
                     resource.load();
                  }
               }
               break;
            case 'string':
               (room.score ??= {}).music = value;
               editor.write();
               break;
         }
      } else {
         const object = editor.target!.object as any;
         switch (editor.group) {
            case 'array':
               if (property === 'filters') {
                  if (value in filters) {
                     object.container.filters[editor.index] = filters[value as keyof typeof filters];
                  }
               } else if (property === 'frames') {
                  if (value in content) {
                     const frame = content[value as keyof typeof content];
                     if (frame instanceof CosmosImage) {
                        frame.load().then(() => {
                           object.frames[editor.index] = frame;
                        });
                     }
                  }
               } else {
                  object.metadata[property][editor.index] = value;
               }
               object.metadata.decorator[property][editor.index] = value;
               editor.write();
               break;
            case 'string':
               if (property === 'resources') {
                  if (value in content) {
                     const resources = content[value as keyof typeof content];
                     if (resources instanceof CosmosAnimationResources) {
                        reload().then(() => {
                           object.resources = resources;
                        });
                     }
                  }
               } else {
                  object.metadata.name = value;
               }
               object.metadata.decorator[property] = value;
               editor.write();
               break;
         }
      }
   }
});

addEventListener('resize', () => {
   game.resize();
});

renderer.wrapper!.addEventListener('mousedown', event => {
   if (!dragger.state) {
      dragger.origin.x = renderer.position.x;
      dragger.origin.y = renderer.position.y;
      dragger.state = true;
      dragger.offset.x = event.offsetX;
      dragger.offset.y = event.offsetY;
   }
});

renderer.wrapper!.addEventListener('mousemove', event => {
   if (dragger.state) {
      const zoom = renderer.scale.multiply(renderer.zoom.value);
      const position = new CosmosPoint(
         dragger.origin.x + (dragger.offset.x - event.offsetX) / zoom.x,
         dragger.origin.y + (dragger.offset.y - event.offsetY) / zoom.y
      );
      renderer.position.set(renderer.freecam ? position : position.clamp(...renderer.region));
   }
});

renderer.wrapper!.addEventListener('mouseup', () => {
   dragger.state = false;
});

renderer.wrapper!.addEventListener(
   'wheel',
   event => {
      if (renderer.freecam) {
         if (event.deltaY < 0) {
            renderer.zoom.value *= zoomFactor;
         } else {
            renderer.zoom.value /= zoomFactor;
         }
      }
   },
   { passive: true }
);

(async () => {
   params.has('xxx') && param('xxx');
   game.resize();
   document.querySelector('#splash')!.remove();
   await Promise.all([ fontLoader, content.ieSplashBackground.load() ]);
   await teleport(editor.destination);
   renderer.attach('base', new CosmosSprite({ frames: [ content.ieSplashBackground ], tint: 0x7f7f7f, scale: 0.5 }));
   editor.generate();
   atlas.switch('editorProperty');
   renderer.attach('menu', editor.wrapper, editor.text);
})();
