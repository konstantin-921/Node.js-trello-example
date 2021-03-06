const models = require('../models/sequelize');

function getBoards(req, res, next) {
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
}

function deleteBoard(req, res, next) {
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
          res.json({ message: 'Successful delete!' });
        })
        .catch((error) => {
          next(error);
        })
    })
    .catch((error) => {
      next(error);
    })
}

function createNewBoard(req, res, next) {
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
}

function shareBoard(req, res, next) {
  models.Boards.update({ share: 'true' }, {
    where: {
      id: req.body.boardId,
    }
  })
    .then(() => {
      res.json({ message: 'Success share!' });
    })
    .catch((error) => {
      next(error);
    })
}

module.exports = { getBoards, deleteBoard, createNewBoard, shareBoard };