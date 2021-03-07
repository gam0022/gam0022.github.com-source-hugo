+++
title = "Raymarching in Windows Terminal"
slug = "raymarching-in-windows-terminal"
date = "2021-03-08T10:00:00+09:00"
image = "/images/posts/2021-02-26-raymarching-in-windows-terminal/raymarching-in-windows-terminal.jpg"
toc = false
math = false
draft = false
tags = [
    "Raymarching", "Windows Terminal"
]

+++

[![Raymarching in Windows Terminal](/images/posts/2021-02-26-raymarching-in-windows-terminal/raymarching-in-windows-terminal.jpg)](/images/posts/2021-02-26-raymarching-in-windows-terminal/raymarching-in-windows-terminal.png)

# Windows Terminalの背景でレイマーチング

Windows Terminal 1.6から任意のHLSLのPixel Shadersを実行できるようになったので、Windows Terminalの背景でレイマーチングを実行してみました。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">Raymarching in Windows Terminal<br><br>Windows Terminal 1.6 から任意の Pixel Shaders を実行できるようになったので、Windows Terminal の背景でレイマーチングを実行してみた🎉 これは楽しすぎる🤣 <a href="https://t.co/WX2JqUZtuL">pic.twitter.com/WX2JqUZtuL</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1361485111473045505?ref_src=twsrc%5Etfw">February 16, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<!--more-->

2021-02-16のツイート時点では、Windows Terminal 1.6はまだPreview版なので、GitHubのReleasesページから入手する必要がありました。

- https://github.com/microsoft/terminal/releases/tag/v1.6.10412.0

2021-03-07現在では、Windows Terminal 1.6からPreviewが外れてMicrosoft Storeから入手できるようになりました。

- [Windows Terminal を入手 - Microsoft Store ja-JP](https://www.microsoft.com/ja-jp/p/windows-terminal/9n0dx20hk701?activetab=pivot:overviewtab)

Windows TerminalのPixel Shaders機能の詳細については、公式ドキュメントをご覧ください。

- https://github.com/microsoft/terminal/tree/main/samples/PixelShaders

任意のHLSLのシェーダーのファイルを作成して、Windows Terminalのsettings.jsonの `experimental.pixelShaderPath` からHLSLファイルのパスを設定するだけで、気軽に任意のシェーダーを実行できます。素晴らしい！

```json
"profiles":
  {
    "defaults":
    {
      "experimental.pixelShaderPath": "C:\\Users\\gam0022\\Dropbox\\windows-terminal\\terminal\\samples\\PixelShaders\\Raymarching.hlsl"
    },
```

レイマーチング用のシェーダーはUnityで下書きしたものをWindows Terminal用に移植して実装しました。

<blockquote class="twitter-tweet" data-conversation="none"><p lang="ja" dir="ltr">Raymarching in Windows Terminal のシェーダーを公開しました。<br><br>（シェーダー初心者にも優しい）日本語コメントつき！<a href="https://t.co/GPEpIlHOyD">https://t.co/GPEpIlHOyD</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1361495940356476929?ref_src=twsrc%5Etfw">February 16, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

HLSLのエラーが発生した行番号が表示されないので、複雑なシェーダーを書くのはちょっと苦労しました。

基本的にはUnityのShaderLab用のプロパティや `_LightColor0` などのビルドインのシェーダー変数を定数（static const）として宣言する修正だけで移植できました。

Windows Terminal用のPixel Shadersでは、以下のテクスチャのサンプラーや定数が定義されていました。

```c
// The terminal graphics as a texture
// ターミナルの文字などを含んだターミナルのレンダリング結果のサンプラー
Texture2D shaderTexture;
SamplerState samplerState;

// Terminal settings such as the resolution of the texture
cbuffer PixelShaderSettings {
  // The number of seconds since the pixel shader was enabled
  // 秒単位の時間
  float Time;

  // UI Scale
  // UIのスケール
  float Scale;
  
  // Resolution of the shaderTexture
  // ピクセル単位の背景の解像度
  float2 Resolution;
  
  // Background color as rgba
  // 背景の色
  float4 Background;
};
```

`shaderTexture` はターミナルの文字などを含んだターミナルのレンダリング結果のサンプラーになるので、今回は背景に加算合成する形でシェーダーを実装しました（加算合成なので後からレイマーチングを加算しても結果は同じになるため、描画順を気にしなてくて良い）。

# Windows Terminalの背景でHLSLライブコーディング

Windows Terminal 1.6の挙動では、シェーダーを再コンパイルして結果を更新するために以下の手順が必要だったので、ライブコーディングには不向きでした。

- `experimental.pixelShaderPath` で指定したHLSLシェーダーに差分を出してファイル保存
- Windows Terminalの `settings.json` の `experimental.pixelShaderPath` の値に差分を出してファイル保存

最初の動画ではシェーダーの描画結果をリアルタイムで更新するために、Vimで2つのファイルを同時編集することで、リアルタイムにライブコーディングっぽいことをしていましたが、かなり操作が忙しいので非実用的でした。

- Vimの左側ペイン: HLSLのシェーダー
- Vimの右側ペイン: Windows Terminal の settings.json

そこで、HLSLの更新を検知して、Windows Terminalの `settings.json` を書き換えることで、HLSLのホットリロードを実現するスクリプトをnode.jsで実装しました。

これによって、Windows Terminalの背景でHLSLシェーダーライブコーディングを実現できるようになりました！

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">Windows Terminal 上のHLSLシェーダーライブコーディング環境を実現するスクリプトをGitHubに公開しました！<br><br>&gt; HLSLの変更を監視して、settings.json を書き換え<a href="https://t.co/hjB2MqgsSx">https://t.co/hjB2MqgsSx</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1361706800282656769?ref_src=twsrc%5Etfw">February 16, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Windows Terminalの `settings.json` に毎回差分を出すために、HLSLファイルをコピーした一時ファイルを作成して、元のファイルのパスと一時ファイルのパスを交互に切り替えて `experimental.pixelShaderPath` に設定するような実装としました。

# 感想

Windows TerminalというMicrosoft公式のアプリ上でHLSLシェーダーライブコーディング環境を実現できるのは熱いですね！楽しい！！