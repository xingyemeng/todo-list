const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const usersSchema = new Schema({
  name: String,
  password: String,
  group: String,
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
    password: 'admin',
    group: 'admin'
  },
  {
    name: '张三',
    password: 'admin',
    group: 'semgroup1'
  },
  {
    name: '李四',
    password: 'admin',
    group: 'semgroup1'
  },
  {
    name: '王五',
    password: 'admin',
    group: 'semgroup2'
  },
  {
    name: '王五1',
    password: 'admin',
    group: 'semgroup2'
  },
  {
    name: '孙六',
    password: 'admin',
    group: 'semgroup3'
  },
  {
    name: '孙六1',
    password: 'admin',
    group: 'semgroup3'
  },
  {
    name: '杨少鑫',
    password: 'admin',
    group: 'tec1'
  },
  {
    name: '杨',
    password: 'admin',
    group: 'tec1'
  },
  {
    name: '宫少',
    password: 'admin',
    group: 'tec2'
  },
  {
    name: '宫',
    password: 'admin',
    group: 'tec2'
  }
]
Users.create(arr ,function (err ,list) {
  console.log(list)
})*/





