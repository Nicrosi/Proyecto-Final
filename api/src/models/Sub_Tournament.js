const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('sub_tournament', {
    id_subt: {
      type: DataTypes.INTEGER,
      autoIncrement: true, 
      primaryKey: true, 
      allowNull: false,
    },
    elimination_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    match_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numb_players: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
    {
      timestamps: false
    }
  );
};
