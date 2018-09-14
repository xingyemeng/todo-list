import Vue from 'vue'
import Vuex from 'vuex'
import mutation from './mutation'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    todayList: [
      {id: 0, title: '百达翡丽手表', text: '百达翡丽手表维修流程', done: true, rate: 3},
      {id: 1, title: '万国手表', text: '万国手表维修流程', done: false, rate: 4},
      {id: 2, title: '劳力士手表', text: '劳力士手表维修流程', done: true, rate: 2},
      {id: 3, title: '浪琴手表', text: '浪琴手表维修流程', done: false, rate: 5}
    ],
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
    }
  },
  mutations: mutation
})

export default store
