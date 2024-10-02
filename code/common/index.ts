import './bootstrap';

import { AlphaFilter, BLEND_MODES, Filter, Graphics, isMobile } from 'pixi.js';
import text from '../../languages/default/text/common';
import systemsText from '../../languages/default/text/systems';
import {
   content,
   context,
   filters,
   inventories,
   music,
   musicRegistry,
   shaders,
   soundMixer,
   sounds,
   tints
} from '../systems/assets';
import {
   atlas,
   events,
   game,
   init,
   launch,
   maps,
   reload,
   renderer,
   rng,
   rooms,
   spawn,
   speech,
   typer
} from '../systems/core';
import {
   antiAteThreshold,
   antifreeze,
   ateThreshold,
   battler,
   character,
   choicer,
   credits,
   dialogue,
   dialogue_primitive,
   directionalInput,
   disengageDelay,
   engageDelay,
   fader,
   fastAssets,
   frontEnder,
   hashes,
   heal,
   instance,
   instances,
   keepActive,
   mobile,
   notifier,
   player,
   postSIGMA,
   quickresume,
   rand_rad,
   saver,
   sineWaver,
   splash,
   teleport,
   teleporter,
   temporary,
   tracker,
   trivia,
   ultimaFacer,
   ultraPosition,
   updateArmor,
   world
} from '../systems/framework';
import { OutertaleGroup, OutertaleLayerKey, OutertaleRoom } from '../systems/outertale';
import { SAVE } from '../systems/save';
import {
   CosmosAnimation,
   CosmosAsset,
   CosmosCharacter,
   CosmosDaemon,
   CosmosDirection,
   CosmosHitbox,
   CosmosInstance,
   CosmosInventory,
   CosmosKeyed,
   CosmosMath,
   CosmosObject,
   CosmosRectangle,
   CosmosRenderer,
   CosmosSprite,
   CosmosText,
   CosmosUtils,
   CosmosValue
} from '../systems/storyteller';
import groups from './groups';

export const asrielinter = new Proxy(
   { '': null as CosmosKeyed<number> | null },
   {
      get: (t, k) => {
         if (typeof k === 'string') {
            t[''] ??= CosmosUtils.parse(SAVE.data.s.asrielinter, {});
            return t[''][k] ?? 0;
         }
      },
      set: (t, k, v) => {
         if (typeof k === 'string') {
            t[''] ??= CosmosUtils.parse(SAVE.data.s.asrielinter, {});
            t[''][k] = v;
            SAVE.data.s.asrielinter = CosmosUtils.serialize(t['']);
            return true;
         } else {
            return false;
         }
      }
   }
) as CosmosKeyed<number> & { '': CosmosKeyed<number> };

export const stableRooms = [
   'c_archive_start',
   'c_archive_path1',
   'c_archive_path2',
   'c_archive_path3',
   'c_archive_path4',
   'c_archive_path5',
   'c_archive_path6',
   'c_archive_exit'
];

