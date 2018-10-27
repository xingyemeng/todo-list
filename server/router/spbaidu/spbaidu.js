const express = require('express')
const spider = require('../../controller/spbaidu/spbaidu')
const async = require('async');

const router = express.Router();
router.post('/wtlist', function (req,res,next) {
  const originArr = req.body
  async.mapLimit(originArr, 3, function (item, callback) {
    const str = '/s?wd=' + item.title + '&pn=0&usm=1'
    const parsedUrl = []
    spider(str, 0, parsedUrl).then(resolve => {
      callback(null, resolve.indexOf(item.url))
    }).catch(err=>{
      console.log(err)
    })
  }, function (err, results) {
    console.log(results)
    res.send(results)
  })

/*
  const arrTitle = obj.title
  const arrUrl = obj.url
  arrTitle.forEach(item => {
    const str = '/s?wd=' + item + '&pn=0&usm=1'
    spider(str, 0).then(resolve => {
      const sortArr = arrUrl.map(function (item) {
        return resolve.indexOf(item)
      })
      console.log(sortArr)
      res.send(resolve)
      console.log(123)
    }).catch(err=>{
      console.log(err)
    })
  })*/
})

module.exports = router

