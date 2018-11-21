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
export const getWorkList = function (data) {
  return axios({
    url: '/api/work/worklist/' + data.pNum + '/' + data.pCount,
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
/**
 * 根据不同角色获取查看的工单数目，这是后台完成的，返回值传递给Page组件的total属性
 * */
export const getWorkCount = function () {
  return axios({
    url: '/api/work/workcount',
    method: 'get'
  })
}
