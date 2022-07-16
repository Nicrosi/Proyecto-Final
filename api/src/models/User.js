const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      ///////////////////////////////
      id_user: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      dni: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
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
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      num_contact: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      picture: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
