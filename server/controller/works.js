const Works = require('../models/works')

const workCount = async function (role, user) {
  switch (role) {
    case 'admin':
      return await Works.count();
      break;
    case 'semuser':
      return await Works.count({author: user.name})
      break;
    case 'semadmin':
      return await Works.where({fail: false}).count({group: user.group});
      break;
    case 'tecuser':
      return await Works.where({flag: true}).count({getter: user.name});
      break;
    case 'tecadmin':
      return await Works.count({flag: true});
      break;
    default: break;
  }
}
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
  getWorkList: function (user, pageNum, pageCount) {
    return new Promise(async (resolve, reject) => {
      const arr = await global.acl.userRoles(user._id.toString())
      let count = await workCount(arr[0], user)
      let pNum = pageNum || 1
      let pCount = pageCount || 10
      let skip = (pNum - 1) * pCount
      let qNum = Math.min((count - skip), pCount)

      switch (arr[0]) {
        case 'admin':
          Works.find()
            .skip(skip)
            .limit(qNum)
            .exec(function (err, list) {
              resolve(list)
            });
          break;
        case 'semuser':
          Works.find({author: user.name})
            .skip(skip)
            .limit(qNum)
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
  },
  getWorkCount: function (user) {
    return new Promise(async (resolve, reject) => {
      const arr = await global.acl.userRoles(user._id.toString())
      const count = await workCount(arr[0], user)
      if (count) {
        resolve(count)
      }else {
        reject(0)
      }
    })
  }
}
