+++
title = "GLSL Compoに役立つ！GLSL Sandbox互換のVSCode拡張『Shader Toy』の紹介"
slug = "vscode-glslsandbox"
date = "2018-12-24T23:59:59+09:00"
image = "/images/posts/2018-12-24-vscode-glslsandbox/traveler2-win.jpg"
toc = true
math = false
draft = false
tags = ["event", "CG", "レイマーチング", "TokyoDemoFest","GLSL", "VSCode"]

+++

これは[WebGL Advent Calendar 2018](https://qiita.com/advent-calendar/2018/webgl)の24日目の記事です。

---

みなさんはGLSL Sandboxのシェーダーをローカルで編集したりgitで管理したいと思ったことはありませんか？

VSCodeの拡張機能の『Shader Toy』をインストールすれば簡単に実現できます。

- [Shader Toy - Visual Studio Marketplace
](https://marketplace.visualstudio.com/items?itemName=stevensona.shader-toy)

本拡張は[Shadertoy](https://www.shadertoy.com/)と[GLSL Sandbox](http://glslsandbox.com/)の互換性を備えており、
どちらのコードも修正なしにそのまま動作できます！

WindowsとMacの両方に対応しています。

次の画像は[Traveler2](https://nanka.hateblo.jp/entry/2018/12/13/080322) by [kaneta](https://twitter.com/kanetaaaaa)（[Tokyo Demo Fest 2018](http://tokyodemofest.jp/2018/) GLSL Compo優勝作品）をVSCode上で動作させた様子です。

[![traveler2](/images/posts/2018-12-24-vscode-glslsandbox/traveler2-win.jpg)](/images/posts/2018-12-24-vscode-glslsandbox/traveler2-win.png)

# 導入方法と使い方

導入方法と使い方は簡単です。

## 導入方法

![install](/images/posts/2018-12-24-vscode-glslsandbox/install.png)

1. 拡張機能のウィンドウを開く
2. 「shadertoy」で検索
3. インストールボタンを押す

## 使い方

GLSLのコードを編集した状態でコマンドパレットから「Shader Toy: GLSL Preview」を開くだけです。

GLSLのコードを認識しないときは、「Shader Toy: GLSL Preview」を閉じてから再実行すると認識できる場合があります。

<!--more-->

---

※以降の内容はポエム・個人的なメモです。あまり有益な情報はありませんのでご注意ください。

# GLSL Sandbox互換の理由

ところで、『Shader Toy』という名前なのに、なぜGLSL Sandboxにも対応しているのでしょうか？

元々は Shadertoy互換の拡張だったのですが、次のPull Requestで私がGLSL Sandbox互換を追加しました💪

- [GLSLsandbox support by gam0022 · Pull Request #37 · stevensona/shader-toy](https://github.com/stevensona/shader-toy/pull/37)

拡張の名前から考えて、GLSL Sandbox互換の機能追加が受け入れられるか心配でしたが、爆速でマージしていただけました！
stevensonaさんありがとうございます🙏

# 開発動機

Tokyo Demo Fest 2018のライブコーディングバトルの練習のために、
ローカル上で他人に見られないようにglslfanのコードを書きたいというのが開発の動機でした。

ライブコーディングというのは、その場でコーディングを行うということです。
今回のライブコーディングバトルでは、4人の競技者が40分の制限時間内で、glslfan上でGLSLのシェーダーによる作品をつくりあげました。

[glslfan.com](https://glslfan.com/)はdoxasさんが開発されているGLSL Sandbox互換のライブコーディングをリアルタイム配信するサイトです。
他人のシェーダコーディングをある程度リアルタイムに覗き見できることを特徴としています。
リアルタイムに配信する機能は素晴らしいのですが、ライブコーディングの練習をしている様子を一般公開したくなかったので、
ローカル上でGLSLのコードを編集できる環境を構築するために、「Shader Toy」拡張を改造しようと思いました。

# GLSL Compo優勝者と準優勝者のお役に立てた

本家にPull Requestを送る前に[改造版の拡張のインストール手順](https://gist.github.com/gam0022/910bef95310f52995477dcb7bcc0467a)をTwitterで公開していました。

その結果、GLSL Compoの1位と2位の方々に利用していただき、お役に立てたようで嬉しいです😆

GLSL Compo1位のkanetaさんのツイート

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">法線求める時forでインライン展開押さえるのすご..<br>GLSL Grapherと<a href="https://twitter.com/gam0022?ref_src=twsrc%5Etfw">@gam0022</a>先生の拡張は僕もめっちゃ使いました!</p>&mdash; かねた (@kanetaaaaa) <a href="https://twitter.com/kanetaaaaa/status/1074471599804301312?ref_src=twsrc%5Etfw">2018年12月17日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

GLSL Compo2位のsetchiさんのツイート

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">ブログ更新しました &gt; <a href="https://twitter.com/hashtag/TokyoFemoFest?src=hash&amp;ref_src=twsrc%5Etfw">#TokyoFemoFest</a> 2018 の GLSL Graphics Compo で2位入賞しました<a href="https://t.co/XyntUxDCGD">https://t.co/XyntUxDCGD</a></p>&mdash; setchi (@setchi) <a href="https://twitter.com/setchi/status/1074469119481663489?ref_src=twsrc%5Etfw">2018年12月17日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

> VSCode 上で GLSL 環境を探していたときに、ちょうど gam0022 先生が GLSL Sandbox 互換の VSCode 拡張を公開していたのでありがたく使わせていただきました！

# ライブコーディングバトルで優勝できた

~~本拡張をつかった練習の成果によって、~~ ライブコーディングバトルで優勝しました😉

こんな感じの作品をGLSLのシェーダーだけで40分でつくりました！

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">シェーダーライブコーディングバトルの優勝作品です！<br>ありがとうございました！<a href="https://twitter.com/hashtag/TokyoDemoFest?src=hash&amp;ref_src=twsrc%5Etfw">#TokyoDemoFest</a> <a href="https://twitter.com/hashtag/tdf2018?src=hash&amp;ref_src=twsrc%5Etfw">#tdf2018</a><a href="https://t.co/MJwbIWFOMl">https://t.co/MJwbIWFOMl</a> <a href="https://t.co/LVr2LYvUgi">pic.twitter.com/LVr2LYvUgi</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1068782247711465472?ref_src=twsrc%5Etfw">2018年12月1日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

（本当はを大会前日まで[PC Demo Compoの作品制作をしていたので](https://gam0022.net/blog/2018/12/12/tdf2018/)、ライブコーディングの練習はほとんどできませんでした😇）

競技中に私の画面が真っ白になってしまい、
実況者に「仕込んでますよ」「隠してますよ」「いやらしいですね」
と解説されていたのですが、本当は原因不明のバグで苦しんでいて頭も真っ白でした😨 
終盤にバグの原因を突き止めてなんとか逆転優勝できました。

IGN JAPAN様にライブコーディングバトルを含めたTDFの1日目の様子をご紹介いただきました。興味がある方は是非ご覧ください。

- [eスポーツもゲーム開発もゲームエンジンも生み出したデモシーン！日本で唯一のデモシーンイベント「Tokyo Demo Fest 2018」レポ](https://jp.ign.com/event/31357/news/etokyo-demo-fest-2018)

# ShadertoyとGLSL Sandboxのマウスの違い

開発する中でShadertoyとGLSL Sandboxのマウスの扱いの違いに苦しめられたので、後学のためにメモを残します。

少しでもみなさまのお役に立てれば幸いです。

本拡張では以下のマウスの扱いの違いを考慮して実装しました。

| | Shadertoy | GLSL Sandbox |
|:--|:--|:--|
| uniform定義 | uniform vec4 iMouse; | uniform vec2 mouse; |
| 解説（日本語） | ピクセル座標系のマウス座標。<br>xy: 現在のマウス座標 (左クリック時に更新)<br>zw: マウスのクリック状態 | 0〜1に正規化したマウス座標。<br>xy: 現在のマウス座標（毎フレーム更新） |
| Explanation（English） | mouse pixel coords. <br>xy: current (if MLB down), <br>zw: click | mouse normalized coords. <br>xy: current |
| xyの値域 | 0〜解像度 | 0〜1 |