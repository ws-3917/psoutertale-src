import './init';

import './common/bootstrap';

import './outlands/bootstrap';

import './starton/bootstrap';

import './foundry/bootstrap';

import './aerialis/bootstrap';

import './citadel/bootstrap';

import { Graphics } from 'pixi.js';
import { content, context } from './systems/assets';
import { backend, fullscreen, game, init, keys, param, params, reload_full, renderer, typer } from './systems/core';
import { panel } from './systems/developer';
import { keyState } from './systems/framework';
import { SAVE } from './systems/save';
import {
   CosmosAudio,
   CosmosDaemon,
   CosmosImageUtils,
   CosmosInstance,
   CosmosInventory,
   CosmosMath,
   CosmosObject,
   CosmosRectangle,
   CosmosText,
   CosmosUtils
} from './systems/storyteller';

import.meta.hot?.on('vite:beforeFullReload', () => {
   throw '';
});

const analyser = new AnalyserNode(context);
analyser.connect(context.destination);
analyser.fftSize = 2048;
const sampleBuffer = new Float32Array(analyser.fftSize);

const whatev = {
   target: 0,
   inst: null as null | CosmosInstance,
   audios: Object.entries(content).filter(entry => entry[1] instanceof CosmosAudio) as [string, CosmosAudio][],
   inv: [] as CosmosInventory<CosmosAudio[]>[],
   offsets: [] as number[],
   get my () {
      return whatev.audios[whatev.target];
   },
   play (offset: number | void) {
      offset ??= whatev.offsets[whatev.target] ?? 0;
      whatev.inst?.stop();
      if (whatev.my[1].loaded) {
         whatev.inst = new CosmosDaemon(whatev.my[1], {
            context,
            router: (input: AudioNode) => {
               input.connect(analyser);
            }
         }).instance(renderer, Math.min(Math.max(offset, 0), whatev.my[1].value.duration));
      } else {
         whatev.inst = null;
      }
   },
   timeDisplay (pos: number) {
      return `${Math.floor(pos / 60)
         .toString()
         .padStart(2, '0')}:${Math.floor(pos % 60)
         .toString()
         .padStart(2, '0')}.${(Math.floor((pos % 1) * 100) / 100).toString().slice(2).padEnd(2, '0')}`;
   },
   validate (value: string) {
      const result = eval(value);
      if (result && typeof result === 'object') {
         return result;
      } else {
         return {};
      }
   }
};

for (const index of whatev.audios.keys()) {
   whatev.inv.push(new CosmosInventory(...whatev.audios.slice(Math.max(index - 4, 0), index + 5).map(aud => aud[1])));
}

