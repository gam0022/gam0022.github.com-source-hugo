---
layout: post
title: "Octopressの見出しにアンカーリンクをつけるように改造"
date: 2013-02-05 14:30
comments: true
categories: 
- Octopress
---

タイトルの通りなのですが、h1レベルの見出しにアンカーリンクをつけるようにOctopressを改造しました。

`plugins/octopress_filters.rb`の19行目を次のように修正して、
h1レベルの見出しに正規表現でアンカーリンクをつけるようにしました。

``` diff octopress_filters.diff https://gist.github.com/gam0022/4712560 4712560
@@ -16,7 +16,7 @@ module OctopressFilters
   end
   def post_filter(input)
     input = unwrap(input)
-    RubyPants.new(input).to_html
+    RubyPants.new(input).to_html.gsub(/<h1>([^<].*[^>])<\/h1>/, '<h1><a name="\1" href="#\1">\1</a></h1>')
   end
 end
```

修正するべき場所がここで本当に良いのか微妙ですが、とりあえず思った通りに動いているので良しとします。

以下、見出しのテスト

# 見出し1

# 見出し2
