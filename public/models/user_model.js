const { model } = require("mongoose");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create user schema for mongodb
const userSchema = new Schema({
    name:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password:{
        type: String,
        require: true,
    }
  })

  const newUser = mongoose.model('user', userSchema);
  module.exports = newUser;