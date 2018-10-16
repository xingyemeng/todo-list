const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let rolesSchema = new Schema({
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

module.exports = Roles = mongoose.model('role', rolesSchema);

/*const arr = [
  {name: 'admin'},
  {name: 'semadmin'},
  {name: 'semuser'},
  {name: 'tecadmin'},
  {name: 'tecuser'}
]

Roles.create(arr, function (err, list) {
  console.log(list)
})*/
