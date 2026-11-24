@echo off
rem Live preview of the website at http://localhost:8080. Leave this window open while you edit.
rem Every save in src\ or Webpages\ refreshes the browser. Close the window to stop.
cd /d "%~dp0"
where npm >nul 2>nul || (echo Node.js is not installed. Get the LTS version from https://nodejs.org, then run this again. & pause & exit /b 1)
if not exist node_modules (echo First run: installing Eleventy... & call npm install)
start "" http://localhost:8080
call npm start
pause
