import GameLogicBase from "./GameLogicBase"
import {COLOR, FEATURE, HEADTYPE} from "./Define";
import Feature from "./Feature";
const {ccclass, property} = cc._decorator;
const LIFE = 13;

@ccclass
export default class GameUI extends cc.Component {
    mainModel: cc.Node;
    
    @property({type: [cc.Prefab]})
    IntroSkin = [];
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
    @property(cc.Button)
    NextButton: cc.Button = null
    @property(cc.Button)
    BackButton: cc.Button = null

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
        this.currentScrollOffset = cc.Vec2.ZERO;
    }

    OnPressedCheckButton () {
        var result = this.gameLogic.CheckResult();
        if(result == null)
            return;
        
        this.checkCount++;
        this.Green.string = result[0].toString();
        this.Red.string = result[1].toString();
        if(result[0] == 5) { 
            this.OnGameWin();
        }
        else {
            this.AddResultModel();
            if(this.checkCount > 6) {
                this.currentScrollOffset = (new cc.Vec2((this.checkCount - 6) * 140, 0));
                this.DoScroll();;
            }
            if(this.checkCount == LIFE)
                this.OnGameOver();
        }
        this.CheckActiveButtons();
    }

    AddResultModel() {
        var node = cc.instantiate(this.mainModel);
        node.scale = 0.33;
        node.y = -75;

        var green = cc.instantiate(this.Green.node);
        green.position = new cc.Vec3(node.x + 430, node.y + 170,0);
        var red = cc.instantiate(this.Red.node);
        red.position = new cc.Vec3(node.x + 430, node.y + 70, 0);
        green.scale = red.scale = 2.0;

        node.addChild(green);
        node.addChild(red);

        var content = this.ScrollView.node.getChildByName("viewport").getChildByName("content").getChildByName("LifeColor_" + this.checkCount);
        content.addChild(node);
        node.position = new cc.Vec3(-10 , -75, 0);
    }

    OnPressedNextButton() {
        if(this.checkCount > 6)
            if(this.currentScrollOffset.x < (this.checkCount - 6) * 140)
                this.currentScrollOffset = this.currentScrollOffset.add(new cc.Vec2(140, 0));
        this.DoScroll();
        this.CheckActiveButtons();
    }

    OnPressedBackButton() {
        if(this.currentScrollOffset > cc.Vec2.ZERO)
            this.currentScrollOffset = this.currentScrollOffset.subtract(new cc.Vec2(140, 0));
        this.DoScroll();
        this.CheckActiveButtons();
    }

    DoScroll() {
        this.ScrollView.horizontal = true;
        this.ScrollView.scrollToOffset(this.currentScrollOffset, 0.1);
    }

    CheckActiveButtons() {
        this.BackButton.node.active = this.currentScrollOffset > cc.Vec2.ZERO;
        this.NextButton.node.active = this.checkCount > 6 ? this.currentScrollOffset.x < (this.checkCount - 6) * 140? true : false : false;
    }

    OnGameWin () {
        var node = cc.instantiate(this.mainModel);
        cc.find("Canvas").addChild(node);
        this.SampleModel.active = false;
        node.position = this.SampleModel.position.subtract(new cc.Vec3(0 , 30 , 0));
        node.scale = 0.4;
        this.Curtain.getChildByName("img").getComponent(cc.Animation).play("CurtainOpen");
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
                child.getComponent(cc.Animation).play("Instantiate");
                break;
            }
            case FEATURE.EYES: {
                var child = this.mainModel.getChildByName("eyes");
                child.getComponent(cc.Sprite).spriteFrame = this.eyesList[feature.color];               
                child.active = true;
                var anim = child.getComponent(cc.Animation);
                anim.play("Instantiate");
                break;
            }
            case FEATURE.NOSE: {
                var child = this.mainModel.getChildByName("nose");
                child.getComponent(cc.Sprite).spriteFrame = this.NoseList[feature.color];
                child.active = true;
                child.getComponent(cc.Animation).play("Instantiate");
                break;
            }
            case FEATURE.MOUTH: {
                var child = this.mainModel.getChildByName("mouth");
                child.getComponent(cc.Sprite).spriteFrame = this.MouthList[feature.color];
                child.active = true;
                child.getComponent(cc.Animation).play("Instantiate");
                break;
            }
            case FEATURE.BODY: {
                var child = this.mainModel.getChildByName("body");
                child.getComponent(cc.Sprite).spriteFrame = this.BodyList[feature.color];
                child.active = true;
                child.getComponent(cc.Animation).play("Instantiate");
                break;
            }
        }
    }
    
    // PlayIntro() {
    //     var node = cc.instantiate(this.IntroSkin[this.gameLogic.sampleModel.skin]);
    //     node.scale = 0.4;
    //     cc.find("Canvas").addChild(node);
    //     node.position = this.SampleModel.position;
        
    //     var anim = this.Curtain.getChildByName("img").getComponent(cc.Animation);
    //     var animState = anim.getAnimationState('CurtainOpen');

    //     anim.on('finished', function(event) {
    //         console.log(event);
    //         console.log(event.detail);
    //         if(event.currentTarget == animState) {
    //             //anim.play('CurtainClose');
    //             console.log('finish');
    //         }
    //     });

    //     anim.play('CurtainOpen');
        
    //     //this.Curtain.getChildByName("img").getComponent(cc.Animation).on('finished', event() {})
    //     //this.Curtain.getChildByName("img").getComponent(cc.Animation).play("CurtainOpen", 1);
    // }

    // update (dt) {}
}
