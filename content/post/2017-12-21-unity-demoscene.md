+++
date = "2017-12-21T22:30:11+09:00"
image = ""
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

# メガデモ（デモシーン）とは

デモシーンはヨーロッパを起源としたコンピュータを使った音と映像の作品を作成し、みんなに見せ合うというカルチャーです。

一般的なムービーとは違い、映像はプログラムからリアルタイムに生成されます。

海外ではデモシーンという名称が一般的ですが、日本ではメガデモと呼ばれることが多いようです。

- [デモシーンの歴史 | DEMOSCENE.JP](http://www.demoscene.jp/?page_id=50)

日本でもTokyo Demo Festというデモシーンの大会が毎年開催されています。
私も2016年と2017年の大会にGLSL Graphics Compo部門で参加しました。

- [#TokyoDemoFest 2017 の GLSL Graphics Compo で3位入賞！](https://gam0022.net/blog/2017/02/24/tdf2017/)
- [#TokyoDemoFest 2016 の GLSL Graphics Compo で3位入賞！](https://gam0022.net/blog/2016/02/24/tokyo-demo-fest/)

# 今回のテーマ

これまでは[GLSL Sandbox](http://glslsandbox.com/)上で動かすGLSL Graphics Compo部門用の作品だけを作ってきました。

しかし、最近は仕事でUnityを触る機会も増えてきたので、Unityの勉強を兼ねてUnityでデモシーン作成に挑戦することにしました。

通常、デモシーンでは厳しい制限の中で競うことが多いです。
例えば、GLSL Graphics Compo部門ではGLSLのシェーダーのみで作品を作らなければなりませんし、
4k intro部門であれば実行ファイルの容量をわずか4KBに収めなければいけません。

Unityを使うとなると、容量を小さく抑えることはまず無理なので、今回はそのような制約は無視することにします。

ひとまずプログラムから映像を作るという点にフォーカスして、
Unityの便利なAssetをじゃぶじゃぶ使って、何かを作ろうという趣旨でやっていきたいと思います。

# 使用したアセット

- [uRaymarching](https://github.com/hecomi/uRaymarching)
- [Post-processing Stack v2](https://github.com/Unity-Technologies/PostProcessing)
- [Default Playables](https://www.assetstore.unity3d.com/jp/#!/content/95266)
