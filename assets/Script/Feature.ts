import {Define as def} from "./Define";

export default class Feature {
    constructor(type:def.TYPE, color:def.COLOR, headtype:def.HEADTYPE = def.HEADTYPE.ROUND) {
        this.type = type;
        this.color = color;
        this.headType = headtype;
    }
    headType:def.HEADTYPE;
    type:def.TYPE;
    color:def.COLOR;
}

export class Head extends Feature {}
export class Eyes extends Feature {}
export class Nose extends Feature {}
export class Mouth extends Feature {}
export class Body extends Feature {}