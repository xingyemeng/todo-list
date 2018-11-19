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
/**
 * 工单审核
 * */
export const verifyWork = function (data) {
  return axios({
    url: '/api/work/verifywork/' + data.param,
    data,
    method: 'post'
  })
}

/**
 * 获取已驳回的工单
 * */
export const getFailWork = function (data) {
  return axios({
    url: '/api/work/failwork',
    data,
    method: 'get'
  })
}
