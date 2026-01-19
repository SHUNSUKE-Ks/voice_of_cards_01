# Assets Order List v1.1
# NanoBananaPro アセット発注書

## 概要
Voice of Cardsスタイルのゲームアセットを生成するための発注リスト。
各アセットにはNanoBananaProで使用するプロンプトを記載。

---

## 🎨 共通スタイルガイド

```
【共通プロンプト接頭辞】
"Voice of Cards" style, tabletop RPG card game aesthetic, 
hand-painted fantasy illustration, warm lighting on wooden table surface,
elegant card frame with gold trim, high quality game asset
```

---

## 1. キャラクターカード (400x560px)

### 1.1 主人公 (ch_hero)
| ID | 表情 | ファイル名 | 状態 |
|----|------|-----------|------|
| CH-001 | normal | `ch_hero_normal.webp` | [ ] |
| CH-002 | smile | `ch_hero_smile.webp` | [ ] |
| CH-003 | angry | `ch_hero_angry.webp` | [ ] |
| CH-004 | sad | `ch_hero_sad.webp` | [ ] |

**プロンプト:**
```
[共通接頭辞] + Character card portrait, young male adventurer with short brown hair,
determined eyes, wearing leather armor with metal shoulder guards,
heroic pose, medieval fantasy style, upper body portrait,
card aspect ratio 5:7, transparent background

表情差分:
- normal: neutral confident expression
- smile: warm friendly smile
- angry: fierce battle-ready expression, furrowed brows
- sad: melancholic downcast eyes
```

---

### 1.2 GM/ナレーター (ch_gm)
| ID | 表情 | ファイル名 | 状態 |
|----|------|-----------|------|
| CH-010 | normal | `ch_gm_normal.webp` | [ ] |
| CH-011 | smile | `ch_gm_smile.webp` | [ ] |

**プロンプト:**
```
[共通接頭辞] + Character card portrait, mysterious hooded figure,
elegant robes with gold embroidery, holding playing cards,
game master narrator aesthetic, wise and knowing aura,
upper body portrait, card aspect ratio 5:7, transparent background
```

---

### 1.3 仲間キャラクター
| ID | キャラ | ファイル名 | 状態 |
|----|--------|-----------|------|
| CH-020 | 女戦士 | `ch_warrior_normal.webp` | [ ] |
| CH-030 | 魔法使い | `ch_mage_normal.webp` | [ ] |
| CH-040 | 盗賊 | `ch_rogue_normal.webp` | [ ] |

---

### 1.4 NPCキャラクター ⭐NEW
| ID | キャラ | ファイル名 | 状態 |
|----|--------|-----------|------|
| CH-050 | 漁師(筋肉) | `ch_npc_fisherman.webp` | [ ] |
| CH-051 | 商人女性 | `ch_npc_shopkeeper.webp` | [ ] |
| CH-052 | 老婆 | `ch_npc_oldwoman.webp` | [ ] |
| CH-053 | ラッピー(マスコット) | `ch_npc_lappy.webp` | [ ] |
| CH-054 | 村人男性 | `ch_npc_villager_m.webp` | [ ] |
| CH-055 | 村人女性 | `ch_npc_villager_f.webp` | [ ] |

**プロンプト (商人女性):**
```
[共通接頭辞] + Character card portrait, female shopkeeper,
dark hair in bun, friendly merchant smile, apron over dress,
holding potion bottle, cozy shop background elements,
upper body portrait, card aspect ratio 5:7
```

---

## 2. 敵カード (400x560px)

| ID | 敵名 | ファイル名 | 状態 |
|----|------|-----------|------|
| EN-001 | スライム | `en_slime.webp` | [ ] |
| EN-002 | ゴブリン | `en_goblin.webp` | [ ] |
| EN-003 | スケルトン | `en_skeleton.webp` | [ ] |
| EN-004 | オーク | `en_orc.webp` | [ ] |
| EN-005 | 狼 | `en_wolf.webp` | [ ] |
| EN-010 | ドラゴン(ボス) | `en_dragon.webp` | [ ] |

---

## 3. 背景 (1920x1080px)

| ID | 場所 | ファイル名 | 状態 |
|----|------|-----------|------|
| BG-001 | 酒場 | `bg_tavern_day.webp` | [ ] |
| BG-002 | 森 | `bg_forest_day.webp` | [ ] |
| BG-003 | 洞窟 | `bg_cave.webp` | [ ] |
| BG-004 | 城 | `bg_castle.webp` | [ ] |
| BG-005 | 砂浜/港 | `bg_shoreland.webp` | [ ] |
| BG-010 | テーブル(メイン) | `bg_table_main.webp` | [ ] |
| BG-011 | テーブル(パープル) | `bg_table_purple.webp` | [ ] |
| BG-012 | テーブル(グリーン) | `bg_table_green.webp` | [ ] |

---

## 4. マップタイル (120x168px)

