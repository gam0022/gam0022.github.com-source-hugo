+++
slug = "raymarching-vs-raycasting"
date = "2022-08-08T02:12:50+09:00"
image = "/images/posts/2022-08-08-raymarching-vs-raycasting/raymarching_i4_s256_l300.jpg"
toc = false
math = false
draft = false
tags = [
    "CG", "レイトレーシング", "パストレーシング", "OptiX", "レイマーチング", "CUDA", "GPU", "レイトレ合宿"
]
title = "速度比較！レイマーチングvsレイキャスティング"

+++

これは[レイトレ合宿8](https://sites.google.com/view/raytracingcamp8)のアドベントカレンダーです。

レイマーチングはレイキャスティングと比べて遅いと感じていましたが、なるべく同じ条件で計測した場合に実際どのくらい差があるのか比較してみました。

# 検証内容の概要

メンガーのスポンジをレイマーチングとレイキャスティングでそれぞれ交差判定を実装し、フラクタルの深度を1～4に変化しながら計測しました。

次の画像はレイマーチングによる深度4のメンガーのスポンジです。

![レイマーチング 深度4 300ステップ](/images/posts/2022-08-08-raymarching-vs-raycasting/raymarching_i4_s256_l300.png)

# 計測結果のサマリー

**先に結果から発表すると、なんとレイマーチングはレイキャスティングの15～20倍くらい遅いようでした。**

ここまで遅いなんてショック😨…

![計測結果の棒グラフ](/images/posts/2022-08-08-raymarching-vs-raycasting/result_graph.png)

256サンプリング時のレンダリング時間（秒）

| フラクタルの深度 | 1 | 2 | 3 | 4 |
|:---|---:|---:|---:|---:|
| レイマーチング | 8.85388秒 ![レイマーチング 深度1](/images/posts/2022-08-08-raymarching-vs-raycasting/raymarching_i1_s256.png) | 9.00077秒 ![レイマーチング 深度2](/images/posts/2022-08-08-raymarching-vs-raycasting/raymarching_i2_s256.png) | 9.14309秒 ![レイマーチング 深度3](/images/posts/2022-08-08-raymarching-vs-raycasting/raymarching_i3_s256.png) | 9.29724秒 ![レイマーチング 深度4](/images/posts/2022-08-08-raymarching-vs-raycasting/raymarching_i4_s256.png) |
| レイキャスティング | 0.445493秒 ![レイキャスティング 深度1](/images/posts/2022-08-08-raymarching-vs-raycasting/raycast_i1_s256.png) | 0.466056秒 ![レイキャスティング 深度2](/images/posts/2022-08-08-raymarching-vs-raycasting/raycast_i2_s256.png) | 0.50258秒 ![レイキャスティング 深度3](/images/posts/2022-08-08-raymarching-vs-raycasting/raycast_i3_s256.png) | 0.602458秒 ![レイキャスティング 深度4](/images/posts/2022-08-08-raymarching-vs-raycasting/raycast_i4_s256.png) |

<!--more-->

# 検証内容の詳細

## 検証PCのスペック

- OS: Windows 11
- CPU: Core i7-12700K
- GPU: GeForce RTX 3080
- メモリ: 64GB (3200MHz)

このピカピカ光るPCで検証しました。

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">my new gear... <a href="https://t.co/eS2MbH7OKc">pic.twitter.com/eS2MbH7OKc</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1546700194305437696?ref_src=twsrc%5Etfw">July 12, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


## 共通条件

- レンダラーはNVIDIA OptiX 7.5上で実装
- 256サンプリングする時間を計測
    - 1回のoptixLaunchで256サンプリング
    - Ray generationプログラム（CUDAの関数）の中で256回ループ
- 出力解像度は1920x1080
- 計測時間の詳細
    - シーンの初期化やBVHの構築は含まない
    - optixLaunchの実行時間を計測
- シェーディングはパストレーシング
    - マテリアルは拡散反射のみ
    - NEEやMISはしないシンプルなパストレーシング
    - 反射の最大深度は5
- シーン全体で2つのGAS
    - 床（巨大なカスタムプリミティブのSphere）のGASが1つ
    - メンガーのスポンジのGASが1つ

## レイマーチング

レイマーチングは繰り返しの計算によって数値的に衝突判定を解く手法で、Sphere Tracingとも呼ばれます。

- レイマーチングの最大ステップ回数（マーチングループのループ数）は100
- Intersectionプログラム（CUDAの関数）としてレイマーチングを実装
    - 詳細は[過去の記事](https://gam0022.net/blog/2019/08/05/optix-raymarching-pathtracing/)を参照
    - Optix6の内容なので、Optix7対応のために実装を多少修正
- 高速化のためにカメラからレイは飛ばさずに、バウンディングボックス（AABB）からレイを飛ばす
    - AABBは最適になるようにギリギリに設定
    - カスタムプリミティブ全体で1つのAABB

## レイキャスティング

今回のレイキャスティングとは、レイと三角形の解析的な交差判定のことです。

- メンガースポンジはHoudiniでモデリング
    - 詳細は[過去の記事](https://gam0022.net/blog/2018/06/08/houdini/)を参照
    - フラクタルの深度を指定可能にアップデート（ツイート参照）
- Houdiniからobjで出力して自作のレンダラーで読み込み
    - OptiX7.xではobjのローダーが無かったので自作…
- OptiXのビルトインの機能で衝突判定
    - OptiX上では三角ポリゴンの集合として表現
- OptiXの機能でGAS（Geometry acceleration structure）を構築
    - **RTコアによるレイトレーシングのハードウェアアクセラレーションあり**

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">フラクタルの再帰回数を自由に増やせるようになった。<br>HoudiniのTOPs Feedback Loopの良い使用例ですね。 <a href="https://t.co/yTR60S5vgC">https://t.co/yTR60S5vgC</a> <a href="https://t.co/OifBfoTCFa">pic.twitter.com/OifBfoTCFa</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1556203400257503232?ref_src=twsrc%5Etfw">August 7, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

# 結果詳細

改めて計測結果を見てみましょう。

## レンダリング時間

![計測結果の棒グラフ](/images/posts/2022-08-08-raymarching-vs-raycasting/result_graph.png)

| フラクタルの深度 | 1 | 2 | 3 | 4 |
|:---|---:|---:|---:|---:|
| レイマーチング | 8.85388 | 9.00077 | 9.14309 | 9.29724 |
| レイキャスティング | 0.445493 | 0.466056 | 0.50258 | 0.602458 |

## レンダリング時間以外

レンダリング時間以外のデータです。

- GAS（Geometry Acceleration Structure）の構築時間（秒）
    - レイキャスティングのみの結果
    - レイマーチングではAABBはできてもBVHを構築できない
- ポリゴンの頂点数
- レイマーチングがレイキャスティングの何倍の時間がかかっているか

| フラクタルの深度 | 1 | 2 | 3 | 4 |
|:---|---:|---:|---:|---:|
| GASの構築時間（秒） | 0.0008289 | 0.0010064 | 0.0030907 | 0.0135217 |
| ポリゴンの頂点数 | 480 | 9600 | 192000 | 3840000 |
| 倍率（Raymarching / Raycasting） | 19.87434146 | 19.31263625 | 18.19230769 | 15.4321795 |

GASの構築は思ったより速いんですね。380万頂点でも0.01秒で完了しているのは驚きです。

ポリゴンの頂点数は指数で増加しても描画時間は大きく変わらないので、Acceleration Structureは本当に偉大ですね🙏

倍率について、フラクタルの深度が増えればレイマーチングの方が有利だと予想していましたが、予想通りにその傾向はありました。
ですが、思ったよりも差が縮まらないんだというのが率直な感想です。

## レンダリング結果

大きなサイズのレンダリング結果です。

異なるアルゴリズムでモデリングしているので、ジオメトリーは完全一致ではありません。

記事を書いている途中で発覚しましたが、レイマーチングのステップ回数100では上部の法線とレイの角度が急な箇所でエラーが起きていました。
サムネではステップ回数300に増やして再レンダリングして15.7267秒でした。

### レイマーチング 深度1

![レイマーチング 深度1](/images/posts/2022-08-08-raymarching-vs-raycasting/raymarching_i1_s256.png)

### レイマーチング 深度2

![レイマーチング 深度2](/images/posts/2022-08-08-raymarching-vs-raycasting/raymarching_i2_s256.png)

### レイマーチング 深度3

![レイマーチング 深度3](/images/posts/2022-08-08-raymarching-vs-raycasting/raymarching_i3_s256.png)

### レイマーチング 深度4

![レイマーチング 深度4](/images/posts/2022-08-08-raymarching-vs-raycasting/raymarching_i4_s256.png)

### レイキャスティング 深度1

![レイキャスティング 深度1](/images/posts/2022-08-08-raymarching-vs-raycasting/raycast_i1_s256.png)

### レイキャスティング 深度2

![レイキャスティング 深度2](/images/posts/2022-08-08-raymarching-vs-raycasting/raycast_i2_s256.png)

### レイキャスティング 深度3

![レイキャスティング 深度3](/images/posts/2022-08-08-raymarching-vs-raycasting/raycast_i3_s256.png)

### レイキャスティング 深度4

![レイキャスティング 深度4](/images/posts/2022-08-08-raymarching-vs-raycasting/raycast_i4_s256.png)

# レイマーチングの高速化手法

レイマーチングの高速化手法を軽く調べてみました。

EnhancedSphereTracingやAccelerating Sphere Tracingはレイマーチングのステップを少し大きく調整してステップ数を減らす手法です。
IFSやMod Repetitionと乱数の組み合わせによる非連続な距離関数だとうまくいかない気もしていますが、ちゃんと試したことはないので分かりません。

- EnhancedSphereTracing [Benjamin Keinert 2014]
    - [論文](https://erleuchtet.org/~cupe/permanent/enhanced_sphere_tracing.pdf)
    - [日本語解説 by @lucknknock さん](https://qiita.com/Hirai0827/items/eddcb73a1976c3088b88)
- Accelerating Sphere Tracing [Csaba Bálint 2018]
    - [論文](https://www.researchgate.net/publication/331547302_Accelerating_Sphere_Tracing)
    - [日本語解説 by @lucknknock さん](https://qiita.com/Hirai0827/items/e05e13f343357d648b1b)

Cone Marchingは非連続な距離関数でもおそらく適用できそうです。
低解像度でDepthを計算しておいて、高解像度でDepthを引き継いでレイマーチングをすることで、トータルで距離関数の評価回数をかなり削減できます。
しかし、プライマリレイにしか適用できないため、パストレーシングでは効果が低そうです。

- [Cone_Marching_Mandelbox_by_Seven_Fulcrum](http://www.fulcrum-demo.org/wp-content/uploads/2012/04/Cone_Marching_Mandelbox_by_Seven_Fulcrum_LongVersion.pdf)
- [［GDC 2018］Cone Marching法で描くフラクタルVRの世界「CORAL」](https://jp.gamesindustry.biz/article/1803/18032802/)

このあたりはよく読んでいません。自分のための備忘録です。

- A Geometric Method for Accelerated Sphere Tracing of Implicit Surfaces [Csaba Bálint 2021]
    - [論文](https://cyber.bibl.u-szeged.hu/index.php/actcybern/article/view/4203)
    - 後で読む
- Real-Time Rendering of Complex Fractals
    - [リンク](https://link.springer.com/chapter/10.1007/978-1-4842-7185-8_33)
    - Real-Time Renderingの章らしいが、単なるレイマーチングの紹介かもしれない
- Area Lights in Signed Distance Function Scenes
    - [論文](https://diglib.eg.org/bitstream/handle/10.2312/egs20191021/085-088.pdf?sequence=1&isAllowed=y)
    - 衝突判定ではないが気になるのでメモ


# まとめ

レイマーチングはめちゃくちゃ遅いので、レイトレ合宿のようにレンダリング時間がシビアなら悪手かもしれません。
