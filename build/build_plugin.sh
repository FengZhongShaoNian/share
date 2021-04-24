#!/bin/bash

rm -rf ./dist
rm -rf ../ui/dist
rm -rf ../server/dist
rm -rf ../web/dist

cd ../ui
yarn run build

cd ../build
mkdir -p dist/ui
mkdir -p dist/server/app/public

cp -r ../ui/dist/* dist/ui/

cd ../server
yarn run build

cp -r ./dist/* ../build/dist/server/
cp -r ./node_modules ../build/dist/server/
cp ./package.json ../build/dist/server/


cd ../build
cp ./plugin.json dist/plugin.json
cp ./README.md dist/README.md

# 由于uTools要求reload.js是明文
# 这里将压缩之前的文件拷贝过来，替换掉压缩后的文件
cp -f ../ui/public/preload.js ./dist/ui/preload.js