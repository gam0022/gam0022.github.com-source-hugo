+++
date = "2016-09-25T12:45:18+09:00"
image = "/images/posts/2016-09-25-migrated-from-octopress-to-hugo/migrated-from-octopress-to-hugo-square.png"
toc = true
math = false
draft = false
slug = "migrated-from-octopress-to-hugo"
tags = ["Hugo", "Octopress", "ブログ運営"]
title = "OctopressからHugoへ移行する方法"
+++

![OctopressからHugoへ移行](/images/posts/2016-09-25-migrated-from-octopress-to-hugo/migrated-from-octopress-to-hugo.png)

当サイトはOctopressを使って生成していたのですが、このたびHugoに移行することにしました。
この記事ではHugoに移行した経緯と、Hugoへの移行手順についてまとめます。
なおローカル環境はMac OS Xです。

# Octopressを辞めた理由

Octopressを辞めた理由は、記事数の増加に伴い、サイトの生成に時間がかかるようになってしまったからです。

HugoではOctopressに比べてサイトの生成時間が短いことから、Hugoに移行することにしました。

現在の記事数でのサイトの生成時間は、Octpress(`rake generate`コマンド)で 20.39秒、Hugo(`hugo`コマンド)では 2.66秒でした！

他にも、Octpressは直近のコミットが半年前のもので、活発にメンテナンスされていないと感じたことも、Hugoへ移行した理由の1つです。

# Hugoのインストール

Macの場合はHomebrewからインストールするのが良いでしょう。

```bash
brew update
brew install hugo
```

Mac以外の方は、公式ページを参考にして、ソースコードからインストールしましょう。

