const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('inscription', {
    id_inscription: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_payed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  }, {
    timestamps: false
  });
};
