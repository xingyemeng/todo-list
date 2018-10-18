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
    }
  },
  actions: {
    handleLogin ({commit}, {user: userName, password}) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        login(userName, password).then(result => {
          console.log(result)
          if (result.data.code === 200) {
            const data = result.data
            console.log(data)
            commit('setToken', data.token)
            resolve()
          } else {
            reject(result.data)
          }
        })
      })
    }
  }
}
