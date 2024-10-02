import './init';

import { colord } from '@pixi/colord';
import { AdvancedBloomFilter } from '@pixi/filter-advanced-bloom';
import { CRTFilter } from '@pixi/filter-crt';
import { DropShadowFilter } from '@pixi/filter-drop-shadow';
import { GlitchFilter } from '@pixi/filter-glitch';
import { GlowFilter } from '@pixi/filter-glow';
import { GodrayFilter } from '@pixi/filter-godray';
import { HslAdjustmentFilter } from '@pixi/filter-hsl-adjustment';
import { MotionBlurFilter } from '@pixi/filter-motion-blur';
import { OutlineFilter } from '@pixi/filter-outline';
import { PixelateFilter } from '@pixi/filter-pixelate';
import { RGBSplitFilter } from '@pixi/filter-rgb-split';
import { ZoomBlurFilter } from '@pixi/filter-zoom-blur';
import { default as fileDialog } from 'file-dialog';
import { default as objectInspect } from 'object-inspect';
import {
   AlphaFilter,
   Application,
   BLEND_MODES,
   BaseTexture,
   BitmapFont,
   Color,
   ColorMatrixFilter,
   Container,
   Extract,
   Filter,
   Graphics,
   MIPMAP_MODES,
   MSAA_QUALITY,
   PRECISION,
   Program,
   Rectangle,
   Renderer,
   SCALE_MODES,
   Sprite,
   TextMetrics,
   TextStyle,
   Texture,
   Ticker,
   UPDATE_PRIORITY,
   isMobile
} from 'pixi.js';
import { Polygon, Vector, pointInPolygon, testPolygonPolygon } from 'sat';
import * as assets from './systems/assets';
import * as core from './systems/core';
import * as developer from './systems/developer';
import * as framework from './systems/framework';
import * as outertale from './systems/outertale';
import * as save from './systems/save';
import * as storyteller from './systems/storyteller';
import * as language from './systems/translator';

import * as commonAPI from './common/api';

import * as outlandsAPI from './outlands/api';

import * as startonAPI from './starton/api';

import * as foundryAPI from './foundry/api';

import * as aerialisAPI from './aerialis/api';

import * as citadelAPI from './citadel/api';

import aerialisText from '../languages/default/text/aerialis';
import citadelText from '../languages/default/text/citadel';
import commonText from '../languages/default/text/common';
import foundryText from '../languages/default/text/foundry';
import outlandsText from '../languages/default/text/outlands';
import startonText from '../languages/default/text/starton';
import systemsText from '../languages/default/text/systems';
import aerialisGroups from './aerialis/groups';
import aerialisIndex from './aerialis/index';
import aerialisOpponents from './aerialis/opponents';
import aerialisPatterns from './aerialis/patterns';
import citadelGroups from './citadel/groups';
import citadelIndex from './citadel/index';
import citadelOpponents from './citadel/opponents';
import citadelPatterns from './citadel/patterns';
import commonGroups from './common/groups';
import commonIndex from './common/index';
import commonOpponents from './common/opponents';
import commonPatterns from './common/patterns';
import foundryGroups from './foundry/groups';
import foundryIndex from './foundry/index';
import foundryOpponents from './foundry/opponents';
import foundryPatterns from './foundry/patterns';
import outlandsGroups from './outlands/groups';
import outlandsIndex from './outlands/index';
import outlandsOpponents from './outlands/opponents';
import outlandsPatterns from './outlands/patterns';
import startonGroups from './starton/groups';
import startonIndex from './starton/index';
import startonOpponents from './starton/opponents';
import startonPatterns from './starton/patterns';

// import '../languages/ru_RU/index';
// import '../languages/tr_TR/index';
// import '../languages/zh_CN/index';
// import '../languages/zh_CN/index-alt';
// import '../languages/zh_TW/index';
// import '../languages/zh_TW/index-alt';

export type OutertaleMod = (mod: string, api: typeof apiValue) => any;

