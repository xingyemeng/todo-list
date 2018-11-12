import Cookies from 'js-cookie'
import { forEach } from './tools'

export const TOKEN_KEY = 'mytoken'

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
  if (access && access[0] === 'admin') return true
  if (item.meta && item.meta.access && item.meta.access.length) {
    if (hasOneOf(item.meta.access, access)) return true
    else return false
  } else return true
}
export const hasOneOf = (targetarr, arr) => {
  return targetarr.some(_ => arr.indexOf(_) > -1)
}
/**
 * @param list 根据路由列表获取的数据
 * @param access 从服务器端获取的当前用户的权限
 * @returns [{}] 返回一个侧边导航栏列表
 * @author xingyemeng
 * */
export const getNavListByRoutes = (list, access) => {
  let arr = []
  forEach(list, item => {
    if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
      let obj = {
        icon: (item.meta && item.meta.icon) || '',
        name: item.name,
        meta: item.meta
      }
      if (hasChild(item) && hasAcess(item, access)) {
        obj.children = getNavListByRoutes(item.children, access)
      }
      if (hasAcess(item, access)) arr.push(obj)
    }
  })
  return arr
}

/**
 * 标签栏写入localStorage
 * */
const arr = JSON.parse(localStorage.getItem('tagsList'))
export const setLocalStorage = (item) => {
  arr.push(item)
  console.log(arr)
  localStorage.setItem('tagsList', JSON.stringify(arr))
}


export const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem('tagsList'))
}












