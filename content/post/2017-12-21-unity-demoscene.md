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
title = "Unityでデモ制作に初挑戦"
slug = "unity-demoscene"

+++

これは [Unity #2 Advent Calendar 2017](https://qiita.com/advent-calendar/2017/unity2) 21日目の記事です。

----

美しいCGアニメーションをリアルタイムに生成するプログラムを「デモ」と呼びます。
今回は、Unityを使ったデモの制作に初挑戦しました。

<iframe width="560" height="315" src="https://www.youtube.com/embed/jU_0bFDOnR4" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>

# 作品の解説

レイマーチングとラスタライザのハイブリッドな描画を試みた作品です。
空間はレイマーチングで、画面の中央のロボットはラスタライズで描画されています。
レイマーチングとラスタライズで一貫したシェーディングを実現するために、レイマーチングの結果をGバッファに書き込むディファードシェーディングを採用しました。

また、BloomやAOのポストエフェクトを使用して、見た目の品質を向上させました。

全体の進行の制御はUnity2017のTimelineを使いました。

## 使用したアセット

今回は試作という意味から、色々なアセットを試してみました。
uRaymarchingを除いて、すべてUnity Technologiesの公式アセットです。

### プロシージャル系
- [uRaymarching](https://github.com/hecomi/uRaymarching)
- [Post-processing Stack v2](https://github.com/Unity-Technologies/PostProcessing)
- [Default Playables](https://www.assetstore.unity3d.com/jp/#!/content/95266)

後半のタイトル文字には[TextMesh Pro](https://www.assetstore.unity3d.com/jp/#!/content/84126)を使用しました。
Timelineとの連携は、Activation Trackを使って実現しています。
1文字ずつ表示する部分は、TextMesh ProのサンプルのTextConsoleSimulatorクラスを使って制御しています。
しかし、通常再生時と録画時とで表示速度が異なるという問題があるため、Timeline用に改修すべきかもしれません。

### Asset系
- [Space Robot Kyle](https://www.assetstore.unity3d.com/jp/#!/content/4696)
- [ユニティちゃん 3Dモデルデータ](http://unity-chan.com/download/releaseNote.php?id=UnityChan)のモーション

ロボットの足元の火花には、[Unity Particle Pack](https://www.assetstore.unity3d.com/jp/#!/content/73777)
に含まれている「ElectricalSparksEffect」を使用しました。
Timelineとの連携は、Activation Trackを使って実現しています。

### ツール系
冒頭のYouTubeの動画は、[Unity Recorder](https://github.com/Unity-Technologies/GenericFrameRecorder)を使って撮影しました。
このアセットは、Unityの画面を録画し、動画として保存してくれます。
固定フレームレートに対応しているので、非力なPCでも撮影が可能です。

Unity Recorderには、Timelineとの連携機能もありました。
Recorder trackをタイムラインに追加すると、エディター再生時に自動で録画ができます。

注意点として、[v0.1ではUIが録画できないという不具合](https://github.com/Unity-Technologies/GenericFrameRecorder/issues/11)が報告されています。
[GitHubのReleases](https://github.com/Unity-Technologies/GenericFrameRecorder/releases)から、v0.2（現時点の最新版）をダウンロードすることで解決できました。


### uRaymarching

TODO:

### Post-processing Stack v2

TODO:

### Timeline + Default Playables

TODO:

![timeline](/images/posts/2017-12-21-unity-demoscene/timeline.jpg)


# まとめ