const apiValue = {
   AdvancedBloomFilter,
   AlphaFilter,
   Application,
   BaseTexture,
   BitmapFont,
   BLEND_MODES,
   Color,
   colord,
   ColorMatrixFilter,
   Container,
   CRTFilter,
   DropShadowFilter,
   Extract,
   fileDialog,
   Filter,
   GlitchFilter,
   GlowFilter,
   GodrayFilter,
   Graphics,
   HslAdjustmentFilter,
   isMobile,
   MIPMAP_MODES,
   MotionBlurFilter,
   MSAA_QUALITY,
   objectInspect,
   OutlineFilter,
   PixelateFilter,
   pointInPolygon,
   Polygon,
   PRECISION,
   Program,
   Rectangle,
   Renderer,
   RGBSplitFilter,
   SCALE_MODES,
   Sprite,
   testPolygonPolygon,
   TextMetrics,
   TextStyle,
   Texture,
   Ticker,
   UPDATE_PRIORITY,
   Vector,
   ZoomBlurFilter,
   ...assets,
   ...core,
   ...developer,
   ...framework,
   ...outertale,
   ...save,
   ...storyteller,
   ...language,
   ...commonAPI,
   ...outlandsAPI,
   ...startonAPI,
   ...foundryAPI,
   ...aerialisAPI,
   ...citadelAPI,
   groups: {
      ...commonGroups,
      ...outlandsGroups,
      ...startonGroups,
      ...foundryGroups,
      ...aerialisGroups,
      ...citadelGroups
   },
   opponents: {
      ...commonOpponents,
      ...outlandsOpponents,
      ...startonOpponents,
      ...foundryOpponents,
      ...aerialisOpponents,
      ...citadelOpponents
   },
   patterns: {
      ...commonPatterns,
      ...outlandsPatterns,
      ...startonPatterns,
      ...foundryPatterns,
      ...aerialisPatterns,
      ...citadelPatterns
   },
   shops: {
      ...commonIndex,
      ...outlandsIndex,
      ...startonIndex,
      ...foundryIndex,
      ...aerialisIndex,
      ...citadelIndex
   },
   text: {
      ...systemsText,
      ...commonText,
      ...outlandsText,
      ...startonText,
      ...foundryText,
      ...aerialisText,
      ...citadelText
   }
};

const {
   CosmosUtils,
   SAVE,
   atlas,
   backend,
   battler,
   dialog,
   events,
   freetext,
   fullscreen,
   game,
   gamepadder,
   godhome,
   inventories,
   keyState,
   keys,
   launch,
   logician,
   panel,
   param,
   params,
   reload,
   renderer,
   saveSelector,
   saver,
   spawn,
   translator
} = apiValue;

const inputState = {
   code: '',
   hyper: () => keys.altKey.active() || ((!SAVE.ready || atlas.target === 'frontEndSettings') && keys.menuKey.active())
};

const viteError = new Error();

function errorHandler (error: any) {
   if (
      error === viteError ||
      `${error}`.includes('fullscreen error') ||
      `${error}`.includes('Permissions check failed')
   ) {
      return false;
   } else {
      // comment this line to disable error popups
      logician.suspend(error);
      return true;
   }
}

async function fileOpen () {
   const content = await dialog.open(systemsText.dialog.dialog_open);
   if (typeof content === 'string') {
      try {
         const entries = SAVE.parse(content);
         const { name, room } = SAVE.strings(entries.find(entry => entry[0] === SAVE.canon)?.[1]);
         if (
            (await dialog.message(false, 'confirm', {
               buttons: systemsText.dialog.message_confirm,
               title: systemsText.dialog.dialog_open.title,
               message: `${systemsText.dialog.prompt_open}\n${
                  name || systemsText.general.unknown
               } @ ${CosmosUtils.provide(saver.locations.of(room || spawn).name)}`
            })) === 1
         ) {
            saver.time_but_real.active = false;
            for (const key of SAVE.keys()) {
               key === 'ERRORCODE' ||
                  (key.startsWith(SAVE.safespace) && !SAVE.semisafe.includes(key.slice(SAVE.safespace.length))) ||
                  SAVE.manager.removeItem(key);
            }
            for (const [ key, value ] of entries) {
               key === 'ERRORCODE' ||
                  (key.startsWith(SAVE.safespace) && !SAVE.semisafe.includes(key.slice(SAVE.safespace.length))) ||
                  SAVE.manager.setItem(key, value);
            }
            backend?.writeSave(SAVE.serialize());
            param('namespace');
            reload();
         }
      } catch {
         dialog.message(true, 'alert', {
            buttons: systemsText.dialog.message_alert,
            title: systemsText.dialog.dialog_open.title,
            message: systemsText.dialog.error_load
         });
      }
   }
}

