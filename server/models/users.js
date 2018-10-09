const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const usersSchema = new Schema({
  name: String,
  account: String,
  password: String,
  createdAt: {
    type: Date,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    default: new Date()
  }
});
module.exports = Users = mongoose.model('user', usersSchema);

/*var arr = [
  {
    name: 'admin',
    account: 'admin',
    password: 'admin'
  },
  {
    name: 'user',
    account: 'user',
    password: 'user'
  },
  {
    name: 'gust',
    account: 'gust',
    password: 'gust'
  }
]
Users.create(arr ,function (err ,list) {
  console.log(list)
})*/





