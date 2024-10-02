import text from '../../languages/default/text/common';
import { content, context, soundOpts, sounds } from '../systems/assets';
import { atlas, maps, rooms, speech } from '../systems/core';
import { battler, easyRoom, keepActive, keyring, phone, portraits, saver } from '../systems/framework';
import { OutertaleMap, OutertaleSpeechPreset } from '../systems/outertale';
import { SAVE } from '../systems/save';
import { CosmosAnimation, CosmosDaemon, CosmosImage, CosmosSprite, CosmosUtils } from '../systems/storyteller';
import { translator } from '../systems/translator';
import { quickCall } from './extras';

import im_$info from '../../assets/images/maps/_.json?url';
import im_ from '../../assets/images/maps/_.png?url';

import _ from '../../rooms/_.json';
import _cockpit from '../../rooms/_cockpit.json';
import _credits1 from '../../rooms/_credits1.json';
import _credits2 from '../../rooms/_credits2.json';
import _credits3 from '../../rooms/_credits3.json';
import _credits4 from '../../rooms/_credits4.json';
import _frontier1 from '../../rooms/_frontier1.json';
import _frontier10 from '../../rooms/_frontier10.json';
import _frontier2 from '../../rooms/_frontier2.json';
import _frontier3 from '../../rooms/_frontier3.json';
import _frontier4 from '../../rooms/_frontier4.json';
import _frontier5 from '../../rooms/_frontier5.json';
import _frontier6 from '../../rooms/_frontier6.json';
import _frontier7 from '../../rooms/_frontier7.json';
import _frontier8 from '../../rooms/_frontier8.json';
import _frontier9 from '../../rooms/_frontier9.json';
import _hangar from '../../rooms/_hangar.json';
import _taxi from '../../rooms/_taxi.json';
import _void from '../../rooms/_void.json';

export const _map = new OutertaleMap(im_$info, new CosmosImage(im_));
_map.name = 'maps::_';

