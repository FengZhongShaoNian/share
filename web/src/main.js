import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import authDialog from './plugins/auth-dialog'
import toast from '@/plugins/toast'

Vue.config.productionTip = false
Vue.use(authDialog)
Vue.use(toast)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
