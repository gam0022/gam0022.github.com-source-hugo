+++
image = "/images/posts/2019-03-04-porting-from-shadertoy-to-glslsandbox/neort.jpg"
toc = false
math = false
draft = false
tags = [
    "GLSL", "小ネタ", "レイマーチング", "Shadertoy", "GLSL Snadbox", "NEORT"
]
title = "先頭にコピペするだけ！Shadertoy → GLSL Sandbox / NEORT の移植用ヘッダーコードの紹介"
slug = "porting-from-shadertoy-to-glslsandbox"
date = "2019-03-04T09:01:07+09:00"

+++

2021-11-16 backbufferとマウスの対応

[Shadertoy](https://www.shadertoy.com/)のコードを[GLSL Sandbox](http://glslsandbox.com/)に一発で移植するコードを思いつきました。

以下のコードをShadertoyのコードの先頭にコピペするだけで、元のコードには一切手を加えずにGLSL Sandbox用のコードに変換できます。

```cpp
// BEGIN: shadertoy porting template
// https://gam0022.net/blog/2019/03/04/porting-from-shadertoy-to-glslsandbox/
precision highp float;

uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;
uniform sampler2D backbuffer;

#define iResolution resolution
#define iTime time
#define iMouse (vec4(mouse, 0.5, 0.5) * resolution.xyxy)
#define iChannel0 backbuffer
#define texture texture2D

void mainImage(out vec4 fragColor, in vec2 fragCoord);

void main(void) {
    vec4 col;
    mainImage(col, gl_FragCoord.xy);
    gl_FragColor = col;
}
// END: shadertoy porting template
```

Shadertoyのマルチパスやテクスチャ機能をつかったShaderの移植はできませんが、普通の1パスのShaderなら移植できると思います。

ぜひ使ってみてください！

<!--more-->

## Shadertoy → NEORT の移植事例

最近、[NEORT](https://neort.io/)という国内産Shadertoyのようなサイトが登場しました。

NEORTはGLSL Sandbox互換があるので、ご紹介した方法で一発でShadertoyから移植できました。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">NEORTはじめました⛩️<a href="https://twitter.com/hashtag/GLSL?src=hash&amp;ref_src=twsrc%5Etfw">#GLSL</a> <a href="https://twitter.com/hashtag/creativecoding?src=hash&amp;ref_src=twsrc%5Etfw">#creativecoding</a> <a href="https://t.co/acKyzwIU8S">https://t.co/acKyzwIU8S</a> <a href="https://t.co/1AqphUQ5jv">pic.twitter.com/1AqphUQ5jv</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1100564853985501184?ref_src=twsrc%5Etfw">2019年2月27日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## 解説

なぜこれでうまく移植できるのか、簡単に解説します。

### uniform名の違いの吸収

まず以下のコードでShadertoyとGLSL Sandboxのuniform名の違いの吸収しています。

単純に `#define` のプリプロセッサで置換しているだけなので、特に不思議なことは無いと思います。

```cpp
uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;

#define iResolution resolution
#define iTime time
#define iMouse mouse
```

### エントリーポイント名の違いの吸収

Shadertoyのエントリポイントは `mainImage` で、GLSL Sandboxは `main` です。

が、よく考えてみると、ShadertoyもWebGLで実装されているからにはGLSLのルールに従って `main` が定義されているはずです。

Shadertoyのソースコードを眺めてみると、`mainImage` を呼び出す `main` 関数をヘッダーとして挿入する実装になっています。

```cpp
void main(void) {
    vec4 col;
    mainImage(col, gl_FragCoord.xy);
    gl_FragColor = col;
}
```

この「mainImage を呼び出す main を定義する」というアイデアは[kaneta](https://twitter.com/kanetaaaaa)さんのこの作品からヒントをもらいました！

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">早速2D版🤔のGLSLコード置いているので、ご自由にお使いください🤔<a href="https://t.co/OJjTYlLy0c">https://t.co/OJjTYlLy0c</a> <a href="https://t.co/NYN6zT77sM">pic.twitter.com/NYN6zT77sM</a></p>&mdash; かねた (@kanetaaaaa) <a href="https://twitter.com/kanetaaaaa/status/1099180997269106688?ref_src=twsrc%5Etfw">2019年2月23日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


次はコンパイルエラーを避けるための前方宣言です。

```cpp
void mainImage(out vec4 fragColor, in vec2 fragCoord);
```

GLSLではC言語と同様に、別の関数から呼び出される前に関数を定義するか、前方宣言する必要があります。
