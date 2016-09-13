---
layout: post
title: "いろんな言語で Trick or Treat"
date: 2013-10-31 23:59
comments: true
categories: 
- ネタ
- Programming
- Ruby
---

いろんな言語で Trick or Treat してみました。

Java

```java
if(!treat) trick();
```

C#

```csharp
if(!Treat) Trick();
```

Python

```python
if not treat:
    self.trick();
```

Ruby

```ruby
trick unless treat?
```

結論: **Ruby が一番シンプル**

<!--more-->


# おまけ

`||` の短絡評価を使えばもっとシンプルに書けます。

しかし、英語とは Trick と Treat の順番が逆になります。

C

```c
treat || trick();
```

Ruby

```ruby
treat? or trick
```

上のような書き方だと、JavaやC#などの言語だと、文だとみなしてくれないのでコンパイルエラーになります。

仕方ないので代入文にして回避します。

Java

```java
//treat || trick(); // コンパイルエラー
boolean r = treat || trick();
```

C#

```csharp
var r = Treat || Trick();
```


trick() に副作用があるとしたら、こういう書き方は避けるべきですが、今回はあえて利用しています。
普通はこういうコードを書かないほうがいいと(個人的には)思います。


# 元ネタ

<blockquote class="twitter-tweet"><p>Java「if(!treat) trick();」&#10; &#10;C# 「if(!Treat) Trick();」&#10; &#10;Python 「&#10;if not treat:&#10; self.trick();」&#10;&#10;Perl「treat or die」</p>&mdash; らこ (@laco0416) <a href="https://twitter.com/laco0416/statuses/263596378561855488">October 31, 2012</a></blockquote>

<blockquote class="twitter-tweet"><p>Ruby「trick unless treat」</p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/statuses/395724005446930432">October 31, 2013</a></blockquote>

<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
