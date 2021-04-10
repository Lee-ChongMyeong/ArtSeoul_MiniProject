const mongoose = require('mongoose');
const { Schema } = mongoose;

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
		type: int,
		requried: true,
        default:0
    }
});


module.exports = mongoose.model('Marker', user);
