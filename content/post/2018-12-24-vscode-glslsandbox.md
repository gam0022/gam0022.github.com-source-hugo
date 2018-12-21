+++
title = "GLSL Compo参加者は必見！？GLSL Sandbox互換のVSCode拡張「Shader Toy」"
slug = "vscode-glslsandbox"
date = "2018-12-24T00:29:56+09:00"
image = ""
toc = true
math = false
draft = false
tags = [
]

+++

※この記事の主なターゲットはTokyoDemoFestのGLSLCompoの参加者や参加予定の人です。

みなさんはGLSL Sandboxのシェーダーをローカルで編集したりgitで管理したいと思ったことはありませんか？

VSCodeはマイクロソフトが開発しているイケてるテキストエディタです。

VSCodeの拡張「Shader Toy」は[Shadertoy](https://www.shadertoy.com/)と[GLSL Sandbox](http://glslsandbox.com/)の互換性を備えています。

どちらのコードでも修正なしにそのまま動かせる優秀な拡張です！

- [Shader Toy - Visual Studio Marketplace
](https://marketplace.visualstudio.com/items?itemName=stevensona.shader-toy)

# 使い方

GLSLのコードを編集した状態でコマンドパレットから「Shader Toy: GLSL Preview」を開くだけです。

<!--more-->

# GLSL Sandbox互換の理由

ところで、「Shader Toy」という名前なのに、なぜGLSL Sandboxにも対応しているのでしょうか？

元々は Shadertoy互換の拡張だったのですが、次のPRで私がGLSL Sandbox互換を追加しました。

- [GLSLsandbox support by gam0022 · Pull Request #37 · stevensona/shader-toy](https://github.com/stevensona/shader-toy/pull/37)

拡張の名前からして、GLSL Sandbox互換を追加する機能追加が認められるのかけっこう悩んだのですが、爆速でマージしていただけて拍子抜けしました。

# 開発動機

開発動機はTokyo Demo Festのライブコーディングバトルの練習のためでした。
ライブコーディングというのは、その場でコーディングを行うことです。

ライブコーディングバトルの本番はdoxasさんの開発されている[glslfan.com](https://glslfan.com/)というサイト上で行われました。

glslfanはGLSL Sandbox互換のサイトですが、他の人がコードを編集している様子をリアルタイムに見れるという特徴があるのですが、
ライブコーディングの練習をしている様子を一般公開したくなかったので、ローカル上でGLSLのコードを編集できる環境を構築するために、「Shader Toy」を改造しました。

結局、私自身はTokyo Demo FestのPC Demo Compoの作品制作に時間がとられてしまい、
ライブコーディングの練習のために改造版の「Shader Toy」拡張を使う機会があまり無かったのですが、
改造版の拡張のインストール手順をTwitterで公開したところ、
Tokyo Demo FestのGLSL Compoの優勝者と準優勝者のお役に立てたようで嬉しいです。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">法線求める時forでインライン展開押さえるのすご..<br>GLSL Grapherと<a href="https://twitter.com/gam0022?ref_src=twsrc%5Etfw">@gam0022</a>先生の拡張は僕もめっちゃ使いました!</p>&mdash; かねた (@kanetaaaaa) <a href="https://twitter.com/kanetaaaaa/status/1074471599804301312?ref_src=twsrc%5Etfw">2018年12月17日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">ブログ更新しました &gt; <a href="https://twitter.com/hashtag/TokyoFemoFest?src=hash&amp;ref_src=twsrc%5Etfw">#TokyoFemoFest</a> 2018 の GLSL Graphics Compo で2位入賞しました<a href="https://t.co/XyntUxDCGD">https://t.co/XyntUxDCGD</a></p>&mdash; setchi (@setchi) <a href="https://twitter.com/setchi/status/1074469119481663489?ref_src=twsrc%5Etfw">2018年12月17日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

> VSCode 上で GLSL 環境を探していたときに、ちょうど gam0022 先生が GLSL Sandbox 互換の VSCode 拡張を公開していたのでありがたく使わせていただきました！

ちなみに、そのライブコーディングバトルで優勝できました！

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">シェーダーライブコーディングバトルの優勝作品です！<br>ありがとうございました！<a href="https://twitter.com/hashtag/TokyoDemoFest?src=hash&amp;ref_src=twsrc%5Etfw">#TokyoDemoFest</a> <a href="https://twitter.com/hashtag/tdf2018?src=hash&amp;ref_src=twsrc%5Etfw">#tdf2018</a><a href="https://t.co/MJwbIWFOMl">https://t.co/MJwbIWFOMl</a> <a href="https://t.co/LVr2LYvUgi">pic.twitter.com/LVr2LYvUgi</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1068782247711465472?ref_src=twsrc%5Etfw">2018年12月1日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

自分自身では拡張をあまり利用できなかったと言いましたが、結果オーライということにしましょう。

# おまけ: ShadertoyとGLSL Sandboxのマウスの扱いの違い

開発する中でShadertoyとGLSL Sandboxのマウスの扱いの違いにハマったので、後学のためにメモを残します。少しでもみなさまのお役に立てれば幸いです。