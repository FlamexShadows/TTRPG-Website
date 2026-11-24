@echo off
rem Checks every built spell page against the old one, then moves the old pages to _archive\pre-eleventy\.
rem Run Build Site.bat first.
cd /d "%~dp0"
set "PY=python"
where py >nul 2>nul && set "PY=py -3"
%PY% "%~dp0tools\retire_old_spell_pages.py" %*
echo.
pause
