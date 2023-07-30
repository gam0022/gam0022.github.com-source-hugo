+++
tags = [
    "UE5", "UnrealEngine", "UnrealEngine5", "Shader", "Raymarching"
]
title = "Object Space Raymarching in Unreal Engine 5.2"
slug = "raymarching-in-ue5"
date = "2023-07-31T10:00:00+09:00"
image = "/images/posts/2023-07-30-raymarching-in-ue5/RaymarchingInUE5_thumbnail_v4.jpg"
toc = true
math = false
draft = false

+++

これは[レイトレ合宿9](https://sites.google.com/view/rtcamp9/home)のアドベントカレンダーの記事です。

- あまりレイトレに関連しないテーマですが、レイは飛ばしているので大目に見てください
- レイトレ合宿ではレンダラーを自作する必要があるため、ゲームエンジンは使えません

# はじめに

Unreal Engine 5.2上でオブジェクトスペースのレイマーチングを実装したので、その解説をします。

レイマーチングをノードだけで実装するのは大変なので、MaterialのCustomノードを用いて複雑な処理はHLSLのコードで実装しました。

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Object Space Raymarching in Unreal Engine 5.2<a href="https://twitter.com/hashtag/UE5?src=hash&amp;ref_src=twsrc%5Etfw">#UE5</a> <a href="https://twitter.com/hashtag/UnrealEngine?src=hash&amp;ref_src=twsrc%5Etfw">#UnrealEngine</a> <a href="https://twitter.com/hashtag/UnrealEngine5?src=hash&amp;ref_src=twsrc%5Etfw">#UnrealEngine5</a> <a href="https://twitter.com/hashtag/Shader?src=hash&amp;ref_src=twsrc%5Etfw">#Shader</a> <a href="https://t.co/42n2W87HnJ">pic.twitter.com/42n2W87HnJ</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1684596333209075712?ref_src=twsrc%5Etfw">July 27, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-conversation="none"><p lang="en" dir="ltr">Randomization of glowing animation borders<a href="https://twitter.com/hashtag/UE5?src=hash&amp;ref_src=twsrc%5Etfw">#UE5</a> <a href="https://twitter.com/hashtag/UnrealEngine?src=hash&amp;ref_src=twsrc%5Etfw">#UnrealEngine</a> <a href="https://twitter.com/hashtag/UnrealEngine5?src=hash&amp;ref_src=twsrc%5Etfw">#UnrealEngine5</a> <a href="https://twitter.com/hashtag/Shader?src=hash&amp;ref_src=twsrc%5Etfw">#Shader</a> <a href="https://t.co/FvLbVtE9Q3">pic.twitter.com/FvLbVtE9Q3</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1685583942920089600?ref_src=twsrc%5Etfw">July 30, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<!--more-->

## 読者対象

この記事は以下の読者を対象としています。

- 1週間前の自分
- レイマーチングやシェーダーの経験はあるが、UE（Unreal Engin）は初心者
- UEのカスタムシェーダーやMaterial Editorに興味がある方
- UE上でノードでは難しい複雑なシェーダーを実装してみたい人

## 結果

まずは実装結果を紹介します。

### オブジェクトスペースのレイマーチング

オブジェクトスペースのレイマーチングを実装しました。カスタムシェーダーをCubeに適用し、レイマーチングを行います。Cubeをレイマーチングのバウンディングボックスとして使用します。

[![オブジェクトスペースのレイマーチング](/images/posts/2023-07-30-raymarching-in-ue5/object_space_raymarching_v1.png)](/images/posts/2023-07-30-raymarching-in-ue5/object_space_raymarching_v1.png)

オブジェクトスペースにすることで、フルスクリーンのレイマーチングと比較して処理負荷を抑えることができます。

- カメラではなくCubeの表面からレイを飛ばすことで、レイマーチングの衝突判定を少ないイテレーション回数に抑えられる
- レイマーチングの負荷の高いシェーダーの描画範囲を制限できる

### パラメーターのリアルタイム編集

レイマーチングによる描画を行っているため、フラクタルのパラメーターをリアルタイムに編集できます。

[![IFSパラメーターのアニメーション1](/images/posts/2023-07-30-raymarching-in-ue5/param_v1.gif)](/images/posts/2023-07-30-raymarching-in-ue5/param_v1.gif)

[![IFSパラメーターのアニメーション2](/images/posts/2023-07-30-raymarching-in-ue5/param_v2.gif)](/images/posts/2023-07-30-raymarching-in-ue5/param_v2.gif)

▲グローのアニメーションのボーダーを乱数で散らしたバージョン

### Actorのトランスフォームに追従

オブジェクトスペースのレイマーチングの実装のため、Actor（UnityのGameObjectに相当）のトランスフォームに追従します。

#### 平行移動

平行移動の結果を見ると、UEのレンダリング結果と統合できていることがわかります。

- 他のオブジェクトと相互にライティングの影響を受けている
- 床に反射し、ライティング結果が周囲に自然に馴染んでいる

[![平行移動](/images/posts/2023-07-30-raymarching-in-ue5/transform_translation_v1.gif)](/images/posts/2023-07-30-raymarching-in-ue5/transform_translation_v1.gif)

#### 回転

[![回転](/images/posts/2023-07-30-raymarching-in-ue5/transform_rotation_v1.gif)](/images/posts/2023-07-30-raymarching-in-ue5/transform_rotation_v1.gif)

#### 拡大縮小

[![拡大縮小](/images/posts/2023-07-30-raymarching-in-ue5/transform_scale_v1.gif)](/images/posts/2023-07-30-raymarching-in-ue5/transform_scale_v1.gif)


## 実装の流れ

以下は実装の流れです。

- UE上のHLSL（.ush）シェーダー開発環境の構築
    - C++の開発環境のセットアップ
    - `AddShaderSourceDirectoryMapping` を使用してシェーダーを配置するディレクトリを登録
- UE上のレイマーチングの実装
    - HLSL（.ush）でレイマーチングを実装
    - MaterialのCustomノードの `Include File Paths` にHLSLシェーダー（.ush）を指定し、レイマーチングの関数を呼び出す
    - Customノードの計算結果をResultノードに出力し、ライティング計算はエンジン側に任せる
- 発展的な内容
    - オブジェクトスペースのレイマーチングに対応
    - レイマーチングの空間にカメラが潜った場合を考慮
    - 他のオブジェクトの前後関係の解消

## HLSL（.ush）によるシェーダー開発環境の構築

Unityでは、シェーダーファイル（.shader）をAssetsフォルダーに配置するだけで認識されますが、UEではシェーダーを明示的に配置するディレクトリをエンジンに認識させる必要があります。

シェーダーを書くためにC++のコードを記述する必要があるのは面倒ですが、仕方ありませんね。

C++の関数である[AddShaderSourceDirectoryMapping](https://docs.unrealengine.com/5.2/en-US/API/Runtime/RenderCore/AddShaderSourceDirectoryMapping/)を呼び出すことで、エンジンがHLSLシェーダー（.ush）を認識できるようになります。

まずは、C++の開発環境を整える必要があります。以下の記事を参考に、UE用のC++の開発環境をセットアップしました。

- [Visual Studio 2022のセットアップ｜Unreal Engine 5から始める C++ &amp; Blueprint](https://zenn.dev/posita33/books/ue5_starter_cpp_and_bp_001/viewer/chap_01_vs2022_setup)

C++の開発環境をセットアップしたら、次の記事の「普通の方法」を参考にして、AddShaderSourceDirectoryMappingを呼び出してシェーダーを配置するディレクトリをエンジン側に登録します。

- [UE4,5 プロジェクトファイル内の外部シェーダーファイル(usf, ush, hlsl)をインクルードする為の設定。 - Qiita](https://qiita.com/takaf51/items/cd98bd83fe5965d0de30#%E6%99%AE%E9%80%9A%E3%81%AE%E6%96%B9%E6%B3%95)

手順を箇条書きにすると以下のようになります。

- C++プロジェクト化
- `プロジェクト名.Build.cs` に `RenderCore` への依存関係を追加
- プロジェクトにモジュール開始と終了の関数を追加
- モジュール開始のStartupModule()に下記のコードを追加

```cpp
FString ShaderDir = FPaths::Combine(FPaths::ProjectDir(), "Shaders");
AddShaderSourceDirectoryMapping("/Project", ShaderDir);
```

このコードにより、プロジェクトの直下にある `Shaders` ディレクトリに配置されたHLSLシェーダー（.ush）をエンジン側からIncludeできるようになります。

### 余談：昔のUEでHLSLの関数定義やincludeは大変だった

過去のUEでは、HLSLをIncludeすることができず、Customノードの展開される仕様を利用して、関数定義や#includeをインジェクションする必要があったようです。

これは大変ですね。エンジンの改善により、HLSLのシェーダー開発がより使いやすくなったことは、喜ばしい進化と言えるでしょう。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">もんしょさんと話していたのは、カスタムノードをカッコで閉じちゃえば、あとは自由にコード書けちゃうぜ！というネタです。<br>実はこのTweetのマテリアルもこれを使用して書かれています。<a href="https://t.co/y3P8BkDWyw">https://t.co/y3P8BkDWyw</a> <a href="https://t.co/M4M5WX4u7m">pic.twitter.com/M4M5WX4u7m</a></p>&mdash; Takuro Kayumi (@TakuroKX) <a href="https://twitter.com/TakuroKX/status/670292440369094656?ref_src=twsrc%5Etfw">November 27, 2015</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

- [Customノード3分ハッキング - もんしょの巣穴ブログ Ver2.0](https://monsho.hatenablog.com/entry/2015/12/23/120142)
- [UE4のCustomノード(カスタムHLSLシェーダ)を使ってみた - ぼっちプログラマのメモ](https://pafuhana1213.hatenablog.com/entry/2015/02/15/152312)

## Material全体

次の画像はMaterialのグラフ全体です。

[![マテリアル全体](/images/posts/2023-07-30-raymarching-in-ue5/material_all_text.png)](/images/posts/2023-07-30-raymarching-in-ue5/material_all_text.png)

このグラフでは、レイマーチングの処理をHLSLで実装し、Customノードから呼び出しています。

ノードとしては以下の処理のみ実装しています。

- カメラのレイの生成
- 前後関係の解消のためのPixel Depth Offsetの計算
- Emissiveのパターン計算

また、オブジェクトスペースのレイマーチングを行うための座標系の計算もノードで行われています。レイマーチングのCustomノードの前後にはTransformノードが接続されています。

## HLSLシェーダーでレイマーチングを実装

MaterialのCustomノードのDetailsからInclude File Pathsを指定し、HLSLファイル（.ush）をインクルードします。

このとき「実際のファイルパス」と「Include File Paths」の指定に違いがある点に注意してください。

- ファイルパスの例: `D:\UnrealProjects\プロジェクト名\Shaders\Raymarching.ush`
- Include File Paths: `/Project/Raymarching.ush`

`Raymarching.ush` のHLSLコードの実装例は以下の通りです。レイマーチングの基本的な実装方法については説明しません。

```cpp
#pragma once

float sdBox(float3 p, float3 b)
{
    float3 q = abs(p) - b;
    return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
}

// メンガーのスポンジの距離関数
float dMenger(float3 z0, float3 offset, float scale, inout float4 ifsPosition)
{
    float4 z = float4(z0, 1.0);

    [loop]
    for (int n = 0; n < 4; n++)
    {
        z = abs(z);

        if (z.x < z.y) z.xy = z.yx;
        if (z.x < z.z) z.xz = z.zx;
        if (z.y < z.z) z.yz = z.zy;

        z *= scale;
        z.xyz -= offset * (scale - 1.0);

        if (z.z < - 0.5 * offset.z * (scale - 1.0))
        {
            z.z += offset.z * (scale - 1.0);
        }
    }

    ifsPosition = z;

    return (length(max(abs(z.xyz) - float3(1.0, 1.0, 1.0), 0.0)) - 0.05) / z.w;
}

float map(float3 pos, float uniformScale, float3 mengerOffst, float mengerScale, inout float4 ifsPosition)
{
    pos /= uniformScale;

    float d = dMenger(pos, mengerOffst, mengerScale, ifsPosition);
    d *= uniformScale;

    return d;
}

// 偏微分から法線を計算
float3 calcNormal(float3 p, float uniformScale, float3 mengerOffst, float mengerScale, inout float4 ifsPosition)
{
    float eps = 0.001;

    return normalize(float3(
        map(p + float3(eps, 0.0, 0.0), uniformScale, mengerOffst, mengerScale, ifsPosition) - map(p + float3(-eps, 0.0, 0.0), uniformScale, mengerOffst, mengerScale, ifsPosition),
        map(p + float3(0.0, eps, 0.0), uniformScale, mengerOffst, mengerScale, ifsPosition) - map(p + float3(0.0, -eps, 0.0), uniformScale, mengerOffst, mengerScale, ifsPosition),
        map(p + float3(0.0, 0.0, eps), uniformScale, mengerOffst, mengerScale, ifsPosition) - map(p + float3(0.0, 0.0, -eps), uniformScale, mengerOffst, mengerScale, ifsPosition)
    ));
}

// Ambient Occlusionを計算
float calcAO(float3 pos, float3 nor, float uniformScale, float3 mengerOffst, float mengerScale, inout float4 ifsPosition)
{
    float occ = 0.0;
    float sca = 1.0;

    for (int i = 0; i < 5; i++)
    {
        float h = 0.01 + 0.12 * float(i) / 4.0;
        float d = map(pos + h * nor, uniformScale, mengerOffst, mengerScale, ifsPosition);
        occ += (h - d) * sca;
        sca *= 0.95;
        if (occ > 0.35) break;
    }

    return saturate(clamp(1.0 - 3.0 * occ, 0.0, 1.0) * (0.5 + 0.5 * nor.y));
}

// エッジを計算
float calcEdge(float3 p, float uniformScale, float3 mengerOffst, float mengerScale, inout float4 ifsPosition)
{
    float edge = 0.0;
    float2 e = float2(0.01, 0);

    float d1 = map(p + e.xyy, uniformScale, mengerOffst, mengerScale, ifsPosition);
    float d2 = map(p - e.xyy, uniformScale, mengerOffst, mengerScale, ifsPosition);
    float d3 = map(p + e.yxy, uniformScale, mengerOffst, mengerScale, ifsPosition);
    float d4 = map(p - e.yxy, uniformScale, mengerOffst, mengerScale, ifsPosition);
    float d5 = map(p + e.yyx, uniformScale, mengerOffst, mengerScale, ifsPosition);
    float d6 = map(p - e.yyx, uniformScale, mengerOffst, mengerScale, ifsPosition);
    float d = map(p, uniformScale, mengerOffst, mengerScale, ifsPosition) * 2.;

    edge = abs(d1 + d2 - d) + abs(d3 + d4 - d) + abs(d5 + d6 - d);
    edge = smoothstep(0., 1., sqrt(edge / e.x * 2.));

    return edge;
}

// 原点にあるサイズが100x100x100のCubeの内部にいるかどうかを判定
float isInsideCube(float3 p)
{
    return sdBox(p, (50).xxx) <= 0;
}

void raymarching(
    // Inputs
    float3 origin, float3 ray, int raymarchingLoop,
    float uniformScale, float3 mengerOffst, float mengerScale,

    // Additional Outpus
    inout float hit, inout float depth, inout float3 hitPosition, inout float4 ifsPosition,
    inout float3 albedo, inout float3 normal, inout float ao, inout float emissive
)
{
    // レイマーチング
    hit = 0;
    depth = 0.0;// レイの進んだ距離
    float3 p = origin;// レイの先端の座標
    int i = 0;// レイマーチングのループカウンター

    [loop]
    for (i = 0; i < raymarchingLoop; i++)
    {
        float d = map(p, uniformScale, mengerOffst, mengerScale, ifsPosition);

        // 最短距離を0に近似できるなら、オブジェクトに衝突したとみなして、ループを抜けます
        if (abs(d) < 0.1)
        {
            break;
        }

        depth += d;// 最短距離だけレイを進めます
        p = origin + ray * depth;// レイの先端の座標を更新します
    }

    // バウンディングボックスの中にレイが留まっていればヒットしたと判定
    hit = isInsideCube(p);
    hitPosition = p;

    float4 _ifsPosition;

    if (hit)
    {
        // ライティングのパラメーター
        normal = calcNormal(p, uniformScale, mengerOffst, mengerScale, _ifsPosition);// 法線
        emissive = calcEdge(p, uniformScale, mengerOffst, mengerScale, _ifsPosition);// エッジ
        ao = calcAO(p, normal, uniformScale, mengerOffst, mengerScale, _ifsPosition);// AO
    }
    else
    {
        albedo = float3(0, 0, 0);
        discard;
    }
}
```

## CustomノードのDetails

CustomノードのDetailsは以下のように設定します。

[![CustomノードのDetails](/images/posts/2023-07-30-raymarching-in-ue5/material_custom_details.png)](/images/posts/2023-07-30-raymarching-in-ue5/material_custom_details.png)

CustomノードのCodeでは、raymarhcing関数を呼び出します。

```cpp
albedo = objectAlbedo;

raymarching(
    origin, ray, raymarchingLoop,
    uniformScale, mengerOffst, mengerScale,
    hit, depth, hitPosition, ifsPosition,
    albedo, normal, ao, emissive
);

return albedo;
```

`Inputs`と`Additional Outpus`には、`Raymarching.ush`の`raymarching`関数の全パラメーターを指定します。

パラメーターの多い関数なので手間はかかりますが、ミスのないように注意しながら1個1個指定します。

注意点として、関数のパラメーターの順序を変更したり、新しいパラメーターを追加すると、ノードの接続情報も再設定する必要があります。

<!--
UEのMaterialのノードの接続は番号（整数のインデックス）で接続情報を保持しているようなので、パラメーターの順序を入れ替えたり、途中にパラメーターを追加すると、ノード上の接続もやり直しになります。
-->

繰り返しになりますが、Include File Pathsは実際のファイルパスとは異なる点に留意して、`/Project/Raymarching.ush`と指定してください。

## Material全体のDetails

Material全体のDetailsは以下のように設定します。

[![Material全体のDetails](/images/posts/2023-07-30-raymarching-in-ue5/material_graph_details_text.png)](/images/posts/2023-07-30-raymarching-in-ue5/material_graph_details_text.png)

- Material Domain: Surface
    - レイマーチングはボリュームレダリングの印象があるかもしれませんが、Surfaceで問題ありません
- Blend Mode: Masked
    - レイマーチングの衝突判定によって形状をマスクする必要があります
    - このオプションを有効にすることで、Opacity Maskを出力できます
        - 交差している場合は1、交差していない場合は0を出力します
- Shading Model: Default Lit
    - ライティング計算はエンジン側に任せます
- Two Sideded: ON
    - カメラがレイマーチングの内部に入った場合に両面描画が必要です

## Materialノード解説：カメラのレイの生成

ここからはノードの解説をします。まずはカメラのレイを生成するためのノードです。

次のようなノードでカメラのレイを生成しています。

[![Materialノード解説：カメラのレイの生成](/images/posts/2023-07-30-raymarching-in-ue5/material_camera.png)](/images/posts/2023-07-30-raymarching-in-ue5/material_camera.png)

レイは2つの3次元ベクトルで定義されます。

- origin: レイの原点
- ray: レイの向き

### rayの計算

レイの方向（ray）はシンプルです。

カメラの位置と、描画しようとしているSurfaceの座標（Absolute World Position）の差分（Subtract）から計算できます。

最後にTransform Vectorノードでワールドスペースからローカルスペースに変換しています。

今回はオブジェクトスペースのレイマーチングのため、レイマーチングのCustomノードに入力する位置や向きはすべてローカルスペースに変換する必要があります。

### originの計算

レイの原点（origin）の計算には分岐（DynamicBranch）があります。

これはカメラがレイマーチングの空間の内部に潜った場合を考慮しているためです。

カメラの位置によってoriginを分岐しています。

- カメラが外部にある場合: origin = Absolute World Position
- カメラが内部にある場合: origin = カメラの位置

また、originもローカルスペースにする必要があるため、Transform Positionノードで変換しています。

カメラの内部/外部の判定はInsideCubeノードで行われています。これもCustomノードです。

Codeには `isInsideCube(localPos)` と指定しています。これは`Raymarching.ush`で定義された関数です。

この分岐によって、カメラがレイマーチングの外部にある場合でも内部にある場合でも、問題なく動作するようになっています。

また、「Two Sideded: ON」にしている理由は、カメラがレイマーチングの内部に入っている場合において、Cubeの裏面側でレイマーチングを描画するためです。

これによって、以下のGIFアニメーションでは、カメラがレイマーチングの空間の内部に入り込んだ場合でも正常に描画されています。

[![カメラがレイマーチングの空間の内部に潜った場合](/images/posts/2023-07-30-raymarching-in-ue5/camera_inside_v1.gif)](/images/posts/2023-07-30-raymarching-in-ue5/camera_inside_v1.gif)

## Materialノード解説：前後関係の解決（Pixel Depth Offsetの計算）

他のオブジェクトと重なった場合でも、前後関係を正しく解決するための工夫について説明します。

以下のGIFアニメーションのように、白い球体と重なっている場合でも、前後関係を正しく解決できています。

[![前後関係の解決: 平行移動](/images/posts/2023-07-30-raymarching-in-ue5/depth_transform_v1.gif)](/images/posts/2023-07-30-raymarching-in-ue5/depth_transform_v1.gif)

[![前後関係の解決: スケール](/images/posts/2023-07-30-raymarching-in-ue5/depth_scale_v1.gif)](/images/posts/2023-07-30-raymarching-in-ue5/depth_scale_v1.gif)

UEのMaterialではDepthBufferを直接書き込むことはできませんが、ワールド座標でのDepthの押し込み距離から、Pixel Depth Offsetを計算することで前後関係を解決しています。

[![Materialノード解説：前後関係の解決（Pixel Depth Offsetの計算）](/images/posts/2023-07-30-raymarching-in-ue5/material_pixel_depth_offset.png)](/images/posts/2023-07-30-raymarching-in-ue5/material_pixel_depth_offset.png)

Pixel Depth Offsetは、ワールド空間でのオフセット距離を計算する必要があります。したがって、Raymarchingの衝突点（hit）をTransform Positionノードを使用してワールド座標に変換し、Absolute World Positionとの差分（Subtract）を計算し、その距離（Length）を計算しています。

Pixel Depth Offsetでは、カメラの奥方向にのみオフセットすることができます。逆に手前にオフセットさせることはできません。この制約は、パフォーマンスの向上を目的としています。

- [[UE4] Pixel Depth Offsetは何故画面奥にしか行かないのかまた本当に重たいのかどうか問題 - Qiita](https://qiita.com/EGJ-Nori_Shinoyama/items/42cb29e95eca601250db)

カメラがレイマーチングの内部にある場合、Cubeの裏面のSurfaceからは、衝突点（hit）が手前に来るため、Pixel Depth Offsetはマイナス値となります。
しかしこのマイナス値は利用できないため、カメラが内部にある場合は、`Pixel Depth Offset = 0` となるようにLerpノードで分岐しています

<!--
今回はLerpで分岐を処理しましたが、`Max(0, x)` でも良いと思います。
-->

## まとめ

- UE5.2でオブジェクトスペースのレイマーチングを実装できた
    - Actorに追従し、通常のMeshのようにギズモによりマウスで配置や変形ができる
- エンジンのレンダリング機能とも破綻なく統合できた
    - 床への反射やグローバルイルミネーションに統合できた
    - Opacity Mask、Pixel Depth Offsetを利用して、他のオブジェクトの前後関係なども解決できた
- ノードとコードの役割分担をうまくできた
    - 複雑な処理はHLSLによるコードで実装し、Customノードで呼び出す
    - オブジェクトスペースのための座標変換はノードを利用することでシンプルに実装できた
- UEの細かいTipsについては別記事でまとめる予定
    - 「Ctrl + 1 + 左クリック」でスカラーの定数ノードを作成できる
    - VS2022プロジェクトの作成に失敗する場合、Source Code Editorを再選択すると解決することがある
    - UnityとUEの座標系やスケールの違いについて

## 参考資料

UE4やUnity上でのレイマーチング実装の前例を以下に紹介します。これらの情報をとても参考にさせていただきました。

- [【UE4】Object Space Raymarching (Material Editor) - コポうぇぶろぐ](https://coposuke.hateblo.jp/entry/2019/12/11/002521)
    - UE4上でのレイマーチング実装の取り組み
    - 当時は Include File Paths が存在しなかったため、Customノードの関数定義に対するハックが必要であったことなどに触れています。
- [Unity HDRPのLitシェーダーを改造してレイマーチングする（GBuffer編） - なんかやる](https://nanka.hateblo.jp/entry/2019/08/27/004905)
    - Unity HDRP上でのレイマーチング実装の取り組み