const express = require('express')
const spbaidu = require('../../controller/spbaidu/spbaidu')

const router = express.Router();
router.get('/wtlist', function (req,res,next) {
  console.log(req.query.wd)
  let wd = '百达翡丽维修'
  let pn = 0
  const str = '/s?wd=' + wd + '&pn=' + pn + '&usm=1'
  spbaidu.spider(str).then(resolve => {
      res.send(resolve)
      console.log(123)
    }).catch(err=>{
      console.log(err)
    })
})

module.exports = router

