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
    }
});


module.exports = mongoose.model('Marker', marker);
