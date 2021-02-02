import {TYPE, COLOR, HEADTYPE} from "./Define";

export default class Feature {
    constructor(type:TYPE, color:COLOR, headtype:HEADTYPE = HEADTYPE.ROUND) {
        this.type = type;
        this.color = color;
        this.headType = headtype;
    }
    headType:HEADTYPE;
    type:TYPE;
    color:COLOR;
}

export class Head extends Feature {}
export class Eyes extends Feature {}
export class Nose extends Feature {}
export class Mouth extends Feature {}
export class Body extends Feature {}