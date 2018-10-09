const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let resourcesSchema = new Schema({
  name: String,
  createdAt: {
    type: Date,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    default: new Date()
  }
})

module.exports = Resource =  mongoose.model('resource', resourcesSchema);
/*
const arr = [
  {name: '首页'},
  {name: '待完成'},
  {name: '已完成'},
  {name: '已删除'}
]
Resource.create(arr,function (err,list) {
  console.log(list)
})
*/
