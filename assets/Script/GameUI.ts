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

    @property(cc.Prefab)
    mainModel = null;

    @property
    text: string = 'hello';

    gameLogic: GameLogicBase; 
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.gameLogic = cc.find("Canvas/GameController").getComponent(GameLogicBase);
    }

    OnPressedCheckButton () {
        this.gameLogic.CheckResult();
    }

    UpdateMainModel (id:FEATURE, value:Feature) {
        switch (id) {
            case FEATURE.HEAD: {
                break;
            }
            case FEATURE.EYES: {
                break;
            }
            case FEATURE.NOSE: {
                break;
            }
            case FEATURE.MOUTH: {
                break
            }
            case FEATURE.BODY: {
                break;
            }
            default: break;
        }
    }

    // update (dt) {}
}
