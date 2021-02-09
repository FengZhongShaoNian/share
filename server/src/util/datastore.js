
// 存储应用数据

const low = require('lowdb')
const LodashId = require('lodash-id')
const FileSync = require('lowdb/adapters/FileSync')
const path = require('path')
const fs = require('fs-extra')

// 获取应用的用户目录
const os = require('os')
const STORE_PATH = path.join(os.homedir(), '.share')

// 如果路径不存在, 则创建
if (!fs.pathExistsSync(STORE_PATH)) {
  fs.mkdirpSync(STORE_PATH)
}

// 初始化lowdb读写的json文件名以及存储路径
const adapter = new FileSync(path.join(STORE_PATH, '/data.json'))

// lowdb接管该文件
const db = low(adapter)
db._.mixin(LodashId)

if (!db.has('share-list').value()) {
  db.set('share-list', []).write()
}

// 默认端口为12345
if (!db.has('config').value()) {
  const defaultStorageDirectory = path.join(os.homedir(), 'Downloads', 'Uploads')
  const defaultConfig = {
    port: 12345,
    password: '12df',
    'net-card': '',
    'allow-upload': true,
    'storage-directory': defaultStorageDirectory
  }
  db.set('config', defaultConfig).write()
}

module.exports = db
