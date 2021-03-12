import { Define as def } from "./Define";
import Feature, { Body, Eyes, Nose, Head, Mouth } from "./Feature";
import GameLogicBase from "./GameLogicBase"

export class Model {
    skin:def.SKIN;
    eyes:Eyes;
    nose:Nose;
    mouth:Mouth;
    head:Head;
    body:Body;
    features:Feature[];

    constructor(skin:def.SKIN = null, eyes:Eyes = null, nose:Nose = null, mouth:Mouth = null, head:Head = null, body:Body = null) {
        this.skin = skin;
        this.eyes = eyes;
        this.nose = nose;
        this.mouth = mouth;
        this.head = head;
        this.body = body;
        this.features = [this.eyes, this.nose, this.mouth, this.head, this.body];
    }

    Clone(model: Model) {
        this.skin = model.skin;
        this.eyes = model.eyes;
        this.nose = model.nose;
        this.mouth = model.mouth;
        this.head = model.head;
        this.body = model.body;
        this.features = [model.eyes, model.nose, model.mouth, model.head, model.body];
    }

    Update(eyes:Eyes = null, nose:Nose = null, mouth:Mouth = null, head:Head = null, body:Body = null) {
        this.eyes = eyes != null? eyes : this.eyes;
        this.nose = nose != null? nose : this.nose;
        this.mouth = mouth != null? mouth : this.mouth;
        this.head = head != null? head : this.head;
        this.body = body != null? body : this.body;
        this.features = [this.eyes, this.nose, this.mouth, this.head, this.body];  
    }

    Compare(model:Model, number:number) : Array<number> {
        var green: number = 0;
        var red: number = 0;

        for(var i = 0; i < number; i++) {
            for(var j = 0; j < number; j++) {
                if(model.features[i] == null)
                    return null;
                if(this.features[i].color == model.features[i].color) {
                    green++;
                    break;
                }
                else {
                    if(this.features[i].color == model.features[j].color) {
                        red++;
                    }
                }
            }
        }

        return [green, red];
    }
}
