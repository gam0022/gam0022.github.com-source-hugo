+++
tags = [
"three.js", "WebGL", "CG"
]
title = "カメラ行列からレイトレ用のレイを生成する（three.jsにOSSコントリビュートした話）"
slug = "get-ray-from-camera-matrix"
date = "2017-12-11T10:12:08+09:00"
image = ""
toc = true
math = true
draft = false

+++

これは[KLab Advent Calendar 2017](https://qiita.com/advent-calendar/2017/klab)の11日目の記事です。

# はじめに

こんにちは[gam0022](https://twitter.com/gam0022)です。
KLabではUnityのエンジニアとして主に描画周りを担当しています。

先日、three.jsに2つのPRを投げてマージされました。

- [Improve raymarching example by gam0022 · Pull Request #12792 · mrdoob/three.js](https://github.com/mrdoob/three.js/pull/12792)
- [Improve raymarching example v2 by gam0022 · Pull Request #12801 · mrdoob/three.js](https://github.com/mrdoob/three.js/pull/12801)

ザックリと言うと、three.jsの公式サンプル集の作品を改良をしました。

2年前に[three.jsのexamples（公式サンプル集）](https://threejs.org/examples/#webgl_raymarching_reflect)にレイマーチングの作品を追加する[PR](https://github.com/mrdoob/three.js/pull/7860)を投げて、
無事にマージされたのですが、レイの生成方法がイケていなかったので、今回のPRで改善しました。
カメラ行列（モデル行列 + プロジェクション行列の逆行列）から、レイの方向を生成するようにしました。

ちなみに、追加したレイマーチングの作品の[解説記事](https://qiita.com/gam0022/items/03699a07e4a4b5f2d41f)は2015年のWebGLアドベントカレンダーに寄稿しているので、興味があれば合わせてお読み下さい。

<!--more-->

# レイ生成の実装の遷移

レイの生成の方法だけでも実は奥深いテーマで、実装はいくらでも考えられます。

この作品だけでもかなり試行錯誤しました。実装した順番に紹介していきます。

## 1番初期の実装（GLSLで全部頑張る）

1番初期の実装では、マウス座標と経過時間から、フラグメントシェーダ（GLSL）の中でカメラのレイを生成していました。

シェーダに渡すuniformsは以下の2つです。

- `uniform vec2 mouse;`
  - マウス座標
- `uniform float time;`
  - 経過時間

次が実際のGLSLコードです。`cPps`がカメラのワールド座標。`ray`がカメラのレイの方向です。

コード1 [カメラ制御をすべて行うGLSLのコード](https://github.com/gam0022/three.js/blob/1048d6751b11fa7c0caf7e480fa2682312716516/examples/webgl_raymarching_reflect.html#L199-L208)

```cpp
// fragment position
vec2 p = ( gl_FragCoord.xy * 2.0 - resolution ) / min( resolution.x, resolution.y );

// camera and ray
vec3 cPos  = vec3( mouse.x - 0.5, mouse.y * 4.0 - 0.2, time );
vec3 cDir  = normalize( vec3( 0.0, -0.3, 1.0 ) );
vec3 cUp   = cross( cDir, vec3( 1.0, 0.0 ,0.0 ) );
vec3 cSide = cross( cDir, cUp );
float targetDepth = 1.3;
vec3 ray = normalize( cSide * p.x + cUp * p.y + cDir * targetDepth );
```

このようなレイの生成の実装は、レイマーチング（デモシーン）の界隈では最もメジャーだと思います。

カメラのy-upに対応する `vec3( 1.0, 0.0 ,0.0 )` とカメラのFOVに対応する `float targetDepth = 1.3;` はコード上に埋め混んだ、いわゆるマジックナンバーとしました。

## 2番目の実装（カメラの座標と向きを渡す）

最初の実装でPRを出したところ、[PRのコメント](https://github.com/mrdoob/three.js/pull/7860#issuecomment-167371299)で、three.jsの作者である[@mrdoob](https://twitter.com/mrdoob)に

> However... I think it would be cool if, instead of passing mouse and time to the shader we would simply pass the camera. I guess for that we have to decompose the camera matrix into position and direction?
>
> しかし... シェーダに mouse と time を渡すのではなく、カメラを単に渡すだけでいいですね。カメラの行列を位置と方向に分解するのはどうですか？（雑な翻訳）

と言われてしまったので、ひとまず `mouse` と `time` をシェーダに渡す実装は改めました。

シェーダに渡すuniformsは以下の2つです。カメラのワールド座標と向きをシェーダに渡すようにしました。

- `uniform vec3 cameraPos;`
  - カメラのワールド座標
- `uniform vec3 cameraDir;`
  - カメラの向き

シェーダにカメラの情報を渡すことで、three.jsの世界とレイマーチングの世界を統合できます。

three.jsにはカメラの制御を行う `Control` クラスが豊富にあります。
この変更によって、three.jsの世界で `Control` クラスを利用したカメラ制御を行い、
レイマーチングの世界ではカメラ制御をせずに、three.jsから渡されたカメラの情報を利用する実装を実現できます。

シェーダ側でのカメラ制御を止めたことで、`FlyControl` による自由カメラモードが実現できました。

次がレイを生成するコードです。
1つ目のコードとほぼ同じですが、 `cPos` と `cDir` はuniformの値を代入するだけにしました。

コード2.1 [カメラの座標と向きをからレイを生成するGLSLのコード](https://github.com/mrdoob/three.js/blob/f68e1fb22daad1cfe87fbd57df55d978ffd425a7/examples/webgl_raymarching_reflect.html#L200-L209)

```cpp
// fragment position
vec2 p = ( gl_FragCoord.xy * 2.0 - resolution ) / min( resolution.x, resolution.y );

// camera and ray
vec3 cPos  = cameraPos;
vec3 cDir  = cameraDir;
vec3 cUp   = cross( cDir, vec3( 1.0, 0.0 ,0.0 ) );
vec3 cSide = cross( cDir, cUp );
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

## 3番目の実装（カメラ行列からレイを生成する）

ようやく本題です。最終的にはカメラ行列（モデル行列 + プロジェクション行列の逆行列）から、レイの向きを生成するようにしました。

シェーダに渡すuniformsは以下の2つです。

- `uniform mat4 cameraWorldMatrix;`
  - カメラのモデル行列（ビュー行列の逆行列）
- `uniform mat4 cameraProjectionMatrixInverse;`
  - プロジェクション変換行列の逆行列

これまでの実装ではy-upとFOVが固定でしたが、カメラ行列を渡すことでthree.jsのカメラのy-upとFOVも完全に同期できるようになりました。
`cameraWorldMatrix`にy-upが、`cameraProjectionMatrixInverse`がFOVの情報が含まれています。

mrdoobの[2年前のリクエスト](https://github.com/mrdoob/three.js/pull/7860#issuecomment-167802451)をようやく実現することができました。

> The idea was to pass a camera into the shader, so the three world is more integrated with the raymarcher world. Ideally we could pass camera.matrixWorld and camera.projectionMatrix and decompose inside the shader.
>
> three.jsの世界とレイマーチングの世界をもっと統合するためのアイデアがシェーダにカメラを渡すことでした。
> 理想的には、camera.matrixWorld と camera.projectionMatrix を渡してシェーダー内で分解できました。（雑な翻訳）

行列変換によってスクリーン座標からワールド座標系のレイの向きを求めています。
2年前は行列変換の理解が不足していて実装できませんでしたが、最終的にはとてもシンプルに実現できました。

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

上のコードでは、まずはスクリーン座標から正規化デバイス座標系のレイの方向（`ndcRay`）を求め、
行列変換によってワールド座標系のレイの方向（`ray`）に変換しています。

次はワールド座標からクリップ座標に座標を変換するコードです。

コード3.2 ワールド座標 => クリッピング座標 の変換 を行うGLSLのコード

```cpp
// ワールド座標 => 視点系座標 => クリッピング座標 の変換
vec4 clipPos = cameraProjectionMatrix * cameraViewMatrix * vec4( worldPos, 1.0 );
```

行列Aの逆行列を乗算すると、Aの行列による行列変換の逆変換を行える性質があります。

逆行列の性質から、$V$をビュー行列、$P$をプロジェクション行列とすると、
$VP$（ワールド座標 => 視点系座標 => クリッピング座標）の逆変換は、$P^{-1}V^{-1}$となります。

$$
(VP)^{-1} = P^{-1}V^{-1}
$$


つまり、コード3.1では、`cameraViewMatrix` と `cameraProjectionMatrix` の逆行列である
`cameraWorldMatrix` と `cameraProjectionMatrixInverse` を乗算することで、逆変換をしていたのですね。

余談ですが、 `クリッピング座標系 => 正規化デバイス座標系` の変換はwによる同次除算です。
今回は`ndcRay.w = 1.0`で定義できるため、`正規化デバイス座標系 => クリッピング座標系` の変換は省略できます。

JavaScriptからシェーダにuniformを渡すコードはこんな感じです。
逆行列の計算はCPU（JavaScript）側で事前に行うようにしました。

コード3.3 [シェーダにuniformを渡すJavaScriptのコード](https://github.com/mrdoob/three.js/blob/6d9c22a3bc346f34ad779bada397db6f5c691760/examples/webgl_raymarching_reflect.html#L302-L303)

```
cameraWorldMatrix: { value: camera.matrixWorld },
cameraProjectionMatrixInverse: { value: new THREE.Matrix4().getInverse( camera.projectionMatrix ) }
```

## 4番目の実装（逆行列を使わない方法）

3番目の実装ではJavaScript（CPU）でプロジェクション行列の逆行列を計算していますが、
シェーダ内でカメラ行列を分解すれば、この処理すら省けそうです。

次のコードはCEDECの[デモシーンへようこそ
4KBで映像作品を作る技術、およびゲーム開発への応用
](https://docs.google.com/presentation/d/1j4t4mcLw8F1PfqvKP3P8meMJ5dWfDXkfb9lc63qOFVM/edit#slide=id.g2460f5a976_1_77)で紹介されていたものです。

![カメラ行列の分解](/images/posts/2017-12-11-get-ray-from-camera-matrix/cedec.png)

`up` がy-upに対応し、 `focal_length` がFOVに対応しているので、完全にカメラを同期することもできます。

今思うと “decompose the camera matrix” という言葉を使っていたので、mrdoobが意図していたのは、この方法だった気もしますね。

とはいえ、今回の例ですと、プロジェクション行列が更新が必要なのは画面のアスペクト比が変わった時だけですし、
シェーダ内の処理はなるべく単純にしたいので、3番目の実装で十分だと私は思っています。

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

# まとめ

レイトレのレイを生成する方法は様々ですが、three.jsの `Control` クラス等の資産を利用したいのであれば、
カメラ行列からレイを生成する方法をオススメします。

three.jsに限らず、勇気を出してOSSにコントリビュートすると、良いきっかけが生まれるかもしれません。
OSSにPRを出すときには、GitHubのWikiやドキュメントから開発マニュアル等を熟読しておくと、スムーズにマージしてもらえる可能性が高まります。

---

明日は [@pandax381](https://twitter.com/pandax381) さんの記事です。それでは！
