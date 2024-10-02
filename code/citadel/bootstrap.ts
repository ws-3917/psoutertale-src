import text from '../../languages/default/text/citadel';
import { content, sounds } from '../systems/assets';
import { items, keys, maps, renderer, rooms } from '../systems/core';
import { battler, easyRoom, keyring, saver, shake } from '../systems/framework';
import { OutertaleMap } from '../systems/outertale';
import { SAVE } from '../systems/save';
import { CosmosAnimation, CosmosImage, CosmosSprite, CosmosUtils } from '../systems/storyteller';
import { translator } from '../systems/translator';

import imCitadel$info from '../../assets/images/maps/citadel.json?url';
import imCitadel from '../../assets/images/maps/citadel.png?url';
import c_alley from '../../rooms/c_alley.json';
import c_archive_aerialis1 from '../../rooms/c_archive_aerialis1.json';
import c_archive_aerialis2 from '../../rooms/c_archive_aerialis2.json';
import c_archive_aerialis3 from '../../rooms/c_archive_aerialis3.json';
import c_archive_aerialis4 from '../../rooms/c_archive_aerialis4.json';
import c_archive_exit from '../../rooms/c_archive_exit.json';
import c_archive_foundryA1 from '../../rooms/c_archive_foundryA1.json';
import c_archive_foundryA2 from '../../rooms/c_archive_foundryA2.json';
import c_archive_foundryA3 from '../../rooms/c_archive_foundryA3.json';
import c_archive_foundryA4 from '../../rooms/c_archive_foundryA4.json';
import c_archive_foundryB1 from '../../rooms/c_archive_foundryB1.json';
import c_archive_foundryB2 from '../../rooms/c_archive_foundryB2.json';
import c_archive_foundryB3 from '../../rooms/c_archive_foundryB3.json';
import c_archive_foundryB4 from '../../rooms/c_archive_foundryB4.json';
import c_archive_path1 from '../../rooms/c_archive_path1.json';
import c_archive_path2 from '../../rooms/c_archive_path2.json';
import c_archive_path3 from '../../rooms/c_archive_path3.json';
import c_archive_path4 from '../../rooms/c_archive_path4.json';
import c_archive_path5 from '../../rooms/c_archive_path5.json';
import c_archive_path6 from '../../rooms/c_archive_path6.json';
import c_archive_start from '../../rooms/c_archive_start.json';
import c_archive_starton1 from '../../rooms/c_archive_starton1.json';
import c_archive_starton2 from '../../rooms/c_archive_starton2.json';
import c_archive_starton3 from '../../rooms/c_archive_starton3.json';
import c_archive_starton4 from '../../rooms/c_archive_starton4.json';
import c_archive_surface from '../../rooms/c_archive_surface.json';
import c_archive_wastelands1 from '../../rooms/c_archive_wastelands1.json';
import c_archive_wastelands2 from '../../rooms/c_archive_wastelands2.json';
import c_archive_wastelands3 from '../../rooms/c_archive_wastelands3.json';
import c_archive_wastelands4 from '../../rooms/c_archive_wastelands4.json';
import c_asgore_asgore from '../../rooms/c_asgore_asgore.json';
import c_asgore_asriel from '../../rooms/c_asgore_asriel.json';
import c_asgore_front from '../../rooms/c_asgore_front.json';
import c_asgore_hallway from '../../rooms/c_asgore_hallway.json';
import c_asgore_kitchen from '../../rooms/c_asgore_kitchen.json';
import c_asgore_living from '../../rooms/c_asgore_living.json';
import c_bastion from '../../rooms/c_bastion.json';
import c_courtroom from '../../rooms/c_courtroom.json';
import c_courtyard from '../../rooms/c_courtyard.json';
import c_elevator1 from '../../rooms/c_elevator1.json';
import c_elevator2 from '../../rooms/c_elevator2.json';
import c_exit from '../../rooms/c_exit.json';
import c_pacing from '../../rooms/c_pacing.json';
import c_road1 from '../../rooms/c_road1.json';
import c_road2 from '../../rooms/c_road2.json';
import c_road3 from '../../rooms/c_road3.json';
import c_start from '../../rooms/c_start.json';
import c_story from '../../rooms/c_story.json';
import c_throneroom from '../../rooms/c_throneroom.json';

export const citadelMap = new OutertaleMap(imCitadel$info, new CosmosImage(imCitadel));
citadelMap.name = 'maps::citadel';

