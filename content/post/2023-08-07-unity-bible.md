+++
date = "2023-08-07T10:00:00+09:00"
image = "/images/posts/2023-08-07-unity-bible/thumbnail.jpg"
toc = true
math = false
draft = false
tags = [
    "Unity", "出版", "Raymarching", "Shader", "シェーダー", "書籍", "ボーンデジタル"
]
title = "『Unityバイブル R5夏号』の「Shader Graphの基本操作から発展的なテクニックまで」を執筆しました"
slug = "unity-bible"

+++

8/29発売の[『Unityバイブル R5夏号』](https://amzn.to/3QzV4me)のSECTION 01「Shader Graphの基本操作から発展的なテクニックまで」を執筆しました。

[![『Unityバイブル R5夏号』](/images/posts/2023-08-07-unity-bible/thumbnail.jpg)](/images/posts/2023-08-07-unity-bible/thumbnail.png)

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=gam00220c-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4862465684&linkId=c3575812bc16a75ff5f4ccf46ea0671e"></iframe>

<!--more-->

## Unityバイブル R5夏号

株式会社ボーンデジタルより販売されている「Unityバイブル」シリーズが、年2回の定期刊になりました。

本書が最初の定期刊として、8月29日に発売されます。

この号では、「10名の著者による至極の10テーマ」が取り上げられています。

- 高品質なグラフィックスを表現するためのUniversal RPの各種機能の解説
- Shader Graphの基本操作から発展的なテクニックまで
- TimelineでUIとキャラクターの演出をつけてみよう
- Photon Fusionによるリアルタイムネットワークゲーム
- Unity Localizationを使ってゲームを多言語化してみよう
- ゲームプレイの自動テスト
- .NET向けIDE「JetBrains Rider」の活用【前編】
- Editor拡張で作業効率を上げよう
- すぐに使えるゲームサウンド演出
- VRアプリケーションにおけるVRMアバターの導入

前回の[『Unityゲーム プログラミング・バイブル 2nd Generation』](https://gam0022.net/blog/2021/06/08/unity-bible2/)は1000ページ超えの厚さで「鈍器」とも言われていましたが、本書はテーマを厳選して300ページに凝縮されたボリュームに仕上がりました。
1テーマあたり約30ページとなり、各テーマの掘り下げも十分です。

## Shader Graphの基本操作から発展的なテクニックまで

10のテーマのうち、「Shader Graphの基本操作から発展的なテクニックまで」というセクションを私が担当しました。

[![Shader Graphの基本操作から発展的なテクニックまで](/images/posts/2023-08-07-unity-bible/Collage3.png)](/images/posts/2023-08-07-unity-bible/Collage3.png)

> SDユニティちゃん ©Unity Technologies Japan/UCL

このセクションでは初心者向けの基本的な使い方から、Custom Functionなどの発展的なテーマまで幅広く扱いました。

Shader Graphを使う上で覚えおきたい重要なポイントをピックアップし、30ページにわたって丁寧に解説しています。

以下がセクションの見出しです。

- Shader Graphとは？
    - コラム：Shader Graph vs ShaderLab
- Shader Graphの基本画面
- サンプル1：基本操作とPBRテクスチャ対応シェーダー
    - TIPS：Ridirect Nodeでエッジを整理しよう
- サンプル2：ディゾルブシェーダー
    - TIPS：BackboardのCategory機能でプロパティを整理しよう
    - TIPS：Sticky Noteでコメントを残そう
    - TIPS：Group Selectionでノードをまとめよう
- サンプル3：ToonシェーダーとCustom Function
    - TIPS：Sub Graphで機能を再利用しよう
- サンプル4：プロシージャルテクスチャ
- サンプル5：ポストエフェクト
- このセクションのまとめと次のステップ
    - シェーダーとデモシーン

Shader Graphの各機能をバランスよくマスターするための、5つの小規模なサンプルを用意しました。

（2023-08-14追記）サンプルコードをGitHubで公開しました。

- [github.com/gam0022/UnityBibleR5Summer-ShaderGraphTutorial](https://github.com/gam0022/UnityBibleR5Summer-ShaderGraphTutorial)

なるべく複雑にならないようにシンプルに保ちながらも、そこそこの見栄えのするサンプルを目指しました。

TIPSでは「Ridirect Node」「BackboardのCategory機能」「Group Selection」「Sub Graph」など覚えておくと作業効率を向上できる機能の使い方なども紹介しました。

さいごに、この本の発行部数はAmazonの予約数によって決まるとのことなので、興味を持っていただける方はぜひ予約していただければ幸いです🙇‍♂️

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=gam00220c-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4862465684&linkId=c3575812bc16a75ff5f4ccf46ea0671e"></iframe>