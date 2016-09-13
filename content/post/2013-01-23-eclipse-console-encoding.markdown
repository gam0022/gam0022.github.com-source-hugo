---
layout: post
title: "Eclipseのコンソール(Console)の出力が文字化けする"
date: 2013-01-23 10:58
comments: true
categories: 
- Java
- Eclipse
- Mac OS X
---

最近、Eclipseを使っているのですが、文字エンコーディングを`EUC-JP`から`UTF-8`に変更したところ、コンソールへの標準出力は正常に行われるのに、標準入力が文字化けするようになってしまいました。

ぐぐったところ、`eclipse.ini`に`-Dfile.encoding=UTF-8`という行を追加すれば解消するようでした。

Mac OS Xの場合、`eclipse.ini`は`/Applications/eclipse/Eclipse.app/Contents/MacOS/eclipse.ini`にあります。

コマンドライン引数が文字化けする場合も、同様に対処できるようです。

[Macのeclipseでコマンドライン引数が文字化け](http://starzero.hatenablog.com/entry/20100902/1283438762)
