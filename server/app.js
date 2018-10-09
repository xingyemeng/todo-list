const express = require('express');
const mongoose = require('mongoose');
const nodeAcl = require('acl');
const Users = require('./models/users');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const Roles = require('./models/roles');
const Resources = require('./models/resources');

const app = express();
const store = new MemoryStore();
app.use(express.json());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: store
}));
/*app.get('/',function (req,res,next) {
  store.length(function (err, len) {
    console.log(len)
    if(len) {
      store.get(req.sessionID, function (err, session) {
        console.log(session)
      })
    }
  })
  console.log(req.sessionID);
  if(req.session.username == 'ysx') {
    res.send('first come')
  }else {
    req.session.username = 'ysx'
    //res.header('Set-Cookie', {  path: '/admin', secure: true })

    res.send('first welcome')
  }
})*/

mongoose.connect('mongodb://localhost:27017/todolist',{useNewUrlParser: true},function (err) {
  global.acl = new nodeAcl(new nodeAcl.mongodbBackend(mongoose.connection.db), logger());
/*  global.acl.allow([
    {
      roles:['admin'],
      allows:[
        {resources:'/things', permissions:'get'}
      ]
    }
  ])*/
  app.use('/admin', require('./router/login'));
  app.use('/things', require('./router/things'));
  app.listen(8081);
});

function logger() {
  return {
    debug: function( msg ) {
      console.log( '-DEBUG-', msg );
    }
  };
}