export const characters = (() => {
   const finalghost = (() => {
      return {
         down: new CosmosSprite({
            anchor: { x: 0, y: 1 },
            frames: [ content.iocNapstablookDownAlter ],
            metadata: { time: 0 }
         }).on('tick', function () {
            this.position.y = CosmosMath.wave(((this.metadata.time += CosmosMath.FRAME) % 4000) / 4000) * -2;
         }),
         left: new CosmosSprite({
            anchor: { x: 0, y: 1 },
            frames: [ content.iocNapstablookLeftAlter ],
            metadata: { time: 0 }
         }).on('tick', function () {
            this.position.y = CosmosMath.wave(((this.metadata.time += CosmosMath.FRAME) % 4000) / 4000) * -2;
         }),
         right: new CosmosSprite({
            anchor: { x: 0, y: 1 },
            frames: [ content.iocNapstablookRightAlter ],
            metadata: { time: 0 }
         }).on('tick', function () {
            this.position.y = CosmosMath.wave(((this.metadata.time += CosmosMath.FRAME) % 4000) / 4000) * -2;
         }),
         up: new CosmosSprite({
            anchor: { x: 0, y: 1 },
            frames: [ content.iocNapstablookUpAlter ],
            metadata: { time: 0 }
         }).on('tick', function () {
            this.position.y = CosmosMath.wave(((this.metadata.time += CosmosMath.FRAME) % 4000) / 4000) * -2;
         })
      };
   })();

   const napstablook = (() => {
      return {
         down: new CosmosSprite({
            anchor: { x: 0, y: 1 },
            frames: [ content.iocNapstablookDown ],
            metadata: { time: 0 }
         }).on('tick', function () {
            this.position.y = CosmosMath.wave(((this.metadata.time += CosmosMath.FRAME) % 4000) / 4000) * -2;
         }),
         left: new CosmosSprite({
            anchor: { x: 0, y: 1 },
            frames: [ content.iocNapstablookLeft ],
            metadata: { time: 0 }
         }).on('tick', function () {
            this.position.y = CosmosMath.wave(((this.metadata.time += CosmosMath.FRAME) % 4000) / 4000) * -2;
         }),
         right: new CosmosSprite({
            anchor: { x: 0, y: 1 },
            frames: [ content.iocNapstablookRight ],
            metadata: { time: 0 }
         }).on('tick', function () {
            this.position.y = CosmosMath.wave(((this.metadata.time += CosmosMath.FRAME) % 4000) / 4000) * -2;
         }),
         up: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocNapstablookUp ], metadata: { time: 0 } }).on(
            'tick',
            function () {
               this.position.y = CosmosMath.wave(((this.metadata.time += CosmosMath.FRAME) % 4000) / 4000) * -2;
            }
         )
      };
   })();

   const nobody = {
      down: new CosmosSprite(),
      left: new CosmosSprite(),
      right: new CosmosSprite(),
      up: new CosmosSprite()
   };

   const papyrusSpecial = {
      down: new CosmosAnimation({ active: true, anchor: { x: 0, y: 1 }, resources: content.iocPapyrusStomp }),
      left: new CosmosAnimation({ active: true, anchor: { x: 0, y: 1 }, resources: content.iocPapyrusCape }),
      right: new CosmosAnimation({ active: true, anchor: { x: 0, y: 1 }, resources: content.iocPapyrusCakeStarp }),
      up: new CosmosSprite()
   };

   const sansSpecial = {
      down: new CosmosSprite({ active: true, anchor: { x: 0, y: 1 }, frames: [ content.iocSansWink ] }),
      left: new CosmosSprite(),
      right: new CosmosSprite(),
      up: new CosmosSprite({ active: true, anchor: { x: 0, y: 1 }, frames: [ content.iocSansShrug ] })
   };

   const torielHandhold = {
      down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocTorielDownHandhold }),
      left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocTorielLeftHandhold }),
      right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocTorielRightHandhold }),
      up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocTorielUpHandhold })
   };

   const undyneArmorJetpack = {
      down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneDownArmor }).on(
         'tick',
         keepActive
      ),
      left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneLeftArmorJetpack }).on(
         'tick',
         keepActive
      ),
      right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneRightArmorJetpack }).on(
         'tick',
         keepActive
      ),
      up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneUpArmorJetpack }).on(
         'tick',
         keepActive
      )
   };

   const undyneDateSpecial = {
      down: new CosmosAnimation({ active: true, anchor: { x: 0, y: 1 }, resources: content.iocUndyneDateNamaste }),
      left: new CosmosAnimation({ active: true, anchor: { x: 0, y: 1 }, resources: content.iocUndyneDateFlex }),
      right: new CosmosAnimation({ active: true, anchor: { x: 0, y: 1 }, resources: content.iocUndyneDateThrowTalk }),
      up: new CosmosAnimation({ active: true, anchor: { x: 0, y: 1 }, resources: content.iocUndyneDateSit })
   };

   const mettaton1 = {
      down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocMettatonMicrophone }), // z00
      left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocMettatonWave }), // z01
      right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocMettatonLaugh }), // z02
      up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocMettatonPoint }) // z03
   };

   const mettaton2 = {
      down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocMettatonClap }), // z10
      left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocMettatonRollLeft }), // z11
      right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocMettatonRollRight }), // z12
      up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocMettatonPointthree }) // z13
   };

   const mettaton3 = {
      down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocMettatonText }), // z20
      left: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocMettatonDotdotdot ] }), // z21
      right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocMettatonConfused }), // z22
      up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocMettatonOmg }) // z23
   };

   const mettaton4 = {
      down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocMettatonShrug }), // z30
      left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocMettatonBackhands }), // z31
      right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocMettatonRollup2 }), // z32
      up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocMettatonRollup1 }) // z33
   };

   return {
      mettaton1C: { talk: mettaton1, walk: mettaton1 },
      mettaton2C: { talk: mettaton2, walk: mettaton2 },
      mettaton3C: { talk: mettaton3, walk: mettaton3 },
      mettaton4C: { talk: mettaton4, walk: mettaton4 },
      alphys: {
         talk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAlphysDownTalk }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAlphysLeftTalk }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAlphysRightTalk }),
            up: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocAlphysUpTalk ] })
         },
         walk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAlphysDown }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAlphysLeft }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAlphysRight }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAlphysUp })
         }
      },
      alphysSad: {
         talk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAlphysDownSadTalk }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAlphysLeftSadTalk }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAlphysRightSadTalk }),
            up: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocAlphysUpTalk ] })
         },
         walk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAlphysDownSad }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAlphysLeftSad }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAlphysRightSad }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAlphysUp })
         }
      },
      asgore: {
         talk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAsgoreDownTalk }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAsgoreLeftTalk }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAsgoreRightTalk }),
            up: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocAsgoreUpTalk ] })
         },
         walk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAsgoreDown, extrapolate: false }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAsgoreLeft, extrapolate: false }),
            right: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocAsgoreRight,
               extrapolate: false
            }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAsgoreUp, extrapolate: false })
         }
      },
      asgoreHappy: {
         talk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAsgoreDownTalkHappy }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAsgoreLeftTalkHappy }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAsgoreRightTalkHappy }),
            up: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocAsgoreUpTalk ] })
         },
         walk: {
            down: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocAsgoreDownHappy,
               extrapolate: false
            }),
            left: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocAsgoreLeftHappy,
               extrapolate: false
            }),
            right: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocAsgoreRightHappy,
               extrapolate: false
            }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAsgoreUp, extrapolate: false })
         }
      },
      asriel: {
         talk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAsrielDownTalk }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAsrielLeftTalk }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAsrielRightTalk }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAsrielUpTalk })
         },
         walk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAsrielDown, extrapolate: false }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAsrielLeft, extrapolate: false }),
            right: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocAsrielRight,
               extrapolate: false
            }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAsrielUp, extrapolate: false })
         }
      },
      asrielTrue: {
         talk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAsrielTrueDownTalk }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAsrielTrueLeftTalk }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAsrielTrueRightTalk }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAsrielUpTalk })
         },
         walk: {
            down: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocAsrielTrueDown,
               extrapolate: false
            }),
            left: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocAsrielTrueLeft,
               extrapolate: false
            }),
            right: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocAsrielTrueRight,
               extrapolate: false
            }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAsrielUp, extrapolate: false })
         }
      },
      asrielTrueHome: {
         talk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAsrielTrueDownHomeTalk }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAsrielTrueLeftHomeTalk }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAsrielTrueRightHomeTalk }),
            up: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocAsrielUpHome ] })
         },
         walk: {
            down: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocAsrielTrueDownHome ] }),
            left: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocAsrielTrueLeftHome ] }),
            right: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocAsrielTrueRightHome ] }),
            up: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocAsrielUpHome ] })
         }
      },
      asrielTrueSad: {
         talk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAsrielTrueDownTalkSad }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAsrielTrueLeftSadTalk }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAsrielTrueRightSadTalk }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocAsrielUpTalk })
         },
         walk: {
            down: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocAsrielTrueDownSad,
               extrapolate: false
            }),
            left: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocAsrielTrueLeftSad,
               extrapolate: false
            }),
            right: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocAsrielTrueRightSad,
               extrapolate: false
            }),
            up: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocAsrielUp,
               extrapolate: false
            })
         }
      },
      finalghost: { talk: finalghost, walk: finalghost },
      kidd: {
         talk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocKiddDownTalk }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocKiddLeftTalk }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocKiddRightTalk }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocKiddUpTalk })
         },
         walk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocKiddDown, extrapolate: false }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocKiddLeft, extrapolate: false }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocKiddRight, extrapolate: false }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocKiddUp, extrapolate: false })
         }
      },
      kiddSad: {
         talk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocKiddDownTalkSad }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocKiddLeftTalkSad }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocKiddRightTalkSad }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocKiddUpTalk })
         },
         walk: {
            down: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocKiddDownSad,
               extrapolate: false
            }),
            left: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocKiddLeftSad,
               extrapolate: false
            }),
            right: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocKiddRightSad,
               extrapolate: false
            }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocKiddUp, extrapolate: false })
         }
      },
      kiddSlave: {
         talk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocKiddDownTalkSlave }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocKiddLeftTalkSlave }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocKiddRightTalkSlave }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocKiddUpTalk })
         },
         walk: {
            down: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocKiddDownSlave,
               extrapolate: false
            }),
            left: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocKiddLeftSlave,
               extrapolate: false
            }),
            right: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocKiddRightSlave,
               extrapolate: false
            }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocKiddUp, extrapolate: false })
         }
      },
      napstablook: { talk: napstablook, walk: napstablook },
      none: { talk: nobody, walk: nobody },
      papyrus: {
         talk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocPapyrusDownTalk }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocPapyrusLeftTalk }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocPapyrusRightTalk }),
            up: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocPapyrusUpTalk ] })
         },
         walk: {
            down: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocPapyrusDown,
               extrapolate: false
            }),
            left: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocPapyrusLeft,
               extrapolate: false
            }),
            right: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocPapyrusRight,
               extrapolate: false
            }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocPapyrusUp, extrapolate: false })
         }
      },
      papyrusMad: {
         talk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocPapyrusDownMadTalk }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocPapyrusLeftMadTalk }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocPapyrusRightMadTalk }),
            up: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocPapyrusUpTalk ] })
         },
         walk: {
            down: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocPapyrusDownMad,
               extrapolate: false
            }),
            left: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocPapyrusLeftMad,
               extrapolate: false
            }),
            right: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocPapyrusRightMad,
               extrapolate: false
            }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocPapyrusUp, extrapolate: false })
         }
      },
      papyrusSpecial: { talk: papyrusSpecial, walk: papyrusSpecial },
      papyrusStark: {
         talk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocPapyrusDoknStarwTalk }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocPapyrusLektStarfTalk }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocPapyrusRikhtStargTalk }),
            up: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocPapyrusUpTalk ] })
         },
         walk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocPapyrusDoknStarw }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocPapyrusLektStarf }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocPapyrusRikhtStarg }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocPapyrusUp })
         }
      },
      sans: {
         talk: {
            down: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocSansDownTalk ] }),
            left: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocSansLeftTalk ] }),
            right: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocSansRightTalk ] }),
            up: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocSansUpTalk ] })
         },
         walk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocSansDown, extrapolate: false }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocSansLeft, extrapolate: false }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocSansRight, extrapolate: false }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocSansUp, extrapolate: false })
         }
      },
      sansSpecial: { talk: sansSpecial, walk: sansSpecial },
      sansTomato: {
         talk: {
            down: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocSansDownTalk ] }),
            left: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocSansLeftTalk ] }),
            right: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocSansRightTalk ] }),
            up: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocSansUpTalk ] })
         },
         walk: {
            down: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocSansDownTomato,
               extrapolate: false
            }),
            left: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocSansLeftTomato,
               extrapolate: false
            }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocSansRight, extrapolate: false }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocSansUp, extrapolate: false })
         }
      },
      tem: {
         talk: {
            down: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocTemmieRightTalk,
               objects: [
                  new CosmosSprite({
                     frames: [ content.iocTemmieSkolarships ],
                     anchor: { x: 0, y: 1 },
                     position: { y: -21 }
                  }).on('tick', function () {
                     this.alpha.value = SAVE.data.b.colleg ? 1 : 0;
                  })
               ]
            }),
            left: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocTemmieLeftTalk,
               objects: [
                  new CosmosSprite({
                     frames: [ content.iocTemmieSkolarships ],
                     anchor: { x: 0, y: 1 },
                     position: { y: -21 }
                  }).on('tick', function () {
                     this.alpha.value = SAVE.data.b.colleg ? 1 : 0;
                  })
               ]
            }),
            right: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocTemmieRightTalk,
               objects: [
                  new CosmosSprite({
                     frames: [ content.iocTemmieSkolarships ],
                     anchor: { x: 0, y: 1 },
                     position: { y: -21 }
                  }).on('tick', function () {
                     this.alpha.value = SAVE.data.b.colleg ? 1 : 0;
                  })
               ]
            }),
            up: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocTemmieLeftTalk,
               objects: [
                  new CosmosSprite({
                     frames: [ content.iocTemmieSkolarships ],
                     anchor: { x: 0, y: 1 },
                     position: { y: -21 }
                  }).on('tick', function () {
                     this.alpha.value = SAVE.data.b.colleg ? 1 : 0;
                  })
               ]
            })
         },
         walk: {
            down: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocTemmieRight,
               objects: [
                  new CosmosSprite({
                     frames: [ content.iocTemmieSkolarships ],
                     anchor: { x: 0, y: 1 },
                     position: { y: -21 }
                  }).on('tick', function () {
                     this.alpha.value = SAVE.data.b.colleg ? 1 : 0;
                  })
               ]
            }),
            left: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocTemmieLeft,
               objects: [
                  new CosmosSprite({
                     frames: [ content.iocTemmieSkolarships ],
                     anchor: { x: 0, y: 1 },
                     position: { y: -21 }
                  }).on('tick', function () {
                     this.alpha.value = SAVE.data.b.colleg ? 1 : 0;
                  })
               ]
            }),
            right: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocTemmieRight,
               objects: [
                  new CosmosSprite({
                     frames: [ content.iocTemmieSkolarships ],
                     anchor: { x: 0, y: 1 },
                     position: { y: -21 }
                  }).on('tick', function () {
                     this.alpha.value = SAVE.data.b.colleg ? 1 : 0;
                  })
               ]
            }),
            up: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocTemmieLeft,
               objects: [
                  new CosmosSprite({
                     frames: [ content.iocTemmieSkolarships ],
                     anchor: { x: 0, y: 1 },
                     position: { y: -21 }
                  }).on('tick', function () {
                     this.alpha.value = SAVE.data.b.colleg ? 1 : 0;
                  })
               ]
            })
         }
      },
      toriel: {
         talk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocTorielDownTalk }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocTorielLeftTalk }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocTorielRightTalk }),
            up: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocTorielUpTalk ], crop: { right: -25 } })
         },
         walk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocTorielDown }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocTorielLeft }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocTorielRight }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocTorielUp })
         }
      },
      torielHandhold: { talk: torielHandhold, walk: torielHandhold },
      torielSpecial: {
         talk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocTorielPhoneTalk }),
            left: new CosmosSprite(),
            right: new CosmosSprite(),
            up: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocTorielMad ] })
         },
         walk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocTorielPhone }),
            left: new CosmosSprite(),
            right: new CosmosSprite(),
            up: new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.iocTorielMad ] })
         }
      },
      undyne: {
         talk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneDownTalk }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneLeftTalk }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneRightTalk }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneUpTalk })
         },
         walk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneDown }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneLeft }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneRight }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneUp })
         }
      },
      undyneArmor: {
         idle: true,
         talk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneDownArmor }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneLeftArmor }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneRightArmor }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneUpArmor })
         },
         walk: {
            down: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocUndyneDownArmorWalk,
               extrapolate: false
            }),
            left: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocUndyneLeftArmorWalk,
               extrapolate: false
            }),
            right: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocUndyneRightArmorWalk,
               extrapolate: false
            }),
            up: new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.iocUndyneUpArmorWalk,
               extrapolate: false
            })
         }
      },
      undyneArmorJetpack: { talk: undyneArmorJetpack, walk: undyneArmorJetpack },
      undyneDate: {
         talk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneDownDateTalk }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneLeftDateTalk }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneRightDateTalk }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneUpDateTalk })
         },
         walk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneDownDate }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneLeftDate }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneRightDate }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneUpDate })
         }
      },
      undyneDateSpecial: { talk: undyneDateSpecial, walk: undyneDateSpecial },
      undyneStoic: {
         talk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneDownStoicTalk }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneLeftStoicTalk }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneRightStoicTalk }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneUpTalk })
         },
         walk: {
            down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneDownStoic }),
            left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneLeftStoic }),
            right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneRightStoic }),
            up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocUndyneUp })
         }
      }
   };
})();

export const goatbro = new CosmosCharacter({
   preset: characters.asriel,
   key: 'asriel2',
   metadata: {
      name: void 0 as string | void,
      args: void 0 as string[] | void,
      barrier: void 0 as boolean | void,
      interact: void 0 as boolean | void,
      override: false,
      static: false,
      move: 0
   }
}).on('tick', function () {
   const roomMeta = rooms.of(game.room).metadata;
   if (roomMeta.dark03) {
      this.tint = world.genocide || SAVE.data.b.svr || postSIGMA() ? tints.dark03 : void 0;
   } else if (roomMeta.dark02) {
      this.tint = tints.dark02;
   } else if (roomMeta.dark01) {
      this.tint = tints.dark01;
   } else if (game.room === 'c_courtroom') {
      this.tint = 0;
   } else {
      this.tint = void 0;
   }
   if (this.metadata.override) {
      this.metadata.move = 0;
      return;
   }
   if (player.metadata.moved) {
      this.metadata.move < 4 && this.metadata.move++;
   } else {
      this.metadata.move > 0 && this.metadata.move--;
   }
   const animate = !this.talk && !this.metadata.static;
   const [ face, to ] = tracker.interpolate(7 + this.metadata.move);
   if (this.position.x !== to.x || this.position.y !== to.y) {
      this.position.set(to);
      this.face = face;
      if (animate) {
         for (const sprite of Object.values(this.sprites)) {
            sprite.duration = 5;
         }
         this.sprite.enable();
      }
   } else if (animate) {
      this.sprite.reset();
   }
});

