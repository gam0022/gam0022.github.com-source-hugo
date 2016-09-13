---
layout: post
title: "XcodeでopenCVを使う"
date: 2013-08-04 12:40
comments: true
categories: 
- Mac OS X
- OpenCV
- Xcode
---

[某OJT](http://gam0022.net/blog/2013/08/01/cojtfalsecheng-guo-fa-biao-falsegan-xiang/)で
[XcodeからopenCVを使う](https://github.com/gam0022/shelf/tree/master/hls_spot)機会があったので、その方法をメモします。

バージョンは次の通りです。

Xcode
: 4.6.3

openCV
: 2.4.5

# openCVをインストールする

まず、普通にhomebrewでopenCVを入れます。

``` bash homebrewでopenCVをインストールする
brew tap homebrew/science
brew install opencv
```

# XcodeでopenCVを使えるようにプロジェクトを設定する

次のページ通りに設定したら、うまくできました。

[XCode 4.5.2 でOpenCV 2.4.2 を使う](http://d.hatena.ne.jp/nurs/20121125/1353861488)
