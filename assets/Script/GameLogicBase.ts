const { ccclass, property } = cc._decorator;

import { Define as def } from "./Define";
import Feature, { Head, Eyes, Mouth, Body, Nose } from "./Feature";
import GameUI from "./GameUI";
import { Model } from "./Model";
import SetItem from "./SetItem";
import AudioController from "./AudioController";
@ccclass
export default class GameLogicBase extends cc.Component {
    @property({ type: cc.Node })
    ModelTemplate: cc.Node = null
    @property({ type: cc.Node })
    MysticalModel: cc.Node = null
    @property({ type: [cc.Prefab] })
    Models = []
    @property({ type: [cc.SpriteFrame] })
    MysticalModels = []
    @property({ type: [cc.Prefab] })
    SetItemsA = []
    @property({ type: [cc.Prefab] })
    SetItemsB = []
    @property({ type: cc.Node })
    itemLayoutPanel = null

    @property({ type: [cc.Node] })
    SmallShiningPoints = [];
    @property({ type: [cc.Node] })
    BigShiningPoints = [];

    audioController: AudioController;
    gameMode = def.GameMode.HARD;
    featuresType: def.TYPE;
    sampleModel: Model;
    mainModel: Model;
    result: number[];
    gameUI: GameUI;
    LIFE: number;
    guessedModel: Model[] = [];
    score: number;

    constructor() {
        super();
        window.addEventListener("message", (e) => {
            this.gameMode = e.data ? e.data : this.gameMode;
        });
        //cc.macro.ENABLE_TRANSPARENT_CANVAS = true;
    }

    start() {
        this.gameUI = cc.find("Canvas/GameUIManager").getComponent(GameUI);
        this.audioController = cc.find("Canvas/AudioController").getComponent(AudioController);
        switch (this.gameMode) {
            case def.GameMode.EASY:
            case def.GameMode.HARD:
                this.LIFE = 13;
                break;
            case def.GameMode.NORMAL:
                this.LIFE = 6;
                break;
        }
        cc.game.on(cc.game.EVENT_GAME_INITED, () => this.NewSection());
        cc.Camera.main.backgroundColor = new cc.Color(2, 57, 157, 255);
    }

    CreateSampleModel() {
        this.featuresType = this.getRandomArbitrary(0, def.TYPE.END);
        this.sampleModel = new Model(
            this.getRandomArbitrary(0, def.SKIN.END - 1),
            new Eyes(this.featuresType, this.getRandomArbitrary(0, this.gameMode)),
            new Nose(this.featuresType, this.getRandomArbitrary(0, this.gameMode)),
            new Mouth(this.featuresType, this.getRandomArbitrary(0, this.gameMode))
        );
        if (this.gameMode > def.GameMode.EASY)
            this.sampleModel.Update(null, null, null, new Head(this.featuresType,
                this.getRandomArbitrary(0, this.gameMode)));
        if (this.gameMode == def.GameMode.HARD)
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
        model.getComponent(cc.Animation).play("Instantiate");
        this.audioController.PlayGameStart();

        //Create grid items
        var itemList = [];
        for (var i = 0; i < this.gameMode; i++) {
            if (this.featuresType == def.TYPE.A)
                var setItem = cc.instantiate(this.SetItemsA[i]);
            else
                var setItem = cc.instantiate(this.SetItemsB[i]);
            this.itemLayoutPanel.addChild(setItem);
            setItem.getChildByName("decorate_" + this.gameMode.toString()).active = true;
            itemList[i] = [];
            for (var j = 0; j < this.gameMode; j++) {
                itemList[i][j] = new Feature(this.featuresType, i, this.sampleModel.skin % 3);
            }
            var headtype = itemList[i][0].headType;
            setItem.getComponent(SetItem).Init(itemList[i][0],
                itemList[i][1],
                itemList[i][2],
                itemList[i][3],
                itemList[i][4]);
            setItem.getChildByName("layout").getChildByName("HeadTemplate").active = itemList[i][3] == null ? false : true;
            setItem.getChildByName("layout").getChildByName("BodyTemplate").active = itemList[i][4] == null ? false : true;
        }
        this.gameUI.InitModelType(headtype);
        this.itemLayoutPanel.getComponent(cc.Layout).spacingX = 300 / this.gameMode;
    }

