+++
draft = false
tags = [
    "Unity", "Shader", "CG", "URP", "ShaderGraph", "入門", "初心者"
]
title = "UnityのShaderGraphでインクシェーダーを作る"
slug = "unity-ink-shader"
date = "2022-12-25T23:03:44+09:00"
image = "/images/posts/2022-12-26-unity-ink-shader/main.png"
toc = true
math = false

+++

これは[Unity Advent Calendar 2022](https://qiita.com/advent-calendar/2022/unity)の22日目の記事です。

---

スプラトゥーン3、けっこう面白いですね。過去作の1,2は未プレイでしたが、3からスプラデビューしました。

スプラ3で遊びながら、インクシェーダーの実装方法に興味が出てきたので、UnityのShaderGraphでそれっぽいものを実装してみました。

ShaderGraphの基本機能だけで構成されており、ノードの量も少なめにしました。

ShaderGraphの基本操作は解説しませんが、なるべく丁寧に説明をしたつもりなので、ShaderGraphの入門記事として参考にしてください！

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">UnityのShaderGraphでインクシェーダーを試作<a href="https://twitter.com/hashtag/Unity3D?src=hash&amp;ref_src=twsrc%5Etfw">#Unity3D</a> <a href="https://twitter.com/hashtag/ShaderGraph?src=hash&amp;ref_src=twsrc%5Etfw">#ShaderGraph</a> <a href="https://t.co/PHxIkfnkiQ">pic.twitter.com/PHxIkfnkiQ</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1606141695724204032?ref_src=twsrc%5Etfw">December 23, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

[![インクシェーダー](/images/posts/2022-12-26-unity-ink-shader/ink-shader.gif)](/images/posts/2022-12-26-unity-ink-shader/ink-shader.gif)

色変更

[![インクシェーダー 色変更](/images/posts/2022-12-26-unity-ink-shader/ink-shader-color.gif)](/images/posts/2022-12-26-unity-ink-shader/ink-shader-color.gif)

しきい値の調整

[![インクシェーダー しきい値の調整](/images/posts/2022-12-26-unity-ink-shader/ink-shader-threshold.gif)](/images/posts/2022-12-26-unity-ink-shader/ink-shader-threshold.gif)

- Unityプロジェクト
    - [github.com/gam0022/ShaderPlaygroundURP](https://github.com/gam0022/ShaderPlaygroundURP)
- [WebGLデモ](https://gam0022.net/ShaderPlaygroundURP/)
    - WASDと右クリックのドラッグでカメラ操作

<!--more-->

# ShaderGraph全体

ShaderGraphの全体です。

文字が小さくてすみません。

※2回に分けてスクリーンショットを撮影してMSペイントで手動結合しました。3回以上分割して撮影すればもっと高解像度にできるのですが、手間がかかるので諦めました。
いい感じにウィンドウのスクロール領域を含めて一発でスクリーンショットを撮る方法があれば教えてください。

[![ShaderGraph全体](/images/posts/2022-12-26-unity-ink-shader/shader-graph-all.png)](/images/posts/2022-12-26-unity-ink-shader/shader-graph-all.png)

## 基本方針

- URPのLitグラフに与えるBaseColorやSmoothnessや法線をいい感じに制御してインクっぽくする
    - カスタムなシェーディングはしない
- インクの高さマップはGradient Noiseからプロシージャル生成
    - インタラクティブなインク制御は未対応
    - RenderTextureを生成してペイントするようなアプローチでインタラクティブにできそう（今後の課題）

# チュートリアル

そこまで規模の大きくないShaderGraphですが、理解しやすいように1ステップごと解説します。

## ステップ1. PBRテクスチャに対応

まずはPBRテクスチャに対応します。

PBRテクスチャは以下のサイトからお借りしました。とても良い感じのCC0ライセンスの床のタイル素材を利用させていただきました。

- [Cobblestone Floor 08 Texture • Poly Haven](https://polyhaven.com/a/cobblestone_floor_08)

これがPBRテクスチャをプロパティにして、ShaderGraphの各種PBRパラメーターを渡すだけのShaderGraphです。

[![PBRテクスチャに対応](/images/posts/2022-12-26-unity-ink-shader/1-armtex.png)](/images/posts/2022-12-26-unity-ink-shader/1-armtex.png)

`BaseColor` や `Normal` はそのままノードを繋げるだけでOKです。

`Metallic/Smoothness/Ambient Occlusion` だけ少し工夫がいります。

Poly Havenのテクスチャは `Ambient Occlusion/Roughness/Metallic`（以下、ARMテクスチャ）がRGBに格納されているようなので、RGBの順番をBGRのように並び替える必要があります。

`Smoothness = 1 - Roughness` の関係があるので `One Minus` ノードで変換します。

これでPoly Havenから落としてきたARMテクスチャに対応したShaderGraphができました。

## ステップ2. UVのタイリング

ここから最終的なインクシェーダーのShaderGraphをステップごとに解説します。

まずUVのタイリングですが、単純にUVに定数を乗算しているだけです。今回は下地のテクスチャ用とインク用で独立してタイリングできるようにしました。

[![UVのタイリング](/images/posts/2022-12-26-unity-ink-shader/2-uv.png)](/images/posts/2022-12-26-unity-ink-shader/2-uv.png)

## ステップ3. インクの高さマップ用のノイズ生成

インクの高さマップはGradient Noiseから生成します。時間でアニメーションさせるために2つのGradient Noiseを線形補間で合成しています。

1つ目のGradient NoiseのUVは固定させておいて、2つ目のGradient NoiseのUVはtimeでスクロールさせています。

非常にシンプルな処理ですが、意外にもそれなりにインクっぽく見えるのではないでしょうか？

余談になりますが、ShaderGraphのGradient Noiseはシェーダーでプロシージャル生成しているのでGPU負荷も高いと思います。実用するなら軽量化のためにテクスチャのサンプリングに置き換えた方がいいかもしれません。

[![インクの高さマップ用のノイズ生成](/images/posts/2022-12-26-unity-ink-shader/3-noise.png)](/images/posts/2022-12-26-unity-ink-shader/3-noise.png)

## ステップ4. 凹凸を考慮したインク判定のしきい値

ステップ3. でインクの高さマップを生成しました。この高さマップがしきい値以上ならインクの領域と見なすようにします。

インク判定のしきい値は定数でも良いのですが、高さマップを考慮してブロックの溝など低い部分の方がインクになりやすくします。

[![インクの高さマップ用のノイズ生成](/images/posts/2022-12-26-unity-ink-shader/4-threshold.png)](/images/posts/2022-12-26-unity-ink-shader/4-threshold.png)

高さマップの影響力はプロパティで制御できるようにしました。

高さマップの考慮がないと真っ平らなPlaneにインクが乗っているようで、雑コラ感・馴染まない感があります。

[![高さマップの考慮なし](/images/posts/2022-12-26-unity-ink-shader/height-intensity-off.png)](/images/posts/2022-12-26-unity-ink-shader/height-intensity-off.png)

高さマップを考慮すると、ブロックの凹凸を考慮してインクが広がるので、リアリティを少し向上できます。

[![高さマップの考慮あり](/images/posts/2022-12-26-unity-ink-shader/height-intensity-on.png)](/images/posts/2022-12-26-unity-ink-shader/height-intensity-on.png)

## ステップ5. インクのマスク生成

「ステップ3のインクの高さマップ」から「ステップ4のしきい値」を引き算することで、インクのマスク画像を生成します。

そのままだとコントラストが薄いので、Powerノードでコントラストを強めに調整します。

[![インクのマスク生成](/images/posts/2022-12-26-unity-ink-shader/5-1-ink-mask.png)](/images/posts/2022-12-26-unity-ink-shader/5-1-ink-mask.png)

インクのマスクマップをLerpの引数にして、各種PBRパラメーターにインク用の値をブレンドします。
元はARMテクスチャの値をそのままPBRパラメーターとして渡していましたが、間にLerpノードを挟み込んで、インク用の `Ambient Occlusion/Roughness/Metallic` をブレンドできるようにしました。

[![インク用の設定をブレンド](/images/posts/2022-12-26-unity-ink-shader/5-2-ink-mask.png)](/images/posts/2022-12-26-unity-ink-shader/5-2-ink-mask.png)

BaseMapも同じようにLerpします。

[![インク用の設定をブレンド(BaseMap)](/images/posts/2022-12-26-unity-ink-shader/5-3-ink-mask.png)](/images/posts/2022-12-26-unity-ink-shader/5-3-ink-mask.png)

## ステップ6. 法線の生成

[![法線の生成](/images/posts/2022-12-26-unity-ink-shader/6-normal.png)](/images/posts/2022-12-26-unity-ink-shader/6-normal.png)

ステップ3のインクの高さマップから法線を生成します。Normal From Heightノードがあるので利用します。

ステップ5のインクのマスクでは高さマップの影響で高周波成分が現れてしまうので滑らかな法線ができず、法線生成には不適切です。しきい値を引き算する前のGradient Noiseの値をNormal From Heightノードに繋ぎます。

今回もPowerノードでコントラストを調整可能にしました。SaturateノードではなくMaximumノードを利用しているのでは、 `Clamp(x, 0, INF)` にしたいからです。

マスク画像の結果は `[0-1]` に正規化する必要がありますが、法線生成のHeightマップであれば最大値の制限は不要だと思ったからです。

以上がインク用のシェーダーの解説でした。

# まとめ

ShaderGraphだけでノーコードのインクシェーダーを試作しました。
PBRパラメーターを制御するだけのお手軽な実装ですが、思ったよりも良い見た目になったので満足です。

今回はインクのマスクにGradient Noiseを利用しましたが、RenderTextureをシェーダー外部から与えればインタラクティブにインクを塗ったりもできると思います。