+++
date = "2016-09-22T00:00:00"
draft = false
title = "Works"
subtitle = ""
section_id = 10
weight = 10
section = 100
toc = true
+++

# Publications

執筆した書籍を紹介します。

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
- [webgl raymarching hybrid example - WebGL sandbox](http://gam0022.net/webgl/#raymarching_hybrid)

## 2015冬 JavaScriptoon2

[<img alt="JavaScriptoon2" src="/images/works/javascriptoon2.jpg" class="right">](/images/works/javascriptoon2_original.jpg)

TechBooster というサークルに参加し、「JavaScriptoon2」というWebフロントエンド本を執筆しました。

「シェーダだけで世界を創る！Three.jsによるレイマーチング」という章を担当しました。

レイマーチングはレイトレーシングの1種です。
レイトレーシングやレイトレーシングは膨大な計算が必要ですが、フラグメントシェーダで実装することで、GPUの力を利用したリアルタイムに描画する方法を紹介しています。

そもそもシェーダとは何かという基礎の解説からはじまり、レイマーチングの肝となる「距離関数」についても丁寧に解説しました。

- [JavaScriptoon2 - TechBooster in C89](https://techbooster.github.io/c89/#scriptoon2)
- [JavaScriptoon2 - BOOTH](https://techbooster.booth.pm/items/178227/)

## 2015夏 JavaScriptoon

[<img alt="JavaScriptoon" src="/images/works/javascriptoon.png" class="right">](/images/works/javascriptoon_original.png)

TechBooster というサークルに参加し、「JavaScriptoon」というWebフロントエンド本を執筆しました。

「three.js でお手軽 3DCG 入門」という章を担当しました。

three.js はWebGLを手軽に使うためのJavaScriptのライブラリです。

3DCGが初めてという人でも分かるように、基礎から説明しています。

- [JavaScriptoon - TechBooster in C88](https://techbooster.github.io/c88/#scriptoon)
- [JavaScriptoon - BOOTH](https://techbooster.booth.pm/items/126683/)

# WebGL Works

WebGLで作成した映像作品と活動を紹介します。

動くデモは[こちら](http://gam0022.net/webgl/)にもまとめています。

## 2016 Carbon

[<img alt="Carbon" src="/images/works/carbon.png" class="right">](/images/works/carbon_original.png)

TokyoDemoFest 2016 の GLSL Graphics Compo で3位入賞した、レイマーチングによる映像作品です。

Mandelbox というフラクタル図形を mod で無限にループさせています。

- [Shadertoy - Carbon \[TDF2016\] - Final Version](https://www.shadertoy.com/view/MsG3Wy)
- [GLSL Sandbox - Carbon - TDF Submited Version](http://glslsandbox.com/e#30972.0)

解説記事はこちらです。

- [#TokyoDemoFest 2016 の GLSL Graphics Compo で3位入賞！ - gam0022.net](/blog/2016/02/24/tokyo-demo-fest/)

## 2016 #GLSLTech 発表資料

「シェーダだけで世界を創る！three.jsによるレイマーチング」という発表資料です。

2/14のバレンタインデーに開催された「GPU の熱でチョコも溶けちゃう！？ GLSL シェーダテクニック勉強会（#GLSLTech）」で登壇したときのものです。

詳細は[ブログの記事](/blog/2016/02/16/glsl-tech/)にまとめました。

<iframe src="//www.slideshare.net/slideshow/embed_code/key/rS2j757JUrqeWL" width="340" height="290" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/shohosoda9/threejs-58238484" title="シェーダだけで世界を創る！three.jsによるレイマーチング" target="\_blank">シェーダだけで世界を創る！three.jsによるレイマーチング</a> </strong> from <strong><a target="\_blank" href="//www.slideshare.net/shohosoda9">Sho Hosoda</a></strong> </div>

## 2016 Gem

[<img alt="Gem" src="/images/works/gem.png" class="right">](/images/works/gem_original.png)

光の屈折をシミュレートすることで、輝く宝石をWebGLでレンダリングする「gem」という作品（技術デモ）をつくりました。
レイトレーシングをGLSLのフラグメントシェーダで実装することで、GPUの並列計算を利用したリアルタイムな描画を実現しています。

- [Gem - gam0022.net](http://gam0022.net/webgl/gem.html)

解説記事はこちらです。

- [これがGPUの力！three.jsによる“リアルタイム”なレイトレーシング 〜宝石編〜 - Qiita](http://qiita.com/gam0022/items/9875480d33e03fe2113c)

## 2015 Reflect

[<img alt="Gem" src="/images/works/reflect.png" class="right">](/images/works/reflect_original.png)

レイマーチングで鏡面反射する球体を無限に並べたシーンをリアルタイムに描画するデモです。
three.js 公式サンプルにも取り込まれています。

- [Reflect - gam0022.net](http://gam0022.net/misc/raymarching/reflect.html)
- [three.js 公式サンプル](http://threejs.org/examples/#webgl_raymarching_reflect)

解説記事はこちらです。

- [これがGPUの力！Three.jsによる“リアルタイム”なレイトレーシング - Qiita](http://qiita.com/gam0022/items/03699a07e4a4b5f2d41f)

## 2015 Steal Frame

[<img alt="Steel Frame" src="/images/works/steel_frame.png" class="right">](/images/works/steel_frame_original.png)

鉄筋をモチーフにしたレイマーチングによる作品です。

距離関数の解説用につくったので、わずか20行ほどのコードでシーンを定義しています。

- [Steal Frame - gam0022.net](http://gam0022.net/misc/raymarching/steel_frame.html)

# Google Chrome Extention

Goole Chrome の拡張機能を紹介します。

## 2016 Slack 返信引用ボタン

<img alt="Slack Reply Button" src="/images/works/slack-reply-button.png" class="right">

Slack に返信と引用ボタンをつけるChrome拡張機能です。

- [Slack 返信引用ボタン - Chrome ストア](https://chrome.google.com/webstore/detail/slack-%E8%BF%94%E4%BF%A1%E5%BC%95%E7%94%A8%E3%83%9C%E3%82%BF%E3%83%B3slack-reply/cechhipifmcinmnnjnlichjigoabokbg?hl=ja)
- [GitHubリポジトリ](https://github.com/gam0022/slack-reply-and-quote-button)

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

## 2016 Tsukihi

<div style="width: 300px;" class="right">
<script async class="speakerdeck-embed" data-slide="1" data-id="3e8b7d83dd0e4b19891d6c8321431d47" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>
</div>

距離関数によって表現されたオブジェクトをレイマーチングでレンダリングするCPUレンダラーです。
パストレーシングによるレンダラーの実装と擬似表現によるレンダラーの両方の実装があります。

- [レイトレ合宿4!? に参加しました！ - gam0022のブログ](http://gam0022.hatenablog.com/entry/raytracingcamp4)
- [レイトレ合宿4!?](https://sites.google.com/site/raytracingcamp4/)

# iOS App

## 2013 カメラで商品検索 C2search

[<img alt="C2search" src="/images/works/C2search_tmb.png" class="right">](/images/works/C2search.png)


「カメラで商品検索」という画像によって商品の横断検索ができるiOSアプリを開発しました。

画像認識によって、タイトルが長い本、名前を忘れてしまった商品も簡単に検索できます。

Yahoo!ショッピングと楽天市場の両方の結果を同じテーブルビューに表示します。

検索結果を色によってソートする機能もあります。

Yahoo Inter Hack U 2013 参加作品です。

* [公式ページ](http://c2search.gam0022.net/)
* [Hack ID: 2 カメラで商品検索](http://yhacks.jp/hacku/inter2013/works/2)
* [マイナビさんによる紹介](http://news.mynavi.jp/articles/2013/12/06/yahoo_inter_hack_u/001.html)


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

<iframe src="http://www.slideshare.net/slideshow/embed_code/29144855" width="342" height="291" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC;border-width:1px 1px 0;margin-bottom:5px" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="https://www.slideshare.net/shohosoda9/immutable-list-29144855" title="Rubyで連結リスト使うためのgemを作った(tsukuba.rb版)" target="\_blank">Rubyで連結リスト使うためのgemを作った(tsukuba.rb版)</a> </strong> from <strong><a href="http://www.slideshare.net/shohosoda9" target="\_blank">Sho Hosoda</a></strong> </div>

# Web

## 2013 Twitter名刺ジェネレーター

[<img alt="Twitter名刺ジェネレーター" src="/images/works/tmg_tmb.png" class="right">](/images/works/tmg.png)

TwitterIDを入力するだけで簡単に名刺が作れるサービスです。

認証は不要でデザインを選択するだけ！

さらに、マルコフ連鎖によってあなたを適当に自己紹介してくれます！

* [Twitter名刺ジェネレーター](http://gam0022.net/app/tmg/)


## 2013 Shelf

[<img alt="Shelf" src="/images/works/shelf.png" class="right">](/images/works/shelf_original.png)

3Dで描画された回転する棚にカバンを展示することで、実際の店舗でショッピングをしている感覚を体験できるというコンセプトのWeb通販サイトのプロトタイプです。

[COJT](http://inf.tsukuba.ac.jp/ET-COJT/)という、筑波大学の産学連携の授業で開発しました。

WebGL(Canvas)で描画しています。

COJTソフトウェアコース2013の前期の準優勝/技術賞受賞作品です。

[&raquo; Shelf](http://gam0022.net/app/shelf/)


## 2012-2013 TwinCal

<img alt="twincal" src="/images/works/twincal.png" class="right">

TwinCalとは、Twinsの時間割をiCalendar形式に変換し、
Googleカレンダー・iCalへのインポートをサポートするWebサービスです。

* [&raquo; TwinCal](http://gam0022.net/app/twincal/)
* [アカリクVALUATOR主催 学生のためのアプリ開発コンテスト 最終選考プレゼン](http://tech-tokyo.com/?p=8594)で発表しました。


## 2011-2013 @daigoroubot

<img alt="大五郎Bot" src="/images/works/daigoroubot.png" class="right">

マルコフ連鎖で学習する人工無能のTwitterのBOTです。

つくば市の天気予報機能、電卓機能、n進数変換器、全学教室検察など便利な機能を搭載しています。

[&raquo; More](/works/daigoroubot/)

[&raquo; @daigoroubot - Twitter](https://twitter.com/daigoroubot)


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