async function fileReset () {
   const { name, room } = SAVE.strings(SAVE.manager.getItem(SAVE.canon));
   if (
      (await dialog.message(false, 'confirm', {
         buttons: systemsText.dialog.message_confirm,
         title: systemsText.dialog.dialog_clear_title,
         message: `${systemsText.dialog.prompt_clear}\n${name || systemsText.general.unknown} @ ${CosmosUtils.provide(
            saver.locations.of(room || spawn).name
         )}`
      })) === 1
   ) {
      saver.time_but_real.active = false;
      for (const key of SAVE.keys()) {
         key === 'ERRORCODE' ||
            (key.startsWith(SAVE.safespace) && !SAVE.semisafe.includes(key.slice(SAVE.safespace.length))) ||
            SAVE.manager.removeItem(key);
      }
      backend?.writeSave(SAVE.serialize());
      param('namespace');
      reload();
   }
}

async function fileSave () {
   if (isMobile.any) {
      prompt(systemsText.dialog.prompt_save_alternate, SAVE.serialize());
   } else {
      const { name, room } = SAVE.strings(SAVE.manager.getItem(SAVE.canon));
      if (
         (await dialog.message(false, 'confirm', {
            buttons: systemsText.dialog.message_confirm,
            title: systemsText.dialog.dialog_save.title,
            message: `${systemsText.dialog.prompt_save}\n${name || systemsText.general.unknown} @ ${CosmosUtils.provide(
               saver.locations.of(room || spawn).name
            )}`
         })) === 1
      ) {
         dialog.save(SAVE.serialize(true), systemsText.dialog.dialog_save);
      }
   }
}

function inputHandler (key: string) {
   if (key !== '' && inputState.hyper()) {
      switch ((inputState.code += key)) {
         case 'll':
            panel.activate();
            return false;
         case 'rr':
            saver.time_but_real.stop();
            reload(true, false);
            return false;
         case 'uu':
            fileOpen();
            return false;
         case 'ud':
            fileReset();
            return false;
         case 'dd':
            fileSave();
            return false;
      }
      return false;
   } else {
      return game.input && game.interact && atlas.target !== null && (!game.movement || battler.active);
   }
}

import.meta.hot?.on('vite:beforeFullReload', () => {
   throw viteError;
});

keys.altKey.on('up', () => (inputState.code = ''));
keys.downKey.on('down', () => inputHandler('d') && atlas.seek('down'));
keys.interactKey.on('down', () => inputHandler('') && atlas.next());
keys.leftKey.on('down', () => inputHandler('l') && atlas.seek('left'));
keys.menuKey.on('up', () => (!SAVE.ready || atlas.target === 'frontEndSettings') && (inputState.code = ''));
keys.rightKey.on('down', () => inputHandler('r') && atlas.seek('right'));
keys.specialKey.on('down', () => inputHandler('') && atlas.prev());
keys.upKey.on('down', () => inputHandler('u') && atlas.seek('up'));

renderer.on('tick', {
   priority: Number.MIN_SAFE_INTEGER,
   listener () {
      if (inputState.hyper()) {
         keyState.down = false;
         keyState.interact = false;
         keyState.left = false;
         keyState.menu = false;
         keyState.right = false;
         keyState.special = false;
         keyState.up = false;
      } else {
         keyState.down = keys.downKey.active();
         keyState.interact = keys.interactKey.active();
         keyState.left = keys.leftKey.active();
         keyState.menu = keys.menuKey.active();
         keyState.right = keys.rightKey.active();
         keyState.special = keys.specialKey.active();
         keyState.up = keys.upKey.active();
      }
   }
});

renderer.on('pre-render', {
   priority: Number.MIN_SAFE_INTEGER,
   listener () {
      this.freecam || this.position.set(game.camera);
   }
});

addEventListener('click', () => {
   freetext.active && freetext.input.focus();
});

addEventListener('keydown', event => {
   switch (event.code) {
      case 'Enter':
         freetext.active && !freetext.warmup && freetext.atlas.next();
         break;
      case 'Escape':
         freetext.active && !freetext.warmup && freetext.atlas.prev();
         break;
      case 'F4':
      case 'F11':
         if (backend === null) {
            fullscreen();
            return;
         }
         break;
      case 'F12':
      case 'Backslash':
         if (panel.active) {
            backend?.exec('devtools', true);
            return;
         }
         break;
   }
   freetext.active && freetext.input.focus();
   if (!freetext.active || event.altKey || event.ctrlKey || event.metaKey) {
      event.preventDefault();
   }
});

addEventListener('resize', () => {
   game.resize();
});

addEventListener('touchstart', () => {
   freetext.active && freetext.input.focus();
});

addEventListener('error', event => {
   errorHandler(event.error) && event.preventDefault();
});

addEventListener('unhandledrejection', event => {
   errorHandler(event.reason) && event.preventDefault();
});

addEventListener('beforeunload', () => {
   saver.time_but_real.stop();
});

