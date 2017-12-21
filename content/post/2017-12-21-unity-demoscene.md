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
title = "Unityでメガデモに挑戦"
slug = "unity-demoscene"

+++

これは [Unity #2 Advent Calendar 2017](https://qiita.com/advent-calendar/2017/unity2) 21日目の記事です。

----

Unityを使って、メガデモ（デモシーン）の制作に挑戦しました。

<iframe width="560" height="315" src="https://www.youtube.com/embed/jU_0bFDOnR4" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>

# メガデモ（デモシーン）とは

デモシーンはヨーロッパを起源としたコンピュータを使った音と映像の作品を作成し、みんなに見せ合うというカルチャーです。

一般的なムービーとは違い、映像はプログラムからリアルタイムに生成されます。

海外ではデモシーンという名称が一般的ですが、日本ではメガデモと呼ばれることが多いようです。

- [デモシーンの歴史 | DEMOSCENE.JP](http://www.demoscene.jp/?page_id=50)

日本でもTokyo Demo Fest（以下、TDF）というデモシーンの大会が毎年開催されています。
私も2016年と2017年の大会にGLSL Graphics Compo部門で参加しました。

- [#TokyoDemoFest 2017 の GLSL Graphics Compo で3位入賞！](https://gam0022.net/blog/2017/02/24/tdf2017/)
- [#TokyoDemoFest 2016 の GLSL Graphics Compo で3位入賞！](https://gam0022.net/blog/2016/02/24/tokyo-demo-fest/)

# 今回のテーマと目的

## 今回のテーマ

通常、デモシーンでは厳しい制限の中で競うことが多いです。
例えば、GLSL Graphics Compo部門ではGLSLのシェーダーのみで作品を作らなければなりませんし、
4k intro部門であれば実行ファイルの容量をわずか4KBに収めなければいけません。

Unityを使うとなると、容量を小さく抑えることは困難なので、今回はそのような制約は無視することにします。

ひとまずプログラムからプロシージャルに映像を作るという点にフォーカスして、
Unityの便利なAssetをじゃぶじゃぶ使って、何かを作ろうという趣旨でやっていきます。

## 今回の目的

これまでの個人のTDFの参加経験の中では、GLSL Graphics Compo部門のエントリーしかしたことがありませんでした。

次回のTDFではPC Demo Compoで挑戦したいと考えており、
そのツールとしてUnityは有力な選択肢だったので、Unityでデモシーンを作る検証をしてみたいと思いました。

さらに、最近では仕事でUnityを触る機会も増えてきたので、Unityの勉強を兼ねてUnityでデモシーン作成に挑戦することにしました。

# 作品の解説

レイマーチングにより空間を描画しつつ、画面の中央のロボットはラスタライズによる描画をする、
レイマーチングとラスタライザのハイブリッドな描画を試みた作品です。

レイマーチングの結果をGバッファに書き込むディファードシェーディングを採用しています。
これによって、レイマーチングもラスタライザも一貫したシェーディングを実現しています。

また、BloomやAOのポストエフェクトを使用して、見た目の品質を向上させました。

全体の進行の制御はUnity2017のTimelineを使いました。

## 使用したアセット

今回の目的は「検証」なので、色々と試してみました。

uRaymarchingを除くと、すべてUnity Technologiesの公式Assetです。

- プロシージャル系
    - [uRaymarching](https://github.com/hecomi/uRaymarching)
    - [Post-processing Stack v2](https://github.com/Unity-Technologies/PostProcessing)
    - [Default Playables](https://www.assetstore.unity3d.com/jp/#!/content/95266)
    - [TextMesh Pro](https://www.assetstore.unity3d.com/jp/#!/content/84126)
- Asset系
    - [Space Robot Kyle](https://www.assetstore.unity3d.com/jp/#!/content/4696)
    - [ユニティちゃん 3Dモデルデータ](http://unity-chan.com/download/releaseNote.php?id=UnityChan)のモーション
    - [Unity Particle Pack](https://www.assetstore.unity3d.com/jp/#!/content/73777)
- ツール系
    - [Unity Recorder](https://github.com/Unity-Technologies/GenericFrameRecorder)

### uRaymarching

TODO:

### Post-processing Stack v2

TODO:

### Timeline + Default Playables

TODO:

![timeline](/images/posts/2017-12-21-unity-demoscene/timeline.jpg)

### TextMesh Pro

後半のタイトル文字に使用しました。

Timelineとの連携については、ひとまずActivation Trackを使うことで実現できました。

TextMesh Proのサンプルの[TextConsoleSimulator](https://github.com/gam0022/unity-demoscene/blob/master/Assets/TextMesh%20Pro/Examples%20%26%20Extras/Scripts/TextConsoleSimulator.cs)というクラスで一文字ずつ表示する制御をしているのですが、通常再生時より録画時の方がスピードが速くなる問題がありました。

これはTimeline用にTextConsoleSimulatorを改修する必要があるかもしれません。

### Unity Particle Pack

ロボットの足元の火花に"ElectricalSparksEffect"を使用しました。

Timelineとの連携については、ひとまずActivation Trackを使うことで実現できました。

### Unity Recorder

Unityの画面を録画して動画に保存するAssetです。

冒頭のYouTubeの動画もこのAssetを使って撮影しました。

固定フレームレートに対応しているので、非力なPCでも撮影できます。

さらにTimelineとの連携機能もありました。
Recorder trackをタイムラインに追加すると、エディター再生時に自動で録画ができます。

注意点としては、Unity Asset Storeで公開されている[v0.1ではUIが録画できないという不具合](https://github.com/Unity-Technologies/GenericFrameRecorder/issues/11)がありました。[GitHubのReleases](https://github.com/Unity-Technologies/GenericFrameRecorder/releases)から現時点の最新版のv0.2をダウンロードしたところ、解決しました。

# まとめ
