rem �R�~�b�g���b�Z�[�W
set msg="Build %date%%time%"

pushd public

rem public�f�B���N�g����|��
git fetch -p
git checkout -B master origin/master

popd

rem HTML�𐶐�
hugo017.exe

pushd public

rem HTML���������R�~�b�g
git add .
git commit -m %msg%
git push origin HEAD

popd

rem �\�[�X���R�~�b�g
git add .
git commit -m %msg%
git push origin HEAD