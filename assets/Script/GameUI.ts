// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import GameLogicBase from "./GameLogicBase"
import {FEATURE} from "./Define";
import Feature from "./Feature";
const {ccclass, property} = cc._decorator;

@ccclass
export default class GameUI extends cc.Component {
    mainModel: cc.Node;

    @property({type: [cc.SpriteFrame]})
    HeadList = [];
    @property({type: [cc.SpriteFrame]})
    EyesList = [];
    @property({type: [cc.SpriteFrame]})
    NoseList = [];
    @property({type: [cc.SpriteFrame]})
    MouthList = [];
    @property({type: [cc.SpriteFrame]})
    BodyList = [];
    
    gameLogic: GameLogicBase; 
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.gameLogic = cc.find("Canvas/GameController").getComponent(GameLogicBase);
    }

    OnPressedCheckButton () {
        this.gameLogic.CheckResult();
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
            default: break;
        }
    }

    // update (dt) {}
}
