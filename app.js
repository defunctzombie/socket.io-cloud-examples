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
  debug('finish ee emit');
  console.log('The request was' + req);
  console.log('The body was' + body);
//  javascript:post('http://localhost:3000/update', body); 
  request ({
   uri : "http://localhost:3000/update",
   method : "POST",
   followRedirect : true,
   timeout : 5000, 
  // body : body,
   json : {
            "id": id,
	    "type": type,
	    "message": body.message
	  }
   }, function (error, response, body2) {
   console.log(body2);
   });

  res.json({
  });

  
});


module.exports = app;
