:: コミットメッセージ
set msg="Commit %date% %time%"

:: ソースをコミット
git add .
git commit -m %msg%
git push origin HEAD