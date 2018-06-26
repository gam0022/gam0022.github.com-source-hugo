+++
date = "2016-09-24T00:00:00"
draft = false
title = "Works"
subtitle = ""
section_id = 10
weight = 10
section = 100
toc = true
+++

最終更新: 2018-06-27

# Publications

執筆した書籍を紹介します。

## 2017年10月 KLab Tech Book

[<img alt="KLab Tech Book" src="/images/works/tbf3.jpg" width="200px" class="right">](/images/works/tbf3.jpg)

『KLab Tech Book』の表紙絵と『第1章 物理ベースレンダラーを Rust 実装して、表紙絵をレンダリングした話』を担当しました。

Rustで自作したパストレーシングによる物理ベースレンダラーを解説しました。

まず基礎的な3DCGの描画方法について触れた後、パストレーシングの原理について簡単に説明しました。
続いて筆者自作のHanamaruレンダラーを紹介し、レイトレーシングやパストレーシングの高速化の取り組みについて触れました。

- [サークル詳細 | KLab 株式会社 | 技術書典3](https://techbookfest.org/event/tbf03/circle/5644572721938432)

関連情報

- [レイトレ合宿5‽に参加して、Rustでパストレーシングを実装しました！ | gam0022.net](https://gam0022.net/blog/2017/10/02/rtcamp5/)

## 2017年4月 Think Web

[<img alt="Think Web" src="/images/works/tbf2.png" width="200px" class="right">](/images/works/tbf2.png)

『Think Web』の『第6章 まるで実写！？GPUパストレーシングのWebGL実装』を担当しました。

パストレーシングは3Dの描画手法のひとつで、現実世界に近い光の振る舞いをシミュレートすることで、大域照明を考慮した写実的なレンダリングを可能にします。
写実的なレンダリングができる反面、処理時間が膨大にかかるという弱点があります。
私の章ではパストレーシングのGPU実装による高速化について紹介します。
しかも単純な高速化ではなく、ブラウザ上で3DCGを扱うWebAPIであるWebGLによりGPU実装することで、ブラウザ上で動作するインタラクティブなパストレーシングを実現します。

- [Think Web | TechBooster in 技術書典2](https://techbooster.github.io/tbf02/#think)
- [Think Web | BOOTH](https://techbooster.booth.pm/items/488347)

関連情報

- [WebGLパストレーシングを技術書典2のためにブラッシュアップ | gam0022.net](https://gam0022.net/blog/2017/04/06/webgl-pathtracing-tbf2/)
- [WebGL+GLSLによる超高速なパストレーシング | Qiita](https://qiita.com/gam0022/items/18bb3612d7bdb6f4360a)
- [three.js webgl - pathtracing sandbox | gam0022.net](https://gam0022.net/webgl/#pathtracing_sandbox)

## 2016年夏 AZ異本 grimoire of web

[<img alt="JavaScriptoon2" src="/images/works/tbf1.gif" width="300px" class="right">](/images/works/tbf1.gif)

AZ異本という技術書の「レイマーチングの世界でミクが踊る！『レイマーチング×ラスタライザ』ハイブリッド描画 with three.js」という記事をかきました。
three.jsによるレイマーチングとラスタライザのハイブリッド手法について解説しました。

レイマーチングはフラクタル図形などの幾何学的なシーンの描画が得意な一方、人物などの有機的な形状の表現は苦手とします。
そこで、人物などの有機的な箇所のみをラスタライザで描画し、背景などの幾何学的な形状はレイマーチングで描画する手法の考案と実装をしました。 本手法によって、レイマーチングとラスタライザの短所を補い合いながら、ハイブリッドに組み合わせることができます！

- [AZ異本 grimoire of web - TechBooster in 技術書典](https://techbooster.github.io/tbf1/#web)
- [AZ異本 grimoire of web - BOOTH](https://techbooster.booth.pm/items/275301)

関連情報

- [6/25の技術書典で、AZ異本（アツイホン）を出します！](http://gam0022.hatenablog.com/entry/2016/06/22/tbf1)
- [hybrid - gam0022.net](http://gam0022.net/webgl/#raymarching_hybrid)
- [live](#2016-live)

## 2015冬 JavaScriptoon2

[<img alt="JavaScriptoon2" src="/images/works/javascriptoon2.jpg" class="right">](/images/works/javascriptoon2_original.jpg)

「JavaScriptoon2」というWebフロントエンド本の「シェーダだけで世界を創る！Three.jsによるレイマーチング」という章を担当しました。

レイマーチングはレイトレーシングの1種です。
レイトレーシングやレイトレーシングは膨大な計算が必要ですが、フラグメントシェーダで実装することで、GPUの力を利用したリアルタイムに描画する方法を紹介しています。

そもそもシェーダとは何かという基礎の解説からはじまり、レイマーチングの肝となる「距離関数」についても丁寧に解説しました。

- [JavaScriptoon2 - TechBooster in C89](https://techbooster.github.io/c89/#scriptoon2)
- [JavaScriptoon2 - BOOTH](https://techbooster.booth.pm/items/178227/)

## 2015夏 JavaScriptoon

[<img alt="JavaScriptoon" src="/images/works/javascriptoon.png" class="right">](/images/works/javascriptoon_original.png)

「JavaScriptoon」というWebフロントエンド本の「three.js でお手軽 3DCG 入門」という章を担当しました。

three.js はWebGLを手軽に使うためのJavaScriptのライブラリです。

3DCGが初めてという人でも分かるように、基礎から説明しています。

- [JavaScriptoon - TechBooster in C88](https://techbooster.github.io/c88/#scriptoon)
- [JavaScriptoon - BOOTH](https://techbooster.booth.pm/items/126683/)

# Unity Wokrs

Unityで作成した映像作品と活動を紹介します。

## 2018 uRaymarchingとReflectionProbeによる反射

ReflectionProbeによって「レイマーチングで動的に生成したモデル」と「ポリゴンメッシュのモデル」を混在させたシーンで破綻のない反射を計算する検証です。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">uRaymarchingとReflectionProbeによる反射と組み合わせる検証<br>中<br><br>毎フレームCubemapを生成するくらいならレイトレで反射を計算したほうが速いと思っていたが、この例ならCubemapの解像度は16x16でも十分だし、Cubemapの方がポリゴンとの混在が容易なので、現実的な方法だと思う。 <a href="https://t.co/sSX7WmVCEd">pic.twitter.com/sSX7WmVCEd</a></p>&mdash; がむ🌷🌴 (@gam0022) <a href="https://twitter.com/gam0022/status/1003274796895895554?ref_src=twsrc%5Etfw">2018年6月3日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## 2017 uRaymarchingとTimelineによる映像作品

「レイマーチングで動的に生成したモデル」と「ポリゴンメッシュのモデル」を混在させた作品です。 ロボットは通常の3Dモデルですが、床や柱のモデルはレイマーチングでプロシージャルに生成しました。

<blockquote class="twitter-tweet" data-conversation="none" data-lang="ja"><p lang="ja" dir="ltr">Unityで映像作品（デモ）の試作をしました。<br>uRaymarchingとTimelineを使っています <a href="https://t.co/QbvItqc2Bs">pic.twitter.com/QbvItqc2Bs</a></p>&mdash; がむ🌷🌴 (@gam0022) <a href="https://twitter.com/gam0022/status/945455918816174080?ref_src=twsrc%5Etfw">2017年12月26日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

関連記事

- [Unityでメガデモ制作に挑戦（uRaymarchingとTimelineを試す） | gam0022.net](https://gam0022.net/blog/2017/12/25/unity-demoscene/)

# WebGL Works

WebGLで作成した映像作品と活動を紹介します。

動くデモは[こちら](http://gam0022.net/webgl/)にもまとめています。

## 2018 メガデモ勉強会

<div style="width:400px; margin:0; padding:0;" class="right">
<script async class="speakerdeck-embed" data-slide="1" data-id="74ea75d0686849238368f73150a7adba" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>
</div>

3/10に開催された[メガデモ勉強会! 2018](https://atnd.org/events/93843)に登壇しました。

発表タイトルは「もっと綺麗で写実的な絵作りをしたい！レイマーチング向けのシェーディング技術」です。

関連記事

- [メガデモ勉強会!2018で発表しました | gam0022.net](/blog/2018/03/16/demoscene-study-session/)

## 2017 正解するカド

[<img alt="正解するカド" src="/images/works/kado.jpg" width="300px" class="right">](/images/posts/2017-06-30-raymarching-kado/kado.png)

アニメ[『正解するカド』](http://seikaisuru-kado.com/)に登場するフラクタル図形（カド）のレイマーチングによるレンダリングに挑戦しました。

レイマーチング（スフィアトレーシング）は「カド」のようなフラクタル図形の描画がとても得意なので、
その特徴を活かせたと思います。

- [https://gam0022.net/webgl/#raymarching_kado](https://gam0022.net/webgl/#raymarching_kado)

関連情報

- [正解するカドの「カド」をレイマーチングでリアルタイム描画する | gam0022.net
](http://localhost:1313/blog/2017/06/30/raymarching-kado/)

## 2017 Fusioned Bismuth

[<img alt="Fusioned Bismuth" src="/images/works/tdf2017.jpg" width="300px" class="right">](/images/works/tdf2017.jpg)

TokyoDemoFest 2017 の GLSL Graphics Compo で3位入賞した、レイマーチングによる映像作品です。

- [Fusioned Bismuth | gam0022.net](https://gam0022.net/webgl/#raymarching_tdf2017)
- [Fusioned Bismuth | Shadertoy](https://www.shadertoy.com/view/Msscz7)
- [Tokyo Demo Fest 2017 - GLSL Graphics Compo | Youtube](https://youtu.be/o3e7YFspIJ0?t=10m34s)

関連情報

- [#TokyoDemoFest 2017 の GLSL Graphics Compo で3位入賞！ | gam0022.net](https://gam0022.net/blog/2017/02/24/tdf2017/)
- [距離関数のfold（折りたたみ）による形状設計 | gam0022.net](https://gam0022.net/blog/2017/03/02/raymarching-fold/)

## 2017 Realtime Pathtracing

<div style="width:400px; margin:0; padding:0;" class="right">
<iframe width="400" height="315" src="https://www.youtube.com/embed/FUb5U3ttmZE" frameborder="0" allowfullscreen></iframe>
</div>

WebGL(three.js)でリアルタイムなパストレーシングを実装しました。

- [three.js webgl - pathtracing sandbox | gam0022.net](https://gam0022.net/webgl/#pathtracing_sandbox)

関連情報

- [WebGLパストレーシングを技術書典2のためにブラッシュアップ | gam0022.net](https://gam0022.net/blog/2017/04/06/webgl-pathtracing-tbf2/)
- [WebGL+GLSLによる超高速なパストレーシング | Qiita](https://qiita.com/gam0022/items/18bb3612d7bdb6f4360a)
- [three.js webgl - pathtracing sandbox | gam0022.net](https://gam0022.net/webgl/#pathtracing_sandbox)

## 2016 Live

[<img alt="Live" src="/images/works/live.gif" width="300px" class="right">](/images/works/live.gif)

WebGLのフォワードレンダリングでレイマーチングとラスラライザをハイブリッドに組み合わせる技術デモです。
WebGLの深度バッファを書き込む拡張(`EXT_frag_depth`)を利用しています。
レイマーチングによる無数のサイリウムのステージ上でMMDの初音ミクが踊ります。

[AZ異本](#2016年夏-az異本-grimoire-of-web)のサンプル用に作成しました。

<!--div class="read-more">
  <a href="http://gam0022.net/webgl/#raymarching_hybrid" class="btn btn-primary btn-outline">Hybrid</a>
</div-->

<div class="read-more">
  <a href="http://gam0022.net/webgl/#raymarching_hybrid_live" class="btn btn-primary btn-outline">Live - gam0022.net（※音が出ます）</a>
</div>

関連情報

- [AZ異本 grimoire of web](#2016年夏-az異本-grimoire-of-web)
- [6/25の技術書典で、AZ異本（アツイホン）を出します！](http://gam0022.hatenablog.com/entry/2016/06/22/tbf1)

## 2016 Carbon

[<img alt="Carbon" src="/images/works/carbon.png" class="right">](/images/works/carbon_original.png)

TokyoDemoFest 2016 の GLSL Graphics Compo で3位入賞した、レイマーチングによる映像作品です。

Mandelbox というフラクタル図形を mod で無限にループさせています。

- [Shadertoy - Carbon \[TDF2016\] - Final Version](https://www.shadertoy.com/view/MsG3Wy)
- [GLSL Sandbox - Carbon - TDF Submited Version](http://glslsandbox.com/e#30972.0)

関連記事

- [#TokyoDemoFest 2016 の GLSL Graphics Compo で3位入賞！ - gam0022.net](/blog/2016/02/24/tokyo-demo-fest/)

## 2016 #GLSLTech 発表資料

<div style="width:340px; margin:0; padding:0;" class="right">
<iframe src="//www.slideshare.net/slideshow/embed_code/key/rS2j757JUrqeWL" width="340" height="290" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/shohosoda9/threejs-58238484" title="シェーダだけで世界を創る！three.jsによるレイマーチング" target="\_blank">シェーダだけで世界を創る！three.jsによるレイマーチング</a> </strong> from <strong><a target="\_blank" href="//www.slideshare.net/shohosoda9">Sho Hosoda</a></strong> </div>
</div>

「シェーダだけで世界を創る！three.jsによるレイマーチング」という発表資料です。

2/14のバレンタインデーに開催された「GPU の熱でチョコも溶けちゃう！？ GLSL シェーダテクニック勉強会（#GLSLTech）」で登壇したときのものです。

関連記事

- [GLSL シェーダテクニック勉強会 #GLSLTechで登壇しました | gam0022.net](/blog/2016/02/16/glsl-tech/)

## 2016 Gem

[<img alt="Gem" src="/images/works/gem.png" class="right">](/images/works/gem_original.png)

光の屈折をシミュレートすることで、輝く宝石をWebGLでレンダリングする「gem」という作品（技術デモ）をつくりました。
レイトレーシングをGLSLのフラグメントシェーダで実装することで、GPUの並列計算を利用したリアルタイムな描画を実現しています。

関連記事

- [これがGPUの力！three.jsによる“リアルタイム”なレイトレーシング 〜宝石編〜 - Qiita](http://qiita.com/gam0022/items/9875480d33e03fe2113c)

<div class="read-more">
  <a href="http://gam0022.net/webgl/#raytracing_gem" class="btn btn-primary btn-outline">Gem - gam0022.net</a>
</div>

## 2015 Reflect

[<img alt="Gem" src="/images/works/reflect.png" class="right">](/images/works/reflect_original.png)

レイマーチングで鏡面反射する球体を無限に並べたシーンをリアルタイムに描画するデモです。
three.js 公式サンプルにも取り込まれています。

- [Reflect - gam0022.net](http://gam0022.net/webgl/#raymarching_reflect)
- [Reflect - three.js 公式サンプル](http://threejs.org/examples/#webgl_raymarching_reflect)

関連記事

- [これがGPUの力！Three.jsによる“リアルタイム”なレイトレーシング - Qiita](http://qiita.com/gam0022/items/03699a07e4a4b5f2d41f)

<div class="read-more">
  <a href="http://threejs.org/examples/#webgl_raymarching_reflect" class="btn btn-primary btn-outline">Reflect - threejs.org</a>
</div>

## 2015 Steal Frame

[<img alt="Steel Frame" src="/images/works/steel_frame.png" class="right">](/images/works/steel_frame_original.png)

鉄筋をモチーフにしたレイマーチングによる作品です。

[JavaScriptoon2](#2015冬-javascriptoon2)の解説用につくったので、わずか20行ほどのコードでシーンを定義しています。

<div class="read-more">
  <a href="http://gam0022.net/webgl/#raymarching_steel-frame" class="btn btn-primary btn-outline">Steal Frame - gam0022.net</a>
</div>

# Google Chrome Extention

Goole Chrome の拡張機能を紹介します。

## 2016 Slack 返信引用ボタン

<img alt="Slack Reply Button" src="/images/works/slack-reply-button/icon.png" class="right">

Slack に返信と引用ボタンをつけるChrome拡張機能です。

- [Slack 返信引用ボタン - Chrome ストア](https://chrome.google.com/webstore/detail/slack-%E8%BF%94%E4%BF%A1%E5%BC%95%E7%94%A8%E3%83%9C%E3%82%BF%E3%83%B3slack-reply/cechhipifmcinmnnjnlichjigoabokbg?hl=ja)
- [GitHubリポジトリ](https://github.com/gam0022/slack-reply-and-quote-button)
- [Slackに返信ボタンをつけるChrome拡張をつくりました - Qiita](http://qiita.com/gam0022/items/9cce1d118bc42dc0e212)

<div class="read-more">
  <a href="/works/slack-reply-and-quote-button/" class="btn btn-primary btn-outline">Slack 返信引用ボタン - gam0022.net</a>
</div>

# Research

大学の卒業研究を紹介します。

## 2014-2015 非多様体構造を許容した可展面パッチ集合による紙模型用形状モデルの構築

[<img alt="Paper Craft -  dolphin" src="/images/works/paper_craft_dolphin.jpg" class="right">](/images/works/paper_craft_dolphin_original.jpg)

曲面を利用したペーパークラフト（画像奥）をインタラクティブに設計するシステムを提案しました。
市販ソフトウェアで作成したペーパークラフト（画像手前）と比較すると、
曲線による滑らかな表現、ヒレの部分の1枚の紙の構造（非多様体構造）を許容できる、組立の手間が少ないなどのメリットがあります。

- [学位論文(PDF)](http://www.npal.cs.tsukuba.ac.jp/thesis/2014/thesis2014b_hosoda.pdf)
- [動画(DropBox)](https://www.dropbox.com/s/8ucnj04gq7zw3uy/vc2015.mp4?dl=0)

表彰

- [GCAD賞](http://www.ipsj-gcad.sakura.ne.jp/%CD%A5%BD%A8%B8%A6%B5%E6%C8%AF%C9%BD%BE%DE.html#q23e1b1c), Visual Computing / [グラフィクスと CAD 合同シンポジウム 2015](http://ipsj-gcad.sakura.ne.jp/vc2015/), 細田翔,三谷純,金森由博, 可展面間の交差に基づくトリム処理を組み入れた対話的紙模型用形状構築システム, 2015/06/28,29
- 学生奨励賞, [情報処理学会第77回全国大会](http://www.ipsj.or.jp/event/taikai/77/), 細田翔,三谷純,金森由博, 可展面間の交差に基づくトリム処理を組み入れた対話的紙模型用形状構築システム, 2015/03/23

指導教官である三谷先生のブログでも紹介していただきました。

- [イルカの紙模型 - みたにっき＠はてな](http://d.hatena.ne.jp/JunMitani/20141112)

# Windows

## 2016 Hanamaru Renderer

<script async class="speakerdeck-embed" data-id="6159e679b62d4d87a718fdf97efe5ed8" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

Rustで開発したパストレーシングによる物理ベースレンダラーです。

関連情報

- [レイトレ合宿5‽に参加して、Rustでパストレーシングを実装しました！ | gam0022.net](https://gam0022.net/blog/2017/10/02/rtcamp5/)

## 2016 Tsukihi

<div style="width: 300px;" class="right">
<script async class="speakerdeck-embed" data-slide="1" data-id="3e8b7d83dd0e4b19891d6c8321431d47" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>
</div>

距離関数によって表現されたオブジェクトをレイマーチングでレンダリングするCPUレンダラーです。
パストレーシングによるレンダラーの実装と擬似表現によるレンダラーの両方の実装があります。

関連記事

- [レイトレ合宿4!? に参加しました！ - gam0022のブログ](http://gam0022.hatenablog.com/entry/raytracingcamp4)
- [レイトレ合宿4!?](https://sites.google.com/site/raytracingcamp4/)
- [GitHub](https://github.com/gam0022/tsukihi)

# iOS App

## 2013 カメラで商品検索 C2search

[<img alt="C2search" src="/images/works/C2search_tmb.png" class="right">](/images/works/C2search.png)

「カメラで商品検索」という画像によって商品の横断検索ができるiOSアプリを開発しました。
[Yahoo Inter Hack U 2013](http://hacku.yahoo.co.jp/inter2013/) 参加作品です。

- 画像認識によって、タイトルが長い本、名前を忘れてしまった商品も簡単に検索できます。
- Yahoo!ショッピングと楽天市場の両方の結果を同じテーブルビューに表示します。
- 検索結果を色によってソートする機能もあります。

関連記事

- [ヤフー主催のアプリ開発イベント「Inter Hack U」 - 学生15団体が熱戦](http://news.mynavi.jp/articles/2013/12/06/yahoo_inter_hack_u/001.html)

<div class="read-more">
  <a href="http://c2search.gam0022.net/" class="btn btn-primary btn-outline">Read More</a>
</div>

# RubyGems

Ruby 向けのライブラリの紹介です。

## 2013 ImmutableList

<img alt="immutable_list" src="/images/works/immutable_list.png" class="right">

RubyGemsとして、ImmutableなLinkedListを公開しました。

C言語の拡張として実装したので、動作はそれなりに高速です。

Immutable かつ Linked なので、Rubyで関数型言語風に再帰を使ってプログラミングをするのに最適なデータ構造です。

* [RubyGems.org](https://rubygems.org/gems/immutable_list)
* [README(GitHub)](https://github.com/gam0022/immutable_list/blob/master/README.md)
* [RubyでLinkedListを使うためのC拡張を作った - gam0022.net](http://gam0022.net/blog/2013/08/19/ruby-linkedlist/)

<iframe src="//www.slideshare.net/slideshow/embed_code/key/MjwxdjZX6fPjtf" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/shohosoda9/immutable-list-gem-klab-alm" title="Immutable List Gem (KLab ALM版)" target="_blank">Immutable List Gem (KLab ALM版)</a> </strong> from <strong><a href="https://www.slideshare.net/shohosoda9" target="_blank">Sho Hosoda</a></strong> </div>

# Web

## 2013 Twitter名刺ジェネレーター

[<img alt="Twitter名刺ジェネレーター" src="/images/works/tmg_tmb.png" class="right">](/images/works/tmg.png)

TwitterIDを入力するだけで簡単に名刺が作れるサービスです。

認証は不要でデザインを選択するだけ！

さらに、マルコフ連鎖によってあなたを適当に自己紹介してくれます！

紹介スライド

- [Twitter名刺ジェネレータ - SlideShare](http://www.slideshare.net/shohosoda9/twitter-26428486)

<div class="read-more">
  <a href="http://gam0022.net/app/tmg/" class="btn btn-primary btn-outline">Twitter名刺ジェネレーター</a>
</div>


## 2013 Shelf

[<img alt="Shelf" src="/images/works/shelf.png" class="right">](/images/works/shelf_original.png)

3Dで描画された回転する棚にカバンを展示することで、実際の店舗でショッピングをしている感覚を体験できるというコンセプトのWeb通販サイトのプロトタイプです。

[COJT](http://inf.tsukuba.ac.jp/ET-COJT/)という、筑波大学の産学連携の授業で開発しました。

WebGL(Canvas)で描画しています。

COJTソフトウェアコース2013の前期の準優勝/技術賞受賞作品です。

<div class="read-more">
  <a href="http://gam0022.net/app/shelf/" class="btn btn-primary btn-outline">Shelf デモ</a>
</div>


## 2012-2013 TwinCal

<img alt="twincal" src="/images/works/twincal.png" class="right">

TwinCalとは、Twinsの時間割をiCalendar形式に変換し、Googleカレンダー・iCalへのインポートをサポートするWebサービスです。

[アカリクVALUATOR主催 学生のためのアプリ開発コンテスト](http://acaric-valuator.com/event/studentappcontest2013/)のファイナリストに採択されました。

<div class="read-more">
  <a href="http://gam0022.net/app/twincal/" class="btn btn-primary btn-outline">TwinCal 公式サイト</a>
</div>

## 2011-2013 @daigoroubot

<img alt="大五郎Bot" src="/images/works/daigoroubot.png" class="right">

マルコフ連鎖で学習する人工無能のTwitterのBOTです。

つくば市の天気予報機能、電卓機能、n進数変換器、全学教室検察など便利な機能を搭載しています。

<a href="https://twitter.com/daigoroubot" class="twitter-follow-button" data-show-count="false">Follow @daigoroubot</a><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

[大五郎（Ｕ＾ω＾）BOT (@daigoroubot)](https://twitter.com/daigoroubot)

<div class="read-more">
  <a href="/works/daigoroubot/" class="btn btn-primary btn-outline">Read More</a>
</div>

# HSPTV Games

HSPプログラミングコンテスト用に作ったゲーム達です。

## 2012 Soar(ソアー)

[<img alt="soar" src="/images/works/soar.png" class="right">](/images/works/soar_original.png)

女の子を落下しないように操作して、ひたすら上を目指すアクションゲーム

* コンテスト
  * [HSPコンテスト2012 #313](http://dev.onionsoft.net/seed/info.ax?id=313)
  * 秀和システム賞を受賞
    * [HSPプログラミングコンテスト2012で秀和システム賞を受賞](http://gam0022.net/blog/2012/12/11/hsp-contest2012/)
    * [HSPプログラムコンテスト2012　入賞作品詳細](http://hsp.tv/contest2012/cntst_fresult.html#313)
* その他
  * [飛び上がれ！女の子が主役のアクションゲーム「Soar (ソアー)」](http://www.moongift.jp/2012/12/20121225/)


## 2010 雲(sky)

[<img alt="雲" src="/images/works/sky1.png" class="right">](/images/works/sky1_original.png)

パーリンノイズを使ったリアルな雲画像のリアルタイムレンダリング実験。

描画の高速化の為に、VRAMを直接書き換えるなど、HSPの限界に挑戦した作品。

* コンテスト
  * [HSPコンテスト 2010 #141](http://hsp.tv/contest2010/entry.php?id=141)
* 作成記録
  * [GAM-22のメモ](http://gmr.blog.shinobi.jp/-%E4%BD%9C%E6%88%90%E8%A8%98%E9%8C%B2-%E9%9B%B2/)

<div style="clear: both;"></div>

[<img alt="config画面" src="/images/works/sky2.png" class="right">](/images/works/sky2_original.png)


## 2009 ボウリング(笑) (bowling(w))

[<img alt="ボウリング(笑)" src="/images/works/bowling.png" class="right">](/images/works/bowling_original.png)

OBAQによる物理演算とランキング機能によるステージ投稿が特徴のボウリング風ゲーム。

* コンテスト
  * [HSPコンテスト 2009 #120](http://hsp.tv/contest2009/list_s1.html#id120)
  * [OBAQ賞の「wiiリモコン+WiiRemoteプログラミング」が届いた](http://gmr.blog.shinobi.jp/-%E4%BD%9C%E6%88%90%E8%A8%98%E9%8C%B2-%E3%83%9C%E3%82%A6%E3%83%AA%E3%83%B3%E3%82%B0-%E7%AC%91-/obaq%E8%B3%9E%E3%81%AE%E3%80%8Cwii%E3%83%AA%E3%83%A2%E3%82%B3%E3%83%B3-wiiremote%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0%E3%80%8D%E3%81%8C%E5%B1%8A%E3%81%84%E3%81%9F)
* 作成記録
  * [GAM-22のメモ](http://gmr.blog.shinobi.jp/-%E4%BD%9C%E6%88%90%E8%A8%98%E9%8C%B2-%E3%83%9C%E3%82%A6%E3%83%AA%E3%83%B3%E3%82%B0-%E7%AC%91-/)
* 動画
  * [ニコニコ動画](http://www.nicovideo.jp/watch/sm8246495)
  * [YouTube](http://www.youtube.com/watch?v=ZojFN8L34cI)
* その他
  * [kerupaniさんのステージ](http://www38.atwiki.jp/kerupani129/pages/20.html)
  * [隠しブロックについて](http://www38.atwiki.jp/kerupani129/pages/20.html)
  * [窓の杜 - 【週末ゲーム】第402回：「HSPTVブラウザ」で遊んでみよう！](http://www.forest.impress.co.jp/docs/serial/shumatsu/20100122_342276.html)


## 2008 蟲(worms)

蟲を切断して遊ぶゲーム。ドラッグでレーザーを照射。

<img alt="蟲" src="/images/works/worms.png" class="right">

よく考えてみるとマジキチ。複雑系に興味を持って作ったらしい。

HSPTV部門で効果音を扱うために、[winmm.dll](http://gmr.blog.shinobi.jp/-hsp3%E3%83%A1%E3%83%A2-%E3%82%B5%E3%83%B3%E3%83%97%E3%83%AB/hsp%E3%81%A7%E3%80%81midi%E3%82%B5%E3%82%A6%E3%83%B3%E3%83%89%E3%82%92%E9%B3%B4%E3%82%89%E3%81%99%20-winmm.dll-) を使用した。

* コンテスト
  * [HSPコンテスト2008 #95](http://hsp.tv/contest2008/list_s1.html#id95)
  * [アジアン・インテグレーション有限会社賞](http://hsp.tv/contest2008/cntst_fresult.html#95)
* 作成記録
  * [GAM-22のメモ](http://gmr.blog.shinobi.jp/-%E4%BD%9C%E6%88%90%E8%A8%98%E9%8C%B2-%E8%9F%B2/)


# Windows Games

HSPで作ったWindows向けゲーム達です。

## 2007 Battle Armor

[<img alt="Battle Armor" src="/images/works/battle_armor.png" class="right">](/images/works/battle_armor_original.png)

中2の時に作ったタンクシューティング。

バランスがおかしいですが、クリアは出来ます。

* コンテスト
  * [HSPコンテスト 2007 #180](http://hsp.tv/contest2007/list_n3.html#id180)
  * [アジアン・インテグレーション賞](http://hsp.tv/contest2007/cntst_fresult.html#180)
* その他
  * [Vector](http://www.vector.co.jp/soft/winnt/game/se442399.html)
  * [Windows100% 12月号に掲載](http://gmr.blog.shinobi.jp/-%E7%A7%81%E3%81%AE%E3%83%A1%E3%83%A2-%E8%87%AA%E6%85%A2/windows100-%2012%E6%9C%88%E5%8F%B7%E3%80%80%E6%8E%B2%E8%BC%89)
  * [README的な何か](http://file.gmr.blog.shinobi.jp/battle_armor.index.htm)
* 作成記録
  * [GAM-22のメモ](http://gmr.blog.shinobi.jp/-%E4%BD%9C%E6%88%90%E8%A8%98%E9%8C%B2-battle%20armor/)


## 2006 ASTEROIDS

<img alt="ASTEROIDS" src="/images/works/asteroids.jpg" class="right">

中1の時に作った、アーケードゲームの"ASTEROIDS"風の全方向シューティングゲーム。

UFOやパワーアップアイテムなどのオリジナル要素があります。

* [Vector](http://www.vector.co.jp/soft/win95/game/se414088.html)
* [GAM-22のメモ](http://gmr.blog.shinobi.jp/-%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%A0-%E6%99%AE%E9%80%9A/asteroids%20-%2016.8)
* [Windows100% 5月号に掲載](http://gmr.blog.shinobi.jp/-%E7%A7%81%E3%81%AE%E3%83%A1%E3%83%A2-%E8%87%AA%E6%85%A2/windows100-%205%E6%9C%88%E5%8F%B7%E3%80%80%E6%8E%B2%E8%BC%89)
* [kerupaniさんによる動画](http://www.youtube.com/watch?v=6rXsh1ktsh0)

## それ以前

* [HDDに眠っていた昔作ったHSPゲームを公開](http://gmr.blog.shinobi.jp/-%E7%A7%81%E3%81%AE%E3%83%A1%E3%83%A2-%E6%97%A5%E8%A8%98/hdd%E3%81%AB%E7%9C%A0%E3%81%A3%E3%81%A6%E3%81%84%E3%81%9F%E6%98%94%E4%BD%9C%E3%81%A3%E3%81%9Fhsp%E3%82%B2%E3%83%BC%E3%83%A0%E3%82%92%E5%85%AC%E9%96%8B)
* [戦車vs●](http://gmr.blog.shinobi.jp/-%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%A0-%E3%82%B7%E3%83%A7%E3%83%BC%E3%83%88/%E6%88%A6%E8%BB%8Avs%E2%97%8F%20-%200.5)
