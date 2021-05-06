set msg="Build %date%%time%"

pushd public

git fetch -p
git checkout -B master origin/master

popd

hugo017.exe

pushd public

git add .
git commit -m %msg%
git push origin HEAD

popd

git add .
git commit -m %msg%
git push origin HEAD