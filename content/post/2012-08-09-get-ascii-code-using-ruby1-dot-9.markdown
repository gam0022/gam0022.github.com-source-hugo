---
layout: post
title: "Ruby 1.9を使ってアスキーコードを取得する方法"
slug: get-ascii-code-using-ruby1-dot-9
date: 2012-08-09T23:41:00+09:00
comments: true
tags:
- Ruby
- tips
- ASCII
---

Ruby 1.9を使ってアスキーコードを取得する方法です。
次のように、bytesメソッドを使えばいいです。

```ruby
# Ruby1.9
"ABC".bytes.to_a # => [65, 66, 67] 
```

なお、上記のコードはRuby1.8では動きません。

Ruby1.8でアスキーコードが欲しい場合、[]で取得できますが、
あまりこの動作は美しくないですよね。

```ruby
# Ruby1.8
?A # => 65
"A"[0] # => 65
```
