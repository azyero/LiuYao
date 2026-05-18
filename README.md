[中文](./README_CN.md)

# LiuYao (六爻排盘)

A Vue 3 web application for I Ching (Yijing) Liu Yao divination. Features digital coin tossing with 3D animation, a complete hexagram dictionary, and AI-assisted interpretation prompts.

## Features

- **Digital Coin Tossing**: Simulates the traditional three-coin method with 3D animated flips for each of the six lines
- **Complete Hexagram Dictionary**: All 64 hexagrams with judgments (卦辞), images (象辞), line texts (爻辞), and modern explanations
- **Changed Hexagram**: Automatically detects moving lines and derives the transformed hexagram (变卦)
- **AI Interpretation Prompt**: One-click copy of a structured prompt for pasting into any AI assistant for in-depth reading
- **Dark/Light Theme**: Supports both themes, auto-follows system preference

## Tech Stack

| Technology | Description |
|-------------|-------------|
| Vue 3 | Composition API + `<script setup>` |
| Vite | Build tooling |
| TypeScript | Type safety |
| Tailwind CSS | Utility-first CSS framework |

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── main.ts                  # App entry point
├── App.vue                  # Root component
├── style.css                # Global styles
├── components/
│   ├── CoinToss.vue         # 3D coin toss animation
│   ├── HexagramView.vue     # Hexagram display
│   ├── HexagramResult.vue   # Divination result
│   ├── HexagramDictionary.vue # 64 hexagram dictionary
│   ├── HexagramDetail.vue   # Hexagram detail modal
│   ├── HexagramCard.vue     # Hexagram card
│   ├── HexagramLine.vue     # Single yao line
│   └── PreparationModal.vue # Pre-divination meditation
├── composables/
│   ├── useDivination.ts     # Divination state machine
│   └── useTheme.ts         # Theme toggle
├── data/
│   ├── hexagrams.ts         # Full 64 hexagrams dataset
│   ├── modernExplanations.ts # Modern interpretations
│   └── quotes.ts            # I Ching quotes
├── types/
│   └── index.ts             # TypeScript types
└── utils/
    └── liuyao.ts            # Core divination logic
```

## How It Works

The app simulates tossing three ancient Chinese coins:

- Heads (正面) = 3 (yang), Tails (背面) = 2 (yin)
- Sum of three coins → 6 (moving yin), 7 (static yang), 8 (static yin), 9 (moving yang)
- Moving lines (6 or 9) invert to their opposite, producing the changed hexagram
- Six lines are built from bottom up to form the complete hexagram

## License

MIT
