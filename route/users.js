const express = require('express');
const router = module.exports = express.Router();
const bcrypt = require('bcrypt');
const models = require('../models/sequelize');

router.post('/users/registration', function (req, res, next) {
  hash(req, res, next);
});

function hash(req, res, next) {
  let passwordFromUser = req.body.userpass;
  let salt = bcrypt.genSaltSync(10);
  let passwordToSave = bcrypt.hashSync(passwordFromUser, salt);
  req.body.userpass = passwordToSave;
  addUser(req, res, next);
}

function addUser(req, res, next) {
  models.Users.findAll({
    where: { name: `${req.body.username}` },
  })
    .then((users) => {
      if (!users[0]) {
        models.Users.create({
          password: req.body.userpass,
          name: req.body.username,
          email: req.body.useremail,
        })
          .then(() => { res.json({ message: 'Successful registration!' }) })
          .catch((error) => {
            next(error);
          })
      } else {
        res.json({ message: 'This user already exists' });
      }
    })
    .catch((error) => {
      next(error);
    })
}