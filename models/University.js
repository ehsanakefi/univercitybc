const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

const University = new Schema({
  name: String,
  location: String,
  tableTime: [{
    nameday: String,
    startTime: String,
    endTime: String,
  }]


});

const ModelClass = mongoose.model("University", University);

module.exports = ModelClass;
