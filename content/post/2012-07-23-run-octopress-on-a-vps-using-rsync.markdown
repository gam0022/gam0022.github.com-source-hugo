---
layout: post
title: "Rsyncを使ってOctopressをVPS上で公開する"
date: 2012-07-23 10:02
comments: true
categories: 
- Octopress
- VPS
- Rsync
- ServersMan@VPS
---

今回もOctopressに関する記事です。

先日、Octopressを使ってGithubPages上にブログを運営しましたが、
気が変わってレンタルしているVPS上で運営したくなりました。

Octopressでは`rake deploy`を叩くだけでRsyncを使い自分のサーバ上にコンテンツを同期することができるので、
その方法を紹介したいと思います。

Rsyncを使って同期するためには次の2つの作業をする必要があります。

1. 公開鍵認証を使ってsshでログインできるようにする。
2. サーバ側の`~/.ssh/authorized_keys`にローカル側の公開鍵を登録する。

ここでは、serverという名前のサーバに作成済みのuserというユーザを使って、公開鍵でログインするようにするまでの手順を紹介します。

# ローカル側の設定(鍵のペアの生成)

まず、ローカル側で鍵のペアの生成します。

``` bash 
cd ~/.ssh
ssh-keygen -t rsa # RSAの鍵のペアを生成する。save the keyは空白でOK。パスフレーズは任意のものを指定する。
cat id_rsa.pub # 公開鍵はサーバのauthorized_keysに後で登録するので表示しておく
```

# サーバ側の設定

## 公開鍵の登録

``` bash
vim ~/.ssh/authorized_keys # 上で表示したローカル側のid_rsa.pubを最後の行に追加する。(ファイルがなければ作る)
```

## sshの設定

vimなどで、サーバ側の`/etc/ssh/sshd_config`を編集します。
間違った設定をすると最悪sshでログインできなるので注意しましょうw

私の場合はこのような感じに**一部を書き換えました。**
この記事を書いている私ですが、サーバの設定は初心者なので、あまり信用しないようにしましょうw
あくまで参考程度で。

```
AllowUsers user
RSAAuthentication yes 
PubkeyAuthentication yes 
AuthorizedKeysFile   %h/.ssh/authorized_keys
```

VPS上の設定が終わったら、sshdを再起動します。

``` bash
/etc/init.d/ssh restart
```

# 再びローカル側の設定(sshのテスト)

以上で公開鍵を使ってsshをする準備が整ったので、テストしてみます。

``` bash
cd ~/.ssh
chmod 600 id_rsa # パーミションが600でないと「WARNING: UNPROTECTED PRIVATE KEY FILE!」というエラーになる。
ssh -i id_rsa user@server #これでログインできれば成功。-iで秘密鍵を指定できる。
```

# Octopressの設定

ここまで来れば、あとはOctopressの設定だけです。`Rakefile`を編集します。

私の場合、GithubPages用にRakeFileを設定してしまったので、書き直します。

``` ruby
## -- Rsync Deploy config -- ##
# Be sure your public key is listed in your server's ~/.ssh/authorized_keys file
ssh_user       = "user@server"
ssh_port       = "1234" #普通は22ですが、セキュリティ上の理由で(
document_root  = "/var/www/html/" #htmlの公開用のディレクトリを指定。ServersMan@VPSならこの設定でいいはず。
rsync_delete   = true
#deploy_default = "push"
deploy_default = "rsync" #rsyncで同期します。
```

これで設定は終わりです。

`rake deploy`でファイルが同期できたら成功です。

---

参考記事
:[Deploying With Rsync](http://octopress.org/docs/deploying/rsync/)
