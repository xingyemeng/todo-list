export const getNavListByRoutes =  (list) => {
  console.log(list);
  var arr = list.filter( item => {
    if(!item.children) {
      return false
    }else if (item.children[0].meta) {
      if(item.children[0].meta.hideNav) return false
    }
    return true
  })
  return arr
}
