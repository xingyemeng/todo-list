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
export const getUserInfo = function (userId) {
  const data ={
    userId
  }
  return axios({
    url: '/api/admin/getUserInfo',
    data,
    method: 'post'
  })
}
