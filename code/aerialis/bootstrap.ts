import text from '../../languages/default/text/aerialis';
import values from '../../languages/default/text/values';
import { pms, quickCall } from '../common/api';
import { content, context, convolver, effectSetup, soundRouter, sounds } from '../systems/assets';
import { atlas, events, game, items, maps, renderer, rooms, speech } from '../systems/core';
import {
   battler,
   dialogue_primitive,
   easyRoom,
   formatter,
   keyring,
   keyState,
   mechanics,
   menuBox,
   menuText,
   phone,
   pseudoHeaderer,
   saver,
   shopper,
   sidebarrer,
   world
} from '../systems/framework';
import { OutertaleMap, OutertaleSpeechPreset } from '../systems/outertale';
import { SAVE } from '../systems/save';
import {
   comp,
   CosmosAnimation,
   CosmosDaemon,
   CosmosEffect,
   CosmosImage,
   CosmosNavigator,
   CosmosObject,
   CosmosRectangle,
   CosmosSprite,
   CosmosTyper,
   CosmosUtils,
   CosmosValue
} from '../systems/storyteller';
import { translator } from '../systems/translator';

import imAerialisAOverlay$info from '../../assets/images/maps/aerialis-a-overlay.json?url';
import imAerialisAOverlay from '../../assets/images/maps/aerialis-a-overlay.png?url';
import imAerialisA$info from '../../assets/images/maps/aerialis-a.json?url';
import imAerialisA from '../../assets/images/maps/aerialis-a.png?url';
import imAerialisBDark$info from '../../assets/images/maps/aerialis-b-dark.json?url';
import imAerialisBDark from '../../assets/images/maps/aerialis-b-dark.png?url';
import imAerialisB$info from '../../assets/images/maps/aerialis-b.json?url';
import imAerialisB from '../../assets/images/maps/aerialis-b.png?url';

import a_aftershow from '../../rooms/a_aftershow.json';
import a_auditorium from '../../rooms/a_auditorium.json';
import a_barricade1 from '../../rooms/a_barricade1.json';
import a_barricade2 from '../../rooms/a_barricade2.json';
import a_citadelevator from '../../rooms/a_citadelevator.json';
import a_core_battle from '../../rooms/a_core_battle.json';
import a_core_bridge from '../../rooms/a_core_bridge.json';
import a_core_checkpoint from '../../rooms/a_core_checkpoint.json';
import a_core_entry1 from '../../rooms/a_core_entry1.json';
import a_core_entry2 from '../../rooms/a_core_entry2.json';
import a_core_exit1 from '../../rooms/a_core_exit1.json';
import a_core_exit2 from '../../rooms/a_core_exit2.json';
import a_core_left1 from '../../rooms/a_core_left1.json';
import a_core_left2 from '../../rooms/a_core_left2.json';
import a_core_left3 from '../../rooms/a_core_left3.json';
import a_core_main from '../../rooms/a_core_main.json';
import a_core_right1 from '../../rooms/a_core_right1.json';
import a_core_right2 from '../../rooms/a_core_right2.json';
import a_core_right3 from '../../rooms/a_core_right3.json';
import a_core_suspense from '../../rooms/a_core_suspense.json';
import a_dining from '../../rooms/a_dining.json';
import a_elevator1 from '../../rooms/a_elevator1.json';
import a_elevator2 from '../../rooms/a_elevator2.json';
import a_elevator3 from '../../rooms/a_elevator3.json';
import a_elevator4 from '../../rooms/a_elevator4.json';
import a_elevator5 from '../../rooms/a_elevator5.json';
import a_hub1 from '../../rooms/a_hub1.json';
import a_hub2 from '../../rooms/a_hub2.json';
import a_hub3 from '../../rooms/a_hub3.json';
import a_hub4 from '../../rooms/a_hub4.json';
import a_hub5 from '../../rooms/a_hub5.json';
import a_lab_downstairs from '../../rooms/a_lab_downstairs.json';
import a_lab_entry from '../../rooms/a_lab_entry.json';
import a_lab_main from '../../rooms/a_lab_main.json';
import a_lab_upstairs from '../../rooms/a_lab_upstairs.json';
import a_lab_virt from '../../rooms/a_lab_virt.json';
import a_lift from '../../rooms/a_lift.json';
import a_lookout from '../../rooms/a_lookout.json';
import a_mettaton1 from '../../rooms/a_mettaton1.json';
import a_mettaton2 from '../../rooms/a_mettaton2.json';
import a_offshoot1 from '../../rooms/a_offshoot1.json';
import a_offshoot2 from '../../rooms/a_offshoot2.json';
import a_pacing from '../../rooms/a_pacing.json';
import a_path1 from '../../rooms/a_path1.json';
import a_path2 from '../../rooms/a_path2.json';
import a_path3 from '../../rooms/a_path3.json';
import a_path4 from '../../rooms/a_path4.json';
import a_plaza from '../../rooms/a_plaza.json';
import a_prepuzzle from '../../rooms/a_prepuzzle.json';
import a_puzzle1 from '../../rooms/a_puzzle1.json';
import a_puzzle2 from '../../rooms/a_puzzle2.json';
import a_rg1 from '../../rooms/a_rg1.json';
import a_rg2 from '../../rooms/a_rg2.json';
import a_sans from '../../rooms/a_sans.json';
import a_sleeping1 from '../../rooms/a_sleeping1.json';
import a_sleeping2 from '../../rooms/a_sleeping2.json';
import a_sleeping3 from '../../rooms/a_sleeping3.json';
import a_split from '../../rooms/a_split.json';
import a_start from '../../rooms/a_start.json';

