+++
toc = true
math = false
draft = false
tags = [
    "Hugo", "Web", "ブログ運営", "Windows"
]
title = "HugoをGitHub Pagesで公開する"
slug = "hugo-on-github-pages"
date = "2022-05-07T20:05:08+09:00"
image = "/images/posts/2022-05-07-hugo-on-github-pages/thumbnail.png"

+++

本サイトのホスト先をConoHa VPSからGitHub Pagesに乗り換えました。

実は去年の5月に乗り換えていて、1年ほど運用して方針が固まったので記事にしました。

![Hugo on GitHub Pages](/images/posts/2022-05-07-hugo-on-github-pages/thumbnail.png)

<!--more-->

## VPS→GitHub Pagesの移行理由

お金です。費用の削減が目的です。

ConoHa VPSは月額1000円ほどの固定費がかかっていましたが、GitHub Pagesは無料です。

また、VPSだと急にブログにアクセスが増えた場合にスケールしづらい・費用がかかるなどの懸念もありました。

## HugoをGitHub Pagesにホスティングする

GitHub Pagesは、GitHubが静的ウェブページのためのウェブホスティングサービスです。
HTMLやCSSなどの静的ファイルをGitHubのリポジトリにコミットすることで静的サイトを公開できます。

さらに特定のブランチやディレクトリをサイトのルートとして指定できます。

ディレクトリ指定を考慮すると、大きく分けて2つのリポジトリ構成が考えられます。

1. リポジトリ1つ構成
    - Hugoのpublicディレクトリ以下を公開する設定
2. リポジトリ2つ構成（こっちを採用！！）
    - Hugoのプロジェクト（記事のマークダウンやHugoテンプレートなど）のリポジトリ
    - Hugoの生成物（HTMLやCSSなどの公開用の静的コンテンツ）のリポジトリ

私は2.のリポジトリ2つ構成に落ち着きました。

1.の方がシンプルですが、コミットの差分が多くなってしまい、文章校正などがやりづらいと思ったからです。

具体的には以下の2つのリポジトリ構成にしました。

1. https://github.com/gam0022/gam0022.github.com-source-hugo
    - Hugoのマークダウンなどのソース用のリポジトリ
    - 2. のリポジトリをsubmodule化
2. https://github.com/gam0022/gam0022.github.com
    - HugoのHTMLなどの生成物用のリポジトリ

2リポジトリ構成ではコミットが面倒という問題がありました。

そこで簡単な.batを書いて、バッチを叩くだけで自動的に2リポジトリのcommitとpushができるようにしました。
Windowsを利用している人は参考にしてください。

[deploy.bat](https://github.com/gam0022/gam0022.github.com-source-hugo/blob/master/deploy.bat)

```bat
:: コミットメッセージ
set msg="Build %date% %time%"

pushd public

:: publicディレクトリを掃除
git fetch -p
git checkout -B master origin/master

popd

:: HTMLを生成
hugo.exe

pushd public

:: HTML生成物をコミット
git add .
git commit -m %msg%
git push origin HEAD

popd

:: ソースをコミット
git add .
git commit -m %msg%
git push origin HEAD
```

## カスタムドメインとSSL化

現在は独自ドメインのSSL化も簡単にできます。以前はCloudFlare等のCDNが必要でしたが、現在はCDNも不要です。

設定は2つだけです。

1. GitHub側の設定
2. ドメインの管理ページ側のAレコード・CNAMEの設定

この記事の情報が古くなっている可能性もあるので、最新の情報は公式マニュアルも参照してください。

[GitHub Pages サイトのカスタムドメインを管理する](https://docs.github.com/ja/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)

### GitHub側の設定

リポジトリの `Settings > Pages > Custom domain` からカスタムドメインを指定できます。

SSL証明書の更新まで自動的にGitHub Pages側でやってくれるので、本当にこれだけしかやることがないです。

SSL化したい場合には、 `Enforce HTTPS` にチェックします。

マニュアルにも書かれていますが、DNSやHTTPSの変更が伝播するには、最大24時間かかるそうです。

![GitHub側の設定](/images/posts/2022-05-07-hugo-on-github-pages/github-custom-domain.png)

### ドメインの管理ページ側のAレコード・CNAMEの設定

CNAMEとAレコードを設定して問題なく運用できています。

筆者はあまりネットワークに詳しくないので、間違っていたら教えてください。

Aレコード

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

CNAME

```
gam0022.github.io.
```

![Google Domain](/images/posts/2022-05-07-hugo-on-github-pages/google-domain.png)

## まとめ

Hugoのホスト先をVPSからGitHub Pagesに移行して固定費削減できました。

VPSではrsyncで即時に反映されていたのが、GitHub Pagesにしてから反映に数分かかるなど細かい不満はありますが、無料で使えているので許容範囲かなと思っています。

はてなブログなどのブログサービスへの移行も検討したことも過去にありますが、特定のサービスに依存したくないという考えから現在の構成に落ち着いています。

企業やサービスの寿命を考えると、10年後や20年後まで存続しているのか分からないので、特定の企業やサービスにロックインしたくありません。

その点で静的CMS + 適当なサービスにホスティングがブログの持続性（サービス終了のリスク回避）では最強だと考えています。

もしGitHub Pagesがサービス終了したとしても、その時はまたVPSにホスティングすれば良いだけです。

完全に余談ですが、ドメインは10年更新にしているので、筆者が死亡したとしてもしばらくサイトは消えないと思います。

それでは！