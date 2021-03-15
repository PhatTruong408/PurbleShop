import GameLogicBase from "./GameLogicBase"
import { Head, Eyes, Mouth, Body, Nose } from "./Feature";
import GameUI from "./GameUI"
import { Define as def } from "./Define";
const {ccclass, property} = cc._decorator;

@ccclass
export default class SetItem extends cc.Component{

    head: Head
    eyes: Eyes
    nose: Nose
    mouth: Mouth
    body: Body

    gameLogic:GameLogicBase;
    gameUI:GameUI;

    resourcePath:string;

    Init(eyes:Eyes = null, nose:Nose = null, mouth:Mouth = null, head:Head = null, body:Body = null) {  
        this.eyes = eyes;
        this.nose = nose;
        this.mouth = mouth;
        this.head = head;
        this.body = body;
        
        this.gameLogic = cc.find("Canvas/GameController").getComponent(GameLogicBase);
        this.gameUI = cc.find("Canvas/GameUIManager").getComponent(GameUI);
        this.gameUI.InitModelType(this.eyes.headType);
    }

    EyesClicked() {
        this.gameLogic.mainModel.Update(this.eyes, null, null, null, null);
        this.gameUI.UpdateMainModel(def.FEATURE.EYES, this.eyes);
    }

    NoseClicked() {
        this.gameLogic.mainModel.Update(null, this.eyes, null, null, null);
        this.gameUI.UpdateMainModel(def.FEATURE.NOSE, this.nose);
    }

    MouthClicked() {
        this.gameLogic.mainModel.Update(null, null, this.mouth, null, null);
        this.gameUI.UpdateMainModel(def.FEATURE.MOUTH, this.mouth);
    }

    HeadClicked() {
        this.gameLogic.mainModel.Update(null, null, null, this.head, null);
        this.gameUI.UpdateMainModel(def.FEATURE.HEAD, this.head);
    }

    BodyClicked() {
        this.gameLogic.mainModel.Update(null, null, null, null, this.body);
        this.gameUI.UpdateMainModel(def.FEATURE.BODY, this.body);
    }
}
