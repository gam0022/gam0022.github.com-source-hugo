:: �R�~�b�g���b�Z�[�W
set msg="Build %date%%time%"

pushd public

:: public�f�B���N�g����|��
git fetch -p
git checkout -B master origin/master

popd

:: HTML�𐶐�
hugo017.exe

pushd public

:: HTML���������R�~�b�g
git add .
git commit -m %msg%
git push origin HEAD

popd

:: �\�[�X���R�~�b�g
git add .
git commit -m %msg%
git push origin HEAD