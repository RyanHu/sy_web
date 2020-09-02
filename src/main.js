import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import './plugins/element.js'

import axios from './util/NetworkUtils'

Vue.config.productionTip = false
Vue.use(axios)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
