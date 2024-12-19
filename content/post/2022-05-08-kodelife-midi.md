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

MIDIコントローラーの入力を受けるけるために、パラメーターのリストにMIDI Channelを追加します。

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

midi関数は[コントロールチェンジ番号](https://www.g200kg.com/jp/docs/dic/controlchange.html)を受け取って、対応する値を [0-1] の範囲で返します。テクスチャなので [0-1] です。

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

<div class="kaerebalink-box" style="text-align:left;padding-bottom:20px;font-size:small;zoom: 1;overflow: hidden;"><div class="kaerebalink-image" style="float:left;margin:0 15px 10px 0;"><a href="https://hb.afl.rakuten.co.jp/hgc/g00qdd14.uo1a90fe.g00qdd14.uo1aaa3f/kaereba_main_202412192356590481?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fshimamuragakki%2Fmt0006756%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fshimamuragakki%2Fi%2F10058349%2F&rafcid=wsc_i_is_1087413314923222742" target="_blank" ><img src="https://thumbnail.image.rakuten.co.jp/@0_mall/shimamuragakki/cabinet/160511/mt0006756.jpg?_ex=320x320" style="border: none;" /></a></div><div class="kaerebalink-info" style="line-height:120%;zoom: 1;overflow: hidden;"><div class="kaerebalink-name" style="margin-bottom:10px;line-height:120%"><a href="https://hb.afl.rakuten.co.jp/hgc/g00qdd14.uo1a90fe.g00qdd14.uo1aaa3f/kaereba_main_202412192356590481?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fshimamuragakki%2Fmt0006756%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fshimamuragakki%2Fi%2F10058349%2F&rafcid=wsc_i_is_1087413314923222742" target="_blank" >KORG nanoKONTROL2 BK (ブラック) MIDIコントローラー スリムライン USB コルグ</a><div class="kaerebalink-powered-date" style="font-size:8pt;margin-top:5px;font-family:verdana;line-height:120%">posted with <a href="https://kaereba.com" rel="nofollow" target="_blank">カエレバ</a></div></div><div class="kaerebalink-detail" style="margin-bottom:5px;"></div><div class="kaerebalink-link1" style="margin-top:10px;"><div class="shoplinkrakuten" style="margin-right:5px;background: url('//img.yomereba.com/kz_k_01.gif') 0 -50px no-repeat;padding: 2px 0 2px 18px;white-space: nowrap;"><a href="https://hb.afl.rakuten.co.jp/hgc/117c8a81.32450c02.117c8a82.14f884ba/kaereba_main_202412192356590481?pc=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2FKORG%2520nanoKONTROL2%2F-%2Ff.1-p.1-s.1-sf.0-st.A-v.2%3Fx%3D0%26scid%3Daf_ich_link_urltxt&m=http%3A%2F%2Fm.rakuten.co.jp%2F" target="_blank" >楽天市場で購入</a></div><div class="shoplinkamazon" style="margin-right:5px;background: url('//img.yomereba.com/kz_k_01.gif') 0 0 no-repeat;padding: 2px 0 2px 18px;white-space: nowrap;"><a href="https://www.amazon.co.jp/gp/search?keywords=KORG%20nanoKONTROL2&__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&tag=gam00220c-22" target="_blank" >Amazonで購入</a></div><div class="shoplinkyahoo" style="margin-right:5px;background: url('//img.yomereba.com/kz_k_01.gif') 0 -150px no-repeat;padding: 2px 0 2px 18px;white-space: nowrap;"><a href="//ck.jp.ap.valuecommerce.com/servlet/referral?sid=3737095&pid=891162274&vc_url=http%3A%2F%2Fsearch.shopping.yahoo.co.jp%2Fsearch%3Fp%3DKORG%2520nanoKONTROL2&vcptn=kaereba" target="_blank" >Yahooショッピングで購入<img src="//ad.jp.ap.valuecommerce.com/servlet/gifbanner?sid=3737095&pid=891162274" height="1" width="1" border="0"></a></div><div class="shoplinkseven" style="margin-right:5px;background: url('//img.yomereba.com/kz_k_01.gif') 0 -100px no-repeat;padding: 2px 0 2px 18px;white-space: nowrap;"><a href="//ck.jp.ap.valuecommerce.com/servlet/referral?sid=3737095&pid=891162462&vc_url=http%3A%2F%2F7net.omni7.jp%2Fsearch%2F%3Fkeyword%3DKORG%2520nanoKONTROL2%26searchKeywordFlg%3D1&vcptn=kaereba" target="_blank" >7netで購入<img src="//ad.jp.ap.valuecommerce.com/servlet/atq/gifbanner?sid=3737095&pid=891162462" height="1" width="1" border="0"></a></div>	     	                           </div></div><div class="booklink-footer" style="clear: left"></div></div>

せっかくMIDIコンを買ったのに、とくにVJする機会もないので置物になってます。誰かVJに誘ってください。