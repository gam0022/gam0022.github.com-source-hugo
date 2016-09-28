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
- いくら補完があるとは言え、`@user_name`を打ち込むのが大変
- 素早く引用ができない

これらの問題を解決するGoogle Chromeの拡張を開発しました！
Chromeウェブストアから簡単に導入できます。

<div class="read-more">
  <a href="https://chrome.google.com/webstore/detail/slack-%E8%BF%94%E4%BF%A1%E5%BC%95%E7%94%A8%E3%83%9C%E3%82%BF%E3%83%B3slack-reply/cechhipifmcinmnnjnlichjigoabokbg?hl=ja" class="btn btn-primary btn-outline">Slack 返信引用ボタン(Slack Reply and Quote Button) - Chrome ウェブストア</a>
</div>

# 機能紹介

## Replayボタン

Replyボタンを使うと、特定のメッセージに対しての引用と返信を素早くできます。

![Replyボタンを使うと、特定のメッセージに対しての引用と返信を素早くできます](/images/works/slack-reply-button/replay.gif)

## Mentionボタン

Mentionボタンを使うと、引用はせずに返信のみができます。

![Mentionボタンを使うと、引用はせずに返信のみができます](/images/works/slack-reply-button/mention.gif)

## Quoteボタン

Quoteボタンを使うと、相手に通知を飛ばさずに引用のみができます。

![Quoteボタンを使うと、相手に通知を飛ばさずに引用のみができます](/images/works/slack-reply-button/quote.gif)

# 部分引用

文字を選択した状態でReplay・Quoteボタンを押すと、部分引用ができます。

![文字を選択した状態でReplayやQuoteボタンを押すと、部分引用ができます](/images/works/slack-reply-button/quote-sub.gif)

# ソースコード

GitHubで公開しています。PRをお待ちしております。

- [slack-reply-and-quote-button | GitHub.com](https://github.com/gam0022/slack-reply-and-quote-button)
