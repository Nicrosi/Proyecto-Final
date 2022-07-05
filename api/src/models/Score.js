const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('score', {
    id_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    torneos_previos: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    conoc_golpes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    otros_golpes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    golpes_especiales: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    control_saque: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tecnica_estrategia: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    timestamps: false
  });
};