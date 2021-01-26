// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import { COLOR, TYPE } from "./Define";
import { Head, Eyes, Mouth, Body, Feet } from "./Feature";
import { Model } from "./Model";
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    CreateNewModel() {
        var model = new Model(
            new Head(this.randomIntFromInterval(0, TYPE.END - 1), 
                     this.randomIntFromInterval(0, COLOR.END - 1)),
            new Eyes(this.randomIntFromInterval(0, TYPE.END - 1), 
                     this.randomIntFromInterval(0, COLOR.END - 1)),
            new Mouth(this.randomIntFromInterval(0, TYPE.END - 1), 
                     this.randomIntFromInterval(0, COLOR.END - 1)),
            new Body(this.randomIntFromInterval(0, TYPE.END - 1), 
                     this.randomIntFromInterval(0, COLOR.END - 1)),
            new Feet(this.randomIntFromInterval(0, TYPE.END - 1), 
                     this.randomIntFromInterval(0, COLOR.END - 1))         
        );
    }

    randomIntFromInterval(min: number, max: number) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
      
    Initialize() {
        
    }

    NewSection() {
        this.CreateNewModel();
        this.Initialize();
    } 
    
    // update (dt) {}

      
}