export const goatbroTrue = new CosmosCharacter({
   preset: characters.asrielTrue,
   key: 'asriel1',
   anchor: 0,
   size: { x: 20, y: 10 },
   metadata: {
      name: void 0 as string | void,
      args: void 0 as string[] | void,
      barrier: void 0 as boolean | void,
      interact: void 0 as boolean | void,
      override: false,
      static: false,
      move: 0
   }
}).on('tick', function () {
   const roomMeta = rooms.of(game.room).metadata;
   if (roomMeta.dark03) {
      this.tint = tints.dark03;
   } else if (roomMeta.dark02) {
      this.tint = tints.dark02;
   } else if (roomMeta.dark01) {
      this.tint = tints.dark01;
   } else if (game.room === 'c_courtroom') {
      this.tint = 0;
   } else if (game.room !== 'f_view') {
      this.tint = void 0;
   }
   if (this.metadata.override) {
      this.metadata.move = 0;
      return;
   }
   if (player.metadata.moved) {
      this.metadata.move < 4 && this.metadata.move++;
   } else {
      this.metadata.move > 0 && this.metadata.move--;
   }
   const animate = !this.talk && !this.metadata.static;
   const [ face, to ] = tracker.interpolate(7 + this.metadata.move);
   if (this.position.x !== to.x || this.position.y !== to.y) {
      this.position.set(to);
      this.face = face;
      if (animate) {
         for (const sprite of Object.values(this.sprites)) {
            sprite.duration = 5;
         }
         this.sprite.enable();
      }
   } else if (animate) {
      this.sprite.reset();
   }
});

export const frisk = {
   down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocFriskDown }),
   left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocFriskLeft }),
   right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocFriskRight }),
   up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocFriskUp })
};

export const friskWater = {
   down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocFriskDownWater }),
   left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocFriskLeftWater }),
   right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocFriskRightWater }),
   up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocFriskUpWater })
};

export const friskArchive = {
   down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocFriskDownArchive }),
   left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocFriskLeftArchive }),
   right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocFriskRightArchive }),
   up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocFriskUpArchive })
};

export const friskWaterArchive = {
   down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocFriskDownWaterArchive }),
   left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocFriskLeftWaterArchive }),
   right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocFriskRightWaterArchive }),
   up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocFriskUpWaterArchive })
};

export const friskHome = {
   down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocFriskDownHome }),
   left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocFriskLeftHome }),
   right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocFriskRightHome }),
   up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocFriskUpHome })
};

export const friskChara = {
   down: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocFriskDownCharaFake }),
   left: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocFriskLeftCharaFake }),
   right: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocFriskRightCharaFake }),
   up: new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.iocFriskUpCharaFake })
};

export const friskMirror = {
   right: content.iocFriskRightMirror,
   left: content.iocFriskLeftMirror,
   up: content.iocFriskUpMirror,
   down: content.iocFriskDownMirror
};

export const friskMirrorWater = {
   right: content.iocFriskRightMirrorWater,
   left: content.iocFriskLeftMirrorWater,
   up: content.iocFriskUpMirrorWater,
   down: content.iocFriskDownMirrorWater
};

export const friskMirrorHome = {
   right: content.iocFriskRightMirrorHome,
   left: content.iocFriskLeftMirrorHome,
   up: content.iocFriskUpMirrorHome,
   down: content.iocFriskDownMirrorHome
};

export const basic = new CosmosObject({
   blend: BLEND_MODES.ADD,
   metadata: {
      time: 0,
      graphics: new Graphics(),
      par: [ 0, 1, 2, 3, 4, 3, 2, 1 ] as number[],
      collections: [ [], [], [], [], [] ] as number[][][],
      positions: (() => {
         const rand0 = rand_rad();
         return CosmosUtils.populate(120, () =>
            CosmosUtils.populate(3, () => [ rand0.int(640) / 2, rand0.int(480) / 2 ])
         );
      })()
   }
}).on('tick', function () {
   if (!CosmosRenderer.fancy) {
      this.alpha.value = 0;
      return;
   }
   this.alpha.value = 1;
   const graphics = this.metadata.graphics;
   graphics.clear();
   const time = Math.floor(this.metadata.time);
   (this.metadata.time += 0.25) === 120 && (this.metadata.time = 0);
   let index = 0;
   const collections = this.metadata.collections;
   for (const collection of collections) {
      collection.splice(0);
   }
   while (index < 120) {
      collections[this.metadata.par[Math.floor(((time + index) % 40) / 5)]].push(
         this.metadata.positions[index][Math.floor((time + index) / 40) % 3]
      );
      index++;
   }
   index = 0;
   for (const collection of collections) {
      graphics.beginFill(0xbfbfff, 0.9 / (1 / 0.4) ** (4 - index));
      if (index === 0) {
         for (const position of collections[4]) {
            graphics.drawRect(position[0] - 4, position[1], 8.5, 0.5);
            graphics.drawRect(position[0], position[1] - 4, 0.5, 8.5);
         }
      } else if (index === 1) {
         for (const position of collections[4]) {
            graphics.drawRect(position[0] - 2, position[1], 4.5, 0.5);
            graphics.drawRect(position[0], position[1] - 2, 0.5, 4.5);
         }
      }
      for (const position of collection) {
         graphics.drawRect(position[0], position[1], 0.5, 0.5);
      }
      graphics.endFill();
      index++;
   }
});

basic.container.addChild(basic.metadata.graphics);

export const blue = new CosmosAnimation({
   anchor: 0,
   alpha: 0.5,
   blend: BLEND_MODES.ADD,
   position: { x: 160, y: 120 },
   resources: content.ibBlue,
   tint: 0x5f5f5f
});

export const galaxy = new CosmosAnimation({
   scale: 0.5,
   alpha: 0.2,
   blend: BLEND_MODES.ADD,
   resources: content.ibGalaxy
});

export const grey = new CosmosAnimation({
   anchor: 0,
   position: { x: 160, y: 120 },
   resources: content.ibGrey,
   tint: 0x9f9f9f
});

export const lazyLoader = events.on('titled').then(async () => {
   await (launch.overworld && inventories.lazyAssets.load());
});

export const menuLoader = events.on('titled').then(async () => {
   await (launch.intro && inventories.menuAssets.load());
});

export const kiddo = new CosmosCharacter({
   preset: characters.kidd,
   key: 'kidd',
   anchor: 0,
   size: { x: 20, y: 10 },
   metadata: {
      name: void 0 as string | void,
      args: void 0 as string[] | void,
      barrier: void 0 as boolean | void,
      interact: void 0 as boolean | void,
      holdover: false,
      override: false,
      static: false,
      move: 0
   }
}).on('tick', function () {
   if (world.genocide && SAVE.data.n.plot > 42) {
      this.preset = characters.kiddSlave;
   } else if (SAVE.data.n.state_foundry_muffet === 1 && SAVE.data.n.plot > 38.01 && !kiddo.metadata.holdover) {
      this.preset = characters.kiddSad;
   } else {
      this.preset = characters.kidd;
   }
   const roomMeta = rooms.of(game.room).metadata;
   if (roomMeta.dark03) {
      this.tint = world.genocide || SAVE.data.b.svr || postSIGMA() ? tints.dark03 : void 0;
   } else if (roomMeta.dark02) {
      this.tint = tints.dark02;
   } else if (roomMeta.dark01) {
      this.tint = tints.dark01;
   } else if (game.room === '_void') {
      this.alpha.value = this.metadata.override ? 0 : 1;
   } else if (game.room !== 'f_view') {
      this.tint = void 0;
   }
   if (this.metadata.override) {
      this.metadata.move = 0;
      return;
   }
   if (player.metadata.moved) {
      this.metadata.move < (world.goatbro ? 8 : 4) && this.metadata.move++;
   } else {
      this.metadata.move > 0 && this.metadata.move--;
   }
   const animate = !this.talk && !this.metadata.static;
   const [ face, to ] = tracker.interpolate((world.goatbro ? 14 : 7) + this.metadata.move);
   if (this.position.x !== to.x || this.position.y !== to.y) {
      this.position.set(to);
      this.face = face;
      if (animate) {
         for (const sprite of Object.values(this.sprites)) {
            sprite.duration = 5;
         }
         this.sprite.enable();
      }
   } else if (animate) {
      this.sprite.reset();
   }
});

export const musicOverrides = [
   [ 'muscle', null ],
   [ 'factory', 'factoryEmpty' ],
   [ 'starton', 'startonEmpty' ],
   [ 'startonTown', 'startonTownEmpty' ],
   [ 'factoryquiet', 'factoryquietEmpty' ],
   [ 'aerialis', 'aerialisEmpty' ],
   [ 'mall', 'youscreweduppal' ],
   [ 'CORE', 'youscreweduppal' ]
] as [keyof typeof music | null, keyof typeof music | null][];

export const erndyne = new CosmosCharacter({
   preset: characters.undyne,
   key: 'undyne',
   metadata: {
      override: false,
      static: false,
      move: 50,
      tick: 0,
      chaser: null as CosmosInstance | null,
      notifier: new CosmosAnimation({
         anchor: { x: 0, y: 1 },
         resources: content.ibuNotify
      }).on('pre-render', async function () {
         this.position.set(renderer.projection(erndyne.position.subtract(0, 51)));
      })
   }
}).on('tick', function () {
   if (SAVE.data.n.state_starton_papyrus === 1) {
      this.preset = characters.undyneStoic;
   } else {
      this.preset = characters.undyne;
   }
   const roomMeta = rooms.of(game.room).metadata;
   if (roomMeta.dark03) {
      this.tint = world.genocide || SAVE.data.b.svr || postSIGMA() ? tints.dark03 : void 0;
   } else if (roomMeta.dark02) {
      this.tint = tints.dark02;
   } else if (roomMeta.dark01) {
      this.tint = tints.dark01;
   } else {
      this.tint = void 0;
   }
   if (this.metadata.override) {
      return;
   }
   const alert = this.metadata.tick++;
   switch (alert) {
      case 0:
         this.metadata.move = 0;
         break;
      case 10:
         sounds.notify.instance(renderer);
         renderer.attach('menu', this.metadata.notifier);
         break;
      case 20:
         renderer.detach('menu', this.metadata.notifier);
         this.metadata.chaser ??= music.undynefast.instance(renderer);
         if (game.room === 'f_napstablook' && SAVE.data.n.state_foundry_blookmusic !== 0) {
            this.metadata.chaser.gain.value = 0;
         }
         break;
   }
   if (alert < 20) {
      if (player.metadata.moved) {
         this.metadata.move < 60 && this.metadata.move++;
      }
      return;
   }
   if (game.movement) {
      this.metadata.move > 0 && (this.metadata.move -= 0.25 + (player.metadata.moved ? 0 : 1));
      this.metadata.move < 0 && (this.metadata.move = 0);
   }
   const animate = !this.talk && !this.metadata.static;
   const to = tracker.interpolate(7 + this.metadata.move)[1];
   this.face = ultimaFacer(this);
   if (this.position.x !== to.x || this.position.y !== to.y) {
      this.position.set(to);
      if (animate) {
         for (const sprite of Object.values(this.sprites)) {
            sprite.duration = 5;
         }
         this.sprite.enable();
         if (this.sprite.index % 2 === 1 && this.sprite.step === 0) {
            sounds.stomp.instance(renderer);
         }
      }
   } else if (animate) {
      this.sprite.reset();
   }
});

export const oversaver = {
   base_attack: 0,
   base_battle: 0,
   base_dialogue: 0,
   base_overworld: 0,
   base_pattern: 0,
   primed: false,
   room: '',
   save () {
      if (oversaver.primed) {
         oversaver.primed = false;
         oversaver.state.n ??= {};
         oversaver.state.n.base_attack = oversaver.base_attack;
         oversaver.state.n.base_battle = oversaver.base_battle;
         oversaver.state.n.base_dialogue = oversaver.base_dialogue;
         oversaver.state.n.base_overworld = oversaver.base_overworld;
         oversaver.state.n.base_pattern = oversaver.base_pattern;
         oversaver.state.s ??= {};
         oversaver.state.s.room = oversaver.room;
         SAVE.save(oversaver.state);
      }
   },
   state: {} as CosmosKeyed
};

