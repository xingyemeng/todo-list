import { login } from '@/api/user'
import { setToken, getToken } from '@/libs/util'

export default {
  state: {
    access: '',
    token: getToken()
  },
  mutations: {
    setToken (token) {
      setToken(token)
    },
    setAccess (state, access) {
      state.access = access
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
            commit('setAccess', data.access)
            resolve()
          } else {
            reject(result.data)
          }
        })
      })
    }
  }
}
