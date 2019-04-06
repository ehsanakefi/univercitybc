const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

const Lesson = new Schema({
  name: String,
  id_profesor: String
});

const ModelClass = mongoose.model("Lesson", Lesson);

module.exports = ModelClass;
