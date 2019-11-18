import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
// import Regist from '@/components/Regist'
// 默认页面布局
import Layout from '@/components/Layout'
// 首页模块页面设置
import Home from '@/components/Home/Home'
// 系统管理页面设置
import SystemLayout from '@/components/SystemLayout'
import UserList from '@/components/System/UserList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: {
        name: 'Home'
      },
      children: [{
        path: '/Home',
        name: 'Home',
        component: Home
      }, {
        path: '/System',
        name: 'System',
        component: SystemLayout,
        redirect:{
          name: 'UserList'
        },
        children: [{
          path: '/UserList',
          name: 'UserList',
          component: UserList
        }]
      }]
    }, {
      path: '/Login',
      name: 'Login',
      component: Login
    },
  ]
})
