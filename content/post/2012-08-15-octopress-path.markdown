---
layout: post
title: "Octopressでパスを指定するときのテクニック"
date: 2012-08-15 09:34
comments: true
categories: 
- Octopress
---

Octopressで画像などを使うとき、例えば、トップページで表示されるときと記事の詳細ページで表示されるときでは、
ディレクトリの階層が同じならないため、アドレスは絶対パスで指定するしかないのですが、そのときに使えるテクニックを紹介します。

URLを`/`から指定すると、Octopress側で絶対パスに補完してくれるようです。

例を挙げると、次のような具合に補完してくれます。

例:
`/images/hoge.png` => `http://gam0022.net/images/hoge.png`

この機能は、`plugins/octopress_filters.rb`の79行目の`expand_urls`というメソッドで定義されているようです。
