@echo off
setlocal enabledelayedexpansion

:: Set environment variable for Node.js memory limit
set NODE_OPTIONS=--max-old-space-size=32768

:: Bootstrap
if not exist node_modules (
    call yarn install
)
if not exist app\dist (
    call yarn build-app
)

:: Assets & types
rd /s /q app\dist\assets
call yarn build-assets
rd /s /q app\code
call yarn build-types

:: app.asar
echo creating app.asar
cd app\dist
rd /s /q asar
mkdir asar
xcopy /Y /E /I assets asar
xcopy /Y /E /I ..\code asar
xcopy /Y ..\index.js asar
xcopy /Y ..\package.json asar
xcopy /Y ..\preload.js asar
xcopy /Y ..\spacetime.js asar
xcopy /Y ..\icon.png asar
xcopy /Y ..\..\index.html asar
xcopy /Y ..\..\index.css asar
xcopy /Y ..\..\dialoguer.html asar
xcopy /Y ..\..\editor.html asar
xcopy /Y ..\..\soundtest.html asar
del /f /q app.asar
call asar pack asar app.asar

:: src.zip
echo creating src.zip
cd ..\..

del /f /q app\dist\src.zip
call git archive -o app\dist\src.zip master --format=zip -9

:: web.zip
echo creating web.zip
cd app\dist\assets
del /f /q ..\web.zip
call 7za a -y -tzip web.zip *
move web.zip ..

:: unx.zip
echo creating unx.zip
cd ..\linux-unpacked
del /f /q resources\app.asar
copy ..\app.asar resources\app.asar
del /f /q ..\unx.zip
call 7za a -y -tzip unx.zip *
move unx.zip ..

:: win.zip
echo creating win.zip
cd ..\win-unpacked
del /f /q resources\app.asar
copy ..\app.asar resources\app.asar
del /f /q ..\win.zip
call 7za a -y -tzip win.zip *
move win.zip ..

:: unx-arm.zip
echo creating unx-arm.zip
cd ..\linux-arm64-unpacked
del /f /q resources\app.asar
copy ..\app.asar resources\app.asar
del /f /q ..\unx-arm.zip
call 7za a -y -tzip unx-arm.zip *
move unx-arm.zip ..

:: win-arm.zip
echo creating win-arm.zip
cd ..\win-arm64-unpacked
del /f /q resources\app.asar
copy ..\app.asar resources\app.asar
del /f /q ..\win-arm.zip
call 7za a -y -tzip win-arm.zip *
move win-arm.zip ..

:: unx-32.zip
echo creating unx-32.zip
cd ..\linux-ia32-unpacked
del /f /q resources\app.asar
copy ..\app.asar resources\app.asar
del /f /q ..\unx-32.zip
call 7za a -y -tzip unx-32.zip *
move unx-32.zip ..

:: win-32.zip
echo creating win-32.zip
cd ..\win-ia32-unpacked
del /f /q resources\app.asar
copy ..\app.asar resources\app.asar
del /f /q ..\win-32.zip
call 7za a -y -tzip win-32.zip *
move win-32.zip ..

:: and.apk
echo creating and.apk
cd ..\..\..
rd /s /q www
xcopy /E /I app\dist\assets www
if not exist platforms (
    call yarn build-platforms
)
call yarn build-apk
move platforms\android\app\build\outputs\apk\debug\app-debug.apk app\dist\and.apk
