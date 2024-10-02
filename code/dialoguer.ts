import './init';

import './common/bootstrap';

import './outlands/bootstrap';

import './starton/bootstrap';

import './foundry/bootstrap';

import './aerialis/bootstrap';

import './citadel/bootstrap';

import { content, inventories } from './systems/assets';
import {
   atlas,
   backend,
   fullscreen,
   game,
   init,
   keys,
   param,
   params,
   reload_full,
   renderer,
   speech,
   typer
} from './systems/core';
import { panel } from './systems/developer';
import { keyState } from './systems/framework';
import { SAVE } from './systems/save';
import {
   CosmosAnimation,
   CosmosCache,
   CosmosInventory,
   CosmosMath,
   CosmosObject,
   CosmosRectangle,
   CosmosSprite,
   CosmosText,
   CosmosUtils
} from './systems/storyteller';

export type WhatevHistoryEntry = { idx: number; cur: number; text: string[] };

import.meta.hot?.on('vite:beforeFullReload', () => {
   throw '';
});

const whatev = {
   chapter: 0,
   history: [ { idx: 0, cur: 0, text: [] } ] as WhatevHistoryEntry[],
   get idx () {
      return whatev.history[whatev.chapter].idx;
   },
   set idx (v) {
      whatev.history[whatev.chapter].idx = v;
   },
   get cur () {
      return whatev.history[whatev.chapter].cur;
   },
   set cur (v) {
      whatev.history[whatev.chapter].cur = v;
   },
   get text () {
      return whatev.history[whatev.chapter].text;
   },
   read: false,
   get line () {
      return whatev.text[whatev.idx] ?? '';
   },
   set line (v) {
      whatev.text[whatev.idx] = v;
   },
   append (s: string) {
      const og = whatev.line;
      const old = whatev.entry();
      whatev.line = whatev.line.slice(0, whatev.cur) + s + whatev.line.slice(whatev.cur);
      whatev.cur += s.length;
      whatev.line === og || whatev.save(old);
      whatev.refresh();
   },
   remove (n: number) {
      const og = whatev.line;
      const old = whatev.entry();
      if (n < 0) {
         whatev.line = whatev.line.slice(0, whatev.cur) + whatev.line.slice(whatev.cur - n);
      } else {
         whatev.line = whatev.line.slice(0, Math.max(whatev.cur - n, 0)) + whatev.line.slice(whatev.cur);
         whatev.cur = Math.max(whatev.cur - 1, 0);
      }
      whatev.line === og || whatev.save(old);
      whatev.refresh();
   },
   refresh () {
      game.text = '';
      typer.text(...whatev.text.slice(0, whatev.idx + 1));
      let idx = whatev.idx;
      while (idx > 0) {
         typer.read(true);
         idx--;
      }
   },
   save (old: WhatevHistoryEntry) {
      whatev.history.splice(
         0,
         whatev.history.length,
         ...whatev.history.slice(0, whatev.chapter),
         whatev.entry(),
         ...whatev.history.slice(whatev.chapter)
      );
      whatev.text.splice(0, whatev.text.length, ...old.text);
      if (whatev.history.length > 100) {
         whatev.history.shift();
      } else {
         whatev.chapter++;
      }
   },
   entry (): WhatevHistoryEntry {
      return { idx: whatev.idx, cur: whatev.cur, text: [ ...whatev.text ] };
   },
   validate (value: string) {
      const result = eval(value);
      if (result && result instanceof Array && result.length !== 0) {
         return result.map(line => (typeof line === 'string' ? line : ''));
      } else {
         return [ '' ];
      }
   }
};

