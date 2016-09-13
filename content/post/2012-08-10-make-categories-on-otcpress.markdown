---
layout: post
title: "Octopressでカテゴリーの一覧みたいのを実装する"
date: 2012-08-10 12:24
comments: true
categories: 
- Octopress
- 日本語
- ゴ
---

Octopressはそれなりに高機能なのにも関わらず、なぜかカテゴリーの一覧を表示する機能がありませんでした。

仕方ないので、自分で実装することにしました。

今回の記事は、次の画像のようなカテゴリーの一覧をサイドバーに表示するまでのメモです。

{% img /images/120810-0001.png カテゴリーの一覧 %}

前提知識として、Octopressのサイドバーをカスタマイズするためには、次の2つの作業が必要です。
ここでは、categoriesという名前のサイドバーを追加します。

1. `source/_includes/asides/categories.html`というファイルを作る。
2. ` _config.yml`の`default_asides:`に`asides/categories.html`を加える。[ex.](https://github.com/gam0022/gam0022.net/commit/8cdfa189385461b1c5beef6e8956e721c113514f#diff-0)

あとは、1,の`source/_includes/asides/categories.html`にカテゴリーの一覧を表示する機能をうまく実装しなくてはなりません。

siteというグローバル変数のダンプを手がかりに、`site.categories`というハッシュが存在することがわかりました。

JekyllのLiquidテンプレートエンジンの文法がよくわからないので、以下のサイトなどを参考にして学習しました。

* http://wiki.shopify.com/UsingLiquid
* http://melborne.github.com/2012/05/13/first-step-of-jekyll/
* [for item in hash すると、item[0]にキー名、item[1]に値が入る](http://stackoverflow.com/questions/8206869/iterate-over-hashes-in-liquid-templates)

しかし、`site.categories`はカテゴリー名をキーとして値が記事の本文のHTMLへの参照(?)の配列としたハッシュになっており、
そのままではURLが取得できず、カテゴリー名からURLに変換する処理をLiquidの文法だけで実装するのは無理だと気が付きました。

で、どうしたかというと、Liquidを拡張しました。`Jekyll::Filters`にメソッドを定義すると、Liquidからそのメソッドを呼び出せるようになります。

最終的に、`_config.yml`を編集後、
`source/_includes/asides/categories.html`と`plugins/category_generator.rb`を次のようにしたら、うまくいきました。

### source/_includes/asides/categories.html

`source/_includes/asides/categories.html`はこれだけです。

`{.{` の`.`は消してください。

{% codeblock lang:html %}
<section class="well">
  <ul id="categorys" class="nav nav-list">
    <li class="nav-header">Categorys</li>
    {.{ site.categories | site_categories_links }}
  </ul>
</section>
{% endcodeblock %}

### plugins/category_generator.rb

`plugins/category_generator.rb`の`Jekyll::Filters`に`site_categories_links`というメソッドを追加します。

{% codeblock lang:ruby %}
module Jekyll
  module Filters
    # Outputs a list of categories as comma-separated <a> links. This is used
    # to output the category list for site's all categories.
    #   
    # Returns string
    #   
    def site_categories_links(categories)
      def adjust_fontsize(size)
        [20, size*2 + 8].min
      end 
      dir = @context.registers[:site].config['category_dir']
      categories = categories.to_a.sort.map do |key, val|
        "<a class='category' style='font-size:#{adjust_fontsize(val.size)}px;' href='/#{dir}/#{key.gsub(/_|\P{Word}/, '-').gsub(/-{2,}/, '-').downcase}/'>#{key}(#{val.size})</a>"
      end 
      categories.join(' / ')
    end 
  end 

end
{% endcodeblock %}

とりあえず、これでカテゴリーの一覧を表示することができました。
