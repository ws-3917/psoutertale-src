import fileDialog from 'file-dialog';
import { Rectangle } from 'pixi.js';
import {
   OutertaleChoice,
   OutertaleLayerKey,
   OutertaleMap,
   OutertaleRoom,
   OutertaleSpeechPreset,
   OutertaleVolatile
} from './outertale';
import {
   CosmosAtlas,
   CosmosDaemon,
   CosmosDirection,
   CosmosEventHost,
   CosmosHitbox,
   CosmosImage,
   CosmosInstance,
   CosmosKeyboardInput,
   CosmosKeyed,
   CosmosObject,
   CosmosPointSimple,
   CosmosProvider,
   CosmosRegistry,
   CosmosRenderer,
   CosmosSprite,
   CosmosTyper,
   CosmosUtils,
   CosmosValueRandom
} from './storyteller';

export const atlas = new CosmosAtlas();

export const backend = typeof ___spacetime___ === 'object' ? ___spacetime___ : null;

export const dialog = {
   async message (
      error: boolean,
      type: 'alert' | 'confirm',
      display: { buttons: string[]; message: string; title: string }
   ): Promise<number> {
      return backend?.exec('dialog.message', error, display) ?? (window[type](display.message) ? 1 : 0);
   },
   async open (display: { buttonLabel: string; name: string; title: string }): Promise<string | null> {
      return backend?.exec('dialog.open', display) ?? (await fileDialog()).item(0)?.text() ?? null;
   },
   async save (content: string, display: { buttonLabel: string; name: string; title: string }): Promise<boolean> {
      return (
         backend?.exec('dialog.save', content, display) ??
         (() => {
            const link = document.createElement('a');
            link.download = 'universe.json';
            link.href = `data:application/octet-stream,${encodeURIComponent(content)}`;
            link.target = '_blank';
            link.click();
            return true;
         })()
      );
   }
};

export function exit () {
   backend === null ? reload_full() : close();
}

export const events = new CosmosEventHost<{
   // when battle is initiated, before screen unfade
   battle: [];
   // use for post-battle pre-movement event
   'battle-exit': [];
   // when the player makes a choice in the battle screen
   choice: [OutertaleChoice];
   // right when an item use is triggered
   'pre-consume': [string, number];
   // when an item is "consumed" from the inventory
   consume: [string, number];
   // when the player drops an item
   drop: [string, number];
   // when the player successfully flees an encounter
   escape: [];
   // event fired to exit battle
   exit: [];
   // when a fatal hit is landed on an enemy
   fatal: [OutertaleVolatile];
   // when the player is healed
   heal: [CosmosHitbox, number];
   // when the player is hurt
   hurt: [CosmosHitbox, number, boolean];
   // fired when the game is initialized
   init: [];
   // fired to wait for any intro sequences
   'init-intro': [];
   // fired after the intro phase and before the overworld phase
   'init-between': [];
   // initializes the overworld
   'init-overworld': [];
   // when the game is loaded fully
   loaded: [];
   // when a mod is loaded fully
   'loaded-mod': [string, any];
   // when the mods are loaded
   modded: [];
   // after an item is used
   'post-use': [string, number];
   // when the typer is typing
   read: [CosmosTyper, string[]];
   // ready or not, here he comes!!!
   ready: [];
   // when battle screen returns to menu
   resume: [];
   // when the game is saved
   save: [];
   // when a battle option is selected
   select: [] | ['fight' | 'spare' | 'flee' | 'assist'] | ['act' | 'item', string];
   // when a script is fired
   script: [string, ...string[]];
   // when the current speaker is not spekaing
   shut: [];
   // when the current speaker is not spekaing (multi-typer)
   'shut-multi': [number];
   // when the player first spawns in
   spawn: [];
   // fired when the player moves (before a movement tick)
   step: [];
   // when the player swings or uses their weapon
   swing: [];
   // when the current speaker is speaking
   talk: [];
   // when the current speaker is speaking (multi-typer)
   'talk-multi': [number];
   // when the player changes rooms
   teleport: [string, string];
   // asynchronous pre-releport event
   'teleport-pre': [string, string];
   // when the player changes rooms (early)
   'teleport-start': [string, string];
   // directly after the room value is changed in a teleport
   'teleport-update': [CosmosDirection, CosmosPointSimple];
   // fired on every game tick where player movement is enabled
   tick: [];
   // when the language is set
   titled: [];
   // when the turn ends
   'turn-end': [];
   // when the pattern timer ends
   'turn-timer': [];
   // when an item is used (can be in-battle or not)
   use: [string, number];
   // when the player spares or slays all opp.
   victory: [];
}>();

