#古域耕农演示
古域耕农 Demo｜Cocos Creator 微信小游戏原型。基础农耕种植 Demo，用于练习移动端触屏、UI 适配、地块种植、离线作物生长、本地存档。完整版古文明农耕模拟器前置原型项目
# 古域耕农demo（guyugengnong-demo）
> Cocos Creator 微信小游戏原型项目，农耕模拟Demo，作为《古域耕农》完整版前置练手项目。

## 🎯 Demo目标
仅实现基础种植玩法，练习：
- 移动端触屏地块交互
- 响应式UI适配（微信小游戏）
- 离线时间作物生长结算
- 本地存档系统
- 简易商店、仓库、等级经验系统

## ✅ 当前已实现清单
- [x] 6*6地块网格生成，地块预制体
- [x] 触屏点击：开垦、播种、收获
- [x] 作物多阶段贴图（空地/幼苗/成熟）
- [x] 顶部工具栏UI：种子、粮食、等级经验条
- [x] 商店弹窗：购买粟、黍种子
- [x] 仓库弹窗：存储收获谷物
- [x] 本地存档，退出游戏保留农场状态
- [x] 离线时间计算，自动推进作物生长

## 📌 本Demo暂不实现（放到完整版项目）
- 二十四节气、天气、自然灾害
- 钓鱼、狩猎、畜牧系统
- 税收、货币、四大文明区域
- 建筑、加工、NPC、科技树

## 🛠️ 技术栈
- 游戏引擎：Cocos Creator
- 脚本语言：TypeScript
- 配置工具：Python（CSV读取，导出JSON作物配置）
- 目标平台：微信小游戏

## 📦 打包方式
1. Cocos Creator构建微信小游戏
2. 微信开发者工具预览&真机测试

## 📝 开发计划
1. 基础地块交互 ✅
2. UI工具栏、商店仓库弹窗
3. 离线生长逻辑 + 本地存档
4. 真机测试、触屏误触优化
5. 素材美化，收尾Demo

## 📄 License
MIT

guyugengnong-demo/
├── README.md               # 项目介绍、开发计划、功能清单
├── .gitignore              # git忽略文件（Cocos模板）
├── package.json
├── assets/                 # Cocos资源：图片、prefab、场景、脚本
│   ├── scenes/             # 主农场场景
│   ├── scripts/            # Typescript代码
│   │   ├── core/           # 核心逻辑：存档、时间、玩家数据
│   │   ├── land/           # 地块、作物脚本
│   │   ├── ui/             # 工具栏、商店、仓库弹窗UI脚本
│   │   └── config/         # JSON配置表（由Python导出）
│   ├── textures/           # 图片素材：地块、作物、UI按钮
│   └── prefab/             # 地块预制体、弹窗预制体
├── build/                  # 打包产物，gitignore忽略，不上传
├── library/                # Cocos缓存，gitignore忽略
├── local/
├── packages/
├── project.json
└── sim/                    # Python模拟器文件夹（独立，用于导出JSON配置，不参与游戏运行）
    ├── csv/
    ├── export_json.py
    └── main.py

