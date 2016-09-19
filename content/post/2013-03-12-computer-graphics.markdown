---
layout: post
title: "コンピューグラフィックス基礎の成果報告"
slug: computer-graphics
date: 2013-03-12T23:28:00+09:00
comments: true
tags:
- study
---

久々の更新です。

早いもので大学2年の授業が終わって春休みになってしまいました。

3学期には、[コンピューグラフィックス基礎](http://www.coins.tsukuba.ac.jp/syllabus/GB13704.html)という授業を履修したのですが、
今学期で一番楽しい授業だったなーと思うので振り返ってみます。

基本的にはOpenGLを使って色々しました。

特に力を入れた課題などを紹介します。

ソースコードなどはすべて[github](https://github.com/gam0022/computer-graphics/)にあるので、
気になる人はぜひ見てね!

# 課題3 ASTEROIDS

OpenGLを使ってアニメーションを作るという課題があったので、
全方位シューティングゲームを作ってみました。

技術的な点だと、自機、隕石、弾の3つは、慣性移動、衝突判定、描画などは共通の処理でできるので、
この3つを`object`という構造体1つで管理して、同じような処理を何度も書かないようにしました。

![title画面](/images/posts/2013-03-12-computer-graphics/3/title.png)

<!-- more -->

![プレイ中](/images/posts/2013-03-12-computer-graphics/3/playing.png)

![ゲームオーバー](/images/posts/2013-03-12-computer-graphics/3/gameover.png)

# 課題4 立体の展開図

OpenGLの回転と平行移動を駆使して、立体の展開図のアニメーションを作りました。

まずは立方体の展開図。

![立方体-1](/images/posts/2013-03-12-computer-graphics/4/img1_1.png)
![立方体-2](/images/posts/2013-03-12-computer-graphics/4/img1_2.png)
![立方体-3](/images/posts/2013-03-12-computer-graphics/4/img1_3.png)

正12面体となると、座標の計算が大変でしたが、気合で実装しました。

![正12面体-1](/images/posts/2013-03-12-computer-graphics/4/img2_1.png)
![正12面体-2](/images/posts/2013-03-12-computer-graphics/4/img2_2.png)
![正12面体-3](/images/posts/2013-03-12-computer-graphics/4/img2_3.png)
![正12面体-4](/images/posts/2013-03-12-computer-graphics/4/img2_4.png)

# 課題5 ベジエ曲線

マウスで制御点を入力してベジエ曲線を描く課題です。

定義式をプログラムにするだけの簡単なお仕事でした。

![制御点が３次のベジエ曲線](/images/posts/2013-03-12-computer-graphics/5/img1.png)

オプションとして3次元バージョンにも挑戦しました。

![制御点が３次のベジエ曲線の3次元](/images/posts/2013-03-12-computer-graphics/5/img2.png)


# 課題7 OBJファイルで立体を表現

OBJファイルという、頂点と面の2つの情報で立体を表す立体図形のフォーマットがあるのですが、
このOBJファイルを出力するプログラムを作りました。

ちなみに、OBJファイルを描画するプログラムは先生の方で用意してくれました。

球体は普通にやると頂点部分で例外処理があって面倒ですが、頂点部分に複数の頂点がくるようにして楽しました。

![球体](/images/posts/2013-03-12-computer-graphics/7/sphere.png)

Wikipediaにトーラスの式があるので、それを参考にして作りました。

球の課題の式の定義部分を変更するだけで、できたので楽でした。

![トーラス](/images/posts/2013-03-12-computer-graphics/7/torus.png)

3角関数で半径を変化させて、適当な回転体を作りました。

![回転体](/images/posts/2013-03-12-computer-graphics/7/revolution_1.png)

また、マウスで入力した線から任意の回転体を作ったりしました。

![UFO](/images/posts/2013-03-12-computer-graphics/7/ufo.png)
![コマ](/images/posts/2013-03-12-computer-graphics/7/koma.png)
![グラス](/images/posts/2013-03-12-computer-graphics/7/cup.png)
![hoge](/images/posts/2013-03-12-computer-graphics/7/hoge.png)

また、マウスで線を描くときに下から上に線を引くと、面が裏返るので、それを利用してプリンみたいなのも作りました。

![プリン](/images/posts/2013-03-12-computer-graphics/7/pudding.png)

# 課題9 レイトレーシング

レイトレーシングをやりました。

普通にやるとつまらないので、いろいろ工夫しました。

* レイを再帰的に計算して、ピカピカに
* 3x3でアンチエイリアス
* 色は乱数でRGBを求めると鮮やかにならないので、HSVで計算
* Zbuffer的な概念を取り入れて、球が床に食い込んでも重なっても大丈夫なように

![レイトレーシング1](/images/posts/2013-03-12-computer-graphics/9/img3-1.png)
![レイトレーシング2](/images/posts/2013-03-12-computer-graphics/9/img3-2.png)
![レイトレーシング3](/images/posts/2013-03-12-computer-graphics/9/img3-3.png)
![レイトレーシング4](/images/posts/2013-03-12-computer-graphics/9/img3-4.png)
![レイトレーシング5](/images/posts/2013-03-12-computer-graphics/9/img3-5.png)
![レイトレーシング6](/images/posts/2013-03-12-computer-graphics/9/img4-1.png)

# 課題10 布のシュミレーション

Mass-Spring モデルによる簡易的な布の物理シミュレーションをしました。

![布のシュミレーション](/images/posts/2013-03-12-computer-graphics/10/img1.png)

球体との衝突判定を追加してみたのが次です。

![布のシュミレーション(球との衝突)](/images/posts/2013-03-12-computer-graphics/10/img2.png)

# まとめ

こうして振り返ると、かなり色々な課題に挑戦しましたが、どれも楽しかったです。

CGを自分の研究としてもいいなーとか思ってしまいました。
