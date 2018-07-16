const express = require('express');
const router = module.exports = express.Router();
const models = require('../models/sequelize');

router.get('/tasks', function (req, res, next) {
  models.Tasks.findAll({
    where: {
      boards_id: req.query.id,
    },
  })
    .then((tasks) => {
      res.json(tasks);
    })
    .catch((error) => {
      next(error);
    })
});

router.post('/tasks', function (req, res, next) {
  models.Tasks.create({
    content: req.body.content,
    title: req.body.title,
    status: req.body.status,
    position: req.body.position,
    boards_id: req.body.boards_id,
  })
    .then(() => {
      res.json('Success!');
    })
    .catch((error) => {
      next(error);
    })
});