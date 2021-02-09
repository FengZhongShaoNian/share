import Vue from 'vue'
import Toast from '../components/Toast'
import vuetify from './vuetify'

const ComponentClass = Vue.extend(Toast)

const createToast = function () {
  const instance = new ComponentClass({
    vuetify
  })
  instance.$mount()
  document.body.appendChild(instance.$el)
  return instance
}

export default {
  install (Vue, options) {
    if (this.installed) return
    this.installed = true
    const toast = createToast()
    Vue.prototype.$showMessage = function (message) {
      toast.showMessage(message)
    }
    Vue.prototype.$showSuccess = function (message) {
      toast.showSuccess(message)
    }
    Vue.prototype.$showWarning = function (message) {
      toast.showWarning(message)
    }
    Vue.prototype.$showError = function (message) {
      toast.showError(message)
    }
  }
}
