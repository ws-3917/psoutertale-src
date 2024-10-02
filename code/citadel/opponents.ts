import { AdvancedBloomFilter } from '@pixi/filter-advanced-bloom';
import { GlitchFilter } from '@pixi/filter-glitch';
import { HslAdjustmentFilter } from '@pixi/filter-hsl-adjustment';
import { PixelateFilter } from '@pixi/filter-pixelate';
import { ZoomBlurFilter } from '@pixi/filter-zoom-blur';
import { BaseTexture, BLEND_MODES, Filter, Graphics, Rectangle } from 'pixi.js';
import text from '../../languages/default/text/citadel';
import { epiphany, resetBox, screenCheck, standardPos, standardSize } from '../common/api';
import commonOpponents from '../common/opponents';
import commonPatterns from '../common/patterns';
import { content, filters, inventories, music, sounds, vert_standard } from '../systems/assets';
import { atlas, events, game, renderer, rng, speech, typer } from '../systems/core';
import {
   antifreeze,
   battler,
   box,
   calcHP,
   choicer,
   dialogue_primitive,
   dropShake,
   fader,
   heal,
   player,
   quickshadow,
   saver,
   sawWaver,
   shake,
   sineWaver,
   teleport,
   teleporter,
   world
} from '../systems/framework';
import { OutertaleOpponent, OutertaleTurnState } from '../systems/outertale';
import { SAVE } from '../systems/save';
import {
   CosmosAnimation,
   CosmosAnimationResources,
   CosmosFont,
   CosmosHitbox,
   CosmosImage,
   CosmosImageUtils,
   CosmosInventory,
   CosmosKeyed,
   CosmosMath,
   CosmosObject,
   CosmosPoint,
   CosmosPointSimple,
   CosmosProvider,
   CosmosRectangle,
   CosmosRenderer,
   CosmosSprite,
   CosmosText,
   CosmosUtils,
   CosmosValue
} from '../systems/storyteller';
import patterns, { dogtrigger, glitcher } from './patterns';

export const barrierPower = new CosmosValue();

export function genBarrierGraphics () {
   return new CosmosObject({
      area: renderer.area,
      metadata: { timephase: 0, warpphase: 0, init: false, gr: new Graphics(), tint: 0xcfcfcf },
      filters: [ filters.bloomX ]
   }).on('tick', function () {
      const gr = this.metadata.gr;
      if (this.metadata.init) {
         gr.clear();
      } else {
         this.metadata.init = true;
         this.container.addChild(gr);
      }
      let f = this.metadata.timephase % 1;
      let c = this.metadata.timephase % 7;
      let r = 266.2 * CosmosMath.remap(CosmosMath.wave(this.metadata.warpphase / 20), 1, 1 + barrierPower.value * 0.1);
      let y = -40;
      const u = CosmosMath.linear(barrierPower.value, 1 / 120, 1 / 6);
      const v = 1 + barrierPower.value / 2;
      while (r > 1) {
         // 0.26 ^ 10 and 0.74 ^ 10 mark the 1 / 510 rounding thresholds
         if (f > 0.26 && f < 0.74) {
            gr.beginFill(
               CosmosImageUtils.gradient(
                  0,
                  barrierPower.value > 0
                     ? CosmosImageUtils.gradient(
                          0xcfcfcf,
                          [ 0xff0000, 0xffff00, 0x00ff00, 0x00ffff, 0x007fff, 0x0000ff, 0x7f00ff ][Math.floor(c)],
                          barrierPower.value ** 2
                       )
                     : this.metadata.tint,
                  CosmosMath.linear(f, 0, 1, 0) ** 10 * (SAVE.flag.b.$option_epilepsy ? 0.25 : 1)
               )
            )
               .drawCircle(0, y, r)
               .endFill();
         }
         f = (f + u / 2) % 1;
         c = (c + u / 2) % 7;
         r /= 1.1;
         y += Math.min(r, 20) / 20;
      }
      this.metadata.timephase += u * v;
      this.metadata.warpphase += barrierPower.value;
   });
}

export const barrier = new CosmosRectangle({
   fill: 0,
   size: 1000,
   priority: 1000,
   position: { x: 160, y: 120 },
   anchor: 0,
   objects: [
      genBarrierGraphics(),
      new CosmosRectangle({ fill: 0, size: 1000, position: { x: 160, y: 120 }, anchor: 0 })
   ]
}).on('tick', function () {
   if (game.room === 'c_exit') {
      this.alpha.value = 1;
      this.objects[0].alpha.value = 1;
      this.objects[1].alpha.value = 0;
      if (game.music) {
         game.music.gain.value = 1;
         game.music.gain.modulate(renderer, 0, 1);
      }
   } else if (game.room === 'c_road3') {
      if (player.position.y < 640) {
         this.alpha.value = 1;
         this.objects[0].alpha.value = 1;
         this.objects[1].alpha.value = 0.5 + Math.min(Math.max(player.position.y / 640, 0), 1) ** 1.2 * 0.5;
      } else {
         this.alpha.value = (1 - Math.min(Math.max((player.position.y - 640) / 640, 0), 1)) ** 1.2;
         this.objects[0].alpha.value = 0;
         this.objects[1].alpha.value = 0;
      }
      if (game.music) {
         if (player.position.y < 960) {
            const v = 1 * (1 - Math.min(Math.max(player.position.y / 960, 0), 1)) ** 1.2;
            game.music.gain.value = v;
            game.music.gain.modulate(renderer, 0, v);
         } else {
            game.music.gain.value = 0;
            game.music.gain.modulate(renderer, 0, 0);
         }
      }
   } else {
      renderer.detach('base', this);
   }
});

export function archiveOpponent (
   assets: CosmosInventory,
   acts: string[],
   statuses: (() => string[])[],
   bubblePos: CosmosPointSimple,
   act: Partial<
      CosmosKeyed<
         (
            state: OutertaleTurnState<{
               p: number;
               f: boolean;
               t: (...lines: string[]) => Promise<void>;
               x: CosmosKeyed;
            }>
         ) => void | Promise<void>,
         string
      >
   >,
   boxSize: CosmosPointSimple | null,
   pattern: (p: number, x: CosmosKeyed) => Promise<number | void>,
   name: () => string,
   asset: CosmosImage | CosmosAnimationResources,
   color: number
) {
   return new OutertaleOpponent({
      assets,
      acts: acts.map(act => [ act, [] ]),
      bullyable: false,
      sparable: false,
      hp: Infinity,
      df: 0,
      exp: 0,
      metadata: { nootexempt: true },
      handler: battler.opponentHandler({
         vars: {
            p: 0,
            f: false,
            async t (...lines: string[]) {
               const vc = battler.volatile[0].container;
               const bubbleWrap = new CosmosObject({
                  position: new CosmosPoint(bubblePos).subtract(vc).subtract(vc.objects[0]),
                  objects: [
                     new CosmosObject({
                        objects: [
                           new CosmosSprite({ frames: [ content.ibuBubbleBlookyInverted ], scale: 0.5 }),
                           new CosmosText({
                              fill: 0xffffff,
                              position: { x: 10, y: 5 },
                              spacing: { x: -2 }
                           }).on('tick', function () {
                              this.fontFamily = speech.state.fontFamily2;
                              this.fontSize = speech.state.fontSize2;
                              this.content = game.text;
                           })
                        ]
                     })
                  ]
               });
               atlas.switch('dialoguerBase');
               vc.objects[0].attach(bubbleWrap);
               await dialogue_primitive(...lines);
               atlas.switch(null);
               vc.objects[0].detach(bubbleWrap);
            },
            x: {} as CosmosKeyed
         },
         defaultStatus: state => statuses[state.vars.p],
         fight ({ volatile }, power) {
            return battler.attack(volatile, { power });
         },
         act,
         spare (state) {
            state.volatile.sparable && (state.vars.f = true);
         },
         async pretalk (state) {
            const talk = CosmosUtils.provide(state.talk, state);
            if (talk.length > 0) {
               await state.vars.t(
                  ...(typeof talk[0] === 'string'
                     ? (talk as string[])
                     : (talk as string[][])[Math.floor(Math.random() * talk.length)])
               );
            }
            state.talk = [];
         },
         async postchoice (state) {
            if (state.vars.f) {
               battler.music?.stop();
               state.volatile.alive = false;
               SAVE.data.n.xm++;
               sounds.xm.instance(renderer, 0.108);
               await state.volatile.container.alpha.modulate(renderer, 1000, 0);
               events.fire('exit');
            }
         },
         async prestatus (state) {
            if (state.volatile.alive) {
               game.movement = true;
               let trashcan = null as null | (() => void);
               if (boxSize) {
                  await standardSize(boxSize, true);
                  standardPos(true);
                  trashcan = glitcher(battler.bullets, 1);
               }
               state.vars.p =
                  (await pattern(state.volatile.sparable ? -999 : state.vars.p, state.vars.x)) ?? state.vars.p;
               trashcan?.();
               game.movement = false;
               await resetBox(true);
            }
         },
         poststatus (state) {
            state.volatile.alive && battler.resume();
         }
      }),
      name,
      sprite () {
         let spr: CosmosSprite;
         const metadata = {
            glitch: new GlitchFilter({ slices: 32, offset: SAVE.flag.b.$option_epilepsy ? 8 : 16 }),
            t: 0,
            pixel: new PixelateFilter(SAVE.flag.b.$option_epilepsy ? 2 : 4),
            sptint: CosmosImageUtils.gradient(0xffffff, color, 0.5)
         };
         if (asset.value instanceof BaseTexture) {
            spr = new CosmosSprite({ metadata, frames: [ asset as CosmosImage ] });
         } else {
            spr = new CosmosAnimation({ metadata, resources: asset as CosmosAnimationResources });
         }
         spr.anchor.set(0, 1);
         return spr.on('tick', function () {
            if (this.metadata.t < 6) {
               battler.overlay.area = renderer.area;
               battler.overlay.filters = [ this.metadata.glitch, this.metadata.pixel ];
               this.metadata.glitch.refresh();
               this.tint = this.metadata.sptint;
            } else {
               battler.overlay.area = null;
               battler.overlay.filters = null;
            }
            if (this.metadata.t === 0) {
               this.metadata.t = Math.floor(20 + Math.random() * 40);
               this.metadata.glitch.offset = Math.floor(12 + Math.random() * 12);
               this.tint = void 0;
            }
            this.metadata.t--;
         });
      }
   });
}

export function faceTicker (name: string) {
   const preset = speech.presets.of(name);
   return function (this: CosmosSprite) {
      const sprite = preset.faces![this.index] ?? new CosmosSprite();
      this.objects[0] = sprite;
      if (preset === speech.state.preset) {
         speech.state.face = sprite;
      }
   };
}

export const azFilters: Filter[] = [
   new AdvancedBloomFilter({ brightness: 1, quality: 5, bloomScale: 0.3, threshold: 0, pixelSize: 0.5 })
];

export const azAssets1 = new CosmosInventory(
   content.ibcMettatonBody,
   content.ibcMettatonArmsWhatevs,
   content.ibcMettatonArmsNoticard,
   content.ibcMettatonArmsThonk,
   content.ibcMettatonArmsWhaaat,
   content.ibcMettatonArmsBruh,
   content.ibcNapstablookBattle,
   content.avNapstablook,
   inventories.avMettaton,
   content.ibcMettatonWheel,
   content.ibcUndyneHead,
   content.ibcUndyneDate,
   content.ibcUndyneHair,
   content.ibcPapyrusBattle,
   content.ibcTorielBattle2,
   content.ibcSansBattle,
   content.avSans,
   inventories.ibcPapyrusHead
);

export const azAssets2 = new CosmosInventory(
   content.ibcAsrielGigavine,
   content.ibcSansWrap,
   content.ibcSansWrapShock,
   content.ibcAlphysWrap,
   content.ibcAlphysWrapShock,
   content.ibcPapyrusWrap,
   content.ibcPapyrusWrapShock,
   content.ibcUndyneWrap,
   content.ibcUndyneWrapShock,
   content.ibcAsgoreWrap,
   content.ibcAsgoreWrapShock,
   content.ibcTorielWrap,
   content.ibcTorielWrapShock,
   inventories.twinklyAssets,
   content.idcAsgoreSmacked,
   content.ibcPapyrusSmacked,
   content.ibcUndyneWrapped,
   content.asShatter,
   content.asTwinklyLaugh,
   content.ibcAsgoreCrown
);

export const azAssets3 = new CosmosInventory(
   content.asLanding,
   content.ibbPellet,
   content.asBell,
   content.ibbSmolbol,
   content.ibbRedspear,
   content.ibbBone,
   content.ibbBonesection,
   content.ibbLightning,
   content.asDestroyed,
   content.ibcKiddBody,
   content.ibuBubbleDGU1,
   content.ibuBubbleDGU2,
   content.ibcPerigeeBody,
   content.ibcPerigeeHurt,
   content.ibcWoshuaBody,
   content.ibcWoshuaDuck,
   content.ibcWoshuaFace,
   content.ibcWoshuaHanger,
   content.ibcWoshuaHead,
   content.ibcWoshuaHurt,
   content.ibcWoshuaTail,
   content.ibcWoshuaWater,
   content.ibcDummyMadBase,
   content.ibcDummyMadTorso,
   content.ibcDummyMadHead,
   content.ibcDummyMadBody,
   content.ibcDummyFinalghost,
   content.ibcShyrenBattleAgent,
   content.ibcShyrenBattleFront,
   content.ibcShyrenBattleHurt,
   content.ibcKnightknightArmball,
   content.ibcKnightknightArmstaff,
   content.ibcKnightknightBase,
   content.ibcKnightknightDragonfur,
   content.ibcKnightknightEyes,
   content.ibcKnightknightHeadpiece,
   content.ibcKnightknightMouthpiece,
   content.ibcKnightknightHurt,
   content.ibcPyropeRing,
   content.ibcPyropeDrip,
   content.ibcPyropeHead,
   content.ibcPyropeHurt,
   content.ibcDoge,
   content.ibcDogeTail,
   content.ibcDogeHurt,
   content.ibcBurgerpantsBody,
   content.ibcJerryHurt,
   content.ibcJerryMain,
   content.ibcFroggitLegs,
   content.ibcFroggitHead,
   content.ibcFroggitGone
);

export const azAssets4 = new CosmosInventory(
   content.amDespair,
   content.ibbUltima,
   content.ibbBeamcircle,
   content.ibcAsrielHyperarm,
   content.ibcAsrielHyperbody,
   content.ibcAsrielHyperwing,
   content.ibcAsrielHyperhead,
   content.asSega
);

export const azAssets5 = new CosmosInventory(
   content.asCymbal,
   content.asSuperstrike,
   content.amSavetheworld,
   content.amDespair2,
   content.ibcAsgoreStatic,
   content.ibcAlphysBody,
   content.ibcAlphysHead,
   inventories.idcAsgore,
   content.avAsgore,
   content.avAlphys,
   content.ibcUndyneHead,
   content.ibcUndyneDate,
   content.ibcUndyneHair,
   content.ibcPapyrusBattle,
   content.ibcTorielBattle2,
   content.ibcSansBattle,
   content.avSans,
   inventories.ibcPapyrusHead,
   content.ibuSave,
   content.ibbFirebol,
   content.ibuCyangreenSOUL,
   content.ibuBlueSOUL,
   content.ibbStardent,
   content.ibuCyanReticle,
   content.asQuickelectroshock,
   content.ibbBluelightning,
   content.ibbLightning,
   content.ibbArrow,
   content.ibbArrowportal,
   content.ibcUndyneCageHoriz,
   content.ibcUndyneShield,
   content.asBell,
   content.asStab,
   content.ibbArccircle,
   content.ibbLinecarrier,
   content.ibbFadeline,
   content.ibbBone,
   content.ibbBonesection,
   content.ibbSpecatk,
   content.asSpecin
);

export const azAssets6 = new CosmosInventory(
   content.amEmotion,
   content.ibbBeamstrip,
   content.ibcAsrielHyperarm,
   content.ibcAsrielHyperbody,
   content.ibcAsrielHyperwing,
   content.ibcAsrielHyperhead,
   content.ibcAsrielHypersob,
   content.ibcAsrielHypersobex,
   content.ibuSave,
   content.ibbFirebol,
   content.ieStory,
   content.asRainbowbeam
);

export const azAssets7 = new CosmosInventory(
   inventories.iocAsrielTrue,
   inventories.idcAsrielTrue,
   content.avAsriel,
   content.iocAsrielBow,
   content.iocAsrielCry1,
   content.iocAsrielCry2,
   content.iocAsrielCry3,
   content.iocAsrielFly1,
   content.iocAsrielFly2,
   content.iocAsrielHug2,
   content.amMemory,
   content.amFinalpower,
   content.ieBarrier,
   content.asAbreak1,
   content.asAbreak2,
   content.asDeeploop2,
   content.ieBossSOUL,
   content.iocAsrielTrueDownSad,
   content.iocAsrielTrueDownTalkSad,
   content.iocAsrielTrueRightSad,
   content.asCymbal,
   inventories.kiddAssets,
   content.iocFriskLeftWaterPour
);

azAssets1.name = 'azAzzets1';
azAssets2.name = 'azAzzets2';
azAssets3.name = 'azAzzets3';
azAssets4.name = 'azAzzets4';
azAssets5.name = 'azAzzets5';
azAssets6.name = 'azAzzets6';
azAssets7.name = 'azAzzets7';

export const azLostHandler = (
   bubble1: CosmosProvider<
      [
         CosmosPointSimple,
         (fontFamily?: () => CosmosFont | null, fontSize?: () => number, content?: () => string) => CosmosObject
      ],
      [CosmosPoint]
   >,
   bubble2: CosmosProvider<
      [
         CosmosPointSimple,
         (fontFamily?: () => CosmosFont | null, fontSize?: () => number, content?: () => string) => CosmosObject
      ],
      [CosmosPoint]
   >,
   flirtCondition: (target: number) => boolean,
   saveAction: () => void,
   assistAction: () => void,
   texts: {
      status1: CosmosProvider<string[]>;
      status2: CosmosProvider<string[]>;
      act: CosmosKeyed<(s: boolean) => string[]>;
      assist: { text: string[]; talk: string[][] };
      fight: string[][][];
      flirt: string[][][];
      idle: CosmosProvider<string[]>[];
      item: CosmosKeyed<{ text: string[]; talk: string[][] }>;
      standard: string[][];
   },
   attack: () => Promise<boolean>
) =>
   battler.opponentHandler({
      vars: {
         cds: null as ((instant?: boolean) => void) | null,
         h: 0,
         p: {
            get value () {
               return battler.volatile[0].vars.p as number;
            },
            set value (v) {
               battler.volatile[0].vars.p = v;
            }
         },
         async s (a = false, b = false) {
            const fd = fader({ fill: 0xffffff, priority: 2003 });
            renderer.attach('menu', fd);
            await fd.alpha.modulate(renderer, SAVE.flag.b.$option_epilepsy ? 300 : 150, 1);
            heal();
            battler.hpboost.reset();
            saveAction();
            azSaveInvAndHP();
            a && assistAction();
            b && SAVE.flag.n.pacifist_marker_bully++;
            await renderer.pause(SAVE.flag.b.$option_epilepsy ? 150 : 300);
            sounds.shatter.instance(renderer);
            fd.alpha.modulate(renderer, 300, 0).then(() => {
               renderer.detach('menu', fd);
            });
         },
         async t (lines: CosmosProvider<string[]>[]) {
            battler.multitext.active = true;
            await Promise.all([
               battler.monster(
                  false,
                  ...CosmosUtils.provide(bubble1, battler.volatile[1].container.position.clone()),
                  ...CosmosUtils.provide(lines[0])
               ),
               battler.monster(
                  false,
                  ...CosmosUtils.provide(bubble2, battler.volatile[2].container.position.clone()),
                  ...CosmosUtils.provide(lines[1])
               )
            ]);
            battler.multitext.active = false;
         }
      },
      async fight (state) {
         if (30 <= SAVE.data.n.bully) {
            state.opponent.ghost = false;
            const h = state.vars.h++;
            await battler.attack(state.volatile, { power: [ 3 / 4, 2 / 3, 1 / 2 ][h], operation: 'multiply' });
            if (h === 2) {
               state.vars.p.value = 0;
               await state.vars.s(false, true);
               await state.vars.t(texts.fight[state.target - 1]);
            }
         } else {
            state.opponent.ghost = true;
            return battler.attack(state.volatile, { power: 0, operation: 'add' });
         }
         return false;
      },
      async postact (state, act) {
         if (act === 'flirt') {
            if (flirtCondition(state.target - 1)) {
               await battler.human(...texts.act.flirt(true));
               state.vars.p.value = 0;
               await state.vars.s();
               await state.vars.t(texts.flirt[state.target - 1]);
            } else {
               await battler.human(...texts.act.flirt(false));
            }
         } else if (act !== 'check') {
            if (--state.vars.p.value === 0) {
               await battler.human(...texts.act[act](true));
               await state.vars.s();
               await state.vars.t(texts.standard);
            } else {
               await battler.human(...texts.act[act](false));
            }
         }
      },
      item: {
         async corndog_sword (state) {
            state.vars.cds = await azActivateDogSword();
         }
      },
      async postitem (state, item) {
         if (item in texts.item) {
            await battler.human(...texts.item[item].text);
            state.vars.p.value = 0;
            await state.vars.s();
            await state.vars.t(texts.item[item].talk);
         }
      },
      async assist (state) {
         battler.music && (battler.music.gain.value = 0);
         const overlay = fader({ priority: 2000 });
         await overlay.alpha.modulate(renderer, 1350, 1);
         await renderer.pause(1350);
         atlas.switch('dialoguerBottom');
         atlas.navigators.of('dialoguerBottom').objects[0].priority.value = 2001;
         await typer.text(...texts.assist.text);
         atlas.navigators.of('dialoguerBottom').objects[0].priority.value = 0;
         atlas.switch(null);
         state.vars.p.value = 0;
         await state.vars.s(true);
         battler.music && (battler.music.gain.value = battler.music.daemon.gain);
         renderer.detach('menu', overlay);
         await state.vars.t(texts.assist.talk);
      },
      async postchoice (state) {
         if (state.vars.p.value > 0) {
            await state.vars.t(texts.idle);
            game.movement = true;
            if (await attack()) {
               state.vars.cds?.(true);
               state.vars.cds = null;
               azLoadInvAndHP();
               azInstaResetBox();
               azEndLost();
               battler.status = () => text.b_opponent_asriel.status13();
            } else {
               state.vars.cds?.();
               state.vars.cds = null;
               battler.SOUL.alpha.value === 0 || (await resetBox(true));
               SAVE.data.b.oops || (battler.assist = true);
               battler.status = () => CosmosUtils.provide(texts.status2);
            }
            game.movement = false;
         } else {
            const fd = fader({ fill: 0xffffff, priority: 2000 });
            await fd.alpha.modulate(renderer, 1000, 1);
            azEndLost();
            if (SAVE.flag.n.pacifist_marker_bully === 3) {
               await renderer.pause(1000);
               const fd2 = fader({ priority: 2001 });
               await Promise.all([
                  fd2.alpha.modulate(renderer, 2000, 1),
                  battler.music?.gain.modulate(renderer, 2000, 0)
               ]);
               renderer.detach('menu', fd);
               await azPreBullyScene(fd2);
            } else {
               fd.alpha.modulate(renderer, 1000, 0).then(() => renderer.detach('menu', fd));
            }
            battler.status = () => text.b_opponent_asriel.status13();
         }
         battler.resume();
      }
   });

