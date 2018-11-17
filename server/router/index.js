const login = require('./login')
const works = require('./works')
const spbadu = require('./spbaidu/spbaidu')

module.exports = app => {
  app.use('/admin', login);
  app.use('/work', works);
  app.use('/waitui', spbadu);
}
