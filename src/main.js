import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import './plugins/element.js'
import '@/plugins/axios.js'
import '@/api/'
import store from './store/index.js'

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
