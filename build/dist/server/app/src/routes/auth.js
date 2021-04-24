const express = require('express')
const router = express.Router()
const db = require('../util/datastore')
const authFilter = require('../filter/auth-filter')

// 是否需要密码
router.get('/auth-config', function (req, res, next) {
  const password = db.read().get('config.password').value()
  const requireAuth = password !== ''
  res.send({
    requireAuth
  })
})

// 是否允许上传
router.get('/allow-upload', function (req, res, next) {
  const allowUpload = db.read().get('config.allow-upload').value()
  res.send({
    allowUpload
  })
})

// 验证密码
router.post('/validate', authFilter, function (req, res) {
  res.sendStatus(200)
})

module.exports = router
