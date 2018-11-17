const Works = require('../models/works')

module.exports = {
  createOne: function (obj) {
    return new Promise((resolve, reject) => {
      Works.create(obj, function (err, item) {
        if (err) reject(err)
        resolve(item)
      })
    })
  },
  /**
   * 此处先设置每个用户只有一个角色arr[0]
   * */
  getWorkList: function (user) {
    return new Promise(async (resolve, reject) => {
      const arr = await global.acl.userRoles(user._id.toString())
      console.log(arr)
      console.log(user.group)
      console.log(user.name)
      switch (arr[0]) {
        case 'admin':
          Works.find(function (err, list) {
            resolve(list)
          });
          break;
        case 'semuser':
          Works.find({author: user.name}, function (err, list) {
            console.log(list)
            resolve(list)
          })
          break;
        case 'semadmin':
          Works.find({group: user.group}, function (err, list) {
            resolve(list)
          })
          break;
        case 'tecuser':
          Works.find({getter: user.name}, function (err, list) {
            resolve(list)
          })
          break;
        case 'tecadmin':
          Works.find(function (err, list) {
            resolve(list)
          });
          break;
      }
    })
  }
}
