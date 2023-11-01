const mongoose = require('mongoose');

const slot_booking = mongoose.model('slot-booking', new mongoose.Schema({ 
    created_on: String,
    ticket_type: String,
    slots: {
        type: [],
        default: undefined
    },
    count : {
        type: [],
        default: undefined
    }
  }));


exports.slot_booking = slot_booking ;
