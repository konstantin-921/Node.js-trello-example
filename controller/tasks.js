const models = require('../models/sequelize');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

function getTasks(req, res, next) {
  models.Boards.findOne({
    where: {
      id: req.query.id,
    },
    raw: true,
  })
    .then((boards) => {
      const userId = Number(req.query.userId);
      if (boards.user_id === userId) {
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
      } else if (boards.user_id !== userId && boards.share === 'true') {
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
        res.status(403).json({ message: 'This board does not belong to you' });
      }
    })
    .catch((error) => {
      error.status = 404;
      error.message = 'This board does not exist!';
      next(error);
    })
}

function createTasks(req, res, next) {
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
          res.json({ message: 'Success create board!' });
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
        res.json({ message: 'Success create!' });
      })
      .catch((error) => {
        next(error);
      })
  }
}

function deleteTask(req, res, next) {
  models.Tasks.destroy({
    where: {
      id: req.body.id,
    }
  })
    .then(() => {
      models.Tasks.update({ position: Sequelize.literal('position - 1') }, {
        where: {
          position: { [Op.gte]: req.body.position },
          status: req.body.status,
          boards_id: req.body.boards_id,
        }
      })
    })
    .then(() => {
      res.json({ message: 'Success delete!' });
    })
    .catch((error) => {
      next(error);
    })
}

function moveTask(req, res, next) {
  const newPosition = req.body.position;
  const oldPosition = req.body.oldPosition;

  // Vertical move
  if (req.body.oldStatus === req.body.status) {
    if (newPosition < oldPosition) {
      models.Tasks.update({ position: Sequelize.literal('position + 1') }, {
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
            where: { id: req.body.id }
          },
          )
            .then(() => {
              res.json({ message: 'Success update!' });
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
            where: { id: req.body.id }
          },
          )
            .then(() => {
              res.json({ message: 'Success update!' });
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
        where: { id: req.body.id }
      },
      )
        .then(() => {
          res.json({ message: 'Success update!' });
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
            res.json({ message: 'Success update!' });
          })
          .catch((error) => {
            next(error);
          })
      })
      .catch((error) => {
        next(error);
      })
  }
}

module.exports = { getTasks, createTasks, deleteTask, moveTask };