export const aerialisAMap = new OutertaleMap(imAerialisA$info, new CosmosImage(imAerialisA));
aerialisAMap.name = 'maps::aerialisA';

export const aerialisAOverlayMap = new OutertaleMap(imAerialisAOverlay$info, new CosmosImage(imAerialisAOverlay));
aerialisAOverlayMap.name = 'maps::aerialisAOverlay';

export const aerialisBMap = new OutertaleMap(imAerialisB$info, new CosmosImage(imAerialisB));
aerialisBMap.name = 'maps::aerialisB';

export const aerialisBDarkMap = new OutertaleMap(imAerialisBDark$info, new CosmosImage(imAerialisBDark));
aerialisBDarkMap.name = 'maps::aerialisBDark';

export const alphysPhoneDisplay = () =>
   world.bad_lizard < 2 && SAVE.data.n.state_foundry_undyne === 0
      ? 49 <= SAVE.data.n.plot && !SAVE.data.b.ultrashortcut && !SAVE.data.b.ubershortcut
      : SAVE.data.b.a_state_gotphone;

export const gossiper = {
   cooldown: false,
   text1: '',
   text2: '',
   typer1: new CosmosTyper({ renderer, formatter, name: 'gossiper1' })
      .on('read', function () {
         events.fire('read', this, this.lines);
      })
      .on('text', function (content) {
         content === '' || (gossiper.text1 = content);
         this.mode === 'read' && gossiper.sfx(content);
      })
      .on('header', pseudoHeaderer),
   typer2: new CosmosTyper({ renderer, formatter, name: 'gossiper2' })
      .on('read', function () {
         events.fire('read', this, this.lines);
      })
      .on('text', function (content) {
         content === '' || (gossiper.text2 = content);
         this.mode === 'read' && gossiper.sfx(content);
      })
      .on('header', pseudoHeaderer),
   async dialogue (...lines: (string | { b: string; c: string; s?: boolean })[]) {
      if (lines.length > 0) {
         const prev = atlas.target;
         for (const line of lines) {
            if (typeof line === 'string') {
               atlas.target === 'shopText' || atlas.switch('shopText');
               await dialogue_primitive(line);
            } else {
               gossiper.text1 = gossiper.text2 = '';
               gossiper.typer1.interval = gossiper.typer2.interval = speech.presets.of('basic').interval;
               atlas.target === 'shopTextGossip' || atlas.switch('shopTextGossip');
               if (line.s) {
                  gossiper.text1 = '';
                  gossiper.text2 = '';
                  await Promise.all([ gossiper.typer1.text(line.b), gossiper.typer2.text(line.c) ]);
               } else {
                  let skip = false;
                  const skipToggle = () => (skip = true);
                  gossiper.typer1.on('skip', skipToggle);
                  gossiper.text1 = '';
                  await gossiper.typer1.text(`${line.b}{%}`);
                  gossiper.typer1.off('skip', skipToggle);
                  gossiper.text2 = '';
                  const secondary = gossiper.typer2.text(line.c);
                  skip && gossiper.typer2.skip() && saver.skip();
                  await secondary;
               }
            }
         }
         atlas.switch(prev);
      }
   },
   async sfx (content: string) {
      if (!gossiper.cooldown && content.length > 0 && !content[content.length - 1].match(/[\s]/)) {
         speech.presets.of('basic').voices[0]?.[0].instance(renderer);
         gossiper.cooldown = true;
         renderer.post().then(() => {
            gossiper.cooldown = false;
         });
      }
   }
};

