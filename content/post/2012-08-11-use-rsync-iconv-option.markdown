---
layout: post
title: "カテゴリー名に濁点を含んだ日本語が使えない問題を解決する(Rsyncのiconvオプションを使う)"
slug: use-rsync-iconv-option
date: 2012-08-11T10:38:00+09:00
comments: true
tags:
- Octopress
- Rsync
- Mac OS X
- UTF-8-MAC
---

このブログで、カテゴリーに濁点を含んだ日本語を使うと、カテゴリーの一覧などからカテゴリーのページにリンクしたとき、
404エラーになってしまう問題が起きました。

原因は、このブログの開発環境にありました。

このブログは静的コンテンツなのですが、次のような手順でブログを運営しています。
(Rakefileで自動化されていますが、内部ではこうなっています)

* ローカル(Mac OS X)でブログを生成する。
* サーバ(Ubuntu)にRsyncで生成したブログをアップロードする。

Mac OS X では、ファイル名のエンコードに`UTF-8-MAC`を使っているので、
そのままアップロードすると、サーバ上のファイル名も`UTF-8-MAC`になります。
しかし、ファイル自体のエンコードは`UTF-8`でURLをパーセントエンコーディングしていないので、
リンク先が見つからなくなってしまうようです。

UTF-8-MAC問題について詳しく知りたい人は、[こちら](http://d.hatena.ne.jp/miau/20110805/1312555736)などが勉強になるとおもいます。

解決方法は簡単で、Rsyncでアップロードするときに、`--iconv`オプションを使い、
ファイル名を`UTF-8-MAC`から`UTF-8`に変換すれば治ります。

<!--more-->

### Rsyncのバージョンを3にする

Rsyncの`--iconv`オプションが使えるのは、Rsync3からなのでアップデートします。

```bash
# brew tap homebrew/dupes #リポジトリを追加（2019/06/20追記。この手順は不要になりました。）
brew install libiconv #iconvオプションを使うために必須のよう
brew install rsync
```

念のため、サーバ側(Ubuntu)のrsync3にします。

```bash
aptitude install rsync
```

### Rakefileを修正する

`Rakefile`の`ok_failed system...`の行を書き換えます。

```bash
desc "Deploy website via rsync"
task :rsync do
  exclude = ""
  if File.exists?('./rsync-exclude')
    exclude = "--exclude-from '#{File.expand_path('./rsync-exclude')}'"
  end
  puts "## Deploying website via Rsync"
  #ok_failed system("rsync -avze 'ssh -p #{ssh_port}' #{exclude} #{"--delete" unless rsync_delete == false} #{public_dir}/ #{ssh_user}:#{document_root}")
  ok_failed system("rsync --iconv=UTF-8-MAC,UTF-8 -avze 'ssh -p #{ssh_port}' #{exclude} #{"--delete" unless rsync_delete == false} #{public_dir}/ #{ssh_user}:#{document_root}")
end
```

### 完。

これでうまくいきました。

```bash
[gam0022@starlight:~/git/gam0022.net] $ rake deploy
## Deploying website via Rsync
sending incremental file list
deleting blog/categories/ゴ/index.html
deleting blog/categories/ゴ/atom.xml
deleting blog/categories/ゴ/
blog/categories/ゴ/
blog/categories/ゴ/atom.xml
blog/categories/ゴ/index.html

sent 11206 bytes  received 138 bytes  7562.67 bytes/sec
total size is 2309599  speedup is 203.60
OK
```

「ゴゴゴゴ…」

# コメント（アーカイブ）

※Disqusのコメントをクローズしたため、アーカイブとして画像を残しました。

![Disqusのコメントのアーカイブ](/images/posts/2012-08-11-use-rsync-iconv-option/disqus_comments.png)