addEventListener('keydown', event => {
   event.preventDefault();
   switch (event.code) {
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
      case 'KeyF':
         if (event.ctrlKey) {
            panel.activate();
            return;
         }
         break;
      case 'KeyR':
         if (event.ctrlKey) {
            reload_full();
            return;
         }
         break;
      case 'KeyC':
         if (event.ctrlKey) {
            navigator.clipboard.writeText(JSON.stringify(whatev.text));
            return;
         } else if (event.altKey) {
            navigator.clipboard.writeText(JSON.stringify([ whatev.text[whatev.idx] ]));
            return;
         }
         break;
      case 'KeyV':
         if (event.ctrlKey) {
            navigator.clipboard.readText().then(v => {
               whatev.idx = 0;
               whatev.cur = 0;
               whatev.text.splice(0, whatev.text.length, ...whatev.validate(v));
               whatev.refresh();
            });
            return;
         } else if (event.altKey) {
            navigator.clipboard.readText().then(v => {
               const old = whatev.entry();
               const data = whatev.validate(v) as string[];
               whatev.text.splice(
                  0,
                  whatev.text.length,
                  ...whatev.text.slice(0, whatev.idx),
                  ...data,
                  ...whatev.text.slice(whatev.idx)
               );
               whatev.idx += data.length;
               whatev.save(old);
               whatev.refresh();
            });
            return;
         }
         break;
      case 'KeyX':
         if (whatev.read) {
            typer.skip();
            return;
         } else if (event.ctrlKey) {
            whatev.text.splice(0, whatev.text.length, '');
            whatev.refresh();
            return;
         } else if (event.altKey) {
            navigator.clipboard.writeText(JSON.stringify([ whatev.text[whatev.idx] ]));
            const old = whatev.entry();
            whatev.text.splice(
               0,
               whatev.text.length,
               ...whatev.text.slice(0, whatev.idx),
               ...whatev.text.slice(whatev.idx + 1)
            );
            whatev.idx = Math.max(whatev.idx - 1, 0);
            whatev.save(old);
            whatev.refresh();
            return;
         }
         break;
      case 'KeyZ':
         if (whatev.read) {
            typer.read();
            return;
         } else if (event.ctrlKey) {
            whatev.chapter = Math.max(whatev.chapter - 1, 0);
            whatev.refresh();
            return;
         }
         break;
      case 'Enter':
         whatev.read || whatev.append('\n');
         return;
      case 'KeyY':
         if (event.ctrlKey) {
            whatev.chapter = Math.min(whatev.chapter + 1, whatev.history.length - 1);
            whatev.refresh();
            return;
         }
         break;
      case 'Backspace':
         whatev.read || whatev.remove(1);
         return;
      case 'Delete':
         whatev.read || whatev.remove(-1);
         break;
      case 'ArrowRight':
         if (!whatev.read) {
            if (event.shiftKey) {
               const idx = speech.state.preset.faces.indexOf(speech.state.face);
               const og = whatev.line;
               const old = whatev.entry();
               whatev.line = whatev.line.replace(
                  `{#f/${idx}}`,
                  `{#f/${Math.min(idx + 1, speech.state.preset.faces.length - 1)}}`
               );
               whatev.line === og || whatev.save(old);
               whatev.refresh();
            } else {
               whatev.cur < whatev.text[whatev.idx].length && whatev.cur++;
            }
         }
         return;
      case 'ArrowLeft':
         if (!whatev.read) {
            if (event.shiftKey) {
               const idx = speech.state.preset.faces.indexOf(speech.state.face);
               const og = whatev.line;
               const old = whatev.entry();
               whatev.line = whatev.line.replace(`{#f/${idx}}`, `{#f/${Math.max(idx - 1, 0)}}`);
               whatev.line === og || whatev.save(old);
               whatev.refresh();
            } else {
               whatev.cur > 0 && whatev.cur--;
            }
         }
         return;
      case 'ArrowUp':
         if (!whatev.read) {
            whatev.idx > 0 && whatev.idx--;
            whatev.cur = Math.min(whatev.cur, whatev.line.length);
            whatev.refresh();
         }
         break;
      case 'ArrowDown':
         if (!whatev.read) {
            whatev.idx < whatev.text.length && whatev.idx++;
            whatev.cur = Math.min(whatev.cur, whatev.line.length);
            if (whatev.line === '' && whatev.idx > 0) {
               const ln = whatev.text[whatev.idx - 1];
               if (ln[0] === '<') {
                  const pr = [ ...speech.presets.entries() ].find(([ key, value ]) => value === speech.state.preset);
                  if (pr !== void 0) {
                     const og = whatev.line;
                     const old = whatev.entry();
                     whatev.line = `${ln.split('>')[0]}>{#p/${pr[0]}}{#f/${Math.max(
                        speech.state.preset.faces.indexOf(speech.state.face_value),
                        0
                     )}}`;
                     whatev.line === og || whatev.save(old);
                     whatev.refresh();
                  }
               }
            }
            whatev.refresh();
         }
         break;
      case 'Tab':
         whatev.read = true;
         typer.text(...whatev.text);
         break;
      case 'Escape':
         whatev.read && (whatev.read = false);
         break;
   }
   whatev.read || (event.key.length === 1 && whatev.append(event.key));
});