export const faces = {
   asrielPlain: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielPlain }),
   asrielPlainTrue: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielPlainTrue }),
   asrielBooped: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielBooped }),
   asrielCocky: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielCocky }),
   asrielEvil: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielEvil }),
   asrielEvilClosed: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielEvilClosed }),
   asrielFear: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielFear }),
   asrielFocus: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielFocus }),
   asrielFocusClosed: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielFocusClosed }),
   asrielFocusSide: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielFocusSide }),
   asrielFurrow: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielFurrow }),
   asrielHuh: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielHuh }),
   asrielOhReally: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielOhReally }),
   asrielOhReallyClosed: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielOhReallyClosed }),
   asrielPlainClosed: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielPlainClosed }),
   asrielSmirk: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielSmirk }),
   asrielSmirkHappy: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielSmirkHappy }),
   asrielBoopedTrue: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielBoopedTrue }),
   asrielCockyTrue: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielCockyTrue }),
   asrielDetermined: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielDetermined }),
   asrielEvilTrue: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielEvilTrue }),
   asrielEvilClosedTrue: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielEvilClosedTrue }),
   asrielFocusTrue: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielFocusTrue }),
   asrielFocusClosedTrue: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielFocusClosedTrue }),
   asrielFocusSideTrue: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielFocusSideTrue }),
   asrielFurrowTrue: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielFurrowTrue }),
   asrielHuhTrue: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielHuhTrue }),
   asrielOhReallyTrue: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielOhReallyTrue }),
   asrielOhReallyClosedTrue: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielOhReallyClosedTrue }),
   asrielPlainClosedTrue: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielPlainClosedTrue }),
   asrielSmirkTrue: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielSmirkTrue }),
   asrielSmirkHappyTrue: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielSmirkHappyTrue }),
   asrielNice: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielNice }),
   asrielKawaii: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielKawaii }),
   asrielNervous: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielNervous }),
   asrielExhaust: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielExhaust }),
   asrielGrateful: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielGrateful }),
   asrielHmmOkayICanKindaSeeWhereYouCominFrom: new CosmosAnimation({
      anchor: 0,
      resources: content.idcAsrielHmmOkayICanKindaSeeWhereYouCominFrom
   }),
   asrielSade1: new CosmosSprite({ anchor: 0, frames: [ content.idcAsrielSade1 ] }),
   asrielSade2: new CosmosSprite({ anchor: 0, frames: [ content.idcAsrielSade2 ] }),
   asrielSade3: new CosmosSprite({ anchor: 0, frames: [ content.idcAsrielSade3 ] }),
   asrielTakumi: new CosmosSprite({ anchor: 0, frames: [ content.idcAsrielTakumi ] }),
   asrielWink: new CosmosSprite({ anchor: 0, frames: [ content.idcAsrielWink ] }),
   asrielSussmile: new CosmosAnimation({ anchor: 0, resources: content.idcAsrielSussmile }),
   torielBlank: new CosmosSprite({ anchor: 0, frames: [ content.idcTorielBlank ] }),
   torielBlush: new CosmosAnimation({ anchor: 0, resources: content.idcTorielBlush }),
   torielCompassion: new CosmosAnimation({ anchor: 0, resources: content.idcTorielCompassion }),
   torielCompassionFrown: new CosmosAnimation({ anchor: 0, resources: content.idcTorielCompassionfrown }),
   torielCompassionSmile: new CosmosAnimation({ anchor: 0, resources: content.idcTorielCompassionsmile }),
   torielConcern: new CosmosAnimation({ anchor: 0, resources: content.idcTorielConcern }),
   torielCry: new CosmosAnimation({ anchor: 0, resources: content.idcTorielCry }),
   torielCryLaugh: new CosmosAnimation({ anchor: 0, resources: content.idcTorielCrylaugh }),
   torielCutscene1: new CosmosAnimation({ anchor: 0, resources: content.idcTorielCutscene1 }),
   torielCutscene2: new CosmosAnimation({ anchor: 0, resources: content.idcTorielCutscene2 }),
   torielDreamworks: new CosmosAnimation({ anchor: 0, resources: content.idcTorielDreamworks }),
   torielEverythingisfine: new CosmosAnimation({ anchor: 0, resources: content.idcTorielEverythingisfine }),
   torielIsMad: new CosmosAnimation({ anchor: 0, resources: content.idcTorielMad }),
   torielLowConcern: new CosmosAnimation({ anchor: 0, resources: content.idcTorielLowconcern }),
   torielSad: new CosmosAnimation({ anchor: 0, resources: content.idcTorielSad }),
   torielShock: new CosmosAnimation({ anchor: 0, resources: content.idcTorielShock }),
   torielSincere: new CosmosAnimation({ anchor: 0, resources: content.idcTorielSincere }),
   torielSmallXD: new CosmosAnimation({ anchor: 0, resources: content.idcTorielSmallxd }),
   torielStraightUp: new CosmosAnimation({ anchor: 0, resources: content.idcTorielStraightup }),
   torielSus: new CosmosSprite({ anchor: 0, frames: [ content.idcTorielSus ] }),
   torielWTF: new CosmosAnimation({ anchor: 0, resources: content.idcTorielWtf }),
   torielWTF2: new CosmosAnimation({ anchor: 0, resources: content.idcTorielWtf2 }),
   torielXD: new CosmosAnimation({ anchor: 0, resources: content.idcTorielXd }),
   torielTired: new CosmosAnimation({ anchor: 0, resources: content.idcTorielTired }),
   twinklyBroken: new CosmosAnimation({ anchor: 0, resources: content.idcTwinklyBroken }).on('tick', keepActive),
   twinklyCapping: new CosmosAnimation({ anchor: 0, resources: content.idcTwinklyCapping }),
   twinklyCrazed: new CosmosAnimation({ anchor: 0, resources: content.idcTwinklyCrazed }),
   twinklyDead: new CosmosAnimation({ anchor: 0, resources: content.idcTwinklyDead }).on('tick', keepActive),
   twinklyEvil: new CosmosAnimation({ anchor: 0, resources: content.idcTwinklyEvil }),
   twinklyGonk: new CosmosAnimation({ anchor: 0, resources: content.idcTwinklyGonk }),
   twinklyGrin: new CosmosAnimation({ anchor: 0, resources: content.idcTwinklyGrin }),
   twinklyHurt: new CosmosSprite({ anchor: 0, frames: [ content.idcTwinklyHurt ] }),
   twinklyKawaii: new CosmosAnimation({ anchor: 0, resources: content.idcTwinklyKawaii }),
   twinklyLaugh: new CosmosAnimation({ anchor: 0, resources: content.idcTwinklyLaugh }),
   twinklyNice: new CosmosAnimation({ anchor: 0, resources: content.idcTwinklyNice }),
   twinklyPissed: new CosmosAnimation({ anchor: 0, resources: content.idcTwinklyPissed }),
   twinklyPlain: new CosmosAnimation({ anchor: 0, resources: content.idcTwinklyPlain }),
   twinklySassy: new CosmosAnimation({ anchor: 0, resources: content.idcTwinklySassy }),
   twinklySide: new CosmosAnimation({ anchor: 0, resources: content.idcTwinklySide }),
   twinklyWink: new CosmosSprite({ anchor: 0, frames: [ content.idcTwinklyWink ] }),
   twinklyPlead: new CosmosSprite({ anchor: 0, frames: [ content.idcTwinklyPlead ] }),
   twinklyTwisted: new CosmosSprite({ anchor: 0, frames: [ content.idcTwinklyTwisted ] }),
   twinklyLose1: new CosmosSprite({ anchor: 0, frames: [ content.idcTwinklyLose1 ] }),
   twinklyLose2: new CosmosSprite({ anchor: 0, frames: [ content.idcTwinklyLose2 ] }),
   twinklyLose3: new CosmosSprite({ anchor: 0, frames: [ content.idcTwinklyLose3 ] }),
   twinklyLose4: new CosmosSprite({ anchor: 0, frames: [ content.idcTwinklyLose4 ] }),
   alphysCutscene1: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysCutscene1 ] }),
   alphysCutscene2: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysCutscene2 ] }),
   alphysCutscene3: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysCutscene3 ] }),
   alphysSmarmy: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysSmarmy ] }),
   alphysSmarmyAggressive: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysSmarmyAggressive ] }),
   alphysDontGetAllDreamyEyedOnMeNow: new CosmosSprite({
      anchor: 0,
      frames: [ content.idcAlphysDontGetAllDreamyEyedOnMeNow ]
   }),
   alphysFR: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysFr ] }),
   alphysGarbo: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysGarbo ] }),
   alphysGarboCenter: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysGarboCenter ] }),
   alphysHaveSomeCompassion: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysHaveSomeCompassion ] }),
   alphysHellYeah: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysHellYeah ] }),
   alphysIDK: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysIdk ] }),
   alphysIDK2: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysIdk2 ] }),
   alphysIDK3: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysIdk3 ] }),
   alphysInquisitive: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysInquisitive ] }),
   alphysNervousLaugh: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysNervousLaugh ] }),
   alphysNeutralSweat: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysNeutralSweat ] }),
   alphysOhGodNo: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysOhGodNo ] }),
   alphysShocked: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysShocked ] }),
   alphysSide: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysSide ] }),
   alphysSideSad: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysSideSad ] }),
   alphysSmileSweat: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysSmileSweat ] }),
   alphysSoAwesome: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysSoAwesome ] }),
   alphysThatSucks: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysThatSucks ] }),
   alphysTheFactIs: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysTheFactIs ] }),
   alphysUhButHeresTheDeal: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysUhButHeresTheDeal ] }),
   alphysWelp: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysWelp ] }),
   alphysWhyOhWhy: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysWhyOhWhy ] }),
   alphysWorried: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysWorried ] }),
   alphysWTF: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysWtf ] }),
   alphysWTF2: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysWtf2 ] }),
   alphysYeahYouKnowWhatsUp: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysYeahYouKnowWhatsUp ] }),
   alphysYeahYouKnowWhatsUpCenter: new CosmosSprite({
      anchor: 0,
      frames: [ content.idcAlphysYeahYouKnowWhatsUpCenter ]
   }),
   alphysYupEverythingsFine: new CosmosSprite({ anchor: 0, frames: [ content.idcAlphysYupEverythingsFine ] }),
   asgoreBouttacry: new CosmosAnimation({ anchor: 0, resources: content.idcAsgoreBouttacry }),
   asgoreCry1: new CosmosAnimation({ anchor: 0, resources: content.idcAsgoreCry1 }),
   asgoreCry2: new CosmosSprite({ anchor: 0, frames: [ content.idcAsgoreCry2 ] }),
   asgoreBlank: new CosmosSprite({ anchor: 0, frames: [ content.idcAsgoreBlank ] }),
   asgoreBound: new CosmosAnimation({ anchor: 0, resources: content.idcAsgoreBound }),
   asgoreBreak1: new CosmosSprite({ anchor: 0, frames: [ content.idcAsgoreBreak1 ] }),
   asgoreBreak2: new CosmosSprite({ anchor: 0, frames: [ content.idcAsgoreBreak2 ] }),
   asgoreContemplative: new CosmosAnimation({ anchor: 0, resources: content.idcAsgoreContemplative }),
   asgoreCutscene1: new CosmosAnimation({ anchor: 0, resources: content.idcAsgoreCutscene1 }),
   asgoreFunni: new CosmosAnimation({ anchor: 0, resources: content.idcAsgoreFunni }),
   asgoreHmph: new CosmosAnimation({ anchor: 0, resources: content.idcAsgoreHmph }),
   asgoreHmphClosed: new CosmosAnimation({ anchor: 0, resources: content.idcAsgoreHmphClosed }),
   asgoreHopeful: new CosmosAnimation({ anchor: 0, resources: content.idcAsgoreHopeful }),
   asgoreHopefulSide: new CosmosAnimation({ anchor: 0, resources: content.idcAsgoreHopefulSide }),
   asgoreItsHim: new CosmosSprite({ anchor: 0, frames: [ content.idcAsgoreItsHim ] }),
   asgoreMad: new CosmosAnimation({ anchor: 0, resources: content.idcAsgoreMad }),
   asgoreMadClosed: new CosmosAnimation({ anchor: 0, resources: content.idcAsgoreMadClosed }),
   asgorePensive: new CosmosAnimation({ anchor: 0, resources: content.idcAsgorePensive }),
   asgorePensiveSmile: new CosmosAnimation({ anchor: 0, resources: content.idcAsgorePensiveSmile }),
   asgoreSide: new CosmosAnimation({ anchor: 0, resources: content.idcAsgoreSide }),
   asgoreWhatHaveYouDone: new CosmosAnimation({ anchor: 0, resources: content.idcAsgoreWhatHaveYouDone }),
   asgoreWhatYouDoin: new CosmosAnimation({ anchor: 0, resources: content.idcAsgoreWhatYouDoin }),
   asgoreWat: new CosmosAnimation({ anchor: 0, resources: content.idcAsgoreWat }),
   asgoreLoverboy: new CosmosAnimation({ anchor: 0, resources: content.idcAsgoreLoverboy }),
   asgoreSmacked: new CosmosSprite({ anchor: 0, frames: [ content.idcAsgoreSmacked ] }),
   kiddCutscene1: new CosmosAnimation({ anchor: 0, resources: content.idcKiddCutscene1 }),
   kiddAww: new CosmosAnimation({ anchor: 0, resources: content.idcKiddAww }),
   kiddHuh: new CosmosAnimation({ anchor: 0, resources: content.idcKiddHuh }),
   kiddHuhSlave: new CosmosAnimation({ anchor: 0, resources: content.idcKiddHuhSlave }),
   kiddNeutral: new CosmosAnimation({ anchor: 0, resources: content.idcKiddNeutral }),
   kiddNeutralSlave: new CosmosAnimation({ anchor: 0, resources: content.idcKiddNeutralSlave }),
   kiddSerene: new CosmosAnimation({ anchor: 0, resources: content.idcKiddSerene }),
   kiddShocked: new CosmosAnimation({ anchor: 0, resources: content.idcKiddShocked }),
   kiddShockedSlave: new CosmosAnimation({ anchor: 0, resources: content.idcKiddShockedSlave }),
   kiddKiller: new CosmosAnimation({ anchor: 0, resources: content.idcKiddKiller }),
   kiddKillerSlave: new CosmosAnimation({ anchor: 0, resources: content.idcKiddKillerSlave }),
   kiddDetermined: new CosmosAnimation({ anchor: 0, resources: content.idcKiddDetermined }),
   kiddSide: new CosmosAnimation({ anchor: 0, resources: content.idcKiddSide }),
   kiddStarstruck: new CosmosAnimation({ anchor: 0, resources: content.idcKiddStarstruck }),
   mettatonNeo: new CosmosSprite({ anchor: 0, frames: [ content.idcMettatonNeo ] }),
   papyrusAYAYA: new CosmosAnimation({ anchor: 0, resources: content.idcPapyrusAYAYA }),
   papyrusAyoo: new CosmosAnimation({ anchor: 0, resources: content.idcPapyrusAyoo }),
   papyrusBattleAnime: new CosmosAnimation({ resources: content.ibcPapyrusAnime }),
   papyrusBattleBlank: new CosmosSprite({ frames: [ content.ibcPapyrusBlank ] }),
   papyrusBattleBlush: new CosmosSprite({ frames: [ content.ibcPapyrusBlush ] }),
   papyrusBattleBlushRefuse: new CosmosSprite({ frames: [ content.ibcPapyrusBlushRefuse ] }),
   papyrusBattleClosed: new CosmosAnimation({ resources: content.ibcPapyrusClosed }),
   papyrusBattleConfident: new CosmosAnimation({ resources: content.ibcPapyrusConfident }),
   papyrusBattleDeadpan: new CosmosSprite({ frames: [ content.ibcPapyrusDeadpan ] }),
   papyrusBattleDetermined: new CosmosSprite({ frames: [ content.ibcPapyrusDetermined ] }),
   papyrusBattleEyeroll: new CosmosSprite({ frames: [ content.ibcPapyrusEyeroll ] }),
   papyrusBattleFakeAnger: new CosmosSprite({ frames: [ content.ibcPapyrusFakeAnger ] }),
   papyrusBattleHapp: new CosmosAnimation({ resources: content.ibcPapyrusHapp }),
   papyrusBattleHappAgain: new CosmosSprite({ frames: [ content.ibcPapyrusHappAgain ] }),
   papyrusBattleMad: new CosmosAnimation({ resources: content.ibcPapyrusMad }),
   papyrusBattleNooo: new CosmosAnimation({ resources: content.ibcPapyrusNooo }),
   papyrusBattleOwwie: new CosmosSprite({ frames: [ content.ibcPapyrusOwwie ] }),
   papyrusBattleShock: new CosmosSprite({ frames: [ content.ibcPapyrusShock ] }),
   papyrusBattleSide: new CosmosSprite({ frames: [ content.ibcPapyrusSide ] }),
   papyrusBattleSly: new CosmosAnimation({ resources: content.ibcPapyrusSly }),
   papyrusBattleSmacked: new CosmosSprite({ frames: [ content.ibcPapyrusSmacked ] }),
   papyrusBattleSus: new CosmosSprite({ frames: [ content.ibcPapyrusSus ] }),
   papyrusBattleSweat: new CosmosAnimation({ resources: content.ibcPapyrusSweat }),
   papyrusBattleTopBlush: new CosmosSprite({ frames: [ content.ibcPapyrusTopBlush ] }),
   papyrusBattleWeary: new CosmosSprite({ frames: [ content.ibcPapyrusWeary ] }),
   papyrusCutscene1: new CosmosAnimation({ anchor: 0, resources: content.idcPapyrusCutscene1 }),
   papyrusDisbeef: new CosmosAnimation({ anchor: 0, resources: content.idcPapyrusDisbeef }),
   papyrusDisbeefTurnaround: new CosmosAnimation({ anchor: 0, resources: content.idcPapyrusDisbeefTurnaround }),
   papyrusIsThatSo: new CosmosAnimation({ anchor: 0, resources: content.idcPapyrusIsthatso }),
   papyrusNervousLaugh: new CosmosAnimation({ anchor: 0, resources: content.idcPapyrusNervousLaugh }),
   papyrusNervousSweat: new CosmosAnimation({ anchor: 0, resources: content.idcPapyrusNervousSweat }),
   papyrusNyeh: new CosmosAnimation({ anchor: 0, resources: content.idcPapyrusNyeh }),
   papyrusSad: new CosmosAnimation({ anchor: 0, resources: content.idcPapyrusSad }),
   papyrusSadSweat: new CosmosAnimation({ anchor: 0, resources: content.idcPapyrusSadSweat }),
   papyrusThisIsSoSad: new CosmosAnimation({ anchor: 0, resources: content.idcPapyrusThisissosad }),
   papyrusWhatchaGonnaDo: new CosmosAnimation({ anchor: 0, resources: content.idcPapyrusWhatchagonnado }),
   sansBlink: new CosmosSprite({ anchor: 0, frames: [ content.idcSansBlink ] }),
   sansBlinkTomato: new CosmosSprite({ anchor: 0, frames: [ content.idcSansBlinkTomato ] }),
   sansEmpty: new CosmosSprite({ anchor: 0, frames: [ content.idcSansEmpty ] }),
   sansEye: new CosmosAnimation({ active: true, anchor: 0, resources: content.idcSansEye }).on('tick', keepActive),
   sansLaugh1: new CosmosSprite({ anchor: 0, frames: [ content.idcSansLaugh1 ] }),
   sansLaugh2: new CosmosSprite({ anchor: 0, frames: [ content.idcSansLaugh2 ] }),
   sansNormal: new CosmosSprite({ anchor: 0, frames: [ content.idcSansNormal ] }),
   sansWink: new CosmosSprite({ anchor: 0, frames: [ content.idcSansWink ] }),
   sansWinkTomato: new CosmosSprite({ anchor: 0, frames: [ content.idcSansWinkTomato ] })
};

