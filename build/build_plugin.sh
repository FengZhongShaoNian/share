#!/bin/bash

set -e

module_path_build=$(pwd)
module_path_server=$(cd ../server && pwd)
module_path_ui=$(cd ../ui && pwd)
module_path_web=$(cd ../web && pwd)

echo "build模块的路径：$module_path_build"
echo "server模块的路径：$module_path_server"
echo "ui模块的路径：$module_path_ui"

# build模块的dist目录的路径
the_build_module_dist_dir_path="${module_path_build}/dist"

function install_packages() {
    cd "$module_path_ui" && yarn
    cd "$module_path_server" && yarn
    cd "$module_path_web" && yarn
}

# 删除旧版本的文件
function clean_old_dist() {
  echo "清理dist文件夹..."
  rm -rf "${module_path_build}/dist"
  rm -rf "${module_path_ui}/dist"
  rm -rf "${module_path_server}/dist"
  rm -rf "${module_path_web}/dist"
  echo "dist文件夹清理完毕！"
}

function build_ui_module(){
  echo "开始编译ui模块..."
  cd "$module_path_ui"
  yarn run build
  echo "ui模块编译完成！"

  echo "开始将ui模块的编译结果拷贝到build模块的相应位置..."
  mkdir -p "${the_build_module_dist_dir_path}/ui"
  cp -r "${module_path_ui}/dist/." "${the_build_module_dist_dir_path}/ui/"
  echo "ui模块编译结果拷贝完成！"
}

function build_server_module(){
  echo "开始编译server模块..."
  cd "${module_path_server}"
  yarn run build
  echo "server模块编译完成！"

  echo "开始拷贝server模块的编译结果到build模块的相应位置..."
  mkdir -p "${the_build_module_dist_dir_path}/server/app"
  cp -r "${module_path_server}/dist/app/." "${the_build_module_dist_dir_path}/server/app/"
  cp -r "${module_path_server}/package.json" "${the_build_module_dist_dir_path}/server/"
  cp -r "${module_path_server}/node_modules" "${the_build_module_dist_dir_path}/server/"
  echo "server模块编译结果拷贝完成!"
}

function after_build(){
  echo "开始拷贝一些其它的必要文件..."
  cp -f "${module_path_build}/plugin.json" "${the_build_module_dist_dir_path}/plugin.json"
  cp -f "${module_path_build}/README.md" "${the_build_module_dist_dir_path}/README.md"

  # 由于uTools要求reload.js是明文
  # 这里将压缩之前的文件拷贝过来，替换掉压缩后的文件
  cp -f "${module_path_ui}/public/preload.js" "${the_build_module_dist_dir_path}/ui/preload.js"
  cp -rf "${module_path_ui}/public/util/." "${the_build_module_dist_dir_path}/ui/util/"
  echo "操作完成！"
}

function clean_js_map(){
  echo "删除*.js.map文件，以减小文件大小..."
  cd "${the_build_module_dist_dir_path}/server/app/public"
  find ./ -name *.js.map | rm -f
  echo "处理完成！"
}

function run_all_task(){
  clean_old_dist && install_packages && build_ui_module && build_server_module && after_build && clean_js_map
  echo "所有任务执行完毕！"
}

run_all_task
