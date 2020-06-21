import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入Vant框架
import Vant from 'vant';
import 'vant/lib/index.css';

// 导入 http.js
import http from '../http.js'

// 挂载到 Vue原型
Vue.prototype.$http = http;

// 注册
Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
