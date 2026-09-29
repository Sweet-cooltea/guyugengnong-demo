import { _decorator, Component, Node, instantiate, find } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 农田管理器
 * 负责生成4*4地块网格，管理地块预制体实例
 */
@ccclass('GardenManager')
export class GardenManager extends Component {
    @property(Node)
    landPrefab: Node = null;

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

        for (let r = 0; r < this.RowCount; r++) {
            for (let c = 0; c < this.ColCount; c++) {
                const landNode = instantiate(this.landPrefab);
                landNode.setParent(canvas);
                // 坐标计算，网格居中
                const x = c * this.CellSize - this.ColCount * this.CellSize / 2;
                const y = -r * this.CellSize + this.RowCount * this.CellSize / 2;
                landNode.setPosition(x, y, 0);
            }
        }
    }
}
