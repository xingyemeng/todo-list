import Vue from 'vue'
import VueRouter from 'vue-router'
import allThings from '../components/allThings'
import todoHome from '../components/todoHome'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '',
      component: todoHome
    },
    {
      path: '/allThings',
      component: allThings
    }
  ]
})
