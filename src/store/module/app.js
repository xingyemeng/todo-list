import axios from 'axios'
import routes from '../../router/route'
import {getNavListByRoutes, setLocalStorage} from '../../libs/util'
import {postWork, getWorkList, verifyWork, getFailWork, getWorkCount} from '../../api/works'

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
    failWork: [],
    workCount: 0
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
    },
    worksList: (state) => {
      return state.worksList
    },
    workCount: (state) => {
      return state.workCount
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
    },
    setWorkCount (state, num) {
      state.workCount = num
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
    /**
     * @params data {pNum, pCount} 当前页码和当前页展示条数
     * */
    handleGetWorkList ({state, commit}, data) {
      getWorkList(data).then(res => {
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
    },
    handleWorkCount ({commit}) {
      getWorkCount().then(res => {
        commit('setWorkCount', res.data.count)
      }).catch(err => {
        console.error(err)
      })
    }
  }
}
