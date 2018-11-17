import { login, getUserInfo } from '@/api/user'
import { setToken, getToken, destorySession } from '@/libs/util'

export default {
  state: {
    access: '',
    token: getToken(),
    userName: '',
    userGroup: ''
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setAccess (state, access) {
      state.access = access
    },
    setUserName (state, name) {
      state.userName = name
    },
    setUserGroup (state, group) {
      state.userGroup = group
    }
  },
  actions: {
    handleLogin ({commit}, {user: userName, password}) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        login(userName, password).then(result => {
          if (result.data.code === 200) {
            const data = result.data
            commit('setToken', data.token)
            resolve()
          } else {
            reject(result.data)
          }
        })
      })
    },
    getUserInfo ({state, commit}) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(res => {
          console.log(res)
          let data = res.data
          console.log(data)
          commit('setAccess', data.access)
          commit('setUserName', data.userName)
          commit('setUserGroup', data.userGroup)
          resolve(data)
        }).catch(err => {
          console.error(err)
        })
      })
    },
    userLogout ({commit}) {
      return new Promise((resolve, reject) => {
        destorySession()
        commit('setToken', '')
        commit('setAccess', [])
        resolve()
      })
    }
  }
}
