/**
 * Created by Ferryman on 2017/8/7.
 */
import axios from 'axios'; // 引用axios
// import {getCookie} from './cookie';

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 10000,                 // 请求超时时间
  headers: {'X-Requested-With': 'XMLHttpRequest'} // header头部加标识
});
axios.defaults.withCredentials = true;
// http request 拦截器，通过这个，我们就可以把Cookie传到后台
service.interceptors.request.use(
  config => {
    // const token = getCookie('session'); // 获取Cookie
    // config.data = JSON.stringify(config.data);
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded' // 设置跨域头部
    };
    // if (token) {
    //   config.params = {'token': token}; // 后台接收的参数，后面我们将说明后台如何接收
    // };
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// http response 拦截器
service.interceptors.response.use(
  response => {
// response.data.，errCode是我接口返回的值如果值为2，说明Cookie丢失，然后跳转到登录页，这里根据大家自己的情况来设定
    if (response.data.errCode === 2) {
      this.router.push({
        path: '/Login',
        query: {redirect: '/Login'.fullPath} // 从哪个页面跳转
      });
    }
    return response;
  },
  error => {
    // location.href = 'http://main.ihaopin.com/views/userPage.html?type=login&res=home.html';
    // this.router.push({
    //   path: '/'
    // });
    return Promise.reject(error.response.data);
  });

export default service;
