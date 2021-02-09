#!/bin/bash

rm -rf ./dist
rm -rf ../ui/dist
rm -rf ../server/dist
rm -rf ../web/dist

cd ../ui
yarn run build

cd ../build
mkdir -p dist/ui
mkdir -p dist/server/app
mkdir -p dist/server/public

cp -r ../ui/dist/* dist/ui/

cd ../server
yarn run build

cp ./dist/index.js ../build/dist/server/app/
cp -r ./dist/public/* ../build/dist/server/public/

cd ../build
cp ./plugin.json dist/plugin.json
cp ./README.md dist/README.md