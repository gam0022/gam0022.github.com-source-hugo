+++
slug = "unity-y-axis-billboard-shader"
date = "2019-07-23T09:30:09+09:00"
image = "/images/posts/2019-07-22-unity-y-axis-billboard-shader/thumbnail_up.jpg"
toc = true
math = false
draft = false
tags = [
    "Unity", "Shader", "CG"
]
title = "[Unity] Y軸ビルボードシェーダーの実装と解説"

+++

こんな感じのY軸のビルボードをC#スクリプトを使わずに、シェーダーだけで実装しました（Unity 2018.3.12f1）。

![Y軸ビルボード](/images/posts/2019-07-22-unity-y-axis-billboard-shader/billboard_y_axis.gif)

GitHubリポジトリ: [gam0022/unity-legacy-render-pipeline-experiments/blob/master/Assets/Experiments/Billboard](https://github.com/gam0022/unity-legacy-render-pipeline-experiments/blob/master/Assets/Experiments/Billboard/Billboard.shader#L51-L82)

<!--more-->

# この記事の要約

1. 頂点シェーダーでView行列の回転（カメラに応じた回転）をスキップすれば、ビルボードができる
2. Unityは左手系座標だが、 **View空間では右手系座標** なので、View変換をスキップするときには自前でZの符号を反転する必要がある
3. Y軸のビルボードが必要なら、View行列からY軸の回転だけ抽出した行列を作れば良い

# シェーダーで実装するメリット

シェーダーでビルボードを計算するメリットはたくさんあります。

- VRChatなどユーザのC#スクリプトが使えない環境でも動作する
- シーンビュー上でも動作する
- GPU（頂点シェーダー）でビルボード計算ができる
    - ビルボード計算のためのCPU負荷が全くかからない
    - 板ポリの頂点数は4なので、頂点シェーダーで多少重い処理をしても、GPU負荷への影響はわずか

# シェーダーのコード（全体）

最終的なシェーダーのコードはこちらです。

単体で動作しますので、コピペしてお使いいただけます。

```cpp
// Unity Y-Axis Billboard Shader by @gam0022
// https://gam0022.net/blog/2019/07/23/unity-y-axis-billboard-shader/
Shader "Unlit/Billboard"
{
    Properties
    {
        _MainTex ("Texture", 2D) = "white" {}
        [KeywordEnum(OFF, ALL_AXIS, Y_AXIS)] _BILLBOARD("Billboard Mode", Float) = 2
        _Cutoff ("Alpha Cutoff", Range(0, 1)) = 0.5
    }
    SubShader
    {
        Tags{ "Queue" = "AlphaTest" "RenderType" = "TransparentCutout"
                "IgnoreProjector" = "True" "DisableBatching" = "True" }

        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            // make fog work
            #pragma multi_compile_fog

            #include "UnityCG.cginc"
            #pragma multi_compile _BILLBOARD_OFF _BILLBOARD_ALL_AXIS _BILLBOARD_Y_AXIS

            struct appdata
            {
                float4 vertex : POSITION;
                float2 uv : TEXCOORD0;
            };

            struct v2f
            {
                float2 uv : TEXCOORD0;
                UNITY_FOG_COORDS(1)
                float4 vertex : SV_POSITION;
            };

            sampler2D _MainTex;
            float4 _MainTex_ST;
            
            float _Cutoff;

            v2f vert (appdata v)
            {
                v2f o;

                #if _BILLBOARD_OFF
                {
                    // ビルボードなしの通常の座標変換
                    o.vertex = UnityObjectToClipPos(v.vertex);
                }
                #elif _BILLBOARD_ALL_AXIS
                {                   
                    // Meshの原点をModelView変換
                    float3 viewPos = UnityObjectToViewPos(float3(0, 0, 0));
                    
                    // スケールと回転（平行移動なし）だけModel変換して、View変換はスキップ
                    float3 scaleRotatePos = mul((float3x3)unity_ObjectToWorld, v.vertex);
                    
                    // scaleRotatePosを右手系に変換して、viewPosに加算
                    // 本来はView変換で暗黙的にZが反転されているので、
                    // View変換をスキップする場合は明示的にZを反転する必要がある
                    viewPos += float3(scaleRotatePos.xy, -scaleRotatePos.z);
                    
                    o.vertex = mul(UNITY_MATRIX_P, float4(viewPos, 1));
                }
                #elif _BILLBOARD_Y_AXIS
                {
                    // Meshの原点をModelView変換
                    float3 viewPos = UnityObjectToViewPos(float3(0, 0, 0));
                    
                    // スケールと回転（平行移動なし）だけModel変換して、View変換はスキップ
                    float3 scaleRotatePos = mul((float3x3)unity_ObjectToWorld, v.vertex);                
                    
                    // View行列からY軸の回転だけ抽出した行列を生成
                    float3x3 ViewRotateY = float3x3(
                        1, UNITY_MATRIX_V._m01, 0,
                        0, UNITY_MATRIX_V._m11, 0,
                        0, UNITY_MATRIX_V._m21, -1// Zの符号を反転して右手系に変換
                    );
                    viewPos += mul(ViewRotateY, scaleRotatePos);
                    
                    o.vertex = mul(UNITY_MATRIX_P, float4(viewPos, 1));
                }
                #endif

                o.uv = TRANSFORM_TEX(v.uv, _MainTex);
                UNITY_TRANSFER_FOG(o,o.vertex);
                return o;
            }

            fixed4 frag (v2f i) : SV_Target
            {
                // sample the texture
                fixed4 col = tex2D(_MainTex, i.uv);
                clip(col.a - _Cutoff);
                
                // apply fog
                UNITY_APPLY_FOG(i.fogCoord, col);
                return col;
            }
            ENDCG
        }
    }
}
```

<!--more-->

## ビルボードのモードについて

このようにビルボードのモードをインスペクタで選択できます。

![シェーダーのインスペクタ](/images/posts/2019-07-22-unity-y-axis-billboard-shader/shader_inspector.png)

それぞれの結果を並べました。

| OFF: ビルボードなし | ALL_AXIS: 通常のビルボード | Y_AXIS: Y軸のビルボード |
|:---:|:---:|:---:|
| ![ビルボードなし](/images/posts/2019-07-22-unity-y-axis-billboard-shader/billboard_off.gif) | ![ビルボードあり](/images/posts/2019-07-22-unity-y-axis-billboard-shader/billboard_all_axis.gif) | ![Y軸ビルボード](/images/posts/2019-07-22-unity-y-axis-billboard-shader/billboard_y_axis.gif) |
| 通常の描画 | 上から見たときの違和感が大きい | 上から見たときの違和感を緩和できる |

# コードの解説

ここから、本題であるシェーダーの解説を行います。

## 通常のビルボード

通常のビルボードの頂点シェーダーの処理を抜粋しました。

```cpp
#elif _BILLBOARD_ALL_AXIS
{                   
    // ①Meshの原点をModelView変換
    float3 viewPos = UnityObjectToViewPos(float3(0, 0, 0));
    
    // ②スケールと回転（平行移動なし）だけModel変換して、View変換はスキップ
    float3 scaleRotatePos = mul((float3x3)unity_ObjectToWorld, v.vertex);
    
    // ③scaleRotatePosを右手系に変換して、viewPosに加算
    // 本来はView変換で暗黙的にZが反転されているので、
    // View変換をスキップする場合は明示的にZを反転する必要がある
    viewPos += float3(scaleRotatePos.xy, -scaleRotatePos.z);
    
    // ④最後にプロジェクション変換
    o.vertex = mul(UNITY_MATRIX_P, float4(viewPos, 1));
}
```

### ①について

記事の冒頭で

> 1.頂点シェーダーでView行列の回転（カメラに応じた回転）をスキップすれば、ビルボードができる

と書きましたが、厳密にはMeshの原点だけはView変換を行います。

原点は回転の影響を受けないので、普通にModelView変換することで平行移動のみ適応できます。

### ②について

Model行列よる平行移動は①で処理しているので、スケールと回転だけを各頂点に適応します。

`(float3x3)unity_ObjectToWorld` のように `float3x3` でキャストすることで、平行移動の行列の成分を捨てることができます。

列ベクトルの場合は4行目に平行移動の情報が入っていますが、キャストによって4列目の成分が消えるため、平行移動の成分が消えます。

### ③について

①で`viewPos` には原点のView空間の座標を代入しましたが、これに②で生成した各頂点の座標を加算しています。

`float3(scaleRotatePos.xy, -scaleRotatePos.z)` のようにZ成分だけ符号を反転しているのは、冒頭の

> 2.Unityは左手系座標だが、 **View空間では右手系座標** なので、View変換をスキップするときには自前でZの符号を反転する必要がある

という理由によるものです。

左手系座標ではZ軸とカメラのforwardベクトルが同じ向きですが、右手系座標では反対向きになります。

私はこのUnityの仕様を知らずに、かなり悩んでしまいました…

私がネットで見つけたUnityのビルボードのシェーダーの実装のほとんどはZを反転する処理が抜けていました。
そのため、Box等の厚みのあるMeshに用いると、Cullingが反転して背面ポリゴンが描画される不具合がありました。

| Z反転なし | Z反転あり |
|:---:|:---:|
| ![Z反転なし](/images/posts/2019-07-22-unity-y-axis-billboard-shader/z_reverse_off.png) | ![Z反転あり](/images/posts/2019-07-22-unity-y-axis-billboard-shader/z_reverse_on.png) |
| NG: Cullingが反転して背面ポリゴンが描画されている | OK: 正常に表面ポリゴンが描画されている |

### ④について

View座標にプロジェクション行列を乗算すると、最終的なクリッピング座標を計算できます（定形処理）。

## Y軸のビルボード

Y軸のビルボードの頂点シェーダーの処理を抜粋しました。

```cpp
#elif _BILLBOARD_Y_AXIS
{
    // ①Meshの原点をModelView変換
    float3 viewPos = UnityObjectToViewPos(float3(0, 0, 0));
    
    // ②スケールと回転（平行移動なし）だけModel変換して、View変換はスキップ
    float3 scaleRotatePos = mul((float3x3)unity_ObjectToWorld, v.vertex);                
    
    // ③View行列からY軸の回転だけ抽出した行列を生成
    float3x3 ViewRotateY = float3x3(
        1, UNITY_MATRIX_V._m01, 0,
        0, UNITY_MATRIX_V._m11, 0,
        0, UNITY_MATRIX_V._m21, -1// Zの符号を反転して右手系に変換
    );
    viewPos += mul(ViewRotateY, scaleRotatePos);
    
    // ④最後にプロジェクション変換
    o.vertex = mul(UNITY_MATRIX_P, float4(viewPos, 1));
}
#endif
```

### ①②④について

①②④については、通常のビルボードと全く同じ処理なので、説明を割愛します。

### ③について

③の `ViewRotateY` は冒頭で説明したこの行列です。

> 3.Y軸のビルボードが必要なら、View行列からY軸の回転だけ抽出した行列を作れば良い

View行列からY軸の回転だけ抽出して、X軸とZ軸は変換しないようにしています。

通常のビルボードと同様に、View空間では右手系座標とするために、3行3列目には -1 を指定しています。

# 感想

ビルボードくらいサクッと実装できると思いきや、View空間が右手系座標になっているとは夢にも思わず、すこし苦戦しました。

そこで動作原理を解説した日本語の記事を探したものの、ほとんど見当たらなかったため、今回筆を執った次第です。

なるべく丁寧に解説したつもりでしたが、分かりにくい点や間違いがあればコメントやTwitterで教えてください。

ちなみに今回の方法だとドローコールバッチングができないため、次回はドローコールを減らす解決策を紹介するかもしれません。

# 参考資料

- Unity公式リファレンス
    - [ビルトインシェーダーヘルパー機能](https://docs.unity3d.com/ja/current/Manual//SL-BuiltinFunctions.html)
    - [ビルトインのシェーダー変数](https://docs.unity3d.com/ja/current/Manual/SL-UnityShaderVariables.html)
    - [Camera.worldToCameraMatrix](https://docs.unity3d.com/ja/current/ScriptReference/Camera-worldToCameraMatrix.html)
        - ポイント: Note that camera space matches OpenGL convention: camera's forward is the negative Z axis. This is different from Unity's convention, where forward is the positive Z axis.
- [Unityの行列の扱いとベクトルのオーダー周りについてまとめておく](http://edom18.hateblo.jp/entry/2019/01/04/153205)
    - ポイント: UnityのC#は「列オーダー」。でもシェーダは「行オーダー」
- [【Unity】【数学】Unityでのビュー＆プロジェクション行列とプラットフォームの関係](http://logicalbeat.jp/blog/929/)
    - ポイント: UnityのScene上は左手座標系が原則だが、シェーダ内の行列（UNITY_MATRIX_V）では右手座標系になっているという情報がある。
- [その72 ビュー・射影変換行列が持つ情報を抜き出そう](http://marupeke296.com/DXG_No72_ViewProjInfo.html)
    - Model行列・View行列・Projection行列の各成分が何だったか忘れたときに参考になります
- 既存のビルボードのシェーダー実装
    - [Simple Billboard shader for Unity](https://gist.github.com/kaiware007/8ebad2d28638ff83b6b74970a4f70c9a#file-billboard-shader-L47-L50)
        - NOTE: Cullingの不具合あり
    - [A billboard sprite shader in only one axis](https://www.reddit.com/r/Unity3D/comments/ahqbod/a_billboard_sprite_shader_in_only_one_axis/eeieb6q/)
        - NOTE: 逆行列（転置行列）でViewのXZの回転を打ち消すアプローチなので、計算に無駄がある
- 利用したテクスチャ素材
    - [Tree PNG Clipart Background](http://www.pngall.com/tree-png/download/23754)
    - [Dirt/Ground Texture [Tileable | 2048x2048]](https://www.deviantart.com/fabooguy/art/Dirt-Ground-Texture-Tileable-2048x2048-441212191)