const mongoose = require("mongoose");
const jwt = require("jwt-simple");

const config = require("../config");
const Tell = require("../service/telephone");
const _ = require("lodash");
const chaptcha = require("../service/grecaptcha");
const Profesor = require("../models/Profesors");
const Lesson = require("../models/Lesson");

exports.addProfesor = (req, res, next) => {
  let { LessonSelected, daySelect, name, familyName, membershipType, sexType, degreeEducation } = req.body;
  let id_HeadOfProfesor = req.user._id;
  console.log(req.body)
  let profesor = new Profesor({
    name,
    familyName,
    Lesson: LessonSelected,
    days: daySelect,
    degreeEducation,
    membershipType,
    sexType,
    id_HeadOfProfesor
  });
  profesor.save().then(
    profesorsave => {
      res.json({ profesorsave });
    }
  ).catch(err => res.status(422).send('not save profesor'))

};

exports.getProfesor = (req, res, next) => {
  Profesor.find({ id_HeadOfProfesor: { $eq: req.user._id } })
    .exec()
    .then(profesorres => res.send({ profesorsreq: profesorres }))
}