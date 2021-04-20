const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;

const artinfo = new Schema({
  prfnm: {
    // 이름
    type: String,
    required: true
  },
  prfpdfrom: {
    type: String,
    required: true
  },
  prfpdto: {
    type: Number,
    requried: true,
    default: 0
  },
  fcltynm: {
    type: String,
    requried: true
  },
  poster: {
    type: String,
    requried: true
  }
});


module.exports = mongoose.model('Artinfo', artinfo);