export const queue = {
   assets: [] as CosmosAsset[],
   load () {
      return Promise.all([
         lazyLoader,
         ...fastAssets().map(asset => asset.load()),
         ...queue.assets.map(asset => asset.load())
      ]);
   }
};

export const queueLoader = events.on('loaded').then(async () => {
   updateMusic();
   await (launch.overworld && queue.load());
});

export function epilogueOverride (c: boolean) {
   return c && SAVE.data.n.plot !== 72;
}

export async function bullyEnding () {
   if (!SAVE.flag.b.bully_sleep) {
      inventories.splashAssets.load();
      const reu = music.reunited.instances[0] as CosmosInstance | void;
      await Promise.all([ content.amEndofdays.load(), renderer.pause(4000), reu?.gain.modulate(renderer, 2000, 0) ]);
      const endofdays = music.endofdays.instance(renderer);
      endofdays.gain.value /= 10;
      endofdays.gain.modulate(renderer, 4000, endofdays.gain.value * 10);
      for (const lines of text.a_common.bullybed) {
         await dialogue('dialoguerBottom', ...lines);
         await renderer.pause(2000);
      }
      endofdays.stop();
      content.amEndofdays.unload();
      await renderer.pause(2000);
   }
   SAVE.flag.n._deaths++;
   SAVE.flag.b.okaythatsweird = true;
   if (!SAVE.flag.b.bully_sleep) {
      SAVE.flag.b.bully_sleep = true;
      await credits(false);
      await Promise.all([ inventories.splashAssets.load(), renderer.pause(1000) ]);
      await splash();
      await renderer.pause(2000);
   }
   saver.time_but_real.stop();
   reload(true);
}

export async function tripper (
   kidd: CosmosCharacter,
   resources = content.iocKiddRightTrip,
   layer: OutertaleLayerKey = 'main'
) {
   const tripAnim = new CosmosAnimation({
      tint: kidd.tint,
      active: true,
      anchor: { x: 0, y: 1 },
      position: kidd.position.add(resources === content.iocKiddRightTrip ? 18 : -18, 0),
      resources
   });
   kidd.position = tripAnim.position.clone();
   kidd.alpha.value = 0;
   renderer.attach(layer, tripAnim);
   await renderer.when(() => tripAnim.index === 19);
   tripAnim.disable();
   tripAnim.index = 19;
   await renderer.pause(500);
   kidd.alpha.value = 1;
   renderer.detach(layer, tripAnim);
}

export async function endCall (t: string) {
   await dialogue(t, text.c_call_common.end);
}

export function genCB () {
   const cornerbarrier = instance('below', 'cornerbarrier');
   if (cornerbarrier) {
      const truebarrier = temporary(new CosmosObject({ position: cornerbarrier.object.position }), 'below');
      for (const object of cornerbarrier.object.objects as CosmosHitbox[]) {
         const px = object.position.add(object.size.x, 0);
         const py = object.position.add(0, object.size.y);
         const md = px.add(py).divide(2);
         const ps = truebarrier.position.add(object);
         truebarrier.attach(
            new CosmosHitbox({
               anchor: { x: 0 },
               rotation: md.angleFrom(object) - 90,
               position: object,
               size: { x: px.extentOf(py), y: md.extentOf(object) }
            }).on('tick', function () {
               let barrier = true;
               if (object.size.x > 0) {
                  player.position.x < ps.x && (barrier = false);
               } else {
                  player.position.x > ps.x && (barrier = false);
               }
               if (object.size.y > 0) {
                  player.position.y < ps.y && (barrier = false);
               } else {
                  player.position.y > ps.y && (barrier = false);
               }
               this.metadata.barrier = barrier;
            })
         );
      }
   }
}

export function rgHeaders (rg1: CosmosObject, rg2: CosmosObject) {
   let t = 0;
   const waver = function (this: CosmosObject) {
      this.scale.set(sineWaver(t, 1000, 0.9, 1.1), sineWaver(t, 1000, 1.1, 0.9));
   };
   return (h: string) => {
      switch (h) {
         case 'x1':
            t = renderer.time;
            rg1.on('tick', waver);
            break;
         case 'x2':
            t = renderer.time;
            rg2.on('tick', waver);
            break;
         case 'x3':
            rg1.off('tick', waver);
            rg2.off('tick', waver);
            rg1.scale.set(1);
            rg2.scale.set(1);
            break;
      }
   };
}

export function runEncounter (populationfactor: number, puzzlefactor: number, chances: [OutertaleGroup, number][]) {
   if (puzzlefactor === 0) {
      SAVE.data.n.steps = 0;
      SAVE.data.n.encounters = 1;
      return false;
   }
   const steps = SAVE.data.n.steps * puzzlefactor;
   // safe stepping time (ticks)
   const threshold = SAVE.data.n.encounters < 1 ? 120 : SAVE.data.n.encounters < 2 ? 240 : 480;
   if (
      steps < threshold ||
      // max waiting time (ticks)
      Math.min((steps - threshold) / 300, 1) < SAVE.data.n.steps_factor * (1 - (1 - populationfactor) ** 7)
   ) {
      return false;
   } else if (game.movement) {
      SAVE.data.n.steps = 0;
      SAVE.data.n.encounters++;
      SAVE.data.n.steps_factor = rng.overworld.next();
      const list = CosmosUtils.parse<number[]>(SAVE.data.s.encounters, []);
      const group =
         world.population > 0
            ? CosmosMath.weigh(
                 chances.filter(([ group ]) => Number.isNaN(group.id) || !list.includes(group.id)),
                 rng.overworld.next()
              )!
            : groups.nobody;
      Number.isNaN(group.id) || list.push(group.id);
      list.length > 4 && list.shift();
      SAVE.data.s.encounters = CosmosUtils.serialize(list);
      game.music_offset = game.music?.position ?? 0;
      return battler.encounter(player, group);
   }
}

export function updateMoniker () {
   typer.variables.moniker1 = text.a_common.moniker[SAVE.data.n.state_aerialis_moniker][0];
   typer.variables.moniker1u = typer.variables.moniker1.toUpperCase();
   typer.variables.moniker1l = typer.variables.moniker1.toLowerCase();
   typer.variables.moniker2 = text.a_common.moniker[SAVE.data.n.state_aerialis_moniker][1];
   typer.variables.moniker2u = typer.variables.moniker2.toUpperCase();
   typer.variables.moniker2l = typer.variables.moniker2.toLowerCase();
   typer.variables.moniker3 = text.a_common.moniker[SAVE.data.n.state_aerialis_moniker][2];
   typer.variables.moniker3u = typer.variables.moniker3.toUpperCase();
   typer.variables.moniker3l = typer.variables.moniker3.toLowerCase();
   typer.variables.moniker4 = text.a_common.moniker[SAVE.data.n.state_aerialis_moniker][3];
   typer.variables.moniker4u = typer.variables.moniker3.toUpperCase();
   typer.variables.moniker4l = typer.variables.moniker3.toLowerCase();
}

export function updateMusic () {
   let roomv: OutertaleRoom[] | null = null;
   const basicCondition = SAVE.data.b.svr || world.genocide;
   const sigmaCondition = postSIGMA();
   if (basicCondition) {
      if (!genoDisplay.state) {
         genoDisplay.state = true;
         roomv ??= [ ...rooms.values() ];
         for (const room of roomv) {
            for (const override of musicOverrides) {
               if (room.score.music === override[0]) {
                  const [ from, to ] = override;
                  room.metadata.restoreMuzak = room.score.music;
                  room.score.music = to;
                  from && room.preload.value.splice(room.preload.value.indexOf(musicRegistry.of(from).audio), 1);
                  to && room.preload.value.push(musicRegistry.of(to).audio);
                  break;
               }
            }
         }
      }
   } else if (genoDisplay.state) {
      genoDisplay.state = false;
      roomv ??= [ ...rooms.values() ];
      for (const room of roomv) {
         if (room.metadata.restoreMuzak !== void 0) {
            const from = room.score.music;
            const to = room.metadata.restoreMuzak as string | null;
            room.metadata.restoreMuzak = void 0;
            room.score.music = to;
            from && room.preload.value.splice(room.preload.value.indexOf(musicRegistry.of(from).audio), 1);
            to && room.preload.value.push(musicRegistry.of(to).audio);
         }
      }
   }
   if (basicCondition || sigmaCondition) {
      if (!genoDisplay.dark) {
         genoDisplay.dark = true;
         roomv ??= [ ...rooms.values() ];
         for (const room of roomv) {
            const spr = room.layers.below?.[0] as CosmosSprite;
            spr && spr.frames[0] === maps.of('aerialis-b').image && (spr.frames = [ maps.of('aerialis-b-dark').image ]);
         }
      }
   } else if (genoDisplay.dark) {
      genoDisplay.dark = false;
      roomv ??= [ ...rooms.values() ];
      for (const room of roomv) {
         const spr = room.layers.below?.[0] as CosmosSprite;
         spr && spr.frames[0] === maps.of('aerialis-b-dark').image && (spr.frames = [ maps.of('aerialis-b').image ]);
      }
   }
   if (sigmaCondition) {
      if (!genoDisplay.mus) {
         genoDisplay.mus = true;
         roomv ??= [ ...rooms.values() ];
         for (const room of roomv) {
            if (room.score.music === 'mall') {
               room.metadata.restoreZigma = true;
               room.score.music = null;
               room.preload.value.splice(room.preload.value.indexOf(musicRegistry.of('mall').audio), 1);
            }
         }
      }
   } else if (genoDisplay.mus) {
      genoDisplay.mus = false;
      roomv ??= [ ...rooms.values() ];
      for (const room of roomv) {
         if (room.metadata.restoreZigma === true) {
            room.metadata.restoreZigma = void 0;
            room.score.music = 'mall';
            room.preload.value.push(musicRegistry.of('mall').audio);
         }
      }
   }
}

// prepare in case of reset/reload to before toriel event
events.on('loaded', 1).then(() => world.genocide && (oversaver.primed = true));

// intro init script
events.on('init-intro', async () => {
   await menuLoader;
   init();
   await renderer.pause(100);
   frontEnder.index = 1;
   if (frontEnder.nostory) {
      atlas.switch(SAVE.isCanon() && SAVE.data.s.name === '' ? 'frontEndStart' : 'frontEndLoad');
   } else {
      atlas.switch('frontEnd');
      await Promise.race([
         atlas.navigators.of('frontEndLoad').on('from'),
         atlas.navigators.of('frontEndStart').on('from')
      ]);
   }
   frontEnder.impactNoise?.stop();
   frontEnder.menuMusic = frontEnder.menuMusicResource.daemon.instance(renderer);
   frontEnder.menuMusic.rate.value =
      world.genocide || SAVE.flag.b.true_reset ? 0.1 : ateThreshold() ? 0.5 : antiAteThreshold() ? 0.8 : 1;
   await events.on('spawn');
   game.input = false;
   renderer.alpha.value = 0;
   renderer.fader.alpha = 1;
   atlas.switch(null);
});

