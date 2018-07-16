module.exports = (sequelize, DataTypes) => {
  const Boards = sequelize.define('boards', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    caption: {
      type: DataTypes.TEXT,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
  });

  return Boards;
};