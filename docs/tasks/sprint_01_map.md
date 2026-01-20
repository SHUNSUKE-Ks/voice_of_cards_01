---

### 2. スプリント1 タスクリスト
**保存先:** `docs/tasks/sprint_01_map.md`

```markdown
# Sprint 1: Map Feature Implementation

## Definition of Done (完了の定義)
* [x] **マップ描画:** JSONデータを読み込み、指定された座標にカードがグリッド状に配置されている。
* [x] **Fog of War:** プレイヤーの周囲1マス以外は「裏面」で表示され、移動すると隣接マスが「表面」にめくられるアニメーションが動作する。
* [x] **プレイヤー移動:** 方向キー（またはクリック）で、プレイヤー駒（Pawn）がグリッドに沿って移動する。
* [x] **移動制限:** `isTraversable: false` のマス（海や山など）には移動できない。
* [x] **データ分離:** マップデータがハードコードされておらず、`src/data/` 内のJSONから動的に生成されている。

## Implementation TODO
### 1. Setup & Data Layer
- [x] **Type Definitions**: `src/types/map.ts` (MapJson, TileData, EventTrigger型定義)
- [x] **Mock Data**: `src/data/world/test_map.json` (テスト用マップデータ作成)
- [x] **Asset Preparation**: カード表面・裏面、プレイヤー駒の仮画像用意

### 2. Core Logic (Store)
- [x] **MapStore Setup**: `src/core/stores/useMapStore.ts`
    - State: `currentMapId`, `playerPos`, `revealedTiles`
    - Action: `loadMap`, `movePlayer`
- [x] **Movement Logic**: `movePlayer` 実装 (境界値・通行可能判定・Fog解除)

### 3. Components (UI/UX)
- [x] **Card Component**: `src/parts/world/MapCard.tsx` (Framer Motionでフリップアニメ)
- [x] **Grid Layout**: `src/parts/world/MapGrid.tsx` (CSS Grid表示)
- [x] **Pawn Component**: `src/parts/world/PlayerPawn.tsx` (移動アニメーション)

### 4. Integration
- [x] **Screen Integration**: `src/screens/02_Novel/MapScreen.tsx` への組み込み