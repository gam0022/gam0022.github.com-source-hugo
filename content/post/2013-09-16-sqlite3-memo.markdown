---
layout: post
title: "SQLite3でハマった点まとめ"
date: 2013-09-16 14:05
comments: true
categories: 
- Ruby
- SQLite3
---

[Twitter名刺ジェネレータ](http://gam0022.net/app/tmg/)を作るにあたって、
ActiveRecord と SQLite3 を使ったので、勉強になったことを適当にメモします。

関連記事

* [Canvasでハマった点まとめ](/blog/2013/09/16/canvas-memo/)


# ActiveRecord は initialize が遅すぎて CGI には使えない

ActiveRecord をCGIで単体で使おうとしたのですが、ActiveRecord の初期化に数秒かかってしまい、
レスポンスが遅すぎて使い物になりませんでした。

結局、[ActiveRecord の部分を生のSQLite3で再実装](https://github.com/gam0022/twitter-meishi-generator/blob/master/posts.rb)しました。

Rails のようにサーバが起動したらずっと同じプロセスで動作するようなものであれは、初期化が遅くても問題にはならないのですが、
CGI のように、appache が毎回プロセスを起動するようなものだと、ActiveRecord を使うのは諦めたほうがいいようです。

ActiveRecord の悪口になってしまいましたが、ActiveRecord そのものは本当に便利でした。

テーブルの作成のために ActiveRecord を使うのはいいかもしれないと思いました。


# SQLite3 を CGI で使うときはパーミッション注意

SQLite3(というか、ActiveRecordの問題なのだろうか。要検証。) を CGI から使うときは、パーミッションに注意しないと、ハマります。

以下のような例外が起きることが有りました。

* `SQLite3::CantOpenException: unable to open database file`
* `SQLite3::ReadOnlyException: attempt to write a readonly database`

上のような例外が発生した場合、次のことを確認して下さい。

* データベースファイルのオーナーが appache のユーザになっているか？
  * appache のユーザとグループが `www-data` で、データベースのファイル名が `db/db.sqlite3` なら、以下のように変更する。
  * `chown www-data.www-data db/db.sqlite3`
* データベースファイルを置くディレクトリのパーミッションが 777 になっているか?
  * 例えば、データベースのファイル名が `db/db.sqlite3` なら、ディレクトリ`db`のパーミッションは 777 である必要があるようです。
    [参考](http://d.hatena.ne.jp/yun_kichi/20100113/1263362175)


# SQLite3で、Time を渡す時には文字列にしないとダメ

Ruby で `sqlite3 gem` を使ってtableにプレースホルダを使って`insert` した時、
`can't prepare Time`とかいうエラーが発生するときは、値を文字列に変換してやると解消するかもしれません。

``` ruby Timeクラスを直接渡すと、can't prepare Time とか言われる例
h = {:time => Time.now, :data = "なんとかかんとか"}
db.execute("insert into table(time, data) values (:time, :data)", h)
```

次のように、Time クラスを直接渡さずに、明示的に文字列に変換してから渡すと解消するかもしれません。

``` ruby Timeクラスを文字列に変換して渡すと解消するかも
h = {:time => Time.now.to_s, :data = "なんとかかんとか"}
db.execute("insert into table(time, data) values (:time, :data)", h)
```

<!--more-->

# SQLite3で、結果を Hash で取る

Rubyの`sqlite3 gem`で、`db.results_as_hash = ture` にすると、
select文などの結果が配列ではなく、Hash で返るようになるので、プログラムの可読性などが向上します。


# Hash の中身を ドット演算子 で参照できるようにする

SQLite3は関係ないですが、覚えておくと便利だと思ったので、メモします。

ActiveRecord で実装した部分を SQLite3 で再実装するとき、変更範囲を小さくしたかったので利用したテクニックです。

(ActiveRecordの結果はクラスだが、SQLite3の結果は `db.results_as_hash = ture`した場合、
Hash なので、なんとか既存のコードを変更せずに対応させたかった。)

``` ruby Hash の中身を ドット演算子 で参照したい(キーがString)
class Hash
  def method_missing(n)
    self[n.to_s]
  end
end

h = {"a" => 1, "b" => 2, "c" => 3}

puts h["b"] # => 2
puts h.b    # => 2
```

ちなみに、ハッシュのキーがシンボルのときは、次のようにすればOKです。

``` ruby Hash の中身を ドット演算子 で参照したい(キーがSymbol)
class Hash
  def method_missing(n)
    self[n.to_sym]
  end
end

h = {:a => 1, :b => 2, :c => 3}

puts h[:b]
puts h.b
```

`method_missing`を使った黒魔術なので、速度的に気になる点もありますが、そこは目をつぶりましょう。
