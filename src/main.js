// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
// 引入vuex
import store from '@/store/index'
// 引入请求专用
import commonAxios from '@/axios/index'
import NProgress from 'nprogress' // Progress 进度条
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入基础配置
import 'nprogress/nprogress.css' // Progress 进度条 样式
// 引入公共样式
import '@/assets/css/common.scss'
// 引入公共组件
import TopNav from '@/components/common/Header'
Vue.component('TopNav', TopNav)
import LeftMenu from '@/components/common/LeftMenu'
Vue.component('LeftMenu', LeftMenu)
import BreadCrumb from '@/components/common/breadcrumb'
Vue.component('BreadCrumb', BreadCrumb)

Vue.config.productionTip = false

Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  NProgress.start() // 开启Progress
  if (store.state.access_token) {
    next()
  } else {
    if(to.path == '/Login' || to.path == '/Regist') {
      next()
    } else {
      next('/Login')
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
});

Vue.prototype.commonAxios = commonAxios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
