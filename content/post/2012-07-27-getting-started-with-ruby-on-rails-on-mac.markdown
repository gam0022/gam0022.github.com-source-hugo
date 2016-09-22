---
layout: post
title: "MacでRuby on Railsの開発環境を作るまで"
slug: getting-started-with-ruby-on-rails-on-mac
date: 2012-07-27T06:34:00+09:00
comments: true
tags:
- Mac OS X
- Ruby on Rails
- rvm
- gem
- gcc
- xcode
- llvm-gcc
---

## MacでRuby on Railsの開発環境を作るまで

先日、1世代前のMac Book Air 13インチモデルを入手しました。

設定を弄りまくっている真っ最中ですが、
まずはMacでRuby on Railsの開発環境を作るまでをまとめます。

今回の記事を一言でまとめると、「RAILSINSTALLERは神」です。

おおまかな手順を説明すると、次のような感じです。

せっかくなので、正解と失敗の２通りの方法を紹介します。

### 失敗

Xcode4.4経由でgccを入れると、LLVMベースのgccが入ってしまい、rvmでコケます。

1. XcodeをAppStoreからインストールする。
2. Xcode-> Preferences-> Downloads から、Command Line Tools をインストールする。
3. (ここでなんとなくhomebrewをインストールする。)
4. rvmを公式ページのように`$ curl -L https://get.rvm.io | bash -s stable --ruby`とかでインストールする。
5. rvmのインストールは完了するが、rubyのコンパイルに失敗する。
6. `$ rvm requirements`をしたら、Xcodeを4.1にダウングレードするか、Xcodeをアンインストールして`osx-gcc-installer`をインストールしろと言われる。
7. Xcodeを入れなおすのも消すのもめんどくさい
8. ＼(&#94;o&#94;)／ｵﾜﾀ

### 正解

最初からRAILSINSTALLERを使っていれば、これだけで終了しました。Xcode4.4と共存もできます。

1. RAILSINSTALLER でrvmをインストールする。
2. rvmでrubyをインストールする。
3. rvmで適当にgemsetを作って使う。
4. 3.で作ったgemsetに、gemでrailsを入れる。


## 正解例を詳しく

### RAILSINSTALLER でrvmをインストールする

リンクから[RailsInstaller](http://railsinstaller.org/#osx)をインストールします。

GUIでとっても簡単にインストールできます。ゆとり仕様です。

あまりちゃんと確認しませんでしたが、この段階で最新のRubyとRailsが入った環境になります。

最新でないRubyやRailsが欲しいときは、次のような感じで作業すればいいと思います。

### rvmでrubyをインストールする

Ruby1.9.2が欲しければ、`$ rvm install 1.9.2`をします。

なんで1.9.2にしたか言うと、Octopressを使いたいからです。ご了承ください。

#### rvmの超基本的な使い方

`rvm list`でインストールしたrubyの一覧を表示します。

```bash
$ rvm list

rvm rubies

ruby-1.9.2-p320 [ x86_64 ]
=* ruby-1.9.3-p194 [ x86_64 ]

# => - current
# =* - current && default
#  * - default
```

`rvm use [version]`で指定したバージョンのRubyを使います。

```bash
$ rvm use 1.9.2
Using /Users/gam0022/.rvm/gems/ruby-1.9.2-p320
```

### rvmで適当にgemsetを作って使う

ここでは、rails3というgemsetを作って使います。

```bash
rvm gemset create rails3
rvm gemset use rails3 --default
```

### 作ったgemsetにgemでrailsをインストールする

`$ gem install rails`で最新のrails3がインストールできます。

また、`$ gem install rails -v 3.2.3`のように、バージョンも指定できます。

以上で、MacでRuby on Railsの開発環境ができました。めでたしめでたし。

`-v`オプションでバージョンを確認できます。

```bash
$ ruby -v
ruby 1.9.2p320 (2012-04-20 revision 35421) [x86_64-darwin11.4.0]
$ rails -v
Rails 3.2.6
```
