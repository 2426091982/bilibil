import axios from 'axios'
import router from './src/router'
import Vue from 'vue'

const http = axios.create({
    baseURL: 'http://112.74.99.5:3000/web/api'
})

// 请求拦截
http.interceptors.request.use(config => {

    // 判断是否有 token 和 id
    if (localStorage.getItem('id') && localStorage.getItem('token')) {
        // 携带token
        config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
    }
    return config
})

// 响应拦截
http.interceptors.response.use(config => {
    return config
}, err => {
    if (err.response.status == 401 || err.response.status == 402) {
        Vue.prototype.$toast.fail(err.response.data.message);
        router.push('/login');
    }
    return Promise.reject(err)
})
export default http