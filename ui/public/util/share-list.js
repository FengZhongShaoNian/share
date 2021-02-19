
const { db } = require('../../server/app/index')
const { uuid } = require('./uuid')

class ShareList {
  constructor () {
    this.callableListeners = []
  }

  getAllItems () {
    return db.read().get('share-list').value().reverse()
  }

  addItem (item) {
    db.read().get('share-list').insert(item).write()
    for (const callback of this.callableListeners) {
      callback(this.getAllItems())
    }
  }

  addAll (items) {
    if (items !== undefined && items instanceof Array) {
      if (items.length === 0) return
      const list = db.read().get('share-list').value()
      for (const item of items) {
        item.id = uuid()
        list.push(item)
      }
      db.set('share-list', list).write()

      for (const callback of this.callableListeners) {
        callback(this.getAllItems())
      }
      return
    }
    throw new Error('items must be an array')
  }

  removeItem (itemId) {
    db.read().get('share-list').remove({ id: itemId }).write()
    for (const callback of this.callableListeners) {
      callback(this.getAllItems())
    }
  }

  addListChangeListener (callback) {
    if (typeof callback !== 'function') {
      throw new Error('callback is not a valid function.')
    }
    for (const existListener of this.callableListeners) {
      if (existListener === callback) {
        return
      }
    }
    this.callableListeners.push(callback)
  }

  removeListChangeListener (callback) {
    let position
    for (let i = 0; i < this.callableListeners.length; ++i) {
      if (this.callableListeners[i] === callback) {
        position = i
        break
      }
    }
    if (position !== undefined) {
      this.callableListeners.splice(position, 1)
    }
  }

  triggerListUpdate () {
    for (const callback of this.callableListeners) {
      callback(this.getAllItems())
    }
  }
}
const shareList = new ShareList()

module.exports = shareList
