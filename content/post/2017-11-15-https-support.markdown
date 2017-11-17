+++
math = false
draft = false
tags = [
"ConoHa",
"Ubuntu",
"nginx",
"HTTPS",
"HTTP2"
]
title = "Let's EncryptでHTTPS対応しました"
slug = "https-support"
date = "2017-11-17T10:13:23+09:00"
image = "/images/posts/2017-11-15-https-support.png"
toc = true

+++

当サイト（[gam0022.net](https://gam0022.net/)）を[Let's Encrypt](https://letsencrypt.org/)でHTTPS対応しました。

![HTTP対応](/images/posts/2017-11-15-https-support.png)

Let's EncryptによるHTTPSの設定はcertbotというコマンドラインツールを利用しました。
nginxの設定変更でHTTP/2対応もできました。
どちらも驚くほど簡単で拍子抜けしました。

はてなブックマークの数が0にリセットされてしまいましたが、仕方がないので諦めました。

<!--more-->

# なぜHTTPS対応するのか？

先月リリースのChrome 62からすべてのHTTPページに「Not secure」と表示されるようになりました。

- [グーグル、HTTPページへの警告表示を強化へ--10月リリース予定の「Chrome 62」から](https://japan.cnet.com/article/35100589/)

Qiitaも9月末にHTTPS対応をしていました。

- [QiitaをHTTPS化しました](http://blog.qiita.com/post/165860481859/qiita-https)

当サイトはブログという形態なので、利用者が個人情報を入力することはほとんど考えられません。

しかし、少なくともGoogleは常時SSLを重要視しており、主要サイトもHTTPS化を進めているみたいなので、個人的な勉強を兼ねてHTTPSの設定に挑戦しました。

# Let's EncryptでHTTPS対応

公式ページの説明通りの手順で簡単に設定できました。

## 環境

- OS: Ubuntu 16.04
- Webサーバ: nginx/1.10.3


## certbotのインストール

[公式ページ](https://certbot.eff.org/#ubuntuxenial-nginx)の手順通りにapt-get経由でcertbotをインストールしました。

```bash
sudo apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python-certbot-nginx
```

## certbotの実行

次のコマンドを実行すると、SSLの証明書の取得とnginxの設定の反映を自動で行ってくれます。
対話的なツールになっていて、HTTPSの設定について質問されるので、それに答えていけばOKです。

```bash
sudo certbot --nginx
```

### 事前準備

自分は事前にnginxの設定ファイルにドメイン名を明示しておきました。

ドメイン名を明示すると、`sudo certbot --nginx` でSSL化したいドメインを選択できるようになります。

`/etc/nginx/sites-available/default` の `server` ブロック内

```diff
server {
    listen 80 default_server;
    listen [::]:80;
@@
-   server_name _;
+   server_name gam0022.net;
@@
}
```

### 事後確認

`sudo certbot --nginx` を実行すると、SSLための設定がnginxの設定ファイルに自動で追加されます。
基本的なSSLの設定に加えて、httpでアクセスした場合にhttpsにリダイレクトする設定が追加されます。

`/etc/nginx/sites-available/default` の `server` ブロック内

```diff
server {
    listen 80 default_server;
    listen [::]:80;
@@
+   listen 443 ssl; # managed by Certbot
+   ssl_certificate /etc/letsencrypt/live/gam0022.net/fullchain.pem; # managed by Certbot
+   ssl_certificate_key /etc/letsencrypt/live/gam0022.net/privkey.pem; # managed by Certbot
+   include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
+   ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
+
+
+   if ($scheme != "https") {
+       return 301 https://$host$request_uri;
+   } # managed by Certbot
}
```

最後にnginxを再起動すればOKです。

systemdを使っているなら `systemctl restart nginx`で再起動できます。

## コンテンツの修正

サーバのHTTPS対応は簡単だったのですが、[Mixed Content問題](https://developers.google.com/web/fundamentals/security/prevent-mixed-content/what-is-mixed-content?hl=ja)の対応はすこし面倒でした。

> 最初の HTML が安全な HTTPS 接続で読み込まれ、その他のリソース（画像、動画、スタイルシート、スクリプトなど）が安全ではない HTTP 接続で読み込まれると、混合コンテンツが発生します。 これが混合コンテンツと呼ばれるのは、同じページを表示するために HTTP と HTTPS 両方のコンテンツが読み込まれているためで、最初のリクエストは HTTPS で保護されています。 最新のブラウザでは、この種のコンテンツに関する警告が表示され、このページに安全でないリソースが含まれていることがユーザーに示されます。

基本的に`http://`を`//`に置換すれば対応できました（[詳細](https://github.com/gam0022/gam0022.net-hugo/pull/9)）。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">Let&#39;s Encryptで <a href="https://t.co/IrODakXG9W">https://t.co/IrODakXG9W</a> をhttps対応できたけど、はてなブックマークのブログパーツがhttps非対応ですべてが台無しになった <a href="https://t.co/WQu7AuHvrV">pic.twitter.com/WQu7AuHvrV</a></p>&mdash; がむ😇 (@gam0022) <a href="https://twitter.com/gam0022/status/927552176628441088?ref_src=twsrc%5Etfw">2017年11月6日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

はてなブックマークのブログパーツはHTTPSとして読み込めなかったので、プラグインを削除しました。

2017/11/16現在もはてなブログはHTTPS非対応ですし、はてなのHTTPS対応は後手に回っている印象があります。
[こういう記事](http://staff.hatenablog.com/entry/2017/09/25/143000)もありますが、何か進展はあるのでしょうか？

## はてなブックマーク数の移行は断念

すべての記事のURLが変わったので、はてなブックマーク数は0にリセットされました。

[QiitaのHTTPS対応の記事](http://blog.qiita.com/post/165860481859/qiita-https)によると、
**有償で** 移行できるらしいのですが、そこまでコストをかける意味は無いと思ったので諦めました。

> また一時的にはてなブックマーク数も 0 にリセットされていますが、はてなブックマークに関しては、はてなさんに移行して頂く予定です。移行が完了するまでの間ブックマーク数が少なく表示されてしまいますが、ご理解のほどよろしくお願いいたします。

## 証明書の自動更新

Let's Encryptで取得したSSL証明書の有効期限はわずか90日です。

crontabで毎月1日の5時にSSL証明書の自動更新するようにしました。

```
0 5 1 * * /usr/bin/certbot renew && /bin/systemctl reload nginx
```

# HTTP/2対応

HTTPSのついでにHTTP/2も対応しました。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">HTTP/2対応はあっさりできた / <a href="https://t.co/IrODakXG9W">https://t.co/IrODakXG9W</a> supports HTTP/2. Tested by <a href="https://t.co/RtMlmm7glD">https://t.co/RtMlmm7glD</a> <a href="https://twitter.com/hashtag/http2?src=hash&amp;ref_src=twsrc%5Etfw">#http2</a> <a href="https://twitter.com/hashtag/webperf?src=hash&amp;ref_src=twsrc%5Etfw">#webperf</a></p>&mdash; がむ😇 (@gam0022) <a href="https://twitter.com/gam0022/status/927588898850533376?ref_src=twsrc%5Etfw">2017年11月6日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## nginxのバージョン確認

[nginx/1.9.5以降からHTTP/2をサポート](https://www.nginx.com/blog/nginx-1-9-5/)しています。

何も考えずにapt-get経由でnginxをインストールしたのですが、
バージョンは1.10.3で`--with-http_v2_module`でビルドされていたので、何もすることはありませんでした。

```
nginx -V
nginx version: nginx/1.10.3 (Ubuntu)
built with OpenSSL 1.0.2g  1 Mar 2016
TLS SNI support enabled
configure arguments: --with-cc-opt='-g -O2 -fPIE -fstack-protector-strong -Wformat -Werror=format-security -Wdate-time -D_FORTIFY_SOURCE=2' --with-ld-opt='-Wl,-Bsymbolic-functions -fPIE -pie -Wl,-z,relro -Wl,-z,now' --prefix=/usr/share/nginx --conf-path=/etc/nginx/nginx.conf --http-log-path=/var/log/nginx/access.log --error-log-path=/var/log/nginx/error.log --lock-path=/var/lock/nginx.lock --pid-path=/run/nginx.pid --http-client-body-temp-path=/var/lib/nginx/body --http-fastcgi-temp-path=/var/lib/nginx/fastcgi --http-proxy-temp-path=/var/lib/nginx/proxy --http-scgi-temp-path=/var/lib/nginx/scgi --http-uwsgi-temp-path=/var/lib/nginx/uwsgi --with-debug --with-pcre-jit --with-ipv6 --with-http_ssl_module --with-http_stub_status_module --with-http_realip_module --with-http_auth_request_module --with-http_addition_module --with-http_dav_module --with-http_geoip_module --with-http_gunzip_module --with-http_gzip_static_module --with-http_image_filter_module --with-http_v2_module --with-http_sub_module --with-http_xslt_module --with-stream --with-stream_ssl_module --with-mail --with-mail_ssl_module --with-threads
```

## nginxの設定の変更

`server` ブロック内の `listen` ディレクティブにhttp2を足すだけでOKでした。

`/etc/nginx/sites-available/default` の `server` ブロック内

```diff
server {
    listen 80 default_server;
    listen [::]:80;
@@
-   listen 443 ssl; # managed by Certbot
+   listen 443 ssl http2; # managed by Certbot
+   listen [::]:443 ssl http2;
@@
}
```

## 読み込み速度について

Chromeの開発者ツールで確認しましたが、読み込み速度はHTTP/1.1から変化なしでした。

ページ構成をHTTP/2用に最適化しないと効果は薄いのかもしれません。

# まとめ

Let's Encrypt(certbot)でHTTPS対応は簡単にできるので、みんやなればいいと思いました。

はてなのサービスのHTTPS対応が遅いので、なんとかして欲しいです。
