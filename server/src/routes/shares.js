const express = require('express')
const router = express.Router()
const db = require('../util/datastore')

// 分享列表
// 响应报文格式：
// [
//   { fileName: 'Real-Time', icon: 'mdi-clock',  url: '/files/1' },
//   { fileName: 'Audience', icon: 'mdi-account', url: '/files/2' },
//   { fileName: 'Conversions', icon: 'mdi-flag', url: '/files/3' }
// ]
router.post('/', function (req, res, next) {
  const data = db.read().get('share-list').value()
  for (const item of data) {
    item.url = `/files/${item.id}`
    delete item.filePath
    delete item.id
  }
  res.send(data)
})

module.exports = router
