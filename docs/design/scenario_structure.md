# Scenario Data Structure (v1.0)

## Overview
Voice of Cardsスタイルの「GMナレーション」と「カード演出」を制御するスクリプト構造。
`src/data/novel/` 配下に配置される。

## JSON Schema Definition (scenario.json)

```json
{
  "scenarioId": "scn_01_intro",
  "scenes": {
    "start": [
      {
        "type": "bg",
        "value": "bg_tavern_table"
      },
      {
        "type": "show_card",
        "position": "center",
        "cardId": "ch_gm",
        "anim": "fade_in"
      },
      {
        "type": "text",
        "speaker": "GM",
        "content": "ようこそ。これは全てがカードで描かれた世界の物語……。"
      },
      {
        "type": "text",
        "speaker": "GM",
        "content": "君の前には、一枚の依頼書がある。"
      },
      {
        "type": "choice",
        "options": [
          {
            "label": "依頼書を手に取る",
            "nextScene": "scene_accept"
          },
          {
            "label": "無視して酒を飲む",
            "nextScene": "scene_ignore"
          }
        ]
      }
    ],
    "scene_accept": [
      {
        "type": "show_card",
        "position": "left",
        "cardId": "ch_hero",
        "anim": "slide_in"
      },
      {
        "type": "text",
        "speaker": "主人公",
        "content": "「ドラゴン討伐か……悪くない話だ」"
      }
    ]
  }
}
```

## Command Types
* `text`: テキストウィンドウに文字を表示。クリックで次へ。
* `show_card` / `hide_card`: キャラクターカードを画面上の指定位置（Left/Center/Right）に出し入れする。
* `bg`: 背景（テーブルのマットや環境音）を変更。
* `choice`: 選択肢カードを提示し、ユーザーの入力待ちにする。`nextScene` で分岐。
* `jump`: 条件なしで別のシーンIDへ移動。
