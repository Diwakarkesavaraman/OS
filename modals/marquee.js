const mongoose = require('mongoose');

const marquee_response = mongoose.model('marquee_response', new mongoose.Schema({
    marquee_text: String,
  }));

exports.marquee_response = marquee_response ;