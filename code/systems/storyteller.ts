/////////////////////////////////////////////////////////////////////////////
//                                                                         //
//    ::::::::   ::::::::   ::::::::  ::::::::::::  ::::::::   ::::::::    //
//   :+:    :+: :+:    :+: :+:        :+:  ::  :+: :+:    :+: :+:          //
//   +:+        +:+    +:+ +:+        +:+  ::  +:+ +:+    +:+ +:+          //
//   +#+        +#+    +#+  #++::++#  +#+  ++  +#+ +#+    +#+  #++::++#    //
//   +#+        +#+    +#+        +#+ +#+  ++  +#+ +#+    +#+        +#+   //
//   #+#    #+# #+#    #+#        #+# #+#      #+# #+#    #+#        #+#   //
//    ########   ########   ########  ###      ###  ########   ########    //
//                                                                         //
//// powered by pixi.js /////////////////////////////////////////////////////

import { colord } from '@pixi/colord';
import { AdvancedBloomFilter } from '@pixi/filter-advanced-bloom';
import { DropShadowFilter } from '@pixi/filter-drop-shadow';
import { GlowFilter } from '@pixi/filter-glow';
import { ZoomBlurFilter } from '@pixi/filter-zoom-blur';
import {
   Application,
   BLEND_MODES,
   BaseTexture,
   ColorMatrixFilter,
   Container,
   Extract,
   Filter,
   Graphics,
   Rectangle,
   Renderer,
   Sprite,
   Texture,
   UPDATE_PRIORITY
} from 'pixi.js';
import { Polygon, Vector, testPolygonPolygon } from 'sat';

// types
export type CosmosArea = CosmosPointSimple & CosmosDimensions;
export type CosmosBaseEvents = { tick: []; render: []; 'pre-render': [] };
export type CosmosColor = [number, number, number, number];
export type CosmosCrop = { [x in CosmosFace]: number };
export type CosmosDaemonRouter = (input: AudioNode) => void;
export type CosmosDefined<A> = Exclude<A, null | undefined | void>;
export type CosmosDirection = 'down' | 'left' | 'right' | 'up';
export type CosmosEventHandler<A extends any, B extends any[] = any> =
   | CosmosEventListener<A, B>
   | { listener: CosmosEventListener<A, B>; priority: number };
export type CosmosEventListener<A extends any, B extends any[]> = (this: A, ...data: B) => any;
export type CosmosFace = 'bottom' | 'left' | 'right' | 'top';
export type CosmosGlyph = { area: CosmosArea; margin: number; metrics: CosmosArea };
export type CosmosKeyed<A = any, B extends string = any> = { [x in B]: A };
export type CosmosMetadata = { [k: string]: any };
export type CosmosNot<A, B extends string> = { [x in Exclude<keyof CosmosDefined<A>, B>]?: CosmosDefined<A>[x] };
export type CosmosPixelShader = (
   red: number,
   green: number,
   blue: number,
   alpha: number,
   x: number,
   y: number,
   pixels: Uint8Array
) => CosmosColor | null;
export type CosmosProvider<A, B extends any[] = []> = A | ((...args: B) => A);
export type CosmosRegion = [CosmosPointSimple, CosmosPointSimple];
export type CosmosRendererLayerModifier = 'fixed' | 'vertical';
export type CosmosRendererStyle = {
   blend: BLEND_MODES;
   border: number;
   fill: number;
   fontFamily: null;
   fontSize: number;
   stroke: number;
   tint: number;
   writingMode: CosmosWritingMode;
};
export type CosmosResult<A> = A extends () => Promise<infer B> ? B : never;
export type CosmosTransform = [CosmosPoint, number, CosmosPoint];
export type CosmosTyperFormatter = (text: string, length: number, plain?: boolean) => string;
export type CosmosWritingMode = "vertical-rl" | "horizontal-tb"

// interfaces
export interface CosmosAnchoredObjectProperties<A extends CosmosMetadata = CosmosMetadata>
   extends CosmosObjectProperties<A> {
   anchor?: Partial<CosmosPointSimple> | number;
}

export interface CosmosAnimationInfo {
   frames: {
      duration: number;
      frame: { x: number; y: number; w: number; h: number };
      spriteSourceSize: CosmosPointSimple;
   }[];
   meta: { frameTags: { name: string; from: number; to: number }[] };
}
export interface CosmosAnimationProperties<A extends CosmosMetadata = CosmosMetadata>
   extends CosmosNot<CosmosSpriteProperties<A>, 'crop' | 'frames'> {
   extrapolate?: boolean;
   resources?: CosmosAnimationResources | null;
   subcrop?: Partial<CosmosCrop>;
}

export interface CosmosBaseProperties extends Partial<CosmosStyle> {
   alpha?: number;
   area?: Rectangle | null;
   filters?: Filter[] | null;
   position?: Partial<CosmosPointSimple> | number;
   rotation?: number;
   scale?: Partial<CosmosPointSimple> | number;
}

export interface CosmosCharacterPreset {
   idle?: boolean;
   walk: { [x in CosmosDirection]: CosmosSprite };
   talk: { [x in CosmosDirection]: CosmosSprite };
}

export interface CosmosCharacterProperties<A extends CosmosMetadata = CosmosMetadata>
   extends CosmosNot<CosmosEntityProperties<A>, 'sprites'> {
   key: string;
   preset: CosmosCharacterPreset;
}

export interface CosmosDaemonProperties {
   context: AudioContext;
   gain?: number;
   loop?: boolean;
   loopEnd?: number;
   loopStart?: number;
   max?: number;
   rate?: number;
   router?: CosmosDaemonRouter;
}

export interface CosmosDimensions {
   height: number;
   width: number;
}

export interface CosmosEntityProperties<A extends CosmosMetadata = CosmosMetadata> extends CosmosSizedObjectProperties {
   face?: CosmosDirection;
   metadata?: A;
   sprites?: { [x in CosmosDirection]?: CosmosSprite };
   step?: number;
}

export interface CosmosFontInfo {
   size: number;
   shift_x: number;
   shift_y: number;
   height: number;
   glyphs: Partial<CosmosKeyed<number[]>>;
}

export interface CosmosObjectProperties<A extends CosmosMetadata = CosmosMetadata> extends CosmosBaseProperties {
   acceleration?: number;
   gravity?: Partial<CosmosPointSimple> | number;
   metadata?: A;
   offsets?: (Partial<CosmosPointSimple> | number)[];
   objects?: CosmosObject[];
   parallax?: Partial<CosmosPointSimple> | number;
   priority?: number;
   spin?: number;
   velocity?: Partial<CosmosPointSimple> | number;
}

export interface CosmosPlayerProperties<A extends CosmosMetadata = CosmosMetadata> extends CosmosEntityProperties<A> {
   extent?: Partial<CosmosPointSimple> | number;
}

export interface CosmosPointSimple {
   x: number;
   y: number;
}

export interface CosmosRendererLayer {
   active: boolean;
   container: Container;
   dirty: boolean;
   dumpster: CosmosObject[];
   modifiers: boolean[];
   objects: CosmosObject[];
}

export interface CosmosRendererProperties<A extends string = string> extends CosmosBaseProperties {
   auto?: boolean;
   freecam?: boolean;
   height?: number;
   layers?: { [x in A]: CosmosRendererLayerModifier[] };
   shake?: number;
   shake_limit?: number;
   speed?: number;
   ticks?: number;
   width?: number;
   wrapper?: HTMLElement | string | null;
   zoom?: number;
}

export interface CosmosSizedObjectProperties<A extends CosmosMetadata = CosmosMetadata>
   extends CosmosAnchoredObjectProperties<A> {
   size?: Partial<CosmosPointSimple> | number;
}

export interface CosmosSpriteProperties<A extends CosmosMetadata = CosmosMetadata>
   extends CosmosAnchoredObjectProperties<A> {
   active?: boolean;
   crop?: Partial<CosmosCrop>;
   duration?: number;
   frames?: (CosmosImage | null)[];
   index?: number;
   reverse?: boolean;
   step?: number;
}

export interface CosmosStyle {
   blend: BLEND_MODES;
   border: number;
   fill: number;
   fontFamily: CosmosFont | null;
   fontSize: number;
   stroke: number;
   tint: number;
   writingMode: CosmosWritingMode | null;
}

export interface CosmosTextProperties<A extends CosmosMetadata = CosmosMetadata>
   extends CosmosAnchoredObjectProperties<A> {
   content?: string;
   plain?: boolean;
   spacing?: Partial<CosmosPointSimple> | number;
}

export interface CosmosTyperProperties {
   chunksize?: number;
   formatter?: CosmosTyperFormatter;
   interval?: number;
   magic?: string;
   name?: string;
   punctuation?: (char: string) => boolean;
   sounds?: CosmosDaemon[];
   threshold?: number;
   renderer?: CosmosRenderer;
   variables?: CosmosKeyed;
}

export interface CosmosValueSimple {
   value: number;
}

export const comp = {
   cursor: { x: 0, y: 0 },
   ear: [],
   mystify: [] as string[],
   mystify_bucket: [] as string[],
   shake: { x: 0, y: 0 },
   subspacing: { x: 0, y: 0 },
   swirl: { h: false, p: 0, r: 0, s: 0 },
   wordify: { index: -1, size: 0, word: '' },
   x0y0: { x: 0, y: 0 },
   xy: [ 'x', 'y' ] as ['x', 'y']
};

// classes - first level
export class CosmosAsset<A = any> {
   static tracked = new Set<CosmosAsset>();
   static collect () {
      const owners: CosmosAsset[] = [];
      for (const value of this.tracked.values()) {
         CosmosUtils.chain(value, (input, loop) => {
            input.owners.includes(input) && !owners.includes(input) && owners.push(input);
            for (const owner of input.owners) {
               owner !== input && owner instanceof CosmosAsset && loop(owner);
            }
         });
      }
      return owners;
   }
   static reload () {
      const assets = CosmosAsset.collect();
      for (const asset of assets) {
         asset.unload();
      }
      return Promise.all(assets.map(asset => asset.load()));
   }
   _value: A | null = null;
   name = 'UNKNOWN';
   owners: any[] = [];
   promise: Promise<A> | null = null;
   get loaded () {
      return this._value !== null;
   }
   get value () {
      if (this._value === null) {
         console.trace(`UNLOADED ASSET ${this.name}`);
         queueMicrotask(() => {
            throw `UNLOADED ASSET ${this.name}`;
         });
      }
      return this._value;
   }
   async load (owner: any = this) {
      this.owners.includes(owner) || this.owners.push(owner);
      const promise = (this.promise ??= this.loader().then(value => {
         if (this.promise === promise) {
            this._value = value;
            CosmosAsset.tracked.add(this);
         }
         return value;
      }));
      await promise;
   }
   async loader () {
      return null as A;
   }
   unload (owner: any = this) {
      this.owners.includes(owner) && this.owners.splice(this.owners.indexOf(owner), 1);
      if (this.owners.length === 0) {
         this._value = this.promise = null;
         CosmosAsset.tracked.delete(this);
         this.unloader();
      }
   }
   unloader () {}
}

export class CosmosAtlas<A extends string = string> {
   navigators = new CosmosRegistry<string, CosmosNavigator<A>>(new CosmosNavigator<A>());
   target: A | null = null;
   constructor (map: { [x in A]: CosmosNavigator<A> } = {} as { [x in A]: CosmosNavigator<A> }) {
      this.navigators.register(map);
   }
   attach<B extends CosmosRenderer<any>> (
      renderer: B,
      layer: B extends CosmosRenderer<infer C> ? C : never,
      ...targets: A[]
   ) {
      for (const target of targets) {
         renderer.attach(layer, ...this.navigators.of(target).objects);
      }
   }
   detach<B extends CosmosRenderer<any>> (
      renderer: B,
      layer: B extends CosmosRenderer<infer C> ? C : never,
      ...targets: A[]
   ) {
      for (const target of targets) {
         renderer.detach(layer, ...this.navigators.of(target).objects);
      }
   }
   next () {
      const nav = this.navigator();
      if (nav !== null) {
         const result = CosmosUtils.provide(nav.next, nav) as A | null | void;
         result === void 0 || this.switch(result);
      }
   }
   prev () {
      const nav = this.navigator();
      if (nav !== null) {
         const result = CosmosUtils.provide(nav.prev, nav) as A | null | void;
         result === void 0 || this.switch(result);
      }
   }
   navigator () {
      return this.target === null ? null : this.navigators.of(this.target);
   }
   seek (direction: CosmosDirection) {
      const nav = this.navigator();
      if (nav !== null) {
         const prev = nav.selection();
         const x = direction === 'left' ? -1 : direction === 'right' ? 1 : 0;
         const y = direction === 'up' ? -1 : direction === 'down' ? 1 : 0;
         const row = CosmosUtils.provide(nav.grid, nav);
         nav.position.x = Math.min(nav.position.x, row.length - 1) + (nav.flip ? y : x);
         if (nav.position.x < 0) {
            nav.position.x = row.length - 1;
         } else if (row.length <= nav.position.x) {
            nav.position.x = 0;
         }
         const column = row[nav.position.x] ?? comp.ear;
         nav.position.y = Math.min(nav.position.y, column.length - 1) + (nav.flip ? x : y);
         if (nav.position.y < 0) {
            nav.position.y = column.length - 1;
         } else if (column.length <= nav.position.y) {
            nav.position.y = 0;
         }
         const next = nav.selection();
         prev === next || nav.fire('change', prev, next);
      }
   }
   switch (target: A | null) {
      if (target !== void 0) {
         let next: CosmosNavigator<A> | null = null;
         if (typeof target === 'string') {
            next = this.navigators.of(target);
         }
         const nav = this.navigator();
         nav && nav.fire('to', target, nav);
         const current = this.target;
         this.target = target;
         next && next.fire('from', current, nav);
      }
   }
}

export class CosmosCache<A, B> extends Map<A, B> {
   compute: (key: A) => B;
   constructor (compute: (key: A) => B) {
      super();
      this.compute = compute;
   }
   of (key: A) {
      this.has(key) || this.set(key, this.compute(key));
      return this.get(key)!;
   }
}

export class CosmosDaemon {
   gain: number;
   audio: CosmosAudio;
   context: AudioContext;
   instances = [] as CosmosInstance[];
   lastPlayed = -1;
   loop: boolean;
   loopEnd: number;
   loopStart: number;
   max: number;
   rate: number;
   router: CosmosDaemonRouter;
   constructor (
      audio: CosmosAudio,
      {
         context,
         gain = 1,
         loop = false,
         loopEnd = 0,
         loopStart = 0,
         max = Infinity,
         rate = 1,
         router = input => void input.connect(input.context.destination)
      }: CosmosDaemonProperties
   ) {
      this.audio = audio;
      this.context = context;
      this.gain = gain;
      this.loop = loop;
      this.loopEnd = loopEnd;
      this.loopStart = loopStart;
      this.max = max;
      this.rate = rate;
      this.router = router;
   }
   instance (renderer: CosmosRenderer, offset = 0, tracked = false) {
      this.lastPlayed = renderer.ticks;
      return new CosmosInstance(this, renderer, offset, tracked);
   }
   stop () {
      if (this.instances.length !== 0) {
         for (const instance of this.instances.slice()) {
            instance.stop();
         }
      }
      return this;
   }
}

