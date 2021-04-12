const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;

const marker = new Schema({
    location : { 
        type: Array,
        required: true 
    },
    markertype:{
        type: String,
        required: true 
    },
    markername:{
		type: String,
		requried: true
    }
});

module.exports = mongoose.model('Marker', marker);
