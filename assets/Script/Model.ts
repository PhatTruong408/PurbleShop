import { SKIN } from "./Define";
import Feature, { Body, Eyes, Nose, Head, Mouth } from "./Feature";

export class Model {
    skin:SKIN;
    head:Head;
    eyes:Eyes;
    mouth:Mouth;
    body:Body;
    nose:Nose;

    constructor(skin:SKIN = null, eyes:Eyes = null, nose:Nose = null, mouth:Mouth = null, head:Head = null, body:Body = null) {
        this.skin = skin;
        this.eyes = eyes;
        this.nose = nose;
        this.mouth = mouth;
        this.head = head;
        this.body = body;     
    }

    Update(eyes:Eyes = null, nose:Nose = null, mouth:Mouth = null, head:Head = null, body:Body = null) {
        this.eyes = eyes != null? eyes : this.eyes;
        this.nose = nose != null? nose : this.nose;
        this.mouth = mouth != null? mouth : this.mouth;
        this.head = head != null? head : this.head;
        this.body = body != null? body : this.body;    
    }

    Compare(model:Model) : Array<number> {
        var green: number = 0;
        var red: number = 0;
        if(this.head == model.head)
            green++;
        else red++;
        if(this.eyes == model.eyes)
            green++;
        else red++;
        if(this.nose == model.nose)
            green++;
        else red++;
        if(this.mouth == model.mouth)
            green++;
        else red++;
        if(this.body == model.body)
            green++;
        else red++;
        return [green, red];
    }
}
