// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import { Body, Eyes, Feet, Head, Mouth } from "./Feature";

export class Model {

    head:Head;
    eyes:Eyes;
    mouth:Mouth;
    body:Body;
    feet:Feet;
    
    constructor(head:Head, eyes:Eyes, mouth:Mouth, body:Body, feet:Feet) {
        this.head = head;
        this.eyes = eyes;
        this.mouth = mouth;
        this.body = body;
        this.feet = feet;
    }

    Validate(model:Model):boolean
    {
        return this == model;
    }
}
