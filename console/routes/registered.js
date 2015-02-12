var express = require('express');
var router = express.Router();
var Registered = require('../models/registered');
var mongoose = require('mongoose');




router.route('/').get(function(req,res){
	Registered.find(function(err,reg){
		res.send(reg);
	});
});

router.route('/:id') 
  .get(function(req, res) {
  	var reg_id = req.params.id;
  	Registered.findOne({email: reg_id}, function(err, reg) {
  		if(err) {
        res.json({err: String(err)});

      } else if(reg === null) {
        res.json({err: " registration does not exist."});

      } else {
        res.json(reg); 
      }

  	});

 });
router.route('/login').post(function(req,res){
	Registered.findOne({'email': req.body.email, 'password':req.body.password}, function(err, user){
		if(err){
			res.status(400);
			res.json({err: String(err)});
		}else if(user === null){
			res.status(403);
			res.send("No such user");
		} else{
			res.status(202);
			res.send({status: 'ACCEPTED'});
		}
	});
});
  router.route('/').post(function(req, res) {
  




	 Registered.findOne({ 'email': req.body.email}, function(err, user){
	 	if(err) {
	 	res.status(400);
        res.json({err: String(err)}); 
      	} else if(user === null) {	


      		 	var newUser = (new Registered({
          	  	firstName: req.body.firstName,
          	 	lastName:  req.body.lastName,
          	 	email:     req.body.email,
          	 	password:  req.body.password
        	  }));
      		newUser.save(function(err){
      			if(err){
      				throw err;
      			}else{
      				res.status(201);
      				res.send({ status: 'SUCCESS'});
      			}
      		});

      	} else{
      		 res.status(409);
      		res.json({err: "This user already exists"});
	

      	}

	 });
  });



  module.exports = router;