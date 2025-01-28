// TODO: update to follow outertale code conventions

import { isMobile } from 'pixi.js';
import { keys } from './core';
import { CosmosKeyboardInput } from './storyteller';

import ieButton1N from '../../assets/images/extras/button1N.png?url';
import ieButton1P from '../../assets/images/extras/button1P.png?url';
import ieButton5N from '../../assets/images/extras/button5N.png?url';
import ieButton5P from '../../assets/images/extras/button5P.png?url';
import ieButtonC from '../../assets/images/extras/buttonC.png?url';
import ieButtonDEBUG from '../../assets/images/extras/buttonDEBUG.png?url';
import ieButtonF from '../../assets/images/extras/buttonF.png?url';
import ieButtonLK from '../../assets/images/extras/buttonLK.png?url';
import ieButtonR from '../../assets/images/extras/buttonR.png?url';
import ieButtonRK from '../../assets/images/extras/buttonRK.png?url';
import ieButtonTR from '../../assets/images/extras/buttonTR.png?url';
import ieButtonX from '../../assets/images/extras/buttonX.png?url';
import ieButtonZ from '../../assets/images/extras/buttonZ.png?url';
import ieButton0 from '../../assets/images/extras/button0.png?url';
import ieButton1 from '../../assets/images/extras/button1.png?url';
import ieButton2 from '../../assets/images/extras/button2.png?url';
import ieButton3 from '../../assets/images/extras/button3.png?url';
import ieButton4 from '../../assets/images/extras/button4.png?url';

export const mobileAssets = {
    ieButtonC,
    ieButtonF,
    ieButtonX,
    ieButtonZ,
    ieButtonR,
    ieButtonTR,
    ieButtonLK,
    ieButtonRK,
    ieButton1P,
    ieButton1N,
    ieButton5P,
    ieButton5N,
    ieButtonDEBUG,
    ieButton0,
    ieButton1,
    ieButton2,
    ieButton3,
    ieButton4
};

export interface mobileBtnOptions {
    group: string;
    source: string;
    size: number;
    x: number;
    y: number;
    rotation?: number;
    relative?: boolean;
    onPress?: (e?: TouchEvent) => void;
    onRelease?: (e?: TouchEvent) => void;
    onMove?: (e?: TouchEvent) => void;
}

export interface joyStickOptions {
    group: string;
    x: number;
    y: number;
    radius: number;
    deadzone: number;
    angle: number;
}

export class mobileBtn {
    element: HTMLDivElement;
    opacity: number;
    onPress?: (e?: TouchEvent) => void;
    onRelease?: (e?: TouchEvent) => void;
    onMove?: (e?: TouchEvent) => void;
    x: number = 0;
    y: number = 0;
    size: number = 0;
    relative: boolean = false;
    rotation: number = 0;
    constructor(options: mobileBtnOptions) {
        this.element = document.createElement('div');
        this.opacity = 1;
        this.onPress = options.onPress;
        this.onRelease = options.onRelease;
        this.onMove = options.onMove;
        this.size = options.size;
        if (options.relative !== undefined) {
            this.relative = options.relative;
        }

        this.element.style.touchAction = 'none'; // 防止触摸事件的默认行为
        this.element.style.userSelect = 'none'; // 防止文本选择
        this.element.style.position = 'absolute';
        this.element.style.backgroundImage = `url(${options.source})`;
        this.element.style.backgroundSize = 'contain';
        this.element.style.backgroundRepeat = 'no-repeat';
        this.element.style.opacity = String(0.5 * this.opacity);
        this.element.style.position = 'absolute';
        this.element.style.pointerEvents = 'auto';
        this.setPosAbsolute(options.x, options.y);

        if (options.rotation) {
            this.element.style.transform = `rotate(${options.rotation}deg)`;
            this.rotation = options.rotation;
        }

        const parent = document.getElementById(options.group);
        if (parent) {
            parent.appendChild(this.element);
        }

        this.element.addEventListener('touchstart', this.handleTouchStart.bind(this));
        this.element.addEventListener('touchcancel', this.handleTouchEnd.bind(this));
        this.element.addEventListener('touchend', this.handleTouchEnd.bind(this));
        this.element.addEventListener('touchmove', this.handleTouchMove.bind(this));
    }
    handleTouchStart(e?: TouchEvent) {
        this.element.style.opacity = String(this.opacity);
        if (this.onPress) {
            if (e) {
                this.onPress(e);
            } else {
                this.onPress();
            }
        }
    }
    handleTouchMove(e?: TouchEvent) {
        if (this.onMove) {
            if (e) {
                this.onMove(e);
            } else {
                this.onMove();
            }
        }
    }
    handleTouchEnd(e?: TouchEvent) {
        this.element.style.opacity = String(0.5 * this.opacity);
        if (this.onRelease) {
            if (e) {
                this.onRelease(e);
            } else {
                this.onRelease();
            }
        }
    }
    setPos(x: number, y: number) {
        this.x += x;
        this.y += y;
        this.resize(this.size);
    }
    setPosAbsolute(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.resize(this.size);
    }
    resize(size: number) {
        this.size = size;
        this.element.style.width = `${size}vmin`;
        this.element.style.height = `${size}vmin`;
        const radiow =
            !this.relative && window.innerWidth > window.innerHeight ? window.innerHeight / window.innerWidth : 1;
        const radioh =
            !this.relative && window.innerHeight > window.innerWidth ? window.innerWidth / window.innerHeight : 1;
        this.element.style.left = `${this.x - (radiow * this.size) / 2}${this.relative ? 'vmin' : 'vw'}`;
        this.element.style.top = `${this.y - (radioh * this.size) / 2}${this.relative ? 'vmin' : 'vh'}`;
    }
}

