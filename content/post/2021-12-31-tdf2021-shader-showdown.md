+++
date = "2021-12-31T00:00:00+09:00"
image = "/images/posts/2021-12-31-tdf2021-shader-showdown/Collage_Fotor_v3.jpg"
toc = true
math = false
draft = false
tags = [
    "event", "CG", "レイマーチング", "TokyoDemoFest", "GLSL"
]
title = "Tokyo Demo Fest 2021のShader Showdownに参加しました"
slug = "tdf2021-shader-showdown"

+++

12月11日～12日にオンラインで開催された[Tokyo Demo Fest 2021](https://tokyodemofest.jp/)（以下、TDF）に参加しました。

TDFは、日本国内で唯一のデモパーティです。
リアルタイムに映像や音楽を生成するプログラムを「デモ」と言い、デモを鑑賞したり完成度を競ったりして楽しむイベントを「デモパーティ」と言います。
「デモシーン」はデモやデモパーティを中心としたコンピューターのサブカルチャーです。

TDFのShader Showdownというイベントに競技者として参加しました。

[![Collage_Fotor_v3](/images/posts/2021-12-31-tdf2021-shader-showdown/Collage_Fotor_v3.jpg)](/images/posts/2021-12-31-tdf2021-shader-showdown/Collage_Fotor_v3.png)

<!--more-->

また、TDFのGLSL Graphics Compoにも参加したので、こちらは別記事にまとめました。

- [Tokyo Demo Fest 2021のGLSL Graphics Compo優勝作品の解説 | gam0022.net](http://localhost:1313/blog/2021/12/20/tdf2021-glsl/)

# Shader Showdownとは

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">TokyoDemoFestのShader Showdownは、世界的なDemoparty「Revision」と同じレギュレーションで開催します。<br>試合の放映はパーティー当日12/11-12となります。乞うご期待……！ <a href="https://t.co/IlVue5npWz">pic.twitter.com/IlVue5npWz</a></p>&mdash; Tokyo Demo Fest 2021 (2021/12/11-12) (@TokyoDemoFest) <a href="https://twitter.com/TokyoDemoFest/status/1452275618997886976?ref_src=twsrc%5Etfw">October 24, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Shader Showdownとは25分間でシェーダーを書き、どちらの作品が良いかを決める競技です。

試合中は、一切のドキュメントの参照ができません。当然ながら必要な関数はすべて試合中に実装しないいけません。

1対1のトーナメント形式で開催され、試合の勝敗は観衆（ビジター）の投票によって決定します。今回は私を含めた8人でトーナメントを行いました。

対戦はGLSLのライブコーディングで行われます。[Bonzomatic](https://github.com/TheNuSan/Bonzomatic/releases/tag/v11)というアプリを利用し、対戦者の書いているコードやカーソルの位置が共有されます。

ビジターは対戦者が25分の制限時間の中でどのような戦略とアイデアをもってコードを書いていくかをすぐ隣でみているかのように体験できます。

詳しいGLSLライブコーディングの知識がなくても楽しめるよう、TDFでは対戦者がどのようなコードを書いているかのリアルタイムな解説があります。

# ライブコーディングした作品解説

今回のTDFでライブコーディングした作品を簡単に解説します。

TDFのShader Showdownの全作品は[livecode.demozoo.org](https://livecode.demozoo.org/party_series/174.html)にもアーカイブされています。

## Lightning Tunnel | Quarter-Final

準々決勝（Quarter-Final）の作品です。

稲妻が轟くトンネルをイメージして作りました。

ボリュームレンダリングをしてBloom感を出しています。ボリュームレンダリングの実装が雑なのでアーティファクトが発生しているのですが、むしろ雷の荒々しい感じが再現できて良かったです。

時間が余ったのでカメラのFoVのアニメーションをしたのですが、ちょっとワープっぽい効果になりました。

モデリングはIFSでやっています。IFSで狙った形状を出すことは困難なので、パラメーターは事前に調整をして暗記しておきました。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">25分でライブコーディングしたシェーダーです。<br><br>This shader was coded in 25 minutes.<br><br>Shader showdown quarter-final at <a href="https://twitter.com/hashtag/TokyoDemoFest?src=hash&amp;ref_src=twsrc%5Etfw">#TokyoDemoFest</a> <a href="https://twitter.com/hashtag/GLSL?src=hash&amp;ref_src=twsrc%5Etfw">#GLSL</a> <a href="https://twitter.com/hashtag/Bonzomatic?src=hash&amp;ref_src=twsrc%5Etfw">#Bonzomatic</a> <a href="https://twitter.com/hashtag/Shader?src=hash&amp;ref_src=twsrc%5Etfw">#Shader</a> <a href="https://twitter.com/hashtag/LiveCoding?src=hash&amp;ref_src=twsrc%5Etfw">#LiveCoding</a> <a href="https://t.co/WTw7tHVsbk">pic.twitter.com/WTw7tHVsbk</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1469562828831195140?ref_src=twsrc%5Etfw">December 11, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

- [Shadertoy](https://www.shadertoy.com/view/sl3XWM)
- [NEORT](https://neort.io/art/c6qm3ls3p9f3hsje6360)

YouTubeのアーカイブ（Day1の2:15頃）です。

<div class="movie-wrap">
<iframe width="1920" height="1080" src="https://www.youtube.com/embed/2s9KfMn1J9M?start=8114" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## VJ feat. Niko_14 | Semi-Final

準決勝（Semi-Final）の作品です。

[Niko_14](https://twitter.com/himazin917)さんの音楽がとても素晴らしかったので、音楽と同期したVJに挑戦しました。

試合の前日に自分の試合の音楽担当はNiko_14さんと聞いたので、そのタイミングでVJをする決意をしました。

VJっぽい絵を狙ったことが無かったのですが、ほぼ狙い通りのバキバキな感じにできたので良かったです。
シェーダーの構成としてはQuarter-Finalとほぼ同じで、IFSとボリュームレンダリングの組み合わせです。
IFSのパラメーターは適当だったのですが、ちゃんと狙い通りの絵になったので良かったです。

色はFFT（音楽の周波数ごとのボリューム）に対応していて、低音が赤、中音が緑、高音が青に対応しています。
キックの音が支配的だったので、キックに合わせて赤～ピンクっぽいビームが発生しています。

Twitterの動画の4秒頃のように、音が切り替わるタイミングでサウンドリアクティブになっているのが分かりやすいと思います。ぜひ音声をONにして再生してください！

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">25分でライブコーディングしたシェーダーです。<br>かっこいい音楽は <a href="https://twitter.com/himazin917?ref_src=twsrc%5Etfw">@himazin917</a> さん制作です！<br><br>This shader was coded in 25 minutes.<br>Sound by <a href="https://twitter.com/himazin917?ref_src=twsrc%5Etfw">@himazin917</a><br><br>Shader showdown semi-final at <a href="https://twitter.com/hashtag/TokyoDemoFest?src=hash&amp;ref_src=twsrc%5Etfw">#TokyoDemoFest</a> <a href="https://twitter.com/hashtag/GLSL?src=hash&amp;ref_src=twsrc%5Etfw">#GLSL</a> <a href="https://twitter.com/hashtag/Bonzomatic?src=hash&amp;ref_src=twsrc%5Etfw">#Bonzomatic</a> <a href="https://twitter.com/hashtag/Shader?src=hash&amp;ref_src=twsrc%5Etfw">#Shader</a> <a href="https://twitter.com/hashtag/LiveCoding?src=hash&amp;ref_src=twsrc%5Etfw">#LiveCoding</a> <a href="https://t.co/HzUpd9le3t">pic.twitter.com/HzUpd9le3t</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1469924900257562627?ref_src=twsrc%5Etfw">December 12, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

- [Shadertoy](https://www.shadertoy.com/view/NttSRS)
    - ShadertoyのSoundcloud連携が機能していないため、音楽はNiko_14さんのものではなく、仮です。

YouTubeのアーカイブ（Day2の1:41頃）です。

<div class="movie-wrap">
<iframe width="1920" height="1080" src="https://www.youtube.com/embed/bp37xTVNRrM?start=6086" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

VJっぽいバキバキとした絵の方向性やFFTを用いたサウンドリアクティブなシェーダーはこれまで挑戦したことのないジャンルだったので、新しい方向性を模索する良い経験になりました。

Semi-Finalでは[Kamoshika](https://twitter.com/kamoshika_vrc)さんに負けてしまったのですが、試合後のコメントによると反射の処理には[『Unityゲーム プログラミング・バイブル 2nd Generation』の自分の章](https://gam0022.net/blog/2021/06/08/unity-bible2/)を参考にしてくださったそうで、めちゃくちゃありがてぇ🙏となりました。

Jugem-Tさんも実況による盛り上げありがとうございました！

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">凄い画同士の殴り合いの中BGMもライブコーディングで生成してる(Niko_14氏)とんでもない光景になっててヤバい<br><br>Shader Showdown準決勝 gam0022氏 vs Kamoshika氏<br>[LIVE]Tokyo Demo Fest 2021 Day2 <a href="https://t.co/648ZNFJTxk">https://t.co/648ZNFJTxk</a> <a href="https://twitter.com/YouTube?ref_src=twsrc%5Etfw">@YouTube</a>より <a href="https://twitter.com/hashtag/TokyoDemoFest?src=hash&amp;ref_src=twsrc%5Etfw">#TokyoDemoFest</a> <a href="https://t.co/atG6c8hWiK">pic.twitter.com/atG6c8hWiK</a></p>&mdash; Jugem-T 𓆡作業中 (@Jugem_T) <a href="https://twitter.com/Jugem_T/status/1469892859503734787?ref_src=twsrc%5Etfw">December 12, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

# 感想

大変でしたが、楽しかったです。

25分でできる範囲はかなり限られてくるので、詰め込める要素を取捨選択して、ミスをしないように実装するのは思っていたより難しく感じました。25分だとデバッグしている余裕はなくバグを生み出した瞬間に敗戦が濃厚になります。
距離関数も普段はコピペしているので暗記も大変でした。回転行列くらいは導出できるのですが、sdBoxは導出していたら時間がまったく足りません。

正直に言うと、まさかここまでレベルの高い戦いになるとは思っておらず、参加者のみなさんが凄すぎてちょっと心が折れそうでした。

とくにFinal（決勝）の[Kamoshika](https://twitter.com/kamoshika_vrc) vs [phi16](https://twitter.com/phi16_) の戦いは印象深かったです。

Kamoshikaさんは蝶、phi16さんはライブゲームと、両者とも "生命" を誕生させていました。偶然にもテーマが一致していてちょっと面白かったです。

とにかく実装量がえげつなく、これをライブコーディングでやるんだ…と驚かされました。
競技者として参加したことで、25分間でこの量をミスなく実装する困難さは痛いほど理解していたので、なおさら驚かされました。

両者ともミスなく作品を仕上げており、まさに決勝戦に相応しい素晴らしい戦いを見せていただきました🙏心の底から感動しました。

世界レベルの実力者の方々と戦えて本当に光栄でした！ありがとうございます！

Kamoshikaさん

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">25 minutes live coding at Shader Showdown Final.<a href="https://twitter.com/hashtag/TokyoDemoFest?src=hash&amp;ref_src=twsrc%5Etfw">#TokyoDemoFest</a> <a href="https://twitter.com/hashtag/GLSL?src=hash&amp;ref_src=twsrc%5Etfw">#GLSL</a> <a href="https://twitter.com/hashtag/Shader?src=hash&amp;ref_src=twsrc%5Etfw">#Shader</a> <a href="https://twitter.com/hashtag/LiveCoding?src=hash&amp;ref_src=twsrc%5Etfw">#LiveCoding</a> <a href="https://t.co/WeVq82f50E">pic.twitter.com/WeVq82f50E</a></p>&mdash; Kamoshika (@kamoshika_vrc) <a href="https://twitter.com/kamoshika_vrc/status/1470360600517971970?ref_src=twsrc%5Etfw">December 13, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

phi16さん

<blockquote class="twitter-tweet"><p lang="und" dir="ltr"><a href="https://t.co/qluYGj653s">pic.twitter.com/qluYGj653s</a></p>&mdash; phi16 (@phi16_) <a href="https://twitter.com/phi16_/status/1470104161320849409?ref_src=twsrc%5Etfw">December 12, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">記録 TDF2021 ShaderShowdown <a href="https://t.co/mMcSoYwh5U">https://t.co/mMcSoYwh5U</a></p>&mdash; phi16 (@phi16_) <a href="https://twitter.com/phi16_/status/1470415119708753921?ref_src=twsrc%5Etfw">December 13, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

YouTubeのアーカイブ（Day2の4:27頃）です。

Finalでは私も実況者の一人として参加しています。

<div class="movie-wrap">
<iframe width="1920" height="1080" src="https://www.youtube.com/embed/bp37xTVNRrM?t=16030" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">おつかれさまでした！<a href="https://twitter.com/hashtag/TokyoDemoFest?src=hash&amp;ref_src=twsrc%5Etfw">#TokyoDemoFest</a> <a href="https://t.co/h2yXCGGBYa">pic.twitter.com/h2yXCGGBYa</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1469999619409350657?ref_src=twsrc%5Etfw">December 12, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

# 練習

ライブコーディングの練習中の作品です。

Quarter-FinalのIFS+ボリュームレンダリングのアプローチは練習中に決めました。

トンネルのIFSのモデリングもよく見ると面影が残っています。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">情報量を追加（エンコード耐久テスト）<a href="https://twitter.com/hashtag/GLSL?src=hash&amp;ref_src=twsrc%5Etfw">#GLSL</a> <a href="https://twitter.com/hashtag/Raymarching?src=hash&amp;ref_src=twsrc%5Etfw">#Raymarching</a> <a href="https://t.co/uBg43zGOk6">pic.twitter.com/uBg43zGOk6</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1453405601971666944?ref_src=twsrc%5Etfw">October 27, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Diamond Variation 🔷 <a href="https://twitter.com/hashtag/GLSL?src=hash&amp;ref_src=twsrc%5Etfw">#GLSL</a> <a href="https://twitter.com/hashtag/Raymarching?src=hash&amp;ref_src=twsrc%5Etfw">#Raymarching</a> <a href="https://t.co/IAEhBgdW5s">pic.twitter.com/IAEhBgdW5s</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1453768374312263683?ref_src=twsrc%5Etfw">October 28, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/Shadertoy?src=hash&amp;ref_src=twsrc%5Etfw">#Shadertoy</a> にポートしました。<br><br>&quot;Diamond Tunnel&quot; by gam0022<a href="https://twitter.com/hashtag/GLSL?src=hash&amp;ref_src=twsrc%5Etfw">#GLSL</a> <a href="https://twitter.com/hashtag/Shader?src=hash&amp;ref_src=twsrc%5Etfw">#Shader</a><a href="https://t.co/oyyz8mop2x">https://t.co/oyyz8mop2x</a> <a href="https://t.co/DXnqCAKY1Z">pic.twitter.com/DXnqCAKY1Z</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1476576224768331776?ref_src=twsrc%5Etfw">December 30, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>