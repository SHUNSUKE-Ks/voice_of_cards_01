# Sprint 3: Scenario & Event Implementation

## Definition of Done (完了の定義)
* [ ] **スクリプト再生:** JSONの配列順に、テキスト表示と演出が実行される。
* [ ] **カード立ち絵:** 会話に合わせてキャラクターカードがテーブル上に配置・退場する。
* [ ] **選択肢分岐:** 選択肢カードを選び、それに応じたシナリオへジャンプできる。
* [ ] **ログ機能:** 過去の会話テキストを遡って確認できる（簡易版で可）。

## Implementation TODO
### 1. Scenario Core Logic (Store)
- [ ] **ScenarioStore Setup**: `src/core/stores/useScenarioStore.ts`
    - State: `currentScriptIndex`, `isWaitingInput`, `history`, `activeCards` (現在表示中の立ち絵)
    - Action: `loadScenario`, `nextStep`, `selectChoice`
- [ ] **Script Parser**: コマンドタイプ(`text`, `show_card`等)ごとに処理を振り分けるロジック。

### 2. UI Components
- [ ] **Message Box**: `src/parts/novel/MessageBox.tsx`
    - 画面下部のテキスト領域。タイプライターエフェクト実装。
- [ ] **Card Stage**: `src/parts/novel/CardStage.tsx`
    - キャラクターカードを表示する領域（Flex box等で左・中・右を管理）。
- [ ] **Choice Hand**: `src/parts/novel/ChoiceHand.tsx`
    - 選択肢が「手札」のように配られる演出。

### 3. Integration
- [ ] **Screen Integration**: `src/screens/02_Novel/NovelScreen.tsx`
    - マップ上のイベントマスを踏んだ際、この画面へ遷移し、終了後にマップへ戻るフローの実装。
