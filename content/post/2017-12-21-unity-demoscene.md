+++
date = "2017-12-21T22:30:11+09:00"
image = "/images/posts/2017-12-21-unity-demoscene/unity-demoscene-1.jpg"
toc = true
math = false
draft = false
tags = [
"Unity",
"CG",
"レイマーチング"
]
title = "Unityでデモ制作に挑戦（uRaymarchingとTimelineを試す）"
slug = "unity-demoscene"

+++

これは [Unity #2 Advent Calendar 2017](https://qiita.com/advent-calendar/2017/unity2) 21日目の記事です。

----

美しいCGアニメーションをリアルタイムに生成するプログラムを「デモ」と呼びます。
今回は、Unityを使ったデモの制作に初挑戦しました。

<iframe width="560" height="315" src="https://www.youtube.com/embed/jU_0bFDOnR4" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>

# 作品の解説

「レイマーチングで動的に生成したモデル」と「ポリゴンメッシュのモデル」を混在させた作品です。
ロボットは通常の3Dモデルですが、床や柱のモデルはレイマーチングでプロシージャルに生成しました。

<!--
暗闇の中で発光を綺麗かつカッコよく見えるようにBloomのポストエフェクトを盛りました。
-->

映像作品と相性が良さそうなので、Unity2017のTimelineも利用しました。

<!--
今回は試作という意味から、色々なアセットを試してみました。
uRaymarchingを除いて、すべてUnity Technologiesの公式アセットです。
-->

Unityのバージョンは執筆時点の最新版である2017.2.1f1を用いました。

## uRaymarchingによるレイマーチング

uRaymarchingはレイマーチングのシェーダの作成をサポートするエディタ拡張です。
開発者は[@hecomi](https://twitter.com/hecomi)さんです。

- [uRaymarching | GitHub](https://github.com/hecomi/uRaymarching)
- [Unity でレイマーチングするシェーダを簡単に作成できるツールを作ってみた](http://tips.hecomi.com/entry/2016/10/11/225541)

uRaymarchingではDefferedシェーディングを採用しており、レイマーチングのシェーダはGバッファに対して結果を書き込みます。
そのため、今回のようにレイマーチングとポリゴンのモデルが混在したシーンであっても、一貫したシェーディングを実現できました！
個人的に、とっても魅力的なポイントでした！

### 距離関数の設計

Boxの組み合わせだけでシーンを構成しました。
床はBoxを敷き詰めているのは見た目通りだと思いますが、なんと柱もBoxの組み合わせで作っています。

### 床がランダムな順番に光る演出

床をJubeat（音ゲー）風にランダムに光らせる演出は自分でも気に入っています。

この演出の実装方法はとてもお手軽なので、紹介します！

まずは、Y座標に応じて光るように、Gバッファに書き出すemissionを設定します。
光らせるY座標の位置は時間でアニメーションさせます。

```hlsl
inline void PostEffect(RaymarchInfo ray, inout PostEffectOutput o)
{
    o.emission = half4(2.0, 2.0, 5.0, 1.0) * abs(sin(PI * 12.0 * _Time.x)) * step(frac(ray.endPos.y - 4.0 * _Time.x), 0.02);
}
```

次に、床のブロックの高さの動きをランダムに設定します。

```hlsl
float dFloor(float3 pos)
{
    float3 p = pos;
    p.xz = Repeat(p.xz, 0.5);
    p.y += 1 + 0.1 * sin(36.0 * _Time.x + 2.0 * Rand(floor(2.0 * pos.xz)));
    return sdBox(p, float3(0.2, 0.2, 0.2));
}
```

これだけで、床をJubeat（音ゲー）風にランダムに光らせる演出の完成です！

床の高さがバラバラになっているので、等高線で光らせるとタイミングが微妙にずれて、いい感じにバラバラのタイミングで光ります！

### uRaymarchingのトラブルシューティング

2点だけつまずいたポイントがあったので、後学のためにメモを残しておきます。

1. ShaderTemplates で Direct GBuffer を選択すると、影が落ちない（Shadow Caster が動作しない）
    - これはUnityの仕様に原因があるらしく、hecomiさんの記事にも書いてありました
2. プロジェクトの設定で `metalEditorSupport: 0` にしないと、Macで動作しない
    - [修正のコミット](https://github.com/gam0022/unity-demoscene/commit/47f19613bbc032bef1b8b35b9b972f3f9983debc)

## Post-processing Stack v2によるポストエフェクト

- [Post-processing Stack v2](https://github.com/Unity-Technologies/PostProcessing)

TODO

## Timelineとの連携

![timeline](/images/posts/2017-12-21-unity-demoscene/timeline.jpg)

TODO

### カメラワーク

[Default Playables](https://www.assetstore.unity3d.com/jp/#!/content/95266)

TODO

### テキスト

後半のタイトル文字には[TextMesh Pro](https://www.assetstore.unity3d.com/jp/#!/content/84126)を使用しました。
Timelineとの連携は、Activation Trackを使って実現しています。
1文字ずつ表示する部分は、TextMesh ProのサンプルのTextConsoleSimulatorクラスを使って制御しています。
しかし、通常再生時と録画時とで表示速度が異なるという問題があるため、Timeline用に改修すべきかもしれません。

### パーティクル

ロボットの足元の火花には、[Unity Particle Pack](https://www.assetstore.unity3d.com/jp/#!/content/73777)
に含まれている「ElectricalSparksEffect」を使用しました。
Timelineとの連携は、Activation Trackを使って実現しています。

## 3D素材

ロボットの3Dモデルは[Space Robot Kyle](https://www.assetstore.unity3d.com/jp/#!/content/4696)を使わせていただきました。

モーションは[ユニティちゃん 3Dモデルデータ](http://unity-chan.com/download/releaseNote.php?id=UnityChan)を利用しました。

## 動画撮影

冒頭のYouTubeの動画は、[Unity Recorder](https://github.com/Unity-Technologies/GenericFrameRecorder)を使って撮影しました。
このアセットは、Unityの画面を録画し、動画として保存してくれます。
固定フレームレートに対応しているので、非力なPCでも撮影が可能です。

Unity Recorderには、Timelineとの連携機能もありました。
Recorder trackをタイムラインに追加すると、エディター再生時に自動で録画ができます。

注意点として、[v0.1ではUIが録画できないという不具合](https://github.com/Unity-Technologies/GenericFrameRecorder/issues/11)がありました。
[GitHubのReleases](https://github.com/Unity-Technologies/GenericFrameRecorder/releases)から、v0.2（現時点の最新版）をダウンロードすることで解決できました。


# 感想

## WebGLとUnityを比較して

TODO
