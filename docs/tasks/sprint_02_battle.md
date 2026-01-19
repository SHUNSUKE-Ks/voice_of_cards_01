# Sprint 2: Battle System Implementation

## Definition of Done (完了の定義)
* [ ] **バトルループ:** エンカウント → ターン進行（味方/敵） → リザルト → マップ復帰 の一連の流れが動作する。
* [ ] **ジェムシステム:** ターン開始時にジェムが補充され、スキル使用時に正しく消費される（不足時は使用不可）。
* [ ] **カード演出:** 攻撃を受けた際、カードが揺れる・点滅する等のダメージ演出がある。
* [ ] **ダイス演出:** ダイスが必要なスキル使用時、画面上でダイスが振られ、出目によってダメージが変化する。
* [ ] **UI:** プレイヤーのターン時に手札（スキルカード）が表示され、クリックで選択できる。

## Implementation TODO
### 1. Battle Core Logic (Store)
- [ ] **BattleStore Setup**: `src/core/stores/useBattleStore.ts`
    - State: `turnCount`, `currentPhase` (player/enemy), `gemCount`, `participants` (味方/敵のHP管理)
    - Action: `startBattle(encounterId)`, `nextTurn`, `executeSkill`, `consumeGem`
- [ ] **Turn Manager**: 素早さ(spd)に基づく行動順序の計算ロジック。

### 2. UI Components
- [ ] **Battle Table**: `src/screens/03_Battle/BattleTable.tsx`
    - 背景と「場」のレイアウト。
- [ ] **Gem Box**: `src/parts/battle/GemBox.tsx`
    - 現在のジェム数を宝石の画像アイコン数で表示。
- [ ] **Hand (Skill List)**: `src/parts/battle/SkillHand.tsx`
    - 画面下部に並ぶスキルカード。`onHover` で詳細ポップアップ表示。
- [ ] **Dice Roller**: `src/parts/battle/DiceRoller.tsx`
    - 3Dライブラリ(Three.js/React-Three-Fiber) または 連番画像アニメーションでダイスロールを実装。

### 3. Enemy AI
- [ ] **Simple AI**: `src/core/battle/EnemyAI.ts`
    - ランダム、またはHP減少時に行動を変える簡易ロジックの実装。

### 4. Integration
- [ ] **Damage Calculation**: 攻撃力 vs 防御力 ＋ ダイス補正の計算式実装。
- [ ] **Effect Display**: ダメージ数値のポップアップ表示。
