---
layout: post
title: "Octopressで最後に編集した記事だけをgenerate"
date: 2014-12-07 12:15
comments: true
categories: 
- Octopress
---

# はじめに

以前、[Octopressのpreviewを高速化する](/blog/2013/09/28/speed-up-octopress-site-generation/)という記事を書きました。

この記事では、`rake isolate` と `rake integrate` を使って特定の記事だけを `generate` することによって、
`rake generate` を高速化していました。

しかしながら、この方法は手順が複雑で使うコマンドが多く、面倒だし使い方を忘れるという問題がありました。

通常、最後に保存したファイルを generate することが多いので、これを利用してもっと便利な Rake の task を作ります。

<!--more-->

# rake generate_only

`Rakefile` に `generate_only` という task を追加します。頻繁に使うので、`go`というaliasも定義しました。

使い方は、`rake generate_only [filename]` という形式で使います。
`filename`を省略すると、最後に保存されたファイルが自動的に設定されます。

```rb Rakefile
# usage rake generate_only[my-post]
# thanks to http://rcmdnk.github.io/blog/2013/12/06/blog-octopress-rake/
desc "Generate only the specified post (much faster)"
task :generate_only, :filename do |t, args|
  if args.filename
    filename = args.filename
  else
    filename = Dir.glob("#{source_dir}/#{posts_dir}/*.#{new_post_ext}").sort_by{|f| File.mtime(f)}.last
  end
  puts "## Test build for #{filename}"
  puts "## Stashing other posts"
  Rake::Task[:isolate].invoke(filename)
  Rake::Task[:generate].execute
  puts "## Restoring stashed posts"
  Rake::Task[:integrate].execute
end
task go: :generate_only
```

## 補足

`rake generate_only` を実行した後に `_stash` にファイルが退避されたままだとしたら、
Octopress が古いために、次のパッチが入ってない可能性が高いです。

- [[BUGFIX] Unbreak generate_only task.](https://github.com/imathis/octopress/pull/682)

# 参考

以下の記事がとても参考になりました！ありがとうございます！

- [Octopressのgenerate_onlyをモット便利に2](http://rcmdnk.github.io/blog/2013/12/06/blog-octopress-rake/)


# Qiita やってます

全く同じ内容ですが、こちらにもポストしました。

- [Octopressで最後に編集した記事だけをgenerate - Qiita](http://qiita.com/gam0022/items/7b5a6e4492c90583706f)
