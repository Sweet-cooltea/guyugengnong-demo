import { _decorator, Component, Sprite, SpriteFrame, Node, Prefab } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

// 地块状态枚举
export enum LandState {
    EMPTY,     // 空地
    GROWING,   // 生长中
    DONE       // 成熟收获
}

@ccclass('LandItem')
export class LandItem extends Component {
    @property(SpriteFrame)
    emptySprite: SpriteFrame | null = null;

    @property(SpriteFrame)
    growSprite: SpriteFrame | null = null;

    @property(SpriteFrame)
    doneSprite: SpriteFrame | null = null;

    private _state: LandState = LandState.EMPTY;
    private _sprite: Sprite | null = null;
    private _growTimer: number = 0;

    onLoad() {
        this._sprite = this.getComponent(Sprite);
        this.updateSprite();
        // 绑定点击事件
        this.node.on(Node.EventType.TOUCH_END, this.onClickLand, this);
    }

    onDestroy() {
        // 【重要】销毁节点时移除事件监听，防止重复触发
        this.node.off(Node.EventType.TOUCH_END, this.onClickLand, this);
    }

    // 点击地块
    onClickLand() {
        if (!GameManager.instance) {
            console.warn("GameManager还未加载！");
            return;
        }

        switch (this._state) {
            case LandState.EMPTY:
                // 空地播种
                this._state = LandState.GROWING;
                this._growTimer = 10; // 10秒成熟，测试用
                console.log("播种成功，开始生长");
                this.updateSprite();
                break;
            case LandState.GROWING:
                console.log("作物还在生长中，请等待");
                break;
            case LandState.DONE:
                // 收获：粟米 + 经验
                this._state = LandState.EMPTY;
                GameManager.instance.addWheat(5);  // 收获5个粟米
                GameManager.instance.addExp(30);   // 收获30经验
                console.log("收获作物，获得5粟米 +30经验");
                this.updateSprite();
                break;
        }
    }

    update(deltaTime: number) {
        if (this._state === LandState.GROWING) {
            this._growTimer -= deltaTime;
            if (this._growTimer <= 0) {
                this._state = LandState.DONE;
                console.log("🎉作物成熟！可以收获");
                this.updateSprite();
            }
        }
    }

    // 切换地块图片
    updateSprite() {
        if (!this._sprite) return;
        switch (this._state) {
            case LandState.EMPTY:
                this._sprite.spriteFrame = this.emptySprite;
                break;
            case LandState.GROWING:
                this._sprite.spriteFrame = this.growSprite;
                break;
            case LandState.DONE:
                this._sprite.spriteFrame = this.doneSprite;
                break;
        }
    }
}
