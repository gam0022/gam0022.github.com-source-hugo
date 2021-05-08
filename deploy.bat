:: コミットメッセージ
set msg="Build %date%%time%"

pushd public

:: publicディレクトリを掃除
git fetch -p
git checkout -B master origin/master

popd

:: HTMLを生成
hugo017.exe

pushd public

:: HTML生成物をコミット
git add .
git commit -m %msg%
git push origin HEAD

popd

:: ソースをコミット
git add .
git commit -m %msg%
git push origin HEAD