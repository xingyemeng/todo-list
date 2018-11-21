/*
** 这种写法导致在路由中导致global.acl不存在
const login = require('./login')
const works = require('./works')
const spbadu = require('./spbaidu/spbaidu')*/

module.exports = app => {
  app.use('/admin', require('./login'));
  app.use('/work', require('./works'));
  app.use('/waitui', require('./spbaidu/spbaidu'));
}