events.on('init-between', async () => {
   inventories.menuAssets.unload();
   content.amMenu0.unload();
   content.amMenu1.unload();
   content.amMenu2.unload();
   content.amMenu3.unload();
   content.amMenu4.unload();
   await queueLoader;
   init();
   updateArmor(SAVE.data.s.armor || 'spacesuit');
   SAVE.data.n.hp ||= 20;
   SAVE.data.s.weapon ||= 'spanner';
   typer.variables.name = SAVE.data.s.name || systemsText.general.mystery2;
   typer.variables.namel = SAVE.data.s.name.toLowerCase() || systemsText.general.mystery2l;
   typer.variables.nameu = SAVE.data.s.name.toUpperCase() || systemsText.general.mystery2u;
   updateMoniker();
   rng.attack.value = SAVE.data.n.base_attack || hashes.of(SAVE.data.s.name || Math.random().toString());
   rng.battle.value = SAVE.data.n.base_battle || hashes.of(SAVE.data.s.name || Math.random().toString());
   rng.dialogue.value = SAVE.data.n.base_dialogue || hashes.of(SAVE.data.s.name || Math.random().toString());
   rng.overworld.value = SAVE.data.n.base_overworld || hashes.of(SAVE.data.s.name || Math.random().toString());
   rng.pattern.value = SAVE.data.n.base_pattern || hashes.of(SAVE.data.s.name || Math.random().toString());
   game.room = SAVE.data.s.room || spawn;
   game.camera = player;
   if (oversaver.primed) {
      if (world.genocide) {
         oversaver.primed = false; // did not reset/reload to before toriel event
      } else {
         oversaver.base_attack = rng.attack.value;
         oversaver.base_battle = rng.battle.value;
         oversaver.base_dialogue = rng.dialogue.value;
         oversaver.base_overworld = rng.overworld.value;
         oversaver.base_pattern = rng.pattern.value;
         oversaver.room = game.room;
         oversaver.state = CosmosUtils.parse(CosmosUtils.serialize(SAVE.state));
      }
   }
});

events.on('init-overworld', async () => {
   renderer.alpha.value = 0;
   renderer.attach('base', grey, galaxy, blue, basic);
   const entities = [
      player,
      ...(SAVE.data.b.svr && SAVE.data.s.room[0] !== '_' ? [ goatbroTrue ] : world.goatbro ? [ goatbro ] : []),
      ...(world.kiddo ? [ kiddo ] : [])
   ];
   for (const entity of entities) {
      entity.fire('tick');
   }
   renderer.attach('main', ...entities);
   const ultra = ultraPosition(game.room);
   teleporter.forcemove = true;
   await teleport(game.room, ultra.face, ultra.position.x, ultra.position.y, { fast: true });
   saver.time_but_real.active = true;
   renderer.alpha.modulate(renderer, 300, 1);
   world.cutscene() || quickresume(true);
});

