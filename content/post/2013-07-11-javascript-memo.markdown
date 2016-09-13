---
layout: post
title: "JavaScriptのメモ"
date: 2013-07-11 05:58
comments: true
categories: 
- JavaScript
- COJT
---

最近、COJTという授業でWebGLとHTML5、JavaScriptなどを駆使して、3Dを使ったカバンの商品カタログのような物体を生成しています。

JavaScriptなどについて色々調べているので、有益そうなことをメモします。

とりあえず、動くようになったので、公開用のURLを晒しておきます。

[COJT用の何か](http://gam0022.net/app/shelf/)

実は、開発方法が色々とアレなのですが、ここでは深く言わないことにします。

# JavaScriptそのものについて

私のようにクラスベースオブジェクト指向の言語から入った人間にとっては、
JavaScriptのプロトタイプベースオブジェクト指向はなかなか馴染みにくいものでした。

そういう人は、以下のサイトなどから、JavaScriptのOOPについて学習するのが良いと思います。

* [最強オブジェクト指向言語 JavaScript 再入門！ slideshare](http://www.slideshare.net/yuka2py/javascript-23768378)
* [JavaScriptでオブジェクト指向プログラミング @IT](http://www.atmarkit.co.jp/ait/articles/0709/25/news148.html)


# イーズ・アウト について

COJT用の何かをみてもらえれば分かると思うのですが、棚の回転やパネルのポップアップの動きが
等速ではなく、動きの終わりに減速するようになっていると思います。

動きの終わりに減速する動きを「イーズ・アウト」と呼ぶそうです。

イーズ・アウトは重要で、フレーム数が限られた描画でも滑らかに動きに見せることができます。

ぶっちゃけ、COJTで学んだ一番のことと言うと、イーズ・アウトという単語を覚えたことな気がします。

イーズ・アウトの実現方法は色々とあると思いますが、私は次の関数で実装することにしました。

{% math%}
f(t) = 1 - exp(-6t)
{% endmath %}

tは時間で、tを0〜1の間で変化させると、f(t)が良い感じにイーズアウトする物体の座標になります。

この式は、次のサイトから知りました。

[指数関数を使ったお手軽イーズ・アウト](http://radiumsoftware.tumblr.com/post/5031889912)


# spinrfの実装

JavaScriptには、spinrfがないので、自分で実装するか、誰かが作った実装を使う必要があります。

単純な用途なら、この実装で十分だと思いました。

[連載：jQuery逆引きリファレンス：第5回 コア編 (11/13) @IT](http://www.atmarkit.co.jp/ait/articles/1003/12/news088_11.html) より

``` javascript sprintf.js
// sprintf('{0}は{1}', '猫', 'うろうろ'); => '猫はうろうろ'
sprintf = function(format) {

  // 第2引数以降を順に処理
  for (var i = 1; i < arguments.length; i++) {

    // 正規表現でプレイスホルダと対応する引数の値を置換処理
    var reg = new RegExp('\\{' + (i - 1) + '\\}', 'g');
    format = format.replace(reg, arguments[i]);
  }

  // 最終的な置き換え結果を戻り値として返す
  return format;
};
```


# Android の判定

Android からアクセスされたときだけ、JavaScriptで別の処理をしたい場合があったのですが、
userAgentを使うことで判定できました。

``` javascript judge_android.js
var agent = navigator.userAgent;
this.is_android = false;
if(agent.search(/Android/) != -1){
  this.is_android = true;
}
```


# まとめ

あまりJavaScriptのメモではないですね。

他にも書きたいことがあるのですが、[MatrixEngine](http://mxengine-se.net-dimension.com/) というレアな開発環境のために、
記事にしてもたぶん必要とする人がいないので、MatrixEngine については書きませんでした。

しかし、COJTのアレのリポジトリをgithubに上げているので、それを見れば、少しは開発の苦労が想像できるかもしれません。

[COJT用に作った何か github](https://github.com/gam0022/shelf)