export class CosmosEventHost<A extends { [x in string]: any[] } = {}> {
   events: { [x in keyof A]?: { handlers: CosmosEventHandler<any, A[x]>[]; priorities: number } } = {};
   fire<B extends keyof A> (name: B, ...data: A[B]) {
      const event = this.events[name];
      if (event && event.handlers.length !== 0) {
         if (event.handlers.length === 1) {
            const handler = event.handlers[0];
            if (typeof handler === 'function') {
               return [ handler.call(this, ...data) ];
            } else {
               return [ handler.listener.call(this, ...data) ];
            }
         } else {
            return event.handlers.slice().map(handler => {
               if (typeof handler === 'function') {
                  return handler.call(this, ...data);
               } else {
                  return handler.listener.call(this, ...data);
               }
            });
         }
      } else {
         return [];
      }
   }
   off<B extends keyof A> (name: B, handler: CosmosEventHandler<this, A[B]>) {
      const event = this.events[name];
      if (event !== void 0 && event.handlers.length !== 0) {
         let index = 0;
         while (index !== event.handlers.length) {
            if (event.handlers[index] === handler) {
               event.handlers.splice(index, 1);
               if (typeof handler === 'object' && handler.priority !== 0) {
                  event.priorities--;
               }
               break;
            }
            index++;
         }
      }
      return this;
   }
   on<B extends keyof A>(name: B): Promise<A[B]>;
   on<B extends keyof A>(name: B, priority: number): Promise<A[B]>;
   on<B extends keyof A>(name: B, listener: CosmosEventHandler<this, A[B]>): this;
   on<B extends keyof A> (name: B, a2: number | CosmosEventHandler<this, A[B]> = 0) {
      if (typeof a2 === 'number') {
         return new Promise(resolve => {
            const listener = (...data: A[B]) => {
               this.off(name, singleton);
               resolve(data);
            };
            const singleton = a2 === 0 ? listener : { listener, priority: a2 };
            this.on(name, singleton);
         });
      } else {
         const event = (this.events[name] ??= { handlers: [] as CosmosEventHandler<this, A[B]>[], priorities: 0 });
         event.handlers.push(a2);
         if (typeof a2 === 'object' && a2.priority !== 0) {
            event.priorities++;
         }
         if (event.priorities !== 0) {
            event.handlers.sort(
               (handler1, handler2) =>
                  (typeof handler1 === 'function' ? 0 : handler1.priority) -
                  (typeof handler2 === 'function' ? 0 : handler2.priority)
            );
         }
         return this;
      }
   }
}

export class CosmosKeyboardInput extends CosmosEventHost<{ down: [string | null]; up: [string | null] }> {
   static inputs: CosmosKeyboardInput[] = [];
   static create (...keycodes: string[]) {
      const input = new CosmosKeyboardInput(...keycodes);
      CosmosKeyboardInput.inputs.push(input);
      return input;
   }
   keycodes: any[] = [];
   state: any[] = [];
   constructor (...keycodes: string[]) {
      super();
      this.keycodes = keycodes;
   }
   active () {
      return this.state.length !== 0;
   }
   down (code: any) {
      if (!this.state.includes(code)) {
         this.state.push(code);
         this.fire('down', code);
      }
   }
   up (code: any) {
      const index = this.state.indexOf(code);
      if (index !== -1) {
         this.state.splice(index, 1);
         this.fire('up', code);
      }
   }
}

export class CosmosRegistry<A extends string, B> extends Map<A, B> {
   placeholder: B;
   constructor (placeholder: B) {
      super();
      this.placeholder = placeholder;
   }
   of (key: A) {
      return this.has(key) ? this.get(key)! : this.placeholder;
   }
   register<C extends B>(key: A, value: C): C;
   register<C extends B>(properties: CosmosKeyed<C, A>): this;
   register<C extends B> (a1: A | CosmosKeyed<C, A>, value?: C) {
      if (typeof a1 === 'string') {
         this.set(a1, value!);
         return value!;
      } else {
         for (const key in a1) {
            this.set(key, a1[key]);
         }
         return this;
      }
   }
}

export class CosmosPoint implements CosmosPointSimple {
   task: (() => void) | undefined = void 0;
   x: number;
   y: number;
   get angle () {
      return this.angleFrom(0);
   }
   set angle (value) {
      this.set(CosmosMath.ray(value, this.extent));
   }
   get extent () {
      return this.extentOf(0);
   }
   set extent (value) {
      this.set(CosmosMath.ray(this.angle, value));
   }
   constructor();
   constructor(a: number, b: number);
   constructor(a: Partial<CosmosPointSimple> | number);
   constructor (a: Partial<CosmosPointSimple> | number = 0, b = a as number) {
      if (typeof a === 'number') {
         this.x = a;
         this.y = b;
      } else {
         this.x = a.x ?? 0;
         this.y = a.y ?? 0;
      }
   }
   abs () {
      return new CosmosPoint(Math.abs(this.x), Math.abs(this.y));
   }
   add(a: number, b: number): CosmosPoint;
   add(a: Partial<CosmosPointSimple> | number): CosmosPoint;
   add (a: Partial<CosmosPointSimple> | number, b = a as number) {
      if (typeof a === 'number') {
         return new CosmosPoint(this.x + a, this.y + b);
      } else {
         return this.add(a.x ?? 0, a.y ?? 0);
      }
   }
   angleFrom(a: number, b: number): number;
   angleFrom(a: Partial<CosmosPointSimple> | number): number;
   angleFrom (a: Partial<CosmosPointSimple> | number, b = a as number) {
      if (typeof a === 'number') {
         if (this.y === b) {
            if (this.x < a) {
               return 180;
            } else {
               return 0;
            }
         } else if (this.x === a) {
            if (this.y < b) {
               return 270;
            } else {
               return 90;
            }
         } else {
            return Math.atan2(this.y - b, this.x - a) / (Math.PI / 180);
         }
      } else {
         return this.angleFrom(a.x ?? 0, a.y ?? 0);
      }
   }
   angleTo(a: number, b: number): number;
   angleTo(a: Partial<CosmosPointSimple> | number): number;
   angleTo (a: Partial<CosmosPointSimple> | number, b = a as number) {
      if (typeof a === 'number') {
         return this.angleFrom(a, b) + 180;
      } else {
         return this.angleTo(a.x ?? 0, a.y ?? 0);
      }
   }
   ceil(): CosmosPoint;
   ceil(a: number, b: number): CosmosPoint;
   ceil(a: Partial<CosmosPointSimple> | number): CosmosPoint;
   ceil (a: Partial<CosmosPointSimple> | number = 1, b = a as number) {
      if (typeof a === 'number') {
         return new CosmosPoint(Math.ceil(this.x * a) / a, Math.ceil(this.y * b) / b);
      } else {
         return this.ceil(a.x ?? 0, a.y ?? 0);
      }
   }
   clamp (min: Partial<CosmosPointSimple> | number, max: Partial<CosmosPointSimple> | number) {
      return new CosmosPoint(
         Math.min(
            Math.max(this.x, typeof min === 'number' ? min : min.x ?? -Infinity),
            typeof max === 'number' ? max : max.x ?? Infinity
         ),
         Math.min(
            Math.max(this.y, typeof min === 'number' ? min : min.y ?? -Infinity),
            typeof max === 'number' ? max : max.y ?? Infinity
         )
      );
   }
   clone () {
      return new CosmosPoint(this);
   }
   divide(a: number, b: number): CosmosPoint;
   divide(a: Partial<CosmosPointSimple> | number): CosmosPoint;
   divide (a: Partial<CosmosPointSimple> | number, b = a as number) {
      if (typeof a === 'number') {
         return new CosmosPoint(this.x / a, this.y / b);
      } else {
         return this.divide(a.x ?? 0, a.y ?? 0);
      }
   }
   endpoint(a: number, b: number): CosmosPoint;
   endpoint(a: { angle?: number; extent?: number } | number): CosmosPoint;
   endpoint (a: { angle?: number; extent?: number } | number, b = a as number) {
      if (typeof a === 'number') {
         if (b === 0) {
            return this.clone();
         } else {
            switch (a % 360) {
               case 0:
                  return this.add(b, 0);
               case 45:
               case -315:
                  return this.add(b * Math.SQRT1_2, b * Math.SQRT1_2);
               case 90:
               case -270:
                  return this.add(0, b);
               case 135:
               case -225:
                  return this.add(-b * Math.SQRT1_2, b * Math.SQRT1_2);
               case 180:
               case -180:
                  return this.add(-b, 0);
               case 225:
               case -135:
                  return this.add(-b * Math.SQRT1_2, -b * Math.SQRT1_2);
               case 270:
               case -90:
                  return this.add(0, -b);
               case 315:
               case -45:
                  return this.add(b * Math.SQRT1_2, -b * Math.SQRT1_2);
               default:
                  return this.add(CosmosMath.ray(a, b));
            }
         }
      } else {
         return this.endpoint(a.angle ?? 0, a.extent ?? 0);
      }
   }
   extentOf(a: number, b: number): number;
   extentOf(a: Partial<CosmosPointSimple> | number): number;
   extentOf (a: Partial<CosmosPointSimple> | number, b = a as number) {
      if (typeof a === 'number') {
         if (this.x === a) {
            return Math.abs(b - this.y);
         } else if (this.y === b) {
            return Math.abs(a - this.x);
         } else {
            return Math.sqrt((a - this.x) ** 2 + (b - this.y) ** 2);
         }
      } else {
         return this.extentOf(a.x ?? 0, a.y ?? 0);
      }
   }
   floor(): CosmosPoint;
   floor(a: number, b: number): CosmosPoint;
   floor(a: Partial<CosmosPointSimple> | number): CosmosPoint;
   floor (a: Partial<CosmosPointSimple> | number = 1, b = a as number) {
      if (typeof a === 'number') {
         return new CosmosPoint(Math.floor(this.x * a) / a, Math.floor(this.y * b) / b);
      } else {
         return this.floor(a.x ?? 0, a.y ?? 0);
      }
   }
   async modulate (renderer: CosmosRenderer, duration: number, ...points: (Partial<CosmosPointSimple> | number)[]) {
      let active = true;
      this.task?.();
      this.task = () => (active = false);
      const base = { x: this.x, y: this.y };
      const origin = renderer.ticks;
      const subpointsX = points.map(point => (typeof point === 'number' ? point : point.x ?? base.x));
      const subpointsY = points.map(point => (typeof point === 'number' ? point : point.y ?? base.y));
      const trueDuration = Math.round(duration / CosmosMath.FRAME_2);
      await renderer.when(() => {
         if (active) {
            const elapsed = renderer.ticks - origin;
            if (elapsed < trueDuration) {
               this.x = CosmosMath.bezier(elapsed / trueDuration, base.x, ...subpointsX);
               this.y = CosmosMath.bezier(elapsed / trueDuration, base.y, ...subpointsY);
               return false;
            } else {
               this.task = void 0;
               this.x = CosmosMath.bezier(1, base.x, ...subpointsX);
               this.y = CosmosMath.bezier(1, base.y, ...subpointsY);
            }
         }
         return true;
      });
   }
   multiply(a: number, b: number): CosmosPoint;
   multiply(a: Partial<CosmosPointSimple> | number): CosmosPoint;
   multiply (a: Partial<CosmosPointSimple> | number, b = a as number) {
      if (typeof a === 'number') {
         return new CosmosPoint(this.x * a, this.y * b);
      } else {
         return this.multiply(a.x ?? 0, a.y ?? 0);
      }
   }
   round(): CosmosPoint;
   round(a: number, b: number): CosmosPoint;
   round(a: Partial<CosmosPointSimple> | number): CosmosPoint;
   round (a: Partial<CosmosPointSimple> | number = 1, b = a as number) {
      if (typeof a === 'number') {
         return new CosmosPoint(Math.round(this.x * a) / a, Math.round(this.y * b) / b);
      } else {
         return this.round(a.x ?? 0, a.y ?? 0);
      }
   }
   set(a: number, b: number): CosmosPoint;
   set(a: Partial<CosmosPointSimple> | number): CosmosPoint;
   set (a: Partial<CosmosPointSimple> | number, b = a as number) {
      if (typeof a === 'number') {
         this.x = a;
         this.y = b;
         return this;
      } else {
         return this.set(a.x ?? 0, a.y ?? 0);
      }
   }
   shift (angle: number, extent = 0, origin: Partial<CosmosPointSimple> | number = 0): CosmosPoint {
      if (angle % 360 === 0 && extent === 0) {
         return this.clone();
      } else if (origin instanceof CosmosPoint) {
         return origin.endpoint(origin.angleTo(this) + angle, origin.extentOf(this) + extent);
      } else {
         return this.shift(angle, extent, new CosmosPoint(origin));
      }
   }
   async step (renderer: CosmosRenderer, speed: number, ...targets: (Partial<CosmosPointSimple> | number)[]) {
      for (const target of targets) {
         if (typeof target === 'number') {
            await this.modulate(renderer, (this.extentOf(target) / speed) * CosmosMath.FRAME, target);
         } else {
            await this.modulate(
               renderer,
               (this.extentOf(target.x ?? this.x, target.y ?? this.y) / speed) * CosmosMath.FRAME,
               target
            );
         }
      }
   }
   subtract(a: number, b: number): CosmosPoint;
   subtract(a: Partial<CosmosPointSimple> | number): CosmosPoint;
   subtract (a: Partial<CosmosPointSimple> | number, b = a as number) {
      if (typeof a === 'number') {
         return new CosmosPoint(this.x - a, this.y - b);
      } else {
         return this.subtract(a.x ?? 0, a.y ?? 0);
      }
   }
   value () {
      return { x: this.x, y: this.y };
   }
}

export class CosmosValue implements CosmosValueSimple {
   task: (() => void) | undefined = void 0;
   value: number;
   constructor (value: CosmosValueSimple | number = 0) {
      if (typeof value === 'number') {
         this.value = value;
      } else {
         this.value = value.value;
      }
   }
   async modulate (renderer: CosmosRenderer, duration: number, ...points: number[]) {
      let active = true;
      this.task?.();
      this.task = () => (active = false);
      const base = this.value;
      const origin = renderer.ticks;
      const trueDuration = Math.round(duration / CosmosMath.FRAME_2);
      await renderer.when(() => {
         if (active) {
            const elapsed = renderer.ticks - origin;
            if (elapsed < trueDuration) {
               this.value = CosmosMath.bezier(elapsed / trueDuration, base, ...points);
               return false;
            } else {
               this.task = void 0;
               this.value = points.length !== 0 ? points[points.length - 1] : base;
            }
         }
         return true;
      });
   }
   set (a: CosmosValueSimple | number): CosmosValue {
      if (typeof a === 'number') {
         this.value = a;
         return this;
      } else {
         return this.set(a.value);
      }
   }
   async step (renderer: CosmosRenderer, speed: number, ...targets: number[]) {
      for (const target of targets) {
         await this.modulate(renderer, (Math.abs(target - this.value) / speed) * CosmosMath.FRAME, target);
      }
   }
}

export class CosmosValueLinked implements CosmosValue {
   task: (() => void) | undefined = void 0;
   target: CosmosValueSimple;
   get value () {
      return this.target.value;
   }
   set value (value) {
      this.target.value = value;
   }
   constructor (target: CosmosValueSimple) {
      this.target = target;
   }
   async modulate (renderer: CosmosRenderer, duration: number, ...points: number[]) {
      let active = true;
      this.task?.();
      this.task = () => (active = false);
      const base = this.value;
      const origin = renderer.ticks;
      const trueDuration = Math.round(duration / CosmosMath.FRAME_2);
      await renderer.when(() => {
         if (active) {
            const elapsed = renderer.ticks - origin;
            if (elapsed < trueDuration) {
               this.value = CosmosMath.bezier(elapsed / trueDuration, base, ...points);
               return false;
            } else {
               this.task = void 0;
               this.value = points.length !== 0 ? points[points.length - 1] : base;
            }
         }
         return true;
      });
   }
   set (a: CosmosValueSimple | number): CosmosValue {
      if (typeof a === 'number') {
         this.value = a;
         return this;
      } else {
         return this.set(a.value);
      }
   }
   async step (renderer: CosmosRenderer, speed: number, ...targets: number[]) {
      for (const target of targets) {
         await this.modulate(renderer, (Math.abs(target - this.value) / speed) * CosmosMath.FRAME, target);
      }
   }
}

