---
layout: post
title: "Octopressでbootstrap-themeにしたとき、sass/custom/_styles.scssが反映されなくなった件について"
date: 2012-07-24 22:50
comments: true
categories: 
- Octopress
- CSS
- SASS/SCSS
- theme
- bootstrap
---

## Octopressでbootstrap-themeにしたとき、sass/custom/_styles.scssが反映されなくなった件について

前回、[Octopressのテーマをカスタマイズする](http://gam0022.net/blog/2012/07/21/use-bootstrap-theme/)という記事で、
Octopressに[bootstrap-theme](https://github.com/bkutil/bootstrap-theme)を導入しました。

{% blockquote Overriding Styles http://octopress.org/docs/theme/styles/ %}
If you want to add or override styles, edit sass/custom/_styles.scss. This stylesheet is imported last, so you can override styles with the cascade.
{% endblockquote %}

上の文はOctopressの公式からの引用で、本来であれば`sass/custom/_styles.scss`
に書いたSCSSが最終的にオーバーライドされて適用されるはずです。

しかし、このテーマを導入してから、`sass/custom/_styles.scss`に書いたSCSS(CSS)が反映されなくなってしまいました。

## OctopressのCSS生成の仕組み

Octopressでは、`sass`以下のディレクトリにある`.scss`ファイルを読み取り、
最終的なCSSを生成しているようです。(たぶん)

SCSSとは、CSSメタ言語のことで、要するにCSSを生成するための言語です。

本題の`sass/custom/_styles.scss`が反映されない原因は単純で、
`sass/bootstrap/bootstrap.scss`を見たら、`sass/custom/_styles.scs`がimportされていませんでした。

というわけで、`sass/bootstrap/bootstrap.scss`の最終行に次のような感じでimport文を追加することで解決します。

{% codeblock lang:scss %}
// Custom
@import "custom/colors";
@import "custom/fonts";
@import "custom/layout";
@import "custom/styles";
{% endcodeblock %}

後は、`sass/custom/_styles.scs`に好きな設定を書けばOKです。ひとまず、こんな感じにしました。

{% codeblock lang:scss %}
// This File is imported last, and will override other styles in the cascade
// Add styles here to make changes without digging in too much

div.entry-content {
	h1, h2, h3, h4, h5, h6 {
		line-height: 2;
		margin-top: 30px;
		margin-bottom: 20px;
		padding-left: 10px;
	}
	h1 {
		font-size: 20px;
		background: #eee;  
		border-left: 7px solid #777;  
		margin-top: 50px;
	}
	h2 {
		font-size: 18px;
		border-left:7px solid #ccc;  
		border-bottom:1px solid #ccc;
		margin-top: 40px;
	}
	h3 {
		font-size: 15px;
		border-left:7px solid #ccc;  
	}
	h4 {
		line-height: 1.5;
		font-size: 14px;
		border-bottom:1px solid #ddd;
	}
	h5 {
		line-height: 1.5;
		font-size: 12px;
		border-bottom:1px dashed #ddd;
	}
	h6 {
		line-height: 1.5;
		font-size: 11px;
	}
}
{% endcodeblock %}

まあ、せいぜいsubsubsectionくらいまでしか使いませんよね…

# h1
## h2
### h3
#### h4
##### h5
###### h6
