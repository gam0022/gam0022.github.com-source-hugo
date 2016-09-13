---
layout: post
title: "RubyでLinkedListを使うためのC拡張を作った"
date: 2013-08-19 21:25
comments: true
categories: 
- Ruby
- Ruby C Extension
---

# 追記

* 10/7 RubyGemsとして公開。クラス名はImmutableListに変更。
  * [RubyGems.org](https://rubygems.org/gems/immutable_list)
  * [README(GitHub)](https://github.com/gam0022/immutable_list/blob/master/README.md)
* 10/22 クラス名が変わったり、この記事では説明不足の部分があったので、記事を書き直しました。
  * [Rubyで関数型プログラミングをするための ImmutableList Gem を公開](/blog/2013/10/22/immutable-list-gem/)

# はじめに

RubyのC拡張として `LinkedList` (連結リスト) を実装しました。

Ruby の `Array` は 配列で実装されているため、長いリストでの先頭への要素を追加(`cons`)や連結(`append`)が非常に遅いのをなんとかしたいと思いました。

用途としては、Rubyで再帰を使って関数型言語風にプログラムを組むことを想定しています。

[ソースコード](https://github.com/gam0022/linkedlist/blob/master/linkedlist.c)はGitHubに置きました。

[gam0022/linkedlist (GitHub)](https://github.com/gam0022/linkedlist)

# 車輪の再発明じゃないの?

`gem search linked_list` で調べてみたところ、次の2つのgemが見つかりました。

* circular_linked_list (0.0.1)
* linked_list (1.0.0)

しかし、どちらも Ruby で実装されていたので、Cの拡張として実装し直す意味はあるのではないかと思います。

# 使用例

OCaml の `List` に影響を受けて実装したので、次のようなメソッドがあります。

* cons
* head
* tail
* rev_append
* rev
* append
* length
* nth

また、Ruby風の名前の文字列や配列への変換、空リストの判定をするメソッドもあります。

* inspect(to_s)
* to_a
* empty?

## 動作確認

以下のような動作をします。

```ruby
require 'linkedlist'

p LinkedList.new # => ()

p l1 = LinkedList.new.cons(1).cons(2).cons(3) # => (3, 2, 1)
p l1.head # => 3
p l1.tail # => (2, 1)

p l2 = LinkedList[1, 2, 3, "a", "b"] #=> (1, 2, 3, "a", "b")

p l1.rev_append(l2) #=> (1, 2, 3, 1, 2, 3, "a", "b")
p l1.rev #=> (1, 2, 3)
p l3 = l1.append(l2) #=> (3, 2, 1, 1, 2, 3, "a", "b")

p l3.length # => 8
p LinkedList[].length #=> 0

p l3.nth(0) #=> 3
p l3[7] #=> "b"
p l3[100] #=> nil
```

## クイックソート

せっかくなので、`LinkedList`を使って関数型言語風にクイックソートを書いてみました。

```ruby qsort_sample.rb
require 'linkedlist'

def divide(a, l, lt, ge)
  if l.empty?
    [lt, ge]
  elsif l.head < a
    divide(a, l.tail, lt.cons(l.head), ge)
  else
    divide(a, l.tail, lt, ge.cons(l.head))
  end
end

def qsort(l)
  if l.empty?
    LinkedList.new
  else 
    lt, ge = divide(l.head, l.tail, LinkedList.new, LinkedList.new)
    qsort(lt) + qsort(ge).cons(l.head)
  end
end

l = LinkedList[3, 5, 8, 1, 4, 7, 10, -3, 2, 100, 43, 10, 50]
p qsort(l) #=> (-3, 1, 2, 3, 4, 5, 7, 8, 10, 10, 43, 50, 100)
```

cons などが、演算子になっていないせいで可読性が少し低いですが、それなりに綺麗にクイックソートが書けます。

# ベンチマーク結果

`Array`と`LinkedList`で、先頭に長さ3のリストを 連結する処理にかかった秒数を、連結した回数ごとにまとめました。

| 連結回数 | Array | LinkedList |
|------:|------:|-----------:|
| 10 | 1.5e-05 | 2.0e-05 |
| 1000 | 0.007251 | 0.00166 |
| 10000 | 0.727542 | 0.015206 |
| 100000 | 102.080825 | 0.414083 |

この測定には、[benchmark.rb](https://github.com/gam0022/linkedlist/blob/master/benchmark.rb) を用いました。

クラス名を変えただけのコードですが、
リストの長さが長くなるほど、`Array`よりも`LinkedList` の方が相対的に高速になります。

まあ、連結リストに圧倒的に有利な操作で測定しているので当然ですが...

ともかく、これで速度を気にせずにappendやconsをバリバリ使うことができます!

# その他

* `struct linkedlist` の定義など見ればわかると思いますが、かなりシンプルな実装になりました。
* [RubyExtensionProgrammingGuide](http://www.loveruby.net/w/RubyExtensionProgrammingGuide.html) がとても参考になりました。
* WBなどはしていないので、[RGenGC](http://www.atdot.net/~ko1/activities/RubyKaigi2013-ko1.pdf) に対応できてるか不安です。
  * そもそも、どの関数も破壊的ではないので、WBが発生するタイミングが無い?
* 余裕が無かったので、セーフレベルやオブジェクトの汚染など、セキュリティのことは全く考えてません。
* `head` や `tail` や `nth` で要素がない場合ですが、すべて`nil`を返すようにして、例外は発生させないことにしました。

# インストール方法

```bash
$ git clone https://github.com/gam0022/linkedlist.git
$ cd linkedlist
# インストール先のrubyで extconf.rb を実行する
$ ruby extconf.rb
$ make
$ make install
```