events.on('teleport', async (from, to) => {
   const rad = rand_rad(to);
   blue.index = rad.int(10);
   blue.scale.set(rad.int(2) - 0.5, rad.int(2) - 0.5);
   blue.tint = SAVE.data.n.plot === 72 ? 0x5f5f5f : 0x1f1f1f;
   galaxy.alpha.value =
      to === 'c_courtroom' || to === '_hangar' || rooms.of(to).neighbors.includes('_taxi')
         ? SAVE.data.n.plot === 72
            ? 0.75
            : 0.25
         : 0;
   grey.index = rad.int(10);
   grey.scale.set(rad.int(2) - 0.5, rad.int(2) - 0.5);
   grey.tint = SAVE.data.n.plot === 72 ? 0x9f9f9f : 0x3f3f3f;
   if (to[0] === '_') {
      const ct = instance('main', 'charatrigger');
      if (ct) {
         if (!SAVE.data.b.freedom || !SAVE.data.b.svr) {
            ct.destroy();
         } else {
            const ob = ct.object;
            if (!ob.metadata.active) {
               ob.metadata.active = true;
               const an = ob.objects[0] as CosmosAnimation;
               const re = an.resources;
               const pr = speech.presets.of('basic');
               ob.on('tick', function () {
                  if (typer.mode !== 'empty' && speech.state.preset === pr) {
                     switch (ultimaFacer({ position: ob, size: (ob.objects[1] as CosmosHitbox).size })) {
                        case 'down':
                           an.resources = content.iocFriskDownCharaFake;
                           break;
                        case 'left':
                           an.resources = content.iocFriskLeftCharaFake;
                           break;
                        case 'right':
                           an.resources = content.iocFriskRightCharaFake;
                           break;
                        case 'up':
                           an.resources = content.iocFriskUpCharaFake;
                           break;
                     }
                  } else {
                     an.resources = re;
                  }
                  if (
                     Math.abs(this.position.x - player.position.x) > 80 ||
                     Math.abs(this.position.y - player.position.y) > 80
                  ) {
                     this.alpha.value = 0.2;
                  } else {
                     const ex = this.position.extentOf(player);
                     if (ex > 80) {
                        this.alpha.value = 0.2;
                     } else {
                        this.alpha.value = 0.2 + (1 - Math.max(ex - 20, 0) / 60) * 0.6;
                     }
                  }
               });
            }
         }
      }
   }
   switch (to) {
      case '_void': {
         const [ bg, br ] = rooms.of('_void').layers.below! as [CosmosSprite, CosmosObject];
         if (player.metadata.reverse) {
            bg.scale.set(-1);
            bg.anchor.set(1);
            br.rotation.value = 180;
            br.position.set(320, 200);
         } else {
            bg.scale.set(1);
            bg.anchor.set(-1);
            br.rotation.value = 0;
            br.position.set(0, 40);
         }
         break;
      }
      case '_cockpit': {
         const ms = new CosmosValue(1);
         const splashLoader = inventories.splashAssets.load();
         teleporter.movement = false;
         renderer.attach(
            'base',
            new CosmosRectangle({
               fill: 0,
               size: 1000,
               priority: 1000,
               anchor: 0,
               metadata: {
                  init: false,
                  gr: new Graphics(),
                  particles: CosmosUtils.populate(5, (i): [number, [number, number, number][]] => [
                     i,
                     CosmosUtils.populate(45, (): [number, number, number] => [
                        60 + Math.random() * 216,
                        -10 + Math.random() * 330,
                        Math.random() * 8 + 2
                     ])
                  ])
               },
               filters: [ filters.bloomX ]
            }).on('tick', function () {
               const gr = this.metadata.gr;
               if (this.metadata.init) {
                  gr.clear();
               } else {
                  this.metadata.init = true;
                  this.container.addChild(gr);
               }
               for (const [ size, list ] of this.metadata.particles) {
                  const al = ((1 - size / 4) * 0.9 + 0.1) ** 2;
                  const wh = 0.75 + size / 8;
                  const w2 = wh / 2;
                  gr.beginFill(0xffffff, al);
                  for (const p of list) {
                     p[1] += p[2] * ms.value;
                     if (p[1] > 320) {
                        p[1] -= 330;
                        p[0] = 60 + Math.random() * 216;
                     }
                     gr.drawRect(p[0] - w2, p[1] - w2, wh, wh);
                  }
                  gr.endFill().beginFill(0xffffff, al / 4);
                  for (const p of list) {
                     gr.drawRect(p[0] - w2 / 2, p[1] - w2, wh / 2, wh * p[2] * ms.value * 2);
                  }
                  gr.endFill();
               }
            })
         );
         SAVE.data.b.water || instance('below', 'sippy')?.destroy();
         player.alpha.value = 0;
         goatbro.alpha.value = 0;
         if (!world.genocide) {
            instance('main', 'goatboi')?.destroy();
            for (const inst of instances('above', 'hearts')) {
               inst.destroy();
            }
            if (SAVE.flag.n.lv20 < 4) {
               renderer.attach(
                  'main',
                  new CosmosAnimation({
                     position: { x: 160, y: 120 },
                     resources: content.iocFriskDown,
                     anchor: { x: 0, y: 1 }
                  })
               );
               await renderer.pause(4000);
               await Promise.all([
                  fader({ alpha: 0 }).alpha.modulate(renderer, 1000, 1),
                  game.music?.gain.modulate(renderer, 1000, 0)
               ]);
               await Promise.all([ content.asWind.load(), renderer.pause(3000) ]);
               const wind = sounds.wind.instance(renderer);
               wind.gain.value /= 10;
               await wind.gain.modulate(renderer, 3000, wind.gain.value * 10);
               await dialogue('dialoguerBottom', ...text.a_common.neutral1);
               wind.gain.modulate(renderer, 1000, 0).then(() => {
                  wind.stop();
                  content.asWind.unload();
               });
               await antifreeze([ splashLoader, renderer.pause(2000) ]);
               saver.save('_cockpit');
               SAVE.flag.n.lv20 = 4;
               SAVE.flag.b.true_reset = true;
               await credits();
            }
            return;
         }
         const time = renderer.time;
         for (const inst of instances('above', 'hearts')) {
            inst.object.area = renderer.area!;
            inst.object.scale.set(1 / 2);
            inst.object.on('tick', function () {
               this.offsets[0].y = sineWaver(time, 4000, -1, 1, this.position.x / 320);
            });
         }
         renderer.attach(
            'main',
            new CosmosAnimation({
               position: { x: 240, y: 151 },
               resources: content.iocFriskDown,
               anchor: { x: 0, y: 1 }
            })
         );
         await renderer.pause(8000);
         sounds.menu.instance(renderer).rate.value = 0.8;
         await renderer.pause(166);
         sounds.menu.instance(renderer).rate.value = 0.8;
         await renderer.pause(166);
         sounds.menu.instance(renderer).rate.value = 0.8;
         await renderer.pause(166);
         sounds.menu.instance(renderer).rate.value = 0.8;
         await renderer.pause(166);
         sounds.menu.instance(renderer).rate.value = 0.8;
         await renderer.pause(1000);
         const ep1 = character('asgore', characters.asgore, { x: 160, y: 120 }, 'down', { scale: { x: 0 } });
         sounds.dephase.instance(renderer);
         ep1.scale.modulate(renderer, 50, { x: 1.05, y: 1 }).then(() => {
            ep1.scale.modulate(renderer, 125, { x: 1, y: 1 });
         });
         renderer.pause(35).then(async () => {
            ep1.alpha.value = 0;
            await renderer.pause(40);
            ep1.alpha.value = 0.8;
            await ep1.alpha.modulate(renderer, 100, 1);
         });
         await renderer.pause(850);
         const survive =
            SAVE.data.b.papyrus_secret &&
            SAVE.data.n.state_foundry_muffet !== 1 &&
            SAVE.data.n.state_foundry_maddummy !== 1 &&
            SAVE.data.n.corekills < 2;
         if (survive) {
            await dialogue('dialoguerBottom', ...text.a_common.end2);
         } else {
            await dialogue('dialoguerBottom', ...text.a_common.end1);
         }
         sounds.phase.instance(renderer);
         ep1.scale.modulate(renderer, 125, { x: 1.05, y: 1 }).then(() => {
            ep1.scale.modulate(renderer, 50, { x: 0, y: 1 });
         });
         await ep1.alpha.modulate(renderer, 100, 0.8);
         ep1.alpha.value = 0;
         await renderer.pause(40);
         ep1.alpha.value = 1;
         if (survive) {
            renderer.detach('main', ep1);
         } else {
            const ohHELLdah = sounds.deeploop2.instance(renderer);
            ohHELLdah.gain.value = 0;
            ohHELLdah.rate.value = 1.2;
            await Promise.all([ renderer.shake.modulate(renderer, 5000, 4), ohHELLdah.gain.modulate(renderer, 5000, 1) ]);
            renderer.detach('main', ep1);
            ohHELLdah.stop();
            renderer.shake.value = 0;
         }
         sounds.noise.instance(renderer);
         game.music?.stop();
         if (survive) {
            for (const inst of instances('above', 'hearts')) {
               inst.destroy();
            }
            for (const obj of renderer.layers.below.objects) {
               obj.tint = tints.dark01;
            }
            for (const obj of renderer.layers.main.objects) {
               obj.tint = tints.dark01;
            }
            for (const obj of renderer.layers.above.objects) {
               obj.tint = tints.dark01;
            }
            await ms.modulate(renderer, 5000, 0.1);
            await renderer.pause(1000);
            const fd = fader();
            await fd.alpha.modulate(renderer, 3000, 1);
            await renderer.pause(3000);
            await dialogue('dialoguerBottom', ...text.a_common.neutral2);
         } else {
            fader({ alpha: 1 });
            await renderer.pause(2000);
            sounds.boom.instance(renderer);
            const wf = fader({ fill: 0xffffff });
            await wf.alpha.modulate(renderer, SAVE.flag.b.$option_epilepsy ? 300 : 150, 1);
            await renderer.pause(SAVE.flag.b.$option_epilepsy ? 850 : 1000);
            await wf.alpha.modulate(renderer, 3000, 0);
            renderer.detach('menu', wf);
         }
         await antifreeze([ splashLoader, renderer.pause(2000) ]);
         await credits();
         break;
      }
      case '_frontier1': {
         from === '_frontier2' && sounds.doorClose.instance(renderer);
         break;
      }
      case '_frontier2': {
         from === '_frontier1' && sounds.doorClose.instance(renderer);
         temporary(
            new CosmosObject({
               priority: 10,
               objects: [
                  new CosmosSprite({ frames: [ content.iooFrontierMirrorBackdrop ] }).on('pre-render', function () {
                     this.position.set(renderer.projection({ x: 238, y: 100 }));
                  }),
                  new CosmosAnimation({ anchor: { x: 0, y: 1 } }).on('pre-render', function () {
                     const y = 136.5 - (player.position.y - 136.5);
                     this.priority.value = y + 0.001;
                     this.position.set(renderer.projection({ x: player.position.x, y }));
                     this.use(friskMirrorHome[player.face]);
                     this.index = player.sprite.index;
                     this.fix();
                  })
               ]
            }),
            'base'
         );
         if (SAVE.data.b.f_state_kidd_betray) {
            renderer.region[0].y += 30;
            renderer.region[1].y += 30;
            temporary(
               new CosmosSprite({
                  position: { y: 220 },
                  frames: [ content.iooFrontierUnder ],
                  objects: [
                     new CosmosHitbox({
                        size: { x: 40, y: 20 },
                        position: { x: 20 },
                        metadata: { barrier: true }
                     })
                  ]
               }),
               'below'
            );
         }
         break;
      }
      case '_frontier4': {
         SAVE.data.b.water || instance('below', 'sippy')?.destroy();
         (world.sad_ghost ||
            SAVE.data.b.a_state_napstadecline ||
            (SAVE.data.b.ufokinwotm8 && SAVE.data.n.lastblook > 0)) &&
            instance('main', 'lastblook')?.destroy();
         break;
      }
      case '_frontier5': {
         SAVE.data.b.chip && (instance('main', 'computer')!.index = 1);
         break;
      }
      case '_frontier8': {
         if (SAVE.data.s.room === '_frontier8') {
            renderer.clear('base', 'below', 'main', 'above', 'menu');
            isMobile.any && renderer.attach('menu', mobile.gamepad());
            renderer.attach(
               'below',
               new CosmosSprite({
                  area: renderer.area,
                  filters: [ filters.bloom ],
                  frames: [ content.ieEurybia ],
                  priority: -1000
               })
            );
            const fd = fader({ alpha: 1 });
            await fd.alpha.modulate(renderer, 3000, 0);
            renderer.detach('menu', fd);
            break;
         }
         teleporter.movement = false;
         player.tint = 0x31404d;
         const mkid = new CosmosCharacter({
            face: 'up',
            preset: characters.kidd,
            key: 'kidd',
            position: { x: 170.5, y: 230 },
            tint: 0x31404d
         });
         const asri = new CosmosCharacter({
            face: 'up',
            preset: characters.asrielTrueHome,
            key: 'asriel1',
            position: { x: 128.5, y: 230 },
            tint: 0x31404d
         });
         const char = new CosmosCharacter({
            face: 'up',
            preset: { talk: friskChara, walk: friskChara },
            key: 'plsdontusethiskthxCAUSECHARADOESNTANIMATEWHENTHEYTA',
            position: { x: 191.5, y: 230 },
            tint: 0x31404d
         });
         renderer.attach(
            'main',
            ...(SAVE.data.b.f_state_kidd_betray ? [] : [ mkid ]),
            ...(SAVE.data.b.svr ? [ asri, char ] : [])
         );
         renderer.attach(
            'below',
            new CosmosSprite({
               area: renderer.area,
               filters: [ filters.bloom ],
               frames: [ content.ieEurybia ],
               priority: -1000
            })
         );
         const fd = fader({ alpha: 1 });
         await fd.alpha.modulate(renderer, 3000, 0);
         renderer.detach('menu', fd);
         if (SAVE.data.b.f_state_kidd_betray) {
            await renderer.pause(10000);
            await dialogue('auto', ...text.a_common.balconyX);
         } else {
            await renderer.pause(2000);
            if (SAVE.data.b.svr) {
               await dialogue('auto', ...text.a_common.balcony0a);
               await renderer.pause(350);
               await dialogue('auto', ...text.a_common.balcony1a);
               await renderer.pause(650);
               await dialogue('auto', ...text.a_common.balcony2a);
               await renderer.pause(850);
               await dialogue('auto', ...text.a_common.balcony3a);
               await renderer.pause(650);
               await dialogue('auto', ...text.a_common.balcony4a);
               await renderer.pause(650);
               await dialogue('auto', ...text.a_common.balcony5a);
               await renderer.pause(450);
               await dialogue('auto', ...text.a_common.balcony6a);
               await renderer.pause(1250);
               await dialogue('auto', ...text.a_common.balcony7a);
               await renderer.pause(1650);
               await dialogue('auto', ...text.a_common.balcony8a);
               await renderer.pause(1450);
               await dialogue('auto', ...text.a_common.balcony9a);
               await renderer.pause(1650);
               await dialogue('auto', ...text.a_common.balcony10a);
               await renderer.pause(1850);
               await dialogue('auto', ...text.a_common.balcony11a);
               await renderer.pause(850);
               await dialogue('auto', ...text.a_common.balcony12a);
               await renderer.pause(1250);
               await dialogue('auto', ...text.a_common.balcony13a);
               await renderer.pause(1650);
               await dialogue('auto', ...text.a_common.balcony14a);
               await renderer.pause(1250);
               await dialogue('auto', ...text.a_common.balcony15a());
               await renderer.pause(1250);
               await dialogue('auto', ...text.a_common.balcony16a());
               await renderer.pause(1450);
               await dialogue('auto', ...text.a_common.balcony17a);
               await renderer.pause(450);
               await dialogue('auto', ...text.a_common.balcony18a1);
               await notifier(asri, false);
               asri.face = 'right';
               await dialogue('auto', ...text.a_common.balcony18a2);
               await renderer.pause(1450);
               await dialogue('auto', ...text.a_common.balcony19a1);
               char.face = 'left';
               await renderer.pause(850);
               asri.face = 'up';
               await dialogue('auto', ...text.a_common.balcony19a2);
               await renderer.pause(1450);
               await dialogue('auto', ...text.a_common.balcony20a);
               await renderer.pause(450);
               await dialogue('auto', ...text.a_common.balcony21a);
               await renderer.pause(1250);
               mkid.face = 'right';
               await dialogue('auto', ...text.a_common.balcony22a);
               await notifier(char, false);
               await dialogue('auto', ...text.a_common.balcony23a1);
               char.face = 'up';
               await dialogue('auto', ...text.a_common.balcony23a2);
               await renderer.pause(1250);
               mkid.face = 'up';
               await dialogue('auto', ...text.a_common.balcony24a);
               await renderer.pause(1450);
               await dialogue('auto', ...text.a_common.balcony25a);
               await renderer.pause(1050);
               await dialogue('auto', ...text.a_common.balcony26a1);
               await renderer.pause(1650);
               await dialogue('auto', ...text.a_common.balcony26a2);
               await renderer.pause(850);
               await dialogue('auto', ...text.a_common.balcony27a);
               await renderer.pause(650);
               await dialogue('auto', ...text.a_common.balcony28a);
               await dialogue('auto', ...text.a_common.balcony29a);
               await renderer.pause(1850);
               await dialogue('auto', ...text.a_common.balcony30a);
               await renderer.pause(450);
               await dialogue('auto', ...text.a_common.balcony31a);
               await renderer.pause(850);
               await dialogue('auto', ...text.a_common.balcony32a);
               await renderer.pause(1250);
               await dialogue('auto', ...text.a_common.balcony33a);
               await renderer.pause(1650);
               await dialogue('auto', ...text.a_common.balcony34a1);
               await renderer.pause(450);
               await dialogue('auto', ...text.a_common.balcony34a2);
               await renderer.pause(650);
               await dialogue('auto', ...text.a_common.balcony35a1);
               await renderer.pause(1250);
               await dialogue('auto', ...text.a_common.balcony35a2);
               await renderer.pause(2450);
               await dialogue('auto', ...text.a_common.balcony36a);
               await renderer.pause(1250);
               await dialogue('auto', ...text.a_common.balcony37a);
               await renderer.pause(1650);
               await dialogue('auto', ...text.a_common.balcony38a);
               await renderer.pause(450);
               dialogue('auto', ...text.a_common.balcony39a);
               await renderer.pause(2000);
            } else {
               await dialogue('auto', ...text.a_common.balcony0);
               await renderer.pause(2450);
               await dialogue('auto', ...text.a_common.balcony1());
               if (SAVE.data.b.ufokinwotm8) {
                  mkid.preset = characters.kiddSad;
                  mkid.face = 'left';
               }
               await renderer.pause(1650);
               await dialogue('auto', ...text.a_common.balcony2());
               await renderer.pause(1250);
               await dialogue('auto', ...text.a_common.balcony3());
            }
         }
         const endAssets = new CosmosInventory(
            content.amTheend,
            content.ieSplashBackground,
            content.ieSplashForeground
         );
         endAssets.name = 'endAssets';
         const endLoader = endAssets.load();
         if (SAVE.isCanon() && SAVE.data.b.svr) {
            const realAssets = new CosmosInventory(content.ieReal, content.amNewworld);
            realAssets.name = 'realAssets';
            const realLoader = realAssets.load();
            await Promise.all([
               renderer.alpha.modulate(renderer, 5000, 0),
               CosmosValue.prototype.modulate.call(soundMixer.input.gain, renderer, 5000, 0)
            ]);
            renderer.clear('base', 'below', 'main', 'above', 'menu');
            isMobile.any && renderer.attach('menu', mobile.gamepad());
            typer.reset(true);
            game.music?.stop();
            inventories.lazyAssets.unload();
            await Promise.all([
               realLoader,
               renderer.pause(8000),
               teleport('', 'down', 0, 0, { fast: true, fade: false, cutscene: true }).then(() => {
                  rooms.of('').preload.unload();
               })
            ]);
            const real = new CosmosSprite({
               alpha: 0,
               anchor: 0,
               frames: [ content.ieReal ],
               scale: 1 / 8,
               position: { x: 160, y: 80 }
            });
            renderer.attach('menu', real);
            renderer.alpha.value = 1;
            real.alpha.modulate(renderer, 3000, 1);
            await renderer.pause(1500);
            const sep56 = (60 / 56) * 8;
            const newworld = music.newworld.instance(renderer);
            let idx = 0;
            let seconds = 0;
            const secTicker = () => {
               seconds += 1 / 30;
            };
            renderer.on('tick', secTicker);
            while (idx < systemsText.extra.real1.length) {
               await renderer.when(() => sep56 * idx + 1.5 <= seconds);
               const lines = systemsText.extra.real1[idx];
               const display = new CosmosObject({
                  alpha: 0,
                  position: { x: 160, y: 180 },
                  fontFamily: content.fDeterminationSans,
                  fontSize: 16,
                  fill: 0xffffff,
                  metadata: { fader: false },
                  objects: lines.map(
                     (line, index) =>
                        new CosmosText({
                           anchor: 0,
                           content: line,
                           position: { y: index * 20 }
                        })
                  )
               }).on('tick', function () {
                  if (this.metadata.fader) {
                     this.alpha.value > 0 && (this.alpha.value -= 0.025) < 0 && (this.alpha.value = 0);
                     if (this.alpha.value === 0) {
                        renderer.detach('menu', display);
                     }
                  } else {
                     this.alpha.value < 1 && (this.alpha.value += 0.025) > 1 && (this.alpha.value = 1);
                  }
                  const offset = CosmosMath.bezier(this.alpha.value, 20, 0, 0);
                  if (this.metadata.fader) {
                     this.position.x = 160 + offset;
                  } else {
                     this.position.x = 160 - offset;
                  }
               });
               renderer.attach('menu', display);
               await renderer.when(() => sep56 * (idx + 1) <= seconds);
               display.metadata.fader = true;
               idx++;
            }
            await renderer.when(() => sep56 * 8.5 <= seconds);
            const display = new CosmosText({
               alpha: 0,
               position: { x: 160, y: 200 },
               fontFamily: content.fDeterminationSans,
               fontSize: 16,
               fill: 0xffffff,
               metadata: { fader: false },
               anchor: 0,
               content: systemsText.extra.real2.replace('$(x)', SAVE.data.s.name)
            }).on('tick', function () {
               if (this.metadata.fader) {
                  this.alpha.value > 0 && (this.alpha.value -= 0.0125) < 0 && (this.alpha.value = 0);
                  if (this.alpha.value === 0) {
                     renderer.detach('menu', display);
                  }
               } else {
                  this.alpha.value < 1 && (this.alpha.value += 0.0125) > 1 && (this.alpha.value = 1);
               }
               const offset = CosmosMath.bezier(this.alpha.value, 20, 0, 0);
               if (this.metadata.fader) {
                  this.position.x = 160 + offset;
               } else {
                  this.position.x = 160 - offset;
               }
            });
            renderer.attach('menu', display);
            await renderer.when(() => sep56 * 10.25 <= seconds);
            display.metadata.fader = true;
            await renderer.when(() => sep56 * 10.5 <= seconds);
            renderer.off('tick', secTicker);
            await Promise.all([ real.alpha.modulate(renderer, 3000, 0), newworld.gain.modulate(renderer, 3000, 0) ]);
            renderer.detach('menu', real);
            newworld.stop();
            realAssets.unload();
            await antifreeze([ endLoader, renderer.pause(3000) ]);
         } else {
            await Promise.all([
               renderer.alpha.modulate(renderer, 5000, 0),
               CosmosValue.prototype.modulate.call(soundMixer.input.gain, renderer, 5000, 0)
            ]);
            renderer.clear('base', 'below', 'main', 'above', 'menu');
            isMobile.any && renderer.attach('menu', mobile.gamepad());
            typer.reset(true);
            game.music?.stop();
            inventories.lazyAssets.unload();
            await Promise.all([
               endLoader,
               renderer.pause(8000),
               teleport('', 'down', 0, 0, { fast: true, fade: false, cutscene: true }).then(() => {
                  rooms.of('').preload.unload();
               })
            ]);
            renderer.alpha.value = 1;
         }
         saver.save('_frontier8');
         SAVE.flag.b.true_reset = true;
         if (SAVE.isCanon() && SAVE.data.b.svr && !SAVE.flag.b.$svr) {
            SAVE.flag.b.$svr = true;
            SAVE.flag.b.$aster = false;
         }
         const bg = frontEnder.createBackground();
         const fg = new CosmosSprite({ frames: [ content.ieSplashForeground ] });
         renderer.attach('menu', bg, fg);
         const big64 = (60 / 64) * 32;
         const theend = music.theend.instance(renderer);
         theend.source!.loopStart = big64 * 3;
         theend.source!.loopEnd = big64 * 4;
         soundMixer.input.gain.value = 1;
         await renderer.pause(1500);
         await fg.position.modulate(renderer, 1500, { y: -20 });
         renderer.attach(
            'menu',
            new CosmosText({
               fill: 0xffffff,
               fontFamily: content.fDeterminationSans,
               content: SAVE.data.b.svr ? systemsText.extra.end1 : systemsText.extra.end2,
               anchor: { x: 0 },
               position: { x: 160, y: 140 },
               fontSize: 8,
               scale: { x: 5, y: 4 }
            })
         );
         if (SAVE.data.b.svr) {
            const sceneAssets = new CosmosInventory(
               content.iocFriskPat,
               content.iocFriskDownHome,
               content.iocAsrielSleepingsadly
            );
            sceneAssets.name = 'sceneAssets';
            const sceneAssetsX = new CosmosInventory(
               content.iocFriskRightHome,
               content.iooBed,
               content.iooBedcoverFinal,
               content.iocAsrielSleepingbeauty
            );
            sceneAssetsX.name = 'sceneAssetsX';
            await Promise.all([ sceneAssets.load(), sceneAssetsX.load(), renderer.pause(30000) ]);
            const gote = new CosmosSprite({
               anchor: { x: 0, y: 1 },
               position: { x: 154, y: 223 },
               scale: { x: -1 },
               priority: 2,
               frames: [ content.iocAsrielSleepingsadly ]
            });
            const realplayer = new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               position: { x: -20, y: 210 },
               resources: content.iocFriskRightHome,
               priority: 5000000000000
            }).on('tick', function () {
               if (this.resources === content.iocFriskPat && this.index === 3) {
                  this.index = 1;
               }
            });
            const al = new AlphaFilter(0);
            const alValue = new CosmosValue(0);
            const bed = new CosmosObject({
               tint: tints.dark03,
               area: renderer.area,
               filters: [ al ],
               objects: [
                  new CosmosSprite({ anchor: { x: 0, y: 1 }, position: { x: 160, y: 245 }, frames: [ content.iooBed ] }),
                  realplayer,
                  gote,
                  new CosmosSprite({ position: { x: 145, y: 208 }, frames: [ content.iooBedcoverFinal ], priority: 3 })
               ]
            }).on('tick', function () {
               al.alpha = alValue.value;
            });
            renderer.attach('menu', bed);
            await alValue.modulate(renderer, 1000, 1);
            await renderer.pause(2000);
            realplayer.enable();
            await realplayer.position.step(renderer, 3, { x: 40 });
            realplayer.reset();
            await renderer.pause(1000);
            realplayer.use(content.iocFriskDownHome);
            await renderer.pause(1250);
            realplayer.use(content.iocFriskRightHome);
            await renderer.pause(1750);
            realplayer.enable();
            await realplayer.position.step(renderer, 2, { x: 140 });
            realplayer.use(content.iocFriskPat).enable();
            gote.frames = [ content.iocAsrielSleepingbeauty ];
            await renderer.pause(60000);
            await alValue.modulate(renderer, 2000, 0);
            gote.position.set(165, 226);
            gote.scale.x = 1;
            realplayer.position.set(155, 226);
            realplayer.reset().use(content.iocFriskRightHome);
            realplayer.priority.value = 1;
            await renderer.pause(2000);
            await alValue.modulate(renderer, 2000, 1);
            sceneAssets.unload();
         } else if (!SAVE.data.b.f_state_kidd_betray || !SAVE.data.b.ufokinwotm8) {
            const sceneAssets = new CosmosInventory(
               ...(SAVE.data.b.ufokinwotm8
                  ? [ inventories.iocKiddSad ]
                  : [ content.iocFriskLeftHome, content.iocFriskRightHome ]),
               ...(SAVE.data.b.f_state_kidd_betray ? [ content.iocFriskDownHome ] : [ inventories.iocKidd ])
            );
            sceneAssets.name = 'sceneAssets';
            await Promise.all([ sceneAssets.load(), renderer.pause(30000) ]);
            const fakeplayer = new CosmosAnimation({
               active: true,
               tint: tints.dark03,
               anchor: { x: 0, y: 1 },
               position: { x: -20, y: 210 },
               resources: content.iocFriskRightHome
            });
            if (SAVE.data.b.f_state_kidd_betray) {
               renderer.attach('menu', fakeplayer);
               await fakeplayer.position.step(renderer, 3, { x: 40 });
               fakeplayer.reset();
               await renderer.pause(1500);
               fakeplayer.use(content.iocFriskDownHome);
               await renderer.pause(20000);
               fakeplayer.use(content.iocFriskLeftHome).enable();
               await fakeplayer.position.step(renderer, 3, { x: -20 }).then(() => renderer.detach('menu', fakeplayer));
            } else {
               mkid.tint = tints.dark03;
               mkid.position.set(340, 210);
               renderer.attach('menu', mkid);
               await mkid.walk(renderer, 4, { x: 178 });
               await tripper(mkid, content.iocKiddLeftTrip, 'menu');
               mkid.face = 'down';
               if (SAVE.data.b.ufokinwotm8) {
                  await renderer.pause(10000);
                  mkid.face = 'left';
                  await renderer.pause(2000);
                  mkid.face = 'right';
                  await renderer.pause(4000);
                  mkid.preset = characters.kiddSad;
                  mkid.face = 'down';
                  await renderer.pause(6000);
                  await mkid.walk(renderer, 4, { x: -20 });
                  renderer.detach('menu', mkid);
               } else {
                  await renderer.pause(2000);
                  renderer.attach('menu', fakeplayer);
                  await fakeplayer.position.step(renderer, 3, { x: 40 });
                  fakeplayer.reset();
                  await renderer.pause(500);
                  mkid.face = 'left';
                  await renderer.pause(1000);
                  fakeplayer.use(content.iocFriskLeftHome).enable();
                  await Promise.all([
                     fakeplayer.position.step(renderer, 3, { x: -20 }).then(() => renderer.detach('menu', fakeplayer)),
                     mkid.walk(renderer, 4, { x: -20 }).then(() => renderer.detach('menu', mkid))
                  ]);
               }
            }
            sceneAssets.unload();
         }
         break;
      }
      case '_frontier10': {
         if (!SAVE.data.b.svr) {
            renderer.region[0].x += 20;
            renderer.region[1].x += 20;
            temporary(
               new CosmosSprite({
                  position: { x: 260 },
                  frames: [ content.iooFrontierOver ],
                  objects: [
                     new CosmosHitbox({
                        size: { x: 20, y: 80 },
                        position: { y: 80 },
                        metadata: { barrier: true }
                     })
                  ]
               }),
               'below'
            );
         }
         break;
      }
   }
});

