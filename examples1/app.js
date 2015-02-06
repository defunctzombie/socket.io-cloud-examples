// Setup basic express server
var express = require('express');
var bodyParser = require('body-parser');
var debug = require('debug')('chat');
var request= require ('request');

var CLOUD_URL = process.env.CLOUD_URL;

var app = express();

app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

// Routing -> serve static files from public folder
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded());

app.get('/', function(req, res, next) {
  res.locals.app_name = process.env.APP_NAME;
  res.locals.CONFIG = JSON.stringify({
    CLOUD_URL: process.env.CLOUD_URL
  });

  res.render('index', { layout: false });
});

app.post('/update', function(req,res) {

  var body = req.body;
  var id = '/messages';
  var type = 'new message';
  debug('The request was' + req);
  debug('The body was' + body);

  var opt = {
    uri: CLOUD_URL + '/update',
    method : 'POST',
    timeout : 5000,
    json : {
      'id': id,
      'app': 'app1',
      'type': type,
      'payload': body.message
    }
  };

  request(opt, function(err, api_res, api_body) {
    debug(body);
    res.json({ });
  });
});

module.exports = app;
