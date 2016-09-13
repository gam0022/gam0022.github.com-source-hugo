---
layout: post
title: "GPUをつかったリアルタイムなレイトレーシング"
date: 2016-04-09 18:03
comments: true
categories: 
- WebGL
- CG
- レイマーチング
---

Qiitaに「GPUをつかったリアルタイムなレイトレーシング」の記事を2つ投稿しました。

実際に動作するものはコチラです。WebGLなのでブラウザでそのまま動作します。

- [reflect](http://gam0022.net/webgl/#raymarching_reflect)
- [gem](http://gam0022.net/webgl/#raytracing_gem)

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">Three.jsからGPUをつかったリアルタイムなレイトレーシング！<a href="https://t.co/zu5v2NXXeq">https://t.co/zu5v2NXXeq</a><br>WebGL Advent Calendar 15日目の記事です。 <a href="https://t.co/mwFZrFjJdf">pic.twitter.com/mwFZrFjJdf</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/676564561034481664">2015年12月15日</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">これがGPUの力！three.jsによるレイトレーシング 〜宝石編〜<a href="https://t.co/dU4bQOnpPg">https://t.co/dU4bQOnpPg</a><br>屈折のあるレイトレーシングをGLSLのフラグメントシェーダで実装した話を書きました。 <a href="https://t.co/HnEMg7mUwP">pic.twitter.com/HnEMg7mUwP</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/692856764081897472">2016年1月28日</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

レイトレーシングは膨大な計算が必要で、一般的にはリアルタイムに行うことは困難です。

WebGLのフラグメントシェーダでレイトレーシングを実装することで、GPUの力を利用してリアルタイムに処理しようというものです。

記事で紹介している例は、iPhone6のような携帯端末でもリアルタイムに動作するくらい軽量です。

さらに面白い特徴として、ラスタライザでは難しい、相互の鏡面反射、2回以上の屈折、無限の繰り返しも実現しています。

ラスタライザで鏡面反射するためには、[キューブ環境マッピング](https://wgld.org/d/webgl/w044.html)がよく用いられます。
環境マッピングとは、周囲の景色を立方体のテクスチャに入れておいて、それを参照して反射して写り込んだ景色をフェッチします。
しかし、環境マッピングだけでは、床も球体も鏡面反射するような、相互に鏡面反射するシーンは実現できません。

また屈折も環境マッピングで実現できるのですが、[環境マッピングで2回以上の屈折させるのは難しい課題](http://www.4gamer.net/games/032/G003263/20130207052/)になります。

レイトレーシングではカメラからスクリーンの全ピクセルに対して光のシュミレーションをするため、
環境マッピングでは難しかった鏡面反射や屈折の問題を簡単に解決できるというわけです！

1つ目の記事ではレイトレーシングではなく、厳密にはレイマーチングを使っています。
レイマーチングはレイトレーシングの1種です。レイマーチングでは、シーンを距離関数で定義します。
シーンを距離関数で定義することで、`mod` 演算を利用した物体を無限に繰り返すことができます。

昔はレイトレーシングで1枚の絵を描画するために一晩のような長い時間が必要でした。
それが今やリアルタイムにWebブラウザ上で動作するなんて、すごい時代になりましたね。
