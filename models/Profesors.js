const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

const Profesor = new Schema(
  {
    
    name: String,
    familyName: String,
    level: {
      type: String,
      enum: [
        "normal",
        "expert",
        "owner",
        "editor",
        "auther",
        "tarah",
        "admin",
        "storekeeper",
        "delivery"
      ],
      default: "normal"
    },
    id_HeadOfProfesor:String,
    Lesson:[String],
    day:[ {
      nameday:String,
      startTime:String,
      endTime:String
    }],
    pic: String,
    picRef: { type: Schema.Types.ObjectId, ref: "File" }
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

const ModelClass = mongoose.model("Profesor", Profesor);

module.exports = ModelClass;