export class mobileJoystk {
    canvas: HTMLCanvasElement;
    radius: number;
    radiusRel: number;
    deadzone: number;
    opacity: number;
    angle: number;
    x: number = 0;
    y: number = 0;
    center: { x: number; y: number };
    ctx: CanvasRenderingContext2D;
    activeTouchId: number | null = null; // Track the active touch ID
    keyState: boolean[] = [false, false, false, false];
    constructor(options: joyStickOptions) {
        this.radiusRel = options.radius;
        this.radius = (this.radiusRel * Math.min(window.innerHeight, window.innerWidth)) / 100;
        this.deadzone = options.deadzone;
        this.angle = options.angle;
        this.center = { x: 0, y: 0 };
        this.opacity = 1;
        this.x = options.x;
        this.y = options.y;

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.radius * 2;
        this.canvas.height = this.radius * 2;
        this.canvas.style.pointerEvents = 'auto';
        this.canvas.style.width = `${this.radiusRel * 2}vmin`;
        this.canvas.style.height = `${this.radiusRel * 2}vmin`;
        this.canvas.style.position = 'absolute';
        this.canvas.style.opacity = String(this.opacity * 0.5);
        this.canvas.style.left = `${this.x - this.radiusRel}vmin`;
        this.canvas.style.top = `${this.y - this.radiusRel}vmin`;
        this.setPosAbsolute(options.x, options.y);

        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        const parent = document.getElementById(options.group);
        if (parent) {
            parent.appendChild(this.canvas);
        }

        this.draw();
        this.canvas.addEventListener('touchstart', this.handleTouchStart.bind(this));
        this.canvas.addEventListener('touchmove', this.handleTouchMove.bind(this));
        this.canvas.addEventListener('touchend', this.handleTouchEnd.bind(this));
        this.canvas.addEventListener('touchcancel', this.handleTouchEnd.bind(this));
    }
    isTouchWithinJoystick(touch: Touch): boolean {
        const rect = this.canvas.getBoundingClientRect();
        const touchX = touch.clientX;
        const touchY = touch.clientY;
        return touchX >= rect.left && touchX <= rect.right && touchY >= rect.top && touchY <= rect.bottom;
    }
    handleTouchStart(event: TouchEvent) {
        // Iterate through all new touches to find if any start within the joystick
        for (let i = 0; i < event.changedTouches.length; i++) {
            const touch = event.changedTouches[i];
            if (this.isTouchWithinJoystick(touch)) {
                // If no active touch, set this touch as active
                if (this.activeTouchId === null) {
                    this.activeTouchId = touch.identifier;
                    this.canvas.style.opacity = String(this.opacity);
                    this.handleTouch(touch);
                    break; // Only handle one touch
                }
            }
        }
    }
    handleTouchMove(event: TouchEvent) {
        if (this.activeTouchId === null) {
            return;
        }

        // Find the active touch
        for (let i = 0; i < event.changedTouches.length; i++) {
            const touch = event.changedTouches[i];
            if (touch.identifier === this.activeTouchId) {
                event.preventDefault(); // Prevent default scrolling behavior
                this.handleTouch(touch);
                break;
            }
        }
    }
    handleTouchEnd(event: TouchEvent) {
        if (this.activeTouchId === null) {
            return;
        }

        // Check if the active touch has ended
        for (let i = 0; i < event.changedTouches.length; i++) {
            const touch = event.changedTouches[i];
            if (touch.identifier === this.activeTouchId) {
                this.activeTouchId = null;
                this.canvas.style.opacity = String(this.opacity * 0.5);
                this.resetJoystick();
                break;
            }
        }
    }
    handleTouch(touch: Touch) {
        const rect = this.canvas.getBoundingClientRect();
        const touchX = (touch.clientX - rect.left) * (this.canvas.width / rect.width) - this.radius;
        const touchY = (touch.clientY - rect.top) * (this.canvas.height / rect.height) - this.radius;

        const distance = Math.sqrt(touchX * touchX + touchY * touchY);
        if (distance > this.radius) {
            this.center.x = (touchX / distance) * this.radius;
            this.center.y = (touchY / distance) * this.radius;
        } else {
            this.center.x = touchX;
            this.center.y = touchY;
        }
        if (distance > this.deadzone * this.radius) {
            const OriginalKeyState = this.keyState;
            this.checkDirection();
            const key = [keys.rightKey, keys.downKey, keys.leftKey, keys.upKey];
            const keyCode = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'];
            this.keyState.forEach((isPressed, index) => {
                if (isPressed && !OriginalKeyState[index]) { key[index].down(keyCode[index]); }
                else if (!isPressed && OriginalKeyState[index]) { key[index].up(keyCode[index]); }
            });
        } else { this.resetJoystick(); }
        this.draw();
    }
    resetJoystick() {
        this.center.x = 0;
        this.center.y = 0;
        keys.upKey.up('ArrowUp');
        keys.downKey.up('ArrowDown');
        keys.leftKey.up('ArrowLeft');
        keys.rightKey.up('ArrowRight');
        this.keyState = [false, false, false, false];
        this.draw();
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 绘制外圈
        this.ctx.setLineDash([]);
        this.ctx.beginPath();
        this.ctx.arc(this.radius, this.radius, this.radius, 0, Math.PI * 2);
        this.ctx.strokeStyle = 'gray';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        // 绘制死区
        this.ctx.setLineDash([3, 3]);
        this.ctx.beginPath();
        this.ctx.arc(this.radius, this.radius, this.radius * this.deadzone, 0, Math.PI * 2);
        this.ctx.strokeStyle = 'yellow';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        // 绘制摇杆
        this.ctx.setLineDash([]);
        this.ctx.beginPath();
        this.ctx.arc(this.radius + this.center.x, this.radius + this.center.y, this.radius * 0.3, 0, Math.PI * 2);
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        if (this.center.x !== 0 || this.center.y !== 0) {
            let angle = 0;
            let count = 0;
            this.keyState.forEach((State, index) => {
                if (State) {
                    angle += index;
                    count += 1;
                }
            });
            const displayAngleIndex = this.keyState[0] && this.keyState[3] ? 7 : (angle / count) * 2;
            const shiftAngle = Math.min(Math.PI / 4, Math.PI / 2 - (this.angle * Math.PI) / 180);
            const angleZone = [
                -shiftAngle,
                shiftAngle,
                Math.PI / 2 - shiftAngle,
                Math.PI / 2 + shiftAngle,
                Math.PI - shiftAngle,
                Math.PI + shiftAngle,
                Math.PI * 1.5 - shiftAngle,
                Math.PI * 1.5 + shiftAngle,
                Math.PI * 2 - shiftAngle
            ];
            // 绘制主方向扇形
            this.ctx.beginPath();
            this.ctx.moveTo(this.radius, this.radius);
            this.ctx.arc(
                this.radius,
                this.radius,
                this.radius,
                angleZone[displayAngleIndex],
                angleZone[displayAngleIndex + 1]
            );
            this.ctx.closePath();
            this.ctx.fillStyle = 'rgba(0, 255, 255, 0.3)';
            this.ctx.fill();
        }
    }
    checkDirection() {
        const currentAngle = Math.atan2(this.center.y, this.center.x);
        const primaryAngle = Math.round(currentAngle / (Math.PI / 2)) * (Math.PI / 2);
        const secondaryAngle = primaryAngle + Math.sign(currentAngle - primaryAngle) * (Math.PI / 2);
        // RIGHT, UP, LEFT, DOWN
        this.keyState = [false, false, false, false];
        this.keyState[((primaryAngle + Math.PI * 2) % (Math.PI * 2)) / (Math.PI / 2)] = true;
        if ((this.angle * Math.PI) / 180 >= Math.abs(secondaryAngle - currentAngle)) { this.keyState[((secondaryAngle + Math.PI * 2) % (Math.PI * 2)) / (Math.PI / 2)] = true; }
    }
    setPos(x: number, y: number) {
        this.x += x;
        this.y += y;
        this.canvas.style.left = `${this.x - this.radiusRel}vmin`;
        this.canvas.style.top = `${this.y - this.radiusRel}vmin`;
    }
    setPosAbsolute(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.canvas.style.left = `${this.x - this.radiusRel}vmin`;
        this.canvas.style.top = `${this.y - this.radiusRel}vmin`;
    }
    resize(radius: number) {
        this.radiusRel = radius;
        this.radius = (radius * Math.min(window.innerHeight, window.innerWidth)) / 100;
        this.canvas.width = this.radius * 2;
        this.canvas.height = this.radius * 2;
        this.canvas.style.width = `${this.radiusRel * 2}vmin`;
        this.canvas.style.height = `${this.radiusRel * 2}vmin`;
        this.canvas.style.left = `${this.x - this.radiusRel}vmin`;
        this.canvas.style.top = `${this.y - this.radiusRel}vmin`;
        this.draw();
    }
}

