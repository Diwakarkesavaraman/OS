const mongoose = require('mongoose');

const Image_upload = mongoose.model('Image-upload', new mongoose.Schema({ 
    heading: String,
    description: String,
    img_url: String,
    publish_date: Date
  }));


exports.Image_upload = Image_upload ;
