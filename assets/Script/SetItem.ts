import GameLogicBase from "./GameLogicBase"
import Feature, { Head, Eyes, Mouth, Body, Nose } from "./Feature";
import GameUI from "./GameUI"
import { FEATURE } from "./Define";
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

    Init(head:Head = null, eyes:Eyes = null, nose:Nose = null, mouth:Mouth = null, body:Body = null) {
        this.head = head;
        this.eyes = eyes;
        this.nose = nose;
        this.mouth = mouth;
        this.body = body;
        
        this.gameLogic = cc.find("Canvas/GameController").getComponent(GameLogicBase);
        this.gameUI = cc.find("Canvas/GameUIManager").getComponent(GameUI);
        this.gameUI.InitModelType(this.head.headType);
    }

    EyesClicked() {
        this.gameLogic.mainModel.Update(this.eyes, null, null, null, null);
        this.gameUI.UpdateMainModel(FEATURE.EYES, this.eyes);
        console.log("EyesClicked: color: " + this.eyes.color.toString());
    }

    NoseClicked() {
        this.gameLogic.mainModel.Update(null, this.eyes, null, null, null);
        this.gameUI.UpdateMainModel(FEATURE.NOSE, this.nose);
        console.log("NoseClicked: color: " + this.nose.color.toString());
    }

    MouthClicked() {
        this.gameLogic.mainModel.Update(null, null, this.mouth, null, null);
        this.gameUI.UpdateMainModel(FEATURE.MOUTH, this.mouth);
        console.log("MouthClicked: color: " + this.mouth.color.toString());
    }

    HeadClicked() {
        this.gameLogic.mainModel.Update(null, null, null, this.head, null);
        this.gameUI.UpdateMainModel(FEATURE.HEAD, this.head);
        console.log("HeadClicked: color: " + this.head.color.toString());
    }

    BodyClicked() {
        this.gameLogic.mainModel.Update(null, null, null, null, this.body);
        this.gameUI.UpdateMainModel(FEATURE.BODY, this.body);
        console.log("BodyClicked: color: " + this.body.color.toString());
    }
}
