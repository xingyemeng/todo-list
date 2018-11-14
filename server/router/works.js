const express = require('express')
const Works = require('../models/works')

let router = express.Router();

function getUserId(req, res){
  return req.session.userid
}
router.all('*', global.acl.middleware( 1, getUserId ),function (req,res,next) {
  next()
})

router.get('/view', function(req, res) {
  Works.find({flag: true}, function(err, works){
    if (err) console.error(err);
    res.send(works);
  })
});
module.exports = router;
