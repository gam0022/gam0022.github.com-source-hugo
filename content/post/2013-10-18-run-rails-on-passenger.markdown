---
layout: post
title: "Rails4をPassengerで動かす"
date: 2013-10-18 00:13
comments: true
categories: 
- Rails
- Passenger
---

RailsをPassengerを使ってVPSで動かすまでにハマったことなどをメモします。

自分用のメモ程度の記事なので、あくまで参考程度にお願いします。

Railsのサーバ環境を作るのは難しいというイメージがありましたが、結果的には Passenger の指示通りにやればなんとかなりました。

- Passenger をインストールする。
  - 古い情報らしいですが、Passenger のインストールについては、[このページ](http://redmine.jp/tech_note/apache-passenger/)が参考になる。
  - `$ gem install passenger`
  - `$ passenger-install-apache2-module`
    - 上を実行すると、必要なパッケージが足りてないというエラーがでるので、パッケージ管理システムなどを使ってインストールする。
  - インストールが成功すると、LoadModule などの設定やvirtualhostの設定のサンプルが表示されるので、メモしておく。

```
LoadModule passenger_module /usr/local/rvm/gems/ruby-2.0.0-p247/gems/passenger-4.0.14/buildout/apache2/mod_passenger.so
PassengerRoot /usr/local/rvm/gems/ruby-2.0.0-p247/gems/passenger-4.0.14
PassengerDefaultRuby /usr/local/rvm/wrappers/ruby-2.0.0-p247/ruby
```

```
<VirtualHost *:80>
  ServerName www.yourhost.com
  # !!! Be sure to point DocumentRoot to 'public'!
  DocumentRoot /somewhere/public
  <Directory /somewhere/public>
    # This relaxes Apache security settings.
    AllowOverride all
    # MultiViews must be turned off.
    Options -MultiViews
  </Directory>
</VirtualHost>
```

- VPSのAレコードの設定をして、サブドメインを使えるようにする。
  - [DTI](http://dream.jp/) のServerman@VPSのUbicNameでドメインを取っている場合、負荷分散設定というのでDNSレコードを設定できる。

- Railsのプロジェクトをサーバの適当な場所に配置する。

- Apache の設定。
  - 念のため、Ubuntuのapache2の場合です。
  - 極論から言うと、ちゃんと Include された設定ファイルに Passenger のインストールの時にメモされたものを貼り付けておけば問題ない。
  - 私はこのようにしました。
    - `/etc/apache2/sites-available/default` に `VirtualHost` の設定を書く。当然だが、ServerNameやDirectoryは書き換える。
    - `/etc/apache2/mods-available/passenger.load` に `LoadModule passenger_module` の行を追加。
    - `/etc/apache2/mods-available/passenger.conf` に `PassengerRoot` と `PassengerDefaultRuby` の行を追加。
    - `/etc/apache2/mods-enabled/` に上へのシンボリックリンクを貼る。

``` bash
cd /etc/apache2/mods-enabled/
ln -s /etc/apache2/mods-available/passenger.load ./passenger.load
ln -s /etc/apache2/mods-available/passenger.conf ./passenger.conf
```

- Appacheの再起動をする。
  - `$ sudo /etc/init.d/apache2 restart`

- これで動くはずだったが、ブラウザで動作を確認すると、Passenger がエラーを出していた。
  - `Could not find a JavaScript runtime.` とか言われたら、こうする。
    - `gem 'therubyracer'` を Gemfileに追加。
    - `$ bundle install` 
      - ちなみに `therubyracer`はすごい容量がでかいので、bundle install にものすごく時間がかかった。

- やっとできたとおもったら、今度は Rails のエラー。
  - production用のDBをmigrateしてないだけだった。
    - `$ rake db:migrate RAILS_ENV=production`


とりあえず、これで Rails を Passenger で動かすことが出来ました。めでたしめでたし。
