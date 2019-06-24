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

## 形状（モデリング）

1つ目のテーマは「形状」です。
CGの世界では、形状を決める作業をモデリングと呼びます。
複雑なトンネルの形状を40行ほどの距離関数でモデリングする方法を解説しました。

![トンネルの距離関数の設計アプローチ](/images/posts/2019-06-20-klab-tech-meetup4/klab_tech_meetup.011.jpeg)

トンネルは既存のフラクタル図形をアレンジして設計しました。
IFSと呼ばれる手法でMengerSpongeと呼ばれる有名なフラクタル図形を定義して、IFSのパラメータを変化によって形状をアレンジし、さらにfoldRotateという操作を加えるとトンネルの形状が完成します。

![IFS（Iterated function system）とは](/images/posts/2019-06-20-klab-tech-meetup4/klab_tech_meetup.012.jpeg)

IFSは自身の縮小コピーを重ね合わせることでフラクタル図形を作るテクニックです。
IFSはIterated function systemの略で、その名前の通りforループの中で、fold、拡大や縮小、平行移動といった操作を繰り返して距離関数をつくります。
forループで空間を操作してから、最後にBoxの距離関数を return します。

空間を繰り返すことで、Boxを再帰的に配置するイメージです。

![IFS（Iterated function system）のアレンジ](/images/posts/2019-06-20-klab-tech-meetup4/klab_tech_meetup.013.jpeg)

この関数では平行移動はOffset、拡大縮小はScaleという名前のパラメータにしました。
このように引数のOffsetとScaleを変化させることで、図のようにフラクタル図形をアレンジできます。

![foldRotateとは](/images/posts/2019-06-20-klab-tech-meetup4/klab_tech_meetup.014.jpeg)

foldRotateはある軸を中心として一定の角度で回転しながら空間を折りたたみする操作です。
回転の角度をパラメータとすると、任意の図形を多角形の柱のような形に変形できます。

- 三角柱を作りたいときは、360度を3で割った120度ずつ回転します。
- 元の形が立方体なので、N = 4 のときは変化がありませんが、元の図形の4分の1が繰り返されています。
- N = 6 にすれば6角柱ができます。
- N = 8 にすれば8角柱になります。WORMHOLEのトンネルにはこの8角柱を採用しました。

![最終的なコード](/images/posts/2019-06-20-klab-tech-meetup4/klab_tech_meetup.018.jpeg)

ここまで使ったIFSによるMengerSpongeの距離関数とfoldRotateを組み合わせた最終的な距離関数のコードがこちらです。
なんと、わずか40行のコードで複雑な形状を定義できました！
非常に短いコードだけで複雑なモデリングができるのが距離関数の強みです。

```c
float3 _MengerOffset;
float _MengerScale;
float _MengerFold;

// IFSによるMengerSpongeの距離関数
float dMenger(float3 z0, float3 offset, float scale) {
    float4 z = float4(z0, 1.0);
    for (int n = 0; n < 4; n++) {
        z = abs(z);

        if (z.x < z.y) z.xy = z.yx;
        if (z.x < z.z) z.xz = z.zx;
        if (z.y < z.z) z.yz = z.zy;

        z *= scale;
        z.xyz -= offset * (scale - 1.0);

        if (z.z < -0.5 * offset.z * (scale - 1.0))
            z.z += offset.z * (scale - 1.0);
    }
    return (length(max(abs(z.xyz) - float3(1.0, 1.0, 1.0), 0.0)) - 0.05) / z.w;
}

// 2Dの回転行列の生成
float2x2 rotate(in float a) {
    float s = sin(a), c = cos(a);
    return float2x2(c, s, -s, c);
}

// 回転のfold
// https://www.shadertoy.com/view/Mlf3Wj
float2 foldRotate(in float2 p, in float s) {
    float a = PI / s - atan2(p.x, p.y);
    float n = PI2 / s;
    a = floor(a / n) * n;
    p = mul(rotate(a), p);
    return p;
}

// 最終的な距離関数
inline float DistanceFunction(float3 pos) {
    // 回転foldの適用
    pos.yx = foldRotate(pos.yx, _MengerFold);

    return dMenger(pos, _MengerOffset, _MengerScale);
}
```

距離関数のfoldについてブログ記事を書いたので、もっと詳しく知りたい方はご覧ください。

