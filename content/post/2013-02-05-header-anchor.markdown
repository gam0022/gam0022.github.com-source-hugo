---
layout: post
title: "Octopressの見出しにアンカーリンクをつけるように改造"
slug: header-anchor
date: 2013-02-05T14:30:00+09:00
comments: true
tags:
- Octopress
---

タイトルの通りなのですが、h1レベルの見出しにアンカーリンクをつけるようにOctopressを改造しました。

``の19行目を次のように修正して、
h1レベルの見出しに正規表現でアンカーリンクをつけるようにしました。

``` diff
# plugins/octopress_filters.rb
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


# 追記

Markdownのパーサをkramdownに変更したら、見出しにアンカーリンクではないですが、idが自動的に振られるようになりました。

https://gam0022.net/blog/2013/05/27/kramdown/