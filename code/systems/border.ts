import { backend, events, game } from './core';
import { battler } from './framework';
import { SAVE } from './save';

import bAerialis from '../../assets/border/aerialis.png?url';
import bArchiveAerialis from '../../assets/border/archive-aerialis.png?url';
import bArchiveFoundry from '../../assets/border/archive-foundry.png?url';
import bArchiveOutlands from '../../assets/border/archive-outlands.png?url';
import bArchiveStarton from '../../assets/border/archive-starton.png?url';
import bArchive from '../../assets/border/archive.png?url';
import bAsgore from '../../assets/border/asgore.png?url';
import bAsrielBattle from '../../assets/border/asriel-battle.png?url';
import bCitadel from '../../assets/border/citadel.png?url';
import bCore from '../../assets/border/core.png?url';
import bFoundry from '../../assets/border/foundry.png?url';
import bFrontier from '../../assets/border/frontier.png?url';
import bMain from '../../assets/border/main.png?url';
import bOutlands from '../../assets/border/outlands.png?url';
import bRecCenter from '../../assets/border/rec-center.png?url';
import bSimple from '../../assets/border/simple.png?url';
import bStarton from '../../assets/border/starton.png?url';
import bToriel from '../../assets/border/toriel.png?url';

export const borderAsset = {
    none: ['', 0] as [string, number],
    dynamic: ['dynamic', 1] as [string, number],
    bSimple: [bSimple, 2] as [string, number],
    bMain: [bMain, 3] as [string, number],
    bOutlands: [bOutlands, 4] as [string, number],
    bToriel: [bToriel, 5] as [string, number],
    bStarton: [bStarton, 6] as [string, number],
    bFoundry: [bFoundry, 7] as [string, number],
    bAerialis: [bAerialis, 8] as [string, number],
    bRecCenter: [bRecCenter, 9] as [string, number],
    bCore: [bCore, 10] as [string, number],
    bCitadel: [bCitadel, 11] as [string, number],
    bAsgore: [bAsgore, 12] as [string, number],
    bArchive: [bArchive, 13] as [string, number],
    bArchiveOutlands: [bArchiveOutlands, 14] as [string, number],
    bArchiveStarton: [bArchiveStarton, 15] as [string, number],
    bArchiveFoundry: [bArchiveFoundry, 16] as [string, number],
    bArchiveAerialis: [bArchiveAerialis, 17] as [string, number],
    bAsrielBattle: [bAsrielBattle, 18] as [string, number],
    bFrontier: [bFrontier, 19] as [string, number],
    locked: ['', 20] as [string, number]
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
            'a_lookout'
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
        const borderSpecialRoomsSimple = ['a_lift', 'a_citadelevator'];
        const borderSpecialRooms: { [key: string]: (string | number)[] } = {
            ...borderSpecialRoomsMain.reduce((acc, room) => {
                acc[room] = borderAsset.bMain;
                return acc;
            }, {} as { [key: string]: (string | number)[] }),
            ...borderSpecialRoomsRecCenter.reduce((acc, room) => {
                acc[room] = borderAsset.bRecCenter;
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

        const borderType: { [key: string]: (string | number)[] } = {
            _frontier: borderAsset.bFrontier,
            c_archive_wasteland: borderAsset.bArchiveOutlands,
            c_archive_starton: borderAsset.bArchiveStarton,
            c_archive_foundry: borderAsset.bArchiveFoundry,
            c_archive_aerialis: borderAsset.bArchiveAerialis,
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
        for (const key in borderType) {
            if (room.startsWith(key)) {
                return borderType[key];
            }
        }
        return borderAsset.bMain;
    }
    getAvaliableBorder() {
        let plot = 0;
        let archiveProgress = 0;
        plot = SAVE.data.n.plot;
        archiveProgress = SAVE.data.n.state_citadel_archive;
        const thresholds = [
            [borderAsset.bOutlands, 2],
            [borderAsset.bToriel, 8],
            [borderAsset.bStarton, 17],
            [borderAsset.bFoundry, 33],
            [borderAsset.bAerialis, 49],
            [borderAsset.bRecCenter, 64],
            [borderAsset.bCore, 66],
            [borderAsset.bCitadel, 69],
            [borderAsset.bAsgore, 70],
            [borderAsset.bArchive, 71.1],
            [borderAsset.bAsrielBattle, 71.2]
        ];
        const thresholdsArchive = [
            [borderAsset.bArchiveOutlands, 1],
            [borderAsset.bArchiveStarton, 2],
            [borderAsset.bArchiveFoundry, 3],
            [borderAsset.bArchiveAerialis, 5]
        ];

        plot >= 72 ? borderAsset.bFrontier : borderAsset.locked;
        const availableBorders = [
            borderAsset.none,
            borderAsset.dynamic,
            borderAsset.bMain,
            ...thresholds
                .filter(([_, value]) => plot >= (value as number))
                .map(([border]) => border as (string | number)[]),
            ...thresholdsArchive
                .filter(([_, value]) => archiveProgress >= (value as number))
                .map(([border]) => border as (string | number)[]),
            plot >= 72 && SAVE.data.b.freedom ? borderAsset.bFrontier : borderAsset.locked
        ];
        return availableBorders;
    }
    handleUpdateBorder(border: (string | number)[]) {
        if (game.width === 960) {
            events.off('teleport', this.updateBorder);
            this.currentBorder = borderAsset.none;
            this.dynamic = false;
        } else {
            if (border === borderAsset.dynamic) {
                events.on('teleport', this.updateBorder);
                this.dynamic = true;
            } else {
                events.off('teleport', this.updateBorder);
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
