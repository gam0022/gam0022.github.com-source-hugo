+++
draft = false
tags = [
    "Unity", "Shader", "CG"
]
title = "[Unity][URP] Y軸ビルボードシェーダー"
slug = "unity-urp-billboard-shader"
date = "2021-12-23T10:00:00+09:00"
image = "/images/posts/2021-12-23-unity-urp-billboard-shader/20211223020601_x1.jpg"
toc = true
math = false

+++

これは[Unity Advent Calendar 2021](https://qiita.com/advent-calendar/2021/unity)の23日目の記事です。

前日は[@UnagiHuman](https://twitter.com/UnagiHuman)さんの[「Unityの新MeshAPIでMeshColliderをリアルタイム変形させる」](https://qiita.com/UnagiHuman/items/7db6c75adea0d5862acf)でした。

---

こんな感じのY軸のビルボードをC#スクリプトを使わずに、シェーダーだけで実装しました。

![Y軸ビルボード](/images/posts/2021-12-23-unity-urp-billboard-shader/Unity-URP-Billboard-trim.gif)

GitHubリポジトリ: [gam0022/unity-urp-shader](https://github.com/gam0022/unity-urp-shader)

# 要約

- シェーダーだけでY軸ビルボードを実装
- UnityのURP対応
- 回転行列を生成するアプローチなので、プラットフォーム間の違い（Zの方向やUVの上下など）による問題が起きない

<!--more-->

# シェーダーで実装するメリット

シェーダーでビルボードを計算するメリットはたくさんあります。

- C#スクリプトが不要でシェーダーだけで動作する
    - シェーダーのポータビリティは高い
    - 昔のVRCのようにユーザスクリプトが書けない環境でも使える
- シーンビュー上でも動作する
- GPU（頂点シェーダー）でビルボード計算ができる
    - ビルボード計算のためのCPU負荷は0
    - 板ポリの頂点数は4なので、頂点シェーダーでビルボード処理をしても、GPU負荷はかなり軽い

# シェーダーのコード（全体）

最終的なシェーダーのコードはこちらです。

単体で動作するので、コピペして使えます。MITライセンスです。

```c
// URP-Unlit-Billboard Shader by @gam0022 (MIT Licence)
// https://gam0022.net//blog/2021/12/23/unity-urp-billboard-shader/
Shader "Universal Render Pipeline/Unlit-Billboard"
{
    Properties
    {
        _BaseMap ("Base Map", 2D) = "white" { }
        _BaseColor ("Base Color", Color) = (1, 1, 1, 1)
        _Cutoff ("Alpha Cutoff", Range(0, 1)) = 0.5
    }

    SubShader
    {
        Tags {
            "RenderPipeline" = "UniversalPipeline"
            "RenderType" = "TransparentCutout"
            "Queue" = "AlphaTest"
            "IgnoreProjector" = "True"
        }

        Pass
        {
            Tags { "LightMode" = "UniversalForward" }

            HLSLPROGRAM

            #pragma vertex vert
            #pragma fragment frag

            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

            struct Attributes
            {
                float4 positionOS: POSITION;
                float2 uv: TEXCOORD0;
            };

            struct Varyings
            {
                float4 positionHCS: SV_POSITION;
                float2 uv: TEXCOORD0;
            };

            sampler2D _BaseMap;

            CBUFFER_START(UnityPerMaterial)
            float4 _BaseMap_ST;
            half4 _BaseColor;
            half _Cutoff;
            CBUFFER_END

            Varyings vert(Attributes IN)
            {
                Varyings OUT;

                // 回転行列を生成してビルボード処理をします
                float3 yup = float3(0.0, 1.0, 0.0);
                float3 up = mul((float3x3)unity_ObjectToWorld, yup);

                float3 worldPos = unity_ObjectToWorld._m03_m13_m23;
                float3 toCamera = _WorldSpaceCameraPos - worldPos;
                float3 right = normalize(cross(toCamera, up)) * length(unity_ObjectToWorld._m00_m10_m20);
                float3 forward = normalize(cross(up, right)) * length(unity_ObjectToWorld._m02_m12_m22);

                float4x4 mat = {
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1,
                };
                mat._m00_m10_m20 = right;
                mat._m01_m11_m21 = up;
                mat._m02_m12_m22 = forward;
                mat._m03_m13_m23 = worldPos;

                float4 vertex = float4(IN.positionOS.xyz, 1);
                vertex = mul(mat, vertex);
                OUT.positionHCS = mul(UNITY_MATRIX_VP, vertex);

                OUT.uv = TRANSFORM_TEX(IN.uv, _BaseMap);
                return OUT;
            }

            half4 frag(Varyings IN): SV_Target
            {
                half4 base = tex2D(_BaseMap, IN.uv);
                clip(base.a - _Cutoff);
                return base * _BaseColor;
            }
            ENDHLSL

        }
    }
}
```

# 解説

## 前回の記事との違い

この記事は前回の記事[[Unity] Y軸ビルボードシェーダーの実装と解説](/blog/2019/07/23/unity-y-axis-billboard-shader/)の改訂版です。以下のような違いがあります。

- URP（Universal Render Pipeline）に対応
- ビルボード処理のアプローチを改良（プラットフォーム依存をなくす）

### 前回の記事（ビュー変換をスキップ）の欠点

前回の記事では、カメラのビュー行列の変換をスキップすることで、ビルボード処理を実装していました。

Unityではプラットフォーム間の違い（Zの方向やUVの上下など）をビュー行列とプロジェクション行列でうまく吸収する設計になっており、ビュー行列の変換をスキップするとプラットフォームの対応を自力で行う必要が出てきて、かなり面倒でした。
将来的に新しいプラットフォームが増えた時などにシェーダーの修正が必要になる可能性もあり、このアプローチは筋が良くないな、と記事の公開後に思っていました。

今回紹介する **回転行列を生成するアプローチ** では、そのようなプラットフォーム依存の問題が起きません。

## 回転行列を生成するアプローチ

Unityが生成するモデル行列を使わずに、頂点シェーダーの中でうまく回転行列を生成することで、常にカメラ側を向くようにMeshを回転させてビルボード処理を実現します。

シェーダーからビルボード処理を抜き出して、できるだけコメントを入れました。

```c
// 回転行列を生成してビルボード処理をします
// 常にカメラ側を向くようにMeshを回転させます

// Y-UPベクトル
float3 yup = float3(0.0, 1.0, 0.0);

// up = Y軸の基底ベクトル
// オブジェクトのTransformの回転を考慮
float3 up = mul((float3x3)unity_ObjectToWorld, yup);

// オブジェクトのワールド座標
float3 worldPos = unity_ObjectToWorld._m03_m13_m23;

// オブジェクトからカメラに向かうベクトル
float3 toCamera = _WorldSpaceCameraPos - worldPos;

// right = X軸の基底ベクトル
// 前半の項 : rightはtoCameraとupの両方に直交するので、crossから計算
// 後半の項 : オブジェクトのTransformのX方向のスケールを考慮
float3 right = normalize(cross(toCamera, up)) * length(unity_ObjectToWorld._m00_m10_m20);

// forward = Z軸の基底ベクトル
// 前半の項 : forwardはupとrightの両方に直交するので、crossから計算
// 後半の項 : オブジェクトのTransformのZ方向のスケールを考慮
float3 forward = normalize(cross(up, right)) * length(unity_ObjectToWorld._m02_m12_m22);

// 各基底ベクトルを並べてビルボード用の回転行列を生成
// （厳密には平行移動とスケールも含んだ変換行列）
float4x4 mat = {
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
};
mat._m00_m10_m20 = right;//     X軸の基底ベクトル
mat._m01_m11_m21 = up;//        Y軸の基底ベクトル
mat._m02_m12_m22 = forward;//   Z軸の基底ベクトル
mat._m03_m13_m23 = worldPos;//  平行移動のベクトル


// ローカル座標（平行移動のためにw=1）
float4 vertex = float4(IN.positionOS.xyz, 1);

// ビルボード用の回転行列を乗算してワールド空間に変換
vertex = mul(mat, vertex);

// ビュー行列とプロジェクション行列を乗算してクリップ空間に変換
OUT.positionHCS = mul(UNITY_MATRIX_VP, vertex);
```

これは超重要情報ですが、 **回転後の空間の基底ベクトルを並べた行列が回転行列になります。** 

これだけ覚えておけば、回転だけでなく、拡大縮小やSkew（せん断）の行列は自然に導出できます。

知らなかった人はぜひ覚えておきましょう。CEDECで同じ話を2回くらいしています（[2020](https://www.klab.com/jp/blog/creative/2020/cedec2020.html)と[2021](https://www.klab.com/jp/blog/tech/2021/cedec-kyushu-2021-online-3d.html)）。

![基底ベクトルをイメージすればOK](/images/posts/2021-12-23-unity-urp-billboard-shader/kec2-1.png)
![回転ベクトル1](/images/posts/2021-12-23-unity-urp-billboard-shader/kec2-2.png)
![回転ベクトル2](/images/posts/2021-12-23-unity-urp-billboard-shader/kec2-3.png)

## SRP Batcher

URP（SRP）からSRP Batcherというドローコールバッチング（厳密にはドローコールの数を減らすわけではなく、ドローコール間のGPUの設定コストを削減）の仕組みが導入されました。

以前のビルドインレンダーパイプラインのドローコールバッチングではMeshが結合されるので、ビルボードのように特殊な頂点変換をするシェーダーでは考慮が必要で、けっこう面倒でした。

SRP BatcherはMeshを結合しないので、頂点変換で特別な考慮をしなくてもシェーダーが動くようになりました！めでたい🎉

今回のシェーダーをフレームデバッガーで確認すると、ちゃんとSRP Batcherで描画されているのが分かります。

[![SRP Batcher](/images/posts/2021-12-23-unity-urp-billboard-shader/frame-debugger.png)](/images/posts/2021-12-23-unity-urp-billboard-shader/frame-debugger.png)

SRP Batcherについては、以下の記事が詳しいです。

- [SRP Batcher：レンダリングをスピードアップ | Unity Blog](https://blog.unity.com/ja/technology/srp-batcher-speed-up-your-rendering)

# リンク

参考にさせていただきました。ありがとうございます。

- URP対応（SRP Batcherも対応👍）
    - [【Unity】URP用のシェーダの書き方が旧パイプラインと微妙に違ってややこしいのでまとめた - LIGHT11](https://light11.hatenadiary.com/entry/2021/07/29/194213)
- 利用したテクスチャ素材
    - [Tree PNG Clipart Background](http://www.pngall.com/tree-png/download/23754)
    - [Dirt/Ground Texture [Tileable | 2048x2048]](https://www.deviantart.com/fabooguy/art/Dirt-Ground-Texture-Tileable-2048x2048-441212191)