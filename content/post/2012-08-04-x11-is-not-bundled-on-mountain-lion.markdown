---
layout: post
title: "Mountain Lionにアップデートしたら、X11が消えた件"
date: 2012-08-04 15:32
comments: true
categories: 
- Mac OS X
- Mountain Lion
- X11
- trouble
---

この前Macを使い始めたばかりでしたが、無料でアップデートできると知って、
Mountain Lionにしてしまいました。

しかし、Mountain Lion にしてから困ったことに、
wineやinkscapeといった、X Window Systemを必要とするアプリケーションがすべて動かなくなってしまいました。

調べてみると、Moutain Lionから標準でX11がインストールされなくなったようです。

X11の代わりに、OS X用の[XQuartz](http://xquartz.macosforge.org/landing/)というXウィンドウシステムがあるので、
これをインストールして再起動すれば、解決します。

X11はバグがあるらしいので、Moutain Lionじゃない人もXQuartzに乗り換えてもいいかもしれませんね。
