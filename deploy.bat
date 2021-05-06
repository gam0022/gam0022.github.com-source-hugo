hugo017.exe

pushd public

git fetch -p
git checkout -B master origin/master

git add .
git commit -m "Build"
git push origin HEAD

popd