events.on('script', async (name, ...args) => {
   if (!game.movement) {
      return;
   }
   switch (name) {
      case '_':
         game.movement = false;
         const snd = new CosmosDaemon(content.asCymbal, {
            context,
            gain: sounds.cymbal.gain * 0.8,
            rate: sounds.cymbal.rate
         }).instance(renderer);
         const fade = new CosmosRectangle({
            alpha: 0,
            fill: 0xffffff,
            stroke: -1,
            size: { x: 320, y: 240 }
         });
         renderer.attach('menu', fade);
         await fade.alpha.modulate(renderer, 5000, 1).then(() => {
            snd.stop();
            fade.fill = 0;
         });
         await renderer.pause(1e3);
         const mus = new CosmosDaemon(content.amRedacted, {
            context,
            loop: true,
            gain: music.redacted.gain,
            rate: music.redacted.rate
         }).instance(renderer);
         atlas.switch('dialoguerBase');
         const panel = new CosmosAnimation({
            alpha: 0,
            anchor: { x: 0 },
            position: { x: 160, y: 31 },
            resources: content.ieStory
         });
         const display = atlas.navigators.of('frontEnd').objects[1];
         renderer.attach('menu', panel, display);
         panel.alpha.modulate(renderer, 500, 1);
         await dialogue_primitive(
            ...[
               text._0._1,
               text._0._2,
               text._0._3,
               text._0._4,
               text._0._5,
               text._0._6,
               text._0._7,
               text._0._8,
               text._0._9,
               text._0._10
            ].map(text => `<24>{*}{#p/storyteller}{#v/1}${text}`)
         );
         await Promise.all([ mus.gain.modulate(renderer, 1000, 0), panel.alpha.modulate(renderer, 1000, 0, 0, 0) ]);
         renderer.detach('menu', panel, display);
         mus.stop();
         saver.time_but_real.stop();
         reload();
         break;
      case '_void':
         if (player.metadata.voidkey) {
            const { room, face, position } = player.metadata.voidkey;
            player.metadata.voidkey = null;
            await teleport(room, face, position.x, position.y, world);
         }
         break;
      case '_chara':
         await dialogue('auto', ...text.a_common.charatrigger[game.room as keyof typeof text.a_common.charatrigger]());
         break;
      case '_front':
         await dialogue('auto', ...text.a_common.frontstop());
         player.position.y -= 3;
         player.face = 'up';
         break;
      case '_computer':
         game.movement = false;
         const inst = instance('main', 'computer')!;
         if (SAVE.data.b.chip) {
            await dialogue('auto', ...text.a_common.computer5);
            game.movement = true;
            return;
         }
         await dialogue('auto', ...text.a_common.computer1());
         if (SAVE.data.b.ufokinwotm8) {
            game.movement = true;
            return;
         }
         const inv = SAVE.storage.inventory.has('chip');
         const dba = SAVE.storage.dimboxA.has('chip');
         if (!inv && !dba && !SAVE.storage.dimboxB.has('chip')) {
            game.movement = true;
            return;
         }
         await dialogue('auto', ...text.a_common.computer2());
         if (choicer.result === 1) {
            await dialogue('auto', ...text.a_common.computer3);
            game.movement = true;
            return;
         }
         SAVE.data.b.chip = true;
         inst.index = 1;
         sounds.select.instance(renderer).rate.value = 0.6;
         if (inv) {
            SAVE.storage.inventory.remove('chip');
         } else if (dba) {
            SAVE.storage.dimboxA.remove('chip');
         } else {
            SAVE.storage.dimboxB.remove('chip');
         }
         await renderer.pause(1000);
         await dialogue('auto', ...text.a_common.computer4);
         game.movement = true;
         break;
      case '_view':
         game.movement = false;
         await dialogue('auto', ...text.a_common.view());
         if (choicer.result === 0) {
            const overlay = fader();
            await Promise.all([
               overlay.alpha.modulate(renderer, 3000, 1),
               game.music?.gain.modulate(renderer, 3000, 0)
            ]);
            await renderer.pause(1000);
            await splash();
            await renderer.pause(2000);
            await teleport('_frontier8', 'up', 149.5, 230, world);
            renderer.detach('menu', overlay);
            quickresume(true);
         } else {
            player.face = 'down';
            player.position.y += 3;
            game.movement = true;
         }
         break;
      case '_lastblook':
         const last = instance('main', 'lastblook');
         if (last) {
            game.movement = false;
            const lastobject = last.object;
            const lb1 = text.a_common.lastblook1;
            await dialogue('auto', ...lb1[Math.min(SAVE.data.n.lastblook++, lb1.length - 1)]());
            if (SAVE.data.b.c_state_secret4 && !SAVE.data.b.c_state_secret4_used) {
               SAVE.data.b.c_state_secret4_used = true;
               const whitefader = fader({ fill: 0xffffff });
               const wind = sounds.wind.instance(renderer);
               wind.gain.value /= 10;
               wind.rate.value = 1.5;
               await Promise.all([
                  whitefader.alpha.modulate(renderer, 1000, 1),
                  wind.gain.modulate(renderer, 1000, wind.gain.value * 10)
               ]);
               lastobject.alpha.value = 0;
               (renderer.filters ??= []).push(filters.bloomX);
               engageDelay();
               await renderer.pause(1000);
               await Promise.all([
                  whitefader.alpha.modulate(renderer, 1000, 0),
                  wind.gain.modulate(renderer, 1000, wind.gain.value / 3)
               ]);
               renderer.detach('menu', whitefader);
               await renderer.pause(1500);
               await dialogue('auto', ...text.a_common.lastblook2);
               await renderer.pause(1500);
               await dialogue('auto', ...text.a_common.lastblook3);
               await renderer.pause(2000);
               await dialogue('auto', ...text.a_common.lastblook4);
               await directionalInput();
               renderer.attach('menu', whitefader);
               await Promise.all([
                  whitefader.alpha.modulate(renderer, 1000, 1),
                  wind.gain.modulate(renderer, 1000, wind.gain.value * 3)
               ]);
               lastobject.alpha.value = 1;
               renderer.filters.splice(renderer.filters.indexOf(filters.bloomX), 1);
               disengageDelay();
               await renderer.pause(1000);
               await Promise.all([ whitefader.alpha.modulate(renderer, 1000, 0), wind.gain.modulate(renderer, 1000, 0) ]);
               renderer.detach('menu', whitefader);
               wind.stop();
               await renderer.pause(1500);
               await dialogue('auto', ...text.a_common.lastblook5);
            }
            if (lb1.length - 1 <= SAVE.data.n.lastblook && choicer.result === 0) {
               let primed = true;
               const chillLoader = content.amNapstachords.load();
               await player.walk(renderer, 3, { y: 200 });
               await renderer.pause(350);
               player.face = 'down';
               await antifreeze([ chillLoader, renderer.pause(1250) ]);
               lastobject.priority.value = 99999999;
               player.face = 'right';
               player.rotation.value = -90;
               player.sprite.anchor.y = 0;
               player.position.y -= 5;
               player.priority.value = 9999999;
               await renderer.pause(500);
               const level = new CosmosValue();
               renderer.layers.below.modifiers = [];
               const p1 = instance('main', 'plant1')!.object;
               const p2 = instance('main', 'plant2')!.object;
               const bg = renderer.layers.below.objects.filter(obj => obj instanceof CosmosSprite)[0] as CosmosSprite;
               const moosic = music.napstachords.instance(renderer);
               moosic.rate.value = 0;
               moosic.gain.value = 0;
               const coolwaver = new Filter(shaders.waver.vert, shaders.waver.frag, {
                  size: 480,
                  phase: 0,
                  widthTop: 1 / 40,
                  widthBottom: 1 / 40,
                  yoffset: 0
               });
               const fg = new CosmosSprite({
                  area: renderer.area,
                  alpha: 0,
                  frames: [ content.ieSplashBackground ],
                  scale: 0.5,
                  filters: [ coolwaver ],
                  priority: 99999
               }).on('pre-render', function () {
                  this.position.set(renderer.resolve({ x: 0, y: 0 }));
               });
               renderer.attach('main', fg);
               const normal = game.music!.gain.value;
               const ticker = () => {
                  p1.alpha.value = 1 - level.value;
                  p2.alpha.value = 1 - level.value;
                  bg.alpha.value = 1 - level.value;
                  fg.alpha.value = level.value;
                  moosic.gain.value = level.value * 0.8;
                  game.music!.gain.value = normal * (1 - level.value);
                  coolwaver.uniforms.phase += 0.0025;
               };
               renderer.pause(7000).then(() => {
                  if (primed) {
                     moosic.rate.value = 1;
                     level.modulate(renderer, 7000, 1);
                  }
               });
               renderer.on('tick', ticker);
               renderer.layers.base.container.alpha = 0;
               await renderer.pause(3000);
               await directionalInput();
               primed = false;
               player.position.y += 5;
               player.sprite.anchor.y = 1;
               player.rotation.value = 0;
               player.face = 'up';
               await level.modulate(renderer, level.value * 2500, 0);
               renderer.layers.base.container.alpha = 1;
               renderer.off('tick', ticker);
               ticker();
               moosic.stop();
               content.amNapstachords.unload();
               renderer.detach('main', fg);
               await renderer.pause(1000);
               player.priority.value = 0;
               lastobject.priority.value = 0;
            }
            game.movement = true;
            if (SAVE.data.b.ufokinwotm8) {
               await lastobject.alpha.modulate(renderer, 500, 0);
               last.destroy();
            }
         }
         break;
      case 'save':
         game.movement = false;
         heal();
         const lines = [] as string[];
         const defaultLines = CosmosUtils.provide(saver.locations.of(game.room).text);
         if (world.population === 0 && (world.genocide || !world.bullied)) {
            lines.push(text.a_common.save2);
         } else if (
            game.room[0] !== '_' &&
            game.room[0] !== 'c' &&
            (world.genocide || (world.population < 6 && world.population < world.popmax_area() && ateThreshold()))
         ) {
            typer.variables.x = world.population.toString();
            lines.push(text.a_common.save1);
         } else {
            lines.push(...defaultLines);
         }
         if (lines.length > 0) {
            atlas.switch('dialoguerBottom');
            await dialogue_primitive(...lines);
         }
         atlas.switch('save');
         break;
      case 'teleport':
         await teleport(args[0] as string, args[1] as CosmosDirection, +args[2], +args[3], world);
         break;
      case 'trivia':
         if (game.room[0] === '_') {
            await trivia(
               ...CosmosUtils.provide(
                  text.a_common.trivia[args[0] as keyof typeof text.a_common.trivia],
                  renderer.layers.main.objects.includes(kiddo) && !kiddo.metadata.override
               )
            );
         }
         break;
   }
});

