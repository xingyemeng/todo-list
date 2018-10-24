const cheerio = require('cheerio');
const url = require('url');
const axios = require('axios');
const async = require('async');


const headers = {
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Encoding': 'gzip, deflate, compress',
  'Accept-Language': 'en-us;q=0.5,en;q=0.3',
  'Cache-Control': 'max-age=0',
  'Connection': 'keep-alive',
  'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:22.0) Gecko/20100101 Firefox/22.0'
}
// 并发连接数的计数器
let concurrencyCount = 0;


var instance = axios.create({
  baseURL: 'https://cnodejs.org/',
  timeout: 10000,
  headers: headers,
  maxRedirects: 0
});

module.exports = {
  spider (cnodeUrl) {
    const arr = []
    let count = 1;
    let pages = [0,10,20];
    const that = this
    instance.get(cnodeUrl)
      .then(function(res){
        const $ = cheerio.load(res.data);
        $('.c-container>h3>a').each(function () {
          arr.push($(this).attr('href'))
        })
        console.log(arr)
        that.parseUrl(arr)
      }).catch(err => {
      console.error(err)
    })
  },
   async parseUrl (arr) {
    /*const parsedUrl = []
    arr.forEach(function (item) {
      instance.get(item)
        .then(res => {

        }).catch(err => {
        parsedUrl.push(err.response.headers.location)
      })
    })
    return parsedUrl*/
    let parsedUrl = []
    await async.mapLimit(arr, 3, function (item, callback) {
      instance.get(item)
        .then(res => {

        }).catch(err => {
          callback(null,err.response.headers.location)
        })
    },function (err, results) {
      parsedUrl = results
    })
    console.log(parsedUrl)
  }
}
