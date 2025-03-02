+++
image = ""
toc = true
math = false
draft = false
tags = [
"VPS",
"ServersMan@VPS",
"ConoHa",
"Ubuntu",
]
title = "ServersMan@VPSからConoHaに引っ越しました"
slug = "move-from-serversman-to-conoha"
date = "2017-11-14T01:00:00+09:00"

+++

当サイト（[gam0022.net](https://gam0022.net/)）を動かしているサーバを[ServersMan@VPS](http://dream.jp/vps/)から[ConoHa](https://www.conoha.jp/)に乗り換えました。

2011/12にServersMan@VPSを契約したので、なんと6年間もお世話になりました。

ServersManさん長い間ありがとうございました。ConoHaちゃんよろしくお願いします。

# 引っ越した理由

結論から言うと、ServersMan@VPSで設定されているTCPのバッファサイズ制限が厳しすぎて、ブログ用のサーバとしての利用が困難になってきたからです。

去年頃から記事へのアクセスが増えると、アクセスが非常に遅くなったり、サーバが強制停止してsshすらできない状況が頻発していました。
特にサーバが停止されると管理画面からサーバを再起動するしかなくなり、非常に困っていました。

ServersMan@VPSではOpenVZというサーバ仮想化ソフトが使われています。
OpneVZのリソース情報は `/proc/user_beancounters` から確認できます。

<!--more-->

```
cat /proc/user_beancounters
Version: 2.5
       uid  resource                     held              maxheld              barrier                limit              failcnt
    43120:  kmemsize                 51483085             54714368  9223372036854775807  9223372036854775807                    0
            lockedpages                     0                    0                  256                  256                    0
            privvmpages                156446               413948  9223372036854775807  9223372036854775807                    0
            shmpages                    17174                18182  9223372036854775807  9223372036854775807                    0
            dummy                           0                    0  9223372036854775807  9223372036854775807                    0
            numproc                        60                  132                  480                  480                    0
            physpages                  263585               274847                    0               524288                    0
            vmguarpages                     0                    0  9223372036854775807  9223372036854775807                    0
            oomguarpages                15701                24817                26112  9223372036854775807                    0
            numtcpsock                     17                  161                  360                  360                    0
            numflock                       30                   73                  188                  206                    0
            numpty                          3                   12                   12                   12                    2
            numsiginfo                      0                   30                  192                  192                    0
            tcpsndbuf                  222624              1737856              1720320              2703360            127242887
            tcprcvbuf                  212992              1211696              1720320              2703360                    0
            othersockbuf               228888               768328              1126080              2097152                    0
            dgramrcvbuf                     0                19320               262144               262144                    0
            numothersock                  129                  360                  360                  360                   68
            dcachesize               44554051             45815590  9223372036854775807  9223372036854775807                    0
            numfile                      1098                 2485                 9312                 9312                    0
            dummy                           0                    0  9223372036854775807  9223372036854775807                    0
            dummy                           0                    0  9223372036854775807  9223372036854775807                    0
            dummy                           0                    0  9223372036854775807  9223372036854775807                    0
            numiptent                      24                   24                  256                  256                    0
```

tcpsndbufのfailcntが127242887となっており、TCPの送信バッファのサイズ制限に引っかかっていました。
tcpsndbufのlimitは2703360byte = 約2MBで、通常の使用範囲でもすぐに制限に引っかかるような設定でした。

```
resource                     held              maxheld              barrier                limit              failcnt
tcpsndbuf                  222624              1737856              1720320              2703360            127242887
```

自分の以外にも[同様のトラブルに悩んでいる人](http://causeless.hatenablog.jp/entry/2015/06/21/205731)を発見し、乗り換えることを決意しました。

# 引っ越し手順

## ブログの引っ越し

ブログの引っ越しは特にトラブルもなく完了しました。

- DTIからお名前.comにドメインの移管
  - ドメインの移管はかなり前（今年の3月）に行いました
  - DTIのサービス(UbicName)でドメインを取得しましたが、AレコードにDTIで契約中のサーバのIPアドレスしか選択できないありえない仕様でした…💢
  - 当然ながら、お名前.comでは自由にAレコードを設定できます
  - お名前.comへのドメインを移管は、DTIの管理画面から申請できました
    - [申請から24時間くらいで移管が完了](https://twitter.com/gam0022/status/837548594320179200)し、お名前.comのアカウントを発行してもらえました
- 新サーバ(ConoHa)の契約
  - 月額900円のメモリ1GBのプランを選択しました
- Webサーバの設定
  - 旧サーバ(ServersMan)では初期インストールのapacheをそのまま使っていました
  - 新サーバでは学習目的でnginxをインストールして設定しました
- 新サーバにコンテンツをデプロイ
  - 静的CMSのHugoでサイト構築しているので、静的ファイルをrsyncでアップロードするだけでした
  - 全く苦労なくできました
- ドメインのAレコードの変更
  - 旧サーバから新サーバにドメインの割当を変更しました

## その他の引っ越し

ブログの他にも、過去に作った[Ruby製のWebアプリ](https://gam0022.net/app/tmg/)や[Ruby製のTwitterのBot](https://twitter.com/daigoroubot)なども引っ越しました。

新サーバで旧サーバ（6年前）の環境を再現しようとしたものの、旧サーバのRubyのバージョンが古すぎてセキュリティ的に危険なのに加えて、C拡張のgemのビルドが失敗したりして、断念しました。

最終的にはRubyと依存gemのバージョンを最新版に上げて、コードも修正をして、なんとか新サーバで動かせるようにしました。
またnginxでCGIを使うには[FCGI Wrapの設定](https://qiita.com/gam0022/items/d16cc83a32c5c2efdefc)が必要でした。

ついでにGemfileを書いて、依存gemを管理するようにしました。

# まとめ（自戒）

- サーバ選びでは、値段やスペックだけではなく、TCPのバッファ制限なども注意しましょう
- 好きなタイミングでサーバを乗り換えできるように、ドメインは最初からお名前.comで取得しておきましょう
  - 6年前の自分にはその知識がありませんでした...
- 静的CMSは引っ越しが簡単なのでオススメです


# コメント（アーカイブ）

※Disqusのコメントをクローズしたため、アーカイブとして画像を残しました。

![Disqusのコメントのアーカイブ](/images/posts/2017-11-13-move-from-serversman-to-conoha/disqus_comments.png)
