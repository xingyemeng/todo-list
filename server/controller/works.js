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
      switch (arr[0]) {
        case 'admin':
          Works.find(function (err, list) {
            resolve(list)
          });
          break;
        case 'semuser':
          Works.find({author: user.name})
            .where({fail: false})
            .exec(function (err, list) {
              resolve(list)
            })
          break;
        case 'semadmin':
          Works.find({group: user.group})
            .where({fail: false})
            .exec(function (err, list) {
              resolve(list)
            })
          break;
        case 'tecuser':
          Works.find({flag: true})
            .where({getter: user.name})
            .exec(function (err, list) {
              resolve(list)
            })
          break;
        case 'tecadmin':
          Works.find({flag: true}, function (err, list) {
            resolve(list)
          });
          break;
        default: break;
      }
    })
  },
  /**
   * 获取已驳回的
   * 根据角色能看到自己被驳回的，能看到组的
   * */
  getFailwork: function (user) {
    return new Promise(async  (resolve, reject) => {
      const arr = await global.acl.userRoles(user._id.toString())
      switch (arr[0]) {
        case 'semuser':
          Works.find({author: user.name})
            .where({fail: true})
            .exec(function (err, list) {
              resolve(list)
            })
          break;
        case 'semadmin':
          Works.find({group: user.group})
            .where({fail: true})
            .exec(function (err, list) {
              resolve(list)
            })
          break;
        default: break;
      }
    })
  }
}