| ID | 地形 | ファイル名 | 状態 |
|----|------|-----------|------|
| TL-001 | 草原 | `tile_grass.webp` | [ ] |
| TL-002 | 森 | `tile_forest.webp` | [ ] |
| TL-003 | 水/海 | `tile_water.webp` | [ ] |
| TL-004 | 山 | `tile_mountain.webp` | [ ] |
| TL-005 | 道(土) | `tile_road.webp` | [ ] |
| TL-006 | 道(石畳) | `tile_road_stone.webp` | [ ] |
| TL-007 | 町 | `tile_town.webp` | [ ] |
| TL-008 | ダンジョン入口 | `tile_dungeon.webp` | [ ] |
| TL-010 | 裏面(未探索) | `tile_back.webp` | [ ] |

---

## 5. UIパーツ

### 5.1 基本UI
| ID | パーツ | ファイル名 | サイズ | 状態 |
|----|--------|-----------|--------|------|
| UI-001 | ジェム(満) | `ui_gem_full.webp` | 64x64 | [ ] |
| UI-002 | ジェム(空) | `ui_gem_empty.webp` | 64x64 | [ ] |
| UI-010 | プレイヤー駒(標準) | `ui_pawn_default.webp` | 80x120 | [ ] |
| UI-011 | プレイヤー駒(マー) | `ui_pawn_mar.webp` | 80x120 | [ ] |
| UI-012 | プレイヤー駒(エミル) | `ui_pawn_emil.webp` | 80x120 | [ ] |

### 5.2 ダイス ⭐NEW
| ID | パーツ | ファイル名 | サイズ | 状態 |
|----|--------|-----------|--------|------|
| UI-020 | ダイス1(標準) | `ui_dice_1.webp` | 100x100 | [ ] |
| UI-021 | ダイス2(標準) | `ui_dice_2.webp` | 100x100 | [ ] |
| UI-022 | ダイス3(標準) | `ui_dice_3.webp` | 100x100 | [ ] |
| UI-023 | ダイス4(標準) | `ui_dice_4.webp` | 100x100 | [ ] |
| UI-024 | ダイス5(標準) | `ui_dice_5.webp` | 100x100 | [ ] |
| UI-025 | ダイス6(標準) | `ui_dice_6.webp` | 100x100 | [ ] |
| UI-030 | ダイス(マーブル) | `ui_dice_marble_*.webp` | 100x100 | [ ] |
| UI-031 | ダイス(エミル) | `ui_dice_emil_*.webp` | 100x100 | [ ] |

### 5.3 ステータス表示 ⭐NEW
| ID | パーツ | ファイル名 | サイズ | 状態 |
|----|--------|-----------|--------|------|
| UI-040 | HPバー背景 | `ui_bar_hp_bg.webp` | 200x30 | [ ] |
| UI-041 | HPバー(満) | `ui_bar_hp_fill.webp` | 200x30 | [ ] |
| UI-042 | EXPバー | `ui_bar_exp.webp` | 200x20 | [ ] |
| UI-043 | ステータスパネル | `ui_status_panel.webp` | 300x200 | [ ] |
| UI-044 | 財布アイコン | `ui_purse.webp` | 64x64 | [ ] |

---

## 6. イベント・状態カード ⭐NEW (400x560px)

### 6.1 戦闘イベント
| ID | カード名 | ファイル名 | 状態 |
|----|----------|-----------|------|
| EV-001 | 敵出現 | `ev_enemy_appears.webp` | [ ] |
| EV-002 | イベント発生 | `ev_event.webp` | [ ] |
| EV-003 | Happenstance | `ev_happenstance.webp` | [ ] |

**プロンプト (敵出現):**
```
[共通接頭辞] + Event card, "An Enemy Appears!" text,
crossed swords icon, dramatic orange burst background,
urgent warning style, card aspect ratio 5:7
```

### 6.2 結果・進行
| ID | カード名 | ファイル名 | 状態 |
|----|----------|-----------|------|
| EV-010 | 勝利結果 | `ev_victory_results.webp` | [ ] |
| EV-011 | レベルアップ | `ev_level_up.webp` | [ ] |
| EV-012 | スキル習得 | `ev_skill_acquired.webp` | [ ] |
| EV-013 | ゲームオーバー | `ev_gameover.webp` | [ ] |
| EV-014 | 敗北メッセージ | `ev_defeat.webp` | [ ] |

**プロンプト (ゲームオーバー):**
```
[共通接頭辞] + "Game Over" title screen,
letters on scattered playing cards, each letter on separate card,
dramatic worn and aged card aesthetic,  
wooden table background, melancholic atmosphere
```

### 6.3 チャプター・目標
| ID | カード名 | ファイル名 | 状態 |
|----|----------|-----------|------|
| EV-020 | チャプタータイトル | `ev_chapter_title.webp` | [ ] |
| EV-021 | 目標表示 | `ev_next_objective.webp` | [ ] |

**プロンプト (チャプタータイトル):**
```
[共通接頭辞] + Chapter title card, elegant black card with gold border,
ornate compass rose design, sparkle effects,
"Chapter X" text placeholder, dramatic presentation,
card aspect ratio 5:7
```

---

