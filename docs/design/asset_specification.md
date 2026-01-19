# Asset Specification (v1.0)

## Overview
Voice of Cardsスタイルのビジュアルを実現するためのアセット仕様。
全てのアセットは `src/assets/` 配下に配置される。

---

## 1. 背景 (bg/)

| 項目 | 仕様 |
|------|------|
| 保存先 | `src/assets/bg/` |
| 命名規則 | `bg_{location}_{variation}.webp` |
| 例 | `bg_tavern_day.webp`, `bg_forest_night.webp` |
| 推奨サイズ | 1920 x 1080 px (16:9) |
| フォーマット | WebP (品質80-90%) または PNG |

---

## 2. キャラクターカード (chara/)

| 項目 | 仕様 |
|------|------|
| 保存先 | `src/assets/chara/` |
| 命名規則 | `ch_{characterId}_{expression}.webp` |
| 例 | `ch_hero_normal.webp`, `ch_gm_smile.webp` |
| カードサイズ | 400 x 560 px (5:7 比率) |
| フォーマット | WebP または PNG (透過対応) |

### 表情バリエーション
- `normal` - 通常
- `smile` - 笑顔
- `angry` - 怒り
- `sad` - 悲しみ
- `surprised` - 驚き

---

## 3. 敵カード (chara/enemy/)

| 項目 | 仕様 |
|------|------|
| 保存先 | `src/assets/chara/enemy/` |
| 命名規則 | `en_{enemyId}.webp` |
| 例 | `en_slime.webp`, `en_dragon.webp` |
| カードサイズ | 400 x 560 px (5:7 比率) |

---

## 4. マップタイル (tiles/)

| 項目 | 仕様 |
|------|------|
| 保存先 | `src/assets/tiles/` |
| 命名規則 | `tile_{terrain}.webp` |
| 例 | `tile_grass.webp`, `tile_water.webp`, `tile_back.webp` |
| タイルサイズ | 120 x 168 px (5:7 比率、カードと同比率) |
| 裏面カード | `tile_back.webp` (Fog of War用) |

---

## 5. UIパーツ (ui/)

| 項目 | 仕様 |
|------|------|
| 保存先 | `src/assets/ui/` |
| 命名規則 | `ui_{component}_{state}.webp` |
| 例 | `ui_button_normal.webp`, `ui_gem_full.webp` |
| フォーマット | PNG (透過必須) |

### 必須UIアセット
- `ui_gem_full.webp` - ジェム（満タン）
- `ui_gem_empty.webp` - ジェム（空）
- `ui_dice_{1-6}.webp` - ダイス目（6枚）
- `ui_msgbox.9.png` - メッセージボックス（9-patch）
- `ui_pawn.webp` - プレイヤー駒

---

## 6. サウンド (sounds/)

| 項目 | 仕様 |
|------|------|
| 保存先 | `src/assets/sounds/` |
| BGM命名規則 | `bgm_{scene}.mp3` |
| SE命名規則 | `se_{action}.mp3` |
| BGM例 | `bgm_title.mp3`, `bgm_battle_normal.mp3` |
| SE例 | `se_card_flip.mp3`, `se_dice_roll.mp3` |
| フォーマット | MP3 (BGM) / MP3 or WAV (SE) |

---

## 7. スキルカード (skills/)

| 項目 | 仕様 |
|------|------|
| 保存先 | `src/assets/skills/` |
| 命名規則 | `sk_{skillId}.webp` |
| 例 | `sk_flame_slash.webp`, `sk_heal.webp` |
| カードサイズ | 300 x 420 px (5:7 比率) |

---

## 8. アイテムカード (items/)

| 項目 | 仕様 |
|------|------|
| 保存先 | `src/assets/items/` |
| 命名規則 | `item_{itemId}.webp` |
| 例 | `item_herb.webp`, `item_potion.webp` |
| カードサイズ | 300 x 420 px (5:7 比率) |
