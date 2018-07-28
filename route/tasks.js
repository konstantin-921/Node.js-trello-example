const express = require('express');
const router = module.exports = express.Router();
const models = require('../models/sequelize');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


router.get('/tasks', function (req, res, next) {
  // Находим доску по id
  models.Boards.findAll({
    where: {
      id: req.query.id,
    },
  })
    .then((boards) => {
      const userId = Number(req.query.userId);
      // Если id usera создавшего доску и id текущего user совпали, то идем дальше
      if (boards[0].user_id === userId) {
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
      } else if (boards[0].user_id !== userId && boards[0].share === 'true') {
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
      } else {
        res.status(403).send('This board does not belong to you');
      }
    })
    .catch((error) => {
      res.status(500).send('There is no such board!');
      next(error);
    })
});

router.post('/tasks', function (req, res, next) {
  if (Array.isArray(req.body)) {
    req.body.forEach(elem => {
      models.Tasks.create({
        content: elem.content,
        title: elem.title,
        status: elem.status,
        position: elem.position,
        boards_id: elem.boardsId,
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
      models.Tasks.update({ position: Sequelize.literal('position - 1') }, {
        returning: true,
        where: {
          position: { [Op.gte]: req.body.position },
          status: req.body.status,
          boards_id: req.body.boards_id,
        }
      })
    })
    .then(() => {
      res.json('Success delete!');
    })
    .catch((error) => {
      next(error);
    })
});


router.put('/tasks', function (req, res, next) {
  const newPosition = req.body.position;
  const oldPosition = req.body.oldPosition;

  if (req.body.oldStatus === req.body.status) {
    if (newPosition < oldPosition) {
      models.Tasks.update({ position: Sequelize.literal('position + 1') }, {
        returning: true,
        where: {
          position: {
            [Op.lte]: oldPosition,
            [Op.gte]: newPosition,
          },
          status: req.body.status,
          boards_id: req.body.boards_id,
        }
      })
        .then(() => {
          models.Tasks.update({ position: newPosition }, {
            returning: true,
            where: { id: req.body.id }
          },
          )
            .then(() => {
              res.json('Success update!');
            })
            .catch((error) => {
              next(error);
            })
        })
        .catch((error) => {
          next(error);
        })
    } else if (newPosition > oldPosition) {
      models.Tasks.update({ position: Sequelize.literal('position - 1') }, {
        returning: true,
        where: {
          position: {
            [Op.gte]: oldPosition,
            [Op.lte]: newPosition,
          },
          status: req.body.status,
          boards_id: req.body.boards_id,
        }
      })
        .then(() => {
          models.Tasks.update({ position: newPosition }, {
            returning: true,
            where: { id: req.body.id }
          },
          )
            .then(() => {
              res.json('Success update!');
            })
            .catch((error) => {
              next(error);
            })
        })
        .catch((error) => {
          next(error);
        })
    } else if (newPosition === oldPosition) {
      models.Tasks.update({ position: newPosition }, {
        returning: true,
        where: { id: req.body.id }
      },
      )
        .then(() => {
          res.json('Success update!');
        })
        .catch((error) => {
          next(error);
        })
    }
  }

  // Horizontal move
  else if (req.body.oldStatus !== req.body.status) {
    const oldStatus = req.body.oldStatus
    models.Tasks.update({ position: Sequelize.literal('position - 1') }, {
      where: {
        position: { [Op.gte]: oldPosition },
        status: oldStatus,
        boards_id: req.body.boards_id,
      }
    })
      .then(() => {
        models.Tasks.update({ position: Sequelize.literal('position + 1') }, {
          where: {
            position: { [Op.gte]: newPosition },
            status: req.body.status,
            boards_id: req.body.boards_id,
          }
        })
      })
      .then(() => {
        models.Tasks.update({ position: newPosition, status: req.body.status }, {
          where: { id: req.body.id }
        })
          .then(() => {
            res.json('Success update!');
          })
          .catch((error) => {
            next(error);
          })
      })
      .catch((error) => {
        next(error);
      })
  }
});