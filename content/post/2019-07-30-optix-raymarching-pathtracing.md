+++
toc = true
math = false
draft = false
tags = [
]
title = "NVIDIA® OptiX上で『レイマーチング×パストレーシング』による物理ベースレンダラーを実装した"
slug = "optix-raymarching-pathtracing"
date = "2019-07-30T10:09:23+09:00"
image = ""

+++

これは[レイトレ合宿7](https://sites.google.com/site/raytracingcamp7/)アドベントカレンダーの記事です。

NVIDIA® OptiX上で『レイマーチング×パストレーシング』による物理ベースレンダラーを開発しました。

レイとオブジェクトの交差判定をレイマーチングで行い、ライティングをパストレーシングをするという、レイマーチングとパストレーシングのハイブリッドなレンダリングを実現しました。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">NVIDIA® OptiX上で<br>『レイマーチング×パストレーシング』<br>を実装できた😉 <a href="https://twitter.com/hashtag/%E3%83%AC%E3%82%A4%E3%83%88%E3%83%AC%E5%90%88%E5%AE%BF?src=hash&amp;ref_src=twsrc%5Etfw">#レイトレ合宿</a> <a href="https://t.co/FKbuHiXqmP">pic.twitter.com/FKbuHiXqmP</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1155489034354843649?ref_src=twsrc%5Etfw">July 28, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<!--more-->

# 実装の方針

OptixはNVIDIAが開発・提供しているGPUレイトレーシング用のフレームワークでCUDA基盤上で動作します。

Optixではユーザ独自のプリミティブを定義できるため、この機能をつかってレイマーチングで衝突判定を行う距離関数でプリミティブを定義しました。

独自のプリミティブの定義に必要なProgram（Optix用語でPTXアセンブリにコンパイルされたCUDA C関数を指す）は次の2つです。

- Intersection
- Bounding Box

Optixの公式サンプルプロジェクトに optixPathtracing があったので、これにレイマーチングのプリミティブを追加する形で実装しました。

パストレーシングの処理はサンプルコードの実装そのまま利用させていただきました。

## Bounding Box

Bounding Boxを定義するProgramです。

レイマーチングのオブジェクトのBounding BoxはC++側から値を渡すようにしました。

`rtDeclareVariable` でCPUからGPUへ送るバッファの宣言（GLSLのunifromと同じ）ができます。

```cpp
#include <optix_world.h>

rtDeclareVariable(float3, center, , );
rtDeclareVariable(float3, size, , );

RT_PROGRAM void bounds(int, float result[6])
{
    optix::Aabb* aabb = (optix::Aabb*)result;
    aabb->m_min = center - size;
    aabb->m_max = center + size;
}
```

## Intersection

衝突判定をするProgramです。

ごくごく普通のレイマーチングです。

```cpp
rtDeclareVariable(int, lgt_instance, , ) = {0};
rtDeclareVariable(float3, texcoord, attribute texcoord, );
rtDeclareVariable(int, lgt_idx, attribute lgt_idx, );

RT_PROGRAM void intersect(int primIdx)
{
    const float EPS = 1e-2;
    float t = 0.0, d = 1e100;
    float3 p = ray.origin;

    for (int i = 0; i < 50; i++)
    {
        d = map(p);
        t += d;
        p = ray.origin + t * ray.direction;
        if (abs(d) < EPS)
        {
            break;
        }
    }

    if (abs(d) < EPS && rtPotentialIntersection(t))
    {
        shading_normal = geometric_normal = calcNormal(p, map);
        texcoord = make_float3(p.x, p.y, 0);
        lgt_idx = lgt_instance;
        rtReportIntersection(0);
    }
}
```

### 法線計算

法線計算は四面体によるアプローチを用いました。

通常は6回の距離関数の評価が必要なところ、4回の評価だけで法線を計算できます。

- [normals for an SDF | http://iquilezles.org](http://iquilezles.org/www/articles/normalsSDF/normalsSDF.htm)
- [#TokyoDemoFest 2018 の GLSL Graphics Compo で2位入賞しました - setchi’s blog](https://setchi.hatenablog.com/entry/2018/12/17/095532)

map関数を差し替え可能にするためにマクロをつかって実装しました。

```cpp
const float EPS_N = 1e-4;
#define calcNormal(p, dFunc) normalize(\
    make_float3( EPS_N, -EPS_N, -EPS_N) * dFunc(p + make_float3( EPS_N, -EPS_N, -EPS_N)) + \
    make_float3(-EPS_N, -EPS_N,  EPS_N) * dFunc(p + make_float3(-EPS_N, -EPS_N,  EPS_N)) + \
    make_float3(-EPS_N,  EPS_N, -EPS_N) * dFunc(p + make_float3(-EPS_N,  EPS_N, -EPS_N)) + \
    make_float3( EPS_N,  EPS_N,  EPS_N) * dFunc(p + make_float3( EPS_N,  EPS_N,  EPS_N)))
```

### 距離関数

以前にブログで紹介したIFSによるMengerSpongeの距離関数をCUDA Cに移植しました。

- [Unity×レイマーチングによる映像制作の実践手法 | gam0022.net](https://gam0022.net/blog/2019/06/25/unity-raymarching/)

Swizzle Operationを手動展開するのがしんどかったです…

ベクトル版のabsやmaxは自分で定義すれば解決しますが、Swizzle OperationをCUDA C上で再現する方法は私には分かりませんでした。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">CUDA C言語、absやmaxにベクトル型のオーバーロードが無いし、Swizzle Operationも無いからストレスで発狂して精神が崩壊した🤬🤪🤮 <a href="https://t.co/mRPmQTTcsb">pic.twitter.com/mRPmQTTcsb</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1155465784807657472?ref_src=twsrc%5Etfw">July 28, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

```cpp
float dMenger(float3 z0, float3 offset, float scale) {
    float4 z = make_float4(z0, 1.0);
    for (int n = 0; n < 4; n++) {
        // z = abs(z);
        z.x = abs(z.x);
        z.y = abs(z.y);
        z.z = abs(z.z);
        z.w = abs(z.w);

        // if (z.x < z.y) z.xy = z.yx;
        if (z.x < z.y)
        {
            float x = z.x;
            z.x = z.y;
            z.y = x;
        }

        // if (z.x < z.z) z.xz = z.zx;
        if (z.x < z.z)
        {
            float x = z.x;
            z.x = z.z;
            z.z = x;
        }

        // if (z.y < z.z) z.yz = z.zy;
        if (z.y < z.z)
        {
            float y = z.y;
            z.y = z.z;
            z.z = y;
        }

        z *= scale;
        // z.xyz -= offset * (scale - 1.0);
        z.x -= offset.x * (scale - 1.0);
        z.y -= offset.y * (scale - 1.0);
        z.z -= offset.z * (scale - 1.0);

        if (z.z < -0.5 * offset.z * (scale - 1.0))
            z.z += offset.z * (scale - 1.0);
    }
    // return (length(max(abs(z.xyz) - make_float3(1.0, 1.0, 1.0), 0.0)) - 0.05) / z.w;
    return (length(make_float3(max(abs(z.x) - 1.0, 0.0), max(abs(z.y) - 1.0, 0.0), max(abs(z.z) - 1.0, 0.0))) - 0.05) / z.w;
}

float map(float3 p)
{
    float scale = 100;
    return dMenger((p - center) / scale, make_float3(1, 1, 1), 3.1) * scale;
}
```

## C++からProgramの利用

Programを利用するには以下のようなC++のコードを書けばOKです。

ProgramとGPUに送る情報のバッファを指定しているだけです。

```cpp
Context        context = 0;
Program        pgram_raymarching_intersection = 0;
Program        pgram_raymarching_bounding_box = 0;

// レイマーチングのオブジェクトの GeometryInstance を生成します
GeometryInstance createRaymrachingObject(
    const float3& center,
    const float3& size)
{
    Geometry raymarching = context->createGeometry();
    raymarching->setPrimitiveCount(1u);
    raymarching->setIntersectionProgram(pgram_raymarching_intersection);
    raymarching->setBoundingBoxProgram(pgram_raymarching_bounding_box);

    raymarching["center"]->setFloat(center);
    raymarching["size"]->setFloat(size);

    GeometryInstance gi = context->createGeometryInstance();
    gi->setGeometry(raymarching);
    return gi;
}

// ジオメトリのセットアップをします
// ※レイマーチングに直接関係ないコードは省略しています
void loadGeometry()
{
    // Set up Raymarching programs
    const char *ptx = sutil::getPtxString( SAMPLE_NAME, "optixRaymarching.cu" );
    pgram_raymarching_bounding_box = context->createProgramFromPTXString( ptx, "bounds" );
    pgram_raymarching_intersection = context->createProgramFromPTXString( ptx, "intersect" );

    // create geometry instances
    std::vector<GeometryInstance> gis;

    // Raymarcing
    gis.push_back(createRaymrachingObject(
        make_float3(278.0f, 120.0f, 278.0f),
        make_float3(100.0f, 100.0f, 100.0f)));
    setMaterial(gis.back(), diffuse, "diffuse_color", white);

    // Create geometry group
    GeometryGroup geometry_group = context->createGeometryGroup(gis.begin(), gis.end());
    geometry_group->setAcceleration( context->createAcceleration( "Trbvh" ) );
    context["top_object"]->set( geometry_group );
}
```

# Optixの環境構築（Windows）

OptixのWindows用の環境構築の流れは

- 必要なツールを事前にインストール
- CamkeでVisualStudioのソリューションファイルを生成
- VisualStudioでビルド

という感じでした。

morishigeさんのQiitaの記事が大変参考になりました。

- [Nvidia OptiX 入門（環境構築編）](https://qiita.com/morishige/items/d4a99c88b925ac31ff3d)

CmakeとOptixとCUDAのバージョンの組み合わせが肝のようで、Cmakeのバージョンを変えながら何回かトライしたところ、この組み合わせでCmakeビルドに成功しました。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">✍️ <br>CUDA 10.1<br>OptiX SDK 6.0.0<br>Visual Studio 2017<br>Cmake 3.8.2<br><br>freeglut / GLFW / GLEW は Nuget の最新版をインストール<a href="https://t.co/OtsR6bnxmk">https://t.co/OtsR6bnxmk</a><br><br>Cmakeの設定はスクショ通り <a href="https://t.co/cpBM4y2Vy1">pic.twitter.com/cpBM4y2Vy1</a></p>&mdash; がむ (@gam0022) <a href="https://twitter.com/gam0022/status/1150906026528391168?ref_src=twsrc%5Etfw">July 15, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Cmakeで最初にVisualStudioのバージョンを選択できるのですが、64bit版ではなく32bit版を選択してしまい、Cmakeは成功するのにソリューションがビルドできないことがありました。

Cmakeの過去のバージョンはGitHubからインストールできます。

- [Releases · Kitware/CMake](https://github.com/Kitware/CMake/releases)

# 参考資料

以下の記事が大変参考になりました。ありがとうございます。

- [optix - uimac実装メモ](http://memo.render.jp/optix)
- [OptiX QuickStart（公式チュートリアル）](https://docs.nvidia.com/gameworks/content/gameworkslibrary/optix/optix_quickstart.htm)