
const { launcher } = require('../server/app/index')
const iconTool = require('./util/file-icon')
const config = require('./util/config')
const shareList = require('./util/share-list')
const network = require('./util/network')
const utools = window.utools

const shell = {
  // 在文件夹中打开指定文件
  openInDirectory: function (filePath) {
    utools.shellShowItemInFolder(filePath)
  },
  // 打开文件夹选择对话框，选择文件夹
  // 返回值为用户所选择的文件夹或者undefined
  selectDirectory: function () {
    return utools.showOpenDialog({
      title: '选择文件夹',
      defaultPath: utools.getPath('downloads'),
      buttonLabel: '选择文件夹',
      properties: [
        'openDirectory', 'createDirectory'
      ]
    })
  }
}

const clipboard = {
  // 将文本拷贝到剪切板
  // 拷贝成功返回true
  // 失败返回false
  copyText: function (text) {
    return utools.copyText(text)
  }
}

utools.onPluginEnter(({ code, type, payload, optional }) => {
  console.log('用户进入插件')
  console.log('code:', code)
  console.log('type:', type)
  console.log('payload:', payload)
  console.log('optional:', optional)

  if (code === '94434e14-778b-417d-8fd5-392f70d14293') {
    if (type === 'files') {
      const items = []
      for (const file of payload) {
        const item = {
          fileName: file.name,
          filePath: file.path
        }
        item.icon = iconTool.getIconForFileName(file.name)
        console.log('item:', item)

        items.push(item)
      }
      if (items.length > 1) {
        shareList.addAll(items)
      } else if (items.length === 1) {
        shareList.addItem(items[0])
      }

      console.log('服务器的状态', launcher.isRunning() ? '运行中' : '未运行')
      // 自动启动分享服务
      if (!launcher.isRunning()) {
        setTimeout(() => {
          launcher.start(config.getPort())
        }, 100)
      }
    } else {
      // 刷新list
      shareList.triggerListUpdate()
    }
  }
})

// 窗口不可见的时候退出插件
document.addEventListener('visibilitychange', function () {
  if (document.hidden && !window.preventPluginOut) {
    utools.outPlugin()
    console.log('退出插件.')
  }
})

window.pluginApi = {
  shell,
  clipboard,
  server: launcher,
  config,
  shareList,
  network
}
