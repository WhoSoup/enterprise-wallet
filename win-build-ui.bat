@echo off
REM Compiles statics only (no minify)
REM For quicker testing of UI changes

SETLOCAL
set wallDir=%GOPATH%/src/github.com/FactomProject/enterprise-wallet

echo Emulating /web/compile.sh
cd %wallDir%/web


REM concatJs.sh
REM ###################################################################

echo JS/CSS
echo   Concatenating JS files into all.js

cd %wallDir%/web/statics/js
del all.js
copy addressbook.js + index.js + send-convert.js + settings.js + recieve-factoids.js + new-address.js + edit-address.js + backup.js all.js /b >NUL

cd %wallDir%/web/

REM SASS
echo   SASS app.css
call sass -s compressed statics/scss/app.scss statics/css/app.css 2>NUL