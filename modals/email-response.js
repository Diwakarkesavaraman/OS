const mongoose = require('mongoose');

const email_response = mongoose.model('email_response', new mongoose.Schema({
   
    email: String,
    
  }));


exports.email_response = email_response ;
