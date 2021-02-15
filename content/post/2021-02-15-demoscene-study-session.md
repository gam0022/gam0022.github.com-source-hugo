+++
draft = false
tags = [
    "event", "CG", "レイマーチング", "TokyoDemoFest", "WebGL", "GLSL"
]
title = "メガデモ勉強会2021で登壇しました"
slug = "demoscene-study-session"
date = "2021-02-15T13:26:18+09:00"
image = "/images/posts/2021-02-15-demoscene-study-session/20210214_demoscene.jpg"
toc = true
math = false

+++

昨日の2/14（バレンタインデー）に開催された[The Tokyo Demo Fest team presents: メガデモ勉強会2021](https://connpass.com/event/200294/)に参加しました。

私は「64KBのWebGLデモを実装する技術とデモ制作から得た『学びと発見』」というタイトルで発表を行いました。

発表スライドはこちらです。

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRd-L7WcWWzcoE9zNpBsJdeMjJf9HelDg1Pto8cFGJTjinejpjZ1mGmzWCZPANJZ0QOCObuVOIdPuy-/embed?start=false&loop=false&delayms=3000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

<!--more-->

<blockquote class="twitter-tweet" data-conversation="none"><p lang="ja" dir="ltr">本日の <a href="https://twitter.com/hashtag/%E3%83%A1%E3%82%AC%E3%83%87%E3%83%A2%E5%8B%89%E5%BC%B7%E4%BC%9A?src=hash&amp;ref_src=twsrc%5Etfw">#メガデモ勉強会</a> の発表資料です！<br><br>Revision2020のPC 64K Introで優勝したデモ作品『RE: SIMULATED』を題材にして、効率的なデモ制作に必要なエディタ機能やWebGLのプロジェクトの構成、制作中に直面した問題と解決について解説しました。<br><br>レイマーチングはいいぞ！<a href="https://t.co/QWHOXHmZqu">https://t.co/QWHOXHmZqu</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1360889255669633024?ref_src=twsrc%5Etfw">February 14, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Revision2020のPC 64K Introで優勝したデモ作品『RE: SIMULATED』を題材にして、効率的なデモ制作に必要なエディタ機能やWebGLのプロジェクトの構成、制作中に直面した問題と解決について解説しました。

発表の締めとして「CGを学ぶことで世界の解像度を上げるのが楽しい」「レイマーチングはCG入門に最適」という持論について語りました。

# 質疑応答と補足

- 質問1: シェーダーを分割することで容量がどのくらい増えるか？
    - マルチパスを前提のエンジン設計にしたので、シェーダー分割してもTypeScriptのコード量は増えない
    - 重複コードはzlib（pnginator.rb）で圧縮されるため、シェーダーの圧縮後のコードもほとんど増えない
    - 前半と後半で2分割したときは45byteだけ増えた（[PR](https://github.com/gam0022/resimulated/pull/112)）
- 質問2: シェーダーの数と行数について
    - サウンドシェーダーは1ファイル。グラフィックス用のシェーダーは合計10ファイル
    - サウンドシェーダーは行数が1800行ほどだが、zlibで効率よく圧縮できるので、最終的なファイル容量にはあまり影響しなかった
    - グラフィックス用のシェーダーは最大（宇宙空間のレイマーチング）で700行、最小（Bloomのポストエフェクト）で10行ほど
    - 用途によって幅があるが、レイマーチング用のシェーダーだと平均して400行くらい
- 質問3: ディレクションについて
    - 制作前に打ち合わせをしてBPMは決めていた
        - 音楽と絵の同期はBPMで行っているので重要
    - 方向性は絵が先行
    - 尺については音楽が先行
- 補足1: Bloomのポストエフェクトはエンジンのビルトイン機能にした
    - 縮小バッファーを利用するマルチパスのBloomにしたので、ビルトインにしたほうがサイズを小さく効率よく実装できそうだったから
    - フォント描画用のテクスチャ生成機能などShadertoyにはない仕様も何個か実装した
- 補足2: OpenGLよりWebGLの方がGLSLのコンパイル時間が長い
    - WebGLのデモではなく、OpenGLのexeによるデモすれば、GLSLのコンパイル時間が緩和される
    - Windows版のChromeおよびFirefoxでは、ANGLEを経由してDirect3Dを使ってWebGLを実現しているらしいのですが、ANGLEを経由する分だけGLSLコンパイルに時間のかかるケースが多い（[Twitter](https://twitter.com/gaziya5/status/1361134297315348482)）
    - `chrome.exe --use-angle=gl` というオプション付きでChromeを起動すると、ANGLEを経由せずにWebGLを利用できる（[Twitter](https://twitter.com/gaziya5/status/1350418640093413377)）

# 感想

かなり久しぶりに日本のデモシーンの人たちとワイワイできて楽しかったです！

最後のTokyoDemoFestは2018年の12月なので、もう2年以上も前なんですよね。時間が経つのは早いです。

discord上の懇親会では「どうすればライブコーディングが普及できるのか？一般人でも理解できるような実況が必要という仮説」「物理的な会場のクラブの体験とVRの違い」など興味深いお話を聞けて面白かったです。

素晴らしいイベントを企画・開催してくださったTDFのオーガナイザーのみなさん、本当にありがとうございました！

# 関連記事

過去の関連登壇の記事のリンクです。

- [メガデモ勉強会!2018で発表しました](https://gam0022.net/blog/2018/03/16/demoscene-study-session/)
- [GLSL シェーダテクニック勉強会 #GLSLTechで登壇しました](https://gam0022.net/blog/2016/02/16/glsl-tech/)
    - この勉強会も5年前のバレンタインデーだったので何かの運命を感じました
    - 私がレイマーチングを始めてから5年以上も経過しているのもちょっと驚きでした