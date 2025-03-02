+++
date = "2016-09-28T10:08:44+09:00"
draft = false
image = ""
math = false
slug = "slack-reply-and-quote-button"
title = "Slackに返信・引用ボタンを追加するChrome拡張"
toc = true
+++

<img alt="Slack Reply Button" src="/images/works/slack-reply-button/icon.png" class="right">

Slackを使っていて、こんな不便を感じたことはありませんか？

- 特定のメッセージに対して返信したいのに、返信ボタンが無い…
- いくら補完があるとは言え、`@user-name`を打ち込むのが大変
- 素早く引用ができない

これらの問題を解決するGoogle Chromeの拡張を開発しました！
Chromeウェブストアから簡単に導入できます。

<div class="read-more">
  <a href="https://chrome.google.com/webstore/detail/slack-%E8%BF%94%E4%BF%A1%E5%BC%95%E7%94%A8%E3%83%9C%E3%82%BF%E3%83%B3slack-reply/cechhipifmcinmnnjnlichjigoabokbg?hl=ja" class="btn btn-primary btn-outline">Slack 返信引用ボタン(Slack Reply and Quote Button) - Chrome ウェブストア</a>
</div>

# 機能紹介

以下の3種類のボタンがあります。

2. Mentionボタンを使うと、返信ができます。
1. Replyボタンを使うと、引用+返信を素早くできます。
3. Quoteボタンを使うと、引用のみができます。

また、文字を選択した状態でReplay・Quoteボタンを押すと、部分引用ができます。

## 返信ボタン / Mention Button

Mentionボタンを使うと、返信ができます。

![Mentionボタンを使うと、引用はせずに返信のみができます](/images/works/slack-reply-button/mention.gif)

## 返信+引用ボタン / Replay Button

Replyボタンを使うと、引用+返信を素早くできます。

![Replyボタンを使うと、特定のメッセージに対しての引用と返信を素早くできます](/images/works/slack-reply-button/replay.gif)

## 引用ボタン / Quote Button

Quoteボタンを使うと、引用のみができます。

![Quoteボタンを使うと、相手に通知を飛ばさずに引用のみができます](/images/works/slack-reply-button/quote.gif)

## 部分引用

文字を選択した状態でReplay・Quoteボタンを押すと、部分引用ができます。

![文字を選択した状態でReplayやQuoteボタンを押すと、部分引用ができます](/images/works/slack-reply-button/quote-sub.gif)

## Tips

- Replyボタンの引用は、> による引用となります
- Replyボタンの引用は、4行以上または装飾のあるメッセージに対してはURLでの引用になります
- Quoteボタンの引用は、URLでの引用になります

# ソースコード

GitHubで公開しています。PRをお待ちしております。

- [slack-reply-and-quote-button | GitHub.com](https://github.com/gam0022/slack-reply-and-quote-button)

# バージョンアップ方法

Slackのバージョンアップによって拡張が動かなくなった場合には、拡張のアップデートの適用によって治る場合があります。

以下の手順で拡張をアップデートしてください。

## 1. Chromeの拡張機能の管理画面を開きます

`メニュー > その他のツール > 拡張機能`を選択します。

![Chromeの拡張機能の管理画面を開きます](/images/works/slack-reply-button/update-1.png)

## 2. 更新を行います

1. 「デベロッパーモード」をONにします
2. 「拡張機能を今すぐ更新」ボタンをクリックします

![Chromeの拡張機能の管理画面を開きます](/images/works/slack-reply-button/update-2.png)

以上の手順でChromeの拡張のアップデートが完了します。

# 編集履歴

- 2016/12/26: [Qiitaに記事を書きました](http://qiita.com/gam0022/items/9cce1d118bc42dc0e212)
- 2017/12/24: バージョンアップ方法を追記しました

# コメント（アーカイブ）

※Disqusのコメントをクローズしたため、アーカイブとして画像を残しました。

![Disqusのコメントのアーカイブ](/images/works/slack-reply-button/disqus_comments.png)