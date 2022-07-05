const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('sub-tournament', {
    ID_subt: {
      type: DataTypes.INTEGER,
      autoIncrement: true, 
      primaryKey: true, 
      allowNull: false,
    },
    Elimination_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Match_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Num_players: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Gender: {
      type: DataTypes.STRING,
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
