+++
draft = false
tags = [
    "event", "CG", "レイマーチング", "GLSL", "SESSIONS", "TokyoDemoFest", "LiveCoding"
]
title = "映画館でGLSLライブコーディングをしました（第10回新千歳空港国際アニメーション映画祭）"
slug = "livecoding-airport-animefes2023"
date = "2023-11-20T10:50:40+09:00"
image = "/images/posts/2023-11-20-livecoding-airport-animefes2023/C20231104_0197.MP4_snapshot_17.56.475.jpg"
toc = true
math = false

+++

# はじめに

11月2日～11月6日に開催された[第10回新千歳空港国際アニメーション映画祭](https://airport-anifes.jp/)でデモシーンの上映とGLSLのシェーダーライブコーディングをしました。

![GLSLライブコーディング@第10回新千歳空港国際アニメーション映画祭](/images/posts/2023-11-20-livecoding-airport-animefes2023/C20231104_0197.MP4_snapshot_17.56.475.jpg)

<!--more-->

今回のアニメーション映画祭では、[SESSIONS](https://sessions.frontl1ne.net/)として2つのプログラムを行いました。

- [トーク：技術が中心の創作活動「テクニカルクリエーション」と「デモシーン」](https://airport-anifes.jp/programs/talk_technical_creation/)
- [上映＋ライブ：「デモシーン」で表現される世界と「ライブコーディング」の世界](https://airport-anifes.jp/programs/live_demoscene/)

1つ目のプログラムでは、[@FL1NE](https://twitter.com/FL1NE)さんがデモシーンが生まれた歴史であったり、テクニカルクリエーションやそのイベントであるSESSIONSの説明を行いました。
デモシーンの歴史について網羅されている資料は少なく、とても貴重な発表だと感じました。

2つ目のプログラムでは、前半は@FL1NEさんが司会を務めながら映画館で国内外のデモシーンの上映を行い、後半は私と[@Renardealer](https://twitter.com/Renardealer)さんの2人でGLSLのシェーダーライブコーディングを行いました。
映画館という超大画面＋最高の音響でのライブコーディングは本当に楽しかったです！！
音楽も[@himazin917](https://twitter.com/himazin917)さんのSonic Piによるライブコーディングの演奏でした。

# デモシーン上映

国内外のデモシーン9作品を上映しました。

PCデモから64K Introや4K Introまで幅広くセレクトしました。
動画の再生ではなく、その場でのexeファイルの実行によるリアルタイムの本当のデモシーンの上映を行いました。

![映画館で上映されたWORMHOLE](/images/posts/2023-11-20-livecoding-airport-animefes2023/C20231104_0193.MP4_snapshot_13.14.026.jpg)

私と[@sadakkey](https://twitter.com/sadakkey)さんによる作品である[WORMHOLE](https://www.youtube.com/watch?v=NMNJV-Pbqtk)も上映されました。

自分の作品が映画館で上映されているという事実が信じられず、非日常体験だなぁと思いました。

2nd Stage BOSSなど個人的に大好きなデモも映画館で見られました！

![映画館で上映された2nd Stage BOSS](/images/posts/2023-11-20-livecoding-airport-animefes2023/C20231104_0193.MP4_snapshot_46.17.407.jpg)
# GLSLライブコーディング

Renardと2人でBonzomaticというライブコーディング用のエディターをつかったGLSLライブコーディングを行いました。

今回はエキシビションということで一部の関数は持ち込みOKのルールで行いました。
時間制限はRevisionのShaderShowdownと同じく25分でした。

<blockquote class="twitter-tweet" data-conversation="none"><p lang="ja" dir="ltr">25分間のGLSLライブコーディングでした。<br><br>今回はエキシビションということで一部の関数は持ち込みOKのルールで行いました。<br><br>トラブルでFFT（サウンドを拾う機能）が動作しなかったのと、時間が足りずにシーン切り替えの実装は間に合わなかったので、動画用にコードを少しだけ修正しています。 <a href="https://t.co/LQoERgILPG">pic.twitter.com/LQoERgILPG</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1721025346848653593?ref_src=twsrc%5Etfw">November 5, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

ライブコーディングの楽しさは雰囲気を知ってもらうことが目標だったので、解説を交えながら、複数のシーンを次々に切り替えていく作戦でいきました。

- シーン1: IFSによるトンネルのシーン
- シーン2: MengerSpongeをベースにして[WORMHOLE](https://www.youtube.com/watch?v=NMNJV-Pbqtk)風のトンネルのシーン
- シーン3: Mandelboxのシーン
- シーン4: シーン3を[正解するカド](https://seikaisuru-kado.com/)の「カド」風にしたシーン

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">第10回新千歳空港国際アニメーション映画祭で「GLSL ライブコーディング」を行いました。<br><br>音楽も <a href="https://twitter.com/himazin917?ref_src=twsrc%5Etfw">@himazin917</a> さんのSonic Piによるライブコーディングによる演奏です。<br><br>映画館という超大画面＋最高の音響でのライブコーディング、本当に楽しかった！！！<a href="https://twitter.com/hashtag/newchitose2023?src=hash&amp;ref_src=twsrc%5Etfw">#newchitose2023</a> <a href="https://twitter.com/hashtag/SESSIONS_Party?src=hash&amp;ref_src=twsrc%5Etfw">#SESSIONS_Party</a> <a href="https://t.co/kbpZcDgZq9">pic.twitter.com/kbpZcDgZq9</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1721024192278409556?ref_src=twsrc%5Etfw">November 5, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

正解するカドが伝わるのか正直あまり自信がなかったのですが、意外に反応が良かったのでホッとしました。

途中でバグらせてしまって時間が足りなくなってしまいましたが、むしろライブ感が演出できて結果的には良かったのかなと思います。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr"><a href="https://t.co/GoB6m63pvx">https://t.co/GoB6m63pvx</a><br>第10回新千歳空港国際アニメーション映画祭にて25分にわたるライブコーディングをしました！<br>音楽も <a href="https://twitter.com/himazin917?ref_src=twsrc%5Etfw">@himazin917</a> さんによるライブコーディングです！<br><br>(本番の録画が出来なかったのでこれは練習の録画ですが、本番でも同じ絵が出せました！)<a href="https://twitter.com/hashtag/newchitose2023?src=hash&amp;ref_src=twsrc%5Etfw">#newchitose2023</a> <a href="https://twitter.com/hashtag/SESSIONS_Party?src=hash&amp;ref_src=twsrc%5Etfw">#SESSIONS_Party</a> <a href="https://t.co/LdQnLTYL0x">pic.twitter.com/LdQnLTYL0x</a></p>&mdash; Renard (@Renardealer) <a href="https://twitter.com/Renardealer/status/1721195825932743087?ref_src=twsrc%5Etfw">November 5, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

対戦相手であるRenardさんの作品は素晴らしかったです。
タイル張りの複数のシーンがおしゃれにトランジションで切り替わり、さらにカメラのアニメーションやトランジションのバーのアニメーションが心地よく、非常に高いクオリティの作品でした！

エキシビションだったので順位付けはありませんでした。

# 感想

映画館という最高の環境でデモシーンを上映したり、ライブコーディングを行うことができて、本当に楽しかったです。

このような貴重なチャンスをいただけて本当に嬉しく思います。

ライブコーディング中に歓声があがったり、プログラム終了後の時間だったり、映画祭の関係者のパーティーでも興味をもってくださった方々からたくさん感想や質問をいただいて、やって良かったと心から思いました。

Twitter上でもたくさん感想をいただけて嬉しかったです！

映画祭のスタッフの方々、参加者の方々、デモシーンの上映とライブコーディング用にハイエンドPCを手配してくださったツクモ様、本当にありがとうございました！！！

<blockquote class="twitter-tweet" data-conversation="none"><p lang="ja" dir="ltr">上映＋ライブ：「デモシーン」で表現される世界と「ライブコーディング」の世界、後半ライブコーディングは見てて楽しい凄い体験でした。<br><br>コーディング変更する度に背景映像や音が変わっていくのは圧巻。これは凄い。<br><br>そして、ここでまさか正解するカドが出てくるとは思わず笑った。まさがさかだよ <a href="https://t.co/OUJtMax3MB">pic.twitter.com/OUJtMax3MB</a></p>&mdash; NOG (@NOGjp) <a href="https://twitter.com/NOGjp/status/1720779213186482574?ref_src=twsrc%5Etfw">November 4, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-conversation="none"><p lang="ja" dir="ltr">二日目は25アニメ &amp; 1ソフトクリームでした！　ライブコーディングも凄かったです！</p>&mdash; 南野これ式　コミティアQ38b (@mebaGna) <a href="https://twitter.com/mebaGna/status/1720783163826565600?ref_src=twsrc%5Etfw">November 4, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">これ実際に見たんだけどライブコーディングかなり面白かった。25分でMVのようなデモシーンが出来ちゃうの凄い世界だね</p>&mdash; サチイ (@mg_sachi1) <a href="https://twitter.com/mg_sachi1/status/1720789301703950827?ref_src=twsrc%5Etfw">November 4, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">第10回新千歳空港国際アニメーション映画祭」今日の最後は、上映＋ライブ『「デモシーン」で表現される世界と「ライブコーディング」の世界』へ。凄い世界でした。リアルタイムに映像や音楽を生成するプログラムを制作する「デモシーン」をはじめとしたテクニカルクリエーションのイベント「SESSIONS」… <a href="https://t.co/Sxjt3CsSQS">pic.twitter.com/Sxjt3CsSQS</a></p>&mdash; 矢倉 あゆみ (@babyish_guide) <a href="https://twitter.com/babyish_guide/status/1720814720289219035?ref_src=twsrc%5Etfw">November 4, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">今日の最後の方シアター2でやってた「デモシーン」で表現される世界と⁰「ライブコーディング」の世界、めっっっっっっちゃくちゃ面白かった！！！！！！！👏👏👏👏👏👏<br>面白すぎてそのまま帰りたくなくて、数人でプロント閉店時間まで面白すぎたね…！と語り合いました😂😂<a href="https://twitter.com/hashtag/newchitose2023?src=hash&amp;ref_src=twsrc%5Etfw">#newchitose2023</a><a href="https://twitter.com/hashtag/SESSIONS?src=hash&amp;ref_src=twsrc%5Etfw">#SESSIONS</a></p>&mdash; さとうゆか / SATO Yuka (@satoyuka_01) <a href="https://twitter.com/satoyuka_01/status/1720838739130523962?ref_src=twsrc%5Etfw">November 4, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">昨日のライブコーディングは良かったよなー。<br><br>あの環境、絶対楽しいと思うので、家帰ったら構築してみたい。でも解説サイトとかあるんかな？</p>&mdash; NOG (@NOGjp) <a href="https://twitter.com/NOGjp/status/1720927272461545735?ref_src=twsrc%5Etfw">November 4, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">「上映＋ライブ：「デモシーン」で表現される世界と「ライブコーディング」の世界」最高すぎた……！　「メガデモ」の傑作選にくわえ（なんと4KBの作品も！）、コーディングによってリアルタイムで映像を生成する「ライブコーティング」のデモンストレーションも！<a href="https://twitter.com/hashtag/newchitose2023?src=hash&amp;ref_src=twsrc%5Etfw">#newchitose2023</a> <a href="https://twitter.com/hashtag/SESSIONS_Party?src=hash&amp;ref_src=twsrc%5Etfw">#SESSIONS_Party</a> <a href="https://t.co/PJbbbyL5Oa">pic.twitter.com/PJbbbyL5Oa</a></p>&mdash; 田中大裕(Daisuke Tanaka) (@diecoo1025) <a href="https://twitter.com/diecoo1025/status/1721152668998189144?ref_src=twsrc%5Etfw">November 5, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">まさか映画祭でライブコーディングを楽しめるとは。。最高でした <a href="https://t.co/SVbHJnHnS6">https://t.co/SVbHJnHnS6</a></p>&mdash; Achabox (@achabox) <a href="https://twitter.com/achabox/status/1721206960912257467?ref_src=twsrc%5Etfw">November 5, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


## キーボードが使えないトラブル

ライブコーディング用に[いつも使っている無線キーボード](https://amzn.to/46pfG4W)を持ち込んだのに、USBのレシーバーを家に忘れるというミスをしました。
詰んだかと思われたのですが、Bluetoothでも接続できたのでセーフでした。危なかった！

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">ライブコーディングのために愛用の無線キーボードを北海道まで飛行機で持ってきたのに、レシーバーを家に置いてきた😇</p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1720386131488133405?ref_src=twsrc%5Etfw">November 3, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

# 映画祭の感想

映画祭というイベントは初参加だったので、とても新鮮に楽しめました。

印象に残ったプログラムは[葬送のフリーレン（スタッフトーク付き）](https://airport-anifes.jp/programs/frieren_anime/)です。
アニメの4話まで上映した後、スタッフトークがあり、制作の裏話を聞くことができました。アニメ放送中で忙しい中のご対応に感謝しかありませんでした。

[駒田蒸留所へようこそ](https://airport-anifes.jp/feature_item/komada-a-whisky-family/)の先行上映もありました。
幻のウイスキー「KOMA」を復活させるために奮闘する話でしたが、人間ドラマもとても良かったです。
ウイスキーの設定や監修が本格的で解像度が高く、世界にぐっと引き込まれました。
11月10日から一般の劇場でも公開されています。とても良い作品だったので、ぜひ映画館で見てください。

いろんな短編作品が上映される[コンペティション](https://airport-anifes.jp/programs/compe_jp/)や[音楽ライブ](https://airport-anifes.jp/programs/otototabi_newchitose2023/)も楽しかったです。
コンペティションは投票で順位が決まるので、デモシーンに通じるものを感じました。

新千歳空港国際も商業施設が充実していて驚きました。
会期中は空港内のホテルに滞在していたので、3日くらい空港から外に一歩も出なかったのですが、飽きることなく楽しめました。空港の温泉も露天風呂があって良かったです。