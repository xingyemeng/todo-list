import axios from 'axios'
export const login = function (userName, password) {
  const data = {
    userName,
    password
  }
  return axios({
    url: '/api/admin/login',
    data,
    method: 'post'
  })
}
