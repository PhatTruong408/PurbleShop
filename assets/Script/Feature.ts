// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import {TYPE, COLOR} from "./Define";

export default class Feature {
    constructor(type:TYPE, color:COLOR) {
        this.type = type;
        this.color = color;
    }
    type:TYPE;
    color:COLOR;
}

export class Head extends Feature {}
export class Eyes extends Feature {}
export class Mouth extends Feature {}
export class Body extends Feature {}
export class Feet extends Feature {}