## 7. アイテムカード ⭐NEW (300x420px)

### 7.1 消耗品
| ID | アイテム名 | ファイル名 | 状態 |
|----|------------|-----------|------|
| IT-001 | 回復薬(小) | `it_salve.webp` | [ ] |
| IT-002 | 回復薬(大) | `it_salve_quality.webp` | [ ] |
| IT-003 | 回復薬(特大) | `it_salve_supreme.webp` | [ ] |
| IT-004 | 解毒剤 | `it_antidote.webp` | [ ] |
| IT-005 | 呪い解除 | `it_dispeller.webp` | [ ] |
| IT-006 | 脱出アイテム | `it_bellwether.webp` | [ ] |

**プロンプト (回復薬):**
```
[共通接頭辞] + Item card, healing potion bottle,
red liquid in ornate glass flask, cork stopper,
glowing restorative aura, price "5G" label,
card aspect ratio 5:7, item shop aesthetic
```

### 7.2 獲得表示カード
| ID | カード名 | ファイル名 | 状態 |
|----|----------|-----------|------|
| IT-010 | ゴールド獲得 | `it_gold_reward.webp` | [ ] |
| IT-011 | EXP獲得 | `it_exp_reward.webp` | [ ] |
| IT-012 | カード獲得 | `it_card_reward.webp` | [ ] |

**プロンプト (ゴールド獲得):**
```
[共通接頭辞] + Reward card, pile of gold coins,
"500G" large text in center, sparkle effects,
treasure discovery aesthetic, brown and gold colors,
card aspect ratio 5:7
```

---

## 8. スキルカード (300x420px)

| ID | スキル名 | ファイル名 | 状態 |
|----|----------|-----------|------|
| SK-001 | 火炎斬り | `sk_flame_slash.webp` | [ ] |
| SK-002 | ヒール | `sk_heal.webp` | [ ] |
| SK-003 | 防御 | `sk_guard.webp` | [ ] |
| SK-004 | 雷撃 | `sk_thunder.webp` | [ ] |
| SK-005 | 凍結 | `sk_freeze.webp` | [ ] |
| SK-006 | ゼフィール(風) | `sk_zephyr.webp` | [ ] |
| SK-007 | ファイアプルーフ | `sk_fireproof.webp` | [ ] |
| SK-008 | 毒矢 | `sk_poison_arrow.webp` | [ ] |

**プロンプト (凍結):**
```
[共通接頭辞] + Skill card illustration, ice magic attack,
frozen crystal shards, blue cold aura,
freezing wind effect, card frame with snowflake motif,
5:7 aspect ratio, icy blue background
```

---

## 9. ショップ・選択UI ⭐NEW

### 9.1 ショップ画面
| ID | パーツ | ファイル名 | サイズ | 状態 |
|----|--------|-----------|--------|------|
| SH-001 | 購入ボタン | `ui_btn_buy.webp` | 200x60 | [ ] |
| SH-002 | 売却ボタン | `ui_btn_sell.webp` | 200x60 | [ ] |
| SH-003 | 退出ボタン | `ui_btn_leave.webp` | 200x60 | [ ] |
| SH-004 | もっと買う | `ui_btn_buy_more.webp` | 200x60 | [ ] |
| SH-005 | 少なく買う | `ui_btn_buy_fewer.webp` | 200x60 | [ ] |
| SH-006 | 取引成立 | `ui_btn_deal.webp` | 200x60 | [ ] |
| SH-007 | やめる | `ui_btn_nevermind.webp` | 200x60 | [ ] |

### 9.2 確認・選択
| ID | パーツ | ファイル名 | サイズ | 状態 |
|----|--------|-----------|--------|------|
| SH-010 | Yesボタン | `ui_btn_yes.webp` | 150x50 | [ ] |
| SH-011 | Noボタン | `ui_btn_no.webp` | 150x50 | [ ] |
| SH-012 | 鍵を試す | `ui_btn_try_key.webp` | 200x60 | [ ] |
| SH-013 | そのままにする | `ui_btn_leave_it.webp` | 200x60 | [ ] |

---

## 📋 発注管理

### 優先度
1. **Sprint 1 (マップ)**: TL-001〜TL-010, BG-010, UI-010
2. **Sprint 2 (バトル)**: EN-001〜EN-010, SK-001〜SK-008, UI-001〜UI-025, EV-001〜EV-003
3. **Sprint 3 (シナリオ)**: CH-001〜CH-055, BG-001〜BG-005, EV-010〜EV-021
4. **Sprint 4 (ショップ)**: IT-001〜IT-012, SH-001〜SH-013

### 完了チェック
- [ ] 全キャラクターカード完了 (主人公・仲間・NPC)
- [ ] 全敵カード完了
- [ ] 全背景完了 (テーブルバリエーション含む)
- [ ] 全マップタイル完了
- [ ] 全UIパーツ完了 (ダイス・ステータス含む)
- [ ] 全イベントカード完了
- [ ] 全アイテムカード完了
- [ ] 全スキルカード完了
- [ ] 全ショップUI完了
