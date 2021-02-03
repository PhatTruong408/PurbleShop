const {ccclass, property} = cc._decorator;
const FEATURE_NUM = 5;
const EASY = 3;
const NORMAL = 4;
const HARD = 5;


import { COLOR, SKIN, TYPE } from "./Define";
import Feature, { Head, Eyes, Mouth, Body, Nose } from "./Feature";
import GameUI from "./GameUI";
import { Model } from "./Model";
import SetItem from "./SetItem";
@ccclass
export default class GameLogicBase extends cc.Component {
    @property({type: cc.Node})
    ModelTemplate: cc.Node = null
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
    gameUI:GameUI;

    start () {
        this.mainModel = new Model();
        this.gameUI = cc.find("Canvas/GameUIManager").getComponent(GameUI);
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
        var model = cc.instantiate(this.Models[this.sampleModel.skin]);
        model.position = this.ModelTemplate.position;
        this.node.parent.addChild(model);
        this.gameUI.mainModel = model;

        //Create grid items
        var itemList = []
        for(var i = 0; i < this.gameMode; i++)
        {           
            var setItem = cc.instantiate(this.SetItems[i]);
            this.itemLayoutPanel.addChild(setItem);
            
            itemList[i] = [];
            for(var j = 0; j < this.gameMode; j++) {     
                itemList[i][j] = new Feature(this.featuresType, i, this.sampleModel.skin % 3);
            }

            setItem.getComponent(SetItem).Init(itemList[i][0], 
                                                itemList[i][1],
                                                itemList[i][2],
                                                itemList[i][3],
                                                itemList[i][4]);
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
        return this.sampleModel.Compare(this.mainModel);
        //call UI to update result
    }

    // update (dt) {}     
}
