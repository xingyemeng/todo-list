const express = require('express')
const spbaidu = require('../../controller/spbaidu/spbaidu')

const router = express.Router();
router.get('/wtlist', function (req,res,next) {
  console.log(req.query.wd)

  spbaidu.spider('百达翡丽维修')
})

module.exports = router

