// Setup basic express server
var express = require('express');
var bodyParser = require('body-parser');
var debug = require('debug')('chat');
var request= require ("request");
var app = express();

// Routing -> serve static files from public folder
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded());

app.post('/update', function(req,res) {
  var body = req.body;
  var id = 'ns1';
  var type = 'new message';  
  debug('The request was' + req);
  debug('The body was' + body);

  request ({ uri : "http://iocloud.localtunnel.me/update",
             method : "POST",
             followRedirect : true,
             timeout : 5000, 
             json : { "id": id,
	                  "type": type,
	                  "payload": body.message }
           }, function (error, response, body2) {
                  debug(body2);
           });

  res.json({ });
});


module.exports = app;
