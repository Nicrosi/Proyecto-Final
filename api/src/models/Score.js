const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "score",
    {
      id_score: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      previous_tournaments: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      hit_knowledge: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      other_strokes: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      special_hits: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      kick_serve_control: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      game_strategy: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
