const Users = require('../models/users');
module.exports = {
  getUserInfo: function (id) {
    return new Promise((resolve, reject) => {
      Users.findById({_id: id}, function (err, user) {
        if (err) reject(err)
        resolve(user)
      })
    })
  }
}
