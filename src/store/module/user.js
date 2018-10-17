import { login } from '@/api/user'
export default {
  state: {

  },
  mutations: {

  },
  actions: {
    handleLogin ({commit},{user:userName, password}) {
      userName = userName.trim();
      return new Promise((resolve, reject) => {
        login(userName, password).then(result => {
          console.log(result)
          resolve()
        })
      })
    }
  }
}
