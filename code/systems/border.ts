import { backend, events, game } from './core';
import { battler } from './framework';
import { SAVE } from './save';

import bAerialis from '../../assets/border/aerialis.png?url';
import bAerialisBattle from '../../assets/border/aerialis-battle.png?url';
import bArchive from '../../assets/border/archive.png?url';
import bAsgore from '../../assets/border/asgore.png?url';
import bAsrielBattle from '../../assets/border/asriel-battle.png?url';
import bCitadel from '../../assets/border/citadel.png?url';
import bCore from '../../assets/border/core.png?url';
import bCoreBattle from '../../assets/border/core-battle.png?url';
import bFoundry from '../../assets/border/foundry.png?url';
import bFoundryBattle from '../../assets/border/foundry-battle.png?url';
import bFrontier from '../../assets/border/frontier.png?url';
import bFrontierCup from '../../assets/border/frontier-cup.png?url';
import bHangar from '../../assets/border/hangar.png?url';
import bMain from '../../assets/border/main.png?url';
import bOutlands from '../../assets/border/outlands.png?url';
import bOutlandsBattle from '../../assets/border/outlands-battle.png?url';
import bRecCenter from '../../assets/border/rec-center.png?url';
import bRecCenterBattle from '../../assets/border/rec-center-battle.png?url';
import bSimple from '../../assets/border/simple.png?url';
import bStarton from '../../assets/border/starton.png?url';
import bStartonBattle from '../../assets/border/starton-battle.png?url';
import bToriel from '../../assets/border/toriel.png?url';

export const borderAsset = {
    none: ['', 0] as [string, number],
    dynamic: ['dynamic', 1] as [string, number],
    bSimple: [bSimple, 2] as [string, number],
    bMain: [bMain, 3] as [string, number],
    bOutlands: [bOutlands, 4] as [string, number],
    bOutlandsBattle: [bOutlandsBattle, 5] as [string, number],
    bToriel: [bToriel, 6] as [string, number],
    bStarton: [bStarton, 7] as [string, number],
    bStartonBattle: [bStartonBattle, 8] as [string, number],
    bFoundry: [bFoundry, 9] as [string, number],
    bFoundryBattle: [bFoundryBattle, 10] as [string, number],
    bAerialis: [bAerialis, 11] as [string, number],
    bAerialisBattle: [bAerialisBattle, 12] as [string, number],
    bRecCenter: [bRecCenter, 13] as [string, number],
    bRecCenterBattle: [bRecCenterBattle, 14] as [string, number],
    bCore: [bCore, 15] as [string, number],
    bCoreBattle: [bCoreBattle, 16] as [string, number],
    bCitadel: [bCitadel, 17] as [string, number],
    bAsgore: [bAsgore, 18] as [string, number],
    bArchive: [bArchive, 19] as [string, number],
    bAsrielBattle: [bAsrielBattle, 20] as [string, number],
    bHangar: [bHangar, 21] as [string, number],
    bFrontier: [bFrontier, 22] as [string, number],
    bFrontierCup: [bFrontierCup, 23] as [string, number],
    locked: ['', 24] as [string, number]
};


