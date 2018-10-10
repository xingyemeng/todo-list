import Vue from 'vue'
import Vuex from 'vuex'
import mutation from './mutation'
import axios from 'axios'
import routes from '../router/route'
import { getNavListByRoutes } from '../libs/util'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    todayList: [],
    willList: [
      {id: 0, title: 'm.wbiao.com', text: 'm.wbiao.com添加栏目'},
      {id: 1, title: '万国手表', text: '万国手表维修流程'},
      {id: 2, title: '劳力士手表', text: '劳力士手表维修流程'},
      {id: 3, title: '浪琴手表', text: '浪琴手表维修流程'}
    ],
    deleteThingsList: []
  },
  strict: true,
  getters: {
    filterTodayList: state => {
      // 修改一个拷贝数组，否则会引起在mutation外修改状态的错误
      const items = [...state.todayList].sort((a, b) => {
        return (b.rate - a.rate)
      })
      return items
    },
    undoneThings: state => {
      return state.todayList.filter(undoneThing => undoneThing.done === false)
    },
    doneThings: state => {
      return state.todayList.filter(doneThing => doneThing.done === true)
    },
    deleteThingsList: state => {
      return state.deleteThingsList
    },
    navList: state => getNavListByRoutes(routes)
  },
  mutations: mutation,
  actions: {
    getTodayList (context) {
      axios.get('/api/things/getAllThings')
        .then((response) => {
          context.commit('getTodayList', response.data)
        })
    },
    changeThings (context, id) {
      axios({
        method: 'post',
        url: '/api/things/changeThings',
        data: {
          id: id,
          done: true
        }
      }).then(function (response) {
        context.dispatch('getTodayList')
      })
    },
    deleteThings (context, id) {
      axios({
        method: 'post',
        url: '/api/things/deleteThing',
        data: {
          id: id
        }
      }).then(function (response) {
        context.dispatch('getTodayList')
        context.dispatch('getDeleteThings')
      }).catch(function (err) {
        console.error(err)
      })
    },
    getDeleteThings (context) {
      axios.get('/api/things/getDeleteThings')
        .then(function (response) {
          context.commit('getDeleteThings', response.data)
        })
    },
    restore (context, id) {
      axios({
        method: 'post',
        url: '/api/things/restoreThing',
        data: {
          id: id
        }
      }).then(function (response) {
        context.dispatch('getTodayList')
        context.dispatch('getDeleteThings')
      })
    },
    createThing (context, data) {
      axios({
        method: 'post',
        url: '/api/things/createThing',
        data: data.things
      }).then(response => {
        console.log(response)
        data.ctx.$Message.success('Success!')
        data.ctx.loading = 'none'
        data.ctx.$refs[data.name].resetFields()
        context.dispatch('getTodayList')
        context.dispatch('getDeleteThings')
      })
    }
    /* 首页导航栏高亮事件
    *
    * @name on-select事件传递参数
    *
    * changeActivemenu (context, name) {
    *   context.commit('changeActivemenu', name)
    * }
    * 最后使用localStorage解决
    */
  }
})

export default store