export class Vow {
   active = true;
   callbacks: (() => void)[] = [];
   then (callback: () => void) {
      if (this.active) {
         this.callbacks.push(callback);
      } else {
         callback();
      }
   }
   confirm () {
      if (this.active) {
         this.active = false;
         for (const callback of this.callbacks) {
            callback();
         }
      }
   }
}

// classes - second level
export class CosmosAudio extends CosmosAsset<AudioBuffer> {
   static cache = new CosmosCache(async (key: string) => {
      try {
         const response = await CosmosUtils.xhr(key, 'arraybuffer');
         if (!CosmosAudio.cache.has(key)) {
            return CosmosAudioUtils.EMPTY;
         }
         const context = CosmosAudioUtils.getContext();
         const buffer1 = await context.decodeAudioData(response);
         if (!CosmosAudio.cache.has(key)) {
            return CosmosAudioUtils.EMPTY;
         }
         const buffer2 = context.createBuffer(buffer1.numberOfChannels + 1, buffer1.length, buffer1.sampleRate);
         let index = buffer2.length;
         const source = new Float32Array(index);
         while (index-- !== 0) {
            source[index] = index;
            if (index !== 0 && index << 16 === 0) {
               await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
               if (!CosmosAudio.cache.has(key)) {
                  return CosmosAudioUtils.EMPTY;
               }
            }
         }
         let channel = buffer1.numberOfChannels;
         buffer2.copyToChannel(source, channel);
         while (channel-- !== 0) {
            buffer2.copyToChannel(buffer1.getChannelData(channel), channel);
         }
         return buffer2;
      } catch (error) {
         console.trace(`AUDIO CACHE FAILED ${key}`, error);
         queueMicrotask(() => {
            throw `AUDIO CACHE FAILED ${key}`;
         });
         return CosmosAudioUtils.EMPTY;
      }
   });
   gain: number;
   source: string;
   get value () {
      return super.value ?? CosmosAudioUtils.EMPTY;
   }
   constructor (source: string, gain = 1) {
      super();
      this.gain = gain;
      this.source = source;
   }
   async loader () {
      return await CosmosAudio.cache.of(this.source);
   }
   unloader () {
      CosmosAudio.cache.delete(this.source);
   }
}

export class CosmosBase<A extends CosmosBaseEvents = CosmosBaseEvents>
   extends CosmosEventHost<A>
   implements CosmosPointSimple, Partial<CosmosStyle>
{
   alpha: CosmosValue;
   blend: BLEND_MODES | undefined;
   border: number | undefined;
   container = new Container();
   fill: number | undefined;
   fontFamily: CosmosFont | null | undefined;
   fontSize: number | undefined;
   writingMode: CosmosWritingMode | null | undefined;
   position: CosmosPoint;
   rotation: CosmosValue;
   scale: CosmosPoint;
   stroke: number | undefined;
   tint: number | undefined;
   area: Rectangle | null;
   get filters () {
      return this.container.filters;
   }
   set filters (value) {
      this.container.filters = value;
   }
   /** @deprecated */
   get x () {
      return this.position.x as any;
   }
   /** @deprecated */
   get y () {
      return this.position.y as any;
   }
   constructor ({
      alpha = 1,
      area = null,
      blend = void 0,
      border = void 0,
      fill = void 0,
      filters = null,
      fontFamily = void 0,
      fontSize = void 0,
      position = 0,
      rotation = 0,
      scale = 1,
      stroke = void 0,
      tint = void 0,
      writingMode = void 0
   }: CosmosBaseProperties = {}) {
      super();
      this.alpha = new CosmosValue(alpha);
      this.area = area;
      this.blend = blend;
      this.border = border;
      this.fill = fill;
      this.filters = filters;
      this.fontFamily = fontFamily;
      this.fontSize = fontSize;
      if (typeof position === 'number') {
         this.position = new CosmosPoint(position ?? 0);
      } else {
         this.position = new CosmosPoint(position?.x ?? 0, position?.y ?? 0);
      }
      this.rotation = new CosmosValue(rotation);
      if (typeof scale === 'number') {
         this.scale = new CosmosPoint(scale ?? 1);
      } else {
         this.scale = new CosmosPoint(scale?.x ?? 1, scale?.y ?? 1);
      }
      this.stroke = stroke;
      this.tint = tint;
      this.writingMode = writingMode;
   }
   updateFilters (filters = this.container.filters) {
      if (filters === null || filters.length === 0) {
         if (this.container.filterArea !== null) {
            this.container.filterArea = null as any;
         }
      } else if (CosmosRenderer.fancy) {
         for (const filter of filters) {
            if (
               filter instanceof AdvancedBloomFilter ||
               filter instanceof DropShadowFilter ||
               filter instanceof GlowFilter ||
               filter instanceof ZoomBlurFilter
            ) {
               filter.enabled = true;
            }
         }
         if (this.container.filterArea !== this.area) {
            this.container.filterArea = this.area as Rectangle;
         }
      } else {
         let area: Rectangle | null = null;
         for (const filter of filters) {
            if (
               filter instanceof AdvancedBloomFilter ||
               filter instanceof DropShadowFilter ||
               filter instanceof GlowFilter ||
               filter instanceof ZoomBlurFilter
            ) {
               filter.enabled = false;
            } else {
               area = this.area;
            }
         }
         if (this.container.filterArea !== area) {
            this.container.filterArea = area as Rectangle;
         }
      }
   }
}

export class CosmosDataCSV<A extends string[][] = string[][]> extends CosmosAsset<A> {
   source: string;
   constructor (source: string) {
      super();
      this.source = source;
   }
   async loader () {
      return CosmosUtils.xhr(this.source, 'text').then((value: string) => {
         return value.split('\n').map(line => line.split(';')) as A;
      });
   }
}

export class CosmosData<A extends any = any> extends CosmosAsset<A> {
   source: string;
   constructor (source: string) {
      super();
      this.source = source;
   }
   async loader () {
      return CosmosUtils.import<A>(this.source);
   }
}

export class CosmosEffect extends CosmosValueLinked {
   context: AudioContext;
   input: GainNode;
   output: AudioNode;
   throughput: GainNode;
   get value () {
      return this.target.value;
   }
   set value (value) {
      this.target.value = value;
      this.throughput.gain.value = 1 - value;
   }
   constructor (context: AudioContext, node: AudioNode, value: number) {
      const input = new GainNode(context);
      super(input.gain);
      this.context = context;
      this.input = input;
      this.output = node;
      this.throughput = new GainNode(context);
      this.input.connect(this.output);
      this.value = value;
   }
   connect (target: CosmosEffect | AudioNode | AudioContext) {
      if (target instanceof AudioContext) {
         this.output.connect(target.destination);
         this.throughput.connect(target.destination);
      } else if (target instanceof AudioNode) {
         this.output.connect(target);
         this.throughput.connect(target);
      } else {
         this.output.connect(target.input);
         this.output.connect(target.throughput);
         this.throughput.connect(target.input);
         this.throughput.connect(target.throughput);
      }
   }
   disconnect (target?: CosmosEffect | AudioNode | AudioContext) {
      if (target instanceof AudioContext) {
         this.output.disconnect(target.destination);
         this.throughput.disconnect(target.destination);
      } else if (target instanceof AudioNode) {
         this.output.disconnect(target);
         this.throughput.disconnect(target);
      } else if (target !== void 0) {
         this.output.disconnect(target.input);
         this.output.disconnect(target.throughput);
         this.throughput.disconnect(target.input);
         this.throughput.disconnect(target.throughput);
      } else {
         this.output.disconnect();
      }
   }
}

export class CosmosImage extends CosmosAsset<BaseTexture> {
   static cache = new CosmosCache(async (key: string) => {
      try {
         const response = await CosmosUtils.xhr(key, 'blob');
         if (!CosmosImage.cache.has(key)) {
            return CosmosImageUtils.EMPTY;
         }
         const texture = BaseTexture.from(URL.createObjectURL(response));
         await texture.resource.load();
         if (!CosmosImage.cache.has(key)) {
            texture.destroy();
            return CosmosImageUtils.EMPTY;
         }
         return texture;
      } catch (error) {
         console.trace(`IMAGE CACHE FAILED ${key}`, error);
         queueMicrotask(() => {
            throw `IMAGE CACHE FAILED ${key}`;
         });
         return CosmosImageUtils.EMPTY;
      }
   });
   shader: CosmosPixelShader | null;
   source: string;
   sprites: Sprite[] = [];
   get value () {
      return super.value ?? CosmosImageUtils.EMPTY;
   }
   constructor (source: string, shader: CosmosPixelShader | null = null) {
      super();
      this.shader = shader;
      this.source = source;
   }
   async loader () {
      let texture = await CosmosImage.cache.of(this.source);
      if (this.shader) {
         const pixels = CosmosImageUtils.pixels(texture);
         let x = 0;
         let y = 0;
         while (y < texture.height) {
            while (x < texture.width) {
               const z = (x + y * texture.width) * 4;
               const color = this.shader(pixels[z], pixels[z + 1], pixels[z + 2], pixels[z + 3], x, y, pixels);
               if (color !== null) {
                  pixels[z] = color[0];
                  pixels[z + 1] = color[1];
                  pixels[z + 2] = color[2];
                  pixels[z + 3] = color[3];
               }
               x++;
            }
            x = 0;
            y++;
         }
         texture = BaseTexture.fromBuffer(pixels, texture.width, texture.height);
      }
      for (const sprite of this.sprites) {
         CosmosImageUtils.dumpster.push(sprite.texture);
         sprite.texture = new Texture(texture);
      }
      return texture;
   }
   unloader () {
      CosmosImage.cache.delete(this.source);
      for (const sprite of this.sprites) {
         CosmosImageUtils.dumpster.push(sprite.texture);
         sprite.texture = Texture.EMPTY;
      }
   }
}

export class CosmosInstance extends CosmosEventHost<{ stop: [] }> {
   daemon: CosmosDaemon;
   gain: CosmosValueLinked;
   instance:
      | {
           gain: GainNode;
           merger: ChannelMergerNode;
           offset: number | null;
           splitter: ChannelSplitterNode;
           rate: number;
           stop: () => void;
           tick: () => void;
        }
      | undefined;
   rate: CosmosValueLinked;
   renderer: CosmosRenderer;
   source: AudioBufferSourceNode | undefined;
   get loop () {
      if (this.source === void 0) {
         return false;
      }
      return this.source.loop;
   }
   set loop (value) {
      if (this.source === void 0) {
         return;
      }
      this.source.loop = value;
   }
   get position () {
      let value: number;
      if (this.instance === void 0 || this.source === void 0 || this.source.buffer === null) {
         value = 0;
      } else {
         let analyser: AnalyserNode;
         search: {
            for (const entry of CosmosAudioUtils.analysers) {
               if (entry[0] !== this) {
                  if (entry[0] === null && entry[1].context === this.daemon.context) {
                     entry[0] = this;
                     if (this.instance !== void 0 && this.source !== void 0 && this.source.buffer !== null) {
                        this.instance.splitter.connect(entry[1], this.source.buffer.numberOfChannels - 1);
                     }
                  } else {
                     continue;
                  }
               }
               analyser = entry[1];
               break search;
            }
            analyser = new AnalyserNode(this.daemon.context);
            CosmosAudioUtils.analysers.push([ this, analyser ]);
            if (this.instance !== void 0 && this.source !== void 0 && this.source.buffer !== null) {
               this.instance.splitter.connect(analyser, this.source.buffer.numberOfChannels - 1);
            }
         }
         analyser.getFloatTimeDomainData(CosmosAudioUtils.samples);
         value = CosmosAudioUtils.samples[0] / this.source.buffer.sampleRate;
      }
      if (value === 0) {
         return this.instance?.offset ?? 0;
      } else {
         this.instance!.offset = null;
         return value;
      }
   }
   get stopped () {
      return this.instance === void 0 || this.source === void 0 || this.source.buffer === null;
   }
   constructor (daemon: CosmosDaemon, renderer: CosmosRenderer, offset = 0, tracked = false) {
      super();

      const gain = new GainNode(daemon.context, { gain: daemon.gain * daemon.audio.gain });
      const source = new AudioBufferSourceNode(daemon.context, {
         buffer: daemon.audio.value,
         loop: daemon.loop,
         loopEnd: daemon.loopEnd + (daemon.loopEnd <= 0 ? daemon.audio.value.duration : 0),
         loopStart: daemon.loopStart + (daemon.loopStart <= 0 ? daemon.audio.value.duration : 0),
         playbackRate: daemon.rate * renderer.speed.value
      });
      const splitter = new ChannelSplitterNode(daemon.context, { numberOfOutputs: source.buffer!.numberOfChannels });
      const merger = new ChannelMergerNode(daemon.context, { numberOfInputs: source.buffer!.numberOfChannels - 1 });

      daemon.router(gain);
      let channel = source.buffer!.numberOfChannels - 1;
      while (channel-- !== 0) {
         splitter.connect(merger, channel, channel);
      }
      source.connect(splitter);
      merger.connect(gain);

      const instance = {
         gain,
         merger,
         offset,
         rate: daemon.rate,
         splitter,
         stop: () => this.stop(),
         tick: () => this.tick()
      };

      this.daemon = daemon;
      this.gain = new CosmosValueLinked({
         get value () {
            return gain.gain.value / daemon.audio.gain;
         },
         set value (value) {
            gain.gain.value = value * daemon.audio.gain;
         }
      });
      this.instance = instance;
      this.rate = new CosmosValueLinked({
         get value () {
            return instance.rate;
         },
         set value (value) {
            instance.rate = value;
            source.playbackRate.value = value * renderer.speed.value;
         }
      });
      this.renderer = renderer;
      this.source = source;

      daemon.instances.push(this);
      daemon.instances.length > daemon.max && daemon.instances[0].stop();
      source.addEventListener('ended', instance.stop);
      source.start(0, offset);
      renderer.speeders.push(instance.tick);

      if (tracked) {
         void this.position;
      }
   }
   stop () {
      if (this.instance === void 0 || this.source === void 0) {
         return;
      }
      this.source.removeEventListener('ended', this.instance!.stop);
      this.source.stop();
      this.source.buffer = null;
      this.source.disconnect();
      this.instance.gain.disconnect();
      this.instance.merger.disconnect();
      this.instance.splitter.disconnect();
      this.renderer.speeders.splice(this.renderer.speeders.indexOf(this.instance.tick), 1);
      this.daemon.instances.splice(this.daemon.instances.indexOf(this), 1);
      this.fire('stop');
      this.source = undefined;
      this.instance = undefined;
      for (const entry of CosmosAudioUtils.analysers) {
         if (entry[0] === this) {
            entry[0] = null;
            entry[1].disconnect();
         }
      }
   }
   tick () {
      if (this.instance === void 0 || this.source === void 0) {
         return;
      }
      const value = this.instance.rate * this.renderer.speed.value;
      if (value !== this.source.playbackRate.value) {
         this.source.playbackRate.value = value;
      }
   }
}

export class CosmosInventory<A extends CosmosAsset[] = CosmosAsset[]> extends CosmosAsset<A> {
   assets: A;
   get value () {
      return this.assets;
   }
   constructor (...assets: A) {
      super();
      this.assets = assets;
   }
   async loader () {
      await Promise.all(this.assets.map(asset => asset.load(this)));
      return this.assets;
   }
   unloader () {
      for (const asset of this.assets) {
         asset.unload(this);
      }
   }
}

