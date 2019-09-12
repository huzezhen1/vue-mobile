import 'amfe-flexible'
import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import Axios from './backend/index'
import store from './store/index'
import { Button } from 'vant'
import './assets/css/reset.scss'
import components from '@/components/index'
import filters from './filters/index'
// 导入Icon
import '@/icons'
// 注册全局组件
Vue.use(components)

Vue.config.productionTip = false
Vue.prototype.$axios = Axios

// 注册过滤器
for (let key in filters) {
  if (Object.hasOwnProperty.call(filters, key)) {
    Vue.filter(key, filters[key])
  }
}

Vue.use(Button)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