export class BorderManager {
    container: HTMLElement;
    activeBorder: HTMLElement;
    inactiveBorder: HTMLElement;
    transitionDuration: number = 1000;
    currentBorder: (string | number)[];
    dynamic: boolean = false;
    constructor() {
        this.container = document.getElementById('border-container') as HTMLElement;
        this.currentBorder = borderAsset.none;
        this.activeBorder = this.createBorderElement();
        this.inactiveBorder = this.createBorderElement();
        this.container.appendChild(this.activeBorder);
        this.activeBorder.style.opacity = '1';
        this.container.appendChild(this.inactiveBorder);
        this.inactiveBorder.style.opacity = '0';
    }
    createBorderElement(): HTMLElement {
        const border = document.createElement('div');
        border.style.position = 'absolute';
        border.style.top = '0';
        border.style.left = '0';
        border.style.width = '100%';
        border.style.height = '100%';
        border.style.backgroundSize = 'cover';
        border.style.backgroundPosition = 'center';
        border.style.transition = `opacity ${this.transitionDuration}ms ease-in-out`;
        border.style.pointerEvents = 'none';
        return border;
    }
    getDynamicBorder(room: string) {
        if (SAVE.ready) {
            if (SAVE.flag.n.neutral_twinkly_stage >= 2 && SAVE.flag.n.neutral_twinkly_stage < 6) {
                return borderAsset.none;
            }
            if (SAVE.flag.n.pacifist_marker >= 3.1 && SAVE.flag.n.pacifist_marker < 11) {
                if (SAVE.flag.n.pacifist_marker >= 5 || battler.volatile[0].container.objects[0]?.metadata.power) {
                    return borderAsset.bAsrielBattle;
                }
                return borderAsset.bSimple;
            }
        }
        if (!room) {
            return borderAsset.bMain;
        }
        // special cases for bMain
        const borderSpecialRoomsMain = [
            'w_start',
            'w_twinkly',
            'w_entrance',
            'w_wonder',
            's_taxi',
            'f_entrance',
            'f_taxi',
            'f_bird',
            'f_view',
            'f_battle',
            'a_lookout',
            'c_exit'
        ];
        const borderSpecialRoomsRecCenter = [
            'a_elevator4',
            'a_auditorium',
            'a_aftershow',
            'a_hub1',
            'a_hub2',
            'a_hub3',
            'a_hub4',
            'a_hub5',
            'a_plaza',
            'a_elevator5',
            'a_sleeping1',
            'a_sleeping2',
            'a_sleeping3',
            'a_dining'
        ];
        const borderSpecialRoomsSimple = ['a_lift', 'a_citadelevator', 'c_archive_surface'];
        const borderSpecialRooms: { [key: string]: (string | number)[] } = {
            ...borderSpecialRoomsMain.reduce((acc, room) => {
                acc[room] = borderAsset.bMain;
                return acc;
            }, {} as { [key: string]: (string | number)[] }),
            ...borderSpecialRoomsRecCenter.reduce((acc, room) => {
                acc[room] = battler.active ? borderAsset.bRecCenterBattle : borderAsset.bRecCenter;
                return acc;
            }, {} as { [key: string]: (string | number)[] }),
            ...borderSpecialRoomsSimple.reduce((acc, room) => {
                acc[room] = borderAsset.bSimple;
                return acc;
            }, {} as { [key: string]: (string | number)[] })
        };

        for (const key in borderSpecialRooms) {
            if (room.startsWith(key)) {
                return borderSpecialRooms[key];
            }
        }

        // hangar border
        if ((room.startsWith('_hangar') || room.startsWith('_credits')) && SAVE.data.n.plot === 72) {
            return borderAsset.bHangar;
        }

        const borderType: { [key: string]: (string | number)[] } = {
            _frontier: borderAsset.bFrontier,
            c_archive_wasteland: borderAsset.bOutlandsBattle,
            c_archive_starton: borderAsset.bStartonBattle,
            c_archive_foundry: borderAsset.bFoundryBattle,
            c_archive_aerialis: borderAsset.bAerialisBattle,
            c_archive: borderAsset.bArchive,
            a_core_: borderAsset.bCore,
            a_: borderAsset.bAerialis,
            c_asgore_: borderAsset.bAsgore,
            c_: borderAsset.bCitadel,
            f_: borderAsset.bFoundry,
            s_: borderAsset.bStarton,
            w_toriel: borderAsset.bToriel,
            w_: borderAsset.bOutlands
        };
        // 250311 - WS3917: Added battle border variants1
        const borderBattleType: { [key: string]: (string | number)[] } = {
            a_core_: borderAsset.bCoreBattle,
            a_: borderAsset.bAerialisBattle,
            f_: borderAsset.bFoundryBattle,
            s_: borderAsset.bStartonBattle,
            w_: borderAsset.bOutlandsBattle
        }
        for (const key in borderType) {
            if (room.startsWith(key)) {
                // Need to check if the key is in the battle type
                if (battler.active && borderBattleType[key])
                    return borderBattleType[key];
                return borderType[key];
            }
        }
        return borderAsset.bMain;
    }
    getAvaliableBorder() {
        let plot = 0;
        plot = SAVE.data.n.plot;
        const thresholds = [
            [borderAsset.bOutlands, 2],
            [borderAsset.bOutlandsBattle, 2.3],
            [borderAsset.bToriel, 8],
            [borderAsset.bStarton, 17],
            [borderAsset.bStartonBattle, 17.1],
            [borderAsset.bFoundry, 33],
            [borderAsset.bFoundryBattle, 35],
            [borderAsset.bAerialis, 49],
            [borderAsset.bAerialisBattle, 50],
            [borderAsset.bRecCenter, 64],
            [borderAsset.bRecCenterBattle, 65],
            [borderAsset.bCore, 66],
            [borderAsset.bCoreBattle, 66.1],
            [borderAsset.bCitadel, 69],
            [borderAsset.bAsgore, 70],
            [borderAsset.bArchive, 71.1],
            [borderAsset.bAsrielBattle, 71.2],
            [borderAsset.bHangar, 72]
        ];

        plot >= 72 ? borderAsset.bFrontier : borderAsset.locked;
        const availableBorders = [
            borderAsset.none,
            borderAsset.dynamic,
            borderAsset.bMain,
            ...thresholds
                .filter(([_, value]) => plot >= (value as number))
                .map(([border]) => border as (string | number)[]),
            // WS3917 250312 - I love cup!!
            ...(plot >= 72 && SAVE.data.b.freedom
                ? (SAVE.data.b.water ? [borderAsset.bFrontier, borderAsset.bFrontierCup] : [borderAsset.bFrontier])
                : [borderAsset.locked])
        ];
        return availableBorders;
    }
    handleUpdateBorder(border: (string | number)[]) {
        if (game.width === 960) {
            events.off('teleport', this.updateBorder);
            events.off('battle', this.updateBorder);
            events.off('battle-exit', this.updateBorder);
            this.currentBorder = borderAsset.none;
            this.dynamic = false;
        } else {
            if (border === borderAsset.dynamic) {
                events.on('teleport', this.updateBorder);
                // 250311 - WS3917: Update border  when entering and exiting battle
                events.on('battle', this.updateBorder);
                events.on('battle-exit', this.updateBorder);
                this.dynamic = true;
            } else {
                events.off('teleport', this.updateBorder);
                events.off('battle', this.updateBorder);
                events.off('battle-exit', this.updateBorder);
                this.dynamic = false;
                this.currentBorder = border;
            }
        }
        this.updateBorder();
    }
    updateBorder = () => {
        const border = this.dynamic ? this.getDynamicBorder(game.room) : this.currentBorder;
        const tempFrameWidth = game.framewidth;
        const tempFrameHeight = game.frameheight;
        if (border === borderAsset.none) {
            game.framewidth = game.width;
            game.frameheight = 480;
        } else {
            game.framewidth = 960;
            game.frameheight = 540;
        }
        if (game.frameheight !== tempFrameHeight || game.framewidth !== tempFrameWidth) {
            backend?.exec('pad', [game.framewidth - 640, game.frameheight - 480]);
            game.resize();
        }
        if (this.dynamic && border === this.currentBorder) {
            return;
        }
        this.currentBorder = border;
        // 交换
        const temp = this.activeBorder;
        this.activeBorder = this.inactiveBorder;
        this.inactiveBorder = temp;
        this.activeBorder.style.backgroundImage = `url(${this.currentBorder[0]})`;
        this.activeBorder.style.opacity = '1';
        this.inactiveBorder.style.opacity = '0';
    };
}

export const gameBorder = new BorderManager();
