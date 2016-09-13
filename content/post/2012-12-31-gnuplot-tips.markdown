---
layout: post
title: "gnuplotでCSVファイルを読み込む方法とmultiplotの注意点"
date: 2012-12-31 17:02
comments: true
categories: 
- gnuplot
---

シュミレーション物理とかいう授業で、
座標のデータ(天体の膨張のシュミレーションらしい)をCSV形式に出力して
それをエクセルで分散図として表示する課題があったのですが、
あえてgnuplotでやってみました。

# gnuplotでCSVファイルを読み込む方法

通常、gnuplotではスペースで区切ったデータしか読み取れませんが、
次のように設定すれば、CSV形式のファイルもplotできます。

```
set datafile separator ","
```

次のようにすれば、TSV形式でも読み取れると思います。


```
set datafile separator "\t"
```

# multiplotの注意点

multiplotを使えば、複数のグラフを並んで表示できます。
MatLabのsubplotのような機能です。
便利な機能なのですが、グラフをファイルに出力するときに注意点があります。

次のように、`set multiplot`を使う前に、`set out`を使ってください。

```
set terminal postscript eps
set out "img1.eps"
set multiplot layout 1,2
replot
```

さもないと、次のようなエラーになってしまいます。

```
set out "img1.eps"
        ^
"plot", line 9: you can't change the output in multiplot mode
```

# まとめ

以上のことを踏まえて正しくgnuplotを使いましょう。

```
set datafile separator ","

set size square
set xr[40:60]
set yr[40:60]

set terminal postscript eps
set out "img1.eps"
set multiplot layout 1,2

plot "before.csv"
plot "after.csv"
replot
```

出力画像

{% img /images/posts/2012.12.31_gnuplot.png gnuplot_test %}
