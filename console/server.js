var express = require("express"),
	app = express(),
	mongoose = require("mongoose"),
	dbConfig = require("./config/db"),
	bodyParser = require("body-parser"),
	path = require("path");





mongoose.connect(dbConfig.url);




var routes = {
  registered: require('./routes/registered')
};


app.use(bodyParser.json());



app.use("/registered", routes.registered);

app.use(express.static(path.join(__dirname, 'views')));






app.get("/", function(req, res){	
	res.render('index.html');
});

var server = app.listen(8081, function(){
	console.log("Listening on port %d", server.address().port);
});