battler.weapons.register({
   big_dipper: {
      async animation (index, critted, accuracy, base, half, hitbar) {
         battler.hitbar1(hitbar);
         let slashes = 0;
         let expired = false;
         let resolved = 0;
         const timeout = renderer.pause(2000).then(() => (expired = true));
         while (!expired && slashes < 4) {
            const ix = slashes;
            const huge = ++slashes === 4;
            let dis = !huge;
            const pressz = new CosmosSprite({
               active: true,
               frames: [ content.ibuPressz, null ],
               duration: 15,
               anchor: 0,
               position: base.add(half),
               scale: 1 / 4
            });
            renderer.attach(
               'menu',
               new CosmosAnimation({
                  active: true,
                  anchor: { x: 0, y: [ -1, 1 ][ix % 2] },
                  scale: huge ? (accuracy > 0.5 ? 1 : 0.5) : accuracy > 0.5 ? 0.5 : 0.25,
                  position: huge
                     ? base.add(half.x, -2.5 - content.ibuSwing.value[0].value.height / 4)
                     : base.add(half.x, -2.5),
                  tint: huge ? 0xffffff : 0xff6969,
                  rotation: [ 0, 180 ][ix % 2],
                  resources: content.ibuSwing
               }).on('tick', function () {
                  if (this.index === 5 && this.step === this.duration - 1) {
                     resolved++;
                     renderer.detach('menu', this);
                     dis && renderer.attach('menu', pressz);
                  }
               })
            );
            sounds.swing.instance(renderer).rate.value = huge ? 0.75 : 1;
            if (huge) {
               shake(4, 1200);
            } else {
               shake(2, 600);
               await Promise.race([ timeout, keys.interactKey.on('down') ]);
               renderer.detach('menu', pressz);
               dis = false;
            }
         }
         battler.attackMultiplier = slashes / 4;
         await renderer.when(() => resolved === slashes);
      },
      targets: 1,
      speed: 1,
      crit: 3,
      tdbase: 500,
      tdspan: 200
   }
});

items.register('archive_armor', { type: 'armor', value: 0, text: text.i_archive });
items.register('archive_weapon', { type: 'weapon', value: 0, text: text.i_archive });
items.register('archive_berry', { type: 'consumable', value: 3, text: text.i_archive_berry });
items.register('archive_candy', { type: 'consumable', value: 4, text: text.i_archive_candy });
items.register('archive_rations', { type: 'consumable', value: 5, text: text.i_archive_rations });
items.register('archive_tzn', { type: 'consumable', value: 6, text: text.i_archive_tzn });
items.register('archive_nice_cream', { type: 'consumable', value: 7, text: text.i_archive_nice_cream });
items.register('archive_healpak', { type: 'consumable', value: 8, text: text.i_archive_healpak });
items.register('big_dipper', {
   type: 'weapon',
   value: 15,
   sell1: 250,
   sell2: 50,
   text: text.i_big_dipper,
   useSFX: true
});
items.register('heart_locket', {
   type: 'armor',
   value: 15,
   sell1: 250,
   sell2: 50,
   text: text.i_heart_locket,
   useSFX: true
});
items.register('starling_tea', { type: 'consumable', value: 99, sell1: 16, sell2: 64, text: text.i_starling_tea });

keyring.register('skeleton', {
   description: () => text.k_skeleton.description(),
   name: () => text.k_skeleton.name,
   priority: 4,
   display () {
      return SAVE.data.b.skeleton_key;
   }
});

keyring.register('hangar', {
   description: () => text.k_hangar.description,
   name: () => text.k_hangar.name,
   priority: -Infinity,
   display () {
      return SAVE.flag.n.lv20 !== 0;
   }
});

maps.register('citadel', citadelMap);

