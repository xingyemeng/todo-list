const mongoose = require('mongoose');
let Schema = mongoose.Schema;
/*
* done: 工单是否完成
* flag: 审核
* time: 提交时间
* data: 期待完成时间
* group: 工单所属组
* author: 提交人
* getter: 对应的技术
* fail: 是否被驳回
* comment： 驳回理由
*
* */
const worksSchema = new Schema({
  title: String,
  content: String,
  done: {
    type: Boolean,
    default: false
  },
  rate: Number,
  flag: {
    type: Boolean,
    default: false
  },
  time: {
    type: Date,
    default: new Date()
  },
  date: {
    type: Date,
    default: new Date()
  },
  group: {
    type: String,
    default: 'admin'
  },
  author: String,
  getter: String,
  comments: [{}],
  fail: {
    type: Boolean,
    default: false
  }
})
Works = mongoose.model('works', worksSchema);

module.exports = Works
/*const arr = [
  {
    "id" : 0,
    "title" : "百达翡丽手表",
    "text" : "百达翡丽手表维修流程",
    "done" : true,
    "rate" : 3,
  },
  {
    "id" : 1,
    "title" : "万国手表",
    "text" : "万国手表维修流程",
    "done" : true,
    "rate" : 4,
  },
  {
    "id" : 2,
    "title" : "劳力士手表",
    "text" : "劳力士手表维修流程",
    "done" : false,
    "rate" : 2,
  },
  {
    "id" : 3,
    "title" : "浪琴手表",
    "text" : "浪琴手表维修流程",
    "done" : false,
    "rate" : 5,
  }
]
AllThings.create(arr);*/
