const {ccclass, property} = cc._decorator;
const FEATURE_NUM = 5;
const EASY = 3;
const NORMAL = 4;
const HARD = 5;


import { COLOR, SKIN, TYPE } from "./Define";
import Feature, { Head, Eyes, Mouth, Body, Nose } from "./Feature";
import { Model } from "./Model";
@ccclass
export default class GameLogicBase extends cc.Component {
    @property({type: [cc.Prefab]})
    Models = []
    @property({type: [cc.Prefab]})
    SetItems = []
    @property ({type: cc.Node})
    itemLayoutPanel = null

    gameMode = HARD;
    featuresType:TYPE;
    sampleModel:Model;
    mainModel:Model;
    result:number[];

    start () {
        this.mainModel = new Model();
        this.NewSection();
    }

    CreateSampleModel() {
        this.featuresType = this.randomIntFromInterval(0, TYPE.END - 1);
        this.sampleModel = new Model(
            this.randomIntFromInterval(0, SKIN.END - 1),       
            new Eyes(this.featuresType, this.randomIntFromInterval(0, this.gameMode - 1)),
            new Nose(this.featuresType, this.randomIntFromInterval(0, this.gameMode - 1)),     
            new Mouth(this.featuresType, this.randomIntFromInterval(0, this.gameMode - 1))
        );
        if(this.gameMode >= NORMAL)
            this.sampleModel.Update(null, null, null, new Head(this.featuresType, 
                                                            this.randomIntFromInterval(0, this.gameMode - 1)));
        if(this.gameMode == HARD)
            this.sampleModel.Update(null, null, null, null, new Body(this.featuresType, 
                                                            this.randomIntFromInterval(0, this.gameMode - 1)));
    }

    randomIntFromInterval(min: number, max: number) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
      
    Initialize() {
        //Create model object
        const model = cc.instantiate(this.Models[this.sampleModel.skin]);
        model.position = new cc.Vec3(-220,-85,1);
        this.node.parent.addChild(model);

        //Create grid items
        var itemList = []
        var position = new cc.Vec3(0,0,1);
        for(var i = 0; i < this.gameMode; i++)
        {
            itemList[i] = [];
            for(var j = 0; j < this.gameMode; j++) {     
                itemList[i][j] = new Feature(this.featuresType, i);
            }
            const setItems = cc.instantiate(this.SetItems[i]);
            setItems.position = position;
            this.itemLayoutPanel.addChild(setItems);
            position.x += 50;
        }      
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
