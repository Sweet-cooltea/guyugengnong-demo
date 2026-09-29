import { _decorator, Component, Label } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 全局游戏管理器
 * 单例，管理玩家等级、经验、货币、仓库物资、UI刷新、本地存档
 */
@ccclass('GameManager')
export class GameManager extends Component {
    static instance: GameManager | null = null;

    // ========= UI标签绑定（编辑器拖拽赋值） =========
    @property(Label)
    txtLevel: Label = null;

    @property(Label)
    txtExp: Label = null;

    @property(Label)
    txtCoin: Label = null;

    @property(Label)
    txtWarehouse: Label = null;

    @property(Label)
    txtFish: Label = null;

    @property(Label)
    txtBird: Label = null;

    // ========= 玩家数据 =========
    playerLv = 1;
    playerExp = 0;
    expNeed = 100; // 升级所需经验
    gold = 0;

    // 仓库物资
    wheat = 0;   // 粟米
    fish = 0;    // 鱼
    bird = 0;    // 捕获小鸟

    onLoad() {
        GameManager.instance = this;
        this.loadSaveData();
        this.refreshUI();
        console.log("GameManager 加载完成");
    }

    // ===================== 物资增减接口 =====================
    addWheat(num: number) {
        this.wheat += num;
        this.refreshUI();
        this.saveData();
    }
    reduceWheat(num: number): boolean {
        if (this.wheat >= num) {
            this.wheat -= num;
            this.refreshUI();
            this.saveData();
            return true;
        }
        return false;
    }

    addFish(num: number) {
        this.fish += num;
        this.refreshUI();
        this.saveData();
    }
    reduceFish(num: number): boolean {
        if (this.fish >= num) {
            this.fish -= num;
            this.refreshUI();
            this.saveData();
            return true;
        }
        return false;
    }

    addBird(num: number) {
        this.bird += num;
        this.refreshUI();
        this.saveData();
    }
    reduceBird(num: number): boolean {
        if (this.bird >= num) {
            this.bird -= num;
            this.refreshUI();
            this.saveData();
            return true;
        }
        return false;
    }

    // ===================== 经验与等级 =====================
    addExp(num: number) {
        this.playerExp += num;
        while (this.playerExp >= this.expNeed) {
            this.playerExp -= this.expNeed;
            this.playerLv++;
            this.expNeed = Math.floor(this.expNeed * 1.2);
            console.log(`升级！当前等级：${this.playerLv}`);
        }
        this.refreshUI();
        this.saveData();
    }

    // ===================== 货币 =====================
    addGold(num: number) {
        this.gold += num;
        this.refreshUI();
        this.saveData();
    }
    reduceGold(num: number): boolean {
        if (this.gold >= num) {
            this.gold -= num;
            this.refreshUI();
            this.saveData();
            return true;
        }
        return false;
    }

    // ===================== UI刷新 =====================
    refreshUI() {
        if (this.txtLevel) this.txtLevel.string = `等级：${this.playerLv}`;
        if (this.txtExp) this.txtExp.string = `经验：${this.playerExp}/${this.expNeed}`;
        if (this.txtCoin) this.txtCoin.string = `货币：${this.gold}`;
        if (this.txtWarehouse) this.txtWarehouse.string = `粟米：${this.wheat}`;
        if (this.txtFish) this.txtFish.string = `鱼：${this.fish}`;
        if (this.txtBird) this.txtBird.string = `小鸟：${this.bird}`;
    }

    // ===================== 本地存档（微信小游戏可用） =====================
    saveData() {
        const saveData = {
            playerLv: this.playerLv,
            playerExp: this.playerExp,
            expNeed: this.expNeed,
            gold: this.gold,
            wheat: this.wheat,
            fish: this.fish,
            bird: this.bird
        };
        localStorage.setItem("guyugengnong_save", JSON.stringify(saveData));
    }

    loadSaveData() {
        const saveStr = localStorage.getItem("guyugengnong_save");
        if (saveStr) {
            const data = JSON.parse(saveStr);
            this.playerLv = data.playerLv;
            this.playerExp = data.playerExp;
            this.expNeed = data.expNeed;
            this.gold = data.gold;
            this.wheat = data.wheat;
            this.fish = data.fish;
            this.bird = data.bird;
            console.log("读取存档成功");
        } else {
            console.log("无存档，新游戏");
        }
    }
}
