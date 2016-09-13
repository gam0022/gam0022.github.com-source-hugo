---
layout: post
title: "Ruby 1.9を使ってアスキーコードを取得する方法"
date: 2012-08-09 23:41
comments: true
categories: 
- Ruby
- tips
- ASCII
---

Ruby 1.9を使ってアスキーコードを取得する方法です。
次のように、bytesメソッドを使えばいいです。

{% codeblock lang:ruby %}
# Ruby1.9
"ABC".bytes.to_a # => [65, 66, 67] 
{% endcodeblock %}

なお、上記のコードはRuby1.8では動きません。

Ruby1.8でアスキーコードが欲しい場合、[]で取得できますが、
あまりこの動作は美しくないですよね。

{% codeblock lang:ruby %}
# Ruby1.8
?A # => 65
"A"[0] # => 65
{% endcodeblock %}
