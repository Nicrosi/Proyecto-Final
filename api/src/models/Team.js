const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "team",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      points: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      accumulated_points: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
