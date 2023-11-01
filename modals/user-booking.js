const mongoose = require('mongoose');

const user_booking = mongoose.model('user-booking', new mongoose.Schema({ 
    created_on: String,
    ticket_type: String,
    slots: String,
    count : Number,
    name: String,
    email: String
  }));


exports.user_booking = user_booking ;
