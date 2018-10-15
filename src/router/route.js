import undoneThings from '../components/undoneThings'
import deleteThingsList from '../components/deleteThingsList'
import doneThings from '../components/doneThings'
import todoHome from '../components/todoHome'
import Main from '../components/main'
import login from '../components/login/login'

/**
 * meta 配置说明：
 *    title：页面标题
 *    hideInMenu: 是否在左侧导航栏隐藏
 *    showAlways：设为true时，子节点长度为1的栏目不会设为下拉样式
 *    icon：icon图标
 * */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: login
  },
  {
    path: '/',
    component: Main,
    meta: {
      hideInMenu: true,
    },
    children: [
      {
        path: 'home',
        name: 'home',
        component: todoHome,
        meta: {
          requireAuth: true,
          hideInMenu: true,
          title: '首页'
        },
      }
    ]
  },
  {
    path: '/work',
    name: 'work1',
    component: Main,
    children: [
      {
        path: 'work-page',
        name: 'work-page',
        meta: {
          title: '工单提交',
          icon: 'ios-document'
        },
        component: doneThings
      }
    ]
  },
  {
    path: '/item1',
    name: 'item1',
    meta: {
      icon: 'md-menu',
      title: '多级菜单'
    },
    component: Main,
    children: [
      {
        path: 'item1-1',
        name: 'iteme1-1',
        meta: {
          icon: 'md-menu',
          title: '网站系统'
        },
        component: deleteThingsList
      },
      {
        path: 'item1-2',
        name: 'iteme1-2',
        meta: {
          icon: 'md-menu',
          title: 'iteme1-2',
          showAlways: true
        },
        component: undoneThings,
        children: [
          {
            path: 'item1-2-1',
            name: 'item1-2-1',
            meta: {
              icon: 'md-menu',
              title: 'iteme1-2-1'
            },
            component: doneThings
          }
        ]
      },
      {
        path: 'item1-3',
        name: 'iteme1-3',
        meta: {
          icon: 'md-menu',
          title: 'iteme1-3'
        },
        component: doneThings
      }
    ]
  },
  {
    path: '/item2',
    name: 'item2',
    meta: {
      icon: 'md-menu',
      title: 'iteme2',
      showAlways: true
    },
    component: Main,
    children: [
      {
        path: 'item2-1',
        name: 'item2-1',
        meta: {
          icon: 'md-menu',
          title: 'iteme2-1'
        },
        component: doneThings
      }
    ]
  },
  {
    path: '/item3',
    name: 'item3',
    meta: {
      icon: 'md-menu',
      title: 'iteme3',
      showAlways: true
    },
    component: Main,
    children: [
      {
        path: 'item3-1',
        name: 'item3-1',
        meta: {
          icon: 'md-menu',
          title: 'iteme3-1'
        },
        component: doneThings
      }
    ]
  }
]


