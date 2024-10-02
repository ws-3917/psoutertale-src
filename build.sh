# environment variables
export NODE_OPTIONS=--max-old-space-size=32768

# bootstrap
if [ ! -d node_modules ]; then yarn install; fi
if [ ! -d app/dist ]; then yarn build-app; fi

# enable multithreading
set -m

# assets & types
rm -rf app/dist/assets
yarn build-assets &
rm -rf app/code
yarn build-types &

# wait for all threads to complete
while [ 1 ]; do fg 2> /dev/null; [ $? == 1 ] && break; done

# app.asar
echo creating app.asar
cd app/dist
rm -rf asar
mkdir asar
cp -r assets ../code ../index.js ../package.json ../preload.js ../spacetime.js ../icon.png asar
rm -f app.asar
asar pack asar app.asar &

# src.zip
# echo creating src.zip
cd ../..
# rm -f app/dist/src.zip
# git archive -o app/dist/src.zip master --format zip -9 &

# wait for all threads to complete
while [ 1 ]; do fg 2> /dev/null; [ $? == 1 ] && break; done

# web.zip
# echo creating web.zip
cd app/dist/assets
# rm -f ../web.zip
# zip -qr9 ../web.zip * &

# unx.zip
# echo creating unx.zip
# cd ../linux-unpacked
# rm -f resources/app.asar
# cp ../app.asar resources/app.asar
# rm -f ../unx.zip
# zip -qr9 ../unx.zip * &

# win.zip
echo creating win.zip
cd ../win-unpacked
rm -f resources/app.asar
cp ../app.asar resources/app.asar
rm -f ../win.zip
zip -qr9 ../win.zip * &

# mac.zip
# echo creating mac.zip
# cd ../mac
# rm -f outertale.app/Contents/Resources/app.asar
# cp ../app.asar outertale.app/Contents/Resources/app.asar
# rm -f ../mac.zip
# zip -qr9 ../mac.zip * &

# unx-arm.zip
# echo creating unx-arm.zip
# cd ../linux-arm64-unpacked
# rm -f resources/app.asar
# cp ../app.asar resources/app.asar
# rm -f ../unx-arm.zip
# zip -qr9 ../unx-arm.zip * &

# # win-arm.zip
# echo creating win-arm.zip
# cd ../win-arm64-unpacked
# rm -f resources/app.asar
# cp ../app.asar resources/app.asar
# rm -f ../win-arm.zip
# zip -qr9 ../win-arm.zip * &

# # mac-arm.zip
# echo creating mac-arm.zip
# cd ../mac-arm64
# rm -f outertale.app/Contents/Resources/app.asar
# cp ../app.asar outertale.app/Contents/Resources/app.asar
# rm -f ../mac-arm.zip
# zip -qr9 ../mac-arm.zip * &

# # unx-32.zip
# echo creating unx-32.zip
# cd ../linux-ia32-unpacked
# rm -f resources/app.asar
# cp ../app.asar resources/app.asar
# rm -f ../unx-32.zip
# zip -qr9 ../unx-32.zip * &

# # win-32.zip
# echo creating win-32.zip
# cd ../win-ia32-unpacked
# rm -f resources/app.asar
# cp ../app.asar resources/app.asar
# rm -f ../win-32.zip
# zip -qr9 ../win-32.zip * &

# wait for all threads to complete
while [ 1 ]; do fg 2> /dev/null; [ $? == 1 ] && break; done

# and.apk
# echo creating and.apk
# cd ../../..
# rm -rf www
# cp -r app/dist/assets www
# if [ ! -d platforms ]; then yarn build-platforms; fi
# yarn build-apk
# mv platforms/android/app/build/outputs/apk/debug/app-debug.apk app/dist/and.apk