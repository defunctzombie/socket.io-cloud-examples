var mongoose = require('mongoose');

var registered = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String
});

module.exports = mongoose.model('Registered', registered);