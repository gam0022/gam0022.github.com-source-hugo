---
layout: post
title: "Canvasでハマった点まとめ"
date: 2013-09-16 14:05
comments: true
categories: 
- Canvas
- HTML5
- JavaScript
- Chrome
---

[Twitter名刺ジェネレータ](http://gam0022.net/app/tmg/)を作るにあたって、
Canvas を使ったので、勉強になったことを適当にメモします。

関連記事

* [SQlite3でハマった点まとめ](/blog/2013/09/16/sqlite3-memo/)


# canvas#toDataURL() の注意点

[`canvas#toDataURL()`](http://www.html5.jp/canvas/ref/HTMLCanvasElement/toDataURL.html) の注意点なのですが、
一度でもクロスドメインで読み込んだファイルを描画した canvas に対して使うと、
`Uncaught SecurityError: An attempt was made to break through the security policy of the user agent.` というエラーがでます。

クロスドメインで取得した`Image`を引数にしても、[`context#drawImage()`](http://www.html5.jp/canvas/ref/method/drawImage.html)は成功するので、すこし気が付きにくいと思いました。

Chrome バージョン 29.0.1547.65 で確認しました。

<!--more-->

# Canvas で複数行のテキストを描画する

Canvas で、指定した幅でテキストを改行させたかったのですが、標準の関数では実現できませんでした。

仕方ないので、[指定した幅で文字列を分割して配列に入れる関数](http://ninoha.com/?p=60)を作って、
複数回に分けて `context#fillText()` をするしかないようです。


[twitter-meishi-generator / js / functions.js](https://github.com/gam0022/twitter-meishi-generator/blob/master/js/functions.js)


``` javascript Canvas で複数行のテキストを描画する
// http://ninoha.com/?p=60
/*
      文字列を指定幅ごとに区切る
 
      context : 描画コンテキスト
      text    : 変換元の文字列
      width   : １行の最大幅
 
      戻り値  : １行毎に分割した文字列の配列
*/
function multilineText(context, text, width) {
    var len = text.length; 
    var strArray = [];
    var tmp = "";
    var i = 0;
 
    if( len < 1 ){
        //textの文字数が0だったら終わり
        return strArray;
    }
 
    for( i = 0; i < len; i++ ){
        var c = text.charAt(i);  //textから１文字抽出
        if( c == "\n" ){
            /* 改行コードの場合はそれまでの文字列を配列にセット */
            strArray.push( tmp );
            tmp = "";
 
            continue;
        }
 
        /* contextの現在のフォントスタイルで描画したときの長さを取得 */
        if (context.measureText( tmp + c ).width <= width){
            /* 指定幅を超えるまでは文字列を繋げていく */
            tmp += c;
        }else{
            /* 超えたら、それまでの文字列を配列にセット */
            strArray.push( tmp );
            tmp = c;
        }
    }
 
    /* 繋げたままの分があれば回収 */
    if( tmp.length > 0 )
        strArray.push( tmp );
 
    return strArray;
}

function fillMultilineText(context, text, width, x, y, line_height, max_line) {
  var ary = multilineText(context, text, width);
  var n = ary.length;
  if (n > max_line) {
    n = max_line;
  }
  for (var i = 0; i < n; ++i) {
    context.fillText(ary[i], x, y + line_height * i);
  }
}
```
