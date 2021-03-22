const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property({type: [cc.AudioClip]})
    audioClips = [];

    PlayCurtainOpen() {
        cc.audioEngine.play(this.audioClips[0], false, 1);
    }
    PlayGameStart() {
        cc.audioEngine.play(this.audioClips[1], false, 1);
    }
    PlayGameLose() {
        cc.audioEngine.play(this.audioClips[2], false, 1);
    }
    PlayButtonTap() {
        cc.audioEngine.play(this.audioClips[3], false, 1);
    }
    PlayGameWin() {
        cc.audioEngine.play(this.audioClips[4], false, 1);
    }
}
