module.exports = (sequelize, DataTypes) => {
  const Tasks = sequelize.define('tasks', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.TEXT,
    },
    content: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.TEXT,
    },
    position: {
      type: DataTypes.INTEGER,
    },
    boards_id: {
      type: DataTypes.INTEGER,
    },
  });

  return Tasks;
};