player.on('tick', function () {
   let dirty = false;
   if (!this.metadata.cache.init) {
      this.metadata.cache.init = true;
      dirty = true;
   }
   const home = SAVE.data.b.freedom;
   if (home !== this.metadata.cache.home) {
      this.metadata.cache.home = home;
      dirty = true;
   }
   const archive = stableRooms.includes(game.room);
   if (archive !== this.metadata.cache.archive) {
      this.metadata.cache.archive = archive;
      dirty = true;
   }
   const water = SAVE.data.b.water;
   if (water !== this.metadata.cache.water) {
      this.metadata.cache.water = water;
      dirty = true;
   }
   if (dirty) {
      if (home) {
         this.sprites = friskHome;
      } else if (water) {
         this.sprites = archive ? friskWaterArchive : friskWater;
      } else {
         this.sprites = archive ? friskArchive : frisk;
      }
   }
   if (game.room !== this.metadata.cache.room) {
      this.metadata.cache.room = game.room;
      const roomMeta = rooms.of(game.room).metadata;
      if (roomMeta.dark03) {
         this.tint = world.genocide || SAVE.data.b.svr || postSIGMA() ? tints.dark03 : void 0;
      } else if (roomMeta.dark02) {
         this.tint = tints.dark02;
      } else if (roomMeta.dark01) {
         this.tint = tints.dark01;
      } else if (game.room === 'c_courtroom' || game.room === 'c_archive_surface') {
         this.tint = 0;
      } else {
         if (game.room === 'f_view') {
            return;
         }
         this.tint = void 0;
      }
   }
});

export const genoDisplay = { state: false, dark: false, mus: false };

events.on('teleport', () => {
   SAVE.ready && updateMusic();
});

export default {};

CosmosUtils.status(`LOAD MODULE: COMMON AREA (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
