import { login, getUserInfo } from '@/api/user'
import { setToken, getToken } from '@/libs/util'

export default {
  state: {
    access: '',
    token: getToken(),
    userName: ''
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
          let data = res.data
          commit('setAccess', data.access)
          commit('setUserName', data.userName)
          resolve(data)
        }).catch(err => {
          console.error(err)
        })
      })
    },
    userLogout ({commit}) {
      return new Promise((resolve, reject) => {
        commit('setToken', '')
        commit('setAccess', [])
        resolve()
      })
    }
  }
}
