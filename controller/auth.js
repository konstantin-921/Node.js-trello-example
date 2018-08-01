const jwt = require('jsonwebtoken');
const strategy = require('../services/strategy');
const bcrypt = require('bcrypt');
const models = require('../models/sequelize');
const config = require('../config/config');

function login(req, res, next) {
  models.Users.findOne({
    where: {
      name: req.query.username,
    },
  })
    .then((users) => {
      const user = users;
      const hash = bcrypt.compareSync(req.query.userpass, user.password);
      if (hash && user.name === req.query.username) {
        const payload = { user: user.id };
        const token = jwt.sign(payload, config.secretOrKey, { expiresIn: '7d' });
        res.json({ message: "ok", token: token, userId: user.id });
      } else {
        res.status(401).send({ error: { message: 'Password is incorrect' } });
      }
    })
    .catch((error) => {
      error.status = 403;
      error.message = 'This user does not exist';
      next(error);
    })
}

function addUser(req, res, next) {
  let passwordFromUser = req.body.userpass;
  let salt = bcrypt.genSaltSync(10);
  let passwordToSave = bcrypt.hashSync(passwordFromUser, salt);
  req.body.userpass = passwordToSave;

  models.Users.findOne({
    where: { name: `${req.body.username}` },
  })
    .then((users) => {
      if (!users) {
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

function secret(req, res, next) {
  try {
    res.json({ message: "Success! You can not see this without a token" });
  } catch (error) {
    next(error);
  }
}

module.exports = { login, addUser, secret };