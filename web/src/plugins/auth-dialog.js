
import Vue from 'vue'
import AuthDialog from '@/components/AuthDialog'
import vuetify from './vuetify'

const ComponentClass = Vue.extend(AuthDialog)

const createAuthDialog = function () {
  const instance = new ComponentClass({
    vuetify
  })
  instance.$mount()
  document.body.appendChild(instance.$el)
  return instance
}

const plugin = {
  install (Vue, options) {
    // 添加实例方法
    Vue.prototype.$requirePassword = function () {
      return new Promise((resolve, reject) => {
        const dialog = createAuthDialog()
        dialog.open = true
        dialog.$on('cancel', () => {
          dialog.open = false
          document.body.removeChild(dialog.$el)
          reject(new Error('user cancel'))
        })
        dialog.$on('ok', () => {
          dialog.open = false
          document.body.removeChild(dialog.$el)
          resolve(dialog.password)
        })
      })
    }
  }
}

export default plugin
