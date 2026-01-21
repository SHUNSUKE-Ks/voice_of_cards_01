# CSV Map Format Guide

## 📁 ファイル構造

```
src/data/
├── tiles/
│   └── tile_definitions.json   # タイルコード定義
└── world/
    ├── maps/
    │   ├── world_01.csv        # CSVマップデータ
    │   └── town_01.csv
    ├── test_map.json           # 変換済みJSON
    └── town_start.json
```

## 🔤 タイルコード一覧

### 地形タイル
| Code | Name | 通行 | 説明 |
|------|------|------|------|
| `__` | 空白 | ✗ | 描画しない |
| `GG` | 草地 | ✓ | 通常の草原 |
| `WW` | 水 | ✗ | 海・湖・川 |
| `FF` | 森 | ✓ | 木々のある場所 |
| `RD` | 道 | ✓ | 舗装された道 |
| `MT` | 山 | ✗ | 通れない山脈 |

### 特殊タイル
| Code | Name | 説明 |
|------|------|------|
| `TN` | 町 | ワールドマップ上の町 |
| `DG` | ダンジョン | ダンジョン入口 |

### 町内タイル
| Code | Name | 説明 |
|------|------|------|
| `TG` | 町地面 | 町の基本地面 |
| `FN` | 噴水 | ランドマーク |
| `X1` | 出口 | マップ遷移点 |

### ショップ (S*)
| Code | Name |
|------|------|
| `SW` | 武器屋 |
| `SA` | 防具屋 |
| `SI` | 道具屋 |

### 建物 (B*)
| Code | Name |
|------|------|
| `BI` | 宿屋 |
| `BC` | 教会 |
| `BM` | 村長の家 |
| `TV` | 酒場 |

## 📝 CSV例

### world_01.csv
```csv
# コメント行は#で始める
WW,WW,GG,GG,GG,WW,WW
WW,GG,FF,RD,FF,GG,WW
GG,GG,RD,TN,RD,GG,GG
GG,GG,FF,RD,FF,GG,GG
WW,WW,GG,GG,GG,WW,WW
```

### town_01.csv
```csv
TG,SW,BM,SA,TG
TG,TG,TG,TG,TG
BI,TG,FN,TG,BC
TG,TG,TG,TG,TG
TV,TG,X1,TG,SI
```

## 🛠️ 変換コマンド

```bash
# CSVからJSONへ変換
npx ts-node scripts/csvToMapJson.ts <csv_file> <output_json> [mapId] [mapName]

# 例
npx ts-node scripts/csvToMapJson.ts src/data/world/maps/world_01.csv src/data/world/world_01.json
npx ts-node scripts/csvToMapJson.ts src/data/world/maps/town_01.csv src/data/world/town_01.json town_01 "始まりの町"
```

## 📋 新しいタイルの追加方法

1. `tile_definitions.json` に追加:
```json
{
    "tiles": {
        "XX": {
            "name": "新タイル名",
            "traversable": true,
            "terrainCardId": "tile_new_type",
            "buildingType": "optional_type"
        }
    }
}
```

2. CSVで使用:
```csv
GG,XX,GG
```
