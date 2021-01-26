import Feature, { Body, Eyes, Nose, Head, Mouth } from "./Feature";

export class Model {
    head:Head;
    eyes:Eyes;
    mouth:Mouth;
    body:Body;
    nose:Nose;

    constructor(head:Head = null, eyes:Eyes = null, mouth:Mouth = null, body:Body = null, nose:Nose = null) {
        this.head = head;
        this.eyes = eyes;
        this.mouth = mouth;
        this.body = body;
        this.nose = nose;
    }

    Update(head:Head = null, eyes:Eyes = null, mouth:Mouth = null, body:Body = null, nose:Nose = null) {
        this.head = head;
        this.eyes = eyes;
        this.mouth = mouth;
        this.body = body;
        this.nose = nose;
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
