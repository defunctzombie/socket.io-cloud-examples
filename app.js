// Setup basic express server
var express = require('express');
var bodyParser = require('body-parser');
var debug = require('debug')('chat');
var request= require ('request');

var CLOUD_URL = process.env.CLOUD_URL;
var SOCKET_URL = process.env.SOCKET_URL;

var app = express();

app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

// Routing -> serve static files from public folder
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded());

app.get('/', function(req, res, next) {
  res.locals.app_name = process.env.APP_NAME;
  res.locals.CLOUD_URL = CLOUD_URL;
  res.locals.CONFIG = JSON.stringify({
    SOCKET_URL: SOCKET_URL,
    CLOUD_URL: CLOUD_URL
  });

  res.render('index', { layout: false });
});

app.post('/update', function(req, res, next) {

  var body = req.body;
  var id = '/messages';
  var type = 'new message';
  debug('The body was %j', body);

  var opt = {
    uri: CLOUD_URL + '/api/apps/app1/events',
    method: 'POST',
    headers: {
      'authorization': process.env.API_KEY
    },
    timeout: 5000,
    json: {
      'namespace': id,
      'type': type,
      'payload': body.message
    }
  };

  request(opt, function(err, api_res, api_body) {
    if (err) {
      return next(err);
    }

    if (api_res.statusCode !== 200) {
      var error = new Error('Unable to post update');
      return next(error);
    }

    debug(api_body);
    res.sendStatus(200);
  });
});

module.exports = app;
