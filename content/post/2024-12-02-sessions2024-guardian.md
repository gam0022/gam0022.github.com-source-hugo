+++
slug = "sessions2024-guardian"
date = "2024-12-02T22:00:00+09:00"
image = "/images/posts/2024-12-02-sessions2024-guardian/IMG_4279.jpg"
toc = true
math = false
draft = false
tags = [
    "event", "CG", "レイマーチング", "GLSL", "SESSIONS", "TokyoDemoFest", "Realtime Graphics"
]
title = "SESSIONS 2024のRealtime Graphicsコンペティションで3位入賞しました（グラフィックス解説）"

+++

これは[SESSIONS Advent Calendar 2024](https://adventar.org/calendars/10732)の2日目の記事です。

# はじめに

2024年11月16日～17日に日本科学未来館で開催された[SESSIONS 2024](https://sessions-party.com/events/sessions-2024/)に参加し、Realtime Graphicsコンペティションで3位をいただきました！



[![ファイルサイズ](/images/posts/2024-12-02-sessions2024-guardian/IMG_4279.jpg)](/images/posts/2024-12-02-sessions2024-guardian/IMG_4279.HEIC)

SESSIONS 2024では、Realtime Graphicsコンペティションに作品を提出した他、セミナーとShader Jamの解説を行わせていただきました。
セミナーとShader Jamについては別の記事で紹介する予定です。

この記事では、Realtime Graphicsコンペティションの提出作品である『GUARDI▲N』のグラフィックス（主に距離関数によるモデリング）について解説をします。

<!--more-->

# GUARDI▲Nについて

『GUARDI▲N』は「特撮」をコンセプトのデモ作品（Browser Demo）です。

2人でチーム制作を行い、映像とストーリーは私（gam0022）が担当し、音楽はHADHADさんが担当しました。

当初のアイデアは「天使vs悪魔」の映画的なストーリーを持つデモを作りたいというものでしたが、最終的には「特撮」の要素に振り切ることにしました。ガーディアンが天使のリングを持つのは初期設定の名残りです。

- [📺️YouTube](https://www.youtube.com/watch?v=T-V3mHlsgzQ)
- [🔦Live Footage](https://www.youtube.com/live/8bzBYGiifIQ?t=16325s)
- [💬Pouet](https://t.co/nXZkIBYdnC)
- [🐦️X/Twitter](https://x.com/gam0022/status/1858308509856678328)
- [🌍️Online version](https://gam0022.net/webgl/#demoscne_guardian)
- [🐙 GitHub](https://github.com/gam0022/chromatiq)

<div class="movie-wrap">
<iframe width="1920" height="1080" src="https://www.youtube.com/embed/T-V3mHlsgzQ?si=1-AUgqum39BhrvsZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">&quot;GUARDI▲N&quot; by <a href="https://twitter.com/gam0022?ref_src=twsrc%5Etfw">@gam0022</a> &amp; <a href="https://twitter.com/katai5plate?ref_src=twsrc%5Etfw">@katai5plate</a><br><br>3rd Place in Realtime Graphics Competition at <a href="https://twitter.com/hashtag/SESSIONS_Party?src=hash&amp;ref_src=twsrc%5Etfw">#SESSIONS_Party</a> 2024<a href="https://twitter.com/SESSIONS_Party?ref_src=twsrc%5Etfw">@SESSIONS_Party</a> 2024のリアルタイムGraphicsコンポで3位に入賞しました！<br><br>映像は自作のWebGLエンジンによる24KB制限です。<br><br>「特撮」をコンセプトにしました。 <a href="https://t.co/wDVVRXWX26">pic.twitter.com/wDVVRXWX26</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1858308509856678328?ref_src=twsrc%5Etfw">November 18, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">Realtime Graphics Competitionで3位🥉をいただきました！ありがとうございます！<br><br> <a href="https://twitter.com/hashtag/SESSIONS_Party?src=hash&amp;ref_src=twsrc%5Etfw">#SESSIONS_Party</a> <a href="https://t.co/jhPsIPW867">pic.twitter.com/jhPsIPW867</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1858103266183442445?ref_src=twsrc%5Etfw">November 17, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

# 制作環境

『GUARDI▲N』は自作のWebGLエンジンによるデモです。

音声のみ外部ファイル（mp3ファイル）で、映像は24KBのHTMLファイルで構成されています。

[![ファイルサイズ](/images/posts/2024-12-02-sessions2024-guardian/file-size.jpg)](/images/posts/2024-12-02-sessions2024-guardian/file-size.png)

Revision 2020用に開発した「Chromatiq」という名前のシンプルなWebGLエンジンを再利用しました。

「Chromatiq」はShadertoyのようなFullScreenQuadにマルチパスな描画ができるとてもシンプルなWebGLエンジンです。

イメージとしてはGLSLエディターを排除したスタンドアローンなShadertoyが近いかもしれません。

「Chromatiq」の詳細については以下の記事で説明しています。

- [Revision2020 PC 64K Intro 優勝作品『RE: SIMULATED』の技術解説 | gam0022.net](https://gam0022.net/blog/2020/04/30/revision2020/)

4年前からの変更点として、[lil-gui](https://lil-gui.georgealways.com/#)から[Tweakpane](https://tweakpane.github.io/docs/)に乗り換えました。

Tweakpaneの方がスライダーが圧倒的に使い勝手が良く、小数点以下の細かい数字も調整できるため、制作効率が改善しました。

[![Editor画面](/images/posts/2024-12-02-sessions2024-guardian/editor.png)](/images/posts/2024-12-02-sessions2024-guardian/editor.png)

Tweakpaneは[normalize.fmの#56](https://normalize.fm/056/)で知りました。個人的には超オススメです！

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/normalizeFM?src=hash&amp;ref_src=twsrc%5Etfw">#normalizeFM</a> で知ったけど良さそう。<a href="https://t.co/D5A4eFNZjU">https://t.co/D5A4eFNZjU</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1751515480735785026?ref_src=twsrc%5Etfw">January 28, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

# ビルや街の距離関数

ビルや街の地形の距離関数はMandelboxをベースにしています。

## 完成カット

当初のコンセプトは「天使vs悪魔」でしたので、空に浮遊する巨大な空中都市をイメージしながらモデリングを行いました。

しかし、途中から「特撮」に方向転換したため、天界という設定を残しつつも、「特撮」に合うような現代的なビルのジオメトリーとマテリアルに調整しました。

[![街 完成 カット1](/images/posts/2024-12-02-sessions2024-guardian/city-final-1.jpg)](/images/posts/2024-12-02-sessions2024-guardian/city-final-1.png)

[![街 完成 カット2](/images/posts/2024-12-02-sessions2024-guardian/city-final-2.jpg)](/images/posts/2024-12-02-sessions2024-guardian/city-final-2.png)

[![街 完成 カット3](/images/posts/2024-12-02-sessions2024-guardian/city-final-3.jpg)](/images/posts/2024-12-02-sessions2024-guardian/city-final-3.png)

## Unityでの下書き

ビルのような突起のついたMandelboxをベースに、Unityを使ってパラメーターを調整しながら街の形状に仕上げました。

球体でMandelboxの上部を切り取ることで、完成カットの街のような形状にしています。

[![街 Unity上の下書き カット1](/images/posts/2024-12-02-sessions2024-guardian/city-unity-1.jpg)](/images/posts/2024-12-02-sessions2024-guardian/city-unity-1.png)

[![街 Unity上の下書き カット2](/images/posts/2024-12-02-sessions2024-guardian/city-unity-2.jpg)](/images/posts/2024-12-02-sessions2024-guardian/city-unity-2.png)

## 制作途中の様子

制作途中の様子です。最初は中東風のジオメトリーでした。途中で鉄と錆を使ったスチームパンク風のマテリアルも試していました。

[![街 WIP カット1](/images/posts/2024-12-02-sessions2024-guardian/city-wip-1.jpg)](/images/posts/2024-12-02-sessions2024-guardian/city-wip-1.png)

マテリアルについても鉄と錆によるスチームパンクのような渋い方向性も試していました。

[![街 WIP カット2](/images/posts/2024-12-02-sessions2024-guardian/city-wip-2.jpg)](/images/posts/2024-12-02-sessions2024-guardian/city-wip-2.png)

[![街 WIP カット3](/images/posts/2024-12-02-sessions2024-guardian/city-wip-3.jpg)](/images/posts/2024-12-02-sessions2024-guardian/city-wip-3.png)

# ガーディアンの距離関数

ガーディアンの距離関数はIFS（Iterated Function System）による折りたたみを使用しています。

forループ内で空間を適当に回転や並行移動させ、最後にBoxの距離関数を評価しています。

このアプローチは『Transcendental Cube』と完全に同じですので、IFSに興味がある方は以下の記事もご覧ください。

- [SESSIONS 2023のGLSL Graphics Compoで準優勝しました（グラフィックス解説） | gam0022.net](https://gam0022.net/blog/2023/05/31/sessions2023-glsl-compo/)

UnityでIFSのパラメーターを調整しながらガーディアンのイメージに近づけていきました。

[![ガーディアン Unity上の下書き カット1](/images/posts/2024-12-02-sessions2024-guardian/guardian-unity-1.jpg)](/images/posts/2024-12-02-sessions2024-guardian/guardian-unity-1.png)

制作の最初期には金色と黒色の百式風カラーリングも試しましたが、最終的には白と金色のカラーリングに決定しました。

[![ガーディアン プロトタイプ カット2](/images/posts/2024-12-02-sessions2024-guardian/guardian-prototype-2.jpg)](/images/posts/2024-12-02-sessions2024-guardian/guardian-prototype-2.png)

[![ガーディアン プロトタイプ カット4](/images/posts/2024-12-02-sessions2024-guardian/guardian-prototype-4.jpg)](/images/posts/2024-12-02-sessions2024-guardian/guardian-prototype-4.png)

モデリングについては、最初期の案がそのまま最終版となりました。

最終版には、天使の要素として天使のリングを追加しました。

[![ガーディアン WIP カット1](/images/posts/2024-12-02-sessions2024-guardian/guardian-wip-1.jpg)](/images/posts/2024-12-02-sessions2024-guardian/guardian-wip-1.png)

[![ガーディアン WIP カット2](/images/posts/2024-12-02-sessions2024-guardian/guardian-wip-2.jpg)](/images/posts/2024-12-02-sessions2024-guardian/guardian-wip-2.png)

# 戦闘機の距離関数

作品の中盤で怪獣に全滅させられてしまう戦闘機もIFSによる折りたたみを使用しています

同じ天界の陣営であるため、雰囲気を統一するために戦闘機とガーディアンに同じIFSのアプローチを採用しました。

[![戦闘機 Unity上の下書き カット1](/images/posts/2024-12-02-sessions2024-guardian/fighter-unity-1.jpg)](/images/posts/2024-12-02-sessions2024-guardian/fighter-unity-1.png)

<video playsinline="" loop="" muted="" controls="" autoplay="" width="100%" src="/images/posts/2024-12-02-sessions2024-guardian/fighter-movie-1.mp4" poster="/images/posts/2024-12-02-sessions2024-guardian/fighter-movie-1.jpg"></video>

# 怪獣の距離関数

怪獣（ボス）もIFSを使用しています。

元の距離関数はガーディアンと同様にBoxですが、Smooth Unionを使って角を丸め、生物の有機的なイメージに近づけました。

こちらもUnityでIFSのパラメーターを調整し、怪獣のイメージに仕上げました。

[![怪獣 Unity上の下書き カット1](/images/posts/2024-12-02-sessions2024-guardian/boss-unity-1.jpg)](/images/posts/2024-12-02-sessions2024-guardian/boss-unity-1.png)

[![怪獣 WIP カット1](/images/posts/2024-12-02-sessions2024-guardian/boss-wip-1.jpg)](/images/posts/2024-12-02-sessions2024-guardian/boss-wip-1.png)

初期案では目玉がありませんでした。

<video playsinline="" loop="" muted="" controls="" autoplay="" width="100%" src="/images/posts/2024-12-02-sessions2024-guardian/boss-prototype-1.mp4" poster="/images/posts/2024-12-02-sessions2024-guardian/boss-prototype-1.jpg"></video>

ボスがレーザーで破壊されるアニメーションは、IFSの平行移動のパラメーターで実現しました。

<video playsinline="" loop="" muted="" controls="" autoplay="" width="100%" src="/images/posts/2024-12-02-sessions2024-guardian/boss-death-1.mp4" poster="/images/posts/2024-12-02-sessions2024-guardian/boss-death-1.jpg"></video>

# 距離関数によるモデリングまとめ

Mandelboxから生み出したビルや街については、個人的にはかなり自信作です。今回のデモで終わらせるのはもったいないので、何か別の作品でもぜひ活用してみたいと考えています。

ガーディアン、戦闘機、怪獣の3要素にはいずれもIFS（Iterated Function System）を使用しました。

怪獣はよくあるIFS感が強すぎたので、可能ならもうひと工夫が必要だったかもしれません。

ここ数年でIFSを多用しているため、次回作では別のアプローチも検討したいと思います。一方で、IFSにはまだ未開拓の可能性があると感じています。

# 振り返り

かなり短期間の制作スケジュールでしたが、最終的にはなんとか形になったので良かったと思います。

10月の前半は[レイトレ合宿 10](https://gam0022.net/blog/2024/10/23/rtcamp10/)などで忙しく、SESSIONSへの着手が遅れてしまいました。

今回は映像に登場する要素の距離関数によるモデリングを完全に固めてから、最後にカメラワークと演出をつけるという制作フローで映像を制作しました。なんとか最終的には形になりましたが、仕上げの工程の時間がほとんど無くなってしまったのは反省点です。

これまでの作品も多少ストーリー性はありましたが、アブストラクトなモデリングが多かったため、特撮という非アブストラクトなテーマで映像を作るのにはかなり苦労しました。『Transcendental Cube』では通常のカメラワークを乱数で生成していましたが、今回はカットごとにカメラワークを調整する必要があったため、過去作品と比べると工数が大幅に増えました。

Code Graphics（GLSL Graphics）Compoのように映像を1パスで作成したため（※ポストエフェクトや半透明は別パスにしました）、GLSLが巨大化し、コンパイル時間の増加でイテレーション効率が低下したのも課題でした。

ストーリー性のある複雑な作品を作る場合には、3D空間上にオブジェクトを配置し、オブジェクトスペースのレイマーチングを行えるような仕組みを構築するべきだと改めて感じました。

今回は音楽が間に合わなかった場合、Code Graphicsで提出する可能性もあったため、1パスで進めることにしました。

音楽担当のHADHADさんへの相談も締切直前になってしまいましたが、特撮感のある力強い曲を短期間で作っていただき、とても感謝しています。ありがとうございました🙏

# おわりに

SESSIONS 2024は最高のイベントでした！

会場の雰囲気や臨場感を肌で直接感じることができ、やはりオフラインイベントには特別な魅力があると再認識できました。

実際に参加者と話をしたり、作品についての感想やアイデアを交換したりすることで、新たな視点やインスピレーションを得ることができました。

また、会場の音響や再生環境が例年より大幅に改善されていた点も非常に良かったです。

今年から刷新された応募カテゴリーにより、ProcessingやジェネVJ界隈の人々も参加し、例年以上の盛り上がりを感じました。

SESSIONS 2024の運営や準備をしてくださったオーガナイザーの皆さん、そして参加者の皆さん、本当にありがとうございました！