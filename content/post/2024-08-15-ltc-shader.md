+++
image = "/images/posts/2024-08-15-ltc-shader/slide-top.jpg"
toc = false
math = false
draft = false
tags = [
    "Unity", "Shader", "CG", "URP", "検証", "ゆるゆるシェーダー交流会"
]
title = "LTC（Linearly Transformed Cosines）によるエリアライトのUnity URP実装の解説のスライド共有"
slug = "ltc-shader"
date = "2024-08-15T10:38:57+09:00"

+++

昨日、8月14日に[「ゆるゆるシェーダー交流会」](https://connpass.com/event/325438/)が開催されました。

私は『LTC（Linearly Transformed Cosines）によるエリアライトのUnity URP実装』というタイトルでライトニングトーク（LT）を行いました。

Eric HeitzさんがSIGGRAPH 2016で発表した、エリアライトをリアルタイムに計算する手法をURP上で実装したので、その解説をしました。

以下に発表資料を共有します。

<div class="google-slide-wrap">
<iframe src="https://docs.google.com/presentation/d/1OAey5wGU7BIKw7YOpILKz-Ymqv-jysgFeWpvJVVdXm0/embed?start=false&loop=false&delayms=3000" frameborder="0" width="1440" height="839" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
</div>

- [スライドの直接リンク](https://docs.google.com/presentation/d/1OAey5wGU7BIKw7YOpILKz-Ymqv-jysgFeWpvJVVdXm0/edit?usp=sharing)

<!--more-->

Twitterのスレッドはこちらです。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">Unity URP上でLTC（Linearly Transformed Cosines）によるエリアライトを実装してみました。<br><br>パストレーシングと同じようなクオリティのエリアライトがリアルタイムで動作して感動しました！発明された方は偉大！ <a href="https://t.co/usMWcc6BTO">pic.twitter.com/usMWcc6BTO</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1812296534874284391?ref_src=twsrc%5Etfw">July 14, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

この手法のコアなアイデアは、複雑なBRDF分布を単純なcos分布に線形変換し、cos分布上で解析的に積分するというものです。

エリアライトに必要なBRDFの積分を巧妙なトリックで処理しており、とても賢い手法で個人的には非常に感動しました。