@echo off
rem Rebuilds the website rules pages from the Basic Rules docx in this folder.
rem Drag a .docx onto this file to use that one instead.
cd /d "%~dp0"
set "PY=python"
where py >nul 2>nul && set "PY=py -3"
%PY% "%~dp0update_rules.py" %*
echo.
pause
