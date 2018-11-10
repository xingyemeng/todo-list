const express = require('express');
const mongoose = require('mongoose');
const nodeAcl = require('acl');
const Users = require('./models/users');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const Roles = require('./models/roles');
const Resources = require('./models/resources');
const acl_conf = require('./conf/aclconf');
const history = require('connect-history-api-fallback');
const path = require('path')

const app = express();
const store = new MemoryStore();

app.use(history({
  index: '/login'
}));
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
      /!*store.get(req.sessionID, function (err, session) {
        console.log(session)
      })*!/
      console.log(req.session)
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
  global.acl.allow(acl_conf)
  /*global.acl.addRoleParents('semadmin','semuser', function (err) {
    if(err) console.error(err)
  })
  global.acl.addRoleParents('tecadmin','tecuser', function (err) {
    if(err) console.error(err)
  })
  global.acl.addRoleParents('admin',['semadmin', 'tecadmin'], function (err) {
    if(err) console.error(err)
  })*/
/*  Users.findOne({name: 'gust'}, function (err, user) {
    if (err) console.error(err)
    global.acl.addUserRoles(user._id.toString(),'admin', function (err) {
      if(err) console.error(err)
    })
  })*/
  app.get( '/allow/:user/:role', function( request, response, next ) {
    Users.findOne({name: request.params.user}, function (err ,user) {
      if (err) console.error(err)
      acl.addUserRoles( user._id.toString(), request.params.role );
      response.send( request.params.user + ' is a ' + request.params.role );
    })
  });
  app.get( '/disallow/:user/:role', function( request, response, next ) {
    Users.findOne({name: request.params.user}, function (err ,user) {
      if (err) console.error(err)
      acl.removeUserRoles( user._id.toString(), request.params.role );
      response.send( request.params.user + ' is a ' + request.params.role );
    })
  });
  app.use('/admin', require('./router/login'));
  app.use('/things', require('./router/things'));
  app.use('/waitui', require('./router/spbaidu/spbaidu'));
  app.listen(8081);
});

function logger() {
  return {
    debug: function( msg ) {
      console.log( '-DEBUG-', msg );
    }
  };
}
