import { _decorator, Component, Label, Button, Node, find,instantiate } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

/**
 * 售卖NPC：粮仓交易面板
 * 挂在"MarketNode"节点上，负责把粟米换成古币
 */
@ccclass('MarketManager')
export class MarketManager extends Component {
    // 交易面板节点（默认隐藏，点击商人弹出）
    @property(Node)
    marketPanel: Node = null;

    // 界面标签
    @property(Label)
    txtWheat: Label = null;          // 当前粟米数
    @property(Label)
    txtCoin: Label = null;           // 当前古币数
    @property(Label)
    txtInfo: Label = null;           // 交易结果提示

    private _pricePerWheat = 5;      // 每单位粟米价格

    onLoad() {
        // 面板默认隐藏
        if (this.marketPanel) this.marketPanel.active = false;
        // 定时刷新面板数值
        this.schedule(this.refreshUI, 0.5);
    }

    // 打开商人面板
    openMarket() {
    if (this.marketPanel) {
        this.marketPanel.active = true;
        this.marketPanel.setPosition(0, 0, 0);
        const canvas = find("Canvas");
        if (canvas) canvas.addChild(this.marketPanel);  // 提到最上层
    }
    this.refreshUI();
    }   

    // 关闭商人面板
    closeMarket() {
        if (this.marketPanel) this.marketPanel.active = false;
    }

    // 卖出按钮：卖全部粟米
    onSellAll() {
        const gm = GameManager.instance;
        if (!gm || gm.wheat <= 0) {
            if (this.txtInfo) this.txtInfo.string = "仓库没有粟米可卖";
            return;
        }
        const coin = gm.sellWheat(gm.wheat, this._pricePerWheat);
        if (this.txtInfo) this.txtInfo.string = `卖出全部，获得 ${coin} 古币`;
        this.refreshUI();
    }

    // 卖出按钮：卖固定5单位
    onSellFive() {
        const gm = GameManager.instance;
        if (!gm || gm.wheat < 5) {
            if (this.txtInfo) this.txtInfo.string = "粟米不足5个";
            return;
        }
        const coin = gm.sellWheat(5, this._pricePerWheat);
        if (this.txtInfo) this.txtInfo.string = `卖出5粟米，获得 ${coin} 古币`;
        this.refreshUI();
    }

    // 刷新面板显示
    refreshUI() {
        const gm = GameManager.instance;
        if (!gm) return;
        if (this.txtWheat) this.txtWheat.string = `粟米：${gm.wheat}`;
        if (this.txtCoin) this.txtCoin.string = `古币：${gm.gold}`;
    }
}