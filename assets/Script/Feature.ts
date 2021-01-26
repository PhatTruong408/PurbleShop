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
export class Nose extends Feature {}
export class Mouth extends Feature {}
export class Body extends Feature {}