export class CosmosMixer extends CosmosValueLinked {
   _effects = (() => {
      const value = [] as CosmosEffect[];
      const proxy = new Proxy(value, {
         set: (target, key: `${number}`, value) => {
            const index = +key;
            if (Number.isInteger(index) && index > -1 && index < target.length + 1) {
               this.update(index, value);
            }
            target[key] = value;
            return true;
         },
         deleteProperty: (target, key: `${number}`) => {
            const index = +key;
            if (Number.isInteger(index) && index > -1 && index < target.length + 1) {
               this.update(index);
            }
            delete target[key];
            return true;
         }
      });
      return { value, proxy };
   })();
   context: AudioContext;
   input: GainNode;
   output: GainNode;
   get effects () {
      return this._effects.proxy;
   }
   set effects (value) {
      this._effects.proxy.splice(0, this._effects.value.length);
      this._effects.proxy.push(...value);
   }
   constructor (context: AudioContext, effects: CosmosEffect[] = []) {
      const output = new GainNode(context);
      super(output.gain);
      this.context = context;
      this.input = new GainNode(context);
      this.output = output;
      this.input.connect(this.output);
      this.effects = effects;
   }
   update (index: number, value?: CosmosEffect) {
      const prevValue = (this._effects.value[index - 1] ?? this.input) as CosmosEffect | GainNode;
      const currValue = this._effects.value[index];
      const nextValue = (this._effects.value[index + 1] ?? this.output) as CosmosEffect | GainNode;
      if (currValue !== void 0) {
         if (prevValue instanceof CosmosEffect) {
            prevValue.disconnect(currValue);
         } else {
            prevValue.disconnect(currValue.input);
            prevValue.disconnect(currValue.throughput);
         }
         currValue.disconnect(nextValue);
      } else {
         prevValue.disconnect(nextValue);
      }
      if (value !== void 0) {
         if (prevValue instanceof CosmosEffect) {
            prevValue.connect(value);
         } else {
            prevValue.connect(value.input);
            prevValue.connect(value.throughput);
         }
         value.connect(nextValue);
      } else {
         if (prevValue instanceof CosmosEffect) {
            prevValue.connect(nextValue);
         } else if (nextValue instanceof CosmosEffect) {
            prevValue.connect(nextValue.input);
            prevValue.connect(nextValue.throughput);
         } else {
            prevValue.connect(nextValue);
         }
      }
   }
}

export class CosmosNavigator<A extends string = string, B extends any = any> extends CosmosEventHost<
   { [x in 'from' | 'to']: [A | null | void, CosmosNavigator<A, B> | null] } & { change: [B, B] }
> {
   flip: boolean;
   grid: CosmosProvider<B[][], [CosmosNavigator<A, B>]>;
   next: CosmosProvider<A | null | void, [CosmosNavigator<A, B>]>;
   objects: CosmosObject[];
   position: CosmosPointSimple;
   prev: CosmosProvider<A | null | void, [CosmosNavigator<A, B>]>;
   constructor ({
      flip = false,
      grid = [],
      next = void 0,
      objects = [],
      position: { x = 0, y = 0 } = {},
      prev = void 0
   }: {
      flip?: boolean;
      grid?: CosmosProvider<B[][], [CosmosNavigator<A, B>]>;
      next?: CosmosProvider<A | null | void, [CosmosNavigator<A, B>]>;
      objects?: CosmosObject[];
      position?: Partial<CosmosPointSimple>;
      prev?: CosmosProvider<A | null | void, [CosmosNavigator<A, B>]>;
   } = {}) {
      super();
      this.flip = flip;
      this.grid = grid;
      this.next = next;
      this.objects = objects;
      this.position = { x, y };
      this.prev = prev;
   }
   selection () {
      return (CosmosUtils.provide(this.grid)[this.position.x] ?? comp.ear)[this.position.y];
   }
   setpos (x = 0, y = 0) {
      this.position.x = x;
      this.position.y = y;
   }
}

export class CosmosStringData<A extends any = string> extends CosmosAsset<A> {
   source: string;
   transformer: (value: string) => A;
   get value () {
      return (super.value ?? '') as A;
   }
   constructor (source: string, transformer = (value: string) => value as A) {
      super();
      this.source = source;
      this.transformer = transformer;
   }
   loader () {
      return CosmosUtils.xhr(this.source, 'text').then(this.transformer) as Promise<A>;
   }
}

export class CosmosTyper extends CosmosEventHost<
   { [x in 'char' | 'code' | 'header' | 'text']: [string] } & { [x in 'empty' | 'idle' | 'read' | 'skip']: [] } & {
      inst: [CosmosInstance];
   }
> {
   static strip (text: string) {
      return text.replace(/{[^}]*}|§[^§]*§/g, '');
   }
   autonext = 0;
   autoread = 0;
   chunksize = 1;
   content = '';
   display: string[] = [];
   formatter: CosmosTyperFormatter;
   index = 0;
   index_chunk = 0;
   index_line = 0;
   interval: number;
   lines: string[] = [];
   magic: string;
   mode: 'empty' | 'idle' | 'read' = 'empty';
   name: string;
   punctuation: (char: string) => boolean;
   renderer: CosmosRenderer;
   sfx = true;
   skippable = true;
   skippable_fast = false;
   sounds: CosmosDaemon[];
   task: (() => void) | undefined = void 0;
   threshold: number;
   variables: CosmosKeyed<string, string>;
   constructor ({
      chunksize = 1,
      formatter = text => text,
      interval = 0,
      magic = '',
      name = '',
      punctuation = () => false,
      sounds = [],
      threshold = 0,
      renderer = new CosmosRenderer(),
      variables = {}
   }: CosmosTyperProperties = {}) {
      super();
      this.chunksize = chunksize;
      this.formatter = formatter;
      this.interval = interval;
      this.magic = magic;
      this.name = name;
      this.punctuation = punctuation;
      this.sounds = sounds;
      this.threshold = threshold;
      this.renderer = renderer;
      this.variables = variables;
   }
   emit (sfx = true) {
      const content = this.display.join('');
      this.content = content;
      this.fire('text', content);
      if (
         sfx &&
         this.sfx &&
         this.sounds.length !== 0 &&
         this.mode === 'read' &&
         content.length !== 0 &&
         !content[content.length - 1].match(/[\s]/)
      ) {
         const instance = this.sounds[Math.floor(Math.random() * this.sounds.length)].instance(this.renderer);
         this.fire('inst', instance);
         this.sfx = false;
         if (this.threshold !== 0) {
            this.renderer.pause(this.threshold * instance.daemon.audio.value!.duration * 1000).then(() => {
               this.sfx = true;
            });
         } else {
            this.renderer.post().then(async () => {
               await this.renderer.post();
               this.sfx = true;
            });
         }
      }
   }
   next (skip = false) {
      if (this.mode !== 'read' || this.lines.length <= this.index_line) {
         return;
      }
      let zero = false;
      let read = false;
      let done = false;
      let line = this.lines[this.index_line];
      let post = false;
      while (!done && this.index < line.length) {
         const char = line[this.index++];
         if (char === '{') {
            this.emit(false);
            const code = line.slice(this.index, line.indexOf('}', this.index));
            const data = code.slice(1);
            this.index += code.length + 1;
            this.fire('code', code);
            switch (code[0]) {
               case '~':
                  line = line.slice(0, this.index) + this.magic + line.slice(this.index);
                  this.lines[this.index_line] = line;
                  break;
               case '!':
                  if (this.skippable || code[1] === '!') {
                     skip = true;
                  }
                  break;
               case '@':
                  this.display.push(`§${data}§`);
                  break;
               case '#':
                  this.fire('header', data);
                  break;
               case '%':
                  if (data.length !== 0) {
                     const time = Math.round(Number(data) * this.interval);
                     if (time !== 0) {
                        this.autoread = time;
                        break;
                     }
                  }
                  skip = true;
                  read = true;
                  break;
               case '^':
                  if (!skip) {
                     const time = Math.round(Number(data) * this.interval);
                     if (time !== 0) {
                        done = true;
                        this.autonext = time;
                     }
                  }
                  break;
               case '&':
                  this.display.push(String.fromCharCode(parseInt(data, 16)));
                  break;
               case '*':
                  this.skippable_fast = false;
               case '|':
                  this.skippable = false;
                  break;
            }
         } else {
            this.fire('char', char);
            this.display.push(char);
            if (!skip) {
               const index_chunk = this.index_chunk++;
               if ((index_chunk !== 0 || !zero) && (index_chunk % this.chunksize === 0 || this.punctuation(char))) {
                  this.index < line.length && this.emit();
               }
               if (this.interval !== 0) {
                  this.autonext = this.interval;
                  done = true;
               }
            }
            zero = true;
         }
         this.index < line.length || (post = true);
         if (done) {
            break;
         }
      }
      if (line.length <= this.index) {
         this.fire('idle');
         this.mode = 'idle';
         post && this.emit();
         this.index_line++;
         read && this.read();
      }
   }
   read (force = false) {
      force && this.skip(true);
      if (this.mode === 'idle' && (force || this.autonext === 0)) {
         if (this.lines.length <= this.index_line) {
            this.emit();
            this.reset(true);
            this.fire('empty');
            this.mode = 'empty';
         } else {
            this.reset();
            this.fire('read');
            this.mode = 'read';
            this.next();
         }
      }
   }
   reset (full = false) {
      this.autoread = 0;
      this.autonext = 0;
      this.display = [];
      this.index = 0;
      this.index_chunk = 0;
      this.skippable = true;
      this.skippable_fast = true;
      if (full) {
         this.index_line = 0;
         this.lines = [];
         this.task?.();
         this.task = void 0;
      }
   }
   skip (force = false, fastskip = false) {
      if (this.mode === 'read' && (force || (fastskip ? this.skippable_fast : this.skippable))) {
         this.fire('skip');
         this.next(true);
         return true;
      } else {
         return false;
      }
   }
   text (...lines: string[]) {
      this.reset(true);
      const trueLines = lines
         .map(line => {
            for (const [ key, value ] of Object.entries(this.variables)) {
               line = line.split(`$(${key})`).join(value);
            }
            const notrim = line[1] === '#';
            if (line[0] === '<') {
               const segments = line.slice(notrim ? 2 : 1).split('>');
               const length = +segments[0];
               line = this.formatter(segments.slice(1).join('>'), length === 99 ? Infinity : length);
            }
            return notrim ? line : line.trim();
         })
         .filter(line => line.length !== 0);
      lines = [];
      const vow = new Vow();
      if (trueLines.length === 0) {
         vow.confirm();
         return vow;
      }
      this.task = () => vow.confirm();
      this.lines = trueLines;
      this.renderer.when(() => {
         if (vow.active) {
            if (this.autoread !== 0 && --this.autoread === 0) {
               this.read(true);
            } else if (this.autonext !== 0 && --this.autonext === 0) {
               this.next();
            }
            return false;
         }
         return true;
      });
      this.fire('read');
      this.mode = 'read';
      this.next();
      return vow;
   }
}

export class CosmosValueRandom extends CosmosValue {
   compute () {
      let z = this.value;
      z++;
      z ^= z >>> 17;
      z = Math.imul(z, 0xed5ad4bb);
      z ^= z >>> 11;
      z = Math.imul(z, 0xac4c1b51);
      z ^= z >>> 15;
      z = Math.imul(z, 0x31848bab);
      z ^= z >>> 14;
      return (z >>> 0) / 4294967296;
   }
   next () {
      this.value = (this.value + 0x9e3779b9) | 0;
      return this.compute();
   }
   next_void () {
      this.value = (this.value + 0x9e3779b9) | 0;
   }
   int (limit: number) {
      return Math.floor(this.next() * limit);
   }
}

// classes - third level
export class CosmosAnimationResources extends CosmosInventory<[CosmosImage, CosmosData<CosmosAnimationInfo>]> {
   image: CosmosImage;
   data: CosmosData<CosmosAnimationInfo>;
   constructor (image: CosmosImage, data: CosmosData<CosmosAnimationInfo>) {
      super(image, data);
      this.image = image;
      this.data = data;
   }
}

export class CosmosFont extends CosmosInventory<[CosmosImage, CosmosStringData<CosmosFontInfo>]> {
   image: CosmosImage;
   data: CosmosData<CosmosFontInfo>;
   textures: Partial<CosmosKeyed<Texture>> = {};
   constructor (image: CosmosImage, data: CosmosStringData<CosmosFontInfo>) {
      super(image, data);
      this.image = image;
      this.data = data;
   }
   reset () {
      for (const code in this.textures) {
         CosmosImageUtils.dumpster.push(this.textures[code]!);
         delete this.textures[code];
      }
   }
   metrics (content: string, { plain = false, scale = 1, spacing = { x: 0, y: 0 } } = {}) {
      let x1 = 0;
      let y1 = 0;
      let x2 = 0;
      let y2 = 0;
      if (this.loaded) {
         let index = 0;
         let stretch = 1;
         const cursor = comp.cursor;
         cursor.x = 0;
         cursor.y = 0;
         const height = this.data.value!.height * scale;
         const subspacing = comp.subspacing;
         subspacing.x = 0;
         subspacing.y = 0;
         while (index < content.length) {
            const char = content[index++];
            if (char === '\n') {
               cursor.x = 0;
               y2 = Math.min(y2, cursor.y);
               cursor.y += height + spacing.y + subspacing.y;
               y1 = Math.max(y1, cursor.y);
            } else if (!plain && char === '§') {
               const code = content.slice(index, content.indexOf('§', index));
               const [ key, value ] = code.split(':');
               index += code.length + 1;
               switch (key) {
                  case 'shift':
                     cursor.x += +value * stretch;
                     break;
                  case 'stretch':
                     stretch = +value;
                     break;
                  case 'spacing':
                     const [ spacingX, spacingY ] = value.split(',').map(value => +value);
                     subspacing.x = spacingX || 0;
                     subspacing.y = spacingY || 0;
                     break;
               }
            } else {
               const glyph = this.data.value!.glyphs[char.charCodeAt(0)];
               if (glyph !== void 0) {
                  x2 = Math.min(x2, cursor.x);
                  cursor.x += glyph[6] * scale * stretch;
                  x1 = Math.max(x1, cursor.x);
                  cursor.x += (spacing.x + subspacing.x) * stretch;
               }
            }
         }
         y1 += height;
      }
      return new CosmosPoint(x1 + x2, y1 + y2);
   }
   texture (code: number) {
      if (code in this.textures) {
         return this.textures[code]!;
      } else {
         const glyph = this.data.value?.glyphs[code];
         if (glyph !== void 0) {
            return (this.textures[code] = new Texture(
               this.image.value,
               new Rectangle(glyph[0], glyph[1], glyph[2], glyph[3])
            ));
         } else {
            return Texture.EMPTY;
         }
      }
   }
}

export class CosmosRenderer<
   A extends string = string,
   B extends CosmosBaseEvents = CosmosBaseEvents
