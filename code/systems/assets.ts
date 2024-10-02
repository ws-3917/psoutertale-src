import { AdvancedBloomFilter } from '@pixi/filter-advanced-bloom';
import { CRTFilter } from '@pixi/filter-crt';
import { GlitchFilter } from '@pixi/filter-glitch';
import { GlowFilter } from '@pixi/filter-glow';
import { OutlineFilter } from '@pixi/filter-outline';
import sources from '../../languages/default/sources';
import {
   CosmosAnimationResources,
   CosmosAudio,
   CosmosAudioUtils,
   CosmosColor,
   CosmosDaemon,
   CosmosDaemonRouter,
   CosmosData,
   CosmosEffect,
   CosmosFont,
   CosmosFontInfo,
   CosmosImage,
   CosmosInventory,
   CosmosMath,
   CosmosMixer,
   CosmosRegistry,
   CosmosStringData,
   CosmosUtils
} from './storyteller';
import { translator } from './translator';

import amAerialis from '../../assets/audio/music/aerialis.mp3?url';
import amAerialisArchive from '../../assets/audio/music/aerialisArchive.mp3?url';
import amAerialisEmpty from '../../assets/audio/music/aerialisEmpty.mp3?url';
import amAmalgam from '../../assets/audio/music/amalgam.mp3?url';
import amApproach from '../../assets/audio/music/approach.mp3?url';
import amArchive from '../../assets/audio/music/archive.mp3?url';
import amArms from '../../assets/audio/music/arms.mp3?url';
import amArmsIntro from '../../assets/audio/music/armsIntro.mp3?url';
import amAsgore from '../../assets/audio/music/asgore.mp3?url';
import amAsrielboss from '../../assets/audio/music/asrielboss.mp3?url';
import amBarrier from '../../assets/audio/music/barrier.mp3?url';
import amBattle1 from '../../assets/audio/music/battle1.mp3?url';
import amBattle2 from '../../assets/audio/music/battle2.mp3?url';
import amBattle3 from '../../assets/audio/music/battle3.mp3?url';
import amBlookShop from '../../assets/audio/music/blookShop.mp3?url';
import amChara from '../../assets/audio/music/chara.mp3?url';
import amCharacutscene from '../../assets/audio/music/characutscene.mp3?url';
import amCharafinal from '../../assets/audio/music/charafinal.mp3?url';
import amChoice from '../../assets/audio/music/choice.mp3?url';
import amConfession from '../../assets/audio/music/confession.mp3?url';
import amCore from '../../assets/audio/music/core.mp3?url';
import amCredits1 from '../../assets/audio/music/credits1.mp3?url';
import amCredits2 from '../../assets/audio/music/credits2.mp3?url';
import amCredits3 from '../../assets/audio/music/credits3.mp3?url';
import amDatingfight from '../../assets/audio/music/datingfight.mp3?url';
import amDatingstart from '../../assets/audio/music/datingstart.mp3?url';
import amDatingtense from '../../assets/audio/music/datingtense.mp3?url';
import amDespair from '../../assets/audio/music/despair.mp3?url';
import amDespair2 from '../../assets/audio/music/despair2.mp3?url';
import amDjbeat from '../../assets/audio/music/djbeat.mp3?url';
import amDjbeatLoop from '../../assets/audio/music/djbeatLoop.mp3?url';
import amDogbass from '../../assets/audio/music/dogbass.mp3?url';
import amDogbeat from '../../assets/audio/music/dogbeat.mp3?url';
import amDogdance from '../../assets/audio/music/dogdance.mp3?url';
import amDogebattle from '../../assets/audio/music/dogebattle.mp3?url';
import amDogerelax from '../../assets/audio/music/dogerelax.mp3?url';
import amDogfreedom from '../../assets/audio/music/dogfreedom.mp3?url';
import amDogsigh from '../../assets/audio/music/dogsigh.mp3?url';
import amDogsong from '../../assets/audio/music/dogsong.mp3?url';
import amDontgiveup from '../../assets/audio/music/dontgiveup.mp3?url';
import amDrone from '../../assets/audio/music/drone.mp3?url';
import amDummyboss from '../../assets/audio/music/dummyboss.mp3?url';
import amEmotion from '../../assets/audio/music/emotion.mp3?url';
import amEnding from '../../assets/audio/music/ending.mp3?url';
import amEndingexcerpt from '../../assets/audio/music/endingexcerpt.mp3?url';
import amEndofdays from '../../assets/audio/music/endofdays.mp3?url';
import amFactory from '../../assets/audio/music/factory.mp3?url';
import amFactoryArchive from '../../assets/audio/music/factoryArchive.mp3?url';
import amFactoryEmpty from '../../assets/audio/music/factoryEmpty.mp3?url';
import amFactoryquiet from '../../assets/audio/music/factoryquiet.mp3?url';
import amFactoryquietArchive from '../../assets/audio/music/factoryquietArchive.mp3?url';
import amFactoryquietEmpty from '../../assets/audio/music/factoryquietEmpty.mp3?url';
import amFinalpower from '../../assets/audio/music/finalpower.mp3?url';
import amFlowey from '../../assets/audio/music/flowey.mp3?url';
import amForthefans from '../../assets/audio/music/forthefans.mp3?url';
import amGalactomania from '../../assets/audio/music/galactomania.mp3?url';
import amGalactomaniaFinal from '../../assets/audio/music/galactomaniaFinal.mp3?url';
import amGalactomaniaQuiet from '../../assets/audio/music/galactomaniaQuiet.mp3?url';
import amGameover from '../../assets/audio/music/gameover.mp3?url';
import amGameshow from '../../assets/audio/music/gameshow.mp3?url';
import amGenerator from '../../assets/audio/music/generator.mp3?url';
import amGhostbattle from '../../assets/audio/music/ghostbattle.mp3?url';
import amGloves from '../../assets/audio/music/gloves.mp3?url';
import amGlovesFinal from '../../assets/audio/music/glovesFinal.mp3?url';
import amGlovesIntro from '../../assets/audio/music/glovesIntro.mp3?url';
import amGrandfinale from '../../assets/audio/music/grandfinale.mp3?url';
import amHome from '../../assets/audio/music/home.mp3?url';
import amHomeAlt from '../../assets/audio/music/home_alt.mp3?url';
import amIdiot from '../../assets/audio/music/idiot.mp3?url';
import amKnightknightSting from '../../assets/audio/music/knightknight_sting.mp3?url';
import amLab from '../../assets/audio/music/lab.mp3?url';
import amLegs from '../../assets/audio/music/legs.mp3?url';
import amLegsIntro from '../../assets/audio/music/legsIntro.mp3?url';
import amLetsflyajetpackwhydontwe from '../../assets/audio/music/letsflyajetpackwhydontwe.mp3?url';
import amLetsmakeabombwhydontwe from '../../assets/audio/music/letsmakeabombwhydontwe.mp3?url';
import amMadjickSting from '../../assets/audio/music/madjick_sting.mp3?url';
import amMall from '../../assets/audio/music/mall.mp3?url';
import amMemory from '../../assets/audio/music/memory.mp3?url';
import amMenu0 from '../../assets/audio/music/menu0.mp3?url';
import amMenu1 from '../../assets/audio/music/menu1.mp3?url';
import amMenu2 from '../../assets/audio/music/menu2.mp3?url';
import amMenu3 from '../../assets/audio/music/menu3.mp3?url';
import amMenu4 from '../../assets/audio/music/menu4.mp3?url';
import amMettsuspense from '../../assets/audio/music/mettsuspense.mp3?url';
import amMuscle from '../../assets/audio/music/muscle.mp3?url';
import amMushroomdance from '../../assets/audio/music/mushroomdance.mp3?url';
import amNapstachords from '../../assets/audio/music/napstachords.mp3?url';
import amNapstahouse from '../../assets/audio/music/napstahouse.mp3?url';
import amNewworld from '../../assets/audio/music/newworld.mp3?url';
import amOhmy from '../../assets/audio/music/ohmy.mp3?url';
import amOpera from '../../assets/audio/music/opera.mp3?url';
import amOperaAlt from '../../assets/audio/music/opera_alt.mp3?url';
import amOutertale from '../../assets/audio/music/outertale.mp3?url';
import amOutlands from '../../assets/audio/music/outlands.mp3?url';
import amOutlandsArchive from '../../assets/audio/music/outlandsArchive.mp3?url';
import amPapyrus from '../../assets/audio/music/papyrus.mp3?url';
import amPapyrusboss from '../../assets/audio/music/papyrusboss.mp3?url';
import amPrebattle from '../../assets/audio/music/prebattle.mp3?url';
import amPredummy from '../../assets/audio/music/predummy.mp3?url';
import amPreshock from '../../assets/audio/music/preshock.mp3?url';
import amRadiosong from '../../assets/audio/music/radiosong.mp3?url';
import amRedacted from '../../assets/audio/music/redacted.mp3?url';
import amReunited from '../../assets/audio/music/reunited.mp3?url';
import amRise from '../../assets/audio/music/rise.mp3?url';
import amSansboss from '../../assets/audio/music/sansboss.mp3?url';
import amSansdate from '../../assets/audio/music/sansdate.mp3?url';
import amSaved from '../../assets/audio/music/saved.mp3?url';
import amSavetheworld from '../../assets/audio/music/savetheworld.mp3?url';
import amScramble from '../../assets/audio/music/scramble.mp3?url';
import amSecretsong from '../../assets/audio/music/secretsong.mp3?url';
import amSecretsongLoop from '../../assets/audio/music/secretsongLoop.mp3?url';
import amSexyrectangle from '../../assets/audio/music/sexyrectangle.mp3?url';
import amShock from '../../assets/audio/music/shock.mp3?url';
import amShop from '../../assets/audio/music/shop.mp3?url';
import amSng1 from '../../assets/audio/music/sng1.mp3?url';
import amSng10 from '../../assets/audio/music/sng10.mp3?url';
import amSng11 from '../../assets/audio/music/sng11.mp3?url';
import amSng12 from '../../assets/audio/music/sng12.mp3?url';
import amSng13 from '../../assets/audio/music/sng13.mp3?url';
import amSng2 from '../../assets/audio/music/sng2.mp3?url';
import amSng3 from '../../assets/audio/music/sng3.mp3?url';
import amSng4 from '../../assets/audio/music/sng4.mp3?url';
import amSng5 from '../../assets/audio/music/sng5.mp3?url';
import amSng6 from '../../assets/audio/music/sng6.mp3?url';
import amSng7 from '../../assets/audio/music/sng7.mp3?url';
import amSng8 from '../../assets/audio/music/sng8.mp3?url';
import amSng9 from '../../assets/audio/music/sng9.mp3?url';
import amSpecatk from '../../assets/audio/music/specatk.mp3?url';
import amSpiderboss from '../../assets/audio/music/spiderboss.mp3?url';
import amSpiderrelax from '../../assets/audio/music/spiderrelax.mp3?url';
import amSplendor from '../../assets/audio/music/splendor.mp3?url';
import amSpooktune from '../../assets/audio/music/spooktune.mp3?url';
import amSpookwaltz from '../../assets/audio/music/spookwaltz.mp3?url';
import amSpookwave from '../../assets/audio/music/spookwave.mp3?url';
import amSpookydate from '../../assets/audio/music/spookydate.mp3?url';
import amStarton from '../../assets/audio/music/starton.mp3?url';
import amStartonArchive from '../../assets/audio/music/startonArchive.mp3?url';
import amStartonEmpty from '../../assets/audio/music/startonEmpty.mp3?url';
import amStartonTown from '../../assets/audio/music/startonTown.mp3?url';
import amStartonTownEmpty from '../../assets/audio/music/startonTownEmpty.mp3?url';
import amStory from '../../assets/audio/music/story.mp3?url';
import amTemShop from '../../assets/audio/music/temShop.mp3?url';
import amTemmie from '../../assets/audio/music/temmie.mp3?url';
import amTension from '../../assets/audio/music/tension.mp3?url';
import amTerror from '../../assets/audio/music/terror.mp3?url';
import amTheend from '../../assets/audio/music/theend.mp3?url';
import amThriftShop from '../../assets/audio/music/thriftShop.mp3?url';
import amThundersnail from '../../assets/audio/music/thundersnail.mp3?url';
import amToriel from '../../assets/audio/music/toriel.mp3?url';
import amTorielboss from '../../assets/audio/music/torielboss.mp3?url';
import amUndyne from '../../assets/audio/music/undyne.mp3?url';
import amUndyneboss from '../../assets/audio/music/undyneboss.mp3?url';
import amUndynefast from '../../assets/audio/music/undynefast.mp3?url';
import amUndynegeno from '../../assets/audio/music/undynegeno.mp3?url';
import amUndynegenoFinal from '../../assets/audio/music/undynegenoFinal.mp3?url';
import amUndynegenoStart from '../../assets/audio/music/undynegenoStart.mp3?url';
import amUndynehelmet from '../../assets/audio/music/undynehelmet.mp3?url';
import amUndynepiano from '../../assets/audio/music/undynepiano.mp3?url';
import amUndynepre from '../../assets/audio/music/undynepre.mp3?url';
import amUndynepreboss from '../../assets/audio/music/undynepreboss.mp3?url';
import amUndynepregeno from '../../assets/audio/music/undynepregeno.mp3?url';
import amUwa from '../../assets/audio/music/uwa.mp3?url';
import amWrongenemy from '../../assets/audio/music/wrongenemy.mp3?url';
import amYouscreweduppal from '../../assets/audio/music/youscreweduppal.mp3?url';
import asAbreak1 from '../../assets/audio/sounds/abreak1.mp3?url';
import asAbreak2 from '../../assets/audio/sounds/abreak2.mp3?url';
import asAlphysfix from '../../assets/audio/sounds/alphysfix.mp3?url';
import asAppear from '../../assets/audio/sounds/appear.mp3?url';
import asApplause from '../../assets/audio/sounds/applause.mp3?url';
import asArrow from '../../assets/audio/sounds/arrow.mp3?url';
import asAsrielSparkle from '../../assets/audio/sounds/asriel_sparkle.mp3?url';
import asBad from '../../assets/audio/sounds/bad.mp3?url';
import asBahbye from '../../assets/audio/sounds/bahbye.mp3?url';
import asBark from '../../assets/audio/sounds/bark.mp3?url';
import asBattlefall from '../../assets/audio/sounds/battlefall.mp3?url';
import asBell from '../../assets/audio/sounds/bell.mp3?url';
import asBirds from '../../assets/audio/sounds/birds.mp3?url';
import asBoing from '../../assets/audio/sounds/boing.mp3?url';
import asBomb from '../../assets/audio/sounds/bomb.mp3?url';
import asBombfall from '../../assets/audio/sounds/bombfall.mp3?url';
import asBookspin from '../../assets/audio/sounds/bookspin.mp3?url';
import asBoom from '../../assets/audio/sounds/boom.mp3?url';
import asBreak from '../../assets/audio/sounds/break.mp3?url';
import asBuhbuhbuhdaadodaa from '../../assets/audio/sounds/buhbuhbuhdaadodaa.mp3?url';
import asBurst from '../../assets/audio/sounds/burst.mp3?url';
import asCackle from '../../assets/audio/sounds/cackle.mp3?url';
import asCast from '../../assets/audio/sounds/cast.mp3?url';
import asClap from '../../assets/audio/sounds/clap.mp3?url';
import asComputer from '../../assets/audio/sounds/computer.mp3?url';
import asCrickets from '../../assets/audio/sounds/crickets.mp3?url';
import asCrit from '../../assets/audio/sounds/crit.mp3?url';
import asCymbal from '../../assets/audio/sounds/cymbal.mp3?url';
import asDeeploop2 from '../../assets/audio/sounds/deeploop2.mp3?url';
import asDephase from '../../assets/audio/sounds/dephase.mp3?url';
import asDepower from '../../assets/audio/sounds/depower.mp3?url';
import asDestroyed from '../../assets/audio/sounds/destroyed.mp3?url';
import asDimbox from '../../assets/audio/sounds/dimbox.mp3?url';
import asDog from '../../assets/audio/sounds/dog.mp3?url';
import asDogsword from '../../assets/audio/sounds/dogsword.mp3?url';
import asDoor from '../../assets/audio/sounds/door.mp3?url';
import asDoorClose from '../../assets/audio/sounds/doorClose.mp3?url';
import asDrumroll from '../../assets/audio/sounds/drumroll.mp3?url';
import asDununnn from '../../assets/audio/sounds/dununnn.mp3?url';
import asElectrodoor from '../../assets/audio/sounds/electrodoor.mp3?url';
import asElectropulsar from '../../assets/audio/sounds/electropulsar.mp3?url';
import asElectropulse from '../../assets/audio/sounds/electropulse.mp3?url';
import asElevator from '../../assets/audio/sounds/elevator.mp3?url';
import asEpiphany from '../../assets/audio/sounds/epiphany.mp3?url';
import asEquip from '../../assets/audio/sounds/equip.mp3?url';
import asFear from '../../assets/audio/sounds/fear.mp3?url';
import asFrypan from '../../assets/audio/sounds/frypan.mp3?url';
import asGlassbreak from '../../assets/audio/sounds/glassbreak.mp3?url';
import asGonerCharge from '../../assets/audio/sounds/goner_charge.mp3?url';
import asGoodbye from '../../assets/audio/sounds/goodbye.mp3?url';
import asGrab from '../../assets/audio/sounds/grab.mp3?url';
import asGunshot from '../../assets/audio/sounds/gunshot.mp3?url';
import asHeal from '../../assets/audio/sounds/heal.mp3?url';
import asHeartshot from '../../assets/audio/sounds/heartshot.mp3?url';
import asHero from '../../assets/audio/sounds/hero.mp3?url';
import asHit from '../../assets/audio/sounds/hit.mp3?url';
import asHurt from '../../assets/audio/sounds/hurt.mp3?url';
import asImpact from '../../assets/audio/sounds/impact.mp3?url';
import asIndicator from '../../assets/audio/sounds/indicator.mp3?url';
import asJetpack from '../../assets/audio/sounds/jetpack.mp3?url';
import asJudgement from '../../assets/audio/sounds/judgement.mp3?url';
import asKick from '../../assets/audio/sounds/kick.mp3?url';
import asKnock from '../../assets/audio/sounds/knock.mp3?url';
import asLanding from '../../assets/audio/sounds/landing.mp3?url';
import asLightningstrike from '../../assets/audio/sounds/lightningstrike.mp3?url';
import asLongElevator from '../../assets/audio/sounds/long_elevator.mp3?url';
import asLove from '../../assets/audio/sounds/love.mp3?url';
import asMenu from '../../assets/audio/sounds/menu.mp3?url';
import asMeow from '../../assets/audio/sounds/meow.mp3?url';
import asMetapproach from '../../assets/audio/sounds/metapproach.mp3?url';
import asMonsterHurt1 from '../../assets/audio/sounds/monster_hurt1.mp3?url';
import asMonsterHurt2 from '../../assets/audio/sounds/monster_hurt2.mp3?url';
import asMultitarget from '../../assets/audio/sounds/multitarget.mp3?url';
import asMusMtYeah from '../../assets/audio/sounds/mus_mt_yeah.mp3?url';
import asMusOhyes from '../../assets/audio/sounds/mus_ohyes.mp3?url';
import asNode from '../../assets/audio/sounds/node.mp3?url';
import asNoise from '../../assets/audio/sounds/noise.mp3?url';
import asNote from '../../assets/audio/sounds/note.mp3?url';
import asNotify from '../../assets/audio/sounds/notify.mp3?url';
import asOops from '../../assets/audio/sounds/oops.mp3?url';
import asOrchhit from '../../assets/audio/sounds/orchhit.mp3?url';
import asPathway from '../../assets/audio/sounds/pathway.mp3?url';
import asPhase from '../../assets/audio/sounds/phase.mp3?url';
import asPhone from '../../assets/audio/sounds/phone.mp3?url';
import asPrebomb from '../../assets/audio/sounds/prebomb.mp3?url';
import asPunch1 from '../../assets/audio/sounds/punch1.mp3?url';
import asPunch2 from '../../assets/audio/sounds/punch2.mp3?url';
import asPurchase from '../../assets/audio/sounds/purchase.mp3?url';
import asQuickelectroshock from '../../assets/audio/sounds/quickelectroshock.mp3?url';
import asRain from '../../assets/audio/sounds/rain.mp3?url';
import asRainbowbeam from '../../assets/audio/sounds/rainbowbeam.mp3?url';
import asRetract from '../../assets/audio/sounds/retract.mp3?url';
import asRimshot from '../../assets/audio/sounds/rimshot.mp3?url';
import asRotate from '../../assets/audio/sounds/rotate.mp3?url';
import asRun from '../../assets/audio/sounds/run.mp3?url';
import asRustle from '../../assets/audio/sounds/rustle.mp3?url';
import asSaber3 from '../../assets/audio/sounds/saber3.mp3?url';
import asSave from '../../assets/audio/sounds/save.mp3?url';
import asSavior from '../../assets/audio/sounds/savior.mp3?url';
import asSega from '../../assets/audio/sounds/sega.mp3?url';
import asSelect from '../../assets/audio/sounds/select.mp3?url';
import asShake from '../../assets/audio/sounds/shake.mp3?url';
import asShatter from '../../assets/audio/sounds/shatter.mp3?url';
import asShock from '../../assets/audio/sounds/shock.mp3?url';
import asSigstar2 from '../../assets/audio/sounds/sigstar2.mp3?url';
import asSingBad1 from '../../assets/audio/sounds/sing_bad1.mp3?url';
import asSingBad2 from '../../assets/audio/sounds/sing_bad2.mp3?url';
import asSingBad3 from '../../assets/audio/sounds/sing_bad3.mp3?url';
import asSingBass1 from '../../assets/audio/sounds/sing_bass1.mp3?url';
import asSingBass2 from '../../assets/audio/sounds/sing_bass2.mp3?url';
import asSingTreble1 from '../../assets/audio/sounds/sing_treble1.mp3?url';
import asSingTreble2 from '../../assets/audio/sounds/sing_treble2.mp3?url';
import asSingTreble3 from '../../assets/audio/sounds/sing_treble3.mp3?url';
import asSingTreble4 from '../../assets/audio/sounds/sing_treble4.mp3?url';
import asSingTreble5 from '../../assets/audio/sounds/sing_treble5.mp3?url';
import asSingTreble6 from '../../assets/audio/sounds/sing_treble6.mp3?url';
import asSlidewhistle from '../../assets/audio/sounds/slidewhistle.mp3?url';
import asSparkle from '../../assets/audio/sounds/sparkle.mp3?url';
import asSpecin from '../../assets/audio/sounds/specin.mp3?url';
import asSpecout from '../../assets/audio/sounds/specout.mp3?url';
import asSpeed from '../../assets/audio/sounds/speed.mp3?url';
import asSpiderLaugh from '../../assets/audio/sounds/spider_laugh.mp3?url';
import asSplash from '../../assets/audio/sounds/splash.mp3?url';
import asSpooky from '../../assets/audio/sounds/spooky.mp3?url';
import asSqueak from '../../assets/audio/sounds/squeak.mp3?url';
import asStab from '../../assets/audio/sounds/stab.mp3?url';
import asStarfall from '../../assets/audio/sounds/starfall.mp3?url';
import asStatic from '../../assets/audio/sounds/static.mp3?url';
import asStep from '../../assets/audio/sounds/step.mp3?url';
import asStomp from '../../assets/audio/sounds/stomp.mp3?url';
import asStrike from '../../assets/audio/sounds/strike.mp3?url';
import asSuperstrike from '../../assets/audio/sounds/superstrike.mp3?url';
import asSwallow from '../../assets/audio/sounds/swallow.mp3?url';
import asSwing from '../../assets/audio/sounds/swing.mp3?url';
import asSwipe from '../../assets/audio/sounds/swipe.mp3?url';
import asSwitch from '../../assets/audio/sounds/switch.mp3?url';
import asSword from '../../assets/audio/sounds/sword.mp3?url';
import asTarget from '../../assets/audio/sounds/target.mp3?url';
import asTextnoise from '../../assets/audio/sounds/textnoise.mp3?url';
import asTrombone from '../../assets/audio/sounds/trombone.mp3?url';
import asTv from '../../assets/audio/sounds/tv.mp3?url';
import asTwinklyHurt from '../../assets/audio/sounds/twinkly_hurt.mp3?url';
import asTwinklyLaugh from '../../assets/audio/sounds/twinkly_laugh.mp3?url';
import asUpgrade from '../../assets/audio/sounds/upgrade.mp3?url';
import asWarpIn from '../../assets/audio/sounds/warp_in.mp3?url';
import asWarpOut from '../../assets/audio/sounds/warp_out.mp3?url';
import asWarpSpeed from '../../assets/audio/sounds/warp_speed.mp3?url';
import asWhimper from '../../assets/audio/sounds/whimper.mp3?url';
import asWhipcrack from '../../assets/audio/sounds/whipcrack.mp3?url';
import asWhoopee from '../../assets/audio/sounds/whoopee.mp3?url';
import asWind from '../../assets/audio/sounds/wind.mp3?url';
import avAlphys from '../../assets/audio/voices/alphys.mp3?url';
import avAsgore from '../../assets/audio/voices/asgore.mp3?url';
import avAsriel from '../../assets/audio/voices/asriel.mp3?url';
import avAsriel2 from '../../assets/audio/voices/asriel2.mp3?url';
import avAsriel3 from '../../assets/audio/voices/asriel3.mp3?url';
import avAsriel4 from '../../assets/audio/voices/asriel4.mp3?url';
import avKidd from '../../assets/audio/voices/kidd.mp3?url';
import avMettaton1 from '../../assets/audio/voices/mettaton1.mp3?url';
import avMettaton2 from '../../assets/audio/voices/mettaton2.mp3?url';
import avMettaton3 from '../../assets/audio/voices/mettaton3.mp3?url';
import avMettaton4 from '../../assets/audio/voices/mettaton4.mp3?url';
import avMettaton5 from '../../assets/audio/voices/mettaton5.mp3?url';
import avMettaton6 from '../../assets/audio/voices/mettaton6.mp3?url';
import avMettaton7 from '../../assets/audio/voices/mettaton7.mp3?url';
import avMettaton8 from '../../assets/audio/voices/mettaton8.mp3?url';
import avNapstablook from '../../assets/audio/voices/napstablook.mp3?url';
import avNarrator from '../../assets/audio/voices/narrator.mp3?url';
import avPapyrus from '../../assets/audio/voices/papyrus.mp3?url';
import avSans from '../../assets/audio/voices/sans.mp3?url';
import avSoriel from '../../assets/audio/voices/soriel.mp3?url';
import avStoryteller from '../../assets/audio/voices/storyteller.mp3?url';
import avTem1 from '../../assets/audio/voices/tem1.mp3?url';
import avTem2 from '../../assets/audio/voices/tem2.mp3?url';
import avTem3 from '../../assets/audio/voices/tem3.mp3?url';
import avTem4 from '../../assets/audio/voices/tem4.mp3?url';
import avTem5 from '../../assets/audio/voices/tem5.mp3?url';
import avTem6 from '../../assets/audio/voices/tem6.mp3?url';
import avToriel from '../../assets/audio/voices/toriel.mp3?url';
import avTwinkly1 from '../../assets/audio/voices/twinkly1.mp3?url';
import avTwinkly2 from '../../assets/audio/voices/twinkly2.mp3?url';
import avUndyne from '../../assets/audio/voices/undyne.mp3?url';
import avUndyneex from '../../assets/audio/voices/undyneex.mp3?url';
import ibBlue$info from '../../assets/images/backdrops/blue.json?url';
import ibBlue from '../../assets/images/backdrops/blue.png?url';
import ibGalaxy$info from '../../assets/images/backdrops/galaxy.json?url';
import ibGalaxy from '../../assets/images/backdrops/galaxy.png?url';
import ibGrey$info from '../../assets/images/backdrops/grey.json?url';
import ibGrey from '../../assets/images/backdrops/grey.png?url';
import ibbArccircle from '../../assets/images/battleBullets/arccircle.png?url';
import ibbArmBullet$info from '../../assets/images/battleBullets/armBullet.json?url';
import ibbArmBullet from '../../assets/images/battleBullets/armBullet.png?url';
import ibbArrow$info from '../../assets/images/battleBullets/arrow.json?url';
import ibbArrow from '../../assets/images/battleBullets/arrow.png?url';
import ibbArrowportal$info from '../../assets/images/battleBullets/arrowportal.json?url';
import ibbArrowportal from '../../assets/images/battleBullets/arrowportal.png?url';
import ibbAsteroid$info from '../../assets/images/battleBullets/asteroid.json?url';
import ibbAsteroid from '../../assets/images/battleBullets/asteroid.png?url';
import ibbAsteroidfragment$info from '../../assets/images/battleBullets/asteroidfragment.json?url';
import ibbAsteroidfragment from '../../assets/images/battleBullets/asteroidfragment.png?url';
import ibbAwesomesword from '../../assets/images/battleBullets/awesomesword.png?url';
import ibbAx$info from '../../assets/images/battleBullets/ax.json?url';
import ibbAx from '../../assets/images/battleBullets/ax.png?url';
import ibbBeaker1$info from '../../assets/images/battleBullets/beaker1.json?url';
import ibbBeaker1 from '../../assets/images/battleBullets/beaker1.png?url';
import ibbBeaker2$info from '../../assets/images/battleBullets/beaker2.json?url';
import ibbBeaker2 from '../../assets/images/battleBullets/beaker2.png?url';
import ibbBeaker3$info from '../../assets/images/battleBullets/beaker3.json?url';
import ibbBeaker3 from '../../assets/images/battleBullets/beaker3.png?url';
import ibbBeamcircle from '../../assets/images/battleBullets/beamcircle.png?url';
import ibbBeamstrip from '../../assets/images/battleBullets/beamstrip.png?url';
import ibbBigblaster from '../../assets/images/battleBullets/bigblaster.png?url';
import ibbBigbolt$info from '../../assets/images/battleBullets/bigbolt.json?url';
import ibbBigbolt from '../../assets/images/battleBullets/bigbolt.png?url';
import ibbBird$info from '../../assets/images/battleBullets/bird.json?url';
import ibbBird from '../../assets/images/battleBullets/bird.png?url';
import ibbBirdfront$info from '../../assets/images/battleBullets/birdfront.json?url';
import ibbBirdfront from '../../assets/images/battleBullets/birdfront.png?url';
import ibbBlastship from '../../assets/images/battleBullets/blastship.png?url';
import ibbBluelightning$info from '../../assets/images/battleBullets/bluelightning.json?url';
import ibbBluelightning from '../../assets/images/battleBullets/bluelightning.png?url';
import ibbBomb$info from '../../assets/images/battleBullets/bomb.json?url';
import ibbBomb from '../../assets/images/battleBullets/bomb.png?url';
import ibbBone$info from '../../assets/images/battleBullets/bone.json?url';
import ibbBone from '../../assets/images/battleBullets/bone.png?url';
import ibbBonesection from '../../assets/images/battleBullets/bonesection.png?url';
import ibbBoombox from '../../assets/images/battleBullets/boombox.png?url';
import ibbBoomboxRing from '../../assets/images/battleBullets/boomboxRing.png?url';
import ibbBoxBullet from '../../assets/images/battleBullets/boxBullet.png?url';
import ibbBoxBulletSplode from '../../assets/images/battleBullets/boxBulletSplode.png?url';
import ibbBoxBulletUp from '../../assets/images/battleBullets/boxBulletUp.png?url';
import ibbBuzzlightning$info from '../../assets/images/battleBullets/buzzlightning.json?url';
import ibbBuzzlightning from '../../assets/images/battleBullets/buzzlightning.png?url';
import ibbBuzzpillar$info from '../../assets/images/battleBullets/buzzpillar.json?url';
import ibbBuzzpillar from '../../assets/images/battleBullets/buzzpillar.png?url';
import ibbCheese from '../../assets/images/battleBullets/cheese.png?url';
import ibbCircle1 from '../../assets/images/battleBullets/circle1.png?url';
import ibbCircle2 from '../../assets/images/battleBullets/circle2.png?url';
import ibbCircle3 from '../../assets/images/battleBullets/circle3.png?url';
import ibbCircle4 from '../../assets/images/battleBullets/circle4.png?url';
import ibbCirclestar from '../../assets/images/battleBullets/circlestar.png?url';
import ibbCrosshair from '../../assets/images/battleBullets/crosshair.png?url';
import ibbCrossiant from '../../assets/images/battleBullets/crossiant.png?url';
import ibbCrossiantOutline from '../../assets/images/battleBullets/crossiantOutline.png?url';
import ibbCupcake from '../../assets/images/battleBullets/cupcake.png?url';
import ibbCupcakeAttack$info from '../../assets/images/battleBullets/cupcakeAttack.json?url';
import ibbCupcakeAttack from '../../assets/images/battleBullets/cupcakeAttack.png?url';
import ibbDonut from '../../assets/images/battleBullets/donut.png?url';
import ibbDonutOutline from '../../assets/images/battleBullets/donutOutline.png?url';
import ibbDummy$info from '../../assets/images/battleBullets/dummy.json?url';
import ibbDummy from '../../assets/images/battleBullets/dummy.png?url';
import ibbDummyknife from '../../assets/images/battleBullets/dummyknife.png?url';
import ibbExBombBlastCore$info from '../../assets/images/battleBullets/exBombBlastCore.json?url';
import ibbExBombBlastCore from '../../assets/images/battleBullets/exBombBlastCore.png?url';
import ibbExBombBlastRay$info from '../../assets/images/battleBullets/exBombBlastRay.json?url';
import ibbExBombBlastRay from '../../assets/images/battleBullets/exBombBlastRay.png?url';
import ibbExHeart$info from '../../assets/images/battleBullets/exHeart.json?url';
import ibbExHeart from '../../assets/images/battleBullets/exHeart.png?url';
import ibbExKiss from '../../assets/images/battleBullets/exKiss.png?url';
import ibbExShine$info from '../../assets/images/battleBullets/exShine.json?url';
import ibbExShine from '../../assets/images/battleBullets/exShine.png?url';
import ibbExTiny1$info from '../../assets/images/battleBullets/exTiny1.json?url';
import ibbExTiny1 from '../../assets/images/battleBullets/exTiny1.png?url';
import ibbExTiny2$info from '../../assets/images/battleBullets/exTiny2.json?url';
import ibbExTiny2 from '../../assets/images/battleBullets/exTiny2.png?url';
import ibbExTiny3$info from '../../assets/images/battleBullets/exTiny3.json?url';
import ibbExTiny3 from '../../assets/images/battleBullets/exTiny3.png?url';
import ibbExplosion from '../../assets/images/battleBullets/explosion.png?url';
import ibbEyecone from '../../assets/images/battleBullets/eyecone.png?url';
import ibbFadeline from '../../assets/images/battleBullets/fadeline.png?url';
import ibbFalchion from '../../assets/images/battleBullets/falchion.png?url';
import ibbFeather from '../../assets/images/battleBullets/feather.png?url';
import ibbFirebol$info from '../../assets/images/battleBullets/firebol.json?url';
import ibbFirebol from '../../assets/images/battleBullets/firebol.png?url';
import ibbFirework$info from '../../assets/images/battleBullets/firework.json?url';
import ibbFirework from '../../assets/images/battleBullets/firework.png?url';
import ibbFrisbee$info from '../../assets/images/battleBullets/frisbee.json?url';
import ibbFrisbee from '../../assets/images/battleBullets/frisbee.png?url';
import ibbFrogfly$info from '../../assets/images/battleBullets/frogfly.json?url';
import ibbFrogfly from '../../assets/images/battleBullets/frogfly.png?url';
import ibbFroglegs from '../../assets/images/battleBullets/froglegs.png?url';
import ibbFrogstar$info from '../../assets/images/battleBullets/frogstar.json?url';
import ibbFrogstar from '../../assets/images/battleBullets/frogstar.png?url';
import ibbFrogstop from '../../assets/images/battleBullets/frogstop.png?url';
import ibbGalaxystar from '../../assets/images/battleBullets/galaxystar.png?url';
import ibbGelatin from '../../assets/images/battleBullets/gelatin.png?url';
import ibbGelatslab from '../../assets/images/battleBullets/gelatslab.png?url';
import ibbGlitter$info from '../../assets/images/battleBullets/glitter.json?url';
import ibbGlitter from '../../assets/images/battleBullets/glitter.png?url';
import ibbGunarm from '../../assets/images/battleBullets/gunarm.png?url';
import ibbHarknessbac from '../../assets/images/battleBullets/harknessbac.png?url';
import ibbHarknessgun$info from '../../assets/images/battleBullets/harknessgun.json?url';
import ibbHarknessgun from '../../assets/images/battleBullets/harknessgun.png?url';
import ibbHat from '../../assets/images/battleBullets/hat.png?url';
import ibbHaymaker from '../../assets/images/battleBullets/haymaker.png?url';
import ibbHeadset from '../../assets/images/battleBullets/headset.png?url';
import ibbHeart$info from '../../assets/images/battleBullets/heart.json?url';
import ibbHeart from '../../assets/images/battleBullets/heart.png?url';
import ibbHinge$info from '../../assets/images/battleBullets/hinge.json?url';
import ibbHinge from '../../assets/images/battleBullets/hinge.png?url';
import ibbHypergrid from '../../assets/images/battleBullets/hypergrid.png?url';
import ibbHypno$info from '../../assets/images/battleBullets/hypno.json?url';
import ibbHypno from '../../assets/images/battleBullets/hypno.png?url';
import ibbLabber1 from '../../assets/images/battleBullets/labber1.png?url';
import ibbLabber1Outline from '../../assets/images/battleBullets/labber1Outline.png?url';
import ibbLabber2 from '../../assets/images/battleBullets/labber2.png?url';
import ibbLabber2Outline from '../../assets/images/battleBullets/labber2Outline.png?url';
import ibbLabber3$info from '../../assets/images/battleBullets/labber3.json?url';
import ibbLabber3 from '../../assets/images/battleBullets/labber3.png?url';
import ibbLabber3Yellow$info from '../../assets/images/battleBullets/labber3Yellow.json?url';
import ibbLabber3Yellow from '../../assets/images/battleBullets/labber3Yellow.png?url';
import ibbLaserEmitter from '../../assets/images/battleBullets/laser_emitter.png?url';
import ibbLegBullet from '../../assets/images/battleBullets/legBullet.png?url';
import ibbLegendarysword from '../../assets/images/battleBullets/legendarysword.png?url';
import ibbLightning$info from '../../assets/images/battleBullets/lightning.json?url';
import ibbLightning from '../../assets/images/battleBullets/lightning.png?url';
import ibbLightningEmitter$info from '../../assets/images/battleBullets/lightningEmitter.json?url';
import ibbLightningEmitter from '../../assets/images/battleBullets/lightningEmitter.png?url';
import ibbLily from '../../assets/images/battleBullets/lily.png?url';
import ibbLinecarrier from '../../assets/images/battleBullets/linecarrier.png?url';
import ibbLiteralBullet from '../../assets/images/battleBullets/literalBullet.png?url';
import ibbLithium$info from '../../assets/images/battleBullets/lithium.json?url';
import ibbLithium from '../../assets/images/battleBullets/lithium.png?url';
import ibbMeteor$info from '../../assets/images/battleBullets/meteor.json?url';
import ibbMeteor from '../../assets/images/battleBullets/meteor.png?url';
import ibbMigosp$info from '../../assets/images/battleBullets/migosp.json?url';
import ibbMigosp from '../../assets/images/battleBullets/migosp.png?url';
import ibbMirror from '../../assets/images/battleBullets/mirror.png?url';
import ibbMirrorLarge from '../../assets/images/battleBullets/mirrorLarge.png?url';
import ibbMissile$info from '../../assets/images/battleBullets/missile.json?url';
import ibbMissile from '../../assets/images/battleBullets/missile.png?url';
import ibbMobile$info from '../../assets/images/battleBullets/mobile.json?url';
import ibbMobile from '../../assets/images/battleBullets/mobile.png?url';
import ibbMoon from '../../assets/images/battleBullets/moon.png?url';
import ibbMouse$info from '../../assets/images/battleBullets/mouse.json?url';
import ibbMouse from '../../assets/images/battleBullets/mouse.png?url';
import ibbNeoRocket$info from '../../assets/images/battleBullets/neoRocket.json?url';
import ibbNeoRocket from '../../assets/images/battleBullets/neoRocket.png?url';
import ibbNeoTiny1$info from '../../assets/images/battleBullets/neoTiny1.json?url';
import ibbNeoTiny1 from '../../assets/images/battleBullets/neoTiny1.png?url';
import ibbNeoTiny1a$info from '../../assets/images/battleBullets/neoTiny1a.json?url';
import ibbNeoTiny1a from '../../assets/images/battleBullets/neoTiny1a.png?url';
import ibbNeoTiny2 from '../../assets/images/battleBullets/neoTiny2.png?url';
import ibbNote$info from '../../assets/images/battleBullets/note.json?url';
import ibbNote from '../../assets/images/battleBullets/note.png?url';
import ibbNuker from '../../assets/images/battleBullets/nuker.png?url';
import ibbOctagon from '../../assets/images/battleBullets/octagon.png?url';
import ibbOrb from '../../assets/images/battleBullets/orb.png?url';
import ibbPaw from '../../assets/images/battleBullets/paw.png?url';
import ibbPawInverted from '../../assets/images/battleBullets/paw_inverted.png?url';
import ibbPellet from '../../assets/images/battleBullets/pellet.png?url';
import ibbPipe from '../../assets/images/battleBullets/pipe.png?url';
import ibbPlanet from '../../assets/images/battleBullets/planet.png?url';
import ibbPlusSign from '../../assets/images/battleBullets/plusSign.png?url';
import ibbPomSad from '../../assets/images/battleBullets/pomSad.png?url';
import ibbPombark from '../../assets/images/battleBullets/pombark.png?url';
import ibbPombarkSad from '../../assets/images/battleBullets/pombarkSad.png?url';
import ibbPomjump from '../../assets/images/battleBullets/pomjump.png?url';
import ibbPomjumpSad from '../../assets/images/battleBullets/pomjumpSad.png?url';
import ibbPomsleep$info from '../../assets/images/battleBullets/pomsleep.json?url';
import ibbPomsleep from '../../assets/images/battleBullets/pomsleep.png?url';
import ibbPomwag$info from '../../assets/images/battleBullets/pomwag.json?url';
import ibbPomwag from '../../assets/images/battleBullets/pomwag.png?url';
import ibbPomwake$info from '../../assets/images/battleBullets/pomwake.json?url';
import ibbPomwake from '../../assets/images/battleBullets/pomwake.png?url';
import ibbPomwalk$info from '../../assets/images/battleBullets/pomwalk.json?url';
import ibbPomwalk from '../../assets/images/battleBullets/pomwalk.png?url';
import ibbPomwalkSad$info from '../../assets/images/battleBullets/pomwalkSad.json?url';
import ibbPomwalkSad from '../../assets/images/battleBullets/pomwalkSad.png?url';
import ibbPyropebomb$info from '../../assets/images/battleBullets/pyropebomb.json?url';
import ibbPyropebomb from '../../assets/images/battleBullets/pyropebomb.png?url';
import ibbPyropefire$info from '../../assets/images/battleBullets/pyropefire.json?url';
import ibbPyropefire from '../../assets/images/battleBullets/pyropefire.png?url';
import ibbRadialshock$info from '../../assets/images/battleBullets/radialshock.json?url';
import ibbRadialshock from '../../assets/images/battleBullets/radialshock.png?url';
import ibbRedspear from '../../assets/images/battleBullets/redspear.png?url';
import ibbRoachfly$info from '../../assets/images/battleBullets/roachfly.json?url';
import ibbRoachfly from '../../assets/images/battleBullets/roachfly.png?url';
import ibbRope from '../../assets/images/battleBullets/rope.png?url';
import ibbScissors from '../../assets/images/battleBullets/scissors.png?url';
import ibbScribble$info from '../../assets/images/battleBullets/scribble.json?url';
import ibbScribble from '../../assets/images/battleBullets/scribble.png?url';
import ibbShield$info from '../../assets/images/battleBullets/shield.json?url';
import ibbShield from '../../assets/images/battleBullets/shield.png?url';
import ibbSkrubber from '../../assets/images/battleBullets/skrubber.png?url';
import ibbSmolbol$info from '../../assets/images/battleBullets/smolbol.json?url';
import ibbSmolbol from '../../assets/images/battleBullets/smolbol.png?url';
import ibbSoap from '../../assets/images/battleBullets/soap.png?url';
import ibbSoda from '../../assets/images/battleBullets/soda.png?url';
import ibbSpear$info from '../../assets/images/battleBullets/spear.json?url';
import ibbSpear from '../../assets/images/battleBullets/spear.png?url';
import ibbSpecatk$info from '../../assets/images/battleBullets/specatk.json?url';
import ibbSpecatk from '../../assets/images/battleBullets/specatk.png?url';
import ibbSpecatkBone from '../../assets/images/battleBullets/specatkBone.png?url';
import ibbSpider from '../../assets/images/battleBullets/spider.png?url';
import ibbSpiderOutline from '../../assets/images/battleBullets/spiderOutline.png?url';
import ibbStardent from '../../assets/images/battleBullets/stardent.png?url';
import ibbStardrop from '../../assets/images/battleBullets/stardrop.png?url';
import ibbStarfly$info from '../../assets/images/battleBullets/starfly.json?url';
import ibbStarfly from '../../assets/images/battleBullets/starfly.png?url';
import ibbSword from '../../assets/images/battleBullets/sword.png?url';
import ibbTank$info from '../../assets/images/battleBullets/tank.json?url';
import ibbTank from '../../assets/images/battleBullets/tank.png?url';
import ibbTankarm from '../../assets/images/battleBullets/tankarm.png?url';
import ibbTear from '../../assets/images/battleBullets/tear.png?url';
import ibbTheMoves$info from '../../assets/images/battleBullets/theMoves.json?url';
import ibbTheMoves from '../../assets/images/battleBullets/theMoves.png?url';
import ibbTiparrow from '../../assets/images/battleBullets/tiparrow.png?url';
import ibbTongue from '../../assets/images/battleBullets/tongue.png?url';
import ibbToothbot from '../../assets/images/battleBullets/toothbot.png?url';
import ibbToothsingle from '../../assets/images/battleBullets/toothsingle.png?url';
import ibbToothtop from '../../assets/images/battleBullets/toothtop.png?url';
import ibbTree$info from '../../assets/images/battleBullets/tree.json?url';
import ibbTree from '../../assets/images/battleBullets/tree.png?url';
import ibbUltima from '../../assets/images/battleBullets/ultima.png?url';
import ibbVertship$info from '../../assets/images/battleBullets/vertship.json?url';
import ibbVertship from '../../assets/images/battleBullets/vertship.png?url';
import ibbWarningreticle$info from '../../assets/images/battleBullets/warningreticle.json?url';
import ibbWarningreticle from '../../assets/images/battleBullets/warningreticle.png?url';
import ibbWater$info from '../../assets/images/battleBullets/water.json?url';
import ibbWater from '../../assets/images/battleBullets/water.png?url';
import ibbWaterwall$info from '../../assets/images/battleBullets/waterwall.json?url';
import ibbWaterwall from '../../assets/images/battleBullets/waterwall.png?url';
import ibbWave$info from '../../assets/images/battleBullets/wave.json?url';
import ibbWave from '../../assets/images/battleBullets/wave.png?url';
import ibbWhitelightning$info from '../../assets/images/battleBullets/whitelightning.json?url';
import ibbWhitelightning from '../../assets/images/battleBullets/whitelightning.png?url';
import ibbYarn$info from '../../assets/images/battleBullets/yarn.json?url';
import ibbYarn from '../../assets/images/battleBullets/yarn.png?url';
import ibcAlphysBody$info from '../../assets/images/battleCharacters/alphys/body.json?url';
import ibcAlphysBody from '../../assets/images/battleCharacters/alphys/body.png?url';
import ibcAlphysFeet from '../../assets/images/battleCharacters/alphys/feet.png?url';
import ibcAlphysGhost from '../../assets/images/battleCharacters/alphys/ghost.png?url';
import ibcAlphysHead$info from '../../assets/images/battleCharacters/alphys/head.json?url';
import ibcAlphysHead from '../../assets/images/battleCharacters/alphys/head.png?url';
import ibcAlphysMelt$info from '../../assets/images/battleCharacters/alphys/melt.json?url';
import ibcAlphysMelt from '../../assets/images/battleCharacters/alphys/melt.png?url';
import ibcAlphysTorso from '../../assets/images/battleCharacters/alphys/torso.png?url';
import ibcAlphysWrap$info from '../../assets/images/battleCharacters/alphys/wrap.json?url';
import ibcAlphysWrap from '../../assets/images/battleCharacters/alphys/wrap.png?url';
import ibcAlphysWrapShock from '../../assets/images/battleCharacters/alphys/wrapShock.png?url';
import ibcAsgoreCrown from '../../assets/images/battleCharacters/asgore/crown.png?url';
import ibcAsgoreDeath$info from '../../assets/images/battleCharacters/asgore/death.json?url';
import ibcAsgoreDeath from '../../assets/images/battleCharacters/asgore/death.png?url';
import ibcAsgoreStatic$info from '../../assets/images/battleCharacters/asgore/static.json?url';
import ibcAsgoreStatic from '../../assets/images/battleCharacters/asgore/static.png?url';
import ibcAsgoreWrap$info from '../../assets/images/battleCharacters/asgore/wrap.json?url';
import ibcAsgoreWrap from '../../assets/images/battleCharacters/asgore/wrap.png?url';
import ibcAsgoreWrapShock from '../../assets/images/battleCharacters/asgore/wrapShock.png?url';
import ibcAsrielAssist from '../../assets/images/battleCharacters/asriel/assist.png?url';
import ibcAsrielBg from '../../assets/images/battleCharacters/asriel/bg.png?url';
import ibcAsrielCutscene1$info from '../../assets/images/battleCharacters/asriel/cutscene1.json?url';
import ibcAsrielCutscene1 from '../../assets/images/battleCharacters/asriel/cutscene1.png?url';
import ibcAsrielCutscene1full$info from '../../assets/images/battleCharacters/asriel/cutscene1full.json?url';
import ibcAsrielCutscene1full from '../../assets/images/battleCharacters/asriel/cutscene1full.png?url';
import ibcAsrielCutscene2$info from '../../assets/images/battleCharacters/asriel/cutscene2.json?url';
import ibcAsrielCutscene2 from '../../assets/images/battleCharacters/asriel/cutscene2.png?url';
import ibcAsrielFullbody1$info from '../../assets/images/battleCharacters/asriel/fullbody1.json?url';
import ibcAsrielFullbody1 from '../../assets/images/battleCharacters/asriel/fullbody1.png?url';
import ibcAsrielFullbody2$info from '../../assets/images/battleCharacters/asriel/fullbody2.json?url';
import ibcAsrielFullbody2 from '../../assets/images/battleCharacters/asriel/fullbody2.png?url';
import ibcAsrielFullhead$info from '../../assets/images/battleCharacters/asriel/fullhead.json?url';
import ibcAsrielFullhead from '../../assets/images/battleCharacters/asriel/fullhead.png?url';
import ibcAsrielFullheadShaker1$info from '../../assets/images/battleCharacters/asriel/fullheadShaker1.json?url';
import ibcAsrielFullheadShaker1 from '../../assets/images/battleCharacters/asriel/fullheadShaker1.png?url';
import ibcAsrielFullheadShaker2$info from '../../assets/images/battleCharacters/asriel/fullheadShaker2.json?url';
import ibcAsrielFullheadShaker2 from '../../assets/images/battleCharacters/asriel/fullheadShaker2.png?url';
import ibcAsrielGigavine from '../../assets/images/battleCharacters/asriel/gigavine.png?url';
import ibcAsrielHyperarm$info from '../../assets/images/battleCharacters/asriel/hyperarm.json?url';
import ibcAsrielHyperarm from '../../assets/images/battleCharacters/asriel/hyperarm.png?url';
import ibcAsrielHyperbody$info from '../../assets/images/battleCharacters/asriel/hyperbody.json?url';
import ibcAsrielHyperbody from '../../assets/images/battleCharacters/asriel/hyperbody.png?url';
import ibcAsrielHyperhead$info from '../../assets/images/battleCharacters/asriel/hyperhead.json?url';
import ibcAsrielHyperhead from '../../assets/images/battleCharacters/asriel/hyperhead.png?url';
import ibcAsrielHypersob$info from '../../assets/images/battleCharacters/asriel/hypersob.json?url';
import ibcAsrielHypersob from '../../assets/images/battleCharacters/asriel/hypersob.png?url';
import ibcAsrielHypersobex$info from '../../assets/images/battleCharacters/asriel/hypersobex.json?url';
import ibcAsrielHypersobex from '../../assets/images/battleCharacters/asriel/hypersobex.png?url';
import ibcAsrielHyperwing$info from '../../assets/images/battleCharacters/asriel/hyperwing.json?url';
import ibcAsrielHyperwing from '../../assets/images/battleCharacters/asriel/hyperwing.png?url';
import ibcAsrielMagic from '../../assets/images/battleCharacters/asriel/magic.png?url';
import ibcAstigmatismArm from '../../assets/images/battleCharacters/astigmatism/arm.png?url';
import ibcAstigmatismBody$info from '../../assets/images/battleCharacters/astigmatism/body.json?url';
import ibcAstigmatismBody from '../../assets/images/battleCharacters/astigmatism/body.png?url';
import ibcAstigmatismHurt from '../../assets/images/battleCharacters/astigmatism/hurt.png?url';
import ibcAstigmatismLeg from '../../assets/images/battleCharacters/astigmatism/leg.png?url';
import ibcBurgerpantsBody$info from '../../assets/images/battleCharacters/burgerpants/body.json?url';
import ibcBurgerpantsBody from '../../assets/images/battleCharacters/burgerpants/body.png?url';
import ibcDoge$info from '../../assets/images/battleCharacters/doge/doge.json?url';
import ibcDoge from '../../assets/images/battleCharacters/doge/doge.png?url';
import ibcDogeHurt from '../../assets/images/battleCharacters/doge/dogeHurt.png?url';
import ibcDogeTail$info from '../../assets/images/battleCharacters/doge/dogeTail.json?url';
import ibcDogeTail from '../../assets/images/battleCharacters/doge/dogeTail.png?url';
import ibcDoggoArms from '../../assets/images/battleCharacters/doggo/arms.png?url';
import ibcDoggoBody from '../../assets/images/battleCharacters/doggo/body.png?url';
import ibcDoggoBodyHurt from '../../assets/images/battleCharacters/doggo/bodyHurt.png?url';
import ibcDoggoHead$info from '../../assets/images/battleCharacters/doggo/head.json?url';
import ibcDoggoHead from '../../assets/images/battleCharacters/doggo/head.png?url';
import ibcDogsAxe from '../../assets/images/battleCharacters/dogs/axe.png?url';
import ibcDogsDogamy$info from '../../assets/images/battleCharacters/dogs/dogamy.json?url';
import ibcDogsDogamy from '../../assets/images/battleCharacters/dogs/dogamy.png?url';
import ibcDogsDogamyDesolate from '../../assets/images/battleCharacters/dogs/dogamyDesolate.png?url';
import ibcDogsDogamyHurt from '../../assets/images/battleCharacters/dogs/dogamyHurt.png?url';
import ibcDogsDogaressa$info from '../../assets/images/battleCharacters/dogs/dogaressa.json?url';
import ibcDogsDogaressa from '../../assets/images/battleCharacters/dogs/dogaressa.png?url';
import ibcDogsDogaressaHurt from '../../assets/images/battleCharacters/dogs/dogaressaHurt.png?url';
import ibcDogsDogaressaRabid from '../../assets/images/battleCharacters/dogs/dogaressaRabid.png?url';
import ibcDummy from '../../assets/images/battleCharacters/dummy/dummy.png?url';
import ibcDummyMadBase from '../../assets/images/battleCharacters/dummy/dummyMadBase.png?url';
import ibcDummyMadBody from '../../assets/images/battleCharacters/dummy/dummyMadBody.png?url';
import ibcDummyMadHead$info from '../../assets/images/battleCharacters/dummy/dummyMadHead.json?url';
import ibcDummyMadHead from '../../assets/images/battleCharacters/dummy/dummyMadHead.png?url';
import ibcDummyMadTorso from '../../assets/images/battleCharacters/dummy/dummyMadTorso.png?url';
import ibcDummyFinalghost$info from '../../assets/images/battleCharacters/dummy/finalghost.json?url';
import ibcDummyFinalghost from '../../assets/images/battleCharacters/dummy/finalghost.png?url';
import ibcDummyGlad from '../../assets/images/battleCharacters/dummy/glad.png?url';
import ibcDummyGladHugged from '../../assets/images/battleCharacters/dummy/gladHugged.png?url';
import ibcDummyHugged from '../../assets/images/battleCharacters/dummy/hugged.png?url';
import ibcDummyShock from '../../assets/images/battleCharacters/dummy/shock.png?url';
import ibcFroggitBody$info from '../../assets/images/battleCharacters/froggit/body.json?url';
import ibcFroggitBody from '../../assets/images/battleCharacters/froggit/body.png?url';
import ibcFroggitGone from '../../assets/images/battleCharacters/froggit/gone.png?url';
import ibcFroggitHead$info from '../../assets/images/battleCharacters/froggit/head.json?url';
import ibcFroggitHead from '../../assets/images/battleCharacters/froggit/head.png?url';
import ibcFroggitLegs$info from '../../assets/images/battleCharacters/froggit/legs.json?url';
import ibcFroggitLegs from '../../assets/images/battleCharacters/froggit/legs.png?url';
import ibcFroggitexGone from '../../assets/images/battleCharacters/froggitex/gone.png?url';
import ibcFroggitexHead$info from '../../assets/images/battleCharacters/froggitex/head.json?url';
import ibcFroggitexHead from '../../assets/images/battleCharacters/froggitex/head.png?url';
import ibcFroggitexLegs$info from '../../assets/images/battleCharacters/froggitex/legs.json?url';
import ibcFroggitexLegs from '../../assets/images/battleCharacters/froggitex/legs.png?url';
import ibcGersonValor from '../../assets/images/battleCharacters/gerson/valor.png?url';
import ibcGlydeAntenna from '../../assets/images/battleCharacters/glyde/antenna.png?url';
import ibcGlydeBody$info from '../../assets/images/battleCharacters/glyde/body.json?url';
import ibcGlydeBody from '../../assets/images/battleCharacters/glyde/body.png?url';
import ibcGlydeHurt$info from '../../assets/images/battleCharacters/glyde/hurt.json?url';
import ibcGlydeHurt from '../../assets/images/battleCharacters/glyde/hurt.png?url';
import ibcGlydeWingLeft from '../../assets/images/battleCharacters/glyde/wingLeft.png?url';
import ibcGlydeWingRight from '../../assets/images/battleCharacters/glyde/wingRight.png?url';
import ibcGreatdog$info from '../../assets/images/battleCharacters/greatdog/greatdog.json?url';
import ibcGreatdog from '../../assets/images/battleCharacters/greatdog/greatdog.png?url';
import ibcGreatdogSleep from '../../assets/images/battleCharacters/greatdog/greatdogSleep.png?url';
import ibcJerryHurt from '../../assets/images/battleCharacters/jerry/hurt.png?url';
import ibcJerryMain$info from '../../assets/images/battleCharacters/jerry/main.json?url';
import ibcJerryMain from '../../assets/images/battleCharacters/jerry/main.png?url';
import ibcKiddBody$info from '../../assets/images/battleCharacters/kidd/body.json?url';
import ibcKiddBody from '../../assets/images/battleCharacters/kidd/body.png?url';
import ibcKnightknightArmball$info from '../../assets/images/battleCharacters/knightknight/armball.json?url';
import ibcKnightknightArmball from '../../assets/images/battleCharacters/knightknight/armball.png?url';
import ibcKnightknightArmstaff from '../../assets/images/battleCharacters/knightknight/armstaff.png?url';
import ibcKnightknightBase from '../../assets/images/battleCharacters/knightknight/base.png?url';
import ibcKnightknightDragonfur$info from '../../assets/images/battleCharacters/knightknight/dragonfur.json?url';
import ibcKnightknightDragonfur from '../../assets/images/battleCharacters/knightknight/dragonfur.png?url';
import ibcKnightknightEyes$info from '../../assets/images/battleCharacters/knightknight/eyes.json?url';
import ibcKnightknightEyes from '../../assets/images/battleCharacters/knightknight/eyes.png?url';
import ibcKnightknightHeadpiece$info from '../../assets/images/battleCharacters/knightknight/headpiece.json?url';
import ibcKnightknightHeadpiece from '../../assets/images/battleCharacters/knightknight/headpiece.png?url';
import ibcKnightknightHurt from '../../assets/images/battleCharacters/knightknight/hurt.png?url';
import ibcKnightknightMouthpiece$info from '../../assets/images/battleCharacters/knightknight/mouthpiece.json?url';
import ibcKnightknightMouthpiece from '../../assets/images/battleCharacters/knightknight/mouthpiece.png?url';
import ibcLesserdogBody$info from '../../assets/images/battleCharacters/lesserdog/body.json?url';
import ibcLesserdogBody from '../../assets/images/battleCharacters/lesserdog/body.png?url';
import ibcLesserdogHead$info from '../../assets/images/battleCharacters/lesserdog/head.json?url';
import ibcLesserdogHead from '../../assets/images/battleCharacters/lesserdog/head.png?url';
import ibcLesserdogHurt$info from '../../assets/images/battleCharacters/lesserdog/hurt.json?url';
import ibcLesserdogHurt from '../../assets/images/battleCharacters/lesserdog/hurt.png?url';
import ibcLesserdogHurtHead$info from '../../assets/images/battleCharacters/lesserdog/hurtHead.json?url';
import ibcLesserdogHurtHead from '../../assets/images/battleCharacters/lesserdog/hurtHead.png?url';
import ibcLesserdogTail$info from '../../assets/images/battleCharacters/lesserdog/tail.json?url';
import ibcLesserdogTail from '../../assets/images/battleCharacters/lesserdog/tail.png?url';
import ibcLooxBody$info from '../../assets/images/battleCharacters/loox/body.json?url';
import ibcLooxBody from '../../assets/images/battleCharacters/loox/body.png?url';
import ibcLooxHit from '../../assets/images/battleCharacters/loox/hit.png?url';
import ibcMadjickBoot from '../../assets/images/battleCharacters/madjick/boot.png?url';
import ibcMadjickCape from '../../assets/images/battleCharacters/madjick/cape.png?url';
import ibcMadjickDress from '../../assets/images/battleCharacters/madjick/dress.png?url';
import ibcMadjickHat from '../../assets/images/battleCharacters/madjick/hat.png?url';
import ibcMadjickHead from '../../assets/images/battleCharacters/madjick/head.png?url';
import ibcMadjickHurt from '../../assets/images/battleCharacters/madjick/hurt.png?url';
import ibcMadjickLapel from '../../assets/images/battleCharacters/madjick/lapel.png?url';
import ibcMadjickOrb from '../../assets/images/battleCharacters/madjick/orb.png?url';
import ibcMettatonArmsBruh$info from '../../assets/images/battleCharacters/mettaton/armsBruh.json?url';
import ibcMettatonArmsBruh from '../../assets/images/battleCharacters/mettaton/armsBruh.png?url';
import ibcMettatonArmsNoticard$info from '../../assets/images/battleCharacters/mettaton/armsNoticard.json?url';
import ibcMettatonArmsNoticard from '../../assets/images/battleCharacters/mettaton/armsNoticard.png?url';
import ibcMettatonArmsThonk$info from '../../assets/images/battleCharacters/mettaton/armsThonk.json?url';
import ibcMettatonArmsThonk from '../../assets/images/battleCharacters/mettaton/armsThonk.png?url';
import ibcMettatonArmsWelcome$info from '../../assets/images/battleCharacters/mettaton/armsWelcome.json?url';
import ibcMettatonArmsWelcome from '../../assets/images/battleCharacters/mettaton/armsWelcome.png?url';
import ibcMettatonArmsWelcomeBack$info from '../../assets/images/battleCharacters/mettaton/armsWelcomeBack.json?url';
import ibcMettatonArmsWelcomeBack from '../../assets/images/battleCharacters/mettaton/armsWelcomeBack.png?url';
import ibcMettatonArmsWhaaat$info from '../../assets/images/battleCharacters/mettaton/armsWhaaat.json?url';
import ibcMettatonArmsWhaaat from '../../assets/images/battleCharacters/mettaton/armsWhaaat.png?url';
import ibcMettatonArmsWhatevs$info from '../../assets/images/battleCharacters/mettaton/armsWhatevs.json?url';
import ibcMettatonArmsWhatevs from '../../assets/images/battleCharacters/mettaton/armsWhatevs.png?url';
import ibcMettatonBody$info from '../../assets/images/battleCharacters/mettaton/body.json?url';
import ibcMettatonBody from '../../assets/images/battleCharacters/mettaton/body.png?url';
import ibcMettatonBodySOUL$info from '../../assets/images/battleCharacters/mettaton/bodySOUL.json?url';
import ibcMettatonBodySOUL from '../../assets/images/battleCharacters/mettaton/bodySOUL.png?url';
import ibcMettatonBodyTransform$info from '../../assets/images/battleCharacters/mettaton/bodyTransform.json?url';
import ibcMettatonBodyTransform from '../../assets/images/battleCharacters/mettaton/bodyTransform.png?url';
import ibcMettatonBrachistochrone$info from '../../assets/images/battleCharacters/mettaton/brachistochrone.json?url';
import ibcMettatonBrachistochrone from '../../assets/images/battleCharacters/mettaton/brachistochrone.png?url';
import ibcMettatonDjdisco$info from '../../assets/images/battleCharacters/mettaton/djdisco.json?url';
import ibcMettatonDjdisco from '../../assets/images/battleCharacters/mettaton/djdisco.png?url';
import ibcMettatonDjdiscoInv$info from '../../assets/images/battleCharacters/mettaton/djdiscoInv.json?url';
import ibcMettatonDjdiscoInv from '../../assets/images/battleCharacters/mettaton/djdiscoInv.png?url';
import ibcMettatonExArm$info from '../../assets/images/battleCharacters/mettaton/exArm.json?url';
import ibcMettatonExArm from '../../assets/images/battleCharacters/mettaton/exArm.png?url';
import ibcMettatonExBody$info from '../../assets/images/battleCharacters/mettaton/exBody.json?url';
import ibcMettatonExBody from '../../assets/images/battleCharacters/mettaton/exBody.png?url';
import ibcMettatonExBodyHeart$info from '../../assets/images/battleCharacters/mettaton/exBodyHeart.json?url';
import ibcMettatonExBodyHeart from '../../assets/images/battleCharacters/mettaton/exBodyHeart.png?url';
import ibcMettatonExFace$info from '../../assets/images/battleCharacters/mettaton/exFace.json?url';
import ibcMettatonExFace from '../../assets/images/battleCharacters/mettaton/exFace.png?url';
import ibcMettatonExLeg$info from '../../assets/images/battleCharacters/mettaton/exLeg.json?url';
import ibcMettatonExLeg from '../../assets/images/battleCharacters/mettaton/exLeg.png?url';
import ibcMettatonExStarburst from '../../assets/images/battleCharacters/mettaton/exStarburst.png?url';
import ibcMettatonFlyawaymyroboticfriend$info from '../../assets/images/battleCharacters/mettaton/flyawaymyroboticfriend.json?url';
import ibcMettatonFlyawaymyroboticfriend from '../../assets/images/battleCharacters/mettaton/flyawaymyroboticfriend.png?url';
import ibcMettatonNeoArm1 from '../../assets/images/battleCharacters/mettaton/neoArm1.png?url';
import ibcMettatonNeoArm2 from '../../assets/images/battleCharacters/mettaton/neoArm2.png?url';
import ibcMettatonNeoBody$info from '../../assets/images/battleCharacters/mettaton/neoBody.json?url';
import ibcMettatonNeoBody from '../../assets/images/battleCharacters/mettaton/neoBody.png?url';
import ibcMettatonNeoHead$info from '../../assets/images/battleCharacters/mettaton/neoHead.json?url';
import ibcMettatonNeoHead from '../../assets/images/battleCharacters/mettaton/neoHead.png?url';
import ibcMettatonNeoHeart$info from '../../assets/images/battleCharacters/mettaton/neoHeart.json?url';
import ibcMettatonNeoHeart from '../../assets/images/battleCharacters/mettaton/neoHeart.png?url';
import ibcMettatonNeoLegs from '../../assets/images/battleCharacters/mettaton/neoLegs.png?url';
import ibcMettatonNeoWings from '../../assets/images/battleCharacters/mettaton/neoWings.png?url';
import ibcMettatonQuizbutton$info from '../../assets/images/battleCharacters/mettaton/quizbutton.json?url';
import ibcMettatonQuizbutton from '../../assets/images/battleCharacters/mettaton/quizbutton.png?url';
import ibcMettatonRocket$info from '../../assets/images/battleCharacters/mettaton/rocket.json?url';
import ibcMettatonRocket from '../../assets/images/battleCharacters/mettaton/rocket.png?url';
import ibcMettatonWheel from '../../assets/images/battleCharacters/mettaton/wheel.png?url';
import ibcMigospHappi$info from '../../assets/images/battleCharacters/migosp/happi.json?url';
import ibcMigospHappi from '../../assets/images/battleCharacters/migosp/happi.png?url';
import ibcMigospHit from '../../assets/images/battleCharacters/migosp/hit.png?url';
import ibcMigosp$info from '../../assets/images/battleCharacters/migosp/migosp.json?url';
import ibcMigosp from '../../assets/images/battleCharacters/migosp/migosp.png?url';
import ibcMigospel$info from '../../assets/images/battleCharacters/migospel/migospel.json?url';
import ibcMigospel from '../../assets/images/battleCharacters/migospel/migospel.png?url';
import ibcMigospelHappi$info from '../../assets/images/battleCharacters/migospel/migospelHappi.json?url';
import ibcMigospelHappi from '../../assets/images/battleCharacters/migospel/migospelHappi.png?url';
import ibcMigospelHurt from '../../assets/images/battleCharacters/migospel/migospelHurt.png?url';
import ibcMigospelLegs from '../../assets/images/battleCharacters/migospel/migospelLegs.png?url';
import ibcMoldbyggDefeated from '../../assets/images/battleCharacters/moldbygg/defeated.png?url';
import ibcMoldbyggHead$info from '../../assets/images/battleCharacters/moldbygg/head.json?url';
import ibcMoldbyggHead from '../../assets/images/battleCharacters/moldbygg/head.png?url';
import ibcMoldbyggPart from '../../assets/images/battleCharacters/moldbygg/part.png?url';
import ibcMoldsmal from '../../assets/images/battleCharacters/moldsmal/moldsmal.png?url';
import ibcMouseBody$info from '../../assets/images/battleCharacters/mouse/body.json?url';
import ibcMouseBody from '../../assets/images/battleCharacters/mouse/body.png?url';
import ibcMouseHead$info from '../../assets/images/battleCharacters/mouse/head.json?url';
import ibcMouseHead from '../../assets/images/battleCharacters/mouse/head.png?url';
import ibcMouseHurt from '../../assets/images/battleCharacters/mouse/hurt.png?url';
import ibcMuffetArm1$info from '../../assets/images/battleCharacters/muffet/arm1.json?url';
import ibcMuffetArm1 from '../../assets/images/battleCharacters/muffet/arm1.png?url';
import ibcMuffetArm2a from '../../assets/images/battleCharacters/muffet/arm2a.png?url';
import ibcMuffetArm2b from '../../assets/images/battleCharacters/muffet/arm2b.png?url';
import ibcMuffetArm3 from '../../assets/images/battleCharacters/muffet/arm3.png?url';
import ibcMuffetCupcake$info from '../../assets/images/battleCharacters/muffet/cupcake.json?url';
import ibcMuffetCupcake from '../../assets/images/battleCharacters/muffet/cupcake.png?url';
import ibcMuffetDustrus from '../../assets/images/battleCharacters/muffet/dustrus.png?url';
import ibcMuffetEye1$info from '../../assets/images/battleCharacters/muffet/eye1.json?url';
import ibcMuffetEye1 from '../../assets/images/battleCharacters/muffet/eye1.png?url';
import ibcMuffetEye2$info from '../../assets/images/battleCharacters/muffet/eye2.json?url';
import ibcMuffetEye2 from '../../assets/images/battleCharacters/muffet/eye2.png?url';
import ibcMuffetEye3$info from '../../assets/images/battleCharacters/muffet/eye3.json?url';
import ibcMuffetEye3 from '../../assets/images/battleCharacters/muffet/eye3.png?url';
import ibcMuffetHair from '../../assets/images/battleCharacters/muffet/hair.png?url';
import ibcMuffetHead from '../../assets/images/battleCharacters/muffet/head.png?url';
import ibcMuffetHurt from '../../assets/images/battleCharacters/muffet/hurt.png?url';
import ibcMuffetLegs from '../../assets/images/battleCharacters/muffet/legs.png?url';
import ibcMuffetPants from '../../assets/images/battleCharacters/muffet/pants.png?url';
import ibcMuffetShirt from '../../assets/images/battleCharacters/muffet/shirt.png?url';
import ibcMuffetShoulder from '../../assets/images/battleCharacters/muffet/shoulder.png?url';
import ibcMuffetSpider$info from '../../assets/images/battleCharacters/muffet/spider.json?url';
import ibcMuffetSpider from '../../assets/images/battleCharacters/muffet/spider.png?url';
import ibcMuffetSpiderTelegram from '../../assets/images/battleCharacters/muffet/spiderTelegram.png?url';
import ibcMuffetTeapot from '../../assets/images/battleCharacters/muffet/teapot.png?url';
import ibcMushketeerBody from '../../assets/images/battleCharacters/mushketeer/body.png?url';
import ibcMushketeerBodyDisarmed from '../../assets/images/battleCharacters/mushketeer/bodyDisarmed.png?url';
import ibcMushketeerHurt from '../../assets/images/battleCharacters/mushketeer/hurt.png?url';
import ibcMushketeerHurtDisarmed from '../../assets/images/battleCharacters/mushketeer/hurtDisarmed.png?url';
import ibcMushyBody from '../../assets/images/battleCharacters/mushy/body.png?url';
import ibcMushyHit from '../../assets/images/battleCharacters/mushy/hit.png?url';
import ibcNapstablookBattle$info from '../../assets/images/battleCharacters/napstablook/battle.json?url';
import ibcNapstablookBattle from '../../assets/images/battleCharacters/napstablook/battle.png?url';
import ibcNapstablookBattleLookdeath$info from '../../assets/images/battleCharacters/napstablook/battleLookdeath.json?url';
import ibcNapstablookBattleLookdeath from '../../assets/images/battleCharacters/napstablook/battleLookdeath.png?url';
import ibcNapstablookBattleLookdown$info from '../../assets/images/battleCharacters/napstablook/battleLookdown.json?url';
import ibcNapstablookBattleLookdown from '../../assets/images/battleCharacters/napstablook/battleLookdown.png?url';
import ibcNapstablookBattleLookforward$info from '../../assets/images/battleCharacters/napstablook/battleLookforward.json?url';
import ibcNapstablookBattleLookforward from '../../assets/images/battleCharacters/napstablook/battleLookforward.png?url';
import ibcNapstablookHat$info from '../../assets/images/battleCharacters/napstablook/hat.json?url';
import ibcNapstablookHat from '../../assets/images/battleCharacters/napstablook/hat.png?url';
import ibcPapyrusAnime$info from '../../assets/images/battleCharacters/papyrus/anime.json?url';
import ibcPapyrusAnime from '../../assets/images/battleCharacters/papyrus/anime.png?url';
import ibcPapyrusBattle$info from '../../assets/images/battleCharacters/papyrus/battle.json?url';
import ibcPapyrusBattle from '../../assets/images/battleCharacters/papyrus/battle.png?url';
import ibcPapyrusBattleBlackoutA$info from '../../assets/images/battleCharacters/papyrus/battleBlackoutA.json?url';
import ibcPapyrusBattleBlackoutA from '../../assets/images/battleCharacters/papyrus/battleBlackoutA.png?url';
import ibcPapyrusBattleBlackoutB$info from '../../assets/images/battleCharacters/papyrus/battleBlackoutB.json?url';
import ibcPapyrusBattleBlackoutB from '../../assets/images/battleCharacters/papyrus/battleBlackoutB.png?url';
import ibcPapyrusBattleOpen$info from '../../assets/images/battleCharacters/papyrus/battleOpen.json?url';
import ibcPapyrusBattleOpen from '../../assets/images/battleCharacters/papyrus/battleOpen.png?url';
import ibcPapyrusBlank from '../../assets/images/battleCharacters/papyrus/blank.png?url';
import ibcPapyrusBlush from '../../assets/images/battleCharacters/papyrus/blush.png?url';
import ibcPapyrusBlushRefuse from '../../assets/images/battleCharacters/papyrus/blushRefuse.png?url';
import ibcPapyrusClosed$info from '../../assets/images/battleCharacters/papyrus/closed.json?url';
import ibcPapyrusClosed from '../../assets/images/battleCharacters/papyrus/closed.png?url';
import ibcPapyrusConfident$info from '../../assets/images/battleCharacters/papyrus/confident.json?url';
import ibcPapyrusConfident from '../../assets/images/battleCharacters/papyrus/confident.png?url';
import ibcPapyrusCoolhat from '../../assets/images/battleCharacters/papyrus/coolhat.png?url';
import ibcPapyrusCoolhatUnder from '../../assets/images/battleCharacters/papyrus/coolhat_under.png?url';
import ibcPapyrusDateOMG$info from '../../assets/images/battleCharacters/papyrus/dateOMG.json?url';
import ibcPapyrusDateOMG from '../../assets/images/battleCharacters/papyrus/dateOMG.png?url';
import ibcPapyrusDateRead$info from '../../assets/images/battleCharacters/papyrus/dateRead.json?url';
import ibcPapyrusDateRead from '../../assets/images/battleCharacters/papyrus/dateRead.png?url';
import ibcPapyrusDateSwipe$info from '../../assets/images/battleCharacters/papyrus/dateSwipe.json?url';
import ibcPapyrusDateSwipe from '../../assets/images/battleCharacters/papyrus/dateSwipe.png?url';
import ibcPapyrusDeadpan from '../../assets/images/battleCharacters/papyrus/deadpan.png?url';
import ibcPapyrusDetermined from '../../assets/images/battleCharacters/papyrus/determined.png?url';
import ibcPapyrusEyeroll from '../../assets/images/battleCharacters/papyrus/eyeroll.png?url';
import ibcPapyrusFakeAnger from '../../assets/images/battleCharacters/papyrus/fakeAnger.png?url';
import ibcPapyrusHapp$info from '../../assets/images/battleCharacters/papyrus/happ.json?url';
import ibcPapyrusHapp from '../../assets/images/battleCharacters/papyrus/happ.png?url';
import ibcPapyrusHappAgain from '../../assets/images/battleCharacters/papyrus/happAgain.png?url';
import ibcPapyrusHeadless from '../../assets/images/battleCharacters/papyrus/headless.png?url';
import ibcPapyrusMad$info from '../../assets/images/battleCharacters/papyrus/mad.json?url';
import ibcPapyrusMad from '../../assets/images/battleCharacters/papyrus/mad.png?url';
import ibcPapyrusNooo$info from '../../assets/images/battleCharacters/papyrus/nooo.json?url';
import ibcPapyrusNooo from '../../assets/images/battleCharacters/papyrus/nooo.png?url';
import ibcPapyrusOwwie from '../../assets/images/battleCharacters/papyrus/owwie.png?url';
import ibcPapyrusShock from '../../assets/images/battleCharacters/papyrus/shock.png?url';
import ibcPapyrusSide from '../../assets/images/battleCharacters/papyrus/side.png?url';
import ibcPapyrusSly$info from '../../assets/images/battleCharacters/papyrus/sly.json?url';
import ibcPapyrusSly from '../../assets/images/battleCharacters/papyrus/sly.png?url';
import ibcPapyrusSmacked from '../../assets/images/battleCharacters/papyrus/smacked.png?url';
import ibcPapyrusSpagbox$info from '../../assets/images/battleCharacters/papyrus/spagbox.json?url';
import ibcPapyrusSpagbox from '../../assets/images/battleCharacters/papyrus/spagbox.png?url';
import ibcPapyrusSus from '../../assets/images/battleCharacters/papyrus/sus.png?url';
import ibcPapyrusSweat$info from '../../assets/images/battleCharacters/papyrus/sweat.json?url';
import ibcPapyrusSweat from '../../assets/images/battleCharacters/papyrus/sweat.png?url';
import ibcPapyrusTopBlush from '../../assets/images/battleCharacters/papyrus/topBlush.png?url';
import ibcPapyrusWeary from '../../assets/images/battleCharacters/papyrus/weary.png?url';
import ibcPapyrusWrap$info from '../../assets/images/battleCharacters/papyrus/wrap.json?url';
import ibcPapyrusWrap from '../../assets/images/battleCharacters/papyrus/wrap.png?url';
import ibcPapyrusWrapShock from '../../assets/images/battleCharacters/papyrus/wrapShock.png?url';
import ibcPerigeeBody$info from '../../assets/images/battleCharacters/perigee/body.json?url';
import ibcPerigeeBody from '../../assets/images/battleCharacters/perigee/body.png?url';
import ibcPerigeeHurt from '../../assets/images/battleCharacters/perigee/hurt.png?url';
import ibcPyropeDrip from '../../assets/images/battleCharacters/pyrope/drip.png?url';
import ibcPyropeHead$info from '../../assets/images/battleCharacters/pyrope/head.json?url';
import ibcPyropeHead from '../../assets/images/battleCharacters/pyrope/head.png?url';
import ibcPyropeHurt from '../../assets/images/battleCharacters/pyrope/hurt.png?url';
import ibcPyropeRing$info from '../../assets/images/battleCharacters/pyrope/ring.json?url';
import ibcPyropeRing from '../../assets/images/battleCharacters/pyrope/ring.png?url';
import ibcRadtile$info from '../../assets/images/battleCharacters/radtile/radtile.json?url';
import ibcRadtile from '../../assets/images/battleCharacters/radtile/radtile.png?url';
import ibcRadtileHurt from '../../assets/images/battleCharacters/radtile/radtileHurt.png?url';
import ibcRadtileTail$info from '../../assets/images/battleCharacters/radtile/radtileTail.json?url';
import ibcRadtileTail from '../../assets/images/battleCharacters/radtile/radtileTail.png?url';
import ibcRomanMain from '../../assets/images/battleCharacters/roman/main.png?url';
import ibcRoyalguardBall from '../../assets/images/battleCharacters/royalguard/ball.png?url';
import ibcRoyalguardBugFist from '../../assets/images/battleCharacters/royalguard/bugFist.png?url';
import ibcRoyalguardBugHead from '../../assets/images/battleCharacters/royalguard/bugHead.png?url';
import ibcRoyalguardCatFist from '../../assets/images/battleCharacters/royalguard/catFist.png?url';
import ibcRoyalguardCatHead from '../../assets/images/battleCharacters/royalguard/catHead.png?url';
import ibcRoyalguardChestplate$info from '../../assets/images/battleCharacters/royalguard/chestplate.json?url';
import ibcRoyalguardChestplate from '../../assets/images/battleCharacters/royalguard/chestplate.png?url';
import ibcRoyalguardDragonHead from '../../assets/images/battleCharacters/royalguard/dragonHead.png?url';
import ibcRoyalguardFalchion from '../../assets/images/battleCharacters/royalguard/falchion.png?url';
import ibcRoyalguardFist from '../../assets/images/battleCharacters/royalguard/fist.png?url';
import ibcRoyalguardFlag from '../../assets/images/battleCharacters/royalguard/flag.png?url';
import ibcRoyalguardHurt$info from '../../assets/images/battleCharacters/royalguard/hurt.json?url';
import ibcRoyalguardHurt from '../../assets/images/battleCharacters/royalguard/hurt.png?url';
import ibcRoyalguardLegs from '../../assets/images/battleCharacters/royalguard/legs.png?url';
import ibcRoyalguardRabbitHead from '../../assets/images/battleCharacters/royalguard/rabbitHead.png?url';
import ibcRoyalguardShoes from '../../assets/images/battleCharacters/royalguard/shoes.png?url';
import ibcRoyalguardSweat from '../../assets/images/battleCharacters/royalguard/sweat.png?url';
import ibcSansBattle$info from '../../assets/images/battleCharacters/sans/battle.json?url';
import ibcSansBattle from '../../assets/images/battleCharacters/sans/battle.png?url';
import ibcSansDeath$info from '../../assets/images/battleCharacters/sans/death.json?url';
import ibcSansDeath from '../../assets/images/battleCharacters/sans/death.png?url';
import ibcSansWrap$info from '../../assets/images/battleCharacters/sans/wrap.json?url';
import ibcSansWrap from '../../assets/images/battleCharacters/sans/wrap.png?url';
import ibcSansWrapShock from '../../assets/images/battleCharacters/sans/wrapShock.png?url';
import ibcShyrenBattleAgent$info from '../../assets/images/battleCharacters/shyren/battleAgent.json?url';
import ibcShyrenBattleAgent from '../../assets/images/battleCharacters/shyren/battleAgent.png?url';
import ibcShyrenBattleBack$info from '../../assets/images/battleCharacters/shyren/battleBack.json?url';
import ibcShyrenBattleBack from '../../assets/images/battleCharacters/shyren/battleBack.png?url';
import ibcShyrenBattleFront$info from '../../assets/images/battleCharacters/shyren/battleFront.json?url';
import ibcShyrenBattleFront from '../../assets/images/battleCharacters/shyren/battleFront.png?url';
import ibcShyrenBattleHurt from '../../assets/images/battleCharacters/shyren/battleHurt.png?url';
import ibcShyrenBattleWave$info from '../../assets/images/battleCharacters/shyren/battleWave.json?url';
import ibcShyrenBattleWave from '../../assets/images/battleCharacters/shyren/battleWave.png?url';
import ibcSpacetopCrystal from '../../assets/images/battleCharacters/spacetop/crystal.png?url';
import ibcSpacetopHurt from '../../assets/images/battleCharacters/spacetop/hurt.png?url';
import ibcSpacetop$info from '../../assets/images/battleCharacters/spacetop/spacetop.json?url';
import ibcSpacetop from '../../assets/images/battleCharacters/spacetop/spacetop.png?url';
import ibcStardrakeBody from '../../assets/images/battleCharacters/stardrake/body.png?url';
import ibcStardrakeChilldrake from '../../assets/images/battleCharacters/stardrake/chilldrake.png?url';
import ibcStardrakeChilldrakeHurt from '../../assets/images/battleCharacters/stardrake/chilldrakeHurt.png?url';
import ibcStardrakeHead$info from '../../assets/images/battleCharacters/stardrake/head.json?url';
import ibcStardrakeHead from '../../assets/images/battleCharacters/stardrake/head.png?url';
import ibcStardrakeHurt from '../../assets/images/battleCharacters/stardrake/hurt.png?url';
import ibcStardrakeLegs from '../../assets/images/battleCharacters/stardrake/legs.png?url';
import ibcStardrakeLegsOver from '../../assets/images/battleCharacters/stardrake/legsOver.png?url';
import ibcTorielBattle1$info from '../../assets/images/battleCharacters/toriel/battle1.json?url';
import ibcTorielBattle1 from '../../assets/images/battleCharacters/toriel/battle1.png?url';
import ibcTorielBattle2$info from '../../assets/images/battleCharacters/toriel/battle2.json?url';
import ibcTorielBattle2 from '../../assets/images/battleCharacters/toriel/battle2.png?url';
import ibcTorielCutscene1$info from '../../assets/images/battleCharacters/toriel/cutscene1.json?url';
import ibcTorielCutscene1 from '../../assets/images/battleCharacters/toriel/cutscene1.png?url';
import ibcTorielCutscene2$info from '../../assets/images/battleCharacters/toriel/cutscene2.json?url';
import ibcTorielCutscene2 from '../../assets/images/battleCharacters/toriel/cutscene2.png?url';
import ibcTorielScram$info from '../../assets/images/battleCharacters/toriel/scram.json?url';
import ibcTorielScram from '../../assets/images/battleCharacters/toriel/scram.png?url';
import ibcTorielWrap$info from '../../assets/images/battleCharacters/toriel/wrap.json?url';
import ibcTorielWrap from '../../assets/images/battleCharacters/toriel/wrap.png?url';
import ibcTorielWrapShock from '../../assets/images/battleCharacters/toriel/wrapShock.png?url';
import ibcTsundereBlush$info from '../../assets/images/battleCharacters/tsundere/blush.json?url';
import ibcTsundereBlush from '../../assets/images/battleCharacters/tsundere/blush.png?url';
import ibcTsundereBody from '../../assets/images/battleCharacters/tsundere/body.png?url';
import ibcTsundereExhaust from '../../assets/images/battleCharacters/tsundere/exhaust.png?url';
import ibcTsundereHurt from '../../assets/images/battleCharacters/tsundere/hurt.png?url';
import ibcTwinklyBeatsaber from '../../assets/images/battleCharacters/twinkly/beatsaber.png?url';
import ibcTwinklyCheckpoint from '../../assets/images/battleCharacters/twinkly/checkpoint.png?url';
import ibcTwinklyDiamondboltArc$info from '../../assets/images/battleCharacters/twinkly/diamondbolt_arc.json?url';
import ibcTwinklyDiamondboltArc from '../../assets/images/battleCharacters/twinkly/diamondbolt_arc.png?url';
import ibcTwinklyDiamondboltRay$info from '../../assets/images/battleCharacters/twinkly/diamondbolt_ray.json?url';
import ibcTwinklyDiamondboltRay from '../../assets/images/battleCharacters/twinkly/diamondbolt_ray.png?url';
import ibcTwinklyFunkin$info from '../../assets/images/battleCharacters/twinkly/funkin.json?url';
import ibcTwinklyFunkin from '../../assets/images/battleCharacters/twinkly/funkin.png?url';
import ibcTwinklyGeodash from '../../assets/images/battleCharacters/twinkly/geodash.png?url';
import ibcTwinklyGeoplatform from '../../assets/images/battleCharacters/twinkly/geoplatform.png?url';
import ibcTwinklyGeoring from '../../assets/images/battleCharacters/twinkly/georing.png?url';
import ibcTwinklyHeart1$info from '../../assets/images/battleCharacters/twinkly/heart1.json?url';
import ibcTwinklyHeart1 from '../../assets/images/battleCharacters/twinkly/heart1.png?url';
import ibcTwinklyHeart2$info from '../../assets/images/battleCharacters/twinkly/heart2.json?url';
import ibcTwinklyHeart2 from '../../assets/images/battleCharacters/twinkly/heart2.png?url';
import ibcTwinklyHeart3$info from '../../assets/images/battleCharacters/twinkly/heart3.json?url';
import ibcTwinklyHeart3 from '../../assets/images/battleCharacters/twinkly/heart3.png?url';
import ibcTwinklyHeart4$info from '../../assets/images/battleCharacters/twinkly/heart4.json?url';
import ibcTwinklyHeart4 from '../../assets/images/battleCharacters/twinkly/heart4.png?url';
import ibcTwinklyHeart5$info from '../../assets/images/battleCharacters/twinkly/heart5.json?url';
import ibcTwinklyHeart5 from '../../assets/images/battleCharacters/twinkly/heart5.png?url';
import ibcTwinklyHeart6$info from '../../assets/images/battleCharacters/twinkly/heart6.json?url';
import ibcTwinklyHeart6 from '../../assets/images/battleCharacters/twinkly/heart6.png?url';
import ibcTwinklyHeart7$info from '../../assets/images/battleCharacters/twinkly/heart7.json?url';
import ibcTwinklyHeart7 from '../../assets/images/battleCharacters/twinkly/heart7.png?url';
import ibcTwinklyItssobad from '../../assets/images/battleCharacters/twinkly/itssobad.png?url';
import ibcTwinklyJusant from '../../assets/images/battleCharacters/twinkly/jusant.png?url';
import ibcTwinklyNotebar from '../../assets/images/battleCharacters/twinkly/notebar.png?url';
import ibcTwinklyOrbiterExtra$info from '../../assets/images/battleCharacters/twinkly/orbiter_extra.json?url';
import ibcTwinklyOrbiterExtra from '../../assets/images/battleCharacters/twinkly/orbiter_extra.png?url';
import ibcTwinklyOrbiterMid$info from '../../assets/images/battleCharacters/twinkly/orbiter_mid.json?url';
import ibcTwinklyOrbiterMid from '../../assets/images/battleCharacters/twinkly/orbiter_mid.png?url';
import ibcTwinklyOverlay$info from '../../assets/images/battleCharacters/twinkly/overlay.json?url';
import ibcTwinklyOverlay from '../../assets/images/battleCharacters/twinkly/overlay.png?url';
import ibcTwinklyPadd from '../../assets/images/battleCharacters/twinkly/padd.png?url';
import ibcTwinklyPlatform from '../../assets/images/battleCharacters/twinkly/platform.png?url';
import ibcTwinklyRestraint from '../../assets/images/battleCharacters/twinkly/restraint.png?url';
import ibcTwinklyRotater$info from '../../assets/images/battleCharacters/twinkly/rotater.json?url';
import ibcTwinklyRotater from '../../assets/images/battleCharacters/twinkly/rotater.png?url';
import ibcTwinklyRotaterBeam$info from '../../assets/images/battleCharacters/twinkly/rotater_beam.json?url';
import ibcTwinklyRotaterBeam from '../../assets/images/battleCharacters/twinkly/rotater_beam.png?url';
import ibcTwinklyShoes from '../../assets/images/battleCharacters/twinkly/shoes.png?url';
import ibcTwinklyShotstar$info from '../../assets/images/battleCharacters/twinkly/shotstar.json?url';
import ibcTwinklyShotstar from '../../assets/images/battleCharacters/twinkly/shotstar.png?url';
import ibcTwinklySpoon from '../../assets/images/battleCharacters/twinkly/spoon.png?url';
import ibcTwinklyStanleycolumn from '../../assets/images/battleCharacters/twinkly/stanleycolumn.png?url';
import ibcTwinklyStanleyparable from '../../assets/images/battleCharacters/twinkly/stanleyparable.png?url';
import ibcTwinklySun1$info from '../../assets/images/battleCharacters/twinkly/sun1.json?url';
import ibcTwinklySun1 from '../../assets/images/battleCharacters/twinkly/sun1.png?url';
import ibcTwinklySun2$info from '../../assets/images/battleCharacters/twinkly/sun2.json?url';
import ibcTwinklySun2 from '../../assets/images/battleCharacters/twinkly/sun2.png?url';
import ibcTwinklySun3$info from '../../assets/images/battleCharacters/twinkly/sun3.json?url';
import ibcTwinklySun3 from '../../assets/images/battleCharacters/twinkly/sun3.png?url';
import ibcTwinklySunball$info from '../../assets/images/battleCharacters/twinkly/sunball.json?url';
import ibcTwinklySunball from '../../assets/images/battleCharacters/twinkly/sunball.png?url';
import ibcTwinklySunbeam$info from '../../assets/images/battleCharacters/twinkly/sunbeam.json?url';
import ibcTwinklySunbeam from '../../assets/images/battleCharacters/twinkly/sunbeam.png?url';
import ibcTwinklySunringBlue$info from '../../assets/images/battleCharacters/twinkly/sunring_blue.json?url';
import ibcTwinklySunringBlue from '../../assets/images/battleCharacters/twinkly/sunring_blue.png?url';
import ibcTwinklySunringOrange$info from '../../assets/images/battleCharacters/twinkly/sunring_orange.json?url';
import ibcTwinklySunringOrange from '../../assets/images/battleCharacters/twinkly/sunring_orange.png?url';
import ibcTwinklyUnderlay from '../../assets/images/battleCharacters/twinkly/underlay.png?url';
import ibcTwinklyWarpstar$info from '../../assets/images/battleCharacters/twinkly/warpstar.json?url';
import ibcTwinklyWarpstar from '../../assets/images/battleCharacters/twinkly/warpstar.png?url';
import ibcTwinklyWinterrowd from '../../assets/images/battleCharacters/twinkly/winterrowd.png?url';
import ibcTwinklyWormhole$info from '../../assets/images/battleCharacters/twinkly/wormhole.json?url';
import ibcTwinklyWormhole from '../../assets/images/battleCharacters/twinkly/wormhole.png?url';
import ibcTwinklyXylo from '../../assets/images/battleCharacters/twinkly/xylo.png?url';
import ibcUndyneArm1 from '../../assets/images/battleCharacters/undyne/arm1.png?url';
import ibcUndyneArm1Ex from '../../assets/images/battleCharacters/undyne/arm1Ex.png?url';
import ibcUndyneArm2 from '../../assets/images/battleCharacters/undyne/arm2.png?url';
import ibcUndyneArm2Ex from '../../assets/images/battleCharacters/undyne/arm2Ex.png?url';
import ibcUndyneArrow from '../../assets/images/battleCharacters/undyne/arrow.png?url';
import ibcUndyneBoots from '../../assets/images/battleCharacters/undyne/boots.png?url';
import ibcUndyneBootsEx from '../../assets/images/battleCharacters/undyne/bootsEx.png?url';
import ibcUndyneCage from '../../assets/images/battleCharacters/undyne/cage.png?url';
import ibcUndyneCageHoriz from '../../assets/images/battleCharacters/undyne/cage_horiz.png?url';
import ibcUndyneChestplate from '../../assets/images/battleCharacters/undyne/chestplate.png?url';
import ibcUndyneChestplateEx from '../../assets/images/battleCharacters/undyne/chestplateEx.png?url';
import ibcUndyneChestplateHelmet from '../../assets/images/battleCharacters/undyne/chestplateHelmet.png?url';
import ibcUndyneDate from '../../assets/images/battleCharacters/undyne/date.png?url';
import ibcUndyneDateArm$info from '../../assets/images/battleCharacters/undyne/dateArm.json?url';
import ibcUndyneDateArm from '../../assets/images/battleCharacters/undyne/dateArm.png?url';
import ibcUndyneDateLegs from '../../assets/images/battleCharacters/undyne/dateLegs.png?url';
import ibcUndyneDateSpear$info from '../../assets/images/battleCharacters/undyne/dateSpear.json?url';
import ibcUndyneDateSpear from '../../assets/images/battleCharacters/undyne/dateSpear.png?url';
import ibcUndyneDateTorso from '../../assets/images/battleCharacters/undyne/dateTorso.png?url';
import ibcUndyneEyebeam from '../../assets/images/battleCharacters/undyne/eyebeam.png?url';
import ibcUndyneFatal$info from '../../assets/images/battleCharacters/undyne/fatal.json?url';
import ibcUndyneFatal from '../../assets/images/battleCharacters/undyne/fatal.png?url';
import ibcUndyneHair$info from '../../assets/images/battleCharacters/undyne/hair.json?url';
import ibcUndyneHair from '../../assets/images/battleCharacters/undyne/hair.png?url';
import ibcUndyneHairEx$info from '../../assets/images/battleCharacters/undyne/hairEx.json?url';
import ibcUndyneHairEx from '../../assets/images/battleCharacters/undyne/hairEx.png?url';
import ibcUndyneHead$info from '../../assets/images/battleCharacters/undyne/head.json?url';
import ibcUndyneHead from '../../assets/images/battleCharacters/undyne/head.png?url';
import ibcUndyneHelmet from '../../assets/images/battleCharacters/undyne/helmet.png?url';
import ibcUndyneLaugh$info from '../../assets/images/battleCharacters/undyne/laugh.json?url';
import ibcUndyneLaugh from '../../assets/images/battleCharacters/undyne/laugh.png?url';
import ibcUndyneMain from '../../assets/images/battleCharacters/undyne/main.png?url';
import ibcUndyneMainEx$info from '../../assets/images/battleCharacters/undyne/mainEx.json?url';
import ibcUndyneMainEx from '../../assets/images/battleCharacters/undyne/mainEx.png?url';
import ibcUndyneMainHelmet from '../../assets/images/battleCharacters/undyne/mainHelmet.png?url';
import ibcUndyneMainPain from '../../assets/images/battleCharacters/undyne/mainPain.png?url';
import ibcUndyneMainPause from '../../assets/images/battleCharacters/undyne/mainPause.png?url';
import ibcUndyneMainSad from '../../assets/images/battleCharacters/undyne/mainSad.png?url';
import ibcUndyneNeutralFinal$info from '../../assets/images/battleCharacters/undyne/neutralFinal.json?url';
import ibcUndyneNeutralFinal from '../../assets/images/battleCharacters/undyne/neutralFinal.png?url';
import ibcUndyneSheath from '../../assets/images/battleCharacters/undyne/sheath.png?url';
import ibcUndyneSheathEx from '../../assets/images/battleCharacters/undyne/sheathEx.png?url';
import ibcUndyneShield$info from '../../assets/images/battleCharacters/undyne/shield.json?url';
import ibcUndyneShield from '../../assets/images/battleCharacters/undyne/shield.png?url';
import ibcUndyneShocked from '../../assets/images/battleCharacters/undyne/shocked.png?url';
import ibcUndyneSmear$info from '../../assets/images/battleCharacters/undyne/smear.json?url';
import ibcUndyneSmear from '../../assets/images/battleCharacters/undyne/smear.png?url';
import ibcUndyneWrap$info from '../../assets/images/battleCharacters/undyne/wrap.json?url';
import ibcUndyneWrap from '../../assets/images/battleCharacters/undyne/wrap.png?url';
import ibcUndyneWrapShock from '../../assets/images/battleCharacters/undyne/wrapShock.png?url';
import ibcUndyneWrapped$info from '../../assets/images/battleCharacters/undyne/wrapped.json?url';
import ibcUndyneWrapped from '../../assets/images/battleCharacters/undyne/wrapped.png?url';
import ibcWhimsalotBody$info from '../../assets/images/battleCharacters/whimsalot/body.json?url';
import ibcWhimsalotBody from '../../assets/images/battleCharacters/whimsalot/body.png?url';
import ibcWhimsalotHit from '../../assets/images/battleCharacters/whimsalot/hit.png?url';
import ibcWhimsunHit from '../../assets/images/battleCharacters/whimsun/hit.png?url';
import ibcWhimsun$info from '../../assets/images/battleCharacters/whimsun/whimsun.json?url';
import ibcWhimsun from '../../assets/images/battleCharacters/whimsun/whimsun.png?url';
import ibcWoshuaBody from '../../assets/images/battleCharacters/woshua/body.png?url';
import ibcWoshuaDuck from '../../assets/images/battleCharacters/woshua/duck.png?url';
import ibcWoshuaFace from '../../assets/images/battleCharacters/woshua/face.png?url';
import ibcWoshuaHanger from '../../assets/images/battleCharacters/woshua/hanger.png?url';
import ibcWoshuaHead from '../../assets/images/battleCharacters/woshua/head.png?url';
import ibcWoshuaHurt from '../../assets/images/battleCharacters/woshua/hurt.png?url';
import ibcWoshuaTail$info from '../../assets/images/battleCharacters/woshua/tail.json?url';
import ibcWoshuaTail from '../../assets/images/battleCharacters/woshua/tail.png?url';
import ibcWoshuaWater from '../../assets/images/battleCharacters/woshua/water.png?url';
import ibuHP from '../../assets/images/battleUI/HP.png?url';
import ibuSOUL$info from '../../assets/images/battleUI/SOUL.json?url';
import ibuSOUL from '../../assets/images/battleUI/SOUL.png?url';
import ibuArrows from '../../assets/images/battleUI/arrows.png?url';
import ibuBlueSOUL$info from '../../assets/images/battleUI/blueSOUL.json?url';
import ibuBlueSOUL from '../../assets/images/battleUI/blueSOUL.png?url';
import ibuBoot1$info from '../../assets/images/battleUI/boot1.json?url';
import ibuBoot1 from '../../assets/images/battleUI/boot1.png?url';
import ibuBoot2$info from '../../assets/images/battleUI/boot2.json?url';
import ibuBoot2 from '../../assets/images/battleUI/boot2.png?url';
import ibuBossSOUL from '../../assets/images/battleUI/bossSOUL.png?url';
import ibuBossbreak from '../../assets/images/battleUI/bossbreak.png?url';
import ibuBossshatter$info from '../../assets/images/battleUI/bossshatter.json?url';
import ibuBossshatter from '../../assets/images/battleUI/bossshatter.png?url';
import ibuBreak from '../../assets/images/battleUI/break.png?url';
import ibuBubbleBlooky from '../../assets/images/battleUI/bubbleBlooky.png?url';
import ibuBubbleDGU1 from '../../assets/images/battleUI/bubbleDGU1.png?url';
import ibuBubbleDGU2 from '../../assets/images/battleUI/bubbleDGU2.png?url';
import ibuBubbleDummy from '../../assets/images/battleUI/bubbleDummy.png?url';
import ibuBubbleMTT from '../../assets/images/battleUI/bubbleMTT.png?url';
import ibuBubbleShock from '../../assets/images/battleUI/bubbleShock.png?url';
import ibuBubbleTiny from '../../assets/images/battleUI/bubbleTiny.png?url';
import ibuBubbleTwinkly from '../../assets/images/battleUI/bubbleTwinkly.png?url';
import ibuCharm from '../../assets/images/battleUI/charm.png?url';
import ibuCyanReticle from '../../assets/images/battleUI/cyanReticle.png?url';
import ibuCyanSOUL$info from '../../assets/images/battleUI/cyanSOUL.json?url';
import ibuCyanSOUL from '../../assets/images/battleUI/cyanSOUL.png?url';
import ibuCyangreenSOUL$info from '../../assets/images/battleUI/cyangreenSOUL.json?url';
import ibuCyangreenSOUL from '../../assets/images/battleUI/cyangreenSOUL.png?url';
import ibuDeadeye from '../../assets/images/battleUI/deadeye.png?url';
import ibuDefeat from '../../assets/images/battleUI/defeat.png?url';
import ibuFist1$info from '../../assets/images/battleUI/fist1.json?url';
import ibuFist1 from '../../assets/images/battleUI/fist1.png?url';
import ibuFist2$info from '../../assets/images/battleUI/fist2.json?url';
import ibuFist2 from '../../assets/images/battleUI/fist2.png?url';
import ibuFrypan1$info from '../../assets/images/battleUI/frypan1.json?url';
import ibuFrypan1 from '../../assets/images/battleUI/frypan1.png?url';
import ibuFrypan2 from '../../assets/images/battleUI/frypan2.png?url';
import ibuGreenSOUL$info from '../../assets/images/battleUI/greenSOUL.json?url';
import ibuGreenSOUL from '../../assets/images/battleUI/greenSOUL.png?url';
import ibuGrid1 from '../../assets/images/battleUI/grid1.png?url';
import ibuGrid2 from '../../assets/images/battleUI/grid2.png?url';
import ibuGrid3 from '../../assets/images/battleUI/grid3.png?url';
import ibuGunshot1$info from '../../assets/images/battleUI/gunshot1.json?url';
import ibuGunshot1 from '../../assets/images/battleUI/gunshot1.png?url';
import ibuGunshot2 from '../../assets/images/battleUI/gunshot2.png?url';
import ibuHarm from '../../assets/images/battleUI/harm.png?url';
import ibuIndicator$info from '../../assets/images/battleUI/indicator.json?url';
import ibuIndicator from '../../assets/images/battleUI/indicator.png?url';
import ibuNotebook from '../../assets/images/battleUI/notebook.png?url';
import ibuNotify$info from '../../assets/images/battleUI/notify.json?url';
import ibuNotify from '../../assets/images/battleUI/notify.png?url';
import ibuOrangeSOUL$info from '../../assets/images/battleUI/orangeSOUL.json?url';
import ibuOrangeSOUL from '../../assets/images/battleUI/orangeSOUL.png?url';
import ibuPoof$info from '../../assets/images/battleUI/poof.json?url';
import ibuPoof from '../../assets/images/battleUI/poof.png?url';
import ibuPurpleSOUL$info from '../../assets/images/battleUI/purpleSOUL.json?url';
import ibuPurpleSOUL from '../../assets/images/battleUI/purpleSOUL.png?url';
import ibuRun$info from '../../assets/images/battleUI/run.json?url';
import ibuRun from '../../assets/images/battleUI/run.png?url';
import ibuShatter$info from '../../assets/images/battleUI/shatter.json?url';
import ibuShatter from '../../assets/images/battleUI/shatter.png?url';
import ibuStar$info from '../../assets/images/battleUI/star.json?url';
import ibuStar from '../../assets/images/battleUI/star.png?url';
import ibuSwing$info from '../../assets/images/battleUI/swing.json?url';
import ibuSwing from '../../assets/images/battleUI/swing.png?url';
import ibuYellowSOUL$info from '../../assets/images/battleUI/yellowSOUL.json?url';
import ibuYellowSOUL from '../../assets/images/battleUI/yellowSOUL.png?url';
import ibuYellowShot$info from '../../assets/images/battleUI/yellowShot.json?url';
import ibuYellowShot from '../../assets/images/battleUI/yellowShot.png?url';
import idcAlphysCutscene1 from '../../assets/images/dialogueCharacters/alphys/cutscene1.png?url';
import idcAlphysCutscene2 from '../../assets/images/dialogueCharacters/alphys/cutscene2.png?url';
import idcAlphysCutscene3 from '../../assets/images/dialogueCharacters/alphys/cutscene3.png?url';
import idcAlphysDontGetAllDreamyEyedOnMeNow from '../../assets/images/dialogueCharacters/alphys/dontGetAllDreamyEyedOnMeNow.png?url';
import idcAlphysFr from '../../assets/images/dialogueCharacters/alphys/fr.png?url';
import idcAlphysGarbo from '../../assets/images/dialogueCharacters/alphys/garbo.png?url';
import idcAlphysGarboCenter from '../../assets/images/dialogueCharacters/alphys/garboCenter.png?url';
import idcAlphysHaveSomeCompassion from '../../assets/images/dialogueCharacters/alphys/haveSomeCompassion.png?url';
import idcAlphysHellYeah from '../../assets/images/dialogueCharacters/alphys/hellYeah.png?url';
import idcAlphysIdk from '../../assets/images/dialogueCharacters/alphys/idk.png?url';
import idcAlphysIdk2 from '../../assets/images/dialogueCharacters/alphys/idk2.png?url';
import idcAlphysIdk3 from '../../assets/images/dialogueCharacters/alphys/idk3.png?url';
import idcAlphysInquisitive from '../../assets/images/dialogueCharacters/alphys/inquisitive.png?url';
import idcAlphysNervousLaugh from '../../assets/images/dialogueCharacters/alphys/nervousLaugh.png?url';
import idcAlphysNeutralSweat from '../../assets/images/dialogueCharacters/alphys/neutralSweat.png?url';
import idcAlphysOhGodNo from '../../assets/images/dialogueCharacters/alphys/ohGodNo.png?url';
import idcAlphysShocked from '../../assets/images/dialogueCharacters/alphys/shocked.png?url';
import idcAlphysSide from '../../assets/images/dialogueCharacters/alphys/side.png?url';
import idcAlphysSideSad from '../../assets/images/dialogueCharacters/alphys/sideSad.png?url';
import idcAlphysSmarmy from '../../assets/images/dialogueCharacters/alphys/smarmy.png?url';
import idcAlphysSmarmyAggressive from '../../assets/images/dialogueCharacters/alphys/smarmyAggressive.png?url';
import idcAlphysSmileSweat from '../../assets/images/dialogueCharacters/alphys/smileSweat.png?url';
import idcAlphysSoAwesome from '../../assets/images/dialogueCharacters/alphys/soAwesome.png?url';
import idcAlphysThatSucks from '../../assets/images/dialogueCharacters/alphys/thatSucks.png?url';
import idcAlphysTheFactIs from '../../assets/images/dialogueCharacters/alphys/theFactIs.png?url';
import idcAlphysUhButHeresTheDeal from '../../assets/images/dialogueCharacters/alphys/uhButHeresTheDeal.png?url';
import idcAlphysWelp from '../../assets/images/dialogueCharacters/alphys/welp.png?url';
import idcAlphysWhyOhWhy from '../../assets/images/dialogueCharacters/alphys/whyOhWhy.png?url';
import idcAlphysWorried from '../../assets/images/dialogueCharacters/alphys/worried.png?url';
import idcAlphysWtf from '../../assets/images/dialogueCharacters/alphys/wtf.png?url';
import idcAlphysWtf2 from '../../assets/images/dialogueCharacters/alphys/wtf2.png?url';
import idcAlphysYeahYouKnowWhatsUp from '../../assets/images/dialogueCharacters/alphys/yeahYouKnowWhatsUp.png?url';
import idcAlphysYeahYouKnowWhatsUpCenter from '../../assets/images/dialogueCharacters/alphys/yeahYouKnowWhatsUpCenter.png?url';
import idcAlphysYupEverythingsFine from '../../assets/images/dialogueCharacters/alphys/yupEverythingsFine.png?url';
import idcAsgoreBlank from '../../assets/images/dialogueCharacters/asgore/blank.png?url';
import idcAsgoreBound$info from '../../assets/images/dialogueCharacters/asgore/bound.json?url';
import idcAsgoreBound from '../../assets/images/dialogueCharacters/asgore/bound.png?url';
import idcAsgoreBouttacry$info from '../../assets/images/dialogueCharacters/asgore/bouttacry.json?url';
import idcAsgoreBouttacry from '../../assets/images/dialogueCharacters/asgore/bouttacry.png?url';
import idcAsgoreBreak1 from '../../assets/images/dialogueCharacters/asgore/break1.png?url';
import idcAsgoreBreak2 from '../../assets/images/dialogueCharacters/asgore/break2.png?url';
import idcAsgoreContemplative$info from '../../assets/images/dialogueCharacters/asgore/contemplative.json?url';
import idcAsgoreContemplative from '../../assets/images/dialogueCharacters/asgore/contemplative.png?url';
import idcAsgoreCry1$info from '../../assets/images/dialogueCharacters/asgore/cry1.json?url';
import idcAsgoreCry1 from '../../assets/images/dialogueCharacters/asgore/cry1.png?url';
import idcAsgoreCry2 from '../../assets/images/dialogueCharacters/asgore/cry2.png?url';
import idcAsgoreCutscene1$info from '../../assets/images/dialogueCharacters/asgore/cutscene1.json?url';
import idcAsgoreCutscene1 from '../../assets/images/dialogueCharacters/asgore/cutscene1.png?url';
import idcAsgoreFunni$info from '../../assets/images/dialogueCharacters/asgore/funni.json?url';
import idcAsgoreFunni from '../../assets/images/dialogueCharacters/asgore/funni.png?url';
import idcAsgoreHmph$info from '../../assets/images/dialogueCharacters/asgore/hmph.json?url';
import idcAsgoreHmph from '../../assets/images/dialogueCharacters/asgore/hmph.png?url';
import idcAsgoreHmphClosed$info from '../../assets/images/dialogueCharacters/asgore/hmphClosed.json?url';
import idcAsgoreHmphClosed from '../../assets/images/dialogueCharacters/asgore/hmphClosed.png?url';
import idcAsgoreHopeful$info from '../../assets/images/dialogueCharacters/asgore/hopeful.json?url';
import idcAsgoreHopeful from '../../assets/images/dialogueCharacters/asgore/hopeful.png?url';
import idcAsgoreHopefulSide$info from '../../assets/images/dialogueCharacters/asgore/hopefulSide.json?url';
import idcAsgoreHopefulSide from '../../assets/images/dialogueCharacters/asgore/hopefulSide.png?url';
import idcAsgoreItsHim from '../../assets/images/dialogueCharacters/asgore/itsHim.png?url';
import idcAsgoreLoverboy$info from '../../assets/images/dialogueCharacters/asgore/loverboy.json?url';
import idcAsgoreLoverboy from '../../assets/images/dialogueCharacters/asgore/loverboy.png?url';
import idcAsgoreMad$info from '../../assets/images/dialogueCharacters/asgore/mad.json?url';
import idcAsgoreMad from '../../assets/images/dialogueCharacters/asgore/mad.png?url';
import idcAsgoreMadClosed$info from '../../assets/images/dialogueCharacters/asgore/madClosed.json?url';
import idcAsgoreMadClosed from '../../assets/images/dialogueCharacters/asgore/madClosed.png?url';
import idcAsgorePensive$info from '../../assets/images/dialogueCharacters/asgore/pensive.json?url';
import idcAsgorePensive from '../../assets/images/dialogueCharacters/asgore/pensive.png?url';
import idcAsgorePensiveSmile$info from '../../assets/images/dialogueCharacters/asgore/pensiveSmile.json?url';
import idcAsgorePensiveSmile from '../../assets/images/dialogueCharacters/asgore/pensiveSmile.png?url';
import idcAsgoreSide$info from '../../assets/images/dialogueCharacters/asgore/side.json?url';
import idcAsgoreSide from '../../assets/images/dialogueCharacters/asgore/side.png?url';
import idcAsgoreSmacked from '../../assets/images/dialogueCharacters/asgore/smacked.png?url';
import idcAsgoreWat$info from '../../assets/images/dialogueCharacters/asgore/wat.json?url';
import idcAsgoreWat from '../../assets/images/dialogueCharacters/asgore/wat.png?url';
import idcAsgoreWhatHaveYouDone$info from '../../assets/images/dialogueCharacters/asgore/whatHaveYouDone.json?url';
import idcAsgoreWhatHaveYouDone from '../../assets/images/dialogueCharacters/asgore/whatHaveYouDone.png?url';
import idcAsgoreWhatYouDoin$info from '../../assets/images/dialogueCharacters/asgore/whatYouDoin.json?url';
import idcAsgoreWhatYouDoin from '../../assets/images/dialogueCharacters/asgore/whatYouDoin.png?url';
import idcAsrielBooped$info from '../../assets/images/dialogueCharacters/asriel/booped.json?url';
import idcAsrielBooped from '../../assets/images/dialogueCharacters/asriel/booped.png?url';
import idcAsrielCocky$info from '../../assets/images/dialogueCharacters/asriel/cocky.json?url';
import idcAsrielCocky from '../../assets/images/dialogueCharacters/asriel/cocky.png?url';
import idcAsrielDetermined$info from '../../assets/images/dialogueCharacters/asriel/determined.json?url';
import idcAsrielDetermined from '../../assets/images/dialogueCharacters/asriel/determined.png?url';
import idcAsrielEvil$info from '../../assets/images/dialogueCharacters/asriel/evil.json?url';
import idcAsrielEvil from '../../assets/images/dialogueCharacters/asriel/evil.png?url';
import idcAsrielEvilClosed$info from '../../assets/images/dialogueCharacters/asriel/evilClosed.json?url';
import idcAsrielEvilClosed from '../../assets/images/dialogueCharacters/asriel/evilClosed.png?url';
import idcAsrielExhaust$info from '../../assets/images/dialogueCharacters/asriel/exhaust.json?url';
import idcAsrielExhaust from '../../assets/images/dialogueCharacters/asriel/exhaust.png?url';
import idcAsrielFear$info from '../../assets/images/dialogueCharacters/asriel/fear.json?url';
import idcAsrielFear from '../../assets/images/dialogueCharacters/asriel/fear.png?url';
import idcAsrielFocus$info from '../../assets/images/dialogueCharacters/asriel/focus.json?url';
import idcAsrielFocus from '../../assets/images/dialogueCharacters/asriel/focus.png?url';
import idcAsrielFocusClosed$info from '../../assets/images/dialogueCharacters/asriel/focusClosed.json?url';
import idcAsrielFocusClosed from '../../assets/images/dialogueCharacters/asriel/focusClosed.png?url';
import idcAsrielFocusSide$info from '../../assets/images/dialogueCharacters/asriel/focusSide.json?url';
import idcAsrielFocusSide from '../../assets/images/dialogueCharacters/asriel/focusSide.png?url';
import idcAsrielFurrow$info from '../../assets/images/dialogueCharacters/asriel/furrow.json?url';
import idcAsrielFurrow from '../../assets/images/dialogueCharacters/asriel/furrow.png?url';
import idcAsrielGrateful$info from '../../assets/images/dialogueCharacters/asriel/grateful.json?url';
import idcAsrielGrateful from '../../assets/images/dialogueCharacters/asriel/grateful.png?url';
import idcAsrielHmmOkayICanKindaSeeWhereYouCominFrom$info from '../../assets/images/dialogueCharacters/asriel/hmmOkayICanKindaSeeWhereYouCominFrom.json?url';
import idcAsrielHmmOkayICanKindaSeeWhereYouCominFrom from '../../assets/images/dialogueCharacters/asriel/hmmOkayICanKindaSeeWhereYouCominFrom.png?url';
import idcAsrielHuh$info from '../../assets/images/dialogueCharacters/asriel/huh.json?url';
import idcAsrielHuh from '../../assets/images/dialogueCharacters/asriel/huh.png?url';
import idcAsrielKawaii$info from '../../assets/images/dialogueCharacters/asriel/kawaii.json?url';
import idcAsrielKawaii from '../../assets/images/dialogueCharacters/asriel/kawaii.png?url';
import idcAsrielNervous$info from '../../assets/images/dialogueCharacters/asriel/nervous.json?url';
import idcAsrielNervous from '../../assets/images/dialogueCharacters/asriel/nervous.png?url';
import idcAsrielNice$info from '../../assets/images/dialogueCharacters/asriel/nice.json?url';
import idcAsrielNice from '../../assets/images/dialogueCharacters/asriel/nice.png?url';
import idcAsrielOhReally$info from '../../assets/images/dialogueCharacters/asriel/ohReally.json?url';
import idcAsrielOhReally from '../../assets/images/dialogueCharacters/asriel/ohReally.png?url';
import idcAsrielOhReallyClosed$info from '../../assets/images/dialogueCharacters/asriel/ohReallyClosed.json?url';
import idcAsrielOhReallyClosed from '../../assets/images/dialogueCharacters/asriel/ohReallyClosed.png?url';
import idcAsrielPlain$info from '../../assets/images/dialogueCharacters/asriel/plain.json?url';
import idcAsrielPlain from '../../assets/images/dialogueCharacters/asriel/plain.png?url';
import idcAsrielPlainClosed$info from '../../assets/images/dialogueCharacters/asriel/plainClosed.json?url';
import idcAsrielPlainClosed from '../../assets/images/dialogueCharacters/asriel/plainClosed.png?url';
import idcAsrielSade1 from '../../assets/images/dialogueCharacters/asriel/sade1.png?url';
import idcAsrielSade2 from '../../assets/images/dialogueCharacters/asriel/sade2.png?url';
import idcAsrielSade3 from '../../assets/images/dialogueCharacters/asriel/sade3.png?url';
import idcAsrielSmirk$info from '../../assets/images/dialogueCharacters/asriel/smirk.json?url';
import idcAsrielSmirk from '../../assets/images/dialogueCharacters/asriel/smirk.png?url';
import idcAsrielSmirkHappy$info from '../../assets/images/dialogueCharacters/asriel/smirkHappy.json?url';
import idcAsrielSmirkHappy from '../../assets/images/dialogueCharacters/asriel/smirkHappy.png?url';
import idcAsrielSussmile$info from '../../assets/images/dialogueCharacters/asriel/sussmile.json?url';
import idcAsrielSussmile from '../../assets/images/dialogueCharacters/asriel/sussmile.png?url';
import idcAsrielTakumi from '../../assets/images/dialogueCharacters/asriel/takumi.png?url';
import idcAsrielWink from '../../assets/images/dialogueCharacters/asriel/wink.png?url';
import idcKiddAww$info from '../../assets/images/dialogueCharacters/kidd/aww.json?url';
import idcKiddAww from '../../assets/images/dialogueCharacters/kidd/aww.png?url';
import idcKiddCutscene1$info from '../../assets/images/dialogueCharacters/kidd/cutscene1.json?url';
import idcKiddCutscene1 from '../../assets/images/dialogueCharacters/kidd/cutscene1.png?url';
import idcKiddDetermined$info from '../../assets/images/dialogueCharacters/kidd/determined.json?url';
import idcKiddDetermined from '../../assets/images/dialogueCharacters/kidd/determined.png?url';
import idcKiddHuh$info from '../../assets/images/dialogueCharacters/kidd/huh.json?url';
import idcKiddHuh from '../../assets/images/dialogueCharacters/kidd/huh.png?url';
import idcKiddHuhSlave$info from '../../assets/images/dialogueCharacters/kidd/huhSlave.json?url';
import idcKiddHuhSlave from '../../assets/images/dialogueCharacters/kidd/huhSlave.png?url';
import idcKiddKiller$info from '../../assets/images/dialogueCharacters/kidd/killer.json?url';
import idcKiddKiller from '../../assets/images/dialogueCharacters/kidd/killer.png?url';
import idcKiddKillerSlave$info from '../../assets/images/dialogueCharacters/kidd/killerSlave.json?url';
import idcKiddKillerSlave from '../../assets/images/dialogueCharacters/kidd/killerSlave.png?url';
import idcKiddNeutral$info from '../../assets/images/dialogueCharacters/kidd/neutral.json?url';
import idcKiddNeutral from '../../assets/images/dialogueCharacters/kidd/neutral.png?url';
import idcKiddNeutralSlave$info from '../../assets/images/dialogueCharacters/kidd/neutralSlave.json?url';
import idcKiddNeutralSlave from '../../assets/images/dialogueCharacters/kidd/neutralSlave.png?url';
import idcKiddSerene$info from '../../assets/images/dialogueCharacters/kidd/serene.json?url';
import idcKiddSerene from '../../assets/images/dialogueCharacters/kidd/serene.png?url';
import idcKiddShocked$info from '../../assets/images/dialogueCharacters/kidd/shocked.json?url';
import idcKiddShocked from '../../assets/images/dialogueCharacters/kidd/shocked.png?url';
import idcKiddShockedSlave$info from '../../assets/images/dialogueCharacters/kidd/shockedSlave.json?url';
import idcKiddShockedSlave from '../../assets/images/dialogueCharacters/kidd/shockedSlave.png?url';
import idcKiddSide$info from '../../assets/images/dialogueCharacters/kidd/side.json?url';
import idcKiddSide from '../../assets/images/dialogueCharacters/kidd/side.png?url';
import idcKiddStarstruck$info from '../../assets/images/dialogueCharacters/kidd/starstruck.json?url';
import idcKiddStarstruck from '../../assets/images/dialogueCharacters/kidd/starstruck.png?url';
import idcMettatonNeo from '../../assets/images/dialogueCharacters/mettaton/neo.png?url';
import idcPapyrusAYAYA$info from '../../assets/images/dialogueCharacters/papyrus/AYAYA.json?url';
import idcPapyrusAYAYA from '../../assets/images/dialogueCharacters/papyrus/AYAYA.png?url';
import idcPapyrusAyoo$info from '../../assets/images/dialogueCharacters/papyrus/ayoo.json?url';
import idcPapyrusAyoo from '../../assets/images/dialogueCharacters/papyrus/ayoo.png?url';
import idcPapyrusCutscene1$info from '../../assets/images/dialogueCharacters/papyrus/cutscene1.json?url';
import idcPapyrusCutscene1 from '../../assets/images/dialogueCharacters/papyrus/cutscene1.png?url';
import idcPapyrusDisbeef$info from '../../assets/images/dialogueCharacters/papyrus/disbeef.json?url';
import idcPapyrusDisbeef from '../../assets/images/dialogueCharacters/papyrus/disbeef.png?url';
import idcPapyrusDisbeefTurnaround$info from '../../assets/images/dialogueCharacters/papyrus/disbeefTurnaround.json?url';
import idcPapyrusDisbeefTurnaround from '../../assets/images/dialogueCharacters/papyrus/disbeefTurnaround.png?url';
import idcPapyrusIsthatso$info from '../../assets/images/dialogueCharacters/papyrus/isthatso.json?url';
import idcPapyrusIsthatso from '../../assets/images/dialogueCharacters/papyrus/isthatso.png?url';
import idcPapyrusNervousLaugh$info from '../../assets/images/dialogueCharacters/papyrus/nervousLaugh.json?url';
import idcPapyrusNervousLaugh from '../../assets/images/dialogueCharacters/papyrus/nervousLaugh.png?url';
import idcPapyrusNervousSweat$info from '../../assets/images/dialogueCharacters/papyrus/nervousSweat.json?url';
import idcPapyrusNervousSweat from '../../assets/images/dialogueCharacters/papyrus/nervousSweat.png?url';
import idcPapyrusNyeh$info from '../../assets/images/dialogueCharacters/papyrus/nyeh.json?url';
import idcPapyrusNyeh from '../../assets/images/dialogueCharacters/papyrus/nyeh.png?url';
import idcPapyrusSad$info from '../../assets/images/dialogueCharacters/papyrus/sad.json?url';
import idcPapyrusSad from '../../assets/images/dialogueCharacters/papyrus/sad.png?url';
import idcPapyrusSadSweat$info from '../../assets/images/dialogueCharacters/papyrus/sadSweat.json?url';
import idcPapyrusSadSweat from '../../assets/images/dialogueCharacters/papyrus/sadSweat.png?url';
import idcPapyrusThisissosad$info from '../../assets/images/dialogueCharacters/papyrus/thisissosad.json?url';
import idcPapyrusThisissosad from '../../assets/images/dialogueCharacters/papyrus/thisissosad.png?url';
import idcPapyrusWhatchagonnado$info from '../../assets/images/dialogueCharacters/papyrus/whatchagonnado.json?url';
import idcPapyrusWhatchagonnado from '../../assets/images/dialogueCharacters/papyrus/whatchagonnado.png?url';
import idcSansBlink from '../../assets/images/dialogueCharacters/sans/blink.png?url';
import idcSansBlinkTomato from '../../assets/images/dialogueCharacters/sans/blinkTomato.png?url';
import idcSansEmpty from '../../assets/images/dialogueCharacters/sans/empty.png?url';
import idcSansEye$info from '../../assets/images/dialogueCharacters/sans/eye.json?url';
import idcSansEye from '../../assets/images/dialogueCharacters/sans/eye.png?url';
import idcSansLaugh1 from '../../assets/images/dialogueCharacters/sans/laugh1.png?url';
import idcSansLaugh2 from '../../assets/images/dialogueCharacters/sans/laugh2.png?url';
import idcSansNormal from '../../assets/images/dialogueCharacters/sans/normal.png?url';
import idcSansWink from '../../assets/images/dialogueCharacters/sans/wink.png?url';
import idcSansWinkTomato from '../../assets/images/dialogueCharacters/sans/winkTomato.png?url';
import idcTorielBlank from '../../assets/images/dialogueCharacters/toriel/blank.png?url';
import idcTorielBlush$info from '../../assets/images/dialogueCharacters/toriel/blush.json?url';
import idcTorielBlush from '../../assets/images/dialogueCharacters/toriel/blush.png?url';
import idcTorielCompassion$info from '../../assets/images/dialogueCharacters/toriel/compassion.json?url';
import idcTorielCompassion from '../../assets/images/dialogueCharacters/toriel/compassion.png?url';
import idcTorielCompassionfrown$info from '../../assets/images/dialogueCharacters/toriel/compassionfrown.json?url';
import idcTorielCompassionfrown from '../../assets/images/dialogueCharacters/toriel/compassionfrown.png?url';
import idcTorielCompassionsmile$info from '../../assets/images/dialogueCharacters/toriel/compassionsmile.json?url';
import idcTorielCompassionsmile from '../../assets/images/dialogueCharacters/toriel/compassionsmile.png?url';
import idcTorielConcern$info from '../../assets/images/dialogueCharacters/toriel/concern.json?url';
import idcTorielConcern from '../../assets/images/dialogueCharacters/toriel/concern.png?url';
import idcTorielCry$info from '../../assets/images/dialogueCharacters/toriel/cry.json?url';
import idcTorielCry from '../../assets/images/dialogueCharacters/toriel/cry.png?url';
import idcTorielCrylaugh$info from '../../assets/images/dialogueCharacters/toriel/crylaugh.json?url';
import idcTorielCrylaugh from '../../assets/images/dialogueCharacters/toriel/crylaugh.png?url';
import idcTorielCutscene1$info from '../../assets/images/dialogueCharacters/toriel/cutscene1.json?url';
import idcTorielCutscene1 from '../../assets/images/dialogueCharacters/toriel/cutscene1.png?url';
import idcTorielCutscene2$info from '../../assets/images/dialogueCharacters/toriel/cutscene2.json?url';
import idcTorielCutscene2 from '../../assets/images/dialogueCharacters/toriel/cutscene2.png?url';
import idcTorielDreamworks$info from '../../assets/images/dialogueCharacters/toriel/dreamworks.json?url';
import idcTorielDreamworks from '../../assets/images/dialogueCharacters/toriel/dreamworks.png?url';
import idcTorielEverythingisfine$info from '../../assets/images/dialogueCharacters/toriel/everythingisfine.json?url';
import idcTorielEverythingisfine from '../../assets/images/dialogueCharacters/toriel/everythingisfine.png?url';
import idcTorielLowconcern$info from '../../assets/images/dialogueCharacters/toriel/lowconcern.json?url';
import idcTorielLowconcern from '../../assets/images/dialogueCharacters/toriel/lowconcern.png?url';
import idcTorielMad$info from '../../assets/images/dialogueCharacters/toriel/mad.json?url';
import idcTorielMad from '../../assets/images/dialogueCharacters/toriel/mad.png?url';
import idcTorielSad$info from '../../assets/images/dialogueCharacters/toriel/sad.json?url';
import idcTorielSad from '../../assets/images/dialogueCharacters/toriel/sad.png?url';
import idcTorielShock$info from '../../assets/images/dialogueCharacters/toriel/shock.json?url';
import idcTorielShock from '../../assets/images/dialogueCharacters/toriel/shock.png?url';
import idcTorielSincere$info from '../../assets/images/dialogueCharacters/toriel/sincere.json?url';
import idcTorielSincere from '../../assets/images/dialogueCharacters/toriel/sincere.png?url';
import idcTorielSmallxd$info from '../../assets/images/dialogueCharacters/toriel/smallxd.json?url';
import idcTorielSmallxd from '../../assets/images/dialogueCharacters/toriel/smallxd.png?url';
import idcTorielStraightup$info from '../../assets/images/dialogueCharacters/toriel/straightup.json?url';
import idcTorielStraightup from '../../assets/images/dialogueCharacters/toriel/straightup.png?url';
import idcTorielSus from '../../assets/images/dialogueCharacters/toriel/sus.png?url';
import idcTorielTired$info from '../../assets/images/dialogueCharacters/toriel/tired.json?url';
import idcTorielTired from '../../assets/images/dialogueCharacters/toriel/tired.png?url';
import idcTorielWtf$info from '../../assets/images/dialogueCharacters/toriel/wtf.json?url';
import idcTorielWtf from '../../assets/images/dialogueCharacters/toriel/wtf.png?url';
import idcTorielWtf2$info from '../../assets/images/dialogueCharacters/toriel/wtf2.json?url';
import idcTorielWtf2 from '../../assets/images/dialogueCharacters/toriel/wtf2.png?url';
import idcTorielXd$info from '../../assets/images/dialogueCharacters/toriel/xd.json?url';
import idcTorielXd from '../../assets/images/dialogueCharacters/toriel/xd.png?url';
import idcTwinklyBroken$info from '../../assets/images/dialogueCharacters/twinkly/broken.json?url';
import idcTwinklyBroken from '../../assets/images/dialogueCharacters/twinkly/broken.png?url';
import idcTwinklyCapping$info from '../../assets/images/dialogueCharacters/twinkly/capping.json?url';
import idcTwinklyCapping from '../../assets/images/dialogueCharacters/twinkly/capping.png?url';
import idcTwinklyCrazed$info from '../../assets/images/dialogueCharacters/twinkly/crazed.json?url';
import idcTwinklyCrazed from '../../assets/images/dialogueCharacters/twinkly/crazed.png?url';
import idcTwinklyDead$info from '../../assets/images/dialogueCharacters/twinkly/dead.json?url';
import idcTwinklyDead from '../../assets/images/dialogueCharacters/twinkly/dead.png?url';
import idcTwinklyEvil$info from '../../assets/images/dialogueCharacters/twinkly/evil.json?url';
import idcTwinklyEvil from '../../assets/images/dialogueCharacters/twinkly/evil.png?url';
import idcTwinklyGonk$info from '../../assets/images/dialogueCharacters/twinkly/gonk.json?url';
import idcTwinklyGonk from '../../assets/images/dialogueCharacters/twinkly/gonk.png?url';
import idcTwinklyGrin$info from '../../assets/images/dialogueCharacters/twinkly/grin.json?url';
import idcTwinklyGrin from '../../assets/images/dialogueCharacters/twinkly/grin.png?url';
import idcTwinklyHurt from '../../assets/images/dialogueCharacters/twinkly/hurt.png?url';
import idcTwinklyKawaii$info from '../../assets/images/dialogueCharacters/twinkly/kawaii.json?url';
import idcTwinklyKawaii from '../../assets/images/dialogueCharacters/twinkly/kawaii.png?url';
import idcTwinklyLaugh$info from '../../assets/images/dialogueCharacters/twinkly/laugh.json?url';
import idcTwinklyLaugh from '../../assets/images/dialogueCharacters/twinkly/laugh.png?url';
import idcTwinklyLose1 from '../../assets/images/dialogueCharacters/twinkly/lose1.png?url';
import idcTwinklyLose2 from '../../assets/images/dialogueCharacters/twinkly/lose2.png?url';
import idcTwinklyLose3 from '../../assets/images/dialogueCharacters/twinkly/lose3.png?url';
import idcTwinklyLose4 from '../../assets/images/dialogueCharacters/twinkly/lose4.png?url';
import idcTwinklyNice$info from '../../assets/images/dialogueCharacters/twinkly/nice.json?url';
import idcTwinklyNice from '../../assets/images/dialogueCharacters/twinkly/nice.png?url';
import idcTwinklyPissed$info from '../../assets/images/dialogueCharacters/twinkly/pissed.json?url';
import idcTwinklyPissed from '../../assets/images/dialogueCharacters/twinkly/pissed.png?url';
import idcTwinklyPlain$info from '../../assets/images/dialogueCharacters/twinkly/plain.json?url';
import idcTwinklyPlain from '../../assets/images/dialogueCharacters/twinkly/plain.png?url';
import idcTwinklyPlead from '../../assets/images/dialogueCharacters/twinkly/plead.png?url';
import idcTwinklyRegret$info from '../../assets/images/dialogueCharacters/twinkly/regret.json?url';
import idcTwinklyRegret from '../../assets/images/dialogueCharacters/twinkly/regret.png?url';
import idcTwinklySassy$info from '../../assets/images/dialogueCharacters/twinkly/sassy.json?url';
import idcTwinklySassy from '../../assets/images/dialogueCharacters/twinkly/sassy.png?url';
import idcTwinklySide$info from '../../assets/images/dialogueCharacters/twinkly/side.json?url';
import idcTwinklySide from '../../assets/images/dialogueCharacters/twinkly/side.png?url';
import idcTwinklyTwisted from '../../assets/images/dialogueCharacters/twinkly/twisted.png?url';
import idcTwinklyWink from '../../assets/images/dialogueCharacters/twinkly/wink.png?url';
import idcUndyneAngryTomato from '../../assets/images/dialogueCharacters/undyne/angryTomato.png?url';
import idcUndyneBattleTorso from '../../assets/images/dialogueCharacters/undyne/battle_torso.png?url';
import idcUndyneCutscene1 from '../../assets/images/dialogueCharacters/undyne/cutscene1.png?url';
import idcUndyneDafuq from '../../assets/images/dialogueCharacters/undyne/dafuq.png?url';
import idcUndyneDateTorsoBody from '../../assets/images/dialogueCharacters/undyne/date_torso_body.png?url';
import idcUndyneGrr from '../../assets/images/dialogueCharacters/undyne/grr.png?url';
import idcUndyneGrrSide from '../../assets/images/dialogueCharacters/undyne/grrSide.png?url';
import idcUndyneHappyTomato from '../../assets/images/dialogueCharacters/undyne/happyTomato.png?url';
import idcUndyneImOntoYouPunk from '../../assets/images/dialogueCharacters/undyne/imOntoYouPunk.png?url';
import idcUndyneLaughcrazy from '../../assets/images/dialogueCharacters/undyne/laughcrazy.png?url';
import idcUndynePensive from '../../assets/images/dialogueCharacters/undyne/pensive.png?url';
import idcUndyneSquidgames from '../../assets/images/dialogueCharacters/undyne/squidgames.png?url';
import idcUndyneSus from '../../assets/images/dialogueCharacters/undyne/sus.png?url';
import idcUndyneSweating from '../../assets/images/dialogueCharacters/undyne/sweating.png?url';
import idcUndyneTheHell from '../../assets/images/dialogueCharacters/undyne/theHell.png?url';
import idcUndyneBeingAwesomeForTenMinutesStraight from '../../assets/images/dialogueCharacters/undyne/undyneBeingAwesomeForTenMinutesStraight.png?url';
import idcUndyneUwu from '../../assets/images/dialogueCharacters/undyne/uwu.png?url';
import idcUndyneWhatevs from '../../assets/images/dialogueCharacters/undyne/whatevs.png?url';
import idcUndyneWtfbro from '../../assets/images/dialogueCharacters/undyne/wtfbro.png?url';
import idcUndyneYouKilledHim from '../../assets/images/dialogueCharacters/undyne/youKilledHim.png?url';
import idcUndyneYouKilledHimPensive from '../../assets/images/dialogueCharacters/undyne/youKilledHimPensive.png?url';
import idcUndyneYouKilledHimSide from '../../assets/images/dialogueCharacters/undyne/youKilledHimSide.png?url';
import idcUndyneYouKilledHimSmile from '../../assets/images/dialogueCharacters/undyne/youKilledHimSmile.png?url';
import idcUndyneYouKilledHimStare from '../../assets/images/dialogueCharacters/undyne/youKilledHimStare.png?url';
import ieSOUL from '../../assets/images/extras/SOUL.png?url';
import ieBarrier$info from '../../assets/images/extras/barrier.json?url';
import ieBarrier from '../../assets/images/extras/barrier.png?url';
import ieBossSOUL from '../../assets/images/extras/bossSOUL.png?url';
import ieButtonC from '../../assets/images/extras/buttonC.png?url';
import ieButtonF from '../../assets/images/extras/buttonF.png?url';
import ieButtonM from '../../assets/images/extras/buttonM.png?url';
import ieButtonX from '../../assets/images/extras/buttonX.png?url';
import ieButtonZ from '../../assets/images/extras/buttonZ.png?url';
import ieEurybia from '../../assets/images/extras/eurybia.png?url';
import ieGay$info from '../../assets/images/extras/gay.json?url';
import ieGay from '../../assets/images/extras/gay.png?url';
import ieHomeworld from '../../assets/images/extras/homeworld.png?url';
import ieReal from '../../assets/images/extras/real.png?url';
import ieSplashBackground from '../../assets/images/extras/splash-background.png?url';
import ieSplashForeground from '../../assets/images/extras/splash-foreground.png?url';
import ieStarbertBGum from '../../assets/images/extras/starbertB_gum.png?url';
import ieStarbertArrow from '../../assets/images/extras/starbert_arrow.png?url';
import ieStory$info from '../../assets/images/extras/story.json?url';
import ieStory from '../../assets/images/extras/story.png?url';
import ieStoryParallax1 from '../../assets/images/extras/story_parallax1.png?url';
import ieStoryParallax2 from '../../assets/images/extras/story_parallax2.png?url';
import ieStoryParallax3 from '../../assets/images/extras/story_parallax3.png?url';
import ieStoryParallax4 from '../../assets/images/extras/story_parallax4.png?url';
import ieStoryParallax5 from '../../assets/images/extras/story_parallax5.png?url';
import ieTelescope from '../../assets/images/extras/telescope.png?url';
import iocAlphysDown$info from '../../assets/images/overworldCharacters/alphys/down.json?url';
import iocAlphysDown from '../../assets/images/overworldCharacters/alphys/down.png?url';
import iocAlphysDownSad$info from '../../assets/images/overworldCharacters/alphys/downSad.json?url';
import iocAlphysDownSad from '../../assets/images/overworldCharacters/alphys/downSad.png?url';
import iocAlphysDownSadTalk$info from '../../assets/images/overworldCharacters/alphys/downSadTalk.json?url';
import iocAlphysDownSadTalk from '../../assets/images/overworldCharacters/alphys/downSadTalk.png?url';
import iocAlphysDownTalk$info from '../../assets/images/overworldCharacters/alphys/downTalk.json?url';
import iocAlphysDownTalk from '../../assets/images/overworldCharacters/alphys/downTalk.png?url';
import iocAlphysFreaked from '../../assets/images/overworldCharacters/alphys/freaked.png?url';
import iocAlphysLeft$info from '../../assets/images/overworldCharacters/alphys/left.json?url';
import iocAlphysLeft from '../../assets/images/overworldCharacters/alphys/left.png?url';
import iocAlphysLeftSad$info from '../../assets/images/overworldCharacters/alphys/leftSad.json?url';
import iocAlphysLeftSad from '../../assets/images/overworldCharacters/alphys/leftSad.png?url';
import iocAlphysLeftSadTalk$info from '../../assets/images/overworldCharacters/alphys/leftSadTalk.json?url';
import iocAlphysLeftSadTalk from '../../assets/images/overworldCharacters/alphys/leftSadTalk.png?url';
import iocAlphysLeftTalk$info from '../../assets/images/overworldCharacters/alphys/leftTalk.json?url';
import iocAlphysLeftTalk from '../../assets/images/overworldCharacters/alphys/leftTalk.png?url';
import iocAlphysRight$info from '../../assets/images/overworldCharacters/alphys/right.json?url';
import iocAlphysRight from '../../assets/images/overworldCharacters/alphys/right.png?url';
import iocAlphysRightSad$info from '../../assets/images/overworldCharacters/alphys/rightSad.json?url';
import iocAlphysRightSad from '../../assets/images/overworldCharacters/alphys/rightSad.png?url';
import iocAlphysRightSadTalk$info from '../../assets/images/overworldCharacters/alphys/rightSadTalk.json?url';
import iocAlphysRightSadTalk from '../../assets/images/overworldCharacters/alphys/rightSadTalk.png?url';
import iocAlphysRightTalk$info from '../../assets/images/overworldCharacters/alphys/rightTalk.json?url';
import iocAlphysRightTalk from '../../assets/images/overworldCharacters/alphys/rightTalk.png?url';
import iocAlphysSit$info from '../../assets/images/overworldCharacters/alphys/sit.json?url';
import iocAlphysSit from '../../assets/images/overworldCharacters/alphys/sit.png?url';
import iocAlphysSitdown from '../../assets/images/overworldCharacters/alphys/sitdown.png?url';
import iocAlphysSitonion from '../../assets/images/overworldCharacters/alphys/sitonion.png?url';
import iocAlphysSitred$info from '../../assets/images/overworldCharacters/alphys/sitred.json?url';
import iocAlphysSitred from '../../assets/images/overworldCharacters/alphys/sitred.png?url';
import iocAlphysUp$info from '../../assets/images/overworldCharacters/alphys/up.json?url';
import iocAlphysUp from '../../assets/images/overworldCharacters/alphys/up.png?url';
import iocAlphysUpTalk from '../../assets/images/overworldCharacters/alphys/upTalk.png?url';
import iocAsgoreAsrielhug$info from '../../assets/images/overworldCharacters/asgore/asrielhug.json?url';
import iocAsgoreAsrielhug from '../../assets/images/overworldCharacters/asgore/asrielhug.png?url';
import iocAsgoreBound$info from '../../assets/images/overworldCharacters/asgore/bound.json?url';
import iocAsgoreBound from '../../assets/images/overworldCharacters/asgore/bound.png?url';
import iocAsgoreBreak$info from '../../assets/images/overworldCharacters/asgore/break.json?url';
import iocAsgoreBreak from '../../assets/images/overworldCharacters/asgore/break.png?url';
import iocAsgoreDeath$info from '../../assets/images/overworldCharacters/asgore/death.json?url';
import iocAsgoreDeath from '../../assets/images/overworldCharacters/asgore/death.png?url';
import iocAsgoreDeathAlt$info from '../../assets/images/overworldCharacters/asgore/death_alt.json?url';
import iocAsgoreDeathAlt from '../../assets/images/overworldCharacters/asgore/death_alt.png?url';
import iocAsgoreDown$info from '../../assets/images/overworldCharacters/asgore/down.json?url';
import iocAsgoreDown from '../../assets/images/overworldCharacters/asgore/down.png?url';
import iocAsgoreDownHappy$info from '../../assets/images/overworldCharacters/asgore/downHappy.json?url';
import iocAsgoreDownHappy from '../../assets/images/overworldCharacters/asgore/downHappy.png?url';
import iocAsgoreDownTalk$info from '../../assets/images/overworldCharacters/asgore/downTalk.json?url';
import iocAsgoreDownTalk from '../../assets/images/overworldCharacters/asgore/downTalk.png?url';
import iocAsgoreDownTalkHappy$info from '../../assets/images/overworldCharacters/asgore/downTalkHappy.json?url';
import iocAsgoreDownTalkHappy from '../../assets/images/overworldCharacters/asgore/downTalkHappy.png?url';
import iocAsgoreLeft$info from '../../assets/images/overworldCharacters/asgore/left.json?url';
import iocAsgoreLeft from '../../assets/images/overworldCharacters/asgore/left.png?url';
import iocAsgoreLeftHappy$info from '../../assets/images/overworldCharacters/asgore/leftHappy.json?url';
import iocAsgoreLeftHappy from '../../assets/images/overworldCharacters/asgore/leftHappy.png?url';
import iocAsgoreLeftTalk$info from '../../assets/images/overworldCharacters/asgore/leftTalk.json?url';
import iocAsgoreLeftTalk from '../../assets/images/overworldCharacters/asgore/leftTalk.png?url';
import iocAsgoreLeftTalkHappy$info from '../../assets/images/overworldCharacters/asgore/leftTalkHappy.json?url';
import iocAsgoreLeftTalkHappy from '../../assets/images/overworldCharacters/asgore/leftTalkHappy.png?url';
import iocAsgoreRight$info from '../../assets/images/overworldCharacters/asgore/right.json?url';
import iocAsgoreRight from '../../assets/images/overworldCharacters/asgore/right.png?url';
import iocAsgoreRightHappy$info from '../../assets/images/overworldCharacters/asgore/rightHappy.json?url';
import iocAsgoreRightHappy from '../../assets/images/overworldCharacters/asgore/rightHappy.png?url';
import iocAsgoreRightTalk$info from '../../assets/images/overworldCharacters/asgore/rightTalk.json?url';
import iocAsgoreRightTalk from '../../assets/images/overworldCharacters/asgore/rightTalk.png?url';
import iocAsgoreRightTalkHappy$info from '../../assets/images/overworldCharacters/asgore/rightTalkHappy.json?url';
import iocAsgoreRightTalkHappy from '../../assets/images/overworldCharacters/asgore/rightTalkHappy.png?url';
import iocAsgoreUp$info from '../../assets/images/overworldCharacters/asgore/up.json?url';
import iocAsgoreUp from '../../assets/images/overworldCharacters/asgore/up.png?url';
import iocAsgoreUpTalk from '../../assets/images/overworldCharacters/asgore/upTalk.png?url';
import iocAsrielBow$info from '../../assets/images/overworldCharacters/asriel/bow.json?url';
import iocAsrielBow from '../../assets/images/overworldCharacters/asriel/bow.png?url';
import iocAsrielCry1$info from '../../assets/images/overworldCharacters/asriel/cry1.json?url';
import iocAsrielCry1 from '../../assets/images/overworldCharacters/asriel/cry1.png?url';
import iocAsrielCry2$info from '../../assets/images/overworldCharacters/asriel/cry2.json?url';
import iocAsrielCry2 from '../../assets/images/overworldCharacters/asriel/cry2.png?url';
import iocAsrielCry3$info from '../../assets/images/overworldCharacters/asriel/cry3.json?url';
import iocAsrielCry3 from '../../assets/images/overworldCharacters/asriel/cry3.png?url';
import iocAsrielDown$info from '../../assets/images/overworldCharacters/asriel/down.json?url';
import iocAsrielDown from '../../assets/images/overworldCharacters/asriel/down.png?url';
import iocAsrielDownTalk$info from '../../assets/images/overworldCharacters/asriel/downTalk.json?url';
import iocAsrielDownTalk from '../../assets/images/overworldCharacters/asriel/downTalk.png?url';
import iocAsrielEarTug$info from '../../assets/images/overworldCharacters/asriel/earTug.json?url';
import iocAsrielEarTug from '../../assets/images/overworldCharacters/asriel/earTug.png?url';
import iocAsrielEarTugWater$info from '../../assets/images/overworldCharacters/asriel/earTugWater.json?url';
import iocAsrielEarTugWater from '../../assets/images/overworldCharacters/asriel/earTugWater.png?url';
import iocAsrielFly1$info from '../../assets/images/overworldCharacters/asriel/fly1.json?url';
import iocAsrielFly1 from '../../assets/images/overworldCharacters/asriel/fly1.png?url';
import iocAsrielFly2$info from '../../assets/images/overworldCharacters/asriel/fly2.json?url';
import iocAsrielFly2 from '../../assets/images/overworldCharacters/asriel/fly2.png?url';
import iocAsrielHug1$info from '../../assets/images/overworldCharacters/asriel/hug1.json?url';
import iocAsrielHug1 from '../../assets/images/overworldCharacters/asriel/hug1.png?url';
import iocAsrielHug1Water$info from '../../assets/images/overworldCharacters/asriel/hug1_water.json?url';
import iocAsrielHug1Water from '../../assets/images/overworldCharacters/asriel/hug1_water.png?url';
import iocAsrielHug2$info from '../../assets/images/overworldCharacters/asriel/hug2.json?url';
import iocAsrielHug2 from '../../assets/images/overworldCharacters/asriel/hug2.png?url';
import iocAsrielHug3$info from '../../assets/images/overworldCharacters/asriel/hug3.json?url';
import iocAsrielHug3 from '../../assets/images/overworldCharacters/asriel/hug3.png?url';
import iocAsrielKneel from '../../assets/images/overworldCharacters/asriel/kneel.png?url';
import iocAsrielLeft$info from '../../assets/images/overworldCharacters/asriel/left.json?url';
import iocAsrielLeft from '../../assets/images/overworldCharacters/asriel/left.png?url';
import iocAsrielLeftTalk$info from '../../assets/images/overworldCharacters/asriel/leftTalk.json?url';
import iocAsrielLeftTalk from '../../assets/images/overworldCharacters/asriel/leftTalk.png?url';
import iocAsrielPet$info from '../../assets/images/overworldCharacters/asriel/pet.json?url';
import iocAsrielPet from '../../assets/images/overworldCharacters/asriel/pet.png?url';
import iocAsrielPetWater$info from '../../assets/images/overworldCharacters/asriel/petWater.json?url';
import iocAsrielPetWater from '../../assets/images/overworldCharacters/asriel/petWater.png?url';
import iocAsrielRight$info from '../../assets/images/overworldCharacters/asriel/right.json?url';
import iocAsrielRight from '../../assets/images/overworldCharacters/asriel/right.png?url';
import iocAsrielRightHandhold$info from '../../assets/images/overworldCharacters/asriel/rightHandhold.json?url';
import iocAsrielRightHandhold from '../../assets/images/overworldCharacters/asriel/rightHandhold.png?url';
import iocAsrielRightHandholdWater$info from '../../assets/images/overworldCharacters/asriel/rightHandholdWater.json?url';
import iocAsrielRightHandholdWater from '../../assets/images/overworldCharacters/asriel/rightHandholdWater.png?url';
import iocAsrielRightTalk$info from '../../assets/images/overworldCharacters/asriel/rightTalk.json?url';
import iocAsrielRightTalk from '../../assets/images/overworldCharacters/asriel/rightTalk.png?url';
import iocAsrielSleepingbeauty from '../../assets/images/overworldCharacters/asriel/sleepingbeauty.png?url';
import iocAsrielSleepingsadly from '../../assets/images/overworldCharacters/asriel/sleepingsadly.png?url';
import iocAsrielTrueDown$info from '../../assets/images/overworldCharacters/asriel/trueDown.json?url';
import iocAsrielTrueDown from '../../assets/images/overworldCharacters/asriel/trueDown.png?url';
import iocAsrielTrueDownHome from '../../assets/images/overworldCharacters/asriel/trueDownHome.png?url';
import iocAsrielTrueDownHomeTalk$info from '../../assets/images/overworldCharacters/asriel/trueDownHomeTalk.json?url';
import iocAsrielTrueDownHomeTalk from '../../assets/images/overworldCharacters/asriel/trueDownHomeTalk.png?url';
import iocAsrielTrueDownSad$info from '../../assets/images/overworldCharacters/asriel/trueDownSad.json?url';
import iocAsrielTrueDownSad from '../../assets/images/overworldCharacters/asriel/trueDownSad.png?url';
import iocAsrielTrueDownTalk$info from '../../assets/images/overworldCharacters/asriel/trueDownTalk.json?url';
import iocAsrielTrueDownTalk from '../../assets/images/overworldCharacters/asriel/trueDownTalk.png?url';
import iocAsrielTrueDownTalkSad$info from '../../assets/images/overworldCharacters/asriel/trueDownTalkSad.json?url';
import iocAsrielTrueDownTalkSad from '../../assets/images/overworldCharacters/asriel/trueDownTalkSad.png?url';
import iocAsrielTrueLeft$info from '../../assets/images/overworldCharacters/asriel/trueLeft.json?url';
import iocAsrielTrueLeft from '../../assets/images/overworldCharacters/asriel/trueLeft.png?url';
import iocAsrielTrueLeftHome from '../../assets/images/overworldCharacters/asriel/trueLeftHome.png?url';
import iocAsrielTrueLeftHomeTalk$info from '../../assets/images/overworldCharacters/asriel/trueLeftHomeTalk.json?url';
import iocAsrielTrueLeftHomeTalk from '../../assets/images/overworldCharacters/asriel/trueLeftHomeTalk.png?url';
import iocAsrielTrueLeftSad$info from '../../assets/images/overworldCharacters/asriel/trueLeftSad.json?url';
import iocAsrielTrueLeftSad from '../../assets/images/overworldCharacters/asriel/trueLeftSad.png?url';
import iocAsrielTrueLeftSadTalk$info from '../../assets/images/overworldCharacters/asriel/trueLeftSadTalk.json?url';
import iocAsrielTrueLeftSadTalk from '../../assets/images/overworldCharacters/asriel/trueLeftSadTalk.png?url';
import iocAsrielTrueLeftTalk$info from '../../assets/images/overworldCharacters/asriel/trueLeftTalk.json?url';
import iocAsrielTrueLeftTalk from '../../assets/images/overworldCharacters/asriel/trueLeftTalk.png?url';
import iocAsrielTrueRight$info from '../../assets/images/overworldCharacters/asriel/trueRight.json?url';
import iocAsrielTrueRight from '../../assets/images/overworldCharacters/asriel/trueRight.png?url';
import iocAsrielTrueRightHome from '../../assets/images/overworldCharacters/asriel/trueRightHome.png?url';
import iocAsrielTrueRightHomeTalk$info from '../../assets/images/overworldCharacters/asriel/trueRightHomeTalk.json?url';
import iocAsrielTrueRightHomeTalk from '../../assets/images/overworldCharacters/asriel/trueRightHomeTalk.png?url';
import iocAsrielTrueRightSad$info from '../../assets/images/overworldCharacters/asriel/trueRightSad.json?url';
import iocAsrielTrueRightSad from '../../assets/images/overworldCharacters/asriel/trueRightSad.png?url';
import iocAsrielTrueRightSadTalk$info from '../../assets/images/overworldCharacters/asriel/trueRightSadTalk.json?url';
import iocAsrielTrueRightSadTalk from '../../assets/images/overworldCharacters/asriel/trueRightSadTalk.png?url';
import iocAsrielTrueRightTalk$info from '../../assets/images/overworldCharacters/asriel/trueRightTalk.json?url';
import iocAsrielTrueRightTalk from '../../assets/images/overworldCharacters/asriel/trueRightTalk.png?url';
import iocAsrielUp$info from '../../assets/images/overworldCharacters/asriel/up.json?url';
import iocAsrielUp from '../../assets/images/overworldCharacters/asriel/up.png?url';
import iocAsrielUpHome from '../../assets/images/overworldCharacters/asriel/upHome.png?url';
import iocAsrielUpTalk$info from '../../assets/images/overworldCharacters/asriel/upTalk.json?url';
import iocAsrielUpTalk from '../../assets/images/overworldCharacters/asriel/upTalk.png?url';
import iocFriskDown$info from '../../assets/images/overworldCharacters/frisk/down.json?url';
import iocFriskDown from '../../assets/images/overworldCharacters/frisk/down.png?url';
import iocFriskDownArchive$info from '../../assets/images/overworldCharacters/frisk/downArchive.json?url';
import iocFriskDownArchive from '../../assets/images/overworldCharacters/frisk/downArchive.png?url';
import iocFriskDownChara$info from '../../assets/images/overworldCharacters/frisk/downChara.json?url';
import iocFriskDownChara from '../../assets/images/overworldCharacters/frisk/downChara.png?url';
import iocFriskDownCharaFake$info from '../../assets/images/overworldCharacters/frisk/downCharaFake.json?url';
import iocFriskDownCharaFake from '../../assets/images/overworldCharacters/frisk/downCharaFake.png?url';
import iocFriskDownHome$info from '../../assets/images/overworldCharacters/frisk/downHome.json?url';
import iocFriskDownHome from '../../assets/images/overworldCharacters/frisk/downHome.png?url';
import iocFriskDownJetpack$info from '../../assets/images/overworldCharacters/frisk/downJetpack.json?url';
import iocFriskDownJetpack from '../../assets/images/overworldCharacters/frisk/downJetpack.png?url';
import iocFriskDownJetpackOff from '../../assets/images/overworldCharacters/frisk/downJetpackOff.png?url';
import iocFriskDownMirror$info from '../../assets/images/overworldCharacters/frisk/downMirror.json?url';
import iocFriskDownMirror from '../../assets/images/overworldCharacters/frisk/downMirror.png?url';
import iocFriskDownMirrorHome$info from '../../assets/images/overworldCharacters/frisk/downMirrorHome.json?url';
import iocFriskDownMirrorHome from '../../assets/images/overworldCharacters/frisk/downMirrorHome.png?url';
import iocFriskDownMirrorWater$info from '../../assets/images/overworldCharacters/frisk/downMirrorWater.json?url';
import iocFriskDownMirrorWater from '../../assets/images/overworldCharacters/frisk/downMirrorWater.png?url';
import iocFriskDownWater$info from '../../assets/images/overworldCharacters/frisk/downWater.json?url';
import iocFriskDownWater from '../../assets/images/overworldCharacters/frisk/downWater.png?url';
import iocFriskDownWaterArchive$info from '../../assets/images/overworldCharacters/frisk/downWaterArchive.json?url';
import iocFriskDownWaterArchive from '../../assets/images/overworldCharacters/frisk/downWaterArchive.png?url';
import iocFriskDownWaterJetpack$info from '../../assets/images/overworldCharacters/frisk/downWaterJetpack.json?url';
import iocFriskDownWaterJetpack from '../../assets/images/overworldCharacters/frisk/downWaterJetpack.png?url';
import iocFriskDownWaterJetpackOff from '../../assets/images/overworldCharacters/frisk/downWaterJetpackOff.png?url';
import iocFriskLeft$info from '../../assets/images/overworldCharacters/frisk/left.json?url';
import iocFriskLeft from '../../assets/images/overworldCharacters/frisk/left.png?url';
import iocFriskLeftArchive$info from '../../assets/images/overworldCharacters/frisk/leftArchive.json?url';
import iocFriskLeftArchive from '../../assets/images/overworldCharacters/frisk/leftArchive.png?url';
import iocFriskLeftChara$info from '../../assets/images/overworldCharacters/frisk/leftChara.json?url';
import iocFriskLeftChara from '../../assets/images/overworldCharacters/frisk/leftChara.png?url';
import iocFriskLeftCharaFake$info from '../../assets/images/overworldCharacters/frisk/leftCharaFake.json?url';
import iocFriskLeftCharaFake from '../../assets/images/overworldCharacters/frisk/leftCharaFake.png?url';
import iocFriskLeftHome$info from '../../assets/images/overworldCharacters/frisk/leftHome.json?url';
import iocFriskLeftHome from '../../assets/images/overworldCharacters/frisk/leftHome.png?url';
import iocFriskLeftJetpack$info from '../../assets/images/overworldCharacters/frisk/leftJetpack.json?url';
import iocFriskLeftJetpack from '../../assets/images/overworldCharacters/frisk/leftJetpack.png?url';
import iocFriskLeftJetpackOff from '../../assets/images/overworldCharacters/frisk/leftJetpackOff.png?url';
import iocFriskLeftMirror$info from '../../assets/images/overworldCharacters/frisk/leftMirror.json?url';
import iocFriskLeftMirror from '../../assets/images/overworldCharacters/frisk/leftMirror.png?url';
import iocFriskLeftMirrorHome$info from '../../assets/images/overworldCharacters/frisk/leftMirrorHome.json?url';
import iocFriskLeftMirrorHome from '../../assets/images/overworldCharacters/frisk/leftMirrorHome.png?url';
import iocFriskLeftMirrorWater$info from '../../assets/images/overworldCharacters/frisk/leftMirrorWater.json?url';
import iocFriskLeftMirrorWater from '../../assets/images/overworldCharacters/frisk/leftMirrorWater.png?url';
import iocFriskLeftWater$info from '../../assets/images/overworldCharacters/frisk/leftWater.json?url';
import iocFriskLeftWater from '../../assets/images/overworldCharacters/frisk/leftWater.png?url';
import iocFriskLeftWaterArchive$info from '../../assets/images/overworldCharacters/frisk/leftWaterArchive.json?url';
import iocFriskLeftWaterArchive from '../../assets/images/overworldCharacters/frisk/leftWaterArchive.png?url';
import iocFriskLeftWaterJetpack$info from '../../assets/images/overworldCharacters/frisk/leftWaterJetpack.json?url';
import iocFriskLeftWaterJetpack from '../../assets/images/overworldCharacters/frisk/leftWaterJetpack.png?url';
import iocFriskLeftWaterJetpackOff from '../../assets/images/overworldCharacters/frisk/leftWaterJetpackOff.png?url';
import iocFriskLeftWaterPour$info from '../../assets/images/overworldCharacters/frisk/leftWaterPour.json?url';
import iocFriskLeftWaterPour from '../../assets/images/overworldCharacters/frisk/leftWaterPour.png?url';
import iocFriskPat$info from '../../assets/images/overworldCharacters/frisk/pat.json?url';
import iocFriskPat from '../../assets/images/overworldCharacters/frisk/pat.png?url';
import iocFriskRight$info from '../../assets/images/overworldCharacters/frisk/right.json?url';
import iocFriskRight from '../../assets/images/overworldCharacters/frisk/right.png?url';
import iocFriskRightArchive$info from '../../assets/images/overworldCharacters/frisk/rightArchive.json?url';
import iocFriskRightArchive from '../../assets/images/overworldCharacters/frisk/rightArchive.png?url';
import iocFriskRightChara$info from '../../assets/images/overworldCharacters/frisk/rightChara.json?url';
import iocFriskRightChara from '../../assets/images/overworldCharacters/frisk/rightChara.png?url';
import iocFriskRightCharaFake$info from '../../assets/images/overworldCharacters/frisk/rightCharaFake.json?url';
import iocFriskRightCharaFake from '../../assets/images/overworldCharacters/frisk/rightCharaFake.png?url';
import iocFriskRightHome$info from '../../assets/images/overworldCharacters/frisk/rightHome.json?url';
import iocFriskRightHome from '../../assets/images/overworldCharacters/frisk/rightHome.png?url';
import iocFriskRightJetpack$info from '../../assets/images/overworldCharacters/frisk/rightJetpack.json?url';
import iocFriskRightJetpack from '../../assets/images/overworldCharacters/frisk/rightJetpack.png?url';
import iocFriskRightJetpackOff from '../../assets/images/overworldCharacters/frisk/rightJetpackOff.png?url';
import iocFriskRightMirror$info from '../../assets/images/overworldCharacters/frisk/rightMirror.json?url';
import iocFriskRightMirror from '../../assets/images/overworldCharacters/frisk/rightMirror.png?url';
import iocFriskRightMirrorHome$info from '../../assets/images/overworldCharacters/frisk/rightMirrorHome.json?url';
import iocFriskRightMirrorHome from '../../assets/images/overworldCharacters/frisk/rightMirrorHome.png?url';
import iocFriskRightMirrorWater$info from '../../assets/images/overworldCharacters/frisk/rightMirrorWater.json?url';
import iocFriskRightMirrorWater from '../../assets/images/overworldCharacters/frisk/rightMirrorWater.png?url';
import iocFriskRightWater$info from '../../assets/images/overworldCharacters/frisk/rightWater.json?url';
import iocFriskRightWater from '../../assets/images/overworldCharacters/frisk/rightWater.png?url';
import iocFriskRightWaterArchive$info from '../../assets/images/overworldCharacters/frisk/rightWaterArchive.json?url';
import iocFriskRightWaterArchive from '../../assets/images/overworldCharacters/frisk/rightWaterArchive.png?url';
import iocFriskRightWaterJetpack$info from '../../assets/images/overworldCharacters/frisk/rightWaterJetpack.json?url';
import iocFriskRightWaterJetpack from '../../assets/images/overworldCharacters/frisk/rightWaterJetpack.png?url';
import iocFriskRightWaterJetpackOff from '../../assets/images/overworldCharacters/frisk/rightWaterJetpackOff.png?url';
import iocFriskUp$info from '../../assets/images/overworldCharacters/frisk/up.json?url';
import iocFriskUp from '../../assets/images/overworldCharacters/frisk/up.png?url';
import iocFriskUpArchive$info from '../../assets/images/overworldCharacters/frisk/upArchive.json?url';
import iocFriskUpArchive from '../../assets/images/overworldCharacters/frisk/upArchive.png?url';
import iocFriskUpChara$info from '../../assets/images/overworldCharacters/frisk/upChara.json?url';
import iocFriskUpChara from '../../assets/images/overworldCharacters/frisk/upChara.png?url';
import iocFriskUpCharaFake$info from '../../assets/images/overworldCharacters/frisk/upCharaFake.json?url';
import iocFriskUpCharaFake from '../../assets/images/overworldCharacters/frisk/upCharaFake.png?url';
import iocFriskUpHome$info from '../../assets/images/overworldCharacters/frisk/upHome.json?url';
import iocFriskUpHome from '../../assets/images/overworldCharacters/frisk/upHome.png?url';
import iocFriskUpJetpack$info from '../../assets/images/overworldCharacters/frisk/upJetpack.json?url';
import iocFriskUpJetpack from '../../assets/images/overworldCharacters/frisk/upJetpack.png?url';
import iocFriskUpJetpackOff from '../../assets/images/overworldCharacters/frisk/upJetpackOff.png?url';
import iocFriskUpMirror$info from '../../assets/images/overworldCharacters/frisk/upMirror.json?url';
import iocFriskUpMirror from '../../assets/images/overworldCharacters/frisk/upMirror.png?url';
import iocFriskUpMirrorHome$info from '../../assets/images/overworldCharacters/frisk/upMirrorHome.json?url';
import iocFriskUpMirrorHome from '../../assets/images/overworldCharacters/frisk/upMirrorHome.png?url';
import iocFriskUpMirrorWater$info from '../../assets/images/overworldCharacters/frisk/upMirrorWater.json?url';
import iocFriskUpMirrorWater from '../../assets/images/overworldCharacters/frisk/upMirrorWater.png?url';
import iocFriskUpWater$info from '../../assets/images/overworldCharacters/frisk/upWater.json?url';
import iocFriskUpWater from '../../assets/images/overworldCharacters/frisk/upWater.png?url';
import iocFriskUpWaterArchive$info from '../../assets/images/overworldCharacters/frisk/upWaterArchive.json?url';
import iocFriskUpWaterArchive from '../../assets/images/overworldCharacters/frisk/upWaterArchive.png?url';
import iocFriskUpWaterJetpack$info from '../../assets/images/overworldCharacters/frisk/upWaterJetpack.json?url';
import iocFriskUpWaterJetpack from '../../assets/images/overworldCharacters/frisk/upWaterJetpack.png?url';
import iocFriskUpWaterJetpackOff from '../../assets/images/overworldCharacters/frisk/upWaterJetpackOff.png?url';
import iocGrillbyDown$info from '../../assets/images/overworldCharacters/grillby/down.json?url';
import iocGrillbyDown from '../../assets/images/overworldCharacters/grillby/down.png?url';
import iocGrillbyUp$info from '../../assets/images/overworldCharacters/grillby/up.json?url';
import iocGrillbyUp from '../../assets/images/overworldCharacters/grillby/up.png?url';
import iocHumansBraveryDown from '../../assets/images/overworldCharacters/humans/braveryDown.png?url';
import iocHumansBraveryLeft from '../../assets/images/overworldCharacters/humans/braveryLeft.png?url';
import iocHumansBraveryRight from '../../assets/images/overworldCharacters/humans/braveryRight.png?url';
import iocHumansBraveryUp from '../../assets/images/overworldCharacters/humans/braveryUp.png?url';
import iocHumansIntegrityDown from '../../assets/images/overworldCharacters/humans/integrityDown.png?url';
import iocHumansIntegrityLeft from '../../assets/images/overworldCharacters/humans/integrityLeft.png?url';
import iocHumansIntegrityRight from '../../assets/images/overworldCharacters/humans/integrityRight.png?url';
import iocHumansIntegrityUp from '../../assets/images/overworldCharacters/humans/integrityUp.png?url';
import iocHumansJusticeDown from '../../assets/images/overworldCharacters/humans/justiceDown.png?url';
import iocHumansJusticeLeft from '../../assets/images/overworldCharacters/humans/justiceLeft.png?url';
import iocHumansJusticeRight from '../../assets/images/overworldCharacters/humans/justiceRight.png?url';
import iocHumansJusticeUp from '../../assets/images/overworldCharacters/humans/justiceUp.png?url';
import iocHumansKindnessDown from '../../assets/images/overworldCharacters/humans/kindnessDown.png?url';
import iocHumansKindnessLeft from '../../assets/images/overworldCharacters/humans/kindnessLeft.png?url';
import iocHumansKindnessRight from '../../assets/images/overworldCharacters/humans/kindnessRight.png?url';
import iocHumansKindnessUp from '../../assets/images/overworldCharacters/humans/kindnessUp.png?url';
import iocHumansPatienceDown from '../../assets/images/overworldCharacters/humans/patienceDown.png?url';
import iocHumansPatienceLeft from '../../assets/images/overworldCharacters/humans/patienceLeft.png?url';
import iocHumansPatienceRight from '../../assets/images/overworldCharacters/humans/patienceRight.png?url';
import iocHumansPatienceUp from '../../assets/images/overworldCharacters/humans/patienceUp.png?url';
import iocHumansPerserveranceDown from '../../assets/images/overworldCharacters/humans/perserveranceDown.png?url';
import iocHumansPerserveranceLeft from '../../assets/images/overworldCharacters/humans/perserveranceLeft.png?url';
import iocHumansPerserveranceRight from '../../assets/images/overworldCharacters/humans/perserveranceRight.png?url';
import iocHumansPerserveranceUp from '../../assets/images/overworldCharacters/humans/perserveranceUp.png?url';
import iocKiddCrouch from '../../assets/images/overworldCharacters/kidd/crouch.png?url';
import iocKiddDown$info from '../../assets/images/overworldCharacters/kidd/down.json?url';
import iocKiddDown from '../../assets/images/overworldCharacters/kidd/down.png?url';
import iocKiddDownSad$info from '../../assets/images/overworldCharacters/kidd/downSad.json?url';
import iocKiddDownSad from '../../assets/images/overworldCharacters/kidd/downSad.png?url';
import iocKiddDownSlave$info from '../../assets/images/overworldCharacters/kidd/downSlave.json?url';
import iocKiddDownSlave from '../../assets/images/overworldCharacters/kidd/downSlave.png?url';
import iocKiddDownTalk$info from '../../assets/images/overworldCharacters/kidd/downTalk.json?url';
import iocKiddDownTalk from '../../assets/images/overworldCharacters/kidd/downTalk.png?url';
import iocKiddDownTalkSad$info from '../../assets/images/overworldCharacters/kidd/downTalkSad.json?url';
import iocKiddDownTalkSad from '../../assets/images/overworldCharacters/kidd/downTalkSad.png?url';
import iocKiddDownTalkSlave$info from '../../assets/images/overworldCharacters/kidd/downTalkSlave.json?url';
import iocKiddDownTalkSlave from '../../assets/images/overworldCharacters/kidd/downTalkSlave.png?url';
import iocKiddJetpack$info from '../../assets/images/overworldCharacters/kidd/jetpack.json?url';
import iocKiddJetpack from '../../assets/images/overworldCharacters/kidd/jetpack.png?url';
import iocKiddLeft$info from '../../assets/images/overworldCharacters/kidd/left.json?url';
import iocKiddLeft from '../../assets/images/overworldCharacters/kidd/left.png?url';
import iocKiddLeftSad$info from '../../assets/images/overworldCharacters/kidd/leftSad.json?url';
import iocKiddLeftSad from '../../assets/images/overworldCharacters/kidd/leftSad.png?url';
import iocKiddLeftSlave$info from '../../assets/images/overworldCharacters/kidd/leftSlave.json?url';
import iocKiddLeftSlave from '../../assets/images/overworldCharacters/kidd/leftSlave.png?url';
import iocKiddLeftTalk$info from '../../assets/images/overworldCharacters/kidd/leftTalk.json?url';
import iocKiddLeftTalk from '../../assets/images/overworldCharacters/kidd/leftTalk.png?url';
import iocKiddLeftTalkSad$info from '../../assets/images/overworldCharacters/kidd/leftTalkSad.json?url';
import iocKiddLeftTalkSad from '../../assets/images/overworldCharacters/kidd/leftTalkSad.png?url';
import iocKiddLeftTalkSlave$info from '../../assets/images/overworldCharacters/kidd/leftTalkSlave.json?url';
import iocKiddLeftTalkSlave from '../../assets/images/overworldCharacters/kidd/leftTalkSlave.png?url';
import iocKiddLeftTrip$info from '../../assets/images/overworldCharacters/kidd/leftTrip.json?url';
import iocKiddLeftTrip from '../../assets/images/overworldCharacters/kidd/leftTrip.png?url';
import iocKiddRight$info from '../../assets/images/overworldCharacters/kidd/right.json?url';
import iocKiddRight from '../../assets/images/overworldCharacters/kidd/right.png?url';
import iocKiddRightSad$info from '../../assets/images/overworldCharacters/kidd/rightSad.json?url';
import iocKiddRightSad from '../../assets/images/overworldCharacters/kidd/rightSad.png?url';
import iocKiddRightSlave$info from '../../assets/images/overworldCharacters/kidd/rightSlave.json?url';
import iocKiddRightSlave from '../../assets/images/overworldCharacters/kidd/rightSlave.png?url';
import iocKiddRightTalk$info from '../../assets/images/overworldCharacters/kidd/rightTalk.json?url';
import iocKiddRightTalk from '../../assets/images/overworldCharacters/kidd/rightTalk.png?url';
import iocKiddRightTalkSad$info from '../../assets/images/overworldCharacters/kidd/rightTalkSad.json?url';
import iocKiddRightTalkSad from '../../assets/images/overworldCharacters/kidd/rightTalkSad.png?url';
import iocKiddRightTalkSlave$info from '../../assets/images/overworldCharacters/kidd/rightTalkSlave.json?url';
import iocKiddRightTalkSlave from '../../assets/images/overworldCharacters/kidd/rightTalkSlave.png?url';
import iocKiddRightTrip$info from '../../assets/images/overworldCharacters/kidd/rightTrip.json?url';
import iocKiddRightTrip from '../../assets/images/overworldCharacters/kidd/rightTrip.png?url';
import iocKiddRightTripSad$info from '../../assets/images/overworldCharacters/kidd/rightTripSad.json?url';
import iocKiddRightTripSad from '../../assets/images/overworldCharacters/kidd/rightTripSad.png?url';
import iocKiddUp$info from '../../assets/images/overworldCharacters/kidd/up.json?url';
import iocKiddUp from '../../assets/images/overworldCharacters/kidd/up.png?url';
import iocKiddUpTalk$info from '../../assets/images/overworldCharacters/kidd/upTalk.json?url';
import iocKiddUpTalk from '../../assets/images/overworldCharacters/kidd/upTalk.png?url';
import iocMettatonAnchorDotdotdot$info from '../../assets/images/overworldCharacters/mettaton/anchorDotdotdot.json?url';
import iocMettatonAnchorDotdotdot from '../../assets/images/overworldCharacters/mettaton/anchorDotdotdot.png?url';
import iocMettatonAnchorFlyer$info from '../../assets/images/overworldCharacters/mettaton/anchorFlyer.json?url';
import iocMettatonAnchorFlyer from '../../assets/images/overworldCharacters/mettaton/anchorFlyer.png?url';
import iocMettatonAnchorG$info from '../../assets/images/overworldCharacters/mettaton/anchorG.json?url';
import iocMettatonAnchorG from '../../assets/images/overworldCharacters/mettaton/anchorG.png?url';
import iocMettatonAnchorLaugh$info from '../../assets/images/overworldCharacters/mettaton/anchorLaugh.json?url';
import iocMettatonAnchorLaugh from '../../assets/images/overworldCharacters/mettaton/anchorLaugh.png?url';
import iocMettatonAnchorOMG$info from '../../assets/images/overworldCharacters/mettaton/anchorOMG.json?url';
import iocMettatonAnchorOMG from '../../assets/images/overworldCharacters/mettaton/anchorOMG.png?url';
import iocMettatonAnchorPoint$info from '../../assets/images/overworldCharacters/mettaton/anchorPoint.json?url';
import iocMettatonAnchorPoint from '../../assets/images/overworldCharacters/mettaton/anchorPoint.png?url';
import iocMettatonAnimeChargeUpSequence$info from '../../assets/images/overworldCharacters/mettaton/animeChargeUpSequence.json?url';
import iocMettatonAnimeChargeUpSequence from '../../assets/images/overworldCharacters/mettaton/animeChargeUpSequence.png?url';
import iocMettatonBackhands$info from '../../assets/images/overworldCharacters/mettaton/backhands.json?url';
import iocMettatonBackhands from '../../assets/images/overworldCharacters/mettaton/backhands.png?url';
import iocMettatonBro from '../../assets/images/overworldCharacters/mettaton/bro.png?url';
import iocMettatonClap$info from '../../assets/images/overworldCharacters/mettaton/clap.json?url';
import iocMettatonClap from '../../assets/images/overworldCharacters/mettaton/clap.png?url';
import iocMettatonConfused$info from '../../assets/images/overworldCharacters/mettaton/confused.json?url';
import iocMettatonConfused from '../../assets/images/overworldCharacters/mettaton/confused.png?url';
import iocMettatonDanceArm from '../../assets/images/overworldCharacters/mettaton/danceArm.png?url';
import iocMettatonDanceBody from '../../assets/images/overworldCharacters/mettaton/danceBody.png?url';
import iocMettatonDanceLeg from '../../assets/images/overworldCharacters/mettaton/danceLeg.png?url';
import iocMettatonDotdotdot from '../../assets/images/overworldCharacters/mettaton/dotdotdot.png?url';
import iocMettatonDressIdle$info from '../../assets/images/overworldCharacters/mettaton/dressIdle.json?url';
import iocMettatonDressIdle from '../../assets/images/overworldCharacters/mettaton/dressIdle.png?url';
import iocMettatonDressPull$info from '../../assets/images/overworldCharacters/mettaton/dressPull.json?url';
import iocMettatonDressPull from '../../assets/images/overworldCharacters/mettaton/dressPull.png?url';
import iocMettatonDressRoll from '../../assets/images/overworldCharacters/mettaton/dressRoll.png?url';
import iocMettatonFlyer$info from '../../assets/images/overworldCharacters/mettaton/flyer.json?url';
import iocMettatonFlyer from '../../assets/images/overworldCharacters/mettaton/flyer.png?url';
import iocMettatonLaugh$info from '../../assets/images/overworldCharacters/mettaton/laugh.json?url';
import iocMettatonLaugh from '../../assets/images/overworldCharacters/mettaton/laugh.png?url';
import iocMettatonMicrophone$info from '../../assets/images/overworldCharacters/mettaton/microphone.json?url';
import iocMettatonMicrophone from '../../assets/images/overworldCharacters/mettaton/microphone.png?url';
import iocMettatonMicrophoneHapstablook$info from '../../assets/images/overworldCharacters/mettaton/microphoneHapstablook.json?url';
import iocMettatonMicrophoneHapstablook from '../../assets/images/overworldCharacters/mettaton/microphoneHapstablook.png?url';
import iocMettatonNeo$info from '../../assets/images/overworldCharacters/mettaton/neo.json?url';
import iocMettatonNeo from '../../assets/images/overworldCharacters/mettaton/neo.png?url';
import iocMettatonNeoWings$info from '../../assets/images/overworldCharacters/mettaton/neoWings.json?url';
import iocMettatonNeoWings from '../../assets/images/overworldCharacters/mettaton/neoWings.png?url';
import iocMettatonOmg$info from '../../assets/images/overworldCharacters/mettaton/omg.json?url';
import iocMettatonOmg from '../../assets/images/overworldCharacters/mettaton/omg.png?url';
import iocMettatonPoint$info from '../../assets/images/overworldCharacters/mettaton/point.json?url';
import iocMettatonPoint from '../../assets/images/overworldCharacters/mettaton/point.png?url';
import iocMettatonPointHapstablook$info from '../../assets/images/overworldCharacters/mettaton/pointHapstablook.json?url';
import iocMettatonPointHapstablook from '../../assets/images/overworldCharacters/mettaton/pointHapstablook.png?url';
import iocMettatonPointthree$info from '../../assets/images/overworldCharacters/mettaton/pointthree.json?url';
import iocMettatonPointthree from '../../assets/images/overworldCharacters/mettaton/pointthree.png?url';
import iocMettatonPointthreeHapstablook$info from '../../assets/images/overworldCharacters/mettaton/pointthreeHapstablook.json?url';
import iocMettatonPointthreeHapstablook from '../../assets/images/overworldCharacters/mettaton/pointthreeHapstablook.png?url';
import iocMettatonPointtwo$info from '../../assets/images/overworldCharacters/mettaton/pointtwo.json?url';
import iocMettatonPointtwo from '../../assets/images/overworldCharacters/mettaton/pointtwo.png?url';
import iocMettatonPointtwoHapstablook$info from '../../assets/images/overworldCharacters/mettaton/pointtwoHapstablook.json?url';
import iocMettatonPointtwoHapstablook from '../../assets/images/overworldCharacters/mettaton/pointtwoHapstablook.png?url';
import iocMettatonRollLeft$info from '../../assets/images/overworldCharacters/mettaton/rollLeft.json?url';
import iocMettatonRollLeft from '../../assets/images/overworldCharacters/mettaton/rollLeft.png?url';
import iocMettatonRollRight$info from '../../assets/images/overworldCharacters/mettaton/rollRight.json?url';
import iocMettatonRollRight from '../../assets/images/overworldCharacters/mettaton/rollRight.png?url';
import iocMettatonRollup2$info from '../../assets/images/overworldCharacters/mettaton/rollup2.json?url';
import iocMettatonRollup2 from '../../assets/images/overworldCharacters/mettaton/rollup2.png?url';
import iocMettatonSeriouspose$info from '../../assets/images/overworldCharacters/mettaton/seriouspose.json?url';
import iocMettatonSeriouspose from '../../assets/images/overworldCharacters/mettaton/seriouspose.png?url';
import iocMettatonShrug$info from '../../assets/images/overworldCharacters/mettaton/shrug.json?url';
import iocMettatonShrug from '../../assets/images/overworldCharacters/mettaton/shrug.png?url';
import iocMettatonText$info from '../../assets/images/overworldCharacters/mettaton/text.json?url';
import iocMettatonText from '../../assets/images/overworldCharacters/mettaton/text.png?url';
import iocMettatonWave$info from '../../assets/images/overworldCharacters/mettaton/wave.json?url';
import iocMettatonWave from '../../assets/images/overworldCharacters/mettaton/wave.png?url';
import iocMettatonWaveHapstablook$info from '../../assets/images/overworldCharacters/mettaton/waveHapstablook.json?url';
import iocMettatonWaveHapstablook from '../../assets/images/overworldCharacters/mettaton/waveHapstablook.png?url';
import iocNapstablookBody$info from '../../assets/images/overworldCharacters/napstablook/body.json?url';
import iocNapstablookBody from '../../assets/images/overworldCharacters/napstablook/body.png?url';
import iocNapstablookDown from '../../assets/images/overworldCharacters/napstablook/down.png?url';
import iocNapstablookDownAlter from '../../assets/images/overworldCharacters/napstablook/downAlter.png?url';
import iocNapstablookLeft from '../../assets/images/overworldCharacters/napstablook/left.png?url';
import iocNapstablookLeftAlter from '../../assets/images/overworldCharacters/napstablook/leftAlter.png?url';
import iocNapstablookRight from '../../assets/images/overworldCharacters/napstablook/right.png?url';
import iocNapstablookRightAlter from '../../assets/images/overworldCharacters/napstablook/rightAlter.png?url';
import iocNapstablookUp from '../../assets/images/overworldCharacters/napstablook/up.png?url';
import iocNapstablookUpAlter from '../../assets/images/overworldCharacters/napstablook/upAlter.png?url';
import iocPapyrusCakeStarp$info from '../../assets/images/overworldCharacters/papyrus/cakeStarp.json?url';
import iocPapyrusCakeStarp from '../../assets/images/overworldCharacters/papyrus/cakeStarp.png?url';
import iocPapyrusCape$info from '../../assets/images/overworldCharacters/papyrus/cape.json?url';
import iocPapyrusCape from '../../assets/images/overworldCharacters/papyrus/cape.png?url';
import iocPapyrusDoknStarw$info from '../../assets/images/overworldCharacters/papyrus/doknStarw.json?url';
import iocPapyrusDoknStarw from '../../assets/images/overworldCharacters/papyrus/doknStarw.png?url';
import iocPapyrusDoknStarwTalk$info from '../../assets/images/overworldCharacters/papyrus/doknStarwTalk.json?url';
import iocPapyrusDoknStarwTalk from '../../assets/images/overworldCharacters/papyrus/doknStarwTalk.png?url';
import iocPapyrusDown$info from '../../assets/images/overworldCharacters/papyrus/down.json?url';
import iocPapyrusDown from '../../assets/images/overworldCharacters/papyrus/down.png?url';
import iocPapyrusDownMad$info from '../../assets/images/overworldCharacters/papyrus/downMad.json?url';
import iocPapyrusDownMad from '../../assets/images/overworldCharacters/papyrus/downMad.png?url';
import iocPapyrusDownMadTalk$info from '../../assets/images/overworldCharacters/papyrus/downMadTalk.json?url';
import iocPapyrusDownMadTalk from '../../assets/images/overworldCharacters/papyrus/downMadTalk.png?url';
import iocPapyrusDownTalk$info from '../../assets/images/overworldCharacters/papyrus/downTalk.json?url';
import iocPapyrusDownTalk from '../../assets/images/overworldCharacters/papyrus/downTalk.png?url';
import iocPapyrusKnock$info from '../../assets/images/overworldCharacters/papyrus/knock.json?url';
import iocPapyrusKnock from '../../assets/images/overworldCharacters/papyrus/knock.png?url';
import iocPapyrusLeap$info from '../../assets/images/overworldCharacters/papyrus/leap.json?url';
import iocPapyrusLeap from '../../assets/images/overworldCharacters/papyrus/leap.png?url';
import iocPapyrusLeft$info from '../../assets/images/overworldCharacters/papyrus/left.json?url';
import iocPapyrusLeft from '../../assets/images/overworldCharacters/papyrus/left.png?url';
import iocPapyrusLeftMad$info from '../../assets/images/overworldCharacters/papyrus/leftMad.json?url';
import iocPapyrusLeftMad from '../../assets/images/overworldCharacters/papyrus/leftMad.png?url';
import iocPapyrusLeftMadTalk$info from '../../assets/images/overworldCharacters/papyrus/leftMadTalk.json?url';
import iocPapyrusLeftMadTalk from '../../assets/images/overworldCharacters/papyrus/leftMadTalk.png?url';
import iocPapyrusLeftTalk$info from '../../assets/images/overworldCharacters/papyrus/leftTalk.json?url';
import iocPapyrusLeftTalk from '../../assets/images/overworldCharacters/papyrus/leftTalk.png?url';
import iocPapyrusLektStarf$info from '../../assets/images/overworldCharacters/papyrus/lektStarf.json?url';
import iocPapyrusLektStarf from '../../assets/images/overworldCharacters/papyrus/lektStarf.png?url';
import iocPapyrusLektStarfTalk$info from '../../assets/images/overworldCharacters/papyrus/lektStarfTalk.json?url';
import iocPapyrusLektStarfTalk from '../../assets/images/overworldCharacters/papyrus/lektStarfTalk.png?url';
import iocPapyrusPresent$info from '../../assets/images/overworldCharacters/papyrus/present.json?url';
import iocPapyrusPresent from '../../assets/images/overworldCharacters/papyrus/present.png?url';
import iocPapyrusPresent2$info from '../../assets/images/overworldCharacters/papyrus/present2.json?url';
import iocPapyrusPresent2 from '../../assets/images/overworldCharacters/papyrus/present2.png?url';
import iocPapyrusReach$info from '../../assets/images/overworldCharacters/papyrus/reach.json?url';
import iocPapyrusReach from '../../assets/images/overworldCharacters/papyrus/reach.png?url';
import iocPapyrusRight$info from '../../assets/images/overworldCharacters/papyrus/right.json?url';
import iocPapyrusRight from '../../assets/images/overworldCharacters/papyrus/right.png?url';
import iocPapyrusRightMad$info from '../../assets/images/overworldCharacters/papyrus/rightMad.json?url';
import iocPapyrusRightMad from '../../assets/images/overworldCharacters/papyrus/rightMad.png?url';
import iocPapyrusRightMadTalk$info from '../../assets/images/overworldCharacters/papyrus/rightMadTalk.json?url';
import iocPapyrusRightMadTalk from '../../assets/images/overworldCharacters/papyrus/rightMadTalk.png?url';
import iocPapyrusRightTalk$info from '../../assets/images/overworldCharacters/papyrus/rightTalk.json?url';
import iocPapyrusRightTalk from '../../assets/images/overworldCharacters/papyrus/rightTalk.png?url';
import iocPapyrusRikhtStarg$info from '../../assets/images/overworldCharacters/papyrus/rikhtStarg.json?url';
import iocPapyrusRikhtStarg from '../../assets/images/overworldCharacters/papyrus/rikhtStarg.png?url';
import iocPapyrusRikhtStargTalk$info from '../../assets/images/overworldCharacters/papyrus/rikhtStargTalk.json?url';
import iocPapyrusRikhtStargTalk from '../../assets/images/overworldCharacters/papyrus/rikhtStargTalk.png?url';
import iocPapyrusStomp$info from '../../assets/images/overworldCharacters/papyrus/stomp.json?url';
import iocPapyrusStomp from '../../assets/images/overworldCharacters/papyrus/stomp.png?url';
import iocPapyrusUp$info from '../../assets/images/overworldCharacters/papyrus/up.json?url';
import iocPapyrusUp from '../../assets/images/overworldCharacters/papyrus/up.png?url';
import iocPapyrusUpTalk from '../../assets/images/overworldCharacters/papyrus/upTalk.png?url';
import iocSansDown$info from '../../assets/images/overworldCharacters/sans/down.json?url';
import iocSansDown from '../../assets/images/overworldCharacters/sans/down.png?url';
import iocSansDownTalk from '../../assets/images/overworldCharacters/sans/downTalk.png?url';
import iocSansDownTomato$info from '../../assets/images/overworldCharacters/sans/downTomato.json?url';
import iocSansDownTomato from '../../assets/images/overworldCharacters/sans/downTomato.png?url';
import iocSansHandshake$info from '../../assets/images/overworldCharacters/sans/handshake.json?url';
import iocSansHandshake from '../../assets/images/overworldCharacters/sans/handshake.png?url';
import iocSansIcecream1$info from '../../assets/images/overworldCharacters/sans/icecream1.json?url';
import iocSansIcecream1 from '../../assets/images/overworldCharacters/sans/icecream1.png?url';
import iocSansIcecream2$info from '../../assets/images/overworldCharacters/sans/icecream2.json?url';
import iocSansIcecream2 from '../../assets/images/overworldCharacters/sans/icecream2.png?url';
import iocSansIcecream3$info from '../../assets/images/overworldCharacters/sans/icecream3.json?url';
import iocSansIcecream3 from '../../assets/images/overworldCharacters/sans/icecream3.png?url';
import iocSansIcecream4$info from '../../assets/images/overworldCharacters/sans/icecream4.json?url';
import iocSansIcecream4 from '../../assets/images/overworldCharacters/sans/icecream4.png?url';
import iocSansIcecream5$info from '../../assets/images/overworldCharacters/sans/icecream5.json?url';
import iocSansIcecream5 from '../../assets/images/overworldCharacters/sans/icecream5.png?url';
import iocSansIcecream6$info from '../../assets/images/overworldCharacters/sans/icecream6.json?url';
import iocSansIcecream6 from '../../assets/images/overworldCharacters/sans/icecream6.png?url';
import iocSansIcecream7$info from '../../assets/images/overworldCharacters/sans/icecream7.json?url';
import iocSansIcecream7 from '../../assets/images/overworldCharacters/sans/icecream7.png?url';
import iocSansIcecream8$info from '../../assets/images/overworldCharacters/sans/icecream8.json?url';
import iocSansIcecream8 from '../../assets/images/overworldCharacters/sans/icecream8.png?url';
import iocSansLeft$info from '../../assets/images/overworldCharacters/sans/left.json?url';
import iocSansLeft from '../../assets/images/overworldCharacters/sans/left.png?url';
import iocSansLeftTalk from '../../assets/images/overworldCharacters/sans/leftTalk.png?url';
import iocSansLeftTomato$info from '../../assets/images/overworldCharacters/sans/leftTomato.json?url';
import iocSansLeftTomato from '../../assets/images/overworldCharacters/sans/leftTomato.png?url';
import iocSansRight$info from '../../assets/images/overworldCharacters/sans/right.json?url';
import iocSansRight from '../../assets/images/overworldCharacters/sans/right.png?url';
import iocSansRightTalk from '../../assets/images/overworldCharacters/sans/rightTalk.png?url';
import iocSansShrug from '../../assets/images/overworldCharacters/sans/shrug.png?url';
import iocSansSleep$info from '../../assets/images/overworldCharacters/sans/sleep.json?url';
import iocSansSleep from '../../assets/images/overworldCharacters/sans/sleep.png?url';
import iocSansStool from '../../assets/images/overworldCharacters/sans/stool.png?url';
import iocSansStoolComb$info from '../../assets/images/overworldCharacters/sans/stoolComb.json?url';
import iocSansStoolComb from '../../assets/images/overworldCharacters/sans/stoolComb.png?url';
import iocSansStoolLeft from '../../assets/images/overworldCharacters/sans/stoolLeft.png?url';
import iocSansStoolRight$info from '../../assets/images/overworldCharacters/sans/stoolRight.json?url';
import iocSansStoolRight from '../../assets/images/overworldCharacters/sans/stoolRight.png?url';
import iocSansStoolScratch$info from '../../assets/images/overworldCharacters/sans/stoolScratch.json?url';
import iocSansStoolScratch from '../../assets/images/overworldCharacters/sans/stoolScratch.png?url';
import iocSansTrombone$info from '../../assets/images/overworldCharacters/sans/trombone.json?url';
import iocSansTrombone from '../../assets/images/overworldCharacters/sans/trombone.png?url';
import iocSansUp$info from '../../assets/images/overworldCharacters/sans/up.json?url';
import iocSansUp from '../../assets/images/overworldCharacters/sans/up.png?url';
import iocSansUpTalk from '../../assets/images/overworldCharacters/sans/upTalk.png?url';
import iocSansWink from '../../assets/images/overworldCharacters/sans/wink.png?url';
import iocTemmieSkolarships from '../../assets/images/overworldCharacters/temmie/skolarships.png?url';
import iocTemmieLeft$info from '../../assets/images/overworldCharacters/temmie/temmieLeft.json?url';
import iocTemmieLeft from '../../assets/images/overworldCharacters/temmie/temmieLeft.png?url';
import iocTemmieLeftTalk$info from '../../assets/images/overworldCharacters/temmie/temmieLeftTalk.json?url';
import iocTemmieLeftTalk from '../../assets/images/overworldCharacters/temmie/temmieLeftTalk.png?url';
import iocTemmieRight$info from '../../assets/images/overworldCharacters/temmie/temmieRight.json?url';
import iocTemmieRight from '../../assets/images/overworldCharacters/temmie/temmieRight.png?url';
import iocTemmieRightTalk$info from '../../assets/images/overworldCharacters/temmie/temmieRightTalk.json?url';
import iocTemmieRightTalk from '../../assets/images/overworldCharacters/temmie/temmieRightTalk.png?url';
import iocTorielDown$info from '../../assets/images/overworldCharacters/toriel/down.json?url';
import iocTorielDown from '../../assets/images/overworldCharacters/toriel/down.png?url';
import iocTorielDownAsriel$info from '../../assets/images/overworldCharacters/toriel/downAsriel.json?url';
import iocTorielDownAsriel from '../../assets/images/overworldCharacters/toriel/downAsriel.png?url';
import iocTorielDownAsrielSad$info from '../../assets/images/overworldCharacters/toriel/downAsrielSad.json?url';
import iocTorielDownAsrielSad from '../../assets/images/overworldCharacters/toriel/downAsrielSad.png?url';
import iocTorielDownHandhold$info from '../../assets/images/overworldCharacters/toriel/downHandhold.json?url';
import iocTorielDownHandhold from '../../assets/images/overworldCharacters/toriel/downHandhold.png?url';
import iocTorielDownTalk$info from '../../assets/images/overworldCharacters/toriel/downTalk.json?url';
import iocTorielDownTalk from '../../assets/images/overworldCharacters/toriel/downTalk.png?url';
import iocTorielHug$info from '../../assets/images/overworldCharacters/toriel/hug.json?url';
import iocTorielHug from '../../assets/images/overworldCharacters/toriel/hug.png?url';
import iocTorielLeft$info from '../../assets/images/overworldCharacters/toriel/left.json?url';
import iocTorielLeft from '../../assets/images/overworldCharacters/toriel/left.png?url';
import iocTorielLeftAsriel$info from '../../assets/images/overworldCharacters/toriel/leftAsriel.json?url';
import iocTorielLeftAsriel from '../../assets/images/overworldCharacters/toriel/leftAsriel.png?url';
import iocTorielLeftAsrielSad$info from '../../assets/images/overworldCharacters/toriel/leftAsrielSad.json?url';
import iocTorielLeftAsrielSad from '../../assets/images/overworldCharacters/toriel/leftAsrielSad.png?url';
import iocTorielLeftHandhold$info from '../../assets/images/overworldCharacters/toriel/leftHandhold.json?url';
import iocTorielLeftHandhold from '../../assets/images/overworldCharacters/toriel/leftHandhold.png?url';
import iocTorielLeftTalk$info from '../../assets/images/overworldCharacters/toriel/leftTalk.json?url';
import iocTorielLeftTalk from '../../assets/images/overworldCharacters/toriel/leftTalk.png?url';
import iocTorielMad from '../../assets/images/overworldCharacters/toriel/mad.png?url';
import iocTorielPhone$info from '../../assets/images/overworldCharacters/toriel/phone.json?url';
import iocTorielPhone from '../../assets/images/overworldCharacters/toriel/phone.png?url';
import iocTorielPhoneTalk$info from '../../assets/images/overworldCharacters/toriel/phoneTalk.json?url';
import iocTorielPhoneTalk from '../../assets/images/overworldCharacters/toriel/phoneTalk.png?url';
import iocTorielRight$info from '../../assets/images/overworldCharacters/toriel/right.json?url';
import iocTorielRight from '../../assets/images/overworldCharacters/toriel/right.png?url';
import iocTorielRightHandhold$info from '../../assets/images/overworldCharacters/toriel/rightHandhold.json?url';
import iocTorielRightHandhold from '../../assets/images/overworldCharacters/toriel/rightHandhold.png?url';
import iocTorielRightTalk$info from '../../assets/images/overworldCharacters/toriel/rightTalk.json?url';
import iocTorielRightTalk from '../../assets/images/overworldCharacters/toriel/rightTalk.png?url';
import iocTorielRuffle$info from '../../assets/images/overworldCharacters/toriel/ruffle.json?url';
import iocTorielRuffle from '../../assets/images/overworldCharacters/toriel/ruffle.png?url';
import iocTorielSad$info from '../../assets/images/overworldCharacters/toriel/sad.json?url';
import iocTorielSad from '../../assets/images/overworldCharacters/toriel/sad.png?url';
import iocTorielUp$info from '../../assets/images/overworldCharacters/toriel/up.json?url';
import iocTorielUp from '../../assets/images/overworldCharacters/toriel/up.png?url';
import iocTorielUpHandhold$info from '../../assets/images/overworldCharacters/toriel/upHandhold.json?url';
import iocTorielUpHandhold from '../../assets/images/overworldCharacters/toriel/upHandhold.png?url';
import iocTwinklyMain$info from '../../assets/images/overworldCharacters/twinkly/main.json?url';
import iocTwinklyMain from '../../assets/images/overworldCharacters/twinkly/main.png?url';
import iocTwinklyMainBack from '../../assets/images/overworldCharacters/twinkly/mainBack.png?url';
import iocUndyneDateBurnt$info from '../../assets/images/overworldCharacters/undyne/dateBurnt.json?url';
import iocUndyneDateBurnt from '../../assets/images/overworldCharacters/undyne/dateBurnt.png?url';
import iocUndyneDateFlex$info from '../../assets/images/overworldCharacters/undyne/dateFlex.json?url';
import iocUndyneDateFlex from '../../assets/images/overworldCharacters/undyne/dateFlex.png?url';
import iocUndyneDateGrab$info from '../../assets/images/overworldCharacters/undyne/dateGrab.json?url';
import iocUndyneDateGrab from '../../assets/images/overworldCharacters/undyne/dateGrab.png?url';
import iocUndyneDateKick$info from '../../assets/images/overworldCharacters/undyne/dateKick.json?url';
import iocUndyneDateKick from '../../assets/images/overworldCharacters/undyne/dateKick.png?url';
import iocUndyneDateLeap$info from '../../assets/images/overworldCharacters/undyne/dateLeap.json?url';
import iocUndyneDateLeap from '../../assets/images/overworldCharacters/undyne/dateLeap.png?url';
import iocUndyneDateNamaste$info from '../../assets/images/overworldCharacters/undyne/dateNamaste.json?url';
import iocUndyneDateNamaste from '../../assets/images/overworldCharacters/undyne/dateNamaste.png?url';
import iocUndyneDateOMG$info from '../../assets/images/overworldCharacters/undyne/dateOMG.json?url';
import iocUndyneDateOMG from '../../assets/images/overworldCharacters/undyne/dateOMG.png?url';
import iocUndyneDateSit$info from '../../assets/images/overworldCharacters/undyne/dateSit.json?url';
import iocUndyneDateSit from '../../assets/images/overworldCharacters/undyne/dateSit.png?url';
import iocUndyneDateStomp$info from '../../assets/images/overworldCharacters/undyne/dateStomp.json?url';
import iocUndyneDateStomp from '../../assets/images/overworldCharacters/undyne/dateStomp.png?url';
import iocUndyneDateStompTomato$info from '../../assets/images/overworldCharacters/undyne/dateStompTomato.json?url';
import iocUndyneDateStompTomato from '../../assets/images/overworldCharacters/undyne/dateStompTomato.png?url';
import iocUndyneDateThrow$info from '../../assets/images/overworldCharacters/undyne/dateThrow.json?url';
import iocUndyneDateThrow from '../../assets/images/overworldCharacters/undyne/dateThrow.png?url';
import iocUndyneDateThrowTalk$info from '../../assets/images/overworldCharacters/undyne/dateThrowTalk.json?url';
import iocUndyneDateThrowTalk from '../../assets/images/overworldCharacters/undyne/dateThrowTalk.png?url';
import iocUndyneDateTomato$info from '../../assets/images/overworldCharacters/undyne/dateTomato.json?url';
import iocUndyneDateTomato from '../../assets/images/overworldCharacters/undyne/dateTomato.png?url';
import iocUndyneDateUppercut$info from '../../assets/images/overworldCharacters/undyne/dateUppercut.json?url';
import iocUndyneDateUppercut from '../../assets/images/overworldCharacters/undyne/dateUppercut.png?url';
import iocUndyneDive$info from '../../assets/images/overworldCharacters/undyne/dive.json?url';
import iocUndyneDive from '../../assets/images/overworldCharacters/undyne/dive.png?url';
import iocUndyneDown$info from '../../assets/images/overworldCharacters/undyne/down.json?url';
import iocUndyneDown from '../../assets/images/overworldCharacters/undyne/down.png?url';
import iocUndyneDownArmor$info from '../../assets/images/overworldCharacters/undyne/downArmor.json?url';
import iocUndyneDownArmor from '../../assets/images/overworldCharacters/undyne/downArmor.png?url';
import iocUndyneDownArmorSpear$info from '../../assets/images/overworldCharacters/undyne/downArmorSpear.json?url';
import iocUndyneDownArmorSpear from '../../assets/images/overworldCharacters/undyne/downArmorSpear.png?url';
import iocUndyneDownArmorWalk$info from '../../assets/images/overworldCharacters/undyne/downArmorWalk.json?url';
import iocUndyneDownArmorWalk from '../../assets/images/overworldCharacters/undyne/downArmorWalk.png?url';
import iocUndyneDownDate$info from '../../assets/images/overworldCharacters/undyne/downDate.json?url';
import iocUndyneDownDate from '../../assets/images/overworldCharacters/undyne/downDate.png?url';
import iocUndyneDownDateTalk$info from '../../assets/images/overworldCharacters/undyne/downDateTalk.json?url';
import iocUndyneDownDateTalk from '../../assets/images/overworldCharacters/undyne/downDateTalk.png?url';
import iocUndyneDownStoic$info from '../../assets/images/overworldCharacters/undyne/downStoic.json?url';
import iocUndyneDownStoic from '../../assets/images/overworldCharacters/undyne/downStoic.png?url';
import iocUndyneDownStoicTalk$info from '../../assets/images/overworldCharacters/undyne/downStoicTalk.json?url';
import iocUndyneDownStoicTalk from '../../assets/images/overworldCharacters/undyne/downStoicTalk.png?url';
import iocUndyneDownTalk$info from '../../assets/images/overworldCharacters/undyne/downTalk.json?url';
import iocUndyneDownTalk from '../../assets/images/overworldCharacters/undyne/downTalk.png?url';
import iocUndyneFallen from '../../assets/images/overworldCharacters/undyne/fallen.png?url';
import iocUndyneGrabKidd$info from '../../assets/images/overworldCharacters/undyne/grabKidd.json?url';
import iocUndyneGrabKidd from '../../assets/images/overworldCharacters/undyne/grabKidd.png?url';
import iocUndyneKick$info from '../../assets/images/overworldCharacters/undyne/kick.json?url';
import iocUndyneKick from '../../assets/images/overworldCharacters/undyne/kick.png?url';
import iocUndyneLeft$info from '../../assets/images/overworldCharacters/undyne/left.json?url';
import iocUndyneLeft from '../../assets/images/overworldCharacters/undyne/left.png?url';
import iocUndyneLeftArmor$info from '../../assets/images/overworldCharacters/undyne/leftArmor.json?url';
import iocUndyneLeftArmor from '../../assets/images/overworldCharacters/undyne/leftArmor.png?url';
import iocUndyneLeftArmorJetpack$info from '../../assets/images/overworldCharacters/undyne/leftArmorJetpack.json?url';
import iocUndyneLeftArmorJetpack from '../../assets/images/overworldCharacters/undyne/leftArmorJetpack.png?url';
import iocUndyneLeftArmorWalk$info from '../../assets/images/overworldCharacters/undyne/leftArmorWalk.json?url';
import iocUndyneLeftArmorWalk from '../../assets/images/overworldCharacters/undyne/leftArmorWalk.png?url';
import iocUndyneLeftDate$info from '../../assets/images/overworldCharacters/undyne/leftDate.json?url';
import iocUndyneLeftDate from '../../assets/images/overworldCharacters/undyne/leftDate.png?url';
import iocUndyneLeftDateTalk$info from '../../assets/images/overworldCharacters/undyne/leftDateTalk.json?url';
import iocUndyneLeftDateTalk from '../../assets/images/overworldCharacters/undyne/leftDateTalk.png?url';
import iocUndyneLeftStoic$info from '../../assets/images/overworldCharacters/undyne/leftStoic.json?url';
import iocUndyneLeftStoic from '../../assets/images/overworldCharacters/undyne/leftStoic.png?url';
import iocUndyneLeftStoicTalk$info from '../../assets/images/overworldCharacters/undyne/leftStoicTalk.json?url';
import iocUndyneLeftStoicTalk from '../../assets/images/overworldCharacters/undyne/leftStoicTalk.png?url';
import iocUndyneLeftTalk$info from '../../assets/images/overworldCharacters/undyne/leftTalk.json?url';
import iocUndyneLeftTalk from '../../assets/images/overworldCharacters/undyne/leftTalk.png?url';
import iocUndynePhone from '../../assets/images/overworldCharacters/undyne/phone.png?url';
import iocUndynePullKidd$info from '../../assets/images/overworldCharacters/undyne/pullKidd.json?url';
import iocUndynePullKidd from '../../assets/images/overworldCharacters/undyne/pullKidd.png?url';
import iocUndyneRight$info from '../../assets/images/overworldCharacters/undyne/right.json?url';
import iocUndyneRight from '../../assets/images/overworldCharacters/undyne/right.png?url';
import iocUndyneRightArmor$info from '../../assets/images/overworldCharacters/undyne/rightArmor.json?url';
import iocUndyneRightArmor from '../../assets/images/overworldCharacters/undyne/rightArmor.png?url';
import iocUndyneRightArmorJetpack$info from '../../assets/images/overworldCharacters/undyne/rightArmorJetpack.json?url';
import iocUndyneRightArmorJetpack from '../../assets/images/overworldCharacters/undyne/rightArmorJetpack.png?url';
import iocUndyneRightArmorWalk$info from '../../assets/images/overworldCharacters/undyne/rightArmorWalk.json?url';
import iocUndyneRightArmorWalk from '../../assets/images/overworldCharacters/undyne/rightArmorWalk.png?url';
import iocUndyneRightDate$info from '../../assets/images/overworldCharacters/undyne/rightDate.json?url';
import iocUndyneRightDate from '../../assets/images/overworldCharacters/undyne/rightDate.png?url';
import iocUndyneRightDateTalk$info from '../../assets/images/overworldCharacters/undyne/rightDateTalk.json?url';
import iocUndyneRightDateTalk from '../../assets/images/overworldCharacters/undyne/rightDateTalk.png?url';
import iocUndyneRightStoic$info from '../../assets/images/overworldCharacters/undyne/rightStoic.json?url';
import iocUndyneRightStoic from '../../assets/images/overworldCharacters/undyne/rightStoic.png?url';
import iocUndyneRightStoicTalk$info from '../../assets/images/overworldCharacters/undyne/rightStoicTalk.json?url';
import iocUndyneRightStoicTalk from '../../assets/images/overworldCharacters/undyne/rightStoicTalk.png?url';
import iocUndyneRightTalk$info from '../../assets/images/overworldCharacters/undyne/rightTalk.json?url';
import iocUndyneRightTalk from '../../assets/images/overworldCharacters/undyne/rightTalk.png?url';
import iocUndyneSithead$info from '../../assets/images/overworldCharacters/undyne/sithead.json?url';
import iocUndyneSithead from '../../assets/images/overworldCharacters/undyne/sithead.png?url';
import iocUndyneSitred from '../../assets/images/overworldCharacters/undyne/sitred.png?url';
import iocUndyneSitside$info from '../../assets/images/overworldCharacters/undyne/sitside.json?url';
import iocUndyneSitside from '../../assets/images/overworldCharacters/undyne/sitside.png?url';
import iocUndyneBrandish$info from '../../assets/images/overworldCharacters/undyne/undyneBrandish.json?url';
import iocUndyneBrandish from '../../assets/images/overworldCharacters/undyne/undyneBrandish.png?url';
import iocUndyneTurn$info from '../../assets/images/overworldCharacters/undyne/undyneTurn.json?url';
import iocUndyneTurn from '../../assets/images/overworldCharacters/undyne/undyneTurn.png?url';
import iocUndyneUp$info from '../../assets/images/overworldCharacters/undyne/up.json?url';
import iocUndyneUp from '../../assets/images/overworldCharacters/undyne/up.png?url';
import iocUndyneUpArmor$info from '../../assets/images/overworldCharacters/undyne/upArmor.json?url';
import iocUndyneUpArmor from '../../assets/images/overworldCharacters/undyne/upArmor.png?url';
import iocUndyneUpArmorJetpack$info from '../../assets/images/overworldCharacters/undyne/upArmorJetpack.json?url';
import iocUndyneUpArmorJetpack from '../../assets/images/overworldCharacters/undyne/upArmorJetpack.png?url';
import iocUndyneUpArmorWalk$info from '../../assets/images/overworldCharacters/undyne/upArmorWalk.json?url';
import iocUndyneUpArmorWalk from '../../assets/images/overworldCharacters/undyne/upArmorWalk.png?url';
import iocUndyneUpDate$info from '../../assets/images/overworldCharacters/undyne/upDate.json?url';
import iocUndyneUpDate from '../../assets/images/overworldCharacters/undyne/upDate.png?url';
import iocUndyneUpDateTalk$info from '../../assets/images/overworldCharacters/undyne/upDateTalk.json?url';
import iocUndyneUpDateTalk from '../../assets/images/overworldCharacters/undyne/upDateTalk.png?url';
import iocUndyneUpJetpack$info from '../../assets/images/overworldCharacters/undyne/upJetpack.json?url';
import iocUndyneUpJetpack from '../../assets/images/overworldCharacters/undyne/upJetpack.png?url';
import iocUndyneUpTalk$info from '../../assets/images/overworldCharacters/undyne/upTalk.json?url';
import iocUndyneUpTalk from '../../assets/images/overworldCharacters/undyne/upTalk.png?url';
import ionAAngery$info from '../../assets/images/overworldNPCs/aerialis/angery.json?url';
import ionAAngery from '../../assets/images/overworldNPCs/aerialis/angery.png?url';
import ionAArtgirl$info from '../../assets/images/overworldNPCs/aerialis/artgirl.json?url';
import ionAArtgirl from '../../assets/images/overworldNPCs/aerialis/artgirl.png?url';
import ionABedreceptionist$info from '../../assets/images/overworldNPCs/aerialis/bedreceptionist.json?url';
import ionABedreceptionist from '../../assets/images/overworldNPCs/aerialis/bedreceptionist.png?url';
import ionABlackfire$info from '../../assets/images/overworldNPCs/aerialis/blackfire.json?url';
import ionABlackfire from '../../assets/images/overworldNPCs/aerialis/blackfire.png?url';
import ionABoomer$info from '../../assets/images/overworldNPCs/aerialis/boomer.json?url';
import ionABoomer from '../../assets/images/overworldNPCs/aerialis/boomer.png?url';
import ionABowtie$info from '../../assets/images/overworldNPCs/aerialis/bowtie.json?url';
import ionABowtie from '../../assets/images/overworldNPCs/aerialis/bowtie.png?url';
import ionABowtieBack$info from '../../assets/images/overworldNPCs/aerialis/bowtieBack.json?url';
import ionABowtieBack from '../../assets/images/overworldNPCs/aerialis/bowtieBack.png?url';
import ionABusinessdude$info from '../../assets/images/overworldNPCs/aerialis/businessdude.json?url';
import ionABusinessdude from '../../assets/images/overworldNPCs/aerialis/businessdude.png?url';
import ionACharles$info from '../../assets/images/overworldNPCs/aerialis/charles.json?url';
import ionACharles from '../../assets/images/overworldNPCs/aerialis/charles.png?url';
import ionAClamguyBack$info from '../../assets/images/overworldNPCs/aerialis/clamguyBack.json?url';
import ionAClamguyBack from '../../assets/images/overworldNPCs/aerialis/clamguyBack.png?url';
import ionAClamguyFront$info from '../../assets/images/overworldNPCs/aerialis/clamguyFront.json?url';
import ionAClamguyFront from '../../assets/images/overworldNPCs/aerialis/clamguyFront.png?url';
import ionADarkman$info from '../../assets/images/overworldNPCs/aerialis/darkman.json?url';
import ionADarkman from '../../assets/images/overworldNPCs/aerialis/darkman.png?url';
import ionADarkmanTalk$info from '../../assets/images/overworldNPCs/aerialis/darkmanTalk.json?url';
import ionADarkmanTalk from '../../assets/images/overworldNPCs/aerialis/darkmanTalk.png?url';
import ionADiamond1$info from '../../assets/images/overworldNPCs/aerialis/diamond1.json?url';
import ionADiamond1 from '../../assets/images/overworldNPCs/aerialis/diamond1.png?url';
import ionADiamond2$info from '../../assets/images/overworldNPCs/aerialis/diamond2.json?url';
import ionADiamond2 from '../../assets/images/overworldNPCs/aerialis/diamond2.png?url';
import ionADragon$info from '../../assets/images/overworldNPCs/aerialis/dragon.json?url';
import ionADragon from '../../assets/images/overworldNPCs/aerialis/dragon.png?url';
import ionADrakedad$info from '../../assets/images/overworldNPCs/aerialis/drakedad.json?url';
import ionADrakedad from '../../assets/images/overworldNPCs/aerialis/drakedad.png?url';
import ionADrakemom$info from '../../assets/images/overworldNPCs/aerialis/drakemom.json?url';
import ionADrakemom from '../../assets/images/overworldNPCs/aerialis/drakemom.png?url';
import ionADresslion1$info from '../../assets/images/overworldNPCs/aerialis/dresslion1.json?url';
import ionADresslion1 from '../../assets/images/overworldNPCs/aerialis/dresslion1.png?url';
import ionADresslion2$info from '../../assets/images/overworldNPCs/aerialis/dresslion2.json?url';
import ionADresslion2 from '../../assets/images/overworldNPCs/aerialis/dresslion2.png?url';
import ionAFoodreceptionist$info from '../../assets/images/overworldNPCs/aerialis/foodreceptionist.json?url';
import ionAFoodreceptionist from '../../assets/images/overworldNPCs/aerialis/foodreceptionist.png?url';
import ionAGiftbear$info from '../../assets/images/overworldNPCs/aerialis/giftbear.json?url';
import ionAGiftbear from '../../assets/images/overworldNPCs/aerialis/giftbear.png?url';
import ionAGreenfire$info from '../../assets/images/overworldNPCs/aerialis/greenfire.json?url';
import ionAGreenfire from '../../assets/images/overworldNPCs/aerialis/greenfire.png?url';
import ionAGyftrot$info from '../../assets/images/overworldNPCs/aerialis/gyftrot.json?url';
import ionAGyftrot from '../../assets/images/overworldNPCs/aerialis/gyftrot.png?url';
import ionAHarpy$info from '../../assets/images/overworldNPCs/aerialis/harpy.json?url';
import ionAHarpy from '../../assets/images/overworldNPCs/aerialis/harpy.png?url';
import ionAHarpyNoCorny$info from '../../assets/images/overworldNPCs/aerialis/harpyNoCorny.json?url';
import ionAHarpyNoCorny from '../../assets/images/overworldNPCs/aerialis/harpyNoCorny.png?url';
import ionAHeats$info from '../../assets/images/overworldNPCs/aerialis/heats.json?url';
import ionAHeats from '../../assets/images/overworldNPCs/aerialis/heats.png?url';
import ionAMushketeer$info from '../../assets/images/overworldNPCs/aerialis/mushketeer.json?url';
import ionAMushketeer from '../../assets/images/overworldNPCs/aerialis/mushketeer.png?url';
import ionAMushketeerWalk$info from '../../assets/images/overworldNPCs/aerialis/mushketeerWalk.json?url';
import ionAMushketeerWalk from '../../assets/images/overworldNPCs/aerialis/mushketeerWalk.png?url';
import ionAOni$info from '../../assets/images/overworldNPCs/aerialis/oni.json?url';
import ionAOni from '../../assets/images/overworldNPCs/aerialis/oni.png?url';
import ionAOnionsanArmLeft from '../../assets/images/overworldNPCs/aerialis/onionsanArmLeft.png?url';
import ionAOnionsanArmOut from '../../assets/images/overworldNPCs/aerialis/onionsanArmOut.png?url';
import ionAOnionsanArmWave from '../../assets/images/overworldNPCs/aerialis/onionsanArmWave.png?url';
import ionAOnionsanKawaii$info from '../../assets/images/overworldNPCs/aerialis/onionsanKawaii.json?url';
import ionAOnionsanKawaii from '../../assets/images/overworldNPCs/aerialis/onionsanKawaii.png?url';
import ionAOnionsanWistful from '../../assets/images/overworldNPCs/aerialis/onionsanWistful.png?url';
import ionAOnionsanYhear from '../../assets/images/overworldNPCs/aerialis/onionsanYhear.png?url';
import ionAProskater$info from '../../assets/images/overworldNPCs/aerialis/proskater.json?url';
import ionAProskater from '../../assets/images/overworldNPCs/aerialis/proskater.png?url';
import ionAPyrope$info from '../../assets/images/overworldNPCs/aerialis/pyrope.json?url';
import ionAPyrope from '../../assets/images/overworldNPCs/aerialis/pyrope.png?url';
import ionAReg$info from '../../assets/images/overworldNPCs/aerialis/reg.json?url';
import ionAReg from '../../assets/images/overworldNPCs/aerialis/reg.png?url';
import ionARgbugDown$info from '../../assets/images/overworldNPCs/aerialis/rgbugDown.json?url';
import ionARgbugDown from '../../assets/images/overworldNPCs/aerialis/rgbugDown.png?url';
import ionARgbugLeft$info from '../../assets/images/overworldNPCs/aerialis/rgbugLeft.json?url';
import ionARgbugLeft from '../../assets/images/overworldNPCs/aerialis/rgbugLeft.png?url';
import ionARgbugRight$info from '../../assets/images/overworldNPCs/aerialis/rgbugRight.json?url';
import ionARgbugRight from '../../assets/images/overworldNPCs/aerialis/rgbugRight.png?url';
import ionARgcatDown$info from '../../assets/images/overworldNPCs/aerialis/rgcatDown.json?url';
import ionARgcatDown from '../../assets/images/overworldNPCs/aerialis/rgcatDown.png?url';
import ionARgcatLeft$info from '../../assets/images/overworldNPCs/aerialis/rgcatLeft.json?url';
import ionARgcatLeft from '../../assets/images/overworldNPCs/aerialis/rgcatLeft.png?url';
import ionARgcatRight$info from '../../assets/images/overworldNPCs/aerialis/rgcatRight.json?url';
import ionARgcatRight from '../../assets/images/overworldNPCs/aerialis/rgcatRight.png?url';
import ionARgdragonDown$info from '../../assets/images/overworldNPCs/aerialis/rgdragonDown.json?url';
import ionARgdragonDown from '../../assets/images/overworldNPCs/aerialis/rgdragonDown.png?url';
import ionARgdragonLeft$info from '../../assets/images/overworldNPCs/aerialis/rgdragonLeft.json?url';
import ionARgdragonLeft from '../../assets/images/overworldNPCs/aerialis/rgdragonLeft.png?url';
import ionARgdragonRight$info from '../../assets/images/overworldNPCs/aerialis/rgdragonRight.json?url';
import ionARgdragonRight from '../../assets/images/overworldNPCs/aerialis/rgdragonRight.png?url';
import ionARgrabbitDown$info from '../../assets/images/overworldNPCs/aerialis/rgrabbitDown.json?url';
import ionARgrabbitDown from '../../assets/images/overworldNPCs/aerialis/rgrabbitDown.png?url';
import ionARgrabbitLeft$info from '../../assets/images/overworldNPCs/aerialis/rgrabbitLeft.json?url';
import ionARgrabbitLeft from '../../assets/images/overworldNPCs/aerialis/rgrabbitLeft.png?url';
import ionARgrabbitRight$info from '../../assets/images/overworldNPCs/aerialis/rgrabbitRight.json?url';
import ionARgrabbitRight from '../../assets/images/overworldNPCs/aerialis/rgrabbitRight.png?url';
import ionARinger$info from '../../assets/images/overworldNPCs/aerialis/ringer.json?url';
import ionARinger from '../../assets/images/overworldNPCs/aerialis/ringer.png?url';
import ionASlimeFather$info from '../../assets/images/overworldNPCs/aerialis/slime_father.json?url';
import ionASlimeFather from '../../assets/images/overworldNPCs/aerialis/slime_father.png?url';
import ionASlimeKid1$info from '../../assets/images/overworldNPCs/aerialis/slime_kid1.json?url';
import ionASlimeKid1 from '../../assets/images/overworldNPCs/aerialis/slime_kid1.png?url';
import ionASlimeKid2$info from '../../assets/images/overworldNPCs/aerialis/slime_kid2.json?url';
import ionASlimeKid2 from '../../assets/images/overworldNPCs/aerialis/slime_kid2.png?url';
import ionASlimeMother$info from '../../assets/images/overworldNPCs/aerialis/slime_mother.json?url';
import ionASlimeMother from '../../assets/images/overworldNPCs/aerialis/slime_mother.png?url';
import ionAThisisnotabomb$info from '../../assets/images/overworldNPCs/aerialis/thisisnotabomb.json?url';
import ionAThisisnotabomb from '../../assets/images/overworldNPCs/aerialis/thisisnotabomb.png?url';
import ionAVulkin$info from '../../assets/images/overworldNPCs/aerialis/vulkin.json?url';
import ionAVulkin from '../../assets/images/overworldNPCs/aerialis/vulkin.png?url';
import ionCBb1 from '../../assets/images/overworldNPCs/citadel/bb1.png?url';
import ionCBb2 from '../../assets/images/overworldNPCs/citadel/bb2.png?url';
import ionCBb3 from '../../assets/images/overworldNPCs/citadel/bb3.png?url';
import ionCJanet$info from '../../assets/images/overworldNPCs/citadel/janet.json?url';
import ionCJanet from '../../assets/images/overworldNPCs/citadel/janet.png?url';
import ionCNeuteral from '../../assets/images/overworldNPCs/citadel/neuteral.png?url';
import ionCNicecreamKid from '../../assets/images/overworldNPCs/citadel/nicecreamKid.png?url';
import ionCPartysupervisor$info from '../../assets/images/overworldNPCs/citadel/partysupervisor.json?url';
import ionCPartysupervisor from '../../assets/images/overworldNPCs/citadel/partysupervisor.png?url';
import ionCWoshbird from '../../assets/images/overworldNPCs/citadel/woshbird.png?url';
import ionF86$info from '../../assets/images/overworldNPCs/foundry/86.json?url';
import ionF86 from '../../assets/images/overworldNPCs/foundry/86.png?url';
import ionFBird$info from '../../assets/images/overworldNPCs/foundry/bird.json?url';
import ionFBird from '../../assets/images/overworldNPCs/foundry/bird.png?url';
import ionFBirdCry$info from '../../assets/images/overworldNPCs/foundry/birdCry.json?url';
import ionFBirdCry from '../../assets/images/overworldNPCs/foundry/birdCry.png?url';
import ionFBirdFly$info from '../../assets/images/overworldNPCs/foundry/birdFly.json?url';
import ionFBirdFly from '../../assets/images/overworldNPCs/foundry/birdFly.png?url';
import ionFClamgirl1$info from '../../assets/images/overworldNPCs/foundry/clamgirl1.json?url';
import ionFClamgirl1 from '../../assets/images/overworldNPCs/foundry/clamgirl1.png?url';
import ionFClamgirl2$info from '../../assets/images/overworldNPCs/foundry/clamgirl2.json?url';
import ionFClamgirl2 from '../../assets/images/overworldNPCs/foundry/clamgirl2.png?url';
import ionFDoge$info from '../../assets/images/overworldNPCs/foundry/doge.json?url';
import ionFDoge from '../../assets/images/overworldNPCs/foundry/doge.png?url';
import ionFDogeLeft$info from '../../assets/images/overworldNPCs/foundry/dogeLeft.json?url';
import ionFDogeLeft from '../../assets/images/overworldNPCs/foundry/dogeLeft.png?url';
import ionFDogeRight$info from '../../assets/images/overworldNPCs/foundry/dogeRight.json?url';
import ionFDogeRight from '../../assets/images/overworldNPCs/foundry/dogeRight.png?url';
import ionFEchodude$info from '../../assets/images/overworldNPCs/foundry/echodude.json?url';
import ionFEchodude from '../../assets/images/overworldNPCs/foundry/echodude.png?url';
import ionFLongsy$info from '../../assets/images/overworldNPCs/foundry/longsy.json?url';
import ionFLongsy from '../../assets/images/overworldNPCs/foundry/longsy.png?url';
import ionFMuffet$info from '../../assets/images/overworldNPCs/foundry/muffet.json?url';
import ionFMuffet from '../../assets/images/overworldNPCs/foundry/muffet.png?url';
import ionFMuffetBack$info from '../../assets/images/overworldNPCs/foundry/muffetBack.json?url';
import ionFMuffetBack from '../../assets/images/overworldNPCs/foundry/muffetBack.png?url';
import ionFMushroomdance1$info from '../../assets/images/overworldNPCs/foundry/mushroomdance1.json?url';
import ionFMushroomdance1 from '../../assets/images/overworldNPCs/foundry/mushroomdance1.png?url';
import ionFMushroomdance2$info from '../../assets/images/overworldNPCs/foundry/mushroomdance2.json?url';
import ionFMushroomdance2 from '../../assets/images/overworldNPCs/foundry/mushroomdance2.png?url';
import ionFMushroomdance3$info from '../../assets/images/overworldNPCs/foundry/mushroomdance3.json?url';
import ionFMushroomdance3 from '../../assets/images/overworldNPCs/foundry/mushroomdance3.png?url';
import ionFShortsy$info from '../../assets/images/overworldNPCs/foundry/shortsy.json?url';
import ionFShortsy from '../../assets/images/overworldNPCs/foundry/shortsy.png?url';
import ionFShyren$info from '../../assets/images/overworldNPCs/foundry/shyren.json?url';
import ionFShyren from '../../assets/images/overworldNPCs/foundry/shyren.png?url';
import ionFShyrenNote from '../../assets/images/overworldNPCs/foundry/shyrenNote.png?url';
import ionFShyrenSing$info from '../../assets/images/overworldNPCs/foundry/shyrenSing.json?url';
import ionFShyrenSing from '../../assets/images/overworldNPCs/foundry/shyrenSing.png?url';
import ionFSnail1$info from '../../assets/images/overworldNPCs/foundry/snail1.json?url';
import ionFSnail1 from '../../assets/images/overworldNPCs/foundry/snail1.png?url';
import ionFSnail2$info from '../../assets/images/overworldNPCs/foundry/snail2.json?url';
import ionFSnail2 from '../../assets/images/overworldNPCs/foundry/snail2.png?url';
import ionFSpider$info from '../../assets/images/overworldNPCs/foundry/spider.json?url';
import ionFSpider from '../../assets/images/overworldNPCs/foundry/spider.png?url';
import ionFStarkiller$info from '../../assets/images/overworldNPCs/foundry/starkiller.json?url';
import ionFStarkiller from '../../assets/images/overworldNPCs/foundry/starkiller.png?url';
import ionOChairiel$info from '../../assets/images/overworldNPCs/outlands/chairiel.json?url';
import ionOChairiel from '../../assets/images/overworldNPCs/outlands/chairiel.png?url';
import ionOChairielTalk$info from '../../assets/images/overworldNPCs/outlands/chairielTalk.json?url';
import ionOChairielTalk from '../../assets/images/overworldNPCs/outlands/chairielTalk.png?url';
import ionODummy$info from '../../assets/images/overworldNPCs/outlands/dummy.json?url';
import ionODummy from '../../assets/images/overworldNPCs/outlands/dummy.png?url';
import ionODummyBlush$info from '../../assets/images/overworldNPCs/outlands/dummyBlush.json?url';
import ionODummyBlush from '../../assets/images/overworldNPCs/outlands/dummyBlush.png?url';
import ionODummyGlad$info from '../../assets/images/overworldNPCs/outlands/dummyGlad.json?url';
import ionODummyGlad from '../../assets/images/overworldNPCs/outlands/dummyGlad.png?url';
import ionODummyMad$info from '../../assets/images/overworldNPCs/outlands/dummyMad.json?url';
import ionODummyMad from '../../assets/images/overworldNPCs/outlands/dummyMad.png?url';
import ionODummyRage$info from '../../assets/images/overworldNPCs/outlands/dummyRage.json?url';
import ionODummyRage from '../../assets/images/overworldNPCs/outlands/dummyRage.png?url';
import ionODummySad$info from '../../assets/images/overworldNPCs/outlands/dummySad.json?url';
import ionODummySad from '../../assets/images/overworldNPCs/outlands/dummySad.png?url';
import ionODummyShock$info from '../../assets/images/overworldNPCs/outlands/dummyShock.json?url';
import ionODummyShock from '../../assets/images/overworldNPCs/outlands/dummyShock.png?url';
import ionOFroggit$info from '../../assets/images/overworldNPCs/outlands/froggit.json?url';
import ionOFroggit from '../../assets/images/overworldNPCs/outlands/froggit.png?url';
import ionOFroggitBack$info from '../../assets/images/overworldNPCs/outlands/froggitBack.json?url';
import ionOFroggitBack from '../../assets/images/overworldNPCs/outlands/froggitBack.png?url';
import ionOGonerfrisk$info from '../../assets/images/overworldNPCs/outlands/gonerfrisk.json?url';
import ionOGonerfrisk from '../../assets/images/overworldNPCs/outlands/gonerfrisk.png?url';
import ionOLoox$info from '../../assets/images/overworldNPCs/outlands/loox.json?url';
import ionOLoox from '../../assets/images/overworldNPCs/outlands/loox.png?url';
import ionOLooxBack from '../../assets/images/overworldNPCs/outlands/looxBack.png?url';
import ionOManana$info from '../../assets/images/overworldNPCs/outlands/manana.json?url';
import ionOManana from '../../assets/images/overworldNPCs/outlands/manana.png?url';
import ionOMananaBack$info from '../../assets/images/overworldNPCs/outlands/mananaBack.json?url';
import ionOMananaBack from '../../assets/images/overworldNPCs/outlands/mananaBack.png?url';
import ionOMushy$info from '../../assets/images/overworldNPCs/outlands/mushy.json?url';
import ionOMushy from '../../assets/images/overworldNPCs/outlands/mushy.png?url';
import ionOMushyBack$info from '../../assets/images/overworldNPCs/outlands/mushyBack.json?url';
import ionOMushyBack from '../../assets/images/overworldNPCs/outlands/mushyBack.png?url';
import ionOPlugbelly$info from '../../assets/images/overworldNPCs/outlands/plugbelly.json?url';
import ionOPlugbelly from '../../assets/images/overworldNPCs/outlands/plugbelly.png?url';
import ionOPlugbellyBack$info from '../../assets/images/overworldNPCs/outlands/plugbellyBack.json?url';
import ionOPlugbellyBack from '../../assets/images/overworldNPCs/outlands/plugbellyBack.png?url';
import ionOSilencio$info from '../../assets/images/overworldNPCs/outlands/silencio.json?url';
import ionOSilencio from '../../assets/images/overworldNPCs/outlands/silencio.png?url';
import ionOSilencioBack$info from '../../assets/images/overworldNPCs/outlands/silencioBack.json?url';
import ionOSilencioBack from '../../assets/images/overworldNPCs/outlands/silencioBack.png?url';
import ionOSteaksalesman$info from '../../assets/images/overworldNPCs/outlands/steaksalesman.json?url';
import ionOSteaksalesman from '../../assets/images/overworldNPCs/outlands/steaksalesman.png?url';
import ionOSteaksalesmanBack$info from '../../assets/images/overworldNPCs/outlands/steaksalesmanBack.json?url';
import ionOSteaksalesmanBack from '../../assets/images/overworldNPCs/outlands/steaksalesmanBack.png?url';
import ionOWoshuaBack$info from '../../assets/images/overworldNPCs/outlands/woshuaBack.json?url';
import ionOWoshuaBack from '../../assets/images/overworldNPCs/outlands/woshuaBack.png?url';
import ionRiverboi$info from '../../assets/images/overworldNPCs/riverboi.json?url';
import ionRiverboi from '../../assets/images/overworldNPCs/riverboi.png?url';
import ionS98$info from '../../assets/images/overworldNPCs/starton/98.json?url';
import ionS98 from '../../assets/images/overworldNPCs/starton/98.png?url';
import ionSBeautifulfish$info from '../../assets/images/overworldNPCs/starton/beautifulfish.json?url';
import ionSBeautifulfish from '../../assets/images/overworldNPCs/starton/beautifulfish.png?url';
import ionSBigmouth$info from '../../assets/images/overworldNPCs/starton/bigmouth.json?url';
import ionSBigmouth from '../../assets/images/overworldNPCs/starton/bigmouth.png?url';
import ionSBunbun$info from '../../assets/images/overworldNPCs/starton/bunbun.json?url';
import ionSBunbun from '../../assets/images/overworldNPCs/starton/bunbun.png?url';
import ionSBunny$info from '../../assets/images/overworldNPCs/starton/bunny.json?url';
import ionSBunny from '../../assets/images/overworldNPCs/starton/bunny.png?url';
import ionSCupjake$info from '../../assets/images/overworldNPCs/starton/cupjake.json?url';
import ionSCupjake from '../../assets/images/overworldNPCs/starton/cupjake.png?url';
import ionSDogamy$info from '../../assets/images/overworldNPCs/starton/dogamy.json?url';
import ionSDogamy from '../../assets/images/overworldNPCs/starton/dogamy.png?url';
import ionSDogaressa$info from '../../assets/images/overworldNPCs/starton/dogaressa.json?url';
import ionSDogaressa from '../../assets/images/overworldNPCs/starton/dogaressa.png?url';
import ionSDoggo$info from '../../assets/images/overworldNPCs/starton/doggo.json?url';
import ionSDoggo from '../../assets/images/overworldNPCs/starton/doggo.png?url';
import ionSFaun$info from '../../assets/images/overworldNPCs/starton/faun.json?url';
import ionSFaun from '../../assets/images/overworldNPCs/starton/faun.png?url';
import ionSGreatdog$info from '../../assets/images/overworldNPCs/starton/greatdog.json?url';
import ionSGreatdog from '../../assets/images/overworldNPCs/starton/greatdog.png?url';
import ionSGreatdogHapp$info from '../../assets/images/overworldNPCs/starton/greatdogHapp.json?url';
import ionSGreatdogHapp from '../../assets/images/overworldNPCs/starton/greatdogHapp.png?url';
import ionSGreatdogLick$info from '../../assets/images/overworldNPCs/starton/greatdogLick.json?url';
import ionSGreatdogLick from '../../assets/images/overworldNPCs/starton/greatdogLick.png?url';
import ionSGrillby$info from '../../assets/images/overworldNPCs/starton/grillby.json?url';
import ionSGrillby from '../../assets/images/overworldNPCs/starton/grillby.png?url';
import ionSHappy$info from '../../assets/images/overworldNPCs/starton/happy.json?url';
import ionSHappy from '../../assets/images/overworldNPCs/starton/happy.png?url';
import ionSIcewolf$info from '../../assets/images/overworldNPCs/starton/icewolf.json?url';
import ionSIcewolf from '../../assets/images/overworldNPCs/starton/icewolf.png?url';
import ionSImafraidjumitebeinagang$info from '../../assets/images/overworldNPCs/starton/imafraidjumitebeinagang.json?url';
import ionSImafraidjumitebeinagang from '../../assets/images/overworldNPCs/starton/imafraidjumitebeinagang.png?url';
import ionSInnkeep$info from '../../assets/images/overworldNPCs/starton/innkeep.json?url';
import ionSInnkeep from '../../assets/images/overworldNPCs/starton/innkeep.png?url';
import ionSKabakk$info from '../../assets/images/overworldNPCs/starton/kabakk.json?url';
import ionSKabakk from '../../assets/images/overworldNPCs/starton/kabakk.png?url';
import ionSKakurolady$info from '../../assets/images/overworldNPCs/starton/kakurolady.json?url';
import ionSKakurolady from '../../assets/images/overworldNPCs/starton/kakurolady.png?url';
import ionSLibrarian$info from '../../assets/images/overworldNPCs/starton/librarian.json?url';
import ionSLibrarian from '../../assets/images/overworldNPCs/starton/librarian.png?url';
import ionSLoverboy$info from '../../assets/images/overworldNPCs/starton/loverboy.json?url';
import ionSLoverboy from '../../assets/images/overworldNPCs/starton/loverboy.png?url';
import ionSMoonrocks1$info from '../../assets/images/overworldNPCs/starton/moonrocks1.json?url';
import ionSMoonrocks1 from '../../assets/images/overworldNPCs/starton/moonrocks1.png?url';
import ionSMoonrocks2$info from '../../assets/images/overworldNPCs/starton/moonrocks2.json?url';
import ionSMoonrocks2 from '../../assets/images/overworldNPCs/starton/moonrocks2.png?url';
import ionSNicecream$info from '../../assets/images/overworldNPCs/starton/nicecream.json?url';
import ionSNicecream from '../../assets/images/overworldNPCs/starton/nicecream.png?url';
import ionSNicecreamCurious$info from '../../assets/images/overworldNPCs/starton/nicecreamCurious.json?url';
import ionSNicecreamCurious from '../../assets/images/overworldNPCs/starton/nicecreamCurious.png?url';
import ionSNicecreamHappi$info from '../../assets/images/overworldNPCs/starton/nicecreamHappi.json?url';
import ionSNicecreamHappi from '../../assets/images/overworldNPCs/starton/nicecreamHappi.png?url';
import ionSNicecreamSad$info from '../../assets/images/overworldNPCs/starton/nicecreamSad.json?url';
import ionSNicecreamSad from '../../assets/images/overworldNPCs/starton/nicecreamSad.png?url';
import ionSNicecreamShocked$info from '../../assets/images/overworldNPCs/starton/nicecreamShocked.json?url';
import ionSNicecreamShocked from '../../assets/images/overworldNPCs/starton/nicecreamShocked.png?url';
import ionSPolitics$info from '../../assets/images/overworldNPCs/starton/politics.json?url';
import ionSPolitics from '../../assets/images/overworldNPCs/starton/politics.png?url';
import ionSPunkhamster$info from '../../assets/images/overworldNPCs/starton/punkhamster.json?url';
import ionSPunkhamster from '../../assets/images/overworldNPCs/starton/punkhamster.png?url';
import ionSRabbit$info from '../../assets/images/overworldNPCs/starton/rabbit.json?url';
import ionSRabbit from '../../assets/images/overworldNPCs/starton/rabbit.png?url';
import ionSRedbird$info from '../../assets/images/overworldNPCs/starton/redbird.json?url';
import ionSRedbird from '../../assets/images/overworldNPCs/starton/redbird.png?url';
import ionSSnakeboi$info from '../../assets/images/overworldNPCs/starton/snakeboi.json?url';
import ionSSnakeboi from '../../assets/images/overworldNPCs/starton/snakeboi.png?url';
import ionSSnowdrake$info from '../../assets/images/overworldNPCs/starton/snowdrake.json?url';
import ionSSnowdrake from '../../assets/images/overworldNPCs/starton/snowdrake.png?url';
import ionSSweetie$info from '../../assets/images/overworldNPCs/starton/sweetie.json?url';
import ionSSweetie from '../../assets/images/overworldNPCs/starton/sweetie.png?url';
import ionSVegetoid$info from '../../assets/images/overworldNPCs/starton/vegetoid.json?url';
import ionSVegetoid from '../../assets/images/overworldNPCs/starton/vegetoid.png?url';
import ionSWisconsin$info from '../../assets/images/overworldNPCs/starton/wisconsin.json?url';
import ionSWisconsin from '../../assets/images/overworldNPCs/starton/wisconsin.png?url';
import iooACORE$info from '../../assets/images/overworldObjects/aerialis/CORE.json?url';
import iooACORE from '../../assets/images/overworldObjects/aerialis/CORE.png?url';
import iooACORECritical$info from '../../assets/images/overworldObjects/aerialis/CORE_critical.json?url';
import iooACORECritical from '../../assets/images/overworldObjects/aerialis/CORE_critical.png?url';
import iooACOREOverlay$info from '../../assets/images/overworldObjects/aerialis/CORE_overlay.json?url';
import iooACOREOverlay from '../../assets/images/overworldObjects/aerialis/CORE_overlay.png?url';
import iooABarricade$info from '../../assets/images/overworldObjects/aerialis/barricade.json?url';
import iooABarricade from '../../assets/images/overworldObjects/aerialis/barricade.png?url';
import iooABeaker from '../../assets/images/overworldObjects/aerialis/beaker.png?url';
import iooABeam from '../../assets/images/overworldObjects/aerialis/beam.png?url';
import iooABedcounter from '../../assets/images/overworldObjects/aerialis/bedcounter.png?url';
import iooABigAssDoor from '../../assets/images/overworldObjects/aerialis/bigAssDoor.png?url';
import iooABom from '../../assets/images/overworldObjects/aerialis/bom.png?url';
import iooABooster$info from '../../assets/images/overworldObjects/aerialis/booster.json?url';
import iooABooster from '../../assets/images/overworldObjects/aerialis/booster.png?url';
import iooABoosterBad$info from '../../assets/images/overworldObjects/aerialis/boosterBad.json?url';
import iooABoosterBad from '../../assets/images/overworldObjects/aerialis/boosterBad.png?url';
import iooABoosterStrut$info from '../../assets/images/overworldObjects/aerialis/booster_strut.json?url';
import iooABoosterStrut from '../../assets/images/overworldObjects/aerialis/booster_strut.png?url';
import iooACardboard from '../../assets/images/overworldObjects/aerialis/cardboard.png?url';
import iooACarrier$info from '../../assets/images/overworldObjects/aerialis/carrier.json?url';
import iooACarrier from '../../assets/images/overworldObjects/aerialis/carrier.png?url';
import iooACheckpointOver from '../../assets/images/overworldObjects/aerialis/checkpointOver.png?url';
import iooACheckpointUnder from '../../assets/images/overworldObjects/aerialis/checkpointUnder.png?url';
import iooAChesstable$info from '../../assets/images/overworldObjects/aerialis/chesstable.json?url';
import iooAChesstable from '../../assets/images/overworldObjects/aerialis/chesstable.png?url';
import iooACompactlazerdeluxe from '../../assets/images/overworldObjects/aerialis/compactlazerdeluxe.png?url';
import iooAConfetti$info from '../../assets/images/overworldObjects/aerialis/confetti.json?url';
import iooAConfetti from '../../assets/images/overworldObjects/aerialis/confetti.png?url';
import iooAConveyor$info from '../../assets/images/overworldObjects/aerialis/conveyor.json?url';
import iooAConveyor from '../../assets/images/overworldObjects/aerialis/conveyor.png?url';
import iooACorecolumn$info from '../../assets/images/overworldObjects/aerialis/corecolumn.json?url';
import iooACorecolumn from '../../assets/images/overworldObjects/aerialis/corecolumn.png?url';
import iooACoreswitch$info from '../../assets/images/overworldObjects/aerialis/coreswitch.json?url';
import iooACoreswitch from '../../assets/images/overworldObjects/aerialis/coreswitch.png?url';
import iooACorndog from '../../assets/images/overworldObjects/aerialis/corndog.png?url';
import iooADeadLeaf from '../../assets/images/overworldObjects/aerialis/deadLeaf.png?url';
import iooADinnertable from '../../assets/images/overworldObjects/aerialis/dinnertable.png?url';
import iooADiscoball$info from '../../assets/images/overworldObjects/aerialis/discoball.json?url';
import iooADiscoball from '../../assets/images/overworldObjects/aerialis/discoball.png?url';
import iooADrawbridge from '../../assets/images/overworldObjects/aerialis/drawbridge.png?url';
import iooADtTubes$info from '../../assets/images/overworldObjects/aerialis/dt_tubes.json?url';
import iooADtTubes from '../../assets/images/overworldObjects/aerialis/dt_tubes.png?url';
import iooAFloorsegment$info from '../../assets/images/overworldObjects/aerialis/floorsegment.json?url';
import iooAFloorsegment from '../../assets/images/overworldObjects/aerialis/floorsegment.png?url';
import iooAFlowertable from '../../assets/images/overworldObjects/aerialis/flowertable.png?url';
import iooAFoodcounter from '../../assets/images/overworldObjects/aerialis/foodcounter.png?url';
import iooAGlobe from '../../assets/images/overworldObjects/aerialis/globe.png?url';
import iooAHexogen from '../../assets/images/overworldObjects/aerialis/hexogen.png?url';
import iooAHotelfood$info from '../../assets/images/overworldObjects/aerialis/hotelfood.json?url';
import iooAHotelfood from '../../assets/images/overworldObjects/aerialis/hotelfood.png?url';
import iooALabcounter from '../../assets/images/overworldObjects/aerialis/labcounter.png?url';
import iooALabtable$info from '../../assets/images/overworldObjects/aerialis/labtable.json?url';
import iooALabtable from '../../assets/images/overworldObjects/aerialis/labtable.png?url';
import iooALaunchpad$info from '../../assets/images/overworldObjects/aerialis/launchpad.json?url';
import iooALaunchpad from '../../assets/images/overworldObjects/aerialis/launchpad.png?url';
import iooALaunchpadAbove$info from '../../assets/images/overworldObjects/aerialis/launchpadAbove.json?url';
import iooALaunchpadAbove from '../../assets/images/overworldObjects/aerialis/launchpadAbove.png?url';
import iooAMegacarrier$info from '../../assets/images/overworldObjects/aerialis/megacarrier.json?url';
import iooAMegacarrier from '../../assets/images/overworldObjects/aerialis/megacarrier.png?url';
import iooAMewposter$info from '../../assets/images/overworldObjects/aerialis/mewposter.json?url';
import iooAMewposter from '../../assets/images/overworldObjects/aerialis/mewposter.png?url';
import iooAMirrortableShort from '../../assets/images/overworldObjects/aerialis/mirrortableShort.png?url';
import iooAMoneyFireworks from '../../assets/images/overworldObjects/aerialis/moneyFireworks.png?url';
import iooAMoneyMew from '../../assets/images/overworldObjects/aerialis/moneyMew.png?url';
import iooAMoneyRadio from '../../assets/images/overworldObjects/aerialis/moneyRadio.png?url';
import iooAMonitorguy$info from '../../assets/images/overworldObjects/aerialis/monitorguy.json?url';
import iooAMonitorguy from '../../assets/images/overworldObjects/aerialis/monitorguy.png?url';
import iooAMonitorguyWater$info from '../../assets/images/overworldObjects/aerialis/monitorguyWater.json?url';
import iooAMonitorguyWater from '../../assets/images/overworldObjects/aerialis/monitorguyWater.png?url';
import iooAMoonPie from '../../assets/images/overworldObjects/aerialis/moon_pie.png?url';
import iooAOneOilyBoi from '../../assets/images/overworldObjects/aerialis/oneOilyBoi.png?url';
import iooAPathtile from '../../assets/images/overworldObjects/aerialis/pathtile.png?url';
import iooAPedastal from '../../assets/images/overworldObjects/aerialis/pedastal.png?url';
import iooAPedastalReverse$info from '../../assets/images/overworldObjects/aerialis/pedastalReverse.json?url';
import iooAPedastalReverse from '../../assets/images/overworldObjects/aerialis/pedastalReverse.png?url';
import iooAPottedtable from '../../assets/images/overworldObjects/aerialis/pottedtable.png?url';
import iooAPrimespire from '../../assets/images/overworldObjects/aerialis/primespire.png?url';
import iooAPterm$info from '../../assets/images/overworldObjects/aerialis/pterm.json?url';
import iooAPterm from '../../assets/images/overworldObjects/aerialis/pterm.png?url';
import iooAPuzzledoor$info from '../../assets/images/overworldObjects/aerialis/puzzledoor.json?url';
import iooAPuzzledoor from '../../assets/images/overworldObjects/aerialis/puzzledoor.png?url';
import iooAPuzzlenode$info from '../../assets/images/overworldObjects/aerialis/puzzlenode.json?url';
import iooAPuzzlenode from '../../assets/images/overworldObjects/aerialis/puzzlenode.png?url';
import iooAPuzzlenodeDark$info from '../../assets/images/overworldObjects/aerialis/puzzlenodeDark.json?url';
import iooAPuzzlenodeDark from '../../assets/images/overworldObjects/aerialis/puzzlenodeDark.png?url';
import iooAReccolumn$info from '../../assets/images/overworldObjects/aerialis/reccolumn.json?url';
import iooAReccolumn from '../../assets/images/overworldObjects/aerialis/reccolumn.png?url';
import iooAReccolumnLeft$info from '../../assets/images/overworldObjects/aerialis/reccolumnLeft.json?url';
import iooAReccolumnLeft from '../../assets/images/overworldObjects/aerialis/reccolumnLeft.png?url';
import iooAReccolumnRight$info from '../../assets/images/overworldObjects/aerialis/reccolumnRight.json?url';
import iooAReccolumnRight from '../../assets/images/overworldObjects/aerialis/reccolumnRight.png?url';
import iooARecycler from '../../assets/images/overworldObjects/aerialis/recycler.png?url';
import iooARoombed from '../../assets/images/overworldObjects/aerialis/roombed.png?url';
import iooARoombedCover from '../../assets/images/overworldObjects/aerialis/roombedCover.png?url';
import iooARoomtable from '../../assets/images/overworldObjects/aerialis/roomtable.png?url';
import iooASakuraLeaf from '../../assets/images/overworldObjects/aerialis/sakuraLeaf.png?url';
import iooAScreenborder from '../../assets/images/overworldObjects/aerialis/screenborder.png?url';
import iooAShowbarrier$info from '../../assets/images/overworldObjects/aerialis/showbarrier.json?url';
import iooAShowbarrier from '../../assets/images/overworldObjects/aerialis/showbarrier.png?url';
import iooAShowglow$info from '../../assets/images/overworldObjects/aerialis/showglow.json?url';
import iooAShowglow from '../../assets/images/overworldObjects/aerialis/showglow.png?url';
import iooASign from '../../assets/images/overworldObjects/aerialis/sign.png?url';
import iooASlantedSecurityField$info from '../../assets/images/overworldObjects/aerialis/slantedSecurityField.json?url';
import iooASlantedSecurityField from '../../assets/images/overworldObjects/aerialis/slantedSecurityField.png?url';
import iooASonic from '../../assets/images/overworldObjects/aerialis/sonic.png?url';
import iooASparkler$info from '../../assets/images/overworldObjects/aerialis/sparkler.json?url';
import iooASparkler from '../../assets/images/overworldObjects/aerialis/sparkler.png?url';
import iooASpeedline from '../../assets/images/overworldObjects/aerialis/speedline.png?url';
import iooASpotlight from '../../assets/images/overworldObjects/aerialis/spotlight.png?url';
import iooASpotlightAlt from '../../assets/images/overworldObjects/aerialis/spotlightAlt.png?url';
import iooAStage from '../../assets/images/overworldObjects/aerialis/stage.png?url';
import iooAStagecloud from '../../assets/images/overworldObjects/aerialis/stagecloud.png?url';
import iooAStagelight$info from '../../assets/images/overworldObjects/aerialis/stagelight.json?url';
import iooAStagelight from '../../assets/images/overworldObjects/aerialis/stagelight.png?url';
import iooAStageoverlay from '../../assets/images/overworldObjects/aerialis/stageoverlay.png?url';
import iooAStatue$info from '../../assets/images/overworldObjects/aerialis/statue.json?url';
import iooAStatue from '../../assets/images/overworldObjects/aerialis/statue.png?url';
import iooASyringe from '../../assets/images/overworldObjects/aerialis/syringe.png?url';
import iooATablaphone from '../../assets/images/overworldObjects/aerialis/tablaphone.png?url';
import iooAVender$info from '../../assets/images/overworldObjects/aerialis/vender.json?url';
import iooAVender from '../../assets/images/overworldObjects/aerialis/vender.png?url';
import iooAWishflower from '../../assets/images/overworldObjects/aerialis/wishflower.png?url';
import iooAWorkstation$info from '../../assets/images/overworldObjects/aerialis/workstation.json?url';
import iooAWorkstation from '../../assets/images/overworldObjects/aerialis/workstation.png?url';
import iooAXterm from '../../assets/images/overworldObjects/aerialis/xterm.png?url';
import iooBed from '../../assets/images/overworldObjects/bed.png?url';
import iooBedcover from '../../assets/images/overworldObjects/bedcover.png?url';
import iooBedcoverFinal from '../../assets/images/overworldObjects/bedcover_final.png?url';
import iooCArch1 from '../../assets/images/overworldObjects/citadel/arch1.png?url';
import iooCArch2 from '../../assets/images/overworldObjects/citadel/arch2.png?url';
import iooCArchiveBlookhouse from '../../assets/images/overworldObjects/citadel/archive_blookhouse.png?url';
import iooCArchiveBlookhouseExtra from '../../assets/images/overworldObjects/citadel/archive_blookhouse_extra.png?url';
import iooCArchiveKeystoneDiamond$info from '../../assets/images/overworldObjects/citadel/archive_keystone_diamond.json?url';
import iooCArchiveKeystoneDiamond from '../../assets/images/overworldObjects/citadel/archive_keystone_diamond.png?url';
import iooCArchiveLight from '../../assets/images/overworldObjects/citadel/archive_light.png?url';
import iooCArchiveLightInverted from '../../assets/images/overworldObjects/citadel/archive_light_inverted.png?url';
import iooCArchivePuzzlepylon$info from '../../assets/images/overworldObjects/citadel/archive_puzzlepylon.json?url';
import iooCArchivePuzzlepylon from '../../assets/images/overworldObjects/citadel/archive_puzzlepylon.png?url';
import iooCArchivePuzzlepylonOverlay from '../../assets/images/overworldObjects/citadel/archive_puzzlepylon_overlay.png?url';
import iooCArchiveSentry from '../../assets/images/overworldObjects/citadel/archive_sentry.png?url';
import iooCArchiveTerminal$info from '../../assets/images/overworldObjects/citadel/archive_terminal.json?url';
import iooCArchiveTerminal from '../../assets/images/overworldObjects/citadel/archive_terminal.png?url';
import iooCAsgoreAsrielOver from '../../assets/images/overworldObjects/citadel/asgore_asriel_over.png?url';
import iooCBastion$info from '../../assets/images/overworldObjects/citadel/bastion.json?url';
import iooCBastion from '../../assets/images/overworldObjects/citadel/bastion.png?url';
import iooCBastionCable$info from '../../assets/images/overworldObjects/citadel/bastionCable.json?url';
import iooCBastionCable from '../../assets/images/overworldObjects/citadel/bastionCable.png?url';
import iooCBastionwall from '../../assets/images/overworldObjects/citadel/bastionwall.png?url';
import iooCCArchiveFoundryA3Over from '../../assets/images/overworldObjects/citadel/c_archive_foundryA3_over.png?url';
import iooCCArchiveFoundryB2Over1 from '../../assets/images/overworldObjects/citadel/c_archive_foundryB2_over1.png?url';
import iooCCArchiveFoundryB2Over2 from '../../assets/images/overworldObjects/citadel/c_archive_foundryB2_over2.png?url';
import iooCCAsgoreFrontOver from '../../assets/images/overworldObjects/citadel/c_asgore_front_over.png?url';
import iooCChair from '../../assets/images/overworldObjects/citadel/chair.png?url';
import iooCCity1 from '../../assets/images/overworldObjects/citadel/city1.png?url';
import iooCCity1dark from '../../assets/images/overworldObjects/citadel/city1dark.png?url';
import iooCCity2 from '../../assets/images/overworldObjects/citadel/city2.png?url';
import iooCCity2dark from '../../assets/images/overworldObjects/citadel/city2dark.png?url';
import iooCCity3 from '../../assets/images/overworldObjects/citadel/city3.png?url';
import iooCCity3dark from '../../assets/images/overworldObjects/citadel/city3dark.png?url';
import iooCCity4 from '../../assets/images/overworldObjects/citadel/city4.png?url';
import iooCCity4dark from '../../assets/images/overworldObjects/citadel/city4dark.png?url';
import iooCCity5 from '../../assets/images/overworldObjects/citadel/city5.png?url';
import iooCCity5dark from '../../assets/images/overworldObjects/citadel/city5dark.png?url';
import iooCCityship$info from '../../assets/images/overworldObjects/citadel/cityship.json?url';
import iooCCityship from '../../assets/images/overworldObjects/citadel/cityship.png?url';
import iooCDrinkTeapot$info from '../../assets/images/overworldObjects/citadel/drink_teapot.json?url';
import iooCDrinkTeapot from '../../assets/images/overworldObjects/citadel/drink_teapot.png?url';
import iooCFadestrip from '../../assets/images/overworldObjects/citadel/fadestrip.png?url';
import iooCFicus from '../../assets/images/overworldObjects/citadel/ficus.png?url';
import iooCFireplace from '../../assets/images/overworldObjects/citadel/fireplace.png?url';
import iooCMirror from '../../assets/images/overworldObjects/citadel/mirror.png?url';
import iooCPicnictable from '../../assets/images/overworldObjects/citadel/picnictable.png?url';
import iooCPillar from '../../assets/images/overworldObjects/citadel/pillar.png?url';
import iooCPresent$info from '../../assets/images/overworldObjects/citadel/present.json?url';
import iooCPresent from '../../assets/images/overworldObjects/citadel/present.png?url';
import iooCQuiethouse from '../../assets/images/overworldObjects/citadel/quiethouse.png?url';
import iooCRing1 from '../../assets/images/overworldObjects/citadel/ring1.png?url';
import iooCRing2 from '../../assets/images/overworldObjects/citadel/ring2.png?url';
import iooCSmallscreen$info from '../../assets/images/overworldObjects/citadel/smallscreen.json?url';
import iooCSmallscreen from '../../assets/images/overworldObjects/citadel/smallscreen.png?url';
import iooCSoundsuspender from '../../assets/images/overworldObjects/citadel/soundsuspender.png?url';
import iooCSoundtower from '../../assets/images/overworldObjects/citadel/soundtower.png?url';
import iooCTable from '../../assets/images/overworldObjects/citadel/table.png?url';
import iooCTeacup from '../../assets/images/overworldObjects/citadel/teacup.png?url';
import iooCThrone$info from '../../assets/images/overworldObjects/citadel/throne.json?url';
import iooCThrone from '../../assets/images/overworldObjects/citadel/throne.png?url';
import iooCTopcouch from '../../assets/images/overworldObjects/citadel/topcouch.png?url';
import iooCTopcouchLight from '../../assets/images/overworldObjects/citadel/topcouchLight.png?url';
import iooCTrash from '../../assets/images/overworldObjects/citadel/trash.png?url';
import iooCTvBack from '../../assets/images/overworldObjects/citadel/tv_back.png?url';
import iooCTvLite from '../../assets/images/overworldObjects/citadel/tv_lite.png?url';
import iooCVirtexit from '../../assets/images/overworldObjects/citadel/virtexit.png?url';
import iooDimbox$info from '../../assets/images/overworldObjects/dimbox.json?url';
import iooDimbox from '../../assets/images/overworldObjects/dimbox.png?url';
import iooFTHATSTHESTUFF$info from '../../assets/images/overworldObjects/foundry/THATSTHESTUFF.json?url';
import iooFTHATSTHESTUFF from '../../assets/images/overworldObjects/foundry/THATSTHESTUFF.png?url';
import iooFArtifact$info from '../../assets/images/overworldObjects/foundry/artifact.json?url';
import iooFArtifact from '../../assets/images/overworldObjects/foundry/artifact.png?url';
import iooFAsteroid1 from '../../assets/images/overworldObjects/foundry/asteroid1.png?url';
import iooFBench from '../../assets/images/overworldObjects/foundry/bench.png?url';
import iooFBlookComputer$info from '../../assets/images/overworldObjects/foundry/blook_computer.json?url';
import iooFBlookComputer from '../../assets/images/overworldObjects/foundry/blook_computer.png?url';
import iooFBlookhouse from '../../assets/images/overworldObjects/foundry/blookhouse.png?url';
import iooFBook from '../../assets/images/overworldObjects/foundry/book.png?url';
import iooFBoots from '../../assets/images/overworldObjects/foundry/boots.png?url';
import iooFBurger from '../../assets/images/overworldObjects/foundry/burger.png?url';
import iooFCheesetable$info from '../../assets/images/overworldObjects/foundry/cheesetable.json?url';
import iooFCheesetable from '../../assets/images/overworldObjects/foundry/cheesetable.png?url';
import iooFCookpotBlack$info from '../../assets/images/overworldObjects/foundry/cookpot_black.json?url';
import iooFCookpotBlack from '../../assets/images/overworldObjects/foundry/cookpot_black.png?url';
import iooFCookpotHeat$info from '../../assets/images/overworldObjects/foundry/cookpot_heat.json?url';
import iooFCookpotHeat from '../../assets/images/overworldObjects/foundry/cookpot_heat.png?url';
import iooFCookpotStir$info from '../../assets/images/overworldObjects/foundry/cookpot_stir.json?url';
import iooFCookpotStir from '../../assets/images/overworldObjects/foundry/cookpot_stir.png?url';
import iooFCooler from '../../assets/images/overworldObjects/foundry/cooler.png?url';
import iooFDrinkHotchocolate$info from '../../assets/images/overworldObjects/foundry/drink_hotchocolate.json?url';
import iooFDrinkHotchocolate from '../../assets/images/overworldObjects/foundry/drink_hotchocolate.png?url';
import iooFDrinkSoda$info from '../../assets/images/overworldObjects/foundry/drink_soda.json?url';
import iooFDrinkSoda from '../../assets/images/overworldObjects/foundry/drink_soda.png?url';
import iooFDrinkSugar$info from '../../assets/images/overworldObjects/foundry/drink_sugar.json?url';
import iooFDrinkSugar from '../../assets/images/overworldObjects/foundry/drink_sugar.png?url';
import iooFDrinkTea$info from '../../assets/images/overworldObjects/foundry/drink_tea.json?url';
import iooFDrinkTea from '../../assets/images/overworldObjects/foundry/drink_tea.png?url';
import iooFDrinkTeapot$info from '../../assets/images/overworldObjects/foundry/drink_teapot.json?url';
import iooFDrinkTeapot from '../../assets/images/overworldObjects/foundry/drink_teapot.png?url';
import iooFDrinkWater$info from '../../assets/images/overworldObjects/foundry/drink_water.json?url';
import iooFDrinkWater from '../../assets/images/overworldObjects/foundry/drink_water.png?url';
import iooFEchoflower$info from '../../assets/images/overworldObjects/foundry/echoflower.json?url';
import iooFEchoflower from '../../assets/images/overworldObjects/foundry/echoflower.png?url';
import iooFEggo from '../../assets/images/overworldObjects/foundry/eggo.png?url';
import iooFFenceBottomleft from '../../assets/images/overworldObjects/foundry/fence_bottomleft.png?url';
import iooFFenceBottomleftcap from '../../assets/images/overworldObjects/foundry/fence_bottomleftcap.png?url';
import iooFFenceBottomright from '../../assets/images/overworldObjects/foundry/fence_bottomright.png?url';
import iooFFenceBottomrightcap from '../../assets/images/overworldObjects/foundry/fence_bottomrightcap.png?url';
import iooFFenceMidcenter from '../../assets/images/overworldObjects/foundry/fence_midcenter.png?url';
import iooFFenceMidleft from '../../assets/images/overworldObjects/foundry/fence_midleft.png?url';
import iooFFenceMidright from '../../assets/images/overworldObjects/foundry/fence_midright.png?url';
import iooFFenceTopleft from '../../assets/images/overworldObjects/foundry/fence_topleft.png?url';
import iooFFenceTopleftcap from '../../assets/images/overworldObjects/foundry/fence_topleftcap.png?url';
import iooFFenceTopright from '../../assets/images/overworldObjects/foundry/fence_topright.png?url';
import iooFFenceToprightcap from '../../assets/images/overworldObjects/foundry/fence_toprightcap.png?url';
import iooFFenceVertleft from '../../assets/images/overworldObjects/foundry/fence_vertleft.png?url';
import iooFFenceVertright from '../../assets/images/overworldObjects/foundry/fence_vertright.png?url';
import iooFFloorspear$info from '../../assets/images/overworldObjects/foundry/floorspear.json?url';
import iooFFloorspear from '../../assets/images/overworldObjects/foundry/floorspear.png?url';
import iooFFloorspearBase from '../../assets/images/overworldObjects/foundry/floorspear_base.png?url';
import iooFFries from '../../assets/images/overworldObjects/foundry/fries.png?url';
import iooFGenohole from '../../assets/images/overworldObjects/foundry/genohole.png?url';
import iooFGunk1$info from '../../assets/images/overworldObjects/foundry/gunk1.json?url';
import iooFGunk1 from '../../assets/images/overworldObjects/foundry/gunk1.png?url';
import iooFGunk2$info from '../../assets/images/overworldObjects/foundry/gunk2.json?url';
import iooFGunk2 from '../../assets/images/overworldObjects/foundry/gunk2.png?url';
import iooFGunk3$info from '../../assets/images/overworldObjects/foundry/gunk3.json?url';
import iooFGunk3 from '../../assets/images/overworldObjects/foundry/gunk3.png?url';
import iooFHovercrystal$info from '../../assets/images/overworldObjects/foundry/hovercrystal.json?url';
import iooFHovercrystal from '../../assets/images/overworldObjects/foundry/hovercrystal.png?url';
import iooFJumpsuit from '../../assets/images/overworldObjects/foundry/jumpsuit.png?url';
import iooFMazeshadow$info from '../../assets/images/overworldObjects/foundry/mazeshadow.json?url';
import iooFMazeshadow from '../../assets/images/overworldObjects/foundry/mazeshadow.png?url';
import iooFNapstacouch from '../../assets/images/overworldObjects/foundry/napstacouch.png?url';
import iooFOverhead from '../../assets/images/overworldObjects/foundry/overhead.png?url';
import iooFPiano from '../../assets/images/overworldObjects/foundry/piano.png?url';
import iooFPianoOver1 from '../../assets/images/overworldObjects/foundry/piano_over1.png?url';
import iooFPianoOver2 from '../../assets/images/overworldObjects/foundry/piano_over2.png?url';
import iooFPianoarrowDot$info from '../../assets/images/overworldObjects/foundry/pianoarrow_dot.json?url';
import iooFPianoarrowDot from '../../assets/images/overworldObjects/foundry/pianoarrow_dot.png?url';
import iooFPianoarrowDown$info from '../../assets/images/overworldObjects/foundry/pianoarrow_down.json?url';
import iooFPianoarrowDown from '../../assets/images/overworldObjects/foundry/pianoarrow_down.png?url';
import iooFPianoarrowLeft$info from '../../assets/images/overworldObjects/foundry/pianoarrow_left.json?url';
import iooFPianoarrowLeft from '../../assets/images/overworldObjects/foundry/pianoarrow_left.png?url';
import iooFPianoarrowRight$info from '../../assets/images/overworldObjects/foundry/pianoarrow_right.json?url';
import iooFPianoarrowRight from '../../assets/images/overworldObjects/foundry/pianoarrow_right.png?url';
import iooFPianoarrowUp$info from '../../assets/images/overworldObjects/foundry/pianoarrow_up.json?url';
import iooFPianoarrowUp from '../../assets/images/overworldObjects/foundry/pianoarrow_up.png?url';
import iooFPianosolution$info from '../../assets/images/overworldObjects/foundry/pianosolution.json?url';
import iooFPianosolution from '../../assets/images/overworldObjects/foundry/pianosolution.png?url';
import iooFPianosolution2$info from '../../assets/images/overworldObjects/foundry/pianosolution2.json?url';
import iooFPianosolution2 from '../../assets/images/overworldObjects/foundry/pianosolution2.png?url';
import iooFPlankBridge from '../../assets/images/overworldObjects/foundry/plank_bridge.png?url';
import iooFPrechaseBridge from '../../assets/images/overworldObjects/foundry/prechase_bridge.png?url';
import iooFPuzzle1Over from '../../assets/images/overworldObjects/foundry/puzzle1_over.png?url';
import iooFPuzzle2Over from '../../assets/images/overworldObjects/foundry/puzzle2_over.png?url';
import iooFPuzzle3Over from '../../assets/images/overworldObjects/foundry/puzzle3_over.png?url';
import iooFPuzzlepylon$info from '../../assets/images/overworldObjects/foundry/puzzlepylon.json?url';
import iooFPuzzlepylon from '../../assets/images/overworldObjects/foundry/puzzlepylon.png?url';
import iooFPuzzlepylonOverlay from '../../assets/images/overworldObjects/foundry/puzzlepylon_overlay.png?url';
import iooFRaft from '../../assets/images/overworldObjects/foundry/raft.png?url';
import iooFRedcouch from '../../assets/images/overworldObjects/foundry/redcouch.png?url';
import iooFRedsword from '../../assets/images/overworldObjects/foundry/redsword.png?url';
import iooFRug from '../../assets/images/overworldObjects/foundry/rug.png?url';
import iooFSecretbook$info from '../../assets/images/overworldObjects/foundry/secretbook.json?url';
import iooFSecretbook from '../../assets/images/overworldObjects/foundry/secretbook.png?url';
import iooFShard from '../../assets/images/overworldObjects/foundry/shard.png?url';
import iooFShinycab from '../../assets/images/overworldObjects/foundry/shinycab.png?url';
import iooFSign from '../../assets/images/overworldObjects/foundry/sign.png?url';
import iooFSnack from '../../assets/images/overworldObjects/foundry/snack.png?url';
import iooFSpaghetti from '../../assets/images/overworldObjects/foundry/spaghetti.png?url';
import iooFSpear from '../../assets/images/overworldObjects/foundry/spear.png?url';
import iooFSpearHole from '../../assets/images/overworldObjects/foundry/spear_hole.png?url';
import iooFSpearSpawn$info from '../../assets/images/overworldObjects/foundry/spear_spawn.json?url';
import iooFSpearSpawn from '../../assets/images/overworldObjects/foundry/spear_spawn.png?url';
import iooFSpearStab from '../../assets/images/overworldObjects/foundry/spear_stab.png?url';
import iooFSpiderflower from '../../assets/images/overworldObjects/foundry/spiderflower.png?url';
import iooFSpidertable from '../../assets/images/overworldObjects/foundry/spidertable.png?url';
import iooFStatue$info from '../../assets/images/overworldObjects/foundry/statue.json?url';
import iooFStatue from '../../assets/images/overworldObjects/foundry/statue.png?url';
import iooFSteam from '../../assets/images/overworldObjects/foundry/steam.png?url';
import iooFStoveknob from '../../assets/images/overworldObjects/foundry/stoveknob.png?url';
import iooFTallgrass$info from '../../assets/images/overworldObjects/foundry/tallgrass.json?url';
import iooFTallgrass from '../../assets/images/overworldObjects/foundry/tallgrass.png?url';
import iooFTeacup from '../../assets/images/overworldObjects/foundry/teacup.png?url';
import iooFTeapot$info from '../../assets/images/overworldObjects/foundry/teapot.json?url';
import iooFTeapot from '../../assets/images/overworldObjects/foundry/teapot.png?url';
import iooFThundertron$info from '../../assets/images/overworldObjects/foundry/thundertron.json?url';
import iooFThundertron from '../../assets/images/overworldObjects/foundry/thundertron.png?url';
import iooFTinychair from '../../assets/images/overworldObjects/foundry/tinychair.png?url';
import iooFTrash from '../../assets/images/overworldObjects/foundry/trash.png?url';
import iooFTronsnail1$info from '../../assets/images/overworldObjects/foundry/tronsnail1.json?url';
import iooFTronsnail1 from '../../assets/images/overworldObjects/foundry/tronsnail1.png?url';
import iooFTronsnail2$info from '../../assets/images/overworldObjects/foundry/tronsnail2.json?url';
import iooFTronsnail2 from '../../assets/images/overworldObjects/foundry/tronsnail2.png?url';
import iooFTronsnail3$info from '../../assets/images/overworldObjects/foundry/tronsnail3.json?url';
import iooFTronsnail3 from '../../assets/images/overworldObjects/foundry/tronsnail3.png?url';
import iooFUndyneDoor$info from '../../assets/images/overworldObjects/foundry/undyne_door.json?url';
import iooFUndyneDoor from '../../assets/images/overworldObjects/foundry/undyne_door.png?url';
import iooFUndyneDrawer$info from '../../assets/images/overworldObjects/foundry/undyne_drawer.json?url';
import iooFUndyneDrawer from '../../assets/images/overworldObjects/foundry/undyne_drawer.png?url';
import iooFUndynePiano from '../../assets/images/overworldObjects/foundry/undyne_piano.png?url';
import iooFUndyneTable$info from '../../assets/images/overworldObjects/foundry/undyne_table.json?url';
import iooFUndyneTable from '../../assets/images/overworldObjects/foundry/undyne_table.png?url';
import iooFUndyneWindow$info from '../../assets/images/overworldObjects/foundry/undyne_window.json?url';
import iooFUndyneWindow from '../../assets/images/overworldObjects/foundry/undyne_window.png?url';
import iooFUndynehouse$info from '../../assets/images/overworldObjects/foundry/undynehouse.json?url';
import iooFUndynehouse from '../../assets/images/overworldObjects/foundry/undynehouse.png?url';
import iooFUndynehouseWrecked$info from '../../assets/images/overworldObjects/foundry/undynehouse_wrecked.json?url';
import iooFUndynehouseWrecked from '../../assets/images/overworldObjects/foundry/undynehouse_wrecked.png?url';
import iooFVeggies$info from '../../assets/images/overworldObjects/foundry/veggies.json?url';
import iooFVeggies from '../../assets/images/overworldObjects/foundry/veggies.png?url';
import iooFVendingMachine$info from '../../assets/images/overworldObjects/foundry/vending_machine.json?url';
import iooFVendingMachine from '../../assets/images/overworldObjects/foundry/vending_machine.png?url';
import iooFViewBackdrop from '../../assets/images/overworldObjects/foundry/view_backdrop.png?url';
import iooFWallsign from '../../assets/images/overworldObjects/foundry/wallsign.png?url';
import iooFWallsignPainted from '../../assets/images/overworldObjects/foundry/wallsign_painted.png?url';
import iooFWatercooler from '../../assets/images/overworldObjects/foundry/watercooler.png?url';
import iooFWeb1 from '../../assets/images/overworldObjects/foundry/web1.png?url';
import iooFWeb2 from '../../assets/images/overworldObjects/foundry/web2.png?url';
import iooFWeb3 from '../../assets/images/overworldObjects/foundry/web3.png?url';
import iooFWebcube from '../../assets/images/overworldObjects/foundry/webcube.png?url';
import iooFWebcuboid from '../../assets/images/overworldObjects/foundry/webcuboid.png?url';
import iooFrontierCactus from '../../assets/images/overworldObjects/frontier_cactus.png?url';
import iooFrontierComputer$info from '../../assets/images/overworldObjects/frontier_computer.json?url';
import iooFrontierComputer from '../../assets/images/overworldObjects/frontier_computer.png?url';
import iooFrontierMirrorBackdrop from '../../assets/images/overworldObjects/frontier_mirror_backdrop.png?url';
import iooFrontierOver from '../../assets/images/overworldObjects/frontier_over.png?url';
import iooFrontierPlant from '../../assets/images/overworldObjects/frontier_plant.png?url';
import iooFrontierTable from '../../assets/images/overworldObjects/frontier_table.png?url';
import iooFrontierUnder from '../../assets/images/overworldObjects/frontier_under.png?url';
import iooHovercar$info from '../../assets/images/overworldObjects/hovercar.json?url';
import iooHovercar from '../../assets/images/overworldObjects/hovercar.png?url';
import iooHovercarBack$info from '../../assets/images/overworldObjects/hovercar_back.json?url';
import iooHovercarBack from '../../assets/images/overworldObjects/hovercar_back.png?url';
import iooOBreakfast from '../../assets/images/overworldObjects/outlands/breakfast.png?url';
import iooOButton$info from '../../assets/images/overworldObjects/outlands/button.json?url';
import iooOButton from '../../assets/images/overworldObjects/outlands/button.png?url';
import iooOChairiel$info from '../../assets/images/overworldObjects/outlands/chairiel.json?url';
import iooOChairiel from '../../assets/images/overworldObjects/outlands/chairiel.png?url';
import iooOCoatrack from '../../assets/images/overworldObjects/outlands/coatrack.png?url';
import iooODiningTable from '../../assets/images/overworldObjects/outlands/dining_table.png?url';
import iooODipper from '../../assets/images/overworldObjects/outlands/dipper.png?url';
import iooODjtable$info from '../../assets/images/overworldObjects/outlands/djtable.json?url';
import iooODjtable from '../../assets/images/overworldObjects/outlands/djtable.png?url';
import iooOExitfail$info from '../../assets/images/overworldObjects/outlands/exitfail.json?url';
import iooOExitfail from '../../assets/images/overworldObjects/outlands/exitfail.png?url';
import iooOFirecover from '../../assets/images/overworldObjects/outlands/firecover.png?url';
import iooOFireplace$info from '../../assets/images/overworldObjects/outlands/fireplace.json?url';
import iooOFireplace from '../../assets/images/overworldObjects/outlands/fireplace.png?url';
import iooOGate$info from '../../assets/images/overworldObjects/outlands/gate.json?url';
import iooOGate from '../../assets/images/overworldObjects/outlands/gate.png?url';
import iooOHalo from '../../assets/images/overworldObjects/outlands/halo.png?url';
import iooOIndicatorButton$info from '../../assets/images/overworldObjects/outlands/indicator_button.json?url';
import iooOIndicatorButton from '../../assets/images/overworldObjects/outlands/indicator_button.png?url';
import iooOMirrorBackdrop from '../../assets/images/overworldObjects/outlands/mirror_backdrop.png?url';
import iooOPaintblaster$info from '../../assets/images/overworldObjects/outlands/paintblaster.json?url';
import iooOPaintblaster from '../../assets/images/overworldObjects/outlands/paintblaster.png?url';
import iooOPan$info from '../../assets/images/overworldObjects/outlands/pan.json?url';
import iooOPan from '../../assets/images/overworldObjects/outlands/pan.png?url';
import iooOPartyOver from '../../assets/images/overworldObjects/outlands/party_over.png?url';
import iooOPie from '../../assets/images/overworldObjects/outlands/pie.png?url';
import iooOPieBowl from '../../assets/images/overworldObjects/outlands/pie_bowl.png?url';
import iooOPylon$info from '../../assets/images/overworldObjects/outlands/pylon.json?url';
import iooOPylon from '../../assets/images/overworldObjects/outlands/pylon.png?url';
import iooOQuantumpad$info from '../../assets/images/overworldObjects/outlands/quantumpad.json?url';
import iooOQuantumpad from '../../assets/images/overworldObjects/outlands/quantumpad.png?url';
import iooOSecurityField$info from '../../assets/images/overworldObjects/outlands/security_field.json?url';
import iooOSecurityField from '../../assets/images/overworldObjects/outlands/security_field.png?url';
import iooOSecurityFieldTall$info from '../../assets/images/overworldObjects/outlands/security_field_tall.json?url';
import iooOSecurityFieldTall from '../../assets/images/overworldObjects/outlands/security_field_tall.png?url';
import iooOSodaitem from '../../assets/images/overworldObjects/outlands/sodaitem.png?url';
import iooOSteakitem from '../../assets/images/overworldObjects/outlands/steakitem.png?url';
import iooOSteaktable from '../../assets/images/overworldObjects/outlands/steaktable.png?url';
import iooOSwitch$info from '../../assets/images/overworldObjects/outlands/switch.json?url';
import iooOSwitch from '../../assets/images/overworldObjects/outlands/switch.png?url';
import iooOTerminalScreen from '../../assets/images/overworldObjects/outlands/terminal_screen.png?url';
import iooOTorielAsrielDark from '../../assets/images/overworldObjects/outlands/toriel_asriel_dark.png?url';
import iooOTorielAsrielOver from '../../assets/images/overworldObjects/outlands/toriel_asriel_over.png?url';
import iooOTorielAsrielOverLight from '../../assets/images/overworldObjects/outlands/toriel_asriel_over_light.png?url';
import iooOTorielTorielChair from '../../assets/images/overworldObjects/outlands/toriel_toriel_chair.png?url';
import iooOTorielTorielPlant from '../../assets/images/overworldObjects/outlands/toriel_toriel_plant.png?url';
import iooOTorielTrash from '../../assets/images/overworldObjects/outlands/toriel_trash.png?url';
import iooOVendingMachine$info from '../../assets/images/overworldObjects/outlands/vending_machine.json?url';
import iooOVendingMachine from '../../assets/images/overworldObjects/outlands/vending_machine.png?url';
import iooSavePoint$info from '../../assets/images/overworldObjects/save_point.json?url';
import iooSavePoint from '../../assets/images/overworldObjects/save_point.png?url';
import iooSippy from '../../assets/images/overworldObjects/sippy.png?url';
import iooStagelight from '../../assets/images/overworldObjects/stagelight.png?url';
import iooStarling from '../../assets/images/overworldObjects/starling.png?url';
import iooStarlingPotted from '../../assets/images/overworldObjects/starling_potted.png?url';
import iooSBarski from '../../assets/images/overworldObjects/starton/barski.png?url';
import iooSBedcover from '../../assets/images/overworldObjects/starton/bedcover.png?url';
import iooSBiodome from '../../assets/images/overworldObjects/starton/biodome.png?url';
import iooSBonehouseTop from '../../assets/images/overworldObjects/starton/bonehouse_top.png?url';
import iooSBookdesk from '../../assets/images/overworldObjects/starton/bookdesk.png?url';
import iooSBooktable from '../../assets/images/overworldObjects/starton/booktable.png?url';
import iooSChew from '../../assets/images/overworldObjects/starton/chew.png?url';
import iooSCottonball from '../../assets/images/overworldObjects/starton/cottonball.png?url';
import iooSCottondoor from '../../assets/images/overworldObjects/starton/cottondoor.png?url';
import iooSCottonrow from '../../assets/images/overworldObjects/starton/cottonrow.png?url';
import iooSCouch from '../../assets/images/overworldObjects/starton/couch.png?url';
import iooSCrossword from '../../assets/images/overworldObjects/starton/crossword.png?url';
import iooSCtower from '../../assets/images/overworldObjects/starton/ctower.png?url';
import iooSCtowerback from '../../assets/images/overworldObjects/starton/ctowerback.png?url';
import iooSCtowerleft from '../../assets/images/overworldObjects/starton/ctowerleft.png?url';
import iooSCtowerright from '../../assets/images/overworldObjects/starton/ctowerright.png?url';
import iooSEndtable from '../../assets/images/overworldObjects/starton/endtable.png?url';
import iooSExteriorLesser from '../../assets/images/overworldObjects/starton/exterior_lesser.png?url';
import iooSExteriorLesserHead from '../../assets/images/overworldObjects/starton/exterior_lesser_head.png?url';
import iooSExteriorLesserNeck from '../../assets/images/overworldObjects/starton/exterior_lesser_neck.png?url';
import iooSFlower from '../../assets/images/overworldObjects/starton/flower.png?url';
import iooSGauntletBlaster from '../../assets/images/overworldObjects/starton/gauntlet_blaster.png?url';
import iooSGauntletCollarsword from '../../assets/images/overworldObjects/starton/gauntlet_collarsword.png?url';
import iooSGauntletDog$info from '../../assets/images/overworldObjects/starton/gauntlet_dog.json?url';
import iooSGauntletDog from '../../assets/images/overworldObjects/starton/gauntlet_dog.png?url';
import iooSGauntletFire$info from '../../assets/images/overworldObjects/starton/gauntlet_fire.json?url';
import iooSGauntletFire from '../../assets/images/overworldObjects/starton/gauntlet_fire.png?url';
import iooSGauntletTesla from '../../assets/images/overworldObjects/starton/gauntlet_tesla.png?url';
import iooSGravo from '../../assets/images/overworldObjects/starton/gravo.png?url';
import iooSHolotree from '../../assets/images/overworldObjects/starton/holotree.png?url';
import iooSInteriorBar from '../../assets/images/overworldObjects/starton/interior_bar.png?url';
import iooSInteriorBooth from '../../assets/images/overworldObjects/starton/interior_booth.png?url';
import iooSInteriorDrinks from '../../assets/images/overworldObjects/starton/interior_drinks.png?url';
import iooSInteriorLesser$info from '../../assets/images/overworldObjects/starton/interior_lesser.json?url';
import iooSInteriorLesser from '../../assets/images/overworldObjects/starton/interior_lesser.png?url';
import iooSInteriorPoker from '../../assets/images/overworldObjects/starton/interior_poker.png?url';
import iooSInteriorStool from '../../assets/images/overworldObjects/starton/interior_stool.png?url';
import iooSKetch$info from '../../assets/images/overworldObjects/starton/ketch.json?url';
import iooSKetch from '../../assets/images/overworldObjects/starton/ketch.png?url';
import iooSLamp$info from '../../assets/images/overworldObjects/starton/lamp.json?url';
import iooSLamp from '../../assets/images/overworldObjects/starton/lamp.png?url';
import iooSLasercheckpoint$info from '../../assets/images/overworldObjects/starton/lasercheckpoint.json?url';
import iooSLasercheckpoint from '../../assets/images/overworldObjects/starton/lasercheckpoint.png?url';
import iooSLasercheckpointOpen from '../../assets/images/overworldObjects/starton/lasercheckpointOpen.png?url';
import iooSLasercheckpointOpenSide from '../../assets/images/overworldObjects/starton/lasercheckpointOpenSide.png?url';
import iooSLasercheckpointOpenSide2 from '../../assets/images/overworldObjects/starton/lasercheckpointOpenSide2.png?url';
import iooSLasercheckpointSide$info from '../../assets/images/overworldObjects/starton/lasercheckpointSide.json?url';
import iooSLasercheckpointSide from '../../assets/images/overworldObjects/starton/lasercheckpointSide.png?url';
import iooSMailbox from '../../assets/images/overworldObjects/starton/mailbox.png?url';
import iooSMicrowave from '../../assets/images/overworldObjects/starton/microwave.png?url';
import iooSNoise$info from '../../assets/images/overworldObjects/starton/noise.json?url';
import iooSNoise from '../../assets/images/overworldObjects/starton/noise.png?url';
import iooSNtower from '../../assets/images/overworldObjects/starton/ntower.png?url';
import iooSPapBed$info from '../../assets/images/overworldObjects/starton/pap_bed.json?url';
import iooSPapBed from '../../assets/images/overworldObjects/starton/pap_bed.png?url';
import iooSPapBones from '../../assets/images/overworldObjects/starton/pap_bones.png?url';
import iooSPapComputer$info from '../../assets/images/overworldObjects/starton/pap_computer.json?url';
import iooSPapComputer from '../../assets/images/overworldObjects/starton/pap_computer.png?url';
import iooSPapTable from '../../assets/images/overworldObjects/starton/pap_table.png?url';
import iooSPole from '../../assets/images/overworldObjects/starton/pole.png?url';
import iooSPuzzle1$info from '../../assets/images/overworldObjects/starton/puzzle1.json?url';
import iooSPuzzle1 from '../../assets/images/overworldObjects/starton/puzzle1.png?url';
import iooSPuzzle2$info from '../../assets/images/overworldObjects/starton/puzzle2.json?url';
import iooSPuzzle2 from '../../assets/images/overworldObjects/starton/puzzle2.png?url';
import iooSPuzzle3Tile$info from '../../assets/images/overworldObjects/starton/puzzle3_tile.json?url';
import iooSPuzzle3Tile from '../../assets/images/overworldObjects/starton/puzzle3_tile.png?url';
import iooSRocktable from '../../assets/images/overworldObjects/starton/rocktable.png?url';
import iooSSansdoor from '../../assets/images/overworldObjects/starton/sansdoor.png?url';
import iooSSaucer from '../../assets/images/overworldObjects/starton/saucer.png?url';
import iooSScreenon from '../../assets/images/overworldObjects/starton/screenon.png?url';
import iooSSentry from '../../assets/images/overworldObjects/starton/sentry.png?url';
import iooSSentry2 from '../../assets/images/overworldObjects/starton/sentry2.png?url';
import iooSSentry3 from '../../assets/images/overworldObjects/starton/sentry3.png?url';
import iooSSentry4 from '../../assets/images/overworldObjects/starton/sentry4.png?url';
import iooSSign from '../../assets/images/overworldObjects/starton/sign.png?url';
import iooSSink$info from '../../assets/images/overworldObjects/starton/sink.json?url';
import iooSSink from '../../assets/images/overworldObjects/starton/sink.png?url';
import iooSSlew from '../../assets/images/overworldObjects/starton/slew.png?url';
import iooSSmallscreen from '../../assets/images/overworldObjects/starton/smallscreen.png?url';
import iooSSpaghetti$info from '../../assets/images/overworldObjects/starton/spaghetti.json?url';
import iooSSpaghetti from '../../assets/images/overworldObjects/starton/spaghetti.png?url';
import iooSSpaghettitable from '../../assets/images/overworldObjects/starton/spaghettitable.png?url';
import iooSTeleportpad from '../../assets/images/overworldObjects/starton/teleportpad.png?url';
import iooSTelescope from '../../assets/images/overworldObjects/starton/telescope.png?url';
import iooSTownBonehouse from '../../assets/images/overworldObjects/starton/town_bonehouse.png?url';
import iooSTownBonerail from '../../assets/images/overworldObjects/starton/town_bonerail.png?url';
import iooSTownCapture from '../../assets/images/overworldObjects/starton/town_capture.png?url';
import iooSTownHouse from '../../assets/images/overworldObjects/starton/town_house.png?url';
import iooSTrash from '../../assets/images/overworldObjects/starton/trash.png?url';
import iooSTrashball from '../../assets/images/overworldObjects/starton/trashball.png?url';
import iooSTreadmill$info from '../../assets/images/overworldObjects/starton/treadmill.json?url';
import iooSTreadmill from '../../assets/images/overworldObjects/starton/treadmill.png?url';
import iooSTree from '../../assets/images/overworldObjects/starton/tree.png?url';
import iooSTvOff from '../../assets/images/overworldObjects/starton/tv_off.png?url';
import iooSTvOn$info from '../../assets/images/overworldObjects/starton/tv_on.json?url';
import iooSTvOn from '../../assets/images/overworldObjects/starton/tv_on.png?url';
import iooSVendingMachine$info from '../../assets/images/overworldObjects/starton/vending_machine.json?url';
import iooSVendingMachine from '../../assets/images/overworldObjects/starton/vending_machine.png?url';
import iooSWhew from '../../assets/images/overworldObjects/starton/whew.png?url';
import iooSWidescreen from '../../assets/images/overworldObjects/starton/widescreen.png?url';
import iooSWidescreenBullet from '../../assets/images/overworldObjects/starton/widescreen_bullet.png?url';
import iooSWidescreenPlayer$info from '../../assets/images/overworldObjects/starton/widescreen_player.json?url';
import iooSWidescreenPlayer from '../../assets/images/overworldObjects/starton/widescreen_player.png?url';
import iooSWidescreenReticle$info from '../../assets/images/overworldObjects/starton/widescreen_reticle.json?url';
import iooSWidescreenReticle from '../../assets/images/overworldObjects/starton/widescreen_reticle.png?url';
import iooSYousleptinthebed from '../../assets/images/overworldObjects/starton/yousleptinthebed.png?url';
import iooTaxiOverlay$info from '../../assets/images/overworldObjects/taxi-overlay.json?url';
import iooTaxiOverlay from '../../assets/images/overworldObjects/taxi-overlay.png?url';
import iooTaxi$info from '../../assets/images/overworldObjects/taxi.json?url';
import iooTaxi from '../../assets/images/overworldObjects/taxi.png?url';
import iooToby0$info from '../../assets/images/overworldObjects/toby0.json?url';
import iooToby0 from '../../assets/images/overworldObjects/toby0.png?url';
import iooToby1$info from '../../assets/images/overworldObjects/toby1.json?url';
import iooToby1 from '../../assets/images/overworldObjects/toby1.png?url';
import iooToby2$info from '../../assets/images/overworldObjects/toby2.json?url';
import iooToby2 from '../../assets/images/overworldObjects/toby2.png?url';
import iooToby3$info from '../../assets/images/overworldObjects/toby3.json?url';
import iooToby3 from '../../assets/images/overworldObjects/toby3.png?url';
import iooToby4$info from '../../assets/images/overworldObjects/toby4.json?url';
import iooToby4 from '../../assets/images/overworldObjects/toby4.png?url';
import iooToby5$info from '../../assets/images/overworldObjects/toby5.json?url';
import iooToby5 from '../../assets/images/overworldObjects/toby5.png?url';
import iooToby6$info from '../../assets/images/overworldObjects/toby6.json?url';
import iooToby6 from '../../assets/images/overworldObjects/toby6.png?url';
import iooTrike1$info from '../../assets/images/overworldObjects/trike1.json?url';
import iooTrike1 from '../../assets/images/overworldObjects/trike1.png?url';
import iooTrike2$info from '../../assets/images/overworldObjects/trike2.json?url';
import iooTrike2 from '../../assets/images/overworldObjects/trike2.png?url';
import isBlookBackground from '../../assets/images/shops/blook/background.png?url';
import isBlookEyes$info from '../../assets/images/shops/blook/eyes.json?url';
import isBlookEyes from '../../assets/images/shops/blook/eyes.png?url';
import isBlookKeeper$info from '../../assets/images/shops/blook/keeper.json?url';
import isBlookKeeper from '../../assets/images/shops/blook/keeper.png?url';
import isBpantsArms from '../../assets/images/shops/bpants/arms.png?url';
import isBpantsBackground from '../../assets/images/shops/bpants/background.png?url';
import isBpantsCloud$info from '../../assets/images/shops/bpants/cloud.json?url';
import isBpantsCloud from '../../assets/images/shops/bpants/cloud.png?url';
import isBpantsKeeper$info from '../../assets/images/shops/bpants/keeper.json?url';
import isBpantsKeeper from '../../assets/images/shops/bpants/keeper.png?url';
import isGossipArm1$info from '../../assets/images/shops/gossip/arm1.json?url';
import isGossipArm1 from '../../assets/images/shops/gossip/arm1.png?url';
import isGossipArm2 from '../../assets/images/shops/gossip/arm2.png?url';
import isGossipBackground from '../../assets/images/shops/gossip/background.png?url';
import isGossipKeeper1$info from '../../assets/images/shops/gossip/keeper1.json?url';
import isGossipKeeper1 from '../../assets/images/shops/gossip/keeper1.png?url';
import isGossipKeeper2$info from '../../assets/images/shops/gossip/keeper2.json?url';
import isGossipKeeper2 from '../../assets/images/shops/gossip/keeper2.png?url';
import isHareBackground from '../../assets/images/shops/hare/background.png?url';
import isHareKeeper$info from '../../assets/images/shops/hare/keeper.json?url';
import isHareKeeper from '../../assets/images/shops/hare/keeper.png?url';
import isTemBackground from '../../assets/images/shops/tem/background.png?url';
import isTemBody from '../../assets/images/shops/tem/body.png?url';
import isTemCoffee$info from '../../assets/images/shops/tem/coffee.json?url';
import isTemCoffee from '../../assets/images/shops/tem/coffee.png?url';
import isTemEyebrows from '../../assets/images/shops/tem/eyebrows.png?url';
import isTemEyes1$info from '../../assets/images/shops/tem/eyes1.json?url';
import isTemEyes1 from '../../assets/images/shops/tem/eyes1.png?url';
import isTemEyes2 from '../../assets/images/shops/tem/eyes2.png?url';
import isTemEyes3 from '../../assets/images/shops/tem/eyes3.png?url';
import isTemEyes4 from '../../assets/images/shops/tem/eyes4.png?url';
import isTemEyes5 from '../../assets/images/shops/tem/eyes5.png?url';
import isTemEyes6 from '../../assets/images/shops/tem/eyes6.png?url';
import isTemHat from '../../assets/images/shops/tem/hat.png?url';
import isTemMouth1$info from '../../assets/images/shops/tem/mouth1.json?url';
import isTemMouth1 from '../../assets/images/shops/tem/mouth1.png?url';
import isTemMouth2$info from '../../assets/images/shops/tem/mouth2.json?url';
import isTemMouth2 from '../../assets/images/shops/tem/mouth2.png?url';
import isTemMouth3 from '../../assets/images/shops/tem/mouth3.png?url';
import isTemMouth4$info from '../../assets/images/shops/tem/mouth4.json?url';
import isTemMouth4 from '../../assets/images/shops/tem/mouth4.png?url';
import isTemSweat from '../../assets/images/shops/tem/sweat.png?url';
import isTortoiseArm from '../../assets/images/shops/tortoise/arm.png?url';
import isTortoiseBackground from '../../assets/images/shops/tortoise/background.png?url';
import isTortoiseBody from '../../assets/images/shops/tortoise/body.png?url';
import isTortoiseKeeper$info from '../../assets/images/shops/tortoise/keeper.json?url';
import isTortoiseKeeper from '../../assets/images/shops/tortoise/keeper.png?url';
import { levels } from './levels';

export const ratio01 = 0x55 / 0xff;
export const ratio02 = 0x75 / 0xff;

export const contrast = (red: number, green: number, blue: number, alpha: number): CosmosColor => [
   CosmosMath.bezier(red / 255, 0, 0, 255, 255),
   CosmosMath.bezier(green / 255, 0, 0, 255, 255),
   CosmosMath.bezier(blue / 255, 0, 0, 255, 255),
   alpha
];

export const dark01 = (red: number, green: number, blue: number, alpha: number) =>
   [ red * ratio01, green * ratio01, blue * ratio01, alpha ] as CosmosColor;

export const dark02 = (red: number, green: number, blue: number, alpha: number) =>
   [ red * ratio02, green * ratio02, blue * ratio02, alpha ] as CosmosColor;

export const asrielTrueColorFilter = (red: number, g: number, b: number, alpha: number) =>
   red === 0 || red === 255 || alpha === 0 ? null : ([ 0, 0, 0, 1 ] as CosmosColor);

export const fontTransformer = (value: string): CosmosFontInfo => {
   const array = value
      .split('\n')
      .filter(a => a !== '')
      .map(a => a.split(';').map(b => +b));
   return {
      size: array[0][0],
      shift_x: array[0][1],
      shift_y: array[0][2],
      height: array[0][3],
      glyphs: Object.fromEntries(array.slice(1).map(ent => [ ent[0], ent.slice(1) ] as [number, number[]]))
   };
};

export const vert_standard = `// pixijs builtins
attribute vec2 aVertexPosition;
uniform mat3 projectionMatrix;
varying vec2 vTextureCoord;
uniform vec4 inputSize;
uniform vec4 outputFrame;

// shared frame values
varying float ox;
varying float oy;
varying float oz;
varying float ow;

// default pixel handling (dont change this)
vec4 filterVertexPosition (void) {
   vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;
   return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
}

// default pixel handling (dont change this)
vec2 filterTextureCoord (void) {
   return aVertexPosition * (outputFrame.zw * inputSize.zw);
}

void main (void) {
   // default pixel handling (dont change this)
   gl_Position = filterVertexPosition();
   vTextureCoord = filterTextureCoord();

   // update frame values
   ox = outputFrame.x;
   oy = outputFrame.y;
   oz = outputFrame.z;
   ow = outputFrame.w;
}`;

export const content = {
   amAerialis: new CosmosAudio(amAerialis),
   amAerialisArchive: new CosmosAudio(amAerialisArchive),
   amAerialisEmpty: new CosmosAudio(amAerialisEmpty),
   amAmalgam: new CosmosAudio(amAmalgam),
   amApproach: new CosmosAudio(amApproach),
   amArchive: new CosmosAudio(amArchive),
   amArms: new CosmosAudio(amArms),
   amArmsIntro: new CosmosAudio(amArmsIntro),
   amAsgore: new CosmosAudio(amAsgore),
   amAsrielboss: new CosmosAudio(amAsrielboss),
   amBarrier: new CosmosAudio(amBarrier),
   amBattle1: new CosmosAudio(amBattle1),
   amBattle2: new CosmosAudio(amBattle2),
   amBattle3: new CosmosAudio(amBattle3),
   amBlookShop: new CosmosAudio(amBlookShop),
   amChara: new CosmosAudio(amChara),
   amCharacutscene: new CosmosAudio(amCharacutscene),
   amCharafinal: new CosmosAudio(amCharafinal),
   amChoice: new CosmosAudio(amChoice),
   amConfession: new CosmosAudio(amConfession),
   amCore: new CosmosAudio(amCore),
   amCredits1: new CosmosAudio(amCredits1),
   amCredits2: new CosmosAudio(amCredits2),
   amCredits3: new CosmosAudio(amCredits3),
   amDatingfight: new CosmosAudio(amDatingfight),
   amDatingstart: new CosmosAudio(amDatingstart),
   amDatingtense: new CosmosAudio(amDatingtense),
   amDespair: new CosmosAudio(amDespair),
   amDespair2: new CosmosAudio(amDespair2),
   amDjbeat: new CosmosAudio(amDjbeat),
   amDjbeatLoop: new CosmosAudio(amDjbeatLoop),
   amDogbass: new CosmosAudio(amDogbass),
   amDogbeat: new CosmosAudio(amDogbeat),
   amDogdance: new CosmosAudio(amDogdance),
   amDogebattle: new CosmosAudio(amDogebattle),
   amDogerelax: new CosmosAudio(amDogerelax),
   amDogfreedom: new CosmosAudio(amDogfreedom),
   amDogsigh: new CosmosAudio(amDogsigh),
   amDogsong: new CosmosAudio(amDogsong),
   amDontgiveup: new CosmosAudio(amDontgiveup),
   amDrone: new CosmosAudio(amDrone),
   amDummyboss: new CosmosAudio(amDummyboss),
   amEmotion: new CosmosAudio(amEmotion),
   amEnding: new CosmosAudio(amEnding),
   amEndingexcerpt: new CosmosAudio(amEndingexcerpt),
   amEndofdays: new CosmosAudio(amEndofdays),
   amFactory: new CosmosAudio(amFactory),
   amFactoryArchive: new CosmosAudio(amFactoryArchive),
   amFactoryEmpty: new CosmosAudio(amFactoryEmpty),
   amFactoryquiet: new CosmosAudio(amFactoryquiet),
   amFactoryquietArchive: new CosmosAudio(amFactoryquietArchive),
   amFactoryquietEmpty: new CosmosAudio(amFactoryquietEmpty),
   amFinalpower: new CosmosAudio(amFinalpower),
   amFlowey: new CosmosAudio(amFlowey),
   amForthefans: new CosmosAudio(amForthefans),
   amGalactomania: new CosmosAudio(amGalactomania),
   amGalactomaniaFinal: new CosmosAudio(amGalactomaniaFinal),
   amGalactomaniaQuiet: new CosmosAudio(amGalactomaniaQuiet),
   amGameover: new CosmosAudio(amGameover),
   amGameshow: new CosmosAudio(amGameshow),
   amGenerator: new CosmosAudio(amGenerator),
   amGhostbattle: new CosmosAudio(amGhostbattle),
   amGloves: new CosmosAudio(amGloves),
   amGlovesFinal: new CosmosAudio(amGlovesFinal),
   amGlovesIntro: new CosmosAudio(amGlovesIntro),
   amGrandfinale: new CosmosAudio(amGrandfinale),
   amHome: new CosmosAudio(amHome),
   amHomeAlt: new CosmosAudio(amHomeAlt),
   amIdiot: new CosmosAudio(amIdiot),
   amKnightknightSting: new CosmosAudio(amKnightknightSting),
   amLab: new CosmosAudio(amLab),
   amLegs: new CosmosAudio(amLegs),
   amLegsIntro: new CosmosAudio(amLegsIntro),
   amLetsflyajetpackwhydontwe: new CosmosAudio(amLetsflyajetpackwhydontwe),
   amLetsmakeabombwhydontwe: new CosmosAudio(amLetsmakeabombwhydontwe),
   amMadjickSting: new CosmosAudio(amMadjickSting),
   amMall: new CosmosAudio(amMall),
   amMemory: new CosmosAudio(amMemory),
   amMenu0: new CosmosAudio(amMenu0),
   amMenu1: new CosmosAudio(amMenu1),
   amMenu2: new CosmosAudio(amMenu2),
   amMenu3: new CosmosAudio(amMenu3),
   amMenu4: new CosmosAudio(amMenu4),
   amMettsuspense: new CosmosAudio(amMettsuspense),
   amMuscle: new CosmosAudio(amMuscle),
   amMushroomdance: new CosmosAudio(amMushroomdance),
   amNapstachords: new CosmosAudio(amNapstachords),
   amNapstahouse: new CosmosAudio(amNapstahouse),
   amNewworld: new CosmosAudio(amNewworld),
   amOhmy: new CosmosAudio(amOhmy),
   amOpera: new CosmosAudio(amOpera),
   amOperaAlt: new CosmosAudio(amOperaAlt),
   amOutertale: new CosmosAudio(amOutertale),
   amOutlands: new CosmosAudio(amOutlands),
   amOutlandsArchive: new CosmosAudio(amOutlandsArchive),
   amPapyrus: new CosmosAudio(amPapyrus),
   amPapyrusboss: new CosmosAudio(amPapyrusboss),
   amPrebattle: new CosmosAudio(amPrebattle),
   amPredummy: new CosmosAudio(amPredummy),
   amPreshock: new CosmosAudio(amPreshock),
   amRadiosong: new CosmosAudio(amRadiosong),
   amRedacted: new CosmosAudio(amRedacted),
   amReunited: new CosmosAudio(amReunited),
   amRise: new CosmosAudio(amRise),
   amSansboss: new CosmosAudio(amSansboss),
   amSansdate: new CosmosAudio(amSansdate),
   amSaved: new CosmosAudio(amSaved),
   amSavetheworld: new CosmosAudio(amSavetheworld),
   amScramble: new CosmosAudio(amScramble),
   amSecretsong: new CosmosAudio(amSecretsong),
   amSecretsongLoop: new CosmosAudio(amSecretsongLoop),
   amSexyrectangle: new CosmosAudio(amSexyrectangle),
   amShock: new CosmosAudio(amShock),
   amShop: new CosmosAudio(amShop),
   amSng1: new CosmosAudio(amSng1),
   amSng2: new CosmosAudio(amSng2),
   amSng3: new CosmosAudio(amSng3),
   amSng4: new CosmosAudio(amSng4),
   amSng5: new CosmosAudio(amSng5),
   amSng6: new CosmosAudio(amSng6),
   amSng7: new CosmosAudio(amSng7),
   amSng8: new CosmosAudio(amSng8),
   amSng9: new CosmosAudio(amSng9),
   amSng10: new CosmosAudio(amSng10),
   amSng11: new CosmosAudio(amSng11),
   amSng12: new CosmosAudio(amSng12),
   amSng13: new CosmosAudio(amSng13),
   amSpecatk: new CosmosAudio(amSpecatk),
   amSpiderboss: new CosmosAudio(amSpiderboss),
   amSpiderrelax: new CosmosAudio(amSpiderrelax),
   amSplendor: new CosmosAudio(amSplendor),
   amSpooktune: new CosmosAudio(amSpooktune),
   amSpookwaltz: new CosmosAudio(amSpookwaltz),
   amSpookwave: new CosmosAudio(amSpookwave),
   amSpookydate: new CosmosAudio(amSpookydate),
   amStarton: new CosmosAudio(amStarton),
   amStartonArchive: new CosmosAudio(amStartonArchive),
   amStartonEmpty: new CosmosAudio(amStartonEmpty),
   amStartonTown: new CosmosAudio(amStartonTown),
   amStartonTownEmpty: new CosmosAudio(amStartonTownEmpty),
   amStory: new CosmosAudio(amStory),
   amTemmie: new CosmosAudio(amTemmie),
   amTemShop: new CosmosAudio(amTemShop),
   amTension: new CosmosAudio(amTension),
   amTerror: new CosmosAudio(amTerror),
   amTheend: new CosmosAudio(amTheend),
   amThriftShop: new CosmosAudio(amThriftShop),
   amThundersnail: new CosmosAudio(amThundersnail),
   amToriel: new CosmosAudio(amToriel),
   amTorielboss: new CosmosAudio(amTorielboss),
   amUndyne: new CosmosAudio(amUndyne),
   amUndyneboss: new CosmosAudio(amUndyneboss),
   amUndynefast: new CosmosAudio(amUndynefast),
   amUndynegeno: new CosmosAudio(amUndynegeno),
   amUndynegenoFinal: new CosmosAudio(amUndynegenoFinal),
   amUndynegenoStart: new CosmosAudio(amUndynegenoStart),
   amUndynehelmet: new CosmosAudio(amUndynehelmet),
   amUndynepiano: new CosmosAudio(amUndynepiano),
   amUndynepre: new CosmosAudio(amUndynepre),
   amUndynepreboss: new CosmosAudio(amUndynepreboss),
   amUndynepregeno: new CosmosAudio(amUndynepregeno),
   amUwa: new CosmosAudio(amUwa),
   amWrongenemy: new CosmosAudio(amWrongenemy),
   amYouscreweduppal: new CosmosAudio(amYouscreweduppal),
   asAbreak1: new CosmosAudio(asAbreak1),
   asAbreak2: new CosmosAudio(asAbreak2),
   asAlphysfix: new CosmosAudio(asAlphysfix),
   asAppear: new CosmosAudio(asAppear),
   asApplause: new CosmosAudio(asApplause),
   asArrow: new CosmosAudio(asArrow),
   asAsrielSparkle: new CosmosAudio(asAsrielSparkle),
   asBad: new CosmosAudio(asBad),
   asBahbye: new CosmosAudio(asBahbye),
   asBark: new CosmosAudio(asBark),
   asBattlefall: new CosmosAudio(asBattlefall),
   asBell: new CosmosAudio(asBell),
   asBirds: new CosmosAudio(asBirds),
   asBoing: new CosmosAudio(asBoing),
   asBomb: new CosmosAudio(asBomb),
   asBombfall: new CosmosAudio(asBombfall),
   asBookspin: new CosmosAudio(asBookspin),
   asBoom: new CosmosAudio(asBoom),
   asBreak: new CosmosAudio(asBreak),
   asBuhbuhbuhdaadodaa: new CosmosAudio(asBuhbuhbuhdaadodaa),
   asBurst: new CosmosAudio(asBurst),
   asCackle: new CosmosAudio(asCackle),
   asCast: new CosmosAudio(asCast),
   asClap: new CosmosAudio(asClap),
   asComputer: new CosmosAudio(asComputer),
   asCrickets: new CosmosAudio(asCrickets),
   asCrit: new CosmosAudio(asCrit),
   asCymbal: new CosmosAudio(asCymbal),
   asDeeploop2: new CosmosAudio(asDeeploop2),
   asDephase: new CosmosAudio(asDephase),
   asDepower: new CosmosAudio(asDepower),
   asDestroyed: new CosmosAudio(asDestroyed),
   asDimbox: new CosmosAudio(asDimbox),
   asDog: new CosmosAudio(asDog),
   asDogsword: new CosmosAudio(asDogsword),
   asDoor: new CosmosAudio(asDoor),
   asDoorClose: new CosmosAudio(asDoorClose),
   asDrumroll: new CosmosAudio(asDrumroll),
   asDununnn: new CosmosAudio(asDununnn),
   asElectrodoor: new CosmosAudio(asElectrodoor),
   asElectropulsar: new CosmosAudio(asElectropulsar),
   asElectropulse: new CosmosAudio(asElectropulse),
   asElevator: new CosmosAudio(asElevator),
   asEpiphany: new CosmosAudio(asEpiphany),
   asEquip: new CosmosAudio(asEquip),
   asFear: new CosmosAudio(asFear),
   asFrypan: new CosmosAudio(asFrypan),
   asGlassbreak: new CosmosAudio(asGlassbreak),
   asGonerCharge: new CosmosAudio(asGonerCharge),
   asGoodbye: new CosmosAudio(asGoodbye),
   asGrab: new CosmosAudio(asGrab),
   asGunshot: new CosmosAudio(asGunshot),
   asHeal: new CosmosAudio(asHeal),
   asHeartshot: new CosmosAudio(asHeartshot),
   asHero: new CosmosAudio(asHero),
   asHit: new CosmosAudio(asHit),
   asHurt: new CosmosAudio(asHurt),
   asImpact: new CosmosAudio(asImpact),
   asIndicator: new CosmosAudio(asIndicator),
   asJetpack: new CosmosAudio(asJetpack),
   asJudgement: new CosmosAudio(asJudgement),
   asKick: new CosmosAudio(asKick),
   asKnock: new CosmosAudio(asKnock),
   asLanding: new CosmosAudio(asLanding),
   asLightningstrike: new CosmosAudio(asLightningstrike),
   asLongElevator: new CosmosAudio(asLongElevator),
   asLove: new CosmosAudio(asLove),
   asMenu: new CosmosAudio(asMenu),
   asMeow: new CosmosAudio(asMeow),
   asMetapproach: new CosmosAudio(asMetapproach),
   asMonsterHurt1: new CosmosAudio(asMonsterHurt1),
   asMonsterHurt2: new CosmosAudio(asMonsterHurt2),
   asMultitarget: new CosmosAudio(asMultitarget),
   asMusMtYeah: new CosmosAudio(asMusMtYeah),
   asMusOhyes: new CosmosAudio(asMusOhyes),
   asNode: new CosmosAudio(asNode),
   asNoise: new CosmosAudio(asNoise),
   asNote: new CosmosAudio(asNote),
   asNotify: new CosmosAudio(asNotify),
   asOops: new CosmosAudio(asOops),
   asOrchhit: new CosmosAudio(asOrchhit),
   asPathway: new CosmosAudio(asPathway),
   asPhase: new CosmosAudio(asPhase),
   asPhone: new CosmosAudio(asPhone),
   asPrebomb: new CosmosAudio(asPrebomb),
   asPunch1: new CosmosAudio(asPunch1),
   asPunch2: new CosmosAudio(asPunch2),
   asPurchase: new CosmosAudio(asPurchase),
   asQuickelectroshock: new CosmosAudio(asQuickelectroshock),
   asRain: new CosmosAudio(asRain),
   asRainbowbeam: new CosmosAudio(asRainbowbeam),
   asRetract: new CosmosAudio(asRetract),
   asRimshot: new CosmosAudio(asRimshot),
   asRotate: new CosmosAudio(asRotate),
   asRun: new CosmosAudio(asRun),
   asRustle: new CosmosAudio(asRustle),
   asSaber3: new CosmosAudio(asSaber3),
   asSave: new CosmosAudio(asSave),
   asSavior: new CosmosAudio(asSavior),
   asSega: new CosmosAudio(asSega),
   asSelect: new CosmosAudio(asSelect),
   asShake: new CosmosAudio(asShake),
   asShatter: new CosmosAudio(asShatter),
   asShock: new CosmosAudio(asShock),
   asSigstar2: new CosmosAudio(asSigstar2),
   asSingBad1: new CosmosAudio(asSingBad1),
   asSingBad2: new CosmosAudio(asSingBad2),
   asSingBad3: new CosmosAudio(asSingBad3),
   asSingBass1: new CosmosAudio(asSingBass1),
   asSingBass2: new CosmosAudio(asSingBass2),
   asSingTreble1: new CosmosAudio(asSingTreble1),
   asSingTreble2: new CosmosAudio(asSingTreble2),
   asSingTreble3: new CosmosAudio(asSingTreble3),
   asSingTreble4: new CosmosAudio(asSingTreble4),
   asSingTreble5: new CosmosAudio(asSingTreble5),
   asSingTreble6: new CosmosAudio(asSingTreble6),
   asSlidewhistle: new CosmosAudio(asSlidewhistle),
   asSparkle: new CosmosAudio(asSparkle),
   asSpecin: new CosmosAudio(asSpecin),
   asSpecout: new CosmosAudio(asSpecout),
   asSpeed: new CosmosAudio(asSpeed),
   asSpiderLaugh: new CosmosAudio(asSpiderLaugh),
   asSplash: new CosmosAudio(asSplash),
   asSpooky: new CosmosAudio(asSpooky),
   asSqueak: new CosmosAudio(asSqueak),
   asStab: new CosmosAudio(asStab),
   asStarfall: new CosmosAudio(asStarfall),
   asStatic: new CosmosAudio(asStatic),
   asStep: new CosmosAudio(asStep),
   asStomp: new CosmosAudio(asStomp),
   asStrike: new CosmosAudio(asStrike),
   asSuperstrike: new CosmosAudio(asSuperstrike),
   asSwallow: new CosmosAudio(asSwallow),
   asSwing: new CosmosAudio(asSwing),
   asSwipe: new CosmosAudio(asSwipe),
   asSwitch: new CosmosAudio(asSwitch),
   asSword: new CosmosAudio(asSword),
   asTarget: new CosmosAudio(asTarget),
   asTextnoise: new CosmosAudio(asTextnoise),
   asTrombone: new CosmosAudio(asTrombone),
   asTv: new CosmosAudio(asTv),
   asTwinklyHurt: new CosmosAudio(asTwinklyHurt),
   asTwinklyLaugh: new CosmosAudio(asTwinklyLaugh),
   asUpgrade: new CosmosAudio(asUpgrade),
   asWarpIn: new CosmosAudio(asWarpIn),
   asWarpOut: new CosmosAudio(asWarpOut),
   asWarpSpeed: new CosmosAudio(asWarpSpeed),
   asWhimper: new CosmosAudio(asWhimper),
   asWhipcrack: new CosmosAudio(asWhipcrack),
   asWhoopee: new CosmosAudio(asWhoopee),
   asWind: new CosmosAudio(asWind),
   avAlphys: new CosmosAudio(avAlphys),
   avAsgore: new CosmosAudio(avAsgore),
   avAsriel: new CosmosAudio(avAsriel),
   avAsriel2: new CosmosAudio(avAsriel2),
   avAsriel3: new CosmosAudio(avAsriel3),
   avAsriel4: new CosmosAudio(avAsriel4),
   avKidd: new CosmosAudio(avKidd),
   avMettaton1: new CosmosAudio(avMettaton1),
   avMettaton2: new CosmosAudio(avMettaton2),
   avMettaton3: new CosmosAudio(avMettaton3),
   avMettaton4: new CosmosAudio(avMettaton4),
   avMettaton5: new CosmosAudio(avMettaton5),
   avMettaton6: new CosmosAudio(avMettaton6),
   avMettaton7: new CosmosAudio(avMettaton7),
   avMettaton8: new CosmosAudio(avMettaton8),
   avNapstablook: new CosmosAudio(avNapstablook),
   avNarrator: new CosmosAudio(avNarrator),
   avPapyrus: new CosmosAudio(avPapyrus),
   avSans: new CosmosAudio(avSans),
   avSoriel: new CosmosAudio(avSoriel),
   avStoryteller: new CosmosAudio(avStoryteller),
   avTem1: new CosmosAudio(avTem1),
   avTem2: new CosmosAudio(avTem2),
   avTem3: new CosmosAudio(avTem3),
   avTem4: new CosmosAudio(avTem4),
   avTem5: new CosmosAudio(avTem5),
   avTem6: new CosmosAudio(avTem6),
   avToriel: new CosmosAudio(avToriel),
   avTwinkly1: new CosmosAudio(avTwinkly1),
   avTwinkly2: new CosmosAudio(avTwinkly2),
   avUndyne: new CosmosAudio(avUndyne),
   avUndyneex: new CosmosAudio(avUndyneex),
   fComicSans: new CosmosFont(
      new CosmosImage(sources.fComicSans),
      new CosmosStringData(sources.fComicSans$info, fontTransformer)
   ),
   fCryptOfTomorrow: new CosmosFont(
      new CosmosImage(sources.fCryptOfTomorrow),
      new CosmosStringData(sources.fCryptOfTomorrow$info, fontTransformer)
   ),
   fDeterminationMono: new CosmosFont(
      new CosmosImage(sources.fDeterminationMono),
      new CosmosStringData(sources.fDeterminationMono$info, fontTransformer)
   ),
   fDeterminationSans: new CosmosFont(
      new CosmosImage(sources.fDeterminationSans),
      new CosmosStringData(sources.fDeterminationSans$info, fontTransformer)
   ),
   fDiaryOfAn8BitMage: new CosmosFont(
      new CosmosImage(sources.fDiaryOfAn8BitMage),
      new CosmosStringData(sources.fDiaryOfAn8BitMage$info, fontTransformer)
   ),
   fDotumChe: new CosmosFont(
      new CosmosImage(sources.fDotumChe),
      new CosmosStringData(sources.fDotumChe$info, fontTransformer)
   ),
   fMarsNeedsCunnilingus: new CosmosFont(
      new CosmosImage(sources.fMarsNeedsCunnilingus),
      new CosmosStringData(sources.fMarsNeedsCunnilingus$info, fontTransformer)
   ),
   fPapyrus: new CosmosFont(
      new CosmosImage(sources.fPapyrus),
      new CosmosStringData(sources.fPapyrus$info, fontTransformer)
   ),
   ibbArccircle: new CosmosImage(ibbArccircle),
   ibbArmBullet: new CosmosAnimationResources(
      new CosmosImage(ibbArmBullet, (red, green, blue, alpha, x, y) => [ red, green, blue, alpha * Math.min(y / 25, 1) ]),
      new CosmosData(ibbArmBullet$info)
   ),
   ibbArrow: new CosmosAnimationResources(new CosmosImage(ibbArrow), new CosmosData(ibbArrow$info)),
   ibbArrowportal: new CosmosAnimationResources(new CosmosImage(ibbArrowportal), new CosmosData(ibbArrowportal$info)),
   ibbAsteroid: new CosmosAnimationResources(new CosmosImage(ibbAsteroid), new CosmosData(ibbAsteroid$info)),
   ibbAsteroidfragment: new CosmosAnimationResources(
      new CosmosImage(ibbAsteroidfragment),
      new CosmosData(ibbAsteroidfragment$info)
   ),
   ibbAwesomesword: new CosmosImage(ibbAwesomesword),
   ibbAx: new CosmosAnimationResources(new CosmosImage(ibbAx), new CosmosData(ibbAx$info)),
   ibbBark: new CosmosImage(sources.ibbBark),
   ibbBeaker1: new CosmosAnimationResources(new CosmosImage(ibbBeaker1), new CosmosData(ibbBeaker1$info)),
   ibbBeaker2: new CosmosAnimationResources(new CosmosImage(ibbBeaker2), new CosmosData(ibbBeaker2$info)),
   ibbBeaker3: new CosmosAnimationResources(new CosmosImage(ibbBeaker3), new CosmosData(ibbBeaker3$info)),
   ibbBeamcircle: new CosmosImage(ibbBeamcircle),
   ibbBeamstrip: new CosmosImage(ibbBeamstrip),
   ibbBigblaster: new CosmosImage(ibbBigblaster),
   ibbBigbolt: new CosmosAnimationResources(new CosmosImage(ibbBigbolt), new CosmosData(ibbBigbolt$info)),
   ibbBird: new CosmosAnimationResources(new CosmosImage(ibbBird), new CosmosData(ibbBird$info)),
   ibbBirdfront: new CosmosAnimationResources(new CosmosImage(ibbBirdfront), new CosmosData(ibbBirdfront$info)),
   ibbBlastship: new CosmosImage(ibbBlastship),
   ibbBlimpstrat: new CosmosAnimationResources(
      new CosmosImage(sources.ibbBlimpstrat),
      new CosmosData(sources.ibbBlimpstrat$info)
   ),
   ibbBluelightning: new CosmosAnimationResources(
      new CosmosImage(ibbBluelightning),
      new CosmosData(ibbBluelightning$info)
   ),
   ibbBomb: new CosmosAnimationResources(new CosmosImage(ibbBomb), new CosmosData(ibbBomb$info)),
   ibbBone: new CosmosAnimationResources(new CosmosImage(ibbBone), new CosmosData(ibbBone$info)),
   ibbBonesection: new CosmosImage(ibbBonesection),
   ibbBoombox: new CosmosImage(ibbBoombox),
   ibbBoomboxRing: new CosmosImage(ibbBoomboxRing),
   ibbBoxBullet: new CosmosImage(ibbBoxBullet),
   ibbBoxBulletSplode: new CosmosImage(ibbBoxBulletSplode),
   ibbBoxBulletUp: new CosmosImage(ibbBoxBulletUp),
   ibbBuzzlightning: new CosmosAnimationResources(
      new CosmosImage(ibbBuzzlightning),
      new CosmosData(ibbBuzzlightning$info)
   ),
   ibbBuzzpillar: new CosmosAnimationResources(new CosmosImage(ibbBuzzpillar), new CosmosData(ibbBuzzpillar$info)),
   ibbCheese: new CosmosImage(ibbCheese),
   ibbCircle1: new CosmosImage(ibbCircle1),
   ibbCircle2: new CosmosImage(ibbCircle2),
   ibbCircle3: new CosmosImage(ibbCircle3),
   ibbCircle4: new CosmosImage(ibbCircle4),
   ibbCirclestar: new CosmosImage(ibbCirclestar),
   ibbCrosshair: new CosmosImage(ibbCrosshair),
   ibbCrossiant: new CosmosImage(ibbCrossiant),
   ibbCrossiantOutline: new CosmosImage(ibbCrossiantOutline),
   ibbCupcake: new CosmosImage(ibbCupcake),
   ibbCupcakeAttack: new CosmosAnimationResources(
      new CosmosImage(ibbCupcakeAttack),
      new CosmosData(ibbCupcakeAttack$info)
   ),
   ibbDonut: new CosmosImage(ibbDonut),
   ibbDonutOutline: new CosmosImage(ibbDonutOutline),
   ibbDummy: new CosmosAnimationResources(new CosmosImage(ibbDummy), new CosmosData(ibbDummy$info)),
   ibbDummyknife: new CosmosImage(ibbDummyknife),
   ibbExBombBlastCore: new CosmosAnimationResources(
      new CosmosImage(ibbExBombBlastCore),
      new CosmosData(ibbExBombBlastCore$info)
   ),
   ibbExBombBlastRay: new CosmosAnimationResources(
      new CosmosImage(ibbExBombBlastRay),
      new CosmosData(ibbExBombBlastRay$info)
   ),
   ibbExHeart: new CosmosAnimationResources(new CosmosImage(ibbExHeart), new CosmosData(ibbExHeart$info)),
   ibbExKiss: new CosmosImage(ibbExKiss),
   ibbExplosion: new CosmosImage(ibbExplosion),
   ibbExShine: new CosmosAnimationResources(new CosmosImage(ibbExShine), new CosmosData(ibbExShine$info)),
   ibbExTiny1: new CosmosAnimationResources(new CosmosImage(ibbExTiny1), new CosmosData(ibbExTiny1$info)),
   ibbExTiny2: new CosmosAnimationResources(new CosmosImage(ibbExTiny2), new CosmosData(ibbExTiny2$info)),
   ibbExTiny3: new CosmosAnimationResources(new CosmosImage(ibbExTiny3), new CosmosData(ibbExTiny3$info)),
   ibbEyecone: new CosmosImage(ibbEyecone),
   ibbFadeline: new CosmosImage(ibbFadeline),
   ibbFalchion: new CosmosImage(ibbFalchion),
   ibbFeather: new CosmosImage(ibbFeather),
   ibbFirebol: new CosmosAnimationResources(new CosmosImage(ibbFirebol), new CosmosData(ibbFirebol$info)),
   ibbFirework: new CosmosAnimationResources(new CosmosImage(ibbFirework), new CosmosData(ibbFirework$info)),
   ibbFrisbee: new CosmosAnimationResources(new CosmosImage(ibbFrisbee), new CosmosData(ibbFrisbee$info)),
   ibbFrogfly: new CosmosAnimationResources(new CosmosImage(ibbFrogfly), new CosmosData(ibbFrogfly$info)),
   ibbFroglegs: new CosmosImage(ibbFroglegs),
   ibbFrogstar: new CosmosAnimationResources(new CosmosImage(ibbFrogstar), new CosmosData(ibbFrogstar$info)),
   ibbFrogstop: new CosmosImage(ibbFrogstop),
   ibbGalaxystar: new CosmosImage(ibbGalaxystar),
   ibbGelatin: new CosmosImage(ibbGelatin),
   ibbGelatslab: new CosmosImage(ibbGelatslab),
   ibbGlitter: new CosmosAnimationResources(new CosmosImage(ibbGlitter), new CosmosData(ibbGlitter$info)),
   ibbGunarm: new CosmosImage(ibbGunarm),
   ibbHarknessbac: new CosmosImage(ibbHarknessbac),
   ibbHarknessgun: new CosmosAnimationResources(new CosmosImage(ibbHarknessgun), new CosmosData(ibbHarknessgun$info)),
   ibbHat: new CosmosImage(ibbHat),
   ibbHaymaker: new CosmosImage(ibbHaymaker),
   ibbHeadset: new CosmosImage(ibbHeadset),
   ibbHeart: new CosmosAnimationResources(new CosmosImage(ibbHeart), new CosmosData(ibbHeart$info)),
   ibbHinge: new CosmosAnimationResources(new CosmosImage(ibbHinge), new CosmosData(ibbHinge$info)),
   ibbHypergrid: new CosmosImage(ibbHypergrid),
   ibbHypno: new CosmosAnimationResources(new CosmosImage(ibbHypno), new CosmosData(ibbHypno$info)),
   ibbLabber1: new CosmosImage(ibbLabber1),
   ibbLabber1Outline: new CosmosImage(ibbLabber1Outline),
   ibbLabber2: new CosmosImage(ibbLabber2),
   ibbLabber2Outline: new CosmosImage(ibbLabber2Outline),
   ibbLabber3: new CosmosAnimationResources(new CosmosImage(ibbLabber3), new CosmosData(ibbLabber3$info)),
   ibbLabber3Yellow: new CosmosAnimationResources(
      new CosmosImage(ibbLabber3Yellow),
      new CosmosData(ibbLabber3Yellow$info)
   ),
   ibbLaserEmitter: new CosmosImage(ibbLaserEmitter),
   ibbLegBullet: new CosmosImage(ibbLegBullet, (red, green, blue, alpha, x, y) => [
      red,
      green,
      blue,
      alpha * Math.min(y / 50, 1)
   ]),
   ibbLegendarysword: new CosmosImage(ibbLegendarysword),
   ibbLightning: new CosmosAnimationResources(new CosmosImage(ibbLightning), new CosmosData(ibbLightning$info)),
   ibbLightningEmitter: new CosmosAnimationResources(
      new CosmosImage(ibbLightningEmitter),
      new CosmosData(ibbLightningEmitter$info)
   ),
   ibbLily: new CosmosImage(ibbLily),
   ibbLinecarrier: new CosmosImage(ibbLinecarrier),
   ibbLiteralBullet: new CosmosImage(ibbLiteralBullet),
   ibbLithium: new CosmosAnimationResources(new CosmosImage(ibbLithium), new CosmosData(ibbLithium$info)),
   ibBlue: new CosmosAnimationResources(new CosmosImage(ibBlue), new CosmosData(ibBlue$info)),
   ibbMeteor: new CosmosAnimationResources(new CosmosImage(ibbMeteor), new CosmosData(ibbMeteor$info)),
   ibbMigosp: new CosmosAnimationResources(new CosmosImage(ibbMigosp), new CosmosData(ibbMigosp$info)),
   ibbMirror: new CosmosImage(ibbMirror),
   ibbMirrorLarge: new CosmosImage(ibbMirrorLarge),
   ibbMissile: new CosmosAnimationResources(new CosmosImage(ibbMissile), new CosmosData(ibbMissile$info)),
   ibbMobile: new CosmosAnimationResources(new CosmosImage(ibbMobile), new CosmosData(ibbMobile$info)),
   ibbMoon: new CosmosImage(ibbMoon),
   ibbMouse: new CosmosAnimationResources(new CosmosImage(ibbMouse), new CosmosData(ibbMouse$info)),
   ibbNeoRocket: new CosmosAnimationResources(new CosmosImage(ibbNeoRocket), new CosmosData(ibbNeoRocket$info)),
   ibbNeoTiny1: new CosmosAnimationResources(new CosmosImage(ibbNeoTiny1), new CosmosData(ibbNeoTiny1$info)),
   ibbNeoTiny1a: new CosmosAnimationResources(new CosmosImage(ibbNeoTiny1a), new CosmosData(ibbNeoTiny1a$info)),
   ibbNeoTiny2: new CosmosImage(ibbNeoTiny2),
   ibbNote: new CosmosAnimationResources(new CosmosImage(ibbNote), new CosmosData(ibbNote$info)),
   ibbNuker: new CosmosImage(ibbNuker),
   ibbOctagon: new CosmosImage(ibbOctagon),
   ibbOrb: new CosmosImage(ibbOrb),
   ibbPaw: new CosmosImage(ibbPaw),
   ibbPawInverted: new CosmosImage(ibbPawInverted),
   ibbPellet: new CosmosImage(ibbPellet),
   ibbPipe: new CosmosImage(ibbPipe),
   ibbPlanet: new CosmosImage(ibbPlanet),
   ibbPlusSign: new CosmosImage(ibbPlusSign),
   ibbPombark: new CosmosImage(ibbPombark),
   ibbPombarkSad: new CosmosImage(ibbPombarkSad),
   ibbPomjump: new CosmosImage(ibbPomjump),
   ibbPomjumpSad: new CosmosImage(ibbPomjumpSad),
   ibbPomSad: new CosmosImage(ibbPomSad),
   ibbPomsleep: new CosmosAnimationResources(new CosmosImage(ibbPomsleep), new CosmosData(ibbPomsleep$info)),
   ibbPomwag: new CosmosAnimationResources(new CosmosImage(ibbPomwag), new CosmosData(ibbPomwag$info)),
   ibbPomwake: new CosmosAnimationResources(new CosmosImage(ibbPomwake), new CosmosData(ibbPomwake$info)),
   ibbPomwalk: new CosmosAnimationResources(new CosmosImage(ibbPomwalk), new CosmosData(ibbPomwalk$info)),
   ibbPomwalkSad: new CosmosAnimationResources(new CosmosImage(ibbPomwalkSad), new CosmosData(ibbPomwalkSad$info)),
   ibbPyropebom: new CosmosImage(sources.ibbPyropebom),
   ibbPyropebomb: new CosmosAnimationResources(new CosmosImage(ibbPyropebomb), new CosmosData(ibbPyropebomb$info)),
   ibbPyropefire: new CosmosAnimationResources(new CosmosImage(ibbPyropefire), new CosmosData(ibbPyropefire$info)),
   ibbRadialshock: new CosmosAnimationResources(new CosmosImage(ibbRadialshock), new CosmosData(ibbRadialshock$info)),
   ibbRedspear: new CosmosImage(ibbRedspear),
   ibbRoachfly: new CosmosAnimationResources(new CosmosImage(ibbRoachfly), new CosmosData(ibbRoachfly$info)),
   ibbRope: new CosmosImage(ibbRope),
   ibbScissors: new CosmosImage(ibbScissors),
   ibbScribble: new CosmosAnimationResources(new CosmosImage(ibbScribble), new CosmosData(ibbScribble$info)),
   ibbShield: new CosmosAnimationResources(new CosmosImage(ibbShield), new CosmosData(ibbShield$info)),
   ibbSkrubber: new CosmosImage(ibbSkrubber),
   ibbSmolbol: new CosmosAnimationResources(new CosmosImage(ibbSmolbol), new CosmosData(ibbSmolbol$info)),
   ibbSoap: new CosmosImage(ibbSoap),
   ibbSoda: new CosmosImage(ibbSoda),
   ibbSpear: new CosmosAnimationResources(new CosmosImage(ibbSpear), new CosmosData(ibbSpear$info)),
   ibbSpecatk: new CosmosAnimationResources(new CosmosImage(ibbSpecatk), new CosmosData(ibbSpecatk$info)),
   ibbSpecatkBone: new CosmosImage(ibbSpecatkBone),
   ibbSpider: new CosmosImage(ibbSpider),
   ibbSpiderOutline: new CosmosImage(ibbSpiderOutline),
   ibbStardent: new CosmosImage(ibbStardent),
   ibbStardrop: new CosmosImage(ibbStardrop),
   ibbStarfly: new CosmosAnimationResources(new CosmosImage(ibbStarfly), new CosmosData(ibbStarfly$info)),
   ibbSword: new CosmosImage(ibbSword),
   ibbTank: new CosmosAnimationResources(new CosmosImage(ibbTank), new CosmosData(ibbTank$info)),
   ibbTankarm: new CosmosImage(ibbTankarm),
   ibbTear: new CosmosImage(ibbTear),
   ibbTheMoves: new CosmosAnimationResources(new CosmosImage(ibbTheMoves), new CosmosData(ibbTheMoves$info)),
   ibbTiparrow: new CosmosImage(ibbTiparrow),
   ibbTongue: new CosmosImage(ibbTongue),
   ibbToothbot: new CosmosImage(ibbToothbot),
   ibbToothsingle: new CosmosImage(ibbToothsingle),
   ibbToothtop: new CosmosImage(ibbToothtop),
   ibbTree: new CosmosAnimationResources(new CosmosImage(ibbTree), new CosmosData(ibbTree$info)),
   ibbUltima: new CosmosImage(ibbUltima),
   ibbVertship: new CosmosAnimationResources(new CosmosImage(ibbVertship), new CosmosData(ibbVertship$info)),
   ibbWarningreticle: new CosmosAnimationResources(
      new CosmosImage(ibbWarningreticle),
      new CosmosData(ibbWarningreticle$info)
   ),
   ibbWater: new CosmosAnimationResources(new CosmosImage(ibbWater), new CosmosData(ibbWater$info)),
   ibbWaterwall: new CosmosAnimationResources(new CosmosImage(ibbWaterwall), new CosmosData(ibbWaterwall$info)),
   ibbWave: new CosmosAnimationResources(new CosmosImage(ibbWave), new CosmosData(ibbWave$info)),
   ibbWhitelightning: new CosmosAnimationResources(
      new CosmosImage(ibbWhitelightning),
      new CosmosData(ibbWhitelightning$info)
   ),
   ibbYarn: new CosmosAnimationResources(new CosmosImage(ibbYarn), new CosmosData(ibbYarn$info)),
   ibcAlphysBody: new CosmosAnimationResources(new CosmosImage(ibcAlphysBody), new CosmosData(ibcAlphysBody$info)),
   ibcAlphysFeet: new CosmosImage(ibcAlphysFeet),
   ibcAlphysGhost: new CosmosImage(ibcAlphysGhost),
   ibcAlphysHead: new CosmosAnimationResources(new CosmosImage(ibcAlphysHead), new CosmosData(ibcAlphysHead$info)),
   ibcAlphysMelt: new CosmosAnimationResources(new CosmosImage(ibcAlphysMelt), new CosmosData(ibcAlphysMelt$info)),
   ibcAlphysTorso: new CosmosImage(ibcAlphysTorso),
   ibcAlphysWrap: new CosmosAnimationResources(new CosmosImage(ibcAlphysWrap), new CosmosData(ibcAlphysWrap$info)),
   ibcAlphysWrapShock: new CosmosImage(ibcAlphysWrapShock),
   ibcAsgoreCrown: new CosmosImage(ibcAsgoreCrown),
   ibcAsgoreDeath: new CosmosAnimationResources(new CosmosImage(ibcAsgoreDeath), new CosmosData(ibcAsgoreDeath$info)),
   ibcAsgoreStatic: new CosmosAnimationResources(
      new CosmosImage(ibcAsgoreStatic),
      new CosmosData(ibcAsgoreStatic$info)
   ),
   ibcAsgoreWrap: new CosmosAnimationResources(new CosmosImage(ibcAsgoreWrap), new CosmosData(ibcAsgoreWrap$info)),
   ibcAsgoreWrapShock: new CosmosImage(ibcAsgoreWrapShock),
   ibcAsrielAssist: new CosmosImage(ibcAsrielAssist),
   ibcAsrielBg: new CosmosImage(ibcAsrielBg),
   ibcAsrielCutscene1: new CosmosAnimationResources(
      new CosmosImage(ibcAsrielCutscene1),
      new CosmosData(ibcAsrielCutscene1$info)
   ),
   ibcAsrielCutscene1full: new CosmosAnimationResources(
      new CosmosImage(ibcAsrielCutscene1full),
      new CosmosData(ibcAsrielCutscene1full$info)
   ),
   ibcAsrielCutscene2: new CosmosAnimationResources(
      new CosmosImage(ibcAsrielCutscene2),
      new CosmosData(ibcAsrielCutscene2$info)
   ),
   ibcAsrielFullbody1: new CosmosAnimationResources(
      new CosmosImage(ibcAsrielFullbody1),
      new CosmosData(ibcAsrielFullbody1$info)
   ),
   ibcAsrielFullbody2: new CosmosAnimationResources(
      new CosmosImage(ibcAsrielFullbody2),
      new CosmosData(ibcAsrielFullbody2$info)
   ),
   ibcAsrielFullhead: new CosmosAnimationResources(
      new CosmosImage(ibcAsrielFullhead),
      new CosmosData(ibcAsrielFullhead$info)
   ),
   ibcAsrielFullheadShaker1: new CosmosAnimationResources(
      new CosmosImage(ibcAsrielFullheadShaker1),
      new CosmosData(ibcAsrielFullheadShaker1$info)
   ),
   ibcAsrielFullheadShaker2: new CosmosAnimationResources(
      new CosmosImage(ibcAsrielFullheadShaker2),
      new CosmosData(ibcAsrielFullheadShaker2$info)
   ),
   ibcAsrielGigavine: new CosmosImage(ibcAsrielGigavine),
   ibcAsrielHyperarm: new CosmosAnimationResources(
      new CosmosImage(ibcAsrielHyperarm),
      new CosmosData(ibcAsrielHyperarm$info)
   ),
   ibcAsrielHyperbody: new CosmosAnimationResources(
      new CosmosImage(ibcAsrielHyperbody),
      new CosmosData(ibcAsrielHyperbody$info)
   ),
   ibcAsrielHyperhead: new CosmosAnimationResources(
      new CosmosImage(ibcAsrielHyperhead),
      new CosmosData(ibcAsrielHyperhead$info)
   ),
   ibcAsrielHypersob: new CosmosAnimationResources(
      new CosmosImage(ibcAsrielHypersob),
      new CosmosData(ibcAsrielHypersob$info)
   ),
   ibcAsrielHypersobex: new CosmosAnimationResources(
      new CosmosImage(ibcAsrielHypersobex),
      new CosmosData(ibcAsrielHypersobex$info)
   ),
   ibcAsrielHyperwing: new CosmosAnimationResources(
      new CosmosImage(ibcAsrielHyperwing),
      new CosmosData(ibcAsrielHyperwing$info)
   ),
   ibcAsrielMagic: new CosmosImage(ibcAsrielMagic),
   ibcAstigmatismArm: new CosmosImage(ibcAstigmatismArm),
   ibcAstigmatismBody: new CosmosAnimationResources(
      new CosmosImage(ibcAstigmatismBody),
      new CosmosData(ibcAstigmatismBody$info)
   ),
   ibcAstigmatismHurt: new CosmosImage(ibcAstigmatismHurt),
   ibcAstigmatismLeg: new CosmosImage(ibcAstigmatismLeg),
   ibcBurgerpantsBody: new CosmosAnimationResources(
      new CosmosImage(ibcBurgerpantsBody),
      new CosmosData(ibcBurgerpantsBody$info)
   ),
   ibcDoge: new CosmosAnimationResources(new CosmosImage(ibcDoge), new CosmosData(ibcDoge$info)),
   ibcDogeHurt: new CosmosImage(ibcDogeHurt),
   ibcDogeTail: new CosmosAnimationResources(new CosmosImage(ibcDogeTail), new CosmosData(ibcDogeTail$info)),
   ibcDoggoArms: new CosmosImage(ibcDoggoArms),
   ibcDoggoBody: new CosmosImage(ibcDoggoBody),
   ibcDoggoBodyHurt: new CosmosImage(ibcDoggoBodyHurt),
   ibcDoggoHead: new CosmosAnimationResources(new CosmosImage(ibcDoggoHead), new CosmosData(ibcDoggoHead$info)),
   ibcDoggoHeadWan: new CosmosAnimationResources(
      new CosmosImage(sources.ibcDoggoHeadWan),
      new CosmosData(sources.ibcDoggoHeadWan$info)
   ),
   ibcDogsAxe: new CosmosImage(ibcDogsAxe),
   ibcDogsDogamy: new CosmosAnimationResources(new CosmosImage(ibcDogsDogamy), new CosmosData(ibcDogsDogamy$info)),
   ibcDogsDogamyDesolate: new CosmosImage(ibcDogsDogamyDesolate),
   ibcDogsDogamyHurt: new CosmosImage(ibcDogsDogamyHurt),
   ibcDogsDogaressa: new CosmosAnimationResources(
      new CosmosImage(ibcDogsDogaressa),
      new CosmosData(ibcDogsDogaressa$info)
   ),
   ibcDogsDogaressaHurt: new CosmosImage(ibcDogsDogaressaHurt),
   ibcDogsDogaressaRabid: new CosmosImage(ibcDogsDogaressaRabid),
   ibcDummy: new CosmosImage(ibcDummy),
   ibcDummyFinalghost: new CosmosAnimationResources(
      new CosmosImage(ibcDummyFinalghost),
      new CosmosData(ibcDummyFinalghost$info)
   ),
   ibcDummyGlad: new CosmosImage(ibcDummyGlad),
   ibcDummyGladHugged: new CosmosImage(ibcDummyGladHugged),
   ibcDummyHugged: new CosmosImage(ibcDummyHugged),
   ibcDummyMadBase: new CosmosImage(ibcDummyMadBase),
   ibcDummyMadBody: new CosmosImage(ibcDummyMadBody),
   ibcDummyMadHead: new CosmosAnimationResources(
      new CosmosImage(ibcDummyMadHead),
      new CosmosData(ibcDummyMadHead$info)
   ),
   ibcDummyMadTorso: new CosmosImage(ibcDummyMadTorso),
   ibcDummyShock: new CosmosImage(ibcDummyShock),
   ibcFroggitBody: new CosmosAnimationResources(new CosmosImage(ibcFroggitBody), new CosmosData(ibcFroggitBody$info)),
   ibcFroggitexGone: new CosmosImage(ibcFroggitexGone),
   ibcFroggitexHead: new CosmosAnimationResources(
      new CosmosImage(ibcFroggitexHead),
      new CosmosData(ibcFroggitexHead$info)
   ),
   ibcFroggitexLegs: new CosmosAnimationResources(
      new CosmosImage(ibcFroggitexLegs),
      new CosmosData(ibcFroggitexLegs$info)
   ),
   ibcFroggitGone: new CosmosImage(ibcFroggitGone),
   ibcFroggitHead: new CosmosAnimationResources(new CosmosImage(ibcFroggitHead), new CosmosData(ibcFroggitHead$info)),
   ibcFroggitLegs: new CosmosAnimationResources(new CosmosImage(ibcFroggitLegs), new CosmosData(ibcFroggitLegs$info)),
   ibcGersonValor: new CosmosImage(ibcGersonValor),
   ibcGlydeAntenna: new CosmosImage(ibcGlydeAntenna),
   ibcGlydeBody: new CosmosAnimationResources(new CosmosImage(ibcGlydeBody), new CosmosData(ibcGlydeBody$info)),
   ibcGlydeHurt: new CosmosAnimationResources(new CosmosImage(ibcGlydeHurt), new CosmosData(ibcGlydeHurt$info)),
   ibcGlydeWingLeft: new CosmosImage(ibcGlydeWingLeft),
   ibcGlydeWingRight: new CosmosImage(ibcGlydeWingRight),
   ibcGreatdog: new CosmosAnimationResources(new CosmosImage(ibcGreatdog), new CosmosData(ibcGreatdog$info)),
   ibcGreatdogSleep: new CosmosImage(ibcGreatdogSleep),
   ibcJerryHurt: new CosmosImage(ibcJerryHurt),
   ibcJerryMain: new CosmosAnimationResources(new CosmosImage(ibcJerryMain), new CosmosData(ibcJerryMain$info)),
   ibcKiddBody: new CosmosAnimationResources(new CosmosImage(ibcKiddBody), new CosmosData(ibcKiddBody$info)),
   ibcKnightknightArmball: new CosmosAnimationResources(
      new CosmosImage(ibcKnightknightArmball),
      new CosmosData(ibcKnightknightArmball$info)
   ),
   ibcKnightknightArmstaff: new CosmosImage(ibcKnightknightArmstaff),
   ibcKnightknightBase: new CosmosImage(ibcKnightknightBase),
   ibcKnightknightDragonfur: new CosmosAnimationResources(
      new CosmosImage(ibcKnightknightDragonfur),
      new CosmosData(ibcKnightknightDragonfur$info)
   ),
   ibcKnightknightEyes: new CosmosAnimationResources(
      new CosmosImage(ibcKnightknightEyes),
      new CosmosData(ibcKnightknightEyes$info)
   ),
   ibcKnightknightHeadpiece: new CosmosAnimationResources(
      new CosmosImage(ibcKnightknightHeadpiece),
      new CosmosData(ibcKnightknightHeadpiece$info)
   ),
   ibcKnightknightHurt: new CosmosImage(ibcKnightknightHurt),
   ibcKnightknightMouthpiece: new CosmosAnimationResources(
      new CosmosImage(ibcKnightknightMouthpiece),
      new CosmosData(ibcKnightknightMouthpiece$info)
   ),
   ibcLesserdogBody: new CosmosAnimationResources(
      new CosmosImage(ibcLesserdogBody),
      new CosmosData(ibcLesserdogBody$info)
   ),
   ibcLesserdogHead: new CosmosAnimationResources(
      new CosmosImage(ibcLesserdogHead),
      new CosmosData(ibcLesserdogHead$info)
   ),
   ibcLesserdogHurt: new CosmosAnimationResources(
      new CosmosImage(ibcLesserdogHurt),
      new CosmosData(ibcLesserdogHurt$info)
   ),
   ibcLesserdogHurtHead: new CosmosAnimationResources(
      new CosmosImage(ibcLesserdogHurtHead),
      new CosmosData(ibcLesserdogHurtHead$info)
   ),
   ibcLesserdogTail: new CosmosAnimationResources(
      new CosmosImage(ibcLesserdogTail),
      new CosmosData(ibcLesserdogTail$info)
   ),
   ibcLooxBody: new CosmosAnimationResources(new CosmosImage(ibcLooxBody), new CosmosData(ibcLooxBody$info)),
   ibcLooxHit: new CosmosImage(ibcLooxHit),
   ibcMadjickBoot: new CosmosImage(ibcMadjickBoot),
   ibcMadjickCape: new CosmosImage(ibcMadjickCape),
   ibcMadjickDress: new CosmosImage(ibcMadjickDress),
   ibcMadjickHat: new CosmosImage(ibcMadjickHat),
   ibcMadjickHead: new CosmosImage(ibcMadjickHead),
   ibcMadjickHurt: new CosmosImage(ibcMadjickHurt),
   ibcMadjickLapel: new CosmosImage(ibcMadjickLapel),
   ibcMadjickOrb: new CosmosImage(ibcMadjickOrb),
   ibcMettatonArmsBruh: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonArmsBruh),
      new CosmosData(ibcMettatonArmsBruh$info)
   ),
   ibcMettatonArmsNoticard: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonArmsNoticard),
      new CosmosData(ibcMettatonArmsNoticard$info)
   ),
   ibcMettatonArmsThonk: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonArmsThonk),
      new CosmosData(ibcMettatonArmsThonk$info)
   ),
   ibcMettatonArmsWelcome: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonArmsWelcome),
      new CosmosData(ibcMettatonArmsWelcome$info)
   ),
   ibcMettatonArmsWelcomeBack: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonArmsWelcomeBack),
      new CosmosData(ibcMettatonArmsWelcomeBack$info)
   ),
   ibcMettatonArmsWhaaat: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonArmsWhaaat),
      new CosmosData(ibcMettatonArmsWhaaat$info)
   ),
   ibcMettatonArmsWhatevs: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonArmsWhatevs),
      new CosmosData(ibcMettatonArmsWhatevs$info)
   ),
   ibcMettatonBody: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonBody),
      new CosmosData(ibcMettatonBody$info)
   ),
   ibcMettatonBodyBack: new CosmosAnimationResources(
      new CosmosImage(sources.ibcMettatonBodyBack),
      new CosmosData(sources.ibcMettatonBodyBack$info)
   ),
   ibcMettatonBodySOUL: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonBodySOUL),
      new CosmosData(ibcMettatonBodySOUL$info)
   ),
   ibcMettatonBodyTransform: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonBodyTransform),
      new CosmosData(ibcMettatonBodyTransform$info)
   ),
   ibcMettatonBrachistochrone: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonBrachistochrone, (red, g, blue) =>
         red !== 0 ? [ 0, 0, 0, red ] : [ 255, 255, 255, blue ]
      ),
      new CosmosData(ibcMettatonBrachistochrone$info)
   ),
   ibcMettatonDjdisco: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonDjdisco),
      new CosmosData(ibcMettatonDjdisco$info)
   ),
   ibcMettatonDjdiscoInv: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonDjdiscoInv),
      new CosmosData(ibcMettatonDjdiscoInv$info)
   ),
   ibcMettatonExArm: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonExArm),
      new CosmosData(ibcMettatonExArm$info)
   ),
   ibcMettatonExBody: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonExBody),
      new CosmosData(ibcMettatonExBody$info)
   ),
   ibcMettatonExBodyHeart: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonExBodyHeart),
      new CosmosData(ibcMettatonExBodyHeart$info)
   ),
   ibcMettatonExFace: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonExFace),
      new CosmosData(ibcMettatonExFace$info)
   ),
   ibcMettatonExLeg: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonExLeg),
      new CosmosData(ibcMettatonExLeg$info)
   ),
   ibcMettatonExStarburst: new CosmosImage(ibcMettatonExStarburst),
   ibcMettatonFlyawaymyroboticfriend: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonFlyawaymyroboticfriend),
      new CosmosData(ibcMettatonFlyawaymyroboticfriend$info)
   ),
   ibcMettatonHappybreaktime: new CosmosImage(sources.ibcMettatonHappybreaktime),
   ibcMettatonNeoArm1: new CosmosImage(ibcMettatonNeoArm1),
   ibcMettatonNeoArm2: new CosmosImage(ibcMettatonNeoArm2),
   ibcMettatonNeoBody: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonNeoBody),
      new CosmosData(ibcMettatonNeoBody$info)
   ),
   ibcMettatonNeoHead: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonNeoHead),
      new CosmosData(ibcMettatonNeoHead$info)
   ),
   ibcMettatonNeoHeart: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonNeoHeart),
      new CosmosData(ibcMettatonNeoHeart$info)
   ),
   ibcMettatonNeoLegs: new CosmosImage(ibcMettatonNeoLegs),
   ibcMettatonNeoWings: new CosmosImage(ibcMettatonNeoWings),
   ibcMettatonQuizbutton: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonQuizbutton),
      new CosmosData(ibcMettatonQuizbutton$info)
   ),
   ibcMettatonRecbox: new CosmosAnimationResources(
      new CosmosImage(sources.ibcMettatonRecbox),
      new CosmosData(sources.ibcMettatonRecbox$info)
   ),
   ibcMettatonRocket: new CosmosAnimationResources(
      new CosmosImage(ibcMettatonRocket),
      new CosmosData(ibcMettatonRocket$info)
   ),
   ibcMettatonWheel: new CosmosImage(ibcMettatonWheel),
   ibcMigosp: new CosmosAnimationResources(new CosmosImage(ibcMigosp), new CosmosData(ibcMigosp$info)),
   ibcMigospel: new CosmosAnimationResources(new CosmosImage(ibcMigospel), new CosmosData(ibcMigospel$info)),
   ibcMigospelHappi: new CosmosAnimationResources(
      new CosmosImage(ibcMigospelHappi),
      new CosmosData(ibcMigospelHappi$info)
   ),
   ibcMigospelHurt: new CosmosImage(ibcMigospelHurt),
   ibcMigospelLegs: new CosmosImage(ibcMigospelLegs),
   ibcMigospHappi: new CosmosAnimationResources(new CosmosImage(ibcMigospHappi), new CosmosData(ibcMigospHappi$info)),
   ibcMigospHit: new CosmosImage(ibcMigospHit),
   ibcMoldbyggDefeated: new CosmosImage(ibcMoldbyggDefeated),
   ibcMoldbyggHead: new CosmosAnimationResources(
      new CosmosImage(ibcMoldbyggHead),
      new CosmosData(ibcMoldbyggHead$info)
   ),
   ibcMoldbyggPart: new CosmosImage(ibcMoldbyggPart),
   ibcMoldsmal: new CosmosImage(ibcMoldsmal),
   ibcMouseBody: new CosmosAnimationResources(new CosmosImage(ibcMouseBody), new CosmosData(ibcMouseBody$info)),
   ibcMouseHead: new CosmosAnimationResources(new CosmosImage(ibcMouseHead), new CosmosData(ibcMouseHead$info)),
   ibcMouseHurt: new CosmosImage(ibcMouseHurt),
   ibcMuffetArm1: new CosmosAnimationResources(new CosmosImage(ibcMuffetArm1), new CosmosData(ibcMuffetArm1$info)),
   ibcMuffetArm2a: new CosmosImage(ibcMuffetArm2a),
   ibcMuffetArm2b: new CosmosImage(ibcMuffetArm2b),
   ibcMuffetArm3: new CosmosImage(ibcMuffetArm3),
   ibcMuffetCupcake: new CosmosAnimationResources(
      new CosmosImage(ibcMuffetCupcake),
      new CosmosData(ibcMuffetCupcake$info)
   ),
   ibcMuffetDustrus: new CosmosImage(ibcMuffetDustrus),
   ibcMuffetEye1: new CosmosAnimationResources(new CosmosImage(ibcMuffetEye1), new CosmosData(ibcMuffetEye1$info)),
   ibcMuffetEye2: new CosmosAnimationResources(new CosmosImage(ibcMuffetEye2), new CosmosData(ibcMuffetEye2$info)),
   ibcMuffetEye3: new CosmosAnimationResources(new CosmosImage(ibcMuffetEye3), new CosmosData(ibcMuffetEye3$info)),
   ibcMuffetHair: new CosmosImage(ibcMuffetHair),
   ibcMuffetHead: new CosmosImage(ibcMuffetHead),
   ibcMuffetHurt: new CosmosImage(ibcMuffetHurt),
   ibcMuffetLegs: new CosmosImage(ibcMuffetLegs),
   ibcMuffetPants: new CosmosImage(ibcMuffetPants),
   ibcMuffetShirt: new CosmosImage(ibcMuffetShirt),
   ibcMuffetShoulder: new CosmosImage(ibcMuffetShoulder),
   ibcMuffetSpider: new CosmosAnimationResources(
      new CosmosImage(ibcMuffetSpider),
      new CosmosData(ibcMuffetSpider$info)
   ),
   ibcMuffetSpiderSign: new CosmosAnimationResources(
      new CosmosImage(sources.ibcMuffetSpiderSign),
      new CosmosData(sources.ibcMuffetSpiderSign$info)
   ),
   ibcMuffetSpiderTelegram: new CosmosImage(ibcMuffetSpiderTelegram),
   ibcMuffetTeapot: new CosmosImage(ibcMuffetTeapot),
   ibcMushketeerBody: new CosmosImage(ibcMushketeerBody),
   ibcMushketeerBodyDisarmed: new CosmosImage(ibcMushketeerBodyDisarmed),
   ibcMushketeerHurt: new CosmosImage(ibcMushketeerHurt),
   ibcMushketeerHurtDisarmed: new CosmosImage(ibcMushketeerHurtDisarmed),
   ibcMushyBody: new CosmosImage(ibcMushyBody),
   ibcMushyHit: new CosmosImage(ibcMushyHit),
   ibcNapstablookBattle: new CosmosAnimationResources(
      new CosmosImage(ibcNapstablookBattle),
      new CosmosData(ibcNapstablookBattle$info)
   ),
   ibcNapstablookBattleLookdeath: new CosmosAnimationResources(
      new CosmosImage(ibcNapstablookBattleLookdeath),
      new CosmosData(ibcNapstablookBattleLookdeath$info)
   ),
   ibcNapstablookBattleLookdown: new CosmosAnimationResources(
      new CosmosImage(ibcNapstablookBattleLookdown),
      new CosmosData(ibcNapstablookBattleLookdown$info)
   ),
   ibcNapstablookBattleLookforward: new CosmosAnimationResources(
      new CosmosImage(ibcNapstablookBattleLookforward),
      new CosmosData(ibcNapstablookBattleLookforward$info)
   ),
   ibcNapstablookHat: new CosmosAnimationResources(
      new CosmosImage(ibcNapstablookHat),
      new CosmosData(ibcNapstablookHat$info)
   ),
   ibcNapstablookSad: new CosmosImage(sources.ibcNapstablookSad),
   ibcPapyrusAnime: new CosmosAnimationResources(
      new CosmosImage(ibcPapyrusAnime),
      new CosmosData(ibcPapyrusAnime$info)
   ),
   ibcPapyrusBattle: new CosmosAnimationResources(
      new CosmosImage(ibcPapyrusBattle),
      new CosmosData(ibcPapyrusBattle$info)
   ),
   ibcPapyrusBattleBlackoutA: new CosmosAnimationResources(
      new CosmosImage(ibcPapyrusBattleBlackoutA),
      new CosmosData(ibcPapyrusBattleBlackoutA$info)
   ),
   ibcPapyrusBattleBlackoutB: new CosmosAnimationResources(
      new CosmosImage(ibcPapyrusBattleBlackoutB),
      new CosmosData(ibcPapyrusBattleBlackoutB$info)
   ),
   ibcPapyrusBattleOpen: new CosmosAnimationResources(
      new CosmosImage(ibcPapyrusBattleOpen),
      new CosmosData(ibcPapyrusBattleOpen$info)
   ),
   ibcPapyrusBlank: new CosmosImage(ibcPapyrusBlank),
   ibcPapyrusBlush: new CosmosImage(ibcPapyrusBlush),
   ibcPapyrusBlushRefuse: new CosmosImage(ibcPapyrusBlushRefuse),
   ibcPapyrusClosed: new CosmosAnimationResources(
      new CosmosImage(ibcPapyrusClosed),
      new CosmosData(ibcPapyrusClosed$info)
   ),
   ibcPapyrusConfident: new CosmosAnimationResources(
      new CosmosImage(ibcPapyrusConfident),
      new CosmosData(ibcPapyrusConfident$info)
   ),
   ibcPapyrusCoolhat: new CosmosImage(ibcPapyrusCoolhat),
   ibcPapyrusCoolhatUnder: new CosmosImage(ibcPapyrusCoolhatUnder),
   ibcPapyrusDateOMG: new CosmosAnimationResources(
      new CosmosImage(ibcPapyrusDateOMG),
      new CosmosData(ibcPapyrusDateOMG$info)
   ),
   ibcPapyrusDateRead: new CosmosAnimationResources(
      new CosmosImage(ibcPapyrusDateRead),
      new CosmosData(ibcPapyrusDateRead$info)
   ),
   ibcPapyrusDateSwipe: new CosmosAnimationResources(
      new CosmosImage(ibcPapyrusDateSwipe),
      new CosmosData(ibcPapyrusDateSwipe$info)
   ),
   ibcPapyrusDeadpan: new CosmosImage(ibcPapyrusDeadpan),
   ibcPapyrusDetermined: new CosmosImage(ibcPapyrusDetermined),
   ibcPapyrusEyeroll: new CosmosImage(ibcPapyrusEyeroll),
   ibcPapyrusFakeAnger: new CosmosImage(ibcPapyrusFakeAnger),
   ibcPapyrusHapp: new CosmosAnimationResources(new CosmosImage(ibcPapyrusHapp), new CosmosData(ibcPapyrusHapp$info)),
   ibcPapyrusHappAgain: new CosmosImage(ibcPapyrusHappAgain),
   ibcPapyrusHeadless: new CosmosImage(ibcPapyrusHeadless),
   ibcPapyrusMad: new CosmosAnimationResources(new CosmosImage(ibcPapyrusMad), new CosmosData(ibcPapyrusMad$info)),
   ibcPapyrusNooo: new CosmosAnimationResources(new CosmosImage(ibcPapyrusNooo), new CosmosData(ibcPapyrusNooo$info)),
   ibcPapyrusOwwie: new CosmosImage(ibcPapyrusOwwie),
   ibcPapyrusSecretStyle: new CosmosAnimationResources(
      new CosmosImage(sources.ibcPapyrusSecretStyle),
      new CosmosData(sources.ibcPapyrusSecretStyle$info)
   ),
   ibcPapyrusShock: new CosmosImage(ibcPapyrusShock),
   ibcPapyrusSide: new CosmosImage(ibcPapyrusSide),
   ibcPapyrusSly: new CosmosAnimationResources(new CosmosImage(ibcPapyrusSly), new CosmosData(ibcPapyrusSly$info)),
   ibcPapyrusSmacked: new CosmosImage(ibcPapyrusSmacked),
   ibcPapyrusSpagbox: new CosmosAnimationResources(
      new CosmosImage(ibcPapyrusSpagbox),
      new CosmosData(ibcPapyrusSpagbox$info)
   ),
   ibcPapyrusSus: new CosmosImage(ibcPapyrusSus),
   ibcPapyrusSweat: new CosmosAnimationResources(
      new CosmosImage(ibcPapyrusSweat),
      new CosmosData(ibcPapyrusSweat$info)
   ),
   ibcPapyrusTopBlush: new CosmosImage(ibcPapyrusTopBlush),
   ibcPapyrusWeary: new CosmosImage(ibcPapyrusWeary),
   ibcPapyrusWrap: new CosmosAnimationResources(new CosmosImage(ibcPapyrusWrap), new CosmosData(ibcPapyrusWrap$info)),
   ibcPapyrusWrapShock: new CosmosImage(ibcPapyrusWrapShock),
   ibcPerigeeBody: new CosmosAnimationResources(new CosmosImage(ibcPerigeeBody), new CosmosData(ibcPerigeeBody$info)),
   ibcPerigeeHurt: new CosmosImage(ibcPerigeeHurt),
   ibcPyropeDrip: new CosmosImage(ibcPyropeDrip),
   ibcPyropeHead: new CosmosAnimationResources(new CosmosImage(ibcPyropeHead), new CosmosData(ibcPyropeHead$info)),
   ibcPyropeHurt: new CosmosImage(ibcPyropeHurt),
   ibcPyropeRing: new CosmosAnimationResources(new CosmosImage(ibcPyropeRing), new CosmosData(ibcPyropeRing$info)),
   ibcRadtile: new CosmosAnimationResources(new CosmosImage(ibcRadtile), new CosmosData(ibcRadtile$info)),
   ibcRadtileHurt: new CosmosImage(ibcRadtileHurt),
   ibcRadtileTail: new CosmosAnimationResources(new CosmosImage(ibcRadtileTail), new CosmosData(ibcRadtileTail$info)),
   ibcRomanMain: new CosmosImage(ibcRomanMain),
   ibcRoyalguardBall: new CosmosImage(ibcRoyalguardBall),
   ibcRoyalguardBugFist: new CosmosImage(ibcRoyalguardBugFist),
   ibcRoyalguardBugHead: new CosmosImage(ibcRoyalguardBugHead),
   ibcRoyalguardCatFist: new CosmosImage(ibcRoyalguardCatFist),
   ibcRoyalguardCatHead: new CosmosImage(ibcRoyalguardCatHead),
   ibcRoyalguardChestplate: new CosmosAnimationResources(
      new CosmosImage(ibcRoyalguardChestplate),
      new CosmosData(ibcRoyalguardChestplate$info)
   ),
   ibcRoyalguardDragonHead: new CosmosImage(ibcRoyalguardDragonHead),
   ibcRoyalguardFalchion: new CosmosImage(ibcRoyalguardFalchion),
   ibcRoyalguardFist: new CosmosImage(ibcRoyalguardFist),
   ibcRoyalguardFlag: new CosmosImage(ibcRoyalguardFlag),
   ibcRoyalguardHurt: new CosmosAnimationResources(
      new CosmosImage(ibcRoyalguardHurt),
      new CosmosData(ibcRoyalguardHurt$info)
   ),
   ibcRoyalguardLegs: new CosmosImage(ibcRoyalguardLegs),
   ibcRoyalguardRabbitHead: new CosmosImage(ibcRoyalguardRabbitHead),
   ibcRoyalguardShoes: new CosmosImage(ibcRoyalguardShoes),
   ibcRoyalguardSweat: new CosmosImage(ibcRoyalguardSweat),
   ibcSansBattle: new CosmosAnimationResources(new CosmosImage(ibcSansBattle), new CosmosData(ibcSansBattle$info)),
   ibcSansDeath: new CosmosAnimationResources(new CosmosImage(ibcSansDeath), new CosmosData(ibcSansDeath$info)),
   ibcSansWrap: new CosmosAnimationResources(new CosmosImage(ibcSansWrap), new CosmosData(ibcSansWrap$info)),
   ibcSansWrapShock: new CosmosImage(ibcSansWrapShock),
   ibcShyrenBattleAgent: new CosmosAnimationResources(
      new CosmosImage(ibcShyrenBattleAgent),
      new CosmosData(ibcShyrenBattleAgent$info)
   ),
   ibcShyrenBattleBack: new CosmosAnimationResources(
      new CosmosImage(ibcShyrenBattleBack),
      new CosmosData(ibcShyrenBattleBack$info)
   ),
   ibcShyrenBattleFront: new CosmosAnimationResources(
      new CosmosImage(ibcShyrenBattleFront),
      new CosmosData(ibcShyrenBattleFront$info)
   ),
   ibcShyrenBattleHurt: new CosmosImage(ibcShyrenBattleHurt),
   ibcShyrenBattleWave: new CosmosAnimationResources(
      new CosmosImage(ibcShyrenBattleWave),
      new CosmosData(ibcShyrenBattleWave$info)
   ),
   ibcSpacetop: new CosmosAnimationResources(new CosmosImage(ibcSpacetop), new CosmosData(ibcSpacetop$info)),
   ibcSpacetopCrystal: new CosmosImage(ibcSpacetopCrystal),
   ibcSpacetopHurt: new CosmosImage(ibcSpacetopHurt),
   ibcStardrakeBody: new CosmosImage(ibcStardrakeBody),
   ibcStardrakeChilldrake: new CosmosImage(ibcStardrakeChilldrake),
   ibcStardrakeChilldrakeHurt: new CosmosImage(ibcStardrakeChilldrakeHurt),
   ibcStardrakeHead: new CosmosAnimationResources(
      new CosmosImage(ibcStardrakeHead),
      new CosmosData(ibcStardrakeHead$info)
   ),
   ibcStardrakeHurt: new CosmosImage(ibcStardrakeHurt),
   ibcStardrakeLegs: new CosmosImage(ibcStardrakeLegs),
   ibcStardrakeLegsOver: new CosmosImage(ibcStardrakeLegsOver),
   ibcTorielBattle1: new CosmosAnimationResources(
      new CosmosImage(ibcTorielBattle1),
      new CosmosData(ibcTorielBattle1$info)
   ),
   ibcTorielBattle2: new CosmosAnimationResources(
      new CosmosImage(ibcTorielBattle2),
      new CosmosData(ibcTorielBattle2$info)
   ),
   ibcTorielCutscene1: new CosmosAnimationResources(
      new CosmosImage(ibcTorielCutscene1),
      new CosmosData(ibcTorielCutscene1$info)
   ),
   ibcTorielCutscene2: new CosmosAnimationResources(
      new CosmosImage(ibcTorielCutscene2),
      new CosmosData(ibcTorielCutscene2$info)
   ),
   ibcTorielScram: new CosmosAnimationResources(new CosmosImage(ibcTorielScram), new CosmosData(ibcTorielScram$info)),
   ibcTorielWrap: new CosmosAnimationResources(new CosmosImage(ibcTorielWrap), new CosmosData(ibcTorielWrap$info)),
   ibcTorielWrapShock: new CosmosImage(ibcTorielWrapShock),
   ibcTsundereBlush: new CosmosAnimationResources(
      new CosmosImage(ibcTsundereBlush),
      new CosmosData(ibcTsundereBlush$info)
   ),
   ibcTsundereBody: new CosmosImage(ibcTsundereBody),
   ibcTsundereExhaust: new CosmosImage(ibcTsundereExhaust),
   ibcTsundereHurt: new CosmosImage(ibcTsundereHurt),
   ibcTwinklyBeatsaber: new CosmosImage(ibcTwinklyBeatsaber),
   ibcTwinklyCheckpoint: new CosmosImage(ibcTwinklyCheckpoint),
   ibcTwinklyDiamondboltArc: new CosmosAnimationResources(
      new CosmosImage(ibcTwinklyDiamondboltArc),
      new CosmosData(ibcTwinklyDiamondboltArc$info)
   ),
   ibcTwinklyDiamondboltRay: new CosmosAnimationResources(
      new CosmosImage(ibcTwinklyDiamondboltRay),
      new CosmosData(ibcTwinklyDiamondboltRay$info)
   ),
   ibcTwinklyFunkin: new CosmosAnimationResources(
      new CosmosImage(ibcTwinklyFunkin),
      new CosmosData(ibcTwinklyFunkin$info)
   ),
   ibcTwinklyGeodash: new CosmosImage(ibcTwinklyGeodash),
   ibcTwinklyGeoplatform: new CosmosImage(ibcTwinklyGeoplatform),
   ibcTwinklyGeoring: new CosmosImage(ibcTwinklyGeoring),
   ibcTwinklyHeart1: new CosmosAnimationResources(
      new CosmosImage(ibcTwinklyHeart1),
      new CosmosData(ibcTwinklyHeart1$info)
   ),
   ibcTwinklyHeart2: new CosmosAnimationResources(
      new CosmosImage(ibcTwinklyHeart2),
      new CosmosData(ibcTwinklyHeart2$info)
   ),
   ibcTwinklyHeart3: new CosmosAnimationResources(
      new CosmosImage(ibcTwinklyHeart3),
      new CosmosData(ibcTwinklyHeart3$info)
   ),
   ibcTwinklyHeart4: new CosmosAnimationResources(
      new CosmosImage(ibcTwinklyHeart4),
      new CosmosData(ibcTwinklyHeart4$info)
   ),
   ibcTwinklyHeart5: new CosmosAnimationResources(
      new CosmosImage(ibcTwinklyHeart5),
      new CosmosData(ibcTwinklyHeart5$info)
   ),
   ibcTwinklyHeart6: new CosmosAnimationResources(
      new CosmosImage(ibcTwinklyHeart6),
      new CosmosData(ibcTwinklyHeart6$info)
   ),
   ibcTwinklyHeart7: new CosmosAnimationResources(
      new CosmosImage(ibcTwinklyHeart7),
      new CosmosData(ibcTwinklyHeart7$info)
   ),
   ibcTwinklyItssobad: new CosmosImage(ibcTwinklyItssobad),
   ibcTwinklyJusant: new CosmosImage(ibcTwinklyJusant),
   ibcTwinklyNotebar: new CosmosImage(ibcTwinklyNotebar),
   ibcTwinklyOrbiterExtra: new CosmosAnimationResources(
      new CosmosImage(ibcTwinklyOrbiterExtra),
      new CosmosData(ibcTwinklyOrbiterExtra$info)
   ),
   ibcTwinklyOrbiterMid: new CosmosAnimationResources(
      new CosmosImage(ibcTwinklyOrbiterMid),
      new CosmosData(ibcTwinklyOrbiterMid$info)
   ),
   ibcTwinklyOverlay: new CosmosAnimationResources(
      new CosmosImage(ibcTwinklyOverlay),
      new CosmosData(ibcTwinklyOverlay$info)
   ),
   ibcTwinklyPadd: new CosmosImage(ibcTwinklyPadd),
   ibcTwinklyPlatform: new CosmosImage(ibcTwinklyPlatform),
   ibcTwinklyRestraint: new CosmosImage(ibcTwinklyRestraint),
   ibcTwinklyRotater: new CosmosAnimationResources(
      new CosmosImage(ibcTwinklyRotater),
      new CosmosData(ibcTwinklyRotater$info)
   ),
   ibcTwinklyRotaterBeam: new CosmosAnimationResources(
      new CosmosImage(ibcTwinklyRotaterBeam),
      new CosmosData(ibcTwinklyRotaterBeam$info)
   ),
   ibcTwinklyShoes: new CosmosImage(ibcTwinklyShoes),
   ibcTwinklyShotstar: new CosmosAnimationResources(
      new CosmosImage(ibcTwinklyShotstar),
      new CosmosData(ibcTwinklyShotstar$info)
   ),
   ibcTwinklySpoon: new CosmosImage(ibcTwinklySpoon),
   ibcTwinklyStanleycolumn: new CosmosImage(ibcTwinklyStanleycolumn),
   ibcTwinklyStanleyparable: new CosmosImage(ibcTwinklyStanleyparable),
   ibcTwinklySun1: new CosmosAnimationResources(new CosmosImage(ibcTwinklySun1), new CosmosData(ibcTwinklySun1$info)),
   ibcTwinklySun2: new CosmosAnimationResources(new CosmosImage(ibcTwinklySun2), new CosmosData(ibcTwinklySun2$info)),
   ibcTwinklySun3: new CosmosAnimationResources(new CosmosImage(ibcTwinklySun3), new CosmosData(ibcTwinklySun3$info)),
   ibcTwinklySunball: new CosmosAnimationResources(
      new CosmosImage(ibcTwinklySunball),
      new CosmosData(ibcTwinklySunball$info)
   ),
   ibcTwinklySunbeam: new CosmosAnimationResources(
      new CosmosImage(ibcTwinklySunbeam),
      new CosmosData(ibcTwinklySunbeam$info)
   ),
   ibcTwinklySunringBlue: new CosmosAnimationResources(
      new CosmosImage(ibcTwinklySunringBlue),
      new CosmosData(ibcTwinklySunringBlue$info)
   ),
   ibcTwinklySunringOrange: new CosmosAnimationResources(
      new CosmosImage(ibcTwinklySunringOrange),
      new CosmosData(ibcTwinklySunringOrange$info)
   ),
   ibcTwinklyUnderlay: new CosmosImage(ibcTwinklyUnderlay),
   ibcTwinklyWarpstar: new CosmosAnimationResources(
      new CosmosImage(ibcTwinklyWarpstar),
      new CosmosData(ibcTwinklyWarpstar$info)
   ),
   ibcTwinklyWinterrowd: new CosmosImage(ibcTwinklyWinterrowd),
   ibcTwinklyWormhole: new CosmosAnimationResources(
      new CosmosImage(ibcTwinklyWormhole),
      new CosmosData(ibcTwinklyWormhole$info)
   ),
   ibcTwinklyXylo: new CosmosImage(ibcTwinklyXylo),
   ibcUndyneArm1: new CosmosImage(ibcUndyneArm1),
   ibcUndyneArm1Ex: new CosmosImage(ibcUndyneArm1Ex),
   ibcUndyneArm2: new CosmosImage(ibcUndyneArm2),
   ibcUndyneArm2Ex: new CosmosImage(ibcUndyneArm2Ex),
   ibcUndyneArrow: new CosmosImage(ibcUndyneArrow),
   ibcUndyneBoots: new CosmosImage(ibcUndyneBoots),
   ibcUndyneBootsEx: new CosmosImage(ibcUndyneBootsEx),
   ibcUndyneCage: new CosmosImage(ibcUndyneCage),
   ibcUndyneCageHoriz: new CosmosImage(ibcUndyneCageHoriz),
   ibcUndyneChestplate: new CosmosImage(ibcUndyneChestplate),
   ibcUndyneChestplateEx: new CosmosImage(ibcUndyneChestplateEx),
   ibcUndyneChestplateHelmet: new CosmosImage(ibcUndyneChestplateHelmet),
   ibcUndyneDate: new CosmosImage(ibcUndyneDate),
   ibcUndyneDateArm: new CosmosAnimationResources(
      new CosmosImage(ibcUndyneDateArm),
      new CosmosData(ibcUndyneDateArm$info)
   ),
   ibcUndyneDateLegs: new CosmosImage(ibcUndyneDateLegs),
   ibcUndyneDateSpear: new CosmosAnimationResources(
      new CosmosImage(ibcUndyneDateSpear),
      new CosmosData(ibcUndyneDateSpear$info)
   ),
   ibcUndyneDateTorso: new CosmosImage(ibcUndyneDateTorso),
   ibcUndyneEyebeam: new CosmosImage(ibcUndyneEyebeam),
   ibcUndyneFatal: new CosmosAnimationResources(new CosmosImage(ibcUndyneFatal), new CosmosData(ibcUndyneFatal$info)),
   ibcUndyneHair: new CosmosAnimationResources(new CosmosImage(ibcUndyneHair), new CosmosData(ibcUndyneHair$info)),
   ibcUndyneHairEx: new CosmosAnimationResources(
      new CosmosImage(ibcUndyneHairEx),
      new CosmosData(ibcUndyneHairEx$info)
   ),
   ibcUndyneHead: new CosmosAnimationResources(new CosmosImage(ibcUndyneHead), new CosmosData(ibcUndyneHead$info)),
   ibcUndyneHelmet: new CosmosImage(ibcUndyneHelmet),
   ibcUndyneLaugh: new CosmosAnimationResources(new CosmosImage(ibcUndyneLaugh), new CosmosData(ibcUndyneLaugh$info)),
   ibcUndyneMain: new CosmosImage(ibcUndyneMain),
   ibcUndyneMainEx: new CosmosAnimationResources(
      new CosmosImage(ibcUndyneMainEx),
      new CosmosData(ibcUndyneMainEx$info)
   ),
   ibcUndyneMainHelmet: new CosmosImage(ibcUndyneMainHelmet),
   ibcUndyneMainPain: new CosmosImage(ibcUndyneMainPain),
   ibcUndyneMainPause: new CosmosImage(ibcUndyneMainPause),
   ibcUndyneMainSad: new CosmosImage(ibcUndyneMainSad),
   ibcUndyneNeutralFinal: new CosmosAnimationResources(
      new CosmosImage(ibcUndyneNeutralFinal),
      new CosmosData(ibcUndyneNeutralFinal$info)
   ),
   ibcUndyneSheath: new CosmosImage(ibcUndyneSheath),
   ibcUndyneSheathEx: new CosmosImage(ibcUndyneSheathEx),
   ibcUndyneShield: new CosmosAnimationResources(
      new CosmosImage(ibcUndyneShield),
      new CosmosData(ibcUndyneShield$info)
   ),
   ibcUndyneShocked: new CosmosImage(ibcUndyneShocked),
   ibcUndyneSmear: new CosmosAnimationResources(new CosmosImage(ibcUndyneSmear), new CosmosData(ibcUndyneSmear$info)),
   ibcUndyneWrap: new CosmosAnimationResources(new CosmosImage(ibcUndyneWrap), new CosmosData(ibcUndyneWrap$info)),
   ibcUndyneWrapped: new CosmosAnimationResources(
      new CosmosImage(ibcUndyneWrapped),
      new CosmosData(ibcUndyneWrapped$info)
   ),
   ibcUndyneWrapShock: new CosmosImage(ibcUndyneWrapShock),
   ibcWhimsalotBody: new CosmosAnimationResources(
      new CosmosImage(ibcWhimsalotBody),
      new CosmosData(ibcWhimsalotBody$info)
   ),
   ibcWhimsalotHit: new CosmosImage(ibcWhimsalotHit),
   ibcWhimsun: new CosmosAnimationResources(new CosmosImage(ibcWhimsun), new CosmosData(ibcWhimsun$info)),
   ibcWhimsunHit: new CosmosImage(ibcWhimsunHit),
   ibcWoshuaBody: new CosmosImage(ibcWoshuaBody),
   ibcWoshuaDuck: new CosmosImage(ibcWoshuaDuck),
   ibcWoshuaFace: new CosmosImage(ibcWoshuaFace),
   ibcWoshuaHanger: new CosmosImage(ibcWoshuaHanger),
   ibcWoshuaHead: new CosmosImage(ibcWoshuaHead),
   ibcWoshuaHurt: new CosmosImage(ibcWoshuaHurt),
   ibcWoshuaTail: new CosmosAnimationResources(new CosmosImage(ibcWoshuaTail), new CosmosData(ibcWoshuaTail$info)),
   ibcWoshuaWater: new CosmosImage(ibcWoshuaWater),
   ibGalaxy: new CosmosAnimationResources(new CosmosImage(ibGalaxy), new CosmosData(ibGalaxy$info)),
   ibGrey: new CosmosAnimationResources(new CosmosImage(ibGrey), new CosmosData(ibGrey$info)),
   ibuAct: new CosmosAnimationResources(new CosmosImage(sources.ibuAct), new CosmosData(sources.ibuAct$info)),
   ibuArrows: new CosmosImage(ibuArrows),
   ibuBlueSOUL: new CosmosAnimationResources(new CosmosImage(ibuBlueSOUL), new CosmosData(ibuBlueSOUL$info)),
   ibuBoot1: new CosmosAnimationResources(new CosmosImage(ibuBoot1), new CosmosData(ibuBoot1$info)),
   ibuBoot2: new CosmosAnimationResources(new CosmosImage(ibuBoot2), new CosmosData(ibuBoot2$info)),
   ibuBossbreak: new CosmosImage(ibuBossbreak),
   ibuBossshatter: new CosmosAnimationResources(new CosmosImage(ibuBossshatter), new CosmosData(ibuBossshatter$info)),
   ibuBossSOUL: new CosmosImage(ibuBossSOUL),
   ibuBreak: new CosmosImage(ibuBreak),
   ibuBubbleBlooky: new CosmosImage(ibuBubbleBlooky),
   ibuBubbleBlookyInverted: new CosmosImage(ibuBubbleBlooky, (red, green, blue, alpha) => [
      255 - red,
      255 - green,
      255 - blue,
      alpha
   ]),
   ibuBubbleDGU1: new CosmosImage(ibuBubbleDGU1),
   ibuBubbleDGU2: new CosmosImage(ibuBubbleDGU2),
   ibuBubbleDummy: new CosmosImage(ibuBubbleDummy),
   ibuBubbleMTT: new CosmosImage(ibuBubbleMTT),
   ibuBubbleShock: new CosmosImage(ibuBubbleShock),
   ibuBubbleTiny: new CosmosImage(ibuBubbleTiny),
   ibuBubbleTwinkly: new CosmosImage(ibuBubbleTwinkly),
   ibuCharm: new CosmosImage(ibuCharm),
   ibuCyangreenSOUL: new CosmosAnimationResources(
      new CosmosImage(ibuCyangreenSOUL),
      new CosmosData(ibuCyangreenSOUL$info)
   ),
   ibuCyanReticle: new CosmosImage(ibuCyanReticle),
   ibuCyanSOUL: new CosmosAnimationResources(new CosmosImage(ibuCyanSOUL), new CosmosData(ibuCyanSOUL$info)),
   ibuDeadeye: new CosmosImage(ibuDeadeye),
   ibuDefeat: new CosmosImage(ibuDefeat),
   ibuFight: new CosmosAnimationResources(new CosmosImage(sources.ibuFight), new CosmosData(sources.ibuFight$info)),
   ibuFist1: new CosmosAnimationResources(new CosmosImage(ibuFist1), new CosmosData(ibuFist1$info)),
   ibuFist2: new CosmosAnimationResources(new CosmosImage(ibuFist2), new CosmosData(ibuFist2$info)),
   ibuFrypan1: new CosmosAnimationResources(new CosmosImage(ibuFrypan1), new CosmosData(ibuFrypan1$info)),
   ibuFrypan2: new CosmosImage(ibuFrypan2),
   ibuGreenSOUL: new CosmosAnimationResources(new CosmosImage(ibuGreenSOUL), new CosmosData(ibuGreenSOUL$info)),
   ibuGrid1: new CosmosImage(ibuGrid1),
   ibuGrid2: new CosmosImage(ibuGrid2),
   ibuGrid3: new CosmosImage(ibuGrid3),
   ibuGunshot1: new CosmosAnimationResources(new CosmosImage(ibuGunshot1), new CosmosData(ibuGunshot1$info)),
   ibuGunshot2: new CosmosImage(ibuGunshot2),
   ibuHarm: new CosmosImage(ibuHarm),
   ibuHP: new CosmosImage(ibuHP),
   ibuIndicator: new CosmosAnimationResources(new CosmosImage(ibuIndicator), new CosmosData(ibuIndicator$info)),
   ibuItem: new CosmosAnimationResources(new CosmosImage(sources.ibuItem), new CosmosData(sources.ibuItem$info)),
   ibuMercy: new CosmosAnimationResources(new CosmosImage(sources.ibuMercy), new CosmosData(sources.ibuMercy$info)),
   ibuMercydud: new CosmosImage(sources.ibuMercydud),
   ibuNotebook: new CosmosImage(ibuNotebook),
   ibuNotify: new CosmosAnimationResources(new CosmosImage(ibuNotify), new CosmosData(ibuNotify$info)),
   ibuOrangeSOUL: new CosmosAnimationResources(new CosmosImage(ibuOrangeSOUL), new CosmosData(ibuOrangeSOUL$info)),
   ibuPoof: new CosmosAnimationResources(new CosmosImage(ibuPoof), new CosmosData(ibuPoof$info)),
   ibuPressz: new CosmosImage(sources.ibuPressz),
   ibuPurpleSOUL: new CosmosAnimationResources(new CosmosImage(ibuPurpleSOUL), new CosmosData(ibuPurpleSOUL$info)),
   ibuRun: new CosmosAnimationResources(new CosmosImage(ibuRun), new CosmosData(ibuRun$info)),
   ibuSave: new CosmosAnimationResources(new CosmosImage(sources.ibuSave), new CosmosData(sources.ibuSave$info)),
   ibuShatter: new CosmosAnimationResources(new CosmosImage(ibuShatter), new CosmosData(ibuShatter$info)),
   ibuSOUL: new CosmosAnimationResources(new CosmosImage(ibuSOUL), new CosmosData(ibuSOUL$info)),
   ibuStar: new CosmosAnimationResources(new CosmosImage(ibuStar), new CosmosData(ibuStar$info)),
   ibuSwing: new CosmosAnimationResources(new CosmosImage(ibuSwing), new CosmosData(ibuSwing$info)),
   ibuYellowShot: new CosmosAnimationResources(new CosmosImage(ibuYellowShot), new CosmosData(ibuYellowShot$info)),
   ibuYellowSOUL: new CosmosAnimationResources(new CosmosImage(ibuYellowSOUL), new CosmosData(ibuYellowSOUL$info)),
   idcAlphysCutscene1: new CosmosImage(idcAlphysCutscene1),
   idcAlphysCutscene2: new CosmosImage(idcAlphysCutscene2),
   idcAlphysCutscene3: new CosmosImage(idcAlphysCutscene3),
   idcAlphysDontGetAllDreamyEyedOnMeNow: new CosmosImage(idcAlphysDontGetAllDreamyEyedOnMeNow),
   idcAlphysFr: new CosmosImage(idcAlphysFr),
   idcAlphysGarbo: new CosmosImage(idcAlphysGarbo),
   idcAlphysGarboCenter: new CosmosImage(idcAlphysGarboCenter),
   idcAlphysHaveSomeCompassion: new CosmosImage(idcAlphysHaveSomeCompassion),
   idcAlphysHellYeah: new CosmosImage(idcAlphysHellYeah),
   idcAlphysIdk: new CosmosImage(idcAlphysIdk),
   idcAlphysIdk2: new CosmosImage(idcAlphysIdk2),
   idcAlphysIdk3: new CosmosImage(idcAlphysIdk3),
   idcAlphysInquisitive: new CosmosImage(idcAlphysInquisitive),
   idcAlphysNervousLaugh: new CosmosImage(idcAlphysNervousLaugh),
   idcAlphysNeutralSweat: new CosmosImage(idcAlphysNeutralSweat),
   idcAlphysOhGodNo: new CosmosImage(idcAlphysOhGodNo),
   idcAlphysShocked: new CosmosImage(idcAlphysShocked),
   idcAlphysSide: new CosmosImage(idcAlphysSide),
   idcAlphysSideSad: new CosmosImage(idcAlphysSideSad),
   idcAlphysSmarmy: new CosmosImage(idcAlphysSmarmy),
   idcAlphysSmarmyAggressive: new CosmosImage(idcAlphysSmarmyAggressive),
   idcAlphysSmileSweat: new CosmosImage(idcAlphysSmileSweat),
   idcAlphysSoAwesome: new CosmosImage(idcAlphysSoAwesome),
   idcAlphysThatSucks: new CosmosImage(idcAlphysThatSucks),
   idcAlphysTheFactIs: new CosmosImage(idcAlphysTheFactIs),
   idcAlphysUhButHeresTheDeal: new CosmosImage(idcAlphysUhButHeresTheDeal),
   idcAlphysWelp: new CosmosImage(idcAlphysWelp),
   idcAlphysWhyOhWhy: new CosmosImage(idcAlphysWhyOhWhy),
   idcAlphysWorried: new CosmosImage(idcAlphysWorried),
   idcAlphysWtf: new CosmosImage(idcAlphysWtf),
   idcAlphysWtf2: new CosmosImage(idcAlphysWtf2),
   idcAlphysYeahYouKnowWhatsUp: new CosmosImage(idcAlphysYeahYouKnowWhatsUp),
   idcAlphysYeahYouKnowWhatsUpCenter: new CosmosImage(idcAlphysYeahYouKnowWhatsUpCenter),
   idcAlphysYupEverythingsFine: new CosmosImage(idcAlphysYupEverythingsFine),
   idcAsgoreBlank: new CosmosImage(idcAsgoreBlank),
   idcAsgoreBound: new CosmosAnimationResources(new CosmosImage(idcAsgoreBound), new CosmosData(idcAsgoreBound$info)),
   idcAsgoreBouttacry: new CosmosAnimationResources(
      new CosmosImage(idcAsgoreBouttacry),
      new CosmosData(idcAsgoreBouttacry$info)
   ),
   idcAsgoreBreak1: new CosmosImage(idcAsgoreBreak1),
   idcAsgoreBreak2: new CosmosImage(idcAsgoreBreak2),
   idcAsgoreContemplative: new CosmosAnimationResources(
      new CosmosImage(idcAsgoreContemplative),
      new CosmosData(idcAsgoreContemplative$info)
   ),
   idcAsgoreCry1: new CosmosAnimationResources(new CosmosImage(idcAsgoreCry1), new CosmosData(idcAsgoreCry1$info)),
   idcAsgoreCry2: new CosmosImage(idcAsgoreCry2),
   idcAsgoreCutscene1: new CosmosAnimationResources(
      new CosmosImage(idcAsgoreCutscene1),
      new CosmosData(idcAsgoreCutscene1$info)
   ),
   idcAsgoreFunni: new CosmosAnimationResources(new CosmosImage(idcAsgoreFunni), new CosmosData(idcAsgoreFunni$info)),
   idcAsgoreHmph: new CosmosAnimationResources(new CosmosImage(idcAsgoreHmph), new CosmosData(idcAsgoreHmph$info)),
   idcAsgoreHmphClosed: new CosmosAnimationResources(
      new CosmosImage(idcAsgoreHmphClosed),
      new CosmosData(idcAsgoreHmphClosed$info)
   ),
   idcAsgoreHopeful: new CosmosAnimationResources(
      new CosmosImage(idcAsgoreHopeful),
      new CosmosData(idcAsgoreHopeful$info)
   ),
   idcAsgoreHopefulSide: new CosmosAnimationResources(
      new CosmosImage(idcAsgoreHopefulSide),
      new CosmosData(idcAsgoreHopefulSide$info)
   ),
   idcAsgoreItsHim: new CosmosImage(idcAsgoreItsHim),
   idcAsgoreLoverboy: new CosmosAnimationResources(
      new CosmosImage(idcAsgoreLoverboy),
      new CosmosData(idcAsgoreLoverboy$info)
   ),
   idcAsgoreMad: new CosmosAnimationResources(new CosmosImage(idcAsgoreMad), new CosmosData(idcAsgoreMad$info)),
   idcAsgoreMadClosed: new CosmosAnimationResources(
      new CosmosImage(idcAsgoreMadClosed),
      new CosmosData(idcAsgoreMadClosed$info)
   ),
   idcAsgorePensive: new CosmosAnimationResources(
      new CosmosImage(idcAsgorePensive),
      new CosmosData(idcAsgorePensive$info)
   ),
   idcAsgorePensiveSmile: new CosmosAnimationResources(
      new CosmosImage(idcAsgorePensiveSmile),
      new CosmosData(idcAsgorePensiveSmile$info)
   ),
   idcAsgoreSide: new CosmosAnimationResources(new CosmosImage(idcAsgoreSide), new CosmosData(idcAsgoreSide$info)),
   idcAsgoreSmacked: new CosmosImage(idcAsgoreSmacked),
   idcAsgoreWat: new CosmosAnimationResources(new CosmosImage(idcAsgoreWat), new CosmosData(idcAsgoreWat$info)),
   idcAsgoreWhatHaveYouDone: new CosmosAnimationResources(
      new CosmosImage(idcAsgoreWhatHaveYouDone),
      new CosmosData(idcAsgoreWhatHaveYouDone$info)
   ),
   idcAsgoreWhatYouDoin: new CosmosAnimationResources(
      new CosmosImage(idcAsgoreWhatYouDoin),
      new CosmosData(idcAsgoreWhatYouDoin$info)
   ),
   idcAsrielBooped: new CosmosAnimationResources(
      new CosmosImage(idcAsrielBooped),
      new CosmosData(idcAsrielBooped$info)
   ),
   idcAsrielBoopedTrue: new CosmosAnimationResources(
      new CosmosImage(idcAsrielBooped, asrielTrueColorFilter),
      new CosmosData(idcAsrielBooped$info)
   ),
   idcAsrielCocky: new CosmosAnimationResources(new CosmosImage(idcAsrielCocky), new CosmosData(idcAsrielCocky$info)),
   idcAsrielCockyTrue: new CosmosAnimationResources(
      new CosmosImage(idcAsrielCocky, asrielTrueColorFilter),
      new CosmosData(idcAsrielCocky$info)
   ),
   idcAsrielDetermined: new CosmosAnimationResources(
      new CosmosImage(idcAsrielDetermined),
      new CosmosData(idcAsrielDetermined$info)
   ),
   idcAsrielEvil: new CosmosAnimationResources(new CosmosImage(idcAsrielEvil), new CosmosData(idcAsrielEvil$info)),
   idcAsrielEvilClosed: new CosmosAnimationResources(
      new CosmosImage(idcAsrielEvilClosed, asrielTrueColorFilter),
      new CosmosData(idcAsrielEvilClosed$info)
   ),
   idcAsrielEvilClosedTrue: new CosmosAnimationResources(
      new CosmosImage(idcAsrielEvilClosed, asrielTrueColorFilter),
      new CosmosData(idcAsrielEvilClosed$info)
   ),
   idcAsrielEvilTrue: new CosmosAnimationResources(
      new CosmosImage(idcAsrielEvil, asrielTrueColorFilter),
      new CosmosData(idcAsrielEvil$info)
   ),
   idcAsrielExhaust: new CosmosAnimationResources(
      new CosmosImage(idcAsrielExhaust),
      new CosmosData(idcAsrielExhaust$info)
   ),
   idcAsrielFear: new CosmosAnimationResources(new CosmosImage(idcAsrielFear), new CosmosData(idcAsrielFear$info)),
   idcAsrielFocus: new CosmosAnimationResources(new CosmosImage(idcAsrielFocus), new CosmosData(idcAsrielFocus$info)),
   idcAsrielFocusClosed: new CosmosAnimationResources(
      new CosmosImage(idcAsrielFocusClosed),
      new CosmosData(idcAsrielFocusClosed$info)
   ),
   idcAsrielFocusClosedTrue: new CosmosAnimationResources(
      new CosmosImage(idcAsrielFocusClosed, asrielTrueColorFilter),
      new CosmosData(idcAsrielFocusClosed$info)
   ),
   idcAsrielFocusSide: new CosmosAnimationResources(
      new CosmosImage(idcAsrielFocusSide),
      new CosmosData(idcAsrielFocusSide$info)
   ),
   idcAsrielFocusSideTrue: new CosmosAnimationResources(
      new CosmosImage(idcAsrielFocusSide, asrielTrueColorFilter),
      new CosmosData(idcAsrielFocusSide$info)
   ),
   idcAsrielFocusTrue: new CosmosAnimationResources(
      new CosmosImage(idcAsrielFocus, asrielTrueColorFilter),
      new CosmosData(idcAsrielFocus$info)
   ),
   idcAsrielFurrow: new CosmosAnimationResources(
      new CosmosImage(idcAsrielFurrow),
      new CosmosData(idcAsrielFurrow$info)
   ),
   idcAsrielFurrowTrue: new CosmosAnimationResources(
      new CosmosImage(idcAsrielFurrow, asrielTrueColorFilter),
      new CosmosData(idcAsrielFurrow$info)
   ),
   idcAsrielGrateful: new CosmosAnimationResources(
      new CosmosImage(idcAsrielGrateful),
      new CosmosData(idcAsrielGrateful$info)
   ),
   idcAsrielHmmOkayICanKindaSeeWhereYouCominFrom: new CosmosAnimationResources(
      new CosmosImage(idcAsrielHmmOkayICanKindaSeeWhereYouCominFrom),
      new CosmosData(idcAsrielHmmOkayICanKindaSeeWhereYouCominFrom$info)
   ),
   idcAsrielHuh: new CosmosAnimationResources(new CosmosImage(idcAsrielHuh), new CosmosData(idcAsrielHuh$info)),
   idcAsrielHuhTrue: new CosmosAnimationResources(
      new CosmosImage(idcAsrielHuh, asrielTrueColorFilter),
      new CosmosData(idcAsrielHuh$info)
   ),
   idcAsrielKawaii: new CosmosAnimationResources(
      new CosmosImage(idcAsrielKawaii),
      new CosmosData(idcAsrielKawaii$info)
   ),
   idcAsrielNervous: new CosmosAnimationResources(
      new CosmosImage(idcAsrielNervous),
      new CosmosData(idcAsrielNervous$info)
   ),
   idcAsrielNice: new CosmosAnimationResources(new CosmosImage(idcAsrielNice), new CosmosData(idcAsrielNice$info)),
   idcAsrielOhReally: new CosmosAnimationResources(
      new CosmosImage(idcAsrielOhReally),
      new CosmosData(idcAsrielOhReally$info)
   ),
   idcAsrielOhReallyClosed: new CosmosAnimationResources(
      new CosmosImage(idcAsrielOhReallyClosed),
      new CosmosData(idcAsrielOhReallyClosed$info)
   ),
   idcAsrielOhReallyClosedTrue: new CosmosAnimationResources(
      new CosmosImage(idcAsrielOhReallyClosed, asrielTrueColorFilter),
      new CosmosData(idcAsrielOhReallyClosed$info)
   ),
   idcAsrielOhReallyTrue: new CosmosAnimationResources(
      new CosmosImage(idcAsrielOhReally, asrielTrueColorFilter),
      new CosmosData(idcAsrielOhReally$info)
   ),
   idcAsrielPlain: new CosmosAnimationResources(new CosmosImage(idcAsrielPlain), new CosmosData(idcAsrielPlain$info)),
   idcAsrielPlainClosed: new CosmosAnimationResources(
      new CosmosImage(idcAsrielPlainClosed),
      new CosmosData(idcAsrielPlainClosed$info)
   ),
   idcAsrielPlainClosedTrue: new CosmosAnimationResources(
      new CosmosImage(idcAsrielPlainClosed, asrielTrueColorFilter),
      new CosmosData(idcAsrielPlainClosed$info)
   ),
   idcAsrielPlainTrue: new CosmosAnimationResources(
      new CosmosImage(idcAsrielPlain, asrielTrueColorFilter),
      new CosmosData(idcAsrielPlain$info)
   ),
   idcAsrielSade1: new CosmosImage(idcAsrielSade1),
   idcAsrielSade2: new CosmosImage(idcAsrielSade2),
   idcAsrielSade3: new CosmosImage(idcAsrielSade3),
   idcAsrielSmirk: new CosmosAnimationResources(new CosmosImage(idcAsrielSmirk), new CosmosData(idcAsrielSmirk$info)),
   idcAsrielSmirkHappy: new CosmosAnimationResources(
      new CosmosImage(idcAsrielSmirkHappy),
      new CosmosData(idcAsrielSmirkHappy$info)
   ),
   idcAsrielSmirkHappyTrue: new CosmosAnimationResources(
      new CosmosImage(idcAsrielSmirkHappy, asrielTrueColorFilter),
      new CosmosData(idcAsrielSmirkHappy$info)
   ),
   idcAsrielSmirkTrue: new CosmosAnimationResources(
      new CosmosImage(idcAsrielSmirk, asrielTrueColorFilter),
      new CosmosData(idcAsrielSmirk$info)
   ),
   idcAsrielSussmile: new CosmosAnimationResources(
      new CosmosImage(idcAsrielSussmile),
      new CosmosData(idcAsrielSussmile$info)
   ),
   idcAsrielTakumi: new CosmosImage(idcAsrielTakumi),
   idcAsrielWink: new CosmosImage(idcAsrielWink),
   idcKiddAww: new CosmosAnimationResources(new CosmosImage(idcKiddAww), new CosmosData(idcKiddAww$info)),
   idcKiddCutscene1: new CosmosAnimationResources(
      new CosmosImage(idcKiddCutscene1),
      new CosmosData(idcKiddCutscene1$info)
   ),
   idcKiddDetermined: new CosmosAnimationResources(
      new CosmosImage(idcKiddDetermined),
      new CosmosData(idcKiddDetermined$info)
   ),
   idcKiddHuh: new CosmosAnimationResources(new CosmosImage(idcKiddHuh), new CosmosData(idcKiddHuh$info)),
   idcKiddHuhSlave: new CosmosAnimationResources(
      new CosmosImage(idcKiddHuhSlave),
      new CosmosData(idcKiddHuhSlave$info)
   ),
   idcKiddKiller: new CosmosAnimationResources(new CosmosImage(idcKiddKiller), new CosmosData(idcKiddKiller$info)),
   idcKiddKillerSlave: new CosmosAnimationResources(
      new CosmosImage(idcKiddKillerSlave),
      new CosmosData(idcKiddKillerSlave$info)
   ),
   idcKiddNeutral: new CosmosAnimationResources(new CosmosImage(idcKiddNeutral), new CosmosData(idcKiddNeutral$info)),
   idcKiddNeutralSlave: new CosmosAnimationResources(
      new CosmosImage(idcKiddNeutralSlave),
      new CosmosData(idcKiddNeutralSlave$info)
   ),
   idcKiddSerene: new CosmosAnimationResources(new CosmosImage(idcKiddSerene), new CosmosData(idcKiddSerene$info)),
   idcKiddShocked: new CosmosAnimationResources(new CosmosImage(idcKiddShocked), new CosmosData(idcKiddShocked$info)),
   idcKiddShockedSlave: new CosmosAnimationResources(
      new CosmosImage(idcKiddShockedSlave),
      new CosmosData(idcKiddShockedSlave$info)
   ),
   idcKiddSide: new CosmosAnimationResources(new CosmosImage(idcKiddSide), new CosmosData(idcKiddSide$info)),
   idcKiddStarstruck: new CosmosAnimationResources(
      new CosmosImage(idcKiddStarstruck),
      new CosmosData(idcKiddStarstruck$info)
   ),
   idcMettatonNeo: new CosmosImage(idcMettatonNeo),
   idcPapyrusAYAYA: new CosmosAnimationResources(
      new CosmosImage(idcPapyrusAYAYA),
      new CosmosData(idcPapyrusAYAYA$info)
   ),
   idcPapyrusAyoo: new CosmosAnimationResources(new CosmosImage(idcPapyrusAyoo), new CosmosData(idcPapyrusAyoo$info)),
   idcPapyrusCutscene1: new CosmosAnimationResources(
      new CosmosImage(idcPapyrusCutscene1),
      new CosmosData(idcPapyrusCutscene1$info)
   ),
   idcPapyrusDisbeef: new CosmosAnimationResources(
      new CosmosImage(idcPapyrusDisbeef),
      new CosmosData(idcPapyrusDisbeef$info)
   ),
   idcPapyrusDisbeefTurnaround: new CosmosAnimationResources(
      new CosmosImage(idcPapyrusDisbeefTurnaround),
      new CosmosData(idcPapyrusDisbeefTurnaround$info)
   ),
   idcPapyrusIsthatso: new CosmosAnimationResources(
      new CosmosImage(idcPapyrusIsthatso),
      new CosmosData(idcPapyrusIsthatso$info)
   ),
   idcPapyrusNervousLaugh: new CosmosAnimationResources(
      new CosmosImage(idcPapyrusNervousLaugh),
      new CosmosData(idcPapyrusNervousLaugh$info)
   ),
   idcPapyrusNervousSweat: new CosmosAnimationResources(
      new CosmosImage(idcPapyrusNervousSweat),
      new CosmosData(idcPapyrusNervousSweat$info)
   ),
   idcPapyrusNyeh: new CosmosAnimationResources(new CosmosImage(idcPapyrusNyeh), new CosmosData(idcPapyrusNyeh$info)),
   idcPapyrusSad: new CosmosAnimationResources(new CosmosImage(idcPapyrusSad), new CosmosData(idcPapyrusSad$info)),
   idcPapyrusSadSweat: new CosmosAnimationResources(
      new CosmosImage(idcPapyrusSadSweat),
      new CosmosData(idcPapyrusSadSweat$info)
   ),
   idcPapyrusThisissosad: new CosmosAnimationResources(
      new CosmosImage(idcPapyrusThisissosad),
      new CosmosData(idcPapyrusThisissosad$info)
   ),
   idcPapyrusWhatchagonnado: new CosmosAnimationResources(
      new CosmosImage(idcPapyrusWhatchagonnado),
      new CosmosData(idcPapyrusWhatchagonnado$info)
   ),
   idcSansBlink: new CosmosImage(idcSansBlink),
   idcSansBlinkTomato: new CosmosImage(idcSansBlinkTomato),
   idcSansEmpty: new CosmosImage(idcSansEmpty),
   idcSansEye: new CosmosAnimationResources(new CosmosImage(idcSansEye), new CosmosData(idcSansEye$info)),
   idcSansLaugh1: new CosmosImage(idcSansLaugh1),
   idcSansLaugh2: new CosmosImage(idcSansLaugh2),
   idcSansNormal: new CosmosImage(idcSansNormal),
   idcSansWink: new CosmosImage(idcSansWink),
   idcSansWinkTomato: new CosmosImage(idcSansWinkTomato),
   idcTorielBlank: new CosmosImage(idcTorielBlank),
   idcTorielBlush: new CosmosAnimationResources(new CosmosImage(idcTorielBlush), new CosmosData(idcTorielBlush$info)),
   idcTorielCompassion: new CosmosAnimationResources(
      new CosmosImage(idcTorielCompassion),
      new CosmosData(idcTorielCompassion$info)
   ),
   idcTorielCompassionfrown: new CosmosAnimationResources(
      new CosmosImage(idcTorielCompassionfrown),
      new CosmosData(idcTorielCompassionfrown$info)
   ),
   idcTorielCompassionsmile: new CosmosAnimationResources(
      new CosmosImage(idcTorielCompassionsmile),
      new CosmosData(idcTorielCompassionsmile$info)
   ),
   idcTorielConcern: new CosmosAnimationResources(
      new CosmosImage(idcTorielConcern),
      new CosmosData(idcTorielConcern$info)
   ),
   idcTorielCry: new CosmosAnimationResources(new CosmosImage(idcTorielCry), new CosmosData(idcTorielCry$info)),
   idcTorielCrylaugh: new CosmosAnimationResources(
      new CosmosImage(idcTorielCrylaugh),
      new CosmosData(idcTorielCrylaugh$info)
   ),
   idcTorielCutscene1: new CosmosAnimationResources(
      new CosmosImage(idcTorielCutscene1),
      new CosmosData(idcTorielCutscene1$info)
   ),
   idcTorielCutscene2: new CosmosAnimationResources(
      new CosmosImage(idcTorielCutscene2),
      new CosmosData(idcTorielCutscene2$info)
   ),
   idcTorielDreamworks: new CosmosAnimationResources(
      new CosmosImage(idcTorielDreamworks),
      new CosmosData(idcTorielDreamworks$info)
   ),
   idcTorielEverythingisfine: new CosmosAnimationResources(
      new CosmosImage(idcTorielEverythingisfine),
      new CosmosData(idcTorielEverythingisfine$info)
   ),
   idcTorielLowconcern: new CosmosAnimationResources(
      new CosmosImage(idcTorielLowconcern),
      new CosmosData(idcTorielLowconcern$info)
   ),
   idcTorielMad: new CosmosAnimationResources(new CosmosImage(idcTorielMad), new CosmosData(idcTorielMad$info)),
   idcTorielSad: new CosmosAnimationResources(new CosmosImage(idcTorielSad), new CosmosData(idcTorielSad$info)),
   idcTorielShock: new CosmosAnimationResources(new CosmosImage(idcTorielShock), new CosmosData(idcTorielShock$info)),
   idcTorielSincere: new CosmosAnimationResources(
      new CosmosImage(idcTorielSincere),
      new CosmosData(idcTorielSincere$info)
   ),
   idcTorielSmallxd: new CosmosAnimationResources(
      new CosmosImage(idcTorielSmallxd),
      new CosmosData(idcTorielSmallxd$info)
   ),
   idcTorielStraightup: new CosmosAnimationResources(
      new CosmosImage(idcTorielStraightup),
      new CosmosData(idcTorielStraightup$info)
   ),
   idcTorielSus: new CosmosImage(idcTorielSus),
   idcTorielTired: new CosmosAnimationResources(new CosmosImage(idcTorielTired), new CosmosData(idcTorielTired$info)),
   idcTorielWtf: new CosmosAnimationResources(new CosmosImage(idcTorielWtf), new CosmosData(idcTorielWtf$info)),
   idcTorielWtf2: new CosmosAnimationResources(new CosmosImage(idcTorielWtf2), new CosmosData(idcTorielWtf2$info)),
   idcTorielXd: new CosmosAnimationResources(new CosmosImage(idcTorielXd), new CosmosData(idcTorielXd$info)),
   idcTwinklyBroken: new CosmosAnimationResources(
      new CosmosImage(idcTwinklyBroken),
      new CosmosData(idcTwinklyBroken$info)
   ),
   idcTwinklyCapping: new CosmosAnimationResources(
      new CosmosImage(idcTwinklyCapping),
      new CosmosData(idcTwinklyCapping$info)
   ),
   idcTwinklyCrazed: new CosmosAnimationResources(
      new CosmosImage(idcTwinklyCrazed),
      new CosmosData(idcTwinklyCrazed$info)
   ),
   idcTwinklyDead: new CosmosAnimationResources(new CosmosImage(idcTwinklyDead), new CosmosData(idcTwinklyDead$info)),
   idcTwinklyEvil: new CosmosAnimationResources(new CosmosImage(idcTwinklyEvil), new CosmosData(idcTwinklyEvil$info)),
   idcTwinklyGonk: new CosmosAnimationResources(new CosmosImage(idcTwinklyGonk), new CosmosData(idcTwinklyGonk$info)),
   idcTwinklyGrin: new CosmosAnimationResources(new CosmosImage(idcTwinklyGrin), new CosmosData(idcTwinklyGrin$info)),
   idcTwinklyHurt: new CosmosImage(idcTwinklyHurt),
   idcTwinklyKawaii: new CosmosAnimationResources(
      new CosmosImage(idcTwinklyKawaii),
      new CosmosData(idcTwinklyKawaii$info)
   ),
   idcTwinklyLaugh: new CosmosAnimationResources(
      new CosmosImage(idcTwinklyLaugh),
      new CosmosData(idcTwinklyLaugh$info)
   ),
   idcTwinklyLose1: new CosmosImage(idcTwinklyLose1),
   idcTwinklyLose2: new CosmosImage(idcTwinklyLose2),
   idcTwinklyLose3: new CosmosImage(idcTwinklyLose3),
   idcTwinklyLose4: new CosmosImage(idcTwinklyLose4),
   idcTwinklyNice: new CosmosAnimationResources(new CosmosImage(idcTwinklyNice), new CosmosData(idcTwinklyNice$info)),
   idcTwinklyPissed: new CosmosAnimationResources(
      new CosmosImage(idcTwinklyPissed),
      new CosmosData(idcTwinklyPissed$info)
   ),
   idcTwinklyPlain: new CosmosAnimationResources(
      new CosmosImage(idcTwinklyPlain),
      new CosmosData(idcTwinklyPlain$info)
   ),
   idcTwinklyPlead: new CosmosImage(idcTwinklyPlead),
   idcTwinklyRegret: new CosmosAnimationResources(
      new CosmosImage(idcTwinklyRegret),
      new CosmosData(idcTwinklyRegret$info)
   ),
   idcTwinklySassy: new CosmosAnimationResources(
      new CosmosImage(idcTwinklySassy),
      new CosmosData(idcTwinklySassy$info)
   ),
   idcTwinklySide: new CosmosAnimationResources(new CosmosImage(idcTwinklySide), new CosmosData(idcTwinklySide$info)),
   idcTwinklyTwisted: new CosmosImage(idcTwinklyTwisted),
   idcTwinklyWink: new CosmosImage(idcTwinklyWink),
   idcUndyneAngryTomato: new CosmosImage(idcUndyneAngryTomato),
   idcUndyneBattleTorso: new CosmosImage(idcUndyneBattleTorso),
   idcUndyneBeingAwesomeForTenMinutesStraight: new CosmosImage(idcUndyneBeingAwesomeForTenMinutesStraight),
   idcUndyneCutscene1: new CosmosImage(idcUndyneCutscene1),
   idcUndyneDafuq: new CosmosImage(idcUndyneDafuq),
   idcUndyneDateTorsoBody: new CosmosImage(idcUndyneDateTorsoBody),
   idcUndyneGrr: new CosmosImage(idcUndyneGrr),
   idcUndyneGrrSide: new CosmosImage(idcUndyneGrrSide),
   idcUndyneHappyTomato: new CosmosImage(idcUndyneHappyTomato),
   idcUndyneImOntoYouPunk: new CosmosImage(idcUndyneImOntoYouPunk),
   idcUndyneLaughcrazy: new CosmosImage(idcUndyneLaughcrazy),
   idcUndynePensive: new CosmosImage(idcUndynePensive),
   idcUndyneSquidgames: new CosmosImage(idcUndyneSquidgames),
   idcUndyneSus: new CosmosImage(idcUndyneSus),
   idcUndyneSweating: new CosmosImage(idcUndyneSweating),
   idcUndyneTheHell: new CosmosImage(idcUndyneTheHell),
   idcUndyneUwu: new CosmosImage(idcUndyneUwu),
   idcUndyneWhatevs: new CosmosImage(idcUndyneWhatevs),
   idcUndyneWtfbro: new CosmosImage(idcUndyneWtfbro),
   idcUndyneYouKilledHim: new CosmosImage(idcUndyneYouKilledHim),
   idcUndyneYouKilledHimPensive: new CosmosImage(idcUndyneYouKilledHimPensive),
   idcUndyneYouKilledHimSide: new CosmosImage(idcUndyneYouKilledHimSide),
   idcUndyneYouKilledHimSmile: new CosmosImage(idcUndyneYouKilledHimSmile),
   idcUndyneYouKilledHimStare: new CosmosImage(idcUndyneYouKilledHimStare),
   ieBarrier: new CosmosAnimationResources(new CosmosImage(ieBarrier), new CosmosData(ieBarrier$info)),
   ieBossSOUL: new CosmosImage(ieBossSOUL),
   ieButtonC: new CosmosImage(ieButtonC),
   ieButtonF: new CosmosImage(ieButtonF),
   ieButtonM: new CosmosImage(ieButtonM),
   ieButtonX: new CosmosImage(ieButtonX),
   ieButtonZ: new CosmosImage(ieButtonZ),
   ieEurybia: new CosmosImage(ieEurybia),
   ieGay: new CosmosAnimationResources(new CosmosImage(ieGay), new CosmosData(ieGay$info)),
   ieHomeworld: new CosmosImage(ieHomeworld),
   iePunchcard: new CosmosImage(sources.iePunchcard),
   ieReal: new CosmosImage(ieReal),
   ieSOUL: new CosmosImage(ieSOUL),
   ieSplashBackground: new CosmosImage(ieSplashBackground),
   ieSplashForeground: new CosmosImage(ieSplashForeground),
   ieStarbertA: new CosmosAnimationResources(
      new CosmosImage(sources.ieStarbertA),
      new CosmosData(sources.ieStarbertA$info)
   ),
   ieStarbertArrow: new CosmosImage(ieStarbertArrow),
   ieStarbertB: new CosmosAnimationResources(
      new CosmosImage(sources.ieStarbertB),
      new CosmosData(sources.ieStarbertB$info)
   ),
   ieStarbertBGum: new CosmosImage(ieStarbertBGum),
   ieStarbertC: new CosmosAnimationResources(
      new CosmosImage(sources.ieStarbertC),
      new CosmosData(sources.ieStarbertC$info)
   ),
   ieStory: new CosmosAnimationResources(new CosmosImage(ieStory), new CosmosData(ieStory$info)),
   ieStoryParallax1: new CosmosImage(ieStoryParallax1),
   ieStoryParallax2: new CosmosImage(ieStoryParallax2),
   ieStoryParallax3: new CosmosImage(ieStoryParallax3),
   ieStoryParallax4: new CosmosImage(ieStoryParallax4),
   ieStoryParallax5: new CosmosImage(ieStoryParallax5),
   ieTelescope: new CosmosImage(ieTelescope),
   iocAlphysDown: new CosmosAnimationResources(new CosmosImage(iocAlphysDown), new CosmosData(iocAlphysDown$info)),
   iocAlphysDownSad: new CosmosAnimationResources(
      new CosmosImage(iocAlphysDownSad),
      new CosmosData(iocAlphysDownSad$info)
   ),
   iocAlphysDownSadTalk: new CosmosAnimationResources(
      new CosmosImage(iocAlphysDownSadTalk),
      new CosmosData(iocAlphysDownSadTalk$info)
   ),
   iocAlphysDownTalk: new CosmosAnimationResources(
      new CosmosImage(iocAlphysDownTalk),
      new CosmosData(iocAlphysDownTalk$info)
   ),
   iocAlphysFreaked: new CosmosImage(iocAlphysFreaked),
   iocAlphysLeft: new CosmosAnimationResources(new CosmosImage(iocAlphysLeft), new CosmosData(iocAlphysLeft$info)),
   iocAlphysLeftSad: new CosmosAnimationResources(
      new CosmosImage(iocAlphysLeftSad),
      new CosmosData(iocAlphysLeftSad$info)
   ),
   iocAlphysLeftSadTalk: new CosmosAnimationResources(
      new CosmosImage(iocAlphysLeftSadTalk),
      new CosmosData(iocAlphysLeftSadTalk$info)
   ),
   iocAlphysLeftTalk: new CosmosAnimationResources(
      new CosmosImage(iocAlphysLeftTalk),
      new CosmosData(iocAlphysLeftTalk$info)
   ),
   iocAlphysRight: new CosmosAnimationResources(new CosmosImage(iocAlphysRight), new CosmosData(iocAlphysRight$info)),
   iocAlphysRightSad: new CosmosAnimationResources(
      new CosmosImage(iocAlphysRightSad),
      new CosmosData(iocAlphysRightSad$info)
   ),
   iocAlphysRightSadTalk: new CosmosAnimationResources(
      new CosmosImage(iocAlphysRightSadTalk),
      new CosmosData(iocAlphysRightSadTalk$info)
   ),
   iocAlphysRightTalk: new CosmosAnimationResources(
      new CosmosImage(iocAlphysRightTalk),
      new CosmosData(iocAlphysRightTalk$info)
   ),
   iocAlphysSit: new CosmosAnimationResources(new CosmosImage(iocAlphysSit), new CosmosData(iocAlphysSit$info)),
   iocAlphysSitdown: new CosmosImage(iocAlphysSitdown),
   iocAlphysSitonion: new CosmosImage(iocAlphysSitonion),
   iocAlphysSitred: new CosmosAnimationResources(
      new CosmosImage(iocAlphysSitred),
      new CosmosData(iocAlphysSitred$info)
   ),
   iocAlphysUp: new CosmosAnimationResources(new CosmosImage(iocAlphysUp), new CosmosData(iocAlphysUp$info)),
   iocAlphysUpTalk: new CosmosImage(iocAlphysUpTalk),
   iocAsgoreAsrielhug: new CosmosAnimationResources(
      new CosmosImage(iocAsgoreAsrielhug),
      new CosmosData(iocAsgoreAsrielhug$info)
   ),
   iocAsgoreBound: new CosmosAnimationResources(new CosmosImage(iocAsgoreBound), new CosmosData(iocAsgoreBound$info)),
   iocAsgoreBreak: new CosmosAnimationResources(new CosmosImage(iocAsgoreBreak), new CosmosData(iocAsgoreBreak$info)),
   iocAsgoreDeath: new CosmosAnimationResources(new CosmosImage(iocAsgoreDeath), new CosmosData(iocAsgoreDeath$info)),
   iocAsgoreDeathAlt: new CosmosAnimationResources(
      new CosmosImage(iocAsgoreDeathAlt),
      new CosmosData(iocAsgoreDeathAlt$info)
   ),
   iocAsgoreDown: new CosmosAnimationResources(new CosmosImage(iocAsgoreDown), new CosmosData(iocAsgoreDown$info)),
   iocAsgoreDownHappy: new CosmosAnimationResources(
      new CosmosImage(iocAsgoreDownHappy),
      new CosmosData(iocAsgoreDownHappy$info)
   ),
   iocAsgoreDownTalk: new CosmosAnimationResources(
      new CosmosImage(iocAsgoreDownTalk),
      new CosmosData(iocAsgoreDownTalk$info)
   ),
   iocAsgoreDownTalkHappy: new CosmosAnimationResources(
      new CosmosImage(iocAsgoreDownTalkHappy),
      new CosmosData(iocAsgoreDownTalkHappy$info)
   ),
   iocAsgoreLeft: new CosmosAnimationResources(new CosmosImage(iocAsgoreLeft), new CosmosData(iocAsgoreLeft$info)),
   iocAsgoreLeftHappy: new CosmosAnimationResources(
      new CosmosImage(iocAsgoreLeftHappy),
      new CosmosData(iocAsgoreLeftHappy$info)
   ),
   iocAsgoreLeftTalk: new CosmosAnimationResources(
      new CosmosImage(iocAsgoreLeftTalk),
      new CosmosData(iocAsgoreLeftTalk$info)
   ),
   iocAsgoreLeftTalkHappy: new CosmosAnimationResources(
      new CosmosImage(iocAsgoreLeftTalkHappy),
      new CosmosData(iocAsgoreLeftTalkHappy$info)
   ),
   iocAsgoreRight: new CosmosAnimationResources(new CosmosImage(iocAsgoreRight), new CosmosData(iocAsgoreRight$info)),
   iocAsgoreRightHappy: new CosmosAnimationResources(
      new CosmosImage(iocAsgoreRightHappy),
      new CosmosData(iocAsgoreRightHappy$info)
   ),
   iocAsgoreRightTalk: new CosmosAnimationResources(
      new CosmosImage(iocAsgoreRightTalk),
      new CosmosData(iocAsgoreRightTalk$info)
   ),
   iocAsgoreRightTalkHappy: new CosmosAnimationResources(
      new CosmosImage(iocAsgoreRightTalkHappy),
      new CosmosData(iocAsgoreRightTalkHappy$info)
   ),
   iocAsgoreUp: new CosmosAnimationResources(new CosmosImage(iocAsgoreUp), new CosmosData(iocAsgoreUp$info)),
   iocAsgoreUpTalk: new CosmosImage(iocAsgoreUpTalk),
   iocAsrielBow: new CosmosAnimationResources(new CosmosImage(iocAsrielBow), new CosmosData(iocAsrielBow$info)),
   iocAsrielCry1: new CosmosAnimationResources(new CosmosImage(iocAsrielCry1), new CosmosData(iocAsrielCry1$info)),
   iocAsrielCry2: new CosmosAnimationResources(new CosmosImage(iocAsrielCry2), new CosmosData(iocAsrielCry2$info)),
   iocAsrielCry3: new CosmosAnimationResources(new CosmosImage(iocAsrielCry3), new CosmosData(iocAsrielCry3$info)),
   iocAsrielDown: new CosmosAnimationResources(new CosmosImage(iocAsrielDown), new CosmosData(iocAsrielDown$info)),
   iocAsrielDownTalk: new CosmosAnimationResources(
      new CosmosImage(iocAsrielDownTalk),
      new CosmosData(iocAsrielDownTalk$info)
   ),
   iocAsrielEarTug: new CosmosAnimationResources(
      new CosmosImage(iocAsrielEarTug),
      new CosmosData(iocAsrielEarTug$info)
   ),
   iocAsrielEarTugWater: new CosmosAnimationResources(
      new CosmosImage(iocAsrielEarTugWater),
      new CosmosData(iocAsrielEarTugWater$info)
   ),
   iocAsrielFly1: new CosmosAnimationResources(new CosmosImage(iocAsrielFly1), new CosmosData(iocAsrielFly1$info)),
   iocAsrielFly2: new CosmosAnimationResources(new CosmosImage(iocAsrielFly2), new CosmosData(iocAsrielFly2$info)),
   iocAsrielHug1: new CosmosAnimationResources(new CosmosImage(iocAsrielHug1), new CosmosData(iocAsrielHug1$info)),
   iocAsrielHug1Normal: new CosmosAnimationResources(
      new CosmosImage(iocAsrielHug1),
      new CosmosData(iocAsrielHug1$info)
   ),
   iocAsrielHug1NormalWater: new CosmosAnimationResources(
      new CosmosImage(iocAsrielHug1Water),
      new CosmosData(iocAsrielHug1Water$info)
   ),
   iocAsrielHug2: new CosmosAnimationResources(new CosmosImage(iocAsrielHug2), new CosmosData(iocAsrielHug2$info)),
   iocAsrielHug3: new CosmosAnimationResources(new CosmosImage(iocAsrielHug3), new CosmosData(iocAsrielHug3$info)),
   iocAsrielKneel: new CosmosImage(iocAsrielKneel),
   iocAsrielLeft: new CosmosAnimationResources(new CosmosImage(iocAsrielLeft), new CosmosData(iocAsrielLeft$info)),
   iocAsrielLeftTalk: new CosmosAnimationResources(
      new CosmosImage(iocAsrielLeftTalk),
      new CosmosData(iocAsrielLeftTalk$info)
   ),
   iocAsrielPet: new CosmosAnimationResources(new CosmosImage(iocAsrielPet), new CosmosData(iocAsrielPet$info)),
   iocAsrielPetWater: new CosmosAnimationResources(
      new CosmosImage(iocAsrielPetWater),
      new CosmosData(iocAsrielPetWater$info)
   ),
   iocAsrielRight: new CosmosAnimationResources(new CosmosImage(iocAsrielRight), new CosmosData(iocAsrielRight$info)),
   iocAsrielRightHandhold: new CosmosAnimationResources(
      new CosmosImage(iocAsrielRightHandhold),
      new CosmosData(iocAsrielRightHandhold$info)
   ),
   iocAsrielRightHandholdWater: new CosmosAnimationResources(
      new CosmosImage(iocAsrielRightHandholdWater),
      new CosmosData(iocAsrielRightHandholdWater$info)
   ),
   iocAsrielRightTalk: new CosmosAnimationResources(
      new CosmosImage(iocAsrielRightTalk),
      new CosmosData(iocAsrielRightTalk$info)
   ),
   iocAsrielSleepingbeauty: new CosmosImage(iocAsrielSleepingbeauty),
   iocAsrielSleepingsadly: new CosmosImage(iocAsrielSleepingsadly),
   iocAsrielTrueDown: new CosmosAnimationResources(
      new CosmosImage(iocAsrielTrueDown),
      new CosmosData(iocAsrielTrueDown$info)
   ),
   iocAsrielTrueDownHome: new CosmosImage(iocAsrielTrueDownHome),
   iocAsrielTrueDownHomeTalk: new CosmosAnimationResources(
      new CosmosImage(iocAsrielTrueDownHomeTalk),
      new CosmosData(iocAsrielTrueDownHomeTalk$info)
   ),
   iocAsrielTrueDownSad: new CosmosAnimationResources(
      new CosmosImage(iocAsrielTrueDownSad),
      new CosmosData(iocAsrielTrueDownSad$info)
   ),
   iocAsrielTrueDownTalk: new CosmosAnimationResources(
      new CosmosImage(iocAsrielTrueDownTalk),
      new CosmosData(iocAsrielTrueDownTalk$info)
   ),
   iocAsrielTrueDownTalkSad: new CosmosAnimationResources(
      new CosmosImage(iocAsrielTrueDownTalkSad),
      new CosmosData(iocAsrielTrueDownTalkSad$info)
   ),
   iocAsrielTrueLeft: new CosmosAnimationResources(
      new CosmosImage(iocAsrielTrueLeft),
      new CosmosData(iocAsrielTrueLeft$info)
   ),
   iocAsrielTrueLeftHome: new CosmosImage(iocAsrielTrueLeftHome),
   iocAsrielTrueLeftHomeTalk: new CosmosAnimationResources(
      new CosmosImage(iocAsrielTrueLeftHomeTalk),
      new CosmosData(iocAsrielTrueLeftHomeTalk$info)
   ),
   iocAsrielTrueLeftSad: new CosmosAnimationResources(
      new CosmosImage(iocAsrielTrueLeftSad),
      new CosmosData(iocAsrielTrueLeftSad$info)
   ),
   iocAsrielTrueLeftSadTalk: new CosmosAnimationResources(
      new CosmosImage(iocAsrielTrueLeftSadTalk),
      new CosmosData(iocAsrielTrueLeftSadTalk$info)
   ),
   iocAsrielTrueLeftTalk: new CosmosAnimationResources(
      new CosmosImage(iocAsrielTrueLeftTalk),
      new CosmosData(iocAsrielTrueLeftTalk$info)
   ),
   iocAsrielTrueRight: new CosmosAnimationResources(
      new CosmosImage(iocAsrielTrueRight),
      new CosmosData(iocAsrielTrueRight$info)
   ),
   iocAsrielTrueRightHome: new CosmosImage(iocAsrielTrueRightHome),
   iocAsrielTrueRightHomeTalk: new CosmosAnimationResources(
      new CosmosImage(iocAsrielTrueRightHomeTalk),
      new CosmosData(iocAsrielTrueRightHomeTalk$info)
   ),
   iocAsrielTrueRightSad: new CosmosAnimationResources(
      new CosmosImage(iocAsrielTrueRightSad),
      new CosmosData(iocAsrielTrueRightSad$info)
   ),
   iocAsrielTrueRightSadTalk: new CosmosAnimationResources(
      new CosmosImage(iocAsrielTrueRightSadTalk),
      new CosmosData(iocAsrielTrueRightSadTalk$info)
   ),
   iocAsrielTrueRightTalk: new CosmosAnimationResources(
      new CosmosImage(iocAsrielTrueRightTalk),
      new CosmosData(iocAsrielTrueRightTalk$info)
   ),
   iocAsrielUp: new CosmosAnimationResources(new CosmosImage(iocAsrielUp), new CosmosData(iocAsrielUp$info)),
   iocAsrielUpHome: new CosmosImage(iocAsrielUpHome),
   iocAsrielUpTalk: new CosmosAnimationResources(
      new CosmosImage(iocAsrielUpTalk),
      new CosmosData(iocAsrielUpTalk$info)
   ),
   iocFriskDown: new CosmosAnimationResources(new CosmosImage(iocFriskDown), new CosmosData(iocFriskDown$info)),
   iocFriskDownArchive: new CosmosAnimationResources(
      new CosmosImage(iocFriskDownArchive),
      new CosmosData(iocFriskDownArchive$info)
   ),
   iocFriskDownChara: new CosmosAnimationResources(
      new CosmosImage(iocFriskDownChara),
      new CosmosData(iocFriskDownChara$info)
   ),
   iocFriskDownCharaFake: new CosmosAnimationResources(
      new CosmosImage(iocFriskDownCharaFake),
      new CosmosData(iocFriskDownCharaFake$info)
   ),
   iocFriskDownHome: new CosmosAnimationResources(
      new CosmosImage(iocFriskDownHome),
      new CosmosData(iocFriskDownHome$info)
   ),
   iocFriskDownJetpack: new CosmosAnimationResources(
      new CosmosImage(iocFriskDownJetpack),
      new CosmosData(iocFriskDownJetpack$info)
   ),
   iocFriskDownJetpackOff: new CosmosImage(iocFriskDownJetpackOff),
   iocFriskDownMirror: new CosmosAnimationResources(
      new CosmosImage(iocFriskDownMirror),
      new CosmosData(iocFriskDownMirror$info)
   ),
   iocFriskDownMirrorHome: new CosmosAnimationResources(
      new CosmosImage(iocFriskDownMirrorHome),
      new CosmosData(iocFriskDownMirrorHome$info)
   ),
   iocFriskDownMirrorWater: new CosmosAnimationResources(
      new CosmosImage(iocFriskDownMirrorWater),
      new CosmosData(iocFriskDownMirrorWater$info)
   ),
   iocFriskDownWater: new CosmosAnimationResources(
      new CosmosImage(iocFriskDownWater),
      new CosmosData(iocFriskDownWater$info)
   ),
   iocFriskDownWaterArchive: new CosmosAnimationResources(
      new CosmosImage(iocFriskDownWaterArchive),
      new CosmosData(iocFriskDownWaterArchive$info)
   ),
   iocFriskDownWaterJetpack: new CosmosAnimationResources(
      new CosmosImage(iocFriskDownWaterJetpack),
      new CosmosData(iocFriskDownWaterJetpack$info)
   ),
   iocFriskDownWaterJetpackOff: new CosmosImage(iocFriskDownWaterJetpackOff),
   iocFriskLeft: new CosmosAnimationResources(new CosmosImage(iocFriskLeft), new CosmosData(iocFriskLeft$info)),
   iocFriskLeftArchive: new CosmosAnimationResources(
      new CosmosImage(iocFriskLeftArchive),
      new CosmosData(iocFriskLeftArchive$info)
   ),
   iocFriskLeftChara: new CosmosAnimationResources(
      new CosmosImage(iocFriskLeftChara),
      new CosmosData(iocFriskLeftChara$info)
   ),
   iocFriskLeftCharaFake: new CosmosAnimationResources(
      new CosmosImage(iocFriskLeftCharaFake),
      new CosmosData(iocFriskLeftCharaFake$info)
   ),
   iocFriskLeftHome: new CosmosAnimationResources(
      new CosmosImage(iocFriskLeftHome),
      new CosmosData(iocFriskLeftHome$info)
   ),
   iocFriskLeftJetpack: new CosmosAnimationResources(
      new CosmosImage(iocFriskLeftJetpack),
      new CosmosData(iocFriskLeftJetpack$info)
   ),
   iocFriskLeftJetpackOff: new CosmosImage(iocFriskLeftJetpackOff),
   iocFriskLeftMirror: new CosmosAnimationResources(
      new CosmosImage(iocFriskLeftMirror),
      new CosmosData(iocFriskLeftMirror$info)
   ),
   iocFriskLeftMirrorHome: new CosmosAnimationResources(
      new CosmosImage(iocFriskLeftMirrorHome),
      new CosmosData(iocFriskLeftMirrorHome$info)
   ),
   iocFriskLeftMirrorWater: new CosmosAnimationResources(
      new CosmosImage(iocFriskLeftMirrorWater),
      new CosmosData(iocFriskLeftMirrorWater$info)
   ),
   iocFriskLeftWater: new CosmosAnimationResources(
      new CosmosImage(iocFriskLeftWater),
      new CosmosData(iocFriskLeftWater$info)
   ),
   iocFriskLeftWaterArchive: new CosmosAnimationResources(
      new CosmosImage(iocFriskLeftWaterArchive),
      new CosmosData(iocFriskLeftWaterArchive$info)
   ),
   iocFriskLeftWaterJetpack: new CosmosAnimationResources(
      new CosmosImage(iocFriskLeftWaterJetpack),
      new CosmosData(iocFriskLeftWaterJetpack$info)
   ),
   iocFriskLeftWaterJetpackOff: new CosmosImage(iocFriskLeftWaterJetpackOff),
   iocFriskLeftWaterPour: new CosmosAnimationResources(
      new CosmosImage(iocFriskLeftWaterPour),
      new CosmosData(iocFriskLeftWaterPour$info)
   ),
   iocFriskPat: new CosmosAnimationResources(new CosmosImage(iocFriskPat), new CosmosData(iocFriskPat$info)),
   iocFriskRight: new CosmosAnimationResources(new CosmosImage(iocFriskRight), new CosmosData(iocFriskRight$info)),
   iocFriskRightArchive: new CosmosAnimationResources(
      new CosmosImage(iocFriskRightArchive),
      new CosmosData(iocFriskRightArchive$info)
   ),
   iocFriskRightChara: new CosmosAnimationResources(
      new CosmosImage(iocFriskRightChara),
      new CosmosData(iocFriskRightChara$info)
   ),
   iocFriskRightCharaFake: new CosmosAnimationResources(
      new CosmosImage(iocFriskRightCharaFake),
      new CosmosData(iocFriskRightCharaFake$info)
   ),
   iocFriskRightHome: new CosmosAnimationResources(
      new CosmosImage(iocFriskRightHome),
      new CosmosData(iocFriskRightHome$info)
   ),
   iocFriskRightJetpack: new CosmosAnimationResources(
      new CosmosImage(iocFriskRightJetpack),
      new CosmosData(iocFriskRightJetpack$info)
   ),
   iocFriskRightJetpackOff: new CosmosImage(iocFriskRightJetpackOff),
   iocFriskRightMirror: new CosmosAnimationResources(
      new CosmosImage(iocFriskRightMirror),
      new CosmosData(iocFriskRightMirror$info)
   ),
   iocFriskRightMirrorHome: new CosmosAnimationResources(
      new CosmosImage(iocFriskRightMirrorHome),
      new CosmosData(iocFriskRightMirrorHome$info)
   ),
   iocFriskRightMirrorWater: new CosmosAnimationResources(
      new CosmosImage(iocFriskRightMirrorWater),
      new CosmosData(iocFriskRightMirrorWater$info)
   ),
   iocFriskRightWater: new CosmosAnimationResources(
      new CosmosImage(iocFriskRightWater),
      new CosmosData(iocFriskRightWater$info)
   ),
   iocFriskRightWaterArchive: new CosmosAnimationResources(
      new CosmosImage(iocFriskRightWaterArchive),
      new CosmosData(iocFriskRightWaterArchive$info)
   ),
   iocFriskRightWaterJetpack: new CosmosAnimationResources(
      new CosmosImage(iocFriskRightWaterJetpack),
      new CosmosData(iocFriskRightWaterJetpack$info)
   ),
   iocFriskRightWaterJetpackOff: new CosmosImage(iocFriskRightWaterJetpackOff),
   iocFriskUp: new CosmosAnimationResources(new CosmosImage(iocFriskUp), new CosmosData(iocFriskUp$info)),
   iocFriskUpArchive: new CosmosAnimationResources(
      new CosmosImage(iocFriskUpArchive),
      new CosmosData(iocFriskUpArchive$info)
   ),
   iocFriskUpChara: new CosmosAnimationResources(
      new CosmosImage(iocFriskUpChara),
      new CosmosData(iocFriskUpChara$info)
   ),
   iocFriskUpCharaFake: new CosmosAnimationResources(
      new CosmosImage(iocFriskUpCharaFake),
      new CosmosData(iocFriskUpCharaFake$info)
   ),
   iocFriskUpHome: new CosmosAnimationResources(new CosmosImage(iocFriskUpHome), new CosmosData(iocFriskUpHome$info)),
   iocFriskUpJetpack: new CosmosAnimationResources(
      new CosmosImage(iocFriskUpJetpack),
      new CosmosData(iocFriskUpJetpack$info)
   ),
   iocFriskUpJetpackOff: new CosmosImage(iocFriskUpJetpackOff),
   iocFriskUpMirror: new CosmosAnimationResources(
      new CosmosImage(iocFriskUpMirror),
      new CosmosData(iocFriskUpMirror$info)
   ),
   iocFriskUpMirrorHome: new CosmosAnimationResources(
      new CosmosImage(iocFriskUpMirrorHome),
      new CosmosData(iocFriskUpMirrorHome$info)
   ),
   iocFriskUpMirrorWater: new CosmosAnimationResources(
      new CosmosImage(iocFriskUpMirrorWater),
      new CosmosData(iocFriskUpMirrorWater$info)
   ),
   iocFriskUpWater: new CosmosAnimationResources(
      new CosmosImage(iocFriskUpWater),
      new CosmosData(iocFriskUpWater$info)
   ),
   iocFriskUpWaterArchive: new CosmosAnimationResources(
      new CosmosImage(iocFriskUpWaterArchive),
      new CosmosData(iocFriskUpWaterArchive$info)
   ),
   iocFriskUpWaterJetpack: new CosmosAnimationResources(
      new CosmosImage(iocFriskUpWaterJetpack),
      new CosmosData(iocFriskUpWaterJetpack$info)
   ),
   iocFriskUpWaterJetpackOff: new CosmosImage(iocFriskUpWaterJetpackOff),
   iocGrillbyDown: new CosmosAnimationResources(new CosmosImage(iocGrillbyDown), new CosmosData(iocGrillbyDown$info)),
   iocGrillbyUp: new CosmosAnimationResources(new CosmosImage(iocGrillbyUp), new CosmosData(iocGrillbyUp$info)),
   iocHumansBraveryDown: new CosmosImage(iocHumansBraveryDown),
   iocHumansBraveryLeft: new CosmosImage(iocHumansBraveryLeft),
   iocHumansBraveryRight: new CosmosImage(iocHumansBraveryRight),
   iocHumansBraveryUp: new CosmosImage(iocHumansBraveryUp),
   iocHumansIntegrityDown: new CosmosImage(iocHumansIntegrityDown),
   iocHumansIntegrityLeft: new CosmosImage(iocHumansIntegrityLeft),
   iocHumansIntegrityRight: new CosmosImage(iocHumansIntegrityRight),
   iocHumansIntegrityUp: new CosmosImage(iocHumansIntegrityUp),
   iocHumansJusticeDown: new CosmosImage(iocHumansJusticeDown),
   iocHumansJusticeLeft: new CosmosImage(iocHumansJusticeLeft),
   iocHumansJusticeRight: new CosmosImage(iocHumansJusticeRight),
   iocHumansJusticeUp: new CosmosImage(iocHumansJusticeUp),
   iocHumansKindnessDown: new CosmosImage(iocHumansKindnessDown),
   iocHumansKindnessLeft: new CosmosImage(iocHumansKindnessLeft),
   iocHumansKindnessRight: new CosmosImage(iocHumansKindnessRight),
   iocHumansKindnessUp: new CosmosImage(iocHumansKindnessUp),
   iocHumansPatienceDown: new CosmosImage(iocHumansPatienceDown),
   iocHumansPatienceLeft: new CosmosImage(iocHumansPatienceLeft),
   iocHumansPatienceRight: new CosmosImage(iocHumansPatienceRight),
   iocHumansPatienceUp: new CosmosImage(iocHumansPatienceUp),
   iocHumansPerserveranceDown: new CosmosImage(iocHumansPerserveranceDown),
   iocHumansPerserveranceLeft: new CosmosImage(iocHumansPerserveranceLeft),
   iocHumansPerserveranceRight: new CosmosImage(iocHumansPerserveranceRight),
   iocHumansPerserveranceUp: new CosmosImage(iocHumansPerserveranceUp),
   iocKiddCrouch: new CosmosImage(iocKiddCrouch),
   iocKiddDown: new CosmosAnimationResources(new CosmosImage(iocKiddDown), new CosmosData(iocKiddDown$info)),
   iocKiddDownSad: new CosmosAnimationResources(new CosmosImage(iocKiddDownSad), new CosmosData(iocKiddDownSad$info)),
   iocKiddDownSlave: new CosmosAnimationResources(
      new CosmosImage(iocKiddDownSlave),
      new CosmosData(iocKiddDownSlave$info)
   ),
   iocKiddDownTalk: new CosmosAnimationResources(
      new CosmosImage(iocKiddDownTalk),
      new CosmosData(iocKiddDownTalk$info)
   ),
   iocKiddDownTalkSad: new CosmosAnimationResources(
      new CosmosImage(iocKiddDownTalkSad),
      new CosmosData(iocKiddDownTalkSad$info)
   ),
   iocKiddDownTalkSlave: new CosmosAnimationResources(
      new CosmosImage(iocKiddDownTalkSlave),
      new CosmosData(iocKiddDownTalkSlave$info)
   ),
   iocKiddJetpack: new CosmosAnimationResources(new CosmosImage(iocKiddJetpack), new CosmosData(iocKiddJetpack$info)),
   iocKiddLeft: new CosmosAnimationResources(new CosmosImage(iocKiddLeft), new CosmosData(iocKiddLeft$info)),
   iocKiddLeftSad: new CosmosAnimationResources(new CosmosImage(iocKiddLeftSad), new CosmosData(iocKiddLeftSad$info)),
   iocKiddLeftSlave: new CosmosAnimationResources(
      new CosmosImage(iocKiddLeftSlave),
      new CosmosData(iocKiddLeftSlave$info)
   ),
   iocKiddLeftTalk: new CosmosAnimationResources(
      new CosmosImage(iocKiddLeftTalk),
      new CosmosData(iocKiddLeftTalk$info)
   ),
   iocKiddLeftTalkSad: new CosmosAnimationResources(
      new CosmosImage(iocKiddLeftTalkSad),
      new CosmosData(iocKiddLeftTalkSad$info)
   ),
   iocKiddLeftTalkSlave: new CosmosAnimationResources(
      new CosmosImage(iocKiddLeftTalkSlave),
      new CosmosData(iocKiddLeftTalkSlave$info)
   ),
   iocKiddLeftTrip: new CosmosAnimationResources(
      new CosmosImage(iocKiddLeftTrip),
      new CosmosData(iocKiddLeftTrip$info)
   ),
   iocKiddRight: new CosmosAnimationResources(new CosmosImage(iocKiddRight), new CosmosData(iocKiddRight$info)),
   iocKiddRightSad: new CosmosAnimationResources(
      new CosmosImage(iocKiddRightSad),
      new CosmosData(iocKiddRightSad$info)
   ),
   iocKiddRightSlave: new CosmosAnimationResources(
      new CosmosImage(iocKiddRightSlave),
      new CosmosData(iocKiddRightSlave$info)
   ),
   iocKiddRightTalk: new CosmosAnimationResources(
      new CosmosImage(iocKiddRightTalk),
      new CosmosData(iocKiddRightTalk$info)
   ),
   iocKiddRightTalkSad: new CosmosAnimationResources(
      new CosmosImage(iocKiddRightTalkSad),
      new CosmosData(iocKiddRightTalkSad$info)
   ),
   iocKiddRightTalkSlave: new CosmosAnimationResources(
      new CosmosImage(iocKiddRightTalkSlave),
      new CosmosData(iocKiddRightTalkSlave$info)
   ),
   iocKiddRightTrip: new CosmosAnimationResources(
      new CosmosImage(iocKiddRightTrip),
      new CosmosData(iocKiddRightTrip$info)
   ),
   iocKiddRightTripSad: new CosmosAnimationResources(
      new CosmosImage(iocKiddRightTripSad),
      new CosmosData(iocKiddRightTripSad$info)
   ),
   iocKiddUp: new CosmosAnimationResources(new CosmosImage(iocKiddUp), new CosmosData(iocKiddUp$info)),
   iocKiddUpTalk: new CosmosAnimationResources(new CosmosImage(iocKiddUpTalk), new CosmosData(iocKiddUpTalk$info)),
   iocMettatonAnchorDotdotdot: new CosmosAnimationResources(
      new CosmosImage(iocMettatonAnchorDotdotdot),
      new CosmosData(iocMettatonAnchorDotdotdot$info)
   ),
   iocMettatonAnchorFlyer: new CosmosAnimationResources(
      new CosmosImage(iocMettatonAnchorFlyer),
      new CosmosData(iocMettatonAnchorFlyer$info)
   ),
   iocMettatonAnchorG: new CosmosAnimationResources(
      new CosmosImage(iocMettatonAnchorG),
      new CosmosData(iocMettatonAnchorG$info)
   ),
   iocMettatonAnchorLaugh: new CosmosAnimationResources(
      new CosmosImage(iocMettatonAnchorLaugh),
      new CosmosData(iocMettatonAnchorLaugh$info)
   ),
   iocMettatonAnchorOMG: new CosmosAnimationResources(
      new CosmosImage(iocMettatonAnchorOMG),
      new CosmosData(iocMettatonAnchorOMG$info)
   ),
   iocMettatonAnchorPoint: new CosmosAnimationResources(
      new CosmosImage(iocMettatonAnchorPoint),
      new CosmosData(iocMettatonAnchorPoint$info)
   ),
   iocMettatonAnimeChargeUpSequence: new CosmosAnimationResources(
      new CosmosImage(iocMettatonAnimeChargeUpSequence),
      new CosmosData(iocMettatonAnimeChargeUpSequence$info)
   ),
   iocMettatonBackhands: new CosmosAnimationResources(
      new CosmosImage(iocMettatonBackhands),
      new CosmosData(iocMettatonBackhands$info)
   ),
   iocMettatonBro: new CosmosImage(iocMettatonBro),
   iocMettatonClap: new CosmosAnimationResources(
      new CosmosImage(iocMettatonClap),
      new CosmosData(iocMettatonClap$info)
   ),
   iocMettatonConfused: new CosmosAnimationResources(
      new CosmosImage(iocMettatonConfused),
      new CosmosData(iocMettatonConfused$info)
   ),
   iocMettatonDanceArm: new CosmosImage(iocMettatonDanceArm),
   iocMettatonDanceBody: new CosmosImage(iocMettatonDanceBody),
   iocMettatonDanceLeg: new CosmosImage(iocMettatonDanceLeg),
   iocMettatonDotdotdot: new CosmosImage(iocMettatonDotdotdot),
   iocMettatonDressIdle: new CosmosAnimationResources(
      new CosmosImage(iocMettatonDressIdle),
      new CosmosData(iocMettatonDressIdle$info)
   ),
   iocMettatonDressPull: new CosmosAnimationResources(
      new CosmosImage(iocMettatonDressPull),
      new CosmosData(iocMettatonDressPull$info)
   ),
   iocMettatonDressRoll: new CosmosImage(iocMettatonDressRoll),
   iocMettatonFlyer: new CosmosAnimationResources(
      new CosmosImage(iocMettatonFlyer),
      new CosmosData(iocMettatonFlyer$info)
   ),
   iocMettatonLaugh: new CosmosAnimationResources(
      new CosmosImage(iocMettatonLaugh),
      new CosmosData(iocMettatonLaugh$info)
   ),
   iocMettatonMicrophone: new CosmosAnimationResources(
      new CosmosImage(iocMettatonMicrophone),
      new CosmosData(iocMettatonMicrophone$info)
   ),
   iocMettatonMicrophoneHapstablook: new CosmosAnimationResources(
      new CosmosImage(iocMettatonMicrophoneHapstablook),
      new CosmosData(iocMettatonMicrophoneHapstablook$info)
   ),
   iocMettatonNeo: new CosmosAnimationResources(new CosmosImage(iocMettatonNeo), new CosmosData(iocMettatonNeo$info)),
   iocMettatonNeoWings: new CosmosAnimationResources(
      new CosmosImage(iocMettatonNeoWings),
      new CosmosData(iocMettatonNeoWings$info)
   ),
   iocMettatonOmg: new CosmosAnimationResources(new CosmosImage(iocMettatonOmg), new CosmosData(iocMettatonOmg$info)),
   iocMettatonPoint: new CosmosAnimationResources(
      new CosmosImage(iocMettatonPoint),
      new CosmosData(iocMettatonPoint$info)
   ),
   iocMettatonPointHapstablook: new CosmosAnimationResources(
      new CosmosImage(iocMettatonPointHapstablook),
      new CosmosData(iocMettatonPointHapstablook$info)
   ),
   iocMettatonPointthree: new CosmosAnimationResources(
      new CosmosImage(iocMettatonPointthree),
      new CosmosData(iocMettatonPointthree$info)
   ),
   iocMettatonPointthreeHapstablook: new CosmosAnimationResources(
      new CosmosImage(iocMettatonPointthreeHapstablook),
      new CosmosData(iocMettatonPointthreeHapstablook$info)
   ),
   iocMettatonPointtwo: new CosmosAnimationResources(
      new CosmosImage(iocMettatonPointtwo),
      new CosmosData(iocMettatonPointtwo$info)
   ),
   iocMettatonPointtwoHapstablook: new CosmosAnimationResources(
      new CosmosImage(iocMettatonPointtwoHapstablook),
      new CosmosData(iocMettatonPointtwoHapstablook$info)
   ),
   iocMettatonRollLeft: new CosmosAnimationResources(
      new CosmosImage(iocMettatonRollLeft),
      new CosmosData(iocMettatonRollLeft$info)
   ),
   iocMettatonRollRight: new CosmosAnimationResources(
      new CosmosImage(iocMettatonRollRight),
      new CosmosData(iocMettatonRollRight$info)
   ),
   iocMettatonRollup1: new CosmosAnimationResources(
      new CosmosImage(sources.iocMettatonRollup1),
      new CosmosData(sources.iocMettatonRollup1$info)
   ),
   iocMettatonRollup2: new CosmosAnimationResources(
      new CosmosImage(iocMettatonRollup2),
      new CosmosData(iocMettatonRollup2$info)
   ),
   iocMettatonSeriouspose: new CosmosAnimationResources(
      new CosmosImage(iocMettatonSeriouspose),
      new CosmosData(iocMettatonSeriouspose$info)
   ),
   iocMettatonShrug: new CosmosAnimationResources(
      new CosmosImage(iocMettatonShrug),
      new CosmosData(iocMettatonShrug$info)
   ),
   iocMettatonText: new CosmosAnimationResources(
      new CosmosImage(iocMettatonText),
      new CosmosData(iocMettatonText$info)
   ),
   iocMettatonWave: new CosmosAnimationResources(
      new CosmosImage(iocMettatonWave),
      new CosmosData(iocMettatonWave$info)
   ),
   iocMettatonWaveHapstablook: new CosmosAnimationResources(
      new CosmosImage(iocMettatonWaveHapstablook),
      new CosmosData(iocMettatonWaveHapstablook$info)
   ),
   iocNapstablookBody: new CosmosAnimationResources(
      new CosmosImage(iocNapstablookBody),
      new CosmosData(iocNapstablookBody$info)
   ),
   iocNapstablookDown: new CosmosImage(iocNapstablookDown),
   iocNapstablookDownAlter: new CosmosImage(iocNapstablookDownAlter),
   iocNapstablookLeft: new CosmosImage(iocNapstablookLeft),
   iocNapstablookLeftAlter: new CosmosImage(iocNapstablookLeftAlter),
   iocNapstablookRight: new CosmosImage(iocNapstablookRight),
   iocNapstablookRightAlter: new CosmosImage(iocNapstablookRightAlter),
   iocNapstablookUp: new CosmosImage(iocNapstablookUp),
   iocNapstablookUpAlter: new CosmosImage(iocNapstablookUpAlter),
   iocPapyrusCakeStarp: new CosmosAnimationResources(
      new CosmosImage(iocPapyrusCakeStarp),
      new CosmosData(iocPapyrusCakeStarp$info)
   ),
   iocPapyrusCape: new CosmosAnimationResources(new CosmosImage(iocPapyrusCape), new CosmosData(iocPapyrusCape$info)),
   iocPapyrusDoknStarw: new CosmosAnimationResources(
      new CosmosImage(iocPapyrusDoknStarw),
      new CosmosData(iocPapyrusDoknStarw$info)
   ),
   iocPapyrusDoknStarwTalk: new CosmosAnimationResources(
      new CosmosImage(iocPapyrusDoknStarwTalk),
      new CosmosData(iocPapyrusDoknStarwTalk$info)
   ),
   iocPapyrusDown: new CosmosAnimationResources(new CosmosImage(iocPapyrusDown), new CosmosData(iocPapyrusDown$info)),
   iocPapyrusDownMad: new CosmosAnimationResources(
      new CosmosImage(iocPapyrusDownMad),
      new CosmosData(iocPapyrusDownMad$info)
   ),
   iocPapyrusDownMadTalk: new CosmosAnimationResources(
      new CosmosImage(iocPapyrusDownMadTalk),
      new CosmosData(iocPapyrusDownMadTalk$info)
   ),
   iocPapyrusDownTalk: new CosmosAnimationResources(
      new CosmosImage(iocPapyrusDownTalk),
      new CosmosData(iocPapyrusDownTalk$info)
   ),
   iocPapyrusKnock: new CosmosAnimationResources(
      new CosmosImage(iocPapyrusKnock),
      new CosmosData(iocPapyrusKnock$info)
   ),
   iocPapyrusLeap: new CosmosAnimationResources(new CosmosImage(iocPapyrusLeap), new CosmosData(iocPapyrusLeap$info)),
   iocPapyrusLeft: new CosmosAnimationResources(new CosmosImage(iocPapyrusLeft), new CosmosData(iocPapyrusLeft$info)),
   iocPapyrusLeftMad: new CosmosAnimationResources(
      new CosmosImage(iocPapyrusLeftMad),
      new CosmosData(iocPapyrusLeftMad$info)
   ),
   iocPapyrusLeftMadTalk: new CosmosAnimationResources(
      new CosmosImage(iocPapyrusLeftMadTalk),
      new CosmosData(iocPapyrusLeftMadTalk$info)
   ),
   iocPapyrusLeftTalk: new CosmosAnimationResources(
      new CosmosImage(iocPapyrusLeftTalk),
      new CosmosData(iocPapyrusLeftTalk$info)
   ),
   iocPapyrusLektStarf: new CosmosAnimationResources(
      new CosmosImage(iocPapyrusLektStarf),
      new CosmosData(iocPapyrusLektStarf$info)
   ),
   iocPapyrusLektStarfTalk: new CosmosAnimationResources(
      new CosmosImage(iocPapyrusLektStarfTalk),
      new CosmosData(iocPapyrusLektStarfTalk$info)
   ),
   iocPapyrusPresent: new CosmosAnimationResources(
      new CosmosImage(iocPapyrusPresent),
      new CosmosData(iocPapyrusPresent$info)
   ),
   iocPapyrusPresent2: new CosmosAnimationResources(
      new CosmosImage(iocPapyrusPresent2),
      new CosmosData(iocPapyrusPresent2$info)
   ),
   iocPapyrusReach: new CosmosAnimationResources(
      new CosmosImage(iocPapyrusReach),
      new CosmosData(iocPapyrusReach$info)
   ),
   iocPapyrusRight: new CosmosAnimationResources(
      new CosmosImage(iocPapyrusRight),
      new CosmosData(iocPapyrusRight$info)
   ),
   iocPapyrusRightMad: new CosmosAnimationResources(
      new CosmosImage(iocPapyrusRightMad),
      new CosmosData(iocPapyrusRightMad$info)
   ),
   iocPapyrusRightMadTalk: new CosmosAnimationResources(
      new CosmosImage(iocPapyrusRightMadTalk),
      new CosmosData(iocPapyrusRightMadTalk$info)
   ),
   iocPapyrusRightTalk: new CosmosAnimationResources(
      new CosmosImage(iocPapyrusRightTalk),
      new CosmosData(iocPapyrusRightTalk$info)
   ),
   iocPapyrusRikhtStarg: new CosmosAnimationResources(
      new CosmosImage(iocPapyrusRikhtStarg),
      new CosmosData(iocPapyrusRikhtStarg$info)
   ),
   iocPapyrusRikhtStargTalk: new CosmosAnimationResources(
      new CosmosImage(iocPapyrusRikhtStargTalk),
      new CosmosData(iocPapyrusRikhtStargTalk$info)
   ),
   iocPapyrusStomp: new CosmosAnimationResources(
      new CosmosImage(iocPapyrusStomp),
      new CosmosData(iocPapyrusStomp$info)
   ),
   iocPapyrusUp: new CosmosAnimationResources(new CosmosImage(iocPapyrusUp), new CosmosData(iocPapyrusUp$info)),
   iocPapyrusUpTalk: new CosmosImage(iocPapyrusUpTalk),
   iocSansDown: new CosmosAnimationResources(new CosmosImage(iocSansDown), new CosmosData(iocSansDown$info)),
   iocSansDownTalk: new CosmosImage(iocSansDownTalk),
   iocSansDownTomato: new CosmosAnimationResources(
      new CosmosImage(iocSansDownTomato),
      new CosmosData(iocSansDownTomato$info)
   ),
   iocSansHandshake: new CosmosAnimationResources(
      new CosmosImage(iocSansHandshake),
      new CosmosData(iocSansHandshake$info)
   ),
   iocSansIcecream1: new CosmosAnimationResources(
      new CosmosImage(iocSansIcecream1),
      new CosmosData(iocSansIcecream1$info)
   ),
   iocSansIcecream2: new CosmosAnimationResources(
      new CosmosImage(iocSansIcecream2),
      new CosmosData(iocSansIcecream2$info)
   ),
   iocSansIcecream3: new CosmosAnimationResources(
      new CosmosImage(iocSansIcecream3),
      new CosmosData(iocSansIcecream3$info)
   ),
   iocSansIcecream4: new CosmosAnimationResources(
      new CosmosImage(iocSansIcecream4),
      new CosmosData(iocSansIcecream4$info)
   ),
   iocSansIcecream5: new CosmosAnimationResources(
      new CosmosImage(iocSansIcecream5),
      new CosmosData(iocSansIcecream5$info)
   ),
   iocSansIcecream6: new CosmosAnimationResources(
      new CosmosImage(iocSansIcecream6),
      new CosmosData(iocSansIcecream6$info)
   ),
   iocSansIcecream7: new CosmosAnimationResources(
      new CosmosImage(iocSansIcecream7),
      new CosmosData(iocSansIcecream7$info)
   ),
   iocSansIcecream8: new CosmosAnimationResources(
      new CosmosImage(iocSansIcecream8),
      new CosmosData(iocSansIcecream8$info)
   ),
   iocSansLeft: new CosmosAnimationResources(new CosmosImage(iocSansLeft), new CosmosData(iocSansLeft$info)),
   iocSansLeftTalk: new CosmosImage(iocSansLeftTalk),
   iocSansLeftTomato: new CosmosAnimationResources(
      new CosmosImage(iocSansLeftTomato),
      new CosmosData(iocSansLeftTomato$info)
   ),
   iocSansRight: new CosmosAnimationResources(new CosmosImage(iocSansRight), new CosmosData(iocSansRight$info)),
   iocSansRightTalk: new CosmosImage(iocSansRightTalk),
   iocSansShrug: new CosmosImage(iocSansShrug),
   iocSansSleep: new CosmosAnimationResources(new CosmosImage(iocSansSleep), new CosmosData(iocSansSleep$info)),
   iocSansStool: new CosmosImage(iocSansStool),
   iocSansStoolComb: new CosmosAnimationResources(
      new CosmosImage(iocSansStoolComb),
      new CosmosData(iocSansStoolComb$info)
   ),
   iocSansStoolLeft: new CosmosImage(iocSansStoolLeft),
   iocSansStoolRight: new CosmosAnimationResources(
      new CosmosImage(iocSansStoolRight),
      new CosmosData(iocSansStoolRight$info)
   ),
   iocSansStoolScratch: new CosmosAnimationResources(
      new CosmosImage(iocSansStoolScratch),
      new CosmosData(iocSansStoolScratch$info)
   ),
   iocSansTrombone: new CosmosAnimationResources(
      new CosmosImage(iocSansTrombone),
      new CosmosData(iocSansTrombone$info)
   ),
   iocSansUp: new CosmosAnimationResources(new CosmosImage(iocSansUp), new CosmosData(iocSansUp$info)),
   iocSansUpTalk: new CosmosImage(iocSansUpTalk),
   iocSansWink: new CosmosImage(iocSansWink),
   iocTemmieLeft: new CosmosAnimationResources(new CosmosImage(iocTemmieLeft), new CosmosData(iocTemmieLeft$info)),
   iocTemmieLeftTalk: new CosmosAnimationResources(
      new CosmosImage(iocTemmieLeftTalk),
      new CosmosData(iocTemmieLeftTalk$info)
   ),
   iocTemmieRight: new CosmosAnimationResources(new CosmosImage(iocTemmieRight), new CosmosData(iocTemmieRight$info)),
   iocTemmieRightTalk: new CosmosAnimationResources(
      new CosmosImage(iocTemmieRightTalk),
      new CosmosData(iocTemmieRightTalk$info)
   ),
   iocTemmieSkolarships: new CosmosImage(iocTemmieSkolarships),
   iocTorielDown: new CosmosAnimationResources(new CosmosImage(iocTorielDown), new CosmosData(iocTorielDown$info)),
   iocTorielDownAsriel: new CosmosAnimationResources(
      new CosmosImage(iocTorielDownAsriel),
      new CosmosData(iocTorielDownAsriel$info)
   ),
   iocTorielDownAsrielSad: new CosmosAnimationResources(
      new CosmosImage(iocTorielDownAsrielSad),
      new CosmosData(iocTorielDownAsrielSad$info)
   ),
   iocTorielDownHandhold: new CosmosAnimationResources(
      new CosmosImage(iocTorielDownHandhold),
      new CosmosData(iocTorielDownHandhold$info)
   ),
   iocTorielDownTalk: new CosmosAnimationResources(
      new CosmosImage(iocTorielDownTalk),
      new CosmosData(iocTorielDownTalk$info)
   ),
   iocTorielHug: new CosmosAnimationResources(new CosmosImage(iocTorielHug), new CosmosData(iocTorielHug$info)),
   iocTorielLeft: new CosmosAnimationResources(new CosmosImage(iocTorielLeft), new CosmosData(iocTorielLeft$info)),
   iocTorielLeftAsriel: new CosmosAnimationResources(
      new CosmosImage(iocTorielLeftAsriel),
      new CosmosData(iocTorielLeftAsriel$info)
   ),
   iocTorielLeftAsrielSad: new CosmosAnimationResources(
      new CosmosImage(iocTorielLeftAsrielSad),
      new CosmosData(iocTorielLeftAsrielSad$info)
   ),
   iocTorielLeftHandhold: new CosmosAnimationResources(
      new CosmosImage(iocTorielLeftHandhold),
      new CosmosData(iocTorielLeftHandhold$info)
   ),
   iocTorielLeftTalk: new CosmosAnimationResources(
      new CosmosImage(iocTorielLeftTalk),
      new CosmosData(iocTorielLeftTalk$info)
   ),
   iocTorielMad: new CosmosImage(iocTorielMad),
   iocTorielPhone: new CosmosAnimationResources(new CosmosImage(iocTorielPhone), new CosmosData(iocTorielPhone$info)),
   iocTorielPhoneTalk: new CosmosAnimationResources(
      new CosmosImage(iocTorielPhoneTalk),
      new CosmosData(iocTorielPhoneTalk$info)
   ),
   iocTorielRight: new CosmosAnimationResources(new CosmosImage(iocTorielRight), new CosmosData(iocTorielRight$info)),
   iocTorielRightHandhold: new CosmosAnimationResources(
      new CosmosImage(iocTorielRightHandhold),
      new CosmosData(iocTorielRightHandhold$info)
   ),
   iocTorielRightTalk: new CosmosAnimationResources(
      new CosmosImage(iocTorielRightTalk),
      new CosmosData(iocTorielRightTalk$info)
   ),
   iocTorielRuffle: new CosmosAnimationResources(
      new CosmosImage(iocTorielRuffle),
      new CosmosData(iocTorielRuffle$info)
   ),
   iocTorielSad: new CosmosAnimationResources(new CosmosImage(iocTorielSad), new CosmosData(iocTorielSad$info)),
   iocTorielUp: new CosmosAnimationResources(new CosmosImage(iocTorielUp), new CosmosData(iocTorielUp$info)),
   iocTorielUpHandhold: new CosmosAnimationResources(
      new CosmosImage(iocTorielUpHandhold),
      new CosmosData(iocTorielUpHandhold$info)
   ),
   iocTorielUpTalk: new CosmosImage(iocTorielUp),
   iocTwinklyMain: new CosmosAnimationResources(new CosmosImage(iocTwinklyMain), new CosmosData(iocTwinklyMain$info)),
   iocTwinklyMainBack: new CosmosImage(iocTwinklyMainBack),
   iocUndyneBrandish: new CosmosAnimationResources(
      new CosmosImage(iocUndyneBrandish),
      new CosmosData(iocUndyneBrandish$info)
   ),
   iocUndyneDateBurnt: new CosmosAnimationResources(
      new CosmosImage(iocUndyneDateBurnt),
      new CosmosData(iocUndyneDateBurnt$info)
   ),
   iocUndyneDateFlex: new CosmosAnimationResources(
      new CosmosImage(iocUndyneDateFlex),
      new CosmosData(iocUndyneDateFlex$info)
   ),
   iocUndyneDateGrab: new CosmosAnimationResources(
      new CosmosImage(iocUndyneDateGrab),
      new CosmosData(iocUndyneDateGrab$info)
   ),
   iocUndyneDateKick: new CosmosAnimationResources(
      new CosmosImage(iocUndyneDateKick),
      new CosmosData(iocUndyneDateKick$info)
   ),
   iocUndyneDateLeap: new CosmosAnimationResources(
      new CosmosImage(iocUndyneDateLeap),
      new CosmosData(iocUndyneDateLeap$info)
   ),
   iocUndyneDateNamaste: new CosmosAnimationResources(
      new CosmosImage(iocUndyneDateNamaste),
      new CosmosData(iocUndyneDateNamaste$info)
   ),
   iocUndyneDateOMG: new CosmosAnimationResources(
      new CosmosImage(iocUndyneDateOMG),
      new CosmosData(iocUndyneDateOMG$info)
   ),
   iocUndyneDateSit: new CosmosAnimationResources(
      new CosmosImage(iocUndyneDateSit),
      new CosmosData(iocUndyneDateSit$info)
   ),
   iocUndyneDateStomp: new CosmosAnimationResources(
      new CosmosImage(iocUndyneDateStomp),
      new CosmosData(iocUndyneDateStomp$info)
   ),
   iocUndyneDateStompTomato: new CosmosAnimationResources(
      new CosmosImage(iocUndyneDateStompTomato),
      new CosmosData(iocUndyneDateStompTomato$info)
   ),
   iocUndyneDateThrow: new CosmosAnimationResources(
      new CosmosImage(iocUndyneDateThrow),
      new CosmosData(iocUndyneDateThrow$info)
   ),
   iocUndyneDateThrowTalk: new CosmosAnimationResources(
      new CosmosImage(iocUndyneDateThrowTalk),
      new CosmosData(iocUndyneDateThrowTalk$info)
   ),
   iocUndyneDateTomato: new CosmosAnimationResources(
      new CosmosImage(iocUndyneDateTomato),
      new CosmosData(iocUndyneDateTomato$info)
   ),
   iocUndyneDateUppercut: new CosmosAnimationResources(
      new CosmosImage(iocUndyneDateUppercut),
      new CosmosData(iocUndyneDateUppercut$info)
   ),
   iocUndyneDive: new CosmosAnimationResources(new CosmosImage(iocUndyneDive), new CosmosData(iocUndyneDive$info)),
   iocUndyneDown: new CosmosAnimationResources(new CosmosImage(iocUndyneDown), new CosmosData(iocUndyneDown$info)),
   iocUndyneDownArmor: new CosmosAnimationResources(
      new CosmosImage(iocUndyneDownArmor),
      new CosmosData(iocUndyneDownArmor$info)
   ),
   iocUndyneDownArmorSpear: new CosmosAnimationResources(
      new CosmosImage(iocUndyneDownArmorSpear),
      new CosmosData(iocUndyneDownArmorSpear$info)
   ),
   iocUndyneDownArmorWalk: new CosmosAnimationResources(
      new CosmosImage(iocUndyneDownArmorWalk),
      new CosmosData(iocUndyneDownArmorWalk$info)
   ),
   iocUndyneDownDate: new CosmosAnimationResources(
      new CosmosImage(iocUndyneDownDate),
      new CosmosData(iocUndyneDownDate$info)
   ),
   iocUndyneDownDateTalk: new CosmosAnimationResources(
      new CosmosImage(iocUndyneDownDateTalk),
      new CosmosData(iocUndyneDownDateTalk$info)
   ),
   iocUndyneDownStoic: new CosmosAnimationResources(
      new CosmosImage(iocUndyneDownStoic),
      new CosmosData(iocUndyneDownStoic$info)
   ),
   iocUndyneDownStoicTalk: new CosmosAnimationResources(
      new CosmosImage(iocUndyneDownStoicTalk),
      new CosmosData(iocUndyneDownStoicTalk$info)
   ),
   iocUndyneDownTalk: new CosmosAnimationResources(
      new CosmosImage(iocUndyneDownTalk),
      new CosmosData(iocUndyneDownTalk$info)
   ),
   iocUndyneFallen: new CosmosImage(iocUndyneFallen),
   iocUndyneGrabKidd: new CosmosAnimationResources(
      new CosmosImage(iocUndyneGrabKidd),
      new CosmosData(iocUndyneGrabKidd$info)
   ),
   iocUndyneKick: new CosmosAnimationResources(new CosmosImage(iocUndyneKick), new CosmosData(iocUndyneKick$info)),
   iocUndyneLeft: new CosmosAnimationResources(new CosmosImage(iocUndyneLeft), new CosmosData(iocUndyneLeft$info)),
   iocUndyneLeftArmor: new CosmosAnimationResources(
      new CosmosImage(iocUndyneLeftArmor),
      new CosmosData(iocUndyneLeftArmor$info)
   ),
   iocUndyneLeftArmorJetpack: new CosmosAnimationResources(
      new CosmosImage(iocUndyneLeftArmorJetpack),
      new CosmosData(iocUndyneLeftArmorJetpack$info)
   ),
   iocUndyneLeftArmorWalk: new CosmosAnimationResources(
      new CosmosImage(iocUndyneLeftArmorWalk),
      new CosmosData(iocUndyneLeftArmorWalk$info)
   ),
   iocUndyneLeftDate: new CosmosAnimationResources(
      new CosmosImage(iocUndyneLeftDate),
      new CosmosData(iocUndyneLeftDate$info)
   ),
   iocUndyneLeftDateTalk: new CosmosAnimationResources(
      new CosmosImage(iocUndyneLeftDateTalk),
      new CosmosData(iocUndyneLeftDateTalk$info)
   ),
   iocUndyneLeftStoic: new CosmosAnimationResources(
      new CosmosImage(iocUndyneLeftStoic),
      new CosmosData(iocUndyneLeftStoic$info)
   ),
   iocUndyneLeftStoicTalk: new CosmosAnimationResources(
      new CosmosImage(iocUndyneLeftStoicTalk),
      new CosmosData(iocUndyneLeftStoicTalk$info)
   ),
   iocUndyneLeftTalk: new CosmosAnimationResources(
      new CosmosImage(iocUndyneLeftTalk),
      new CosmosData(iocUndyneLeftTalk$info)
   ),
   iocUndynePhone: new CosmosImage(iocUndynePhone),
   iocUndynePullKidd: new CosmosAnimationResources(
      new CosmosImage(iocUndynePullKidd),
      new CosmosData(iocUndynePullKidd$info)
   ),
   iocUndyneRight: new CosmosAnimationResources(new CosmosImage(iocUndyneRight), new CosmosData(iocUndyneRight$info)),
   iocUndyneRightArmor: new CosmosAnimationResources(
      new CosmosImage(iocUndyneRightArmor),
      new CosmosData(iocUndyneRightArmor$info)
   ),
   iocUndyneRightArmorJetpack: new CosmosAnimationResources(
      new CosmosImage(iocUndyneRightArmorJetpack),
      new CosmosData(iocUndyneRightArmorJetpack$info)
   ),
   iocUndyneRightArmorWalk: new CosmosAnimationResources(
      new CosmosImage(iocUndyneRightArmorWalk),
      new CosmosData(iocUndyneRightArmorWalk$info)
   ),
   iocUndyneRightDate: new CosmosAnimationResources(
      new CosmosImage(iocUndyneRightDate),
      new CosmosData(iocUndyneRightDate$info)
   ),
   iocUndyneRightDateTalk: new CosmosAnimationResources(
      new CosmosImage(iocUndyneRightDateTalk),
      new CosmosData(iocUndyneRightDateTalk$info)
   ),
   iocUndyneRightStoic: new CosmosAnimationResources(
      new CosmosImage(iocUndyneRightStoic),
      new CosmosData(iocUndyneRightStoic$info)
   ),
   iocUndyneRightStoicTalk: new CosmosAnimationResources(
      new CosmosImage(iocUndyneRightStoicTalk),
      new CosmosData(iocUndyneRightStoicTalk$info)
   ),
   iocUndyneRightTalk: new CosmosAnimationResources(
      new CosmosImage(iocUndyneRightTalk),
      new CosmosData(iocUndyneRightTalk$info)
   ),
   iocUndyneSithead: new CosmosAnimationResources(
      new CosmosImage(iocUndyneSithead),
      new CosmosData(iocUndyneSithead$info)
   ),
   iocUndyneSitred: new CosmosImage(iocUndyneSitred),
   iocUndyneSitside: new CosmosAnimationResources(
      new CosmosImage(iocUndyneSitside),
      new CosmosData(iocUndyneSitside$info)
   ),
   iocUndyneTurn: new CosmosAnimationResources(new CosmosImage(iocUndyneTurn), new CosmosData(iocUndyneTurn$info)),
   iocUndyneUp: new CosmosAnimationResources(new CosmosImage(iocUndyneUp), new CosmosData(iocUndyneUp$info)),
   iocUndyneUpArmor: new CosmosAnimationResources(
      new CosmosImage(iocUndyneUpArmor),
      new CosmosData(iocUndyneUpArmor$info)
   ),
   iocUndyneUpArmorJetpack: new CosmosAnimationResources(
      new CosmosImage(iocUndyneUpArmorJetpack),
      new CosmosData(iocUndyneUpArmorJetpack$info)
   ),
   iocUndyneUpArmorWalk: new CosmosAnimationResources(
      new CosmosImage(iocUndyneUpArmorWalk),
      new CosmosData(iocUndyneUpArmorWalk$info)
   ),
   iocUndyneUpDate: new CosmosAnimationResources(
      new CosmosImage(iocUndyneUpDate),
      new CosmosData(iocUndyneUpDate$info)
   ),
   iocUndyneUpDateTalk: new CosmosAnimationResources(
      new CosmosImage(iocUndyneUpDateTalk),
      new CosmosData(iocUndyneUpDateTalk$info)
   ),
   iocUndyneUpJetpack: new CosmosAnimationResources(
      new CosmosImage(iocUndyneUpJetpack),
      new CosmosData(iocUndyneUpJetpack$info)
   ),
   iocUndyneUpTalk: new CosmosAnimationResources(
      new CosmosImage(iocUndyneUpTalk),
      new CosmosData(iocUndyneUpTalk$info)
   ),
   ionAAngery: new CosmosAnimationResources(new CosmosImage(ionAAngery), new CosmosData(ionAAngery$info)),
   ionAArtgirl: new CosmosAnimationResources(new CosmosImage(ionAArtgirl), new CosmosData(ionAArtgirl$info)),
   ionABedreceptionist: new CosmosAnimationResources(
      new CosmosImage(ionABedreceptionist),
      new CosmosData(ionABedreceptionist$info)
   ),
   ionABlackfire: new CosmosAnimationResources(new CosmosImage(ionABlackfire), new CosmosData(ionABlackfire$info)),
   ionABoomer: new CosmosAnimationResources(new CosmosImage(ionABoomer), new CosmosData(ionABoomer$info)),
   ionABowtie: new CosmosAnimationResources(new CosmosImage(ionABowtie), new CosmosData(ionABowtie$info)),
   ionABowtieBack: new CosmosAnimationResources(new CosmosImage(ionABowtieBack), new CosmosData(ionABowtieBack$info)),
   ionABusinessdude: new CosmosAnimationResources(
      new CosmosImage(ionABusinessdude),
      new CosmosData(ionABusinessdude$info)
   ),
   ionACharles: new CosmosAnimationResources(new CosmosImage(ionACharles), new CosmosData(ionACharles$info)),
   ionAClamguyBack: new CosmosAnimationResources(
      new CosmosImage(ionAClamguyBack),
      new CosmosData(ionAClamguyBack$info)
   ),
   ionAClamguyFront: new CosmosAnimationResources(
      new CosmosImage(ionAClamguyFront),
      new CosmosData(ionAClamguyFront$info)
   ),
   ionADarkman: new CosmosAnimationResources(new CosmosImage(ionADarkman), new CosmosData(ionADarkman$info)),
   ionADarkmanTalk: new CosmosAnimationResources(
      new CosmosImage(ionADarkmanTalk),
      new CosmosData(ionADarkmanTalk$info)
   ),
   ionADiamond1: new CosmosAnimationResources(new CosmosImage(ionADiamond1), new CosmosData(ionADiamond1$info)),
   ionADiamond2: new CosmosAnimationResources(new CosmosImage(ionADiamond2), new CosmosData(ionADiamond2$info)),
   ionADragon: new CosmosAnimationResources(new CosmosImage(ionADragon), new CosmosData(ionADragon$info)),
   ionADrakedad: new CosmosAnimationResources(new CosmosImage(ionADrakedad), new CosmosData(ionADrakedad$info)),
   ionADrakemom: new CosmosAnimationResources(new CosmosImage(ionADrakemom), new CosmosData(ionADrakemom$info)),
   ionADresslion1: new CosmosAnimationResources(new CosmosImage(ionADresslion1), new CosmosData(ionADresslion1$info)),
   ionADresslion2: new CosmosAnimationResources(new CosmosImage(ionADresslion2), new CosmosData(ionADresslion2$info)),
   ionAFoodreceptionist: new CosmosAnimationResources(
      new CosmosImage(ionAFoodreceptionist),
      new CosmosData(ionAFoodreceptionist$info)
   ),
   ionAGiftbear: new CosmosAnimationResources(new CosmosImage(ionAGiftbear), new CosmosData(ionAGiftbear$info)),
   ionAGreenfire: new CosmosAnimationResources(new CosmosImage(ionAGreenfire), new CosmosData(ionAGreenfire$info)),
   ionAGyftrot: new CosmosAnimationResources(new CosmosImage(ionAGyftrot), new CosmosData(ionAGyftrot$info)),
   ionAHarpy: new CosmosAnimationResources(new CosmosImage(ionAHarpy), new CosmosData(ionAHarpy$info)),
   ionAHarpyNoCorny: new CosmosAnimationResources(
      new CosmosImage(ionAHarpyNoCorny),
      new CosmosData(ionAHarpyNoCorny$info)
   ),
   ionAHeats: new CosmosAnimationResources(new CosmosImage(ionAHeats), new CosmosData(ionAHeats$info)),
   ionAMushketeer: new CosmosAnimationResources(new CosmosImage(ionAMushketeer), new CosmosData(ionAMushketeer$info)),
   ionAMushketeerWalk: new CosmosAnimationResources(
      new CosmosImage(ionAMushketeerWalk),
      new CosmosData(ionAMushketeerWalk$info)
   ),
   ionAOni: new CosmosAnimationResources(new CosmosImage(ionAOni), new CosmosData(ionAOni$info)),
   ionAOnionsanArmLeft: new CosmosImage(ionAOnionsanArmLeft),
   ionAOnionsanArmOut: new CosmosImage(ionAOnionsanArmOut),
   ionAOnionsanArmWave: new CosmosImage(ionAOnionsanArmWave),
   ionAOnionsanKawaii: new CosmosAnimationResources(
      new CosmosImage(ionAOnionsanKawaii),
      new CosmosData(ionAOnionsanKawaii$info)
   ),
   ionAOnionsanWistful: new CosmosImage(ionAOnionsanWistful),
   ionAOnionsanYhear: new CosmosImage(ionAOnionsanYhear),
   ionAProskater: new CosmosAnimationResources(new CosmosImage(ionAProskater), new CosmosData(ionAProskater$info)),
   ionAPyrope: new CosmosAnimationResources(new CosmosImage(ionAPyrope), new CosmosData(ionAPyrope$info)),
   ionAReg: new CosmosAnimationResources(new CosmosImage(ionAReg), new CosmosData(ionAReg$info)),
   ionARgbugDown: new CosmosAnimationResources(new CosmosImage(ionARgbugDown), new CosmosData(ionARgbugDown$info)),
   ionARgbugLeft: new CosmosAnimationResources(new CosmosImage(ionARgbugLeft), new CosmosData(ionARgbugLeft$info)),
   ionARgbugRight: new CosmosAnimationResources(new CosmosImage(ionARgbugRight), new CosmosData(ionARgbugRight$info)),
   ionARgcatDown: new CosmosAnimationResources(new CosmosImage(ionARgcatDown), new CosmosData(ionARgcatDown$info)),
   ionARgcatLeft: new CosmosAnimationResources(new CosmosImage(ionARgcatLeft), new CosmosData(ionARgcatLeft$info)),
   ionARgcatRight: new CosmosAnimationResources(new CosmosImage(ionARgcatRight), new CosmosData(ionARgcatRight$info)),
   ionARgdragonDown: new CosmosAnimationResources(
      new CosmosImage(ionARgdragonDown),
      new CosmosData(ionARgdragonDown$info)
   ),
   ionARgdragonLeft: new CosmosAnimationResources(
      new CosmosImage(ionARgdragonLeft),
      new CosmosData(ionARgdragonLeft$info)
   ),
   ionARgdragonRight: new CosmosAnimationResources(
      new CosmosImage(ionARgdragonRight),
      new CosmosData(ionARgdragonRight$info)
   ),
   ionARgrabbitDown: new CosmosAnimationResources(
      new CosmosImage(ionARgrabbitDown),
      new CosmosData(ionARgrabbitDown$info)
   ),
   ionARgrabbitLeft: new CosmosAnimationResources(
      new CosmosImage(ionARgrabbitLeft),
      new CosmosData(ionARgrabbitLeft$info)
   ),
   ionARgrabbitRight: new CosmosAnimationResources(
      new CosmosImage(ionARgrabbitRight),
      new CosmosData(ionARgrabbitRight$info)
   ),
   ionARinger: new CosmosAnimationResources(new CosmosImage(ionARinger), new CosmosData(ionARinger$info)),
   ionASlimeFather: new CosmosAnimationResources(
      new CosmosImage(ionASlimeFather),
      new CosmosData(ionASlimeFather$info)
   ),
   ionASlimeKid1: new CosmosAnimationResources(new CosmosImage(ionASlimeKid1), new CosmosData(ionASlimeKid1$info)),
   ionASlimeKid2: new CosmosAnimationResources(new CosmosImage(ionASlimeKid2), new CosmosData(ionASlimeKid2$info)),
   ionASlimeMother: new CosmosAnimationResources(
      new CosmosImage(ionASlimeMother),
      new CosmosData(ionASlimeMother$info)
   ),
   ionAThisisnotabomb: new CosmosAnimationResources(
      new CosmosImage(ionAThisisnotabomb),
      new CosmosData(ionAThisisnotabomb$info)
   ),
   ionAVulkin: new CosmosAnimationResources(new CosmosImage(ionAVulkin), new CosmosData(ionAVulkin$info)),
   ionCBb1: new CosmosImage(ionCBb1),
   ionCBb2: new CosmosImage(ionCBb2),
   ionCBb3: new CosmosImage(ionCBb3),
   ionCJanet: new CosmosAnimationResources(new CosmosImage(ionCJanet), new CosmosData(ionCJanet$info)),
   ionCNeuteral: new CosmosImage(ionCNeuteral),
   ionCNicecreamKid: new CosmosImage(ionCNicecreamKid),
   ionCPartysupervisor: new CosmosAnimationResources(
      new CosmosImage(ionCPartysupervisor),
      new CosmosData(ionCPartysupervisor$info)
   ),
   ionCWoshbird: new CosmosImage(ionCWoshbird),
   ionF86: new CosmosAnimationResources(new CosmosImage(ionF86, dark01), new CosmosData(ionF86$info)),
   ionFBird: new CosmosAnimationResources(new CosmosImage(ionFBird), new CosmosData(ionFBird$info)),
   ionFBirdCry: new CosmosAnimationResources(new CosmosImage(ionFBirdCry), new CosmosData(ionFBirdCry$info)),
   ionFBirdFly: new CosmosAnimationResources(new CosmosImage(ionFBirdFly), new CosmosData(ionFBirdFly$info)),
   ionFClamgirl1: new CosmosAnimationResources(new CosmosImage(ionFClamgirl1), new CosmosData(ionFClamgirl1$info)),
   ionFClamgirl2: new CosmosAnimationResources(new CosmosImage(ionFClamgirl2), new CosmosData(ionFClamgirl2$info)),
   ionFDoge: new CosmosAnimationResources(new CosmosImage(ionFDoge), new CosmosData(ionFDoge$info)),
   ionFDogeLeft: new CosmosAnimationResources(new CosmosImage(ionFDogeLeft), new CosmosData(ionFDogeLeft$info)),
   ionFDogeRight: new CosmosAnimationResources(new CosmosImage(ionFDogeRight), new CosmosData(ionFDogeRight$info)),
   ionFEchodude: new CosmosAnimationResources(new CosmosImage(ionFEchodude), new CosmosData(ionFEchodude$info)),
   ionFLongsy: new CosmosAnimationResources(new CosmosImage(ionFLongsy), new CosmosData(ionFLongsy$info)),
   ionFLongsyDark: new CosmosAnimationResources(new CosmosImage(ionFLongsy, dark02), new CosmosData(ionFLongsy$info)),
   ionFMuffet: new CosmosAnimationResources(new CosmosImage(ionFMuffet), new CosmosData(ionFMuffet$info)),
   ionFMuffetBack: new CosmosAnimationResources(new CosmosImage(ionFMuffetBack), new CosmosData(ionFMuffetBack$info)),
   ionFMushroomdance1: new CosmosAnimationResources(
      new CosmosImage(ionFMushroomdance1),
      new CosmosData(ionFMushroomdance1$info)
   ),
   ionFMushroomdance2: new CosmosAnimationResources(
      new CosmosImage(ionFMushroomdance2),
      new CosmosData(ionFMushroomdance2$info)
   ),
   ionFMushroomdance3: new CosmosAnimationResources(
      new CosmosImage(ionFMushroomdance3),
      new CosmosData(ionFMushroomdance3$info)
   ),
   ionFShortsy: new CosmosAnimationResources(new CosmosImage(ionFShortsy), new CosmosData(ionFShortsy$info)),
   ionFShortsyDark: new CosmosAnimationResources(
      new CosmosImage(ionFShortsy, dark02),
      new CosmosData(ionFShortsy$info)
   ),
   ionFShyren: new CosmosAnimationResources(new CosmosImage(ionFShyren), new CosmosData(ionFShyren$info)),
   ionFShyrenNote: new CosmosImage(ionFShyrenNote),
   ionFShyrenSing: new CosmosAnimationResources(new CosmosImage(ionFShyrenSing), new CosmosData(ionFShyrenSing$info)),
   ionFSnail1: new CosmosAnimationResources(new CosmosImage(ionFSnail1), new CosmosData(ionFSnail1$info)),
   ionFSnail2: new CosmosAnimationResources(new CosmosImage(ionFSnail2), new CosmosData(ionFSnail2$info)),
   ionFSpider: new CosmosAnimationResources(new CosmosImage(ionFSpider), new CosmosData(ionFSpider$info)),
   ionFStarkiller: new CosmosAnimationResources(new CosmosImage(ionFStarkiller), new CosmosData(ionFStarkiller$info)),
   ionOChairiel: new CosmosAnimationResources(new CosmosImage(ionOChairiel), new CosmosData(ionOChairiel$info)),
   ionOChairielTalk: new CosmosAnimationResources(
      new CosmosImage(ionOChairielTalk),
      new CosmosData(ionOChairielTalk$info)
   ),
   ionODummy: new CosmosAnimationResources(new CosmosImage(ionODummy), new CosmosData(ionODummy$info)),
   ionODummyBlush: new CosmosAnimationResources(new CosmosImage(ionODummyBlush), new CosmosData(ionODummyBlush$info)),
   ionODummyDark: new CosmosAnimationResources(new CosmosImage(ionODummy, dark01), new CosmosData(ionODummy$info)),
   ionODummyGlad: new CosmosAnimationResources(new CosmosImage(ionODummyGlad), new CosmosData(ionODummyGlad$info)),
   ionODummyMad: new CosmosAnimationResources(new CosmosImage(ionODummyMad), new CosmosData(ionODummyMad$info)),
   ionODummyMadDark: new CosmosAnimationResources(
      new CosmosImage(ionODummyMad, dark01),
      new CosmosData(ionODummyMad$info)
   ),
   ionODummyRage: new CosmosAnimationResources(new CosmosImage(ionODummyRage), new CosmosData(ionODummyRage$info)),
   ionODummySad: new CosmosAnimationResources(new CosmosImage(ionODummySad), new CosmosData(ionODummySad$info)),
   ionODummyShock: new CosmosAnimationResources(new CosmosImage(ionODummyShock), new CosmosData(ionODummyShock$info)),
   ionOFroggit: new CosmosAnimationResources(new CosmosImage(ionOFroggit), new CosmosData(ionOFroggit$info)),
   ionOFroggitBack: new CosmosAnimationResources(
      new CosmosImage(ionOFroggitBack),
      new CosmosData(ionOFroggitBack$info)
   ),
   ionOGonerfrisk: new CosmosAnimationResources(new CosmosImage(ionOGonerfrisk), new CosmosData(ionOGonerfrisk$info)),
   ionOLoox: new CosmosAnimationResources(new CosmosImage(ionOLoox), new CosmosData(ionOLoox$info)),
   ionOLooxBack: new CosmosImage(ionOLooxBack),
   ionOManana: new CosmosAnimationResources(new CosmosImage(ionOManana), new CosmosData(ionOManana$info)),
   ionOMananaBack: new CosmosAnimationResources(new CosmosImage(ionOMananaBack), new CosmosData(ionOMananaBack$info)),
   ionOMushy: new CosmosAnimationResources(new CosmosImage(ionOMushy), new CosmosData(ionOMushy$info)),
   ionOMushyBack: new CosmosAnimationResources(new CosmosImage(ionOMushyBack), new CosmosData(ionOMushyBack$info)),
   ionOPlugbelly: new CosmosAnimationResources(new CosmosImage(ionOPlugbelly), new CosmosData(ionOPlugbelly$info)),
   ionOPlugbellyBack: new CosmosAnimationResources(
      new CosmosImage(ionOPlugbellyBack),
      new CosmosData(ionOPlugbellyBack$info)
   ),
   ionOSilencio: new CosmosAnimationResources(new CosmosImage(ionOSilencio), new CosmosData(ionOSilencio$info)),
   ionOSilencioBack: new CosmosAnimationResources(
      new CosmosImage(ionOSilencioBack),
      new CosmosData(ionOSilencioBack$info)
   ),
   ionOSteaksalesman: new CosmosAnimationResources(
      new CosmosImage(ionOSteaksalesman),
      new CosmosData(ionOSteaksalesman$info)
   ),
   ionOSteaksalesmanBack: new CosmosAnimationResources(
      new CosmosImage(ionOSteaksalesmanBack),
      new CosmosData(ionOSteaksalesmanBack$info)
   ),
   ionOWoshuaBack: new CosmosAnimationResources(new CosmosImage(ionOWoshuaBack), new CosmosData(ionOWoshuaBack$info)),
   ionRiverboi: new CosmosAnimationResources(new CosmosImage(ionRiverboi), new CosmosData(ionRiverboi$info)),
   ionS98: new CosmosAnimationResources(new CosmosImage(ionS98), new CosmosData(ionS98$info)),
   ionSBeautifulfish: new CosmosAnimationResources(
      new CosmosImage(ionSBeautifulfish),
      new CosmosData(ionSBeautifulfish$info)
   ),
   ionSBigmouth: new CosmosAnimationResources(new CosmosImage(ionSBigmouth), new CosmosData(ionSBigmouth$info)),
   ionSBunbun: new CosmosAnimationResources(new CosmosImage(ionSBunbun), new CosmosData(ionSBunbun$info)),
   ionSBunny: new CosmosAnimationResources(new CosmosImage(ionSBunny), new CosmosData(ionSBunny$info)),
   ionSCupjake: new CosmosAnimationResources(new CosmosImage(ionSCupjake), new CosmosData(ionSCupjake$info)),
   ionSDogamy: new CosmosAnimationResources(new CosmosImage(ionSDogamy), new CosmosData(ionSDogamy$info)),
   ionSDogaressa: new CosmosAnimationResources(new CosmosImage(ionSDogaressa), new CosmosData(ionSDogaressa$info)),
   ionSDoggo: new CosmosAnimationResources(new CosmosImage(ionSDoggo), new CosmosData(ionSDoggo$info)),
   ionSFaun: new CosmosAnimationResources(new CosmosImage(ionSFaun), new CosmosData(ionSFaun$info)),
   ionSGreatdog: new CosmosAnimationResources(new CosmosImage(ionSGreatdog), new CosmosData(ionSGreatdog$info)),
   ionSGreatdogHapp: new CosmosAnimationResources(
      new CosmosImage(ionSGreatdogHapp),
      new CosmosData(ionSGreatdogHapp$info)
   ),
   ionSGreatdogLick: new CosmosAnimationResources(
      new CosmosImage(ionSGreatdogLick),
      new CosmosData(ionSGreatdogLick$info)
   ),
   ionSGrillby: new CosmosAnimationResources(new CosmosImage(ionSGrillby), new CosmosData(ionSGrillby$info)),
   ionSHappy: new CosmosAnimationResources(new CosmosImage(ionSHappy), new CosmosData(ionSHappy$info)),
   ionSIcewolf: new CosmosAnimationResources(new CosmosImage(ionSIcewolf), new CosmosData(ionSIcewolf$info)),
   ionSImafraidjumitebeinagang: new CosmosAnimationResources(
      new CosmosImage(ionSImafraidjumitebeinagang),
      new CosmosData(ionSImafraidjumitebeinagang$info)
   ),
   ionSInnkeep: new CosmosAnimationResources(new CosmosImage(ionSInnkeep), new CosmosData(ionSInnkeep$info)),
   ionSKabakk: new CosmosAnimationResources(new CosmosImage(ionSKabakk), new CosmosData(ionSKabakk$info)),
   ionSKakurolady: new CosmosAnimationResources(new CosmosImage(ionSKakurolady), new CosmosData(ionSKakurolady$info)),
   ionSLibrarian: new CosmosAnimationResources(new CosmosImage(ionSLibrarian), new CosmosData(ionSLibrarian$info)),
   ionSLoverboy: new CosmosAnimationResources(new CosmosImage(ionSLoverboy), new CosmosData(ionSLoverboy$info)),
   ionSMoonrocks1: new CosmosAnimationResources(new CosmosImage(ionSMoonrocks1), new CosmosData(ionSMoonrocks1$info)),
   ionSMoonrocks2: new CosmosAnimationResources(new CosmosImage(ionSMoonrocks2), new CosmosData(ionSMoonrocks2$info)),
   ionSNicecream: new CosmosAnimationResources(new CosmosImage(ionSNicecream), new CosmosData(ionSNicecream$info)),
   ionSNicecreamCurious: new CosmosAnimationResources(
      new CosmosImage(ionSNicecreamCurious),
      new CosmosData(ionSNicecreamCurious$info)
   ),
   ionSNicecreamHappi: new CosmosAnimationResources(
      new CosmosImage(ionSNicecreamHappi),
      new CosmosData(ionSNicecreamHappi$info)
   ),
   ionSNicecreamSad: new CosmosAnimationResources(
      new CosmosImage(ionSNicecreamSad),
      new CosmosData(ionSNicecreamSad$info)
   ),
   ionSNicecreamShocked: new CosmosAnimationResources(
      new CosmosImage(ionSNicecreamShocked),
      new CosmosData(ionSNicecreamShocked$info)
   ),
   ionSPolitics: new CosmosAnimationResources(new CosmosImage(ionSPolitics), new CosmosData(ionSPolitics$info)),
   ionSPunkhamster: new CosmosAnimationResources(
      new CosmosImage(ionSPunkhamster),
      new CosmosData(ionSPunkhamster$info)
   ),
   ionSRabbit: new CosmosAnimationResources(new CosmosImage(ionSRabbit), new CosmosData(ionSRabbit$info)),
   ionSRedbird: new CosmosAnimationResources(new CosmosImage(ionSRedbird), new CosmosData(ionSRedbird$info)),
   ionSSnakeboi: new CosmosAnimationResources(new CosmosImage(ionSSnakeboi), new CosmosData(ionSSnakeboi$info)),
   ionSSnowdrake: new CosmosAnimationResources(new CosmosImage(ionSSnowdrake), new CosmosData(ionSSnowdrake$info)),
   ionSSweetie: new CosmosAnimationResources(new CosmosImage(ionSSweetie), new CosmosData(ionSSweetie$info)),
   ionSVegetoid: new CosmosAnimationResources(new CosmosImage(ionSVegetoid), new CosmosData(ionSVegetoid$info)),
   ionSWisconsin: new CosmosAnimationResources(new CosmosImage(ionSWisconsin), new CosmosData(ionSWisconsin$info)),
   iooAArtsncrafts: new CosmosImage(sources.iooAArtsncrafts),
   iooABarricade: new CosmosAnimationResources(new CosmosImage(iooABarricade), new CosmosData(iooABarricade$info)),
   iooABeaker: new CosmosImage(iooABeaker),
   iooABeam: new CosmosImage(iooABeam, red => [ 255, 255, 255, red ]),
   iooABedcounter: new CosmosImage(iooABedcounter),
   iooABigAssDoor: new CosmosImage(iooABigAssDoor),
   iooABom: new CosmosImage(iooABom),
   iooABomburst: new CosmosAnimationResources(
      new CosmosImage(sources.iooABomburst),
      new CosmosData(sources.iooABomburst$info)
   ),
   iooABooster: new CosmosAnimationResources(new CosmosImage(iooABooster), new CosmosData(iooABooster$info)),
   iooABoosterBad: new CosmosAnimationResources(new CosmosImage(iooABoosterBad), new CosmosData(iooABoosterBad$info)),
   iooABoosterStrut: new CosmosAnimationResources(
      new CosmosImage(iooABoosterStrut),
      new CosmosData(iooABoosterStrut$info)
   ),
   iooABurgies: new CosmosImage(sources.iooABurgies),
   iooACardboard: new CosmosImage(iooACardboard),
   iooACarrier: new CosmosAnimationResources(new CosmosImage(iooACarrier), new CosmosData(iooACarrier$info)),
   iooACheckpointOver: new CosmosImage(iooACheckpointOver),
   iooACheckpointUnder: new CosmosImage(iooACheckpointUnder),
   iooAChesstable: new CosmosAnimationResources(new CosmosImage(iooAChesstable), new CosmosData(iooAChesstable$info)),
   iooACompactlazerdeluxe: new CosmosImage(iooACompactlazerdeluxe),
   iooAConfetti: new CosmosAnimationResources(new CosmosImage(iooAConfetti), new CosmosData(iooAConfetti$info)),
   iooAConveyor: new CosmosAnimationResources(new CosmosImage(iooAConveyor), new CosmosData(iooAConveyor$info)),
   iooACORE: new CosmosAnimationResources(new CosmosImage(iooACORE), new CosmosData(iooACORE$info)),
   iooACorecolumn: new CosmosAnimationResources(new CosmosImage(iooACorecolumn), new CosmosData(iooACorecolumn$info)),
   iooACORECritical: new CosmosAnimationResources(
      new CosmosImage(iooACORECritical),
      new CosmosData(iooACORECritical$info)
   ),
   iooACOREOverlay: new CosmosAnimationResources(
      new CosmosImage(iooACOREOverlay),
      new CosmosData(iooACOREOverlay$info)
   ),
   iooACoreswitch: new CosmosAnimationResources(new CosmosImage(iooACoreswitch), new CosmosData(iooACoreswitch$info)),
   iooACorndog: new CosmosImage(iooACorndog),
   iooADeadLeaf: new CosmosImage(iooADeadLeaf),
   iooADinnertable: new CosmosImage(iooADinnertable),
   iooADiscoball: new CosmosAnimationResources(new CosmosImage(iooADiscoball), new CosmosData(iooADiscoball$info)),
   iooADrawbridge: new CosmosImage(iooADrawbridge),
   iooADtTubes: new CosmosAnimationResources(new CosmosImage(iooADtTubes), new CosmosData(iooADtTubes$info)),
   iooAElevatorL1: new CosmosImage(sources.iooAElevatorL1),
   iooAElevatorL2: new CosmosImage(sources.iooAElevatorL2),
   iooAElevatorR1: new CosmosImage(sources.iooAElevatorR1),
   iooAElevatorR2: new CosmosImage(sources.iooAElevatorR2),
   iooAFakeFireStation: new CosmosAnimationResources(
      new CosmosImage(sources.iooAFakeFireStation),
      new CosmosData(sources.iooAFakeFireStation$info)
   ),
   iooAFloorsegment: new CosmosAnimationResources(
      new CosmosImage(iooAFloorsegment),
      new CosmosData(iooAFloorsegment$info)
   ),
   iooAFlowertable: new CosmosImage(iooAFlowertable),
   iooAFoodcounter: new CosmosImage(iooAFoodcounter),
   iooAGlobe: new CosmosImage(iooAGlobe),
   iooAHexogen: new CosmosImage(iooAHexogen),
   iooAHotelfood: new CosmosAnimationResources(new CosmosImage(iooAHotelfood), new CosmosData(iooAHotelfood$info)),
   iooAKittyemu2: new CosmosImage(sources.iooAKittyemu2),
   iooALabcounter: new CosmosImage(iooALabcounter),
   iooALabtable: new CosmosAnimationResources(new CosmosImage(iooALabtable), new CosmosData(iooALabtable$info)),
   iooALabtext: new CosmosImage(sources.iooALabtext),
   iooALaunchpad: new CosmosAnimationResources(new CosmosImage(iooALaunchpad), new CosmosData(iooALaunchpad$info)),
   iooALaunchpadAbove: new CosmosAnimationResources(
      new CosmosImage(iooALaunchpadAbove),
      new CosmosData(iooALaunchpadAbove$info)
   ),
   iooAMegacarrier: new CosmosAnimationResources(
      new CosmosImage(iooAMegacarrier),
      new CosmosData(iooAMegacarrier$info)
   ),
   iooAMewposter: new CosmosAnimationResources(new CosmosImage(iooAMewposter), new CosmosData(iooAMewposter$info)),
   iooAMirrortableShort: new CosmosImage(iooAMirrortableShort),
   iooAMoneyFireworks: new CosmosImage(iooAMoneyFireworks),
   iooAMoneyMew: new CosmosImage(iooAMoneyMew),
   iooAMoneyRadio: new CosmosImage(iooAMoneyRadio),
   iooAMonitorguy: new CosmosAnimationResources(new CosmosImage(iooAMonitorguy), new CosmosData(iooAMonitorguy$info)),
   iooAMonitorguyWater: new CosmosAnimationResources(
      new CosmosImage(iooAMonitorguyWater),
      new CosmosData(iooAMonitorguyWater$info)
   ),
   iooAMoonPie: new CosmosImage(iooAMoonPie),
   iooAOneOilyBoi: new CosmosImage(iooAOneOilyBoi),
   iooAPathtile: new CosmosImage(iooAPathtile),
   iooAPedastal: new CosmosImage(iooAPedastal),
   iooAPedastalReverse: new CosmosAnimationResources(
      new CosmosImage(iooAPedastalReverse),
      new CosmosData(iooAPedastalReverse$info)
   ),
   iooAPottedtable: new CosmosImage(iooAPottedtable),
   iooAPrimespire: new CosmosImage(iooAPrimespire),
   iooAProgresser: new CosmosImage(sources.iooAProgresser),
   iooAPterm: new CosmosAnimationResources(new CosmosImage(iooAPterm), new CosmosData(iooAPterm$info)),
   iooAPuzzledoor: new CosmosAnimationResources(new CosmosImage(iooAPuzzledoor), new CosmosData(iooAPuzzledoor$info)),
   iooAPuzzlenode: new CosmosAnimationResources(new CosmosImage(iooAPuzzlenode), new CosmosData(iooAPuzzlenode$info)),
   iooAPuzzlenodeDark: new CosmosAnimationResources(
      new CosmosImage(iooAPuzzlenodeDark),
      new CosmosData(iooAPuzzlenodeDark$info)
   ),
   iooAReccolumn: new CosmosAnimationResources(new CosmosImage(iooAReccolumn), new CosmosData(iooAReccolumn$info)),
   iooAReccolumnLeft: new CosmosAnimationResources(
      new CosmosImage(iooAReccolumnLeft),
      new CosmosData(iooAReccolumnLeft$info)
   ),
   iooAReccolumnRight: new CosmosAnimationResources(
      new CosmosImage(iooAReccolumnRight),
      new CosmosData(iooAReccolumnRight$info)
   ),
   iooARecycler: new CosmosImage(iooARecycler),
   iooARoombed: new CosmosImage(iooARoombed),
   iooARoombedCover: new CosmosImage(iooARoombedCover),
   iooARoomtable: new CosmosImage(iooARoomtable),
   iooASakuraLeaf: new CosmosImage(iooASakuraLeaf),
   iooAScreen1: new CosmosImage(sources.iooAScreen1),
   iooAScreen1alt: new CosmosImage(sources.iooAScreen1alt),
   iooAScreen2: new CosmosImage(sources.iooAScreen2),
   iooAScreenborder: new CosmosImage(iooAScreenborder),
   iooAShowbarrier: new CosmosAnimationResources(
      new CosmosImage(iooAShowbarrier),
      new CosmosData(iooAShowbarrier$info)
   ),
   iooAShowglow: new CosmosAnimationResources(new CosmosImage(iooAShowglow), new CosmosData(iooAShowglow$info)),
   iooAShowtext: new CosmosImage(sources.iooAShowtext),
   iooASign: new CosmosImage(iooASign),
   iooASignposter: new CosmosAnimationResources(
      new CosmosImage(sources.iooASignposter),
      new CosmosData(sources.iooASignposter$info)
   ),
   iooASlantedSecurityField: new CosmosAnimationResources(
      new CosmosImage(iooASlantedSecurityField),
      new CosmosData(iooASlantedSecurityField$info)
   ),
   iooASonic: new CosmosImage(iooASonic),
   iooASparkler: new CosmosAnimationResources(new CosmosImage(iooASparkler), new CosmosData(iooASparkler$info)),
   iooASpeedline: new CosmosImage(iooASpeedline),
   iooASpotlight: new CosmosImage(iooASpotlight),
   iooASpotlightAlt: new CosmosImage(iooASpotlightAlt),
   iooAStage: new CosmosImage(iooAStage),
   iooAStagecloud: new CosmosImage(iooAStagecloud),
   iooAStagelight: new CosmosAnimationResources(new CosmosImage(iooAStagelight), new CosmosData(iooAStagelight$info)),
   iooAStageoverlay: new CosmosImage(iooAStageoverlay),
   iooAStatue: new CosmosAnimationResources(new CosmosImage(iooAStatue), new CosmosData(iooAStatue$info)),
   iooASyringe: new CosmosImage(iooASyringe),
   iooATablaphone: new CosmosImage(iooATablaphone),
   iooAThrift: new CosmosImage(sources.iooAThrift),
   iooATimer: new CosmosImage(sources.iooATimer),
   iooAVender: new CosmosAnimationResources(new CosmosImage(iooAVender), new CosmosData(iooAVender$info)),
   iooAWishflower: new CosmosImage(iooAWishflower),
   iooAWorkstation: new CosmosAnimationResources(
      new CosmosImage(iooAWorkstation),
      new CosmosData(iooAWorkstation$info)
   ),
   iooAXterm: new CosmosImage(iooAXterm),
   iooBed: new CosmosImage(iooBed),
   iooBedcover: new CosmosImage(iooBedcover),
   iooBedcoverFinal: new CosmosImage(iooBedcoverFinal),
   iooCArch1: new CosmosImage(iooCArch1),
   iooCArch2: new CosmosImage(iooCArch2),
   iooCArchiveBlookhouse: new CosmosImage(iooCArchiveBlookhouse),
   iooCArchiveBlookhouseExtra: new CosmosImage(iooCArchiveBlookhouseExtra),
   iooCArchiveKeystoneDiamond: new CosmosAnimationResources(
      new CosmosImage(iooCArchiveKeystoneDiamond),
      new CosmosData(iooCArchiveKeystoneDiamond$info)
   ),
   iooCArchiveLight: new CosmosImage(iooCArchiveLight),
   iooCArchiveLightInverted: new CosmosImage(iooCArchiveLightInverted),
   iooCArchivePuzzlepylon: new CosmosAnimationResources(
      new CosmosImage(iooCArchivePuzzlepylon),
      new CosmosData(iooCArchivePuzzlepylon$info)
   ),
   iooCArchivePuzzlepylonOverlay: new CosmosImage(iooCArchivePuzzlepylonOverlay),
   iooCArchiveSentry: new CosmosImage(iooCArchiveSentry),
   iooCArchiveStrut: new CosmosImage(sources.iooCArchiveStrut),
   iooCArchiveTerminal: new CosmosAnimationResources(
      new CosmosImage(iooCArchiveTerminal),
      new CosmosData(iooCArchiveTerminal$info)
   ),
   iooCAsgoreAsrielOver: new CosmosImage(iooCAsgoreAsrielOver),
   iooCBastion: new CosmosAnimationResources(new CosmosImage(iooCBastion), new CosmosData(iooCBastion$info)),
   iooCBastionCable: new CosmosAnimationResources(
      new CosmosImage(iooCBastionCable),
      new CosmosData(iooCBastionCable$info)
   ),
   iooCBastionwall: new CosmosImage(iooCBastionwall),
   iooCCArchiveFoundryA3Over: new CosmosImage(iooCCArchiveFoundryA3Over),
   iooCCArchiveFoundryB2Over1: new CosmosImage(iooCCArchiveFoundryB2Over1),
   iooCCArchiveFoundryB2Over2: new CosmosImage(iooCCArchiveFoundryB2Over2),
   iooCCAsgoreFrontOver: new CosmosImage(iooCCAsgoreFrontOver),
   iooCChair: new CosmosImage(iooCChair),
   iooCCity1: new CosmosImage(iooCCity1),
   iooCCity1dark: new CosmosImage(iooCCity1dark),
   iooCCity2: new CosmosImage(iooCCity2),
   iooCCity2dark: new CosmosImage(iooCCity2dark),
   iooCCity3: new CosmosImage(iooCCity3),
   iooCCity3dark: new CosmosImage(iooCCity3dark),
   iooCCity4: new CosmosImage(iooCCity4),
   iooCCity4dark: new CosmosImage(iooCCity4dark),
   iooCCity5: new CosmosImage(iooCCity5),
   iooCCity5dark: new CosmosImage(iooCCity5dark),
   iooCCityship: new CosmosAnimationResources(new CosmosImage(iooCCityship), new CosmosData(iooCCityship$info)),
   iooCDrinkTeapot: new CosmosAnimationResources(
      new CosmosImage(iooCDrinkTeapot),
      new CosmosData(iooCDrinkTeapot$info)
   ),
   iooCFadestrip: new CosmosImage(iooCFadestrip),
   iooCFicus: new CosmosImage(iooCFicus),
   iooCFireplace: new CosmosImage(iooCFireplace),
   iooCMirror: new CosmosImage(iooCMirror),
   iooCPicnictable: new CosmosImage(iooCPicnictable),
   iooCPillar: new CosmosImage(iooCPillar),
   iooCPresent: new CosmosAnimationResources(new CosmosImage(iooCPresent), new CosmosData(iooCPresent$info)),
   iooCQuiethouse: new CosmosImage(iooCQuiethouse),
   iooCRing1: new CosmosImage(iooCRing1),
   iooCRing2: new CosmosImage(iooCRing2),
   iooCSmallscreen: new CosmosAnimationResources(
      new CosmosImage(iooCSmallscreen),
      new CosmosData(iooCSmallscreen$info)
   ),
   iooCSoundsuspender: new CosmosImage(iooCSoundsuspender),
   iooCSoundtower: new CosmosImage(iooCSoundtower),
   iooCTable: new CosmosImage(iooCTable),
   iooCTeacup: new CosmosImage(iooCTeacup),
   iooCTerminal: new CosmosAnimationResources(
      new CosmosImage(sources.iooCTerminal),
      new CosmosData(sources.iooCTerminal$info)
   ),
   iooCThrone: new CosmosAnimationResources(new CosmosImage(iooCThrone), new CosmosData(iooCThrone$info)),
   iooCTopcouch: new CosmosImage(iooCTopcouch),
   iooCTopcouchLight: new CosmosImage(iooCTopcouchLight),
   iooCTrash: new CosmosImage(iooCTrash),
   iooCTvBack: new CosmosImage(iooCTvBack),
   iooCTvLite: new CosmosImage(iooCTvLite),
   iooCVirtexit: new CosmosImage(iooCVirtexit),
   iooDimbox: new CosmosAnimationResources(new CosmosImage(iooDimbox), new CosmosData(iooDimbox$info)),
   iooFArtifact: new CosmosAnimationResources(new CosmosImage(iooFArtifact), new CosmosData(iooFArtifact$info)),
   iooFAsteroid1: new CosmosImage(iooFAsteroid1),
   iooFBench: new CosmosImage(iooFBench, dark02),
   iooFBlookComputer: new CosmosAnimationResources(
      new CosmosImage(iooFBlookComputer),
      new CosmosData(iooFBlookComputer$info)
   ),
   iooFBlookhouse: new CosmosImage(iooFBlookhouse),
   iooFBook: new CosmosImage(iooFBook),
   iooFBoots: new CosmosImage(iooFBoots),
   iooFBurger: new CosmosImage(iooFBurger),
   iooFCheesetable: new CosmosAnimationResources(
      new CosmosImage(iooFCheesetable),
      new CosmosData(iooFCheesetable$info)
   ),
   iooFCookpotBlack: new CosmosAnimationResources(
      new CosmosImage(iooFCookpotBlack),
      new CosmosData(iooFCookpotBlack$info)
   ),
   iooFCookpotHeat: new CosmosAnimationResources(
      new CosmosImage(iooFCookpotHeat),
      new CosmosData(iooFCookpotHeat$info)
   ),
   iooFCookpotStir: new CosmosAnimationResources(
      new CosmosImage(iooFCookpotStir),
      new CosmosData(iooFCookpotStir$info)
   ),
   iooFCooler: new CosmosImage(iooFCooler),
   iooFCoolerDark: new CosmosImage(iooFCooler, dark01),
   iooFDrinkHotchocolate: new CosmosAnimationResources(
      new CosmosImage(iooFDrinkHotchocolate),
      new CosmosData(iooFDrinkHotchocolate$info)
   ),
   iooFDrinkSoda: new CosmosAnimationResources(new CosmosImage(iooFDrinkSoda), new CosmosData(iooFDrinkSoda$info)),
   iooFDrinkSugar: new CosmosAnimationResources(new CosmosImage(iooFDrinkSugar), new CosmosData(iooFDrinkSugar$info)),
   iooFDrinkTea: new CosmosAnimationResources(new CosmosImage(iooFDrinkTea), new CosmosData(iooFDrinkTea$info)),
   iooFDrinkTeapot: new CosmosAnimationResources(
      new CosmosImage(iooFDrinkTeapot),
      new CosmosData(iooFDrinkTeapot$info)
   ),
   iooFDrinkWater: new CosmosAnimationResources(new CosmosImage(iooFDrinkWater), new CosmosData(iooFDrinkWater$info)),
   iooFEchoflower: new CosmosAnimationResources(new CosmosImage(iooFEchoflower), new CosmosData(iooFEchoflower$info)),
   iooFEchoflowerDark: new CosmosAnimationResources(
      new CosmosImage(iooFEchoflower, contrast),
      new CosmosData(iooFEchoflower$info)
   ),
   iooFEggo: new CosmosImage(iooFEggo),
   iooFFenceBottomleft: new CosmosImage(iooFFenceBottomleft),
   iooFFenceBottomleftcap: new CosmosImage(iooFFenceBottomleftcap),
   iooFFenceBottomright: new CosmosImage(iooFFenceBottomright),
   iooFFenceBottomrightcap: new CosmosImage(iooFFenceBottomrightcap),
   iooFFenceMidcenter: new CosmosImage(iooFFenceMidcenter),
   iooFFenceMidleft: new CosmosImage(iooFFenceMidleft),
   iooFFenceMidright: new CosmosImage(iooFFenceMidright),
   iooFFenceTopleft: new CosmosImage(iooFFenceTopleft),
   iooFFenceTopleftcap: new CosmosImage(iooFFenceTopleftcap),
   iooFFenceTopright: new CosmosImage(iooFFenceTopright),
   iooFFenceToprightcap: new CosmosImage(iooFFenceToprightcap),
   iooFFenceVertleft: new CosmosImage(iooFFenceVertleft),
   iooFFenceVertright: new CosmosImage(iooFFenceVertright),
   iooFFloorspear: new CosmosAnimationResources(new CosmosImage(iooFFloorspear), new CosmosData(iooFFloorspear$info)),
   iooFFloorspearBase: new CosmosImage(iooFFloorspearBase),
   iooFFries: new CosmosImage(iooFFries),
   iooFGenohole: new CosmosImage(iooFGenohole),
   iooFGunk1: new CosmosAnimationResources(new CosmosImage(iooFGunk1, dark02), new CosmosData(iooFGunk1$info)),
   iooFGunk2: new CosmosAnimationResources(new CosmosImage(iooFGunk2, dark02), new CosmosData(iooFGunk2$info)),
   iooFGunk3: new CosmosAnimationResources(new CosmosImage(iooFGunk3, dark02), new CosmosData(iooFGunk3$info)),
   iooFHovercrystal: new CosmosAnimationResources(
      new CosmosImage(iooFHovercrystal, dark02),
      new CosmosData(iooFHovercrystal$info)
   ),
   iooFJumpsuit: new CosmosImage(iooFJumpsuit, dark02),
   iooFMazeshadow: new CosmosAnimationResources(new CosmosImage(iooFMazeshadow), new CosmosData(iooFMazeshadow$info)),
   iooFNapstacouch: new CosmosImage(iooFNapstacouch),
   iooFNapster: new CosmosImage(sources.iooFNapster),
   iooFOverhead: new CosmosImage(iooFOverhead),
   iooFPiano: new CosmosImage(iooFPiano),
   iooFPianoarrowDot: new CosmosAnimationResources(
      new CosmosImage(iooFPianoarrowDot),
      new CosmosData(iooFPianoarrowDot$info)
   ),
   iooFPianoarrowDown: new CosmosAnimationResources(
      new CosmosImage(iooFPianoarrowDown),
      new CosmosData(iooFPianoarrowDown$info)
   ),
   iooFPianoarrowLeft: new CosmosAnimationResources(
      new CosmosImage(iooFPianoarrowLeft),
      new CosmosData(iooFPianoarrowLeft$info)
   ),
   iooFPianoarrowRight: new CosmosAnimationResources(
      new CosmosImage(iooFPianoarrowRight),
      new CosmosData(iooFPianoarrowRight$info)
   ),
   iooFPianoarrowUp: new CosmosAnimationResources(
      new CosmosImage(iooFPianoarrowUp),
      new CosmosData(iooFPianoarrowUp$info)
   ),
   iooFPianoOver1: new CosmosImage(iooFPianoOver1),
   iooFPianoOver2: new CosmosImage(iooFPianoOver2),
   iooFPianosolution: new CosmosAnimationResources(
      new CosmosImage(iooFPianosolution),
      new CosmosData(iooFPianosolution$info)
   ),
   iooFPianosolution2: new CosmosAnimationResources(
      new CosmosImage(iooFPianosolution2),
      new CosmosData(iooFPianosolution2$info)
   ),
   iooFPlankBridge: new CosmosImage(iooFPlankBridge),
   iooFPrechaseBridge: new CosmosImage(iooFPrechaseBridge),
   iooFPuzzle1Over: new CosmosImage(iooFPuzzle1Over),
   iooFPuzzle2Over: new CosmosImage(iooFPuzzle2Over),
   iooFPuzzle3Over: new CosmosImage(iooFPuzzle3Over),
   iooFPuzzlepylon: new CosmosAnimationResources(
      new CosmosImage(iooFPuzzlepylon),
      new CosmosData(iooFPuzzlepylon$info)
   ),
   iooFPuzzlepylonOverlay: new CosmosImage(iooFPuzzlepylonOverlay),
   iooFRaft: new CosmosImage(iooFRaft, dark02),
   iooFRedcouch: new CosmosImage(iooFRedcouch),
   iooFRedsword: new CosmosImage(iooFRedsword),
   iooFrontierCactus: new CosmosImage(iooFrontierCactus),
   iooFrontierComputer: new CosmosAnimationResources(
      new CosmosImage(iooFrontierComputer),
      new CosmosData(iooFrontierComputer$info)
   ),
   iooFrontierKrios: new CosmosImage(sources.iooFrontierKrios),
   iooFrontierMirrorBackdrop: new CosmosImage(iooFrontierMirrorBackdrop),
   iooFrontierOver: new CosmosImage(iooFrontierOver),
   iooFrontierPlant: new CosmosImage(iooFrontierPlant),
   iooFrontierTable: new CosmosImage(iooFrontierTable),
   iooFrontierUnder: new CosmosImage(iooFrontierUnder),
   iooFRug: new CosmosImage(iooFRug),
   iooFSecretbook: new CosmosAnimationResources(new CosmosImage(iooFSecretbook), new CosmosData(iooFSecretbook$info)),
   iooFShard: new CosmosImage(iooFShard),
   iooFShinycab: new CosmosImage(iooFShinycab),
   iooFShinycabDark: new CosmosImage(iooFShinycab, dark01),
   iooFSign: new CosmosImage(iooFSign),
   iooFSnack: new CosmosImage(iooFSnack),
   iooFSpaghetti: new CosmosImage(iooFSpaghetti),
   iooFSpear: new CosmosImage(iooFSpear),
   iooFSpearHole: new CosmosImage(iooFSpearHole),
   iooFSpearSpawn: new CosmosAnimationResources(new CosmosImage(iooFSpearSpawn), new CosmosData(iooFSpearSpawn$info)),
   iooFSpearStab: new CosmosImage(iooFSpearStab),
   iooFSpiderflower: new CosmosImage(iooFSpiderflower),
   iooFSpidertable: new CosmosImage(iooFSpidertable),
   iooFStatue: new CosmosAnimationResources(new CosmosImage(iooFStatue, dark02), new CosmosData(iooFStatue$info)),
   iooFSteam: new CosmosImage(iooFSteam),
   iooFStoveknob: new CosmosImage(iooFStoveknob),
   iooFTallgrass: new CosmosAnimationResources(new CosmosImage(iooFTallgrass), new CosmosData(iooFTallgrass$info)),
   iooFTeacup: new CosmosImage(iooFTeacup),
   iooFTeapot: new CosmosAnimationResources(new CosmosImage(iooFTeapot), new CosmosData(iooFTeapot$info)),
   iooFTemstatue: new CosmosImage(sources.iooFTemstatue),
   iooFTHATSTHESTUFF: new CosmosAnimationResources(
      new CosmosImage(iooFTHATSTHESTUFF),
      new CosmosData(iooFTHATSTHESTUFF$info)
   ),
   iooFThundertron: new CosmosAnimationResources(
      new CosmosImage(iooFThundertron),
      new CosmosData(iooFThundertron$info)
   ),
   iooFTinychair: new CosmosImage(iooFTinychair),
   iooFTrash: new CosmosImage(iooFTrash),
   iooFTronsnail1: new CosmosAnimationResources(new CosmosImage(iooFTronsnail1), new CosmosData(iooFTronsnail1$info)),
   iooFTronsnail2: new CosmosAnimationResources(new CosmosImage(iooFTronsnail2), new CosmosData(iooFTronsnail2$info)),
   iooFTronsnail3: new CosmosAnimationResources(new CosmosImage(iooFTronsnail3), new CosmosData(iooFTronsnail3$info)),
   iooFUndyneDoor: new CosmosAnimationResources(new CosmosImage(iooFUndyneDoor), new CosmosData(iooFUndyneDoor$info)),
   iooFUndyneDrawer: new CosmosAnimationResources(
      new CosmosImage(iooFUndyneDrawer),
      new CosmosData(iooFUndyneDrawer$info)
   ),
   iooFUndynehouse: new CosmosAnimationResources(
      new CosmosImage(iooFUndynehouse),
      new CosmosData(iooFUndynehouse$info)
   ),
   iooFUndynehouseWrecked: new CosmosAnimationResources(
      new CosmosImage(iooFUndynehouseWrecked),
      new CosmosData(iooFUndynehouseWrecked$info)
   ),
   iooFUndynePiano: new CosmosImage(iooFUndynePiano),
   iooFUndyneTable: new CosmosAnimationResources(
      new CosmosImage(iooFUndyneTable),
      new CosmosData(iooFUndyneTable$info)
   ),
   iooFUndyneWindow: new CosmosAnimationResources(
      new CosmosImage(iooFUndyneWindow),
      new CosmosData(iooFUndyneWindow$info)
   ),
   iooFVeggies: new CosmosAnimationResources(new CosmosImage(iooFVeggies), new CosmosData(iooFVeggies$info)),
   iooFVendingMachine: new CosmosAnimationResources(
      new CosmosImage(iooFVendingMachine),
      new CosmosData(iooFVendingMachine$info)
   ),
   iooFViewBackdrop: new CosmosImage(iooFViewBackdrop),
   iooFWallsign: new CosmosImage(iooFWallsign),
   iooFWallsignPainted: new CosmosImage(iooFWallsignPainted),
   iooFWatercooler: new CosmosImage(iooFWatercooler),
   iooFWeb1: new CosmosImage(iooFWeb1, dark02),
   iooFWeb2: new CosmosImage(iooFWeb2, dark02),
   iooFWeb3: new CosmosImage(iooFWeb3, dark02),
   iooFWebcube: new CosmosImage(iooFWebcube),
   iooFWebcuboid: new CosmosImage(iooFWebcuboid),
   iooHovercar: new CosmosAnimationResources(new CosmosImage(iooHovercar), new CosmosData(iooHovercar$info)),
   iooHovercarBack: new CosmosAnimationResources(
      new CosmosImage(iooHovercarBack),
      new CosmosData(iooHovercarBack$info)
   ),
   iooOBreakfast: new CosmosImage(iooOBreakfast),
   iooOButton: new CosmosAnimationResources(new CosmosImage(iooOButton), new CosmosData(iooOButton$info)),
   iooOButtonDark: new CosmosAnimationResources(new CosmosImage(iooOButton, dark02), new CosmosData(iooOButton$info)),
   iooOChairiel: new CosmosAnimationResources(new CosmosImage(iooOChairiel), new CosmosData(iooOChairiel$info)),
   iooOCoatrack: new CosmosImage(iooOCoatrack),
   iooODiningTable: new CosmosImage(iooODiningTable),
   iooODipper: new CosmosImage(iooODipper),
   iooODjtable: new CosmosAnimationResources(new CosmosImage(iooODjtable), new CosmosData(iooODjtable$info)),
   iooOExitfail: new CosmosAnimationResources(new CosmosImage(iooOExitfail), new CosmosData(iooOExitfail$info)),
   iooOFirecover: new CosmosImage(iooOFirecover),
   iooOFireplace: new CosmosAnimationResources(new CosmosImage(iooOFireplace), new CosmosData(iooOFireplace$info)),
   iooOGate: new CosmosAnimationResources(new CosmosImage(iooOGate), new CosmosData(iooOGate$info)),
   iooOHalo: new CosmosImage(iooOHalo),
   iooOIndicatorButton: new CosmosAnimationResources(
      new CosmosImage(iooOIndicatorButton),
      new CosmosData(iooOIndicatorButton$info)
   ),
   iooOMirrorBackdrop: new CosmosImage(iooOMirrorBackdrop),
   iooOPaintblaster: new CosmosAnimationResources(
      new CosmosImage(iooOPaintblaster),
      new CosmosData(iooOPaintblaster$info)
   ),
   iooOPan: new CosmosAnimationResources(new CosmosImage(iooOPan), new CosmosData(iooOPan$info)),
   iooOPartyOver: new CosmosImage(iooOPartyOver),
   iooOPie: new CosmosImage(iooOPie),
   iooOPieBowl: new CosmosImage(iooOPieBowl),
   iooOPylon: new CosmosAnimationResources(new CosmosImage(iooOPylon), new CosmosData(iooOPylon$info)),
   iooOQuantumpad: new CosmosAnimationResources(new CosmosImage(iooOQuantumpad), new CosmosData(iooOQuantumpad$info)),
   iooOSecurityField: new CosmosAnimationResources(
      new CosmosImage(iooOSecurityField),
      new CosmosData(iooOSecurityField$info)
   ),
   iooOSecurityFieldTall: new CosmosAnimationResources(
      new CosmosImage(iooOSecurityFieldTall),
      new CosmosData(iooOSecurityFieldTall$info)
   ),
   iooOSodaitem: new CosmosImage(iooOSodaitem),
   iooOSteakitem: new CosmosImage(iooOSteakitem),
   iooOSteaktable: new CosmosImage(iooOSteaktable),
   iooOSwitch: new CosmosAnimationResources(new CosmosImage(iooOSwitch), new CosmosData(iooOSwitch$info)),
   iooOTerminalScreen: new CosmosImage(iooOTerminalScreen),
   iooOTorielAsrielDark: new CosmosImage(iooOTorielAsrielDark),
   iooOTorielAsrielOver: new CosmosImage(iooOTorielAsrielOver),
   iooOTorielAsrielOverLight: new CosmosImage(iooOTorielAsrielOverLight),
   iooOTorielTorielChair: new CosmosImage(iooOTorielTorielChair),
   iooOTorielTorielPlant: new CosmosImage(iooOTorielTorielPlant),
   iooOTorielTrash: new CosmosImage(iooOTorielTrash),
   iooOVendingMachine: new CosmosAnimationResources(
      new CosmosImage(iooOVendingMachine),
      new CosmosData(iooOVendingMachine$info)
   ),
   iooSavePoint: new CosmosAnimationResources(new CosmosImage(iooSavePoint), new CosmosData(iooSavePoint$info)),
   iooSavePointDark: new CosmosAnimationResources(
      new CosmosImage(iooSavePoint, dark01),
      new CosmosData(iooSavePoint$info)
   ),
   iooSavePointSemiDark: new CosmosAnimationResources(
      new CosmosImage(iooSavePoint, dark02),
      new CosmosData(iooSavePoint$info)
   ),
   iooSBarski: new CosmosImage(iooSBarski),
   iooSBedcover: new CosmosImage(iooSBedcover),
   iooSBiodome: new CosmosImage(iooSBiodome),
   iooSBonehouseTop: new CosmosImage(iooSBonehouseTop),
   iooSBookdesk: new CosmosImage(iooSBookdesk),
   iooSBooktable: new CosmosImage(iooSBooktable),
   iooSChew: new CosmosImage(iooSChew),
   iooSCottonball: new CosmosImage(iooSCottonball),
   iooSCottondoor: new CosmosImage(iooSCottondoor),
   iooSCottonrow: new CosmosImage(iooSCottonrow),
   iooSCouch: new CosmosImage(iooSCouch),
   iooSCrossword: new CosmosImage(iooSCrossword),
   iooSCrosswordDark: new CosmosImage(iooSCrossword, dark01),
   iooSCrosswordScreen: new CosmosImage(sources.iooSCrosswordScreen),
   iooSCtower: new CosmosImage(iooSCtower),
   iooSCtowerback: new CosmosImage(iooSCtowerback),
   iooSCtowerleft: new CosmosImage(iooSCtowerleft),
   iooSCtowerright: new CosmosImage(iooSCtowerright),
   iooSEndtable: new CosmosImage(iooSEndtable),
   iooSExteriorLesser: new CosmosImage(iooSExteriorLesser),
   iooSExteriorLesserHead: new CosmosImage(iooSExteriorLesserHead),
   iooSExteriorLesserNeck: new CosmosImage(iooSExteriorLesserNeck),
   iooSFlower: new CosmosImage(iooSFlower),
   iooSFoundry: new CosmosImage(sources.iooSFoundry),
   iooSGauntletBlaster: new CosmosImage(iooSGauntletBlaster),
   iooSGauntletCollarsword: new CosmosImage(iooSGauntletCollarsword),
   iooSGauntletDog: new CosmosAnimationResources(
      new CosmosImage(iooSGauntletDog),
      new CosmosData(iooSGauntletDog$info)
   ),
   iooSGauntletFire: new CosmosAnimationResources(
      new CosmosImage(iooSGauntletFire),
      new CosmosData(iooSGauntletFire$info)
   ),
   iooSGauntletTesla: new CosmosImage(iooSGauntletTesla),
   iooSGravo: new CosmosImage(iooSGravo),
   iooSHolotree: new CosmosImage(iooSHolotree),
   iooSInteriorBar: new CosmosImage(iooSInteriorBar),
   iooSInteriorBooth: new CosmosImage(iooSInteriorBooth),
   iooSInteriorDrinks: new CosmosImage(iooSInteriorDrinks),
   iooSInteriorLesser: new CosmosAnimationResources(
      new CosmosImage(iooSInteriorLesser),
      new CosmosData(iooSInteriorLesser$info)
   ),
   iooSInteriorPoker: new CosmosImage(iooSInteriorPoker),
   iooSInteriorStool: new CosmosImage(iooSInteriorStool),
   iooSippy: new CosmosImage(iooSippy),
   iooSJukebox: new CosmosImage(sources.iooSJukebox),
   iooSKetch: new CosmosAnimationResources(new CosmosImage(iooSKetch), new CosmosData(iooSKetch$info)),
   iooSKrios: new CosmosImage(sources.iooSKrios),
   iooSLamp: new CosmosAnimationResources(new CosmosImage(iooSLamp), new CosmosData(iooSLamp$info)),
   iooSLasercheckpoint: new CosmosAnimationResources(
      new CosmosImage(iooSLasercheckpoint),
      new CosmosData(iooSLasercheckpoint$info)
   ),
   iooSLasercheckpointOpen: new CosmosImage(iooSLasercheckpointOpen),
   iooSLasercheckpointOpenSide: new CosmosImage(iooSLasercheckpointOpenSide),
   iooSLasercheckpointOpenSide2: new CosmosImage(iooSLasercheckpointOpenSide2),
   iooSLasercheckpointSide: new CosmosAnimationResources(
      new CosmosImage(iooSLasercheckpointSide),
      new CosmosData(iooSLasercheckpointSide$info)
   ),
   iooSMailbox: new CosmosImage(iooSMailbox),
   iooSMicrowave: new CosmosImage(iooSMicrowave),
   iooSNoise: new CosmosAnimationResources(new CosmosImage(iooSNoise), new CosmosData(iooSNoise$info)),
   iooSNtower: new CosmosImage(iooSNtower),
   iooSOuternet: new CosmosImage(sources.iooSOuternet),
   iooSPapBed: new CosmosAnimationResources(new CosmosImage(iooSPapBed), new CosmosData(iooSPapBed$info)),
   iooSPapBones: new CosmosImage(iooSPapBones),
   iooSPapComputer: new CosmosAnimationResources(
      new CosmosImage(iooSPapComputer),
      new CosmosData(iooSPapComputer$info)
   ),
   iooSPapTable: new CosmosImage(iooSPapTable),
   iooSPole: new CosmosImage(iooSPole),
   iooSPuzzle1: new CosmosAnimationResources(new CosmosImage(iooSPuzzle1), new CosmosData(iooSPuzzle1$info)),
   iooSPuzzle2: new CosmosAnimationResources(new CosmosImage(iooSPuzzle2), new CosmosData(iooSPuzzle2$info)),
   iooSPuzzle3Tile: new CosmosAnimationResources(
      new CosmosImage(iooSPuzzle3Tile),
      new CosmosData(iooSPuzzle3Tile$info)
   ),
   iooSRocktable: new CosmosImage(iooSRocktable),
   iooSSansdoor: new CosmosImage(iooSSansdoor),
   iooSSaucer: new CosmosImage(iooSSaucer),
   iooSScreenon: new CosmosImage(iooSScreenon),
   iooSSentry: new CosmosImage(iooSSentry),
   iooSSentry2: new CosmosImage(iooSSentry2),
   iooSSentry3: new CosmosImage(iooSSentry3),
   iooSSentry4: new CosmosImage(iooSSentry4),
   iooSSign: new CosmosImage(iooSSign),
   iooSSink: new CosmosAnimationResources(new CosmosImage(iooSSink), new CosmosData(iooSSink$info)),
   iooSSlew: new CosmosImage(iooSSlew),
   iooSSmallscreen: new CosmosImage(iooSSmallscreen),
   iooSSpaghetti: new CosmosAnimationResources(new CosmosImage(iooSSpaghetti), new CosmosData(iooSSpaghetti$info)),
   iooSSpaghettitable: new CosmosImage(iooSSpaghettitable),
   iooStagelight: new CosmosImage(iooStagelight),
   iooStarling: new CosmosImage(iooStarling),
   iooStarlingPotted: new CosmosImage(iooStarlingPotted),
   iooSTeleportpad: new CosmosImage(iooSTeleportpad),
   iooSTelescope: new CosmosImage(iooSTelescope),
   iooSTownBlookshop: new CosmosImage(sources.iooSTownBlookshop),
   iooSTownBonehouse: new CosmosImage(iooSTownBonehouse),
   iooSTownBonerail: new CosmosImage(iooSTownBonerail),
   iooSTownCapture: new CosmosImage(iooSTownCapture),
   iooSTownGrillbys: new CosmosImage(sources.iooSTownGrillbys),
   iooSTownHouse: new CosmosImage(iooSTownHouse),
   iooSTownInnshop: new CosmosImage(sources.iooSTownInnshop),
   iooSTownLibrarby: new CosmosImage(sources.iooSTownLibrarby),
   iooSTownPolice: new CosmosImage(sources.iooSTownPolice),
   iooSTrash: new CosmosImage(iooSTrash),
   iooSTrashball: new CosmosImage(iooSTrashball),
   iooSTreadmill: new CosmosAnimationResources(new CosmosImage(iooSTreadmill), new CosmosData(iooSTreadmill$info)),
   iooSTree: new CosmosImage(iooSTree),
   iooSTvOff: new CosmosImage(iooSTvOff),
   iooSTvOn: new CosmosAnimationResources(new CosmosImage(iooSTvOn), new CosmosData(iooSTvOn$info)),
   iooSVendingMachine: new CosmosAnimationResources(
      new CosmosImage(iooSVendingMachine),
      new CosmosData(iooSVendingMachine$info)
   ),
   iooSWhew: new CosmosImage(iooSWhew),
   iooSWidescreen: new CosmosImage(iooSWidescreen),
   iooSWidescreenBullet: new CosmosImage(iooSWidescreenBullet),
   iooSWidescreenPlayer: new CosmosAnimationResources(
      new CosmosImage(iooSWidescreenPlayer),
      new CosmosData(iooSWidescreenPlayer$info)
   ),
   iooSWidescreenReticle: new CosmosAnimationResources(
      new CosmosImage(iooSWidescreenReticle),
      new CosmosData(iooSWidescreenReticle$info)
   ),
   iooSYousleptinthebed: new CosmosImage(iooSYousleptinthebed),
   iooTaxi: new CosmosAnimationResources(new CosmosImage(iooTaxi), new CosmosData(iooTaxi$info)),
   iooTaxiOverlay: new CosmosAnimationResources(new CosmosImage(iooTaxiOverlay), new CosmosData(iooTaxiOverlay$info)),
   iooToby0: new CosmosAnimationResources(new CosmosImage(iooToby0), new CosmosData(iooToby0$info)),
   iooToby1: new CosmosAnimationResources(new CosmosImage(iooToby1), new CosmosData(iooToby1$info)),
   iooToby2: new CosmosAnimationResources(new CosmosImage(iooToby2), new CosmosData(iooToby2$info)),
   iooToby3: new CosmosAnimationResources(new CosmosImage(iooToby3), new CosmosData(iooToby3$info)),
   iooToby4: new CosmosAnimationResources(new CosmosImage(iooToby4), new CosmosData(iooToby4$info)),
   iooToby5: new CosmosAnimationResources(new CosmosImage(iooToby5), new CosmosData(iooToby5$info)),
   iooToby6: new CosmosAnimationResources(new CosmosImage(iooToby6), new CosmosData(iooToby6$info)),
   iooTrike1: new CosmosAnimationResources(new CosmosImage(iooTrike1), new CosmosData(iooTrike1$info)),
   iooTrike2: new CosmosAnimationResources(new CosmosImage(iooTrike2), new CosmosData(iooTrike2$info)),
   isBlookBackground: new CosmosImage(isBlookBackground),
   isBlookEyes: new CosmosAnimationResources(new CosmosImage(isBlookEyes), new CosmosData(isBlookEyes$info)),
   isBlookKeeper: new CosmosAnimationResources(new CosmosImage(isBlookKeeper), new CosmosData(isBlookKeeper$info)),
   isBpantsArms: new CosmosImage(isBpantsArms),
   isBpantsBackground: new CosmosImage(isBpantsBackground),
   isBpantsCloud: new CosmosAnimationResources(new CosmosImage(isBpantsCloud), new CosmosData(isBpantsCloud$info)),
   isBpantsKeeper: new CosmosAnimationResources(new CosmosImage(isBpantsKeeper), new CosmosData(isBpantsKeeper$info)),
   isGossipArm1: new CosmosAnimationResources(new CosmosImage(isGossipArm1), new CosmosData(isGossipArm1$info)),
   isGossipArm2: new CosmosImage(isGossipArm2),
   isGossipBackground: new CosmosImage(isGossipBackground),
   isGossipKeeper1: new CosmosAnimationResources(
      new CosmosImage(isGossipKeeper1),
      new CosmosData(isGossipKeeper1$info)
   ),
   isGossipKeeper2: new CosmosAnimationResources(
      new CosmosImage(isGossipKeeper2),
      new CosmosData(isGossipKeeper2$info)
   ),
   isHareBackground: new CosmosImage(isHareBackground),
   isHareKeeper: new CosmosAnimationResources(new CosmosImage(isHareKeeper), new CosmosData(isHareKeeper$info)),
   isTemBackground: new CosmosImage(isTemBackground),
   isTemBody: new CosmosImage(isTemBody),
   isTemBox: new CosmosImage(sources.isTemBox),
   isTemCoffee: new CosmosAnimationResources(new CosmosImage(isTemCoffee), new CosmosData(isTemCoffee$info)),
   isTemEyebrows: new CosmosImage(isTemEyebrows),
   isTemEyes1: new CosmosAnimationResources(new CosmosImage(isTemEyes1), new CosmosData(isTemEyes1$info)),
   isTemEyes2: new CosmosImage(isTemEyes2),
   isTemEyes3: new CosmosImage(isTemEyes3),
   isTemEyes4: new CosmosImage(isTemEyes4),
   isTemEyes5: new CosmosImage(isTemEyes5),
   isTemEyes6: new CosmosImage(isTemEyes6),
   isTemHat: new CosmosImage(isTemHat),
   isTemMouth1: new CosmosAnimationResources(new CosmosImage(isTemMouth1), new CosmosData(isTemMouth1$info)),
   isTemMouth2: new CosmosAnimationResources(new CosmosImage(isTemMouth2), new CosmosData(isTemMouth2$info)),
   isTemMouth3: new CosmosImage(isTemMouth3),
   isTemMouth4: new CosmosAnimationResources(new CosmosImage(isTemMouth4), new CosmosData(isTemMouth4$info)),
   isTemSweat: new CosmosImage(isTemSweat),
   isTortoiseArm: new CosmosImage(isTortoiseArm),
   isTortoiseBackground: new CosmosImage(isTortoiseBackground),
   isTortoiseBody: new CosmosImage(isTortoiseBody),
   isTortoiseKeeper: new CosmosAnimationResources(
      new CosmosImage(isTortoiseKeeper),
      new CosmosData(isTortoiseKeeper$info)
   )
};

for (const k in levels) {
   (content[k as keyof typeof content] as CosmosAudio).gain = levels[k as keyof typeof levels];
}

translator.fonts.push(
   content.fComicSans,
   content.fCryptOfTomorrow,
   content.fDeterminationMono,
   content.fDeterminationSans,
   content.fDiaryOfAn8BitMage,
   content.fDotumChe,
   content.fMarsNeedsCunnilingus,
   content.fPapyrus
);

for (const [ key, value ] of Object.entries(content)) {
   value.name = `content::${key}`;
   if (value instanceof CosmosAnimationResources || value instanceof CosmosFont) {
      value.data.name = `content::${key}`;
      value.image.name = `content::${key}`;
      translator.addAsset(`${key}$info`, value.data);
      translator.addAsset(key, value.image);
   } else if (value instanceof CosmosAudio || value instanceof CosmosImage) {
      translator.addAsset(key, value);
   }
}

export const filters = {
   // unused in code, but very much used in rooms (don't delete it)
   bloom: new AdvancedBloomFilter({ threshold: 0.8, bloomScale: 1, quality: 10, brightness: 1 }),
   bloomX: new AdvancedBloomFilter({ threshold: 0, bloomScale: 1, quality: 10, brightness: 1 }),
   crt: new CRTFilter({
      curvature: 0,
      lineContrast: 0.15,
      lineWidth: 5,
      noise: 0.15,
      noiseSize: 1.5,
      vignetting: 0.1,
      vignettingAlpha: 0.25,
      vignettingBlur: 0.75
   }),
   glitch: new GlitchFilter({ slices: 50, offset: 5 }),
   glow: new GlowFilter({ color: 0xffffff, innerStrength: 0, outerStrength: 0, quality: 1 }),
   outline: new OutlineFilter(2, 0, 0.1, 1, false)
};

export const inventories = {
   alphysAssets: new CosmosInventory(
      content.avAlphys,
      content.idcAlphysCutscene1,
      content.idcAlphysCutscene2,
      content.idcAlphysCutscene3,
      content.idcAlphysDontGetAllDreamyEyedOnMeNow,
      content.idcAlphysFr,
      content.idcAlphysGarbo,
      content.idcAlphysGarboCenter,
      content.idcAlphysHaveSomeCompassion,
      content.idcAlphysHellYeah,
      content.idcAlphysIdk,
      content.idcAlphysIdk2,
      content.idcAlphysIdk3,
      content.idcAlphysInquisitive,
      content.idcAlphysNervousLaugh,
      content.idcAlphysNeutralSweat,
      content.idcAlphysOhGodNo,
      content.idcAlphysShocked,
      content.idcAlphysSide,
      content.idcAlphysSideSad,
      content.idcAlphysSmarmy,
      content.idcAlphysSmarmyAggressive,
      content.idcAlphysSmileSweat,
      content.idcAlphysSoAwesome,
      content.idcAlphysThatSucks,
      content.idcAlphysTheFactIs,
      content.idcAlphysUhButHeresTheDeal,
      content.idcAlphysWelp,
      content.idcAlphysWhyOhWhy,
      content.idcAlphysWorried,
      content.idcAlphysWtf,
      content.idcAlphysWtf2,
      content.idcAlphysYeahYouKnowWhatsUp,
      content.idcAlphysYeahYouKnowWhatsUpCenter,
      content.idcAlphysYupEverythingsFine
   ),
   archiveAssets: new CosmosInventory(
      content.amArchive,
      content.iocFriskDownArchive,
      content.iocFriskDownWaterArchive,
      content.iocFriskLeftArchive,
      content.iocFriskLeftWaterArchive,
      content.iocFriskRightArchive,
      content.iocFriskRightWaterArchive,
      content.iocFriskUpArchive,
      content.iocFriskUpWaterArchive,
      content.iooSNoise,
      content.asDepower
   ),
   asrielAssets: new CosmosInventory(
      content.avAsriel2,
      content.iocAsrielDown,
      content.iocAsrielDownTalk,
      content.iocAsrielLeft,
      content.iocAsrielLeftTalk,
      content.iocAsrielRight,
      content.iocAsrielRightTalk,
      content.iocAsrielUp,
      content.iocAsrielUpTalk,
      content.idcAsrielBooped,
      content.idcAsrielCocky,
      content.idcAsrielEvil,
      content.idcAsrielEvilClosed,
      content.idcAsrielFear,
      content.idcAsrielFocus,
      content.idcAsrielFocusClosed,
      content.idcAsrielFocusSide,
      content.idcAsrielFurrow,
      content.idcAsrielHuh,
      content.idcAsrielOhReally,
      content.idcAsrielOhReallyClosed,
      content.idcAsrielPlain,
      content.idcAsrielPlainClosed,
      content.idcAsrielSmirk,
      content.idcAsrielSmirkHappy,
      content.idcAsrielGrateful
   ),
   avMettaton: new CosmosInventory(
      content.avMettaton1,
      content.avMettaton2,
      content.avMettaton3,
      content.avMettaton4,
      content.avMettaton5,
      content.avMettaton6,
      content.avMettaton7,
      content.avMettaton8
   ),
   avTem: new CosmosInventory(
      content.avTem1,
      content.avTem2,
      content.avTem3,
      content.avTem4,
      content.avTem5,
      content.avTem6
   ),
   battleAssets: new CosmosInventory(
      content.asArrow,
      content.asAsrielSparkle,
      content.asBookspin,
      content.asCrit,
      content.asFrypan,
      content.asGoodbye,
      content.asGunshot,
      content.asLove,
      content.asMultitarget,
      content.asOops,
      content.asPunch1,
      content.asPunch2,
      content.asRun,
      content.asSaber3,
      content.asStrike,
      content.asSwing,
      content.ibuAct,
      content.ibuBoot1,
      content.ibuBoot2,
      content.ibuBubbleBlooky,
      content.ibuBubbleDummy,
      content.ibuBubbleShock,
      content.ibuBubbleTwinkly,
      content.ibuCharm,
      content.ibuDeadeye,
      content.ibuFight,
      content.ibuFist1,
      content.ibuFist2,
      content.ibuFrypan1,
      content.ibuFrypan2,
      content.ibuGrid1,
      content.ibuGrid2,
      content.ibuGrid3,
      content.ibuGunshot1,
      content.ibuGunshot2,
      content.ibuHarm,
      content.ibuHP,
      content.ibuIndicator,
      content.ibuItem,
      content.ibuMercy,
      content.ibuNotebook,
      content.ibuPoof,
      content.ibuPressz,
      content.ibuRun,
      content.ibuStar,
      content.ibuSwing
   ),
   chaseAssets: new CosmosInventory(
      content.iocUndyneDown,
      content.iocUndyneDownArmor,
      content.iocUndyneDownArmorWalk,
      content.iocUndyneDownStoic,
      content.iocUndyneDownStoicTalk,
      content.iocUndyneDownTalk,
      content.iocUndyneLeft,
      content.iocUndyneLeftArmor,
      content.iocUndyneLeftArmorJetpack,
      content.iocUndyneLeftArmorWalk,
      content.iocUndyneLeftStoic,
      content.iocUndyneLeftStoicTalk,
      content.iocUndyneLeftTalk,
      content.iocUndyneRight,
      content.iocUndyneRightArmor,
      content.iocUndyneRightArmorJetpack,
      content.iocUndyneRightArmorWalk,
      content.iocUndyneRightStoic,
      content.iocUndyneRightStoicTalk,
      content.iocUndyneRightTalk,
      content.iocUndyneUp,
      content.iocUndyneUpArmor,
      content.iocUndyneUpArmorJetpack,
      content.iocUndyneUpArmorWalk,
      content.iocUndyneUpTalk,
      content.asStomp,
      content.amUndynefast
   ),
   cityAssets: new CosmosInventory(
      content.iooCCity1,
      content.iooCCity2,
      content.iooCCity3,
      content.iooCCity4,
      content.iooCCity5,
      content.iooCCity1dark,
      content.iooCCity2dark,
      content.iooCCity3dark,
      content.iooCCity4dark,
      content.iooCCity5dark,
      content.iooCCityship
   ),
   exAssets: new CosmosInventory(
      content.amOhmy,
      content.asBomb,
      content.asBoom,
      content.asBuhbuhbuhdaadodaa,
      content.asBurst,
      content.asComputer,
      content.asHeartshot,
      content.asHit,
      content.asLanding,
      content.asMusOhyes,
      content.asMusMtYeah,
      content.asNode,
      content.asPrebomb,
      content.asRetract,
      content.asShatter,
      content.asShock,
      content.asStab,
      content.asSuperstrike,
      content.asSwallow,
      content.asSwing,
      content.asUpgrade,
      content.avNapstablook,
      content.ibbBomb,
      content.ibbBoxBullet,
      content.ibbBoxBulletUp,
      content.ibbBuzzlightning,
      content.ibbBuzzpillar,
      content.ibbExBombBlastCore,
      content.ibbExBombBlastRay,
      content.ibbExHeart,
      content.ibbExKiss,
      content.ibbExShine,
      content.ibbExTiny1,
      content.ibbExTiny2,
      content.ibbExTiny3,
      content.ibbLaserEmitter,
      content.ibbLegBullet,
      content.ibbScribble,
      content.ibbTear,
      content.ibcMettatonArmsWelcomeBack,
      content.ibcMettatonBodyBack,
      content.ibcMettatonBodyTransform,
      content.ibcMettatonBrachistochrone,
      content.ibcMettatonDjdisco,
      content.ibcMettatonDjdiscoInv,
      content.ibcMettatonExArm,
      content.ibcMettatonExBody,
      content.ibcMettatonExBodyHeart,
      content.ibcMettatonExFace,
      content.ibcMettatonExLeg,
      content.ibcMettatonExStarburst,
      content.ibcMettatonHappybreaktime,
      content.ibcMettatonQuizbutton,
      content.ibcMettatonRecbox,
      content.ibuBubbleMTT,
      content.ibuYellowShot,
      content.ibuYellowSOUL,
      content.iooAStagecloud,
      content.iooAStagelight,
      content.asSwitch
   ),
   exMusicAssets: new CosmosInventory(content.amForthefans, content.amGrandfinale, content.amLegs, content.amLegsIntro),
   fontAssets: new CosmosInventory(
      content.fComicSans,
      content.fCryptOfTomorrow,
      content.fDeterminationMono,
      content.fDeterminationSans,
      content.fDiaryOfAn8BitMage,
      content.fDotumChe,
      content.fMarsNeedsCunnilingus,
      content.fPapyrus
   ),
   // dont worry they arent actually fake!!
   homeAssets: new CosmosInventory(
      content.asBirds,
      content.iocFriskDownCharaFake,
      content.iocFriskUpCharaFake,
      content.iocFriskLeftCharaFake,
      content.iocFriskRightCharaFake,
      content.iocFriskDownHome,
      content.iocFriskUpHome,
      content.iocFriskLeftHome,
      content.iocFriskRightHome,
      content.idcAsgoreBouttacry,
      content.idcAsgoreContemplative,
      content.idcAsgoreCry1,
      content.idcAsgoreCry2,
      content.idcAsgoreCutscene1,
      content.idcAsgoreFunni,
      content.idcAsgoreHmph,
      content.idcAsgoreHmphClosed,
      content.idcAsgoreHopeful,
      content.idcAsgoreHopefulSide,
      content.idcAsgorePensive,
      content.idcAsgorePensiveSmile,
      content.idcAsgoreSide,
      content.idcAsgoreWhatHaveYouDone,
      content.idcAsgoreWhatYouDoin,
      content.idcAsgoreWat,
      content.idcAsgoreLoverboy,
      content.idcAsgoreItsHim
   ),
   ibcPapyrusHead: new CosmosInventory(
      content.ibcPapyrusAnime,
      content.ibcPapyrusBlank,
      content.ibcPapyrusBlush,
      content.ibcPapyrusBlushRefuse,
      content.ibcPapyrusClosed,
      content.ibcPapyrusConfident,
      content.ibcPapyrusDeadpan,
      content.ibcPapyrusDetermined,
      content.ibcPapyrusEyeroll,
      content.ibcPapyrusFakeAnger,
      content.ibcPapyrusHapp,
      content.ibcPapyrusHappAgain,
      content.ibcPapyrusMad,
      content.ibcPapyrusNooo,
      content.ibcPapyrusOwwie,
      content.ibcPapyrusShock,
      content.ibcPapyrusSide,
      content.ibcPapyrusSly,
      content.ibcPapyrusSus,
      content.ibcPapyrusSweat,
      content.ibcPapyrusTopBlush,
      content.ibcPapyrusWeary
   ),
   idcAlphys: new CosmosInventory(
      content.idcAlphysCutscene1,
      content.idcAlphysCutscene2,
      content.idcAlphysCutscene3,
      content.idcAlphysDontGetAllDreamyEyedOnMeNow,
      content.idcAlphysFr,
      content.idcAlphysGarbo,
      content.idcAlphysGarboCenter,
      content.idcAlphysHaveSomeCompassion,
      content.idcAlphysHellYeah,
      content.idcAlphysIdk,
      content.idcAlphysIdk2,
      content.idcAlphysIdk3,
      content.idcAlphysInquisitive,
      content.idcAlphysNervousLaugh,
      content.idcAlphysNeutralSweat,
      content.idcAlphysOhGodNo,
      content.idcAlphysShocked,
      content.idcAlphysSide,
      content.idcAlphysSideSad,
      content.idcAlphysSmarmy,
      content.idcAlphysSmarmyAggressive,
      content.idcAlphysSmileSweat,
      content.idcAlphysSoAwesome,
      content.idcAlphysThatSucks,
      content.idcAlphysTheFactIs,
      content.idcAlphysUhButHeresTheDeal,
      content.idcAlphysWelp,
      content.idcAlphysWhyOhWhy,
      content.idcAlphysWorried,
      content.idcAlphysWtf,
      content.idcAlphysWtf2,
      content.idcAlphysYeahYouKnowWhatsUp,
      content.idcAlphysYeahYouKnowWhatsUpCenter,
      content.idcAlphysYupEverythingsFine
   ),
   idcAsgore: new CosmosInventory(
      content.idcAsgoreBlank,
      content.idcAsgoreBound,
      content.idcAsgoreBouttacry,
      content.idcAsgoreBreak1,
      content.idcAsgoreBreak2,
      content.idcAsgoreContemplative,
      content.idcAsgoreCry1,
      content.idcAsgoreCry2,
      content.idcAsgoreCutscene1,
      content.idcAsgoreFunni,
      content.idcAsgoreHmph,
      content.idcAsgoreHmphClosed,
      content.idcAsgoreHopeful,
      content.idcAsgoreHopefulSide,
      content.idcAsgoreMad,
      content.idcAsgoreMadClosed,
      content.idcAsgorePensive,
      content.idcAsgorePensiveSmile,
      content.idcAsgoreSide,
      content.idcAsgoreWhatHaveYouDone,
      content.idcAsgoreWhatYouDoin,
      content.idcAsgoreWat,
      content.idcAsgoreLoverboy,
      content.idcAsgoreItsHim
   ),
   idcAsriel: new CosmosInventory(
      content.idcAsrielBooped,
      content.idcAsrielCocky,
      content.idcAsrielEvil,
      content.idcAsrielEvilClosed,
      content.idcAsrielFear,
      content.idcAsrielFocus,
      content.idcAsrielFocusClosed,
      content.idcAsrielFocusSide,
      content.idcAsrielFurrow,
      content.idcAsrielHuh,
      content.idcAsrielOhReally,
      content.idcAsrielOhReallyClosed,
      content.idcAsrielPlain,
      content.idcAsrielPlainClosed,
      content.idcAsrielSmirk,
      content.idcAsrielSmirkHappy,
      content.idcAsrielGrateful
   ),
   idcAsrielTrue: new CosmosInventory(
      content.idcAsrielBoopedTrue,
      content.idcAsrielCockyTrue,
      content.idcAsrielEvilTrue,
      content.idcAsrielEvilClosedTrue,
      content.idcAsrielExhaust,
      content.idcAsrielFocusTrue,
      content.idcAsrielFocusClosedTrue,
      content.idcAsrielFocusSideTrue,
      content.idcAsrielFurrowTrue,
      content.idcAsrielGrateful,
      content.idcAsrielHmmOkayICanKindaSeeWhereYouCominFrom,
      content.idcAsrielHuhTrue,
      content.idcAsrielKawaii,
      content.idcAsrielNervous,
      content.idcAsrielNice,
      content.idcAsrielOhReallyTrue,
      content.idcAsrielOhReallyClosedTrue,
      content.idcAsrielPlainTrue,
      content.idcAsrielPlainClosedTrue,
      content.idcAsrielSade1,
      content.idcAsrielSade2,
      content.idcAsrielSade3,
      content.idcAsrielSmirkTrue,
      content.idcAsrielSmirkHappyTrue,
      content.idcAsrielTakumi,
      content.idcAsrielWink,
      content.idcAsrielDetermined
   ),
   idcKidd: new CosmosInventory(
      content.idcKiddAww,
      content.idcKiddCutscene1,
      content.idcKiddDetermined,
      content.idcKiddHuh,
      content.idcKiddHuhSlave,
      content.idcKiddKiller,
      content.idcKiddKillerSlave,
      content.idcKiddNeutral,
      content.idcKiddNeutralSlave,
      content.idcKiddSerene,
      content.idcKiddShocked,
      content.idcKiddShockedSlave,
      content.idcKiddSide,
      content.idcKiddStarstruck
   ),
   idcSans: new CosmosInventory(
      content.idcSansBlink,
      content.idcSansEmpty,
      content.idcSansEye,
      content.idcSansLaugh1,
      content.idcSansLaugh2,
      content.idcSansNormal,
      content.idcSansWink
   ),
   iocAlphys: new CosmosInventory(
      content.iocAlphysDown,
      content.iocAlphysDownTalk,
      content.iocAlphysLeft,
      content.iocAlphysLeftTalk,
      content.iocAlphysRight,
      content.iocAlphysRightTalk,
      content.iocAlphysDownSad,
      content.iocAlphysDownSadTalk,
      content.iocAlphysLeftSad,
      content.iocAlphysLeftSadTalk,
      content.iocAlphysRightSad,
      content.iocAlphysRightSadTalk,
      content.iocAlphysFreaked,
      content.iocAlphysUp,
      content.iocAlphysUpTalk
   ),
   iocAsgore: new CosmosInventory(
      content.iocAsgoreDown,
      content.iocAsgoreDownHappy,
      content.iocAsgoreDownTalk,
      content.iocAsgoreDownTalkHappy,
      content.iocAsgoreLeft,
      content.iocAsgoreLeftHappy,
      content.iocAsgoreLeftTalk,
      content.iocAsgoreLeftTalkHappy,
      content.iocAsgoreRight,
      content.iocAsgoreRightHappy,
      content.iocAsgoreRightTalk,
      content.iocAsgoreRightTalkHappy,
      content.iocAsgoreUp,
      content.iocAsgoreUpTalk
   ),
   iocAsriel: new CosmosInventory(
      content.iocAsrielDown,
      content.iocAsrielDownTalk,
      content.iocAsrielLeft,
      content.iocAsrielLeftTalk,
      content.iocAsrielRight,
      content.iocAsrielRightTalk,
      content.iocAsrielUp,
      content.iocAsrielUpTalk
   ),
   iocAsrielHome: new CosmosInventory(
      content.iocAsrielTrueDownHomeTalk,
      content.iocAsrielTrueLeftHomeTalk,
      content.iocAsrielTrueRightHomeTalk,
      content.iocAsrielUpHome,
      content.iocAsrielTrueDownHome,
      content.iocAsrielTrueLeftHome,
      content.iocAsrielTrueRightHome,
      content.iocAsrielUpHome
   ),
   iocAsrielTrue: new CosmosInventory(
      content.iocAsrielTrueDown,
      content.iocAsrielTrueDownTalk,
      content.iocAsrielTrueLeft,
      content.iocAsrielTrueLeftTalk,
      content.iocAsrielTrueRight,
      content.iocAsrielTrueRightTalk,
      content.iocAsrielUp,
      content.iocAsrielUpTalk
   ),
   iocFriskJetpack: new CosmosInventory(
      content.iocFriskDownJetpack,
      content.iocFriskDownJetpackOff,
      content.iocFriskDownWaterJetpack,
      content.iocFriskDownWaterJetpackOff,
      content.iocFriskLeftJetpack,
      content.iocFriskLeftJetpackOff,
      content.iocFriskLeftWaterJetpack,
      content.iocFriskLeftWaterJetpackOff,
      content.iocFriskRightJetpack,
      content.iocFriskRightJetpackOff,
      content.iocFriskRightWaterJetpack,
      content.iocFriskRightWaterJetpackOff,
      content.iocFriskUpJetpack,
      content.iocFriskUpJetpackOff,
      content.iocFriskUpWaterJetpack,
      content.iocFriskUpWaterJetpackOff
   ),
   iocHumansAll: new CosmosInventory(
      content.iocHumansBraveryDown,
      content.iocHumansBraveryLeft,
      content.iocHumansBraveryRight,
      content.iocHumansBraveryUp,
      content.iocHumansPatienceDown,
      content.iocHumansPatienceLeft,
      content.iocHumansPatienceRight,
      content.iocHumansPatienceUp,
      content.iocHumansPerserveranceDown,
      content.iocHumansPerserveranceLeft,
      content.iocHumansPerserveranceRight,
      content.iocHumansPerserveranceUp,
      content.iocHumansKindnessDown,
      content.iocHumansKindnessLeft,
      content.iocHumansKindnessRight,
      content.iocHumansKindnessUp,
      content.iocHumansIntegrityDown,
      content.iocHumansIntegrityLeft,
      content.iocHumansIntegrityRight,
      content.iocHumansIntegrityUp,
      content.iocHumansJusticeDown,
      content.iocHumansJusticeLeft,
      content.iocHumansJusticeRight,
      content.iocHumansJusticeUp
   ),
   iocKidd: new CosmosInventory(
      content.iocKiddDown,
      content.iocKiddDownTalk,
      content.iocKiddLeft,
      content.iocKiddLeftTalk,
      content.iocKiddLeftTrip,
      content.iocKiddRight,
      content.iocKiddRightTalk,
      content.iocKiddRightTrip,
      content.iocKiddUp,
      content.iocKiddUpTalk
   ),
   iocKiddSad: new CosmosInventory(
      content.iocKiddDownSad,
      content.iocKiddDownTalkSad,
      content.iocKiddLeftSad,
      content.iocKiddLeftTalkSad,
      content.iocKiddRightSad,
      content.iocKiddRightTalkSad
   ),
   iocKiddSlave: new CosmosInventory(
      content.iocKiddDownSlave,
      content.iocKiddDownTalkSlave,
      content.iocKiddLeftSlave,
      content.iocKiddLeftTalkSlave,
      content.iocKiddRightSlave,
      content.iocKiddRightTalkSlave
   ),
   iocMettaton: new CosmosInventory(
      content.iocMettatonClap,
      content.iocMettatonConfused,
      content.iocMettatonDotdotdot,
      content.iocMettatonLaugh,
      content.iocMettatonMicrophone,
      content.iocMettatonPoint,
      content.iocMettatonPointtwo,
      content.iocMettatonPointthree,
      content.iocMettatonRollLeft,
      content.iocMettatonRollRight,
      content.iocMettatonWave
   ),
   iocMettatonAnchor: new CosmosInventory(
      content.iocMettatonAnchorDotdotdot,
      content.iocMettatonAnchorFlyer,
      content.iocMettatonAnchorG,
      content.iocMettatonAnchorLaugh,
      content.iocMettatonAnchorOMG,
      content.iocMettatonAnchorPoint
   ),
   iocNapstablook: new CosmosInventory(
      content.iocNapstablookBody,
      content.iocNapstablookDown,
      content.iocNapstablookLeft,
      content.iocNapstablookRight,
      content.iocNapstablookUp
   ),
   iocNapstablookAlter: new CosmosInventory(
      content.iocNapstablookDownAlter,
      content.iocNapstablookLeftAlter,
      content.iocNapstablookRightAlter,
      content.iocNapstablookUpAlter
   ),
   iocPapyrus: new CosmosInventory(
      content.iocPapyrusCape,
      content.iocPapyrusDown,
      content.iocPapyrusDownMad,
      content.iocPapyrusDownMadTalk,
      content.iocPapyrusDownTalk,
      content.iocPapyrusLeap,
      content.iocPapyrusLeft,
      content.iocPapyrusLeftMad,
      content.iocPapyrusLeftMadTalk,
      content.iocPapyrusLeftTalk,
      content.iocPapyrusRight,
      content.iocPapyrusRightMad,
      content.iocPapyrusRightMadTalk,
      content.iocPapyrusRightTalk,
      content.iocPapyrusStomp,
      content.iocPapyrusUp,
      content.iocPapyrusUpTalk
   ),
   iocPapyrusStark: new CosmosInventory(
      content.iocPapyrusCakeStarp,
      content.iocPapyrusDoknStarw,
      content.iocPapyrusDoknStarwTalk,
      content.iocPapyrusLektStarf,
      content.iocPapyrusLektStarfTalk,
      content.iocPapyrusRikhtStarg,
      content.iocPapyrusRikhtStargTalk
   ),
   iocSans: new CosmosInventory(
      content.iocSansDown,
      content.iocSansDownTalk,
      content.iocSansHandshake,
      content.iocSansLeft,
      content.iocSansLeftTalk,
      content.iocSansRight,
      content.iocSansRightTalk,
      content.iocSansShrug,
      content.iocSansUp,
      content.iocSansUpTalk,
      content.iocSansWink
   ),
   iocUndyne: new CosmosInventory(
      content.iocUndyneDown,
      content.iocUndyneDownArmor,
      content.iocUndyneDownArmorWalk,
      content.iocUndyneDownStoic,
      content.iocUndyneDownStoicTalk,
      content.iocUndyneDownTalk,
      content.iocUndyneLeft,
      content.iocUndyneLeftArmor,
      content.iocUndyneLeftArmorJetpack,
      content.iocUndyneLeftArmorWalk,
      content.iocUndyneLeftStoic,
      content.iocUndyneLeftStoicTalk,
      content.iocUndyneLeftTalk,
      content.iocUndyneRight,
      content.iocUndyneRightArmor,
      content.iocUndyneRightArmorJetpack,
      content.iocUndyneRightArmorWalk,
      content.iocUndyneRightStoic,
      content.iocUndyneRightStoicTalk,
      content.iocUndyneRightTalk,
      content.iocUndyneUp,
      content.iocUndyneUpArmor,
      content.iocUndyneUpArmorJetpack,
      content.iocUndyneUpArmorWalk,
      content.iocUndyneUpTalk
   ),
   iocUndyneDate: new CosmosInventory(
      content.iocUndyneDateBurnt,
      content.iocUndyneDateFlex,
      content.iocUndyneDateGrab,
      content.iocUndyneDateKick,
      content.iocUndyneDateLeap,
      content.iocUndyneDateNamaste,
      content.iocUndyneDateOMG,
      content.iocUndyneDateSit,
      content.iocUndyneDateStomp,
      content.iocUndyneDateStompTomato,
      content.iocUndyneDateThrow,
      content.iocUndyneDateThrowTalk,
      content.iocUndyneDateTomato,
      content.iocUndyneDateUppercut,
      content.iocUndyneDownDate,
      content.iocUndyneDownDateTalk,
      content.iocUndyneLeftDate,
      content.iocUndyneLeftDateTalk,
      content.iocUndyneRightDate,
      content.iocUndyneRightDateTalk,
      content.iocUndyneUpDate,
      content.iocUndyneUpDateTalk
   ),
   ionAOnionsan: new CosmosInventory(
      content.ionAOnionsanArmLeft,
      content.ionAOnionsanArmOut,
      content.ionAOnionsanArmWave,
      content.ionAOnionsanKawaii,
      content.ionAOnionsanWistful,
      content.ionAOnionsanYhear
   ),
   ionARg: new CosmosInventory(
      content.ionARgbugDown,
      content.ionARgbugLeft,
      content.ionARgbugRight,
      content.ionARgcatDown,
      content.ionARgcatLeft,
      content.ionARgcatRight,
      content.ionARgdragonDown,
      content.ionARgdragonLeft,
      content.ionARgdragonRight,
      content.ionARgrabbitDown,
      content.ionARgrabbitLeft,
      content.ionARgrabbitRight
   ),
   iooSGauntlet: new CosmosInventory(
      content.iooSGauntletBlaster,
      content.iooSGauntletCollarsword,
      content.iooSGauntletDog,
      content.iooSGauntletFire,
      content.iooSGauntletTesla
   ),
   kiddAssets: new CosmosInventory(
      content.iocKiddDown,
      content.iocKiddDownTalk,
      content.iocKiddLeft,
      content.iocKiddLeftTalk,
      content.iocKiddLeftTrip,
      content.iocKiddRight,
      content.iocKiddRightTalk,
      content.iocKiddRightTrip,
      content.iocKiddUp,
      content.iocKiddUpTalk,
      content.iocKiddDownSad,
      content.iocKiddDownTalkSad,
      content.iocKiddLeftSad,
      content.iocKiddLeftTalkSad,
      content.iocKiddRightSad,
      content.iocKiddRightTalkSad,
      content.iocKiddDownSlave,
      content.iocKiddDownTalkSlave,
      content.iocKiddLeftSlave,
      content.iocKiddLeftTalkSlave,
      content.iocKiddRightSlave,
      content.iocKiddRightTalkSlave,
      content.idcKiddAww,
      content.idcKiddCutscene1,
      content.idcKiddDetermined,
      content.idcKiddHuh,
      content.idcKiddHuhSlave,
      content.idcKiddKiller,
      content.idcKiddKillerSlave,
      content.idcKiddNeutral,
      content.idcKiddNeutralSlave,
      content.idcKiddSerene,
      content.idcKiddShocked,
      content.idcKiddShockedSlave,
      content.idcKiddSide,
      content.idcKiddStarstruck,
      content.avKidd
   ),
   lazyAssets: new CosmosInventory(
      content.asBattlefall,
      content.asBreak,
      content.asDimbox,
      content.asDog,
      content.asEquip,
      content.asHeal,
      content.asHero,
      content.asHurt,
      content.asMenu,
      content.asNoise,
      content.asNotify,
      content.asPhone,
      content.asSelect,
      content.asSpeed,
      content.asSpooky,
      content.asSwallow,
      content.asTextnoise,
      content.avAsgore,
      content.avNarrator,
      content.avPapyrus,
      content.avStoryteller,
      content.avToriel,
      content.avUndyne,
      content.ibBlue,
      content.ibGalaxy,
      content.ibGrey,
      content.ibuBreak,
      content.ibuNotify,
      content.ibuSOUL,
      content.idcPapyrusAYAYA,
      content.idcPapyrusAyoo,
      content.idcPapyrusCutscene1,
      content.idcPapyrusDisbeef,
      content.idcPapyrusDisbeefTurnaround,
      content.idcPapyrusIsthatso,
      content.idcPapyrusNervousLaugh,
      content.idcPapyrusNervousSweat,
      content.idcPapyrusNyeh,
      content.idcPapyrusSad,
      content.idcPapyrusSadSweat,
      content.idcPapyrusThisissosad,
      content.idcPapyrusWhatchagonnado,
      content.idcTorielBlank,
      content.idcTorielBlush,
      content.idcTorielCompassion,
      content.idcTorielCompassionfrown,
      content.idcTorielCompassionsmile,
      content.idcTorielConcern,
      content.idcTorielCry,
      content.idcTorielCrylaugh,
      content.idcTorielCutscene1,
      content.idcTorielCutscene2,
      content.idcTorielDreamworks,
      content.idcTorielEverythingisfine,
      content.idcTorielMad,
      content.idcTorielLowconcern,
      content.idcTorielSad,
      content.idcTorielShock,
      content.idcTorielSincere,
      content.idcTorielSmallxd,
      content.idcTorielStraightup,
      content.idcTorielSus,
      content.idcTorielTired,
      content.idcTorielWtf,
      content.idcTorielWtf2,
      content.idcTorielXd,
      content.idcUndyneAngryTomato,
      content.idcUndyneBattleTorso,
      content.idcUndyneBeingAwesomeForTenMinutesStraight,
      content.idcUndyneCutscene1,
      content.idcUndyneDafuq,
      content.idcUndyneDateTorsoBody,
      content.idcUndyneGrr,
      content.idcUndyneGrrSide,
      content.idcUndyneHappyTomato,
      content.idcUndyneImOntoYouPunk,
      content.idcUndyneLaughcrazy,
      content.idcUndynePensive,
      content.idcUndyneSquidgames,
      content.idcUndyneSus,
      content.idcUndyneSweating,
      content.idcUndyneTheHell,
      content.idcUndyneUwu,
      content.idcUndyneWhatevs,
      content.idcUndyneWtfbro,
      content.idcUndyneYouKilledHim,
      content.idcUndyneYouKilledHimPensive,
      content.idcUndyneYouKilledHimSide,
      content.idcUndyneYouKilledHimSmile,
      content.idcUndyneYouKilledHimStare,
      content.iePunchcard,
      content.ieSOUL,
      content.ieSplashBackground,
      content.ieStarbertA,
      content.ieStarbertArrow,
      content.ieStarbertB,
      content.ieStarbertBGum,
      content.ieStarbertC,
      content.iocFriskDown,
      content.iocFriskDownWater,
      content.iocFriskLeft,
      content.iocFriskLeftWater,
      content.iocFriskRight,
      content.iocFriskRightWater,
      content.iocFriskUp,
      content.iocFriskUpWater
   ),
   menuAssets: new CosmosInventory(
      content.amStory,
      content.ieStory,
      content.ieStoryParallax1,
      content.ieStoryParallax2,
      content.ieStoryParallax3,
      content.ieStoryParallax4,
      content.ieStoryParallax5,
      content.asImpact,
      content.asCymbal,
      content.avStoryteller,
      content.ieSplashBackground,
      content.ieSplashForeground,
      content.iocTorielDown,
      content.iocSansWink,
      content.iocPapyrusCape,
      content.iocUndyneDateFlex,
      content.iocAlphysDown,
      content.iocNapstablookBody,
      content.iocMettatonWave,
      content.iocMettatonWaveHapstablook,
      content.iocAsgoreDownHappy,
      content.iocAsrielDown,
      content.iocAsrielTrueDown,
      content.iocKiddDown,
      content.iooSippy,
      content.iocHumansPatienceDown,
      content.iocHumansBraveryDown,
      content.iocHumansIntegrityDown,
      content.iocHumansPerserveranceDown,
      content.iocHumansKindnessDown,
      content.iocHumansJusticeDown,
      content.iocSansWink
   ),
   mirrorAssets: new CosmosInventory(
      content.iocFriskUpMirror,
      content.iocFriskLeftMirror,
      content.iocFriskRightMirror,
      content.iocFriskDownMirror,
      content.iocFriskUpMirrorWater,
      content.iocFriskRightMirrorWater,
      content.iocFriskLeftMirrorWater,
      content.iocFriskDownMirrorWater
   ),
   mirrorHomeAssets: new CosmosInventory(
      content.iocFriskDownMirrorHome,
      content.iocFriskUpMirrorHome,
      content.iocFriskLeftMirrorHome,
      content.iocFriskRightMirrorHome
   ),
   mobileAssets: new CosmosInventory(
      content.ieButtonC,
      content.ieButtonF,
      content.ieButtonM,
      content.ieButtonX,
      content.ieButtonZ
   ),
   splashAssets: new CosmosInventory(content.asSplash, content.ieSplashForeground),
   svrAssets: new CosmosInventory(
      content.amUwa,
      content.avAsriel,
      content.iocAsrielTrueDown,
      content.iocAsrielTrueDownTalk,
      content.iocAsrielTrueLeft,
      content.iocAsrielTrueLeftTalk,
      content.iocAsrielTrueRight,
      content.iocAsrielTrueRightTalk,
      content.iocAsrielTrueDownSad,
      content.iocAsrielTrueDownTalkSad,
      content.iocAsrielTrueLeftSad,
      content.iocAsrielTrueLeftSadTalk,
      content.iocAsrielTrueRight,
      content.iocAsrielTrueRightSadTalk,
      content.iocAsrielUp,
      content.iocAsrielUpTalk,
      content.idcAsrielBoopedTrue,
      content.idcAsrielCockyTrue,
      content.idcAsrielEvilTrue,
      content.idcAsrielEvilClosedTrue,
      content.idcAsrielExhaust,
      content.idcAsrielFocusTrue,
      content.idcAsrielFocusClosedTrue,
      content.idcAsrielFocusSideTrue,
      content.idcAsrielFurrowTrue,
      content.idcAsrielGrateful,
      content.idcAsrielHmmOkayICanKindaSeeWhereYouCominFrom,
      content.idcAsrielHuhTrue,
      content.idcAsrielKawaii,
      content.idcAsrielNervous,
      content.idcAsrielNice,
      content.idcAsrielOhReallyTrue,
      content.idcAsrielOhReallyClosedTrue,
      content.idcAsrielPlainTrue,
      content.idcAsrielPlainClosedTrue,
      content.idcAsrielSade1,
      content.idcAsrielSade2,
      content.idcAsrielSade3,
      content.idcAsrielSmirkTrue,
      content.idcAsrielSmirkHappyTrue,
      content.idcAsrielSussmile,
      content.idcAsrielTakumi,
      content.idcAsrielWink,
      content.idcAsrielDetermined
   ),
   taxiAssets: new CosmosInventory(
      content.amRadiosong,
      content.iooTaxi,
      content.iooTaxiOverlay,
      content.ionRiverboi,
      content.asWarpIn,
      content.asWarpOut,
      content.asWarpSpeed
   ),
   twinklyAssets: new CosmosInventory(
      content.iocTwinklyMain,
      content.avTwinkly1,
      content.avTwinkly2,
      content.idcTwinklyCapping,
      content.idcTwinklyEvil,
      content.idcTwinklyGonk,
      content.idcTwinklyGrin,
      content.idcTwinklyHurt,
      content.idcTwinklyKawaii,
      content.idcTwinklyLaugh,
      content.idcTwinklyNice,
      content.idcTwinklyPissed,
      content.idcTwinklyPlain,
      content.idcTwinklyPlead,
      content.idcTwinklySassy,
      content.idcTwinklySide,
      content.idcTwinklyWink,
      content.idcTwinklyTwisted,
      content.idcTwinklyLose1,
      content.idcTwinklyLose2,
      content.idcTwinklyLose3,
      content.idcTwinklyLose4
   )
};

for (const [ key, value ] of Object.entries(inventories)) {
   value.name = `inventories::${key}`;
}

export const shaders = {
   clipper: {
      frag: `// pixijs builtins
varying vec2 vTextureCoord;
uniform sampler2D uSampler;

// shared frame values
varying float ox;
varying float oy;
varying float oz;
varying float ow;

// passed waver variables
uniform float minX;
uniform float medX;
uniform float maxX;
uniform float minY;
uniform float medY;
uniform float maxY;
uniform float rads;

// tau constant for sine calculations
const float TAU = 3.1415926535897932384626433832795 * 2.0;

float atan2 (float y, float x) {
   return mod(atan(y, x), TAU);
}

// calculate angle from a vector (ported from storyteller)
float angleFrom (vec2 position, vec2 target) {
   return atan2(position.y - target.y, position.x - target.x);
}

// calculate extent of a vector (ported from storyteller)
float extentOf (vec2 position, vec2 target) {
   float dx = target.x - position.x;
   float dy = target.y - position.y;
   return sqrt(dx * dx + dy * dy);
}

// calculate endpoint of a casted ray (ported from storyteller)
vec2 endpoint (vec2 position, float angle, float extent) {
   return vec2(position.x + extent * sin(angle), position.y + extent * cos(angle));
}

// shift around an origin (ported from storyteller)
vec2 shift (vec2 position, float angle, float extent, vec2 origin) {
   return endpoint(origin, angleFrom(position, origin) + angle, extentOf(position, origin) + extent);
}

void main (void) {
   // extend pixel values into integer space
   vec4 frame = vec4(ox, oy, oz, ow);
   vec2 position = vTextureCoord * frame.zw - frame.xy;
   
   // get extended pixel values
   float x = position.x;
   float y = position.y;

   // shift the point if necessary
   if (rads < 0.0 || rads > 0.0) {
      vec2 rotted = shift(position.xy, rads, 0.0, vec2(medX, medY));
      x = rotted.x;
      y = rotted.y;
   }

   // check position
   if (x < minX || x > maxX || y < minY || y > maxY) {
      gl_FragColor = vec4(0, 0, 0, 0);
   } else {
      gl_FragColor = texture2D(uSampler, (position.xy + frame.xy) / frame.zw);
   }
}`,
      vert: vert_standard
   },
   waver: {
      frag: `// pixijs builtins
varying vec2 vTextureCoord;
uniform sampler2D uSampler;

// shared frame values
varying float ox;
varying float oy;
varying float oz;
varying float ow;

// passed waver variables
uniform float size;
uniform float phase;
uniform float widthTop;
uniform float widthBottom;
uniform float yoffset;

// tau constant for sine calculations
const float TAU = 3.1415926535897932384626433832795 * 2.0;

// numeric remapper (ported from storyteller)
float remap (float value, float min1, float max1, float min2, float max2) {
   return ((value - min1) * (max2 - min2)) / (max1 - min1) + min2;
}

void main (void) {
   // extend pixel values into integer space
   vec4 frame = vec4(ox, oy, oz, ow);
   vec2 position = vTextureCoord * frame.zw - frame.xy;

   // get extended pixel values
   float h = frame.w;
   float x = position.x;
   float y = position.y;

   // apply waver math
   x += sin(TAU * ((y + yoffset) / size + phase)) * max(remap((y + yoffset), 0.0, h, widthTop * h, widthBottom * h), 0.0);

   // apply color from target
   gl_FragColor = texture2D(uSampler, (vec2(x, y) + frame.xy) / frame.zw);
}`,
      vert: vert_standard
   }
};

export const tints = { dark01: 0x555555, dark02: 0x757575, dark03: 0x959595 };

export const context = new AudioContext();
CosmosAudioUtils.context = context;

export const convolver = CosmosAudioUtils.convolver(context, 0.8);

export const musicConvolver = new CosmosEffect(context, CosmosAudioUtils.convolver(context, 1.2), 0);
export const musicFilter = new CosmosEffect(
   context,
   new BiquadFilterNode(context, { Q: 1, type: 'lowpass', frequency: 500 }),
   0
);
export const musicMixer = new CosmosMixer(context, [ musicFilter, musicConvolver ]);
export const musicRegistry = new CosmosRegistry(new CosmosDaemon(content.asNoise, { context }));

export const soundDelay = new CosmosEffect(context, CosmosAudioUtils.delay(context, 1 / 3, 0.5), 0);
export const soundMixer = new CosmosMixer(context, [ soundDelay ]);
export const soundRegistry = new CosmosRegistry(new CosmosDaemon(content.asNoise, { context }));

export function standardAudio (gain: number, rate: number, loop: boolean, max: number, router: CosmosDaemonRouter) {
   return { context, gain, loop, rate, router, max };
}

export function musicOpts (gain = 1, rate = 1, loop = true, max = 1) {
   return standardAudio(gain, rate, loop, max, musicRouter);
}

export function musicRouter (input: AudioNode) {
   input.connect(musicMixer.input);
}

export function soundOpts (gain = 1, rate = 1, loop = false, max = 8) {
   return standardAudio(gain, rate, loop, max, input => input.connect(soundMixer.input));
}

export function soundRouter (input: AudioNode) {
   input.connect(soundMixer.input);
}

export function effectSetup (effect: CosmosEffect, router: CosmosDaemonRouter): CosmosDaemonRouter {
   return input => {
      input.connect(effect.input);
      input.connect(effect.throughput);
      router(effect.output);
      router(effect.throughput);
   };
}

export const music = {
   aerialis: new CosmosDaemon(content.amAerialis, musicOpts()),
   aerialisArchive: new CosmosDaemon(content.amAerialisArchive, musicOpts()),
   aerialisEmpty: new CosmosDaemon(content.amAerialisEmpty, musicOpts()),
   amalgam: new CosmosDaemon(content.amAmalgam, musicOpts(1, 0.96)),
   approach: new CosmosDaemon(content.amApproach, musicOpts()),
   archive: new CosmosDaemon(content.amArchive, musicOpts(1, 0.85)),
   arms: new CosmosDaemon(content.amArms, musicOpts()),
   armsIntro: new CosmosDaemon(content.amArmsIntro, musicOpts(1, 1, false)),
   ASGORE: new CosmosDaemon(content.amAsgore, musicOpts(1, 0.92)),
   asrielboss: new CosmosDaemon(content.amAsrielboss, musicOpts()),
   barrier: new CosmosDaemon(content.amBarrier, soundOpts(0, 1, true)),
   battle1: new CosmosDaemon(content.amBattle1, musicOpts()),
   battle2: new CosmosDaemon(content.amBattle2, musicOpts()),
   battle3: new CosmosDaemon(content.amBattle3, musicOpts()),
   birds: new CosmosDaemon(content.asBirds, soundOpts(1, 1, true)),
   blookShop: new CosmosDaemon(content.amBlookShop, musicOpts()),
   chara: new CosmosDaemon(content.amChara, musicOpts(1, 0.92)),
   characutscene: new CosmosDaemon(content.amCharacutscene, musicOpts(1, 0.92)),
   charafinal: new CosmosDaemon(content.amCharafinal, musicOpts(1, 1, false)),
   confession: new CosmosDaemon(content.amConfession, musicOpts()),
   CORE: new CosmosDaemon(content.amCore, musicOpts()),
   credits1: new CosmosDaemon(content.amCredits1, musicOpts(1, 1, false)),
   credits2: new CosmosDaemon(content.amCredits2, musicOpts(1, 1, false)),
   credits3: new CosmosDaemon(content.amCredits3, musicOpts(1, 1, false)),
   datingfight: new CosmosDaemon(content.amDatingfight, musicOpts()),
   datingstart: new CosmosDaemon(content.amDatingstart, musicOpts()),
   datingtense: new CosmosDaemon(content.amDatingtense, musicOpts()),
   despair: new CosmosDaemon(content.amDespair, musicOpts()),
   despair2: new CosmosDaemon(content.amDespair2, musicOpts()),
   djbeat: new CosmosDaemon(content.amDjbeat, musicOpts(1, 1, false)),
   djbeatLoop: new CosmosDaemon(content.amDjbeatLoop, musicOpts(1, 1)),
   dogbass: new CosmosDaemon(content.amDogbass, musicOpts(1, 1, false)),
   dogbeat: new CosmosDaemon(content.amDogbeat, musicOpts(1, 1, false)),
   dogdance: new CosmosDaemon(content.amDogdance, musicOpts()),
   dogebattle: new CosmosDaemon(content.amDogebattle, musicOpts()),
   dogerelax: new CosmosDaemon(content.amDogerelax, musicOpts()),
   dogfreedom: new CosmosDaemon(content.amDogfreedom, musicOpts(1, 0.9)),
   dogsigh: new CosmosDaemon(content.amDogsigh, musicOpts()),
   dogsong: new CosmosDaemon(content.amDogsong, musicOpts()),
   dontgiveup: new CosmosDaemon(content.amDontgiveup, musicOpts(1, 1)),
   drone: new CosmosDaemon(content.amDrone, soundOpts(1, 0.5, true)),
   dummyboss: new CosmosDaemon(content.amDummyboss, musicOpts()),
   emotion: new CosmosDaemon(content.amEmotion, musicOpts()),
   ending: new CosmosDaemon(content.amEnding, musicOpts(1, 0.92)),
   endingexcerpt: new CosmosDaemon(content.amEndingexcerpt, musicOpts(1, 1)),
   endofdays: new CosmosDaemon(content.amEndofdays, musicOpts(1, 0.85)),
   factory: new CosmosDaemon(content.amFactory, musicOpts()),
   factoryArchive: new CosmosDaemon(content.amFactoryArchive, musicOpts()),
   factoryEmpty: new CosmosDaemon(content.amFactoryEmpty, musicOpts()),
   factoryquiet: new CosmosDaemon(content.amFactoryquiet, musicOpts()),
   factoryquietArchive: new CosmosDaemon(content.amFactoryquietArchive, musicOpts()),
   factoryquietEmpty: new CosmosDaemon(content.amFactoryquietEmpty, musicOpts()),
   finalpower: new CosmosDaemon(content.amFinalpower, musicOpts(1, 1, false)),
   forthefans: new CosmosDaemon(content.amForthefans, musicOpts(1, 1, false)),
   galactomania: new CosmosDaemon(content.amGalactomania, musicOpts()),
   galactomaniaFinal: new CosmosDaemon(content.amGalactomaniaFinal, musicOpts()),
   galactomaniaQuiet: new CosmosDaemon(content.amGalactomaniaQuiet, musicOpts()),
   gameshow: new CosmosDaemon(content.amGameshow, musicOpts()),
   generator: new CosmosDaemon(content.amGenerator, { loopEnd: -0.04, ...soundOpts(1, 1, true) }),
   ghostbattle: new CosmosDaemon(content.amGhostbattle, musicOpts()),
   gloves: new CosmosDaemon(content.amGloves, musicOpts()),
   glovesFinal: new CosmosDaemon(content.amGlovesFinal, musicOpts()),
   glovesIntro: new CosmosDaemon(content.amGlovesIntro, musicOpts(1, 1, false)),
   grandfinale: new CosmosDaemon(content.amGrandfinale, musicOpts(1, 1, false)),
   home: new CosmosDaemon(content.amHome, {
      context,
      loop: true,
      rate: 1,
      router: effectSetup(
         new CosmosEffect(
            context,
            new BiquadFilterNode(context, { Q: 2, type: 'lowpass', frequency: 4500, detune: 800 }),
            1
         ),
         musicRouter
      ),
      max: 1
   }),
   homeAlt: new CosmosDaemon(content.amHomeAlt, musicOpts()),
   idiot: new CosmosDaemon(content.amIdiot, musicOpts(1, 0.88)),
   knightknightSting: new CosmosDaemon(content.amKnightknightSting, musicOpts(1, 1, false)),
   lab: new CosmosDaemon(content.amLab, musicOpts()),
   legs: new CosmosDaemon(content.amLegs, musicOpts()),
   legsIntro: new CosmosDaemon(content.amLegsIntro, musicOpts(1, 1, false)),
   letsflyajetpackwhydontwe: new CosmosDaemon(content.amLetsflyajetpackwhydontwe, musicOpts()),
   letsmakeabombwhydontwe: new CosmosDaemon(content.amLetsmakeabombwhydontwe, musicOpts()),
   madjickSting: new CosmosDaemon(content.amMadjickSting, musicOpts(1, 1, false)),
   mall: new CosmosDaemon(content.amMall, musicOpts()),
   memory: new CosmosDaemon(content.amMemory, musicOpts()),
   menu0: new CosmosDaemon(content.amMenu0, musicOpts()),
   menu1: new CosmosDaemon(content.amMenu1, musicOpts()),
   menu2: new CosmosDaemon(content.amMenu2, musicOpts()),
   menu3: new CosmosDaemon(content.amMenu3, musicOpts()),
   menu4: new CosmosDaemon(content.amMenu4, musicOpts()),
   mettsuspense: new CosmosDaemon(content.amMettsuspense, musicOpts()),
   muscle: new CosmosDaemon(content.amMuscle, musicOpts()),
   mushroomdance: new CosmosDaemon(content.amMushroomdance, musicOpts()),
   napstachords: new CosmosDaemon(content.amNapstachords, musicOpts(1, 0.75)),
   napstahouse: new CosmosDaemon(content.amNapstahouse, musicOpts()),
   newworld: new CosmosDaemon(content.amNewworld, musicOpts(1, 1, false)),
   ohmy: new CosmosDaemon(content.amOhmy, musicOpts()),
   opera: new CosmosDaemon(content.amOpera, musicOpts(1, 1, false)),
   operaAlt: new CosmosDaemon(content.amOperaAlt, musicOpts(1, 1, false)),
   outertale: new CosmosDaemon(content.amOutertale, musicOpts(1, 1, false)),
   outlands: new CosmosDaemon(content.amOutlands, musicOpts()),
   outlandsArchive: new CosmosDaemon(content.amOutlandsArchive, musicOpts()),
   papyrus: new CosmosDaemon(content.amPapyrus, musicOpts()),
   papyrusLow: new CosmosDaemon(content.amPapyrus, musicOpts(1, 0.65)),
   papyrusboss: new CosmosDaemon(content.amPapyrusboss, musicOpts()),
   prebattle: new CosmosDaemon(content.amPrebattle, musicOpts()),
   predummy: new CosmosDaemon(content.amPredummy, musicOpts()),
   preshock: new CosmosDaemon(content.amPreshock, { loopEnd: -0.03, ...musicOpts() }),
   radiosong: new CosmosDaemon(content.amRadiosong, musicOpts()),
   rain: new CosmosDaemon(content.asRain, musicOpts(1, 0.8)),
   redacted: new CosmosDaemon(content.amRedacted, musicOpts(1, 0.6)),
   reunited: new CosmosDaemon(content.amReunited, musicOpts()),
   rise: new CosmosDaemon(content.amRise, musicOpts(1, 1.1)),
   sansboss: new CosmosDaemon(content.amSansboss, musicOpts()),
   sansdate: new CosmosDaemon(content.amSansdate, musicOpts()),
   saved: new CosmosDaemon(content.amSaved, musicOpts(1, 1, false)),
   savetheworld: new CosmosDaemon(content.amSavetheworld, musicOpts()),
   scramble: new CosmosDaemon(content.amScramble, musicOpts()),
   secretsong: new CosmosDaemon(content.amSecretsong, musicOpts(1, 1, false)),
   secretsongLoop: new CosmosDaemon(content.amSecretsongLoop, musicOpts()),
   sexyrectangle: new CosmosDaemon(content.amSexyrectangle, musicOpts()),
   shock: new CosmosDaemon(content.amShock, musicOpts()),
   shop: new CosmosDaemon(content.amShop, musicOpts()),
   sng1: new CosmosDaemon(content.amSng1, musicOpts(1, 1, false)),
   sng2: new CosmosDaemon(content.amSng2, musicOpts(1, 192 / 246.857, false)),
   sng3: new CosmosDaemon(content.amSng3, musicOpts(1, 1, false)),
   sng4: new CosmosDaemon(content.amSng4, musicOpts(1, 192 / 246.857, false)),
   sng5: new CosmosDaemon(content.amSng5, musicOpts(1, 1, false)),
   sng6: new CosmosDaemon(content.amSng6, musicOpts(1, 192 / 246.857, false)),
   sng7: new CosmosDaemon(content.amSng7, musicOpts(1, 1, false)),
   sng8: new CosmosDaemon(content.amSng8, musicOpts(1, 192 / 246.857, false)),
   sng9: new CosmosDaemon(content.amSng9, musicOpts(1, 1, false)),
   sng10: new CosmosDaemon(content.amSng10, musicOpts(1, 192 / 246.857, false)),
   sng11: new CosmosDaemon(content.amSng11, musicOpts(1, 1, false)),
   sng12: new CosmosDaemon(content.amSng12, musicOpts()),
   sng13: new CosmosDaemon(content.amSng13, musicOpts(1, 1, false)),
   specatk: new CosmosDaemon(content.amSpecatk, musicOpts()),
   spiderboss: new CosmosDaemon(content.amSpiderboss, musicOpts()),
   spiderrelax: new CosmosDaemon(content.amSpiderrelax, musicOpts()),
   splendor: new CosmosDaemon(content.amSplendor, musicOpts(0)),
   spooktune: new CosmosDaemon(content.amSpooktune, musicOpts()),
   spookwaltz: new CosmosDaemon(content.amSpookwaltz, musicOpts()),
   spookwave: new CosmosDaemon(content.amSpookwave, musicOpts()),
   spookydate: new CosmosDaemon(content.amSpookydate, musicOpts()),
   starton: new CosmosDaemon(content.amStarton, { loopEnd: -0.01, ...musicOpts() }),
   startonArchive: new CosmosDaemon(content.amStartonArchive, musicOpts()),
   startonEmpty: new CosmosDaemon(content.amStartonEmpty, musicOpts()),
   startonTown: new CosmosDaemon(content.amStartonTown, musicOpts()),
   startonTownEmpty: new CosmosDaemon(content.amStartonTownEmpty, musicOpts()),
   story: new CosmosDaemon(content.amStory, musicOpts(1, 0.92, false)),
   temmie: new CosmosDaemon(content.amTemmie, musicOpts()),
   temShop: new CosmosDaemon(content.amTemShop, musicOpts()),
   tension: new CosmosDaemon(content.amTension, musicOpts()),
   terror: new CosmosDaemon(content.amTerror, musicOpts()),
   thechoice: new CosmosDaemon(content.amChoice, musicOpts()),
   theend: new CosmosDaemon(content.amTheend, musicOpts()),
   thriftShop: new CosmosDaemon(content.amThriftShop, musicOpts()),
   thundersnail: new CosmosDaemon(content.amThundersnail, musicOpts()),
   toriel: new CosmosDaemon(content.amToriel, musicOpts(1, 0.92)),
   torielboss: new CosmosDaemon(content.amTorielboss, musicOpts()),
   twinkly: new CosmosDaemon(content.amFlowey, musicOpts()),
   undyne: new CosmosDaemon(content.amUndyne, musicOpts()),
   undyneboss: new CosmosDaemon(content.amUndyneboss, musicOpts()),
   undynefast: new CosmosDaemon(content.amUndynefast, musicOpts()),
   undynegeno: new CosmosDaemon(content.amUndynegeno, musicOpts()),
   undynegenoFinal: new CosmosDaemon(content.amUndynegenoFinal, musicOpts(1, 1, false)),
   undynegenoStart: new CosmosDaemon(content.amUndynegenoStart, musicOpts(1, 1, false)),
   undynehelmet: new CosmosDaemon(content.amUndynehelmet, musicOpts()),
   undynepiano: new CosmosDaemon(content.amUndynepiano, musicOpts()),
   undynepre: new CosmosDaemon(content.amUndynepre, musicOpts()),
   undynepreboss: new CosmosDaemon(content.amUndynepreboss, musicOpts()),
   undynepregeno: new CosmosDaemon(content.amUndynepregeno, musicOpts(1, 1, false)),
   uwa: new CosmosDaemon(content.amUwa, musicOpts()),
   wrongenemy: new CosmosDaemon(content.amWrongenemy, musicOpts()),
   youscreweduppal: new CosmosDaemon(content.amYouscreweduppal, { loopEnd: -0.01, ...soundOpts(1, 1, true) })
};

export const sounds = {
   abreak1: new CosmosDaemon(content.asAbreak1, soundOpts()),
   abreak2: new CosmosDaemon(content.asAbreak2, soundOpts()),
   alphysfix: new CosmosDaemon(content.asAlphysfix, soundOpts()),
   appear: new CosmosDaemon(content.asAppear, soundOpts()),
   applause: new CosmosDaemon(content.asApplause, soundOpts()),
   arrow: new CosmosDaemon(content.asArrow, soundOpts()),
   arrow_leap: new CosmosDaemon(content.asArrow, soundOpts(1, 1, false, 1)),
   asrielSparkle: new CosmosDaemon(content.asAsrielSparkle, soundOpts()),
   bad: new CosmosDaemon(content.asBad, soundOpts(1, 1, true)),
   bahbye: new CosmosDaemon(content.asBahbye, soundOpts()),
   bark: new CosmosDaemon(content.asBark, soundOpts()),
   battlefall: new CosmosDaemon(content.asBattlefall, soundOpts()),
   bell: new CosmosDaemon(content.asBell, soundOpts()),
   boing: new CosmosDaemon(content.asBoing, soundOpts()),
   bomb: new CosmosDaemon(content.asBomb, soundOpts()),
   bombfall: new CosmosDaemon(content.asBombfall, soundOpts()),
   bookspin: new CosmosDaemon(content.asBookspin, soundOpts()),
   boom: new CosmosDaemon(content.asBoom, soundOpts()),
   boom_orange: new CosmosDaemon(content.asBoom, soundOpts(1, 2, false, 1)),
   boxpush: new CosmosDaemon(content.asLanding, {
      context,
      gain: 1.25,
      router: effectSetup(new CosmosEffect(context, CosmosAudioUtils.delay(context, 0.2, 0.5), 0.6), soundRouter)
   }),
   break: new CosmosDaemon(content.asBreak, soundOpts()),
   buhbuhbuhdaadodaa: new CosmosDaemon(content.asBuhbuhbuhdaadodaa, soundOpts()),
   burst: new CosmosDaemon(content.asBurst, soundOpts()),
   cackle: new CosmosDaemon(content.asCackle, soundOpts()),
   cast: new CosmosDaemon(content.asCast, soundOpts()),
   clap: new CosmosDaemon(content.asClap, soundOpts()),
   computer: new CosmosDaemon(content.asComputer, soundOpts(1, 1, true)),
   crickets: new CosmosDaemon(content.asCrickets, { loopStart: 0.12, loopEnd: -1.4, ...soundOpts(1, 0.72, true) }),
   crit: new CosmosDaemon(content.asCrit, soundOpts()),
   cymbal: new CosmosDaemon(content.asCymbal, soundOpts()),
   deeploop2: new CosmosDaemon(content.asDeeploop2, soundOpts(1, 1, true)),
   dephase: new CosmosDaemon(content.asDephase, soundOpts()),
   depower: new CosmosDaemon(content.asDepower, soundOpts()),
   destroyed: new CosmosDaemon(content.asDestroyed, soundOpts(1, 1, true)),
   dimbox: new CosmosDaemon(content.asDimbox, soundOpts()),
   dog: new CosmosDaemon(content.asDog, soundOpts()),
   dogsword: new CosmosDaemon(content.asDogsword, soundOpts()),
   door: new CosmosDaemon(content.asDoor, soundOpts()),
   doorClose: new CosmosDaemon(content.asDoorClose, soundOpts()),
   drumroll: new CosmosDaemon(content.asDrumroll, soundOpts()),
   dununnn: new CosmosDaemon(content.asDununnn, soundOpts()),
   echostart: new CosmosDaemon(content.asSigstar2, soundOpts(1, 1.4)),
   echostop: new CosmosDaemon(content.asNoise, soundOpts(1, 1.4)),
   electrodoor: new CosmosDaemon(content.asElectrodoor, soundOpts()),
   electropulsar: new CosmosDaemon(content.asElectropulsar, soundOpts()),
   electropulse: new CosmosDaemon(content.asElectropulse, soundOpts()),
   elevator: new CosmosDaemon(content.asElevator, soundOpts()),
   epiphany: new CosmosDaemon(content.asEpiphany, soundOpts()),
   equip: new CosmosDaemon(content.asEquip, soundOpts()),
   fear: new CosmosDaemon(content.asFear, soundOpts()),
   frypan: new CosmosDaemon(content.asFrypan, soundOpts()),
   glassbreak: new CosmosDaemon(content.asGlassbreak, soundOpts()),
   goner_charge: new CosmosDaemon(content.asGonerCharge, soundOpts()),
   goodbye: new CosmosDaemon(content.asGoodbye, soundOpts()),
   grab: new CosmosDaemon(content.asGrab, soundOpts()),
   gunshot: new CosmosDaemon(content.asGunshot, soundOpts()),
   heal: new CosmosDaemon(content.asHeal, soundOpts()),
   heartshot: new CosmosDaemon(content.asHeartshot, soundOpts(1, 1, false, 1)),
   hero: new CosmosDaemon(content.asHero, soundOpts()),
   heroDark: new CosmosDaemon(content.asHero, soundOpts(1, 0.8)),
   hit: new CosmosDaemon(content.asHit, soundOpts()),
   hurt: new CosmosDaemon(content.asHurt, soundOpts()),
   hyperstrike: new CosmosDaemon(content.asSuperstrike, {
      context,
      router: effectSetup(new CosmosEffect(context, convolver, 0.6), soundRouter)
   }),
   impact: new CosmosDaemon(content.asImpact, soundOpts()),
   indicator: new CosmosDaemon(content.asIndicator, soundOpts()),
   jetpack: new CosmosDaemon(content.asJetpack, soundOpts(1, 1, true)),
   judgement: new CosmosDaemon(content.asJudgement, soundOpts()),
   kick: new CosmosDaemon(content.asKick, soundOpts()),
   knock: new CosmosDaemon(content.asKnock, soundOpts()),
   landing: new CosmosDaemon(content.asLanding, soundOpts()),
   lightningstrike: new CosmosDaemon(content.asLightningstrike, soundOpts()),
   long_elevator: new CosmosDaemon(content.asLongElevator, soundOpts()),
   love: new CosmosDaemon(content.asLove, soundOpts()),
   menu: new CosmosDaemon(content.asMenu, soundOpts()),
   meow: new CosmosDaemon(content.asMeow, soundOpts(1, 0.9)),
   menuMusic: new CosmosDaemon(content.asMenu, musicOpts(1, 1, false)),
   metapproach: new CosmosDaemon(content.asMetapproach, soundOpts()),
   monsterHurt1: new CosmosDaemon(content.asMonsterHurt1, soundOpts()),
   monsterHurt2: new CosmosDaemon(content.asMonsterHurt2, soundOpts()),
   multitarget: new CosmosDaemon(content.asMultitarget, soundOpts()),
   mus_mt_yeah: new CosmosDaemon(content.asMusMtYeah, soundOpts()),
   mus_ohyes: new CosmosDaemon(content.asMusOhyes, soundOpts()),
   node: new CosmosDaemon(content.asNode, soundOpts()),
   noise: new CosmosDaemon(content.asNoise, soundOpts()),
   note: new CosmosDaemon(content.asNote, soundOpts()),
   notify: new CosmosDaemon(content.asNotify, soundOpts()),
   orchhit: new CosmosDaemon(content.asOrchhit, soundOpts()),
   pathway: new CosmosDaemon(content.asPathway, soundOpts()),
   phase: new CosmosDaemon(content.asPhase, soundOpts()),
   phone: new CosmosDaemon(content.asPhone, soundOpts()),
   prebomb: new CosmosDaemon(content.asPrebomb, soundOpts()),
   punch1: new CosmosDaemon(content.asPunch1, soundOpts()),
   punch2: new CosmosDaemon(content.asPunch2, soundOpts()),
   purchase: new CosmosDaemon(content.asPurchase, soundOpts()),
   rainbowbeam: new CosmosDaemon(content.asRainbowbeam, soundOpts(1, 1, true)),
   retract: new CosmosDaemon(content.asRetract, soundOpts()),
   rimshot: new CosmosDaemon(content.asRimshot, soundOpts()),
   rotate: new CosmosDaemon(content.asRotate, soundOpts(1, 1, true)),
   run: new CosmosDaemon(content.asRun, soundOpts()),
   rustle: new CosmosDaemon(content.asRustle, soundOpts()),
   saber3: new CosmosDaemon(content.asSaber3, soundOpts()),
   save: new CosmosDaemon(content.asSave, soundOpts()),
   sega: new CosmosDaemon(content.asSega, soundOpts()),
   select: new CosmosDaemon(content.asSelect, soundOpts()),
   shake: new CosmosDaemon(content.asShake, {
      context,
      router: effectSetup(new CosmosEffect(context, convolver, 0.4), soundRouter)
   }),
   shatter: new CosmosDaemon(content.asShatter, soundOpts()),
   shock: new CosmosDaemon(content.asShock, soundOpts()),
   singBad1: new CosmosDaemon(content.asSingBad1, soundOpts()),
   singBad2: new CosmosDaemon(content.asSingBad2, soundOpts()),
   singBad3: new CosmosDaemon(content.asSingBad3, soundOpts()),
   singBass1: new CosmosDaemon(content.asSingBass1, soundOpts()),
   singBass2: new CosmosDaemon(content.asSingBass2, soundOpts()),
   singTreble1: new CosmosDaemon(content.asSingTreble1, soundOpts()),
   singTreble2: new CosmosDaemon(content.asSingTreble2, soundOpts()),
   singTreble3: new CosmosDaemon(content.asSingTreble3, soundOpts()),
   singTreble4: new CosmosDaemon(content.asSingTreble4, soundOpts()),
   singTreble5: new CosmosDaemon(content.asSingTreble5, soundOpts()),
   singTreble6: new CosmosDaemon(content.asSingTreble6, soundOpts()),
   slidewhistle: new CosmosDaemon(content.asSlidewhistle, soundOpts()),
   smallelectroshock: new CosmosDaemon(content.asQuickelectroshock, soundOpts()),
   sparkle: new CosmosDaemon(content.asSparkle, soundOpts()),
   specin: new CosmosDaemon(content.asSpecin, soundOpts(1, 1.2)),
   specout: new CosmosDaemon(content.asSpecout, soundOpts(1, 1.2)),
   speed: new CosmosDaemon(content.asSpeed, soundOpts()),
   spiderLaugh: new CosmosDaemon(content.asSpiderLaugh, soundOpts()),
   splash: new CosmosDaemon(content.asSplash, soundOpts()),
   spooky: new CosmosDaemon(content.asSpooky, soundOpts()),
   squeak: new CosmosDaemon(content.asSqueak, soundOpts(1, 1.2)),
   stab: new CosmosDaemon(content.asStab, soundOpts()),
   starfall: new CosmosDaemon(content.asStarfall, soundOpts()),
   static: new CosmosDaemon(content.asStatic, soundOpts()),
   step: new CosmosDaemon(content.asStep, soundOpts()),
   stomp: new CosmosDaemon(content.asStomp, soundOpts()),
   storyteller: new CosmosDaemon(content.avStoryteller, soundOpts()),
   strike: new CosmosDaemon(content.asStrike, soundOpts()),
   supercymbal: new CosmosDaemon(content.asCymbal, {
      context,
      router: effectSetup(new CosmosEffect(context, CosmosAudioUtils.delay(context, 0.25, 0.5), 0.6), soundRouter)
   }),
   superstrike: new CosmosDaemon(content.asSuperstrike, soundOpts()),
   surge: new CosmosDaemon(content.asGonerCharge, {
      context,
      router: effectSetup(new CosmosEffect(context, CosmosAudioUtils.delay(context, 0.25, 0.8), 0.6), soundRouter)
   }),
   swallow: new CosmosDaemon(content.asSwallow, soundOpts()),
   swing: new CosmosDaemon(content.asSwing, soundOpts()),
   swipe: new CosmosDaemon(content.asSwipe, soundOpts()),
   switch: new CosmosDaemon(content.asSwitch, soundOpts()),
   sword: new CosmosDaemon(content.asSword, soundOpts()),
   target: new CosmosDaemon(content.asTarget, soundOpts()),
   textnoise: new CosmosDaemon(content.asTextnoise, soundOpts()),
   trombone: new CosmosDaemon(content.asTrombone, soundOpts()),
   tv: new CosmosDaemon(content.asTv, musicOpts()),
   twinklyHurt: new CosmosDaemon(content.asTwinklyHurt, soundOpts()),
   twinklyLaugh: new CosmosDaemon(content.asTwinklyLaugh, soundOpts()),
   upgrade: new CosmosDaemon(content.asUpgrade, soundOpts(1, 0.8)),
   upgrade_jusant: new CosmosDaemon(content.asUpgrade, soundOpts(1, 0.8)),
   warp_in: new CosmosDaemon(content.asWarpIn, soundOpts()),
   warp_out: new CosmosDaemon(content.asWarpOut, soundOpts()),
   warp_speed: new CosmosDaemon(content.asWarpSpeed, soundOpts(1, 1, true)),
   whimper: new CosmosDaemon(content.asWhimper, soundOpts()),
   whipcrack: new CosmosDaemon(content.asWhipcrack, soundOpts()),
   whoopee: new CosmosDaemon(content.asWhoopee, soundOpts()),
   wind: new CosmosDaemon(content.asWind, soundOpts(1, 1, true)),
   xm: new CosmosDaemon(content.asDimbox, {
      context,
      rate: (2 ** (1 / 12)) ** -10,
      router: effectSetup(new CosmosEffect(context, CosmosAudioUtils.delay(context, 0.4, 0.5), 0.6), soundRouter)
   })
};

musicMixer.output.connect(context.destination);
musicRegistry.register(music);
soundMixer.output.connect(context.destination);
soundRegistry.register(sounds);

CosmosUtils.status(`LOAD MODULE: ASSETS (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
