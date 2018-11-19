const express = require('express')
const WorksController = require('../controller/works')
const UsersController = require('../controller/user')
let router = express.Router();

/*function getUserId(req, res){
  return req.session.userid
}
router.all('*', global.acl.middleware( 1, getUserId ),function (req,res,next) {
  next()
})*/

router.get('/view', function(req, res) {
  Works.find({flag: true}, function(err, works){
    if (err) console.error(err);
    res.send(works);
  })
});
router.post('/postwork', function (req, res) {
  const workData = req.body
  WorksController.createOne(workData).then(result => {
    res.send(result.title)
  }).catch(err => {
    console.error(err)
    res.send('提交工单出错：' + err)
  })
})
router.get('/worklist', function (req, res) {
  const userId = req.session.userid
  UsersController.getUserInfo(userId)
    .then(result => {
      WorksController.getWorkList(result)
        .then(function (result) {
          res.send(result)
        })
    }).catch(err => {
      console.error(err)
  })
})
router.post('/verifywork/:flag', function (req, res) {
  const flag = req.params.flag
  const id = req.body._id
  if (flag === 'success') {
    Works.findOneAndUpdate({_id: id}, {flag: true}, function (err, item) {
      if (err) console.error(err)
      res.send(item.title)
    })
  }
  if (flag === 'fail') {
    Works.where({_id: id}).update({fail: true, $push: {comments: {comment: req.body.comments.comment, data: Date(req.body.comments.data)}}}, function (err, item) {
      if (err) console.error(err)
      res.send(item.title)
    })
  }
}),
router.get('/failwork', function (req, res) {
  const userId = req.session.userid
  UsersController.getUserInfo(userId)
    .then(result => {
      WorksController.getFailwork(result)
        .then(function (result) {
          res.send(result)
        })
    }).catch(err => {
    console.error(err)
  })
})
module.exports = router;
