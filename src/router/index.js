import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入注册界面
import register from '@/views/register.vue'
// 导入登录界面
import login from '@/views/login.vue'
// 导入用户资料页面
import userInfo from '@/views/userInfo.vue'
// 导入修改页面
import edit from '@/views/edit.vue'
// 导入首页
import Home from '@/views/Home.vue'
// 导入详情页面
import Article from '@/views/Article.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/Home'
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
  },
  {
    path: '/Home',
    component: Home,
    meta: {
      isToken: false
    }
  },
  {
    path: '/Article/:id',
    component: Article,
    meta: {
      isToken: false
    }
  },
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