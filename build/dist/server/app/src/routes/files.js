const express = require('express')
const router = express.Router()
const db = require('../util/datastore')
const fileUtil = require('../util/file-util')
const multer = require('multer')
const authFilter = require('../filter/auth-filter')

// 文件下载
router.get('/:id', function (req, res, next) {
  const id = req.params.id
  if (!id) {
    res.sendStatus(404)
    return
  }
  const item = db.read().get('share-list').find({ id: id }).value()
  if (!item) {
    res.sendStatus(404)
    return
  }
  const { filePath, fileName } = item
  const options = {
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': 'attachment;filename=' + encodeURI(fileName)
    }
  }
  res.sendFile(filePath, options, function (error) {
    if (error) {
      console.error('文件[%s]传输失败：%s', fileName, error.message)
    } else {
      console.log('文件[%s]传输完成', fileName)
    }
  })
})

// 文件上传
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const directory = db.read().get('config.storage-directory').value()
    fileUtil.isDirectoryExist(directory)
      .then((exist) => {
        if (exist) {
          cb(null, directory)
          return
        }
        fileUtil.mkdirRecursively(directory).then(() => {
          cb(null, directory)
        })
      }).catch((e) => {
        cb(e, null)
      })
  },
  filename: function (req, file, cb) {
    const directory = db.read().get('config.storage-directory').value()
    fileUtil.requireAnUnusedName(directory, file.originalname)
      .then((availableName) => {
        cb(null, availableName)
      }).catch((e) => {
        cb(e, null)
      })
  }
})

// 验证upload-token是否正确
// 不正确的话不允许上传
const filter = function (req, file, cb) {
  const allowUpload = db.read().get('config.allow-upload').value()
  if (!allowUpload) {
    cb(null, false)
    cb(new Error('接收端未启用上传功能'))
    return
  }
  cb(null, true)
}
const upload = multer({ storage: storage, fileFilter: filter }).single('file')
router.put('/', authFilter, function (request, response) {
  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were an
  upload(request, response, function (err) {
    // 添加错误处理
    if (err) {
      console.log(err)
      response.status(500).json({ message: err.message })
      return
    }
    response.sendStatus(200)
  })
})

module.exports = router
