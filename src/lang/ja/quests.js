/* global Quest */

Quest.quests =  {
    "tutorial-start": {
        name: "開始",
        desc: [
            "ようこそ、開拓者！",
            "初めまして、私はここで皆さんにサバイバルの基礎を教えています。 ここに訪れたすべての人が、私の講義を受講しています。",
        ],
        final: "素晴らしい！",
    },
    "craft-1": {
        name: "素材の採取",
        desc: "この自然の大地で生き残るためには道具が必要不可欠です。 道具を作るには素材が必要です。 石を４個、枝を２本、小枝を１本 手に入れてきてください。",
        tip: "木を右クリックしてください。 <rmb>枝/小枝を取る</rmb>。 石は地面から拾ってください。 <lmb></lmb>.",
    },
    "craft-1-2": {
        name: "ナイフの柄を作る",
        desc: "枝と小枝を加工して葉を取り除いてください。 私たちはそれらを使って道具の柄を作ります。",
        tip: "枝と小枝を右クリックして<rmb>加工</rmb>すれば要らない葉が取れ、クラフトに使えるようになります。",
    },
    "craft-2": {
        name: "ナイフの刃を作る",
        desc: "ナイフには刃が必要ですね。 石を使って「尖った石」を作成してみましょう。",
        tip: "「尖った石」の<lmb>アイコンをクリック</lmb>し、作成してみましょう。 レシピウィンドウは「F」キーでも開くことができます。",
    },
    "craft-2-1": {
        name: "ナイフの作成",
        desc: "さて、準備はできましたね。 これらの素材を使って、あなたは「石のナイフ」を作成することができます。",
        tip: "「ナイフ」の<lmb>アイコンをクリック</lmb>し、作成してみましょう。 レシピウィンドウは「F」キーでも開くことができます。",
    },
    "craft-3": {
        name: "武器の作成",
        desc: "さて、次はあなたに最初の武器である「尖った棒」の作り方を教えます。 「尖った棒」の作成にはナイフが必要です。 先程作った「石のナイフ」を装備してから作成しましょう。",
        tip: "インベントリを開き、「石のナイフ」を右クリックして<rmb>装備</rmb>し、「尖った棒」を作成してみましょう。",
    },
    "stat-1": {
        name:  "喉の渇き",
        desc: "次は食べ物と水の入手方法をお教えます。 この部屋には小さな水源があります。 木から樹皮を剥がして「樹皮製のマグ」を作ってから、浅瀬に立ち 水を入れてください。 心配しなくていいですよ、ここの水は奇麗ですから。",
        tip: "<rmb>水を</rmb> 飲むことでスタミナが回復します。<br>浅瀬に立ち「樹皮製のマグ」を右クリックし、<rmb>水を入れて</rmb>から飲んでみましょう。",
    },
    "stat-2": {
        name: "空腹",
        desc: "そろそろおなかが減ってくる頃じゃないですか？ ニワトリを殺して捌くなり、木からリンゴをむしり取るなり、様々な方法で食料を手に入れることができます。 ですが注意してください、必要以上に食べ過ぎてしまうと食料から栄養が摂れなくなってしまいます。 ステータスやスキルを向上させるためには栄養が必要不可欠です。 もし食べ過ぎてしまったら、私の隣にあるトイレを<rmb>使いなさい</rmb>。 大丈夫、見たりしませんよ。",
        tip: "食べ物を<rmb>食べる</rmb>ことで、栄養を摂ることができます。 満腹度が100以上になると、食べ物を食べても栄養が摂れなくなりますので注意してください。キャラクターのステータスを表示させるには、画面左上のキャラクターを<lmb>クリック</lmb>してください。",
    },
    "fight": {
        voice: true,
        name: "戦闘方法",
        desc: "さて、この部屋ではあなたに戦闘方法を伝授します。 ここに戦闘訓練用のダミーがあります。 右手に「尖った棒」を<rmb>装備</rmb>して、ダミーを切ったり叩いたりしてみてください。",
        tip: "画面右下に表示されている、1から5までのショートカットを使い ダミーを攻撃してみましょう。",
    },
    "finish": {
        name: "ひとまず",
        desc: "これでチュートリアルは終了です。",
        final: "とりあえず仕事も終わったことですし、町に戻るとしましょうか。",
    },
    "claim-get-license": {
        name: "権利書",
        desc: "新人の方ですね、こんにちは。突然ですが、この世界を動かしているのはお金です。そんな大切なお金を道端に置いておくわけにはいきませんよね。今日はそんな大切なお金と、貴重な荷物を安全に保管する方法をお教えましょう。私の銀行にお金を預けられる事はもうご存知ですよね？荷物に関しては、ご自分の土地に保管してみてはいかがでしょう？この権利書があれば、お好きな場所に土地を持つ事ができますよ。",
        tip: "銀行にいるスクルージから土地の権利書を購入する事ができます",
    },
    "claim-build": {
        name: "建築",
        desc: [
            "安全と安心の為です。多少の出費は我慢してくださいね。",
            "これであなたは好きな土地を手に入れる事ができ、更にはその土地を拡張する事もできます。",
            "まあそう焦らないで、落ち着いてじっくり探しましょう。引っ越しや、新たな土地を購入する事も可能ですが、その都度お金がかかりますからね。",
            "土地を手に入れたら、復活の石を設置するのを忘れないで下さいね。素早く帰還出来るようになりますよ。",
        ],
        tip: "土地を見つけたら、作成画面(Fキー)から領有地のシンボルを作りましょう",
    },
    "claim-extend": {
        name: "拡張",
        desc: "素敵な場所が見つかったようで 良かったですね。ご希望であれば土地を拡張する事ができますよ。もちろん、領地税も増えてしまいますがね。常に銀行の預金残高には目を配っておきましょう。領地税が支払えないと、大切な土地を失うことになってしまいますからね。",
        final: "私からは以上になります。これであなたは自由に建築を行うことができます。最後に、強盗には気を付けて下さいね。腕に自信があるなら犯罪者をこらしめるのも良し、法は常に正しい者の味方ですから。そういえば、肉屋さんがあなたに何か伝えたい事があるそうですよ。会いに行ってみて下さい。"
    },
    "tp-return-home": {
        name: "テレポート: 帰還" ,
        desc: "テレポートに興味はありますか？ 私は皆さんに世界中を自由に旅する方法を教えています。<br>ここ、シノデ帝国領土内の地上にいるかぎり、あなたは簡単に自宅や、この町に帰還することができます。",
        "tip": "画面左上のキャラクターを<rmb>右クリック</rmb>し、「帰還」を選択してください。",
    },
    "tp-respawn": {
        name: "テレポート: 復活の石",
        desc: "この町にある「復活の石」は、町の外にある「復活の石」と繋がっています。<br>「復活の石」を<lmb>使用</lmb>すると、この町にテレポートする事ができます。 また、死亡時に復活する場所にもなります。 自分の領地を手に入れたら、まずは「復活の石」を作ってみましょう。",
        tip: "<lmb></lmb>町にある「復活の石」をクリックしてください。"
    },
    "tp-scrolls": {
        name: "帰還スクロール",
        desc: "「タウンポータルのスクロール」は地下を探索する際の大きな助けになります。これを使用すると、地下などの帰還が使えない場所でも、安全に帰還することができます。<br>このスクロールは、町で購入したり、自分で作成することができます。",        final: "さて、これでもう町の外に出ても大丈夫そうですね。この町にある「ポータル」から町の外へ出ることができます。"
    },
    "faction-daily-1": {
        name: "あなたの派閥を支援する(daily)",
        desc: "派閥内のあなたの地位を上げる",
    },
    "garland-daily": {
        name: "ガーランド (daily)",
        desc: "サンタが花輪を作るのを助ける",
    },
    "chrismas-flags-daily": {
        name: "フラグ (daily)",
        desc: "サンタが旗を作るのを助ける",
    },
    "chrismas-decoration-daily-1": {
        name: "デコレーション (daily)",
        desc: "サンタの紙で女の子の飾りを作るのを助ける",
    },
    "chrismas-decoration-daily-2": {
        name: "ガラス装飾 (daily)",
        desc: "サンタのガラスで女の子の飾りを作るのを助ける",
    },
    "chrismas": {
        name: "クリスマスの帽子",
        desc: "メリークリスマスと新年あけましておめでとうございます！ 私はあなたにクリスマスハットをプレゼント！",
        final: "ここに貴方の帽子があるよ",
        customReward: "クリスマスの帽子",
    },
    "chrismas-presents": {
        name: "クリスマスの贈り物だよ.",
        desc: "さ〜クリスマスプレゼントが欲しいですか？?",
        final: "ここに貴方へのプレゼントがあります。",
    },

    "buy-small-indulgence": {
        name: "心からの贖罪",
        desc: [
            "懺悔しなさい。悔い改めなさい。あなたの魂を正しい道へ導くのです。",
            "神の前に跪いた時、全ては愛により許されるでしょう。",
        ],
    },
        customReward: "+100 カルマ",

    "buy-average-indulgence": {
        name: "命を懸けた贖罪",
        desc: [
            "懺悔しなさい。悔い改めなさい。あなたの魂を正しい道へ導くのです。",
            "神の前に跪いた時、全ては愛により許されるでしょう。",
        ],
        customReward: "+1000 カルマ",
    },
    "buy-big-indulgence": {
        name: "魂をかけた贖罪",
        desc: [
            "懺悔しなさい。悔い改めなさい。あなたの魂を正しい道へ導くのです。",
            "神の前に跪いた時、全ては愛により許されるでしょう。",
        ],
        customReward: "+10000 カルマ",
    }
};