> extends CosmosBase<B> {
   static fancy = true;
   static style:CosmosRendererStyle = {
      blend: BLEND_MODES.NORMAL,
      border: 1,
      fill: -1,
      fontFamily: null,
      fontSize: 0,
      stroke: -1,
      tint: 0xffffff,
      writingMode: 'horizontal-tb'
   }
   static suspend = false;
   _layers: CosmosRendererLayer[] = [];
   application: Application;
   delta = 0;
   fader = new Graphics();
   freecam: boolean;
   height: number;
   layers: { [x in A]: CosmosRendererLayer };
   posts: (() => void)[] = [];
   region: CosmosRegion = [ new CosmosPoint(-Infinity), new CosmosPoint(Infinity) ];
   shake_limit: number;
   shake: CosmosValue;
   speed: CosmosValueLinked;
   speeders: (() => void)[] = [];
   subtick = false;
   ticks: number;
   whens: { condition: (subtick: boolean) => boolean; resolve: () => void }[] = [];
   width: number;
   wrapper: HTMLElement | null;
   zoom: CosmosValue;
   get canvas () {
      return this.application.view as HTMLCanvasElement;
   }
   get size () {
      return new CosmosPoint(this.width, this.height);
   }
   get time () {
      return this.ticks * CosmosMath.FRAME_2;
   }
   constructor (properties: CosmosRendererProperties<A> = {}) {
      super(properties);
      (({
         auto = true,
         freecam = false,
         height = 1,
         layers = {} as { [x in A]: CosmosRendererLayerModifier[] },
         shake = 0,
         shake_limit = Infinity,
         speed = 1,
         ticks = 0,
         width = 1,
         wrapper = null,
         zoom = 1
      }: CosmosRendererProperties<A>) => {
         this.height = height;
         this.width = width;
         this.application = new Application({ antialias: false, autoStart: auto, backgroundAlpha: 0, height, width });
         this.freecam = freecam;
         this.layers = Object.fromEntries(
            Object.entries(layers).map(([ key, modifiers ]) => {
               const container = new Container();
               container.filterArea = new Rectangle(0, 0, width, height);
               container.sortableChildren = true;
               this.container.addChild(container);
               const layer = {
                  active: true,
                  container,
                  dirty: false,
                  dumpster: [],
                  modifiers: [
                     (modifiers as CosmosRendererLayerModifier).includes('fixed'),
                     (modifiers as CosmosRendererLayerModifier).includes('vertical')
                  ],
                  objects: []
               };
               this._layers.push(layer as CosmosRendererLayer);
               return [ key, layer ];
            })
         ) as any;
         this.shake_limit = shake_limit;
         this.shake = new CosmosValue(shake);
         const speed_accessor = { speed } as { speed: number; value: number };
         Object.defineProperty(speed_accessor, 'value', {
            get: () => {
               return speed_accessor.speed;
            },
            set: (value: number) => {
               speed_accessor.speed = value;
               for (const speeder of this.speeders) {
                  speeder();
               }
            }
         });
         this.speed = new CosmosValueLinked(speed_accessor);
         this.ticks = ticks;
         this.wrapper = typeof wrapper === 'string' ? (document.querySelector(wrapper) as HTMLElement) : wrapper;
         this.zoom = new CosmosValue(zoom);
         this.container.pivot.set(width / 2, height / 2);
         this.container.position.set(width / 2, height / 2);
         this.fader.beginFill(0, 1).drawRect(0, 0, width, height).endFill();
         this.fader.zIndex = Infinity;
         this.container.addChild(this.fader);
         this.application.stage = this.container;
         this.canvas.style.imageRendering = 'pixelated';
         auto && this.wrapper?.appendChild(this.canvas);
      })(properties);
      this.application.ticker.add(
         delta => {
            if (CosmosRenderer.suspend) {
               return;
            }
            this.delta += this.speed.value * delta;
            while (1 <= this.delta) {
               this.ticks++;
               this.delta -= 1;
               this.subtick = !this.subtick;
               for (const when of this.whens.slice()) {
                  if (when.condition(this.subtick)) {
                     this.whens.splice(this.whens.indexOf(when), 1);
                     when.resolve();
                  }
               }
               this.subtick || this.tick();
               for (const post of this.posts.splice(0)) {
                  post();
               }
            }
         },
         void 0,
         UPDATE_PRIORITY.UTILITY
      );
   }
   attach (key: A, ...objects: CosmosObject[]) {
      const layer = this.layers[key];
      const vertical = layer.modifiers[1];
      for (const object of objects) {
         if (!layer.objects.includes(object)) {
            layer.dirty = true;
            layer.objects.push(object);
         }
         object.update(object.priority.value || (vertical ? object.position.y : 0));
      }
   }
   calculate (source: A | CosmosObject, filter: CosmosProvider<boolean, [CosmosHitbox]> = true) {
      const list: CosmosHitbox[] = [];
      for (const object of typeof source === 'string' ? this.layers[source].objects : source._objects.value) {
         if (object instanceof CosmosHitbox && CosmosUtils.provide(filter, object)) {
            list.push(object);
            object.calculate();
         }
         list.push(...this.calculate(object, filter));
      }
      return list;
   }
   clear (...keys: A[]) {
      for (const key of keys) {
         const layer = this.layers[key];
         if (layer.objects.length !== 0) {
            layer.dirty = true;
            for (const object of layer.objects.splice(0)) {
               layer.dumpster.includes(object) || layer.dumpster.push(object);
            }
         }
      }
   }
   detach (key: A, ...objects: CosmosObject[]) {
      const layer = this.layers[key];
      for (const object of objects) {
         const index = layer.objects.indexOf(object);
         if (index !== -1) {
            layer.dirty = true;
            const object = layer.objects.splice(index, 1)[0];
            layer.dumpster.includes(object) || layer.dumpster.push(object);
         }
      }
   }
   detect (source: CosmosHitbox, ...targets: CosmosHitbox[]) {
      source.calculate();
      return targets.filter(target => source.detect(target));
   }
   async pause (duration = 0) {
      if (duration <= 0) {
         return this.when(() => true);
      } else if (duration === Infinity) {
         return new Promise<void>(() => {});
      } else {
         const ticks = this.ticks + Math.round(duration / CosmosMath.FRAME_2);
         return this.when(() => ticks <= this.ticks);
      }
   }
   post () {
      return new Promise<void>(resolve => this.posts.push(resolve));
   }
   projection (position: CosmosPointSimple, camera = this.position) {
      return this.size
         .divide(this.scale.multiply(2))
         .subtract(this.freecam ? this.position : camera.clamp(...this.region))
         .add(position);
   }
   resolve (position: CosmosPointSimple, camera = this.position) {
      return (this.freecam ? this.position : camera.clamp(...this.region))
         .subtract(this.size.divide(this.scale.multiply(2)))
         .add(position);
   }
   start () {
      this.delta = 0;
      this.subtick = false;
      this.ticks = 0;
      this.application.start();
      this.wrapper?.appendChild(this.canvas);
   }
   stop () {
      this.application.stop();
      this.canvas.remove();
   }
   style () {
      return {
         blend: this.blend ?? CosmosRenderer.style.blend,
         border: this.border ?? CosmosRenderer.style.border,
         fill: this.fill ?? CosmosRenderer.style.fill,
         fontFamily: this.fontFamily ?? CosmosRenderer.style.fontFamily,
         fontSize: this.fontSize ?? CosmosRenderer.style.fontSize,
         stroke: this.stroke ?? CosmosRenderer.style.stroke,
         tint: this.tint ?? CosmosRenderer.style.tint,
         writingMode: this.writingMode ?? CosmosRenderer.style.writingMode
      };
   }
   tick () {
      this.fire('tick');
      let filters = this.container.filters?.slice() ?? null;
      for (const layer of this._layers) {
         if (layer.dumpster.length !== 0) {
            for (const object of layer.dumpster.splice(0)) {
               layer.objects.includes(object) || object.teardown();
            }
         }
         if (layer.active && layer.objects.length !== 0) {
            const dirty = layer.dirty;
            if (dirty) {
               layer.dirty = false;
               layer.container.removeChildren();
            }
            const vertical = layer.modifiers[1];
            for (const object of layer.objects.slice()) {
               if (object !== void 0) {
                  object.tick();
                  object.update(object.priority.value || (vertical ? object.position.y : 0));
                  if (dirty) {
                     layer.container.addChild(object.container);
                     object.setup();
                  }
               }
            }
            const subfilters = layer.container.filters;
            if (subfilters !== null && subfilters.length !== 0) {
               if (filters === null) {
                  filters = subfilters.slice();
               } else {
                  filters.push(...subfilters);
               }
            }
         } else if (layer.container.children.length !== 0) {
            layer.container.removeChildren();
            layer.dirty = true;
         }
      }
      this.fire('pre-render');
      let shakeX = 0;
      let shakeY = 0;
      const style = this.style();
      const camera = this.freecam ? this : this.position.clamp(...this.region);
      const subsize = this.size.divide(this.scale);
      const center = subsize.divide(2);
      if (this.shake.value !== 0) {
         shakeX = this.shake.value * (Math.random() - 0.5) * 2;
         shakeY = this.shake.value * (Math.random() - 0.5) * 2;
         if (this.shake_limit < Infinity) {
            if (shakeX < -this.shake_limit) {
               shakeX = -this.shake_limit;
            } else if (shakeX > this.shake_limit) {
               shakeX = this.shake_limit;
            }
            if (shakeY < -this.shake_limit) {
               shakeY = -this.shake_limit;
            } else if (shakeY > this.shake_limit) {
               shakeY = this.shake_limit;
            }
         }
      }
      this.fader.alpha = 1 - this.alpha.value;
      this.updateFilters(filters);
      for (const layer of this._layers) {
         if (layer.active && layer.objects.length !== 0) {
            const fixed = layer.modifiers[0];
            const zoom = fixed ? 1 : this.zoom.value;
            const subcamera = subsize.subtract(subsize.divide(zoom)).divide(2).add(camera);
            const scale = this.scale.multiply(zoom);
            layer.container.rotation = fixed ? 0 : this.rotation.value * (Math.PI / 180);
            layer.container.position.set(
               Math.round(((fixed ? 0 : center.x - subcamera.x) + shakeX) * scale.x),
               Math.round(((fixed ? 0 : center.y - subcamera.y) + shakeY) * scale.y)
            );
            layer.container.scale.set(scale.x, scale.y);
            for (const object of layer.objects) {
               object.render(camera, scale, style);
            }
         }
      }
      this.fire('render');
      if (CosmosImageUtils.dumpster.length !== 0) {
         for (const texture of CosmosImageUtils.dumpster.splice(0)) {
            texture.baseTexture.dispose();
            texture.destroy(false);
         }
      }
   }
   when (condition: (subtick: boolean) => boolean) {
      const { promise, resolve } = CosmosUtils.hyperpromise();
      this.whens.push({ condition, resolve });
      return promise;
   }
}

export class CosmosObject<
   A extends CosmosBaseEvents = CosmosBaseEvents,
   B extends CosmosMetadata = CosmosMetadata
> extends CosmosBase<A> {
   dumpster: CosmosObject[] = [];
   _objects = (() => {
      const value = [] as CosmosObject[];
      const proxy = new Proxy(value, {
         set: (target, key: any, value: CosmosObject) => {
            if (typeof value?.parent === 'object') {
               this.dirty = true;
               value.parent = this;
            }
            target[key] = value;
            return true;
         },
         deleteProperty: (target, key: any) => {
            const value = target[key];
            delete target[key];
            if (typeof value?.parent === 'object') {
               this.dirty = true;
               target.includes(value) || (value.parent = null);
            }
            return true;
         }
      });
      return { value, proxy };
   })();
   _offsets = (() => {
      const value = [] as CosmosPoint[];
      const proxy = new Proxy(value, {
         get (target, key: any) {
            return (target[key] ??= new CosmosPoint());
         }
      });
      return { value, proxy };
   })();
   acceleration: CosmosValue;
   dirty = false;
   gravity: CosmosPoint;
   metadata: B;
   parallax: CosmosPoint;
   parent: CosmosObject | null = null;
   priority: CosmosValue;
   spin: CosmosValue;
   subcontainer = new Container();
   velocity: CosmosPoint;
   get objects () {
      return this._objects.proxy;
   }
   set objects (value) {
      for (const object of this._objects.proxy.splice(0, this._objects.value.length)) {
         this.dumpster.includes(object) || this.dumpster.push(object);
      }
      this._objects.proxy.push(...value);
   }
   get offsets () {
      return this._offsets.proxy;
   }
   set offsets (value) {
      this._offsets.value.splice(0, this._offsets.value.length, ...value);
   }
   constructor (properties: CosmosObjectProperties<B> = {}) {
      super(properties);
      (({
         acceleration = 1,
         gravity = 0,
         offsets = comp.ear,
         metadata = {} as B,
         objects = comp.ear,
         parallax = 0,
         priority = 0,
         spin = 0,
         velocity = 0
      }: CosmosObjectProperties<B>) => {
         this.acceleration = new CosmosValue(acceleration);
         if (typeof gravity === 'number') {
            this.gravity = new CosmosPoint(gravity ?? 0);
         } else {
            this.gravity = new CosmosPoint(gravity?.x ?? 0, gravity?.y ?? 0);
         }
         this.metadata = metadata;
         this._offsets.value.push(
            ...offsets.map(offset => {
               if (typeof offset === 'number') {
                  return new CosmosPoint(offset ?? 0);
               } else {
                  return new CosmosPoint(offset?.x ?? 0, offset?.y ?? 0);
               }
            })
         );
         this._objects.proxy.push(...objects);
         if (typeof parallax === 'number') {
            this.parallax = new CosmosPoint(parallax ?? 0);
         } else {
            this.parallax = new CosmosPoint(parallax?.x ?? 0, parallax?.y ?? 0);
         }
         this.priority = new CosmosValue(priority);
         this.spin = new CosmosValue(spin);
         if (typeof velocity === 'number') {
            this.velocity = new CosmosPoint(velocity ?? 0);
         } else {
            this.velocity = new CosmosPoint(velocity?.x ?? 0, velocity?.y ?? 0);
         }
      })(properties);
      this.subcontainer.sortableChildren = true;
      this.container.addChild(this.subcontainer);
   }
   attach (...objects: CosmosObject[]) {
      for (const object of objects) {
         if (!this._objects.value.includes(object)) {
            this._objects.proxy.push(object);
            object.setup();
         }
      }
      return this;
   }
   detach (...objects: CosmosObject[]) {
      for (const object of objects) {
         const index = this._objects.value.indexOf(object);
         if (index !== -1) {
            this._objects.proxy.splice(index, 1);
            this.dumpster.includes(object) || this.dumpster.push(object);
         }
      }
      return this;
   }
   draw (style: CosmosStyle) {}
   getBlend (style: CosmosStyle) {
      if (this.blend === void 0) {
         let parent = this.parent;
         while (parent !== null) {
            if (parent.blend === void 0) {
               parent = parent.parent;
            } else {
               return parent.blend;
            }
         }
         return style.blend;
      } else {
         return this.blend;
      }
   }
   getBorder (style: CosmosStyle) {
      if (this.border === void 0) {
         let parent = this.parent;
         while (parent !== null) {
            if (parent.border === void 0) {
               parent = parent.parent;
            } else {
               return parent.border;
            }
         }
         return style.border;
      } else {
         return this.border;
      }
   }
   getFill (style: CosmosStyle) {
      if (this.fill === void 0) {
         let parent = this.parent;
         while (parent !== null) {
            if (parent.fill === void 0) {
               parent = parent.parent;
            } else {
               return parent.fill;
            }
         }
         return style.fill;
      } else {
         return this.fill;
      }
   }
   getFontFamily (style: CosmosStyle) {
      if (this.fontFamily === void 0) {
         let parent = this.parent;
         while (parent !== null) {
            if (parent.fontFamily === void 0) {
               parent = parent.parent;
            } else {
               return parent.fontFamily;
            }
         }
         return style.fontFamily;
      } else {
         return this.fontFamily;
      }
   }
   getFontSize (style: CosmosStyle) {
      if (this.fontSize === void 0) {
         let parent = this.parent;
         while (parent !== null) {
            if (parent.fontSize === void 0) {
               parent = parent.parent;
            } else {
               return parent.fontSize;
            }
         }
         return style.fontSize;
      } else {
         return this.fontSize;
      }
   }
   getStroke (style: CosmosStyle) {
      if (this.stroke === void 0) {
         let parent = this.parent;
         while (parent !== null) {
            if (parent.stroke === void 0) {
               parent = parent.parent;
            } else {
               return parent.stroke;
            }
         }
         return style.stroke;
      } else {
         return this.stroke;
      }
   }
   getTint (style: CosmosStyle) {
      if (this.tint === void 0) {
         let parent = this.parent;
         while (parent !== null) {
            if (parent.tint === void 0) {
               parent = parent.parent;
            } else {
               return parent.tint;
            }
         }
         return style.tint;
      } else {
         return this.tint;
      }
   }
   getWritingMode (style: CosmosStyle) {
      if (this.writingMode === void 0) {
         let parent = this.parent;
         while (parent !== null) {
            if (parent.writingMode === void 0) {
               parent = parent.parent;
            } else {
               return parent.writingMode;
            }
         }
         return style.writingMode;
      } else {
         return this.writingMode;
      }
   }
   render (camera: CosmosPointSimple, scale: CosmosPointSimple, style: CosmosStyle) {
      this.fire('pre-render');
      let x = this.position.x;
      let y = this.position.y;
      for (const offset of this._offsets.value) {
         if (offset !== void 0) {
            x += offset.x;
            y += offset.y;
         }
      }
      this.container.alpha = this.alpha.value;
      this.container.angle = this.rotation.value;
      this.container.position.set(x + this.parallax.x * camera.x, y + this.parallax.y * camera.y);
      this.container.scale.set(this.scale.x, this.scale.y);
      this.draw(style);
      this.updateFilters();
      for (const object of this._objects.value) {
         object.render(camera, scale, style);
      }
      this.fire('render');
   }
   setup () {
      for (const object of this.objects) {
         object.setup();
      }
   }
   teardown () {
      for (const object of this.objects) {
         object.teardown();
      }
   }
   tick () {
      if (this.dumpster.length !== 0) {
         for (const object of this.dumpster.splice(0)) {
            this.objects.includes(object) || object.teardown();
         }
      }
      if (this.dirty) {
         this.dirty = false;
         this.subcontainer.removeChildren();
         for (const object of this._objects.value) {
            this.subcontainer.addChild(object.container);
            object.setup();
         }
      }
      this.velocity.x += this.gravity.x;
      this.velocity.y += this.gravity.y;
      this.velocity.x *= this.acceleration.value;
      this.velocity.y *= this.acceleration.value;
      this.spin.value *= this.acceleration.value;
      this.rotation.value += this.spin.value;
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
      if (this._objects.value.length !== 0) {
         for (const object of this._objects.value.slice()) {
            object === void 0 || object.tick();
         }
      }
      this.fire('tick');
   }
   transparent () {
      if (this.alpha.value === 0) {
         return true;
      } else {
         let parent = this.parent;
         while (parent !== null) {
            if (parent.alpha.value === 0) {
               return true;
            } else {
               parent = parent.parent;
            }
         }
         return false;
      }
   }
   update (index: number) {
      index === this.container.zIndex || (this.container.zIndex = index);
      for (const object of this._objects.value) {
         object.update(object.priority.value);
      }
   }
}

