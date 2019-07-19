const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

const HeadOfDepartmentSchema = new Schema(
  {
    email: { type: String, unique: true, lowercase: true },
    name: String,
    familyName: String,
    username: { type: String, unique: true, require },
    password: { type: String, required: true, select: false },
    lessonsOfgroup: [],
    id_Uninversity: String,
    dayClassTime: [{
      nameday: String,
      startTime: String,
      endTime: String,
      lesson: [{
        nameLesson: String,
        nameProfesor: String
      }]
    }],
    numberOfClass: [{
      nameday: String,
      startTime: String,
      endTime: String,
      nubmberClass: Number
    }],
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
    pic: String,
    fcmToken: String,
    picRef: { type: Schema.Types.ObjectId, ref: "File" }
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);
HeadOfDepartmentSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});
// HeadOfDepartmentSchema.pre("save", function(next) {
//   const user = this;

//   if (!user.isModified("password")) return next();

//   bcrypt.genSalt(10, function(err, salt) {
//     if (err) {
//       return next(err);
//     }

//     bcrypt.hash(user.password, salt, null, (err, hash) => {
//       if (err) {
//         return next(err);
//       }

//       user.password = hash;
//       next();
//     });
//   });
// });

HeadOfDepartmentSchema.methods.comparePass = function (

  condidatePassword,
  callback
) {
  bcrypt.compare(condidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }

    callback(null, isMatch);
  });
};

const ModelClass = mongoose.model("User", HeadOfDepartmentSchema);

module.exports = ModelClass;
