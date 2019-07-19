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
    id_HeadOfProfesor: String,
    Lesson: [String],
    days: [{
      nameDay: String,
      startTime: String,
      endTime: String
    }],
    sexType: {
      type: String,
      enum: [
        "Female",
        "Man"
      ],
      default: "Man"
    },
    degreeEducation: {
      type: String,
      enum: [
        "MasterDegree",
        "Doctor",
        "Others"
      ],
      default: "Doctor"
    },
    membershipType: {
      type: String,
      enum: [
        "Invited",
        "AcademicStaff"
      ],
      default: "AcademicStaff"
    },
    pic: String,
    picRef: { type: Schema.Types.ObjectId, ref: "File" }
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

const ModelClass = mongoose.model("Profesor", Profesor);

module.exports = ModelClass;
