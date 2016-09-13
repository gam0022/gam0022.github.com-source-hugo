---
layout: post
title: "coinsの環境を使ってDynamic Forward"
date: 2013-03-21 11:17
comments: true
categories: 
- Mac OS X
- coins
---

Twinsなど学内向けのサイトにアクセスするためにLocalForwardを使っている人が多いようですが、
DynamicForwardの方が汎用性が高くて便利なのに、使っている人が少ないような印象を受けるので紹介します。

この記事の説明はあまり分かりやすくないので、単純に学外からTwinsを使いたいだけであれば、
次の記事を参考にすれば良いと思います。

[MacでTWINSを学外から使う](http://shkh.hatenablog.com/entry/2011/11/22/231233)


# 接続の方法

## 1.sshの設定をする

まず、`~/.ssh/config`を次のようにします。

``` bash .ssh/config
Host coins coins-p
HostName www.coins.tsukuba.ac.jp
User sxxxxxxx

Host *-p
DynamicForward 1080
```

上のように設定すると、

* 普通にsshしたいだけならば、`ssh coins`
* DynamicForwardしたいなら、`ssh coins-p`

となって捗ります。

このように、*(アスタリスク)を使って設定を書くと、
重複してサーバ名などの設定を書かないで済むというちょっとしたテクニックを使っています。

## 2.SOKCSプロキシを使う

この設定だと、`ssh coins-p`をしたときに、ローカルホストの1080番ポートにSOKCSプロキシサーバを割り当てると、
学内向けのサイトも普通に見れるようになります。

SOKCSプロキシの設定は Mac OS X (山ライオン)ならば、`ネットワーク環境設定`から下のスクリーンショットを参考にして行なってください。

他の環境の人はググって調べてください。

{% img /images/posts/2013-03-21-dynamic-forward.png SOKCSプロキシの設定 %}

# 切断するとき

切断するときは、次の2つの両方の作業をしてください。

* sshの接続を切る。
* プロキシの設定を無効にする。
