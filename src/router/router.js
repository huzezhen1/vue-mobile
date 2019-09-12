import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      redirect: '/home',
      component: resolve => require(['@/pages/Main.vue'], resolve),
      children: [{
        path: '/home',
        name: 'Home',
        meta: {
          title: '首页'
        },
        component: resolve => require(['@/pages/index.vue'], resolve)
      }]
    }]
})