- [Hugo - Installing Hugo](https://gohugo.io/overview/installing/)

<!--more-->

# Hugoを使ってみる

Hugoでページを生成して、ブラウザで表示を確認するまでの最短手順は以下の通りです。

各手順の詳細は[Hugo Quickstart Guide](https://gohugo.io/overview/quickstart/)で確認しましょう。

```bash
# Hugoのプロジェクトをつくる
hugo new site hugo-site
cd hugo-site

# 記事を生成
hugo new post/good-to-great.md

# テンプレートをインストール
# テンプレートがない状態では、真っ白なページしか表示されません
mkdir themes
cd themes
git clone https://github.com/dim0627/hugo_theme_robust.git

# ローカルサーバでプレビュー
# http://localhost:1313/ にブラウザでアクセスすることで、プレビューを確認できます
cd ..
hugo server --theme=hugo_theme_robust --buildDrafts
```

# Hugo記事へ記事の移行する

Octopress の記事を Hugo に移植する大まかな手順は次の4つです。

1. Markdownの記事のコピー
2. 画像のコピー
3. Octopressの独自記法をPure Markdownに置換
4. Octopressと同一のパーマリンクにする（オプション）

## Markdownの記事のコピー

Octopressでは、`source/_posts`に記事を配置しましたが、Hugoでは`content/post`に配置します。

```
cp octopress-site/source/_posts/* hugo-site/content/post/
```

## 画像のコピー

Octopressでは画像ファイルを、`source/images/`に配置しましたが、Hugoでは`static/images/`に配置します。

```
cp -r octopress-site/source/images/* hugo-site/static/images/
```

## Octopressの独自タグをPure Markdownに置換
Octopressのみでしか使えない独自記法を、Hugoでも扱えるようMarkdownに書き換える必要があります。

将来的な移行を考えると、独自記法は極力避けて、なるべくプラットフォームに依存しない書き方をするべきだと痛感しました。

```
cd content/post/

# 記事のタイムスタンプの形式を変える
# Hugoでは、"2016-09-25T15:09:57"のような形式のタイムスタンプでないとパースに失敗します
find . -type f -exec sed -i "" -e 's/date: \([0-9]\{4\}-[0-9]\{2\}-[0-9]\{2\}\) \([0-9]\{2\}:[0-9]\{2\}\)$/date: \1T\2:00+09:00/g' {} \;

# コードブロック
find . -type f -exec sed -i "" -e 's/{% codeblock lang:\([a-z]*\) %}/```\1/g' {} \;
find . -type f -exec sed -i "" -e 's/{% codeblock %}/```/g' {} \;
find . -type f -exec sed -i "" -e 's/{% endcodeblock %}/```/g' {} \;

# s/categories/tags/
# OctopressのカテゴリーはHugoのタグに相当します
find . -type f -exec sed -i "" -e 's/^categories:.*/tags:/g' {} \;

# 画像
find . -type f -exec sed -i "" -e 's/{% img \([^ ]*\) \(.*\) %}/![\2](\1)/g' {} \;

# class付きの画像
find . -type f -exec sed -i "" -e 's/{% img right \([^ ]*\) \(.*\) %}/<img alt="\2" src="\1" class="right">/g' {} \;
```

## Octopressと同一のパーマリンクにする（オプション）

OctopressとHugoではURLの付与ルールが異なるので、パーマリンクを維持させるためには一手間必要です。

たとえば、`2016-09-25-migrated-from-octopress-to-hugo.md`というファイル名に対して、

Octopressでは`/blog/2016/09/25/migrated-from-octopress-to-hugo/`というURLになります。

Hugoのデフォルト設定では`/post/2016-09-25-migrated-from-octopress-to-hugo/`というURLとなります。

そこで、`config.toml`に次の設定を加えてHugoのURLの付与ルールを変更することで、OctpressとHugoのURLを一致させました。

```
[permalinks]
  post = "/blog/:year/:month/:day/:slug"
```

そして各記事に`slug`属性を設定することで、Octopressと同じパーマリンクを維持しました。

記事数が多い場合、すべての記事にslug属性を設定するのは手間だったので、次のようなRubyのスクリプトを使用しました。

```ruby
dir = 'content/post/'
Dir::foreach(dir) do |filename|
  if filename =~ /\.markdown$/
    slug = filename.gsub(/\d{4}-\d{2}-\d{2}-/, '').sub('.markdown', '')
    puts "#{filename} : #{slug}"

    lines = []
    File::open(dir + filename) do |f|
      f.each do |line|
        lines << line
      end
    end

    File::open(dir + filename, 'w') do |f|
      lines.each_with_index do |line, i|
        f.puts("slug: #{slug}") if i == 3
        f.print(line)
      end
    end
  end
end
```

また、`slug`を設定せずに、ファイル名から日付のprefixを削除してHugoのルールに合わせる方法もあります。

# deployコマンド

Hugoではdeployコマンドが内包されていないので、自作する必要があります。

そこで、`rsync`を使ってVPSにデプロイするシェルスクリプトを作成しました。

`deploy.sh`

```
#!/bin/sh
rm -rf public
hugo

dir=$(cd $(dirname ${BASH_SOURCE:-$0}); pwd)
echo "dir: $dir"

ssh_host="g22"
rsync --iconv=UTF-8-MAC,UTF-8 -avzc --delete --exclude-from=rsync-exclude ${dir}/public/ ${ssh_host}:/var/www/html
```

`rsync-exclude`では上書きしたくないファイルやディレクトリを指定します。
当サイトでは [`gam0022.net/webgl`](/webgl/)のようなサブディレクトリ以下のコンテンツがあるため、`rsync-exclude`を次のように指定しました。

`rsync-exclude`

```
webgl/
*.swp
```

`--iconv=UTF-8-MAC,UTF-8`はリモート環境がMacで、かつURLに日本語を含むコンテンツがある場合([例としては日本語のタグ名を使用した場合](/tags/レイマーチング/))には必要なオプションです。
このオプションを付けると`UTF-8-MAC`のファイル名をリモートでは`UTF-8`に変換してコピーします。 詳しくは次の記事を参照してください。

- [カテゴリー名に濁点を含んだ日本語が使えない問題を解決する(Rsyncのiconvオプションを使う)](/blog/2012/08/11/use-rsync-iconv-option/)

# 参考記事

この記事を書くにあたって、次の記事を参考にさせていただきました。ありがとうございます。

- [ブログをOctopressからHugoに移行した](https://yet.unresolved.xyz/blog/2015/01/04/migrate-blog-to-hugo-from-octopress/)
- [OctopressからHugoへ移行した | SOTA](http://deeeet.com/writing/2014/12/25/hugo/)
