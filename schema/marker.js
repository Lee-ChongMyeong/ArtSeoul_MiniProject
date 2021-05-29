const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;

// 고정 스키마
const marker = new Schema({
  location: {
    type: Array,
    required: true
  },
  markertype: {
    type: String,
    required: true
  },
  boardcount: {
    type: Number,
    requried: true,
    default: 0
  },
  markername: {
    type: String,
    requried: true
  },
  address: {
    type: String,
    requried: true
  }
});

// marker.virtual('markerId').get(function () {	
// 	return this._id.toHexString();
// });

// marker.set('toJSON', {
// 	virtuals: true
// });

module.exports = mongoose.model('Marker', marker);
