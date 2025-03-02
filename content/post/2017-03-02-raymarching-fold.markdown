+++
date = "2017-03-02T23:24:26+09:00"
draft = false
image = "/images/posts/2017-02-24-tdf2017/snow.png"
math = false
slug = "raymarching-fold"
tags = ["CG", "レイマーチング"]
title = "距離関数のfold（折りたたみ）による形状設計"
toc = true

+++

[レイマーチング（別名 Sphere Tracing）](https://www.slideshare.net/shohosoda9/threejs-58238484)とは、距離関数と呼ばれる数式で定義したシーンに対して、レイの衝突判定を行って絵を出す手法です。

この距離関数に対し、fold（折りたたみ）の操作を行うと、万華鏡のような美しい形状や、フラクタルのような複雑な形状の設計が可能です。

先日のTokyoDemoFest2017でも、このfoldを用いた作品を投稿しました。

- [#TokyoDemoFest 2017 の GLSL Graphics Compo で3位入賞！ | gam0022.net](/blog/2017/02/24/tdf2017/)
- [Fusioned Bismuth | gam0022.net](http://gam0022.net/webgl/#raymarching_tdf2017)
- [Fusioned Bismuth | Shadertoy](https://www.shadertoy.com/view/Msscz7)

この記事では、距離関数のfoldについて、解説していきます。

<!--more-->

# 2Dのfold

分かりやすさのために、まずは2Dの例から説明します。

2Dのfoldの分かりやすい例は「鏡文字」です。

アルファベットのGをY軸中心に折りたたんだ鏡文字の2Dシェーダのサンプルを作りました。

- [Gの鏡文字のシェーダ | GLSL sandbox](http://glslsandbox.com/e#38938.1)

![Gの鏡文字](/images/posts/2017-02-24-tdf2017/mirror2.png)

このようなY軸中心のfold(Y軸中心 == X方向へのfold)は、単純にxを絶対値することにより実現できます。

絶対値をとることで、Xの負の方向の領域が正の方向の領域と一致して鏡文字になります。

```c
vec2 foldX(vec2 p) {
    p.x = abs(p.x);
    return p;
}
```

foldXの使用方法です。距離関数の引数pにfoldXを適用すればOKです。

```c
p = foldX(p);// Y軸方向を中心に空間(p)を折りたたむ
p -= vec2(0.4, 0.0);// 右方向に平行移動
float color = sign(dCharG(p));// 距離関数の符号で色分け
```

# 3Dのfold

次は3Dのfoldです。

このように箱をZ軸に時計回りに回転させたものをYZ平面にfoldすると、距離関数としては1つの箱なのに、左右2つに枝分かれさせることができます。

![YZ平面にfoldしたBox](/images/posts/2017-02-24-tdf2017/fold-1.png)

前の例では2DだったのでY軸に対するfoldでしたが、今回は3DなのでYZ平面に対するfoldになっています。
foldの中心が軸から面になりましたが、処理的には2Dと変わりません。
foldXの中身も一緒で、引数と返り値の型がvec2からvec3になったことが変更点です。

```c
vec3 foldX(vec3 p) {
    p.x = abs(p.x);
    return p;
}

mat2 rotate(float a) {
    float s = sin(a),c = cos(a);
    return mat2(c, s, -s, c);
}

float dTree(vec3 p) {
    vec3 size = vec3(0.1, 1.0, 0.1);
    float d = sdBox(p, size);
    p = foldX(p);
    p.y -= 0.1;
    p.xy *= rotate(-1.2);
    d = min(d, sdBox(p, size));
    return d;
}
```

# 再帰的なfold

このfoldを再帰的に適用すると、フラクタル図形ができます。

![再帰的なfold](/images/posts/2017-02-24-tdf2017/fold-2.png)

これがGLSLの距離関数です。

ループの末尾でpを更新することで、再帰的にfoldを適用しています。

```c
float dTree(vec3 p) {
    float scale = 0.8;
    vec3 size = vec3(0.1, 1.0, 0.1);
    float d = sdBox(p, size);
    for (int i = 0; i < 7; i++) {
        vec3 q = foldX(p);
        q.y -= size.y;
        q.xy *= rotate(-0.5);
        d = min(d, sdBox(p, size));
        p = q;
        size *= scale;
    }
    return d;
}
```

通常、フラクタル図形を表現するためには再帰関数が必要ですが、距離関数を用いればループで十分表現できるというのが興味深いポイントですね。
たとえば、`dTree` の中には、sdBoxがたったの2回しか登場していません。再帰的に `foldX` を適用することで、Boxを無数に複製しています。

# ~~回転のfold~~ Polar Mod

- 2023-05-02 追記
    - foldは境界が連続し、modは境界が分断するという違いがあるため、呼び方を区別するべきでした
    - 詳しくgazさんの[SDF for raymarching (距離関数のスキル)](https://neort.io/product/bvcrf5s3p9f7gigeevf0)の記事を参照してください
    - 「回転のfold」から「Polar Mod」に呼び方と関数名を訂正しました

foldとは別系統のテクニックになりますが、関連するテクニックとして `Polar Mod` を紹介します。

通常のmod（ `opRep` ）ではXYZなどの移動に対するReputationとなりますが、Polar Mod（ `pmod` ）では回転に対してのReputationとなります。

pmodの実装は[@gaziya5](https://twitter.com/gaziya5)さんの[DE used folding](https://www.shadertoy.com/view/Mlf3Wj)からお借りしました。

dTreeの木のような形をうまく調整し、Z軸方向に360°を1/6ずつ回転させるpmodを適用すると「Fusioned Bismuth」に登場した雪の結晶のような形状を得られます。

[![Fusioned Bismuth - 雪の結晶](/images/posts/2017-02-24-tdf2017/snow.png)](/images/posts/2017-02-24-tdf2017/snow.png)

```c
mat2 rotate(in float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, s, -s, c);
}

// https://www.shadertoy.com/view/Mlf3Wj
vec2 pmod(in vec2 p, in float s) {
    float a = PI / s - atan(p.x, p.y);
    float n = PI2 / s;
    a = floor(a / n) * n;
    p *= rotate(a);
    return p;
}

float dTree(vec3 p) {
    float scale = 0.6 * saturate(1.5 * sin(0.05 * time));
    float width = mix(0.3 * scale, 0.0, saturate(p.y));
    vec3 size = vec3(width, 1.0, width);
    float d = sdBox(p, size);
    for (int i = 0; i < 10; i++) {
        vec3 q = p;
        q.x = abs(q.x);
        q.y -= 0.5 * size.y;
        q.xy *= rotate(-1.2);
        d = min(d, sdBox(p, size));
        p = q;
        size *= scale;
    }
    return d;
}

float dSnowCrystal(inout vec3 p) {
    p.xy = pmod(p.xy, 6.0);
    return dTree(p);
}
```

## Polar Modの別例

この `pmod` はUFO風の形状にも利用しています。
たった4つのBoxに`mod` や `pmod` を適用しただけなのに、それなりに雰囲気を出すことができたと思っています。

[![Fusioned Bismuth - UFO風の形状](/images/posts/2017-02-24-tdf2017/ufo.png)](/images/posts/2017-02-24-tdf2017/ufo.png)

```
#define opRep(p, interval) (mod(p, interval) - 0.5 * interval)
#define opRepLimit(p, interval, limit) (mod(clamp(p, -limit, limit), interval) - 0.5 * interval)

float dWing(in vec3 p) {
    float t = time;
    float l = length(p.xz);
    float fusion = gauss(time * 2.0);

    float a = 0.1 + 0.06 * (1.0 + sin(PI * t + l));
    float b = min(0.2 * t, 10.0) * gauss(l) + 0.1 * fusion * hWave(p.xz, t);
    p.y += -b + 15.0;

    vec3 p1 = p;
    p1.xz = opRepLimit(p.xz, 1.0, 20.0);

    vec3 p2 = p;
    p2 = opRep(p, 0.5);

    float d =   sdBox(p1, vec3(0.2 + a * 3.0, 12.0 - a,       0.2 + a));
    d = min(d,  sdBox(p1, vec3(0.4 - a,       13.0 - 4.0 * a, 0.1 + a)));
    d = max(d, -sdBox(p1, vec3(0.3 - a,       14.0 - 4.0 * a, a)));
    d = max(d, -sdBox(p2, vec3(0.8 * a, 1.0 - a, 0.8 * a)));
    return d;
}

float dUfo(inout vec3 p) {
    float t = max(time * 0.5, 1.0);
    float t1 = floor(t);
    float t2 = t1 + easeInOutCubic(t - t1);

    p.xz = pmod(p.xz, min(t2, 10.0));
    p.z -= 0.5;

    float d = dWing(p);
    return d;
}
```

# 一般化されたfold

任意の法線 `n` を持った面に対する一般化されたfoldがSyntopiaに紹介されています。興味のある方は、見てみると良いでしょう。

absによるfoldでは、座標軸に垂直な特殊な平面に限定されていましたが、これで自由な向きにfoldができます！

- [Distance Estimated 3D Fractals (III): Folding Space](http://blog.hvidtfeldts.net/index.php/2011/08/distance-estimated-3d-fractals-iii-folding-space/)

```c
p -= 2.0 * min(0.0, dot(p, n)) * n;
```

# まとめ

距離関数のfoldについて、実例を踏まえて紹介しました。

foldは直感的に理解することが難しく、使いこなすのも大変ですが、かなり強力なテクニックだと思います！

もしこの記事がお役に立てたのなら幸いです。

# コメント（アーカイブ）

※Disqusのコメントをクローズしたため、アーカイブとして画像を残しました。

![Disqusのコメントのアーカイブ](/images/posts/2017-02-24-tdf2017/disqus_comments.png)
