/* global Effects, T */

Effects.descriptions = {
    "Overeat": {
        "class": "bad",
        "effect": "キャラクターの移動速度が45に減少する。",
        "desc": "キャラクターの空腹値が100以上になると付与される。",
        "note": "この状態で更に食べ物を摂取すると、栄養もゼロ以下にまで減少します。効果を取り除く最速の方法は、トイレを利用することですが50％のヘルスを失います。 飲料水は過食を早く取り除くのにも役立ちます。",
    },
    "Starving": {
        "class": "bad",
        "effect": "体力が継続的に減少する。",
        "desc": "キャラクターの空腹値が0になったときに付与される。",
        "note": "あなたは餓えて死ぬかもしれません。",
    },
    "Thirsty": {
        "class": "bad",
        "effect": "キャラクターの移動速度が45減少し、体力も下がる。採掘したり、アイテムを持ち上げたりすることができなくなります。",
        "desc": "キャラクターのスタミナが0になったときに付与される。",
        "note": "",
    },
    "Lifting": {
        "class": "",
        "effect": "キャラクターの移動速度が45に減少する。",
        "desc": "キャラクターがアイテムを持ち上げて移動するときに付与される。",
        "note": "",
    },
    "Fire": {
        "class": "bad",
        "effect": "キャラクターは継続的ダメージを受ける (5秒間隔で30ダメージ)。",
        "desc": "いくつかの武器やクリーチャーによって攻撃された場合に付与されます。",
    },
    "Bleed": {
        "class": "bad",
        "effect": "キャラクターは継続的ダメージを受ける.",
        "desc": "クリーチャーによって攻撃されたときに受ける",
    },
    "Hangover": {
        "class": "",
        "effect": " +9 力, -9 素早さ.",
        "desc": "キャラクターがアルコールを飲んだときに得られる (ビール、ワイン).",
        "note": "重複効果なし",
    },
    "Sitting": {
        "class": "good",
        "effect": "喉の渇きによるスタミナの減少が緩やかになる。テーブルの横に座って食べ物を食べると、満腹度の増加を少し抑えることができます。",
        "desc": "キャラクターが椅子、玉座または切り株に座ったときに付与される。",
        "note": "",
    },
    "MushroomTrip": {
        "class": "",
        "effect": "移動速度が135に増加するが、幻覚を引き起こし、1ティック毎に3の継続的ダメージを受ける。",
        "desc": "キャラクターがキノコを食べると得られる。",
        "note": "キノコを食べた量によって被害は大きくなる",
    },
    "Sex": {
        "class": "good",
        "effect": "満腹度を10減少させ、スタミナが25増加します。",
        "desc": "マーゴから授かる。",
        "note": "効果時間　1.5分",
    },
    "Arena": {
        "class": "",
        "effect": "他プレイヤー殺害時のカルマ喪失、死亡時のペナルティ（飢餓、栄養の喪失、ラーニングポイントの喪失、所持品ドロップ）などのペナルティーが適用されなくなります。",
        "desc": "キャラクターがアリーナ内にいる間付与される。",
        "note": "",
    },
    "Riding": {
        "class": "good",
        "effect": "キャラクターの移動速度が大幅に向上します。 アイテムを持ち上げる事による移動速度低下ペナルティーは適用されません。",
        "desc": "キャラクターが馬に乗ったときに付与される。",
        "note": "",
    },
    "Slowed": {
        "class": "bad",
        "effect": "キャラクター移動速度が45に減少します。",
        "desc": "速度低下呪文を唱えるモンスターの攻撃範囲内に位置すると付与される。このようなモンスターには近づかないようにしましょう。",
        "note": "重複効果なし",
    },
    "High": {
        "class": "good",
        "effect": "食べ物を食べた時の満腹度の増加を抑えます。紙巻きたばこの品質1：5％、葉巻の品質1：10％、マリファナの品質1：15％。 品質が高いほどパーセンテージが高くなります。",
        "desc": "紙巻きたばこ、葉巻、マリファナなどを使用すると付与されます。",
        "note": "12ティックで体力の12％を回復します。",
    },
    "Weakness": {
        "class": "bad",
        "effect": "キャラクターの移動速度は45に減少します。さらにキャラクターは戦闘でほとんどダメージを与えられなくなります。",
        "desc": "死後キャラクターが復活したときに付与される。",
        "note": "増強薬を使用すると消えます。",
    },
    "ActivatedCarbon": {
        "class": "good",
        "effect": "すべての栄養を0にする。排便時の悪影響を取り除きます。",
        "desc": "活性薬を飲むと付与されます。",
    },
    "Drunk": {
        "class": "good",
        "effect": "体力を少し回復します。たまに、思ったことが勝手に口に出てしまいます。",
        "desc": "アルコールを飲むと付与される。",
        "note": "飲み過ぎると、活性薬でさえ、二日酔いから救うことはできません。",
    },
    "Plague": {
        "class": "bad",
        "effect": "死ぬまで体力が奪われていきます。",
        "desc": "ゴミの近くに立ったり、性交時に付与される場合があります。",
        "note": "抗ペスト薬を飲むと治療できます。",
    },
    "SynodProtection": {
        "class": "good",
        "effect": "PvPで受けるダメージが80％減少します。",
        "desc": "反撃したり、キャラクターのカルマがマイナスの場合は効果が無くなります。地下では付与されません。",
        "note": "帰還 を使えるようになります。",
    },
    "Prospecting": {
        "class": "good",
        "effect": "近くの鉱石が見えるようになります。",
        "desc": "探知機を使うと付与されます。",
    },
    "NewbieProtection": {
        "class": "",
        "effect": "死のペナルティ",
        "desc": "Lvl 1〜9：袋の中身は失いません。\nLvl 10〜19：袋は失いませんが、中身は失われます。\n Lvl 20：全てを失います。",
        "note": "どのレベルでも、すべての栄養とラーニング・ポイントを失います。",
    },
    "De": {
        "class": "fight",
        "effect": T.help.combos.de.effect,
        "desc": T.help.combos.de.desc,
   },
    "Su": {
        "class": "fight",
        "effect": T.help.combos.su.effect,
        "desc": T.help.combos.su.desc,
    },
    "Nya": {
        "class": "fight",
        "effect": T.help.combos.nya.effect,
        "desc": T.help.combos.nya.desc,
    },
    "Inspiration": {
        "class": "fight",
        "effect": "Increases crit chance; with [де] increases damage absorption.",
        "desc": "AoE buff"
    },
};
