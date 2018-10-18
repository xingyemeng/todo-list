import Cookies from 'js-cookie'
import { forEach } from './tools'
/**
 * @param list 根据路由列表获取的数据
 * @param access 从服务器端获取的当前用户的权限 未添加
 * @returns [{}] 返回一个侧边导航栏列表
 * @author 杨少鑫
 * */
export const TOKEN_KEY = 'token'

export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, {expires: 1})
}

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) return token
  else return false
}
export const hasChild = (item) => {
  return item.children && item.children.length !== 0
}

export const hasAcess = (item, access) => {
  if (item.meta && item.meta.access && item.meta.access.length) {
    if (hasOneOf(item.meta.access, access)) return true
    else return false
  } else return true
}
export const hasOneOf = (targetarr,arr) => {
  return targetarr.some(_ => arr.indexOf(_) > -1)
}
export const getNavListByRoutes = (list,access) => {
console.log(access)
  let arr = []
  forEach(list, item => {
    if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
      let obj = {
        icon: (item.meta && item.meta.icon) || '',
        name: item.name,
        meta: item.meta
      }
      if (hasChild(item)) {
        obj.children = getNavListByRoutes(item.children)
      }
      arr.push(obj)
    }
  })
  return arr
}
