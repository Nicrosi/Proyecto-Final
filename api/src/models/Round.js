const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('round', {
    id_round: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    round_numb: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
    {
      timestamps: false
    }
  );
};
