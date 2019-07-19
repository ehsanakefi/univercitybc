const mongoose = require("mongoose");
const jwt = require("jwt-simple");
const request = require("request");
const User = require("../models/HeadOfDepartmentSchema");
const config = require("../config");
const uuidV1 = require("uuid/v1");
const Tell = require("../service/telephone");
const _ = require("lodash");
const chaptcha = require("../service/grecaptcha");

function tok(user) {
  const allan = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: allan }, config.secret);
}

exports.acceptKey = (req, res, next) => {
  console.log(req.body);
  let { code, phone } = req.body;

  if (_.parseInt(code) === 0) {
    return res
      .status(422)
      .send({ error: "send correct 4 digic number please!" });
  }

  phone = Tell.phoneMobile(req.body.phone);

  if (phone === "number is not valid") {
    return res.status(422).send({ error: "your phone number is not ok!" });
  }

  User.findOne({ phone })
    .select("fcmToken authCode phone name familyName level pic")
    .exec()
    .then(userPey => {
      if (userPey) {
        if (req.body.fcmToken !== userPey.fcmToken) {
          userPey.fcmToken = req.body.fcmToken;
          userPey.save().then(userSaved => { });
        }

        if (_.parseInt(code) === _.parseInt(userPey.authCode)) {
          return res.send({ token: tok(userPey), user: userPey });
        } else {
          return res.status(422).send({ error: "your code is not correct" });
        }
      } else {
        return res
          .status(422)
          .send({ error: "can not find user with this number!" });
      }
    })
    .catch(err => res.status(422).send({ error: "we have a issue!", err }));
};

exports.getOwnUser = (req, res, next) => {
  // console.log('req.user az bigiKhodam', req.user);
  if (req.user) {
    return res.send({ user: req.user });
  } else {
    return res.status(422).send({ error: "we have a issue!" });
  }
};

exports.editOwnUser = (req, res, next) => {
  // console.log('req.user az bigiKhodam', req.user);
  if (req.user) {
    req.user.name = req.body.name;
    req.user.familyName = req.body.familyName;
    req.user
      .save()
      .then(userSaved => res.send({ user: userSaved }))
      .catch(err => res.status(422).send({ error: "we have a issue!", err }));
  } else {
    return res.status(422).send({ error: "we have a issue!" });
  }
};

exports.removeUser = (req, res, next) => {
  User.findByIdAndRemove(req.body._id)
    .exec()
    .then(user => res.send({ user: user }))
    .catch(err => res.status(422).send({ error: "we have a issue!" }));
};
exports.addTimeClass = (req, res, next) => {
  let { days } = req.body;
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      dayClassTime: days
    },
    { new: true }
  )
    .exec()
    .then(Timeclasssave => res.json({ Timeclasssave: Timeclasssave }))
    .catch(err => res.status(422).send({ error: "anjam neshod", err }));

};

exports.login = (req, res, next) => {
  user = req.user;
  console.log("user is " + user)
  console.log(req.body)

  // if (req.body.fcmToken) {
  //   user.fcmToken = req.body.fcmToken;

  //   user
  //     .save()
  //     .then(userSaved => res.send({ token: tok(userSaved), userSaved }))
  //     .catch(err => res.status(422).send({ error: "we have a issue!" }));
  // } else {
  return res.send({ token: tok(req.user), user });
  // }
};
exports.addProfesor = (req, res, next) => {
  console.log(req.body)
}
exports.register = (req, res, next) => {
  let { email, password, name, familyName, username } = req.body;

  if (!username || !password || !email) {
    return res
      .status(422)
      .send({ error: "you most have at least email password and email" });
  }

  User.findOne({ username: username })
    .exec()
    .then(findusername => {
      if (findusername) {
        return res.status(422).send({ error: "username has" });
      } else {
        User.findOne({ email: email })
          .exec()
          .then(findemail => {
            if (findemail) {
              return res.status(422).send({ error: "email has" });
            } else {
              let user = new User({
                email,
                name,
                familyName,
                username,
                password
              });

              if (req.body.fcmToken) {
                user.fcmToken = req.body.fcmToken;
              }
              user.save().then(userSave => {
                res.json({ token: tok(userSave), user: userSave });
              });
            }
          })
          .catch(err =>
            res.status(422).send({ error: "not work found email" })
          );
      }
    })
    .catch(err =>
      res.status(422).send({ error: "moshkel dar found username" })
    );
  // User.findOne({ username: username })
  //   .exec()
  //   .then(userFind => {
  //     if (userFind) {
  //       return res.status(422).send({ error: "Email e has" });
  //     } else {
  //       User.findOne({ email: email })
  //         .exec()
  //         .then(userFindWithemail=> {
  //           if (userFindWithemail) {
  //             return res.status(422).send({ error: "email tekrari" });
  //           } else {
  //             let user = new User({
  //               email,
  //               password,
  //               address,
  //               name,
  //               familyName,
  //               phone
  //             });

  //             if (req.body.fcmToken) {
  //               user.fcmToken = req.body.fcmToken;
  //             }
  //             user
  //               .save()
  //               .then(userSaved =>
  //                 res.json({ token: tok(userSaved), user: userSaved })
  //               );
  //           }
  //         });
  //     }
  //   })
  //   .catch(err => res.status(422).send({ error: "anjam neshod", err }));
};