battler.acts.register(
   Object.fromEntries(Object.keys(text.b_act).map(key => [ key, () => text.b_act[key as keyof typeof text.b_act] ]))
);

maps.register('_', _map);

phone.register('keyring', {
   display () {
      return !SAVE.data.b.freedom && [ ...keyring.values() ].filter(value => value.display()).length > 0;
   },
   trigger () {
      atlas.switch('sidebarCellKey');
   },
   priority: -1000,
   name: () => text.c_name_common.keyring
});

phone.register('hello_asgore', {
   display () {
      return SAVE.data.b.freedom;
   },
   priority: 1.1,
   async trigger () {
      SAVE.flag.b._call = true;
      quickCall(true, ...text.c_call_common.hello[Math.min(SAVE.data.n.cell_hello_asgore++, 3)]);
   },
   name: () => text.c_name_common.hello_asgore
});

phone.register('about_asgore', {
   display () {
      return SAVE.data.b.freedom && !SAVE.data.b.cell_about_asgore_end;
   },
   priority: 1.2,
   async trigger () {
      SAVE.flag.b._call = true;
      if (SAVE.data.b.cell_about_asgore) {
         SAVE.data.b.cell_about_asgore_end = true;
         quickCall(true, ...text.c_call_common.about2);
      } else {
         SAVE.data.b.cell_about_asgore = true;
         quickCall(true, ...text.c_call_common.about1);
      }
   },
   name: () => text.c_name_common.about_asgore
});

