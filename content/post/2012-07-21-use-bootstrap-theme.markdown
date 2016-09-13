---
layout: post
title: Octopressのテーマをカスタマイズする
date: 2012-07-21 23:51
comments: true
categories: 
- Octopress
- Diary
- bootstrap
---
Ocpressの標準のデザインは悪くはないのですが、個人的にはいまいち物足りなさを感じたので、テーマを変更しました。

テーマですが、[このページ](https://github.com/imathis/octopress/wiki/List-Of-Octopress-Themes)などから、
かっこいいのを見つけてくればいいと思います。

とりあえず私は、[bootstrap-theme](https://github.com/bkutil/bootstrap-theme)を入れてみることにしました。
導入はとても簡単です。

コード例を示すまでもないですが、Codeblockを試してみたいので、導入するまでのコードを貼り付けます。

(ちなみに、シェルのコマンドを貼り付けるときはlangをbashにすると良いみたいです。)

{% codeblock lang:bash %}
cd ~/git/octpress #octpressのディレクトリ
git clone https://github.com/bkutil/bootstrap-theme.git .themes/bootstrap-theme
rake install["bootstrap-theme"]
rake generate
rake deploy #公開
{% endcodeblock %}

テーマを変えることで、一気にモダンな感じになりました!

話題のBootstrapだけあって、こんなショボイブログも見てくれだけはいい感じに見えるような気がします。

あとは、\_config.ymlをちょっといじるだけで、facebookやGoogle+のボタンをつけたり、
Disqus Commentsでコメントをできるようにできるので、簡単にモダンなブログを作ることが出来ました。

Octopressすごい!