export const azLostHandler1 = azLostHandler(
   pos => [ new CosmosPoint(-20 - 60, -95).add(pos), battler.bubbles.napstablook2 ],
   pos => [ new CosmosPoint(22, -78).add(pos), battler.bubbles.napstablook ],
   target => (target === 0 ? SAVE.data.b.flirt_undyne : SAVE.data.b.flirt_alphys),
   () => (SAVE.flag.b.pacifist_marker_save1 = true),
   () => (SAVE.flag.b.pacifist_marker_save1_assist = true),
   text.b_opponent_lostsoul_a,
   () => patterns.asriel(16)
);

export const azLostHandler2 = azLostHandler(
   pos => [ new CosmosPoint(-24 - 60, -95).add(pos), battler.bubbles.napstablook2 ],
   pos => [ new CosmosPoint(25, -77).add(pos), battler.bubbles.napstablook ],
   target => (target === 0 ? SAVE.data.b.flirt_papyrus : 20 <= world.flirt),
   () => (SAVE.flag.b.pacifist_marker_save2 = true),
   () => (SAVE.flag.b.pacifist_marker_save2_assist = true),
   text.b_opponent_lostsoul_b,
   () => patterns.asriel(17)
);

export const azLostHandler3 = azLostHandler(
   pos => [ new CosmosPoint(-24 - 60, -95).add(pos), battler.bubbles.napstablook2 ],
   pos => [ new CosmosPoint(28, -112).add(pos), battler.bubbles.napstablook ],
   target => target === 0 && SAVE.data.b.cell_flirt,
   () => (SAVE.flag.b.pacifist_marker_save3 = true),
   () => (SAVE.flag.b.pacifist_marker_save3_assist = true),
   text.b_opponent_lostsoul_c,
   () => patterns.asriel(18)
);

export function azInstaResetBox () {
   battler.SOUL.alpha.value = 0;
   battler.box.size.set(282.5, 65);
   battler.box.position.set(160);
}

export function azEndLost () {
   battler.assist = false;
   for (const volatile of battler.alive) {
      battler.overlay.detach(volatile.container);
      battler.volatile.splice(battler.volatile.indexOf(volatile), 1);
   }
   azActivateHyperBG();
   battler.SOUL.metadata.color = 'red';
   battler.volatile[0].container.alpha.value = 1;
   battler.volatile[0].alive = true;
   azResetBattleMenu();
}

export function azActivateHyperBG (save = false) {
   for (const object of atlas.navigators.of('battlerAdvanced').objects[0].objects) {
      if (typeof object.metadata.hyper === 'function') {
         object.metadata.hyper(save);
         break;
      }
   }
}

export function azTurns () {
   return SAVE.flag.n.pacifist_marker < 6
      ? SAVE.flag.n.pacifist_marker_turns
      : SAVE.flag.n.pacifist_marker < 9
      ? 13
      : SAVE.flag.n.pacifist_marker < 10
      ? 14
      : 15;
}

export function azStatus (turns = azTurns()) {
   return [
      () => text.b_opponent_asriel.status0(),
      () => text.b_opponent_asriel.status1(),
      () => text.b_opponent_asriel.status2(),
      () => text.b_opponent_asriel.status3(),
      () => text.b_opponent_asriel.status4(),
      () => text.b_opponent_asriel.status5(),
      () => text.b_opponent_asriel.status6(),
      () => text.b_opponent_asriel.status7(),
      () => text.b_opponent_asriel.status8(),
      () => text.b_opponent_asriel.status9(),
      () => text.b_opponent_asriel.status10(),
      () => text.b_opponent_asriel.status11(),
      () => text.b_opponent_asriel.status12(),
      () => text.b_opponent_asriel.status13(),
      () => [],
      () => text.b_opponent_asriel.endStatus1(),
      () => text.b_opponent_asriel.endStatus2(),
      () => text.b_opponent_asriel.endStatus3(),
      () => text.b_opponent_asriel.endStatus4(),
      () => text.b_opponent_asriel.endStatus5()
   ][turns];
}

export function azBullyHitCount () {
   return Math.max(SAVE.flag.n.pacifist_marker_bully - 4, 0);
}

export function azUpdateBullyMarker (hits: number) {
   hits > 0 && (SAVE.flag.n.pacifist_marker_bully = [ 5, 6, 7, 8, 9, 10, 11 ][hits - 1] as 5);
}

export function azLoadInvAndHP () {
   SAVE.flag.n.pacifist_marker_hp !== 0 && (SAVE.data.n.hp = SAVE.flag.n.pacifist_marker_hp);
   if (SAVE.flag.s.pacifist_marker_inventory !== '') {
      while (SAVE.storage.inventory.size > 0) {
         SAVE.storage.inventory.remove(0);
      }
      for (const item of SAVE.flag.s.pacifist_marker_inventory.split(',')) {
         item && saver.add(item);
      }
   }
   SAVE.data.n.corndogger = SAVE.flag.n.pacifist_marker_corndogger;
   rng.attack.value = SAVE.flag.n.pacifist_marker_base_attack;
   rng.dialogue.value = SAVE.flag.n.pacifist_marker_base_dialogue;
   rng.pattern.value = SAVE.flag.n.pacifist_marker_base_pattern;
}

export function azClearFilters () {
   if (renderer.filters) {
      for (const filter of azFilters) {
         const index = renderer.filters.indexOf(filter);
         index === -1 || renderer.filters.splice(index, 1);
      }
   }
}

export function azInitSetup () {
   battler.volatile[0].hp += azBullyHitCount() * -268435456;
   azLoadInvAndHP();
   battler.status = azStatus();
   const cmf = new HslAdjustmentFilter();
   const abf = new AdvancedBloomFilter({ threshold: 0, bloomScale: 0, quality: 5, brightness: 1 });
   const pmapp = [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 2, 2, 2, 2, 2, 2,
      2, 2, 3, 3, 3, 3, 3, 3, 3, 1, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
      1, 1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 0, 1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5,
      5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 1
   ].map(v => [ 0.5, 1, 2, 4, 5, 6, 7 ][v]);
   const sl = new CosmosObject({ alpha: 0, priority: 1, metadata: { slt: 0 } }).on('tick', function () {
      if (this.metadata.slt++ === 1) {
         this.metadata.slt = 0;
         this.attach(
            new CosmosSprite({
               anchor: 0,
               position: { x: Math.random() * 320 - 160, y: 130 + Math.random() * 40 },
               velocity: { y: -40 },
               scale: { x: 1 / 8, y: 10 },
               frames: [ content.iooASpeedline ]
            }).on('tick', function () {
               if (this.position.y <= -130) {
                  sl.detach(this);
               } else {
                  quickshadow(this, this, sl, void 0, 1.8);
               }
            })
         );
      }
   });
   const xxx = new CosmosObject({
      alpha: SAVE.flag.n.pacifist_marker < 7 ? 1 : 0,
      objects: [ sl ],
      metadata: {
         hue: 0,
         xyz: false,
         hyper (save = false) {
            xxx.metadata.xyz = true;
            for (const sprite of sprites) {
               const section = sprite.metadata.section;
               if (save) {
                  const sectionPhase = (section / (sections - 1)) ** 2;
                  const scale = CosmosMath.remap(sectionPhase, minScale, maxScale);
                  sprite.alpha.value = CosmosMath.remap(sectionPhase, 0.1, 0.6);
                  sprite.position.x = section * sectionsSize;
                  sprite.scale.set(scale, scale);
               } else {
                  sprite.alpha.value = 1;
                  sprite.position.x = section * sectionsSize;
                  sprite.scale.set(1, 1);
               }
            }
         }
      }
   }).on('tick', function () {
      let speed: number;
      if (battler.music?.daemon === music.asrielboss) {
         const vtime = battler.music.position / ((60 / 165) * 4);
         const power = Math.floor(vtime);
         const presp = (vtime % 1) ** 2;
         const pcurr = pmapp[power];
         const pnext = pmapp[(power + 1) % pmapp.length];
         if (presp > 0.5 && pcurr !== pnext) {
            renderer.shake.value = presp * 2 - 1;
            renderer.shake.modulate(renderer, 500, 0);
         }
         speed = CosmosMath.remap(presp, pcurr, pnext);
         const speedScaled = 1 - (1 - speed / 7) ** 1.5;
         this.alpha.value = speedScaled * 0.5 + 0.5;
         abf.bloomScale = speedScaled + 0.5;
      } else {
         speed = battler.volatile[0].alive ? 1 : 2;
         this.alpha.value = 0.75;
         abf.bloomScale = battler.volatile[0].alive ? 0 : 1;
      }
      360 <= (this.metadata.hue += speed) && (this.metadata.hue -= 360);
      cmf.hue = this.metadata.hue * 2;
      sl.alpha.value = Math.max(((speed - 4) / 3) * 0.5, 0);
      if (speed > 5) {
         const v = Math.max((speed - 5) / 2, 0);
         if (renderer.shake.value < v) {
            renderer.shake.value = v;
            renderer.shake.modulate(renderer, 500, 0);
         }
      }
   });
   const sections = 8;
   const sectionsSize = 160 / 8;
   const minScale = 240 / 384;
   const maxScale = minScale * 4;
   const sprites = CosmosUtils.populate(sections, section => {
      const sectionPhase = (section / (sections - 1)) ** 2;
      const scale = CosmosMath.remap(sectionPhase, minScale, maxScale);
      return new CosmosSprite({
         alpha: CosmosMath.remap(sectionPhase, 0.1, 0.6),
         anchor: { y: 0 },
         frames: [ content.ibcAsrielBg ],
         position: { x: section * sectionsSize },
         scale,
         metadata: { section }
      }).on('tick', function () {
         this.crop.right = Math.floor(
            ((xxx.metadata.hue / 360 + (section / sections) * (xxx.metadata.xyz ? -1 : 1) + 1) % 1) * 512
         );
         this.crop.left = -(this.crop.right + 160 / this.scale.y);
      });
   });
   const sprites_container = new CosmosObject({
      area: renderer.area,
      objects: sprites,
      filters: [
         new Filter(
            vert_standard,
            `// pixijs builtins
varying vec2 vTextureCoord;
uniform sampler2D uSampler;

// shared frame values
varying float ox;
varying float oy;
varying float oz;
varying float ow;

void main (void) {
   // extend pixel values into integer space
   vec4 frame = vec4(ox, oy, oz, ow);
   vec2 position = vTextureCoord * frame.zw - frame.xy;

   // apply reflection
   if (position.x < 320.0) {
      position.x = 640.0 - position.x;
   }

   gl_FragColor = texture2D(uSampler, (position.xy + frame.xy) / frame.zw);
}`
         )
      ]
   });
   sprites_container.container.children[0].filterArea = new Rectangle(320, 0, 320, 480);
   sprites_container.container.children[0].filters = [ cmf, abf ];
   sprites_container.on('tick', function () {
      abf.enabled = CosmosRenderer.fancy;
   });
   if (SAVE.flag.n.pacifist_marker < 6 && SAVE.flag.n.pacifist_marker_turns < 1) {
      const rec = new CosmosRectangle({
         fill: SAVE.flag.b.$option_epilepsy ? 0x5f5f5f : 0xffffff,
         size: 1000,
         anchor: 0,
         position: { x: 160, y: 120 }
      });
      let i = 0;
      let mus = battler.music!;
      let seconds = 0;
      const secTicker = () => {
         seconds += 1 / 30;
      };
      renderer.on('tick', secTicker);
      events.on('battle-exit').then(() => {
         renderer.on('tick', secTicker);
      });
      (async () => {
         while (i < 5) {
            await renderer.when(() => mus.stopped || (60 / 165) * [ 56, 58, 59.5, 63, 64 ][i] <= seconds);
            if (mus.stopped) {
               xxx.detach(rec);
               rec.alpha.task?.();
               rec.alpha.value = 1;
               await renderer.when(() => battler.music?.stopped === false);
               i = 0;
               mus = battler.music!;
               seconds = 0;
            } else {
               switch (i++) {
                  case 0:
                     xxx.attach(rec);
                  case 1:
                  case 2:
                     rec.alpha.value = 1;
                     rec.alpha.modulate(renderer, 2000, 0.4);
                     break;
                  case 3:
                     xxx.detach(rec);
                     break;
                  case 4:
                     if (SAVE.data.b.oops) {
                        battler.status = () => text.b_opponent_asriel.status0(true);
                        atlas.target === 'battlerAdvanced' && dialogue_primitive(...battler.status());
                     }
                     speech.emoters.asriel.metadata.power = true;
                     (renderer.filters ??= []).push(...azFilters);
                     xxx.attach(sprites_container);
                     await renderer.when(() => mus.stopped || SAVE.flag.n.pacifist_marker_turns > 0);
                     if (mus.stopped) {
                        speech.emoters.asriel.metadata.power = false;
                        azClearFilters();
                        xxx.detach(sprites_container);
                        rec.alpha.task?.();
                        rec.alpha.value = 1;
                        await renderer.when(() => battler.music?.stopped === false);
                        i = 0;
                        mus = battler.music!;
                        seconds = 0;
                     }
                     break;
               }
               shake(4);
            }
         }
      })();
   } else {
      SAVE.flag.n.pacifist_marker < 7 || xxx.metadata.hyper();
      (renderer.filters ??= []).push(...azFilters);
      xxx.attach(sprites_container);
   }
   const ba = atlas.navigators.of('battlerAdvanced');
   ba.objects[0].attach(xxx);
   ba.objects[3].area = new Rectangle(0, 200 * 2, 320 * 2, 40 * 2);
   ba.objects[3].filters = [ filters.outline ];
   events.on('battle-exit').then(() => {
      ba.objects[0].detach(xxx);
      ba.objects[3].area = null;
      ba.objects[3].filters = null;
      azClearFilters();
   });
}

export async function azActivateDogSword () {
   battler.SOUL.metadata.collision = false;
   const dogger = new CosmosAnimation({
      area: renderer.area,
      filters: [ battler.clipFilter! ],
      active: true,
      resources: content.ibbPomsleep,
      anchor: { x: 0, y: 1 },
      metadata: { waketimer: 0 },
      priority: 1998
   }).on('tick', function () {
      if (this.metadata.waketimer === 0) {
         this.resources === content.ibbPomsleep || this.use(content.ibbPomsleep);
      } else {
         this.resources === content.ibbPomwake || this.use(content.ibbPomwake);
         this.metadata.waketimer--;
      }
      this.position.set(box.x, Math.round(box.y2 * 2) / 2);
   });
   renderer.attach(
      'menu',
      dogger,
      ...CosmosUtils.populate(10, i =>
         new CosmosAnimation({
            alpha: 0.2 + 0.04 * (10 - i),
            resources: content.ibbPomsleep,
            anchor: { x: 0, y: 1 },
            priority: 1997 - i,
            position: { x: box.x, y: Math.round(box.y2 * 2) / 2 - i * 20 }
         }).on('tick', function () {
            (this.alpha.value -= 0.02) <= 0 && renderer.detach('menu', this);
         })
      )
   );
   sounds.lightningstrike.instance(renderer);
   const snd2 = sounds.boom.instance(renderer, 0.16);
   snd2.rate.value = 0.8;
   snd2.gain.modulate(renderer, 1000, snd2.gain.value, 0);
   const wf = fader({ fill: 0xffffff, size: 1000, alpha: 1, anchor: 0, position: { x: 160, y: 120 } });
   shake(2, 1000);
   await wf.alpha.modulate(renderer, 1000, 0);
   renderer.detach('menu', wf);
   const handler = {
      priority: -1000000,
      listener (this: CosmosHitbox) {
         let d = false;
         for (const bullet of renderer.detect(
            this,
            ...renderer.calculate('menu', hitbox => hitbox.metadata.bullet === true)
         )) {
            if (bullet.metadata.color !== 'green' && bullet.metadata.color !== 'yellow') {
               d = true;
               bullet.metadata.bullet = false;
               bullet.acceleration.set(0);
               bullet.acceleration.task?.();
               bullet.gravity.set(0);
               bullet.gravity.task?.();
               bullet.spin.set(0);
               bullet.spin.task?.();
               bullet.velocity.set(0);
               bullet.velocity.task?.();
               for (const h of bullet.events.tick?.handlers ?? []) {
                  bullet.off('tick', h);
               }
               for (const h of bullet.events.render?.handlers ?? []) {
                  bullet.off('render', h);
               }
               (
                  (bullet.metadata.doggerTrigger?.() as Promise<void> | void) ??
                  Promise.all([
                     bullet.alpha.modulate(renderer, 500, 0),
                     bullet.scale.modulate(renderer, 500, bullet.scale.multiply(2))
                  ])
               ).then(() => {
                  bullet.metadata.doggerDetach?.();
                  bullet.parent?.detach(bullet);
               });
            }
         }
         d && dogtrigger.value?.();
      }
   };
   battler.SOUL.on('tick', handler);
   dogtrigger.value = () => {
      dogger.metadata.waketimer <= 18 && sounds.bark.instance(renderer);
      dogger.metadata.waketimer = 20;
   };
   return (instant = false) => {
      dogtrigger.value = null;
      battler.SOUL.metadata.collision = true;
      battler.SOUL.off('tick', handler);
      if (instant) {
         renderer.detach('menu', dogger);
      } else {
         dogger.alpha.modulate(renderer, 300, 0).then(() => renderer.detach('menu', dogger));
      }
   };
}

export async function azPreBullyScene (fd2: CosmosObject) {
   fd2.priority.value = 2000;
   battler.music?.stop();
   await renderer.pause(2000);
   atlas.switch('dialoguerBottom');
   atlas.navigators.of('dialoguerBottom').objects[0].priority.value = 2001;
   await typer.text(...text.b_opponent_asriel.confrontation);
   atlas.navigators.of('dialoguerBottom').objects[0].priority.value = 0;
   atlas.switch(null);
   const fd3 = fader({ fill: 0xffffff, priority: 2003 });
   renderer.attach('menu', fd3);
   await fd3.alpha.modulate(renderer, SAVE.flag.b.$option_epilepsy ? 300 : 150, 1);
   SAVE.flag.n.pacifist_marker_bully = 4;
   heal();
   battler.hpboost.reset();
   azSaveInvAndHP();
   renderer.detach('menu', fd2);
   await renderer.pause(SAVE.flag.b.$option_epilepsy ? 150 : 300);
   sounds.shatter.instance(renderer);
   azMusicHyper();
   fd3.alpha.modulate(renderer, 300, 0).then(() => renderer.detach('menu', fd3));
}

export function azActivateSaveButton () {
   let hue = 0;
   const cmf = new HslAdjustmentFilter();
   const btn = battler.buttons[3];
   const ticker = (active = battler.volatile[0].alive && !world.runaway) => {
      if (active) {
         if (btn.resources === content.ibuMercy) {
            const idx = btn.index;
            btn.use(content.ibuSave);
            btn.index = idx;
            btn.area = renderer.area!;
            btn.filters = [ cmf ];
            btn.tint = 0xff0000;
         }
         360 <= (hue += 1) && (hue -= 360);
         cmf.hue = hue * 2;
      } else if (btn.resources === content.ibuSave) {
         const idx = btn.index;
         btn.use(content.ibuMercy);
         btn.index = idx;
         btn.area = null;
         btn.filters = null;
         btn.tint = void 0;
         hue = 0;
      }
   };
   btn.on('tick', ticker);
   events.on('battle-exit').then(() => {
      btn.off('tick', ticker);
      ticker(false);
   });
}

export function azIsolateSaveButton () {
   for (const button of battler.buttons.splice(0, 3)) {
      button.parent?.detach(button);
   }
}

export function azLostEffect<A extends CosmosSprite> (spr: A, pos: CosmosPointSimple, ext = false): A {
   const index = spr.index;
   const rects = CosmosUtils.populate(
      6,
      i => new CosmosRectangle({ anchor: 0, position: { y: CosmosMath.spread_quantize(15, i % 3, 3) } })
   );
   const randomize = () => {
      for (const rect of rects) {
         rect.size.set(15 + Math.random() * 20, 3 + Math.random() * 5);
         rect.offsets[0].set(Math.random() * 40 - 20, Math.random() * 10 - 5);
      }
   };
   spr.attach(
      ...(ext ? [ new CosmosObject() ] : []),
      new CosmosObject({
         area: new Rectangle(20 * 2, 0, 280 * 2, 80 * 2),
         filters: [ filters.outline ],
         fill: 0xffffff,
         metadata: { ticks: 0 },
         position: pos,
         objects: rects
      }).on('tick', function () {
         if (spr.index === index) {
            if (++this.metadata.ticks === 8) {
               this.metadata.ticks = 0;
               randomize();
            }
         } else {
            spr.detach(this);
         }
      })
   );
   randomize();
   return spr;
}

export function azResetBattleMenu () {
   atlas.navigators.of('battlerAdvanced').position.y = 0;
   atlas.navigators.of('battlerAdvancedTarget').position.y = 0;
   battler.refocus();
}

export function azSaveInvAndHP (
   marker: typeof SAVE.flag.n.pacifist_marker | null = null,
   hp = battler.hpboost.calculateHP(),
   inventory = SAVE.storage.inventory.contents.join(','),
   corndogger = SAVE.data.n.corndogger,
   base_attack = rng.attack.value,
   base_dialogue = rng.dialogue.value,
   base_pattern = rng.pattern.value
) {
   marker === null || (SAVE.flag.n.pacifist_marker = marker);
   SAVE.flag.n.pacifist_marker_hp = hp;
   SAVE.flag.s.pacifist_marker_inventory = inventory;
   SAVE.flag.n.pacifist_marker_corndogger = corndogger;
   SAVE.flag.n.pacifist_marker_base_attack = base_attack;
   SAVE.flag.n.pacifist_marker_base_dialogue = base_dialogue;
   SAVE.flag.n.pacifist_marker_base_pattern = base_pattern;
}

export function azMusicDespair () {
   battler.music = music.despair.instance(renderer, 0, true);
   battler.music.source!.loopStart = (60 / 180) * 64;
   battler.music.source!.loopEnd = (60 / 180) * 96;
}

export function azMusicHyper () {
   if (world.runaway) {
      battler.music = music.despair2.instance(renderer, 0, true);
      battler.music.source!.loopStart = (60 / 180) * 256;
      battler.music.source!.loopEnd = (60 / 180) * 320;
   } else {
      battler.music = music.savetheworld.instance(renderer, 0, true);
      battler.music.source!.loopStart = (60 / 165) * 48;
      battler.music.source!.loopEnd = (60 / 165) * 376;
   }
}

export function azMusicEmotion () {
   const offset =
      SAVE.flag.n.pacifist_marker < 9.2
         ? 0
         : SAVE.flag.n.pacifist_marker < 9.4
         ? (60 / 88) * 32
         : SAVE.flag.n.pacifist_marker < 9.6
         ? (60 / 88) * 64
         : SAVE.flag.n.pacifist_marker < 9.8
         ? (60 / 88) * 96
         : SAVE.flag.n.pacifist_marker < 10
         ? (60 / 88) * 128
         : (60 / 88) * 192;
   battler.music = music.emotion.instance(renderer, offset, true);
   battler.music.source!.loopStart = (60 / 88) * 224;
   battler.music.source!.loopEnd = (60 / 88) * 256;
   if (offset > 0) {
      battler.music.gain.value = 0;
      battler.music.gain.modulate(renderer, 300, battler.music.daemon.gain);
   }
}

