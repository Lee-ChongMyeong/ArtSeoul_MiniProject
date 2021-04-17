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
    boardcount:{
		type: Number,
		requried: true,
        default:0
    },
    markername:{
		type: String,
		requried: true
    },
    address:{
		type: String,
		requried: true
    }
});

module.exports = mongoose.model('Marker', marker);
