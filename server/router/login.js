const express = require('express');
const Users = require('../models/users');

const router = express.Router();

router.post('/login', function (req, res) {
  let data = req.body;
  console.log(data)
  Users.findOne({name: data.userName}, function (err, user) {
    console.log(user)
    if (err) console.error(err);
    if(user){
      if(user.password === data.password){
        req.session.userid = user._id.toString();
        global.acl.userRoles(user._id.toString(), function (err, roles) {
          if(err) console.error(err)
          res.send({
            code: 200,
            token: req.session.userid,
            data: '登录成功',
            access: roles
          })
        })
      }else{
        res.send({
          code: 400,
          data: '密码错误'
        })
      }
    }else{
      res.send({
        code: 400,
        data: '用户名或密码错误'
      })
    }
  })
});

module.exports = router
