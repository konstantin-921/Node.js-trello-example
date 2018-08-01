const Sequelize = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config.db.name, config.db.user, config.db.pass, {
  dialect: config.db.dialect,
  host: config.db.host,
  port: config.db.port,
  define: {
    timestamps: config.db.timestamps
  }
});

const models = {
  Users: sequelize.import('./users'),
  Tasks: sequelize.import('./tasks'),
  Boards: sequelize.import('./boards'),
}

Object.keys(models).forEach(modelName => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;