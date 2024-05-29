+++
math = false
draft = false
tags = [
    "Unity", "Shader", "CG", "URP", "検証"
]
title = "学園アイドルマスターの眉毛のShaderをUnityで再現してみた"
slug = "gakumasu-mayuge-shader"
date = "2024-05-29T12:00:43+09:00"
image = "/images/posts/2024-05-29-gakumasu-mayuge-shader/mayu.png"
toc = true

+++

ここ最近、[学園アイドルマスター（学マス）](https://gakuen.idolmaster-official.jp/)の鼻や眉毛のシェーダーがTwitter（現X）で話題になっていました。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">学マス、鼻先の黒い点が横から見た時に消えるよう処理をしている<br><br>顔面全体の輪郭線を切ってるのもあって横顔で急な黒が浮いて悪目立ちしたり、鼻の頂点が欠けてシルエットの綺麗さが失われてしまうことに対する対処かな <a href="https://t.co/82TiB41IDR">pic.twitter.com/82TiB41IDR</a></p>&mdash; のすけ (@noske2801) <a href="https://twitter.com/noske2801/status/1791165446764495126?ref_src=twsrc%5Etfw">May 16, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">学マス、顔周りでいうと眉毛と目周りが正面からはステンシルして髪より前に見えているが回転させていくと横顔に近づくある程度の角度でフェードアウトしてく。キャラのデザインによっては横から見た時ステンシルしてる眉毛はチラつきが気になったりするのでとても真似したい <a href="https://t.co/8O7WjcbF9w">pic.twitter.com/8O7WjcbF9w</a></p>&mdash; とれ (@clubnemos) <a href="https://twitter.com/clubnemos/status/1791175839469740474?ref_src=twsrc%5Etfw">May 16, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

鼻のアウトラインがカメラの角度で消えるのは実装は容易に思いつくのですが（カメラのViewベクトルと頭のforwardベクトルの内積からディゾルブ等）、
眉毛が角度でフェードする処理（正面から見ると眉毛が前髪より手前に、横顔に近づくと眉毛がフェードアウトする処理）は実装がすぐには思いつきませんでした。

技術的にも面白そうなテーマだと思ったので、Unityで再現することにしました。

![mayu.gif](/images/posts/2024-05-29-gakumasu-mayuge-shader/mayu.gif)

<!--more-->

# Unity URP上の再現

Stencilを使うパターンと、Stencilを使わずにDepth Offsetするパターンの2つをUnity URP上で実装しました。

プロジェクトファイルはGitHubでも公開しました。

- [github.com/gam0022/ShaderPlaygroundURP](https://github.com/gam0022/ShaderPlaygroundURP)

## モデルの準備

[UnityちゃんシリーズのSDトーコちゃん](https://unity-chan.com/)の3Dモデルを使わせていただきました。

眉毛のメッシュが顔のメッシュとマージされていたので、Blenderの練習も兼ねて眉毛を独立したメッシュとして分割しました。

Meshを独立させることで、Unity上で独立したパスとして描画ができます。

<blockquote class="twitter-tweet" data-conversation="none"><p lang="ja" dir="ltr">使わせていただいた3DモデルはSDトーコちゃんです。<a href="https://t.co/0THUJaTto6">https://t.co/0THUJaTto6</a><br><br>眉毛だけ独立したPassで描画したかったので、Blenderの練習も兼ねて眉毛の部分だけMeshを分割する調整をしました。 <a href="https://t.co/GGSB62osG6">pic.twitter.com/GGSB62osG6</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1793487696608067731?ref_src=twsrc%5Etfw">May 23, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## Stencilを使うパターン

まずはStencilを使うパターンを実装しました。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">学マスの眉毛シェーダー※をUnity上で再現できた。<br><br>※正面から見ると眉毛が前髪より手前に、横顔に近づくと眉毛がフェードアウトする処理<br><br>眉毛でStencilを書き込み、前髪の1Pass目で眉毛ではない領域を不透明描画、前髪の2Pass目で眉毛の上から半透明描画してアルファを制御したら、うまくできた🎉 <a href="https://t.co/DSVmsS66hd">https://t.co/DSVmsS66hd</a> <a href="https://t.co/Gvvvq3LqsE">pic.twitter.com/Gvvvq3LqsE</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1793477397150679423?ref_src=twsrc%5Etfw">May 23, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

眉毛と前髪を特殊なシェーダーにして、前髪は2Passで描画しています。

- 眉毛でStencil（今回はStencil値を2）を書き込む
- 前髪の1Pass目で眉毛に重ならない領域（Comp NotEqual）を不透明描画
- 前髪の2Pass目で眉毛に重なった領域（Comp Equal）を半透明描画してアルファを制御

前髪の2Pass目を省略すると、眉毛が常に不透明度100%で描画されます。2Pass目によって前髪を眉毛の上からアルファブレンドすることで眉毛の不透明度を下げて半透明っぽくしています。

## Depth Offsetするパターン

Stencilは使わずにDepth Offsetするパターンでも実装しました。

<blockquote class="twitter-tweet" data-conversation="none"><p lang="ja" dir="ltr">学マスの眉毛シェーダー、Stencilを使わないパターンもできた🎉<br><br>眉毛だけ2Passで描画<br>・1Pass目：普通に不透明で描画<br>・2Pass目：View空間上でZ Offsetして前髪より手前に移動した状態でアルファブレンドで描画。アルファを顔の角度でフェード<br><br>この方法が一番シンプルな気がします！ <a href="https://t.co/r7niDobHzC">pic.twitter.com/r7niDobHzC</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1794254337205764213?ref_src=twsrc%5Etfw">May 25, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

眉毛だけ2Passで描画しています。

- 眉毛1Pass目：普通に不透明で描画
- 眉毛2Pass目：View空間上でDepth Offsetして前髪より手前に移動した状態でアルファブレンドで描画。アルファを顔の角度でフェード

非常にシンプルな実装です。

眉毛の2Pass目を省略すると通常の描画（前髪の隠れた眉毛は描画されない）になります。

2Pass目はDepth Offsetをして3D空間上で眉毛を前髪よりも手前に移動することで、実質的にZ Testの無効化と同じ効果があります。

Z Testを無効化しても同じ効果を得られますが、Z Testを無効化してしまうと背景や他のキャラクターまで眉毛が貫通して描画してしまうため、Depth Offsetの方が利点が多いように思います。

DepthのOffset量についてはパラメーターなどで調整可能にして、前髪より眉毛が手前になるべく小さい値にしています。

Depth Offsetのアプローチについては、こちらの中国語の記事で知りました。

- [unity卡渲通过深度偏移实现透明眉毛 - 知乎](https://zhuanlan.zhihu.com/p/696515379)


Depth Offsetは頂点シェーダーでこのような処理をしています。

クリッピング空間上のZにしか影響を与えないように実装したので、深度情報のみが変化し、メッシュのシルエットは変化しません。

```c
// View空間上でDepth Offset
// https://zhuanlan.zhihu.com/p/696515379
float3 positionWS = TransformObjectToWorld(input.positionOS.xyz);
float3 positionVS = mul(UNITY_MATRIX_V, float4(positionWS, 1.0)).xyz;

// View空間上でDepth Offset
positionVS.z += _DepthOffset;

float4 positionHCS = TransformWViewToHClip(positionVS);
float depth = positionHCS.z / positionHCS.w;
output.positionHCS = TransformObjectToHClip(input.positionOS.xyz);

// クリッピング空間上でオフセットされた深度を適用
output.positionHCS.z = depth * output.positionHCS.w;
```

この記事だけを読むと、前髪に被っている／被っていないで、眉毛の透明度が変化するのが不思議に思ったのですが、こちらのツイートで疑問が解決しました。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">前髪に隠れるように普通に眉描いて、その後から前髪の上から半透明でもう一度眉描けば、特別な仕組みは要らなそうですが<br>前髪に被ってるところは髪+眉のブレンドで、被ってないところは眉+眉のブレンドだからアルファ値がいくつでも眉の色がそのまま出ます <a href="https://t.co/Dr85ppiivn">https://t.co/Dr85ppiivn</a></p>&mdash; フィン (@phyn_ndk) <a href="https://twitter.com/phyn_ndk/status/1793637537938113004?ref_src=twsrc%5Etfw">May 23, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

シェーダー側では何か特別な処理をしなくても、眉毛をDepth Offset（もしくはZ Test無効）してアルファブレンドすれば自然に意図した結果になります。

- 前髪に被ってるところ
    - 髪+眉のブレンドなので、眉の不透明度は眉のアルファ値で変化
- 前髪に被ってないところ
    - 眉+眉のブレンドなので、眉のアルファ値がいくつでも眉の色がそのままの色になる（眉の不透明度は100%で固定）

色々と頭を捻りましたが、最終的にはこんなシンプルな仕組みでも同じ効果が得られて、おもしろいなと思いました。

# 考察とまとめ

2パターン実装してみましたが、Depth Offsetするパターンの方が使い勝手の面でも性能面でも優位性がありそうだと思いました。

Stencilを使うアプローチでは、キャラクターが複数になったときに、顔が重なると破綻してしまいます。たとえば、キャラクターの頭が重なったときに、奥側のキャラクターの眉毛が手前のキャラクターの頭を貫通するということが起こり得ます。

Depth Offsetするパターンでは、こうした問題を回避できます。

描画負荷の面でも、眉毛の面積は前髪よりも小さいので、眉毛の方を2PassにするDepth Offsetの方がGPU負荷が低いと予想できます。

特殊な眉毛のキャラクターを描画をする機会があれば、DetphOffsetを使ってみたいと思いました。

ちなみに、目（眼球）のようにZ Test無効にすると眼球全体が最前面になって見た目が破綻する要素については、Depth Offsetでは難しいので、Stencilを使うしかない気がしました。