export async function azReturnToOW () {
   const part7loader = azAssets7.load();
   await typer.on('idle');
   await renderer.pause(1000);
   typer.reset(true);
   const fd = fader({ fill: 0xffffff, alpha: 0 });
   await fd.alpha.modulate(renderer, 5000, 1);
   await Promise.all([
      game.room === 'c_exit' || teleport('c_exit', 'down', 0, 0, { fade: false, fast: true }),
      renderer.pause(3000),
      part7loader
   ]);
   battler.fakehp = null;
   SAVE.data.n.hp = calcHP();
   azSaveInvAndHP(11);
   events.on('battle-exit').then(async () => {
      await fd.alpha.modulate(renderer, 5000, 0);
      renderer.detach('menu', fd);
   });
   battler.instafade = true;
   events.fire('exit');
}

const opponents = {
   alphys: new OutertaleOpponent({
      assets: new CosmosInventory(
         content.ibcAlphysHead,
         content.ibcAlphysGhost,
         content.ibcAlphysFeet,
         content.ibcAlphysTorso,
         content.avAlphys,
         content.amGalactomania,
         content.amGalactomaniaQuiet,
         content.amGalactomaniaFinal,
         content.asArrow,
         content.ibuCyanSOUL,
         content.ibuCyanReticle,
         content.ibbLightningEmitter,
         content.ibbLightning,
         content.ibbLightningEmitter,
         content.ibbRadialshock,
         content.asLightningstrike,
         content.ibbFadeline,
         content.ibbWhitelightning,
         content.ibbBuzzlightning,
         content.asNode,
         content.ibcAlphysMelt,
         content.ibbCirclestar,
         content.asAppear,
         content.ibbLinecarrier,
         content.ibbHarknessbac,
         content.ibbHarknessgun,
         content.asElectropulsar,
         content.asBomb,
         content.amDrone,
         content.ibbArccircle,
         content.asPrebomb,
         content.ibcUndyneArrow,
         content.ibbMobile,
         content.asPrebomb
      ),
      exp: 0,
      hp: 3000,
      df: 0,
      name: () => text.b_opponent_alphys.name,
      acts: () => [
         [ 'check', text.b_opponent_alphys.act_check ],
         [ 'asriel', [] ]
      ],
      dramatic: true,
      metadata: { reactArtifact: true },
      handler: battler.opponentHandler({
         bubble: position => [ position.subtract(-25, 60), battler.bubbles.twinkly ],
         vars: {
            acted: false,
            bonusTurns: 0, // used in patterns.ts
            dream1: false,
            dream2: false,
            last_act: -1,
            mono: false,
            monologueValue: null as null | number,
            phase: 0,
            ramp: new CosmosValue(),
            repeat: false,
            turns: 0,
            async waverTalk (...lines: string[]) {
               const volatile = battler.volatile[0];
               const bubbleWrap = new CosmosObject({
                  position: { x: 25, y: -60 },
                  objects: [ battler.bubbles.twinkly() ]
               });
               atlas.switch('dialoguerBase');
               volatile.container.attach(bubbleWrap);
               await dialogue_primitive(...lines);
               atlas.switch(null);
               volatile.container.detach(bubbleWrap);
            }
         },
         defaultStatus (state) {
            switch (state.vars.turns) {
               case 0:
               case 1:
               case 2:
               case 3:
               case 4:
               case 5:
               case 6:
               case 7:
               case 8:
               case 9:
                  if (SAVE.flag.n.ga_asrielAlphysMonologue < 2) {
                     state.vars.monologueValue = 2;
                     return () => text.b_opponent_alphys.status1b;
                  } else if (SAVE.flag.n.ga_asrielAlphysMonologue < 3) {
                     state.vars.monologueValue = 3;
                     return () => text.b_opponent_alphys.status1c;
                  } else if (state.vars.turns === 9 && SAVE.flag.n.ga_asrielAlphysMonologue < 3.1) {
                     state.vars.monologueValue = 3.1;
                     return () => text.b_opponent_alphys.status1d;
                  }
                  break;
               case 10:
                  if (SAVE.flag.n.ga_asrielAlphysMonologue < 4) {
                     state.vars.monologueValue = 4;
                     return () => text.b_opponent_alphys.status2a;
                  } else if (SAVE.flag.n.ga_asrielAlphysMonologue < 5) {
                     return () => text.b_opponent_alphys.status2r1;
                  }
                  break;
               case 11:
                  if (SAVE.flag.n.ga_asrielAlphysMonologue < 5) {
                     state.vars.monologueValue = 5;
                     return () => text.b_opponent_alphys.status2b;
                  }
                  break;
               case 12:
                  if (SAVE.flag.n.ga_asrielAlphysMonologue < 6) {
                     state.vars.monologueValue = 6;
                     return () => text.b_opponent_alphys.status2c;
                  }
                  break;
               case 13:
                  if (SAVE.flag.n.ga_asrielAlphysMonologue < 7) {
                     state.vars.monologueValue = 7;
                     return () => text.b_opponent_alphys.status2d;
                  }
                  break;
               case 14:
                  if (SAVE.flag.n.ga_asrielAlphysMonologue < 8) {
                     state.vars.monologueValue = 8;
                     return () => text.b_opponent_alphys.status2e;
                  } else if (SAVE.flag.n.ga_asrielAlphysMonologue < 9) {
                     return () => text.b_opponent_alphys.status2r2;
                  }
                  break;
               case 15:
               case 16:
                  if (SAVE.flag.n.ga_asrielAlphysMonologue < 9) {
                     state.vars.monologueValue = 9;
                     return () => text.b_opponent_alphys.status3a;
                  } else if (SAVE.flag.n.ga_asrielAlphysMonologue < 10) {
                     state.vars.monologueValue = 10;
                     return () => text.b_opponent_alphys.status3b;
                  } else if (SAVE.flag.n.ga_asrielAlphysMonologue < 11) {
                     state.vars.monologueValue = 11;
                     return () => text.b_opponent_alphys.status3c;
                  }
                  break;
            }
            if (SAVE.flag.n.genocide_milestone < 6 && state.volatile.hp < state.opponent.hp / 10) {
               return () => text.b_opponent_alphys.statusY;
            } else {
               return () => text.b_opponent_alphys.statusX;
            }
         },
         prechoice (state) {
            state.vars.acted = false;
            state.vars.dream1 = false;
            state.vars.dream2 = false;
            state.vars.repeat = false;
         },
         async fight (state, power) {
            const volatile = state.volatile;
            const index = speech.emoters.alphys.index;
            const hitmult = state.vars.turns <= 15 ? 1 : 5;
            if (volatile.hp <= battler.calculate(volatile, power, hitmult)) {
               SAVE.flag.b._victory = true;
               SAVE.flag.n._genocide_milestone_last = 6;
               SAVE.flag.n.genocide_milestone = Math.max(SAVE.flag.n.genocide_milestone, 6) as 6;
               volatile.container.container.filterArea = renderer.area!;
               const tickah = () => {
                  volatile.container.offsets[1].set(
                     (Math.random() * 2 - 1) * state.vars.ramp.value,
                     (Math.random() * 2 - 1) * state.vars.ramp.value
                  );
               };
               volatile.container.on('tick', tickah);
               speech.emoters.alphys.index = 55;
               battler.music?.stop();
            } else {
               speech.emoters.alphys.index = state.vars.turns < 10 ? 28 : state.vars.turns < 15 ? 43 : 29;
            }
            if (await battler.attack(state.volatile, { power, multiplier: hitmult }, true, true)) {
               atlas.navigators.of('battlerAdvanced').objects[0].objects[0].alpha.modulate(renderer, 5000, 0);
               await renderer.pause(1150);
               await state.vars.waverTalk(...text.b_opponent_alphys.done0(state.vars.turns <= 15));
               await renderer.pause(1500);
               await state.vars.ramp.modulate(renderer, 1000, 2, 0);
               await renderer.pause(1500);
               state.volatile.container.objects[0] = new CosmosAnimation({
                  anchor: { x: 0, y: 1 },
                  resources: content.ibcAlphysMelt
               });
               await state.vars.waverTalk(...text.b_opponent_alphys.done1(state.vars.turns <= 15));
               await renderer.pause(1500);
               await state.vars.ramp.modulate(renderer, 1000, 2, 0);
               await renderer.pause(1500);
               state.volatile.container.objects[0].index = 1;
               await state.vars.waverTalk(...text.b_opponent_alphys.done2(state.vars.turns <= 15));
               SAVE.data.n.exp += 4000;
               await battler.vaporize(state.volatile.container.objects[0]);
               await renderer.pause(1000);
               events.fire('exit');
               return true;
            } else {
               speech.emoters.alphys.index = index;
            }
            return false;
         },
         act: {
            async asriel (state) {
               state.vars.acted = true;
               await battler.human(...text.b_opponent_alphys.act_asriel(state.vars.last_act));
               const repeat = choicer.result === state.vars.last_act;
               state.vars.last_act = choicer.result;
               state.vars.repeat = repeat;
               await battler.human(...text.b_opponent_alphys.act_asriel_text[choicer.result]);
               switch (choicer.result) {
                  case 0: {
                     const factor = repeat ? 0.85 : 0.7;
                     if (game.vortex) {
                        game.vortex_factor *= factor;
                        renderer.speed.modulate(renderer, 300, game.vortex_factor);
                     } else {
                        game.vortex_factor = factor;
                        renderer.speed.modulate(renderer, 300, renderer.speed.value * factor);
                        game.vortex = true;
                        let insta = false;
                        Promise.race([
                           events.on('resume'),
                           events.on('escape').then(() => (insta = true)),
                           events.on('victory').then(() => (insta = true)),
                           events.on('exit').then(() => (insta = true))
                        ]).then(() => {
                           game.vortex = false;
                           const value = renderer.speed.value / factor;
                           insta && (renderer.speed.value = value);
                           renderer.speed.modulate(renderer, insta ? 0 : 300, value);
                        });
                     }
                     break;
                  }
                  case 1:
                     battler.stat.invulnerability.modifiers.push([ 'add', repeat ? 15 : 30, 1 ]);
                     break;
                  case 2:
                     if (repeat) {
                        state.vars.dream2 = true;
                     } else {
                        state.vars.dream1 = true;
                     }
                     break;
                  case 3:
                     battler.stat.monsteratk.modifiers.push([ 'add', repeat ? -1 : -2, 1 ]);
                     break;
               }
               await battler.human(...text.b_opponent_alphys.act_asriel_confirm[choicer.result]);
            }
         },
         item: {
            async artifact () {
               await battler.human(...text.b_opponent_alphys.artifact);
            },
            async epiphany (state) {
               const index = speech.emoters.alphys.index;
               const bgobject = atlas.navigators.of('battlerAdvanced').objects[0].objects[0];
               await epiphany(
                  state.target,
                  state.volatile,
                  state.volatile.container.position.x,
                  { result: false },
                  battler.bubbles.twinkly,
                  state.volatile.container.position.subtract(-25, 60),
                  text.b_opponent_alphys.epiphaNOPE,
                  () => {
                     speech.emoters.alphys.index = index;
                     bgobject.metadata.s = true;
                  },
                  () => {
                     bgobject.metadata.s = false;
                  }
               );
            }
         },
         postchoice (state) {
            state.vars.acted || (state.vars.last_act = -1);
         },
         posttalk ({ vars, choice }) {
            return vars.waverTalk(
               ...[
                  {
                     fight: text.b_opponent_alphys.turnTalk1a,
                     fake: text.b_opponent_alphys.turnTalk1b,
                     act: text.b_opponent_alphys.turnTalk1c,
                     item: text.b_opponent_alphys.turnTalk1d
                  }[choice.type as 'fight' | 'fake' | 'act' | 'item'],
                  text.b_opponent_alphys.turnTalk2,
                  text.b_opponent_alphys.turnTalk3,
                  text.b_opponent_alphys.turnTalk4,
                  text.b_opponent_alphys.turnTalk5,
                  text.b_opponent_alphys.turnTalk6,
                  text.b_opponent_alphys.turnTalk7,
                  text.b_opponent_alphys.turnTalk8,
                  text.b_opponent_alphys.turnTalk9,
                  text.b_opponent_alphys.turnTalk10,
                  text.b_opponent_alphys.turnTalk11,
                  text.b_opponent_alphys.turnTalk12,
                  text.b_opponent_alphys.turnTalk13,
                  text.b_opponent_alphys.turnTalk14,
                  text.b_opponent_alphys.turnTalk15,
                  text.b_opponent_alphys.turnTalk16,
                  text.b_opponent_alphys.turnTalk17,
                  text.b_opponent_alphys.turnTalk18,
                  text.b_opponent_alphys.turnTalk19,
                  text.b_opponent_alphys.turnTalk20,
                  text.b_opponent_alphys.turnTalk21,
                  text.b_opponent_alphys.turnTalk22,
                  text.b_opponent_alphys.turnTalk23
               ][vars.turns]
            );
         },
         async poststatus (state) {
            if (battler.alive.length === 0) {
               return;
            }
            await battler.resume(async () => {
               state.vars.dream1 && (battler.regen.time = 20);
               state.vars.dream2 && (battler.regen.time = 40);
               await patterns.alphys(state.vars.turns);
               switch (state.vars.turns++) {
                  case 10:
                     speech.emoters.alphys.index = 45;
                     await renderer.pause(1000);
                     await state.vars.waverTalk(...text.b_opponent_alphys.broken);
                     break;
                  case 22:
                     state.vars.turns--;
                     break;
               }
               await resetBox(true);
               if (state.vars.monologueValue !== null) {
                  SAVE.flag.n.ga_asrielAlphysMonologue = state.vars.monologueValue;
                  if (SAVE.flag.n.ga_asrielAlphysMonologue > 1) {
                     SAVE.flag.b.mad_lizard = false;
                  }
                  state.vars.monologueValue = null;
               }
               if (state.vars.acted) {
                  battler.hpboost.direct += state.vars.repeat ? 5 : 10;
               }
            });
         }
      }),
      sprite () {
         return new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcAlphysGhost ] });
      },
      goodbye () {
         return new CosmosSprite({
            anchor: { x: 0, y: 1 },
            metadata: { time: renderer.time },
            frames: [ content.ibcAlphysFeet ],
            objects: [
               new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcAlphysTorso ] }),
               new CosmosAnimation({
                  anchor: { x: 0, y: 1 },
                  position: { x: -1, y: 1 },
                  resources: content.ibcAlphysHead
               }).on('tick', function () {
                  this.index = speech.emoters.alphys.index;
               })
            ]
         });
      }
   }),
   archive1: archiveOpponent(
      new CosmosInventory(
         content.ibcTorielCutscene1,
         content.ibbPaw,
         content.ibbPawInverted,
         content.ibbFirebol,
         content.asSword,
         content.asBomb,
         content.asLanding
      ),
      [ 'storytime', 'puzzlehelp', 'bedtime', 'dinnertime', 'talk' ],
      [
         () => text.b_opponent_archive1.status1,
         () => text.b_opponent_archive1.dinnerStatus,
         () => text.b_opponent_archive1.storyStatus,
         () => text.b_opponent_archive1.bedStatus
      ],
      { x: 385 / 2, y: 35 / 2 },
      {
         async dinnertime (state) {
            if (state.vars.p === 0) {
               state.vars.p = 1;
               state.talk = text.b_opponent_archive1.dinnerTalk;
            } else {
               await battler.human(...text.b_opponent_archive1.act_dinnertimeX);
            }
         },
         async storytime (state) {
            if (state.vars.p === 1) {
               state.vars.p = 2;
               state.talk = text.b_opponent_archive1.storyTalk;
            } else if (state.vars.p > 1) {
               await battler.human(...text.b_opponent_archive1.act_storytimeX);
            } else {
               await battler.human(...text.b_opponent_archive1.act_storytimeE);
            }
         },
         async bedtime (state) {
            if (state.vars.p === 2) {
               state.vars.p = 3;
               state.talk = text.b_opponent_archive1.bedTalk;
            } else if (state.vars.p > 2) {
               await battler.human(...text.b_opponent_archive1.act_bedtimeX);
            } else {
               await battler.human(...text.b_opponent_archive1.act_bedtimeE);
            }
         },
         async talk (state) {
            if (state.vars.p === 3) {
               await battler.human(...text.b_opponent_archive1.act_talkN);
               state.vars.f = true;
               SAVE.data.b.c_state_secret1 = true;
            } else {
               await battler.human(...text.b_opponent_archive1.act_talkE);
            }
         },
         async puzzlehelp (state) {
            if (state.vars.p === 3) {
               await battler.human(...text.b_opponent_archive1.act_puzzlehelp);
            } else {
               state.talk = [
                  text.b_opponent_archive1.puzzlehelpTalk1,
                  text.b_opponent_archive1.puzzlehelpTalk2,
                  text.b_opponent_archive1.puzzlehelpTalk3
               ][state.vars.p];
            }
         }
      },
      null,
      patterns.archive1,
      () => text.b_opponent_archive1.name(),
      content.ibcTorielCutscene1,
      0x42fcff
   ),
   archive2: archiveOpponent(
      new CosmosInventory(
         content.ibcGersonValor,
         content.ibbLegendarysword,
         content.asLanding,
         content.asArrow,
         content.asAppear,
         content.ibbFrogstar
      ),
      [ 'challenge', 'taunt', 'rest', 'handshake', 'advice' ],
      [
         () => text.b_opponent_archive2.status1,
         () => text.b_opponent_archive2.restStatus,
         () => text.b_opponent_archive2.failStatus,
         () => text.b_opponent_archive2.successStatus
      ],
      { x: 385 / 2, y: 35 / 2 },
      {
         async challenge (state) {
            if (state.vars.p < 2) {
               state.vars.p = 4;
               state.talk = text.b_opponent_archive2.challengeTalk;
            } else if (state.vars.p === 2) {
               await battler.human(...text.b_opponent_archive2.act_challengeR);
            } else {
               await battler.human(...text.b_opponent_archive2.act_challengeX);
            }
         },
         async rest (state) {
            if (state.vars.p === 2) {
               state.vars.p = 5;
               state.talk = text.b_opponent_archive2.restTalk;
            } else {
               await battler.human(...text.b_opponent_archive2.act_restA);
            }
         },
         async handshake (state) {
            if (state.vars.p === 3) {
               await battler.human(...text.b_opponent_archive2.act_handshakeN);
               state.vars.f = true;
               SAVE.data.b.c_state_secret2 = true;
            } else {
               await battler.human(...text.b_opponent_archive2.act_handshakeE);
            }
         },
         async taunt () {
            await battler.human(...text.b_opponent_archive2.act_taunt);
         },
         async advice (state) {
            if (state.vars.p === 3) {
               await battler.human(...text.b_opponent_archive2.act_advice);
            } else {
               state.talk = [
                  text.b_opponent_archive2.adviceTalk1,
                  text.b_opponent_archive2.adviceTalk2,
                  text.b_opponent_archive2.adviceTalk3
               ][state.vars.p];
            }
         }
      },
      null,
      patterns.archive2,
      () => text.b_opponent_archive2.name(),
      content.ibcGersonValor,
      0xff993d
   ),
   archive3: archiveOpponent(
      new CosmosInventory(
         content.ibcRomanMain,
         content.ibbBeaker1,
         content.ibbBeaker2,
         content.ibbBeaker3,
         content.ibbLabber1,
         content.ibbLabber1Outline,
         content.ibbLabber2,
         content.ibbLabber2Outline,
         content.ibbLabber3,
         content.ibbLabber3Yellow,
         content.asAppear,
         content.ibuPurpleSOUL,
         content.ibuYellowSOUL,
         content.asHeartshot,
         content.ibuYellowShot,
         content.ibuCyanSOUL,
         content.ibuCyanReticle,
         content.asArrow,
         content.ibbBoxBulletSplode,
         content.ibbFrogstar,
         content.asBomb,
         content.asUpgrade
      ),
      [ 'test_a', 'object', 'test_c', 'test_b', 'notes' ],
      [
         () => text.b_opponent_archive3.status1,
         () => text.b_opponent_archive3.testStatus1,
         () => text.b_opponent_archive3.testStatus2
      ],
      { x: 385 / 2, y: 35 / 2 },
      {
         async test_a (state) {
            if (state.vars.x.test_a) {
               await battler.human(...text.b_opponent_archive3.act_testX);
            } else {
               state.vars.x.test_a = true;
               state.vars.p = 3;
               state.talk = text.b_opponent_archive3.testTalkA;
            }
         },
         async test_b (state) {
            if (state.vars.x.test_b) {
               await battler.human(...text.b_opponent_archive3.act_testX);
            } else {
               state.vars.x.test_b = true;
               state.vars.p = 4;
               state.talk = text.b_opponent_archive3.testTalkB;
            }
         },
         async test_c (state) {
            if (state.vars.x.test_c) {
               await battler.human(...text.b_opponent_archive3.act_testX);
            } else {
               state.vars.x.test_c = true;
               state.vars.p = 5;
               state.talk = text.b_opponent_archive3.testTalkC;
            }
         },
         async object () {
            await battler.human(...text.b_opponent_archive3.act_object);
         },
         async notes (state) {
            if (state.vars.p === 2) {
               await battler.human(...text.b_opponent_archive3.act_notesN);
               state.vars.f = true;
               SAVE.data.b.c_state_secret3 = true;
            } else {
               await battler.human(...text.b_opponent_archive3.act_notesE);
            }
         }
      },
      null,
      patterns.archive3,
      () => text.b_opponent_archive3.name(),
      content.ibcRomanMain,
      0x003cff
   ),
   archive4: archiveOpponent(
      new CosmosInventory(
         content.ibcNapstablookBattle,
         content.avNapstablook,
         content.ibbBoombox,
         content.ibbBoomboxRing,
         content.asLanding,
         content.ibbHeadset,
         content.ibbFrogstar,
         content.ibbNote
      ),
      [ 'mix', 'sample', 'praise', 'compose', 'secret' ],
      [
         () => text.b_opponent_archive4.status1,
         () => text.b_opponent_archive4.sampleStatus,
         () => text.b_opponent_archive4.failStatus,
         () => text.b_opponent_archive4.composeStatus,
         () => text.b_opponent_archive4.failStatus,
         () => text.b_opponent_archive4.successStatus
      ],
      { x: 385 / 2, y: 35 / 2 + 16 },
      {
         async sample (state) {
            if (state.vars.p === 0) {
               state.vars.p = 6;
               state.talk = text.b_opponent_archive4.sampleTalk;
            } else {
               await battler.human(...text.b_opponent_archive4.act_sampleX);
            }
         },
         async compose (state) {
            if (state.vars.p === 1 || state.vars.p === 2) {
               state.vars.p = 7;
               state.talk = text.b_opponent_archive4.composeTalk;
            } else if (state.vars.p > 2) {
               await battler.human(...text.b_opponent_archive4.act_composeX);
            } else {
               await battler.human(...text.b_opponent_archive4.act_composeE);
            }
         },
         async mix (state) {
            if (state.vars.p === 3 || state.vars.p === 4) {
               state.vars.p = 8;
               state.talk = text.b_opponent_archive4.mixTalk;
            } else if (state.vars.p > 4) {
               await battler.human(...text.b_opponent_archive4.act_mixX);
            } else {
               await battler.human(...text.b_opponent_archive4.act_mixE);
            }
         },
         async praise () {
            await battler.human(...text.b_opponent_archive4.act_praise);
         },
         async secret (state) {
            if (state.vars.p === 5) {
               await battler.human(...text.b_opponent_archive4.act_secretN);
               state.vars.f = true;
               SAVE.data.b.c_state_secret4 = true;
            } else {
               await battler.human(...text.b_opponent_archive4.act_secretE);
            }
         }
      },
      { x: 100, y: 65 },
      patterns.archive4,
      () => text.b_opponent_archive4.name(),
      content.ibcNapstablookBattle,
      0xd535d9
   ),
   archive5: archiveOpponent(
      new CosmosInventory(content.ibcAsgoreStatic, content.ibbFirebol),
      [ 'hug', 'promise' ],
      [ () => text.b_opponent_archive5.status1, () => text.b_opponent_archive5.hugStatus ],
      { x: 385 / 2, y: 35 / 2 },
      {
         async hug (state) {
            if (state.vars.p < 1) {
               state.vars.p = 1;
               state.talk = text.b_opponent_archive5.hugTalk;
            } else {
               await battler.human(...text.b_opponent_archive5.act_hugX);
            }
         },
         async promise (state) {
            if (state.vars.p === 1) {
               await battler.human(...text.b_opponent_archive5.act_promiseN);
               state.vars.f = true;
               SAVE.data.b.c_state_secret5 = true;
            } else {
               await battler.human(...text.b_opponent_archive5.act_promiseE);
            }
         }
      },
      { x: 100, y: 65 },
      patterns.archive5,
      () => text.b_opponent_archive5.name(),
      content.ibcAsgoreStatic,
      0x00c000
   ),
   asriel: new OutertaleOpponent({
      assets: new CosmosInventory(
         content.asUpgrade,
         content.ibcAsrielFullbody1,
         content.ibcAsrielFullbody2,
         content.ibcAsrielFullhead,
         content.amAsrielboss,
         content.avAsriel,
         content.avAsriel3,
         content.avAsriel4,
         content.asShatter,
         content.asGonerCharge,
         content.ibcAsrielBg,
         content.iooASpeedline,
         content.ibbPomsleep,
         content.ibbPomwake,
         content.asBark,
         content.asLightningstrike,
         content.asBoom,
         content.asCast,
         content.ibcAsrielFullheadShaker1,
         content.ibcAsrielFullheadShaker2,
         content.ibbFirebol,
         content.asSword,
         content.ibbPaw,
         content.ibbPawInverted,
         content.asBomb,
         content.asLanding,
         content.ibbGalaxystar,
         content.asPrebomb,
         content.asStarfall,
         content.asTarget,
         content.ibbStardrop,
         content.ibbFirework,
         content.ibbBigbolt,
         content.ibbWater,
         content.asWind,
         content.ibbAsteroid,
         content.ibbAsteroidfragment,
         content.ibbBlastship,
         content.asAppear,
         content.asSpecout,
         content.asStab,
         content.ibbExShine,
         content.ibbAwesomesword,
         content.ibbHypergrid,
         content.asDogsword
      ),
      hp: 2147483647,
      safe: true,
      ghost: true,
      name: () => text.b_opponent_asriel.name(),
      acts: () => [
         [
            'check',
            () =>
               SAVE.flag.n.pacifist_marker === 8
                  ? text.b_opponent_asriel.act_check2()
                  : text.b_opponent_asriel.act_check()
         ],
         ...(speech.emoters.asriel?.metadata.power === true && SAVE.flag.n.pacifist_marker < 10
            ? ([
                 [ 'hope', text.b_opponent_asriel.act_hope ],
                 [ 'dream', text.b_opponent_asriel.act_dream ],
                 [ 'flirt', [] ],
                 [ 'pet', [] ]
              ] as [string, string[]][])
            : [])
      ],
      mercyoverride: () =>
         SAVE.flag.n.pacifist_marker < 8 || world.runaway
            ? null
            : SAVE.flag.n.pacifist_marker < 9
            ? SAVE.flag.b.pacifist_marker_save1 &&
              SAVE.flag.b.pacifist_marker_save2 &&
              SAVE.flag.b.pacifist_marker_save3
               ? [ [ 'someoneelse', [] ] ]
               : [
                    SAVE.flag.b.pacifist_marker_save1
                       ? [ 'undyne', [], '#808080', true ]
                       : [ 'undyne', text.b_opponent_asriel.mercy_save1() ],
                    SAVE.flag.b.pacifist_marker_save1
                       ? [ 'alphys', [], '#808080', true ]
                       : [ 'alphys', text.b_opponent_asriel.mercy_save1() ],
                    SAVE.flag.b.pacifist_marker_save2
                       ? [ 'papyrus', [], '#808080', true ]
                       : [ 'papyrus', text.b_opponent_asriel.mercy_save1() ],
                    SAVE.flag.b.pacifist_marker_save2
                       ? [ 'sans', [], '#808080', true ]
                       : [ 'sans', text.b_opponent_asriel.mercy_save1() ],
                    SAVE.flag.b.pacifist_marker_save3
                       ? [ 'toriel', [], '#808080', true ]
                       : [ 'toriel', text.b_opponent_asriel.mercy_save1() ],
                    SAVE.flag.b.pacifist_marker_save3
                       ? [ 'asgore', [], '#808080', true ]
                       : [ 'asgore', text.b_opponent_asriel.mercy_save1() ]
                 ]
            : [ [ 'asrieldreemurr', [] ] ],
      metadata: { noEpiphany: true, noShake: true, corndogger: true, reactArtifact: true, nootexempt: true },
      handler: battler.opponentHandler({
         vars: {
            acted: false,
            bully: false,
            cds: null as ((instant?: boolean) => void) | null,
            dream: false,
            fluff: false,
            hits: NaN,
            hp: 0,
            memory: [] as [number, string, number, number, number, number][],
            p: 0,
            pets: 0,
            power: false,
            turns: NaN
         },
         prechoice (state) {
            state.vars.acted = false;
            state.vars.bully = false;
            state.vars.dream = false;
            state.vars.fluff = false;
            if (Number.isNaN(state.vars.hits)) {
               state.vars.hits = azBullyHitCount();
            }
            state.vars.hp = state.volatile.hp;
            state.vars.power = speech.emoters.asriel.metadata.power === true;
            if (Number.isNaN(state.vars.turns)) {
               state.vars.turns = azTurns();
            }
         },
         async fight (state) {
            if (world.runaway) {
               state.vars.bully = true;
               state.opponent.ghost = false;
               const fdw = fader({ fill: 0xffffff, alpha: 0 });
               const fdb = fader({ alpha: 0 });
               const cym = sounds.supercymbal.instance(renderer, 4);
               cym.gain.value = 0;
               cym.rate.value = 0.95;
               fdw.alpha.modulate(renderer, 600, 1).then(async () => {
                  await renderer.pause(300);
                  await fdb.alpha.modulate(renderer, 300, 1, 1);
               });
               cym.rate.modulate(renderer, 200, 1).then(async () => {
                  await renderer.pause(400);
                  await cym.rate.modulate(renderer, 600, 1, 1, 0.3);
                  cym.stop();
               });
               cym.gain.modulate(renderer, 200, cym.daemon.gain).then(async () => {
                  await renderer.pause(700);
                  await cym.gain.modulate(renderer, 300, 1, 0);
               });
               await renderer.pause(1500);
               renderer.detach('menu', fdw, fdb);
               sounds.hyperstrike.instance(renderer).rate.value = 0.9;
               battler.attack(state.volatile, { power: -268435456, operation: 'add' }, false, true, true);
               ++state.vars.hits === 7 && battler.music?.gain.modulate(renderer, 5000, 0);
               let index = 60;
               const origin = renderer.container.y;
               const zbf = new ZoomBlurFilter({ strength: 0.25, radius: 500, innerRadius: 0, center: [ 320, 240 ] });
               renderer.container.filters = [ zbf ];
               while (index-- > 0) {
                  if (index > 0) {
                     const indexS = Math.floor(index / 2);
                     renderer.container.y = origin + Math.floor(indexS / 2) * (Math.floor((indexS % 4) / 2) * 2 - 1);
                  } else {
                     renderer.container.y = origin;
                  }
                  await renderer.on('tick');
                  zbf.strength *= CosmosMath.bezier(index / 60, 0, 1, 1, 1);
               }
               renderer.container.filters = [];
               await renderer.pause(500);
               return false;
            } else {
               state.opponent.ghost = true;
               return battler.attack(state.volatile, { power: 0, operation: 'add' });
            }
         },
         act: {
            check (state) {
               state.vars.acted = true;
            },
            hope (state) {
               state.vars.acted = true;
               battler.stat.monsteratk.modifiers.push([ 'add', -1, 1 ]);
            },
            dream (state) {
               state.vars.acted = true;
               state.vars.dream = true;
            },
            async flirt (state) {
               state.vars.acted = true;
               if (20 <= world.flirt) {
                  SAVE.data.b.flirt_asriel = true;
                  await battler.human(...text.b_opponent_asriel.act_flirt2);
                  SAVE.data.n.hp = Math.max(SAVE.data.n.hp, 30);
                  heal(void 0, true, true);
               } else {
                  await battler.human(...text.b_opponent_asriel.act_flirt1);
               }
            },
            async pet (state) {
               state.vars.acted = true;
               state.vars.fluff = true;
               await battler.human(...text.b_opponent_asriel.act_pet(state.vars.pets));
               if (SAVE.flag.n.pacifist_marker !== 8) {
                  state.vars.pets++;
                  battler.stat.monsteratk.modifiers.push([ 'add', -1, 1 ]);
               }
            },
            async someoneelse (state) {
               state.vars.acted = true;
               battler.music?.gain.modulate(renderer, 3000, 0).then(() => battler.music?.stop());
               await battler.human(...text.b_opponent_asriel.mercy_save2);
               azSaveInvAndHP(9);
               battler.music?.stop();
            },
            async asrieldreemurr (state) {
               state.vars.acted = true;
            }
         },
         async postact (state, act) {
            if (!state.vars.fluff) {
               state.vars.pets = 0;
            }
            if (!state.vars.acted) {
               const fd = fader({ fill: 0xffffff, priority: 2000 });
               await fd.alpha.modulate(renderer, 1000, 1);
               state.volatile.alive = false;
               state.volatile.container.alpha.value = 0;
               azActivateHyperBG(true);
               switch (act) {
                  case 'undyne':
                  case 'alphys':
                     if (2 <= SAVE.flag.n.genocide_milestone) {
                        opponents.lostsoul_undyne.hp = 23000;
                     }
                     if (6 <= SAVE.flag.n.genocide_milestone) {
                        opponents.lostsoul_alphys.hp = 3000;
                     }
                     battler.add(opponents.lostsoul_undyne, { x: 320 / 3, y: 120 });
                     battler.add(opponents.lostsoul_alphys, { x: 320 / 1.5, y: 120 });
                     battler.status = () => text.b_opponent_lostsoul_a.status1();
                     battler.SOUL.metadata.color = 'cyangreen';
                     state.vars.p =
                        6 <= SAVE.flag.n.genocide_milestone ? 5 : 2 <= SAVE.flag.n.genocide_milestone ? 4 : 3;
                     break;
                  case 'sans':
                  case 'papyrus':
                     battler.add(opponents.lostsoul_papyrus, { x: 320 / 3, y: 120 });
                     battler.add(opponents.lostsoul_sans, { x: 320 / 1.5, y: 120 });
                     battler.status = () => text.b_opponent_lostsoul_b.status1();
                     battler.SOUL.metadata.color = 'blue';
                     state.vars.p = 1 <= SAVE.flag.n.genocide_milestone ? 5 : 1 <= SAVE.flag.n.killed_sans ? 4 : 3;
                     break;
                  case 'toriel':
                  case 'asgore':
                     battler.add(opponents.lostsoul_toriel, { x: 320 / 3, y: 120 });
                     battler.add(opponents.lostsoul_asgore, { x: 320 / 1.5, y: 120 });
                     battler.status = () => text.b_opponent_lostsoul_c.status1();
                     state.vars.p = 7 <= SAVE.flag.n.genocide_milestone ? 5 : 1 <= SAVE.flag.n.genocide_twinkly ? 4 : 3;
                     break;
               }
               fd.alpha.modulate(renderer, 1000, 0).then(() => renderer.detach('menu', fd));
               azResetBattleMenu();
               battler.resume();
            }
         },
         item: {
            async artifact () {
               await battler.human(...text.b_opponent_asriel.artifact);
            },
            async corndog_sword (state) {
               state.vars.cds = await azActivateDogSword();
            }
         },
         pretalk (state) {
            if (state.vars.power && SAVE.flag.n.pacifist_marker < 6) {
               speech.emoters.asriel.metadata.pause = true;
            } else if (SAVE.flag.n.pacifist_marker < 10) {
               if (!world.runaway || !state.vars.bully || state.vars.hits <= SAVE.flag.n.pacifist_marker_bully_hits) {
                  state.talk = [];
               } else {
                  state.talk = [
                     text.b_opponent_asriel.attackTalk1,
                     text.b_opponent_asriel.attackTalk2,
                     text.b_opponent_asriel.attackTalk3,
                     text.b_opponent_asriel.attackTalk4,
                     text.b_opponent_asriel.attackTalk5,
                     text.b_opponent_asriel.attackTalk6,
                     text.b_opponent_asriel.attackTalk7
                  ][Math.min(state.vars.hits - 1, 6)];
               }
            } else {
               speech.emoters.asriel.metadata.fade();
            }
         },
         bubble: pos => [ pos.add(32, -100), battler.bubbles.twinkly ],
         defaultTalk: state =>
            [
               text.b_opponent_asriel.turnTalk1,
               text.b_opponent_asriel.turnTalk2,
               text.b_opponent_asriel.turnTalk3,
               text.b_opponent_asriel.turnTalk4,
               text.b_opponent_asriel.turnTalk5,
               text.b_opponent_asriel.turnTalk6,
               text.b_opponent_asriel.turnTalk7,
               text.b_opponent_asriel.turnTalk8,
               text.b_opponent_asriel.turnTalk9,
               text.b_opponent_asriel.turnTalk10,
               text.b_opponent_asriel.turnTalk11,
               text.b_opponent_asriel.turnTalk12,
               text.b_opponent_asriel.turnTalk13,
               null,
               null,
               () => text.b_opponent_asriel.endTalk1,
               () => text.b_opponent_asriel.endTalk2,
               () => text.b_opponent_asriel.endTalk3,
               () => text.b_opponent_asriel.endTalk4,
               null
            ][state.vars.turns]?.(state.vars.fluff) ?? [],
         async prestatus (state) {
            atlas.switch(null);
            game.movement = true;
            teleporter.movement = true;
            state.vars.dream && (battler.regen.time = 40);
            if (!state.vars.power) {
               if (await patterns.asriel(-1)) {
                  state.vars.cds?.(true);
                  state.vars.cds = null;
                  azLoadInvAndHP();
                  azInstaResetBox();
                  speech.emoters.asriel.metadata.reset(true);
                  state.vars.pets = 0;
               } else {
                  state.vars.cds?.();
                  state.vars.cds = null;
                  await resetBox(true);
               }
               game.movement = false;
               return;
            }
            if (SAVE.flag.n.pacifist_marker < 6) {
               speech.emoters.asriel.metadata.alpha = 0;
               if (await patterns.asriel(state.vars.turns++)) {
                  state.vars.cds?.(true);
                  state.vars.cds = null;
                  state.vars.turns = SAVE.flag.n.pacifist_marker_turns;
                  state.vars.memory = [];
                  azLoadInvAndHP();
                  azInstaResetBox();
                  speech.emoters.asriel.metadata.reset(true);
                  state.vars.pets = 0;
                  game.movement = false;
                  return;
               } else {
                  state.vars.cds?.();
                  state.vars.cds = null;
                  speech.emoters.asriel.index = 0;
                  speech.emoters.asriel.metadata.alpha = 1;
                  if (state.vars.turns < 13) {
                     state.vars.memory.push([
                        battler.hpboost.calculateHP(),
                        SAVE.storage.inventory.contents.join(','),
                        SAVE.data.n.corndogger,
                        rng.attack.value,
                        rng.dialogue.value,
                        rng.pattern.value
                     ]);
                     if (state.vars.memory.length > 2) {
                        SAVE.flag.n.pacifist_marker_turns = Math.max(
                           state.vars.turns - 2,
                           SAVE.flag.n.pacifist_marker_turns
                        );
                        azSaveInvAndHP(void 0, ...state.vars.memory.shift()!);
                     }
                     if (battler.box.size.y !== 65 || battler.box.position.y !== 160) {
                        await Promise.all([
                           battler.box.size.modulate(renderer, 150, { y: 65 }),
                           battler.box.position.modulate(renderer, 150, { y: 160 })
                        ]);
                     }
                     await resetBox(true);
                     game.movement = false;
                     return;
                  } else {
                     azSaveInvAndHP(6);
                  }
               }
            } else if (SAVE.flag.n.pacifist_marker < 7.8) {
               battler.box.size.set(120, 65);
               standardPos(true);
            }
            if (SAVE.flag.n.pacifist_marker < 7) {
               const part4loader = azAssets4.load();
               await renderer.pause(1000);
               await state.dialogue(false, ...text.b_opponent_asriel.turnTalk14);
               battler.music && (battler.music.gain.value = 0);
               const fd1 = fader({ fill: 0xffffff, priority: 2000 });
               sounds.cast.instance(renderer).rate.value = 0.65;
               await Promise.all([
                  fd1.alpha.modulate(renderer, 2000, 1),
                  speech.emoters.asriel.scale.modulate(renderer, 2000, { x: 5 })
               ]);
               speech.emoters.asriel.index = 0;
               speech.emoters.asriel.scale.x = 1;
               await renderer.pause(500);
               await renderer.alpha.modulate(renderer, 2000, 0);
               battler.music?.stop();
               renderer.detach('menu', fd1);
               await antifreeze([ part4loader, renderer.pause(3500) ]);
               azSaveInvAndHP(7);
               speech.emoters.asriel.metadata.hyper();
               azActivateHyperBG();
               azMusicDespair();
               standardPos(true);
               renderer.alpha.modulate(renderer, 300, 1);
            }
            if (SAVE.flag.n.pacifist_marker < 7.1) {
               await renderer.pause(1000);
               await state.dialogue(false, ...text.b_opponent_asriel.hyperTalk1a);
               if (await patterns.asriel(13, 3)) {
                  speech.emoters.asriel.metadata.reset(true);
                  SAVE.flag.n.pacifist_marker = 7.5;
                  azLoadInvAndHP();
                  speech.emoters.asriel.index = 0;
               } else {
                  azSaveInvAndHP(7.1);
               }
            }
            if (SAVE.flag.n.pacifist_marker < 7.2) {
               await renderer.pause(1000);
               await state.dialogue(false, ...text.b_opponent_asriel.hyperTalk1b);
               SAVE.flag.n.pacifist_marker = 7.2;
            }
            if (SAVE.flag.n.pacifist_marker < 7.3) {
               await renderer.pause(1000);
               await state.dialogue(false, ...text.b_opponent_asriel.hyperTalk2a);
               if (await patterns.asriel(13, 1)) {
                  speech.emoters.asriel.metadata.reset(true);
                  SAVE.flag.n.pacifist_marker = 7.5;
                  azLoadInvAndHP();
                  speech.emoters.asriel.index = 0;
               } else {
                  azSaveInvAndHP(7.3);
               }
            }
            if (SAVE.flag.n.pacifist_marker < 7.4) {
               await renderer.pause(1000);
               await state.dialogue(false, ...text.b_opponent_asriel.hyperTalk2b);
               SAVE.flag.n.pacifist_marker = 7.4;
            }
            if (SAVE.flag.n.pacifist_marker < 7.6) {
               await renderer.pause(1000);
               if (SAVE.flag.n.pacifist_marker < 7.5) {
                  await state.dialogue(false, ...text.b_opponent_asriel.hyperTalk3b);
               } else {
                  await state.dialogue(false, ...text.b_opponent_asriel.hyperTalk3a);
               }
               await state.dialogue(false, ...text.b_opponent_asriel.hyperTalk3c);
               if (await patterns.asriel(13, 2)) {
                  speech.emoters.asriel.metadata.reset(true);
                  SAVE.flag.n.pacifist_marker = 7.6;
                  azLoadInvAndHP();
               } else {
                  azSaveInvAndHP(7.6);
               }
            }
            if (SAVE.flag.n.pacifist_marker < 7.7) {
               await renderer.pause(1000);
               await state.dialogue(false, ...text.b_opponent_asriel.hyperTalk4);
               if (await patterns.asriel(13, 2)) {
                  speech.emoters.asriel.metadata.reset(true);
                  SAVE.flag.n.pacifist_marker = 7.7;
                  azLoadInvAndHP();
               } else {
                  azSaveInvAndHP(7.7);
               }
            }
            if (SAVE.flag.n.pacifist_marker < 7.8) {
               const part5loader = azAssets5.load();
               await renderer.pause(1000);
               await state.dialogue(false, ...text.b_opponent_asriel.hyperTalk5);
               battler.SOUL.metadata.collision = false;
               patterns.asriel(13, 2, 0);
               await Promise.all([
                  renderer.alpha.modulate(renderer, 2000, 0),
                  battler.music?.gain.modulate(renderer, 2000, 0)
               ]);
               battler.music?.stop();
               await antifreeze([ part5loader, renderer.pause(2000) ]);
               battler.SOUL.metadata.collision = true;
               speech.emoters.asriel.index = 0;
               speech.emoters.asriel.metadata.reset(true);
               azSaveInvAndHP(7.8);
               battler.box.size.set(282.5, 65);
               renderer.alpha.value = 1;
            } else if (SAVE.flag.n.pacifist_marker < 8) {
               renderer.alpha.value = 0;
               await renderer.pause(2000);
               renderer.alpha.value = 1;
            }
            if (SAVE.flag.n.pacifist_marker < 8) {
               const fd2 = fader({ alpha: 1, priority: 2000 });
               atlas.switch('dialoguerBottom');
               atlas.navigators.of('dialoguerBottom').objects[0].priority.value = 2001;
               await typer.text(...text.b_opponent_asriel.intermission());
               atlas.navigators.of('dialoguerBottom').objects[0].priority.value = 0;
               atlas.switch(null);
               const fd3 = fader({ fill: 0xffffff, priority: 2003 });
               renderer.attach('menu', fd3);
               await fd3.alpha.modulate(renderer, SAVE.flag.b.$option_epilepsy ? 300 : 150, 1);
               heal();
               battler.hpboost.reset();
               azSaveInvAndHP(8);
               renderer.detach('menu', fd2);
               await renderer.pause(SAVE.flag.b.$option_epilepsy ? 150 : 300);
               azActivateSaveButton();
               sounds.shatter.instance(renderer);
               azMusicHyper();
               fd3.alpha.modulate(renderer, 300, 0).then(() => renderer.detach('menu', fd3));
               azResetBattleMenu();
               game.movement = false;
               return;
            } else if (SAVE.flag.n.pacifist_marker_bully === 3) {
               await azPreBullyScene(fader({ alpha: 1 }));
               azResetBattleMenu();
               game.movement = false;
               return;
            } else if (SAVE.flag.n.pacifist_marker < 9) {
               if (state.vars.hits === 7) {
                  await renderer.pause(2000);
                  battler.music?.stop();
                  state.dialogue(true, ...text.b_opponent_asriel.attackTalk7x);
                  await azReturnToOW();
                  return;
               }
               await standardSize({ x: 100, y: 65 }, true);
               standardPos(true);
               if (
                  await patterns.asriel(
                     13,
                     state.vars.hits < 1 ? 2 : state.vars.hits < 5 ? 1 : state.vars.hits < 6 ? 4 : 0,
                     state.vars.hits > 0 ? 11 - state.vars.hits : 99,
                     state.vars.hits < 5 ? 4000 : 6000
                  )
               ) {
                  state.vars.cds?.(true);
                  state.vars.cds = null;
                  azLoadInvAndHP();
                  azInstaResetBox();
                  if (state.vars.bully) {
                     state.vars.hits--;
                     state.volatile.hp = state.vars.hp;
                     SAVE.flag.n.pacifist_marker_bully_hits = state.vars.hits;
                  }
                  speech.emoters.asriel.metadata.reset(true);
               } else {
                  state.vars.cds?.();
                  state.vars.cds = null;
                  azUpdateBullyMarker(state.vars.hits);
                  azSaveInvAndHP();
                  await resetBox(true);
               }
               game.movement = false;
               return;
            } else if (SAVE.flag.n.pacifist_marker < 9.1) {
               atlas.switch(null);
               battler.SOUL.alpha.value = 0;
               const part6loader = azAssets6.load();
               state.dialogue(true, ...text.b_opponent_asriel.saveTalk1);
               await typer.on('idle');
               await renderer.pause(1000);
               typer.reset(true);
               const fd = fader({ fill: 0xffffff, alpha: 0 });
               await fd.alpha.modulate(renderer, 3000, 1);
               await renderer.pause(1000);
               await renderer.alpha.modulate(renderer, 3000, 0);
               renderer.detach('menu', fd);
               await antifreeze([ part6loader, renderer.pause(1000) ]);
               azSaveInvAndHP(9.1);
               azMusicEmotion();
            } else if (SAVE.flag.n.pacifist_marker < 9.2) {
               atlas.switch(null);
               battler.SOUL.alpha.value = 0;
               renderer.alpha.value = 0;
            }
            if (SAVE.flag.n.pacifist_marker < 9.2) {
               const fd1 = fader({ alpha: 1 });
               const display = new CosmosAnimation({
                  anchor: { x: 0 },
                  position: { x: 160, y: 31 },
                  resources: content.ieStory,
                  index: 12
               });
               renderer.attach('menu', display);
               while (true) {
                  await renderer.alpha.modulate(renderer, 500, 1);
                  await renderer.pause(3000);
                  if (display.index < 16) {
                     await renderer.alpha.modulate(renderer, 500, 0);
                     display.index++;
                  } else {
                     break;
                  }
               }
               const fd2 = fader({ fill: 0xffffff, alpha: 0, priority: 2000 });
               await fd2.alpha.modulate(renderer, 2000, 1);
               azSaveInvAndHP(9.2);
               renderer.detach('menu', fd1, display);
               battler.box.size.set(120, 65);
               standardPos(true);
               await fd2.alpha.modulate(renderer, 2000, 0);
               renderer.detach('menu', fd2);
            } else if (SAVE.flag.n.pacifist_marker < 10) {
               battler.box.size.set(120, 65);
               standardPos(true);
            }
            if (SAVE.flag.n.pacifist_marker < 9.3) {
               await renderer.pause(1000);
               await state.dialogue(false, ...text.b_opponent_asriel.saveTalk2);
               if (await patterns.asriel(13, 0, 1, 6000)) {
                  speech.emoters.asriel.metadata.reset(true);
                  SAVE.flag.n.pacifist_marker = 9.3;
                  azLoadInvAndHP();
               } else {
                  azSaveInvAndHP(9.3);
               }
            }
            if (SAVE.flag.n.pacifist_marker < 9.4) {
               await renderer.pause(1000);
               await state.dialogue(false, ...text.b_opponent_asriel.saveTalk3);
               if (await patterns.asriel(13, 4, 1, 6000)) {
                  speech.emoters.asriel.metadata.reset(true);
                  SAVE.flag.n.pacifist_marker = 9.4;
                  azLoadInvAndHP();
               } else {
                  azSaveInvAndHP(9.4);
               }
            }
            if (SAVE.flag.n.pacifist_marker < 9.5) {
               await renderer.pause(1000);
               await state.dialogue(false, ...text.b_opponent_asriel.saveTalk4);
               await patterns.asriel(14);
               azSaveInvAndHP(9.5);
            }
            if (SAVE.flag.n.pacifist_marker < 9.6) {
               await renderer.pause(1000);
               await state.dialogue(false, ...text.b_opponent_asriel.saveTalk5);
               await patterns.asriel(14);
               azSaveInvAndHP(9.6);
            }
            if (SAVE.flag.n.pacifist_marker < 9.7) {
               await renderer.pause(1000);
               await state.dialogue(false, ...text.b_opponent_asriel.saveTalk6);
               await patterns.asriel(14);
               azSaveInvAndHP(9.7);
            }
            if (SAVE.flag.n.pacifist_marker < 9.8) {
               await renderer.pause(1000);
               await state.dialogue(false, ...text.b_opponent_asriel.saveTalk7);
               await patterns.asriel(14);
               azSaveInvAndHP(9.8);
            }
            if (SAVE.flag.n.pacifist_marker < 10) {
               await renderer.pause(1000);
               await state.dialogue(false, ...text.b_opponent_asriel.saveTalk8);
               await patterns.asriel(15, void 0, void 0, void 0, state.dialogue);
               azSaveInvAndHP(10);
               state.vars.turns = 15;
               await resetBox(true);
               azIsolateSaveButton();
               azResetBattleMenu();
            } else if (state.vars.turns < 19) {
               state.vars.turns++;
               await standardSize({ x: 120, y: 65 }, true);
               standardPos();
               await renderer.pause(450);
               await resetBox(true);
            } else {
               battler.music?.stop();
               state.dialogue(true, ...text.b_opponent_asriel.endTalk5);
               await azReturnToOW();
               return;
            }
            game.movement = false;
         },
         defaultStatus: state => azStatus(state.vars.turns),
         poststatus (state) {
            if (state.vars.power && SAVE.flag.n.pacifist_marker < 6 && speech.emoters.asriel.metadata.pause) {
               speech.emoters.asriel.metadata.reset();
            }
            if (SAVE.flag.n.pacifist_marker < 11) {
               battler.resume();
            }
         }
      }),
      sprite (v) {
         let flip = false;
         let time = renderer.time;
         const head = new CosmosAnimation({ anchor: { x: 0, y: 1 } });
         const body = new CosmosAnimation({ active: true, anchor: { x: 0, y: 1 } });
         const arms = [
            new CosmosAnimation({
               active: true,
               anchor: 0,
               position: { x: -28.5, y: -70 },
               resources: content.ibcAsrielHyperarm,
               priority: 1
            }).on('tick', function () {
               if (this.rotation.value === 0) {
                  this.active || this.enable();
               } else {
                  this.active && this.reset();
               }
            }),
            new CosmosAnimation({
               anchor: 0,
               position: { x: 28.5, y: -70 },
               resources: content.ibcAsrielHyperarm,
               priority: 1,
               scale: { x: -1 }
            }).on('tick', function () {
               this.index = arms[0].index;
            })
         ];
         const fade = new CosmosRectangle({
            fill: 0,
            size: 1000,
            position: { x: 160, y: 120 },
            anchor: 0,
            alpha: 0,
            priority: 2,
            metadata: { init: false, step: 0 }
         });
         const spr = new CosmosSprite({
            anchor: { y: 1 },
            objects: [ body, head ],
            index:
               SAVE.flag.n.pacifist_marker < 7
                  ? [ 0, 6, 2, 2, 0, 0, 3, 4, 2, 3, 1, 1, 2, 5 ][Math.min(SAVE.flag.n.pacifist_marker_turns, 13)]
                  : SAVE.flag.n.pacifist_marker < 7.1
                  ? 0
                  : SAVE.flag.n.pacifist_marker < 7.2
                  ? 2
                  : SAVE.flag.n.pacifist_marker < 7.3
                  ? 5
                  : SAVE.flag.n.pacifist_marker < 7.4
                  ? 1
                  : SAVE.flag.n.pacifist_marker < 7.5
                  ? 4
                  : SAVE.flag.n.pacifist_marker < 9
                  ? !world.runaway
                     ? 0
                     : [ 0, 0, 0, 1, 6, 7, 10, 11 ][azBullyHitCount()]
                  : SAVE.flag.n.pacifist_marker < 9.4
                  ? 1
                  : SAVE.flag.n.pacifist_marker < 9.5
                  ? 9
                  : SAVE.flag.n.pacifist_marker < 9.6
                  ? 7
                  : SAVE.flag.n.pacifist_marker < 9.7
                  ? 8
                  : SAVE.flag.n.pacifist_marker < 9.8
                  ? 3
                  : SAVE.flag.n.pacifist_marker < 10
                  ? 9
                  : 11,
            metadata: {
               alpha: 1,
               armRotate (alt = false) {
                  if (alt) {
                     arms[0].rotation.modulate(renderer, 300, 102.5, 102.5);
                     arms[1].rotation.modulate(renderer, 300, -102.5, -102.5);
                  } else {
                     arms[0].rotation.modulate(renderer, 600, -235, -235);
                     arms[1].rotation.modulate(renderer, 600, 235, 235);
                  }
                  return arms;
               },
               async armUnrotate (insta = false) {
                  if (insta) {
                     arms[0].rotation.task?.();
                     arms[0].rotation.value = 0;
                     arms[1].rotation.task?.();
                     arms[1].rotation.value = 0;
                  } else {
                     arms[0].rotation.modulate(renderer, 600, 0, 0);
                     arms[1].rotation.modulate(renderer, 600, 0, 0);
                  }
               },
               fade () {
                  if (!fade.metadata.init) {
                     fade.metadata.init = true;
                     spr.attach(fade);
                     head.priority.value = 3;
                     battler.box.metadata.alpha = 1;
                     const button = atlas.navigators.of('battlerAdvanced').objects[3].objects[2];
                     button.parent?.detach(button);
                     renderer.attach('menu', button);
                     battler.garbage.push([ 'menu', button ]);
                  }
                  const v = (1 - fade.metadata.step++ / 4) ** Math.SQRT2;
                  fade.alpha.value = 1 - v;
                  battler.alpha.value = v;
                  battler.music && (battler.music.gain.value = v * battler.music.daemon.gain);
               },
               pause: SAVE.flag.n.pacifist_marker > 5,
               power: SAVE.flag.n.pacifist_marker > 4 && SAVE.flag.n.pacifist_marker_turns > 0,
               size: { y: 80 },
               xyz: false,
               hyper () {
                  spr.metadata.xyz = true;
                  spr.attach(
                     new CosmosAnimation({
                        active: true,
                        anchor: { x: 1, y: 0 },
                        priority: -1,
                        resources: content.ibcAsrielHyperwing
                     }).on('tick', function () {
                        this.offsets[0].set(0, sineWaver(time, 4000, -2, 2));
                     }),
                     new CosmosAnimation({
                        active: true,
                        anchor: { x: 1, y: 0 },
                        priority: -1,
                        resources: content.ibcAsrielHyperwing,
                        scale: { x: -1 }
                     }).on('tick', function () {
                        this.offsets[0].set(0, sineWaver(time, 4000, -2, 2));
                     }),
                     ...arms
                  );
                  body.position.y = 7;
                  body.use(content.ibcAsrielHyperbody);
                  head.position.y = 7;
               },
               reset (insta = false) {
                  flip = !flip;
                  time = renderer.time;
                  spr.index = 0;
                  spr.metadata.alpha = 1;
                  spr.metadata.pause = false;
                  spr.metadata.armUnrotate(insta);
                  spr.offsets[0].set(0);
                  insta && (spr.alpha.value = 1);
               }
            }
         }).on('tick', function () {
            let echo = false;
            let headResources = void 0 as CosmosAnimationResources | null | void;
            let headActive = void 0 as boolean | void;
            let headIndex = void 0 as number | void;
            let bodyResources = void 0 as CosmosAnimationResources | null | void;
            if (this.metadata.xyz) {
               switch (this.index) {
                  case 0:
                  case 1:
                  case 2:
                  case 3:
                  case 4:
                  case 5:
                  case 6:
                  case 7:
                  case 8:
                  case 9:
                  case 10:
                  case 11:
                     headResources = content.ibcAsrielHyperhead;
                     headActive = false;
                     headIndex = this.index;
                     break;
                  case 12:
                     headResources = content.ibcAsrielHypersob;
                     headActive = true;
                     break;
                  case 13:
                     headResources = content.ibcAsrielHypersob;
                     headActive = true;
                     break;
                  case 14:
                     headResources = content.ibcAsrielHypersobex;
                     headActive = true;
                     break;
               }
            } else {
               switch (this.index) {
                  case 0:
                  case 1:
                  case 2:
                     headResources = content.ibcAsrielFullhead;
                     headActive = false;
                     headIndex = this.index;
                     bodyResources = content.ibcAsrielFullbody1;
                     break;
                  case 3:
                     headResources = content.ibcAsrielFullheadShaker1;
                     headActive = false;
                     headIndex = 0;
                     bodyResources = content.ibcAsrielFullbody1;
                     break;
                  case 4:
                     headResources = content.ibcAsrielFullheadShaker2;
                     headActive = false;
                     headIndex = 0;
                     bodyResources = content.ibcAsrielFullbody1;
                     break;
                  case 5:
                     headResources = content.ibcAsrielFullheadShaker1;
                     headActive = true;
                     bodyResources = content.ibcAsrielFullbody2;
                     break;
                  case 6:
                     headResources = content.ibcAsrielFullheadShaker2;
                     headActive = true;
                     bodyResources = content.ibcAsrielFullbody2;
                     break;
               }
               if (this.metadata.power) {
                  const ideal = { x: 0, y: 0 };
                  if (this.metadata.pause) {
                     ideal.x = 0;
                     ideal.y = 0;
                  } else {
                     echo = true;
                     ideal.x = sineWaver(time, 6000, -80, 80, flip ? 0.5 : 0);
                     ideal.y = sineWaver(time, 3000, -8, 8);
                  }
                  this.offsets[0].set(this.offsets[0].multiply(4).add(ideal).divide(5));
               } else {
                  this.offsets[0].set(0, sineWaver(time, 4000, -2, 2));
               }
            }
            headResources !== void 0 && head.resources !== headResources && head.use(headResources);
            if (headActive !== void 0) {
               if (headActive) {
                  head.active || head.enable();
               } else {
                  head.active && head.reset();
               }
            }
            headIndex !== void 0 && (head.index = headIndex);
            bodyResources !== void 0 && body.resources !== bodyResources && body.use(bodyResources);
            if (echo) {
               const shad = new CosmosObject({
                  blend: BLEND_MODES.ADD,
                  priority: -5,
                  position: spr.position.add(spr.offsets[0]),
                  metadata: { ticks: -1 },
                  objects: [
                     new CosmosSprite({
                        anchor: { x: 0, y: 1 },
                        index: body.index,
                        frames: body.frames,
                        crop: body.crop
                     }),
                     new CosmosSprite({
                        anchor: { x: 0, y: 1 },
                        index: head.index,
                        frames: head.frames,
                        crop: head.crop
                     })
                  ]
               }).on('tick', function () {
                  const tick = Math.max(Math.floor(this.metadata.ticks++ / 2), 0);
                  if (tick < 7) {
                     this.alpha.value = (1 - tick / 13) ** 4 * 0.4;
                     this.tint = [ 0xff0000, 0xffff00, 0x00ff00, 0x00ffff, 0x007fff, 0x0000ff, 0x7f00ff ][tick];
                  } else {
                     v.container.detach(shad);
                  }
               });
               v.container.attach(shad);
            }
            this.alpha.value = Math.min(
               Math.max(
                  this.alpha.value + Math.min(Math.max(this.metadata.alpha - this.alpha.value, -1 / 9), 1 / 9),
                  0
               ),
               1
            );
         });
         speech.emoters.asriel = spr;
         SAVE.flag.n.pacifist_marker < 7 || spr.metadata.hyper();
         return spr;
      }
   }),
   final: new OutertaleOpponent({
      assets: new CosmosInventory(
         content.asCymbal,
         content.asSuperstrike,
         content.ibcAsgoreStatic,
         content.ibcAlphysBody,
         content.ibcAlphysHead,
         inventories.idcAsgore,
         content.avAsgore,
         content.avAlphys,
         content.amAsgore,
         content.ibcAsrielCutscene1full,
         content.avAsriel
      ),
      acts: () => [ [ 'check', text.b_opponent_final.act_check ] ],
      metadata: { noEpiphany: true, nootexempt: true },
      bullyable: false,
      sparable: false,
      hp: 2147483647,
      df: 0,
      exp: 0,
      safe: true,
      handler: battler.opponentHandler({
         vars: {
            didf: false,
            didx: 0,
            hits: 0,
            asgoreTalk (body: CosmosPointSimple, ...lines: string[]) {
               return battler.monster(false, new CosmosPoint(28, -112).add(body), battler.bubbles.twinkly, ...lines);
            },
            alphysTalk (body: CosmosPointSimple, ...lines: string[]) {
               const flip = body.x > 180;
               return battler.monster(
                  false,
                  new CosmosPoint(flip ? -22 : 22, -78).add(body),
                  flip ? battler.bubbles.twinkly2 : battler.bubbles.twinkly,
                  ...lines
               );
            },
            undyneTalk (body: CosmosPointSimple, ...lines: string[]) {
               return battler.monster(false, new CosmosPoint(20, -95).add(body), battler.bubbles.twinkly, ...lines);
            },
            papyrusTalk (body: CosmosPointSimple, ...lines: string[]) {
               return battler.monster(false, new CosmosPoint(24, -95).add(body), battler.bubbles.twinkly, ...lines);
            },
            mettatonTalk (body: CosmosPointSimple, ...lines: string[]) {
               return battler.monster(false, new CosmosPoint(34, -80).add(body), battler.bubbles.twinkly, ...lines);
            },
            async napstaTalk (body: CosmosPointSimple, ...lines: string[]) {
               typer.magic = battler.ghost_magic;
               await battler.monster(false, new CosmosPoint(30, -72).add(body), battler.bubbles.twinkly, ...lines);
               typer.magic = '';
            },
            sansTalk (body: CosmosPointSimple, ...lines: string[]) {
               return battler.monster(false, new CosmosPoint(-25, -77).add(body), battler.bubbles.twinkly2, ...lines);
            },
            torielTalk (body: CosmosPointSimple, ...lines: string[]) {
               return battler.monster(false, new CosmosPoint(-24, -95).add(body), battler.bubbles.twinkly2, ...lines);
            },
            twinklyTalk (body: CosmosPointSimple, ...lines: string[]) {
               const flip = body.x > 180;
               return battler.monster(
                  false,
                  new CosmosPoint(flip ? -25 : 25, -30).add(body),
                  flip ? battler.bubbles.twinkly2 : battler.bubbles.twinkly,
                  ...lines
               );
            }
         },
         defaultStatus: state =>
            [
               () => text.b_opponent_final.status1(),
               () => text.b_opponent_final.status2,
               () => text.b_opponent_final.status2,
               () => text.b_opponent_final.status2,
               () => text.b_opponent_final.status2,
               () => text.b_opponent_final.status2,
               () => text.b_opponent_final.status2,
               () => text.b_opponent_final.status2,
               () => text.b_opponent_final.status2,
               () => text.b_opponent_final.status2,
               () => text.b_opponent_final.status2,
               () => text.b_opponent_final.status3,
               () => text.b_opponent_final.status3,
               () => text.b_opponent_final.status4,
               () => text.b_opponent_final.status4,
               () => text.b_opponent_final.status5,
               () => []
            ][SAVE.flag.n.pacifist_marker < 1 ? state.vars.hits : 16],
         async fight (state) {
            state.vars.didf = true;
            const fdw = fader({ fill: 0xffffff, alpha: 0 });
            const fdb = fader({ alpha: 0 });
            const cym = sounds.supercymbal.instance(renderer, 4);
            cym.gain.value = 0;
            cym.rate.value = 0.95;
            fdw.alpha.modulate(renderer, 600, 1).then(async () => {
               await renderer.pause(300);
               await fdb.alpha.modulate(renderer, 300, 1, 1);
            });
            cym.rate.modulate(renderer, 200, 1).then(async () => {
               await renderer.pause(400);
               await cym.rate.modulate(renderer, 600, 1, 1, 0.3);
               cym.stop();
            });
            cym.gain.modulate(renderer, 200, cym.daemon.gain).then(async () => {
               await renderer.pause(700);
               await cym.gain.modulate(renderer, 300, 1, 0);
            });
            await renderer.pause(1500);
            renderer.detach('menu', fdw, fdb);
            sounds.hyperstrike.instance(renderer).rate.value = 0.9;
            const power = [
               -134217728, -134217728, -134217728, -134217728, -134217728, -134217728, -134217728, -134217728,
               -134217728, -134217728, -134217728, -134217728, -100663296, -67108864, -33554432, 0
            ][state.vars.hits++];
            const vl = (1 - (state.volatile.hp + power) / state.opponent.hp) * 0.25;
            barrierPower.value = vl;
            renderer.shake.value = vl * 4;
            const bgfx = battler.volatile[0].container.metadata.bgfx;
            bgfx.gain.value = CosmosMath.remap_clamped(vl, 0, bgfx.daemon.gain, 0, 1 / 2.4);
            battler.attack(state.volatile, { power, operation: 'add' }, false, true, true);
            let index = 60;
            const origin = renderer.container.y;
            const zbf = new ZoomBlurFilter({ strength: 0.25, radius: 500, innerRadius: 0, center: [ 320, 240 ] });
            renderer.container.filters = [ zbf ];
            while (index-- > 0) {
               if (index > 0) {
                  const indexS = Math.floor(index / 2);
                  renderer.container.y = origin + Math.floor(indexS / 2) * (Math.floor((indexS % 4) / 2) * 2 - 1);
               } else {
                  renderer.container.y = origin;
               }
               await renderer.on('tick');
               zbf.strength *= CosmosMath.bezier(index / 60, 0, 1, 1, 1);
            }
            renderer.container.filters = [];
            await renderer.pause(500);
            return false;
         },
         async poststatus (state) {
            if (SAVE.flag.n.pacifist_marker < 1 && state.vars.hits < 16) {
               if (state.vars.didf) {
                  state.vars.didf = false;
               } else if (9 <= ++state.vars.didx) {
                  battler.status = () => text.b_opponent_final.status1x;
               }
               battler.resume();
               return;
            }

            const time = renderer.time;
            const friendship = new CosmosObject();

            const asgore = new CosmosSprite({ position: { y: -92.5 } }).on('tick', faceTicker('asgore'));
            const asgoreBody = new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.ibcAsgoreStatic,
               objects: [ asgore ]
            });
            const alphys = new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               position: { x: -1, y: 1 },
               resources: content.ibcAlphysHead
            });
            const alphysBody = new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.ibcAlphysBody,
               objects: [ alphys ]
            }).on('tick', function () {
               this.index = [ 13, 14 ].includes(alphys.index)
                  ? alphys.index - 11
                  : [ 9, 11 ].includes(alphys.index)
                  ? 1
                  : alphys.index === 35
                  ? 4
                  : 0;
            });
            const undyne = new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.ibcUndyneHead });
            const undyneBody = new CosmosSprite({
               anchor: { x: 0, y: 1 },
               frames: [ content.ibcUndyneDate ],
               position: { y: 1 },
               objects: [
                  new CosmosAnimation({
                     active: true,
                     anchor: { x: 0, y: 1 },
                     position: { y: 7 },
                     resources: content.ibcUndyneHair,
                     objects: [ undyne ]
                  })
               ]
            });
            const papyrus = new CosmosSprite({ position: { x: -21, y: -105 } }).on('tick', faceTicker('papyrus'));
            const papyrusBody = new CosmosAnimation({
               active: true,
               resources: content.ibcPapyrusBattle,
               objects: [ papyrus ],
               anchor: { x: 0, y: 1 }
            });
            const sans = new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.ibcSansBattle });
            const toriel = new CosmosSprite({ position: { y: -84.5 } }).on('tick', faceTicker('toriel'));
            const torielBody = new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.ibcTorielBattle2,
               objects: [ toriel ]
            });

            speech.emoters.asgore = asgore;
            speech.emoters.alphys = alphys;
            speech.emoters.undyne = undyne;
            speech.emoters.papyrus = papyrus;
            speech.emoters.sans = sans;
            speech.emoters.toriel = toriel;

            const fd = fader({ fill: 0xffffff, alpha: 0 }, null);
            const idL = SAVE.flag.n.pacifist_marker < 1 && content.amIdiot.load();

            if (SAVE.flag.n.pacifist_marker < 1) {
               const labLoader = content.amLab.load();
               const part1loader = azAssets1.load();
               const mettaton = new CosmosSprite({
                  position: { x: 2.5 },
                  metadata: { index: 0 },
                  objects: [
                     new CosmosAnimation({
                        active: true,
                        anchor: { x: 0, y: 1 },
                        resources: content.ibcMettatonArmsWhatevs
                     })
                  ]
               }).on('tick', function () {
                  this.position.y = sineWaver(time, 900, 9, 12);
                  if (this.metadata.index !== this.index) {
                     this.metadata.index = this.index;
                     (this.objects[0] as CosmosAnimation).use(
                        [
                           content.ibcMettatonArmsWhatevs,
                           content.ibcMettatonArmsNoticard,
                           content.ibcMettatonArmsThonk,
                           content.ibcMettatonArmsWhaaat,
                           content.ibcMettatonArmsBruh
                        ][this.index]
                     );
                  }
               });
               const mettatonBody = new CosmosAnimation({
                  anchor: { x: 0, y: 1 },
                  resources: content.ibcMettatonBody,
                  metadata: { idealX: 0, thatsatilter: new CosmosValue(3) },
                  scale: 1.15,
                  objects: [
                     new CosmosSprite({ frames: [ content.ibcMettatonWheel ], anchor: 0 }).on('tick', function () {
                        this.rotation.value =
                           -mettatonBody.rotation.value +
                           360 * ((mettatonBody.position.x + mettatonBody.offsets[0].x - 160) / 30);
                     }),
                     mettaton
                  ]
               }).on('tick', function () {
                  const v = sineWaver(time, 700, -1, 1) * this.metadata.thatsatilter.value;
                  if (!Number.isNaN(this.metadata.idealX)) {
                     this.velocity.x = (this.velocity.x + (this.metadata.idealX - this.position.x)) / 2;
                  }
                  this.rotation.value = -v - this.velocity.x / 4;
                  this.offsets[0].x = v;
               });
               const napstablook = new CosmosAnimation({
                  active: true,
                  anchor: { y: 1, x: 0 },
                  resources: content.ibcNapstablookBattle
               }).on('tick', function () {
                  this.offsets[0].y = sineWaver(time, 4000, 0, 4);
               });

               speech.emoters.mettaton = mettaton;

               battler.music?.gain.modulate(renderer, 4000, 0).then(() => battler.music?.stop());
               renderer.shake.modulate(renderer, 2000, 0);
               const { bgfx, warpticker } = battler.volatile[0].container.metadata;
               bgfx.gain.modulate(renderer, 2000, 0).then(() => {
                  renderer.off('tick', warpticker);
                  bgfx.stop();
               });
               atlas.navigators.of('battlerAdvanced').objects[0].objects[0].alpha.modulate(renderer, 2000, 0);
               await renderer.pause(1000);

               renderer.attach('menu', friendship);
               battler.alpha.modulate(renderer, 1000, 0).then(async () => {
                  atlas.detach(renderer, 'menu', 'battlerAdvanced', 'battlerAdvancedText');
                  renderer.detach('menu', friendship);
                  atlas.switch('battlerSimple');
                  renderer.attach('menu', friendship);
                  battler.box.size.set(0);
                  battler.box.position.set(160, 280);
                  await battler.alpha.modulate(renderer, 1000, 1);
               });

               const part2loader = azAssets2.load();

               asgoreBody.position.set(-70, 120);
               asgore.index = 5;
               friendship.attach(asgoreBody);
               await asgoreBody.position.modulate(renderer, 1500, { x: 30 });
               await renderer.pause(500);
               await state.vars.asgoreTalk(asgoreBody, ...text.b_opponent_final.friend1);

               alphysBody.position.set(360, 121);
               alphys.index = 15;
               alphysBody.scale.x = -1;
               friendship.attach(alphysBody);
               await alphysBody.position.step(renderer, 4, { x: 260 });
               await state.vars.alphysTalk(alphysBody, ...text.b_opponent_final.friend2);
               await alphysBody.position.step(renderer, 4, { x: 160 });
               await state.vars.asgoreTalk(asgoreBody, ...text.b_opponent_final.friend3);
               await state.vars.alphysTalk(alphysBody, ...text.b_opponent_final.friend4a);
               await renderer.pause(650);
               await state.vars.alphysTalk(alphysBody, ...text.b_opponent_final.friend4b);
               await renderer.pause(450);
               await state.vars.asgoreTalk(asgoreBody, ...text.b_opponent_final.friend5);
               await renderer.pause(850);
               await state.vars.alphysTalk(alphysBody, ...text.b_opponent_final.friend6);
               await renderer.pause(450);
               await state.vars.asgoreTalk(asgoreBody, ...text.b_opponent_final.friend7);
               await renderer.pause(850);
               await state.vars.alphysTalk(alphysBody, ...text.b_opponent_final.friend8);
               await state.vars.asgoreTalk(asgoreBody, ...text.b_opponent_final.friend9a);
               await renderer.pause(1250);
               await state.vars.asgoreTalk(asgoreBody, ...text.b_opponent_final.friend9b);
               await antifreeze([ labLoader, part1loader, renderer.pause(1650) ]);
               const showtimeLoader = content.amGameshow.load();
               await state.vars.asgoreTalk(asgoreBody, ...text.b_opponent_final.friend9c);
               await state.vars.alphysTalk(alphysBody, ...text.b_opponent_final.friend10);

               undyneBody.position.set(45, 370);
               undyne.index = 13;
               friendship.attach(undyneBody);
               await undyneBody.position.step(renderer, 5, { y: 280 });
               await state.vars.undyneTalk(undyneBody, ...text.b_opponent_final.friend11);
               await state.vars.alphysTalk(alphysBody, ...text.b_opponent_final.friend12);
               const labMusic = music.lab.instance(renderer);
               await undyneBody.position.step(renderer, 5, { y: 240 }, { x: 95, y: 180 }, { y: 122 });
               await state.vars.undyneTalk(undyneBody, ...text.b_opponent_final.friend13);
               await state.vars.alphysTalk(alphysBody, ...text.b_opponent_final.friend14);
               await state.vars.undyneTalk(undyneBody, ...text.b_opponent_final.friend15);
               await state.vars.alphysTalk(alphysBody, ...text.b_opponent_final.friend16a);
               await renderer.pause(850);
               await state.vars.undyneTalk(undyneBody, ...text.b_opponent_final.friend16b);
               await renderer.pause(1250);
               await state.vars.undyneTalk(undyneBody, ...text.b_opponent_final.friend17());
               await renderer.pause(650);
               await state.vars.alphysTalk(alphysBody, ...text.b_opponent_final.friend18);
               await state.vars.undyneTalk(undyneBody, ...text.b_opponent_final.friend19);
               await renderer.pause(1250);
               labMusic.gain.value = 0;
               await state.vars.alphysTalk(alphysBody, ...text.b_opponent_final.friend20);
               await renderer.pause(650);
               await state.vars.asgoreTalk(asgoreBody, ...text.b_opponent_final.friend21);
               await state.vars.undyneTalk(undyneBody, ...text.b_opponent_final.friend22);
               labMusic.rate.value = labMusic.daemon.rate * 1.2;
               labMusic.gain.modulate(renderer, 2000, labMusic.daemon.gain);
               await renderer.pause(850);
               await state.vars.alphysTalk(alphysBody, ...text.b_opponent_final.friend23);
               await renderer.pause(650);
               await state.vars.asgoreTalk(asgoreBody, ...text.b_opponent_final.friend24);
               await state.vars.undyneTalk(undyneBody, ...text.b_opponent_final.friend25);
               await state.vars.alphysTalk(alphysBody, ...text.b_opponent_final.friend26);
               await state.vars.undyneTalk(undyneBody, ...text.b_opponent_final.friend27);
               await antifreeze([ showtimeLoader, renderer.pause(850) ]);
               const vibesLoader = content.amToriel.load();
               labMusic.rate.modulate(renderer, 3000, labMusic.daemon.rate * 2);
               alphysBody.position.modulate(renderer, 1000, { x: 125 });
               await state.vars.alphysTalk(alphysBody, ...text.b_opponent_final.friend28);
               renderer.attach('menu', fd);
               await fd.alpha.modulate(renderer, SAVE.flag.b.$option_epilepsy ? 300 : 150, 1);
               asgore.index = 5;
               alphys.index = 28;
               alphysBody.position.x = 130;
               await renderer.pause(SAVE.flag.b.$option_epilepsy ? 1100 : 1250);
               renderer.detach('menu', fd);

               papyrusBody.position.set(110, 280);
               papyrus.index = 13;
               friendship.attach(papyrusBody);
               labMusic.stop();
               content.amLab.unload();
               await state.vars.papyrusTalk(papyrusBody, ...text.b_opponent_final.friend29);
               await papyrusBody.position.step(renderer, 5, { y: 200 });
               alphysBody.position.step(renderer, 3, { x: 195 });
               await papyrusBody.position.step(renderer, 5, { x: 150, y: 160 }, { y: 120 });
               papyrusBody.priority.value = -1;
               alphysBody.priority.value = 1;
               await renderer.pause(300);

               mettatonBody.position.set(-80, 160);
               mettaton.index = 0;
               mettatonBody.metadata.idealX = 60;
               mettatonBody.priority.value = 2;
               friendship.attach(mettatonBody);
               await renderer.pause(500);
               const showtime = music.gameshow.instance(renderer);
               await state.vars.mettatonTalk(mettatonBody, ...text.b_opponent_final.friend30());

               napstablook.position.set(-60, 200);
               napstablook.priority.value = 3;
               friendship.attach(napstablook);
               await napstablook.position.step(renderer, 2, { x: 20 });
               await state.vars.napstaTalk(napstablook, ...text.b_opponent_final.friend31);
               await renderer.pause(850);
               await state.vars.mettatonTalk(mettatonBody, ...text.b_opponent_final.friend32a);
               await state.vars.napstaTalk(napstablook, ...text.b_opponent_final.friend32b);
               napstablook.position.step(renderer, 2, { x: -60 }).then(() => friendship.detach(napstablook));
               await renderer.pause(850);
               await state.vars.undyneTalk(undyneBody, ...text.b_opponent_final.friend33);
               await state.vars.papyrusTalk(papyrusBody, ...text.b_opponent_final.friend34);
               await renderer.pause(650);
               await state.vars.undyneTalk(undyneBody, ...text.b_opponent_final.friend35());
               await state.vars.mettatonTalk(mettatonBody, ...text.b_opponent_final.friend36);
               await renderer.pause(850);
               await state.vars.alphysTalk(alphysBody, ...text.b_opponent_final.friend37);
               await state.vars.undyneTalk(undyneBody, ...text.b_opponent_final.friend38);
               await state.vars.alphysTalk(alphysBody, ...text.b_opponent_final.friend39);
               await renderer.pause(1650);
               await state.vars.papyrusTalk(papyrusBody, ...text.b_opponent_final.friend40);
               await renderer.pause(2650);
               await state.vars.mettatonTalk(mettatonBody, ...text.b_opponent_final.friend41);
               mettaton.index = 4;
               showtime.rate.modulate(renderer, 1000, 1, 0).then(() => {
                  showtime.stop();
                  content.amGameshow.unload();
               });

               sans.position.set(242.5, 0);
               sans.index = 2;
               friendship.attach(sans);
               await sans.position.step(renderer, 4, { y: 123 });
               sans.priority.value = 1.5;
               await state.vars.sansTalk(sans, ...text.b_opponent_final.friend42);
               mettatonBody.metadata.idealX = NaN;
               mettatonBody.metadata.thatsatilter.modulate(renderer, 650, 0);
               mettatonBody.velocity.modulate(renderer, 1250, { x: 15 });
               await state.vars.papyrusTalk(papyrusBody, ...text.b_opponent_final.friend43);
               await antifreeze([ vibesLoader, renderer.pause(2250) ]);
               friendship.detach(mettatonBody);
               await state.vars.papyrusTalk(papyrusBody, ...text.b_opponent_final.friend44);
               await renderer.pause(450);
               await state.vars.sansTalk(sans, ...text.b_opponent_final.friend45);
               await state.vars.asgoreTalk(asgoreBody, ...text.b_opponent_final.friend46);
               await renderer.pause(850);
               await state.vars.sansTalk(sans, ...text.b_opponent_final.friend47);
               const vibes = music.toriel.instance(renderer);

               torielBody.position.set(360, 121);
               const torielStopsBeingABitchAboutEverything =
                  SAVE.data.n.state_wastelands_toriel === 0 || SAVE.data.b.w_state_lateleave;
               toriel.index = torielStopsBeingABitchAboutEverything ? 9 : 12;
               torielBody.priority.value = 1;
               friendship.attach(torielBody);
               await torielBody.position.step(renderer, 2, { x: 295 });
               await state.vars.asgoreTalk(asgoreBody, ...text.b_opponent_final.friend48);
               await state.vars.torielTalk(
                  torielBody,
                  ...(torielStopsBeingABitchAboutEverything
                     ? text.b_opponent_final.friend49a
                     : text.b_opponent_final.friend49b)
               );
               await renderer.pause(1650);
               await state.vars.alphysTalk(
                  alphysBody,
                  ...(torielStopsBeingABitchAboutEverything
                     ? text.b_opponent_final.friend50a
                     : text.b_opponent_final.friend50b)
               );
               await state.vars.sansTalk(
                  sans,
                  ...(torielStopsBeingABitchAboutEverything
                     ? text.b_opponent_final.friend51a
                     : text.b_opponent_final.friend51b)
               );
               await renderer.pause(850);
               await state.vars.asgoreTalk(
                  asgoreBody,
                  ...(torielStopsBeingABitchAboutEverything
                     ? text.b_opponent_final.friend52a1
                     : text.b_opponent_final.friend52b1)
               );
               if (torielStopsBeingABitchAboutEverything) {
                  await renderer.pause(1650);
                  await state.vars.torielTalk(torielBody, ...text.b_opponent_final.friend52a2);
                  await renderer.pause(1250);
                  await state.vars.asgoreTalk(asgoreBody, ...text.b_opponent_final.friend52a3);
                  await renderer.pause(650);
               } else {
                  await renderer.pause(1250);
                  await state.vars.undyneTalk(undyneBody, ...text.b_opponent_final.friend52b2);
                  await renderer.pause(850);
                  await state.vars.asgoreTalk(asgoreBody, ...text.b_opponent_final.friend52b3);
                  await renderer.pause(350);
               }
               await state.vars.undyneTalk(
                  undyneBody,
                  ...(torielStopsBeingABitchAboutEverything
                     ? text.b_opponent_final.friend53b
                     : text.b_opponent_final.friend53a)
               );
               await renderer.pause(1250);
               vibes.gain.value = 0;
               await state.vars.alphysTalk(alphysBody, ...text.b_opponent_final.friend54);
               await renderer.pause(350);
               await state.vars.torielTalk(torielBody, ...text.b_opponent_final.friend55);
               vibes.gain.modulate(renderer, 1000, vibes.daemon.gain);
               await renderer.pause(1250);
               await state.vars.undyneTalk(undyneBody, ...text.b_opponent_final.friend56());
               await renderer.pause(850);
               await state.vars.torielTalk(torielBody, ...text.b_opponent_final.friend57());
               await state.vars.alphysTalk(alphysBody, ...text.b_opponent_final.friend58);
               await renderer.pause(450);
               await state.vars.undyneTalk(undyneBody, ...text.b_opponent_final.friend59);
               await state.vars.alphysTalk(alphysBody, ...text.b_opponent_final.friend60);
               await state.vars.papyrusTalk(papyrusBody, ...text.b_opponent_final.friend61);
               vibes.gain.modulate(renderer, 3000, 0).then(() => {
                  vibes.stop();
                  content.amToriel.unload();
               });
               await renderer.pause(850);
               await state.vars.undyneTalk(undyneBody, ...text.b_opponent_final.friend62);
               await renderer.pause(450);
               await state.vars.papyrusTalk(papyrusBody, ...text.b_opponent_final.friend63);
               await renderer.pause(650);
               await state.vars.torielTalk(torielBody, ...text.b_opponent_final.friend64);
               await state.vars.undyneTalk(undyneBody, ...text.b_opponent_final.friend65);
               await antifreeze([ part2loader, idL, renderer.pause(300) ]);
               saver.save('c_exit');
               SAVE.flag.n.pacifist_marker = 1;
            } else {
               atlas.navigators.of('battlerAdvanced').objects[0].objects[0].alpha.value = 0;

               atlas.detach(renderer, 'menu', 'battlerAdvanced', 'battlerAdvancedText');
               atlas.switch('battlerSimple');
               SAVE.flag.n.pacifist_marker < 4 && renderer.attach('menu', friendship);
               battler.box.size.set(0);
               battler.box.position.set(160, 280);

               asgoreBody.position.set(30, 120);
               asgore.index = 12;
               friendship.attach(asgoreBody);

               alphysBody.position.set(195, 121);
               alphysBody.scale.x = -1;
               alphysBody.priority.value = 1;
               alphys.index = 28;
               friendship.attach(alphysBody);

               undyneBody.position.set(95, 122);
               undyne.index = 37;
               friendship.attach(undyneBody);

               papyrusBody.position.set(150, 120);
               papyrusBody.priority.value = -1;
               papyrus.index = 21;
               friendship.attach(papyrusBody);

               sans.position.set(242.5, 123);
               sans.priority.value = 1.5;
               sans.index = 1;
               friendship.attach(sans);

               torielBody.position.set(295, 121);
               torielBody.priority.value = 1;
               toriel.index = 3;
               friendship.attach(torielBody);
            }
            const vine = new CosmosSprite({
               anchor: { x: 1, y: 0 },
               scale: { x: 0.25 },
               position: { y: 90 },
               metadata: { active: false, offset: 0 },
               frames: [ content.ibcAsrielGigavine ]
            }).on('tick', function () {
               if (this.metadata.active) {
                  this.offsets[0].set(
                     sineWaver(time + this.metadata.offset, 1500, -5, 5),
                     sineWaver(time + this.metadata.offset, 1500, -2.5, 2.5, 0.75)
                  );
               }
            });
            const motion = new CosmosValue(0.5);
            const shockSprite = (image: CosmosImage) => {
               return new CosmosSprite({
                  anchor: 0,
                  metadata: { a: true, b: Math.random() },
                  frames: [ image ]
               }).on('tick', function () {
                  this.alpha.value = this.metadata.a
                     ? Math.max(sineWaver(time, 1500, -motion.value, motion.value, this.metadata.b), 0)
                     : 0;
                  this.metadata.a = !this.metadata.a;
               });
            };
            const asgoreWrap = new CosmosAnimation({
               anchor: 0,
               position: { x: asgoreBody.position.x, y: 50 },
               resources: content.ibcAsgoreWrap,
               metadata: { a: Math.random(), b: Math.random(), c: Math.random() },
               objects: [ shockSprite(content.ibcAsgoreWrapShock) ]
            });
            const undyneWrap = new CosmosAnimation({
               anchor: 0,
               active: true,
               position: { y: -13.5 },
               resources: content.ibcUndyneWrapped
            });
            const undyneWrapHair = new CosmosAnimation({
               active: true,
               anchor: { x: 0, y: 1 },
               position: { y: 44 },
               resources: content.ibcUndyneHair
            });
            const undyneWrapBody = new CosmosAnimation({
               anchor: 0,
               active: true,
               position: { x: undyneBody.position.x + 10, y: 77 },
               resources: content.ibcUndyneWrap,
               metadata: { a: Math.random(), b: Math.random(), c: Math.random() },
               objects: [
                  undyneWrapHair,
                  undyneWrap,
                  shockSprite(content.ibcUndyneWrapShock)
               ]
            });
            const papyrusWrap = new CosmosAnimation({
               anchor: 0,
               position: { x: papyrusBody.position.x, y: 58 },
               resources: content.ibcPapyrusWrap,
               metadata: { a: Math.random(), b: Math.random(), c: Math.random() },
               objects: [ shockSprite(content.ibcPapyrusWrapShock) ]
            });
            const alphysWrap = new CosmosAnimation({
               anchor: 0,
               position: { x: alphysBody.position.x, y: 52 },
               resources: content.ibcAlphysWrap,
               metadata: { a: Math.random(), b: Math.random(), c: Math.random() },
               objects: [ shockSprite(content.ibcAlphysWrapShock) ]
            });
            const sansWrap = new CosmosAnimation({
               anchor: 0,
               position: { x: sans.position.x, y: 57 },
               resources: content.ibcSansWrap,
               metadata: { a: Math.random(), b: Math.random(), c: Math.random() },
               objects: [ shockSprite(content.ibcSansWrapShock) ]
            });
            const torielWrap = new CosmosAnimation({
               anchor: 0,
               position: { x: torielBody.position.x, y: 63 },
               resources: content.ibcTorielWrap,
               metadata: { a: Math.random(), b: Math.random(), c: Math.random() },
               objects: [ shockSprite(content.ibcTorielWrapShock) ]
            });

            speech.emoters.asgore = asgoreWrap;
            speech.emoters.alphys = alphysWrap;
            speech.emoters.undyne = undyneWrap;
            speech.emoters.papyrus = papyrusWrap;
            speech.emoters.sans = sansWrap;
            speech.emoters.toriel = torielWrap;

            const sy = new CosmosValue();
            const twinkly = new CosmosSprite({ index: 6, position: { x: 160 }, priority: 99999999999 })
               .on('tick', function () {
                  this.position.y = 260 - sy.value;
                  this.offsets[0].y = sineWaver(time, 2500, 0, 5);
               })
               .on('tick', faceTicker('twinkly'));
            speech.emoters.twinkly = twinkly;

            const twinklyLaugh = speech.presets.of('twinkly').faces[4]!;

            let godLoader = void 0 as void | Promise<void>;

            if (SAVE.flag.n.pacifist_marker < 2) {
               const epicLoader = content.amDontgiveup.load();
               const part3loader = azAssets3.load();

               renderer.attach('menu', vine);
               sounds.swing.instance(renderer);
               await Promise.all([
                  vine.scale.modulate(renderer, 750, { x: 1 }),
                  vine.position.modulate(renderer, 750, { x: 330 }),
                  ...[
                     [ asgoreBody, asgore ],
                     [ undyneBody, undyne ],
                     [ papyrusBody, papyrus ],
                     [ alphysBody, alphys ],
                     [ sans, sans ],
                     [ torielBody, toriel ]
                  ].map(async ([ body, head ], index) => {
                     await renderer.when(() => body.position.x <= vine.position.x);
                     if (index === 0) {
                        const crown = new CosmosSprite({
                           anchor: 0,
                           velocity: { x: 1, y: -3 },
                           gravity: { y: 0.5 },
                           frames: [ content.ibcAsgoreCrown ],
                           position: { x: body.position.x, y: body.position.y - 96 },
                           spin: 3,
                           priority: 2000
                        }).on('tick', function () {
                           screenCheck(this, 20) && renderer.detach('menu', crown);
                        });
                        renderer.attach('menu', crown);
                     }
                     head.index = [ 22, 39, 35, 53, 1, 2 ][index];
                     sounds.strike.instance(renderer);
                     await dropShake(body.position, false);
                  })
               ]);
               await renderer.pause(2000);
               fd.alpha.value = 0;
               renderer.attach('menu', fd);
               await fd.alpha.modulate(renderer, 500, 1);
               renderer.detach('menu', friendship);
               await Promise.all([ idL, renderer.pause(500) ]);
               friendship.detach(asgoreBody, undyneBody, papyrusBody, alphysBody, sans, torielBody);

               vine.position.y = 60;
               vine.metadata.active = true;
               for (const object of [ asgoreWrap, undyneWrapBody, papyrusWrap, alphysWrap, sansWrap, torielWrap ]) {
                  object.on('tick', function () {
                     if (vine.metadata.active) {
                        this.offsets[0].set(
                           sineWaver(time + vine.metadata.offset, 500, -motion.value, motion.value, this.metadata.a),
                           sineWaver(
                              time + vine.metadata.offset,
                              2000,
                              motion.value * -10,
                              motion.value * 10,
                              this.metadata.b
                           )
                        );
                        this.tint = CosmosImageUtils.gradient(
                           0xffffff,
                           0xff7f7f,
                           sineWaver(time + vine.metadata.offset, 1500, 0, motion.value, this.metadata.c)
                        );
                     }
                  });
                  friendship.attach(object);
               }
               renderer.attach('menu', vine, friendship);
               sounds.shatter.instance(renderer);
               await fd.alpha.modulate(renderer, 500, 0);
               renderer.detach('menu', fd);
               await renderer.pause(2000);
               renderer.attach('menu', twinkly);
               await sy.modulate(renderer, 800, 100, 100, 100);
               barrierPower.value = 0;
               const idiot = music.idiot.instance(renderer);
               //                        60 / BPM  * beats (16 bars * 3, due to 3/4 time signature)
               idiot.source!.loopStart = (60 / 140) * 16 * 3;
               idiot.source!.loopEnd = (60 / 140) * 32 * 3;
               await state.vars.twinklyTalk(twinkly, ...text.b_opponent_final.friend66());
               twinkly.index = 4;
               twinklyLaugh.enable();
               await sounds.twinklyLaugh.instance(renderer).on('stop');
               twinklyLaugh.reset();
               await renderer.pause(1000);
               twinkly.index = 6;
               await state.vars.twinklyTalk(
                  twinkly,
                  ...text.b_opponent_final.friend67(SAVE.flag.s.neutral_unique.split(','))
               );
               await sy.modulate(renderer, 800, sy.value, sy.value, 0);
               twinkly.position.x = 270;
               await sy.modulate(renderer, 800, 90, 90, 90);
               await antifreeze([ part3loader, renderer.pause(1000) ]);
               idiot.stop();
               content.amIdiot.unload();
               godLoader = opponents.asriel.assets.load();
               battler.box.size.set(12);
               battler.box.position.set(160);
               battler.SOUL.position.set(160);
               battler.SOUL.alpha.value = 1;
               game.movement = true;
               sounds.landing.instance(renderer);
               const lev = new CosmosValue(2);
               const ranpos = () => {
                  const x = Math.random();
                  const y = Math.random();
                  battler.box.offsets[0].set(x, y);
                  battler.SOUL.offsets[0].set(x, y);
               };
               renderer.on('tick', ranpos);
               await lev.modulate(renderer, 300, 0);
               renderer.off('tick', ranpos);
               battler.box.offsets[0].set(0);
               battler.SOUL.offsets[0].set(0);
               await renderer.pause(1500);
               const r1 = commonPatterns.twinkly.ring();
               await renderer.pause(2000);
               battler.SOUL.alpha.value = 0;
               game.movement = false;
               await state.vars.twinklyTalk(twinkly, ...text.b_opponent_final.friend68);
               battler.SOUL.alpha.value = 1;
               game.movement = true;
               twinkly.index = 4;
               twinklyLaugh.enable();

               const da = Math.floor(SAVE.data.n.hp / 4);
               const i1 = sounds.twinklyLaugh.instance(renderer);
               r1.modulate(renderer, 500, 0).then(() => {
                  battler.invulnerable = 0;
                  battler.damage(da, 0, false);
                  r1.modulate(renderer, 500 * 10, 10);
               });
               await renderer.pause(250);
               const r2 = commonPatterns.twinkly.ring(-90);
               await renderer.pause(1500 - 250);

               i1.stop();
               const i2 = sounds.twinklyLaugh.instance(renderer);
               r2.modulate(renderer, 500, 0).then(() => {
                  battler.invulnerable = 0;
                  battler.damage(da, 0, false);
                  r2.modulate(renderer, 500 * 10, 10);
               });
               await renderer.pause(250);
               const r3 = commonPatterns.twinkly.ring();
               await renderer.pause(1500 - 250);

               i2.stop();
               const i3 = sounds.twinklyLaugh.instance(renderer);
               r3.modulate(renderer, 500, 0).then(() => {
                  battler.invulnerable = 0;
                  battler.damage(da, 0, false);
                  r3.modulate(renderer, 500 * 10, 10);
               });
               await renderer.pause(250);
               const r4 = commonPatterns.twinkly.ring(-90);
               await renderer.pause(1500 - 250);

               i3.stop();
               sounds.twinklyLaugh.instance(renderer);
               r4.modulate(renderer, 500, 0).then(() => {
                  battler.invulnerable = 0;
                  battler.damage(SAVE.data.n.hp - 1, 0, false);
                  r4.modulate(renderer, 500 * 10, 10);
               });
               await renderer.pause(250);
               const r5 = commonPatterns.twinkly.ring(90, 2000, 1.5, true);
               await renderer.pause(3000 - 250);

               await r5.modulate(renderer, 3500, 0.3);
               r5.value = 0.3;
               motion.modulate(renderer, 2000, 0.05);
               await renderer.pause(1000);
               twinklyLaugh.reset();
               await renderer.pause(1500);
               battler.SOUL.alpha.value = 0;
               game.movement = false;
               await state.vars.twinklyTalk(twinkly, ...text.b_opponent_final.friend69);
               battler.SOUL.alpha.value = 1;
               game.movement = true;
               await antifreeze([ epicLoader, renderer.pause(1500) ]);
               SAVE.flag.n.pacifist_marker = 2;
            } else {
               SAVE.flag.n.pacifist_marker < 4 && renderer.attach('menu', vine);
               vine.scale.x = 1;
               vine.position.x = 330;
               renderer.detach('menu', friendship);
               friendship.detach(asgoreBody, undyneBody, papyrusBody, alphysBody, sans, torielBody);

               vine.position.y = 60;
               vine.metadata.active = true;
               for (const object of [ asgoreWrap, undyneWrapBody, papyrusWrap, alphysWrap, sansWrap, torielWrap ]) {
                  object.on('tick', function () {
                     if (vine.metadata.active) {
                        this.offsets[0].set(
                           sineWaver(time + vine.metadata.offset, 500, -motion.value, motion.value, this.metadata.a),
                           sineWaver(
                              time + vine.metadata.offset,
                              2000,
                              motion.value * -10,
                              motion.value * 10,
                              this.metadata.b
                           )
                        );
                        this.tint = CosmosImageUtils.gradient(
                           0xffffff,
                           0xff7f7f,
                           sineWaver(time + vine.metadata.offset, 1500, 0, motion.value, this.metadata.c)
                        );
                     }
                  });
                  friendship.attach(object);
               }
               SAVE.flag.n.pacifist_marker < 4 && renderer.attach('menu', vine, friendship, twinkly);
               twinkly.index = 8;
               twinkly.position.x = 270;
               sy.value = 90;
               battler.box.size.set(12);
               battler.box.position.set(160);
               battler.SOUL.position.set(160);
               game.movement = true;
               SAVE.data.n.hp = 1;
               motion.value = 0.05;
               battler.SOUL.alpha.value = 1;
               SAVE.flag.n.pacifist_marker === 2 && (await renderer.on('tick'));
            }

            const bubbleGen = (position: CosmosPoint, bubble: 0 | 1 | 2, wordz: CosmosProvider<string>) => {
               return new CosmosObject({
                  position,
                  objects: [
                     new CosmosSprite({
                        frames: [ bubble === 2 ? content.ibuBubbleDGU2 : content.ibuBubbleDGU1 ],
                        scale: { x: bubble === 1 ? -0.5 : 0.5, y: 0.5 },
                        anchor: bubble === 2 ? { x: 0, y: -1 } : -1
                     }),
                     new CosmosText({
                        fill: 0,
                        position: { x: [ 5.5, -39.5, -17 ][bubble], y: 2.5 },
                        spacing: { x: -2 }
                     }).on('tick', function () {
                        this.fontFamily = speech.state.fontFamily2;
                        this.fontSize = speech.state.fontSize2;
                        this.content = CosmosUtils.provide(wordz);
                     })
                  ]
               });
            };

            const blcons1spawn = (fast = false) =>
               Promise.all([
                  (async () => {
                     fast || (await renderer.pause(200));
                     const spr = new CosmosAnimation({
                        position: { x: 310, y: 140 },
                        anchor: { x: 0, y: 1 },
                        resources: content.ibcKiddBody,
                        index: 10
                     });
                     SAVE.flag.n.pacifist_marker < 4 && renderer.attach('menu', spr);
                     const blcon = bubbleGen(new CosmosPoint(236, 80), 0, text.b_opponent_final.friend76);
                     if (!fast) {
                        const x = spr.position.x;
                        spr.position.x += 60;
                        await spr.position.step(renderer, 3, { x });
                        renderer.attach('menu', blcon);
                        await renderer.pause(300);
                        heal(1);
                     }
                     return [ blcon, spr, 0 ];
                  })(),
                  (async () => {
                     fast || (await renderer.pause(500));
                     const spr = new CosmosAnimation({
                        position: { x: 322, y: 180 },
                        anchor: { x: 0, y: 1 },
                        resources: content.ibcPerigeeBody,
                        active: true
                     });
                     SAVE.flag.n.pacifist_marker < 4 && renderer.attach('menu', spr);
                     const blcon = bubbleGen(new CosmosPoint(248, 135), 0, text.b_opponent_final.friend77);
                     if (!fast) {
                        const x = spr.position.x;
                        spr.position.x += 60;
                        await spr.position.step(renderer, 3, { x });
                        renderer.attach('menu', blcon);
                        await renderer.pause(300);
                        heal(1);
                     }
                     return [ blcon, spr, 1 ];
                  })(),
                  (async () => {
                     fast || (await renderer.pause(800));
                     const spr = new CosmosSprite({
                        anchor: { x: 0, y: 1 },
                        position: { x: 306, y: 220 },
                        frames: [ content.ibcWoshuaHanger ],
                        objects: [
                           new CosmosSprite({
                              anchor: { x: 0, y: 1 },
                              position: { x: -1 },
                              frames: [ content.ibcWoshuaDuck ],
                              metadata: { dis: false }
                           }).on('tick', function () {
                              this.metadata.dis || (this.position.y = sawWaver(time, 4000, -2, 2));
                           }),
                           new CosmosSprite({
                              metadata: { dis: false },
                              anchor: { x: 0, y: 1 },
                              frames: [ content.ibcWoshuaWater ]
                           }).on('tick', function () {
                              if (!this.metadata.dis) {
                                 this.position.x = sineWaver(time, 2500, -2, 2);
                                 this.position.y = sineWaver(time, 2500 / 2, -1, 1);
                              }
                           }),
                           new CosmosSprite({
                              anchor: { x: 0, y: 1 },
                              frames: [ content.ibcWoshuaWater ],
                              metadata: { dis: false }
                           }).on('tick', function () {
                              if (!this.metadata.dis) {
                                 this.position.x = sineWaver(time, 2500, 2, -2);
                                 this.position.y = sineWaver(time, 2500 / 2, 1, -1);
                              }
                           }),
                           new CosmosAnimation({
                              active: true,
                              anchor: { x: 0, y: 1 },
                              resources: content.ibcWoshuaTail
                           }),
                           new CosmosSprite({ anchor: { x: 0, y: 1 }, frames: [ content.ibcWoshuaBody ] }),
                           new CosmosSprite({
                              anchor: { x: 0, y: 1 },
                              frames: [ content.ibcWoshuaHead ],
                              metadata: { dis: false }
                           }).on('tick', function () {
                              this.metadata.dis || (this.position.y = sawWaver(time, 2250, 1.5, -1.5));
                           }),
                           new CosmosSprite({
                              anchor: { x: 0, y: 1 },
                              frames: [ content.ibcWoshuaFace ],
                              metadata: { dis: false }
                           }).on('tick', function () {
                              this.metadata.dis || (this.position.y = -1 + sawWaver(time, 2250, -1.5, 1.5));
                           })
                        ]
                     });
                     SAVE.flag.n.pacifist_marker < 4 && renderer.attach('menu', spr);
                     const blcon = bubbleGen(new CosmosPoint(224, 176), 0, text.b_opponent_final.friend78);
                     if (!fast) {
                        const x = spr.position.x;
                        spr.position.x += 60;
                        await spr.position.step(renderer, 3, { x });
                        renderer.attach('menu', blcon);
                        await renderer.pause(300);
                        heal(1);
                     }
                     return [ blcon, spr, 2 ];
                  })()
               ]) as Promise<[CosmosObject, CosmosSprite, number][]>;

            const vars = { face: 9 };
            const blcons2spawn = (fast = false) =>
               Promise.all([
                  (async () => {
                     fast || (await renderer.pause(200));
                     const spr = commonOpponents.maddummy.sprite({ container: { position: { y: 0 } }, vars } as any);
                     spr.offsets[0].set(15, 120);
                     spr.scale.x = -1;
                     SAVE.flag.n.pacifist_marker < 4 && renderer.attach('menu', spr);
                     const blcon = bubbleGen(new CosmosPoint(90, 65), 1, text.b_opponent_final.friend79);
                     if (!fast) {
                        const x = spr.offsets[0].x;
                        spr.offsets[0].x -= 60;
                        await spr.offsets[0].step(renderer, 3, { x });
                        renderer.attach('menu', blcon);
                        await renderer.pause(300);
                        heal(1);
                     }
                     return [ blcon, spr, 3 ];
                  })(),
                  (async () => {
                     fast || (await renderer.pause(500));
                     const spr = new CosmosAnimation({
                        anchor: { y: 1, x: 0 },
                        resources: content.ibcShyrenBattleAgent,
                        position: { x: 2, y: 188 },
                        scale: { x: -1 },
                        index: 0,
                        metadata: { dis: false },
                        objects: [
                           new CosmosAnimation({
                              active: true,
                              anchor: { y: 1 },
                              position: { x: -19.5, y: -45 },
                              resources: content.ibcShyrenBattleFront
                           })
                        ]
                     }).on('tick', function () {
                        this.metadata.dis || (this.offsets[0].y = sineWaver(time, 4000, 0, -4));
                     });
                     SAVE.flag.n.pacifist_marker < 4 && renderer.attach('menu', spr);
                     const blcon = bubbleGen(new CosmosPoint(77, 105), 1, text.b_opponent_final.friend80);
                     if (!fast) {
                        const x = spr.position.x;
                        spr.position.x -= 60;
                        await spr.position.step(renderer, 3, { x });
                        renderer.attach('menu', blcon);
                        await renderer.pause(300);
                        heal(1);
                     }
                     return [ blcon, spr, 4 ];
                  })(),
                  (async () => {
                     fast || (await renderer.pause(800));
                     const spr = new CosmosAnimation({
                        active: true,
                        anchor: { x: 0, y: 1 },
                        position: { x: 14, y: 220 },
                        resources: content.ibcDummyFinalghost,
                        scale: { x: -1 },
                        metadata: { dis: false }
                     }).on('tick', function () {
                        this.metadata.dis || (this.offsets[0].y = sineWaver(time, 4000, 0, -4, 1 / 3));
                     });
                     SAVE.flag.n.pacifist_marker < 4 && renderer.attach('menu', spr);
                     const blcon = bubbleGen(new CosmosPoint(96, 145), 1, text.b_opponent_final.friend81);
                     if (!fast) {
                        const x = spr.position.x;
                        spr.position.x -= 60;
                        await spr.position.step(renderer, 3, { x });
                        renderer.attach('menu', blcon);
                        await renderer.pause(300);
                        heal(1);
                     }
                     return [ blcon, spr, 5 ];
                  })()
               ]) as Promise<[CosmosObject, CosmosSprite, number][]>;

            const blcons3spawn = (fast = false) =>
               Promise.all([
                  (async () => {
                     fast || (await renderer.pause(200));
                     const spr = new CosmosSprite({
                        position: { x: 162, y: 300 },
                        objects: [
                           new CosmosSprite({
                              frames: [ content.ibcKnightknightArmstaff ],
                              position: { x: -77, y: -85 }
                           }),
                           new CosmosAnimation({
                              active: true,
                              anchor: 0,
                              position: { x: -77 + 8, y: -85 + 62 },
                              resources: content.ibcKnightknightArmball
                           }),
                           new CosmosSprite({
                              anchor: { x: 0, y: 1 },
                              frames: [ content.ibcKnightknightBase ]
                           }),
                           new CosmosAnimation({
                              active: true,
                              position: { x: -18, y: -66 },
                              resources: content.ibcKnightknightEyes
                           }),
                           new CosmosAnimation({
                              active: true,
                              position: { x: -28, y: -55 },
                              resources: content.ibcKnightknightDragonfur
                           }),
                           new CosmosAnimation({
                              position: { x: -23, y: -111 },
                              metadata: { dis: false, blinkTimer: null as number | null },
                              resources: content.ibcKnightknightHeadpiece
                           }).on('tick', function () {
                              if (!this.metadata.dis) {
                                 if (this.active) {
                                    this.index === 2 && this.reset();
                                 } else if (this.metadata.blinkTimer === null) {
                                    this.metadata.blinkTimer = renderer.time + (2 + Math.random() * 5) * 1000;
                                 } else if (renderer.time > this.metadata.blinkTimer) {
                                    this.metadata.blinkTimer = null;
                                    this.enable();
                                 }
                              }
                           }),
                           new CosmosAnimation({
                              active: true,
                              position: { x: -12, y: -60 },
                              resources: content.ibcKnightknightMouthpiece
                           })
                        ]
                     });
                     SAVE.flag.n.pacifist_marker < 4 && renderer.attach('menu', spr);
                     const blcon = bubbleGen(new CosmosPoint(spr.position.x, 149), 2, text.b_opponent_final.friend82);
                     if (!fast) {
                        const y = spr.position.y;
                        spr.position.y += 120;
                        await spr.position.step(renderer, 3, { y });
                        battler.SOUL.alpha.value = 0;
                        renderer.attach('menu', blcon);
                        await renderer.pause(300);
                        heal(1);
                     }
                     return [ blcon, spr, 6 ];
                  })(),
                  (async () => {
                     fast || (await renderer.pause(500));
                     const spr = new CosmosAnimation({
                        anchor: { x: 0, y: 1 },
                        position: { x: 227, y: 298 },
                        resources: content.ibcBurgerpantsBody,
                        index: 13
                     });
                     SAVE.flag.n.pacifist_marker < 4 && renderer.attach('menu', spr);
                     const blcon = bubbleGen(new CosmosPoint(spr.position.x, 136), 2, text.b_opponent_final.friend83);
                     if (!fast) {
                        const y = spr.position.y;
                        spr.position.y += 120;
                        await spr.position.step(renderer, 3, { y });
                        renderer.attach('menu', blcon);
                        await renderer.pause(300);
                        heal(1);
                     }
                     return [ blcon, spr, 7 ];
                  })(),
                  (async () => {
                     fast || (await renderer.pause(800));
                     const spr = new CosmosAnimation({
                        active: true,
                        anchor: { x: 0, y: 1 },
                        scale: 0.5,
                        extrapolate: false,
                        duration: 5,
                        position: { x: 96, y: 298 },
                        resources: content.ibcDogeTail,
                        objects: [
                           new CosmosAnimation({
                              active: true,
                              anchor: { x: 0, y: 1 },
                              position: { x: -2 },
                              duration: 22,
                              extrapolate: false,
                              resources: content.ibcDoge
                           })
                        ]
                     });
                     SAVE.flag.n.pacifist_marker < 4 && renderer.attach('menu', spr);
                     const blcon = bubbleGen(new CosmosPoint(spr.position.x, 158), 2, text.b_opponent_final.friend84);
                     if (!fast) {
                        const y = spr.position.y;
                        spr.position.y += 120;
                        await spr.position.step(renderer, 3, { y });
                        renderer.attach('menu', blcon);
                        await renderer.pause(300);
                        heal(1);
                     }
                     return [ blcon, spr, 8 ];
                  })(),
                  (async () => {
                     fast || (await renderer.pause(1100));
                     const spr = new CosmosSprite({
                        position: { x: 273, y: 237 },
                        objects: [
                           ...CosmosUtils.populate(6, index =>
                              new CosmosAnimation({
                                 anchor: { x: 0 },
                                 index,
                                 resources: content.ibcPyropeRing,
                                 metadata: { dis: false }
                              }).on('tick', function () {
                                 if (!this.metadata.dis) {
                                    const d = -8 - (index + 0.5) * 1.5;
                                    this.offsets[0].y = -Math.abs(sineWaver(time, 2000, d, -d, -0.05 - index * 0.005));
                                 }
                              })
                           ),
                           ...CosmosUtils.populate(2, index =>
                              new CosmosSprite({
                                 anchor: new CosmosPoint(5.5, 5).divide(22, 13).multiply(2).subtract(1),
                                 scale: { x: [ 1, -1 ][index] },
                                 position: { x: 6.5 * [ 1, -1 ][index], y: 43 },
                                 frames: [ content.ibcPyropeDrip ],
                                 metadata: { dis: false }
                              }).on('tick', function () {
                                 if (!this.metadata.dis) {
                                    this.offsets[0].y = -Math.abs(sineWaver(time, 2000, -8, 8));
                                    this.rotation.value = Math.abs(sineWaver(time, 2000, 25, -25)) * this.scale.x;
                                 }
                              })
                           ),
                           new CosmosAnimation({
                              active: true,
                              anchor: 0,
                              position: { y: -16 },
                              resources: content.ibcPyropeHead,
                              metadata: { dis: false }
                           }).on('tick', function () {
                              if (!this.metadata.dis) {
                                 const d = -8 - 6.5 * 1.5;
                                 this.offsets[0].y = -Math.abs(sineWaver(time, 2000, d, -d, -0.05 - 6.5 * 0.005));
                                 this.rotation.value = sineWaver(time, 2000 / 1.5, -4, 4, 1 / 8);
                              }
                           })
                        ]
                     });
                     SAVE.flag.n.pacifist_marker < 4 && renderer.attach('menu', spr);
                     const blcon = bubbleGen(new CosmosPoint(spr.position.x, 160), 2, text.b_opponent_final.friend85);
                     if (!fast) {
                        const y = spr.position.y;
                        spr.position.y += 120;
                        await spr.position.step(renderer, 3, { y });
                        renderer.attach('menu', blcon);
                        await renderer.pause(300);
                        heal(1);
                     }
                     return [ blcon, spr, 9 ];
                  })(),
                  (async () => {
                     fast || (await renderer.pause(1400));
                     const spr = SAVE.data.b.spared_jerry
                        ? new CosmosAnimation({
                             active: true,
                             position: { x: 49, y: 243 },
                             anchor: { y: 1, x: 0 },
                             resources: content.ibcJerryMain
                          })
                        : new CosmosAnimation({
                             active: true,
                             anchor: { y: 1, x: 0 },
                             metadata: { dis: false, size: { y: 55 } },
                             position: { x: 49, y: 243 },
                             resources: content.ibcFroggitLegs,
                             objects: [
                                new CosmosAnimation({
                                   active: true,
                                   position: { x: -2, y: -20 },
                                   anchor: { y: 1, x: 0 },
                                   metadata: { dis: false, dir: 0 },
                                   resources: content.ibcFroggitHead
                                }).on('tick', function () {
                                   if (!this.metadata.dis) {
                                      const destie = this.position.endpoint(this.metadata.dir * 90 + 45, 1 / 20);
                                      if (destie.extentOf({ x: -2, y: -20 }) > 1.5 + (Math.random() - 0.5) * 2 * 1) {
                                         if (this.metadata.dir++ === 3) {
                                            this.metadata.dir = 0;
                                         }
                                      } else {
                                         this.position = destie;
                                      }
                                   }
                                })
                             ]
                          }).on('tick', function () {
                             if (!this.metadata.dis && this.index === 0 && Math.random() < 1 / 30 / 10) {
                                this.index = 1;
                                renderer.pause(650).then(() => {
                                   this.index = 0;
                                });
                             }
                          });
                     SAVE.flag.n.pacifist_marker < 4 && renderer.attach('menu', spr);
                     const blcon = bubbleGen(
                        new CosmosPoint(spr.position.x, SAVE.data.b.spared_jerry ? 147 : 151),
                        2,
                        [ text.b_opponent_final.friend86a, text.b_opponent_final.friend86b ][
                           SAVE.data.b.spared_jerry ? 1 : 0
                        ]
                     );
                     if (!fast) {
                        const y = spr.position.y;
                        spr.position.y += 120;
                        await spr.position.step(renderer, 3, { y });
                        renderer.attach('menu', blcon);
                        await renderer.pause(300);
                        heal(1);
                     }
                     return [ blcon, spr, 10 ];
                  })()
               ]) as Promise<[CosmosObject, CosmosSprite, number][]>;

            let totalgroup: [CosmosObject, CosmosSprite, number][],
               iLoveHandlingTimeOriginBasedSineWaversThatCantBePausedOrElseIHaveToAddAnOffsetDifferenceTrackerLikeThisOne: number;

            const nextScript = () => {
               game.movement = false;
               twinkly.index = 2;
               speech.presets.of('twinkly').faces[2]!.reset();
               content.amDontgiveup.unload();
               fd.fill = 0;
               fd.alpha.value = 0.8;
               fd.priority.value = 9999999999;
               SAVE.flag.n.pacifist_marker < 4 && renderer.attach('menu', fd);
               for (const entry of totalgroup) {
                  const [ blcon, spr, id ] = entry;
                  switch (id) {
                     case 1:
                        spr.disable();
                        break;
                     case 2:
                     case 6:
                        for (const obj of spr.objects) {
                           (obj as CosmosSprite).disable();
                           if (obj.metadata.dis === false) {
                              obj.metadata.dis = true;
                           }
                        }
                        break;
                     case 3:
                        spr.events.tick!.handlers = [];
                        break;
                     case 4:
                        spr.metadata.dis = true;
                        (spr.objects[0] as CosmosSprite).disable();
                        break;
                     case 5:
                        spr.metadata.dis = true;
                        spr.disable();
                        break;
                     case 8:
                        spr.disable();
                        (spr.objects[0] as CosmosSprite).disable();
                        break;
                     case 9:
                        for (const obj of spr.objects) {
                           (obj as CosmosSprite).disable();
                           obj.metadata.dis = true;
                        }
                        break;
                     case 10:
                        spr.disable();
                        if (!SAVE.data.b.spared_jerry) {
                           spr.metadata.dis = true;
                           (spr.objects[0] as CosmosSprite).disable();
                           (spr.objects[0] as CosmosSprite).metadata.dis = true;
                        }
                        break;
                  }
               }
               undyneWrapBody.disable();
               undyneWrapHair.disable();
               vine.metadata.active = false;
            };

            if (SAVE.flag.n.pacifist_marker < 3) {
               const epic = music.dontgiveup.instance(renderer);
               epic.source!.loopStart = (60 / 117) * 48 * 3;
               epic.source!.loopEnd = (60 / 117) * 64 * 3;
               await state.vars.asgoreTalk(
                  asgoreWrap.position.add(0, asgoreWrap.compute().y / 2),
                  ...text.b_opponent_final.friend70
               );
               heal(1);
               await renderer.pause(500);
               twinkly.index = 2;
               await commonPatterns.twinkly.row(1, 0);
               await commonPatterns.twinkly.row(-1, 1);
               twinkly.index = 12;
               await renderer.pause(500);
               await state.vars.papyrusTalk(
                  papyrusWrap.position.add(0, papyrusWrap.compute().y / 2),
                  ...text.b_opponent_final.friend71
               );
               heal(1);
               undyneWrap.disable();
               undyneWrap.use(content.ibcUndyneHead);
               undyneWrap.index = 11;
               await state.vars.undyneTalk(
                  undyneWrapBody.position.add(0, undyneWrapBody.compute().y / 2),
                  ...text.b_opponent_final.friend72
               );
               heal(1);
               await renderer.pause(500);
               twinkly.index = 2;
               await commonPatterns.twinkly.row(1, 2);
               await commonPatterns.twinkly.row(-1, 3);
               twinkly.index = 18;
               await renderer.pause(500);
               await state.vars.sansTalk(
                  sansWrap.position.add(0, sansWrap.compute().y / 2),
                  ...text.b_opponent_final.friend73
               );
               heal(1);
               await state.vars.alphysTalk(
                  alphysWrap.position.add(0, alphysWrap.compute().y / 2),
                  ...text.b_opponent_final.friend74
               );
               heal(1);
               await renderer.pause(1500);
               twinkly.index = 17;
               await state.vars.torielTalk(
                  torielWrap.position.add(0, torielWrap.compute().y / 2),
                  ...text.b_opponent_final.friend75
               );
               heal(1);
               const blcons1 = blcons1spawn();
               await renderer.pause(500);
               await sy.modulate(renderer, 800, sy.value, sy.value, 0);
               twinkly.position.x = 50;
               twinkly.index = 15;
               await renderer.pause(1000);
               await sy.modulate(renderer, 800, 90, 90, 90);
               await renderer.pause(500);
               const blcons1value = await blcons1;
               for (const [ blcon ] of blcons1value) {
                  renderer.detach('menu', blcon);
               }
               heal(1);
               const blcons2 = blcons2spawn();
               await renderer.pause(500);
               await sy.modulate(renderer, 800, sy.value, sy.value, 0);
               twinkly.position.x = 160;
               twinkly.index = 16;
               await renderer.pause(1000);
               await sy.modulate(renderer, 800, 145, 145, 145);
               await renderer.pause(500);
               const blcons2value = await blcons2;
               for (const [ blcon ] of blcons2value) {
                  renderer.detach('menu', blcon);
               }
               heal(1);
               const blcons3 = blcons3spawn();
               await renderer.pause(500 + 800 + 3000 + 800 + 500);
               const blcons3value = await blcons3;
               for (const [ blcon ] of blcons3value) {
                  renderer.detach('menu', blcon);
               }
               battler.SOUL.alpha.value = 1;
               await state.vars.twinklyTalk(twinkly, ...text.b_opponent_final.friend87);
               await renderer.pause(1000);
               epic.stop();
               totalgroup = [ ...blcons1value, ...blcons2value, ...blcons3value ];
               sounds.noise.instance(renderer);
               nextScript();
               iLoveHandlingTimeOriginBasedSineWaversThatCantBePausedOrElseIHaveToAddAnOffsetDifferenceTrackerLikeThisOne =
                  renderer.time;
               await renderer.pause(1500);
               SAVE.flag.n.pacifist_marker = 3;
            } else {
               asgoreWrap.index = 2;
               papyrusWrap.index = 2;
               undyneWrap.disable();
               undyneWrap.use(content.ibcUndyneHead);
               undyneWrap.index = 13;
               sansWrap.index = 2;
               alphysWrap.index = 2;
               torielWrap.index = 3;
               twinkly.position.x = 160;
               sy.value = 145;
               battler.SOUL.alpha.value = 1;
               SAVE.data.n.hp = 20;
               totalgroup = (await Promise.all([ blcons1spawn(true), blcons2spawn(true), blcons3spawn(true) ])).flat();
               nextScript();
               iLoveHandlingTimeOriginBasedSineWaversThatCantBePausedOrElseIHaveToAddAnOffsetDifferenceTrackerLikeThisOne =
                  renderer.time;
               SAVE.flag.n.pacifist_marker === 3 && (await renderer.on('tick'));
            }

            const him = new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               position: { x: 160, y: 120 },
               resources: content.ibcAsrielCutscene1full
            });

            if (SAVE.flag.n.pacifist_marker < 4) {
               const container = new CosmosObject({
                  priority: 9999999999,
                  position: twinkly.position.add(25, -30),
                  objects: [ battler.bubbles.twinkly() ]
               });
               atlas.switch('dialoguerBase');
               renderer.attach('menu', container);
               await dialogue_primitive(...text.b_opponent_final.friend88);
               vine.metadata.active = true;
               vine.metadata.offset =
                  renderer.time -
                  iLoveHandlingTimeOriginBasedSineWaversThatCantBePausedOrElseIHaveToAddAnOffsetDifferenceTrackerLikeThisOne;
               undyneWrapBody.enable();
               undyneWrapHair.enable();
               atlas.switch(null);
               renderer.detach('menu', container);
               asgoreWrap.index = 3;
               undyneWrap.index = 39;
               papyrusWrap.index = 3;
               alphysWrap.index = 3;
               sansWrap.index = 3;
               torielWrap.index = 4;
               fd.fill = 0xffffff;
               fd.alpha.value = 0;
               fd.priority.value = 999999999999;
               const sh = new CosmosValue();
               for (const entry of totalgroup) {
                  const [ blcon, spr, id ] = entry;
                  renderer.detach('menu', spr);
                  switch (id) {
                     case 0:
                        renderer.attach('menu', spr);
                        spr.index = 11;
                        break;
                     case 1:
                        renderer.attach(
                           'menu',
                           (entry[1] = new CosmosSprite({
                              anchor: { x: 0, y: 1 },
                              frames: [ content.ibcPerigeeHurt ],
                              position: spr
                           }))
                        );
                        break;
                     case 2:
                        renderer.attach(
                           'menu',
                           (entry[1] = new CosmosSprite({
                              anchor: { x: 0, y: 1 },
                              frames: [ content.ibcWoshuaHurt ],
                              position: spr
                           }))
                        );
                        break;
                     case 3:
                        renderer.attach('menu', spr);
                        vars.face = 1;
                        break;
                     case 4:
                        renderer.attach(
                           'menu',
                           (entry[1] = new CosmosSprite({
                              anchor: { y: 1 },
                              frames: [ content.ibcShyrenBattleHurt ],
                              position: spr.position.add(-19.5, -45),
                              objects: [
                                 new CosmosAnimation({
                                    anchor: { y: 1, x: 0 },
                                    position: { x: 19.5, y: 45 },
                                    resources: content.ibcShyrenBattleAgent
                                 })
                              ]
                           }))
                        );
                        break;
                     case 5:
                        renderer.attach('menu', spr);
                        spr.position.step(renderer, 0.5, { x: -40 });
                        break;
                     case 6:
                        renderer.attach(
                           'menu',
                           (entry[1] = new CosmosSprite({
                              anchor: { x: 0, y: 1 },
                              frames: [ content.ibcKnightknightHurt ],
                              position: spr
                           }))
                        );
                        break;
                     case 7:
                        renderer.attach('menu', spr);
                        spr.index = 2;
                        break;
                     case 8:
                        renderer.attach(
                           'menu',
                           (entry[1] = new CosmosSprite({
                              anchor: { x: 0, y: 1 },
                              frames: [ content.ibcDogeHurt ],
                              position: spr
                           }))
                        );
                        break;
                     case 9:
                        renderer.attach(
                           'menu',
                           (entry[1] = new CosmosSprite({
                              anchor: { x: 0, y: 1 },
                              frames: [ content.ibcPyropeHurt ],
                              position: spr.position.add(0, 50)
                           }))
                        );
                        break;
                     case 10:
                        renderer.attach(
                           'menu',
                           (entry[1] = new CosmosSprite({
                              anchor: { y: 1, x: 0 },
                              frames: [ SAVE.data.b.spared_jerry ? content.ibcJerryHurt : content.ibcFroggitGone ],
                              position: spr
                           }))
                        );
                        break;
                  }
                  const baseoff = entry[1].offsets[0].value();
                  entry[1].on('tick', function () {
                     this.offsets[0].set(baseoff.x + Math.random() * sh.value, baseoff.y + Math.random() * sh.value);
                  });
               }
               game.movement = true;
               motion.modulate(renderer, 2000, 1);
               state.vars.twinklyTalk(twinkly, ...text.b_opponent_final.friend89).then(() => {
                  twinkly.index = 4;
                  twinklyLaugh.enable();
                  sounds.twinklyLaugh.instance(renderer);
               });
               const ramper = sounds.destroyed.instance(renderer);
               fd.alpha.modulate(renderer, 15000, 1);
               await Promise.all([ sh.modulate(renderer, 20000, 5), ramper.rate.modulate(renderer, 20000, 3) ]);
               ramper.stop();
               renderer.detach('menu', fd, vine, friendship, twinkly, ...totalgroup.map(entry => entry[1]));
               twinklyLaugh.reset();
               battler.alpha.value = 0;
               battler.SOUL.alpha.value = 0;
               azAssets1.unload();
               azAssets2.unload();
               azAssets3.unload();
               game.movement = false;
               renderer.attach('menu', him);
               if (1 <= SAVE.flag.n.killed_sans) {
                  him.index = 14;
               } else {
                  await renderer.pause(1500);
                  him.enable();
                  await renderer.when(() => him.index === 14);
                  him.disable();
               }
               await renderer.pause(1250);
               SAVE.flag.n.pacifist_marker = 4;
            } else {
               fd.fill = 0xffffff;
               fd.priority.value = 999999999999;
               battler.alpha.value = 0;
               battler.SOUL.alpha.value = 0;
               game.movement = false;
               renderer.attach('menu', him);
               him.index = 14;
               SAVE.flag.n.pacifist_marker === 4 && (await renderer.on('tick'));
            }

            await battler.monster(
               false,
               { x: 180.5, y: 50 },
               battler.bubbles.twinkly,
               ...text.b_opponent_final.friend90()
            );
            him.enable();
            await renderer.when(() => him.index === 18);
            him.disable();
            await antifreeze([ godLoader, renderer.pause(1250) ]);
            await battler.monster(
               false,
               { x: 180.5, y: 50 },
               battler.bubbles.twinkly,
               ...text.b_opponent_final.friend91
            );
            fd.alpha.value = 0;
            renderer.attach('menu', fd);
            await fd.alpha.modulate(renderer, 300, 1);
            renderer.detach('menu', him);
            opponents.final.assets.unload();
            sounds.upgrade.instance(renderer);
            await renderer.pause(300);
            battler.volatile = [];
            battler.add(opponents.asriel, { x: 160, y: 118 });
            renderer.attach('menu', battler.overlay);
            await fd.alpha.modulate(renderer, 300, 0);
            renderer.detach('menu', fd);
            await renderer.pause(1000);
            const megatext = new CosmosText({
               fontFamily: content.fDeterminationMono,
               fontSize: 32,
               fill: 0xffffff,
               anchor: { y: 0 },
               position: { x: 42, y: 160 },
               objects: CosmosUtils.populate(3, index => {
                  const si = index + 2;
                  return new CosmosText({ alpha: 1 / si, anchor: { y: 0 } }).on('tick', function () {
                     this.content = game.text;
                     this.position.set((Math.random() * 2 - 1) * si, (Math.random() * 2 - 1) * si);
                  });
               })
            }).on('tick', function () {
               this.content = game.text;
            });
            renderer.attach('menu', megatext);
            atlas.switch('dialoguerBase');
            await dialogue_primitive(text.b_opponent_final.friend92);
            azSaveInvAndHP(5);
            atlas.switch(null);
            renderer.detach('menu', megatext, battler.overlay);
            game.text = '';
            atlas.detach(renderer, 'menu', 'battlerSimple');
            atlas.switch('battlerAdvanced');
            atlas.attach(renderer, 'menu', 'battlerAdvanced');
            battler.alpha.value = 1;
            battler.box.position.x = 160;
            battler.box.position.y = 160;
            battler.box.size.x = 282.5;
            battler.box.size.y = 65;
            battler.music = music.asrielboss.instance(renderer, 0, true);
            azInitSetup();
            battler.resume();
         }
      }),
      name: () => text.b_opponent_final.name,
      goodbye () {
         return new CosmosSprite({ anchor: { y: 1 }, metadata: { size: { y: 80 } } });
      }
   }),
   finalasgore: new OutertaleOpponent({
      assets: new CosmosInventory(content.ibcAsgoreDeath),
      hp: 3500,
      dramatic: true,
      name: () => text.b_opponent_finalasgore.name,
      sprite () {
         const an = new CosmosAnimation({ anchor: { x: 0, y: 1 }, resources: content.ibcAsgoreDeath });
         speech.emoters.asgore = an;
         return an;
      }
   }),
   lostsoul_alphys: new OutertaleOpponent({
      hp: 250,
      safe: true,
      name: () => text.b_opponent_lostsoul.name,
      handler: azLostHandler1,
      acts: () => [
         [ 'check', text.b_opponent_lostsoul.act_check_alphys ],
         [ 'flirt', [] ],
         [ 'trivia', [] ],
         [ 'escort', [] ]
      ],
      metadata: {
         noEpiphany: true,
         reactMewMew: true,
         corndogger: true,
         nootexempt: true
      },
      sprite () {
         const alphys = azLostEffect(
            new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               position: { x: -1, y: 1 },
               resources: content.ibcAlphysHead,
               index: 56
            }),
            { x: 0, y: -67 }
         );
         speech.emoters.alphys = alphys;
         return new CosmosAnimation({
            anchor: { x: 0, y: 1 },
            resources: content.ibcAlphysBody,
            objects: [ alphys ]
         }).on('tick', function () {
            this.index = [ 13, 14 ].includes(alphys.index)
               ? alphys.index - 11
               : [ 9, 11 ].includes(alphys.index)
               ? 1
               : alphys.index === 35
               ? 4
               : 0;
         });
      }
   }),
   lostsoul_asgore: new OutertaleOpponent({
      hp: 3500,
      safe: true,
      name: () => text.b_opponent_lostsoul.name,
      handler: azLostHandler3,
      acts: () => [
         [ 'check', text.b_opponent_lostsoul.act_check_asgore ],
         [ 'flirt', [] ],
         [ 'hug', [] ],
         [ 'agreement', [] ]
      ],
      metadata: {
         noEpiphany: true,
         corndogger: true,
         nootexempt: true
      },
      sprite () {
         const asgore = azLostEffect(
            new CosmosSprite({ position: { y: -92.5 }, index: 23 }).on('tick', faceTicker('asgore')),
            { x: 0, y: 5 },
            true
         );
         speech.emoters.asgore = asgore;
         return new CosmosAnimation({
            anchor: { x: 0, y: 1 },
            resources: content.ibcAsgoreStatic,
            objects: [ asgore ]
         });
      }
   }),
   lostsoul_papyrus: new OutertaleOpponent({
      hp: 680,
      safe: true,
      name: () => text.b_opponent_lostsoul.name,
      handler: azLostHandler2,
      acts: () => [
         [ 'check', text.b_opponent_lostsoul.act_check_papyrus ],
         [ 'flirt', [] ],
         [ 'puzzle', [] ],
         [ 'hangout', [] ]
      ],
      metadata: {
         noEpiphany: true,
         corndogger: true,
         nootexempt: true
      },
      sprite () {
         const papyrus = azLostEffect(
            new CosmosSprite({ position: { x: -21, y: -105 }, index: 36 }).on('tick', faceTicker('papyrus')),
            { x: 11, y: 16 },
            true
         );
         speech.emoters.papyrus = papyrus;
         return new CosmosAnimation({
            resources: content.ibcPapyrusBattle,
            objects: [ papyrus ],
            anchor: { x: 0, y: 1 }
         }).on('tick', function () {
            papyrus.index === 36 || this.active || this.enable();
         });
      }
   }),
   lostsoul_sans: new OutertaleOpponent({
      hp: 1,
      safe: true,
      name: () => text.b_opponent_lostsoul.name,
      handler: azLostHandler2,
      acts: () => [
         [ 'check', text.b_opponent_lostsoul.act_check_sans ],
         [ 'flirt', [] ],
         [ 'judgement', [] ],
         [ 'dinner', [] ]
      ],
      metadata: {
         noEpiphany: true,
         corndogger: true,
         nootexempt: true
      },
      sprite () {
         const sans = azLostEffect(
            new CosmosAnimation({
               anchor: { x: 0, y: 1 },
               resources: content.ibcSansBattle,
               index: 6
            }),
            { x: 0, y: -58 }
         );
         speech.emoters.sans = sans;
         return sans;
      }
   }),
   lostsoul_toriel: new OutertaleOpponent({
      hp: 440,
      safe: true,
      name: () => text.b_opponent_lostsoul.name,
      handler: azLostHandler3,
      acts: () => [
         [ 'check', text.b_opponent_lostsoul.act_check_toriel ],
         [ 'flirt', [] ],
         [ 'home', [] ],
         [ 'call', [] ]
      ],
      metadata: {
         noEpiphany: true,
         corndogger: true,
         nootexempt: true
      },
      sprite () {
         const toriel = azLostEffect(
            new CosmosSprite({ position: { y: -84.5 }, index: 24 }).on('tick', faceTicker('toriel')),
            { x: 0, y: 0 },
            true
         );
         speech.emoters.toriel = toriel;
         return new CosmosAnimation({
            anchor: { x: 0, y: 1 },
            resources: content.ibcTorielBattle2,
            objects: [ toriel ]
         });
      }
   }),
   lostsoul_undyne: new OutertaleOpponent({
      hp: 1500,
      safe: true,
      name: () => text.b_opponent_lostsoul.name,
      handler: azLostHandler1,
      acts: () => [
         [ 'check', text.b_opponent_lostsoul.act_check_undyne ],
         [ 'flirt', [] ],
         [ [ 'water', 'punch', 'cocoa', 'tea' ][SAVE.data.n.undyne_drink], [] ],
         [ 'lesson', [] ]
      ],
      metadata: {
         noEpiphany: true,
         reactMewMew: true,
         corndogger: true,
         nootexempt: true
      },
      sprite () {
         const undyne = azLostEffect(
            new CosmosAnimation({ anchor: { x: 0, y: 1 }, index: 42, resources: content.ibcUndyneHead }),
            { x: 0, y: -101 }
         );
         speech.emoters.undyne = undyne;
         return new CosmosSprite({
            anchor: { x: 0, y: 1 },
            frames: [ content.ibcUndyneDate ],
            position: { y: 1 },
            objects: [
               new CosmosAnimation({
                  active: true,
                  anchor: { x: 0, y: 1 },
                  position: { y: 7 },
                  resources: content.ibcUndyneHair,
                  objects: [ undyne ]
               })
            ]
         });
      }
   })
};

for (const [ key, value ] of Object.entries(opponents)) {
   value.assets.name = `opponents::${key}`;
}

battler.opponentRegistry.register(opponents);

export default opponents;

CosmosUtils.status(`LOAD MODULE: CITADEL OPPONENTS (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
