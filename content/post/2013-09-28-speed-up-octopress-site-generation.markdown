---
layout: post
title: "Octopressのpreviewを高速化する"
date: 2013-09-28 16:04
comments: true
categories: 
- Octopress
---

# Octopressの記事の生成が遅い

Octopressを使ってから一年以上が経ちました。

記事の数に比例して、`rake generate` がアホみたいに遅くなって、耐えられないレベルになってきました。

今日は、`rake isolate` と `rake integrate` を使うことでOctopressの記事の生成を高速化するテクニックを紹介します。

<!--more-->

`rake isolate` と `rake integrate` については、次の記事に詳しく紹介されています。

* [Tips for Speeding Up Octopress Site Generation](http://blog.pixelingene.com/2011/09/tips-for-speeding-up-octopress-site-generation/)


# rake isolate と rake integrate について簡単に説明

さっき紹介したリンクは英語なので、日本語で`rake isolate` と `rake integrate`をざっくり説明します。

rake isolate[filename]
: filenameを除いた、`source/_posts/`にある記事のファイルを、`source/_stash` に退避します。
: 記事を退避することで、`rake generate`を高速化します。

rake integrate
: rake isolate で、`source/_stash`に退避したファイルを、`source/_posts/` に戻します。


# 実際の使い方

普通、記事を書くときには、`rake preview`で出力の内容を確認しつつ、記事の編集を行うと思います。

ある記事をプレビューしたいとき、何もしないとOctopressは全ての記事に対して`generate`をしてしまうので、
どうしてもプレビューの反映に時間がかかってしまい、ストレスが溜まってしまいます。

ある記事を編集するときには、次のような流れで行うと、ストレスが減るかもしれません。

1. `rake new_post[title]` で記事を生成。
2. `rake isolate[2013-09-28-title.markdown]` で編集する以外の記事を退避。
3. `rake preview` でプレビューしつつ、記事を気が済むまで編集。
4. `rake integrate` で退避させた記事を戻す。
5. `rake generate` で全ての記事を再生成。これだけは時間がかかる
6. `rake deploy` でアップロード。


# 注意点

* 退避させるのは `source/_posts/`のファイルだけなので、
  Octopress を CMS 的に運用している人だと、あまり恩恵が受けられません。
  逆に、ブログとして運用して記事を大量生成している人は高速化が期待できます。
* 上の流れで分かると思いますが、人間が行う作業としては複雑で面倒なので、このくらい自動化して欲しいですね。
