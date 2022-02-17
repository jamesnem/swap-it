const mongoose = require('mongoose');

//Create item schema for mongodb
const itemSchema = mongoose.Schema({
    title:{
        type: String,
        require: true,
    },
    info:{
        type: String,
        required: true,
        lowercase: true,
        unique: true
  
    }
  })

module.exports = mongoose.model('item', itemSchema);