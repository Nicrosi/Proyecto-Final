const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "gestion",
    {
      id_gestion: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      organizer_earnings: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tennis_courts: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      awards: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
