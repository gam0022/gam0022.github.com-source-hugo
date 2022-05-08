+++
image = "/images/posts/2022-05-08-kodelife-midi/IMG_5022.MOV_snapshot_00.50.066.jpg"
toc = true
math = false
draft = false
tags = [
    "GLSL", "Shader", "KodeLife", "KORG nanoKONTROL2"
]
title = "KodeLifeでMIDIコンを使うのがとても簡単だった"
slug = "kodelife-midi"
date = "2022-05-08T21:56:23+09:00"

+++

[KodeLife](https://hexler.net/kodelife)でMIDIコンを使うのがとても簡単でした。こんな感じにVJっぽいことが気軽にできます。

<blockquote class="twitter-tweet"><p lang="ht" dir="ltr">KORG nanoKONTROL2 + KodeLife <a href="https://t.co/UqFQqYUFHa">pic.twitter.com/UqFQqYUFHa</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1487783819730059264?ref_src=twsrc%5Etfw">January 30, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

このシェーダーは[Tokyo Demo Fest 2021のShader Showdown](/blog/2021/12/31/tdf2021-shader-showdown/)をKodeLife向けに少し修正したものです。

<!--more-->

# KodeLifeとは

リアルタイムにシェーダーのライブコーディングをするためのソフトです。

Mac / Windows / Linux / iOS / Androidなど幅広いプラットフォームに対応しています。

# KodeLifeでMIDIコンを使うまでの手順

公式マニュアルの[Parameters · Built-In](https://hexler.net/kodelife/manual/parameters-built-in)を見れば解決なのですが、KodeLifeまったく使ったことのない人向けに画像付きで手順をまとめました。

## 1. 新規プロジェクトを作成

まずはKodeLifeを起動して新規プロジェクトを作成します。

## 2. MIDI Channelを追加

MIDIコントローラーの入力を受けるけるために、プロパティにMIDI Channelを追加します。

`Project > Parameters > ＋ボタン > Built-in > Input > MIDI Channel`

![MIDI Channelを追加](/images/posts/2022-05-08-kodelife-midi/add-midi-channel.png)

追加するとこうなります。MIDI Channelの設定はデフォルトのままでOKです。

![MIDI Channelの設定](/images/posts/2022-05-08-kodelife-midi/midi-channel.png)

デフォルトの状態だとMIDIの入力が32x32のテクスチャとしてサンプリング可能になります。

## 3. MIDI Channelをシェーダーからサンプリング

### midi入力を受け取るmidi関数を定義

前述のとおり、MIDIの入力が32x32のテクスチャとしてサンプリング可能になります。

まずテクスチャのサンプラーを定義します。

```c
uniform sampler2D midi1;
```

そして、こんな感じのmidi関数を定義します。

```c
ivec2 midiCoord(int offset)
{
    int x = offset % 32;
    int y = offset / 32;
    return ivec2(x, y);
}

float midi(int ccNumber) {
    return texture(midi1, vec2((1. / 32.) * midiCoord(3 * 127 + ccNumber))).r;
}
```

### midi関数の使用例

midi関数は[コントロールチェンジ番号](https://www.g200kg.com/jp/docs/dic/controlchange.html)を受け取って、対応する値を0-1の範囲で返します。

IFSのイテレーションなどにmidi関数を使えば、冒頭の動画のようにIFSの幾何学形状をMIDIコンで制御できます！

```c
vec4 map(vec3 p) {
    vec3 pos = p;
    p = mod(p, 1.) - 0.5;
    vec4 m = vec4(1, 1, 1, 1);

    float s = 1.;
    for (int i = 0; i < 10 * midi(0); i++) {// MIDIコンでIFSのイテレーションを制御
        p = abs(p) - 0.5;
        rot(p.xy, -0.5);
        p = abs(p) - 0.4;
        rot(p.yz, -0.1);

        float a = 1.0 + midi(1);// MIDIコンでIFSのスケールを制御
        p *= a;
        s *= a;
    }

    U(m, sdBox(p, vec3(0.5, 0.05, 0.05)) / s, 1., 1., 0.);
    U(m, sdBox(p, vec3(0.5 + 0.5 * (cos(TAU * time * 0 / 4.)), 0.06, 0.05)) / s, 0., 0.1, 0.5);
    U(m, sdBox(p, vec3(0.2, 0.6, 0.1)) / s, 0., saturate(cos(TAU * (time + pos.z / 8.))), -0.5);

    return m;
}
```

シェーダーの全文は[gist](https://gist.github.com/gam0022/23fc2128753495f88b6824e1dd134168)にあります。

# まとめ

KodeLifeではMIDIコンを簡単に使えて素敵！という小ネタでした。

ちなみに使ったMIDIコンは[KORG nanoKONTROL2](https://amzn.to/39LN12C)です。

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=gam00220c-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B004M8UZS8&linkId=8165ff008f7ff356a2d6382883941aca"></iframe>

せっかくMIDIコンを買ったのに、とくにVJする機会もないので置物になってます。誰かVJに誘ってください。