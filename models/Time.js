const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

const Time = new Schema({
  hour: [
    {
      startTime: Number,
      endTime: Number
    }
  ],
  day: String
});

const ModelClass = mongoose.model("User", Time);

module.exports = ModelClass;
