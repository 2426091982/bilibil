import Vue from 'vue'
import VueRouter from 'vue-router'
import register from '@/views/register.vue'
import login from '@/views/login.vue'
import userInfo from '@/views/userInfo.vue'
import edit from '@/views/edit.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/register',
    component: register
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/userinfo',
    component: userInfo,
    meta: {
      isToken: true
    }
  },
  {
    path: '/edit',
    component: edit,
    meta: {
      isToken: true
    }
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  // 判断是否有 token,
  // 有些页面不需要 token 也可以访问，这些页面的 isToken = false
  if((!localStorage.getItem('token') || !localStorage.getItem('id')) && to.meta.isToken == true) {
    // 跳转到登录页面
    router.push('/login')    
    Vue.prototype.$toast.fail('请重新登录');
    return
  }
  // 继续下一步
  next()
})

export default router