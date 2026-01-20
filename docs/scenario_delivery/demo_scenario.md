<!-- ここに納品されたシナリオデータを貼り付けてください -->
[Start]
# シーン1: 酒場での導入

(BG: Tavern)
# GMは声のみの出演

GM: ようこそ、ボイスカードの世界へ。
GM: ここは全てがカードで描かれた、空想と冒険の世界だ。
GM: 君の目の前にあるのは、無数の傷が刻まれた木製のテーブル。

[NewTask: JobCard_Selection]
GM: まず、君には２つの選択肢が用意されている。
GM: 剣の道を究めるか、魔導の道を究めるか？

# シルエットのJobカードを2枚提示
(Show: JobCard_Sword, Left)
(Show: JobCard_Magic, Right)

(Choice: 剣士 -> SetFlag: Job_Sword)
(Choice: 魔法使い -> SetFlag: Job_Magic)

GM: ……なるほど。それが君の選んだ道か。
(Hide: JobCard_Sword)
(Hide: JobCard_Magic)

GM: そして一枚の、古びた依頼書。「伝説の薬」を作るための、素材採取の依頼だ。

(Choice: 依頼書を手に取る -> MoveTo: Accept)
(Choice: 無視して酒を飲む -> MoveTo: Ignore)

[Accept]
(Show: Hero, Left)
GM: 君は静かに頷き、そのカードを手に取った。
GM: 素晴らしい。その決断が、運命の歯車を回すことになる。
(Jump: Forest_Scene)

[Ignore]
GM: 君はグラスを傾け、紫煙の向こうへ視線をやった。
GM: ……ふむ。今はまだ、旅立ちの気分ではないかな？
GM: だが、酒場のマスターが無言で出口を指差している。どうやら、冒険へ出かける潮時のようだ。
(Jump: Forest_Scene)

[Forest_Scene]
# シーン2: 森の探索

(BG: DeepForest)
(Show: Hero, Left)
(Show: Partner, Right)
GM: 街の喧騒を離れ、鬱蒼とした森の中へ。
GM: 隣を歩くのは、幼馴染のリナだ。
GM: 彼女は大きな地図を広げ……おや、逆さまに持っているね。

リナ: 「こっちであってるよね？ ……たぶん！」
GM: 彼女の指差す先は、道なき藪の中だ。
GM: だが、そんな失敗も旅のスパイスなのかもしれない。

(Choice: リナに注意する -> MoveTo: Caution)
(Choice: 黙ってついていく -> MoveTo: Follow)

[Caution]
主人公: 「……地図が逆だ」
GM: 君が優しく指摘すると、彼女は慌てて地図を直した。
リナ: 「わ、わかってたし！ 視点を変えて見てただけだし！」
(Jump: Forest_Event)

[Follow]
GM: 君は何も言わず、彼女のペースに合わせることにした。
GM: 道に迷うのも、また冒険の醍醐味だからね。
(Jump: Forest_Event)

[Forest_Event]
GM: その時、森の空気が変わった。
GM: 鳥たちのさえずりが止み、静寂があたりを包み込む。

(Show: Hero, Center)
(Hide: Partner)
GM: 君は本能的に剣の柄に手をかけた。
GM: 闇の奥から、こちらを伺う視線を感じる……。

[Boss_Encounter]
# シーン3: ボス戦〜結末

(BG: DeepForest_Boss)
(Show: Monster, Center)
GM: 茂みをかき分け現れたのは、森の主。
GM: その巨大な爪は、君たちの覚悟を試すように光っている。

リナ: 「ひゃっ！？ お、大きい……！」
GM: リナが悲鳴を上げ、君の背中に隠れる。
GM: 恐れることはない。君の手札には、勇気というカードがあるはずだ。
GM: さあ、盤上の駒を進めようか。

[Battle: Start_Boss_Monster]

[Battle_End]
(BG: DeepForest)
(Hide: Monster)
(Show: Hero, Left)
(Show: Partner, Right)

GM: 見事だ。君の一撃が、森の静寂を取り戻した。
GM: 倒れた主の背後……開けた視界の先に、美しい花畑が広がっている。

(BG: FlowerGarden)
リナ: 「わぁ……！ 見て、あそこに咲いてるのって！」
GM: そこに咲いていたのは、夜露に濡れて輝く「月光草」。
GM: 探し求めていた、薬の材料だ。

リナ: 「やったぁ！ 私たち、最強のコンビだね！」
GM: リナの笑顔が、勝利の喜びを彩る。
GM: 君もまた、安堵の息をついたことだろう。

GM: こうして、最初の冒険は幕を閉じた。
GM: だが、世界は広く、カードの山はまだ残されている。
GM: 次のページをめくる時まで……しばしの休息といこうか。

(End)