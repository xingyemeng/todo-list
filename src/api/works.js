import axios from 'axios'
export const postWork = function (data) {
  return axios({
    url: '/api/work/postwork',
    data,
    method: 'post'
  })
}
/**
 * 获取workList
 * @params str 根据用户获取指定工单（待定，可以根据后台session中的用户id来获取指定列表）
 * */
export const getWorkList = function () {
  return axios({
    url: '/api/work/worklist',
    method: 'get'
  })
}
