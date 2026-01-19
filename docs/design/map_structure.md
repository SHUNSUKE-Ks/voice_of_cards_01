# Map Data Structure (v1.0)

## Overview
Voice of Cardsスタイルの「カードで構成されたマップ」を表現するためのデータ構造定義。
JSONファイルは `src/data/world/` 配下に配置される。

## JSON Schema Definition

```json
{
  "mapId": "string (Unique ID, e.g., 'map_01_dragon_isle')",
  "name": "string (Display Name)",
  "bgm": "string (Audio Asset ID)",
  "tableTheme": "string (Background/Table Texture ID)",
  "grid": {
    "width": "number (Grid Width)",
    "height": "number (Grid Height)"
  },
  "defaultFogState": "hidden | revealed", 
  "tiles": [
    {
      "id": "string (Unique Tile ID, e.g., 't_x_y')",
      "x": "number (Grid X)",
      "y": "number (Grid Y)",
      "terrainCardId": "string (Asset ID for card image)",
      "isTraversable": "boolean",
      "eventTrigger": {
        "type": "battle | scenario | shop | none",
        "value": "string (Event ID or Encounter Group ID)",
        "chance": "number (0.0 - 1.0, Optional)",
        "triggerOn": "step | interact"
      }
    }
  ]
}