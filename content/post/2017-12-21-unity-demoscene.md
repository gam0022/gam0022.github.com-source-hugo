+++
date = "2017-12-25T09:30:11+09:00"
image = "/images/posts/2017-12-21-unity-demoscene/cut1.jpg"
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
投稿が遅れたことをお詫びします。

----

「デモ」とは美しいCGアニメーションをリアルタイムに生成するプログラムです（参照: [デモシーン](https://ja.wikipedia.org/wiki/%E3%83%87%E3%83%A2%E3%82%B7%E3%83%BC%E3%83%B3)）。

今回はUnityを使ったデモの制作に初挑戦しました。
動画を用意しました。音はありません。

<iframe width="560" height="315" src="https://www.youtube.com/embed/jU_0bFDOnR4" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>

# 作品の解説

「レイマーチングで動的に生成したモデル」と「ポリゴンメッシュのモデル」を混在させた作品です。
ロボットは通常の3Dモデルですが、床や柱のモデルはレイマーチングでプロシージャルに生成しました。

レイマーチングについてはuRaymarchingというAssetを利用しました。

映像作品と相性が良さそうなので、Unity2017のTimelineも利用しました。

今回は試作という意味から、uRaymarchingとTimelineの他にも様々なアセットを試しました。
色々と試行錯誤をしたので、この記事ではそのノウハウを共有したいと思います。

Unityのバージョンは執筆時点の最新版である2017.2.1f1を用いました。

<!--more-->

## uRaymarchingによるレイマーチング

uRaymarchingはレイマーチングのシェーダの作成をサポートするエディタ拡張です。
開発者は[@hecomi](https://twitter.com/hecomi)さんです。

- [uRaymarching | GitHub](https://github.com/hecomi/uRaymarching)
- [Unity でレイマーチングするシェーダを簡単に作成できるツールを作ってみた](http://tips.hecomi.com/entry/2016/10/11/225541)

uRaymarchingではDefferedシェーディングを採用しており、レイマーチングのシェーダはGバッファに対して結果を書き込みます。
そのため、今回のようにレイマーチングとポリゴンのモデルが混在したシーンであっても、一貫したシェーディングを実現できました！

レイマーチングの衝突判定などの共通処理は、uRaymarchingが提供する共通のシェーダが肩代わりしてくれます。
uRaymarchingの利用者は、レイマーチングの距離関数とGバッファの書き込みの処理だけを記述すれば良いので、
本質的な部分だけに集中できて便利でした。

### 距離関数の設計

Boxの組み合わせだけでシーンを構成しました。
床はBoxを敷き詰めているのは見た目通りだと思いますが、柱もBoxの組み合わせで作っています！

[距離関数のfoldの記事](https://gam0022.net/blog/2017/03/02/raymarching-fold/)で紹介した回転のfoldを利用して、
Boxから上から見たときに多角形になる柱を生成しました。

単純なBoxの形状だけでも、時間経過で形状が変化する面白い形ができたと思っています。

[![柱の様子](/images/posts/2017-12-21-unity-demoscene/distance-function.jpg)](/images/posts/2017-12-21-unity-demoscene/distance-function.png)

### 床がランダムな順番に光る演出

床をJubeat（音ゲー）風にランダムに光らせる演出は自分でも気に入っています。

この演出はお手軽な方法で実装できました！

まずは、Y座標に応じて光るように、Gバッファに書き出すemissionを設定します。
光らせるY座標の位置は時間でアニメーションさせます。

```cpp
inline void PostEffect(RaymarchInfo ray, inout PostEffectOutput o)
{
    o.emission = half4(2.0, 2.0, 5.0, 1.0) * abs(sin(PI * 12.0 * _Time.x)) * step(frac(ray.endPos.y - 4.0 * _Time.x), 0.02);
}
```

次に、床のブロックの高さの動きをランダムに設定します。

```cpp
float dFloor(float3 pos)
{
    float3 p = pos;
    p.xz = Repeat(p.xz, 0.5);
    p.y += 1 + 0.1 * sin(36.0 * _Time.x + 2.0 * Rand(floor(2.0 * pos.xz)));
    return sdBox(p, float3(0.2, 0.2, 0.2));
}
```

これだけで、床をにランダムに光らせる演出の完成です！

床の高さがバラバラになっているので、等高線で光らせるとタイミングが微妙にずれて、いい感じにバラバラのタイミングで光ります！

### uRaymarchingのトラブルシューティング

2点だけつまずいたポイントがあったので、後学のためにメモを残しておきます。

1. ShaderTemplates で Direct GBuffer を選択すると、影が落ちない（Shadow Caster が動作しない）
    - これはUnityの仕様に原因があるらしく、hecomiさんの記事にも書いてありました
2. プロジェクトの設定で `metalEditorSupport: 0` にしないと、Macで動作しない
    - [修正のコミット](https://github.com/gam0022/unity-demoscene/commit/47f19613bbc032bef1b8b35b9b972f3f9983debc)

## Timelineとの連携

Unity2017のTimeline機能でカメラワークやロボットの動き、UI上のテキストなどの演出の制御をしました。

![timeline](/images/posts/2017-12-21-unity-demoscene/timeline.jpg)

### カメラワーク

Timelineからゲームオブジェクトを操作する2つの方法があります。

1. `Playables`を実装・利用する方法
    - APIは複雑で、気軽に使うのは難しい
    - 作り込めば何でもできる
2. `ITimeControl`を継承したコンポーネントを実装・利用する方法
    - APIは単純で、気軽に使える
    - できることが少ない（クリップの現在時間しか受け取れない）

カメラワークの制御をどちらで行うのか悩みましたが、最終的には以下の理由で`ITimeControl`に決めました。

- とりあえずカメラを動かすだけなら、`ITimeControl`が手っ取り早いと感じた
- カメラワークを汎用的な`Playables`に落とし込む時間もスキルも足りなかった

とりあえずカメラワークを`ITimeControl`で実装することはできましたが、
`ITimeControl`では再生時間の情報しか受け取れず、クリップごとにパラメータを持たすことすらできません。
三角関数などを駆使してカメラのtransformを操作して、無理やりカメラワークを実装しましたが、
職人芸すぎてメンテナンスが困難なコードになりました。

今回は満足するものはできなかったので、次回はこれらの方法でカメラワークに再挑戦したいです。

- [Default Playables](https://www.assetstore.unity3d.com/jp/#!/content/95266)
に含まれているTimeline Playable Wizardを使えば、`Playables`の雛形コードを作成できるそうなので、これを利用して独自`Playables`の実装に再挑戦する
- [Cinemachine](http://tsubakit1.hateblo.jp/entry/2017/06/15/225504)というUnity公式のカメラワークを作るための`Playables`を利用する

### ロボットの動き

ロボットに`Animator`コンポーネントをアタッチすれば、普通に`Animation Track`でクリップを再生できました。

2つの`Animation Track`のクリップを重ねるように配置すると、モーションのブレンドができるので、
待機モーションから走るモーションへのブレンドはこれを利用しました。

`Animation Track`の中に作成できる`Override Track`でキャラクターの移動を実現しました。
`Override Track`ではパラメータのアニメーションのカーブを直接編集できます。

[![Animation Trackによるロボットの制御](/images/posts/2017-12-21-unity-demoscene/timeline-animation.png)](/images/posts/2017-12-21-unity-demoscene/timeline-animation.png)

### テキスト

後半のタイトル文字には[TextMesh Pro](https://www.assetstore.unity3d.com/jp/#!/content/84126)を使用しました。
Timelineとの連携は、Activation Trackを使って実現しています。
1文字ずつ表示する部分は、TextMesh ProのサンプルのTextConsoleSimulatorクラスを使って制御しています。
しかし、このクラスはTimelineは考慮されておらず、通常再生時と録画時とで表示速度がずれる問題が残りました。
将来的には独自の`Playables`を実装して、これらの問題を解決したいです。

### パーティクル

ロボットの足元の火花には、[Unity Particle Pack](https://www.assetstore.unity3d.com/jp/#!/content/73777)
に含まれている「ElectricalSparksEffect」を使用しました。
Timelineとの連携は、Activation Trackを使って実現しています。

## その他

### ポストエフェクト

BloomとAmbient Occlusion、Fogのポストエフェクトには、[Post-processing Stack v2](https://github.com/Unity-Technologies/PostProcessing)を利用しました。

以下のポストエフェクトを利用しました。

- Fog
    - レイマーチングでは遠景にエイリアシングが発生して汚くなる弱点があるので、Fogで遠景を暗くしました
    - 現実でも距離の二乗に比例して光が減衰するので、Fogで現実感が増します
- Bloom
    - Bloomは明るい光源からの光が周囲に漏れるように見える効果です
    - 今回はemissionを多用したシーンなので、Bloomが効果的に機能しました
- Ambient Occlusion
    - AOで大域照明感を出しました
    - 暗いシーンなので、違いは分かりにくいかもしれませんね

ポストエフェクトの有無で比較画像を用意しました。
左がポストエフェクトOFF、右がポストエフェクトONです。
違いが一目瞭然ですね！

[![ポストエフェクトの有無で比較](/images/posts/2017-12-21-unity-demoscene/postprocessing.jpg)](/images/posts/2017-12-21-unity-demoscene/postprocessing.png)

### 3D素材

ロボットの3Dモデルは[Space Robot Kyle](https://www.assetstore.unity3d.com/jp/#!/content/4696)を使わせていただきました。

モーションは[ユニティちゃん 3Dモデルデータ](http://unity-chan.com/download/releaseNote.php?id=UnityChan)を利用しました。

### 動画撮影

冒頭のYouTubeの動画は、[Unity Recorder](https://github.com/Unity-Technologies/GenericFrameRecorder)を使って撮影しました。
このアセットは、Unityの画面を録画し、動画として保存してくれます。
固定フレームレートに対応しているので、非力なPCでも撮影が可能です。

Unity Recorderには、Timelineとの連携機能もありました。
Recorder trackをタイムラインに追加すると、エディター再生時に自動で録画ができます。

注意点として、[v0.1ではUIが録画できないという不具合](https://github.com/Unity-Technologies/GenericFrameRecorder/issues/11)がありました。
[GitHubのReleases](https://github.com/Unity-Technologies/GenericFrameRecorder/releases)から、v0.2（現時点の最新版）をダウンロードすることで解決できました。

# 感想

Unityを上手に利用すれば効率的にデモ作成できると感じました。

- 便利なAssetがたくさん提供されている
- リアルタイムに見た目を確認しながら、シェーダのパラメータを調整できる
    - シェーダ（ShaderLab）に数行コードを足すだけで、インスペクタにパラメータを露出できる
- リアルタイムに見た目を確認しながら、シェーダやスクリプトを編集できる
    - Unityに標準搭載されているホットリロード機能によって、シーンの再生中でもシェーダやスクリプトの変更が反映できる

まだUnityを使いこなせていない感があるので、もっとUnityの経験値を貯めたいです。