- [距離関数のfold（折りたたみ）による形状設計 | gam0022.net](https://gam0022.net/blog/2017/03/02/raymarching-fold/)

## 質感（ライティング）

2つ目のテーマは「質感」です。
CGの世界では、質感はライティング処理によって計算されます。
WORMHOLEではディファードレンダリングを採用しました。

![ディファードレンダリングを採用](/images/posts/2019-06-20-klab-tech-meetup4/klab_tech_meetup.021.jpeg)

ディファードレンダリングは2つのパスでシーンを描画するレンダリング手法です。
まず、「G-Bufferパス」でNormalやDepthなどのライティングに必要な情報を詰め込んだGバッファを生成します。
次に、「Lightingパス」でGバッファの情報を元にライティングを計算して、最終的なレンダリング結果を生成します。
これがディファードレンダリングの流れです。

![ディファードレンダリングを採用した3つの理由](/images/posts/2019-06-20-klab-tech-meetup4/klab_tech_meetup.022.jpeg)

ディファードレンダリングを採用した理由は3つあります。

1つ目の理由は距離関数とポリゴンが混在したシーンであっても一貫したライティングができる点です。レイマーチングの結果をGバッファに書き込むのシェーダーを実装すれば、Gバッファ上では距離関数もポリゴンもどちらもスクリーンスペースの2Dのデータとなり、両者を区別する必要がないので、一貫したライティングができます。
@hecomiさんが開発している uRaymarching というレイマーチング用のシェーダーのテンプレートを用いると、このようなシェーダーを少ない手間で書くことができます。
WORMHOLEでもuRaymarchingを利用しています。

2つ目の理由は、Unityが標準で用意している「Lightingパス」を利用することで、 自分でライティング処理を実装しなくてもUnityの全種類の光源やReflectionProbeに対応できる点です。
もしフォワードレンダリングでレイマーチングをする場合にはライティング処理を自力で実装する必要があるので、ライティング処理を実装しなくて済むのはディファードレンダリングの強みと言えると思います。

3つ目の理由は、ディファードレンダリングの特性上、光源が数が多いシーンであっても現実的な処理負荷でライティングを計算できる点です。

![ディファードレンダリングのライティングをカスタマイズ](/images/posts/2019-06-20-klab-tech-meetup4/klab_tech_meetup.023.jpeg)

一方でディファードレンダリングにはデメリットもあります。
シーン全体を同じ「Lightingパス」で処理するということは、
裏を返すとマテリアルごとのライティングのカスタマイズが難しくなります。

このような場合、StencilやGバッファにマテリアルIDの情報を埋め込んで、
Lightingパスの中でマテリアルを判定してライティングを切り替えることが正攻法となりますが、Lightingパスの修正となると、プロジェクト全体への影響も大きいですし、手間もかかってしまいます。

WORMHOLEではEmissiveを活用してこの問題を解決しました。
Emissiveは自発光、つまり自分が放つ光の強さのパラメーターですが、Emissive以外のパラメータを0にすると、Emissiveの色がそのまま最終的なピクセルの色として画面に出力されます。
この性質を利用して、独自のライティング結果をEmissiveに書き込むことで、自由にライティングをカスタマイズできます。

## 演出（テキストのアニメーション）

3つ目のテーマは「演出」です。
演出と言ってもたくさんの要素があると思いますが、今回はテキストのアニメーション演出をシェーダーで実装を扱います。

![TextMeshProとは？](/images/posts/2019-06-20-klab-tech-meetup4/klab_tech_meetup.028.jpeg)

TextMeshProはSDFをつかって高品質にフォントをレンダリングするためのAssetです。
SDFはSigned Distance Fieldのことで、左のように文字の輪郭までの距離を画素値にした画像です。
SDFを使うとフォントを拡大してもジャギが目立たないため、フォントのレンダリングに適しています。
また、勘の良い方はお気づきかと思いますが、SDFはレイマーチングの距離関数と全く同じ概念です。
距離関数の入力が3Dなのか2Dなのかというのと、コードで表現されるか、テクスチャで表現されるかという違いはありますが、本質的には同じものです。

![TextMeshProの描画の仕組み](/images/posts/2019-06-20-klab-tech-meetup4/klab_tech_meetup.029.jpeg)

TextMeshProの描画の仕組みについて説明します。
まずCPUで1文字ずつMeshを生成します。
オレンジ色で示されたTextMeshProの文字をワイヤーフレーム表示を見ると、1文字ずつMeshが存在することが分かります。
SDFテクスチャのUV情報はMeshの頂点データとして埋め込まれています。
次にこのMeshを描画するフラグメントシェーダーをつかってSDFテクスチャをフェッチしてフォントの内外判定をしてフォントをレンダリングします。
このようにTextMeshProではシェーダーをつかってフォントをレンダリングしています。

![TextMeshProのシェーダーのカスタマイズ例1](/images/posts/2019-06-20-klab-tech-meetup4/klab_tech_meetup_p32.gif)

TextMeshProのシェーダーのカスタマイズ例を紹介します。

左の例では、色を決定する部分のシェーダーを書き換えて、sin関数で模様と動きをつけて、ブラウン管風のエフェクトと追加しました。

右の例では、2種類のSDFテクスチャをブレンドすることで、平成と令和をモーフィングさせました。

![TextMeshProのシェーダーのカスタマイズ例2](/images/posts/2019-06-20-klab-tech-meetup4/klab_tech_meetup_p33.gif)

これはWORMHOLEのオープニング部分のエフェクトです。文字をパラパラと出現させたり消失させたりしています。
右はシェーダーの差分のコードです。
SDFテクスチャをフェッチするUVをこのように時間でclampすることで、フォントを引き伸ばす効果を加えました。
わずか3行くらいの差分ですが、面白いエフェクトができたかなと思います。

TextMeshProとカスタムシェーダーを組み合わせる方法についてはQiitaに記事を投稿しているので、詳しく知りたい方は、こちらをご覧ください。

- [[Unity] カスタムシェーダーでTextMeshProに独創的な演出を加える | Qiita](https://qiita.com/gam0022/items/f3b7a3e9821a67a5b0f3)

## Timelineの活用

最後にテキスト以外の演出の話として、Unity Timelineの活用についても紹介しました。
シェーダーが不得意な数式で表現しにくい演出はTimelineを活用することで、効率的に演出を制作しました。

# 発表資料まとめ

発表者の資料のツイートをまとめました。

## @kanetaaaaa 「シェーダーライブコーディングのすすめ」

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">先日の資料を元にシェーダーライブコーディング入門の記事を書きました🤔<br>普段シェーダーを使ってる人の遊び道具になって欲しいです！<br>懇親会時に作ったシェーダーで使用したテクニックもいくつか追加で紹介しています！！<a href="https://t.co/MgDFAatZre">https://t.co/MgDFAatZre</a><a href="https://twitter.com/hashtag/klab_meetup?src=hash&amp;ref_src=twsrc%5Etfw">#klab_meetup</a></p>&mdash; かねた (@kanetaaaaa) <a href="https://twitter.com/kanetaaaaa/status/1141485526815346688?ref_src=twsrc%5Etfw">2019年6月19日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">本日の資料のために眺めるだけでレイマーチングを完全に理解できるかもしれないシェーダーを作りました🤔<a href="https://t.co/Hia4I0Dgii">https://t.co/Hia4I0Dgii</a><a href="https://twitter.com/hashtag/klab_meetup?src=hash&amp;ref_src=twsrc%5Etfw">#klab_meetup</a> <a href="https://t.co/kIuU4USxRJ">pic.twitter.com/kIuU4USxRJ</a></p>&mdash; かねた (@kanetaaaaa) <a href="https://twitter.com/kanetaaaaa/status/1141307706139004934?ref_src=twsrc%5Etfw">2019年6月19日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## @gam0022「Unity×レイマーチングによる映像制作の実践手法」

<blockquote class="twitter-tweet" data-conversation="none" data-lang="ja"><p lang="ja" dir="ltr">本日の発表資料です！<br>モデリングと演出とライティングを全部シェーダーで実装しました！<a href="https://t.co/lwg0xVcm3J">https://t.co/lwg0xVcm3J</a><a href="https://twitter.com/hashtag/klab_meetup?src=hash&amp;ref_src=twsrc%5Etfw">#klab_meetup</a> <a href="https://twitter.com/hashtag/Unity3D?src=hash&amp;ref_src=twsrc%5Etfw">#Unity3D</a> <a href="https://twitter.com/hashtag/Shader?src=hash&amp;ref_src=twsrc%5Etfw">#Shader</a> <a href="https://twitter.com/hashtag/HLSL?src=hash&amp;ref_src=twsrc%5Etfw">#HLSL</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1141307844999778304?ref_src=twsrc%5Etfw">2019年6月19日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## @archeleeds「Unityで遊べる背景シェーダーを作る」

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">KLab Tech Meetup #4<br>「Unityで遊べる背景シェーダーを作る」のスライドです<a href="https://t.co/YyVB6gEhVk">https://t.co/YyVB6gEhVk</a><br>拙いですが何かの参考になれば 🙇‍♂️<a href="https://twitter.com/hashtag/klab_meetup?src=hash&amp;ref_src=twsrc%5Etfw">#klab_meetup</a></p>&mdash; リゼ (@archeleeds) <a href="https://twitter.com/archeleeds/status/1141376228558983168?ref_src=twsrc%5Etfw">2019年6月19日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## @setchi「FancyScrollView x Shader」

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">スクロールビューでもシェーダー芸がしたい！<br>KLab TECH Meetup ＃4 で発表したスライドおよびサンプルコードです。<br><br>GitHub: <a href="https://t.co/WFqznn2vVM">https://t.co/WFqznn2vVM</a><br>Google Slides: <a href="https://t.co/TR5KBVmDUJ">https://t.co/TR5KBVmDUJ</a><a href="https://twitter.com/hashtag/klab_meetup?src=hash&amp;ref_src=twsrc%5Etfw">#klab_meetup</a> <a href="https://twitter.com/hashtag/madewithunity?src=hash&amp;ref_src=twsrc%5Etfw">#madewithunity</a> <a href="https://twitter.com/hashtag/gamedev?src=hash&amp;ref_src=twsrc%5Etfw">#gamedev</a> <a href="https://t.co/zqECmup7Qi">pic.twitter.com/zqECmup7Qi</a></p>&mdash; setchi (@setchi) <a href="https://twitter.com/setchi/status/1141313091134562304?ref_src=twsrc%5Etfw">2019年6月19日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## 20分シェーダーライブコーディング by @kanetaaaaa

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">昨日の勉強会の懇親会中に20分間のライブコーディングでシェーダーを作りました！<br>初めて人前でコーディングをしたんですが、めちゃくちゃ楽しかったです！！<br><br>（当日動かなかったpmod修正済です...）<br>差分<br>- q.x = abs(p.x ) - 10.;<br>+ q.x = abs(q.x ) - 10.;<a href="https://t.co/LH3TT4YzSU">https://t.co/LH3TT4YzSU</a><a href="https://twitter.com/hashtag/klab_meetup?src=hash&amp;ref_src=twsrc%5Etfw">#klab_meetup</a> <a href="https://t.co/k61c3O2ZA1">pic.twitter.com/k61c3O2ZA1</a></p>&mdash; かねた (@kanetaaaaa) <a href="https://twitter.com/kanetaaaaa/status/1141480732180619264?ref_src=twsrc%5Etfw">2019年6月19日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">先日の <a href="https://twitter.com/hashtag/klab_meetup?src=hash&amp;ref_src=twsrc%5Etfw">#klab_meetup</a> の懇親会で行った20分のライブコーディング映像を公開しました！<br>実況解説は<a href="https://twitter.com/gam0022?ref_src=twsrc%5Etfw">@gam0022</a> さんと<a href="https://twitter.com/songofsaya_?ref_src=twsrc%5Etfw">@songofsaya_</a>さんです<br>突発ながら面白い実況で場を盛り上げてくださって非常に楽しかったです！<br>動画でもこの空間の楽しさが伝わると思うので是非ご覧ください！<a href="https://t.co/1CDeXMfJlT">https://t.co/1CDeXMfJlT</a></p>&mdash; かねた (@kanetaaaaa) <a href="https://twitter.com/kanetaaaaa/status/1141987474824036353?ref_src=twsrc%5Etfw">2019年6月21日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

# 感想

これまでの人生で最高の勉強会でした！

参加者も発表者もモチベーションがとても高く、終始ものすごい熱気に包まれていて、発表する側としても非常にやりやすかったです！

勉強会のテーマがニッチすぎることから当初は参加枠を100名としていたのですが、告知開始から数時間後には満員となってしまったため、最終的に会場のキャパシティ上限の200名まで増枠することになりました。
これほど大人数の勉強会が実現されるとは思っておらず、世間のシェーダーへの関心の高さに驚きました。

どの発表も尖った内容が満載だったのではないでしょうか。
シェーダーに対する理解がより深まり、興味が増したのであれば幸いです。

ご参加いただいた皆さま、本当にありがとうございました！

[![懇親会中のライブコーディングの様子](/images/posts/2019-06-20-klab-tech-meetup4/live-coding.jpg)](/images/posts/2019-06-20-klab-tech-meetup4/live-coding-original.jpg)

懇親会中のライブコーディングの様子