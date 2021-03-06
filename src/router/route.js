import undoneThings from '../components/undoneThings'
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
 *    keepAlive: 是否缓存页面
 *
 * note: 只有一个子栏目的权限字段放在父路由的meta内
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
    name: '_home',
    meta: {
      hideInMenu: true
    },
    children: [
      {
        path: 'home',
        name: 'home',
        component: todoHome,
        meta: {
          hideInMenu: true,
          title: '首页'
        }
      }
    ]
  },
  {
    path: '/work1',
    name: 'work1',
    component: Main,
    meta: {
      access: ['semuser']
    },
    children: [
      {
        path: 'work-page',
        name: 'work-page',
        meta: {
          title: '工单提交',
          icon: 'ios-document',
          keepAlive: true
        },
        component: () => import('@/view/workPost/workPost')
      }
    ]
  },
  {
    path: '/work',
    name: 'work',
    meta: {
      access: ['semuser', 'semadmin'],
      icon: 'md-menu',
      title: '竞价'
    },
    component: Main,
    children: [
      {
        path: 'workview',
        name: 'workview',
        meta: {
          icon: 'md-menu',
          title: '查看工单'
        },
        component: () => import('@/view/workView/workView')
      },
      {
        path: 'errwork',
        name: 'errwork',
        meta: {
          icon: 'md-menu',
          title: '不合格工单',
          showAlways: true
        },
        component: () => import('@/view/failWork/failWork')
      },
      {
        path: 'workverify',
        name: 'workverify',
        meta: {
          access: ['semadmin'],
          icon: 'md-menu',
          title: '工单审核'
        },
        component: () => import('@/view/workVerify/workVerify')
      },
      {
        path: 'groupwork',
        name: 'groupwork',
        meta: {
          access: ['semadmin'],
          icon: 'md-menu',
          title: '部门统计'
        },
        component: undoneThings
      }
    ]
  },
  {
    path: '/tec',
    name: 'tec',
    meta: {
      access: ['tecuser', 'tecadmin'],
      icon: 'md-menu',
      title: '技术',
      showAlways: true
    },
    component: Main,
    children: [
      {
        path: 'workview',
        name: 'tecview',
        meta: {
          icon: 'md-menu',
          title: '查看工单'
        },
        component: () => import('@/view/workView/workView')
      },
      {
        path: 'groupwork',
        name: 'grouptecwork',
        meta: {
          access: ['tecadmin'],
          icon: 'md-menu',
          title: '部门统计'
        },
        component: doneThings
      }
    ]
  },
  {
    path: '/waitui',
    name: 'waitui',
    meta: {
      access: ['wtuser'],
      icon: 'md-menu',
      title: '外推',
      showAlways: true
    },
    component: Main,
    children: [
      {
        path: 'wtlist',
        name: 'wtlist',
        meta: {
          icon: 'md-menu',
          title: '外链统计'
        },
        component: () => import('@/components/waitui/waitui')
      }
    ]
  },
  {
    path: '*',
    name: 'err-404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/components/err/err_404/404.vue')
  }
]
