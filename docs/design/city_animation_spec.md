# シティカード トランジションアニメーション設計

## 概要
マップ上でシティ（街）に入る際のカードアニメーション

## アニメーションフロー

```
[Phase 1: 散開] → [Phase 2: フェードアウト] → [Phase 3: シティカード登場] → [Phase 4: 整列]
```

---

## Phase 1: 散開 (Scatter)
**トリガー**: プレイヤーがシティマスに到達

```
現在のマップカード達が画面外へ散らばる
- 各カードがランダムな方向へ移動
- 回転しながら飛んでいく
- フェードアウト
```

### GSAP実装イメージ
```typescript
gsap.to(cards, {
    x: () => gsap.utils.random(-500, 500),
    y: () => gsap.utils.random(-500, 500),
    rotation: () => gsap.utils.random(-180, 180),
    opacity: 0,
    scale: 0.5,
    duration: 0.8,
    ease: "power2.in",
    stagger: 0.05,
});
```

---

## Phase 2: 背景トランジション
**同時進行**: 背景色が街の雰囲気に変化

```
マップ背景 → 街背景 (フェード)
```

---

## Phase 3: シティカード登場 (Enter)
**開始**: Phase 1 完了後

```
新しいシティ用カードが画面外から飛んでくる
- 上下左右からランダムに
- 回転しながら登場
```

### GSAP実装イメージ
```typescript
// 開始位置（画面外）
gsap.set(cityCards, {
    x: () => gsap.utils.random([-800, 800]),
    y: () => gsap.utils.random([-600, 600]),
    rotation: () => gsap.utils.random(-90, 90),
    opacity: 0,
    scale: 0.3,
});

// 登場アニメーション
gsap.to(cityCards, {
    x: 0,
    y: 0,
    rotation: 0,
    opacity: 1,
    scale: 1,
    duration: 0.6,
    ease: "back.out(1.7)",
    stagger: 0.08,
});
```

---

## Phase 4: 整列 (Align)
**開始**: Phase 3 と同時

```
カードがグリッド状に整列
- 街のレイアウト位置へスナップ
- 最終位置で軽くバウンス
```

---

## シティレイアウト例

```
┌─────────────────────────────────┐
│                                 │
│   [武器屋]     [宿屋]    [酒場]  │
│                                 │
│          [町長の家]             │
│                                 │
│   [道具屋]     [広場]    [教会]  │
│                                 │
└─────────────────────────────────┘
```

---

## コンポーネント構成

```
src/layers/CityLayer/
├── CityLayer.tsx        # シティUI全体
├── CityCard.tsx         # 個別カード
├── useCityAnimation.ts  # GSAPアニメーション
└── CityLayer.css
```

---

## 必要なアセット

| ID | 名前 | 説明 |
|----|------|------|
| city_weapon | 武器屋 | 武器購入 |
| city_armor | 防具屋 | 防具購入 |
| city_inn | 宿屋 | HP回復 |
| city_tavern | 酒場 | 情報収集 |
| city_shop | 道具屋 | アイテム購入 |
| city_church | 教会 | セーブポイント |
| city_exit | 出口 | マップへ戻る |

---

## トリガー条件

```typescript
// MapStore で街マスを踏んだ時
if (tile.type === 'city') {
    openCity(tile.cityId);
}
```

---

## 実装優先度

1. [HIGH] 散開・登場アニメーション (GSAP)
2. [MID] シティレイアウトシステム
3. [MID] 各店舗カード
4. [LOW] 店舗インタラクション