export const freetext = {
   active: false,
   atlas,
   compose: false,
   input: (document.querySelector('#freetext') ?? document.createElement('input')) as HTMLInputElement,
   end: Infinity,
   filter: (char: string) => true,
   handle () {
      if (!freetext.active || freetext.compose) {
         return;
      }
      if (!freetext.warmup) {
         if (freetext.input.value.length === 0) {
            freetext.value = freetext.value.slice(0, -1);
         } else {
            freetext.value += freetext.input.value
               .slice(1)
               .split('')
               .filter(char => freetext.filter(char))
               .join('');
         }
         freetext.update();
      }
      freetext.clear();
   },
   update: () => {},
   value: '',
   warmup: false,
   clear () {
      freetext.input.value = ' ';
      freetext.input.setSelectionRange(1, 1);
   },
   enable (atlas: CosmosAtlas, { value = '', update = () => {}, filter = (char: string) => true as boolean } = {}) {
      game.input = false;
      freetext.active = true;
      freetext.compose = false;
      freetext.atlas = atlas;
      freetext.filter = filter;
      freetext.update = update;
      freetext.value = value;
      freetext.warmup = true;
      update();
      freetext.clear();
      freetext.input.focus();
   },
   disable () {
      freetext.input.blur();
      freetext.active = false;
      game.input = true;
   }
};

export function fullscreen () {
   try {
      document.fullscreenElement
         ? document.exitFullscreen()
         : document.body.requestFullscreen({ navigationUI: 'hide' });
   } catch {}
}

export const game = {
   /** whether the player has loaded into the world or not */
   active: false,
   /** game camera director */
   camera: new CosmosObject(),
   /** game initialized */
   init: false,
   /** enable or disable all input */
   input: true,
   /** allow interactions (automatic value) */
   interact: true,
   /** allow opening overworld menu */
   menu: true,
   /** enable or disable overworld movement */
   movement: false,
   /** current music */
   music: null as CosmosInstance | null,
   /** offset of current music */
   music_offset: 0,
   /** disable player hitbox from interacting with the overworld */
   noclip: false,
   /** get ratio'd */
   ratio: 1,
   /** prepare for standard reload (don't clear params) */
   reload: false,
   /** handle resizing */
   resize () {
      const width = game.width;
      const height = 480;
      const frame = document.querySelector('#frame') as HTMLElement;
      const wrapper = document.querySelector('#wrapper') as HTMLElement;
      let ratio: number;
      if (frame.clientWidth / frame.clientHeight < width / height) {
         ratio = frame.clientWidth / width;
      } else {
         ratio = frame.clientHeight / height;
      }
      game.ratio = ratio;
      wrapper.style.width = `${width}px`;
      wrapper.style.height = `${height}px`;
      wrapper.style.transform = `scale(${ratio})`;
   },
   /** current room */
   room: '',
   /** player can sprint */
   sprint: false,
   /** the current dialoguer text */
   text: '',
   /** game timer */
   timer: false,
   // slow mode
   vortex: false,
   // slow mode speed
   vortex_factor: 1,
   // game width
   width: 640
};

export function init () {
   if (!game.init) {
      game.init = true;
      renderer.start();
      events.fire('init');
   }
}

export const items = new CosmosRegistry<
   string,
   {
      type: 'consumable' | 'armor' | 'weapon' | 'special';
      value: number;
      sell1?: number;
      sell2?: number;
      useSFX?: CosmosDaemon | boolean;
      healSFX?: CosmosDaemon | boolean;
      inv?: number;
      text: {
         battle: { description: CosmosProvider<string>; name: CosmosProvider<string> };
         drop: CosmosProvider<string[]>;
         info: CosmosProvider<string[]>;
         name: CosmosProvider<string>;
         use: CosmosProvider<string[]>;
      };
   }
>({
   type: 'consumable',
   value: 0,
   text: { battle: { description: '', name: '' }, drop: [], info: [], name: '', use: [] }
});

