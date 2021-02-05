// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import GameLogicBase from "./GameLogicBase"
import {FEATURE, HEADTYPE} from "./Define";
import Feature from "./Feature";
const {ccclass, property} = cc._decorator;

@ccclass
export default class GameUI extends cc.Component {
    mainModel: cc.Node;

    @property({type: [cc.SpriteFrame]})
    RoundHeadList = [];
    @property({type: [cc.SpriteFrame]})
    ConeHeadList = [];
    @property({type: [cc.SpriteFrame]})
    HeartHeadList = [];
    @property({type: [cc.SpriteFrame]})
    WideEyesList = [];
    @property({type: [cc.SpriteFrame]})
    CloseEyesList = [];
    @property({type: [cc.SpriteFrame]})
    NoseList = [];
    @property({type: [cc.SpriteFrame]})
    MouthList = [];
    @property({type: [cc.SpriteFrame]})
    BodyList = [];

    @property(cc.Label)
    Green: cc.Label = null
    @property(cc.Label)
    Red: cc.Label = null
    @property(cc.Node)
    Curtain: cc.Node = null
    @property(cc.Node)
    SampleModel: cc.Node = null

    gameLogic: GameLogicBase;
    HeadList: cc.SpriteFrame[];
    EyesList: cc.SpriteFrame[];
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.gameLogic = cc.find("Canvas/GameController").getComponent(GameLogicBase);
    }

    OnPressedCheckButton () {
        var result = this.gameLogic.CheckResult();
        this.Green.string = result[0].toString();
        this.Red.string = result[1].toString();
        if(result[0] == 5) { 
            this.OnGameWin();
        }
        else {
            var node = cc.instantiate(this.mainModel);
            node.scale = 0.35;
            node.y = -20;
            var green = cc.instantiate(this.Green.node);
            green.position = new cc.Vec3(node.x + 400, node.y + 120,0);
            var red = cc.instantiate(this.Red.node);
            red.position = new cc.Vec3(node.x + 400, node.y + 20, 0);
            green.scale = red.scale = 1.7;
            node.addChild(green);
            node.addChild(red);
            cc.find("Canvas/SlideShow").addChild(node);
        }            
    }

    OnGameWin () {
        var node = cc.instantiate(this.mainModel);
        node.scale = 0.5;
        cc.find("Canvas").addChild(node);
        node.position = this.SampleModel.position;
        this.Curtain.getChildByName("img").getComponent(cc.Animation).play();
    }

    InitModelType (headtype:HEADTYPE) {
        switch (headtype) {
            case HEADTYPE.ROUND:
                this.HeadList = this.RoundHeadList;
                this.EyesList = this.CloseEyesList;
                break;
            case HEADTYPE.CONE:
                this.HeadList = this.ConeHeadList;
                this.EyesList = this.CloseEyesList;
                break;
            case HEADTYPE.HEART:
                this.HeadList = this.HeartHeadList;
                this.EyesList = this.WideEyesList;
                break;
        }
    }

    UpdateMainModel (id:FEATURE, feature:Feature) {
        switch (id) {
            case FEATURE.HEAD: {
                var child = this.mainModel.getChildByName("head");
                child.getComponent(cc.Sprite).spriteFrame = this.HeadList[feature.color];
                child.active = true;
                break;
            }
            case FEATURE.EYES: {
                var child = this.mainModel.getChildByName("eyes");
                child.getComponent(cc.Sprite).spriteFrame = this.EyesList[feature.color];
                child.active = true;
                break;
            }
            case FEATURE.NOSE: {
                var child = this.mainModel.getChildByName("nose");
                child.getComponent(cc.Sprite).spriteFrame = this.NoseList[feature.color];
                child.active = true;
                break;
            }
            case FEATURE.MOUTH: {
                var child = this.mainModel.getChildByName("mouth");
                child.getComponent(cc.Sprite).spriteFrame = this.MouthList[feature.color];
                child.active = true;
                break;
            }
            case FEATURE.BODY: {
                var child = this.mainModel.getChildByName("body");
                child.getComponent(cc.Sprite).spriteFrame = this.BodyList[feature.color];
                child.active = true;
                break;
            }
        }
    }

    // update (dt) {}
}
