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
    path: '/work',
    name: 'work1',
    component: Main,
    children: [
      {
        path: 'work-page',
        name: 'work-page',
        meta: {
          access: ['sem'],
          title: '工单提交',
          icon: 'ios-document'
        },
        component: todoHome
      }
    ]
  },
  {
    path: '/work',
    name: 'work',
    meta: {
      access: ['sem'],
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
        component: () => import('../components/works/workview')
      },
      {
        path: 'errwork',
        name: 'errwork',
        meta: {
          icon: 'md-menu',
          title: '不合格工单',
          showAlways: true
        },
        component: deleteThingsList
      },
      {
        path: 'workverify',
        name: 'workverify',
        meta: {
          access: ['semadmin'],
          icon: 'md-menu',
          title: '工单审核'
        },
        component: doneThings
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
      access: ['tec'],
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
        component: doneThings
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
  }
]