export const keys = {
   altKey: CosmosKeyboardInput.create('AltLeft', 'AltRight', 'Backquote'),
   downKey: CosmosKeyboardInput.create('ArrowDown', 'k:s', 'Numpad5'),
   interactKey: CosmosKeyboardInput.create('k:z', 'Enter', 'Numpad1'),
   leftKey: CosmosKeyboardInput.create('ArrowLeft', 'k:a', 'Numpad4'),
   menuKey: CosmosKeyboardInput.create('k:c', 'ControlLeft', 'ControlRight', 'Numpad3'),
   quitKey: CosmosKeyboardInput.create('Escape'),
   rightKey: CosmosKeyboardInput.create('ArrowRight', 'k:d', 'Numpad6'),
   shiftKey: CosmosKeyboardInput.create('ShiftLeft', 'ShiftRight'),
   specialKey: CosmosKeyboardInput.create('k:x', 'ShiftLeft', 'ShiftRight', 'Numpad2'),
   upKey: CosmosKeyboardInput.create('ArrowUp', 'k:w', 'Numpad8')
};

export const maps = new CosmosRegistry<string, OutertaleMap>(new OutertaleMap('', new CosmosImage('')));

export function param (key: string, value: string | null = null) {
   value === null ? params.delete(key) : params.set(key, value);
   history.replaceState(null, '', `${location.origin + location.pathname}?${params.toString()}${location.hash}`);
}

export const params = new URLSearchParams(location.search);

export const launch = { intro: !params.has('fast'), overworld: true, timeline: !params.has('namespace') };

/** reload the game */
export function reload (fast = false, invisible = backend === null ? false : fast) {
   param('fast', fast ? '' : null);
   param('invisible', invisible ? '' : null);
   param('xxx', Math.random().toString());
   game.reload = true;
   backend?.exec('reload') ?? location.reload();
}

export function reload_full (invisible = false) {
   for (const p of params.keys()) {
      if (p === 'invisible') {
         param(p, invisible ? '' : null);
      } else if (p !== 'developer') {
         param(p);
      }
   }
   reload();
}

export const renderer = new CosmosRenderer<OutertaleLayerKey>({
   area: new Rectangle(0, 0, 640, 480),
   auto: false,
   wrapper: '#wrapper',
   layers: { base: [ 'fixed' ], below: [], main: [ 'vertical' ], above: [], menu: [ 'fixed' ] },
   width: 640,
   height: 480,
   scale: 2
});

export const rng = {
   attack: new CosmosValueRandom(),
   battle: new CosmosValueRandom(),
   dialogue: new CosmosValueRandom(),
   overworld: new CosmosValueRandom(),
   pattern: new CosmosValueRandom()
};

export const rooms = new CosmosRegistry<string, OutertaleRoom>(new OutertaleRoom());

export const spawn = 'w_start';

export const speech = {
   emoters: {} as CosmosKeyed<CosmosSprite>,
   holders: [] as (() => void)[],
   state: {
      face_value: null as CosmosSprite | null,
      get face () {
         return speech.state.face_value;
      },
      set face (v) {
         speech.state.face_value = v;
         for (const holder of speech.holders) {
            holder();
         }
      },
      get fontFamily1 () {
         return speech.state.preset.fontFamily1;
      },
      get fontFamily2 () {
         return speech.state.preset.fontFamily2;
      },
      get fontSize1 () {
         return speech.state.preset.fontSize1;
      },
      get fontSize2 () {
         return speech.state.preset.fontSize2;
      },
      get writingMode() {
         return speech.state.preset.writingMode;
      },
      preset: new OutertaleSpeechPreset()
   },
   presets: new CosmosRegistry<string, OutertaleSpeechPreset>(new OutertaleSpeechPreset()),
   targets: new Set<CosmosSprite>()
};

export const typer = new CosmosTyper({ renderer, name: 'standard' }).on('read', function () {
   events.fire('read', this, this.lines);
});

addEventListener('unload', () => {
   game.reload || (location.href = location.origin + location.pathname);
});

freetext.input.addEventListener('compositionstart', () => {
   freetext.compose = true;
});

freetext.input.addEventListener('compositionend', () => {
   if (freetext.compose) {
      freetext.compose = false;
      freetext.handle();
   }
});

freetext.input.addEventListener('input', () => {
   freetext.handle();
});

CosmosUtils.status(`LOAD MODULE: CORE (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
