const cheerio = require('cheerio');
const url = require('url');
const axios = require('axios');
const async = require('async');


const headers = {
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Encoding': 'gzip, deflate, br',
  'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
  'Cache-Control': 'no-cache',
  'Upgrade-Insecure-Requests': 1,
  'Connection': 'keep-alive',
  'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:64.0) Gecko/20100101 Firefox/64.0',
  'Cookie': 'BAIDUID=4F5CB600C17AC5F9814FCE5B904D58C4:FG=1; PSTM=1540432833; BIDUPSID=F9BA71B00644377676B08DB59C0B2BD8; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; BD_UPN=12314353; H_PS_PSSID=; delPer=0; BD_CK_SAM=1; PSINO=1; H_PS_645EC=e71ePXljwaQH3JpxJUI%2BZkfiETArNjr5o%2BWB0OqCGwHD8a8y5cqmTX9wXqo; BDSVRTM=110'
}
// 并发连接数的计数器
let concurrencyCount = 0;


var instance = axios.create({
  timeout: 100000,
  headers: headers,
  maxRedirects: 0
});
module.exports = function spider (str, count, parsedUrl) {
  console.log(count)
  return new Promise((resolve, reject) => {
    let cnodeUrl = ''
    ++count
    if(count ==1) {
      cnodeUrl = encodeURI('https://www.baidu.com' + str);
    }else{
      cnodeUrl = 'https://www.baidu.com' + str;
    }
    const arr = []
    const arrTitle = []
    instance.get(cnodeUrl)
      .then(function(res){
        const $ = cheerio.load(res.data);
        $('.c-container>h3>a').each(function () {
          arr.push($(this).attr('href'))
        })
        $('.c-container>h3>a').each(function () {
          arrTitle.push($(this).text())
        })
        console.log(arrTitle)
        parseUrl(arr).then(res => {
          parsedUrl.push(...res);
          if (count < 3) {
            let aHref = $('#page>strong+a').attr('href')
            console.log(aHref)
            spider(aHref, count, parsedUrl).then(res=>{resolve(res)})
          }else {
            count = 0
            resolve(parsedUrl)
            parsedUrl = []
          }
        })
      }).catch(err => {
      reject(err)
    })
  })
}


function parseUrl (arr) {
  return new Promise((resolve, reject) => {
    async.mapLimit(arr, 3, function (item, callback) {
      instance.get(item)
        .then(res => {

        }).catch(err => {
          if(item.indexOf('http') !== -1){
            if(!err.response) callback(null,item)
            callback(null,err.response.headers.location)
          }else{
            callback(null,'http://www.baidu.com/' + item)
          }
        })
    },function (err, results) {
      if(err) reject(err)
      resolve(results)
    })
  })
}

function getAllDate() {

  instance.get(cnodeUrl)
    .then(function(res){
      const $ = cheerio.load(res.data);
      $('.c-container>h3>a').each(function () {
        arr.push($(this).attr('href'))
      })
      $('.c-container>h3>a').each(function () {
        arrTitle.push($(this).text())
      })
      parseUrl(arr).then(res => {
        parsedUrl.push(...res);
        if (count < 3) {
          let aHref = $('#page>strong+a').attr('href')
          spider(aHref).then(res=>{resolve(res)})
        }else {
          count = 0
          resolve(parsedUrl)
          parsedUrl = []
        }
      })
    }).catch(err => {
    reject(err)
  })
}
