
const sham = {
  shell: {
    openInDirectory (filePath) {
      console.log('you want to open [' + filePath + '] in folder')
    }
  },
  clipboard: {
    copyText (text) {
      console.log('you want to copy[' + text + ']')
    }
  },
  server: {
    isRunning () {
      return false
    }
  },
  config: {
    getPort: function () {
      return 3000
    },

    savePort: function (port) {
      console.log('save port:' + port)
    },

    getPassword: function () {
      return '12dfd'
    },

    savePassword: function (password) {
      console.log('save password:' + password)
    },

    getNetCard: function () {
      return '以太网'
    },

    saveNetCard: function (netCard) {
      console.log('save netCard:' + netCard)
    },

    getAllowUpload: function () {
      return true
    },

    saveAllowUpload: function (allowUpload) {
      console.log('save allowUpload:' + allowUpload)
    },

    getStorageDirectory: function () {
      return 'c:/'
    },

    saveStorageDirectory: function (storageDirectory) {
      console.log('save storageDirectory:' + storageDirectory)
    }

  },
  shareList: {
    getAllItems () {
      return [
        {
          id: '4031ab24-ac43-4a3e-af3c-87aea41d1ab4',
          fileName: 'xxx.xlsx',
          filePath: 'E: \\xxx.xlsx',
          fileType: 'excel',
          url: 'http://xxxxxxxxxx'
        }]
    },
    removeItem (id) {
      console.log('you want to remove item [' + id + ']')
    },
    addListChangeListener (callback) {
      console.log('addListChangeListener:' + callback)
    },
    removeListChangeListener (callback) {
      console.log('removeListChangeListener:' + callback)
    }
  },

  network: {
    getAllNetCards () {
      return ['以太网', '以太网1', '以太网2']
    },
    getIpv4AddressByNetCard (netCard) {
      return '127.0.0.1'
    }
  }
}

const pluginApi = window.pluginApi === undefined
  ? sham
  : window.pluginApi

export default {
  ...pluginApi
}
