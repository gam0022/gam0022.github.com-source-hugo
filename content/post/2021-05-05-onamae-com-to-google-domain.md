+++
math = false
draft = false
tags = [
    "ドメイン", "Web", "ブログ運営"
]
title = "お名前.comからGoogleドメインに乗り換えました（2021版）"
slug = "onamae-com-to-google-domain"
date = "2021-05-06T02:00:00+09:00"
image = "/images/posts/2021-05-05-onamae-com-to-google-domain/transfer.png"
toc = true

+++

当サイト（[gam0022.net](http://gam0022.net/)）のドメイン管理の事業者を[お名前.com](https://www.onamae.com/)から[Googleドメイン](https://domains.google/intl/ja_jp/)に移管しました。

![お名前.comからGoogleドメインに移管](/images/posts/2021-05-05-onamae-com-to-google-domain/transfer.png)

ドメイン移管は思ったよりもずっと簡単で待ち時間を含めても1時間以内に完了しました。

この程度の手間だったら、もっと早くやっておけば良かったです。

移管するとドメインの更新日が1年延長されて、Googleドメインに1年分のドメイン費用を支払う形になります。

つまり、お名前.comの更新日はずっと先だったとしてもまったく問題なく移管できます。

# 移管手順

せっかくなので簡単に手順をメモしておきます。

1. お名前.comでドメインのロック解除
    - ドメイン設定 > その他の機能 > ドメイン移管ロック
    - 移管したいドメインのステータスが「OFF」になっていたら問題ありません
2. お名前.comでAuthコードを入手
    - [ドメイン詳細](https://www.onamae.com/guide/p/80)からAuthコードの[表示]ボタンを押すと表示されます
3. Googleドメインでドメイン移管手続き
    - 必要な情報を入力して進めるだけでOKです。とくに悩む要素はないと思います
        - 移管したいドメイン
        - Authコード
        - 支払い用クレジットカード
4. お名前.comでドメイン移管を承認
    - 私の場合、Googleドメイン上の操作から **30分くらい経過してから** 「【重要】トランスファー申請に関する確認のご連絡 gam0022.net」というメールが来ました
    - メールのURLから承認ボタンを押せば作業完了です

<!--more-->

AレコードやAAAAレコードなどのDNS設定も自動で引き継がれていました。

サブドメインの設定までは引き継がれなかったので手動で再設定する必要がありました。

<blockquote class="twitter-tweet" data-conversation="none"><p lang="ja" dir="ltr">お名前comからGoogleドメインに乗り換えた。<br>Aレコードなどの設定は自動で引き継がれており、有能だなぁ。 <a href="https://t.co/utmwAwougz">pic.twitter.com/utmwAwougz</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1387671139170754563?ref_src=twsrc%5Etfw">April 29, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## 参考記事

こちらの記事に画像つきで手順が書かれています。この記事が分かりにくかったら参考にすると良いと思います。

- [お名前comからgoogle domainsにドメイン移管する - Qiita](https://qiita.com/fnifni/items/0daca17e0750659f2866)

# 移管した理由

GMO社員の方もこのブログを見ることがあるかもしれないので、お名前.comを解約した理由を記しておきます。

1. お名前.comからの迷惑メールが多すぎる
2. UIが使いづらい
3. 経済的理由

## 1. お名前.comからの迷惑メールが多すぎる

1.は業界では有名な評判ですね。お名前.comからの迷惑メールは本当に多すぎます。
[お知らせメールを受信しない設定](https://tk-create.com/domain/onamae-com-mail-stop/)でしたが、「gam0022.netの期限日を定期的にご確認ください。」というメールが来ました。

**更新日は7年後の2028年でしたが、「お知らせメールの受信設定が無効となっている方にも配信されております。」とのことです。**

温厚な私でも流石にイラッとしました。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">お知らせメールの受信設定が無効となっている方にも配信されております。<br><br>じゃあないんだよ <a href="https://t.co/RgkauLvEtX">pic.twitter.com/RgkauLvEtX</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1387313503879368705?ref_src=twsrc%5Etfw">April 28, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## 2. UIが使いづらい

2.もひどいと思います。使用頻度のもっとも高いであろうDNS設定がなぜかメニューの深い階層に埋もれていて使いづらいです。
対照的にGoogleドメインはメニューがシンプルで使いやすいと感じました。

## 3. 経済的理由

3.については誤差でしたが、1年間の.netのドメインの料金を比較すると、Googleドメインの方が88円だけ節約できました。

| サービス名 | 1年間の費用（税込） | 1年間の費用（税別） |
|---|---:|---:|
| お名前.com | 1628円 | 1480円 |
| Googldドメイン | 1540円 | 1400円 |

補足すると、お名前.comでは初年度は安く、2年目以降に値上がりします。

1年目は35円と激安なのですが、2年目以降は上記の更新料がかかります。詳細はこちらを見てください。

- [ドメインの料金・種類一覧｜ドメイン取るならお名前.com](https://www.onamae.com/service/d-price/)

# まとめ

冒頭で述べたとおり、1時間もあればドメインの移管はできました。
お名前.comの迷惑メールに困っている方は、Googleドメインに乗り換えてみてはいかがでしょうか？