const express = require('express');
const Users = require('../models/users');

const router = express.Router();

router.post('/login', function (req, res) {
  let data = req.body;
  Users.findOne({name: data.userName}, function (err, user) {
    if (err) console.error(err);
    if(user){
      if(user.password === data.password){
        req.session.userid = user._id.toString();
        if(err) console.error(err)
        res.send({
          code: 200,
          token: req.session.userid,
          data: '登录成功'
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
router.post('/getUserInfo', function (req, res) {
  let data = req.body;
  Users.findById({_id: data.userId}, function (err, user) {
    if(err) console.error(err)
    global.acl.userRoles(user._id.toString(), function (err, roles) {
      if(err) console.error(err)
      res.send({
        userName: user.name,
        access: roles
      })
    })

  })
})

module.exports = router
