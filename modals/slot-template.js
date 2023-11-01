const mongoose = require('mongoose');

const slot_template = mongoose.model('slot-template', new mongoose.Schema({ 
    name: String,
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


exports.slot_template = slot_template ;
