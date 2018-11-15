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
  getWorkList: function (user) {
    return new Promise((resolve, reject) => {
      global.acl.userRoles(user._id.toString(), function (err, arr) {
        console.log(arr)
      })
    })
  }
}
