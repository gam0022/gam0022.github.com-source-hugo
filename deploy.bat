pushd public

git fetch -p
git checkout -B master origin/master

popd

hugo017.exe

pushd public

git add .
git commit -m "Build"
git push origin HEAD

popd