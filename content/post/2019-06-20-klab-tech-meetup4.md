+++
title = "UnityエンジニアによるShader勉強会！に登壇しました"
slug = "klab-tech-meetup4"
date = "2019-06-20T10:04:11+09:00"
image = "/images/posts/2019-06-20-klab-tech-meetup4/klab_tech_meetup.001.jpeg"
toc = true
math = false
draft = false
tags = [
    "event", "CG", "Slide", "レイマーチング", "TokyoDemoFest", "Unity"
]

+++

[UnityエンジニアによるShader勉強会！](https://techplay.jp/event/733454)で「Unity×レイマーチングによる映像制作の実践手法」という発表をしました。

<script async class="speakerdeck-embed" data-id="daf8218b7458460087137b6f23e938b3" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

<!--more-->

# 発表の概要

Unityとレイマーチングを組み合わせて制作した[『WORMHOLE』](https://gam0022.net/blog/2018/12/12/tdf2018/)という映像作品を題材とした発表です。

「形状」「質感」「演出」の3つをテーマとして、この作品に用いたテクニックの解説を行いました。

1つ目のテーマは「形状」です。
CGの世界では、形状を決める作業をモデリングと呼びます。
複雑なトンネルの形状を40行ほどの距離関数でモデリングする方法を解説しました。
トンネルは既存のフラクタル図形をアレンジして設計しました。
IFSと呼ばれる手法でMengerSpongeと呼ばれる有名なフラクタル図形を定義して、IFSのパラメータを変化によって形状をアレンジし、さらにfoldRotateという操作を加えるとトンネルの形状が完成します。

2つ目のテーマは「質感」です。
CGの世界では、質感はライティング処理によって計算されます。
WORMHOLEではディファードレンダリングを採用しました。
ディファードレンダリングを採用することで、距離関数とポリゴンが混在したシーンであっても一貫したライティングができました。
レイマーチングの結果をGバッファに書き込むのシェーダーを実装すれば、Gバッファ上では距離関数もポリゴンもどちらもスクリーンスペースの2Dのデータとなり、両者を区別する必要がないので、一貫したライティングができます。
また、Unityが標準で用意している「Lightingパス」を利用することで、自分でライティング処理を実装しなくてもUnityの全種類の光源やReflectionProbeに対応できました。

3つ目のテーマは「演出」です。
演出と言ってもたくさんの要素があると思いますが、今回はテキストのアニメーション演出をシェーダーで実装する話をしました。
TextMeshProはSDFをつかって高品質にフォントをレンダリングするためのAssetですが、シェーダーをつかってフォントをレンダリングしています。
つまり、シェーダーを書けば、TextMeshProのレンダリングを自由にカスタマイズできます！
TextMeshProのシェーダーのカスタマイズ方法とカスタマイズ例、そして作品のオープニング部分の文字をパラパラと出現させたり消失させたりするエフェクトをコードの差分を踏まえて解説しました。

最後にテキスト以外の演出の話として、Unity Timelineの活用についても紹介しました。
シェーダーが不得意な数式で表現しにくい演出はTimelineを活用することで、効率的に演出を制作しました。

# 発表資料まとめ

発表者の資料のツイートをまとめました。

## @kanetaaaaa 「シェーダーライブコーディングのすすめ」

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">先日の資料を元にシェーダーライブコーディング入門の記事を書きました🤔<br>普段シェーダーを使ってる人の遊び道具になって欲しいです！<br>懇親会時に作ったシェーダーで使用したテクニックもいくつか追加で紹介しています！！<a href="https://t.co/MgDFAatZre">https://t.co/MgDFAatZre</a><a href="https://twitter.com/hashtag/klab_meetup?src=hash&amp;ref_src=twsrc%5Etfw">#klab_meetup</a></p>&mdash; かねた (@kanetaaaaa) <a href="https://twitter.com/kanetaaaaa/status/1141485526815346688?ref_src=twsrc%5Etfw">2019年6月19日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">本日の資料のために眺めるだけでレイマーチングを完全に理解できるかもしれないシェーダーを作りました🤔<a href="https://t.co/Hia4I0Dgii">https://t.co/Hia4I0Dgii</a><a href="https://twitter.com/hashtag/klab_meetup?src=hash&amp;ref_src=twsrc%5Etfw">#klab_meetup</a> <a href="https://t.co/kIuU4USxRJ">pic.twitter.com/kIuU4USxRJ</a></p>&mdash; かねた (@kanetaaaaa) <a href="https://twitter.com/kanetaaaaa/status/1141307706139004934?ref_src=twsrc%5Etfw">2019年6月19日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### 懇親会のライブコーディング

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">昨日の勉強会の懇親会中に20分間のライブコーディングでシェーダーを作りました！<br>初めて人前でコーディングをしたんですが、めちゃくちゃ楽しかったです！！<br><br>（当日動かなかったpmod修正済です...）<br>差分<br>- q.x = abs(p.x ) - 10.;<br>+ q.x = abs(q.x ) - 10.;<a href="https://t.co/LH3TT4YzSU">https://t.co/LH3TT4YzSU</a><a href="https://twitter.com/hashtag/klab_meetup?src=hash&amp;ref_src=twsrc%5Etfw">#klab_meetup</a> <a href="https://t.co/k61c3O2ZA1">pic.twitter.com/k61c3O2ZA1</a></p>&mdash; かねた (@kanetaaaaa) <a href="https://twitter.com/kanetaaaaa/status/1141480732180619264?ref_src=twsrc%5Etfw">2019年6月19日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

# @gam0022「Unity×レイマーチングによる映像制作の実践手法」

<blockquote class="twitter-tweet" data-conversation="none" data-lang="ja"><p lang="ja" dir="ltr">本日の発表資料です！<br>モデリングと演出とライティングを全部シェーダーで実装しました！<a href="https://t.co/lwg0xVcm3J">https://t.co/lwg0xVcm3J</a><a href="https://twitter.com/hashtag/klab_meetup?src=hash&amp;ref_src=twsrc%5Etfw">#klab_meetup</a> <a href="https://twitter.com/hashtag/Unity3D?src=hash&amp;ref_src=twsrc%5Etfw">#Unity3D</a> <a href="https://twitter.com/hashtag/Shader?src=hash&amp;ref_src=twsrc%5Etfw">#Shader</a> <a href="https://twitter.com/hashtag/HLSL?src=hash&amp;ref_src=twsrc%5Etfw">#HLSL</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1141307844999778304?ref_src=twsrc%5Etfw">2019年6月19日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

# @archeleeds「Unityで遊べる背景シェーダーを作る」

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">KLab Tech Meetup #4<br>「Unityで遊べる背景シェーダーを作る」のスライドです<a href="https://t.co/YyVB6gEhVk">https://t.co/YyVB6gEhVk</a><br>拙いですが何かの参考になれば 🙇‍♂️<a href="https://twitter.com/hashtag/klab_meetup?src=hash&amp;ref_src=twsrc%5Etfw">#klab_meetup</a></p>&mdash; リゼ (@archeleeds) <a href="https://twitter.com/archeleeds/status/1141376228558983168?ref_src=twsrc%5Etfw">2019年6月19日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

# @setchi「FancyScrollView x Shader」

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">スクロールビューでもシェーダー芸がしたい！<br>KLab TECH Meetup ＃4 で発表したスライドおよびサンプルコードです。<br><br>GitHub: <a href="https://t.co/WFqznn2vVM">https://t.co/WFqznn2vVM</a><br>Google Slides: <a href="https://t.co/TR5KBVmDUJ">https://t.co/TR5KBVmDUJ</a><a href="https://twitter.com/hashtag/klab_meetup?src=hash&amp;ref_src=twsrc%5Etfw">#klab_meetup</a> <a href="https://twitter.com/hashtag/madewithunity?src=hash&amp;ref_src=twsrc%5Etfw">#madewithunity</a> <a href="https://twitter.com/hashtag/gamedev?src=hash&amp;ref_src=twsrc%5Etfw">#gamedev</a> <a href="https://t.co/zqECmup7Qi">pic.twitter.com/zqECmup7Qi</a></p>&mdash; setchi (@setchi) <a href="https://twitter.com/setchi/status/1141313091134562304?ref_src=twsrc%5Etfw">2019年6月19日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

# 感想

これまでの人生で最高の勉強会でした！

参加者も発表者もモチベーションがとても高く、終始ものすごい熱気に包まれていて、発表する側としても非常にやりやすかったです！

勉強会のテーマがニッチすぎることから当初は参加枠を100名としていたのですが、募集開始から数時間後には満員となってしまったため、最終的に会場のキャパシティ上限の200名まで増枠することになりました。
これほど大人数の勉強会が実現されるとは思っておらず、世間のシェーダーへの関心の高さに驚きました。

どの発表も尖った内容が満載だったのではないでしょうか。
シェーダーに対する理解がより深まり、興味が増したのであれば幸いです。

ご参加いただいた皆さま、本当にありがとうございました！

[![懇親会中のライブコーディングの様子](/images/posts/2019-06-20-klab-tech-meetup4/live-coding.jpg)](/images/posts/2019-06-20-klab-tech-meetup4/live-coding-original.jpg)

懇親会中のライブコーディングの様子