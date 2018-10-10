import undoneThings from '../components/undoneThings'
import deleteThingsList from '../components/deleteThingsList'
import doneThings from '../components/doneThings'
import todoHome from '../components/todoHome'
import Main from '../components/main'
import login from '../components/login/login'

export default [
  {
    path: '/',
    component: Main,
    children: [
      {
        path: 'home',
        component: todoHome,
        meta: {requireAuth: true, hideNav: true},
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/login',
    name: '测试',
    component: Main
  },
  {
    path: '/item1',
    name: 'item1',
    component: Main,
    children: [
      {
        path: 'item1-1',
        name: 'iteme1-1',
        component: deleteThingsList
      },
      {
        path: 'item1-2',
        name: 'iteme1-2',
        component: undoneThings
      },
      {
        path: 'item1-3',
        name: 'iteme1-3',
        component: doneThings
      }
    ]
  },
  {
    path: '/item2',
    name: 'item2',
    component: Main,
    children: [
      {
        path: 'item2-1',
        name: 'item2-1',
        component: doneThings
      }
    ]
  },
  {
    path: '/item3',
    name: 'item3',
    component: Main,
    children: [
      {
        path: 'item3-1',
        name: 'item3-1',
        component: doneThings
      }
    ]
  }
]


