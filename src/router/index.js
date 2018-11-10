import Vue from 'vue'
import iView from 'iview'
import VueRouter from 'vue-router'
import routes from './route'
import { getToken } from '@/libs/util'
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  const Token = getToken('token')
  const LoginPage = 'login'
  const HomePage = 'home'
  // 未登录要进去登录界面
  if (!Token && to.name === LoginPage) {
    next()
  } else if (!Token && to.name !== LoginPage) {
    // 未登录进入非登录界面
    next({name: LoginPage})
  } else if (Token && to.name === LoginPage) {
    // 已登录进入登录界面
    next(HomePage)
  } else {
    console.log(store.state.user.access.length)
    // 已登录进入首页，此时调用getUserInfo
    if (store.state.user.access.length !== 0) {
      next()
    } else {
      store.dispatch('getUserInfo').then(res => {
        next()
      })
    }
  }
})
router.afterEach(to => {
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
