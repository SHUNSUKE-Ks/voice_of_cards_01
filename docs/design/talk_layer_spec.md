# Talk Layer 仕様書

## 概要
Voice of Cards スタイルの会話画面システム。キャラクターカードとダイアログカードを GSAP アニメーションで演出する。

---

## 参照画像
![ref_modal_01_dialog_ash.jpg](file:///c:/Users/enjoy/AppPJ02/voice_of_cards_01/docs/design/img/Voice%20of%20Cards%20The%20Isle%20Dragon%20Roars/03_%E3%83%A2%E3%83%BC%E3%83%80%E3%83%AB%E3%81%A8%E3%83%86%E3%82%AD%E3%82%B9%E3%83%88/ref_modal_01_dialog_ash.jpg)

---

## レイアウト寸法（1920×1080基準）

| 要素 | サイズ | 位置 | 回転 |
|------|--------|------|------|
| **左キャラカード** | 300×420px | left: 5%, top: 20% | rotate(-12deg) |
| **ダイアログカード** | 400×500px | center | rotate(0deg) |
| **右キャラカード（上）** | 240×340px | right: 5%, top: 10% | rotate(8deg) |
| **右キャラカード（下）** | 240×340px | right: 8%, top: 45% | rotate(5deg) |

### レスポンシブ対応
```css
/* モバイル横画面 */
@media (max-height: 500px) {
  --card-scale: 0.6;
}
/* タブレット */
@media (max-width: 1024px) {
  --card-scale: 0.75;
}
```

---

## レイヤー構造

```
TalkLayer (z-index: 100)
├── BackgroundOverlay (rgba(0,0,0,0.6))
├── CharacterCardSlot_Left (左キャラカード)
├── DialogCard_Center (中央ダイアログカード)
├── CharacterCardSlot_Right_Top (右上キャラカード)
├── CharacterCardSlot_Right_Bottom (右下キャラカード)
└── BottomControls (操作ヒント: Back/Next)
```

---

## 効果音（SE）

| トリガー | SE ファイル | 備考 |
|----------|-------------|------|
| キャラカード登場 | `src/assets/se/page_mekuri01.mp3` | カード登場時に再生 |
| ダイアログ進行 | 別途追加予定 | クリック時 |

### SE 実装
```typescript
// useTalkAnimation.ts
const playCardSound = () => {
  const audio = new Audio('/assets/se/page_mekuri01.mp3');
  audio.volume = 0.5;
  audio.play();
};

// カード登場アニメーション内で呼び出し
const animateCardEnter = (cardRef: HTMLElement) => {
  playCardSound();
  gsap.from(cardRef, {
    y: 100,
    opacity: 0,
    rotationZ: 15,
    scale: 0.8,
    duration: 0.5,
    ease: 'back.out(1.7)',
  });
};
```

---

## コンポーネント設計

### 1. TalkLayer.tsx
| Props | 型 | 説明 |
|-------|-----|------|
| `isVisible` | boolean | 表示/非表示 |
| `dialogData` | TalkDialogData | ダイアログデータ |
| `onClose` | () => void | 閉じる時のコールバック |

### 2. CharacterCard.tsx
| Props | 型 | 説明 |
|-------|-----|------|
| `characterId` | string | キャラクターID |
| `position` | 'left' \| 'right-top' \| 'right-bottom' | 配置位置 |
| `isActive` | boolean | 話者かどうか（手前に表示） |
| `tilt` | number | 傾き角度 (deg) |

### 3. DialogCard.tsx
| Props | 型 | 説明 |
|-------|-----|------|
| `speakerName` | string | 話者名 |
| `content` | string | ダイアログテキスト |
| `highlights` | string[] | ハイライトワード（青色表示） |

---

## GSAP アニメーション

### カード登場（SE付き）
```typescript
const animateCardEnter = (cardRef: HTMLElement, position: string) => {
  playCardSound(); // SE再生
  
  const startRotation = position === 'left' ? -25 : 20;
  gsap.from(cardRef, {
    y: 150,
    x: position === 'left' ? -100 : 100,
    opacity: 0,
    rotationZ: startRotation,
    scale: 0.7,
    duration: 0.6,
    ease: 'back.out(1.7)',
  });
};
```

### 話者切り替え
```typescript
// 非アクティブカードを後ろへ
gsap.to(inactiveCard, { 
  scale: 0.85, 
  opacity: 0.6, 
  filter: 'brightness(0.7)',
  duration: 0.3 
});
// アクティブカードを前面へ
gsap.to(activeCard, { 
  scale: 1.05, 
  opacity: 1, 
  filter: 'brightness(1)',
  duration: 0.3 
});
```

### ダイアログカード更新
```typescript
gsap.fromTo(dialogCard, 
  { y: 0 },
  { y: -15, duration: 0.15, yoyo: true, repeat: 1 }
);
```

---

## データ構造

```typescript
interface TalkDialogData {
  sceneId: string;
  dialogs: TalkDialog[];
}

interface TalkDialog {
  id: string;
  speaker: string;           // キャラクターID
  speakerName: string;       // 表示名
  content: string;           // テキスト
  highlights?: string[];     // ハイライトワード（青色表示）
  leftCard?: string;         // 左に表示するカードID
  rightTopCard?: string;     // 右上に表示するカードID
  rightBottomCard?: string;  // 右下に表示するカードID
  animation?: 'enter' | 'shake' | 'fade';
}
```

---

## ファイル構成

```
src/
├── layers/
│   └── TalkLayer/
│       ├── TalkLayer.tsx
│       ├── TalkLayer.css
│       ├── DialogCard.tsx
│       ├── CharacterCard.tsx
│       └── useTalkAnimation.ts   (GSAP + SE)
├── core/stores/
│   └── useTalkStore.ts
├── assets/se/
│   └── page_mekuri01.mp3        (カード登場SE)
└── data/talk/
    └── demo_talk.json
```

---

## 実装ステップ

### Phase 1: 基本構造
- [ ] TalkLayer.tsx 作成
- [ ] DialogCard.tsx 作成
- [ ] CharacterCard.tsx 作成
- [ ] useTalkStore.ts 作成

### Phase 2: GSAP アニメーション + SE
- [ ] GSAP インストール (`npm install gsap`)
- [ ] useTalkAnimation.ts 作成（SE含む）
- [ ] カード登場アニメーション + SE実装
- [ ] 話者切り替えアニメーション実装

### Phase 3: 統合
- [ ] シナリオシステムとの連携
- [ ] マップ画面からのトリガー
- [ ] テストデータ作成

---

## 依存パッケージ
```bash
npm install gsap
```

---

## 備考
- 既存の ScenarioScreen とは別レイヤーとして独立
- マップ画面上にオーバーレイとして表示可能
- 将来的にはショップ画面やイベント画面でも再利用
- SE は `page_mekuri01.mp3` を使用（カードをめくる音）