export const mobileUtils = {
    createArrowBtn(group: string, centerX: number, centerY: number, size: number, radius: number, diagnal: boolean) {
        let directions = [];

        if (diagnal) {
            directions = [
                {
                    key: [keys.leftKey, keys.upKey],
                    offsetX: -radius,
                    offsetY: -radius,
                    keyCode: ['ArrowLeft', 'ArrowUp'],
                    source: mobileAssets.ieButtonTR,
                    rotation: -90
                },
                {
                    key: [keys.rightKey, keys.upKey],
                    offsetX: radius,
                    offsetY: -radius,
                    keyCode: ['ArrowRight', 'ArrowUp'],
                    source: mobileAssets.ieButtonTR,
                    rotation: 0
                },
                {
                    key: [keys.rightKey, keys.downKey],
                    offsetX: radius,
                    offsetY: radius,
                    keyCode: ['ArrowRight', 'ArrowDown'],
                    source: mobileAssets.ieButtonTR,
                    rotation: 90
                },
                {
                    key: [keys.leftKey, keys.downKey],
                    offsetX: -radius,
                    offsetY: radius,
                    keyCode: ['ArrowLeft', 'ArrowDown'],
                    source: mobileAssets.ieButtonTR,
                    rotation: 180
                }
            ];
        } else {
            directions = [
                {
                    key: [keys.leftKey],
                    offsetX: -radius,
                    offsetY: 0,
                    keyCode: ['ArrowLeft'],
                    source: mobileAssets.ieButtonR,
                    rotation: 180
                },
                {
                    key: [keys.upKey],
                    offsetX: 0,
                    offsetY: -radius,
                    keyCode: ['ArrowUp'],
                    source: mobileAssets.ieButtonR,
                    rotation: -90
                },
                {
                    key: [keys.rightKey],
                    offsetX: radius,
                    offsetY: 0,
                    keyCode: ['ArrowRight'],
                    source: mobileAssets.ieButtonR,
                    rotation: 0
                },
                {
                    key: [keys.downKey],
                    offsetX: 0,
                    offsetY: radius,
                    keyCode: ['ArrowDown'],
                    source: mobileAssets.ieButtonR,
                    rotation: 90
                }
            ];
        }

        const mobileBtns = directions.map(direction => {
            return new mobileBtn({
                group,
                source: direction.source,
                onPress: () =>
                    direction.keyCode.forEach((code, index) => {
                        direction.key[index].down(code);
                    }),
                onRelease: () =>
                    direction.keyCode.forEach((code, index) => {
                        direction.key[index].up(code);
                    }),
                size,
                x: centerX + direction.offsetX,
                y: centerY + direction.offsetY,
                rotation: direction.rotation,
                relative: true
            });
        });
        return mobileBtns;
    },
    createBtn(
        group: string,
        centerX: number,
        centerY: number,
        size: number,
        key: CosmosKeyboardInput,
        keyCode: string,
        source: string
    ) {
        return new mobileBtn({
            group,
            source,
            size,
            x: centerX,
            y: centerY,
            onPress: () => key.down(keyCode),
            onRelease: () => key.up(keyCode)
        });
    },
    createBtn2(group: string, centerX: number, centerY: number, size: number, source: string) {
        return new mobileBtn({
            group,
            source,
            size,
            x: centerX,
            y: centerY
        });
    },
    loadKeyConfig(button: mobileBtn, config: string) {
        const part = config.split(',');
        const x = +part[0];
        const y = +part[1];
        const size = +part[2];
        button.setPosAbsolute(x, y);
        button.resize(size);
    },
    geneKeyConfig(buttons: mobileBtn[]) {
        return buttons
            .map(button => {
                const x = button.x;
                const y = button.y;
                const size = button.size;
                return `${x},${y},${size}`;
            })
            .join('|');
    },
    loadJoystkConfig(stick: mobileJoystk, config: string) {
        const parts = config.split(',');
        const x = +parts[0];
        const y = +parts[1];
        const radius = +parts[2];
        const deadzone = +parts[3];
        const angle = +parts[4];

        stick.deadzone = deadzone;
        stick.angle = angle;
        stick.setPosAbsolute(x, y);
        stick.resize(radius);
    },
    geneJoystkConfig(stick: mobileJoystk) {
        const x = stick.x;
        const y = stick.y;
        const radius = stick.radiusRel;
        const deadzone = stick.deadzone;
        const angle = stick.angle;
        return `${x},${y},${radius},${deadzone},${angle}`;
    }
};

