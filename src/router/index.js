import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './route'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(item => item.meta.requireAuth)) {
    next('/login')
  } else {
    next()
  }
})

export default router
