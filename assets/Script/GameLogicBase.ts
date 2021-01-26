const {ccclass, property} = cc._decorator;
const FEATURE_NUM = 5;

import { COLOR, TYPE } from "./Define";
import Feature, { Head, Eyes, Mouth, Body, Nose } from "./Feature";
import { Model } from "./Model";
@ccclass
export default class GameLogicBase extends cc.Component {

    sampleModel:Model;
    mainModel:Model;
    result:number[];

    start () {
        this.mainModel = new Model();
    }

    CreateSampleModel() {
        this.sampleModel = new Model(
            new Head(this.randomIntFromInterval(0, TYPE.END - 1), 
                     this.randomIntFromInterval(0, COLOR.END - 1)),
            new Eyes(this.randomIntFromInterval(0, TYPE.END - 1), 
                     this.randomIntFromInterval(0, COLOR.END - 1)),
            new Nose(this.randomIntFromInterval(0, TYPE.END - 1), 
                     this.randomIntFromInterval(0, COLOR.END - 1)),
            new Mouth(this.randomIntFromInterval(0, TYPE.END - 1), 
                     this.randomIntFromInterval(0, COLOR.END - 1)),
            new Body(this.randomIntFromInterval(0, TYPE.END - 1), 
                     this.randomIntFromInterval(0, COLOR.END - 1)),         
        );
    }

    randomIntFromInterval(min: number, max: number) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
      
    Initialize() {
        //Create grid features, model object,..
    }

    NewSection() {
        this.CreateSampleModel();
        this.Initialize();
    }

    UpdateModel(feature:Feature) {
        this.mainModel.Update(feature);
    }
    
    CheckResult() {
        this.result = this.sampleModel.Compare(this.mainModel)
        //call UI to update result

        if(this.result == [FEATURE_NUM, 0])
            return; //Game won
    }

    // update (dt) {}     
}
