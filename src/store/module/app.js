import axios from 'axios'
import routes from '../../router/route'
import {getNavListByRoutes, setLocalStorage} from '../../libs/util'
import {postWork, getWorkList, verifyWork, getFailWork} from '../../api/works'

export default {
  state: {
    tagsList: [
      {
        name: '首页',
        link: '/home',
        rName: 'home'
      }
    ],
    worksList: [],
    failWork: []
  },
  getters: {
    navList: (state, getters, rootState) => getNavListByRoutes(routes, rootState.user.access),
    verifyWorksList: (state) => {
      return state.worksList.filter(item => {
        return item.flag === false
      })
    },
    failWorksList: (state) => {
      return state.failWork
    }
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
      state.worksList = arr
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
          console.log('提交失败，未获取到数据')
          return
        }
        postWork(data).then(res => {
          resolve(res)
        }).catch(err => {
          console.log('axios返回值出错' + err)
          reject(err)
        })
      })
    },
    handleGetWorkList ({state, commit}) {
      getWorkList().then(res => {
        commit('setWorksList', res.data)
      }).catch(err => {
        console.error(err)
      })
    },
    handleVerifyWork (context, data) {
      return new Promise((resolve, reject) => {
        verifyWork(data).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleFailWorksList ({state}, data) {
      getFailWork(data).then(res => {
        state.failWork = res.data
      }).catch(err => {
        console.error(err)
      })
    }
  }
}
