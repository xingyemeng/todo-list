import axios from 'axios'
import routes from '../../router/route'
import {getNavListByRoutes, setLocalStorage} from '../../libs/util'

export default {
  state: {
    tagsList: [
      {
        name: '首页',
        link: '/home',
        rName: 'home'
      }
    ],
    worksList: []
  },
  getters: {
    navList: (state, getters, rootState) => getNavListByRoutes(routes, rootState.user.access)
  },
  mutations: {
    addTagsList (state, item) {
      state.tagsList.push(item)
      setLocalStorage(item)
    },
    getTagsFromLocal (state, arr) {
      state.tagsList.push(...arr)
    },
    setWorksList (state, arr) {
      state.worksList.push(...arr)
    }
  },
  actions: {
    handleWtList (context, data) {
      return new Promise((resolve, reject) => {
        if (!data) data = ['axios']
        axios({
          method: 'post',
          url: '/api/waitui/wtlist',
          data: data
        }).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handlePostWork ({state, commit}, data) {
      return new Promise((resolve, reject) => {
        if (!data) {
          console.error('提交失败，未获取到数据')
        }
      })
    }
  }
}
