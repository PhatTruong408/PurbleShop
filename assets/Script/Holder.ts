// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Button)
    button: cc.Button = null;

    @property(cc.Sprite)
    spriteTrue: cc.Sprite = null;

    @property(cc.Sprite)
    spriteFalse: cc.Sprite = null;

    OnButtonPressed() {
        var spriteTrue = this.spriteTrue.node.active;
        var spriteFalse = this.spriteFalse.node.active;
        if(spriteTrue || spriteFalse)
            this.spriteFalse.node.active = !this.spriteFalse.node.active;
        if(!spriteFalse)
            this.spriteTrue.node.active = !this.spriteTrue.node.active;
    }
}
