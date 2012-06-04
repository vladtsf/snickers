#!/usr/bin/env node

/**
 * Module dependencies.
 */

var
  express = require('express'),
  util = require('util'),
  app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {layout: false});
  app.use(app.router);
  app.set('port', 3000);
  app.set('mongobase', 'mongodb://localhost/default');
  // app.set('mongobase', util.format('mongodb://%s:%s@%s:%d/%s', process.env.DBUSER, process.env.DBPASSWORD, process.env.DBHOST, process.env.DBPORT, process.env.DBBASE));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.use(express.static(__dirname + '/public'));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

var
  api = require('./routes/api/'),
  http = require('./routes/http/');

app.listen(app.settings.port, function(){
  console.log("Listening on port %d in %s mode", app.address().port, app.settings.env);
});