phone.register('dad', {
   display () {
      return SAVE.data.b.freedom && !SAVE.data.b.cell_dad_end;
   },
   priority: 1.3,
   async trigger () {
      SAVE.flag.b._call = true;
      if (SAVE.data.b.cell_dad) {
         if (SAVE.data.b.cell_flirt_asgore) {
            SAVE.data.b.cell_dad_end = true;
            SAVE.data.b.cell_flirt_asgore_end = true;
            quickCall(true, ...text.c_call_common.dad3);
         } else {
            SAVE.data.b.cell_dad_end = true;
            quickCall(true, ...text.c_call_common.dad2);
         }
      } else {
         SAVE.data.b.cell_dad = true;
         quickCall(true, ...text.c_call_common.dad1);
      }
   },
   name: () => text.c_name_common.dad
});

phone.register('flirt_asgore', {
   display () {
      return SAVE.data.b.freedom && !SAVE.data.b.cell_flirt_asgore_end;
   },
   priority: 1.4,
   async trigger () {
      SAVE.flag.b._call = true;
      if (SAVE.data.b.cell_flirt_asgore) {
         if (SAVE.data.b.cell_dad) {
            SAVE.data.b.cell_dad_end = true;
            SAVE.data.b.cell_flirt_asgore_end = true;
            quickCall(true, ...text.c_call_common.flirt3);
         } else {
            SAVE.data.b.cell_flirt_asgore_end = true;
            quickCall(true, ...text.c_call_common.flirt2);
         }
      } else {
         SAVE.data.b.cell_flirt_asgore = true;
         quickCall(true, ...text.c_call_common.flirt1);
      }
   },
   name: () => text.c_name_common.flirt_asgore
});

