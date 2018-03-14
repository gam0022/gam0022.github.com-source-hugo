+++
image = "/images/posts/2018-03-12-demoscene-study-session/slide.jpg"
toc = true
math = false
draft = false
tags = [
"event", "CG", "レイマーチング"
]
title = "メガデモ勉強会!2018で発表しました"
slug = "demoscene-study-session"
date = "2018-03-12T10:14:35+09:00"

+++

3/10（土）に開催された[メガデモ勉強会! 2018](https://atnd.org/events/93843)で発表しました。

発表タイトルは「綺麗で写実的な絵作りをしたい！レイマーチング向けのシェーディング技術」です。
前半に写実的なレンダリングに不可欠な大域照明について説明し、
後半でレイマーチングによる大域照明の実装方法を説明しました。

<script async class="speakerdeck-embed" data-id="74ea75d0686849238368f73150a7adba" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

<!--more-->

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">本日の発表資料です😇 <a href="https://twitter.com/hashtag/%E3%83%A1%E3%82%AC%E3%83%87%E3%83%A2%E5%8B%89%E5%BC%B7%E4%BC%9A?src=hash&amp;ref_src=twsrc%5Etfw">#メガデモ勉強会</a><a href="https://t.co/pxqSbH3DPl">https://t.co/pxqSbH3DPl</a></p>&mdash; がむ😇 (@gam0022) <a href="https://twitter.com/gam0022/status/972340970892111874?ref_src=twsrc%5Etfw">2018年3月10日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


# その他の発表まとめ

公開されている自分以外の発表資料をまとめました。

## @notargs さんの「デモのためのUnity講座」

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">本日のメガデモ勉強会で発表した資料です<a href="https://t.co/DStmEyNQ5a">https://t.co/DStmEyNQ5a</a> <a href="https://twitter.com/hashtag/%E3%83%A1%E3%82%AC%E3%83%87%E3%83%A2%E5%8B%89%E5%BC%B7%E4%BC%9A?src=hash&amp;ref_src=twsrc%5Etfw">#メガデモ勉強会</a></p>&mdash; のたぐすキャット (@notargs) <a href="https://twitter.com/notargs/status/972345507111616512?ref_src=twsrc%5Etfw">2018年3月10日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## @soma_arc さんの「鏡映によるフラクタルとGLSLによる描画」

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/%E3%83%A1%E3%82%AC%E3%83%87%E3%83%A2%E5%8B%89%E5%BC%B7%E4%BC%9A?src=hash&amp;ref_src=twsrc%5Etfw">#メガデモ勉強会</a> 「鏡映によるフラクタルとGLSLによる描画」で使用した資料を公開しました．本日はありがとうございました．<a href="https://t.co/r3o3Rajbpn">https://t.co/r3o3Rajbpn</a><a href="https://t.co/wL36mO8d6e">https://t.co/wL36mO8d6e</a></p>&mdash; 蘇摩 (@soma_arc) <a href="https://twitter.com/soma_arc/status/972426826772434945?ref_src=twsrc%5Etfw">2018年3月10日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

とっても説明が理解しやすかったです。

以前にブログで紹介した[距離関数のfold](/blog/2017/03/02/raymarching-fold/)に近いものを感じました。

foldでは平面の鏡を使いましたが、この発表では円形の鏡を使うイメージだと理解しました。

円の鏡映では、まず円形の鏡を配置します。すると鏡同士で相互に反射するので、合わせ鏡のように、映り込んだ円がさらに再帰的に別の円の鏡に映り込みます。反射の再帰の深度に応じて色をつけると、単純な円から美しい模様が生成できると理解しました。

円の外にテクスチャを置いた例や、2D -> 3D に拡張した球の鏡による例も紹介されていました。

## @FL1NE	さんの「TokyoDemoFestとFRONTL1NEのご紹介」

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">本日の発表資料です <a href="https://twitter.com/hashtag/%E3%83%A1%E3%82%AC%E3%83%87%E3%83%A2%E5%8B%89%E5%BC%B7%E4%BC%9A?src=hash&amp;ref_src=twsrc%5Etfw">#メガデモ勉強会</a> <a href="https://t.co/NkgvYkD8eH">https://t.co/NkgvYkD8eH</a></p>&mdash; ΓL1ИΞ@GDC2018 (@FL1NE) <a href="https://twitter.com/FL1NE/status/972377117815009280?ref_src=twsrc%5Etfw">2018年3月10日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## @FMS_Cat さんの「GLSLで音楽を作ります」

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">本日の勉強会で使ったサンプルコードおよびスライドです。 <a href="https://t.co/tkAqql021E">https://t.co/tkAqql021E</a> <a href="https://twitter.com/hashtag/%E3%83%A1%E3%82%AC%E3%83%87%E3%83%A2%E5%8B%89%E5%BC%B7%E4%BC%9A?src=hash&amp;ref_src=twsrc%5Etfw">#メガデモ勉強会</a></p>&mdash; JPEG Depression (@FMS_Cat) <a href="https://twitter.com/FMS_Cat/status/972495648883752960?ref_src=twsrc%5Etfw">2018年3月10日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

音楽に関しては完全に素人でしたが、説明がすっと頭に入ってきました。

「ステレオサウンド」「音量・音階・音色」「コード」のような基礎用語の説明がカバーされていて助かりました。GLSLの実装を踏まえた説明だったので、よく知らない音楽の概念も理解できました。

特に印象的だったのは楽器編成です。
sin波や矩形波といった単純な波形をベースにして、本物の楽器のような音色を作れることに感動しました。

またコードを構成する音からランダムに音を選択し、オクターブもランダムに変化させることで、
ランダムながらかなり曲っぽい感じになることにびっくりしました（アルペジオ？）。

音楽は諦めかけていましたが、この発表のおかげで自分で音楽を制作する道筋が見えました。
今はFMS_Catさんの読みやすいコードをShadertoyに写経して理解を深めています。
素敵な発表ありがとうございました！

---

勉強会から帰宅した後、FMS_Catさんの発表でオススメされていた「Moleman 2」という動画を家で見ました。
メガデモの起源から現在に至るまで、メガデモの歴史を1時間30分に凝縮された動画になっていて、デモシーナー必見の内容でした。

<iframe width="560" height="315" src="https://www.youtube.com/embed/iRkZcTg1JWU" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

# 感想

ほとんどの発表者は自分よりも若いのに、資料もプレゼンもめちゃくちゃ上手で理解しやすかったのが印象的でした。
ずっと知りたかった内容を聞けたので、大満足でした。

勉強会の懇親会で、自分の発表でレイマーチングに出会い、卒業制作にもレイマーチングを使ったという専門学生とお話しました。
地道な活動も無駄じゃなかったんだ！他人には影響を与えることができたんだ！とすごい嬉しくなりました。

メガデモ制作のモチベーションが高まってきたので、今年の10〜11月のTDFに向けて頑張るぞ！
