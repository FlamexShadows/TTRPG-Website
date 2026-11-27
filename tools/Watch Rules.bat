@echo off
rem Leave this window open. The rules pages rebuild every time you save the Basic Rules docx.
cd /d "%~dp0"
set "PY=python"
where py >nul 2>nul && set "PY=py -3"
%PY% "%~dp0update_rules.py" --watch %*
pause
