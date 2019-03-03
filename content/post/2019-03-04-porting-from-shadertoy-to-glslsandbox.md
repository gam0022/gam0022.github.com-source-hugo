+++
image = "/images/posts/2019-03-04-porting-from-shadertoy-to-glslsandbox/neort.jpg"
toc = false
math = false
draft = false
tags = [
]
title = "先頭にペーストするだけでShadertoyからGLSL SandboxやNEORTに一発で移植できるコードの紹介"
slug = "porting-from-shadertoy-to-glslsandbox"
date = "2019-03-04T09:01:07+09:00"

+++

[Shadertoy](https://www.shadertoy.com/)のコードを[GLSL Sandbox](http://glslsandbox.com/)に一発で移植するコードを思いつきました。

以下のコードをShadertoyのコードの先頭にコピペするだけで、元のコードには一切手を加えずにGLSL Sandbox用のコードに変換できます。

```cpp
// BEGIN: shadertoy porting template
precision highp float;

uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;

#define iResolution resolution
#define iTime time
#define iMouse mouse

void mainImage(out vec4 fragColor, in vec2 fragCoord);

void main(void) {
    vec4 col;
    mainImage(col, gl_FragCoord.xy);
    gl_FragColor = col;
}
// END: shadertoy porting template
```

Shaderotyのマルチパスやテクスチャ機能をつかったShaderの移植はできませんが、普通の1パスのShaderなら移植できると思います。

ぜひ使ってみてください！

## Shadertoy -> NEORT の移植事例

最近、[NEORT](https://neort.io/)という国内産Shadertoyのようなサイトが登場しました。

NEORTはGLSL Sandbox互換があるので、ご紹介した方法で一発でShaderotyから移植できました。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">NEORTはじめました⛩️<a href="https://twitter.com/hashtag/GLSL?src=hash&amp;ref_src=twsrc%5Etfw">#GLSL</a> <a href="https://twitter.com/hashtag/creativecoding?src=hash&amp;ref_src=twsrc%5Etfw">#creativecoding</a> <a href="https://t.co/acKyzwIU8S">https://t.co/acKyzwIU8S</a> <a href="https://t.co/1AqphUQ5jv">pic.twitter.com/1AqphUQ5jv</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1100564853985501184?ref_src=twsrc%5Etfw">2019年2月27日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>