atlas.navigators.register(
   'shopTextGossip',
   new CosmosNavigator({
      next () {
         gossiper.typer1.read();
         gossiper.typer2.read();
      },
      prev () {
         gossiper.typer1.skip() && saver.skip();
         gossiper.typer2.skip() && saver.skip();
      },
      objects: [
         menuBox(-2, 240, 628, 226, 8, {
            objects: [
               menuText(26, 16, () => gossiper.text1, {
                  fontFamily: content.fDeterminationMono,
                  fontSize: 16,
                  fill: 0xffbbdc,
                  spacing: { y: 5 }
               }),
               menuText(26 + 320, 16, () => gossiper.text2, {
                  fontFamily: content.fDeterminationMono,
                  fontSize: 16,
                  fill: 0xd4bbff,
                  spacing: { y: 5 }
               })
            ]
         }).on('tick', function () {
            if (keyState.menu && game.interact && game.input && atlas.target === 'shopTextGossip') {
               gossiper.typer1.read();
               gossiper.typer1.skip() && saver.skip();
               gossiper.typer2.read();
               gossiper.typer2.skip() && saver.skip();
            }
         }),
         new CosmosRectangle({
            position: { x: 160, y: 120 },
            fill: 0xffffff,
            size: { x: 4, y: 120 },
            anchor: { x: 0 }
         })
      ]
   })
      .on('from', () => atlas.attach(renderer, 'menu', 'shopTextGossip'))
      .on('to', to => {
         atlas.detach(renderer, 'menu', 'shopTextGossip');
         gossiper.typer1.skip() && saver.skip();
         gossiper.typer2.skip() && saver.skip();
         if (to === null) {
            atlas.detach(renderer, 'menu', 'shop');
            shopper.value!.vars = {};
         }
      })
);

atlas.navigators.register(
   'sidebarCellPms',
   new CosmosNavigator({
      prev: null,
      grid: () => [ CosmosUtils.populate(Math.max(pms().length, 1), index => index + 1) ],
      objects: [
         menuBox(16, 16, 598, 438, 6, {
            fontFamily: content.fDeterminationSans,
            fontSize: 16,
            objects: [
               menuText(300, 16 - 4, () => text.m_aerialis.sidebarCellPms1(), { anchor: { x: 0 } }),
               menuText(178 + 5, 392 - 4, () => text.m_aerialis.sidebarCellPms2).on('tick', function () {
                  this.offsets[0].x = values.cellFinishX;
               })
            ]
         }),
         ...CosmosUtils.populate(2 * 3, index => {
            const r = Math.floor(index / 2);
            const y = 100 - 4 + r * 100;
            function idx (r: number) {
               return pms().length - (atlas.navigators.of('sidebarCellPms').selection() as number) - r;
            }
            function info (r: number) {
               return text.m_aerialis.sidebarCellPms3[pms()[idx(r)] as keyof typeof text.m_aerialis.sidebarCellPms3];
            }
            if (index % 2 === 0) {
               return menuText(
                  68,
                  y,
                  () => {
                     const i = info(r);
                     if (i) {
                        return (
                           CosmosUtils.provide(i.author) +
                           (SAVE.data.n.plot_pmcheck < idx(r) + 1 ? ` ${text.m_aerialis.sidebarCellPms4}` : '')
                        );
                     } else {
                        return '';
                     }
                  },
                  { fontFamily: content.fCryptOfTomorrow, fontSize: 8 }
               ).on('tick', function () {
                  this.fill = SAVE.data.n.plot_pmcheck < idx(r) + 1 ? 0xffff00 : 0x808080;
               });
            } else {
               return menuText(68, y + 15, () => values.textFormat(CosmosUtils.provide(info(r)?.pm ?? ''), 36, true), {
                  fontFamily: content.fDeterminationSans,
                  fontSize: 16
               }).on('tick', function () {
                  this.fill = SAVE.data.n.plot_pmcheck < idx(r) + 1 ? 0xffff00 : 0xffffff;
               });
            }
         }),
         new CosmosObject({ position: { x: 287 }, fill: 0xffffff }).on('tick', function () {
            const len = pms().length;
            if (this.metadata.len !== len) {
               this.metadata.len = len;
               const dots = Math.ceil(len / 3);
               if (dots < 2) {
                  this.objects = comp.ear;
               } else {
                  const dotSize = Math.min(10, 200 / (dots - 1));
                  const totalHeight = dots * dotSize;
                  const origin = 120 - totalHeight / 2 + dotSize / 2;
                  this.objects = CosmosUtils.populate(dots, index =>
                     new CosmosRectangle({
                        anchor: 0,
                        position: { y: origin + index * dotSize },
                        size: 4
                     }).on('tick', function () {
                        if (index === Math.floor((atlas.navigators.of('sidebarCellPms').selection() - 1) / 3)) {
                           this.alpha.value = 1;
                        } else {
                           this.alpha.value = 0.5;
                        }
                     })
                  );
               }
            }
         })
      ]
   })
      .on('from', () => {
         atlas.navigators.of('sidebarCellPms').setpos();
         atlas.attach(renderer, 'menu', 'sidebarCellPms');
         sounds.dimbox.instance(renderer);
      })
      .on('to', () => {
         atlas.detach(renderer, 'menu', 'sidebarCellPms');
         game.movement = true;
         SAVE.data.n.plot_pmcheck = pms().length;
      })
      .on('change', () => {
         sounds.menu.instance(renderer).rate.value = 1.5;
      })
);

