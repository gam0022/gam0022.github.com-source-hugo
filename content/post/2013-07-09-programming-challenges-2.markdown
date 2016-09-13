---
layout: post
title: "Programming Challenges 2"
date: 2013-07-09 07:00
comments: true
categories: 
categories: 
- 競技プログラミング
- Uva Online Judge
---

Uva Online Judgeで解いた問題を適当に解説します。

2ということで、[前回](/blog/2013/06/06/programming-challenges-1/)の続きです。

# Where's Waldorf?

## 問題

[10010 - Where's Waldorf?](http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=31&page=show_problem&problem=951)

問題
: MxNの広さの2次元の行列から単語を検索する問題。
: 単語は、上、下、左、右、右上、左上、右下、左下の8通りの並び方がある。(縦読みや横読み的な)
: また、大文字と小文字は区別しない。

入力
: 書くのが面倒なので省略。

出力
: 見つけた単語の1文字目の座標

## 解説

特にアルゴリズムの工夫のしようもないので、総当りで解く。
ちょっとした工夫としては、1文字目を見つけた次に最後の文字から照合すると、
文字の座標的にありえないケースを早々に飛ばすことができる。

大文字と小文字を区別しないので、入力を読み取るときにどちらかに統一する。

<!--more-->

# Crypt Kicker II

## 問題

[850 - Crypt Kicker II](http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=31&page=show_problem&problem=791)

この問題は、暗号文を解読する問題だった。

解読のヒントは暗号文を平文にしたときに、次の1行が含まれていることだった。

"the quick brown fox jumps over the lazy dog" 


## 解説

方針としては、まず暗号文を全てstring型のリストとして読み込み、
上の平文の文字数と一致する行を抽出した。
そして、抽出した暗号文から、暗号文→平文にするテーブルの作成を試みる。

同じ暗号文字に対応する平文字が2文字以上になったら、テーブルの作成を失敗とみなし、
次の抽出した行からテーブルの作成を試みる。
テーブルを作成できなければ、"No solution." とする。

ほとんど総当りのような方法だったが、TLEにならずに解けてよかった。

# File Fragmentation

## 問題

[10132 - File Fragmentation](http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=31&page=show_problem&problem=1073)

2つに分かれてしまったファイルがあるので、分かれる前の元のファイルを答える問題。

## 解説

方針としては次のように行った。

1. 最大の文字数 max と最小の文字数 min を求める。
2. 求める文字列の文字数は l = min + max となる。
3. 長さがl となる ペアの組み合わせを全て作る。
4. どの入力に対してもできる文字列があれば、それが答え。

# Vito’s Family

## 問題

[10041 - Vito’s Family](http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=32&page=show_problem&problem=982)

ある1つの家を主発点として、他の全てのを訪ねるときに、最小となる距離を求める問題だった。

## 解説

ある1つの家を決定する方法がポイントで、Brute Forceしなくても、
家を番地でソートすると、中央の番地(±1)を出発点とすれば、最小の距離となるようだった。

# Longest Nap

[10191 - Longest Nap](http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=32&page=show_problem&problem=1132)

スケジュールとスケジュールの間の最も長い空き時間を求める問題。

入力となるスケジュールが時系列順に並んでいるとは限らないので、ソートする必要があった。

時間は hh:mm 形式で与えられるが、比較するために私は分単位で保持し、
outputの時に hh:mm に計算をして戻すようにした。

scanf()の指定にミスがあることが原因で、しばらく WA に苦しめられた。

# Shoemaker's Problem

[10026 - Shoemaker's Problem](http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=32&page=show_problem&problem=967)

案件を開始するまにかかった日数、1日ごとに罰金(day)を払わなくてはいけない靴屋が
罰金を最小にするにはどのような順番で案件を処理したら良いかという問題。

結論から言うと、一日あたりの罰金が大きい順で案件をソートすれば AC となった。

一日あたりの罰金 = 罰金 / 修理に必要な日数 = fine / day

初めは、安定ソートでないといけないかと思ったが、不安定なソート(std::sort)でもACとなった。

どうして、この方法で答えが導けるか証明は難しいが、感覚的には確かに成り立ちそうである。