    NewSection() {
        this.CreateSampleModel();
        this.Intro();
    }

    Intro() {
        var anim = this.gameUI.Curtain.getChildByName("img").getComponent(cc.Animation);
        anim.play("CurtainOpen");
        this.audioController.PlayCurtainOpen();
        this.MysticalModel.getComponent(cc.Sprite).spriteFrame = this.MysticalModels[this.sampleModel.skin];
        this.MysticalModel.active = true;
        var delay = 4;

        anim.scheduleOnce(() => this.PlaySmallShiningPoints(0), 1.0);
        anim.scheduleOnce(() => this.PlaySmallShiningPoints(1), 1.3);
        anim.scheduleOnce(() => this.PlaySmallShiningPoints(2), 1.6);


        anim.scheduleOnce(this.CloseCurtain, delay);
        anim.scheduleOnce(() => this.Initialize(), delay - 1);

        anim.scheduleOnce(() => this.PlayBigShiningPoints(0), delay);
        anim.scheduleOnce(() => this.PlayBigShiningPoints(1), delay + 0.3);
        anim.scheduleOnce(() => this.PlayBigShiningPoints(2), delay + 0.6);
    }

    CloseCurtain = function () {
        this.getComponent(cc.Animation).play("CurtainClose");
    }

    PlaySmallShiningPoints(index: number) {
        var point = cc.instantiate(this.SmallShiningPoints[index]);
        this.node.parent.addChild(point);
        point.active = true;
        point.getComponent(cc.Animation).play("ShiningPoint");
    }

    PlayBigShiningPoints(index: number) {
        var point = cc.instantiate(this.BigShiningPoints[index]);
        this.node.parent.addChild(point);
        point.active = true;
        point.getComponent(cc.Animation).play("ShiningPoint");
    }

    UpdateModel(feature: Feature) {
        this.mainModel.Update(feature);
    }

    CheckResult() {
        var isDuplicate = false;
        if (!this.mainModel.IsValid(this.gameMode))
            return null;

        for (var i = 0; i < this.guessedModel.length; i++) {
            if (this.guessedModel[i].Compare(this.mainModel, this.gameMode)[0] == this.gameMode)
                isDuplicate = true;
        }
        if (isDuplicate)
            return null;

        var newModel = new Model();
        newModel.Clone(this.mainModel);
        this.guessedModel.push(newModel);
        return this.sampleModel.Compare(this.mainModel, this.gameMode);
    }

    OnGameOver(result: boolean) {
        this.score = (this.LIFE - this.gameUI.checkCount) * 100;
        var userData = cc.sys.localStorage.getItem('userData');
        if (userData == null || userData == undefined) {
            this.RegisterUserData();
            userData = JSON.parse(cc.sys.localStorage.getItem('userData'));
        }

        userData.Result = result ? "win" : "lose";
        userData.GameScore = this.score;
        userData.Guesses = this.gameUI.checkCount;
        userData.Hints = 0;
        userData.TotalGuessAndHint = userData.Guesses + userData.Hints;
        userData.LowGuessAndHintBonus = Math.min(0, 1500 - userData.TotalGuessAndHint * 100);
        userData.FinalScore = userData.GameScore + userData.LowGuessAndHintBonus;
        userData.HighScore = userData.HighScore > this.score ? userData.HighScore : this.score;
        userData.AvgGuess = (userData.AvgGuess * userData.GamesPlay + (this.LIFE - this.gameUI.checkCount)) / 3;
        userData.GamesPlay++;
        userData.GamesWon += result;
        userData.WinPercent = Math.ceil(userData.GamesWon / userData.GamesPlay);
        cc.sys.localStorage.setItem('userData', JSON.stringify(userData));

        //document.getElementsByTagName('iframe')[0].contentWindow.postMessage(JSON.stringify(userData), '*');
        window.parent.postMessage(userData, '*');
    }

    RegisterUserData() {
        var userData = {
            Result: "win",
            GameScore: 0,
            Guesses: 0,
            Hints: 0,
            TotalGuessAndHint: 0,
            LowGuessAndHintBonus: 0,
            FinalScore: 0,
            HighScore: 0,
            AvgGuess: 0,
            GamesPlay: 0,
            GamesWon: 0,
            WinPercent: 0,
        };
        cc.sys.localStorage.setItem('userData', JSON.stringify(userData));
    }
}
