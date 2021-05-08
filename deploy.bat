rem コミットメッセージ
set msg="Build %date%%time%"

pushd public

rem publicディレクトリを掃除
git fetch -p
git checkout -B master origin/master

popd

rem HTMLを生成
hugo017.exe

pushd public

rem HTML生成物をコミット
git add .
git commit -m %msg%
git push origin HEAD

popd

rem ソースをコミット
git add .
git commit -m %msg%
git push origin HEAD