addEventListener('keydown', event => {
   event.preventDefault();
   switch (event.code) {
      case 'F4':
      case 'F11':
         if (backend === null) {
            fullscreen();
         }
         break;
      case 'F12':
      case 'Backslash':
         if (panel.active) {
            backend?.exec('devtools', true);
         }
         break;
      case 'KeyF':
         if (event.ctrlKey) {
            panel.activate();
         }
         break;
      case 'KeyR':
         if (event.ctrlKey) {
            reload_full();
         }
         break;
      case 'KeyC':
         if (event.ctrlKey) {
            navigator.clipboard.writeText(
               JSON.stringify(Object.fromEntries(whatev.audios.map(aud => [ aud[0], aud[1].gain ] as [string, number])))
            );
         }
         break;
      case 'KeyV':
         if (event.ctrlKey) {
            navigator.clipboard.readText().then(v => {
               const values = whatev.validate(v);
               for (const entry of whatev.audios) {
                  entry[1].gain = values[entry[0]] ?? 1;
               }
            });
         }
         break;
      case 'ArrowRight':
         whatev.my[1].gain += 0.05;
         whatev.my[1].gain = Math.round(whatev.my[1].gain * 100) / 100;
         whatev.inst && (whatev.inst.gain.value = 1);
         return;
      case 'ArrowLeft':
         whatev.my[1].gain -= 0.05;
         whatev.my[1].gain = Math.round(whatev.my[1].gain * 100) / 100;
         whatev.my[1].gain < 0 && (whatev.my[1].gain = 0);
         whatev.inst && (whatev.inst.gain.value = 1);
         return;
      case 'ArrowUp': {
         const prev = whatev.inv[whatev.target];
         --whatev.target < 0 && (whatev.target = 0);
         const next = whatev.inv[whatev.target];
         if (prev !== next) {
            next.load();
            prev.unload();
         }
         whatev.play();
         break;
      }
      case 'ArrowDown':
         const prev = whatev.inv[whatev.target];
         whatev.audios.length <= ++whatev.target && (whatev.target = whatev.audios.length - 1);
         const next = whatev.inv[whatev.target];
         if (prev !== next) {
            next.load();
            prev.unload();
         }
         whatev.play();
         break;
      case 'Enter':
         whatev.play();
         break;
      case 'Tab':
         whatev.play((whatev.inst?.position ?? 0) + (event.shiftKey ? -10 : 10));
         break;
   }
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
   await new CosmosInventory(content.fDeterminationMono, whatev.inv[0]).load();
   document.querySelector('#splash')?.removeAttribute('visible');
   if (params.has('developer')) {
      panel.start();
   } else {
      game.resize();
   }
   init();
   renderer.attach(
      'menu',
      ...CosmosUtils.populate(15, i =>
         new CosmosText({
            fontFamily: content.fDeterminationMono,
            fontSize: 16,
            position: { x: 160, y: 120 + CosmosMath.spread_quantize(120, i, 15) },
            anchor: 0,
            spacing: { y: 1 }
         }).on('tick', function () {
            const audIndex = whatev.target + (i - 6);
            if (0 <= audIndex && audIndex < whatev.audios.length) {
               this.alpha.value = 1;
               const aud = whatev.audios[audIndex];
               if (aud[1].loaded) {
                  this.fill = i === 6 ? 0x00ff00 : 0x008000;
               } else {
                  this.fill = i === 6 ? 0x808080 : 0x404040;
               }
               this.content = `${aud[0]}: ${aud[1].gain}`;
            } else {
               this.alpha.value = 0;
            }
         })
      ),
      new CosmosRectangle({
         fill: 0,
         alpha: 0.6,
         size: { x: 320, y: 20 },
         position: { x: 160 },
         anchor: { x: 0 }
      }),
      new CosmosText({
         position: { x: 160, y: 5 },
         anchor: { x: 0 },
         fill: 0xffffff,
         fontFamily: content.fDeterminationMono,
         fontSize: 16
      }).on('tick', function () {
         const inst = whatev.inst;
         if (inst) {
            this.content = `${whatev.timeDisplay(inst.position)} / ${whatev.timeDisplay(
               inst.source!.buffer?.duration ?? 0
            )}`;
         }
      }),
      new CosmosRectangle({
         fill: 0,
         alpha: 0.6,
         size: { x: 320, y: 20 },
         position: { x: 160, y: 240 },
         anchor: { x: 0, y: 1 }
      }),
      new CosmosObject({
         position: { x: 160, y: 235 },
         metadata: { g: new Graphics(), gx: false }
      }).on('tick', function () {
         const g = this.metadata.g;
         if (!this.metadata.gx) {
            this.metadata.gx = true;
            this.container.addChild(g);
         }

         analyser.getFloatTimeDomainData(sampleBuffer);
         let peak = 0;
         for (let i = 0; i < sampleBuffer.length; i++) {
            const power = sampleBuffer[i] ** 2;
            peak = Math.max(power, peak);
         }
         const w = CosmosMath.remap_clamped(10 * Math.log10(peak), 0, 1, -30, 10);
         g.clear()
            .beginFill(0xffffff)
            .drawRect(-150, -5, 300, 10)
            .endFill()
            .beginFill(0)
            .drawRect(-149, -4, 298, 8)
            .endFill()
            .beginFill(CosmosImageUtils.gradient(0x00ff00, 0xff0000, w))
            .drawRect(-148, -3, 296 * w, 6)
            .endFill();
      })
   );
   SAVE.ready = true;
   try {
      //@ts-ignore
      const values = JSON.parse(SAVE.flag.s.$amazig2);
      for (const entry of whatev.audios) {
         entry[1].gain = values[entry[0]] ?? 1;
      }
      whatev.play();
   } catch {}
   renderer.on('tick', function () {
      whatev.inst && (whatev.offsets[whatev.target] = whatev.inst.position);
      //@ts-ignore
      SAVE.flag.s.$amazig2 = JSON.stringify(
         Object.fromEntries(whatev.audios.map(aud => [ aud[0], aud[1].gain ] as [string, number]))
      );
   });
   CosmosUtils.status(`OUTERTALE INITIALIZED (${Math.floor(performance.now()) / 1000})`, { color: '#fff' });
})();

CosmosUtils.status(`LOAD MODULE: INDEX (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
