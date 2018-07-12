const Sequelize = require('sequelize');

const sequelize = new Sequelize('trello', 'nodejs', '1111', {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  define: {
    timestamps: false
  }
});

const models = {
  Tasks: sequelize.import('./tasks'),
}

Object.keys(models).forEach(modelName => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;