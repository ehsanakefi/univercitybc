const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

const Time = new Schema({
  day: {
    type :String,
     hour: [
    {
      startTime: Number,
      endTime: Number
    }
  ]
  }
 
  
});

const ModelClass = mongoose.model("Time", Time);

module.exports = ModelClass;
