# Battle Data Structure (v1.0)

## Overview
Voice of Cardsスタイルの「ジェム＆ダイス」バトルシステムを駆動するためのデータ構造。
`src/data/battle/` 配下に配置される。

## 1. Skill Data (skills.json)
スキルカードの定義。コスト（ジェム）とダイス効果が鍵となる。

```json
[
  {
    "id": "sk_flame_slash",
    "name": "火炎斬り",
    "description": "敵単体に火属性ダメージ。ダイスが5以上なら威力1.5倍。",
    "cardImageId": "img_card_skill_fire",
    "cost": 2,
    "target": "single_enemy",
    "effect": {
      "type": "damage",
      "element": "fire",
      "basePower": 20,
      "scaling": "atk"
    },
    "dice": {
      "needsRoll": true,
      "threshold": 5,
      "successMultiplier": 1.5,
      "failMultiplier": 1.0
    }
  },
  {
    "id": "sk_heal",
    "name": "ヒール",
    "description": "味方単体のHPを回復。",
    "cardImageId": "img_card_skill_heal",
    "cost": 1,
    "target": "single_ally",
    "effect": {
      "type": "heal",
      "basePower": 30,
      "scaling": "int"
    },
    "dice": null
  }
]
```

## 2. Enemy Data (enemies.json)
敵カードのパラメータ定義。

```json
[
  {
    "id": "en_slime",
    "name": "スライム",
    "cardImageId": "img_card_enemy_slime",
    "stats": {
      "maxHp": 50,
      "atk": 10,
      "def": 5,
      "spd": 8
    },
    "behavior": {
      "pattern": "random", 
      "skills": ["sk_tackle", "sk_mucus"]
    },
    "rewards": {
      "exp": 10,
      "gold": 5,
      "dropItem": "item_herb"
    }
  }
]
```

## 3. Encounter Data (encounters.json)
マップ上のランダムエンカウントやイベントバトルの敵編成定義。

```json
{
  "enc_group_01": {
    "enemies": ["en_slime", "en_slime"],
    "bgm": "bgm_battle_normal",
    "backgroundId": "bg_grassland"
  },
  "enc_boss_01": {
    "enemies": ["en_dragon"],
    "bgm": "bgm_battle_boss",
    "backgroundId": "bg_cave"
  }
}
```