export const mobileBtnModify = {
    key: null as mobileBtn | null,
    step: 0,
    x: 0,
    y: 0,
    size: 0,
    rotation: 0,
    source: '',
    name: '',
    relative: false
};

export const mobileArrowGroup = {
    x: 24,
    y: 72,
    arrowsize: 16,
    arrowradius: 16,
    diagsize: 16,
    diagradius: 16
};

let mobileFuncBtns: mobileBtn[] = [];
let mobileArrowBtns: mobileBtn[] = [];
let mobileDiagBtns: mobileBtn[] = [];
let mobileConfigBtns: mobileBtn[] = [];
let mobileJoystk0: mobileJoystk | null = null;
let mobileFullScrBtn: mobileBtn | null = null;
let mobileResetBtn: mobileBtn | null = null;
let mobileDebugBtn: mobileBtn | null = null;
let mobileTempBtn1: mobileBtn[] = [];
let mobileTempBtn2: mobileBtn[] = [];
let mobileTempBtn3: mobileBtn[] = [];
const mobileTempBtn4: mobileBtn[] = [];
let mobileDefaultCfg: string = '';

export function mobileDisableBtninput() {
    [
        ...mobileFuncBtns,
        ...mobileArrowBtns,
        ...mobileDiagBtns,
        mobileDebugBtn,
        ...mobileConfigBtns,
        mobileFullScrBtn,
        mobileResetBtn
    ].forEach(btn => {
        (btn as mobileBtn).handleTouchEnd();
        (btn as mobileBtn).element.style.pointerEvents = 'none';
        (btn as mobileBtn).element.style.opacity = '0.3';
    });
    (mobileJoystk0 as mobileJoystk).canvas.style.pointerEvents = 'none';
    (mobileJoystk0 as mobileJoystk).canvas.style.opacity = '0.25';
}

