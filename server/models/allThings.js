const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const allThingsSchema = new Schema({
  id: Number,
  title: String,
  text: String,
  done: {
    type: Boolean,
    default: false
  },
  rate: Number,
  flag: {
    type: Boolean,
    default: true
  },
  time: {
    type: Date,
    default: new Date()
  },
  date: Date,
  muser: String,
  guser: String
})
AllThings = mongoose.model('allThings', allThingsSchema);


module.exports = AllThings
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
