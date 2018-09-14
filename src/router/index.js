import Vue from 'vue'
import VueRouter from 'vue-router'
import undoneThings from '../components/undoneThings'
import deleteThingsList from '../components/deleteThingsList'
import doneThings from '../components/doneThings'
import todoHome from '../components/todoHome'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '',
      component: todoHome
    },
    {
      path: '/undoneThings',
      component: undoneThings
    },
    {
      path: '/doneThings',
      component: doneThings
    },
    {
      path: '/deleteThingsList',
      component: deleteThingsList
    }
  ]
})
