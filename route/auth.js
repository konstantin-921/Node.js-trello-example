const express = require('express');
const router = module.exports = express.Router();
const jwt = require('jsonwebtoken');
const strategy = require('../api/servces/strategy');
const bcrypt = require('bcrypt');
const passport = require('passport');
const models = require('../models/sequelize');

router.get('/auth/login', function (req, res, next) {
  query(req, res, next);
});

function query(req, res, next) {
  models.Users.findAll({
    where: {
      name: req.query.username,
    },
  })
    .then((users) => {
      const user = users[0];
      const hash = bcrypt.compareSync(req.query.userpass, user.password);
      if (hash && user.name === req.query.username) {
        const payload = { user: user.id };
        const token = jwt.sign(payload, strategy.jwtOptions.secretOrKey, { expiresIn: '30h' });
        res.json({ message: "ok", token: token, userId: user.id });
      } else {
        res.json({ message: "Password is incorrect" });
      }
    })
    .catch((error) => {
      res.json({ message: "This user does not exist" });
      next(error);
    })
}

router.post('/auth/secret', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  try {
    res.json("Success! You can not see this without a token");
  } catch (error) {
    next(error);
  }
});
