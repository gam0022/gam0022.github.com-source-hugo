---
layout: post
title: "大五郎bot(@daigoroubot)を動かすためのメモ"
date: 2012-08-20 13:28
comments: true
categories: 
- daigoroubot
- MeCab
- Mac OS X
---

[@daigoroubot](https://twitter.com/daigoroubot)をMac OS Xで動かすまでのメモです。
なんて需要が無さそうな記事なんだ!

## Rubyとgemををインストール

とりあえず、バージョンは次のような感じで。インストール方法は[これ](/blog/2012/07/27/getting-started-with-ruby-on-rails-on-mac/)を参考にしてください。

* ruby 1.9.3p194 
* gem 1.8.24

## required gems

{% codeblock lang:bash %}
gem install oauth json sqlite3 twitter tweetstream unicode_math
{% endcodeblock %}

## MeCabを使えるようにしておく

homebrewを導入しているなら、これでok。

Mac用のメモですが、Ubuntuなら`brew`の代わりに`apt-get`など、環境に合わせた適当なパッケージ管理システムにすれば普通に動くと思います。

{% codeblock lang:bash %}
brew install mecab mecab-ipadic
{% endcodeblock %}

## MeCabのRubyバインディングをする

1. [ここ](http://code.google.com/p/mecab/downloads/list)からbrewで入れたMeCabと同じバージョンのRubyバインディングをダウンロードする。
2. `tar -jxf mecab-ruby-xxx.tar.gz`などで解凍。
3. `README`の指示通りに作業する。

もし次のようなエラーが出たら、`extconf.rb`を編集する必要があるよう。

(参考:[MacPortsで、mecabと、mecab-rubyのインストール](http://d.hatena.ne.jp/kasei_san/20121213/p1))

```bash
dyld: lazy symbol binding failed: Symbol not found: __ZN5MeCab12getLastErrorEv
  Referenced from: /Users/kobayashi/.rvm/rubies/ruby-1.8.7-p174/lib/ruby/site_ruby/1.8/i686-darwin10.7.0/MeCab.bundle
  Expected in: flat namespace


dyld: Symbol not found: __ZN5MeCab12getLastErrorEv
  Referenced from: /Users/kobayashi/.rvm/rubies/ruby-1.8.7-p174/lib/ruby/site_ruby/1.8/i686-darwin10.7.0/MeCab.bundle
  Expected in: flat namespace
```

`extconf.rb` に次のように`$LDFLAGS`を追加します。

```diff extconf.rb
require 'mkmf'

mecab_config = with_config('mecab-config', 'mecab-config')
use_mecab_config = enable_config('mecab-config')

+$LDFLAGS += ' -L' + `#{mecab_config} --libs-only-L`.chomp

`mecab-config --libs-only-l`.chomp.split.each { | lib |
  have_library(lib)
}

$CFLAGS += ' ' + `#{mecab_config} --cflags`.chomp

have_header('mecab.h') && create_makefile('MeCab')
```

<!--

ここが厄介なので、私自身、嵌りました。

1. まず、[ここ](http://code.google.com/p/mecab/downloads/list)からbrewで入れたMeCabと同じバージョンのRubyバインディングをダウンロードする。
2. 1.を解凍して、cd。
3. `extconf.rb`を編集する。
  `$LDFLAGS = '-L/usr/local/lib'`という行を、`$CFLAGS〜`の次の行に加える。
4. {% codeblock lang:bash %}
ruby extconf.rb
make
sudo make install
{% endcodeblock %}

ちなみに、`extconf.eb`を編集せずにバインディングしたときにRubyからmecabを使うと、次のようなエラーになってしまう。

{% codeblock lang:bash %}
dyld: NSLinkModule() error
dyld: Symbol not found: __ZN5MeCab6Tagger6createEiPPc
  Referenced from: /Users/gam0022/.rvm/rubies/ruby-1.9.3-p194/lib/ruby/site_ruby/1.9.1/x86_64-darwin11.4.0/MeCab.bundle
  Expected in: flat namespace

Trace/BPT trap
{% endcodeblock %}

-->

参考:
[MacにMecabとmecab-rubyをインストールして形態素解析。辞書はIPA辞書、NAIST辞書、UniDicの３種：Garbage In Garbage Out](http://g1g0.com/2012/03/1752/)
