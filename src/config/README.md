# レイアウト設定マニュアル

TalkLayer のカード位置やアニメーションを調整するための設定ファイルです。

## 設定ファイル

📁 `src/config/talkLayoutConfig.ts`

---

## カード位置設定

### 座標システム
- **X, Y**: パーセント値 (0-100%)
  - `x: 0` = 左端、`x: 50` = 中央、`x: 100` = 右端
  - `y: 0` = 上端、`y: 50` = 中央、`y: 100` = 下端
- **アンカー**: 中央 (`translate(-50%, -50%)`)
- **rotation**: 回転角度 (度)
- **width, height**: サイズ (px)

### 各カード設定

| 変数名 | 説明 | デフォルト位置 |
|--------|------|----------------|
| `DIALOG_CARD` | ダイアログカード | 中央 (50%, 42%) |
| `LEFT_CARD` | 左キャラカード | 左 (15%, 48%) |
| `RIGHT_TOP_CARD` | 右上キャラカード | 右上 (82%, 28%) |
| `RIGHT_BOTTOM_CARD` | 右下キャラカード | 右下 (85%, 65%) |

### 例: 左カードを調整

```typescript
export const LEFT_CARD: CardLayoutConfig = {
    x: 15,          // 左から15%
    y: 48,          // 上から48%
    rotation: -15,  // 左に15度傾き
    width: 280,     // 幅 280px
    height: 400,    // 高さ 400px
};
```

---

## アニメーション設定（将来用）

| 変数名 | 説明 |
|--------|------|
| `CARD_ENTER_ANIMATION` | カード登場 |
| `CARD_EXIT_ANIMATION` | カード退場 |
| `SPEAKER_SWITCH_ANIMATION` | 話者切替 |

```typescript
export const CARD_ENTER_ANIMATION: CardAnimationConfig = {
    duration: 0.6,          // 秒
    ease: 'back.out(1.7)',  // GSAP ease
    delay: 0,               // 遅延
};
```

---

## SE設定

```typescript
export const SE_CONFIG = {
    cardEnter: '/assets/se/page_mekuri01.mp3',
    volume: 0.5,
};
```

---

## デバッグツール

実行中のリアルタイム調整:
1. 画面右上「🔧 Debug」をクリック
2. 「✋ ON」で編集モード有効
3. パネルでカード選択 → 矢印キーで移動
4. 「📋 座標をコピー」でJSON取得
