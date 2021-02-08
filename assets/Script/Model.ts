import { FEATURE, SKIN } from "./Define";
import Feature, { Body, Eyes, Nose, Head, Mouth } from "./Feature";

export class Model {
    skin:SKIN;
    head:Head;
    eyes:Eyes;
    mouth:Mouth;
    body:Body;
    nose:Nose;
    features:Feature[];

    constructor(skin:SKIN = null, eyes:Eyes = null, nose:Nose = null, mouth:Mouth = null, head:Head = null, body:Body = null) {
        this.skin = skin;
        this.eyes = eyes;
        this.nose = nose;
        this.mouth = mouth;
        this.head = head;
        this.body = body;
        this.features = [this.head, this.eyes, this.nose, this.mouth, this.body];
    }

    Update(eyes:Eyes = null, nose:Nose = null, mouth:Mouth = null, head:Head = null, body:Body = null) {
        this.eyes = eyes != null? eyes : this.eyes;
        this.nose = nose != null? nose : this.nose;
        this.mouth = mouth != null? mouth : this.mouth;
        this.head = head != null? head : this.head;
        this.body = body != null? body : this.body;
        this.features = [this.head, this.eyes, this.nose, this.mouth, this.body];  
    }

    Compare(model:Model) : Array<number> {
        var green: number = 0;
        var red: number = 0;

        for(var i = 0; i < FEATURE.NUM; i++) {
            for(var j = 0; j < FEATURE.NUM; j++) {
                if(this.features[i].color == model.features[i].color) {
                    green++;
                    break
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
