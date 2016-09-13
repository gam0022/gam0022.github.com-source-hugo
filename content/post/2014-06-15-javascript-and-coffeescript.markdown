---
layout: post
title: "JavaScriptとCoffeeScriptのメモ"
date: 2014-06-15 06:50
comments: true
categories: 
- JavaScript
- CoffeeScript
- Rails
---

# はじめに

卒研で [three.js](http://threejs.org/) という3DCGのライブラリを使って何か開発することしたので、JavaScript について勉強しました。

また、CoffeeScript という、コンパイルするとJavaScriptのコードに変換される言語についても使ってみることにしたので、
これについても勉強しました。

忘れてしまうと勿体無く思うので、備忘録です。

この記事では、

1. JavaScriptを勉強する上で重要だと思われる概念
2. CoffeScript の学び方
3. Rails で CoffeeScript を使う時のメモ

を紹介します。

<!--more-->


# JavaScript について

一般的なオブジェクト指向を使いこなせる人が本格的に JavaScript で開発する前に、次のルールについては抑えておきたいと思いました。
クロージャーは別としても、どれも他の言語にはない、特異なルールとなっています。

1. 変数のスコープとクロージャ
2. プロトタイプチェーン(プロトタイプ・ベースのオブジェクト指向)
3. thisキーワードの指す4種類のパターン


## 変数のスコープとクロージャについて

JavaScriptのローカル変数のスコープは関数ごとにしかありません。
一般的な言語ではブロックごとにスコープを持つので混乱しやすいと思いました。

また、スコープチェーンという仕組みによって、関数をネストすると、中の関数から、外の関数のローカル変数を参照できます。

そして、関数を返す関数(クロージャ)を作ると、内側の関数(クロージャー)から参照された外の関数のローカル変数は、
「クロージャの呼び出し元のスコープからは参照できない」かつ「クロージャを抜けても値を保持し続ける」という性質があります。

この説明だけだと理解不能だと思うので、コード例などを踏まえながら、
以下の記事を読んでおくと理解できると思います。

* [JavaScriptでクロージャ入門](http://qiita.com/takeharu/items/4975031faf6f7baf077a)
* [第3回　変数の宣言とスコープ](http://www.atmarkit.co.jp/ait/articles/0708/21/news116.html)
* [JavaScript のスコープチェーンとクロージャを理解する](http://tacamy.hatenablog.com/entry/2012/12/31/005951)


## プロトタイプチェーン(プロトタイプ・ベースのオブジェクト指向)について

JavaScriptでは関数オブジェクトにクラスとしての役割を与えているのですが、
prototypeプロパティを用いて、複数のインスタンスで同じメソッドを参照したり、
別のクラスを継承することを実現することができます。

また、別の視点から見ると、全てのインスタンスはハッシュオブジェクトです。

インスタンスのメンバーはハッシュのキーのことであり、
メソッドは、prototype プロパティによって複数のハッシュ(インスタンス)から参照できる関数オブジェクトでしかありません。

プロトタイプチェーンについては、次の記事が分かりやすかったので、読んでおくと良いと思います。

[第4回　JavaScriptでオブジェクト指向プログラミング](http://www.atmarkit.co.jp/ait/articles/0709/25/news148.html)


## thisキーワードの指す4種類のパターンについて

一般的な言語では、this は自身のインスタンスを参照するキーワードで変化することありませんが、
JavaScriptのthisはメソッドの呼び出しのパターンによって変化します。

このthisキーワードの指す4種類のパターンについては、次の記事が分かりやすかったので、読んでおくといいと思います。

[JavaScriptの「this」は「4種類」？？](http://qiita.com/takeharu/items/9935ce476a17d6258e27)


# CoffeScript の学び方

基本的には[公式ページ](http://coffeescript.org/)に例がたくさんあるので、それを読んだほうが良い場合が多いです。

また、サンプルコードは[load]ボタンで実際に実行したり編集することができるので、いっそう理解が深まると思います。

翻訳された、[CoffeeScript 言語リファレンス](http://memo.sappari.org/coffeescript/coffeescript-langref)も内容が充実していて参考になったのですが、
1.0.1のものらしくて、最新版の1.7.1からけっこう遅れており、私の気がついた範囲で、1つだけ間違っている箇所があったので、
次の章で間違いを指摘しておきます。

慣れるまでは、出力される JavaScript のコードを確認しながら開発した方が良さそうな認識です。
(CoffeeScriptで開発しても、デバッグは JavaScript のコードを読むことになります。)

また、既存の JavaScriptのコードを手っ取り早く CoffeeScript に移植したいと思った時には、
[Js2coffee](http://js2coffee.org/)という JavaScript から CoffeeScript に逆変換してくれるサイトが役立ちます。

## CoffeeScript のクラスについて

[CoffeeScript 言語リファレンス](http://memo.sappari.org/coffeescript/coffeescript-langref)の「クラス, 継承, super」の章に、次のコードが紹介されています。


```ruby 間違ったインスタンス変数の定義
class Hoge
  someInstanceProp: "hoge"       # インスタンス変数
  someInstanceMethod: ->         # インスタンスメソッド
    @callAnotherInstanceMethod() # インスタンスメソッドを呼ぶ
    alert @someInstanceProp      # ==> "hoge"

  @someClassProp: "hogehoge"     # クラス変数
  @someClassMethod: ->           # クラスメソッド
    @callAnotherClassMethod()    # 同一クラスのクラスメソッドを呼ぶ
    alert @someClassProp         # ==> "hogehoge"
```

しかし、この someInstanceProp はprototypeに保存されるので、インスタンス変数としての使い方は間違いだと思います。

例えば、次のように `someInstanceProp` に破壊的な操作をすると、他のインスタンスの `someInstanceProp` まで影響を与えてしまいます。

```ruby 他のクラスのsomeInstancePropまで影響がでる
class Hoge
  someInstanceProp: [1,2,3]      # インスタンス変数
  someInstanceMethod: ->         # インスタンスメソッド
    @callAnotherInstanceMethod() # インスタンスメソッドを呼ぶ
    alert @someInstanceProp      # ==> "hoge"

  @someClassProp: "hogehoge"     # クラス変数
  @someClassMethod: ->           # クラスメソッド
    @callAnotherClassMethod()    # 同一クラスのクラスメソッドを呼ぶ
    alert @someClassProp         # ==> "hogehoge"

h1 = new Hoge()
alert h1.someInstanceProp # => [1,2,3]
h1.someInstanceProp.reverse()
alert h1.someInstanceProp # => [3,2,1]

h2 = new Hoge()
alert h2.someInstanceProp # => [3,2,1] !他のクラスでの変更の影響を受けている
```

[coffeescript.org で動作確認する](http://coffeescript.org/#try:class%20Hoge%0A%20%20someInstanceProp%3A%20%5B1%2C2%2C3%5D%20%20%20%20%20%20%23%20%E3%82%A4%E3%83%B3%E3%82%B9%E3%82%BF%E3%83%B3%E3%82%B9%E5%A4%89%E6%95%B0%0A%20%20someInstanceMethod%3A%20-%3E%20%20%20%20%20%20%20%20%20%23%20%E3%82%A4%E3%83%B3%E3%82%B9%E3%82%BF%E3%83%B3%E3%82%B9%E3%83%A1%E3%82%BD%E3%83%83%E3%83%89%0A%20%20%20%20%40callAnotherInstanceMethod()%20%23%20%E3%82%A4%E3%83%B3%E3%82%B9%E3%82%BF%E3%83%B3%E3%82%B9%E3%83%A1%E3%82%BD%E3%83%83%E3%83%89%E3%82%92%E5%91%BC%E3%81%B6%0A%20%20%20%20alert%20%40someInstanceProp%20%20%20%20%20%20%23%20%3D%3D%3E%20%22hoge%22%0A%0A%20%20%40someClassProp%3A%20%22hogehoge%22%20%20%20%20%20%23%20%E3%82%AF%E3%83%A9%E3%82%B9%E5%A4%89%E6%95%B0%0A%20%20%40someClassMethod%3A%20-%3E%20%20%20%20%20%20%20%20%20%20%20%23%20%E3%82%AF%E3%83%A9%E3%82%B9%E3%83%A1%E3%82%BD%E3%83%83%E3%83%89%0A%20%20%20%20%40callAnotherClassMethod()%20%20%20%20%23%20%E5%90%8C%E4%B8%80%E3%82%AF%E3%83%A9%E3%82%B9%E3%81%AE%E3%82%AF%E3%83%A9%E3%82%B9%E3%83%A1%E3%82%BD%E3%83%83%E3%83%89%E3%82%92%E5%91%BC%E3%81%B6%0A%20%20%20%20alert%20%40someClassProp%20%20%20%20%20%20%20%20%20%23%20%3D%3D%3E%20%22hogehoge%22%0A%0Ah1%20%3D%20new%20Hoge()%0Aalert%20h1.someInstanceProp%20%23%20%3D%3E%20%5B1%2C2%2C3%5D%0Ah1.someInstanceProp.reverse()%0Aalert%20h1.someInstanceProp%20%23%20%3D%3E%20%5B3%2C2%2C1%5D%0A%0Ah2%20%3D%20new%20Hoge()%0Aalert%20h2.someInstanceProp%20%23%20%3D%3E%20%5B1%2C2%2C3%5D)

### 正しいsomeInstancePropの定義

正しい `someInstanceProp` の定義はこうです。

```ruby 正しいインスタンス変数の定義
class Hoge
  constructor: () ->
    @someInstanceProp = [1,2,3]  # インスタンス変数

  someInstanceMethod: ->         # インスタンスメソッド
    @callAnotherInstanceMethod() # インスタンスメソッドを呼ぶ
    alert @someInstanceProp      # ==> "hoge"

  @someClassProp: "hogehoge"     # クラス変数
  @someClassMethod: ->           # クラスメソッド
    @callAnotherClassMethod()    # 同一クラスのクラスメソッドを呼ぶ
    alert @someClassProp         # ==> "hogehoge"

h1 = new Hoge()
alert h1.someInstanceProp # => [1,2,3]
h1.someInstanceProp.reverse()
alert h1.someInstanceProp # => [3,2,1]

h2 = new Hoge()
alert h2.someInstanceProp # => [1,2,3]
```

[coffeescript.org で動作確認する](http://coffeescript.org/#try:class%20Hoge%0A%20%20constructor%3A%20()%20-%3E%0A%20%20%20%20%40someInstanceProp%20%3D%20%5B1%2C2%2C3%5D%20%20%23%20%E3%82%A4%E3%83%B3%E3%82%B9%E3%82%BF%E3%83%B3%E3%82%B9%E5%A4%89%E6%95%B0%0A%0A%20%20someInstanceMethod%3A%20-%3E%20%20%20%20%20%20%20%20%20%23%20%E3%82%A4%E3%83%B3%E3%82%B9%E3%82%BF%E3%83%B3%E3%82%B9%E3%83%A1%E3%82%BD%E3%83%83%E3%83%89%0A%20%20%20%20%40callAnotherInstanceMethod()%20%23%20%E3%82%A4%E3%83%B3%E3%82%B9%E3%82%BF%E3%83%B3%E3%82%B9%E3%83%A1%E3%82%BD%E3%83%83%E3%83%89%E3%82%92%E5%91%BC%E3%81%B6%0A%20%20%20%20alert%20%40someInstanceProp%20%20%20%20%20%20%23%20%3D%3D%3E%20%22hoge%22%0A%0A%20%20%40someClassProp%3A%20%22hogehoge%22%20%20%20%20%20%23%20%E3%82%AF%E3%83%A9%E3%82%B9%E5%A4%89%E6%95%B0%0A%20%20%40someClassMethod%3A%20-%3E%20%20%20%20%20%20%20%20%20%20%20%23%20%E3%82%AF%E3%83%A9%E3%82%B9%E3%83%A1%E3%82%BD%E3%83%83%E3%83%89%0A%20%20%20%20%40callAnotherClassMethod()%20%20%20%20%23%20%E5%90%8C%E4%B8%80%E3%82%AF%E3%83%A9%E3%82%B9%E3%81%AE%E3%82%AF%E3%83%A9%E3%82%B9%E3%83%A1%E3%82%BD%E3%83%83%E3%83%89%E3%82%92%E5%91%BC%E3%81%B6%0A%20%20%20%20alert%20%40someClassProp%20%20%20%20%20%20%20%20%20%23%20%3D%3D%3E%20%22hogehoge%22%0A%0Ah1%20%3D%20new%20Hoge()%0Aalert%20h1.someInstanceProp%20%23%20%3D%3E%20%5B1%2C2%2C3%5D%0Ah1.someInstanceProp.reverse()%0Aalert%20h1.someInstanceProp%20%23%20%3D%3E%20%5B3%2C2%2C1%5D%0A%0Ah2%20%3D%20new%20Hoge()%0Aalert%20h2.someInstanceProp%20%23%20%3D%3E%20%5B3%2C2%2C1%5D)

補足すると、classのトップレベルでの`@var`と、関数内での`@var`は意味が違います。

前者は`ClassName.var`となりますが、後者は`this.var`となります。

インスタンス変数は、後者の関数内での`@var`で定義すると良さそうです。


#  Rails で CoffeeScript を使う時のメモ

Rails を 使うと、Asset Pipeline で CoffeeScript の自動コンパイル環境ができて楽なのですが、
Railsのデフォルトの設定だと、出力される JavaScript が無名関数`(function(){ }).call(this)`の中に隠されてしまうので、
class を作っても外部から参照できなくなってしまいます。

そういう場合は、`bare`オプションを使うと良いです。

`config/environment.rb` の中に `Tilt::CoffeeScriptTemplate.default_bare = true`という行を加えると、
無名関数に囲まれなくなります。