(async () => {
   params.has('xxx') && param('xxx');
   await Promise.all(
      [
         ...CosmosUtils.parse<string[]>(
            params.has('modscript')
               ? decodeURIComponent(params.get('modscript') ?? '')
               : SAVE.manager.getItem('MODSCRIPT'),
            []
         ).map((script, index) => [ `modscript:${index}`, `data:text/javascript,${script}` ]),
         ...(backend?.mods() ?? []).map(name => [ `mods:${name}`, `mods:${name}/index.js?${Math.random()}` ])
      ].map(async ([ name, source ]) => {
         try {
            return [ name, await import(/* @vite-ignore */ source) ] as [string, any];
         } catch (error) {
            console.trace(error);
            backend?.exec('devtools', true);
            return [ name, null ] as [string, null];
         }
      })
   ).then(entries =>
      Promise.all(
         entries.map(async ([ name, value ]) => {
            if (value) {
               try {
                  await Promise.all(events.fire('loaded-mod', name, await value.default?.(name, apiValue)));
               } catch (error) {
                  console.trace(error);
                  backend?.exec('devtools', true);
               }
            }
         })
      )
   );
   await Promise.all(events.fire('modded'));
   document.querySelector('#splash')?.removeAttribute('visible');
   game.resize();
   SAVE.flag.s.$option_language === '' && (await framework.langSelector());
   translator.updateLanguage(SAVE.flag.s.$option_language || 'default');
   document.title =
      params.get('namespace') || SAVE.canon === SAVE.canon ? systemsText.extra.title : systemsText.extra.title_timeline;
   await Promise.all(events.fire('titled'));
   const demo = 'OUTERTALE';
   const data = CosmosUtils.parse<{ s?: Partial<save.OutertaleDataString> }>(SAVE.manager.getItem(demo), {});
   if (typeof data.s?.name === 'string') {
      const list = CosmosUtils.parse<[number, string][]>(SAVE.manager.getItem(SAVE.timelines), []);
      let index = 0;
      const indices = list.map(value => value[0]);
      while (indices.includes(index)) {
         index++;
      }
      list.push([ index, data.s.name ]);
      delete data.s.name;
      const namespace = `TIMELINES~${index}`;
      for (const key of SAVE.keys()) {
         if (key === demo) {
            SAVE.manager.setItem(namespace, CosmosUtils.serialize(data));
         } else if (key.startsWith(demo)) {
            SAVE.manager.setItem(namespace + key.slice(9), SAVE.manager.getItem(key)!);
         } else {
            continue;
         }
         SAVE.manager.removeItem(key);
      }
      SAVE.manager.setItem(SAVE.timelines, CosmosUtils.serialize(list));
      dialog.message(false, 'alert', {
         buttons: systemsText.dialog.message_alert,
         title: systemsText.dialog.dialog_notice_title,
         message: `${systemsText.dialog.prompt_demo}`
      });
   }
   await inventories.fontAssets.load();
   panel.ready = true;
   params.has('developer') && panel.start();
   const gp = [ ...navigator.getGamepads() ].find(value => value instanceof Gamepad);
   gp !== void 0 && gp !== null && gamepadder.connect(gp);
   if (
      launch.timeline &&
      (SAVE.manager.getItem(SAVE.canon) !== null ||
         CosmosUtils.parse<[number, string][]>(SAVE.manager.getItem(SAVE.timelines), []).length !== 0)
   ) {
      await saveSelector();
   } else {
      param('namespace', SAVE.namespace);
   }
   SAVE.state = CosmosUtils.parse(SAVE.manager.getItem(SAVE.namespace), {});
   SAVE.ready = true;
   saver.time_but_real.value = SAVE.flag.n.time;
   saver.time_but_real.ticker.add(
      delta => {
         saver.time_but_real.update(delta);
      },
      void 0,
      UPDATE_PRIORITY.UTILITY
   );
   saver.time_but_real.ticker.start();
   await Promise.all(events.fire('loaded'));
   saver.time = SAVE.data.n.time;
   godhome.room = SAVE.data.s.room;
   launch.intro && (await Promise.all(events.fire('init-intro')));
   await Promise.all(events.fire('init-between'));
   launch.overworld && (await Promise.all(events.fire('init-overworld')));
   game.input = true;
   game.active = true;
   game.timer = true;
   await Promise.all(events.fire('ready'));
   CosmosUtils.status(`OUTERTALE INITIALIZED (${Math.floor(performance.now()) / 1000})`, { color: '#fff' });
})();

CosmosUtils.status(`LOAD MODULE: INDEX (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
