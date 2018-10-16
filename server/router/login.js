const express = require('express');
const Users = require('../models/users');

const router = express.Router();

router.post('/login', function (req, res) {
  let data = req.body;
  Users.findOne({name: data.user}, function (err, user) {
    if (err) console.error(err);
    if(user){
      if(user.password === data.password){
        req.session.role = user._id.toString();
        console.log(user._id.toString())
        global.acl.userRoles('admin', function (err, roles) {
          if(err) console.error(err)
          res.send(roles)
        })
      }else{
        res.send('密码错误')
      }
    }else{
      res.send('用户名或密码错误')
    }
  })
});

module.exports = router
