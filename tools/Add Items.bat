@echo off
rem Adds the items in docs\items-to-add.md to the shops. Drag another .md file onto this file to use that one.
rem Add --check after the file name to test the file without changing anything.
cd /d "%~dp0"
set "PY=python"
where py >nul 2>nul && set "PY=py -3"
%PY% "%~dp0add_items.py" %*
echo.
pause
