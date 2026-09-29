import { _decorator, Component, Node, Prefab, instantiate, find } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 农田管理器
 * 负责生成4*4地块网格，管理地块预制体实例
 * 地块统一挂在 Canvas 下的 GardenLayer 农田层，与 UI 面板分层，避免互相遮挡
 */
@ccclass('GardenManager')
export class GardenManager extends Component {
    @property(Prefab)
    landPrefab: Prefab = null;

    // 网格配置
    private readonly RowCount = 4;
    private readonly ColCount = 4;
    private readonly CellSize = 120;

    start() {
        this.createGrid();
    }

    /**
     * 生成农田网格
     */
    createGrid() {
        const canvas = find("Canvas");
        if (!this.landPrefab || !canvas) {
            console.warn("landPrefab或者Canvas为空！请检查预制体绑定");
            return;
        }

        // 获取（或创建）农田层节点，地块都挂在这里，与 UI 面板分层
        let gardenLayer = canvas.getChildByName("GardenLayer");
        if (!gardenLayer) {
            gardenLayer = new Node("GardenLayer");
            canvas.addChild(gardenLayer);
        }

        for (let r = 0; r < this.RowCount; r++) {
            for (let c = 0; c < this.ColCount; c++) {
                const landNode = instantiate(this.landPrefab);
                landNode.setParent(gardenLayer);   // ← 挂到农田层，不再直接挂 Canvas
                // 坐标计算，网格居中
                const x = c * this.CellSize - this.ColCount * this.CellSize / 2;
                const y = -r * this.CellSize + this.RowCount * this.CellSize / 2;
                landNode.setPosition(x, y, 0);
            }
        }
    }
}