phone.register('insult_asgore', {
   display () {
      return SAVE.data.b.freedom && SAVE.data.n.cell_insult_asgore < 2;
   },
   priority: 1.5,
   async trigger () {
      SAVE.flag.b._call = true;
      quickCall(true, ...[ text.c_call_common.insult1, text.c_call_common.insult2 ][SAVE.data.n.cell_insult_asgore++]());
   },
   name: () => text.c_name_common.insult_asgore
});

portraits.register(faces);

export const commonRooms = {
   _: easyRoom('_', _map, _),
   _void: easyRoom('_void', _map, _void),
   _taxi: easyRoom('_taxi', _map, _taxi),
   _cockpit: easyRoom('_cockpit', _map, _cockpit),
   _hangar: easyRoom('_hangar', _map, _hangar),
   _credits1: easyRoom('_credits1', _map, _credits1),
   _credits2: easyRoom('_credits2', _map, _credits2),
   _credits3: easyRoom('_credits3', _map, _credits3),
   _credits4: easyRoom('_credits4', _map, _credits4),
   _frontier1: easyRoom('_frontier1', _map, _frontier1),
   _frontier2: easyRoom('_frontier2', _map, _frontier2),
   _frontier3: easyRoom('_frontier3', _map, _frontier3),
   _frontier4: easyRoom('_frontier4', _map, _frontier4),
   _frontier5: easyRoom('_frontier5', _map, _frontier5),
   _frontier6: easyRoom('_frontier6', _map, _frontier6),
   _frontier7: easyRoom('_frontier7', _map, _frontier7),
   _frontier8: easyRoom('_frontier8', _map, _frontier8),
   _frontier9: easyRoom('_frontier9', _map, _frontier9),
   _frontier10: easyRoom('_frontier10', _map, _frontier10)
};

