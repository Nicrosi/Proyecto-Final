const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      ///////////////////////////////
      id_user: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      dni: {
        type: DataTypes.INTEGER,

        unique: true,
      },
      name: {
        type: DataTypes.STRING,

      },
      last_name: {
        type: DataTypes.STRING,

      },
      is_admin: {
        type: DataTypes.BOOLEAN,

      },
      e_mail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.INTEGER,

      },
      num_contact: {
        type: DataTypes.INTEGER,
 
      },
      picture: {
        type: DataTypes.TEXT,

      },
      gender: {
        type: DataTypes.STRING,

      },
    },
    { timestamps: false }
  );
};
