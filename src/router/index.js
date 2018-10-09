import Vue from 'vue'
import VueRouter from 'vue-router'
import undoneThings from '../components/undoneThings'
import deleteThingsList from '../components/deleteThingsList'
import doneThings from '../components/doneThings'
import todoHome from '../components/todoHome'
import Main from '../components/main'
import login from '../components/login/login'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Main,
      meta: {requireAuth: true},
      children: [
        {
          path: '/home',
          component: todoHome
        }
      ]
    },
    {
      path: '/undoneThings',
      component: Main,
      children: [
        {
          path: '1',
          component: undoneThings
        }
      ]
    },
    {
      path: '/doneThings',
      component: Main,
      children: [
        {
          path: '1',
          component: doneThings
        }
      ]
    },
    {
      path: '/deleteThingsList',
      component: Main,
      children: [
        {
          path: '1',
          component: deleteThingsList
        }
      ]
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/item1',
      component: Main,
      children: [
        {
          path: 'item1-1',
          component: doneThings
        }
      ]
    }
  ],
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
