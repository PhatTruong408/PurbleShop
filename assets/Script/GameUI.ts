import GameLogicBase from "./GameLogicBase"
import { Define as def } from "./Define";
import Feature from "./Feature";
import SetItem from "./SetItem";
const { ccclass, property } = cc._decorator;

@ccclass
export default class GameUI extends cc.Component {
    mainModel: cc.Node;

    @property({ type: [cc.Prefab] })
    IntroSkin = [];
    @property({ type: [cc.SpriteFrame] })
    RoundHeadList = [];
    @property({ type: [cc.SpriteFrame] })
    RoundHeadList2 = [];
    @property({ type: [cc.SpriteFrame] })
    ConeHeadList = [];
    @property({ type: [cc.SpriteFrame] })
    ConeHeadList2 = [];
    @property({ type: [cc.SpriteFrame] })
    HeartHeadList = [];
    @property({ type: [cc.SpriteFrame] })
    HeartHeadList2 = [];
    @property({ type: [cc.SpriteFrame] })
    WideEyesList = [];
    @property({ type: [cc.SpriteFrame] })
    CloseEyesList = [];
    @property({ type: [cc.SpriteFrame] })
    NoseList = [];
    @property({ type: [cc.SpriteFrame] })
    MouthList = [];
    @property({ type: [cc.SpriteFrame] })
    BodyList = [];
    @property({ type: cc.ScrollView })
    ScrollView: cc.ScrollView = null

    @property(cc.Node)
    Green: cc.Node = null
    @property(cc.Node)
    Red: cc.Node = null
    @property({ type: cc.Node })
    ParticleEffect: cc.Node = null

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

    start() {
        this.gameLogic = cc.find("Canvas/GameController").getComponent(GameLogicBase);
        this.checkCount = 0;
        this.currentScrollOffset = cc.Vec2.ZERO;
    }

    OnPressedCheckButton() {
        this.gameLogic.audioController.PlayButtonTap();
        var result = this.gameLogic.CheckResult();
        if (result == null)
            return;
        this.Green.active = true;
        this.checkCount++;
        switch (this.gameLogic.gameMode) {
            case def.GameMode.EASY:
            case def.GameMode.NORMAL:
                this.Red.active = false;
                this.Green.getChildByName("number").getComponent(cc.Label).string = result[0].toString();
                break;
            case def.GameMode.HARD:
                this.Red.active = true;
                this.Green.getChildByName("number").getComponent(cc.Label).string = result[0].toString();
                this.Red.getChildByName("number").getComponent(cc.Label).string = result[1].toString();
                break;
        }
        if (result[0] == this.gameLogic.gameMode) {
            this.gameLogic.audioController.PlayGameWin();
            this.OnGameWin();
        }
        else {
            this.AddResultModel();
            if (this.checkCount > 6) {
                this.currentScrollOffset = (new cc.Vec2((this.checkCount - 6) * 140, 0));
                this.DoScroll();
            }
            if (this.checkCount == this.gameLogic.LIFE) {
                this.gameLogic.audioController.PlayGameLose();
                this.OnGameOver(false);
            }
        }
        this.CheckActiveButtons();
    }

    AddResultModel() {
        var node = cc.instantiate(this.mainModel);
        node.scale = 0.33;
        node.y = -75;

        switch (this.gameLogic.gameMode) {
            case def.GameMode.EASY:
            case def.GameMode.NORMAL:
                var green = cc.instantiate(this.Green.getChildByName("number"));
                green.position = new cc.Vec3(node.x + 430, node.y + 170, 0);
                green.scale = 2.0;
                node.addChild(green);
            case def.GameMode.HARD:
                var green = cc.instantiate(this.Green.getChildByName("number"));
                green.position = new cc.Vec3(node.x + 430, node.y + 170, 0);
                var red = cc.instantiate(this.Red.getChildByName("number"));
                red.position = new cc.Vec3(node.x + 430, node.y + 70, 0);
                green.scale = red.scale = 2.0;
                node.addChild(green);
                node.addChild(red);
                break;
        }

        var content = this.ScrollView.node.getChildByName("viewport").getChildByName("content").getChildByName("LifeColor_" + this.checkCount);
        content.addChild(node);
        node.position = new cc.Vec3(-10, -75, 0);
    }

    OnPressedNextButton() {
        this.gameLogic.audioController.PlayButtonTap();
        if (this.checkCount > 6)
            if (this.currentScrollOffset.x < (this.checkCount - 6) * 140)
                this.currentScrollOffset = this.currentScrollOffset.add(new cc.Vec2(140, 0));
        this.DoScroll();
        this.CheckActiveButtons();
    }

