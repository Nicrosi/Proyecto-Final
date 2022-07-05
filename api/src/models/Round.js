const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('round', {
    ID_Round: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    Is_Finished: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false
    }
  );
};
