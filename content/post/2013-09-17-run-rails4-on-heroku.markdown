---
layout: post
title: "Rails4のアプリをHerokuで動かす"
date: 2013-09-17 22:09
comments: true
categories: 
- Ruby
- Rails4
- Heroku
- Mac OS X
---

Rails4のアプリをHerokuで動かすまでにしたことをメモします。

# 1. Rails4 のプロジェクトを作る

[Getting Started with Rails](http://guides.rubyonrails.org/getting_started.html)を参考にして Rails4 のプロジェクトを作りました。

念の為にバージョンもメモしておきます。

ruby
: ruby 2.0.0p247 (2013-06-27 revision 41674) [x86_64-darwin12.4.0]

rails
: Rails 4.0.0

Mac OS X でやりました。

<!--more-->


# 2. Heroku に登録

[heroku.com](https://www.heroku.com/) に 登録して、Heroku のコマンドラインツールをインストールして、公開鍵を登録したような記憶があります。

(あまり記憶に無いので、たぶん指示に従っていけばいい感じだったと思います。)


# 3. production用のDB を sqlite3 → pg に変更

Heroku では SQLite3 に対応してないので、production用のデータベースに PostgreSQL(pg) を使うために `Gemfile`と`config/databae.yml`を編集します。

``` diff Gemfile の diff
gem 'rails', '4.0.0'

# Use sqlite3 as the database for Active Record
-gem 'sqlite3'
+gem 'sqlite3', groups: %w(test development), require: false
+gem 'pg', groups: %w(production), require: false

# Use SCSS for stylesheets
gem 'sass-rails', '~> 4.0.0'
```

``` diff config/database.yml の diff
  timeout: 5000

production:
-  adapter: sqlite3
-  database: db/production.sqlite3
+  adapter: pg
+  database: db/production.pg
```

最後に、`bundle install`をします。

## 補足

ちなみに、SQLite3 のままで、`git push heroku`すると、こんな感じのエラーが起こりました。

``` bash
       Gem files will remain installed in /tmp/build_8njhwta846es/vendor/bundle/ruby/2.0.0/gems/sqlite3-1.3.8 for inspection.
       Results logged to /tmp/build_8njhwta846es/vendor/bundle/ruby/2.0.0/gems/sqlite3-1.3.8/ext/sqlite3/gem_make.out
       An error occurred while installing sqlite3 (1.3.8), and Bundler cannot continue.
       Make sure that `gem install sqlite3 -v '1.3.8'` succeeds before bundling.
 !
 !     Failed to install gems via Bundler.
 !
 !     Detected sqlite3 gem which is not supported on Heroku.
 !     https://devcenter.heroku.com/articles/sqlite3
 !

 !     Push rejected, failed to compile Ruby/Rails app

To git@heroku.com:pacific-waters-7608.git
 ! [remote rejected] master -> master (pre-receive hook declined)
error: failed to push some refs to 'git@heroku.com:pacific-waters-7608.git'
```


# 4. Git リポジトリを作る

普通に Git リポジトリを作ります。

``` bash 普通に Git リポジトリを作る
git init
git add .
git commit -m "first commit"
```


# 5. Heroku に deploy する

``` bash
heroku create # このとき、`heroku create アプリ名` で、任意のアプリ名にもできる。
git push heroku # Heroku への deploy は git の commit で行うよう。時間がかかる。
heroku open # ブラウザで確認できる。
```

## 補足

`git push heroku` に失敗して、`heroku create` しているうちに、アプリが5個を越えてしまったので、
[heroku dashbord](https://dashboard.heroku.com/apps) からアプリを消していたら、
push 先の heroku(リモートリポジトリ) が無いとかいうエラーになってしまいました。

``` bash No such app as pacific-waters-7608.
git push heroku

 !  No such app as pacific-waters-7608.

fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

こうなってしまったら、`.git/config` を書き換えて、`[remote "heroku"]`の部分を消してから、もう一度 `heroku create`すればいいです。

もしくは、url の部分を 存在するアプリ名に書き換えてもいい気がします。


# 6. Heroku のデータベースで rake db:migrate する

`heroku open`して、動作を確認すれば分かると思いますが、このままだと Heroku 側のDBが空なので、エラーになります。

なので、Heroku で rake db:migrate します。

``` bash 、Heroku で rake db:migrate する。
heroku run rake db:migrate
```

# 7. ハマった点

localでは動くのに、Herokuだとそのままだと上手くいかない場合があります。

そんな場合は、次のように`config/environments/production.rb`の設定を書き換えて、もう一度`git push heroku`しましょう。

## CSSやJSが読み込めない場合

`config/environments/production.rb` 内で `config.assets.compile = true`にします。

```diff config/environments/production.rb
   # config.assets.css_compressor = :sass
 
   # Do not fallback to assets pipeline if a precompiled asset is missed.
-  config.assets.compile = false
+  config.assets.compile = true
 
   # Generate digests for assets URLs.
   config.assets.digest = true

```

## public 以下のファイルが404になる場合

`config/environments/production.rb` 内で `config.serve_static_assets = true`にします。

```diff config/environments/production.rb
   # config.action_dispatch.rack_cache = true
 
   # Disable Rails's static asset server (Apache or nginx will already do this).
-  config.serve_static_assets = false
+  config.serve_static_assets = true
 
   # Compress JavaScripts and CSS.
   config.assets.js_compressor = :uglifier
```


# 完

これでやっと Heroku で Rails4 を動かせるようになりました。

`heroku open` で確認しましょう。
