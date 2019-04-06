const mongoose = require("mongoose");
const jwt = require("jwt-simple");

const config = require("../config");
const Tell = require("../service/telephone");
const _ = require("lodash");
const chaptcha = require("../service/grecaptcha");
const Profesor = require("../models/Profesors");
const Lesson = require("../models/Lesson");
const Time = require("../models/Time");

exports.addProfesor = (req, res, next) => {
  let { name, familyName, Lesson, day } = req.body;
  console.log("Time is" + day[0].startTime);
  console.log("Lesson is" + req.user);
  let profesor = new Profesor({
    name,
    familyName,
    Lesson,
    day
  });
  profesor.save().then(
  profesorsave=>{console.log(profesorsave)
  res.json({profesorsave});
  }
  ).catch(err=>res.status(422).send('not save profesor'))
  
};
