import GameLogicBase from "./GameLogicBase"
import {COLOR, FEATURE, HEADTYPE} from "./Define";
import Feature from "./Feature";
const {ccclass, property} = cc._decorator;
const LIFE = 13;

@ccclass
export default class GameUI extends cc.Component {
    mainModel: cc.Node;

    @property({type: [cc.SpriteFrame]})
    RoundHeadList = [];
    @property({type: [cc.SpriteFrame]})
    RoundHeadList2 = [];
    @property({type: [cc.SpriteFrame]})
    ConeHeadList = [];
    @property({type: [cc.SpriteFrame]})
    ConeHeadList2 = [];
    @property({type: [cc.SpriteFrame]})
    HeartHeadList = [];
    @property({type: [cc.SpriteFrame]})
    HeartHeadList2 = [];
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
    @property({type: cc.ScrollView})
    ScrollView: cc.ScrollView = null

    @property(cc.Label)
    Green: cc.Label = null
    @property(cc.Label)
    Red: cc.Label = null
    @property(cc.Node)
    Curtain: cc.Node = null
    @property(cc.Node)
    SampleModel: cc.Node = null

    gameLogic: GameLogicBase;
    headList: cc.SpriteFrame[];
    eyesList: cc.SpriteFrame[];
    checkCount: number;
    currentScrollOffset: cc.Vec2;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.gameLogic = cc.find("Canvas/GameController").getComponent(GameLogicBase);
        this.checkCount = 0;
    }

    OnPressedCheckButton () {
        this.checkCount++;
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

            var content = this.ScrollView.node.getChildByName("viewport").getChildByName("content");
            content.addChild(node);
            
            if(this.checkCount > 5)
                this.ScrollView.scrollToRight(0.1);
            this.currentScrollOffset = this.ScrollView.getMaxScrollOffset();
            if(this.checkCount == LIFE)
                this.OnGameOver();
        }            
    }

    OnPressedNextButton() {
        if(this.currentScrollOffset < this.ScrollView.getMaxScrollOffset())
            this.currentScrollOffset = this.currentScrollOffset.add(new cc.Vec2(140, 0));
        this.ScrollView.scrollToOffset(this.currentScrollOffset, 0.1);
    }

    OnPressedBackButton() {
        if(this.currentScrollOffset > cc.Vec2.ZERO)
            this.currentScrollOffset = this.currentScrollOffset.subtract(new cc.Vec2(140, 0));
        this.ScrollView.scrollToOffset(this.currentScrollOffset, 0.1);
    }

    OnGameWin () {
        var node = cc.instantiate(this.mainModel);
        node.scale = 0.5;
        cc.find("Canvas").addChild(node);
        node.position = this.SampleModel.position;
        this.Curtain.getChildByName("img").getComponent(cc.Animation).play("CurtainOpen", 1);
    }

    OnGameOver() {
        cc.game.restart();
    }

    InitModelType (headtype:HEADTYPE) {
        switch (headtype) {
            case HEADTYPE.ROUND:
                this.headList = this.gameLogic.featuresType? this.RoundHeadList2 : this.RoundHeadList;
                this.eyesList = this.CloseEyesList;
                break;
            case HEADTYPE.CONE:
                this.headList = this.gameLogic.featuresType? this.ConeHeadList2 : this.ConeHeadList;
                this.eyesList = this.CloseEyesList;
                break;
            case HEADTYPE.HEART:
                this.headList = this.gameLogic.featuresType? this.HeartHeadList2 : this.HeartHeadList;
                this.eyesList = this.WideEyesList;
                break;
        }
    }

    UpdateMainModel (id:FEATURE, feature:Feature) {
        switch (id) {
            case FEATURE.HEAD: {
                var child = this.mainModel.getChildByName("head");
                child.getComponent(cc.Sprite).spriteFrame = this.headList[feature.color];
                child.y = this.gameLogic.featuresType? 165 : feature.color == COLOR.GREEN? 190 : 178;
                child.active = true;
                break;
            }
            case FEATURE.EYES: {
                var child = this.mainModel.getChildByName("eyes");
                child.getComponent(cc.Sprite).spriteFrame = this.eyesList[feature.color];               
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
