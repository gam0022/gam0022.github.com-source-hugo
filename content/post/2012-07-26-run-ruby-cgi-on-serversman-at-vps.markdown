---
layout: post
title: "ServersMan@VPSでRubyのCGIを実行するまでのメモ"
slug: run-ruby-cgi-on-serversman-at-vps
date: 2012-07-26T00:11:00+09:00
comments: true
tags:
- Apache
- ServersMan@VPS
- Ruby
- CGI
---

ServersMan@VPS(Ubuntu)でRubyのCGIを実行するまでのメモです。

## apache2をインストールする

apt-getかaptitudeでインストールすればいいと思います。

```bash
sudo aptitude install apache2	
```

## AddHandlerを設定する

`/etc/apache2/mods-enabled/mime.conf`にAddHandlerを設定します。

`#AddHandler cgi-script .cgi`という行があるので、
見つけてコメントアウトを解除して、次のように書き換えればいいと思います。

```
AddHandler cgi-script .cgi .rb
```

## Options +ExecCGIを設定する

`/etc/apache2/sites-available/default`でOptions +ExecCGIを設定します。

```
<Directory /var/www/html/>
	#Options Indexes FollowSymLinks MultiViews 
	Options Indexes FollowSymLinks MultiViews ExecCGI
	AllowOverride None
	Order allow,deny
	allow from all
</Directory>
```


## apache2を再起動する

上の2つのファイルを編集したら、apacheを再起動して設定を反映させます。

```bash
sudo /etc/init.d/apache2 restart	
```

## Ruby CGIのパーミッションを755にする

```bash
cd /var/www/html
chmod 755 test.rb
```

これでたぶん動くようになります。

ね？簡単でしょ？

## うまくいかないときは

`/var/log/apache2/error.log`のエラーメッセージを見ましょう。
