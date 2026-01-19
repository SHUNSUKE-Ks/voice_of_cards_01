# Character Structure - キャラクターデータ設計

## キャラクターJSON構造

### characters.json
```json
{
  "characters": [
    {
      "id": "hero",
      "name": "主人公",
      "class": "adventurer",
      "baseStats": {
        "hp": 100,
        "atk": 15,
        "def": 10,
        "spd": 12
      },
      "growthRate": {
        "hp": 8,
        "atk": 2,
        "def": 1,
        "spd": 1
      },
      "skills": ["sk_slash"],
      "learnableSkills": [
        { "level": 5, "skillId": "sk_flame_slash" },
        { "level": 10, "skillId": "sk_guard" }
      ],
      "portrait": "ch_hero",
      "description": "冒険者ギルドで名を上げた若き戦士。"
    }
  ]
}
```

---

## TypeScript型定義

```typescript
// types/character.ts

interface BaseStats {
  hp: number;
  atk: number;
  def: number;
  spd: number;
}

interface LearnableSkill {
  level: number;
  skillId: string;
}

interface CharacterDefinition {
  id: string;
  name: string;
  class: CharacterClass;
  baseStats: BaseStats;
  growthRate: BaseStats;
  skills: string[];           // 初期スキル
  learnableSkills: LearnableSkill[];
  portrait: string;           // ch_xxx (表情なしのベース)
  description: string;
}

type CharacterClass = 
  | 'adventurer' 
  | 'warrior' 
  | 'mage' 
  | 'rogue' 
  | 'healer';
```

---

## パーティ状態(ランタイム)

```typescript
// types/partyState.ts

interface CharacterState {
  characterId: string;
  level: number;
  currentHp: number;
  maxHp: number;
  atk: number;
  def: number;
  spd: number;
  exp: number;
  expToNext: number;
  equippedSkills: string[];   // 最大4つ
  equipment: {
    weapon: string | null;
    armor: string | null;
    accessory: string | null;
  };
  statusEffects: StatusEffect[];
}

interface StatusEffect {
  type: 'poison' | 'burn' | 'freeze' | 'buff_atk' | 'debuff_def';
  turnsRemaining: number;
  value?: number;
}

interface PartyState {
  members: CharacterState[];  // 最大3人
  reserves: CharacterState[]; // 控え
  gold: number;
  items: { itemId: string; quantity: number }[];
}
```

---

## レベルアップ計算

```typescript
// core/levelSystem.ts

const EXP_TABLE = [0, 100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700];

function calculateStats(char: CharacterDefinition, level: number): BaseStats {
  return {
    hp: char.baseStats.hp + char.growthRate.hp * (level - 1),
    atk: char.baseStats.atk + char.growthRate.atk * (level - 1),
    def: char.baseStats.def + char.growthRate.def * (level - 1),
    spd: char.baseStats.spd + char.growthRate.spd * (level - 1),
  };
}

function getExpToNextLevel(currentLevel: number): number {
  return EXP_TABLE[currentLevel] ?? EXP_TABLE[EXP_TABLE.length - 1] * 1.5;
}
```

---

## 初期パーティ構成

| ID | キャラ | 初期Lv | 初期スキル |
|----|--------|--------|-----------|
| hero | 主人公 | 1 | 斬撃 |
| warrior | 女戦士 | 1 | 強打, 防御 |
| mage | 魔法使い | 1 | ファイア, ヒール |

---

## キャラクターカード表示対応

```typescript
// 表情差分の取得
function getPortraitPath(characterId: string, expression: string = 'normal'): string {
  return `assets/characters/${characterId}_${expression}.webp`;
}

// バトル用カード表示
function getBattleCardPath(characterId: string): string {
  return `assets/characters/${characterId}_battle.webp`;
}
```
