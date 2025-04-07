# environment variables
export NODE_OPTIONS=--max-old-space-size=32768
PSOT_BASE_DIR=$PWD
create_zip() {
    local platform_dir=$1
    local zip_name=$2
    echo "creating $zip_name"
    cd $PSOT_BASE_DIR/app/dist
    rm -f $platform_dir/resources/app.asar
    cp app.asar $platform_dir/resources/app.asar
    rm -f $zip_name
    7z a -mx1 -mmt32 $zip_name $platform_dir
}

# bootstrap
if [ ! -d node_modules ]; then yarn install; fi
if [ ! -d app/dist ]; then yarn build-app; fi

set -m
rm -rf $PSOT_BASE_DIR/app/dist/assets && yarn build-assets > /dev/null &
rm -rf $PSOT_BASE_DIR/app/code && yarn build-types &
wait
cd $PSOT_BASE_DIR
rm -rf www
ln -s app/dist/assets www
if [ ! -d platforms ]; then yarn build-platforms; fi
{
    echo creating src.zip
    cd $PSOT_BASE_DIR
    rm -f app/dist/src.zip
    git archive -o app/dist/src.zip master --format zip -9 &
} &
{
    echo creating web.tar
    cd $PSOT_BASE_DIR/app/dist/assets
    rm -rf ../web.tar
    tar -cf ../web.tar .
} &
{
    echo creating app.asar
    cd $PSOT_BASE_DIR/app/dist
    rm -rf asar
    mkdir asar
    cp -r assets ../code ../index.js ../package.json ../preload.js ../spacetime.js ../icon.png asar
    rm -f app.asar
    cd ../../
    yarn asar pack app/dist/asar app/dist/app.asar
} &
{
    cd $PSOT_BASE_DIR
    echo creating android.apk
    yarn build-apk
    mv platforms/android/app/build/outputs/apk/debug/app-debug.apk app/dist/android.apk
} &
wait
create_zip "linux-unpacked" "linux.zip" &
create_zip "win-unpacked" "win.zip" &
create_zip "win-ia32-unpacked" "win7x32.zip" &
create_zip "win-arm64-unpacked" "winarm64.zip" &
create_zip "linux-arm64-unpacked" "linuxarm64.zip" &
wait

echo build done