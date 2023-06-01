+++
math = false
draft = false
tags = [
    "event", "CG", "レイマーチング", "GLSL", "SESSIONS", "TokyoDemoFest"
]
title = "SESSIONS 2023のGLSL Graphics Compoで準優勝しました（グラフィックス解説）"
slug = "sessions2023-glsl-compo"
date = "2023-05-31T06:49:24+09:00"
image = "/images/posts/2023-05-29-sessions2023-glsl-compo/TranscendentalCube.jpg"
toc = true

+++

# はじめに

2023年4月28日～30日にツインメッセ静岡で開催された[SESSIONS in C4 LAN 2023 SPRING](https://sessions.frontl1ne.net/)に参加し、GLSL Graphics Compo部門で2位をいただきました！

作品のタイトルは『Transcendental Cube』で、シンプルな立方体が複雑なジオメトリーに変形していく非現実的な様子を、写実的で迫力ある映像で表現することをコンセプトにしました。

<div class="movie-wrap">
<iframe width="1920" height="1080" src="https://www.youtube.com/embed/194E3UWj870" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

GLSL Graphics Compoのレギュレーションとして音楽は含められませんが、イベント後の動画用に[@sadakkey](https://twitter.com/sadakkey)さんに素晴らしい音楽を制作していただきました。この場を借りて、心から感謝の意を表します！

以下は『Transcendental Cube』の各種リンクです。

- [📺 YouTube](https://youtu.be/194E3UWj870)
- [👁️ Shadertoy](https://www.shadertoy.com/view/dldGzj) ※高負荷のためRTX3080以上のGPU推奨
- [📦 Pouet](https://www.pouet.net/prod.php?which=94339)

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">&quot;Transcendental Cube&quot; <br><br>2nd place at GLSL Graphics Compo, <a href="https://twitter.com/hashtag/SESSIONS_Party?src=hash&amp;ref_src=twsrc%5Etfw">#SESSIONS_Party</a> 2023 🥈<br><br>SESSIONS 2023のGLSL Graphics Compoで2位を勝ち取りました！ <a href="https://t.co/Ra2Y0Ccfpx">pic.twitter.com/Ra2Y0Ccfpx</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1653096277184503808?ref_src=twsrc%5Etfw">May 1, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<!--more-->

5月25日に[SESSIONS 2023 AFTER PARTY＠teamLab Office](https://teamlab.connpass.com/event/282028/)が開催され、そこで本作品の技術的な解説を行いました。

その発表資料はこちらです。

<div class="google-slide-wrap">
<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRElQgUpyWO1kAOOvmckhu2PAfVZHoRrIU7S59o8MrSMSQpz4LLBUuK1_X20tGZ8S8eSK9-dSkIyYo3/embed?start=false&loop=false&delayms=3000" frameborder="0" width="1440" height="839" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
</div>

この記事では、スライドの画像を使用しながら、作品の解説をします。

# GLSL Graphics Compoとは？

デモシーンの文化に馴染みのない方に向けて、簡単にGLSL Graphics Compoの概要やレギュレーションについて説明します。

GLSL Graphics Compoは[twigl](https://twigl.app/)上でリアルタイムで動作するGLSLのシェーダーによるグラフィックスを競うコンポです。
コンポはコンペティションの意味で、参加者投票によって順位が決まります。

## GLSLシェーダーで映像を作り出す魔法

GLSLシェーダーを使用して、プログラミングのソースコードだけで映像を作り出すことができるのですが、一般的には想像しづらいかもしれません。

具体的なイメージを掴むために、以下の図をご覧ください。GLSLのコードをコメントや改行、空白文字を取り除いて処理の内容で色分けしました。

[![コメントと空白を削除したGLSLのコード全体](/images/posts/2023-05-29-sessions2023-glsl-compo/slide-glsl-code.png)](/images/posts/2023-05-29-sessions2023-glsl-compo/slide-glsl-code.png)

この9270文字のGLSLシェーダーに、映像のすべてが実装されています。

実は、このシェーダーにはシーンのモデリング、ライティング、カメラワーク、演出のシーケンスがすべて含まれているのです。

**3Dモデルやテクスチャなどの外部アセットは一切使用していません。すべての3Dデータやテクスチャは、GLSLのコードからプロシージャルに生成されています。**

もちろん、変数名や関数名を1文字に短縮したり、デバッグ用のコードを削除することで文字数をさらに削減することも可能です。しかし、今回は文字数削減よりも可読性を重視してコーディングしました。

## WebGL2.0が利用可能に

SESSIONS 2023では、twiglの`classic (300 es)`モードが許可されたので、WebGL2.0の機能も利用できるようになりました！

TokyoDemoFest2021ではGLSL Snadboxがレギュレーションとなっており、WebGL1.0の機能しか使えないという制約があったのですが、今回から配列やビット演算などが利用できるようになりました。

twiglはWeb上でGLSLのフラグメントシェーダーを編集・実行できるWebGLで実装されたサービスです。

類似サービスにはGLSL SnadboxやShadertoyなどがありますが、
twiglは [#つぶやきGLSL](https://twitter.com/search?q=%23%E3%81%A4%E3%81%B6%E3%82%84%E3%81%8DGLSL&src=hashtag_click) と呼ばれる1ツイートに収まる文字数でGLSLのシェーダー作品を作る文化に特化しています。

ちなみに今回のGLSL Graphics Compoには文字数の制約はありませんでした。
そのためか上映時間が3分あるような超大作の作品も複数ありました。
文字数に制約はありませんが、複雑すぎるGLSLのコードはコンパイルに時間がかかりすぎてChromeがクラッシュするので、GLSLのコンパイル時間が実質的なコードサイズの制限になります。

## ローカル上の開発環境の構築

node.jsを使用した自作のWebGLフレームワーク（[chromatiq](https://github.com/gam0022/chromatiq/tree/sessions2023)）を活用して、ローカル上の開発環境を構築しました。
このフレームワークを使うと、VS Codeでシェーダーを編集し、Chromeでホットリロードが可能です。

直接twiglやShadertoy上で編集することも可能ですが、ローカル環境を構築するメリットは複数あります。たとえば、コードの自動整形、バージョン管理、時間のシークバーなどが実現できます。

また、twiglへのポーティングの作業は、以前の記事で紹介したテンプレートを利用しました。
chromatiq用のシェーダーのuniform名はShadertoy互換があるため、`Shadertoy → twigl (classic 300es)`のテンプレートが利用可能です。
ポーティングの手順は非常に簡単で、テンプレートのGLSLのコードを先頭にコピー＆ペーストするだけで移植作業が完了します。

- [先頭にコピペするだけ！Shadertoy → GLSL Sandbox / NEORT の移植用ヘッダーコードの紹介 | gam0022.net](/blog/2019/03/04/porting-from-shadertoy-to-glslsandbox/)

# Mad Tracingによるライティング

ライティングでは次の2つをゴールとしました。

- Global Illumination
- Bloom

[![ライティングの特徴（Global IlluminationとBloomの両立）](/images/posts/2023-05-29-sessions2023-glsl-compo/lighting-features.png)](/images/posts/2023-05-29-sessions2023-glsl-compo/lighting-features.png)

一般的に、Bloomはマルチパスのポストエフェクトとして実装する必要がありますが、
GLSL Graphics Compoのレギュレーションでは1Passでの実装が必要です。
そこで、1PassでGIとBloomの両方を実現するためにMad Tracingという手法を利用しました。

Mad Tracingは[Virgill](https://twitter.com/Virgill74)さんが開発した手法で、[End of time](https://www.youtube.com/watch?v=5lR76o9lWB0)という2018年に発表された4K Introのデモではじめて利用されました。

Mad Tracingをざっくり説明すると、Path Tracingの亜種のような手法です。
通常のPath Tracingでは、Bloom効果を実現することはできませんが、Mad TracingではBloom効果も含めて計算することが可能です。

## Path Tracing

Path TracingはGlobal Illuminationを実現可能でフォトリアルなグラフィックスが得意な手法です。

下記の図のようにBRDFに応じて確率的に反射方向をサンプリングしてレイを大量に飛ばすことで、光源からの影響を計算します。

[![パストレーシング①](/images/posts/2023-05-29-sessions2023-glsl-compo/pathtracing-1.png)](/images/posts/2023-05-29-sessions2023-glsl-compo/pathtracing-1.png)

下記はGlossyなマテリアルの球体のレンダリング結果と、そのマテリアルのBRDFの反射方向の分布を示した図です。

[![パストレーシング②](/images/posts/2023-05-29-sessions2023-glsl-compo/pathtracing-2.png)](/images/posts/2023-05-29-sessions2023-glsl-compo/pathtracing-2.png)

Glossyなマテリアルでは、球体の周囲の映り込みがブラー（ぼかし）されていることが分かります。このブラーは、レイを複数方向にサンプリングし、その結果を平均することで実現されています。

難しいことは分からなくても、レイを複数方向に飛ばすことで、ブラー（ぼかし）されるイメージだけ理解できれば問題ありません。

## レイマーチングとMad Tracing

Mad TracingではPath Tracingと同じように表面のroughnessに応じてセカンダリレイを飛ばしてGIを計算します。

通常のパストレーシングでは物体の表面にヒットしてからセカンダリレイを複数回飛ばすと思いますが、
Mad Tracingではレイマーチングのステップ中にセカンダリレイを近傍のオブジェクトのroughnessに応じて飛ばします。

ここでレイマーチングとMad Tracingのレイの進む様子を示した図を紹介します。

### レイマーチングのループの様子

次の図はレイマーチングのループの様子です。

[![レイマーチングのループの様子](/images/posts/2023-05-29-sessions2023-glsl-compo/raymarching.png)](/images/posts/2023-05-29-sessions2023-glsl-compo/raymarching.png)

レイがRayOriginからスタートして、このようにステップごとにRayDirection方向に進んでいきます。
レイマーチングを勉強したことがある人ならおそらく見覚えのある図です。

### Mad Tracingのループの様子

そして次の図はMad Tracingのループの様子です。

[![Mad Tracingのループの様子](/images/posts/2023-05-29-sessions2023-glsl-compo/madtracing.png)](/images/posts/2023-05-29-sessions2023-glsl-compo/madtracing.png)

Mad Tracingは、レイマーチングのループ中に周囲の空間をサンプリングします。
レイの先端を `ro2（ray origin 2）` として、そこからセカンダリーのレイを発射します。この操作をレイマーチングの各ステップで行います。

こうしてレイの周囲の空間からの光源の影響も蓄積することで、Bloomの効果を1Passで実現できます。

これによってボリューム感やBloom感のあるライティングを実現できます。その代償として、少々負荷が高い印象です。

## Mad Tracingのコード解説

実際のGLSLのコードを踏まえてMad Tracingのコード解説します。

### map関数を2回参照

単なるレイマーチングにも見えますが、よく見るとmap関数を2回呼び出していることが分かります。

[![map関数を2回参照](/images/posts/2023-05-29-sessions2023-glsl-compo/madtracing-code1.png)](/images/posts/2023-05-29-sessions2023-glsl-compo/madtracing-code1.png)

2つ目のサンプリングであるm2の行は、周囲の空間のサンプリングです。

### if分岐なしでBloom用／GI用のサンプリングを処理

map関数の返り値はvec4になっており、xにdistance（レイから物体表面への最短距離）が格納されています。

[![if分岐なしにBloom用のサンプリングとGI用のサンプリングを両立](/images/posts/2023-05-29-sessions2023-glsl-compo/madtracing-code2.png)](/images/posts/2023-05-29-sessions2023-glsl-compo/madtracing-code2.png)

通常のレイマーチングでは`distance < eps`になったらレイとオブジェクトが衝突したとみなしてループを抜けますが、Mad Tracingでは衝突後もループを継続します。

衝突後にはro2（セカンダリレイの原点）は衝突した点に固定化されるため、Bloom用のサンプリングからPath Tracingのサンプリングにif分岐なしに自動的に切り替わります。

このようにしてif分岐なしにBloom用のサンプリングとGI用のサンプリングを両立しているのです。

### ボリュームレンダリング

レイマーチングのステップに0.25や0.15の係数を乗算しています。

[![ボリュームレンダリング](/images/posts/2023-05-29-sessions2023-glsl-compo/madtracing-code3.png)](/images/posts/2023-05-29-sessions2023-glsl-compo/madtracing-code3.png)

これはステップの間隔を小さくしてボリュームレンダリングを行うためです。
ステップの間隔が大きすぎるとBloomのアーティファクトが発生しやすくなります。
逆にステップの間隔が小さすぎると負荷が高くなるので、品質と負荷のトレードオフを考慮して係数を決定しました。

### アーティファクト防止

レイのスタート位置に乱数でオフセットを加えることで、ボリュームレンダリングのアーティファクトを防止しています。

[![アーティファクト防止](/images/posts/2023-05-29-sessions2023-glsl-compo/madtracing-code4.png)](/images/posts/2023-05-29-sessions2023-glsl-compo/madtracing-code4.png)

オリジナルのMad Tracingにはない処理ですが、効果が大きかったので追加しました。

### コンパイル時間短縮

この処理はGLSLのコンパイル時間短縮が目的です。

[![コンパイル時間短縮](/images/posts/2023-05-29-sessions2023-glsl-compo/madtracing-code5.png)](/images/posts/2023-05-29-sessions2023-glsl-compo/madtracing-code5.png)

forループがunroll（展開）されるとコンパイル時間が伸びるので、絶対に実行されないifによって強制的にダイナミックループにしてunrollを防ぎます。

HLSLでは`[unroll]`や`[loop]`を明示的に指定が可能ですが、GLSLではこのようなハックが必要となります。

# IFSによるモデリング

モデリングに関しては、シンプルなCubeをIFS（Iterated Function System）を使用して複雑にしました。

[![IFSによるモデリング](/images/posts/2023-05-29-sessions2023-glsl-compo/modeling-ifs.png)](/images/posts/2023-05-29-sessions2023-glsl-compo/modeling-ifs.png)

上の図は、CubeとそれにIFSを適用した結果を示しています。この結果を得るために使用したGLSLのコードは以下の通りです。

IFSの理解を深めるためにはコードを確認するのが近道だと思います。

[![IFSによるモデリングのGLSLのコード](/images/posts/2023-05-29-sessions2023-glsl-compo/modeling-ifs-code.png)](/images/posts/2023-05-29-sessions2023-glsl-compo/modeling-ifs-code.png)

このコードでは、forループの中でいくつかの空間操作（折りたたみ、平行移動、回転）を行い、その後通常通りにCubeの距離関数を計算しています。

IFSについては、[@gaziya5](https://twitter.com/gaziya5)さんの[SDF for raymarching (距離関数のスキル)](https://neort.io/product/bvcrf5s3p9f7gigeevf0)の記事がとても参考になります。

## Unityを利用したパラメーター調整

IFSの実装自体は比較的簡単で、forループの中で適切な空間操作を行うだけです。

一方、IFSのパラメーターの調整は非常に難しいです。今回紹介したIFSのパラメーターは6次元（平行移動3次元 + 回転3次元）です。
6次元の広大なパラメーター空間から、美しい絵を描くための適切なパラメーターを見つける必要があります。
この作業はまさに砂漠からオアシスを見つけるようなものであり、試行錯誤が必要です。

また、通常は6次元よりもさらに次元数が増えていくことが一般的です。

今回はUnityでパラメーター調整してからGLSLに移植する形でモデリングを行いました。

[![Unityでパラメーター調整](/images/posts/2023-05-29-sessions2023-glsl-compo/modeling-ifs-unity.png)](/images/posts/2023-05-29-sessions2023-glsl-compo/modeling-ifs-unity.png)

Unityで調整しているのは以下のような理由からです。

- インスペクターで値の操作がしやすい
- Undo/Redoができる
- カメラの操作がしやすい

## モデリングの試行錯誤

制作初期（4月15日）の段階では、複雑なジオメトリーでしたが、最終的にはシンプルに落ち着きました。

この変更の理由は、Mad Tracingによって得られるライティング情報量の存在です。ジオメトリーの情報量を抑えることで、ライティングもモデリングの情報量がバランスの取れた結果を得ることができると考えました。

また、モデリングが複雑になると見た目がごちゃごちゃしてしまい、キビキビと変形させたときのかっこよさも損なわれると感じました。

さらに、ライティングとモデリングの情報量が最大限になると、GPU負荷や動画のビットレートなどにも負荷がかかることが予想されました。そのため、最終的な判断として情報量を適切に制御することとしました。

これによって、よりバランスの取れた作品を実現することができました。

### プロトタイプ（Unity）

UnityでIFSのパラメーターを試行錯誤している段階では、このようにかなり情報量の多い複雑なジオメトリーでした。

[![プロトタイプ（Unity）1](/images/posts/2023-05-29-sessions2023-glsl-compo/modeling-ifs-prototype-unity-1.png)](/images/posts/2023-05-29-sessions2023-glsl-compo/modeling-ifs-prototype-unity-1.png)

[![プロトタイプ（Unity）2](/images/posts/2023-05-29-sessions2023-glsl-compo/modeling-ifs-prototype-unity-2.png)](/images/posts/2023-05-29-sessions2023-glsl-compo/modeling-ifs-prototype-unity-2.png)

[![プロトタイプ（Unity）3](/images/posts/2023-05-29-sessions2023-glsl-compo/modeling-ifs-prototype-unity-3.png)](/images/posts/2023-05-29-sessions2023-glsl-compo/modeling-ifs-prototype-unity-3.png)

[![プロトタイプ（Unity）4](/images/posts/2023-05-29-sessions2023-glsl-compo/modeling-ifs-prototype-unity-4.png)](/images/posts/2023-05-29-sessions2023-glsl-compo/modeling-ifs-prototype-unity-4.png)

### プロトタイプ（GLSL）

最終的にボツになりましたが、このようなモデリングの試作もしていました。ネタ供養です。

[![プロトタイプ（Unity）1](/images/posts/2023-05-29-sessions2023-glsl-compo/modeling-ifs-prototype-shadertoy-1.png)](/images/posts/2023-05-29-sessions2023-glsl-compo/modeling-ifs-prototype-shadertoy-1.png)

[![プロトタイプ（Unity）2](/images/posts/2023-05-29-sessions2023-glsl-compo/modeling-ifs-prototype-shadertoy-2.png)](/images/posts/2023-05-29-sessions2023-glsl-compo/modeling-ifs-prototype-shadertoy-2.png)

[![プロトタイプ（Unity）3](/images/posts/2023-05-29-sessions2023-glsl-compo/modeling-ifs-prototype-shadertoy-3.png)](/images/posts/2023-05-29-sessions2023-glsl-compo/modeling-ifs-prototype-shadertoy-3.png)

[![プロトタイプ（Unity）4](/images/posts/2023-05-29-sessions2023-glsl-compo/modeling-ifs-prototype-shadertoy-4.png)](/images/posts/2023-05-29-sessions2023-glsl-compo/modeling-ifs-prototype-shadertoy-4.png)

### IFSのバリエーション

中盤の複雑なIFSのシーンもパラメーター調整のみで実現しました。

[![IFSのバリエーション](/images/posts/2023-05-29-sessions2023-glsl-compo/chromatiq5096.png)](/images/posts/2023-05-29-sessions2023-glsl-compo/chromatiq5096.png)

# 壁面の演出

部屋のジオメトリーは非常にシンプルで、装飾のない完全な直方体です。

[![壁面の演出](/images/posts/2023-05-29-sessions2023-glsl-compo/wall.png)](/images/posts/2023-05-29-sessions2023-glsl-compo/wall.png)

このシンプルなデザインは、Mad Tracingによる反射の効果を最大限に活かすために採用しました。

床や壁のシンプルなジオメトリーにより、反射の美しさを引き立たせることができます。周囲の光やオブジェクトが壁面に反射されることで、部屋全体に深みと立体感が生まれます。
さらに、壁面には複数のEmissive（発光）のパターンを取り入れました。壁面の発光パターンにより、部屋の情報量を増やすことができます。
壁面からの発光パターンは、光のダイナミクスや環境の雰囲気を演出する一方、シンプルなジオメトリーとの対比も生み出します。

結果として、シンプルな部屋のジオメトリーと複雑な壁面のEmissiveのパターンとMad Tracingによる反射の効果が組み合わさり、情報量のバランスがとれた空間を実現できたと思います。

## ノイズの壁面パターン

序盤の壁面のパターンは、David Hoskinsさんによる有名なHash without Sineによる疑似乱数です。

[![ノイズの壁面パターン](/images/posts/2023-05-29-sessions2023-glsl-compo/wall-noise.png)](/images/posts/2023-05-29-sessions2023-glsl-compo/wall-noise.png)

Mad Tracingのアーティファクト防止に利用したhash（擬似的なランダム値を返す関数）関数を再利用しました。

uv座標に対してfloorを適用してからhashを呼び出すことで、解像度を下げることができます。この結果、QRコードのような雰囲気にできました。

## 警告の壁面パターン

中盤の警告の壁面パターンでは、六角形のタイルの中心にランダムなマークを描画しました。

マークには大きく2種類あります。1つ目はSESSIONSのロゴにも使用されている斜めのストライプのパターンであり、もう1つは2DのIFSによって生成されるパターンです。

2DのIFSパターンは、以下のようなコードで生成されています。

[![警告の壁面パターン](/images/posts/2023-05-29-sessions2023-glsl-compo/wall-warning.png)](/images/posts/2023-05-29-sessions2023-glsl-compo/wall-warning.png)

IFSは3DのCubeのモデリングでも使用していましたが、もちろん2Dでも利用できます。

IFSの処理は、Cubeの場合とほぼ同じです。折りたたみ、平行移動、回転などの操作を行います。

異なる点は、3DではXYZの各軸に対して3回の回転を行っていたのに対し、2Dでは1回の回転で済むことです。

IFSのパラメーターは事前に調整され、8つのバリエーションを配列に定義しました。六角形のグリッドごとに乱数を生成し、ランダムにパターンを選択するように設定しました。これにより、パターンのバリエーションが豊かになります。

### NEORT++上でのリアル空間展示

[#CURATION_FREE_2](https://neort.io/challenge/ch4hvjsn70rhlpf0n460)はSESSIONS直後に開催され、タイミングが良かったので参加しました。

警告のパターンを取り出してNEORTに移植し、NEORT++の展示室に展示させていただきました。

> デジタルアートの新しい体験について考える東京馬喰町のアートギャラリーNEORT++にて5/6, 7に開催される展示”CURATION FREE #2”の作品を募集します。
> 
> 本展は、昨年末に行われたキュレーションを介さない展示"CURATION FREE"の第二弾です。
> 
> 期間中、NEORTに投稿された作品が東京馬喰町にあるNEORT++の空間に展示されていきます。
> 
> どんな展示になるか予想ができませんが、表現の多様性を尊重した新しい試みになることを期待します。

<blockquote class="twitter-tweet" data-conversation="none"><p lang="ja" dir="ltr">Real &quot;Transcendental Cube&quot;<br><br>&quot;Transcendental Cube&quot; の壁面の演出の一部をNEORTに移植して <a href="https://twitter.com/hashtag/CURATION_FREE_2?src=hash&amp;ref_src=twsrc%5Etfw">#CURATION_FREE_2</a> のday1に展示しました。<br><br>（同じような動画を連投して申し訳ないですが、前の動画の画質が微妙だったので…）<a href="https://twitter.com/hashtag/CURATION_FREE_2?src=hash&amp;ref_src=twsrc%5Etfw">#CURATION_FREE_2</a> <a href="https://twitter.com/hashtag/SESSIONS_Party?src=hash&amp;ref_src=twsrc%5Etfw">#SESSIONS_Party</a> <a href="https://t.co/Un1t8rBc2m">pic.twitter.com/Un1t8rBc2m</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1654880194287763456?ref_src=twsrc%5Etfw">May 6, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>      

NEORT++の展示室もシンプルな直方体でしたので、作品中のような見え方になるのではないかと期待していました。しかし、実際はそんなことはありませんでした。

パソコンのディスプレイ上で見たときと、現実世界にプロジェクションされたときの差異が大きく、予想していたような映像体験は残念ながら実現しませんでした。

しかし、多くの作品を鑑賞する中で、さまざまな新たな発見がありました。展示された作品が実際にどのような風に見えるのか、そのパターンや効果を少しずつ理解することができました。この経験は非常に有意義なものでした。

NEORT++の展示室の環境では思ったような結果にはならなかったのですが、それでもたくさんの作品に触れ、新たな視点やアイデアを得ることができました。今回の経験を活かして今後の自身の制作にも繋げていきたいです。

# インスピレーションを得た作品の紹介

『Transcendental Cube』は複数の作品からインスピレーションを得ながら、それらを自分の中で組み合わせることで独自のコンセプトを形成しました。以下では、そのインスピレーションを受けた作品を紹介します。

## Life by setchi

この作品は、TokyoDemoFest 2018のGLSL Graphics Compoで2位に輝いた作品です。

シンプルなジオメトリーが複雑に変形するコンセプトはここから触発されました。

<div class="movie-wrap">
<iframe width="1920" height="1080" src="https://www.youtube.com/embed/R4tNEFVz5K8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>


## delight by mercury

この作品は、Under Construction 2015のCombined Intro Compoで優勝した作品です。

美しいグローバルイルミネーション、音楽と映像の見事な同期、そして鮮やかな展開が特徴です。部屋をシンプルにすることで反射を際立たせるアイデアも、この作品からの影響を受けました。

<div class="movie-wrap">
<iframe width="1920" height="1080" src="https://www.youtube.com/embed/UnjIMd3kVf4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

## Delayed by kaneta

この作品は、[Shader1weekCompo](https://www.shader1weekcompo.org/)の第1回（[#S1C001](https://neort.io/tag/br0kuak3p9f194rkh8tg)）で発表されました。

壁面の発光パターンが床に反射する様子が非常にクールだったので、作品の演出に取り入れました。

<div class="movie-wrap">
<iframe width="1920" height="1080" src="https://www.youtube.com/embed/Noe4SsARPVo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

# グラフィックス解説のまとめ

本記事では『Transcendental Cube』について、そのグラフィックスについて解説しました。

この記事が読者の皆さんの制作に少しでもお役に立てれば幸いです。

# SESSIONSの振り返り

作品のグラフィックス解説からはテーマが外れてしまいますが、最後にSESSIONSの振り返りを記しておきます。

## オフラインパーティーの魅力

TokyoDemoFest2018年以来の約5年ぶりのオフライン開催のデモパーティーということで、大勢でデモを鑑賞したり、交流したりと、懐かしくも楽しい時間を過ごせました。

オンラインのデモパーティーも素晴らしいものですが、会場の雰囲気や臨場感を直接感じられる点で、やはりオフラインイベントには特別な魅力があると感じています。

実際に参加者と話をしたり、作品についての感想やアイデアを交換したりすることで、新たな視点やインスピレーションを得ることができました。

## SESSIONSについて

SESSIONSは2023年から新たにスタートしたデモパーティーです。

> デモパーティーとはコンピューターを用いたプログラミングやアートに興味のある人々が日本中・世界中から一堂に会し、デモ作品のコンペティション (Compo) やセミナーなどが行われるイベントです。 
> パーティという名の通り、勉強会のように堅苦しい感じではなく、みんな賑やかに作品の制作過程を見せ合ったりと参加者同士でのコミュニケーションが盛んに行われます。

SESSIONSの前身である[TokyoDemoFest](https://tokyodemofest.jp/)は純粋なデモパーティーに属するものでしたが、SESSIONSはそれとは異なり、デモシーンの枠に囚われず、さまざまなカテゴリーのクリエイティブ作品を募集する「パーティ＆コンペティションイベント」として位置づけられています。

<blockquote class="twitter-tweet"><p lang="qme" dir="ltr"><a href="https://twitter.com/hashtag/SESSIONS_Party?src=hash&amp;ref_src=twsrc%5Etfw">#SESSIONS_Party</a> <a href="https://t.co/aSwiTfSjYH">pic.twitter.com/aSwiTfSjYH</a></p>&mdash; 蘇摩清良 (@soma_arc) <a href="https://twitter.com/soma_arc/status/1661693568975794178?ref_src=twsrc%5Etfw">May 25, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

当日の雰囲気は、アフタームービーからよく伝わってきます。

実際に今回のSESSIONSでも、デモシーンに詳しくない参加者も楽しんで参加している姿を目にすることができました。

学生や新社会人の方の参加も多く見られ、これからのSESSIONSの展開が楽しみです！

<div class="movie-wrap">
<iframe width="1920" height="1080" src="https://www.youtube.com/embed/Xyf5op4-hSs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

## C4 LANとのコラボレーション

今回のSESSIONSは、[C4 LAN](https://c4-lan.com/)というLANパーティーの会場内で開催されました。

C4 LAN全体の様子は、以下のレポートをご覧ください。

- [ゲームイベントとしての認知拡大を目指し、変化を迎えた「C4 LAN 2023 SPRING」レポート | マイナビニュース](https://news.mynavi.jp/article/20230505-2672489/)
- [【C4 LAN】大量のゲーマーがゲーム機持参で勝手に遊ぶだけ。まあまあどうかしてるのに心地いい。ぬるま湯みたいな闇鍋イベントの生存戦略 | ゲーム・エンタメ最新情報のファミ通.com](https://www.famitsu.com/news/202305/12302398.html)

デモパーティーの起源は海外のLANパーティーだと言われていますので、今回C4 LAN内で開催されたことに運命的なものを感じました。SESSIONSは会場エントランスのすぐそばでしたので、デモパーティーをあまり知らないC4 LANの参加者にも時々立ち寄っていただくことがありました。

## ハイレベルだったGLSL Graphics Compo

[Result](https://files.scene.org/view/parties/2023/sessions23/results.txt)の通り、GLSL Graphics Compoの応募はなんと15作品もありました。

作品の数が多いだけでなく、今年は全体的にレベルが高く、近年のGLSL Graphics Compoのレベルのインフレは狂ってるなと思いました（もちろん良い意味で）。

さらに複数のシーンから構成され、上映時間も2〜3分ほどの展開があり、まるでPCデモに匹敵するクオリティの作品も複数ありました。

ぜひアーカイブをご覧ください！

<div class="movie-wrap">
<iframe width="1920" height="1080" src="https://www.youtube.com/embed/F-CbQTcHNrc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

## 参加者レポート

SESSIONS 2023の参加者のレポートや作品の解説などをまとめました。発見次第、随時追加します。

## Combined PC Demo Compo優勝作品の解説

ukonpowerさんによるWebGLを使用した64K IntroがCombined PC Demo Compoで優勝しました。
このスライドではその制作過程や舞台裏について詳しく解説されています。
とくにBlenderを使ったワークフローの紹介や音楽制作の秘話など、非常に興味深い内容でした。ぜひチェックしてみてください！

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">&quot;ﾃﾞｺﾝﾌﾟﾃｨができるまで&quot;です<a href="https://t.co/buX0qJg07V">https://t.co/buX0qJg07V</a><br> <a href="https://twitter.com/hashtag/SESSIONS_Party?src=hash&amp;ref_src=twsrc%5Etfw">#SESSIONS_Party</a> <a href="https://t.co/l8IhsO2wUQ">pic.twitter.com/l8IhsO2wUQ</a></p>&mdash; ukonpower (@ore_ukonpower) <a href="https://twitter.com/ore_ukonpower/status/1661713471862636545?ref_src=twsrc%5Etfw">May 25, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## GLSL Graphics Compo優勝作品の解説

RenardさんによるGLSL Graphics Compoの優勝作品の解説です。
ApproximateLightという独自の手法を用いたグローバルイルミネーションの計算や、本記事でも解説したMad Tracingの高速化についても紹介されています。
詳細な解説がされており、読み応えがあります。ぜひチェックしてみてください！

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/SESSIONS_Party?src=hash&amp;ref_src=twsrc%5Etfw">#SESSIONS_Party</a><br><br>こちらの作品の解説記事を書きました！<a href="https://t.co/da1inuwbPc">https://t.co/da1inuwbPc</a> <a href="https://t.co/6ijOcdD2Jp">https://t.co/6ijOcdD2Jp</a> <a href="https://t.co/uN1COyotzY">pic.twitter.com/uN1COyotzY</a></p>&mdash; Renard (@Renardealer) <a href="https://twitter.com/Renardealer/status/1658116543073452034?ref_src=twsrc%5Etfw">May 15, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## Combined PC Demo Compo / GLSL Graphics Compo

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">先日の発表資料です。<br>フラクタルとテセレーション<br> | SESSIONS 2023 After Party<a href="https://t.co/OpRabk2VKa">https://t.co/OpRabk2VKa</a><a href="https://twitter.com/hashtag/SESSIONS_Party?src=hash&amp;ref_src=twsrc%5Etfw">#SESSIONS_Party</a></p>&mdash; 蘇摩清良 (@soma_arc) <a href="https://twitter.com/soma_arc/status/1662817935994540032?ref_src=twsrc%5Etfw">May 28, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">本日の発表資料（投稿デモの説明）です<br><br>楽しかった！<a href="https://t.co/uXKgnPhqza">https://t.co/uXKgnPhqza</a><a href="https://twitter.com/hashtag/SESSIONS_Party?src=hash&amp;ref_src=twsrc%5Etfw">#SESSIONS_Party</a></p>&mdash; ukeyshima (@ukeyshima) <a href="https://twitter.com/ukeyshima/status/1661764148802502661?ref_src=twsrc%5Etfw">May 25, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">初めてPC Demoを作った話｜Saina <a href="https://twitter.com/SainaKey?ref_src=twsrc%5Etfw">@SainaKey</a> <a href="https://twitter.com/hashtag/SESSIONS_Party?src=hash&amp;ref_src=twsrc%5Etfw">#SESSIONS_Party</a><a href="https://twitter.com/hashtag/note?src=hash&amp;ref_src=twsrc%5Etfw">#note</a> <a href="https://twitter.com/hashtag/madewithunity?src=hash&amp;ref_src=twsrc%5Etfw">#madewithunity</a><a href="https://t.co/x5zzLC5VB2">https://t.co/x5zzLC5VB2</a></p>&mdash; Saina(さいな) (@SainaKey) <a href="https://twitter.com/SainaKey/status/1652702468474798081?ref_src=twsrc%5Etfw">April 30, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">SESSIONSに提出したDemoの音楽を解剖します｜蒼空 / sola <a href="https://twitter.com/sola_117?ref_src=twsrc%5Etfw">@sola_117</a> <a href="https://twitter.com/hashtag/note?src=hash&amp;ref_src=twsrc%5Etfw">#note</a> <a href="https://t.co/XplbBpEnOr">https://t.co/XplbBpEnOr</a></p>&mdash; 蒼空 / sola (@sola_117) <a href="https://twitter.com/sola_117/status/1653244428134547457?ref_src=twsrc%5Etfw">May 2, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">すごい大雑把になりますが、SESSIONS の GLSL Compoで提出した作品についての制作経緯について記事にしました。<a href="https://t.co/EZHDY1ahJ0">https://t.co/EZHDY1ahJ0</a><a href="https://twitter.com/hashtag/glsl?src=hash&amp;ref_src=twsrc%5Etfw">#glsl</a><a href="https://twitter.com/hashtag/SESSIONS_Party?src=hash&amp;ref_src=twsrc%5Etfw">#SESSIONS_Party</a></p>&mdash; 独楽回しeddy (@EKey2210) <a href="https://twitter.com/EKey2210/status/1652660167635501058?ref_src=twsrc%5Etfw">April 30, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">【補足】<br>・コードには日本語のコメントを書いてあります<br>・ちゃんと壁を通り抜けられないようになっています！<br>・マップはランダムに生成していて、どこまでも続いています！（※浮動小数の精度の許す限り） <a href="https://t.co/ugBcMKUbQL">pic.twitter.com/ugBcMKUbQL</a></p>&mdash; Kamoshika (@kamoshika_vrc) <a href="https://twitter.com/kamoshika_vrc/status/1652700446614781952?ref_src=twsrc%5Etfw">April 30, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/SESSIONS_Party?src=hash&amp;ref_src=twsrc%5Etfw">#SESSIONS_Party</a> <br>SESSIONSのGLSL compに海賊放送をモチーフにした作品を提出させて頂きました<a href="https://t.co/DZx5NNzNAJ">https://t.co/DZx5NNzNAJ</a> <a href="https://t.co/HrncS23PrC">pic.twitter.com/HrncS23PrC</a></p>&mdash; KiNaNkomoti (@Kinakomoti2357) <a href="https://twitter.com/Kinakomoti2357/status/1652677355901706240?ref_src=twsrc%5Etfw">April 30, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Just released S͎E͎A͎W͎A͎L͎L͎ <a href="https://twitter.com/SESSIONS_Party?ref_src=twsrc%5Etfw">@SESSIONS_Party</a>, a quick <a href="https://twitter.com/hashtag/BladeRunner2049?src=hash&amp;ref_src=twsrc%5Etfw">#BladeRunner2049</a> inspired shader doodle I did a while back. Check out the final version on <a href="https://twitter.com/Shadertoy?ref_src=twsrc%5Etfw">@Shadertoy</a> ✨: <a href="https://t.co/ypBZWvp6oD">https://t.co/ypBZWvp6oD</a><a href="https://twitter.com/hashtag/demoscene?src=hash&amp;ref_src=twsrc%5Etfw">#demoscene</a> <a href="https://twitter.com/hashtag/shader?src=hash&amp;ref_src=twsrc%5Etfw">#shader</a> <a href="https://twitter.com/hashtag/brutalism?src=hash&amp;ref_src=twsrc%5Etfw">#brutalism</a> <a href="https://t.co/WczF1MLuDm">pic.twitter.com/WczF1MLuDm</a></p>&mdash; LJ (@LJ_1102) <a href="https://twitter.com/LJ_1102/status/1653088310988881923?ref_src=twsrc%5Etfw">May 1, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>