renderer.on('tick', {
   priority: Number.MIN_SAFE_INTEGER,
   listener () {
      keyState.down = keys.downKey.active();
      keyState.interact = keys.interactKey.active();
      keyState.left = keys.leftKey.active();
      keyState.menu = keys.menuKey.active();
      keyState.right = keys.rightKey.active();
      keyState.special = keys.specialKey.active();
      keyState.up = keys.upKey.active();
   }
});

renderer.on('pre-render', {
   priority: Number.MIN_SAFE_INTEGER,
   listener () {
      this.freecam || this.position.set(game.camera);
   }
});

addEventListener('resize', () => {
   game.resize();
});

Object.assign(globalThis, { whatev, typer });

(async () => {
   params.has('xxx') && param('xxx');
   await new CosmosInventory(
      inventories.idcAlphys,
      inventories.idcAsgore,
      inventories.idcAsriel,
      inventories.idcAsrielTrue,
      inventories.idcKidd,
      inventories.idcSans,
      inventories.lazyAssets,
      inventories.avMettaton,
      inventories.avTem,
      content.avAlphys,
      content.avAsriel,
      content.avAsriel2,
      content.avAsriel3,
      content.avAsriel4,
      content.avSans,
      content.avUndyneex,
      content.avTwinkly1,
      content.avTwinkly2,
      content.avNapstablook,
      content.ieSplashBackground,
      inventories.ibcPapyrusHead,
      content.fComicSans,
      content.fDeterminationMono,
      content.fPapyrus
   ).load();
   document.querySelector('#splash')?.removeAttribute('visible');
   if (params.has('developer')) {
      panel.start();
   } else {
      game.resize();
   }
   init();
   atlas.switch('dialoguerTop');
   renderer.attach(
      'menu',
      new CosmosText({
         fontFamily: content.fDeterminationMono,
         fontSize: 8,
         position: { x: 5, y: 84.5 },
         fill: 0xffffff,
         spacing: { y: 1 }
      }).on('tick', function () {
         if (whatev.read) {
            this.content = '';
            return;
         }
         const lines = whatev.text.length === 0 ? [ '' ] : whatev.text;
         this.content = [
            ...lines.slice(Math.max(whatev.idx - 7, 0), whatev.idx),
            ...lines.slice(whatev.idx, whatev.idx + Math.max(15 - whatev.idx, 7))
         ]
            .map((line, idx) => {
               line = line.replace(/\n/g, '\\');
               if (idx === Math.min(whatev.idx, 7)) {
                  line = `  §fill=#f00§${line.slice(Math.max(whatev.cur - 37, 0), whatev.cur)}§fill=#fff§${line.slice(
                     whatev.cur
                  )}`;
               } else {
                  line = `§fill=#808080§${line}`;
               }
               return line;
            })
            .join('\n');
      }),
      new CosmosObject({
         position: { x: 160, y: 221 },
         metadata: {
            faces: new CosmosCache((face: CosmosSprite) =>
               face instanceof CosmosAnimation
                  ? new CosmosAnimation({ anchor: 0, scale: 0.5, resources: face.resources })
                  : new CosmosSprite({ anchor: 0, scale: 0.5, frames: face.frames })
            )
         }
      }).on('tick', function () {
         if (whatev.read) {
            this.objects = [];
            return;
         }
         const idx = Math.max(speech.state.preset.faces.indexOf(speech.state.face_value), 0);
         const idx_base = Math.max(idx - 4, 0);
         this.objects = speech.state.preset.faces.slice(idx_base, idx_base + 9).map((face, index) => {
            const cur = idx_base + index === idx;
            const spr = face === null ? null : this.metadata.faces.of(face);
            spr === null || (spr.tint = cur ? void 0 : 0x808080);
            return new CosmosRectangle({
               anchor: 0,
               stroke: cur ? 0xffffff : 0x808080,
               border: 0.5,
               position: { x: CosmosMath.spread_quantize(155, index, 9) },
               size: 30,
               objects: spr === null ? [] : [ spr ]
            });
         });
      })
   );
   SAVE.ready = true;
   try {
      //@ts-ignore
      whatev.text.splice(0, whatev.text.length, ...whatev.validate(SAVE.flag.s.$amazig));
      whatev.refresh();
   } catch {}
   renderer.on('tick', function () {
      //@ts-ignore
      SAVE.flag.s.$amazig = JSON.stringify(whatev.text);
   });
   CosmosUtils.status(`OUTERTALE INITIALIZED (${Math.floor(performance.now()) / 1000})`, { color: '#fff' });
})();

CosmosUtils.status(`LOAD MODULE: INDEX (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
