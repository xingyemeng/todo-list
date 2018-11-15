import axios from 'axios'
import routes from '../../router/route'
import {getNavListByRoutes, setLocalStorage} from '../../libs/util'
import {postWork, getWorkList} from '../../api/works'

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
        console.log(res)
      }).catch(err => {
        console.error(err)
      })
    }
  }
}
