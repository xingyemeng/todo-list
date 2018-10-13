/**
 * @param list 根据路由列表获取的数据
 * @param access 从服务器端获取的当前用户的权限 未添加
 * @returns [{}] 返回一个侧边导航栏列表
 * @author 杨少鑫
 * */
export const hasChild = (item) => {
  return item.children && item.children.length !== 0
}

export const getNavListByRoutes =  (list) => {
/*  var arr = list.filter( item => {
    if(!item.children) {
      return false
    }else if (item.children[0].meta) {
      if(item.children[0].meta.hideNav) return false
    }
    return true
  })
  return arr*/
  let arr = []
  list.forEach( item => {
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