rooms.register(commonRooms);

saver.locations.register(text.s_save_common);

speech.presets.register({
   event: new OutertaleSpeechPreset({
      faces: [ null ],
      interval: 2,
      voices: [ null ],
      fontFamily1: content.fDeterminationMono,
      fontFamily2: content.fDotumChe
   }),
   human: new OutertaleSpeechPreset({
      faces: [ null ],
      interval: 2,
      voices: [
         [ new CosmosDaemon(content.avNarrator, soundOpts(1, 0.92)) ],
         [ new CosmosDaemon(content.avNarrator, soundOpts(1, 0.9)) ], // patience
         [ new CosmosDaemon(content.avNarrator, soundOpts(1, 1.1)) ], // bravery
         [ new CosmosDaemon(content.avNarrator, soundOpts(1, 1.05)) ], // integrity
         [ new CosmosDaemon(content.avNarrator, soundOpts(1, 0.85)) ], // perserverance
         [ new CosmosDaemon(content.avNarrator, soundOpts(1, 0.95)) ], // kindness
         [ new CosmosDaemon(content.avNarrator, soundOpts(1, 1.15)) ] // justice
      ],
      fontFamily1: content.fDeterminationMono,
      fontFamily2: content.fDotumChe
   }),
   basic: new OutertaleSpeechPreset({
      faces: [ null ],
      interval: 2,
      voices: [ [ new CosmosDaemon(content.avNarrator, soundOpts()) ] ],
      fontFamily1: content.fDeterminationMono,
      fontFamily2: content.fDotumChe
   }),
   story: new OutertaleSpeechPreset({
      faces: [ null ],
      interval: 2,
      voices: [ [ new CosmosDaemon(content.avStoryteller, soundOpts()) ] ],
      threshold: 0.019,
      fontFamily1: content.fDeterminationMono,
      fontFamily2: content.fDotumChe
   }),
   storyteller: new OutertaleSpeechPreset({
      faces: [ null ],
      interval: 3,
      voices: [
         [ sounds.storyteller ],
         [
            new CosmosDaemon(content.avStoryteller, {
               context,
               gain: sounds.storyteller.gain * 0.8,
               rate: sounds.storyteller.rate
            })
         ]
      ],
      threshold: 0.019,
      fontFamily1: content.fDeterminationMono,
      fontFamily2: content.fDotumChe
   })
});

translator.addAsset('im_$info', _map);
translator.addAsset('im_', _map.image);
translator.addText('common', text);

CosmosUtils.status(`LOAD MODULE: COMMON BOOTSTRAP (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
