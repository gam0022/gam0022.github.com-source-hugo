---
layout: post
title: "Programming Challenges 1"
date: 2013-06-06 09:14
comments: true
categories: 
- 競技プログラミング
- Uva Online Judge
---

Uva Online Judgeで解いた問題を適当に解説します。

# The 3n+1 Problem

## 問題

[100 - The 3n + 1 problem](http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=29&page=show_problem&problem=36)

問題
: ある整数nに対して、問題文のように数列を1になるまで計算する。
: nを iからjの 範囲にして、数列を計算した時、
: 1で終わるまでの数列のサイクル数が最大になるときのサイクル数を求める。

入力
: 1つのテストケースに対して、次の1行の入力。
: `i, j`

出力
: `i, j, 最大のサイクル数`

<!--more-->

## 解説

数列を計算するときに、同じ計算を何度もすることになるので、計算結果をHashMapなどに
入れてもいいが、時間制限は3秒なので、特に工夫しなくてもTLEにはならなかった。

入力が意地悪になっていて、i < j とは限らないので、i < j になるようにswapしないとWAになる。

# Jolly Jumper

## 問題

[10038 - Jolly Jumpers](http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=30&page=show_problem&problem=979)

問題
: 与えられた数列a(長さはn)が、`Jolly Jumpers`かどうかを判定する問題。
: `Jolly Jumpers`とは、| a[i] - a[i+1] | の値が、1からn-1までの全ての値をとるような数列。

入力
: 1つのテストケースに対して、次の1行の入力。
: `数列の長さn, 数列`

出力
: `Jolly` or `Not jolly`

## 解説

まあ、普通に計算するだけ。

注意点としては、`n == 1`のときは例外処理で`Jolly`を出力しないといけない。

私の場合は、`std::set<int>`に数列の差の絶対値をinsertしていき、
`(nums.size() == n-1 && dmin == 1 && dmax == n-1` になっていたら`Jolly`とした。

# Stack 'em Up

[10205 - Stack 'em Up](http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=30&page=show_problem&problem=1146)

## 問題

トランプをシャッフルする問題。
初期状態は整列した状態。
入力とか書くのめんどいです。

## 解説

まあ、そのまま実装するだけなので、特にハマル点は無いと思いました。
