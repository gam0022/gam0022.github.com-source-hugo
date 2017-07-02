+++
date = "2017-06-30T04:33:31+09:00"
draft = false
image = "/images/posts/2017-06-30-raymarching-kado/kado.png"
math = false
slug = "raymarching-kado"
tags = ["CG", "WebGL", "レイマーチング"]
title = "正解するカドの「カド」をレイマーチングでリアルタイム描画する"
toc = true

+++

今夜はアニメ[「正解するカド」](http://seikaisuru-kado.com/)の最終回ですね。

フラクタル図形（カド）や折り紙（ワム）が重要な要素になっていて、個人的にとても刺さるアニメでした。

最終回は楽しみですが、今日で終わってしまうと思うと寂しくも感じます。

さて、[レイマーチング（スフィアトレーシング）](https://www.slideshare.net/shohosoda9/threejs-58238484)は「カド」のようなフラクタル図形の描画がとても得意です。

そこで、WebGLによるレイマーチングでカドのレンダリングに挑戦しました！！

[![カド](/images/posts/2017-06-30-raymarching-kado/kado.png)](/images/posts/2017-06-30-raymarching-kado/kado.png)

レイマーチングでカド(MandelBox)を描画した結果です。

次のリンクからブラウザ上から動かすこともできます。

- [http://gam0022.net/webgl/#raymarching_kado](http://gam0022.net/webgl/#raymarching_kado)

PauseをOFFにすると、カドがアニメーションします（負荷注意）。

描画の負荷が重たすぎる場合には、Pixel Ratioを1/2xか1/4xにしてください。

<!--

Pixel Ratioを2xにすると、綺麗な結果になりますが、描画の負荷が4倍になります。

2xにする場合は、PauseをONにするのがオススメです。カメラを動かさない限り再描画が行われなくなり、描画の負荷が下がります。

-->

<!--more-->

# 解説

制作における工夫点や参考資料を紹介していきます。

## カドのレンダリング

アニメの「カド」はMandelBoxと呼ばれるフラクタル図形をベースに改造したもののようです。

- [謎に満ちたアニメCGプロジェクト『正解するカド』（総監督：村田和也）に迫る 〜 mystery 01：3Dフラクタル 〜](https://cgworld.jp/feature/201602-kado01-cgw211.html)

今回はベーシックなMandelBoxをレイマーチングで普通に描画しました。

MandelBoxの距離関数は以下のサイトを参考に実装しました。

- [Distance Estimated 3D Fractals (VI): The Mandelbox](http://blog.hvidtfeldts.net/index.php/2011/11/distance-estimated-3d-fractals-vi-the-mandelbox/)

カドのシェーディングは[TokyoDemoFest2017の作品](http://gam0022.net/blog/2017/02/24/tdf2017/)の実装をほぼそのまま流用しました。

独特なカラフルな色は色相をレイマーチングのステップ数などによって変化させることで実現しています。

IBL(Image Based Lighting)やAO(Ambient Occlusion)でシェーディングの品質を高めました。IBLのためのキューブマップ画像は以下のサイトのものを利用しました。

- [Skyboxes for download](http://www.custommapmakers.org/skyboxes.php)

## 水面のレンダリング

カドのレンダリングは特に特殊なことはしていませんが、水面には色々な工夫をこらしました。

### CPUによるパーリンノイズの生成

フラクタルノイズの1種であるパーリンノイズをハイトマップとして、水面を表現しました。

ハイトマップとの衝突判定もレイマーチングにより行いました。
ハイトマップの距離関数は非常にシンプルに実装できます。

```c
float sdGround(in vec3 p) {
	return p.y - texture2D(groundHeight, p.xz * 0.1).r + GROUND_BASE;
}
```

パーリンノイズの生成は起動時にCPU側で行っています。

次のサイトを参考にして、JavaScriptでパーリンノイズの計算を実装しました。

- [パーリンノイズを理解する](http://postd.cc/understanding-perlin-noise/)

この記事を読んで、今まで「パーリンノイズ」だと思い込んでいたものが、「バリューノイズ」だと知りました。

勾配を使った本物のパーリンノイズの実装は今回が初めてだったので、勉強になりました。

### 水面のアニメーション

3Dのパーリンノイズを実装したので、時間方向にパーリンノイズを動かすことで、水面のアニメーションもできます。

`Animate Water`というチェックボックスをONにすると、水面のアニメーションができます。

毎フレーム毎にCPU計算で256x256のパーリンノイズを生成するため、かなり激重です。ハイエンドPCでもまともに動きませんｗ

起動時にまとめて生成すれば良いような気がしますが、起動時間が長くなるのが嫌なので、このような仕様となっています。

### 衝突判定の軽量化

単純に水面のハイトマップをテクスチャとして参照する実装にしたところ、テクスチャのフェッチ回数が危険領域に突入しました。

そこで、カメラの近くの水面だけハイトマップからレイマーチングを行うようにして、
カメラから離れた水面は凹凸のない平面として扱い、判定式から解析的に衝突判定を行うことで、軽量化を図りました。

遠くの水面は形状的には平面ですが、シェーディングの法線計算ではハイトマップを参照するようにして、見た目の品質を向上しました。
ノーマルマップと全く同じ原理です。

ちなみに、今回のシーンように水面がXZ平面になっていれば、レイとの衝突判定は非常に低コストに行うことができます。

`GROUND_BASE` を水面の高さとして、次の `t` を計算し、`t > 0.0` であればレイと平面が交差しています。

```c
float t = -(ray.origin.y - GROUND_BASE) / ray.direction.y;
if (t > 0.0) {
  // Hit!!
}
```

なんと、floatの引き算と割り算一回ずつだけで、平面とレイの衝突判定ができます！

### Fresnel反射

雑にFresnel反射も入れました。

俯瞰視点にすると、遠くの方の水面は鏡面のようになっていることが分かると思います。

[![Fresnel反射](/images/posts/2017-06-30-raymarching-kado/fresnel.png)](/images/posts/2017-06-30-raymarching-kado/fresnel.png)

水面がXZ平面になっていれば、衝突判定と同様にFresnel反射率の近似値もかなり低コストに計算できます。

```
float f0 = 0.7;// 垂直に入射した時の反射率。かなり大きめな値に設定。
intersection.reflectance = f0 + (1.0 - f0) * pow(1.0 + ray.direction.y, 5.0);
```

# 試作

最終的には海の上にカドが浮かんでいるシーンとしましたが、ビルのシーンも試作しました。せっかくなので画像を残しておきます。

[![ビルの試作段階](/images/posts/2017-06-30-raymarching-kado/proto.png)](/images/posts/2017-06-30-raymarching-kado/proto.png)

# 余談

最後に余談なのですが、作品の重要な要素であるカドとワムのどちらとも知り合いが関わっていて、あまりの世間の狭さに驚きました。

カドのレンダリングはレイトレ合宿などで繋がりのある[Pheemaさん](https://twitter.com/_Pheema_/)のUnityのレイマーチングによるものでした。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">先程TOKYOMXで放送された『正解するカド』で、「カド」などの3Dフラクタル描画に関わりましたー。Unityでゴリゴリとレイマーチングしております！よろしくお願いいたしますー！ / <a href="https://t.co/8J8e3Yrff8">https://t.co/8J8e3Yrff8</a></p>&mdash; Pheema (@_Pheema_) <a href="https://twitter.com/_Pheema_/status/850347680039489536">2017年4月7日</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

さらに、ワムは大学時代の指導教官の三谷純先生の幾何学折り紙そのものでした。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">東映のフル3Dアニメ 「正解するカド」<a href="https://t.co/M6ae6WIZa3">https://t.co/M6ae6WIZa3</a><br>の第5話に立体折り紙（球体）の制作シーンが登場。<br>スタッフロールに資料協力として名前を掲載いただきました。<br><br>こちらの作品のイメージに近い感じでした。<a href="https://twitter.com/hashtag/%E6%AD%A3%E8%A7%A3%E3%81%99%E3%82%8B%E3%82%AB%E3%83%89?src=hash">#正解するカド</a> <a href="https://t.co/2yjpB1643t">pic.twitter.com/2yjpB1643t</a></p>&mdash; 三谷 純 Jun MITANI (@jmitani) <a href="https://twitter.com/jmitani/status/860644756417765376">2017年5月5日</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

こんなことってあるんですね…！

# アニメ版のカドの再現（2017/07/03追記）

notargsさんがアニメ版のカドの再現のヒントをくださったので、自分もチャンジしました。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">- カドの内部に入った光は全て吸収する（レイが通り抜けた場合は出力を黒にする）<br>- ２つのMandelboxを重ねる<br>- zに掛けるScaleの値をマイナスにする<br>あたりがカドっぽくするコツだった</p>&mdash; !args(のたぐす) (@notargs) <a href="https://twitter.com/notargs/status/881448613993267201">2017年7月2日</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

こちらは[CGWORLDの記事](https://cgworld.jp/feature/201602-kado01-cgw211.html)の画像の転載です。これをリファレンスとします。

![CGWORLDの記事のリファレンス画像](/images/posts/2017-06-30-raymarching-kado/reference.jpg)

Scaleをマイナスにして、大小の違う2つのMandelBoxを重ねてみました。
内部に入った光を吸収させる替わりにAOを強めにしました。
すると、本当にアニメ版のカドにかなり近い結果になりました！！これは面白いですね！

[![アニメ版のカドの再現](/images/posts/2017-06-30-raymarching-kado/anime.png)](/images/posts/2017-06-30-raymarching-kado/anime.png)

[![アニメ版のカドの再現2](/images/posts/2017-06-30-raymarching-kado/anime2.png)](/images/posts/2017-06-30-raymarching-kado/anime2.png)

こちらからアニメ版に近いカドを動かすことができます。MandelBoxを2つ重ねたことで、負荷が約2倍になりました。

- [http://gam0022.net/webgl/#raymarching_kado_anime](http://gam0022.net/webgl/#raymarching_kado_anime)
