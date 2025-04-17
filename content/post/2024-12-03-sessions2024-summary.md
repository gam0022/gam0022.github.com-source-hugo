+++
title = "SESSIONS 2024参加記録（セミナー登壇・ShaderJam解説・Realtime Graphics）"
slug = "sessions2024-summary"
date = "2024-12-11T23:30:00+09:00"
image = "/images/posts/2024-12-03-sessions2024-summary/seminar-photo2.jpg"
toc = true
math = false
draft = false
tags = [
    "event", "CG", "レイマーチング", "GLSL", "SESSIONS", "TokyoDemoFest", "Realtime Graphics", "Shader Jam"
]

+++

これは[SESSIONS Advent Calendar 2024](https://adventar.org/calendars/10732)の11日目の記事です。

# はじめに

2024年11月16日～17日に日本科学未来館で開催された[SESSIONS 2024](https://sessions-party.com/events/sessions-2024/)に参加しました。

今回のSESSIONSでは3つのプログラムに携わったので、それぞれ簡単に説明します。

- Realtime Graphicsコンペティションに作品提出
- セミナー登壇
- Shader Jamの解説

なお、SESSIONSの様子は[公式のYouTubeチャンネル](https://www.youtube.com/@SESSIONS_Party)でアーカイブされています。

<!--more-->

# Realtime Graphicsコンペティションに作品提出

2日目のRealtime Graphicsコンペティションに『GUARDI▲N』という「特撮」をコンセプトにしたBrowser Demoを投稿して3位をいただきました。

2名のチーム制作を行い、映像とストーリーは私（gam0022）が担当し、音楽はHADHADさんが担当しました。

詳細については、以下の記事をご覧ください。

- [SESSIONS 2024のRealtime Graphicsコンペティションで3位入賞しました（グラフィックス解説） | gam0022.net](https://gam0022.net/blog/2024/12/02/sessions2024-guardian/)

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">&quot;GUARDI▲N&quot; by <a href="https://twitter.com/gam0022?ref_src=twsrc%5Etfw">@gam0022</a> &amp; <a href="https://twitter.com/katai5plate?ref_src=twsrc%5Etfw">@katai5plate</a><br><br>3rd Place in Realtime Graphics Competition at <a href="https://twitter.com/hashtag/SESSIONS_Party?src=hash&amp;ref_src=twsrc%5Etfw">#SESSIONS_Party</a> 2024<a href="https://twitter.com/SESSIONS_Party?ref_src=twsrc%5Etfw">@SESSIONS_Party</a> 2024のリアルタイムGraphicsコンポで3位に入賞しました！<br><br>映像は自作のWebGLエンジンによる24KB制限です。<br><br>「特撮」をコンセプトにしました。 <a href="https://t.co/wDVVRXWX26">pic.twitter.com/wDVVRXWX26</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1858308509856678328?ref_src=twsrc%5Etfw">November 18, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

# セミナー登壇「レイマーチングの距離関数を極める！」

2日目の朝に「レイマーチングの距離関数を極める！」というセミナーで発表しました。

レイマーチングの距離関数のモデリングにおいてハマりがちな罠だったり、あまり知られていなそうなテクニックや小ネタをTwitter（X）で募集し、それらを簡単に解説しました。

ネタを提供していただいたみなさん（敬称略: @c5h12 @Kinakomoti2357 @Appletea_VRC @suzuki_ith @butadiene121 @shr_id @kamoshika_vrc）、本当にありがとうございました！

距離関数では平行移動や回転のために座標を逆操作する必要があるため、混乱しやすいと思うのですが、距離関数によるモデリングにおいては、 **「オブジェクトそのものではなく、空間の方を操作している」** という基本を思い出すことが重要ということが、この発表で一番伝えたい点でした。

さまざまな話題が出てきましたが、空間を操作しているという基本に立ち返ると、多くの問題の解決の糸口となることが多いと感じています。

このセミナーを通じて、参加者の皆さんに少しでも役立つ情報を提供できたなら幸いです。

<div class="google-slide-wrap">
<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vSdXEePaddAxc0hAOjyF3PlfQAXs2NAHn4LOQpQNT8MHLlr2G4Xd-8vDTSqNlT6lVPAM0QGN4rX9bro/embed?start=false&loop=false&delayms=3000" frameborder="0" width="1440" height="839" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
</div>

動画のアーカイブはこちらです。

<div class="movie-wrap">
<iframe width="1920" height="1080" src="https://www.youtube.com/embed/UaWxTNwFSBc?si=m6q0CkZebzxocH3N&amp;start=55" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  referrerpolicy="strict-origin-when-cross-origin" allowfullscreenn></iframe>
</div>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">セミナー3: 「レイマーチングの距離関数を極める！」の発表資料です！<br><br>Googleスライド版<a href="https://t.co/PTyaGZR9kS">https://t.co/PTyaGZR9kS</a><br><br>Speaker Deck版<a href="https://t.co/RBhgstXSiD">https://t.co/RBhgstXSiD</a><a href="https://twitter.com/hashtag/SESSIONS_Party?src=hash&amp;ref_src=twsrc%5Etfw">#SESSIONS_Party</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1858007444896756222?ref_src=twsrc%5Etfw">November 17, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

- [Googleスライド版](https://docs.google.com/presentation/d/1yQgHPNS2H0UkODCxCVnHnzsmdn5nLBXfXaUHv2Kgpbw/edit#slide=id.p)
- [Speaker Deck版](https://speakerdeck.com/gam0022/mastering-distance-functions)

# Shader Jamの解説

1日目のShader Jamというイベントの解説とオペレーションの一部を行いました。

Shader Jamは大人数でGLSLのシェーダーを書き、1時間ほどの時間でリアルタイムに作品を作っていくイベントです。

たくさんのシェーダー作品がリアルタイムに実装され、作り上げられていく様子はまさに圧巻でした。

<div class="movie-wrap">
<iframe width="1920" height="1080" src="https://www.youtube.com/embed/QfQglocVFTk?si=zbYZrc5mebwt_aIc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

今回SESSIONSのShader Jamでは国内外から合計13人のGLSLコーダーが参加しました！

13人分の初見のシェーダーを瞬時に理解しながらリアルタイムに解説するのは自分にとってはかなり大変でしたが、少しでも来場者の理解の助けになっていたら幸いです。

頑張ればもう少し上手に解説できた気もするという反省もありますが、今後もっと経験を積んで、より上手に解説できることを目標にしたいです。

どのシェーダーもユニークで素晴らしかったのですが、個人的に印象的だったのはRenardさんのComputeShaderを使ったパーティクルの作品、Kinakomotiさんのパストレーシングの作品、そしてKamoshikaさんのLog-polar Mappingの作品です。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/SESSIONS_Party?src=hash&amp;ref_src=twsrc%5Etfw">#SESSIONS_Party</a> <a href="https://twitter.com/hashtag/glsl?src=hash&amp;ref_src=twsrc%5Etfw">#glsl</a><br>Shader Jamで書いたやつ<br>evvvvil,wrighter先生達のコードを見ただけの付け焼刃compute shaderだったけど可能性を感じた <a href="https://t.co/W2UQViP6bo">pic.twitter.com/W2UQViP6bo</a></p>&mdash; Renard (@Renard_VRC) <a href="https://twitter.com/Renard_VRC/status/1857810156131856566?ref_src=twsrc%5Etfw">November 16, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/SESSIONS_Party?src=hash&amp;ref_src=twsrc%5Etfw">#SESSIONS_Party</a> <br>Sessionsでshaderjamをやらせて頂きました<br>壁紙製造機(?)shaderです <a href="https://t.co/ZcA1kcJ7W7">pic.twitter.com/ZcA1kcJ7W7</a></p>&mdash; kiNaNkomoti (@Kinakomoti2357) <a href="https://twitter.com/Kinakomoti2357/status/1858192661192245529?ref_src=twsrc%5Etfw">November 17, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">Shader Jamで書いたやつです！<br>歪んだリングを組み合わせた物体をレイマーチングで描画しました。<a href="https://t.co/zqqXrZLe4m">https://t.co/zqqXrZLe4m</a><a href="https://twitter.com/hashtag/SESSIONS_Party?src=hash&amp;ref_src=twsrc%5Etfw">#SESSIONS_Party</a> <a href="https://twitter.com/hashtag/GLSL?src=hash&amp;ref_src=twsrc%5Etfw">#GLSL</a> <a href="https://twitter.com/hashtag/Shader?src=hash&amp;ref_src=twsrc%5Etfw">#Shader</a><br><br>(Shader Jamの音は Niko_14さん <a href="https://twitter.com/himazin917?ref_src=twsrc%5Etfw">@himazin917</a> が作ってくださいました！) <a href="https://t.co/S28qM1Jpgs">pic.twitter.com/S28qM1Jpgs</a></p>&mdash; Kamoshika (@kamoshika_vrc) <a href="https://twitter.com/kamoshika_vrc/status/1858848861164630386?ref_src=twsrc%5Etfw">November 19, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Shader JamのすべてのGLSLシェーダーはtotetmattさんによってアーカイブされているので、興味があればぜひご覧ください。

[Sessions 2024-11-16 Shader Jam ◈ livecode.demozoo.org](https://livecode.demozoo.org/event/2024_11_16_shader_jam_sessions.html#mc)

# まとめ

SESSIONS 2024は本当に素晴らしいイベントでした。

セミナーの発表やShader Jamの解説など、新たな形でイベントに貢献できたことは貴重な経験となりました。

会場の雰囲気や臨場感を直接肌で感じることができ、オフラインイベントの特別な魅力を再認識することができました。

参加者との交流を通じて、作品に対する感想やアイデアの交換を行い、新たな視点やインスピレーションを得ることができました。また、会場の音響や再生環境が例年より大幅に改善されていた点も非常に良かったです。

さらに、今年から刷新された応募カテゴリーにより、ProcessingやジェネVJなど多様な分野の参加者が集まり、例年以上の盛り上がりを感じることができました。

SESSIONS 2024の運営や準備をしてくださったオーガナイザーの皆さん、そして参加者の皆さん、本当にありがとうございました。