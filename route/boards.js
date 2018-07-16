const express = require('express');
const router = module.exports = express.Router();
const models = require('../models/sequelize');

router.get('/boards', function (req, res, next) {
  models.Boards.findAll({
    where: {
      user_id: req.query.id,
    },
  })
    .then((boards) => {
      res.json(boards);
    })
    .catch((error) => {
      next(error);
    })
});

router.post('/boards', function (req, res, next) {
  models.Boards.create({
    caption: req.body.caption,
    user_id: req.body.id,
  })
    .then(() => {
      res.json('Success!');
    })
    .catch((error) => {
      next(error);
    })
});