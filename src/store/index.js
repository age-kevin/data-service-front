import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        reload: true,
        loading: false,
        access_token: sessionStorage.getItem('access_token') || '',
        userInfo : sessionStorage.getItem('userInfo') || '',
        format: null
    },
    getters: {

    },
    // 同步设置
    mutations: {
        // 设置登录标识
        saveAccessToken(state, data) {
            state.access_token = data
        },
        // 设置用户信息
        saveUserInfo(state, data) {
            state.userInfo = data
        },
    },
    // 异步设置
    actions: {

    }
})
