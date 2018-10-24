const express = require('express')
const spbaidu = require('../../controller/spbaidu/spbaidu')

const router = express.Router();
router.get('/wtlist', function (req,res,next) {
  console.log(req.query.wd)
  const cnodeUrl = encodeURI('https://www.baidu.com/s?wd=百达翡丽维修');
  spbaidu.spider(cnodeUrl)
})

module.exports = router

