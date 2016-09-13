---
layout: post
title: "GNU Octave を Mac OS Xにインストールする"
date: 2012-09-06 19:27
comments: true
categories: 
- Mac OS X
- Moutain Lion
- homebrew
- Octave
---

大学の数値計算法・数理アルゴリズムなどの授業でMatlabを使わないといけないのですが、
Matlabを買うお金がなかったので、代替ソフトとしてGNU OctaveをMac OS Xに入れました。

けっこうハマりどころが多かったのでメモします。

## GNU Octaveについて

[wikipedia](http://ja.wikipedia.org/wiki/GNU_Octave)からの抜粋です。

> GNU Octaveとは、MATLABと互換性を持ったフリーな数値解析ソフトウェアであり、GNUで開発している。
> MATLABとの互換性を主に目指しており、MATLABの機能の多くをOctaveも持っている。また MATLAB のために書かれたプログラムも修正せずに動作するものが多い。

[GNU Octave](http://www.gnu.org/software/octave/)

## Mountain Lion にしたらHomebrewがおかしくなった人はこれ

Mountain Lion にしたら、Homebrewがおかしくなった人は、まず次のリンクを参考にしてFixしましょう。

[Get Mountain Lion and Homebrew to Be Happy](https://gist.github.com/1860902)


## HomebrewでOctaveを入れる

``` bash how to install octave
# リポジトリ追加
brew tap free/open
# updateしないとうまくいかなかった
brew update
# OctaveのコンパイルにFortranのコンパイラが必要
brew install gfortran
# ようやくOctaveがコンパイルできる
brew install octave
```

## plotとかでグラフを描けるようにする

Octave自体には、グラフの描画機能はなく、gnuplotに依存しているのでgnuplotを入れます。

``` bash
brew install gnuplot
```

次に、`GNUTERM`という環境変数を設定します。

``` bash ~/.bash_profile
export GNUTERM=x11
```
次に`source ~/.bash_profile`をするかログインし直せばOctaveでplotなどからグラフを描画できるようになります。

ちなみに、`GNUTERM`を設定しないとこういう感じのエラーになります。

``` matlab octave error
octave :1> plot(x)
gnuplot> set terminal aqua enhanced title "Figure 1" size 560 420  font "*,6"
                      ^
         line 0: unknown or ambiguous terminal type; type just 'set terminal' for a list
```

[MacのターミナルからOctaveを使うための設定](http://helloworld.hifumi.info/post/22182948927/mac-octave)


## まとめ
これで、計算機室のゴミみたいなマシンを使わずとも課題ができます。