// classes - fourth level
export class CosmosAnchoredObject<
   A extends CosmosBaseEvents = CosmosBaseEvents,
   B extends CosmosMetadata = CosmosMetadata
> extends CosmosObject<A, B> {
   anchor: CosmosPoint;
   constructor (properties: CosmosAnchoredObjectProperties<B> = {}) {
      super(properties);
      if (typeof properties.anchor === 'number') {
         this.anchor = new CosmosPoint(properties.anchor ?? -1);
      } else {
         this.anchor = new CosmosPoint(properties.anchor?.x ?? -1, properties.anchor?.y ?? -1);
      }
   }
   cast (position: CosmosPointSimple) {
      const size = this.compute();
      if (size.x !== 0 || size.y !== 0) {
         this.anchor.set(
            size
               .multiply(this.anchor)
               .subtract(this.position.multiply(2))
               .add(new CosmosPoint(position).multiply(2))
               .divide(size)
         );
      }
      this.position.set(position.x, position.y);
   }
   compute () {
      return new CosmosPoint();
   }
}

// classes - fifth level
export class CosmosSizedObject<
   A extends CosmosBaseEvents = CosmosBaseEvents,
   B extends CosmosMetadata = CosmosMetadata
> extends CosmosAnchoredObject<A, B> {
   size: CosmosPoint;
   constructor (properties: CosmosSizedObjectProperties<B> = {}) {
      super(properties);
      if (typeof properties.size === 'number') {
         this.size = new CosmosPoint(properties.size ?? 0);
      } else {
         this.size = new CosmosPoint(properties.size?.x ?? 0, properties.size?.y ?? 0);
      }
   }
   compute () {
      return this.size.clone();
   }
}

export class CosmosSprite<
   A extends CosmosBaseEvents = CosmosBaseEvents,
   B extends CosmosMetadata = CosmosMetadata
> extends CosmosAnchoredObject<A, B> {
   active = false;
   crop: CosmosCrop;
   duration: number;
   frames: (CosmosImage | null)[];
   image: CosmosImage | null = null;
   index: number;
   reverse: boolean;
   sprite = new Sprite();
   step: number;
   visible = false;
   constructor (properties: CosmosSpriteProperties<B> = {}) {
      super(properties);
      (({
         active = false,
         crop: { bottom = 0, left = 0, right = 0, top = 0 } = {},
         duration = 1,
         frames = [],
         index = 0,
         reverse = false,
         step = 0
      }: CosmosSpriteProperties<B> = {}) => {
         this.active = active;
         this.crop = { bottom, left, right, top };
         this.duration = duration;
         this.frames = frames;
         this.index = index;
         this.reverse = reverse;
         this.step = step;
      })(properties);
   }
   advance () {
      if (this.active && this.duration <= ++this.step) {
         this.step = 0;
         this.index += this.reverse ? -1 : 1;
         if (this.index < 0) {
            this.index = this.frames.length - 1;
         } else if (this.frames.length <= this.index) {
            this.index = 0;
         }
      }
   }
   compute (image = this.frame()) {
      if (image?.loaded) {
         return new CosmosPoint(
            (this.crop.right < 0 ? 0 : image.value.width) -
               this.crop.right -
               ((this.crop.left < 0 ? image.value.width : 0) + this.crop.left),
            (this.crop.bottom < 0 ? 0 : image.value.height) -
               this.crop.bottom -
               ((this.crop.top < 0 ? image.value.height : 0) + this.crop.top)
         );
      } else {
         return super.compute();
      }
   }
   disable () {
      this.active = false;
      return this;
   }
   draw (style: CosmosStyle) {
      if (this.frames.length === 0 || this.transparent()) {
         if (this.visible) {
            this.container.removeChildAt(0);
            this.visible = false;
         }
      } else {
         const sprite = this.sprite;
         if (!this.visible) {
            this.container.addChildAt(sprite, 0);
            this.visible = true;
         }
         this.refresh();
         sprite.anchor.set((this.anchor.x + 1) / 2, (this.anchor.y + 1) / 2);
         sprite.blendMode = this.getBlend(style);
         sprite.tint = this.getTint(style);
      }
   }
   enable (duration = this.duration) {
      this.active = true;
      this.duration = duration;
      return this;
   }
   frame () {
      let index = this.index % this.frames.length;
      index < 0 && (index += this.frames.length);
      return this.frames[index] ?? null;
   }
   read (image = this.frame()) {
      if (image?.loaded) {
         const x = (this.crop.left < 0 ? image.value.width : 0) + Math.round(this.crop.left);
         const y = (this.crop.top < 0 ? image.value.height : 0) + Math.round(this.crop.top);
         return CosmosImageUtils.pixels(
            image.value,
            new Rectangle(
               x,
               y,
               (this.crop.right < 0 ? 0 : image.value.width) - Math.round(this.crop.right) - x,
               (this.crop.bottom < 0 ? 0 : image.value.height) - Math.round(this.crop.bottom) - y
            )
         );
      } else {
         return new Uint8Array();
      }
   }
   refresh (next = this.frame()) {
      const sprite = this.sprite;
      const prev = this.image;
      if (prev !== next) {
         if (prev !== null) {
            const index = prev.sprites.indexOf(sprite);
            index === -1 || prev.sprites.splice(index, 1);
            CosmosImageUtils.dumpster.push(sprite.texture);
         }
         if (next !== null) {
            next.sprites.includes(sprite) || next.sprites.push(sprite);
            if (next.loaded) {
               sprite.texture = new Texture(next.value);
            } else {
               sprite.texture = Texture.EMPTY;
            }
         } else {
            sprite.texture = Texture.EMPTY;
         }
         this.image = next;
      }
      if (this.image?.loaded) {
         const frame = sprite.texture.frame;
         if (this.crop.bottom !== 0 || this.crop.left !== 0 || this.crop.right !== 0 || this.crop.top !== 0) {
            const value = this.image.value;
            const x = (this.crop.left < 0 ? value.width : 0) + this.crop.left;
            const y = (this.crop.top < 0 ? value.height : 0) + this.crop.top;
            frame.x = x;
            frame.y = y;
            frame.width = (this.crop.right < 0 ? 0 : value.width) - this.crop.right - x;
            frame.height = (this.crop.bottom < 0 ? 0 : value.height) - this.crop.bottom - y;
         } else {
            frame.x = 0;
            frame.y = 0;
            frame.width = this.image.value.width;
            frame.height = this.image.value.height;
         }
         sprite.texture.updateUvs();
      }
   }
   reset () {
      this.active = false;
      this.index = 0;
      this.step = 0;
      return this;
   }
   setup () {
      this.refresh();
      super.setup();
   }
   teardown () {
      this.refresh(null);
      super.teardown();
   }
   tick () {
      this.advance();
      super.tick();
   }
}

export class CosmosText<
   A extends CosmosBaseEvents = CosmosBaseEvents,
   B extends CosmosMetadata = CosmosMetadata
> extends CosmosAnchoredObject<A, B> {
   static state = 0;
   content: string;
   display = new Container();
   memory: [boolean, number, number, number, number, number, number, string, CosmosFont | null, number, CosmosWritingMode | null] = [
      false, // plain
      -1, // fill
      0, // font size
      0, // spacing x
      0, // spacing y
      -1, // state
      -1, // stroke
      '', // content
      null, // font family
      0, // blend mode
      null, // writing mode
   ];
   plain: boolean;
   spacing: CosmosPointSimple;
   swirl_time = 0;
   visible = false;
   wordify_rand = NaN;
   constructor (properties: CosmosTextProperties<B> = {}) {
      super(properties);
      (({ content = '', plain = false, spacing = 0 }: CosmosTextProperties<B> = {}) => {
         this.content = content;
         this.plain = plain;
         this.spacing = new CosmosPoint(spacing).value();
      })(properties);
   }
   compute () {
      const fontSize = this.getFontSize(CosmosRenderer.style);
      const fontFamily = this.getFontFamily(CosmosRenderer.style);
      if (fontSize === 0 || fontFamily?.loaded !== true) {
         return new CosmosPoint();
      } else {
         return fontFamily.metrics(this.content, {
            plain: this.plain,
            scale: fontSize / fontFamily.data.value!.size,
            spacing: this.spacing
         });
      }
   }
   draw (style: CosmosStyle) {
      const fontSize = this.getFontSize(style);
      const fontFamily = this.getFontFamily(style);
      const writingMode = this.getWritingMode(style);      

      if (fontSize === 0 || fontFamily?.loaded !== true || this.transparent()) {
         if (this.visible) {
            this.swirl_time = 0;
            this.visible = false;
            this.wordify_rand = NaN;
            this.container.removeChildAt(0);
         }
      } else {
         if (!this.visible) {
            this.visible = true;
            this.container.addChildAt(this.display, 0);
         }
         this.swirl_time++;

         let fill = this.getFill(style);
         let stroke = this.getStroke(style);
         let update = false;
         if (this.plain !== this.memory[0]) {
            this.memory[0] = this.plain;
            update = true;
         }
         if (fill !== this.memory[1]) {
            this.memory[1] = fill;
            update = true;
         }
         if (fontSize !== this.memory[2]) {
            this.memory[2] = fontSize;
            update = true;
         }
         if (this.spacing.x !== this.memory[3]) {
            this.memory[3] = this.spacing.x;
            update = true;
         }
         if (this.spacing.y !== this.memory[4]) {
            this.memory[4] = this.spacing.y;
            update = true;
         }
         if (CosmosText.state !== this.memory[5]) {
            this.memory[5] = CosmosText.state;
            update = true;
         }
         if (stroke !== this.memory[6]) {
            this.memory[6] = stroke;
            update = true;
         }
         if (this.content !== this.memory[7]) {
            this.memory[7] = this.content;
            update = true;
         }
         if (fontFamily !== this.memory[8]) {
            this.memory[8] = fontFamily;
            update = true;
         }
         if (writingMode !== this.memory[10]) {
            this.memory[10] = writingMode;
            update = true;
         }

         let updateBlend = false;
         const blend = this.getBlend(style);
         if (blend !== this.memory[9]) {
            this.memory[9] = blend;
            updateBlend = true;
         }

         const size = this.compute();
         const half = size.divide(2);
         const base = new CosmosPoint(this.container.position.x, this.container.position.y).subtract(
            half.add(half.multiply(this.anchor))
         );
         const border = this.getBorder(style);
         this.display.position.set(
            base.x - border / 2 + fontFamily.data.value!.shift_x - this.container.position.x,
            base.y - border / 2 + fontFamily.data.value!.shift_y - this.container.position.y
         );

         if (update) {
            let index = 0;
            let index_reuse = 0;
            let stretch = 1;
            const swirl = comp.swirl;
            swirl.h = false;
            swirl.p = 0;
            swirl.r = 0;
            swirl.s = 0;
            const cursor = comp.cursor;
            cursor.x = 0;
            cursor.y = 0;
            const mystify = comp.mystify;
            mystify.splice(0);
            const mystify_bucket = comp.mystify_bucket;
            mystify_bucket.splice(0);
            const reuse_length = this.display.children.length;
            const scale = fontSize / fontFamily.data.value!.size;
            const height = fontFamily.data.value!.height * scale;
            const shake = comp.shake;
            shake.x = 0;
            shake.y = 0;
            const subspacing = comp.subspacing;
            subspacing.x = 0;
            subspacing.y = 0;
            const wordify = comp.wordify;
            wordify.index = -1;
            wordify.size = 0;
            wordify.word = '';
            while (index < this.content.length) {
               let char = this.content[index++];
               if (char === '\n') {
                  switch (writingMode){
                     case "horizontal-tb":
                        cursor.x = 0;
                        cursor.y += height + this.spacing.y;
                        break;
                     case "vertical-rl":
                        cursor.x -= height + this.spacing.y;
                        cursor.y = 0;
                        break;
                  }
               } else if (!this.plain && char === '§') {
                  const code = this.content.slice(index, this.content.indexOf('§', index));
                  const [ key, value ] = code.split('=');
                  index += code.length + 1;
                  switch (key) {
                     case 'fill':
                        fill = CosmosImageUtils.color.of(value);
                        break;
                     case 'hue':
                        swirl.h = !swirl.h;
                        break;
                     case 'mystify':
                        mystify.splice(
                           0,
                           mystify.length,
                           ...value.split('').filter(char => char !== '' && char !== '/')
                        );
                        mystify_bucket.splice(0);
                        break;
                     case 'random':
                        const [ randomX, randomY ] = value.split('/').map(value => +value);
                        shake.x = randomX || 0;
                        shake.y = randomY || 0;
                        break;
                     case 'reset':
                        fill = this.getFill(style);
                        mystify.splice(0);
                        shake.x = 0;
                        shake.y = 0;
                        stroke = this.getStroke(style);
                        swirl.h = false;
                        swirl.r = 0;
                        swirl.s = 0;
                        swirl.p = 0;
                        wordify.index = -1;
                        break;
                     case 'shift':
                        cursor.x += +value * stretch;
                        break;
                     case 'stretch':
                        stretch = +value;
                        break;
                     case 'spacing':
                        const [ spacingX, spacingY ] = value.split('/').map(value => +value);
                        subspacing.x = spacingX || 0;
                        subspacing.y = spacingY || 0;
                        break;
                     case 'stroke':
                        stroke = CosmosImageUtils.color.of(value);
                        break;
                     case 'swirl':
                        const [ swirlR, swirlS, swirlP ] = value.split('/').map(value => +value);
                        swirl.r = swirlR || 0;
                        swirl.s = swirlS || 0;
                        swirl.p = swirlP || 0;
                        break;
                     case 'wordify':
                        const words = value.split('/').filter(word => word !== '');
                        if (words.length !== 0) {
                           wordify.index = 0;
                           wordify.size = Math.max(...words.map(word => fontFamily.metrics(word).x));
                           let rand: number;
                           if (Number.isNaN(this.wordify_rand)) {
                              rand = Math.random();
                              this.wordify_rand = rand;
                           } else {
                              rand = this.wordify_rand;
                              this.wordify_rand = NaN;
                           }
                           wordify.word = words[Math.floor(rand * words.length)];
                        } else {
                           wordify.index = -1;
                        }
                        break;
                  }
                  if (
                     mystify.length !== 0 ||
                     shake.x !== 0 ||
                     shake.y !== 0 ||
                     (swirl.s !== 0 && swirl.r !== 0) ||
                     wordify.index !== -1
                  ) {
                     this.memory[5] = -1;
                  }
               } else {
                  let dummyCursor = writingMode === "horizontal-tb" 
                     ? {x:cursor.x,y:cursor.y}
                     : {x:cursor.y,y:cursor.x};
                  let h = null as number | null;
                  let dummyX = dummyCursor.x + (shake.x !== 0 ? shake.x * stretch * (Math.random() - 0.5) : 0);
                  let dummyY = dummyCursor.y + (shake.y !== 0 ? shake.y * (Math.random() - 0.5) : 0);
                  if (swirl.r !== 0 && swirl.s !== 0) {
                     const angle =
                        (((this.swirl_time / CosmosMath.FRAME) * 360 * swirl.s) % 360) + index * (360 / swirl.p);
                     const endpoint = CosmosMath.ORIGIN.endpoint(angle, swirl.r);
                     swirl.h && (h = angle);
                     dummyX += endpoint.x * stretch;
                     dummyY += endpoint.y;
                  }
                  if (wordify.index !== -1) {
                     char = wordify.word[wordify.index++] ?? '';
                     if (wordify.index === wordify.word.length) {
                        dummyCursor.x += (wordify.size - fontFamily.metrics(wordify.word).x) * stretch;
                     }
                  }
                  if (mystify.length !== 0) {
                     char = mystify.splice(Math.floor(Math.random() * mystify.length), 1)[0];
                     if (mystify.length === 0) {
                        mystify.push(...mystify_bucket.splice(0));
                     } else {
                        mystify_bucket.push(char);
                     }
                  }
                  const code = char.charCodeAt(0);
                  const glyph = fontFamily.data.value!.glyphs[code];
                  if (glyph !== void 0) {
                     const reuse = index_reuse < reuse_length;
                     const sprite = reuse ? (this.display.children[index_reuse++] as Sprite) : new Sprite();
                     h === null ||
                        ((sprite.filters ??= [ new ColorMatrixFilter() ])[0] as ColorMatrixFilter).hue(h, false);
                     (updateBlend || !reuse) && (sprite.blendMode = blend);
                     const {x,y}=writingMode==="horizontal-tb"
                     ? { x: dummyX, y:dummyY }
                     : { x: dummyY, y:dummyX };

                     let xOffset = 0;

                     if(writingMode==="vertical-rl"){
                        const rect= this.parent?.parent
                        if(rect instanceof CosmosRectangle){
                           xOffset = rect.size.x - this.position.x - rect.position.x - (glyph[6] * scale + this.spacing.x + subspacing.x) * stretch;
                           console.log(rect.size,this.position,rect.position.x,xOffset)
                        }
                     }

                     sprite.position.set(x + glyph[4] + xOffset, y + glyph[5]);
                     sprite.scale.set(scale * stretch, scale);
                     sprite.texture = fontFamily.texture(code);
                     sprite.tint =
                        stroke === -1 || stroke === fill
                           ? fill
                           : CosmosImageUtils.gradient(fill, stroke, Math.min(Math.max(dummyCursor.x / size.x, 0), 1));
                     reuse || this.display.addChild(sprite);
                     dummyCursor.x += (glyph[6] * scale + this.spacing.x + subspacing.x) * stretch;
                  }
                  switch (writingMode){
                     case "horizontal-tb":
                        cursor.x = dummyCursor.x;
                        cursor.y = dummyCursor.y;
                        break;
                     case "vertical-rl":
                        cursor.x = dummyCursor.y;
                        cursor.y = dummyCursor.x;
                        break;
                  }                  
               }
            }
            if (index_reuse < reuse_length) {
               for (const child of this.display.removeChildren(index_reuse) as Sprite[]) {
                  child.destroy(false);
               }
            }
         }
      }
   }
   teardown () {
      this.memory[5] = -1;
      for (const child of this.display.removeChildren() as Sprite[]) {
         child.destroy(false);
      }
      super.teardown();
   }
}