battler.weapons.register({
   tablaphone: {
      async animation (index, critted, accuracy, base, half, hitbar) {
         battler.hitbar2(hitbar, critted);
         if (index === 1) {
            const perfect = 1 - mechanics.span.min / mechanics.span.range <= accuracy;
            perfect && sounds.saber3.instance(renderer);
            const deadcenter = base.add(half);
            const spindir = Math.random() < 0.5 ? 1 : -1;
            const sploder = new CosmosAnimation({
               alpha: 0,
               active: true,
               anchor: 0,
               tint: perfect ? 0xffee6d : void 0,
               position: deadcenter,
               resources: content.ibuFrypan1,
               spin: spindir * 2,
               acceleration: 1.1,
               scale: 1 / 2
            });
            renderer.attach('menu', sploder);
            sounds.frypan.instance(renderer);
            Promise.all([
               sploder.alpha.modulate(renderer, 400, 1, 0),
               sploder.scale.modulate(renderer, 400, 2, 1 / 2)
            ]).then(() => {
               renderer.detach('menu', sploder);
            });
            await renderer.pause(200);
            const dist = new CosmosValue();
            const objs = new CosmosObject({
               objects: CosmosUtils.populate(7, index => {
                  const ayo = (index / 7) * 360 - 90;
                  return new CosmosSprite({
                     anchor: 0,
                     scale: 1 / 2,
                     tint: perfect ? 0xffee6d : void 0,
                     frames: [ content.ibuFrypan2 ],
                     spin: spindir * 10,
                     acceleration: 0.98
                  }).on('tick', function () {
                     this.position = deadcenter.endpoint(ayo, dist.value);
                  });
               })
            });
            renderer.attach('menu', objs);
            dist.modulate(renderer, 600, 30, 30);
            objs.alpha.modulate(renderer, 600, 1, 0).then(() => {
               renderer.detach('menu', objs);
            });
         } else {
            await renderer.pause(500);
         }
      },
      targets: 2,
      speed: 0.625,
      crit: 2,
      off: 2
   },
   laser: {
      async animation (index, critted, accuracy, base, half, hitbar) {
         battler.hitbar2(hitbar, critted);
         if (index === 5) {
            const perfect = 1 - mechanics.span.min / mechanics.span.range <= accuracy;
            perfect && sounds.saber3.instance(renderer);
            const deadcenter = base.add(half);
            const spindir = Math.random() < 0.5 ? 1 : -1;
            const singstar = new CosmosAnimation({
               active: true,
               anchor: 0,
               tint: perfect ? 0xffee6d : void 0,
               position: deadcenter,
               resources: content.ibuGunshot1,
               scale: 1
            });
            renderer.attach('menu', singstar);
            await renderer.pause(100);
            sounds.gunshot.instance(renderer);
            await renderer.pause(100);
            renderer.detach('menu', singstar);
            let objsRot = 0;
            const dist = new CosmosValue();
            const objsScale = new CosmosValue(1 / 2);
            const objs = new CosmosObject({
               objects: CosmosUtils.populate(7, index => {
                  const ayo = (index / 7) * 360 - 90;
                  return new CosmosAnimation({
                     active: true,
                     anchor: 0,
                     tint: perfect ? 0xffee6d : void 0,
                     resources: content.ibuGunshot1,
                     spin: spindir * 5,
                     rotation: 360 - (ayo + 90)
                  }).on('tick', function () {
                     this.position = deadcenter.endpoint(objsRot + ayo, dist.value);
                     this.scale.set(objsScale.value);
                  });
               })
            }).on('tick', function () {
               objsRot += 20;
            });
            renderer.attach('menu', objs);
            dist.modulate(renderer, 600, 45, 45, 45, 0);
            const circler = () =>
               new CosmosSprite({
                  frames: [ content.ibuGunshot2 ],
                  anchor: 0,
                  position: deadcenter,
                  tint: perfect ? 0xffee6d : void 0,
                  metadata: { size: 0 }
               }).on('tick', function () {
                  this.metadata.size < 1 && (this.metadata.size += 0.1);
                  this.scale.set((dist.value / 20) * this.metadata.size);
               });
            objs.objects.unshift(circler());
            await renderer.pause(150);
            objs.objects.unshift(circler());
            await renderer.pause(150);
            objsScale.modulate(renderer, 300, 1 / 4);
            objs.alpha.modulate(renderer, 300, 1, 0).then(() => {
               renderer.detach('menu', objs);
            });
         } else {
            await renderer.pause(500);
         }
      },
      targets: 6,
      speed: 1.25,
      crit: 4,
      off: 2
   },
   laser_x: {
      async animation (index, critted, accuracy, base, half, hitbar) {
         battler.hitbar2(hitbar, critted);
         if (index === 5) {
            const perfect = 1 - mechanics.span.min / mechanics.span.range <= accuracy;
            perfect && sounds.saber3.instance(renderer);
            const deadcenter = base.add(half);
            const spindir = Math.random() < 0.5 ? 1 : -1;
            const singstar = new CosmosAnimation({
               active: true,
               anchor: 0,
               tint: perfect ? 0xffee6d : void 0,
               position: deadcenter,
               resources: content.ibuGunshot1,
               scale: 1
            });
            renderer.attach('menu', singstar);
            await renderer.pause(100);
            sounds.gunshot.instance(renderer);
            await renderer.pause(100);
            renderer.detach('menu', singstar);
            let objsRot = 0;
            const dist = new CosmosValue();
            const objsScale = new CosmosValue(1 / 2);
            const objs = new CosmosObject({
               objects: CosmosUtils.populate(7, index => {
                  const ayo = (index / 7) * 360 - 90;
                  return new CosmosAnimation({
                     active: true,
                     anchor: 0,
                     tint: perfect ? 0xffee6d : void 0,
                     resources: content.ibuGunshot1,
                     spin: spindir * 5,
                     rotation: 360 - (ayo + 90)
                  }).on('tick', function () {
                     this.position = deadcenter.endpoint(objsRot + ayo, dist.value);
                     this.scale.set(objsScale.value);
                  });
               })
            }).on('tick', function () {
               objsRot += 20;
            });
            renderer.attach('menu', objs);
            dist.modulate(renderer, 600, 45, 45, 45, 0);
            const circler = () =>
               new CosmosSprite({
                  frames: [ content.ibuGunshot2 ],
                  anchor: 0,
                  position: deadcenter,
                  tint: perfect ? 0xffee6d : void 0,
                  metadata: { size: 0 }
               }).on('tick', function () {
                  this.metadata.size < 1 && (this.metadata.size += 0.1);
                  this.scale.set((dist.value / 20) * this.metadata.size);
               });
            objs.objects.unshift(circler());
            await renderer.pause(150);
            objs.objects.unshift(circler());
            await renderer.pause(150);
            objsScale.modulate(renderer, 300, 1 / 4);
            objs.alpha.modulate(renderer, 300, 1, 0).then(() => {
               renderer.detach('menu', objs);
            });
         } else {
            await renderer.pause(500);
         }
      },
      targets: 6,
      speed: 1.25,
      crit: 3.5,
      off: 2
   }
});

