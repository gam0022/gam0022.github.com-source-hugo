---
layout: post
title: "ServersMan@VPSでRubyのCGIを実行するまでのメモ"
date: 2012-07-26 00:11
comments: true
categories:
- Apache
- ServersMan@VPS
- Ruby
- CGI
---

ServersMan@VPS(Ubuntu)でRubyのCGIを実行するまでのメモです。

## apache2をインストールする

apt-getかaptitudeでインストールすればいいと思います。

{% codeblock lang:bash %}
sudo aptitude install apache2	
{% endcodeblock %}

## AddHandlerを設定する

`/etc/apache2/mods-enabled/mime.conf`にAddHandlerを設定します。

`#AddHandler cgi-script .cgi`という行があるので、
見つけてコメントアウトを解除して、次のように書き換えればいいと思います。

{% codeblock %}
AddHandler cgi-script .cgi .rb
{% endcodeblock %}

## Options +ExecCGIを設定する

`/etc/apache2/sites-available/default`でOptions +ExecCGIを設定します。

{% codeblock %}
<Directory /var/www/html/>
	#Options Indexes FollowSymLinks MultiViews 
	Options Indexes FollowSymLinks MultiViews ExecCGI
	AllowOverride None
	Order allow,deny
	allow from all
</Directory>
{% endcodeblock %}


## apache2を再起動する

上の2つのファイルを編集したら、apacheを再起動して設定を反映させます。

{% codeblock lang:bash %}
sudo /etc/init.d/apache2 restart	
{% endcodeblock %}

## Ruby CGIのパーミッションを755にする

{% codeblock lang:bash %}
cd /var/www/html
chmod 755 test.rb
{% endcodeblock %}

これでたぶん動くようになります。

ね？簡単でしょ？

## うまくいかないときは

`/var/log/apache2/error.log`のエラーメッセージを見ましょう。
