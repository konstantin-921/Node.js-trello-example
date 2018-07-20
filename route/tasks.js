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
  console.log(req.body);
  console.log(Array.isArray(req.body));
  if (Array.isArray(req.body)) {
    req.body.forEach(elem => {
      models.Tasks.create({
        content: elem.content,
        title: elem.title,
        status: elem.status,
        position: elem.position,
        boards_id: elem.id,
      })
        .then(() => {
          res.json('Success!');
        })
        .catch((error) => {
          next(error);
        })
    });
  } else {
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
  }
});

router.delete('/tasks', function (req, res, next) {
  models.Tasks.destroy({
    where: {
      id: req.body.id,
    }
  })
    .then(() => {
      res.json('Success delete!');
    })
    .catch((error) => {
      next(error);
    })
});