items.register('tvm_radio', { type: 'special', value: 0, sell1: 80, sell2: 50, text: text.i_tvm_radio, useSFX: true });
items.register('tvm_fireworks', {
   type: 'special',
   value: 0,
   sell1: 250,
   sell2: 20,
   text: text.i_tvm_fireworks,
   useSFX: true
});
items.register('tvm_mewmew', {
   type: 'special',
   value: 0,
   sell1: 999,
   sell2: 400,
   text: text.i_tvm_mewmew,
   useSFX: true
});
items.register('starfait', { type: 'consumable', value: 23, sell1: 40, sell2: 16, text: text.i_starfait });
items.register('legendary_hero', {
   type: 'consumable',
   value: 40,
   sell1: 30,
   sell2: 30,
   text: text.i_legendary_hero,
   healSFX: sounds.hero
});
items.register('glamburger', { type: 'consumable', value: 34, sell1: 40, sell2: 34, text: text.i_glamburger });
items.register('face_steak', { type: 'consumable', value: 55, sell1: 25, sell2: 69, text: text.i_face_steak });
items.register('starfait_x', { type: 'consumable', value: -23, sell1: 80, sell2: 1, text: text.i_starfait_x });

items.register('legendary_hero_x', {
   type: 'consumable',
   value: -40,
   sell1: 60,
   sell2: 1,
   text: text.i_legendary_hero_x,
   healSFX: sounds.heroDark
});

