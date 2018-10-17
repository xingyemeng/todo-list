const express = require('express');
const AllThings = require('../models/works');

const router = express.Router();

/*function getUserId(req, res){
  return req.session.role
}
router.all('*', global.acl.middleware( 1, getUserId ),function (req,res,next) {
  next()
})*/

router.get('/getAllThings', function(req, res) {

  AllThings.find({flag: true}, function(err, allThings){
    if (err) console.error(err);
    res.send(allThings);
  })
});
router.get('/getDeleteThings', function(req, res) {
  AllThings.find({flag: false}, function(err, deleteThings){
    if (err) console.error(err);
    res.send(deleteThings);
  })
});
router.post('/changeThings', function(req, res) {
  AllThings.findOneAndUpdate({id: req.body.id}, {done: true}, function(err, changeThing){
    if (err) console.error(err);
    res.send(changeThing);
  })
});
router.post('/deleteThing', function(req, res) {
  AllThings.findOneAndUpdate({id: req.body.id}, {flag: false}, function(err, deleteThing){
    if (err) console.error(err);
    res.send(deleteThing);
  })
});
router.post('/restoreThing', function(req, res) {
  AllThings.findOneAndUpdate({id: req.body.id}, {flag: true, done: false}, function(err, restoreThing){
    if (err) console.error(err);
    //findOneAndUpdate是先查找后更新，所以下面返回的是修改前的数据
    res.send(restoreThing);
  })
});
router.post('/createThing', function(req, res) {
  let newThing = new AllThings(req.body);
  newThing.save((err, newThing) => {
    if (err) console.error(err);
    res.send(newThing);
  })
});

module.exports = router;
