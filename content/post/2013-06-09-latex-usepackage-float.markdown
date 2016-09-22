---
layout: post
title: "LaTexで図をその場に配置する"
slug: latex-usepackage-float
date: 2013-06-09T22:58:00+09:00
comments: true
tags:
- LaTex
---

LaTexで図をその場に配置する方法ですが、このようにすれば良いようです。

1. プリアンプルに`\usepackage{float}`を追加。
2. 図を配置するとき、`\begin{figure}[H]`のように位置指定する。