export function mobileEnableBtninput() {
    [
        ...mobileFuncBtns,
        ...mobileArrowBtns,
        ...mobileDiagBtns,
        mobileDebugBtn,
        ...mobileConfigBtns,
        mobileFullScrBtn,
        mobileResetBtn
    ].forEach(btn => {
        (btn as mobileBtn).handleTouchEnd();
        (btn as mobileBtn).element.style.pointerEvents = 'auto';
        (btn as mobileBtn).element.style.opacity = '0.5';
    });
    (mobileJoystk0 as mobileJoystk).canvas.style.pointerEvents = 'auto';
    (mobileJoystk0 as mobileJoystk).canvas.style.opacity = '0.5';
}

if (isMobile.any) {
    /** buttons */
    mobileFuncBtns = [
        mobileUtils.createBtn('function-keys', 78, 84, 20, keys.interactKey, 'KeyZ', mobileAssets.ieButtonZ),
        mobileUtils.createBtn('function-keys', 86, 68, 20, keys.specialKey, 'KeyX', mobileAssets.ieButtonX),
        mobileUtils.createBtn('function-keys', 94, 52, 20, keys.menuKey, 'KeyC', mobileAssets.ieButtonC)
    ];
    mobileConfigBtns = [
        mobileUtils.createBtn2('function-keys', 12, 16, 8, mobileAssets.ieButton0),
        mobileUtils.createBtn2('function-keys', 6, 26, 8, mobileAssets.ieButton1),
        mobileUtils.createBtn2('function-keys', 12, 26, 8, mobileAssets.ieButton2),
        mobileUtils.createBtn2('function-keys', 6, 36, 8, mobileAssets.ieButton3),
        mobileUtils.createBtn2('function-keys', 12, 36, 8, mobileAssets.ieButton4)
    ];
    mobileArrowBtns = mobileUtils.createArrowBtn(
        'arrow-keys',
        mobileArrowGroup.x,
        mobileArrowGroup.y,
        mobileArrowGroup.arrowsize,
        mobileArrowGroup.arrowradius,
        false
    );
    mobileDiagBtns = mobileUtils.createArrowBtn(
        'arrow-keys',
        mobileArrowGroup.x,
        mobileArrowGroup.y,
        mobileArrowGroup.diagsize,
        mobileArrowGroup.diagradius,
        true
    );
    mobileFullScrBtn = mobileUtils.createBtn2('function-keys', 6, 6, 8, mobileAssets.ieButtonF);
    mobileResetBtn = mobileUtils.createBtn2('function-keys', 94, 6, 8, mobileAssets.ieButtonRK);
    mobileDebugBtn = mobileUtils.createBtn2('function-keys', 6, 16, 8, mobileAssets.ieButtonDEBUG);
    mobileJoystk0 = new mobileJoystk({
        group: 'joystick',
        x: 24,
        y: 72,
        radius: 24,
        angle: 56,
        deadzone: 0.3
    });
    mobileTempBtn1 = [
        mobileUtils.createBtn('temp-keys', 6, 6, 8, keys.interactKey, 'KeyZ', mobileAssets.ieButtonLK),
        mobileUtils.createBtn('temp-keys', 94, 6, 8, keys.specialKey, 'KeyX', mobileAssets.ieButtonRK)
    ];
    mobileTempBtn2 = [
        ...mobileUtils.createArrowBtn(
            'temp-keys',
            mobileArrowGroup.x,
            mobileArrowGroup.y,
            mobileArrowGroup.arrowsize,
            mobileArrowGroup.arrowradius,
            false
        )
    ];
    mobileTempBtn3 = [
        mobileUtils.createBtn('temp-keys', 12, 76, 16, keys.leftKey, 'KeyA', mobileAssets.ieButton5N),
        mobileUtils.createBtn('temp-keys', 24, 76, 16, keys.upKey, 'KeyW', mobileAssets.ieButton1N),
        mobileUtils.createBtn('temp-keys', 76, 76, 16, keys.rightKey, 'keyD', mobileAssets.ieButton1P),
        mobileUtils.createBtn('temp-keys', 88, 76, 16, keys.downKey, 'KeyS', mobileAssets.ieButton5P)
    ];
    [...mobileTempBtn1, ...mobileTempBtn2, ...mobileTempBtn3].forEach(btn => {
        btn.element.style.display = 'none';
    });
    mobileDefaultCfg = [
        mobileUtils.geneJoystkConfig(mobileJoystk0),
        mobileUtils.geneKeyConfig(mobileFuncBtns),
        mobileUtils.geneKeyConfig(mobileArrowBtns),
        mobileUtils.geneKeyConfig(mobileDiagBtns)
    ].join('|');
}

export {
    mobileArrowBtns,
    mobileDebugBtn,
    mobileDefaultCfg,
    mobileDiagBtns,
    mobileConfigBtns,
    mobileFullScrBtn,
    mobileFuncBtns,
    mobileJoystk0,
    mobileResetBtn,
    mobileTempBtn1,
    mobileTempBtn2,
    mobileTempBtn3,
    mobileTempBtn4
};