items.register('glamburger_x', { type: 'consumable', value: -34, sell1: 80, sell2: 1, text: text.i_glamburger_x });
items.register('face_steak_x', { type: 'consumable', value: -55, sell1: 50, sell2: 1, text: text.i_face_steak_x });
items.register('trash', { type: 'consumable', value: 0, sell1: 20, sell2: 5, text: text.i_trash });
items.register('laser', { type: 'weapon', value: 12, sell1: 40, sell2: 70, text: text.i_laser, useSFX: true });
items.register('laser_x', { type: 'weapon', value: 10, sell1: 40, sell2: 60, text: text.i_laser_x, useSFX: true });
items.register('visor', { type: 'armor', value: 12, sell1: 30, sell2: 70, text: text.i_visor, useSFX: true });
items.register('visor_x', { type: 'armor', value: 10, sell1: 30, sell2: 60, text: text.i_visor_x, useSFX: true });
items.register('filament', { type: 'consumable', value: 30, sell1: 8, sell2: 40, text: text.i_filament });
items.register('filament_use1', { type: 'consumable', value: 25, sell1: 8, sell2: 24, text: text.i_filament_use1 });
items.register('filament_use2', { type: 'consumable', value: 20, sell1: 8, sell2: 16, text: text.i_filament_use2 });
items.register('filament_use3', { type: 'consumable', value: 15, sell1: 8, sell2: 12, text: text.i_filament_use3 });
items.register('filament_use4', { type: 'consumable', value: 10, sell1: 8, sell2: 10, text: text.i_filament_use4 });

items.register('tablaphone', {
   type: 'weapon',
   value: 10,
   sell1: 110,
   sell2: 90,
   text: text.i_tablaphone,
   useSFX: true
});
items.register('sonic', { type: 'armor', value: 11, sell1: 15, sell2: 110, text: text.i_sonic, useSFX: true });
items.register('mystery_food', { type: 'consumable', value: 13, sell1: 10, sell2: 10, text: text.i_mystery_food });
items.register('super_pop', { type: 'consumable', value: 22, sell1: 30, sell2: 56, text: text.i_super_pop });
items.register('old_gun', { type: 'special', value: 0, sell1: 30, sell2: 140, text: text.i_old_gun });
items.register('old_bomb', { type: 'special', value: 0, sell1: 20, sell2: 105, text: text.i_old_bomb });
items.register('old_spray', { type: 'special', value: 0, sell1: 10, sell2: 70, text: text.i_old_spray });
items.register('corndog', {
   type: 'consumable',
   value: 10,
   sell1: 40,
   sell2: 5,
   text: text.i_corndog,
   healSFX: sounds.dog
});
items.register('corngoat', { type: 'consumable', value: 20, sell1: 80, sell2: 20, text: text.i_corngoat });
items.register('moon_pie', { type: 'consumable', value: 99, sell1: 36, sell2: 36, text: text.i_moon_pie });
items.register('orange_soda', { type: 'consumable', value: 16, sell1: 25, sell2: 15, text: text.i_orange_soda });
items.register('demise', { type: 'consumable', value: -99, sell1: 20, sell2: 1, text: text.i_demise });

keyring.register('mystery', {
   description: () => text.k_mystery.description(),
   name: () => text.k_mystery.name,
   priority: 3,
   display () {
      return SAVE.data.b.item_mystery_key;
   }
});

keyring.register('liftgate', {
   description: () => text.k_liftgate.description,
   name: () => text.k_liftgate.name,
   priority: 2,
   display () {
      return alphysPhoneDisplay();
   }
});

maps.register('aerialis-a', aerialisAMap);
maps.register('aerialis-a-overlay', aerialisAOverlayMap);
maps.register('aerialis-b', aerialisBMap);
maps.register('aerialis-b-dark', aerialisBDarkMap);