    OnPressedBackButton() {
        this.gameLogic.audioController.PlayButtonTap();
        if (this.currentScrollOffset > cc.Vec2.ZERO)
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
        this.NextButton.node.active = this.checkCount > 6 ? this.currentScrollOffset.x < (this.checkCount - 6) * 140 ? true : false : false;
    }

    OnGameWin() {
        var node = cc.instantiate(this.mainModel);
        cc.find("Canvas").addChild(node);
        this.SampleModel.active = false;
        node.position = this.SampleModel.position.subtract(new cc.Vec3(0, 30, 0));
        node.scale = 0.4;
        this.Curtain.getChildByName("img").getComponent(cc.Animation).play("CurtainOpen");

        var particle = cc.instantiate(this.ParticleEffect);
        this.node.parent.addChild(particle);
        particle.active = true;

        cc.tween(particle)
            .to(0.5, { position: cc.v3(-145, -100, 0) })
            .to(1, { position: cc.v3(-300, 55, 0) })
            .to(1.5, { position: cc.v3(-100, 150, 0) })
            .to(2, { position: cc.v3(-200, 200, 0), opacity: 0 })
            .call(() => this.OnGameOver(true))
            .start();
    }

    OnGameOver(result: boolean) {
        this.gameLogic.OnGameOver(result);
    }

    InitSetItems(setItem, index: number) {
        setItem.getChildByName("layout").getChildByName("EyesTemplate").getComponent(cc.Sprite).spriteFrame = this.eyesList[index];
        setItem.getChildByName("layout").getChildByName("NoseTemplate").getComponent(cc.Sprite).spriteFrame = this.NoseList[index];
        setItem.getChildByName("layout").getChildByName("MouthTemplate").getComponent(cc.Sprite).spriteFrame = this.MouthList[index];
        setItem.getChildByName("layout").getChildByName("HeadTemplate").getComponent(cc.Sprite).spriteFrame = this.headList[index];
        setItem.getChildByName("layout").getChildByName("BodyTemplate").getComponent(cc.Sprite).spriteFrame = this.BodyList[index];
    }

    InitModelType(headtype: def.HEADTYPE) {
        switch (headtype) {
            case def.HEADTYPE.ROUND:
                this.headList = this.gameLogic.featuresType ? this.RoundHeadList2 : this.RoundHeadList;
                this.eyesList = this.CloseEyesList;
                break;
            case def.HEADTYPE.CONE:
                this.headList = this.gameLogic.featuresType ? this.ConeHeadList2 : this.ConeHeadList;
                this.eyesList = this.CloseEyesList;
                break;
            case def.HEADTYPE.HEART:
                this.headList = this.gameLogic.featuresType ? this.HeartHeadList2 : this.HeartHeadList;
                this.eyesList = this.WideEyesList;
                break;
        }
    }

    UpdateMainModel(id: def.FEATURE, feature: Feature) {
        switch (id) {
            case def.FEATURE.EYES: {
                var child = this.mainModel.getChildByName("eyes");
                child.getComponent(cc.Sprite).spriteFrame = this.eyesList[feature.color];
                child.active = true;
                var anim = child.getComponent(cc.Animation);
                anim.play("Instantiate");
                break;
            }
            case def.FEATURE.NOSE: {
                var child = this.mainModel.getChildByName("nose");
                child.getComponent(cc.Sprite).spriteFrame = this.NoseList[feature.color];
                child.active = true;
                child.getComponent(cc.Animation).play("Instantiate");
                break;
            }
            case def.FEATURE.MOUTH: {
                var child = this.mainModel.getChildByName("mouth");
                child.getComponent(cc.Sprite).spriteFrame = this.MouthList[feature.color];
                child.active = true;
                child.getComponent(cc.Animation).play("Instantiate");
                break;
            }
            case def.FEATURE.HEAD: {
                if (this.gameLogic.gameMode > def.GameMode.EASY) {
                    var child = this.mainModel.getChildByName("head");
                    child.getComponent(cc.Sprite).spriteFrame = this.headList[feature.color];
                    child.y = this.gameLogic.featuresType ? 165 : feature.color == def.COLOR.GREEN ? 190 : 178;
                    if (this.gameLogic.sampleModel.skin == def.SKIN.YELLOW_2)
                        if (feature.color == def.COLOR.PURPLE)
                            child.y = 160;
                        else if (feature.color == def.COLOR.GREEN)
                            child.y = 185;
                    child.active = true;
                    child.getComponent(cc.Animation).play("Instantiate");
                }
                break;
            }
            case def.FEATURE.BODY: {
                if (this.gameLogic.gameMode > def.GameMode.NORMAL) {
                    var child = this.mainModel.getChildByName("body");
                    child.getComponent(cc.Sprite).spriteFrame = this.BodyList[feature.color];
                    child.active = true;
                    child.getComponent(cc.Animation).play("Instantiate");
                }
                break;
            }
        }
    }
}
