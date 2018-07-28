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
    share: req.body.share,
    user_id: req.body.id,
  })
    .then((boards) => {
      res.json(boards.id);
    })
    .catch((error) => {
      next(error);
    })
});

router.delete('/boards', function (req, res, next) {
  models.Tasks.destroy({
    where: {
      boards_id: req.body.id,
    }
  })
    .then(() => {
      models.Boards.destroy({
        where: {
          id: req.body.id,
        }
      })
        .then(() => {
          res.json('Successful delete!');
        })
        .catch((error) => {
          next(error);
        })
    })
    .catch((error) => {
      next(error);
    })
});

router.put('/boards', function (req, res, next) {
  models.Boards.update({ share: 'true' }, {
    where: {
      id: req.body.boardId,
    }
  })
    .then(() => {
      res.json('Success share!');
    })
    .catch((error) => {
      next(error);
    })
});