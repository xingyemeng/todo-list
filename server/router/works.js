const express = require('express')
const WorksController = require('../controller/works')
const UsersController = require('../controller/user')
let router = express.Router();

function getUserId(req, res){
  return req.session.userid
}

router.get('/view', function(req, res) {
  Works.find({flag: true}, function(err, works){
    if (err) console.error(err);
    res.send(works);
  })
});
router.post('/postwork', global.acl.middleware( 2, getUserId ), function (req, res) {
  const workData = req.body
  WorksController.createOne(workData).then(result => {
    res.send(result.title)
  }).catch(err => {
    console.error(err)
    res.send('提交工单出错：' + err)
  })
})
router.get('/worklist/:pNum/:pCount', function (req, res) {
  const userId = req.session.userid
  const pNum = req.params.pNum
  const pCount = req.params.pCount
  UsersController.getUserInfo(userId)
    .then(result => {
      WorksController.getWorkList(result, pNum, pCount)
        .then(function (result) {
          res.send(result)
        })
    }).catch(err => {
      console.error(err)
  })
})
router.get('/workcount', function (req, res) {
  const userId = req.session.userid
  UsersController.getUserInfo(userId)
    .then(result => {
      WorksController.getWorkCount(result)
        .then(function (result) {
          res.send({count: result})
        })
    }).catch(err => {
    console.error(err)
  })
})
router.post('/verifywork/:flag', global.acl.middleware( 2, getUserId ), function (req, res) {
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
