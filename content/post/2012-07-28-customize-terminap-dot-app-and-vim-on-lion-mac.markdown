---
layout: post
title: "Linux(Ubuntu)からOS Xへ開発環境を移すときにしたこと"
date: 2012-07-28 00:01
comments: true
categories: 
- Mac OS X
- Lion
- Terminal.app
- vim
- homebrew
- git
---

とりあえず次のような感じになりました。

* ターミナル
:Terminal.app
* エディタ
:vim
* パッケージ管理システム
:homebrew
* バージョン管理システム
:git

Mac初心者が躓かないように、この順番で作業すればうまくいくという順番で紹介していきます。

## Terminal.app

Terminal.appはMacOSに標準で入っている端末です。

最終的にはこんな感じになりました。

{% img http://gam0022.net/images/2012.7.28&#95;terminal.png Terminal.app %}

### 外観を変える

外観を変えるために、`環境設定 > 設定`でProという設定を使うことにしました。

フォントを`Monaco 13pt.`にして、`テキストをアンチエイリアス処理`を有効にしました。

### .bash&#95;profile を設定する

これまでの常識では、`~/.bashrc`に書いた設定が端末の起動時に読み込まれるものと思っていたのですが、
macの場合は`~/.bashrc`は無効になっており、ログイン時だけ`~/.bash_profile`が読み込まれるようです。

**要するにMacのTerminalの設定は`~/.bash_profile`に書けばいいということです。**

設定の反映が必要であれば`$ source ~/.bash_profile`を実行すればいいことなので、
ログイン時でも端末起動時でもそれほど影響はないです。

前の環境の`.bashrc`は禍々しくて見せられませんが、`.bash_profile`をこんな感じで書いていきます。

{% codeblock lang:bash %}
# パスの設定とか
export PATH=$PATH:$HOME/bin

# 便利なエイリアスとか
alias ll='ls -alF'
alias l='ls'
alias emacs='vim'

# lsに色を付ける => http://jmblog.jp/archives/307
export CLICOLOR=1
export LSCOLORS=DxGxcxdxCxegedabagacad

# プロンプトも色を付ける
PS1='\[\033[36m\][\u@\h:\[\033[33m\]\w\[\033[36m\]]\[\033[0m\] \$ '
{% endcodeblock %}

### exitでタブやウィンドウを閉じるようにする

なぜかデフォルトでは`exit`しても画面が残ってしまうので、設定を変えます。

`~/Library/Preferences/com.apple.Terminal.plist`の`Root > Window Settings > (任意のテーマ) > shellExitAction`の値を`1`(Number)に変更します。

[Mac OSXでTerminalをexitしたら閉じるようにする方法](http://havelog.ayumusato.com/develop/others/e180-mac-terminal-exit2close.html)を参考しました。

### コンピュータ名を変更する

`システム環境設定 > 共有`からコンピュータ名を変更できます。

私は`silent`とかいう適当な名前を付けました。静音性が高いといいなという願いを込めて。

## gccをインストール

gccがないとパッケージ管理システムでコンパイルができないので、
最初にgccは入れておくべきです。

### Xcodeからgccをインストールする方法。

これでgccが使えるようになりますが、LLVMベースのgccが入ってしまい、
[rvmがうまく動かなくなった](http://gam0022.net/blog/2012/07/27/getting-started-with-ruby-on-rails-on-mac/)りして厄介かもしれません。

(でもMacを入手したら、Xcode使ってみたいですよね。)

1. XcodeをAppStoreからインストールする。
2. Xcode-> Preferences-> Downloads から、Command Line Tools をインストールする。

### osx-gcc-installerからgccをインストールする方法

試してませんが、[インストーラ](https://github.com/kennethreitz/osx-gcc-installer/)があるので簡単に導入できるのではないかと思います。

## homebrewをインストール

パッケージ管理システムにはhomebrewを使うことにしました。

[公式](https://github.com/mxcl/homebrew/wiki/installation)のコピペですが、これを叩けばhomebrewをインストールできます。

{% codeblock lang:bash %}
$ ruby <(curl -fsSk https://raw.github.com/mxcl/homebrew/go)
{% endcodeblock %}

MacにはRuby1.8が最初から入っているので、心配は不要です。(しかし1.8かよ)

## gitをインストール

homebrewが入ったら、gitのインストールは簡単です。

`brew install git`で終わりです。

このあと紹介するVundleが良い例ですが、gitを使う機会は割と多いです。

## Vim

### Vimの設定の移行

前の環境ではvimのプラグインを[vundle](https://github.com/gmarik/vundle/)で管理していたので、
これだけでVimの環境は引き継げました。

1. 前の環境の`.vimrc`を`~/`にコピー。
2. `$ git clone https://github.com/gmarik/vundle.git ~/.vim/bundle/vundle`
3. `$ vim +BundleInstall +qall`

Vundleマジ神。

### カラースキマーの設定

Ubuntuでは特に設定をしなくてもvimに色がついてたんですが、
どこでカラースキマーが定義されていたんでしょうかね。

私は[desert.vim](http://www.vim.org/scripts/script.php?script_id=105)というカラースキマーを入れました。手順はこんな感じ。

1. `desert.vim`をダウンロードする。
2. `~/.vim/colors`に`mv`する。
3. 以下を`~/.vimrc`に書き加える。
{% codeblock lang:vim %}
syntax on
colorscheme desert
{% endcodeblock %}


これで最低限文化的なMac環境ができました。
