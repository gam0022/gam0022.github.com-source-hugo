---
layout: post
title: "Programming Challenges 3"
date: 2013-08-26 21:34
comments: true
categories: 
- Uva Online Judge
- 競技プログラミング
---

Uva Online Judgeで解いた問題を適当に解説します。

3ということで、[前回](/blog/2013/07/09/programming-challenges-2/)と[前々回](/blog/2013/06/06/programming-challenges-1/)の続きです。

# 10018 Reverse and Add

[10018 - Reverse and Add](http://uva.onlinejudge.org/index.php?option=onlinejudge&page=show_problem&problem=959)

{%m %} n = 入力 + reverse(入力) {% em %} を計算、回文だったらその値を返す。
回分でなければ、{% m %} 入力 = n  {% em %} として回文になるまえ繰り返す問題だった。

ここで言う回分というのは、`12321`のような整数のこと。

問題文に `"palindrome that is not greater than 4,294,967,295. "`
とあったので、`BigNumber` を使う必要は特に無く、`unsigned long long int` で対応できた。

ごく普通に、`回文を返す関数`と`回分かどうかを判定する関数`を実装して、問題を解いた。

<!--more-->

# 701 The Archeologist's Dilemma

[701 - The Archeologists' Dilemma](http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=33&page=show_problem&problem=642)

{% m %} N {% em %} を入力として、{% m %}2^E{% em %}が10進数として{% m %}N{% em %}のprefixとなる、
最小の{% m %}E{% em %}を求める問題だった。

注意点としては、

> (remember that more than half of the digits are missing).

とあるので、例えば、入力が10のときは、出力は20になる。

* これでは、桁の半分以上がprefixとなっているからダメ 
  * {% m %} 2^{10} = 10\_24 {% em %} 
* 桁の半分未満がprefixとなっているから答え。
  * {% m %} 2^{20} = 10\_48576 {% em %} 

結論から言うと、{% m %}2^E{% em %}の桁数を{% m %}i{% em %}と仮定したとき、

{% math %}
E = ceil( log2( n \times 10^i ) ) = floor( log2( (n+1) \times 10^i) )
{% endmath %}

となることを利用して、問題を解いた。(iを上の式を満たすまで変化させれて求めれば良い)

ここで、対数の公式より、以下のように上の式を変形して計算量を減らした。

- {% m %} log2(A \times B) = log2(A) + log2(B) {% em %}
- {% m %} log2(10^i) = log2(10) \times i {% em %}

# 10127 Ones

[10127 - Ones](http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=33&page=show_problem&problem=1068)

入力を`N`として、1の連続で表現される10進数 
となる最小の`N`の倍数の桁数を求める問題だった。

1の連続で表現される10進数 を `i` とすると、`i % N = 0` となるまで、
総当りで`i`を求めた。

このとき、`i = i % N` としても、`i % N` が変わらないことを利用して、
`i` が巨大にならないようにした。

# 847 A Multiplication Game

[847 - A Multiplication Game](http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=33&page=show_problem&problem=788)

あるゲームの勝者がどちらかを判定する問題だった。

ゲームのルールは、Stan と Ollie が 交互に ある数字pに 2から9の数字を掛けていき、
先にpを入力の値n以上にした者が勝者となる。Satanが常にp = 1から開始するらしい。

両方が最善を尽くした場合、Satanは常に2を掛け、Oliieは常に9を掛けると分かる。

{% m %}1 < n < 4294967295{% em %} だと分かっているので、nとpに `unsigned long long int` 型を使えば、
オーバーフローをせずに、計算できるので、素朴にシュミュレーションをした。

# 10198 Counting

[10198 - Counting](http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=34&page=show_problem&problem=1139)

この問題は、Gustavoの書く数字の表し方が何通りあるかを調べる問題だった。

今回は`Bignum`を使う必要があったので、
`C++` ではなく `Java(java.math.BigInteger)` を使って解いた。

この問題は、動的計画法で解くことができ、
求めるnの表し方の通りf(n)は、次の漸化式で求めることができた。

{% math %}
\begin{eqnarray*}
f(0) &=& 2\\
f(1) &=& 5\\
f(2) &=& 13\\
f(n) &=& 2 \times f(n-1) + f(n - 2) + f(n - 3)
\end{eqnarray*}
{% endmath %}

問題とは関係ないが、Javaで提出するときはClass名をMainにしないと
Runtime Errorになってしまったので苦労した。

# 10049 Self-describing Sequence

[10049 - Self-describing Sequence](http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=34&page=show_problem&problem=990)

この問題は、ある数列の第n項の値`f(n)`を求める問題だった。

この問題のポイントは、事前に`f(n)`を求めたいのだが、
普通に`f(n)`の配列を計算すると、
要素数が2000000000個となってしまってメモリが足りなくなる点だ。

そこで、`f(n)`の値は同じ値が何個か連続して並ぶことを利用して、
{% m %}f(i) = f(i + 1) = ... = f(j) = n{% em %} となっていたら、
{% m %}nums(n) = i{% em %} となる numsの配列だけを記録するようにした。

こうすれば、`f(n)`の値を知りたいときには、
{% m %}nums(i) \le n {% em %} となる`nums`を見つけて、{% m %} f(n) = i {% em %} とすれば求まる。

`nums(n)` は次の式を計算して求めた。

{% math %}
\begin{eqnarray*}
nums(0) &=& 1\\
nums(1) &=& 2\\
nums(3) &=& 4\\
nums(j) &=& nums(j) + i + 1 (だだし、nums(i) \le j < nums(i+1))
\end{eqnarray*}
{% endmath %}

# 10001 Garden of Eden

[10001 - Garden of Eden](http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=36&page=show_problem&problem=942)

セルオートマトンが、`Garden of Eden` というパターンかどうかを判定する問題だった。

`Garden of Eden` とは、どうやっても到達できないCAのパターンである。

入力
: CAの規則(id)
: パターンの長さn
: パターン(0と1)

出力
: `"Garden of Eden"` or `"REACHABLE"`

解法としては、バックトラックを使った。

CAは3つの組み合わせで次の状態が決まるので、バックトラックを使うにしても難しかった。

結論から言うと、候補となるCAの最初と最後を先に決定する。
つまり、以下のような4通りを先に作る。

  - 0xxxxx0
  - 0xxxxx1
  - 1xxxxx0
  - 1xxxxx1

次に、バックトラックを使って、残りのxの部分を埋めていき、
`"Garden of Eden"`かどうかを判定した。

# 10099 The Tourist Guide

[10099 - The Tourist Guide](http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=37&page=show_problem&problem=1040)

## 問題の概要

グラフの各ノードは地点を表していて、各エッジの数字は地点間を移動するバスのキャパシティを示している。

スタート地点からゴール地点まで移動するとき、最善を尽くしても何往復する必要があるかを求める。

## 解説

Dijkstra法を使って解いた。

より大きいキャパシティの道を選択したいが、最終的なキャパシティは全てのパスのキャパシティの最小になる。
これを考慮して、一般的な最小パスを求めるDijkstra法をすこし改造した。

## 注意点

- まず一度に運べる人数は、バスガイドを考慮しないといけないので、客が25人であれば、実際には25-1 = 24人しか運べなかった。
- 全てのテストケースの終わりにブランクラインを入れて良かった。
- 無向グラフなので注意する。


# 10034 Freckles

[10034 - Freckles](http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=38&page=show_problem&problem=975)

## 問題の概要

点の座標を与えられた時、全ての点を1本の線で結ぶために必要な最小の線の長さを求める。

## 解説

クラスカル法を使って解いた。
クラスカル法は、priority_queueを使って実装した。

# 10131 Is Bigger Smarter?

[10131 - Is Bigger Smarter?](http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=39&page=show_problem&problem=1072)

## 問題の概要

入力は、像の体重{% m %} W {% em %} と賢さ {% m %}S{% em %} のペア。

以下のように、体重が軽い象の方がより賢くなるsequenceが最大になるような、
象の番号の順番a を求める。

{% math %}
W[a[i]] < W[a[i+1]] < W[a[i+2]] < ... < W[a[i+n]]\\
S[a[i]] > S[a[i+1]] < S[a[i+2]] < ... < W[a[i+n]]\\
{% endmath %}

## 解説

動的計画法で求めた。

まず、入力を 重さが小さい順 で、同じ重さなら賢さ順でソートした。

次に、動的計画法で、条件を満たすような最大の長さのsequenceを求めた。

DPの大きさは、1次元で象の数と同じで、各要素にはsequenceの数が入るようにした。
また、sequenceの順番を記録するために、nextという配列に、前の添字を記録するようにした。


# 10154	Weights and Measures 

[10154 - Weights and Measures](http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=39&page=show_problem&problem=1095)

## 問題の概要

入力は、亀の重さと 自分を含めて耐えられるキャパシティのペア。

亀をうまく並び替えて、最大何個の亀の亀を重ねられるかを求める。


## 解説

動的計画法で、Is Bigger Smarter? と同じ要領で解いた。

DPは重ねられる最大数DP、重ねた最大の重さsum を記録して解いた。

しかし、自分の実装した方法では入力によっては最大が求められない場合があるらしく、
WA となってしまった。


# 116 Unidirectional TSP

[116 - Unidirectional TSP](http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=39&page=show_problem&problem=52)

## 問題の概要

MAPを最短経路を求めるような問題。

左上がスタートで、1マスずつ、右 or 右上 or 右下 しか進めないという制約がある。

注意点として、MAPの上下がループして繋がっているので、剰余で処理した。

## 解説

再帰的に動的計画法を使って、最小のコストとなるようなパスを求めた。


# 10310 Dog and Gopher

[10310 - Dog and Gopher](http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=41&page=show_problem&problem=1251)

## 問題の概要

犬とネズミの座標が1組ずつと、複数の穴の座標が与えられる。
犬はネズミより2倍速い。

穴に隠れることでネズミが犬から逃げられるかを判定する問題。

## 解説

全ての穴について、犬と穴、ネズミと穴の距離を比較して、
以下のような関係を満たす穴が1つでも存在すれば、ネズミは穴に逃げることができるとすれば解けた。

{% math %}
|犬 - 穴| \times 2 \ge |ネズミ - 穴|
{% endmath %}


# 10167 Birthday Cake

[10167 - Birthday Cake](http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=41&page=show_problem&problem=1108)

## 問題の概要

誕生日ケーキに苺がバラバラに載っかているので、苺が同じ数になるようにケーキを二等分する切り方を求める問題。

## 解説

この問題では、切り方を {% m %}Ax + Ay = 0{% em %} となるような直線で表現する。

{% m %} -500 \le A \le 500, -500 \le B \le 500 {% em %}という制約があるので、
{% m %}A, B{% em %} の全ての組みわせでも、高々{% m %} 1000 \times 1000 {% em %}通りしか無い。

よって、総当りで、{% m %}A, B{% em %} の組み合わせを求めれば解けた。