export const citadelRooms = {
   c_start: easyRoom('c_start', citadelMap, c_start),
   c_road1: easyRoom('c_road1', citadelMap, c_road1),
   c_elevator1: easyRoom('c_elevator1', citadelMap, c_elevator1),
   c_pacing: easyRoom('c_pacing', citadelMap, c_pacing),
   c_courtyard: easyRoom('c_courtyard', citadelMap, c_courtyard),
   c_alley: easyRoom('c_alley', citadelMap, c_alley),
   c_story: easyRoom('c_story', citadelMap, c_story),
   c_elevator2: easyRoom('c_elevator2', citadelMap, c_elevator2),
   c_courtroom: easyRoom('c_courtroom', citadelMap, c_courtroom),
   c_road2: easyRoom('c_road2', citadelMap, c_road2),
   c_throneroom: easyRoom('c_throneroom', citadelMap, c_throneroom),
   c_bastion: easyRoom('c_bastion', citadelMap, c_bastion),
   c_road3: easyRoom('c_road3', citadelMap, c_road3),
   c_exit: easyRoom('c_exit', citadelMap, c_exit),
   c_asgore_front: easyRoom('c_asgore_front', citadelMap, c_asgore_front),
   c_asgore_living: easyRoom('c_asgore_living', citadelMap, c_asgore_living),
   c_asgore_kitchen: easyRoom('c_asgore_kitchen', citadelMap, c_asgore_kitchen),
   c_asgore_hallway: easyRoom('c_asgore_hallway', citadelMap, c_asgore_hallway),
   c_asgore_asriel: easyRoom('c_asgore_asriel', citadelMap, c_asgore_asriel),
   c_asgore_asgore: easyRoom('c_asgore_asgore', citadelMap, c_asgore_asgore),
   c_archive_start: easyRoom('c_archive_start', citadelMap, c_archive_start),
   c_archive_path1: easyRoom('c_archive_path1', citadelMap, c_archive_path1),
   c_archive_wastelands1: easyRoom('c_archive_wastelands1', citadelMap, c_archive_wastelands1),
   c_archive_wastelands2: easyRoom('c_archive_wastelands2', citadelMap, c_archive_wastelands2),
   c_archive_wastelands3: easyRoom('c_archive_wastelands3', citadelMap, c_archive_wastelands3),
   c_archive_wastelands4: easyRoom('c_archive_wastelands4', citadelMap, c_archive_wastelands4),
   c_archive_path2: easyRoom('c_archive_path2', citadelMap, c_archive_path2),
   c_archive_starton1: easyRoom('c_archive_starton1', citadelMap, c_archive_starton1),
   c_archive_starton2: easyRoom('c_archive_starton2', citadelMap, c_archive_starton2),
   c_archive_starton3: easyRoom('c_archive_starton3', citadelMap, c_archive_starton3),
   c_archive_starton4: easyRoom('c_archive_starton4', citadelMap, c_archive_starton4),
   c_archive_path3: easyRoom('c_archive_path3', citadelMap, c_archive_path3),
   c_archive_foundryA1: easyRoom('c_archive_foundryA1', citadelMap, c_archive_foundryA1),
   c_archive_foundryA2: easyRoom('c_archive_foundryA2', citadelMap, c_archive_foundryA2),
   c_archive_foundryA3: easyRoom('c_archive_foundryA3', citadelMap, c_archive_foundryA3),
   c_archive_foundryA4: easyRoom('c_archive_foundryA4', citadelMap, c_archive_foundryA4),
   c_archive_path4: easyRoom('c_archive_path4', citadelMap, c_archive_path4),
   c_archive_foundryB1: easyRoom('c_archive_foundryB1', citadelMap, c_archive_foundryB1),
   c_archive_foundryB2: easyRoom('c_archive_foundryB2', citadelMap, c_archive_foundryB2),
   c_archive_foundryB3: easyRoom('c_archive_foundryB3', citadelMap, c_archive_foundryB3),
   c_archive_foundryB4: easyRoom('c_archive_foundryB4', citadelMap, c_archive_foundryB4),
   c_archive_path5: easyRoom('c_archive_path5', citadelMap, c_archive_path5),
   c_archive_aerialis1: easyRoom('c_archive_aerialis1', citadelMap, c_archive_aerialis1),
   c_archive_aerialis2: easyRoom('c_archive_aerialis2', citadelMap, c_archive_aerialis2),
   c_archive_aerialis3: easyRoom('c_archive_aerialis3', citadelMap, c_archive_aerialis3),
   c_archive_aerialis4: easyRoom('c_archive_aerialis4', citadelMap, c_archive_aerialis4),
   c_archive_path6: easyRoom('c_archive_path6', citadelMap, c_archive_path6),
   c_archive_surface: easyRoom('c_archive_surface', citadelMap, c_archive_surface),
   c_archive_exit: easyRoom('c_archive_exit', citadelMap, c_archive_exit)
};

rooms.register(citadelRooms);

saver.locations.register(text.s_save_citadel);

translator.addAsset('imCitadel$info', citadelMap);
translator.addAsset('imCitadel', citadelMap.image);
translator.addText('citadel', text);

CosmosUtils.status(`LOAD MODULE: CITADEL BOOTSTRAP (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
