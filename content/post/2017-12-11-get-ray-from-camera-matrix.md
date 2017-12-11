+++
tags = [
"three.js", "WebGL", "CG"
]
title = "カメラ行列からレイトレ用のレイを生成する"
slug = "get-ray-from-camera-matrix"
date = "2017-12-11T10:12:08+09:00"
image = "/images/posts/2017-12-11-get-ray-from-camera-matrix/reflect.png"
toc = true
math = true
draft = false

+++

これは[KLab Advent Calendar 2017](https://qiita.com/advent-calendar/2017/klab)の11日目の記事です。

# はじめに

先日、three.jsの[examples（公式サンプル集）](https://threejs.org/examples)で紹介されている[「raymarching / reflect」](https://threejs.org/examples/#webgl_raymarching_reflect)に関して、2つのPRを送ってマージされました。

- [Improve raymarching example by gam0022 · Pull Request #12792 · mrdoob/three.js](https://github.com/mrdoob/three.js/pull/12792)
- [Improve raymarching example v2 by gam0022 · Pull Request #12801 · mrdoob/three.js](https://github.com/mrdoob/three.js/pull/12801)

内部的なリファクタリングですので、目に見える変化はまったくありません。

レイトレーシングやレイマーチングでは、レイを生成する処理が必要です。
そのレイの生成処理を改良しました。
上記のPRでは、カメラ行列（モデル行列 + プロジェクション行列の逆行列）からレイの生成するリファクタリングを行いました。

レイの生成方法というのはとても奥深いテーマで、さまざまな実装方法があります。
この記事では、今回のPRに至るまでの試行錯誤をまとめたいと思います。

# raymarching / reflect とは

「raymarching / reflect」は、three.jsによるレイマーチングのGLSL（GPU）実装の技術デモです。

無数のオブジェクトの描画はレイマーチングが得意とする表現です。
レイマーチングでは距離関数を利用してシーンの形状を定義します。
距離関数にmod関数を適用すると、同じ形状を無限に繰り返す repetition を実現できます。

![three.jsによるレイマーチングのGLSL（GPU）実装の技術デモ: reflect](/images/posts/2017-12-11-get-ray-from-camera-matrix/reflect.png)

私が2年前に実装して、three.jsのexamplesに取り込んでいただきました。その時のPRはこちらです。

- [Added raymarching reflect example. by gam0022 · Pull Request #7860 · mrdoob/three.js](https://github.com/mrdoob/three.js/pull/7860)
- [[WIP] Fix raymarching reflect by gam0022 · Pull Request #7863 · mrdoob/three.js](https://github.com/mrdoob/three.js/pull/7863)

解説記事もあるので、もしご興味があればあわせてお読みください。

- [これがGPUの力！Three.jsによる“リアルタイム”なレイトレーシング](https://qiita.com/gam0022/items/03699a07e4a4b5f2d41f)

要するに、2年前に自分で作った作品を今になって改良しました。

<!--more-->

# レイの生成方法の試行錯誤

それでは、カメラ行列からレイを生成するに至った経緯を混じえながら、
レイの生成方法の試行錯誤について、実装した順番に紹介します。

## 方法1: GLSLで全てのカメラ制御を行う

2年前の初PR [#7860](https://github.com/mrdoob/three.js/pull/7860) で実装したのは、マウス座標と経過時間から、フラグメントシェーダ（GLSL）の中でカメラのレイを生成する方法です。

シェーダに渡すuniformsは、マウス座標`mouse`と、経過時間`time`の2つです。

- `uniform vec2 mouse;`
- `uniform float time;`

以下のGLSLのコードを書きました。レイマーチング（デモシーン）の界隈では最もメジャーな実装かと思います。

コード1 [カメラ制御をすべて行うGLSLのコード](https://github.com/gam0022/three.js/blob/1048d6751b11fa7c0caf7e480fa2682312716516/examples/webgl_raymarching_reflect.html#L199-L208)

```cpp
// fragment position
vec2 p = ( gl_FragCoord.xy * 2.0 - resolution ) / min( resolution.x, resolution.y );

// camera and ray
vec3 cPos  = vec3( mouse.x - 0.5, mouse.y * 4.0 - 0.2, time );
vec3 cDir  = normalize( vec3( 0.0, -0.3, 1.0 ) );
vec3 cSide = cross( cDir, vec3( 0.0, 1.0 ,0.0 ) );
vec3 cUp   = cross( cSide, cDir );
float targetDepth = 1.3;
vec3 ray = normalize( cSide * p.x + cUp * p.y + cDir * targetDepth );
```

※オリジナルのコードではY-upの扱いが間違っていたので、記事用に修正を加えています。

`cPos`はカメラのワールド座標、`ray`はカメラのレイの方向をそれぞれ表します。
また、カメラのY-upに対応する `vec3( 0.0, 1.0 ,0.0 )` とカメラのFOVに対応する `float targetDepth = 1.3;` はコード上に埋め混んだ、いわゆるマジックナンバーとしました。

## 方法2: カメラの座標と向きを渡す

この方法は2年前の2つ目のPR [#7863](https://github.com/mrdoob/three.js/pull/7863) で対応しました。

方法1でPRを送ったところ、three.jsの作者である[@mrdoob](https://twitter.com/mrdoob)から[コメント](https://github.com/mrdoob/three.js/pull/7860#issuecomment-167371299)をいただきました。
以下に一部を抜粋します。

> However... I think it would be cool if, instead of passing mouse and time to the shader we would simply pass the camera. I guess for that we have to decompose the camera matrix into position and direction?

要約すると、GLSL側でカメラの位置や方向を決めずに、three.js側（JavaScript側）でカメラの操作を行うのはどうかという提案でした。
カメラ操作はthree.jsで行い、シェーダはカメラの情報を受取るようにすれば、three.jsの世界とレイマーチングの世界をより統合できます。

そこでシェーダに渡すuniformsを、カメラのワールド座標`cameraPos`と、カメラの方向`cameraDir`に改めました。

- `uniform vec3 cameraPos;`
- `uniform vec3 cameraDir;`

three.jsにはカメラの制御を行う `Control` クラスが豊富にあります。
この変更によって、three.jsの `Control` クラスを利用したカメラ制御を実現できるようになります。

この変更のあとで、`FlyControl` による自由カメラモードを実装しました。

次がレイを生成するコードです。
1つ目のコードとほぼ同じですが、 `cPos` と `cDir` はthree.jsから送られたuniformの値を代入するように変更しました。

コード2.1 [カメラの座標と向きをからレイを生成するGLSLのコード](https://github.com/mrdoob/three.js/blob/f68e1fb22daad1cfe87fbd57df55d978ffd425a7/examples/webgl_raymarching_reflect.html#L200-L209)

```cpp
// fragment position
vec2 p = ( gl_FragCoord.xy * 2.0 - resolution ) / min( resolution.x, resolution.y );

// camera and ray
vec3 cPos  = cameraPos;
vec3 cDir  = cameraDir;
vec3 cSide = cross( cDir, vec3( 0.0, 1.0 ,0.0 ) );
vec3 cUp   = cross( cSide, cDir );
float targetDepth = 1.3;
vec3 ray = normalize( cSide * p.x + cUp * p.y + cDir * targetDepth );
```

JavaScriptからシェーダにuniformを渡すコードはこんな感じです。

コード2.2 [シェーダにuniformを渡すJavaScriptのコード](https://github.com/mrdoob/three.js/blob/f68e1fb22daad1cfe87fbd57df55d978ffd425a7/examples/webgl_raymarching_reflect.html#L326-L327)

```JavaScript
material.uniforms.cameraPos.value = camera.getWorldPosition();
material.uniforms.cameraDir.value = camera.getWorldDirection();
```

ワールド空間でのカメラの座標と方向を取得するメソッドはthree.jsに定義されています。便利ですね。

だだし、この方法にも問題がありました。

1. カメラのFOVやY-upの情報をシェーダに送れない
2. 毎フレーム実行する処理の中で、Vector3のインスタンスを生成していて、パフォーマンス的に懸念がある
  - `camera.getWorldPosition()` と `camera.getWorldDirection()` は `Vector3` を `new` します
  - インスタンスを大量に生成することで、GCの頻度を高めてしまい、瞬間的にレンダリングを止めてしまう等の懸念があります

## 方法3: カメラ行列の逆行列を渡す

ようやく本題です。今回の2つのPR [#12792](https://github.com/mrdoob/three.js/pull/12792) と [#12801](https://github.com/mrdoob/three.js/pull/12801) で対応しました。

カメラ行列（モデル行列 + プロジェクション行列の逆行列）から、レイの向きを生成するようにしました。

シェーダに渡すuniformsは、カメラのモデル行列（ビュー行列の逆行列）`cameraWorldMatrix`と、プロジェクション変換行列の逆行列`cameraProjectionMatrixInverse`の2つです。

- `uniform mat4 cameraWorldMatrix;`
- `uniform mat4 cameraProjectionMatrixInverse;`

カメラ行列を渡すことで、これまでの実装では実現できなかったカメラのY-upとFOVも同期できるようになりました。
`cameraWorldMatrix`にY-upが、`cameraProjectionMatrixInverse`にFOVの情報が含まれています。

コード3.1では、まずスクリーン座標から正規化デバイス座標系のレイの方向`ndcRay`を求め、
それを行列変換によってワールド座標系のレイの方向`ray`に変換しています。

コード3.1 [カメラ行列からレイを生成するGLSLのコード](https://github.com/mrdoob/three.js/blob/6d9c22a3bc346f34ad779bada397db6f5c691760/examples/webgl_raymarching_reflect.html#L204-L215)

```cpp
// screen position
vec2 screenPos = ( gl_FragCoord.xy * 2.0 - resolution ) / resolution;

// ray direction in normalized device coordinate
vec4 ndcRay = vec4( screenPos.xy, 1.0, 1.0 );

// convert ray direction from normalized device coordinate to world coordinate
vec3 ray = ( cameraWorldMatrix * cameraProjectionMatrixInverse * ndcRay ).xyz;
ray = normalize( ray );

// camera position
vec3 cPos = cameraPosition;
```

ここで、ワールド座標からクリッピング座標への座標変換について考えます。

コード3.2 ワールド座標 => クリッピング座標 の変換 を行うGLSLのコード

```cpp
// ワールド座標 => 視点系座標 => クリッピング座標 の変換
vec4 clipPos = cameraProjectionMatrix * cameraViewMatrix * vec4( worldPos, 1.0 );
```

行列Aの逆行列を利用すると、Aの行列による行列変換の逆変換ができます。

$V$をビュー行列（`cameraViewMatrix`）、$P$をプロジェクション行列（`cameraProjectionMatrix`）とすると、
逆行列の性質から、$PV$（ワールド座標 => 視点系座標 => クリッピング座標）の逆変換は、$V^{-1}P^{-1}$となります。

$$
(PV)^{-1} = V^{-1}P^{-1}
$$

つまり、コード3.1では、`cameraViewMatrix` と `cameraProjectionMatrix` の逆行列である
$V^{-1}$（`cameraWorldMatrix`）と$P^{-1}$（`cameraProjectionMatrixInverse`）を乗算することで、逆変換（クリッピング座標 => ワールド座標への変換）をしていたのですね。

補足しますと、ビュー行列(`cameraViewMatrix`)とカメラのモデル行列(`cameraWorldMatrix`)はお互いに逆行列の関係にあります（[その72 ビュー・射影変換行列が持つ情報を抜き出そう](http://marupeke296.com/DXG_No72_ViewProjInfo.html)）。

クリッピング座標系を同次座標のwで除算すると、正規化デバイス座標系に変換できます。
`ndcRay.w = 1.0` と定義すると、クリッピング座標系と正規化デバイス座標系が一致するため、
今回は`正規化デバイス座標系 => クリッピング座標系` の変換は省略できます。

JavaScriptからシェーダにuniformを渡すコードはこんな感じです。
逆行列の計算はJavaScript（CPU）側で事前に行う実装としました。

コード3.3 [シェーダにuniformを渡すJavaScriptのコード](https://github.com/mrdoob/three.js/blob/6d9c22a3bc346f34ad779bada397db6f5c691760/examples/webgl_raymarching_reflect.html#L302-L303)

```
cameraWorldMatrix: { value: camera.matrixWorld },
cameraProjectionMatrixInverse: { value: new THREE.Matrix4().getInverse( camera.projectionMatrix ) }
```

カメラの完全な同期ができただけでなく、さらにパフォーマンス的な改善もできました。
`cameraProjectionMatrixInverse`を再計算するタイミングは `camera.projectionMatrix` が更新されたときのみです。
今回の作品ですと、`camera.projectionMatrix` が更新されるのは画面のアスペクト比に変化があったときのみです。
方法3では毎フレーム実行される処理の中で `Vector3` のインスタンスを作成してしまう問題が残りましたが、これも解決できました。

## 方法4: 逆行列を用いずに、カメラ行列を渡す

方法3ではプロジェクション行列の逆行列を計算していますが、シェーダ内でカメラ行列を分解すれば、この処理すら省けます。

次のコードはCEDECの[デモシーンへようこそ
4KBで映像作品を作る技術、およびゲーム開発への応用
](https://docs.google.com/presentation/d/1j4t4mcLw8F1PfqvKP3P8meMJ5dWfDXkfb9lc63qOFVM/edit#slide=id.g2460f5a976_1_77)で紹介されていたものです。

![カメラ行列の分解](/images/posts/2017-12-11-get-ray-from-camera-matrix/cedec.png)

Y-upとFOV（`focal_length`）も同期できています。

今思うと、mrdoobは “decompose the camera matrix” という言葉を使っていたので、この方法を意図していたのかもしれません。

今回の例ですと、プロジェクション行列が更新が必要なのは画面のアスペクト比が変わった時だけですし、
シェーダ内の処理はなるべく単純にしたいので、今回であれば方法3で十分かなと感じています。
まだ実装していないので、実装したら書き味やパフォーマンスを比較したいです。

<!--
# three.jsへのコントリビュートのすゝめ

最後に「three.jsにOSSコントリビュータしたいなぁ」という人へ向けた文章を残しておきます。

## examplesのマージ基準は緩い

three.jsは2017-12-10時点でGitHubのスター数が37377を超える超人気プロジェクトです。

小さな変更だとしても、three.jsのコントリビュータとして名前を刻めるのは嬉しいものです。

three.jsのライブラリ本体に変更を加えるPRのマージ基準はそれなりに高い印象ですが、
examplesを変更をするPRのマージ基準はかなり緩いように感じました。

2年前のPRは1日、今回のPRのマージはわずか数時間でマージされてビックリしました！

もしあなたが「こういうexamplesがあれば良いのになぁ」と思ったのなら、three.jsのコントリビュータになるチャンスです！

ただし、examplesの数がむやみに増えすぎるのも、three.js初学者への負担を強いるだけなので、
全く同じようなexampleを追加するのは避けるべきだと個人的には思います。

## PRを作る時の注意点

あまりにも雑なPRを作るのは、作者たちのレビューの負担になってしまいます。

PRを作る前に [How to contribute to three.js](https://github.com/mrdoob/three.js/wiki/How-to-contribute-to-three.js) を熟読しておきましょう。

特に注意すべきポイントはコードフォーマットです。
[Mr.doob's Code Style™](https://github.com/mrdoob/three.js/wiki/Mr.doob%27s-Code-Style%E2%84%A2)は空白と改行が多い、かなり癖が強いコードフォーマットです。

[mrdoobapproves](http://zz85.github.io/mrdoobapproves/)というツールを用いれば、Mr.doob's Code Styleにオートフォーマットできるので、これを利用するのもオススメです。

## コントリビュートして得たもの

three.jsにコントリビュートして良かったことを紹介します。

### コードの添削

mrdoobにコードをリファクタリングしてもらいました！

- [More improvements to raymarching example.](https://github.com/mrdoob/three.js/commit/0e12847099cbc4f9597496ce7367771430183d7c#diff-fd09ca29c011c0e4ab932acf6021fdb7)
  - 毎フレーム実行される処理で `camera.lookAt` を使うと `Vector3` のインスタンスが大量に作られるので、代わりに `camera.rotation.set` を利用
  - 重複した処理の削除
- [Replaced FlyControls with OrbitControls](https://github.com/mrdoob/three.js/commit/e2f9a78fe49f0e09bd108e733e54989c4e4ea40c#diff-fd09ca29c011c0e4ab932acf6021fdb7)
  - `FlyControls` がモバイル未対応だったので、モバイルに対応した `OrbitControls` に置き換え

mrdoobだけでなく、WestLangleyさんとIteeさんにもコードを修正してもらいました（[history](https://github.com/mrdoob/three.js/commits/dev/examples/webgl_raymarching_reflect.html)）。

これぞOSSの醍醐味ですね😊

### mrdoobを囲んだ飲み会

先日、日本に旅行中のmrdoobを囲んだ、three.js界隈の人たちとの飲み会に呼ばれたので、私も参加しました。

私は英語を話せないのですが、上のレイマーチングのexamplesについてmrdoobに話を振ったら、少しは英語でコミュニケーションできました！
いつかは普通に英語を話せるようになりたい...！

たぶんPRを送っていなければ、mrdoobに認識されず、そもそも飲み会にも呼ばれなかった可能性が高いので、
2年前に勇気を出してPRを出して良かったと本当に思います！

これは自慢なのですが、MacBook Airにサインしてもらって、ツーショト写真も撮ってもらえました。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="en" dir="ltr">Photo with <a href="https://twitter.com/mrdoob?ref_src=twsrc%5Etfw">@mrdoob</a> 🤗 <a href="https://t.co/hIQC6iLbZS">pic.twitter.com/hIQC6iLbZS</a></p>&mdash; がむ😇 (@gam0022) <a href="https://twitter.com/gam0022/status/938075608197636096?ref_src=twsrc%5Etfw">2017年12月5日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-conversation="none" data-lang="ja"><p lang="en" dir="ltr">I am glad to have a signature written by mrdoob on my MacBook! <a href="https://t.co/phPyU7JUj6">pic.twitter.com/phPyU7JUj6</a></p>&mdash; がむ😇 (@gam0022) <a href="https://twitter.com/gam0022/status/938077812719624192?ref_src=twsrc%5Etfw">2017年12月5日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

-->

# まとめ

レイを生成する方法は様々ですが、three.jsの `Control` クラス等の資産を利用し、
毎フレーム実行される処理を減らしてパフォーマンスを向上させたいのであれば、カメラ行列からレイを生成する方法をオススメします。

<!--
three.jsに限らず、勇気を出してOSSにコントリビュートすると、良いきっかけが生まれるかもしれません。
OSSにPRを出すときには、GitHubのWikiやドキュメントから開発マニュアル等を熟読しておくと、スムーズにマージしてもらえる可能性が高まります。
-->

# おまけ

今回のPRを送った直後に、日本に旅行中のmrdoobを囲んだthree.js界隈の人たちとの飲み会があったので、参加させていただきました。
参加者のみなさんありがとうございました。

英語はとても苦手なのですが、作品やPRについてmrdoobと少しお話しすることができました。サインまでいただけて大満足です🤗
勇気を出してPRを送って良かったなと思いました。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="en" dir="ltr">Photo with <a href="https://twitter.com/mrdoob?ref_src=twsrc%5Etfw">@mrdoob</a> 🤗 <a href="https://t.co/hIQC6iLbZS">pic.twitter.com/hIQC6iLbZS</a></p>&mdash; がむ😇 (@gam0022) <a href="https://twitter.com/gam0022/status/938075608197636096?ref_src=twsrc%5Etfw">2017年12月5日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-conversation="none" data-lang="ja"><p lang="en" dir="ltr">I am glad to have a signature written by mrdoob on my MacBook! <a href="https://t.co/phPyU7JUj6">pic.twitter.com/phPyU7JUj6</a></p>&mdash; がむ😇 (@gam0022) <a href="https://twitter.com/gam0022/status/938077812719624192?ref_src=twsrc%5Etfw">2017年12月5日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

---

明日は [@pandax381](https://twitter.com/pandax381) さんの記事です。それでは！
