---
layout: post
title: "BundlerでC拡張を含んだgemを公開する"
date: 2013-10-18 01:22
comments: true
categories: 
- Ruby
- Gem
---

# はじめに

先日、[immutable_list](https://rubygems.org/gems/immutable_list) というgemを公開したのですが、
思っていたよりも簡単に [rubygems.org](https://rubygems.org/gems/immutable_list) に登録することができて感動しました。

gemを作るには、色々な方法があるようですが、最近だとBundler を使う方法が一番シンプルで良さそうです。

RubyGems に gem を登録するためには、gitのリモートリポジトリが必要ですが、ここでは GitHub を利用します。

あと、よく質問されるのですが、RubyGems に登録するために審査は一切ありません。


## Tips: gemの命名方法

本題とはズレますが、gemの命名にはルールがあるので軽く紹介します。

gemname には、小文字のアルファベット、数字、ハイフン、アンダースコア、ドットが使用可能のようです。

ハイフンとアンダースコアは次のように使い分けることが推奨されています。

- \- (ハイフン) : パスの区切り
- _ (アンダースコア) : 単語の区切り

<!--more-->

# 普通のgemを公開する場合

C拡張を含まない、Rubyで実装したライブラリをgemにする場合は、とても簡単です。

[はじめてbundlerでruby gem作ってgithubとrubygemsに上げてみた](http://shoprev.hatenablog.com/entry/2013/08/02/205735) という記事が分かりやすかったので、
Rubyで実装したライブラリをgemにする場合はこちらを参考にすれば良いと思います。

基本的には、次のような流れになります。

1. `$ bundle gem <gemname>` でgemを作るために必要なファイルの雛形の一式が作られるので、細かい部分を編集する。
  - `$ cd <gemname>>`
  - `lib/<gemname>.rb` にライブラリの本体を実装する。
  - `lib/<gemname>/version.rb` でバージョンを指定する。
  - `<gemname>.gemspec` のTODOを埋める。

2. gemのパッケージを作成
  - `$ gem build <gemname>.gemspec`
  - `$ rake install` で動作を念のためにテスト。

3. GitHub に push
  - ファイル一式をGitHubに登録する。(普通のgitのリポジトリを作るのと同じなので詳しい説明は省きます。)

4. RubyGems に push
  - `$ gem push pkg/<gemname>>-x.x.x.gem`
  - これで、世界中の誰からでも `$ gem install <gemname>` で利用可能になる。

5. バージョンアップ
  - `lib/<gemname>/version.rb` を編集。
  - `$ rake release` で RubyGems と GitHub の両方に push してくれる。

6. 削除
  - `$ gem yank <gemname> -v x.x.x` で RubyGems から削除できる。
  - 履歴は残るので、完全に消すのは中の人にコンタクトするしかないよう。


# C拡張を含むgemを公開する場合

C拡張を含むgemを作りたい場合は、ちょっと面倒です。

日本語の記事が見つからなかったので、[Gems with Extensions](http://guides.rubygems.org/gems-with-extensions/)を参考にして頑張りました。

ここでは、`immutable_list` という gem 名を例にとって、C拡張を含むgemを公開するまでを説明します。

## 1. 雛形を作る

``` bash
$ bundle gem immutable_list
      create  immutable_list/Gemfile
      create  immutable_list/Rakefile
      create  immutable_list/LICENSE.txt
      create  immutable_list/README.md
      create  immutable_list/.gitignore
      create  immutable_list/immutable_list.gemspec
      create  immutable_list/lib/immutable_list.rb
      create  immutable_list/lib/immutable_list/version.rb
Initializating git repo in /Users/gam0022/git/gem/t/immutable_list
```


## 2. 雛形を編集

C拡張を自動でコンパイルするようにするために、書き加えないといけないことが多いです。

``` diff Gemfile
 source 'https://rubygems.org'
 
 # Specify your gem's dependencies in immutable_list.gemspec
 gemspec
+gem "rake-compiler"
```

``` diff Rakefile
 require "bundler/gem_tasks"
+require "rake/extensiontask"
+
+Rake::ExtensionTask.new "immutable_list" do |ext|
+  ext.lib_dir = "lib/immutable_list"
+end
```

``` diff immutable_list.gemspec
# coding: utf-8
 lib = File.expand_path('../lib', __FILE__)
 $LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
 require 'immutable_list/version'
 
 Gem::Specification.new do |spec|
   spec.name          = "immutable_list"
   spec.version       = ImmutableList::VERSION
   spec.authors       = ["gam0022"]
   spec.email         = ["gam0022@gmail.com"]
-  spec.description   = %q{TODO: Write a gem description}
-  spec.summary       = %q{TODO: Write a gem summary}
+  spec.description   = %q{Immutable Linked List implemented in C-Extensions}
+  spec.summary       = %q{Immutable Linked List implemented in C-Extensions}
   spec.homepage      = ""
   spec.license       = "MIT"
+  spec.extensions    = %w[ext/immutable_list/extconf.rb]
 
   spec.files         = `git ls-files`.split($/)
   spec.executables   = spec.files.grep(%r{^bin/}) { |f| File.basename(f) }
   spec.test_files    = spec.files.grep(%r{^(test|spec|features)/})
   spec.require_paths = ["lib"]
 
   spec.add_development_dependency "bundler", "~> 1.3"
   spec.add_development_dependency "rake"
 end
```

## ext/

C拡張のライブラリ本体は、`ext/`に置きます。

`ext/` は無いので、新規で作ります。

``` text tree ext/
ext
└── immutable_list
    ├── extconf.rb
    └── immutable_list.c
```

`immutable_list/immutable_list`のようなファイル名の指定がテクニックなので注目してください。
`<gemname>/<gemname>`にすることで、require をするときに名前が衝突することを防いでいます。

``` rb ext/immutable_list/extconf.rb
require "mkmf"
create_makefile("immutable_list/immutable_list")
```

``` c ext/immutable_list/immutable_list.c
#include <stdio.h>
#include <ruby.h>

#define true 1
#define false 0

VALUE cImmutableList;

struct immutable_list {
  VALUE value;
  VALUE next;
};

static void
immutable_list_mark(struct immutable_list *ptr)
{
  rb_gc_mark(ptr->value);
  rb_gc_mark(ptr->next);
}

// 長すぎるので以下略。気になる人は以下を参照
// https://github.com/gam0022/immutable_list/blob/master/ext/immutable_list/immutable_list.c
```


## lib/

通常のgemであれば、`lib/immutable_list.rb` に本体を実装しますが、
今回はC拡張で実装されたもの require するようにします。

``` text tree lib/
lib
├── immutable_list
│   └── version.rb
└── immutable_list.rb
```


``` diff lib/immutable_list.rb
 require "immutable_list/version"
+require "immutable_list/immutable_list"
 
-module ImmutableList
+class ImmutableList
   # Your code goes here...
 end
```

``` diff lib/immutable_list/version.rb
-module ImmutableList
+class ImmutableList
  VERSION = "0.0.1"
end
```


## RubyGems に登録

あとは、通常のgemと同じ要領で、RubyGems に公開するだけです。

- `$ gem build immutable_list.gemspec`
- GitHub に push
- `$ gem push pkg/immutable_list-0.0.1.gem`
