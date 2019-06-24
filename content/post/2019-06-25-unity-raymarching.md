+++
tags = [
    "CG", "Slide", "レイマーチング", "TokyoDemoFest", "Unity", "TextMeshPro"
]
title = "Unity×レイマーチングによる映像制作の実践手法"
slug = "unity-raymarching"
date = "2019-06-25T09:00:00+09:00"
image = "/images/posts/2019-06-20-klab-tech-meetup4/klab_tech_meetup.001.jpeg"
toc = true
math = false
draft = false

+++

6/19に開催された[UnityエンジニアによるShader勉強会！](https://techplay.jp/event/733454)で「Unity×レイマーチングによる映像制作の実践手法」という発表をしました。

<script async class="speakerdeck-embed" data-id="daf8218b7458460087137b6f23e938b3" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

<!--more-->

# はじめに

この記事は、発表内容をブログ向けに編集・要約したものになります。

発表当日の様子はこちらの別記事にまとめました。

- [UnityエンジニアによるShader勉強会！に登壇しました | gam0022.net](https://gam0022.net/blog/2019/06/20/klab-tech-meetup4/)

# 発表の題材『WORMHOLE』

TokyoDemoFest2018で発表した『WORMHOLE』という映像作品を題材とした発表です。

WORMHOLEの映像はUnityと[レイマーチング](https://www.slideshare.net/shohosoda9/threejs-58238484)を組み合わせて制作しました。

以下の記事で利用したテクニックは既に解説していましたが、今回は **汎用的に役立ちそうなテクニック** に焦点を絞って、前回は説明しきれなかった部分を掘り下げて解説しました。

- [Tokyo Demo Fest 2018のDemo Compo優勝作品の解説（グラフィック編） | gam0022.net](https://gam0022.net/blog/2018/12/12/tdf2018/)

今回の発表では **「形状」「質感」「演出」** の3つをテーマとして、WORMHOLEに用いたテクニックの解説を行いました。

# 形状（モデリング）

1つ目のテーマは **「形状」** です。

CGの世界では、形状を決める作業をモデリングと呼びます。
複雑なトンネルの形状を40行ほどの距離関数でモデリングする方法を解説しました。

![トンネルの距離関数の設計アプローチ](/images/posts/2019-06-20-klab-tech-meetup4/klab_tech_meetup.011.jpeg)

トンネルは既存のフラクタル図形をアレンジして設計しました。
IFSと呼ばれる手法でMengerSpongeと呼ばれる有名なフラクタル図形を定義（図の左）して、IFSのパラメータを変化によって形状をアレンジ（図の中央）し、さらにfoldRotateという操作を加えるとトンネルの形状（図の右）が完成します。

![IFS（Iterated function system）とは](/images/posts/2019-06-20-klab-tech-meetup4/klab_tech_meetup.012.jpeg)

**IFS** は自身の縮小コピーを重ね合わせることでフラクタル図形を作るテクニックです。
IFSはIterated Function Systemの略で、その名前の通りforループの中で、fold、拡大や縮小、平行移動といった操作を繰り返して距離関数をつくります。
forループで空間を操作してから、最後にBoxの距離関数を return します。

ループの中でスケールと位置を変化させながら空間を折りたたみをして、Boxが出現する座標空間を再帰的に繰り返すことで、Boxを再帰的に配置するイメージです。

foldの部分はかなり難解なので、1行ずつコメントアウトしながら変化を確認すると理解が深まると思います。

![IFS（Iterated function system）のアレンジ](/images/posts/2019-06-20-klab-tech-meetup4/klab_tech_meetup.013.jpeg)

この関数では平行移動はOffset、拡大縮小はScaleという名前のパラメータにしました。

引数のOffsetとScaleを変化させることで、フラクタル図形をアレンジできます。

![foldRotateとは](/images/posts/2019-06-20-klab-tech-meetup4/klab_tech_meetup.014.jpeg)

**foldRotate** （別名: **polarMod** ）はある軸を中心として一定の角度で回転しながら空間を折りたたみする操作です。
回転の角度をパラメータとすると、任意の図形を多角形の柱のような形に変形できます。

- 三角柱を作りたいときは、360度を3で割った120度ずつ回転します。
- 元の形が立方体なので、N = 4 のときは変化がありませんが、元の図形の4分の1が繰り返されています。
- N = 6 にすれば6角柱ができます。
- N = 8 にすれば8角柱になります。

WORMHOLEのトンネルには8角柱のfoldRotateを利用しました。

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

# 質感（ライティング）

2つ目のテーマは **「質感」** です。

CGの世界では、質感はライティング処理によって計算されます。
WORMHOLEではディファードレンダリングを採用しました。

![ディファードレンダリングを採用](/images/posts/2019-06-20-klab-tech-meetup4/klab_tech_meetup.021.jpeg)

ディファードレンダリングは2つのパスでシーンを描画するレンダリング手法です。

1. **G-Bufferパス** でNormalやDepthなどのライティングに必要な情報を詰め込んだGバッファを生成します。
2. **Lightingパス** でGバッファの情報を元にライティングを計算して、最終的なレンダリング結果を生成します。

これがディファードレンダリングの流れです。

![ディファードレンダリングを採用した3つの理由](/images/posts/2019-06-20-klab-tech-meetup4/klab_tech_meetup.022.jpeg)

ディファードレンダリングを採用した理由は3つあります。

1つ目の理由は **距離関数とポリゴンが混在したシーンであっても一貫したライティングができる** 点です。レイマーチングの結果をGバッファに書き込む **G-Bufferパス** のシェーダーを実装すれば、Gバッファ上では距離関数もポリゴンもどちらもスクリーンスペースの2Dのデータとなり、両者を区別する必要がないので、一貫したライティングができます。
[@hecomi](https://twitter.com/hecomi)さんが開発している[uRaymarching](https://github.com/hecomi/uRaymarching)というレイマーチング用のシェーダーのテンプレートを用いると、このようなシェーダーを少ない手間で書くことができます。
WORMHOLEでもuRaymarchingを利用しています。

2つ目の理由は、Unityが標準で用意している **Lightingパス** を利用することで、自分でライティング処理を実装しなくてもUnityの全種類の光源やReflectionProbeに対応できる点です。
もしフォワードレンダリングでレイマーチングをする場合にはライティング処理を自力で実装する必要があるので、ライティング処理を実装しなくて済むのはディファードレンダリングの強みと言えると思います。

3つ目の理由は、ディファードレンダリングの特性上、光源が数が多いシーンであっても現実的な処理負荷でライティングを計算できる点です。

![ディファードレンダリングのライティングをカスタマイズ](/images/posts/2019-06-20-klab-tech-meetup4/klab_tech_meetup.023.jpeg)

一方でディファードレンダリングにはデメリットもあります。
シーン全体を同じ **Lightingパス** で処理するということは、
裏を返すとマテリアルごとのライティングのカスタマイズが難しくなります。

このような場合、StencilやGバッファにマテリアルIDの情報を埋め込んで、
Lightingパスの中でマテリアルを判定してライティングを切り替えることが正攻法となりますが、Lightingパスの修正となると、プロジェクト全体への影響も大きいですし、手間もかかってしまいます。

WORMHOLEではEmissiveを活用してこの問題を解決しました。
Emissiveは自発光（自分が放つ光の強さ）のパラメーターですが、Emissive以外のパラメータを0にすると、Emissiveの色がそのまま最終的なピクセルの色として画面に出力されます。
この性質を利用して、独自のライティング結果をEmissiveに書き込むことで、自由にライティングをカスタマイズできます。

# 演出（テキストのアニメーション）

3つ目のテーマは **「演出」** です。

演出と言ってもたくさんの要素があると思いますが、今回の発表ではテキストのアニメーション演出をシェーダーで実装する話をします。

![TextMeshProとは？](/images/posts/2019-06-20-klab-tech-meetup4/klab_tech_meetup.028.jpeg)

TextMeshProはSDFをつかって高品質にフォントをレンダリングするためのAssetです。

SDFはSigned Distance Fieldのことで、左のように文字の輪郭までの距離を画素値にした画像です。
SDFを使うとフォントを拡大してもジャギが目立たないため、フォントのレンダリングに適しています。

また、勘の良い方はお気づきかと思いますが、SDFはレイマーチングの距離関数と全く同じ概念です。
距離関数の入力が3Dなのか2Dなのかというのと、コードで表現されるか、テクスチャで表現されるかという違いはありますが、本質的には同じものです。

![TextMeshProの描画の仕組み](/images/posts/2019-06-20-klab-tech-meetup4/klab_tech_meetup_p29.gif)

TextMeshProの描画の仕組みについて説明します。

まずCPUで1文字ずつMeshを生成します。
オレンジ色で示されたTextMeshProの文字をワイヤーフレーム表示を見ると、1文字ずつMeshが存在することが分かります。

SDFテクスチャのUV情報はMeshの頂点データとして埋め込まれています。
次にこのMeshを描画するフラグメントシェーダーをつかってSDFテクスチャをフェッチしてフォントの内外判定をしてフォントをレンダリングします。

このように TextMeshProではシェーダーをつかってフォントをレンダリングしています。

つまり、 **シェーダーを書けば、TextMeshProのレンダリングを 自由にカスタマイズできます！**

![TextMeshProのシェーダーのカスタマイズ方法](/images/posts/2019-06-20-klab-tech-meetup4/klab_tech_meetup.031.jpeg)

TextMeshProのシェーダーのカスタマイズ方法を紹介します。

1. TextMeshProのシェーダーをコピーします。どのシェーダーをコピーしても良いのですが、Mobileと書いてあるものは実装がシンプルなのでオススメです。
2. 好きなようにシェーダーをカスタマイズします。色を決定する部分や、SDFテクスチャをフェッチする部分を改造するのが良いかと思います。
3. TextMeshProのインスペクタから改造したシェーダーを設定すれば、完了です。

![TextMeshProのシェーダーのカスタマイズ例1](/images/posts/2019-06-20-klab-tech-meetup4/klab_tech_meetup_p32.gif)

TextMeshProのシェーダーのカスタマイズ例を2つ紹介します。

- 【左】色を決定する部分のシェーダーを書き換えて、sin関数で模様と動きをつけて、ブラウン管風のエフェクトと追加しました。
- 【右】2種類のSDFテクスチャをブレンドすることで、平成と令和をモーフィングさせました。

![TextMeshProのシェーダーのカスタマイズ例2](/images/posts/2019-06-20-klab-tech-meetup4/klab_tech_meetup_p33.gif)

これはWORMHOLEのオープニング部分のエフェクトです。文字をパラパラと出現させたり消失させたりしています。

これがシェーダーの差分のコードです。
SDFテクスチャをフェッチするUVをこのように時間でclampすることで、フォントを引き伸ばす効果を加えました。
わずか3行くらいの差分ですが、面白いエフェクトができたかなと思います。

```diff
        // PIXEL SHADER
        fixed4 PixShader(pixel_t input) : SV_Target
        {
-           half d = tex2D(_MainTex, input.texcoord0.xy).a * input.param.x;
+           half2 uv = input.texcoord0.xy;
+           uv.y = clamp(uv.y, 0.0, 0.5 + 0.5 * sin(_Time.y));
+           half d = tex2D(_MainTex, uv).a * input.param.x;
            half4 c = input.faceColor * saturate(d - input.param.w);

        #ifdef OUTLINE_ON
```

TextMeshProとカスタムシェーダーを組み合わせる方法についてはQiitaに記事を投稿しているので、詳しく知りたい方は、こちらをご覧ください。

- [[Unity] カスタムシェーダーでTextMeshProに独創的な演出を加える | Qiita](https://qiita.com/gam0022/items/f3b7a3e9821a67a5b0f3)

## 番外編: Unity Timelineを活用した演出

番外編のテキスト以外の演出の話として、Unity Timelineの活用についても紹介しました。

シェーダーだけでなくUnity Timelineも利用することで、演出制作の効率性を高めました。

![Unity Timelineの活用](/images/posts/2019-06-20-klab-tech-meetup4/klab_tech_meetup.037.jpeg)

オレンジ色の枠で囲まれているのがTimeline Windowです。

演出の品質を高めるためには、演出の試行錯誤のイテレーションが必要です。
このイテレーションを高速に回すために、リアルタイムに編集結果をプレビューできる点や、自由に再生時間をシークできる点が本当に良かったです。

Timelineの主な利用箇所です。

- Animation Track
  - レイマーチング用のマテリアルのパラメータ制御
  - ポストエフェクト用のマテリアルのパラメータ制御
- TextMeshPro専用のCustom Track
  - TextMeshProのテキストを書き換えは標準のTrackでは実現できなかったので、Timelineのカスタムトラックを自作して実現しました。
- Chinemachine Track
  - カメラワークにはChinemachineというAssetのトラックを利用しました。

![演出のまとめ](/images/posts/2019-06-20-klab-tech-meetup4/klab_tech_meetup.041.jpeg)

シェーダーが不得意な（数式で表現しにくい）演出はTimelineも活用することで、効率的に演出を制作しました。

- 規則的な（数式で表現ができる）動きはシェーダーが得意
  - 音楽のBPMに合わせてチカチカ点滅させるのは、シェーダーが適しています。
- 不規則な（数式で表現しにくい）動きはTimelineが得意
  - カメラワークはTimelineを利用したほうが効率的に演出が作れると思います。

# まとめ

![まとめ](/images/posts/2019-06-20-klab-tech-meetup4/klab_tech_meetup_p35.gif)

リアルな質感も、複雑な形状も、カッコいい演出も、どれもシェーダーで実現できます。

短いコードだけで多彩な表現ができるため、映像作成においては **シェーダーは最強の道具** だと言えるでしょう。