+++
slug = "unity-bible2"
date = "2021-06-08T10:30:19+09:00"
image = "/images/posts/2021-05-27-unity-bible2/Collage_Fotor.jpg"
toc = true
math = false
draft = false
tags = [
    "Unity", "出版", "Raymarching", "Shader", "シェーダー", "書籍", "ボーンデジタル"
]
title = "『Unityゲーム プログラミング・バイブル 2nd Generation』のレイマーチングとTimelineの章を執筆しました"

+++

6/29発売の[『Unityゲーム プログラミング・バイブル 2nd Generation』](https://amzn.to/49EGscO)を執筆しました。

<!--
[![『Unityゲーム プログラミング・バイブル 2nd Generation』](/images/posts/2021-05-27-unity-bible2/Collage_Fotor.jpg)](/images/posts/2021-05-27-unity-bible2/Collage_Fotor.png)
-->

[![『Unityゲーム プログラミング・バイブル 2nd Generation』](/images/posts/2021-05-27-unity-bible2/Collage_Fotor.jpg)](https://amzn.to/49EGscO)

『Unityゲーム プログラミング・バイブル 2nd Generation』について、公式ページから紹介文を引用します。

> **Unityのゲーム開発現場で最も使われた決定版書籍が、大幅バージョンアップして登場!**
> **ゲームの開発現場で即実践できるスキルが身につく!**
>
> 本書は、ゲーム開発で最も使われている「Unity」の入門や初級レベルを卒業した方向けの書籍です。ゲームの開発現場で、即実践できるスキルが身につくように、**「37」の最新のトピックを網羅**しました。
>
> 本書には、第一線の現場で活躍している23名の著者陣が参加しており、ゲーム開発のノウハウやTipsが満載されています。またほとんどのトピックでは、サンプルゲームがダウンロードでき、実際に動かしながら、実践的に学んでいくことが可能です。
>
> Unityでのゲーム開発のさまざまな場面で、すぐに役立つ1冊となっています。

<!--
![Unityゲーム プログラミング・バイブル 2nd Generation](/images/posts/2021-05-27-unity-bible2/Collage_Fotor.jpg)
-->

37のトピックのうち、私は次の2つを担当しました。

- レイマーチング：基礎から応用まで
- Timelineによる映像制作

この記事では私の担当した内容を簡単に紹介します。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">『Unityゲーム プログラミング・バイブル 2nd Generation 』を執筆しました！<br>6/29発売です！<br><br>・レイマーチング：基礎から応用まで<br>・Timelineによる映像制作<br><br>の2本を担当しました。<a href="https://t.co/lYWIxseCON">https://t.co/lYWIxseCON</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1392725305526161411?ref_src=twsrc%5Etfw">May 13, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<!--more-->

# レイマーチング：基礎から応用まで

<div style="display: flex;">
    <div style="width: 50%;"><a href="/images/posts/2021-05-27-unity-bible2/11_RaymarchingOpRepeat.jpg"><img src="/images/posts/2021-05-27-unity-bible2/11_RaymarchingOpRepeat.jpg" alt="サンプル11 距離関数の応用：無限複製編" /></a></div>
    <div style="width: 50%;"><a href="/images/posts/2021-05-27-unity-bible2/13_RaymarchingBoolean2.jpg"><img src="/images/posts/2021-05-27-unity-bible2/13_RaymarchingBoolean2.jpg" alt="サンプル13 距離関数の応用：無限複製とブーリアン演算の合せ技" /></a></div>
</div>

<!--
![サンプル11 距離関数の応用：無限複製編](/images/posts/2021-05-27-unity-bible2/11_RaymarchingOpRepeat.jpg)
![サンプル13 距離関数の応用：無限複製とブーリアン演算の合せ技](/images/posts/2021-05-27-unity-bible2/13_RaymarchingBoolean2.jpg)
-->

このセクションでは「レイマーチング」という手法により、グラフィックスを描画する仕組みを紹介しました。

レイマーチングと似た名前の手法にレイトレーシングがありますが、どちらもレイ、つまり光線をプログラムでシミュレーションしてカメラに映る画像を生成する手法です。

レイマーチングでは、距離関数という数式で定義した形状に対して、レイとの交差判定を行うことで照明や反射などの計算を行います。
そのため、通常のUnityの描画パイプラインではできないような表現が可能になるということが特徴です。

このセクションでは、Unityのシェーダーのコードを記述してレイマーチングを実装します。
レイマーチングの基礎から応用まで解説するために、合計13個のサンプルシーンを用意しました。
少しずつ処理を加えることで、一歩ずつレベルアップしながら理解を深められるチュートリアル形式のサンプルシーンになっています。

サンプルプロジェクトは、筆者のGitHubにて公開しています。

- https://github.com/gam0022/UnityBible2-RaymarchingTutorial

このセクションで学べることとそのポイントを、以下にまとめておきます。

- レイマーチングのアルゴリズムと本質
    - レイマーチングは魔法の道具ではなく、単なる衝突判定の手法
    - 数式（距離関数）によるプロシージャルなモデリング手法
- コンピュータグラフィックスの基礎
    - レイマーチングが扱う範囲はあくまで衝突判定
    - ライティングは通常のシェーダーとまったく同じように実装する必要がある
    - Unityエンジンのシーンやライティング機能を利用せずに、グラフィックスを描画する一連の流れを学べるため、コンピュータグラッフィックスの学習教材としても有用

## 執筆の裏話

執筆の裏話としては作図にレイマーチングを利用しました。

よくあるレイトレーシングの原理（スクリーン上のピクセルに対応する向きのレイを飛ばして交差判定）を解説するための図が欲しかったので、レイマーチングで作図しました。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">シェーダーは最強の作図ツールなので、<br>レイトレーシングの原理を説明するための図をUnityシェーダーだけで作りました。 <a href="https://t.co/VuLBhoqEaY">pic.twitter.com/VuLBhoqEaY</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1343070779961839617?ref_src=twsrc%5Etfw">December 27, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

ちゃんとアニメーションもできるように作り込んだのですが、書籍だと静止画になってしまうのが残念ですね。

# Timelineによる映像制作

[![Timelineによる映像制作](/images/posts/2021-05-27-unity-bible2/00_Top.jpg)](/images/posts/2021-05-27-unity-bible2/00_Top.jpg)

このセクションでは、Unityの[Timeline](https://docs.unity3d.com/ja/2019.2/Manual/TimelineOverview.html)を利用した映像作品の制作について解説しました。

このセクションで学べる項目は、以下の通りです。

- [uRaymarching](https://github.com/hecomi/uRaymarching)を利用したレイマーチング
- Post-processing Stackの導入からビルトインエフェクトの利用、カスタムエフェクトの作成まで
- Timelineの基本からカスタムトラックの作成まで
- Cinemachineの基本的な使い方から、Post-processing Stackとの連携まで

<!--
このセクションのサンプルシーンは、以下の各バージョンで作成しています。

- Unity 2020.1.8f1
- uRaymarching: v2.1.1
- Post-processing Stack（v2）2.3.0
- Timeline 1.3.6
- Cinemachine 2.6.3
- TextMeshPro 3.0.3
- Unity Recorder 2.5.2
-->

映像の作成のためには、数多くのUnityの機能とAssetを組み合わせる必要があります。

それぞれのUnityの機能とAssetにフォーカスを当てた合計12個のサンプルシーンを用意しました。
サンプルシーンはチュートリアル形式で、一歩ずつレベルアップしながら理解を深められるようになっています。

サンプルプロジェクトは、筆者のGitHubで公開しています。

- https://github.com/gam0022/UnityBible2-TimelineTutorial

![サンプル12 音楽と同期して演出をブラッシュアップ](/images/posts/2021-05-27-unity-bible2/12_BeatSync.gif)

## 執筆の裏話

これも執筆の裏話になりますが、**デモのメイキングを書籍として出版する** という個人的な試みに今回はチャレンジしました。

このツイートが伏線でした。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">RevisionのWriteup先には意外な &quot;媒体&quot; を予定しています</p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1379103521409101826?ref_src=twsrc%5Etfw">April 5, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

サンプルの完成形のデモが『Secret stage BOSS』です。Revision2021のPC Demo Compoで初リリースしました。

グラフィックスは私（[@gam0022](https://twitter.com/gam0022/)）、サウンドはさだきちさん（[@sadakkey](https://twitter.com/sadakkey)）が担当しました。

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">&quot;Secret stage BOSS&quot; by <a href="https://twitter.com/gam0022?ref_src=twsrc%5Etfw">@gam0022</a> &amp; <a href="https://twitter.com/sadakkey?ref_src=twsrc%5Etfw">@sadakkey</a><br><br>Our new PC Demo for <a href="https://twitter.com/hashtag/Revision2021?src=hash&amp;ref_src=twsrc%5Etfw">#Revision2021</a> (<a href="https://twitter.com/revision_party?ref_src=twsrc%5Etfw">@revision_party</a>)<br><br>It&#39;s a Massive Greetings to &quot;2nd stage BOSS&quot; <a href="https://t.co/vVWJJB4cyS">pic.twitter.com/vVWJJB4cyS</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1378967812463501313?ref_src=twsrc%5Etfw">April 5, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

『Secret stage BOSS』は[『2nd stage BOSS by 0x4015&YET11』](https://youtu.be/SFoyJED5A4s)というデモシーン歴史に残る伝説級のデモのオマージュ作品です。

自機やボスが登場するシューティングゲーム風のストーリーを、自分たちなりのビジュアルと音楽のスタイルで再現しました。

<div class="movie-wrap">
<iframe width="1920" height="1080" src="https://www.youtube.com/embed/srO7IxNckZ8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

GitHub上でUnityプロジェクトを丸ごと公開しているので、もし興味があれば参考にしてください。

<blockquote class="twitter-tweet" data-conversation="none"><p lang="ja" dir="ltr">You can see the source code &amp; Unity project on GitHub!<br><br>ソースコードとUnityプロジェクトをGitHubで公開しました！<a href="https://t.co/dQJV35DGKB">https://t.co/dQJV35DGKB</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1378975301456130049?ref_src=twsrc%5Etfw">April 5, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

# おわりに

6年前にレイマーチングと出会ってから、レイマーチングの面白さに魅せられ続け、レイマーチングに関するさまざまな情報を発信してきました。
今回、Unityの一般ユーザー向けの書籍でレイマーチングについて解説をする機会をいただけたことをとても光栄に思います。
これまでシェーダーと縁がなかった方にもシェーダーに興味をもってもらえれば幸いです。

日本語で書かれたレイマーチングの入門情報はかなり充実してきましたが、その次のステップの情報が不足しているように感じていました。
本書ではレイマーチングの中級者向けの情報として、距離関数によるモデリングや本格的なライティングまで解説しました。
レイマーチングで球体のレンダリングはできたけど、その次のステップが分からないという方にぜひ読んでいただきたいです。

本書は定価8580円と気軽に購入しづらいかもしれませんが、**フルカラーの1112ページ、扱うテーマの広さ、得られる情報の密度**を踏まえると妥当（むしろお買い得！）な値段だと思います。
初版部数はAmazonでの予約数をもとに決まるそうなので、ぜひ[Amazonから予約](https://amzn.to/3oe2agf)をお願いします！

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">リアルタイムレンダリング 第4版よりもページ数が多いことに気がついて驚いています。 <a href="https://t.co/zJGUYOm8XL">https://t.co/zJGUYOm8XL</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1393040315762634755?ref_src=twsrc%5Etfw">May 14, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

# 追記（2021-08-21）

7/29の「Unityゲーム プログラミング・バイブル 2nd Generation 出版記念トーク グラフィックス編」にゲスト出演しました。

[Unityゲーム プログラミング・バイブル 2nd Generation 出版記念トーク グラフィックス編](https://learning.unity3d.jp/7437/)

# Amazonページ

 - [『Unityゲーム プログラミング・バイブル 2nd Generation』](https://amzn.to/49EGscO)