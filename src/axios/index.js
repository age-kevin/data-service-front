// 引入axios
import Axios from 'axios'
import {Message} from 'element-ui'
import router from '@/router'
import store from '@/store/index'
// import Qs from 'qs'

const commonAxios = Axios.create({
    baseURL: window.RemoteAddress, // 打包需要
    timeout: 10000, // 请求超时时间
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    }
});
// sessionStorage.setItem("access_token", "12345")
// 请求拦截
commonAxios.interceptors.request.use(
    config => {
        if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
            config.headers = {
                'Content-Type': 'application/x-www-form-urlencoded' // 设置跨域头部
                // 'Content-Type': 'multipart/form-data'
            };
            config.data.token = sessionStorage.getItem('access_token')
        } else {
            config.params || (config.params = {})
            config.params.token = sessionStorage.getItem('access_token')
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });
// 响应拦截
commonAxios.interceptors.response.use(function(response) {
    //如果返回Unauthorized,删除用户信息,token信息,并跳回登录页面
    if (response.data.code == 7) {
      store.commit('saveAccessToken', '')
      store.commit('saveUserInfo', '')
      router.push('/Login')
    }
    return response.data;
}, function(error, xhr) {
    Message({
      message: '网络连接出错！',
      type: 'error'
    })
    return Promise.reject(error);
});

export default commonAxios
