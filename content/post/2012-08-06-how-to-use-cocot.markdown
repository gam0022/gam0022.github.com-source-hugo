---
layout: post
title: "cocotで文字コードが異なるマシンにsshする"
slug: how-to-use-cocot
date: 2012-08-06T11:18:00+09:00
comments: true
categories: 
- ssh
- coins
- cocot
- Mac OS X
---

私が所属している情報科学類(略称coins)では、24時間いつでもsshできるiMacがあるのですが、文字エンコーディングはEUC-JPです。

一方で私のノートPCの文字エンコーディングはUTF-8なので、
普通にsshすると文字化けしてひどいことになってしまいます。

cocotという端末(tty)とプロセスの間に割り込んで、文字コード変換を行うツールがあるので、これを使うことで文字化けが解消します。

OS Xを使っていれば、cocotは普通にhomebrewからインストールできます。

```bash
brew install cocot # cocotをインストールする
```

UTF-8環境からEUC-JP環境にsshする場合、次のようにすればいいです。

```bash
# cocot -t コンソール側の文字コード -p プロセス側の文字コード -- 使いたいコマンド
cocot -t UTF-8 -p EUC-JP -- ssh coins
```

頻繁にsshする場合、次のようにエイリアスを作ればいいかと思います。
うーむ。エイリアス名は検討の余地がありそうです。(汗)

```bash
alias sshe='cocot -t UTF-8 -p EUC-JP -- ssh' #EUC-JP環境にsshする
sshe coins
```
