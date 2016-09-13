---
layout: post
title: "Rubyで関数型プログラミングをするための ImmutableList gem を公開"
date: 2013-10-22 14:17
comments: true
categories: 
- Ruby
- RubyGems
- Ruby C-Extension
---

# ImmutableList gem とは

Immutable な LinkedList を Ruby で使うためのライブラリです。

C-Extension なので、Rubyで実装したものに比べて動作が高速です。

Ruby の `Array` は 配列で実装されているため、
長いリストでの先頭への要素を追加(`cons`)や連結(`append`)が
とても遅いという問題を解決しようと思って作りました。

用途としては、Rubyで再帰を使って関数型言語風にプログラムを組むことを想定しています。

<iframe src="http://www.slideshare.net/slideshow/embed_code/29144855" width="342" height="291" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC;border-width:1px 1px 0;margin-bottom:5px" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="https://www.slideshare.net/shohosoda9/immutable-list-29144855" title="Rubyで連結リスト使うためのgemを作った(tsukuba.rb版)" target="_blank">Rubyで連結リスト使うためのgemを作った(tsukuba.rb版)</a> </strong> from <strong><a href="http://www.slideshare.net/shohosoda9" target="_blank">Sho Hosoda</a></strong> </div>

## 導入方法

[RubyGems](http://rubygems.org/gems/immutable_list) で公開したので、次のようにターミナルで入力するだけで導入できます。

```bash
$ gem install immutable_list
```

<!--more-->


# 基本的な使い方

基本的には、Ocaml の List のような動作をします。メソッド名も Ocaml を意識しています。

```ruby
require 'immutable_list'

p ImmutableList.new # => ()

p l1 = ImmutableList.new.cons(1).cons(2).cons(3) # => (3, 2, 1)
p l1.head # => 3
p l1.tail # => (2, 1)

p l2 = ImmutableList[1, 2, 3, "a", "b"] #=> (1, 2, 3, "a", "b")

p l1.rev_append(l2) #=> (1, 2, 3, 1, 2, 3, "a", "b")
p l1.rev #=> (1, 2, 3)
p l3 = l1.append(l2) #=> (3, 2, 1, 1, 2, 3, "a", "b")

p l3.length # => 8
p ImmutableList[].length #=> 0

p l3.nth(0) #=> 3
p l3[7] #=> "b"
p l3[100] #=> nil
```


# Rubyで関数型プログラミングを書きたい

まずここで言う、関数型プログラミングというのは、
一般的な言語がループを使って繰り返しを表現するのに対して、
再帰を使って繰り返しを表現することを指します。

例えば、`ImmutableList`を使えば、クイックソートを次のように実装することができます。

再帰を使うことで、プログラムの本質に関係ないループと変数が消えて、
とても読みやすく短くプログラムを書くことができます。(読みやすさには個人差があります。)

```ruby
require 'immutable_list'

def partition(a, l, lt, ge)
  if l.empty?
    [lt, ge]
  elsif l.head < a
    partition(a, l.tail, lt.cons(l.head), ge)
  else
    partition(a, l.tail, lt, ge.cons(l.head))
  end
end

def qsort(l)
  if l.empty?
    ImmutableList.new
  else 
    lt, ge = partition(l.head, l.tail, ImmutableList.new, ImmutableList.new)
    qsort(lt) + qsort(ge).cons(l.head)
  end
end

l = ImmutableList[3, 5, 8, 1, 4, 7, 10, -3, 2, 100, 43, 10, 50]
p qsort(l) #=> (-3, 1, 2, 3, 4, 5, 7, 8, 10, 10, 43, 50, 100)
```

<!--## 補足

なぜ、関数型プログラミングするためには Immutable なリストが必要なのかわからない人に補足です。

もし、リストに破壊的な操作を許してしまうと、再帰の過程で
-->


# 動作速度について

C-Extension なので、動作が高速だと言いますが、どのくらい速いのか気になる人もいるかと思います。

`Array`と`ImmutableList`で、先頭に長さ3のリストを 連結する処理にかかった秒数を、
連結した回数ごとにまとめました。

| 連結回数 | Array | LinkedList |
|------:|------:|-----------:|
| 10 | 1.5e-05 | 2.0e-05 |
| 1000 | 0.007251 | 0.00166 |
| 10000 | 0.727542 | 0.015206 |
| 100000 | 102.080825 | 0.414083 |

この測定には、[benchmark.rb](https://github.com/gam0022/linkedlist/blob/master/benchmark.rb) を用いました。

リストの長さが長くなるほど、`Array`よりも`LinkedList` の方が相対的に高速になります。


# その他

* GitHub
  * [https://github.com/gam0022/immutable_list](https://github.com/gam0022/immutable_list)
* [RubyExtensionProgrammingGuide](http://www.loveruby.net/w/RubyExtensionProgrammingGuide.html) がとても参考になりました。
* WBなどはしていないので、[RGenGC](http://www.atdot.net/~ko1/activities/RubyKaigi2013-ko1.pdf) に対応できてるか不安です。
  * そもそも、どの関数も破壊的ではないので、WBが発生するタイミングが無い?
* セーフレベルやオブジェクトの汚染など、セキュリティのことは全く考えてません。
* `head` や `tail` や `nth` で要素がない場合ですが、すべて`nil`を返すようにして、例外は発生させないことにしました。
  * 将来的には例外を発生させるように仕様を変更するかもしれません。


# これまでのあらすじ

RubyのC-Extentionとして、Immutable な LinkedList を作り、

* [RubyでLinkedListを使うためのC拡張を作った](/blog/2013/08/19/ruby-linkedlist/)

RubyGems で C-Extention を含んだGemを作る方法を紹介しました。

* [BundlerでC拡張を含んだgemを公開する](/blog/2013/10/18/gems-with-extensions/)

1つ目の記事と内容がほとんど同じですが、クラス名やインストール方法が変わったので、記事を書き直しました。