exports.users = (req, res, next) => {
  const idm = mongoose.Types.ObjectId(req.query.id);

  User.find({ _id: { $lt: idm }, level: { $ne: "tarah" } })
    .limit(30)
    .sort({ _id: -1 })
    .exec()
    .then(users => res.json({ users }))
    .catch(err => res.status(422).send({ error: "anjam neshod" }));
};

exports.getUsersWithSearch = function (req, res, next) {
  // console.log('req.body az bigiKarbarhaBaSearch', req.body)
  // const query = '/' + req.body.search + '/';

  if (req.user.level !== "tarah" && req.user.level !== "admin") {
    return res.status(403).send({ error: "you not have enough access right" });
  }

  let query = {};
  req.body.email
    ? Object.assign(query, { email: { $regex: req.body.email } })
    : (query = query);
  req.body.familyName
    ? Object.assign(query, { familyName: { $regex: req.body.familyName } })
    : (query = query);
  req.body.phone
    ? Object.assign(query, { $where: `/${req.body.phone}.*/.test(this.phone)` })
    : (query = query);

  User.find(query)
    .limit(100)
    .exec()
    .then(users => res.json({ users }))
    .catch(err => res.status(422).send({ error: "anjam neshod" }));
};

exports.getUsersWithLevel = function (req, res, next) {
  // console.log('req.query', req.query)

  User.find({ level: req.query.level })
    .exec()
    .then(users => res.json({ users }))
    .catch(err => res.status(422).send({ error: "anjam neshod", err }));
};

exports.editUser = function (req, res, next) {
  User.findOneAndUpdate(
    { _id: req.body._id },
    {
      name: req.body.name,
      familyName: req.body.familyName,
      address: req.body.address,
      level: req.body.level
    },
    { new: true }
  )
    .exec()
    .then(user => res.json({ user }))
    .catch(err => res.status(422).send({ error: "anjam neshod", err }));
};

exports.editUserPass = function (req, res, next) {
  User.findById(req.body._id)
    .exec()
    .then(userFind => {
      if (userFind) {
        userFind.password = req.body.password;
        userFind.save().then(savedUser => res.json({ user: savedUser }));
      } else {
        return res.status(422).send({ error: "can' find any user" });
      }
    })
    .catch(err => res.status(422).send({ error: "we have an truble" }));
};

exports.UsersCount = async (req, res) => {
  const count = await User.find().countDocuments();
  return res.send({ UsersCount: count });
};

exports.addUser = function (req, res, next) {
  // console.log('req.body addUser Authentication', req.body)

  let {
    name,
    familyName,
    email,
    address,
    password,
    level,
    phone,
    phoneValidate
  } = req.body;

  User.findOne({ email: email })
    .exec()
    .then(userFind => {
      if (userFind) {
        return res
          .status(409)
          .send({ error: "this email has token by another" });
      } else {
        User.findOne({ phone: phone })
          .exec()
          .then(userFindByPhone => {
            if (userFindByPhone) {
              return res
                .status(409)
                .send({ error: "this phone number exist in database" });
            } else {
              let user = new User({
                name,
                familyName,
                email,
                expertise,
                address,
                password,
                doctor,
                level,
                phone,
                phoneValidate
              });
              user.save().then(userSaved => res.json({ user: userSaved }));
            }
          });
      }
    })
    .catch(err => res.status(422).send({ error: "anjam neshod", err }));
};
