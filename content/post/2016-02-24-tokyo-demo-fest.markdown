---
layout: post
title: "#TokyoDemoFest 2016 の GLSL Graphics Compo で3位入賞！"
date: 2016-02-24 08:19
comments: true
categories: 
- event
- demo
- CG
---

# はじめに
2016-02-20〜21に開催された[Tokyo Demo Fest 2016](http://tokyodemofest.jp/2016/)に参加しました。

Tokyo Demo Festとは、このようなイベントです（公式ページからの引用）。

> Tokyo Demo Fest は日本で唯一のデモパーティです。 デモパーティは、コンピュータを用いたプログラミングとアートに 興味のある人々が日本中、世界中から一堂に会し、 デモ作品のコンペティションやセミナーなどを行います。 また、イベント開催中は集まった様々な人たちとの交流が深められます。 

私は"Carbon"という作品をGLSL Graphics Compoに提出して、3位入賞してきました！

さらに、[three.js](threejs.org)の作者であり、[GLSL Sandbox](http://glslsandbox.com/)の作者でもある[Mr.Doob](http://mrdoob.com/)と握手してきました！

今回が初参加でしたが、本当に最高のイベントでした！楽しかったです。
オーガナイザーのみなさん、参加者のみなさん、ありがとうございました！

全体のレポートについては、[@h_doxas](https://twitter.com/h_doxas)さんの記事がとても分かりやすいです。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">WebGL 総本山を更新しました ＞ 超ハイレベルな作品が入り乱れた Tokyo Demo Fest 2016！ 大興奮の２日間をレポート！ - WebGL 総本山 <a href="https://t.co/ZeYrYoLiz2">https://t.co/ZeYrYoLiz2</a> <a href="https://t.co/e3XFwpIrCD">pic.twitter.com/e3XFwpIrCD</a></p>&mdash; h_doxas (@h_doxas) <a href="https://twitter.com/h_doxas/status/701988774117376004">2016, 2月 23</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

この記事では、GLSL Graphics Compoで発表した"Carbon"という作品の裏話と、個人的に印象に残った思い出などを話します。

# Carbon 製作秘話
Compo（コンポ）とは、一定の制約の中で映像や音楽の作品を製作し、投票によって順位をつけるイベントです。

今年のGLSL Graphics Compoでは、[GLSL Sandbox](http://glslsandbox.com/)上で動作する映像作品の順位を競いました。

GLSL Sandboxで動作させるためには、フラグメントシェーダだけで作品を実装する必要があります。
当然ですが、立体データや画像データは読み込めないので、コードだけでなんとかする必要があります。

私は"Carbon"というタイトルで作品を提出して3位入賞しました。
今年のGLSL Graphics Compoはレベルが高かったので、入賞できて嬉しかったです。

コチラから動くデモをご覧になれます！

- [Shadertoy - Carbon \[TDF2016\] - Final Version](https://www.shadertoy.com/view/MsG3Wy)
- [GLSL Sandbox - Carbon - TDF Submited Version](http://glslsandbox.com/e#30972.0)

<!--[Carbon](/images/posts/2016-02-24-tokyo-demo-fest/carbon-blue.png)-->

![Carbon - Blue](/images/posts/2016-02-24-tokyo-demo-fest/carbon-neo-blue.png)
![Carbon - Green](/images/posts/2016-02-24-tokyo-demo-fest/carbon-neo-green.png)
![Carbon - Red](/images/posts/2016-02-24-tokyo-demo-fest/carbon-neo-red.png)
![Carbon - Violet](/images/posts/2016-02-24-tokyo-demo-fest/carbon-neo-violet.png)

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">GLSL Compo に 「Carbon」という作品を出しました！<a href="https://t.co/UOqE3FvFyW">https://t.co/UOqE3FvFyW</a><a href="https://t.co/JxkH3LtI4t">https://t.co/JxkH3LtI4t</a><a href="https://twitter.com/hashtag/TokyoDemoFest?src=hash">#TokyoDemoFest</a> <a href="https://t.co/yfkJBzQllD">pic.twitter.com/yfkJBzQllD</a></p>&mdash; がむ@TDF最高だった (@gam0022) <a href="https://twitter.com/gam0022/status/701327225224736768">2016, 2月 21</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-conversation="none" data-lang="ja"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/TokyoDemoFest?src=hash">#TokyoDemoFest</a> の &quot;Carbon&quot; の回路にglow効果をつけたのでスクショ撮り直した。Shadertoyにも反映。<a href="https://t.co/zeIZhsc8zT">https://t.co/zeIZhsc8zT</a> <a href="https://t.co/Q4UKTCfAsP">pic.twitter.com/Q4UKTCfAsP</a></p>&mdash; がむ@TDF最高だった (@gam0022) <a href="https://twitter.com/gam0022/status/703612944903372800">2016年2月27日</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">私の「Carbon」が GLSL Compo で入賞しました👏<br>ありがとうございます！ <a href="https://twitter.com/hashtag/TokyoDemoFest?src=hash">#TokyoDemoFest</a><a href="https://t.co/f7LoEYWzFq">https://t.co/f7LoEYWzFq</a> <a href="https://t.co/SIel9DKA6n">pic.twitter.com/SIel9DKA6n</a></p>&mdash; がむ@TDF最高だった (@gam0022) <a href="https://twitter.com/gam0022/status/701362103928487937">2016年2月21日</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

今回もレイマーチングによる作品です。

距離関数（distance function）は、Mandelboxというフラクタル図形を mod でループさせただけなので、非常にお手軽です。

<!--more-->

この作品は大会中に頑張って製作しました。製作期間はなんと1日です！
20日のお昼くらいに作り始めて、20日は徹夜で作業し、21日の13:00の提出期限のギリギリに間に合わせました。
提出期限5分前くらいまでバグが取れずにあたふたしていたのですが、なんとか提出できて本当に嬉しかったです。

シェーダはデバッグが難しいので、バグを取るのはけっこう大変です…
今回も同名の変数を異なるスコープで宣言しているという単純なミスで30分くらい無駄にしました。みなさんは気をつけましょう…

実は先週の [#GLSLTech](http://gam0022.net/blog/2016/02/16/glsl-tech/)の打ち上げの飲み会の際に、Mandelboxというフラクタル図形という名前を聞きました。
Mandelboxで何か作品を作るということ、完成図のイメージはだいたい決まっていたので、そこまで出戻りなどもなく、1日で完成にこぎつけることができました。

わざと0.5秒おきにチカチカ点滅させてます。BPM120の曲を後ろで流すことを想定したためです。

## 実装的な細かい話
実装的な細かい話をすると、[前回にレイマーチングで作成した"reflect"という作品](http://qiita.com/gam0022/items/03699a07e4a4b5f2d41f)では、
`sceneColor`という最短距離にある物体表面の色を返す関数を実装をすることで、色分けを実現しました。

"reflect"では床も球体も全て同様に鏡面反射させたかったので、この方法で十分でした。

今回の"Carbon"では物体ごとにシェーディングの挙動を切り替えることが必要でした。
背景のMandelboxは普通のPhongシェーディングを行い、空中に漂っている球体は鏡面反射というように、色だけでなく反射の挙動を物体ごとに制御する必要がありました。

今回は衝突情報を`Intersect`という構造体に格納して、衝突した物体に応じたMaterialに応じて、`Intersect.material`にセットするようにしました。

`Intersect`の定義はこうしました。

```c struct Intersect
struct Intersect {
	bool isHit;

	vec3 position;
	float distance;
	vec3 normal;

	int material;
	vec3 color;
};

const int CIRCUIT_MATERIAL = 0;
const int MIRROR_MATERIAL = 1;
```

マーチングループを抜けたあとのシェーディングを行うプログラムで、`Intersect.material`を参照し、シェーディング方法を切り替えるような実装としました。
この方法により、色だけでなく、反射の挙動やシェーディングも物体ごとに制御することを実現しました。

衝突情報を構造体に格納するというのは、ちょっと前につくった["gem"という作品](http://qiita.com/gam0022/items/9875480d33e03fe2113c)からのアプローチからの継承です。
"gem"はレイトレーシングのGLSL実装作品ですが、レイマーチングにも応用できることを証明できました。

ソースコードは可読性重視したので、なんとか読めるレベルになっていると思います。参考にしてください。

## カメラのデバッグ
カメラのデバッグのために`THREE.OrbitControls`を使いたかったので、three.jsで開発やデバッグしました。

- [Carbon - three.js版](http://gam0022.net/misc/raymarching/carbon_tdf2016.html)

ただし、GLSLのエラーを見つけるためにGLSL sandboxにコピペするといったように、three.js製の自作システムと、GLSL sandboxを平行して使用しました。
GLSL sandboxと互換性を持たせるために、three.jsで開発したシステムはGLSL sandboxと互換のある`uniforms`設計をしました。

Mandelboxのいい感じに映し出すためのカメラの軌跡を見つけるのが大変でした。適当に動かすと、すぐにMandelboxの壁に衝突してしまうので…
MandelboxのScaleというパラメータを弄りつつ、直線で壁に衝突しない軌跡を発見できたのは、`THREE.OrbitControls`のおかげです。

他にもスクショをとるのにも、自作システムが役に立ちました。

GLSL sandboxで清書する前に、まずは自作システムで下書きするという方法はオススメです。

# TDFで出会った、すごい人たち
コミュ症なので、普段はあんまり人に話しかけたりしないのですが、勇気を出して交流してみました。

ここからは、TDF（Tokyo Demo Fest）で出会った人たちを紹介します。他己紹介はやったことがないので緊張しますね。

## doxasさん
先週の[#GLSLTech](/blog/2016/02/16/glsl-tech/)につづいて、[@h_doxas](https://twitter.com/h_doxas)さんにお会いしました。

doxasさんは、あの有名な[wgld.org](https://wgld.org/)や[WebGL 総本山](https://webgl.souhonzan.org/)の中の人です。

wgld.orgはWebGLについて日本語で十分な情報が書かれている唯一のサイトといっても過言では無いでしょう。
しかも初心者でも分かるように、とても丁寧に分かりやすく解説されています。

自分自身、[wgld.org](https://wgld.org/d/glsl/)を読んでレイマーチングを学びました。
また、TDFの存在はdoxasさんのTwitterを見て知りました。
もしdoxasさんがいなかったら、今の私はなかったと思います。
ありがとうございます！

そんなdoxasさんの海をテーマにした"The Birth of..."という作品はコチラ！

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/tokyodemofest?src=hash">#tokyodemofest</a> で出品した WebGL のデモ上げました ＞ <a href="https://t.co/EDxflYxDBF">https://t.co/EDxflYxDBF</a></p>&mdash; h_doxas (@h_doxas) <a href="https://twitter.com/h_doxas/status/701637606409379842">2016年2月22日</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

## Mr.Doob
[three.js](http://threejs.org/)の作者であり、[GLSL Sandbox](http://glslsandbox.com/)の作者でもある[Mr.Doob氏](https://twitter.com/mrdoob)が、なんと、TDFのために来日していました！

ちゃっかり記念撮影と握手させていただきました！

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr"><a href="https://twitter.com/mrdoob">@mrdoob</a> と記念撮影！ <a href="https://twitter.com/hashtag/TokyoDemoFest?src=hash">#TokyoDemoFest</a> <a href="https://t.co/j1xwSKNamz">pic.twitter.com/j1xwSKNamz</a></p>&mdash; がむ@TDF最高だった (@gam0022) <a href="https://twitter.com/gam0022/status/702292595486040064">2016, 2月 24</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

私は英語が怪しいので、あまりコミュニケーション取れませんでしたが、[@yomotsu](https://twitter.com/yomotsu)さんに助けていただきました。
yomotsuさんみたいにかっこ良く英語話せるようになりたいと本気で思いました。

[three.jsに今年初めにPRを送った](https://github.com/mrdoob/three.js/pull/7860)ことを覚えてくださったようで、本当に嬉しかったです。めっちゃ優しい人でした。

そんなMr.Doobのマントルをテーマにした作品"Broken Mantra"はコチラ！

<blockquote class="twitter-tweet" data-lang="ja"><p lang="en" dir="ltr">Hacked a quick demo with <a href="https://twitter.com/Lornnn">@Lornnn</a>&#39;s Broken Mantra for <a href="https://twitter.com/TokyoDemoFest">@TokyoDemoFest</a>. Hope you like it! 😊 <a href="https://t.co/UBqTlEURG9">https://t.co/UBqTlEURG9</a> <a href="https://t.co/p68GiA06JT">pic.twitter.com/p68GiA06JT</a></p>&mdash; Ricardo Cabello (@mrdoob) <a href="https://twitter.com/mrdoob/status/701352090833129472">2016年2月21日</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

## yomotsuさん
yomotsuさんも#GLSLTechで先週お会いしたばかりでしたが、TDFでもお会いすることができました。

中学生の時からyomotsuさんを知っていて、[ヨモツネット](http://www.yomotsu.net/wp/)には大変お世話になっていました。

こんな形で出会えるなんて思っていなかったので、世の中なにがあるのか分かりませんね。

## FMS_Catくん
[FMS_CAT](https://twitter.com/FMS_Cat)くんのWebGLによるデモも凄かったですね。Demo Compo2位作品です！

特に最後のグリッチ効果が良い！グリッチ時の映像と音楽が完全に同期とれていてナイスですね。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="en" dir="ltr">[ Type ] on YouTube!! <a href="https://t.co/2Khdm3fpUb">https://t.co/2Khdm3fpUb</a></p>&mdash; FMS_Cat (@FMS_Cat) <a href="https://twitter.com/FMS_Cat/status/701925327883272192">2016年2月23日</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

音楽もWebGLのシェーダで生成して、WebAudioに波形データとして渡して再生しているそうです。

映像はレイマーチングで生成して、フォント埋め埋め込むところに謎技術をつかってます。

ちなみに、FMS_CatのFMSというのは学科名で、大学を背負って活動してるそうです！

## gaziyaさん
[gaziya](https://www.shadertoy.com/user/gaz)さんもヤバかったです。

レイマーチングのテクニックについて、様々なお話を聞きました。

foldによる点対称な物体の配置、一部の物体を消すことで不規則にreperationするテクニックを教えていただきました！

gaziyaさんの"Dragon"は、GLSL Graphics Compoで見事に1位でした！

<script type="text/javascript" src="http://jsdo.it/blogparts/wXzq/js"></script>

未だにこれがレイマーチングによる作品とは信じられません。

レイマーチングでは形状を数式で表現するので、この龍のような有機的な形状を表現するのは、不可能だと思っていました。

時間を見つけて、じっくりコードを研究させていただきます。

## soma_arcくん
[soma_arc](https://twitter.com/soma_arc)の作品はGLSL Graphics Compoで2位でした。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">はてなブログに投稿しました <a href="https://twitter.com/hashtag/%E3%81%AF%E3%81%A6%E3%81%AA%E3%83%96%E3%83%AD%E3%82%B0?src=hash">#はてなブログ</a> <a href="https://twitter.com/hashtag/TokyoDemoFest?src=hash">#TokyoDemoFest</a><br>TokyoDemoFest2016に参加しました - 心鏡曼荼羅<a href="https://t.co/w5sAirKw9G">https://t.co/w5sAirKw9G</a> <a href="https://t.co/A5tGW3evrf">pic.twitter.com/A5tGW3evrf</a></p>&mdash; 蘇摩清良 (@soma_arc) <a href="https://twitter.com/soma_arc/status/701753713266814977">2016年2月22日</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

少ししかお話しかできませんでしたが、レイマーチング若人が増えてきて、負けていられないなと焦りました。

## notargsくん
[notargs](https://twitter.com/notargs)は4月からスクエニで働く優秀な学生です。スクエニ羨ましすぎる！！

彼のブラウン管風シェーダが本当にすごい。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">[Unity3D]ブラウン管風シェーダーを作った <a href="https://t.co/9FIgyy528c">https://t.co/9FIgyy528c</a><br>スキャンラインの速度と、残像の長さを指定できる機能を追加しました。<a href="https://twitter.com/hashtag/unity3d?src=hash">#unity3d</a> <a href="https://twitter.com/hashtag/CRT?src=hash">#CRT</a> <a href="https://twitter.com/hashtag/Shader?src=hash">#Shader</a> <a href="https://twitter.com/hashtag/%E3%83%96%E3%83%A9%E3%82%A6%E3%83%B3%E7%AE%A1%E3%82%B7%E3%82%A7%E3%83%BC%E3%83%80%E3%83%BC?src=hash">#ブラウン管シェーダー</a> <a href="https://t.co/Som59KI8nl">pic.twitter.com/Som59KI8nl</a></p>&mdash; !args (@notargs) <a href="https://twitter.com/notargs/status/686752224391766016">2016年1月12日</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

さらに飲み会で話を聞くと、アルバイトであの1000万DLを突破したスマフォゲームのコアパートのプログラムを手がけていたそうで、格の違いを見せつけられました＞＜

## nikqさん
[hole](https://twitter.com/h013)さんの同僚の[nikq](https://twitter.com/nikq)さん。

リアルタイムなパストレーシングのデモすごかったですね。激戦区のDEMO Compoで3位とってました！

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr"><a href="https://t.co/964xXvOEVb">https://t.co/964xXvOEVb</a> <a href="https://t.co/hKRspPsCUH">https://t.co/hKRspPsCUH</a><br>pouetにsubmitしたら、間違えてpc64kにしちゃったよね <a href="https://t.co/w5lIYufVt1">pic.twitter.com/w5lIYufVt1</a></p>&mdash; nikq (@nikq) <a href="https://twitter.com/nikq/status/701549075582160896">2016年2月21日</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

## veloさん
スウェーデンの["Approximate"というデモグループ](https://www.facebook.com/approximate.demoscene/)の音楽担当の[velo](https://twitter.com/velo_aprx)さん。

打ち上げの席で一緒になりました。

聞き間違えでなければ、全世界のデモイベントに参加していて、80回以上の参加しているとか！

「Amigaは日本で有名か？」という質問には笑ってしまいました（TDFの参加者がAmiga大好きなのは何故なんだろう…）。

また、Approximateのグラフィックプログラマーの[Crypticさんのインタビュー記事](http://6octaves.blogspot.jp/2016/01/crypticapproximate.html)を見せてくれました。

（自分のひどい英語に根気よく付き合ってくださってありがとうございました＞＜）

## 0x4015 & YET11さん
"2nd stage BOSS"はDEMO Compo 1位の作品です。圧倒的なクオリティの作品です。

0x4015さんが映像、YET11さんが音楽の作者さんです。

<iframe width="560" height="315" src="https://www.youtube.com/embed/SFoyJED5A4s" frameborder="0" allowfullscreen></iframe>

こんな凄まじい作品が4K部門なんて信じられないですね。

残念なことに、0x4015さんもYET11さんにもお会いできませんでした。来年こそは是非お会いしたい！

### 2nd stage BOSSはレイマーチング作品！？
この記事を執筆している途中で知ったのですが、[i_saint](https://twitter.com/i_saint)さんによると、レイマーチングで実装してるみたいですね。
i_saintさんが["2nd stage BOSS"をGLSL Sandboxにポートしていて](https://t.co/4lr7GbTnFc)、たいへん驚きました。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr"><a href="https://twitter.com/gam0022">@gam0022</a> yes です。4k 作品はピクセルシェーダ以外に割く容量がほぼ無いのと、現状レイマーチが最も低容量で綺麗な 3DCG 出す方法なので、GLSL Sandbox とかにポート可能な作品も多いです。 (私もコードの具体的な内容は全然理解できてません！)</p>&mdash; i-saint (@i_saint) <a href="https://twitter.com/i_saint/status/702862298600198144">2016年2月25日</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

さらに、Shadertoyにも移植されて、音楽まで含めて完全にWebGLで再現できるようになっていました。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="en" dir="ltr">So <a href="https://twitter.com/i_saint">@i_saint</a> and I decompiled &quot;Second stage BOSS&quot;, extracted the shaders, and patched it for WebGL. Enjoy! <a href="https://t.co/ezmkRsZ6J5">https://t.co/ezmkRsZ6J5</a> <a href="https://twitter.com/hashtag/shadertoy?src=hash">#shadertoy</a></p>&mdash; Michael Tedder (@_Falken) <a href="https://twitter.com/_Falken/status/702863221409976321">2016年2月25日</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

また、[kioku_systemk](https://twitter.com/kioku_systemk)さんから、4KBプロシージャルGFXのテンプレートを教えていただきました。
このようなテンプレートがあれば、4Kデモのシェーダプログラムに集中できるので、素晴らしいですね。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr"><a href="https://twitter.com/i_saint">@i_saint</a> <a href="https://twitter.com/gam0022">@gam0022</a> 最近の向けの説明だとこっちの方が目的のものに近いかもです。 <a href="https://t.co/ylBByZfESf">https://t.co/ylBByZfESf</a></p>&mdash; kioku@TDF片付け (@kioku_systemk) <a href="https://twitter.com/kioku_systemk/status/702877874462728192">2016年2月25日</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

GLSL sandboxへのportが可能であれば、逆に4Kのexeにもport可能なはずなので、来年のTDFでは4K Compoから出してもいいかな、とちょっと考えました。
しかし、自分には音楽をプロシージャルに作る技術は無いので、冷静に考えたら無謀でしたｗ

せっかくシェーダのコードが公開されているので、研究させていただきます！

大会が終わった後でも、こんなにもワクワクさせてくれるTDFは本当に最高ですね！

いつか自分も、このくらいのデモを作れるようになりたいなぁ…（無理だなぁ）

# おわりに
興味の近い人と交流するのって、最高に楽しいですね！

来年も参加するので、よろしくお願いしますm(_ _)m