phone.register('puzzle2', {
   display () {
      return (
         !world.badder_lizard &&
         SAVE.data.n.state_foundry_undyne !== 1 &&
         ((game.room === 'a_puzzle1' && SAVE.data.n.plot < 55 && SAVE.data.n.cell_puzzleA1 < 3) ||
            (game.room === 'a_puzzle2' && SAVE.data.n.plot < 59 && SAVE.data.n.cell_puzzleA2 < 2))
      );
   },
   priority: 3.2,
   async trigger () {
      SAVE.flag.b._call = true;
      if (game.room === 'a_puzzle1') {
         await quickCall(true, ...text.c_call_aerialis.puzzle2a());
      } else {
         await quickCall(true, ...text.c_call_aerialis.puzzle2b());
      }
   },
   name: () => text.c_name_aerialis.puzzle
});

phone.register('dimboxA', {
   display () {
      return alphysPhoneDisplay();
   },
   priority: 4.1,
   trigger () {
      sidebarrer.dimbox = 'dimboxA';
      atlas.switch('sidebarCellBox');
   },
   name: () => text.c_name_aerialis.dimboxA
});

phone.register('dimboxB', {
   display () {
      return alphysPhoneDisplay();
   },
   priority: 4.2,
   trigger () {
      sidebarrer.dimbox = 'dimboxB';
      atlas.switch('sidebarCellBox');
   },
   name: () => text.c_name_aerialis.dimboxB
});

phone.register('pms', {
   display () {
      return !SAVE.data.b.freedom && alphysPhoneDisplay();
   },
   priority: 5,
   trigger () {
      atlas.switch('sidebarCellPms');
   },
   name: () => text.c_name_aerialis.pms()
});

export const aerialisRooms = {
   a_start: easyRoom('a_start', aerialisAMap, a_start),
   a_lab_entry: easyRoom('a_lab_entry', aerialisAMap, a_lab_entry),
   a_lab_main: easyRoom('a_lab_main', aerialisAMap, a_lab_main),
   a_lab_upstairs: easyRoom('a_lab_upstairs', aerialisAMap, a_lab_upstairs),
   a_lab_downstairs: easyRoom('a_lab_downstairs', aerialisAMap, a_lab_downstairs),
   a_lab_virt: easyRoom('a_lab_virt', aerialisAMap, a_lab_virt),
   a_path1: easyRoom('a_path1', aerialisAMap, a_path1),
   a_path2: easyRoom('a_path2', aerialisAMap, a_path2),
   a_path3: easyRoom('a_path3', aerialisAMap, a_path3),
   a_rg1: easyRoom('a_rg1', aerialisAMap, a_rg1),
   a_path4: easyRoom('a_path4', aerialisAMap, a_path4),
   a_barricade1: easyRoom('a_barricade1', aerialisAMap, a_barricade1),
   a_puzzle1: easyRoom('a_puzzle1', aerialisAMap, a_puzzle1),
   a_mettaton1: easyRoom('a_mettaton1', aerialisAMap, a_mettaton1),
   a_elevator1: easyRoom('a_elevator1', aerialisAMap, a_elevator1),
   a_lift: easyRoom('a_lift', aerialisAMap, a_lift),
   a_elevator2: easyRoom('a_elevator2', aerialisAMap, a_elevator2),
   a_sans: easyRoom('a_sans', aerialisAMap, a_sans),
   a_pacing: easyRoom('a_pacing', aerialisAMap, a_pacing),
   a_prepuzzle: easyRoom('a_prepuzzle', aerialisAMap, a_prepuzzle),
   a_puzzle2: easyRoom('a_puzzle2', aerialisAMap, a_puzzle2),
   a_mettaton2: easyRoom('a_mettaton2', aerialisAMap, a_mettaton2),
   a_rg2: easyRoom('a_rg2', aerialisAMap, a_rg2),
   a_barricade2: easyRoom('a_barricade2', aerialisAMap, a_barricade2),
   a_split: easyRoom('a_split', aerialisAMap, a_split),
   a_offshoot1: easyRoom('a_offshoot1', aerialisAMap, a_offshoot1),
   a_offshoot2: easyRoom('a_offshoot2', aerialisAMap, a_offshoot2),
   a_elevator3: easyRoom('a_elevator3', aerialisAMap, a_elevator3),
   a_elevator4: easyRoom('a_elevator4', aerialisBMap, a_elevator4),
   a_auditorium: easyRoom('a_auditorium', aerialisBMap, a_auditorium),
   a_aftershow: easyRoom('a_aftershow', aerialisBMap, a_aftershow),
   a_hub1: easyRoom('a_hub1', aerialisBMap, a_hub1),
   a_dining: easyRoom('a_dining', aerialisBMap, a_dining),
   a_hub2: easyRoom('a_hub2', aerialisBMap, a_hub2),
   a_lookout: easyRoom('a_lookout', aerialisBMap, a_lookout),
   a_hub3: easyRoom('a_hub3', aerialisBMap, a_hub3),
   a_plaza: easyRoom('a_plaza', aerialisBMap, a_plaza),
   a_elevator5: easyRoom('a_elevator5', aerialisBMap, a_elevator5),
   a_hub4: easyRoom('a_hub4', aerialisBMap, a_hub4),
   a_sleeping1: easyRoom('a_sleeping1', aerialisBMap, a_sleeping1),
   a_sleeping2: easyRoom('a_sleeping2', aerialisBMap, a_sleeping2),
   a_sleeping3: easyRoom('a_sleeping3', aerialisBMap, a_sleeping3),
   a_hub5: easyRoom('a_hub5', aerialisBMap, a_hub5),
   a_citadelevator: easyRoom('a_citadelevator', aerialisBMap, a_citadelevator),
   a_core_entry1: easyRoom('a_core_entry1', aerialisBMap, a_core_entry1),
   a_core_entry2: easyRoom('a_core_entry2', aerialisBMap, a_core_entry2),
   a_core_main: easyRoom('a_core_main', aerialisBMap, a_core_main),
   a_core_left1: easyRoom('a_core_left1', aerialisBMap, a_core_left1),
   a_core_left2: easyRoom('a_core_left2', aerialisBMap, a_core_left2),
   a_core_left3: easyRoom('a_core_left3', aerialisBMap, a_core_left3),
   a_core_right1: easyRoom('a_core_right1', aerialisBMap, a_core_right1),
   a_core_right2: easyRoom('a_core_right2', aerialisBMap, a_core_right2),
   a_core_right3: easyRoom('a_core_right3', aerialisBMap, a_core_right3),
   a_core_bridge: easyRoom('a_core_bridge', aerialisBMap, a_core_bridge),
   a_core_checkpoint: easyRoom('a_core_checkpoint', aerialisBMap, a_core_checkpoint),
   a_core_suspense: easyRoom('a_core_suspense', aerialisBMap, a_core_suspense),
   a_core_battle: easyRoom('a_core_battle', aerialisBMap, a_core_battle),
   a_core_exit1: easyRoom('a_core_exit1', aerialisBMap, a_core_exit1),
   a_core_exit2: easyRoom('a_core_exit2', aerialisBMap, a_core_exit2)
};