// classes - sixth level
export class CosmosAnimation<
   A extends CosmosBaseEvents = CosmosBaseEvents,
   B extends CosmosMetadata = CosmosMetadata
> extends CosmosSprite<A, B> {
   _resources: CosmosAnimationResources | null = null;
   extrapolate: boolean;
   resources: CosmosAnimationResources | null;
   subcrop: CosmosCrop;
   constructor (properties: CosmosAnimationProperties<B> = {}) {
      super(properties);
      (({
         extrapolate = true,
         resources,
         subcrop: { bottom = 0, left = 0, right = 0, top = 0 } = {}
      }: CosmosAnimationProperties<B> = {}) => {
         this.extrapolate = extrapolate;
         this.resources = resources ?? null;
         this.subcrop = { bottom, left, right, top };
      })(properties);
      this.resources?.loaded && this.fix();
   }
   fix (force = false) {
      if (force || this.resources !== this._resources) {
         this._resources = this.resources;
         if (this.resources?.data.loaded) {
            this.frames = CosmosUtils.populate(this.resources.data.value!.frames.length, this.resources.image);
         } else {
            this.frames = [];
         }
      }
      if (this.resources?.data.loaded) {
         let index = this.index % this.frames.length;
         index < 0 && (index += this.frames.length);
         const info = this.resources.data.value!.frames[index];
         if (info !== void 0) {
            const x = (this.subcrop.left < 0 ? info.frame.w : 0) + this.subcrop.left;
            const y = (this.subcrop.top < 0 ? info.frame.h : 0) + this.subcrop.top;
            this.crop.left = info.frame.x + x;
            this.crop.right = -(
               this.crop.left +
               ((this.subcrop.right < 0 ? 0 : info.frame.w) - this.subcrop.right - x)
            );
            this.crop.top = info.frame.y + y;
            this.crop.bottom = -(
               this.crop.top +
               ((this.subcrop.bottom < 0 ? 0 : info.frame.h) - this.subcrop.bottom - y)
            );
            this.extrapolate && (this.duration = Math.round(info.duration / (1000 / 30)));
         }
      }
      return this;
   }
   tick () {
      super.tick();
      this.fix();
   }
   use (resources: CosmosAnimationResources | null) {
      this.resources = resources;
      this.index = 0;
      this.step = 0;
      this.resources?.loaded && this.fix();
      return this;
   }
}

export class CosmosHitbox<
   A extends CosmosBaseEvents = CosmosBaseEvents,
   B extends CosmosMetadata = CosmosMetadata
> extends CosmosSizedObject<A, B> {
   memory: [number, number, number, number, number, number, number, number, number] = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
   polygon = new Polygon(new Vector(), [ new Vector(), new Vector(), new Vector(), new Vector() ]);
   region: CosmosRegion = [
      { x: 0, y: 0 },
      { x: 0, y: 0 }
   ];
   calculate () {
      let parent = this.parent;
      const position = this.position.clone();
      let rotation = this.rotation.value;
      const scale = this.scale.clone();
      while (parent) {
         position.x += parent.position.x;
         position.y += parent.position.y;
         position.set(
            parent.position.endpoint(
               position.angleFrom(parent.position) + parent.rotation.value,
               position.extentOf(parent.position)
            )
         );
         rotation += parent.rotation.value;
         scale.x *= parent.scale.x;
         scale.y *= parent.scale.y;
         parent = parent.parent;
      }
      let update = false;
      if (this.anchor.x !== this.memory[0]) {
         this.memory[0] = this.anchor.x;
         update = true;
      }
      if (this.anchor.y !== this.memory[1]) {
         this.memory[1] = this.anchor.y;
         update = true;
      }
      if (this.size.x !== this.memory[2]) {
         this.memory[2] = this.size.x;
         update = true;
      }
      if (this.size.y !== this.memory[3]) {
         this.memory[3] = this.size.y;
         update = true;
      }
      if (position.x !== this.memory[4]) {
         this.memory[4] = position.x;
         update = true;
      }
      if (position.y !== this.memory[5]) {
         this.memory[5] = position.y;
         update = true;
      }
      if (rotation !== this.memory[6]) {
         this.memory[6] = rotation;
         update = true;
      }
      if (scale.x !== this.memory[7]) {
         this.memory[7] = scale.x;
         update = true;
      }
      if (scale.y !== this.memory[8]) {
         this.memory[8] = scale.y;
         update = true;
      }
      if (update) {
         const size = this.size.multiply(scale);
         const half = size.divide(2);
         this.polygon.pos.x = position.x;
         this.polygon.pos.y = position.y;
         this.polygon.setAngle(rotation * (Math.PI / 180));
         this.polygon.setOffset(new Vector(-(half.x + half.x * this.anchor.x), -(half.y + half.y * this.anchor.y)));
         this.polygon.setPoints([
            new Vector(),
            new Vector(size.x, 0),
            new Vector(size.x, size.y),
            new Vector(0, size.y)
         ]);
         if (this.polygon.calcPoints.length === 4) {
            const { x: x1, y: y1 } = this.polygon.calcPoints[0];
            const { x: x2, y: y2 } = this.polygon.calcPoints[1];
            const { x: x3, y: y3 } = this.polygon.calcPoints[2];
            const { x: x4, y: y4 } = this.polygon.calcPoints[3];
            this.region[0].x = Math.round((position.x + Math.min(x1, x2, x3, x4)) * 1000) / 1000;
            this.region[0].y = Math.round((position.y + Math.min(y1, y2, y3, y4)) * 1000) / 1000;
            this.region[1].x = Math.round((position.x + Math.max(x1, x2, x3, x4)) * 1000) / 1000;
            this.region[1].y = Math.round((position.y + Math.max(y1, y2, y3, y4)) * 1000) / 1000;
         } else {
            const { x, y } = this.polygon.calcPoints[0];
            this.region[0].x = Math.round((position.x + x) * 1000) / 1000;
            this.region[0].y = Math.round((position.y + y) * 1000) / 1000;
            this.region[1].x = Math.round((position.x + x) * 1000) / 1000;
            this.region[1].y = Math.round((position.y + y) * 1000) / 1000;
         }
      }
      return this;
   }
   detect (hitbox: CosmosHitbox) {
      if (testPolygonPolygon(this.polygon, hitbox.polygon)) {
         return (
            this.region[0].x < hitbox.region[1].x &&
            hitbox.region[0].x < this.region[1].x &&
            this.region[0].y < hitbox.region[1].y &&
            hitbox.region[0].y < this.region[1].y
         );
      }
      return false;
   }
}

export class CosmosRectangle<
   A extends CosmosBaseEvents = CosmosBaseEvents,
   B extends CosmosMetadata = CosmosMetadata
> extends CosmosSizedObject<A, B> {
   graphics = new Graphics();
   visible = false;
   draw (style: CosmosStyle) {
      const fill = this.getFill(style);
      const stroke = this.getStroke(style);
      if (
         ((this.size.x === 0 || this.size.y === 0 || fill === -1) && (this.border === 0 || stroke === -1)) ||
         this.transparent()
      ) {
         if (this.visible) {
            this.visible = false;
            this.container.removeChildAt(0);
         }
      } else {
         if (!this.visible) {
            this.visible = true;
            this.container.addChildAt(this.graphics, 0);
         }
         const graphics = this.graphics.clear();
         const half = this.size.divide(2);
         const origin = half.add(half.multiply(this.anchor));
         const base = new CosmosPoint(
            this.size.x < 0 ? origin.x + this.size.x : origin.x,
            this.size.y < 0 ? origin.y + this.size.y : origin.y
         );
         graphics.pivot.set(this.size.x * ((this.anchor.x + 1) / 2), this.size.y * ((this.anchor.y + 1) / 2));
         graphics.position.set(base.x - graphics.pivot.x, base.y - graphics.pivot.y);
         graphics.blendMode = this.getBlend(style);
         if (stroke !== -1) {
            graphics.lineStyle({ alpha: this.alpha.value, color: stroke, width: this.getBorder(style) });
         }
         if (fill !== -1) {
            graphics.beginFill(fill, this.alpha.value);
         }
         graphics.drawRect(0, 0, Math.abs(this.size.x), Math.abs(this.size.y)).endFill();
         graphics.tint = this.getTint(style);
      }
   }
}

// classes - seventh level
export class CosmosEntity<
   A extends CosmosBaseEvents = CosmosBaseEvents,
   B extends CosmosMetadata = CosmosMetadata
> extends CosmosHitbox<A, B> {
   face: CosmosDirection;
   idle = true;
   sprites: { [x in CosmosDirection]: CosmosSprite };
   step: number;
   task: (() => void) | undefined = void 0;
   get sprite () {
      return this.sprites[this.face];
   }
   constructor (properties: CosmosEntityProperties<B> = {}) {
      super(properties);
      (({
         face = 'down',
         sprites: {
            down = new CosmosSprite(),
            left = new CosmosSprite(),
            right = new CosmosSprite(),
            up = new CosmosSprite()
         } = {},
         step = 1
      }: CosmosEntityProperties<B> = {}) => {
         this.face = face;
         this.sprites = { down, left, right, up };
         this.step = step;
      })(properties);
   }
   move<B extends string> (
      offset: CosmosPointSimple,
      renderer?: CosmosRenderer<B>,
      keys: B[] = comp.ear,
      filter?: CosmosProvider<boolean, [CosmosHitbox]>
   ) {
      const source = this.position.value();
      const hitboxes = filter && renderer ? keys.flatMap(key => renderer.calculate(key, filter)) : comp.ear;
      for (const axis of comp.xy) {
         const distance = offset[axis];
         if (distance !== 0) {
            this.position[axis] += distance;
            const hits = renderer ? renderer.detect(this, ...hitboxes) : comp.ear;
            if (hits.length !== 0) {
               const single = (distance / Math.abs(distance)) * this.step;
               while (this.position[axis] !== source[axis] && renderer!.detect(this, ...hits).length !== 0) {
                  this.position[axis] -= single;
               }
            }
         }
      }
      if (this.position.x === source.x && this.position.y === source.y) {
         if (offset.y < 0) {
            this.face = 'up';
         } else if (offset.y > 0) {
            this.face = 'down';
         } else if (offset.x < 0) {
            this.face = 'left';
         } else if (offset.x > 0) {
            this.face = 'right';
         }
         for (const sprite of Object.values(this.sprites)) {
            sprite.reset();
         }
         return false;
      } else {
         if (this.position.y < source.y) {
            this.face = 'up';
         } else if (this.position.y > source.y) {
            this.face = 'down';
         } else if (this.position.x < source.x) {
            this.face = 'left';
         } else if (this.position.x > source.x) {
            this.face = 'right';
         }
         this.sprite.enable();
         return true;
      }
   }
   tick () {
      this._objects.value[0] === this.sprite || (this._objects.proxy[0] = this.sprite);
      super.tick();
   }
   async walk (renderer: CosmosRenderer, speed?: number, ...points: Partial<CosmosPointSimple>[]) {
      this.task?.();
      this.task = void 0;
      if (speed !== void 0) {
         let active = true;
         this.task = () => (active = false);
         let index = 0;
         const duration = Math.round(15 / speed);
         this.idle = false;
         await renderer.when(subtick => {
            if (subtick) {
               return false;
            } else if (active) {
               const { x = this.position.x, y = this.position.y } = points[index];
               const limit = speed * renderer.speed.value;
               const dx = Math.min(Math.max(x - this.position.x, -limit), limit);
               const dy = Math.min(Math.max(y - this.position.y, -limit), limit);
               this.sprite.duration = duration;
               this.move({ x: dx, y: dy });
               if (Math.abs(x - this.position.x) < 0.000001 && Math.abs(y - this.position.y) < 0.000001) {
                  this.move(comp.x0y0);
                  this.position.set(x, y);
                  if (++index !== points.length) {
                     return false;
                  }
               } else {
                  return false;
               }
            }
            for (const sprite of Object.values(this.sprites)) {
               sprite.reset();
            }
            return true;
         });
         this.idle = true;
      } else {
         for (const sprite of Object.values(this.sprites)) {
            sprite.reset();
         }
      }
   }
}

