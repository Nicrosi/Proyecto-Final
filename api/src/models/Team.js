const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "team",
    {
      id_team: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      points: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      accumulated_points: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