rooms.register(aerialisRooms);

saver.locations.register(text.s_save_aerialis);

speech.presets.register({
   finalghost: new OutertaleSpeechPreset({
      faces: [ null ],
      interval: 2,
      voices: [
         [
            new CosmosDaemon(content.avNapstablook, {
               context,
               rate: 0.85,
               router: effectSetup(new CosmosEffect(context, convolver, 0.6), soundRouter)
            })
         ]
      ],
      fontFamily1: content.fDeterminationMono,
      fontFamily2: content.fDotumChe
   }),
   hapstablook: new OutertaleSpeechPreset({
      faces: [ null ],
      interval: 2,
      voices: [
         [
            new CosmosDaemon(content.avNapstablook, {
               context,
               rate: 1.3,
               router: effectSetup(new CosmosEffect(context, convolver, 0.6), soundRouter)
            })
         ]
      ],
      fontFamily1: content.fDeterminationMono,
      fontFamily2: content.fDotumChe
   }),
   soriel: new OutertaleSpeechPreset({
      faces: [ null ],
      interval: 2,
      voices: [ [ new CosmosDaemon(content.avSoriel, { context, router: soundRouter }) ] ],
      fontFamily1: content.fComicSans,
      fontFamily2: content.fComicSans,
      fontSize2: 8
   })
});

translator.addAsset('imAerialisA$info', aerialisAMap);
translator.addAsset('imAerialisA', aerialisAMap.image);
translator.addAsset('imAerialisAOverlay$info', aerialisAOverlayMap);
translator.addAsset('imAerialisAOverlay', aerialisAOverlayMap.image);
translator.addAsset('imAerialisB$info', aerialisBMap);
translator.addAsset('imAerialisB', aerialisBMap.image);
translator.addAsset('imAerialisBDark$info', aerialisBDarkMap);
translator.addAsset('imAerialisBDark', aerialisBDarkMap.image);
translator.addText('aerialis', text);

CosmosUtils.status(`LOAD MODULE: AERIALIS BOOTSTRAP (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
