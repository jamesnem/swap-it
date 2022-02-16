const { model } = require("mongoose");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create interest schema for mongodb
const interestSchema = new Schema({
    email:{
        type: String,
        required: true,
    },
    preference:{
        type: String,
        require: true,
    }
  })

  const userInterest = mongoose.model('interest', interestSchema);
  module.exports = userInterest;