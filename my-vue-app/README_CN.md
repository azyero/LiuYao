# 六爻排盘 (LiuYao)

基于 Vue 3 的易经六爻排盘 Web 应用，支持在线摇卦、卦象查询与 AI 解卦辅助。

## 功能

- **在线摇卦**：模拟传统三枚铜钱起卦法，每次抛掷均有 3D 动画效果
- **完整卦典**：收录《易经》六十四卦，包含卦辞、象辞、爻辞及现代释义
- **变卦推演**：自动识别动爻并推演变卦
- **AI 解卦提示词**：一键生成结构化提示词，方便粘贴至 AI 助手进行深度解读
- **深浅主题**：支持明暗双主题，自动跟随系统偏好

## 技术栈

| 技术 | 说明 |
|------|------|
| Vue 3 | Composition API + `<script setup>` |
| Vite | 构建工具 |
| TypeScript | 类型安全 |
| Tailwind CSS | 原子化 CSS 框架 |

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 项目结构

```
src/
├── main.ts                  # 应用入口
├── App.vue                  # 根组件
├── style.css                # 全局样式
├── components/
│   ├── CoinToss.vue         # 铜钱抛掷动画
│   ├── HexagramView.vue     # 卦象展示
│   ├── HexagramResult.vue   # 排盘结果
│   ├── HexagramDictionary.vue # 六十四卦辞典
│   ├── HexagramDetail.vue   # 卦象详情弹窗
│   ├── HexagramCard.vue     # 卦象卡片
│   ├── HexagramLine.vue     # 爻线组件
│   └── PreparationModal.vue # 起卦前静心引导
├── composables/
│   ├── useDivination.ts     # 摇卦状态机
│   └── useTheme.ts         # 主题切换
├── data/
│   ├── hexagrams.ts         # 六十四卦完整数据
│   ├── modernExplanations.ts # 现代释义
│   └── quotes.ts            # 易经名言
├── types/
│   └── index.ts             # TypeScript 类型定义
└── utils/
    └── liuyao.ts            # 起卦核心逻辑
```

## 起卦原理

模拟三枚铜钱抛掷法：

- 正面（字面）= 3，为阳
- 反面（背面）= 2，为阴
- 三枚之和 → 6（老阴·动爻）、7（少阳·静爻）、8（少阴·静爻）、9（老阳·动爻）
- 动爻（6、9）阴阳互变，生成变卦
- 自下而上六爻组成完整卦象

## License

MIT
