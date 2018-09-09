import Vue from 'vue'
import VueRouter from 'vue-router'
import allThings from '../components/allThings'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/allThings',
      component: allThings
    }
  ]
})
