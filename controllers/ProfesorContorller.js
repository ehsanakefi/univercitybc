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
  let id_HeadOfProfesor=req.user._id;

  let profesor = new Profesor({
    name,
    familyName,
    Lesson,
    day,
    id_HeadOfProfesor
  });
  profesor.save().then(
  profesorsave=>{
  res.json({profesorsave});
  }
  ).catch(err=>res.status(422).send('not save profesor'))
  
};

exports.getProfesor=(req,res,next)=>{
Profesor.find({id_HeadOfProfesor:{$eq:req.user._id}})
.exec()
.then(profesorres=>res.send({profesorsreq:profesorres}))
}