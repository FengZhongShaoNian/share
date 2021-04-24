
const app = require('./app')

let httpServer = null

const serverStatusListener = new Set()

module.exports = {
  // 启动http服务器
  // 仅支持单实例运行
  start (port) {
    return new Promise((resolve, reject) => {
      if (httpServer && httpServer.listening) {
        console.warn('server is running, only single instances are supported. ')
        resolve()
        return
      }

      try {
        httpServer = app.listen(port)
      } catch (e) {
        reject(e)
        return
      }

      httpServer.on('listening', () => {
        resolve()
        for (const callable of serverStatusListener) {
          callable()
        }
      })
      httpServer.on('error', function (e) {
        reject(e)
        for (const callable of serverStatusListener) {
          callable()
        }
      })
    })
  },

  // 关闭http服务器
  stop () {
    return new Promise((resolve, reject) => {
      if (!httpServer || !httpServer.listening) {
        resolve()
        return
      }
      // httpServer.close方法，如果 server 在关闭时未打开，回调函数被调用时会传入一个 Error 对象作为唯一参数。
      httpServer.close(function (error) {
        if (error !== undefined && error instanceof Error) {
          console.warn(error)
          resolve(error)
        } else {
          resolve()
        }
        for (const callable of serverStatusListener) {
          callable()
        }
      })
    })
  },

  // 查询服务器是否正在运行
  isRunning () {
    if (!httpServer || !httpServer.listening) {
      return false
    }
    return true
  },

  // 当服务器状态发生变化的时候
  // callback将会被调用
  registerServerStatusChangeListener (callback) {
    if (typeof callback !== 'function') {
      throw new Error('callback 必须是function类型')
    }
    serverStatusListener.add(callback)
  },

  removeServerStatusChangeListener (callback) {
    if (serverStatusListener.has(callback)) {
      serverStatusListener.delete(callback)
    }
  }
}
