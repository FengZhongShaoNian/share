
const { db } = require('../../server/app/index')

const config = {
  getPort: function () {
    return db.read().get('config.port').value()
  },

  savePort: function (port) {
    db.set('config.port', port).write()
  },

  getPassword: function () {
    return db.read().get('config.password').value()
  },

  savePassword: function (password) {
    db.set('config.password', password).write()
  },

  getNetCard: function () {
    return db.read().get('config.net-card').value()
  },

  saveNetCard: function (netCard) {
    db.set('config.net-card', netCard).write()
  },

  getAllowUpload: function () {
    return db.read().get('config.allow-upload').value()
  },

  saveAllowUpload: function (allowUpload) {
    db.set('config.allow-upload', allowUpload).write()
  },

  getStorageDirectory: function () {
    return db.read().get('config.storage-directory').value()
  },

  saveStorageDirectory: function (storageDirectory) {
    db.set('config.storage-directory', storageDirectory).write()
  }
}

module.exports = config
