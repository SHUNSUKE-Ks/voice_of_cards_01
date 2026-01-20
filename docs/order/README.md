# 発注フォルダー構造

このディレクトリは、各クリエイターロール向けの発注書と確認済み資料を管理します。

## 📁 フォルダー構造

```
docs/order/
├── README.md              # このファイル
├── scenario_order_demo.md # デモシナリオ発注書
│
├── Scenariolighter/       # シナリオライター向け
│   ├── [発注書類]         # 最新の発注前書類
│   └── confirmed/         # 確認済み・過去資料
│
├── Graphic/               # グラフィッカー向け
│   ├── asset_order_v2.0.json  # 最新の発注JSON
│   └── confirmed/         # 確認済み・過去資料
│       └── asset_order_v1.0.json
│
└── Sound/                 # サウンドクリエイター向け
    ├── [発注書類]         # 最新の発注前書類
    └── confirmed/         # 確認済み・過去資料
```

## 📋 運用ルール

1. **最新の発注書類**はロールフォルダー直下に配置
2. **確認済み・レビュー完了した資料**は `confirmed/` フォルダへ移動
3. ファイル名にはバージョン番号を付与（例: `asset_order_v2.0.json`）

## 🎨 グラフィック発注 (asset_order_v2.0.json)

### 新機能 (v2.0)
- `cardTypes`: カードタイプ定義（character, enemy, jobSelection等）
- `layoutSpec`: レイアウト仕様（namePosition, borderWidth等）
- `stats`: ステータス情報（HP, ATK, DEF）- アプリ側でオーバーレイ表示
- `priorityPrompt`: NanoBananaProで使用するマスタープロンプト

### カードタイプ一覧
| タイプ | 用途 | 名前位置 |
|--------|------|----------|
| `character` | キャラクターカード | 上 |
| `enemy` | 敵カード | 上 |
| `jobSelection` | ジョブ選択（シルエット） | 上 |
| `battleStatus` | バトルステータス（アタッチ用） | - |
| `background` | 背景 | 上部バナー |
| `tile` | マップタイル | 下 |

---

最終更新: 2026-01-20
