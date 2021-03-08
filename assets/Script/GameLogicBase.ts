const {ccclass, property} = cc._decorator;
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
    @property({type: cc.Node})
    MysticalModel: cc.Node = null
    @property({type: [cc.Prefab]})
    Models = []
    @property({type: [cc.SpriteFrame]})
    MysticalModels = []
    @property({type: [cc.Prefab]})
    SetItems = []
    @property ({type: cc.Node})
    itemLayoutPanel = null

    @property({type: [cc.Node]})
    SmallShiningPoints = [];
    @property({type: [cc.Node]})
    BigShiningPoints = [];

    gameMode = HARD;
    featuresType:TYPE;
    sampleModel:Model;
    mainModel:Model;
    result:number[];
    gameUI:GameUI;

    start () {
        this.gameUI = cc.find("Canvas/GameUIManager").getComponent(GameUI);
        cc.game.on(cc.game.EVENT_GAME_INITED, () => this.NewSection());
    }

    CreateSampleModel() {
        this.featuresType = this.getRandomArbitrary(0, TYPE.END);

        this.sampleModel = new Model(
            this.getRandomArbitrary(0, SKIN.END - 1),       
            new Eyes(this.featuresType, this.getRandomArbitrary(0, this.gameMode)),
            new Nose(this.featuresType, this.getRandomArbitrary(0, this.gameMode)),     
            new Mouth(this.featuresType, this.getRandomArbitrary(0, this.gameMode))
        );
        if(this.gameMode >= NORMAL)
            this.sampleModel.Update(null, null, null, new Head(this.featuresType, 
                                                            this.getRandomArbitrary(0, this.gameMode)));
        if(this.gameMode == HARD)
            this.sampleModel.Update(null, null, null, null, new Body(this.featuresType, 
                                                            this.getRandomArbitrary(0, this.gameMode)));
        
        this.mainModel = new Model();
    }

    getRandomArbitrary(min: number, max: number) { // max excluded 
        return Math.floor(Math.random() * (max - min) + min);
    }
      
    Initialize() {
        //Create model object
        var model = cc.instantiate(this.Models[this.sampleModel.skin]);
        model.position = this.ModelTemplate.position;
        this.node.parent.addChild(model);
        this.gameUI.mainModel = model;
        model.getComponent(cc.Animation).play("Instantiate")

        //Create grid items
        var itemList = []
        for(var i = 0; i < this.gameMode; i++)
        {           
            var setItem = cc.instantiate(this.SetItems[i]);
            this.itemLayoutPanel.addChild(setItem);
            setItem.getChildByName("decorate_" + this.gameMode.toString()).active = true;
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
        this.itemLayoutPanel.getComponent(cc.Layout).spacingX = 300 / this.gameMode;
    }

    NewSection() {
        this.CreateSampleModel();
        this.Intro();
    }

    Intro() {
        var anim = this.gameUI.Curtain.getChildByName("img").getComponent(cc.Animation);
        anim.play("CurtainOpen");
        this.MysticalModel.getComponent(cc.Sprite).spriteFrame = this.MysticalModels[this.sampleModel.skin];
        this.MysticalModel.active = true;
        var delay = 4;

        anim.scheduleOnce(() => this.PlaySmallShiningPoints, 1);
        anim.scheduleOnce(this.CloseCurtain, delay);
        anim.scheduleOnce(() => this.Initialize(), delay - 1);
        anim.scheduleOnce(() => this.PlayBigShiningPoints(), delay);
    }

    CloseCurtain = function () {
        this.getComponent(cc.Animation).play("CurtainClose");
    }

    PlaySmallShiningPoints() {
        this. SmallShiningPoints.forEach((point) => {
            point.getComponent(cc.Animation).play("ShiningPoint");
        })
    }

    PlayBigShiningPoints() {
        this.BigShiningPoints.forEach((point) => {
            point.getComponent(cc.Animation).play("ShiningPoint");
        })
    }

    UpdateModel(feature:Feature) {
        this.mainModel.Update(feature);
    }
    
    CheckResult() {
        return this.sampleModel.Compare(this.mainModel);
    }  
}
