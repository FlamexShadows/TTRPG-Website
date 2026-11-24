@echo off
rem Builds the whole website into the _site folder once.
cd /d "%~dp0"
where npm >nul 2>nul || (echo Node.js is not installed. Get the LTS version from https://nodejs.org, then run this again. & pause & exit /b 1)
if not exist node_modules (echo First run: installing Eleventy... & call npm install)
call npm run build
echo.
echo Done. The built site is in the _site folder.
pause
