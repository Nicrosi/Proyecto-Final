const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('round', {
    id_round: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    is_finished: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
    {
      timestamps: false
    }
  );
};
