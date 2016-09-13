---
layout: post
title: "WEBrickを使って、RubyCGIをローカル上でテストする"
date: 2012-08-25 11:19
comments: true
categories: 
- Ruby
- WEBrick
- CGI
---

WEBrickを使って、RubyCGIをローカル上でプレビューする方法を紹介します。前にTwinCalを作った時にこの方法を覚えました。

ApacheはC言語で書かれていているために[パフォーマンスが良い](http://thinkit.co.jp/article/117/4?page=0,1)ので本番環境ではApacheを採用しましたが、
ローカルでテスト用に使うにはWEBrickでちょろっとサーバを立てるのが良いですよね、そうしましょう。

テスト環境(ローカル)
:WEBrick

本番環境(サーバ)
:Apache

あとは、rsyncとかでファイルを同期できるようにしたら完璧。

### 1. Rubyのパスを本番環境とテスト環境で統一する

Rubyのパスを本番環境とテスト環境で統一するために、
`/usr/bin/ruby`のシンボリックリンクをrvmなどで入れたRubyに置き換えます。

``` bash
mv /usr/bin/ruby /usr/bin/ruby-original
ln -s /Users/gam0022/.rvm/rubies/ruby-1.9.3-p194/bin/ruby /usr/bin/ruby
``` 

本番環境とテスト環境の両方で行います。

当然ですが、RubyのCGIではこのパスを1行目に指定します。

### 2. WEBrickを使う

WEBrickについて簡単に説明すると、RubyでWEBサーバを立てるためのライブラリです。
これをrequireすることで、10行くらいのコードを書くだけで簡易WEBサーバが完成します。

私の場合、次のような`preview.rb`を書きました。
WEBrickで.rbをAddHandlerする方法がなかなかわからなくて苦労しました。

``` ruby
require 'webrick'
include WEBrick

module WEBrick::HTTPServlet
  FileHandler.add_handler('rb', CGIHandler)
end

s = HTTPServer.new(
  :Port => 3000,
  :DocumentRoot => File.join(Dir.pwd),
  :DirectoryIndex => ['index.rb']
)
trap("INT") { s.shutdown }
s.start
```

この`preview.rb`を公開したいディレクトリに設置し、
ターミナルで`ruby preview.rb`をすれば、ブラウザで`localhost:3000`にアクセスすることで、
簡単にローカル上でCGIをテストすることができます。

### おまけ: WEBrickでRequestURITooLargeが発生したときの対処方法

ApacheではURIの上限が大きいので、かなり長いURIを発行しても問題がないのですが、WEBrickでは2083byteの制限があるので、
CGIで長いURIを発行すると、RequestURITooLargeというエラーになってしまうことがあります。

これは、WEBrickのソースコードを書き換えることで対処できます。

私の環境では、`/usr/local/rvm/rubies/ruby-1.9.3-p194/lib/ruby/1.9.1/webrick/httprequest.rb`のL293に、
`MAX_URI_LENGTH`という定数があったので、これを書き換えることで対処できました。

``` ruby
291     private
292 
293     MAX_URI_LENGTH = 20830#2083 # :nodoc:
294 
295     def read_request_line(socket)
```

[RubyでWebrick利用時にRequestURITooLargeエラー発生時の対処](http://mukaer.com/archives/2012/03/19/rubywebrickrequ/)