// classes - eighth level
export class CosmosCharacter<
   A extends CosmosBaseEvents = CosmosBaseEvents,
   B extends CosmosMetadata = CosmosMetadata
> extends CosmosEntity<A, B> {
   key: string;
   preset: CosmosCharacterPreset;
   talk = false;
   get sprite () {
      return this.getSprites()[this.face];
   }
   constructor (properties: CosmosCharacterProperties<B>) {
      super(properties);
      (({ key, preset }: CosmosCharacterProperties<B>) => {
         this.key = key;
         this.preset = preset;
      })(properties);
   }
   getSprites () {
      return this.talk
         ? this.preset.talk
         : this.idle
         ? this.preset.idle
            ? this.preset.talk
            : this.preset.walk
         : this.preset.walk;
   }
   tick () {
      this.sprites = this.getSprites();
      super.tick();
   }
}

export class CosmosPlayer<
   A extends CosmosBaseEvents = CosmosBaseEvents,
   B extends CosmosMetadata = CosmosMetadata
> extends CosmosEntity<A, B> {
   _face: CosmosDirection | null = null;
   extent = new CosmosPoint();
   interactor = new CosmosHitbox();
   puppet = false;
   constructor (properties: CosmosPlayerProperties<B> = {}) {
      super(properties);
      this.extent = new CosmosPoint(properties.extent ?? -1);
   }
   tick () {
      if (this.face !== this._face) {
         this._face = this.face;
         this.interactor.anchor.set(
            this.face === 'left' ? 1 : this.face === 'right' ? -1 : 0,
            this.face === 'up' ? 1 : this.face === 'down' ? -1 : 0
         );
         this.interactor.size.set(
            this.face === 'left' || this.face === 'right' ? this.extent.y : this.extent.x,
            this.face === 'down' || this.face === 'up' ? this.extent.y : this.extent.x
         );
      }
      this._objects.value[1] === this.interactor || (this._objects.proxy[1] = this.interactor);
      super.tick();
   }
   async walk (renderer: CosmosRenderer, speed?: number, ...targets: Partial<CosmosPointSimple>[]) {
      this.puppet = true;
      await super.walk(renderer, speed, ...targets);
      this.puppet = false;
   }
}

export const CosmosAudioUtils = {
   EMPTY: new AudioBuffer({ length: 1, numberOfChannels: 2, sampleRate: 8000 }),
   analysers: [] as [CosmosInstance | null, AnalyserNode][],
   context: null as AudioContext | null,
   samples: new Float32Array(1),
   delay (context: AudioContext, offset: number, feedback: number, echoes = Infinity) {
      const gain = new GainNode(context, { gain: feedback });
      const delay = new DelayNode(context, { delayTime: offset, maxDelayTime: Math.min(offset * echoes, 60) });
      gain.connect(delay);
      delay.connect(gain);
      return gain;
   },
   convolver (context: AudioContext, duration: number, mapper = (value: number) => 1 - value) {
      const length = context.sampleRate * duration;
      const buffer = new AudioBuffer({ length, numberOfChannels: 2, sampleRate: context.sampleRate });
      let channel = 0;
      while (channel < buffer.numberOfChannels) {
         let index = 0;
         const data = buffer.getChannelData(channel++);
         while (index < length) {
            data[index] = (Math.random() * 2 - 1) * mapper(index / length);
            data[index] = (Math.random() * 2 - 1) * mapper(index / length);
            index++;
         }
      }
      return new ConvolverNode(context, { buffer });
   },
   getContext () {
      return (CosmosAudioUtils.context ??= new AudioContext());
   }
};

export const CosmosImageUtils = {
   EMPTY: BaseTexture.fromBuffer(new Uint8Array([ 0, 0, 0, 0 ]), 1, 1),
   color: new CosmosCache<string, number>(key => {
      const color = colord(key).toRgb();
      return Math.round(color.r) * 65536 + Math.round(color.g) * 256 + Math.round(color.b);
   }),
   dumpster: [] as Texture[],
   extract: null as Extract | null,
   getExtract () {
      return (CosmosImageUtils.extract ??= new Extract(new Renderer({ antialias: false, backgroundAlpha: 0 })));
   },
   gradient (c1: number, c2: number, v: number) {
      return (
         Math.round(CosmosMath.remap(v, Math.floor(c1 / 65536) % 256, Math.floor(c2 / 65536) % 256)) * 65536 +
         Math.round(CosmosMath.remap(v, Math.floor(c1 / 256) % 256, Math.floor(c2 / 256) % 256)) * 256 +
         Math.round(CosmosMath.remap(v, c1 % 256, c2 % 256))
      );
   },
   pixels (texture: BaseTexture, rectangle = new Rectangle(0, 0, texture.width, texture.height)) {
      const sprite = new Sprite(new Texture(texture));
      const pixels = CosmosImageUtils.getExtract().pixels(sprite, rectangle);
      sprite.destroy({ texture: true, baseTexture: false });
      return pixels;
   }
};

// constants
export const CosmosMath = {
   COS_ARRAY: (() => {
      const arr = new Float64Array(360);
      let i = 0;
      while (i < 360) {
         arr[i] = Math.cos(i++ * (Math.PI / 180));
      }
      return arr;
   })(),
   FRAME: 100 / 3,
   FRAME_2: 100 / 6,
   ORIGIN: new CosmosPoint(),
   SIN_ARRAY: (() => {
      const arr = new Float64Array(360);
      let i = 0;
      while (i < 360) {
         arr[i] = Math.sin(i++ * (Math.PI / 180));
      }
      return arr;
   })(),
   bezier (value: number, ...points: number[]): number {
      switch (points.length) {
         case 0:
            return value;
         case 1:
            // 0
            return points[0];
         case 2:
            if (points[0] === points[1]) {
               // 0, 0
               return points[0];
            } else {
               // 0, 1
               return (value * (points[1] - points[0])) / 1 + points[0];
            }
         case 3:
            if (points[0] === points[1]) {
               if (points[0] === points[2]) {
                  // 0, 0, 0
                  return points[0];
               } else {
                  // 0, 0, 1
                  return value ** 2 * (points[2] - points[0]) + points[0];
               }
            } else if (points[0] === points[2]) {
               // 0, 1, 0
               return (value * (value - 1) * 2 + 1) * (points[0] - points[1]) + points[1];
            } else if (points[1] === points[2]) {
               // 0, 1, 1
               return (1 - (1 - value) ** 2) * (points[1] - points[0]) + points[0];
            }
            break;
         case 4:
            if (points[0] === points[1]) {
               if (points[0] === points[2]) {
                  if (points[0] === points[3]) {
                     // 0, 0, 0, 0
                     return points[0];
                  } else {
                     // 0, 0, 0, 1
                     return value ** 3 * (points[3] - points[0]) + points[0];
                  }
               } else if (points[2] === points[3]) {
                  // 0, 0, 1, 1
                  return value ** 2 * (3 - value * 2) * (points[3] - points[0]) + points[0];
               }
            } else if (points[1] === points[2]) {
               if (points[0] === points[3]) {
                  // 0, 1, 1, 0
                  return (value * (value - 1) * 3 + 1) * (points[0] - points[1]) + points[1];
               } else if (points[1] === points[3]) {
                  // 0, 1, 1, 1
                  return (1 - (1 - value) ** 3) * (points[1] - points[0]) + points[0];
               }
            }
            break;
      }
      let total = points.length - 1;
      while (total !== 0) {
         let index = 0;
         while (index < total) {
            points[index] = points[index] * (1 - value) + points[index + 1] * value;
            index++;
         }
         total--;
      }
      return points[0];
   },
   cos (i: number) {
      if (i === Math.floor(i)) {
         while (i < 0) {
            i += 360;
         }
         while (360 <= i) {
            i -= 360;
         }
         return CosmosMath.COS_ARRAY[i];
      } else {
         return Math.cos(i * (Math.PI / 180));
      }
   },
   intersection (a1: CosmosPointSimple, a2: CosmosPointSimple, b1: CosmosPointSimple, b2: CosmosPointSimple) {
      return (
         CosmosMath.rotation(a1, b1, b2) !== CosmosMath.rotation(a2, b1, b2) &&
         CosmosMath.rotation(a1, a2, b1) !== CosmosMath.rotation(a1, a2, b2)
      );
   },
   rotation (a1: CosmosPointSimple, a2: CosmosPointSimple, a3: CosmosPointSimple) {
      return (a3.y - a1.y) * (a2.x - a1.x) > (a2.y - a1.y) * (a3.x - a1.x);
   },
   linear (value: number, ...points: number[]) {
      if (points.length === 0) {
         return value;
      } else if (points.length === 1) {
         return points[0];
      } else if (value <= 0) {
         return CosmosMath.remap(value, points[0], points[1]);
      } else if (1 <= value) {
         return CosmosMath.remap(value, points[points.length - 2], points[points.length - 1]);
      } else {
         const supervalue = value * (points.length - 1);
         const index = Math.floor(supervalue);
         return CosmosMath.remap(supervalue % 1, points[index], points[index + 1]);
      }
   },
   ray (a: number, b: number) {
      return { x: b * CosmosMath.sin(a + 90), y: -b * CosmosMath.cos(a + 90) };
   },
   remap (value: number, min2: number, max2: number, min1 = 0, max1 = 1) {
      return ((value - min1) * (max2 - min2)) / (max1 - min1) + min2;
   },
   remap_clamped (value: number, min2: number, max2: number, min1 = 0, max1 = 1) {
      return Math.min(Math.max(((value - min1) * (max2 - min2)) / (max1 - min1) + min2, min2), max2);
   },
   sin (i: number) {
      if (i === Math.floor(i)) {
         while (i < 0) {
            i += 360;
         }
         while (360 <= i) {
            i -= 360;
         }
         return CosmosMath.SIN_ARRAY[i];
      } else {
         return Math.sin(i * (Math.PI / 180));
      }
   },
   /** output ranges from -size to size */
   spread (size: number, index: number, total: number) {
      if (total <= 1) {
         return 0;
      } else {
         const base = (total - 1) / 2;
         return ((index - base) / base) * size;
      }
   },
   /** output cuts range of -size to size into slices, and returns the center of the slice index */
   spread_quantize (size: number, index: number, total: number) {
      return CosmosMath.spread(size, (index % total) + 0.5, total + 1);
   },
   transform (transform: CosmosTransform, object: CosmosObject, camera = { x: 0, y: 0 }): CosmosTransform {
      let x = object.position.x;
      let y = object.position.y;
      for (const offset of object._offsets.value) {
         if (offset !== void 0) {
            x += offset.x;
            y += offset.y;
         }
      }
      return [
         transform[0]
            .add(transform[2].multiply(x, y))
            .shift(transform[1], 0, transform[0])
            .add(object.parallax.multiply(camera)),
         transform[1] + object.rotation.value,
         transform[2].multiply(object.scale)
      ];
   },
   wave (value: number) {
      return CosmosMath.sin(Math.round(((value + 0.5) * 2 - 1) * 180)) / 2 + 0.5;
   },
   weigh<A> (input: CosmosProvider<[A, number][]>, modifier: number) {
      const weights = CosmosUtils.provide(input);
      let total = 0;
      for (const entry of weights) {
         total += entry[1];
      }
      const value = modifier * total;
      for (const entry of weights) {
         if (value > (total -= entry[1])) {
            return entry[0];
         }
      }
   }
};

export const CosmosUtils = {
   chain<A, B> (input: A, handler: (input: A, loop: (input: A) => B) => B) {
      const loop = (input: A) => handler(input, loop);
      return loop(input);
   },
   hyperpromise<A = void> () {
      let hyperresolve: (value: A | PromiseLike<A>) => void;
      const promise = new Promise<A>(resolve => {
         hyperresolve = resolve;
      });
      const state = { active: true, promise, resolve: hyperresolve! };
      promise.then(() => (state.active = false));
      return state;
   },
   import<A = any> (source: string) {
      return CosmosUtils.xhr(source, 'json') as Promise<A>;
   },
   parse<A = any> (text: string | null | void, fallback?: A): A {
      if (text || fallback === void 0) {
         return JSON.parse(text ?? '', (key, value) => {
            if (value === '\x00') {
               return Infinity;
            } else if (value === '\x01') {
               return -Infinity;
            } else if (value === '\x02') {
               return NaN;
            } else {
               return value;
            }
         });
      } else {
         return fallback;
      }
   },
   populate: ((size: number, provider: any) => {
      let index = 0;
      const array: any[] = [];
      while (index < size) {
         array.push(CosmosUtils.provide(provider, index++));
      }
      return array;
   }) as {
      <A extends (index: number) => unknown>(size: number, provider: A): ReturnType<A>[];
      <A>(size: number, provider: A): A[];
   },
   provide<A extends CosmosProvider<unknown, unknown[]>> (
      provider: A,
      ...args: A extends CosmosProvider<infer _, infer C> ? C : never
   ): A extends CosmosProvider<infer B, any[]> ? B : never {
      return typeof provider === 'function' ? provider(...args) : provider;
   },
   serialize (value: any, beautify = false) {
      return JSON.stringify(
         value,
         (key, value) => {
            if (value === Infinity) {
               return '\x00';
            } else if (value === -Infinity) {
               return '\x01';
            } else if (typeof value === 'number' && value !== value) {
               return '\x02';
            } else {
               return value;
            }
         },
         beautify ? 3 : void 0
      );
   },
   status (
      text: string,
      {
         backgroundColor = '#000',
         color = '#fff',
         fontFamily = 'monospace',
         fontSize = '16px',
         fontStyle = 'italic',
         fontWeight = 'bold',
         padding = '4px 8px'
      } = {}
   ) {
      console.log(
         `%c${text}`,
         `background-color:${backgroundColor};color:${color};font-family:${fontFamily};font-size:${fontSize};font-style:${fontStyle};font-weight:${fontWeight};padding:${padding};`
      );
   },
   async xhr (url: string, responseType: XMLHttpRequestResponseType) {
      while (true) {
         try {
            return await new Promise<any>((resolve, reject) => {
               const errorListener = function () {
                  xhr.removeEventListener('error', errorListener);
                  xhr.removeEventListener('load', loadListener);
                  reject();
               };
               const loadListener = async function () {
                  xhr.removeEventListener('error', errorListener);
                  xhr.removeEventListener('load', loadListener);
                  resolve(xhr.response);
               };
               const xhr = new XMLHttpRequest();
               xhr.responseType = responseType;
               xhr.timeout = 0;
               xhr.addEventListener('error', errorListener);
               xhr.addEventListener('load', loadListener);
               xhr.open('GET', url);
               xhr.send();
            });
         } catch {}
      }
   }
};

addEventListener('keydown', ({ key, code }) => {
   for (const input of CosmosKeyboardInput.inputs) {
      if (input.keycodes.includes(code) || input.keycodes.includes(`k:${key.toLowerCase()}`)) {
         input.down(code);
      }
   }
});

addEventListener('keyup', ({ key, code }) => {
   for (const input of CosmosKeyboardInput.inputs) {
      if (input.keycodes.includes(code) || input.keycodes.includes(`k:${key.toLowerCase()}`)) {
         input.up(code);
      }
   }
});

CosmosUtils.status(`LOAD MODULE: STORYTELLER (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
